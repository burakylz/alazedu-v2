import type { MetadataRoute } from 'next'
import unis from './universiteler/universities.json'
import dil from './dil-okullari/languageschools.json'
import yaz from './yaz-okullari/summerschools.json'
import staj from './lise-staj/internships.json'
import { guides } from './rehberler/guides'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.alazedu.com'
  const top = ['', '/universiteler', '/dil-okullari', '/yaz-okullari', '/lise-staj', '/rehberler', '/hakkimizda', '/iletisim']
  const uniRoutes = ((unis as any).universities as any[]).map((u) => `/universiteler/${u.slug}`)
  const dilRoutes = ((dil as any).schools as any[]).map((s) => `/dil-okullari/${s.slug}`)
  const yazRoutes = ((yaz as any).schools as any[]).map((s) => `/yaz-okullari/${s.slug}`)
  const stajRoutes = ((staj as any).programs as any[]).map((s) => `/lise-staj/${s.slug}`)
  const rehberRoutes = guides.map((g) => `/rehberler/${g.slug}`)
  const all = [...top, ...uniRoutes, ...dilRoutes, ...yazRoutes, ...stajRoutes, ...rehberRoutes]
  return all.map((r) => ({
    url: base + r,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: r === '' ? 1 : r.split('/').length > 2 ? 0.7 : 0.8,
  }))
}
