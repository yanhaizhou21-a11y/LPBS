import * as React from "react";
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
    description: "Halaman utama berfokus pada potensi omzet & kisah sukses petani muda.",
    href: "/",
    icon: Rocket,
    badge: "Utama",
  },
  {
    title: "Home 2: Panen Maksimal",
    description: "Halaman berfokus pada kendala, solusi budidaya, dan nutrisi sayur subur.",
    href: "/home2",
    icon: Sprout,
    badge: "Varian 2",
  },
  {
    title: "Katalog Produk",
    description: "Jelajahi seluruh varietas benih sayuran unggul dan paket hemat.",
    href: "/products",
    icon: Package,
  },
  {
    title: "Dashboard Mitra & B2B",
    description: "Portal manajemen stok, inventaris, dan kemitraan PT Botani Seed.",
    href: "/dashboard",
    icon: Layers,
    badge: "Portal",
  },
];

const DEFAULT_FEATURES: MegaMenuItem[] = [
  {
    title: "Paket Benih Sayur 10 Varietas",
    description: "Kombinasi lengkap benih sayur daun & buah terlaris siap tanam.",
    href: "/products",
    icon: Sparkles,
    badge: "Best Seller",
  },
  {
    title: "Benih Sayur Daun Unggul",
    description: "Bayam hijau, kangkung, sawi manis, pakcoy, selada keriting.",
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
    description: "Lengkap dengan benih, polybag semai, dan pupuk dasar siap pakai.",
    href: "/products",
    icon: Users,
  },
  {
    title: "Panduan Budidaya IPB",
    description: "Modul SOP penanaman praktis yang diriset oleh pakar IPB University.",
    href: "/#cara-mulai",
    icon: BookOpen,
  },
  {
    title: "Jaminan Mutu & Sertifikasi",
    description: "Benih bersertifikasi resmi dengan daya kecambah teruji >85%.",
    href: "/#profil",
    icon: ShieldCheck,
  },
];

const DEFAULT_USE_CASES: MegaMenuItem[] = [
  {
    title: "Peluang Usaha Rumahan",
    description: "Mulai bisnis sayuran segar berkualitas tinggi dari pekarangan rumah.",
    href: "/#peluang",
    icon: Rocket,
  },
  {
    title: "Urban Farming & Keluarga",
    description: "Konsumsi sayur sehat, segar, dan higienis bebas pestisida berlebih.",
    href: "/home2#kendala",
    icon: Briefcase,
  },
  {
    title: "Budidaya Hidroponik & Polybag",
    description: "Solusi bertanam hemat lahan dengan hasil panen seragam dan cepat.",
    href: "/home2#solusi",
    icon: Building2,
  },
];

const DEFAULT_RESOURCE_GROUPS: MegaMenuResourceGroup[] = [
  {
    title: "Eksplorasi",
    links: [
      { title: "Katalog Produk", href: "/products", icon: Package },
      { title: "Paket Promo Hemat", href: "/#promo", icon: Sparkles },
      { title: "5 Langkah Tanam", href: "/#cara-mulai", icon: BookOpen },
    ],
  },
  {
    title: "Informasi & Bantuan",
    links: [
      { title: "Tentang Botani Seed (IPB)", href: "/#profil", icon: GraduationCap },
      { title: "Tanya Jawab (FAQ)", href: "/#faq", icon: FileText },
      { title: "Konsultasi WhatsApp", href: "https://wa.me/6281299450708?text=Halo%20Botani%20Seed%2C%20saya%20ingin%20konsultasi%20paket%20benih", icon: MessageCircle },
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
      className="relative z-10 flex shrink-0 items-center gap-2.5 text-[15px] font-bold tracking-tight text-zinc-900 transition-opacity hover:opacity-90 dark:text-zinc-50"
    >
      {logo ?? (
        <img
          src={ASSETS.logo}
          alt="Botani Seed Logo"
          className="size-7 object-contain"
        />
      )}
      <span className="font-extrabold text-emerald-800 dark:text-emerald-400">
        {brandName}
      </span>
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
        "flex items-center gap-1 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors",
        "text-zinc-700 hover:bg-zinc-100 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
        "dark:text-zinc-300 dark:hover:bg-white/[0.08] dark:hover:text-emerald-400",
        isOpen && "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300",
      )}
    >
      {label}
      <ChevronDown
        className={cn(
          "size-3.5 opacity-60 transition-transform duration-200",
          isOpen && "rotate-180",
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
              "group/item flex items-start gap-3 rounded-xl p-3 transition-colors",
              "hover:bg-emerald-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
              "dark:hover:bg-emerald-950/30 dark:focus-visible:ring-emerald-700",
            )}
          >
            {Icon ? (
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200/80 bg-zinc-50 transition-colors group-hover/item:border-emerald-200 group-hover/item:bg-white dark:border-white/[0.08] dark:bg-white/[0.04] dark:group-hover/item:bg-emerald-900/30">
                <Icon className={cn("size-4.5", item.iconClassName ?? "text-emerald-700 dark:text-emerald-400")} />
              </span>
            ) : null}

            <span className="min-w-0">
              <span className="flex items-center gap-2">
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover/item:text-emerald-700 dark:group-hover/item:text-emerald-400">
                  {item.title}
                </span>
                {item.badge ? (
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
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

function MobileAccordion({
  title,
  value,
  openSection,
  onToggle,
  children,
}: {
  title: string;
  value: MobileSection;
  openSection: MobileSection | null;
  onToggle: (value: MobileSection) => void;
  children: React.ReactNode;
}) {
  const isOpen = openSection === value;
  const contentId = `mobile-${value}-content`;

  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => onToggle(value)}
        className="flex w-full items-center justify-between py-3.5 text-sm font-semibold text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:text-zinc-100"
      >
        {title}
        <ChevronDown
          className={cn(
            "size-4 text-zinc-500 transition-transform duration-200",
            isOpen && "rotate-180 text-emerald-600 dark:text-emerald-400",
          )}
        />
      </button>

      <div
        id={contentId}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
          isOpen ? "grid-rows-[1fr] pb-3 opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="ml-2 flex flex-col gap-1 border-l-2 border-emerald-200 pl-3 dark:border-emerald-900">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMenuItem({ item, onNavigate }: { item: MegaMenuItem; onNavigate: () => void }) {
  const Icon = item.icon;

  return (
    <a
      href={item.href}
      onClick={onNavigate}
      className="flex items-center justify-between rounded-lg px-2.5 py-2 text-sm text-zinc-700 transition-colors hover:bg-emerald-50 hover:text-emerald-800 dark:text-zinc-300 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300"
    >
      <span className="flex items-center gap-2.5">
        {Icon ? <Icon className={cn("size-4 text-emerald-600 dark:text-emerald-400", item.iconClassName)} /> : null}
        <span>{item.title}</span>
      </span>
      {item.badge && (
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
          {item.badge}
        </span>
      )}
    </a>
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
        "sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/90 backdrop-blur-xl shadow-xs",
        "dark:border-white/[0.08] dark:bg-zinc-950/90",
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
                  <DesktopDropdown id="pages-mega-menu" open={openMenu === "pages"} className="w-[420px]">
                    <div className="rounded-2xl border border-zinc-200/90 bg-white p-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.18)] dark:border-zinc-800 dark:bg-zinc-950">
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
                              className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-emerald-50/80 dark:hover:bg-emerald-950/30"
                            >
                              {Icon && (
                                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 group-hover:border-emerald-300 group-hover:bg-white dark:border-zinc-800 dark:bg-zinc-900">
                                  <Icon className="size-4 text-emerald-600 dark:text-emerald-400" />
                                </span>
                              )}
                              <span className="min-w-0">
                                <span className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                                    {item.title}
                                  </span>
                                  {item.badge && (
                                    <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                      {item.badge}
                                    </span>
                                  )}
                                </span>
                                {item.description && (
                                  <span className="mt-0.5 block text-xs text-zinc-500 dark:text-zinc-400">
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
                    <div className="rounded-2xl border border-zinc-200/90 bg-white p-3.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.18)] dark:border-zinc-800 dark:bg-zinc-950">
                      <FeatureGrid items={features} />
                      <div className="mt-3 flex items-center justify-between border-t border-zinc-100 px-3 pt-3 dark:border-zinc-800">
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          Butuh pasokan benih dalam jumlah besar?
                        </span>
                        <a
                          href="/products"
                          className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline dark:text-emerald-400"
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
                  <DesktopDropdown id="use-cases-mega-menu" open={openMenu === "use-cases"} className="w-[410px]">
                    <div className="rounded-2xl border border-zinc-200/90 bg-white p-2.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.18)] dark:border-zinc-800 dark:bg-zinc-950">
                      <div className="flex flex-col gap-1">
                        {useCases.map((item) => {
                          const Icon = item.icon;

                          return (
                            <a
                              key={item.title}
                              href={item.href}
                              className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30"
                            >
                              {Icon ? (
                                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200/80 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                                  <Icon className="size-4.5 text-emerald-700 dark:text-emerald-400" />
                                </span>
                              ) : null}
                              <span>
                                <span className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
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

                      <div className="mt-2 rounded-xl border border-emerald-100 bg-emerald-50/60 p-3.5 dark:border-emerald-950/60 dark:bg-emerald-950/20">
                        <p className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                          🌱 Garansi Daya Tumbuh Tinggi
                        </p>
                        <p className="mt-0.5 text-xs text-emerald-800/80 dark:text-emerald-400/80">
                          Benih bersertifikasi dengan kemurnian dan daya kecambah teruji &gt;85%.
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
                    <div className="grid grid-cols-3 gap-5 rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.18)] dark:border-zinc-800 dark:bg-zinc-950">
                      <div className="flex flex-col justify-between rounded-xl border border-emerald-100 bg-emerald-50/70 p-4 dark:border-emerald-950/60 dark:bg-emerald-950/30">
                        <div>
                          <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-xs">
                            <GraduationCap className="size-5" />
                          </span>
                          <h4 className="mt-3.5 text-sm font-bold text-emerald-950 dark:text-emerald-200">
                            PT Botani Seed Indonesia
                          </h4>
                          <p className="mt-1.5 text-xs leading-relaxed text-emerald-850 dark:text-emerald-300">
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
                                  className="flex items-center gap-2 rounded-lg p-2 text-sm text-zinc-700 transition-colors hover:bg-emerald-50 hover:text-emerald-800 dark:text-zinc-300 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300"
                                >
                                  {Icon ? <Icon className="size-4 text-emerald-600 dark:text-emerald-400" /> : null}
                                  <span>{item.title}</span>
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
                className="hidden sm:inline-flex h-9 items-center justify-center rounded-xl bg-emerald-600 px-4 text-xs font-bold text-white shadow-xs transition-all hover:bg-emerald-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                {ctaLabel}
              </button>
            ) : (
              <a
                href={ctaHref}
                className="hidden sm:inline-flex h-9 items-center justify-center rounded-xl bg-emerald-600 px-4 text-xs font-bold text-white shadow-xs transition-all hover:bg-emerald-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                {ctaLabel}
              </a>
            )}

            {/* MOBILE MENU TOGGLE */}
            <button
              type="button"
              aria-label="Buka navigasi menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="flex size-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-700 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      <div
        aria-hidden={!mobileOpen}
        onClick={closeMobile}
        className={cn(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* MOBILE DRAWER */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-hidden={!mobileOpen}
        aria-label="Navigasi Menu Mobile"
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white p-5 shadow-2xl transition-transform duration-300 ease-out dark:bg-zinc-950 lg:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="mb-6 flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800">
          <Brand brandName={brandName} brandHref={brandHref} logo={logo} onNavigate={closeMobile} />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeMobile}
            aria-label="Tutup menu navigasi"
            className="flex size-9 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-zinc-400 dark:hover:bg-zinc-900"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav aria-label="Mobile navigation" className="-mx-5 flex-1 overflow-y-auto px-5">
          <MobileAccordion
            title="Halaman & Rute"
            value="pages"
            openSection={mobileSection}
            onToggle={toggleMobileSection}
          >
            {pages.map((item) => (
              <MobileMenuItem key={item.title} item={item} onNavigate={closeMobile} />
            ))}
          </MobileAccordion>

          <MobileAccordion
            title="Produk & Paket"
            value="features"
            openSection={mobileSection}
            onToggle={toggleMobileSection}
          >
            {features.map((item) => (
              <MobileMenuItem key={item.title} item={item} onNavigate={closeMobile} />
            ))}
          </MobileAccordion>

          <MobileAccordion
            title="Peluang & Solusi"
            value="use-cases"
            openSection={mobileSection}
            onToggle={toggleMobileSection}
          >
            {useCases.map((item) => (
              <MobileMenuItem key={item.title} item={item} onNavigate={closeMobile} />
            ))}
          </MobileAccordion>

          <MobileAccordion
            title="Tentang & Panduan"
            value="resources"
            openSection={mobileSection}
            onToggle={toggleMobileSection}
          >
            {resourceGroups.flatMap((group) =>
              group.links.map((item) => (
                <MobileMenuItem key={`${group.title}-${item.title}`} item={item} onNavigate={closeMobile} />
              )),
            )}
          </MobileAccordion>
        </nav>

        <div className="mt-auto border-t border-zinc-100 pt-4 dark:border-zinc-800 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Pengaturan Tampilan</span>
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggleButton />
            </div>
          </div>

          {onOpenCheckout ? (
            <button
              type="button"
              onClick={() => {
                closeMobile();
                onOpenCheckout();
              }}
              className="w-full flex h-10 items-center justify-center rounded-xl bg-emerald-600 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700"
            >
              {ctaLabel}
            </button>
          ) : (
            <a
              href={ctaHref}
              onClick={closeMobile}
              className="w-full flex h-10 items-center justify-center rounded-xl bg-emerald-600 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700"
            >
              {ctaLabel}
            </a>
          )}
        </div>
      </aside>
    </header>
  );
}

export default MegaMenuNavbar;
