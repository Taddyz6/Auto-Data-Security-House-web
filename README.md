# 汽车数据跨境安全屋 MVP 网站

基于 Next.js 16、TypeScript、Tailwind CSS、shadcn/ui 风格组件、Prisma 和 SQLite 的完整 MVP 演示网站。

当前站点演示主体信息：`中汽研临港数据科技（上海）有限公司`

## 功能范围

- P0
  - 首页、认识安全屋、全流程演示、应用场景、企业自测、结果页、联系我们
  - Prisma + SQLite 数据持久化
  - 咨询/演示/参观留资
  - 管理员登录、线索查看、自测记录查看、状态修改、CSV 导出
  - 隐私声明、免责声明、基础 SEO
- P1
  - 案例管理、资质管理、资料管理、FAQ 管理、首页文案管理
  - 自测结果打印
  - 简单事件统计落库
  - 首页轻量动画与动态流程展示

## 本地运行

1. 安装依赖

```bash
npm install
```

2. 配置环境变量

```bash
cp .env.example .env
```

3. 初始化数据库并写入种子数据

```bash
npm run db:push
npm run db:seed
```

4. 启动开发环境

```bash
npm run dev
```

访问前台：`http://localhost:3000`

访问后台：`http://localhost:3000/admin/login`

默认管理员账号来自 `.env`：

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

## 质量检查

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## 目录说明

- `src/app`：前台页面、后台页面、API 路由
- `src/components`：布局、表单、后台与 UI 组件
- `src/lib`：数据库、鉴权、校验、评分逻辑、常量与工具
- `prisma`：数据库 schema 与 seed

## 说明

- 所有模拟能力均明确用于“演示”或“模拟结果”。
- 不接入真实 AI、区块链或跨境传输系统。
- 不上传或处理企业真实跨境数据。
