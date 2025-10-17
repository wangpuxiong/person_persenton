import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-image-cards-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, image, and cards"

const Schema = z.object({
    headerTitle: z.string().min(2).max(12).default("项目进展情况").meta({
        description: "Main header text. Max 3 words",
    }),
    headerSubtitle: z.string().min(3).max(60).default("Project background analysis").meta({
        description: "Secondary header subtitle. Max 8 words",
    }),
    brandIcon: IconSchema.default({
        __icon_url__: "",
        __icon_query__: "brand circle i"
    }).meta({
        description: "Brand icon used near the logo. Max 4 words",
    }),
    logoText: z.string().min(2).max(20).default("YOUR LOGO").meta({
        description: "Text representing the logo. Max 3 words",
    }),
    leftImage: ImageSchema.default({
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "business team meeting around table"
    }).meta({
        description: "Left supporting image. Max 12 words",
    }),
    cards: z.array(z.object({
        title: z.string().min(2).max(20).default("输入您的标题").meta({
            description: "Card title text. Max 4 words",
        }),
        description: z.string().min(20).max(300).default("单击这里修改填写您的文字内容或复制文本信息以下为示例文字模板内容支持一键更改配色在设计选项卡中找到变体菜单组并选择").meta({
            description: "Card descriptive text. Max 60 words",
        }),
        badgeText: z.string().min(1).max(4).default("01").meta({
            description: "Badge text inside card button. Max 2 words",
        })
    })).min(1).max(3).default([
        {
            title: "输入您的标题",
            description: "单击这里修改填写您的文字内容或复制文本信息以下为示例文字模板内容支持一键更改配色在设计选项卡中找到变体菜单组并选择",
            badgeText: "01"
        },
        {
            title: "输入您的标题",
            description: "单击这里修改填写您的文字内容或复制文本信息以下为示例文字模板内容支持一键更改配色在设计选项卡中找到变体菜单组并选择",
            badgeText: "02"
        },
        {
            title: "输入您的标题",
            description: "单击这里修改填写您的文字内容或复制文本信息以下为示例文字模板内容支持一键更改配色在设计选项卡中找到变体菜单组并选择",
            badgeText: "03"
        }
    ]).meta({
        description: "List of cards with title, description, and badge. Max 3 cards",
    }),
    footerNumber: z.string().min(1).max(4).default("02").meta({
        description: "Faded footer number text. Max 2 words",
    }),
    analysisPillText: z.string().min(3).max(20).default("ANALYSIS").meta({
        description: "Text inside the analysis pill. Max 2 words",
    }),
    analysisIcon: IconSchema.default({
        __icon_url__: "",
        __icon_query__: "round arrow"
    }).meta({
        description: "Round arrow icon used in analysis pill. Max 3 words",
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
            <div className="w-full h-full px-[56px] py-[28px] box-border flex flex-col">
                <div className="w-full flex items-start justify-between">
                    <div className="flex items-end gap-6">
                        <h1 className="text-[64px] leading-[72px] text-[#9a0d0d] font-['微软雅黑'] tracking-tight">
                            {slideData?.headerTitle || "项目进展情况"}
                        </h1>
                        <svg className="w-[2px] h-[48px] mt-[10px]" viewBox="0 0 2 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="2" height="48" rx="1" fill="#E5A8A8"/>
                        </svg>
                        <div className="mt-[26px] text-[16px] text-[#6b6b6b] font-['阿里巴巴普惠体']">
                            {slideData?.headerSubtitle || "Project background analysis"}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#eee] flex items-center justify-center text-[#8b8b8b] font-['阿里巴巴普惠体']">
                            {slideData?.brandIcon?.__icon_url__ ? (
                                <img src={slideData?.brandIcon?.__icon_url__} alt={slideData?.brandIcon?.__icon_query__ || ""} className="w-6 h-6 object-contain"/>
                            ) : (
                                <div className="text-[14px]">{slideData?.brandIcon?.__icon_query__ ? slideData?.brandIcon?.__icon_query__.slice(0,1) : "i"}</div>
                            )}
                        </div>
                        <div className="text-[20px] text-[#6b6b6b] font-['阿里巴巴普惠体']">
                            {slideData?.logoText || "YOUR LOGO"}
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex-1 flex gap-[36px] items-start">
                    <div className="w-[260px] flex-shrink-0">
                        <img src={slideData?.leftImage?.__image_url__ || ""} alt={slideData?.leftImage?.__image_prompt__ || "image"} className="w-[260px] h-[420px] object-cover rounded-sm shadow-sm"/>
                    </div>

                    <div className="flex-1 grid grid-cols-3 gap-[28px]">
                        {cards.map((card, idx) => (
                            <div key={idx} className="bg-white border-[6px] border-[#f6eaea] rounded-[14px] p-[28px] flex flex-col justify-between min-h-[420px]">
                                <div>
                                    <h3 className="text-[22px] text-[#be1212] font-['微软雅黑'] text-center">
                                        {card.title}
                                    </h3>
                                    <div className="w-[56px] h-[4px] bg-[#be1212] rounded mt-3 mx-auto"></div>
                                    <p className="mt-6 text-[16px] leading-[26px] text-[#7b7b7b] font-['阿里巴巴普惠体']">
                                        {card.description}
                                    </p>
                                </div>

                                <div className="mt-6 flex justify-center">
                                    <div className="bg-[#8e0a0a] text-white rounded-[10px] px-[34px] py-[14px] text-[18px] font-['微软雅黑']">
                                        {card.badgeText}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full mt-6 flex items-center justify-between">
                    <div className="text-[96px] text-[#d7d7d7] font-['阿里巴巴普惠体']">
                        {slideData?.footerNumber || "02"}
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
        </div>
    )
}

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
