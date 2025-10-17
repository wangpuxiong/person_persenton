import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "left-visual-circles-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with left text content, a right visual column with circular images, and decorative shapes."

const Schema = z.object({
    topSmallHeading: z.string().min(6).max(12).default("Part Four").meta({
        description: "Top small heading. Max 12 characters. Max 3 words",
    }),
    smallColumnTitle: z.string().min(6).max(20).default("识别进度偏差和风险").meta({
        description: "Small column title text. Max 20 characters. Max 6 words",
    }),
    smallColumnSubtitle: z.string().min(20).max(60).default("Identify schedule deviations and risks").meta({
        description: "Small column subtitle. Max 60 characters. Max 10 words",
    }),
    bigHeadline: z.string().min(6).max(12).default("最新工作计划").meta({
        description: "Big Chinese headline. Supports fullwidth CJK chars. Max 12 characters",
    }),
    ctaText: z.string().min(10).max(40).default("PROJECT BACKGROUND ANALYSIS").meta({
        description: "Call to action text. Max 40 characters. Max 6 words",
    }),
    ctaIcon: IconSchema.default({
        "__icon_url__": "/static/icons/placeholder.svg",
        "__icon_query__": "circular arrow inside white circle with red stroke"
    }).meta({
        description: "Icon used inside the CTA button. Max 6 words",
    }),
    largeImage: ImageSchema.default({
        "__image_url__": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        "__image_prompt__": "large city skyline photo, grayscale, high contrast"
    }).meta({
        description: "Large circular image on the right. Max 30 words",
    }),
    mediumImage: ImageSchema.default({
        "__image_url__": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        "__image_prompt__": "medium circular crop of city skyline"
    }).meta({
        description: "Medium circular image near the large image. Max 30 words",
    }),
    ringStrokeGraphic: IconSchema.default({
        "__icon_url__": "/static/icons/placeholder.svg",
        "__icon_query__": "thin outer stroke circle SVG"
    }).meta({
        description: "Thin outer stroke graphic for large circle",
    }),
    topRedDotIcon: IconSchema.default({
        "__icon_url__": "/static/icons/placeholder.svg",
        "__icon_query__": "small solid red dot"
    }).meta({
        description: "Top small solid red dot decorative element",
    }),
    topRightGradient: ImageSchema.default({
        "__image_url__": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        "__image_prompt__": "top-right layered soft concentric rounded square gradient"
    }).meta({
        description: "Top-right layered soft concentric shape graphic",
    }),
    bottomLeftGradient: ImageSchema.default({
        "__image_url__": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        "__image_prompt__": "bottom-left layered soft concentric rounded square gradient"
    }).meta({
        description: "Bottom-left layered soft concentric shape graphic",
    }),
    softGlowDot: IconSchema.default({
        "__icon_url__": "/static/icons/placeholder.svg",
        "__icon_query__": "soft small red glow circle"
    }).meta({
        description: "Soft small red glow decorative element",
    }),
    bottomRightCircle: IconSchema.default({
        "__icon_url__": "/static/icons/placeholder.svg",
        "__icon_query__": "muted solid circle decorative element"
    }).meta({
        description: "Bottom-right muted solid circle decorative element",
    }),
    infoIcon: IconSchema.default({
        "__icon_url__": "/static/icons/placeholder.svg",
        "__icon_query__": "informational circle icon with letter i"
    }).meta({
        description: "Accessibility informational circle icon",
    })
})

type LeftVisualCirclesSlideData = z.infer<typeof Schema>

interface LeftVisualCirclesSlideLayoutProps {
    data?: Partial<LeftVisualCirclesSlideData>
}

const dynamicSlideLayout: React.FC<LeftVisualCirclesSlideLayoutProps> = ({ data: slideData }) => {
    return (
        <>
            <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
                <div className="flex h-full w-full">
                    <div className="flex flex-col justify-start pl-[56px] pr-8 pt-8 pb-8 w-1/2">
                        <div className="flex items-center gap-6 mb-6">
                            <div className="text-[56px] leading-[56px] text-gray-300 font-light font-['微软雅黑']">
                                {slideData?.topSmallHeading || "Part Four"}
                            </div>

                            <svg className="w-[6px] h-[56px] -my-2" viewBox="0 0 6 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                <rect x="0" y="0" width="6" height="56" rx="3" fill="#9C0C0C"/>
                            </svg>

                            <div className="flex flex-col">
                                <div className="text-[20px] text-[#333333] font-['微软雅黑'] leading-[28px]">
                                    {slideData?.smallColumnTitle || "识别进度偏差和风险"}
                                </div>
                                <div className="text-[14px] text-gray-400 font-['阿里巴巴普惠体'] mt-1">
                                    {slideData?.smallColumnSubtitle || "Identify schedule deviations and risks"}
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h1 className="text-[#9C0C0C] font-['微软雅黑'] font-extrabold leading-[0.9] tracking-[-2px] text-[160px]">
                                {slideData?.bigHeadline || "最新工作计划"}
                            </h1>
                        </div>

                        <div className="mt-8">
                            <button className="inline-flex items-center gap-4 bg-[#9C0C0C] text-white rounded-full px-8 py-3 min-h-[48px] text-[16px] font-['阿里巴巴普惠体']">
                                <span>{slideData?.ctaText || "PROJECT BACKGROUND ANALYSIS"}</span>
                                {slideData?.ctaIcon?.__icon_url__ ? (
                                    <img src={slideData?.ctaIcon?.__icon_url__} alt={slideData?.ctaIcon?.__icon_query__ || "cta icon"} className="w-8 h-8 bg-white rounded-full p-1 text-[#9C0C0C] flex-shrink-0" />
                                ) : (
                                    <svg className="w-8 h-8 bg-white rounded-full p-1 text-[#9C0C0C] flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                        <circle cx="12" cy="12" r="11" stroke="#9C0C0C" strokeWidth="1.5" fill="white"/>
                                        <path d="M10 8L14 12L10 16" stroke="#9C0C0C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="relative w-1/2 pr-[48px] flex items-center justify-end">
                        <div className="relative">
                            <div className="w-[560px] h-[560px] rounded-full overflow-hidden border-[28px] border-[rgba(241,215,215,0.9)] shadow-sm">
                                <img src={slideData?.largeImage?.__image_url__ || ""} alt={slideData?.largeImage?.__image_prompt__ || ""} className="w-full h-full object-cover"/>
                            </div>

                            <svg className="absolute -right-6 -bottom-6 w-[620px] h-[620px]" viewBox="0 0 620 620" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                <circle cx="310" cy="310" r="308" stroke="rgba(220,190,190,0.25)" strokeWidth="4"/>
                            </svg>
                        </div>

                        <div className="absolute left-8 top-[50%] translate-y-[-50%] w-[180px] h-[180px] rounded-full overflow-hidden border-[12px] border-[rgba(241,215,215,0.9)] shadow-sm">
                            <img src={slideData?.mediumImage?.__image_url__ || ""} alt={slideData?.mediumImage?.__image_prompt__ || ""} className="w-full h-full object-cover"/>
                        </div>
                    </div>
                </div>

                <div className="absolute right-[240px] top-8 w-[48px] h-[48px] rounded-full shadow-sm" style={{backgroundColor: "transparent"}}>
                    {slideData?.topRedDotIcon?.__icon_url__ ? (
                        <img src={slideData?.topRedDotIcon?.__icon_url__} alt={slideData?.topRedDotIcon?.__icon_query__ || "red dot"} className="w-full h-full rounded-full"/>
                    ) : (
                        <div className="w-full h-full bg-[#9C0C0C] rounded-full"></div>
                    )}
                </div>

                <div className="absolute right-16 top-10 w-[98px] h-[98px]">
                    {slideData?.topRightGradient?.__image_url__ ? (
                        <img src={slideData?.topRightGradient?.__image_url__} alt={slideData?.topRightGradient?.__image_prompt__ || "top right gradient"} className="w-full h-full"/>
                    ) : (
                        <svg className="w-full h-full" viewBox="0 0 98 98" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                            <rect width="98" height="98" rx="48" fill="#F5DADC"/>
                        </svg>
                    )}
                </div>

                <div className="absolute left-6 bottom-10 w-[140px] h-[140px]">
                    {slideData?.bottomLeftGradient?.__image_url__ ? (
                        <img src={slideData?.bottomLeftGradient?.__image_url__} alt={slideData?.bottomLeftGradient?.__image_prompt__ || "bottom left gradient"} className="w-full h-full"/>
                    ) : (
                        <svg className="w-full h-full" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                            <rect width="140" height="140" rx="70" fill="#F5DADC"/>
                        </svg>
                    )}
                </div>

                <div className="absolute left-[35%] bottom-[26%] w-[28px] h-[28px] rounded-full opacity-80 filter blur-[6px]">
                    {slideData?.softGlowDot?.__icon_url__ ? (
                        <img src={slideData?.softGlowDot?.__icon_url__} alt={slideData?.softGlowDot?.__icon_query__ || "soft glow"} className="w-full h-full rounded-full"/>
                    ) : (
                        <div className="w-full h-full bg-[#9C0C0C] rounded-full opacity-80 filter blur-[6px]"></div>
                    )}
                </div>

                <div className="absolute right-[180px] bottom-6 w-[76px] h-[76px] rounded-full opacity-90">
                    {slideData?.bottomRightCircle?.__icon_url__ ? (
                        <img src={slideData?.bottomRightCircle?.__icon_url__} alt={slideData?.bottomRightCircle?.__icon_query__ || "bottom right circle"} className="w-full h-full rounded-full"/>
                    ) : (
                        <div className="w-full h-full bg-[#CD6D6D] rounded-full"></div>
                    )}
                </div>

                <div className="absolute left-6 top-6 w-8 h-8 rounded-full bg-[#9C0C0C] text-white flex items-center justify-center font-['阿里巴巴普惠体']">
                    {slideData?.infoIcon?.__icon_url__ ? (
                        <img src={slideData?.infoIcon?.__icon_url__} alt={slideData?.infoIcon?.__icon_query__ || "info"} className="w-full h-full"/>
                    ) : (
                        <span style={{lineHeight: "1"}}>i</span>
                    )}
                </div>
            </div>
        </>
    )
}

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
