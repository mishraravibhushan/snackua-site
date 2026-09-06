import { Platform } from 'react-native';

/**
 * Meta Pixel for snackua.com.
 *
 * Its job here is the Website Visitors custom audience — the warm pool we
 * retarget in the run-up to Chhath. That audience takes weeks to fill, which
 * is why the pixel goes in before there is anything to retarget.
 *
 * Paste the ID from Events Manager -> Data sources -> your pixel (a ~15 digit
 * number). While this is empty nothing loads and no request reaches Meta, so
 * the site is safe to deploy in either state.
 */
// Annotated as `string` rather than inferred: the literal type would make the
// empty-ID guard below a comparison between non-overlapping types, and tsc
// rejects it. Keeping the guard live means blanking this value is still a
// clean way to switch the pixel off.
export const META_PIXEL_ID: string = '3198336007019749';

/**
 * Localhost is deliberately excluded. Firing from a dev build would put our
 * own browsing into the retargeting audience and skew every number built on
 * it, on a site whose real traffic is currently small enough for that to
 * matter. Verify on the live site with the Meta Pixel Helper extension, or in
 * Events Manager -> Test events.
 */
const enabled = () =>
  Platform.OS === 'web' &&
  typeof window !== 'undefined' &&
  META_PIXEL_ID !== '' &&
  !__DEV__;

/**
 * Installs Meta's base code. Idempotent — a remount will not append a second
 * copy of the script, matching how the font <link> is handled in
 * app/_layout.web.tsx.
 */
export function initMetaPixel(): void {
  if (!enabled()) return;

  const w = window as unknown as Record<string, unknown>;
  if (w.fbq) return;

  // Meta's queueing stub: calls made before fbevents.js finishes loading are
  // buffered on .queue and replayed once the real implementation attaches.
  const fbq = function (this: unknown, ...args: unknown[]) {
    const self = fbq as unknown as {
      callMethod?: (...a: unknown[]) => void;
      queue: unknown[];
    };
    if (self.callMethod) self.callMethod.apply(self, args);
    else self.queue.push(args);
  } as unknown as Record<string, unknown>;

  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];

  w.fbq = fbq;
  if (!w._fbq) w._fbq = fbq;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  script.setAttribute('data-snackua-pixel', '');
  document.head.appendChild(script);

  (w.fbq as (...a: unknown[]) => void)('init', META_PIXEL_ID);
}

/**
 * expo-router navigates without a page load, so PageView has to be fired per
 * route change rather than once per session — otherwise every visit looks
 * like a single-page bounce.
 */
export function trackPixelPageView(): void {
  trackPixelEvent('PageView');
}

/**
 * Standard Meta events (PageView, ViewContent, Contact, Lead, Purchase).
 * `Contact` on the WhatsApp buttons in app/index.tsx and app/contact.tsx is
 * the obvious next one — that click is the closest thing this site has to a
 * conversion.
 */
export function trackPixelEvent(
  event: string,
  parameters?: Record<string, unknown>
): void {
  if (!enabled()) return;

  const fbq = (window as unknown as Record<string, unknown>).fbq;
  if (typeof fbq !== 'function') return;

  const track = fbq as (...a: unknown[]) => void;
  if (parameters) track('track', event, parameters);
  else track('track', event);
}
