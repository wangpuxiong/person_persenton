'use client'
import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { clearPresentationData } from "@/store/slices/presentationGeneration";
import { PresentationGenerationApi } from "../../services/api/presentation-generation";
import { Template, LoadingState, TABS } from "../types/index";
import { ModelOption } from "../../upload/type";
import { MixpanelEvent, trackEvent } from "@/utils/mixpanel";
import { ImageModelType } from "../components/ModelSelection";

const DEFAULT_LOADING_STATE: LoadingState = {
  message: "",
  isLoading: false,
  showProgress: false,
  duration: 0,
};

export const usePresentationGeneration = (
  presentationId: string | null,
  outlines: { content: string }[] | null,
  selectedTemplate: Template | null,
  selectedPptModel: ModelOption | null,
  selectedImageModel: ImageModelType | null,
  setActiveTab: (tab: string) => void
) => {
  const { t } = useTranslation('outline');
  const dispatch = useDispatch();
  const router = useRouter();
  const [loadingState, setLoadingState] = useState<LoadingState>(DEFAULT_LOADING_STATE);

  const validateInputs = useCallback(() => {
    if (!outlines || outlines.length === 0) {
      toast.error(t('noOutlines'), {
        description: t('waitForOutlinesToLoadBeforeGeneratingPresentation'),
      });
      return false;
    }

    if (!selectedTemplate) {
      toast.error(t('selectLayoutGroup'), {
        description: t('selectLayoutGroupBeforeGeneratingPresentation'),
      });
      return false;
    }
    if (!selectedTemplate.slides.length) {
      toast.error(t('noSlideSchemaFound'), {
        description: t('selectGroupBeforeGeneratingPresentation'),
      });
      return false;
    }

    if (!selectedPptModel) {
      toast.error(t('selectAIModel'), {
        description: t('selectAIModelBeforeGeneratingPresentation'),
      });
      return false;
    }

    if (!selectedImageModel) {
      toast.error(t('selectImageModel'), {
        description: t('selectImageModelBeforeGeneratingPresentation'),
      });
      return false;
    }

    return true;
  }, [outlines, selectedTemplate, selectedPptModel, selectedImageModel]);

  const prepareLayoutData = useCallback(() => {
    if (!selectedTemplate) return null;
    return {
      name: selectedTemplate.name,
      ordered: selectedTemplate.ordered,
      slides: selectedTemplate.slides
    };
  }, [selectedTemplate]);

  const handleSubmit = useCallback(async () => {
    if (!selectedTemplate) {
      setActiveTab(TABS.LAYOUTS);
      return;
    }
    if (!selectedPptModel || !selectedImageModel) {
      setActiveTab(TABS.MODELS);
      return;
    }
    if (!validateInputs()) return;



    setLoadingState({
      message: t('generatingPresentationData'),
      isLoading: true,
      showProgress: true,
      duration: 30,
    });

    try {
      const layoutData = prepareLayoutData();

      if (!layoutData) return;
      trackEvent(MixpanelEvent.Presentation_Prepare_API_Call);
      const response = await PresentationGenerationApi.presentationPrepare({
        presentation_id: presentationId,
        outlines: outlines,
        layout: layoutData,
        title: undefined,
        model: selectedPptModel,
        image_model: selectedImageModel
      });

      if (response) {
        dispatch(clearPresentationData());
        router.replace(`/presentation?id=${presentationId}&stream=true`);
      }
    } catch (error: any) {
      console.error('Error In Presentation Generation(prepare).', error);
      toast.error(t('generationError'), {
        description: error.message || t('errorInPresentationGenerationPrepare'),
      });
    } finally {
      setLoadingState(DEFAULT_LOADING_STATE);
    }
  }, [validateInputs, prepareLayoutData, presentationId, outlines, dispatch, router, selectedTemplate, selectedPptModel, selectedImageModel]);

  return { loadingState, handleSubmit };
};