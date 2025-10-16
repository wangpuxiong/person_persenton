import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "image-large-title-education-blocks-slide";
const layoutName = "ImageLargeTitleEducationBlocksLayout";
const layoutDescription = "A slide with a prominent image, a large title, and multiple education blocks with university names and descriptions.";

const Schema = z.object({
    mainImage: ImageSchema.default({
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "Stylish woman in a pink sweater and patterned skirt, wearing light blue sunglasses, with a dark grey background and pink abstract lines."
    }).meta({
        description: "The main image of a person for the slide. Max 30 words",
    }),
    mainTitle: z.string().min(5).max(15).default("EDUCATION").meta({
        description: "Large title text displayed on the slide. Max 1 word",
    }),
    educationBlocks: z.array(z.object({
        universityName: z.string().min(20).max(35).default("INGOUDE UNIVERSITY (2022)").meta({
            description: "Name of the university and year. Max 5 words",
        }),
        description: z.string().min(180).max(220).default("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat").meta({
            description: "Description of the education or achievement. Max 40 words",
        }),
    })).min(1).max(3).default([
        {
            universityName: "INGOUDE UNIVERSITY (2022)",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
        },
        {
            universityName: "BORCELLE UNIVERSITY (2019)",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
        }
    ]).meta({
        description: "A list of education entries, each with a university name and description. Max 3 entries",
    }),
});

type ImageLargeTitleEducationBlocksLayoutData = z.infer<typeof Schema>;

interface ImageLargeTitleEducationBlocksLayoutProps {
    data?: Partial<ImageLargeTitleEducationBlocksLayoutData>;
}

const dynamicSlideLayout: React.FC<ImageLargeTitleEducationBlocksLayoutProps> = ({ data: slideData }) => {
    const educationBlocks = slideData?.educationBlocks || [];

    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-[#333333] relative z-20 mx-auto overflow-hidden">
            {/* Image of the woman */}
            <img
                src={slideData?.mainImage?.__image_url__ || ""}
                alt={slideData?.mainImage?.__image_prompt__ || "Woman in pink sweater"}
                className="absolute left-[90px] bottom-0 h-full w-[427px] object-cover object-bottom z-10"
            />

            {/* Pink Scribble Lines (SVG) - Positioned behind the image */}
            <svg className="absolute left-[400px] top-[0px] w-[350px] h-[350px] z-0" viewBox="0 0 350 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 100 L 150 50 L 100 0" stroke="#FF99CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 50 150 L 200 100 L 150 50" stroke="#FF99CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 100 200 L 250 150 L 200 100" stroke="#FF99CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 150 250 L 300 200 L 250 150" stroke="#FF99CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 200 300 L 350 250 L 300 200" stroke="#FF99CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 25 75 L 125 25" stroke="#FF99CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 75 125 L 175 75" stroke="#FF99CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 125 175 L 225 125" stroke="#FF99CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 175 225 L 275 175" stroke="#FF99CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 225 275 L 325 225" stroke="#FF99CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 0 200 L 100 250 L 50 300" stroke="#FF99CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 50 100 L 150 150 L 100 200" stroke="#FF99CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 200 0 L 100 50" stroke="#FF99CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 150 50 L 50 100" stroke="#FF99CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            {/* "EDUCATION" text */}
            <div className="absolute left-[0] top-[400px] text-[145px] font-extrabold text-[#FF99CC] tracking-tight whitespace-nowrap leading-none z-10">
                {slideData?.mainTitle || "EDUCATION"}
            </div>

            {/* Right content container for education blocks */}
            <div className="absolute left-[800px] top-[64px] w-[400px] flex flex-col space-y-[76px]">
                {educationBlocks.map((block, index) => (
                    <div key={index}>
                        <h3 className="font-bold text-[24px] text-[#FF99CC] whitespace-nowrap">
                            {block.universityName}
                        </h3>
                        <p className="mt-[51px] text-[20px] text-[#D9D9D9] text-justify">
                            {block.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
