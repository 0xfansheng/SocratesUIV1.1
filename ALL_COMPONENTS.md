# 预测市场应用 - 完整组件代码

## 1. 预测卡片组件 (components/PredictionCard.tsx)

```typescript
'use client'

import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

interface PredictionCardProps {
  id: string
  title: string
  icon: string
  participants: number
  liquidity: number
  volume: number
  endDate: string
  isHot?: boolean
  onClick?: () => void
}

export default function PredictionCard({
  id,
  title,
  icon,
  participants,
  liquidity,
  volume,
  endDate,
  isHot = false,
  onClick
}: PredictionCardProps) {
  const { t } = useLanguage()
  
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`
    }
    return `$${amount.toFixed(0)}`
  }
  
  const getTimeRemaining = () => {
    const now = dayjs()
    const end = dayjs(endDate)
    const diff = end.diff(now, 'hour')
    
    if (diff < 0) {
      return { text: t('status.ended'), status: 'ended' }
    } else if (diff < 24) {
      return { text: t('status.endingSoon'), status: 'ending-soon' }
    } else {
      return { text: end.fromNow(), status: 'active' }
    }
  }
  
  const timeInfo = getTimeRemaining()
  
  return (
    <div 
      className="market-card group" 
      onClick={onClick}
    >
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{icon}</div>
            {isHot && (
              <span className="hot-indicator">
                {t('market.hot')}
              </span>
            )}
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            timeInfo.status === 'active' ? 'status-active' :
            timeInfo.status === 'ending-soon' ? 'status-ending-soon' :
            'status-ended'
          }`}>
            {timeInfo.text}
          </div>
        </div>
        
        <h3 className="text-white font-semibold text-lg leading-tight mb-3 group-hover:text-primary-400 transition-colors">
          {title}
        </h3>
      </div>
      
      {/* Stats */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-gray-400 mb-1">{t('market.participants')}</div>
            <div className="text-white font-medium">{participants.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-400 mb-1">{t('market.volume')}</div>
            <div className="text-white font-medium">{formatCurrency(volume)}</div>
          </div>
          <div>
            <div className="text-gray-400 mb-1">{t('market.liquidity')}</div>
            <div className="text-white font-medium">{formatCurrency(liquidity)}</div>
          </div>
        </div>
      </div>
      
      {/* Action Button */}
      <div className="px-4 pb-4">
        <button className="w-full bg-primary-500 hover:bg-primary-400 text-black font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95">
          {t('market.predict')}
        </button>
      </div>
    </div>
  )
}
```

## 2. 三列市场卡片组件 (components/ThreeColumnMarketCard.tsx)

```typescript
'use client'

import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

interface ThreeColumnMarketCardProps {
  id: string
  title: string
  icon: string
  participants: number
  liquidity: number
  volume: number
  endDate: string
  isHot?: boolean
  onClick?: () => void
}

export default function ThreeColumnMarketCard({
  id,
  title,
  icon,
  participants,
  liquidity,
  volume,
  endDate,
  isHot = false,
  onClick
}: ThreeColumnMarketCardProps) {
  const { t } = useLanguage()
  
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`
    }
    return `$${amount.toFixed(0)}`
  }
  
  const getTimeRemaining = () => {
    const now = dayjs()
    const end = dayjs(endDate)
    const diff = end.diff(now, 'hour')
    
    if (diff < 0) {
      return { text: t('status.ended'), status: 'ended' }
    } else if (diff < 24) {
      return { text: t('status.endingSoon'), status: 'ending-soon' }
    } else {
      return { text: end.fromNow(), status: 'active' }
    }
  }
  
  const timeInfo = getTimeRemaining()
  
  return (
    <div 
      className="bg-dark-800 border border-dark-700 rounded-xl p-6 hover:border-primary-500/50 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:shadow-primary-500/10 group"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">{icon}</div>
          <div>
            <h3 className="text-white font-semibold text-xl leading-tight group-hover:text-primary-400 transition-colors">
              {title}
            </h3>
            {isHot && (
              <span className="inline-block mt-1 hot-indicator">
                {t('market.hot')}
              </span>
            )}
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          timeInfo.status === 'active' ? 'status-active' :
          timeInfo.status === 'ending-soon' ? 'status-ending-soon' :
          'status-ended'
        }`}>
          {timeInfo.text}
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="text-center">
          <div className="text-gray-400 text-sm mb-1">{t('market.participants')}</div>
          <div className="text-white font-bold text-lg">{participants.toLocaleString()}</div>
        </div>
        <div className="text-center">
          <div className="text-gray-400 text-sm mb-1">{t('market.volume')}</div>
          <div className="text-white font-bold text-lg">{formatCurrency(volume)}</div>
        </div>
        <div className="text-center">
          <div className="text-gray-400 text-sm mb-1">{t('market.liquidity')}</div>
          <div className="text-white font-bold text-lg">{formatCurrency(liquidity)}</div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button className="flex-1 bg-primary-500 hover:bg-primary-400 text-black font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95">
          {t('market.predict')}
        </button>
        <button className="flex-1 bg-dark-700 hover:bg-dark-600 text-white border border-dark-600 hover:border-primary-500 font-medium py-3 px-4 rounded-lg transition-all duration-200">
          {t('market.trade')}
        </button>
      </div>
    </div>
  )
}
```

