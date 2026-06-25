import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import data from './universities.json'
import UniGrid from './UniGrid'

export const metadata: Metadata = {
  title: 'İngiltere Üniversiteleri — Programlar, Ücretler ve Kabul Şartları',
  description: "İngiltere'nin önde gelen üniversiteleri; şehir ve bölüme göre filtrele, ücretleri ve kabul şartlarını incele, AlazEdu ile başvur.",
  alternates: { canonical: 'https://www.alazedu.com/universiteler' },
}

type Uni = { slug: string; name: string; city: string; qs: string; ogr: string; rank: number; img: string; programs: { n: string; f: string }[] }
const unis = ((data as any).universities as Uni[])
const nav = fs.readFileSync(path.join(process.cwd(), 'app', 'partials.html'), 'utf8')

export default function Universiteler() {
  const totalProg = unis.reduce((a, u) => a + u.programs.length, 0)
  const cities = Array.from(new Set(unis.map((u) => u.city))).sort((a, b) => a.localeCompare(b, 'tr'))
  const slim = unis
    .map((u) => ({ slug: u.slug, name: u.name, city: u.city, qs: u.qs, img: u.img, p: u.programs.length, ps: u.programs.map((x) => x.n).join(' · ').toLowerCase() }))
    .sort((a, b) => a.name.localeCompare(b.name, 'tr'))
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
              <div className="eyebrow">Üniversiteler</div>
              <h1 style={{ fontFamily: 'Fraunces,serif', fontWeight: 600, letterSpacing: '-.015em', margin: '16px 0 0' }}>İngiltere Üniversiteleri</h1>
              <div className="ustats">
                <div><b>{cities.length}</b><span>Şehir</span></div>
                <div><b>{totalProg.toLocaleString('tr-TR')}</b><span>Program</span></div>
                <div><b>{unis.length}</b><span>Üniversite</span></div>
              </div>
            </div>
            <div className="uhero-collage">
              <div className="p"><img src="https://picsum.photos/seed/londonbigben/500/700" alt="" /></div>
              <div className="p"><img src="https://picsum.photos/seed/ukbuildingflag/500/340" alt="" /></div>
              <div className="p"><img src="https://picsum.photos/seed/ukstudentsgroup/500/340" alt="" /></div>
            </div>
          </div>
        </div>
      </header>
      <section style={{ padding: '8px 0 10px' }}>
        <div className="wrap" style={{ maxWidth: 880, textAlign: 'center', margin: '0 auto' }}>
          <h2 style={{ marginBottom: 16 }}>İngiltere'de üniversite eğitimi 2026</h2>
          <p style={{ color: 'var(--mut)', fontSize: 16.5, lineHeight: 1.8 }}>
            Birleşik Krallık yükseköğretim sektörü, en dinamik dönemlerinden birini yaşıyor. İngiltere, sadece akademik bir merkez değil; mezuniyet sonrası 2 yıllık <b style={{ color: 'var(--txt)' }}>Graduate Route</b> çalışma hakkı ve küresel yetenek vizeleriyle kariyer odaklı bir fırlatma rampası. Lisans çoğunlukla 3 yıl, yüksek lisans 1 yıldır. Aşağıdan şehir veya bölüme göre filtreleyerek hedefine uygun üniversiteyi bul; ücretsiz danışmanlıkla başvurunu AlazEdu ile tamamla.
          </p>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: 36 }}>
        <div className="wrap" style={{ marginBottom: 8, color: 'var(--mut2)', fontSize: 13 }}>
          <a href="/">Ana Sayfa</a> <span style={{ color: 'var(--gold)' }}>/</span> Üniversiteler <span style={{ color: 'var(--gold)' }}>/</span> <span style={{ color: 'var(--gold)' }}>İngiltere Üniversiteleri</span>
        </div>
        <UniGrid unis={slim} cities={cities} />
      </section>
      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[1] }} />
    </>
  )
}
