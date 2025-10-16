import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "company-contact-info-slide";
const layoutName = "Company Contact Info Layout";
const layoutDescription = "A slide featuring a company logo, name, social media, and contact information.";

const Schema = z.object({
    companyLogo: IconSchema.default({
        __icon_url__: `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(50,50) scale(0.8)">
                <path d="M0 -40 Q 20 -30 40 0" stroke="white" strokeWidth="6" strokeLinecap="round"/>
                <path d="M0 -30 Q 15 -25 30 0" stroke="white" strokeWidth="6" strokeLinecap="round"/>
                <path d="M0 -20 Q 10 -20 20 0" stroke="white" strokeWidth="6" strokeLinecap="round"/>
                <g transform="rotate(90)">
                    <path d="M0 -40 Q 20 -30 40 0" stroke="white" strokeWidth="6" strokeLinecap="round"/>
                    <path d="M0 -30 Q 15 -25 30 0" stroke="white" strokeWidth="6" strokeLinecap="round"/>
                    <path d="M0 -20 Q 10 -20 20 0" stroke="white" strokeWidth="6" strokeLinecap="round"/>
                </g>
                <g transform="rotate(180)">
                    <path d="M0 -40 Q 20 -30 40 0" stroke="white" strokeWidth="6" strokeLinecap="round"/>
                    <path d="M0 -30 Q 15 -25 30 0" stroke="white" strokeWidth="6" strokeLinecap="round"/>
                    <path d="M0 -20 Q 10 -20 20 0" stroke="white" strokeWidth="6" strokeLinecap="round"/>
                </g>
                <g transform="rotate(270)">
                    <path d="M0 -40 Q 20 -30 40 0" stroke="white" strokeWidth="6" strokeLinecap="round"/>
                    <path d="M0 -30 Q 15 -25 30 0" stroke="white" strokeWidth="6" strokeLinecap="round"/>
                    <path d="M0 -20 Q 10 -20 20 0" stroke="white" strokeWidth="6" strokeLinecap="round"/>
                </g>
            </g>
        </svg>`,
        __icon_query__: "Abstract company logo"
    }).meta({
        description: "The company logo, can be an SVG string or icon URL. Max 10 words",
    }),
    companyName: z.string().min(1).max(25).default("LARANA INC.").meta({
        description: "The name of the company. Max 5 words",
    }),
    socialMediaTitle: z.string().min(5).max(20).default("Social Media").meta({
        description: "Title for social media section. Max 5 words",
    }),
    socialMediaHandle: z.string().min(2).max(30).default("@reallygreatsite").meta({
        description: "The company's social media handle. Max 5 words",
    }),
    socialMediaIcons: z.array(IconSchema).min(2).max(5).default([
        {
            __icon_url__: "/static/icons/placeholder.svg",
            __icon_query__: "chat bubble icon"
        },
        {
            __icon_url__: "/static/icons/placeholder.svg",
            __icon_query__: "heart icon"
        },
        {
            __icon_url__: "/static/icons/placeholder.svg",
            __icon_query__: "thumbs up icon"
        }
    ]).meta({
        description: "List of social media icons. Max 5 icons",
    }),
    emailLabel: z.string().min(4).max(10).default("Email").meta({
        description: "Label for email address. Max 4 words",
    }),
    emailValue: z.string().min(5).max(40).default("hello@reallygreatsite.com").meta({
        description: "The company's email address. Max 5 words",
    }),
    phoneLabel: z.string().min(4).max(10).default("Phone").meta({
        description: "Label for phone number. Max 4 words",
    }),
    phoneValue: z.string().min(10).max(30).default("123-456-7890").meta({
        description: "The company's phone number. Max 5 words",
    }),
    addressLabel: z.string().min(4).max(10).default("Address").meta({
        description: "Label for address. Max 3 words",
    }),
    addressValue: z.string().min(5).max(70).default("123 Anywhere St., Any City").meta({
        description: "The company's physical address. Max 10 words",
    }),
});

type CompanyContactInfoLayoutData = z.infer<typeof Schema>;

