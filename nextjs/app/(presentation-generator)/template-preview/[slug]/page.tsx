'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter, usePathname } from 'next/navigation'
import LoadingStates from '../components/LoadingStates'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home, Trash2, Code, Save, X, Pencil } from 'lucide-react'
import { useLayout } from '@/app/(presentation-generator)/context/LayoutContext'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-jsx'
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'
import { useFontLoader } from '../../hooks/useFontLoader'
import { trackEvent, MixpanelEvent } from '@/utils/mixpanel'
import { getHeader } from '../../services/api/header'

const GroupLayoutPreview = () => {
	const params = useParams()
	const router = useRouter()
	const rawSlug = ((): string => {
		const value: any = (params as any)?.slug
		if (typeof value === 'string') return value
		if (
			Array.isArray(value) &&
			value.length > 0 &&
			typeof value[0] === 'string'
		)
			return value[0]
		return ''
	})()
	const pathname = usePathname()

	const { getFullDataByTemplateID, loading, refetch } = useLayout()
	const layoutGroup = getFullDataByTemplateID(rawSlug)

	// 获取模板元数据以检查其是否为官方，并获取模板信息
	const [templateMeta, setTemplateMeta] = useState<{
		name?: string
		description?: string
		template?: {
			is_official?: boolean
		}
	} | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	
	useEffect(() => {
		const fetchTemplateMeta = async () => {
			try {
				setIsLoading(true);
				const res = await fetch('/api/v1/ppt/template-management/summary', {
					method: 'GET',
					headers: getHeader(),
				});
				if (res.ok) {
					const data = await res.json();
					const template = data?.presentations.find((p: any) => p.presentation_id === rawSlug.substring(7));
					if (template) {
						setTemplateMeta({
							name: template.name,
							description: template.description,
							template: {
								is_official: template.template?.is_official
							}
						});
					}
				}
			} finally {
				setIsLoading(false);
			}
		};
		
		if (layoutGroup?.length > 0) {
			fetchTemplateMeta();
		}
	}, [layoutGroup]);

	//检查这是否是可以编辑的自定义模板
	//排除可编辑的官方模板
	const isCustom = rawSlug.startsWith('custom-') && !templateMeta?.template?.is_official;
	const presentationId = isCustom && rawSlug.length > 7 ? rawSlug.slice(7) : ''

	const [editorOpen, setEditorOpen] = useState(false)
	const [currentCode, setCurrentCode] = useState('')
	const [currentLayoutName, setCurrentLayoutName] = useState('')
	const [currentLayoutId, setCurrentLayoutId] = useState('')
	const [currentFonts, setCurrentFonts] = useState<string[] | undefined>(
		undefined
	)
	const [isSaving, setIsSaving] = useState(false)
	const [layoutsMap, setLayoutsMap] = useState<
		Record<
			string,
			{
				layout_id: string
				layout_name: string
				layout_code: string
				fonts?: string[]
			}
		>
	>({})

	useEffect(() => {
		const loadCustomLayouts = async () => {
			if (!isCustom || !presentationId) return
			try {
				const res = await fetch(
					`/api/v1/ppt/template-management/get-templates/${presentationId}`,
					{
						headers: getHeader(),
					}
				)
				if (!res.ok) return
				const data = await res.json()
				const map: Record<
					string,
					{
						layout_id: string
						layout_name: string
						layout_code: string
						fonts?: string[]
					}
				> = {}
				for (const l of data.layouts || []) {
					map[l.layout_name] = {
						layout_id: l.layout_id,
						layout_name: l.layout_name,
						layout_code: l.layout_code,
						fonts: l.fonts,
					}
				}
				setLayoutsMap(map)
				// Set template meta and inject aggregated fonts if provided
				if (data?.template) {
					setTemplateMeta({
						name: data.template.name,
						description: data.template.description,
						template: {
							is_official: false
						}
					})
				}
				if (Array.isArray(data?.fonts) && data.fonts.length) {
					useFontLoader(data.fonts)
				}
			} catch (e) {
				// noop
			}
		}
		loadCustomLayouts()
	}, [isCustom, presentationId])

	useEffect(() => {
		const existingScript = document.querySelector(
			'script[src*="tailwindcss.com"]'
		)
		if (!existingScript) {
			const script = document.createElement('script')
			script.src = 'https://cdn.tailwindcss.com'
			script.async = true
			document.head.appendChild(script)
		}
	}, [rawSlug])

	// Ensure fonts are injected if layoutsMap changes dynamically
	useEffect(() => {
		if (!isCustom) return
		const allFonts: string[] = []
		Object.values(layoutsMap).forEach((entry) => {
			;(entry.fonts || []).forEach((f) => allFonts.push(f))
		})
		if (allFonts.length) useFontLoader(allFonts)
	}, [layoutsMap, isCustom])

	const [slideContentStyle, setSlideContentStyle] =
		useState<React.CSSProperties>({})
	// TODO here
	function resizeSlide() {
		if (layoutGroup && layoutGroup.length > 1) {
			const slideElement = document.querySelector(
				`[data-name="layout-slide-container"]`
			)
			const width = slideElement?.clientWidth || 0
			if (width > 0 && width < 1280) {
				const scale = width / 1280 || 1
				setSlideContentStyle({
					transform: `scale(${scale})`,
					minWidth: '1280px',
					maxWidth: '1280px',
					minHeight: '720px',
					maxHeight: '720px',
					transformOrigin: 'top left',
				})
				return
			}
		}
		setSlideContentStyle({})
	}

	useEffect(() => {
		resizeSlide()
	}, [layoutGroup?.length])

	useEffect(() => {
		resizeSlide()
		window.addEventListener('resize', resizeSlide)
		return () => {
			window.removeEventListener('resize', resizeSlide)
		}
	}, [])

	// Handle empty state
	if (!layoutGroup || layoutGroup.length === 0) {
		return <LoadingStates type="empty" />
	}
	const deleteLayouts = async () => {
		refetch()
		router.back()
		const response = await fetch(
			`/api/v1/ppt/template-management/delete-templates/${presentationId}`,
			{
				method: 'DELETE',
				headers: getHeader(),
			}
		)
		if (response.ok) {
			router.push('/template-preview')
		}
	}

	const openEditor = (layoutName: string) => {
		const entry = layoutsMap[layoutName]
		if (!entry) return
		setCurrentLayoutName(entry.layout_name)
		setCurrentLayoutId(entry.layout_id)
		setCurrentCode(entry.layout_code || '')
		setCurrentFonts(entry.fonts)
		// Make sure fonts for this layout are loaded before editing
		useFontLoader(entry.fonts || [])
		setEditorOpen(true)
	}

	const handleCancel = () => {
		// reset to original code
		const entry = layoutsMap[currentLayoutName]
		if (entry) setCurrentCode(entry.layout_code || '')
		setEditorOpen(false)
	}

	const handleSave = async () => {
		try {
			setIsSaving(true)
			const payload = {
				layouts: [
					{
						presentation: presentationId,
						layout_id: currentLayoutId,
						layout_name: currentLayoutName,
						layout_code: currentCode,
						fonts: currentFonts,
					},
				],
			}
			const res = await fetch(
				`/api/v1/ppt/template-management/save-templates`,
				{
					method: 'POST',
					headers: getHeader(),
					body: JSON.stringify(payload),
				}
			)
			if (!res.ok) return
			// update cache map
			setLayoutsMap((prev) => ({
				...prev,
				[currentLayoutName]: {
					layout_id: currentLayoutId,
					layout_name: currentLayoutName,
					layout_code: currentCode,
					fonts: currentFonts,
				},
			}))
			await refetch()
			setEditorOpen(false)
		} finally {
			setIsSaving(false)
		}
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<header className="bg-white shadow-sm border-b sticky top-0 z-30">
				<div className="max-w-7xl mx-auto px-2 md:px-6 py-4 md:py-6">
					{/* Navigation */}
					<div className="flex items-center gap-4 mb-2 md:mb-4">
						<Button
							variant="outline"
							size="sm"
							onClick={() => {
								trackEvent(MixpanelEvent.TemplatePreview_Back_Button_Clicked, {
									pathname,
								})
								router.back()
							}}
							className="flex items-center gap-2"
						>
							<ArrowLeft className="w-4 h-4" />
							Back
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => {
								trackEvent(
									MixpanelEvent.TemplatePreview_All_Groups_Button_Clicked,
									{ pathname }
								)
								router.push('/template-preview')
							}}
							className="flex items-center gap-2"
						>
							<Home className="w-4 h-4" />
							All Templates
						</Button>
						{isCustom && (
							<button
								className=" border border-red-200 flex justify-center items-center gap-2 text-red-700 px-4 py-1 rounded-md"
								onClick={() => {
									trackEvent(
										MixpanelEvent.TemplatePreview_Delete_Templates_Button_Clicked,
										{ pathname }
									)
									trackEvent(
										MixpanelEvent.TemplatePreview_Delete_Templates_API_Call
									)
									deleteLayouts()
								}}
							>
								<Trash2 className="w-4 h-4" />
								Delete
							</button>
						)}
					</div>

					<div className="text-center">
						<h1 className="text-2xl md:text-3xl font-bold text-gray-900 capitalize">
							{templateMeta?.name || layoutGroup[0].templateID} Layouts
						</h1>
						<p className="text-gray-600 mt-2">
							{layoutGroup.length} layout{layoutGroup.length !== 1 ? 's' : ''} •{' '}
							{templateMeta?.description || layoutGroup[0].templateID}
						</p>
					</div>
				</div>
			</header>

			{/* Layout Grid */}
			<main className="max-w-7xl mx-auto px-2 py-4 md:px-6 md:py-8">
				<div className="space-y-4 md:space-y-8">
					{layoutGroup.map((layout: any, index: number) => {
						const {
							component: LayoutComponent,
							sampleData,
							name,
							fileName,
						} = layout

						return (
							<Card
								key={`${layoutGroup[0].templateID}-${index}`}
								className="overflow-hidden shadow-md hover:shadow-lg transition-shadow"
							>
								{/* Layout Header */}
								<div className="bg-white px-2 md:px-6 py-4 border-b">
									<div className="flex items-center justify-between gap-2">
										<div className="flex-1 w-1">
											<h3 className="text-md md:text-xl font-semibold text-gray-900 truncate">
												{name}
											</h3>
											<div className="flex items-center gap-4 mt-1">
												<span className="text-xs md:text-sm text-gray-500 font-mono shrink-1 truncate">
													{fileName}
												</span>
												<span className="inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 shrink-1 truncate">
													{layoutGroup[0].templateID}
												</span>
											</div>
										</div>
										<div className="flex items-center gap-2">
											<div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
												Layout #{index + 1}
											</div>
											{isCustom && (
												<Button
													variant="outline"
													size="sm"
													className="flex items-center gap-2 bg-blue-50 border border-blue-400 text-blue-700"
													onClick={() => {
														trackEvent(
															MixpanelEvent.TemplatePreview_Open_Editor_Button_Clicked,
															{ pathname }
														)
														openEditor(fileName)
													}}
													disabled={!layoutsMap[fileName]}
													title={
														!layoutsMap[fileName]
															? 'Loading layout code...'
															: 'Edit layout code'
													}
												>
													<Pencil className="w-4 h-4" /> Edit
												</Button>
											)}
										</div>
									</div>
								</div>

								{/* Layout Content */}
								<div
									className="bg-gray-50 aspect-video max-w-[1280px] w-full overflow-hidden"
									data-name="layout-slide-container"
								>
									<div style={slideContentStyle}>
										<LayoutComponent data={sampleData} />
									</div>
								</div>
							</Card>
						)
					})}
				</div>
			</main>

			{/* Footer */}
			<footer className="bg-white border-t md:mt-16">
				<div className="max-w-7xl mx-auto px-2 md:px-6 py-4 md:py-8">
					<div className="text-center text-gray-600">
						<p>
							{layoutGroup[0].templateID} • {layoutGroup.length} components
						</p>
					</div>
				</div>
			</footer>

			{/* Right-side Sheet Editor */}
			{isCustom && (
				<Sheet
					open={editorOpen}
					onOpenChange={(open) => {
						if (!open) handleCancel()
					}}
				>
					<SheetContent side="right" className="w-full sm:max-w-[860px] p-0">
						<SheetHeader className="px-6 py-4 border-b">
							<SheetTitle className="flex items-center justify-between w-full">
								<span className="flex items-center gap-2 text-purple-800">
									<Code className="w-5 h-5 text-purple-600" />
									HTML Editor
								</span>
							</SheetTitle>
						</SheetHeader>
						<div className="space-y-4 px-2 overflow-y-auto h-[85%]">
							<div className="container__content_area">
								<Editor
									value={currentCode}
									onValueChange={(code) => setCurrentCode(code)}
									highlight={(code) => highlight(code, languages.jsx!, 'jsx')}
									padding={10}
									id="layout-code-editor"
									name="layout-code-editor"
									className="container__editor"
								/>
							</div>
						</div>
						<SheetFooter className="px-6 py-4 border-b">
							<SheetTitle className="flex items-center justify-between w-full">
								<div></div>
								<div className="flex gap-2">
									<Button
										variant="outline"
										size="sm"
										onClick={handleCancel}
										className="flex items-center gap-1"
										disabled={isSaving}
									>
										<X size={14} />
										Cancel
									</Button>
									<Button
										onClick={handleSave}
										className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700"
										size="sm"
										disabled={isSaving}
									>
										<Save size={14} />
										Save HTML
									</Button>
								</div>
							</SheetTitle>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			)}
		</div>
	)
}

export default GroupLayoutPreview
