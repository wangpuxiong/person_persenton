import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-title-metrics-grid-image-footer-slide";
const layoutName = "HeaderTitleMetricsGridImageFooterLayout";
const layoutDescription = "A slide with a header, a main title, a grid of metric cards, an image, and a footer.";

const Schema = z.object({
    headerText: z.string().min(5).max(20).default("CREATIVE BRIEF").meta({
        description: "Text for the top right header. Max 3 words",
    }),
    mainTitle: z.string().min(10).max(30).default("METRICS OF SUCCESS").meta({
        description: "Main title of the slide. Max 5 words",
    }),
    metrics: z.array(z.object({
        metricTitle: z.string().min(10).max(30).default("20% INCREASE IN SALES").meta({
            description: "Title for a metric block. Max 6 words",
        }),
        metricDescription: z.string().min(100).max(300).default("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis erat et quam iaculis faucibus at sit amet nibh. Vestibulum dignissim lectus in ligula rhoncus, et bibendum risus dictum.").meta({
            description: "Description for a metric block. Max 50 words",
        }),
    })).min(2).max(4).default([
        {
            metricTitle: "20% INCREASE IN SALES",
            metricDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis erat et quam iaculis faucibus at sit amet nibh. Vestibulum dignissim lectus in ligula rhoncus, et bibendum risus dictum.",
        },
        {
            metricTitle: "30% INCREASE IN WEBSITE TRAFFIC",
            metricDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis erat et quam iaculis faucibus at sit amet nibh. Vestibulum dignissim lectus in ligula rhoncus, et bibendum risus dictum.",
        },
        {
            metricTitle: "POSITIVE COMMUNITY FEEDBACK",
            metricDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis erat et quam iaculis faucibus at sit amet nibh. Vestibulum dignissim lectus in ligula rhoncus, et bibendum risus dictum.",
        },
        {
            metricTitle: "GROWTH OF SOCIAL MEDIA FOLLOWING",
            metricDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis erat et quam iaculis faucibus at sit amet nibh. Vestibulum dignissim lectus in ligula rhoncus, et bibendum risus dictum.",
        },
    ]).meta({
        description: "List of metric cards, each with a title and description. Min 2, Max 4 cards",
    }),
    productImage: ImageSchema.default({
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "Product image of a small bottle with liquid",
    }).meta({
        description: "Image for the right side of the slide. Max 30 words",
    }),
    pageNumber: z.string().min(1).max(3).default("9").meta({
        description: "Page number in the footer. Max 3 characters",
    }),
    dateText: z.string().min(5).max(20).default("JANUARY 2030").meta({
        description: "Date text in the footer. Max 3 words",
    }),
    presenterText: z.string().min(10).max(30).default("PRESENTED BY: HARPER RUSSO").meta({
        description: "Presenter text in the footer. Max 6 words",
    }),
});

type HeaderTitleMetricsGridImageFooterLayoutProps = z.infer<typeof Schema>;

interface dynamicSlideLayoutProps {
    data?: Partial<HeaderTitleMetricsGridImageFooterLayoutProps>;
}

const dynamicSlideLayout: React.FC<dynamicSlideLayoutProps> = ({ data: slideData }) => {
    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-[#FBFBF5] relative z-20 mx-auto overflow-hidden">
            {/* Header: Creative Brief */}
            <div className="absolute top-[12px] right-[11px] w-[118px] h-[29px] flex items-center justify-center text-[12px] font-['Montserrat'] text-[#333333]">
                {slideData?.headerText || "CREATIVE BRIEF"}
            </div>
            <div className="absolute top-[48px] left-[64px] w-[854px] h-[1px] bg-[#E5E5E5]"></div>

            {/* Main Title Section */}
            <div className="absolute top-[64px] left-[64px] w-[854px] h-[1px] bg-[#E5E5E5]"></div>
            <h1 className="absolute top-[96px] left-[64px] w-[854px] h-[84px] text-center text-[56px] font-['Montserrat'] text-[#333333] leading-tight">
                {slideData?.mainTitle || "METRICS OF SUCCESS"}
            </h1>
            <div className="absolute top-[200px] left-[64px] w-[854px] h-[1px] bg-[#E5E5E5]"></div>

            {/* Main Content Area (Left side - Grid of 4 blocks) */}
            <div className="absolute top-[240px] left-[64px] w-[640px] grid grid-cols-2 gap-x-[32px] gap-y-[32px]">
                {(slideData?.metrics || []).map((metric, index) => (
                    <div key={index} className="flex flex-col">
                        <div className="w-[320px] h-[68px] border border-[#BDBDBD] rounded-full flex items-center justify-center text-[16px] font-['Montserrat'] text-[#333333]">
                            {metric.metricTitle}
                        </div>
                        <p className="mt-[16px] w-[320px] h-[110px] text-[14px] font-['Montserrat'] text-[#333333] leading-[1.4]">
                            {metric.metricDescription}
                        </p>
                    </div>
                ))}
            </div>

            {/* Image Area (Right side) */}
            <img
                src={slideData?.productImage?.__image_url__ || "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"}
                alt={slideData?.productImage?.__image_prompt__ || "Product image"}
                className="absolute top-[240px] right-4 w-[426px] h-[416px] object-cover"
            />

            {/* Footer */}
            <div className="absolute bottom-[24px] left-[64px] w-[52px] h-[52px] border border-[#BDBDBD] rounded-full flex items-center justify-center text-[16px] font-['Montserrat'] text-[#333333]">
                {slideData?.pageNumber || "9"}
            </div>
            <div className="absolute bottom-[38px] left-[126px] text-[16px] font-['Montserrat'] text-[#333333]">
                {slideData?.dateText || "JANUARY 2030"}
            </div>
            <div className="absolute bottom-[38px] right-[46px] text-[16px] font-['Montserrat'] text-[#333333]">
                {slideData?.presenterText || "PRESENTED BY: HARPER RUSSO"}
            </div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
