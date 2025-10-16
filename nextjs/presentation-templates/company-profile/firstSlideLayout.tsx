import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-image-title-description-website-slide";
const layoutName = "HeaderImageTitleDescriptionWebsiteLayout";
const layoutDescription = "A slide with a header image, logo, company name, title, description, and website link.";

const Schema = z.object({
    companyLogo: IconSchema.default({
        __icon_url__: "https://api.iconify.design/ph/infinity-bold.svg", // Placeholder for an abstract logo
        __icon_query__: "abstract logo symbol"
    }).meta({
        description: "Company logo icon. Max 3 words",
    }),
    companyName: z.string().min(5).max(20).default("LARANA INC.").meta({
        description: "Company name. Max 3 words",
    }),
    backgroundImage: ImageSchema.default({
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "Modern buildings with glass facades, corporate architecture"
    }).meta({
        description: "Background image of buildings. Max 20 words",
    }),
    title: z.string().min(5).max(25).default("COMPANY PROFILE").meta({
        description: "Main title of the slide. Max 4 words",
    }),
    description: z.string().min(10).max(150).default("Presentations are tools that can be used as lectures, speeches, reports, and more.").meta({
        description: "Description text. Max 25 words",
    }),
    website: z.string().min(15).max(35).url().default("www.reallygreatsite.com").meta({
        description: "Website URL. Max 3 words",
    }),
});

type HeaderImageTitleDescriptionWebsiteLayoutData = z.infer<typeof Schema>;

interface dynamicSlideLayoutProps {
    data?: Partial<HeaderImageTitleDescriptionWebsiteLayoutData>;
}

const dynamicSlideLayout: React.FC<dynamicSlideLayoutProps> = ({ data: slideData }) => {
    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
            {/* Top Blue Polygon Shape */}
            <div className="absolute top-0 left-0 w-full h-[140px] bg-[#1A458B]" style={{ clipPath: "polygon(0 0, 100% 0, 100% 15.27%, 54.68% 15.27%, 46.87% 19.44%, 0 19.44%)" }}></div>

            {/* Building Image */}
            <img
                src={slideData?.backgroundImage?.__image_url__ || "https://via.placeholder.com/1280x280?text=Modern+Buildings"}
                alt={slideData?.backgroundImage?.__image_prompt__ || "Modern buildings with glass facades"}
                className="absolute top-[110px] left-0 w-full h-[280px] object-cover object-center"
            />

            {/* Logo Box (LARANA INC.) */}
            <div className="absolute top-[20px] left-[80px] w-[200px] h-[200px] bg-[#1A458B] flex flex-col items-center justify-center p-4 z-10">
                <div className="w-[80px] h-[80px] rounded-full bg-white flex items-center justify-center mb-2">
                    <img
                        src={slideData?.companyLogo?.__icon_url__ || "https://api.iconify.design/ph/infinity-bold.svg"}
                        alt={slideData?.companyLogo?.__icon_query__ || "abstract logo symbol"}
                        className="w-[50px] h-[50px] object-contain text-[#1A458B]"
                        style={{ filter: "invert(1) brightness(0.6)" }} // To make the icon appear blue
                    />
                </div>
                <p className="text-white text-base font-bold font-['Arial'] tracking-wider">
                    {slideData?.companyName || "LARANA INC."}
                </p>
            </div>

            {/* Right Vertical Blue Bar with Circles */}
            <div className="absolute top-0 right-0 w-[70px] h-full bg-[#1A458B] flex flex-col items-center pt-[140px] space-y-5">
                <div className="w-[32px] h-[32px] rounded-full bg-white"></div>
                <div className="w-[32px] h-[32px] rounded-full bg-white"></div>
                <div className="w-[32px] h-[32px] rounded-full bg-white"></div>
            </div>

            {/* Main Content Area */}
            <div className="absolute top-[420px] left-[110px] w-[calc(100%-110px-70px)] max-w-[900px]">
                <h1 className="text-[60px] font-bold text-[#333333] mb-4 font-['Arial'] leading-tight">
                    {slideData?.title || "COMPANY PROFILE"}
                </h1>
                <p className="text-2xl text-[#555555] mb-8 font-['Arial'] leading-relaxed">
                    {slideData?.description || "Presentations are tools that can be used as lectures, speeches, reports, and more."}
                </p>
                <div className="flex items-center space-x-4 pr-10">
                    <p className="text-2xl font-bold text-[#333333] font-['Arial']">
                        {slideData?.website || "www.reallygreatsite.com"}
                    </p>
                    <div className="flex-grow border-b-2 border-[#1A458B] h-0"></div>
                </div>
            </div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
