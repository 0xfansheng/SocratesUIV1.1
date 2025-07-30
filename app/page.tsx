'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../components/Navbar'
import PredictionCard from '../components/PredictionCard'
import { useLanguage } from '../contexts/LanguageContext'
import { mockMarkets } from '../mock/markets'

export default function Home() {
  const { t } = useLanguage()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('Markets')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [liveStreams, setLiveStreams] = useState<Array<{
    id: string;
    title: string;
    description: string;
    streamer: string;
    viewers: string;
    gradient: string;
  }>>([])
  
  // 主标签页
  const mainTabs = [
    { key: 'Markets', label: t('tab.markets') || '市场', icon: '📊' },
    { key: 'Following', label: t('tab.following') || '跟单', icon: '👥' },
    { key: 'Live', label: t('tab.live') || '直播', icon: '📺' },
    { key: 'Invite', label: '邀请', icon: '🎁' }
  ]



  // 生成随机直播
  const generateRandomStreams = () => {
    const streamers = ['CryptoMaster', 'MarketGuru', 'TradePro', 'PumpKing', 'CoinSage', 'TradeWizard']
    const titles = [
      '🚀 新币发射直播',
      '📈 市场分析直播', 
      '💰 交易策略分享',
      '🔥 热门币种解析',
      '📊 技术指标教学',
      '💎 价值投资分享'
    ]
    const gradients = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500', 
      'from-orange-500 to-red-500',
      'from-green-500 to-teal-500',
      'from-yellow-500 to-orange-500',
      'from-indigo-500 to-purple-500'
    ]
    
    return Array.from({ length: 3 }, (_, i) => ({
      id: String(i + 1),
      title: titles[Math.floor(Math.random() * titles.length)],
      description: '实时分析市场趋势，分享投资策略',
      streamer: `@${streamers[Math.floor(Math.random() * streamers.length)]}`,
      viewers: `${Math.floor(Math.random() * 2000 + 500)}`,
      gradient: gradients[Math.floor(Math.random() * gradients.length)]
    }))
  }
  
  // 处理市场卡片点击事件
  const handleCardClick = (marketId: string) => {
    router.push(`/market/${marketId}`)
  }

  // 过滤和排序市场数据
  const filteredAndSortedMarkets = useMemo(() => {
    let filtered = mockMarkets
    
    // 搜索过滤
    if (searchQuery) {
      filtered = filtered.filter(market => 
        market.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        market.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }
    
    // 分类过滤
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(market => market.category === selectedCategory)
    }
    
    // 排序
    switch (sortBy) {
      case 'newest':
        return filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id))
      case 'oldest':
        return filtered.sort((a, b) => parseInt(a.id) - parseInt(b.id))
      case 'volume':
        return filtered.sort((a, b) => b.participants - a.participants)
      case 'ending_soon':
        return filtered.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
      default:
        return filtered
    }
  }, [searchQuery, selectedCategory, sortBy])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // 初始化直播数据
  useEffect(() => {
    setLiveStreams(generateRandomStreams())
    
    const streamInterval = setInterval(() => {
      setLiveStreams(generateRandomStreams())
    }, 12000) // 每12秒刷新直播
    
    return () => {
      clearInterval(streamInterval)
    }
  }, [])

  const LoadingSkeleton = () => (
    <div className="bg-tertiary rounded-2xl p-4 animate-pulse">
      <div className="h-32 bg-secondary rounded-xl mb-4"></div>
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 bg-secondary rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-secondary rounded mb-2"></div>
          <div className="h-3 bg-secondary rounded w-3/4"></div>
        </div>
      </div>
    </div>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('loading') || '加载中...'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* 主标签页导航 */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {mainTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="px-4 py-6">
        {activeTab === 'Markets' && (
          <div className="space-y-6">


            {/* 话题板块分类 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">话题板块分类</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                  { key: 'crypto', label: '加密货币', icon: '₿', color: 'bg-orange-100 text-orange-700' },
                  { key: 'sports', label: '体育赛事', icon: '⚽', color: 'bg-green-100 text-green-700' },
                  { key: 'politics', label: '政治选举', icon: '🗳️', color: 'bg-blue-100 text-blue-700' },
                  { key: 'tech', label: '科技创新', icon: '🚀', color: 'bg-purple-100 text-purple-700' },
                  { key: 'entertainment', label: '娱乐影视', icon: '🎬', color: 'bg-pink-100 text-pink-700' },
                  { key: 'finance', label: '金融市场', icon: '📈', color: 'bg-indigo-100 text-indigo-700' }
                ].map((topic) => (
                  <button
                    key={topic.key}
                    onClick={() => setSelectedCategory(topic.key)}
                    className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                      selectedCategory === topic.key 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full ${topic.color} flex items-center justify-center text-2xl mb-2 mx-auto`}>
                      {topic.icon}
                    </div>
                    <p className="text-sm font-medium text-gray-900">{topic.label}</p>
                  </button>
                ))}
              </div>
            </div>
            
            {/* 搜索和过滤栏 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                {/* 搜索框 */}
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t('search.placeholder') || '搜索市场...'}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* 分类过滤 */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">{t('category.all') || '全部分类'}</option>
                  <option value="sports">{t('category.sports') || '体育'}</option>
                  <option value="politics">{t('category.politics') || '政治'}</option>
                  <option value="entertainment">{t('category.entertainment') || '娱乐'}</option>
                  <option value="technology">{t('category.technology') || '科技'}</option>
                  <option value="economics">{t('category.economics') || '经济'}</option>
                </select>
                
                {/* 排序选择 */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="newest">{t('sort.newest') || '最新'}</option>
                  <option value="oldest">{t('sort.oldest') || '最早'}</option>
                  <option value="volume">{t('sort.volume') || '交易量'}</option>
                  <option value="ending_soon">{t('sort.ending_soon') || '即将结束'}</option>
                </select>
              </div>
            </div>

            {/* 市场卡片网格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedMarkets.map((market) => (
                <PredictionCard
                  key={market.id}
                  id={market.id}
                  title={market.title}
                  icon={market.icon}
                  imageUrl={market.imageUrl}
                  creatorAvatar={market.creatorAvatar}
                  creatorName={market.creatorName}
                  tags={market.tags}
                  options={market.options}
                  yesPercentage={market.yesPercentage}
                  currentPrice={market.currentPrice}
                  priceChange={market.priceChange}
                  participants={market.participants}
                  liquidity={market.liquidity}
                  volume={market.volume}
                  endDate={market.endDate}
                  status={market.status}
                  isHot={market.isHot}
                  category={market.category}
                  onCardClick={() => handleCardClick(market.id)}
                />
              ))}
            </div>
            
            {filteredAndSortedMarkets.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📊</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t('no_markets.title') || '暂无市场'}
                </h3>
                <p className="text-gray-500">
                  {t('no_markets.description') || '没有找到符合条件的市场，请尝试调整搜索条件。'}
                </p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'Invite' && (
          <div className="space-y-6">
            {/* 邀请横幅 - 参考Hyperliquid绿色主题 */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <div className="text-5xl mr-4">🎁</div>
                  <div className="text-center">
                    <h2 className="text-4xl font-bold mb-2">推荐</h2>
                    <p className="text-emerald-100 text-lg">邀请用户获取收益奖励</p>
                  </div>
                </div>
                
                {/* 统计数据 */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-100">0</div>
                    <div className="text-sm text-emerald-200">推荐交易者</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-100">0.00 美元</div>
                    <div className="text-sm text-emerald-200">累计收益</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-100">0.00 美元</div>
                    <div className="text-sm text-emerald-200">可提取收益</div>
                  </div>
                </div>
                
                {/* 操作按钮 */}
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={() => router.push('/invite')}
                    className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    邀请用户
                  </button>
                  <button className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    历史记录
                  </button>
                  <button className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    获取支持
                  </button>
                </div>
              </div>
            </div>

            {/* 邀请说明 - 简化版本 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">了解更多</h3>
                <p className="text-gray-600">推荐用户并获取收益奖励</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-bold mt-1">1</div>
                    <div>
                      <h4 className="font-medium text-gray-900">分享邀请链接</h4>
                      <p className="text-sm text-gray-600">将您的专属邀请链接分享给朋友</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-bold mt-1">2</div>
                    <div>
                      <h4 className="font-medium text-gray-900">朋友开始交易</h4>
                      <p className="text-sm text-gray-600">被邀请用户注册并开始交易</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-bold mt-1">3</div>
                    <div>
                      <h4 className="font-medium text-gray-900">获得奖励</h4>
                      <p className="text-sm text-gray-600">从被邀请用户的交易中获得持续收益</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-bold mt-1">4</div>
                    <div>
                      <h4 className="font-medium text-gray-900">实时到账</h4>
                      <p className="text-sm text-gray-600">收益实时到账，随时可以提取</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 推荐表格 - 类似Hyperliquid的表格样式 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">推荐历史</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">加入日期</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">已开仓</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">收益</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <div className="text-4xl mb-3">👥</div>
                          <p className="text-lg font-medium mb-2">暂无推荐记录</p>
                          <p className="text-sm">开始邀请用户获取收益奖励</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>


          </div>
        )}
        
        {activeTab === 'Following' && (
          <div className="space-y-6">
            {/* 聪明钱包排行榜 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                🧠 {t('following.smartWallets')}
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">{t('following.wallet')}</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-900">{t('following.1dPnl')}</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-900">{t('following.7dPnl')}</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-900">{t('following.30dPnl')}</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-900">{t('following.7dWinRate')}</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-900">{t('following.7dTrades')}</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-900">{t('following.followers')}</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-900">{t('following.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        address: '0x1234...5678',
                        name: 'CryptoWhale',
                        pnl1d: '+12.5%',
                        pnl7d: '+45.2%',
                        pnl30d: '+156.8%',
                        winRate: '78%',
                        trades: '23',
                        followers: '1.2K',
                        status: 'online'
                      },
                      {
                        address: '0x9876...4321',
                        name: 'SmartTrader',
                        pnl1d: '+8.3%',
                        pnl7d: '+32.1%',
                        pnl30d: '+134.5%',
                        winRate: '72%',
                        trades: '18',
                        followers: '856',
                        status: 'online'
                      },
                      {
                        address: '0x5555...9999',
                        name: 'MarketMaster',
                        pnl1d: '+15.7%',
                        pnl7d: '+28.9%',
                        pnl30d: '+98.3%',
                        winRate: '69%',
                        trades: '31',
                        followers: '634',
                        status: 'offline'
                      },
                      {
                        address: '0x7777...3333',
                        name: 'ProfitGuru',
                        pnl1d: '+6.2%',
                        pnl7d: '+19.4%',
                        pnl30d: '+87.6%',
                        winRate: '65%',
                        trades: '15',
                        followers: '423',
                        status: 'online'
                      },
                      {
                        address: '0x2222...8888',
                        name: 'TrendFollower',
                        pnl1d: '+4.1%',
                        pnl7d: '+16.7%',
                        pnl30d: '+76.2%',
                        winRate: '61%',
                        trades: '12',
                        followers: '298',
                        status: 'offline'
                      }
                    ].map((trader, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {trader.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{trader.name}</div>
                              <div className="text-sm text-gray-500 flex items-center">
                                {trader.address}
                                <span className={`ml-2 w-2 h-2 rounded-full ${
                                  trader.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                                }`}></span>
                                <span className="ml-1 text-xs">
                                  {trader.status === 'online' ? t('following.online') : t('following.offline')}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-green-600 font-medium">{trader.pnl1d}</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-green-600 font-medium">{trader.pnl7d}</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-green-600 font-medium">{trader.pnl30d}</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-blue-600 font-medium">{trader.winRate}</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-gray-700">{trader.trades}</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-gray-700">{trader.followers}</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex space-x-2 justify-end">
                            <button className="px-3 py-1 bg-green-500 text-white text-sm rounded-full hover:bg-green-600 transition-colors">
                              {t('following.follow')}
                            </button>
                            <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600 transition-colors">
                              {t('following.copy')}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 我的跟单历史 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                📈 {t('following.myHistory')}
              </h3>
              
              <div className="text-center py-8">
                <div className="text-gray-400 text-4xl mb-3">📊</div>
                <p className="text-gray-500 mb-4">{t('following.noRecords')}</p>
                <p className="text-sm text-gray-400">{t('following.startCopyTrading')}</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'Live' && (
          <div className="space-y-6">
            {/* 热门直播区域 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  🔴 {t('live.featuredStreams')}
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{t('live.liveNow')}</span>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {liveStreams.map((stream) => (
                  <div 
                    key={stream.id}
                    onClick={() => router.push(`/live/${stream.id}`)}
                    className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className={`aspect-video bg-gradient-to-br ${stream.gradient} rounded-lg mb-3 relative`}>
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse"></div>
                        LIVE
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        {stream.viewers} {t('live.watching')}
                      </div>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">{stream.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{stream.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{stream.streamer}</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/live/${stream.id}`)
                        }}
                        className="text-xs bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600"
                      >
                        {t('live.joinStream')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 直播排行榜 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 热门主播排行 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  🏆 热门主播排行
                </h3>
                <div className="space-y-3">
                  {[
                    { rank: 1, name: 'CryptoKing', viewers: '2.1K', profit: '+156%', badge: '🥇' },
                    { rank: 2, name: 'MarketWizard', viewers: '1.8K', profit: '+134%', badge: '🥈' },
                    { rank: 3, name: 'TradeMaster', viewers: '1.5K', profit: '+98%', badge: '🥉' },
                    { rank: 4, name: 'PumpGuru', viewers: '1.2K', profit: '+87%', badge: '4️⃣' },
                    { rank: 5, name: 'CoinSage', viewers: '956', profit: '+76%', badge: '5️⃣' }
                  ].map((streamer) => (
                    <div key={streamer.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{streamer.badge}</span>
                        <div>
                          <div className="font-medium text-gray-900">{streamer.name}</div>
                          <div className="text-sm text-gray-500">{streamer.viewers} 观看中</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">{streamer.profit}</div>
                        <div className="text-xs text-gray-500">7日收益</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 实时聊天区域 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  💬 {t('live.realTimeChat')}
                </h3>
                <div className="h-64 bg-gray-50 rounded-lg p-3 mb-3 overflow-y-auto">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start space-x-2">
                      <span className="font-medium text-blue-600">TradePro:</span>
                      <span className="text-gray-700">刚刚买入了新的预测市场，看好这个趋势！</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="font-medium text-green-600">CryptoFan:</span>
                      <span className="text-gray-700">主播分析得很到位，跟着操作赚了不少</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="font-medium text-purple-600">MarketLover:</span>
                      <span className="text-gray-700">这个市场的流动性很好，值得关注</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="font-medium text-orange-600">PumpExpert:</span>
                      <span className="text-gray-700">建议大家理性投资，控制风险</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder={t('live.chatPlaceholder')}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                    {t('live.send')}
                  </button>
                </div>
              </div>
            </div>

            {/* 开始直播按钮 */}
            <div className="text-center">
              <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-lg font-medium hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105">
                🎥 {t('live.startStream')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}