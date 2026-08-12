import React from 'react';

interface YouTubePromoVideoProps {
  className?: string;
}

const YOUTUBE_PROMO_URL = 'https://www.youtube-nocookie.com/embed/S-7hO2WZT3U?rel=0';

export const YouTubePromoVideo: React.FC<YouTubePromoVideoProps> = ({ className = '' }) => (
  <div className={`w-full max-w-sm mx-auto bg-slate-900 p-3 sm:p-4 rounded-3xl shadow-2xl border border-slate-700/50 ${className}`}>
    <div className="w-full aspect-[9/16] rounded-2xl overflow-hidden bg-slate-950">
      <iframe
        src={YOUTUBE_PROMO_URL}
        title="Promo Paket Benih Sayuran Botani Seed"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full border-0"
      />
    </div>
  </div>
);

export default YouTubePromoVideo;
