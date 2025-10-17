import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-center-kpi-left-right-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, center circle, left and right items and supporting cards"

const Schema = z.object({
  mainTitle: z.string().min(4).max(10).default("项目成果介绍").meta({
    description: "Main Chinese title. Max 10 chars. Max 5 words",
  }),
  subtitle: z.string().min(10).max(40).default("Project background analysis").meta({
    description: "English subtitle. Max 40 chars. Max 6 words",
  }),
  logoText: z.string().min(4).max(12).default("YOUR LOGO").meta({
    description: "Top right logo text. Max 12 chars. Max 3 words",
  }),
  logoImage: ImageSchema.default({
    "__image_url__": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "__image_prompt__": "round company logo on neutral background"
  }).meta({
    description: "Top right logo image. Max 30 words",
  }),
  infoDotText: z.string().min(1).max(4).default("i").meta({
    description: "Small info dot text. Max 4 chars. Max 1 word",
  }),
  leftItems: z.array(z.object({
    title: z.string().min(4).max(12).default("添加标题").meta({
      description: "Left item title. Max 12 chars. Max 4 words",
    }),
    description: z.string().min(8).max(60).default("单击此处输入你的正文").meta({
      description: "Left item subtitle. Max 60 chars. Max 12 words",
    }),
    icon: IconSchema.default({
      "__icon_url__": "/static/icons/arrow-left.png",
      "__icon_query__": "left circular arrow"
    }),
  })).min(1).max(4).default([
    { title: "添加标题", description: "单击此处输入你的正文", icon: { "__icon_url__": "/static/icons/placeholder.svg", "__icon_query__": "left circular arrow" } },
    { title: "添加标题", description: "单击此处输入你的正文", icon: { "__icon_url__": "/static/icons/placeholder.svg", "__icon_query__": "left circular arrow" } },
    { title: "添加标题", description: "单击此处输入你的正文", icon: { "__icon_url__": "/static/icons/placeholder.svg", "__icon_query__": "left circular arrow" } }
  ]).meta({
    description: "List of left side items with icons and descriptions. Max 4 items",
  }),
  rightItems: z.array(z.object({
    title: z.string().min(4).max(12).default("添加标题").meta({
      description: "Right item title. Max 12 chars. Max 4 words",
    }),
    description: z.string().min(8).max(60).default("单击此处输入你的正文").meta({
      description: "Right item subtitle. Max 60 chars. Max 12 words",
    }),
    icon: IconSchema.default({
      "__icon_url__": "/static/icons/placeholder.svg",
      "__icon_query__": "right circular arrow"
    }),
  })).min(1).max(4).default([
    { title: "添加标题", description: "单击此处输入你的正文", icon: { "__icon_url__": "/static/icons/placeholder.svg", "__icon_query__": "right circular arrow" } },
    { title: "添加标题", description: "单击此处输入你的正文", icon: { "__icon_url__": "/static/icons/placeholder.svg", "__icon_query__": "right circular arrow" } },
    { title: "添加标题", description: "单击此处输入你的正文", icon: { "__icon_url__": "/static/icons/placeholder.svg", "__icon_query__": "right circular arrow" } }
  ]).meta({
    description: "List of right side items with icons and descriptions. Max 4 items",
  }),
  centerMainText: z.string().min(1).max(6).default("KPI").meta({
    description: "Center main text inside circle. Max 6 chars. Max 2 words",
  }),
  centerSubText: z.string().min(1).max(10).default("LINE").meta({
    description: "Center subtext inside circle. Max 10 chars. Max 3 words",
  }),
  taglineLines: z.array(z.string().min(2).max(20)).min(1).max(3).default(["dreaming the","future","changing world"]).meta({
    description: "Center tagline lines. Each line max 20 chars. Max 4 words per line",
  }),
  bottomParagraph: z.string().min(20).max(140).default("此处输入你的正文，为了最终演示发布的良好效果请尽量言简意赅的阐述观点；").meta({
    description: "Bottom center paragraph. Max 140 chars. Max 30 words",
  }),
  pageNumber: z.string().min(1).max(4).default("03").meta({
    description: "Bottom left page number. Max 4 chars",
  }),
  button: z.object({
    label: z.string().min(4).max(12).default("ANALYSIS").meta({
      description: "Bottom right button label. Max 12 chars. Max 2 words",
    }),
    icon: IconSchema.default({
      "__icon_url__": "/static/icons/placeholder.svg",
      "__icon_query__": "small right arrow white"
    })
  }).default({
    label: "ANALYSIS",
    icon: { "__icon_url__": "/static/icons/placeholder.svg", "__icon_query__": "small right arrow white" }
  }).meta({
    description: "Button label and icon",
  })
})

type DynamicSlideData = z.infer<typeof Schema>

interface DynamicSlideProps {
  data?: Partial<DynamicSlideData>
}

const dynamicSlideLayout: React.FC<DynamicSlideProps> = ({ data: slideData }) => {
  const leftItems = slideData?.leftItems || []
  const rightItems = slideData?.rightItems || []
  const tagline = slideData?.taglineLines || []

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <div className="w-full h-full px-10 py-8 font-['微软雅黑'] text-[#555]">
          <div className="flex items-start justify-between">
            <div className="flex items-end gap-6">
              <h1 className="text-[56px] leading-[56px] font-['阿里巴巴普惠体'] text-[#A90B0B]">
                {slideData?.mainTitle || "项目成果介绍"}
              </h1>
              <div className="w-[2px] h-[48px] bg-[#A90B0B] opacity-100"></div>
              <div className="text-[16px] leading-[20px] text-[#7f7f7f] mt-[8px]">
                {slideData?.subtitle || "Project background analysis"}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-[18px] text-[#666] font-['微软雅黑'] mr-4">
                {slideData?.logoText || "YOUR LOGO"}
              </div>
              <img src={slideData?.logoImage?.__image_url__} alt={slideData?.logoImage?.__image_prompt__ || "logo"} className="w-12 h-12 rounded-full object-cover"/>
              <div className="w-8 h-8 rounded-full bg-[#f3f3f3] flex items-center justify-center text-[#A90B0B] font-bold ml-2">
                {slideData?.infoDotText || "i"}
              </div>
            </div>
          </div>

          <div className="w-full h-[520px] grid grid-cols-[1fr_360px_1fr]">
            <div className="flex-col gap-0 pl-6">
              {leftItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-6">
                  <div className="flex-1">
                    <div className="text-[20px] text-[#B50D0D] font-['阿里巴巴普惠体']">
                      {item.title}
                    </div>
                    <div className="text-[15px] text-[#9b9b9b] mt-2">
                      {item.description}
                    </div>
                  </div>
                  <div className="w-24 flex justify-center">
                    <img src={item.icon?.__icon_url__ || "/static/icons/arrow-left.png"} alt={item.icon?.__icon_query__ || "left arrow"} className="w-44 h-44 object-contain"/>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative flex flex-col items-center justify-center">
              <div className="absolute left-0 top-12 bottom-12 w-[1px] bg-[#d8d8d8]"></div>
              <div className="absolute right-0 top-12 bottom-12 w-[1px] bg-[#d8d8d8]"></div>

              <div className="absolute left-[-8px] top-[110px] w-8 h-[1px] bg-[#d8d8d8]"></div>
              <div className="absolute left-[-8px] top-[230px] w-8 h-[1px] bg-[#d8d8d8]"></div>
              <div className="absolute left-[-8px] top-[350px] w-8 h-[1px] bg-[#d8d8d8]"></div>

              <div className="absolute right-[-8px] top-[110px] w-8 h-[1px] bg-[#d8d8d8]"></div>
              <div className="absolute right-[-8px] top-[230px] w-8 h-[1px] bg-[#d8d8d8]"></div>
              <div className="absolute right-[-8px] top-[350px] w-8 h-[1px] bg-[#d8d8d8]"></div>

              <svg className="w-[220px] h-[220px] z-10" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="KPI circle">
                <circle cx="110" cy="110" r="110" fill="#A90B0B"/>
                <text x="110" y="95" fill="#fff" fontSize="56" fontFamily="微软雅黑" fontWeight="700" textAnchor="middle">{slideData?.centerMainText || "KPI"}</text>
                <text x="110" y="135" fill="#fff" fontSize="20" fontFamily="微软雅黑" letterSpacing="6" textAnchor="middle">{slideData?.centerSubText || "LINE"}</text>
              </svg>

              <div className="text-center text-[#8a8a8a] mt-6">
                {tagline.map((line, i) => (
                  <div key={i} className="text-[18px] leading-[22px]">{line}</div>
                ))}
              </div>
            </div>

            <div className="flex-col gap-0 pl-6">
              {rightItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 justify-end">
                  <div className="w-24 flex justify-center">
                    <img src={item.icon?.__icon_url__ || "/static/icons/arrow-right.png"} alt={item.icon?.__icon_query__ || "right arrow"} className="w-44 h-44 object-contain"/>
                  </div>
                  <div className="flex-1 text-right">
                    <div className="text-[20px] text-[#B50D0D] font-['阿里巴巴普惠体']">
                      {item.title}
                    </div>
                    <div className="text-[15px] text-[#9b9b9b] mt-2">
                      {item.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full flex justify-center mt-6">
            <p className="text-[16px] text-[#9b9b9b] text-center leading-[24px] max-w-[760px]">
              {slideData?.bottomParagraph || "此处输入你的正文，为了最终演示发布的良好效果请尽量言简意赅的阐述观点；"}
            </p>
          </div>

          <div className="absolute left-8 bottom-8 text-[72px] text-[#cfcfcf] font-['微软雅黑']">
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
      </div>
    </>
  )
}

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
