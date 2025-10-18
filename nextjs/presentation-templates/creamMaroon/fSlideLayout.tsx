import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-two-text-blocks-slide";
const layoutName = "HeaderTwoTextBlocksLayout";
const layoutDescription = "A slide with a header and two text blocks.";

const Schema = z.object({
    title: z.string().min(1).max(20).default("THEORY").meta({
        description: "Main title of the slide. Max 2 words",
    }),
    textBlocks: z.array(z.object({
        text: z.string().min(60).max(180).default("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat at tortor id ullamcorper.").meta({
            description: "A block of descriptive text. Max 30 words",
        }),
    })).min(1).max(2).default([
        {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat at tortor id ullamcorper.",
        },
        {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat at tortor id ullamcorper.",
        },
    ]).meta({
        description: "Array of two text blocks.",
    }),
});

type HeaderTwoTextBlocksLayoutProps = z.infer<typeof Schema>;

const dynamicSlideLayout: React.FC<{ data: HeaderTwoTextBlocksLayoutProps }> = ({ data: slideData }) => {
    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-[#FDF9F3] z-20 mx-auto overflow-hidden">

            {/* Decorative quarter circles and circles (absolute positioning) */}
            <div className="absolute w-[300px] h-[300px] rounded-full bg-[#8B262F] -left-[150px] -top-[150px]"></div>
            <div className="absolute w-[350px] h-[350px] rounded-full bg-[#EAE0D3] -left-[175px] -top-[175px]"></div>
            <div className="absolute w-[350px] h-[350px] rounded-full bg-[#EAE0D3] -left-[175px] -bottom-[175px]"></div>
            <div className="absolute w-[350px] h-[350px] rounded-full bg-[#EAE0D3] -right-[175px] -bottom-[175px]"></div>
            <div className="absolute w-[300px] h-[300px] rounded-full bg-[#8B262F] -right-[150px] -bottom-[150px]"></div>

            <div className="absolute w-[70px] h-[70px] rounded-full border-2 border-[#8B262F] left-[90px] top-[290px]"></div>
            <div className="absolute w-[70px] h-[70px] rounded-full border-2 border-[#8B262F] right-[90px] top-[290px]"></div>

            {/* Decorative 'x' patterns (absolute positioning) */}
            <pre className="absolute font-bold text-[#8B262F] text-sm leading-tight right-[100px] top-[100px]">
                {"xxxxxx\nxxxxxx\nxxxxxx\nxxxxxx\nxxxxxx"}
            </pre>
            <pre className="absolute font-bold text-[#8B262F] text-sm leading-tight left-[100px] bottom-[100px]">
                {"xxxxxx\nxxxxxx\nxxxxxx\nxxxxxx\nxxxxxx"}
            </pre>

            {/* Main content area */}
            <div className="flex flex-col items-center justify-start h-full pt-[150px]">
                {/* Title */}
                <h1 className="font-['Playfair_Display'] text-[64px] text-[#331500] leading-none mb-16">
                    {slideData?.title || "THEORY"}
                </h1>

                {/* Text blocks */}
                {slideData?.textBlocks?.map((block, index) => (
                    <div key={index} className={`w-[700px] bg-[#EAE0D3] p-6 rounded-md shadow-sm ${index > 0 ? "mt-8" : ""}`}>
                        <p className="font-['Open_Sans'] text-lg text-[#331500] leading-relaxed">
                            {block.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
