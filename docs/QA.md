# Verifikasi

Diperiksa pada 24 Oktober 2026.

- `npm run build`: lulus; Astro/TypeScript 0 errors, 0 warnings, 0 hints; static output di `dist/`.
- `npm audit --audit-level=low`: 0 vulnerabilities.
- HTTP lokal port 4381: 200; judul dan isi hap.pybake terverifikasi di browser.
- Browser desktop: Lenis aktif (kelas `lenis` pada root), tidak ada horizontal overflow, tidak ada console warnings/errors.
- Anchor cerita: posisi tujuan 106px dari atas viewport, sesuai scroll padding di bawah header.
- Filter: Roti & Pastry = 2; Cake = 2; Tradisional = 1; Kuker = 1; Semua = 6. Reset filter mengembalikan semua produk.
- Emulasi lebar 390px dan 360px: tidak ada horizontal overflow; hero dan tombol terbaca.
- Navigasi ponsel: buka/tutup, Escape, fokus kembali ke tombol, tautan menutup menu.
- Semua 8 elemen gambar berhasil dimuat setelah menjelajahi halaman, termasuk gambar cerita yang lazy-loaded.
- Pemeriksaan HTML hasil build: tepat satu H1, 12 anchor mengarah ke ID yang ada, semua gambar punya atribut alt, 9 aset lokal yang direferensikan tersedia.
- Dukungan reduced motion diperiksa dari implementasi media query dan lifecycle Lenis/GSAP; pengubahan preferensi OS tidak diuji langsung.
- Touch scrolling dan feel pada ponsel fisik belum diuji.

Screenshot desktop: `docs/desktop-preview.jpg`. Semua fotografi adalah ilustrasi AI; lihat `ASSETS.md`.

## Tambahan journey tiga bab

- Build setelah perubahan: 0 errors, 0 warnings, 0 hints.
- Desktop 1512×805: mode sticky aktif; bab pertama opacity `[1,0,0]`, kedua `[0,1,0]`, ketiga `[0,0,1]` pada posisi scroll berbeda. Panggung tetap pada top 88px saat scroll, tepat di bawah header.
- Scroll balik dari bab ketiga kembali mengaktifkan bab kedua dan mengembalikan foto/teks yang sesuai.
- Penanda `aria-current="step"` berubah mengikuti bab aktif.
- Semua 3 foto journey berhasil dimuat.
- Tautan lewati journey mencapai menu pada top 106px di desktop. Filter Kuker masih menghasilkan tepat Nastar & Cookies.
- Mobile 390×844: mode sticky nonaktif, seluruh panel `position: static` dan opacity 1; tidak ada horizontal overflow. Anchor journey mencapai top 90px.
- Viewport dikembalikan ke ukuran desktop setelah pengujian.
- Pemeriksaan static build terbaru: 13 anchor valid dan 11 gambar memiliki alt; semua aset lokal tersedia.
- Screenshot: `docs/journey-desktop.jpg` dan `docs/journey-mobile.jpg`.
- Reduced motion didukung melalui fallback vertikal dan fade 150ms; perubahan preferensi OS serta ponsel fisik belum diuji langsung.

## Koreografi seluruh halaman — versi terbaru

Bagian ini menggantikan batas responsif journey pada pemeriksaan sebelumnya.

