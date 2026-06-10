import type { KLineData } from "klinecharts";

export interface AutoPriceRange {
  minPrice: number;
  maxPrice: number;
}

export interface AutoPriceRangeInput {
  visibleCandles?: Array<Partial<Pick<KLineData, "high" | "low" | "open" | "close">>>;
  visibleIndicators?: Array<unknown>;
  visiblePriceLines?: Array<unknown>;
  latestPrice?: unknown;
  paddingPercent?: number;
}

const DEFAULT_PADDING_PERCENT = 0.08;
const MIN_PADDING_RATIO = 0.005;

function toFiniteNumber(value: unknown): number | null {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function collectFiniteValues(value: unknown, output: number[]): void {
  const numeric = toFiniteNumber(value);
  if (numeric != null) {
    output.push(numeric);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectFiniteValues(item, output));
    return;
  }
  if (value && typeof value === "object") {
    Object.values(value as Record<string, unknown>).forEach((item) => {
      collectFiniteValues(item, output);
    });
  }
}

function resolveSafePadding(min: number, max: number, paddingPercent: number): number {
  const range = max - min;
  if (Number.isFinite(range) && range > 0) {
    return range * paddingPercent;
  }
  const base = Math.max(Math.abs(min), Math.abs(max), 1);
  return Math.max(base * MIN_PADDING_RATIO, Number.EPSILON);
}

export function calculateAutoPriceRange({
  visibleCandles = [],
  visibleIndicators = [],
  visiblePriceLines = [],
  latestPrice,
  paddingPercent = DEFAULT_PADDING_PERCENT,
}: AutoPriceRangeInput): AutoPriceRange | null {
  const values: number[] = [];

  visibleCandles.forEach((candle) => {
    const high = toFiniteNumber(candle.high);
    const low = toFiniteNumber(candle.low);
    if (high != null) values.push(high);
    if (low != null) values.push(low);
  });

  visibleIndicators.forEach((indicatorValue) => {
    collectFiniteValues(indicatorValue, values);
  });
  visiblePriceLines.forEach((lineValue) => {
    collectFiniteValues(lineValue, values);
  });

  const latest = toFiniteNumber(latestPrice);
  if (latest != null) {
    values.push(latest);
  }

  if (values.length === 0) {
    return null;
  }

  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  values.forEach((value) => {
    min = Math.min(min, value);
    max = Math.max(max, value);
  });

  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    return null;
  }

  const normalizedPadding = Math.min(Math.max(paddingPercent, 0), 0.25);
  const padding = resolveSafePadding(min, max, normalizedPadding);
  return {
    minPrice: min - padding,
    maxPrice: max + padding,
  };
}
