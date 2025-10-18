'use client'

import React from "react";
import { useTranslation } from "react-i18next";

import SlideContent from "../SlideContent";
import { SlideContentDisplayProps } from "../../types";
import { Repeat2 } from "lucide-react";
import Timer from "../Timer";

export const SlideContentDisplay: React.FC<SlideContentDisplayProps> = ({
  slide,
  isEditMode,
  isHtmlEditMode,
  slideContentRef,
  slideDisplayRef,
  canvasRef,
  canvasDimensions,
  eraserMode,
  strokeWidth,
  strokeColor,
  isDrawing,
  didYourDraw,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  retrySlide,
}) => {
  const { t } = useTranslation('template');
  // Don't show slide content when in HTML edit mode
  if (isHtmlEditMode) {
    return null;
  }

  if (slide.processing) {
    return (
      <div className="space-y-4">
        <p className="text-base text-blue-600 font-medium">🔄 {t('convertingToHtml')}</p>
        <div className="space-y-3">
          <Timer duration={160} />
        </div>
         <div className="animate-pulse space-y-3">
        <div className="h-6 bg-gray-200 rounded w-2/3"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
      </div>
    );
  }

  if (slide.processed && slide.html) {
    return (
      <div className="relative">
        {slide.convertingToReact && (
          <div className="mb-4">
            <p className="text-sm text-purple-700 font-medium mb-1">⚙️ {t('convertingToReact')}</p>
            <Timer duration={90} />
          </div>
        )}
        <div ref={slideDisplayRef} className="relative mx-auto w-full">
          <div ref={slideContentRef}>
            <SlideContent slide={slide} />
          </div>
          {isEditMode && (
            <canvas
              ref={canvasRef}
              width={canvasDimensions.width}
              height={canvasDimensions.height}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 30,
                cursor: eraserMode ? "grab" : "crosshair",
                pointerEvents: "auto",
                touchAction: "none",
              }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onContextMenu={(e) => e.preventDefault()}
            />
          )}
        </div>
      </div>
    );
  }

  if (slide.error) {
    return (
      <div className="space-y-4">
        <p className="text-base text-red-600 font-medium">✗ {t('conversionFailed')}</p>
        <div className="text-sm text-gray-700 p-4 bg-red-50 rounded border border-red-200">
          {slide.error.includes("image exceeds 5 MB maximum") ? (
            <div>
              <p className="font-medium text-red-700 mb-2">Image too large for processing</p>
              <p>This slide's image exceeds the 5MB limit. Try using a smaller resolution PPTX file.</p>
            </div>
          ) : (
            slide.error
          )}
        </div>
        <div className="flex justify-center">
          <button className="bg-red-50 flex gap-2 items-center rounded border border-red-200 px-4 py-2 " onClick={() => retrySlide(slide.slide_number)}>
            <Repeat2 className="w-4 h-4" />{t('retry')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-base text-gray-500">⏳ {t('waitingInQueueToProcess')}</p>
      <div className="animate-pulse space-y-3">
        <div className="h-6 bg-gray-200 rounded w-2/3"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}; 