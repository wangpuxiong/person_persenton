import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const CardSchema = z.object({
    value: z.string().min(2).max(6).default("345+").meta({
        description: "Numeric value for the card, e.g., '345+'. Max 5 digits + '+'",
    }),
    heading: z.string().min(4).max(20).default("COLLABORATIONS").meta({
        description: "Heading for the card. Max 3 words",
    }),
    text: z.string().min(11).max(130).default("Presentations are tools that can be used as lectures, speeches, reports, and more.").meta({
        description: "Description text for the card. Max 25 words",
    }),
});

const layoutId = "header-description-image-two-cards-slide";
const layoutName = "HeaderDescriptionImageTwoCardsLayout";
const layoutDescription = "A slide with a header, description, an image, and two content cards.";

const Schema = z.object({
    category: z.string().min(5).max(15).default("COMPANY PROFILE").meta({
        description: "Category text above the main title. Max 3 words",
    }),
    title: z.string().min(5).max(20).default("INTRODUCTION").meta({
        description: "Main title of the slide. Max 3 words",
    }),
    description: z.string().min(50).max(300).default("Presentations are tools that can be used as lectures, speeches, reports, and more. It is mostly presented before an audience. It serves a variety of purposes, making presentations powerful tools for convincing and teaching.").meta({
        description: "Main description paragraph. Max 50 words",
    }),
    mainImage: ImageSchema.default({
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "Business team standing in an office with a whiteboard showing 'STRATEGY'"
    }).meta({
        description: "Main image on the right side of the slide. Max 30 words",
    }),
    cards: z.array(CardSchema).min(1).max(2).default([
        {
            value: "345+",
            heading: "COLLABORATIONS",
            text: "Presentations are tools that can be used as lectures, speeches, reports, and more."
        },
        {
            value: "675+",
            heading: "PROJECTS",
            text: "Presentations are tools that can be used as lectures, speeches, reports, and more."
        }
    ]).meta({
        description: "List of information cards at the bottom. Max 2 cards",
    }),
    decorativeIcons: z.array(IconSchema).min(0).max(2).default([
        {
            __icon_url__: "/static/icons/bold/info-bold.svg",
            __icon_query__: "info icon"
        },
        {
            __icon_url__: "/static/icons/bold/info-bold.svg",
            __icon_query__: "info icon"
        }
    ]).meta({
        description: "Decorative icons at the top right. Max 2 icons",
    }),
});

type HeaderDescriptionImageTwoCardsLayoutData = z.infer<typeof Schema>;

interface dynamicSlideLayoutProps {
    data?: Partial<HeaderDescriptionImageTwoCardsLayoutData>;
}

const dynamicSlideLayout: React.FC<dynamicSlideLayoutProps> = ({ data: slideData }) => {
    const cards = slideData?.cards || [];
    const decorativeIcons = slideData?.decorativeIcons || [];

    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
            {/* Blue Background Shape */}
            <div className="absolute inset-0 bg-[#1E40AF] [clip-path:polygon(0_0,_100%_0,_100%_29%,_54.6%_29%,_46.8%_100%,_0_100%)] z-10"></div>

            {/* Image */}
            <div className="absolute top-0 left-[45%] w-[55%] h-full z-0">
                <img src={slideData?.mainImage?.__image_url__ || "/static/images/placeholder.jpg"} alt={slideData?.mainImage?.__image_prompt__ || "Business team"} className="w-full h-full object-cover" />
            </div>

            {/* Left Text Content Area */}
            <div className="absolute top-0 left-0 w-[50%] h-full flex flex-col pt-32 pb-16 pl-16 pr-8 text-white z-20">
                <p className="font-sans text-base font-normal mb-2 tracking-wide">{slideData?.category || "COMPANY PROFILE"}</p>
                <h1 className="font-sans text-5xl font-bold mb-4">{slideData?.title || "INTRODUCTION"}</h1>
                <div className="w-24 h-1 bg-white mb-8"></div>
                <p className="font-sans text-lg font-normal leading-relaxed">
                    {slideData?.description || "Presentations are tools that can be used as lectures, speeches, reports, and more. It is mostly presented before an audience. It serves a variety of purposes, making presentations powerful tools for convincing and teaching."}
                </p>
            </div>

            {/* Cards */}
            {cards[0] && (
                <div className="absolute bottom-16 left-20 w-[300px] h-[160px] bg-[#333333] text-white p-6 flex flex-col justify-center z-30">
                    <p className="font-sans text-5xl font-bold mb-2">{cards[0].value}</p>
                    <p className="font-sans text-base font-medium mb-2 uppercase tracking-wide">{cards[0].heading}</p>
                    <p className="font-sans text-sm font-normal leading-tight">{cards[0].text}</p>
                </div>
            )}

            {cards[1] && (
                <div className="absolute bottom-12 left-[400px] w-[300px] h-[160px] bg-[#CCCCCC] text-white p-6 flex flex-col justify-center z-30">
                    <p className="font-sans text-5xl font-bold mb-2">{cards[1].value}</p>
                    <p className="font-sans text-base font-medium mb-2 uppercase tracking-wide">{cards[1].heading}</p>
                    <p className="font-sans text-sm font-normal leading-tight">{cards[1].text}</p>
                </div>
            )}

            {/* Decorative Icons (Top Right) */}
            <div className="absolute top-8 right-8 flex space-x-4 z-40">
                {decorativeIcons.map((icon, index) => (
                    <div key={index} className="w-10 h-10 rounded-full border-2 border-[#1E40AF] flex items-center justify-center text-[#1E40AF] text-lg font-bold">
                        {icon?.__icon_url__ ? (
                            <img src={icon.__icon_url__} alt={icon.__icon_query__ || "Decorative icon"} className="w-6 h-6 object-contain" />
                        ) : (
                            "i" // Fallback for the 'i' if no icon URL is provided
                        )}
                    </div>
                ))}
            </div>

            {/* Small Blue Rectangle (Bottom Right) */}
            <div className="absolute bottom-0 right-24 w-16 h-32 bg-[#1E40AF] z-40"></div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout