import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-description-decorative-slide";
const layoutName = "HeaderDescriptionDecorativeLayout";
const layoutDescription = "A slide with a header, description, and decorative elements.";

const Schema = z.object({
    title: z.string().min(5).max(20).default("INTRODUCTION").meta({
        description: "Main title of the slide. Max 2 words",
    }),
    description: z.string().min(200).max(450).default("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.").meta({
        description: "Main description text. Max 70 words",
    }),
});

type HeaderDescriptionDecorativeLayoutData = z.infer<typeof Schema>;

interface HeaderDescriptionDecorativeLayoutProps {
    data?: Partial<HeaderDescriptionDecorativeLayoutData>;
}

const dynamicSlideLayout: React.FC<HeaderDescriptionDecorativeLayoutProps> = ({ data: slideData }) => {
    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-[#f9f4ec] relative z-20 mx-auto overflow-hidden">

            {/* Top Border */}
            <div className="absolute top-0 left-0 w-full h-[20px] bg-[#e3d7c5]"></div>
            {/* Bottom Border */}
            <div className="absolute bottom-0 left-0 w-full h-[20px] bg-[#e3d7c5]"></div>

            {/* Decorative elements - Top Left Semicircles and Circle */}
            <div className="absolute top-0 left-0 w-[150px] h-[150px] overflow-hidden">
                <div className="absolute -top-[75px] -left-[75px] w-[150px] h-[150px] bg-[#8B2326] rounded-full"></div>
            </div>
            <div className="absolute top-0 left-0 w-[100px] h-[100px] overflow-hidden">
                <div className="absolute -top-[50px] -left-[50px] w-[100px] h-[100px] bg-[#e3d7c5] rounded-full"></div>
            </div>
            <div className="absolute top-[90px] left-[70px] w-[80px] h-[80px] rounded-full border-2 border-[#8B2326]"></div>

            {/* Decorative elements - Bottom Right Semicircles and Circle */}
            <div className="absolute bottom-0 right-0 w-[150px] h-[150px] overflow-hidden">
                <div className="absolute -bottom-[75px] -right-[75px] w-[150px] h-[150px] bg-[#8B2326] rounded-full"></div>
            </div>
            <div className="absolute bottom-0 right-0 w-[100px] h-[100px] overflow-hidden">
                <div className="absolute -bottom-[50px] -right-[50px] w-[100px] h-[100px] bg-[#e3d7c5] rounded-full"></div>
            </div>
            <div className="absolute bottom-[90px] right-[70px] w-[80px] h-[80px] rounded-full border-2 border-[#8B2326]"></div>

            {/* Decorative elements - 'x' grids */}
            <div className="absolute top-[90px] right-[100px] font-mono text-xs text-[#8B2326] leading-none">
                XXXXXXXXXX<br/>
                XXXXXXXXXX<br/>
                XXXXXXXXXX<br/>
                XXXXXXXXXX<br/>
                XXXXXXXXXX
            </div>
            <div className="absolute bottom-[90px] left-[100px] font-mono text-xs text-[#8B2326] leading-none">
                XXXXXXXXXX<br/>
                XXXXXXXXXX<br/>
                XXXXXXXXXX<br/>
                XXXXXXXXXX<br/>
                XXXXXXXXXX
            </div>

            {/* Main Content Area (Title and Text) */}
            <div className="relative z-10 flex flex-col items-center pt-[170px] px-20">
                <h1 className="font-['Georgia'] text-[60px] font-bold text-[#331a1a] mb-10">
                    {slideData?.title || "INTRODUCTION"}
                </h1>
                <p className="font-['Georgia'] text-[20px] text-gray-800 leading-relaxed max-w-[700px] text-center">
                    {slideData?.description || "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
                </p>
            </div>

        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
