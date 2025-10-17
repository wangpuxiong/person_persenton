import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-steps-cards-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, a row of step cards, page number, and action button."

const Schema = z.object({
  titleZh: z.string().min(4).max(8).default("项目背景解析").meta({
    description: "Main Chinese title text. Max 8 chars. Max 4 words",
  }),
  subtitleEn: z.string().min(10).max(40).default("Project background analysis").meta({
    description: "English subtitle text. Max 40 chars. Max 7 words",
  }),
  logoText: z.string().min(4).max(15).default("YOUR LOGO").meta({
    description: "Right side logo text. Max 15 chars. Max 3 words",
  }),
  steps: z.array(z.object({
    markerLabel: z.string().min(2).max(2).default("01").meta({
      description: "Marker label shown inside the circle. Exact 2 chars",
    }),
    markerColor: z.string().default("#9b0b0b").meta({
      description: "Hex color for the marker circle",
    }),
    markerLineHeight: z.number().min(60).max(80).default(68).meta({
      description: "Height in px of the vertical marker line",
    }),
    decorativeImage: ImageSchema.default({
      __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      __image_prompt__: "Decorative red block top view photo"
    }).meta({
      description: "Hidden decorative image used by the block. Max 30 words",
    }),
    blockSvgWidth: z.number().min(200).max(300).default(220).meta({
      description: "Rendered SVG block width in px",
    }),
    blockSvgHeight: z.number().min(40).max(60).default(44).meta({
      description: "Rendered SVG block height in px",
    }),
    title: z.string().min(6).max(14).default("请输入你的标题").meta({
      description: "Step title text. Max 14 chars. Max 4 words",
    }),
    description: z.string().min(20).max(120).default("单击此处输入你的正文，文字是您思想的提炼").meta({
      description: "Step description paragraph. Max 120 chars. Max 20 words",
    }),
  })).min(5).max(5).default([
    {
      markerLabel: "01",
      markerColor: "#9b0b0b",
      markerLineHeight: 68,
      decorativeImage: {
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "Decorative red block top view photo"
      },
      blockSvgWidth: 220,
      blockSvgHeight: 44,
      title: "请输入你的标题",
      description: "单击此处输入你的正文，文字是您思想的提炼"
    },
    {
      markerLabel: "02",
      markerColor: "#9b0b0b",
      markerLineHeight: 68,
      decorativeImage: {
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "Decorative red block top view photo"
      },
      blockSvgWidth: 210,
      blockSvgHeight: 46,
      title: "请输入你的标题",
      description: "单击此处输入你的正文，文字是您思想的提炼"
    },
    {
      markerLabel: "03",
      markerColor: "#9b0b0b",
      markerLineHeight: 78,
      decorativeImage: {
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "Decorative red block top view photo"
      },
      blockSvgWidth: 260,
      blockSvgHeight: 54,
      title: "请输入你的标题",
      description: "单击此处输入你的正文，文字是您思想的提炼"
    },
    {
      markerLabel: "04",
      markerColor: "#9b0b0b",
      markerLineHeight: 68,
      decorativeImage: {
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "Decorative red block top view photo"
      },
      blockSvgWidth: 210,
      blockSvgHeight: 46,
      title: "请输入你的标题",
      description: "单击此处输入你的正文，文字是您思想的提炼"
    },
    {
      markerLabel: "05",
      markerColor: "#9b0b0b",
      markerLineHeight: 68,
      decorativeImage: {
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "Decorative red block top view photo"
      },
      blockSvgWidth: 220,
      blockSvgHeight: 44,
      title: "请输入你的标题",
      description: "单击此处输入你的正文，文字是您思想的提炼"
    }
  ]).meta({
    description: "Array of step card objects. Exact number of items as shown in layout.",
  }),
  pageNumber: z.string().min(1).max(3).default("01").meta({
    description: "Large page number displayed bottom-left. Max 3 chars",
  }),
  actionButton: z.object({
    label: z.string().min(4).max(12).default("ANALYSIS").meta({
      description: "Button label text. Max 12 chars. Max 2 words",
    }),
    icon: IconSchema.default({
      __icon_url__: "",
      __icon_query__: "right arrow in circle"
    }).meta({
      description: "Icon used inside the action button. Max 6 words",
    }),
    bgColor: z.string().default("#a80b0b").meta({
      description: "Background color for the action button",
    })
  }).default({
    label: "ANALYSIS",
    icon: {
      __icon_url__: "",
      __icon_query__: "right arrow in circle"
    },
    bgColor: "#a80b0b"
  })
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
  data?: Partial<SlideData>
}

const dynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data: slideData }) => {
  const steps = slideData?.steps || []

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <div className="px-12 pt-8 pb-6 flex items-start justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-[#a80b0b] font-['优设标题黑'] text-[64px] leading-[1] tracking-tight">
              {slideData?.titleZh || "项目背景解析"}
            </h1>
            <div className="w-[2px] h-[48px] bg-[#a80b0b]"></div>
            <div className="text-[#6b6b6b] font-['Arial'] text-[16px] leading-[1.4]">
              {slideData?.subtitleEn || "Project background analysis"}
            </div>
          </div>
          <div className="text-[#6b6b6b] font-['Arial'] text-[20px] tracking-wide">
            {slideData?.logoText || "YOUR LOGO"}
          </div>
        </div>

        <div className="px-14 mt-6">
          <div className="grid grid-cols-5 gap-x-6 items-end">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="flex flex-col items-center">
                  <svg width="56" height="56" viewBox="0 0 56 56" className="mb-2">
                    <circle cx="28" cy="28" r="28" fill={step.markerColor || "#9b0b0b"} />
                    <text x="28" y="32" textAnchor="middle" fontFamily="Arial" fontSize="14" fill="#fff">
                      {step.markerLabel || "01"}
                    </text>
                  </svg>
                  <div className="w-[2px]" style={{ height: `${step.markerLineHeight || 68}px`, backgroundColor: step.markerColor || "#9b0b0b" }}></div>
                </div>

                <div className="mt-2">
                  <img src={step.decorativeImage?.__image_url__ || ""} className="hidden" alt={step.decorativeImage?.__image_prompt__ || "decorative"} />
                  <svg width={step.blockSvgWidth || 220} height={step.blockSvgHeight || 44} viewBox={`0 0 ${step.blockSvgWidth || 220} ${step.blockSvgHeight || 44}`} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x={step.blockSvgWidth === 260 ? 20 : (step.blockSvgWidth === 220 ? 10 : 6)} y="0" width={Math.max(160, (step.blockSvgWidth || 220) - 60)} height={step.blockSvgHeight ? Math.max(34, step.blockSvgHeight - 10) : 34} rx="2" fill="#ff3b3b" />
                    <path d={step.blockSvgWidth === 260 ? "M20 38 H220 L238 46 H38 Z" : (step.blockSvgWidth === 220 ? "M10 34 H170 L188 42 H28 Z" : "M6 34 H166 L184 42 H24 Z")} fill="#b70a0a" />
                    <circle cx={step.blockSvgWidth === 260 ? 120 : (step.blockSvgWidth === 220 ? 90 : 86)} cy={Math.floor((step.blockSvgHeight || 44) / 2)} r="4" fill="#7a0b0b" />
                  </svg>
                </div>

                <div className="mt-6 text-center">
                  <div className="text-[#a80b0b] font-['优设标题黑'] text-[22px]">
                    {step.title || "请输入你的标题"}
                  </div>
                  <p className={"mt-3 text-[#8a8a8a] font-['微软雅黑'] text-[14px] leading-[1.6] max-w-[" + (step.blockSvgWidth || 220) + "px]"}>
                    {step.description || "单击此处输入你的正文，文字是您思想的提炼"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute left-8 bottom-6 text-[#cfcfcf] font-['Arial'] text-[96px] leading-[1] select-none">
          {slideData?.pageNumber || "01"}
        </div>

        <div className="absolute right-10 bottom-8">
          <button className="flex items-center gap-4 bg-[#a80b0b] text-white rounded-full px-6 py-3 shadow-md">
            <span className="font-['阿里巴巴普惠体'] text-[16px] tracking-wider">
              {slideData?.actionButton?.label || "ANALYSIS"} 
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
