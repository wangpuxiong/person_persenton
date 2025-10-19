'use client'
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setPresentationData } from "@/store/slices/presentationGeneration";
import { DashboardApi } from '../../services/api/dashboard';
import {  clearHistory } from "@/store/slices/undoRedoSlice";


export const usePresentationData = (
  presentationId: string,
  setLoading: (loading: boolean) => void,
  setError: (error: boolean) => void
) => {
  const { t } = useTranslation("presentation");
  const dispatch = useDispatch();

  const fetchUserSlides = useCallback(async () => {
    try {
      const data = await DashboardApi.getPresentation(presentationId);
      if (data) {
        dispatch(setPresentationData(data));
        dispatch(clearHistory());
        setLoading(false);
      }
    } catch (error) {
      setError(true);
      toast.error(t('failed_to_load_presentation'));
      console.error("Error fetching user slides:", error);
      setLoading(false);
    }
  }, [presentationId, dispatch, setLoading, setError, t]);

  return {
    fetchUserSlides,
  };
};
