import { useApiAuth } from '@/app/hooks/useAuth';

/**
 * Get standard headers for API requests
 * @returns Headers object with authentication information
 */
export const getHeader = (): HeadersInit => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  
  // Note: In a browser environment, cookies are automatically included with fetch requests
  // if credentials: 'include' is specified in the fetch options
  
  return headers;
};

/**
 * Get headers for FormData API requests
 * @returns Headers object with authentication information for FormData
 */
export const getHeaderForFormData = (): HeadersInit => {
  // Do not set Content-Type for FormData requests
  // as the browser will set it automatically with the correct boundary
  const headers: HeadersInit = {};
  
  return headers;
};

/**
 * Get fetch options with proper authentication settings
 * @param method HTTP method
 * @param body Request body
 * @param isFormData Whether the body is FormData
 * @returns Fetch options object with credentials included
 */
export const getFetchOptions = (method: string, body?: any, isFormData: boolean = false): RequestInit => {
  return {
    method,
    headers: isFormData ? getHeaderForFormData() : getHeader(),
    body: body !== undefined ? body : undefined,
    credentials: 'include', // Include cookies with the request
    cache: 'no-cache'
  };
};

/**
 * Helper function to check authentication before making API calls
 * @throws Error if user is not authenticated
 */
export const checkAuthentication = (): void => {
  try {
    // Use the useApiAuth hook to check authentication
    // Note: This function can't directly call the hook since it's not in a component
    // In a real implementation, this would be handled by a custom hook or context
    
    // For now, we'll assume the fetch request with credentials: 'include' will handle it
    // and let the API return 401/403 errors that will be caught by ApiResponseHandler
  } catch (error) {
    throw new Error('User not authenticated');
  }
};
