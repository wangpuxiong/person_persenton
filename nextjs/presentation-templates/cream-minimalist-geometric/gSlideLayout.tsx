import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-description-decorative-slide";
const layoutName = "HeaderDescriptionDecorativeLayout";
const layoutDescription = "A slide with a header, a description, and decorative geometric shapes and patterns.";

const Schema = z.object({
    title: z.string().min(3).max(15).default("ANALYSIS").meta({
        description: "Main title of the slide. Max 3 words",
    }),
    description: z.string().min(200).max(400).default("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.").meta({
        description: "Main description text. Max 60 words",
    }),
});

type HeaderDescriptionDecorativeLayoutData = z.infer<typeof Schema>;

interface HeaderDescriptionDecorativeLayoutProps {
    data?: Partial<HeaderDescriptionDecorativeLayoutData>;
}

const dynamicSlideLayout: React.FC<HeaderDescriptionDecorativeLayoutProps> = ({ data: slideData }) => {
    return (
        <div
            className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-[#F5EADF] z-20 mx-auto overflow-hidden"
            style={{ fontFamily: "Arial, sans-serif" }}
        >
            {/* Decorative Shapes */}

            {/* Top-left large dark red circle (partially off-screen) */}
            <div className="absolute w-[210px] h-[210px] rounded-full bg-[#8B2E3D] -left-[105px] -top-[105px]"></div>
            {/* Top-left beige quarter circle */}
            <div className="absolute w-[378px] h-[210px] bg-[#DBC9B5] top-0 left-0 rounded-br-[210px]"></div>

            {/* Bottom-left beige quarter circle */}
            <div className="absolute w-[378px] h-[210px] bg-[#DBC9B5] bottom-0 left-0 rounded-tr-[210px]"></div>
            {/* Bottom-left dark red outlined circle */}
            <div className="absolute w-[105px] h-[105px] left-[73px] top-[462px] rounded-full border-[2px] border-[#8B2E3D]"></div>
            {/* Bottom-left X pattern */}
            <pre className="absolute left-[21px] bottom-[69px] w-[136px] h-[84px] text-[#8B2E3D] text-[14px] leading-tight font-['Arial']">
                {"XXXXX\nXXXXX\nXXXXX\nXXXXX"}
            </pre>

            {/* Top-right beige quarter circle */}
            <div className="absolute w-[378px] h-[210px] bg-[#DBC9B5] top-0 right-0 rounded-bl-[210px]"></div>
            {/* Top-right X pattern */}
            <pre className="absolute right-[136px] top-[21px] w-[136px] h-[84px] text-[#8B2E3D] text-[14px] leading-tight font-['Arial']">
                {"XXXXX\nXXXXX\nXXXXX\nXXXXX"}
            </pre>

            {/* Bottom-right large dark red circle (partially off-screen) */}
            <div className="absolute w-[210px] h-[210px] rounded-full bg-[#8B2E3D] -right-[105px] -bottom-[105px]"></div>
            {/* Bottom-right dark red outlined circle */}
            <div className="absolute w-[105px] h-[105px] right-[57px] top-[462px] rounded-full border-[2px] border-[#8B2E3D]"></div>

            {/* Main Content */}

            {/* Title */}
            <h1 className="absolute top-[150px] left-1/2 -translate-x-1/2 text-[#8B2E3D] text-[60px] font-['Arial_Black'] tracking-wide leading-none text-center whitespace-nowrap">
                {slideData?.title || "ANALYSIS"}
            </h1>

            {/* Text Block */}
            <p className="absolute left-1/2 -translate-x-1/2 top-[320px] w-[882px] text-[#333333] text-[24px] font-['Arial'] leading-relaxed text-left">
                {slideData?.description || "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
            </p>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
