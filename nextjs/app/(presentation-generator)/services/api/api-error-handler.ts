// API Error Response Interface
interface ApiErrorResponse {
  detail?: string;
  message?: string;
  error?: string;
}

// Custom ApiError class for better error handling
export class ApiError extends Error {
  public statusCode?: number;
  public isAuthenticationError: boolean;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode;
    this.isAuthenticationError = statusCode === 401 || statusCode === 403;
    this.name = 'ApiError';
  }
}

// API Response Handler Utility
export class ApiResponseHandler {
 
  static async handleResponse(response: Response, defaultErrorMessage: string): Promise<any> {
    // Handle successful responses
    if (response.ok) {
      // Handle 204 No Content responses
      if (response.status === 204) {
        return true;
      }
      
      // Try to parse JSON response
      try {
        return await response.json();
      } catch (error) {
        // If JSON parsing fails but response is ok, return empty object
        return {};
      }
    }

    // Handle authentication errors
    if (response.status === 401 || response.status === 403) {
      // Redirect to auth page or show login prompt
      // We'll handle this in the UI layer
      const errorMessage = response.status === 401 
        ? 'Authentication required. Please log in.' 
        : 'You do not have permission to access this resource.';
      
      throw new ApiError(errorMessage, response.status);
    }

    // Handle other error responses
    let errorMessage = defaultErrorMessage;
    
    try {
      const errorData: ApiErrorResponse = await response.json();
      
      // Extract error message in order of preference
      if (errorData.detail) {
        errorMessage = errorData.detail;
      } else if (errorData.message) {
        errorMessage = errorData.message;
      } else if (errorData.error) {
        errorMessage = errorData.error;
      }
    } catch (parseError) {
      // If JSON parsing fails, use status-based messages
      errorMessage = this.getStatusBasedErrorMessage(response.status, defaultErrorMessage);
    }

    // Throw error with appropriate message
    throw new ApiError(errorMessage, response.status);
  }

  static getStatusBasedErrorMessage(status: number, defaultMessage: string): string {
    const statusMessages: Record<number, string> = {
      400: 'Bad request. Please check your input.',
      401: 'Authentication required. Please log in.',
      403: 'Forbidden. You do not have permission to access this resource.',
      404: 'Resource not found.',
      409: 'Conflict. The request could not be completed due to a conflict.',
      500: 'Internal server error. Please try again later.',
      503: 'Service unavailable. Please try again later.',
    };
    
    return statusMessages[status] || defaultMessage;
  }

  static async handleResponseWithResult(response: Response, defaultErrorMessage: string): Promise<{success: boolean, message?: string}> {
    try {
      // Handle successful responses
      if (response.ok) {
        try {
          const data = await response.json();
          return { success: true, message: data.message };
        } catch {
          return { success: true };
        }
      }

      // Handle error responses
      let errorMessage = defaultErrorMessage;
      
      try {
        const errorData: ApiErrorResponse = await response.json();
        
        // Extract error message in order of preference
        if (errorData.detail) {
          errorMessage = errorData.detail;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        }
      } catch (parseError) {
        // If JSON parsing fails, use status-based messages
        errorMessage = this.getStatusBasedErrorMessage(response.status, defaultErrorMessage);
      }

      return {
        success: false,
        message: errorMessage,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : defaultErrorMessage,
      };
    }
  }
}

export type { ApiErrorResponse };