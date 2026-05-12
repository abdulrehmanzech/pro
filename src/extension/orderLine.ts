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


import { OverlayTemplate } from "klinecharts";

const orderLine: OverlayTemplate = {
  name: "orderLine",
  totalStep: 2,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: false,
  needDefaultYAxisFigure: false,
  createPointFigures: ({ overlay, coordinates, bounding, precision }) => {
    if (coordinates.length === 0) {
      return [];
    }

    const y = coordinates[0].y;
    const extendData = overlay.extendData || {};
    const side = extendData.side === "sell" ? "sell" : extendData.side === "buy" ? "buy" : "neutral";
    const isSell = extendData.side === "sell";
    const color = isSell ? "#ff667a" : "#27d69b";
    const accentColor = isSell ? "#3a1f28" : "#173a32";
    const lineColor = isSell ? "rgba(255, 102, 122, 0.9)" : "rgba(39, 214, 155, 0.9)";
    const quantityColor = isSell ? "#ffb8c1" : "#7fe7c2";
    const backgroundColor =
      side === "buy"
        ? "rgba(22, 163, 74, 0.18)"
        : side === "sell"
          ? "rgba(239, 68, 68, 0.18)"
          : "rgba(14, 165, 233, 0.18)";

    const price = typeof overlay.points[0]?.value === "number"
      ? overlay.points[0].value
      : typeof extendData.price === "number"
        ? extendData.price
        : 0;
    const priceText = price.toFixed(precision.price);
    const label = String(extendData.label ?? "Limit");
    const quantity = extendData.quantity == null ? "" : String(extendData.quantity);
    const handleWidth = 24;
    const labelWidth = 112;
    const qtyWidth = quantity ? 56 : 0;
    const closeWidth = 22;
    const widgetHeight = 22;
    const left = 12;
    const lineStartX = left + handleWidth + labelWidth + qtyWidth + closeWidth + 8;
    const bubbleWidth = 156;
    const bubbleHeight = 30;
    const bubbleX = left;
    const bubbleY = y - 64;

    return [
      {
        type: "line",
        attrs: {
          coordinates: [
            { x: lineStartX, y },
            { x: bounding.width, y },
          ],
        },
        styles: {
          color: lineColor,
          size: 1.5,
          style: "solid",
        },
      },
      {
        type: "rect",
        attrs: {
          x: left,
          y: y - widgetHeight / 2,
          width: handleWidth,
          height: widgetHeight,
        },
        styles: {
          style: "stroke_fill",
          borderColor: color,
          borderSize: 1,
          borderRadius: 4,
          backgroundColor: accentColor,
        },
      },
      {
        type: "text",
        attrs: {
          x: left + handleWidth / 2,
          y,
          text: "|||",
          align: "center",
          baseline: "middle",
        },
        styles: {
          color,
          size: 10,
          weight: 700,
        },
        ignoreEvent: true,
      },
      {
        type: "rect",
        attrs: {
          x: left + handleWidth,
          y: y - widgetHeight / 2,
          width: labelWidth,
          height: widgetHeight,
        },
        styles: {
          style: "stroke_fill",
          borderColor: color,
          borderSize: 1,
          borderRadius: 4,
          backgroundColor: accentColor,
        },
      },
      {
        type: "text",
        attrs: {
          x: left + handleWidth + 8,
          y,
          text: `${label} ${priceText}`,
          align: "left",
          baseline: "middle",
        },
        styles: {
          color,
          size: 11,
          weight: 600,
        },
        ignoreEvent: true,
      },
      ...(quantity
        ? [
            {
              type: "rect" as const,
              attrs: {
                x: left + handleWidth + labelWidth,
                y: y - widgetHeight / 2,
                width: qtyWidth,
                height: widgetHeight,
              },
              styles: {
                style: "stroke_fill" as const,
                borderColor: color,
                borderSize: 1,
                borderRadius: 4,
                backgroundColor: accentColor,
              },
            },
            {
              type: "text" as const,
              attrs: {
                x: left + handleWidth + labelWidth + qtyWidth / 2,
                y,
                text: quantity,
                align: "center" as const,
                baseline: "middle" as const,
              },
              styles: {
                color: quantityColor,
                size: 10,
                weight: 600,
              },
              ignoreEvent: true,
            },
          ]
        : []),
      {
        type: "rect",
        attrs: {
          x: left + handleWidth + labelWidth + qtyWidth,
          y: y - widgetHeight / 2,
          width: closeWidth,
          height: widgetHeight,
        },
        styles: {
          style: "stroke_fill",
          borderColor: color,
          borderSize: 1,
          borderRadius: 4,
          backgroundColor: accentColor,
        },
      },
      {
        type: "text",
        attrs: {
          x: left + handleWidth + labelWidth + qtyWidth + closeWidth / 2,
          y,
          text: "x",
          align: "center",
          baseline: "middle",
        },
        styles: {
          color,
          size: 10,
          weight: 700,
        },
        ignoreEvent: true,
      },
      ...(extendData.showDragHint !== false
        ? [
            {
              type: "rect" as const,
              attrs: {
                x: bubbleX,
                y: bubbleY,
                width: bubbleWidth,
                height: bubbleHeight,
              },
              styles: {
                style: "stroke_fill" as const,
                borderColor: "#d8dee9",
                borderSize: 1,
                borderRadius: 10,
                backgroundColor: "#f3f4f6",
              },
            },
            {
              type: "text" as const,
              attrs: {
                x: bubbleX + 12,
                y: bubbleY + bubbleHeight / 2,
                text: "Drag to modify the price",
                align: "left" as const,
                baseline: "middle" as const,
              },
              styles: {
                color: "#111827",
                size: 12,
                weight: 500,
              },
              ignoreEvent: true,
            },
          ]
        : []),
    ];
  },
  performEventPressedMove: ({ points, performPoint }) => {
    if (typeof performPoint.value !== "number") {
      return;
    }

    points[0] = {
      ...points[0],
      value: performPoint.value,
    };
  },
  performEventMoveForDrawing: ({ currentStep, points, performPoint }) => {
    if (currentStep !== 2) {
      return;
    }

    points[0] = {
      ...points[0],
      value: performPoint.value,
    };
  },
};

export default orderLine
