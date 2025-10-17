import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "hero-with-bottom-bar-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a hero header, subtitle, image overlay, and bottom bar with icons and headings"

const Schema = z.object({
  topSubtitle: z.string().min(20).max(120).default("调整项目管理计划，制定风险应对措施，从而更好地把控项目进度，按时交付项目成果").meta({
    description: "Top small subtitle text. Max 30 words"
  }),
  title: z.string().min(3).max(12).default("THANKS").meta({
    description: "Main large heading text. Max 3 words"
  }),
  heroImage: ImageSchema.default({
    "__image_url__": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "__image_prompt__": "Skyscraper glass building from low angle with dramatic sky"
  }).meta({
    description: "Background hero image. Max 30 words"
  }),
  smallEnglishLine: z.string().min(20).max(140).default("Control the progress of the project and deliver the project results on time.").meta({
    description: "Short supporting english line. Max 25 words"
  }),
  cta: z.object({
    text: z.string().min(5).max(40).default("把握时代机遇点亮浩瀚星空").meta({
      description: "CTA pill button text. Max 8 words"
    }),
    icon: IconSchema.default({
      "__icon_url__": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24'><circle cx='12' cy='12' r='11' stroke='%236b6b6b' stroke-width='1.5' fill='%23e9e9e9'/><path d='M10 8l4 4-4 4' stroke='%23444' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
      "__icon_query__": "round arrow icon inside circle"
    }).meta({
      description: "Icon used in CTA"
    })
  }).default({
    text: "把握时代机遇点亮浩瀚星空",
    icon: {
      "__icon_url__": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24'><circle cx='12' cy='12' r='11' stroke='%236b6b6b' stroke-width='1.5' fill='%23e9e9e9'/><path d='M10 8l4 4-4 4' stroke='%23444' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
      "__icon_query__": "round arrow icon inside circle"
    }
  }).meta({
    description: "CTA button object with text and icon"
  }),
  centerHeadings: z.array(z.object({
    title: z.string().min(2).max(30),
    subtitle: z.string().min(2).max(60)
  })).min(2).max(2).default([
    {
      title: "同步信息",
      subtitle: "Synchronize information"
    },
    {
      title: "促进决策",
      subtitle: "Facilitate decision-making"
    }
  ]).meta({
    description: "Center headings with title and subtitle. Fixed number of items"
  })
})

type SlideData = z.infer<typeof Schema>

interface DynamicSlideLayoutProps {
  data?: Partial<SlideData>
}

const dynamicSlideLayout: React.FC<DynamicSlideLayoutProps> = ({ data: slideData }) => {
  const centerHeadings = slideData?.centerHeadings || []

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <img src={slideData?.heroImage?.__image_url__ || ""} alt={slideData?.heroImage?.__image_prompt__ || "bg"} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#9b0b0b]/95 via-[#a81414]/50 to-transparent"></div>

        <div className="relative z-10 w-full h-full flex flex-col items-center">
          <div className="w-full flex justify-center pt-[28px]">
            <p className="text-[#f2dede] font-['微软雅黑'] text-[16px] leading-[20px] tracking-tight max-w-[920px] text-center px-4">
              {slideData?.topSubtitle || "调整项目管理计划，制定风险应对措施，从而更好地把控项目进度，按时交付项目成果"}
            </p>
          </div>

          <div className="w-full flex justify-center mt-[18px]">
            <div className="w-[120px] h-[4px] bg-white rounded"></div>
          </div>

          <div className="flex-1 w-full flex flex-col justify-center items-center px-8">
            <h1 className="text-white font-['阿里巴巴普惠体'] text-[220px] leading-[200px] tracking-tight select-none text-center break-words max-w-[1100px]">
              {slideData?.title || "THANKS"}
            </h1>

            <div className="w-full max-w-[1100px] flex items-center justify-between mt-6 px-8">
              <p className="text-white font-['微软雅黑'] text-[16px] leading-[22px] opacity-90">
                {slideData?.smallEnglishLine || "Control the progress of the project and deliver the project results on time."}
              </p>

              <button className="flex items-center gap-3 bg-white/90 text-[#6b6b6b] rounded-full px-5 py-3 shadow-md">
                <span className="font-['微软雅黑'] text-[16px]">{slideData?.cta?.text || "把握时代机遇点亮浩瀚星空"}</span>
                <span className="ml-1" dangerouslySetInnerHTML={{ __html: (slideData?.cta?.icon?.__icon_url__ ? `<img src="${slideData?.cta?.icon?.__icon_url__}" alt="${slideData?.cta?.icon?.__icon_query__}" class="w-[28px] h-[28px]"/>` : "") }} />
              </button>
            </div>
          </div>

          <div className="w-full bg-white flex items-center justify-between px-10 py-6">
            <div className="flex flex-col items-center">
              <div className="flex items-baseline gap-4">
                <h3 className="text-[#a91010] font-['微软雅黑'] text-[22px]">{centerHeadings[0]?.title || "同步信息"}</h3>
                <p className="text-[#9b9b9b] font-['微软雅黑'] text-[14px]">{centerHeadings[0]?.subtitle || "Synchronize information"}</p>
              </div>

              <div className="mt-4 flex items-baseline gap-4">
                <h3 className="text-[#a91010] font-['微软雅黑'] text-[22px]">{centerHeadings[1]?.title || "促进决策"}</h3>
                <p className="text-[#9b9b9b] font-['微软雅黑'] text-[14px]">{centerHeadings[1]?.subtitle || "Facilitate decision-making"}</p>
              </div>
            </div>

            <div className="w-[120px]"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
