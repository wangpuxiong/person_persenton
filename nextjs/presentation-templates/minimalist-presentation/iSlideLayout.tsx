import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "contact-information-image-list-slide";
const layoutName = "ContactInformationImageListLayout";
const layoutDescription = "A slide with a header, a main title, a prominent image, and a list of contact cards with names, roles, and email addresses, along with a footer.";

const Schema = z.object({
    headerText: z.string().min(5).max(20).default("CREATIVE BRIEF").meta({
        description: "Header text. Max 3 words",
    }),
    mainTitle: z.string().min(15).max(30).default("FOR MORE INFORMATION").meta({
        description: "Main title of the slide. Max 5 words",
    }),
    mainImage: ImageSchema.default({
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "Abstract ribbed glass texture with a silhouette",
    }).meta({
        description: "Prominent image for the slide. Max 15 words",
    }),
    contactPersons: z.array(z.object({
        name: z.string().min(8).max(20).default("Harper Russo").meta({
            description: "Contact person's name. Max 4 words",
        }),
        role: z.string().min(10).max(25).default("CREATIVE DIRECTOR").meta({
            description: "Contact person's role. Max 4 words",
        }),
        email: z.string().min(10).max(30).default("hello@reallygreatsite.com").meta({
            description: "Contact person's email address. Max 1 word",
        }),
        emailIcon: IconSchema.default({
            __icon_url__: "https://api.iconify.design/heroicons-outline/envelope.svg",
            __icon_query__: "email envelope icon",
        }).meta({
            description: "Icon for email address",
        }),
    })).min(1).max(4).default([
        {
            name: "Harper Russo",
            role: "CREATIVE DIRECTOR",
            email: "hello@reallygreatsite.com",
            emailIcon: {
                __icon_url__: "https://api.iconify.design/heroicons-outline/envelope.svg",
                __icon_query__: "email envelope icon",
            },
        },
        {
            name: "Howard Ong",
            role: "MARKETING MANAGER",
            email: "hello@reallygreatsite.com",
            emailIcon: {
                __icon_url__: "https://api.iconify.design/heroicons-outline/envelope.svg",
                __icon_query__: "email envelope icon",
            },
        },
        {
            name: "Samira Hadid",
            role: "LEAD GRAPHIC DESIGNER",
            email: "hello@reallygreatsite.com",
            emailIcon: {
                __icon_url__: "https://api.iconify.design/heroicons-outline/envelope.svg",
                __icon_query__: "email envelope icon",
            },
        },
    ]).meta({
        description: "List of contact persons with their details. Max 4 persons",
    }),
    pageNumber: z.number().min(1).max(999).default(10).meta({
        description: "Page number for the slide. Max 3 digits",
    }),
    date: z.string().min(10).max(15).default("JANUARY 2030").meta({
        description: "Date displayed in the footer. Max 3 words",
    }),
    presentedBy: z.string().min(20).max(35).default("PRESENTED BY: HARPER RUSSO").meta({
        description: "Text indicating who presented the slide. Max 6 words",
    }),
});

type ContactInformationImageListLayoutData = z.infer<typeof Schema>;

interface ContactInformationImageListLayoutProps {
    data?: Partial<ContactInformationImageListLayoutData>;
}

const dynamicSlideLayout: React.FC<ContactInformationImageListLayoutProps> = ({ data: slideData }) => {
    const defaultIconSvg = `<svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="#4B5563" stroke-width="1.5"/><path d="M7 9L12 12.5L17 9" stroke="#4B5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 15H17" stroke="#4B5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden font-sans">
            {/* Header Section */}
            <div className="absolute top-[12px] right-[60px] text-xs font-sans text-gray-700 uppercase tracking-widest">
                {slideData?.headerText || "CREATIVE BRIEF"}
            </div>
            <div className="absolute top-[36px] left-[60px] right-[60px] border-b border-gray-300"></div>

            {/* Main Title Section */}
            <div className="mt-[64px] text-center">
                <h1 className="text-6xl font-light text-gray-800 tracking-wide leading-tight">
                    {slideData?.mainTitle || "FOR MORE INFORMATION"}
                </h1>
            </div>
            <div className="mt-[24px] mx-[60px] border-b border-gray-300"></div>

            {/* Main Content Area */}
            <div className="flex mt-[40px] mx-[60px] h-[440px]">
                {/* Left Image Section */}
                <div className="w-[65%] h-full overflow-hidden">
                    <img
                        src={slideData?.mainImage?.__image_url__ || ""}
                        alt={slideData?.mainImage?.__image_prompt__ || slideData?.mainTitle || "Abstract ribbed glass texture with a silhouette"}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Contact Details Section */}
                <div className="w-[35%] pl-[60px] flex flex-col justify-center space-y-8">
                    {slideData?.contactPersons?.map((person, index) => (
                        <div key={index}>
                            <h3 className="text-xl font-medium text-gray-800">{person.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{person.role}</p>
                            <div className="flex items-center text-sm text-gray-700 mt-2">
                                {person.emailIcon?.__icon_url__ ? (
                                    <img src={person.emailIcon.__icon_url__} alt={person.emailIcon.__icon_query__ || "Email icon"} className="w-4 h-4 mr-2" />
                                ) : (
                                    <div dangerouslySetInnerHTML={{ __html: defaultIconSvg }} />
                                )}
                                <span>{person.email}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Section */}
            <div className="absolute bottom-[40px] left-[60px] right-[60px] flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-sm font-sans text-gray-700">
                        {slideData?.pageNumber || 10}
                    </div>
                    <p className="text-sm font-sans text-gray-700 uppercase">
                        {slideData?.date || "JANUARY 2030"}
                    </p>
                </div>
                <p className="text-sm font-sans text-gray-700 uppercase tracking-wide">
                    {slideData?.presentedBy || "PRESENTED BY: HARPER RUSSO"}
                </p>
            </div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
