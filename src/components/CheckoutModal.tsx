import React, { useEffect, useState } from 'react';
import { ASSETS } from '../data/assets';
import { useCheckout } from '../hooks/useCheckout';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalQty: number;
  subtotalProduct: number;
  normalTotalProduct: number;
  discountTotalProduct: number;
  onCartOpen: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  totalQty,
  subtotalProduct,
  normalTotalProduct,
  discountTotalProduct,
  onCartOpen
}) => {
  const checkout = useCheckout(totalQty, subtotalProduct);

  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
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
    <div className="checkout-modal-backdrop">
      <section className="checkout-page" id="checkoutPage" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
        <div className="checkout-shell">
          <header className="checkout-header">
            <div className="checkout-brand">
              <span className="checkout-brand-mark">🌱</span>
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
              ×
            </button>
          </header>

          <div className="checkout-progress">
            <div className={`checkout-progress-item ${checkout.currentStep >= 1 ? 'active' : ''}`}>
              <span>1</span>
              <strong>Data Pemesan</strong>
            </div>
            <div className="checkout-progress-line"></div>
            <div className={`checkout-progress-item ${checkout.currentStep >= 2 ? 'active' : ''}`}>
              <span>2</span>
              <strong>Pengiriman</strong>
            </div>
            <div className="checkout-progress-line"></div>
            <div className={`checkout-progress-item ${checkout.currentStep >= 3 ? 'active' : ''}`}>
              <span>3</span>
              <strong>Pembayaran</strong>
            </div>
            <div className="checkout-progress-line"></div>
            <div className={`checkout-progress-item ${checkout.currentStep >= 4 ? 'active' : ''}`}>
              <span>4</span>
              <strong>Detail Pembayaran</strong>
            </div>
          </div>

          <div className="checkout-layout">
            <main className="checkout-main">
              {/* STEP 1: DATA PEMESAN */}
              {checkout.currentStep === 1 && (
                <div className="checkout-step active">
                  <div className="checkout-step-heading">
                    <span>LANGKAH 1</span>
                    <h2>Data Pemesan</h2>
                    <p>Masukkan data pengiriman yang dapat dihubungi oleh tim Botani Seed.</p>
                  </div>

                  <form className="checkout-form" onSubmit={e => e.preventDefault()}>
                    <div className="form-grid">
                      <label>
                        <span>Nama Lengkap *</span>
                        <input
                          type="text"
                          required
                          value={checkout.buyerForm.name}
                          onChange={e => checkout.updateBuyerForm('name', e.target.value)}
                          placeholder="Nama lengkap Anda"
                        />
                      </label>

                      <label>
                        <span>Nomor WhatsApp *</span>
                        <input
                          type="tel"
                          required
                          value={checkout.buyerForm.whatsapp}
                          onChange={e => checkout.updateBuyerForm('whatsapp', e.target.value)}
                          placeholder="Contoh: 081234567890"
                        />
                      </label>

                      <label className="full-field">
                        <span>Email (Opsional)</span>
                        <input
                          type="email"
                          value={checkout.buyerForm.email}
                          onChange={e => checkout.updateBuyerForm('email', e.target.value)}
                          placeholder="alamat@email.com"
                        />
                      </label>

                      <label className="full-field">
                        <span>Alamat Lengkap (Jalan / RT RW / No. Rumah) *</span>
                        <textarea
                          rows={3}
                          required
                          value={checkout.buyerForm.address}
                          onChange={e => checkout.updateBuyerForm('address', e.target.value)}
                          placeholder="Alamat domisili lengkap pengiriman"
                        ></textarea>
                      </label>

                      <label>
                        <span>Kota / Kabupaten *</span>
                        <input
                          type="text"
                          required
                          value={checkout.buyerForm.city}
                          onChange={e => checkout.updateBuyerForm('city', e.target.value)}
                          placeholder="Contoh: Kota Bogor"
                        />
                      </label>

                      <label>
                        <span>Kecamatan *</span>
                        <input
                          type="text"
                          required
                          value={checkout.buyerForm.district}
                          onChange={e => checkout.updateBuyerForm('district', e.target.value)}
                          placeholder="Contoh: Bogor Barat"
                        />
                      </label>

                      <label>
                        <span>Desa / Kelurahan *</span>
                        <input
                          type="text"
                          required
                          value={checkout.buyerForm.village}
                          onChange={e => checkout.updateBuyerForm('village', e.target.value)}
                          placeholder="Contoh: Margajaya"
                        />
                      </label>

                      <label>
                        <span>Provinsi *</span>
                        <input
                          type="text"
                          required
                          value={checkout.buyerForm.province}
                          onChange={e => checkout.updateBuyerForm('province', e.target.value)}
                          placeholder="Contoh: Jawa Barat"
                        />
                      </label>

                      <label>
                        <span>Kode Pos *</span>
                        <input
                          type="text"
                          required
                          value={checkout.buyerForm.postal}
                          onChange={e => checkout.updateBuyerForm('postal', e.target.value)}
                          placeholder="Contoh: 16116"
                        />
                      </label>

                      <label className="full-field">
                        <span>Catatan Pesanan (Opsional)</span>
                        <input
                          type="text"
                          value={checkout.buyerForm.note}
                          onChange={e => checkout.updateBuyerForm('note', e.target.value)}
                          placeholder="Catatan khusus lokasi atau pengiriman"
                        />
                      </label>
                    </div>

                    {checkout.buyerFormError && (
                      <p className="form-error" role="alert">{checkout.buyerFormError}</p>
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
                      Kembali ke Keranjang
                    </button>
                    <button
                      type="button"
                      className="checkout-primary-btn"
                      onClick={checkout.goToStep2}
                    >
                      Lanjut ke Pengiriman
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: PENGIRIMAN */}
              {checkout.currentStep === 2 && (
                <div className="checkout-step active">
                  <div className="checkout-step-heading">
                    <span>LANGKAH 2</span>
                    <h2>Alamat dan Pengiriman</h2>
                    <p>
                      Cari tujuan JNE berdasarkan kelurahan, kecamatan, kota/kabupaten, atau kode pos.
                      Ongkir akan dihitung otomatis dari tarif JNE resmi dari Bogor.
                    </p>
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
                      <div className="automatic-jne-heading">
                        <span>DATA TARIF JNE RESMI DARI BOGOR</span>
                        <h3>Pilih Tujuan Pengiriman JNE</h3>
                        <p>Ketik minimal tiga karakter. Gunakan nama kelurahan, kecamatan, atau kode pos.</p>
                      </div>

                      {!checkout.selectedDestination ? (
                        <div className="destination-search-wrap">
                          <label htmlFor="jneDestinationSearch">Cari Tujuan JNE:</label>
                          <div className="destination-search-input">
                            <span>⌕</span>
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

                  {checkout.shippingValidationError && (
                    <div className="shipping-validation-message" role="alert">{checkout.shippingValidationError}</div>
                  )}

                  <div className="checkout-nav">
                    <button
                      type="button"
                      className="checkout-secondary-btn"
                      onClick={() => checkout.setCurrentStep(1)}
                    >
                      Kembali
                    </button>
                    <button
                      type="button"
                      className="checkout-primary-btn"
                      onClick={checkout.goToStep3}
                    >
                      Lanjut ke Pembayaran
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: METODE PEMBAYARAN */}
              {checkout.currentStep === 3 && (
                <div className="checkout-step active">
                  <div className="checkout-step-heading">
                    <span>LANGKAH 3</span>
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
                      disabled={checkout.isSavingOrder}
                    >
                      {checkout.isSavingOrder ? 'Menyimpan pesanan…' : 'Lanjut ke Detail Pembayaran'}
                    </button>
                  </div>
                  {checkout.orderSaveError && <p className="form-error" role="alert">{checkout.orderSaveError}</p>}

                  <div className="checkout-nav">
                    <button
                      type="button"
                      className="checkout-secondary-btn"
                      onClick={() => checkout.setCurrentStep(2)}
                    >
                      Kembali
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: DETAIL PEMBAYARAN */}
              {checkout.currentStep === 4 && checkout.paymentSession && (
                <div className="checkout-step active">
                  <div className="checkout-step-heading">
                    <span>LANGKAH 4</span>
                    <h2>Detail Pembayaran</h2>
                    <p>
                      Selesaikan pembayaran sesuai metode yang dipilih dalam waktu maksimal <strong>1 jam</strong>, kemudian konfirmasikan pembayaran melalui WhatsApp.
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
                                  {copySuccess ? '✓ Nomor Rekening Tersalin!' : 'Salin Nomor Rekening'}
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
                          disabled={!checkout.isPaymentConfirmedChecked}
                          onClick={checkout.confirmPaidAndOpenWhatsapp}
                        >
                          Saya Sudah Bayar — Konfirmasi via WhatsApp
                        </button>

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
                  <div className="success-icon">✓</div>
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

            {/* SIDEBAR SUMMARY PANEL */}
            <aside className="checkout-summary-panel">
              <span className="summary-kicker">RINGKASAN PESANAN</span>
              <div className="summary-product-row">
                <div className="summary-product-icon">🌱</div>
                <div>
                  <strong>Paket Benih Sayur Botani Seed</strong>
                  <span>{totalQty} paket</span>
                </div>
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
