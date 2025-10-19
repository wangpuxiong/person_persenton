'use client'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Loader2 } from 'lucide-react'
const LoadingState = () => {
	const { t } = useTranslation('presentation')
	const [currentTipIndex, setCurrentTipIndex] = useState(0)
	const tips = [
		t('loading.loading_state.1'),
		t('loading.loading_state.2'),
		t('loading.loading_state.3'),
		t('loading.loading_state.4'),
		t('loading.loading_state.5'),
	]

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTipIndex((prev) => (prev + 1) % tips.length)
		}, 30000)

		return () => clearInterval(interval)
	}, [])

	return (
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto w-[500px] flex flex-col items-center justify-center max-w-full p-2 md:p-8">
			<div className="w-full bg-white rounded-xl p-[2px] ">
				<div className="bg-white rounded-xl p-6 w-full">
					<div className="flex items-center justify-center space-x-4 ">
						<h2 className="text-2xl font-semibold text-gray-800">
							{t('loading.create_presentation')}
						</h2>
					</div>
					<div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6 mb-4">
						<div className="min-h-[120px] flex flex-col items-center justify-center">
							<Loader2 className="md:hidden animate-spin text-indigo-600 font-bold w-10 h-10" />

							<p className="text-gray-700 text-lg text-center">
								{tips[currentTipIndex]}
							</p>
						</div>
					</div>

					<div className="w-full max-w-md">
						<div className="h-2 bg-gray-200 rounded-full overflow-hidden">
							<div className="h-full bg-[#5141e5] rounded-full animate-progress" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoadingState
