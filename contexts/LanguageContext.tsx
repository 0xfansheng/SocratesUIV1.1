'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'zh'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  zh: {
    // Navbar
    'nav.createMarket': '创建市场',
    'nav.myMarkets': '我的市场',
    'nav.connectWallet': '连接钱包',
    'nav.wallet.connected': '已连接',
    'nav.wallet.address': '地址',
    'nav.wallet.disconnect': '断开连接',
    'nav.wallet.connecting': '连接中...',
    
    // Hero
    'hero.title': '用 PredictMarket 交易未来',
    'hero.subtitle': '去中心化预测市场，您可以对现实世界事件下注并因准确预测获得奖励。',
    
    // Stats
    'stats.totalVolume': '总交易量',
    'stats.activeMarkets': '活跃市场',
    'stats.traders': '交易者',
    
    // Navigation
    'nav.home': '首页',
    'nav.markets': '市场',
    'nav.portfolio': '投资组合',
    'nav.profile': '个人资料',
    'nav.settings': '设置',
    'nav.help': '帮助',
    'nav.logout': '退出登录',
    
    // Tabs
    'tab.markets': '市场',
    'tab.following': '跟单',
    'tab.live': '直播',
    
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
    
    // Market
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
    
    // Loading
    'loading': '加载中...',
    
    // Market Sections
    'section.newCreated': '🆕 最新创建话题',
    'section.aboutToLaunch': '🚀 即将发射话题',
    'section.launched': '✅ 已发射话题',
    'section.updateEvery10s': '每10秒更新',
    'section.updateEvery15s': '每15秒更新',
    'section.keepOriginal': '保持原有功能',
    
    // Following Section
    'following.smartWallets': '🧠 聪明钱包排行榜',
    'following.wallet': '钱包',
    'following.1dPnl': '1D盈亏',
    'following.7dPnl': '7D盈亏',
    'following.30dPnl': '30D盈亏',
    'following.7dWinRate': '7D胜率',
    'following.7dTrades': '7D交易数',
    'following.followers': '跟单人数',
    'following.balance': '钱包余额',
    'following.actions': '操作',
    'following.unfollow': '取消跟单',
    'following.copy': '复制',
    'following.online': '在线',
    'following.offline': '离线',
    
    // Live Section
    'live.watching': '正在观看',
    'live.chatPlaceholder': '输入您的消息...',
    'live.send': '发送',
    'live.featuredStreams': '精选直播',
    'live.liveNow': '正在直播',
    'live.joinStream': '加入直播',
    'live.startStream': '开始直播',
    'live.streamTitle': '直播标题',
    'live.streamTopic': '直播话题',
    'live.inviteSection': '邀请板块',
    'live.inviteFriends': '邀请好友',
    'live.inviteRewards': '邀请奖励',
    'live.referralCode': '推荐码',
    'live.copyCode': '复制推荐码',
    'live.inviteLink': '邀请链接',
    'live.shareLink': '分享链接',
    'live.earnRewards': '赚取奖励',
    'live.inviteBonus': '邀请奖金',
    'live.friendsInvited': '已邀请好友',
    'live.totalEarned': '总收益',
    'live.pendingRewards': '待发放奖励',
    'live.claimRewards': '领取奖励',
    
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

  const t = (key: string): string => {
    const langTranslations = translations[language] as any
    if (!langTranslations) {
      console.warn(`Language not found: ${language}`)
      return key
    }
    
    // 处理嵌套键（如 'threeColumn.liveMarkets'）
    const keys = key.split('.')
    let value = langTranslations
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        console.warn(`Translation key not found: ${key}`)
        return key
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