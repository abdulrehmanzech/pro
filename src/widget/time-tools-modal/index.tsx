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

import { Component, createSignal } from "solid-js";

import { Modal } from "../../component";

export type TimeToolsTab = "goToDate" | "timeRange" | "timeAnchor";

export interface TimeAnchorSettings {
  enabled: boolean;
  timestamp: number;
  anchorPoint: "date" | "current";
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

const pad = (value: number) => String(value).padStart(2, "0");

const toInputDateTime = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const fromInputDateTime = (value: string, fallback: number) => {
  const timestamp = new Date(value).getTime();
  return Number.isFinite(timestamp) ? timestamp : fallback;
};

const tabs: Array<{ key: TimeToolsTab; label: string }> = [
  { key: "goToDate", label: "Go to Date" },
  { key: "timeRange", label: "Time Range" },
  { key: "timeAnchor", label: "Time Anchor" },
];

const TimeToolsModal: Component<TimeToolsModalProps> = (props) => {
  const [activeTab, setActiveTab] = createSignal<TimeToolsTab>(
    props.initialTab ?? "goToDate",
  );
  const [goToDate, setGoToDate] = createSignal(
    toInputDateTime(props.initialTimestamp),
  );
  const [rangeFrom, setRangeFrom] = createSignal(
    toInputDateTime(props.initialRange.from),
  );
  const [rangeTo, setRangeTo] = createSignal(toInputDateTime(props.initialRange.to));
  const [anchorSettings, setAnchorSettings] = createSignal<TimeAnchorSettings>({
    ...props.anchorSettings,
  });

  const updateAnchor = (partial: Partial<TimeAnchorSettings>) => {
    setAnchorSettings((current) => ({ ...current, ...partial }));
  };

  const confirm = () => {
    const tab = activeTab();
    if (tab === "goToDate") {
      props.onGoToDate(fromInputDateTime(goToDate(), props.initialTimestamp));
    } else if (tab === "timeRange") {
      const from = fromInputDateTime(rangeFrom(), props.initialRange.from);
      const to = fromInputDateTime(rangeTo(), props.initialRange.to);
      props.onTimeRange(from <= to ? { from, to } : { from: to, to: from });
    } else {
      const settings = anchorSettings();
      props.onTimeAnchorChange({
        ...settings,
        timestamp:
          settings.anchorPoint === "current"
            ? Date.now()
            : fromInputDateTime(goToDate(), settings.timestamp),
      });
    }
    props.onClose();
  };

  return (
    <Modal
      width={650}
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
      minButtonWidth={100}
    >
      <div class="klinecharts-pro-time-tools-content">
        {activeTab() === "goToDate" && (
          <div class="klinecharts-pro-time-tools-panel">
            <label class="klinecharts-pro-time-tools-field">
              <span>Date and time</span>
              <input
                type="datetime-local"
                value={goToDate()}
                onInput={(event) => setGoToDate(event.currentTarget.value)}
              />
            </label>
          </div>
        )}

        {activeTab() === "timeRange" && (
          <div class="klinecharts-pro-time-tools-panel">
            <div class="klinecharts-pro-time-tools-range">
              <label class="klinecharts-pro-time-tools-field">
                <span>Start</span>
                <input
                  type="datetime-local"
                  value={rangeFrom()}
                  onInput={(event) => setRangeFrom(event.currentTarget.value)}
                />
              </label>
              <span class="klinecharts-pro-time-tools-arrow">{"->"}</span>
              <label class="klinecharts-pro-time-tools-field">
                <span>End</span>
                <input
                  type="datetime-local"
                  value={rangeTo()}
                  onInput={(event) => setRangeTo(event.currentTarget.value)}
                />
              </label>
            </div>
          </div>
        )}

        {activeTab() === "timeAnchor" && (
          <div class="klinecharts-pro-time-tools-panel">
            <div class="klinecharts-pro-time-tools-row">
              <div>
                <strong>Time Anchor</strong>
                <span>Anchor to a chart time when switching intervals</span>
              </div>
              <button
                type="button"
                class={`klinecharts-pro-time-tools-switch${
                  anchorSettings().enabled ? " on" : ""
                }`}
                onClick={() => updateAnchor({ enabled: !anchorSettings().enabled })}
              >
                <span />
              </button>
            </div>
            <div class="klinecharts-pro-time-tools-row">
              <div>
                <strong>Anchor Point</strong>
                <span>Use a fixed date or the current chart time</span>
              </div>
              <select
                value={anchorSettings().anchorPoint}
                onChange={(event) =>
                  updateAnchor({
                    anchorPoint: event.currentTarget.value as "date" | "current",
                  })
                }
              >
                <option value="date">Date</option>
                <option value="current">Current</option>
              </select>
            </div>
            {anchorSettings().anchorPoint === "date" && (
              <label class="klinecharts-pro-time-tools-field">
                <span>Anchor date</span>
                <input
                  type="datetime-local"
                  value={goToDate()}
                  onInput={(event) => setGoToDate(event.currentTarget.value)}
                />
              </label>
            )}
            <div class="klinecharts-pro-time-tools-row">
              <div>
                <strong>Anchor line</strong>
                <span>Mark the anchored time on the chart with a vertical line</span>
              </div>
              <button
                type="button"
                class={`klinecharts-pro-time-tools-switch${
                  anchorSettings().anchorLine ? " on" : ""
                }`}
                onClick={() =>
                  updateAnchor({ anchorLine: !anchorSettings().anchorLine })
                }
              >
                <span />
              </button>
            </div>
            <div class="klinecharts-pro-time-tools-row">
              <div>
                <strong>Across Tokens</strong>
                <span>Retain onscreen chart range when switching symbols</span>
              </div>
              <button
                type="button"
                class={`klinecharts-pro-time-tools-switch${
                  anchorSettings().acrossTokens ? " on" : ""
                }`}
                onClick={() =>
                  updateAnchor({ acrossTokens: !anchorSettings().acrossTokens })
                }
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
