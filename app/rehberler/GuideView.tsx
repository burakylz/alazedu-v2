import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { guides, guideMap } from './guides'

const nav = fs.readFileSync(path.join(process.cwd(), 'app', 'partials.html'), 'utf8')

export default function GuideView({ slug }: { slug: string }) {
  const g = guideMap[slug]
  if (!g) notFound()
  const others = guides.filter((x) => x.slug !== g.slug)

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[0] }} />
      <section className="sec" style={{ paddingTop: 48, paddingBottom: 40 }}>
        <div className="wrap" style={{ maxWidth: 820 }}>
          <Link href="/rehberler" style={{ color: 'var(--gold)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>← Tüm rehberler</Link>
          <div className="eyebrow" style={{ marginTop: 18 }}>{g.k} · {g.read} okuma</div>
          <h1 style={{ fontFamily: 'Fraunces,serif', fontWeight: 600, fontSize: 42, lineHeight: 1.1, letterSpacing: '-.015em', margin: '12px 0 16px' }}>{g.title}</h1>
          <p style={{ color: 'var(--mut)', fontSize: 18, lineHeight: 1.75 }}>{g.intro}</p>

          <div style={{ marginTop: 36, display: 'grid', gap: 26 }}>
            {g.sections.map((s, i) => (
              <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, padding: '24px 26px' }}>
                <h2 style={{ fontFamily: 'Fraunces,serif', fontWeight: 600, fontSize: 22, marginBottom: s.p || s.list ? 12 : 0 }}>{s.h}</h2>
                {s.p && <p style={{ color: 'var(--mut)', fontSize: 16, lineHeight: 1.75 }}>{s.p}</p>}
                {s.list && (
                  <ul style={{ margin: s.p ? '14px 0 0' : 0, paddingLeft: 0, listStyle: 'none', display: 'grid', gap: 10 }}>
                    {s.list.map((it, j) => (
                      <li key={j} style={{ display: 'flex', gap: 11, color: 'var(--mut)', fontSize: 16, lineHeight: 1.6 }}>
                        <span style={{ color: 'var(--gold)', flexShrink: 0, fontWeight: 700 }}>✓</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {s.note && (
                  <div style={{ marginTop: 16, background: 'var(--gold-soft)', borderLeft: '3px solid var(--gold)', borderRadius: 8, padding: '12px 16px', color: 'var(--txt)', fontSize: 14.5, lineHeight: 1.6 }}>{s.note}</div>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40, background: 'var(--card2)', border: '1px solid var(--line)', borderRadius: 18, padding: '28px 30px', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'Fraunces,serif', fontWeight: 600, fontSize: 24, marginBottom: 8 }}>Süreci birlikte yürütelim</h3>
            <p style={{ color: 'var(--mut)', fontSize: 16, maxWidth: 520, margin: '0 auto 18px' }}>Sana özel yol haritası için ücretsiz danışmanlık al; her adımda yanındayız.</p>
            <Link href="/iletisim"><button className="btn-gold">Ücretsiz Danışmanlık Al</button></Link>
          </div>

          <div style={{ marginTop: 44 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Diğer rehberler</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 14 }}>
              {others.map((o) => (
                <Link key={o.slug} href={`/rehberler/${o.slug}`} style={{ display: 'block', background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 14, padding: '16px 18px', textDecoration: 'none' }}>
                  <div style={{ color: 'var(--gold)', fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' }}>{o.k}</div>
                  <div style={{ color: 'var(--txt)', fontWeight: 600, fontSize: 15.5, marginTop: 6 }}>{o.title}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[1] }} />
    </>
  )
}

export function guideMetadata(slug: string) {
  const g = guideMap[slug]
  if (!g) return { title: 'Rehber — AlazEdu' }
  return {
    title: `${g.title} — AlazEdu Rehberi`,
    description: g.desc,
    alternates: { canonical: `https://www.alazedu.com/rehberler/${g.slug}` },
  }
}