- Build final: 0 errors, 0 warnings, 0 hints.
- Preview dalam aplikasi diperiksa langsung. Pada lebar 691px, journey sticky dan katalog horizontal aktif; tidak ada overflow horizontal pada dokumen.
- Katalog pada 691px: transform rail berubah dari x=-203px ke x=-800px setelah scroll; progress berubah menjadi 0.607903, sementara panggung tetap pada top 73px (header mobile + border).
- Filter Cake saat sedang berada di tengah rail: tepat Roll Cake dan Brownies Tart muncul; rail kembali x=0, menu dipertahankan pada top 90px. Mengembalikan Semua mengaktifkan kembali perjalanan galeri.
- Tipografi: 29 kata visual dipisah; label heading tetap utuh melalui aria-label. Word reveal cerita mencapai transform identitas setelah dilalui.
- Cerita: polaroid memiliki transform rotasi/pergeseran yang berubah bersama scroll. Masking foto dan penutup memakai nilai inset konkret untuk transisi yang dapat diinterpolasi.
- Cara pesan: garis pertama terukur scaleX=0.7716 saat berada di tengah progres; teks dan simbol masuk secara terpisah.
- Mobile 390×844: tidak ada overflow horizontal; journey aktif dengan susunan vertikal dalam panggung; katalog memakai grid dengan reveal foto. Dimensi panel/copy/footer diperiksa dari DOM. Perilaku pada ponsel fisik belum diuji.
- Pada browser normal 1512px, setelah mencapai bawah halaman: progress scaleX=1 dan wordmark footer memiliki transform identitas (terbuka penuh).
- Console warnings/errors kosong, baik pada preview aplikasi maupun browser pengujian.
- Ukuran viewport pengujian dikembalikan setelah pemeriksaan.
- Pemeriksaan static output: satu H1, semua anchor valid, alt gambar dan aset lokal lengkap.
- Screenshot versi terbaru: `docs/full-motion-catalog.jpg` dan `docs/full-motion-footer.jpg`.

## Pembaruan copy dan kembali ke atas

- Judul pemesanan: `Sudah ketemu yang kamu suka`.
- Indikator bab mengambang kiri bawah beserta markup, CSS, dan updater-nya dihapus. Underline navigasi aktif tetap bekerja.
- Copyright ditetapkan ke 2025.
- Navigasi anchor memakai durasi sesuai jarak (0.9–2.8 detik) dan easing `power2.inOut`; tujuan home ditetapkan ke posisi scroll 0.
- Pengujian tombol dari footer: posisi awal 7027px, sampel setelah klik 6954 → 5553 → 1528 → 70 → 0. Teramati 19 posisi berbeda, monoton ke atas, dan berhenti di 0.
- Build: 0 errors, 0 warnings, 0 hints.

## Pemesanan WhatsApp

- Nomor tujuan semua CTA pemesanan: `6281359338291` (+62 813-5933-8291).
- Keenam foto produk dan tautan `Pesan menu ini` memiliki template sesuai nama menu. Query pesan berhasil didekode, termasuk ampersand pada Nastar & Cookies.
- Instagram dibatasi ke dua tautan profil: cerita dapur dan footer. Tidak ada foto produk yang masih mengarah ke posting Instagram.
- Header, navigasi ponsel, hero, penutup, dan kontak footer menggunakan WhatsApp. Nomor kontak ditampilkan pada footer.
- Copy cara pesan mengikuti alur pilih foto → cek pesan terisi di WhatsApp → konfirmasi bersama.
- Validasi static output: 6 pesan menu sesuai produk, semua 17 tautan WhatsApp mengarah ke nomor yang benar, 2 tautan Instagram.
- Verifikasi browser: label foto dan URL sesuai, nomor footer tampil, tidak ada overflow horizontal. Tidak ada pesan yang dikirim selama pengujian.
- Build: 0 errors, 0 warnings, 0 hints.


## Astro audit — 26 October 2026

- Replaced all 11 native image instances with Astro Image and imported local metadata; generated responsive WebP sizes during static build. Hero loads eagerly, lower sections lazily; pinned catalog preloads cards on entry.
- Moved source assets to src/assets/images; removed the obsolete hero URL preload.
- Anchor navigation focuses content wrappers with tabindex=-1, preserving keyboard focus without assigning tabindex to section/main landmarks.
- Browser toolbar reports 0 accessibility and 0 performance issues after navigation; screenshot: astro-audit-clean.png.
- npm run build: 0 errors, 0 warnings, 0 hints.
