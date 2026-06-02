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
};

type CandleDirection = "up" | "down" | "noChange";
type CandleColorRole = "body" | "border" | "wick";

let activeCandleBarStyle: ExtendedCandleBarStyle | null = null;
let candleStyleFigureRegistered = false;
let activeCandleDirection: CandleDirection | null = null;
let activeCandleRectPhase = 0;

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
  colorType: CandleColorRole,
  direction: CandleDirection | null
): string | undefined {
  const bar = activeCandleBarStyle;
  if (!bar || !sourceColor) {
    return sourceColor;
  }

  const resolvedDirection = direction ?? resolveDirectionFromColor(sourceColor);
  if (resolvedDirection === "up") {
    return colorType === "border"
      ? bar.borderUpColor ?? sourceColor
      : colorType === "wick"
        ? bar.wickUpColor ?? sourceColor
        : bar.upColor ?? sourceColor;
  }
  if (resolvedDirection === "down") {
    return colorType === "border"
      ? bar.borderDownColor ?? sourceColor
      : colorType === "wick"
        ? bar.wickDownColor ?? sourceColor
        : bar.downColor ?? sourceColor;
  }
  if (resolvedDirection === "noChange") {
    return colorType === "border"
      ? bar.borderNoChangeColor ?? sourceColor
      : colorType === "wick"
        ? bar.wickNoChangeColor ?? sourceColor
        : bar.noChangeColor ?? sourceColor;
  }
  return sourceColor;
}

function getCandleRectRole(direction: CandleDirection | null): CandleColorRole {
  if (!direction) {
    return "body";
  }

  if (activeCandleDirection !== direction || activeCandleRectPhase >= 3) {
    activeCandleDirection = direction;
    activeCandleRectPhase = 0;
  }

  activeCandleRectPhase += 1;
  return activeCandleRectPhase === 2 ? "body" : "wick";
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
  const rectRole = getCandleRectRole(direction);
  const color = resolveDirectionColor(rawColor, rectRole, direction)!;
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
    if (rectRole === "body" && direction && bodyBorderColor) {
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
    borderUpColor: bar.borderUpColor ?? bar.upColor ?? activeCandleBarStyle?.borderUpColor,
    borderDownColor: bar.borderDownColor ?? bar.downColor ?? activeCandleBarStyle?.borderDownColor,
    borderNoChangeColor: bar.borderNoChangeColor ?? bar.noChangeColor ?? activeCandleBarStyle?.borderNoChangeColor,
    wickUpColor: bar.wickUpColor ?? bar.upColor ?? activeCandleBarStyle?.wickUpColor,
    wickDownColor: bar.wickDownColor ?? bar.downColor ?? activeCandleBarStyle?.wickDownColor,
    wickNoChangeColor: bar.wickNoChangeColor ?? bar.noChangeColor ?? activeCandleBarStyle?.wickNoChangeColor,
  } as ExtendedCandleBarStyle;
}
