import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-two-images-description-slide";
const layoutName = "Header Two Images Description Layout";
const layoutDescription = "A slide featuring a prominent header, two distinct images, a company name, and a descriptive text block.";

const Schema = z.object({
    title: z.string().min(2).max(20).default("BEST PROJECT").meta({
        description: "Main title of the slide. Max 3 words",
    }),
    imageLeft: ImageSchema.default({
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "Fashion model in a pink coat and sunglasses, looking stylish",
    }).meta({
        description: "Image for the left column. Max 30 words",
    }),
    companyName: z.string().min(2).max(25).default("SALFORD & CO.").meta({
        description: "Company or project name. Max 4 words",
    }),
    description: z.string().min(100).max(300).default("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.").meta({
        description: "Descriptive text for the slide. Max 60 words",
    }),
    imageRight: ImageSchema.default({
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "Fashion model in a pink coat and sunglasses, looking stylish",
    }).meta({
        description: "Image for the right column. Max 30 words",
    }),
});

type HeaderTwoImagesDescriptionSlideData = z.infer<typeof Schema>;

interface HeaderTwoImagesDescriptionLayoutProps {
    data?: Partial<HeaderTwoImagesDescriptionSlideData>;
}

const dynamicSlideLayout: React.FC<HeaderTwoImagesDescriptionLayoutProps> = ({ data: slideData }) => {
    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-[#383838] relative z-20 mx-auto overflow-hidden">
            {/* Top Section: BEST PROJECT with distressed background */}
            <div className="relative h-[200px] flex items-center justify-center overflow-hidden">
                {/* Distressed background SVG overlay */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Background color for the top section */}
                    <rect x="0" y="0" width="1280" height="200" fill="#383838" />
                    {/* Simplified abstract shapes to mimic the distressed pink grunge texture */}
                    <path d="M-10 100 C 100 50, 200 150, 300 100 S 500 50, 600 150 S 800 50, 900 150 S 1100 50, 1290 100" stroke="#FF99CC" strokeWidth="20" opacity="0.6" strokeDasharray="20 40" />
                    <path d="M-20 120 C 80 70, 180 170, 280 120 S 480 70, 580 170 S 780 70, 880 170 S 1080 70, 1280 120" stroke="#FF99CC" strokeWidth="15" opacity="0.4" strokeDasharray="10 30" />
                    <rect x="50" y="30" width="80" height="20" fill="#FF99CC" opacity="0.3" transform="rotate(15 50 30)" />
                    <rect x="200" y="150" width="60" height="15" fill="#FF99CC" opacity="0.4" transform="rotate(-10 200 150)" />
                    <rect x="400" y="60" width="100" height="25" fill="#FF99CC" opacity="0.2" transform="rotate(20 400 60)" />
                    <rect x="650" y="10" width="70" height="18" fill="#FF99CC" opacity="0.5" transform="rotate(-5 650 10)" />
                    <rect x="900" y="160" width="90" height="22" fill="#FF99CC" opacity="0.3" transform="rotate(10 900 160)" />
                    <rect x="1100" y="40" width="50" height="12" fill="#FF99CC" opacity="0.4" transform="rotate(25 1100 40)" />
                </svg>
                <h1 className="relative text-7xl md:text-8xl lg:text-9xl font-extrabold text-[#FF99CC] font-sans tracking-wide z-10">
                    {slideData?.title || "BEST PROJECT"}
                </h1>
            </div>

            {/* Main Content Area (flex container for two columns) */}
            <div className="flex h-[calc(100%-200px)]">
                {/* Left Column */}
                <div className="flex flex-col w-1/2 px-10 pb-10 pt-0">
                    {/* Image 1 */}
                    <img
                        src={slideData?.imageLeft?.__image_url__ || ""}
                        alt={slideData?.imageLeft?.__image_prompt__ || slideData?.companyName || "Fashion model"}
                        className="w-[536px] h-[300px] object-cover mt-10 mb-6"
                    />

                    {/* Heading */}
                    <h2 className="text-2xl font-bold text-[#FF99CC] mb-4 font-sans uppercase">
                        {slideData?.companyName || "SALFORD & CO."}
                    </h2>

                    {/* Paragraph text */}
                    <p className="text-base text-[#FF99CC] leading-relaxed font-sans">
                        {slideData?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                    </p>
                </div>

                {/* Right Column (Image 2) */}
                <div className="w-1/2 flex items-start justify-end pr-0 pb-0 pt-0">
                    <img
                        src={slideData?.imageRight?.__image_url__ || ""}
                        alt={slideData?.imageRight?.__image_prompt__ || slideData?.companyName || "Fashion model"}
                        className="w-[536px] h-[520px] object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
