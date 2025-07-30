'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/Navbar'
import { useWallet } from '../../contexts/WalletContext'

export default function InvitePage() {
  const router = useRouter()
  const { isConnected, address } = useWallet()
  const [inviteCode, setInviteCode] = useState('')
  const [inviteLink, setInviteLink] = useState('')
  const [totalEarnings, setTotalEarnings] = useState('0.00')
  const [totalInvites, setTotalInvites] = useState(0)
  const [activeInvites, setActiveInvites] = useState(0)
  const [copySuccess, setCopySuccess] = useState('')
  const [inviteHistory, setInviteHistory] = useState([])
  const [commissionRate] = useState(15) // 15% 返佣率

  // 生成邀请码和链接
  useEffect(() => {
    if (isConnected && address) {
      const code = address.slice(2, 8).toUpperCase()
      const link = `https://predictmarket.com/invite/${code}`
      setInviteCode(code)
      setInviteLink(link)
      
      // 模拟获取邀请数据
      const mockData = {
        totalEarnings: (Math.random() * 5000 + 1000).toFixed(2),
        totalInvites: Math.floor(Math.random() * 50 + 10),
        activeInvites: Math.floor(Math.random() * 30 + 5),
        history: Array.from({ length: 8 }, (_, i) => ({
          id: i + 1,
          username: `用户${Math.floor(Math.random() * 9999)}`,
          joinDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          earnings: (Math.random() * 500 + 50).toFixed(2),
          status: Math.random() > 0.3 ? 'active' : 'inactive',
          trades: Math.floor(Math.random() * 100 + 1)
        }))
      }
      
      setTotalEarnings(mockData.totalEarnings)
      setTotalInvites(mockData.totalInvites)
      setActiveInvites(mockData.activeInvites)
      setInviteHistory(mockData.history)
    }
  }, [isConnected, address])

  // 复制功能
  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(`${type}已复制到剪贴板！`)
      setTimeout(() => setCopySuccess(''), 3000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="text-6xl mb-4">🔗</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">请先连接钱包</h2>
            <p className="text-gray-600 mb-6">连接钱包后即可开始邀请好友获得返佣奖励</p>
            <button 
              onClick={() => router.push('/')}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              返回首页
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🎁 邀请好友</h1>
          <p className="text-gray-600">邀请好友加入，获得 {commissionRate}% 返佣奖励</p>
        </div>

        {/* 邀请统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-2xl font-bold text-green-600">¥{totalEarnings}</div>
            <div className="text-sm text-gray-500">累计收益</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-2xl font-bold text-blue-600">{totalInvites}</div>
            <div className="text-sm text-gray-500">总邀请人数</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl mb-2">🔥</div>
            <div className="text-2xl font-bold text-orange-600">{activeInvites}</div>
            <div className="text-sm text-gray-500">活跃用户</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl mb-2">📈</div>
            <div className="text-2xl font-bold text-purple-600">{commissionRate}%</div>
            <div className="text-sm text-gray-500">返佣比例</div>
          </div>
        </div>

        {/* 邀请工具 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 邀请码 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              🎫 我的邀请码
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="text-center">
                <div className="text-3xl font-mono font-bold text-blue-600 mb-2">{inviteCode}</div>
                <p className="text-sm text-gray-500">好友输入此邀请码即可获得奖励</p>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(inviteCode, '邀请码')}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>复制邀请码</span>
            </button>
          </div>

          {/* 邀请链接 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              🔗 邀请链接
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="text-sm text-gray-700 break-all">{inviteLink}</div>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => copyToClipboard(inviteLink, '邀请链接')}
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>复制链接</span>
              </button>
              <button
                onClick={() => {
                  const text = `🎁 邀请你加入 PredictMarket 预测市场！\n\n使用我的邀请码：${inviteCode}\n或点击链接：${inviteLink}\n\n一起来预测未来，赚取收益！`
                  copyToClipboard(text, '分享文案')
                }}
                className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span>复制分享文案</span>
              </button>
            </div>
          </div>
        </div>

        {/* 复制成功提示 */}
        {copySuccess && (
          <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce">
            ✅ {copySuccess}
          </div>
        )}

        {/* 返佣规则 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            📋 返佣规则
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h4 className="font-medium text-gray-900">邀请奖励</h4>
                  <p className="text-sm text-gray-600">好友通过你的邀请码注册并完成首次交易，你将获得 ¥50 奖励</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h4 className="font-medium text-gray-900">持续返佣</h4>
                  <p className="text-sm text-gray-600">好友每次交易，你将获得其交易手续费 {commissionRate}% 的返佣</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h4 className="font-medium text-gray-900">无上限</h4>
                  <p className="text-sm text-gray-600">邀请人数无上限，返佣收益无上限</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <div>
                  <h4 className="font-medium text-gray-900">实时到账</h4>
                  <p className="text-sm text-gray-600">返佣收益实时到账，可随时提现</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">5</div>
                <div>
                  <h4 className="font-medium text-gray-900">长期有效</h4>
                  <p className="text-sm text-gray-600">邀请关系永久有效，持续获得返佣</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">6</div>
                <div>
                  <h4 className="font-medium text-gray-900">双向奖励</h4>
                  <p className="text-sm text-gray-600">被邀请人也将获得交易手续费减免优惠</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 邀请历史 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            📊 邀请历史
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">用户</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">加入时间</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">交易次数</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">状态</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">返佣收益</th>
                </tr>
              </thead>
              <tbody>
                {inviteHistory.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {user.username.slice(-1)}
                        </div>
                        <span className="font-medium text-gray-900">{user.username}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{user.joinDate}</td>
                    <td className="py-3 px-4 text-gray-600">{user.trades}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {user.status === 'active' ? '活跃' : '非活跃'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-medium text-green-600">¥{user.earnings}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {inviteHistory.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-3">👥</div>
              <p className="text-gray-500 mb-4">暂无邀请记录</p>
              <p className="text-sm text-gray-400">开始邀请好友，获得丰厚返佣奖励！</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}