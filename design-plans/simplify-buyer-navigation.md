# Kembalikan navbar buyer ke hirarki tugas yang ringkas

Commit yang diaudit: `fb6aebccc6996e6ba22c84af87dbe7d0918f7cb2`

## Evidence chain

- `memory/Prompt md.md` dan `memory/prd.md` menetapkan notch navbar sebagai identitas komponen, Motion untuk transisi, Lucide untuk ikon, serta pembelian mobile yang cepat sebagai tujuan utama.
- `src/components/Navbar.tsx` kini hanya membungkus `MegaMenuNavbar`.
- `src/components/ui/mega-menu-navbar.tsx` adalah implementasi generik sepanjang lebih dari 850 baris. Drawer mobile menampilkan empat halaman, lima akses cepat, dua CTA, kontrol bahasa/tema, dan brand header; prioritas pembelian tenggelam di bawah daftar tersebut.
- Menu memuat copy `COD / Bebas Ongkir`, `Jaminan Mutu & Sertifikasi`, `benih bersertifikasi resmi IPB University`, `omzet puluhan juta`, dan `bebas pestisida`. Opsi checkout aktual hanya QRIS/transfer bank dan JNE/pickup. PRD melarang klaim yang belum dibuktikan.
- Riwayat repo (`1e55bf5:src/components/Navbar.tsx`) sudah memiliki notch navbar ringkas, perilaku hide-on-scroll-down/show-on-scroll-up, reduced-motion, empat link, bahasa, tema, dan CTA. CSS notch dan mobile nav-nya masih tersedia di `src/index.css`, sehingga koreksi dapat memakai implementasi yang pernah menjadi sumber desain, bukan membuat sistem ketiga.
- Pengguna secara khusus menilai navbar mobile, tipografi, dan pemilihan komponennya terasa generik seperti AI slop.

## Design decision

Hapus mega menu generik dan pulihkan satu navbar buyer yang mengikuti tiga tugas utama:

- Berpindah ke `Beranda`, `Produk`, atau `Tentang kami`.
- Melihat keranjang.
- Melanjutkan pesanan.

Desktop tetap memakai siluet notch. Mobile memakai satu panel kecil dengan tiga link, bahasa, tema, dan satu CTA; keranjang tetap dapat dijangkau langsung dari header sehingga tidak diduplikasi di menu. Navbar menghilang saat scroll turun dan muncul saat scroll naik, tetap terlihat ketika menu terbuka, dan menghormati reduced motion.

## Reuse

- Pulihkan struktur notch yang sudah terbukti di histori `1e55bf5:src/components/Navbar.tsx`; adaptasikan, jangan salin contoh Next.js mentah dari prompt.
- Gunakan `LanguageToggle`, `ThemeToggleButton`, logo `ASSETS.logo`, Motion, dan ikon Lucide yang sudah terpasang.
- Gunakan kelas `.notch-*` dan `.mobile-navigation` yang sudah ada di `src/index.css`, lalu hapus aturan yang benar-benar yatim setelah verifikasi.
- Gunakan terjemahan `nav.home`, `nav.products`, `nav.about`, `nav.cart`, dan `nav.orderNow` dari `src/i18n.tsx`.

## Changes

### 1. Jadikan `Navbar` satu-satunya owner UI navigasi buyer

**File:** `src/components/Navbar.tsx`

- Ganti wrapper `MegaMenuNavbar` dengan markup notch yang pernah dipakai repo.
- Link primer hanya:
  - `Beranda` → `/`
  - `Produk` → `/products`
  - `Tentang kami` → `/#profil`
- Jangan tampilkan `/dashboard`, `/admin/dashboard`, atau secret login pada navigasi buyer. `/dashboard` adalah surface berbeda dan bukan tugas pembelian utama.
- Di header desktop, tampilkan logo, tiga link, language toggle, theme toggle, tombol keranjang dengan jumlah item, dan satu CTA `Pesan sekarang`.
- Di mobile header, tampilkan tombol menu, logo, dan tombol keranjang. Drawer/panel berisi tiga link, language toggle, theme toggle, dan satu CTA `Pesan sekarang`.
- Pertahankan algoritme scroll: tampil saat dekat top, saat scroll naik, atau saat menu terbuka; sembunyi saat scroll turun melewati threshold. Gunakan `useReducedMotion` untuk transisi nol durasi.
- Tutup menu setelah navigasi, Escape, dan klik CTA. Kembalikan fokus ke tombol menu setelah panel ditutup.
- Gunakan label ARIA dari i18n; jangan hardcode `Main navigation` atau copy Indonesia di mode English.

### 2. Hapus implementasi mega menu yang tidak lagi punya konsumen

**File:** `src/components/ui/mega-menu-navbar.tsx`

