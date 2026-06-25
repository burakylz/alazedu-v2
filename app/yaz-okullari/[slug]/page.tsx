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
  about?: string; duration?: string; classSize?: string; capacity?: string; distance?: string
  airport?: string; accommodation?: string; hours2?: string; exFull?: string; exHalf?: string
  exIntro?: string; activities?: string; priceTable?: string[][]; domain?: string
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
    description: `${s.name}, ${s.city} (İngiltere) 2026 yaz okulu: programlar, fiyat tablosu, konaklama, geziler ve kabul şartları. AlazEdu ile ücretsiz danışmanlık.`,
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
    s.dates ? ['Program tarihleri', s.dates] : null,
    s.duration ? ['Program süresi', s.duration] : null,
    (s.hours2 || s.hours) ? ['Haftalık ders', s.hours2 || `${s.hours} saat`] : null,
    s.classSize ? ['Sınıf mevcudu', s.classSize] : null,
    s.capacity ? ['Okul kapasitesi', s.capacity] : null,
    s.distance ? ['Mesafe', s.distance] : null,
    s.airport ? ['En yakın havaalanı', s.airport] : null,
    (s.accommodation || s.room) ? ['Konaklama', s.accommodation || s.room] : null,
  ].filter(Boolean) as [string, string][]
  const hasExc = s.exIntro || s.exFull || s.exHalf
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
          <h1 style={{ fontFamily: 'Fraunces,serif', fontWeight: 600, fontSize: 40, lineHeight: 1.06, letterSpacing: '-.01em', color: '#fff', marginTop: 10, maxWidth: 800 }}>{s.name}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 14, color: 'rgba(255,255,255,.85)', fontSize: 15 }}>
            <span>📍 {s.city}, İngiltere</span>
            {s.ageMin && s.ageMax && <span>🎂 <b style={{ color: '#fff' }}>{s.ageMin}–{s.ageMax}</b> yaş</span>}
            {s.dates && <span>📅 {s.dates}</span>}
            {s.priceFrom > 0 ? <span>💷 <b style={{ color: 'var(--gold)' }}>£{s.priceFrom.toLocaleString('tr-TR')}</b>'den</span> : null}
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 26 }}>
            <button className="btn-gold">Ücretsiz Danışmanlık Al</button>
            <Link href="/yaz-okullari"><button className="btn-ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.35)' }}>← Tüm Yaz Okulları</button></Link>
          </div>
        </div>
      </header>

      <section className="sec" style={{ paddingTop: 50, paddingBottom: 0 }}><div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 8 }}>Program Hakkında</div>
        <h2 style={{ marginBottom: 14 }}>{s.name}</h2>
        <p style={{ color: 'var(--mut)', fontSize: 16, lineHeight: 1.8, maxWidth: 900 }}>
          {s.about ? s.about : `${s.name}, ${s.city} şehrinde düzenlenen bir yaz programıdır. İngilizce dersini spor, sanat, gezi ve akşam etkinlikleriyle birleştirir.`}
          {' '}AlazEdu kayıt, vize ve transfer dahil tüm süreci ücretsiz yönetir.
        </p>
      </div></section>

      <section className="sec" style={{ paddingTop: 36 }}><div className="wrap">
        <h2 style={{ marginBottom: 18, fontSize: 22 }}>Genel bilgiler</h2>
        <div className="why">
          {facts.map(([k, v]) => (<div className="w" key={k}><b>{k}</b><span>{v}</span></div>))}
        </div>
      </div></section>

      {hasExc && (
        <section className="sec" style={{ paddingTop: 12 }}><div className="wrap">
          <h2 style={{ marginBottom: 16, fontSize: 22 }}>Geziler</h2>
          {s.exIntro && <p style={{ color: 'var(--mut)', fontSize: 15.5, lineHeight: 1.7, marginBottom: 16 }}>{s.exIntro}</p>}
          <div className="why">
            {s.exFull && <div className="w"><b>Tam günlük geziler</b><span>{s.exFull}</span></div>}
            {s.exHalf && <div className="w"><b>Yarım günlük geziler</b><span>{s.exHalf}</span></div>}
          </div>
        </div></section>
      )}

      {s.activities && (
        <section className="sec" style={{ paddingTop: 12 }}><div className="wrap">
          <h2 style={{ marginBottom: 14, fontSize: 22 }}>Aktiviteler</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
            {s.activities.split(/[,.]/).map((a) => a.trim()).filter((a) => a.length > 1).map((a, i) => (
              <span key={i} style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 999, padding: '7px 14px', fontSize: 13.5, color: 'var(--mut)' }}>{a}</span>
            ))}
          </div>
        </div></section>
      )}

      {s.priceTable && s.priceTable.length > 1 ? (
        <section className="sec" style={{ paddingTop: 12 }}><div className="wrap">
          <div className="eyebrow" style={{ marginBottom: 8 }}>Fiyatlar</div>
          <h2 style={{ marginBottom: 6 }}>2026 fiyat listesi</h2>
          <p style={{ color: 'var(--mut)', fontSize: 14.5, lineHeight: 1.7, marginBottom: 14 }}>Fiyatlara genelde kurs, tam pansiyon konaklama, geziler, aktiviteler ve toplu havalimanı transferi dahildir. Tutarlar bilgilendirme amaçlıdır; kesin fiyat için ücretsiz danışmanlık al.</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead><tr>{s.priceTable[0].map((h, i) => (<th key={i} style={{ padding: '12px 14px', textAlign: i === 0 ? 'left' : 'center', borderBottom: '1px solid var(--line)', color: 'var(--mut2)', fontSize: 11.5, letterSpacing: '.05em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>))}</tr></thead>
              <tbody>
                {s.priceTable.slice(1).map((r, ri) => (
                  <tr key={ri}>
                    {r.map((c, ci) => (<td key={ci} style={{ padding: '12px 14px', borderBottom: '1px solid var(--line)', textAlign: ci === 0 ? 'left' : 'center', fontWeight: ci === 0 ? 600 : 400, color: ci === 0 ? 'var(--txt)' : (c && c !== '-' ? 'var(--gold)' : 'var(--mut2)') }}>{c || '-'}</td>))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div></section>
      ) : s.priceNote ? (
        <section className="sec" style={{ paddingTop: 12 }}><div className="wrap" style={{ maxWidth: 760 }}>
          <h2 style={{ marginBottom: 10, fontSize: 22 }}>Fiyat & paket</h2>
          <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 14, padding: '18px 20px' }}>
            <div style={{ fontFamily: 'Fraunces,serif', fontSize: 24, color: 'var(--gold)' }}>£{s.priceFrom.toLocaleString('tr-TR')}<span style={{ fontSize: 14, color: 'var(--mut)' }}> / haftadan</span></div>
            <p style={{ color: 'var(--mut)', fontSize: 14.5, marginTop: 8 }}>{s.priceNote}</p>
          </div>
        </div></section>
      ) : null}

      <section className="sec" style={{ paddingTop: 12 }}><div className="wrap">
        <h2 style={{ marginBottom: 16, fontSize: 22 }}>Dahil olanlar & vize</h2>
        <div className="why">
          <div className="w"><b>Pakete dahil</b><span>Kurs, tam pansiyon konaklama (yurt/aile yanı), sosyal aktiviteler ve geziler; çoğu pakette havalimanı transferi.</span></div>
          <div className="w"><b>Konaklama</b><span>{s.accommodation || s.room || 'Yurt veya denetimli aile yanı; tam pansiyon.'}</span></div>
          <div className="w"><b>Vize</b><span>6 aya kadar programlar için genelde Standart Ziyaretçi Vizesi yeterlidir; 18 yaş altı için ebeveyn muvafakati gerekir.</span></div>
          <div className="w"><b>Süreç</b><span>Danışmanlık → kamp & tarih seçimi → kayıt → vize → konaklama & transfer. Tümünü AlazEdu ücretsiz yönetir.</span></div>
        </div>
        <p style={{ color: 'var(--mut2)', fontSize: 12.5, marginTop: 14 }}>Bilgiler 2026 sezonu içindir ve sağlayıcıya göre değişebilir; kesin müfredat, tarih ve fiyat için ücretsiz danışmanlık al.</p>
      </div></section>

      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[1] }} />
    </>
  )
}
