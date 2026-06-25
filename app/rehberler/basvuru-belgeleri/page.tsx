import type { Metadata } from 'next'
import GuideView, { guideMetadata } from '../GuideView'

export const metadata: Metadata = guideMetadata('basvuru-belgeleri')
export default function Page() { return <GuideView slug="basvuru-belgeleri" /> }
