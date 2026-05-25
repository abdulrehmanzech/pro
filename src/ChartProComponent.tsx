/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  createSignal,
  createEffect,
  onMount,
  Show,
  For,
  onCleanup,
  startTransition,
  Component,
} from "solid-js";

import {
  init,
  dispose,
  utils,
  Nullable,
  Chart,
  OverlayMode,
  Styles,
  TooltipIconPosition,
  ActionType,
  ActionCallback,
  PaneOptions,
  Indicator,
  DomPosition,
  FormatDateType,
  OverlayCreate,
  DeepPartial,
  LineType,
  CandleType,
  CandleStyle,
  YAxisType,
  Point,
  Coordinate,
  VisibleRange,
  KLineData,
  TooltipData,
} from "klinecharts";

import lodashSet from "lodash/set";
import lodashClone from "lodash/cloneDeep";

import { SelectDataSourceItem, Loading } from "./component";

import {
  PeriodBar,
  DrawingBar,
  IndicatorModal,
  TimezoneModal,
  SettingModal,
  ScreenshotModal,
  IndicatorSettingModal,
  SymbolSearchModal,
  MobileMoreModal,
  TimeToolsModal,
} from "./widget";
import type {
  TimeAnchorSettings,
  TimeRangeValue,
} from "./widget/time-tools-modal";

import { translateTimezone } from "./widget/timezone-modal/data";

import {
  SymbolInfo,
  Period,
  ChartProOptions,
  ChartPro,
  OverlayOptions,
  OverlayInfo,
  ChartSettings,
  IndicatorInfo,
  IndicatorEventCallback,
  OrderToolsState,
  QuickOrderMenuAction,
  IndicatorTooltipIconStyles,
  ChartViewToggleOptions,
} from "./types";

export interface ChartProComponentProps
  extends Required<Omit<ChartProOptions, "container" | "onIndicatorChange" | "onMobilePeriodClick" | "onMobileMoreClick" | "screenshotBackgroundColor" | "chartViewToggle">> {
  onIndicatorChange?: IndicatorEventCallback;
  onMobilePeriodClick?: (period: Period) => void;
  onMobileMoreClick?: () => void;
  screenshotBackgroundColor?: string;
  chartViewToggle?: ChartViewToggleOptions;
  indicatorTooltipIconStyles: IndicatorTooltipIconStyles;
  ref: (chart: ChartPro) => void;
}

interface PrevSymbolPeriod {
  symbol: SymbolInfo;
  period: Period;
}

function createIndicator(
  widget: Nullable<Chart>,
  indicatorName: string,
  isStack?: boolean,
  paneOptions?: PaneOptions
): Nullable<string> {
  if (indicatorName === "VOL") {
    paneOptions = { gap: { bottom: 2 }, ...paneOptions };
  }
  const paneId =
    widget?.createIndicator(
      {
        name: indicatorName,
        // @ts-expect-error
        createTooltipDataSource: ({ indicator, defaultStyles }) => {
          const icons = [];
          if (indicator.visible) {
            icons.push(defaultStyles.tooltip.icons[1]);
            icons.push(defaultStyles.tooltip.icons[2]);
            icons.push(defaultStyles.tooltip.icons[3]);
          } else {
            icons.push(defaultStyles.tooltip.icons[0]);
            icons.push(defaultStyles.tooltip.icons[2]);
            icons.push(defaultStyles.tooltip.icons[3]);
          }
          return { icons };
        },
      },
      isStack,
      paneOptions
    ) ?? null;

    
  // Set custom default MA periods when the indicator is created
  if (paneId && indicatorName === 'MA') {
    try {
      widget?.overrideIndicator({ name: 'MA', calcParams: [7, 25, 99] }, paneId);
    } catch (e) {
      // ignore if override not supported
    }
  }

  return paneId;
}

function getPeriodDurationMs(period: Period): number {
  const multiplier = Math.max(1, period.multiplier || 1);
  switch (period.timespan) {
    case "minute":
      return multiplier * 60 * 1000;
    case "hour":
      return multiplier * 60 * 60 * 1000;
    case "day":
      return multiplier * 24 * 60 * 60 * 1000;
    case "week":
      return multiplier * 7 * 24 * 60 * 60 * 1000;
    case "month":
      return multiplier * 30 * 24 * 60 * 60 * 1000;
    case "year":
      return multiplier * 365 * 24 * 60 * 60 * 1000;
    default:
      return 60 * 60 * 1000;
  }
}

