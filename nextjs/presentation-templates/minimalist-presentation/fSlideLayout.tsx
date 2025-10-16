import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "image-header-slogans-text-footer-slide";
const layoutName = "ImageHeaderSlogansTextFooterLayout";
const layoutDescription = "A slide with a header, a large image on the left, a main title, multiple slogan inputs, a brand voice title, a paragraph, and a footer.";

const Schema = z.object({
    creativeBriefText: z.string().min(1).max(15).default("CREATIVE BRIEF").meta({
        description: "Text for the creative brief in the header. Max 2 words",
    }),
    mainImage: ImageSchema.default({
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "Blurred image of a perfume bottle on a light background",
    }),
    mainTitle: z.string().min(1).max(20).default("BRAND MESSAGING").meta({
        description: "Main title of the slide. Max 2 words",
    }),
    slogans: z.array(z.string().min(40).max(70).meta({
        description: "Brand slogan or phrase. Max 12 words",
    })).min(2).max(2).default([
        "ADD YOUR BRAND SLOGAN OR PHRASE TO BE USED IN YOUR CAMPAIGN",
        "ADD YOUR BRAND SLOGAN OR PHRASE TO BE USED IN YOUR CAMPAIGN",
    ]).meta({
        description: "List of brand slogans to be used in the campaign. Max 2 slogans",
    }),
    brandVoiceTitle: z.string().min(10).max(25).default("BRAND VOICE").meta({
        description: "Title for the brand voice section. Max 4 words",
    }),
    paragraphText: z.string().min(150).max(400).default("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis erat et quam iaculis faucibus at sit amet nibh. Vestibulum dignissim lectus in ligula rhoncus, et bibendum risus dictum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis erat et quam iaculis faucibus at sit amet nibh.").meta({
        description: "Descriptive paragraph text. Max 60 words",
    }),
    pageNumber: z.number().min(1).max(99).default(7).meta({
        description: "Page number. Max 2 digits",
    }),
    date: z.string().min(5).max(20).default("JANUARY 2030").meta({
        description: "Date displayed in the footer. Max 3 words",
    }),
    presentedBy: z.string().min(10).max(30).default("PRESENTED BY: HARPER RUSSO").meta({
        description: "Name of the presenter in the footer. Max 5 words",
    }),
});

type ImageHeaderSlogansTextFooterLayoutData = z.infer<typeof Schema>;

interface ImageHeaderSlogansTextFooterLayoutProps {
    data?: Partial<ImageHeaderSlogansTextFooterLayoutData>;
}

const dynamicSlideLayout: React.FC<ImageHeaderSlogansTextFooterLayoutProps> = ({ data: slideData }) => {
    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 h-[50px] flex items-center justify-end pr-10 border-b-[1px] border-[#404040] z-10 bg-[#F8F5F0]">
                <p className="font-['Arial'] text-[18px] text-[#404040] tracking-wider">{slideData?.creativeBriefText}</p>
            </div>

            {/* Main Content Area (occupies space between header and footer) */}
            <div className="flex h-[calc(100%-100px)] mt-[50px]">
                {/* Left Image Section */}
                <div className="w-[448px] h-full flex-shrink-0">
                    <img src={slideData?.mainImage?.__image_url__} alt={slideData?.mainImage?.__image_prompt__} className="w-full h-full object-cover" />
                </div>

                {/* Right Content Section */}
                <div className="flex-grow bg-[#F8F5F0] flex flex-col items-center px-10 overflow-y-auto">
                    {/* Brand Messaging Title */}
                    <h1 className="font-['Arial'] text-[64px] text-[#404040] mt-[20px] tracking-wide">{slideData?.mainTitle}</h1>

                    {/* Line separator */}
                    <div className="w-[600px] h-[1px] bg-[#404040] mt-5"></div>

                    {/* Slogan Buttons */}
                    <div className="mt-5 flex flex-col space-y-[20px]">
                        {slideData?.slogans?.map((slogan, index) => (
                            <div key={index} className="w-[600px] h-[60px] rounded-full border-[1px] border-[#404040] flex items-center justify-center text-center px-4">
                                <p className="font-['Arial'] text-[16px] text-[#404040]">{slogan}</p>
                            </div>
                        ))}
                    </div>

                    {/* Line separator */}
                    <div className="w-[600px] h-[1px] bg-[#404040] mt-5"></div>

                    {/* Brand Voice Button */}
                    <div className="w-[200px] h-[50px] rounded-full border-[1px] border-[#404040] flex items-center justify-center text-center px-4 mt-5">
                        <p className="font-['Arial'] text-[16px] text-[#404040]">{slideData?.brandVoiceTitle}</p>
                    </div>

                    {/* Paragraph Text */}
                    <p className="font-['Arial'] text-[16px] text-[#404040] w-[600px] mt-[20px] leading-relaxed text-justify">
                        {slideData?.paragraphText}
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 h-[50px] flex items-center justify-between pl-10 pr-10 border-t-[1px] border-[#404040] z-10 bg-[#F8F5F0]">
                <div className="flex items-center space-x-[10px]">
                    <div className="w-[32px] h-[32px] rounded-full border-[1px] border-[#404040] flex items-center justify-center">
                        <p className="font-['Arial'] text-[16px] text-[#404040]">{slideData?.pageNumber}</p>
                    </div>
                    <p className="font-['Arial'] text-[16px] text-[#404040]">{slideData?.date}</p>
                </div>
                <p className="font-['Arial'] text-[16px] text-[#404040]">{slideData?.presentedBy}</p>
            </div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
