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
			<div className="flex flex-col items-center justify-center  py-8 px-2 md:px-6">
				<h1 className="text-3xl font-semibold font-instrument_sans">
					Create Presentation{' '}
				</h1>
				<p className="text-base text-gray-500">
					The current application is in beta version and only supports default
					templates. During the generation process, gpt-5-mini and
					gemini-2.5-flash-image preview models are used. More features will be
					supported soon. Please stay tuned to us
				</p>
			</div>

			<UploadPage />
		</div>
	)
}

export default page
