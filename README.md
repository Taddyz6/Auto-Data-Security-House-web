# 汽车数据跨境安全屋静态网站

基于 Next.js 16、React 19、TypeScript、Tailwind CSS、shadcn/ui 风格组件和 Framer Motion 构建的纯静态企业展示网站。

网站主体：`中汽研临港数据科技（上海）有限公司`

## 功能范围

- 科技视觉首页、动态世界地图和跨境流程动画
- 认识安全屋、全流程演示和五类应用场景
- 六步企业自测与浏览器端固定规则评分
- 自测结果、重点事项、建议模块、打印和重新自测
- 行业场景案例、FAQ、资质说明和静态资料下载
- 企业介绍、联系人、电话、邮箱和地址
- 桌面端与移动端响应式布局及 `prefers-reduced-motion`

本版本没有后台管理、API、数据库、登录、访问统计或表单留资。企业自测内容仅存在于当前页面内存中，刷新页面后自动清除。

## 本地开发

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

访问：`http://localhost:3000`

纯静态版本不需要 `.env` 或数据库初始化。

## 静态构建

```bash
npm run build
```

构建完成后，所有可部署文件位于 `out/`。可以使用任意静态 HTTP 服务器预览，例如：

```bash
python3 -m http.server 4173 --directory out
```

访问：`http://localhost:4173`

`out/` 可部署到 GitHub Pages、Nginx、对象存储或其他支持 HTML/CSS/JavaScript 的静态托管服务。

## 添加下载资料

1. 将 PDF、Word 或 Excel 文件放入 `public/downloads/`。
2. 在 `src/lib/public-content.ts` 的 `downloadResources` 数组中登记标题、说明、类型和 `/downloads/` 文件路径。
3. 重新执行 `npm run build`。

当前资料：

- `data-cross-border-security-foundation-v1.1.pdf`
- 页面标题：深耕车企全球化运营实践，搭建数据跨境安全底座

## 质量检查

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## 目录说明

- `src/app`：公开静态页面
- `src/components`：布局、交互和 UI 组件
- `src/lib`：固定内容、表单校验和评分逻辑
- `public/downloads`：可公开下载的静态资料
- `out`：生产构建生成的静态网站

## 内容边界

- 自测采用固定规则生成模拟结果，不构成正式法律意见或监管结论。
- 不接入真实 AI、区块链或跨境传输系统。
- 不上传、处理或保存企业真实跨境数据。
