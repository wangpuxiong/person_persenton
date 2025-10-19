'use client'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { HelpCircle, X, Search } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

// 从翻译文件中获取帮助问题和答案
const getHelpQuestions = (t: Function) => {
	const questions = [
		{
			id: 1,
			category: 'Images',
			question: t('help.questions.1.question'),
			answer: t('help.questions.1.answer'),
		},
		{
			id: 2,
			category: 'Images',
			question: t('help.questions.2.question'),
			answer: t('help.questions.2.answer'),
		},
		{
			id: 3,
			category: 'Images',
			question: t('help.questions.3.question'),
			answer: t('help.questions.3.answer'),
		},
		{
			id: 11,
			category: 'AI Prompts',
			question: t('help.questions.11.question'),
			answer: t('help.questions.11.answer'),
		},
		{
			id: 12,
			category: 'AI Prompts',
			question: t('help.questions.12.question'),
			answer: t('help.questions.12.answer'),
		},
		{
			id: 14,
			category: 'AI Prompts',
			question: t('help.questions.14.question'),
			answer: t('help.questions.14.answer'),
		},
		{
			id: 4,
			category: 'Text',
			question: t('help.questions.4.question'),
			answer: t('help.questions.4.answer'),
		},
		{
			id: 5,
			category: 'Icons',
			question: t('help.questions.5.question'),
			answer: t('help.questions.5.answer'),
		},
		{
			id: 16,
			category: 'Layout',
			question: t('help.questions.16.question'),
			answer: t('help.questions.16.answer'),
		},
		{
			id: 15,
			category: 'Layout',
			question: t('help.questions.15.question'),
			answer: t('help.questions.15.answer'),
		},
		{
			id: 6,
			category: 'Layout',
			question: t('help.questions.6.question'),
			answer: t('help.questions.6.answer'),
		},
		{
			id: 8,
			category: 'Export',
			question: t('help.questions.8.question'),
			answer: t('help.questions.8.answer'),
		},
	];
	return questions;
}

