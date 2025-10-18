import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-two-text-blocks-slide";
const layoutName = "HeaderTwoTextBlocksLayout";
const layoutDescription = "A slide with a header and two text blocks.";

const Schema = z.object({
    title: z.string().min(1).max(10).default("GOALS").meta({
        description: "Main title of the slide. Max 2 words",
    }),
    textBlocks: z.array(z.object({
        content: z.string().min(60).max(180).default("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat at tortor id ullamcorper.").meta({
            description: "Content for the text block. Max 30 words",
        }),
    })).min(1).max(2).default([
        {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat at tortor id ullamcorper.",
        },
        {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat at tortor id ullamcorper.",
        },
    ]).meta({
        description: "List of text blocks. Max 2 blocks",
    }),
});

type HeaderTwoTextBlocksLayoutProps = z.infer<typeof Schema>;

const dynamicSlideLayout = ({ data: slideData }: { data: HeaderTwoTextBlocksLayoutProps }) => {
    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
            {/* Main background color */}
            <div className="absolute inset-0 bg-[#FBF8F3]"></div>

            {/* Decorative elements */}
            {/* Top-left dark red circle */}
            <div className="absolute -top-[75px] -left-[75px] w-[150px] h-[150px] rounded-full bg-[#822121]"></div>

            {/* Top and Bottom light beige strips */}
            <div className="absolute top-0 left-0 w-full h-[50px] bg-[#EAE2D7]"></div>
            <div className="absolute bottom-0 left-0 w-full h-[50px] bg-[#EAE2D7]"></div>

            {/* Corner quarter circles (positioned below the strips) */}
            <div className="absolute top-[50px] left-0 w-[100px] h-[100px] bg-[#EAE2D7] rounded-br-full"></div>
            <div className="absolute top-[50px] right-0 w-[100px] h-[100px] bg-[#EAE2D7] rounded-bl-full"></div>
            <div className="absolute bottom-[50px] left-0 w-[100px] h-[100px] bg-[#EAE2D7] rounded-tr-full"></div>
            <div className="absolute bottom-[50px] right-0 w-[100px] h-[100px] bg-[#EAE2D7] rounded-tl-full"></div>

            {/* Dark red 'X' patterns */}
            <pre className="absolute top-[70px] right-[70px] text-[#822121] text-xs leading-none font-mono">
XXXXX
XXXXX
XXXXX
XXXXX
XXXXX</pre>
            <pre className="absolute bottom-[70px] left-[70px] text-[#822121] text-xs leading-none font-mono">
XXXXX
XXXXX
XXXXX
XXXXX
XXXXX</pre>

            {/* Dark red outlined circles */}
            <div className="absolute left-[100px] top-1/2 -translate-y-1/2 w-[70px] h-[70px] border-4 border-[#822121] rounded-full"></div>
            <div className="absolute right-[100px] top-1/2 -translate-y-1/2 w-[70px] h-[70px] border-4 border-[#822121] rounded-full"></div>

            {/* Main content area */}
            <div className="relative z-10 flex flex-col items-center">
                {/* Title "GOALS" */}
                <h1 className="font-['Playfair_Display'] text-[96px] text-[#333333] leading-none mt-[140px]">
                    {slideData?.title}
                </h1>

                {/* Container for text boxes */}
                <div className="flex flex-col gap-[32px] mt-[50px]">
                    {slideData?.textBlocks?.map((block, index) => (
                        <div key={index} className="w-[840px] h-[115px] bg-[#EAE2D7] flex items-center p-8">
                            <p className="font-sans text-2xl text-[#333333] leading-tight">
                                {block.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
