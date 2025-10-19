"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Check, ChevronsUpDown, Info } from "lucide-react";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import GoogleConfig from "./GoogleConfig";
import AnthropicConfig from "./AnthropicConfig";
import CustomConfig from "./CustomConfig";
import {
  updateLLMConfig,
  changeProvider as changeProviderUtil,
} from "@/utils/providerUtils";
import { IMAGE_PROVIDERS, LLM_PROVIDERS } from "@/utils/providerConstants";
import { LLMConfig } from "@/types/llm_config";

// Button state interface
interface ButtonState {
  isLoading: boolean;
  isDisabled: boolean;
  text: string;
  showProgress: boolean;
  progressPercentage?: number;
  status?: string;
}

interface LLMProviderSelectionProps {
  initialLLMConfig: LLMConfig;
  onConfigChange: (config: LLMConfig) => void;
  buttonState: ButtonState;
  setButtonState: (state: ButtonState | ((prev: ButtonState) => ButtonState)) => void;
}

export default function LLMProviderSelection({
  initialLLMConfig,
  onConfigChange,
  setButtonState,
}: LLMProviderSelectionProps) {
  const [llmConfig, setLlmConfig] = useState<LLMConfig>(initialLLMConfig);
  const [openImageProviderSelect, setOpenImageProviderSelect] = useState(false);

  useEffect(() => {
    onConfigChange(llmConfig);
  }, [llmConfig]);

  useEffect(() => {
    const needsModelSelection =
      (llmConfig.LLM === "openai" && !llmConfig.OPENAI_MODEL) ||
      (llmConfig.LLM === "google" && !llmConfig.GOOGLE_MODEL) ||
      (llmConfig.LLM === "ollama" && !llmConfig.OLLAMA_MODEL) ||
      (llmConfig.LLM === "custom" && !llmConfig.CUSTOM_MODEL) ||
      (llmConfig.LLM === "anthropic" && !llmConfig.ANTHROPIC_MODEL);

    const needsApiKey =
      ((llmConfig.IMAGE_PROVIDER === "dall-e-3" || llmConfig.LLM === "openai") && !llmConfig.OPENAI_API_KEY) ||
      ((llmConfig.IMAGE_PROVIDER === "gemini_flash" || llmConfig.LLM === "google") && !llmConfig.GOOGLE_API_KEY) ||
      (llmConfig.LLM === "anthropic" && !llmConfig.ANTHROPIC_API_KEY) ||
      (llmConfig.IMAGE_PROVIDER === "pexels" && !llmConfig.PEXELS_API_KEY) ||
      (llmConfig.IMAGE_PROVIDER === "pixabay" && !llmConfig.PIXABAY_API_KEY);

    const needsOllamaUrl = (llmConfig.LLM === "ollama" && !llmConfig.OLLAMA_URL);

    setButtonState({
      isLoading: false,
      isDisabled: needsModelSelection || needsApiKey || needsOllamaUrl,
      text: needsModelSelection ? "Please Select a Model" : needsApiKey ? "Please Enter API Key" : needsOllamaUrl ? "Please Enter Ollama URL" : "Save Configuration",
      showProgress: false
    });

  }, [llmConfig]);

  const input_field_changed = (new_value: string | boolean, field: string) => {
    const updatedConfig = updateLLMConfig(llmConfig, field, new_value);
    setLlmConfig(updatedConfig);
  };

  const handleProviderChange = (provider: string) => {
    const newConfig = changeProviderUtil(llmConfig, provider);
    setLlmConfig(newConfig);
  };

  useEffect(() => {
    if (!llmConfig.USE_CUSTOM_URL) {
      setLlmConfig({ ...llmConfig, OLLAMA_URL: "http://localhost:11434" });
    } else {
      if (!llmConfig.OLLAMA_URL) {
        setLlmConfig({ ...llmConfig, OLLAMA_URL: "http://localhost:11434" });
      }
    }
  }, [llmConfig.USE_CUSTOM_URL]);

  useEffect(() => {
    let updates: any = {};
    if (!llmConfig.IMAGE_PROVIDER) {
      if (llmConfig.LLM === "openai") {
        updates.IMAGE_PROVIDER = "dall-e-3";
      } else if (llmConfig.LLM === "google") {
        updates.IMAGE_PROVIDER = "gemini_flash";
      } else {
        updates.IMAGE_PROVIDER = "pexels";
      }
    }
    if (!llmConfig.OLLAMA_URL) {
      updates.OLLAMA_URL = "http://localhost:11434";
    }
    setLlmConfig({ ...llmConfig, ...updates });
  }, []);

  return (
    <div className="h-full flex flex-col mt-10">
      {/* Provider Selection - 已禁用 */}
      <div className="p-2 rounded-2xl border border-gray-200 bg-gray-100">
        <div className="text-center py-4">
          <p className="text-gray-500 text-sm">模型选择功能已被管理员禁用</p>
        </div>
      </div>


      {/* Scrollable Content - 已禁用 */}
      <div className="flex-1 overflow-y-auto p-6 pt-0 custom_scrollbar">
        <div className="text-center py-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">配置功能已禁用</h3>
            <p className="text-gray-500 text-sm">
              所有模型配置功能已被管理员禁用。请联系管理员获取更多信息。
            </p>
          </div>
        </div>

        {/* Image Provider Selection - 已禁用 */}
        <div className="my-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Image Provider
          </label>
          <div className="w-full">
            <input
              type="text"
              value="图像提供者选择已禁用"
              disabled
              className="w-full px-4 py-2.5 outline-none border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
              placeholder="图像提供者选择已禁用"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500 flex items-center gap-2">
            <span className="block w-1 h-1 rounded-full bg-gray-400"></span>
            图像提供者选择功能已被管理员禁用
          </p>
        </div>

        {/* Dynamic API Key Input for Image Provider - 已禁用 */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            API Key 配置
          </label>
          <div className="relative">
            <input
              type="text"
              value="API Key 配置已禁用"
              disabled
              className="w-full px-4 py-2.5 outline-none border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
              placeholder="API Key 配置已禁用"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500 flex items-center gap-2">
            <span className="block w-1 h-1 rounded-full bg-gray-400"></span>
            API Key 配置功能已被管理员禁用
          </p>
        </div>

        {/* Model Information - 已禁用 */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">
                模型信息
              </h3>
              <p className="text-sm text-gray-500">
                模型配置功能已被管理员禁用。请联系管理员获取更多信息。
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
} 