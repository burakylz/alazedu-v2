'use client'
import { useState } from 'react'
import Link from 'next/link'

type U = { slug: string; name: string; city: string; qs: string; img: string; p: number; ps: string }

export default function UniGrid({ unis, cities }: { unis: U[]; cities: string[] }) {
  const [sel, setSel] = useState<string[]>([])
  const [q, setQ] = useState('')
  const [prog, setProg] = useState('')
  const [cityQ, setCityQ] = useState('')
  const toggle = (c: string) => setSel((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]))
  const filtered = unis.filter((u) =>
    (sel.length === 0 || sel.includes(u.city)) &&
    (q === '' || u.name.toLowerCase().includes(q.toLowerCase())) &&
    (prog === '' || u.ps.includes(prog.toLowerCase()))
  )
  const shownCities = cities.filter((c) => c.toLowerCase().includes(cityQ.toLowerCase()))
  const ini = (n: string) => n.replace(/^(The )?University of /, '').slice(0, 2).toUpperCase()
  return (
    <div className="wrap uwrap" style={{ display: 'grid', gridTemplateColumns: '262px 1fr', gap: 30, alignItems: 'start' }}>
      <aside className="ufilter" style={{ position: 'sticky', top: 90, background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 18, padding: '20px 20px 24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--gold-soft)', color: 'var(--gold)', borderRadius: 999, padding: '6px 14px', fontSize: 13, fontWeight: 600, marginBottom: 18 }}>🇬🇧 İngiltere</div>
        <div className="fl">Üniversite ara</div>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="İsim ara…" className="fi" />
        <div className="fl" style={{ marginTop: 18 }}>Bölüm / program ara</div>
        <input value={prog} onChange={(e) => setProg(e.target.value)} placeholder="ör. Hukuk, Engineering, Business…" className="fi" />
        <div className="fl" style={{ marginTop: 18 }}>Şehirler</div>
        <input value={cityQ} onChange={(e) => setCityQ(e.target.value)} placeholder="Şehir ara…" className="fi" />
        <div style={{ maxHeight: 240, overflowY: 'auto', display: 'grid', gap: 4, marginTop: 8 }}>
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
        {(sel.length > 0 || q || prog) && <button onClick={() => { setSel([]); setQ(''); setProg('') }} style={{ marginTop: 16, background: 'none', border: 'none', color: 'var(--gold)', fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0 }}>Filtreleri sıfırla</button>}
      </aside>

      <div>
        <div style={{ marginBottom: 20, color: 'var(--mut)', fontSize: 14 }}><b style={{ color: 'var(--txt)' }}>{filtered.length}</b> üniversite{prog ? ` · "${prog}" içeren` : ''}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(248px,1fr))', gap: 20 }}>
          {filtered.map((u) => (
            <Link key={u.slug} href={`/universiteler/${u.slug}`} className="ucard">
              <div className="logo">
                {u.qs !== '—' && <span className="qsb">QS #{u.qs}</span>}
                {u.img ? <img src={u.img} alt={u.name} /> : <span className="ini">{ini(u.name)}</span>}
              </div>
              <div className="body">
                <h4>{u.name}</h4>
                <div className="loc">İngiltere · {u.city} · {u.p} program</div>
              </div>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && <p style={{ color: 'var(--mut2)', padding: '40px 0', textAlign: 'center' }}>Bu filtreyle üniversite bulunamadı.</p>}
      </div>

      <style>{`
        .fl{font-size:12px;font-weight:700;letter-spacing:.12em;color:var(--mut2);text-transform:uppercase;margin-bottom:8px}
        .fi{width:100%;height:40px;background:rgba(14,28,52,.05);border:1px solid var(--line);border-radius:10px;color:var(--txt);padding:0 12px;font-size:14px;font-family:inherit}
        .fi::placeholder{color:var(--mut2)}
        .ucard{display:block;border:1px solid var(--line);border-radius:18px;overflow:hidden;background:var(--card);transition:transform .22s,border-color .22s}
        .ucard:hover{transform:translateY(-5px);border-color:var(--line2)}
        .ucard .logo{position:relative;height:148px;background:#f3f1ea;display:grid;place-items:center;padding:22px}
        .ucard .logo img{max-height:98px;max-width:78%;object-fit:contain}
        .ucard .logo .ini{font-family:Fraunces,serif;font-size:36px;font-weight:600;color:#0a1426}
        .ucard .logo .qsb{position:absolute;top:10px;right:10px;background:#0a1426;color:var(--gold);font-size:11px;font-weight:700;padding:4px 9px;border-radius:8px}
        .ucard .body{padding:15px 18px 18px}
        .ucard h4{font-size:16px;font-weight:700;line-height:1.25}
        .ucard .loc{color:var(--mut2);font-size:13px;margin-top:5px}
        @media(max-width:820px){.uwrap{grid-template-columns:1fr}.ufilter{position:static}}
      `}</style>
    </div>
  )
}
