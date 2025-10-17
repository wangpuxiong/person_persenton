import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-left-overlay-image-grid-stats-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, left image with overlay, middle images, and right stat cards."

const Schema = z.object({
    headerTitle: z.string().min(2).max(40).default("项目成果介绍").meta({
        description: "Main header text. Max 6 words",
    }),
    headerSubtitle: z.string().min(5).max(80).default("Project background analysis").meta({
        description: "Header subtitle text. Max 10 words",
    }),
    logoText: z.string().min(2).max(30).default("YOUR LOGO").meta({
        description: "Top-right logo text. Max 3 words",
    }),
    leftImage: ImageSchema.default({
        "__image_url__": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "__image_prompt__": "people working around a laptop and paperwork on desk"
    }).meta({
        description: "Left large image with overlay",
    }),
    overlayTitle: z.string().min(2).max(40).default("添加标题").meta({
        description: "Overlay title on left image. Max 6 words",
    }),
    overlayDescription: z.string().min(10).max(200).default("单击此处输入你的正文，请尽量言简意赅的阐述观点。").meta({
        description: "Overlay description text. Max 30 words",
    }),
    middleTopImage: ImageSchema.default({
        "__image_url__": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "__image_prompt__": "middle column top image of meeting and laptop"
    }).meta({
        description: "Middle column top image",
    }),
    middleBottomImage: ImageSchema.default({
        "__image_url__": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "__image_prompt__": "middle column bottom image of hands and documents"
    }).meta({
        description: "Middle column bottom image",
    }),
    stats: z.array(z.object({
        percent: z.string().min(2).max(6).default("68%").meta({
            description: "Statistic percentage text. Max 3 characters",
        }),
        smallTitle: z.string().min(2).max(40).default("添加小标题").meta({
            description: "Small title for stat box. Max 4 words",
        }),
        content: z.string().min(5).max(120).default("单击此处添加\n小标题内容").meta({
            description: "Multi-line content for stat box. Max 20 words",
        }),
        image: ImageSchema,
    })).min(1).max(2).default([
        {
            percent: "68%",
            smallTitle: "添加小标题",
            content: "单击此处添加\n小标题内容",
            image: {
                "__image_url__": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                "__image_prompt__": "top right image of people around laptop"
            }
        },
        {
            percent: "95%",
            smallTitle: "添加小标题",
            content: "单击此处添加\n小标题内容",
            image: {
                "__image_url__": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                "__image_prompt__": "bottom right image of hands pointing at documents"
            }
        }
    ]).meta({
        description: "List of stat boxes each with percent, title, content and image. Max 2 items",
    }),
    pageNumber: z.string().min(1).max(6).default("03").meta({
        description: "Large page number text. Max 2 characters",
    }),
    buttonText: z.string().min(2).max(20).default("ANALYSIS").meta({
        description: "Text inside the action button. Max 2 words",
    }),
    buttonIcon: IconSchema.default({
        "__icon_url__": "https://static.icons/arrow-right.png",
        "__icon_query__": "round arrow right"
    }).meta({
        description: "Icon for the analysis button",
    })
})

type SlideData = z.infer<typeof Schema>

interface SlideProps {
    data?: Partial<SlideData>
}

const dynamicSlideLayout: React.FC<SlideProps> = ({ data: slideData }) => {
    const stats = slideData?.stats || []

    return (
        <>
            <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
                {/* Header */}
                <div className="flex items-start justify-between px-[56px] pt-[28px]">
                    <div className="flex items-center space-x-6">
                        <h1 className="text-[#9b0b0b] font-['微软雅黑'] font-extrabold text-[64px] leading-[64px] tracking-[-1px]">
                            {slideData?.headerTitle || "项目成果介绍"}
                        </h1>
                        <div className="w-[3px] h-[56px] bg-[#b02a2a]"></div>
                        <div className="text-[#6b6b6b] font-['阿里巴巴普惠体'] text-[18px] leading-[28px]">
                            {slideData?.headerSubtitle || "Project background analysis"}
                        </div>
                    </div>
                    <div className="text-[#666666] font-['阿里巴巴普惠体'] text-[20px] leading-[24px]">
                        {slideData?.logoText || "YOUR LOGO"}
                    </div>
                </div>

                {/* Main content grid */}
                <div className="px-[56px] mt-[24px] grid grid-cols-[520px_200px_1fr] gap-[20px] items-stretch">
                    {/* Left large image with red overlay content */}
                    <div className="relative overflow-hidden rounded-sm">
                        <img src={slideData?.leftImage?.__image_url__ || ""} alt={slideData?.leftImage?.__image_prompt__ || ""} className="w-full h-[380px] object-cover" />
                        <div className="absolute left-0 top-0 h-full w-[45%] bg-[rgba(155,11,11,0.85)] p-[32px] flex flex-col justify-end">
                            <h2 className="text-white font-['微软雅黑'] text-[28px] leading-[36px] mb-[12px]">
                                {slideData?.overlayTitle || "添加标题"}
                            </h2>
                            <p className="text-white font-['阿里巴巴普惠体'] text-[14px] leading-[24px] max-w-[220px]">
                                {slideData?.overlayDescription || "单击此处输入你的正文，请尽量言简意赅的阐述观点。"}
                            </p>
                        </div>
                    </div>

                    {/* Middle narrow images */}
                    <div className="overflow-hidden rounded-sm">
                        <img src={slideData?.middleTopImage?.__image_url__ || ""} alt={slideData?.middleTopImage?.__image_prompt__ || ""} className="w-full h-[180px] object-cover" />
                        <img src={slideData?.middleBottomImage?.__image_url__ || ""} alt={slideData?.middleBottomImage?.__image_prompt__ || ""} className="w-full h-[180px] object-cover mt-[20px]" />
                    </div>

                    {/* Right column: two rows each with red stat box and image */}
                    <div className="grid grid-rows-2 gap-[20px]">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="grid grid-cols-[1fr_1fr] gap-[12px] items-stretch">
                                <div className="bg-[#9b0b0b] text-white p-[22px] flex flex-col justify-center rounded-sm">
                                    <div className="text-[48px] font-['微软雅黑'] font-semibold leading-[56px] text-center">
                                        {stat.percent}
                                    </div>
                                    <div className="border-t border-[rgba(255,255,255,0.2)] my-[10px]"></div>
                                    <div className="text-[18px] font-['阿里巴巴普惠体'] text-center mb-[6px]">
                                        {stat.smallTitle}
                                    </div>
                                    <div className="text-[14px] font-['阿里巴巴普惠体'] text-[rgba(255,255,255,0.95)] text-center leading-[22px] whitespace-pre-line">
                                        {stat.content}
                                    </div>
                                </div>
                                <div className="overflow-hidden rounded-sm">
                                    <img src={stat.image?.__image_url__ || ""} alt={stat.image?.__image_prompt__ || ""} className="w-full h-full object-cover" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom left large page number */}
                <div className="absolute left-[56px] bottom-[26px] text-[#bdbdbd] font-['阿里巴巴普惠体'] text-[96px] leading-[96px]">
                    {slideData?.pageNumber || "03"}
                </div>

                {/* Bottom right analysis button */}
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
