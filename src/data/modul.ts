export type ModulId = 'potensi-dasar' | 'kebanksentralan' | 'english';
export type ModulPercobaan = ModulId | 'campuran';
export type Fase = 'diagnosis' | 'dasar' | 'pendalaman' | 'simulasi';

export interface ModulDef {
  id: ModulId;
  nama: string;
  singkat: string;
  deskripsi: string;
  /** Menit per soal saat simulasi. */
  menitPerSoal: number;
}

export const MODUL: ModulDef[] = [
  {
    id: 'potensi-dasar',
    nama: 'Potensi Dasar',
    singkat: 'TPD',
    deskripsi: 'Verbal, numerik, dan penalaran logis.',
    menitPerSoal: 1,
  },
  {
    id: 'kebanksentralan',
    nama: 'Pengetahuan & BI',
    singkat: 'TPU/TPK',
    deskripsi: 'Ekonomi makro, fiskal, syariah, UMKM, dan kebanksentralan.',
    menitPerSoal: 0.75,
  },
  {
    id: 'english',
    nama: 'English',
    singkat: 'EN',
    deskripsi: 'Grammar, vocabulary, and reading comprehension.',
    menitPerSoal: 1,
  },
];

export const modulById = (id: string | null | undefined) => MODUL.find((m) => m.id === id);

export const namaModul = (id: string | null | undefined) =>
  id === 'campuran' ? 'Campuran' : (modulById(id)?.nama ?? 'Umum');

export const FASE: { id: Fase; nama: string; keterangan: string }[] = [
  { id: 'diagnosis', nama: 'Diagnosis', keterangan: 'Kenali titik lemah lewat latihan campuran.' },
  { id: 'dasar', nama: 'Dasar', keterangan: 'Bangun konsep tiap modul dan hafalkan istilah.' },
  { id: 'pendalaman', nama: 'Pendalaman', keterangan: 'Fokus ke topik yang skornya masih rendah.' },
  { id: 'simulasi', nama: 'Simulasi', keterangan: 'Latihan dengan waktu seperti tes sesungguhnya.' },
];
