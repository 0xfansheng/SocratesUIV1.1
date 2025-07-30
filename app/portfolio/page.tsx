'use client'

import { useState } from 'react'
import { useWallet } from '../../contexts/WalletContext'
import { useTrading } from '../../contexts/TradingContext'
import { useLanguage } from '../../contexts/LanguageContext'
import Navbar from '../../components/Navbar'

export default function Portfolio() {
  const { isConnected, balance } = useWallet()
  const { positions, transactions, getTotalPnL } = useTrading()
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'positions' | 'transactions'>('positions')

  const totalPnL = getTotalPnL()
  const activePositions = positions.filter(p => p.status === 'active')
  const recentTransactions = transactions.slice(0, 10)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400'
      case 'pending': return 'text-yellow-400'
      case 'failed': return 'text-red-400'
      default: return 'text-secondary'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '已完成'
      case 'pending': return '处理中'
      case 'failed': return '失败'
      default: return status
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-primary">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="text-6xl mb-4">🔒</div>
              <h2 className="text-2xl font-bold text-primary mb-4">请连接钱包</h2>
              <p className="text-secondary">您需要连接钱包才能查看投资组合</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">投资组合</h1>
          <p className="text-secondary">管理您的持仓和交易历史</p>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-secondary rounded-xl p-6 border border-tertiary">
            <div className="text-secondary text-sm mb-2">钱包余额</div>
            <div className="text-2xl font-bold text-primary">${balance.toFixed(2)}</div>
          </div>
          
          <div className="bg-secondary rounded-xl p-6 border border-tertiary">
            <div className="text-secondary text-sm mb-2">活跃持仓</div>
            <div className="text-2xl font-bold text-primary">{activePositions.length}</div>
          </div>
          
          <div className="bg-secondary rounded-xl p-6 border border-tertiary">
            <div className="text-secondary text-sm mb-2">总交易数</div>
            <div className="text-2xl font-bold text-primary">{transactions.length}</div>
          </div>
          
          <div className="bg-secondary rounded-xl p-6 border border-tertiary">
            <div className="text-secondary text-sm mb-2">总盈亏</div>
            <div className={`text-2xl font-bold ${
              totalPnL >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-secondary rounded-lg p-1 w-fit">
            <button
              onClick={() => setActiveTab('positions')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'positions'
                  ? 'bg-accent-green text-black'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              持仓
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'transactions'
                  ? 'bg-accent-green text-black'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              交易历史
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'positions' ? (
          <div className="space-y-4">
            {activePositions.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-primary mb-2">暂无持仓</h3>
                <p className="text-secondary">开始交易以建立您的投资组合</p>
              </div>
            ) : (
              activePositions.map((position) => (
                <div key={position.id} className="bg-secondary rounded-xl p-6 border border-tertiary">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        {position.marketTitle}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className={`px-3 py-1 rounded-full font-medium ${
                          position.option === 'yes'
                            ? 'bg-green-600/20 text-green-400'
                            : 'bg-red-600/20 text-red-400'
                        }`}>
                          {position.option === 'yes' ? '是' : '否'}
                        </span>
                        <span className="text-secondary">
                          {formatDate(position.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-secondary text-sm mb-1">投入金额</div>
                      <div className="text-primary font-semibold">${position.amount.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-secondary text-sm mb-1">份额</div>
                      <div className="text-primary font-semibold">{position.shares.toFixed(4)}</div>
                    </div>
                    <div>
                      <div className="text-secondary text-sm mb-1">平均价格</div>
                      <div className="text-primary font-semibold">${position.price.toFixed(4)}</div>
                    </div>
                    <div>
                      <div className="text-secondary text-sm mb-1">状态</div>
                      <div className="text-primary font-semibold">
                        {position.status === 'active' ? '活跃' : '已结算'}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {recentTransactions.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-primary mb-2">暂无交易记录</h3>
                <p className="text-secondary">您的交易历史将在这里显示</p>
              </div>
            ) : (
              recentTransactions.map((transaction) => (
                <div key={transaction.id} className="bg-secondary rounded-xl p-6 border border-tertiary">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        {transaction.marketTitle}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className={`px-3 py-1 rounded-full font-medium ${
                          transaction.option === 'yes'
                            ? 'bg-green-600/20 text-green-400'
                            : 'bg-red-600/20 text-red-400'
                        }`}>
                          {transaction.option === 'yes' ? '是' : '否'}
                        </span>
                        <span className="text-secondary">
                          {formatDate(transaction.timestamp)}
                        </span>
                        <span className={getStatusColor(transaction.status)}>
                          {getStatusText(transaction.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <div className="text-secondary text-sm mb-1">类型</div>
                      <div className="text-primary font-semibold">
                        {transaction.type === 'buy' ? '买入' : '卖出'}
                      </div>
                    </div>
                    <div>
                      <div className="text-secondary text-sm mb-1">金额</div>
                      <div className="text-primary font-semibold">${transaction.amount.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-secondary text-sm mb-1">份额</div>
                      <div className="text-primary font-semibold">{transaction.shares.toFixed(4)}</div>
                    </div>
                    <div>
                      <div className="text-secondary text-sm mb-1">价格</div>
                      <div className="text-primary font-semibold">${transaction.price.toFixed(4)}</div>
                    </div>
                    <div>
                      <div className="text-secondary text-sm mb-1">手续费</div>
                      <div className="text-primary font-semibold">${transaction.fee.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}