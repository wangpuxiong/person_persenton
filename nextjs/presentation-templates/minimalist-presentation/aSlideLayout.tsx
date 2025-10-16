import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "image-text-footer-slide";
const layoutName = "ImageTextFooterLayout";
const layoutDescription = "A slide with a prominent image panel, a main text area, and a footer with page number, date, and presenter.";

const Schema = z.object({
    mainImage: ImageSchema.default({
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "Close-up of a perfume bottle with a soft background",
    }).meta({
        description: "The main background image of the slide. Max 10 words",
    }),
    creativeTitle: z.string().min(5).max(12).default("CREATIVE").meta({
        description: "The first line of the main title. Max 2 words",
    }),
    briefTitle: z.string().min(3).max(8).default("BRIEF").meta({
        description: "The second line of the main title. Max 1 word",
    }),
    campaignName: z.string().min(15).max(30).default("Borcelle Fragrances").meta({
        description: "The main campaign name. Max 5 words",
    }),
    campaignSubtitle: z.string().min(15).max(30).default("Advertising Campaign").meta({
        description: "The subtitle or description of the campaign. Max 5 words",
    }),
    pageNumber: z.string().min(1).max(2).default("1").meta({
        description: "The page number. Max 1 digit",
    }),
    date: z.string().min(10).max(20).default("JANUARY 2030").meta({
        description: "The date of the presentation. Max 3 words",
    }),
    presenter: z.string().min(20).max(35).default("PRESENTED BY: HARPER RUSSO").meta({
        description: "The name of the presenter or organization. Max 6 words",
    }),
});

type ImageTextFooterLayoutData = z.infer<typeof Schema>;

interface ImageTextFooterLayoutProps {
    data?: Partial<ImageTextFooterLayoutData>;
}

const dynamicSlideLayout: React.FC<ImageTextFooterLayoutProps> = ({ data: slideData }) => {
    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
            {/* Left Image Panel */}
            <div className="absolute top-0 left-0 w-[600px] h-[720px] overflow-hidden">
                <img
                    src={slideData?.mainImage?.__image_url__ || "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"}
                    alt={slideData?.mainImage?.__image_prompt__ || "Close-up of a perfume bottle with a soft background"}
                    className="w-full h-full object-cover"
                />
                {/* Translucent Overlay */}
                <div className="absolute top-0 left-[340.38px] w-[259.62px] h-full bg-white bg-opacity-60"></div>
            </div>

            {/* Right Background Panel */}
            <div className="absolute top-0 left-[640px] w-[600px] h-[720px] bg-[#f4f2ee]"></div>

            {/* "CREATIVE BRIEF" Text */}
            <div className="absolute left-[687.5px] top-[110px] w-[525px] h-[220px] flex flex-col justify-start">
                <p className="font-['Montserrat'] text-[122px] leading-[0.9] text-[#333333] tracking-tight">{slideData?.creativeTitle || "CREATIVE"}</p>
                <p className="font-['Montserrat'] text-[122px] leading-[0.9] text-[#333333] tracking-tight">{slideData?.briefTitle || "BRIEF"}</p>
            </div>

            {/* "Borcelle Fragrances Advertising Campaign" Text */}
            <div className="absolute left-[687.5px] top-[400px] w-[525px] h-[80px] text-center">
                <p className="font-['Montserrat'] text-[32px] text-[#333333] leading-tight">{slideData?.campaignName || "Borcelle Fragrances"}</p>
                <p className="font-['Montserrat'] text-[32px] text-[#333333] leading-tight">{slideData?.campaignSubtitle || "Advertising Campaign"}</p>
            </div>

            {/* Footer Divider Line */}
            <div className="absolute bottom-[60px] left-0 w-full h-[2px] bg-[#d9d9d9]"></div>

            {/* Footer Content Container */}
            <div className="absolute bottom-0 left-0 w-full h-[60px] bg-[#f4f2ee] flex items-center justify-between px-[50px]">
                {/* Page Number and Date */}
                <div className="flex items-center">
                    <div className="w-[39.37px] h-[39.37px] border-[1.33px] border-[#333333] rounded-full flex items-center justify-center">
                        <p className="font-['Montserrat'] text-[24px] text-[#333333]">{slideData?.pageNumber || "1"}</p>
                    </div>
                    <p className="font-['Montserrat'] text-[24px] text-[#333333] ml-2">{slideData?.date || "JANUARY 2030"}</p>
                </div>

                {/* Presented By */}
                <div>
                    <p className="font-['Montserrat'] text-[24px] text-[#333333]">{slideData?.presenter || "PRESENTED BY: HARPER RUSSO"}</p>
                </div>
            </div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
