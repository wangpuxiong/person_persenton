import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "profile-image-description-slide";
const layoutName = "Profile Image Description Layout";
const layoutDescription = "A slide with a profile image on one side and a name, section title, and description on the other.";

const Schema = z.object({
    name: z.string().min(5).max(50).default("OLIVIA WILSON").meta({
        description: "The name of the person. Max 8 words",
    }),
    sectionTitle: z.string().min(3).max(20).default("ABOUT ME").meta({
        description: "The title for the description section. Max 3 words",
    }),
    description: z.string().min(100).max(250).default("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.").meta({
        description: "A detailed description about the person. Max 50 words",
    }),
    profileImage: ImageSchema.default({
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "Woman on couch"
    }).meta({
        description: "Image of the person. Max 30 words",
    }),
});

type ProfileImageDescriptionSlideData = z.infer<typeof Schema>;

interface ProfileImageDescriptionSlideLayoutProps {
    data?: Partial<ProfileImageDescriptionSlideData>;
}

const dynamicSlideLayout: React.FC<ProfileImageDescriptionSlideLayoutProps> = ({ data: slideData }) => {
    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
            <div className="flex h-full w-full bg-[#3D3D3D]">
                {/* Left Section: Text Content */}
                <div className="w-1/2 flex flex-col justify-center pl-[100px] pr-[60px]">
                    <h1 className="font-['Arial'] text-[96px] font-bold leading-[0.9] text-[#F292B4] uppercase">
                        {slideData?.name || "OLIVIA WILSON"}
                    </h1>

                    <h2 className="font-['Arial'] text-[36px] font-bold text-[#F292B4] uppercase mt-[80px]">
                        {slideData?.sectionTitle || "ABOUT ME"}
                    </h2>
                    <p className="font-['Arial'] text-[20px] text-[#E0E0E0] leading-relaxed mt-[32px] max-w-[480px]">
                        {slideData?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                    </p>
                </div>

                {/* Right Section: Image and Decorative SVG */}
                <div className="w-1/2 relative">
                    {/* Decorative SVG (grunge pattern) */}
                    <div className="absolute top-[100px] left-[60px] w-[180px] h-[180px] z-10">
                        <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 10 L160 170" stroke="#F292B4" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M160 10 L20 170" stroke="#F292B4" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10 50 L100 10" stroke="#F292B4" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M80 170 L170 130" stroke="#F292B4" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M30 100 L120 140" stroke="#F292B4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M110 30 L150 70" stroke="#F292B4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M50 10 L90 50" stroke="#F292B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10 120 L50 160" stroke="#F292B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>

                    {/* Main Image of Woman on Couch */}
                    <img
                        src={slideData?.profileImage?.__image_url__ || ""}
                        alt={slideData?.profileImage?.__image_prompt__ || slideData?.name || "Profile image"}
                        className="absolute right-0 bottom-0 h-[calc(100%+100px)] w-auto object-cover object-bottom"
                        style={{ filter: "drop-shadow(0 25px 25px rgba(0, 0, 0, 0.4))" }}
                    />
                </div>
            </div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
