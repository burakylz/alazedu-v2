import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import data from './universities.json'

export const metadata: Metadata = {
  title: 'İngiltere Üniversiteleri — Programlar, Ücretler ve Kabul Şartları',
  description: "İngiltere'nin önde gelen üniversiteleri, bölümleri, yıllık ücretleri ve kabul şartlarıyla. AlazEdu danışmanlığıyla başvur.",
  alternates: { canonical: 'https://www.alazedu.com/universiteler' },
}

type Uni = { slug: string; name: string; city: string; qs: string; ogr: string; rank: number; programs: any[] }
const unis = (data as any).universities as Uni[]
const nav = fs.readFileSync(path.join(process.cwd(), 'app', 'partials.html'), 'utf8')

export default function Universiteler() {
  const total = unis.reduce((a, u) => a + u.programs.length, 0)
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[0] }} />
      <header style={{ padding: '64px 0 26px' }}>
        <div className="wrap">
          <div className="eyebrow">İngiltere üniversiteleri</div>
          <h1 style={{ fontFamily: 'Fraunces,serif', fontWeight: 600, fontSize: 52, lineHeight: 1.05, letterSpacing: '-.015em', margin: '18px 0' }}>
            İngiltere'nin en iyi üniversiteleri,<br /><span style={{ color: 'var(--gold)' }}>{total.toLocaleString('tr-TR')}+ program tek bir yerde.</span>
          </h1>
          <p style={{ color: 'var(--mut)', fontSize: 18, maxWidth: 600 }}>
            {unis.length} üniversite, bölümleri, yıllık ücretleri ve kabul şartlarıyla. Birini seç, programlarını incele, AlazEdu ile başvur.
          </p>
        </div>
      </header>
      <section className="sec" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '16px 0', marginBottom: 28 }}>
            <span style={{ fontSize: 12, letterSpacing: '.18em', color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase' }}>Üniversiteler</span>
            <span style={{ color: 'var(--mut)', fontSize: 14 }}>{unis.length} üniversite · {total.toLocaleString('tr-TR')} program</span>
          </div>
          <div className="ucards">
            {unis.map((u) => (
              <Link href={`/universiteler/${u.slug}`} className="uni" key={u.slug} style={{ display: 'block' }}>
                <div className="top">
                  <div className="lg" style={{ background: 'var(--gold-soft)', color: 'var(--gold)', fontFamily: 'Fraunces,serif', fontSize: 17 }}>{u.name.replace(/^(The )?University of /, '').slice(0, 2).toUpperCase()}</div>
                  <div><h4>{u.name}</h4><div className="loc">{u.qs === '—' ? 'İngiltere' : 'QS #' + u.qs} · {u.city}</div></div>
                </div>
                <div className="meta">
                  <span>{u.programs.length} program</span>
                  <span style={{ color: 'var(--gold)', fontWeight: 500 }}>Programları Gör →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[1] }} />
    </>
  )
}
