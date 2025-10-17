import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "timeline-large-left-circle-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, large left circle card, timeline nodes, and action button"

const Schema = z.object({
    headerTitle: z.string().min(2).max(12).default("最新工作计划").meta({
        description: "Header title text. Max 6 words",
    }),
    headerSubtitle: z.string().min(4).max(40).default("Project background analysis").meta({
        description: "Header small subtitle text. Max 6 words",
    }),
    logoText: z.string().min(3).max(20).default("YOUR LOGO").meta({
        description: "Logo text shown in header. Max 3 words",
    }),
    leftCard: z.object({
        title: z.string().min(6).max(18).default("添加标题").meta({
            description: "Left large circle title. Max 4 words",
        }),
        subtitle: z.string().min(6).max(40).default("单击此处添加副标题内容").meta({
            description: "Left circle subtitle. Max 8 words",
        }),
        paragraph: z.string().min(40).max(220).default("单击此处输入你的正文，请尽量言简意赅的阐述观点；根据需要可酌情增减文字，以便可以准确传达信息。").meta({
            description: "Left circle paragraph. Max 40 words",
        }),
        numberLabel: z.string().min(1).max(3).default("04").meta({
            description: "Large numeric label shown near left circle. Max 3 chars",
        }),
    }).default({
        title: "添加标题",
        subtitle: "单击此处添加副标题内容",
        paragraph: "单击此处输入你的正文，请尽量言简意赅的阐述观点；根据需要可酌情增减文字，以便可以准确传达信息。",
        numberLabel: "04",
    }),
    timelineNodes: z.array(z.object({
        size: z.enum(["large","small"]).default("large"),
        label: z.string().min(1).max(4).default("20XX").meta({
            description: "Text inside the node circle. Max 4 chars",
        }),
        title: z.string().min(0).max(22).default("添加小标题").meta({
            description: "Node title shown below large nodes. Max 6 words",
        }),
        description: z.string().min(0).max(120).default("单击此处输入你的正文，简意赅阐述观点").meta({
            description: "Node short description. Max 20 words",
        }),
    })).min(5).max(5).default([
        {
            size: "large",
            label: "20XX",
            title: "添加小标题",
            description: "单击此处输入你的正文，简意赅阐述观点",
        },
        {
            size: "small",
            label: "a",
            title: "",
            description: "",
        },
        {
            size: "large",
            label: "20XX",
            title: "添加小标题",
            description: "此处添加简短说明\n添加项目描述",
        },
        {
            size: "small",
            label: "b",
            title: "",
            description: "",
        },
        {
            size: "large",
            label: "20XX",
            title: "添加小标题",
            description: "此处添加简短说明\n添加项目描述",
        }
    ]).meta({
        description: "Timeline nodes array representing the sequence of nodes. Fixed count corresponding to layout",
    }),
    decorImage: ImageSchema.default({
        "__image_url__": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        "__image_prompt__": "decorative office image"
    }).meta({
        description: "Decorative supporting image",
    }),
    smallInfoIcon: IconSchema.default({
        "__icon_url__": "/static/icons/info-circle.png",
        "__icon_query__": "small info circle"
    }).meta({
        description: "Small info circle icon",
    }),
    analysisButton: z.object({
        text: z.string().min(4).max(20).default("ANALYSIS").meta({
            description: "Text on the action button. Max 2 words",
        }),
        icon: IconSchema.default({
            "__icon_url__": "/static/icons/arrow-circle.png",
            "__icon_query__": "right arrow circle"
        }),
    }).default({
        text: "ANALYSIS",
        icon: {
            "__icon_url__": "/static/icons/arrow-circle.png",
            "__icon_query__": "right arrow circle"
        }
    }).meta({
        description: "Action button data including icon",
    })
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const dynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data: slideData }) => {
    const nodes = slideData?.timelineNodes || []
    const left = slideData?.leftCard
    const decor = slideData?.decorImage
    const smallInfo = slideData?.smallInfoIcon

    return (
        <>
            <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
                <div className="flex items-start justify-between px-12 pt-8">
                    <div className="flex items-center space-x-6">
                        <h1 className="text-[56px] leading-[56px] text-[#9C0B09] font-['阿里巴巴普惠体']">
                            {slideData?.headerTitle || "最新工作计划"}
                        </h1>
                        <div className="w-[2px] h-[48px] bg-[#9C0B09]"></div>
                        <div className="text-[16px] text-gray-500 font-['微软雅黑'] mt-2">
                            {slideData?.headerSubtitle || "Project background analysis"}
                        </div>
                    </div>
                    <div className="text-gray-500 font-['微软雅黑'] text-[20px] mt-2">
                        {slideData?.logoText || "YOUR LOGO"}
                    </div>
                </div>

                <div className="absolute left-0 bottom-12">
                    <div className="flex items-start justify-start relative">
                        <div className="w-[540px] h-[540px] rounded-full bg-[#9C0B09] flex flex-col p-[48px] text-white box-border">
                            <div className="mt-6">
                                <div className="text-[48px] font-['阿里巴巴普惠体'] leading-[52px]">
                                    {slideData?.leftCard?.title || "添加标题"}
                                </div>
                                <div className="text-[18px] font-['微软雅黑'] mt-3 opacity-90">
                                    {slideData?.leftCard?.subtitle || "单击此处添加副标题内容"}
                                </div>

                                <div className="w-[56px] h-[10px] bg-white rounded-full mt-8"></div>

                                <p className="text-[16px] font-['微软雅黑'] mt-8 leading-[26px] max-w-[360px]">
                                    {slideData?.leftCard?.paragraph || "单击此处输入你的正文，请尽量言简意赅的阐述观点；根据需要可酌情增减文字，以便可以准确传达信息。"}
                                </p>
                            </div>
                        </div>

                        <div className="absolute -left-6 -bottom-20 text-[96px] text-gray-200 font-['微软雅黑']">
                            {slideData?.leftCard?.numberLabel || "04"}
                        </div>
                    </div>
                </div>

                <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 px-48">
                    <div className="relative">
                        <div className="h-[14px] bg-gray-200 rounded-full w-full"></div>

                        <div className="absolute inset-0 flex items-center justify-between">
                            {nodes.map((node, idx) => {
                                if (node.size === "small") {
                                    return (
                                        <div key={idx} className="flex flex-col items-center w-[10%]">
                                            <svg className="w-[44px] h-[44px]" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" role="img">
                                                <circle cx="22" cy="22" r="22" fill="#9C0B09" />
                                                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#fff" fontSize="18" fontFamily="微软雅黑">{node.label}</text>
                                            </svg>
                                        </div>
                                    )
                                }

                                // large node sizes differ visually; map width by index sizes in layout
                                const svgProps = idx === 1 ? { w: "120", h: "120", r: 60, fontSize: 24 } :
                                                 idx === 2 ? { w: "140", h: "140", r: 70, fontSize: 28 } :
                                                 { w: "120", h: "120", r: 60, fontSize: 24 }

                                return (
                                    <div key={idx} className="flex flex-col items-center w-[20%]">
                                        <svg className={`w-[${svgProps.w}px] h-[${svgProps.h}px]`} viewBox={`0 0 ${svgProps.w} ${svgProps.h}`} xmlns="http://www.w3.org/2000/svg" role="img">
                                            <circle cx={String(Number(svgProps.w) / 2)} cy={String(Number(svgProps.h) / 2)} r={String(svgProps.r)} fill="#9C0B09" />
                                            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#fff" fontSize={String(svgProps.fontSize)} fontFamily="微软雅黑">{node.label}</text>
                                        </svg>
                                        <div className="mt-6 text-[#9C0B09] font-['阿里巴巴普惠体'] text-[22px]">
                                            {node.title}
                                        </div>
                                        <div className="text-[14px] text-gray-500 font-['微软雅黑'] mt-3 text-center leading-[20px] max-w-[160px]">
                                            {node.description && node.description.includes("\n") ? node.description.split("\n").map((line, i) => (<span key={i}>{line}{i < node.description.split("\n").length - 1 && <br/>}</span>)) : node.description}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
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

                <img src={decor?.__image_url__ || ""} alt={decor?.__image_prompt__ || ""} className="absolute right-20 top-36 w-[180px] h-[120px] object-cover opacity-50 rounded-md" />

                <div className="absolute right-40 top-44">
                    <svg className="w-10 h-10" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="20" fill="#9C0B09"/>
                        <text x="50%" y="53%" dominantBaseline="middle" textAnchor="middle" fill="#fff" fontSize="16" fontFamily="微软雅黑">i</text>
                    </svg>
                </div>
                <div className="absolute left-6 bottom-6 text-[72px] font-['微软雅黑'] text-[#bfbfbf']">
                    04
                </div>
            </div>
        </>
    )
}

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
