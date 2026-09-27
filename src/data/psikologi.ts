export type Dimensi = 'integritas' | 'ketelitian' | 'kerjasama' | 'ketahanan' | 'inisiatif';

export const DIMENSI: { id: Dimensi; nama: string; keterangan: string }[] = [
  { id: 'integritas', nama: 'Integritas', keterangan: 'Jujur, taat aturan, dan bisa dipercaya.' },
  { id: 'ketelitian', nama: 'Ketelitian', keterangan: 'Cermat, rapi, dan memeriksa ulang pekerjaan.' },
  { id: 'kerjasama', nama: 'Kerja sama', keterangan: 'Mau mendengar, berbagi peran, dan mendukung tim.' },
  { id: 'ketahanan', nama: 'Ketahanan', keterangan: 'Tetap tenang dan efektif di bawah tekanan.' },
  { id: 'inisiatif', nama: 'Inisiatif', keterangan: 'Proaktif, mau belajar, dan cepat beradaptasi.' },
];

export interface Butir {
  id: string;
  dimensi: Dimensi;
  teks: string;
  /** true bila setuju berarti skor dimensi rendah. */
  terbalik?: boolean;
  /** Butir kembaran yang maknanya sama atau berlawanan; dipakai menghitung konsistensi. */
  pasangan?: string;
}

/*
 * Latihan refleksi diri, BUKAN alat tes psikologi resmi. Tujuannya membiasakan menjawab
 * jujur dan konsisten: setiap dimensi punya pasangan butir berlawanan, dan jawaban yang
 * saling bertentangan menurunkan skor konsistensi.
 */
export const BUTIR: Butir[] = [
  { id: 'int1', dimensi: 'integritas', teks: 'Saya melaporkan kesalahan saya sendiri walaupun tidak ada yang mengetahuinya.', pasangan: 'int2' },
  { id: 'int2', dimensi: 'integritas', teks: 'Saya kadang menutupi kesalahan kecil agar tidak repot.', terbalik: true, pasangan: 'int1' },
  { id: 'int3', dimensi: 'integritas', teks: 'Saya menolak memakai fasilitas kantor untuk urusan pribadi.' },
  { id: 'int4', dimensi: 'integritas', teks: 'Aturan boleh dilanggar sedikit bila hasilnya baik untuk tim.', terbalik: true },
  { id: 'tel1', dimensi: 'ketelitian', teks: 'Saya memeriksa ulang angka dan data sebelum menyerahkan pekerjaan.', pasangan: 'tel2' },
  { id: 'tel2', dimensi: 'ketelitian', teks: 'Saya lebih suka cepat selesai walaupun ada detail yang terlewat.', terbalik: true, pasangan: 'tel1' },
  { id: 'tel3', dimensi: 'ketelitian', teks: 'Saya menyusun daftar tugas dan tenggatnya secara teratur.' },
  { id: 'tel4', dimensi: 'ketelitian', teks: 'Dokumen dan berkas kerja saya sering berantakan.', terbalik: true },
  { id: 'ker1', dimensi: 'kerjasama', teks: 'Saya mendengarkan pendapat rekan sampai selesai sebelum menanggapi.', pasangan: 'ker2' },
  { id: 'ker2', dimensi: 'kerjasama', teks: 'Saya lebih suka mengerjakan semuanya sendiri daripada membagi tugas.', terbalik: true, pasangan: 'ker1' },
  { id: 'ker3', dimensi: 'kerjasama', teks: 'Saya menawarkan bantuan saat rekan tim kewalahan.' },
  { id: 'ker4', dimensi: 'kerjasama', teks: 'Saya sulit menerima keputusan tim yang berbeda dengan pendapat saya.', terbalik: true },
  { id: 'tah1', dimensi: 'ketahanan', teks: 'Saya tetap bisa berpikir jernih saat tenggat waktu sangat mepet.', pasangan: 'tah2' },
  { id: 'tah2', dimensi: 'ketahanan', teks: 'Kritik tajam membuat saya kehilangan semangat berhari-hari.', terbalik: true, pasangan: 'tah1' },
  { id: 'tah3', dimensi: 'ketahanan', teks: 'Setelah gagal, saya cepat mencari pelajaran lalu mencoba lagi.' },
  { id: 'tah4', dimensi: 'ketahanan', teks: 'Saya mudah panik ketika rencana berubah mendadak.', terbalik: true },
  { id: 'ini1', dimensi: 'inisiatif', teks: 'Saya mengusulkan perbaikan cara kerja tanpa menunggu diminta.', pasangan: 'ini2' },
  { id: 'ini2', dimensi: 'inisiatif', teks: 'Saya menunggu instruksi rinci sebelum mulai bekerja.', terbalik: true, pasangan: 'ini1' },
  { id: 'ini3', dimensi: 'inisiatif', teks: 'Saya meluangkan waktu mempelajari hal baru di luar tugas utama.' },
  { id: 'ini4', dimensi: 'inisiatif', teks: 'Saya merasa tidak nyaman memakai aplikasi atau cara kerja baru.', terbalik: true },
];

export const SKALA = ['Sangat tidak setuju', 'Tidak setuju', 'Netral', 'Setuju', 'Sangat setuju'];

/** Hitung profil (0–100 per dimensi) dan skor konsistensi (0–100) dari jawaban 1–5. */
export function nilaiPsikologi(jawaban: Record<string, number>) {
  const profil: Record<string, number> = {};
  for (const d of DIMENSI) {
    const items = BUTIR.filter((b) => b.dimensi === d.id && jawaban[b.id]);
    const avg = items.reduce((s, b) => s + (b.terbalik ? 6 - jawaban[b.id] : jawaban[b.id]), 0) / (items.length || 1);
    profil[d.id] = Math.round(((avg - 1) / 4) * 100);
  }
  // Pasangan butir berlawanan: jawaban konsisten bila (a) ≈ (6 − b).
  const pasangan = BUTIR.filter((b) => b.pasangan && !b.terbalik);
  const selisih = pasangan.map((b) => Math.abs(jawaban[b.id] - (6 - jawaban[b.pasangan!])) / 4);
  const konsistensi = Math.round((1 - selisih.reduce((s, x) => s + x, 0) / (selisih.length || 1)) * 100);
  return { profil, konsistensi };
}
