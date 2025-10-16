import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "image-title-buttons-slide";
const layoutName = "ImageTitleButtonsLayout";
const layoutDescription = "A slide with a large image, a prominent title, and a grid of interactive buttons.";

const Schema = z.object({
    mainImage: ImageSchema.default({
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "A stylish woman wearing a pink turtleneck sweater and light blue sunglasses, looking directly at the camera, with a dark background and abstract pink splash graphics."
    }).meta({
        description: "Main image on the left side of the slide. Max 30 words for prompt.",
    }),
    title: z.string().min(10).max(50).default("TABLE OF<br>CONTENTS").meta({
        description: "Main title of the slide. Max 3 words per line, 2 lines.",
    }),
    buttons: z.array(z.object({
        text: z.string().min(1).max(20).default("BUTTON TEXT").meta({
            description: "Text displayed on the button. Max 3 words.",
        }),
    })).min(1).max(9).default([
        { text: "INTRODUCTION" },
        { text: "ABOUT ME" },
        { text: "EDUCATION" },
        { text: "PERSONAL SKILL" },
        { text: "EXPERIENCE" },
        { text: "PROJECT PORTFOLIO" },
        { text: "FIRST PROJECT" },
        { text: "SECOND PROJECT" },
        { text: "CONTACT" },
    ]).meta({
        description: "List of navigation buttons. Min 1, Max 9 buttons.",
    }),
});

// Define default values explicitly to avoid Zod method chain issues
const defaultValues = {
    mainImage: {
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "A stylish woman wearing a pink turtleneck sweater and light blue sunglasses, looking directly at the camera, with a dark background and abstract pink splash graphics."
    },
    title: "TABLE OF<br>CONTENTS",
    buttons: [
        { text: "INTRODUCTION" },
        { text: "ABOUT ME" },
        { text: "EDUCATION" },
        { text: "PERSONAL SKILL" },
        { text: "EXPERIENCE" },
        { text: "PROJECT PORTFOLIO" },
        { text: "FIRST PROJECT" },
        { text: "SECOND PROJECT" },
        { text: "CONTACT" },
    ]
};

type ImageTitleButtonsLayoutData = z.infer<typeof Schema>;

interface ImageTitleButtonsLayoutProps {
    data?: Partial<ImageTitleButtonsLayoutData>;
}

const dynamicSlideLayout: React.FC<ImageTitleButtonsLayoutProps> = ({ data: slideData }) => {
    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-[#333333] relative z-20 mx-auto overflow-hidden">
            <div className="flex h-full w-full">
                {/* Left Section: Image and Splash Graphic */}
                <div className="relative w-[550px] h-full flex-shrink-0 overflow-hidden">
                    {/* Pink Splash Graphic (SVG) */}
                    <svg className="absolute top-[100px] left-[50px] w-[400px] h-[500px] z-0" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Top-left cluster */}
                        <path d="M10 10 L30 20" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M25 5 L45 15" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M15 30 L35 40" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M5 50 L25 60" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M40 35 L60 45" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M60 10 L80 20" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>

                        {/* Mid-left longer streaks */}
                        <path d="M70 100 L100 120 L90 140 L120 160" stroke="#F7B2D2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M50 180 L80 200 L70 220 L100 240" stroke="#F7B2D2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M90 260 L120 280 L110 300 L140 320" stroke="#F7B2D2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>

                        {/* Bottom-left cluster */}
                        <path d="M10 350 L30 360" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M25 345 L45 355" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M15 370 L35 380" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M5 390 L25 400" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M40 375 L60 385" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M60 350 L80 360" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>
                        
                        {/* More random smaller ones */}
                        <path d="M150 50 L160 60" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M170 30 L180 40" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M190 70 L200 80" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M220 10 L230 20" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M250 0 L260 10" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M280 20 L290 30" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M300 50 L310 60" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M330 30 L340 40" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M350 70 L360 80" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>

                        <path d="M200 150 L210 160" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M220 130 L230 140" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M240 170 L250 180" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>

                        <path d="M280 100 L290 110" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M300 120 L310 130" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>

                        <path d="M200 250 L210 260" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M220 230 L230 240" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M240 270 L250 280" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>

                        <path d="M280 300 L290 310" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M300 320 L310 330" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>

                        <path d="M200 350 L210 360" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M220 330 L230 340" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M240 370 L250 380" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>

                        <path d="M280 400 L290 410" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M300 420 L310 430" stroke="#F7B2D2" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    
                    {/* Image of Woman */}
                    <img
                        src={slideData?.mainImage?.__image_url__ || defaultValues.mainImage.__image_url__}
                        alt={slideData?.mainImage?.__image_prompt__ || defaultValues.mainImage.__image_prompt__}
                        className="absolute h-full w-[600px] object-cover object-left z-10"
                        style={{ left: "-50px" }}
                    />
                </div>

                {/* Right Section: Title and Buttons */}
                <div className="flex-grow flex flex-col justify-center items-start pl-10 pr-16 py-10 w-[730px]">
                    <h1
                        className="text-[#F7B2D2] text-[120px] leading-[0.9] font-bold uppercase font-['Bebas_Neue'] mb-10"
                        dangerouslySetInnerHTML={{ __html: slideData?.title || defaultValues.title }}
                    />
                    <div className="grid grid-cols-3 gap-x-[20px] gap-y-[25px]">
                        {(slideData?.buttons || defaultValues.buttons).map((button: { text: string }, index: number) => (
                            <button
                                key={index}
                                className="flex items-center justify-center bg-[#F7B2D2] text-white text-lg font-bold px-6 py-3 rounded-full min-w-[180px] max-w-[220px] h-[55px] font-['Arial']"
                            >
                                {button.text}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
