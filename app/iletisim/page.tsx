import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import ConsultForm from './ConsultForm'

export const metadata: Metadata = {
  title: 'Ücretsiz Danışmanlık — AlazEdu',
  description: 'İngiltere’de üniversite, dil okulu, yaz okulu ve lise staj programları için ücretsiz danışmanlık. Sınıfını, İngilizce seviyeni ve ilgi alanını paylaş, danışmanlarımız seninle iletişime geçsin.',
  alternates: { canonical: 'https://www.alazedu.com/iletisim' },
}
const nav = fs.readFileSync(path.join(process.cwd(), 'app', 'partials.html'), 'utf8')

export default function Iletisim() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[0] }} />
      <section className="sec" style={{ paddingTop: 60, paddingBottom: 50 }}>
        <div className="wrap iletisimgrid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 48, alignItems: 'start' }}>
          <div>
            <div className="eyebrow">Ücretsiz Danışmanlık</div>
            <h1 style={{ fontFamily: 'Fraunces,serif', fontWeight: 600, fontSize: 46, lineHeight: 1.08, letterSpacing: '-.015em', margin: '14px 0 16px' }}>Hayalindeki eğitime ilk adımı at</h1>
            <p style={{ color: 'var(--mut)', fontSize: 16.5, lineHeight: 1.8, maxWidth: 460 }}>
              Formu doldur; sınıfına, İngilizce seviyene ve hedefine göre sana özel bir yol haritası çıkaralım. Danışmanlık tamamen <b style={{ color: 'var(--txt)' }}>ücretsizdir</b> ve başvuru ücreti yoktur.
            </p>
            <div style={{ marginTop: 26, display: 'grid', gap: 14 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', color: 'var(--mut)', fontSize: 15 }}>📍 İstanbul Taksim (merkez) + 5 ilde ofis · Londra, UK</div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', color: 'var(--mut)', fontSize: 15 }}>📞 <a href="tel:+447749849668" style={{ color: 'var(--txt)' }}>+44 7749 849 668</a></div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', color: 'var(--mut)', fontSize: 15 }}>💬 <a href="https://wa.me/447749849668" style={{ color: 'var(--txt)' }}>WhatsApp'tan yaz</a></div>
            </div>
          </div>
          <ConsultForm />
        </div>
      </section>
      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[1] }} />
    </>
  )
}
