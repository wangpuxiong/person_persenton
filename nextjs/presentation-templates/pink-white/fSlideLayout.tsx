import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "personal-skills-image-description-slide";
const layoutName = "Personal Skills Image Description Layout";
const layoutDescription = "A slide with a large title, a main image, and a list of skills each with a title and description.";

const Schema = z.object({
    mainTitle: z.string().min(5).max(25).default("PERSONAL\nSKILLS").meta({
        description: "Main title of the slide, can be two lines. Max 25 characters, ~4 words",
    }),
    skills: z.array(z.object({
        title: z.string().min(5).max(20).default("PHOTOGRAPHY").meta({
            description: "Title for the skill section. Max 20 characters, ~3 words",
        }),
        description: z.string().min(100).max(350).default("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.").meta({
            description: "Description for the skill. Max 350 characters, ~60 words",
        }),
    })).min(1).max(3).default([
        {
            title: "PHOTOGRAPHY",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
            title: "VIDEOGRAPHY",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
    ]).meta({
        description: "List of personal skills with titles and descriptions. Max 3 skills",
    }),
    mainImage: ImageSchema.default({
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "Stylish woman in pink jacket and sunglasses looking to the left"
    }).meta({
        description: "Image of a stylish woman. Max 30 words",
    }),
});

type PersonalSkillsImageDescriptionSlideData = z.infer<typeof Schema>;

interface PersonalSkillsImageDescriptionSlideLayoutProps {
    data?: Partial<PersonalSkillsImageDescriptionSlideData>;
}

const dynamicSlideLayout: React.FC<PersonalSkillsImageDescriptionSlideLayoutProps> = ({ data: slideData }) => {
    const skills = slideData?.skills || [];

    return (
        <div
            className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-[#262626] z-20 mx-auto overflow-hidden"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
            {/* Main Title: PERSONAL SKILLS */}
            <div className="absolute left-[79.2px] top-[22.7px] w-[1200px] font-['Bebas_Neue'] text-[#FFB8D2] text-[96px] leading-[0.95]">
                {slideData?.mainTitle || "PERSONAL\nSKILLS"}
            </div>

            {/* Skills Sections */}
            {skills.map((skill, index) => (
                <div
                    key={index}
                    className="absolute left-[79.2px] w-[690.8px]"
                    style={{ top: `${200 + index * 251}px` }} // Adjust top for spacing between sections
                >
                    <h2 className="font-['Bebas_Neue'] text-[#FFB8D2] text-[32px] leading-tight">
                        {skill.title}
                    </h2>
                    <p className="font-['Roboto'] text-[#D9D9D9] text-[24px] leading-tight mt-[8px]">
                        {skill.description}
                    </p>
                </div>
            ))}

            {/* Splatter/Brush stroke SVG */}
            <svg className="absolute left-[727.4px] top-0 w-[1073.3px] h-[720px] z-10" viewBox="0 0 1073.3 720" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Main diagonal streak */}
                <path d="M0 200 C 150 150, 400 100, 700 300 C 900 450, 1073 600" stroke="#FFB8D2" strokeWidth="2" strokeDasharray="2 6" />
                {/* Shorter top streak */}
                <path d="M500 0 C 600 50, 750 80, 1073 70" stroke="#FFB8D2" strokeWidth="2" strokeDasharray="2 6" />
                {/* Shorter bottom streak */}
                <path d="M0 500 C 100 550, 300 600, 600 450 C 800 300, 1073 200" stroke="#FFB8D2" strokeWidth="2" strokeDasharray="2 6" />
                {/* Another small streak */}
                <path d="M800 0 C 900 30, 1073 50" stroke="#FFB8D2" strokeWidth="2" strokeDasharray="2 6" />
            </svg>

            {/* Image of the woman */}
            <img
                src={slideData?.mainImage?.__image_url__ || ""}
                alt={slideData?.mainImage?.__image_prompt__ || "Stylish woman"}
                className="absolute top-0 left-[851.6px] w-[936.8px] h-[720px] object-cover z-20"
            />
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
