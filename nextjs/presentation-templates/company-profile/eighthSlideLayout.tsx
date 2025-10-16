import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';
import { CartesianGrid, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Line } from 'recharts';

const layoutId = "company-profile-chart-and-cards-slide";
const layoutName = "CompanyProfileChartAndCardsLayout";
const layoutDescription = "A slide with a company profile header, a line chart, a descriptive bullet point, and two prominent information cards.";

const Schema = z.object({
    companyProfileText: z.string().min(5).max(20).default("COMPANY PROFILE").meta({
        description: "Text for the company profile section. Max 3 words",
    }),
    futureOutlookTitle: z.string().min(10).max(30).default("FUTURE OUTLOOK").meta({
        description: "Main title for the future outlook. Max 5 words",
    }),
    chartData: z.array(z.object({
        name: z.string().min(5).max(15).default("Project #01").meta({
            description: "Name for the chart's data point (e.g., project name). Max 3 words",
        }),
        value: z.number().min(0).max(300).default(50).meta({
            description: "Numeric value for the chart's data point.",
        }),
    })).min(3).max(6).default([
        { name: "Project #01", value: 50 },
        { name: "Project #02", value: 70 },
        { name: "Project #03", value: 150 },
        { name: "Project #04", value: 180 },
        { name: "Project #05", value: 250 },
    ]).meta({
        description: "Data points for the line chart. Min 3, Max 6 points.",
    }),
    chartDescription: z.string().min(30).max(100).default("Presentations are tools that can be used as lectures, speeches, reports, and more.").meta({
        description: "Descriptive text below the chart. Max 20 words",
    }),
    cards: z.array(z.object({
        percentage: z.string().min(2).max(10).default("50%").meta({
            description: "Percentage value for the card. Max 2 words",
        }),
        projectTitle: z.string().min(5).max(20).default("PROJECT #02").meta({
            description: "Project title for the card. Max 3 words",
        }),
        description: z.string().min(30).max(200).default("Presentations are tools that can be used as lectures, speeches, reports, and more. It is mostly presented before an audience.").meta({
            description: "Description for the card. Max 40 words",
        }),
        icon: IconSchema.default({
            __icon_url__: "https://api.iconify.design/heroicons-solid/arrow-up.svg",
            __icon_query__: "arrow up"
        }).meta({
            description: "Icon for the card, typically an arrow.",
        }),
        bgColorClass: z.string().default("bg-white").meta({
            description: "Tailwind class for the card's background color.",
        }),
        textColorClass: z.string().default("text-gray-900").meta({
            description: "Tailwind class for the card's text color.",
        }),
        borderColorClass: z.string().default("border-[#22579B]").meta({
            description: "Tailwind class for the card's border color.",
        }),
    })).min(2).max(2).default([
        {
            percentage: "50%",
            projectTitle: "PROJECT #02",
            description: "Presentations are tools that can be used as lectures, speeches, reports, and more. It is mostly presented before an audience.",
            icon: {
                __icon_url__: "https://api.iconify.design/heroicons-solid/arrow-up.svg",
                __icon_query__: "arrow up"
            },
            bgColorClass: "bg-white",
            textColorClass: "text-gray-900",
            borderColorClass: "border-[#22579B]",
        },
        {
            percentage: "50%",
            projectTitle: "PROJECT #04",
            description: "Presentations are tools that can be used as lectures, speeches, reports, and more. It is mostly presented before an audience.",
            icon: {
                __icon_url__: "https://api.iconify.design/heroicons-solid/arrow-up.svg",
                __icon_query__: "arrow up"
            },
            bgColorClass: "bg-[#22579B]",
            textColorClass: "text-white",
            borderColorClass: "border-transparent",
        },
    ]).meta({
        description: "List of two prominent information cards.",
    }),
});

type CompanyProfileChartAndCardsLayoutData = z.infer<typeof Schema>;

interface CompanyProfileChartAndCardsLayoutProps {
    data?: Partial<CompanyProfileChartAndCardsLayoutData>;
}

const dynamicSlideLayout: React.FC<CompanyProfileChartAndCardsLayoutProps> = ({ data: slideData }) => {
    const defaultChartData = [
        { name: "Project #01", value: 50 },
        { name: "Project #02", value: 70 },
        { name: "Project #03", value: 150 },
        { name: "Project #04", value: 180 },
        { name: "Project #05", value: 250 },
    ];

    const defaultCards = [
        {
            percentage: "50%",
            projectTitle: "PROJECT #02",
            description: "Presentations are tools that can be used as lectures, speeches, reports, and more. It is mostly presented before an audience.",
            icon: {
                __icon_url__: "https://api.iconify.design/heroicons-solid/arrow-up.svg",
                __icon_query__: "arrow up"
            },
            bgColorClass: "bg-white",
            textColorClass: "text-gray-900",
            borderColorClass: "border-[#22579B]",
        },
        {
            percentage: "50%",
            projectTitle: "PROJECT #04",
            description: "Presentations are tools that can be used as lectures, speeches, reports, and more. It is mostly presented before an audience.",
            icon: {
                __icon_url__: "https://api.iconify.design/heroicons-solid/arrow-up.svg",
                __icon_query__: "arrow up"
            },
            bgColorClass: "bg-[#22579B]",
            textColorClass: "text-white",
            borderColorClass: "border-transparent",
        },
    ];

    const chartData = slideData?.chartData || defaultChartData;
    const cards = slideData?.cards || defaultCards;

    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white z-20 mx-auto overflow-hidden p-16 font-sans">
            <div className="flex h-full gap-x-16">
                {/* Left Column */}
                <div className="flex-1 flex flex-col justify-between">
                    {/* Title Section */}
                    <div className="mb-8">
                        <p className="text-lg text-gray-700 mb-2">{slideData?.companyProfileText || "COMPANY PROFILE"}</p>
                        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">{slideData?.futureOutlookTitle || "FUTURE OUTLOOK"}</h1>
                    </div>

                    {/* Chart Section */}
                    <div className="flex-grow flex items-center justify-center relative min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={chartData}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                                <XAxis dataKey="name" tick={{ fill: "#6B7280", fontSize: 16 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: "#6B7280", fontSize: 16 }} axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#22579B"
                                    strokeWidth={3}
                                    dot={{ r: 5, fill: "#22579B" }}
                                    activeDot={{ r: 8, fill: "#22579B" }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Bullet Point Section */}
                    <div className="mt-8 flex items-start gap-x-2">
                        <svg className="w-4 h-4 mt-1 text-[#22579B] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 0 L20 10 L10 20 L0 10 Z" />
                        </svg>
                        <p className="text-base italic text-gray-700">{slideData?.chartDescription || "Presentations are tools that can be used as lectures, speeches, reports, and more."}</p>
                    </div>
                </div>

                {/* Right Column */}
                <div className="w-[400px] flex flex-col gap-y-8">
                    {cards.map((card, index) => (
                        <div key={index} className={`border ${card.borderColorClass} p-8 flex-1 flex flex-col justify-between ${card.bgColorClass}`}>
                            <div className="flex items-center justify-between mb-4">
                                <span className={`text-5xl font-extrabold ${card.textColorClass}`}>{card.percentage}</span>
                                <img
                                    src={card.icon?.__icon_url__}
                                    alt={card.icon?.__icon_query__ || "Upward arrow icon"}
                                    className={`w-12 h-12 ${card.textColorClass}`}
                                    style={{ filter: card.textColorClass === "text-white" ? "invert(1)" : "none" }}
                                />
                            </div>
                            <h3 className={`text-xl font-bold ${card.textColorClass} mb-2`}>{card.projectTitle}</h3>
                            <p className={`text-base ${card.textColorClass}`}>{card.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout