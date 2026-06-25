import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import data from './internships.json'
import InternGrid from './InternGrid'

export const metadata: Metadata = {
  title: 'Lise Staj & Yaz Kariyer Programları 2026 — Londra (InvestIN)',
  description: "Lise öğrencileri için Londra'da meslek deneyimi programları: tıp, hukuk, mühendislik, yatırım bankacılığı, yazılım ve daha fazlası. 15–18 yaş, UCL Kampüsü. AlazEdu ile ücretsiz danışmanlık.",
  alternates: { canonical: 'https://www.alazedu.com/lise-staj' },
}

type P = { slug: string; title: string; field: string; category: string; city: string; photo: string; ageMin: number; ageMax: number; priceFrom: number; dates: string }
const programs = (data as any).programs as P[]
const categories = (data as any).categories as string[]
const tiers = (data as any).tiers as { label: string; edu: number; res: number }[]
const nav = fs.readFileSync(path.join(process.cwd(), 'app', 'partials.html'), 'utf8')

export default function LiseStaj() {
  const slim = programs.map((p) => ({ slug: p.slug, title: p.title, field: p.field, category: p.category, city: p.city, photo: p.photo, ageMin: p.ageMin, ageMax: p.ageMax, priceFrom: p.priceFrom, dates: p.dates }))
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
        .ptable{width:100%;border-collapse:collapse;font-size:14.5px;margin-top:18px}
        .ptable th,.ptable td{padding:13px 16px;text-align:left;border-bottom:1px solid var(--line)}
        .ptable th{color:var(--mut2);font-size:12px;letter-spacing:.08em;text-transform:uppercase;font-weight:700}
        .ptable td:first-child{font-weight:600}.ptable td{color:var(--mut)}
        @media(max-width:760px){.uhero-grid{grid-template-columns:1fr}.uhero-collage{height:240px}}
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[0] }} />

      <header style={{ padding: '60px 0 30px' }}>
        <div className="wrap">
          <div className="uhero-grid">
            <div>
              <div className="eyebrow">Lise Staj & Kariyer</div>
              <h1 style={{ fontFamily: 'Fraunces,serif', fontWeight: 600, fontSize: 50, lineHeight: 1.05, letterSpacing: '-.015em', margin: '16px 0 0' }}>Lise Staj Yaz Programları 2026</h1>
              <div className="ustats">
                <div><b>{programs.length}</b><span>Kariyer alanı</span></div>
                <div><b>{categories.length}</b><span>Kategori</span></div>
                <div><b>15–18</b><span>Yaş</span></div>
              </div>
            </div>
            <div className="uhero-collage">
              <div className="p"><img src="https://picsum.photos/seed/londoncareer/500/700" alt="" /></div>
              <div className="p"><img src="https://picsum.photos/seed/uclstudents/500/340" alt="" /></div>
              <div className="p"><img src="https://picsum.photos/seed/internshiplab/500/340" alt="" /></div>
            </div>
          </div>
        </div>
      </header>

      <section style={{ padding: '8px 0 10px' }}>
        <div className="wrap" style={{ maxWidth: 880, textAlign: 'center', margin: '0 auto' }}>
          <h2 style={{ marginBottom: 16 }}>Lise öğrencileri için meslek deneyimi</h2>
          <p style={{ color: 'var(--mut)', fontSize: 16.5, lineHeight: 1.8 }}>
            <b style={{ color: 'var(--txt)' }}>InvestIN Yaz Deneyimi</b> programları, 15–18 yaş lise öğrencilerinin bir mesleği <b style={{ color: 'var(--txt)' }}>çalışmadan önce</b> deneyimlemesini sağlar. Londra UCL Kampüsü'nde, alanında uzman profesyonellerle kapsayıcı kariyer simülasyonları, saha ziyaretleri ve uygulamalı atölyeler yapılır. Programlar üniversite başvurusunu güçlendirir; sertifika, sektörel referans mektubu ve (2 hafta seçeneklerinde) <b style={{ color: 'var(--txt)' }}>Level 3 yeterlilik + UCAS puanı</b> kazandırır. Aşağıdan alana göre filtrele.
          </p>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 36 }}>
        <div className="wrap" style={{ marginBottom: 8, color: 'var(--mut2)', fontSize: 13 }}>
          <a href="/">Ana Sayfa</a> <span style={{ color: 'var(--gold)' }}>/</span> Lise Staj <span style={{ color: 'var(--gold)' }}>/</span> <span style={{ color: 'var(--gold)' }}>InvestIN Yaz Deneyimi</span>
        </div>
        <InternGrid programs={slim} categories={categories} />
      </section>

      <section className="sec"><div className="wrap" style={{ maxWidth: 920, margin: '0 auto' }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>Paketler & Fiyatlar</div>
        <h2 style={{ marginBottom: 6 }}>Program paketleri (2026)</h2>
        <p style={{ color: 'var(--mut)', fontSize: 15.5, lineHeight: 1.75 }}>Tüm kariyer alanlarında paketler ortaktır. Konaklamalı paket UCL yurdunda kalmayı, sosyal/kültürel etkinlikleri ve tam pansiyonu içerir. Rezervasyon için £950 depozito; taksitli ödeme imkânı mevcuttur.</p>
        <div style={{ overflowX: 'auto' }}>
          <table className="ptable">
            <thead><tr><th>Paket</th><th>Eğitim Ücreti</th><th>Konaklamalı</th></tr></thead>
            <tbody>
              {tiers.map((t) => (<tr key={t.label}><td>{t.label}</td><td>£{t.edu.toLocaleString('tr-TR')}</td><td>£{t.res.toLocaleString('tr-TR')}</td></tr>))}
            </tbody>
          </table>
        </div>
        <p style={{ color: 'var(--mut2)', fontSize: 12.5, marginTop: 10 }}>Fiyatlar 2026 sezonu içindir; kesin tutar, tarih ve müsaitlik için ücretsiz danışmanlık al.</p>
      </div></section>

      <section className="sec" style={{ paddingTop: 0 }}><div className="wrap" style={{ maxWidth: 920, margin: '0 auto' }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>Neler dahil?</div>
        <h2 style={{ marginBottom: 16 }}>Her programda</h2>
        <div className="why">
          <div className="w"><b>Kariyer simülasyonları</b><span>Mesleğin gerçek görevlerini birebir deneyimleten uygulamalı senaryolar.</span></div>
          <div className="w"><b>Uzman mentorlar</b><span>Alanında önde gelen profesyonellerle çalışma ve networking fırsatı.</span></div>
          <div className="w"><b>Sertifika & referans</b><span>Kişiye özel tamamlama sertifikası ve sektörel referans mektubu.</span></div>
          <div className="w"><b>UCAS avantajı</b><span>2 haftalık seçeneklerde Level 3 yeterlilik ve UCAS puanı; üniversite başvurusunda güçlü dosya.</span></div>
        </div>
        <p style={{ color: 'var(--mut)', fontSize: 15, lineHeight: 1.75, marginTop: 18 }}>Vize: 18 yaş altı öğrenciler için ebeveyn muvafakati ve kabul mektubu gerekir; kısa süreli programlar için genellikle Standart Ziyaretçi Vizesi yeterlidir. Başvuru, vize ve konaklama dahil tüm süreci AlazEdu ücretsiz yönetir.</p>
      </div></section>

      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[1] }} />
    </>
  )
}
