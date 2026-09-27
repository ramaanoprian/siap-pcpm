import type { ModulId } from './modul';

export interface Sumber {
  nama: string;
  url: string;
}

export interface Bagian {
  judul: string;
  isi?: string[];
  poin?: string[];
}

export interface Video {
  judul: string;
  url: string;
  /** Kanal atau situs pemilik video; "Pencarian YouTube" untuk tautan pencarian. */
  kanal: string;
}

export type KelompokId = 'seleksi' | 'tpd' | 'pengetahuan' | 'kebanksentralan' | 'english' | 'psikologi';

export const KELOMPOK: { id: KelompokId; nama: string; singkat: string; warna: string; emoji: string }[] = [
  { id: 'seleksi', nama: 'Tahapan Seleksi', singkat: 'Kenali alur tes PCPM dari awal sampai akhir.', warna: 'c-teal', emoji: '🗺️' },
  { id: 'tpd', nama: 'Tes Potensi Dasar', singkat: 'Verbal, numerik, logika, dan Person-Organization Fit.', warna: 'c-blue', emoji: '🧠' },
  { id: 'pengetahuan', nama: 'Pengetahuan Umum', singkat: 'Ekonomi makro, fiskal, syariah, dan UMKM.', warna: 'c-orange', emoji: '🌏' },
  { id: 'kebanksentralan', nama: 'Kebanksentralan', singkat: 'Kelembagaan BI, moneter, SSK, sistem pembayaran, Rupiah.', warna: 'c-green', emoji: '🏦' },
  { id: 'english', nama: 'Bahasa Inggris', singkat: 'Grammar, vocabulary, and reading.', warna: 'c-purple', emoji: '🔤' },
  { id: 'psikologi', nama: 'Psikologi, LGD & Wawancara', singkat: 'Psikotes, diskusi kelompok, wawancara, dan kesehatan.', warna: 'c-pink', emoji: '🤝' },
];

export interface Bab {
  id: string;
  kelompok: KelompokId;
  /** Modul soal untuk tombol latihan; kosong bila bab ini tidak punya latihan soal. */
  modul?: ModulId;
  /** Topik soal yang dilatih setelah membaca bab ini (sama dengan `Soal.topik`). */
  topik?: string;
  judul: string;
  ringkas: string;
  menit: number;
  bagian: Bagian[];
  /** Hal yang paling sering ditanyakan, untuk dibaca ulang sebelum latihan. */
  ingat: string[];
  sumber: Sumber[];
  video?: Video[];
}

/** Video YouTube tertentu. */
export const yt = (judul: string, id: string, kanal: string): Video => ({ judul, url: `https://www.youtube.com/watch?v=${id}`, kanal });
/** Tautan pencarian YouTube, untuk topik yang videonya banyak dan terus bertambah. */
export const cariYt = (kata: string): Video => ({
  judul: `Cari video: ${kata}`,
  url: `https://www.youtube.com/results?search_query=${encodeURIComponent(kata)}`,
  kanal: 'Pencarian YouTube',
});
