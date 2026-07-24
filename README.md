<div align="center">

# 汽车数据跨境安全屋

### Auto Data Security House

面向汽车行业的数据跨境安全展示、流程演示、企业自测与合规科普平台。

[![在线访问](https://img.shields.io/badge/在线访问-打开网站-22c55e?style=for-the-badge\&logo=cloudflare)](https://adsh-web.taddyz6.workers.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square\&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square\&logo=react\&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square\&logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square\&logo=tailwindcss\&logoColor=white)](https://tailwindcss.com/)
[![Cloudflare](https://img.shields.io/badge/部署平台-Cloudflare-F38020?style=flat-square\&logo=cloudflare\&logoColor=white)](https://www.cloudflare.com/)

[在线预览](https://adsh-web.taddyz6.workers.dev/) · [项目功能](#项目功能) · [技术栈](#技术栈) · [本地运行](#本地运行) · [部署说明](#部署说明)

</div>

---

## 项目介绍

**汽车数据跨境安全屋**是一个面向汽车行业的数据跨境安全展示与科普平台。

项目通过可视化页面、动态世界地图、跨境数据流程演示、应用场景介绍和企业自测工具，帮助汽车企业、技术服务商及行业相关人员了解：

* 汽车数据跨境流动
* 数据识别与分类分级
* 数据出境风险评估
* 合规路径判断
* 数据安全防护
* 持续安全治理

平台采用纯前端静态架构，不依赖数据库和后端服务，可部署到 Cloudflare、GitHub Pages、Vercel、Netlify、Nginx 等平台。

> **免责声明：** 本项目仅用于业务展示、行业科普、方案演示和企业内部初步参考，不构成正式法律意见、监管结论、合规认证或官方评估结果。
> 
> Copyright © 2026 Taddyz6. All Rights Reserved.
>
> 本项目的源代码、界面设计、业务流程、文档及相关素材均受版权保护。未经版权所有者书面授权，不得复制、修改、分发、公开展示、出售、转授权或用于任何商业用途。

---

## 在线预览

项目已部署至 Cloudflare：

### https://adsh-web.taddyz6.workers.dev/

---

## 项目功能

### 科技视觉首页

* 现代化汽车科技视觉设计
* 动态世界地图展示
* 汽车数据跨境流向动画
* 核心能力与服务内容概览
* 平滑滚动与页面交互动效
* 桌面端和移动端响应式适配

### 安全屋介绍

* 汽车数据跨境安全屋概念介绍
* 数据跨境业务流程展示
* 服务价值与核心能力说明
* 企业数据出境常见问题介绍
* 汽车行业数据安全科普内容

### 全流程演示

平台通过可视化方式展示汽车数据跨境过程中的主要环节：

1. 数据识别
2. 数据分类与分级
3. 风险评估
4. 合规路径判断
5. 安全防护
6. 持续管理

### 企业安全自测

网站提供六步企业自测功能，用户完成选择后，可在浏览器中生成模拟评估结果。

自测结果包括：

* 综合评估结果
* 当前风险提示
* 重点关注事项
* 改进建议
* 结果打印
* 重新自测

所有评估计算均在浏览器本地完成。

自测数据不会上传至服务器，也不会保存到数据库中。

### 汽车行业应用场景

平台展示多种汽车数据跨境应用场景，包括：

* 海外研发协同
* 智能网联汽车服务
* 海外售后与车辆运维
* 全球供应链协同
* 跨境数据分析与运营
* 国际车辆数据管理

### 资料下载

网站支持提供多种格式的公开资料下载：

* PDF
* Microsoft Word
* Microsoft Excel

下载资料可以通过项目公共资源目录和内容配置文件进行管理。

### 企业信息展示

网站可以展示：

* 企业介绍
* 服务能力
* 联系人信息
* 联系电话
* 联系邮箱
* 企业地址
* 常见问题
* 企业资质与专业能力


## 页面特点

* 现代化科技视觉设计
* 动态地图与流程动画
* 平滑滚动与交互动效
* 移动端响应式布局
* 支持系统减少动画设置
* 表单校验与固定规则评分
* 纯静态构建
* 无需数据库
* 无需环境变量
* 无需后台管理系统
* 可部署到多种静态托管平台

---

## 技术栈

| 技术              | 用途              |
| --------------- | --------------- |
| Next.js 16      | React 应用框架与静态构建 |
| React 19        | 页面与交互组件         |
| TypeScript 5    | 类型检查与代码维护       |
| Tailwind CSS 4  | 页面样式与响应式布局      |
| Framer Motion   | 页面动画与过渡效果       |
| React Hook Form | 表单状态管理          |
| Zod             | 表单数据校验          |
| Lucide React    | 页面图标            |
| Dotted Map      | 世界地图可视化         |
| Vitest          | 单元测试与覆盖率        |
| ESLint          | 代码质量检查          |
| Cloudflare      | 网站部署与托管         |

---

## 项目架构

本项目采用纯前端静态架构。

```text
用户浏览器
    │
    ▼
Next.js 静态网站
    │
    ├── 交互式页面
    ├── 动态数据可视化
    ├── 企业安全自测
    ├── 静态业务内容
    └── 公开资料下载
```

当前版本不需要：

* 数据库
* 后端 API
* 用户登录
* 环境变量
* 内容管理系统
* Node.js 服务端持续运行

---

## 项目结构

```text
Auto-Data-Security-House-web/
├── public/
│   ├── downloads/             # 公开下载资料
│   └── screenshots/           # 项目截图
│
├── src/
│   ├── app/                   # Next.js 页面、布局和全局样式
│   ├── components/            # 页面组件、布局组件和 UI 组件
│   └── lib/                   # 内容配置、校验逻辑和评估逻辑
│
├── next.config.ts             # Next.js 静态导出配置
├── package.json               # 项目依赖和运行命令
├── tsconfig.json              # TypeScript 配置
└── README.md                  # 项目说明
```

---

## 本地运行

### 环境要求

建议使用：

```text
Node.js 20 或更高版本
npm 10 或更高版本
```

### 克隆项目

```bash
git clone https://github.com/Taddyz6/Auto-Data-Security-House-web.git
```

### 进入项目目录

```bash
cd Auto-Data-Security-House-web
```

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

浏览器访问：

```text
http://localhost:3000
```

本项目不需要配置 `.env` 文件，也不需要初始化数据库。

---

## 可用命令

```bash
# 启动开发环境
npm run dev

# 生成生产构建
npm run build

# 运行 ESLint 检查
npm run lint

# 运行 TypeScript 类型检查
npm run typecheck

# 运行测试并生成覆盖率
npm run test
```

---

## 生产构建

执行：

```bash
npm run build
```

构建成功后，静态网站文件会生成在：

```text
out/
```

可以使用 Python 在本地预览：

```bash
python3 -m http.server 4173 --directory out
```

浏览器访问：

```text
http://localhost:4173
```

---

## 部署说明

### 当前部署地址

项目目前已部署至 Cloudflare：

```text
https://adsh-web.zhangtaddy.workers.dev
```

### Cloudflare 部署配置

推荐构建配置：

```text
构建命令：npm run build
输出目录：out
```

使用 Wrangler 部署时，需要设置 `compatibility_date`。

`wrangler.jsonc` 示例：

```jsonc
{
  "name": "adsh-web",
  "compatibility_date": "2026-07-22",
  "assets": {
    "directory": "./out"
  }
}
```

构建并部署：

```bash
npm run build
npx wrangler deploy
```

### 其他支持的平台

由于项目使用静态导出，因此也可以部署到：

* Cloudflare Pages
* GitHub Pages
* Vercel
* Netlify
* AWS S3
* 阿里云 OSS
* 腾讯云 COS
* Nginx
* 其他静态托管平台

---

## 添加下载资料

将需要提供下载的文件放入：

```text
public/downloads/
```

然后编辑：

```text
src/lib/public-content.ts
```

在 `downloadResources` 数组中添加资料信息：

```ts
{
  title: "资料标题",
  description: "资料简介",
  type: "PDF",
  href: "/downloads/example.pdf",
}
```

完成后重新构建：

```bash
npm run build
```

---

## 质量检查

提交代码或正式部署前，建议依次运行：

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

以上命令用于检查：

* 代码规范
* TypeScript 类型安全
* 自动化测试
* 生产环境构建

---

## 数据与隐私说明

当前版本：

* 不需要用户注册
* 不提供用户账号
* 不接入数据库
* 不上传企业自测数据
* 不永久保存自测结果
* 不执行真实跨境数据传输
* 不接入真实 AI 模型
* 不接入真实区块链系统
* 不提供正式合规认证

企业自测数据仅存在于当前浏览器页面内存中，刷新或关闭页面后自动清除。

---

## 内容边界

本网站展示的流程、自测结果和建议仅用于：

* 项目演示
* 行业科普
* 业务沟通
* 企业内部初步参考

网站内容不构成：

* 正式法律意见
* 监管审批结论
* 企业合规认证
* 数据出境安全评估结果
* 专业咨询机构报告

企业在开展真实数据跨境业务前，应结合实际情况咨询专业法律、合规和数据安全机构。

---

## 用户体验与无障碍支持

项目包含以下用户体验设计：

* 响应式页面布局
* 移动端导航
* 键盘操作支持
* 清晰的信息层级
* 表单输入校验
* 支持减少动画设置
* 页面平滑过渡
* 自测结果打印支持

---

## 后续计划

未来可考虑增加：

* 中英文语言切换
* 更多汽车数据跨境应用场景
* 可配置自测评分规则
* 自测报告 PDF 导出
* 内容管理后台
* 数据分析仪表盘
* 企业用户登录
* 后端 API
* 合规知识库
* 更多无障碍优化
* 自定义域名支持

---

## 参与贡献

欢迎提交问题、建议或功能改进。

贡献流程：

1. Fork 本仓库。
2. 创建功能分支。

```bash
git checkout -b feature/your-feature
```

3. 提交代码。

```bash
git commit -m "feat: add your feature"
```

4. 推送分支。

```bash
git push origin feature/your-feature
```

5. 创建 Pull Request。

---

## 项目地址

GitHub 仓库：

https://github.com/Taddyz6/Auto-Data-Security-House-web

在线网站：

https://adsh-web.zhangtaddy.workers.dev

---

## 开源许可证

本仓库当前未包含开源许可证。

在未添加明确许可证之前，默认保留所有权利。其他用户可以查看代码，但不应默认拥有复制、修改、重新发布或商业使用的权限。

---

<div align="center">

使用 Next.js、React、TypeScript 和 Cloudflare 构建。

**[访问在线网站](https://adsh-web.zhangtaddy.workers.dev)**

</div>
