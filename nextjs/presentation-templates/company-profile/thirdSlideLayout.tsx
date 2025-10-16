import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "mission-vision-image-split-slide";
const layoutName = "MissionVisionImageSplitLayout";
const layoutDescription = "A slide with a top image and a split bottom section for two distinct content blocks.";

const Schema = z.object({
    image: ImageSchema.default({
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "A human hand arranging white dice to spell out 'MISSION' and 'VISION' on a reflective surface.",
    }).meta({
        description: "The main image for the slide. Max 30 words for prompt.",
    }),
    missionHeading: z.string().min(1).max(20).default("OUR MISSION").meta({
        description: "Heading for the mission section. Max 4 words",
    }),
    missionDescription: z.string().min(20).max(300).default("Presentations are tools that can be used as lectures, speeches, reports, and more. It is mostly presented before an audience.").meta({
        description: "Description for the mission section. Max 60 words",
    }),
    visionHeading: z.string().min(1).max(20).default("OUR VISION").meta({
        description: "Heading for the vision section. Max 4 words",
    }),
    visionDescription: z.string().min(20).max(300).default("Presentations are tools that can be used as lectures, speeches, reports, and more. It is mostly presented before an audience.").meta({
        description: "Description for the vision section. Max 60 words",
    }),
});

type MissionVisionImageSplitLayoutData = z.infer<typeof Schema>;

interface MissionVisionImageSplitLayoutProps {
    data?: Partial<MissionVisionImageSplitLayoutData>;
}

const dynamicSlideLayout: React.FC<MissionVisionImageSplitLayoutProps> = ({ data: slideData }) => {
    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
            {/* Top Section: Image with Blue Background */}
            <div className="relative h-[420px] w-full overflow-hidden">
                {/* Blue background shape. */}
                <div className="absolute top-0 left-0 w-full h-[252px] bg-[#1b438d]"></div>
                
                {/* Main Image. */}
	      <img 
                    src={slideData?.image?.__image_url__ || ""}
                    alt={slideData?.image?.__image_prompt__ || ""}
                    className="absolute top-[126px] left-[126px] w-[1144px] h-[457px] object-cover"
                />
            </div>

            {/* Bottom Section: Mission & Vision Content */}
            <div className="flex h-[300px] pt-10">
                {/* Mission Column */}
                <div className="w-1/2 flex flex-col items-center justify-start px-10 border-r border-gray-300">
                    <h2 className="text-center font-bold text-[48px] text-gray-800 font-sans leading-tight mb-4">
                        {slideData?.missionHeading || "OUR MISSION"}
                    </h2>
                    <p className="text-center text-[24px] text-gray-700 font-sans leading-normal">
                        {slideData?.missionDescription || "Presentations are tools that can be used as lectures, speeches, reports, and more. It is mostly presented before an audience."}
                    </p>
                </div>

                {/* Vision Column */}
                <div className="w-1/2 flex flex-col items-center justify-start px-10">
                    <h2 className="text-center font-bold text-[48px] text-gray-800 font-sans leading-tight mb-4">
                        {slideData?.visionHeading || "OUR VISION"}
                    </h2>
                    <p className="text-center text-[24px] text-gray-700 font-sans leading-normal">
                        {slideData?.visionDescription || "Presentations are tools that can be used as lectures, speeches, reports, and more. It is mostly presented before an audience."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout