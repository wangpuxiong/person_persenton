import React from 'react'
import { redirect } from 'next/navigation'

export const metadata = {
	title: 'Settings | CompareGPT.io',
	description: 'Settings page',
}
const page = () => {
	// 直接重定向到 dashboard，屏蔽设置页面
	redirect('/dashboard')
}

export default page
