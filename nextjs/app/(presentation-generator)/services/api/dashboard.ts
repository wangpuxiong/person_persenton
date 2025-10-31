import { getFetchOptions } from "@/app/(presentation-generator)/services/api/header";
import { ApiResponseHandler } from "@/app/(presentation-generator)/services/api/api-error-handler";

export interface PresentationResponse {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  data: any | null;
  file: string;
  n_slides: number;
  prompt: string;
  summary: string | null;
  theme: string;
  titles: string[];
  user_id: string;
  vector_store: any;
  thumbnail: string;
  slides: any[];
  webSearchResources?: any;
  reference_markers?: any[];
}

export class DashboardApi {

  static async getPresentations(): Promise<PresentationResponse[]> {
    try {
      const response = await fetch(
        `/api/v1/ppt/presentation/all`,
        getFetchOptions("GET")
      );
      
      // Handle the special case where 404 means "no presentations found"
      if (response.status === 404) {
        console.log("No presentations found");
        return [];
      }
      
      return await ApiResponseHandler.handleResponse(response, "Failed to fetch presentations");
    } catch (error) {
      console.error("Error fetching presentations:", error);
      throw error;
    }
  }
  
  static async getPresentation(id: string) {
    try {
      const response = await fetch(
        `/api/v1/ppt/presentation/${id}`,
        getFetchOptions("GET")
      );
      
      return await ApiResponseHandler.handleResponse(response, "Presentation not found");
    } catch (error) {
      console.error("Error fetching presentation:", error);
      throw error;
    }
  }
  
  static async deletePresentation(presentation_id: string) {
    try {
      const response = await fetch(
        `/api/v1/ppt/presentation/${presentation_id}`,
        getFetchOptions("DELETE")
      );

      return await ApiResponseHandler.handleResponseWithResult(response, "Failed to delete presentation");
    } catch (error) {
      console.error("Error deleting presentation:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to delete presentation",
      };
    }
  }
}
