type LimitEntry = {
  count: number;
  expiresAt: number;
};

const limitStore = new Map<string, LimitEntry>();

export function rateLimit(key: string, limit = 10, windowMs = 60_000) {
  const now = Date.now();
  const current = limitStore.get(key);

  if (!current || current.expiresAt < now) {
    limitStore.set(key, { count: 1, expiresAt: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }

  if (current.count >= limit) {
    return { success: false, remaining: 0 };
  }

  current.count += 1;
  limitStore.set(key, current);
  return { success: true, remaining: limit - current.count };
}
