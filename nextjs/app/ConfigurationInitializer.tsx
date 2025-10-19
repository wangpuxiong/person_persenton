'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { setCanChangeKeys, setLLMConfig } from '@/store/slices/userConfig'
import { hasValidLLMConfig } from '@/utils/storeHelpers'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { checkIfSelectedOllamaModelIsPulled } from '@/utils/providerUtils'
import { LLMConfig } from '@/types/llm_config'
import { useAuth } from '@/app/hooks/useAuth'
import { ApiError } from '@/app/(presentation-generator)/services/api/api-error-handler'
import { toast } from 'sonner'

export function ConfigurationInitializer({
	children,
}: {
	children: React.ReactNode
}) {
	const { t } = useTranslation('common')
	const dispatch = useDispatch()
	const [isLoading, setIsLoading] = useState(true)
	const router = useRouter()
	const route = usePathname()
	const { isAuthenticated, checkAuthentication, handleAuthError } = useAuth()

	// 获取用户配置状态并检查身份验证
	useEffect(() => {
		initApp()
		setupGlobalErrorHandlers()
	}, [])

	// 卸载时清理全局错误处理程序
	useEffect(() => {
		return () => {
			window.removeEventListener('unhandledrejection', handleGlobalRejection)
			window.removeEventListener('error', handleGlobalError)
		}
	}, [])

	const setupGlobalErrorHandlers = () => {
		// 处理未捕获的 Promise 拒绝
		window.addEventListener('unhandledrejection', handleGlobalRejection)
		// 处理常规未捕获错误
		window.addEventListener('error', handleGlobalError)
	}

	const handleGlobalRejection = (event: PromiseRejectionEvent) => {
		const error = event.reason
		if (error instanceof ApiError && error.isAuthenticationError) {
			event.preventDefault() // 阻止默认浏览器行为
			handleAuthError()
		}
	}

	const handleGlobalError = (event: ErrorEvent) => {
		const error = event.error
		if (error instanceof ApiError && error.isAuthenticationError) {
			event.preventDefault() // 阻止默认浏览器行为
			handleAuthError()
		}
	}

	const initApp = async () => {
		try {
			// 首先检查用户是否经过身份验证
			if (!isAuthenticated) {
				const authResult = await checkAuthentication()
				if (!authResult) {
					// 未经验证的用户，不可用系统
					if (route !== '/auth') {
						router.push('/auth')
						setIsLoading(false)
						return
					}
				}
			}

			// 跳转
			if (route === '/') {
				router.push('/upload')
				setLoadingToFalseAfterNavigatingTo('/upload')
			} else {
				setIsLoading(false)
			}
		} catch (error) {
			console.error('Initialization error:', error)
			if (error instanceof ApiError && error.isAuthenticationError) {
				handleAuthError()
			} else {
				toast.error(
					t('configuration.failedToInitializeApplication')
				)
				setIsLoading(false)
			}
		}
	}

	const setLoadingToFalseAfterNavigatingTo = (pathname: string) => {
		const interval = setInterval(() => {
			if (window.location.pathname === pathname) {
				clearInterval(interval)
				setIsLoading(false)
			}
		}, 500)
	}

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-[#E9E8F8] via-[#F5F4FF] to-[#E0DFF7] flex items-center justify-center p-4">
				<div className="max-w-md w-full">
					<div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 text-center">
						{/* Logo/Branding */}
						<div className="mb-6 flex justify-center items-center gap-2">
							<img className="w-[40px]" src="/512.png" />
							<h1 className="text-2xl text-indigo-600 font-bold">CompareGPT</h1>
						</div>

						{/* Loading Text */}
						<div className="space-y-2">
							<h3 className="text-lg font-semibold text-gray-800 font-inter">
								{t('configuration.initializingApplication')}
							</h3>
							<p className="text-sm text-gray-600 font-inter">
								{t('configuration.loadingConfigurationAndCheckingModelAvailability')}
							</p>
						</div>

						{/* Progress Indicator */}
						<div className="mt-6">
							<div className="flex space-x-1 justify-center">
								<div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
								<div
									className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"
									style={{ animationDelay: '0.2s' }}
								></div>
								<div
									className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
									style={{ animationDelay: '0.4s' }}
								></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return children
}
