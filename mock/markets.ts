import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export interface MarketOption {
  id: string
  label: string
  percentage: number
  price: number
  priceChange: number
  color: string
  avatar?: string
}

export interface Market {
  id: string
  title: string
  icon: string
  imageUrl?: string
  coverImage?: string // 新增封面图片字段
  creatorAvatar?: string
  creatorName?: string
  tags: string[]
  options: MarketOption[]
  yesPercentage: number // 保持向后兼容
  currentPrice: number
  priceChange: number
  participants: number
  liquidity: string
  volume: string
  endDate: string
  status: 'active' | 'ended' | 'ending_soon'
  isHot?: boolean
  category: string
}

export const mockMarkets: Market[] = [
  {
    id: '1',
    title: '比特币在2024年底能达到12万美元吗？',
    icon: '₿',
    imageUrl: '/api/placeholder/400/200?text=Bitcoin+Chart',
    coverImage: '/api/placeholder/400/225?text=Bitcoin+Price+Prediction',
    creatorAvatar: '🔥',
    creatorName: '加密鲸鱼',
    tags: ['加密货币', '比特币', '价格'],
    options: [
      {
        id: 'yes',
        label: '是',
        percentage: 70,
        price: 0.70,
        priceChange: 5.2,
        color: '#00FFAE',
        avatar: '📈'
      },
      {
        id: 'no',
        label: '否',
        percentage: 30,
        price: 0.30,
        priceChange: -5.2,
        color: '#FF3D5A',
        avatar: '📉'
      }
    ],
    yesPercentage: 70,
    currentPrice: 0.70,
    priceChange: 5.2,
    participants: 12847,
    liquidity: '$2.1M',
    volume: '$8.4M',
    endDate: dayjs().add(2, 'month').format('MMM DD, YYYY'),
    status: 'active',
    isHot: true,
    category: '加密货币'
  },
  {
    id: '2',
    title: '谁将赢得2024年美国总统大选？',
    icon: '🇺🇸',
    imageUrl: '/api/placeholder/400/200?text=Election+2024',
    coverImage: '/api/placeholder/400/225?text=US+Election+2024',
    creatorAvatar: '🗳️',
    creatorName: '政治分析师',
    tags: ['政治', '选举', '美国'],
    options: [
      {
        id: 'trump',
        label: '唐纳德·特朗普',
        percentage: 45,
        price: 0.45,
        priceChange: -2.1,
        color: '#FF3D5A',
        avatar: '🔴'
      },
      {
        id: 'biden',
        label: '乔·拜登',
        percentage: 42,
        price: 0.42,
        priceChange: 1.8,
        color: '#4285F4',
        avatar: '🔵'
      },
      {
        id: 'other',
        label: '其他',
        percentage: 13,
        price: 0.13,
        priceChange: 0.3,
        color: '#9CA3AF',
        avatar: '⚪'
      }
    ],
    yesPercentage: 45,
    currentPrice: 0.45,
    priceChange: -2.1,
    participants: 28394,
    liquidity: '$5.8M',
    volume: '$15.2M',
    endDate: dayjs().add(1, 'month').format('MMM DD, YYYY'),
    status: 'active',
    isHot: true,
    category: '政治'
  },
  {
    id: '3',
    title: 'OpenAI何时会发布GPT-5？',
    icon: '🤖',
    imageUrl: '/api/placeholder/400/200?text=AI+Technology',
    coverImage: '/api/placeholder/400/225?text=GPT-5+Release+Date',
    creatorAvatar: '🧠',
    creatorName: 'AI研究员',
    tags: ['人工智能', 'openai', 'gpt5'],
    options: [
      {
        id: '2024',
        label: '2024年',
        percentage: 34,
        price: 0.34,
        priceChange: -8.5,
        color: '#00FFAE',
        avatar: '🚀'
      },
      {
        id: '2025',
        label: '2025年',
        percentage: 48,
        price: 0.48,
        priceChange: 6.2,
        color: '#4285F4',
        avatar: '📅'
      },
      {
        id: 'later',
        label: '2026年或更晚',
        percentage: 18,
        price: 0.18,
        priceChange: 2.3,
        color: '#9CA3AF',
        avatar: '⏳'
      }
    ],
    yesPercentage: 34,
    currentPrice: 0.34,
    priceChange: -8.5,
    participants: 9876,
    liquidity: '$1.2M',
    volume: '$3.7M',
    endDate: 'Dec 31, 2024',
    status: 'active',
    category: '科技'
  },
  {
    id: '4',
    title: '谁将赢得2023-24赛季英超联赛？',
    icon: '⚽',
    imageUrl: '/api/placeholder/400/200?text=Premier+League',
    coverImage: '/api/placeholder/400/225?text=Premier+League+Winner',
    creatorAvatar: '⚽',
    creatorName: '足球迷',
    tags: ['体育', '足球', '英超'],
    options: [
      {
        id: 'city',
        label: '曼城',
        percentage: 89,
        price: 0.89,
        priceChange: 12.3,
        color: '#6CABDD',
        avatar: '🔵'
      },
      {
        id: 'arsenal',
        label: '阿森纳',
        percentage: 8,
        price: 0.08,
        priceChange: -8.2,
        color: '#EF0107',
        avatar: '🔴'
      },
      {
        id: 'other',
        label: '其他',
        percentage: 3,
        price: 0.03,
        priceChange: -4.1,
        color: '#9CA3AF',
        avatar: '⚪'
      }
    ],
    yesPercentage: 89,
    currentPrice: 0.89,
    priceChange: 12.3,
    participants: 15632,
    liquidity: '$950K',
    volume: '$4.1M',
    endDate: dayjs().add(4, 'month').format('MMM DD, YYYY'),
    status: 'ending_soon',
    isHot: true,
    category: '体育'
  },
  {
    id: '5',
    title: '特斯拉股价在2024年底的价格区间？',
    icon: '🚗',
    imageUrl: '/api/placeholder/400/200?text=Tesla+Stock',
    coverImage: '/api/placeholder/400/225?text=Tesla+Stock+Price',
    creatorAvatar: '📈',
    creatorName: '股票交易员',
    tags: ['股票', '特斯拉', '马斯克'],
    options: [
      {
        id: 'above300',
        label: '300美元以上',
        percentage: 56,
        price: 0.56,
        priceChange: 3.7,
        color: '#00FFAE',
        avatar: '🚀'
      },
      {
        id: '200to300',
        label: '200-300美元',
        percentage: 32,
        price: 0.32,
        priceChange: -1.2,
        color: '#4285F4',
        avatar: '📊'
      },
      {
        id: 'below200',
        label: '200美元以下',
        percentage: 12,
        price: 0.12,
        priceChange: -2.5,
        color: '#FF3D5A',
        avatar: '📉'
      }
    ],
    yesPercentage: 56,
    currentPrice: 0.56,
    priceChange: 3.7,
    participants: 7234,
    liquidity: '$1.5M',
    volume: '$2.8M',
    endDate: 'Dec 31, 2024',
    status: 'active',
    category: '股票'
  },
  {
    id: '6',
    title: '苹果会在WWDC 2024上发布AR眼镜吗？',
    icon: '🍎',
    imageUrl: '/api/placeholder/400/200?text=Apple+AR',
    coverImage: '/api/placeholder/400/225?text=Apple+AR+Glasses',
    creatorAvatar: '👓',
    creatorName: '科技内幕',
    tags: ['科技', '苹果', 'ar', 'wwdc'],
    options: [
      {
        id: 'yes',
        label: '是',
        percentage: 23,
        price: 0.23,
        priceChange: -15.2,
        color: '#00FFAE',
        avatar: '📱'
      },
      {
        id: 'no',
        label: '否',
        percentage: 77,
        price: 0.77,
        priceChange: 15.2,
        color: '#FF3D5A',
        avatar: '❌'
      }
    ],
    yesPercentage: 23,
    currentPrice: 0.23,
    priceChange: -15.2,
    participants: 5421,
    liquidity: '$680K',
    volume: '$1.9M',
    endDate: dayjs().add(3, 'month').format('MMM DD, YYYY'),
    status: 'ended',
    category: '科技'
  },
  {
    id: '7',
    title: '以太坊在2024年底能达到5000美元吗？',
    icon: '⟠',
    imageUrl: '/api/placeholder/400/200?text=Ethereum+Price',
    coverImage: '/api/placeholder/400/225?text=Ethereum+Price+Target',
    creatorAvatar: '💎',
    creatorName: '以太坊多头',
    tags: ['加密货币', '以太坊', 'eth'],
    options: [
      {
        id: 'yes',
        label: '是',
        percentage: 67,
        price: 0.67,
        priceChange: 8.9,
        color: '#00FFAE',
        avatar: '🚀'
      },
      {
        id: 'no',
        label: '否',
        percentage: 33,
        price: 0.33,
        priceChange: -8.9,
        color: '#FF3D5A',
        avatar: '📉'
      }
    ],
    yesPercentage: 67,
    currentPrice: 0.67,
    priceChange: 8.9,
    participants: 11234,
    liquidity: '$1.8M',
    volume: '$6.2M',
    endDate: 'Dec 31, 2024',
    status: 'active',
    isHot: true,
    category: '加密货币'
  },
  {
    id: '8',
    title: '2024年加州会发生7.0级以上大地震吗？',
    icon: '🌍',
    imageUrl: '/api/placeholder/400/200?text=California+Earthquake',
    coverImage: '/api/placeholder/400/225?text=California+Earthquake+Risk',
    creatorAvatar: '🌊',
    creatorName: '地震监测',
    tags: ['新闻', '自然灾害', '加州'],
    options: [
      {
        id: 'yes',
        label: '是',
        percentage: 18,
        price: 0.18,
        priceChange: 2.1,
        color: '#FF3D5A',
        avatar: '🌋'
      },
      {
        id: 'no',
        label: '否',
        percentage: 82,
        price: 0.82,
        priceChange: -2.1,
        color: '#00FFAE',
        avatar: '🏔️'
      }
    ],
    yesPercentage: 18,
    currentPrice: 0.18,
    priceChange: 2.1,
    participants: 3456,
    liquidity: '$420K',
    volume: '$890K',
    endDate: 'Dec 31, 2024',
    status: 'active',
    category: '新闻'
  },
  {
    id: '9',
    title: 'SpaceX能在2030年前成功将人类送上火星吗？',
    icon: '🚀',
    imageUrl: '/api/placeholder/400/200?text=Mars+Mission',
    coverImage: '/api/placeholder/400/225?text=SpaceX+Mars+Mission',
    creatorAvatar: '🚀',
    creatorName: '太空探索者',
    tags: ['太空', 'spacex', '火星', '马斯克'],
    options: [
      {
        id: 'yes',
        label: '是',
        percentage: 41,
        price: 0.41,
        priceChange: -1.8,
        color: '#00FFAE',
        avatar: '🚀'
      },
      {
        id: 'no',
        label: '否',
        percentage: 59,
        price: 0.59,
        priceChange: 1.8,
        color: '#FF3D5A',
        avatar: '❌'
      }
    ],
    yesPercentage: 41,
    currentPrice: 0.41,
    priceChange: -1.8,
    participants: 8765,
    liquidity: '$2.3M',
    volume: '$5.1M',
    endDate: dayjs().add(6, 'year').format('MMM DD, YYYY'),
    status: 'active',
    category: '科技'
  },
  {
    id: '10',
    title: '湖人队能在2024年进入NBA季后赛吗？',
    icon: '🏀',
    imageUrl: '/api/placeholder/400/200?text=NBA+Lakers',
    coverImage: '/api/placeholder/400/225?text=Lakers+Playoffs+2024',
    creatorAvatar: '🏀',
    creatorName: 'NBA分析师',
    tags: ['体育', 'nba', '湖人', '篮球'],
    options: [
      {
        id: 'yes',
        label: '是',
        percentage: 78,
        price: 0.78,
        priceChange: 6.4,
        color: '#00FFAE',
        avatar: '🏆'
      },
      {
        id: 'no',
        label: '否',
        percentage: 22,
        price: 0.22,
        priceChange: -6.4,
        color: '#FF3D5A',
        avatar: '❌'
      }
    ],
    yesPercentage: 78,
    currentPrice: 0.78,
    priceChange: 6.4,
    participants: 9876,
    liquidity: '$1.1M',
    volume: '$3.2M',
    endDate: dayjs().add(2, 'month').format('MMM DD, YYYY'),
    status: 'ended',
    category: '体育'
  },
  {
    id: '11',
    title: 'ChatGPT在2024年底能达到2亿月活用户吗？',
    icon: '💬',
    imageUrl: '/api/placeholder/400/200?text=ChatGPT+Users',
    tags: ['科技', '人工智能', 'chatgpt', '用户'],
    options: [
      {
        id: 'yes',
        label: '是',
        percentage: 85,
        price: 0.85,
        priceChange: 12.1,
        color: '#00FFAE',
        avatar: '📈'
      },
      {
        id: 'no',
        label: '否',
        percentage: 15,
        price: 0.15,
        priceChange: -12.1,
        color: '#FF3D5A',
        avatar: '📉'
      }
    ],
    yesPercentage: 85,
    currentPrice: 0.85,
    priceChange: 12.1,
    participants: 18765,
    liquidity: '$3.2M',
    volume: '$9.8M',
    endDate: 'Dec 31, 2024',
    status: 'active',
    isHot: true,
    category: '科技'
  }
]