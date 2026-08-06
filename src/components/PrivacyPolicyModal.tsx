import React from 'react';
import { X, ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden text-slate-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Kebijakan Privasi & Perlindungan Data</h2>
              <p className="text-xs text-slate-400">PT Botani Seed Indonesia</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs leading-relaxed text-slate-300">
          <div className="p-3.5 bg-emerald-500/5 border border-emerald-500/20 rounded-xl text-emerald-300">
            Kami sangat menghargai privasi dan kepercayaan Anda saat membeli benih sayuran di PT Botani Seed Indonesia. Dokumen ini menjelaskan pengumpulan, penggunaan, dan perlindungan data pribadi Anda.
          </div>

          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-1.5 mb-1.5">
              <Eye className="w-4 h-4 text-emerald-400" /> 1. Data Pribadi yang Dikumpulkan
            </h3>
            <p> Saat Anda mengisi form pemesanan checkout, kami mengumpulkan data pribadi berikut:</p>
            <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-400 pl-2">
              <li>Nama lengkap pembeli</li>
              <li>Nomor WhatsApp aktif (untuk konfirmasi pengiriman pesanan)</li>
              <li>Alamat email (opsional)</li>
              <li>Alamat lengkap tujuan (Jalan, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten, Kode Pos)</li>
              <li>Pilihan kurir dan catatan pesanan</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-1.5 mb-1.5">
              <Lock className="w-4 h-4 text-emerald-400" /> 2. Tujuan Penggunaan Data
            </h3>
            <p>Data pribadi Anda digunakan semata-mata untuk:</p>
            <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-400 pl-2">
              <li>Memproses dan memverifikasi pesanan benih sayuran Anda.</li>
              <li>Menghitung ongkos kirim resmi JNE dan mencetak label paket kurir.</li>
              <li>Menghubungi Anda via WhatsApp resmi CS kami terkait konfirmasi status pembayaran.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-1.5 mb-1.5">
              <FileText className="w-4 h-4 text-emerald-400" /> 3. Penyimpanan & Keamanan Data
            </h3>
            <p>
              Data tersimpan secara aman dalam database Cloud MongoDB Atlas kami yang terenkripsi SSL. Kami tidak pernah menjual, menyewakan, atau membagikan data pribadi Anda kepada pihak ketiga manapun di luar kurir ekspedisi pengiriman pesanan.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Saya Mengerti
          </button>
        </div>
      </div>
    </div>
  );
}
