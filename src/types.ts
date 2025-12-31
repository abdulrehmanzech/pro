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

import { KLineData, Styles, DeepPartial } from "klinecharts";

export interface SymbolInfo {
  ticker: string;
  name?: string;
  shortName?: string;
  exchange?: string;
  market?: string;
  pricePrecision?: number;
  volumePrecision?: number;
  priceCurrency?: string;
  type?: string;
  logo?: string;
}

export interface Period {
  multiplier: number;
  timespan: string;
  text: string;
}

export type DatafeedSubscribeCallback = (data: KLineData) => void;

export interface Datafeed {
  searchSymbols(search?: string): Promise<SymbolInfo[]>;
  getHistoryKLineData(
    symbol: SymbolInfo,
    period: Period,
    from: number,
    to: number
  ): Promise<KLineData[]>;
  subscribe(
    symbol: SymbolInfo,
    period: Period,
    callback: DatafeedSubscribeCallback
  ): void;
  unsubscribe(symbol: SymbolInfo, period: Period): void;
}

export interface ChartSettings {
  // Candle settings
  candleType?: CandleType
  candleBarStyle?: LineType
  showLastPrice?: boolean
  showHighestPrice?: boolean
  showLowestPrice?: boolean
  
  // Indicator settings
  showIndicatorLastValue?: boolean
  
  // Axis settings
  priceAxisType?: YAxisType
  reverseCoordinate?: boolean 
  
  // Grid settings
  showGrids?: boolean
  
  // Additional settings
  crosshair?: {
    show?: boolean
    horizontal?: boolean
    vertical?: boolean
  }
  
  watermark?: {
    show?: boolean
    text?: string
  }
  
  timestamp?: number
}

// ========== Indicator Event Types ==========

/** Complete indicator information returned in events */
export interface IndicatorInfo {
  /** Indicator name (e.g., 'MACD', 'RSI', 'MA') */
  name: string;
  /** Short display name */
  shortName: string;
  /** Pane ID where indicator is displayed */
  paneId: string;
  /** Whether it's a main (overlay) or sub (separate pane) indicator */
  type: 'main' | 'sub';
  /** Calculation parameters (e.g., [12, 26, 9] for MACD) */
  calcParams: any[];
  /** Decimal precision for values */
  precision: number;
  /** Whether indicator is currently visible */
  visible: boolean;
  /** Custom styles applied to indicator */
  styles?: any;
  /** Figure configurations */
  figures?: any[];
}

/** Event data emitted when indicator changes */
export interface IndicatorEventData {
  /** Type of action performed */
  action: 'add' | 'remove' | 'change';
  /** Complete indicator information */
  indicator: IndicatorInfo;
}

/** Callback type for indicator change events */
export type IndicatorEventCallback = (data: IndicatorEventData) => void;


export interface ChartProOptions {
  container: string | HTMLElement;
  styles?: DeepPartial<Styles>;
  watermark?: string | Node;
  theme?: string;
  locale?: string;
  drawingBarVisible?: boolean;
  symbol: SymbolInfo;
  period: Period;
  periods?: Period[];
  timezone?: string;
  mainIndicators?: string[];
  subIndicators?: string[];
  datafeed: Datafeed;
  /** Callback fired when an indicator is added or removed */
  onIndicatorChange?: IndicatorEventCallback;
}
import type { CandleType, LineType, OverlayCreate, OverlayMode, OverlayStyle, Point, YAxisType } from "klinecharts";

// Use OverlayCreate directly or create a compatible type
export type OverlayOptions = OverlayCreate;

export interface OverlayInfo {
  id: string;
  name?: string;
  type: string;
  points: Partial<Point>[];
  // Use 'extendData' instead of 'options' to match the library
  extendData?: any;
  styles?: DeepPartial<OverlayStyle> | null | undefined;
  visible?: boolean;
  lock?: boolean;
  mode?: OverlayMode;
}
// export interface OverlayInfo {
//   id: string;
//   name?: string;
//   type: string;
//   points: Partial<Point>[];
//   options: Record<string, any>;
// }

export interface ChartPro {
  setTheme(theme: string): void;
  getTheme(): string;
  setStyles(styles: DeepPartial<Styles>): void;
  getStyles(): Styles;
  setLocale(locale: string): void;
  getLocale(): string;
  setTimezone(timezone: string): void;
  getTimezone(): string;
  setSymbol(symbol: SymbolInfo): void;
  getSymbol(): SymbolInfo;
  setPeriod(period: Period): void;
  getPeriod(): Period;
  getMainIndicators(): {};
  setMainIndicators(indicators: string[]): void;
  getSubIndicators(): {};
  setSubIndicators(indicators: string[]): void;
  overrideIndicator(
    config: { name: string; calcParams?: number[]; visible?: boolean },
    paneId: string
  ): void;

  createOverlay(overlay: OverlayCreate): string | null;
  removeOverlay(options: { groupId?: string; id?: string }): void;
  removeAllOverlay(): void;
  getAllOverlay(): OverlayInfo[];
  getOverlay(id: string): OverlayInfo | null;
  overrideOverlay(options: { [key: string]: any }): void;

  // Add utility methods
  dispose?(): void;
  resize?(): void;
  
  // Settings methods
  getSettings(): ChartSettings
  setSettings(settings: Partial<ChartSettings>): void
  resetSettings(): void


    // Drawing storage methods
  saveDrawings?(ticker: string): void;
  loadDrawings?(ticker: string): void;
  getDrawings?(ticker: string): OverlayInfo[];
  clearDrawings?(ticker: string): void;
  enableAutoSave?(ticker: string, enabled?: boolean): void;

}
