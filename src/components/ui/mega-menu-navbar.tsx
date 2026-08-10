import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  Briefcase,
  Building2,
  ChevronDown,
  FileText,
  GraduationCap,
  Layers,
  Leaf,
  Menu,
  MessageCircle,
  MoveRight,
  Package,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sprout,
  Users,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ASSETS } from "@/data/assets";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";

export interface MegaMenuItem {
  title: string;
  description?: string;
  href: string;
  icon?: LucideIcon;
  iconClassName?: string;
  badge?: string;
}

export interface MegaMenuResourceGroup {
  title: string;
  links: MegaMenuItem[];
}

export interface MegaMenuNavbarProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  brandName?: string;
  brandHref?: string;
  logo?: React.ReactNode;
  pages?: MegaMenuItem[];
  features?: MegaMenuItem[];
  useCases?: MegaMenuItem[];
  resourceGroups?: MegaMenuResourceGroup[];
  onOpenCheckout?: () => void;
  ctaHref?: string;
  ctaLabel?: string;
}

type DesktopMenu = "pages" | "features" | "use-cases" | "resources" | null;
type MobileSection = Exclude<DesktopMenu, null>;

const DEFAULT_PAGES: MegaMenuItem[] = [
  {
    title: "Home 1: Peluang Usaha",
    description: "Kisah sukses petani muda Diyah & potensi omzet bisnis rumahan.",
    href: "/",
    icon: Rocket,
    badge: "Utama",
  },
  {
    title: "Home 2: Panen Maksimal",
    description: "Solusi kendala budidaya, nutrisi tanaman, & paket 10 benih.",
    href: "/home2",
    icon: Sprout,
    badge: "Varian 2",
  },
  {
    title: "Katalog Produk Lengkap",
    description: "Jelajahi seluruh varietas benih sayuran & produk pertanian.",
    href: "/products",
    icon: Package,
  },
  {
    title: "Dashboard Mitra & B2B",
    description: "Portal pengadaan, manajemen stok, & kemitraan resmi.",
    href: "/dashboard",
    icon: Layers,
    badge: "Portal B2B",
  },
];

const DEFAULT_FEATURES: MegaMenuItem[] = [
  {
    title: "Paket Benih Sayur 10 Varietas",
    description: "Kombinasi lengkap sayur daun & buah terlaris bersertifikat IPB.",
    href: "/products",
    icon: Sparkles,
    badge: "Best Seller",
  },
  {
    title: "Benih Sayur Daun Unggul",
    description: "Bayam hijau, kangkung super, sawi manis, pakcoy, selada.",
    href: "/products",
    icon: Leaf,
  },
  {
    title: "Benih Sayur Buah & Cabai",
    description: "Cabai rawit prima, tomat ceri, terong ungu, timun renyah.",
    href: "/products",
    icon: Zap,
  },
  {
    title: "Paket Pemula Pekarangan",
    description: "Siap tanam lengkap dengan polybag semai dan nutrisi.",
    href: "/products",
    icon: Users,
  },
  {
    title: "Panduan Budidaya IPB",
    description: "Modul SOP penanaman praktis dari pakar pemuliaan IPB.",
    href: "/#cara-mulai",
    icon: BookOpen,
  },
  {
    title: "Jaminan Mutu & Sertifikasi",
    description: "Daya kecambah teruji >85% dengan kemurnian genetik tinggi.",
    href: "/#profil",
    icon: ShieldCheck,
  },
];

const DEFAULT_USE_CASES: MegaMenuItem[] = [
  {
    title: "Peluang Usaha Rumahan",
    description: "Mulai budidaya sayuran beromzet puluhan juta dari pekarangan.",
    href: "/#peluang",
    icon: Rocket,
  },
  {
    title: "Urban Farming Keluarga",
    description: "Konsumsi sayuran sehat, segar, dan higienis bebas pestisida.",
    href: "/home2#kendala",
    icon: Briefcase,
  },
  {
    title: "Budidaya Hidroponik & Polybag",
    description: "Solusi hemat lahan dengan rotasi panen cepat 25-30 hari.",
    href: "/home2#solusi",
    icon: Building2,
  },
];

