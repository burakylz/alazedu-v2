import fs from 'fs'
import path from 'path'
import Script from 'next/script'

const html = fs.readFileSync(path.join(process.cwd(), 'app', 'home.html'), 'utf8')

export default function Home() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Script src="/home.js" strategy="afterInteractive" />
    </>
  )
}
