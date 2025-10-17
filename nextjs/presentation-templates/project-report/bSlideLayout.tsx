import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "image-left-numbered-list-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with an image column and a numbered list with titles and subtitles."

const Schema = z.object({
  backgroundImage: ImageSchema.default({
    __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    __image_prompt__: "Modern glass building facade from low angle with dramatic sky"
  }).meta({
    description: "Background image for the left column. Max 30 words",
  }),
  bigTitle: z.string().min(2).max(4).default("目录").meta({
    description: "Main Chinese title displayed over the image. Max 4 words",
  }),
  subtitle: z.string().min(6).max(20).default("contents").meta({
    description: "English subtitle shown under the main title. Max 4 words",
  }),
  arrowIcon: IconSchema.default({
    __icon_url__: "",
    __icon_query__: "circular right arrow button"
  }).meta({
    description: "Icon for the circular button. Max 5 words",
  }),
  items: z.array(z.object({
    number: z.string().min(2).max(2).default("01").meta({
      description: "Number label for the list item. Exactly 2 characters",
    }),
    title: z.string().min(4).max(12).default("项目背景解析").meta({
      description: "Chinese title for the list item. Max 12 characters",
    }),
    subtitle: z.string().min(10).max(40).default("Project background analysis").meta({
      description: "English subtitle for the list item. Max 40 characters and Max 8 words",
    })
  })).min(1).max(4).default([
    {
      number: "01",
      title: "项目背景解析",
      subtitle: "Project background analysis"
    },
    {
      number: "02",
      title: "项目进展情况",
      subtitle: "Project progress"
    },
    {
      number: "03",
      title: "项目成果介绍",
      subtitle: "Introduction of project results"
    },
    {
      number: "04",
      title: "最新工作计划",
      subtitle: "Latest work plan"
    }
  ]).meta({
    description: "A numbered list with titles and subtitles. Max 4 items",
  })
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
  data?: Partial<SlideData>
}

const dynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data: slideData }) => {
  const items = slideData?.items || []

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <div className="flex h-full">
          <div className="w-[440px] relative flex flex-col justify-center pl-10">
            <img
              src={slideData?.backgroundImage?.__image_url__ || ""}
              alt={slideData?.backgroundImage?.__image_prompt__ || ""}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#9b0202] via-[#9b0202]/80 to-black/20 opacity-85"></div>

            <div className="relative z-10 text-white max-w-[360px]">
              <div className="font-['微软雅黑'] text-white text-[220px] leading-[200px] -tracking-[2px]">
                {slideData?.bigTitle || "目录"}
              </div>
              <div className="font-['阿里巴巴普惠体'] text-white text-[28px] mt-2">
                {slideData?.subtitle || "contents"}
              </div>
            </div>

            <div className="relative z-10 mt-12 pl-2">
              <button aria-label="next" className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow">
                {slideData?.arrowIcon?.__icon_url__ ? (
                  <img src={slideData?.arrowIcon?.__icon_url__} alt={slideData?.arrowIcon?.__icon_query__ || "arrow"} className="w-5 h-5" />
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 6L16 12L10 18" stroke="#A61A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex-1 px-14 py-12">
            <div className="flex flex-col justify-center h-full gap-8">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-6">
                  <div className="w-[160px] text-[#c9c9c9] font-['阿里巴巴普惠体'] text-[120px] leading-[110px]">
                    {item.number}
                  </div>

                  <div className="w-[10px] flex justify-center">
                    <svg width="4" height="100" viewBox="0 0 4 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="1.5" y="0" width="1" height="100" fill="#9b0d0d"/>
                    </svg>
                  </div>

                  <div className="flex-1 pl-8">
                    <div className="font-['微软雅黑'] text-[#a60d0d] text-[48px] leading-[50px] font-extrabold">
                      {item.title}
                    </div>
                    <div className="font-['阿里巴巴普惠体'] text-[#757575] text-[14px] mt-3">
                      {item.subtitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
