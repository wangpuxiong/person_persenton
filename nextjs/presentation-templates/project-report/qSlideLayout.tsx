import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-image-three-columns-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, image, red content box, and column cards"

const Schema = z.object({
  mainTitle: z.string().min(4).max(12).default("项目成果介绍").meta({
    description: "Main Chinese title. Max 6 words",
  }),
  englishSubtitle: z.string().min(10).max(40).default("Project background analysis").meta({
    description: "English subtitle. Max 8 words",
  }),
  logoText: z.string().min(4).max(12).default("YOUR LOGO").meta({
    description: "Top-right logo text. Max 3 words",
  }),
  image: ImageSchema.default({
    __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    __image_prompt__: "team of professionals in a meeting, hands together over a table"
  }).meta({
    description: "Left supporting image. Max 30 words",
  }),
  redBoxTitle: z.string().min(4).max(20).default("请添加标题").meta({
    description: "Title inside the red content box. Max 6 words",
  }),
  redBoxParagraph: z.string().min(40).max(240).default("单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点；根据需要可酌情增减文字，以便观者可以准确理解您所传达的信息。").meta({
    description: "Paragraph inside the red content box. Max 40 words",
  }),
  columns: z.array(z.object({
    subtitle: z.string().min(4).max(12).default("添加小标题").meta({
      description: "Column subtitle. Max 4 words",
    }),
    body: z.string().min(20).max(120).default("单击此处输入你的正文言简意赅的阐述观点根据需要增减文字").meta({
      description: "Column body text. Max 20 words",
    })
  })).min(3).max(3).default([
    {
      subtitle: "添加小标题",
      body: "单击此处输入你的正文言简意赅的阐述观点根据需要增减文字"
    },
    {
      subtitle: "添加小标题",
      body: "单击此处输入你的正文言简意赅的阐述观点根据需要增减文字"
    },
    {
      subtitle: "添加小标题",
      body: "单击此处输入你的正文言简意赅的阐述观点根据需要增减文字"
    }
  ]).meta({
    description: "Array of column cards. Fixed number of items",
  }),
  pageNumber: z.string().min(1).max(6).default("03").meta({
    description: "Page number text. Max 2 words",
  }),
  analysisButtonText: z.string().min(4).max(20).default("ANALYSIS").meta({
    description: "Text for the analysis button. Max 2 words",
  }),
  analysisButtonIcon: IconSchema.default({
    __icon_url__: "/static/icons/arrow-right.png",
    __icon_query__: "circular arrow right"
  }).meta({
    description: "Icon for the analysis button. Max 5 words",
  })
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
  data?: Partial<SlideData>
}

const dynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data: slideData }) => {
  const columns = slideData?.columns || []

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <div className="flex items-center justify-between px-10 pt-8">
          <div className="flex items-center space-x-6">
            <h1 className="text-[56px] leading-[56px] font-['微软雅黑'] text-[#9b0a0a]">
              {slideData?.mainTitle || "项目成果介绍"}
            </h1>
            <svg className="h-[56px] w-[2px]" viewBox="0 0 2 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="2" height="56" fill="#9b0a0a"/>
            </svg>
            <div className="text-[16px] font-['阿里巴巴普惠体'] text-gray-500">
              {slideData?.englishSubtitle || "Project background analysis"}
            </div>
          </div>

          <div className="text-[20px] font-['微软雅黑'] text-gray-600">
            {slideData?.logoText || "YOUR LOGO"}
          </div>
        </div>

        <div className="px-10 pt-8 grid grid-cols-12 gap-6">
          <div className="col-span-4">
            <img src={slideData?.image?.__image_url__ || ""} alt={slideData?.image?.__image_prompt__ || slideData?.mainTitle || ""} className="w-full h-[260px] object-cover rounded-sm shadow-sm"/>
          </div>

          <div className="col-span-8">
            <div className="bg-[#9b0a0a] text-white h-[260px] p-10 flex flex-col justify-center rounded-sm">
              <h2 className="text-[40px] font-['微软雅黑'] leading-tight mb-4">
                {slideData?.redBoxTitle || "请添加标题"}
              </h2>
              <p className="text-[16px] font-['微软雅黑'] leading-7 max-w-[780px]">
                {slideData?.redBoxParagraph || "单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点；根据需要可酌情增减文字，以便观者可以准确理解您所传达的信息。"}
              </p>
            </div>
          </div>
        </div>

        <div className="px-10 mt-10 grid grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center px-6">
            <h3 className="text-[28px] font-['微软雅黑'] text-[#9b0a0a] mb-4">
              {columns[0]?.subtitle || "添加小标题"}
            </h3>
            <p className="text-[16px] font-['微软雅黑'] text-gray-500 leading-7 max-w-[260px]">
              {columns[0]?.body || "单击此处输入你的正文言简意赅的阐述观点根据需要增减文字"}
            </p>
          </div>

          <div className="flex justify-center">
            <svg className="h-[120px] w-[1px]" viewBox="0 0 1 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="1" height="120" fill="#e6e6e6"/>
            </svg>
          </div>

          <div className="flex flex-col items-center text-center px-6">
            <h3 className="text-[28px] font-['微软雅黑'] text-[#9b0a0a] mb-4">
              {columns[1]?.subtitle || "添加小标题"}
            </h3>
            <p className="text-[16px] font-['微软雅黑'] text-gray-500 leading-7 max-w-[260px]">
              {columns[1]?.body || "单击此处输入你的正文言简意赅的阐述观点根据需要增减文字"}
            </p>
          </div>

          <div className="flex justify-center">
            <svg className="h-[120px] w-[1px]" viewBox="0 0 1 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="1" height="120" fill="#e6e6e6"/>
            </svg>
          </div>

          <div className="flex flex-col items-center text-center px-6">
            <h3 className="text-[28px] font-['微软雅黑'] text-[#9b0a0a] mb-4">
              {columns[2]?.subtitle || "添加小标题"}
            </h3>
            <p className="text-[16px] font-['微软雅黑'] text-gray-500 leading-7 max-w-[260px]">
              {columns[2]?.body || "单击此处输入你的正文言简意赅的阐述观点根据需要增减文字"}
            </p>
          </div>
        </div>

        <div className="absolute left-8 bottom-6 text-[120px] font-['微软雅黑'] text-gray-200 leading-none select-none pointer-events-none">
          {slideData?.pageNumber || "03"}
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
    </>
  )
}

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
