import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import data from '../universities.json'

type Prog = { n: string; lvl: string; aw: string; f: string; d: string; ielts: string; fee: number }
type Uni = { slug: string; name: string; city: string; qs: string; ogr: string; rank: number; ielts: string[]; prior: string[]; programs: Prog[] }
const unis = (data as any).universities as Uni[]
const nav = fs.readFileSync(path.join(process.cwd(), 'app', 'partials.html'), 'utf8')

export function generateStaticParams() {
  return unis.map((u) => ({ slug: u.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const u = unis.find((x) => x.slug === params.slug)
  if (!u) return { title: 'Üniversite Bulunamadı' }
  return {
    title: `${u.name} — ${u.programs.length} Program, Ücretler ve Kabul Şartları`,
    description: `${u.name} (${u.city}, İngiltere) lisans programları, yıllık ücretleri ve kabul şartları. AlazEdu danışmanlığıyla başvur.`,
    alternates: { canonical: `https://www.alazedu.com/universiteler/${u.slug}` },
  }
}

function fee(n: number) { return n > 0 ? '£' + n.toLocaleString('tr-TR') + '/yıl' : 'Bilgi için sor' }

export default function Page({ params }: { params: { slug: string } }) {
  const u = unis.find((x) => x.slug === params.slug)
  if (!u) notFound()
  const fields: Record<string, Prog[]> = {}
  for (const p of u.programs) { const k = p.f || 'Diğer'; (fields[k] = fields[k] || []).push(p) }
  const fieldNames = Object.keys(fields).sort()
  const minFee = Math.min(...u.programs.map((p) => p.fee).filter((x) => x > 0))
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[0] }} />
      <header style={{ padding: '54px 0 30px', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <div style={{ color: 'var(--mut2)', fontSize: 13, marginBottom: 16 }}>
            <Link href="/">Ana Sayfa</Link> <span style={{ color: 'var(--gold)' }}>›</span> <Link href="/universiteler">Üniversiteler</Link> <span style={{ color: 'var(--gold)' }}>›</span> {u.name}
          </div>
          <h1 style={{ fontFamily: 'Fraunces,serif', fontWeight: 600, fontSize: 46, lineHeight: 1.08, letterSpacing: '-.01em' }}>{u.name}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 22, margin: '20px 0 6px', color: 'var(--mut)', fontSize: 15 }}>
            <span>📍 {u.city}, İngiltere</span>
            {u.qs !== '—' && <span>🏆 QS Dünya Sıralaması <b style={{ color: 'var(--txt)' }}>#{u.qs}</b></span>}
            <span>🎓 <b style={{ color: 'var(--txt)' }}>{u.programs.length}</b> program</span>
            {u.ogr && <span>👥 <b style={{ color: 'var(--txt)' }}>{u.ogr}</b> Türk öğrenci</span>}
            {isFinite(minFee) && <span>💷 <b style={{ color: 'var(--gold)' }}>£{minFee.toLocaleString('tr-TR')}</b>'den başlayan yıllık ücret</span>}
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 26 }}>
            <button className="btn-gold">Başvuru Danışmanlığı Al</button>
            <Link href="/universiteler"><button className="btn-ghost">← Tüm Üniversiteler</button></Link>
          </div>
        </div>
      </header>

      {(u.ielts.length > 0 || u.prior.length > 0) && (
        <section className="sec" style={{ paddingTop: 56, paddingBottom: 0 }}>
          <div className="wrap">
            <div className="eyebrow" style={{ marginBottom: 18 }}>Kabul Şartları</div>
            <div className="why">
              {u.prior[0] && <div className="w"><b>Akademik Şart</b><span>{u.prior[0]}</span></div>}
              {u.ielts[0] && <div className="w"><b>İngilizce (IELTS)</b><span>{u.ielts.join(' · ')}</span></div>}
              <div className="w"><b>Başvuru Dönemi</b><span>Eylül 2026 girişi · son başvuru yaz aylarında</span></div>
              <div className="w"><b>Gerekli Belgeler</b><span>CV, pasaport, transkript, SOP ve referans mektupları</span></div>
            </div>
          </div>
        </section>
      )}

      <section className="sec"><div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 8 }}>Programlar</div>
        <h2 style={{ marginBottom: 30 }}>{u.programs.length} program · {fieldNames.length} alan</h2>
        {fieldNames.map((fn) => (
          <div key={fn} style={{ marginBottom: 34 }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.1em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid var(--line)' }}>{fn} <span style={{ color: 'var(--mut2)', fontWeight: 400 }}>· {fields[fn].length}</span></div>
            <div style={{ display: 'grid', gap: 10 }}>
              {fields[fn].map((p, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center', background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 12, padding: '14px 18px' }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 15.5 }}>{p.n} {p.aw && <span style={{ color: 'var(--mut2)', fontWeight: 400 }}>· {p.aw}</span>}</div>
                    <div style={{ color: 'var(--mut2)', fontSize: 13, marginTop: 3 }}>{[p.d, p.ielts].filter(Boolean).join(' · ')}</div>
                  </div>
                  <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <div style={{ color: 'var(--gold)', fontWeight: 600, fontSize: 14 }}>{fee(p.fee)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <p style={{ color: 'var(--mut2)', fontSize: 13, marginTop: 8 }}>Ücretler 2026 girişi uluslararası öğrenci tahminleridir; kesin tutar ve şartlar için ücretsiz danışmanlık al.</p>
      </div></section>

      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[1] }} />
    </>
  )
}
