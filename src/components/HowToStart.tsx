import React from 'react';
import { ASSETS } from '../data/assets';

export const HowToStart: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: 'Pilih Benih Bersertifikat',
      description: 'Gunakan paket benih bersertifikat resmi dengan standar mutu tinggi untuk hasil panen optimal.',
      image: '/images/step1-paket.jpg',
    },
    {
      number: 2,
      title: 'Semaikan & Tanam',
      description: 'Semaikan benih pada tanah gembur, polybag, pot, atau lahan pekarangan rumah Anda.',
      image: '/images/step2-tanam.jpg',
    },
    {
      number: 3,
      title: 'Rawat Secara Teratur',
      description: 'Siram pagi dan sore hari secara berkala serta jaga pencahayaan dan nutrisi tanah.',
      image: '/images/step3-rawat.jpg',
    },
    {
      number: 4,
      title: 'Panen Hasil Segar',
      description: 'Petik hasil sayuran segar yang melimpah, renyah, dan bernutrisi tinggi saat matang.',
      image: '/images/step4-panen.jpg',
    },
    {
      number: 5,
      title: 'Nikmati & Pasarkan',
      description: 'Konsumsi sehat bersama keluarga atau tawarkan ke tetangga dan pasar lokal.',
      image: '/images/step5-jual.jpg',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          Bagaimana cara memulainya?
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Mulai kecil, pelajari prosesnya, lalu kembangkan berdasarkan hasil dan permintaan.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-left items-stretch">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              {/* Image & Step Badge */}
              <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-900 overflow-hidden">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-amber-500 text-white font-extrabold text-sm flex items-center justify-center shadow-md">
                  {step.number}
                </div>
              </div>

              {/* Title & Description */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToStart;
