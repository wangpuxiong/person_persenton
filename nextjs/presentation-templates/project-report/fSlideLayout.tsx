import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "donut-grid-cards-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, donut grid, and side cards."

const Schema = z.object({
  title: z.string().min(2).max(20).default("项目背景解析").meta({
    description: "Main title of the slide. Max 3 words",
  }),
  subtitle: z.string().min(5).max(60).default("Project background analysis").meta({
    description: "Subtitle or secondary header. Max 8 words",
  }),
  logoText: z.string().min(2).max(20).default("YOUR LOGO").meta({
    description: "Text displayed as logo. Max 3 words",
  }),
  logoImage: ImageSchema.default({
    __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    __image_prompt__: "decorative rounded image of people in office"
  }).meta({
    description: "Decorative image shown near the logo. Max 30 words",
  }),
  donuts: z.array(z.object({
    percent: z.number().min(0).max(100).default(30).meta({
      description: "Donut fill percentage as integer",
    }),
    strokeDasharray: z.string().default("75 177").meta({
      description: "SVG stroke-dasharray value for the active arc",
    }),
    strokeDashoffset: z.string().default("-25").meta({
      description: "SVG stroke-dashoffset value for the active arc",
    }),
    label: z.string().min(1).max(6).default("30%").meta({
      description: "Center label text for the donut. Max 2 words",
    }),
  })).min(1).max(4).default([
    { percent: 30, strokeDasharray: "75 177", strokeDashoffset: "-25", label: "30%" },
    { percent: 50, strokeDasharray: "125 177", strokeDashoffset: "-45", label: "50%" },
    { percent: 70, strokeDasharray: "145 177", strokeDashoffset: "-20", label: "70%" },
    { percent: 90, strokeDasharray: "160 177", strokeDashoffset: "-10", label: "90%" },
  ]).meta({
    description: "Array of donut chart items. Min 1 and Max 4 items",
  }),
  bigIndex: z.string().min(1).max(4).default("01").meta({
    description: "Large index text at bottom-left. Max 2 words",
  }),
  sideTitle: z.string().min(2).max(20).default("添加标题").meta({
    description: "Title on the right column. Max 3 words",
  }),
  sideParagraph: z.string().min(20).max(200).default("单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点。").meta({
    description: "Paragraph text in the right column. Max 40 words",
  }),
  card1: z.object({
    icon: IconSchema.default({
      __icon_url__: "",
      __icon_query__: "chart rising bars icon"
    }),
    text: z.string().min(10).max(200).default("单击此处输入你的正文，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点。"),
  }).default({
    icon: { __icon_url__: "", __icon_query__: "chart rising bars icon" },
    text: "单击此处输入你的正文，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点。"
  }).meta({
    description: "First white card with an icon and text",
  }),
  card2: z.object({
    icon: IconSchema.default({
      __icon_url__: "",
      __icon_query__: "document page icon"
    }),
    text: z.string().min(10).max(200).default("单击此处输入你的正文，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点。"),
  }).default({
    icon: { __icon_url__: "", __icon_query__: "document page icon" },
    text: "单击此处输入你的正文，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点。"
  }).meta({
    description: "Second highlighted card with an icon and text",
  }),
  buttonText: z.string().min(2).max(20).default("ANALYSIS").meta({
    description: "Text shown on the action button. Max 3 words",
  }),
  buttonIcon: IconSchema.default({
    __icon_url__: "",
    __icon_query__: "right arrow circle icon"
  }).meta({
    description: "Icon shown inside the action button",
  }),
})

type DonutGridCardsSlideData = z.infer<typeof Schema>

interface DonutGridCardsLayoutProps {
  data?: Partial<DonutGridCardsSlideData>
}

const dynamicSlideLayout: React.FC<DonutGridCardsLayoutProps> = ({ data: slideData }) => {
  const donuts = slideData?.donuts || []

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden p-10 font-['微软雅黑']">
        <div className="w-full h-full flex">
          {/* LEFT COLUMN */}
          <div className="flex-1 pr-8">
            {/* Header: Title and subtitle + logo */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-end">
                <h1 className="text-[56px] leading-none text-[#990b0b] font-['思源黑体 CN'] tracking-tight mr-3">
                  {slideData?.title || "项目背景解析"}
                </h1>
                <div className="h-[56px] border-r-2 border-[#990b0b] ml-1"></div>
                <p className="ml-4 text-[16px] text-[#777] font-['微软雅黑']">
                  {slideData?.subtitle || "Project background analysis"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[20px] text-[#666] font-['微软雅黑']">
                  {slideData?.logoText || "YOUR LOGO"}
                </p>
                <img
                  src={slideData?.logoImage?.__image_url__ || ""}
                  alt={slideData?.logoImage?.__image_prompt__ || slideData?.logoText || "logo"}
                  className="w-10 h-10 rounded-full mt-2 object-cover"
                />
              </div>
            </div>

            {/* Donut grid */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-8 mt-4">
              {donuts.map((d, idx) => (
                <div key={idx} className="w-[180px] h-[180px] flex items-center justify-center">
                  <div className="relative w-[180px] h-[180px]">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="50" cy="50" r="40" stroke="#e8e8e8" strokeWidth="20" fill="none" />
                      <circle cx="50" cy="50" r="40" stroke="#990b0b" strokeWidth="20" strokeDasharray={d.strokeDasharray || "0 177"} strokeDashoffset={d.strokeDashoffset || "0"} strokeLinecap="butt" transform="rotate(-90 50 50)" fill="none" />
                      <circle cx="50" cy="50" r="26" fill="#999999" />
                      <circle cx="50" cy="50" r="24" fill="#ffffff" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-[92px] h-[92px] rounded-full bg-[#b5b5b5] flex items-center justify-center">
                        <span className="text-white text-[22px] font-['微软雅黑']">{d.label || `${d.percent}%`}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* bottom-left big index */}
            <div className="absolute left-8 bottom-8 text-[96px] text-[#dcdcdc] font-['阿里巴巴普惠体']">
              {slideData?.bigIndex || "01"}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-[420px] pl-8 flex flex-col">
            <h2 className="text-[22px] text-[#990b0b] font-['思源黑体 CN'] mb-4">
              {slideData?.sideTitle || "添加标题"}
            </h2>
            <p className="text-[14px] text-[#777] leading-7 mb-6 font-['微软雅黑']">
              {slideData?.sideParagraph || "单击此处输入你的正文，文字是您思想的提炼，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点。"}
            </p>

            <div className="border-t border-[#f1eaea] my-4"></div>

            {/* Card 1: white */}
            <div className="flex items-center bg-white rounded-lg shadow-[0_10px_0_0_rgba(153,11,11,0.06)] p-4 mb-6">
              <div className="w-14 h-14 flex items-center justify-center bg-[#fff] rounded-md mr-4">
                {/* Use icon url if provided otherwise inline svg fallback */}
                {slideData?.card1?.icon?.__icon_url__ ? (
                  <img src={slideData?.card1?.icon.__icon_url__} alt={slideData?.card1?.icon.__icon_query__ || "icon"} className="w-9 h-9" />
                ) : (
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="text-[#990b0b]">
                    <rect x="3" y="13" width="3" height="6" fill="#990b0b"/>
                    <rect x="8" y="9" width="3" height="10" fill="#990b0b"/>
                    <rect x="13" y="5" width="3" height="14" fill="#990b0b"/>
                    <path d="M3 13 L13 3" stroke="#990b0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 3 L19 3" stroke="#990b0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 5 L19 1" stroke="#990b0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <p className="text-[#777] text-[14px] leading-7 font-['微软雅黑']">
                  {slideData?.card1?.text || "单击此处输入你的正文，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点。"}
                </p>
              </div>
            </div>

            {/* Card 2: red */}
            <div className="flex items-center bg-[#990b0b] text-white rounded-lg shadow-[0_12px_0_0_rgba(153,11,11,0.12)] p-6 flex-none">
              <div className="w-16 h-16 flex items-center justify-center bg-white/10 rounded mr-6 flex-shrink-0">
                {slideData?.card2?.icon?.__icon_url__ ? (
                  <img src={slideData?.card2?.icon.__icon_url__} alt={slideData?.card2?.icon.__icon_query__ || "icon"} className="w-8 h-8" />
                ) : (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white">
                    <rect x="7" y="4" width="10" height="14" rx="1" stroke="#fff" strokeWidth="1.5" fill="none"/>
                    <path d="M9 8h6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M9 12h6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M9 16h4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )}
              </div>
              <div>
                <p className="text-white text-[15px] leading-7 font-['微软雅黑']">
                  {slideData?.card2?.text || "单击此处输入你的正文，为了最终演示发布的良好效果，请尽量言简意赅的阐述观点。"}
                </p>
              </div>
            </div>

            {/* Analysis button bottom-right */}
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