function formatCountdownDuration(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (value: number) => String(value).padStart(2, "0");
  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${pad(minutes)}:${pad(seconds)}`;
}

const ChartProComponent: Component<ChartProComponentProps> = (props) => {
  let widgetRef: HTMLDivElement | undefined = undefined;
  let widget: Nullable<Chart> = null;

  let priceUnitDom: HTMLElement;

  const [isLoading, setIsLoading] = createSignal(false);

  const [theme, setTheme] = createSignal(props.theme);
  const [styles, setStyles] = createSignal(props.styles);
  const [locale, setLocale] = createSignal(props.locale);

  const [symbol, setSymbol] = createSignal(props.symbol);
  const [period, setPeriod] = createSignal(props.period);
  const indicatorTooltipIconStyles = () => ({
    visibleMarginLeft: props.indicatorTooltipIconStyles?.visibleMarginLeft ?? 7,
    secondaryMarginLeft: props.indicatorTooltipIconStyles?.secondaryMarginLeft ?? 7,
    marginTop: props.indicatorTooltipIconStyles?.marginTop ?? 1,
    size: props.indicatorTooltipIconStyles?.size ?? 12,
  });
  const [indicatorModalVisible, setIndicatorModalVisible] = createSignal(false);
  const [mainIndicators, setMainIndicators] = createSignal([
    ...props.mainIndicators!,
  ]);
  const [subIndicators, setSubIndicators] = createSignal({});

  const [timezoneModalVisible, setTimezoneModalVisible] = createSignal(false);
  const [timezone, setTimezone] = createSignal<SelectDataSourceItem>({
    key: props.timezone,
    text: translateTimezone(props.timezone, props.locale),
  });

  const [settingModalVisible, setSettingModalVisible] = createSignal(false);
  const [widgetDefaultStyles, setWidgetDefaultStyles] = createSignal<Styles>();

  const [screenshotUrl, setScreenshotUrl] = createSignal("");
  const [timeToolsModalVisible, setTimeToolsModalVisible] = createSignal(false);
  const [timeToolsTimestamp, setTimeToolsTimestamp] = createSignal(Date.now());
  const [timeToolsRange, setTimeToolsRange] = createSignal<TimeRangeValue>({
    from: Date.now() - 30 * 24 * 60 * 60 * 1000,
    to: Date.now(),
  });
  const [timeAnchorSettings, setTimeAnchorSettings] =
    createSignal<TimeAnchorSettings>({
      enabled: false,
      timestamp: Date.now(),
      anchorPoint: "date",
      anchorLine: false,
      acrossTokens: false,
    });
  let timeAnchorLineOverlayId: string | null = null;

  const [drawingBarVisible, setDrawingBarVisible] = createSignal(
    props.drawingBarVisible
  );

  const [symbolSearchModalVisible, setSymbolSearchModalVisible] =
    createSignal(false);

  const [loadingVisible, setLoadingVisible] = createSignal(false);

  const [mobileMoreModalVisible, setMobileMoreModalVisible] =
    createSignal(false);
  const quickOrderDefault = props.orderTools?.quickOrder ?? true;
  const [orderToolsState, setOrderToolsState] = createSignal<OrderToolsState>({
    quickOrder: quickOrderDefault,
    quickOrderFloatingWindow:
      props.orderTools?.quickOrderFloatingWindow ?? quickOrderDefault,
    quickOrderPlusButton:
      props.orderTools?.quickOrderPlusButton ?? quickOrderDefault,
    openOrders: props.orderTools?.openOrders ?? true,
    openOrdersExtendedPriceLine:
      props.orderTools?.openOrdersExtendedPriceLine ?? true,
    openOrdersDisplay: props.orderTools?.openOrdersDisplay ?? "right",
    positions: props.orderTools?.positions ?? true,
    breakevenPrice: props.orderTools?.breakevenPrice ?? true,
    liquidationPrice: props.orderTools?.liquidationPrice ?? true,
    priceLine: props.orderTools?.priceLine ?? true,
    marketPriceLine: props.orderTools?.marketPriceLine ?? true,
    countDown: props.orderTools?.countDown ?? true,
    bidAskPrice: props.orderTools?.bidAskPrice ?? true,
    orderHistory: props.orderTools?.orderHistory ?? true,
  });
  const [quickOrderMarker, setQuickOrderMarker] = createSignal<{
    y: number;
    price: number;
  } | null>(null);
  const [quickOrderMenuVisible, setQuickOrderMenuVisible] = createSignal(false);
  const [quickOrderInteracting, setQuickOrderInteracting] = createSignal(false);
  const [quickOrderYAxisWidth, setQuickOrderYAxisWidth] = createSignal(64);
  const [quickOrderMenuAnchor, setQuickOrderMenuAnchor] = createSignal<{
    y: number;
    price: number;
    yAxisWidth: number;
  } | null>(null);
  const QUICK_ORDER_MENU_SCALE_GAP = 6;
  const [countdownPriceMark, setCountdownPriceMark] = createSignal<{
    top: number;
    width: number;
    priceText: string;
    text: string;
    color: string;
    textSize: number;
    textFamily: string;
    textWeight: string | number;
    paddingLeft: number;
    paddingRight: number;
    paddingTop: number;
    paddingBottom: number;
    borderRadius: number;
  } | null>(null);
  const [overlayToolbar, setOverlayToolbar] = createSignal<{
    id: string;
    x: number;
    y: number;
    lineSize: number;
    lineStyle: LineType;
    dashedValue: number[];
    color: string;
    locked: boolean;
    visible: boolean;
  } | null>(null);
  const [overlayToolbarDropdown, setOverlayToolbarDropdown] = createSignal<
    "color" | "width" | "style" | null
  >(null);
  const overlayToolbarColors = [
    "#000000",
    "#2b3342",
    "#3f4653",
    "#565d69",
    "#6f7580",
    "#8a9099",
    "#a7acb3",
    "#c4c8ce",
    "#ffffff",
    "#ff4d67",
    "#ffa629",
    "#f7ed4a",
    "#2fc58d",
    "#4ab09c",
    "#52c4d3",
    "#3157f6",
    "#6a36b8",
    "#a644b9",
    "#d83972",
    "#f2a3a6",
    "#f5c879",
    "#f7ee97",
    "#a6d29f",
    "#7fc9b9",
    "#91d7df",
    "#8fb2ee",
    "#b09ad2",
    "#c89ccf",
    "#d987ab",
    "#e8757a",
    "#efb34f",
    "#efe36e",
    "#86c17d",
    "#66b7a8",
    "#68c4d0",
    "#5f91e4",
    "#8059c9",
    "#aa62c2",
    "#d34d83",
    "#b9353d",
    "#ea8527",
    "#e8c245",
    "#4b8c43",
    "#2f6f60",
    "#47919b",
    "#2646c6",
    "#56309c",
    "#892f95",
    "#a82563",
    "#8e2528",
    "#de5c1f",
    "#dc8527",
    "#255a22",
    "#164b34",
    "#225b63",
    "#15309b",
    "#442180",
    "#6b1f74",
    "#86154e",
  ];
  let lastQuickOrderCrosshair: any = null;

  const [indicatorSettingModalParams, setIndicatorSettingModalParams] =
    createSignal({
      visible: false,
      indicatorName: "",
      paneId: "",
      calcParams: [] as Array<any>,
    });
  let overlayTracker = new Map<string, OverlayInfo>();

  // Track drawing states for each overlay
  let drawingStates = new Map<
    string,
    {
      monitoring: boolean;
      complete: boolean;
      lastPointCount: number;
      checkInterval?: NodeJS.Timeout;
      mouseUpHandler?: () => void;
    }
  >();

  // ========== Indicator Event Helpers ==========
  
  /** Get complete indicator information for event emission */
  const getIndicatorInfo = (name: string, paneId: string, type: 'main' | 'sub'): IndicatorInfo => {
    const indicator = widget?.getIndicatorByPaneId(paneId, name) as any;
    return {
      name,
      shortName: indicator?.shortName || name,
      paneId,
      type,
      calcParams: indicator?.calcParams || [],
      precision: indicator?.precision ?? 4,
      visible: indicator?.visible ?? true,
      styles: indicator?.styles,
      figures: indicator?.figures,
    };
  };

  /** Emit indicator change event to callback */
  const emitIndicatorEvent = (name: string, paneId: string, type: 'main' | 'sub', action: 'add' | 'remove' | 'change') => {
    if (!props.onIndicatorChange) {
      return;
    }
    
    // Small delay for 'add' and 'change' to ensure indicator is fully initialized/updated
    if (action === 'add' || action === 'change') {
      setTimeout(() => {
        const indicator = getIndicatorInfo(name, paneId, type);
        props.onIndicatorChange!({ action, indicator });
      }, 50);
    } else {
      // For 'remove', emit immediately with cached/basic info
      const indicator: IndicatorInfo = {
        name,
        shortName: name,
        paneId,
        type,
        calcParams: [],
        precision: 4,
        visible: false,
        styles: undefined,
        figures: undefined,
      };
      props.onIndicatorChange({ action, indicator });
    }
  };

  // Helper function to get required points for each overlay type
  const getRequiredPoints = (type: string): number => {
    const requiredPoints: Record<string, number> = {
      line: 2,
      segment: 2,
      arrow: 2,
      rect: 2,
      triangle: 3,
      polygon: 3,
      circle: 2,
      ellipse: 2,
      arc: 3,
      fibonacciLine: 2,
      fibonacciArc: 3,
      fibonacciFan: 3,
      fibonacciZone: 2,
      fibonacciSpiral: 2,
      xabcd: 4,
      abcd: 4,
      gartley: 5,
      bat: 5,
      butterfly: 5,
      shark: 5,
      cypher: 5,
      text: 1,
      priceLine: 1,
      priceChannelLine: 3,
    };

    return requiredPoints[type] || 1;
  };

  // Function to create a serializable copy of any object
  const createSerializableCopy = (obj: any, visited = new WeakSet()): any => {
    if (obj === null || obj === undefined) return obj;
    if (visited.has(obj)) return "[Circular]";

    // Handle primitives
    if (typeof obj !== "object") return obj;

    visited.add(obj);

    // Handle arrays
    if (Array.isArray(obj)) {
      return obj.map((item) => createSerializableCopy(item, visited));
    }

    // Handle objects
    const copy: any = {};
    for (const key in obj) {
      // Skip problematic keys
      if (key === "__proto__" || key === "constructor" || key === "prototype") {
        continue;
      }

      try {
        const value = obj[key];

        // Skip functions
        if (typeof value === "function") continue;

        // Recursively copy
        copy[key] = createSerializableCopy(value, visited);
      } catch (e: any) {
        copy[key] = `[Error: ${e.message}]`;
      }
    }

    return copy;
  };

  // Function to extract overlay data safely
  const extractOverlayData = (overlay: any): OverlayInfo | null => {
    if (!overlay) return null;

    try {
      return {
        id: overlay.id || "",
        type: overlay.name || "",
        name: overlay.name || "",
        points: (overlay.points || []).map((point: Partial<Point>) => ({
          timestamp: point.timestamp || 0,
          value: point.value || 0,
          dataIndex: point.dataIndex || 0,
        })),
        extendData: createSerializableCopy(overlay.extendData || {}),
        styles: createSerializableCopy(overlay.styles || {}),
        visible: overlay.visible ?? true,
        lock: overlay.lock ?? false,
        mode: overlay.mode || OverlayMode.Normal,
      };
    } catch (error) {
      console.error("Error extracting overlay data:", error);
      return null;
    }
  };

  // Function to update overlay tracking
  const updateOverlayTracking = (overlayId: string): void => {
    try {
      const overlay = widget?.getOverlayById?.(overlayId);
      if (!overlay) return;

      const extracted = extractOverlayData(overlay);
      if (extracted) {
        const previous = overlayTracker.get(overlayId);
        const previousPoints = previous?.points?.length || 0;
        const currentPoints = extracted.points?.length || 0;

        overlayTracker.set(overlayId, extracted);

        // Check if drawing is complete
        const requiredPoints = getRequiredPoints(extracted.type);

        if (currentPoints >= requiredPoints) {
          const state = drawingStates.get(overlayId);
          if (state && !state.complete) {
            state.complete = true;

            // Stop monitoring if complete
            if (state.checkInterval) {
              clearInterval(state.checkInterval);
              state.checkInterval = undefined;
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error updating overlay tracking for ${overlayId}:`, error);
    }
  };

  // Function to monitor overlay completion
  const monitorOverlayCompletion = (overlayId: string, type: string): void => {
    if (drawingStates.has(overlayId)) return;

    const state = {
      monitoring: true,
      complete: false,
      lastPointCount: 0,
    };

    drawingStates.set(overlayId, state);


    // Update tracking immediately
    updateOverlayTracking(overlayId);

    // Set up interval to check for updates
    // state.checkInterval = setInterval(() => {
    //   updateOverlayTracking(overlayId);

    //   // Check if we should stop monitoring
    //   const currentState = drawingStates.get(overlayId);
    //   if (currentState?.complete) {
    //     if (currentState.checkInterval) {
    //       clearInterval(currentState.checkInterval);
    //       currentState.checkInterval = undefined;
    //     }
    //   }
    // }, 500); // Check every 500ms

    // Also listen for mouse up events
    const handleMouseUp = () => {
      updateOverlayTracking(overlayId);
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleMouseUp);

    // state.mouseUpHandler = handleMouseUp;

    // Stop monitoring after 30 seconds
    setTimeout(() => {
      const finalState = drawingStates.get(overlayId);
      if (finalState && !finalState.complete) {

        if (finalState.checkInterval) {
          clearInterval(finalState.checkInterval);
        }

        if (finalState.mouseUpHandler) {
          document.removeEventListener("mouseup", finalState.mouseUpHandler);
          document.removeEventListener("touchend", finalState.mouseUpHandler);
        }

        // Final update
        updateOverlayTracking(overlayId);

        const overlayInfo = overlayTracker.get(overlayId);
        if (overlayInfo) {
          const requiredPoints = getRequiredPoints(overlayInfo.type);
          const currentPoints = overlayInfo.points?.length || 0;

          if (currentPoints < requiredPoints) {
            console.warn(
              `âš ï¸ ${overlayInfo.type} ${overlayId} has only ${currentPoints} point(s), should have ${requiredPoints}`
            );
          }
        }
      }
    }, 30000);
  };

  let drawingStorage = {
    saveDrawings: (ticker: string, drawings: OverlayInfo[]) => {
      try {
        const key = `kline_drawings_${ticker}`;

        // Prepare drawings with deep serialization
        const drawingsForStorage = drawings.map((drawing) => {
          const drawingCopy: any = { ...drawing };

          // Deep copy extendData
          if (drawingCopy.extendData) {
            drawingCopy.extendData = createSerializableCopy(
              drawingCopy.extendData
            );
          }

          // Deep copy styles
          if (drawingCopy.styles) {
            drawingCopy.styles = createSerializableCopy(drawingCopy.styles);
          }

          // Log drawing info
          const requiredPoints = getRequiredPoints(drawing.type);
          const currentPoints = drawing.points?.length || 0;

          if (currentPoints < requiredPoints) {
            console.warn(
              `âš ï¸ Saving ${drawing.type} with only ${currentPoints} point(s), needs ${requiredPoints}`
            );
          }

          return drawingCopy as OverlayInfo;
        });

        const storageData = {
          drawings: drawingsForStorage,
          timestamp: Date.now(),
        };

        localStorage.setItem(key, JSON.stringify(storageData));

        // Log what was saved for debugging
        
      } catch (error) {
        console.error("Library: Error saving drawings:", error);
      }
    },

    loadDrawings: (ticker: string): OverlayInfo[] => {
      try {
        const key = `kline_drawings_${ticker}`;
        const data = localStorage.getItem(key);
        if (data) {
          const parsed = JSON.parse(data);
          const validDrawings: OverlayInfo[] = [];
          if (Array.isArray(parsed.drawings)) {
            parsed.drawings.forEach((drawing: OverlayInfo) => {
              const requiredPoints = getRequiredPoints(drawing.type);
              const currentPoints = drawing.points?.length || 0;
              if (currentPoints >= requiredPoints) {
                validDrawings.push(drawing);
              }
            });
          }
          return validDrawings;
        }
      } catch (error) {
        console.error("Library: Error loading drawings:", error);
      }
      return [];
    },

    clearDrawings: (ticker: string) => {
      try {
        const key = `kline_drawings_${ticker}`;
        localStorage.removeItem(key);
      } catch (error) {
        console.error("Library: Error clearing drawings:", error);
      }
    },
  };
  const syncDrawingsToStorage = () => {
    const currentSymbol = symbol();
    if (currentSymbol?.ticker) {
      const allDrawings = Array.from(overlayTracker.values());
      drawingStorage.saveDrawings(currentSymbol.ticker, allDrawings);
    }
  };

  const restoreDrawingsForSymbol = (ticker?: string) => {
    if (!ticker || !widget) {
      return;
    }
    overlayTracker.forEach((_, id) => {
      widget?.removeOverlay?.({ id });
    });
    overlayTracker.clear();
    drawingStates.clear();
    setOverlayToolbar(null);
    setOverlayToolbarDropdown(null);

    const savedDrawings = drawingStorage.loadDrawings(ticker);
    savedDrawings.forEach((drawing) => {
      try {
        const overlayConfig = withOverlayToolbarEvents({
          name: drawing.type,
          points: drawing.points || [],
          extendData: drawing.extendData,
          styles: drawing.styles,
          visible: drawing.visible ?? true,
          lock: drawing.lock ?? false,
          mode: drawing.mode || OverlayMode.Normal,
        });
        const overlayIdRaw = widget?.createOverlay(overlayConfig);
        const overlayId = typeof overlayIdRaw === "string" ? overlayIdRaw : null;
        if (overlayId) {
          overlayTracker.set(overlayId, {
            ...drawing,
            id: overlayId,
          });
          drawingStates.set(overlayId, {
            monitoring: false,
            complete: true,
            lastPointCount: drawing.points?.length || 0,
          });
        }
      } catch (error) {
        console.error("Library: Error restoring drawing:", error);
      }
    });
  };

  const applyOrderToolsState = (nextState: Partial<OrderToolsState>) => {
    const mergedState: OrderToolsState = {
      ...orderToolsState(),
      ...nextState,
    };
    if ("quickOrder" in nextState) {
      const enabled = nextState.quickOrder ?? false;
      mergedState.quickOrderFloatingWindow = enabled;
      mergedState.quickOrderPlusButton = enabled;
    } else if ("priceLine" in nextState) {
      const enabled = nextState.priceLine ?? false;
      mergedState.marketPriceLine = enabled;
      mergedState.countDown = enabled;
      mergedState.bidAskPrice = enabled;
    } else if (
      "quickOrderFloatingWindow" in nextState ||
      "quickOrderPlusButton" in nextState
    ) {
      mergedState.quickOrder =
        mergedState.quickOrderFloatingWindow || mergedState.quickOrderPlusButton;
    } else if (
      "marketPriceLine" in nextState ||
      "countDown" in nextState ||
      "bidAskPrice" in nextState
    ) {
      mergedState.priceLine =
        mergedState.marketPriceLine ||
        mergedState.countDown ||
        mergedState.bidAskPrice;
    }
    setOrderToolsState(mergedState);
    props.orderTools?.onChange?.(mergedState);
  };

  const formatQuickOrderPrice = (price: number): string => {
    const precision = Math.min(Math.max(symbol()?.pricePrecision ?? 2, 0), 8);
    return price.toLocaleString(undefined, {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    });
  };

  const updateCountdownPriceMark = (now = Date.now()) => {
    if (
      !widget ||
      !widgetRef ||
      !orderToolsState().countDown
    ) {
      setCountdownPriceMark(null);
      return;
    }

    widget.setStyles({
      candle: {
        priceMark: {
          last: {
            show: true,
            line: { show: orderToolsState().marketPriceLine },
            text: { show: false },
          },
        },
      },
    });

    const dataList = widget.getDataList?.() ?? [];
    const latest = dataList[dataList.length - 1] as KLineData | undefined;
    const price = Number(latest?.close);
    if (!latest || !Number.isFinite(price) || price <= 0) {
      setCountdownPriceMark(null);
      return;
    }

    const pixel = widget.convertToPixel?.(
      [{ value: price }],
      { paneId: "candle_pane", absolute: true } as any
    ) as Array<Partial<Coordinate>> | undefined;
    const y = Number(pixel?.[0]?.y);
    const paneSize = widget.getSize?.("candle_pane");
    const height = paneSize?.height ?? widgetRef.clientHeight;
    if (!Number.isFinite(y) || y < 0 || y > height) {
      setCountdownPriceMark(null);
      return;
    }

    const precision = Math.min(Math.max(symbol()?.pricePrecision ?? 2, 0), 8);
    const priceText = price.toLocaleString(undefined, {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    });
    const yAxisSize = widget.getSize?.("candle_pane", DomPosition.YAxis as any);
    const yAxisWidth =
      yAxisSize?.width && Number.isFinite(yAxisSize.width)
        ? Math.max(74, Math.floor(yAxisSize.width) - 2)
        : 96;
    const periodMs = getPeriodDurationMs(period());
    const elapsed = now % periodMs;
    const remaining = elapsed === 0 ? periodMs : periodMs - elapsed;
    const close = Number(latest.close);
    const open = Number(latest.open);
    const lastPriceMarkStyles = widget.getStyles().candle.priceMark.last;
    const textStyles = lastPriceMarkStyles.text;
    const nativeTextSize = Number(textStyles.size) || 12;
    const paddingTop = Number(textStyles.paddingTop) || 2;
    const paddingBottom = Number(textStyles.paddingBottom) || 2;
    const paddingLeft = Math.min(Number(textStyles.paddingLeft) || 4, 3);
    const paddingRight = Math.min(Number(textStyles.paddingRight) || 4, 3);
    const labelHeight = Math.max(34, nativeTextSize * 2 + paddingTop + paddingBottom + 6);
    const labelTop = Math.max(0, Math.min(y - labelHeight / 2, height - labelHeight));
    setCountdownPriceMark({
      top: labelTop,
      width: Math.min(
        yAxisWidth,
        Math.max(
          62,
          priceText.length * (nativeTextSize * 0.56) +
            paddingLeft +
            paddingRight +
            4
        )
      ),
      priceText,
      text: formatCountdownDuration(remaining),
      color:
        Number.isFinite(close) && Number.isFinite(open) && close < open
          ? lastPriceMarkStyles.downColor
          : lastPriceMarkStyles.upColor,
      textSize: nativeTextSize,
      textFamily: textStyles.family,
      textWeight: textStyles.weight,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom,
      borderRadius: Number(textStyles.borderRadius) || 2,
    });
  };

  const resolveQuickOrderPrice = (crosshair: any): number => {
    const y = Number(crosshair?.y);
    if (!Number.isFinite(y)) {
      return NaN;
    }
    try {
      const converted = widget?.convertFromPixel([{ x: crosshair?.x ?? 0, y }], {
        paneId: "candle_pane",
      }) as Array<Partial<Point>>;
      const value = Number(converted?.[0]?.value);
      if (Number.isFinite(value) && value > 0) {
        return value;
      }
    } catch (e) {}
    try {
      const converted = widget?.convertFromPixel([{ x: crosshair?.x ?? 0, y }], {
        paneId: "candle_pane",
        absolute: true,
      }) as Array<Partial<Point>>;
      const value = Number(converted?.[0]?.value);
      if (Number.isFinite(value) && value > 0) {
        return value;
      }
    } catch (e) {}
    return NaN;
  };

  const handleQuickOrderCrosshairChange = (data?: any) => {
    if (
      !orderToolsState().quickOrderPlusButton ||
      data?.paneId !== "candle_pane" ||
      !widgetRef
    ) {
      if (quickOrderInteracting() || quickOrderMenuVisible()) {
        return;
      }
      setQuickOrderMarker(null);
      setQuickOrderMenuVisible(false);
      return;
    }
    const yAxisSize = widget?.getSize?.("candle_pane", DomPosition.YAxis as any);
    if (yAxisSize?.width && Number.isFinite(yAxisSize.width)) {
      setQuickOrderYAxisWidth(Math.max(44, Math.ceil(yAxisSize.width)));
    }
    const y = Number(data.y);
    const price = resolveQuickOrderPrice(data);
    const height = widgetRef.clientHeight;
    if (!Number.isFinite(y) || !Number.isFinite(price) || price <= 0 || y < 0 || y > height) {
      if (quickOrderInteracting() || quickOrderMenuVisible()) {
        return;
      }
      setQuickOrderMarker(null);
      setQuickOrderMenuVisible(false);
      return;
    }
    lastQuickOrderCrosshair = { ...data };
    setQuickOrderMarker({ y, price });
  };

  const restoreQuickOrderCrosshair = () => {
    if (!lastQuickOrderCrosshair) {
      return;
    }
    try {
      (widget as any)?.executeAction?.(ActionType.OnCrosshairChange, lastQuickOrderCrosshair);
    } catch (e) {}
  };

  const runQuickOrderAction = (action: QuickOrderMenuAction) => {
    const marker = quickOrderMenuAnchor() ?? quickOrderMarker();
    if (!marker) {
      return;
    }
    props.orderTools?.onQuickOrderAction?.({
      action,
      price: marker.price,
      symbol: symbol(),
    });
    setQuickOrderMenuVisible(false);
    setQuickOrderMenuAnchor(null);
    setQuickOrderInteracting(false);
  };

  const copyQuickOrderPrice = async () => {
    const marker = quickOrderMenuAnchor() ?? quickOrderMarker();
    if (!marker) {
      return;
    }
    try {
      await navigator.clipboard?.writeText(String(marker.price));
    } catch (e) {}
    setQuickOrderMenuVisible(false);
    setQuickOrderMenuAnchor(null);
    setQuickOrderInteracting(false);
  };

  const drawQuickOrderHorizontalLine = () => {
    const marker = quickOrderMenuAnchor() ?? quickOrderMarker();
    if (!marker) {
      return;
    }
    widget?.createOverlay(withOverlayToolbarEvents({
      name: "horizontalStraightLine",
      points: [{ value: marker.price }],
      lock: false,
    }));
    setQuickOrderMenuVisible(false);
    setQuickOrderMenuAnchor(null);
    setQuickOrderInteracting(false);
  };

  const resolveOverlayToolbarPosition = (event: any) => {
    const contentRect = widgetRef?.parentElement?.getBoundingClientRect?.();
    const widgetRect = widgetRef?.getBoundingClientRect?.();
    const overlay = event?.overlay;
    const point = overlay?.points?.[0];
    let x = 72;
    let y = 40;
    if (contentRect) {
      if (Number.isFinite(event?.pageX)) {
        x = event.pageX - contentRect.left;
      } else if (Number.isFinite(event?.x) && widgetRect) {
        x = widgetRect.left - contentRect.left + event.x;
      }
      if (Number.isFinite(event?.pageY)) {
        y = event.pageY - contentRect.top;
      } else if (Number.isFinite(event?.y) && widgetRect) {
        y = widgetRect.top - contentRect.top + event.y;
      } else if (Number.isFinite(point?.value)) {
        try {
          const pixel = widget?.convertToPixel?.(
            [{ value: point.value }],
            { paneId: "candle_pane", absolute: true } as any
          ) as Array<Partial<Coordinate>>;
          const pixelY = Number(pixel?.[0]?.y);
          if (Number.isFinite(pixelY)) {
            y = pixelY - contentRect.top;
          }
        } catch (e) {}
      }
    }
    return {
      x: Math.max(12, Math.min(x - 28, (contentRect?.width ?? 360) - 320)),
      y: Math.max(8, y - 52),
    };
  };

  const showOverlayToolbar = (event: any) => {
    const overlay = event?.overlay;
    if (!overlay?.id || overlay.name !== "horizontalStraightLine") {
      return false;
    }
    const position = resolveOverlayToolbarPosition(event);
    const lineSize = Number(overlay.styles?.line?.size) || 3;
    const lineStyle = overlay.styles?.line?.style ?? LineType.Solid;
    const dashedValue = Array.isArray(overlay.styles?.line?.dashedValue)
      ? overlay.styles.line.dashedValue
      : [];
    const color = overlay.styles?.line?.color ?? "#2f6df6";
    setOverlayToolbar({
      id: overlay.id,
      x: position.x,
      y: position.y,
      lineSize,
      lineStyle,
      dashedValue,
      color,
      locked: overlay.lock ?? false,
      visible: overlay.visible ?? true,
    });
    return false;
  };

  const hideOverlayToolbar = (event: any) => {
    const id = event?.overlay?.id;
    if (!id || overlayToolbar()?.id === id) {
      setOverlayToolbar(null);
      setOverlayToolbarDropdown(null);
    }
    return false;
  };

  const withOverlayToolbarEvents = (overlay: OverlayCreate): OverlayCreate => {
    if (overlay.name !== "horizontalStraightLine") {
      return overlay;
    }
    const onClick = overlay.onClick;
    const onSelected = overlay.onSelected;
    const onDeselected = overlay.onDeselected;
    const onRemoved = overlay.onRemoved;
    const onPressedMoveEnd = overlay.onPressedMoveEnd;
    return {
      ...overlay,
      styles: {
        ...overlay.styles,
        line: {
          ...(overlay.styles as any)?.line,
          size: Number((overlay.styles as any)?.line?.size) || 3,
          style: (overlay.styles as any)?.line?.style ?? LineType.Solid,
          dashedValue: (overlay.styles as any)?.line?.dashedValue ?? [6, 4],
          color: (overlay.styles as any)?.line?.color ?? "#2f6df6",
        },
      } as any,
      onClick: (event) => {
        showOverlayToolbar(event);
        return onClick?.(event) ?? false;
      },
      onSelected: (event) => {
        showOverlayToolbar(event);
        return onSelected?.(event) ?? false;
      },
      onPressedMoveEnd: (event) => {
        showOverlayToolbar(event);
        return onPressedMoveEnd?.(event) ?? false;
      },
      onDeselected: (event) => {
        hideOverlayToolbar(event);
        return onDeselected?.(event) ?? false;
      },
      onRemoved: (event) => {
        hideOverlayToolbar(event);
        return onRemoved?.(event) ?? false;
      },
    };
  };

  const removeToolbarOverlay = () => {
    const toolbar = overlayToolbar();
    if (!toolbar) {
      return;
    }
    widget?.removeOverlay?.({ id: toolbar.id });
    setOverlayToolbar(null);
    setOverlayToolbarDropdown(null);
  };

  const updateToolbarOverlay = (updates: Record<string, unknown>) => {
    const toolbar = overlayToolbar();
    if (!toolbar) {
      return;
    }
    widget?.overrideOverlay?.({ id: toolbar.id, ...updates });
    setTimeout(() => {
      updateOverlayTracking(toolbar.id);
      syncDrawingsToStorage();
    }, 0);
  };

  const toggleToolbarOverlayLock = () => {
    const toolbar = overlayToolbar();
    if (!toolbar) {
      return;
    }
    const locked = !toolbar.locked;
    updateToolbarOverlay({ lock: locked });
    setOverlayToolbar({ ...toolbar, locked });
  };

  const toggleToolbarOverlayVisible = () => {
    const toolbar = overlayToolbar();
    if (!toolbar) {
      return;
    }
    const visible = !toolbar.visible;
    updateToolbarOverlay({ visible });
    setOverlayToolbar({ ...toolbar, visible });
  };

  const setToolbarOverlayLineSize = (lineSize: number) => {
    const toolbar = overlayToolbar();
    if (!toolbar) {
      return;
    }
    updateToolbarOverlay({ styles: { line: { size: lineSize } } });
    setOverlayToolbar({ ...toolbar, lineSize });
    setOverlayToolbarDropdown(null);
  };

  const setToolbarOverlayLineStyle = (
    lineStyle: LineType,
    dashedValue: number[]
  ) => {
    const toolbar = overlayToolbar();
    if (!toolbar) {
      return;
    }
    updateToolbarOverlay({
      styles: { line: { style: lineStyle, dashedValue } },
    });
    setOverlayToolbar({ ...toolbar, lineStyle, dashedValue });
    setOverlayToolbarDropdown(null);
  };

  const resetToolbarOverlayStyle = () => {
    const toolbar = overlayToolbar();
    if (!toolbar) {
      return;
    }
    const lineSize = 1;
    const lineStyle = LineType.Solid;
    const dashedValue = [6, 4];
    const color = "#2f6df6";
    updateToolbarOverlay({
      styles: { line: { size: lineSize, style: lineStyle, dashedValue, color } },
    });
    setOverlayToolbar({ ...toolbar, lineSize, lineStyle, dashedValue, color });
    setOverlayToolbarDropdown(null);
  };

  const setToolbarOverlayColor = (color: string) => {
    const toolbar = overlayToolbar();
    if (!toolbar) {
      return;
    }
    updateToolbarOverlay({ styles: { line: { color } } });
    setOverlayToolbar({ ...toolbar, color });
  };

  const startToolbarOverlayDrag = (event: MouseEvent) => {
    const toolbar = overlayToolbar();
    if (!toolbar || !widgetRef) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    setOverlayToolbarDropdown(null);
    const contentRect = widgetRef.parentElement?.getBoundingClientRect?.();
    if (!contentRect) {
      return;
    }
    const startX = event.clientX;
    const startY = event.clientY;
    const initialX = toolbar.x;
    const initialY = toolbar.y;

    const moveOverlay = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();
      const nextX = initialX + moveEvent.clientX - startX;
      const nextY = initialY + moveEvent.clientY - startY;
      setOverlayToolbar({
        ...toolbar,
        x: Math.max(8, Math.min(nextX, contentRect.width - 320)),
        y: Math.max(8, Math.min(nextY, contentRect.height - 48)),
      });
    };

    const stopDrag = () => {
      document.removeEventListener("mousemove", moveOverlay);
      document.removeEventListener("mouseup", stopDrag);
    };

    document.addEventListener("mousemove", moveOverlay);
    document.addEventListener("mouseup", stopDrag);
  };

  const closeQuickOrderMenu = () => {
    setQuickOrderMenuVisible(false);
    setQuickOrderMenuAnchor(null);
    setQuickOrderInteracting(false);
  };

  const handleQuickOrderDocumentPointerDown = (event: MouseEvent) => {
    if (!quickOrderMenuVisible()) {
      return;
    }
    const target = event.target as HTMLElement | null;
    if (target?.closest?.(".klinecharts-pro-quick-order-marker")) {
      return;
    }
    if (target?.closest?.(".klinecharts-pro-quick-order-menu-anchor")) {
      return;
    }
    closeQuickOrderMenu();
  };

  let lastOrderToolsQuickOrderProp = props.orderTools?.quickOrder;
  let lastOrderToolsQuickOrderFloatingWindowProp =
    props.orderTools?.quickOrderFloatingWindow;
  let lastOrderToolsQuickOrderPlusButtonProp =
    props.orderTools?.quickOrderPlusButton;
  let lastOrderToolsOpenOrdersProp = props.orderTools?.openOrders;
  let lastOrderToolsOpenOrdersExtendedPriceLineProp =
    props.orderTools?.openOrdersExtendedPriceLine;
  let lastOrderToolsOpenOrdersDisplayProp = props.orderTools?.openOrdersDisplay;
  let lastOrderToolsPositionsProp = props.orderTools?.positions;
  let lastOrderToolsBreakevenPriceProp = props.orderTools?.breakevenPrice;
  let lastOrderToolsLiquidationPriceProp = props.orderTools?.liquidationPrice;
  let lastOrderToolsPriceLineProp = props.orderTools?.priceLine;
  let lastOrderToolsMarketPriceLineProp = props.orderTools?.marketPriceLine;
  let lastOrderToolsCountDownProp = props.orderTools?.countDown;
  let lastOrderToolsBidAskPriceProp = props.orderTools?.bidAskPrice;
  let lastOrderToolsOrderHistoryProp = props.orderTools?.orderHistory;
  createEffect(() => {
    const nextQuickOrder = props.orderTools?.quickOrder;
    const nextQuickOrderFloatingWindow =
      props.orderTools?.quickOrderFloatingWindow;
    const nextQuickOrderPlusButton = props.orderTools?.quickOrderPlusButton;
    const nextOpenOrders = props.orderTools?.openOrders;
    const nextOpenOrdersExtendedPriceLine =
      props.orderTools?.openOrdersExtendedPriceLine;
    const nextOpenOrdersDisplay = props.orderTools?.openOrdersDisplay;
    const nextPositions = props.orderTools?.positions;
    const nextBreakevenPrice = props.orderTools?.breakevenPrice;
    const nextLiquidationPrice = props.orderTools?.liquidationPrice;
    const nextPriceLine = props.orderTools?.priceLine;
    const nextMarketPriceLine = props.orderTools?.marketPriceLine;
    const nextCountDown = props.orderTools?.countDown;
    const nextBidAskPrice = props.orderTools?.bidAskPrice;
    const nextOrderHistory = props.orderTools?.orderHistory;
    const nextState: Partial<OrderToolsState> = {};
    if (
      typeof nextQuickOrder === "boolean" &&
      nextQuickOrder !== lastOrderToolsQuickOrderProp
    ) {
      lastOrderToolsQuickOrderProp = nextQuickOrder;
      nextState.quickOrder = nextQuickOrder;
      if (typeof nextQuickOrderFloatingWindow !== "boolean") {
        nextState.quickOrderFloatingWindow = nextQuickOrder;
      }
      if (typeof nextQuickOrderPlusButton !== "boolean") {
        nextState.quickOrderPlusButton = nextQuickOrder;
      }
    }
    if (
      typeof nextQuickOrderFloatingWindow === "boolean" &&
      nextQuickOrderFloatingWindow !==
        lastOrderToolsQuickOrderFloatingWindowProp
    ) {
      lastOrderToolsQuickOrderFloatingWindowProp =
        nextQuickOrderFloatingWindow;
      nextState.quickOrderFloatingWindow = nextQuickOrderFloatingWindow;
    }
    if (
      typeof nextQuickOrderPlusButton === "boolean" &&
      nextQuickOrderPlusButton !== lastOrderToolsQuickOrderPlusButtonProp
    ) {
      lastOrderToolsQuickOrderPlusButtonProp = nextQuickOrderPlusButton;
      nextState.quickOrderPlusButton = nextQuickOrderPlusButton;
    }
    if (
      typeof nextOpenOrders === "boolean" &&
      nextOpenOrders !== lastOrderToolsOpenOrdersProp
    ) {
      lastOrderToolsOpenOrdersProp = nextOpenOrders;
      nextState.openOrders = nextOpenOrders;
    }
    if (
      typeof nextOpenOrdersExtendedPriceLine === "boolean" &&
      nextOpenOrdersExtendedPriceLine !==
        lastOrderToolsOpenOrdersExtendedPriceLineProp
    ) {
      lastOrderToolsOpenOrdersExtendedPriceLineProp =
        nextOpenOrdersExtendedPriceLine;
      nextState.openOrdersExtendedPriceLine = nextOpenOrdersExtendedPriceLine;
    }
    if (
      nextOpenOrdersDisplay !== undefined &&
      nextOpenOrdersDisplay !== lastOrderToolsOpenOrdersDisplayProp
    ) {
      lastOrderToolsOpenOrdersDisplayProp = nextOpenOrdersDisplay;
      nextState.openOrdersDisplay = nextOpenOrdersDisplay;
    }
    if (
      typeof nextPositions === "boolean" &&
      nextPositions !== lastOrderToolsPositionsProp
    ) {
      lastOrderToolsPositionsProp = nextPositions;
      nextState.positions = nextPositions;
    }
    if (
      typeof nextBreakevenPrice === "boolean" &&
      nextBreakevenPrice !== lastOrderToolsBreakevenPriceProp
    ) {
      lastOrderToolsBreakevenPriceProp = nextBreakevenPrice;
      nextState.breakevenPrice = nextBreakevenPrice;
    }
    if (
      typeof nextLiquidationPrice === "boolean" &&
      nextLiquidationPrice !== lastOrderToolsLiquidationPriceProp
    ) {
      lastOrderToolsLiquidationPriceProp = nextLiquidationPrice;
      nextState.liquidationPrice = nextLiquidationPrice;
    }
    if (
      typeof nextPriceLine === "boolean" &&
      nextPriceLine !== lastOrderToolsPriceLineProp
    ) {
      lastOrderToolsPriceLineProp = nextPriceLine;
      nextState.priceLine = nextPriceLine;
      if (typeof nextMarketPriceLine !== "boolean") {
        nextState.marketPriceLine = nextPriceLine;
      }
      if (typeof nextCountDown !== "boolean") {
        nextState.countDown = nextPriceLine;
      }
      if (typeof nextBidAskPrice !== "boolean") {
        nextState.bidAskPrice = nextPriceLine;
      }
    }
    if (
      typeof nextMarketPriceLine === "boolean" &&
      nextMarketPriceLine !== lastOrderToolsMarketPriceLineProp
    ) {
      lastOrderToolsMarketPriceLineProp = nextMarketPriceLine;
      nextState.marketPriceLine = nextMarketPriceLine;
    }
    if (
      typeof nextCountDown === "boolean" &&
      nextCountDown !== lastOrderToolsCountDownProp
    ) {
      lastOrderToolsCountDownProp = nextCountDown;
      nextState.countDown = nextCountDown;
    }
    if (
      typeof nextBidAskPrice === "boolean" &&
      nextBidAskPrice !== lastOrderToolsBidAskPriceProp
    ) {
      lastOrderToolsBidAskPriceProp = nextBidAskPrice;
      nextState.bidAskPrice = nextBidAskPrice;
    }
    if (
      typeof nextOrderHistory === "boolean" &&
      nextOrderHistory !== lastOrderToolsOrderHistoryProp
    ) {
      lastOrderToolsOrderHistoryProp = nextOrderHistory;
      nextState.orderHistory = nextOrderHistory;
    }
    if (Object.keys(nextState).length > 0) {
      applyOrderToolsState(nextState);
    }
  });

  createEffect(() => {
    orderToolsState().marketPriceLine;
    orderToolsState().countDown;
    period();
    symbol();
    widget?.setStyles({
      candle: {
        priceMark: {
          last: {
            show: true,
            line: { show: orderToolsState().marketPriceLine },
            text: { show: !orderToolsState().countDown },
          },
        },
      },
    });
    updateCountdownPriceMark();
  });

  props.ref({
    setTheme,
    getTheme: () => theme(),
    setStyles,
    getStyles: () => widget!.getStyles(),
    setLocale,
    getLocale: () => locale(),
    setTimezone: (timezone: string) => {
      setTimezone({
        key: timezone,
        text: translateTimezone(props.timezone, locale()),
      });
    },
    getTimezone: () => timezone().key,
    setSymbol,
    getSymbol: () => symbol(),
    setPeriod,
    getPeriod: () => period(),
    getMainIndicators: () => mainIndicators(),
    getSubIndicators: () => subIndicators(),
    setMainIndicators,
    setSubIndicators,
    overrideIndicator: (
      config: { name: string; calcParams?: number[]; visible?: boolean },
      paneId: string
    ) => {
      widget?.overrideIndicator(config, paneId);
    },
    createOverlay: (overlay: OverlayCreate): string | null => {
      const result = widget?.createOverlay?.(withOverlayToolbarEvents(overlay));
      if (typeof result === "string") return result;
      return null;
    },

    removeOverlay: (options: { groupId?: string; id?: string }): void => {
      widget?.removeOverlay?.(options);
      if (options.id) {
        overlayTracker.delete(options.id);

        // Cleanup monitoring state
        const state = drawingStates.get(options.id);
        if (state) {
          if (state.checkInterval) {
            clearInterval(state.checkInterval);
          }
          if (state.mouseUpHandler) {
            document.removeEventListener("mouseup", state.mouseUpHandler);
            document.removeEventListener("touchend", state.mouseUpHandler);
          }
          drawingStates.delete(options.id);
        }

        // âœ… **Auto-sync to storage**
        syncDrawingsToStorage();
      }
    },

    removeAllOverlay: (): void => {
      // Remove all tracked overlays
      overlayTracker.forEach((_, id) => {
        widget?.removeOverlay?.({ id });

        // Cleanup monitoring state
        const state = drawingStates.get(id);
        if (state) {
          if (state.checkInterval) {
            clearInterval(state.checkInterval);
          }
          if (state.mouseUpHandler) {
            document.removeEventListener("mouseup", state.mouseUpHandler);
            document.removeEventListener("touchend", state.mouseUpHandler);
          }
        }
      });

      overlayTracker.clear();
      drawingStates.clear();
    },

    getAllOverlay: (): OverlayInfo[] => {
      return Array.from(overlayTracker.values());
    },

    getOverlay: (id: string): OverlayInfo | null => {
      return overlayTracker.get(id) || null;
    },

    overrideOverlay: (options: { [key: string]: any }): void => {
      if (
        widget &&
        "overrideOverlay" in widget &&
        typeof widget.overrideOverlay === "function"
      ) {
        widget.overrideOverlay(options);
      } else {
        console.warn("overrideOverlay method not available on widget");
      }
    },

    convertToPixel: (
      points: Partial<Point> | Array<Partial<Point>>,
      finder: { paneId?: string; absolute?: boolean }
    ): Partial<Coordinate> | Array<Partial<Coordinate>> => {
      if (!widget) {
        return Array.isArray(points) ? [] : {};
      }
      return widget.convertToPixel(points, finder);
    },
    convertFromPixel: (
      coordinates: Array<Partial<Coordinate>>,
      finder: { paneId?: string; absolute?: boolean }
    ): Partial<Point> | Array<Partial<Point>> => {
      if (!widget) {
        return [];
      }
      return widget.convertFromPixel(coordinates, finder);
    },
    getVisibleRange: (): VisibleRange => {
      if (!widget) {
        return { from: 0, to: 0 };
      }
      return widget.getVisibleRange();
    },
    getDataList: (): KLineData[] => {
      if (!widget) return [];
      return widget.getDataList();
    },
    getSize: (paneId?: string, position?: string) => {
      if (!widget) return null;
      return widget.getSize(paneId, position as any);
    },
    getDom: (paneId?: string, position?: string) => {
      if (!widget) return null;
      return widget.getDom(paneId, position as any);
    },
    subscribeAction: (type: ActionType, callback: ActionCallback): void => {
      if (widget) {
        widget.subscribeAction(type, callback);
      }
    },
    unsubscribeAction: (type: ActionType, callback?: ActionCallback): void => {
      if (widget) {
        widget.unsubscribeAction(type, callback);
      }
    },

    setIndicatorModalVisible,
    setTimezoneModalVisible,
    setSettingModalVisible,
    getOrderToolsState: () => orderToolsState(),
    setOrderToolsState: (state: Partial<OrderToolsState>) => {
      applyOrderToolsState(state);
    },

    dispose: (): void => {
      // Note: We already have a global dispose function from klinecharts
      if (widgetRef) {
        dispose(widgetRef);
      }
    },

    resize: (): void => {
      if (widget && "resize" in widget && typeof widget.resize === "function") {
        widget.resize();
      } else {
        console.warn("resize method not available on widget");
      }
    },

    getSettings: (): ChartSettings => {
      if (!widget) return {};

      const styles = widget.getStyles();

      // Get the bar style - need to check what's actually in the bar object
      const barStyle = styles.candle?.bar as any;

      return {
        // Candle settings
        candleType: styles.candle?.type,
        candleBarStyle: barStyle?.style as LineType | undefined, // bar.style might be LineType
        showLastPrice: styles.candle?.priceMark?.last?.show,
        showHighestPrice: styles.candle?.priceMark?.high?.show,
        showLowestPrice: styles.candle?.priceMark?.low?.show,

        // Indicator settings
        showIndicatorLastValue: styles.indicator?.lastValueMark?.show,

        // Axis settings - yAxis.reverse is boolean according to YAxisStyle interface
        priceAxisType: styles.yAxis?.type,
        reverseCoordinate: styles.yAxis?.reverse,

        // Grid settings
        showGrids: styles.grid?.show,

        timestamp: Date.now(),
      };
    },

    setSettings: (settings: Partial<ChartSettings>): void => {
      if (!widget) return;

      const styleUpdates: DeepPartial<Styles> = {};

      // Apply candle settings
      if (settings.candleType !== undefined) {
        styleUpdates.candle = {
          ...styleUpdates.candle,
          type: settings.candleType,
        };
      }

      // Apply bar style - careful with the type
      if (settings.candleBarStyle !== undefined) {
        // The bar object is ChangeColor type, but we need to add style property
        const currentBar = styleUpdates.candle?.bar || {};
        styleUpdates.candle = {
          ...styleUpdates.candle,
          bar: {
            ...currentBar,
            style: settings.candleBarStyle,
          } as any, // Use any since ChangeColor doesn't have style
        };
      }

      // Apply price mark settings
      if (settings.showLastPrice !== undefined) {
        styleUpdates.candle = {
          ...styleUpdates.candle,
          priceMark: {
            ...styleUpdates.candle?.priceMark,
            last: {
              ...styleUpdates.candle?.priceMark?.last,
              show: settings.showLastPrice,
              text: {
                ...styleUpdates.candle?.priceMark?.last?.text,
                show:
                  settings.showLastPrice &&
                  !orderToolsState().countDown,
              },
            },
          },
        };
      }

      if (settings.showHighestPrice !== undefined) {
        styleUpdates.candle = {
          ...styleUpdates.candle,
          priceMark: {
            ...styleUpdates.candle?.priceMark,
            high: {
              ...styleUpdates.candle?.priceMark?.high,
              show: settings.showHighestPrice,
            },
          },
        };
      }

      if (settings.showLowestPrice !== undefined) {
        styleUpdates.candle = {
          ...styleUpdates.candle,
          priceMark: {
            ...styleUpdates.candle?.priceMark,
            low: {
              ...styleUpdates.candle?.priceMark?.low,
              show: settings.showLowestPrice,
            },
          },
        };
      }

      // Apply indicator settings
      if (settings.showIndicatorLastValue !== undefined) {
        styleUpdates.indicator = {
          ...styleUpdates.indicator,
          lastValueMark: {
            ...styleUpdates.indicator?.lastValueMark,
            show: settings.showIndicatorLastValue,
          },
        };
      }

      // Apply axis settings
      if (settings.priceAxisType !== undefined) {
        styleUpdates.yAxis = {
          ...styleUpdates.yAxis,
          type: settings.priceAxisType,
        };
      }

      if (settings.reverseCoordinate !== undefined) {
        styleUpdates.yAxis = {
          ...styleUpdates.yAxis,
          reverse: settings.reverseCoordinate,
        };
      }

      // Apply grid settings
      if (settings.showGrids !== undefined) {
        styleUpdates.grid = {
          ...styleUpdates.grid,
          show: settings.showGrids,
        };
      }

      // Apply the style updates
      widget.setStyles(styleUpdates);
    },

    resetSettings: (): void => {
      if (!widget) return;

      // Get default styles from the widget itself or use a fallback
      const currentStyles = widget.getStyles();

      // Create a default reset configuration
      const resetStyles: DeepPartial<Styles> = {
        candle: {
          type: CandleType.CandleSolid, // Default to solid candles
          priceMark: {
            last: { show: true },
            high: { show: true },
            low: { show: true },
          },
        },
        indicator: {
          lastValueMark: { show: true },
        },
        yAxis: {
          type: YAxisType.Normal,
          reverse: false,
        },
        grid: {
          show: true,
          horizontal: { show: true, color: "#1e293b", size: 0.5 },
          vertical: { show: true, color: "#1e293b", size: 0.5 },
        },
      };

      // Or if you have widgetDefaultStyles and want to use it, check it first:
      const defaultStyles = widgetDefaultStyles();
      if (defaultStyles) {
        // Use the saved default styles
        const resetFromDefault: DeepPartial<Styles> = {
          candle: {
            type: defaultStyles.candle?.type,
            bar: defaultStyles.candle?.bar,
            priceMark: defaultStyles.candle?.priceMark,
          },
          indicator: {
            lastValueMark: defaultStyles.indicator?.lastValueMark,
          },
          yAxis: {
            type: defaultStyles.yAxis?.type,
            reverse: defaultStyles.yAxis?.reverse,
          },
          grid: {
            show: defaultStyles.grid?.show,
          },
        };

        // Apply styles from saved defaults
        widget.setStyles(resetFromDefault);
      } else {
        // Apply hardcoded defaults
        widget.setStyles(resetStyles);
      }
    },

    // === Drawing Methods ===
    saveDrawings: (ticker: string) => {
      const drawings = Array.from(overlayTracker.values());

      // Validate all drawings before saving
      drawings.forEach((drawing, index) => {
        const requiredPoints = getRequiredPoints(drawing.type);
        const currentPoints = drawing.points?.length || 0;

        if (currentPoints < requiredPoints) {
          console.warn(
            `âš ï¸ ${drawing.type} ${drawing.id} has only ${currentPoints} point(s), should have ${requiredPoints}`
          );
        }
      });

      drawingStorage.saveDrawings(ticker, drawings);
    },

    loadDrawings: (ticker: string) => {
      const savedDrawings = drawingStorage.loadDrawings(ticker);


      savedDrawings.forEach((drawing: OverlayInfo, index: number) => {
        try {
         

          const overlayConfig: OverlayCreate = {
            name: drawing.type,
            points: drawing.points || [],
            extendData: drawing.extendData,
            styles: drawing.styles,
            visible: drawing.visible ?? true,
            lock: drawing.lock ?? false,
            mode: drawing.mode ?? OverlayMode.Normal,
          };

          const overlayIdRaw = widget?.createOverlay(overlayConfig);
          const overlayId = typeof overlayIdRaw === "string" ? overlayIdRaw : null;

          if (overlayId) {

            // Update tracker with the new ID
            overlayTracker.set(overlayId, {
              ...drawing,
              id: overlayId,
            });

            // Mark as complete since it's being loaded from storage
            drawingStates.set(overlayId, {
              monitoring: false,
              complete: true,
              lastPointCount: drawing.points?.length || 0,
            });
          }
        } catch (error) {
          console.error(`   âŒ Error restoring ${drawing.type}:`, error);
        }
      });

    },

    getDrawings: (ticker: string) => {
      return drawingStorage.loadDrawings(ticker);
    },

    clearDrawings: (ticker: string) => {
      drawingStorage.clearDrawings(ticker);
    },

    // Auto-save on overlay events
    enableAutoSave: (ticker: string, enabled: boolean = true) => {
      if (enabled) {

        // Save periodically
        // const intervalId = setInterval(() => {
        //   const drawings = Array.from(overlayTracker.values());
        //   if (drawings.length > 0) {
        //     drawingStorage.saveDrawings(ticker, drawings);
        //   }
        // }, 30000); // Save every 30 seconds

        // // Return cleanup function
        // return () => {
        //   clearInterval(intervalId);
        //   console.log(`ðŸ”§ Auto-save disabled for ${ticker}`);
        // };
      }
    },
  });

  const documentResize = () => {
    widget?.resize();
    updateCountdownPriceMark();
  };

  const handleCountdownPriceMarkUpdate: ActionCallback = () => {
    updateCountdownPriceMark();
  };
  const countdownPriceMarkActions: ActionType[] = [
    ActionType.OnVisibleRangeChange,
    ActionType.OnZoom,
    ActionType.OnScroll,
  ];
  let countdownPriceMarkTimer: number | undefined;

  const adjustFromTo = (period: Period, toTimestamp: number, count: number) => {
    let to = toTimestamp;
    let from = to;
    switch (period.timespan) {
      case "minute": {
        to = to - (to % (60 * 1000));
        from = to - count * period.multiplier * 60 * 1000;
        break;
      }
      case "hour": {
        to = to - (to % (60 * 60 * 1000));
        from = to - count * period.multiplier * 60 * 60 * 1000;
        break;
      }
      case "day": {
        to = to - (to % (60 * 60 * 1000));
        from = to - count * period.multiplier * 24 * 60 * 60 * 1000;
        break;
      }
      case "week": {
        const date = new Date(to);
        const week = date.getDay();
        const dif = week === 0 ? 6 : week - 1;
        to = to - dif * 60 * 60 * 24;
        const newDate = new Date(to);
        to = new Date(
          `${newDate.getFullYear()}-${
            newDate.getMonth() + 1
          }-${newDate.getDate()}`
        ).getTime();
        from = count * period.multiplier * 7 * 24 * 60 * 60 * 1000;
        break;
      }
      case "month": {
        const date = new Date(to);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        to = new Date(`${year}-${month}-01`).getTime();
        from = count * period.multiplier * 30 * 24 * 60 * 60 * 1000;
        const fromDate = new Date(from);
        from = new Date(
          `${fromDate.getFullYear()}-${fromDate.getMonth() + 1}-01`
        ).getTime();
        break;
      }
      case "year": {
        const date = new Date(to);
        const year = date.getFullYear();
        to = new Date(`${year}-01-01`).getTime();
        from = count * period.multiplier * 365 * 24 * 60 * 60 * 1000;
        const fromDate = new Date(from);
        from = new Date(`${fromDate.getFullYear()}-01-01`).getTime();
        break;
      }
    }
    return [from, to];
  };

  const getCenteredTimeRange = (timestamp: number, candleCount = 500) => {
    const duration = getPeriodDurationMs(period());
    const half = Math.max(1, Math.floor(candleCount / 2)) * duration;
    return {
      from: timestamp - half,
      to: timestamp + half,
    };
  };

  const scrollToChartTimestamp = (timestamp: number) => {
    if (!widget || !Number.isFinite(timestamp)) {
      return;
    }
    widget.scrollToTimestamp?.(timestamp, 250);
    updateCountdownPriceMark();
  };

  const syncTimeAnchorLine = () => {
    if (timeAnchorLineOverlayId) {
      widget?.removeOverlay?.({ id: timeAnchorLineOverlayId });
      timeAnchorLineOverlayId = null;
    }
    const anchor = timeAnchorSettings();
    if (!widget || !anchor.enabled || !anchor.anchorLine) {
      return;
    }
    const result = widget.createOverlay?.({
      name: "verticalStraightLine",
      points: [{ timestamp: anchor.timestamp }],
      lock: true,
      styles: {
        line: {
          color: "rgba(156, 163, 175, 0.75)",
          size: 1,
          style: LineType.Dashed,
          dashedValue: [4, 4],
        },
      },
    } as any);
    timeAnchorLineOverlayId = typeof result === "string" ? result : null;
  };

  const loadTimeRange = async (
    range: TimeRangeValue,
    scrollTarget?: number,
  ) => {
    if (!widget) {
      return;
    }
    setIsLoading(true);
    setLoadingVisible(true);
    try {
      const p = period();
      const nextRange =
        range.from <= range.to
          ? range
          : { from: range.to, to: range.from };
      const kLineDataList = await props.datafeed.getHistoryKLineData(
        symbol(),
        p,
        nextRange.from,
        nextRange.to,
      );
      widget.applyNewData(kLineDataList, kLineDataList.length > 0);
      setTimeToolsRange(nextRange);
      requestAnimationFrame(() => {
        scrollToChartTimestamp(scrollTarget ?? nextRange.to);
        syncTimeAnchorLine();
      });
    } finally {
      setIsLoading(false);
      setLoadingVisible(false);
    }
  };

  const goToChartDate = async (timestamp: number) => {
    setTimeToolsTimestamp(timestamp);
    await loadTimeRange(getCenteredTimeRange(timestamp), timestamp);
  };

  const applyTimeAnchorSettings = (settings: TimeAnchorSettings) => {
    setTimeAnchorSettings(settings);
    if (settings.enabled) {
      setTimeToolsTimestamp(settings.timestamp);
      requestAnimationFrame(() => scrollToChartTimestamp(settings.timestamp));
    }
    requestAnimationFrame(syncTimeAnchorLine);
  };

  // ... (keep all the imports and other code the same until onMount)

  onMount(() => {
    window.addEventListener("resize", documentResize);
    widget = init(widgetRef!, {
      customApi: {
        formatDate: (
          dateTimeFormat: Intl.DateTimeFormat,
          timestamp,
          format: string,
          type: FormatDateType
        ) => {
          const p = period();
          switch (p.timespan) {
            case "minute": {
              if (type === FormatDateType.XAxis) {
                return utils.formatDate(dateTimeFormat, timestamp, "HH:mm");
              }
              return utils.formatDate(
                dateTimeFormat,
                timestamp,
                "YYYY-MM-DD HH:mm"
              );
            }
            case "hour": {
              if (type === FormatDateType.XAxis) {
                return utils.formatDate(
                  dateTimeFormat,
                  timestamp,
                  "MM-DD HH:mm"
                );
              }
              return utils.formatDate(
                dateTimeFormat,
                timestamp,
                "YYYY-MM-DD HH:mm"
              );
            }
            case "day":
            case "week":
              return utils.formatDate(dateTimeFormat, timestamp, "YYYY-MM-DD");
            case "month": {
              if (type === FormatDateType.XAxis) {
                return utils.formatDate(dateTimeFormat, timestamp, "YYYY-MM");
              }
              return utils.formatDate(dateTimeFormat, timestamp, "YYYY-MM-DD");
            }
            case "year": {
              if (type === FormatDateType.XAxis) {
                return utils.formatDate(dateTimeFormat, timestamp, "YYYY");
              }
              return utils.formatDate(dateTimeFormat, timestamp, "YYYY-MM-DD");
            }
          }
          return utils.formatDate(
            dateTimeFormat,
            timestamp,
            "YYYY-MM-DD HH:mm"
          );
        },
      },
    });

    if (widget) {
      const watermarkContainer = widget.getDom("candle_pane", DomPosition.Main);
      if (watermarkContainer) {
        let watermark = document.createElement("div");
        watermark.className = "klinecharts-pro-watermark";
        if (utils.isString(props.watermark)) {
          const str = (props.watermark as string).replace(/(^\s*)|(\s*$)/g, "");
          watermark.innerHTML = str;
        } else {
          watermark.appendChild(props.watermark as Node);
        }
        watermarkContainer.appendChild(watermark);
      }

      const priceUnitContainer = widget.getDom(
        "candle_pane",
        DomPosition.YAxis
      );
      priceUnitDom = document.createElement("span");
      priceUnitDom.className = "klinecharts-pro-price-unit";
      priceUnitContainer?.appendChild(priceUnitDom);
    }







  let isProcessingRightClick = false;
  
  // Function to refresh local storage
  const refreshLocalStorageForCurrentDrawings = () => {
    const currentSymbol = symbol();
    if (!currentSymbol?.ticker) return;
    
    try {
      const allDrawings = Array.from(overlayTracker.values());
      
      // Save current state to local storage
      drawingStorage.saveDrawings(currentSymbol.ticker, allDrawings);
      
    } catch (error) {
      console.error('âŒ Error refreshing local storage:', error);
    }
  };
  
  // Add right-click event listener to chart container
  const handleRightClick = (e: MouseEvent) => {
    if (isProcessingRightClick) return;
    
    isProcessingRightClick = true;
    
    // Prevent default browser context menu
    e.preventDefault();
    
    
    // Small delay to ensure any overlay removal is processed
  };
  
  // âœ… Use setTimeout to ensure widgetRef is available
  setTimeout(() => {
    if (widgetRef) {
      widgetRef.addEventListener('contextmenu', handleRightClick);
    }
  }, 1000);
  
  // Also add listener to document for any right-click
  document.addEventListener('contextmenu', (e) => {
    // Check if right-click is inside the chart
    if (widgetRef && widgetRef.contains(e.target as Node)) {
      handleRightClick(e);
    }
  });
  
  // === MONKEY PATCH removeOverlay ===
  const originalRemoveOverlay = widget?.removeOverlay;
  if (widget && originalRemoveOverlay) {
    widget.removeOverlay = function (...args) {
      const result = originalRemoveOverlay.apply(this, args);

      // Extract overlay ID
      const arg = args[0];
      let overlayId: string | undefined;

      if (typeof arg === "string") {
        overlayId = arg;
      } else if (arg && typeof arg === "object" && arg.id) {
        overlayId = arg.id;
      }

      if (overlayId) {
        
        // Update our tracker
        overlayTracker.delete(overlayId);
        
        // Cleanup monitoring
        const state = drawingStates.get(overlayId);
        if (state) {
          if (state.checkInterval) clearInterval(state.checkInterval);
          if (state.mouseUpHandler) {
            document.removeEventListener("mouseup", state.mouseUpHandler);
            document.removeEventListener("touchend", state.mouseUpHandler);
          }
          drawingStates.delete(overlayId);
        }
        
        // Auto-refresh local storage
        refreshLocalStorageForCurrentDrawings();
      }

      return result;
    };
  }














    mainIndicators().forEach((indicator) => {
      createIndicator(widget, indicator, true, { id: "candle_pane" });
    });
    const subIndicatorMap = {};
    props.subIndicators!.forEach((indicator) => {
      const paneId = createIndicator(widget, indicator, true);
      if (paneId) {
        // @ts-expect-error
        subIndicatorMap[indicator] = paneId;
      }
    });
    setSubIndicators(subIndicatorMap);
    widget?.loadMore((timestamp) => {
      setIsLoading(true);
      const get = async () => {
        try {
          const p = period();
          const [to] = adjustFromTo(p, timestamp!, 1);
          const [from] = adjustFromTo(p, to, 500);
          const kLineDataList = await props.datafeed.getHistoryKLineData(
            symbol(),
            p,
            from,
            to
          );
          widget?.applyMoreData(kLineDataList, kLineDataList.length > 0);
        } finally {
          setIsLoading(false);
        }
      };
      get();
    });
    widget?.subscribeAction(ActionType.OnTooltipIconClick, (data) => {
      if (data.indicatorName) {
        switch (data.iconId) {
          case "visible": {
            widget?.overrideIndicator(
              { name: data.indicatorName, visible: true },
              data.paneId
            );
            const type = data.paneId === "candle_pane" ? "main" : "sub";
            emitIndicatorEvent(data.indicatorName, data.paneId, type, "change");
            break;
          }
          case "invisible": {
            widget?.overrideIndicator(
              { name: data.indicatorName, visible: false },
              data.paneId
            );
            const type = data.paneId === "candle_pane" ? "main" : "sub";
            emitIndicatorEvent(data.indicatorName, data.paneId, type, "change");
            break;
          }
          case "setting": {
            const indicator = widget?.getIndicatorByPaneId(
              data.paneId,
              data.indicatorName
            ) as Indicator;
            setIndicatorSettingModalParams({
              visible: true,
              indicatorName: data.indicatorName,
              paneId: data.paneId,
              calcParams: indicator.calcParams,
            });
            break;
          }
          case "close": {
            if (data.paneId === "candle_pane") {
              const newMainIndicators = [...mainIndicators()];
              widget?.removeIndicator("candle_pane", data.indicatorName);
              newMainIndicators.splice(
                newMainIndicators.indexOf(data.indicatorName),
                1
              );
              setMainIndicators(newMainIndicators);
              emitIndicatorEvent(data.indicatorName, "candle_pane", "main", "remove");
            } else {
              const newIndicators = { ...subIndicators() };
              widget?.removeIndicator(data.paneId, data.indicatorName);
              // @ts-expect-error
              delete newIndicators[data.indicatorName];
              setSubIndicators(newIndicators);
              emitIndicatorEvent(data.indicatorName, data.paneId, "sub", "remove");
            }
          }
        }
      }
    });
    widget?.subscribeAction(ActionType.OnCrosshairChange, handleQuickOrderCrosshairChange);
    countdownPriceMarkActions.forEach((action) => {
      widget?.subscribeAction(action, handleCountdownPriceMarkUpdate);
    });
    countdownPriceMarkTimer = window.setInterval(
      () => updateCountdownPriceMark(),
      1000
    );
    updateCountdownPriceMark();
    document.addEventListener("mousedown", handleQuickOrderDocumentPointerDown);

    // === MONKEY PATCH createOverlay ===
    const originalCreateOverlay = widget?.createOverlay;
    if (widget && originalCreateOverlay) {
      widget.createOverlay = function (...args) {
        const overlayConfig = withOverlayToolbarEvents(args[0] as OverlayCreate);
        const result = originalCreateOverlay.apply(
          this,
          [overlayConfig, ...args.slice(1)] as Parameters<typeof originalCreateOverlay>
        );
        const overlayId = typeof result === "string" ? result : null;

        if (overlayId) {

          // Start monitoring this overlay for completion
          monitorOverlayCompletion(overlayId, overlayConfig.name || "unknown");

          // Also update tracking immediately
          updateOverlayTracking(overlayId);
          syncDrawingsToStorage();

        }

        return result;
      };
    }

    // === MONKEY PATCH removeOverlay ===
 // === MONKEY PATCH removeOverlay ===
// const originalRemoveOverlay = widget?.removeOverlay;
// if (widget && originalRemoveOverlay) {
//   widget.removeOverlay = function (...args) {
//     const result = originalRemoveOverlay.apply(this, args);

//     // Try to extract ID from arguments
//     const arg = args[0];
//     let overlayId: string | undefined;

//     if (typeof arg === "string") {
//       overlayId = arg;
//     } else if (arg && typeof arg === "object" && arg.id) {
//       overlayId = arg.id;
//     }

//     if (overlayId) {
//       // âœ… REMOVE FROM TRACKER
//       overlayTracker.delete(overlayId);

//       // âœ… CLEANUP MONITORING STATE
//       const state = drawingStates.get(overlayId);
//       if (state) {
//         if (state.checkInterval) {
//           clearInterval(state.checkInterval);
//         }
//         if (state.mouseUpHandler) {
//           document.removeEventListener("mouseup", state.mouseUpHandler);
//           document.removeEventListener("touchend", state.mouseUpHandler);
//         }
//         drawingStates.delete(overlayId);
//       }

//       console.log(`ðŸ—‘ï¸ Removed overlay ${overlayId}`);

//       // âœ… **SYNC TO LOCAL STORAGE** <-- Correct position: Sirf jab overlayId mile
//       const currentSymbol = symbol();
//       if (currentSymbol?.ticker) {
//         const allDrawings = Array.from(overlayTracker.values());
//         drawingStorage.saveDrawings(currentSymbol.ticker, allDrawings);
//         console.log(`ðŸ’¾ Synced ${allDrawings.length} drawings to storage`);
//       }
//     }

//     return result;
//   };
// }

    // We don't patch updateOverlay as it doesn't exist
    // We rely on interval monitoring instead
  });

  // ... (keep the rest of the code the same)
  onCleanup(() => {
    window.removeEventListener("resize", documentResize);
    widget?.unsubscribeAction(ActionType.OnCrosshairChange, handleQuickOrderCrosshairChange);
    countdownPriceMarkActions.forEach((action) => {
      widget?.unsubscribeAction(action, handleCountdownPriceMarkUpdate);
    });
    if (countdownPriceMarkTimer) {
      window.clearInterval(countdownPriceMarkTimer);
      countdownPriceMarkTimer = undefined;
    }
    document.removeEventListener("mousedown", handleQuickOrderDocumentPointerDown);

    // Cleanup all monitoring intervals
    // drawingStates.forEach((state, overlayId) => {
    //   if (state.checkInterval) {
    //     clearInterval(state.checkInterval);
    //   }
    //   if (state.mouseUpHandler) {
    //     document.removeEventListener("mouseup", state.mouseUpHandler);
    //     document.removeEventListener("touchend", state.mouseUpHandler);
    //   }
    // });

    drawingStates.clear();
    overlayTracker.clear();

    dispose(widgetRef!);
  });

  createEffect(() => {
    const s = symbol();
    if (s?.priceCurrency) {
      priceUnitDom.innerHTML = s?.priceCurrency.toLocaleUpperCase();
      priceUnitDom.style.display = "flex";
    } else {
      priceUnitDom.style.display = "none";
    }
    widget?.setPriceVolumePrecision(
      s?.pricePrecision ?? 2,
      s?.volumePrecision ?? 0
    );
  });

  const formatCandleTooltipDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    const hours = `${date.getHours()}`.padStart(2, "0");
    const minutes = `${date.getMinutes()}`.padStart(2, "0");
    const dateText = `${year}-${month}-${day}`;
    switch (period().timespan) {
      case "minute":
      case "hour":
        return `${dateText} ${hours}:${minutes}`;
      case "day":
      case "week":
        return dateText;
      case "month":
        return dateText;
      case "year":
        return dateText;
    }
    return `${dateText} ${hours}:${minutes}`;
  };

  const createCandleTooltipData = (
    data: { current: KLineData },
    styles: CandleStyle
  ): TooltipData[] => {
    const { current } = data;
    const textColor = styles.tooltip.text.color;
    const candleColor =
      current.close > current.open
        ? styles.bar.upColor
        : current.close < current.open
          ? styles.bar.downColor
          : styles.bar.noChangeColor;
    const pricePrecision = Math.min(
      Math.max(symbol()?.pricePrecision ?? 2, 0),
      8
    );
    const volumePrecision = Math.min(
      Math.max(symbol()?.volumePrecision ?? 0, 0),
      8
    );
    const priceValue = (value: number) => ({
      text: utils.formatPrecision(value, pricePrecision),
      color: candleColor,
    });

    return [
      {
        title: "time",
        value: {
          text: formatCandleTooltipDate(current.timestamp),
          color: textColor,
        },
      },
      { title: "open", value: priceValue(current.open) },
      { title: "high", value: priceValue(current.high) },
      { title: "low", value: priceValue(current.low) },
      { title: "close", value: priceValue(current.close) },
      {
        title: "volume",
        value: {
          text: utils.formatBigNumber(
            utils.formatPrecision(
              current.volume ?? styles.tooltip.defaultValue,
              volumePrecision
            )
          ),
          color: candleColor,
        },
      },
    ];
  };

  const applyCandleTooltipStyles = () => {
    widget?.setStyles({
      candle: {
        tooltip: {
          custom: createCandleTooltipData,
          rect: {
            offsetLeft: 0,
            paddingLeft: 0,
          },
        },
      },
    });
  };

  createEffect((prev?: PrevSymbolPeriod) => {
    const s = symbol();
    const p = period();
    
    // Race condition protection
    let isCurrent = true;
    onCleanup(() => {
      isCurrent = false;
    });

    if (prev) {
      props.datafeed.unsubscribe(prev.symbol, prev.period);
    }
    
    setIsLoading(true);
    setLoadingVisible(true);
    
    const get = async () => {
      try {
        const anchor = timeAnchorSettings();
        const shouldUseAnchor =
          anchor.enabled &&
          (!prev ||
            prev.symbol.ticker === s.ticker ||
            anchor.acrossTokens);
        const targetTimestamp = shouldUseAnchor
          ? anchor.timestamp + getPeriodDurationMs(p) * 250
          : new Date().getTime();
        const [from, to] = adjustFromTo(p, targetTimestamp, 500);
        const kLineDataList = await props.datafeed.getHistoryKLineData(
          s,
          p,
          from,
          to
        );
        
        if (!isCurrent) return;
        
        widget?.applyNewData(kLineDataList, kLineDataList.length > 0);
        if (shouldUseAnchor) {
          requestAnimationFrame(() => {
            scrollToChartTimestamp(anchor.timestamp);
            syncTimeAnchorLine();
          });
        } else {
          syncTimeAnchorLine();
        }
        updateCountdownPriceMark();
        setTimeout(() => {
          if (isCurrent) {
            restoreDrawingsForSymbol(s?.ticker);
            updateCountdownPriceMark();
          }
        }, 0);
        props.datafeed.subscribe(s, p, (data) => {
          widget?.updateData(data);
          updateCountdownPriceMark();
        });
      } finally {
        if (isCurrent) {
          setIsLoading(false);
          setLoadingVisible(false);
        }
      }
    };
    get();
    return { symbol: s, period: p };
  });

  createEffect(() => {
    const t = theme();
    widget?.setStyles(t);
    const color = t === "dark" ? "#929AA5" : "#76808F";
    applyCandleTooltipStyles();
    widget?.setStyles({
      indicator: {
        tooltip: {
          icons: [
            {
              id: "visible",
              position: TooltipIconPosition.Middle,
              marginLeft: indicatorTooltipIconStyles().visibleMarginLeft,
              marginTop: indicatorTooltipIconStyles().marginTop,
              marginRight: 0,
              marginBottom: 0,
              paddingLeft: 0,
              paddingTop: 0,
              paddingRight: 0,
              paddingBottom: 0,
              icon: "\ue903",
              fontFamily: "icomoon",
              size: indicatorTooltipIconStyles().size,
              color: color,
              activeColor: color,
              backgroundColor: "transparent",
              activeBackgroundColor: "rgba(22, 119, 255, 0.15)",
            },
            {
              id: "invisible",
              position: TooltipIconPosition.Middle,
              marginLeft: indicatorTooltipIconStyles().secondaryMarginLeft,
              marginTop: indicatorTooltipIconStyles().marginTop,
              marginRight: 0,
              marginBottom: 0,
              paddingLeft: 0,
              paddingTop: 0,
              paddingRight: 0,
              paddingBottom: 0,
              icon: "\ue901",
              fontFamily: "icomoon",
              size: indicatorTooltipIconStyles().size,
              color: color,
              activeColor: color,
              backgroundColor: "transparent",
              activeBackgroundColor: "rgba(22, 119, 255, 0.15)",
            },
            {
              id: "setting",
              position: TooltipIconPosition.Middle,
              marginLeft: indicatorTooltipIconStyles().secondaryMarginLeft,
              marginTop: indicatorTooltipIconStyles().marginTop,
              marginBottom: 0,
              marginRight: 0,
              paddingLeft: 0,
              paddingTop: 0,
              paddingRight: 0,
              paddingBottom: 0,
              icon: "\ue902",
              fontFamily: "icomoon",
              size: indicatorTooltipIconStyles().size,
              color: color,
              activeColor: color,
              backgroundColor: "transparent",
              activeBackgroundColor: "rgba(22, 119, 255, 0.15)",
            },
            {
              id: "close",
              position: TooltipIconPosition.Middle,
              marginLeft: indicatorTooltipIconStyles().secondaryMarginLeft,
              marginTop: indicatorTooltipIconStyles().marginTop,
              marginRight: 0,
              marginBottom: 0,
              paddingLeft: 0,
              paddingTop: 0,
              paddingRight: 0,
              paddingBottom: 0,
              icon: "\ue900",
              fontFamily: "icomoon",
              size: indicatorTooltipIconStyles().size,
              color: color,
              activeColor: color,
              backgroundColor: "transparent",
              activeBackgroundColor: "rgba(22, 119, 255, 0.15)",
            },
          ],
        },
      },
    });
  });

  createEffect(() => {
    widget?.setLocale(locale());
  });

  createEffect(() => {
    widget?.setTimezone(timezone().key);
  });

  createEffect(() => {
    if (styles()) {
      widget?.setStyles(styles());
      applyCandleTooltipStyles();
      setWidgetDefaultStyles(lodashClone(widget!.getStyles()));
    }
  });

  return (
    <>
      <i class="icon-close klinecharts-pro-load-icon" />
      <PeriodBar
        locale={props.locale}
        symbol={symbol()}
        spread={drawingBarVisible()}
        period={period()}
        periods={props.periods}
        onMenuClick={async () => {
          try {
            await startTransition(() =>
              setDrawingBarVisible(!drawingBarVisible())
            );
            widget?.resize();
          } catch (e) {}
        }}
        onSymbolClick={() => {
          setSymbolSearchModalVisible(!symbolSearchModalVisible());
        }}
        onMobilePeriodClick={props.onMobilePeriodClick}
        onMobileMoreClick={() => {
          if (props.onMobileMoreClick) {
            props.onMobileMoreClick();
          } else {
            setMobileMoreModalVisible(true);
          }
        }}
        onPeriodChange={setPeriod}
        onTimeToolsClick={() => {
          const dataList = widget?.getDataList?.() ?? [];
          const visibleRange = widget?.getVisibleRange?.();
          const fromIndex = Math.max(0, Math.floor(visibleRange?.from ?? 0));
          const toIndex = Math.min(
            dataList.length - 1,
            Math.ceil(visibleRange?.to ?? dataList.length - 1),
          );
          const fromTimestamp = dataList[fromIndex]?.timestamp;
          const toTimestamp = dataList[toIndex]?.timestamp;
          const currentTimestamp =
            toTimestamp ?? dataList[dataList.length - 1]?.timestamp ?? Date.now();
          setTimeToolsTimestamp(currentTimestamp);
          if (Number.isFinite(fromTimestamp) && Number.isFinite(toTimestamp)) {
            setTimeToolsRange({
              from: fromTimestamp as number,
              to: toTimestamp as number,
            });
          }
          setTimeToolsModalVisible(true);
        }}
        onIndicatorClick={() => {
          setIndicatorModalVisible((visible) => !visible);
        }}
        onTimezoneClick={() => {
          setTimezoneModalVisible((visible) => !visible);
        }}
        onSettingClick={() => {
          setSettingModalVisible((visible) => !visible);
        }}
        onScreenshotClick={() => {
          if (widget) {
            const ssBgColor =
              props.screenshotBackgroundColor ||
              (props.theme === "dark" ? "#11131E" : "#ffffff");
            const url = widget.getConvertPictureUrl(true, "jpeg", ssBgColor);
            setScreenshotUrl(url);
          }
        }}
        chartViewToggle={props.chartViewToggle}
        showOrderToolsMenu={props.orderTools?.visible ?? false}
        orderToolsState={orderToolsState()}
        onOrderToolsStateChange={applyOrderToolsState}
      />
      <div
        class="klinecharts-pro-content"
        onMouseLeave={() => {
          setQuickOrderMarker(null);
          setQuickOrderInteracting(false);
        }}
      >
        <Show when={loadingVisible()}>
          <Loading />
        </Show>
        <Show when={drawingBarVisible()}>
        <DrawingBar
          locale={props.locale}
          onDrawingItemClick={(overlay) => {
              widget?.createOverlay(withOverlayToolbarEvents(overlay));
            }}
            onModeChange={(mode) => {
              widget?.overrideOverlay({ mode: mode as OverlayMode });
            }}
            onLockChange={(lock) => {
              widget?.overrideOverlay({ lock });
            }}
            onVisibleChange={(visible) => {
              widget?.overrideOverlay({ visible });
            }}
            onRemoveClick={(groupId) => {
              widget?.removeOverlay({ groupId });
            }}
          />
        </Show>
        <div
          ref={(el) => (widgetRef = el as HTMLDivElement)}
          class="klinecharts-pro-widget"
          data-drawing-bar-visible={drawingBarVisible()}
        />
        <Show when={countdownPriceMark()} keyed>
          {(mark) => (
            <div
              class="klinecharts-pro-countdown-price-mark"
              style={{
                top: `${mark.top}px`,
                right: "0px",
                width: `${mark.width}px`,
                background: mark.color,
                "border-radius": `${mark.borderRadius}px`,
                "font-family": mark.textFamily,
                "font-weight": mark.textWeight,
                "padding-left": `${mark.paddingLeft}px`,
                "padding-right": `${mark.paddingRight}px`,
                "padding-top": `${mark.paddingTop}px`,
                "padding-bottom": `${mark.paddingBottom}px`,
              }}
            >
              <span
                class="klinecharts-pro-countdown-price-mark-price"
                style={{
                  "font-size": `${mark.textSize}px`,
                }}
              >
                {mark.priceText}
              </span>
              <span
                class="klinecharts-pro-countdown-price-mark-timer"
                style={{
                  "font-size": `${Math.max(10, mark.textSize - 1)}px`,
                }}
              >
                {mark.text}
              </span>
            </div>
          )}
        </Show>
        <Show when={overlayToolbar()} keyed>
          {(toolbar) => (
            <div
              class="klinecharts-pro-overlay-toolbar"
              style={{
                left: `${toolbar.x}px`,
                top: `${toolbar.y}px`,
              }}
              onMouseDown={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <button
                type="button"
                class="overlay-toolbar-icon drag"
                title="Move"
                onMouseDown={startToolbarOverlayDrag}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="9" cy="6" r="1.5" />
                  <circle cx="15" cy="6" r="1.5" />
                  <circle cx="9" cy="12" r="1.5" />
                  <circle cx="15" cy="12" r="1.5" />
                  <circle cx="9" cy="18" r="1.5" />
                  <circle cx="15" cy="18" r="1.5" />
                </svg>
              </button>
              <button
                type="button"
                class="overlay-toolbar-icon refresh"
                title="Reset"
                onClick={resetToolbarOverlayStyle}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 12a9 9 0 0 1 15.4-6.36L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-15.4 6.36L3 16" />
                  <path d="M3 21v-5h5" />
                </svg>
              </button>
              <div class="overlay-toolbar-picker">
                <button
                  type="button"
                  class={`overlay-toolbar-icon edit ${
                    overlayToolbarDropdown() === "color" ? "active" : ""
                  }`}
                  title="Color"
                  onClick={() =>
                    setOverlayToolbarDropdown(
                      overlayToolbarDropdown() === "color" ? null : "color"
                    )
                  }
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                </button>
                <Show when={overlayToolbarDropdown() === "color"}>
                  <div class="overlay-toolbar-color-popover">
                    <div class="overlay-toolbar-color-grid">
                      <For each={overlayToolbarColors}>
                        {(color) => (
                          <button
                            type="button"
                            class={`overlay-toolbar-color-swatch ${
                              toolbar.color.toLowerCase() === color.toLowerCase()
                                ? "selected"
                                : ""
                            }`}
                            style={{ background: color }}
                            onClick={() => setToolbarOverlayColor(color)}
                          />
                        )}
                      </For>
                    </div>
                    <div class="overlay-toolbar-color-footer">
                      <button type="button" class="overlay-toolbar-add-color">
                        +
                      </button>
                      <div class="overlay-toolbar-color-slider">
                        <span />
                      </div>
                    </div>
                  </div>
                </Show>
              </div>
              <div class="overlay-toolbar-picker">
                <button
                  type="button"
                  class={`overlay-toolbar-line-size ${
                    overlayToolbarDropdown() === "width" ? "active" : ""
                  }`}
                  title="Line width"
                  onClick={() =>
                    setOverlayToolbarDropdown(
                      overlayToolbarDropdown() === "width" ? null : "width"
                    )
                  }
                >
                  <span class="overlay-toolbar-line-preview" />
                  <span>{toolbar.lineSize}px</span>
                </button>
                <Show when={overlayToolbarDropdown() === "width"}>
                  <div class="overlay-toolbar-dropdown width-menu">
                    <For each={[1, 2, 3, 4]}>
                      {(size) => (
                        <button
                          type="button"
                          class={toolbar.lineSize === size ? "selected" : ""}
                          onClick={() => setToolbarOverlayLineSize(size)}
                        >
                          <span
                            class="overlay-toolbar-width-sample"
                            style={{ height: `${size}px` }}
                          />
                        </button>
                      )}
                    </For>
                  </div>
                </Show>
              </div>
              <div class="overlay-toolbar-picker">
                <button
                  type="button"
                  class={`overlay-toolbar-icon minus ${
                    overlayToolbarDropdown() === "style" ? "active" : ""
                  }`}
                  title="Line style"
                  onClick={() =>
                    setOverlayToolbarDropdown(
                      overlayToolbarDropdown() === "style" ? null : "style"
                    )
                  }
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 12h16" />
                  </svg>
                </button>
                <Show when={overlayToolbarDropdown() === "style"}>
                  <div class="overlay-toolbar-dropdown style-menu">
                    <button
                      type="button"
                      class={
                        toolbar.lineStyle === LineType.Solid ? "selected" : ""
                      }
                      onClick={() =>
                        setToolbarOverlayLineStyle(LineType.Solid, [])
                      }
                    >
                      <span class="overlay-toolbar-style-sample solid" />
                    </button>
                    <button
                      type="button"
                      class={
                        toolbar.lineStyle === LineType.Dashed &&
                        toolbar.dashedValue?.[0] === 6
                          ? "selected"
                          : ""
                      }
                      onClick={() =>
                        setToolbarOverlayLineStyle(LineType.Dashed, [6, 4])
                      }
                    >
                      <span class="overlay-toolbar-style-sample dashed" />
                    </button>
                    <button
                      type="button"
                      class={
                        toolbar.lineStyle === LineType.Dashed &&
                        toolbar.dashedValue?.[0] === 2
                          ? "selected"
                          : ""
                      }
                      onClick={() =>
                        setToolbarOverlayLineStyle(LineType.Dashed, [2, 4])
                      }
                    >
                      <span class="overlay-toolbar-style-sample dotted" />
                    </button>
                  </div>
                </Show>
              </div>
              <button
                type="button"
                class={`overlay-toolbar-icon visibility ${toolbar.visible ? "" : "muted"}`}
                title={toolbar.visible ? "Hide" : "Show"}
                onClick={toggleToolbarOverlayVisible}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="5" y="5" width="14" height="14" rx="2" />
                  <path d="M20 4 4 20" />
                </svg>
              </button>
              <button
                type="button"
                class={`overlay-toolbar-icon lock ${toolbar.locked ? "active" : ""}`}
                title={toolbar.locked ? "Unlock" : "Lock"}
                onClick={toggleToolbarOverlayLock}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="5" y="10" width="14" height="10" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
              </button>
              <button
                type="button"
                class="overlay-toolbar-icon delete"
                title="Delete"
                onClick={removeToolbarOverlay}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 6h18" />
                  <path d="M8 6V4h8v2" />
                  <path d="M19 6 18 20H6L5 6" />
                  <path d="M10 11v5" />
                  <path d="M14 11v5" />
                </svg>
              </button>
            </div>
          )}
        </Show>
        <Show when={quickOrderMarker()} keyed>
          {(marker) => (
            <div
              class="klinecharts-pro-quick-order-marker"
              onMouseEnter={() => {
                setQuickOrderInteracting(true);
                restoreQuickOrderCrosshair();
              }}
              onMouseMove={(event) => {
                event.stopPropagation();
                restoreQuickOrderCrosshair();
              }}
              onMouseLeave={() => {
                if (!quickOrderMenuVisible()) {
                  setQuickOrderInteracting(false);
                }
              }}
              style={{
                top: `${Math.max(0, marker.y - 12)}px`,
                right: `${quickOrderYAxisWidth()}px`,
                display: orderToolsState().quickOrderPlusButton ? "block" : "none",
              }}
            >
              <button
                type="button"
                class="klinecharts-pro-quick-order-plus"
                onMouseDown={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  restoreQuickOrderCrosshair();
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  setQuickOrderInteracting(true);
                  setQuickOrderMenuAnchor({
                    y: marker.y,
                    price: marker.price,
                    yAxisWidth: quickOrderYAxisWidth(),
                  });
                  setQuickOrderMenuVisible(true);
                  restoreQuickOrderCrosshair();
                }}
              >
                {props.orderTools?.quickOrderPlusIcon ? (
                  <span
                    class="klinecharts-pro-quick-order-plus-icon"
                    innerHTML={props.orderTools.quickOrderPlusIcon}
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e3e3e3"
                    aria-hidden="true"
                  >
                    <path d="M460-300h40v-160h160v-40H500v-160h-40v160H300v40h160v160ZM224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h510.76q27.62 0 46.12 18.5Q800-763 800-735.38v510.76q0 27.62-18.5 46.12Q763-160 735.38-160H224.62Zm0-40h510.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-510.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69H224.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v510.76q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69ZM200-760v560-560Z" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </Show>
        <Show when={quickOrderMenuVisible() && quickOrderMenuAnchor()} keyed>
          {(anchor) => (
            <div
              class="klinecharts-pro-quick-order-menu-anchor"
              onMouseEnter={() => setQuickOrderInteracting(true)}
              onMouseLeave={() => setQuickOrderInteracting(false)}
              style={{
                top: `${Math.max(0, anchor.y + 24)}px`,
                right: `${anchor.yAxisWidth + QUICK_ORDER_MENU_SCALE_GAP}px`,
              }}
            >
                <div
                  class="klinecharts-pro-quick-order-menu"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    restoreQuickOrderCrosshair();
                  }}
                  onMouseMove={() => {
                    restoreQuickOrderCrosshair();
                  }}
                >
                  <button type="button" onClick={() => runQuickOrderAction("limit")}>
                    Trade {symbol().shortName ?? symbol().name ?? symbol().ticker} @ {formatQuickOrderPrice(anchor.price)} Limit
                  </button>
                  <button type="button" onClick={() => runQuickOrderAction("stop")}>
                    Trade {symbol().shortName ?? symbol().name ?? symbol().ticker} @ {formatQuickOrderPrice(anchor.price)} Stop
                  </button>
                  <button type="button" onClick={() => runQuickOrderAction("create")}>
                    Create new order...
                  </button>
                  <button type="button" onClick={copyQuickOrderPrice}>
                    Copy Price ({formatQuickOrderPrice(anchor.price)})
                  </button>
                  <button type="button" onClick={drawQuickOrderHorizontalLine}>
                    Draw horizontal line on {formatQuickOrderPrice(anchor.price)}
                  </button>
                </div>
            </div>
          )}
        </Show>
      </div>

      <Show when={symbolSearchModalVisible()}>
        <SymbolSearchModal
          locale={props.locale}
          datafeed={props.datafeed}
          onSymbolSelected={(symbol) => {
            setSymbol(symbol);
          }}
          onClose={() => {
            setSymbolSearchModalVisible(false);
          }}
        />
      </Show>
      <Show when={indicatorModalVisible()}>
        <IndicatorModal
          locale={props.locale}
          mainIndicators={mainIndicators()}
          subIndicators={subIndicators()}
          onClose={() => {
            setIndicatorModalVisible(false);
          }}
          onMainIndicatorChange={(data) => {
            const newMainIndicators = [...mainIndicators()];
            if (data.added) {
              createIndicator(widget, data.name, true, { id: "candle_pane" });
              newMainIndicators.push(data.name);
              emitIndicatorEvent(data.name, "candle_pane", "main", "add");
            } else {
              widget?.removeIndicator("candle_pane", data.name);
              newMainIndicators.splice(newMainIndicators.indexOf(data.name), 1);
              emitIndicatorEvent(data.name, "candle_pane", "main", "remove");
            }
            setMainIndicators(newMainIndicators);
          }}
          onSubIndicatorChange={(data) => {
            const newSubIndicators = { ...subIndicators() };
            if (data.added) {
              const paneId = createIndicator(widget, data.name);
              if (paneId) {
                // @ts-expect-error
                newSubIndicators[data.name] = paneId;
                emitIndicatorEvent(data.name, paneId, "sub", "add");
              }
            } else {
              if (data.paneId) {
                widget?.removeIndicator(data.paneId, data.name);
                // @ts-expect-error
                delete newSubIndicators[data.name];
                emitIndicatorEvent(data.name, data.paneId, "sub", "remove");
              }
            }
            setSubIndicators(newSubIndicators);
          }}
        />
      </Show>
      <Show when={timezoneModalVisible()}>
        <TimezoneModal
          locale={props.locale}
          timezone={timezone()}
          onClose={() => {
            setTimezoneModalVisible(false);
          }}
          onConfirm={setTimezone}
        />
      </Show>
      <Show when={settingModalVisible()}>
        <SettingModal
          locale={props.locale}
          currentStyles={utils.clone(widget!.getStyles())}
          onClose={() => {
            setSettingModalVisible(false);
          }}
          onChange={(style) => {
            widget?.setStyles(style);
            applyCandleTooltipStyles();
          }}
          onRestoreDefault={(options: SelectDataSourceItem[]) => {
            const style = {};
            options.forEach((option) => {
              const key = option.key;
              lodashSet(
                style,
                key,
                utils.formatValue(widgetDefaultStyles(), key)
              );
            });
            widget?.setStyles(style);
            applyCandleTooltipStyles();
          }}
        />
      </Show>
      <Show when={screenshotUrl().length > 0}>
        <ScreenshotModal
          locale={props.locale}
          url={screenshotUrl()}
          onClose={() => {
            setScreenshotUrl("");
          }}
        />
      </Show>
      <Show when={timeToolsModalVisible()}>
        <TimeToolsModal
          initialTimestamp={timeToolsTimestamp()}
          initialRange={timeToolsRange()}
          anchorSettings={timeAnchorSettings()}
          onClose={() => {
            setTimeToolsModalVisible(false);
          }}
          onGoToDate={goToChartDate}
          onTimeRange={(range) => {
            loadTimeRange(range);
          }}
          onTimeAnchorChange={applyTimeAnchorSettings}
        />
      </Show>
      <Show when={indicatorSettingModalParams().visible}>
        <IndicatorSettingModal
          locale={props.locale}
          params={indicatorSettingModalParams()}
          onClose={() => {
            setIndicatorSettingModalParams({
              visible: false,
              indicatorName: "",
              paneId: "",
              calcParams: [],
            });
          }}
          onConfirm={(params) => {
            const modalParams = indicatorSettingModalParams();
            widget?.overrideIndicator(
              { name: modalParams.indicatorName, calcParams: params },
              modalParams.paneId
            );
            const type = modalParams.paneId === "candle_pane" ? "main" : "sub";
            emitIndicatorEvent(
              modalParams.indicatorName,
              modalParams.paneId,
              type,
              "change"
            );
          }}
        />
      </Show>
      <Show when={mobileMoreModalVisible()}>
        <MobileMoreModal
          locale={props.locale}
          onIndicatorClick={() => {
            setIndicatorModalVisible(true);
          }}
          onTimezoneClick={() => {
            setTimezoneModalVisible(true);
          }}
          onSettingClick={() => {
            setSettingModalVisible(true);
          }}
          onClose={() => {
            setMobileMoreModalVisible(false);
          }}
        />
      </Show>
    </>
  );
};

export default ChartProComponent;

