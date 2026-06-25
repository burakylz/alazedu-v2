import type { Metadata } from 'next'
import GuideView, { guideMetadata } from '../GuideView'

export const metadata: Metadata = guideMetadata('ielts-dil-sartlari')
export default function Page() { return <GuideView slug="ielts-dil-sartlari" /> }
