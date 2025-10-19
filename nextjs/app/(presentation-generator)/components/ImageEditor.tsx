"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Upload, Loader2, Delete, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { PresentationGenerationApi } from "../services/api/presentation-generation";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { PreviousGeneratedImagesResponse } from "../services/api/params";
import { trackEvent, MixpanelEvent } from "@/utils/mixpanel";
import { ImagesApi } from "../services/api/images";
import { ImageAssetResponse } from "../services/api/types";
import { useTranslation } from "next-i18next";
interface ImageEditorProps {
  initialImage: string | null;
  imageIdx?: number;
  slideIndex: number;
  className?: string;
  promptContent?: string;
  properties?: null | any;
  onClose?: () => void;
  onImageChange?: (newImageUrl: string, prompt?: string) => void;
  onFocusPointClick?: (propertiesData: any) => void;
}

const ImageEditor = ({
  initialImage,
  imageIdx = 0,
  promptContent,
  properties,
  onClose,
  onFocusPointClick,
  onImageChange,
}: ImageEditorProps) => {
  const { t } = useTranslation('component')
  // State management
  const [previewImages, setPreviewImages] = useState(initialImage);
  const [previousGeneratedImages, setPreviousGeneratedImages] = useState<
    PreviousGeneratedImagesResponse[]
  >([]);
  const [prompt, setPrompt] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [uploadedImages, setUploadedImages] = useState<ImageAssetResponse[]>([]);
  const [uploadedImagesLoading, setUploadedImagesLoading] = useState(false);
  // Focus point and object fit for image editing
  const [isFocusPointMode, setIsFocusPointMode] = useState(false);
  const [focusPoint, setFocusPoint] = useState(
    (properties &&
      properties[imageIdx] &&
      properties[imageIdx].initialFocusPoint) || {
      x: 50,
      y: 50,
    }
  );
  const [objectFit, setObjectFit] = useState<"cover" | "contain" | "fill">(
    (properties &&
      properties[imageIdx] &&
      properties[imageIdx].initialObjectFit) ||
      "cover"
  );

  // Refs
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setPreviewImages(initialImage);
  }, [initialImage]);

  useEffect(() => {
    if (isOpen && !previousGeneratedImages.length) {
      getPreviousGeneratedImage();
    }
  }, [isOpen]);

  // Handle close with animation
  const handleClose = () => {

    setIsOpen(false);
    // Delay the actual close to allow animation to complete
    setTimeout(() => {
      onClose?.();
    }, 300); // Match the Sheet animation duration
  };

  const getPreviousGeneratedImage = async () => {
    try {
      trackEvent(MixpanelEvent.ImageEditor_GetPreviousGeneratedImages_API_Call);
      const response =
        await PresentationGenerationApi.getPreviousGeneratedImages();
      setPreviousGeneratedImages(response);
    } catch (error: any) {
      toast.error(t('image_editor.get_previous_error'));
      console.error("error in getting previous generated images", error);
      setError(
        error.message ||
          "Failed to get previous generated images. Please try again."
      );
    }
  };

  /**
   * Handles image selection and calls the parent callback
   */
  const handleImageChange = (newImage: string) => {
    if (onImageChange) {
      onImageChange(newImage, promptContent);
      setPreviewImages(newImage);
    }
  };

  /**
   * Handles focus point adjustment when clicking on the image
   */
  const handleFocusPointClick = (e: React.MouseEvent) => {
    if (!isFocusPointMode || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = Math.max(
      0,
      Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
    );
    const y = Math.max(
      0,
      Math.min(100, ((e.clientY - rect.top) / rect.height) * 100)
    );

    setFocusPoint({ x, y });
    saveImageProperties(objectFit, { x, y });

    // Apply the focus point in real-time
    if (imageRef.current) {
      imageRef.current.style.objectPosition = `${x}% ${y}%`;
    }
  };

  /**
   * Toggles focus point adjustment mode
   */
  const toggleFocusPointMode = () => {
    if (isFocusPointMode) {
      saveImageProperties(objectFit, focusPoint);
    }
    setIsFocusPointMode(!isFocusPointMode);
  };

  /**
   * Handles object fit change
   */
  const handleFitChange = (fit: "cover" | "contain" | "fill") => {
    setObjectFit(fit);

    if (imageRef.current) {
      imageRef.current.style.objectFit = fit;
    }

    saveImageProperties(fit, focusPoint);
  };

  /**
   * Saves image properties (focus point and object fit)
   */
  const saveImageProperties = (
    fit: "cover" | "contain" | "fill",
    focusPoint: { x: number; y: number }
  ) => {
    const propertiesData = {
      initialObjectFit: fit,
      initialFocusPoint: focusPoint,
    };
    // TODO: Save to Redux store if needed
    onFocusPointClick?.(propertiesData);
  };

  /**
   * Generates new images using AI
   */
  const handleGenerateImage = async () => {
    if (!prompt) {
      setError(t('image_editor.generate.enter_prompt'));
      return;
    }
    try {
      setIsGenerating(true);
      setError(null);
      trackEvent(MixpanelEvent.ImageEditor_GenerateImage_API_Call);
      const response = await PresentationGenerationApi.generateImage({
        prompt: prompt,
      });

      setPreviewImages(response);
    } catch (err: any) {
      console.error("Error in image generation", err);
      setError(err.message || t('image_editor.generate.error'));
    } finally {
      setIsGenerating(false);
    }
  };

  /**
   * Handles file upload
   */
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError(t('image_editor.upload.file_too_large'));
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError(t('image_editor.upload.invalid_file_type'));
      return;
    }
    try {
      setIsUploading(true);
      setUploadError(null);
      trackEvent(MixpanelEvent.ImageEditor_UploadImage_API_Call);
      const result = await ImagesApi.uploadImage(file);
      setUploadedImageUrl(result.path);
    } catch (err:any) {
      setUploadError(t('image_editor.upload.upload_failed'));
      toast.error(err.message || t('image_editor.upload.upload_failed'));
      console.log("Upload error:", err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const getUploadedImages = async () => {
    try {
      setUploadedImagesLoading(true);
      const result = await ImagesApi.getUploadedImages();
      setUploadedImages(result);
    } catch (err:any) {
      toast.error(err.message || t('image_editor.upload.get_images_failed'));
      console.log("Get uploaded images error:", err.message);
    } finally {
      setUploadedImagesLoading(false);
    }
  };
  const handleTabChange = (value: string) => {
    if (value === "upload") {
      getUploadedImages();
    }
  };

  const handleDeleteImage = async (image_id: string) => {
    try {
      const result = await ImagesApi.deleteImage(image_id);
      setUploadedImages(uploadedImages.filter((image) => image.id !== image_id));
      toast.success(result.message || "Image deleted successfully");
    } catch (err:any) {
      toast.error(err.message || t('image_editor.upload.delete_failed'));
    }
  };
  return (
    <div className="image-editor-container">
      <Sheet open={isOpen} onOpenChange={() => handleClose()}>
        <SheetContent
          side="right"
          className="w-[600px]"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onClick={(e) => e.stopPropagation()}
        >
          <SheetHeader>
            <SheetTitle>{t('image_editor.title')}</SheetTitle>
          </SheetHeader>

          <div className="mt-6">
            <Tabs defaultValue="generate" className="w-full" onValueChange={handleTabChange}>
              <TabsList className="grid bg-blue-100 border border-blue-300 w-full grid-cols-3 mx-auto">
                <TabsTrigger className="font-medium" value="generate">
                  {t('image_editor.tabs.generate')}
                </TabsTrigger>
                <TabsTrigger className="font-medium" value="upload">
                  {t('image_editor.tabs.upload')}
                </TabsTrigger>
                <TabsTrigger className="font-medium" value="edit">
                  {t('image_editor.tabs.edit')}
                </TabsTrigger>
              </TabsList>
              {/* Generate Tab */}
              <TabsContent value="generate" className="mt-4 space-y-4 overflow-y-auto hide-scrollbar h-[85vh]">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">{t('image_editor.generate.current_prompt')}</h3>
                  <p className="text-sm text-gray-500">{promptContent}</p>
                  </div>

                  <div>
                    <h3 className="text-base font-medium mb-2">
                      {t('image_editor.generate.image_description')}
                    </h3>
                    <Textarea
                      placeholder={t('image_editor.generate.description_placeholder')}
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  <Button
                    onClick={handleGenerateImage}
                    className="w-full"
                    disabled={!prompt || isGenerating}
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    {isGenerating ? t('image_editor.generate.generating') : t('image_editor.generate.generate_button')}
                  </Button>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <div className="grid grid-cols-2 gap-4">
                    {isGenerating || !previewImages ? (
                      Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton
                          key={index}
                          className="aspect-[4/3] w-full rounded-lg"
                        />
                      ))
                    ) : (
                      <div
                        onClick={() => handleImageChange(previewImages)}
                        className="aspect-[4/3] w-full overflow-hidden rounded-lg border cursor-pointer hover:border-blue-500 transition-colors"
                      >
                        {previewImages && (
                          <img
                            src={previewImages}
                            alt={`Preview`}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    )}
                  </div>
                  {previousGeneratedImages.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium mb-2">
                        {t('image_editor.generate.previous_images')}
                      </h3>
                      <div className="grid grid-cols-2 gap-4  ">
                        {previousGeneratedImages.map((image) => (
                          <div
                            onClick={() => handleImageChange(image.path)}
                            key={image.id}
                            className="aspect-[4/3] w-full overflow-hidden rounded-lg border cursor-pointer hover:border-blue-500 transition-colors"
                          >
                            <img
                              src={image.path}
                              alt={image.extras.prompt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Upload Tab */}
              <TabsContent value="upload" className="mt-4 space-y-4">
                <div className="space-y-4">
                  <div
                    className={cn(
                      "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                      isUploading
                        ? "border-gray-400 bg-gray-50"
                        : "border-gray-300 hover:border-blue-400"
                    )}
                  >
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                    />
                    <label
                      htmlFor="file-upload"
                      className={cn(
                        "flex flex-col items-center",
                        isUploading ? "cursor-wait" : "cursor-pointer"
                      )}
                    >
                      {isUploading ? (
                        <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mb-2" />
                      ) : (
                        <Upload className="w-8 h-8 text-gray-500 mb-2" />
                      )}
                      <span className="text-sm text-gray-600">
                        {isUploading
                        ? t('image_editor.upload.uploading')
                        : t('image_editor.upload.click_to_upload')}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        {t('image_editor.upload.file_size_limit')}
                      </span>
                    </label>
                  </div>

                  {uploadError && (
                    <p className="text-red-500 text-sm text-center">
                      {uploadError}
                    </p>
                  )}

                  {(uploadedImageUrl || isUploading) && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium mb-2">
                        {t('image_editor.upload.uploaded_image_preview')}
                      </h3>
                      <div className="aspect-[4/3] relative rounded-lg overflow-hidden border border-gray-200">
                        {isUploading ? (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <div className="flex flex-col items-center">
                              <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mb-2" />
                              <span className="text-sm text-gray-500">
                        {t('image_editor.upload.processing')}
                      </span>
                            </div>
                          </div>
                        ) : (
                          uploadedImageUrl && (
                            <div
                              onClick={() =>
                                handleImageChange(uploadedImageUrl)
                              }
                              className="cursor-pointer group w-full h-full"
                            >
                              <img
                                src={uploadedImageUrl}
                                alt="Uploaded preview"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200" />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
                                  {t('image_editor.upload.click_to_use')}
                                </span>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-medium mb-2">{t('image_editor.upload.uploaded_images')}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {uploadedImagesLoading ? (
                        <div className="flex items-center justify-center">
                          <Loader2 className="w-4 h-4 animate-spin" />
                        </div>
                      ) : (
                        uploadedImages.map((image) => (
                          <div key={image.id}>
                            <div
                              onClick={() =>
                                handleImageChange(image.path)
                              }
                              className="cursor-pointer group aspect-[4/3] rounded-lg overflow-hidden relative border border-gray-200"
                            >
                              <Trash className="absolute group-hover:opacity-100 opacity-0 transition-opacity z-10 w-4 h-4 top-2 right-2 text-red-500" onClick={(e) =>{
                                e.stopPropagation();
                                handleDeleteImage(image.id)
                              }}/>
                              <img
                                src={image.path}
                                alt="Uploaded preview"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200" />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-medium">
                                  {t('image_editor.upload.use')}
                                </span>
                              </div>
                            </div>
                          
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="edit" className="mt-4 space-y-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium mb-2">{t('image_editor.edit.current_image')}</h3>
                  <div
                    onClick={(e) => {
                      if (isFocusPointMode) {
                        handleFocusPointClick(e);
                      } else {
                      }
                    }}
                    className="aspect-[4/3] group  rounded-lg overflow-hidden relative border border-gray-200"
                  >
                    <p className="group-hover:opacity-100 opacity-0 transition-opacity absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-center font-medium bg-black/50 text-white px-2 py-1 rounded">
                      {t('image_editor.edit.change_focus_point')}
                    </p>
                    {previewImages && (
                      <img
                        ref={imageRef}
                        onClick={() => {
                          setIsFocusPointMode(true);
                        }}
                        src={previewImages}
                        style={{
                          objectFit: objectFit,
                          objectPosition: `${focusPoint.x}% ${focusPoint.y}%`,
                        }}
                        alt={`Preview`}
                        className="w-full h-full "
                      />
                    )}
                    {isFocusPointMode && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="text-white text-center p-2 bg-black/50 rounded">
                          <p className="text-sm font-medium pointer-events-none">
                          {t('image_editor.edit.set_focus_point')}
                        </p>
                          <button
                            className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFocusPointMode();
                            }}
                          >
                            {t('image_editor.edit.done')}
                          </button>
                        </div>

                        <div
                          className="absolute w-8 h-8 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                          style={{
                            left: `${focusPoint.x}%`,
                            top: `${focusPoint.y}%`,
                            boxShadow: "0 0 0 2px rgba(0,0,0,0.5)",
                          }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <div className="absolute w-16 h-0.5 bg-white/70 left-1/2 -translate-x-1/2"></div>
                          <div className="absolute w-0.5 h-16 bg-white/70 top-1/2 -translate-y-1/2"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Edit Image  */}
                  {/* Object Fit */}
                  {
                    <div>
                      <h3 className="text-sm font-medium mb-2">{t('image_editor.edit.object_fit')}</h3>
                      <div className="flex gap-4">
                        <Button
                          variant="outline"
                          className={cn(
                            objectFit === "cover" &&
                              "bg-blue-50 border-blue-500"
                          )}
                          onClick={() => handleFitChange("cover")}
                        >
                          {t('image_editor.edit.cover')}
                        </Button>
                        <Button
                          variant="outline"
                          className={cn(
                            objectFit === "contain" &&
                              "bg-blue-50 border-blue-500"
                          )}
                          onClick={() => handleFitChange("contain")}
                        >
                          {t('image_editor.edit.contain')}
                        </Button>
                        <Button
                          variant="outline"
                          className={cn(
                            objectFit === "fill" && "bg-blue-50 border-blue-500"
                          )}
                          onClick={() => handleFitChange("fill")}
                        >
                          {t('image_editor.edit.fill')}
                        </Button>
                      </div>
                    </div>
                  }
                  {/* Focus Point */}
                  {}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default React.memo(ImageEditor);
