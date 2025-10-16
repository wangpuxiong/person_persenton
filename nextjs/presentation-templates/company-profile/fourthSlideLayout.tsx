import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "company-profile-target-market-circles-slide";
const layoutName = "CompanyProfileTargetMarketCirclesLayout";
const layoutDescription = "A slide with a company profile, main title, and three market segment circles with values, titles, and descriptions.";

const Schema = z.object({
    companyProfileText: z.string().min(5).max(20).default("COMPANY PROFILE").meta({
        description: "Text for the company profile section. Max 3 words",
    }),
    mainTitle: z.string().min(5).max(20).default("TARGET MARKET").meta({
        description: "Main title of the slide. Max 3 words",
    }),
    marketSegments: z.array(z.object({
        value: z.string().min(1).max(10).default("50,000").meta({
            description: "Numeric value for the market segment. Max 2 words",
        }),
        title: z.string().min(5).max(30).default("Total Available Market").meta({
            description: "Title for the market segment. Max 5 words",
        }),
        description: z.string().min(50).max(100).default("Presentations are tools that can be used as lectures, speeches, reports, and more.").meta({
            description: "Description for the market segment. Max 20 words",
        }),
    })).min(3).max(3).default([
        {
            value: "50,000",
            title: "Total Available Market",
            description: "Presentations are tools that can be used as lectures, speeches, reports, and more.",
        },
        {
            value: "25,000",
            title: "Served Available Market",
            description: "Presentations are tools that can be used as lectures, speeches, reports, and more.",
        },
        {
            value: "5,000",
            title: "Our Target Market",
            description: "Presentations are tools that can be used as lectures, speeches, reports, and more.",
        },
    ]).meta({
        description: "List of three market segments, each with a value, title, and description.",
    }),
});

type CompanyProfileTargetMarketCirclesLayoutData = z.infer<typeof Schema>;

interface CompanyProfileTargetMarketCirclesLayoutProps {
    data?: Partial<CompanyProfileTargetMarketCirclesLayoutData>;
}

const dynamicSlideLayout: React.FC<CompanyProfileTargetMarketCirclesLayoutProps> = ({ data: slideData }) => {
    const marketSegments = slideData?.marketSegments || [];

    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
            {/* Outer dark blue frame */}
            <div className="absolute inset-0 bg-[#1A478C] p-[64px]">
                {/* White content area */}
                <div className="h-full w-full bg-white flex flex-col items-center pt-16 pb-12 px-16">
                    {/* Top Section: Title and Subtitle */}
                    <div className="text-center mb-12">
                        <p className="font-sans text-sm tracking-widest uppercase text-gray-700 mb-2">{slideData?.companyProfileText || "COMPANY PROFILE"}</p>
                        <h1 className="font-sans text-4xl font-bold uppercase text-gray-900 mb-4">{slideData?.mainTitle || "TARGET MARKET"}</h1>
                        <div className="w-12 h-1 bg-[#1A478C] mx-auto"></div>
                    </div>

                    {/* Middle/Bottom Section: Three columns of circles and text descriptions */}
                    <div className="flex justify-center items-start gap-16 w-full">
                        {marketSegments.map((segment, index) => (
                            <div key={index} className="flex flex-col items-center text-center w-1/3">
                                <div className="w-[180px] h-[180px] rounded-full bg-[#1A478C] border-2 border-gray-300 flex items-center justify-center mb-6">
                                    <p className="font-sans text-4xl font-semibold text-white">{segment.value}</p>
                                </div>
                                <h3 className="font-sans text-xl font-semibold text-gray-900 mb-2">{segment.title}</h3>
                                <p className="font-sans text-sm text-gray-600 leading-relaxed max-w-[240px]">
                                    {segment.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout