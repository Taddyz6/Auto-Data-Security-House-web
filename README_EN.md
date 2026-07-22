<div align="center">

# Auto Data Security House

### An Interactive Platform for Automotive Cross-Border Data Security

A modern web platform for visualizing cross-border automotive data flows, presenting compliance processes, exploring business scenarios, and conducting preliminary enterprise self-assessments.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Website-22c55e?style=for-the-badge\&logo=cloudflare)](https://adsh-web.zhangtaddy.workers.dev)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square\&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square\&logo=react\&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square\&logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square\&logo=tailwindcss\&logoColor=white)](https://tailwindcss.com/)
[![Cloudflare](https://img.shields.io/badge/Deployed_on-Cloudflare-F38020?style=flat-square\&logo=cloudflare\&logoColor=white)](https://www.cloudflare.com/)

[Live Demo](https://adsh-web.zhangtaddy.workers.dev) · [Features](#features) · [Technology Stack](#technology-stack) · [Getting Started](#getting-started) · [Deployment](#deployment)

</div>

---

## Overview

**Auto Data Security House** is an interactive demonstration and educational platform focused on automotive cross-border data security.

It is designed to help automotive companies, technology providers, and industry stakeholders better understand:

* Cross-border automotive data flows
* Data identification and classification
* Preliminary risk assessment
* Compliance pathway evaluation
* Data security protection
* Continuous security governance

The platform combines visual presentations, animated data-flow maps, practical business scenarios, downloadable resources, and a browser-based enterprise self-assessment tool.

> **Disclaimer:** This project is intended for business demonstrations, industry education, and preliminary internal reference only. It does not constitute legal advice, regulatory approval, compliance certification, or an official assessment.

---

## Live Demo

The project is currently deployed on Cloudflare:

### https://adsh-web.zhangtaddy.workers.dev

---

## Features

### Technology-Focused Landing Page

* Modern automotive technology visual design
* Animated global data-flow map
* Cross-border data transfer visualization
* Overview of core services and capabilities
* Responsive design for desktop and mobile devices
* Smooth scrolling and interactive animations

### Data Security House Introduction

* Introduction to the Automotive Data Security House concept
* Cross-border data lifecycle presentation
* Service capabilities and business value
* Common enterprise data-export concerns
* Industry-oriented educational content

### End-to-End Process Visualization

The platform presents a structured cross-border data security workflow:

1. Data identification
2. Data classification and grading
3. Risk assessment
4. Compliance pathway evaluation
5. Security protection
6. Continuous management

### Enterprise Self-Assessment

The website includes a six-step browser-based self-assessment process.

The generated assessment result may include:

* Overall evaluation
* Preliminary risk indicators
* Key areas requiring attention
* Recommended improvement measures
* Printable assessment results
* Option to restart the assessment

All assessment calculations are performed locally in the browser.

No assessment data is uploaded to a server or stored in a database.

### Automotive Business Scenarios

The platform introduces several representative cross-border automotive data scenarios:

* International research and development collaboration
* Connected vehicle services
* Overseas after-sales service and vehicle maintenance
* Global supply-chain collaboration
* Cross-border analytics and operations
* International vehicle data management

### Resource Downloads

The website supports downloadable public resources in formats such as:

* PDF
* Microsoft Word
* Microsoft Excel

Downloadable materials can be managed through the project's public resources directory and content configuration.

### Corporate Information

The website can present:

* Company introduction
* Service capabilities
* Contact information
* Business address
* Frequently asked questions
* Qualifications and professional capabilities

---

## Screenshots

Screenshots can be added to the `public/screenshots/` directory and displayed here:

```md
![Homepage](public/screenshots/homepage.png)
![Assessment](public/screenshots/assessment.png)
```

Recommended screenshots:

* Homepage hero section
* Animated world map
* Cross-border process page
* Enterprise self-assessment
* Assessment result page
* Mobile interface

---

## Technology Stack

| Technology      | Purpose                                    |
| --------------- | ------------------------------------------ |
| Next.js 16      | React framework and static site generation |
| React 19        | User-interface development                 |
| TypeScript 5    | Static typing and maintainable code        |
| Tailwind CSS 4  | Styling and responsive layout              |
| Framer Motion   | Animations and page transitions            |
| React Hook Form | Form state management                      |
| Zod             | Form validation                            |
| Lucide React    | Interface icons                            |
| Dotted Map      | Global map visualization                   |
| Vitest          | Unit testing and coverage                  |
| ESLint          | Code-quality checks                        |
| Cloudflare      | Production deployment and hosting          |

---

## Architecture

This project is implemented as a static frontend application.

```text
User Browser
     │
     ▼
Next.js Static Application
     │
     ├── Interactive Pages
     ├── Animated Data Visualizations
     ├── Enterprise Self-Assessment
     ├── Static Business Content
     └── Downloadable Resources
```

The current version does not require:

* A database
* A backend API
* User authentication
* Environment variables
* A content management system
* Server-side business logic

---

## Project Structure

```text
Auto-Data-Security-House-web/
├── public/
│   └── downloads/              # Public downloadable resources
│
├── src/
│   ├── app/                    # Next.js pages, layouts, and global styles
│   ├── components/             # Page, layout, and UI components
│   └── lib/                    # Content, validation, and assessment logic
│
├── next.config.ts              # Next.js static-export configuration
├── package.json                # Dependencies and npm scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

---

## Getting Started

### Requirements

Install the following software before running the project:

```text
Node.js 20 or later
npm 10 or later
```

### Clone the Repository

```bash
git clone https://github.com/Taddyz6/Auto-Data-Security-House-web.git
```

### Enter the Project Directory

```bash
cd Auto-Data-Security-House-web
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

Open the following address in your browser:

```text
http://localhost:3000
```

No `.env` file or database initialization is required.

---

## Available Commands

```bash
# Start the development server
npm run dev

# Create a production build
npm run build

# Run ESLint
npm run lint

# Run TypeScript checks
npm run typecheck

# Run tests and generate coverage
npm run test
```

---

## Production Build

Create a production build with:

```bash
npm run build
```

The exported static website will be generated in:

```text
out/
```

You can preview the generated website locally with:

```bash
python3 -m http.server 4173 --directory out
```

Then open:

```text
http://localhost:4173
```

---

## Deployment

### Current Deployment

The production website is deployed on Cloudflare:

```text
https://adsh-web.zhangtaddy.workers.dev
```

### Cloudflare Configuration

Recommended build configuration:

```text
Build command: npm run build
Output directory: out
```

When deploying through Wrangler, make sure a compatibility date is configured.

Example `wrangler.jsonc`:

```jsonc
{
  "name": "adsh-web",
  "compatibility_date": "2026-07-22",
  "assets": {
    "directory": "./out"
  }
}
```

Build and deploy:

```bash
npm run build
npx wrangler deploy
```

### Other Supported Platforms

Because the project uses static export, it can also be hosted on:

* Cloudflare Pages
* GitHub Pages
* Vercel
* Netlify
* AWS S3
* Alibaba Cloud OSS
* Tencent Cloud COS
* Nginx
* Other static hosting services

---

## Adding Downloadable Resources

Place public files in:

```text
public/downloads/
```

Then edit:

```text
src/lib/public-content.ts
```

Add an item to the `downloadResources` array:

```ts
{
  title: "Resource title",
  description: "A short description of the resource.",
  type: "PDF",
  href: "/downloads/example.pdf",
}
```

Rebuild the project after making changes:

```bash
npm run build
```

---

## Quality Checks

Before committing changes or deploying a production version, run:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

These commands verify:

* Code quality
* Type safety
* Automated tests
* Production build compatibility

---

## Data and Privacy

The current version of the platform:

* Does not require user registration
* Does not provide user accounts
* Does not use a database
* Does not upload enterprise assessment data
* Does not permanently store assessment results
* Does not execute real cross-border data transfers
* Does not connect to a production AI model
* Does not connect to a production blockchain network
* Does not provide formal compliance certification

Enterprise self-assessment data exists only in the current browser session and is removed when the page is refreshed or closed.

---

## Accessibility and User Experience

The project includes:

* Responsive layouts
* Mobile-friendly navigation
* Keyboard-accessible controls
* Clear visual hierarchy
* Form validation
* Reduced-motion support
* Smooth page transitions
* Print-friendly assessment results

---

## Roadmap

Possible future improvements include:

* English and Chinese language switching
* More automotive data-transfer scenarios
* Configurable assessment rules
* Assessment report export
* Content management capabilities
* Analytics dashboard
* Administrative interface
* Backend API integration
* Enterprise authentication
* Real compliance knowledge-base integration
* Additional accessibility improvements

---

## Contributing

Contributions, issues, and feature suggestions are welcome.

To contribute:

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/your-feature
```

3. Commit your changes.

```bash
git commit -m "feat: add your feature"
```

4. Push the branch.

```bash
git push origin feature/your-feature
```

5. Open a pull request.

---

## Repository

GitHub:

https://github.com/Taddyz6/Auto-Data-Security-House-web

Live website:

https://adsh-web.zhangtaddy.workers.dev

---

## License

This repository currently does not include an open-source license.

Unless a license is added, all rights are reserved by the project owner. Other users may view the source code but should not assume permission to copy, modify, redistribute, or use it commercially.

---

<div align="center">

Built with Next.js, React, TypeScript, and Cloudflare.

**[Open Live Website](https://adsh-web.zhangtaddy.workers.dev)**

</div>
