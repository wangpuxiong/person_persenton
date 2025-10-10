import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Roboto, Instrument_Sans } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import MixpanelInitializer from './MixpanelInitializer'
import { LayoutProvider } from './(presentation-generator)/context/LayoutContext'
import { Toaster } from '@/components/ui/sonner'
const inter = localFont({
	src: [
		{
			path: './fonts/Inter.ttf',
			weight: '400',
			style: 'normal',
		},
	],
	variable: '--font-inter',
})

const instrument_sans = Instrument_Sans({
	subsets: ['latin'],
	weight: ['400'],
	variable: '--font-instrument-sans',
})

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['400'],
	variable: '--font-roboto',
})

export const metadata: Metadata = {
	metadataBase: new URL('https://slides.comparegpt.io'),
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
	title: 'PPT(slides) | CompareGPT.io',
	description:
		'CompareGPT.io = Autonomous Execution + Near-Zero Hallucination + All agent tools (API keys)',
	keywords: [
		'AI presentation generator',
		'data storytelling',
		'data visualization tool',
		'AI data presentation',
		'presentation generator',
		'data to presentation',
		'interactive presentations',
		'professional slides',
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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				className={`${inter.variable} ${roboto.variable} ${instrument_sans.variable} antialiased`}
			>
				<Providers>
					<MixpanelInitializer>
						<LayoutProvider>{children}</LayoutProvider>
					</MixpanelInitializer>
				</Providers>
				<Toaster position="top-center" />
			</body>
		</html>
	)
}
