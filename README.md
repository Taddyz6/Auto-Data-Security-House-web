<div align="center">

# 汽车数据跨境安全屋

### Auto Data Security House

面向汽车企业的数据跨境安全展示、自测与合规科普平台

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react\&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss\&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Private-lightgrey)](#许可证)

[在线预览](#在线预览) · [项目功能](#项目功能) · [本地运行](#本地运行) · [部署说明](#部署说明)

</div>

---

## 项目介绍

**汽车数据跨境安全屋**是一个面向汽车行业的数据跨境安全展示平台，由中汽研临港数据科技（上海）有限公司相关业务场景延伸设计。

项目通过可视化页面、动态世界地图、跨境流程演示、应用场景介绍和企业自测工具，帮助用户快速了解汽车数据跨境过程中可能涉及的业务流程、重点事项和安全要求。

本项目为纯前端静态网站，不依赖数据库或后端服务，可部署到 Cloudflare、GitHub Pages、Nginx、对象存储等静态托管平台。

> 本项目用于业务展示、行业科普和方案演示，不构成正式法律意见、监管结论或企业合规认证。

---

## 在线预览

> 部署完成后，将下面的地址替换为你的正式网站地址。

```text
https://your-domain.com
```

---

## 项目功能

### 科技视觉首页

* 科技感企业官网设计
* 动态世界地图展示
* 汽车数据跨境流向动画
* 核心能力和服务内容概览
* 桌面端与移动端响应式适配

### 安全屋介绍

* 汽车数据跨境安全屋概念介绍
* 数据跨境业务流程展示
* 服务价值与核心能力说明
* 企业数据出境常见问题说明

### 全流程演示

通过可视化方式展示汽车数据跨境过程中的主要环节，包括：

1. 数据识别
2. 数据分类与分级
3. 风险评估
4. 合规路径判断
5. 安全防护
6. 持续管理

### 企业安全自测

网站提供六步企业自测功能，可根据用户选择生成浏览器端模拟结果。

自测结果包括：

* 综合评估结果
* 当前风险提示
* 重点关注事项
* 改进建议
* 结果打印
* 重新自测

自测数据仅保存在当前浏览器页面内存中，刷新页面后自动清除。

### 应用场景

项目展示多种汽车数据跨境应用场景，例如：

* 海外研发协同
* 智能网联汽车服务
* 海外售后与车辆运维
* 全球供应链协同
* 跨境数据分析与运营

### 资料下载

支持在网站中提供 PDF、Word、Excel 等公开资料下载。

当前示例资料：

```text
深耕车企全球化运营实践，搭建数据跨境安全底座
```

### 企业信息展示

* 企业介绍
* 联系人信息
* 联系电话
* 联系邮箱
* 企业地址
* 常见问题
* 资质与能力说明

---

## 页面特点

* 现代化科技视觉设计
* 动态地图与流程动画
* 平滑滚动和交互动效
* 移动端响应式布局
* 支持减少动画系统设置
* 表单校验与固定规则评分
* 纯静态构建
* 无需数据库
* 无需环境变量
* 无需后台管理系统
* 可部署至多种静态托管平台

---

## 技术栈

| 技术              | 用途              |
| --------------- | --------------- |
| Next.js 16      | React 应用框架与静态构建 |
| React 19        | 页面与交互组件         |
| TypeScript      | 类型检查与代码维护       |
| Tailwind CSS 4  | 页面样式与响应式布局      |
| Framer Motion   | 页面动画和过渡效果       |
| React Hook Form | 表单状态管理          |
| Zod             | 表单数据校验          |
| Lucide React    | 页面图标            |
| Dotted Map      | 世界地图可视化         |
| Vitest          | 单元测试            |
| ESLint          | 代码质量检查          |

---

## 项目结构

```text
Auto-Data-Security-House-web/
├── public/
│   └── downloads/           # 可公开下载的资料
│
├── src/
│   ├── app/                 # Next.js 页面和全局布局
│   ├── components/          # 页面组件、布局组件和 UI 组件
│   └── lib/                 # 固定内容、校验逻辑和评分逻辑
│
├── next.config.ts           # Next.js 静态导出配置
├── package.json             # 项目依赖和运行命令
├── tsconfig.json            # TypeScript 配置
└── README.md                # 项目说明
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

# ESLint 代码检查
npm run lint

# TypeScript 类型检查
npm run typecheck

# 运行测试并生成覆盖率
npm run test
```

---

## 静态构建

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

访问：

```text
http://localhost:4173
```

---

## 部署说明

项目使用 Next.js 静态导出模式，部署时通常不需要运行 Node.js 服务器。

### Cloudflare 部署

推荐配置：

```text
构建命令：npm run build
输出目录：out
```

部署后，可以在 Cloudflare 项目的域名设置中绑定自定义域名。

### GitHub Pages

执行构建：

```bash
npm run build
```

然后将 `out/` 目录中的文件发布到 GitHub Pages 对应分支或部署流程。

### Nginx

将 `out/` 目录上传到服务器，例如：

```text
/var/www/auto-data-security-house/
```

Nginx 示例：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/auto-data-security-house;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html =404;
    }
}
```

### 其他静态托管平台

还可以部署到：

* Cloudflare Pages
* GitHub Pages
* Vercel
* Netlify
* AWS S3
* 阿里云 OSS
* 腾讯云 COS
* Nginx 静态服务器

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

在 `downloadResources` 数组中添加资料信息，例如：

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

确保代码检查、类型检查、测试和生产构建全部通过。

---

## 数据与隐私说明

本版本：

* 不接入数据库
* 不提供用户登录
* 不提供后台管理
* 不收集访问统计
* 不上传企业数据
* 不保存自测结果
* 不接入真实 AI 模型
* 不接入真实区块链系统
* 不执行真实跨境数据传输

企业自测数据仅存在于当前页面内存中，刷新或关闭页面后自动清除。

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
* 数据出境安全评估结果
* 个人信息保护认证
* 企业合规承诺
* 实际数据跨境服务

企业开展真实数据跨境活动前，应结合具体业务情况咨询专业法律、合规和数据安全人员。

---

## 后续规划

* [ ] 接入后台内容管理
* [ ] 增加中英文语言切换
* [ ] 增加真实案例管理
* [ ] 增加资料分类与搜索
* [ ] 增加自测报告导出
* [ ] 增加企业预约咨询功能
* [ ] 接入访问数据分析
* [ ] 增加管理员内容编辑功能
* [ ] 优化移动端地图和动画体验
* [ ] 完善自动化测试

---

## 项目截图

可以将项目截图放到：

```text
public/images/
```

然后在 README 中添加：

```markdown
![项目首页](./public/images/homepage.png)
```

建议展示以下页面：

* 网站首页
* 动态世界地图
* 数据跨境流程
* 企业安全自测
* 自测结果页面
* 应用场景页面
* 联系我们页面

---

## 贡献说明

欢迎通过 Issue 或 Pull Request 提交：

* 页面问题
* 文案修正
* 功能建议
* 移动端适配问题
* 浏览器兼容问题
* 代码优化建议

提交代码前，请确保以下命令执行成功：

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

---

## 许可证

当前仓库未声明开源许可证。

除非获得项目所有者明确授权，否则仓库中的代码、页面设计、图片、文案和业务内容不得用于商业复制、再发布或二次分发。

---

## 联系方式

项目维护者：

```text
GitHub: @Taddyz6
```

项目地址：

```text
adsh-web.zhangtaddy.workers.dev
```

---

<div align="center">

**汽车数据跨境安全屋**

为汽车企业全球化发展提供数据安全与合规展示支持

</div>
