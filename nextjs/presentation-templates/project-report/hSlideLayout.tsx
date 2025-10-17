import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "three-column-icon-circles-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, three icon cards, separators, page number and action button"

const Schema = z.object({
    headerTitle: z.string().min(4).max(10).default("项目背景解析").meta({
        description: "Main header title text. Max 10 characters",
    }),
    headerSubtitle: z.string().min(10).max(40).default("Project background analysis").meta({
        description: "Header subtitle text. Max 8 words",
    }),
    logoText: z.string().min(4).max(12).default("YOUR LOGO").meta({
        description: "Logo or brand text shown in header. Max 3 words",
    }),
    decorativeImage: ImageSchema.default({
        "__image_url__": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        "__image_prompt__": "Decorative background image of people discussing documents and charts"
    }).meta({
        description: "Background decorative image. Max 30 words",
    }),
    columns: z.array(z.object({
        icon: IconSchema,
        title: z.string().min(3).max(8).default("添加小标题").meta({
            description: "Column title text. Max 8 Chinese characters",
        }),
        description: z.string().min(20).max(120).default("单击此处输入正文，请言简意赅的阐述观点；可酌情增减文字").meta({
            description: "Column description text. Max 30 words",
        }),
    })).min(3).max(3).default([
        {
            icon: {
                "__icon_url__": "/static/icons/placeholder.svg",
                "__icon_query__": "Document with clock white stroke icon"
            },
            title: "添加小标题",
            description: "单击此处输入正文，请言简意赅的阐述观点；可酌情增减文字"
        },
        {
            icon: {
                "__icon_url__": "/static/icons/placeholder.svg",
                "__icon_query__": "Cube with funnel white stroke icon"
            },
            title: "添加小标题",
            description: "单击此处输入正文，请言简意赅的阐述观点；可酌情增减文字"
        },
        {
            icon: {
                "__icon_url__": "/static/icons/placeholder.svg",
                "__icon_query__": "Document with pencil white stroke icon"
            },
            title: "添加小标题",
            description: "单击此处输入正文，请言简意赅的阐述观点；可酌情增减文字"
        }
    ]).meta({
        description: "Three column items each with icon, title and description. Exactly 3 items",
    }),
    pageNumber: z.string().min(2).max(3).default("01").meta({
        description: "Page number shown at bottom-left. Max 3 chars",
    }),
    buttonText: z.string().min(6).max(12).default("ANALYSIS").meta({
        description: "Bottom-right action button text. Max 2 words",
    })
})

type DynamicSlideLayoutData = z.infer<typeof Schema>

interface DynamicSlideLayoutProps {
    data?: Partial<DynamicSlideLayoutData>
}

const dynamicSlideLayout: React.FC<DynamicSlideLayoutProps> = ({ data: slideData }) => {
    const columns = slideData?.columns || []

    return (
        <>
            <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
                <img src={slideData?.decorativeImage?.__image_url__ || ""} alt={slideData?.decorativeImage?.__image_prompt__ || ""} className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none" />

                <div className="px-12 pt-8 flex items-start justify-between">
                    <div className="flex items-center">
                        <h1 className="font-['阿里巴巴普惠体'] text-[56px] leading-none text-[#9b0b0b] mr-4">
                            {slideData?.headerTitle || "项目背景解析"}
                        </h1>

                        <div className="w-[2px] h-10 bg-[#9b0b0b] opacity-90 mr-4"></div>

                        <p className="font-['微软雅黑'] text-[16px] text-gray-500">
                            {slideData?.headerSubtitle || "Project background analysis"}
                        </p>
                    </div>

                    <div className="font-['微软雅黑'] text-[20px] text-gray-600 mr-6">
                        {slideData?.logoText || "YOUR LOGO"}
                    </div>
                </div>

                <div className="relative px-20 mt-12">
                    <div className="absolute top-[160px] left-1/3 -translate-x-1/2 h-[220px] w-[1px] bg-gray-300 opacity-60"></div>
                    <div className="absolute top-[160px] left-2/3 -translate-x-1/2 h-[220px] w-[1px] bg-gray-300 opacity-60"></div>

                    <div className="grid grid-cols-3 gap-x-8 items-start">
                        {columns.map((col, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center">
                                <div className="w-[200px] h-[200px] rounded-full bg-[#9b0b0b] flex items-center justify-center">
                                    <img src={col.icon.__icon_url__} alt={col.icon.__icon_query__} className="w-[110px] h-[110px] object-contain" />
                                </div>

                                <h3 className="font-['阿里巴巴普惠体'] text-[22px] text-[#9b0b0b] mt-6">
                                    {col.title}
                                </h3>

                                <p className="font-['微软雅黑'] text-[14px] text-gray-500 leading-7 mt-3 max-w-[300px]">
                                    {col.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="absolute left-6 bottom-6 text-[96px] font-['微软雅黑'] text-gray-300 opacity-60 leading-none select-none">
                    {slideData?.pageNumber || "01"}
                </div>

                <div className="absolute right-10 bottom-8">
                    <button className="flex items-center gap-4 bg-[#a80b0b] text-white rounded-full px-6 py-3 shadow-md">
                        <span className="font-['阿里巴巴普惠体'] text-[16px] tracking-wider">
                            ANALYSIS
                        </span>
                        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="bg-white rounded-full p-[2px]">
                        <circle cx="17" cy="17" r="17" fill="#fff" />
                        <path d="M13 11L21 17L13 23" stroke="#a80b0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
