import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "image-text-cards-slide";
const layoutName = "ImageTextCardsLayout";
const layoutDescription = "A slide with a large background image, a main title, description, and multiple cards with icons and bullet points.";

const Schema = z.object({
    mainImage: ImageSchema.default({
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "Global connections of business people",
    }).meta({
        description: "Main background image for the slide. Max 30 words",
    }),
    companyProfileLabel: z.string().min(5).max(20).default("COMPANY PROFILE").meta({
        description: "Label above the main title. Max 3 words",
    }),
    title: z.string().min(10).max(40).default("CORPORATE SOCIAL\nRESPONSIBILITY").meta({
        description: "Main title of the slide. Max 5 words",
    }),
    description: z.string().min(50).max(150).default("Presentations are tools that can be used as lectures, speeches, reports, and more. It is mostly presented before an audience.").meta({
        description: "Main description text. Max 30 words",
    }),
    footerText: z.string().min(10).max(50).default("Good Things Inspire Meaningful Change").meta({
        description: "Footer text on the left side. Max 7 words",
    }),
    cards: z.array(z.object({
        icon: IconSchema,
        title: z.string().min(5).max(30).default("Education").meta({
            description: "Card title. Max 4 words",
        }),
        bulletPoints: z.array(z.string().min(20).max(100).default("Presentations are tools that can be used as lectures, speeches, reports, and more.").meta({
            description: "Bullet point text. Max 20 words"
        })).min(1).max(3).meta({
            description: "List of bullet points for the card. Max 3 points, each up to 20 words",
        }),
        backgroundColorClass: z.string().default("bg-[#1A4070]").meta({
            description: "Tailwind CSS class for card background color",
        }),
        titleColorClass: z.string().default("text-white").meta({
            description: "Tailwind CSS class for card title color",
        }),
        bulletColorClass: z.string().default("text-white").meta({
            description: "Tailwind CSS class for card bullet point color",
        }),
    })).min(1).max(4).default(() => [
        {
            icon: {
                __icon_url__: "/static/icons/education.svg",
                __icon_query__: "education cap"
            },
            title: "Education",
            bulletPoints: [
                "Presentations are tools that can be used as lectures, speeches, reports, and more.",
                "It is mostly presented before an audience."
            ],
            backgroundColorClass: "bg-[#1A4070]",
            titleColorClass: "text-white",
            bulletColorClass: "text-white",
        },
        {
            icon: {
                __icon_url__: "/static/icons/health.svg",
                __icon_query__: "health cross plus"
            },
            title: "Health & Hygiene",
            bulletPoints: [
                "Presentations are tools that can be used as lectures, speeches, reports, and more.",
                "It is mostly presented before an audience."
            ],
            backgroundColorClass: "bg-[#D3D3D3]",
            titleColorClass: "text-[#333333]",
            bulletColorClass: "text-[#555555]",
        },
        {
            icon: {
                __icon_url__: "/static/icons/water.svg",
                __icon_query__: "water drop conservation"
            },
            title: "Water Conservation",
            bulletPoints: [
                "Presentations are tools that can be used as lectures, speeches, reports, and more.",
                "It is mostly presented before an audience."
            ],
            backgroundColorClass: "bg-[#1A4070]",
            titleColorClass: "text-white",
            bulletColorClass: "text-white",
        },
        {
            icon: {
                __icon_url__: "/static/icons/recycle.svg",
                __icon_query__: "recycle zero waste"
            },
            title: "Zero Waste",
            bulletPoints: [
                "Presentations are tools that can be used as lectures, speeches, reports, and more.",
                "It is mostly presented before an audience."
            ],
            backgroundColorClass: "bg-[#D3D3D3]",
            titleColorClass: "text-[#333333]",
            bulletColorClass: "text-[#555555]",
        }
    ]).meta({
        description: "List of cards, each with an icon, title, and bullet points. Max 4 cards.",
    }),
});

type ImageTextCardsLayoutData = z.infer<typeof Schema>;

interface ImageTextCardsLayoutProps {
    data?: Partial<ImageTextCardsLayoutData>;
}

const dynamicSlideLayout: React.FC<ImageTextCardsLayoutProps> = ({ data: slideData }) => {
    const cards = slideData?.cards || [];
    const title = slideData?.title || "CORPORATE SOCIAL\nRESPONSIBILITY";

    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden font-['Arial']">
            {/* Main image as full background */}
            <img src={slideData?.mainImage?.__image_url__ || "/static/images/placeholder.jpg"} alt={slideData?.mainImage?.__image_prompt__ || "Global connections"} className="absolute inset-0 w-full h-full object-cover z-0" />

            {/* Blue overlay on the left side of the image */}
            <div className="absolute top-0 left-0 w-[480px] h-full bg-[#1A4070]/70 z-10"></div>

            {/* Content Wrapper (flex) to hold left and right sections */}
            <div className="flex h-full relative z-20">
                {/* Left Section - Text Content */}
                <div className="w-[600px] flex flex-col justify-end pb-12 pl-[70px] pr-10">
                    <p className="text-[16px] text-white mb-2 font-['Arial']">{slideData?.companyProfileLabel || "COMPANY PROFILE"}</p>
                    <h1 className="text-[38px] font-bold text-white leading-tight mb-4 font-['Arial']">
                        {title.split('\n').map((line, i) => (
                            <span key={i}>
                                {line}
                                {i < (title.split('\n').length - 1) && <br />}
                            </span>
                        ))}
                    </h1>
                    <div className="w-[60px] h-[4px] bg-[#0066CC] mb-6"></div>
                    <p className="text-[18px] text-white leading-relaxed font-['Arial'] mb-8">
                        {slideData?.description || "Presentations are tools that can be used as lectures, speeches, reports, and more. It is mostly presented before an audience."}
                    </p>
                    <p className="text-[14px] text-white text-right font-['Arial']">{slideData?.footerText || "Good Things Inspire Meaningful Change"}</p>
                </div>

                {/* Right Section - Cards */}
                <div className="flex-1 flex flex-col justify-center items-end pr-[70px] py-[40px] gap-5">
                    {cards.map((card, index) => (
                        <div key={index} className={`relative w-[500px] h-[160px] ${card.backgroundColorClass} rounded-lg shadow-md flex items-center pl-[90px] pr-6`}>
                            {/* Icon */}
                            <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-[80px] h-[80px] bg-[#0066CC] rounded-full flex items-center justify-center">
                                <img src={card.icon.__icon_url__} alt={card.icon.__icon_query__} className="w-[40px] h-[40px] object-contain" />
                            </div>
                            {/* Content */}
                            <div className="flex flex-col">
                                <h3 className={`text-[24px] font-bold ${card.titleColorClass} mb-2 font-['Arial']`}>{card.title}</h3>
                                <ul className={`list-disc list-inside text-[16px] ${card.bulletColorClass} space-y-1 font-['Arial']`}>
                                    {card.bulletPoints.map((bullet, bulletIndex) => (
                                        <li key={bulletIndex}>{bullet}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout