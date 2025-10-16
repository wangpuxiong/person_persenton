import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-image-timeline-slide";
const layoutName = "CampaignTimelineLayout";
const layoutDescription = "A slide with a header, an image on the left, a vertical timeline with date ranges and activities on the right, and a footer.";

const Schema = z.object({
    headerText: z.string().min(5).max(20).default("CREATIVE BRIEF").meta({
        description: "Header text at the top right. Max 3 words.",
    }),
    title: z.string().min(5).max(30).default("CAMPAIGN TIMELINE").meta({
        description: "Main title of the slide. Max 5 words.",
    }),
    mainImage: ImageSchema.default({
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "Abstract image with nets and a bottle, neutral tones"
    }).meta({
        description: "Main image on the left side of the slide. Max 30 words.",
    }),
    timelineItems: z.array(z.object({
        dateRange: z.string().min(5).max(25).default("JANUARY 2030").meta({
            description: "Date or date range for the timeline item. Max 4 words.",
        }),
        activity: z.string().min(5).max(35).default("Campaign Planning").meta({
            description: "Description of the activity for the timeline item. Max 5 words.",
        }),
    })).min(3).max(6).default([
        { dateRange: "JANUARY 2030", activity: "Campaign Planning" },
        { dateRange: "JANUARY - MARCH 2030", activity: "Creative Development" },
        { dateRange: "FEBRUARY 2030", activity: "Influencer Outreach" },
        { dateRange: "APRIL 2030", activity: "Campaign Launch" },
        { dateRange: "MAY - JULY 2030", activity: "Execution and Optimization" },
        { dateRange: "SEPTEMBER 2030", activity: "Final Analysis and Reporting" },
    ]).meta({
        description: "List of timeline entries, each with a date range and an activity. Min 3, Max 6 items.",
    }),
    pageNumber: z.number().min(1).max(99).default(8).meta({
        description: "Page number displayed in the footer. Max 2 digits.",
    }),
    footerDate: z.string().min(5).max(20).default("JANUARY 2030").meta({
        description: "Date displayed in the footer. Max 3 words.",
    }),
    presentedBy: z.string().min(5).max(35).default("PRESENTED BY: HARPER RUSSO").meta({
        description: "Name of the presenter in the footer. Max 5 words.",
    }),
});

type CampaignTimelineLayoutData = z.infer<typeof Schema>;

interface CampaignTimelineLayoutProps {
    data?: Partial<CampaignTimelineLayoutData>;
}

const dynamicSlideLayout: React.FC<CampaignTimelineLayoutProps> = ({ data: slideData }) => {
    const timelineItems = slideData?.timelineItems || [];

    return (
        <div
            className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden"
            style={{ fontFamily: "Poppins, sans-serif" }}
        >
            {/* Header Section */}
            <div className="relative h-[180px]">
                <div className="absolute top-[12px] right-[80px] text-base font-light text-black tracking-wider">
                    {slideData?.headerText || "CREATIVE BRIEF"}
                </div>
                <div className="absolute top-[48px] left-0 right-0 h-px bg-black"></div>
                <div className="absolute top-[64px] left-0 right-0 text-center text-[64px] font-light text-black tracking-tight">
                    {slideData?.title || "CAMPAIGN TIMELINE"}
                </div>
            </div>

            {/* Main Content Section */}
            <div className="flex h-[426.6px]">
                {/* Left Image Column */}
                <div className="w-[640px] h-full overflow-hidden">
                    <img
                        src={slideData?.mainImage?.__image_url__ || ""}
                        alt={slideData?.mainImage?.__image_prompt__ || slideData?.title || ""}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Timeline Column */}
                <div className="flex-1 px-16 py-7 flex flex-col justify-between">
                    <div className="grid grid-cols-[213px_70px_1fr] gap-y-3 items-center">
                        {timelineItems.map((item, index) => (
                            <React.Fragment key={index}>
                                <div className="flex items-center justify-center w-[213px] h-14 border border-black rounded-full text-lg font-light text-black">
                                    {item?.dateRange}
                                </div>
                                <div className="relative h-full flex items-center justify-center">
                                    <div className="absolute w-full h-px bg-black"></div>
                                    <div className="absolute right-0 w-2 h-2 rounded-full bg-black"></div>
                                </div>
                                <div className="text-xl font-light text-black pl-4">
                                    {item.activity}
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <div className="absolute bottom-0 left-0 right-0 h-[73px]">
                <div className="absolute top-0 left-0 right-0 h-px bg-black"></div>
                <div className="absolute bottom-[24px] left-[38px] flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center text-xl font-light text-black">
                        {slideData?.pageNumber || 8}
                    </div>
                    <div className="text-base font-light text-black">
                        {slideData?.footerDate || "JANUARY 2030"}
                    </div>
                </div>
                <div className="absolute bottom-[24px] right-[80px] text-base font-light text-black tracking-wider">
                    {slideData?.presentedBy || "PRESENTED BY: HARPER RUSSO"}
                </div>
            </div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
