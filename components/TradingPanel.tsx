'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { useWallet } from '../contexts/WalletContext'
import { useTrading } from '../contexts/TradingContext'

// 定义组件属性接口
interface TradingPanelProps {
  marketId: string
  marketTitle: string
  yesPrice: number
  noPrice: number
  yesPercentage: number
  volume: string
  participants: number
  endDate: string
}

type OrderType = 'market' | 'limit'
type TradeType = 'buy' | 'sell'

const TradingPanel = ({
  marketId,
  marketTitle,
  yesPrice,
  noPrice,
  yesPercentage,
  volume,
  participants,
  endDate
}: TradingPanelProps) => {
  const { t } = useLanguage()
  const { balance, isConnected, deductBalance } = useWallet()
  const { executeTrade, getPosition } = useTrading()
  
  const [selectedOption, setSelectedOption] = useState<'yes' | 'no'>('yes')
  const [tradeType, setTradeType] = useState<TradeType>('buy')
  const [orderType, setOrderType] = useState<OrderType>('market')
  const [amount, setAmount] = useState('')
  const [limitPrice, setLimitPrice] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const userPosition = getPosition(marketId)
  const currentPrice = selectedOption === 'yes' ? yesPrice : noPrice
  const fee = parseFloat(amount) * 0.01 || 0 // 1% fee
  const total = parseFloat(amount) + fee || 0
  const shares = orderType === 'market' 
    ? parseFloat(amount) / currentPrice || 0
    : parseFloat(amount) / parseFloat(limitPrice) || 0
  const potentialPayout = shares * 1.00 // 每股最大收益$1
  const potentialProfit = potentialPayout - parseFloat(amount) || 0

  useEffect(() => {
    if (orderType === 'market') {
      setLimitPrice(currentPrice.toFixed(4))
    }
  }, [orderType, currentPrice])

  const handleSubmit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('请输入有效金额')
      return
    }

    setIsSubmitting(true)
    setError('')
    
    try {
      const success = await executeTrade({
        marketId,
        marketTitle,
        option: selectedOption,
        type: tradeType,
        amount: parseFloat(amount),
        price: orderType === 'limit' ? parseFloat(limitPrice) : currentPrice
      })
      
      if (success) {
        setSuccess(true)
        setAmount('')
        setTimeout(() => setSuccess(false), 3000)
      } else {
        setError('交易失败，请重试')
      }
    } catch (err) {
      setError('交易执行出错')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatTimeRemaining = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()
    const diff = end.getTime() - now.getTime()
    
    if (diff <= 0) return '已结束'
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (days > 0) return `${days}天 ${hours}小时`
    return `${hours}小时`
  }

  return (
    <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden">
      {/* Market Header - Polymarket Style */}
      <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-b border-gray-800/50 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">{marketTitle}</h2>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400">市场ID:</span>
            <span className="text-xs text-blue-400 font-mono">{marketId.slice(0, 8)}...</span>
          </div>
        </div>
        
        {/* Key Metrics - Polymarket Style Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-800/30 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-blue-400">💰</span>
              <span className="text-xs text-gray-400 uppercase tracking-wide">交易量</span>
            </div>
            <div className="text-lg font-bold text-white">{volume}</div>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-green-400">👥</span>
              <span className="text-xs text-gray-400 uppercase tracking-wide">参与者</span>
            </div>
            <div className="text-lg font-bold text-white">{participants.toLocaleString()}</div>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-purple-400">📊</span>
              <span className="text-xs text-gray-400 uppercase tracking-wide">是/否概率</span>
            </div>
            <div className="text-lg font-bold text-white">{yesPercentage}% / {100 - yesPercentage}%</div>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-orange-400">⏰</span>
              <span className="text-xs text-gray-400 uppercase tracking-wide">剩余时间</span>
            </div>
            <div className="text-lg font-bold text-white">{formatTimeRemaining(endDate)}</div>
          </div>
        </div>
      </div>

      {/* Trading Content */}
      <div className="p-6 space-y-6">
        {/* Current Position - Enhanced */}
        {userPosition && (
          <div className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-500/30 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-blue-400">📊</span>
                <span className="text-blue-400 font-semibold">当前持仓</span>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                userPosition.option === 'yes' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {userPosition.option === 'yes' ? '看涨' : '看跌'}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">选项</div>
                <div className={`text-lg font-bold ${
                  userPosition.option === 'yes' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {userPosition.option === 'yes' ? '是' : '否'}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">投入金额</div>
                <div className="text-lg font-bold text-white">${userPosition.amount.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">持有份额</div>
                <div className="text-lg font-bold text-white">{userPosition.shares.toFixed(4)}</div>
              </div>
            </div>
          </div>
        )}

        {/* Price Display - Polymarket Style */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">选择预测结果</h3>
            <div className="text-sm text-gray-400">点击选择交易选项</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* YES Option */}
            <div 
              className={`relative p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer group ${
                selectedOption === 'yes'
                  ? 'border-green-500 bg-green-500/10 shadow-lg shadow-green-500/20'
                  : 'border-gray-700 bg-gray-800/50 hover:border-green-500/50 hover:bg-green-500/5'
              }`} 
              onClick={() => setSelectedOption('yes')}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    selectedOption === 'yes' ? 'bg-green-500' : 'bg-gray-600 group-hover:bg-green-500/50'
                  }`} />
                  <span className="text-xl font-bold text-green-400">是</span>
                </div>
                <span className="text-2xl">📈</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-white">${yesPrice.toFixed(3)}</span>
                  <span className="text-sm text-gray-400">每份</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-green-400">{yesPercentage}%</span>
                  <span className="text-xs text-gray-400 uppercase tracking-wide">胜率</span>
                </div>
              </div>
              
              {selectedOption === 'yes' && (
                <div className="absolute inset-0 rounded-xl border-2 border-green-500 animate-pulse" />
              )}
            </div>
            
            {/* NO Option */}
            <div 
              className={`relative p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer group ${
                selectedOption === 'no'
                  ? 'border-red-500 bg-red-500/10 shadow-lg shadow-red-500/20'
                  : 'border-gray-700 bg-gray-800/50 hover:border-red-500/50 hover:bg-red-500/5'
              }`} 
              onClick={() => setSelectedOption('no')}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    selectedOption === 'no' ? 'bg-red-500' : 'bg-gray-600 group-hover:bg-red-500/50'
                  }`} />
                  <span className="text-xl font-bold text-red-400">否</span>
                </div>
                <span className="text-2xl">📉</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-white">${noPrice.toFixed(3)}</span>
                  <span className="text-sm text-gray-400">每份</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-red-400">{(100 - yesPercentage)}%</span>
                  <span className="text-xs text-gray-400 uppercase tracking-wide">胜率</span>
                </div>
              </div>
              
              {selectedOption === 'no' && (
                <div className="absolute inset-0 rounded-xl border-2 border-red-500 animate-pulse" />
              )}
            </div>
          </div>
        </div>

        {/* Trading Controls - Enhanced */}
        <div className="space-y-6">
          {/* Buy/Sell Toggle - Polymarket Style */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-semibold text-white">交易类型</h4>
              <div className="text-xs text-gray-400">选择买入或卖出</div>
            </div>
            <div className="flex bg-gray-800/80 rounded-xl p-1.5 border border-gray-700">
              <button
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  tradeType === 'buy'
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
                onClick={() => setTradeType('buy')}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span>📈</span>
                  <span>买入</span>
                </div>
              </button>
              <button
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  tradeType === 'sell'
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
                onClick={() => setTradeType('sell')}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span>📉</span>
                  <span>卖出</span>
                </div>
              </button>
            </div>
          </div>

          {/* Order Type - Enhanced */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-semibold text-white">订单类型</h4>
              <div className="text-xs text-gray-400">市价或限价</div>
            </div>
            <div className="flex bg-gray-800/80 rounded-xl p-1.5 border border-gray-700">
              <button
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  orderType === 'market'
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
                onClick={() => setOrderType('market')}
              >
                <div className="flex flex-col items-center space-y-1">
                  <span>⚡</span>
                  <span className="text-sm">市价单</span>
                  <span className="text-xs opacity-70">即时成交</span>
                </div>
              </button>
              <button
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  orderType === 'limit'
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
                onClick={() => setOrderType('limit')}
              >
                <div className="flex flex-col items-center space-y-1">
                  <span>🎯</span>
                  <span className="text-sm">限价单</span>
                  <span className="text-xs opacity-70">指定价格</span>
                </div>
              </button>
            </div>
          </div>

          {/* Amount Input - Enhanced */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-semibold text-white">交易金额</h4>
              <div className="text-xs text-gray-400">USD</div>
            </div>
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg font-semibold">$</div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-4 bg-gray-800/80 border border-gray-600 rounded-xl text-white text-lg font-semibold focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">余额: ${balance.toFixed(2)}</span>
              <div className="flex space-x-2">
                {[25, 50, 75, 100].map((percentage) => (
                  <button
                    key={percentage}
                    onClick={() => setAmount((balance * percentage / 100).toFixed(2))}
                    className="px-2 py-1 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 rounded text-gray-300 hover:text-white transition-all"
                  >
                    {percentage}%
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Limit Price (only for limit orders) - Enhanced */}
          {orderType === 'limit' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold text-white">限价设置</h4>
                <div className="text-xs text-gray-400">每份价格</div>
              </div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg font-semibold">$</div>
                <input
                  type="number"
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(e.target.value)}
                  className="w-full pl-8 pr-4 py-4 bg-gray-800/80 border border-gray-600 rounded-xl text-white text-lg font-semibold focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="0.0000"
                  min="0"
                  step="0.0001"
                />
              </div>
              <div className="text-xs text-gray-400">
                当前市价: ${currentPrice.toFixed(4)}
              </div>
            </div>
          )}

          {/* Trade Summary - Enhanced */}
          {amount && (
            <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 border border-gray-600 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-base font-semibold text-white">交易预览</h4>
                <span className="text-xs text-gray-400 uppercase tracking-wide">确认详情</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">投入金额</span>
                  <span className="text-white font-semibold">${parseFloat(amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">平台手续费 (1%)</span>
                  <span className="text-white font-semibold">${fee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">执行价格</span>
                  <span className="text-white font-semibold">${currentPrice.toFixed(4)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">预计获得份额</span>
                  <span className="text-white font-semibold">{shares.toFixed(4)}</span>
                </div>
                
                <div className="border-t border-gray-600 pt-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold text-white">总计金额</span>
                    <span className="text-xl font-bold text-white">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">潜在收益</span>
                    <span className={`font-semibold ${
                      potentialProfit > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      ${potentialProfit.toFixed(2)} ({((potentialProfit / parseFloat(amount)) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message - Enhanced */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <span className="text-red-400 text-xl">⚠️</span>
                <div>
                  <div className="text-red-400 font-semibold text-sm">交易错误</div>
                  <p className="text-red-300 text-sm mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Success Message - Enhanced */}
          {success && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <span className="text-green-400 text-xl">✅</span>
                <div>
                  <div className="text-green-400 font-semibold text-sm">交易成功</div>
                  <p className="text-green-300 text-sm mt-1">您的交易已成功提交并正在处理中</p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button - Enhanced */}
          <button
            onClick={handleSubmit}
            disabled={!amount || parseFloat(amount) <= 0 || total > balance || !isConnected || isSubmitting}
            className={`w-full py-5 rounded-xl font-bold text-lg transition-all duration-200 transform ${
              !amount || parseFloat(amount) <= 0 || total > balance || !isConnected || isSubmitting
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : tradeType === 'buy'
                ? `${
                    selectedOption === 'yes' 
                      ? 'bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/30 hover:shadow-green-500/40' 
                      : 'bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/30 hover:shadow-green-500/40'
                  } text-white hover:scale-[1.02] active:scale-[0.98]`
                : `${
                    selectedOption === 'yes' 
                      ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30 hover:shadow-red-500/40' 
                      : 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30 hover:shadow-red-500/40'
                  } text-white hover:scale-[1.02] active:scale-[0.98]`
            }`}
          >
            {!isConnected ? (
              <div className="flex items-center justify-center space-x-3">
                <span className="text-xl">🔗</span>
                <span>连接钱包</span>
              </div>
            ) : isSubmitting ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                <span>处理交易中...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-3">
                <span className="text-xl">
                  {tradeType === 'buy' ? '💰' : '💸'}
                </span>
                <span>
                  {tradeType === 'buy' ? '买入' : '卖出'} "{selectedOption === 'yes' ? '是' : '否'}" 
                  {amount && `($${parseFloat(amount).toFixed(2)})`}
                </span>
              </div>
            )}
          </button>

          {/* Additional Info */}
          <div className="text-center space-y-2">
            <div className="text-xs text-gray-400">
              交易将在区块链上执行，请确认钱包中有足够的gas费用
            </div>
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
              <span>🔒 安全交易</span>
              <span>⚡ 即时结算</span>
              <span>📊 透明公开</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TradingPanel