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
  createEffect,
  createMemo,
  createSignal,
  Component,
  JSX,
  onCleanup,
} from "solid-js";
import { Portal } from "solid-js/web";

export interface SelectDataSourceItem {
  key: string;
  text: JSX.Element;
}

export interface SelectProps {
  class?: string;
  dropdownClass?: string;
  style?: JSX.CSSProperties | string;
  value?: JSX.Element;
  valueKey?: string;
  dataSource?: SelectDataSourceItem[] | string[];
  onSelected?: (data: SelectDataSourceItem | string) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
}

const Select: Component<SelectProps> = (props) => {
  const [open, setOpen] = createSignal(false);
  const [searchQuery, setSearchQuery] = createSignal("");
  const [dropdownStyle, setDropdownStyle] = createSignal<JSX.CSSProperties>({});
  let inputRef: HTMLInputElement | undefined;
  let containerRef: HTMLDivElement | undefined;
  let dropdownRef: HTMLDivElement | undefined;

  const updateDropdownPosition = () => {
    if (!containerRef) return;

    const rect = containerRef.getBoundingClientRect();
    const gap = 4;
    const viewportPadding = 12;
    const preferredWidth = props.dropdownClass?.includes("klinecharts-pro-timezone-dropdown")
      ? Math.max(rect.width, Math.min(280, window.innerWidth - viewportPadding * 2))
      : rect.width;
    const left = Math.min(
      Math.max(rect.left, viewportPadding),
      window.innerWidth - preferredWidth - viewportPadding
    );
    const maxHeight = Math.min(260, Math.max(140, window.innerHeight - 32));
    const spaceBelow = window.innerHeight - rect.bottom - gap;
    const spaceAbove = rect.top - gap;
    const shouldOpenUp = spaceBelow < 180 && spaceAbove > spaceBelow;
    const availableHeight = Math.max(
      140,
      Math.min(maxHeight, shouldOpenUp ? spaceAbove - gap : spaceBelow - gap)
    );

    setDropdownStyle({
      position: "fixed",
      left: `${left}px`,
      top: shouldOpenUp ? "auto" : `${rect.bottom + gap}px`,
      bottom: shouldOpenUp ? `${window.innerHeight - rect.top + gap}px` : "auto",
      width: `${preferredWidth}px`,
      "max-height": `${availableHeight}px`,
      "transform-origin": shouldOpenUp ? "bottom" : "top",
      opacity: 1,
      transform: "scaleY(1)",
      "z-index": 10000,
    });
  };

  const filteredDataSource = createMemo(() => {
    if (!props.dataSource || !props.searchable) return props.dataSource;

    const query = searchQuery().toLowerCase().trim();
    if (!query) return props.dataSource;

    const isStringArray = typeof props.dataSource[0] === "string";

    if (isStringArray) {
      return (props.dataSource as string[]).filter((item: string) =>
        item.toLowerCase().includes(query)
      );
    } else {
      return (props.dataSource as SelectDataSourceItem[]).filter(
        (item: SelectDataSourceItem) => {
          const text = item.text?.toString().toLowerCase() || "";
          const key = item.key?.toLowerCase() || "";
          return text.includes(query) || key.includes(query);
        }
      );
    }
  });

  const handleToggle = () => {
    const willBeOpen = !open();
    setOpen(willBeOpen);
    setSearchQuery("");
    if (willBeOpen && props.searchable) {
      setTimeout(() => inputRef?.focus(), 50);
    }
  };

  const handleBlur = (e: FocusEvent) => {
    // Check if the new focus target is inside the dropdown
    const relatedTarget = e.relatedTarget as Node;
    if (
      relatedTarget &&
      ((containerRef && containerRef.contains(relatedTarget)) ||
        (dropdownRef && dropdownRef.contains(relatedTarget)))
    ) {
      return;
    }
    setTimeout(() => {
      if (
        document.activeElement &&
        ((containerRef && containerRef.contains(document.activeElement)) ||
          (dropdownRef && dropdownRef.contains(document.activeElement)))
      ) {
        return;
      }
      setOpen(false);
      setSearchQuery("");
    }, 0);
  };

  createEffect(() => {
    if (!open()) return;

    updateDropdownPosition();

    const handleDocumentMouseDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        (containerRef && containerRef.contains(target)) ||
        (dropdownRef && dropdownRef.contains(target))
      ) {
        return;
      }
      setOpen(false);
      setSearchQuery("");
    };

    const handleReposition = () => updateDropdownPosition();

    document.addEventListener("mousedown", handleDocumentMouseDown);
    window.addEventListener("resize", handleReposition);
    window.addEventListener("scroll", handleReposition, true);

    onCleanup(() => {
      document.removeEventListener("mousedown", handleDocumentMouseDown);
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    });
  });

  const renderDropdown = () => (
    <div
      ref={dropdownRef}
      class={`drop-down-container klinecharts-pro-select-dropdown-portal ${
        props.dropdownClass ?? ""
      }`}
      style={dropdownStyle()}
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {props.searchable && (
        <div style={{ padding: "8px", "border-bottom": "1px solid #333" }}>
          <input
            ref={inputRef}
            type="text"
            placeholder={props.searchPlaceholder || "Search..."}
            value={searchQuery()}
            onInput={(e) => setSearchQuery(e.currentTarget.value)}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              padding: "6px 10px",
              border: "1px solid var(--klinecharts-pro-border-color)",
              "border-radius": "4px",
              "background-color": "var(--klinecharts-pro-popover-background-color)",
              color: "#fff",
              "font-size": "13px",
              outline: "none",
            }}
          />
        </div>
      )}
      <ul>
        {filteredDataSource()?.map((data) => {
          const d = data as SelectDataSourceItem;
          // @ts-expect-error
          const v = d[props.valueKey ?? "text"] ?? data;
          return (
            <li
              classList={{ selected: props.value === v }}
              onClick={(e) => {
                e.stopPropagation();
                if (props.value !== v) {
                  props.onSelected?.(data);
                }
                setOpen(false);
                setSearchQuery("");
              }}
            >
              {v}
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div
      ref={containerRef}
      style={props.style}
      class={`klinecharts-pro-select ${props.class ?? ""} ${
        open() ? "klinecharts-pro-select-show" : ""
      }`}
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
        if ((e.target as HTMLElement).closest(".drop-down-container")) {
          return;
        }
        handleToggle();
      }}
      onBlur={handleBlur}
    >
      <div class="selector-container">
        <span class="value">{props.value}</span>
        <i class="arrow" />
      </div>
      {props.dataSource && props.dataSource.length > 0 && open() && (
        <Portal>{renderDropdown()}</Portal>
      )}
    </div>
  );
};

export default Select;
