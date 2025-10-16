import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-description-decorative-slide";
const layoutName = "HeaderDescriptionDecorativeLayout";
const layoutDescription = "A slide with a large header and a descriptive paragraph, surrounded by decorative shapes.";

const Schema = z.object({
    title: z.string().min(5).max(15).default("CONCLUSION").meta({
        description: "Main title of the slide. Max 3 words",
    }),
    description: z.string().min(100).max(450).default("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.").meta({
        description: "Main descriptive paragraph. Max 80 words",
    }),
});

type HeaderDescriptionDecorativeLayoutData = z.infer<typeof Schema>;

interface HeaderDescriptionDecorativeLayoutProps {
    data?: Partial<HeaderDescriptionDecorativeLayoutData>;
}

const dynamicSlideLayout: React.FC<HeaderDescriptionDecorativeLayoutProps> = ({ data: slideData }) => {
    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-[#F8F2E6] relative z-20 mx-auto overflow-hidden">

            {/* Top Border */}
            <div className="absolute top-0 left-0 w-full h-[40px] bg-[#DCCFBC]"></div>

            {/* Bottom Border */}
            <div className="absolute bottom-0 left-0 w-full h-[40px] bg-[#DCCFBC]"></div>

            {/* Decorative Shapes (Absolute Positioning) */}

            {/* Top-left: Dark Red Semicircle (full circle clipped by overflow-hidden) */}
            <div className="absolute top-[-128px] left-[-128px] w-[256px] h-[256px] rounded-full bg-[#8B2C2B]"></div>
            {/* Top-left: Light Beige Quarter Circle */}
            <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-br-full bg-[#DCCFBC]"></div>

            {/* Bottom-left: Light Beige Quarter Circle */}
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-tr-full bg-[#DCCFBC]"></div>
            {/* Bottom-left: Dark Red Outlined Circle */}
            <div className="absolute bottom-[96px] left-[120px] w-[96px] h-[96px] rounded-full border-[3px] border-[#8B2C2B]"></div>
            {/* Bottom-left: X Pattern */}
            <div className="absolute bottom-[80px] left-[152px] grid grid-cols-5 text-[#8B2C2B] text-[16px] leading-[1] font-bold">
                <span>X</span><span>X</span><span>X</span><span>X</span><span>X</span>
                <span>X</span><span>X</span><span>X</span><span>X</span><span>X</span>
                <span>X</span><span>X</span><span>X</span><span>X</span><span>X</span>
                <span>X</span><span>X</span><span>X</span><span>X</span><span>X</span>
            </div>

            {/* Top-right: Light Beige Quarter Circle */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-bl-full bg-[#DCCFBC]"></div>
            {/* Top-right: X Pattern */}
            <div className="absolute top-[216px] right-[144px] grid grid-cols-5 text-[#8B2C2B] text-[16px] leading-[1] font-bold">
                <span>X</span><span>X</span><span>X</span><span>X</span><span>X</span>
                <span>X</span><span>X</span><span>X</span><span>X</span><span>X</span>
                <span>X</span><span>X</span><span>X</span><span>X</span><span>X</span>
                <span>X</span><span>X</span><span>X</span><span>X</span><span>X</span>
            </div>

            {/* Mid-right: Dark Red Outlined Circle */}
            <div className="absolute top-[456px] right-[75px] w-[96px] h-[96px] rounded-full border-[3px] border-[#8B2C2B]"></div>

            {/* Bottom-right: Dark Red Semicircle (full circle clipped by overflow-hidden) */}
            <div className="absolute bottom-[-128px] right-[-128px] w-[256px] h-[256px] rounded-full bg-[#8B2C2B]"></div>
            {/* Bottom-right: Light Beige Quarter Circle */}
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-tl-full bg-[#DCCFBC]"></div>

            {/* Main Content Area */}
            <div className="relative z-10 flex flex-col items-center justify-start h-full pt-[40px] pb-[40px] box-border">
                {/* Title */}
                <h1
                    className="text-[#331F1F] font-['Playfair_Display'] text-[96px] leading-[1.2] text-center"
                    style={{ marginTop: "140px", marginBottom: "50px" }}
                >
                    {slideData?.title || "CONCLUSION"}
                </h1>

                {/* Paragraph Text */}
                <p className="text-[#331F1F] font-['Open_Sans'] text-[24px] leading-[1.5] text-left w-[816px] px-0">
                    {slideData?.description || "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
                </p>
            </div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
