'use client'
import { useState } from 'react'
import Link from 'next/link'

type S = { slug: string; name: string; city: string; logo: string; photo: string; priceWk: number; minAge: number | null; avgClass: string | null; cap: number | null }

export default function SchoolGrid({ schools, cities }: { schools: S[]; cities: string[] }) {
  const [sel, setSel] = useState<string[]>([])
  const [q, setQ] = useState('')
  const [cityQ, setCityQ] = useState('')
  const [sort, setSort] = useState<'name' | 'price'>('name')
  const toggle = (c: string) => setSel((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]))
  let filtered = schools.filter(
    (s) => (sel.length === 0 || sel.includes(s.city)) && (q === '' || s.name.toLowerCase().includes(q.toLowerCase()))
  )
  filtered = [...filtered].sort((a, b) => (sort === 'price' ? a.priceWk - b.priceWk : a.name.localeCompare(b.name, 'tr')))
  const shownCities = cities.filter((c) => c.toLowerCase().includes(cityQ.toLowerCase()))
  return (
    <div className="wrap dwrap" style={{ display: 'grid', gridTemplateColumns: '262px 1fr', gap: 30, alignItems: 'start' }}>
      <aside className="dfilter" style={{ position: 'sticky', top: 90, background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 18, padding: '20px 20px 24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--gold-soft)', color: 'var(--gold)', borderRadius: 999, padding: '6px 14px', fontSize: 13, fontWeight: 600, marginBottom: 18 }}>🇬🇧 İngiltere</div>
        <div className="fl">Okul ara</div>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Okul adı ara…" className="fi" />
        <div className="fl" style={{ marginTop: 18 }}>Sırala</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setSort('name')} className={'sortb' + (sort === 'name' ? ' on' : '')}>A–Z</button>
          <button onClick={() => setSort('price')} className={'sortb' + (sort === 'price' ? ' on' : '')}>Fiyat ↑</button>
        </div>
        <div className="fl" style={{ marginTop: 18 }}>Şehirler</div>
        <input value={cityQ} onChange={(e) => setCityQ(e.target.value)} placeholder="Şehir ara…" className="fi" />
        <div style={{ maxHeight: 280, overflowY: 'auto', display: 'grid', gap: 4, marginTop: 8 }}>
          {shownCities.map((c) => {
            const on = sel.includes(c)
            const n = schools.filter((s) => s.city === c).length
            return (
              <label key={c} onClick={() => toggle(c)} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 14, color: on ? 'var(--txt)' : 'var(--mut)', padding: '5px 0', cursor: 'pointer' }}>
                <span style={{ width: 18, height: 18, borderRadius: 5, border: '1px solid ' + (on ? 'var(--gold)' : 'var(--line2)'), background: on ? 'var(--gold-soft)' : 'transparent', color: 'var(--gold)', display: 'grid', placeItems: 'center', fontSize: 11 }}>{on ? '✓' : ''}</span>
                <span style={{ flex: 1 }}>{c}</span>
                <span style={{ color: 'var(--mut2)', fontSize: 12 }}>{n}</span>
              </label>
            )
          })}
        </div>
        {(sel.length > 0 || q) && <button onClick={() => { setSel([]); setQ('') }} style={{ marginTop: 16, background: 'none', border: 'none', color: 'var(--gold)', fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0 }}>Filtreleri sıfırla</button>}
      </aside>

      <div>
        <div style={{ marginBottom: 20, color: 'var(--mut)', fontSize: 14 }}><b style={{ color: 'var(--txt)' }}>{filtered.length}</b> dil okulu</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(258px,100%),1fr))', gap: 20 }}>
          {filtered.map((s) => (
            <Link key={s.slug} href={`/dil-okullari/${s.slug}`} className="scard">
              <div className="ph">
                <img className="bg" src={s.photo} alt={`${s.city}, İngiltere`} loading="lazy" />
                <span className="pr">£{s.priceWk}/hafta'dan</span>
                {s.logo ? <span className="lg"><img src={s.logo} alt="" loading="lazy" onError={(e) => { const p = (e.currentTarget.closest('.lg') as HTMLElement); if (p) p.style.display = 'none' }} /></span> : null}
                <div className="ov">
                  <h4>{s.name}</h4>
                  <div className="loc">İngiltere · {s.city}</div>
                </div>
              </div>
              <div className="body">{[s.minAge ? `Min ${s.minAge} yaş` : '', s.avgClass ? `Sınıf ${s.avgClass}` : '', s.cap ? `${s.cap} öğrenci` : ''].filter(Boolean).join(' · ')}</div>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && <p style={{ color: 'var(--mut2)', padding: '40px 0', textAlign: 'center' }}>Bu filtreyle okul bulunamadı.</p>}
      </div>

      <style>{`
        .fl{font-size:12px;font-weight:700;letter-spacing:.12em;color:var(--mut2);text-transform:uppercase;margin-bottom:8px}
        .fi{width:100%;height:40px;background:rgba(14,28,52,.05);border:1px solid var(--line);border-radius:10px;color:var(--txt);padding:0 12px;font-size:14px;font-family:inherit}
        .fi::placeholder{color:var(--mut2)}
        .sortb{flex:1;height:36px;background:rgba(14,28,52,.05);border:1px solid var(--line);border-radius:9px;color:var(--mut);font-size:13px;font-weight:600;cursor:pointer}
        .sortb.on{background:var(--gold-soft);border-color:var(--gold);color:var(--gold)}
        .scard{display:block;border:1px solid var(--line);border-radius:18px;overflow:hidden;background:var(--card);transition:transform .22s,border-color .22s}
        .scard:hover{transform:translateY(-5px);border-color:var(--line2)}
        .scard .ph{position:relative;height:172px;overflow:hidden}
        .scard .ph .bg{width:100%;height:100%;object-fit:cover;transition:transform .55s ease}
        .scard:hover .ph .bg{transform:scale(1.07)}
        .scard .ph .ov{position:absolute;left:0;right:0;bottom:0;z-index:2;padding:30px 16px 13px;background:linear-gradient(to top,rgba(6,11,22,.92),rgba(6,11,22,.4) 60%,transparent)}
        .scard .ph .ov h4{color:#fff;font-size:16px;font-weight:700;line-height:1.22}
        .scard .ph .ov .loc{color:rgba(255,255,255,.82);font-size:12.5px;margin-top:3px}
        .scard .ph .pr{position:absolute;top:10px;right:10px;z-index:2;background:rgba(10,20,38,.82);color:var(--gold);font-size:11px;font-weight:700;padding:4px 9px;border-radius:8px;backdrop-filter:blur(4px)}
        .scard .ph .lg{position:absolute;top:10px;left:10px;z-index:2;width:36px;height:36px;border-radius:9px;background:#fff;display:grid;place-items:center;box-shadow:0 2px 8px rgba(0,0,0,.25)}
        .scard .ph .lg img{width:22px;height:22px;object-fit:contain}
        .scard .body{padding:11px 16px;color:var(--mut);font-size:12.5px;min-height:20px}
        @media(max-width:820px){.dwrap{grid-template-columns:1fr}.dfilter{position:static}}
      `}</style>
    </div>
  )
}
