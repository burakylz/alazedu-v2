import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import data from './languageschools.json'
import SchoolGrid from './SchoolGrid'

export const metadata: Metadata = {
  title: 'İngiltere Dil Okulları — 2026 Fiyatları, Şehirler ve Kabul Şartları',
  description: "İngiltere'deki British Council akrediteli dil okulları; şehir ve bütçeye göre filtrele, 2026 fiyatlarını ve konaklama seçeneklerini incele, AlazEdu ile ücretsiz danışmanlık al.",
  alternates: { canonical: 'https://www.alazedu.com/dil-okullari' },
}

type School = { slug: string; name: string; city: string; logo: string; photo: string; priceWk: number; minAge: number | null; avgClass: string | null; cap: number | null }
const schools = (data as any).schools as School[]
const cities = (data as any).cities as string[]
const nav = fs.readFileSync(path.join(process.cwd(), 'app', 'partials.html'), 'utf8')

const priceTable: [string, string, string, string, string][] = [
  ['Londra', '1.100 – 1.500', '2.800 – 3.800', '5.200 – 6.500', '1.000 – 1.400'],
  ['Oxford', '1.000 – 1.300', '2.600 – 3.400', '4.800 – 6.000', '900 – 1.200'],
  ['Brighton', '900 – 1.200', '2.400 – 3.100', '4.400 – 5.500', '800 – 1.100'],
  ['Bournemouth', '800 – 1.000', '2.100 – 2.800', '4.000 – 4.800', '700 – 950'],
]

