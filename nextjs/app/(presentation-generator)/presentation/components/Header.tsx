'use client';

import { Button } from '@/components/ui/button'
import {
	SquareArrowOutUpRight,
	Play,
	Loader2,
	Redo2,
	Undo2,
	RefreshCcw,
	LayoutDashboard,
} from 'lucide-react'
import React, { useState } from 'react'
import Wrapper from '@/components/Wrapper'
import { useRouter, usePathname } from 'next/navigation'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { PresentationGenerationApi } from '../../services/api/presentation-generation'
import { OverlayLoader } from '@/components/ui/overlay-loader'
import { useDispatch, useSelector } from 'react-redux'

import Link from 'next/link'

import { RootState } from '@/store/store'
import { toast } from 'sonner'

import Announcement from '@/components/Announcement'
import { PptxPresentationModel } from '@/types/pptx_models'
import HeaderNav from '../../components/HeaderNab'
import PDFIMAGE from '@/public/pdf.svg'
import PPTXIMAGE from '@/public/pptx.svg'
import Image from 'next/image'
import { trackEvent, MixpanelEvent } from '@/utils/mixpanel'
import { usePresentationUndoRedo } from '../hooks/PresentationUndoRedo'
import ToolTip from '@/components/ToolTip'
import { clearPresentationData } from '@/store/slices/presentationGeneration'
import { clearHistory } from '@/store/slices/undoRedoSlice'
import LanguageSelector from '@/app/LanguageSelector'
import { useTranslation } from 'react-i18next'

