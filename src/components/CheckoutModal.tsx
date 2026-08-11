import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, FileText, MessageCircle, Search, Sprout, X } from 'lucide-react';
import { ASSETS } from '../data/assets';
import { useCheckout } from '../hooks/useCheckout';
import { CartItem } from '../types';
import { FloatingInput } from './ui/floating-input';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalQty: number;
  subtotalProduct: number;
  normalTotalProduct: number;
  discountTotalProduct: number;
  onCartOpen: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  totalQty,
  subtotalProduct,
  normalTotalProduct,
  discountTotalProduct,
  onCartOpen
}) => {
  const checkout = useCheckout(items, totalQty, subtotalProduct);

  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const bankAccountDetails: Record<string, { bankName: string; number: string }> = {
    BSI: { bankName: 'Bank Syariah Indonesia (BSI)', number: '7123456789' },
    BNI: { bankName: 'Bank Negara Indonesia (BNI)', number: '0987654321' },
    BRI: { bankName: 'Bank Rakyat Indonesia (BRI)', number: '123401005678532' }
  };

  const handleCopyAccount = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };

  return (
    <div className="checkout-modal-backdrop" data-lenis-prevent="true">
      <section className="checkout-page" id="checkoutPage" role="dialog" aria-modal="true" aria-labelledby="checkout-title" data-lenis-prevent="true">
        <div className="checkout-shell">
          <header className="checkout-header">
            <div className="checkout-brand">
              <Sprout className="checkout-brand-mark" size={32} aria-hidden="true" />
              <div>
                <strong id="checkout-title">PT. Botani Seed Indonesia</strong>
                <small>Pemesanan Paket Benih Sayuran</small>
              </div>
            </div>
            <button
              type="button"
              className="checkout-close-btn"
              onClick={onClose}
              aria-label="Tutup halaman pemesanan"
            >
              <X size={23} aria-hidden="true" />
            </button>
          </header>

          <div className="checkout-progress">
            <span className="checkout-progress-count">Langkah {Math.min(checkout.currentStep, 4)} dari 4</span>
            <div className={`checkout-progress-item ${checkout.currentStep >= 1 ? 'active' : ''} ${checkout.currentStep === 1 ? 'current' : ''}`} aria-current={checkout.currentStep === 1 ? 'step' : undefined}>
              <span>1</span>
              <strong>Kontak</strong>
            </div>
            <div className="checkout-progress-line"></div>
            <div className={`checkout-progress-item ${checkout.currentStep >= 2 ? 'active' : ''} ${checkout.currentStep === 2 ? 'current' : ''}`} aria-current={checkout.currentStep === 2 ? 'step' : undefined}>
              <span>2</span>
              <strong>Pengiriman</strong>
            </div>
            <div className="checkout-progress-line"></div>
            <div className={`checkout-progress-item ${checkout.currentStep >= 3 ? 'active' : ''} ${checkout.currentStep === 3 ? 'current' : ''}`} aria-current={checkout.currentStep === 3 ? 'step' : undefined}>
              <span>3</span>
              <strong>Pembayaran</strong>
            </div>
            <div className="checkout-progress-line"></div>
            <div className={`checkout-progress-item ${checkout.currentStep >= 4 ? 'active' : ''} ${checkout.currentStep === 4 ? 'current' : ''}`} aria-current={checkout.currentStep === 4 ? 'step' : undefined}>
              <span>4</span>
              <strong>Detail Pembayaran</strong>
            </div>
          </div>

          <div className="checkout-layout">
            {items.length === 0 ? (
              <main className="checkout-main text-center py-12 px-4">
                <Sprout size={48} className="mx-auto text-emerald-600 mb-4" />
                <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50">Keranjang Belanja Kosong</h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 max-w-md mx-auto">
                  Silakan tambahkan paket benih sayuran ke keranjang terlebih dahulu sebelum melakukan pemesanan.
                </p>
                <button
                  type="button"
                  className="mt-6 checkout-primary-btn mx-auto"
                  onClick={() => {
                    onClose();
                    onCartOpen();
                  }}
                >
                  Lihat Paket Benih
                </button>
              </main>
            ) : (
            <main className="checkout-main">
              {/* STEP 1: DATA PEMESAN */}
              {checkout.currentStep === 1 && (
                <div className="checkout-step active">
                  <div className="checkout-step-heading">
                    <h2>Kontak pemesan</h2>
                    <p>Kami memakai nomor ini untuk mengonfirmasi pesanan.</p>
                  </div>

                  <form className="checkout-form" onSubmit={e => e.preventDefault()}>
                    <div className="form-grid">
                      <FloatingInput
                        label="Nama lengkap *"
                        type="text"
                        required
                        autoComplete="name"
                        value={checkout.buyerForm.name}
                        aria-invalid={Boolean(checkout.buyerFormError)}
                        aria-describedby={checkout.buyerFormError ? 'buyer-form-error' : undefined}
                        onChange={e => checkout.updateBuyerForm('name', e.target.value)}
                      />

                      <FloatingInput
                        label="Nomor WhatsApp *"
                        type="tel"
                        required
                        inputMode="tel"
                        autoComplete="tel"
                        value={checkout.buyerForm.whatsapp}
                        aria-invalid={Boolean(checkout.buyerFormError)}
                        aria-describedby={checkout.buyerFormError ? 'buyer-form-error' : undefined}
                        onChange={e => checkout.updateBuyerForm('whatsapp', e.target.value)}
                      />
                    </div>

                    {checkout.buyerFormError && (
                      <p id="buyer-form-error" className="form-error" role="alert">{checkout.buyerFormError}</p>
                    )}
                  </form>

                  <div className="checkout-nav">
                    <button
                      type="button"
                      className="checkout-secondary-btn"
                      onClick={() => {
                        onClose();
                        onCartOpen();
                      }}
                    >
                      <ArrowLeft size={16} aria-hidden="true" />
                      <span>Kembali ke Keranjang</span>
                    </button>
                    <button
                      type="button"
                      className="checkout-primary-btn"
                      onClick={checkout.goToStep2}
                    >
                      <span>Pilih pengiriman</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: PENGIRIMAN */}
              {checkout.currentStep === 2 && (
                <div className="checkout-step active">
                  <div className="checkout-step-heading">
                    <h2>Pilih pengiriman</h2>
                    <p>Pilih JNE untuk dikirim ke alamat Anda atau ambil langsung di kantor Botani Seed.</p>
                  </div>

                  <div className="shipping-options">
                    <label
                      className={`option-card ${checkout.shippingType === 'JNE' ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={checkout.shippingType === 'JNE'}
                        onChange={() => checkout.setShippingType('JNE')}
                      />
                      <div>
                        <strong>Dikirim melalui JNE</strong>
                        <span>Tarif otomatis dihitung berdasarkan tujuan, layanan, dan berat kiriman.</span>
                      </div>
                      <b>Otomatis</b>
                    </label>

                    <label
                      className={`option-card ${checkout.shippingType === 'Ambil di kantor' ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={checkout.shippingType === 'Ambil di kantor'}
                        onChange={() => checkout.setShippingType('Ambil di kantor')}
                      />
                      <div>
                        <strong>Ambil di kantor Botani Seed</strong>
                        <span>Pengambilan dikoordinasikan terlebih dahulu dengan admin Botani Seed.</span>
                      </div>
                      <b>Rp 0</b>
                    </label>
                  </div>

                  {checkout.shippingType === 'JNE' && (
                    <div className="automatic-jne-panel">
                      <label className="shipping-address-field">
                        <span>Alamat jalan, RT/RW, dan nomor rumah *</span>
                        <textarea
                          rows={2}
                          required
                          value={checkout.buyerForm.address}
                          onChange={e => checkout.updateBuyerForm('address', e.target.value)}
                          placeholder="Contoh: Jl. Raya Dramaga No. 12, RT 02/RW 04"
                        />
                      </label>
                      <div className="automatic-jne-heading">
                        <h3>Cari kelurahan atau kode pos</h3>
                        <p>Pilih hasil yang sesuai agar alamat dan ongkir dihitung otomatis.</p>
                      </div>

                      {!checkout.selectedDestination ? (
                        <div className="destination-search-wrap">
                          <label htmlFor="jneDestinationSearch">Kelurahan atau kode pos</label>
                          <div className="destination-search-input">
                            <Search size={18} aria-hidden="true" />
                            <input
                              id="jneDestinationSearch"
                              type="search"
                              autoComplete="off"
                              placeholder="Contoh: Cibinong 16911 atau Tomang 11450"
                              value={checkout.destinationSearch}
                              onChange={e => checkout.setDestinationSearch(e.target.value)}
                            />
                          </div>

                          <div className="jne-search-status" aria-live="polite">
                            {checkout.destinationSearch.trim().length < 3
                              ? 'Ketik minimal 3 karakter untuk mencari tujuan.'
                              : checkout.isDestinationDataLoading
                              ? 'Memuat data wilayah JNE…'
                              : checkout.destinationResults.length === 0
                              ? 'Tujuan tidak ditemukan. Coba periksa ejaan kelurahan atau kode pos.'
                              : `Ditemukan ${checkout.destinationResults.length} lokasi tujuan:`}
                          </div>

                          {checkout.destinationResults.length > 0 && (
                            <div className="jne-destination-results">
                              {checkout.destinationResults.map((dest, idx) => (
                                <button
                                  type="button"
                                  className="result-item-row"
                                  key={idx}
                                  onClick={() => {
                                    checkout.setSelectedDestination(dest);
                                    checkout.setDestinationSearch('');
                                  }}
                                >
                                  <strong>
                                    {dest.village}, {dest.district}
                                  </strong>
                                  <small>
                                    {dest.regencyType} {dest.regencyName}, {dest.province} — Kodepos: {dest.postalCode}
                                  </small>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="selected-destination-card">
                          <div>
                            <span>TUJUAN TERPILIH</span>
                            <strong>
                              {checkout.selectedDestination.village}, {checkout.selectedDestination.district}
                            </strong>
                            <small>
                              {checkout.selectedDestination.regencyType} {checkout.selectedDestination.regencyName},{' '}
                              {checkout.selectedDestination.province} ({checkout.selectedDestination.postalCode})
                            </small>
                          </div>
                          <button
                            type="button"
                            className="change-dest-btn"
                            onClick={() => {
                              checkout.setSelectedDestination(null);
                              checkout.setSelectedService(null);
                            }}
                          >
                            Ganti Tujuan
                          </button>
                        </div>
                      )}

                      <div className="shipment-weight-card">
                        <div>
                          <span>Berat Produk</span>
                          <strong>500 gram per 5 pcs</strong>
                        </div>
                        <div>
                          <span>Berat Aktual</span>
                          <strong>{checkout.actualWeightKg} kg</strong>
                        </div>
                        <div>
                          <span>Berat Ditagihkan</span>
                          <strong>{checkout.billableWeight} kg</strong>
                        </div>
                      </div>

                      {checkout.selectedDestination && (
                        <div className="jne-service-section">
                          <div className="jne-service-heading">
                            <h3>Pilih Layanan JNE</h3>
                            <p>Tarif di bawah sudah dikalikan dengan berat yang ditagihkan ({checkout.billableWeight} kg).</p>
                          </div>

                          <div className="jne-service-cards">
                            {checkout.availableServices.map(service => {
                              const isSelected = checkout.selectedService?.code === service.code;
                              return (
                                <label
                                  className={`service-card ${isSelected ? 'selected' : ''}`}
                                  key={service.code}
                                >
                                  <input
                                    type="radio"
                                    name="jneService"
                                    checked={isSelected}
                                    onChange={() => checkout.setSelectedService(service)}
                                  />
                                  <div className="service-info">
                                    <strong>{service.name}</strong>
                                    <span>Estimasi Penyampaian: {service.eta}</span>
                                    <small>Rp {service.feePerKg.toLocaleString('id-ID')} / kg</small>
                                  </div>
                                  <div className="service-price">
                                    Rp {service.totalFee.toLocaleString('id-ID')}
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {checkout.selectedDestination && checkout.selectedService && (
                        <div className="automatic-shipping-summary">
                          <div>
                            <span>Tujuan:</span>
                            <strong>
                              {checkout.selectedDestination.village}, {checkout.selectedDestination.district}
                            </strong>
                          </div>
                          <div>
                            <span>Layanan:</span>
                            <strong>{checkout.selectedService.name}</strong>
                          </div>
                          <div>
                            <span>Ongkir:</span>
                            <strong>Rp {checkout.shippingCostTotal.toLocaleString('id-ID')}</strong>
                          </div>
                        </div>
                      )}

                      <p className="automatic-jne-footnote">
                        * Perhitungan berat: 1–10 pcs ditagihkan 1 kg, 11–20 pcs ditagihkan 2 kg, dst.
                      </p>
                    </div>
                  )}

                  <details className="checkout-optional-note" open={Boolean(checkout.buyerForm.note)}>
                    <summary>Tambah catatan (opsional)</summary>
                    <FloatingInput
                      label="Catatan untuk pesanan"
                      type="text"
                      value={checkout.buyerForm.note}
                      onChange={e => checkout.updateBuyerForm('note', e.target.value)}
                    />
                  </details>

                  {checkout.shippingValidationError && (
                    <div className="shipping-validation-message" role="alert">{checkout.shippingValidationError}</div>
                  )}

                  <div className="checkout-nav">
                    <button
                      type="button"
                      className="checkout-secondary-btn"
                      onClick={() => checkout.setCurrentStep(1)}
                    >
                      <ArrowLeft size={16} aria-hidden="true" />
                      <span>Kembali</span>
                    </button>
                    <button
                      type="button"
                      className="checkout-primary-btn"
                      onClick={checkout.goToStep3}
                    >
                      <span>Pilih pembayaran</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: METODE PEMBAYARAN */}
              {checkout.currentStep === 3 && (
                <div className="checkout-step active">
                  <div className="checkout-step-heading">
                    <h2>Pilih Metode Pembayaran</h2>
                    <p>
                      Pilih QRIS atau Rekening Bank yang akan digunakan. Detail pembayaran dan countdown 1 jam akan tampil pada langkah berikutnya.
                    </p>
                  </div>

                  <div className="payment-method-selector">
                    <label
                      className={`payment-method-card ${checkout.paymentMethod === 'QRIS' ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={checkout.paymentMethod === 'QRIS'}
                        onChange={() => checkout.setPaymentMethod('QRIS')}
                      />
                      <div className="payment-method-logo qris-logo">QRIS</div>
                      <div>
                        <strong>QRIS (Semua E-Wallet & M-Banking)</strong>
                        <span>Bayar instan dengan scan kode QRIS melalui aplikasi pilihan Anda.</span>
                      </div>
                    </label>

                    <label
                      className={`payment-method-card ${checkout.paymentMethod === 'BSI' ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={checkout.paymentMethod === 'BSI'}
                        onChange={() => checkout.setPaymentMethod('BSI')}
                      />
                      <div className="payment-method-logo bank-logo">BSI</div>
                      <div>
                        <strong>Transfer Bank BSI (Bank Syariah Indonesia)</strong>
                        <span>Rekening resmi PT Botani Seed Indonesia.</span>
                      </div>
                    </label>

                    <label
                      className={`payment-method-card ${checkout.paymentMethod === 'BNI' ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={checkout.paymentMethod === 'BNI'}
                        onChange={() => checkout.setPaymentMethod('BNI')}
                      />
                      <div className="payment-method-logo bank-logo">BNI</div>
                      <div>
                        <strong>Transfer Bank BNI</strong>
                        <span>Rekening resmi PT Botani Seed Indonesia.</span>
                      </div>
                    </label>

                    <label
                      className={`payment-method-card ${checkout.paymentMethod === 'BRI' ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={checkout.paymentMethod === 'BRI'}
                        onChange={() => checkout.setPaymentMethod('BRI')}
                      />
                      <div className="payment-method-logo bank-logo">BRI</div>
                      <div>
                        <strong>Transfer Bank BRI</strong>
                        <span>Rekening resmi PT Botani Seed Indonesia.</span>
                      </div>
                    </label>
                  </div>

                  <div className="payment-activation-panel">
                    <div className="payment-total-preview">
                      <span>Total yang Harus Dibayar:</span>
                      <strong>Rp {checkout.grandTotal.toLocaleString('id-ID')}</strong>
                      <small>Sudah mencakup harga produk ({totalQty} paket) dan ongkir.</small>
                    </div>
                    <button
                      type="button"
                      className="start-payment-btn"
                      onClick={checkout.startPaymentSession}
                    >
                      <span>Lihat detail pembayaran</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  </div>
                  <div className="checkout-nav">
                    <button
                      type="button"
                      className="checkout-secondary-btn"
                      onClick={() => checkout.setCurrentStep(2)}
                    >
                      <ArrowLeft size={16} aria-hidden="true" />
                      <span>Kembali</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: DETAIL PEMBAYARAN */}
              {checkout.currentStep === 4 && checkout.paymentSession && (
                <div className="checkout-step active">
                  <div className="checkout-step-heading">
                    <h2>Detail Pembayaran</h2>
                    <p>
                      Periksa seluruh data pada invoice, lakukan pembayaran, lalu konfirmasi untuk menyimpan pesanan dan melanjutkan ke WhatsApp.
                    </p>
                  </div>

                  <div className="active-payment-panel">
                    <div className="payment-session-header">
                      <div>
                        <span>NOMOR PESANAN:</span>
                        <strong>{checkout.paymentSession.orderNumber}</strong>
                      </div>
                      <div className="payment-countdown-box">
                        <span>BATAS PEMBAYARAN:</span>
                        <strong className={checkout.paymentSession.isExpired ? 'expired' : ''}>
                          {checkout.paymentSession.isExpired ? 'EXPIRED' : checkout.formattedCountdown}
                        </strong>
                      </div>
                    </div>

                    <section className="checkout-invoice" aria-labelledby="invoice-title">
                      <div className="checkout-invoice-heading"><FileText size={21} aria-hidden="true" /><div><span>INVOICE PEMESANAN</span><h3 id="invoice-title">{checkout.paymentSession.orderNumber}</h3></div></div>
                      <div className="checkout-invoice-parties">
                        <div>
                          <span>DITAGIHKAN KEPADA</span>
                          <strong>{checkout.resolvedBuyer.name}</strong>
                          <p>{checkout.resolvedBuyer.whatsapp}</p>
                          <p>{checkout.shippingType === 'JNE'
                            ? `${checkout.resolvedBuyer.address}, ${checkout.resolvedBuyer.village}, ${checkout.resolvedBuyer.district}, ${checkout.resolvedBuyer.city}, ${checkout.resolvedBuyer.province} ${checkout.resolvedBuyer.postal}`
                            : 'Ambil di Kantor Botani Seed'}</p>
                        </div>
                        <div><span>PENGIRIMAN & PEMBAYARAN</span><strong>{checkout.shippingType === 'JNE' ? checkout.selectedService?.name : 'Ambil di Kantor Botani Seed'}</strong><p>{checkout.shippingType === 'JNE' && checkout.selectedDestination ? `${checkout.selectedDestination.village}, ${checkout.selectedDestination.district}` : 'Tanpa ongkos kirim'}</p><p>Metode: {checkout.paymentMethod}</p></div>
                      </div>
                      <div className="checkout-invoice-items">{items.map((item) => <div key={item.id}><span><strong>{item.name}</strong><small>{item.qty} × Rp {item.price.toLocaleString('id-ID')}</small></span><strong>Rp {(item.qty * item.price).toLocaleString('id-ID')}</strong></div>)}</div>
                      <div className="checkout-invoice-totals"><div><span>Subtotal produk</span><strong>Rp {subtotalProduct.toLocaleString('id-ID')}</strong></div><div><span>Pengiriman</span><strong>Rp {checkout.shippingCostTotal.toLocaleString('id-ID')}</strong></div><div className="grand"><span>Total pembayaran</span><strong>Rp {checkout.grandTotal.toLocaleString('id-ID')}</strong></div></div>
                      {checkout.buyerForm.note && <p className="checkout-invoice-note"><strong>Catatan:</strong> {checkout.buyerForm.note}</p>}
                    </section>

                    {!checkout.paymentSession.isExpired ? (
                      <>
                        <div className="payment-warning">
                          <strong>Segera Lakukan Pembayaran</strong>
                          <p>Pesanan hanya berlaku selama penghitung waktu berjalan. Jangan bayar setelah waktu habis.</p>
                        </div>

                        {checkout.paymentMethod === 'QRIS' ? (
                          <div className="active-payment-detail">
                            <div className="instant-payment-grid">
                              <div className="instant-qris-card">
                                <span>SCAN UNTUK MEMBAYAR</span>
                                <img
                                  src={ASSETS.qris}
                                  alt="QRIS PT Botani Seed Indonesia"
                                  className="qris-image"
                                />
                                <strong>PT BOTANI SEED INDONESIA</strong>
                              </div>
                              <div className="instant-payment-detail">
                                <div className="instant-total-box">
                                  <span>Jumlah Pembayaran:</span>
                                  <strong className="active-payment-total">
                                    Rp {checkout.paymentSession.grandTotal.toLocaleString('id-ID')}
                                  </strong>
                                  <small>Transfer / Scan sesuai nominal tepat di atas.</small>
                                </div>
                                <ol className="payment-instructions">
                                  <li>Buka aplikasi mobile banking atau e-wallet Anda.</li>
                                  <li>Pilih menu Scan QR / QRIS.</li>
                                  <li>Arahkan kamera ke kode QRIS di samping.</li>
                                  <li>Selesaikan pembayaran sebelum waktu habis.</li>
                                  <li>Simpan bukti pembayaran untuk dikonfirmasi.</li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="active-payment-detail">
                            <div className="bank-payment-layout">
                              <div className="bank-account-display">
                                <span>TRANSFER KE REKENING:</span>
                                <h3>{bankAccountDetails[checkout.paymentMethod]?.bankName}</h3>
                                <div className="bank-account-number">
                                  {bankAccountDetails[checkout.paymentMethod]?.number}
                                </div>
                                <p>Atas Nama: <strong>PT Botani Seed Indonesia</strong></p>
                                <button
                                  type="button"
                                  className="copy-btn"
                                  onClick={() =>
                                    handleCopyAccount(bankAccountDetails[checkout.paymentMethod]?.number || '')
                                  }
                                >
                                  {copySuccess ? <><Check size={16} aria-hidden="true" /> Nomor Rekening Tersalin!</> : 'Salin Nomor Rekening'}
                                </button>
                              </div>

                              <div className="instant-payment-detail">
                                <div className="instant-total-box">
                                  <span>Jumlah Pembayaran:</span>
                                  <strong className="active-payment-total">
                                    Rp {checkout.paymentSession.grandTotal.toLocaleString('id-ID')}
                                  </strong>
                                  <small>Transfer sesuai nominal tepat di atas.</small>
                                </div>
                                <ol className="payment-instructions">
                                  <li>Buka aplikasi m-banking atau ATM Anda.</li>
                                  <li>Pilih menu Transfer Bank.</li>
                                  <li>Pastikan nama penerima adalah PT Botani Seed Indonesia.</li>
                                  <li>Transfer sesuai total nominal sebelum waktu habis.</li>
                                  <li>Simpan bukti transfer untuk dikonfirmasi.</li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        )}

                        <label className="paid-confirmation-check">
                          <input
                            type="checkbox"
                            checked={checkout.isPaymentConfirmedChecked}
                            onChange={e => checkout.setIsPaymentConfirmedChecked(e.target.checked)}
                          />
                          <span>
                            Saya menyatakan sudah melakukan pembayaran sesuai jumlah dan metode pembayaran di atas.
                          </span>
                        </label>

                        <button
                          type="button"
                          className="confirm-paid-btn"
                          disabled={!checkout.isPaymentConfirmedChecked || checkout.isSavingOrder}
                          onClick={checkout.confirmPaidAndOpenWhatsapp}
                        >
                          <MessageCircle size={18} aria-hidden="true" />
                          <span>{checkout.isSavingOrder ? 'Menyimpan invoice…' : 'Konfirmasi via WhatsApp'}</span>
                        </button>

                        {checkout.orderSaveError && <p className="form-error" role="alert">{checkout.orderSaveError}</p>}

                        <p className="payment-verification-note">
                          Lampirkan bukti pembayaran pada percakapan WhatsApp. Tim Botani Seed akan memeriksa pembayaran sebelum pesanan diproses.
                        </p>
                      </>
                    ) : (
                      <div className="payment-expired-notice">
                        <strong>Waktu Pembayaran Telah Habis</strong>
                        <p>
                          Jangan melakukan pembayaran menggunakan nomor pesanan ini. Buat ulang pembayaran untuk memperoleh nomor pesanan baru.
                        </p>
                        <button type="button" className="restart-payment-btn" onClick={checkout.restartPayment}>
                          Buat Ulang Pembayaran
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="payment-security-notice">
                    <strong>Keamanan Pembayaran</strong>
                    <p>
                      Rekening dan QRIS resmi hanya menggunakan nama <strong>PT Botani Seed Indonesia</strong>. Jangan memberikan PIN atau kata sandi kepada siapa pun.
                    </p>
                  </div>

                  <div className="checkout-nav">
                    <button
                      type="button"
                      className="checkout-secondary-btn"
                      onClick={() => checkout.setCurrentStep(3)}
                    >
                      Ganti Metode Pembayaran
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: CHECKOUT SUCCESS */}
              {checkout.currentStep === 5 && (
                <div className="checkout-success">
                  <div className="success-icon"><Check size={36} strokeWidth={3} aria-hidden="true" /></div>
                  <span>KONFIRMASI PEMBAYARAN</span>
                  <h2>WhatsApp Konfirmasi Telah Dibuka</h2>
                  <p>
                    Kirim pesan yang sudah disiapkan kepada admin Botani Seed dan lampirkan bukti pembayaran agar verifikasi dapat dilakukan.
                  </p>
                  <div className="success-order-number">
                    Nomor Pesanan: <strong>{checkout.paymentSession?.orderNumber || '-'}</strong>
                  </div>
                  <a
                    href={`https://api.whatsapp.com/send?phone=${checkout.adminWhatsappNumber}&text=${checkout.generateWhatsappMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="success-whatsapp-btn"
                  >
                    Buka Kembali WhatsApp
                  </a>
                  <button
                    type="button"
                    className="checkout-secondary-btn"
                    onClick={() => {
                      onClose();
                      checkout.setCurrentStep(1);
                    }}
                  >
                    Kembali ke Landing Page
                  </button>
                </div>
              )}
            </main>
            )}

            {/* SIDEBAR SUMMARY PANEL */}
            <aside className="checkout-summary-panel">
              <span className="summary-kicker">RINGKASAN PESANAN</span>
              <div className="summary-product-list">
                {items.map((item) => (
                  <div className="summary-product-row" key={item.id}>
                    <Sprout className="summary-product-icon" size={30} aria-hidden="true" />
                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.qty} × Rp {item.price.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-lines">
                <div>
                  <span>Harga Normal</span>
                  <strong>Rp {normalTotalProduct.toLocaleString('id-ID')}</strong>
                </div>
                <div>
                  <span>Diskon Promo</span>
                  <strong>−Rp {discountTotalProduct.toLocaleString('id-ID')}</strong>
                </div>
                <div>
                  <span>Subtotal Produk</span>
                  <strong>Rp {subtotalProduct.toLocaleString('id-ID')}</strong>
                </div>
                <div>
                  <span>Pengiriman</span>
                  <strong>
                    {checkout.shippingCostTotal > 0
                      ? `Rp ${checkout.shippingCostTotal.toLocaleString('id-ID')}`
                      : checkout.shippingType === 'Ambil di kantor'
                      ? 'Rp 0 (Ambil di Kantor)'
                      : 'Dikonfirmasi'}
                  </strong>
                </div>
              </div>

              <div className="summary-grand-total">
                <span>Total Pembayaran</span>
                <strong>Rp {checkout.grandTotal.toLocaleString('id-ID')}</strong>
                <small>Total mencakup harga produk dan ongkir yang dipilih.</small>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};
