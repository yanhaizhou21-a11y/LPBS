# Ringkas checkout tamu tanpa kehilangan data invoice

Commit yang diaudit: `fb6aebccc6996e6ba22c84af87dbe7d0918f7cb2`

## Evidence chain

- Kontrak produk di `memory/prd.md` menetapkan guest checkout yang cepat di mobile, tanpa akun buyer, dan mengukur waktu median checkout.
- `src/components/CheckoutModal.tsx` saat ini menampilkan 10 input pada Langkah 1: nama, WhatsApp, email, alamat, kota/kabupaten, kecamatan, desa/kelurahan, provinsi, kode pos, dan catatan.
- Langkah 2 pada komponen yang sama kemudian meminta buyer mencari tujuan JNE. Objek `selectedDestination` sudah berisi `village`, `district`, `regencyName`, `province`, dan `postalCode`, sehingga lima input lokasi di Langkah 1 adalah data duplikat.
- `src/hooks/useCheckout.ts` memblokir perpindahan dari Langkah 1 sampai seluruh alamat dan lima bagian lokasi diisi, lalu kembali memblokir Langkah 2 sampai tujuan JNE dipilih.
- `backend/routes/orderRoutes.js` mengulang kewajiban field lokasi manual tersebut. Invoice dan pesan WhatsApp di `CheckoutModal.tsx` dan `useCheckout.ts` masih membaca lokasi dari `buyerForm`, bukan dari tujuan JNE yang telah dipilih.
- Pengguna melaporkan buyer meninggalkan checkout karena terlalu banyak input. Bukti runtime visual otomatis tidak tersedia karena browser lokal gagal menulis kernel assets; rencana ini hanya memakai kontrak, source, dan laporan pengguna yang dapat diverifikasi.

## Design decision

Ubah checkout menjadi progressive disclosure yang mengikuti keputusan pengiriman:

1. Langkah 1, **Kontak**: hanya `Nama lengkap` dan `Nomor WhatsApp` yang wajib. Email tidak ditampilkan di jalur utama.
2. Langkah 2, **Pengiriman**:
   - Jika `JNE`, tampilkan satu input `Alamat jalan, RT/RW, dan nomor rumah`, lalu satu pencarian `Kelurahan atau kode pos`. Pemilihan hasil JNE menjadi sumber tunggal untuk kelurahan, kecamatan, kota/kabupaten, provinsi, dan kode pos.
   - Jika `Ambil di kantor`, jangan meminta alamat atau tujuan JNE.
   - `Catatan untuk pesanan` tersedia lewat kontrol teks sederhana `Tambah catatan (opsional)` dan baru membuka field ketika dipilih.
3. Pertahankan Langkah 3 pembayaran dan Langkah 4 invoice/konfirmasi WhatsApp. Jangan menambah akun, progress baru, modal baru, atau library form.
4. Hilangkan eyebrow `LANGKAH N` di isi halaman karena progress bar sudah menyatakan posisi. Heading isi cukup satu judul dan satu kalimat bantuan singkat.

Target field yang terlihat sebelum buyer memilih pengiriman turun dari 10 menjadi 2. Total field wajib untuk pickup menjadi 2; untuk JNE menjadi 4 interaksi wajib: nama, WhatsApp, alamat jalan, dan pemilihan tujuan JNE.

## Reuse

- Pertahankan `CheckoutModal`, `useCheckout`, progress bar, hasil pencarian JNE, kartu layanan, `sessionStorage`, invoice, dan tombol konfirmasi WhatsApp yang ada.
- Gunakan `selectedDestination` sebagai sumber lokasi kanonis; jangan membuat state lokasi kedua.
- Gunakan token warna, radius, focus ring, dan breakpoint di `src/index.css`.
- Gunakan elemen native `button`, `input`, dan `textarea`; tidak perlu form library atau komponen accordion baru.

## Changes

### 1. Pisahkan data kontak dari data tujuan

**File:** `src/types/index.ts`

- Pertahankan nama tipe `BuyerForm` untuk menghindari abstraksi baru, tetapi jadikan `city`, `village`, `district`, `province`, dan `postal` sebagai data hasil resolusi, bukan field yang diketik buyer.
- Bila perubahan tipe optional dibutuhkan selama perpindahan state, tetapkan string kosong sebagai fallback agar data lama di `sessionStorage` tetap dapat dibaca.
- Jangan menambah model alamat baru kecuali compiler membuktikan tipe yang ada tidak dapat mengekspresikan payload final.

### 2. Validasi berdasarkan metode pengiriman dan bentuk payload final sekali saja

**File:** `src/hooks/useCheckout.ts`

- Ubah `validateStep1()` agar hanya mewajibkan `name` dan `whatsapp`; pertahankan validasi 9–15 digit.
- Pindahkan validasi alamat jalan ke `validateStep2()` hanya ketika `shippingType === 'JNE'`.
- Untuk JNE, tetap wajibkan `selectedDestination` dan `selectedService`. Untuk pickup, lewati alamat, tujuan, dan layanan.
- Buat satu nilai turunan lokal, misalnya `resolvedBuyer`, tepat sebelum membuat invoice/pesan/payload:
  - JNE: salin `address` dari input buyer; isi `village`, `district`, `city`, `province`, `postal` dari `selectedDestination` (`regencyName` dipakai untuk `city`).
  - Pickup: isi field alamat/lokasi dengan string kosong dan tampilkan teks `Ambil di Kantor Botani Seed` pada invoice, bukan deretan tanda baca kosong.
- Hapus validasi kode pos manual di Langkah 1. Kode pos JNE berasal dari dataset tujuan yang dipilih.
- Jangan menyinkronkan hasil JNE kembali ke lima input tersembunyi. Semua konsumen harus membaca `resolvedBuyer` yang sama agar invoice, WhatsApp, dan API tidak menyimpang.
- Pertahankan pemulihan data kontak/alamat dari `sessionStorage`, tetapi abaikan field lokasi lama jika buyer memilih tujuan JNE baru.

### 3. Ringkas UI dan hirarki checkout

**File:** `src/components/CheckoutModal.tsx`

- Langkah 1:
  - Ganti judul menjadi `Kontak pemesan`.
  - Ganti bantuan menjadi `Kami memakai nomor ini untuk konfirmasi pesanan.`
  - Tampilkan hanya nama dan WhatsApp.
  - Hapus field email dari jalur checkout. Data ini tidak dipakai untuk pengiriman atau konfirmasi utama.
- Langkah 2:
  - Setelah pilihan `JNE`, tampilkan alamat jalan dan pencarian tujuan JNE dalam urutan tersebut.
  - Setelah pilihan `Ambil di kantor`, tampilkan alamat kantor dan instruksi singkat; jangan tampilkan input alamat buyer.
  - Letakkan `Tambah catatan (opsional)` setelah pilihan layanan/pickup dan buka satu input hanya saat dipilih.
- Hapus label eyebrow `LANGKAH 1` sampai `LANGKAH 4`; progress bar tetap menjadi indikator tahap.
- Ringkas label menjadi bahasa percakapan: `WhatsApp`, `Alamat jalan`, `Cari kelurahan atau kode pos`, `Catatan`.
- Pada invoice, render alamat lengkap hanya untuk JNE dari data yang sudah di-resolve. Untuk pickup, render `Ambil di Kantor Botani Seed`.
- Pastikan tombol utama selalu menjelaskan hasil berikutnya: `Pilih pengiriman`, `Pilih pembayaran`, `Lihat detail pembayaran`, `Konfirmasi via WhatsApp`.

### 4. Rapikan layout mobile tanpa merombak identitas visual

**File:** `src/index.css`

- Pertahankan modal dan token eksisting, tetapi pada `max-width: 640px`:
  - Susun progress menjadi indikator ringkas yang tidak membutuhkan horizontal scroll. Nomor aktif + teks tahap aktif cukup; tahap lain tetap memiliki nama yang dapat diakses pembaca layar.
  - Kurangi gap vertikal heading/form yang saat ini dibuat untuk desktop.
  - Jadikan navigasi bawah satu kolom: CTA utama penuh, aksi kembali berupa tombol teks/sekunder setelahnya.
  - Pastikan input dan tombol minimal 44px, modal tidak overflow pada 375/390/430px, dan focus ring tetap terlihat.
- Hapus CSS field grid yang tidak lagi terpakai setelah form hanya memiliki satu alur kolom di mobile; pertahankan dua kolom desktop hanya jika dua field kontak memang terbaca lebih baik berdampingan.

### 5. Sesuaikan kontrak server dengan keputusan pengiriman

**File:** `backend/routes/orderRoutes.js`

