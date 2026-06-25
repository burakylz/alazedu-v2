'use client'
import { useState } from 'react'

type Prog = { n: string; lvl: string; aw: string; f: string; d: string; ielts: string; fee: number }
function fee(n: number) { return n > 0 ? '£' + n.toLocaleString('tr-TR') + '/yıl' : 'Bilgi için sor' }

export default function DetailPrograms({ programs }: { programs: Prog[] }) {
  const [q, setQ] = useState('')
  const list = programs.filter((p) => q === '' || (p.n + ' ' + p.f).toLowerCase().includes(q.toLowerCase()))
  const fields: Record<string, Prog[]> = {}
  for (const p of list) { const k = p.f || 'Diğer'; (fields[k] = fields[k] || []).push(p) }
  const fieldNames = Object.keys(fields).sort()
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 26 }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Bölüm ara… (ör. Hukuk, Computer Science, Business)" style={{ flex: 1, minWidth: 280, height: 46, background: 'rgba(8,16,30,.55)', border: '1px solid var(--line2)', borderRadius: 12, color: 'var(--txt)', padding: '0 16px', fontSize: 15, fontFamily: 'inherit' }} />
        <span style={{ color: 'var(--mut)', fontSize: 14 }}><b style={{ color: 'var(--txt)' }}>{list.length}</b> program</span>
      </div>
      {fieldNames.map((fn) => (
        <div key={fn} style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.1em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid var(--line)' }}>{fn} <span style={{ color: 'var(--mut2)', fontWeight: 400 }}>· {fields[fn].length}</span></div>
          <div style={{ display: 'grid', gap: 10 }}>
            {fields[fn].map((p, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center', background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 12, padding: '14px 18px' }}>
                <div>
                  <div style={{ fontWeight: 500, fontSize: 15.5 }}>{p.n} {p.aw && <span style={{ color: 'var(--mut2)', fontWeight: 400 }}>· {p.aw}</span>}</div>
                  <div style={{ color: 'var(--mut2)', fontSize: 13, marginTop: 3 }}>{[p.d, p.ielts].filter(Boolean).join(' · ')}</div>
                </div>
                <div style={{ color: 'var(--gold)', fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap' }}>{fee(p.fee)}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {list.length === 0 && <p style={{ color: 'var(--mut2)', padding: '30px 0', textAlign: 'center' }}>Bu aramayla program bulunamadı.</p>}
    </div>
  )
}
