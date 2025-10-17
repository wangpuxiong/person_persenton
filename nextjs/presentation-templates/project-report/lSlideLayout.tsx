import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-four-cards-accent-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, logo, and four cards"

const defaultCards = [
    {
        title: "请输入你的标题",
        description: "单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点",
        bullets: [
            "单击此处输入你的正文要点"
        ],
        variant: "pale"
    },
    {
        title: "请输入你的标题",
        description: "单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点",
        bullets: [
            "单击此处输入你的正文要点"
        ],
        variant: "pale"
    },
    {
        title: "请输入你的\n标题",
        description: "单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点",
        bullets: [
            "单击此处输入你的正文要点"
        ],
        variant: "accent"
    },
    {
        title: "请输入你的标题",
        description: "单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点",
        bullets: [
            "单击此处输入你的正文要点"
        ],
        variant: "pale"
    }
]

const Schema = z.object({
    headerTitle: z.string().min(2).max(12).default("项目进展情况").meta({
        description: "Main header title. Max 6 words",
    }),
    headerSubtitle: z.string().min(10).max(40).default("Project background analysis").meta({
        description: "Header subtitle text. Max 8 words",
    }),
    logo: ImageSchema.default({
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "Circular company logo, photo style"
    }).meta({
        description: "Top right logo image. Max 10 words",
    }),
    cards: z.array(z.object({
        title: z.string().min(4).max(18).meta({
            description: "Card title text. Max 4 words",
        }),
        description: z.string().min(30).max(240).meta({
            description: "Card body text. Max 40 words",
        }),
        bullets: z.array(z.string().min(1).max(120).default("要点示例")).min(1).max(6).default(["要点示例"]).meta({
            description: "List of bullet points in the card. Max 6 items",
        }),
        variant: z.string().min(1).max(6).default("pale").meta({
            description: "Visual variant of the card",
        })
    })).min(4).max(4).default(defaultCards).meta({
        description: "Array of card objects representing each card. Max 4 cards",
    }),
    pageNumber: z.string().min(1).max(3).default("02").meta({
        description: "Slide page number. 1-3 characters",
    }),
    analysisText: z.string().min(3).max(20).default("ANALYSIS").meta({
        description: "Text label in the analysis pill. Max 4 words",
    }),
    analysisIcon: IconSchema.default({
        __icon_url__: "",
        __icon_query__: "right arrow"
    }).meta({
        description: "Icon for the analysis pill. Max 3 words",
    })
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const dynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data: slideData }) => {
    const cards = slideData?.cards || defaultCards

    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
            <div className="w-full px-12 pt-8 flex items-start justify-between">
                <div className="flex items-center gap-6">
                    <h1 className="text-[64px] leading-[1] text-[#A80B0B] font-['优设标题黑']">
                        {slideData?.headerTitle || "项目进展情况"}
                    </h1>
                    <div className="w-[2px] h-[52px] bg-[#A80B0B]"></div>
                    <div className="text-[#7B7B7B] text-[16px] font-['阿里巴巴普惠体'] mt-3">
                        {slideData?.headerSubtitle || "Project background analysis"}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <img src={slideData?.logo?.__image_url__ || "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"} alt={slideData?.logo?.__image_prompt__ || "logo"} className="w-12 h-12 rounded-full object-cover border border-transparent"/>
                    <div className="text-[#666] text-[20px] font-['微软雅黑']">YOUR LOGO</div>
                </div>
            </div>

            <div className="w-full px-12 mt-8">
                <div className="grid grid-cols-4 gap-6 items-stretch">
                    {cards.map((card, idx) => (
                        <div key={idx} className="flex justify-center">
                            {card.variant === "accent" ? (
                                <div className="w-[300px] rounded-[20px] bg-[#990606] p-8 min-h-[360px] flex flex-col items-center text-center">
                                    <h3 className="text-white text-[28px] font-['优设标题黑'] mb-4 leading-[1.1]">
                                        {card.title}
                                    </h3>
                                    <div className="h-[2px] bg-white w-3/5 mb-6"></div>
                                    <p className="text-white text-[15px] font-['微软雅黑'] leading-7">
                                        {card.description}
                                    </p>
                                </div>
                            ) : (
                                <div className="w-[260px] rounded-[28px] bg-[#F8E7E7] p-4 shadow-inner">
                                    <div className="bg-white rounded-[20px] p-6 min-h-[320px] flex flex-col">
                                        <h3 className="text-[#B20B0B] text-[22px] font-['优设标题黑'] mb-3">
                                            {card.title}
                                        </h3>
                                        <div className="h-[2px] bg-[#B20B0B] w-full mb-4"></div>
                                        <p className="text-[#888] text-[15px] font-['微软雅黑'] leading-7 flex-1">
                                            {card.description}
                                        </p>
                                        <ul className="mt-4 space-y-2">
                                            {card.bullets && card.bullets.map((b, bi) => (
                                                <li key={bi} className="text-[#666] text-[14px] list-disc pl-4">
                                                    {b}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute left-8 bottom-8 text-[96px] text-[#CFCFCF] font-['微软雅黑'] leading-none">
                {slideData?.pageNumber || "02"}
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
    )
}

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
