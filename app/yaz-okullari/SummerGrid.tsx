'use client'
import { useState } from 'react'
import Link from 'next/link'

type S = { slug: string; name: string; provider: string; city: string; photo: string; ageMin: number | null; ageMax: number | null; priceFrom: number; dates: string; src: string }

export default function SummerGrid({ schools, cities }: { schools: S[]; cities: string[] }) {
  const [sel, setSel] = useState<string[]>([])
  const [q, setQ] = useState('')
  const [cityQ, setCityQ] = useState('')
  const [age, setAge] = useState('')
  const [sort, setSort] = useState<'name' | 'price'>('name')
  const toggle = (c: string) => setSel((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]))
  const ageN = parseInt(age)
  let filtered = schools.filter(
    (s) =>
      (sel.length === 0 || sel.includes(s.city)) &&
      (q === '' || (s.name + ' ' + s.provider).toLowerCase().includes(q.toLowerCase())) &&
      (!age || isNaN(ageN) || (s.ageMin != null && s.ageMax != null && ageN >= s.ageMin && ageN <= s.ageMax))
  )
  filtered = [...filtered].sort((a, b) =>
    sort === 'price' ? (a.priceFrom || 1e9) - (b.priceFrom || 1e9) : a.name.localeCompare(b.name, 'tr')
  )
  const shownCities = cities.filter((c) => c.toLowerCase().includes(cityQ.toLowerCase()))
  return (
    <div className="wrap dwrap" style={{ display: 'grid', gridTemplateColumns: '262px 1fr', gap: 30, alignItems: 'start' }}>
      <aside className="dfilter" style={{ position: 'sticky', top: 90, background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 18, padding: '20px 20px 24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--gold-soft)', color: 'var(--gold)', borderRadius: 999, padding: '6px 14px', fontSize: 13, fontWeight: 600, marginBottom: 18 }}>🇬🇧 İngiltere</div>
        <div className="fl">Kamp / sağlayıcı ara</div>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ör. Bucksmore, Eton, futbol…" className="fi" />
        <div className="fl" style={{ marginTop: 18 }}>Çocuğun yaşı</div>
        <input value={age} onChange={(e) => setAge(e.target.value)} inputMode="numeric" placeholder="ör. 14" className="fi" />
        <div className="fl" style={{ marginTop: 18 }}>Sırala</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setSort('name')} className={'sortb' + (sort === 'name' ? ' on' : '')}>A–Z</button>
          <button onClick={() => setSort('price')} className={'sortb' + (sort === 'price' ? ' on' : '')}>Fiyat ↑</button>
        </div>
        <div className="fl" style={{ marginTop: 18 }}>Şehirler</div>
        <input value={cityQ} onChange={(e) => setCityQ(e.target.value)} placeholder="Şehir ara…" className="fi" />
        <div style={{ maxHeight: 260, overflowY: 'auto', display: 'grid', gap: 4, marginTop: 8 }}>
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
        {(sel.length > 0 || q || age) && <button onClick={() => { setSel([]); setQ(''); setAge('') }} style={{ marginTop: 16, background: 'none', border: 'none', color: 'var(--gold)', fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0 }}>Filtreleri sıfırla</button>}
      </aside>

      <div>
        <div style={{ marginBottom: 20, color: 'var(--mut)', fontSize: 14 }}><b style={{ color: 'var(--txt)' }}>{filtered.length}</b> yaz okulu / kamp{age && !isNaN(ageN) ? ` · ${ageN} yaş için` : ''}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(258px,1fr))', gap: 20 }}>
          {filtered.map((s) => (
            <Link key={s.slug} href={`/yaz-okullari/${s.slug}`} className="scard">
              <div className="ph">
                <img className="bg" src={s.photo} alt={`${s.city}, İngiltere`} loading="lazy" />
                <span className="pr">{s.priceFrom > 0 ? `£${s.priceFrom.toLocaleString('tr-TR')}/hafta'dan` : 'Fiyat: danış'}</span>
                {s.ageMin != null && s.ageMax != null ? <span className="ag">{s.ageMin}–{s.ageMax} yaş</span> : null}
                <div className="ov">
                  <h4>{s.name}</h4>
                  <div className="loc">İngiltere · {s.city}</div>
                </div>
              </div>
              <div className="body">{s.dates || s.provider}</div>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && <p style={{ color: 'var(--mut2)', padding: '40px 0', textAlign: 'center' }}>Bu filtreyle kamp bulunamadı.</p>}
      </div>

      <style>{`
        .fl{font-size:12px;font-weight:700;letter-spacing:.12em;color:var(--mut2);text-transform:uppercase;margin-bottom:8px}
        .fi{width:100%;height:40px;background:rgba(14,28,52,.05);border:1px solid var(--line);border-radius:10px;color:var(--txt);padding:0 12px;font-size:14px;font-family:inherit}
        .fi::placeholder{color:var(--mut2)}
        .sortb{flex:1;height:36px;background:rgba(14,28,52,.05);border:1px solid var(--line);border-radius:9px;color:var(--mut);font-size:13px;font-weight:600;cursor:pointer}
        .sortb.on{background:var(--gold-soft);border-color:var(--gold);color:var(--gold)}
        .scard{display:block;border:1px solid var(--line);border-radius:18px;overflow:hidden;background:var(--card);transition:transform .22s,border-color .22s}
        .scard:hover{transform:translateY(-5px);border-color:var(--line2)}
        .scard .ph{position:relative;height:175px;overflow:hidden}
        .scard .ph .bg{width:100%;height:100%;object-fit:cover;transition:transform .55s ease}
        .scard:hover .ph .bg{transform:scale(1.07)}
        .scard .ph .ov{position:absolute;left:0;right:0;bottom:0;z-index:2;padding:30px 16px 13px;background:linear-gradient(to top,rgba(6,11,22,.93),rgba(6,11,22,.4) 60%,transparent)}
        .scard .ph .ov h4{color:#fff;font-size:15.5px;font-weight:700;line-height:1.25}
        .scard .ph .ov .loc{color:rgba(255,255,255,.82);font-size:12.5px;margin-top:3px}
        .scard .ph .pr{position:absolute;top:10px;right:10px;z-index:2;background:rgba(10,20,38,.82);color:var(--gold);font-size:11px;font-weight:700;padding:4px 9px;border-radius:8px;backdrop-filter:blur(4px)}
        .scard .ph .ag{position:absolute;top:10px;left:10px;z-index:2;background:rgba(255,255,255,.92);color:#0a1426;font-size:11px;font-weight:700;padding:4px 9px;border-radius:8px}
        .scard .body{padding:11px 16px;color:var(--mut);font-size:12.5px;min-height:20px}
        @media(max-width:820px){.dwrap{grid-template-columns:1fr}.dfilter{position:static}}
      `}</style>
    </div>
  )
}
