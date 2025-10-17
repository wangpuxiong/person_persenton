import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-left-card-image-info-columns-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, a left card, an image, and info columns."

const Schema = z.object({
  mainTitle: z.string().min(4).max(10).default("最新工作计划").meta({
    description: "Main title text. Max 4 words",
  }),
  subtitle: z.string().min(20).max(40).default("Project background analysis").meta({
    description: "Subtitle text next to the main title. Max 8 words",
  }),
  logoText: z.string().min(6).max(12).default("YOUR LOGO").meta({
    description: "Logo text displayed in header. Max 3 words",
  }),
  leftCard: z.object({
    icon: IconSchema.default({
      __icon_url__: "/static/icons/building.svg",
      __icon_query__: "building line icon"
    }).meta({
      description: "Icon displayed on the left card",
    }),
    title: z.string().min(6).max(12).default("请输入你的标题").meta({
      description: "Left card title. Max 4 words",
    }),
    paragraph: z.string().min(50).max(220).default("单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点").meta({
      description: "Left card paragraph text. Max 40 words",
    })
  }).default({
    icon: {
      __icon_url__: "/static/icons/building.svg",
      __icon_query__: "building line icon"
    },
    title: "请输入你的标题",
    paragraph: "单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点"
  }),
  bannerImage: ImageSchema.default({
    __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    __image_prompt__: "office laptop banner"
  }).meta({
    description: "Top banner image",
  }),
  infoColumns: z.array(z.object({
    title: z.string().min(6).max(14).default("请输入你的标题").meta({
      description: "Info column title. Max 6 words",
    }),
    paragraph: z.string().min(40).max(180).default("单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点").meta({
      description: "Info column paragraph. Max 35 words",
    })
  })).min(2).max(4).default([
    {
      title: "请输入你的标题",
      paragraph: "单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点"
    },
    {
      title: "请输入你的标题",
      paragraph: "单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点"
    }
  ]).meta({
    description: "Array of info column objects. Max 4 items",
  }),
  actionButton: z.object({
    text: z.string().min(6).max(10).default("ANALYSIS").meta({
      description: "Button text. Max 2 words",
    }),
    icon: IconSchema.default({
      __icon_url__: "/static/icons/chevron.png",
      __icon_query__: "chevron right"
    }).meta({
      description: "Icon shown within the button",
    })
  }).default({
    text: "ANALYSIS",
    icon: {
      __icon_url__: "/static/icons/chevron.png",
      __icon_query__: "chevron right"
    }
  }),
  pageNumber: z.string().min(1).max(2).default("04").meta({
    description: "Decorative page number. Max 1 word",
  })
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
  data?: Partial<SlideData>
}

const dynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data: slideData }) => {
  const infoColumns = slideData?.infoColumns || []
  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <div className="w-full h-full px-[56px] py-[36px] box-border flex flex-col">
          <div className="w-full flex items-start justify-between">
            <div className="flex items-center">
              <h1 className="text-[56px] leading-[1] font-['优设标题黑'] text-[#9b0000] mr-4">
                {slideData?.mainTitle || "最新工作计划"}
              </h1>
              <div className="w-[2px] h-[56px] bg-[#c83b3b] mr-6"></div>
              <div className="text-[16px] leading-[1.4] font-['微软雅黑'] text-[#7f7f7f] mt-1">
                {slideData?.subtitle || "Project background analysis"}
              </div>
            </div>
            <div className="text-[20px] font-['微软雅黑'] text-[#666666]">
              {slideData?.logoText || "YOUR LOGO"}
            </div>
          </div>

          <div className="w-full flex-1 mt-8 flex gap-10">
            <div className="flex-shrink-0 w-[420px] h-[460px] bg-[#9b0000] rounded-[28px] p-8 text-white flex flex-col items-center box-border">
              <div className="w-20 h-20 text-white mb-6" role="img" aria-label={slideData?.leftCard?.icon?.__icon_query__ || "building"}>
                <svg className="w-20 h-20 text-white mb-6" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="building">
                  <rect x="10" y="20" width="12" height="30" stroke="white" strokeWidth="2" rx="1" />
                  <rect x="26" y="14" width="22" height="36" stroke="white" strokeWidth="2" rx="1" />
                  <path d="M36 14v-4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <rect x="13" y="24" width="6" height="4" fill="white" />
                  <rect x="32" y="20" width="6" height="4" fill="white" />
                  <rect x="40" y="28" width="6" height="4" fill="white" />
                </svg>
              </div>

              <h2 className="text-[26px] font-['阿里巴巴普惠体'] mb-3">
                {slideData?.leftCard?.title || "请输入你的标题"}
              </h2>

              <div className="w-[140px] h-[2px] bg-white my-4"></div>

              <p className="text-[15px] font-['微软雅黑'] text-white text-center leading-[1.9] mt-4 px-4">
                {slideData?.leftCard?.paragraph || "单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点"}
              </p>

              <div className="flex-1"></div>
            </div>

            <div className="flex-1 flex flex-col">
              <div className="w-full rounded-[18px] overflow-hidden h-[160px]">
                <img src={slideData?.bannerImage?.__image_url__ || ""} alt={slideData?.bannerImage?.__image_prompt__ || "banner"} className="w-full h-full object-cover"/>
              </div>

              <div className="w-full flex-1 mt-6 flex gap-8">
                <div className="flex-1 pr-6">
                  <h3 className="text-[22px] font-['阿里巴巴普惠体'] text-[#9b0000] mb-3">
                    {infoColumns?.[0]?.title || "请输入你的标题"}
                  </h3>
                  <p className="text-[15px] font-['微软雅黑'] text-[#8b8b8b] leading-[1.9]">
                    {infoColumns?.[0]?.paragraph || "单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点"}
                  </p>
                </div>

                <div className="w-[1px] bg-[#d0d0d0]"></div>

                <div className="flex-1 pl-6">
                  <h3 className="text-[22px] font-['阿里巴巴普惠体'] text-[#9b0000] mb-3">
                    {infoColumns?.[1]?.title || "请输入你的标题"}
                  </h3>
                  <p className="text-[15px] font-['微软雅黑'] text-[#8b8b8b] leading-[1.9]">
                    {infoColumns?.[1]?.paragraph || "单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点"}
                  </p>
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
      </div>
    </>
  )
}

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
