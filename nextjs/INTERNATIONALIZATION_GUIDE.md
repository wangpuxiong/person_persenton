# 项目国际化指南

本指南详细介绍了如何在项目中使用和扩展国际化功能。

## 已实现的功能

- 集成了 `next-i18next`、`i18next` 和 `react-i18next` 库
- 创建了支持英语和中文（简体）的翻译系统
- 实现了语言切换功能
- 提供了国际化示例页面

## 目录结构

```
├── app/
│   ├── i18n.ts             # i18n 初始化配置
│   ├── config.ts           # 支持的语言配置
│   ├── I18nProvider.tsx    # i18n 提供者组件
│   ├── LanguageSelector.tsx # 语言选择器组件
│   └── i18n-example/       # 国际化示例页面
└── locales/                # 翻译文件目录
    ├── en/
    │   └── common.json    # 英语翻译
    └── zh-CN/
        └── common.json    # 中文（简体）翻译
```

## 如何使用翻译功能

### 在组件中使用翻译

1. 确保组件是客户端组件（添加 `'use client'` 指令）
2. 导入 `useTranslation` 钩子
3. 使用 `t()` 函数获取翻译文本

```tsx
'use client';

import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation('common'); // 'common' 是命名空间
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button>{t('button:save')}</button>
    </div>
  );
};
```

### 添加新的翻译文本

1. 在 `locales/en/common.json` 和 `locales/zh-CN/common.json` 文件中添加新的键值对
2. 使用 `.` 分隔符创建嵌套的翻译键，如 `nav.home`

```json
{
  "newKey": "英文翻译",
  "newSection": {
    "title": "英文标题"
  }
}
```

### 添加新的语言支持

1. 在 `app/config.ts` 文件中更新 `supportedLanguages` 数组
2. 在 `locales` 目录下创建新的语言文件夹（如 `fr` 对应法语）
3. 在新文件夹中创建 `common.json` 文件并添加翻译

## 示例页面

项目中包含了一个国际化示例页面，访问 `/i18n-example` 可以查看翻译功能的实际效果。

## 注意事项

1. 所有使用 `useTranslation` 钩子的组件都必须是客户端组件
2. 在服务器组件中无法直接使用翻译功能
3. 对于需要在服务器端渲染的多语言页面，需要使用 Next.js 的动态路由和静态生成功能

## 高级配置

### 动态语言检测

目前，语言设置是硬编码的。在实际项目中，你可以根据用户的浏览器设置、URL 路径或 cookie 来动态检测和设置语言。

### 更多命名空间

如果项目很大，可以为不同的页面或组件创建不同的命名空间，而不仅仅使用 `common` 命名空间。

### 服务器端渲染优化

对于需要在服务器端渲染的多语言页面，可以使用 Next.js 的 `generateStaticParams` 和 `getStaticProps` 功能来预渲染不同语言的页面版本。