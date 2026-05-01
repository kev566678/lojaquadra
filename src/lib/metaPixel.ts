// Mova para .env.local: NEXT_PUBLIC_META_PIXEL_ID=841663878344406
export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "841663878344406";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackMetaEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;
  if (!window.fbq) return;

  window.fbq("track", eventName, params || {});
}

export function trackMetaCustomEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;
  if (!window.fbq) return;

  window.fbq("trackCustom", eventName, params || {});
}