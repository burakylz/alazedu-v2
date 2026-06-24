import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.alazedu.com'
  const routes = ['', '/universiteler', '/dil-okullari', '/yaz-okullari', '/hakkimizda', '/iletisim']
  return routes.map((r) => ({ url: base + r, lastModified: new Date(), changeFrequency: 'weekly', priority: r === '' ? 1 : 0.8 }))
}
