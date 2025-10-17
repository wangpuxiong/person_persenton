import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-image-timeline-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, image, timeline items, and footer."

const Schema = z.object({
  mainTitle: z.string().min(4).max(12).default("项目背景解析").meta({
    description: "Main Chinese title. Max 3 words",
  }),
  subtitle: z.string().min(10).max(40).default("Project background analysis").meta({
    description: "English subtitle. Max 5 words",
  }),
  logoText: z.string().min(4).max(20).default("YOUR LOGO").meta({
    description: "Logo text displayed in header. Max 4 words",
  }),
  image: ImageSchema.default({
    "__image_url__": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "__image_prompt__": "photo"
  }).meta({
    description: "Left column image. Max 30 words",
  }),
  timelineItems: z.array(z.object({
    heading: z.string().min(6).max(30).default("请输入你的标题").meta({
      description: "Timeline item heading. Max 6 words",
    }),
    paragraph: z.string().min(20).max(220).default("单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点").meta({
      description: "Timeline item paragraph. Max 40 words",
    }),
    icon: IconSchema,
  })).min(1).max(4).default([
    {
      heading: "请输入你的标题",
      paragraph: "单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点",
      icon: {
        "__icon_url__": "/static/icons/placeholder.svg",
        "__icon_query__": "circle with i"
      }
    },
    {
      heading: "请输入你的标题",
      paragraph: "单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点",
      icon: {
        "__icon_url__": "/static/icons/placeholder.svg",
        "__icon_query__": "circle with i"
      }
    },
    {
      heading: "请输入你的标题",
      paragraph: "单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点",
      icon: {
        "__icon_url__": "/static/icons/placeholder.svg",
        "__icon_query__": "circle with i"
      }
    }
  ]).meta({
    description: "List of timeline items. Max 4 items",
  }),
  pageNumber: z.string().min(1).max(3).default("01").meta({
    description: "Footer page number. Max 3 chars",
  }),
  buttonText: z.string().min(4).max(12).default("ANALYSIS").meta({
    description: "Footer action button text. Max 2 words",
  }),
  buttonIcon: IconSchema.default({
    "__icon_url__": "/static/icons/placeholder.svg",
    "__icon_query__": "right arrow"
  }).meta({
    description: "Button icon",
  })
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
  data?: Partial<SlideData>
}

const dynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data: slideData }) => {
  const items = slideData?.timelineItems || []

  return (
    <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
      <div className="flex items-start justify-between px-12 pt-8">
        <div className="flex items-center">
          <h1 className="text-[64px] leading-[64px] text-[#9b0b0b] font-['优设标题黑'] mr-4">
            {slideData?.mainTitle || "项目背景解析"}
          </h1>
          <div className="flex items-center text-gray-500">
            <span className="inline-block w-[2px] h-[48px] bg-[#9b0b0b] mr-4"></span>
            <div className="text-[16px] leading-[20px] font-['阿里巴巴普惠体']">
              {slideData?.subtitle || "Project background analysis"}
            </div>
          </div>
        </div>

        <div className="text-[20px] leading-[24px] text-gray-600 font-['微软雅黑'] pr-6">
          {slideData?.logoText || "YOUR LOGO"}
        </div>
      </div>

      <div className="flex px-12 pt-6 gap-8">
        <div className="flex-shrink-0">
          <img
            src={slideData?.image?.__image_url__ || "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"}
            alt={slideData?.image?.__image_prompt__ || "photo"}
            className="w-[520px] h-[420px] object-cover rounded-[28px] shadow-sm"
          />
        </div>

        <div className="flex-1">
          <div className="relative pl-10">
            <div className="absolute left-0 top-0 bottom-0 flex items-start">
              <div className="w-[4px] bg-[#9b0b0b] rounded mr-6 h-full"></div>
            </div>

            <div className="flex flex-col gap-10">
              {items.map((item, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="w-5 h-5 rounded-full bg-[#9b0b0b] flex items-center justify-center -ml-[34px] mt-1">
                    {item?.icon?.__icon_url__ ? (
                      <img src={item.icon.__icon_url__} alt={item.icon.__icon_query__ || "icon"} className="w-3 h-3" />
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <text x="50%" y="58%" textAnchor="middle" fontSize="9" fill="white" fontFamily="sans-serif">i</text>
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="text-[#9b0b0b] text-[22px] leading-[28px] font-['优设标题黑']">
                      {item?.heading || "请输入你的标题"}
                    </div>
                    <p className="text-[16px] leading-[28px] text-gray-500 mt-2 font-['微软雅黑'] max-w-[520px]">
                      {item?.paragraph || "单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-12 pt-6">
        <div className="text-[96px] leading-[96px] text-[#bfbfbf] font-['微软雅黑']">
          {slideData?.pageNumber || "01"}
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
  )
}

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
