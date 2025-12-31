import { CandleType, DeepPartial, KLineData, LineType, OverlayCreate, OverlayMode, OverlayStyle, Point, Styles, YAxisType } from 'klinecharts';

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
	getHistoryKLineData(symbol: SymbolInfo, period: Period, from: number, to: number): Promise<KLineData[]>;
	subscribe(symbol: SymbolInfo, period: Period, callback: DatafeedSubscribeCallback): void;
	unsubscribe(symbol: SymbolInfo, period: Period): void;
}
export interface ChartSettings {
	candleType?: CandleType;
	candleBarStyle?: LineType;
	showLastPrice?: boolean;
	showHighestPrice?: boolean;
	showLowestPrice?: boolean;
	showIndicatorLastValue?: boolean;
	priceAxisType?: YAxisType;
	reverseCoordinate?: boolean;
	showGrids?: boolean;
	crosshair?: {
		show?: boolean;
		horizontal?: boolean;
		vertical?: boolean;
	};
	watermark?: {
		show?: boolean;
		text?: string;
	};
	timestamp?: number;
}
/** Complete indicator information returned in events */
export interface IndicatorInfo {
	/** Indicator name (e.g., 'MACD', 'RSI', 'MA') */
	name: string;
	/** Short display name */
	shortName: string;
	/** Pane ID where indicator is displayed */
	paneId: string;
	/** Whether it's a main (overlay) or sub (separate pane) indicator */
	type: "main" | "sub";
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
	action: "add" | "remove";
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
export interface OverlayInfo {
	id: string;
	name?: string;
	type: string;
	points: Partial<Point>[];
	extendData?: any;
	styles?: DeepPartial<OverlayStyle> | null | undefined;
	visible?: boolean;
	lock?: boolean;
	mode?: OverlayMode;
}
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
	overrideIndicator(config: {
		name: string;
		calcParams?: number[];
		visible?: boolean;
	}, paneId: string): void;
	createOverlay(overlay: OverlayCreate): string | null;
	removeOverlay(options: {
		groupId?: string;
		id?: string;
	}): void;
	removeAllOverlay(): void;
	getAllOverlay(): OverlayInfo[];
	getOverlay(id: string): OverlayInfo | null;
	overrideOverlay(options: {
		[key: string]: any;
	}): void;
	dispose?(): void;
	resize?(): void;
	getSettings(): ChartSettings;
	setSettings(settings: Partial<ChartSettings>): void;
	resetSettings(): void;
	saveDrawings?(ticker: string): void;
	loadDrawings?(ticker: string): void;
	getDrawings?(ticker: string): OverlayInfo[];
	clearDrawings?(ticker: string): void;
	enableAutoSave?(ticker: string, enabled?: boolean): void;
}
export declare class DefaultDatafeed implements Datafeed {
	constructor(apiKey: string);
	private _apiKey;
	private _prevSymbolMarket?;
	private _ws?;
	searchSymbols(search?: string): Promise<SymbolInfo[]>;
	getHistoryKLineData(symbol: SymbolInfo, period: Period, from: number, to: number): Promise<KLineData[]>;
	subscribe(symbol: SymbolInfo, period: Period, callback: DatafeedSubscribeCallback): void;
	unsubscribe(symbol: SymbolInfo, period: Period): void;
}
export declare class KLineChartPro implements ChartPro {
	constructor(options: ChartProOptions);
	private _container;
	private _chartApi;
	createOverlay(overlay: OverlayCreate): string | null;
	removeOverlay(options: {
		groupId?: string;
		id?: string;
	}): void;
	removeAllOverlay(): void;
	getAllOverlay(): OverlayInfo[];
	getOverlay(id: string): OverlayInfo | null;
	overrideOverlay(options: {
		[key: string]: any;
	}): void;
	dispose(): void;
	resize(): void;
	getMainIndicators(): {};
	overrideIndicator(config: {
		name: string;
		calcParams?: number[];
		visible?: boolean;
	}, paneId: string): void;
	setMainIndicators(indicators: string[]): void;
	getSubIndicators(): {};
	setSubIndicators(indicators: string[]): void;
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
	getSettings(): ChartSettings;
	setSettings(settings: Partial<ChartSettings>): void;
	resetSettings(): void;
	saveDrawings(ticker: string): void;
	loadDrawings(ticker: string): void;
	getDrawings(ticker: string): OverlayInfo[];
	clearDrawings(ticker: string): void;
	enableAutoSave(ticker: string, enabled?: boolean): void;
}
declare function load(key: string, ls: any): void;

export {
	load as loadLocales,
};

export as namespace klinechartspro;

export {};
