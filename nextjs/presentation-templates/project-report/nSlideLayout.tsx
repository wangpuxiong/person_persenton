import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-description-features-image-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, description, feature items with icons, and image"

const Schema = z.object({
    topTitle: z.string().min(2).max(30).default("项目进展情况").meta({
        description: "Main header at the top. Max 6 words",
    }),
    topSubtitle: z.string().min(5).max(60).default("Project background analysis").meta({
        description: "Secondary header text next to the top title. Max 8 words",
    }),
    smallHeading: z.string().min(2).max(40).default("添加标题").meta({
        description: "Section small heading. Max 6 words",
    }),
    paragraph: z.string().min(20).max(220).default("单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点").meta({
        description: "Main descriptive paragraph. Max 40 words",
    }),
    features: z.array(z.object({
        title: z.string().min(2).max(30).default("添加小标题").meta({
            description: "Feature item title. Max 6 words",
        }),
        description: z.string().min(10).max(140).default("单击此处输入你的正文，请尽量言简意赅的阐述观点").meta({
            description: "Feature item description. Max 25 words",
        }),
        icon: IconSchema,
    })).min(1).max(3).default([
        {
            title: "添加小标题",
            description: "单击此处输入你的正文，请尽量言简意赅的阐述观点",
            icon: {
                "__icon_url__": "/static/icons/placeholder.svg",
                "__icon_query__": "info circle"
            }
        },
        {
            title: "添加小标题",
            description: "单击此处输入你的正文，请尽量言简意赅的阐述观点",
            icon: {
                "__icon_url__": "/static/icons/placeholder.svg",
                "__icon_query__": "info circle"
            }
        }
    ]).meta({
        description: "List of feature items with icons and descriptions. Max 3 items",
    }),
    bigNumber: z.string().min(1).max(4).default("02").meta({
        description: "Large decorative number at the bottom left. Max 2 words",
    }),
    logoText: z.string().min(2).max(20).default("YOUR LOGO").meta({
        description: "Top-right logo text. Max 3 words",
    }),
    image: ImageSchema.default({
        "__image_url__": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        "__image_prompt__": "business meeting around a laptop on a conference table"
    }).meta({
        description: "Main supporting image displayed in the mockup. Max 12 words",
    }),
    buttonText: z.string().min(2).max(20).default("ANALYSIS").meta({
        description: "Text for the bottom-right button. Max 2 words",
    }),
     buttonIcon: IconSchema.default({
        __icon_url__: "",
        __icon_query__: "round arrow"
    }).meta({
        description: "Icon for the button. Max 2 words",
    }),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const dynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data: slideData }) => {
    const features = slideData?.features || []

    return (
        <>
            <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
                <div className="w-full h-full p-8 grid grid-cols-12 gap-4">
                    <div className="col-span-7 flex flex-col">
                        <div className="flex items-center gap-4 mb-8">
                            <h1 className="text-[#a80b0b] text-[72px] leading-[72px] font-['阿里巴巴普惠体']">
                                {slideData?.topTitle || "项目进展情况"}
                            </h1>
                            <div className="h-[56px] border-r-2 border-[#a80b0b]"></div>
                            <p className="text-[#7b7b7b] text-[16px] font-['微软雅黑']">
                                {slideData?.topSubtitle || "Project background analysis"}
                            </p>
                        </div>

                        <div className="flex-1">
                            <h2 className="text-[#a80b0b] text-[28px] leading-[34px] font-['阿里巴巴普惠体'] mb-4">
                                {slideData?.smallHeading || "添加标题"}
                            </h2>

                            <p className="text-[#8b8b8b] text-[16px] leading-[28px] font-['微软雅黑'] max-w-[520px] mb-8">
                                {slideData?.paragraph || "单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点"}
                            </p>

                            <div className="flex flex-col gap-6">
                                {features.map((feat, idx) => (
                                    <div key={idx} className="flex items-start gap-4">
                                        <div className="w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center">
                                            <img src={feat.icon.__icon_url__} alt={feat.icon.__icon_query__} className="w-12 h-12 object-contain text-[#a80b0b]" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-[#a80b0b] text-[20px] leading-[26px] font-['阿里巴巴普惠体'] mb-2">
                                                {feat.title}
                                            </h3>
                                            <p className="text-[#8b8b8b] text-[15px] leading-[24px] font-['微软雅黑'] max-w-[480px]">
                                                {feat.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-auto">
                            <span className="text-[#d2d2d2] text-[120px] leading-[120px] font-['微软雅黑']">
                                {slideData?.bigNumber || "02"}
                            </span>
                        </div>
                    </div>

                    <div className="col-span-5 relative flex flex-col items-end pr-6">
                        <div className="absolute right-8 top-6">
                            <span className="text-[#6b6b6b] text-[18px] font-['微软雅黑']">
                                {slideData?.logoText || "YOUR LOGO"}
                            </span>
                        </div>

                        <div className="w-full flex justify-center items-center h-full">
                            <div className="relative" style={{ width: "640px", maxWidth: "100%" }}>
                                <div className="rounded-[10px] border-[10px] border-black overflow-hidden" style={{ background: "#000" }}>
                                    <img src={slideData?.image?.__image_url__ || ""} alt={slideData?.image?.__image_prompt__ || ""} className="w-full h-[360px] object-cover block" />
                                </div>

                                <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-6 w-[620px] h-8 bg-gradient-to-b from-[#c7c7c7] to-[#9b9b9b] rounded-b-lg shadow-md"></div>
                            </div>
                        </div>

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
        </>
    )
}

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
