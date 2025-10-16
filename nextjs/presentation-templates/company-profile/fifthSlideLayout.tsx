import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "company-profile-competitive-advantage-slide";
const layoutName = "CompanyProfileCompetitiveAdvantageLayout";
const layoutDescription = "A slide with a company profile header, a main title, a description, an image on the left with blue overlays, and a grid of numbered content blocks.";

const Schema = z.object({
    companyProfileText: z.string().min(1).max(20).default("COMPANY PROFILE").meta({
        description: "Header text for company profile. Max 3 words",
    }),
    title: z.string().min(10).max(30).default("COMPETITIVE ADVANTAGE").meta({
        description: "Main title of the slide. Max 5 words",
    }),
    description: z.string().min(100).max(250).default("Presentations are tools that can be used as lectures, speeches, reports, and more. It is mostly presented before an audience.").meta({
        description: "Descriptive text for the slide. Max 45 words",
    }),
    image: ImageSchema.default({
        __image_url__: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        __image_prompt__: "Chess king and fallen chess pieces on a board, strategic advantage concept"
    }).meta({
        description: "Background image for the left section. Max 30 words",
    }),
    items: z.array(z.object({
        number: z.string().min(2).max(2).default("01").meta({
            description: "Sequential number for the item. Max 1 word",
        }),
        heading: z.string().min(5).max(15).default("Efficiency").meta({
            description: "Heading for the item. Max 2 words",
        }),
        itemDescription: z.string().min(50).max(100).default("Presentations are tools that can be used as lectures, speeches, reports, and more.").meta({
            description: "Description for the item. Max 20 words",
        }),
    })).min(2).max(4).default([
        {
            number: "01",
            heading: "Efficiency",
            itemDescription: "Presentations are tools that can be used as lectures, speeches, reports, and more."
        },
        {
            number: "02",
            heading: "Quality",
            itemDescription: "Presentations are tools that can be used as lectures, speeches, reports, and more."
        },
        {
            number: "03",
            heading: "Customer",
            itemDescription: "Presentations are tools that can be used as lectures, speeches, reports, and more."
        },
        {
            number: "04",
            heading: "Innovation",
            itemDescription: "Presentations are tools that can be used as lectures, speeches, reports, and more."
        }
    ]).meta({
        description: "List of numbered content blocks. Max 4 items",
    }),
});

type CompanyProfileCompetitiveAdvantageLayoutData = z.infer<typeof Schema>;

interface CompanyProfileCompetitiveAdvantageLayoutProps {
    data?: Partial<CompanyProfileCompetitiveAdvantageLayoutData>;
}

const dynamicSlideLayout: React.FC<CompanyProfileCompetitiveAdvantageLayoutProps> = ({ data: slideData }) => {
    const items = slideData?.items || [];

    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden font-['Arial']">

            {/* Background Image for Left Section */}
            <img
                src={slideData?.image?.__image_url__ || ""}
                alt={slideData?.image?.__image_prompt__ || "Chess king on a chessboard"}
                className="absolute top-0 left-0 w-[568px] h-full object-cover"
            />

            {/* Left Section - Blue Overlays */}
            <div className="absolute top-0 left-0 w-[660px] h-full z-10">
                {/* Blue L-shape background */}
                {/* Left vertical bar */}
                <div className="absolute top-0 left-0 w-[128px] h-full bg-[#1A428A] opacity-80"></div>
                {/* Top horizontal bar */}
                <div className="absolute top-0 left-0 w-[487px] h-[144px] bg-[#1A428A] opacity-80"></div>

                {/* Small Blue Rectangles */}
                {/* Top-left small rectangle */}
                <div className="absolute top-[48px] left-[48px] w-[152px] h-[96px] bg-[#1A428A] opacity-80"></div>
                {/* Bottom-left small rectangle */}
                <div className="absolute top-[576px] left-0 w-[128px] h-[144px] bg-[#1A428A] opacity-80"></div>
            </div>

            {/* Top Right Blue Rectangle */}
            <div className="absolute top-0 left-[1112px] w-[168px] h-[96px] bg-[#1A428A] z-10 opacity-80"></div>

            {/* Right Section - Content */}
            <div className="absolute top-0 left-[568px] w-[712px] h-full flex flex-col pt-[112px] pb-[60px] pr-[60px] pl-0">
                {/* Header */}
                <h3 className="text-xl font-normal uppercase text-gray-600 mb-1">
                    {slideData?.companyProfileText || "COMPANY PROFILE"}
                </h3>
                {/* Title */}
                <h1 className="text-6xl font-bold uppercase text-gray-900 mb-4 leading-tight">
                    {slideData?.title || "COMPETITIVE\nADVANTAGE"}
                </h1>
                {/* Underline */}
                <div className="w-[184px] h-[4px] bg-[#1A428A] mb-6"></div>
                {/* Description */}
                <p className="text-3xl text-gray-700 leading-relaxed mb-12">
                    {slideData?.description || "Presentations are tools that can be used as lectures, speeches, reports, and more. It is mostly presented before an audience."}
                </p>

                {/* Content Grid */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    {items.map((item, index) => (
                        <div key={index} className="flex flex-col">
                            <div className="flex items-center mb-2">
                                <div className="w-[80px] h-[56px] bg-gray-900 flex items-center justify-center mr-4">
                                    <span className="text-4xl text-white font-bold">{item.number}</span>
                                </div>
                                <h4 className="text-4xl font-bold text-gray-900">{item.heading}</h4>
                            </div>
                            <p className="text-xl text-gray-700 leading-normal">
                                {item.itemDescription}
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