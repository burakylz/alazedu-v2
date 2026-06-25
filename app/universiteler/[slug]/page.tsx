import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import data from '../universities.json'
import DetailPrograms from './DetailPrograms'

type Prog = { n: string; lvl: string; aw: string; f: string; d: string; ielts: string; fee: number }
type Uni = { slug: string; name: string; city: string; qs: string; ogr: string; rank: number; img: string; ielts: string[]; prior: string[]; programs: Prog[]; about?: string; gb?: string[] }
const unis = (data as any).universities as Uni[]
const LBLS = ['Üniversite Tipi', 'Kuruluş Yılı', 'Eğitim Dili', 'Öğrenci Sayısı', 'Uluslararası Öğrenci', 'Yerleşkeler', 'Dünya Sıralaması']
// Russell Group üyeleri (Foundation şartı yalnızca bunlarda geçerli)
const RUSSELL = new Set([
  'queen-mary-university-of-london', 'university-of-manchester', 'university-of-nottingham',
  'university-of-exeter', 'university-of-warwick', 'university-of-edinburgh', 'university-of-birmingham',
  'university-of-bristol', 'university-of-sheffield', 'university-of-glasgow', 'university-of-southampton',
  'durham-university', 'university-of-leeds', 'university-of-liverpool', 'university-of-york', 'newcastle-university',
])
const nav = fs.readFileSync(path.join(process.cwd(), 'app', 'partials.html'), 'utf8')

export function generateStaticParams() { return unis.map((u) => ({ slug: u.slug })) }

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const u = unis.find((x) => x.slug === params.slug)
  if (!u) return { title: 'Üniversite Bulunamadı' }
  return {
    title: `${u.name} — ${u.programs.length} Program, Ücretler ve Kabul Şartları`,
    description: `${u.name} (${u.city}, İngiltere) lisans programları, yıllık ücretleri, Foundation ve kabul şartları. AlazEdu danışmanlığıyla başvur.`,
    alternates: { canonical: `https://www.alazedu.com/universiteler/${u.slug}` },
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  const u = unis.find((x) => x.slug === params.slug)
  if (!u) notFound()
  const minFee = Math.min(...u.programs.map((p) => p.fee).filter((x) => x > 0))
  const ini = u.name.replace(/^(The )?University of /, '').slice(0, 2).toUpperCase()
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[0] }} />
      <header style={{ padding: '48px 0 34px', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <div style={{ color: 'var(--mut2)', fontSize: 13, marginBottom: 20 }}>
            <Link href="/">Ana Sayfa</Link> <span style={{ color: 'var(--gold)' }}>›</span> <Link href="/universiteler">Üniversiteler</Link> <span style={{ color: 'var(--gold)' }}>›</span> {u.name}
          </div>
          <div style={{ display: 'flex', gap: 26, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ width: 104, height: 104, borderRadius: 18, background: '#f3f1ea', display: 'grid', placeItems: 'center', flexShrink: 0, padding: 14 }}>
              {u.img ? <img src={u.img} alt={u.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} /> : <span style={{ fontFamily: 'Fraunces,serif', fontSize: 32, fontWeight: 600, color: '#0a1426' }}>{ini}</span>}
            </div>
            <div>
              <h1 style={{ fontFamily: 'Fraunces,serif', fontWeight: 600, fontSize: 42, lineHeight: 1.08, letterSpacing: '-.01em' }}>{u.name}</h1>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 12, color: 'var(--mut)', fontSize: 15 }}>
                <span>📍 {u.city}, İngiltere</span>
                {u.qs !== '—' && <span>🏆 QS <b style={{ color: 'var(--txt)' }}>#{u.qs}</b></span>}
                <span>🎓 <b style={{ color: 'var(--txt)' }}>{u.programs.length}</b> program</span>
                {isFinite(minFee) && <span>💷 <b style={{ color: 'var(--gold)' }}>£{minFee.toLocaleString('tr-TR')}</b>'den/yıl</span>}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 26 }}>
            <button className="btn-gold">Başvuru Danışmanlığı Al</button>
            <Link href="/universiteler"><button className="btn-ghost">← Tüm Üniversiteler</button></Link>
          </div>
        </div>
      </header>

      {(u.about || (u.gb && u.gb.length > 0)) && (
        <section className="sec" style={{ paddingTop: 50, paddingBottom: 0 }}><div className="wrap">
          <div className="eyebrow" style={{ marginBottom: 8 }}>Üniversite Hakkında</div>
          <h2 style={{ marginBottom: 14 }}>{u.name}</h2>
          {u.about && <p style={{ color: 'var(--mut)', fontSize: 16, lineHeight: 1.8, maxWidth: 900 }}>{u.about}</p>}
          {u.gb && u.gb.length > 0 && (
            <>
              <h3 style={{ fontSize: 19, margin: u.about ? '32px 0 16px' : '4px 0 16px', fontFamily: 'Fraunces,serif', fontWeight: 600 }}>Genel bilgiler</h3>
              <div className="why">
                {u.gb.map((g, i) => {
                  const lbl = LBLS.find((l) => g.startsWith(l))
                  const val = lbl ? g.slice(lbl.length).trim() : g
                  return (<div className="w" key={i}><b>{lbl || 'Bilgi'}</b><span>{val || g}</span></div>)
                })}
              </div>
            </>
          )}
        </div></section>
      )}

      <section className="sec" style={{ paddingTop: 50, paddingBottom: 0 }}>
        <div className="wrap">
          {RUSSELL.has(u.slug) ? (
            <div style={{ background: 'var(--gold-soft)', border: '1px solid rgba(216,180,99,.3)', borderRadius: 16, padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 24 }}>
              <span style={{ fontSize: 22 }}>🎓</span>
              <div>
                <b style={{ fontSize: 16 }}>Türk lise diplomasıyla başvuru — Foundation gerekli mi?</b>
                <p style={{ color: 'var(--mut)', fontSize: 14.5, marginTop: 6 }}>{u.name} bir <b style={{ color: 'var(--txt)' }}>Russell Group</b> üniversitesidir. Türk lise diplomasıyla çoğu lisans programına doğrudan giriş için genellikle <b style={{ color: 'var(--txt)' }}>1 yıllık Foundation (hazırlık) yılı</b> gerekir. {u.slug === 'university-of-exeter' ? <>Exeter’de IB veya A-Level diplomanız olsa dahi Foundation istenebilir; durumunuzu birlikte değerlendirelim.</> : <><b style={{ color: 'var(--txt)' }}>IB veya A-Level (AP)</b> diplomanız varsa doğrudan giriş mümkündür.</>}</p>
              </div>
            </div>
          ) : (
            <div style={{ background: 'rgba(74,201,126,.10)', border: '1px solid rgba(74,201,126,.32)', borderRadius: 16, padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 24 }}>
              <span style={{ fontSize: 22 }}>✅</span>
              <div>
                <b style={{ fontSize: 16 }}>Türk lise diplomasıyla doğrudan başvuru</b>
                <p style={{ color: 'var(--mut)', fontSize: 14.5, marginTop: 6 }}>{u.name} Russell Group dışındadır; bu üniversiteye Türk lise diplomasıyla çoğu lisans programına <b style={{ color: 'var(--txt)' }}>Foundation olmadan doğrudan</b> başvurabilirsiniz (program ve not şartlarına göre). IB veya A-Level diplomanız varsa ek avantaj sağlar. Uygunluğunuzu birlikte değerlendirelim.</p>
              </div>
            </div>
          )}
          <div className="why">
            <div className="w"><b>İngilizce (IELTS)</b><span>{u.ielts[0] ? u.ielts.join(' · ') : 'Programa göre IELTS 6.0–7.0'}</span></div>
            <div className="w"><b>Başvuru Dönemi</b><span>Eylül 2026 girişi · başvurular yaz aylarında kapanır</span></div>
            <div className="w"><b>Gerekli Belgeler</b><span>CV, pasaport & kimlik, lise diploması + transkript (yeminli tercüme), SOP, en az 1 akademik referans, varsa IELTS</span></div>
            <div className="w"><b>Süreç</b><span>Belge → başvuru → ön kabul → vize → konaklama; tümünü AlazEdu yönetir</span></div>
          </div>
        </div>
      </section>

      <section className="sec"><div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 8 }}>Programlar</div>
        <h2 style={{ marginBottom: 24 }}>Bölümler & ücretler</h2>
        <DetailPrograms programs={u.programs} />
        <p style={{ color: 'var(--mut2)', fontSize: 13, marginTop: 8 }}>Ücretler 2026 girişi uluslararası öğrenci tahminleridir; kesin tutar ve şartlar için ücretsiz danışmanlık al.</p>
      </div></section>
      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[1] }} />
    </>
  )
}
