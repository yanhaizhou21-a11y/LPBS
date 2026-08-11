import React from 'react';
import { Award, ShieldCheck, HeartHandshake } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: Award,
      title: 'Hasil Riset Pakar IPB',
      desc: 'Formulasi dan varietas benih dikembangkan oleh tim peneliti dan pakar ilmu pemuliaan tanaman IPB University.',
    },
    {
      icon: ShieldCheck,
      title: 'Sertifikasi Resmi BPSB',
      desc: 'Lulus uji laboratorium dengan standar mutu nasional dan garansi daya kecambah tinggi di atas 85%.',
    },
    {
      icon: HeartHandshake,
      title: 'Pendampingan Tanam',
      desc: 'Dilengkapi modul panduan SOP berkebun serta layanan konsultasi gratis untuk mendukung sukses panen.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          Kenapa harus memilih Paket Benih Sayur Botani Seed?
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          3 keunggulan utama yang menjadikan produk benih kami dipercaya oleh ribuan keluarga dan petani mitra.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch text-left">
          {reasons.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-8 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-6 shadow-xs">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
