# Company Contacts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 统一更新联系人，并用静态联系方式替换自测结果页留资表单。

**Architecture:** 联系人数据集中放在常量模块，共享展示组件消费该配置；联系页和结果页仅负责页面布局。现有线索系统保持不变。

**Tech Stack:** Next.js、TypeScript、Tailwind CSS、Vitest

## Global Constraints

- 界面默认使用中文。
- 不修改数据库结构和后台线索功能。
- 不修改联系人需求以外的说明文案。

---

### Task 1: 联系人配置与共享展示

**Files:**
- Create: `src/lib/company-contacts.test.ts`
- Create: `src/components/public/company-contact-card.tsx`
- Modify: `src/lib/constants.ts`

**Interfaces:**
- Produces: `companyContacts` 只读联系人数组和 `CompanyContactCard` 展示组件。

- [ ] **Step 1: Write the failing test**

测试联系人姓名、电话和邮箱与用户提供的信息一致。

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/company-contacts.test.ts`
Expected: FAIL，因为 `companyContacts` 尚未导出。

- [ ] **Step 3: Write minimal implementation**

新增联系人配置，并实现带 `tel:`、`mailto:` 链接的共享卡片。

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/company-contacts.test.ts`
Expected: PASS。

### Task 2: 页面接入与验证

**Files:**
- Modify: `src/app/contact/page.tsx`
- Modify: `src/app/assessment/result/[id]/page.tsx`

**Interfaces:**
- Consumes: `CompanyContactCard`。
- Produces: 两个页面一致的联系人展示。

- [ ] **Step 1: Replace page-specific contact UI**

联系页使用共享联系人卡片；结果页删除 `ContactForm` 并使用紧凑联系方式卡片。

- [ ] **Step 2: Run verification**

Run: `npm run lint && npm run typecheck && npm run test && npm run build`
Expected: 全部通过。
