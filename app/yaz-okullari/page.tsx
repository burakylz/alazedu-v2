import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import data from './summerschools.json'
import SummerGrid from './SummerGrid'

export const metadata: Metadata = {
  title: 'İngiltere Yaz Okulları 2026 — Kamplar, Yaş Grupları ve Fiyatlar',
  description: "İngiltere'de 2026 yaz okulları ve yaz kampları; yaşa, şehre ve bütçeye göre filtrele. Dil + aktivite, futbol, STEM, sanat ve liderlik kampları. AlazEdu ile ücretsiz danışmanlık.",
  alternates: { canonical: 'https://www.alazedu.com/yaz-okullari' },
}

type S = { slug: string; name: string; provider: string; city: string; photo: string; ageMin: number | null; ageMax: number | null; priceFrom: number; dates: string; src: string }
const schools = (data as any).schools as S[]
const cities = (data as any).cities as string[]
const nav = fs.readFileSync(path.join(process.cwd(), 'app', 'partials.html'), 'utf8')

export default function YazOkullari() {
  const slim = schools.map((s) => ({ slug: s.slug, name: s.name, provider: s.provider, city: s.city, photo: s.photo, ageMin: s.ageMin, ageMax: s.ageMax, priceFrom: s.priceFrom, dates: s.dates, src: s.src }))
  const minAge = Math.min(...schools.map((s) => s.ageMin ?? 99).filter((x) => x < 99))
  return (
    <>
      <style>{`
        .uhero-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:46px;align-items:center}
        .uhero-collage{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:14px;height:340px}
        .uhero-collage .p{position:relative;border-radius:18px;overflow:hidden;border:1px solid var(--line2)}
        .uhero-collage .p:first-child{grid-row:span 2}
        .uhero-collage img{width:100%;height:100%;object-fit:cover}
        .uhero-collage .p::after{content:"";position:absolute;inset:0;background:linear-gradient(160deg,rgba(10,20,38,.1),rgba(10,20,38,.45))}
        .ustats{display:flex;gap:34px;margin-top:26px}
        .ustats b{font-family:Fraunces,serif;font-size:40px;color:var(--gold);display:block;line-height:1}
        .ustats span{font-size:14px;color:var(--mut)}
        .uhero-grid h1{font-size:54px;line-height:1.04}
        @media(max-width:900px){.uhero-grid{grid-template-columns:1fr}.uhero-grid h1{font-size:31px}.uhero-collage{height:230px}.ustats{gap:22px}}
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[0] }} />

      <header style={{ padding: '60px 0 30px' }}>
        <div className="wrap">
          <div className="uhero-grid">
            <div>
              <div className="eyebrow">Yaz Okulları</div>
              <h1 style={{ fontFamily: 'Fraunces,serif', fontWeight: 600, letterSpacing: '-.015em', margin: '16px 0 0' }}>İngiltere Yaz Okulları 2026</h1>
              <div className="ustats">
                <div><b>{schools.length}</b><span>Kamp / program</span></div>
                <div><b>{cities.length}</b><span>Lokasyon</span></div>
                <div><b>{isFinite(minAge) ? minAge : 5}+</b><span>Yaştan itibaren</span></div>
              </div>
            </div>
            <div className="uhero-collage">
              <div className="p"><img src="https://picsum.photos/seed/uksummercamp/500/700" alt="" /></div>
              <div className="p"><img src="https://picsum.photos/seed/studentsactivity/500/340" alt="" /></div>
              <div className="p"><img src="https://picsum.photos/seed/oxfordcollege/500/340" alt="" /></div>
            </div>
          </div>
        </div>
      </header>

      <section style={{ padding: '8px 0 10px' }}>
        <div className="wrap" style={{ maxWidth: 880, textAlign: 'center', margin: '0 auto' }}>
          <h2 style={{ marginBottom: 16 }}>İngiltere'de yaz okulu 2026</h2>
          <p style={{ color: 'var(--mut)', fontSize: 16.5, lineHeight: 1.8 }}>
            Yaz okulları; İngilizce dersini sabah, öğleden sonra spor–sanat–gezi aktivitelerini ve akşam etkinliklerini bir araya getirir. Cambridge, Oxford ve Londra'nın prestijli kolejlerinden sahil kasabalarına; futbol, STEM, sanat, liderlik ve aile programlarına kadar her yaş ve ilgiye uygun seçenek var. Konaklama (yurt veya aile yanı) ve çoğu programda havalimanı transferi dahildir. Aşağıdan <b style={{ color: 'var(--txt)' }}>çocuğun yaşına</b>, şehre veya bütçeye göre filtrele.
          </p>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 36 }}>
        <div className="wrap" style={{ marginBottom: 8, color: 'var(--mut2)', fontSize: 13 }}>
          <a href="/">Ana Sayfa</a> <span style={{ color: 'var(--gold)' }}>/</span> Yaz Okulları <span style={{ color: 'var(--gold)' }}>/</span> <span style={{ color: 'var(--gold)' }}>İngiltere</span>
        </div>
        <SummerGrid schools={slim} cities={cities} />
      </section>

      <section className="sec" style={{ paddingTop: 0 }}><div className="wrap" style={{ maxWidth: 920, margin: '0 auto' }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>Genel bilgiler</div>
        <h2 style={{ marginBottom: 16 }}>Yaz okulu paketinde neler var?</h2>
        <div className="why">
          <div className="w"><b>Dil + Aktivite</b><span>Sabah İngilizce dersi (genelde haftada 15–25 saat), öğleden sonra spor, sanat ve atölyeler.</span></div>
          <div className="w"><b>Konaklama</b><span>Üniversite/kolej yurdu (tek veya paylaşımlı) ya da denetimli aile yanı; çoğu pakette tam pansiyon.</span></div>
          <div className="w"><b>Geziler & etkinlikler</b><span>Tam/yarım günlük turistik geziler ve akşam aktiviteleri (talent show, disko, film gecesi).</span></div>
          <div className="w"><b>Havalimanı transferi</b><span>Çoğu pakette dahil; öğrenci geldiğinde doğrudan okula ulaştırılır. Katılım belgesi verilir.</span></div>
        </div>
        <p style={{ color: 'var(--mut)', fontSize: 15, lineHeight: 1.75, marginTop: 18 }}>
          Vize: 6 aya kadar yaz programları için genellikle <b style={{ color: 'var(--txt)' }}>Standart Ziyaretçi Vizesi</b> yeterlidir; reşit olmayan öğrenciler için ebeveyn muvafakati ve kabul mektubu gerekir. Tüm süreci (kamp seçimi, kayıt, vize, transfer) AlazEdu ücretsiz yönetir.
        </p>
        <p style={{ color: 'var(--mut2)', fontSize: 12.5, marginTop: 12 }}>Fiyatlar ve tarihler 2026 sezonu içindir ve sağlayıcıya göre değişebilir; kesin tutar için ücretsiz danışmanlık al.</p>
      </div></section>

      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[1] }} />
    </>
  )
}
