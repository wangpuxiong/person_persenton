import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-title-description-buttons-image-footer-slide";
const layoutName = "ObjectiveSlideLayout";
const layoutDescription = "A slide with a header, title, description, buttons, an image, and a footer with slide number, date, and presenter name.";

const Schema = z.object({
    headerText: z.string().min(5).max(20).default("CREATIVE BRIEF").meta({
        description: "Header text. Max 3 words",
    }),
    title: z.string().min(5).max(25).default("THE OBJECTIVE").meta({
        description: "Main title of the slide. Max 3 words",
    }),
    description: z.string().min(50).max(300).default("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis erat et quam iaculis faucibus at sit amet nibh. Vestibulum dignissim lectus in ligula rhoncus, et bibendum risus dictum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis erat et quam iaculis faucibus at sit amet nibh.").meta({
        description: "Main description text. Max 60 words",
    }),
    buttons: z.array(z.string().min(10).max(60).meta({
        description: "Text for a button. Max 10 words",
    })).min(1).max(3).default([
        "30% INCREASE IN WEBSITE TRAFFIC IN SIX MONTHS",
        "20% INCREASE IN ONLINE SALES IN SIX MONTHS",
    ]).meta({
        description: "List of call-to-action buttons. Min 1, Max 3.",
    }),
    image: ImageSchema.default({
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "Perfume bottle with a sheer fabric in the background",
    }).meta({
        description: "Main image for the slide. Max 30 words",
    }),
    slideNumber: z.number().min(1).max(99).default(3).meta({
        description: "Current slide number.",
    }),
    date: z.string().min(5).max(20).default("JANUARY 2030").meta({
        description: "Date displayed in the footer. Max 3 words",
    }),
    presenter: z.string().min(5).max(30).default("HARPER RUSSO").meta({
        description: "Name of the presenter in the footer. Max 4 words",
    }),
});

type ObjectiveSlideLayoutData = z.infer<typeof Schema>;

interface ObjectiveSlideLayoutProps {
    data?: Partial<ObjectiveSlideLayoutData>;
}

const dynamicSlideLayout: React.FC<ObjectiveSlideLayoutProps> = ({ data: slideData }) => {
    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden font-sans text-[#333333]">
            {/* Header */}
            <div className="absolute top-[12px] right-[56px] text-[18px] font-normal tracking-wide">
                {slideData?.headerText || "CREATIVE BRIEF"}
            </div>
            <div className="absolute top-[48px] left-0 w-full h-[1px] bg-gray-300"></div>

            {/* Title */}
            <div className="absolute top-[64px] left-0 w-full text-center text-[61px] font-light leading-tight tracking-tight">
                {slideData?.title || "THE OBJECTIVE"}
            </div>
            <div className="absolute top-[160px] left-0 w-full h-[1px] bg-gray-300"></div>

            {/* Main Content Area */}
            {/* Left Content (Text and Buttons) */}
            <div className="absolute left-[48px] top-[200px] w-[552px]">
                <p className="text-[24px] leading-[28px] mb-[48px]">
                    {slideData?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis erat et quam iaculis faucibus at sit amet nibh. Vestibulum dignissim lectus in ligula rhoncus, et bibendum risus dictum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis erat et quam iaculis faucibus at sit amet nibh."}
                </p>
                <div className="flex flex-col space-y-[20px]">
                    {slideData?.buttons?.map((buttonText, index) => (
                        <div key={index} className="w-full h-[56px] flex items-center justify-center rounded-full border border-gray-400 text-[21px] font-normal leading-tight tracking-tight">
                            {buttonText}
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Content (Image) */}
            <div className="absolute right-8 top-[200px] w-[592px] h-[367.5px]">
                <img
                    src={slideData?.image?.__image_url__ || "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"}
                    alt={slideData?.image?.__image_prompt__ || slideData?.title || "Perfume bottle"}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Footer */}
            <div className="absolute bottom-[48px] left-0 w-full h-[1px] bg-gray-300"></div>
            <div className="absolute bottom-[8px] left-0 right-0 flex justify-between items-center px-[48px] h-[24px]">
                <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center text-[21px]">
                        {slideData?.slideNumber ?? 3}
                    </div>
                    <div className="text-[21px] font-normal tracking-tight">
                        {slideData?.date || "JANUARY 2030"}
                    </div>
                </div>
                <div className="text-[21px] font-normal tracking-tight">
                    PRESENTED BY: {slideData?.presenter || "HARPER RUSSO"}
                </div>
            </div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
