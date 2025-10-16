import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "header-two-text-cards-slide";
const layoutName = "Header Two Text Cards Layout";
const layoutDescription = "A slide with a header and two text cards.";

const Schema = z.object({
    title: z.string().min(3).max(15).default("PROBLEMS").meta({
        description: "Main title of the slide. Max 2 words",
    }),
    cards: z.array(z.object({
        description: z.string().min(50).max(150).default("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat at tortor id ullamcorper.").meta({
            description: "Description text for the card. Max 25 words",
        }),
    })).min(2).max(2).default([
        {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat at tortor id ullamcorper.",
        },
        {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat at tortor id ullamcorper.",
        },
    ]).meta({
        description: "List of text cards. Exactly 2 cards are expected.",
    }),
});

type HeaderTwoTextCardsSlideData = z.infer<typeof Schema>;

interface HeaderTwoTextCardsSlideLayoutProps {
    data?: Partial<HeaderTwoTextCardsSlideData>;
}

const dynamicSlideLayout: React.FC<HeaderTwoTextCardsSlideLayoutProps> = ({ data: slideData }) => {
    const cards = slideData?.cards || [];

    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-[#F5EBDC] z-20 mx-auto overflow-hidden">

            {/* Decorative Elements (Absolute Positioning, z-0) */}

            {/* Top Left Light Beige Quarter Circle (Radius ~300px) */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-br-full bg-[#DCCEB1] transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
            {/* Top Left Dark Red Circle */}
            <div className="absolute top-[-75px] left-[-75px] w-[150px] h-[150px] rounded-full bg-[#6E2023] z-0"></div>

            {/* Top Right Light Beige Quarter Circle (Radius ~300px) */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-bl-full bg-[#DCCEB1] transform translate-x-1/2 -translate-y-1/2 z-0"></div>
            {/* Top Right X Pattern */}
            <div className="absolute top-[100px] right-[100px] text-[#6E2023] text-sm leading-tight font-mono z-0">
                XXXXXXXXX<br />
                XXXXXXXXX<br />
                XXXXXXXXX<br />
                XXXXXXXXX<br />
                XXXXXXXXX
            </div>

            {/* Bottom Left Light Beige Quarter Circle (Radius ~300px) */}
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-tr-full bg-[#DCCEB1] transform -translate-x-1/2 translate-y-1/2 z-0"></div>
            {/* Mid Left Dark Red Outlined Circle */}
            <div className="absolute top-[320px] left-[100px] w-[50px] h-[50px] rounded-full border-2 border-[#6E2023] z-0"></div>
            {/* Bottom Left X Pattern */}
            <div className="absolute bottom-[100px] left-[100px] text-[#6E2023] text-sm leading-tight font-mono z-0">
                XXXXXXXXX<br />
                XXXXXXXXX<br />
                XXXXXXXXX<br />
                XXXXXXXXX<br />
                XXXXXXXXX
            </div>

            {/* Bottom Right Light Beige Quarter Circle (Radius ~300px) */}
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-tl-full bg-[#DCCEB1] transform translate-x-1/2 translate-y-1/2 z-0"></div>
            {/* Mid Right Dark Red Outlined Circle */}
            <div className="absolute top-[320px] right-[100px] w-[50px] h-[50px] rounded-full border-2 border-[#6E2023] z-0"></div>
            {/* Bottom Right Dark Red Circle */}
            <div className="absolute bottom-[-50px] right-[-50px] w-[100px] h-[100px] rounded-full bg-[#6E2023] z-0"></div>

            {/* Main Content (Relative, z-10) */}
            <div className="relative z-10 flex flex-col items-center pt-[150px] h-full">
                {/* Title */}
                <h1 className="text-6xl font-['Playfair_Display'] font-bold text-[#6E2023] mb-[80px]">
                    {slideData?.title}
                </h1>

                {/* Text Card 1 */}
                {cards[0] && (
                    <div className="w-[800px] bg-[#DCCEB1] rounded-lg p-8 mb-8">
                        <p className="text-xl font-sans text-[#6E2023] leading-relaxed">
                            {cards[0].description}
                        </p>
                    </div>
                )}

                {/* Text Card 2 */}
                {cards[1] && (
                    <div className="w-[800px] bg-[#DCCEB1] rounded-lg p-8">
                        <p className="text-xl font-sans text-[#6E2023] leading-relaxed">
                            {cards[1].description}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
