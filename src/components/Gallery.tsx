import React from 'react';

export const Gallery: React.FC = () => {
  const galleryItems = [
    { id: 1, title: 'Display produk Botani Seed Indonesia', caption: '', imageUrl: '/images/qc-warehouse.jpg' },
    { id: 2, title: 'Gudang penyimpanan produk', caption: '', imageUrl: '/images/warehouse.jpg' },
    { id: 3, title: 'Proses pengiriman pesanan', caption: '', imageUrl: '/images/shipping.jpg' },
    { id: 4, title: 'Kegiatan promosi dan pameran produk', caption: '', imageUrl: '/images/product-display.jpg' },
    { id: 5, title: 'Booth dan tim promosi Botani Seed Indonesia', caption: '', imageUrl: '/images/booth.jpg' },
    { id: 6, title: 'Proses pengecekan dan persiapan produk di gudang sebelum pengiriman.', caption: '', imageUrl: '/images/promo-event.jpg' },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/90 text-slate-900 dark:text-slate-50 border-b border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          Dokumentasi Kegiatan PT Botani Seed Indonesia
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Berikut beberapa dokumentasi display produk, gudang, pengiriman, dan aktivitas promosi Botani Seed Indonesia.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
            >
              <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-900 overflow-hidden w-full">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 mb-1.5 leading-snug">
                    {item.title}
                  </h3>
                  {item.caption && <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.caption}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
