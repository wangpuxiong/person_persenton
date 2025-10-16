import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "thank-you-slide";
const layoutName = "ThankYouLayout";
const layoutDescription = "A slide with a large central text and decorative geometric shapes and patterns.";

const Schema = z.object({
    mainText: z.string().min(1).max(30).default("THANK YOU").meta({
        description: "Main text for the slide. Max 5 words",
    }),
    xPattern: z.string().min(10).max(30).default("xxxxxxxxxxxxxxxxxxxxxxxxx").meta({
        description: "Decorative 'x' pattern. Enter 'x' characters, preferably in multiples of 5 for grid layout. Max 30 'x's",
    }),
});

type ThankYouLayoutData = z.infer<typeof Schema>;

interface ThankYouLayoutProps {
    data?: Partial<ThankYouLayoutData>;
}

const dynamicSlideLayout: React.FC<ThankYouLayoutProps> = ({ data: slideData }) => {
    const mainText = slideData?.mainText ?? "THANK YOU";
    const xPatternChars = (slideData?.xPattern ?? "xxxxxxxxxxxxxxxxxxxxxxxxx").split("");

    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-[#F5ECCB] z-20 mx-auto overflow-hidden">

            {/* Main Content: THANK YOU */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
                <p className="text-[120px] font-extrabold text-[#3B1B1B] font-serif tracking-wide select-none">
                    {mainText}
                </p>
            </div>

            {/* Decorative Elements (Absolute Positioning) */}

            {/* Top Left Corner */}
            <div className="absolute top-0 left-0 w-[150px] h-[150px] bg-[#E0D7C1] rounded-br-full"></div>
            <div className="absolute top-[25px] left-[25px] w-[80px] h-[80px] border-[3px] border-[#8B1F20] rounded-full z-10"></div>

            {/* Bottom Left Corner */}
            <div className="absolute bottom-0 left-0 w-[150px] h-[150px] bg-[#E0D7C1] rounded-tr-full"></div>
            <div className="absolute bottom-0 left-0 w-[150px] h-[150px] bg-[#8B1F20] rounded-t-full"></div>
            <div className="absolute bottom-[170px] left-[50px] text-[#8B1F20] text-sm leading-none font-medium grid grid-cols-5 gap-x-1 gap-y-1 z-10 select-none">
                {xPatternChars.map((char, index) => (
                    <span key={`bl-${index}`}>{char}</span>
                ))}
            </div>


            {/* Top Right Corner */}
            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[#E0D7C1] rounded-bl-full"></div>
            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[#8B1F20] rounded-b-full"></div>
            <div className="absolute top-[170px] right-[50px] text-[#8B1F20] text-sm leading-none font-medium grid grid-cols-5 gap-x-1 gap-y-1 z-10 select-none">
                {xPatternChars.map((char, index) => (
                    <span key={`tr-${index}`}>{char}</span>
                ))}
            </div>

            {/* Bottom Right Corner */}
            <div className="absolute bottom-0 right-0 w-[150px] h-[150px] bg-[#E0D7C1] rounded-tl-full"></div>
            <div className="absolute bottom-[25px] right-[25px] w-[80px] h-[80px] border-[3px] border-[#8B1F20] rounded-full z-10"></div>

        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
