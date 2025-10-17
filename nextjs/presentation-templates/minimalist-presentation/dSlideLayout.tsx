import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "brand-title-tags-description-image-slide";
const layoutName = "BrandTitleTagsDescriptionImageLayout";
const layoutDescription = "A slide with a header, a large title, a set of oval tags, a description paragraph, and a large image, with footer details.";

const Schema = z.object({
    headerText: z.string().min(5).max(20).default("CREATIVE BRIEF").meta({
        description: "Header text for the slide. Max 3 words",
    }),
    mainTitle: z.string().min(5).max(15).default("THE BRAND").meta({
        description: "Main title of the slide. Max 3 words",
    }),
    tags: z.array(z.object({
        text: z.string().min(3).max(15).default("PLAYFUL").meta({
            description: "Text for an oval tag. Max 2 words",
        }),
    })).min(1).max(12).default([
        { text: "PLAYFUL" },
        { text: "SOPHISTICATED" },
        { text: "EMPOWERING" },
        { text: "ALLURING" },
        { text: "PASSIONATE" },
        { text: "MODERN" },
        { text: "ELEGANT" },
        { text: "FEMININE" },
    ]).meta({
        description: "A list of brand characteristic tags. Max 12 tags",
    }),
    description: z.string().min(50).max(300).default("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis erat et quam iaculis faucibus at sit amet nibh. Vestibulum dignissim lectus in ligula rhoncus, et bibendum risus dictum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis erat et quam iaculis faucibus at sit amet nibh.").meta({
        description: "Main description paragraph. Max 50 words",
    }),
    mainImage: ImageSchema.default({
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "Close-up of a luxury cosmetic product bottle with a dropper, soft lighting, elegant fabric background",
    }).meta({
        description: "Image representing the brand or product. Max 30 words",
    }),
    pageNumber: z.string().min(1).max(3).default("4").meta({
        description: "Current page number. Max 1 word",
    }),
    date: z.string().min(5).max(20).default("JANUARY 2030").meta({
        description: "Date of the presentation. Max 3 words",
    }),
    presentedBy: z.string().min(5).max(30).default("PRESENTED BY: HARPER RUSSO").meta({
        description: "Name of the presenter. Max 5 words",
    }),
});

type BrandTitleTagsDescriptionImageLayoutData = z.infer<typeof Schema>;

interface BrandTitleTagsDescriptionImageLayoutProps {
    data?: Partial<BrandTitleTagsDescriptionImageLayoutData>;
}

const dynamicSlideLayout: React.FC<BrandTitleTagsDescriptionImageLayoutProps> = ({ data: slideData }) => {
    const headerText = slideData?.headerText ?? "CREATIVE BRIEF";
    const mainTitle = slideData?.mainTitle ?? "THE BRAND";
    const tags = slideData?.tags ?? [
        { text: "PLAYFUL" },
        { text: "SOPHISTICATED" },
        { text: "EMPOWERING" },
        { text: "ALLURING" },
        { text: "PASSIONATE" },
        { text: "MODERN" },
        { text: "ELEGANT" },
        { text: "FEMININE" },
    ];
    const description = slideData?.description ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis erat et quam iaculis faucibus at sit amet nibh. Vestibulum dignissim lectus in ligula rhoncus, et bibendum risus dictum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis erat et quam iaculis faucibus at sit amet nibh.";
    const mainImage = slideData?.mainImage?.__image_url__ ?? "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";
    const mainImagePrompt = slideData?.mainImage?.__image_prompt__ ?? "Close-up of a luxury cosmetic product bottle with a dropper, soft lighting, elegant fabric background";
    const pageNumber = slideData?.pageNumber ?? "4";
    const date = slideData?.date ?? "JANUARY 2030";
    const presentedBy = slideData?.presentedBy ?? "PRESENTED BY: HARPER RUSSO";

    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">

            {/* Header: CREATIVE BRIEF */}
            <div className="absolute top-[39px] right-[40px] text-[14.66px] font-['Montserrat'] font-medium text-[#333333]">
                {headerText}
            </div>

            {/* Main Left Content Area */}
            <div className="absolute left-0 top-0 w-[960px] h-full">
                {/* THE BRAND Title */}
                <h1 className="absolute top-[32px] left-[70px] text-[121.92px] font-['Montserrat'] font-light leading-none text-[#333333] whitespace-nowrap">
                    {mainTitle}
                </h1>

                {/* Oval Buttons Container */}
                <div className="absolute left-[70px] top-[180px] flex flex-wrap gap-x-[15px] gap-y-[15px] max-w-[890px]">
                    {tags.map((tag, index) => (
                        <div key={index} className="flex items-center justify-center py-[26px] px-[25px] border border-black rounded-full text-[19.99px] font-['Montserrat'] text-[#333333] whitespace-nowrap">
                            {tag.text}
                        </div>
                    ))}
                </div>

                {/* Lorem Ipsum Paragraph */}
                <p className="absolute top-[380px] left-[70px] w-[820px] h-[270px] text-[23.99px] font-['Montserrat'] text-[#333333] leading-normal overflow-hidden">
                    {description}
                </p>
            </div>

            {/* Right Side Image */}
            <img
                src={mainImage}
                alt={mainImagePrompt}
                className="absolute right-0 top-0 w-[360px] h-full"
            />

            {/* Footer */}
            <div className="absolute left-[61.33px] bottom-[32px] w-[32px] h-[32px] rounded-full border border-black flex items-center justify-center text-[15.99px] font-['Montserrat'] text-[#333333]">
                {pageNumber}
            </div>
            <div className="absolute left-[111.99px] bottom-[32px] text-[15.99px] font-['Montserrat'] text-[#333333]">
                {date}
            </div>
            <div className="absolute right-[40px] bottom-[32px] text-[15.99px] font-['Montserrat'] text-[#333333]">
                {presentedBy}
            </div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
