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

import { Component, createMemo, createSignal } from "solid-js";

import { Modal } from "../../component";

export type TimeToolsTab = "goToDate" | "timeRange" | "timeAnchor";

export interface TimeAnchorSettings {
  enabled: boolean;
  timestamp: number;
  anchorPoint: "date" | "left" | "center" | "right";
  anchorLine: boolean;
  acrossTokens: boolean;
}

export interface TimeRangeValue {
  from: number;
  to: number;
}

export interface TimeToolsModalProps {
  initialTab?: TimeToolsTab;
  initialTimestamp: number;
  initialRange: TimeRangeValue;
  anchorSettings: TimeAnchorSettings;
  onClose: () => void;
  onGoToDate: (timestamp: number) => void;
  onTimeRange: (range: TimeRangeValue) => void;
  onTimeAnchorChange: (settings: TimeAnchorSettings) => void;
}

interface DateParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

const tabs: Array<{ key: TimeToolsTab; label: string }> = [
  { key: "goToDate", label: "Go to Date" },
  { key: "timeRange", label: "Time Range" },
  { key: "timeAnchor", label: "Time Anchor" },
];

const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const pad = (value: number) => String(value).padStart(2, "0");

const clampDay = (year: number, month: number, day: number) =>
  Math.min(day, new Date(year, month + 1, 0).getDate());

const toDateParts = (timestamp: number): DateParts => {
  const date = new Date(timestamp);
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
  };
};

const toTimestamp = (parts: DateParts) =>
  new Date(parts.year, parts.month, parts.day, parts.hour, parts.minute, 0, 0).getTime();

const toDateKey = (parts: Pick<DateParts, "year" | "month" | "day">) =>
  parts.year * 10000 + (parts.month + 1) * 100 + parts.day;

const formatDisplayValue = (parts: DateParts) => {
  const period = parts.hour >= 12 ? "PM" : "AM";
  const hour12 = parts.hour % 12 || 12;
  return `${pad(parts.month + 1)}/${pad(parts.day)}/${parts.year} ${pad(hour12)}:${pad(parts.minute)} ${period}`;
};

const buildCalendarDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDaysInMonth = new Date(year, month, 0).getDate();
  const days: Array<{ date: Date; current: boolean }> = [];
  for (let index = firstDay - 1; index >= 0; index -= 1) {
    days.push({
      date: new Date(year, month - 1, prevDaysInMonth - index),
      current: false,
    });
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push({ date: new Date(year, month, day), current: true });
  }
  while (days.length < 42) {
    const last = days[days.length - 1].date;
    days.push({
      date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1),
      current: false,
    });
  }
  return days;
};

