import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import data from '../languageschools.json'

type Prog = { n: string; ders: number; saat: string }
type School = {
  slug: string; name: string; city: string; domain: string; logo: string
  cap: number | null; avgClass: string | null; avgAge: number | null; minAge: number | null
  lesson: number | null; uni: boolean; airport: string | null; fac: string[]; prog: Prog[]; priceWk: number
}
const schools = (data as any).schools as School[]
const nav = fs.readFileSync(path.join(process.cwd(), 'app', 'partials.html'), 'utf8')

const cityPrice: Record<string, [string, string, string]> = {
  Londra: ['1.100 – 1.500', '2.800 – 3.800', '5.200 – 6.500'],
  Oxford: ['1.000 – 1.300', '2.600 – 3.400', '4.800 – 6.000'],
  Brighton: ['900 – 1.200', '2.400 – 3.100', '4.400 – 5.500'],
  Bournemouth: ['800 – 1.000', '2.100 – 2.800', '4.000 – 4.800'],
}
function est(wk: number) {
  const r = (n: number) => Math.round(n / 50) * 50
  return [`${r(wk * 4 * 0.95).toLocaleString('tr-TR')} – ${r(wk * 4 * 1.25).toLocaleString('tr-TR')}`,
  `${r(wk * 12 * 0.85).toLocaleString('tr-TR')} – ${r(wk * 12 * 1.1).toLocaleString('tr-TR')}`,
  `${r(wk * 24 * 0.78).toLocaleString('tr-TR')} – ${r(wk * 24 * 0.98).toLocaleString('tr-TR')}`] as [string, string, string]
}

export function generateStaticParams() { return schools.map((s) => ({ slug: s.slug })) }

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = schools.find((x) => x.slug === params.slug)
  if (!s) return { title: 'Dil Okulu Bulunamadı' }
  return {
    title: `${s.name} — ${s.city} Dil Okulu, 2026 Fiyatları ve Kurslar`,
    description: `${s.name} (${s.city}, İngiltere) dil okulu: kurslar, haftalık ücretler, konaklama ve kabul şartları. AlazEdu ile ücretsiz danışmanlık.`,
    alternates: { canonical: `https://www.alazedu.com/dil-okullari/${s.slug}` },
  }
}

const defaultCourses: Prog[] = [
  { n: 'Genel İngilizce', ders: 20, saat: '15' },
  { n: 'Yoğun İngilizce', ders: 30, saat: '22.5' },
  { n: 'IELTS Hazırlık', ders: 20, saat: '15' },
  { n: 'İş İngilizcesi', ders: 30, saat: '22.5' },
]

export default function Page({ params }: { params: { slug: string } }) {
  const s = schools.find((x) => x.slug === params.slug)
  if (!s) notFound()
  const ini = s.name.replace(/[^A-Za-zÇĞİÖŞÜ ]/g, '').trim().split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
  const courses = s.prog.length ? s.prog : defaultCourses
  const pr = cityPrice[s.city] || est(s.priceWk)
  const facts: [string, string][] = [
    ['Şehir', `${s.city}, İngiltere`],
    s.cap ? ['Öğrenci Kapasitesi', `${s.cap}`] : null,
    s.avgClass ? ['Sınıf Mevcudu (ort.)', `${s.avgClass} öğrenci`] : null,
    s.avgAge ? ['Yaş Ortalaması', `${s.avgAge}`] : null,
    s.minAge ? ['Minimum Yaş', `${s.minAge}`] : null,
    s.lesson ? ['Ders Süresi', `${s.lesson} dk`] : null,
    s.airport ? ['En Yakın Havaalanı', s.airport] : null,
    ['Üniversite Yerleştirme', s.uni ? 'Var' : 'Talep üzerine'],
  ].filter(Boolean) as [string, string][]

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[0] }} />
      <header style={{ padding: '48px 0 34px', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <div style={{ color: 'var(--mut2)', fontSize: 13, marginBottom: 20 }}>
            <Link href="/">Ana Sayfa</Link> <span style={{ color: 'var(--gold)' }}>›</span> <Link href="/dil-okullari">Dil Okulları</Link> <span style={{ color: 'var(--gold)' }}>›</span> {s.name}
          </div>
          <div style={{ display: 'flex', gap: 26, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ width: 104, height: 104, borderRadius: 18, background: '#f3f1ea', display: 'grid', placeItems: 'center', flexShrink: 0, padding: 16 }}>
              {s.logo ? <img src={s.logo} alt={s.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} /> : <span style={{ fontFamily: 'Fraunces,serif', fontSize: 30, fontWeight: 600, color: '#0a1426' }}>{ini}</span>}
            </div>
            <div>
              <h1 style={{ fontFamily: 'Fraunces,serif', fontWeight: 600, fontSize: 40, lineHeight: 1.08, letterSpacing: '-.01em' }}>{s.name}</h1>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 12, color: 'var(--mut)', fontSize: 15 }}>
                <span>📍 {s.city}, İngiltere</span>
                {s.minAge && <span>🎂 Min <b style={{ color: 'var(--txt)' }}>{s.minAge}</b> yaş</span>}
                {s.avgClass && <span>👥 Sınıf <b style={{ color: 'var(--txt)' }}>{s.avgClass}</b></span>}
                <span>💷 <b style={{ color: 'var(--gold)' }}>£{s.priceWk}</b>/hafta'dan</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 26 }}>
            <button className="btn-gold">Ücretsiz Danışmanlık Al</button>
            <Link href="/dil-okullari"><button className="btn-ghost">← Tüm Dil Okulları</button></Link>
          </div>
        </div>
      </header>

      <section className="sec" style={{ paddingTop: 50, paddingBottom: 0 }}><div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 8 }}>Okul Hakkında</div>
        <h2 style={{ marginBottom: 14 }}>Genel bakış</h2>
        <p style={{ color: 'var(--mut)', fontSize: 16, lineHeight: 1.8, maxWidth: 880 }}>
          {s.name}, {s.city} şehrinde yer alan, uluslararası öğrencilere İngilizce eğitimi sunan akredite bir dil okuludur.
          {s.cap ? ` Yaklaşık ${s.cap} öğrenci kapasitesine sahip okulda` : ' Okulda'} dersler{s.avgClass ? ` ortalama ${s.avgClass} kişilik sınıflarda` : ''} {s.lesson ? `${s.lesson} dakikalık ders saatleriyle` : ''} işlenir.
          Genel İngilizce, yoğun programlar, IELTS hazırlık ve iş İngilizcesi gibi kurslarla her seviye ve hedefe uygun seçenekler sunulur.
          {s.uni ? ' Okul ayrıca üniversite yerleştirme desteği de sağlar.' : ''} AlazEdu, bu okula başvurudan vizeye ve konaklamaya kadar tüm süreci ücretsiz yönetir.
        </p>
      </div></section>

      <section className="sec" style={{ paddingTop: 36 }}><div className="wrap">
        <h2 style={{ marginBottom: 18, fontSize: 22 }}>Genel bilgiler</h2>
        <div className="why">
          {facts.map(([k, v]) => (<div className="w" key={k}><b>{k}</b><span>{v}</span></div>))}
        </div>
        {s.fac.length > 0 && (
          <div style={{ marginTop: 26 }}>
            <h3 style={{ fontSize: 16, marginBottom: 12 }}>Okul imkanları</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {s.fac.map((f) => (<span key={f} style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 999, padding: '7px 15px', fontSize: 13.5, color: 'var(--mut)' }}>✓ {f}</span>))}
            </div>
          </div>
        )}
      </div></section>

      <section className="sec" style={{ paddingTop: 12 }}><div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 8 }}>Kurslar</div>
        <h2 style={{ marginBottom: 20 }}>Sunulan programlar</h2>
        <div style={{ display: 'grid', gap: 10 }}>
          {courses.map((c, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center', background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 12, padding: '15px 18px' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{c.n}</div>
                <div style={{ color: 'var(--mut2)', fontSize: 13, marginTop: 3 }}>Haftalık {c.ders} ders · {c.saat} saat</div>
              </div>
              <div style={{ color: 'var(--gold)', fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap' }}>£{s.priceWk}/hafta'dan</div>
            </div>
          ))}
        </div>
        {!s.prog.length && <p style={{ color: 'var(--mut2)', fontSize: 12.5, marginTop: 10 }}>Programlar okulun standart kurs yelpazesine göre listelenmiştir; güncel ders saatleri ve başlangıç tarihleri için danışmanlık al.</p>}
      </div></section>

      <section className="sec" style={{ paddingTop: 12 }}><div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 8 }}>Fiyatlar</div>
        <h2 style={{ marginBottom: 16 }}>{s.city} tahmini eğitim ücretleri (2026)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, maxWidth: 640 }}>
          {[['4 Hafta', pr[0]], ['12 Hafta', pr[1]], ['24 Hafta', pr[2]]].map(([k, v]) => (
            <div key={k} style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 14, padding: '18px 16px', textAlign: 'center' }}>
              <div style={{ color: 'var(--mut2)', fontSize: 12.5, letterSpacing: '.06em', textTransform: 'uppercase' }}>{k}</div>
              <div style={{ fontFamily: 'Fraunces,serif', fontSize: 22, color: 'var(--gold)', marginTop: 8 }}>£{v}</div>
            </div>
          ))}
        </div>
        <p style={{ color: 'var(--mut2)', fontSize: 12.5, marginTop: 12 }}>Tutarlar yalnızca eğitim ücreti içindir (konaklama hariç) ve 2026 girişi için tahminîdir. Kesin fiyat için ücretsiz danışmanlık al.</p>
      </div></section>

      <section className="sec" style={{ paddingTop: 12 }}><div className="wrap">
        <h2 style={{ marginBottom: 16, fontSize: 22 }}>Konaklama & vize</h2>
        <div className="why">
          <div className="w"><b>Aile Yanı (Homestay)</b><span>Denetimli yerel ailelerin yanında, genelde yarım pansiyon dahil; ekonomik ve günlük pratik için ideal.</span></div>
          <div className="w"><b>Öğrenci Yurdu</b><span>Özel banyolu odalar ve ortak mutfak; faturalar dahil, daha bağımsız (genelde 18+).</span></div>
          <div className="w"><b>Vize</b><span>6 aya kadar Standart Ziyaretçi Vizesi; 6–11 ay için Kısa Süreli Öğrenci Vizesi. Kabul mektubu + banka dökümü gerekir.</span></div>
          <div className="w"><b>Süreç</b><span>Danışmanlık → okul & kurs seçimi → kayıt & kabul mektubu → vize → konaklama. Tümünü AlazEdu yönetir.</span></div>
        </div>
      </div></section>

      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[1] }} />
    </>
  )
}
