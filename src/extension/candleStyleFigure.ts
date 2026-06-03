import { LineType, PolygonType, registerFigure } from "klinecharts";
import type { DeepPartial, Styles } from "klinecharts";

type RectAttrs = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type RectStyles = {
  style?: PolygonType;
  color?: string;
  borderSize?: number;
  borderColor?: string;
  borderStyle?: LineType;
  borderRadius?: number;
  borderDashedValue?: number[];
};

type ExtendedCandleBarStyle = Styles["candle"]["bar"] & {
  borderUpColor?: string;
  borderDownColor?: string;
  borderNoChangeColor?: string;
  wickUpColor?: string;
  wickDownColor?: string;
  wickNoChangeColor?: string;
  upBorderColor?: string;
  downBorderColor?: string;
  noChangeBorderColor?: string;
  upWickColor?: string;
  downWickColor?: string;
  noChangeWickColor?: string;
};

type CandleDirection = "up" | "down" | "noChange";

let activeCandleBarStyle: ExtendedCandleBarStyle | null = null;
let candleStyleFigureRegistered = false;
const candleBodyWidthByCenter = new Map<number, number>();
const MAX_TRACKED_CANDLE_CENTERS = 500;
const MIN_WICK_WIDTH_THRESHOLD = 3;

function normalizeColor(color?: string): string | undefined {
  return color?.trim().toLowerCase();
}

function checkCoordinateOnRect(coordinate: { x: number; y: number }, rect: RectAttrs): boolean {
  return (
    coordinate.x >= rect.x &&
    coordinate.x <= rect.x + rect.width &&
    coordinate.y >= rect.y &&
    coordinate.y <= rect.y + rect.height
  );
}

function resolveDirectionFromColor(sourceColor?: string): CandleDirection | null {
  const bar = activeCandleBarStyle;
  if (!bar || !sourceColor) {
    return null;
  }

  const normalized = normalizeColor(sourceColor);
  if (normalized === normalizeColor(bar.upColor)) {
    return "up";
  }
  if (normalized === normalizeColor(bar.downColor)) {
    return "down";
  }
  if (normalized === normalizeColor(bar.noChangeColor)) {
    return "noChange";
  }
  return null;
}

function resolveDirectionColor(
  sourceColor: string | undefined,
  colorType: "body" | "border" | "wick",
  direction: CandleDirection | null
): string | undefined {
  const bar = activeCandleBarStyle;
  if (!bar || !sourceColor) {
    return sourceColor;
  }

  const resolvedDirection = direction ?? resolveDirectionFromColor(sourceColor);
  if (resolvedDirection === "up") {
    return colorType === "border"
      ? bar.upBorderColor ?? bar.borderUpColor ?? sourceColor
      : colorType === "wick"
        ? bar.upWickColor ?? bar.wickUpColor ?? sourceColor
        : bar.upColor ?? sourceColor;
  }
  if (resolvedDirection === "down") {
    return colorType === "border"
      ? bar.downBorderColor ?? bar.borderDownColor ?? sourceColor
      : colorType === "wick"
        ? bar.downWickColor ?? bar.wickDownColor ?? sourceColor
        : bar.downColor ?? sourceColor;
  }
  if (resolvedDirection === "noChange") {
    return colorType === "border"
      ? bar.noChangeBorderColor ?? bar.borderNoChangeColor ?? sourceColor
      : colorType === "wick"
        ? bar.noChangeWickColor ?? bar.wickNoChangeColor ?? sourceColor
        : bar.noChangeColor ?? sourceColor;
  }
  return sourceColor;
}

function getCandleRectCenter(attrs: RectAttrs): number {
  return Math.round((attrs.x + attrs.width / 2) * 1000) / 1000;
}

function getCandleRectWidth(attrs: RectAttrs): number {
  return Math.round(Math.abs(attrs.width) * 1000) / 1000;
}

function isWickRect(attrs: RectAttrs, isStrokeOnlyBody: boolean): boolean {
  if (isStrokeOnlyBody) {
    return false;
  }

  const center = getCandleRectCenter(attrs);
  const width = getCandleRectWidth(attrs);
  const trackedBodyWidth = candleBodyWidthByCenter.get(center) ?? 0;

  if (width > Math.max(MIN_WICK_WIDTH_THRESHOLD, trackedBodyWidth)) {
    candleBodyWidthByCenter.set(center, width);
    if (candleBodyWidthByCenter.size > MAX_TRACKED_CANDLE_CENTERS) {
      const firstKey = candleBodyWidthByCenter.keys().next().value;
      if (firstKey !== undefined) {
        candleBodyWidthByCenter.delete(firstKey);
      }
    }
    return false;
  }

  const wickThreshold = Math.max(MIN_WICK_WIDTH_THRESHOLD, trackedBodyWidth * 0.35);
  return width <= wickThreshold;
}

