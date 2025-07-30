# 预测市场应用 - 完整代码导出

## 项目结构
```
prediction-market/
├── app/
│   ├── page.tsx              # 主页面
│   ├── layout.tsx            # 根布局
│   ├── globals.css           # 全局样式
│   ├── create/
│   │   └── page.tsx          # 创建市场页面
│   └── market/
│       └── [id]/
│           └── page.tsx      # 市场详情页面
├── components/
│   ├── Navbar.tsx            # 导航栏
│   ├── PredictionCard.tsx    # 预测卡片
│   ├── MarketDetail.tsx      # 市场详情
│   ├── ThreeColumnMarketCard.tsx # 三列布局卡片
│   └── PredictionModal.tsx   # 预测弹窗
├── contexts/
│   ├── LanguageContext.tsx   # 多语言上下文
│   ├── WalletContext.tsx     # 钱包上下文
│   └── ThemeContext.tsx      # 主题上下文
├── mock/
│   └── markets.ts            # 模拟数据
├── tailwind.config.js        # Tailwind配置
├── package.json              # 项目依赖
└── README.md                 # 项目文档
```

## 核心文件内容

### 1. package.json
```json
{
  "name": "prediction-market",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10",
    "dayjs": "^1.11.13",
    "next": "14.0.0",
    "postcss": "^8",
    "react": "^18",
    "react-dom": "^18",
    "tailwindcss": "^3",
    "typescript": "^5"
  }
}
```

### 2. tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px',
      'mobile': {'max': '767px'},
      'tablet': {'min': '768px', 'max': '1023px'},
      'desktop': {'min': '1024px'},
      'wide': {'min': '1920px'},
      'ultrawide': {'min': '2560px'},
    },
    extend: {
      fontFamily: {
        'sans': ['Space Grotesk', 'Satoshi', 'Inter', 'system-ui', 'sans-serif'],
        'grotesk': ['Space Grotesk', 'sans-serif'],
        'satoshi': ['Satoshi', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0fff4',
          100: '#dcfff0',
          200: '#bbffe1',
          300: '#86ffc6',
          400: '#4dffab',
          500: '#00FFAE',
          600: '#00e69d',
          700: '#00cc8c',
          800: '#00b37a',
          900: '#009968',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1a1a1a',
          900: '#121212',
          950: '#000000',
        },
        accent: {
          green: '#00FFAE',
          'green-dark': '#00D4AA',
          red: '#FF3D5A',
          'red-dark': '#E6354F',
          blue: '#3b82f6',
          yellow: '#f59e0b',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 255, 174, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 255, 174, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
```

## 使用说明

1. **安装依赖**：`npm install`
2. **启动开发服务器**：`npm run dev`
3. **访问应用**：http://localhost:3000
4. **构建生产版本**：`npm run build`

## 主要功能

- 🏠 **主页面** - 市场列表、三列布局、智能钱包跟踪
- ➕ **创建市场** - 表单验证、钱包连接、多语言支持
- 📊 **市场详情** - 详细信息展示和交互
- 🌐 **多语言** - 中英文切换
- 🌙 **深色主题** - 现代化UI设计
- 📱 **响应式** - 移动端适配

## 技术栈

- **框架**: Next.js 14
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **状态管理**: React Context
- **日期处理**: Day.js

---

*此文档包含了预测市场应用的完整代码结构和配置信息，可用于V0或其他平台的UI重建。*