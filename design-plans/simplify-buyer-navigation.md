# Bangun navigasi publik bersama yang siap menampung banyak homepage

Commit yang diaudit: `bd95e1fe6e68bd1b287767adffa69114d6393671`

## Ringkasan audit

Surface yang diaudit adalah navbar publik pada `/`, `/home2`, dan `/products`, termasuk perilaku desktop/mobile serta kontrak penambahan homepage berikutnya. Dashboard dan portal admin sengaja tidak masuk scope karena memiliki audience dan navigasi berbeda.

Referensi eksternal yang dipilih pengguna adalah Velt. Homepage dan halaman pricing Velt memakai hirarki navigasi yang sama: brand, beberapa menu berkelompok, tautan langsung, aksi akun, dan satu CTA utama. Rencana ini mengadaptasi pola pengelolaan dan hirarkinya ke identitas Botani Seed; bukan menyalin merek, copy, atau pixel styling Velt.

## Evidence chain

- `src/components/Navbar.tsx` menjadi satu owner tampilan navbar, tetapi daftar tujuannya masih berupa tiga link hardcoded (`/`, `/products`, dan `/#profil`). Menambah homepage baru akan memerlukan perubahan manual di navbar.
- `src/App.tsx` memiliki union `View`, pencocokan path, dan cabang render tersendiri untuk `landing`, `landing2`, dan `products`. Metadata navigasi dan pengetahuan route publik belum memiliki sumber bersama.
- `src/i18n.tsx` menyimpan label navbar secara hardcoded per bahasa. Belum ada nama dan deskripsi terstruktur untuk varian homepage yang dapat dipakai desktop dan mobile.
- `src/index.css` masih mengikat identitas navbar pada kelas `.notch-*` dan `.mobile-navigation`. Keputusan baru pengguna secara eksplisit meminta pola navbar Velt untuk dipakai lintas banyak homepage, sehingga keputusan notch lama di `memory/Prompt md.md` dan `memory/prd.md` perlu ditandai sebagai superseded setelah implementasi disetujui.
- Navbar sudah dipasang sekali oleh `App.tsx` di atas semua route publik. Titik integrasi ini benar dan harus dipertahankan; jangan menduplikasi navbar ke masing-masing homepage.

## Temuan terverifikasi

### 1. Hirarki sekarang tidak siap untuk Homepage 3, 4, dan seterusnya

Link flat yang ditulis langsung di `Navbar.tsx` akan cepat penuh dan memaksa desktop serta mobile dikelola terpisah. Koreksinya adalah satu registry halaman publik yang menjadi sumber label, path, status aktif, visibilitas menu, dan pengelompokan. Navbar desktop dan mobile membaca registry yang sama.

### 2. Bentuk notch dan menu flat tidak mendukung navigation grouping

Siluet notch cocok untuk tiga tujuan, tetapi tidak menyediakan ruang atau pola disclosure ketika varian homepage bertambah. Koreksinya adalah header horizontal Botani Seed yang terinspirasi hirarki Velt: satu menu `Homepage` berkelompok, tautan langsung untuk tugas pembelian, dan action cluster yang konsisten. Warna, tipografi, radius, dan logo tetap memakai design token Botani Seed.

### 3. Mobile belum mempunyai kontrak skalabilitas dan aksesibilitas

Panel mobile saat ini mengulang tiga link tanpa grouping, active state yang jelas, focus management lengkap, atau aturan overflow untuk daftar yang tumbuh. Koreksinya adalah mobile sheet dari konfigurasi yang sama, dengan grup homepage berbentuk accordion, target sentuh minimum 44px, body scroll lock, Escape/backdrop close, dan focus return.

## Design decision

Gunakan satu shared public header dengan susunan berikut.

### Desktop

- Kiri: logo Botani Seed menuju `/`.
- Tengah:
  - Trigger `Homepage` membuka popover berisi homepage yang sudah tersedia. Setiap item memiliki nama pendek, satu baris deskripsi, dan active state.
  - Tautan langsung `Produk` menuju `/products`.
  - Tautan langsung `Tentang kami` menuju section profil pada homepage utama.
- Kanan: language toggle, theme toggle, cart dengan count, lalu satu CTA `Pesan sekarang`.
- Header tetap menjadi satu instance di `App.tsx`, sticky, hilang saat scroll turun dan muncul saat scroll naik. Saat popover atau mobile menu terbuka, header tidak boleh bersembunyi.

### Mobile

- Bar utama hanya berisi logo, cart, dan tombol menu; semua target sentuh minimum 44x44px.
- Tombol menu membuka sheet setinggi viewport dari kanan dengan backdrop. Lebar maksimum 420px dan 100% pada layar sempit.
- Grup `Homepage` terbuka secara default dan berisi hanya route yang benar-benar tersedia. Jangan menampilkan placeholder `/home3` atau `/home4` sebelum page-nya ada.
- `Produk` dan `Tentang kami` tetap menjadi tujuan langsung. Language/theme ditempatkan pada utility row; satu CTA order berada di bagian bawah sheet.
- Item aktif memakai kombinasi warna, weight, dan indikator visual; jangan bergantung pada warna saja.
- Sheet menutup setelah navigasi, klik backdrop, atau Escape; focus dikembalikan ke tombol menu dan body scroll dipulihkan.

## Shared route contract

Buat metadata tunggal di `src/config/public-pages.ts` dengan bentuk minimal:

```ts
type PublicPageDefinition = {
  id: 'home' | 'home2' | 'products'
  path: '/' | '/home2' | '/products'
  labelKey: TranslationKey
  descriptionKey?: TranslationKey
  group: 'homepages' | 'primary'
  navigationVisible: boolean
}
```

- Isi awal: Home 1 (`/`), Home 2 (`/home2`), dan Produk (`/products`).
- `Navbar.tsx` memakai registry untuk menyusun menu desktop/mobile dan menentukan active state.
- `App.tsx` memakai registry untuk resolusi public path; mapping page id ke komponen tetap berada dekat render owner agar registry tidak mencampur metadata dengan JSX dan state checkout.
- Saat Homepage 3 dibuat, pekerjaan minimum adalah menambah komponen, satu definition, satu renderer mapping, dan copy bilingual. Tidak ada array menu kedua.
- Jangan menambah React Router hanya untuk perubahan ini; routing native yang ada sudah cukup untuk jumlah route saat ini.

## Reuse

- Pertahankan `src/components/Navbar.tsx` sebagai owner; refactor isi, jangan membuat navbar kedua.
- Gunakan `LanguageToggle`, `ThemeToggleButton`, `CartDrawer`, logo `ASSETS.logo`, Motion, dan ikon Lucide yang sudah tersedia.
- Gunakan token warna/light-dark yang sudah ada di `src/index.css`; ganti kelas `.notch-*` dengan kelas semantik `.site-header`, `.site-nav`, `.nav-popover`, dan `.mobile-nav-sheet` hanya sejauh diperlukan.
- Gunakan mekanisme `useReducedMotion` dan algoritme hide/show on scroll yang sudah berjalan.
- Jangan memasang shadcn, Radix, atau dependency menu baru. Popover/accordion sederhana dapat dibuat dengan React, semantic buttons, CSS, dan Motion yang sudah terpasang.

## Changes

### 1. Tambahkan registry halaman publik

**File baru:** `src/config/public-pages.ts`

- Definisikan type dan initial definitions untuk `/`, `/home2`, dan `/products`.
- Sediakan helper kecil untuk lookup path dan filter group; hindari class, provider, atau generic registry framework.
- Pastikan `/admin/*`, secret login, dan `/dashboard` tidak pernah masuk registry publik.

### 2. Hubungkan route resolution ke registry

**File:** `src/App.tsx`

- Turunkan public page id dari registry alih-alih mengulang literal path pada beberapa kondisi.
- Pertahankan cabang auth/admin yang sudah ada dan renderer mapping eksplisit untuk landing page.
- Pasang `Navbar` satu kali untuk semua public pages seperti sekarang.
- Sediakan current pathname ke navbar bila diperlukan; jangan membuat global routing context baru.

### 3. Refactor navbar menjadi Velt-inspired shared header

**File:** `src/components/Navbar.tsx`

- Hapus shell notch dan daftar link hardcoded.
- Susun logo, grouped homepage popover, tautan langsung, dan utility/action cluster sesuai keputusan desktop.
- Semua item homepage berasal dari `public-pages.ts` dan hanya ditampilkan jika `navigationVisible` true.
- Tambahkan active state untuk current page dan `aria-current="page"` pada item yang tepat.
- Pastikan popover dapat dibuka dengan Enter/Space, ditutup dengan Escape/outside click, dan focus tetap logis.
- Pertahankan cart count, callbacks checkout/order, bilingual mode, theme control, reduced motion, serta hide-on-scroll behavior.

