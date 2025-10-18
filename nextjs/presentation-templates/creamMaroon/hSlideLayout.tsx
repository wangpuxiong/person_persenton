import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

const layoutId = "discussion-slide"
const layoutName = "Discussion Layout"
const layoutDescription = "A slide with a large title and a central text block, surrounded by decorative geometric shapes and 'X' patterns."

const Schema = z.object({
    title: z.string().min(5).max(30).default("DISCUSSION").meta({
        description: "Main title of the slide. Max 3 words",
    }),
    description: z.string().min(50).max(500).default("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.").meta({
        description: "Main description text for discussion. Max 80 words",
    }),
})

type DiscussionSlideData = z.infer<typeof Schema>

interface DiscussionSlideLayoutProps {
    data?: Partial<DiscussionSlideData>
}

const dynamicSlideLayout: React.FC<DiscussionSlideLayoutProps> = ({ data: slideData }) => {
    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-[#E4D7C4] relative z-20 mx-auto overflow-hidden">
            {/* Inner content area with main background color and rounded corners */}
            <div className="absolute inset-[30px] bg-[#F9F1E6] rounded-[20px]">

                {/* Large tan corner curves, visually appearing to overlap the beige area from the outer frame */}
                {/* These are positioned negatively to align with the outer border of the main container. */}
                {/* Top-left large tan curve */}
                <div className="absolute -top-[30px] -left-[30px] w-[150px] h-[150px] bg-[#E4D7C4] rounded-br-full"></div>
                {/* Bottom-left large tan curve */}
                <div className="absolute -bottom-[30px] -left-[30px] w-[150px] h-[150px] bg-[#E4D7C4] rounded-tr-full"></div>
                {/* Top-right large tan curve */}
                <div className="absolute -top-[30px] -right-[30px] w-[150px] h-[150px] bg-[#E4D7C4] rounded-bl-full"></div>
                {/* Bottom-right large tan curve */}
                <div className="absolute -bottom-[30px] -right-[30px] w-[150px] h-[150px] bg-[#E4D7C4] rounded-tl-full"></div>

                {/* Decorative elements (dark red circles and outlined circles) */}
                {/* These are placed with z-index to ensure they are above the background curves. */}
                {/* Top-left dark red solid circle */}
                <div className="w-[120px] h-[120px] bg-[#9A2D2F] rounded-full absolute -top-[60px] -left-[60px] z-10"></div>
                {/* Bottom-right dark red solid circle */}
                <div className="w-[100px] h-[100px] bg-[#9A2D2F] rounded-full absolute -bottom-[50px] -right-[50px] z-10"></div>

                {/* Bottom-left dark red outlined circle */}
                <div className="w-[60px] h-[60px] border-2 border-[#9A2D2F] rounded-full absolute bottom-[60px] left-[60px] z-10"></div>
                {/* Top-right dark red outlined circle */}
                <div className="w-[60px] h-[60px] border-2 border-[#9A2D2F] rounded-full absolute top-[60px] right-[60px] z-10"></div>

                {/* X patterns */}
                {/* Top-right X pattern */}
                <div className="absolute top-[100px] right-[100px] text-[#9A2D2F] text-sm leading-none font-['Times_New_Roman'] z-10">
                    <div>XXXXXX</div>
                    <div>XXXXXX</div>
                    <div>XXXXXX</div>
                    <div>XXXXXX</div>
                    <div>XXXXXX</div>
                </div>
                {/* Bottom-left X pattern */}
                <div className="absolute bottom-[100px] left-[100px] text-[#9A2D2F] text-sm leading-none font-['Times_New_Roman'] z-10">
                    <div>XXXXXX</div>
                    <div>XXXXXX</div>
                    <div>XXXXXX</div>
                    <div>XXXXXX</div>
                    <div>XXXXXX</div>
                </div>

                {/* Main content area for Title and Text */}
                <div className="relative h-full w-full flex flex-col items-center pt-[140px] z-20">
                    <h1 className="text-[#4F201F] text-[80px] font-['Times_New_Roman']">
                        {slideData?.title || "DISCUSSION"}
                    </h1>
                    <p className="text-[#4F201F] text-[24px] font-['Times_New_Roman'] leading-relaxed w-[800px] text-center mt-[50px]">
                        {slideData?.description || "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
                    </p>
                </div>
            </div>
        </div>
    )
}

export { Schema, layoutId, layoutName, layoutDescription }
export default dynamicSlideLayout