function drawRoundedRectPath(ctx: CanvasRenderingContext2D, attrs: RectAttrs, radius: number): void {
  const { x, y, width: w, height: h } = attrs;
  const r = Math.max(0, Math.min(radius, Math.abs(w) / 2, Math.abs(h) / 2));

  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawRect(ctx: CanvasRenderingContext2D, attrs: RectAttrs, styles: RectStyles): void {
  const style = styles.style ?? PolygonType.Fill;
  const rawColor = styles.color ?? "currentColor";
  const direction = resolveDirectionFromColor(styles.color) ?? resolveDirectionFromColor(styles.borderColor);
  const isStrokeOnlyBody = style === PolygonType.Stroke;
  const isWickLike = direction ? isWickRect(attrs, isStrokeOnlyBody) : false;
  const color = resolveDirectionColor(rawColor, isWickLike ? "wick" : "body", direction)!;
  const borderSize = styles.borderSize ?? 1;
  const borderColor = resolveDirectionColor(styles.borderColor ?? rawColor, "border", direction)!;
  const borderStyle = styles.borderStyle ?? LineType.Solid;
  const r = styles.borderRadius ?? 0;
  const borderDashedValue = styles.borderDashedValue ?? [2, 2];
  const isFilled = style === PolygonType.Fill || styles.style === PolygonType.StrokeFill;
  const isStroked = style === PolygonType.Stroke || styles.style === PolygonType.StrokeFill;

  if (isFilled) {
    ctx.fillStyle = color;
    drawRoundedRectPath(ctx, attrs, r);
    ctx.fill();

    const bodyBorderColor = resolveDirectionColor(rawColor, "border", direction);
    if (!isWickLike && direction && bodyBorderColor) {
      ctx.strokeStyle = bodyBorderColor;
      ctx.lineWidth = Math.max(1, borderSize);
      ctx.setLineDash([]);
      drawRoundedRectPath(ctx, attrs, r);
      ctx.stroke();
    }
  }

  if (isStroked) {
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderSize;
    ctx.setLineDash(borderStyle === LineType.Dashed ? borderDashedValue : []);
    drawRoundedRectPath(ctx, attrs, r);
    ctx.stroke();
  }
}

export function registerCandleStyleFigure(): void {
  if (candleStyleFigureRegistered) {
    return;
  }
  candleStyleFigureRegistered = true;
  registerFigure<RectAttrs, RectStyles>({
    name: "rect",
    checkEventOn: checkCoordinateOnRect,
    draw: drawRect,
  });
}

export function syncExtendedCandleBarStyle(styles?: DeepPartial<Styles> | Styles | null): void {
  const bar = styles?.candle?.bar as ExtendedCandleBarStyle | undefined;
  if (!bar) {
    return;
  }
  activeCandleBarStyle = {
    ...(activeCandleBarStyle ?? {}),
    ...bar,
    upBorderColor: bar.upBorderColor ?? bar.borderUpColor ?? bar.upColor ?? activeCandleBarStyle?.upBorderColor ?? activeCandleBarStyle?.borderUpColor,
    downBorderColor: bar.downBorderColor ?? bar.borderDownColor ?? bar.downColor ?? activeCandleBarStyle?.downBorderColor ?? activeCandleBarStyle?.borderDownColor,
    noChangeBorderColor: bar.noChangeBorderColor ?? bar.borderNoChangeColor ?? bar.noChangeColor ?? activeCandleBarStyle?.noChangeBorderColor ?? activeCandleBarStyle?.borderNoChangeColor,
    upWickColor: bar.upWickColor ?? bar.wickUpColor ?? bar.upColor ?? activeCandleBarStyle?.upWickColor ?? activeCandleBarStyle?.wickUpColor,
    downWickColor: bar.downWickColor ?? bar.wickDownColor ?? bar.downColor ?? activeCandleBarStyle?.downWickColor ?? activeCandleBarStyle?.wickDownColor,
    noChangeWickColor: bar.noChangeWickColor ?? bar.wickNoChangeColor ?? bar.noChangeColor ?? activeCandleBarStyle?.noChangeWickColor ?? activeCandleBarStyle?.wickNoChangeColor,
  } as ExtendedCandleBarStyle;
}