interface CompanyContactInfoLayoutProps {
    data?: Partial<CompanyContactInfoLayoutData>;
}

const dynamicSlideLayout: React.FC<CompanyContactInfoLayoutProps> = ({ data: slideData }) => {
    const socialMediaIcons = slideData?.socialMediaIcons || [];

    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden font-sans">
            {/* Main Blue Background */}
            <div className="absolute inset-0 bg-[#18428F]"></div>

            {/* Background decorative elements (absolute positioned) */}
            {/* Top-left Blue Square */}
            <div className="absolute top-0 left-0 w-[110px] h-[110px] bg-[#18428F]"></div>
            {/* Top-left Grey Horizontal Rectangle */}
            <div className="absolute top-0 left-[110px] w-[250px] h-[110px] bg-[#D9D9D9]"></div>
            {/* Top-left Grey Vertical Rectangle */}
            <div className="absolute top-[110px] left-0 w-[110px] h-[250px] bg-[#D9D9D9]"></div>

            {/* Bottom-right Blue Square */}
            <div className="absolute bottom-0 right-0 w-[110px] h-[110px] bg-[#18428F]"></div>
            {/* Bottom-right Grey Horizontal Rectangle */}
            <div className="absolute bottom-0 right-[110px] w-[250px] h-[110px] bg-[#D9D9D9]"></div>
            {/* Bottom-right Grey Vertical Rectangle */}
            <div className="absolute bottom-[110px] right-0 w-[110px] h-[250px] bg-[#D9D9D9]"></div>

            {/* Top-right White Cutout */}
            <div className="absolute top-0 right-0 w-[250px] h-[110px] bg-white"></div>
            {/* Bottom-left White Cutout */}
            <div className="absolute bottom-0 left-0 w-[250px] h-[110px] bg-white"></div>

            {/* Main Content Wrapper */}
            <div className="absolute inset-0 flex flex-col items-center justify-start py-16">
                {/* Logo */}
                <div className="w-[100px] h-[100px]" dangerouslySetInnerHTML={{ __html: slideData?.companyLogo?.__icon_url__ || "" }} />

                {/* Company Name */}
                <h1 className="text-white text-5xl font-bold mt-8">
                    {slideData?.companyName || "LARANA INC."}
                </h1>

                {/* Social Media Section */}
                <div className="flex flex-col items-center mt-10">
                    <p className="text-white text-lg italic">{slideData?.socialMediaTitle || "Social Media"}</p>
                    <div className="flex gap-4 mt-2">
                        {socialMediaIcons.map((icon, index) => (
                            <div key={index} className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                <img
                                    src={icon.__icon_url__}
                                    alt={icon.__icon_query__}
                                    className="w-6 h-6 object-contain"
                                />
                            </div>
                        ))}
                    </div>
                    <p className="text-white text-xl mt-2">{slideData?.socialMediaHandle || "@reallygreatsite"}</p>
                </div>

                {/* Spacer to push contact info to bottom */}
                <div className="mt-auto"></div>

                {/* Contact Information Section */}
                <div className="flex justify-between w-full px-20 pb-16">
                    <div className="flex flex-col items-center text-center w-1/3">
                        <p className="text-white text-lg italic">{slideData?.emailLabel || "Email"}</p>
                        <p className="text-white text-xl font-semibold mt-1">{slideData?.emailValue || "hello@reallygreatsite.com"}</p>
                    </div>
                    <div className="flex flex-col items-center text-center w-1/3">
                        <p className="text-white text-lg italic">{slideData?.phoneLabel || "Phone"}</p>
                        <p className="text-white text-xl font-semibold mt-1">{slideData?.phoneValue || "123-456-7890"}</p>
                    </div>
                    <div className="flex flex-col items-center text-center w-1/3">
                        <p className="text-white text-lg italic">{slideData?.addressLabel || "Address"}</p>
                        <p className="text-white text-xl font-semibold mt-1">{slideData?.addressValue || "123 Anywhere St., Any City"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout