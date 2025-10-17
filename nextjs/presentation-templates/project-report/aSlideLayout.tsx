import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-center-cta-footer-icons-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, center title, CTA, supporting image, and footer with sections and icons"

const Schema = z.object({
  navItems: z.array(z.string().min(2).max(12).meta({
    description: "Top navigation labels. Max 3 words"
  })).min(1).max(6).default([
    "了解项目进度",
    "改善团队合作",
    "提高工作效率"
  ]).meta({
    description: "Array of header navigation items. Min 1 Max 6"
  }),
  logoText: z.string().min(2).max(30).default("YOUR LOGO").meta({
    description: "Header logo or text. Max 4 words"
  }),
  title: z.string().min(2).max(12).default("项目进度汇报").meta({
    description: "Main large title text. Max 6 words"
  }),
  titleMaxWords: z.number().default(6).meta({
    description: "Maximum number of words the title can handle"
  }),
  cta: z.object({
    text: z.string().min(5).max(60).default("把握时代机遇点亮浩瀚星空").meta({
      description: "CTA button text. Max 12 words"
    }),
    icon: IconSchema.default({
      "__icon_url__": "",
      "__icon_query__": "right arrow circle"
    })
  }).default({
    text: "把握时代机遇点亮浩瀚星空",
    icon: {
      "__icon_url__": "",
      "__icon_query__": "right arrow circle"
    }
  }).meta({
    description: "CTA content including text and icon"
  }),
  bgImage: ImageSchema.default({
    "__image_url__": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "__image_prompt__": "modern city skyline reflected in glass interior, wide perspective"
  }).meta({
    description: "Supporting background image positioned on the right"
  }),
  speakerLine: z.string().min(5).max(80).default("主讲人： 第一PPT    时间： 20XX.XX").meta({
    description: "Speaker and time line. Max 12 words"
  }),
  summary: z.string().min(20).max(220).default("及时了解项目进展情况，识别进度偏差和风险，并及时采取措施进行调整。").meta({
    description: "Main summary paragraph. Max 40 words"
  }),
  summaryEnglish: z.string().min(10).max(180).default("Keep abreast of project progress, identify schedule deviations and risks, and take timely measures to make adjustments.").meta({
    description: "English supporting summary. Max 30 words"
  }),
  footerSections: z.array(z.object({
    title: z.string().min(2).max(30).meta({
      description: "Footer section title. Max 6 words"
    }).default("问题和风险"),
    subtitle: z.string().min(2).max(40).meta({
      description: "Footer section subtitle. Max 8 words"
    }).default("Problems and risks")
  })).min(1).max(3).default([
    {
      title: "问题和风险",
      subtitle: "Problems and risks"
    },
    {
      title: "成本和质量",
      subtitle: "Cost and quality"
    }
  ]).meta({
    description: "Left footer sections with title and subtitle. Min 1 Max 3"
  }),
  footerIcons: z.array(z.object({
    label: z.string().min(1).max(20).default("开放").meta({
      description: "Icon label text. Max 2 words"
    }),
    icon: IconSchema
  })).min(1).max(5).default([
    {
      label: "开放",
      icon: {
        "__icon_url__": "",
        "__icon_query__": "paper plane in circle red"
      }
    },
    {
      label: "合作",
      icon: {
        "__icon_url__": "",
        "__icon_query__": "gears in circle gray"
      }
    },
    {
      label: "共享",
      icon: {
        "__icon_url__": "",
        "__icon_query__": "location marker in circle gray"
      }
    }
  ]).meta({
    description: "Footer icons with labels and icon objects. Min 1 Max 5"
  })
})

type SlideData = z.infer<typeof Schema>

interface SlideProps {
  data?: Partial<SlideData>
}

