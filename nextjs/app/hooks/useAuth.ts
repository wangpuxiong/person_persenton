import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  checkAuthentication: () => Promise<boolean>;
  handleAuthError: () => void;
}

/**
 * Hook to manage user authentication state and handle token verification
 */
export const useAuth = (): AuthState => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // 检查用户是否已登录
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/v1/auth/user');
        if (response.ok) {
          setIsAuthenticated(true);
          setError(null);
        } else {
          setIsAuthenticated(false);
          // 不设置错误，因为如果用户未登录，这是预期的
        }
      } catch (err) {
        console.error('Error checking session:', err);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  /**
   * 检查用户认证状态
   * @returns Promise<boolean> 认证是否成功
   */
  const checkAuthentication = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/v1/auth/user');
      const isAuth = response.ok;
      setIsAuthenticated(isAuth);
      return isAuth;
    } catch (err) {
      console.error('Error checking authentication:', err);
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 处理认证错误
   */
  const handleAuthError = (): void => {
    setIsAuthenticated(false);
    setError('Authentication error occurred');
    // 未经验证的用户，不可用系统
    router.push('/auth');
  };

  return {
    isAuthenticated,
    isLoading,
    error,
    checkAuthentication,
    handleAuthError,
  };
};

/**
 * 处理API调用的身份验证的Hook
 */
export const useApiAuth = () => {
  const { isAuthenticated, isLoading, error } = useAuth();

  // 检查是否应该继续请求
  const shouldProceed = () => {
    if (isLoading) {
      throw new Error('Authentication status is loading');
    }
    
    if (!isAuthenticated) {
      throw new Error('User not authenticated');
    }
    
    if (error) {
      throw new Error(error);
    }
    
    return true;
  };

  return {
    shouldProceed,
    isAuthenticated,
    isLoading,
    error
  };
};