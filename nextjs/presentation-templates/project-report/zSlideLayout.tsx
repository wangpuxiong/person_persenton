import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "number-grid-with-image-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, grid of numbered cards, divider, watermark, and side image"

const Schema = z.object({
  title: z.string().min(2).max(20).default("最新工作计划").meta({
    description: "Main header text. Max 4 words",
  }),
  subtitle: z.string().min(5).max(60).default("Project background analysis").meta({
    description: "Supporting subtitle text. Max 8 words",
  }),
  verticalBarColor: z.string().default("#b80a0a").meta({
    description: "Color of the vertical bar next to the title",
  }),
  cards: z.array(z.object({
    number: z.string().min(1).max(3).default("01").meta({
      description: "Number label for the card. Max 3 characters",
    }),
    title: z.string().min(2).max(18).default("添加小标题").meta({
      description: "Card title. Max 4 words",
    }),
    description: z.string().min(20).max(120).default("单击此处输入你的正文，请尽量言简意赅的阐述观点。").meta({
      description: "Card descriptive paragraph. Max 25 words",
    }),
    underlineIcon: IconSchema.default({
      "__icon_url__": "/static/icons/red-rect-underline.png",
      "__icon_query__": "red rectangular underline"
    }).meta({
      description: "Decorative underline icon for the number",
    })
  })).min(3).max(6).default([
    {
      number: "01",
      title: "添加小标题",
      description: "单击此处输入你的正文，请尽量言简意赅的阐述观点。",
      underlineIcon: {
        "__icon_url__": "/static/icons/red-rect-underline.png",
        "__icon_query__": "red rectangular underline"
      }
    },
    {
      number: "02",
      title: "添加小标题",
      description: "单击此处输入你的正文，请尽量言简意赅的阐述观点。",
      underlineIcon: {
        "__icon_url__": "/static/icons/red-rect-underline.png",
        "__icon_query__": "red rectangular underline"
      }
    },
    {
      number: "03",
      title: "添加小标题",
      description: "单击此处输入你的正文，请尽量言简意赅的阐述观点。",
      underlineIcon: {
        "__icon_url__": "/static/icons/red-rect-underline.png",
        "__icon_query__": "red rectangular underline"
      }
    },
    {
      number: "04",
      title: "添加小标题",
      description: "单击此处输入你的正文，请尽量言简意赅的阐述观点。",
      underlineIcon: {
        "__icon_url__": "/static/icons/red-rect-underline.png",
        "__icon_query__": "red rectangular underline"
      }
    },
    {
      number: "05",
      title: "添加小标题",
      description: "单击此处输入你的正文，请尽量言简意赅的阐述观点。",
      underlineIcon: {
        "__icon_url__": "/static/icons/red-rect-underline.png",
        "__icon_query__": "red rectangular underline"
      }
    },
    {
      number: "06",
      title: "添加小标题",
      description: "单击此处输入你的正文，请尽量言简意赅的阐述观点。",
      underlineIcon: {
        "__icon_url__": "/static/icons/red-rect-underline.png",
        "__icon_query__": "red rectangular underline"
      }
    }
  ]).meta({
    description: "Grid of numbered cards. Min 3 items, Max 6 items",
  }),
  watermark: z.string().min(1).max(4).default("04").meta({
    description: "Large faint watermark text. Max 2 words",
  }),
  sideImage: ImageSchema.default({
    "__image_url__": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "__image_prompt__": "People working at a desk with laptop and pen"
  }).meta({
    description: "Right side panel image",
  })
})

type SlideData = z.infer<typeof Schema>

interface SlideProps {
  data?: Partial<SlideData>
}

const dynamicSlideLayout: React.FC<SlideProps> = ({ data: slideData }) => {
  const cards = slideData?.cards || []
  const topCards = cards.slice(0, 3)
  const bottomCards = cards.slice(3)

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <div className="flex h-full">
          <div className="flex-1 px-[56px] py-[36px] flex flex-col overflow-hidden relative">
            <div className="flex items-end gap-6">
              <div className="flex items-center">
                <h1 className="text-[56px] leading-none text-[#b80a0a] font-['阿里巴巴普惠体'] font-extrabold">
                  {slideData?.title || "最新工作计划"}
                </h1>
                <div className="w-[2px] h-[48px] ml-4" style={{ backgroundColor: slideData?.verticalBarColor || "#b80a0a" }} />
              </div>
              <p className="text-[16px] text-[#666] font-['微软雅黑']">
                {slideData?.subtitle || "Project background analysis"}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-x-[48px] gap-y-[28px] mt-[28px] flex-1 overflow-hidden">
              {topCards.map((card, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="relative mb-3 h-[68px]">
                    <div className="text-[#b80a0a] text-[64px] leading-[64px] font-['阿里巴巴普惠体']">
                      {card?.number}
                    </div>
                    <svg className="absolute left-0 bottom-0" width="68" height="16" viewBox="0 0 68 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <rect width="68" height="16" fill={slideData?.verticalBarColor || "#b80a0a"} />
                    </svg>
                  </div>

                  <h3 className="text-[#b80a0a] text-[18px] font-['微软雅黑'] mb-3">
                    {card?.title}
                  </h3>
                  <p className="text-[14px] text-[#8a8a8a] font-['微软雅黑'] leading-[22px]">
                    {card?.description}
                  </p>
                </div>
              ))}

              <div className="col-span-3 border-t border-dashed border-[#bdbdbd] mt-2 mb-2" />

              {bottomCards.map((card, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="relative mb-3 h-[68px]">
                    <div className="text-[#b80a0a] text-[64px] leading-[64px] font-['阿里巴巴普惠体']">
                      {card?.number}
                    </div>
                    <svg className="absolute left-0 bottom-0" width="68" height="16" viewBox="0 0 68 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <rect width="68" height="16" fill={slideData?.verticalBarColor || "#b80a0a"} />
                    </svg>
                  </div>

                  <h3 className="text-[#b80a0a] text-[18px] font-['微软雅黑'] mb-3">
                    {card?.title}
                  </h3>
                  <p className="text-[14px] text-[#8a8a8a] font-['微软雅黑'] leading-[22px]">
                    {card?.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="absolute left-[60px] bottom-[24px] opacity-10 text-[120px] text-[#bdbdbd] font-['阿里巴巴普惠体'] select-none pointer-events-none">
              {slideData?.watermark || "04"}
            </div>
          </div>

          <div className="w-[320px] flex-shrink-0">
            <img src={slideData?.sideImage?.__image_url__ || ""} alt={slideData?.sideImage?.__image_prompt__ || ""} className="object-cover w-full h-full" />
          </div>
        </div>
      </div>
    </>
  )
}

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
