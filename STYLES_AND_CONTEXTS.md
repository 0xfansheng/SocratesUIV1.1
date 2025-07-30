# 预测市场应用 - 样式和上下文代码

## 1. 全局样式 (app/globals.css)

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
@import url('https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,600,700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply scroll-smooth;
  }
  
  body {
    @apply antialiased font-grotesk transition-colors duration-300;
  }
  
  /* Dark theme (default) */
  .dark {
    @apply bg-black text-white;
  }
  
  .dark .bg-primary {
    @apply bg-black;
  }
  
  .dark .bg-secondary {
    @apply bg-[#1a1a1a];
  }
  
  .dark .bg-tertiary {
    @apply bg-gray-900;
  }
  
  .dark .text-primary {
    @apply text-white;
  }
  
  .dark .text-secondary {
    @apply text-gray-300;
  }
  
  .dark .border-primary {
    @apply border-gray-800;
  }
  
  .dark .border-secondary {
    @apply border-gray-700;
  }
  
  /* Light theme */
  .light {
    @apply bg-white text-gray-900;
  }
  
  .light .bg-primary {
    @apply bg-white;
  }
  
  .light .bg-secondary {
    @apply bg-gray-50;
  }
  
  .light .bg-tertiary {
    @apply bg-gray-100;
  }
  
  .light .text-primary {
    @apply text-gray-900;
  }
  
  .light .text-secondary {
    @apply text-gray-600;
  }
  
  .light .border-primary {
    @apply border-gray-200;
  }
  
  .light .border-secondary {
    @apply border-gray-300;
  }
}

@layer components {
  /* Container */
  .responsive-container {
    @apply mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl;
  }
  
  /* Glass effect */
  .glass-effect {
    @apply bg-black/80 backdrop-blur-md;
  }
  
  /* Buttons */
  .btn-primary {
    @apply bg-primary-500 hover:bg-primary-400 text-black font-medium px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95;
  }
  
  .btn-secondary {
    @apply bg-dark-800 hover:bg-dark-700 text-white border border-dark-700 hover:border-primary-500 font-medium px-6 py-3 rounded-lg transition-all duration-200;
  }
  
  .btn-outline {
    @apply border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-black font-medium px-6 py-3 rounded-lg transition-all duration-200;
  }
  
  .btn-ghost {
    @apply text-secondary hover:text-primary hover:bg-dark-800 font-medium px-4 py-2 rounded-lg transition-all duration-200;
  }
  
  /* Cards */
  .card {
    @apply bg-dark-800 border border-dark-700 rounded-xl p-6 hover:border-primary-500/50 transition-all duration-300;
  }
  
  .card-hover {
    @apply hover:scale-[1.02] hover:shadow-lg hover:shadow-primary-500/10;
  }
  
  /* Market Cards */
  .market-card {
    @apply bg-dark-800 border border-dark-700 rounded-xl overflow-hidden hover:border-primary-500/50 transition-all duration-300 cursor-pointer;
  }
  
  .market-card:hover {
    @apply transform scale-[1.02] shadow-lg shadow-primary-500/10;
  }
  
  /* Progress bars */
  .progress-bar {
    @apply w-full bg-dark-700 rounded-full h-2 overflow-hidden;
  }
  
  .progress-fill {
    @apply h-full bg-gradient-to-r from-primary-500 to-accent-green transition-all duration-500 ease-out;
  }
  
  /* Status indicators */
  .status-active {
    @apply bg-accent-green/20 text-accent-green border border-accent-green/30;
  }
  
  .status-ending-soon {
    @apply bg-accent-yellow/20 text-accent-yellow border border-accent-yellow/30;
  }
  
  .status-ended {
    @apply bg-gray-500/20 text-gray-400 border border-gray-500/30;
  }
  
  /* Hot indicator */
  .hot-indicator {
    @apply bg-gradient-to-r from-accent-red to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse-glow;
  }
  
  /* Price change indicators */
  .price-up {
    @apply text-accent-green;
  }
  
  .price-down {
    @apply text-accent-red;
  }
  
  .price-neutral {
    @apply text-gray-400;
  }
  
  /* Form elements */
  .form-input {
    @apply w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors;
  }
  
  .form-input-error {
    @apply border-accent-red focus:border-accent-red;
  }
  
  .form-label {
    @apply block text-sm font-medium text-white mb-2;
  }
  
  .form-error {
    @apply text-accent-red text-sm mt-1;
  }
  
  /* Modal */
  .modal-overlay {
    @apply fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4;
  }
  
  .modal-content {
    @apply bg-dark-800 border border-dark-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto;
  }
  
  /* Scrollbar */
  .custom-scrollbar::-webkit-scrollbar {
    @apply w-2;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    @apply bg-dark-800 rounded-full;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    @apply bg-dark-600 rounded-full hover:bg-dark-500;
  }
  
  /* Animations */
  .animate-fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }
  
  .animate-slide-up {
    animation: slideUp 0.3s ease-out;
  }
  
  .animate-scale-in {
    animation: scaleIn 0.2s ease-out;
  }
  
  /* Gradient text */
  .gradient-text {
    @apply bg-gradient-to-r from-primary-400 to-accent-green bg-clip-text text-transparent;
  }
  
  /* Loading spinner */
  .loading-spinner {
    @apply animate-spin rounded-full h-6 w-6 border-2 border-primary-500 border-t-transparent;
  }
  
  /* Tooltip */
  .tooltip {
    @apply absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-dark-900 text-white text-sm rounded-lg opacity-0 pointer-events-none transition-opacity duration-200;
  }
  
  .tooltip-trigger:hover .tooltip {
    @apply opacity-100;
  }
}

