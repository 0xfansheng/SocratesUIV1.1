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
  const [showSuccess, setShowSuccess] = useState(false)

  // 模拟数据示例
  const mockExamples = [
    {
      title: '2024年比特币价格是否会突破10万美元？',
      description: '预测2024年底前比特币价格是否会达到或超过100,000美元。这个预测基于当前市场趋势、机构采用情况、监管环境变化等多个因素。参与者可以根据自己对加密货币市场的分析来进行预测。',
      category: 'crypto',
      endDate: '2024-12-31',
      endTime: '23:59',
      initialLiquidity: '1000',
      resolutionSource: 'CoinMarketCap, CoinGecko等主流加密货币价格追踪网站'
    },
    {
      title: '2024年美国总统大选结果预测',
      description: '预测2024年美国总统大选的获胜者。这是一个重要的政治事件，将影响全球政治格局。参与者需要考虑各种政治因素、民调数据、候选人表现等来做出预测。',
      category: 'politics',
      endDate: '2024-11-05',
      endTime: '20:00',
      initialLiquidity: '2000',
      resolutionSource: '美国官方选举结果公告'
    },
    {
      title: 'OpenAI GPT-5是否会在2024年发布？',
      description: '预测OpenAI是否会在2024年内正式发布GPT-5模型。考虑因素包括技术发展进度、市场竞争、监管环境等。这个预测对AI行业发展具有重要意义。',
      category: 'tech',
      endDate: '2024-12-31',
      endTime: '23:59',
      initialLiquidity: '500',
      resolutionSource: 'OpenAI官方公告和技术发布会'
    }
  ]

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

  // 填充示例数据
  const fillExampleData = (exampleIndex: number) => {
    const example = mockExamples[exampleIndex]
    setFormData(example)
    setErrors({})
  }

  // 清空表单
  const clearForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'news',
      endDate: '',
      endTime: '',
      initialLiquidity: '',
      resolutionSource: ''
    })
    setErrors({})
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
      // 模拟创建市场的详细过程
      console.log('开始创建市场...', formData)
      
      // 第一阶段：验证数据
      await new Promise(resolve => setTimeout(resolve, 800))
      console.log('✓ 数据验证完成')
      
      // 第二阶段：创建智能合约
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('✓ 智能合约部署完成')
      
      // 第三阶段：初始化流动性
      await new Promise(resolve => setTimeout(resolve, 700))
      console.log('✓ 初始流动性注入完成')
      
      // 第四阶段：注册到市场列表
      await new Promise(resolve => setTimeout(resolve, 500))
      console.log('✓ 市场注册完成')
      
      // 生成模拟的市场ID
      const marketId = `market_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      console.log('✓ 市场创建成功！市场ID:', marketId)
      
      // 显示成功状态
      setShowSuccess(true)
      
      // 3秒后跳转到市场列表
      setTimeout(() => {
        router.push('/')
      }, 3000)
      
    } catch (error) {
      console.error('创建市场失败:', error)
      alert('创建市场失败，请重试')
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

          {/* 示例数据快速填充 */}
          <div className="mb-6 p-4 bg-accent-green/10 rounded-lg border border-accent-green/20">
            <h3 className="text-lg font-semibold text-primary mb-3">🚀 快速开始 - 使用示例数据</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              {mockExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => fillExampleData(index)}
                  className="p-3 bg-tertiary border border-secondary rounded-lg hover:bg-accent-green/5 transition-colors text-left"
                >
                  <div className="font-medium text-primary text-sm mb-1">
                    {example.category === 'crypto' && '💰'}
                    {example.category === 'politics' && '🗳️'}
                    {example.category === 'tech' && '🤖'}
                    {example.category === 'news' && '📰'}
                    {example.category === 'sports' && '⚽'}
                    {example.category === 'entertainment' && '🎬'}
                  </div>
                  <div className="text-xs text-secondary line-clamp-2">{example.title}</div>
                </button>
              ))}
            </div>
            <button
              onClick={clearForm}
              className="text-sm text-secondary hover:text-primary underline"
            >
              清空表单
            </button>
          </div>

          {/* 模拟环境提示 */}
           <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
             <div className="flex items-start space-x-3">
               <div className="text-yellow-600 text-xl">⚠️</div>
               <div>
                 <h4 className="font-semibold text-yellow-800 mb-1">模拟环境说明</h4>
                 <p className="text-sm text-yellow-700 mb-2">
                   这是一个模拟的创建市场环境。创建过程会模拟真实的区块链交互，包括数据验证、智能合约部署、流动性注入等步骤。
                 </p>
                 <p className="text-xs text-yellow-600">
                   💡 提示：打开浏览器控制台可以查看详细的创建过程日志
                 </p>
               </div>
             </div>
           </div>

           {/* 成功状态显示 */}
           {showSuccess && (
             <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
               <div className="bg-background rounded-lg p-8 max-w-md mx-4 text-center">
                 <div className="w-16 h-16 bg-accent-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                   <svg className="w-8 h-8 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                   </svg>
                 </div>
                 <h3 className="text-xl font-bold text-primary mb-2">🎉 市场创建成功！</h3>
                 <p className="text-secondary mb-4">您的预测市场已成功创建，正在跳转到市场列表...</p>
                 <div className="flex items-center justify-center space-x-2 text-accent-green">
                   <div className="w-4 h-4 border-2 border-accent-green/30 border-t-accent-green rounded-full animate-spin" />
                   <span className="text-sm">3秒后自动跳转</span>
                 </div>
               </div>
             </div>
           )}

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
                  className="w-full bg-accent-green text-background py-3 px-6 rounded-lg font-semibold hover:bg-accent-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      <span>正在创建市场...</span>
                    </>
                  ) : (
                    <>
                      <span>🚀</span>
                      <span>创建市场</span>
                    </>
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