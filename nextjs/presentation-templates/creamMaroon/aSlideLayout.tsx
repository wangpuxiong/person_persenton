import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "title-subtitle-cover-slide";
const layoutName = "TitleSubtitleCoverLayout";
const layoutDescription = "A cover slide with a large title and a subtitle.";

const Schema = z.object({
    title: z.string().min(5).max(15).default("PRESENTATION").meta({
        description: "Main title of the slide. Max 2 words.",
    }),
    subtitle: z.string().min(15).max(35).default("Presented by: Samira Hadid").meta({
        description: "Subtitle or presenter name. Max 5 words.",
    }),
});

type TitleSubtitleCoverLayoutData = z.infer<typeof Schema>;

interface TitleSubtitleCoverLayoutProps {
    data?: Partial<TitleSubtitleCoverLayoutData>;
}

const dynamicSlideLayout: React.FC<TitleSubtitleCoverLayoutProps> = ({ data: slideData }) => {
    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-[#e0c9a6] relative z-20 mx-auto overflow-hidden">
            {/* Inner content area with main background color and 8px border from outer container */}
            <div className="relative w-[calc(100%-16px)] h-[calc(100%-16px)] top-[8px] left-[8px] bg-[#f8f0e5] rounded-sm flex flex-col items-center justify-center">

                {/* Decorative elements - Absolute positioned */}

                {/* Top-left corner shapes */}
                <div className="absolute top-0 left-0 w-[180px] h-[180px] bg-[#e0c9a6] rounded-br-full"></div>
                <div className="absolute top-[10px] left-[10px] w-[80px] h-[80px] bg-[#4a2e2a] rounded-br-full"></div>

                {/* Bottom-left corner shapes and X-pattern */}
                <div className="absolute bottom-0 left-0 w-[180px] h-[180px] bg-[#e0c9a6] rounded-tr-full"></div>
                <div className="absolute bottom-[10px] left-[10px] w-[80px] h-[80px] bg-[#4a2e2a] rounded-tr-full"></div>
                <div className="absolute bottom-[50px] left-[200px] text-[#4a2e2a] text-xs leading-none font-bold">
                    <p>xxxxxxx</p>
                    <p>xxxxxxx</p>
                    <p>xxxxxxx</p>
                    <p>xxxxxxx</p>
                    <p>xxxxxxx</p>
                </div>

                {/* Top-right corner shapes and X-pattern */}
                <div className="absolute top-0 right-0 w-[180px] h-[180px] bg-[#e0c9a6] rounded-bl-full"></div>
                <div className="absolute top-[10px] right-[10px] w-[80px] h-[80px] bg-[#4a2e2a] rounded-bl-full"></div>
                <div className="absolute top-[50px] right-[200px] text-[#4a2e2a] text-xs leading-none font-bold">
                    <p>xxxxxxx</p>
                    <p>xxxxxxx</p>
                    <p>xxxxxxx</p>
                    <p>xxxxxxx</p>
                    <p>xxxxxxx</p>
                </div>

                {/* Bottom-right corner shapes */}
                <div className="absolute bottom-0 right-0 w-[180px] h-[180px] bg-[#e0c9a6] rounded-tl-full"></div>
                <div className="absolute bottom-[10px] right-[10px] w-[80px] h-[80px] bg-[#4a2e2a] rounded-tl-full"></div>

                {/* Mid-left circle */}
                <div className="absolute top-1/2 -translate-y-1/2 left-[180px] w-[60px] h-[60px] border-4 border-[#4a2e2a] rounded-full"></div>
                {/* Mid-right circle */}
                <div className="absolute top-1/2 -translate-y-1/2 right-[180px] w-[60px] h-[60px] border-4 border-[#4a2e2a] rounded-full"></div>

                {/* Main text content */}
                <h1 className="text-[#4a2e2a] font-serif text-8xl font-bold leading-tight">{slideData?.title || "PRESENTATION"}</h1>
                <p className="text-[#4a2e2a] font-sans text-4xl mt-6">{slideData?.subtitle || "Presented by: Samira Hadid"}</p>
            </div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
