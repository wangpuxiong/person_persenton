import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-two-column-image-icons-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, two-column content, image, icon blocks, and a button"

const Schema = z.object({
    headerChineseTitle: z.string().min(2).max(6).default("项目背景解析").meta({
        description: "Main header text in Chinese. Max 6 characters",
    }),
    headerEnglishLine: z.string().min(12).max(40).default("Project background analysis").meta({
        description: "English header line. Max 40 characters. Max 7 words",
    }),
    logoText: z.string().min(4).max(20).default("YOUR LOGO").meta({
        description: "Logo text shown in header. Max 20 characters",
    }),
    leftMainTitle: z.string().min(2).max(10).default("输入标题").meta({
        description: "Left column main heading. Max 10 Chinese characters",
    }),
    leftSubtitleEnglish: z.string().min(10).max(60).default("Review work contents details information's").meta({
        description: "Left small English subtitle. Max 60 characters. Max 10 words",
    }),
    paragraph1: z.string().min(40).max(280).default("单击此处输入你的正文，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点；根据需要可酌情增减文字，以便观者可以准确理解您所传达的信息。").meta({
        description: "Left paragraph block 1. Max 280 characters. Max 60 words",
    }),
    paragraph2: z.string().min(30).max(240).default("您的正文已经简明扼要，字字珠玑，但信息却错综复杂，需要用更多的文字来表述；请您尽可能提炼思想的精髓。").meta({
        description: "Left paragraph block 2. Max 240 characters. Max 50 words",
    }),
    image: ImageSchema.default({
        "__image_url__": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        "__image_prompt__": "Hands pointing at laptop and documents on wooden table"
    }).meta({
        description: "Main right column image. Max 30 words",
    }),
    iconBlocks: z.array(z.object({
        title: z.string().min(2).max(8).default("小标题").meta({
            description: "Icon block subtitle. Max 8 Chinese characters",
        }),
        description: z.string().min(10).max(80).default("单击此处输入你的正文阐述观点；").meta({
            description: "Icon block description. Max 80 characters. Max 15 words",
        }),
        icon: IconSchema,
    })).min(1).max(2).default([
        {
            title: "小标题",
            description: "单击此处输入你的正文阐述观点；",
            icon: {
                "__icon_url__": "/static/icons/placeholder.svg",
                "__icon_query__": "red circular arrow icon"
            }
        },
        {
            title: "小标题",
            description: "单击此处输入你的正文阐述观点；",
            icon: {
                "__icon_url__": "/static/icons/placeholder.svg",
                "__icon_query__": "red circular arrow icon"
            }
        }
    ]).meta({
        description: "Array of icon blocks each with title, description and icon. Max 2 items",
    }),
    analysisButtonText: z.string().min(4).max(12).default("Analysis").meta({
        description: "Text on the bottom-right button. Max 12 characters",
    }),
    pageNumber: z.string().min(1).max(3).default("01").meta({
        description: "Bottom-left page number. Max 3 characters",
    })
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const dynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data: slideData }) => {
    const iconBlocks = slideData?.iconBlocks || []

    return (
        <>
            <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
                {/* Header */}
                <div className="flex items-start justify-between px-12 pt-8">
                    <div className="flex items-center space-x-6">
                        <h1 className="text-[56px] font-['微软雅黑'] text-[#9f0b0b] leading-[1]">
                            {slideData?.headerChineseTitle || "项目背景解析"}
                        </h1>
                        <div className="h-[48px] w-[2px] bg-[#b84b4b] opacity-90"></div>
                        <div className="pt-[10px]">
                            <div className="text-[16px] font-['阿里巴巴普惠体'] text-[#7b7b7b]">
                                {slideData?.headerEnglishLine || "Project background analysis"}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 pr-6">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#9f0b0b] text-white font-bold">i</div>
                        <div className="text-[18px] font-['阿里巴巴普惠体'] text-[#666666]">
                            {slideData?.logoText || "YOUR LOGO"}
                        </div>
                    </div>
                </div>

                {/* Main content area */}
                <div className="grid grid-cols-12 gap-6 px-12 pt-8">
                    <div className="col-span-6 pr-6 flex flex-col">
                        <h2 className="text-[48px] font-['微软雅黑'] text-[#9f0b0b] leading-[1] mb-2">
                            {slideData?.leftMainTitle || "输入标题"}
                        </h2>

                        <div className="text-[16px] font-['阿里巴巴普惠体'] text-[#7b7b7b] mb-4">
                            {slideData?.leftSubtitleEnglish || "Review work contents details information's"}
                        </div>
                        <div className="w-[64px] h-[12px] rounded-full bg-[#9f0b0b] mb-6"></div>

                        <p className="text-[18px] font-['阿里巴巴普惠体'] text-[#9b9b9b] leading-[1.9] mb-6">
                            {slideData?.paragraph1 || "单击此处输入你的正文，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点；根据需要可酌情增减文字，以便观者可以准确理解您所传达的信息。"}
                        </p>

                        <p className="text-[18px] font-['阿里巴巴普惠体'] text-[#9b9b9b] leading-[1.9]">
                            {slideData?.paragraph2 || "您的正文已经简明扼要，字字珠玑，但信息却错综复杂，需要用更多的文字来表述；请您尽可能提炼思想的精髓。"}
                        </p>
                    </div>

                    <div className="col-span-6 pl-6 flex flex-col">
                        <div className="w-full bg-gray-100 overflow-hidden">
                            <img src={slideData?.image?.__image_url__ || ""} alt={slideData?.image?.__image_prompt__ || "presentation image"} className="w-full h-[300px] object-cover" />
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-8 items-start">
                            {iconBlocks.map((block, idx) => (
                                <div key={idx} className="flex items-start space-x-6">
                                    <div className="w-[80px] h-[80px] flex items-center justify-center">
                                        {/* If icon URL is an SVG path, render as img, else fallback to inline SVG placeholder */}
                                        {block.icon?.__icon_url__ ? (
                                            <img src={block.icon.__icon_url__} alt={block.icon.__icon_query__} className="w-[80px] h-[80px] object-contain" />
                                        ) : (
                                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="40" cy="40" r="40" fill="#9f0b0b"/>
                                                <circle cx="40" cy="40" r="26" fill="white"/>
                                                <path d="M45 40H33" stroke="#9f0b0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M38 33L32 40L38 47" stroke="#9f0b0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        )}
                                    </div>
                                    <div>
                                        <div className="text-[20px] font-['微软雅黑'] text-[#9f0b0b] mb-2">
                                            {block.title}
                                        </div>
                                        <div className="text-[16px] font-['阿里巴巴普惠体'] text-[#7b7b7b] leading-[1.7]">
                                            {block.description}
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                </div>

                <div className="absolute left-8 bottom-6 text-[88px] font-['阿里巴巴普惠体'] text-[#bfbfbf] opacity-30">
                    {slideData?.pageNumber || "01"}
                </div>
            </div>
        </>
    )
}

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
