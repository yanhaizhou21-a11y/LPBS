import React from 'react';

interface VideoPromoProps {
  onOpenCheckout: () => void;
}

export const VideoPromo: React.FC<VideoPromoProps> = ({ onOpenCheckout }) => {
  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/90 text-slate-900 dark:text-slate-50 border-b border-slate-200/60 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* VIDEO CONTAINER */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-slate-900 p-3 sm:p-4 rounded-3xl shadow-2xl border border-slate-700/50">
              <div className="w-full aspect-video rounded-2xl overflow-hidden bg-slate-950">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/GKwGJthfKco?rel=0"
                  title="Tips menanam kangkung, cabai, dan bayam di rumah"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="lg:col-span-6 w-full text-left space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 leading-tight">
              Rp20.000 sudah bisa dapat paket berisi 10 jenis benih.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Setiap paket berisi varietas pilihan dengan daya berkecambah di atas 85% untuk kebutuhan tanam rumah tangga maupun usaha tani.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenCheckout}
                className="botani-cta-pulse w-full sm:w-auto px-8 py-3.5 rounded-full font-extrabold text-white bg-amber-600 hover:bg-amber-500 active:scale-[0.98] shadow-lg shadow-amber-600/25 transition-all cursor-pointer text-base"
              >
                Pesan Paket Benih
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoPromo;
