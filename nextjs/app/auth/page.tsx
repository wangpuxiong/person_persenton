'use client' // 添加这一行

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { redirect } from 'next/navigation'
import { LoadingSpinner } from '../(presentation-generator)/custom-template/components/LoadingSpinner'

/**
 * Authentication page to handle JWT token verification from URL params
 * This page will verify the token with the backend and create a user session
 */
export default function AuthPage() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const verifyToken = async () => {
			// Get token from URL search params
			const token = searchParams.get('token')

			if (!token) {
				setError('Please log in to Compare GPT before open this page')
				setIsLoading(false)
				return
			}

			try {
				setIsLoading(true)

				// Call the backend API to verify the token and create a session
				const response = await fetch(
					`/api/v1/auth/?token=${encodeURIComponent(token)}`,
					{
						method: 'GET',
						credentials: 'include', // Include cookies to store session
					}
				)

				if (response.ok) {
					// Token verification successful, user session created
					console.log('Authentication successful, session created')

					// Redirect to the upload page
					router.push('/upload')
				} else {
					// Handle authentication failure
					const errorData = await response.json()
					setError(errorData.detail || 'Authentication failed')
					setIsLoading(false)
				}
			} catch (err) {
				console.error('Error during token verification:', err)
				setError('Failed to connect to authentication server')
				setIsLoading(false)
			}
		}

		verifyToken()
	}, [searchParams, router])

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
				<div className="text-center w-full">
					<LoadingSpinner message="Please wait while we verify your session" />
				</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
			<div className="max-w-md w-full bg-white rounded-xl shadow-md p-6">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-800 mb-2">
						Authentication Error
					</h2>
					<p className="text-red-600 mb-6">
						{error || 'Unknown authentication error'}
					</p>
					<button
						onClick={() => window.open('https://comparegpt.io', '_blank')}
						className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
					>
						Return to CompareGPT
					</button>
				</div>
			</div>
		</div>
	)
}
