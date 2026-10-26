# hap.pybake

Landing page bisnis bakery rumahan hap.pybake, dengan arah visual **Hangat & Homemade**: cream, chocolate, terracotta, serif, dan fotografi produk yang hangat.

## Menjalankan project

Gunakan Node.js >=22.23.4 dan npm >=9.6.5.

```sh
npm install
npm run dev
```

Alamat lokal project ini: http://localhost:4381. Port 4381 dipilih agar tidak bentrok dengan project lokal lain.

```sh
npm run check   # Diagnostik Astro dan TypeScript
npm run build   # Diagnostik dan static production build ke dist/
npm run preview # Preview production build
```

## Stack dan struktur

- Astro dengan static output; tanpa runtime React.
- Tailwind CSS 4 via Vite plugin, dengan token dan gaya khusus di `src/styles/global.css`.
- Lenis sebagai pengendali smooth wheel scroll dan navigasi anchor, disinkronkan dengan ticker GSAP.
- GSAP + ScrollTrigger untuk entrance, parallax hero, reveal sekali per bagian, dan filter katalog.
- Journey tiga adegan setelah hero: dapur → dibuat → dinikmati. CSS sticky dan timeline GSAP aktif mulai lebar 600px/tinggi 620px, atau lebar 360px/tinggi 740px. Panel preview aplikasi dan ponsel tinggi mendapat koreografi yang sama dengan komposisi responsif. Penanda bab dan progress mengikuti scroll, termasuk saat scroll dibalik.
- Pada layar pendek dan tanpa JavaScript, semua adegan tetap terbaca vertikal. Reduced motion memakai fade singkat tanpa sticky/zoom. Tautan langsung ke menu tersedia.
- Font Cormorant Garamond dan DM Sans disimpan lokal melalui Fontsource, tanpa request ke Google Fonts.
- `src/pages/index.astro`: halaman dan konten.
- `src/data/products.ts`: kategori, produk, nomor WhatsApp, template pesan per menu, serta tautan profil Instagram.
- `src/scripts/main.ts`: scroll, animasi, filter, dan navigasi ponsel.
- `src/assets/images/`: foto konsep dalam format WebP.

## Konten bisnis

Sumber referensi: https://www.instagram.com/hap.pybake/ dan posting produk yang ID-nya dicatat pada data katalog. Nama produk, lokasi Malang, dan kutipan bio mengikuti profil yang dibaca saat pengerjaan. Copy lain merupakan usulan editorial.

Harga, stok, lead time, pembayaran, dan pengiriman tidak diasumsikan. CTA pemesanan membuka WhatsApp di nomor **+62 813-5933-8291**. Foto dan tautan pemesanan setiap menu mengisi pesan awal sesuai nama produk; pengunjung tetap memeriksa dan mengirim pesannya sendiri. Instagram hanya digunakan untuk cerita dapur dan tautan profil di footer.

Semua gambar produk saat ini **ilustrasi AI**, bukan dokumentasi produk asli. Informasi ini juga ditampilkan dekat katalog. Ganti sebelum peluncuran bisnis apabila sudah ada foto produk resmi. Detail prompt dan asal aset tersedia di `ASSETS.md`.

## Interaksi dan aksesibilitas

- Filter kategori memakai tombol dengan `aria-pressed` dan jumlah hasil live.
- Navigasi ponsel mendukung Escape dan mengembalikan fokus ke tombol.
- Semua konten tersedia di HTML; katalog dan tautan tetap dapat dipakai tanpa JavaScript.
- Preferensi `prefers-reduced-motion` mematikan smooth scrolling, parallax, dan pergeseran elemen; konten tetap terlihat.
- Touch scrolling memakai perilaku sentuh native, sementara wheel dan anchor memakai Lenis pada mode animasi normal.
- Hover dibatasi ke pointer yang mendukung hover, font lokal, gambar lazy-loaded selain hero.

## Sebelum publikasi

Pastikan copy usaha, foto asli, varian, harga, dan alur pesanan bersama pemilik. Tambahkan domain/canonical URL dan URL gambar Open Graph absolut setelah domain tersedia. Uji rasa scrolling pada ponsel sungguhan; emulasi desktop hanya memverifikasi layout responsif.

Project disiapkan untuk pengembangan lokal. Tidak ada deployment atau akun layanan eksternal yang dibuat.

## Koreografi seluruh halaman

- Hero: entrance judul per kata, entrance navigasi dan CTA, zoom foto + pergeseran teks saat scroll, detail panah bergerak lembut.
- Seluruh halaman: progress scroll di atas dan underline navigasi aktif.
- Journey: pergantian foto dan teks, zoom detail, pergeseran adegan, indikator tiga bab.
- Katalog: pada layar >=600px dan tinggi >=760px, scroll vertikal menggerakkan enam produk secara horizontal di satu panggung. Filter membangun ulang jarak scroll dan mempertahankan pengunjung di menu. Pada layout biasa, foto memakai reveal masking dan caption menyusul.
- Cerita: polaroid bergerak dan berotasi mengikuti scroll, foto terbuka lewat masking, judul per kata, teks berurutan, stempel ikut berputar.
- Cara pesan: garis tumbuh mengikuti scroll, angka/judul/deskripsi masuk berurutan, ikon berputar saat masuk.
- Penutup: bidang terracotta mengembang dari bentuk bulat, judul terbuka per kata, CTA masuk, ornamen berputar.
- Footer: kontak masuk berurutan dan wordmark besar muncul mengikuti scroll.
- Pointer presisi: label tombol magnetik. Efek ini tidak mengambil alih target klik atau navigasi keyboard.
- Mode reduced motion menonaktifkan pin, zoom, pergeseran, dan loop dekoratif. Heading tetap memiliki nama aksesibel yang utuh meski kata visualnya dipisah.
