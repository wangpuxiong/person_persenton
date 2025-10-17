import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-subheading-paragraphs-image-speech-bubble-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, subheading, paragraphs, image, and speech bubble"

const Schema = z.object({
  mainTitle: z.string().min(4).max(12).default("项目进展情况").meta({
    description: "Main Chinese header text. Max 6 words",
  }),
  topSubtitle: z.string().min(10).max(40).default("Project background analysis").meta({
    description: "Top English subtitle text. Max 8 words",
  }),
  subHeading: z.string().min(3).max(12).default("输入标题").meta({
    description: "Large Chinese subheading. Max 4 words",
  }),
  subSubtitle: z.string().min(10).max(40).default("Facing solutions & Method Analysis").meta({
    description: "Small English subtitle under subheading. Max 8 words",
  }),
  paragraph1: z.string().min(40).max(220).default("单击此处输入你的正文，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点；根据需要可酌情增减文字，以便观者可以准确理解您所传达的信息。").meta({
    description: "First body paragraph. Max 40 words",
  }),
  paragraph2: z.string().min(40).max(220).default("您的正文已经简明扼要，字字珠玑，但信息却错综复杂，需要用更多的文字来表达；请您尽可能提炼思想的精髓。").meta({
    description: "Second body paragraph. Max 40 words",
  }),
  pageNumber: z.string().min(1).max(3).default("02").meta({
    description: "Large page number text. Max 3 characters",
  }),
  logoText: z.string().min(4).max(20).default("YOUR LOGO").meta({
    description: "Top-right logo text. Max 4 words",
  }),
  phoneImage: ImageSchema.default({
    __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    __image_prompt__: "Hand holding a smartphone showing business charts and documents"
  }).meta({
    description: "Main phone image. Max 30 words",
  }),
  bubbleTitle: z.string().min(2).max(6).default("标题").meta({
    description: "Speech bubble big title. Max 3 words",
  }),
  bubbleSubtitle: z.string().min(6).max(20).default("梦想与科技未来！").meta({
    description: "Speech bubble small subtitle. Max 5 words",
  }),
  analysisButtonText: z.string().min(4).max(12).default("ANALYSIS").meta({
    description: "Text shown in analysis button. Max 2 words",
  }),
  analysisIcon: IconSchema.default({
    __icon_url__: "/static/icons/arrow-right-circle.png",
    __icon_query__: "right arrow in circle"
  }).meta({
    description: "Icon for the analysis button. Max 6 words",
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
        <div className="flex h-full w-full">
          <div className="flex flex-col justify-start px-12 py-8 w-2/3 relative">
            <div className="flex items-center gap-6">
              <h1 className="text-[56px] leading-none text-[#9f0505] font-['微软雅黑']">
                {slideData?.mainTitle || "项目进展情况"}
              </h1>
              <div className="w-[4px] h-10 bg-[#9f0505]"></div>
              <div className="text-[16px] text-[#8b8b8b] font-['阿里巴巴普惠体']">
                {slideData?.topSubtitle || "Project background analysis"}
              </div>
            </div>

            <div className="h-12"></div>

            <div className="max-w-[620px]">
              <h2 className="text-[48px] text-[#a80b0b] font-['微软雅黑'] leading-tight">
                {slideData?.subHeading || "输入标题"}
              </h2>

              <div className="mt-3 text-[16px] text-[#8b8b8b] font-['阿里巴巴普惠体']">
                {slideData?.subSubtitle || "Facing solutions & Method Analysis"}
              </div>

              <div className="mt-5">
                <div className="w-[64px] h-[12px] bg-[#a80b0b] rounded-full"></div>
              </div>

              <p className="mt-8 text-[16px] text-[#8b8b8b] leading-7 font-['阿里巴巴普惠体']">
                {slideData?.paragraph1 || "单击此处输入你的正文，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点；根据需要可酌情增减文字，以便观者可以准确理解您所传达的信息。"}
              </p>

              <p className="mt-6 text-[16px] text-[#8b8b8b] leading-7 font-['阿里巴巴普惠体']">
                {slideData?.paragraph2 || "您的正文已经简明扼要，字字珠玑，但信息却错综复杂，需要用更多的文字来表达；请您尽可能提炼思想的精髓。"}
              </p>
            </div>

            <div className="absolute top-0 bottom-0 right-1/3 w-px translate-x-[0.5px] bg-[#e6e6e6]"></div>

            <div className="absolute left-12 bottom-6 text-[120px] text-[#d6d6d6] font-['阿里巴巴普惠体'] leading-none select-none">
              {slideData?.pageNumber || "02"}
            </div>
          </div>

          <div className="w-1/3 relative flex items-start justify-end px-8 py-8">
            <div className="absolute right-8 top-8 text-[18px] text-[#7b7b7b] font-['阿里巴巴普惠体']">
              {slideData?.logoText || "YOUR LOGO"}
            </div>

            <div className="absolute right-12 top-12 transform rotate-[-8deg] w-[420px] h-[640px] shadow-[0_10px_20px_rgba(0,0,0,0.08)] rounded-[26px] overflow-hidden">
              <img
                src={slideData?.phoneImage?.__image_url__ || ""}
                alt={slideData?.phoneImage?.__image_prompt__ || "phone"}
                className="w-full h-full object-cover"
              />
              <svg viewBox="0 0 420 640" className="absolute inset-0 w-full h-full pointer-events-none">
                <rect x="2" y="2" width="416" height="636" rx="26" ry="26" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="4"/>
              </svg>
            </div>

            <div className="absolute right-[-24px] top-[110px]">
              <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="90" fill="#a80b0b"/>
                <path d="M160 160 L200 200 L140 180 Z" fill="#a80b0b"/>
              </svg>
              <div className="absolute right-[18px] top-[36px] w-[160px] text-center">
                <div className="text-[36px] leading-tight text-white font-['微软雅黑']">
                  {slideData?.bubbleTitle || "标题"}
                </div>
                <div className="mt-2 text-[12px] text-white font-['阿里巴巴普惠体']">
                  {slideData?.bubbleSubtitle || "梦想与科技未来！"}
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
          </div>
        </div>
      </div>
    </>
  )
}

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
