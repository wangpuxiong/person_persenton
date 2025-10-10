import React, { useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ModelOption, MODEL_OPTIONS } from "../../upload/type";

import { Dispatch, SetStateAction } from "react";

export interface ModelSelectionProps {
  selectedPptModel: ModelOption | null;
  onSelectPptModel: (model: ModelOption) => void;
  selectedImageModel: ImageModelType | null;
  onSelectImageModel: Dispatch<SetStateAction<ImageModelType | null>>;
}

// 图像生成模型选项
export const IMAGE_MODEL_OPTIONS: ModelOption[] = [
  { name: "gemini-2.5-flash-image-preview", provider: "Google" },
  // { name: "Stable Image Core", provider: "Stability AI" },
  // { name: "Stable 3.5 Large", provider: "Stability AI" },
  // { name: "Stable 3.5 Large Medium", provider: "Stability AI" },
  // { name: "Imagen 4.0", provider: "Google" },
  // { name: "Imagen 4.0 Fast", provider: "Google" },
  // { name: "Imagen 4.0 Ultra", provider: "Google" }
];

export type ImageModelType = typeof IMAGE_MODEL_OPTIONS[number];

const ModelSelection: React.FC<ModelSelectionProps> = ({
  selectedPptModel,
  onSelectPptModel,
  selectedImageModel,
  onSelectImageModel
}) => {
  // 查找默认的 PPT 生成模型，这里假设 MODEL_OPTIONS 中存在 gpt 4.1
  const DEFAULT_PPT_MODEL = MODEL_OPTIONS.find(model => model.name === 'gpt-4.1');
  // 默认的图像生成模型
  const DEFAULT_IMAGE_MODEL = IMAGE_MODEL_OPTIONS.find(model => model.name === 'gemini-2.5-flash-image-preview');

  // 确保默认模型存在
  useEffect(() => {
    if (!selectedPptModel && DEFAULT_PPT_MODEL) {
      onSelectPptModel(DEFAULT_PPT_MODEL);
    }
    if (!selectedImageModel && DEFAULT_IMAGE_MODEL) {
      onSelectImageModel(DEFAULT_IMAGE_MODEL);
    }
  }, [selectedPptModel, onSelectPptModel, selectedImageModel, onSelectImageModel, DEFAULT_PPT_MODEL, DEFAULT_IMAGE_MODEL])

  return (
    <div className="space-y-8 mb-4 p-6">
      {/* PPT 生成模型选择 */}
      <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Presentation Generation Model</h3>
        <p className="text-sm text-gray-600 mb-4">Choose the AI model that will generate the content for your presentation.</p>
        <RadioGroup 
          value={selectedPptModel ? JSON.stringify(selectedPptModel) : ''} 
          onValueChange={(value) => onSelectPptModel(JSON.parse(value))} 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
        >
          {MODEL_OPTIONS.map((model) => (
            <div key={`${model.provider}-${model.name}`} className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-blue-100 transition-colors">
              <RadioGroupItem 
                value={JSON.stringify(model)} 
                id={`ppt-model-${model.name}`} 
                className="text-blue-600 border-blue-300"
              />
              <Label 
                htmlFor={`ppt-model-${model.name}`} 
                className="flex-1 text-sm font-medium cursor-pointer"
              >
                {model.name} <span className="text-xs text-gray-500">({model.provider})</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* 图像生成模型选择 */}
      <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Image Generation Model</h3>
        <p className="text-sm text-gray-600 mb-4">Choose the AI model that will generate images for your presentation slides.</p>
        <RadioGroup 
          value={selectedImageModel ? JSON.stringify(selectedImageModel) : ''} 
          onValueChange={(value) => onSelectImageModel(JSON.parse(value))} 
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {IMAGE_MODEL_OPTIONS.map((model) => (
            <div key={`${model.provider}-${model.name}`} className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-blue-100 transition-colors">
              <RadioGroupItem 
                value={JSON.stringify(model)} 
                id={`image-model-${model.name}`} 
                className="text-blue-600 border-blue-300"
              />
              <Label 
                htmlFor={`image-model-${model.name}`} 
                className="flex-1 text-sm font-medium cursor-pointer"
              >
                {model.name} <span className="text-xs text-gray-500">({model.provider})</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* 提示信息 */}
      <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-100">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> The selected models will be used to generate your presentation content and images. 
          Different models may produce different results in terms of quality, style, and processing time.
        </p>
      </div>
    </div>
  );
};

export default ModelSelection;