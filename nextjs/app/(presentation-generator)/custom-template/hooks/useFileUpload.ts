'use client'
import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useFileUpload = () => {
  const { t } = useTranslation('template');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type
      const lowerName = file.name.toLowerCase();
      const isPptx = lowerName.endsWith(".pptx");
      const isPdf = lowerName.endsWith(".pdf");
      if (!isPptx && !isPdf) {
        toast.error(t("invalidFileFormat"));
        return;
      }

      // Validate file size (100MB limit)
      const maxSize = 100 * 1024 * 1024; // 100MB
      if (file.size > maxSize) {
        toast.error(t("fileSizeExceeded"));
        return;
      }

      setSelectedFile(file);
    },
    []
  );

  const removeFile = useCallback(() => {
    setSelectedFile(null);
  }, []);

  return {
    selectedFile,
    handleFileSelect,
    removeFile,
  };
}; 