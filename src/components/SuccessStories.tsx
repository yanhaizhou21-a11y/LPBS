import React from 'react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

export const SuccessStories: React.FC = () => {
  const testimonials = [
    {
      id: 'testi-1',
      nominalTitle: 'Hingga Rp500 Juta/Bulan',
      farmerName: 'Pak Mamat Supriatna',
      farmerRole: 'Petani Sayuran Kangkung & Bayam',
      highlights: [
        'Omzet tembus 500 Juta rupiah per bulan',
        'Memasok rutin ke pasar induk & supermarket',
        'Menggunakan benih bersertifikat berdaya kecambah tinggi',
      ],
      newsPublisher: 'Liputan6.com',
      newsUrl: 'https://www.liputan6.com/bisnis/read/petani-sayur-omset-ratusan-juta',
    },
    {
      id: 'testi-2',
      nominalTitle: 'Hingga Rp100 Juta/Bulan',
      farmerName: 'Pak Slamet',
      farmerRole: 'Petani Cabai & Tomat Unggul',
      highlights: [
        'Modal awal terjangkau dengan hasil panen melimpah',
        'Siklus panen berkelanjutan secara mingguan',
        'Daya tahan tanaman lebih kuat terhadap hama & penyakit',
      ],
      newsPublisher: 'Detik.com',
      newsUrl: 'https://finance.detik.com/solusi-ukm/kisah-sukses-petani-sayuran',
    },
  ];

  return (
    <section id="kisah-sukses" className="py-16 md:py-24 bg-amber-50/50 dark:bg-slate-900/90 border-b border-amber-100/60 dark:border-slate-800 text-slate-900 dark:text-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          Dua kisah nyata petani sayuran yang berkembang
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Kisah inspiratif petani yang sukses menghasilkan omzet ratusan juta dari jualan sayuran.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-left items-stretch">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-amber-200/80 dark:border-slate-700 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-extrabold text-sm sm:text-base mb-4">
                  {item.nominalTitle}
                </span>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
                  {item.farmerName}
                </h3>
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-6">
                  {item.farmerRole}
                </p>

                <ul className="space-y-3 mb-6">
                  {item.highlights.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {item.newsUrl && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                  <a
                    href={item.newsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:text-amber-600 transition-colors"
                  >
                    <span>Baca selengkapnya di {item.newsPublisher}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
