'use client';

import { useTranslation } from 'react-i18next';
import LanguageSelector from '../LanguageSelector';

const I18nExample = () => {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-center mb-6">
            {t('welcome')}
          </h1>
          
          <div className="mb-8">
            <LanguageSelector />
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-600">{t('description')}</p>
            
            <div className="space-y-2">
              <h3 className="font-medium">{t('test')} :123123:</h3>
              <h3 className="font-medium">{t('nav.dashboard')} Navigation:</h3>
              <ul className="list-disc pl-5">
                <li>{t('nav.home')}</li>
                <li>{t('nav.dashboard')}</li>
                <li>{t('nav.settings')}</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Common Buttons:</h3>
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-blue-500 text-white rounded">
                  {t('button.create')}
                </button>
                <button className="px-4 py-2 bg-green-500 text-white rounded">
                  {t('button.save')}
                </button>
                <button className="px-4 py-2 bg-purple-500 text-white rounded">
                  {t('button.upload')}
                </button>
                <button className="px-4 py-2 bg-orange-500 text-white rounded">
                  {t('button.export')}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-500 text-sm">
          <p>View this page in different languages to see the translation in action</p>
        </div>
      </div>
    </div>
  );
};

export default I18nExample;