## 3. 市场详情组件 (components/MarketDetail.tsx)

```typescript
'use client'

import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

interface Market {
  id: string
  title: string
  icon: string
  participants: number
  liquidity: number
  volume: number
  endDate: string
  isHot?: boolean
  category: string
  creator: string
  description?: string
}

interface MarketDetailProps {
  market: Market
  onClose: () => void
}

export default function MarketDetail({ market, onClose }: MarketDetailProps) {
  const { t } = useLanguage()
  
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`
    }
    return `$${amount.toFixed(0)}`
  }
  
  const getTimeRemaining = () => {
    const now = dayjs()
    const end = dayjs(market.endDate)
    const diff = end.diff(now, 'hour')
    
    if (diff < 0) {
      return { text: t('status.ended'), status: 'ended' }
    } else if (diff < 24) {
      return { text: t('status.endingSoon'), status: 'ending-soon' }
    } else {
      return { text: end.fromNow(), status: 'active' }
    }
  }
  
  const timeInfo = getTimeRemaining()
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-dark-700">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{market.icon}</div>
              <div>
                <h2 className="text-white font-bold text-2xl leading-tight mb-2">
                  {market.title}
                </h2>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400 text-sm">
                    {t('market.creator')}: {market.creator}
                  </span>
                  {market.isHot && (
                    <span className="hot-indicator">
                      {t('market.hot')}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Status and Time */}
          <div className="flex items-center justify-between mb-6">
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              timeInfo.status === 'active' ? 'status-active' :
              timeInfo.status === 'ending-soon' ? 'status-ending-soon' :
              'status-ended'
            }`}>
              {timeInfo.text}
            </div>
            <div className="text-gray-400 text-sm">
              {t('market.endDate')}: {dayjs(market.endDate).format('MMM DD, YYYY HH:mm')}
            </div>
          </div>
          
          {/* Description */}
          {market.description && (
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-3">Description</h3>
              <p className="text-gray-300 leading-relaxed">{market.description}</p>
            </div>
          )}
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-dark-700 rounded-lg">
              <div className="text-gray-400 text-sm mb-2">{t('market.participants')}</div>
              <div className="text-white font-bold text-2xl">{market.participants.toLocaleString()}</div>
            </div>
            <div className="text-center p-4 bg-dark-700 rounded-lg">
              <div className="text-gray-400 text-sm mb-2">{t('market.volume')}</div>
              <div className="text-white font-bold text-2xl">{formatCurrency(market.volume)}</div>
            </div>
            <div className="text-center p-4 bg-dark-700 rounded-lg">
              <div className="text-gray-400 text-sm mb-2">{t('market.liquidity')}</div>
              <div className="text-white font-bold text-2xl">{formatCurrency(market.liquidity)}</div>
            </div>
          </div>
          
          {/* Prediction Options */}
          <div className="mb-8">
            <h3 className="text-white font-semibold mb-4">Make Your Prediction</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-accent-green/20 hover:bg-accent-green/30 border border-accent-green/50 text-accent-green font-medium py-4 px-6 rounded-lg transition-all duration-200 hover:scale-105">
                <div className="text-2xl mb-2">👍</div>
                <div>{t('common.yes')}</div>
                <div className="text-sm opacity-75">65%</div>
              </button>
              <button className="bg-accent-red/20 hover:bg-accent-red/30 border border-accent-red/50 text-accent-red font-medium py-4 px-6 rounded-lg transition-all duration-200 hover:scale-105">
                <div className="text-2xl mb-2">👎</div>
                <div>{t('common.no')}</div>
                <div className="text-sm opacity-75">35%</div>
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="flex-1 bg-primary-500 hover:bg-primary-400 text-black font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95">
              {t('market.predict')}
            </button>
            <button className="flex-1 bg-dark-700 hover:bg-dark-600 text-white border border-dark-600 hover:border-primary-500 font-medium py-3 px-6 rounded-lg transition-all duration-200">
              {t('market.trade')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
```

## 4. 模拟数据 (data/mockMarkets.ts)

```typescript
export interface Market {
  id: string
  title: string
  icon: string
  participants: number
  liquidity: number
  volume: number
  endDate: string
  isHot?: boolean
  category: string
  creator: string
  description?: string
}

export const mockMarkets: Market[] = [
  {
    id: '1',
    title: 'Will Bitcoin reach $100,000 by end of 2024?',
    icon: '₿',
    participants: 15420,
    liquidity: 2500000,
    volume: 8750000,
    endDate: '2024-12-31T23:59:59Z',
    isHot: true,
    category: 'crypto',
    creator: '0x1234...5678',
    description: 'This market will resolve to "Yes" if Bitcoin (BTC) reaches or exceeds $100,000 USD on any major exchange (Coinbase, Binance, Kraken) before January 1, 2025, 00:00 UTC.'
  },
  {
    id: '2',
    title: 'Will Ethereum merge to Proof of Stake succeed?',
    icon: 'Ξ',
    participants: 8930,
    liquidity: 1800000,
    volume: 4200000,
    endDate: '2024-06-30T23:59:59Z',
    category: 'crypto',
    creator: '0xabcd...efgh',
    description: 'Market resolves to "Yes" if Ethereum successfully completes the transition to Proof of Stake without major network issues or rollbacks.'
  },
  {
    id: '3',
    title: 'Will the Lakers win the 2024 NBA Championship?',
    icon: '🏀',
    participants: 12500,
    liquidity: 950000,
    volume: 3100000,
    endDate: '2024-06-20T23:59:59Z',
    category: 'sports',
    creator: '0x9876...5432',
    description: 'This market will resolve to "Yes" if the Los Angeles Lakers win the 2024 NBA Championship.'
  },
  {
    id: '4',
    title: 'Will AI achieve AGI by 2025?',
    icon: '🤖',
    participants: 22100,
    liquidity: 3200000,
    volume: 12500000,
    endDate: '2025-12-31T23:59:59Z',
    isHot: true,
    category: 'tech',
    creator: '0xtech...guru',
    description: 'Market resolves to "Yes" if a widely recognized AI system demonstrates general intelligence capabilities across multiple domains by end of 2025.'
  },
  {
    id: '5',
    title: 'Will Tesla stock hit $300 in 2024?',
    icon: '🚗',
    participants: 18750,
    liquidity: 2100000,
    volume: 6800000,
    endDate: '2024-12-31T23:59:59Z',
    category: 'crypto',
    creator: '0xinvest...or',
    description: 'This market will resolve to "Yes" if Tesla (TSLA) stock price reaches or exceeds $300 per share on any trading day in 2024.'
  },
  {
    id: '6',
    title: 'Will SpaceX land humans on Mars by 2030?',
    icon: '🚀',
    participants: 31200,
    liquidity: 5500000,
    volume: 18900000,
    endDate: '2030-12-31T23:59:59Z',
    isHot: true,
    category: 'tech',
    creator: '0xspace...fan',
    description: 'Market resolves to "Yes" if SpaceX successfully lands human astronauts on Mars and they survive for at least 24 hours on the surface.'
  },
  {
    id: '7',
    title: 'Will the next US President be under 50?',
    icon: '🇺🇸',
    participants: 45600,
    liquidity: 8200000,
    volume: 25400000,
    endDate: '2024-11-05T23:59:59Z',
    category: 'politics',
    creator: '0xpolitics...buff',
    description: 'This market will resolve to "Yes" if the winner of the 2024 US Presidential Election is under 50 years old at the time of inauguration.'
  },
  {
    id: '8',
    title: 'Will Avatar 3 gross over $2B worldwide?',
    icon: '🎬',
    participants: 9800,
    liquidity: 750000,
    volume: 2200000,
    endDate: '2026-01-31T23:59:59Z',
    category: 'entertainment',
    creator: '0xmovie...lover',
    description: 'Market resolves to "Yes" if Avatar 3 achieves worldwide box office gross revenue of $2 billion or more.'
  },
  {
    id: '9',
    title: 'Will global temperature rise exceed 1.5°C by 2030?',
    icon: '🌡️',
    participants: 28900,
    liquidity: 4100000,
    volume: 11200000,
    endDate: '2030-12-31T23:59:59Z',
    category: 'news',
    creator: '0xclimate...watch',
    description: 'Market resolves to "Yes" if global average temperature rise exceeds 1.5°C above pre-industrial levels according to major climate organizations.'
  },
  {
    id: '10',
    title: 'Will quantum computers break RSA-2048 by 2035?',
    icon: '⚛️',
    participants: 15600,
    liquidity: 1900000,
    volume: 5400000,
    endDate: '2035-12-31T23:59:59Z',
    category: 'tech',
    creator: '0xquantum...dev',
    description: 'Market resolves to "Yes" if a quantum computer successfully factors a 2048-bit RSA number in a publicly verifiable demonstration.'
  }
]

export const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'crypto', name: 'Crypto' },
  { id: 'sports', name: 'Sports' },
  { id: 'politics', name: 'Politics' },
  { id: 'tech', name: 'Technology' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'news', name: 'News' }
]

export const sortOptions = [
  { id: 'volume', name: 'Volume' },
  { id: 'liquidity', name: 'Liquidity' },
  { id: 'endingSoon', name: 'Ending Soon' },
  { id: 'newest', name: 'Newest' }
]
```

## 5. 实用工具函数 (utils/index.ts)

```typescript
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

// 格式化货币
export const formatCurrency = (amount: number): string => {
  if (amount >= 1000000000) {
    return `$${(amount / 1000000000).toFixed(1)}B`
  } else if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`
  }
  return `$${amount.toFixed(0)}`
}

// 格式化数字
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toLocaleString()
}

// 获取时间状态
export const getTimeStatus = (endDate: string) => {
  const now = dayjs()
  const end = dayjs(endDate)
  const diff = end.diff(now, 'hour')
  
  if (diff < 0) {
    return { text: 'Ended', status: 'ended' as const }
  } else if (diff < 24) {
    return { text: 'Ending Soon', status: 'ending-soon' as const }
  } else {
    return { text: end.fromNow(), status: 'active' as const }
  }
}

// 截断文本
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// 生成随机ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}

// 验证以太坊地址
export const isValidEthereumAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

// 验证URL
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// 防抖函数
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// 节流函数
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// 复制到剪贴板
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // 降级方案
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
      document.body.removeChild(textArea)
      return true
    } catch {
      document.body.removeChild(textArea)
      return false
    }
  }
}

// 格式化百分比
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`
}

// 计算价格变化
export const calculatePriceChange = (current: number, previous: number) => {
  const change = current - previous
  const percentage = (change / previous) * 100
  return {
    absolute: change,
    percentage,
    direction: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral'
  }
}

// 本地存储辅助函数
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // 静默失败
    }
  },
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key)
    } catch {
      // 静默失败
    }
  }
}
```

## 6. 类型定义 (types/index.ts)

```typescript
// 市场相关类型
export interface Market {
  id: string
  title: string
  icon: string
  participants: number
  liquidity: number
  volume: number
  endDate: string
  isHot?: boolean
  category: string
  creator: string
  description?: string
  resolutionSource?: string
  createdAt?: string
  updatedAt?: string
}

// 用户相关类型
export interface User {
  id: string
  address: string
  username?: string
  avatar?: string
  totalVolume: number
  totalProfit: number
  marketsCreated: number
  marketsTraded: number
  reputation: number
  joinedAt: string
}

// 钱包相关类型
export interface WalletState {
  isConnected: boolean
  address: string | null
  balance: number
  isConnecting: boolean
  provider: string | null
}

// 交易相关类型
export interface Trade {
  id: string
  marketId: string
  userId: string
  type: 'buy' | 'sell'
  outcome: 'yes' | 'no'
  amount: number
  price: number
  timestamp: string
  status: 'pending' | 'completed' | 'failed'
}

// 预测相关类型
export interface Prediction {
  id: string
  marketId: string
  userId: string
  outcome: 'yes' | 'no'
  confidence: number
  amount: number
  timestamp: string
  isResolved: boolean
  payout?: number
}

// 分类相关类型
export interface Category {
  id: string
  name: string
  icon?: string
  description?: string
  marketCount?: number
}

// 排序选项类型
export interface SortOption {
  id: string
  name: string
  field: keyof Market
  direction: 'asc' | 'desc'
}

// 过滤器类型
export interface MarketFilters {
  category: string
  status: 'all' | 'active' | 'ended' | 'ending-soon'
  search: string
  sortBy: string
  minLiquidity?: number
  maxLiquidity?: number
  dateRange?: {
    start: string
    end: string
  }
}

// API 响应类型
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// 分页类型
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
}

// 表单相关类型
export interface CreateMarketForm {
  title: string
  description: string
  category: string
  endDate: string
  endTime: string
  initialLiquidity: string
  resolutionSource: string
}

export interface FormErrors {
  [key: string]: string
}

// 主题类型
export type Theme = 'light' | 'dark'

// 语言类型
export type Language = 'en' | 'zh'

// 通知类型
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  timestamp: string
  isRead: boolean
  action?: {
    label: string
    onClick: () => void
  }
}

// 统计数据类型
export interface MarketStats {
  totalMarkets: number
  totalVolume: number
  totalLiquidity: number
  activeUsers: number
  resolvedMarkets: number
  averageAccuracy: number
}

// 图表数据类型
export interface ChartDataPoint {
  timestamp: string
  value: number
  label?: string
}

export interface PriceHistory {
  marketId: string
  data: ChartDataPoint[]
  timeframe: '1h' | '24h' | '7d' | '30d' | 'all'
}

// 事件类型
export interface MarketEvent {
  id: string
  marketId: string
  type: 'created' | 'trade' | 'resolved' | 'disputed'
  data: any
  timestamp: string
  userId?: string
}

// 解析相关类型
export interface Resolution {
  id: string
  marketId: string
  outcome: 'yes' | 'no' | 'invalid'
  resolvedBy: string
  resolvedAt: string
  evidence: string[]
  disputePeriodEnd: string
  isDisputed: boolean
}

// 争议类型
export interface Dispute {
  id: string
  resolutionId: string
  disputedBy: string
  reason: string
  evidence: string[]
  status: 'pending' | 'resolved' | 'rejected'
  createdAt: string
  resolvedAt?: string
}
```

---

*此文档包含了预测市场应用的所有组件代码、模拟数据、实用工具函数和类型定义，为完整的应用重建提供了全面的代码基础。*