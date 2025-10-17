import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const DiagramSchema = z.object({
    code: z.string().min(10).max(2000).default("flowchart LR\n  A[01] --> B[04]\n  A --> C[02]\n  D[03] --> B").meta({
        description: "Mermaid diagram code that can render a diagram.",
    })
})

const layoutId = "header-two-columns-svg-cluster-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, two columns of text blocks, a central graphic, page number, and an action button."

const Schema = z.object({
    headerTitle: z.string().min(2).max(20).default("最新工作计划").meta({
        description: "Main header text. Max 4 words",
    }),
    headerSubtitle: z.string().min(5).max(60).default("Project background analysis").meta({
        description: "Header subtitle text. Max 10 words",
    }),
    logoText: z.string().min(2).max(20).default("YOUR LOGO").meta({
        description: "Logo text or short label. Max 3 words",
    }),
    leftBlocks: z.array(z.object({
        title: z.string().min(5).max(30).default("请输入你的标题").meta({
            description: "Block title text. Max 6 words",
        }),
        description: z.string().min(20).max(250).default("单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点").meta({
            description: "Block body text. Max 40 words",
        }),
    })).min(1).max(4).default([
        {
            title: "请输入你的标题",
            description: "单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点"
        },
        {
            title: "请输入你的标题",
            description: "单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点"
        }
    ]).meta({
        description: "Left column blocks array. Min 1, Max 4 items",
    }),
    rightBlocks: z.array(z.object({
        title: z.string().min(5).max(30).default("请输入你的标题").meta({
            description: "Block title text. Max 6 words",
        }),
        description: z.string().min(20).max(250).default("单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点").meta({
            description: "Block body text. Max 40 words",
        }),
    })).min(1).max(4).default([
        {
            title: "请输入你的标题",
            description: "单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点"
        },
        {
            title: "请输入你的标题",
            description: "单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点"
        }
    ]).meta({
        description: "Right column blocks array. Min 1, Max 4 items",
    }),
    graphicSvg: z.string().min(20).max(5000).default("<svg width=\"420\" height=\"420\" viewBox=\"0 0 420 420\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"block\"><path d=\"M210 120 L210 220 C200 210 180 200 150 235 L210 220 Z\" fill=\"#c87a7a\" /><path d=\"M210 220 L210 320 C230 310 250 305 290 330 L210 320 Z\" fill=\"#c87a7a\" /><path d=\"M210 120 L240 170 C250 160 270 150 290 145 L210 170 Z\" fill=\"#c87a7a\" /><circle cx=\"140\" cy=\"165\" r=\"70\" fill=\"#9b0000\" /><text x=\"140\" y=\"175\" text-anchor=\"middle\" fill=\"#fff\" font-family=\"Arial\" font-size=\"36\" font-weight=\"600\">01</text><circle cx=\"140\" cy=\"300\" r=\"45\" fill=\"#9b0000\" /><text x=\"140\" y=\"308\" text-anchor=\"middle\" fill=\"#fff\" font-family=\"Arial\" font-size=\"28\" font-weight=\"600\">02</text><circle cx=\"260\" cy=\"115\" r=\"45\" fill=\"#9b0000\" /><text x=\"260\" y=\"121\" text-anchor=\"middle\" fill=\"#fff\" font-family=\"Arial\" font-size=\"28\" font-weight=\"600\">03</text><circle cx=\"280\" cy=\"245\" r=\"95\" fill=\"#9b0000\" /><text x=\"280\" y=\"260\" text-anchor=\"middle\" fill=\"#fff\" font-family=\"Arial\" font-size=\"52\" font-weight=\"500\">04</text></svg>").meta({
        description: "Inline SVG markup for the central graphic.",
    }),
    diagram: DiagramSchema.default({
        code: "flowchart LR\n  A[01] --> B[04]\n  A --> C[02]\n  D[03] --> B"
    }).meta({
        description: "Mermaid diagram code placeholder",
    }),
    pageNumber: z.string().min(1).max(4).default("04").meta({
        description: "Slide page number text",
    }),
    actionButton: z.object({
        label: z.string().min(2).max(20).default("ANALYSIS").meta({
            description: "Action button label. Max 2 words",
        }),
        icon: IconSchema.default({
            "__icon_url__": "/static/icons/arrow-right.svg",
            "__icon_query__": "right arrow circular icon"
        })
    }).default({
        label: "ANALYSIS",
        icon: {
            "__icon_url__": "/static/icons/arrow-right.svg",
            "__icon_query__": "right arrow circular icon"
        }
    }).meta({
        description: "Action button configuration with label and icon",
    })
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const dynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data: slideData }) => {
    const left = slideData?.leftBlocks || []
    const right = slideData?.rightBlocks || []
    const svgMarkup = slideData?.graphicSvg || ""
    return (
        <>
            <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
                <div className="px-12 py-8 h-full box-border">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-6">
                            <h1 className="text-[#a40000] font-['优设标题黑'] text-[64px] leading-none tracking-tight">
                                {slideData?.headerTitle || "最新工作计划"}
                            </h1>
                            <div className="h-[52px] w-[2px] bg-[#c33]"></div>
                            <div className="text-[#777] font-['Arial'] text-[18px] mt-[18px]">
                                {slideData?.headerSubtitle || "Project background analysis"}
                            </div>
                        </div>
                        <div className="text-[#777] font-['Arial'] text-[20px] mt-2">
                            {slideData?.logoText || "YOUR LOGO"}
                        </div>
                    </div>

                    <div className="mt-8 grid items-start [grid-template-columns:1fr_420px_1fr] gap-10">
                        <div className="flex flex-col justify-between">
                            {left.map((blk, idx) => (
                                <div key={idx} className={idx === left.length - 1 ? "" : "mb-8"}>
                                    <h3 className="text-[#a40000] font-['优设标题黑'] text-[22px] mb-4">
                                        {blk.title}
                                    </h3>
                                    <p className="text-[#8b8b8b] font-['微软雅黑'] text-[16px] leading-7 max-w-[380px]">
                                        {blk.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-center">
                            <div dangerouslySetInnerHTML={{ "__html": svgMarkup }} />
                        </div>

                        <div className="flex flex-col justify-between">
                            {right.map((blk, idx) => (
                                <div key={idx} className={idx === right.length - 1 ? "text-right" : "mb-8 text-right"}>
                                    <h3 className="text-[#a40000] font-['优设标题黑'] text-[22px] mb-4">
                                        {blk.title}
                                    </h3>
                                    <p className="text-[#8b8b8b] font-['微软雅黑'] text-[16px] leading-7 max-w-[380px] ml-auto">
                                        {blk.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="absolute left-6 bottom-6 text-[96px] text-[#d9d9d9] font-['Arial']">
                        {slideData?.pageNumber || "04"}
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

                    <div className="mt-4">
                        <pre className="sr-only">{slideData?.diagram?.code}</pre>
                    </div>
                </div>
            </div>
        </>
    )
}

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