const Help = () => {
	const { t } = useTranslation('presentation')
	const [isOpen, setIsOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [filteredQuestions, setFilteredQuestions] = useState<any[]>([])
	const [categories, setCategories] = useState<string[]>([])
	const [selectedCategory, setSelectedCategory] = useState('All')
	const [helpQuestions, setHelpQuestions] = useState<any[]>([])
	const modalRef = useRef<HTMLDivElement>(null)

	// 初始化帮助问题数据
	useEffect(() => {
		const questions = getHelpQuestions(t)
		setHelpQuestions(questions)
	}, [t])

	// 提取唯一分类并创建"All"分类列表
	useEffect(() => {
		if (helpQuestions.length > 0) {
			const uniqueCategories = Array.from(
				new Set(helpQuestions.map((q) => q.category))
			)
			setCategories(['All', ...uniqueCategories])
		}
	}, [helpQuestions])

	// 根据搜索查询和选定的分类筛选问题
	useEffect(() => {
		let results = helpQuestions

		// 如果不是"All"，则按分类筛选
		if (selectedCategory !== 'All') {
			results = results.filter((q) => q.category === selectedCategory)
		}

		// 按搜索查询筛选
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase()
			results = results.filter(
				(q) =>
					q.question.toLowerCase().includes(query) ||
					q.answer.toLowerCase().includes(query)
			)
		}

		setFilteredQuestions(results)
	}, [searchQuery, selectedCategory, helpQuestions])

	// Close modal when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target) &&
				!event.target.closest('.help-button')
			) {
				setIsOpen(false)
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen])

	const handleOpenClose = () => {
		setIsOpen(!isOpen)
	}

	// Animation helpers
	const modalClass = isOpen
		? 'opacity-100 scale-100'
		: 'opacity-0 scale-95 pointer-events-none'

	return (
		<>
			{/* Help Button */}
			<button
				onClick={handleOpenClose}
				className="help-button fixed bottom-4 right-4 md:right-6 size-10 md:size-12 z-50 bg-emerald-600 hover:bg-emerald-700 rounded-full flex justify-center items-center cursor-pointer shadow-lg transition-all duration-300 hover:shadow-xl"
				aria-label="Help Center"
			>
				{isOpen ? (
					<X className="text-white h-5 w-5" />
				) : (
					<HelpCircle className="text-white h-5 w-5" />
				)}
			</button>

			{/* Help Modal */}
			<div
				className={`fixed top-6 left-6 md:top-auto md:left-auto bottom-20 md:right-6 z-50 max-w-md w-[90%] md:w-full transition-all duration-300 transform max-h-90vh ${modalClass}`}
				ref={modalRef}
			>
				<div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-full">
					{/* Header */}
					<div className="bg-emerald-600 text-white px-6 py-4 flex justify-between items-center">
						<h2 className="text-lg font-medium">{t('help.title')}</h2>
						<button
							onClick={() => setIsOpen(false)}
							className="hover:bg-emerald-700 p-1 rounded"
						>
							<X className="h-5 w-5" />
						</button>
					</div>

					{/* Search */}
					<div className="px-6 pt-4 pb-2">
						<div className="relative">
							<input
								type="text"
								placeholder={t('help.search_placeholder')}
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
							/>
							<Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
						</div>
					</div>

					{/* Category Pills */}
					<div className="px-6 pb-3 flex flex-wrap gap-2 min-h-[40px]">
						{categories.map((category) => (
							<button
								key={category}
								onClick={() => setSelectedCategory(category)}
								className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
									selectedCategory === category
										? 'bg-emerald-600 text-white'
										: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
								}`}
							>
								{t(`help.category.${category}`)}
							</button>
						))}
					</div>

					{/* FAQ Accordion */}
					<div className="flex-grow max-h-96 overflow-y-auto px-6 pb-6">
						{filteredQuestions.length > 0 ? (
							<Accordion type="single" collapsible className="w-full">
								{filteredQuestions.map((faq, index) => (
									<AccordionItem
										key={index}
										value={`item-${index}`}
										className="border-b border-gray-200 last:border-b-0"
									>
										<AccordionTrigger className="hover:no-underline py-3 px-1 text-left flex">
											<div className="flex-1 pr-2">
												<span className="text-gray-900 font-medium text-sm md:text-base">
													{faq.question}
												</span>
												<span className="block text-xs text-emerald-600 mt-0.5">
								{t(`help.category.${faq.category}`)}
							</span>
											</div>
										</AccordionTrigger>
										<AccordionContent className="px-1 pb-3">
											<div className="text-sm text-gray-600 leading-relaxed rounded bg-gray-50 p-3">
												{faq.answer}
											</div>
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						) : (
							<div className="py-8 text-center text-gray-500">
								<p>{t('help.no_results', { searchQuery })}</p>
								<button
									onClick={() => {
										setSearchQuery('')
										setSelectedCategory('All')
									}}
									className="mt-2 text-emerald-600 hover:underline text-sm"
								>
									{t('help.clear_search')}
								</button>
							</div>
						)}
					</div>

					{/* Footer */}
					{/* <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-xs text-gray-500 text-center">
						Still need help?{" "}
						<a href="/contact" className="text-emerald-600 hover:underline">
							Contact Support
						</a>
					</div> */}
				</div>
			</div>

			{/* Custom AccordionTrigger implementation (since shadcn's might not be available) */}
			{!AccordionTrigger && (
				<style jsx>{`
					.accordion-trigger {
						display: flex;
						width: 100%;
						justify-content: space-between;
						align-items: center;
						padding: 0.75rem 0;
						text-align: left;
						transition: all 0.2s;
					}
					.accordion-trigger:hover {
						background-color: rgba(0, 0, 0, 0.02);
					}
					.accordion-content {
						overflow: hidden;
						height: 0;
						transition: height 0.2s ease;
					}
					.accordion-content[data-state='open'] {
						height: auto;
					}
				`}</style>
			)}
		</>
	)
}

export default Help
