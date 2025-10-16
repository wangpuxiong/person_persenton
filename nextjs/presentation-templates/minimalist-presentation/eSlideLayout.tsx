import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-title-audience-segmentation-slide";
const layoutName = "HeaderTitleAudienceSegmentationLayout";
const layoutDescription = "A slide with a header, title, and three columns for audience segmentation details including gender, income, psychographics, and behaviours, along with age and location details.";

const Schema = z.object({
    headerText: z.string().min(1).max(20).default("CREATIVE BRIEF").meta({
        description: "Header text for the slide. Max 3 words",
    }),
    title: z.string().min(1).max(20).default("TARGET AUDIENCE").meta({
        description: "Main title of the slide. Max 3 words",
    }),
    gender: z.object({
        femaleActiveCount: z.number().min(0).max(10).default(9).meta({
            description: "Number of active female icons (out of 10 total).",
        }),
        maleActiveCount: z.number().min(0).max(10).default(2).meta({
            description: "Number of active male icons (out of 10 total).",
        }),
    }).default({
        femaleActiveCount: 9,
        maleActiveCount: 2,
    }),
    income: z.object({
        activeDollarCount: z.number().min(0).max(7).default(5).meta({
            description: "Number of active dollar icons (out of 7 total).",
        }),
    }).default({
        activeDollarCount: 5,
    }),
    psychographics: z.array(z.string().min(30).max(200)).min(2).max(2).default([
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis erat et quam iaculis faucibus at sit amet nibh. Vestibulum dignissim lectus in ligula rhoncus, et bibendum risus dictum.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis erat et quam iaculis faucibus at sit amet nibh. Vestibulum dignissim lectus in ligula rhoncus, et bibendum risus dictum."
    ]).meta({
        description: "Two paragraphs describing psychographics. Each max 40 words",
    }),
    behaviours: z.array(z.string().min(30).max(200)).min(2).max(2).default([
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis erat et quam iaculis faucibus at sit amet nibh. Vestibulum dignissim lectus in ligula rhoncus, et bibendum risus dictum.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis erat et quam iaculis faucibus at sit amet nibh. Vestibulum dignissim lectus in ligula rhoncus, et bibendum risus dictum."
    ]).meta({
        description: "Two paragraphs describing behaviours. Each max 40 words",
    }),
    ageRange: z.string().min(1).max(15).default("AGE: 18-45").meta({
        description: "Age range for the audience. Max 3 words",
    }),
    location: z.string().min(1).max(20).default("LOCATION: WORLDWIDE").meta({
        description: "Location for the audience. Max 3 words",
    }),
    pageNumber: z.number().min(1).max(999).default(5).meta({
        description: "Page number.",
    }),
    date: z.string().min(1).max(20).default("JANUARY 2030").meta({
        description: "Date of the presentation. Max 3 words",
    }),
    presenter: z.string().min(1).max(30).default("PRESENTED BY: HARPER RUSSO").meta({
        description: "Name of the presenter. Max 5 words",
    }),
});

type HeaderTitleAudienceSegmentationLayoutData = z.infer<typeof Schema>;

interface HeaderTitleAudienceSegmentationLayoutProps {
    data?: Partial<HeaderTitleAudienceSegmentationLayoutData>;
}

