import { soalById, type Soal } from './soal';

// Soal Potensi Dasar yang dibuat dari pola dengan angka atau kata acak, supaya tidak bisa dihafal.
// Id-nya berbentuk `gen-<pola>-<seed>`, dan soal yang sama selalu bisa dibuat ulang dari id itu
// (dipakai Riwayat untuk menampilkan pembahasan). Soal ini tidak masuk tabel status_soal.

type Rng = () => number;

function mulberry32(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const int = (r: Rng, min: number, max: number) => min + Math.floor(r() * (max - min + 1));
const pick = <T,>(r: Rng, arr: readonly T[]) => arr[Math.floor(r() * arr.length)];
const rp = (n: number) => `Rp${n.toLocaleString('id-ID')}`;
const angka = (n: number) => n.toLocaleString('id-ID', { maximumFractionDigits: 2 });

/** Lima opsi unik: jawaban benar + pengecoh, diacak dengan rng yang sama agar bisa dibuat ulang. */
function opsiDari(r: Rng, benar: number, pengecoh: number[], fmt: (n: number) => string = angka) {
  const set = new Set<number>([benar]);
  for (const p of pengecoh) if (set.size < 5 && Number.isFinite(p) && p > 0) set.add(p);
  let step = 1;
  while (set.size < 5) {
    set.add(benar + step * (r() < 0.5 ? -1 : 1) * Math.max(1, Math.round(Math.abs(benar) * 0.1)));
    step++;
  }
  const nilai = [...set].filter((n) => n > 0 || n === benar).slice(0, 5).sort((a, b) => a - b);
  while (nilai.length < 5) nilai.push(nilai[nilai.length - 1] + Math.max(1, Math.round(benar * 0.07)));
  return { opsi: nilai.map(fmt), kunci: nilai.indexOf(benar) };
}

/** Lima opsi teks: jawaban benar + 4 pengecoh unik, urutan diacak dengan rng. `penutup` selalu di akhir. */
function opsiTeks(r: Rng, benar: string, pengecoh: string[], penutup?: string) {
  const unik = [...new Set(pengecoh.filter((x) => x !== benar && x !== penutup))];
  const isi = [benar, ...acakRng(r, unik).slice(0, penutup ? 3 : 4)];
  const opsi = acakRng(r, isi);
  if (penutup) opsi.push(penutup);
  return { opsi, kunci: opsi.indexOf(benar) };
}

function acakRng<T>(r: Rng, arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Pasangan kata untuk soal verbal. Arti mengikuti KBBI. Setiap jawaban dibuat unik dan tidak
// bersinonim dengan jawaban lain, karena jawaban kata lain dipakai sebagai pengecoh.
const SINONIM: [string, string][] = [
  ['AKURAT', 'tepat'], ['ADAPTASI', 'penyesuaian'], ['AFIRMASI', 'penegasan'], ['AMBIGU', 'taksa'],
  ['ANOMALI', 'penyimpangan'], ['APATIS', 'acuh tak acuh'], ['DEFISIT', 'kekurangan'], ['EKSPLISIT', 'tersurat'],
  ['IMPLISIT', 'tersirat'], ['ESTIMASI', 'perkiraan'], ['INSINUASI', 'sindiran'], ['KENDALA', 'hambatan'],
  ['KOMPATIBEL', 'cocok'], ['KONKRET', 'nyata'], ['KREDIBEL', 'tepercaya'], ['NISBI', 'relatif'],
  ['OPSI', 'pilihan'], ['RASIONAL', 'masuk akal'], ['RELEVAN', 'berkaitan'], ['SIGNIFIKAN', 'berarti'],
  ['SPEKULASI', 'untung-untungan'], ['STAGNAN', 'mandek'], ['SUBSTANSI', 'inti'], ['VALID', 'sahih'],
  ['VAKUM', 'kosong'], ['VERIFIKASI', 'pemeriksaan'], ['ZENIT', 'titik puncak'], ['SPORADIS', 'sesekali'],
  ['UTOPIA', 'khayalan'], ['LUGAS', 'apa adanya'], ['PARADIGMA', 'kerangka berpikir'], ['EVALUASI', 'penilaian'],
  ['KONSISTEN', 'taat asas'], ['KONTRADIKSI', 'pertentangan'], ['INOVASI', 'pembaruan'], ['MUTAKHIR', 'terbaru'],
  ['DIKOTOMI', 'pembagian dua'], ['APRESIASI', 'penghargaan'], ['KOLABORASI', 'kerja sama'], ['FRIKSI', 'pergesekan'],
  ['PRAGMATIS', 'praktis'], ['KONKLUSI', 'kesimpulan'], ['KUALIFIKASI', 'syarat kecakapan'], ['NARASI', 'penceritaan'],
];

const ANTONIM: [string, string][] = [
  ['ABSTRAK', 'konkret'], ['ABSOLUT', 'relatif'], ['EKSPLISIT', 'implisit'], ['STATIS', 'dinamis'],
  ['SURPLUS', 'defisit'], ['EKSPOR', 'impor'], ['MAKRO', 'mikro'], ['OPTIMIS', 'pesimis'],
  ['DEDUKTIF', 'induktif'], ['EKSTERNAL', 'internal'], ['HETEROGEN', 'homogen'], ['MAYORITAS', 'minoritas'],
  ['KONVERGEN', 'divergen'], ['OBJEKTIF', 'subjektif'], ['EKSPANSI', 'kontraksi'], ['INFLASI', 'deflasi'],
  ['APRESIASI (nilai tukar)', 'depresiasi'], ['NADIR', 'zenit'], ['VERTIKAL', 'horizontal'], ['FANA', 'baka'],
  ['PERMANEN', 'temporer'], ['DEFENSIF', 'ofensif'], ['PROAKTIF', 'reaktif'], ['PROLOG', 'epilog'],
  ['KLIMAKS', 'antiklimaks'], ['SINONIM', 'antonim'], ['SENTRALISASI', 'desentralisasi'],
];

interface Proposisi {
  p: string;
  bukanP: string;
}
// Rantai sebab-akibat untuk soal logika: p → q → r.
const RANTAI: [Proposisi, Proposisi, Proposisi][] = [
  [{ p: 'hujan turun', bukanP: 'hujan tidak turun' }, { p: 'jalan licin', bukanP: 'jalan tidak licin' }, { p: 'pengendara melambat', bukanP: 'pengendara tidak melambat' }],
  [{ p: 'BI-Rate naik', bukanP: 'BI-Rate tidak naik' }, { p: 'bunga kredit naik', bukanP: 'bunga kredit tidak naik' }, { p: 'permintaan kredit turun', bukanP: 'permintaan kredit tidak turun' }],
  [{ p: 'Rani lulus ujian', bukanP: 'Rani tidak lulus ujian' }, { p: 'Rani mendapat beasiswa', bukanP: 'Rani tidak mendapat beasiswa' }, { p: 'Rani melanjutkan S2', bukanP: 'Rani tidak melanjutkan S2' }],
  [{ p: 'listrik padam', bukanP: 'listrik tidak padam' }, { p: 'server mati', bukanP: 'server tidak mati' }, { p: 'layanan terhenti', bukanP: 'layanan tidak terhenti' }],
  [{ p: 'harga cabai naik', bukanP: 'harga cabai tidak naik' }, { p: 'inflasi pangan meningkat', bukanP: 'inflasi pangan tidak meningkat' }, { p: 'daya beli melemah', bukanP: 'daya beli tidak melemah' }],
  [{ p: 'Dimas berolahraga', bukanP: 'Dimas tidak berolahraga' }, { p: 'Dimas sehat', bukanP: 'Dimas tidak sehat' }, { p: 'Dimas produktif', bukanP: 'Dimas tidak produktif' }],
  [{ p: 'target tercapai', bukanP: 'target tidak tercapai' }, { p: 'tim mendapat bonus', bukanP: 'tim tidak mendapat bonus' }, { p: 'tim berlibur', bukanP: 'tim tidak berlibur' }],
];

const KELOMPOK_ORANG = ['peserta rapat', 'anggota tim riset', 'karyawan cabang Medan', 'mahasiswa magang', 'pengunjung pameran', 'analis divisi moneter'];
const SIFAT: [string, string][] = [
  ['membawa laptop', 'tidak membawa laptop'], ['terdaftar di sistem', 'tidak terdaftar di sistem'], ['mengikuti pelatihan', 'tidak mengikuti pelatihan'],
  ['memiliki kartu akses', 'tidak memiliki kartu akses'], ['memakai seragam', 'tidak memakai seragam'], ['mengisi presensi', 'tidak mengisi presensi'],
];
const TAK_PASTI = 'Tidak dapat ditarik kesimpulan yang pasti';
const kapital = (x: string) => x[0].toUpperCase() + x.slice(1);

interface Pola {
  id: string;
  topik: string;
  buat: (r: Rng) => Omit<Soal, 'id' | 'modul' | 'topik'>;
}

const POLA: Pola[] = [
  {
    id: 'persen',
    topik: 'Numerik',
    buat: (r) => {
      const harga = int(r, 4, 40) * 25_000;
      const naik = pick(r, [10, 20, 25, 30, 40, 50]);
      const turun = pick(r, [10, 20, 25, 40, 50]);
      const akhir = (harga * (100 + naik) * (100 - turun)) / 10_000;
      return {
        teks: `Harga sebuah barang ${rp(harga)}. Harganya naik ${naik}%, kemudian turun ${turun}% dari harga setelah kenaikan. Harga akhirnya adalah ...`,
        ...opsiDari(r, akhir, [harga, harga * (1 + (naik - turun) / 100), (harga * (100 + naik)) / 100, (harga * (100 - turun)) / 100], rp),
        bahas: `${rp(harga)} × ${100 + naik}% = ${rp((harga * (100 + naik)) / 100)}, lalu × ${100 - turun}% = ${rp(akhir)}. Persen naik-turun tidak bisa langsung dikurangkan karena dasarnya berbeda.`,
      };
    },
  },
  {
    id: 'deret-a',
    topik: 'Numerik',
    buat: (r) => {
      const a = int(r, 2, 30);
      const b = int(r, 2, 9);
      const d = int(r, 1, 4);
      // Beda bertambah d setiap langkah (deret tingkat dua).
      const u = [a];
      for (let k = 0; k < 5; k++) u.push(u[k] + b + d * k);
      const next = u[5] + b + d * 5;
      return {
        teks: `${u.join(', ')}, ... Bilangan berikutnya adalah ...`,
        ...opsiDari(r, next, [next - d, next + d, u[5] + b + d * 4, next + b]),
        bahas: `Selisihnya ${u.slice(1).map((x, k) => x - u[k]).join(', ')} (bertambah ${d}). Selisih berikutnya ${b + d * 5}, jadi ${u[5]} + ${b + d * 5} = ${next}.`,
      };
    },
  },
  {
    id: 'deret-g',
    topik: 'Numerik',
    buat: (r) => {
      const a = int(r, 1, 6);
      const k = pick(r, [2, 3]);
      const c = pick(r, [-1, 1, 2, -2]);
      const u = [a];
      for (let i = 0; i < 4; i++) u.push(u[i] * k + c);
      const next = u[4] * k + c;
      const tanda = c > 0 ? `+ ${c}` : `− ${-c}`;
      return {
        teks: `${u.join(', ')}, ... Bilangan berikutnya adalah ...`,
        ...opsiDari(r, next, [u[4] * k, next + k, next - 2 * c, u[4] + (u[4] - u[3]) * k]),
        bahas: `Polanya: suku sebelumnya × ${k} ${tanda}. Jadi ${u[4]} × ${k} ${tanda} = ${next}.`,
      };
    },
  },
  {
    id: 'perbandingan',
    topik: 'Numerik',
    buat: (r) => {
      const x = int(r, 2, 7);
      let y = int(r, 2, 9);
      if (y === x) y++;
      const satuan = int(r, 3, 12) * (r() < 0.5 ? 5 : 1_000_000);
      const total = (x + y) * satuan;
      const uang = satuan >= 1000;
      const fmt = uang ? rp : angka;
      const jawab = x * satuan;
      return {
        teks: uang
          ? `Laba ${rp(total)} dibagi kepada A dan B dengan perbandingan ${x} : ${y}. Bagian A adalah ...`
          : `Perbandingan kelereng A dan B adalah ${x} : ${y}. Jumlah kelereng keduanya ${total}. Banyak kelereng A adalah ...`,
        ...opsiDari(r, jawab, [y * satuan, (total / (x + y)) * (x + 1), total - jawab + satuan, jawab + satuan], fmt),
        bahas: `Satu bagian = ${fmt(total)} ÷ ${x + y} = ${fmt(satuan)}. Bagian A = ${x} × ${fmt(satuan)} = ${fmt(jawab)}.`,
      };
    },
  },
  {
    id: 'kerja',
    topik: 'Numerik',
    buat: (r) => {
      // Pasangan hari yang hasil kerja samanya bulat: a·b/(a+b).
      const [a, b] = pick(r, [[6, 12], [10, 15], [12, 24], [20, 30], [4, 12], [6, 3], [18, 9], [12, 6], [15, 10], [30, 20]] as const);
      const bersama = (a * b) / (a + b);
      return {
        teks: `Andi dapat menyelesaikan sebuah laporan dalam ${a} hari, sedangkan Budi dalam ${b} hari. Jika bekerja bersama, laporan itu selesai dalam ... hari.`,
        ...opsiDari(r, bersama, [(a + b) / 2, Math.abs(a - b), Math.min(a, b) - 1, bersama + 2]),
        bahas: `Per hari Andi mengerjakan 1/${a} dan Budi 1/${b}. Bersama: 1/${a} + 1/${b} = ${a + b}/${a * b}, jadi waktunya ${a * b}/${a + b} = ${angka(bersama)} hari.`,
      };
    },
  },
  {
    id: 'kecepatan',
    topik: 'Numerik',
    buat: (r) => {
      const v = int(r, 4, 16) * 5;
      const menit = pick(r, [30, 45, 90, 120, 150, 180]);
      const jarak = (v * menit) / 60;
      return {
        teks: `Sebuah mobil melaju dengan kecepatan rata-rata ${v} km/jam selama ${menit} menit. Jarak yang ditempuh adalah ... km.`,
        ...opsiDari(r, jarak, [v * (menit / 100), jarak + v / 2, jarak - v / 4, v * Math.round(menit / 60)]),
        bahas: `${menit} menit = ${angka(menit / 60)} jam. Jarak = ${v} × ${angka(menit / 60)} = ${angka(jarak)} km.`,
      };
    },
  },
  {
    id: 'rata-rata',
    topik: 'Numerik',
    buat: (r) => {
      const n = int(r, 4, 12);
      const rata = int(r, 60, 80);
      const selisih = int(r, 1, 3);
      const nilaiBaru = rata + selisih * (n + 1);
      return {
        teks: `Rata-rata nilai ${n} peserta adalah ${rata}. Setelah satu peserta baru bergabung, rata-ratanya menjadi ${rata + selisih}. Nilai peserta baru tersebut adalah ...`,
        ...opsiDari(r, nilaiBaru, [rata + selisih, rata + selisih * n, nilaiBaru - selisih, nilaiBaru + selisih]),
        bahas: `Jumlah awal ${n} × ${rata} = ${n * rata}. Jumlah baru ${n + 1} × ${rata + selisih} = ${(n + 1) * (rata + selisih)}. Nilai peserta baru = ${(n + 1) * (rata + selisih)} − ${n * rata} = ${nilaiBaru}.`,
      };
    },
  },
  {
    id: 'bunga',
    topik: 'Numerik',
    buat: (r) => {
      const pokok = int(r, 2, 20) * 1_000_000;
      const bunga = pick(r, [3, 4, 5, 6, 8, 10]);
      const bulan = pick(r, [6, 9, 18, 24, 30]);
      const hasil = pokok + (pokok * bunga * bulan) / 1200;
      return {
        teks: `Tabungan ${rp(pokok)} mendapat bunga tunggal ${bunga}% per tahun. Setelah ${bulan} bulan, saldonya menjadi ...`,
        ...opsiDari(r, hasil, [pokok + (pokok * bunga) / 100, pokok + (pokok * bunga * bulan) / 100, (pokok * bunga * bulan) / 1200, hasil + pokok * 0.01], rp),
        bahas: `Bunga = ${rp(pokok)} × ${bunga}% × ${bulan}/12 = ${rp((pokok * bunga * bulan) / 1200)}. Saldo = ${rp(pokok)} + bunga = ${rp(hasil)}.`,
      };
    },
  },
  {
    id: 'inflasi',
    topik: 'Numerik',
    buat: (r) => {
      const ihk0 = int(r, 100, 130);
      const persen = pick(r, [2, 2.5, 3, 4, 5]);
      const ihk1 = Math.round(ihk0 * (100 + persen)) / 100;
      return {
        teks: `IHK tahun lalu ${angka(ihk0)} dan IHK tahun ini ${angka(ihk1)}. Inflasi tahunan (yoy) adalah ...%.`,
        ...opsiDari(r, persen, [Math.round((ihk1 - ihk0) * 100) / 100, persen + 0.5, persen - 0.5, persen * 2], (n) => `${angka(n)}`),
        bahas: `Inflasi = (${angka(ihk1)} − ${angka(ihk0)}) ÷ ${angka(ihk0)} × 100% = ${angka(persen)}%.`,
      };
    },
  },
];

const POLA_KATA: Pola[] = [
  {
    id: 'sinonim',
    topik: 'Verbal',
    buat: (r) => {
      const [kata, arti] = pick(r, SINONIM);
      return {
        teks: `Sinonim dari ${kata} adalah ...`,
        ...opsiTeks(r, arti, SINONIM.filter(([k]) => k !== kata).map(([, a]) => a)),
        bahas: `${kata} berarti ${arti}. Cek arti kata lain di KBBI (kbbi.kemendikdasmen.go.id) kalau ragu.`,
      };
    },
  },
  {
    id: 'antonim',
    topik: 'Verbal',
    buat: (r) => {
      const [kata, lawan] = pick(r, ANTONIM);
      return {
        teks: `Antonim (lawan kata) dari ${kata} adalah ...`,
        ...opsiTeks(r, lawan, ANTONIM.filter(([k, l]) => k !== kata && l !== lawan).map(([, a]) => a)),
        bahas: `Lawan kata ${kata.toLowerCase()} adalah ${lawan}.`,
      };
    },
  },
  {
    id: 'ponens',
    topik: 'Logika',
    buat: (r) => {
      const [p, q, s] = pick(r, RANTAI);
      const tollens = r() < 0.5;
      const teks = tollens
        ? `Jika ${p.p}, maka ${q.p}. Ternyata ${q.bukanP}. Kesimpulan yang tepat adalah ...`
        : `Jika ${p.p}, maka ${q.p}. Ternyata ${p.p}. Kesimpulan yang tepat adalah ...`;
      const benar = kapital(tollens ? p.bukanP : q.p);
      return {
        teks,
        ...opsiTeks(r, benar, [kapital(p.p), kapital(q.bukanP), kapital(p.bukanP), kapital(q.p), kapital(s.p)], TAK_PASTI),
        bahas: tollens
          ? `Modus tollens: p → q dan ¬q, maka ¬p. Karena ${q.bukanP}, pasti ${p.bukanP}.`
          : `Modus ponens: p → q dan p, maka q. Karena ${p.p}, pasti ${q.p}.`,
      };
    },
  },
  {
    id: 'silogisme',
    topik: 'Logika',
    buat: (r) => {
      const [p, q, s] = pick(r, RANTAI);
      const benar = `Jika ${p.p}, maka ${s.p}`;
      return {
        teks: `Jika ${p.p}, maka ${q.p}. Jika ${q.p}, maka ${s.p}. Kesimpulan yang sah adalah ...`,
        ...opsiTeks(r, benar, [`Jika ${s.p}, maka ${p.p}`, `Jika ${p.bukanP}, maka ${s.bukanP}`, `${kapital(p.p)} dan ${s.bukanP}`, `Jika ${s.bukanP}, maka ${q.p}`], TAK_PASTI),
        bahas: `Silogisme hipotetis: p → q dan q → r, maka p → r. Konvers (r → p) dan invers (¬p → ¬r) tidak sah.`,
      };
    },
  },
  {
    id: 'kuantor',
    topik: 'Logika',
    buat: (r) => {
      const orang = pick(r, KELOMPOK_ORANG);
      const [m, bukanM] = pick(r, SIFAT);
      const [pp, bukanPp] = pick(r, SIFAT.filter(([x]) => x !== m));
      const jenis = int(r, 0, 2);
      if (jenis === 0) {
        const benar = `Semua ${orang} ${pp}`;
        return {
          teks: `Semua ${orang} ${m}. Semua yang ${m} ${pp}. Kesimpulan yang tepat adalah ...`,
          ...opsiTeks(r, benar, [`Sebagian ${orang} ${bukanPp}`, `Semua yang ${pp} adalah ${orang}`, `Tidak ada ${orang} yang ${pp}`, `Sebagian ${orang} ${bukanM}`], TAK_PASTI),
          bahas: `Himpunan ${orang} ada di dalam himpunan yang ${m}, dan himpunan itu ada di dalam yang ${pp}. Jadi semua ${orang} ${pp}. Kebalikannya belum tentu benar.`,
        };
      }
      if (jenis === 1) {
        return {
          teks: `Ingkaran dari "Semua ${orang} ${m}" adalah ...`,
          ...opsiTeks(r, `Ada ${orang} yang ${bukanM}`, [`Semua ${orang} ${bukanM}`, `Tidak ada ${orang} yang ${m}`, `Sebagian ${orang} ${m}`, `Semua yang ${m} adalah ${orang}`]),
          bahas: `Ingkaran "semua A adalah B" adalah "ada (sebagian) A yang bukan B", bukan "semua A bukan B".`,
        };
      }
      return {
        teks: `Semua ${orang} ${m}. Sebagian karyawan kantor pusat ${m}. Kesimpulan yang tepat adalah ...`,
        ...opsiTeks(r, TAK_PASTI, [`Sebagian karyawan kantor pusat adalah ${orang}`, `Semua karyawan kantor pusat adalah ${orang}`, `Tidak ada ${orang} yang bekerja di kantor pusat`, `Semua yang ${m} adalah ${orang}`]),
        bahas: `Kedua kelompok sama-sama ${m}, tetapi tidak ada premis yang menghubungkan ${orang} dengan karyawan kantor pusat. Jadi tidak ada kesimpulan pasti.`,
      };
    },
  },
];

POLA.push(
  {
    id: 'umur',
    topik: 'Numerik',
    buat: (r) => {
      let anak = 0, x = 0, ayah = 0;
      do {
        anak = int(r, 6, 14);
        x = int(r, 2, 10);
        ayah = 3 * (anak + x) - x;
      } while (ayah - anak < 20);
      return {
        teks: `Umur Nisa sekarang ${anak} tahun. ${x} tahun lagi, umur ayahnya tiga kali umur Nisa. Umur ayah sekarang adalah ... tahun.`,
        ...opsiDari(r, ayah, [3 * anak, 3 * (anak + x), ayah + x, ayah - 2]),
        bahas: `${x} tahun lagi Nisa berumur ${anak + x}, ayah 3 × ${anak + x} = ${3 * (anak + x)}. Umur ayah sekarang ${3 * (anak + x)} − ${x} = ${ayah} tahun.`,
      };
    },
  },
  {
    id: 'diskon',
    topik: 'Numerik',
    buat: (r) => {
      const harga = int(r, 4, 40) * 50_000;
      const d1 = pick(r, [10, 20, 25, 30, 50]);
      const d2 = pick(r, [10, 20, 25]);
      const akhir = (harga * (100 - d1) * (100 - d2)) / 10_000;
      return {
        teks: `Sebuah jaket berharga ${rp(harga)} mendapat diskon ${d1}% + ${d2}%. Harga yang dibayar adalah ...`,
        ...opsiDari(r, akhir, [(harga * (100 - d1 - d2)) / 100, (harga * (100 - d1)) / 100, (harga * (100 - d2)) / 100, akhir + harga * 0.05], rp),
        bahas: `Diskon bertingkat dihitung berurutan: ${rp(harga)} × ${100 - d1}% = ${rp((harga * (100 - d1)) / 100)}, lalu × ${100 - d2}% = ${rp(akhir)}. Bukan diskon ${d1 + d2}% sekaligus.`,
      };
    },
  },
);

const SEMUA_POLA = [...POLA, ...POLA_KATA];
const POLA_BY_ID = new Map(SEMUA_POLA.map((p) => [p.id, p]));

function dariPola(p: Pola, seed: number): Soal {
  return { id: `gen-${p.id}-${seed}`, modul: 'potensi-dasar', topik: p.topik, ...p.buat(mulberry32(seed)) };
}

/** Topik Potensi Dasar yang punya generator. */
export const TOPIK_GENERATOR = [...new Set(SEMUA_POLA.map((p) => p.topik))];

/** Membuat `jumlah` soal baru dengan angka/kata acak, opsional hanya untuk topik tertentu. */
export function soalAcak(jumlah: number, topik?: string[] | null): Soal[] {
  const pola = topik ? SEMUA_POLA.filter((p) => topik.includes(p.topik)) : SEMUA_POLA;
  if (!pola.length) return [];
  const mulai = Math.floor(Math.random() * pola.length);
  return Array.from({ length: jumlah }, (_, k) => dariPola(pola[(mulai + k) % pola.length], Math.floor(Math.random() * 2 ** 31)));
}

export const isGenerated = (id: string) => id.startsWith('gen-');

/** Soal dari bank tetap atau dibuat ulang dari id generator. */
export function cariSoal(id: string): Soal | undefined {
  const tetap = soalById.get(id);
  if (tetap) return tetap;
  const m = /^gen-(.+)-(\d+)$/.exec(id);
  const p = m && POLA_BY_ID.get(m[1]);
  return p ? dariPola(p, Number(m[2])) : undefined;
}

export const JUMLAH_POLA = SEMUA_POLA.length;
