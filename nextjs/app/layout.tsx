import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Roboto, Instrument_Sans } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import MixpanelInitializer from './MixpanelInitializer'
import { LayoutProvider } from './(presentation-generator)/context/LayoutContext'
import { Toaster } from '@/components/ui/sonner'
import I18nProvider from './I18nProvider'
import { supportedLanguages } from './config'

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

// 获取元数据的函数，支持多语言
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
	// 默认元数据
	title: {
		default: 'PPT(slides) | CompareGPT.io',
		template: '%s | CompareGPT.io',
	},
	description: 'CompareGPT.io = Autonomous Execution + Near-Zero Hallucination + All agent tools (API keys)',
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
		description: 'CompareGPT.io = Autonomous Execution + Near-Zero Hallucination + All agent tools (API keys)',
		type: 'website',
		url: 'https://slides.comparegpt.io/',
		siteName: 'CompareGPT.io',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'PPT(slides) | CompareGPT.io',
		description: 'CompareGPT.io = Autonomous Execution + Near-Zero Hallucination + All agent tools (API keys)',
		site: 'https://slides.comparegpt.io/',
		creator: '@comparegpt_io',
	},
	// 支持的替代语言
	alternates: {
		languages: supportedLanguages.reduce((acc, lang) => {
			if (lang !== 'zh-CN') {
				acc[lang] = `/${lang}`;
			}
			return acc;
		}, {} as Record<string, string>),
	},
}

// 处理动态语言路由
export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	// 从URL获取语言代码，默认使用英语
	const lng = 'zh-CN'; // 实际项目中，这里应该从URL或cookie中获取语言设置

	return (
		<html lang={lng}>
			<body
				className={`${inter.variable} ${roboto.variable} ${instrument_sans.variable} antialiased`}
			>
				<Providers>
					<MixpanelInitializer>
						<I18nProvider lng={lng}>
							<LayoutProvider>{children}</LayoutProvider>
						</I18nProvider>
					</MixpanelInitializer>
				</Providers>
				<Toaster position="top-center" />
			</body>
		</html>
	)
}
