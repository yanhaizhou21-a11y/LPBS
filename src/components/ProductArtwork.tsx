import { Leaf, ShieldCheck, Sprout } from 'lucide-react';

export function ProductPackVisual({ className = '' }: { className?: string }) {
  return (
    <div className={`relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 p-7 sm:p-9 ${className}`}>
      <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-amber-200/35" />
      <div className="absolute -bottom-16 -right-14 h-52 w-52 rounded-full bg-emerald-900/20" />
      <div className="relative mx-auto flex h-full max-w-[270px] -rotate-2 flex-col overflow-hidden rounded-[28px] border border-white/20 bg-[#071a12] p-5 text-white shadow-2xl">
        <div className="flex items-center justify-between gap-3">
          <img src="/images/logo-footer.png" alt="Botani Seed" className="h-9 w-auto object-contain" />
          <span className="rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-black">10 BENIH</span>
        </div>
        <div className="my-5 grid flex-1 grid-cols-2 gap-2">
          {['Kangkung', 'Bayam', 'Cabai', 'Tomat'].map((name, index) => (
            <div key={name} className={`flex items-end rounded-xl p-2 text-[10px] font-extrabold ${index % 2 ? 'bg-lime-200 text-emerald-950' : 'bg-emerald-600 text-white'}`}>
              {name}
            </div>
          ))}
        </div>
        <div className="border-t border-white/15 pt-4 text-center">
          <strong className="block text-lg leading-tight">PAKET BENIH<br />SAYURAN BOTANI</strong>
          <span className="mt-1 block text-[10px] font-bold tracking-[0.16em] text-orange-300">BENIH SAYURAN UNGGUL</span>
        </div>
      </div>
    </div>
  );
}

export function PromoBundleVisual({ className = '' }: { className?: string }) {
  return (
    <div className={`relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-b from-[#0b4f32] via-[#12663c] to-[#082f22] p-6 text-white shadow-2xl ${className}`}>
      <div className="absolute -right-16 -top-12 h-48 w-48 rounded-full bg-orange-400/30 blur-sm" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center justify-between">
          <img src="/images/logo-footer.png" alt="Botani Seed" className="h-9 w-auto object-contain" />
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-black">PROMO TERBATAS</span>
        </div>
        <div className="mt-7 text-center">
          <span className="text-sm font-extrabold tracking-[0.18em] text-lime-200">PAKET HEMAT</span>
          <strong className="mt-2 block text-4xl sm:text-5xl font-black leading-[0.9]">BUY 5<br /><span className="text-orange-400">GET 10</span></strong>
          <p className="mx-auto mt-3 max-w-xs text-xs leading-relaxed text-emerald-100">5 paket pilihan, masing-masing berisi 10 jenis benih sayuran favorit.</p>
        </div>
        <div className="my-6 grid flex-1 grid-cols-3 items-end gap-2 px-2">
          {[0, 1, 2].map((item) => (
            <div key={item} className={`rounded-xl border border-white/15 bg-[#071a12] p-2 shadow-xl ${item === 1 ? 'h-40 sm:h-48' : 'h-32 sm:h-40'}`}>
              <div className="h-10 rounded-lg bg-gradient-to-br from-lime-200 to-emerald-400" />
              <div className="mt-3 h-2 rounded bg-white/80" />
              <div className="mt-2 h-2 w-2/3 rounded bg-orange-400" />
              <Sprout className="mx-auto mt-4 h-6 w-6 text-emerald-300" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-[9px] font-bold text-emerald-50">
          <span className="flex flex-col items-center gap-1"><Leaf className="h-4 w-4 text-lime-300" />10 varietas</span>
          <span className="flex flex-col items-center gap-1"><ShieldCheck className="h-4 w-4 text-lime-300" />Benih pilihan</span>
          <span className="flex flex-col items-center gap-1"><Sprout className="h-4 w-4 text-lime-300" />Mudah ditanam</span>
        </div>
        <div className="mt-5 rounded-2xl bg-orange-500 px-4 py-3 text-center shadow-lg">
          <span className="text-[10px] font-bold uppercase tracking-wider">Harga promo</span>
          <strong className="block text-2xl font-black">Rp80.000</strong>
        </div>
      </div>
    </div>
  );
}
