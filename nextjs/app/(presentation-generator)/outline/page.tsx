import React from 'react'
import Header from '@/app/(presentation-generator)/dashboard/components/Header'
import { Metadata } from 'next'
import OutlinePage from './components/OutlinePage'
export const metadata: Metadata = {
  icons: [
		{
			rel: 'icon',
			url: '/512.png',
		},
		{
			rel: 'apple-touch-icon',
			url: '/512.png',
		},
		{
			rel: 'icon',
			url: '/512.png',
			sizes: '32x32',
			type: 'image/png',
		},
		{
			rel: 'icon',
			url: '/512.png',
			sizes: '16x16',
			type: 'image/png',
		},
	],
  title: "Outline Presentation | CompareGPT.io",
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
	]
}
const page = () => {
  return (
    <div className='relative min-h-screen'>
      <Header />
      <OutlinePage />
    </div>
  )
}

export default page
