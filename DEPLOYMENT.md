# 部署指南

## 快速部署到 Vercel（推荐）

1. 将项目推送到 GitHub
2. 访问 [vercel.com](https://vercel.com)
3. 使用 GitHub 账号登录
4. 点击 "New Project" 导入仓库
5. 点击 "Deploy" 完成部署

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
npm start
```

## 环境要求

- Node.js 18+
- npm 或 yarn

## 部署配置

项目已配置好以下文件：
- `.gitignore` - Git 忽略文件
- `next.config.js` - Next.js 配置
- `package.json` - 项目依赖

## 注意事项

- 确保所有依赖都已安装
- 检查 Node.js 版本兼容性
- 生产环境建议使用 HTTPS