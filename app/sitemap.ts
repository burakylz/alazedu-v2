import type { MetadataRoute } from 'next'
import unis from './universiteler/universities.json'
import dil from './dil-okullari/languageschools.json'
import yaz from './yaz-okullari/summerschools.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.alazedu.com'
  const top = ['', '/universiteler', '/dil-okullari', '/yaz-okullari', '/hakkimizda', '/iletisim']
  const uniRoutes = ((unis as any).universities as any[]).map((u) => `/universiteler/${u.slug}`)
  const dilRoutes = ((dil as any).schools as any[]).map((s) => `/dil-okullari/${s.slug}`)
  const yazRoutes = ((yaz as any).schools as any[]).map((s) => `/yaz-okullari/${s.slug}`)
  const all = [...top, ...uniRoutes, ...dilRoutes, ...yazRoutes]
  return all.map((r) => ({
    url: base + r,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: r === '' ? 1 : r.split('/').length > 2 ? 0.7 : 0.8,
  }))
}
