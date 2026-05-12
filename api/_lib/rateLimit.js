// api/_lib/rateLimit.js
// Rate limit en mémoire — simple, suffisant pour un portfolio

const requests = new Map()
const WINDOW_MS = 60 * 1000   // fenêtre d'1 minute
const MAX_REQUESTS = 10        // max 10 messages par fenêtre

export function checkRateLimit(ip) {
  const now = Date.now()
  const entry = requests.get(ip)

  // Pas d'entrée ou fenêtre expirée → on (re)démarre
  if (!entry || now > entry.resetAt) {
    requests.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, remaining: MAX_REQUESTS - 1 }
  }

  // Quota atteint
  if (entry.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    }
  }

  // OK, on incrémente
  entry.count += 1
  return { allowed: true, remaining: MAX_REQUESTS - entry.count }
}
