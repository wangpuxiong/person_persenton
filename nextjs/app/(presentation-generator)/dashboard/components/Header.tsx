'use client';

import Wrapper from '@/components/Wrapper'
import React, { useState } from 'react'
import Link from 'next/link'
import BackBtn from '@/components/BackBtn'
import { usePathname } from 'next/navigation'
import HeaderNav from '@/app/(presentation-generator)/components/HeaderNab'
import { Layout, FilePlus2, LayoutDashboard } from 'lucide-react'
import { trackEvent, MixpanelEvent } from '@/utils/mixpanel'
import LanguageSelector from '@/app/LanguageSelector'
import { useTranslation } from 'react-i18next'

const Header = () => {
	const pathname = usePathname()
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
	const { t } = useTranslation('common')

	const NO_BACK_PATH = ['/upload', '/dashboard', '/auth']
	function hideBackBtn() {
		return NO_BACK_PATH.includes(pathname)
	}

	return (
		<div className="bg-indigo-600 w-full shadow-lg sticky top-0 z-50">
			<Wrapper>
				<div className="flex items-center justify-between py-1">
					<div className="flex items-center gap-3">
						{!hideBackBtn() && <BackBtn />}
						<div 
							className="flex items-center gap-2 p-2 rounded-lg cursor-pointer group" 
							onClick={() => {
								if (process.env.NEXT_PUBLIC_COMPAREGPT_CHAT_URL) {
									window.location.assign(process.env.NEXT_PUBLIC_COMPAREGPT_CHAT_URL);
								} else {
									window.location.assign('https://comparegpt.io/chat');
								}
							}}
						>
							<img
								src="/512.png"
								alt="CompareGPT Logo"
								className="w-7 h-7 rounded-lg object-cover transition-transform duration-300 group-hover:scale-110"
							/>
							<div className="text-xl font-bold text-white cursor-pointer">CompareGPT</div>
						</div>
					</div>
					<div className="hidden md:flex items-center gap-3">
						<Link
							href="/custom-template"
							prefetch={false}
							onClick={() =>
								trackEvent(MixpanelEvent.Navigation, {
									from: pathname,
									to: '/custom-template',
								})
							}
							className="flex items-center gap-2 px-3 py-2 text-white hover:bg-indigo-500 rounded-md transition-colors outline-none"
							role="menuitem"
						>
							<FilePlus2 className="w-5 h-5" />
							<span className="text-sm font-medium font-inter">
								{t('button.createTemplate') || 'Create Template'}
							</span>
						</Link>
						<Link
							href="/template-preview"
							prefetch={false}
							onClick={() =>
								trackEvent(MixpanelEvent.Navigation, {
									from: pathname,
									to: '/template-preview',
								})
							}
							className="flex items-center gap-2 px-3 py-2 text-white hover:bg-indigo-500 rounded-md transition-colors outline-none"
							role="menuitem"
						>
							<Layout className="w-5 h-5" />
							<span className="text-sm font-medium font-inter">
								{t('nav.templates') || 'Templates'}
							</span>
						</Link>
						<HeaderNav />
						{/* <div>
							<LanguageSelector />
						</div> */}
					</div>
					<button
						className="md:hidden text-white text-2xl z-10"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? '×' : '☰'}
					</button>

					<div
						className={`${
							isMenuOpen ? 'block' : 'hidden'
						} md:hidden absolute right-6 top-9 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20 `}
					>
						<div className="py-1">
							<Link
								href="/custom-template"
								prefetch={false}
								onClick={() =>
									trackEvent(MixpanelEvent.Navigation, {
										from: pathname,
										to: '/custom-template',
									})
								}
								className="flex items-center gap-2 px-3 py-2 text-indigo-600 hover:bg-gray-50 rounded-md transition-colors outline-none"
								role="menuitem"
							>
								<FilePlus2 className="w-5 h-5" />
								<span className="text-sm font-medium font-inter">
									{t('button.createTemplate') || 'Create Template'}
								</span>
							</Link>
							<Link
								href="/template-preview"
								prefetch={false}
								onClick={() =>
									trackEvent(MixpanelEvent.Navigation, {
										from: pathname,
										to: '/template-preview',
									})
								}
								className="flex items-center gap-2 px-3 py-2 text-indigo-600 hover:bg-gray-50 rounded-md transition-colors outline-none"
								role="menuitem"
							>
								<Layout className="w-5 h-5" />
								<span className="text-sm font-medium font-inter">
									{t('nav.templates') || 'Templates'}
								</span>
							</Link>
							<Link
								href="/dashboard"
								prefetch={false}
								className="flex items-center gap-2 px-3 py-2 text-indigo-600 hover:bg-gray-50 rounded-md transition-colors outline-none"
								role="menuitem"
								onClick={() =>
									trackEvent(MixpanelEvent.Navigation, {
										from: pathname,
										to: '/dashboard',
									})
								}
							>
								<LayoutDashboard className="w-5 h-5" />
								<span className="text-sm font-medium font-inter">
									{t('nav.dashboard') || 'Dashboard'}
								</span>
							</Link>
							{/* <div className="px-3 py-2 border-t border-gray-100">
								<LanguageSelector />
							</div> */}
						</div>
					</div>
				</div>
			</Wrapper>
		</div>
	)
}

export default Header
