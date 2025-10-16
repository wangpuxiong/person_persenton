import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-image-agenda-footer-slide";
const layoutName = "Header Image Agenda Footer Layout";
const layoutDescription = "A slide with a header, a large image on the left, an agenda list on the right, and a footer with page number and date.";

const Schema = z.object({
    headerText: z.string().min(1).max(20).default("CREATIVE BRIEF").meta({
        description: "Text for the header. Max 3 words",
    }),
    mainImage: ImageSchema.default({
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "Perfume bottles on a table with soft lighting"
    }).meta({
        description: "Main image on the left side of the slide. Max 30 words",
    }),
    agendaTitle: z.string().min(1).max(10).default("AGENDA").meta({
        description: "Title for the agenda section. Max 2 words",
    }),
    agendaItems: z.array(z.object({
        number: z.string().min(1).max(2).default("1").meta({
            description: "Number for the agenda item. Max 1 digit",
        }),
        text: z.string().min(1).max(30).default("The Objective").meta({
            description: "Text for the agenda item. Max 5 words",
        }),
    })).min(1).max(8).default([
        { number: "1", text: "The Objective" },
        { number: "2", text: "The Brand" },
        { number: "3", text: "Target Audience" },
        { number: "4", text: "Visual Inspiration" },
        { number: "5", text: "Brand Messaging" },
        { number: "6", text: "Campaign Timeline" },
        { number: "7", text: "Metrics of Success" },
    ]).meta({
        description: "List of agenda items. Min 1, Max 8 items",
    }),
    pageNumber: z.string().min(1).max(2).default("2").meta({
        description: "Current page number for the footer. Max 1 digit",
    }),
    footerDate: z.string().min(1).max(20).default("JANUARY 2030").meta({
        description: "Date displayed in the footer. Max 3 words",
    }),
    presenterName: z.string().min(1).max(30).default("HARPER RUSSO").meta({
        description: "Name of the presenter in the footer. Max 5 words",
    }),
});

type HeaderImageAgendaFooterLayoutData = z.infer<typeof Schema>;

interface HeaderImageAgendaFooterLayoutProps {
    data?: Partial<HeaderImageAgendaFooterLayoutData>;
}

const dynamicSlideLayout: React.FC<HeaderImageAgendaFooterLayoutProps> = ({ data: slideData }) => {
    const agendaItems = slideData?.agendaItems || [];

    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-[#F8F5F0] relative z-20 mx-auto overflow-hidden font-['Open_Sans']">
            {/* Header */}
            <div className="absolute top-0 left-0 w-full flex justify-end pr-[40px] pt-[40px] z-10">
                <p className="text-[13px] text-neutral-700 tracking-[0.1em] uppercase">
                    {slideData?.headerText || "CREATIVE BRIEF"}
                </p>
            </div>
            <div className="absolute top-[72px] left-0 w-full h-[1px] bg-neutral-300 z-10"></div>

            {/* Main Content Area */}
            <div className="flex h-full pt-[73px] pb-[73px]">
                {/* Left Image Section */}
                <div className="w-[550px] h-full overflow-hidden">
                    <img
                        src={slideData?.mainImage?.__image_url__ || ""}
                        alt={slideData?.mainImage?.__image_prompt__ || slideData?.agendaTitle || "Perfume bottles"}
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Right Agenda Section */}
                <div className="flex-1 flex flex-col pl-[80px] pr-[40px] pt-[64px]">
                    <h2 className="text-[60px] text-neutral-700 font-light leading-none mb-[50px]">
                        {slideData?.agendaTitle || "AGENDA"}
                    </h2>

                    {/* Agenda List */}
                    <div className="flex flex-col">
                        {agendaItems.map((item, index) => (
                            <div key={index} className="flex items-start mb-[20px]">
                                <p className="text-[24px] text-neutral-700 font-light w-[32px] text-right">
                                    {item.number}
                                </p>
                                <p className="text-[24px] text-neutral-700 font-light ml-[32px]">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-[72px] left-0 w-full h-[1px] bg-neutral-300 z-10"></div>
            <div className="absolute bottom-0 left-0 w-full flex justify-between items-center px-[40px] pb-[40px] z-10">
                <div className="flex items-center">
                    <div className="w-[32px] h-[32px] rounded-full border border-neutral-700 flex items-center justify-center">
                        <p className="text-[13px] text-neutral-700 font-semibold">
                            {slideData?.pageNumber || "2"}
                        </p>
                    </div>
                    <p className="text-[13px] text-neutral-700 ml-[12px] uppercase">
                        {slideData?.footerDate || "JANUARY 2030"}
                    </p>
                </div>
                <p className="text-[13px] text-neutral-700 tracking-[0.1em] uppercase">
                    PRESENTED BY: {slideData?.presenterName || "HARPER RUSSO"}
                </p>
            </div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
