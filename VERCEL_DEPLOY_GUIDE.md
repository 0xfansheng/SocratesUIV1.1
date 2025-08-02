# Vercel 部署指南

## 项目已准备就绪

✅ **构建成功**: 项目已通过 `npm run build` 测试，所有 TypeScript 类型错误已修复
✅ **代码已推送**: 最新代码已推送到 GitHub 仓库
✅ **Vercel 配置**: 已添加 `vercel.json` 配置文件

## 手动部署步骤

### 方法一：通过 Vercel 网站部署（推荐）

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 导入 GitHub 仓库：`https://github.com/0xfansheng/SocratesUIV1.1.git`
5. 配置项目设置：
   - **Project Name**: `prediction-market`
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. 点击 "Deploy"

### 方法二：通过 CLI 部署

如果您希望使用命令行部署，请按以下步骤操作：

```bash
# 1. 登录 Vercel（会打开浏览器进行授权）
vercel login

# 2. 部署到生产环境
vercel --prod
```

## 部署后验证

部署完成后，您将获得一个类似 `https://prediction-market-xxx.vercel.app` 的 URL。

请验证以下功能：
- ✅ 首页加载正常
- ✅ 创建市场页面功能正常
- ✅ 邀请页面显示正常
- ✅ 所有导航链接工作正常

## 环境变量（如需要）

如果项目需要环境变量，请在 Vercel 项目设置中添加：

1. 进入项目 Dashboard
2. 点击 "Settings" 标签
3. 选择 "Environment Variables"
4. 添加所需的环境变量

## 自动部署

一旦项目连接到 GitHub，每次推送到 `master` 分支都会自动触发重新部署。

---

**注意**: 项目当前使用模拟数据，所有功能都是前端模拟实现，适合演示和开发测试。