@layer utilities {
  /* Text utilities */
  .text-gradient {
    @apply bg-gradient-to-r from-primary-400 to-accent-green bg-clip-text text-transparent;
  }
  
  /* Spacing utilities */
  .space-y-safe > * + * {
    @apply mt-4;
  }
  
  /* Responsive utilities */
  .responsive-grid {
    @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6;
  }
  
  .responsive-flex {
    @apply flex flex-col sm:flex-row gap-4;
  }
  
  /* Focus utilities */
  .focus-ring {
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-black;
  }
  
  /* Hover effects */
  .hover-lift {
    @apply transition-transform duration-200 hover:scale-105;
  }
  
  .hover-glow {
    @apply transition-shadow duration-200 hover:shadow-lg hover:shadow-primary-500/20;
  }
}

/* Custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes pulseGlow {
  0%, 100% {
    box-shadow: 0 0 5px rgba(0, 255, 174, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 255, 174, 0.6);
  }
}

/* Print styles */
@media print {
  .no-print {
    display: none !important;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .card {
    @apply border-2;
  }
  
  .btn-primary {
    @apply border-2 border-black;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 2. 多语言上下文 (contexts/LanguageContext.tsx)

```typescript
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'zh'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Navigation
    'nav.createMarket': 'Create Market',
    'nav.myMarkets': 'My Markets',
    'nav.leaderboard': 'Leaderboard',
    'nav.connectWallet': 'Connect Wallet',
    'nav.connecting': 'Connecting...',
    'nav.disconnect': 'Disconnect',
    'nav.lightMode': 'Light Mode',
    'nav.darkMode': 'Dark Mode',
    
    // Home page
    'home.title': 'Prediction Markets',
    'home.subtitle': 'Trade on the outcome of future events',
    
    // Tabs
    'tabs.markets': 'Markets',
    'tabs.smartWallets': 'Smart Wallets',
    
    // Search
    'search.placeholder': 'Search markets...',
    
    // Categories
    'category.all': 'All Categories',
    'category.crypto': 'Crypto',
    'category.sports': 'Sports',
    'category.politics': 'Politics',
    'category.tech': 'Technology',
    'category.entertainment': 'Entertainment',
    'category.news': 'News',
    
    // Sort options
    'sort.volume': 'Volume',
    'sort.liquidity': 'Liquidity',
    'sort.endingSoon': 'Ending Soon',
    'sort.newest': 'Newest',
    
    // Market status
    'status.active': 'Active',
    'status.ended': 'Ended',
    'status.endingSoon': 'Ending Soon',
    
    // Common
    'common.loading': 'Loading...',
    'common.loadMore': 'Load More',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.close': 'Close',
    'common.backToHome': 'Back to Home',
    'common.yes': 'Yes',
    'common.no': 'No',
    
    // Create market
    'create.title': 'Create New Market',
    'create.subtitle': 'Create a prediction market for any future event',
    'create.walletRequired': 'Wallet Connection Required',
    'create.walletRequiredDesc': 'Please connect your wallet to create a market',
    'create.submit': 'Create Market',
    'create.submitting': 'Creating...',
    'create.success': 'Market created successfully!',
    
    // Create market fields
    'create.fields.title': 'Market Title',
    'create.fields.description': 'Description',
    'create.fields.category': 'Category',
    'create.fields.endDate': 'End Date',
    'create.fields.endTime': 'End Time',
    'create.fields.initialLiquidity': 'Initial Liquidity',
    'create.fields.resolutionSource': 'Resolution Source',
    
    // Create market placeholders
    'create.placeholders.title': 'Will Bitcoin reach $100,000 by end of 2024?',
    'create.placeholders.description': 'Describe the market conditions and resolution criteria...',
    'create.placeholders.resolutionSource': 'https://coinmarketcap.com/currencies/bitcoin/',
    
    // Create market hints
    'create.hints.initialLiquidity': 'Minimum $100 required. Higher liquidity attracts more traders.',
    'create.hints.resolutionSource': 'Provide a reliable source for resolving the market outcome.',
    
    // Create market errors
    'create.errors.titleRequired': 'Market title is required',
    'create.errors.titleTooShort': 'Title must be at least 10 characters',
    'create.errors.descriptionRequired': 'Description is required',
    'create.errors.descriptionTooShort': 'Description must be at least 20 characters',
    'create.errors.endDateRequired': 'End date is required',
    'create.errors.endDateInvalid': 'End date must be in the future',
    'create.errors.endTimeRequired': 'End time is required',
    'create.errors.liquidityRequired': 'Initial liquidity is required',
    'create.errors.liquidityInvalid': 'Please enter a valid amount',
    'create.errors.liquidityTooLow': 'Minimum liquidity is $100',
    'create.errors.resolutionSourceRequired': 'Resolution source is required',
    'create.errors.walletNotConnected': 'Please connect your wallet first',
    'create.errors.submitFailed': 'Failed to create market. Please try again.',
    
    // Wallets
    'wallets.comingSoon': 'Smart wallet tracking coming soon...',
    
    // Market details
    'market.participants': 'participants',
    'market.volume': 'Volume',
    'market.liquidity': 'Liquidity',
    'market.endDate': 'Ends',
    'market.creator': 'Creator',
    'market.hot': 'HOT',
    'market.predict': 'Predict',
    'market.trade': 'Trade',
  },
  zh: {
    // Navigation
    'nav.createMarket': '创建市场',
    'nav.myMarkets': '我的市场',
    'nav.leaderboard': '排行榜',
    'nav.connectWallet': '连接钱包',
    'nav.connecting': '连接中...',
    'nav.disconnect': '断开连接',
    'nav.lightMode': '浅色模式',
    'nav.darkMode': '深色模式',
    
    // Home page
    'home.title': '预测市场',
    'home.subtitle': '交易未来事件的结果',
    
    // Tabs
    'tabs.markets': '市场',
    'tabs.smartWallets': '智能钱包',
    
    // Search
    'search.placeholder': '搜索市场...',
    
    // Categories
    'category.all': '全部分类',
    'category.crypto': '加密货币',
    'category.sports': '体育',
    'category.politics': '政治',
    'category.tech': '科技',
    'category.entertainment': '娱乐',
    'category.news': '新闻',
    
    // Sort options
    'sort.volume': '交易量',
    'sort.liquidity': '流动性',
    'sort.endingSoon': '即将结束',
    'sort.newest': '最新',
    
    // Market status
    'status.active': '进行中',
    'status.ended': '已结束',
    'status.endingSoon': '即将结束',
    
    // Common
    'common.loading': '加载中...',
    'common.loadMore': '加载更多',
    'common.cancel': '取消',
    'common.confirm': '确认',
    'common.close': '关闭',
    'common.backToHome': '返回首页',
    'common.yes': '是',
    'common.no': '否',
    
    // Create market
    'create.title': '创建新市场',
    'create.subtitle': '为任何未来事件创建预测市场',
    'create.walletRequired': '需要连接钱包',
    'create.walletRequiredDesc': '请连接您的钱包以创建市场',
    'create.submit': '创建市场',
    'create.submitting': '创建中...',
    'create.success': '市场创建成功！',
    
    // Create market fields
    'create.fields.title': '市场标题',
    'create.fields.description': '描述',
    'create.fields.category': '分类',
    'create.fields.endDate': '结束日期',
    'create.fields.endTime': '结束时间',
    'create.fields.initialLiquidity': '初始流动性',
    'create.fields.resolutionSource': '解决来源',
    
    // Create market placeholders
    'create.placeholders.title': '比特币会在2024年底达到10万美元吗？',
    'create.placeholders.description': '描述市场条件和解决标准...',
    'create.placeholders.resolutionSource': 'https://coinmarketcap.com/currencies/bitcoin/',
    
    // Create market hints
    'create.hints.initialLiquidity': '最低需要100美元。更高的流动性会吸引更多交易者。',
    'create.hints.resolutionSource': '提供一个可靠的来源来解决市场结果。',
    
    // Create market errors
    'create.errors.titleRequired': '市场标题是必需的',
    'create.errors.titleTooShort': '标题至少需要10个字符',
    'create.errors.descriptionRequired': '描述是必需的',
    'create.errors.descriptionTooShort': '描述至少需要20个字符',
    'create.errors.endDateRequired': '结束日期是必需的',
    'create.errors.endDateInvalid': '结束日期必须是未来时间',
    'create.errors.endTimeRequired': '结束时间是必需的',
    'create.errors.liquidityRequired': '初始流动性是必需的',
    'create.errors.liquidityInvalid': '请输入有效金额',
    'create.errors.liquidityTooLow': '最低流动性为100美元',
    'create.errors.resolutionSourceRequired': '解决来源是必需的',
    'create.errors.walletNotConnected': '请先连接您的钱包',
    'create.errors.submitFailed': '创建市场失败，请重试。',
    
    // Wallets
    'wallets.comingSoon': '智能钱包跟踪即将推出...',
    
    // Market details
    'market.participants': '参与者',
    'market.volume': '交易量',
    'market.liquidity': '流动性',
    'market.endDate': '结束时间',
    'market.creator': '创建者',
    'market.hot': '热门',
    'market.predict': '预测',
    'market.trade': '交易',
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'zh')) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
```

## 3. 钱包上下文 (contexts/WalletContext.tsx)

```typescript
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface WalletContextType {
  isConnected: boolean
  address: string | null
  isConnecting: boolean
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    // Check if wallet was previously connected
    const savedAddress = localStorage.getItem('walletAddress')
    if (savedAddress) {
      setAddress(savedAddress)
      setIsConnected(true)
    }
  }, [])

  const connectWallet = async () => {
    setIsConnecting(true)
    
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Generate a mock wallet address
      const mockAddress = '0x' + Math.random().toString(16).substr(2, 40)
      
      setAddress(mockAddress)
      setIsConnected(true)
      localStorage.setItem('walletAddress', mockAddress)
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setAddress(null)
    setIsConnected(false)
    localStorage.removeItem('walletAddress')
  }

  return (
    <WalletContext.Provider value={{
      isConnected,
      address,
      isConnecting,
      connectWallet,
      disconnectWallet
    }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}
```

## 4. 主题上下文 (contexts/ThemeContext.tsx)

```typescript
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.className = theme
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
```

## 5. 根布局 (app/layout.tsx)

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '../contexts/LanguageContext'
import { WalletProvider } from '../contexts/WalletContext'
import { ThemeProvider } from '../contexts/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PredictMarket - Decentralized Prediction Markets',
  description: 'Trade on the outcome of future events with our decentralized prediction market platform.',
  keywords: 'prediction markets, betting, crypto, blockchain, trading',
  authors: [{ name: 'PredictMarket Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#00FFAE',
  openGraph: {
    title: 'PredictMarket - Decentralized Prediction Markets',
    description: 'Trade on the outcome of future events with our decentralized prediction market platform.',
    type: 'website',
    locale: 'en_US',
    siteName: 'PredictMarket',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PredictMarket - Decentralized Prediction Markets',
    description: 'Trade on the outcome of future events with our decentralized prediction market platform.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            <WalletProvider>
              {children}
            </WalletProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

## 6. Next.js 配置 (next.config.js)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['api.placeholder.com'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

## 7. PostCSS 配置 (postcss.config.js)

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## 8. TypeScript 配置 (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

*此文档包含了预测市场应用的样式系统、上下文管理和配置文件，为完整的UI重建提供了所有必要的支持代码。*