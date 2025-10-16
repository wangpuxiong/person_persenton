import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "title-and-paragraph-with-decorative-shapes-slide";
const layoutName = "Title and Paragraph with Decorative Shapes Layout";
const layoutDescription = "A slide with a central title, a paragraph description, and abstract decorative shapes and patterns.";

const Schema = z.object({
    title: z.string().min(5).max(25).default("BACKGROUND").meta({
        description: "Main title of the slide. Max 3 words",
    }),
    paragraph: z.string().min(200).max(450).default("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.").meta({
        description: "Main descriptive paragraph. Max 80 words",
    }),
});

type dynamicSlideLayoutProps = z.infer<typeof Schema>;

interface dynamicSlideLayoutComponentProps {
    data?: Partial<dynamicSlideLayoutProps>;
}

const dynamicSlideLayout: React.FC<dynamicSlideLayoutComponentProps> = ({ data: slideData }) => {
    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-[#F5EDE2] relative z-20 mx-auto overflow-hidden">

            {/* Top Border */}
            <div className="absolute top-0 left-0 w-full h-[20px] bg-[#D2C7B9]"></div>

            {/* Bottom Border */}
            <div className="absolute bottom-0 left-0 w-full h-[20px] bg-[#D2C7B9]"></div>

            {/* Top-Left Curved Shape */}
            <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-[#D2C7B9] rounded-br-full"></div>

            {/* Top-Left Dark Red Circle */}
            <div className="absolute top-[17px] left-[17px] w-[76px] h-[76px] bg-[#8B2226] rounded-full"></div>

            {/* Bottom-Left Curved Shape */}
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#D2C7B9] rounded-tr-full"></div>

            {/* Bottom-Left Dark Red Outlined Circle */}
            <div className="absolute bottom-[115px] left-[45px] w-[50px] h-[50px] border-[2px] border-[#8B2226] rounded-full"></div>

            {/* Bottom-Left X Grid */}
            <pre className="absolute bottom-[42.5px] left-[20px] text-[#8B2226] font-['Open_Sans'] text-[24px] leading-[1] whitespace-pre-wrap">
X X X X X
X X X X X
X X X X X
X X X X X</pre>

            {/* Top-Right Curved Shape */}
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#D2C7B9] rounded-bl-full"></div>

            {/* Top-Right X Grid */}
            <pre className="absolute top-[35px] right-[20px] text-[#8B2226] font-['Open_Sans'] text-[24px] leading-[1] whitespace-pre-wrap">
X X X X X
X X X X X
X X X X X
X X X X X</pre>

            {/* Bottom-Right Curved Shape */}
            <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-[#D2C7B9] rounded-tl-full"></div>

            {/* Bottom-Right Dark Red Outlined Circle */}
            <div className="absolute bottom-[115px] right-[50px] w-[50px] h-[50px] border-[2px] border-[#8B2226] rounded-full"></div>

            {/* Bottom-Right Dark Red Filled Circle (partially obscured by curved shape) */}
            <div className="absolute top-[450px] left-[907.5px] w-[76px] h-[76px] bg-[#8B2226] rounded-full"></div>

            {/* Title Text */}
            <h1 className="absolute top-[140px] left-1/2 -translate-x-1/2 w-[618px] text-center text-[#262626] font-['Playfair_Display'] text-[80px] leading-tight">
                {slideData?.title || "BACKGROUND"}
            </h1>

            {/* Paragraph Text */}
            <p className="absolute top-[310px] left-[162px] w-[1000px] h-[150px] text-[#262626] font-['Open_Sans'] text-[24px] leading-normal">
                {slideData?.paragraph || "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
            </p>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
