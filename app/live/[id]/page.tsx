'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useLanguage } from '../../../contexts/LanguageContext'
import Navbar from '../../../components/Navbar'

interface LiveStream {
  id: string
  title: string
  description: string
  streamer: {
    name: string
    avatar: string
    followers: number
  }
  viewers: number
  isLive: boolean
  category: string
  thumbnail: string
  startTime: string
}

interface ChatMessage {
  id: string
  user: string
  message: string
  timestamp: string
  avatar: string
  type: 'message' | 'gift' | 'like' | 'join'
  giftType?: string
  giftValue?: number
}

interface Discussion {
  id: string
  user: string
  content: string
  timestamp: string
  likes: number
  replies: number
  avatar: string
}

const LiveDetailPage = () => {
  const params = useParams()
  const router = useRouter()
  const { t } = useLanguage()
  const [liveStream, setLiveStream] = useState<LiveStream | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [discussions, setDiscussions] = useState<Discussion[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [newDiscussion, setNewDiscussion] = useState('')
  const [activeTab, setActiveTab] = useState('chat')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showGiftPanel, setShowGiftPanel] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState(1234)
  const [totalLikes, setTotalLikes] = useState(5678)

  // 模拟实时消息
  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessages = [
        { user: '交易高手', message: '这个分析很专业！', type: 'message' as const },
        { user: '币圈老韭菜', message: '主播说得对', type: 'message' as const },
        { user: '新手学习', message: '学到了很多', type: 'message' as const },
        { user: '投资达人', message: '加入了直播间', type: 'join' as const },
        { user: '加密爱好者', message: '送给主播咖啡☕', type: 'gift' as const, giftType: '咖啡', giftValue: 5 }
      ]
      
      const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)]
      const newMsg: ChatMessage = {
        id: Date.now().toString() + Math.random(),
        user: randomMessage.user,
        message: randomMessage.message,
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        avatar: '/api/placeholder/32/32',
        type: randomMessage.type,
        giftType: randomMessage.giftType,
        giftValue: randomMessage.giftValue
      }
      
      setChatMessages(prev => [...prev, newMsg].slice(-50)) // 保持最新50条消息
      
      // 随机更新在线人数
      if (Math.random() > 0.7) {
        setOnlineUsers(prev => prev + Math.floor(Math.random() * 10) - 5)
      }
    }, 3000 + Math.random() * 5000) // 3-8秒随机间隔
    
    return () => clearInterval(interval)
  }, [])

  // 模拟数据
  useEffect(() => {
    const mockLiveStream: LiveStream = {
      id: params.id as string,
      title: '加密货币市场分析 - 比特币突破新高',
      description: '深度分析当前加密货币市场趋势，探讨比特币价格走势和投资机会',
      streamer: {
        name: '加密分析师小王',
        avatar: '/api/placeholder/40/40',
        followers: 15420
      },
      viewers: 1234,
      isLive: true,
      category: '加密货币',
      thumbnail: '/api/placeholder/800/450',
      startTime: '2024-01-15T10:00:00Z'
    }

    const mockChatMessages: ChatMessage[] = [
      {
        id: '1',
        user: '投资达人',
        message: '比特币真的会突破10万吗？',
        timestamp: '10:30',
        avatar: '/api/placeholder/32/32',
        type: 'message'
      },
      {
        id: '2',
        user: '区块链爱好者',
        message: '技术分析看起来很有道理',
        timestamp: '10:31',
        avatar: '/api/placeholder/32/32',
        type: 'message'
      },
      {
        id: '3',
        user: '新手小白',
        message: '请问现在适合入场吗？',
        timestamp: '10:32',
        avatar: '/api/placeholder/32/32',
        type: 'message'
      },
      {
        id: '4',
        user: '加密大佬',
        message: '送给主播火箭🚀',
        timestamp: '10:33',
        avatar: '/api/placeholder/32/32',
        type: 'gift',
        giftType: '火箭',
        giftValue: 100
      },
      {
        id: '5',
        user: '币圈新人',
        message: '加入了直播间',
        timestamp: '10:34',
        avatar: '/api/placeholder/32/32',
        type: 'join'
      }
    ]

    const mockDiscussions: Discussion[] = [
      {
        id: '1',
        user: '资深交易员',
        content: '从技术面来看，比特币确实有突破的可能性。RSI指标显示超买状态，但成交量持续放大，说明市场情绪高涨。建议分批建仓，控制风险。',
        timestamp: '2小时前',
        likes: 23,
        replies: 5,
        avatar: '/api/placeholder/40/40'
      },
      {
        id: '2',
        user: '量化分析师',
        content: '根据我的模型预测，比特币在未来一周内有70%的概率突破当前阻力位。主要支撑因素包括机构资金流入和宏观经济环境改善。',
        timestamp: '3小时前',
        likes: 18,
        replies: 3,
        avatar: '/api/placeholder/40/40'
      }
    ]

    setLiveStream(mockLiveStream)
    setChatMessages(mockChatMessages)
    setDiscussions(mockDiscussions)
  }, [params.id])

  // 自动滚动聊天记录到底部
  useEffect(() => {
    const chatContainer = document.getElementById('chat-container')
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }, [chatMessages])

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        user: '我',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        avatar: '/api/placeholder/32/32',
        type: 'message'
      }
      setChatMessages([...chatMessages, message])
      setNewMessage('')
      setShowEmojiPicker(false)
    }
  }

  const sendGift = (giftType: string, giftValue: number) => {
    const giftMessage: ChatMessage = {
      id: Date.now().toString(),
      user: '我',
      message: `送给主播${giftType}`,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      avatar: '/api/placeholder/32/32',
      type: 'gift',
      giftType,
      giftValue
    }
    setChatMessages([...chatMessages, giftMessage])
    setShowGiftPanel(false)
  }

  const sendLike = () => {
    setTotalLikes(prev => prev + 1)
    // 可以添加点赞动画效果
  }

  const addEmoji = (emoji: string) => {
    setNewMessage(prev => prev + emoji)
  }

  const emojis = ['😀', '😂', '😍', '🤔', '👍', '👎', '❤️', '🔥', '💎', '🚀', '📈', '📉']
  
  const gifts = [
    { name: '鲜花', emoji: '🌹', value: 1 },
    { name: '咖啡', emoji: '☕', value: 5 },
    { name: '蛋糕', emoji: '🎂', value: 10 },
    { name: '钻石', emoji: '💎', value: 50 },
    { name: '火箭', emoji: '🚀', value: 100 },
    { name: '皇冠', emoji: '👑', value: 500 }
  ]

  const postDiscussion = () => {
    if (newDiscussion.trim()) {
      const discussion: Discussion = {
        id: Date.now().toString(),
        user: '我',
        content: newDiscussion,
        timestamp: '刚刚',
        likes: 0,
        replies: 0,
        avatar: '/api/placeholder/40/40'
      }
      setDiscussions([discussion, ...discussions])
      setNewDiscussion('')
    }
  }

  if (!liveStream) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* 返回按钮 */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>返回直播列表</span>
        </button>
      </div>

      {/* 主要内容区域 */}
      <div className="flex flex-col lg:flex-row gap-6 p-6">
        {/* 左侧：直播视频区域 */}
        <div className="flex-1 lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* 视频播放器 */}
            <div className="relative aspect-video bg-black">
              <img 
                src={liveStream.thumbnail} 
                alt={liveStream.title}
                className="w-full h-full object-cover"
              />
              {liveStream.isLive && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>直播中</span>
                </div>
              )}
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                {liveStream.viewers.toLocaleString()} 观看
              </div>
              
              {/* 点赞按钮 */}
              <button
                onClick={sendLike}
                className="absolute bottom-4 left-4 bg-red-500/80 text-white p-3 rounded-full hover:bg-red-600/80 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </button>
              
              {/* 在线人数和点赞数 */}
              <div className="absolute top-4 right-4 space-y-2">
                <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>{onlineUsers.toLocaleString()} 在线</span>
                </div>
                <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                  <span>❤️</span>
                  <span>{totalLikes.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            {/* 直播信息 */}
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{liveStream.title}</h1>
              <p className="text-gray-600 mb-4">{liveStream.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img 
                    src={liveStream.streamer.avatar} 
                    alt={liveStream.streamer.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{liveStream.streamer.name}</h3>
                    <p className="text-sm text-gray-500">{liveStream.streamer.followers.toLocaleString()} 关注者</p>
                  </div>
                </div>
                
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  关注
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：交易区域 */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">相关交易</h2>
            
            {/* 交易卡片 */}
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">比特币价格预测</h3>
                  <span className="text-green-600 text-sm font-medium">+5.2%</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">比特币在2024年底是否会突破10万美元？</p>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-green-100 text-green-700 py-2 px-3 rounded text-sm font-medium hover:bg-green-200 transition-colors">
                    看涨 65%
                  </button>
                  <button className="flex-1 bg-red-100 text-red-700 py-2 px-3 rounded text-sm font-medium hover:bg-red-200 transition-colors">
                    看跌 35%
                  </button>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">以太坊走势</h3>
                  <span className="text-red-600 text-sm font-medium">-2.1%</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">以太坊能否在本月突破4000美元？</p>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-green-100 text-green-700 py-2 px-3 rounded text-sm font-medium hover:bg-green-200 transition-colors">
                    看涨 42%
                  </button>
                  <button className="flex-1 bg-red-100 text-red-700 py-2 px-3 rounded text-sm font-medium hover:bg-red-200 transition-colors">
                    看跌 58%
                  </button>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              查看更多交易
            </button>
          </div>
        </div>
      </div>

      {/* 下方：实时互动和讨论区域 */}
      <div className="px-6 pb-6">
        <div className="bg-white rounded-lg shadow-sm">
          {/* 标签页 */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('chat')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'chat'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                实时聊天
              </button>
              <button
                onClick={() => setActiveTab('discussion')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'discussion'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                话题讨论
              </button>
            </div>
          </div>

          {/* 内容区域 */}
          <div className="p-6">
            {activeTab === 'chat' && (
              <div className="space-y-4">
                {/* 聊天记录 */}
                <div id="chat-container" className="h-64 overflow-y-auto space-y-3 border border-gray-200 rounded-lg p-4 bg-gray-50">
                  {chatMessages.map((message) => (
                    <div key={message.id} className={`flex items-start space-x-3 ${
                      message.type === 'gift' ? 'bg-yellow-50 border border-yellow-200 rounded-lg p-2' :
                      message.type === 'join' ? 'bg-blue-50 border border-blue-200 rounded-lg p-2' :
                      ''
                    }`}>
                      <img 
                        src={message.avatar} 
                        alt={message.user}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className={`font-medium text-sm ${
                            message.type === 'gift' ? 'text-yellow-700' :
                            message.type === 'join' ? 'text-blue-700' :
                            'text-gray-900'
                          }`}>{message.user}</span>
                          <span className="text-xs text-gray-500">{message.timestamp}</span>
                          {message.type === 'gift' && (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                              礼物 ${message.giftValue}
                            </span>
                          )}
                        </div>
                        <p className={`text-sm mt-1 ${
                          message.type === 'gift' ? 'text-yellow-700 font-medium' :
                          message.type === 'join' ? 'text-blue-700' :
                          'text-gray-700'
                        }`}>
                          {message.type === 'gift' && message.giftType && (
                            <span className="mr-2">{gifts.find(g => g.name === message.giftType)?.emoji}</span>
                          )}
                          {message.type === 'join' && <span className="mr-2">👋</span>}
                          {message.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* 发送消息 */}
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="输入您的消息..."
                        className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      />
                      <button
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        😀
                      </button>
                    </div>
                    <button
                      onClick={() => setShowGiftPanel(!showGiftPanel)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center space-x-1"
                    >
                      <span>🎁</span>
                      <span>礼物</span>
                    </button>
                    <button
                      onClick={sendMessage}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      发送
                    </button>
                  </div>
                  
                  {/* 表情选择器 */}
                  {showEmojiPicker && (
                    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
                      <div className="grid grid-cols-6 gap-2">
                        {emojis.map((emoji, index) => (
                          <button
                            key={index}
                            onClick={() => addEmoji(emoji)}
                            className="text-2xl hover:bg-gray-100 rounded p-2 transition-colors"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* 礼物面板 */}
                  {showGiftPanel && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg">
                      <h4 className="font-medium text-gray-900 mb-3">选择礼物</h4>
                      <div className="grid grid-cols-3 gap-3">
                        {gifts.map((gift, index) => (
                          <button
                            key={index}
                            onClick={() => sendGift(gift.name, gift.value)}
                            className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:bg-yellow-50 hover:border-yellow-300 transition-colors"
                          >
                            <span className="text-2xl mb-1">{gift.emoji}</span>
                            <span className="text-sm font-medium text-gray-700">{gift.name}</span>
                            <span className="text-xs text-gray-500">${gift.value}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'discussion' && (
              <div className="space-y-6">
                {/* 发布讨论 */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <textarea
                    value={newDiscussion}
                    onChange={(e) => setNewDiscussion(e.target.value)}
                    placeholder="分享您对这个话题的看法..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                  <div className="flex justify-end mt-3">
                    <button
                      onClick={postDiscussion}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      发布讨论
                    </button>
                  </div>
                </div>
                
                {/* 讨论列表 */}
                <div className="space-y-4">
                  {discussions.map((discussion) => (
                    <div key={discussion.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <img 
                          src={discussion.avatar} 
                          alt={discussion.user}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium text-gray-900">{discussion.user}</span>
                            <span className="text-sm text-gray-500">{discussion.timestamp}</span>
                          </div>
                          <p className="text-gray-700 mb-3">{discussion.content}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                              <span>{discussion.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.98L3 20l1.98-5.874A8.955 8.955 0 013 12a8 8 0 018-8c4.418 0 8 3.582 8 8z" />
                              </svg>
                              <span>{discussion.replies} 回复</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiveDetailPage