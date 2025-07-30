# 预测市场应用 - 核心组件代码

## 1. 主页面 (app/page.tsx)

```typescript
'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../components/Navbar'
import PredictionCard from '../components/PredictionCard'
import MarketDetail from '../components/MarketDetail'
import ThreeColumnMarketCard from '../components/ThreeColumnMarketCard'
import { useLanguage } from '../contexts/LanguageContext'
import { mockMarkets } from '../mock/markets'

// Three Column Market View Component
function ThreeColumnMarketView({ markets, searchQuery, selectedCategory, sortBy, onCardClick }) {
  const { t } = useLanguage()
  const [displayedMarkets, setDisplayedMarkets] = useState([[], [], []])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  // Filter and sort markets
  const filteredMarkets = useMemo(() => {
    let filtered = markets

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(market => 
        market.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        market.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(market => market.category === selectedCategory)
    }

    // Apply sorting
    switch (sortBy) {
      case 'volume':
        filtered.sort((a, b) => (b.volume || 0) - (a.volume || 0))
        break
      case 'liquidity':
        filtered.sort((a, b) => (b.liquidity || 0) - (a.liquidity || 0))
        break
      case 'ending_soon':
        filtered.sort((a, b) => new Date(a.endDate) - new Date(b.endDate))
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now()))
        break
      default:
        break
    }

    return filtered
  }, [markets, searchQuery, selectedCategory, sortBy])

  // Load more markets
  const loadMoreMarkets = useCallback(() => {
    if (loading || !hasMore) return
    
    setLoading(true)
    
    setTimeout(() => {
      const startIndex = (page - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      const newMarkets = filteredMarkets.slice(startIndex, endIndex)
      
      if (newMarkets.length === 0) {
        setHasMore(false)
        setLoading(false)
        return
      }
      
      // Distribute markets across three columns
      const newDisplayedMarkets = [[], [], []]
      newMarkets.forEach((market, index) => {
        const columnIndex = index % 3
        newDisplayedMarkets[columnIndex].push(market)
      })
      
      setDisplayedMarkets(prev => [
        [...prev[0], ...newDisplayedMarkets[0]],
        [...prev[1], ...newDisplayedMarkets[1]],
        [...prev[2], ...newDisplayedMarkets[2]]
      ])
      
      setPage(prev => prev + 1)
      setLoading(false)
    }, 500)
  }, [loading, hasMore, page, filteredMarkets])

  // Reset when filters change
  useEffect(() => {
    setDisplayedMarkets([[], [], []])
    setPage(1)
    setHasMore(true)
    loadMoreMarkets()
  }, [searchQuery, selectedCategory, sortBy])

  return (
    <div className="space-y-6">
      {/* Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {displayedMarkets.map((columnMarkets, columnIndex) => (
          <div key={columnIndex} className="space-y-4">
            {columnMarkets.map((market) => (
              <ThreeColumnMarketCard
                key={market.id}
                {...market}
                onCardClick={onCardClick}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center pt-6">
          <button
            onClick={loadMoreMarkets}
            disabled={loading}
            className="btn-secondary px-8 py-3 disabled:opacity-50"
          >
            {loading ? t('common.loading') : t('common.loadMore')}
          </button>
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const { t } = useLanguage()
  const router = useRouter()
  const [selectedMarket, setSelectedMarket] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('volume')
  const [activeTab, setActiveTab] = useState('markets')

  const categories = [
    { key: 'all', label: t('category.all') },
    { key: 'crypto', label: t('category.crypto') },
    { key: 'sports', label: t('category.sports') },
    { key: 'politics', label: t('category.politics') },
    { key: 'tech', label: t('category.tech') },
    { key: 'entertainment', label: t('category.entertainment') }
  ]

  const sortOptions = [
    { key: 'volume', label: t('sort.volume') },
    { key: 'liquidity', label: t('sort.liquidity') },
    { key: 'ending_soon', label: t('sort.endingSoon') },
    { key: 'newest', label: t('sort.newest') }
  ]

  const handleCardClick = (marketId) => {
    const market = mockMarkets.find(m => m.id === marketId)
    if (market) {
      setSelectedMarket(market)
    }
  }

  const handleCloseDetail = () => {
    setSelectedMarket(null)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Main Content */}
      <main className="responsive-container py-6 lg:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-accent-green bg-clip-text text-transparent">
            {t('home.title')}
          </h1>
          <p className="text-secondary text-lg">
            {t('home.subtitle')}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-dark-800 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('markets')}
            className={`px-4 py-2 rounded-md transition-all ${
              activeTab === 'markets'
                ? 'bg-primary-500 text-black font-medium'
                : 'text-secondary hover:text-white'
            }`}
          >
            {t('tabs.markets')}
          </button>
          <button
            onClick={() => setActiveTab('wallets')}
            className={`px-4 py-2 rounded-md transition-all ${
              activeTab === 'wallets'
                ? 'bg-primary-500 text-black font-medium'
                : 'text-secondary hover:text-white'
            }`}
          >
            {t('tabs.smartWallets')}
          </button>
        </div>

        {activeTab === 'markets' && (
          <>
            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('search.placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>

              {/* Category and Sort Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                >
                  {categories.map(category => (
                    <option key={category.key} value={category.key}>
                      {category.label}
                    </option>
                  ))}
                </select>

                {/* Sort Filter */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                >
                  {sortOptions.map(option => (
                    <option key={option.key} value={option.key}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Markets Grid */}
            <ThreeColumnMarketView
              markets={mockMarkets}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              sortBy={sortBy}
              onCardClick={handleCardClick}
            />
          </>
        )}

        {activeTab === 'wallets' && (
          <div className="text-center py-12">
            <p className="text-secondary text-lg">
              {t('wallets.comingSoon')}
            </p>
          </div>
        )}
      </main>

      {/* Market Detail Modal */}
      {selectedMarket && (
        <MarketDetail
          market={selectedMarket}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  )
}
```

## 2. 创建市场页面 (app/create/page.tsx)

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '../../contexts/LanguageContext'
import { useWallet } from '../../contexts/WalletContext'

interface CreateMarketForm {
  title: string
  description: string
  category: string
  endDate: string
  endTime: string
  initialLiquidity: string
  resolutionSource: string
}

const CreateMarket = () => {
  const { t } = useLanguage()
  const { isConnected, address } = useWallet()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<CreateMarketForm>({
    title: '',
    description: '',
    category: 'news',
    endDate: '',
    endTime: '',
    initialLiquidity: '',
    resolutionSource: ''
  })
  const [errors, setErrors] = useState<Partial<CreateMarketForm>>({})

  const categories = [
    { value: 'news', label: t('category.news') },
    { value: 'tech', label: t('category.tech') },
    { value: 'politics', label: t('category.politics') },
    { value: 'sports', label: t('category.sports') },
    { value: 'crypto', label: t('category.crypto') },
    { value: 'entertainment', label: t('category.entertainment') }
  ]

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateMarketForm> = {}
    
    if (!formData.title.trim()) {
      newErrors.title = t('create.errors.titleRequired')
    } else if (formData.title.length < 10) {
      newErrors.title = t('create.errors.titleTooShort')
    }
    
    if (!formData.description.trim()) {
      newErrors.description = t('create.errors.descriptionRequired')
    } else if (formData.description.length < 20) {
      newErrors.description = t('create.errors.descriptionTooShort')
    }
    
    if (!formData.endDate) {
      newErrors.endDate = t('create.errors.endDateRequired')
    } else {
      const selectedDate = new Date(`${formData.endDate}T${formData.endTime || '23:59'}`)
      const now = new Date()
      if (selectedDate <= now) {
        newErrors.endDate = t('create.errors.endDateInvalid')
      }
    }
    
    if (!formData.endTime) {
      newErrors.endTime = t('create.errors.endTimeRequired')
    }
    
    if (!formData.initialLiquidity) {
      newErrors.initialLiquidity = t('create.errors.liquidityRequired')
    } else {
      const liquidity = parseFloat(formData.initialLiquidity)
      if (isNaN(liquidity) || liquidity <= 0) {
        newErrors.initialLiquidity = t('create.errors.liquidityInvalid')
      } else if (liquidity < 100) {
        newErrors.initialLiquidity = t('create.errors.liquidityTooLow')
      }
    }
    
    if (!formData.resolutionSource.trim()) {
      newErrors.resolutionSource = t('create.errors.resolutionSourceRequired')
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof CreateMarketForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isConnected) {
      alert(t('create.errors.walletNotConnected'))
      return
    }
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Success - redirect to market page
      alert(t('create.success'))
      router.push('/')
    } catch (error) {
      console.error('Error creating market:', error)
      alert(t('create.errors.submitFailed'))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black text-white">
        <nav className="sticky top-0 z-50 glass-effect border-b border-primary">
          <div className="responsive-container">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-accent-green to-primary-400 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <span className="text-xl font-bold text-primary">PredictMarket</span>
              </Link>
            </div>
          </div>
        </nav>
        
        <div className="responsive-container py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-dark-800 rounded-xl p-8 border border-dark-700">
              <div className="w-16 h-16 bg-accent-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-accent-red text-2xl">🔒</span>
              </div>
              <h2 className="text-2xl font-bold mb-4">{t('create.walletRequired')}</h2>
              <p className="text-secondary mb-6">{t('create.walletRequiredDesc')}</p>
              <Link href="/" className="btn-primary inline-block">
                {t('common.backToHome')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="sticky top-0 z-50 glass-effect border-b border-primary">
        <div className="responsive-container">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-accent-green to-primary-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold text-primary">PredictMarket</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-secondary">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="responsive-container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-accent-green bg-clip-text text-transparent">
              {t('create.title')}
            </h1>
            <p className="text-secondary">
              {t('create.subtitle')}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Market Title */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('create.fields.title')} *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder={t('create.placeholders.title')}
                className={`w-full bg-dark-800 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-colors ${
                  errors.title ? 'border-accent-red' : 'border-dark-700 focus:border-primary-500'
                }`}
              />
              {errors.title && (
                <p className="text-accent-red text-sm mt-1">{errors.title}</p>
              )}
            </div>
            
            {/* Market Description */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('create.fields.description')} *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder={t('create.placeholders.description')}
                rows={4}
                className={`w-full bg-dark-800 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-colors resize-none ${
                  errors.description ? 'border-accent-red' : 'border-dark-700 focus:border-primary-500'
                }`}
              />
              {errors.description && (
                <p className="text-accent-red text-sm mt-1">{errors.description}</p>
              )}
            </div>
            
            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('create.fields.category')} *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* End Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('create.fields.endDate')} *
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full bg-dark-800 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${
                    errors.endDate ? 'border-accent-red' : 'border-dark-700 focus:border-primary-500'
                  }`}
                />
                {errors.endDate && (
                  <p className="text-accent-red text-sm mt-1">{errors.endDate}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('create.fields.endTime')} *
                </label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                  className={`w-full bg-dark-800 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${
                    errors.endTime ? 'border-accent-red' : 'border-dark-700 focus:border-primary-500'
                  }`}
                />
                {errors.endTime && (
                  <p className="text-accent-red text-sm mt-1">{errors.endTime}</p>
                )}
              </div>
            </div>
            
            {/* Initial Liquidity */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('create.fields.initialLiquidity')} *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  value={formData.initialLiquidity}
                  onChange={(e) => handleInputChange('initialLiquidity', e.target.value)}
                  placeholder="1000"
                  min="100"
                  step="10"
                  className={`w-full bg-dark-800 border rounded-lg pl-8 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-colors ${
                    errors.initialLiquidity ? 'border-accent-red' : 'border-dark-700 focus:border-primary-500'
                  }`}
                />
              </div>
              {errors.initialLiquidity && (
                <p className="text-accent-red text-sm mt-1">{errors.initialLiquidity}</p>
              )}
              <p className="text-gray-400 text-sm mt-1">
                {t('create.hints.initialLiquidity')}
              </p>
            </div>
            
            {/* Resolution Source */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('create.fields.resolutionSource')} *
              </label>
              <input
                type="text"
                value={formData.resolutionSource}
                onChange={(e) => handleInputChange('resolutionSource', e.target.value)}
                placeholder={t('create.placeholders.resolutionSource')}
                className={`w-full bg-dark-800 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-colors ${
                  errors.resolutionSource ? 'border-accent-red' : 'border-dark-700 focus:border-primary-500'
                }`}
              />
              {errors.resolutionSource && (
                <p className="text-accent-red text-sm mt-1">{errors.resolutionSource}</p>
              )}
              <p className="text-gray-400 text-sm mt-1">
                {t('create.hints.resolutionSource')}
              </p>
            </div>
            
            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <Link
                href="/"
                className="flex-1 btn-secondary text-center"
              >
                {t('common.cancel')}
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('create.submitting') : t('create.submit')}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default CreateMarket
```

## 3. 导航栏组件 (components/Navbar.tsx)

```typescript
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '../contexts/LanguageContext'
import { useWallet } from '../contexts/WalletContext'
import { useTheme } from '../contexts/ThemeContext'

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage()
  const { isConnected, address, connectWallet, disconnectWallet, isConnecting } = useWallet()
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showWalletMenu, setShowWalletMenu] = useState(false)

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en')
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-primary">
      <div className="responsive-container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-accent-green to-primary-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold text-primary">PredictMarket</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4 xl:space-x-6">
            <Link 
              href="/create" 
              className="btn-primary text-sm lg:text-base px-3 py-2 lg:px-4"
            >
              {t('nav.createMarket')}
            </Link>
            
            <Link 
              href="/my-markets" 
              className="text-secondary hover:text-primary transition-colors font-medium text-sm lg:text-base whitespace-nowrap"
            >
              {t('nav.myMarkets')}
            </Link>
            
            <Link 
              href="/leaderboard" 
              className="text-secondary hover:text-primary transition-colors font-medium text-sm lg:text-base whitespace-nowrap"
            >
              {t('nav.leaderboard')}
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-secondary hover:text-primary transition-colors"
              title={theme === 'dark' ? t('nav.lightMode') : t('nav.darkMode')}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 text-sm font-medium text-secondary hover:text-primary border border-dark-700 hover:border-primary-500 rounded-md transition-colors"
            >
              {language === 'en' ? '中文' : 'EN'}
            </button>

            {/* Wallet Connection */}
            <div className="relative">
              {isConnected ? (
                <div>
                  <button
                    onClick={() => setShowWalletMenu(!showWalletMenu)}
                    className="flex items-center space-x-2 bg-primary-500 text-black px-3 py-2 rounded-lg font-medium hover:bg-primary-400 transition-colors text-sm lg:text-base"
                  >
                    <div className="w-2 h-2 bg-accent-green rounded-full"></div>
                    <span>{formatAddress(address!)}</span>
                  </button>
                  
                  {showWalletMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-dark-800 border border-dark-700 rounded-lg shadow-lg py-2">
                      <div className="px-4 py-2 text-sm text-secondary border-b border-dark-700">
                        {address}
                      </div>
                      <button
                        onClick={() => {
                          disconnectWallet()
                          setShowWalletMenu(false)
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-accent-red hover:bg-dark-700 transition-colors"
                      >
                        {t('nav.disconnect')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="btn-primary text-sm lg:text-base px-3 py-2 lg:px-4 disabled:opacity-50"
                >
                  {isConnecting ? t('nav.connecting') : t('nav.connectWallet')}
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-secondary hover:text-primary transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-dark-700 py-4 space-y-4">
            <Link 
              href="/create" 
              className="block text-secondary hover:text-primary transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.createMarket')}
            </Link>
            
            <Link 
              href="/my-markets" 
              className="block text-secondary hover:text-primary transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.myMarkets')}
            </Link>
            
            <Link 
              href="/leaderboard" 
              className="block text-secondary hover:text-primary transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.leaderboard')}
            </Link>

            <div className="flex items-center justify-between pt-4 border-t border-dark-700">
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 text-secondary hover:text-primary transition-colors"
                >
                  {theme === 'dark' ? '☀️' : '🌙'}
                </button>
                
                <button
                  onClick={toggleLanguage}
                  className="px-3 py-1 text-sm font-medium text-secondary hover:text-primary border border-dark-700 hover:border-primary-500 rounded-md transition-colors"
                >
                  {language === 'en' ? '中文' : 'EN'}
                </button>
              </div>
              
              {isConnected ? (
                <div className="flex flex-col items-end space-y-2">
                  <span className="text-sm text-secondary">{formatAddress(address!)}</span>
                  <button
                    onClick={() => {
                      disconnectWallet()
                      setIsMenuOpen(false)
                    }}
                    className="text-sm text-accent-red hover:text-accent-red-dark transition-colors"
                  >
                    {t('nav.disconnect')}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    connectWallet()
                    setIsMenuOpen(false)
                  }}
                  disabled={isConnecting}
                  className="btn-primary text-sm px-4 py-2 disabled:opacity-50"
                >
                  {isConnecting ? t('nav.connecting') : t('nav.connectWallet')}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
```

---

*此文档包含了预测市场应用的核心组件代码，可直接用于V0或其他平台的UI重建。*