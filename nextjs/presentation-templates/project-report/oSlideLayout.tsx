import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-title-button-circular-images-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, large title, button, and circular images and decorative shapes."

const Schema = z.object({
    topHeading: z.string().min(3).max(20).default("Part Three").meta({
        description: "Top small heading text. Max 3 words",
    }),
    smallChineseHeading: z.string().min(6).max(20).default("识别进度偏差和风险").meta({
        description: "Secondary heading text. Max 6 words",
    }),
    smallSubtext: z.string().min(10).max(60).default("Identify schedule deviations and risks").meta({
        description: "Small supporting subtext. Max 8 words",
    }),
    largeTitle: z.string().min(6).max(36).default("项目成果介绍").meta({
        description: "Large title text. Min 6 and max 18 Chinese characters visually. Max 6 words",
    }),
    buttonLabel: z.string().min(2).max(40).default("PROJECT BACKGROUND ANALYSIS").meta({
        description: "Button label text. Max 5 words",
    }),
    buttonIcon: IconSchema.default({
        "__icon_url__": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24'><path d='M8 5L16 12L8 19' stroke='%23990000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
        "__icon_query__": "right arrow svg"
    }).meta({
        description: "Icon shown inside the button",
    }),
    largeImage: ImageSchema.default({
        "__image_url__": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        "__image_prompt__": "city skyline large circular grayscale"
    }).meta({
        description: "Large right circular image",
    }),
    mediumImage: ImageSchema.default({
        "__image_url__": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        "__image_prompt__": "city skyline medium circular grayscale"
    }).meta({
        description: "Medium center circular image",
    }),
    decorativeShapes: z.array(IconSchema).min(3).max(6).default([
        {
            "__icon_url__": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='56' height='56'><circle cx='28' cy='28' r='28' fill='%23990000'/></svg>",
            "__icon_query__": "solid red filled circle"
        },
        {
            "__icon_url__": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'><rect width='96' height='96' rx='48' fill='%23f2d7d7'/></svg>",
            "__icon_query__": "concentric soft rounded square radial"
        },
        {
            "__icon_url__": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='88' height='88'><rect width='88' height='88' rx='44' fill='%23e9cfcf'/></svg>",
            "__icon_query__": "soft lower-left radial"
        },
        {
            "__icon_url__": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28'><circle cx='14' cy='14' r='14' fill='%23990000' opacity='0.7'/></svg>",
            "__icon_query__": "small faded central dot"
        }
    ]).meta({
        description: "Decorative shapes and soft dots represented as icons",
    }),
    infoText: z.string().min(1).max(3).default("i").meta({
        description: "Accessibility or decorative info text inside a circle. Max 1 word",
    }),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const dynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data: slideData }) => {
    return (
        <>
            <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
                <div className="w-full h-full flex">
                    <div className="flex-1 px-[64px] py-[48px] flex flex-col justify-start gap-[18px]">
                        <div className="flex items-start gap-6">
                            <div className="text-[64px] leading-[1] font-['微软雅黑'] text-gray-300">
                                {slideData?.topHeading || "Part Three"}
                            </div>
                            <div className="h-[48px] border-l-2 border-[#990000]"></div>
                            <div className="flex flex-col justify-center">
                                <div className="text-[20px] font-['微软雅黑'] text-[#333333]">
                                    {slideData?.smallChineseHeading || "识别进度偏差和风险"}
                                </div>
                                <div className="text-[14px] font-['微软雅黑'] text-gray-400 mt-[6px]">
                                    {slideData?.smallSubtext || "Identify schedule deviations and risks"}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="text-[#990000] font-['阿里巴巴普惠体'] font-extrabold text-[160px] leading-[0.9] tracking-[-2px]">
                                {slideData?.largeTitle || "项目成果介绍"}
                            </div>
                        </div>

                        <div className="mt-[18px]">
                            <button className="inline-flex items-center gap-4 bg-[#990000] text-white rounded-full px-6 h-[48px] text-[16px] font-['微软雅黑']">
                                <span className="uppercase">
                                    {slideData?.buttonLabel || "PROJECT BACKGROUND ANALYSIS"}
                                </span>
                                <span className="w-[32px] h-[32px] rounded-full bg-white flex items-center justify-center">
                                    <img
                                        src={slideData?.buttonIcon?.__icon_url__ || ""}
                                        alt={slideData?.buttonIcon?.__icon_query__ || "button icon"}
                                        className="w-[14px] h-[14px] object-contain"
                                    />
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="w-[520px] relative flex-none pr-[40px]">
                        <div className="absolute right-[-60px] top-[-40px] w-[640px] h-[640px] rounded-full overflow-hidden border-[16px] border-[#f4e6e6] bg-white shadow-sm flex items-center justify-center">
                            <img
                                src={slideData?.largeImage?.__image_url__ || ""}
                                alt={slideData?.largeImage?.__image_prompt__ || "city"}
                                className="w-full h-full object-cover grayscale opacity-90"
                            />
                        </div>

                        <div className="absolute left-[60px] top-[300px] w-[220px] h-[220px] rounded-full overflow-hidden border-[12px] border-[#f6e9e9] bg-white flex items-center justify-center shadow">
                            <img
                                src={slideData?.mediumImage?.__image_url__ || ""}
                                alt={slideData?.mediumImage?.__image_prompt__ || "city small"}
                                className="w-full h-full object-cover grayscale opacity-85"
                            />
                        </div>

                        <div className="absolute right-[160px] top-[24px] w-[56px] h-[56px] rounded-full">
                            <img
                                src={slideData?.decorativeShapes?.[0]?.__icon_url__ || ""}
                                alt={slideData?.decorativeShapes?.[0]?.__icon_query__ || "decorative dot"}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <div className="absolute right-[52px] top-[96px] w-[96px] h-[96px] rounded-full flex items-center justify-center">
                            <img
                                src={slideData?.decorativeShapes?.[1]?.__icon_url__ || ""}
                                alt={slideData?.decorativeShapes?.[1]?.__icon_query__ || "top right soft shape"}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <div className="absolute left-[-20px] bottom-[40px] w-[88px] h-[88px] rounded-full flex items-center justify-center">
                            <img
                                src={slideData?.decorativeShapes?.[2]?.__icon_url__ || ""}
                                alt={slideData?.decorativeShapes?.[2]?.__icon_query__ || "lower left soft shape"}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <div className="absolute left-[120px] top-[420px] w-[28px] h-[28px] rounded-full">
                            <img
                                src={slideData?.decorativeShapes?.[3]?.__icon_url__ || ""}
                                alt={slideData?.decorativeShapes?.[3]?.__icon_query__ || "small faded dot"}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                </div>

                <div className="absolute top-[22px] right-[22px]">
                    <div className="w-[36px] h-[36px] rounded-full bg-[#990000] flex items-center justify-center text-white font-['微软雅黑']">
                        {slideData?.infoText || "i"}
                    </div>
                </div>
            </div>
        </>
    )
}

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
