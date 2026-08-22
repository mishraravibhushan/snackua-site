import { useWindowDimensions, type DimensionValue } from 'react-native';
import { breakpoints, typography } from './theme';

export type Breakpoint = 'phone' | 'tablet' | 'desktop';

/**
 * Current breakpoint, derived from the live window width so layouts react to
 * rotation and browser resizing.
 */
export function useBreakpoint(): Breakpoint {
  const { width } = useWindowDimensions();
  if (width >= breakpoints.desktop) return 'desktop';
  if (width >= breakpoints.tablet) return 'tablet';
  return 'phone';
}

/**
 * Picks the value matching the current breakpoint, falling back down the scale
 * so only `phone` is required: select({ phone: '100%', desktop: '31%' }) gives
 * tablets the phone value.
 */
export function useResponsiveValue<T>(values: {
  phone: T;
  tablet?: T;
  desktop?: T;
}): T {
  const bp = useBreakpoint();
  if (bp === 'desktop') return values.desktop ?? values.tablet ?? values.phone;
  if (bp === 'tablet') return values.tablet ?? values.phone;
  return values.phone;
}

/**
 * Column width for a wrapping card grid, as a percentage string. Gutters come
 * from `justifyContent: 'space-between'`, so the widths leave room between.
 */
export function useGridItemWidth(columns?: {
  phone?: number;
  tablet?: number;
  desktop?: number;
}): DimensionValue {
  const perRow = useResponsiveValue({
    phone: columns?.phone ?? 1,
    tablet: columns?.tablet ?? 2,
    desktop: columns?.desktop ?? 3,
  });
  if (perRow <= 1) return '100%';
  // Leave a few percent per row as gutter so cards never sum past the
  // container and get clipped by the wrapping row.
  const gutter = 2.5;
  return `${(100 - gutter * (perRow - 1)) / perRow}%` as DimensionValue;
}

// Headings authored at desktop sizes are scaled down on smaller screens so a
// 48px hero title does not eat an entire phone viewport.
const PHONE_SCALE: Record<string, { fontSize: number; lineHeight: number }> = {
  hero: { fontSize: 32, lineHeight: 40 },
  h1: { fontSize: 28, lineHeight: 36 },
  h2: { fontSize: 22, lineHeight: 30 },
  h3: { fontSize: 20, lineHeight: 28 },
  h4: { fontSize: 18, lineHeight: 26 },
  lead: { fontSize: 16, lineHeight: 24 },
};

const TABLET_SCALE: Record<string, { fontSize: number; lineHeight: number }> = {
  hero: { fontSize: 40, lineHeight: 48 },
  h1: { fontSize: 32, lineHeight: 40 },
  h2: { fontSize: 26, lineHeight: 34 },
};

/**
 * `typography` with heading sizes adjusted for the current breakpoint. Keys and
 * every other style property are unchanged, so it is a drop-in replacement.
 */
export function useTypography(): typeof typography {
  const bp = useBreakpoint();
  if (bp === 'desktop') return typography;

  const scale = bp === 'phone' ? PHONE_SCALE : TABLET_SCALE;
  const scaled = {} as Record<string, unknown>;
  for (const [key, style] of Object.entries(typography)) {
    scaled[key] = scale[key] ? { ...style, ...scale[key] } : style;
  }
  return scaled as typeof typography;
}
