import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { guides } from './guides'

export const metadata: Metadata = {
  title: 'Rehberler & Bilgilendirme — AlazEdu',
  description: 'İngiltere’de eğitim için başvuru süreci, gerekli belgeler, öğrenci vizesi ve 28 gün kuralı, IELTS ve dil şartları hakkında adım adım rehberler.',
  alternates: { canonical: 'https://www.alazedu.com/rehberler' },
}
const nav = fs.readFileSync(path.join(process.cwd(), 'app', 'partials.html'), 'utf8')

export default function Rehberler() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[0] }} />
      <section className="sec" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <div className="head reveal" style={{ marginBottom: 8 }}>
            <div className="eyebrow">Bilgi Merkezi</div>
            <h2>Rehberler & bilgilendirme</h2>
            <p>Başvuru, belgeler ve vize sürecinde bilmen gereken her şey — adım adım, sade bir dille.</p>
          </div>
          <div className="progs" style={{ marginTop: 30 }}>
            {guides.map((g) => (
              <Link key={g.slug} className="pcard" href={`/rehberler/${g.slug}`} style={{ display: 'block' }}>
                <div className="k">{g.k} · {g.read} okuma</div>
                <h3>{g.title}</h3>
                <p>{g.desc}</p>
                <span className="more">Rehberi Oku →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[1] }} />
    </>
  )
}
