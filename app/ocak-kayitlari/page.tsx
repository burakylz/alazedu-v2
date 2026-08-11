import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Ocak (January) Kayıtları — İngiltere Ocak Dönemi Başvuruları | AlazEdu',
  description: 'İngiltere’de birçok üniversite ve dil okulu Eylül’ün yanı sıra Ocak (January) döneminde de öğrenci alır. Ocak kaydı için uygun programları ve son başvuru tarihlerini AlazEdu ile öğren.',
  alternates: { canonical: 'https://www.alazedu.com/ocak-kayitlari' },
}
const nav = fs.readFileSync(path.join(process.cwd(), 'app', 'partials.html'), 'utf8')

export default function OcakKayitlari() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[0] }} />
      <section className="sec" style={{ paddingTop: 56, paddingBottom: 30 }}>
        <div className="wrap" style={{ maxWidth: 860 }}>
          <div className="eyebrow">Ocak Dönemi</div>
          <h1 style={{ fontFamily: 'Fraunces,serif', fontWeight: 600, fontSize: 40, lineHeight: 1.1, letterSpacing: '-.015em', margin: '12px 0 16px' }}>Ocak (January) Kayıtları Açıldı</h1>
          <p style={{ color: 'var(--mut)', fontSize: 17, lineHeight: 1.8 }}>
            İngiltere’de eğitim yalnızca Eylül’le sınırlı değil. Birçok üniversite ve dil okulu <b style={{ color: 'var(--txt)' }}>Ocak (January) döneminde</b> de öğrenci kabul eder. Eylül dönemini kaçırdıysan ya da bir yıl beklemek istemiyorsan Ocak dönemi ideal bir alternatiftir.
          </p>

          <div style={{ display: 'grid', gap: 12, marginTop: 26 }}>
            {[
              ['Zaman kaybı yok', 'Eylül’ü kaçıranlar için bir yıl beklemeden başlama imkânı.'],
              ['Geniş program seçeneği', 'Lisans, yüksek lisans, Foundation ve dil okulu programlarında Ocak girişi mevcuttur.'],
              ['Erken planlama avantajı', 'Vize ve konaklama süreçleri için erken başvuru, yer garantisi sağlar.'],
            ].map(([t, d], i) => (
              <div key={i} style={{ display: 'flex', gap: 12, background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 14, padding: '16px 18px' }}>
                <span style={{ color: 'var(--gold)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                <div><b style={{ fontSize: 15.5 }}>{t}</b><div style={{ color: 'var(--mut)', fontSize: 14.5, marginTop: 2 }}>{d}</div></div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 34, background: 'var(--card2)', border: '1px solid var(--line)', borderRadius: 18, padding: '28px 30px', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'Fraunces,serif', fontWeight: 600, fontSize: 22, marginBottom: 8 }}>Ocak dönemi için yer sınırlı</h3>
            <p style={{ color: 'var(--mut)', fontSize: 16, maxWidth: 520, margin: '0 auto 18px' }}>Hangi üniversite ve programların Ocak girişi olduğunu ve son başvuru tarihlerini birlikte belirleyelim.</p>
            <Link href="/iletisim"><button className="btn-gold">Danışmanlık Al</button></Link>
          </div>
          <p style={{ color: 'var(--mut2)', fontSize: 13, marginTop: 18 }}>Ocak dönemi program listesi ve son başvuru tarihleri çok yakında bu sayfaya eklenecek.</p>
        </div>
      </section>
      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[1] }} />
    </>
  )
}
