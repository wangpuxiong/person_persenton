import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-multilingual-headline-image-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, subtitle lines, large headline, CTA, and decorative images and shapes."

const Schema = z.object({
  header: z.string().min(6).max(16).default("Part One").meta({
    description: "Top small header text. Max 3 words",
  }),
  subtitle_cn: z.string().min(6).max(24).default("识别进度偏差和风险").meta({
    description: "Chinese subtitle line. Max 6 words",
  }),
  subtitle_en: z.string().min(20).max(48).default("Identify schedule deviations and risks").meta({
    description: "English subtitle line. Max 8 words",
  }),
  headline: z.string().min(4).max(8).default("项目背景解析").meta({
    description: "Large headline text. Max 8 Chinese characters",
  }),
  cta_text: z.string().min(10).max(36).default("PROJECT BACKGROUND ANALYSIS").meta({
    description: "CTA button text. Max 6 words",
  }),
  cta_icon: IconSchema.default({
    "__icon_url__": "/static/icons/info-circle.png",
    "__icon_query__": "info circle"
  }).meta({
    description: "Icon inside the CTA button",
  }),
  left_image: ImageSchema.default({
    "__image_url__": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "__image_prompt__": "A grayscale city skyline in a circular frame with soft pink outer ring"
  }).meta({
    description: "Medium decorative circular image. Max 20 words",
  }),
  right_image: ImageSchema.default({
    "__image_url__": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "__image_prompt__": "A large grayscale city skyline within a circular crop and soft border"
  }).meta({
    description: "Large decorative circular image. Max 20 words",
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
        <div className="flex h-full w-full px-[56px] py-[40px]">
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-6 mb-6">
              <div>
                <div className="text-[#BFBFBF] font-['微软雅黑'] text-[56px] leading-[56px]">
                  {slideData?.header || "Part One"}
                </div>
              </div>
              <div className="h-[40px] w-[2px] bg-[#8B0000] rounded-sm"></div>
              <div className="flex flex-col">
                <div className="text-[#333333] font-['微软雅黑'] text-[20px] leading-[24px]">
                  {slideData?.subtitle_cn || "识别进度偏差和风险"}
                </div>
                <div className="text-[#9b9b9b] font-['微软雅黑'] text-[14px] leading-[18px] mt-1">
                  {slideData?.subtitle_en || "Identify schedule deviations and risks"}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h1 className="text-[#9a0000] font-['阿里巴巴普惠体'] text-[160px] leading-[150px] tracking-tight break-keep">
                {slideData?.headline || "项目背景解析"}
              </h1>
            </div>

            <div className="mt-8">
              <button className="inline-flex items-center bg-[#9a0000] text-white rounded-full px-[26px] py-[12px] h-[52px] gap-4 shadow-sm">
                <span className="font-['微软雅黑'] text-[16px] tracking-wide">
                  {slideData?.cta_text || "PROJECT BACKGROUND ANALYSIS"}
                </span>
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="bg-white rounded-full p-[2px]">
                  <circle cx="17" cy="17" r="17" fill="#fff" />
                  <path d="M13 11L21 17L13 23" stroke="#a80b0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="mt-auto mb-[20px] relative w-[220px] h-[220px]">
              <div className="absolute -left-[30px] bottom-0">
                <svg width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="130" cy="130" r="126" fill="#F4E0E2"/>
                </svg>
              </div>
              <div className="absolute left-0 bottom-0 w-[200px] h-[200px] rounded-full overflow-hidden drop-shadow-lg border-[4px] border-[#e6e6e6]">
                <img src={slideData?.left_image?.__image_url__ || ""} alt={slideData?.left_image?.__image_prompt__ || "city"} className="w-full h-full object-cover grayscale"/>
              </div>
            </div>
          </div>

          <div className="w-[42%] relative flex items-center justify-end pr-[18px]">
            <div className="absolute right-[160px] top-[24px] w-[48px] h-[48px] rounded-full bg-[#9a0000]"></div>

            <svg className="absolute right-[40px] top-[48px]" width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" >
              <defs>
                <radialGradient id="g1" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f0c7c9" stopOpacity="0.9"/>
                  <stop offset="100%" stopColor="#f0c7c9" stopOpacity="0.15"/>
                </radialGradient>
              </defs>
              <circle cx="48" cy="48" r="36" fill="url(#g1)"/>
            </svg>

            <div className="absolute right-[-60px] bottom-[-40px] w-[580px] h-[580px] rounded-full overflow-hidden border-[14px] border-[#f4e4e6] shadow-xl">
              <img src={slideData?.right_image?.__image_url__ || ""} alt={slideData?.right_image?.__image_prompt__ || "city large"} className="w-full h-full object-cover grayscale"/>
            </div>

            <div className="absolute right-[120px] bottom-[60px] w-[64px] h-[64px] rounded-full bg-[#c86a6a]"></div>

            <svg className="absolute left-[40px] bottom-[30px]" width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="g2" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f2d6d7" stopOpacity="0.95"/>
                  <stop offset="100%" stopColor="#f2d6d7" stopOpacity="0.2"/>
                </radialGradient>
              </defs>
              <rect x="0" y="0" width="140" height="140" rx="40" fill="url(#g2)"/>
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
