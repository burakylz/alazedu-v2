import type { Metadata } from 'next'
import GuideView, { guideMetadata } from '../GuideView'

export const metadata: Metadata = guideMetadata('uk-vize-28-gun-kurali')
export default function Page() { return <GuideView slug="uk-vize-28-gun-kurali" /> }