const dynamicSlideLayout: React.FC<SlideProps> = ({ data: slideData }) => {
  const navItems = slideData?.navItems || []
  const footerSections = slideData?.footerSections || []
  const footerIcons = slideData?.footerIcons || []

  return (
    <>
      <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
        <img
          src={slideData?.bgImage?.__image_url__ || ""}
          alt={slideData?.bgImage?.__image_prompt__ || "background"}
          className="absolute right-0 top-0 h-full w-[55%] object-cover z-0"
        />
        <div className="absolute inset-0 z-10" aria-hidden>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#8b0000_0%,rgba(139,0,0,0.75)_55%,rgba(139,0,0,0.35)_70%,transparent_100%)]"></div>
        </div>

        <div className="relative z-20 h-full flex flex-col justify-between px-12 py-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-x-20 pt-2">
              {navItems.map((item, idx) => (
                <div key={idx} className="text-white font-['阿里巴巴普惠体'] text-[18px]">
                  {item}
                </div>
              ))}
            </div>
            <div className="text-white font-['微软雅黑'] text-[22px] pt-2">
              {slideData?.logoText || "YOUR LOGO"}
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-white font-['阿里巴巴普惠体'] text-[160px] leading-[0.9] tracking-[-2px] max-w-[85%]">
              {slideData?.title || "项目进度汇报"}
            </h1>

            <div className="mt-6 flex items-center gap-x-6">
              <button className="inline-flex items-center bg-white bg-opacity-90 text-[#333] px-6 py-3 rounded-full text-[18px] font-['微软雅黑'] shadow-sm">
                <span className="pr-4">{slideData?.cta?.text || "把握时代机遇点亮浩瀚星空"}</span>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-none">
                  <circle cx="18" cy="18" r="17" stroke="#6B6B6B" strokeWidth="2" fill="#4B5563"/>
                  <path d="M14 12L22 18L14 24V12Z" fill="white"/>
                </svg>
              </button>
            </div>

            <div className="mt-10 text-white font-['微软雅黑'] text-[24px]">
              {slideData?.speakerLine || "主讲人： 第一PPT    时间： 20XX.08"}
            </div>

            <div className="mt-6 max-w-[70%] text-white font-['微软雅黑'] text-[14px] leading-relaxed">
              {slideData?.summary || "及时了解项目进展情况，识别进度偏差和风险，并及时采取措施进行调整。"}
              <div className="mt-2 text-[#f3f3f3] text-[12px]">
                {slideData?.summaryEnglish || "Keep abreast of project progress, identify schedule deviations and risks, and take timely measures to make adjustments."}
              </div>
            </div>
          </div>

          <div className="bg-white w-full h-[140px] mt-6 -mx-12 px-12 flex items-center justify-between z-30">
            <div className="flex items-center gap-x-12">
              {footerSections.map((sec, i) => (
                <div key={i} className={i === 1 ? "flex flex-col pl-6" : "flex flex-col"}>
                  <div className="text-[#b71c1c] font-['阿里巴巴普惠体'] text-[22px]">{sec.title}</div>
                  <div className="text-[#9b9b9b] font-['微软雅黑'] text-[14px] mt-2">{sec.subtitle}</div>
                </div>
              ))}
              <div className="h-12 w-px bg-[#e6e6e6]"></div>
            </div>

            <div className="flex items-center gap-x-8">
              {footerIcons.map((fi, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className={idx === 0 ? "flex items-center justify-center h-16 w-16 rounded-full bg-[#9b0b0b]" : "flex items-center justify-center h-16 w-16 rounded-full bg-[#6b6b6b]"}>
                    {idx === 0 && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 21L23 12L2 3L6 12L2 21Z" fill="white"/>
                      </svg>
                    )}
                    {idx === 1 && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7z" fill="white"/>
                        <path d="M19.4 10a5.2 5.2 0 0 0-.1-1l1.9-1.5-2-3.4-2.3 1a5.3 5.3 0 0 0-1.7-1l-.4-2.4h-4l-.4 2.4a5.3 5.3 0 0 0-1.7 1l-2.3-1L3 7.5l1.9 1.5c-.1.3-.1.6-.1 1s0 .7.1 1L3 11.5 5 15l2.3-1a5.3 5.3 0 0 0 1.7 1l.4 2.4h4l.4-2.4c.6-.2 1.1-.6 1.7-1L19 15l2-3.5-2.6-.1c.1-.3.1-.6.1-1z" fill="white"/>
                      </svg>
                    )}
                    {idx === 2 && (
                      <svg width="18" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" fill="white"/>
                      </svg>
                    )}
                  </div>
                  <div className={idx === 0 ? "mt-2 text-[#6b1a1a] font-['微软雅黑'] text-[14px]" : "mt-2 text-[#6b6b6b] font-['微软雅黑'] text-[14px]"}>
                    {fi.label}
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
