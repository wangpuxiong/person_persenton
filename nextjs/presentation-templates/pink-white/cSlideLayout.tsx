import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "two-column-text-image-vertical-header-slide";
const layoutName = "Two Column Text Image Vertical Header Layout";
const layoutDescription = "A slide with two columns of text, a main image, and a vertical header text.";

const Schema = z.object({
    leftTextBlock1: z.string().min(150).max(400).default("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat").meta({
        description: "First text block on the left side. Max 70 words.",
    }),
    leftTextBlock2: z.string().min(150).max(400).default("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat").meta({
        description: "Second text block on the left side. Max 70 words.",
    }),
    mainImage: ImageSchema.default({
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "Woman on a couch",
    }).meta({
        description: "Main image for the slide. Max 30 words",
    }),
    verticalHeaderText: z.string().min(5).max(15).default("INTRODUCTION").meta({
        description: "Vertical header text on the right side. Max 2 words",
    }),
});

type TwoColumnTextImageVerticalHeaderLayoutData = z.infer<typeof Schema>;

interface dynamicSlideLayoutProps {
    data?: Partial<TwoColumnTextImageVerticalHeaderLayoutData>;
}

const dynamicSlideLayout: React.FC<dynamicSlideLayoutProps> = ({ data: slideData }) => {
    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-[#333333] relative z-20 mx-auto overflow-hidden">
            {/* Left Text Column */}
            <div className="absolute top-[64px] left-[96px] w-[400px] flex flex-col gap-[44px] text-[#FFC0CB] text-[24px] leading-[1.5] font-sans">
                {/* Text Block 1 */}
                <p>
                    {slideData?.leftTextBlock1}
                </p>
                {/* Text Block 2 */}
                <p>
                    {slideData?.leftTextBlock2}
                </p>
            </div>

            {/* Pink Scribbles (SVG) */}
            <div className="absolute top-[240px] left-[400px] w-[300px] h-[200px] z-0">
                <svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Main sweeping line */}
                    <path d="M10 100 C 50 50, 150 50, 190 100 C 230 150, 150 170, 100 150 C 50 130, 20 120, 10 100 Z" stroke="#FFC0CB" strokeWidth="2" strokeDasharray="8 8" opacity="0.6" />

                    {/* Shorter lines and dots */}
                    <line x1="20" y1="80" x2="80" y2="60" stroke="#FFC0CB" strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="100" y1="10" x2="150" y2="30" stroke="#FFC0CB" strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="200" y1="40" x2="250" y2="60" stroke="#FFC0CB" strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="70" y1="170" x2="120" y2="190" stroke="#FFC0CB" strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="180" y1="160" x2="230" y2="180" stroke="#FFC0CB" strokeWidth="2" strokeDasharray="4 4" />

                    <circle cx="10" cy="50" r="3" fill="#FFC0CB" />
                    <circle cx="40" cy="120" r="3" fill="#FFC0CB" />
                    <circle cx="150" cy="10" r="3" fill="#FFC0CB" />
                    <circle cx="280" cy="100" r="3" fill="#FFC0CB" />
                    <circle cx="200" cy="190" r="3" fill="#FFC0CB" />
                </svg>
            </div>

            {/* Main Image */}
            <img
                src={slideData?.mainImage?.__image_url__}
                alt={slideData?.mainImage?.__image_prompt__}
                className="absolute w-[630px] h-[420px] top-[254px] left-[504px] object-cover z-10"
            />

            {/* Vertical "INTRODUCTION" Text */}
            <div className="absolute right-[20px] top-[50%] -translate-y-1/2 [writing-mode:vertical-rl] [text-orientation:upright] text-[48px] font-bold text-[#FFC0CB] font-sans">
                {slideData?.verticalHeaderText}
            </div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
