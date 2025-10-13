import { ApiResponseHandler, ApiError } from './api-error-handler';
import { getFetchOptions } from './header';
import type { ImageGenerate, IconSearch, PreviousGeneratedImagesResponse } from './params';

/**
 * PresentationGenerationApi - Utility class for handling presentation generation related API calls
 */
export class PresentationGenerationApi {
  // UPLOAD DOCUMENTS
  static async uploadDoc(formData: FormData): Promise<any> {
    try {
      const response = await fetch('/api/v1/ppt/files/upload', getFetchOptions('POST', formData, true));
      return await ApiResponseHandler.handleResponse(response, 'Failed to upload document');
    } catch (error) {
      console.error('error in document upload', error);
      throw error;
    }
  }

  // DECOMPOSE DOCUMENTS
  static async decomposeDocuments(docIds: string[]): Promise<any> {
    try {
      const response = await fetch('/api/v1/ppt/files/decompose', getFetchOptions('POST', JSON.stringify({ file_paths: docIds })));
      return await ApiResponseHandler.handleResponse(response, 'Failed to decompose documents');
    } catch (error) {
      console.error('error in document decomposition', error);
      throw error;
    }
  }

  // CREATE PRESENTATION
  static async createPresentation(generationConfig: any): Promise<any> {
    try {
      const response = await fetch('/api/v1/ppt/presentation/create', getFetchOptions('POST', JSON.stringify(generationConfig)));
      return await ApiResponseHandler.handleResponse(response, 'Failed to create presentation');
    } catch (error) {
      console.error('error in presentation creation', error);
      throw error;
    }
  }

  // EDIT SLIDE
  static async editSlide(
    slide_id: string,
    prompt: string
  ) {
    try {
      const response = await fetch(
        '/api/v1/ppt/slide/edit',
        getFetchOptions("POST", JSON.stringify({
          id: slide_id,
          prompt,
        }))
      );

      return await ApiResponseHandler.handleResponse(response, "Failed to update slide");
    } catch (error) {
      console.error("error in slide update", error);
      throw error;
    }
  }

  // UPDATE PRESENTATION CONTENT
  static async updatePresentationContent(body: any) {
    try {
      const response = await fetch(
        '/api/v1/ppt/presentation/update',
        getFetchOptions("PATCH", JSON.stringify(body))
      );
      
      return await ApiResponseHandler.handleResponse(response, "Failed to update presentation content");
    } catch (error) {
      console.error("error in presentation content update", error);
      throw error;
    }
  }

  // PREPARE PRESENTATION
  static async presentationPrepare(presentationData: any) {
    try {
      const response = await fetch(
        '/api/v1/ppt/presentation/prepare',
        getFetchOptions("POST", JSON.stringify(presentationData))
      );
      
      return await ApiResponseHandler.handleResponse(response, "Failed to prepare presentation");
    } catch (error) {
      console.error("error in data generation", error);
      throw error;
    }
  }
  
  // IMAGE AND ICON SEARCH
  
  // GENERATE IMAGE
  static async generateImage(imageGenerate: ImageGenerate) {
    try {
      const response = await fetch(
        `/api/v1/ppt/images/generate?prompt=${imageGenerate.prompt}`,
        getFetchOptions("GET", null,)
      );
      
      return await ApiResponseHandler.handleResponse(response, "Failed to generate image");
    } catch (error) {
      console.error("error in image generation", error);
      throw error;
    }
  }

  // GET PREVIOUS GENERATED IMAGES
  static getPreviousGeneratedImages = async (): Promise<PreviousGeneratedImagesResponse[]> => {
    try {
      const response = await fetch(
        '/api/v1/ppt/images/generated',
        getFetchOptions("GET")
      );
      
      return await ApiResponseHandler.handleResponse(response, "Failed to get previous generated images");
    } catch (error) {
      console.error("error in getting previous generated images", error);
      throw error;
    }
  }
  
  // SEARCH ICONS
  static async searchIcons(iconSearch: IconSearch) {
    try {
      const response = await fetch(
        `/api/v1/ppt/icons/search?query=${iconSearch.query}&limit=${iconSearch.limit}`,
        getFetchOptions("GET", null)
      );
      
      return await ApiResponseHandler.handleResponse(response, "Failed to search icons");
    } catch (error) {
      console.error("error in icon search", error);
      throw error;
    }
  }

  // EXPORT PRESENTATION
  static async exportAsPPTX(presentationData: any) {
    try {
      // 记录导出请求，包含字体信息
      console.log('Exporting presentation with fonts:', presentationData.fonts?.map((f: any) => f.name));
      
      const response = await fetch(
        '/api/v1/ppt/presentation/export/pptx',
        getFetchOptions("POST", JSON.stringify(presentationData))
      );
      return await ApiResponseHandler.handleResponse(response, "Failed to export as PowerPoint");
    } catch (error) {
      console.error("error in pptx export", error);
      throw error;
    }
  }
}