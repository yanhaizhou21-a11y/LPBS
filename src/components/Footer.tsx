import React from 'react';
import { ASSETS } from '../data/assets';

export const Footer: React.FC = () => {
  return (
    <footer className="footer-section">
      <div className="container footer-grid">
        <div className="footer-brand-col">
          <div className="footer-logo-wrap">
            <img src={ASSETS.logo} alt="Logo Botani Seed" className="footer-logo-img" />
            <div>
              <strong className="footer-brand-name">PT. Botani Seed Indonesia</strong>
              <small className="footer-brand-tag">Solusi Benih Sayuran Unggul</small>
            </div>
          </div>
          <p className="footer-desc">
            Produsen dan penyedia benih tanaman & sayuran bersertifikat resmi. Berkomitmen mendukung pertanian Indonesia dengan benih bermutu tinggi.
          </p>
          <div className="footer-motto">
            🌱 <em>"Menanam Kebaikan, Memanen Kesejahteraan"</em>
          </div>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-col-title">Navigasi Halaman</h4>
          <ul className="footer-nav-list">
            <li><a href="#">Beranda</a></li>
            <li><a href="#peluang">Peluang Usaha</a></li>
            <li><a href="#kisah">Kisah Petani</a></li>
            <li><a href="#profil">Profil Perusahaan</a></li>
            <li><a href="#promo">Promo 5 Paket</a></li>
            <li><a href="#pesan-sekarang">Pesan Langsung</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-info-col">
          <h4 className="footer-col-title">Informasi Kontak & Alamat</h4>
          <address className="footer-address">
            <p><strong>PT. Botani Seed Indonesia</strong></p>
            <p>📍 Bogor, Jawa Barat, Indonesia</p>
            <p>📧 Email: info@botaniseed.co.id</p>
            <p>💬 Admin WA: +62 812-3456-7890</p>
            <p>📦 Kurir Resmi: JNE Express (Pengiriman Bogor)</p>
          </address>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-flex">
          <p>© 2026 PT. Botani Seed Indonesia. Seluruh hak cipta dilindungi undang-undang.</p>
          <div className="payment-badges">
            <span>QRIS</span>
            <span>BSI</span>
            <span>BNI</span>
            <span>BRI</span>
            <span>JNE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
