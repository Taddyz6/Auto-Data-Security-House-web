import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function source(path: string) {
  return readFileSync(join(process.cwd(), path), "utf8");
}

describe("pure static site architecture", () => {
  it("enables static export without backend dependencies", () => {
    const nextConfig = source("next.config.ts");
    const packageJson = JSON.parse(source("package.json")) as {
      scripts: Record<string, string>;
      dependencies: Record<string, string>;
      devDependencies: Record<string, string>;
    };

    expect(nextConfig).toContain('output: "export"');
    expect(nextConfig).toContain("trailingSlash: true");
    expect(packageJson.scripts.build).toBe("next build");
    expect(packageJson.scripts).not.toHaveProperty("db:push");
    expect(packageJson.scripts).not.toHaveProperty("db:seed");
    expect(packageJson.dependencies).not.toHaveProperty("@prisma/client");
    expect(packageJson.devDependencies).not.toHaveProperty("prisma");
    expect(existsSync(join(process.cwd(), "src/app/admin"))).toBe(false);
    expect(existsSync(join(process.cwd(), "src/app/api"))).toBe(false);
    expect(existsSync(join(process.cwd(), "prisma"))).toBe(false);
    expect(existsSync(join(process.cwd(), "middleware.ts"))).toBe(false);
  });

  it("scores the assessment in memory and exposes the supplied PDF", () => {
    const assessmentForm = source("src/components/public/assessment-form.tsx");
    const publicContent = source("src/lib/public-content.ts");

    expect(assessmentForm).toContain("scoreAssessment");
    expect(assessmentForm).toContain("<AssessmentResultView");
    expect(assessmentForm).not.toContain("/api/assessment");
    expect(assessmentForm).not.toContain("sessionStorage");
    expect(assessmentForm).not.toContain("localStorage");
    expect(publicContent).toContain("/downloads/data-cross-border-security-foundation-v1.1.pdf");
  });

  it("does not append an important notice section to the process page", () => {
    const processPage = source("src/app/process/page.tsx");

    expect(processPage).not.toContain("SiteDisclaimer");
    expect(processPage).not.toContain('title="重要提示"');
  });
});
