export interface Pertanyaan {
  /** Kunci wawancara_jawaban.pertanyaan_id. Jangan diganti setelah dipakai. */
  id: string;
  kategori: 'Diri' | 'Motivasi' | 'Kebanksentralan' | 'Situasional';
  teks: string;
  petunjuk: string;
  /** Pertanyaan perilaku yang sebaiknya dijawab dengan pola STAR. */
  star?: boolean;
}

export const PERTANYAAN: Pertanyaan[] = [
  { id: 'diri-1', kategori: 'Diri', teks: 'Ceritakan tentang diri Anda.', petunjuk: 'Satu sampai dua menit: latar pendidikan dan pengalaman, dua kekuatan yang relevan, lalu kaitkan dengan alasan melamar ke BI.' },
  { id: 'diri-2', kategori: 'Diri', teks: 'Apa kekuatan dan kelemahan terbesar Anda?', petunjuk: 'Pilih kelemahan yang nyata tapi tidak fatal, lalu tunjukkan langkah konkret yang sudah Anda ambil untuk memperbaikinya.' },
  { id: 'diri-3', kategori: 'Diri', teks: 'Bagaimana rekan kerja atau teman menggambarkan diri Anda?', petunjuk: 'Sebutkan tiga sifat, masing-masing dengan satu contoh singkat.' },
  { id: 'mot-1', kategori: 'Motivasi', teks: 'Mengapa Anda ingin bergabung dengan Bank Indonesia?', petunjuk: 'Kaitkan dengan mandat BI (stabilitas nilai Rupiah, sistem pembayaran, dan sistem keuangan) dan nilai pribadi Anda. Hindari jawaban yang hanya soal gaji atau fasilitas.' },
  { id: 'mot-2', kategori: 'Motivasi', teks: 'Di mana Anda melihat diri Anda lima tahun lagi?', petunjuk: 'Tunjukkan rencana belajar dan kontribusi di BI, serta kesediaan ditempatkan di mana saja.' },
  { id: 'mot-3', kategori: 'Motivasi', teks: 'Bersediakah Anda ditempatkan di seluruh wilayah Indonesia, termasuk kantor perwakilan di daerah terpencil?', petunjuk: 'Jawab tegas, lalu beri alasan: misalnya ingin memahami ekonomi daerah secara langsung.' },
  { id: 'bi-1', kategori: 'Kebanksentralan', teks: 'Menurut Anda, apa tantangan terbesar Bank Indonesia saat ini?', petunjuk: 'Pilih satu atau dua isu (misalnya ketidakpastian global, digitalisasi pembayaran, atau inflasi pangan), jelaskan dampaknya, lalu sebutkan respons kebijakan BI.' },
  { id: 'bi-2', kategori: 'Kebanksentralan', teks: 'Jelaskan dengan bahasa sederhana mengapa inflasi perlu dijaga rendah dan stabil.', petunjuk: 'Bayangkan menjelaskan ke keluarga: daya beli, kepastian usaha, dan dampaknya pada masyarakat berpenghasilan rendah.' },
  { id: 'bi-3', kategori: 'Kebanksentralan', teks: 'Apa manfaat QRIS dan BI-FAST bagi masyarakat dan UMKM?', petunjuk: 'Sebutkan manfaat seperti efisiensi, biaya rendah, inklusi keuangan, dan data transaksi untuk akses pembiayaan.' },
  { id: 'sit-1', kategori: 'Situasional', star: true, teks: 'Ceritakan saat Anda bekerja di bawah tekanan tenggat waktu yang ketat.', petunjuk: 'Pakai pola STAR. Tunjukkan cara Anda menyusun prioritas dan hasil yang terukur.' },
  { id: 'sit-2', kategori: 'Situasional', star: true, teks: 'Ceritakan pengalaman Anda menghadapi konflik dalam tim.', petunjuk: 'Pakai pola STAR. Fokus pada cara Anda mendengar, mencari titik temu, dan menjaga hubungan.' },
  { id: 'sit-3', kategori: 'Situasional', star: true, teks: 'Ceritakan saat Anda memimpin atau mengambil inisiatif tanpa diminta.', petunjuk: 'Pakai pola STAR. Jelaskan alasan Anda bertindak dan dampaknya bagi orang lain.' },
  { id: 'sit-4', kategori: 'Situasional', star: true, teks: 'Ceritakan saat Anda gagal dan apa yang Anda pelajari.', petunjuk: 'Pakai pola STAR. Akui kegagalan dengan jujur, lalu tekankan pembelajaran dan perubahan yang Anda lakukan setelahnya.' },
  { id: 'sit-5', kategori: 'Situasional', star: true, teks: 'Apa yang Anda lakukan jika atasan meminta Anda melakukan sesuatu yang bertentangan dengan aturan?', petunjuk: 'Tunjukkan integritas: menolak dengan sopan, menjelaskan aturannya, menawarkan alternatif yang sesuai, dan melapor lewat jalur yang benar bila perlu.' },
  { id: 'sit-6', kategori: 'Situasional', star: true, teks: 'Ceritakan saat Anda harus mempelajari hal baru dengan cepat.', petunjuk: 'Pakai pola STAR. Jelaskan strategi belajar Anda dan hasilnya.' },
];

export const STAR_BAGIAN: { key: 's' | 't' | 'a' | 'r'; nama: string; petunjuk: string }[] = [
  { key: 's', nama: 'Situation', petunjuk: 'Konteksnya: kapan, di mana, dan apa masalahnya.' },
  { key: 't', nama: 'Task', petunjuk: 'Tanggung jawab atau target Anda.' },
  { key: 'a', nama: 'Action', petunjuk: 'Langkah yang Anda ambil sendiri. Pakai kata "saya".' },
  { key: 'r', nama: 'Result', petunjuk: 'Hasilnya, sebaiknya terukur, dan pelajaran yang Anda dapat.' },
];
