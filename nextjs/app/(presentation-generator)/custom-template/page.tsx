"use client";

import React, { useEffect } from "react";
import FontManager from "./components/FontManager";
import Header from "../dashboard/components/Header";
import { useLayout } from "../context/LayoutContext";
import { useCustomLayout } from "./hooks/useCustomLayout";
import { useFontManagement } from "./hooks/useFontManagement";
import { useFileUpload } from "./hooks/useFileUpload";
import { useSlideProcessing } from "./hooks/useSlideProcessing";
import { useLayoutSaving } from "./hooks/useLayoutSaving";
import { useAPIKeyCheck } from "./hooks/useAPIKeyCheck";
import { useRouter, usePathname } from "next/navigation";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { FileUploadSection } from "./components/FileUploadSection";
import { SaveLayoutButton } from "./components/SaveLayoutButton";
import { SaveLayoutModal } from "./components/SaveLayoutModal";
import EachSlide from "./components/EachSlide/NewEachSlide";
import { APIKeyWarning } from "./components/APIKeyWarning";
import { trackEvent, MixpanelEvent } from "@/utils/mixpanel";

const CustomTemplatePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { refetch } = useLayout();
  
  // Custom hooks for different concerns
  const { hasRequiredKey, isRequiredKeyLoading } = useAPIKeyCheck();
  const { selectedFile, handleFileSelect, removeFile } = useFileUpload();
  const { slides, setSlides, completedSlides } = useCustomLayout();
  const { fontsData, UploadedFonts, uploadFont, removeFont, getAllUnsupportedFonts, setFontsData } = useFontManagement();
  const { isProcessingPptx, processFile, retrySlide,processSlideToHtml } = useSlideProcessing(
    selectedFile,
    slides,
    setSlides,
    setFontsData
  );
  const { isSavingLayout, isModalOpen, openSaveModal, closeSaveModal, saveLayout } = useLayoutSaving(
    slides,
    UploadedFonts,
    fontsData,
    refetch,
    setSlides
  );

  const handleSaveTemplate = async (layoutName: string, description: string): Promise<string | null> => {
    trackEvent(MixpanelEvent.CustomTemplate_Save_Templates_API_Call);
    const id = await saveLayout(layoutName, description);
    if (id) {
      router.push(`/template-preview/custom-${id}`);
    }
    return id;
  };

  const handleProcessSlideToHtml = (slide: any) => {
    processSlideToHtml(slide,0)
  }

  // Handle slide updates
  const handleSlideUpdate = (index: number, updatedSlideData: any) => {
    setSlides((prevSlides) =>
      prevSlides.map((s, i) =>
        i === index
          ? {
              ...s,
              ...updatedSlideData,
              modified: true,
            }
          : s
      )
    );
  };
 useEffect(() => {
    const existingScript = document.querySelector(
      'script[src*="tailwindcss.com"]'
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://cdn.tailwindcss.com";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  // Loading state
  if (isRequiredKeyLoading) {
    return <LoadingSpinner message="Checking API Key..." />;
  }

  // Anthropic key warning
  if (!hasRequiredKey) {
    return <APIKeyWarning />;
 

  }

return (
    // 页面功能暂时不可用，请期待后续版本
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 inline-block p-6 rounded-full bg-amber-100">
            <svg className="w-16 h-16 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-instrument_sans text-gray-900 mb-4">
            Custom Template Processor
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The page function is temporarily unavailable, please look forward to future versions
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => router.push('/dashboard')} 
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
          
          <div className="mt-12 text-sm text-gray-500">
            <p>当前应用处于测试版本，仅支持默认模板。</p>
            <p className="mt-2">生成过程中使用 gpt-5-mini 和 gemini-2.5-flash-image 大模型。</p>
          </div>
        </div>
      </div>
    </div>
  )
  // return (
  //   <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
  //     <Header />
  //     <div className="max-w-[1440px] aspect-video mx-auto px-6">
  //       {/* Header */}
  //       <div className="text-center space-y-2 my-6">
  //         <h1 className="text-4xl font-bold text-gray-900">
  //           Custom Template Processor
  //         </h1>
  //         <p className="text-lg text-gray-600 max-w-2xl mx-auto">
  //           Upload your PDF or PPTX file to extract slides and convert them to
  //           a template which you can use to generate AI presentations.
  //         </p>
  //         <div className="max-w-2xl mx-auto mt-2">
  //           <div className="inline-block rounded border border-orange-200 bg-orange-50 px-3 py-2 text-sm text-orange-700">
  //             AI template generation can take around 5 minutes per slide.
  //           </div>
  //         </div>
  //       </div>
       

  //       {/* File Upload Section */}
  //       <FileUploadSection
  //         selectedFile={selectedFile}
  //         handleFileSelect={handleFileSelect}
  //         removeFile={removeFile}
  //         processFile={processFile}
  //         isProcessingPptx={isProcessingPptx}
  //         slides={slides}
  //         completedSlides={completedSlides}
  //       />

  //       {/* Global Font Management */}
  //       {fontsData && (
  //         <FontManager
  //           fontsData={fontsData}
  //           UploadedFonts={UploadedFonts}
  //           uploadFont={uploadFont}
  //           removeFont={removeFont}
  //           getAllUnsupportedFonts={getAllUnsupportedFonts}
  //           processSlideToHtml={()=>handleProcessSlideToHtml(slides[0])}
  //         />
  //       )}

  //       {/* Slides Section */}
  //       {slides.length > 0 && (
  //         <div className="space-y-6 mt-10">
  //           {slides.map((slide, index) => (
  //             <EachSlide
  //               key={index}
  //               slide={slide}
  //               index={index}
  //               isProcessing={slides.some((s) => s.processing)}
  //               retrySlide={retrySlide}
  //               setSlides={setSlides}
  //               onSlideUpdate={(updatedSlideData) =>
  //                 handleSlideUpdate(index, updatedSlideData)
  //               }
  //             />
  //           ))}
  //         </div>
  //       )}

  //       {/* Floating Save Template Button */}
  //       {slides.length > 0 && slides.some((s) => s.processed) && (
  //         <SaveLayoutButton
  //           onSave={openSaveModal}
  //           isSaving={isSavingLayout}
  //           isProcessing={slides.some((s) => s.processing)}
  //         />
  //       )}

  //       {/* Save Template Modal */}
  //       <SaveLayoutModal
  //         isOpen={isModalOpen}
  //         onClose={closeSaveModal}
  //         onSave={handleSaveTemplate}
  //         isSaving={isSavingLayout}
  //       />
  //     </div>
  //   </div>
  // );
};

export default CustomTemplatePage;


