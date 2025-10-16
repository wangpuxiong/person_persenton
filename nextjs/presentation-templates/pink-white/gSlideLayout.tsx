import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const ExperienceItemSchema = z.object({
    title: z.string().min(1).max(25).default("PROJECT MANAGER").meta({
        description: "Title for the experience item. Max 4 words",
    }),
    description: z.string().min(80).max(200).default("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.").meta({
        description: "Description for the experience item. Max 35 words",
    }),
});

const layoutId = "experience-list-with-image-and-header-slide";
const layoutName = "dynamicSlideLayout";
const layoutDescription = "A slide featuring a large header, two text blocks with titles and descriptions, and a prominent image on the side, with decorative graphics.";

const Schema = z.object({
    mainTitle: z.string().min(1).max(25).default("WORK EXPERIENCE").meta({
        description: "Main title of the slide. Max 3 words",
    }),
    experienceItems: z.array(ExperienceItemSchema).min(1).max(3).default([
        {
            title: "PROJECT MANAGER",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
        },
        {
            title: "SALES REPRESENTATIVE",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
        }
    ]).meta({
        description: "List of experience items, each with a title and description. Max 3 items.",
    }),
    sideImage: ImageSchema.default({
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "Person holding sunglasses"
    }).meta({
        description: "Image displayed on the right side of the slide. Max 10 words for prompt.",
    }),
});

type WorkExperienceSlideData = z.infer<typeof Schema>;

interface dynamicSlideLayoutProps {
    data?: Partial<WorkExperienceSlideData>;
}

const dynamicSlideLayout: React.FC<dynamicSlideLayoutProps> = ({ data: slideData }) => {
    const experienceItems = slideData?.experienceItems || [];

    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-[#363435] relative z-20 mx-auto overflow-hidden">

            {/* Image on the right */}
            <div className="absolute top-0 left-[700px] w-[597.5px] h-[483.8px] overflow-hidden">
                <img
                    src={slideData?.sideImage?.__image_url__ || "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"}
                    alt={slideData?.sideImage?.__image_prompt__ || "Person holding sunglasses"}
                    className="object-cover w-full h-full object-[10%_top]"
                />
            </div>

            {/* Experience Items */}
            {experienceItems.map((item, index) => (
                <div
                    key={index}
                    className="absolute"
                    style={{
                        left: "100px",
                        top: index === 0 ? "64px" : "280px", // Adjust top based on index
                        width: "500px",
                    }}
                >
                    <h2
                        className="text-[32px] font-bold text-[#F48FB1] uppercase leading-none"
                        style={{ fontFamily: "Oswald", height: "48px" }}
                    >
                        {item.title}
                    </h2>
                    <p
                        className="text-[24px] text-[#F48FB1] leading-tight mt-[8px]"
                        style={{ fontFamily: "sans-serif", height: "117.5px" }}
                    >
                        {item.description}
                    </p>
                </div>
            ))}

            {/* Work Experience Title */}
            <h1
                className="absolute text-[120px] font-bold text-[#F48FB1] uppercase leading-none"
                style={{
                    left: "32px",
                    top: "550px",
                    width: "1200px",
                    height: "152.0px",
                    fontFamily: "Oswald",
                }}
            >
                {slideData?.mainTitle || "WORK EXPERIENCE"}
            </h1>

            {/* Pink Scratches SVG */}
            <div className="absolute" style={{ left: "882.8px", top: "526.5px", width: "323.3px", height: "189.5px" }}>
                <svg width="100%" height="100%" viewBox="0 0 323 189" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path d="M129.5 0.5L0.5 130.5" stroke="#F48FB1" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M141.5 0.5L38.5 130.5" stroke="#F48FB1" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M153.5 0.5L76.5 130.5" stroke="#F48FB1" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M165.5 0.5L108.5 130.5" stroke="#F48FB1" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M177.5 0.5L140.5 130.5" stroke="#F48FB1" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M189.5 0.5L172.5 130.5" stroke="#F48FB1" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M201.5 0.5L204.5 130.5" stroke="#F48FB1" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M213.5 0.5L236.5 130.5" stroke="#F48FB1" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M225.5 0.5L268.5 130.5" stroke="#F48FB1" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M237.5 0.5L300.5 130.5" stroke="#F48FB1" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M249.5 0.5L322.5 130.5" stroke="#F48FB1" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M110.5 188.5L21.5 58.5" stroke="#F48FB1" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M122.5 188.5L59.5 58.5" stroke="#F48FB1" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M134.5 188.5L97.5 58.5" stroke="#F48FB1" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M146.5 188.5L135.5 58.5" stroke="#F48FB1" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M158.5 188.5L173.5 58.5" stroke="#F48FB1" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M170.5 188.5L211.5 58.5" stroke="#F48FB1" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M182.5 188.5L249.5 58.5" stroke="#F48FB1" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M194.5 188.5L287.5 58.5" stroke="#F48FB1" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M206.5 188.5L322.5 58.5" stroke="#F48FB1" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
