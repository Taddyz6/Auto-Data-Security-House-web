export function CatarcMark() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-8 w-8"
      role="img"
      aria-label="CATARC 标识"
    >
      <defs>
        <linearGradient id="catarcMark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dff7ff" />
          <stop offset="55%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="18" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" />
      <path
        d="M21 20h22v5H27v5h12v5H27v10h-6V20zm25 0h-6v25h6V20z"
        fill="url(#catarcMark)"
      />
      <circle cx="46" cy="33" r="3.2" fill="#dff7ff" />
    </svg>
  );
}