const DateTimePicker: Component<{
  label: string;
  value: DateParts;
  onChange: (value: DateParts) => void;
  showInput?: boolean;
  onDateSelect?: () => void;
  range?: {
    from: DateParts;
    to: DateParts;
  };
}> = (props) => {
  const [open, setOpen] = createSignal(true);
  const [pickerMode, setPickerMode] = createSignal<"date" | "month" | "year">("date");
  const [viewYear, setViewYear] = createSignal(props.value.year);
  const [viewMonth, setViewMonth] = createSignal(props.value.month);
  const calendarDays = createMemo(() => buildCalendarDays(viewYear(), viewMonth()));
  const decadeStart = createMemo(() => Math.floor(viewYear() / 10) * 10);
  const decadeYears = createMemo(() =>
    Array.from({ length: 12 }, (_, index) => decadeStart() - 1 + index),
  );
  const hour12 = createMemo(() => props.value.hour % 12 || 12);
  const period = createMemo(() => (props.value.hour >= 12 ? "PM" : "AM"));
  const hourOptions = Array.from({ length: 12 }, (_, index) => index + 1);
  const minuteOptions = Array.from({ length: 60 }, (_, index) => index);

  const changeMonth = (offset: number) => {
    const next = new Date(viewYear(), viewMonth() + offset, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  };

  const openParentMode = () => {
    if (pickerMode() === "date") {
      setPickerMode("month");
    } else if (pickerMode() === "month") {
      setPickerMode("year");
    }
  };

  const selectDay = (date: Date) => {
    props.onChange({
      ...props.value,
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
    });
    props.onDateSelect?.();
    setViewYear(date.getFullYear());
    setViewMonth(date.getMonth());
  };

  const selectMonth = (month: number) => {
    setViewMonth(month);
    props.onChange({
      ...props.value,
      year: viewYear(),
      month,
      day: clampDay(viewYear(), month, props.value.day),
    });
    setPickerMode("date");
  };

  const selectYear = (year: number) => {
    setViewYear(year);
    props.onChange({
      ...props.value,
      year,
      day: clampDay(year, props.value.month, props.value.day),
    });
    setPickerMode("month");
  };

  const updateHour = (hour: number) => {
    const isPm = period() === "PM";
    props.onChange({
      ...props.value,
      hour: isPm ? (hour === 12 ? 12 : hour + 12) : hour === 12 ? 0 : hour,
    });
  };

  const updatePeriod = (nextPeriod: "AM" | "PM") => {
    const currentHour = hour12();
    props.onChange({
      ...props.value,
      hour:
        nextPeriod === "PM"
          ? currentHour === 12
            ? 12
            : currentHour + 12
          : currentHour === 12
            ? 0
            : currentHour,
    });
  };

  return (
    <div class="klinecharts-pro-time-tools-picker">
      {props.showInput !== false && (
        <label class="klinecharts-pro-time-tools-field">
          {props.label && <span>{props.label}</span>}
          <button
            type="button"
            class="klinecharts-pro-time-tools-input"
            onClick={() => setOpen(!open())}
          >
            <span>{formatDisplayValue(props.value)}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="4" y="5" width="16" height="15" rx="2" />
              <path d="M8 3v4M16 3v4M4 10h16" />
            </svg>
          </button>
        </label>
      )}

      {open() && (
        <div class="klinecharts-pro-time-tools-calendar">
          <div class="klinecharts-pro-time-tools-month">
            <button
              type="button"
              onClick={() => {
                if (pickerMode() === "year") {
                  setViewYear(viewYear() - 10);
                } else if (pickerMode() === "month") {
                  setViewYear(viewYear() - 1);
                } else {
                  changeMonth(-12);
                }
              }}
            >
              {"<<"}
            </button>
            <button
              type="button"
              onClick={() => {
                if (pickerMode() === "year") {
                  setViewYear(viewYear() - 10);
                } else if (pickerMode() === "month") {
                  setViewYear(viewYear() - 1);
                } else {
                  changeMonth(-1);
                }
              }}
            >
              {"<"}
            </button>
            <button
              type="button"
              class="calendar-title"
              onClick={openParentMode}
            >
              {pickerMode() === "year"
                ? `${decadeStart()}-${decadeStart() + 9}`
                : pickerMode() === "month"
                  ? viewYear()
                  : `${monthNames[viewMonth()]} ${viewYear()}`}
            </button>
            <button
              type="button"
              onClick={() => {
                if (pickerMode() === "year") {
                  setViewYear(viewYear() + 10);
                } else if (pickerMode() === "month") {
                  setViewYear(viewYear() + 1);
                } else {
                  changeMonth(1);
                }
              }}
            >
              {">"}
            </button>
            <button
              type="button"
              onClick={() => {
                if (pickerMode() === "year") {
                  setViewYear(viewYear() + 10);
                } else if (pickerMode() === "month") {
                  setViewYear(viewYear() + 1);
                } else {
                  changeMonth(12);
                }
              }}
            >
              {">>"}
            </button>
          </div>
          {pickerMode() === "date" && (
            <div class="klinecharts-pro-time-tools-grid">
              {weekdays.map((weekday) => <span class="weekday">{weekday}</span>)}
              {calendarDays().map(({ date, current }) => {
                const dateStart = toDateKey({
                  year: date.getFullYear(),
                  month: date.getMonth(),
                  day: date.getDate(),
                });
                const rangeFrom = props.range ? toDateKey(props.range.from) : NaN;
                const rangeTo = props.range ? toDateKey(props.range.to) : NaN;
                const rangeStart = Math.min(rangeFrom, rangeTo);
                const rangeEnd = Math.max(rangeFrom, rangeTo);
                const inRange =
                  Number.isFinite(rangeStart) &&
                  dateStart >= rangeStart &&
                  dateStart <= rangeEnd;
                const isRangeEdge =
                  Number.isFinite(rangeStart) &&
                  (dateStart === rangeStart || dateStart === rangeEnd);
                const selected =
                  date.getFullYear() === props.value.year &&
                  date.getMonth() === props.value.month &&
                  date.getDate() === props.value.day;
                return (
                  <button
                    type="button"
                    class={`${current ? "" : "muted"} ${inRange ? "in-range" : ""} ${
                      isRangeEdge || selected ? "selected" : ""
                    }`}
                    onClick={() => selectDay(date)}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          )}
          {pickerMode() === "month" && (
            <div class="klinecharts-pro-time-tools-month-grid">
              {monthNames.map((month, index) => (
                <button
                  type="button"
                  class={index === props.value.month && viewYear() === props.value.year ? "selected" : ""}
                  onClick={() => selectMonth(index)}
                >
                  {month}
                </button>
              ))}
            </div>
          )}
          {pickerMode() === "year" && (
            <div class="klinecharts-pro-time-tools-month-grid year-grid">
              {decadeYears().map((year) => (
                <button
                  type="button"
                  class={`${year < decadeStart() || year > decadeStart() + 9 ? "muted" : ""} ${year === props.value.year ? "selected" : ""}`}
                  onClick={() => selectYear(year)}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
          {pickerMode() === "date" && (
            <div class="klinecharts-pro-time-tools-spinners">
              <div class="spinner-column scrollable">
                {hourOptions.map((hour) => (
                  <button
                    type="button"
                    class={hour === hour12() ? "selected" : ""}
                    onClick={() => updateHour(hour)}
                  >
                    {pad(hour)}
                  </button>
                ))}
              </div>
              <div class="spinner-column scrollable">
                {minuteOptions.map((minute) => (
                  <button
                    type="button"
                    class={minute === props.value.minute ? "selected" : ""}
                    onClick={() => props.onChange({ ...props.value, minute })}
                  >
                    {pad(minute)}
                  </button>
                ))}
              </div>
              <div class="spinner-column">
                {(["AM", "PM"] as const).map((item) => (
                  <button
                    type="button"
                    class={item === period() ? "selected" : ""}
                    onClick={() => updatePeriod(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const TimeToolsModal: Component<TimeToolsModalProps> = (props) => {
  const [activeTab, setActiveTab] = createSignal<TimeToolsTab>(
    props.initialTab ?? "goToDate",
  );
  const [goToDate, setGoToDate] = createSignal(toDateParts(props.initialTimestamp));
  const [rangeFrom, setRangeFrom] = createSignal(toDateParts(props.initialRange.from));
  const [rangeTo, setRangeTo] = createSignal(toDateParts(props.initialRange.to));
  const [activeRangeSide, setActiveRangeSide] = createSignal<"from" | "to">("from");
  const [anchorSettings, setAnchorSettings] = createSignal<TimeAnchorSettings>({
    ...props.anchorSettings,
  });

  const updateAnchor = (partial: Partial<TimeAnchorSettings>) => {
    setAnchorSettings((current) => ({ ...current, ...partial }));
  };

  const confirm = () => {
    const tab = activeTab();
    if (tab === "goToDate") {
      props.onGoToDate(toTimestamp(goToDate()));
    } else if (tab === "timeRange") {
      const from = toTimestamp(rangeFrom());
      const to = toTimestamp(rangeTo());
      props.onTimeRange(from <= to ? { from, to } : { from: to, to: from });
    } else {
      const settings = anchorSettings();
      props.onTimeAnchorChange({
        ...settings,
        timestamp: settings.anchorPoint === "date" ? toTimestamp(goToDate()) : settings.timestamp,
      });
    }
    props.onClose();
  };

  return (
    <Modal
      width={620}
      title={
        <div class="klinecharts-pro-time-tools-tabs">
          {tabs.map((tab) => (
            <button
              type="button"
              class={activeTab() === tab.key ? "active" : ""}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      }
      buttons={[
        { children: "Close", type: "cancel", onClick: props.onClose },
        { children: "Confirm", onClick: confirm },
      ]}
      onClose={props.onClose}
      minButtonWidth={112}
    >
      <div class="klinecharts-pro-time-tools-content">
        {activeTab() === "goToDate" && (
          <DateTimePicker label="" value={goToDate()} onChange={setGoToDate} />
        )}

        {activeTab() === "timeRange" && (
          <div class="klinecharts-pro-time-tools-range-panel">
            <div class="klinecharts-pro-time-tools-range-header">
              <button
                type="button"
                class={activeRangeSide() === "from" ? "active" : ""}
                onClick={() => setActiveRangeSide("from")}
              >
                {formatDisplayValue(rangeFrom())}
              </button>
              <span class="klinecharts-pro-time-tools-range-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </span>
              <button
                type="button"
                class={activeRangeSide() === "to" ? "active" : ""}
                onClick={() => setActiveRangeSide("to")}
              >
                {formatDisplayValue(rangeTo())}
              </button>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="4" y="5" width="16" height="15" rx="2" />
                <path d="M8 3v4M16 3v4M4 10h16" />
              </svg>
            </div>
            {activeRangeSide() === "from" ? (
              <DateTimePicker
                label="Start"
                value={rangeFrom()}
                onChange={setRangeFrom}
                onDateSelect={() => setActiveRangeSide("to")}
                showInput={false}
                range={{ from: rangeFrom(), to: rangeTo() }}
              />
            ) : (
              <DateTimePicker
                label="End"
                value={rangeTo()}
                onChange={setRangeTo}
                showInput={false}
                range={{ from: rangeFrom(), to: rangeTo() }}
              />
            )}
          </div>
        )}

        {activeTab() === "timeAnchor" && (
          <div class="klinecharts-pro-time-tools-panel">
            <div class="klinecharts-pro-time-tools-row">
              <div>
                <strong>Time Anchor</strong>
                <span>Anchor to a time on the chart when switching between intervals</span>
              </div>
              <button
                type="button"
                class={`klinecharts-pro-time-tools-switch${anchorSettings().enabled ? " on" : ""}`}
                onClick={() => updateAnchor({ enabled: !anchorSettings().enabled })}
              >
                <span />
              </button>
            </div>
            <div class={`klinecharts-pro-time-tools-row${anchorSettings().enabled ? "" : " disabled"}`}>
              <div>
                <strong>Anchor Point</strong>
              </div>
              <select
                value={anchorSettings().anchorPoint}
                disabled={!anchorSettings().enabled}
                onChange={(event) =>
                  updateAnchor({
                    anchorPoint: event.currentTarget.value as TimeAnchorSettings["anchorPoint"],
                  })
                }
              >
                <option value="date">Date</option>
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
            {anchorSettings().enabled && anchorSettings().anchorPoint === "date" && (
              <div class="klinecharts-pro-time-tools-anchor-date">
                <DateTimePicker label="Anchor date" value={goToDate()} onChange={setGoToDate} />
              </div>
            )}
            <div class="klinecharts-pro-time-tools-row with-divider">
              <div>
                <strong>Anchor line</strong>
                <span>Mark the anchored time on the chart with a vertical line</span>
              </div>
              <button
                type="button"
                class={`klinecharts-pro-time-tools-switch${anchorSettings().anchorLine ? " on" : ""}`}
                onClick={() => updateAnchor({ anchorLine: !anchorSettings().anchorLine })}
              >
                <span />
              </button>
            </div>
            <div class="klinecharts-pro-time-tools-row with-divider">
              <div>
                <strong>Across Tokens</strong>
                <span>Retain onscreen chart range when switching symbols</span>
              </div>
              <button
                type="button"
                class={`klinecharts-pro-time-tools-switch${anchorSettings().acrossTokens ? " on" : ""}`}
                onClick={() => updateAnchor({ acrossTokens: !anchorSettings().acrossTokens })}
              >
                <span />
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TimeToolsModal;
