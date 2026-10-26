export const instagram = 'https://www.instagram.com/hap.pybake/';
export const whatsappNumber = '+62 813-5933-8291';
const whatsappRecipient = '6281359338291';

export function whatsappLink(productName?: string) {
  const message = productName
    ? `Halo hap.pybake! Saya tertarik memesan ${productName}. Apakah tersedia? Boleh info harga dan jadwal pemesanannya? Terima kasih.`
    : 'Halo hap.pybake! Saya ingin tanya menu dan jadwal pemesanan. Boleh dibantu info menu yang tersedia? Terima kasih.';
  return `https://wa.me/${whatsappRecipient}?text=${encodeURIComponent(message)}`;
}

export const whatsapp = whatsappLink();

export const categories = ['Semua', 'Roti & Pastry', 'Cake', 'Tradisional', 'Kuker'] as const;

export const products = [
  { name: 'Roti Abon', category: 'Roti & Pastry', image: 'roti-abon', note: 'Si gurih yang bikin nagih', description: 'Roti lembut dengan taburan abon. Teman santai untuk yang suka gurih.', post: 'DXT9UpBEzxl' },
  { name: 'Bolen', category: 'Roti & Pastry', image: 'bolen', note: 'Teman secangkir teh', description: 'Pastry keemasan untuk jeda kecil yang terasa lebih istimewa.', post: 'DSKGRDekwX8' },
  { name: 'Roll Cake', category: 'Cake', image: 'roll-cake', note: 'Manisnya buat dibagi', description: 'Sepotong kue gulung untuk menemani obrolan dan waktu bersama.', post: 'DTSO1j9k8zF' },
  { name: 'Brownies Tart', category: 'Cake', image: 'brownies', note: 'Untuk momen kecilmu', description: 'Brownies cokelat dalam bentuk tart, buat merayakan yang tersayang.', post: 'DTkJ8G2kxjL' },
  { name: 'Klepon', category: 'Tradisional', image: 'klepon', note: 'Rasa yang selalu dirindukan', description: 'Jajanan tradisional dengan balutan kelapa. Sederhana, tapi ngangenin.', post: 'DVm-0kAk9sG' },
  { name: 'Nastar & Cookies', category: 'Kuker', image: 'cookies', note: 'Pengisi toples bahagia', description: 'Nastar dan chocochips cookies untuk suguhan dan momen berbagi.', post: 'DVnBBytk6Yt' },
];
