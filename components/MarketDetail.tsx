'use client'

import { useState, useEffect } from 'react'
import { useWallet } from '../contexts/WalletContext'
import { useLanguage } from '../contexts/LanguageContext'
import { useTrading } from '../contexts/TradingContext'
import PredictionModal from './PredictionModal'

interface Comment {
  id: string
  user: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  replies?: Comment[]
}

interface MarketDetailProps {
  marketId: string
  onClose: () => void
}

export default function MarketDetail({ marketId, onClose }: MarketDetailProps) {
  const { isConnected } = useWallet()
  const { t } = useLanguage()
  const { marketData, getPosition } = useTrading()
  const [selectedOption, setSelectedOption] = useState<'yes' | 'no'>('yes')
  const [showModal, setShowModal] = useState(false)
  const [amount, setAmount] = useState('')
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: '加密分析师',
      avatar: '👨‍💼',
      content: '基于最近的市场趋势，我认为这有很高的概率会发生。',
      timestamp: '2小时前',
      likes: 12,
      replies: [
        {
          id: '1-1',
          user: '交易大师',
          avatar: '🚀',
          content: '我同意！基本面看起来很强劲。',
          timestamp: '1小时前',
          likes: 5
        }
      ]
    },
    {
      id: '2',
      user: '市场专家',
      avatar: '📊',
      content: '有趣的预测。你基于什么数据做出这个判断？',
      timestamp: '3小时前',
      likes: 8
    }
  ])

  // 获取市场数据
  const currentMarketData = marketData[marketId]
  const userPosition = getPosition(marketId)
  
  // 模拟市场数据 - 在真实应用中，根据marketId获取
  const market = {
    id: marketId,
    title: '比特币在2024年底会达到10万美元吗？',
    description: '如果比特币在2024年12月31日晚上11:59协调世界时之前在任何主要交易所达到或超过100,000美元，此市场将解决为"是"。',
    icon: '₿',
    imageUrl: '/api/placeholder/400/200',
    tags: ['加密货币', '比特币', '价格'],
    yesPercentage: currentMarketData?.yesPercentage || 68,
    currentPrice: currentMarketData?.yesPrice || 0.68,
    priceChange: 2.3,
    participants: 1247,
    liquidity: currentMarketData ? `$${(currentMarketData.liquidity / 1000).toFixed(1)}K` : '$45.2K',
    volume: currentMarketData ? `$${(currentMarketData.volume / 1000).toFixed(1)}K` : '$128.5K',
    endDate: '2024-12-31T23:59:59Z',
    status: 'active' as const,
    isHot: true
  }

  const handleBuyClick = (option: 'yes' | 'no') => {
    setSelectedOption(option)
    setShowModal(true)
  }

  const handleAddComment = () => {
    if (!newComment.trim() || !isConnected) return
    
    const comment: Comment = {
      id: Date.now().toString(),
      user: '您',
      avatar: '👤',
      content: newComment,
      timestamp: '刚刚',
      likes: 0
    }
    
    setComments([comment, ...comments])
    setNewComment('')
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-primary rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-secondary">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl">
              {market.icon}
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">{market.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-secondary mt-1">
                <span>👥 {formatNumber(market.participants)} 交易者</span>
                <span>💧 {market.liquidity}</span>
                <span>📊 {market.volume}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-secondary hover:bg-tertiary flex items-center justify-center text-primary transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Side - Market Info & Options */}
          <div className="w-1/2 p-6 border-r border-secondary overflow-y-auto">
            {/* Market Image */}
            {market.imageUrl && (
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <img 
                  src={market.imageUrl} 
                  alt={market.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            )}

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-primary mb-3">市场描述</h3>
              <p className="text-secondary leading-relaxed">{market.description}</p>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-primary mb-3">标签</h3>
              <div className="flex flex-wrap gap-2">
                {market.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-secondary text-secondary px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Market Stats */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-primary mb-3">市场统计</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary rounded-lg p-4">
                  <div className="text-secondary text-sm mb-1">当前价格</div>
                  <div className="text-primary font-semibold text-lg">${market.currentPrice.toFixed(2)}</div>
                  <div className={`text-sm ${
                    market.priceChange >= 0 ? 'text-[#00FFAE]' : 'text-[#FF3D5A]'
                  }`}>
                    {market.priceChange >= 0 ? '+' : ''}{market.priceChange.toFixed(1)}%
                  </div>
                </div>
                <div className="bg-secondary rounded-lg p-4">
                  <div className="text-secondary text-sm mb-1">是的概率</div>
                  <div className="text-[#00FFAE] font-semibold text-lg">{market.yesPercentage}%</div>
                  <div className="w-full bg-tertiary rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-[#00FFAE] to-[#00D4AA] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${market.yesPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Trading Interface */}
          <div className="w-1/2 p-6 overflow-y-auto">
            <h3 className="text-lg font-semibold text-primary mb-4">下注</h3>
            
            {/* Option Selection */}
            <div className="mb-6">
              <div className="flex space-x-2 mb-4">
                <button
                  onClick={() => setSelectedOption('yes')}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                    selectedOption === 'yes'
                      ? 'bg-[#00FFAE] text-black'
                      : 'bg-secondary text-secondary hover:bg-tertiary'
                  }`}
                >
                  是 - {market.yesPercentage}%
                </button>
                <button
                  onClick={() => setSelectedOption('no')}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                    selectedOption === 'no'
                      ? 'bg-[#FF3D5A] text-white'
                      : 'bg-secondary text-secondary hover:bg-tertiary'
                  }`}
                >
                  否 - {100 - market.yesPercentage}%
                </button>
              </div>
            </div>

            {/* Amount Input */}
            <div className="mb-6">
              <label className="block text-secondary text-sm mb-2">金额 (USD)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="输入金额"
                className="w-full bg-secondary border border-tertiary rounded-lg px-4 py-3 text-primary placeholder-gray-400 focus:outline-none focus:border-[#00FFAE]"
              />
            </div>

            {/* Potential Returns */}
            {amount && (
              <div className="mb-6 bg-secondary rounded-lg p-4">
                <div className="text-secondary text-sm mb-2">潜在收益</div>
                <div className="flex justify-between items-center">
                  <span className="text-primary">您支付:</span>
                  <span className="text-primary font-semibold">${amount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary">您可能赢得:</span>
                  <span className="text-[#00FFAE] font-semibold">
                    ${(parseFloat(amount) / (selectedOption === 'yes' ? market.currentPrice : (1 - market.currentPrice))).toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            {/* Position Info */}
            {userPosition && (
              <div className="mb-6 bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
                <div className="text-blue-400 text-sm mb-2">您的持仓</div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-primary">选项:</span>
                  <span className={`font-semibold ${
                    userPosition.option === 'yes' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {userPosition.option === 'yes' ? '是' : '否'}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-primary">投入金额:</span>
                  <span className="text-primary font-semibold">${userPosition.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary">份额:</span>
                  <span className="text-primary font-semibold">{userPosition.shares.toFixed(4)}</span>
                </div>
              </div>
            )}

            {/* Buy Button */}
            <button
              onClick={() => handleBuyClick(selectedOption)}
              disabled={!isConnected || !amount}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                selectedOption === 'yes'
                  ? 'bg-[#00FFAE] hover:bg-[#00D4AA] text-black'
                  : 'bg-[#FF3D5A] hover:bg-[#FF5A6B] text-white'
              }`}
            >
              {!isConnected ? '连接钱包' : `购买${selectedOption === 'yes' ? '是' : '否'}`}
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="border-t border-secondary p-6 max-h-80 overflow-y-auto">
          <h3 className="text-lg font-semibold text-primary mb-4">评论 ({comments.length})</h3>
          
          {/* Add Comment */}
          {isConnected && (
            <div className="mb-6">
              <div className="flex space-x-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm">
                  👤
                </div>
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="分享您的想法..."
                    className="w-full bg-secondary border border-tertiary rounded-lg px-3 py-2 text-primary placeholder-gray-400 focus:outline-none focus:border-[#00FFAE] resize-none"
                    rows={3}
                  />
                  <button
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="mt-2 bg-[#00FFAE] hover:bg-[#00D4AA] text-black px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    发表评论
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm flex-shrink-0">
                  {comment.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-primary font-semibold text-sm">{comment.user}</span>
                    <span className="text-secondary text-xs">{comment.timestamp}</span>
                  </div>
                  <p className="text-secondary text-sm mb-2">{comment.content}</p>
                  <div className="flex items-center space-x-4 text-xs">
                    <button className="text-secondary hover:text-[#00FFAE] transition-colors">
                      👍 {comment.likes}
                    </button>
                    <button className="text-secondary hover:text-primary transition-colors">
                      回复
                    </button>
                  </div>
                  
                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-3 ml-4 space-y-3">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex space-x-3">
                          <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs flex-shrink-0">
                            {reply.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-primary font-semibold text-xs">{reply.user}</span>
                              <span className="text-secondary text-xs">{reply.timestamp}</span>
                            </div>
                            <p className="text-secondary text-xs mb-1">{reply.content}</p>
                            <button className="text-secondary hover:text-[#00FFAE] transition-colors text-xs">
                              👍 {reply.likes}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prediction Modal */}
      {showModal && (
        <PredictionModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          marketTitle={market.title}
          selectedOption={selectedOption}
          currentPercentage={selectedOption === 'yes' ? market.yesPercentage : 100 - market.yesPercentage}
          marketId={market.id}
        />
      )}
    </div>
  )
}