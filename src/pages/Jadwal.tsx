import { useState } from 'react';
import { CalendarPlus, Plus, Trash2 } from 'lucide-react';
import { FASE, MODUL, namaModul } from '../data/modul';
import { newId, useRows, usePengaturan, useStore } from '../lib/sync';
import { faseUntuk, modulTerlemah, susunJadwal } from '../lib/stats';
import { Bar, Empty, PageHead } from '../components';
import { addDays, cx, daysBetween, hari, today } from '../util';

export function Jadwal() {
  const store = useStore();
  const [p, saveP] = usePengaturan();
  const tugas = useRows('jadwal_tugas');
  const percobaan = useRows('percobaan');
  const [lampau, setLampau] = useState(false);
  const [baru, setBaru] = useState({ tanggal: today(), deskripsi: '', modul: '', target_menit: 30 });
  const hariIni = today();
  const mulai = (p.preferensi.mulai as string | undefined) ?? hariIni;

  const susun = () => {
    if (!p.preferensi.mulai) saveP({ preferensi: { ...p.preferensi, mulai: hariIni } });
    const list = susunJadwal({
      mulai,
      target: p.tanggal_target,
      menit: p.menit_per_hari,
      hari: 14,
      sudahAda: new Set(tugas.map((t) => t.tanggal)),
      lemah: modulTerlemah(percobaan),
    });
    for (const t of list) store.put('jadwal_tugas', { id: newId(), selesai: false, selesai_at: null, ...t });
  };

  const tambah = (e: React.FormEvent) => {
    e.preventDefault();
    if (!baru.deskripsi.trim()) return;
    store.put('jadwal_tugas', {
      id: newId(),
      tanggal: baru.tanggal,
      fase: faseUntuk(baru.tanggal, mulai, p.tanggal_target),
      modul: baru.modul || null,
      deskripsi: baru.deskripsi.trim(),
      target_menit: baru.target_menit,
      selesai: false,
      selesai_at: null,
    });
    setBaru({ ...baru, deskripsi: '' });
  };

  const byTanggal = new Map<string, typeof tugas>();
  for (const t of [...tugas].sort((a, b) => a.tanggal.localeCompare(b.tanggal) || a.deskripsi.localeCompare(b.deskripsi))) {
    if (!lampau && t.tanggal < hariIni) continue;
    byTanggal.set(t.tanggal, [...(byTanggal.get(t.tanggal) ?? []), t]);
  }
  const terakhir = tugas.reduce((m, t) => (t.tanggal > m ? t.tanggal : m), '');
  const ke14 = addDays(hariIni, 13);
  const lewat = tugas.filter((t) => t.tanggal < hariIni);
  const selesaiLewat = lewat.filter((t) => t.selesai).length;
  const sisaHari = daysBetween(hariIni, p.tanggal_target);

  return (
    <div className="page">
      <PageHead title="Jadwal" sub={`${sisaHari} hari menuju tes · ${p.menit_per_hari} menit per hari`}>
        <button className="btn primary" onClick={susun} disabled={terakhir >= ke14}>
          <CalendarPlus size={16} /> {terakhir >= ke14 ? 'Jadwal 2 minggu sudah ada' : 'Susun 2 minggu ke depan'}
        </button>
      </PageHead>

      <section className="card phases">
        {FASE.map((f) => (
          <div key={f.id} className={cx('phase', faseUntuk(hariIni, mulai, p.tanggal_target) === f.id && 'on')}>
            <b>{f.nama}</b>
            <small className="muted">{f.keterangan}</small>
          </div>
        ))}
      </section>

      {lewat.length > 0 && (
        <section className="card">
          <div className="row-between">
            <span>
              Kepatuhan jadwal: {selesaiLewat}/{lewat.length} tugas lampau selesai
            </span>
            <label className="toggle">
              <input type="checkbox" checked={lampau} onChange={(e) => setLampau(e.target.checked)} /> Tampilkan yang lampau
            </label>
          </div>
          <Bar value={(selesaiLewat / lewat.length) * 100} tone="ok" />
        </section>
      )}

      {byTanggal.size ? (
        [...byTanggal].map(([tgl, list]) => (
          <section key={tgl} className={cx('card day', tgl === hariIni && 'today')}>
            <div className="card-head">
              <h2>{tgl === hariIni ? 'Hari ini' : tgl === addDays(hariIni, 1) ? 'Besok' : hari(tgl)}</h2>
              <span className="tag">{FASE.find((f) => f.id === list[0].fase)?.nama}</span>
            </div>
            <ul className="checklist">
              {list.map((t) => (
                <li key={t.id} className={t.selesai ? 'done' : undefined}>
                  <label>
                    <input
                      type="checkbox"
                      checked={t.selesai}
                      onChange={(e) => store.patch('jadwal_tugas', t.id, { selesai: e.target.checked, selesai_at: e.target.checked ? new Date().toISOString() : null })}
                    />
                    <span>
                      {t.deskripsi}
                      <small className="muted">
                        {' '}
                        · {t.target_menit} menit{t.modul ? ` · ${namaModul(t.modul)}` : ''}
                      </small>
                    </span>
                  </label>
                  <button className="icon-btn subtle" aria-label="Hapus tugas" onClick={() => store.remove('jadwal_tugas', t.id)}>
                    <Trash2 size={15} />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))
      ) : (
        <Empty>Belum ada jadwal. Klik "Susun 2 minggu ke depan". Tugas disusun sesuai fase belajar, menit per hari, dan modul yang skornya masih rendah.</Empty>
      )}

      <form className="card add-task" onSubmit={tambah}>
        <h2 className="label">Tambah tugas sendiri</h2>
        <div className="form-grid">
          <label className="field">
            <span>Tanggal</span>
            <input type="date" value={baru.tanggal} min={hariIni} max={p.tanggal_target} onChange={(e) => setBaru({ ...baru, tanggal: e.target.value })} required />
          </label>
          <label className="field">
            <span>Modul</span>
            <select value={baru.modul} onChange={(e) => setBaru({ ...baru, modul: e.target.value })}>
              <option value="">Umum</option>
              {MODUL.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nama}
                </option>
              ))}
              <option value="campuran">Campuran</option>
            </select>
          </label>
          <label className="field">
            <span>Menit</span>
            <input type="number" min={5} max={600} step={5} value={baru.target_menit} onChange={(e) => setBaru({ ...baru, target_menit: Math.max(5, Number(e.target.value) || 5) })} />
          </label>
          <label className="field wide">
            <span>Tugas</span>
            <input value={baru.deskripsi} onChange={(e) => setBaru({ ...baru, deskripsi: e.target.value })} placeholder="Misalnya: baca Laporan Kebijakan Moneter terbaru" required />
          </label>
        </div>
        <button className="btn">
          <Plus size={16} /> Tambah
        </button>
      </form>
    </div>
  );
}

