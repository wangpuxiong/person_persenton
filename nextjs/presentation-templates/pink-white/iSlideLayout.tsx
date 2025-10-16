import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "two-column-images-text-slide";
const layoutName = "Two Column Images Text Layout";
const layoutDescription = "A two-column slide with a main title, two images, a subtitle, and a description.";

const Schema = z.object({
    mainTitle: z.string().min(5).max(35).default("KEITHSTON\nAND PARTNERS").meta({
        description: "Main title of the slide. Max 5 words",
    }),
    mainImage: ImageSchema.default({
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "Woman in pink sweater",
    }).meta({
        description: "Main image on the left side. Max 30 words",
    }),
    secondaryImage: ImageSchema.default({
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "Hand holding sunglasses",
    }).meta({
        description: "Secondary image on the top right side. Max 30 words",
    }),
    subtitle: z.string().min(5).max(25).default("SECOND PROJECT").meta({
        description: "Subtitle for the bottom right section. Max 4 words",
    }),
    description: z.string().min(50).max(350).default("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.").meta({
        description: "Description text for the bottom right section. Max 60 words",
    }),
});

type TwoColumnImagesTextSlideData = z.infer<typeof Schema>;

interface TwoColumnImagesTextSlideLayoutProps {
    data?: Partial<TwoColumnImagesTextSlideData>;
}

const dynamicSlideLayout: React.FC<TwoColumnImagesTextSlideLayoutProps> = ({ data: slideData }) => {
    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
            <div className="flex h-full">
                {/* Left Section */}
                <div className="w-1/2 bg-[#3F3A3A] flex flex-col relative px-12 py-16">
                    {/* Decorative SVG background elements */}
                    <svg className="absolute top-0 left-0 w-full h-full z-0 opacity-70" viewBox="0 0 640 720" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Main strokes */}
                        <path d="M-13 0C-2.33342 16.8335 15.6666 43.1668 39 70C78 114.5 125.167 151.333 162.5 169.5C216.5 196.5 281 202.5 316.5 204.5C369.5 207.5 401.5 209 437.5 209C473.5 209 500.5 209.5 533.5 209.5C566.5 209.5 593 209.5 613 209.5" stroke="#F776B5" strokeWidth="2" strokeLinecap="round" strokeDasharray="10 10"/>
                        <path d="M-13 50C-2.33342 66.8335 15.6666 93.1668 39 120C78 164.5 125.167 201.333 162.5 219.5C216.5 246.5 281 252.5 316.5 254.5C369.5 257.5 401.5 259 437.5 259C473.5 259 500.5 259.5 533.5 259.5C566.5 259.5 593 259.5 613 259.5" stroke="#F776B5" strokeWidth="2" strokeLinecap="round" strokeDasharray="10 10"/>
                        <path d="M-13 100C-2.33342 116.8335 15.6666 143.1668 39 170C78 214.5 125.167 251.333 162.5 269.5C216.5 296.5 281 302.5 316.5 304.5C369.5 307.5 401.5 309 437.5 309C473.5 309 500.5 309.5 533.5 309.5C566.5 309.5 593 309.5 613 309.5" stroke="#F776B5" strokeWidth="2" strokeLinecap="round" strokeDasharray="10 10"/>
                        <path d="M-13 150C-2.33342 166.8335 15.6666 193.1668 39 220C78 264.5 125.167 301.333 162.5 319.5C216.5 346.5 281 352.5 316.5 354.5C369.5 357.5 401.5 359 437.5 359C473.5 359 500.5 359.5 533.5 359.5C566.5 359.5 593 359.5 613 359.5" stroke="#F776B5" strokeWidth="2" strokeLinecap="round" strokeDasharray="10 10"/>
                        <path d="M-13 200C-2.33342 216.8335 15.6666 243.1668 39 270C78 314.5 125.167 351.333 162.5 369.5C216.5 396.5 281 402.5 316.5 404.5C369.5 407.5 401.5 409 437.5 409C473.5 409 500.5 409.5 533.5 409.5C566.5 409.5 593 409.5 613 409.5" stroke="#F776B5" strokeWidth="2" strokeLinecap="round" strokeDasharray="10 10"/>

                        {/* Scattered dots/splatters */}
                        <circle cx="10" cy="20" r="1.5" fill="#F776B5"/>
                        <circle cx="30" cy="50" r="1" fill="#F776B5"/>
                        <circle cx="5" cy="80" r="2" fill="#F776B5"/>
                        <circle cx="20" cy="110" r="1.5" fill="#F776B5"/>
                        <circle cx="15" cy="140" r="1" fill="#F776B5"/>
                        <circle cx="40" cy="170" r="2.5" fill="#F776B5"/>
                        <circle cx="25" cy="200" r="1.5" fill="#F776B5"/>
                        <circle cx="10" cy="230" r="1" fill="#F776B5"/>
                        <circle cx="35" cy="260" r="2" fill="#F776B5"/>
                        <circle cx="20" cy="290" r="1.5" fill="#F776B5"/>
                        <circle cx="5" cy="320" r="1" fill="#F776B5"/>
                        <circle cx="45" cy="350" r="2.5" fill="#F776B5"/>
                        <circle cx="30" cy="380" r="1.5" fill="#F776B5"/>
                        <circle cx="10" cy="410" r="2" fill="#F776B5"/>
                        <circle cx="25" cy="440" r="1" fill="#F776B5"/>
                    </svg>

                    <h1 className="text-6xl font-extrabold text-[#F776B5] leading-tight z-10 font-['Oswald']">
                        {slideData?.mainTitle?.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                {index < (slideData.mainTitle?.split('\n').length || 0) - 1 && <br />}
                            </React.Fragment>
                        )) || "KEITHSTON\nAND PARTNERS"}
                    </h1>

                    {/* Image 1 (Woman) */}
                    <div className="mt-auto pt-8">
                        <img
                            src={slideData?.mainImage?.__image_url__ || ""}
                            alt={slideData?.mainImage?.__image_prompt__ || slideData?.mainTitle || "Woman in pink sweater"}
                            className="w-full h-[360px] object-cover rounded-md"
                        />
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-1/2 flex flex-col">
                    {/* Top Right - Image 2 (Sunglasses) */}
                    <div className="h-1/2 bg-[#E6E6E6] flex items-center justify-center p-8">
                        <img
                            src={slideData?.secondaryImage?.__image_url__ || ""}
                            alt={slideData?.secondaryImage?.__image_prompt__ || slideData?.subtitle || "Hand holding sunglasses"}
                            className="max-h-full max-w-full object-contain rounded-md"
                        />
                    </div>

                    {/* Bottom Right - Subtitle and Text */}
                    <div className="h-1/2 bg-[#3F3A3A] flex flex-col justify-center p-12 text-right">
                        <h2 className="text-3xl font-extrabold text-[#F776B5] mb-4 font-['Oswald']">
                            {slideData?.subtitle || "SECOND PROJECT"}
                        </h2>

                        <p className="text-base text-[#F0F0F0] leading-relaxed font-['Roboto']">
                            {slideData?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
