import { describe, expect, it } from "vitest";
import { calculateAutoPriceRange } from "./autoScale";

describe("calculateAutoPriceRange", () => {
  it("fits visible candle wicks with padding", () => {
    const range = calculateAutoPriceRange({
      visibleCandles: [
        { high: 110, low: 100 },
        { high: 120, low: 95 },
      ],
      paddingPercent: 0.1,
    });

    expect(range).toEqual({ minPrice: 92.5, maxPrice: 122.5 });
  });

  it("keeps price lines inside the range", () => {
    const range = calculateAutoPriceRange({
      visibleCandles: [{ high: 110, low: 100 }],
      visiblePriceLines: [125],
      paddingPercent: 0.1,
    });

    expect(range).toEqual({ minPrice: 97.5, maxPrice: 127.5 });
  });

  it("includes main-pane indicator values", () => {
    const range = calculateAutoPriceRange({
      visibleCandles: [{ high: 110, low: 100 }],
      visibleIndicators: [{ ma7: 98, ma25: 112 }],
      paddingPercent: 0.1,
    });

    expect(range).toEqual({ minPrice: 96.6, maxPrice: 113.4 });
  });

  it("ignores invalid values", () => {
    const range = calculateAutoPriceRange({
      visibleCandles: [{ high: Number.NaN, low: null as unknown as number }],
      visiblePriceLines: [undefined, "101"],
      paddingPercent: 0.1,
    });

    expect(range?.minPrice).toBeCloseTo(100.495);
    expect(range?.maxPrice).toBeCloseTo(101.505);
  });

  it("returns null when no usable values exist", () => {
    expect(
      calculateAutoPriceRange({
        visibleCandles: [{ high: Number.NaN, low: undefined }],
        visibleIndicators: [null],
        visiblePriceLines: [undefined],
      }),
    ).toBeNull();
  });

  it("handles flat price data with fallback padding", () => {
    const range = calculateAutoPriceRange({
      visibleCandles: [{ high: 100, low: 100 }],
      paddingPercent: 0.08,
    });

    expect(range?.minPrice).toBeLessThan(100);
    expect(range?.maxPrice).toBeGreaterThan(100);
  });
});
