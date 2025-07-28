# PredictMarket - 预测市场平台

一个现代化的去中心化预测市场平台，结合了 GMGN.ai 的设计风格和 Polymarket 的功能结构。支持中英文双语切换，具有响应式设计和现代化UI。

## 🎨 设计特色

### UI 风格 (参考 GMGN.ai)
- **深色主题**: 专业的深色背景 (#0f172a)
- **绿色主色调**: 签名绿色 (#00d4aa) 作为主要强调色
- **现代化卡片**: 圆角卡片设计，悬停效果
- **渐变元素**: 精美的渐变色彩和毛玻璃效果
- **响应式布局**: 完美适配桌面和移动设备

### 功能结构 (参考 Polymarket)
- **市场卡片**: 清晰的 YES/NO 投票界面
- **分类筛选**: Crypto、Politics、Sports、Tech 等分类
- **实时数据**: 动态的百分比和交易量显示
- **交互按钮**: 直观的 "Buy YES" / "Buy NO" 按钮

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: TailwindCSS
- **语言**: TypeScript
- **组件**: React 18
- **构建**: Turbopack (开发模式)

## 🎯 核心组件

### 1. MarketCard 组件
```tsx
// 独立封装的市场卡片组件
<MarketCard
  id="1"
  title="Will Bitcoin reach $100,000 by end of 2024?"
  imageUrl="/api/placeholder/400/300"
  yesPercentage={67}
  noPercentage={33}
  category="Crypto"
  volume="2.4M"
  endDate="Dec 31, 2024"
/>
```

### 2. Navbar 组件
- Logo 和品牌标识
- 创建市场按钮
- 我的市场链接
- 语言切换功能
- 响应式移动端菜单

### 3. 创建市场页面
```tsx
// 完整的市场创建功能
<CreateMarketPage>
  - 钱包连接验证
  - 表单字段验证
  - 分类选择器
  - 时间设置器
  - 流动性配置
  - 多语言支持
</CreateMarketPage>
```

### 4. 主页面布局
- Hero 区域
- 统计数据展示
- 分类筛选器
- 市场卡片网格
- 加载更多功能

## 🎨 Tailwind 配色方案

### 主要颜色
```javascript
colors: {
  // 主绿色系 (GMGN 风格)
  primary: {
    500: '#22c55e', // 主绿色
    // ... 其他色阶
  },
  
  // 深色主题
  dark: {
    900: '#0f172a', // 主背景
    800: '#1e293b', // 卡片背景
    700: '#334155', // 边框色
    // ... 其他色阶
  },
  
  // 强调色
  accent: {
    green: '#00d4aa', // GMGN 签名绿
    red: '#ef4444',   // 红色 (NO 按钮)
    blue: '#3b82f6',  // 蓝色 (Crypto)
    yellow: '#f59e0b' // 黄色 (Sports)
  }
}
```

### 自定义组件类
```css
.btn-primary {
  @apply bg-accent-green hover:bg-accent-green/90 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105;
}

.card {
  @apply bg-dark-800 rounded-xl border border-dark-700 p-6 hover:border-dark-600 transition-all duration-200;
}

.text-gradient {
  @apply bg-gradient-to-r from-accent-green to-primary-400 bg-clip-text text-transparent;
}
```

## 🚀 快速开始

### 安装依赖
```bash
cd prediction-market
npm install
```

### 启动开发服务器
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 主要功能页面
- **主页**: [http://localhost:3000](http://localhost:3000) - 浏览所有预测市场
- **创建市场**: [http://localhost:3000/create](http://localhost:3000/create) - 创建新的预测市场
- **市场详情**: [http://localhost:3000/market/[id]](http://localhost:3000/market/1) - 查看具体市场详情

### 构建生产版本
```bash
npm run build
npm start
```

## 📱 响应式设计

- **桌面端**: 3列网格布局
- **平板端**: 2列网格布局
- **移动端**: 单列布局
- **导航栏**: 移动端折叠菜单

## 🔮 功能特性

### 🎯 创建市场功能

用户可以通过直观的表单界面创建新的预测市场：

#### 核心功能
- **钱包验证**: 必须连接钱包才能创建市场
- **表单验证**: 实时验证所有必填字段
- **分类选择**: 支持 Crypto、Politics、Sports、Tech 等分类
- **时间设置**: 灵活设置市场结束时间和解决时间
- **流动性配置**: 设置初始流动性（最低 0.1 ETH）
- **多语言支持**: 完整的中英文界面

#### 表单字段
- 市场标题（必填）
- 详细描述（必填）
- 市场分类（必填）
- 解决方案来源（必填）
- 市场结束时间（必填）
- 解决时间（必填）
- 初始流动性金额（必填，≥0.1 ETH）

#### 用户体验
- 响应式设计，适配所有设备
- 实时表单验证和错误提示
- 清晰的步骤指引
- 创建成功后自动跳转

### 当前实现
- ✅ 响应式市场卡片组件
- ✅ 分类筛选功能
- ✅ 现代化导航栏
- ✅ 中英文双语切换
- ✅ 主题切换功能
- ✅ 钱包连接界面
- ✅ 封面图片展示
- ✅ 时间格式化显示
- ✅ 加载状态和动画
- ✅ 悬停效果和交互
- ✅ 模拟数据展示
- ✅ **市场创建功能** - 完整的创建市场页面
- ✅ **表单验证** - 实时验证和错误提示
- ✅ **流动性设置** - 初始流动性配置
- ✅ **多语言表单** - 创建页面完整国际化

### 后续扩展
- 🔄 真实 API 数据集成
- 🔄 用户认证系统
- 🔄 交易历史记录
- 🔄 实时价格更新
- 🔄 智能合约集成

## 📁 项目结构

```
prediction-market/
├── app/
│   ├── create/
│   │   └── page.tsx     # 创建市场页面
│   ├── globals.css      # 全局样式
│   ├── layout.tsx       # 根布局
│   └── page.tsx         # 主页面
├── components/
│   ├── MarketCard.tsx           # 市场卡片组件
│   ├── ThreeColumnMarketCard.tsx # 三列布局市场卡片
│   ├── Navbar.tsx               # 导航栏组件
│   ├── PredictionCard.tsx       # 预测卡片组件
│   ├── PredictionModal.tsx      # 预测弹窗组件
│   └── MarketDetail.tsx         # 市场详情组件
├── contexts/
│   ├── LanguageContext.tsx      # 语言上下文
│   ├── ThemeContext.tsx         # 主题上下文
│   └── WalletContext.tsx        # 钱包上下文
├── mock/
│   └── markets.ts               # 模拟数据
├── tailwind.config.js   # Tailwind 配置
├── next.config.js       # Next.js 配置
└── package.json         # 项目依赖
```

## 💻 技术实现

### 创建市场页面架构

```tsx
// app/create/page.tsx
export default function CreateMarketPage() {
  // 状态管理
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    resolutionSource: '',
    endTime: '',
    resolutionTime: '',
    initialLiquidity: ''
  })
  
  // 表单验证
  const [errors, setErrors] = useState({})
  
  // 钱包集成
  const { isConnected, address } = useWallet()
  
  // 多语言支持
  const { t } = useLanguage()
  
  // 表单提交逻辑
  const handleSubmit = async (e) => {
    // 验证 + 创建市场逻辑
  }
}
```

### 核心特性实现

- **表单验证**: 使用 React 状态管理实现实时验证
- **钱包集成**: 通过 WalletContext 检查连接状态
- **多语言**: 通过 LanguageContext 提供完整翻译
- **响应式**: 使用 TailwindCSS 实现移动端适配
- **类型安全**: TypeScript 确保代码质量

## 🎯 设计原则

1. **信息层级清晰**: 重要信息突出显示
2. **交互反馈及时**: 悬停、点击等状态变化
3. **视觉一致性**: 统一的颜色、字体、间距
4. **性能优化**: 懒加载、动画优化
5. **可访问性**: 语义化 HTML、键盘导航

## 📄 许可证

MIT License - 详见 LICENSE 文件