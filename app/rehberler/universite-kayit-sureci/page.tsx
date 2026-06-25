import type { Metadata } from 'next'
import GuideView, { guideMetadata } from '../GuideView'

export const metadata: Metadata = guideMetadata('universite-kayit-sureci')
export default function Page() { return <GuideView slug="universite-kayit-sureci" /> }
