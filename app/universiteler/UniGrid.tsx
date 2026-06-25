'use client'
import { useState } from 'react'
import Link from 'next/link'

type U = { slug: string; name: string; city: string; qs: string; p: number }

export default function UniGrid({ unis, cities }: { unis: U[]; cities: string[] }) {
  const [sel, setSel] = useState<string[]>([])
  const [q, setQ] = useState('')
  const [cityQ, setCityQ] = useState('')
  const toggle = (c: string) => setSel((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]))
  const filtered = unis.filter((u) => (sel.length === 0 || sel.includes(u.city)) && (q === '' || u.name.toLowerCase().includes(q.toLowerCase())))
  const shownCities = cities.filter((c) => c.toLowerCase().includes(cityQ.toLowerCase()))
  return (
    <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '262px 1fr', gap: 30, alignItems: 'start' }}>
      <aside style={{ position: 'sticky', top: 90, background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 18, padding: '20px 20px 24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--gold-soft)', color: 'var(--gold)', borderRadius: 999, padding: '6px 14px', fontSize: 13, fontWeight: 600, marginBottom: 18 }}>🇬🇧 İngiltere</div>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.14em', color: 'var(--mut2)', textTransform: 'uppercase', marginBottom: 10 }}>Üniversite Ara</div>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="İsim ara…" style={{ width: '100%', height: 40, background: 'rgba(8,16,30,.55)', border: '1px solid var(--line)', borderRadius: 10, color: 'var(--txt)', padding: '0 12px', fontSize: 14, marginBottom: 20 }} />
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.14em', color: 'var(--mut2)', textTransform: 'uppercase', marginBottom: 10 }}>Şehirler</div>
        <input value={cityQ} onChange={(e) => setCityQ(e.target.value)} placeholder="Şehir ara…" style={{ width: '100%', height: 38, background: 'rgba(8,16,30,.55)', border: '1px solid var(--line)', borderRadius: 10, color: 'var(--txt)', padding: '0 12px', fontSize: 13.5, marginBottom: 12 }} />
        <div style={{ maxHeight: 280, overflowY: 'auto', display: 'grid', gap: 4 }}>
          {shownCities.map((c) => {
            const on = sel.includes(c)
            return (
              <label key={c} onClick={() => toggle(c)} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 14, color: on ? 'var(--txt)' : 'var(--mut)', padding: '5px 0', cursor: 'pointer' }}>
                <span style={{ width: 18, height: 18, borderRadius: 5, border: '1px solid ' + (on ? 'var(--gold)' : 'var(--line2)'), background: on ? 'var(--gold-soft)' : 'transparent', color: 'var(--gold)', display: 'grid', placeItems: 'center', fontSize: 11 }}>{on ? '✓' : ''}</span>
                {c}
              </label>
            )
          })}
        </div>
        {sel.length > 0 && <button onClick={() => setSel([])} style={{ marginTop: 14, background: 'none', border: 'none', color: 'var(--gold)', fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0 }}>Filtreyi sıfırla</button>}
      </aside>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20, color: 'var(--mut)', fontSize: 14 }}>
          <span><b style={{ color: 'var(--txt)' }}>{filtered.length}</b> üniversite{sel.length > 0 ? ' · ' + sel.join(', ') : ''}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))', gap: 20 }}>
          {filtered.map((u) => (
            <Link key={u.slug} href={`/universiteler/${u.slug}`} className="uphoto">
              <img src={`https://picsum.photos/seed/${u.slug}/600/450`} alt={u.name} />
              <div className="ov">
                {u.qs !== '—' && <span className="qsb">QS #{u.qs}</span>}
                <h4>{u.name}</h4>
                <span className="loc">İngiltere · {u.city} · {u.p} program</span>
              </div>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && <p style={{ color: 'var(--mut2)', padding: '40px 0', textAlign: 'center' }}>Bu filtreyle üniversite bulunamadı.</p>}
      </div>

      <style>{`
        .uphoto{position:relative;display:block;border-radius:18px;overflow:hidden;border:1px solid var(--line);aspect-ratio:4/3}
        .uphoto img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
        .uphoto:hover img{transform:scale(1.07)}
        .uphoto .ov{position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,14,26,.05) 35%,rgba(8,14,26,.9));display:flex;flex-direction:column;justify-content:flex-end;padding:18px}
        .uphoto h4{font-family:Fraunces,serif;font-size:21px;font-weight:600;color:#fff;line-height:1.2}
        .uphoto .loc{color:#d8b463;font-size:13px;font-weight:600;margin-top:4px}
        .uphoto .qsb{position:absolute;top:12px;right:12px;background:rgba(13,22,40,.8);border:1px solid var(--line2);color:var(--gold);font-size:11.5px;font-weight:700;padding:4px 9px;border-radius:8px}
        @media(max-width:820px){.uphoto + style, aside{position:static}}
      `}</style>
    </div>
  )
}
