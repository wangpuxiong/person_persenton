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
					当前应用程序为测试版，目前仅支持使用默认模板生成PPT。你可以选择你喜欢的模型来分别生成PPT大纲、PPT内容和PPT中的图片。更多功能将很快得到支持，请继续关注我们。
				</p>
			</div>

			<UploadPage />
		</div>
	)
}

export default page