const DEFAULT_RESOURCE_GROUPS: MegaMenuResourceGroup[] = [
  {
    title: "Eksplorasi",
    links: [
      { title: "Katalog Benih Sayuran", href: "/products", icon: Package },
      { title: "Paket Promo Hemat 20%", href: "/#promo", icon: Sparkles },
      { title: "5 Langkah Tanam Mudah", href: "/#cara-mulai", icon: BookOpen },
    ],
  },
  {
    title: "Informasi & Bantuan",
    links: [
      { title: "Tentang Botani Seed (IPB)", href: "/#profil", icon: GraduationCap },
      { title: "Tanya Jawab (FAQ)", href: "/#faq", icon: FileText },
      { title: "Konsultasi WhatsApp Gratis", href: "https://wa.me/6281299450708?text=Halo%20Botani%20Seed%2C%20saya%20ingin%20konsultasi%20paket%20benih", icon: MessageCircle },
    ],
  },
];

function Brand({
  brandName,
  brandHref,
  logo,
  onNavigate,
}: {
  brandName: string;
  brandHref: string;
  logo?: React.ReactNode;
  onNavigate?: () => void;
}) {
  return (
    <a
      href={brandHref}
      onClick={onNavigate}
      className="relative z-10 flex shrink-0 items-center gap-2.5 text-base font-extrabold tracking-tight text-zinc-900 transition-opacity hover:opacity-90 dark:text-zinc-50"
    >
      {logo ?? (
        <img
          src={ASSETS.logo}
          alt="Botani Seed"
          className="size-8 object-contain drop-shadow-xs"
        />
      )}
      <div className="flex flex-col">
        <span className="leading-tight text-emerald-800 dark:text-emerald-400 font-black">
          {brandName}
        </span>
        <span className="text-[10px] font-semibold tracking-wider uppercase text-zinc-500 dark:text-zinc-400 leading-none">
          IPB University
        </span>
      </div>
    </a>
  );
}

function MenuTrigger({
  id,
  label,
  isOpen,
  onToggle,
  onOpen,
}: {
  id: string;
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls={id}
      onClick={onToggle}
      onFocus={onOpen}
      className={cn(
        "flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[13px] font-bold transition-all",
        "text-zinc-700 hover:bg-emerald-50/80 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
        "dark:text-zinc-300 dark:hover:bg-zinc-800/80 dark:hover:text-emerald-400",
        isOpen && "bg-emerald-100/70 text-emerald-900 dark:bg-emerald-950/70 dark:text-emerald-300 shadow-xs",
      )}
    >
      <span>{label}</span>
      <ChevronDown
        className={cn(
          "size-3.5 opacity-70 transition-transform duration-200",
          isOpen && "rotate-180 text-emerald-600 dark:text-emerald-400",
        )}
      />
    </button>
  );
}

function FeatureGrid({ items }: { items: MegaMenuItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <a
            key={item.title}
            href={item.href}
            className={cn(
              "group/item flex items-start gap-3 rounded-2xl p-3 transition-all",
              "hover:bg-emerald-50/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
              "dark:hover:bg-emerald-950/30 dark:focus-visible:ring-emerald-700",
            )}
          >
            {Icon ? (
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-zinc-200/90 bg-white transition-colors group-hover/item:border-emerald-300 group-hover/item:bg-emerald-50 dark:border-zinc-800 dark:bg-zinc-900 dark:group-hover/item:bg-emerald-950/50">
                <Icon className={cn("size-4.5", item.iconClassName ?? "text-emerald-700 dark:text-emerald-400")} />
              </span>
            ) : null}

            <span className="min-w-0">
              <span className="flex items-center gap-2">
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover/item:text-emerald-700 dark:group-hover/item:text-emerald-400">
                  {item.title}
                </span>
                {item.badge ? (
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                    {item.badge}
                  </span>
                ) : null}
              </span>
              {item.description ? (
                <span className="mt-1 block text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {item.description}
                </span>
              ) : null}
            </span>
          </a>
        );
      })}
    </div>
  );
}

