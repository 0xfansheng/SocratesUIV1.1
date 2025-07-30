'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { useWallet } from './WalletContext'

interface Position {
  id: string
  marketId: string
  marketTitle: string
  option: 'yes' | 'no'
  amount: number
  shares: number
  price: number
  timestamp: string
  status: 'active' | 'settled'
  pnl?: number
}

interface Transaction {
  id: string
  marketId: string
  marketTitle: string
  type: 'buy' | 'sell'
  option: 'yes' | 'no'
  amount: number
  shares: number
  price: number
  fee: number
  timestamp: string
  status: 'pending' | 'completed' | 'failed'
}

interface MarketData {
  id: string
  yesPrice: number
  noPrice: number
  yesPercentage: number
  volume: number
  liquidity: number
  lastUpdated: string
}

interface TradeParams {
  marketId: string
  marketTitle?: string
  option: 'yes' | 'no'
  type: 'buy' | 'sell'
  amount: number
  price: number
}

interface TradingContextType {
  positions: Position[]
  transactions: Transaction[]
  marketData: { [marketId: string]: MarketData }
  executeTrade: (params: TradeParams) => Promise<boolean>
  getPosition: (marketId: string) => Position | null
  getTotalPnL: () => number
  updateMarketData: (marketId: string, data: Partial<MarketData>) => void
  isTrading: boolean
}

const TradingContext = createContext<TradingContextType | undefined>(undefined)

export const TradingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { balance, isConnected, deductBalance } = useWallet()
  const [positions, setPositions] = useState<Position[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [marketData, setMarketData] = useState<{ [marketId: string]: MarketData }>({})
  const [isTrading, setIsTrading] = useState(false)

  // 初始化市场数据
  useEffect(() => {
    const initialMarketData = {
      '1': {
        id: '1',
        yesPrice: 0.68,
        noPrice: 0.32,
        yesPercentage: 68,
        volume: 128500,
        liquidity: 45200,
        lastUpdated: new Date().toISOString()
      },
      '2': {
        id: '2',
        yesPrice: 0.45,
        noPrice: 0.55,
        yesPercentage: 45,
        volume: 89300,
        liquidity: 32100,
        lastUpdated: new Date().toISOString()
      },
      '3': {
        id: '3',
        yesPrice: 0.72,
        noPrice: 0.28,
        yesPercentage: 72,
        volume: 156700,
        liquidity: 58900,
        lastUpdated: new Date().toISOString()
      }
    }
    setMarketData(initialMarketData)
  }, [])

  // 从本地存储加载数据
  useEffect(() => {
    if (isConnected) {
      const savedPositions = localStorage.getItem('trading_positions')
      const savedTransactions = localStorage.getItem('trading_transactions')
      
      if (savedPositions) {
        setPositions(JSON.parse(savedPositions))
      }
      
      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions))
      }
    }
  }, [isConnected])

  // 保存到本地存储
  useEffect(() => {
    if (positions.length > 0) {
      localStorage.setItem('trading_positions', JSON.stringify(positions))
    }
  }, [positions])

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem('trading_transactions', JSON.stringify(transactions))
    }
  }, [transactions])

  const executeTrade = async (params: TradeParams): Promise<boolean> => {
    const { marketId, marketTitle, option, type, amount, price } = params
    
    if (!isConnected || isTrading) return false

    setIsTrading(true)

    try {
      const market = marketData[marketId]
      if (!market) throw new Error('市场数据不存在')

      const marketPrice = option === 'yes' ? market.yesPrice : market.noPrice
      const tradePrice = price || marketPrice
      const fee = amount * 0.01 // 1% 手续费
      const totalCost = amount + fee

      if (totalCost > balance) {
        throw new Error('余额不足')
      }

      // 扣除余额
      const balanceDeducted = deductBalance(totalCost)
      if (!balanceDeducted) {
        throw new Error('余额扣除失败')
      }

      // 计算获得的份额
      const shares = amount / tradePrice

      // 创建交易记录
      const transaction: Transaction = {
        id: Date.now().toString(),
        marketId,
        marketTitle: marketTitle || `市场 ${marketId}`,
        type,
        option,
        amount,
        shares,
        price: tradePrice,
        fee,
        timestamp: new Date().toISOString(),
        status: 'pending'
      }

      setTransactions(prev => [transaction, ...prev])

      // 模拟交易延迟
      await new Promise(resolve => setTimeout(resolve, 2000))

      // 更新交易状态为完成
      setTransactions(prev => 
        prev.map(t => 
          t.id === transaction.id 
            ? { ...t, status: 'completed' as const }
            : t
        )
      )

      // 更新或创建持仓
      setPositions(prev => {
        const existingPosition = prev.find(p => p.marketId === marketId && p.option === option)
        
        if (existingPosition) {
          // 更新现有持仓
          const newShares = existingPosition.shares + shares
          const newAmount = existingPosition.amount + amount
          const avgPrice = newAmount / newShares
          
          return prev.map(p => 
            p.id === existingPosition.id
              ? {
                  ...p,
                  amount: newAmount,
                  shares: newShares,
                  price: avgPrice
                }
              : p
          )
        } else {
          // 创建新持仓
          const newPosition: Position = {
            id: Date.now().toString(),
            marketId,
            marketTitle: marketTitle || `市场 ${marketId}`,
            option,
            amount,
            shares,
            price,
            timestamp: new Date().toISOString(),
            status: 'active'
          }
          return [newPosition, ...prev]
        }
      })

      // 更新市场数据（模拟价格变化）
      updateMarketData(marketId, {
        volume: market.volume + amount,
        lastUpdated: new Date().toISOString()
      })

      return true
    } catch (error) {
      console.error('交易执行失败:', error)
      
      // 更新交易状态为失败
      setTransactions(prev => 
        prev.map(t => 
          t.timestamp === new Date().toISOString()
            ? { ...t, status: 'failed' as const }
            : t
        )
      )
      
      return false
    } finally {
      setIsTrading(false)
    }
  }

  const getPosition = (marketId: string): Position | null => {
    return positions.find(p => p.marketId === marketId && p.status === 'active') || null
  }

  const getTotalPnL = (): number => {
    return positions.reduce((total, position) => {
      if (position.status === 'settled' && position.pnl !== undefined) {
        return total + position.pnl
      }
      
      // 计算未实现盈亏
      const market = marketData[position.marketId]
      if (market) {
        const currentPrice = position.option === 'yes' ? market.yesPrice : market.noPrice
        const currentValue = position.shares * currentPrice
        const unrealizedPnL = currentValue - position.amount
        return total + unrealizedPnL
      }
      
      return total
    }, 0)
  }

  const updateMarketData = (marketId: string, data: Partial<MarketData>) => {
    setMarketData(prev => ({
      ...prev,
      [marketId]: {
        ...prev[marketId],
        ...data
      }
    }))
  }

  return (
    <TradingContext.Provider value={{
      positions,
      transactions,
      marketData,
      executeTrade,
      getPosition,
      getTotalPnL,
      updateMarketData,
      isTrading
    }}>
      {children}
    </TradingContext.Provider>
  )
}

export const useTrading = () => {
  const context = useContext(TradingContext)
  if (context === undefined) {
    throw new Error('useTrading must be used within a TradingProvider')
  }
  return context
}