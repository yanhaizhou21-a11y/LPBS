import React from 'react';

const stories = [
  {
    nominalTitle: 'Hingga Rp500 juta/bulan',
    farmerName: 'Diyah Rahmawati, membangun usaha sayuran organik',
    description: 'Diyah memulai kegiatan bertani untuk memenuhi kebutuhan pribadi sekaligus mencari alternatif dari harga sayuran organik yang relatif mahal. Dari pekarangan rumah, usahanya berkembang menjadi Abang Sayur Organik yang bergerak pada produksi dan distribusi sayuran organik.',
    highlights: [
      'Memulai dari kegiatan menanam di pekarangan rumah',
      'Mengembangkan usaha produksi dan distribusi sayuran organik',
      'Artikel Tribun Makassar menyebut omzetnya dapat mencapai Rp500 juta per bulan',
    ],
    source: 'Tribun Makassar',
    url: 'https://makassar.tribunnews.com/',
  },
  {
    nominalTitle: 'Hingga Rp100 juta/bulan',
    farmerName: 'Dodih, petani sayuran binaan Kementan',
    description: 'Dodih merupakan petani dari Lembang, Bandung Barat, yang membudidayakan sekitar 70 jenis sayuran. Bersama kelompok taninya, hasil produksi dipasarkan ke Bandung, Jakarta, Tasikmalaya, dan Padalarang, bahkan baby buncis Kenya diekspor ke Singapura.',
    highlights: [
      'Membudidayakan beragam sayuran, dari paprika hingga buncis dan tomat',
      'Mengembangkan pasar antarkota bersama kelompok tani',
      'Merintis pemasaran online bersama kelompok pemuda tani Agri Muda',
    ],
    source: 'Medcom.id',
    url: 'https://www.medcom.id/',
  },
];

export const SuccessStories: React.FC = () => (
  <section id="kisah-sukses" className="py-16 md:py-24 bg-amber-50/50 dark:bg-slate-900/90 border-b border-amber-100/60 dark:border-slate-800 text-slate-900 dark:text-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
        Dua kisah nyata petani sayuran yang berkembang
      </h2>
      <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
        Keduanya bertumbuh melalui konsistensi produksi, perluasan pasar, kolaborasi, dan pemanfaatan saluran penjualan.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-left items-stretch">
        {stories.map((story) => (
          <article key={story.farmerName} className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-amber-200/80 dark:border-slate-700 shadow-md flex flex-col">
            <strong className="text-2xl sm:text-3xl font-black leading-none text-emerald-800 dark:text-emerald-300">
              {story.nominalTitle}
            </strong>
            <h3 className="mt-5 text-xl sm:text-2xl font-bold leading-snug">{story.farmerName}</h3>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">{story.description}</p>
            <ul className="mt-5 list-disc pl-5 space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300">
              {story.highlights.map((point) => <li key={point}>{point}</li>)}
            </ul>
            <a href={story.url} target="_blank" rel="noopener noreferrer" className="mt-auto pt-6 text-sm font-bold text-emerald-700 dark:text-emerald-400 underline">
              Baca sumber {story.source} →
            </a>
          </article>
        ))}
      </div>

      <p className="mt-6 text-xs text-slate-500 dark:text-slate-400">
        Angka yang dicantumkan adalah omzet sebagaimana diberitakan pada sumber, bukan laba bersih dan bukan jaminan hasil untuk setiap usaha.
      </p>
    </div>
  </section>
);

export default SuccessStories;
