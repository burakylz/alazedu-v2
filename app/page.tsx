import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'İngilizcem / IELTS’im Yeterli Değil mi? — International Year One & Pre-sessional | AlazEdu',
  description: 'İngilizce seviyen veya IELTS puanın istenen şartı karşılamıyorsa İngiltere’de okumak için yollar var: International Year One (IYO) ve Pre-sessional English programları. AlazEdu ile en uygun geçiş yolunu belirle.',
  alternates: { canonical: 'https://www.alazedu.com/hazirlik-programlari' },
}
const nav = fs.readFileSync(path.join(process.cwd(), 'app', 'partials.html'), 'utf8')

export default function HazirlikProgramlari() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[0] }} />
      <section className="sec" style={{ paddingTop: 56, paddingBottom: 30 }}>
        <div className="wrap" style={{ maxWidth: 860 }}>
          <div className="eyebrow">Hazırlık & Geçiş Programları</div>
          <h1 style={{ fontFamily: 'Fraunces,serif', fontWeight: 600, fontSize: 40, lineHeight: 1.1, letterSpacing: '-.015em', margin: '12px 0 16px' }}>İngilizcem düşük veya IELTS’im yeterli değil, ne yapabilirim?</h1>
          <p style={{ color: 'var(--mut)', fontSize: 17, lineHeight: 1.8 }}>
            İngiltere’de okumak için akademik notların uygun olsa bile İngilizce seviyen ya da IELTS puanın istenen şartı karşılamıyor olabilir. Bu bir engel değil — doğru geçiş programıyla yine hedef üniversitene ulaşabilirsin. En yaygın iki yol:
          </p>

          <div style={{ display: 'grid', gap: 18, marginTop: 30 }}>
            <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, padding: '24px 26px' }}>
              <div style={{ color: 'var(--gold)', fontSize: 12, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' }}>Seçenek 1</div>
              <h2 style={{ fontFamily: 'Fraunces,serif', fontWeight: 600, fontSize: 24, margin: '6px 0 10px' }}>International Year One (IYO)</h2>
              <p style={{ color: 'var(--mut)', fontSize: 16, lineHeight: 1.75 }}>Lisansın <b style={{ color: 'var(--txt)' }}>1. yılına denk gelen</b>, akademik dersler + İngilizce desteğinin birlikte verildiği bir programdır. Başarıyla tamamlayan öğrenciler doğrudan lisansın <b style={{ color: 'var(--txt)' }}>2. yılından</b> devam eder. Foundation’a göre daha hızlı bir geçiş yoludur; İngilizce şartı Foundation’dan biraz daha yüksektir.</p>
            </div>
            <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, padding: '24px 26px' }}>
              <div style={{ color: 'var(--gold)', fontSize: 12, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' }}>Seçenek 2</div>
              <h2 style={{ fontFamily: 'Fraunces,serif', fontWeight: 600, fontSize: 24, margin: '6px 0 10px' }}>Pre-sessional English</h2>
              <p style={{ color: 'var(--mut)', fontSize: 16, lineHeight: 1.75 }}>Üniversiteye kabul aldın ama IELTS puanın <b style={{ color: 'var(--txt)' }}>yarım–bir puan eksikse</b>, bölüm başlamadan önce alınan yoğun akademik İngilizce programıdır (genelde 4–20 hafta). Başarıyla tamamlayan öğrenci <b style={{ color: 'var(--txt)' }}>ayrıca IELTS’e girmeden</b> bölümüne başlayabilir.</p>
            </div>
          </div>

          <div style={{ marginTop: 34, background: 'var(--card2)', border: '1px solid var(--line)', borderRadius: 18, padding: '28px 30px', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'Fraunces,serif', fontWeight: 600, fontSize: 22, marginBottom: 8 }}>Hangisi sana uygun?</h3>
            <p style={{ color: 'var(--mut)', fontSize: 16, maxWidth: 520, margin: '0 auto 18px' }}>Seviyene, hedef üniversitene ve zamanlamana göre en doğru yolu birlikte belirleyelim.</p>
            <Link href="/iletisim"><button className="btn-gold">Danışmanlık Al</button></Link>
          </div>
          <p style={{ color: 'var(--mut2)', fontSize: 13, marginTop: 18 }}>Detaylı program listesi ve okul bazlı şartlar çok yakında bu sayfaya eklenecek.</p>
        </div>
      </section>
      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[1] }} />
    </>
  )
}
