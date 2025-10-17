import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-step-cards-footer-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, step cards, and footer paragraph"

const Schema = z.object({
    headerTitle: z.string().min(4).max(12).default("项目成果介绍").meta({
        description: "Main header text. Max 3 words",
    }),
    headerSubtitle: z.string().min(6).max(40).default("Project background analysis").meta({
        description: "Header subtitle text. Max 6 words",
    }),
    logoImage: ImageSchema.default({
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "logo photo on white background"
    }).meta({
        description: "Logo image with prompt and url. Max 10 words",
    }),
    cards: z.array(z.object({
        icon: IconSchema,
        bubbleText: z.string().min(20).max(120).default("单击此处输入正文，言简意赅阐述观点；酌情增减文字").meta({
            description: "White bubble body text inside card. Max 20 words",
        }),
        number: z.string().min(1).max(4).default("01").meta({
            description: "Card number displayed prominently. Max 2 words",
        }),
        title: z.string().min(2).max(24).default("添加标题").meta({
            description: "Card short title. Max 4 words",
        }),
    })).min(1).max(4).default([
        {
            icon: {
                __icon_url__: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><circle cx='24' cy='24' r='23' fill='%239b0a0a'/><text x='50%' y='55%' font-size='24' text-anchor='middle' fill='white' font-family='Arial' dy='.2em'>i</text></svg>",
                __icon_query__: "information circle icon"
            },
            bubbleText: "单击此处输入正文，言简意赅阐述观点；酌情增减文字",
            number: "01",
            title: "添加标题"
        },
        {
            icon: {
                __icon_url__: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><circle cx='24' cy='24' r='23' fill='%239b0a0a'/><text x='50%' y='55%' font-size='24' text-anchor='middle' fill='white' font-family='Arial' dy='.2em'>i</text></svg>",
                __icon_query__: "information circle icon"
            },
            bubbleText: "单击此处输入正文，言简意赅阐述观点；酌情增减文字",
            number: "02",
            title: "添加标题"
        },
        {
            icon: {
                __icon_url__: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><circle cx='24' cy='24' r='23' fill='%239b0a0a'/><text x='50%' y='55%' font-size='24' text-anchor='middle' fill='white' font-family='Arial' dy='.2em'>i</text></svg>",
                __icon_query__: "information circle icon"
            },
            bubbleText: "单击此处输入正文，言简意赅阐述观点；酌情增减文字",
            number: "03",
            title: "添加标题"
        },
        {
            icon: {
                __icon_url__: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><circle cx='24' cy='24' r='23' fill='%239b0a0a'/><text x='50%' y='55%' font-size='24' text-anchor='middle' fill='white' font-family='Arial' dy='.2em'>i</text></svg>",
                __icon_query__: "information circle icon"
            },
            bubbleText: "单击此处输入正文，言简意赅阐述观点；酌情增减文字",
            number: "04",
            title: "添加标题"
        }
    ]).meta({
        description: "Array of step cards each with icon, bubble text, number and title. Max 4 items",
    }),
    footerText: z.string().min(30).max(200).default("此处输入你的正文，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点；根据需要可酌情增减文字，以便观者可以准确理解您所传达的信息。").meta({
        description: "Footer paragraph text. Max 40 words",
    }),
    watermarkNumber: z.string().min(1).max(4).default("03").meta({
        description: "Large watermark number on the slide. Max 1 word",
    }),
    actionButton: z.object({
        text: z.string().min(3).max(20).default("ANALYSIS").meta({
            description: "Button label text. Max 2 words",
        }),
        icon: IconSchema.default({
            __icon_url__: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='none'><path d='M5 12h14M13 5l6 7-6 7' stroke='%239b0a0a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>",
            __icon_query__: "arrow right icon"
        })
    }).default({
        text: "ANALYSIS",
        icon: {
            __icon_url__: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='none'><path d='M5 12h14M13 5l6 7-6 7' stroke='%239b0a0a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>",
            __icon_query__: "arrow right icon"
        }
    }).meta({
        description: "Action button label and icon",
    })
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const dynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data: slideData }) => {
    const cards = slideData?.cards || []

    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
            <div className="px-12 pt-8 flex items-start justify-between">
                <div className="flex items-end gap-6">
                    <h1 className="text-[64px] leading-none text-[#9b0a0a] font-['微软雅黑']">
                        {slideData?.headerTitle || "项目成果介绍"}
                        <span className="inline-block w-[6px] h-[60px] bg-[#9b0a0a] align-middle ml-3 mr-6"></span>
                    </h1>
                    <p className="text-[16px] text-[#777] font-['阿里巴巴普惠体'] mt-4">
                        {slideData?.headerSubtitle || "Project background analysis"}
                    </p>
                </div>

                <div className="flex items-center space-x-3">
                    <img src={slideData?.logoImage?.__image_url__ || ""} alt={slideData?.logoImage?.__image_prompt__ || "logo"} className="w-[96px] h-[36px] object-cover rounded-sm"/>
                    <div className="text-[#666] text-[18px] font-['阿里巴巴普惠体']">YOUR LOGO</div>
                </div>
            </div>

            <div className="px-12 mt-6">
                <div className="flex justify-between items-start gap-6">
                    {cards.map((card, idx) => (
                        <div key={idx} className="flex flex-col items-center w-[260px]">
                            <div className="w-[84px] h-[84px] rounded-full bg-[#9b0a0a] flex items-center justify-center -mb-8 z-10">
                                <img src={card.icon.__icon_url__} alt={card.icon.__icon_query__} className="w-[48px] h-[48px]"/>
                            </div>

                            <div className="relative bg-[#9b0a0a] w-full rounded-[18px] pt-14 pb-10 px-6">
                                <div className="bg-white rounded-[16px] p-6 mx-auto w-[82%] text-center text-[#777] font-['阿里巴巴普惠体'] text-[14px] leading-6">
                                    {card.bubbleText || "单击此处输入正文，言简意赅阐述观点；酌情增减文字"}
                                    <svg className="mx-auto block mt-3" width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 0L28 18H0L14 0Z" fill="white"/>
                                    </svg>
                                </div>

                                <div className="absolute right-[-22px] top-28 w-[44px] h-[44px] transform rotate-45 bg-[#9b0a0a]"></div>

                                <div className="absolute -bottom-8 left-[36%] w-0 h-0 border-t-[26px] border-t-[#9b0a0a] border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent"></div>

                                <div className="mt-6 flex items-center gap-4 px-1">
                                    <div className="text-white text-[48px] font-['阿里巴巴普惠体'] leading-none">{card.number || "01"}</div>
                                    <div className="text-white text-[20px] font-['阿里巴巴普惠体']">{card.title || "添加标题"}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="px-12 mt-10">
                <p className="text-center text-[#9b9b9b] text-[16px] font-['阿里巴巴普惠体'] leading-7 max-w-[920px] mx-auto">
                    {slideData?.footerText || "此处输入你的正文，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点；根据需要可酌情增减文字，以便观者可以准确理解您所传达的信息。"}
                </p>
            </div>

            <div className="absolute left-8 bottom-16 text-[#d3d3d3] text-[96px] font-['阿里巴巴普惠体']">
                {slideData?.watermarkNumber || "03"}
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