- Hapus file setelah `rg "MegaMenuNavbar|mega-menu-navbar" src` membuktikan hanya `Navbar.tsx` yang mengimpornya.
- Dengan penghapusan ini ikut hilang data generik pages/features/use cases/resources, dua CTA WhatsApp/order, subtitle `IPB University`, dan klaim promosi yang tidak terverifikasi.
- Jangan menggantinya dengan config/abstraction navbar baru. Tiga link lokal di `Navbar.tsx` lebih jelas dan murah dirawat.

### 3. Rapikan CSS notch dan perilaku mobile

**File:** `src/index.css`

- Audit blok `.notch-*`, `.mobile-navigation`, dan breakpoint terkait yang masih tersisa dari implementasi lama.
- Pada 375–430px:
  - Logo dan ikon tidak saling bertabrakan.
  - Tombol menu dan keranjang minimal 44px.
  - Panel berada di bawah notch, lebar mengikuti viewport dengan margin 16px, tinggi berdasarkan konten—bukan drawer 88vw penuh.
  - Tiga link memiliki satu baris label, spacing konsisten, dan CTA utama tidak terduplikasi.
- Pertahankan kontras light/dark dari token global. Jangan menambah gradient, glass card, badge, atau shadow dekoratif baru.
- Hapus selector mega-menu/Tailwind helper yang menjadi yatim hanya jika pencarian repo membuktikan tidak dipakai komponen lain.

### 4. Lengkapi copy bilingual yang ringkas dan benar

**File:** `src/i18n.tsx`

- Pastikan semua label navbar, ARIA, dan CTA panel memiliki pasangan ID/EN.
- Gunakan sentence case: `Cerita petani`, bukan deretan Title Case; `Pesan sekarang`, bukan label dengan klaim dalam tanda kurung.
- Hapus semua referensi `COD`, `Bebas Ongkir`, sertifikasi, hasil kecambah, omzet, dan bebas pestisida dari navbar. Klaim hanya boleh kembali jika ada sumber produk yang disetujui dan tempat yang tepat untuk menjelaskannya.

### 5. Sinkronkan kontrak navigasi

**File:** `memory/prd.md`

- Perbarui route/navigation table agar membedakan route publik buyer (`/`, `/products`, `/home2`, kebijakan privasi) dari route internal.
- Catat bahwa navbar utama hanya mengekspos tiga tujuan buyer, keranjang, bahasa, tema, dan CTA order; route internal tidak masuk navigasi publik.
- Tambahkan acceptance criterion mobile: maksimal tiga link dalam menu, satu CTA order, tidak ada klaim pengiriman/pembayaran yang tidak tersedia, serta show-on-scroll-up/hide-on-scroll-down.

## Scope

Termasuk: navbar landing/product, menu mobile, scroll behavior, cart count, language/theme controls, i18n copy, dark/light states, dan pembersihan komponen navbar yatim.

Tidak termasuk: redesign isi landing page, dashboard/admin navigation, perubahan route router, perubahan isi produk, dan penambahan klaim marketing baru.

## Validation

1. Jalankan `rg "MegaMenuNavbar|mega-menu-navbar|COD / Bebas Ongkir|bersertifikasi resmi|omzet puluhan juta|bebas pestisida" src` dan pastikan tidak ada referensi navbar lama/klaim terlarang.
2. Jalankan `npm run build`.
3. Pada `/`, `/home2`, dan `/products` di 375, 390, 430, 768, 1024, dan 1440px, verifikasi logo, link, cart count, dan CTA tidak overflow.
4. Mobile: buka/tutup menu dengan pointer, Escape, Tab/Shift+Tab; pastikan fokus terlihat, panel menutup setelah link/CTA, dan scroll body tetap masuk akal.
5. Scroll turun lalu naik pada halaman panjang; navbar harus hilang/muncul tanpa flicker. Saat menu terbuka navbar tidak boleh menghilang.
6. Ganti ID/EN serta light/dark di setiap route publik; semua label berubah, warna memenuhi kontras, dan tidak ada flash copy bahasa lain.
7. Aktifkan `prefers-reduced-motion`; perubahan posisi navbar/menu harus instan atau minimal tanpa spring.

## Stop conditions

- Hentikan penghapusan `mega-menu-navbar.tsx` jika ditemukan import kedua di luar `Navbar.tsx`; migrasikan konsumen itu secara eksplisit terlebih dahulu.
- Hentikan bila bisnis memang menginginkan `/dashboard` publik untuk buyer; tentukan nama/audience route tersebut sebelum memasukkannya ke hirarki buyer.
- Jangan mengembalikan klaim COD, gratis ongkir, sertifikasi, hasil, atau omzet tanpa bukti tertulis dan aturan kapan klaim itu benar.

## Design documentation

Perbarui `memory/prd.md` dalam perubahan yang sama. `memory/Prompt md.md` tetap menjadi referensi visual notch; jangan mengubah prompt referensi untuk menyesuaikan implementasi.
