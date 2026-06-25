'use client'
import { useState } from 'react'

type Prog = { n: string; lvl: string; aw: string; f: string; d: string; ielts: string; fee: number }
function fee(n: number) { return n > 0 ? '£' + n.toLocaleString('tr-TR') + '/yıl' : 'Bilgi için sor' }

export default function DetailPrograms({ programs }: { programs: Prog[] }) {
  const [q, setQ] = useState('')
  const [sel, setSel] = useState('')
  const [open, setOpen] = useState<Record<string, boolean>>({})
  const searching = q.trim() !== ''
  const list = programs.filter((p) => !searching || (p.n + ' ' + p.f).toLowerCase().includes(q.toLowerCase()))

  // group all programs by field (for chip counts) and filtered list by field
  const allFields: Record<string, number> = {}
  for (const p of programs) { const k = p.f || 'Diğer'; allFields[k] = (allFields[k] || 0) + 1 }
  const fieldChips = Object.keys(allFields).sort((a, b) => allFields[b] - allFields[a])

  const fields: Record<string, Prog[]> = {}
  for (const p of list) { const k = p.f || 'Diğer'; (fields[k] = fields[k] || []).push(p) }
  let fieldNames = Object.keys(fields).sort()
  if (sel) fieldNames = fieldNames.filter((f) => f === sel)

  const toggle = (fn: string) => setOpen((o) => ({ ...o, [fn]: !o[fn] }))
  const isOpen = (fn: string) => searching || sel === fn || open[fn]

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Bölüm ara… (ör. Hukuk, Computer Science, Business)" style={{ flex: 1, minWidth: 280, height: 46, background: 'rgba(8,16,30,.55)', border: '1px solid var(--line2)', borderRadius: 12, color: 'var(--txt)', padding: '0 16px', fontSize: 15, fontFamily: 'inherit' }} />
        <span style={{ color: 'var(--mut)', fontSize: 14 }}><b style={{ color: 'var(--txt)' }}>{list.length}</b> program · {fieldChips.length} alan</span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
        <button onClick={() => setSel('')} className={'pchip' + (sel === '' ? ' on' : '')}>Tüm alanlar</button>
        {fieldChips.map((f) => (
          <button key={f} onClick={() => setSel(sel === f ? '' : f)} className={'pchip' + (sel === f ? ' on' : '')}>{f} <span style={{ opacity: .6 }}>{allFields[f]}</span></button>
        ))}
      </div>

      {!searching && !sel && (
        <p style={{ color: 'var(--mut2)', fontSize: 13, marginBottom: 14 }}>Bölümleri görmek için bir alana tıkla, üstten ara ya da alan seç.</p>
      )}

      {fieldNames.map((fn) => {
        const opened = isOpen(fn)
        return (
          <div key={fn} style={{ marginBottom: 12, border: '1px solid var(--line)', borderRadius: 12, overflow: 'hidden' }}>
            <button onClick={() => toggle(fn)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, background: 'var(--card)', border: 'none', padding: '15px 18px', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--gold)', letterSpacing: '.04em' }}>{fn} <span style={{ color: 'var(--mut2)', fontWeight: 400 }}>· {fields[fn].length} program</span></span>
              <span style={{ color: 'var(--mut)', fontSize: 18, transform: opened ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>⌄</span>
            </button>
            {opened && (
              <div style={{ display: 'grid', gap: 10, padding: '4px 14px 16px' }}>
                {fields[fn].map((p, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center', background: 'rgba(8,16,30,.4)', border: '1px solid var(--line)', borderRadius: 10, padding: '13px 16px' }}>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 15 }}>{p.n} {p.aw && <span style={{ color: 'var(--mut2)', fontWeight: 400 }}>· {p.aw}</span>}</div>
                      <div style={{ color: 'var(--mut2)', fontSize: 13, marginTop: 3 }}>{[p.d, p.ielts].filter(Boolean).join(' · ')}</div>
                    </div>
                    <div style={{ color: 'var(--gold)', fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap' }}>{fee(p.fee)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
      {list.length === 0 && <p style={{ color: 'var(--mut2)', padding: '30px 0', textAlign: 'center' }}>Bu aramayla program bulunamadı.</p>}

      <style>{`
        .pchip{background:rgba(8,16,30,.55);border:1px solid var(--line);border-radius:999px;color:var(--mut);font-size:13px;font-weight:600;padding:7px 14px;cursor:pointer;font-family:inherit;transition:all .15s}
        .pchip:hover{border-color:var(--line2);color:var(--txt)}
        .pchip.on{background:var(--gold-soft);border-color:var(--gold);color:var(--gold)}
      `}</style>
    </div>
  )
}
