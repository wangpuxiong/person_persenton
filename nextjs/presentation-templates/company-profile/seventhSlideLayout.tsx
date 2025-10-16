import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-description-team-members-slide";
const layoutName = "LeadershipTeamLayout";
const layoutDescription = "A slide with a header, description, and team member cards.";

const Schema = z.object({
    title: z.string().min(5).max(30).default("LEADERSHIP TEAM").meta({
        description: "Main title for the team section. Max 3 words",
    }),
    description: z.string().min(10).max(150).default("Presentations are tools that can be used as lectures, speeches, reports, and more.").meta({
        description: "A brief description or subtitle for the team section. Max 30 words",
    }),
    teamMembers: z.array(z.object({
        name: z.string().min(3).max(25).default("Juliana Silva").meta({
            description: "Name of the team member. Max 3 words",
        }),
        role: z.string().min(3).max(20).default("Marketing").meta({
            description: "Role or position of the team member. Max 3 words",
        }),
        description: z.string().min(10).max(120).default("Presentations are tools that can be used as lectures, speeches, reports, and more.").meta({
            description: "Short description about the team member. Max 25 words",
        }),
        image: ImageSchema.default({
            __image_url__: "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
            __image_prompt__: "Professional headshot of a team member",
        }),
    })).min(1).max(5).default([
        {
            name: "Juliana Silva",
            role: "Marketing",
            description: "Presentations are tools that can be used as lectures, speeches, reports, and more.",
            image: {
                __image_url__: "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
                __image_prompt__: "Professional headshot of Juliana Silva",
            },
        },
        {
            name: "Donna Stroupe",
            role: "Planning",
            description: "Presentations are tools that can be used as lectures, speeches, reports, and more.",
            image: {
                __image_url__: "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
                __image_prompt__: "Professional headshot of Donna Stroupe",
            },
        },
        {
            name: "Margarita Perez",
            role: "Operational",
            description: "Presentations are tools that can be used as lectures, speeches, reports, and more.",
            image: {
                __image_url__: "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
                __image_prompt__: "Professional headshot of Margarita Perez",
            },
        },
        {
            name: "Lars Peeters",
            role: "Sales",
            description: "Presentations are tools that can be used as lectures, speeches, reports, and more.",
            image: {
                __image_url__: "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
                __image_prompt__: "Professional headshot of Lars Peeters",
            },
        },
        {
            name: "Shawn Garcia",
            role: "Finance",
            description: "Presentations are tools that can be used as lectures, speeches, reports, and more.",
            image: {
                __image_url__: "https://images.pexels.com/photos/31527637/pexels-photo-31527637.jpeg",
                __image_prompt__: "Professional headshot of Shawn Garcia",
            },
        },
    ]).meta({
        description: "List of team members, each with a name, role, description, and image. Max 5 members",
    }),
});

type LeadershipTeamLayoutData = z.infer<typeof Schema>;

interface LeadershipTeamLayoutProps {
    data?: Partial<LeadershipTeamLayoutData>;
}

const dynamicSlideLayout: React.FC<LeadershipTeamLayoutProps> = ({ data: slideData }) => {
    const teamMembers = slideData?.teamMembers || [];

    return (
        <div
            className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden"
            style={{
                fontFamily: "Arial, sans-serif"
            }}
        >
            {/* Top Blue Background Section */}
            <div className="absolute top-0 left-0 w-full h-[380px] bg-[#244284]"></div>

            {/* Main Content Wrapper (positioned relatively to allow z-index and proper vertical flow) */}
            <div className="relative z-10 flex flex-col items-center pt-[80px]">
                {/* Title */}
                <h1 className="text-white text-5xl font-bold tracking-wide">
                    {slideData?.title || "LEADERSHIP TEAM"}
                </h1>
                {/* Subtitle */}
                <p className="text-white text-xl font-normal text-center mt-5 max-w-[700px] leading-relaxed">
                    {slideData?.description || "Presentations are tools that can be used as lectures, speeches, reports, and more."}
                </p>

                {/* Team Members Container */}
                <div className="flex justify-center gap-x-8 mt-[102px]">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="flex flex-col items-center text-center w-[200px]">
                            <img
                                src={member.image.__image_url__}
                                alt={member.image.__image_prompt__ || `Team Member ${member.name}`}
                                className="w-[160px] h-[160px] rounded-full border-4 border-white object-cover"
                            />
                            <h3 className="text-[#1A1A1A] text-2xl font-bold mt-5">
                                {member.name}
                            </h3>
                            <p className="text-[#666666] text-lg italic mt-1">
                                {member.role}
                            </p>
                            <p className="text-[#1A1A1A] text-base font-normal mt-4 leading-6">
                                {member.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout