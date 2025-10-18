import React from 'react'

import UploadPage from './components/UploadPage'
import Header from '@/app/(presentation-generator)/dashboard/components/Header'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'PPT(slides) | CompareGPT.io',
	description:
		'CompareGPT.io = Autonomous Execution + Near-Zero Hallucination + All agent tools (API keys)',
	alternates: {
		canonical: 'https://slides.comparegpt.io/',
	},
	keywords: [
		'presentation generator',
		'AI presentations',
		'data visualization',
		'automatic presentation maker',
		'professional slides',
		'data-driven presentations',
		'document to presentation',
		'presentation automation',
		'smart presentation tool',
		'business presentations',
	],
	openGraph: {
		title: 'PPT(slides) | CompareGPT.io',
		description:
			'CompareGPT.io = Autonomous Execution + Near-Zero Hallucination + All agent tools (API keys)',
		type: 'website',
		url: 'https://slides.comparegpt.io/',
		siteName: 'CompareGPT.io',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'PPT(slides) | CompareGPT.io',
		description:
			'CompareGPT.io = Autonomous Execution + Near-Zero Hallucination + All agent tools (API keys)',
		site: 'https://slides.comparegpt.io/',
		creator: '@comparegpt_io',
	},
}

const page = () => {
	return (
		<div className="relative">
			<Header />
			<UploadPage />
		</div>
	)
}

export default page
