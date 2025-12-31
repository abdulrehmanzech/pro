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
  PaneOptions,
  Indicator,
  DomPosition,
  FormatDateType,
  OverlayCreate,
  DeepPartial,
  LineType,
  CandleType,
  YAxisType,
  Point,
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
} from "./widget";

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
} from "./types";

export interface ChartProComponentProps
  extends Required<Omit<ChartProOptions, "container" | "onIndicatorChange">> {
  onIndicatorChange?: IndicatorEventCallback;
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
  return (
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
    ) ?? null
  );
}

const ChartProComponent: Component<ChartProComponentProps> = (props) => {
  let widgetRef: HTMLDivElement | undefined = undefined;
  let widget: Nullable<Chart> = null;

  let priceUnitDom: HTMLElement;

  let loading = false;

  const [theme, setTheme] = createSignal(props.theme);
  const [styles, setStyles] = createSignal(props.styles);
  const [locale, setLocale] = createSignal(props.locale);

  const [symbol, setSymbol] = createSignal(props.symbol);
  const [period, setPeriod] = createSignal(props.period);
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

  const [drawingBarVisible, setDrawingBarVisible] = createSignal(
    props.drawingBarVisible
  );

  const [symbolSearchModalVisible, setSymbolSearchModalVisible] =
    createSignal(false);

  const [loadingVisible, setLoadingVisible] = createSignal(false);

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
    if (!props.onIndicatorChange) return;
    
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
              `⚠️ ${overlayInfo.type} ${overlayId} has only ${currentPoints} point(s), should have ${requiredPoints}`
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
              `⚠️ Saving ${drawing.type} with only ${currentPoints} point(s), needs ${requiredPoints}`
            );
          }

          return drawingCopy as OverlayInfo;
        });

        const storageData = {
          drawings: drawingsForStorage,
          timestamp: Date.now(),
        };

        // localStorage.setItem(key, JSON.stringify(storageData, null, 2));

        // Log what was saved for debugging
        
      } catch (error) {
        console.error("Library: Error saving drawings:", error);
      }
    },

    loadDrawings: (ticker: string): OverlayInfo[] => {
      try {
        const key = `kline_drawings_${ticker}`;
        // const data = localStorage.getItem(key);
        // if (data) {
        //   const parsed = JSON.parse(data);
        

        //   // Validate loaded drawings
        //   const validDrawings: OverlayInfo[] = [];

        //   if (parsed.drawings) {
        //     parsed.drawings.forEach((drawing: OverlayInfo, index: number) => {
        //       const requiredPoints = getRequiredPoints(drawing.type);
        //       const currentPoints = drawing.points?.length || 0;

        //       if (currentPoints >= requiredPoints) {
        //         validDrawings.push(drawing);
              
        //       } else {
        //         console.warn(
        //           `📥 Skipping ${drawing.type}: Only ${currentPoints} point(s), need ${requiredPoints}`
        //         );
        //       }
        //     });
        //   }

        //   return validDrawings;
        // }
      } catch (error) {
        console.error("Library: Error loading drawings:", error);
      }
      return [];
    },

    clearDrawings: (ticker: string) => {
      try {
        const key = `kline_drawings_${ticker}`;
        // localStorage.removeItem(key);
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
      return widget?.createOverlay?.(overlay) ?? null;
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

        // ✅ **Auto-sync to storage**
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
            `⚠️ ${drawing.type} ${drawing.id} has only ${currentPoints} point(s), should have ${requiredPoints}`
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

          const overlayId = widget?.createOverlay(overlayConfig);

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
          console.error(`   ❌ Error restoring ${drawing.type}:`, error);
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
        //   console.log(`🔧 Auto-save disabled for ${ticker}`);
        // };
      }
    },
  });

  const documentResize = () => {
    widget?.resize();
  };

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
      console.error('❌ Error refreshing local storage:', error);
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
  
  // ✅ Use setTimeout to ensure widgetRef is available
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
      loading = true;
      const get = async () => {
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
        loading = false;
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

    // === MONKEY PATCH createOverlay ===
    const originalCreateOverlay = widget?.createOverlay;
    if (widget && originalCreateOverlay) {
      widget.createOverlay = function (...args) {
        const overlayConfig = args[0] as OverlayCreate;
        const result = originalCreateOverlay.apply(this, args);

        if (result) {

          // Start monitoring this overlay for completion
          monitorOverlayCompletion(result, overlayConfig.name || "unknown");

          // Also update tracking immediately
          updateOverlayTracking(result);
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
//       // ✅ REMOVE FROM TRACKER
//       overlayTracker.delete(overlayId);

//       // ✅ CLEANUP MONITORING STATE
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

//       console.log(`🗑️ Removed overlay ${overlayId}`);

//       // ✅ **SYNC TO LOCAL STORAGE** <-- Correct position: Sirf jab overlayId mile
//       const currentSymbol = symbol();
//       if (currentSymbol?.ticker) {
//         const allDrawings = Array.from(overlayTracker.values());
//         drawingStorage.saveDrawings(currentSymbol.ticker, allDrawings);
//         console.log(`💾 Synced ${allDrawings.length} drawings to storage`);
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

  createEffect((prev?: PrevSymbolPeriod) => {
    if (!loading) {
      if (prev) {
        props.datafeed.unsubscribe(prev.symbol, prev.period);
      }
      const s = symbol();
      const p = period();
      loading = true;
      setLoadingVisible(true);
      const get = async () => {
        const [from, to] = adjustFromTo(p, new Date().getTime(), 500);
        const kLineDataList = await props.datafeed.getHistoryKLineData(
          s,
          p,
          from,
          to
        );
        widget?.applyNewData(kLineDataList, kLineDataList.length > 0);
        props.datafeed.subscribe(s, p, (data) => {
          widget?.updateData(data);
        });
        loading = false;
        setLoadingVisible(false);
      };
      get();
      return { symbol: s, period: p };
    }
    return prev;
  });

  createEffect(() => {
    const t = theme();
    widget?.setStyles(t);
    const color = t === "dark" ? "#929AA5" : "#76808F";
    widget?.setStyles({
      indicator: {
        tooltip: {
          icons: [
            {
              id: "visible",
              position: TooltipIconPosition.Middle,
              marginLeft: 8,
              marginTop: 7,
              marginRight: 0,
              marginBottom: 0,
              paddingLeft: 0,
              paddingTop: 0,
              paddingRight: 0,
              paddingBottom: 0,
              icon: "\ue903",
              fontFamily: "icomoon",
              size: 14,
              color: color,
              activeColor: color,
              backgroundColor: "transparent",
              activeBackgroundColor: "rgba(22, 119, 255, 0.15)",
            },
            {
              id: "invisible",
              position: TooltipIconPosition.Middle,
              marginLeft: 8,
              marginTop: 7,
              marginRight: 0,
              marginBottom: 0,
              paddingLeft: 0,
              paddingTop: 0,
              paddingRight: 0,
              paddingBottom: 0,
              icon: "\ue901",
              fontFamily: "icomoon",
              size: 14,
              color: color,
              activeColor: color,
              backgroundColor: "transparent",
              activeBackgroundColor: "rgba(22, 119, 255, 0.15)",
            },
            {
              id: "setting",
              position: TooltipIconPosition.Middle,
              marginLeft: 6,
              marginTop: 7,
              marginBottom: 0,
              marginRight: 0,
              paddingLeft: 0,
              paddingTop: 0,
              paddingRight: 0,
              paddingBottom: 0,
              icon: "\ue902",
              fontFamily: "icomoon",
              size: 14,
              color: color,
              activeColor: color,
              backgroundColor: "transparent",
              activeBackgroundColor: "rgba(22, 119, 255, 0.15)",
            },
            {
              id: "close",
              position: TooltipIconPosition.Middle,
              marginLeft: 6,
              marginTop: 7,
              marginRight: 0,
              marginBottom: 0,
              paddingLeft: 0,
              paddingTop: 0,
              paddingRight: 0,
              paddingBottom: 0,
              icon: "\ue900",
              fontFamily: "icomoon",
              size: 14,
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
      setWidgetDefaultStyles(lodashClone(widget!.getStyles()));
    }
  });

  return (
    <>
      <i class="icon-close klinecharts-pro-load-icon" />
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
            emitIndicatorEvent(modalParams.indicatorName, modalParams.paneId, type, "change");
          }}
        />
      </Show>
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
        onPeriodChange={setPeriod}
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
            const url = widget.getConvertPictureUrl(
              true,
              "jpeg",
              props.theme === "dark" ? "#151517" : "#ffffff"
            );
            setScreenshotUrl(url);
          }
        }}
      />
      <div 
      class="klinecharts-pro-content">
        <Show when={loadingVisible()}>
          <Loading />
        </Show>
        <Show when={drawingBarVisible()}>
          <DrawingBar
            locale={props.locale}
            onDrawingItemClick={(overlay) => {
              widget?.createOverlay(overlay);
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
          // ref={widgetRef}
          ref={el => widgetRef = el as HTMLDivElement}  
          class="klinecharts-pro-widget"
          data-drawing-bar-visible={drawingBarVisible()}
        />
      </div>
    </>
  );
};

export default ChartProComponent;
