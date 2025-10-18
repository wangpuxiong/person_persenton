import { resolve } from 'path';
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
// 确保正确导入config文件中的变量
export const fallbackLng = 'zh-CN';
export const supportedLanguages = ['en', 'zh-CN'];

export const initI18next = async (lng: string, ns: string) => {
  const i18nInstance = createInstance();
  
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => 
      import(`../locales/${language}/${namespace}.json`)
    ))
    .init({
      lng,
      ns,
      fallbackLng,
      supportedLngs: supportedLanguages,
      preload: supportedLanguages,
      interpolation: {
        escapeValue: false,
      },
    });
  
  return i18nInstance;
};