const dynamicSlideLayout: React.FC<HeaderTitleAudienceSegmentationLayoutProps> = ({ data: slideData }) => {
    const headerText = slideData?.headerText ?? "CREATIVE BRIEF";
    const title = slideData?.title ?? "TARGET AUDIENCE";
    const femaleActiveCount = slideData?.gender?.femaleActiveCount ?? 9;
    const maleActiveCount = slideData?.gender?.maleActiveCount ?? 2;
    const activeDollarCount = slideData?.income?.activeDollarCount ?? 5;
    const psychographics = slideData?.psychographics ?? [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis erat et quam iaculis faucibus at sit amet nibh. Vestibulum dignissim lectus in ligula rhoncus, et bibendum risus dictum.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis erat et quam iaculis faucibus at sit amet nibh. Vestibulum dignissim lectus in ligula rhoncus, et bibendum risus dictum."
    ];
    const behaviours = slideData?.behaviours ?? [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis erat et quam iaculis faucibus at sit amet nibh. Vestibulum dignissim lectus in ligula rhoncus, et bibendum risus dictum.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis erat et quam iaculis faucibus at sit amet nibh. Vestibulum dignissim lectus in ligula rhoncus, et bibendum risus dictum."
    ];
    const ageRange = slideData?.ageRange ?? "AGE: 18-45";
    const location = slideData?.location ?? "LOCATION: WORLDWIDE";
    const pageNumber = slideData?.pageNumber ?? 5;
    const date = slideData?.date ?? "JANUARY 2030";
    const presenter = slideData?.presenter ?? "PRESENTED BY: HARPER RUSSO";

    const renderFemaleIcon = (index: number) => (
        <svg key={`female-${index}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={index < femaleActiveCount ? "text-neutral-800" : "text-neutral-500"}>
            <circle cx="12" cy="5" r="3.5" fill="currentColor"/>
            <path d="M12 8.5V16L8 20M12 16L16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );

    const renderMaleIcon = (index: number) => (
        <svg key={`male-${index}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={index < maleActiveCount ? "text-neutral-800" : "text-neutral-500"}>
            <circle cx="12" cy="5" r="3.5" fill="currentColor"/>
            <path d="M12 8.5V20M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );

    const renderDollarIcon = (index: number) => (
        <div key={`dollar-${index}`} className={`w-[40px] h-[40px] rounded-full flex items-center justify-center ${index < activeDollarCount ? "bg-neutral-800" : "bg-neutral-500"}`}>
            <span className="text-white text-[20px] font-semibold">$</span>
        </div>
    );

    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-[#F8F5EE] relative z-20 mx-auto overflow-hidden font-['Inter']">
            {/* Header */}
            <div className="absolute top-[24px] right-[83px] text-neutral-800 text-[12pt] font-normal leading-tight tracking-wide">{headerText}</div>
            <div className="absolute w-[1128px] h-[1px] bg-neutral-300 left-[76px] top-[64px]"></div>

            {/* Title */}
            <div className="absolute top-[100px] left-1/2 -translate-x-1/2 text-neutral-800 text-[48pt] font-normal leading-tight tracking-tight">{title}</div>
            <div className="absolute w-[1128px] h-[1px] bg-neutral-300 left-[76px] top-[200px]"></div>

            {/* Main Content Grid */}
            <div className="absolute top-[240px] left-[76px] flex justify-between gap-[40px] w-[1084px]">
                {/* Column 1: Gender & Income */}
                <div className="flex flex-col items-center w-[356px]">
                    <div className="w-full h-[40px] border border-neutral-400 rounded-full flex items-center justify-center mb-[20px]">
                        <span className="text-neutral-800 text-[10pt] font-normal leading-tight tracking-wide">GENDER</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-[10px] gap-y-[10px] mb-[30px]">
                        {Array.from({ length: 10 }).map((_, i) => renderFemaleIcon(i))}
                        {Array.from({ length: 10 }).map((_, i) => renderMaleIcon(i))}
                    </div>
                    
                    <div className="w-full h-[40px] border border-neutral-400 rounded-full flex items-center justify-center mb-[20px]">
                        <span className="text-neutral-800 text-[10pt] font-normal leading-tight tracking-wide">INCOME</span>
                    </div>
                    <div className="flex justify-center gap-x-[10px] items-center">
                        {Array.from({ length: 7 }).map((_, i) => renderDollarIcon(i))}
                    </div>
                </div>

                {/* Column 2: Psychographics */}
                <div className="flex flex-col w-[356px]">
                    <div className="w-full h-[40px] border border-neutral-400 rounded-full flex items-center justify-center mb-[20px]">
                        <span className="text-neutral-800 text-[10pt] font-normal leading-tight tracking-wide">PSYCHOGRAPHICS</span>
                    </div>
                    {psychographics.map((text, index) => (
                        <div key={`psycho-${index}`} className={`text-neutral-800 text-[9pt] font-normal leading-[1.3] ${index === 0 ? "mb-[20px]" : ""}`}>
                            {text}
                        </div>
                    ))}
                </div>

                {/* Column 3: Behaviours */}
                <div className="flex flex-col w-[356px]">
                    <div className="w-full h-[40px] border border-neutral-400 rounded-full flex items-center justify-center mb-[20px]">
                        <span className="text-neutral-800 text-[10pt] font-normal leading-tight tracking-wide">BEHAVIOURS</span>
                    </div>
                    {behaviours.map((text, index) => (
                        <div key={`behav-${index}`} className={`text-neutral-800 text-[9pt] font-normal leading-[1.3] ${index === 0 ? "mb-[20px]" : ""}`}>
                            {text}
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Row */}
            <div className="absolute bottom-[130px] left-[76px] flex justify-center gap-[30px] w-[1184px]">
                <div className="w-[356px] h-[40px] border border-neutral-400 rounded-full flex items-center justify-center">
                    <span className="text-neutral-800 text-[10pt] font-normal leading-tight tracking-wide">{ageRange}</span>
                </div>
                <div className="w-[356px] h-[40px] border border-neutral-400 rounded-full flex items-center justify-center">
                    <span className="text-neutral-800 text-[10pt] font-normal leading-tight tracking-wide">{location}</span>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute w-[1128px] h-[1px] bg-neutral-300 left-[76px] bottom-[78px]"></div>
            <div className="absolute bottom-[30px] left-[76px] flex items-center gap-[10px]">
                <div className="w-[28px] h-[28px] rounded-full border border-neutral-400 flex items-center justify-center">
                    <span className="text-neutral-800 text-[10.5pt] font-normal">{pageNumber}</span>
                </div>
                <span className="text-neutral-800 text-[10.5pt] font-normal leading-tight tracking-wide">{date}</span>
            </div>
            <div className="absolute bottom-[30px] right-[19px] text-neutral-800 text-[10.5pt] font-normal leading-tight tracking-wide">{presenter}</div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
