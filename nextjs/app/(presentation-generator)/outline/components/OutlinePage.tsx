"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { OverlayLoader } from "@/components/ui/overlay-loader";
import Wrapper from "@/components/Wrapper";
import OutlineContent from "./OutlineContent";
import EmptyStateView from "./EmptyStateView";
import GenerateButton from "./GenerateButton";

import { TABS, Template } from "../types/index";
import { ModelOption } from "../../upload/type";
import { useOutlineStreaming } from "../hooks/useOutlineStreaming";
import { useOutlineManagement } from "../hooks/useOutlineManagement";
import { usePresentationGeneration } from "../hooks/usePresentationGeneration";
import TemplateSelection from "./TemplateSelection";
import ModelSelection from "./ModelSelection";
import { ImageModelType } from "./ModelSelection";

const OutlinePage: React.FC = () => {
  const { t } = useTranslation('outline');
  const { presentation_id, outlines } = useSelector(
    (state: RootState) => state.presentationGeneration
  );

  const [activeTab, setActiveTab] = useState<string>(TABS.OUTLINE);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedPptModel, setSelectedPptModel] = useState<ModelOption | null>(null);
  const [selectedImageModel, setSelectedImageModel] = useState<ImageModelType | null>(null);
  // Custom hooks
  const streamState = useOutlineStreaming(presentation_id);
  const { handleDragEnd, handleAddSlide } = useOutlineManagement(outlines);
  const { loadingState, handleSubmit } = usePresentationGeneration(
    presentation_id,
    outlines,
    selectedTemplate,
    selectedPptModel,
    selectedImageModel,
    setActiveTab
  );
  if (!presentation_id) {
    return <EmptyStateView />;
  }


  return (
    <div className="h-[calc(100vh-46px)]">
      <OverlayLoader
        show={loadingState.isLoading}
        text={loadingState.message}
        showProgress={loadingState.showProgress}
        duration={loadingState.duration}
      />

      <Wrapper className="h-full flex flex-col w-full">
        <div className="flex-grow overflow-y-hidden w-full max-w-[1200px] mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-fit md:w-[75%] mx-auto my-4 grid-cols-3">
              <TabsTrigger value={TABS.OUTLINE}>{t('outlineContent')}</TabsTrigger>
              <TabsTrigger value={TABS.LAYOUTS}>{t('selectTemplates')}</TabsTrigger>
              <TabsTrigger value={TABS.MODELS}>{t('selectModels')}</TabsTrigger>
            </TabsList>

            <div className="flex-grow w-full mx-auto flex flex-col overflow-y-hidden">
              <TabsContent value={TABS.OUTLINE} className="flex-grow h-full overflow-y-auto custom_scrollbar"
              >
                <div className="px-2 md:px-4">
                  <OutlineContent
                    outlines={outlines}
                    isLoading={streamState.isLoading}
                    isStreaming={streamState.isStreaming}
                    activeSlideIndex={streamState.activeSlideIndex}
                    highestActiveIndex={streamState.highestActiveIndex}
                    onDragEnd={handleDragEnd}
                    onAddSlide={handleAddSlide}
                  />
                </div>
              </TabsContent>

              <TabsContent value={TABS.LAYOUTS} className="flex-grow h-full overflow-y-auto custom_scrollbar">
                <div className="px-2 md:px-4">
                  <TemplateSelection
                    selectedTemplate={selectedTemplate}
                    onSelectTemplate={setSelectedTemplate}
                  />
                </div>
              </TabsContent>

              <TabsContent value={TABS.MODELS} className="h-[calc(100vh-16rem)] overflow-y-auto custom_scrollbar">
                <div>
                  <ModelSelection
                    selectedPptModel={selectedPptModel}
                    onSelectPptModel={setSelectedPptModel}
                    selectedImageModel={selectedImageModel}
                    onSelectImageModel={setSelectedImageModel}
                  />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Fixed Button */}
        <div className="px-2 md:px-4 py-4 border-t border-gray-200">
          <div className="max-w-[1200px] mx-auto">
            <GenerateButton
              outlineCount={outlines.length}
              loadingState={loadingState}
              streamState={streamState}
              selectedTemplate={selectedTemplate}
              selectedPptModel={selectedPptModel}
              selectedImageModel={selectedImageModel}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default OutlinePage;