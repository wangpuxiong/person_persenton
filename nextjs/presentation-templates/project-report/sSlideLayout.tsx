import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-image-pyramid-bullets-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, decorative image, pyramid graphic, bullet points, and action button."

const Schema = z.object({
  mainTitle: z.string().min(4).max(12).default("项目成果介绍").meta({
    description: "Main Chinese title text. Max 12 characters"
  }),
  subtitle: z.string().min(10).max(40).default("Project background analysis").meta({
    description: "Subtitle text next to the main title. Max 40 characters"
  }),
  brandIcon: IconSchema.default({
    "__icon_url__": "https://static.placeholder/icon.png",
    "__icon_query__": "i circle"
  }).meta({
    description: "Brand icon used in header"
  }),
  logoText: z.string().min(1).max(6).default("YOUR LOGO").meta({
    description: "Text shown in the logo area. Max 6 characters"
  }),
  decorativeImage: ImageSchema.default({
    "__image_url__": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "__image_prompt__": "decor"
  }).meta({
    description: "Decorative background image behind the pyramid"
  }),
  layers: z.array(z.object({
    label: z.string().min(2).max(2).default("01").meta({
      description: "Label text for the pyramid layer (two chars)"
    })
  })).min(4).max(4).default([
    { label: "01" },
    { label: "02" },
    { label: "03" },
    { label: "04" }
  ]).meta({
    description: "Pyramid layer labels in order from base to top. Exactly four items"
  }),
  bulletPoints: z.array(z.object({
    heading: z.string().min(6).max(28).default("请输入你的标题").meta({
      description: "Bullet heading text. Max 28 characters"
    }),
    description: z.string().min(20).max(220).default("单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点").meta({
      description: "Bullet point paragraph text. Max 220 characters"
    })
  })).min(1).max(4).default([
    {
      heading: "请输入你的标题",
      description: "单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点"
    },
    {
      heading: "请输入你的标题",
      description: "单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点"
    },
    {
      heading: "请输入你的标题",
      description: "单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点"
    }
  ]).meta({
    description: "List of bullet points displayed alongside the pyramid. Max 4 items"
  }),
  buttonText: z.string().min(3).max(20).default("ANALYSIS").meta({
    description: "Text inside the action button"
  }),
  slideNumber: z.string().min(2).max(2).default("03").meta({
    description: "Large slide number shown bottom-left (two characters)"
  })
})

type DynamicSlideData = z.infer<typeof Schema>

interface DynamicSlideLayoutProps {
  data?: Partial<DynamicSlideData>
}

const dynamicSlideLayout: React.FC<DynamicSlideLayoutProps> = ({ data: slideData }) => {
  const bullets = slideData?.bulletPoints || []
  const layers = slideData?.layers || []

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        {/* Top bar */}
        <div className="flex items-start justify-between px-10 pt-8">
          <div className="flex items-center space-x-6">
            <h1 className="text-[72px] leading-[72px] text-[#a90000] font-['优设标题黑'] tracking-tight">
              {slideData?.mainTitle || "项目成果介绍"}
            </h1>
            <div className="h-[56px] w-[2px] bg-[#c73b3b] opacity-60"></div>
            <div className="text-[18px] text-[#7a7a7a] font-['Open Sans']">
              {slideData?.subtitle || "Project background analysis"}
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex items-center justify-center w-[110px] h-[34px] rounded text-[#666666] font-['Open Sans'] text-[20px]">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#eeeeee] text-[#7a7a7a] font-bold">
                  {slideData?.brandIcon?.__icon_query__?.charAt(0) || "i"}
                </div>
                <span className="text-[20px]">
                  {slideData?.logoText || "YOUR LOGO"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="px-10 mt-6 grid grid-cols-[540px_1fr] gap-8">
          <div className="relative flex items-center justify-center">
            <img
              src={slideData?.decorativeImage?.__image_url__ || ""}
              alt={slideData?.decorativeImage?.__image_prompt__ || ""}
              className="absolute left-[-20px] top-[-20px] w-[520px] h-[420px] object-cover opacity-5 pointer-events-none rounded"
            />

            <svg width="520" height="420" viewBox="0 0 520 420" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
              <polygon points="40,350 480,350 420,300 100,300" fill="#560000"/>
              <polygon points="100,300 420,300 480,350 40,350" fillOpacity="0.15" fill="#000"/>
              <polygon points="90,280 430,280 380,230 140,230" fill="#7f0000"/>
              <polygon points="140,230 380,230 430,280 90,280" fillOpacity="0.12" fill="#000"/>
              <polygon points="140,210 380,210 350,160 170,160" fill="#c21515"/>
              <polygon points="170,160 350,160 380,210 140,210" fillOpacity="0.08" fill="#000"/>
              <polygon points="190,140 330,140 260,90" fill="#d9d9d9"/>
              <polygon points="260,90 330,140 190,140" fillOpacity="0.06" fill="#000"/>

              <text x="260" y="330" fontFamily="Open Sans" fontSize="48" fill="#ffffff" fontWeight="700" textAnchor="middle">
                {slideData?.layers?.[0]?.label || layers?.[0]?.label || "01"}
              </text>
              <text x="260" y="260" fontFamily="Open Sans" fontSize="40" fill="#ffffff" fontWeight="700" textAnchor="middle">
                {slideData?.layers?.[1]?.label || layers?.[1]?.label || "02"}
              </text>
              <text x="260" y="200" fontFamily="Open Sans" fontSize="36" fill="#ffffff" fontWeight="700" textAnchor="middle">
                {slideData?.layers?.[2]?.label || layers?.[2]?.label || "03"}
              </text>
              <text x="260" y="125" fontFamily="Open Sans" fontSize="28" fill="#ffffff" fontWeight="700" textAnchor="middle">
                {slideData?.layers?.[3]?.label || layers?.[3]?.label || "04"}
              </text>
            </svg>
          </div>

          <div className="flex flex-col justify-center space-y-6 pr-8">
            {bullets.map((b, idx) => (
              <div className="flex items-start space-x-6" key={idx}>
                <div className="flex items-center w-[220px]">
                  <div className="w-3 h-3 rounded-full bg-[#9b0000] mt-2 shrink-0"></div>
                  <div className="flex-1 border-t-2 border-dashed border-[#c33] ml-4"></div>
                </div>

                <div className="flex-1">
                  <div className="text-[22px] text-[#b50000] font-['优设标题黑'] mb-2">
                    {b?.heading}
                  </div>
                  <p className="text-[15px] text-[#8b8b8b] font-['Open Sans'] leading-relaxed">
                    {b?.description}
                  </p>
                </div>
              </div>
            ))}

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

        <div className="absolute left-8 bottom-6 text-[96px] font-['Bebas Neue'] text-[#d9d9d9] leading-none">
          {slideData?.slideNumber || "03"}
        </div>
      </div>
    </>
  )
}

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
