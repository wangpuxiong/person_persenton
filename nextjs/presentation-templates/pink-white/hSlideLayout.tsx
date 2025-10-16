import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "two-images-header-description-slide";
const layoutName = "TwoImagesHeaderDescriptionLayout";
const layoutDescription = "A slide featuring two images on the left and a large header, a sub-header, and a description on the right.";

const Schema = z.object({
    images: z.array(ImageSchema).min(2).max(2).default([
        {
            __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            __image_prompt__: "Fashion model wearing a pink jacket and sunglasses, looking stylish"
        },
        {
            __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            __image_prompt__: "Close-up of pink sunglasses on a person's arm, reflecting light"
        }
    ]).meta({
        description: "Two images displayed vertically on the left side of the slide.",
    }),
    companyName: z.string().min(5).max(25).default("INGOUDE COMPANY").meta({
        description: "The name of the company or brand. Max 3 words",
    }),
    projectTitle: z.string().min(5).max(20).default("FIRST PROJECT").meta({
        description: "The title of the project or section. Max 3 words",
    }),
    description: z.string().min(50).max(250).default("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat").meta({
        description: "A detailed description about the project or company. Max 40 words",
    }),
});

type TwoImagesHeaderDescriptionLayoutData = z.infer<typeof Schema>;

interface TwoImagesHeaderDescriptionLayoutProps {
    data?: Partial<TwoImagesHeaderDescriptionLayoutData>;
}

const dynamicSlideLayout: React.FC<TwoImagesHeaderDescriptionLayoutProps> = ({ data: slideData }) => {
    const images = slideData?.images || [];

    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
            <div className="flex h-full">
                {/* Left Section - Images */}
                <div className="w-[580px] flex flex-col items-center justify-center py-[40px] gap-y-[20px]">
                    {images[0] && (
                        <img src={images[0].__image_url__} alt={images[0].__image_prompt__} className="w-[520px] h-[300px] object-cover" />
                    )}
                    {images[1] && (
                        <img src={images[1].__image_url__} alt={images[1].__image_prompt__} className="w-[520px] h-[300px] object-cover" />
                    )}
                </div>

                {/* Right Section - Content */}
                <div className="flex-1 bg-[#383838] relative px-[80px] pt-[100px]">
                    {/* Decorative SVG lines (Scratch effect) */}
                    <svg className="absolute bottom-0 left-0 w-[500px] h-[400px] -translate-x-[15%] translate-y-[15%] rotate-[-10deg]" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Main long, thick scratches */}
                        <path d="M-10 380 Q 80 250 200 300 T 400 200 T 500 250" stroke="#F0A2C9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
                        <path d="M0 390 Q 90 260 210 310 T 410 210 T 510 260" stroke="#F0A2C9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
                        <path d="M-20 370 Q 70 240 190 290 T 390 190 T 490 240" stroke="#F0A2C9" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>

                        {/* Shorter, more scattered lines and dots */}
                        <path d="M20 360 L 40 340 L 60 360 L 80 330" stroke="#F0A2C9" strokeWidth="1" strokeLinecap="round"/>
                        <path d="M100 290 L 110 300 L 120 290" stroke="#F0A2C9" strokeWidth="1.2" strokeLinecap="round"/>
                        <path d="M180 330 L 190 310 L 200 330" stroke="#F0A2C9" strokeWidth="1" strokeLinecap="round"/>
                        <path d="M280 250 L 290 260 L 300 250" stroke="#F0A2C9" strokeWidth="1.3" strokeLinecap="round"/>
                        <path d="M380 290 L 390 270 L 400 290" stroke="#F0A2C9" strokeWidth="1" strokeLinecap="round"/>
                        <path d="M430 210 L 440 220 L 450 210" stroke="#F0A2C9" strokeWidth="1.2" strokeLinecap="round"/>

                        {/* Small dots/splatters */}
                        <circle cx="90" cy="320" r="1.5" fill="#F0A2C9" opacity="0.7"/>
                        <circle cx="105" cy="335" r="0.8" fill="#F0A2C9" opacity="0.6"/>
                        <circle cx="115" cy="310" r="1.8" fill="#F0A2C9" opacity="0.8"/>

                        <rect x="170" y="280" width="4" height="1.5" fill="#F0A2C9" opacity="0.7" transform="rotate(15 170 280)"/>
                        <rect x="195" y="295" width="2" height="2" fill="#F0A2C9" opacity="0.6" transform="rotate(-20 195 295)"/>

                        <path d="M260 260 L 265 255 M270 265 L 275 260" stroke="#F0A2C9" strokeWidth="0.8" strokeLinecap="round" opacity="0.7"/>
                        <path d="M340 210 L 345 205 M350 215 L 355 210" stroke="#F0A2C9" strokeWidth="1" strokeLinecap="round" opacity="0.8"/>
                    </svg>
                    {/* End Decorative SVG lines */}

                    <h1 className="text-[#F0A2C9] font-extrabold text-[96px] leading-[0.8] font-sans">
                        {slideData?.companyName || "INGOUDE COMPANY"}
                    </h1>

                    <p className="text-[#F0A2C9] font-bold text-[32px] mt-[60px] font-sans">
                        {slideData?.projectTitle || "FIRST PROJECT"}
                    </p>

                    <p className="text-[#DEDEDE] text-[18px] mt-[24px] max-w-[540px] leading-relaxed font-sans">
                        {slideData?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