function DesktopDropdown({
  id,
  open,
  className,
  children,
}: {
  id: string;
  open: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      aria-hidden={!open}
      className={cn(
        "absolute left-0 top-full z-50 pt-2 transition-all duration-150",
        open
          ? "visible translate-y-0 opacity-100"
          : "invisible translate-y-2 opacity-0 pointer-events-none",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function MegaMenuNavbar({
  brandName = "Botani Seed",
  brandHref = "/",
  logo,
  pages = DEFAULT_PAGES,
  features = DEFAULT_FEATURES,
  useCases = DEFAULT_USE_CASES,
  resourceGroups = DEFAULT_RESOURCE_GROUPS,
  onOpenCheckout,
  ctaHref = "/#promo",
  ctaLabel = "Pesan Sekarang",
  className,
  ...props
}: MegaMenuNavbarProps) {
  const [openMenu, setOpenMenu] = React.useState<DesktopMenu>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileSection, setMobileSection] = React.useState<MobileSection | null>("pages");
  const navRef = React.useRef<HTMLElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenMenu(null);
      setMobileOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  React.useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileSection(null);
  };

  const toggleDesktopMenu = (menu: Exclude<DesktopMenu, null>) => {
    setOpenMenu((current) => (current === menu ? null : menu));
  };

  const toggleMobileSection = (section: MobileSection) => {
    setMobileSection((current) => (current === section ? null : section));
  };

  return (
    <header
      {...props}
      ref={navRef}
      className={cn(
        "sticky top-0 z-40 w-full border-b border-zinc-200/90 bg-white/95 backdrop-blur-xl shadow-xs dark:border-zinc-800/90 dark:bg-zinc-950/95",
        className,
      )}
      onMouseLeave={(event) => {
        setOpenMenu(null);
        props.onMouseLeave?.(event);
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Brand brandName={brandName} brandHref={brandHref} logo={logo} />

            {/* DESKTOP NAVIGATION */}
            <nav aria-label="Primary navigation" className="hidden items-center lg:flex">
              <ul className="flex items-center gap-1">
                {/* 1. HALAMAN / PAGES PARENT DROPDOWN */}
                <li className="relative" onMouseEnter={() => setOpenMenu("pages")}>
                  <MenuTrigger
                    id="pages-mega-menu"
                    label="Halaman"
                    isOpen={openMenu === "pages"}
                    onToggle={() => toggleDesktopMenu("pages")}
                    onOpen={() => setOpenMenu("pages")}
                  />
                  <DesktopDropdown id="pages-mega-menu" open={openMenu === "pages"} className="w-[430px]">
                    <div className="rounded-3xl border border-zinc-200/90 bg-white p-3.5 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
                      <div className="mb-2 px-3 pt-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        Pilih Rute Halaman
                      </div>
                      <div className="flex flex-col gap-1">
                        {pages.map((item) => {
                          const Icon = item.icon;
                          return (
                            <a
                              key={item.title}
                              href={item.href}
                              className="group flex items-start gap-3 rounded-2xl p-2.5 transition-colors hover:bg-emerald-50/80 dark:hover:bg-emerald-950/40"
                            >
                              {Icon && (
                                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-white group-hover:border-emerald-300 group-hover:bg-emerald-50 dark:border-zinc-800 dark:bg-zinc-900 dark:group-hover:bg-emerald-950/50">
                                  <Icon className="size-4.5 text-emerald-600 dark:text-emerald-400" />
                                </span>
                              )}
                              <span className="min-w-0">
                                <span className="flex items-center gap-2">
                                  <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                                    {item.title}
                                  </span>
                                  {item.badge && (
                                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                      {item.badge}
                                    </span>
                                  )}
                                </span>
                                {item.description && (
                                  <span className="mt-0.5 block text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                    {item.description}
                                  </span>
                                )}
                              </span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </DesktopDropdown>
                </li>

                {/* 2. PRODUK & PAKET (FEATURES) */}
                <li className="relative" onMouseEnter={() => setOpenMenu("features")}>
                  <MenuTrigger
                    id="features-mega-menu"
                    label="Produk & Paket"
                    isOpen={openMenu === "features"}
                    onToggle={() => toggleDesktopMenu("features")}
                    onOpen={() => setOpenMenu("features")}
                  />
                  <DesktopDropdown id="features-mega-menu" open={openMenu === "features"} className="w-[660px]">
                    <div className="rounded-3xl border border-zinc-200/90 bg-white p-4 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
                      <FeatureGrid items={features} />
                      <div className="mt-3.5 flex items-center justify-between border-t border-zinc-100 px-3 pt-3.5 dark:border-zinc-800">
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          Butuh pasokan benih dalam jumlah besar?
                        </span>
                        <a
                          href="/products"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline dark:text-emerald-400"
                        >
                          Lihat Katalog Lengkap
                          <MoveRight className="size-3.5" />
                        </a>
                      </div>
                    </div>
                  </DesktopDropdown>
                </li>

                {/* 3. PELUANG & SOLUSI (USE CASES) */}
                <li className="relative" onMouseEnter={() => setOpenMenu("use-cases")}>
                  <MenuTrigger
                    id="use-cases-mega-menu"
                    label="Peluang & Solusi"
                    isOpen={openMenu === "use-cases"}
                    onToggle={() => toggleDesktopMenu("use-cases")}
                    onOpen={() => setOpenMenu("use-cases")}
                  />
                  <DesktopDropdown id="use-cases-mega-menu" open={openMenu === "use-cases"} className="w-[420px]">
                    <div className="rounded-3xl border border-zinc-200/90 bg-white p-3 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
                      <div className="flex flex-col gap-1">
                        {useCases.map((item) => {
                          const Icon = item.icon;

                          return (
                            <a
                              key={item.title}
                              href={item.href}
                              className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-emerald-50/80 dark:hover:bg-emerald-950/30"
                            >
                              {Icon ? (
                                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-zinc-200/90 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                                  <Icon className="size-4.5 text-emerald-700 dark:text-emerald-400" />
                                </span>
                              ) : null}
                              <span>
                                <span className="block text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                                  {item.title}
                                </span>
                                {item.description ? (
                                  <span className="mt-0.5 block text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                                    {item.description}
                                  </span>
                                ) : null}
                              </span>
                            </a>
                          );
                        })}
                      </div>

                      <div className="mt-2.5 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-3.5 dark:border-emerald-950/60 dark:bg-emerald-950/20">
                        <p className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                          🌱 Garansi Daya Tumbuh Tinggi
                        </p>
                        <p className="mt-0.5 text-xs text-emerald-800/80 dark:text-emerald-400/80 leading-relaxed">
                          Benih bersertifikasi resmi IPB University dengan daya kecambah teruji &gt;85%.
                        </p>
                      </div>
                    </div>
                  </DesktopDropdown>
                </li>

                {/* 4. TENTANG & SUMBER DAYA (RESOURCES) */}
                <li className="relative" onMouseEnter={() => setOpenMenu("resources")}>
                  <MenuTrigger
                    id="resources-mega-menu"
                    label="Tentang & Panduan"
                    isOpen={openMenu === "resources"}
                    onToggle={() => toggleDesktopMenu("resources")}
                    onOpen={() => setOpenMenu("resources")}
                  />
                  <DesktopDropdown
                    id="resources-mega-menu"
                    open={openMenu === "resources"}
                    className="left-1/2 w-[620px] -translate-x-1/2"
                  >
                    <div className="grid grid-cols-3 gap-5 rounded-3xl border border-zinc-200/90 bg-white p-4 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
                      <div className="flex flex-col justify-between rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4 dark:border-emerald-950/60 dark:bg-emerald-950/30">
                        <div>
                          <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
                            <GraduationCap className="size-5" />
                          </span>
                          <h4 className="mt-3.5 text-sm font-bold text-emerald-950 dark:text-emerald-200">
                            PT Botani Seed Indonesia
                          </h4>
                          <p className="mt-1.5 text-xs leading-relaxed text-emerald-900/80 dark:text-emerald-300">
                            Badan usaha resmi IPB University untuk riset, pemuliaan, dan distribusi benih unggul nasional.
                          </p>
                        </div>
                        <a
                          href="/#profil"
                          className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:underline dark:text-emerald-300"
                        >
                          Pelajari Profil Perusahaan
                          <MoveRight className="size-3" />
                        </a>
                      </div>

                      <div className="col-span-2 grid grid-cols-2 gap-4">
                        {resourceGroups.map((group) => (
                          <div key={group.title} className="flex flex-col gap-1">
                            <h4 className="mb-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                              {group.title}
                            </h4>
                            {group.links.map((item) => {
                              const Icon = item.icon;

                              return (
                                <a
                                  key={item.title}
                                  href={item.href}
                                  className="flex items-center gap-2 rounded-xl p-2 text-sm text-zinc-700 transition-colors hover:bg-emerald-50 hover:text-emerald-800 dark:text-zinc-300 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300"
                                >
                                  {Icon ? <Icon className="size-4 text-emerald-600 dark:text-emerald-400" /> : null}
                                  <span className="font-medium">{item.title}</span>
                                </a>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </DesktopDropdown>
                </li>
              </ul>
            </nav>
          </div>

          {/* RIGHT ACTIONS: LANGUAGE, THEME, ORDER CTA */}
          <div className="flex items-center gap-2.5">
            <div className="hidden items-center gap-2 md:flex">
              <LanguageToggle />
              <ThemeToggleButton />
            </div>

            {onOpenCheckout ? (
              <button
                type="button"
                onClick={onOpenCheckout}
                className="hidden sm:inline-flex h-10 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 text-xs font-bold text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-95"
              >
                <ShoppingBag className="size-3.5" />
                <span>{ctaLabel}</span>
              </button>
            ) : (
              <a
                href={ctaHref}
                className="hidden sm:inline-flex h-10 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 text-xs font-bold text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-95"
              >
                <ShoppingBag className="size-3.5" />
                <span>{ctaLabel}</span>
              </a>
            )}

            {/* MOBILE MENU TOGGLE BUTTON */}
            <button
              type="button"
              aria-label="Buka navigasi menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="flex size-11 items-center justify-center rounded-2xl border border-zinc-200/90 bg-white text-zinc-800 shadow-xs transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 lg:hidden"
            >
              <Menu className="size-5.5 text-emerald-700 dark:text-emerald-400" />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE BACKDROP OVERLAY */}
      <div
        aria-hidden={!mobileOpen}
        onClick={closeMobile}
        className={cn(
          "fixed inset-0 z-[90] bg-black/75 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* MOBILE SLIDE-IN DRAWER */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-hidden={!mobileOpen}
        aria-label="Navigasi Menu Mobile"
        className={cn(
          "fixed inset-y-0 right-0 z-[100] flex w-[88vw] max-w-sm flex-col bg-white p-5 sm:p-6 shadow-2xl transition-transform duration-300 ease-out dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 lg:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* DRAWER HEADER */}
        <div className="mb-5 flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800/80">
          <Brand brandName={brandName} brandHref={brandHref} logo={logo} onNavigate={closeMobile} />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeMobile}
            aria-label="Tutup menu navigasi"
            className="flex size-9 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* DRAWER NAVIGATION ACCORDIONS */}
        <nav aria-label="Mobile navigation" className="-mx-5 flex-1 overflow-y-auto px-5 py-1 space-y-2">
          {/* SECTION 1: HALAMAN / RUTE */}
          <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-2 dark:border-zinc-800/80 dark:bg-zinc-900/40">
            <button
              type="button"
              onClick={() => toggleMobileSection("pages")}
              className="flex w-full items-center justify-between p-2 text-sm font-extrabold text-zinc-900 dark:text-zinc-100"
            >
              <span className="flex items-center gap-2">
                <Rocket className="size-4 text-emerald-600 dark:text-emerald-400" />
                <span>Pilih Halaman</span>
              </span>
              <ChevronDown
                className={cn(
                  "size-4 text-zinc-400 transition-transform duration-200",
                  mobileSection === "pages" && "rotate-180 text-emerald-600 dark:text-emerald-400",
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {mobileSection === "pages" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-1 pt-1">
                    {pages.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.title}
                          href={item.href}
                          onClick={closeMobile}
                          className="flex items-center justify-between rounded-xl bg-white p-2.5 text-xs font-semibold text-zinc-800 shadow-xs transition-colors hover:bg-emerald-50 hover:text-emerald-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-emerald-950/60"
                        >
                          <span className="flex items-center gap-2">
                            {Icon && <Icon className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                            <span>{item.title}</span>
                          </span>
                          {item.badge && (
                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                              {item.badge}
                            </span>
                          )}
                        </a>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SECTION 2: PRODUK & PAKET */}
          <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-2 dark:border-zinc-800/80 dark:bg-zinc-900/40">
            <button
              type="button"
              onClick={() => toggleMobileSection("features")}
              className="flex w-full items-center justify-between p-2 text-sm font-extrabold text-zinc-900 dark:text-zinc-100"
            >
              <span className="flex items-center gap-2">
                <Package className="size-4 text-emerald-600 dark:text-emerald-400" />
                <span>Produk & Paket Benih</span>
              </span>
              <ChevronDown
                className={cn(
                  "size-4 text-zinc-400 transition-transform duration-200",
                  mobileSection === "features" && "rotate-180 text-emerald-600 dark:text-emerald-400",
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {mobileSection === "features" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-1 pt-1">
                    {features.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.title}
                          href={item.href}
                          onClick={closeMobile}
                          className="flex items-center justify-between rounded-xl bg-white p-2.5 text-xs font-semibold text-zinc-800 shadow-xs transition-colors hover:bg-emerald-50 hover:text-emerald-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-emerald-950/60"
                        >
                          <span className="flex items-center gap-2">
                            {Icon && <Icon className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                            <span>{item.title}</span>
                          </span>
                          {item.badge && (
                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                              {item.badge}
                            </span>
                          )}
                        </a>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SECTION 3: PELUANG & SOLUSI */}
          <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-2 dark:border-zinc-800/80 dark:bg-zinc-900/40">
            <button
              type="button"
              onClick={() => toggleMobileSection("use-cases")}
              className="flex w-full items-center justify-between p-2 text-sm font-extrabold text-zinc-900 dark:text-zinc-100"
            >
              <span className="flex items-center gap-2">
                <Sprout className="size-4 text-emerald-600 dark:text-emerald-400" />
                <span>Peluang & Solusi Tanam</span>
              </span>
              <ChevronDown
                className={cn(
                  "size-4 text-zinc-400 transition-transform duration-200",
                  mobileSection === "use-cases" && "rotate-180 text-emerald-600 dark:text-emerald-400",
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {mobileSection === "use-cases" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-1 pt-1">
                    {useCases.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.title}
                          href={item.href}
                          onClick={closeMobile}
                          className="flex items-center justify-between rounded-xl bg-white p-2.5 text-xs font-semibold text-zinc-800 shadow-xs transition-colors hover:bg-emerald-50 hover:text-emerald-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-emerald-950/60"
                        >
                          <span className="flex items-center gap-2">
                            {Icon && <Icon className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                            <span>{item.title}</span>
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SECTION 4: TENTANG & PANDUAN */}
          <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-2 dark:border-zinc-800/80 dark:bg-zinc-900/40">
            <button
              type="button"
              onClick={() => toggleMobileSection("resources")}
              className="flex w-full items-center justify-between p-2 text-sm font-extrabold text-zinc-900 dark:text-zinc-100"
            >
              <span className="flex items-center gap-2">
                <GraduationCap className="size-4 text-emerald-600 dark:text-emerald-400" />
                <span>Tentang & Bantuan</span>
              </span>
              <ChevronDown
                className={cn(
                  "size-4 text-zinc-400 transition-transform duration-200",
                  mobileSection === "resources" && "rotate-180 text-emerald-600 dark:text-emerald-400",
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {mobileSection === "resources" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-1 pt-1">
                    {resourceGroups.flatMap((group) =>
                      group.links.map((item) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={`${group.title}-${item.title}`}
                            href={item.href}
                            onClick={closeMobile}
                            className="flex items-center justify-between rounded-xl bg-white p-2.5 text-xs font-semibold text-zinc-800 shadow-xs transition-colors hover:bg-emerald-50 hover:text-emerald-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-emerald-950/60"
                          >
                            <span className="flex items-center gap-2">
                              {Icon && <Icon className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                              <span>{item.title}</span>
                            </span>
                          </a>
                        );
                      }),
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* DRAWER BOTTOM ACTION CONTROLS */}
        <div className="mt-auto border-t border-zinc-100 pt-4 dark:border-zinc-800/80 space-y-3">
          <div className="flex items-center justify-between rounded-2xl bg-zinc-100/80 p-2.5 dark:bg-zinc-900">
            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Pengaturan Tampilan</span>
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggleButton />
            </div>
          </div>

          <a
            href="https://wa.me/6281299450708?text=Halo%20Botani%20Seed%2C%20saya%20ingin%20tanya%20dan%20pesan%20paket%20benih."
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobile}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-2xl border border-emerald-300 bg-emerald-50 text-xs font-bold text-emerald-800 transition hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
          >
            <MessageCircle className="size-4" />
            <span>Chat WhatsApp Agronomi</span>
          </a>

          {onOpenCheckout ? (
            <button
              type="button"
              onClick={() => {
                closeMobile();
                onOpenCheckout();
              }}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-sm font-bold text-white shadow-md transition hover:bg-emerald-700 active:scale-98"
            >
              <ShoppingBag className="size-4" />
              <span>{ctaLabel}</span>
            </button>
          ) : (
            <a
              href={ctaHref}
              onClick={closeMobile}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-sm font-bold text-white shadow-md transition hover:bg-emerald-700 active:scale-98"
            >
              <ShoppingBag className="size-4" />
              <span>{ctaLabel}</span>
            </a>
          )}
        </div>
      </aside>
    </header>
  );
}

export default MegaMenuNavbar;