- Tambahkan `shippingType` eksplisit ke payload order; jangan menyimpulkan pickup hanya dari `shippingService === null` tanpa validasi.
- Wajibkan `name` dan `whatsapp` untuk semua order.
- Untuk `JNE`, wajibkan `address`, kelima field lokasi hasil resolusi, dan `shippingService`.
- Untuk `Ambil di kantor`, izinkan field alamat/lokasi kosong dan wajibkan `shippingService === null` serta ongkir nol.
- Pertahankan sanitasi `text()`, validasi WhatsApp/email, rekalkulasi harga dari katalog, dan batas ongkir.
- Jangan menerima lokasi bebas dari client sebagai bukti tarif; validasi minimum harus memastikan payload JNE konsisten dengan bentuk tujuan yang dipilih. Jika dataset server belum bisa memverifikasi destination, dokumentasikan keterbatasan itu dan jangan menambah klaim “tarif resmi” baru.

### 6. Tambah coverage untuk dua jalur checkout

**File:** `backend/auth.test.js`

- Perbarui fixture JNE agar menyertakan `shippingType: 'JNE'` dan pastikan order dengan data lokasi hasil resolusi diterima.
- Perbarui fixture pickup agar hanya memiliki nama + WhatsApp, `shippingType: 'Ambil di kantor'`, tanpa alamat/lokasi, dan tetap diterima.
- Tambahkan kasus penolakan: JNE tanpa alamat, JNE tanpa tujuan/lokasi, pickup dengan `shippingService`, dan metode pengiriman tidak dikenal.

### 7. Sinkronkan PRD

**File:** `memory/prd.md`

- Ganti daftar field buyer wajib dengan aturan kondisional di atas.
- Catat bahwa tujuan JNE adalah sumber tunggal data administratif dan email dihapus dari MVP checkout.
- Tambahkan acceptance criterion: maksimal 2 field terlihat sebelum pemilihan pengiriman; pickup dapat selesai tanpa alamat; alamat JNE di invoice dan WhatsApp sama dengan destination yang dipilih.

## Scope

Termasuk: form checkout buyer, validasi client/server, invoice, ekstraksi WhatsApp, persistence sesi, responsive modal, dan tes order.

Tidak termasuk: login buyer, address book, integrasi WhatsApp Business API, perubahan metode pembayaran, perubahan tarif JNE, redesign admin dashboard, dan analytics baru.

## Validation

1. Jalankan `npm run build`.
2. Jalankan `npm run test:auth`.
3. Pada viewport 375, 390, dan 430px, verifikasi:
   - Langkah pertama hanya menampilkan nama dan WhatsApp.
   - Tidak ada scroll horizontal; semua target sentuh minimal 44px; keyboard tidak menutupi CTA aktif.
   - Error muncul di dekat tahap terkait dan fokus dapat dipindahkan ke field pertama yang salah.
4. Jalur JNE: isi kontak, alamat jalan, pilih tujuan dan layanan, pilih pembayaran, lalu konfirmasi. Cocokkan lokasi pada pilihan JNE, invoice, payload `/api/orders`, dan teks WhatsApp.
5. Jalur pickup: isi nama + WhatsApp, pilih pickup, lanjut sampai WhatsApp tanpa mengisi alamat. Pastikan invoice tidak menampilkan koma/field kosong dan ongkir nol.
6. Tutup/buka modal dan refresh sebelum submit untuk memastikan `sessionStorage` memulihkan data yang masih relevan.
7. Uji keyboard-only pada 375px dan `prefers-reduced-motion`.

## Stop conditions

- Hentikan jika `selectedDestination` tidak menyediakan mapping stabil untuk kota/kabupaten atau kode pos; sepakati mapping dataset sebelum menghapus input manual.
- Hentikan jika operasional Botani Seed mewajibkan alamat buyer untuk pickup karena alasan legal/faktur; dalam kondisi itu, tampilkan satu alamat opsional/bersyarat, bukan lima field wilayah.
- Hentikan jika backend harus memverifikasi tarif terhadap dataset server tetapi dataset hanya tersedia di client; selesaikan batas kepercayaan tersebut sebelum mengklaim validasi tarif resmi.

## Design documentation

Perbarui `memory/prd.md` dalam perubahan yang sama. Tidak perlu dokumen desain baru: keputusan ini memperjelas kontrak checkout tamu yang sudah ada.
