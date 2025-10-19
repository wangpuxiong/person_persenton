'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { supportedLanguages } from './config';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation('common');
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    i18n.changeLanguage(value);
  };

  // 保持原来的语言标签，不因当前语言设置而变化
  const languageLabels: Record<string, string> = {
    'en': 'English',
    'zh-CN': '简体中文'
  };

  const currentLanguageLabel = languageLabels[selectedLanguage] || selectedLanguage;

  return (
    <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-auto h-auto p-2 border-0 bg-transparent hover:bg-blue-900/30 rounded-md data-[state=open]:bg-blue-900/30 [&_svg]:text-white">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Globe className="h-4 w-4 text-blue-500" />
          <span className="text-white">{t('language.label')}</span>
        </div>
      </SelectTrigger>
      <SelectContent>
        {supportedLanguages.map((lang) => (
          <SelectItem key={lang} value={lang}>
            {languageLabels[lang] || lang}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;