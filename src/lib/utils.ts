import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function maskContact(value?: string | null) {
  if (!value) return "-";
  if (value.includes("@")) {
    const [name, domain] = value.split("@");
    return `${name.slice(0, 2)}***@${domain}`;
  }
  return `${value.slice(0, 3)}****${value.slice(-4)}`;
}

export function toCsvValue(value: unknown) {
  const text =
    typeof value === "string"
      ? value
      : Array.isArray(value)
        ? value.join("、")
        : value === null || value === undefined
          ? ""
          : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}
