import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-three-cards-arrows-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, three cards with icons and arrows, and a footer paragraph."

const Schema = z.object({
  headerTitle: z.string().min(4).max(12).default("项目进展情况").meta({
    description: "Main Chinese title shown in header. Max 6 words",
  }),
  headerSubtitle: z.string().min(10).max(50).default("Project background analysis").meta({
    description: "English subtitle next to the main title. Max 8 words",
  }),
  logoText: z.string().min(1).max(3).default("i").meta({
    description: "Small logo text inside circular badge. Max 1 word",
  }),
  backgroundImage: ImageSchema.default({
    __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    __image_prompt__: "Subtle blurred background texture for slide"
  }).meta({
    description: "Background subtle image. Max 30 words",
  }),
  cards: z.array(z.object({
    title: z.string().min(4).max(20).default("添加小标题").meta({
      description: "Card title text. Max 4 words",
    }),
    description: z.string().min(12).max(120).default("单击输入正文，请言简意赅的阐述观点；可酌情增减文字").meta({
      description: "Card paragraph text. Max 20 words",
    }),
    icon: IconSchema.default({
      __icon_url__: "/static/icons/placeholder.svg",
      __icon_query__: "icon query"
    }).meta({
      description: "Icon for the card with prompt and url. Icon prompt max 3 words",
    })
  })).min(3).max(3).default([
    {
      title: "添加小标题",
      description: "单击输入正文，请言简意赅的阐述观点；可酌情增减文字",
      icon: {
        __icon_url__: "/static/icons/placeholder.svg",
        __icon_query__: "coins icon"
      }
    },
    {
      title: "添加小标题",
      description: "单击输入正文，请言简意赅的阐述观点；可酌情增减文字",
      icon: {
        __icon_url__: "/static/icons/placeholder.svg",
        __icon_query__: "basket icon"
      }
    },
    {
      title: "添加小标题",
      description: "单击输入正文，请言简意赅的阐述观点；可酌情增减文字",
      icon: {
        __icon_url__: "/static/icons/placeholder.svg",
        __icon_query__: "laptop yuan icon"
      }
    }
  ]).meta({
    description: "Three structured cards with icons and descriptions. Max 3 cards",
  }),
  centerParagraph: z.string().min(40).max(220).default("此处输入你的正文，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点；根据需要可酌情增减文字，以便观者可以准确理解您所传达的信息。").meta({
    description: "Main explanatory paragraph in the footer. Max 40 words",
  }),
  pageNumber: z.string().min(1).max(3).default("02").meta({
    description: "Page number shown on the left. Max 1 word",
  }),
  analysisButtonLabel: z.string().min(3).max(20).default("ANALYSIS").meta({
    description: "Label text for the analysis button. Max 2 words",
  })
})

type DynamicSlideLayoutData = z.infer<typeof Schema>

interface DynamicSlideLayoutProps {
  data?: Partial<DynamicSlideLayoutData>
}

const dynamicSlideLayout: React.FC<DynamicSlideLayoutProps> = ({ data: slideData }) => {
  const cards = slideData?.cards || []

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <img
          src={slideData?.backgroundImage?.__image_url__ || ""}
          alt={slideData?.backgroundImage?.__image_prompt__ || "background"}
          className="absolute inset-0 w-full h-full object-cover opacity-5 pointer-events-none"
        />

        <div className="relative z-30 flex flex-col h-full px-12 py-8">
          <div className="flex items-start justify-between">
            <div className="flex items-end">
              <h1 className="text-[64px] leading-[1] font-['阿里巴巴普惠体'] text-[#9b0000] mr-4">
                {slideData?.headerTitle || "项目进展情况"}
              </h1>
              <div className="h-[56px] w-[2px] bg-[#9b0000] mr-4"></div>
              <div className="mt-4 text-[16px] font-['微软雅黑'] text-[#7d7d7d]">
                {slideData?.headerSubtitle || "Project background analysis"}
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-28 h-28 rounded-full border border-transparent bg-gray-100 flex items-center justify-center">
                <span className="text-[#6b6b6b] font-['微软雅黑'] text-[14px]">
                  {slideData?.logoText || "i"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center mt-6">
            <div className="w-full max-w-[1100px] flex items-center justify-between">
              <div className="flex items-center">
                <div className="rounded-[22px] border-4 border-[#9b0000] p-4" style={{ boxShadow: "0 0 0 6px #fff inset" }}>
                  <div className="rounded-[14px] border-4 border-dashed border-[#9b0000] p-6">
                    <div className="bg-[#9b0000] rounded-[10px] w-[200px] h-[260px] flex flex-col items-center justify-center text-center p-6">
                      <img src={cards[0]?.icon?.__icon_url__ || "/static/icons/coins.png"} alt={cards[0]?.icon?.__icon_query__ || "coins"} className="w-16 h-16 text-white mb-4 object-contain" />
                      <h3 className="text-white text-[22px] font-['阿里巴巴普惠体'] mb-3">
                        {cards[0]?.title || "添加小标题"}
                      </h3>
                      <p className="text-white text-[14px] leading-[1.6] font-['微软雅黑'] max-w-[230px]">
                        {cards[0]?.description || "单击输入正文，请言简意赅的阐述观点；可酌情增减文字"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center px-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <svg className="w-12 h-12 text-[#9b0000]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M6 32h40" stroke="#9b0000" strokeWidth="6" strokeLinecap="butt" />
                    <path d="M46 20 L58 32 L46 44" stroke="#9b0000" strokeWidth="6" strokeLinejoin="round" fill="none"/>
                  </svg>
                </div>
              </div>

              <div className="flex items-center">
                <div className="rounded-[22px] border-4 border-[#9b0000] p-4" style={{ boxShadow: "0 0 0 6px #fff inset" }}>
                  <div className="rounded-[14px] p-6">
                    <div className="bg-[#9b0000] rounded-[10px] w-[200px] h-[260px] flex flex-col items-center justify-center text-center p-6">
                      <img src={cards[1]?.icon?.__icon_url__ || "/static/icons/basket.png"} alt={cards[1]?.icon?.__icon_query__ || "basket"} className="w-16 h-16 text-white mb-4 object-contain" />
                      <h3 className="text-white text-[22px] font-['阿里巴巴普惠体'] mb-3">
                        {cards[1]?.title || "添加小标题"}
                      </h3>
                      <p className="text-white text-[14px] leading-[1.6] font-['微软雅黑'] max-w-[230px]">
                        {cards[1]?.description || "单击输入正文，请言简意赅的阐述观点；可酌情增减文字"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center px-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <svg className="w-12 h-12 text-[#9b0000]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M6 32h40" stroke="#9b0000" strokeWidth="6" strokeLinecap="butt" />
                    <path d="M46 20 L58 32 L46 44" stroke="#9b0000" strokeWidth="6" strokeLinejoin="round" fill="none"/>
                  </svg>
                </div>
              </div>

              <div className="flex items-center">
                <div className="rounded-[22px] border-4 border-[#9b0000] p-4" style={{ boxShadow: "0 0 0 6px #fff inset" }}>
                  <div className="rounded-[14px] border-4 border-dashed border-[#9b0000] p-6">
                    <div className="bg-[#9b0000] rounded-[10px] w-[200px] h-[260px] flex flex-col items-center justify-center text-center p-6">
                      <img src={cards[2]?.icon?.__icon_url__ || "/static/icons/laptop-yen.png"} alt={cards[2]?.icon?.__icon_query__ || "laptop yen"} className="w-16 h-16 text-white mb-4 object-contain" />
                      <h3 className="text-white text-[22px] font-['阿里巴巴普惠体'] mb-3">
                        {cards[2]?.title || "添加小标题"}
                      </h3>
                      <p className="text-white text-[14px] leading-[1.6] font-['微软雅黑'] max-w-[230px]">
                        {cards[2]?.description || "单击输入正文，请言简意赅的阐述观点；可酌情增减文字"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-[92px] font-['微软雅黑'] text-[#d8d8d8] leading-none">
              {slideData?.pageNumber || "02"}
            </div>

            <div className="flex-1 mx-32">
              <p className="text-[16px] font-['微软雅黑'] text-[#9a9a9a] text-center leading-[1.8] px-12">
                {slideData?.centerParagraph || "此处输入你的正文，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点；根据需要可酌情增减文字，以便观者可以准确理解您所传达的信息。"}
              </p>
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