export default function DilOkullari() {
  const slim = schools.map((s) => ({ slug: s.slug, name: s.name, city: s.city, logo: s.logo, photo: s.photo, priceWk: s.priceWk, minAge: s.minAge, avgClass: s.avgClass, cap: s.cap }))
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
        .ptable td:first-child{font-weight:600}
        .ptable td{color:var(--mut)}
        .uhero-grid h1{font-size:54px;line-height:1.04}
        .infogrid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:8px}
        @media(max-width:900px){.uhero-grid{grid-template-columns:1fr}.uhero-grid h1{font-size:31px}.uhero-collage{height:230px}.ustats{gap:22px}.infogrid{grid-template-columns:1fr}}
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[0] }} />

      <header style={{ padding: '60px 0 30px' }}>
        <div className="wrap">
          <div className="uhero-grid">
            <div>
              <div className="eyebrow">Dil Okulları</div>
              <h1 style={{ fontFamily: 'Fraunces,serif', fontWeight: 600, letterSpacing: '-.015em', margin: '16px 0 0' }}>İngiltere Dil Okulları</h1>
              <div className="ustats">
                <div><b>{schools.length}</b><span>Okul</span></div>
                <div><b>{cities.length}</b><span>Şehir</span></div>
                <div><b>£195</b><span>Haftalık başlangıç</span></div>
              </div>
            </div>
            <div className="uhero-collage">
              <div className="p"><img src="https://picsum.photos/seed/londonstreetuk/500/700" alt="" /></div>
              <div className="p"><img src="https://picsum.photos/seed/englishclassroom/500/340" alt="" /></div>
              <div className="p"><img src="https://picsum.photos/seed/ukseasidetown/500/340" alt="" /></div>
            </div>
          </div>
        </div>
      </header>

      <section style={{ padding: '8px 0 10px' }}>
        <div className="wrap" style={{ maxWidth: 880, textAlign: 'center', margin: '0 auto' }}>
          <h2 style={{ marginBottom: 16 }}>İngiltere'de dil eğitimi 2026</h2>
          <p style={{ color: 'var(--mut)', fontSize: 16.5, lineHeight: 1.8 }}>
            İngiltere, İngilizcenin anavatanı olması ve British Council denetimindeki yüksek eğitim standartlarıyla dil eğitiminin merkezidir. Genel İngilizce'den IELTS hazırlığına, iş İngilizcesinden akademik döneme kadar geniş bir program yelpazesi; haftada 15 saatlik standart kurslardan 30 saatlik yoğun programlara uzanan esnek seçenekler sunar. Aşağıdan şehir veya bütçeye göre filtreleyerek sana uygun okulu bul, AlazEdu ile ücretsiz danışmanlık alarak başvurunu tamamla.
          </p>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 36 }}>
        <div className="wrap" style={{ marginBottom: 8, color: 'var(--mut2)', fontSize: 13 }}>
          <a href="/">Ana Sayfa</a> <span style={{ color: 'var(--gold)' }}>/</span> Dil Okulları <span style={{ color: 'var(--gold)' }}>/</span> <span style={{ color: 'var(--gold)' }}>İngiltere</span>
        </div>
        <SchoolGrid schools={slim} cities={cities} />
      </section>

      <section className="sec"><div className="wrap" style={{ maxWidth: 920, margin: '0 auto' }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>Fiyatlar</div>
        <h2 style={{ marginBottom: 6 }}>İngiltere dil okulu 2026 fiyatları</h2>
        <p style={{ color: 'var(--mut)', fontSize: 15.5, lineHeight: 1.75 }}>Fiyatlar; seçilen okula, haftalık ders yoğunluğuna ve şehre göre değişir. Eğitim süresi uzadıkça haftalık birim maliyet düşer. Aşağıdaki tutarlar 2026 girişi için tahminîdir (GBP); kesin fiyat için ücretsiz danışmanlık al.</p>
        <div style={{ overflowX: 'auto' }}>
          <table className="ptable">
            <thead><tr><th>Şehir</th><th>4 Hafta</th><th>12 Hafta</th><th>24 Hafta</th><th>Aylık Konaklama</th></tr></thead>
            <tbody>
              {priceTable.map((r) => (<tr key={r[0]}><td>{r[0]}</td><td>£{r[1]}</td><td>£{r[2]}</td><td>£{r[3]}</td><td>£{r[4]}</td></tr>))}
            </tbody>
          </table>
        </div>
        <p style={{ color: 'var(--mut2)', fontSize: 12.5, marginTop: 10 }}>Tutarlar yalnızca eğitim ücretini (konaklama sütunu hariç) gösterir; sınav, kayıt ve materyal ücretleri okula göre değişebilir.</p>
      </div></section>

      <section className="sec" style={{ paddingTop: 0 }}><div className="wrap" style={{ maxWidth: 920, margin: '0 auto' }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>Konaklama</div>
        <h2 style={{ marginBottom: 16 }}>Konaklama seçenekleri</h2>
        <div className="infogrid">
          <div className="why"><div className="w"><b>Aile Yanı (Homestay)</b><span>Okul tarafından denetlenen yerel ailelerin yanında tek/çift kişilik oda. Genelde yarım pansiyon (kahvaltı + akşam yemeği) dahildir; günlük İngilizce pratiği için en ekonomik seçenek.</span></div></div>
          <div className="why"><div className="w"><b>Öğrenci Yurdu (Residence)</b><span>Genelde 18+ öğrenciler için, özel banyolu (en-suite) odalar ve ortak mutfak. Faturalar dahildir; aile yanına göre ortalama %20–40 daha yüksek, daha bağımsız bir yaşam sunar.</span></div></div>
        </div>
      </div></section>

      <section className="sec" style={{ paddingTop: 0 }}><div className="wrap" style={{ maxWidth: 920, margin: '0 auto' }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>Vize</div>
        <h2 style={{ marginBottom: 16 }}>İngiltere dil okulu vizesi</h2>
        <div className="infogrid">
          <div className="why"><div className="w"><b>Standart Ziyaretçi Vizesi</b><span>6 aya (24 hafta) kadar dil eğitimleri için uygundur. Yalnızca eğitim alınır, çalışma izni yoktur.</span></div></div>
          <div className="why"><div className="w"><b>Kısa Süreli Öğrenci Vizesi</b><span>6–11 ay arası dil programları için gereklidir; sadece İngilizce eğitimi alan öğrencilere verilir.</span></div></div>
        </div>
        <p style={{ color: 'var(--mut)', fontSize: 15, lineHeight: 1.75, marginTop: 18 }}>Gerekli temel evraklar: akredite okuldan alınan <b style={{ color: 'var(--txt)' }}>kabul mektubu</b>, eğitim ve yaşam masraflarını gösteren <b style={{ color: 'var(--txt)' }}>banka dökümleri</b> (son 3–6 ay) ve <b style={{ color: 'var(--txt)' }}>niyet mektubu</b>. Vize süreci genellikle 3–4 haftadır. Tüm süreci AlazEdu yönetir.</p>
      </div></section>

      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[1] }} />
    </>
  )
}
