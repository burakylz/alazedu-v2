import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import data from '../internships.json'

type P = {
  slug: string; title: string; field: string; category: string; provider: string; city: string; venue: string
  ageMin: number; ageMax: number; dates: string; lengths: string; priceFrom: number; desc: string; photo: string
}
const programs = (data as any).programs as P[]
const tiers = (data as any).tiers as { label: string; edu: number; res: number }[]
const nav = fs.readFileSync(path.join(process.cwd(), 'app', 'partials.html'), 'utf8')

export function generateStaticParams() { return programs.map((p) => ({ slug: p.slug })) }

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = programs.find((x) => x.slug === params.slug)
  if (!p) return { title: 'Program Bulunamadı' }
  return {
    title: `${p.title} — Londra Lise Kariyer Programı 2026 (15–18 yaş)`,
    description: `${p.title}: ${p.field} alanında Londra UCL'de meslek deneyimi. 15–18 yaş, 1–2 hafta. AlazEdu ile ücretsiz danışmanlık.`,
    alternates: { canonical: `https://www.alazedu.com/lise-staj/${p.slug}` },
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  const p = programs.find((x) => x.slug === params.slug)
  if (!p) notFound()
  const facts: [string, string][] = [
    ['Sağlayıcı', p.provider],
    ['Alan', p.field],
    ['Lokasyon', `${p.city}, ${p.venue}`],
    ['Yaş grubu', `${p.ageMin}–${p.ageMax} yaş`],
    ['Süre', p.lengths],
    ['Başlangıç', p.dates],
  ]
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[0] }} />
      <header style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--line)' }}>
        {p.photo && <img src={p.photo} alt={p.city} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(6,11,22,.96),rgba(6,11,22,.72) 55%,rgba(6,11,22,.55))' }} />
        <div className="wrap" style={{ position: 'relative', zIndex: 2, padding: '46px 0 40px' }}>
          <div style={{ color: 'rgba(255,255,255,.7)', fontSize: 13, marginBottom: 18 }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,.8)' }}>Ana Sayfa</Link> <span style={{ color: 'var(--gold)' }}>›</span> <Link href="/lise-staj" style={{ color: 'rgba(255,255,255,.8)' }}>Lise Staj</Link> <span style={{ color: 'var(--gold)' }}>›</span> {p.field}
          </div>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,.92)', color: '#0a1426', fontSize: 11.5, fontWeight: 700, padding: '5px 11px', borderRadius: 8 }}>{p.category}</div>
          <h1 style={{ fontFamily: 'Fraunces,serif', fontWeight: 600, fontSize: 42, lineHeight: 1.06, letterSpacing: '-.01em', color: '#fff', marginTop: 12, maxWidth: 780 }}>{p.title}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 14, color: 'rgba(255,255,255,.85)', fontSize: 15 }}>
            <span>📍 {p.city}, {p.venue}</span>
            <span>🎂 <b style={{ color: '#fff' }}>{p.ageMin}–{p.ageMax}</b> yaş</span>
            <span>📅 {p.dates}</span>
            <span>💷 <b style={{ color: 'var(--gold)' }}>£{p.priceFrom.toLocaleString('tr-TR')}</b>'ten</span>
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 26 }}>
            <button className="btn-gold">Ücretsiz Danışmanlık Al</button>
            <Link href="/lise-staj"><button className="btn-ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.35)' }}>← Tüm Programlar</button></Link>
          </div>
        </div>
      </header>

      <section className="sec" style={{ paddingTop: 50, paddingBottom: 0 }}><div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 8 }}>Program Hakkında</div>
        <h2 style={{ marginBottom: 14 }}>Genel bakış</h2>
        <p style={{ color: 'var(--mut)', fontSize: 16, lineHeight: 1.8, maxWidth: 880 }}>{p.desc} Program; alanında uzman profesyonellerle çalışma, dünyaca ünlü UCL kampüsünde üniversite hayatını deneyimleme ve üniversite başvurunu güçlendirme fırsatı sunar. Kayıt, vize ve konaklama dahil tüm süreci AlazEdu ücretsiz yönetir.</p>
      </div></section>

      <section className="sec" style={{ paddingTop: 36 }}><div className="wrap">
        <h2 style={{ marginBottom: 18, fontSize: 22 }}>Program bilgileri</h2>
        <div className="why">
          {facts.map(([k, v]) => (<div className="w" key={k}><b>{k}</b><span>{v}</span></div>))}
          <div className="w"><b>Kazanımlar</b><span>Tamamlama sertifikası, sektörel referans mektubu, networking; 2 haftalık seçeneklerde Level 3 yeterlilik + UCAS puanı.</span></div>
        </div>
      </div></section>

      <section className="sec" style={{ paddingTop: 12 }}><div className="wrap" style={{ maxWidth: 920 }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>Paketler & Fiyatlar</div>
        <h2 style={{ marginBottom: 12 }}>2026 paket seçenekleri</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14.5 }}>
            <thead><tr>{['Paket', 'Eğitim Ücreti', 'Konaklamalı'].map((h) => (<th key={h} style={{ padding: '13px 16px', textAlign: 'left', borderBottom: '1px solid var(--line)', color: 'var(--mut2)', fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase' }}>{h}</th>))}</tr></thead>
            <tbody>
              {tiers.map((t) => (
                <tr key={t.label}>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid var(--line)', fontWeight: 600 }}>{t.label}</td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid var(--line)', color: 'var(--gold)', fontWeight: 600 }}>£{t.edu.toLocaleString('tr-TR')}</td>
                  <td style={{ padding: '13px 16px', borderBottom: '1px solid var(--line)', color: 'var(--mut)' }}>£{t.res.toLocaleString('tr-TR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ color: 'var(--mut2)', fontSize: 12.5, marginTop: 10 }}>Konaklamalı paket UCL yurdu + tam pansiyon + sosyal etkinlikleri içerir. Rezervasyon £950 depozito; taksit imkânı. Kesin fiyat ve tarih için danışmanlık al.</p>
      </div></section>

      <section className="sec" style={{ paddingTop: 12 }}><div className="wrap">
        <h2 style={{ marginBottom: 16, fontSize: 22 }}>Her programda neler var?</h2>
        <div className="why">
          <div className="w"><b>Kariyer simülasyonları</b><span>Mesleğin gerçek görevlerini deneyimleten uygulamalı senaryolar ve atölyeler.</span></div>
          <div className="w"><b>Saha ziyaretleri</b><span>İlgili kurum ve kuruluşlara profesyonel ziyaretler.</span></div>
          <div className="w"><b>Uzman mentorlar</b><span>Alanın önde gelen profesyonelleriyle çalışma ve networking.</span></div>
          <div className="w"><b>UCL kampüs deneyimi</b><span>Konaklamalı pakette UCL yurdunda kalma ve sosyal etkinlikler.</span></div>
        </div>
        <p style={{ color: 'var(--mut2)', fontSize: 12.5, marginTop: 14 }}>Program içeriği sağlayıcı (InvestIN) verilerine dayanır; kesin müfredat ve tarihler için ücretsiz danışmanlık al. 18 yaş altı için ebeveyn muvafakati gerekir.</p>
      </div></section>

      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[1] }} />
    </>
  )
}
