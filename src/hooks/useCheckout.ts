import { useState, useEffect, useMemo } from 'react';
import type { JNERow } from '../data/jneData';
import {
  BuyerForm,
  JNEDestination,
  ShippingServiceOption,
  PaymentMethodType,
  PaymentSession,
  CartItem
} from '../types';
import { readJsonResponse } from '../lib/http';

const ADMIN_WHATSAPP_NUMBER = '6281299450708';
const BUYER_STORAGE_KEY = 'botani_buyer_session';
const EMPTY_BUYER: BuyerForm = {
  name: '', whatsapp: '', address: '', city: '', village: '', district: '', province: '', postal: '', note: ''
};

export function useCheckout(items: CartItem[], totalQty: number, subtotalProduct: number) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Buyer Data
  const [buyerForm, setBuyerForm] = useState<BuyerForm>(() => {
    try {
      return { ...EMPTY_BUYER, ...JSON.parse(sessionStorage.getItem(BUYER_STORAGE_KEY) || '{}') };
    } catch {
      return EMPTY_BUYER;
    }
  });
  const [buyerFormError, setBuyerFormError] = useState<string | null>(null);

  useEffect(() => {
    sessionStorage.setItem(BUYER_STORAGE_KEY, JSON.stringify(buyerForm));
  }, [buyerForm]);

  // Step 2: Shipping
  const [shippingType, setShippingType] = useState<'JNE' | 'Ambil di kantor'>('JNE');
  const [destinationSearch, setDestinationSearch] = useState('');
  const [jneData, setJneData] = useState<JNERow[] | null>(null);
  const [isDestinationDataLoading, setIsDestinationDataLoading] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<JNEDestination | null>(null);
  const [selectedService, setSelectedService] = useState<ShippingServiceOption | null>(null);
  const [shippingValidationError, setShippingValidationError] = useState<string | null>(null);

  const resolvedBuyer = useMemo<BuyerForm>(() => shippingType === 'JNE' && selectedDestination
    ? {
        ...buyerForm,
        city: selectedDestination.regencyName,
        village: selectedDestination.village,
        district: selectedDestination.district,
        province: selectedDestination.province,
        postal: selectedDestination.postalCode,
      }
    : {
        ...buyerForm,
        address: '', city: '', village: '', district: '', province: '', postal: '',
      }, [buyerForm, selectedDestination, shippingType]);

  // Weight Calculation
  // 1-10 pcs = 1kg, 11-20 pcs = 2kg, etc.
  const billableWeight = useMemo(() => {
    if (totalQty <= 0) return 1;
    return Math.ceil(totalQty / 10);
  }, [totalQty]);

  const actualWeightKg = useMemo(() => {
    return (totalQty * 0.1).toFixed(1);
  }, [totalQty]);

  useEffect(() => {
    if (destinationSearch.trim().length < 3 || jneData || isDestinationDataLoading) return;
    setIsDestinationDataLoading(true);
    import('../data/jneData')
      .then(({ JNE_DATA }) => setJneData(JNE_DATA))
      .finally(() => setIsDestinationDataLoading(false));
  }, [destinationSearch, jneData, isDestinationDataLoading]);

  // JNE Destination Results matching search query (min 3 chars)
  const destinationResults = useMemo(() => {
    const query = destinationSearch.trim().toLowerCase();
    if (query.length < 3 || !jneData) return [];
    
    const matches: JNEDestination[] = [];
    for (let i = 0; i < jneData.length && matches.length < 30; i++) {
      const row = jneData[i];
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
  }, [destinationSearch, jneData]);

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
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  const [orderSaveError, setOrderSaveError] = useState<string | null>(null);

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
    setShippingValidationError(null);
  };

  const validateStep1 = (): boolean => {
    if (!buyerForm.name.trim() || !buyerForm.whatsapp.trim()) {
      setBuyerFormError('Isi nama dan nomor WhatsApp untuk melanjutkan.');
      return false;
    }
    if (!/^\+?\d{9,15}$/.test(buyerForm.whatsapp.replace(/[\s-]/g, ''))) {
      setBuyerFormError('Masukkan nomor WhatsApp aktif, 9–15 digit.');
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
      if (!buyerForm.address.trim()) {
        setShippingValidationError('Isi alamat jalan, RT/RW, dan nomor rumah.');
        return false;
      }
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
    const randomCode = crypto.randomUUID().replace(/-/g, '').slice(0, 6).toUpperCase();
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const orderNum = `BTS-${dateStr}-${randomCode}`;

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

    setOrderSaveError(null);
    setPaymentSession(newSession);
    setTimeLeft(3600);
    setIsPaymentConfirmedChecked(false);
    setCurrentStep(4);
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

    const productLines = items
      .map((item, index) => `${index + 1}. ${item.name} — ${item.qty} × Rp${item.price.toLocaleString('id-ID')} = Rp${(item.price * item.qty).toLocaleString('id-ID')}`)
      .join('\n');

    const msg = `Halo Admin PT Botani Seed Indonesia,

Saya ingin mengonfirmasi pembayaran pesanan:

*DETAIL PESANAN*
• Nomor pesanan: ${paymentSession.orderNumber}
• Nama: ${resolvedBuyer.name}
• WhatsApp: ${resolvedBuyer.whatsapp}
${shippingType === 'JNE' ? `• Alamat: ${resolvedBuyer.address}
• Kelurahan/Desa: ${resolvedBuyer.village}
• Kecamatan: ${resolvedBuyer.district}
• Kota/Kabupaten: ${resolvedBuyer.city}
• Provinsi: ${resolvedBuyer.province}
• Kode pos: ${resolvedBuyer.postal}\n` : '• Pengambilan: Kantor Botani Seed\n'}${resolvedBuyer.note ? `• Catatan: ${resolvedBuyer.note}\n` : ''}
*PRODUK*
${productLines}

*RINCIAN BIAYA*
• Subtotal produk: Rp${subtotalProduct.toLocaleString('id-ID')}
• Pengiriman: ${shippingInfo} (Rp${shippingCostTotal.toLocaleString('id-ID')})
• *Total dibayar: Rp${paymentSession.grandTotal.toLocaleString('id-ID')}*
• Metode pembayaran: ${paymentSession.paymentMethod}

Bukti transfer telah saya siapkan. Mohon pesanan saya segera diproses. Terima kasih!`;

    return encodeURIComponent(msg);
  };

  const confirmPaidAndOpenWhatsapp = async () => {
    if (!paymentSession || paymentSession.isExpired || !isPaymentConfirmedChecked) return;
    setIsSavingOrder(true);
    setOrderSaveError(null);
    const whatsappWindow = window.open('about:blank', '_blank');
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNumber: paymentSession.orderNumber,
          buyer: resolvedBuyer,
          cart: { items: items.map(({ id, qty }) => ({ id, qty })) },
          shippingType,
          shippingService: shippingType === 'JNE' ? selectedService : null,
          paymentMethod,
        }),
      });
      const data = await readJsonResponse(response, 'Pesanan belum dapat disimpan. Pastikan server aktif, lalu coba lagi.');
      if (!response.ok) throw new Error(data.message || 'Pesanan belum dapat disimpan.');
      setPaymentSession(prev => prev ? { ...prev, isConfirmed: true } : null);
      setCurrentStep(5);
      const waUrl = `https://api.whatsapp.com/send?phone=${ADMIN_WHATSAPP_NUMBER}&text=${generateWhatsappMessage()}`;
      if (whatsappWindow) whatsappWindow.location.href = waUrl;
      else window.location.href = waUrl;
    } catch (error) {
      whatsappWindow?.close();
      setOrderSaveError(error instanceof Error ? error.message : 'Pesanan belum dapat disimpan.');
    } finally {
      setIsSavingOrder(false);
    }
  };

  return {
    isCheckoutOpen,
    openCheckout,
    closeCheckout,
    currentStep,
    setCurrentStep,
    buyerForm,
    resolvedBuyer,
    updateBuyerForm,
    buyerFormError,
    goToStep2,
    shippingType,
    setShippingType,
    destinationSearch,
    setDestinationSearch,
    destinationResults,
    isDestinationDataLoading,
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
    isSavingOrder,
    orderSaveError,
    grandTotal,
    generateWhatsappMessage,
    adminWhatsappNumber: ADMIN_WHATSAPP_NUMBER
  };
}
