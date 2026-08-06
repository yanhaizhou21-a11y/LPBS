import { useState, useEffect, useMemo } from 'react';
import { JNE_DATA, JNERow } from '../data/jneData';
import {
  BuyerForm,
  JNEDestination,
  ShippingServiceOption,
  PaymentMethodType,
  PaymentSession
} from '../types';

const ADMIN_WHATSAPP_NUMBER = '6281234567890'; // PT. Botani Seed Indonesia Admin

export function useCheckout(totalQty: number, subtotalProduct: number) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Buyer Data
  const [buyerForm, setBuyerForm] = useState<BuyerForm>({
    name: '',
    whatsapp: '',
    email: '',
    address: '',
    city: '',
    village: '',
    district: '',
    province: '',
    postal: '',
    note: ''
  });
  const [buyerFormError, setBuyerFormError] = useState<string | null>(null);

  // Step 2: Shipping
  const [shippingType, setShippingType] = useState<'JNE' | 'Ambil di kantor'>('JNE');
  const [destinationSearch, setDestinationSearch] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<JNEDestination | null>(null);
  const [selectedService, setSelectedService] = useState<ShippingServiceOption | null>(null);
  const [shippingValidationError, setShippingValidationError] = useState<string | null>(null);

  // Weight Calculation
  // 1-10 pcs = 1kg, 11-20 pcs = 2kg, etc.
  const billableWeight = useMemo(() => {
    if (totalQty <= 0) return 1;
    return Math.ceil(totalQty / 10);
  }, [totalQty]);

  const actualWeightKg = useMemo(() => {
    return (totalQty * 0.1).toFixed(1);
  }, [totalQty]);

  // JNE Destination Results matching search query (min 3 chars)
  const destinationResults = useMemo(() => {
    const query = destinationSearch.trim().toLowerCase();
    if (query.length < 3) return [];
    
    const matches: JNEDestination[] = [];
    for (let i = 0; i < JNE_DATA.length && matches.length < 30; i++) {
      const row = JNE_DATA[i];
      const searchKey = row[13] || '';
      if (searchKey.includes(query)) {
        matches.push({
          raw: row,
          province: row[0],
          regencyType: row[1],
          regencyName: row[2],
          district: row[3],
          village: row[4],
          postalCode: row[5],
          code: row[6],
          regFee: row[7],
          yesFee: row[8],
          spsFee: row[9],
          minEta: row[11],
          maxEta: row[12],
          searchKey: row[13]
        });
      }
    }
    return matches;
  }, [destinationSearch]);

  // Available Shipping Services for selected destination
  const availableServices = useMemo<ShippingServiceOption[]>(() => {
    if (!selectedDestination || shippingType !== 'JNE') return [];

    const options: ShippingServiceOption[] = [];

    // REG Service
    if (selectedDestination.regFee > 0) {
      options.push({
        code: 'REG',
        name: 'JNE REG (Reguler)',
        feePerKg: selectedDestination.regFee,
        totalFee: selectedDestination.regFee * billableWeight,
        eta: `${selectedDestination.minEta}–${selectedDestination.maxEta} Hari`
      });
    }

    // YES Service
    if (selectedDestination.yesFee > 0) {
      options.push({
        code: 'YES',
        name: 'JNE YES (Yakin Esok Sampai)',
        feePerKg: selectedDestination.yesFee,
        totalFee: selectedDestination.yesFee * billableWeight,
        eta: '1 Hari'
      });
    }

    // SPS Service
    if (selectedDestination.spsFee > 0) {
      options.push({
        code: 'SPS',
        name: 'JNE SPS (Super Speed)',
        feePerKg: selectedDestination.spsFee,
        totalFee: selectedDestination.spsFee * billableWeight,
        eta: '1 Hari'
      });
    }

    return options;
  }, [selectedDestination, shippingType, billableWeight]);

  // Shipping Cost Total
  const shippingCostTotal = useMemo(() => {
    if (shippingType === 'Ambil di kantor') return 0;
    return selectedService ? selectedService.totalFee : 0;
  }, [shippingType, selectedService]);

  // Grand Total
  const grandTotal = useMemo(() => {
    return subtotalProduct + shippingCostTotal;
  }, [subtotalProduct, shippingCostTotal]);

  // Step 3: Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('QRIS');

  // Step 4: Active Payment Session & Countdown
  const [paymentSession, setPaymentSession] = useState<PaymentSession | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(3600); // 60 minutes
  const [isPaymentConfirmedChecked, setIsPaymentConfirmedChecked] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    if (!paymentSession || paymentSession.isExpired || paymentSession.isConfirmed) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setPaymentSession(curr => curr ? { ...curr, isExpired: true } : null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [paymentSession]);

  // Format time MM:SS
  const formattedCountdown = useMemo(() => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, [timeLeft]);

  // Actions
  const openCheckout = () => {
    setIsCheckoutOpen(true);
    setCurrentStep(1);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const updateBuyerForm = (field: keyof BuyerForm, value: string) => {
    setBuyerForm(prev => ({ ...prev, [field]: value }));
    setBuyerFormError(null);
  };

  const validateStep1 = (): boolean => {
    if (
      !buyerForm.name.trim() ||
      !buyerForm.whatsapp.trim() ||
      !buyerForm.address.trim() ||
      !buyerForm.city.trim() ||
      !buyerForm.village.trim() ||
      !buyerForm.district.trim() ||
      !buyerForm.province.trim() ||
      !buyerForm.postal.trim()
    ) {
      setBuyerFormError('Lengkapi seluruh data yang wajib diisi (*).');
      return false;
    }
    return true;
  };

  const goToStep2 = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const validateStep2 = (): boolean => {
    if (shippingType === 'JNE') {
      if (!selectedDestination || !selectedService) {
        setShippingValidationError('Pilih tujuan dan layanan JNE terlebih dahulu.');
        return false;
      }
    }
    setShippingValidationError(null);
    return true;
  };

  const goToStep3 = () => {
    if (validateStep2()) {
      setCurrentStep(3);
    }
  };

  const startPaymentSession = () => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const orderNum = `BTS-${dateStr}-${randomDigits}`;

    const newSession: PaymentSession = {
      orderNumber: orderNum,
      paymentMethod,
      productTotal: subtotalProduct,
      shippingTotal: shippingCostTotal,
      grandTotal,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600 * 1000,
      isExpired: false,
      isConfirmed: false
    };

    setPaymentSession(newSession);
    setTimeLeft(3600);
    setIsPaymentConfirmedChecked(false);
    setCurrentStep(4);

    // Save order to MongoDB database backend
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderNumber: orderNum,
        buyer: buyerForm,
        cart: { totalQty },
        shippingService: selectedService,
        paymentMethod,
        pricing: { productTotal: subtotalProduct, shippingTotal: shippingCostTotal, grandTotal }
      })
    }).catch(err => console.warn('[API] Could not persist order to DB:', err));
  };

  const restartPayment = () => {
    setPaymentSession(null);
    setTimeLeft(3600);
    setCurrentStep(3);
  };

  const generateWhatsappMessage = (): string => {
    if (!paymentSession) return '';

    const shippingInfo =
      shippingType === 'JNE' && selectedDestination && selectedService
        ? `Dikirim via JNE ${selectedService.code} (${selectedDestination.village}, ${selectedDestination.district}, ${selectedDestination.regencyName})`
        : 'Ambil di Kantor Botani Seed';

    const msg = `Halo Admin PT Botani Seed Indonesia,

Saya ingin mengonfirmasi pembayaran pesanan benih sayuran:

*DETAIL PESANAN*
• Nomor Pesanan: ${paymentSession.orderNumber}
• Nama Pemesan: ${buyerForm.name}
• No. WhatsApp: ${buyerForm.whatsapp}
• Alamat: ${buyerForm.address}, Kel. ${buyerForm.village}, Kec. ${buyerForm.district}, ${buyerForm.city}, ${buyerForm.province} (${buyerForm.postal})
${buyerForm.note ? `• Catatan: ${buyerForm.note}\n` : ''}
*RINCIAN BIAYA*
• Produk: ${totalQty} paket (Rp${subtotalProduct.toLocaleString('id-ID')})
• Pengiriman: ${shippingInfo} (Rp${shippingCostTotal.toLocaleString('id-ID')})
• *Total Dibayar*: *Rp${paymentSession.grandTotal.toLocaleString('id-ID')}*
• Metode Pembayaran: ${paymentSession.paymentMethod}

Bukti transfer telah saya siapkan. Mohon pesanan saya segera diproses. Terima kasih!`;

    return encodeURIComponent(msg);
  };

  const confirmPaidAndOpenWhatsapp = () => {
    if (!paymentSession || paymentSession.isExpired || !isPaymentConfirmedChecked) return;

    setPaymentSession(prev => prev ? { ...prev, isConfirmed: true } : null);
    setCurrentStep(5);

    const waMessage = generateWhatsappMessage();
    const waUrl = `https://api.whatsapp.com/send?phone=${ADMIN_WHATSAPP_NUMBER}&text=${waMessage}`;
    window.open(waUrl, '_blank');
  };

  return {
    isCheckoutOpen,
    openCheckout,
    closeCheckout,
    currentStep,
    setCurrentStep,
    buyerForm,
    updateBuyerForm,
    buyerFormError,
    goToStep2,
    shippingType,
    setShippingType,
    destinationSearch,
    setDestinationSearch,
    destinationResults,
    selectedDestination,
    setSelectedDestination,
    selectedService,
    setSelectedService,
    availableServices,
    billableWeight,
    actualWeightKg,
    shippingCostTotal,
    shippingValidationError,
    goToStep3,
    paymentMethod,
    setPaymentMethod,
    startPaymentSession,
    paymentSession,
    timeLeft,
    formattedCountdown,
    isPaymentConfirmedChecked,
    setIsPaymentConfirmedChecked,
    confirmPaidAndOpenWhatsapp,
    restartPayment,
    grandTotal,
    generateWhatsappMessage,
    adminWhatsappNumber: ADMIN_WHATSAPP_NUMBER
  };
}
