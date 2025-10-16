import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "cover-with-image-large-text-description-name-slide";
const layoutName = "CreativePortfolioCoverLayout";
const layoutDescription = "A cover slide with large text elements, a banner, an image, descriptive text, and a name.";

const Schema = z.object({
    creativeText: z.string().min(3).max(10).default("CREATIVE").meta({
        description: "The main creative text. Max 2 words",
    }),
    portfolioText: z.string().min(3).max(10).default("PORTFOLIO").meta({
        description: "The main portfolio text. Max 2 words",
    }),
    presentationText: z.string().min(5).max(15).default("PRESENTATION").meta({
        description: "Text for the presentation banner. Max 2 words",
    }),
    image: ImageSchema.default({
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "Woman in pink sweater and sunglasses"
    }).meta({
        description: "Image of a person for the slide. Max 10 words",
    }),
    description: z.string().min(100).max(300).default("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat").meta({
        description: "Descriptive text for the portfolio. Max 50 words",
    }),
    name: z.string().min(10).max(20).default("OLIVIA WILSON").meta({
        description: "Name of the portfolio owner. Max 3 words",
    }),
});

type CreativePortfolioCoverLayoutProps = z.infer<typeof Schema>;

interface dynamicSlideLayoutProps {
    data?: Partial<CreativePortfolioCoverLayoutProps>;
}

const dynamicSlideLayout: React.FC<dynamicSlideLayoutProps> = ({ data: slideData }) => {
    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-[#333333] relative z-20 mx-auto overflow-hidden">

            {/* Large Pink Text: CREATIVE */}
            <h1
                className="absolute left-[168px] top-[115px] text-[#FF99CC] text-[160px] leading-none font-['Impact'] uppercase tracking-tight"
                style={{ fontFamily: "Impact" }}
            >
                {slideData?.creativeText || "CREATIVE"}
            </h1>

            {/* Large Pink Text: PORTFOLIO */}
            <h1
                className="absolute left-[168px] top-[304px] text-[#FF99CC] text-[160px] leading-none font-['Impact'] uppercase tracking-tight"
                style={{ fontFamily: "Impact" }}
            >
                {slideData?.portfolioText || "PORTFOLIO"}
            </h1>

            {/* PRESENTATION Banner */}
            <div className="absolute left-[399px] top-[252px] bg-[#4A4A4A] text-white px-8 py-2 text-[32px] font-bold z-10 -rotate-12 flex items-center justify-center whitespace-nowrap">
                <span className="font-sans">
                    {slideData?.presentationText || "PRESENTATION"}
                </span>
            </div>

            {/* Brush Stroke SVG */}
            <svg className="absolute left-[714px] top-[105px] w-[525px] h-[525px] z-0" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Main visible strokes */}
                <path d="M 50 400 L 200 100 L 350 250 L 450 50" stroke="#FF99CC" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
                <path d="M 80 450 L 230 150 L 380 300 L 480 100" stroke="#FF99CC" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
                <path d="M 20 350 L 170 50 L 320 200 L 420 0" stroke="#FF99CC" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
                {/* Overlapping, thinner strokes for density */}
                <path d="M 100 420 L 220 180 L 340 320 L 440 120" stroke="#FF99CC" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
                <path d="M 130 460 L 250 220 L 370 360 L 470 160" stroke="#FF99CC" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
                <path d="M 150 380 L 270 140 L 390 280 L 490 80" stroke="#FF99CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
                <path d="M 70 300 L 190 0 L 310 150 L 410 -50" stroke="#FF99CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.2"/>
            </svg>

            {/* Woman's Image */}
            <img
                src={slideData?.image?.__image_url__ || ""}
                alt={slideData?.image?.__image_prompt__ || slideData?.creativeText || ""}
                className="absolute left-[819px] top-[189px] w-[367px] h-[551px] object-cover drop-shadow-2xl z-10"
            />

            {/* Descriptive Text */}
            <p className="absolute left-[168px] top-[556px] w-[472px] text-[#AAAAAA] text-[13.33px] font-sans leading-tight">
                {slideData?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"}
            </p>

            {/* Name */}
            <p className="absolute left-[168px] top-[651px] text-[#AAAAAA] text-[18.66px] font-bold font-sans">
                {slideData?.name || "OLIVIA WILSON"}
            </p>

        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