const Header = ({
	presentation_id,
	currentSlide,
}: {
	presentation_id: string
	currentSlide?: number
}) => {
	const { t } = useTranslation('common')
	const [open, setOpen] = useState(false)
	const [showLoader, setShowLoader] = useState(false)
	const router = useRouter()
	const pathname = usePathname()
	const dispatch = useDispatch()

	const { presentationData, isStreaming } = useSelector<RootState, { presentationData: any, isStreaming: boolean }>(
		(state: RootState) => ({
			presentationData: (state.presentationGeneration as any).presentationData,
			isStreaming: state.presentationGeneration.isStreaming ?? false
		})
	)

	const { onUndo, onRedo, canUndo, canRedo } = usePresentationUndoRedo()

	const get_presentation_pptx_model = async (
		id: string
	): Promise<PptxPresentationModel> => {
		const response = await fetch(`/api/presentation_to_pptx_model?id=${id}`)
		const pptx_model = await response.json()
		return pptx_model
	}

	const handleExportPptx = async () => {
		if (isStreaming) return

		try {
			setOpen(false)
			setShowLoader(true)
			// Save the presentation data before exporting
			trackEvent(MixpanelEvent.Header_UpdatePresentationContent_API_Call)
			await PresentationGenerationApi.updatePresentationContent(
				presentationData
			)

			trackEvent(MixpanelEvent.Header_GetPptxModel_API_Call)
			const pptx_model = await get_presentation_pptx_model(presentation_id)
			if (!pptx_model) {
				throw new Error('Failed to get presentation PPTX model')
			}
			trackEvent(MixpanelEvent.Header_ExportAsPPTX_API_Call)
			const pptx_path = await PresentationGenerationApi.exportAsPPTX(pptx_model)
			console.log('PPTX path:', pptx_path)
			if (pptx_path) {
				// window.open(pptx_path, '_self');
				downloadLink(pptx_path)
			} else {
				throw new Error('No path returned from export')
			}
		} catch (error) {
			console.error('Export failed:', error)
			setShowLoader(false)
			toast.error('Having trouble exporting!', {
				description:
					'We are having trouble exporting your presentation. Please try again.',
			})
		} finally {
			setShowLoader(false)
		}
	}

	const handleExportPdf = async () => {
		if (isStreaming) return

		try {
			setOpen(false)
			setShowLoader(true)
			// Save the presentation data before exporting
			trackEvent(MixpanelEvent.Header_UpdatePresentationContent_API_Call)
			await PresentationGenerationApi.updatePresentationContent(
				presentationData
			)

			trackEvent(MixpanelEvent.Header_ExportAsPDF_API_Call)
			const response = await fetch('/api/export-as-pdf', {
				method: 'POST',
				body: JSON.stringify({
					id: presentation_id,
					title: presentationData?.title,
				}),
			})

			if (response.ok) {
				const { path: pdfPath } = await response.json()
				// window.open(pdfPath, '_blank');
				downloadLink(pdfPath)
			} else {
				throw new Error('Failed to export PDF')
			}
		} catch (err) {
			console.error(err)
			toast.error('Having trouble exporting!', {
				description:
					'We are having trouble exporting your presentation. Please try again.',
			})
		} finally {
			setShowLoader(false)
		}
	}
	const handleReGenerate = () => {
		dispatch(clearPresentationData())
		dispatch(clearHistory())
		trackEvent(MixpanelEvent.Header_ReGenerate_Button_Clicked, { pathname })
		router.push(`/presentation?id=${presentation_id}&stream=true`)
	}
	// const downloadLink = (path: string) => {
	//   // if we have popup access give direct download if not redirect to the path
	//   if (window.opener) {
	//     window.open(path, '_blank');
	//   } else {
	//     const link = document.createElement('a');
	//     link.href = path;
	//     link.download = path.split('/').pop() || 'download';
	//     document.body.appendChild(link);
	//     link.click();
	//   }
	// };

	const downloadLink = (path: string) => {
		try {
			// 完全避免使用window.open，统一使用a标签下载
			const link = document.createElement('a')

			console.log('Download path:', path)

			// 设置下载属性和文件名
			const fileName = path.split('/').pop() || 'download'
			link.href = path
			link.download = fileName

			// 确保链接在用户交互上下文中触发
			link.style.display = 'none'

			// 添加到DOM
			document.body.appendChild(link)

			// 使用requestAnimationFrame确保在UI线程中执行
			requestAnimationFrame(() => {
				// 触发点击
				link.click()

				// 移除链接元素
				setTimeout(() => {
					document.body.removeChild(link)
				}, 100)
			})
		} catch (error) {
			console.error('Download failed:', error)
			// 作为最后的备选方案，在出现问题时通知用户
			toast.info('Please click the download link in the new tab', {
				description: 'Your file is ready for download',
			})
			// 在新标签页打开，但添加noopener noreferrer以提高安全性
			window.open(path, '_blank', 'noopener,noreferrer')
		}
	}

	const ExportOptions = ({ mobile }: { mobile: boolean }) => (
		<div
			className={`space-y-2 max-md:mt-4 ${mobile ? '' : 'bg-white'} rounded-lg`}
		>
			<Button
				onClick={() => {
					trackEvent(MixpanelEvent.Header_Export_PDF_Button_Clicked, {
						pathname,
					})
					handleExportPdf()
				}}
				variant="ghost"
				className={`pb-4 border-b rounded-none border-gray-300 w-full flex justify-start text-[#5146E5] ${
					mobile ? 'bg-white py-6 border-none rounded-lg' : ''
				}`}
			>
				<Image src={PDFIMAGE} alt="pdf export" width={30} height={30} />
				{t('nav.exportAsPDF') || 'Export as PDF'}
			</Button>
			<Button
				onClick={() => {
					trackEvent(MixpanelEvent.Header_Export_PPTX_Button_Clicked, {
						pathname,
					})
					handleExportPptx()
				}}
				variant="ghost"
				className={`w-full flex justify-start text-[#5146E5] ${
					mobile ? 'bg-white py-6' : ''
				}`}
			>
				<Image src={PPTXIMAGE} alt="pptx export" width={30} height={30} />
				{t('nav.exportAsPPTX') || 'Export as PPTX'}
			</Button>
		</div>
	)

	const MenuItems = ({ mobile }: { mobile: boolean }) => (
		<div className="flex flex-col md:flex-row items-center gap-4">
			{/* undo redo */}
			<button
				onClick={handleReGenerate}
				disabled={isStreaming || !presentationData}
				className="text-white  disabled:opacity-50"
			>
				{t('nav.reGenerate') || 'Re-Generate'}
			</button>
			<div className="flex items-center gap-2 ">
				<ToolTip content="Undo">
					<button
						disabled={!canUndo}
						className="text-white disabled:opacity-50"
						onClick={() => {
							onUndo()
						}}
					>
						<Undo2 className="w-6 h-6 " />
					</button>
				</ToolTip>
				<ToolTip content="Redo">
					<button
						disabled={!canRedo}
						className="text-white disabled:opacity-50"
						onClick={() => {
							onRedo()
						}}
					>
						<Redo2 className="w-6 h-6 " />
					</button>
				</ToolTip>
			</div>

			{/* Present Button */}
			<Button
				onClick={() => {
					const to = `?id=${presentation_id}&mode=present&slide=${
						currentSlide || 0
					}`
					trackEvent(MixpanelEvent.Navigation, { from: pathname, to })
					router.push(to)
				}}
				variant="ghost"
				className="border border-white font-bold text-white rounded-[32px] transition-all duration-300 group"
			>
				<Play className="w-4 h-4 mr-1 stroke-white group-hover:stroke-black" />
				{t('nav.present') || 'Present'}
			</Button>

			{/* Desktop Export Button with Popover */}

			<div
				style={{
					zIndex: 100,
				}}
				className="hidden md:block relative "
			>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							className={`border py-5 text-[#5146E5] font-bold rounded-[32px] transition-all duration-500 hover:border hover:bg-[#5146E5] hover:text-white w-full ${
								mobile ? '' : 'bg-white'
							}`}
						>
							<SquareArrowOutUpRight className="w-4 h-4 mr-1" />
							{t('button.export') || 'Export'}
						</Button>
					</PopoverTrigger>
					<PopoverContent
						align="end"
						className="w-[250px] space-y-2 py-3 px-2 "
					>
						<ExportOptions mobile={false} />
					</PopoverContent>
				</Popover>
			</div>

			{/* Mobile Export Section */}
			<div className="md:hidden flex flex-col w-full">
				<ExportOptions mobile={true} />
			</div>
		</div>
	)

	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<>
			<OverlayLoader
				show={showLoader}
				text="Exporting presentation..."
				showProgress={true}
				duration={40}
			/>
			<div className="bg-[#5146E5] w-full shadow-lg sticky top-0 ">
				<Announcement />
				<Wrapper className="flex items-center justify-between py-1">
					<div 
						className="flex items-center gap-2 p-2 rounded-lg cursor-pointer group" 
						onClick={() => {
							console.log("presentation-env>>", process.env)
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

					{/* Desktop Menu */}
					<div className="hidden md:flex items-center gap-4 2xl:gap-6">
						{isStreaming && (
							<Loader2 className="animate-spin text-white font-bold w-6 h-6" />
						)}

						<MenuItems mobile={false} />
						<HeaderNav />
						<div>
							<LanguageSelector />
						</div>
					</div>

					{/* Mobile Menu */}
					<button
						className="md:hidden text-white text-2xl z-10"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? '×' : '☰'}
					</button>
				</Wrapper>
			</div>
			<div
				className={`${
					isMenuOpen ? 'block' : 'hidden'
				} md:hidden absolute right-6 top-[4.25rem] mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20 `}
			>
				<div className="py-1">
					<Button
						onClick={() => {
							trackEvent(MixpanelEvent.Header_Export_PDF_Button_Clicked, {
								pathname,
							})
							handleExportPdf()
							setIsMenuOpen(false)
						}}
						variant="ghost"
						className="w-full flex items-center gap-2 px-3 py-2 !text-indigo-600 hover:bg-gray-50 rounded-md transition-colors outline-none justify-start"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							className="!w-5 !h-5"
						>
							<path
								d="M7.79199 21.25H16.208C17.1363 21.25 18.0265 20.8813 18.6829 20.2249C19.3392 19.5685 19.708 18.6783 19.708 17.75V12.22C19.7083 11.2919 19.34 10.4016 18.684 9.745L12.715 3.775C12.39 3.45 12.0041 3.19221 11.5794 3.01634C11.1548 2.84047 10.6996 2.74997 10.24 2.75H7.79199C6.86373 2.75 5.9735 3.11875 5.31712 3.77513C4.66074 4.4315 4.29199 5.32174 4.29199 6.25V17.75C4.29199 18.6783 4.66074 19.5685 5.31712 20.2249C5.9735 20.8813 6.86373 21.25 7.79199 21.25Z"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M10.4368 7.14095C10.1978 7.21895 10.0448 7.37695 10.0008 7.55195C9.91079 7.90395 10.0008 8.28195 10.2538 8.75495C10.3798 8.98895 10.5338 9.22595 10.7038 9.47995L10.7958 9.61695L10.9408 9.83195L10.9598 9.76395L11.0458 9.45795C11.1445 9.12262 11.2211 8.78262 11.2758 8.43795C11.3648 7.79595 11.2648 7.41995 10.9668 7.17795C10.8868 7.11295 10.6888 7.05895 10.4368 7.14095ZM10.4918 11.293L10.2218 10.931L10.1898 10.883C10.0748 10.693 9.94679 10.503 9.80779 10.298L9.70779 10.149C9.52378 9.88143 9.35291 9.6051 9.19579 9.32095C8.88579 8.74295 8.63779 8.03495 8.83779 7.25395C9.00779 6.58995 9.53579 6.17295 10.0648 5.99995C10.5818 5.83195 11.2388 5.85295 11.7248 6.24695C12.5168 6.89095 12.5728 7.81995 12.4638 8.60395C12.4031 9.00067 12.3159 9.39288 12.2028 9.77795L12.1068 10.118C12.0321 10.3726 11.9628 10.629 11.8988 10.887L11.8318 11.081L13.2238 12.945C13.8738 12.867 14.5878 12.82 15.2538 12.868C16.0228 12.922 16.8488 13.11 17.4118 13.644C17.5929 13.8319 17.724 14.0623 17.793 14.3141C17.862 14.5658 17.8668 14.8309 17.8068 15.085C17.6898 15.565 17.3528 15.965 16.8878 16.208C15.9028 16.723 14.9858 16.313 14.3048 15.792C13.7718 15.385 13.2598 14.817 12.8288 14.339L12.7248 14.225C12.3548 14.282 12.0048 14.346 11.7208 14.4C11.4158 14.457 11.0368 14.528 10.6248 14.62L10.4738 15.063C10.3905 15.255 10.3111 15.4483 10.2358 15.643L10.1138 15.946C9.99067 16.2579 9.84805 16.5619 9.68679 16.856C9.35679 17.434 8.82979 18.048 7.94579 18.097C6.76179 18.163 5.95979 17.112 6.18979 15.989L6.19579 15.962C6.39579 15.171 7.08979 14.652 7.76079 14.309C8.35779 14.003 9.05479 13.777 9.70179 13.608L10.4918 11.293ZM11.3618 12.458L11.0748 13.301L11.4958 13.221L11.4998 13.22L11.8798 13.15L11.3618 12.458ZM14.2018 14.062C14.4758 14.352 14.7488 14.622 15.0328 14.839C15.5828 15.259 15.9728 15.332 16.3318 15.144C16.5318 15.039 16.6158 14.903 16.6408 14.802C16.6529 14.7478 16.652 14.6915 16.6381 14.6378C16.6242 14.5841 16.5977 14.5344 16.5608 14.493C16.3038 14.265 15.8388 14.113 15.1688 14.065C14.8468 14.0445 14.5239 14.0435 14.2018 14.062ZM9.19679 15.009C8.87879 15.118 8.57679 15.239 8.30679 15.377C7.71979 15.677 7.43679 15.981 7.36279 16.244C7.28479 16.659 7.55479 16.917 7.87879 16.899C8.14879 16.884 8.38479 16.715 8.64479 16.26C8.78079 16.012 8.90012 15.7563 9.00279 15.493L9.10979 15.227L9.19679 15.009Z"
								fill="currentColor"
							/>
						</svg>
						{t('nav.exportAsPDF') || 'Export as PDF'}
					</Button>
					<Button
						onClick={() => {
							trackEvent(MixpanelEvent.Header_Export_PPTX_Button_Clicked, {
								pathname,
							})
							handleExportPptx()
							setIsMenuOpen(false)
						}}
						variant="ghost"
						className="w-full flex items-center gap-2 px-3 py-2 !text-indigo-600 hover:bg-gray-50 rounded-md transition-colors outline-none justify-start"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							className="!w-5 !h-5"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M21 6.75V16.5H19.5V6.75H16.5C15.9033 6.75 15.331 6.51295 14.909 6.09099C14.4871 5.66903 14.25 5.09674 14.25 4.5V1.5H6C5.60218 1.5 5.22064 1.65804 4.93934 1.93934C4.65804 2.22064 4.5 2.60218 4.5 3V16.5H3V3C3 2.20435 3.31607 1.44129 3.87868 0.87868C4.44129 0.316071 5.20435 0 6 0L14.25 0L21 6.75ZM2.25 17.775H4.65C5.084 17.775 5.45 17.8645 5.748 18.0435C6.05 18.2185 6.28 18.457 6.438 18.759C6.596 19.061 6.675 19.3995 6.675 19.7745C6.675 20.1495 6.595 20.488 6.435 20.79C6.276 21.089 6.044 21.326 5.739 21.501C5.4022 21.6826 5.02345 21.7721 4.641 21.7605H3.435V23.7735H2.25V17.775ZM5.34 20.346C5.42904 20.169 5.47284 19.9726 5.4675 19.7745C5.4675 19.4345 5.375 19.174 5.19 18.993C5.005 18.811 4.7485 18.72 4.4205 18.72H3.432V20.829H4.422C4.6162 20.834 4.80871 20.7918 4.983 20.706C5.13566 20.6249 5.26013 20.4993 5.34 20.346ZM7.293 17.775H9.693C10.127 17.775 10.493 17.8645 10.791 18.0435C11.093 18.2185 11.323 18.457 11.481 18.759C11.639 19.061 11.718 19.3995 11.718 19.7745C11.718 20.1495 11.638 20.488 11.478 20.79C11.32 21.089 11.088 21.326 10.782 21.501C10.4452 21.6826 10.0665 21.7721 9.684 21.7605H8.4795V23.7735H7.2945L7.293 17.775ZM10.383 20.346C10.472 20.169 10.5158 19.9726 10.5105 19.7745C10.5105 19.4345 10.418 19.174 10.233 18.993C10.049 18.811 9.7925 18.72 9.4635 18.72H8.475V20.829H9.465C9.6592 20.834 9.85171 20.7918 10.026 20.706C10.1787 20.6249 10.3031 20.4993 10.383 20.346ZM14.661 23.7735V18.768H16.3665V17.775H11.769V18.768H13.47V23.7735H14.661ZM20.355 17.775H21.6945L19.7835 20.7855L21.6645 23.7735H20.3025L19.0275 21.651H18.975L17.6955 23.7735H16.404L18.264 20.7495L16.422 17.775H17.8185L19.0665 19.9335H19.119L20.355 17.775Z"
								fill="currentColor"
							/>
						</svg>
						{t('nav.exportAsPPTX') || 'Export as PPTX'}
					</Button>

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
						<span className="text-sm font-medium font-inter">{t('nav.dashboard') || 'Dashboard'}</span>
					</Link>
					<div className="px-3 py-2 border-t border-gray-100">
						<LanguageSelector />
					</div>
				</div>
			</div>
		</>
	)
}

export default Header
