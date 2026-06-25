import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import data from '../summerschools.json'

type S = {
  slug: string; name: string; provider: string; city: string; venue: string; photo: string
  ageMin: number | null; ageMax: number | null; priceFrom: number; priceNote: string
  dates: string; hours: number; room: string; src: string
}
const schools = (data as any).schools as S[]
const nav = fs.readFileSync(path.join(process.cwd(), 'app', 'partials.html'), 'utf8')

export function generateStaticParams() { return schools.map((s) => ({ slug: s.slug })) }

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = schools.find((x) => x.slug === params.slug)
  if (!s) return { title: 'Yaz Okulu Bulunamadı' }
  const age = s.ageMin && s.ageMax ? ` (${s.ageMin}–${s.ageMax} yaş)` : ''
  return {
    title: `${s.name} — ${s.city} Yaz Okulu 2026${age}`,
    description: `${s.name}, ${s.city} (İngiltere) 2026 yaz okulu: yaş grubu, tarihler, konaklama ve ücret bilgisi. AlazEdu ile ücretsiz danışmanlık.`,
    alternates: { canonical: `https://www.alazedu.com/yaz-okullari/${s.slug}` },
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  const s = schools.find((x) => x.slug === params.slug)
  if (!s) notFound()
  const facts: [string, string][] = [
    ['Sağlayıcı', s.provider],
    ['Lokasyon', `${s.city}, İngiltere`],
    s.venue ? ['Kampüs', s.venue] : null,
    s.ageMin && s.ageMax ? ['Yaş grubu', `${s.ageMin}–${s.ageMax} yaş`] : null,
    s.dates ? ['Tarihler', s.dates] : null,
    s.hours ? ['İngilizce dersi', `Haftada ${s.hours} saat`] : null,
    s.room ? ['Konaklama', s.room] : null,
  ].filter(Boolean) as [string, string][]

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[0] }} />
      <header style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--line)' }}>
        {s.photo && <img src={s.photo} alt={`${s.city}, İngiltere`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(6,11,22,.96),rgba(6,11,22,.72) 55%,rgba(6,11,22,.55))' }} />
        <div className="wrap" style={{ position: 'relative', zIndex: 2, padding: '46px 0 40px' }}>
          <div style={{ color: 'rgba(255,255,255,.7)', fontSize: 13, marginBottom: 20 }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,.8)' }}>Ana Sayfa</Link> <span style={{ color: 'var(--gold)' }}>›</span> <Link href="/yaz-okullari" style={{ color: 'rgba(255,255,255,.8)' }}>Yaz Okulları</Link> <span style={{ color: 'var(--gold)' }}>›</span> {s.name}
          </div>
          <div className="eyebrow" style={{ color: 'var(--gold)' }}>Yaz Okulu 2026</div>
          <h1 style={{ fontFamily: 'Fraunces,serif', fontWeight: 600, fontSize: 42, lineHeight: 1.06, letterSpacing: '-.01em', color: '#fff', marginTop: 10, maxWidth: 760 }}>{s.name}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 14, color: 'rgba(255,255,255,.85)', fontSize: 15 }}>
            <span>📍 {s.city}, İngiltere</span>
            {s.ageMin && s.ageMax && <span>🎂 <b style={{ color: '#fff' }}>{s.ageMin}–{s.ageMax}</b> yaş</span>}
            {s.dates && <span>📅 {s.dates}</span>}
            {s.priceFrom > 0 ? <span>💷 <b style={{ color: 'var(--gold)' }}>£{s.priceFrom.toLocaleString('tr-TR')}</b>/hafta'dan</span> : <span>💷 Fiyat için danışmanlık</span>}
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 26 }}>
            <button className="btn-gold">Ücretsiz Danışmanlık Al</button>
            <Link href="/yaz-okullari"><button className="btn-ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.35)' }}>← Tüm Yaz Okulları</button></Link>
          </div>
        </div>
      </header>

      <section className="sec" style={{ paddingTop: 50, paddingBottom: 0 }}><div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 8 }}>Program Hakkında</div>
        <h2 style={{ marginBottom: 14 }}>Genel bakış</h2>
        <p style={{ color: 'var(--mut)', fontSize: 16, lineHeight: 1.8, maxWidth: 880 }}>
          {s.name}, {s.city} şehrinde{s.venue ? ` (${s.venue})` : ''} düzenlenen bir yaz programıdır.
          {s.ageMin && s.ageMax ? ` ${s.ageMin}–${s.ageMax} yaş` : ''} grubuna yönelik program;
          {s.hours ? ` haftada ${s.hours} saat İngilizce dersini` : ' İngilizce dersini'} spor, sanat, gezi ve akşam etkinlikleriyle birleştirir.
          {s.room ? ` Konaklama: ${s.room.toLowerCase()}.` : ''} {s.priceNote ? s.priceNote + '.' : ''} AlazEdu kayıt, vize ve transfer dahil tüm süreci ücretsiz yönetir.
        </p>
      </div></section>

      <section className="sec" style={{ paddingTop: 36 }}><div className="wrap">
        <h2 style={{ marginBottom: 18, fontSize: 22 }}>Program bilgileri</h2>
        <div className="why">
          {facts.map(([k, v]) => (<div className="w" key={k}><b>{k}</b><span>{v}</span></div>))}
          <div className="w"><b>Ücret</b><span>{s.priceFrom > 0 ? `£${s.priceFrom.toLocaleString('tr-TR')}/hafta'dan` : 'Sağlayıcıya göre değişir — danışmanlık al'}{s.priceNote ? ` · ${s.priceNote}` : ''}</span></div>
        </div>
      </div></section>

      <section className="sec" style={{ paddingTop: 12 }}><div className="wrap">
        <h2 style={{ marginBottom: 16, fontSize: 22 }}>Tipik bir gün & dahil olanlar</h2>
        <div className="why">
          <div className="w"><b>Sabah</b><span>Seviye gruplarında İngilizce dersleri (interaktif, iletişim odaklı).</span></div>
          <div className="w"><b>Öğleden sonra</b><span>Spor, sanat, atölye veya yarım/tam günlük gezi.</span></div>
          <div className="w"><b>Akşam</b><span>Sosyal etkinlikler: talent show, film gecesi, disko, takım oyunları.</span></div>
          <div className="w"><b>Dahil</b><span>Konaklama + tam pansiyon, çoğu pakette havalimanı transferi, katılım belgesi.</span></div>
        </div>
        <p style={{ color: 'var(--mut2)', fontSize: 12.5, marginTop: 14 }}>Program akışı örnektir; kesin müfredat, tarih ve fiyat için ücretsiz danışmanlık al. Reşit olmayan öğrenciler için ebeveyn muvafakati gerekir.</p>
      </div></section>

      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[1] }} />
    </>
  )
}
