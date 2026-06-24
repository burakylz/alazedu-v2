import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.alazedu.com'),
  title: { default: 'AlazEdu | İngiltere Yurtdışı Eğitim Danışmanlığı', template: '%s | AlazEdu' },
  description: "İngiltere'nin en prestijli üniversiteleri ve dil okullarında başvurudan kabule, vizeden konaklamaya kadar profesyonel yurtdışı eğitim danışmanlığı.",
  keywords: ['yurtdışı eğitim','İngiltere üniversite','İngiltere dil okulu','yaz okulu','öğrenci vizesi','AlazEdu'],
  openGraph: { type: 'website', locale: 'tr_TR', siteName: 'AlazEdu', title: 'AlazEdu | İngiltere Yurtdışı Eğitim Danışmanlığı', description: "İngiltere'de eğitim için uçtan uca danışmanlık." },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="tr"><body>{children}</body></html>)
}
