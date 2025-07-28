'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'zh'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navbar
    'nav.createMarket': 'Create Market',
    'nav.myMarkets': 'My Markets',
    'nav.connectWallet': 'Connect Wallet',
    'nav.wallet.connected': 'Connected',
    'nav.wallet.address': 'Address',
    'nav.wallet.disconnect': 'Disconnect',
    'nav.wallet.connecting': 'Connecting...',
    
    // Hero Section
    'hero.title': 'Trade on the Future with',
    'hero.subtitle': 'Decentralized prediction markets where you can bet on real-world events and earn rewards for accurate predictions.',
    
    // Stats
    'stats.totalVolume': 'Total Volume',
    'stats.activeMarkets': 'Active Markets',
    'stats.traders': 'Traders',
    
    // Navigation
    'nav.markets': 'Markets',
    'nav.live': 'Live Stream',
    'nav.video': 'Video',
    'nav.audio': 'Audio',
    
    // Categories
    'category.all': 'All',
    'category.news': 'News',
    'category.tech': 'Tech',
    'category.politics': 'Politics',
    'category.sports': 'Sports',
    'category.crypto': 'Crypto',
    'category.entertainment': 'Entertainment',
    
    // Market Card
    'market.buyYes': 'Buy YES',
    'market.buyNo': 'Buy NO',
    'market.buy': 'Buy',
    'market.ends': 'Ends',
    'market.volume': 'Volume',
    'market.trading': 'Trading',
    'market.endingSoon': 'Ending Soon',
    'market.ended': 'Ended',
    'market.yesProb': 'YES Probability',
    'market.currentPrice': 'Current Price',
    'market.traders': 'Traders',
    'market.liquidity': 'Liquidity',
    'market.timeRemaining': 'Time Remaining',
    'market.connectWallet': 'Connect wallet to trade',
    'market.createdBy': 'Created by',
    
    // Buttons
    'button.loadMore': 'Load More Markets',
    'button.confirm': 'Confirm',
    'button.cancel': 'Cancel',
    'button.hot': 'Hot',
    
    // Search
    'search.placeholder': 'Search markets...',
    'search.noResults': 'No prediction markets found',
    'search.clearFilters': 'Clear filters',
    
    // Balance
    'balance.portfolio': 'Portfolio Balance',
    'balance.cash': 'Cash Balance',
    
    // Filter
    'filter.hotSections': 'Hot Sections',
    
    // Sort
    'sort.newest': 'Newest',
    'sort.volume': 'Volume',
    'sort.ending': 'Ending Soon',
    'sort.popular': 'Most Popular',
    
    // Following
    'following.follow': 'Follow',
    'following.details': 'Details',
    'following.myHistory': '📈 My Copy Trading History',
    'following.noRecords': 'No copy trading records',
    'following.startCopyTrading': 'Choose smart wallets to start copy trading',
    
    // Live
    'live.hotStreams': '🔴 Hot Streams',
    'live.streaming': 'Live',
    'live.viewers': 'viewers',
    'live.realTimeChat': '💬 Real-time Chat',
    
    // Modal
    'modal.prediction.title': 'Make Prediction',
    'modal.prediction.amount': 'Amount',
    'modal.prediction.enterAmount': 'Enter amount',
    'modal.prediction.balance': 'Balance',
    'modal.prediction.fee': 'Transaction Fee',
    'modal.prediction.total': 'Total',
    
    // Theme
    'theme.light': 'Light Mode',
    'theme.dark': 'Dark Mode',
    'theme.toggle': 'Toggle Theme',
    
    // Footer
    'footer.description': 'The future of decentralized prediction markets.',
    'footer.markets': 'Markets',
    'footer.support': 'Support',
    'footer.community': 'Community',
    'footer.helpCenter': 'Help Center',
    'footer.documentation': 'Documentation',
    'footer.api': 'API',
    'footer.contact': 'Contact',
    'footer.copyright': '© 2024 PredictMarket. All rights reserved.',
    
    // Main Tabs
    'tab.markets': 'Markets',
    'tab.following': 'Following',
    'tab.live': 'Live',
    
    // Market Sections
    'section.newCreated': '🆕 Latest Created Topics',
    'section.aboutToLaunch': '🚀 About to Launch Topics',
    'section.launched': '✅ Launched Topics',
    'section.updateEvery10s': 'Updates every 10s',
    'section.updateEvery15s': 'Updates every 15s',
    'section.keepOriginal': 'Keep original features',
    
    // Following Section
    'following.smartWallets': '🧠 Smart Wallet Leaderboard',
    'following.myHistory': '📊 My Copy Trading History',
    'following.wallet': 'Wallet',
    'following.1dPnl': '1D P&L',
    'following.7dPnl': '7D P&L',
    'following.30dPnl': '30D P&L',
    'following.7dWinRate': '7D Win Rate',
    'following.7dTrades': '7D Trades',
    'following.followers': 'Followers',
    'following.balance': 'Wallet Balance',
    'following.actions': 'Actions',
    'following.follow': 'Follow',
    'following.unfollow': 'Unfollow',
    'following.copy': 'Copy',
    'following.online': 'Online',
    'following.offline': 'Offline',
    
    // Live Section
    'live.hotStreams': '🔥 Hot Live Streams',
    'live.realTimeChat': '💬 Real-time Chat',
    'live.viewers': 'viewers',
    'live.watching': 'Watching',
    'live.chatPlaceholder': 'Type your message...',
    'live.send': 'Send',
    
    // Market Detail Page
    'market.backToMarkets': 'Back to Markets',
    'market.price': 'PRICE',
    'market.shares': 'SHARES',
    'market.total': 'TOTAL',
    'market.asks': 'ASKS',
    'market.bids': 'BIDS',
    'market.lastPrice': 'Last Price',
    'market.marketDepth': 'Market Depth',
    'market.marketOptions': 'Market Options',
    'market.yourPosition': 'Your Position',
    'market.probability': 'Probability',
    'market.trade': 'Trade',
    'market.connectToTrade': 'Connect your wallet to trade',
    'market.selectedOption': 'Selected Option',
    'market.sell': 'Sell',
    'market.amount': 'Amount (USDC)',
    'market.enterAmount': 'Enter amount',
    'market.buyShares': 'Buy Shares',
    'market.sellShares': 'Sell Shares',
    'market.recentTransactions': 'Recent Transactions',
    'market.bought': 'Bought',
    'market.sold': 'Sold',
    'market.discussion': 'Discussion',
    'market.shareThoughts': 'Share your thoughts on this market...',
    'market.characters': 'characters',
    'market.postComment': 'Post Comment',
    'market.connectToDiscuss': 'Connect your wallet to join the discussion',
    'market.noComments': 'No comments yet',
    'market.beFirst': 'Be the first to share your thoughts!',
    'market.reply': 'Reply',
    
    // Three Column Layout
    threeColumn: {
      liveMarkets: 'Live Markets',
      markets: 'Markets',
      loadingMore: 'Loading more markets...',
      endOfMarkets: "You've reached the end of all markets",
      backToTop: 'Back to Top'
    },
    
    // Card Component
    card: {
      hot: 'HOT',
      yes: 'YES',
      price: 'Price',
      '24h': '24h',
      volume: 'Volume',
      liquidity: 'Liquidity',
      tradeNow: 'Trade Now'
    },
    
    // Create Market
    create: {
      title: 'Create Prediction Market',
      subtitle: 'Create a new prediction market for others to trade on future events',
      connectWallet: 'Connect Wallet to Create Market',
      connectWalletDesc: 'You need to connect your wallet to create prediction markets and add initial liquidity',
      backToHome: 'Back to Home',
      backToMarkets: 'Back to Markets',
      basicInfo: 'Basic Information',
      marketTitle: 'Market Title',
      marketTitlePlaceholder: 'e.g., Will Bitcoin price exceed $100,000 in 2024?',
      description: 'Detailed Description',
      descriptionPlaceholder: 'Describe market rules, judgment criteria and relevant background information...',
      category: 'Market Category',
      resolutionSource: 'Resolution Source',
      resolutionSourcePlaceholder: 'e.g., CoinMarketCap official data, official announcements, etc.',
      timeSettings: 'Time Settings',
      endDate: 'End Date',
      endTime: 'End Time',
      initialLiquidity: 'Initial Liquidity',
      liquidityAmount: 'Liquidity Amount (USDC)',
      liquidityInfo: 'About Initial Liquidity',
      liquidityDesc: 'Initial liquidity will be used to provide trading depth for your market, ensuring users can trade smoothly. Minimum amount is 100 USDC.',
      createMarket: 'Create Market',
      creating: 'Creating...',
      errors: {
        titleRequired: 'Please enter market title',
        titleTooShort: 'Title must be at least 10 characters',
        descriptionRequired: 'Please enter market description',
        descriptionTooShort: 'Description must be at least 20 characters',
        endDateRequired: 'Please select end date',
        endDateTooSoon: 'End time must be at least 24 hours from now',
        liquidityRequired: 'Please enter initial liquidity',
        liquidityTooLow: 'Initial liquidity must be at least 100 USDC',
        resolutionSourceRequired: 'Please enter resolution source'
      }
    }
  },
  zh: {
    // Navbar
    'nav.createMarket': '创建市场',
    'nav.myMarkets': '我的市场',
    'nav.connectWallet': '连接钱包',
    'nav.wallet.connected': '已连接',
    'nav.wallet.address': '地址',
    'nav.wallet.disconnect': '断开连接',
    'nav.wallet.connecting': '连接中...',
    
    // Hero Section
    'hero.title': '用 PredictMarket 交易未来',
    'hero.subtitle': '去中心化预测市场，您可以对现实世界事件下注并因准确预测获得奖励。',
    
    // Stats
    'stats.totalVolume': '总交易量',
    'stats.activeMarkets': '活跃市场',
    'stats.traders': '交易者',
    
    // Navigation
    'nav.markets': '市场',
    'nav.live': '直播',
    'nav.video': '视频',
    'nav.audio': '音频',
    
    // Categories
    'category.all': '全部',
    'category.news': '新闻',
    'category.tech': '科技',
    'category.politics': '政治',
    'category.sports': '体育',
    'category.crypto': '加密货币',
    'category.entertainment': '娱乐',
    
    // Market Card
    'market.buyYes': '买入 YES',
    'market.buyNo': '买入 NO',
    'market.buy': '买入',
    'market.ends': '结束时间',
    'market.volume': '交易量',
    'market.trading': '交易中',
    'market.endingSoon': '即将结束',
    'market.ended': '已结束',
    'market.yesProb': 'YES 概率',
    'market.currentPrice': '当前价格',
    'market.traders': '交易者',
    'market.liquidity': '流动性',
    'market.timeRemaining': '剩余时间',
    'market.connectWallet': '连接钱包以交易',
    'market.createdBy': '创建者',
    
    // Buttons
    'button.loadMore': '加载更多市场',
    'button.confirm': '确认',
    'button.cancel': '取消',
    'button.hot': '热门',
    
    // Search
    'search.placeholder': '搜索市场...',
    'search.noResults': '未找到预测市场',
    'search.clearFilters': '清除过滤器',
    
    // Balance
    'balance.portfolio': '投资组合余额',
    'balance.cash': '现金余额',
    
    // Filter
    'filter.hotSections': '热门板块',
    
    // Sort
    'sort.newest': '最新',
    'sort.volume': '交易量',
    'sort.ending': '即将结束',
    'sort.popular': '最受欢迎',
    
    // Following
    'following.follow': '跟单',
    'following.details': '详情',
    'following.myHistory': '📈 我的跟单历史',
    'following.noRecords': '暂无跟单记录',
    'following.startCopyTrading': '选择聪明钱包开始跟单投资',
    
    // Live
    'live.hotStreams': '🔴 热门直播',
    'live.streaming': '直播中',
    'live.viewers': '观看',
    'live.realTimeChat': '💬 实时聊天',
    
    // Modal
    'modal.prediction.title': '进行预测',
    'modal.prediction.amount': '金额',
    'modal.prediction.enterAmount': '输入金额',
    'modal.prediction.balance': '余额',
    'modal.prediction.fee': '交易费用',
    'modal.prediction.total': '总计',
    
    // Theme
    'theme.light': '浅色模式',
    'theme.dark': '深色模式',
    'theme.toggle': '切换主题',
    
    // Footer
    'footer.description': '去中心化预测市场的未来。',
    'footer.markets': '市场',
    'footer.support': '支持',
    'footer.community': '社区',
    'footer.helpCenter': '帮助中心',
    'footer.documentation': '文档',
    'footer.api': 'API',
    'footer.contact': '联系我们',
    'footer.copyright': '© 2024 PredictMarket. 保留所有权利。',
    
    // Main Tabs
    'tab.markets': '市场',
    'tab.following': '跟单',
    'tab.live': '直播',
    
    // Market Sections
    'section.newCreated': '🆕 最新创建话题',
    'section.aboutToLaunch': '🚀 即将发射话题',
    'section.launched': '已发射话题',
    'section.updateEvery10s': '每10秒更新',
    'section.updateEvery15s': '每15秒更新',
    'section.keepOriginal': '保持原有功能',
    
    // Following Section
    'following.smartWallets': '🧠 聪明钱包排行榜',
    'following.myHistory': '📊 我的跟单历史',
    'following.wallet': '钱包',
    'following.1dPnl': '1D盈亏',
    'following.7dPnl': '7D盈亏',
    'following.30dPnl': '30D盈亏',
    'following.7dWinRate': '7D胜率',
    'following.7dTrades': '7D交易数',
    'following.followers': '跟单人数',
    'following.balance': '钱包余额',
    'following.actions': '操作',
    'following.follow': '跟单',
    'following.unfollow': '取消跟单',
    'following.copy': '复制',
    'following.online': '在线',
    'following.offline': '离线',
    
    // Live Section
    'live.hotStreams': '🔥 热门直播',
    'live.realTimeChat': '💬 实时聊天',
    'live.viewers': '观看者',
    'live.watching': '正在观看',
    'live.chatPlaceholder': '输入您的消息...',
    'live.send': '发送',
    
    // Market Detail Page
    'market.backToMarkets': '返回市场',
    'market.price': '价格',
    'market.shares': '股份',
    'market.total': '总计',
    'market.asks': '卖单',
    'market.bids': '买单',
    'market.lastPrice': '最新价格',
    'market.marketDepth': '市场深度',
    'market.marketOptions': '市场选项',
    'market.yourPosition': '您的持仓',
    'market.probability': '概率',
    'market.trade': '交易',
    'market.connectToTrade': '连接钱包开始交易',
    'market.selectedOption': '选择的选项',
    'market.sell': '卖出',
    'market.amount': '金额 (USDC)',
    'market.enterAmount': '输入金额',
    'market.buyShares': '买入股份',
    'market.sellShares': '卖出股份',
    'market.recentTransactions': '最近交易',
    'market.bought': '买入',
    'market.sold': '卖出',
    'market.discussion': '讨论',
    'market.shareThoughts': '分享您对这个市场的看法...',
    'market.characters': '字符',
    'market.postComment': '发表评论',
    'market.connectToDiscuss': '连接钱包参与讨论',
    'market.noComments': '暂无评论',
    'market.beFirst': '成为第一个分享想法的人！',
    'market.reply': '回复',
    
    // Three Column Layout
    threeColumn: {
      liveMarkets: '实时市场',
      markets: '个市场',
      loadingMore: '加载更多市场...',
      endOfMarkets: '您已浏览完所有市场',
      backToTop: '返回顶部'
    },
    
    // Card Component
    card: {
      hot: '热门',
      yes: '是',
      price: '价格',
      '24h': '24小时',
      volume: '交易量',
      liquidity: '流动性',
      tradeNow: '立即交易'
    },
    
    // Create Market
    create: {
      title: '创建预测市场',
      subtitle: '创建一个新的预测市场，让其他用户对未来事件进行预测',
      connectWallet: '连接钱包以创建市场',
      connectWalletDesc: '您需要连接钱包才能创建预测市场并添加初始流动性',
      backToHome: '返回首页',
      backToMarkets: '返回市场',
      basicInfo: '基本信息',
      marketTitle: '市场标题',
      marketTitlePlaceholder: '例如：2024年比特币价格会超过10万美元吗？',
      description: '详细描述',
      descriptionPlaceholder: '详细描述市场规则、判断标准和相关背景信息...',
      category: '市场分类',
      resolutionSource: '解决方案来源',
      resolutionSourcePlaceholder: '例如：CoinMarketCap官方数据、官方公告等',
      timeSettings: '时间设置',
      endDate: '结束日期',
      endTime: '结束时间',
      initialLiquidity: '初始流动性',
      liquidityAmount: '流动性金额 (USDC)',
      liquidityInfo: '关于初始流动性',
      liquidityDesc: '初始流动性将用于为您的市场提供交易深度，确保用户可以顺利进行交易。最低金额为100 USDC。',
      createMarket: '创建市场',
      creating: '创建中...',
      errors: {
        titleRequired: '请输入市场标题',
        titleTooShort: '标题至少需要10个字符',
        descriptionRequired: '请输入市场描述',
        descriptionTooShort: '描述至少需要20个字符',
        endDateRequired: '请选择结束日期',
        endDateTooSoon: '结束时间必须至少在24小时后',
        liquidityRequired: '请输入初始流动性',
        liquidityTooLow: '初始流动性至少需要100 USDC',
        resolutionSourceRequired: '请输入解决方案来源'
      }
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh')

  // Load saved language from localStorage on mount
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'zh')) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language to localStorage when it changes
  React.useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // Fallback to English if key not found in current language
        value = translations.en
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey]
          } else {
            return key // Return key if not found in either language
          }
        }
        break
      }
    }
    
    return typeof value === 'string' ? value : key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}