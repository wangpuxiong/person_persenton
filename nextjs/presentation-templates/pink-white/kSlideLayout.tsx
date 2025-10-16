import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "contact-information-person-image-slide";
const layoutName = "ContactInformationPersonImage";
const layoutDescription = "A slide with a large contact title, a person image, and a grid of contact information blocks.";

const Schema = z.object({
    contactTitle: z.string().min(5).max(15).default("CONTACT ME").meta({
        description: "Main contact title. Max 2 words",
    }),
    personImage: ImageSchema.default({
        __image_url__: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        __image_prompt__: "Woman posing in a pink jacket and blue skirt with sunglasses",
    }).meta({
        description: "Image of a person for the contact slide. Max 30 words",
    }),
    contactInfo: z.array(z.object({
        label: z.string().min(5).max(20).meta({
            description: "Label for the contact information (e.g., Website, Phone Number). Max 3 words",
        }),
        value: z.string().min(5).max(40).meta({
            description: "Value for the contact information (e.g., www.example.com, 123-456-7890). Max 5 words",
        }),
    })).min(4).max(4).default([
        {
            label: "Website",
            value: "www.reallygreatsite.com",
        },
        {
            label: "Phone Number",
            value: "123-456-7890",
        },
        {
            label: "Email Address",
            value: "hello@reallygreatsite.com",
        },
        {
            label: "Social Media",
            value: "@reallygreatsite",
        },
    ]).meta({
        description: "List of contact information blocks, each with a label and a value. Max 4 blocks",
    }),
});

type ContactInformationPersonImageSlideData = z.infer<typeof Schema>;

interface ContactInformationPersonImageProps {
    data?: Partial<ContactInformationPersonImageSlideData>;
}

const dynamicSlideLayout: React.FC<ContactInformationPersonImageProps> = ({ data: slideData }) => {
    const contactInfo = slideData?.contactInfo || [];

    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-[#333333] relative z-20 mx-auto overflow-hidden">
            {/* Large "CONTACT ME" text - Positioned absolutely to allow overlap with image and specific placement */}
            <div className="absolute top-[64px] left-[32px] w-[1400px] h-[200px] flex items-center">
                <h1 className="text-[180px] font-extrabold text-[#EE89B3] leading-none font-['Oswald']">
                    {slideData?.contactTitle}
                </h1>
            </div>

            {/* Woman Image - Positioned absolutely to the right, full height */}
            <img
                src={slideData?.personImage?.__image_url__}
                alt={slideData?.personImage?.__image_prompt__}
                className="absolute right-0 top-0 h-full w-[440px] object-cover z-30"
            />

            {/* Contact Information Grid - Positioned absolutely at the bottom-left */}
            <div className="absolute left-[105px] top-[472.5px] w-[630px] h-[210px] grid grid-cols-2 gap-x-[64px] gap-y-[32px] font-['Montserrat']">
                {contactInfo.map((item, index) => (
                    <div key={index}>
                        <p className="font-bold text-[#EE89B3] text-[32px] mb-1 leading-none">{item.label}</p>
                        <p className="text-white text-[24px] leading-none">{item.value}</p>
                    </div>
                ))}
            </div>

            {/* Pink Splatter SVGs - Decorative elements, absolutely positioned */}
            {/* Splatter 1 (Large, top right) */}
            <svg className="absolute right-[40px] top-[400px] w-[200px] h-[200px] z-0" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M127.34 1.48C137.94 1.48 147.2 3.1 155.08 6.34C162.96 9.58 169.64 14.18 175.12 20.14C180.6 26.1 184.82 33.1 187.78 41.14C190.74 49.18 192.22 57.86 192.22 67.18C192.22 76.84 190.66 85.8 187.54 94.06C184.42 102.32 179.8 109.52 173.68 115.66C167.56 121.8 160.06 126.74 151.18 130.48C142.3 134.22 132.34 136.14 121.3 136.24C112.54 136.24 104.38 134.62 96.82 131.38C89.26 128.14 82.54 123.54 76.66 117.58C70.78 111.62 66.22 104.62 62.9 96.58C59.58 88.54 57.92 79.86 57.92 70.54C57.92 60.88 59.48 51.82 62.6 43.36C65.72 34.9 70.36 27.52 76.52 21.22C82.68 14.92 90.18 9.94 98.98 6.28C107.78 2.62 117.74 0.799999 128.86 0.799999L127.34 1.48Z" fill="#EE89B3" />
            </svg>

            {/* Splatter 2 (Medium, bottom left) */}
            {/* <svg className="absolute left-[30px] bottom-[30px] w-[150px] h-[150px] z-0" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M95.505 1.11C103.455 1.11 110.4 2.325 116.34 4.755C122.28 7.185 127.305 10.635 131.415 15.105C135.525 19.575 138.615 24.825 140.685 30.855C142.755 36.885 143.79 43.47 143.79 50.61C143.79 57.93 142.695 64.65 140.505 70.77C138.315 76.89 135.015 82.29 130.605 86.97C126.195 91.65 120.795 95.385 114.405 98.175C108.015 100.965 100.755 102.36 92.625 102.435C86.355 102.435 80.385 101.235 74.715 98.835C69.045 96.435 63.915 93.005 59.325 88.545C54.735 84.085 51.135 78.885 48.525 72.945C45.915 67.005 44.61 60.465 44.61 53.325C44.61 46.005 45.705 39.255 47.895 33.075C50.085 26.895 53.385 21.495 57.795 16.815C62.205 12.135 67.605 8.4 73.995 5.625C80.385 2.85 87.645 1.11 95.775 1.11H95.505Z" fill="#EE89B3" />
            </svg> */}

            {/* Splatter 3 (Small, left of image, above contact info) */}
            <svg className="absolute left-[700px] top-[500px] w-[80px] h-[80px] z-0" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50.67 0.58C54.97 0.58 58.74 1.25 61.98 2.59C65.22 3.93 67.92 6.02 70.08 8.85C72.24 11.68 73.96 15.02 75.24 18.85C76.52 22.68 77.16 26.86 77.16 31.39C77.16 35.53 76.48 39.3 75.12 42.7C73.76 46.1 71.74 48.97 69.06 51.28C66.38 53.59 63.14 55.43 59.34 56.79C55.54 58.15 51.28 58.83 46.56 58.83C42.14 58.83 38.02 58.16 34.2 56.82C30.38 55.48 27.06 53.49 24.24 50.84C21.42 48.19 19.34 44.89 17.98 40.94C16.62 36.99 15.94 32.54 15.94 27.59C15.94 23.35 16.62 19.56 17.98 16.22C19.34 12.88 21.36 10.01 24.04 7.61C26.72 5.21 29.96 3.37 33.76 2.06C37.56 0.75 41.82 0.08 46.54 0.08H50.67Z" fill="#EE89B3" />
            </svg>
        </div>
    );
};

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
