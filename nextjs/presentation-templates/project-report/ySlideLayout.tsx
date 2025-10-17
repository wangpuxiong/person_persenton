import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-two-column-numbered-items-slide"
const layoutName = "dynamicSlideLayout"
const layoutDescription = "A slide with a header, two-column numbered items, divider, large faded number, and button."

const Schema = z.object({
    headerTitle: z.string().min(2).max(12).default("最新工作计划").meta({
        description: "Main header text displayed at the top. Max 4 words",
    }),
    headerSubtitle: z.string().min(5).max(60).default("Project background analysis").meta({
        description: "Smaller header subtitle text. Max 6 words",
    }),
    logoText: z.string().min(2).max(20).default("YOUR LOGO").meta({
        description: "Placeholder text next to logo. Max 3 words",
    }),
    logoImage: ImageSchema.default({
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "rounded portrait logo photo on white background"
    }).meta({
        description: "Logo image for the header. Max 10 words",
    }),
    items: z.array(z.object({
        number: z.string().min(1).max(3).default("01").meta({
            description: "Number label shown inside the svg badge. Max 1 word",
        }),
        title: z.string().min(2).max(30).default("添加小标题").meta({
            description: "Item small title. Max 4 words",
        }),
        description: z.string().min(10).max(120).default("单击此处输入正文，请尽量言简意赅的阐述观点，准确传达信息。").meta({
            description: "Item description text. Max 20 words",
        }),
        icon: IconSchema.default({
            __icon_url__: "https://assets.example.com/number-badge-01.svg",
            __icon_query__: "red folded tag badge with curled corner and white number"
        }).meta({
            description: "Icon or svg asset representing the numbered badge. Max 6 words",
        }),
    })).min(1).max(4).default([
        {
            number: "01",
            title: "添加小标题",
            description: "单击此处输入正文，请尽量言简意赅的阐述观点，准确传达信息。",
            icon: {
                __icon_url__: "/static/icons/placeholder.svg",
                __icon_query__: "red folded tag badge with curled corner and white number 01"
            }
        },
        {
            number: "02",
            title: "添加小标题",
            description: "单击此处输入正文，请尽量言简意赅的阐述观点，准确传达信息。",
            icon: {
                __icon_url__: "/static/icons/placeholder.svg",
                __icon_query__: "red folded tag badge with curled corner and white number 02"
            }
        },
        {
            number: "03",
            title: "添加小标题",
            description: "单击此处输入正文，请尽量言简意赅的阐述观点，准确传达信息。",
            icon: {
                __icon_url__: "/static/icons/placeholder.svg",
                __icon_query__: "red folded tag badge with curled corner and white number 03"
            }
        },
        {
            number: "04",
            title: "添加小标题",
            description: "单击此处输入正文，请尽量言简意赅的阐述观点，准确传达信息。",
            icon: {
                __icon_url__: "/static/icons/placeholder.svg",
                __icon_query__: "red folded tag badge with curled corner and white number 04"
            }
        }
    ]).meta({
        description: "Array of numbered items displayed in two columns. Max 4 items",
    }),
    centerHint: z.string().min(10).max(120).default("如果文字过多，您可右键修改“段落”调节合适的行间距").meta({
        description: "Divider hint text centered below the items. Max 20 words",
    }),
    fadedNumber: z.string().min(1).max(6).default("04").meta({
        description: "Large faded corner number text. Max 2 words",
    }),
    buttonLabel: z.string().min(2).max(20).default("ANALYSIS").meta({
        description: "Label text shown inside the rounded button. Max 2 words",
    }),
    buttonIcon: IconSchema.default({
        __icon_url__: "https://assets.example.com/arrow-right.svg",
        __icon_query__: "right arrow stroke icon"
    }).meta({
        description: "Icon used inside the button. Max 3 words",
    })
})

type SlideDataType = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideDataType>
}

const dynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data: slideData }) => {
    const items = slideData?.items || []

    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
          <div className="px-14 pt-8 pb-10 h-full flex flex-col">
            <div className="flex items-start justify-between">
              <div className="flex items-end gap-6">
                <h1 className="text-[64px] leading-none text-[#b20000] font-['阿里巴巴普惠体']">
                  {slideData?.headerTitle || "最新工作计划"}
                </h1>
                <div className="h-[56px] w-[2px] bg-[#b20000] self-stretch"></div>
                <div className="pt-4">
                  <div className="text-[16px] text-[#8a8a8a] font-['微软雅黑']">
                    {slideData?.headerSubtitle || "Project background analysis"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-[#8a8a8a] text-[20px] font-['微软雅黑'] mr-4">
                  {slideData?.logoText || "YOUR LOGO"}
                </div>
                <img
                  src={slideData?.logoImage?.__image_url__ || ""}
                  alt={slideData?.logoImage?.__image_prompt__ || "logo"}
                  className="w-[48px] h-[48px] rounded-full object-cover"
                />
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-x-16 gap-y-8 flex-1">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-8 ${idx % 2 === 1 ? "justify-self-end" : ""}`}
                >
                  <div className="w-[120px] h-[120px] flex-shrink-0">
                    {/* Render provided icon URL as inline svg img if available, otherwise render fallback SVG using number */}
                    {item.icon?.__icon_url__ ? (
                      <img src={item.icon.__icon_url__} alt={item.icon.__icon_query__ || item.number} className="w-full h-full object-contain" />
                    ) : (
                      <svg className="w-full h-full" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path d="M18 6c-6 0-11 5-11 11v66c0 6 5 11 11 11h30c3 0 6-1 8-3l24-24c2-2 2-5 0-7L56 50c-2-2-5-3-8-3H18V6z" fill="#a40000"/>
                        <circle cx="18" cy="18" r="8" fill="#8b0000"/>
                        <text x="44" y="76" fill="#ffffff" font-size="36" font-family="阿里巴巴普惠体" font-weight="500">{item.number}</text>
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-[22px] text-[#b20000] font-['阿里巴巴普惠体'] mb-3">
                      {item.title}
                    </div>
                    <p className="text-[16px] text-[#7f7f7f] font-['微软雅黑'] leading-[28px] max-w-[520px]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 w-full">
              <div className="border-t border-[#e6e6e6] mx-[48px]"></div>
              <div className="text-center text-[16px] text-[#9b9b9b] font-['微软雅黑'] mt-6">
                {slideData?.centerHint || "如果文字过多，您可右键修改“段落”调节合适的行间距"}
              </div>
            </div>
          </div>

          <div className="absolute left-8 bottom-8 text-[160px] text-[#bdbdbd] font-['微软雅黑'] leading-none opacity-10 select-none">
            {slideData?.fadedNumber || "04"}
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
    )
}

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
