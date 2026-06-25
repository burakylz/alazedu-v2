'use client'
import { useState } from 'react'

type F = { isim: string; telefon: string; email: string; grade: string; level: string; topic: string; note: string }
const init: F = { isim: '', telefon: '', email: '', grade: '', level: '', topic: '', note: '' }

const grades = ['Lise 9. sınıf', 'Lise 10. sınıf', 'Lise 11. sınıf', 'Lise 12. sınıf', 'Lise mezunu', 'Üniversite öğrencisi', 'Üniversite mezunu', 'Diğer']
const levels = ['Başlangıç', 'Orta', 'İleri', 'IELTS / sınav puanım var', 'Emin değilim']
const topics = ['Üniversite (Lisans)', 'Yüksek Lisans', 'Dil Okulu', 'Yaz Okulu', 'Lise Staj / Kariyer', 'Burs danışmanlığı', 'Vize', 'Genel bilgi']

export default function ConsultForm() {
  const [f, setF] = useState<F>(init)
  const [st, setSt] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')
  const set = (k: keyof F, v: string) => setF((s) => ({ ...s, [k]: v }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!f.isim.trim() || (!f.telefon.trim() && !f.email.trim())) { setSt('err'); return }
    setSt('sending')
    try {
      const mesaj = `Sınıf/durum: ${f.grade || '-'} · İngilizce: ${f.level || '-'}${f.note ? ' · Not: ' + f.note : ''}`
      const r = await fetch('/api/lead', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isim: f.isim, telefon: f.telefon, email: f.email, program: f.topic, mesaj }),
      })
      setSt(r.ok ? 'ok' : 'err')
    } catch { setSt('err') }
  }

  const inputStyle: React.CSSProperties = { width: '100%', height: 46, background: 'rgba(14,28,52,.05)', border: '1px solid var(--line2)', borderRadius: 11, color: 'var(--txt)', padding: '0 14px', fontSize: 15, fontFamily: 'inherit' }
  const lbl: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: 'var(--mut)', marginBottom: 7, display: 'block' }

  if (st === 'ok') {
    return (
      <div style={{ background: 'rgba(74,201,126,.10)', border: '1px solid rgba(74,201,126,.35)', borderRadius: 18, padding: '34px 30px', textAlign: 'center' }}>
        <div style={{ fontSize: 40 }}>✅</div>
        <h3 style={{ fontFamily: 'Fraunces,serif', fontSize: 24, margin: '10px 0 8px' }}>Talebin bize ulaştı!</h3>
        <p style={{ color: 'var(--mut)', fontSize: 15.5, maxWidth: 460, margin: '0 auto' }}>Danışmanlarımız en kısa sürede seninle iletişime geçecek. Acele bir durumda WhatsApp'tan da yazabilirsin.</p>
        <a href="https://wa.me/447749849668" target="_blank" rel="noreferrer"><button className="btn-gold" style={{ marginTop: 20 }}>WhatsApp'tan Yaz</button></a>
      </div>
    )
  }

  return (
    <form onSubmit={submit} style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 18, padding: '28px 26px', boxShadow: '0 20px 50px -30px rgba(14,28,52,.3)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={lbl}>Ad Soyad *</label>
          <input style={inputStyle} value={f.isim} onChange={(e) => set('isim', e.target.value)} placeholder="Adın ve soyadın" />
        </div>
        <div>
          <label style={lbl}>Telefon</label>
          <input style={inputStyle} value={f.telefon} onChange={(e) => set('telefon', e.target.value)} placeholder="+90 / +44 …" inputMode="tel" />
        </div>
        <div>
          <label style={lbl}>E-posta</label>
          <input style={inputStyle} value={f.email} onChange={(e) => set('email', e.target.value)} placeholder="ornek@mail.com" inputMode="email" />
        </div>
        <div>
          <label style={lbl}>Kaçıncı sınıftasın / durumun?</label>
          <select style={inputStyle} value={f.grade} onChange={(e) => set('grade', e.target.value)}>
            <option value="">Seç…</option>
            {grades.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label style={lbl}>İngilizce seviyen</label>
          <select style={inputStyle} value={f.level} onChange={(e) => set('level', e.target.value)}>
            <option value="">Seç…</option>
            {levels.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={lbl}>Ne ile ilgili danışmanlık istiyorsun?</label>
          <select style={inputStyle} value={f.topic} onChange={(e) => set('topic', e.target.value)}>
            <option value="">Seç…</option>
            {topics.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={lbl}>Eklemek istediğin not (opsiyonel)</label>
          <textarea style={{ ...inputStyle, height: 90, padding: '12px 14px', resize: 'vertical' }} value={f.note} onChange={(e) => set('note', e.target.value)} placeholder="Hedeflerin, sorman gerekenler…" />
        </div>
      </div>
      {st === 'err' && <p style={{ color: '#c0392b', fontSize: 14, marginTop: 14 }}>Lütfen ad ve en az bir iletişim bilgisi (telefon veya e-posta) gir. Sorun sürerse WhatsApp: +44 7749 849 668.</p>}
      <button className="btn-gold" type="submit" disabled={st === 'sending'} style={{ marginTop: 20, width: '100%', justifyContent: 'center', opacity: st === 'sending' ? .7 : 1 }}>
        {st === 'sending' ? 'Gönderiliyor…' : 'Ücretsiz Danışmanlık Talebi Gönder'}
      </button>
      <p style={{ color: 'var(--mut2)', fontSize: 12.5, marginTop: 12, textAlign: 'center' }}>Bilgilerin yalnızca danışmanlık için kullanılır; talebin danışman ekibimize iletilir.</p>
    </form>
  )
}
