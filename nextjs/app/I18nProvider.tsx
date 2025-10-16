'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { initI18next } from './i18n';

// 创建上下文类型
type I18nContextType = {
  i18n: any;
  isLoading: boolean;
};

// 创建上下文
const I18nContext = createContext<I18nContextType | undefined>(undefined);

// 自定义Hook用于访问上下文
export const useI18nContext = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18nContext must be used within an I18nProvider');
  }
  return context;
};

interface I18nProviderProps {
  children: React.ReactNode;
  lng?: string;
}

const I18nProvider: React.FC<I18nProviderProps> = ({ children, lng = 'en' }) => {
  const [i18n, setI18n] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeI18n = async () => {
      setIsLoading(true);
      try {
        // 使用i18n.ts中的initI18next函数初始化i18n
        const instance = await initI18next(lng, 'common');
        setI18n(instance);
      } catch (error) {
        console.error('Failed to initialize i18n:', error);
        // 错误处理
        setI18n(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeI18n();
  }, [lng]);

  // 在i18n实例加载完成之前显示加载状态
  if (isLoading || !i18n) {
    return <div>Loading translations...</div>;
  }

  return (
    <I18nContext.Provider value={{ i18n, isLoading }}>
      <I18nextProvider i18n={i18n}>
        {children}
      </I18nextProvider>
    </I18nContext.Provider>
  );
};

export default I18nProvider;