'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../contexts/LanguageContext'
import Navbar from '../../components/Navbar'

interface Market {
  id: string
  title: string
  description: string
  category: string
  status: 'active' | 'ended' | 'resolved'
  endDate: string
  totalVolume: number
  participants: number
  myPosition?: {
    option: string
    amount: number
    potential: number
  }
  result?: string
}

const MyMarketsPage = () => {
  const { t } = useLanguage()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('participated')

  // 模拟数据
  const myMarkets: Market[] = [
    {
      id: '1',
      title: '比特币在2024年底是否会突破10万美元？',
      description: '预测比特币价格在2024年12月31日前是否会达到或超过100,000美元',
      category: 'crypto',
      status: 'active',
      endDate: '2024-12-31',
      totalVolume: 125000,
      participants: 1250,
      myPosition: {
        option: '会突破',
        amount: 500,
        potential: 750
      }
    },
    {
      id: '2',
      title: '2024年美国总统大选结果预测',
      description: '预测2024年美国总统大选的获胜者',
      category: 'politics',
      status: 'ended',
      endDate: '2024-11-05',
      totalVolume: 2500000,
      participants: 15000,
      myPosition: {
        option: '民主党候选人',
        amount: 1000,
        potential: 1200
      },
      result: '民主党候选人'
    },
    {
      id: '3',
      title: 'OpenAI是否会在2024年发布GPT-5？',
      description: '预测OpenAI是否会在2024年内正式发布GPT-5模型',
      category: 'tech',
      status: 'resolved',
      endDate: '2024-12-31',
      totalVolume: 75000,
      participants: 800,
      myPosition: {
        option: '会发布',
        amount: 300,
        potential: 450
      },
      result: '不会发布'
    }
  ]

  const createdMarkets: Market[] = [
    {
      id: '4',
      title: '以太坊2.0是否会在2024年完全部署？',
      description: '预测以太坊2.0升级是否会在2024年内完全完成',
      category: 'crypto',
      status: 'active',
      endDate: '2024-12-31',
      totalVolume: 45000,
      participants: 450
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'ended':
        return 'bg-yellow-100 text-yellow-800'
      case 'resolved':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return '进行中'
      case 'ended':
        return '已结束'
      case 'resolved':
        return '已结算'
      default:
        return '未知'
    }
  }

  const getCategoryText = (category: string) => {
    const categories: { [key: string]: string } = {
      crypto: '加密货币',
      sports: '体育赛事',
      politics: '政治选举',
      tech: '科技创新',
      entertainment: '娱乐影视',
      finance: '金融市场'
    }
    return categories[category] || category
  }

  const calculatePnL = (market: Market) => {
    if (!market.myPosition) return 0
    
    if (market.status === 'resolved') {
      if (market.result === market.myPosition.option) {
        return market.myPosition.potential - market.myPosition.amount
      } else {
        return -market.myPosition.amount
      }
    }
    
    return 0
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">我的市场</h1>
          <p className="text-gray-600">管理您参与和创建的预测市场</p>
        </div>

        {/* 标签页导航 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('participated')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'participated'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              参与的市场 ({myMarkets.length})
            </button>
            <button
              onClick={() => setActiveTab('created')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'created'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              创建的市场 ({createdMarkets.length})
            </button>
          </div>
        </div>

        {/* 市场列表 */}
        <div className="space-y-4">
          {activeTab === 'participated' && (
            <>
              {myMarkets.map((market) => {
                const pnl = calculatePnL(market)
                return (
                  <div key={market.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{market.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(market.status)}`}>
                            {getStatusText(market.status)}
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {getCategoryText(market.category)}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{market.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">结束时间:</span>
                            <p className="font-medium">{new Date(market.endDate).toLocaleDateString('zh-CN')}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">总交易量:</span>
                            <p className="font-medium">${market.totalVolume.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">参与人数:</span>
                            <p className="font-medium">{market.participants.toLocaleString()}</p>
                          </div>
                          {market.myPosition && (
                            <div>
                              <span className="text-gray-500">我的仓位:</span>
                              <p className="font-medium">${market.myPosition.amount}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => router.push(`/market/${market.id}`)}
                        className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        查看详情
                      </button>
                    </div>
                    
                    {market.myPosition && (
                      <div className="border-t border-gray-200 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">预测选项:</span>
                            <p className="font-medium text-blue-600">{market.myPosition.option}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">投入金额:</span>
                            <p className="font-medium">${market.myPosition.amount}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">潜在收益:</span>
                            <p className="font-medium text-green-600">${market.myPosition.potential}</p>
                          </div>
                          {market.status === 'resolved' && (
                            <div>
                              <span className="text-gray-500">盈亏:</span>
                              <p className={`font-medium ${pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {pnl >= 0 ? '+' : ''}${pnl}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        {market.status === 'resolved' && market.result && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-500">最终结果: </span>
                            <span className="text-sm font-medium text-gray-900">{market.result}</span>
                            {market.result === market.myPosition.option && (
                              <span className="ml-2 text-sm text-green-600">✓ 预测正确</span>
                            )}
                            {market.result !== market.myPosition.option && (
                              <span className="ml-2 text-sm text-red-600">✗ 预测错误</span>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </>
          )}
          
          {activeTab === 'created' && (
            <>
              {createdMarkets.map((market) => (
                <div key={market.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{market.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(market.status)}`}>
                          {getStatusText(market.status)}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {getCategoryText(market.category)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{market.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">结束时间:</span>
                          <p className="font-medium">{new Date(market.endDate).toLocaleDateString('zh-CN')}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">总交易量:</span>
                          <p className="font-medium">${market.totalVolume.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">参与人数:</span>
                          <p className="font-medium">{market.participants.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4 flex space-x-2">
                      <button
                        onClick={() => router.push(`/market/${market.id}`)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        查看详情
                      </button>
                      {market.status === 'active' && (
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          编辑
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* 空状态 */}
        {((activeTab === 'participated' && myMarkets.length === 0) || 
          (activeTab === 'created' && createdMarkets.length === 0)) && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeTab === 'participated' ? '暂无参与的市场' : '暂无创建的市场'}
            </h3>
            <p className="text-gray-500 mb-6">
              {activeTab === 'participated' 
                ? '您还没有参与任何预测市场，去首页探索有趣的市场吧！'
                : '您还没有创建任何市场，创建一个新的预测市场开始吧！'
              }
            </p>
            <button
              onClick={() => router.push(activeTab === 'participated' ? '/' : '/create')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {activeTab === 'participated' ? '探索市场' : '创建市场'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyMarketsPage