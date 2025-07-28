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
      const endDateTime = new Date(`${formData.endDate}T${formData.endTime || '23:59'}`)
      const now = new Date()
      const minDate = new Date(now.getTime() + 24 * 60 * 60 * 1000) // 至少24小时后
      
      if (endDateTime <= minDate) {
        newErrors.endDate = t('create.errors.endDateTooSoon')
      }
    }
    
    if (!formData.initialLiquidity) {
      newErrors.initialLiquidity = t('create.errors.liquidityRequired')
    } else {
      const liquidity = parseFloat(formData.initialLiquidity)
      if (isNaN(liquidity) || liquidity < 100) {
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
    // 清除对应字段的错误
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isConnected) {
      alert(t('create.connectWallet'))
      return
    }
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // 模拟创建市场的API调用
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 创建成功后跳转到市场列表
      alert('Market created successfully!')
      router.push('/')
    } catch (error) {
      console.error('创建市场失败:', error)
      alert('Failed to create market, please try again')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="responsive-container">
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="w-16 h-16 bg-accent-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-primary mb-4">{t('create.connectWallet')}</h1>
            <p className="text-secondary mb-8">{t('create.connectWalletDesc')}</p>
            <Link href="/" className="btn-primary inline-flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>{t('create.backToHome')}</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="responsive-container">
        <div className="max-w-4xl mx-auto">
          {/* 页面标题 */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-secondary hover:text-primary transition-colors mb-4">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t('create.backToMarkets')}
            </Link>
            <h1 className="text-4xl font-bold text-primary mb-2">{t('create.title')}</h1>
            <p className="text-secondary">{t('create.subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 主要信息 */}
              <div className="lg:col-span-2 space-y-6">
                <div className="card p-6">
                  <h2 className="text-xl font-semibold text-primary mb-6">{t('create.basicInfo')}</h2>
                  
                  {/* 市场标题 */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-primary mb-2">
                      {t('create.marketTitle')} *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder={t('create.marketTitlePlaceholder')}
                      className={`w-full px-4 py-3 bg-tertiary border rounded-lg focus:ring-2 focus:ring-accent-green focus:border-transparent transition-colors ${
                        errors.title ? 'border-red-500' : 'border-secondary'
                      }`}
                      maxLength={200}
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                    )}
                    <p className="text-xs text-secondary mt-1">{formData.title.length}/200 字符</p>
                  </div>

                  {/* 市场描述 */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-primary mb-2">
                      {t('create.description')} *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder={t('create.descriptionPlaceholder')}
                      rows={6}
                      className={`w-full px-4 py-3 bg-tertiary border rounded-lg focus:ring-2 focus:ring-accent-green focus:border-transparent transition-colors resize-none ${
                        errors.description ? 'border-red-500' : 'border-secondary'
                      }`}
                      maxLength={1000}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                    )}
                    <p className="text-xs text-secondary mt-1">{formData.description.length}/1000 字符</p>
                  </div>

                  {/* 分类 */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-primary mb-2">
                      {t('create.category')} *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-3 bg-tertiary border border-secondary rounded-lg focus:ring-2 focus:ring-accent-green focus:border-transparent transition-colors"
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 解决方案来源 */}
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      {t('create.resolutionSource')} *
                    </label>
                    <input
                      type="text"
                      value={formData.resolutionSource}
                      onChange={(e) => handleInputChange('resolutionSource', e.target.value)}
                      placeholder={t('create.resolutionSourcePlaceholder')}
                      className={`w-full px-4 py-3 bg-tertiary border rounded-lg focus:ring-2 focus:ring-accent-green focus:border-transparent transition-colors ${
                        errors.resolutionSource ? 'border-red-500' : 'border-secondary'
                      }`}
                    />
                    {errors.resolutionSource && (
                      <p className="text-red-500 text-sm mt-1">{errors.resolutionSource}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* 侧边栏 */}
              <div className="space-y-6">
                {/* 时间设置 */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">{t('create.timeSettings')}</h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-primary mb-2">
                      {t('create.endDate')} *
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                      className={`w-full px-4 py-3 bg-tertiary border rounded-lg focus:ring-2 focus:ring-accent-green focus:border-transparent transition-colors ${
                        errors.endDate ? 'border-red-500' : 'border-secondary'
                      }`}
                    />
                    {errors.endDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      {t('create.endTime')}
                    </label>
                    <input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => handleInputChange('endTime', e.target.value)}
                      className="w-full px-4 py-3 bg-tertiary border border-secondary rounded-lg focus:ring-2 focus:ring-accent-green focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                {/* 流动性设置 */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">{t('create.initialLiquidity')}</h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-primary mb-2">
                      {t('create.liquidityAmount')} *
                    </label>
                    <input
                      type="number"
                      value={formData.initialLiquidity}
                      onChange={(e) => handleInputChange('initialLiquidity', e.target.value)}
                      placeholder="100"
                      min="100"
                      step="10"
                      className={`w-full px-4 py-3 bg-tertiary border rounded-lg focus:ring-2 focus:ring-accent-green focus:border-transparent transition-colors ${
                        errors.initialLiquidity ? 'border-red-500' : 'border-secondary'
                      }`}
                    />
                    {errors.initialLiquidity && (
                      <p className="text-red-500 text-sm mt-1">{errors.initialLiquidity}</p>
                    )}
                  </div>

                  <div className="bg-accent-green/10 border border-accent-green/20 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="text-sm text-accent-green">
                        <p className="font-medium mb-1">{t('create.liquidityInfo')}</p>
                        <p>{t('create.liquidityDesc')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 创建按钮 */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{t('create.creating')}</span>
                    </div>
                  ) : (
                    t('create.createMarket')
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateMarket