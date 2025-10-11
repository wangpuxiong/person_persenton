import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { TemplateSetting } from '@/app/(presentation-generator)/template-preview/types'

export async function GET() {
    try {
        // 获取演示文稿模板目录的路径
        const templatesDirectory = path.join(process.cwd(), 'presentation-templates')
        
        // 读取演示文稿模板目录下的所有子目录（布局模板目录）
        const items = await fs.readdir(templatesDirectory, { withFileTypes: true })
        
        // 过滤出布局模板目录（排除文件）
        const templateDirectories = items
            .filter(item => item.isDirectory())
            .map(dir => dir.name)
        
        const allLayouts: {templateName: string, templateID: string; files: string[]; settings: TemplateSetting | null }[] = []
        
        // 遍历每个布局模板目录
        for (const templateName of templateDirectories) {
            try {
                const templatePath = path.join(templatesDirectory, templateName)
                const templateFiles = await fs.readdir(templatePath)
                
                // 过滤出布局文件（排除测试文件、规范文件、设置文件）
                const layoutFiles = templateFiles.filter(file => 
                    file.endsWith('.tsx') && 
                    !file.startsWith('.') && 
                    !file.includes('.test.') &&
                    !file.includes('.spec.') &&
                    file !== 'settings.json'
                )
                
                // 读取布局模板目录下的settings.json文件（如果存在）
                let settings: TemplateSetting | null = null
                const settingsPath = path.join(templatePath, 'settings.json')
                try {
                    const settingsContent = await fs.readFile(settingsPath, 'utf-8')
                    settings = JSON.parse(settingsContent) as TemplateSetting
                } catch (settingsError) {
                    
                    console.warn(`No settings.json found for template ${templateName} or invalid JSON`)
                    // 如果settings.json不存在或无效，提供默认设置
                    settings = {
                        description: `${templateName} presentation layouts`,
                        ordered: false,
                        default: false
                    }
                   
                }

                if (layoutFiles.length > 0) {
                    allLayouts.push({
                        templateName: templateName,
                        templateID: templateName,
                        files: layoutFiles,
                        settings: settings
                    })
                }
            } catch (error) {
                console.error(`Error reading template directory ${templateName}:`, error)
                // 继续处理其他模板，即使当前模板失败
            }
        }
      
        
        return NextResponse.json(allLayouts)
    } catch (error) {
        console.error('Error reading presentation-templates directory:', error)
        return NextResponse.json(
            { error: 'Failed to read presentation-templates directory' },
            { status: 500 }
        )
    }
} 