### 4. Terapkan mobile sheet dari sumber navigasi yang sama

**File:** `src/components/Navbar.tsx`

- Render menu mobile dari registry yang sama; jangan membuat `mobileLinks` terpisah.
- Gunakan accordion `Homepage`, direct links, utility row, dan satu CTA sesuai keputusan mobile.
- Lock scroll dengan cleanup saat unmount, trap focus selama sheet terbuka, dan kembalikan focus saat ditutup.
- Pastikan navigasi hash `/#profil` menutup sheet dan memindahkan fokus/scroll secara wajar.

### 5. Ganti styling notch dengan header responsif

**File:** `src/index.css`

- Buat header dengan max-width yang mengikuti content container, background solid yang terbaca pada light/dark, border halus, dan shadow minimal. Jangan meniru warna Velt.
- Desktop popover harus cukup lebar untuk nama/deskripsi tetapi tidak menjadi mega-menu berisi promosi.
- Pada 320-767px gunakan mobile bar dan sheet; pada 768px ke atas gunakan desktop navigation.
- Cegah horizontal overflow, jaga focus ring visible, dan matikan/transisikan gerak secara instan pada `prefers-reduced-motion`.
- Setelah pencarian repo memastikan tidak ada consumer, hapus selector `.notch-*` dan `.mobile-navigation` yang yatim.

### 6. Tambahkan copy bilingual dan sinkronkan keputusan desain

**Files:** `src/i18n.tsx`, `memory/prd.md`, `memory/Prompt md.md`

- Tambahkan label/deskripsi ID dan EN untuk grup Homepage, Home 1, dan Home 2; gunakan copy faktual dan singkat.
- Tambahkan ARIA labels untuk buka/tutup menu, buka grup, dan status halaman aktif.
- Di PRD, dokumentasikan registry publik, shared header, route yang diekspos, dan acceptance criteria desktop/mobile.
- Tandai notch navbar pada Prompt/PRD sebagai keputusan lama yang digantikan oleh Velt-inspired shared navigation. Jangan menghapus referensi historis tanpa catatan supersession.

## Scope

Termasuk: shared public navbar, registry route/menu, desktop grouped navigation, mobile sheet, current-page state, cart/language/theme/action controls, scroll behavior, dark/light, bilingual copy, dan dokumentasi desain.

Tidak termasuk: membuat isi Homepage 3/4, mengubah dashboard/admin navigation, migrasi ke React Router, redesign isi landing/products, penambahan akun buyer, atau menyalin branding/copy Velt.

## Validation

1. Jalankan `rg "notch-|mobile-navigation|PUBLIC_PAGES|public-pages" src memory` untuk memastikan registry memiliki satu owner dan CSS lama benar-benar yatim sebelum dihapus.
2. Jalankan `npm run build` dan test suite yang sudah ada.
3. Verifikasi `/`, `/home2`, dan `/products` pada lebar 320, 375, 390, 430, 768, 1024, dan 1440px; tidak boleh ada overflow, collision, atau content tertutup header.
4. Desktop: buka popover Homepage dengan pointer dan keyboard, pindah item dengan Tab, tutup dengan Escape/outside click, lalu periksa focus return dan active state.
5. Mobile: buka sheet, uji accordion, Tab/Shift+Tab, Escape, backdrop, navigasi, body scroll lock, serta focus return. Semua target interaktif minimum 44px.
6. Scroll turun/naik pada seluruh route publik. Header harus hide/show tanpa flicker dan tetap terlihat ketika menu terbuka.
7. Uji ID/EN, light/dark, cart kosong/berisi dua digit, serta `prefers-reduced-motion`; label tidak terpotong dan kontras/focus tetap jelas.
8. Tambahkan fixture sementara Homepage 3 pada registry selama test lokal untuk memastikan desktop dan mobile memperoleh item yang sama, lalu jangan commit dead route tersebut.

## Stop conditions

- Jangan membuat link Home 3/4 sebelum komponen dan route masing-masing siap.
- Hentikan perubahan jika bisnis ingin dashboard buyer masuk navbar publik; audience dan keamanan route harus diputuskan lebih dulu.
- Jangan mengejar pixel-perfect clone Velt tanpa screenshot desktop/mobile yang disetujui; plan ini mengadaptasi information architecture, bukan identitas visualnya.
- Jangan menambah library navigation baru bila kebutuhan dapat dipenuhi oleh React, CSS, Motion, dan Lucide yang sudah ada.
