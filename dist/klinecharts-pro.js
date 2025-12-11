var N9 = Object.defineProperty;
var P9 = (e, t, n) => t in e ? N9(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Q1 = (e, t, n) => (P9(e, typeof t != "symbol" ? t + "" : t, n), n);
import { utils as K, OverlayMode as ne, dispose as re, init as O9, FormatDateType as J1, DomPosition as ae, ActionType as B9, TooltipIconPosition as W1, CandleType as E9, YAxisType as F9, registerOverlay as K9 } from "klinecharts";
function U1(e, t, n) {
  const r = (e.x - t.x) * Math.cos(n) - (e.y - t.y) * Math.sin(n) + t.x, a = (e.x - t.x) * Math.sin(n) + (e.y - t.y) * Math.cos(n) + t.y;
  return { x: r, y: a };
}
function A0(e, t) {
  if (e.length > 1) {
    let n;
    return e[0].x === e[1].x && e[0].y !== e[1].y ? e[0].y < e[1].y ? n = {
      x: e[0].x,
      y: t.height
    } : n = {
      x: e[0].x,
      y: 0
    } : e[0].x > e[1].x ? n = {
      x: 0,
      y: K.getLinearYFromCoordinates(e[0], e[1], { x: 0, y: e[0].y })
    } : n = {
      x: t.width,
      y: K.getLinearYFromCoordinates(e[0], e[1], { x: t.width, y: e[0].y })
    }, { coordinates: [e[0], n] };
  }
  return [];
}
function Re(e, t) {
  const n = Math.abs(e.x - t.x), r = Math.abs(e.y - t.y);
  return Math.sqrt(n * n + r * r);
}
const j9 = {
  name: "arrow",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = e[1].x > e[0].x ? 0 : 1, n = K.getLinearSlopeIntercept(e[0], e[1]);
      let r;
      n ? r = Math.atan(n[0]) + Math.PI * t : e[1].y > e[0].y ? r = Math.PI / 2 : r = Math.PI / 2 * 3;
      const a = U1({ x: e[1].x - 8, y: e[1].y + 4 }, e[1], r), i = U1({ x: e[1].x - 8, y: e[1].y - 4 }, e[1], r);
      return [
        {
          type: "line",
          attrs: { coordinates: e }
        },
        {
          type: "line",
          ignoreEvent: !0,
          attrs: { coordinates: [a, e[1], i] }
        }
      ];
    }
    return [];
  }
}, Z9 = {
  name: "circle",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  styles: {
    circle: {
      color: "rgba(22, 119, 255, 0.15)"
    }
  },
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = Re(e[0], e[1]);
      return {
        type: "circle",
        attrs: {
          ...e[0],
          r: t
        },
        styles: { style: "stroke_fill" }
      };
    }
    return [];
  }
}, Q9 = {
  name: "rect",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  styles: {
    polygon: {
      color: "rgba(22, 119, 255, 0.15)"
    }
  },
  createPointFigures: ({ coordinates: e }) => e.length > 1 ? [
    {
      type: "polygon",
      attrs: {
        coordinates: [
          e[0],
          { x: e[1].x, y: e[0].y },
          e[1],
          { x: e[0].x, y: e[1].y }
        ]
      },
      styles: { style: "stroke_fill" }
    }
  ] : []
}, z9 = {
  name: "parallelogram",
  totalStep: 4,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  styles: {
    polygon: {
      color: "rgba(22, 119, 255, 0.15)"
    }
  },
  createPointFigures: ({ coordinates: e }) => {
    if (e.length === 2)
      return [
        {
          type: "line",
          ignoreEvent: !0,
          attrs: { coordinates: e }
        }
      ];
    if (e.length === 3) {
      const t = { x: e[0].x + (e[2].x - e[1].x), y: e[2].y };
      return [
        {
          type: "polygon",
          attrs: { coordinates: [e[0], e[1], e[2], t] },
          styles: { style: "stroke_fill" }
        }
      ];
    }
    return [];
  },
  performEventPressedMove: ({ points: e, performPointIndex: t, performPoint: n }) => {
    t < 2 && (e[0].price = n.price, e[1].price = n.price);
  },
  performEventMoveForDrawing: ({ currentStep: e, points: t, performPoint: n }) => {
    e === 2 && (t[0].price = n.price);
  }
}, U9 = {
  name: "triangle",
  totalStep: 4,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  styles: {
    polygon: {
      color: "rgba(22, 119, 255, 0.15)"
    }
  },
  createPointFigures: ({ coordinates: e }) => [
    {
      type: "polygon",
      attrs: { coordinates: e },
      styles: { style: "stroke_fill" }
    }
  ]
}, R9 = {
  name: "fibonacciCircle",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = Math.abs(e[0].x - e[1].x), n = Math.abs(e[0].y - e[1].y), r = Math.sqrt(t * t + n * n), a = [0.236, 0.382, 0.5, 0.618, 0.786, 1], i = [], c = [];
      return a.forEach((s) => {
        const f = r * s;
        i.push(
          { ...e[0], r: f }
        ), c.push({
          x: e[0].x,
          y: e[0].y + f + 6,
          text: `${(s * 100).toFixed(1)}%`
        });
      }), [
        {
          type: "circle",
          attrs: i,
          styles: { style: "stroke" }
        },
        {
          type: "text",
          ignoreEvent: !0,
          attrs: c
        }
      ];
    }
    return [];
  }
}, Y9 = {
  name: "fibonacciSegment",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: n }) => {
    const r = [], a = [];
    if (e.length > 1) {
      const i = e[1].x > e[0].x ? e[0].x : e[1].x, c = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0], s = e[0].y - e[1].y, f = t.points, h = f[0].value - f[1].value;
      c.forEach((C) => {
        const m = e[1].y + s * C, b = (f[1].value + h * C).toFixed(n.price);
        r.push({ coordinates: [{ x: e[0].x, y: m }, { x: e[1].x, y: m }] }), a.push({
          x: i,
          y: m,
          text: `${b} (${(C * 100).toFixed(1)}%)`,
          baseline: "bottom"
        });
      });
    }
    return [
      {
        type: "line",
        attrs: r
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: a
      }
    ];
  }
}, H9 = {
  name: "fibonacciSpiral",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, bounding: t }) => {
    if (e.length > 1) {
      const n = Re(e[0], e[1]) / Math.sqrt(24), r = e[1].x > e[0].x ? 0 : 1, a = K.getLinearSlopeIntercept(e[0], e[1]);
      let i;
      a ? i = Math.atan(a[0]) + Math.PI * r : e[1].y > e[0].y ? i = Math.PI / 2 : i = Math.PI / 2 * 3;
      const c = U1(
        { x: e[0].x - n, y: e[0].y },
        e[0],
        i
      ), s = U1(
        { x: e[0].x - n, y: e[0].y - n },
        e[0],
        i
      ), f = [{
        ...c,
        r: n,
        startAngle: i,
        endAngle: i + Math.PI / 2
      }, {
        ...s,
        r: n * 2,
        startAngle: i + Math.PI / 2,
        endAngle: i + Math.PI
      }];
      let h = e[0].x - n, C = e[0].y - n;
      for (let m = 2; m < 9; m++) {
        const b = f[m - 2].r + f[m - 1].r;
        let k = 0;
        switch (m % 4) {
          case 0: {
            k = i, h -= f[m - 2].r;
            break;
          }
          case 1: {
            k = i + Math.PI / 2, C -= f[m - 2].r;
            break;
          }
          case 2: {
            k = i + Math.PI, h += f[m - 2].r;
            break;
          }
          case 3: {
            k = i + Math.PI / 2 * 3, C += f[m - 2].r;
            break;
          }
        }
        const N = k + Math.PI / 2, j = U1({ x: h, y: C }, e[0], i);
        f.push({
          ...j,
          r: b,
          startAngle: k,
          endAngle: N
        });
      }
      return [
        {
          type: "arc",
          attrs: f
        },
        {
          type: "line",
          attrs: A0(e, t)
        }
      ];
    }
    return [];
  }
}, V9 = {
  name: "fibonacciSpeedResistanceFan",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, bounding: t }) => {
    const n = [];
    let r = [];
    const a = [];
    if (e.length > 1) {
      const i = e[1].x > e[0].x ? -38 : 4, c = e[1].y > e[0].y ? -2 : 20, s = e[1].x - e[0].x, f = e[1].y - e[0].y;
      [1, 0.75, 0.618, 0.5, 0.382, 0.25, 0].forEach((C) => {
        const m = e[1].x - s * C, b = e[1].y - f * C;
        n.push({ coordinates: [{ x: m, y: e[0].y }, { x: m, y: e[1].y }] }), n.push({ coordinates: [{ x: e[0].x, y: b }, { x: e[1].x, y: b }] }), r = r.concat(A0([e[0], { x: m, y: e[1].y }], t)), r = r.concat(A0([e[0], { x: e[1].x, y: b }], t)), a.unshift({
          x: e[0].x + i,
          y: b + 10,
          text: `${C.toFixed(3)}`
        }), a.unshift({
          x: m - 18,
          y: e[0].y + c,
          text: `${C.toFixed(3)}`
        });
      });
    }
    return [
      {
        type: "line",
        attrs: n
      },
      {
        type: "line",
        attrs: r
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: a
      }
    ];
  }
}, G9 = {
  name: "fibonacciExtension",
  totalStep: 4,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: n }) => {
    const r = [], a = [];
    if (e.length > 2) {
      const i = t.points, c = i[1].value - i[0].value, s = e[1].y - e[0].y, f = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1], h = e[2].x > e[1].x ? e[1].x : e[2].x;
      f.forEach((C) => {
        const m = e[2].y + s * C, b = (i[2].value + c * C).toFixed(n.price);
        r.push({ coordinates: [{ x: e[1].x, y: m }, { x: e[2].x, y: m }] }), a.push({
          x: h,
          y: m,
          text: `${b} (${(C * 100).toFixed(1)}%)`,
          baseline: "bottom"
        });
      });
    }
    return [
      {
        type: "line",
        attrs: { coordinates: e },
        styles: { style: "dashed" }
      },
      {
        type: "line",
        attrs: r
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: a
      }
    ];
  }
}, X9 = {
  name: "gannBox",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  styles: {
    polygon: {
      color: "rgba(22, 119, 255, 0.15)"
    }
  },
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = (e[1].y - e[0].y) / 4, n = e[1].x - e[0].x, r = [
        { coordinates: [e[0], { x: e[1].x, y: e[1].y - t }] },
        { coordinates: [e[0], { x: e[1].x, y: e[1].y - t * 2 }] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[1].x, y: e[0].y + t }] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[1].x, y: e[0].y + t * 2 }] },
        { coordinates: [{ ...e[0] }, { x: e[0].x + n * 0.236, y: e[1].y }] },
        { coordinates: [{ ...e[0] }, { x: e[0].x + n * 0.5, y: e[1].y }] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[0].x + n * 0.236, y: e[0].y }] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[0].x + n * 0.5, y: e[0].y }] }
      ], a = [
        { coordinates: [e[0], e[1]] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[1].x, y: e[0].y }] }
      ];
      return [
        {
          type: "line",
          attrs: [
            { coordinates: [e[0], { x: e[1].x, y: e[0].y }] },
            { coordinates: [{ x: e[1].x, y: e[0].y }, e[1]] },
            { coordinates: [e[1], { x: e[0].x, y: e[1].y }] },
            { coordinates: [{ x: e[0].x, y: e[1].y }, e[0]] }
          ]
        },
        {
          type: "polygon",
          ignoreEvent: !0,
          attrs: {
            coordinates: [
              e[0],
              { x: e[1].x, y: e[0].y },
              e[1],
              { x: e[0].x, y: e[1].y }
            ]
          },
          styles: { style: "fill" }
        },
        {
          type: "line",
          attrs: r,
          styles: { style: "dashed" }
        },
        {
          type: "line",
          attrs: a
        }
      ];
    }
    return [];
  }
}, J9 = {
  name: "threeWaves",
  totalStep: 5,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    const t = e.map((n, r) => ({
      ...n,
      text: `(${r})`,
      baseline: "bottom"
    }));
    return [
      {
        type: "line",
        attrs: { coordinates: e }
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: t
      }
    ];
  }
}, W9 = {
  name: "fiveWaves",
  totalStep: 7,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    const t = e.map((n, r) => ({
      ...n,
      text: `(${r})`,
      baseline: "bottom"
    }));
    return [
      {
        type: "line",
        attrs: { coordinates: e }
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: t
      }
    ];
  }
}, q9 = {
  name: "eightWaves",
  totalStep: 10,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    const t = e.map((n, r) => ({
      ...n,
      text: `(${r})`,
      baseline: "bottom"
    }));
    return [
      {
        type: "line",
        attrs: { coordinates: e }
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: t
      }
    ];
  }
}, e5 = {
  name: "anyWaves",
  totalStep: Number.MAX_SAFE_INTEGER,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    const t = e.map((n, r) => ({
      ...n,
      text: `(${r})`,
      baseline: "bottom"
    }));
    return [
      {
        type: "line",
        attrs: { coordinates: e }
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: t
      }
    ];
  }
}, t5 = {
  name: "abcd",
  totalStep: 5,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    let t = [], n = [];
    const r = ["A", "B", "C", "D"], a = e.map((i, c) => ({
      ...i,
      baseline: "bottom",
      text: `(${r[c]})`
    }));
    return e.length > 2 && (t = [e[0], e[2]], e.length > 3 && (n = [e[1], e[3]])), [
      {
        type: "line",
        attrs: { coordinates: e }
      },
      {
        type: "line",
        attrs: [{ coordinates: t }, { coordinates: n }],
        styles: { style: "dashed" }
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: a
      }
    ];
  }
}, n5 = {
  name: "xabcd",
  totalStep: 6,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  styles: {
    polygon: {
      color: "rgba(22, 119, 255, 0.15)"
    }
  },
  createPointFigures: ({ coordinates: e, overlay: t }) => {
    const n = [], r = [], a = ["X", "A", "B", "C", "D"], i = e.map((c, s) => ({
      ...c,
      baseline: "bottom",
      text: `(${a[s]})`
    }));
    return e.length > 2 && (n.push({ coordinates: [e[0], e[2]] }), r.push({ coordinates: [e[0], e[1], e[2]] }), e.length > 3 && (n.push({ coordinates: [e[1], e[3]] }), e.length > 4 && (n.push({ coordinates: [e[2], e[4]] }), r.push({ coordinates: [e[2], e[3], e[4]] })))), [
      {
        type: "line",
        attrs: { coordinates: e }
      },
      {
        type: "line",
        attrs: n,
        styles: { style: "dashed" }
      },
      {
        type: "polygon",
        ignoreEvent: !0,
        attrs: r
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: i
      }
    ];
  }
}, r5 = [
  j9,
  Z9,
  Q9,
  U9,
  z9,
  R9,
  Y9,
  H9,
  V9,
  G9,
  X9,
  J9,
  W9,
  q9,
  e5,
  t5,
  n5
];
class Ou {
  constructor(t) {
    Q1(this, "_apiKey");
    Q1(this, "_prevSymbolMarket");
    Q1(this, "_ws");
    this._apiKey = t;
  }
  async searchSymbols(t) {
    return await ((await (await fetch(`https://api.polygon.io/v3/reference/tickers?apiKey=${this._apiKey}&active=true&search=${t ?? ""}`)).json()).results || []).map((a) => ({
      ticker: a.ticker,
      name: a.name,
      shortName: a.ticker,
      market: a.market,
      exchange: a.primary_exchange,
      priceCurrency: a.currency_name,
      type: a.type,
      logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAA66SURBVHic7Z17cFTVGcB/527AiKGgRA0ShGhKoQjFMb4qUMCMPIrWqdbHSEdlHDGgI9V2aq2d1hmKtVbRsSTGEcQRp4pStaZQlNYUwYLiSKU0SCMBDRCmoQSJGGF3T/84d2VZk+w9d899hf3NMBnl3ns+5vtyHt/5HoIehpQIaijDYjiSciRlwCCgBCgG+gNFQCGCAvUScaADaAfagFagBdiFoAlBI0m2UkWTEMgA/lmeIYIWIFdkLQNJMBbBJUjOA8agFOwF7cAmBO8hWUeMtWIWezwayxciZwByGb1pZTyCaUguA0YGLNIWBK8jWUExa8Q1HA5YHi0iYQByGTH2UYnkBmA6cHLQMnXBfqAOwXMMYLW4hkTQAmUj1AYgqzkLuAXBTUgGBi2PFoI9SJYAT4nZbA9anK4IpQHIhUzE4i4k04OWxQiCOpI8IubwZtCiZBIqA5A1TEdyH3Bh0LJ4xAYE80QVdUELkiIUBiCf4FIk85FcELQsviB4B8G94jb+GrwoASKfZBgJHkUyNUg5AkOwkhhzxa1sC06EAJALKUJwL3A30DsIGULEYeBhJPPFHNr9Htx3A5A1TECyGCjze+yQ04Rgpqii3s9BfTMAWUsfksxD8iO/xowkggVY3Cdmccif4XxAPskw4rwCjPBjvB5AAwVc6cfewPJ6AFnNzcTZSF75OowgzkZZzc1eD+SZAUiJkNX8FlgM9PVqnB5MX2CxrOa3Uno3U3vyYVlLPxIshR7iyQueOmLMELM4YPrDxg1A1jKQJKuQjDL97eMawWYsJpu+fjZqAPL3DMFiNVBu8rt5vqSRJJXidnaa+qAxA5CPU0aMvwFDTX0zT6fsIMEkcQdNJj5mxADs3/x68sr3ix0kmWBiJsjZAOyQrDXkp32/aSTG+Fz3BDkZgKylH0neym/4AkJtDMflcjpw7QeQEkGCpXnlB4hkFAmW5uIncO8IquFB8uf8MDDd1oUrXFmO7aJc7HbQPJ4wU8zmad2XtA3AvtjZSN69GzYOUkCF7gWSlgHIWvqQyF/shJgGYlToXCXr7QGSzCOv/DAzwtaRYxzPAHYkT+jCmvN0gmCi08giRwZgx/B9QD6MKyo0IRntJMbQ2RKgAjjzyo8OZbbOspJ1BrB3/ZvJR+9GjcMUMCrbqSD7DJDgUfLKjyK9bd11S7czgHyCS0my2pxMIaHvUCgshl5FUFQKQtWJ4FALHGmHz5rhizY43BaomEawqOwuA6mg25cl840L5DexQiithNMvhNMvglMr4IT+zt5t3QS762H332FXfTQNQumwy1zLLmcAO1HzNU+E8oNTK+AbN8KwGc4V3h3JODS9Av98GPauz/17fiK4vKuE1K4NoJr1RDFLd+BY+PYCOK3CuzH2rof3fg07Q5Pkm40NYjYXdfYXnRqAXMhEBH/zVibDFBbDRQ/AiFv8G3PbUlhTpfYNYUcyqbP6BJ2fAizu8lwgkwwcC9c3+Kt8UMvLtZuhZKy/47qhC51+ZQawy7J85LlApjhjAkx7Te3ogyIZhz9PhebQH5jOzixX09kM4POvUQ6cdTVc/kawygewCmDKy2omCjdf0e0xM4BdjeuTSBRk6jtUTb9BKz+djlZ4eRy0bQ1aks4R7GEAg9Orlx07A6hSbOFXPsCkp8OlfFAb0UnaQTn+IRnIPirT/1dBxgM3+CqQW0beptZ+NyTj0LIW9m6A//0L2puP/l1RKXytHAZ9RzmNYoX63z/9IrU53LbUnXxeo3S8KvWfXy4BdgXOFsJbhFFhFcAPP4E+JXrvJeOw+TH44NFjld4VfUrg3Htg5Cx9QzjUAn8YEVbP4X6KKUlVND26BLQynrArH9TGT1f5h1pg+fnw9o+dKT/1zrq58MeL4UCj3nh9StQsFU5OtnUNpBuAYFog4ugy5Lt6z3/RBq9OVH59N7RuUu93tOq9N3KWu/H8IE3XRw1AFV4OP2dO0Xt+4/2578o/a1YePx36DoXiMbmN6xVpurbAzu8Lvup2dgqL1R+nHGmHLU+YGfujl/RnkUGV2Z8JhpG2zu0ZIEHoPRgA9NPMP21eDYkOc+M3LNJ7/rTzzI1tGlvnygAElwQqjFPc7MZNouvq1TVYP7F1rgxAddrIkw3dvYTOcuU3ts4L7B47Id2tZHBwh97zXvwGNr4AfU539uyhvebHN8cYKREiUrd/sUK49XPnzyfj8FyZ87P/8cfZFhbDg5bCMYkOdSRzilUAFz/knTxRx2K4hYxYaZcdmmFY5ddBxa88ESXySMotu69edNi+XP+d838Jlz4bvtvDoJGUWaimitFhz1p3a/qwGXBdg/qZJ8UgC9VRMzokOuDdX7h7t6hUzQTX2fGDbq57exYlQlbzb6KY83/1uyr2PxeOtKtY/w+fUQkgybgJyaJEg5DV7IaIRAGlc8o58P1/mFvXj7SrOP+df4aP/6J/+xdN9ghZzadEtd7PmVNg6mvquGeSZFzNCB8th8bnwxrYYYKDQlZzGOgVtCSuGXELjK8xbwQpEh3KCLbURi8lLDtHhKwhiYcNCXzhzClw2YveH/N218O796ufPQGB7BkGANB/OEx9Wf30mubV8NYd4Q3/dopAWkh6xta3bSssO1clbZqMAeiM0kq45n3lYfRq6fEDSTzam8Cu6FcOYx/XDx9zw+56eON687EH/nDQAv+7VXrOgUaVq/fyOHXO9/J8f8YE+N6b4Q7+6Jr26DqCdOhXDufcrgpGmCgW0RmHWuCVcfoh5MHSIGQ1a4BxQUviC7FCtSycdRUMmW7eGNq2wkvnR6NegOItIatZBvwgaEl8xypQ03f5tcooTio1892ddbDicjPf8p4XC4BdQUsRCMm4Os6lAj1PrYCzr1bLhG7mUTpDpsM3boIPl5iQ0mt2WQgz3aciz383wvp74NnBsOoH7jOJAC5ZAL092muYRNBkIYjUrsVzknHY/hK8eK77490J/WH0XPOymUbQaJEk4u4sD2l8Hl4YBZ+syv5sJqPmhN9JlGSrRRVN9ERfgCk6WmHlldCyTu+9wmL3NQz8oZ0qmiwhkEAOC95xQKIDVl2tf7wbPNkbecywSQikmqME7yFDnB/Yq0jVBXDK5y0qqMMkh1rgg8fgvJ87fyes2cGgdE6qRIxkHXBnkPJ0i27tnb3rzRsAKLeyjgGE2T2sdG7nBsZYG6gw2dD15Zty6mTy3416z+fiT/AaW+cWgN1/dkugAnXHZ816629RqXeJmTqZSeGNOt6S6jmcXiLm9cDEcYLuJcsQj5qanhji32qnpOk6vUTMikCEcYru9DvMg4p3/cr1zvY6s4WfpOn6qAEUswbYH4Q8jtB1xpRWmp8Fvq6ZVfTpDrPjm2G/rWsgzQDsunHhLYD/8V9UxS8dxj1ubiN2UimMuVvvnX2hdK/UpWoEQmapWMFzvovjlCPt+jV6+g5V0Tp9h+Y2dp8SuMJFUeqPXbiQvSZDx8cawABWI9TuMJS8/xv9jJ3+w1VR6dFz3fnmB09RGUi60cZftIWvfLwqFn2MUMcYgLiGBJIlvgqlQ0crvP0T/fd6Fakr2hv3qJ+Dp3R/TDzlHPjmbXDVuzB9pbsZpGGR99HJukiWpFcKh6g2jJhWp18xtDMOtSglpa58+5QcbSeXC+3N6hYxfCllX2kY0XnPoBpeQ+LRQdoAJ5Wq7OCwetpWXB6+hlKCOlHFV2LVOu8ZlOQRzwXKhc+aVf3eMMbiNywKn/KhS51Gu21c/+Fqlx+WmWD7cnjjujDWGeiybVzXvYMF8zwTxxRtW1Usfi7xe6b48JmwKr9bXXbfO7iGDUguMC+RYawCuGAefOtu/8OwjrSrjOF//s7fcZ0ieEdUdT2Td9893GEP+sBJxlVE7/Mj1J29XzS9qnb7YVU+ZNVh1rRwWcMKJFPNSeQDp5yjHD/l15qvGZDoUEbWsCh8jp5MBCtFVfeNQLIbwJMMI85moLcxwfwilQo2eLJq5uQ2ROuLNnUbuX05/CcyJWMOU8AocSvbunvIUWEIWc184GdGxAqSXkWqzWvxGCgcoJw+J2Y4flI3eAd3qq5i+zZFLeEzxQNidvYl3JkBLKQIwQcQsaqixy9NSEaLOdnD/bvfBNqIObQjmJm7XHl8QTDTifLBoQEAiCrqESxwL1UeXxAsEFXUO33csQHYT98HNGiKlMc/GmwdOUa7Oph9KthIT6srFH0OUkBFtl1/JnozAGAPEN4kkuOXO3WVDy4MAEDM5mkg34ojPDxk60Qb1wUi7WZTf4IQxw0cH9RRxRV2kq82rmYAACGQxJiBYLPbb+TJEcFmYsxwq3zIwQAAxCwOYDEZ8lVGAqARi8liFgdy+UhOBgB2XmGSSmBHrt/K45gdJKlM5fflQs4GACBuZycJJpE3Aj/YQYJJ4nZ2mviYEQMAEHfQRJIJ5JcDL2kkyQRxh7nKbsbLxMtaBpJkFZJRpr99XCPYbK/5RhN3jM0AKcQs9mAxjjDnGUaPOizGmVY+eDADpLD9BA8CLlJ58qTxEFX8NJejXnd43ilEVnMz8Bj5uwNdDgJ3uvXwOcWXVjH2BdIr9PSy9OZooIAr3fj2dTG+B+gMcSvbiFGRjydwgGABMf1bPffD+YysYQKSxeTDyzJpQjBTJ5jDBL7MAOmIKuqRjAYegKOVKo5jDgMPIBntt/IhgBkgHfkkw0jwaOTyDkwhWEmMuX5N952LEALkE1yKZH4k0tBMIHgHwb3iNv4avCghQtYwHcl9hD0r2T0bEMwTVeFxkoXKAFLIhUzE4q5QF6nQQVBHkkfEHN4MWpRMQmkAKexyNbcguAkZsRb3gj12vaWnMsuyhIlQG0AKuYwY+6hEcgMqBO3koGXqgv1AHYLnGMDqzIJMYSQSBpCOXEZvWhmPYBqSy4CRAYu0BcHrSFZQzJr0IoxRIHIGkImsZSAJxiK4BMl5wBjAqz7y7cAmu8HGOmKs9eKGzk8ibwCZ2LeQZVgMR1KOpAwYBJQAxUB/lIEUIr5smBEHOlAKbgNagRZgF4ImBI0k2UoVTV7dygXF/wF+fTz59Jc5ygAAAABJRU5ErkJggg=="
    }));
  }
  async getHistoryKLineData(t, n, r, a) {
    return await ((await (await fetch(`https://api.polygon.io/v2/aggs/ticker/${t.ticker}/range/${n.multiplier}/${n.timespan}/${r}/${a}?apiKey=${this._apiKey}`)).json()).results || []).map((s) => ({
      timestamp: s.t,
      open: s.o,
      high: s.h,
      low: s.l,
      close: s.c,
      volume: s.v,
      turnover: s.vw
    }));
  }
  subscribe(t, n, r) {
    var a, i;
    this._prevSymbolMarket !== t.market ? ((a = this._ws) == null || a.close(), this._ws = new WebSocket(`wss://delayed.polygon.io/${t.market}`), this._ws.onopen = () => {
      var c;
      (c = this._ws) == null || c.send(JSON.stringify({ action: "auth", params: this._apiKey }));
    }, this._ws.onmessage = (c) => {
      var f;
      const s = JSON.parse(c.data);
      s[0].ev === "status" ? s[0].status === "auth_success" && ((f = this._ws) == null || f.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` }))) : "sym" in s && r({
        timestamp: s.s,
        open: s.o,
        high: s.h,
        low: s.l,
        close: s.c,
        volume: s.v,
        turnover: s.vw
      });
    }) : (i = this._ws) == null || i.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` })), this._prevSymbolMarket = t.market;
  }
  unsubscribe(t, n) {
  }
}
const t1 = {};
function a5(e) {
  t1.context = e;
}
const i5 = (e, t) => e === t, w0 = Symbol("solid-proxy"), s5 = Symbol("solid-track"), a0 = {
  equals: i5
};
let Ye = Je;
const h1 = 1, i0 = 2, He = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, $0 = {};
var V = null;
let L1 = null, E = null, q = null, d1 = null, O0 = 0;
function n0(e, t) {
  const n = E, r = V, a = e.length === 0, i = a ? He : {
    owned: null,
    cleanups: null,
    context: null,
    owner: t === void 0 ? r : t
  }, c = a ? e : () => e(() => C1(() => h0(i)));
  V = i, E = null;
  try {
    return y1(c, !0);
  } finally {
    E = n, V = r;
  }
}
function A(e, t) {
  t = t ? Object.assign({}, a0, t) : a0;
  const n = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, r = (a) => (typeof a == "function" && (a = a(n.value)), Xe(n, a));
  return [Ge.bind(n), r];
}
function ie(e, t, n) {
  const r = C0(e, t, !0, h1);
  w1(r);
}
function H(e, t, n) {
  const r = C0(e, t, !1, h1);
  w1(r);
}
function f1(e, t, n) {
  Ye = d5;
  const r = C0(e, t, !1, h1);
  r.user = !0, d1 ? d1.push(r) : w1(r);
}
function U(e, t, n) {
  n = n ? Object.assign({}, a0, n) : a0;
  const r = C0(e, t, !0, 0);
  return r.observers = null, r.observerSlots = null, r.comparator = n.equals || void 0, w1(r), Ge.bind(r);
}
function o5(e, t, n) {
  let r, a, i;
  arguments.length === 2 && typeof t == "object" || arguments.length === 1 ? (r = !0, a = e, i = t || {}) : (r = e, a = t, i = n || {});
  let c = null, s = $0, f = null, h = !1, C = "initialValue" in i, m = typeof r == "function" && U(r);
  const b = /* @__PURE__ */ new Set(), [k, N] = (i.storage || A)(i.initialValue), [j, Q] = A(void 0), [D, Y] = A(void 0, {
    equals: !1
  }), [P, S] = A(C ? "ready" : "unresolved");
  if (t1.context) {
    f = `${t1.context.id}${t1.context.count++}`;
    let I;
    i.ssrLoadFrom === "initial" ? s = i.initialValue : t1.load && (I = t1.load(f)) && (s = I[0]);
  }
  function w(I, F, z, u1) {
    return c === I && (c = null, C = !0, (I === s || F === s) && i.onHydrated && queueMicrotask(() => i.onHydrated(u1, {
      value: F
    })), s = $0, Z(F, z)), F;
  }
  function Z(I, F) {
    y1(() => {
      F === void 0 && N(() => I), S(F !== void 0 ? "errored" : "ready"), Q(F);
      for (const z of b.keys())
        z.decrement();
      b.clear();
    }, !1);
  }
  function n1() {
    const I = l5, F = k(), z = j();
    if (z !== void 0 && !c)
      throw z;
    return E && !E.user && I && ie(() => {
      D(), c && (I.resolved || b.has(I) || (I.increment(), b.add(I)));
    }), F;
  }
  function l1(I = !0) {
    if (I !== !1 && h)
      return;
    h = !1;
    const F = m ? m() : r;
    if (F == null || F === !1) {
      w(c, C1(k));
      return;
    }
    const z = s !== $0 ? s : C1(() => a(F, {
      value: k(),
      refetching: I
    }));
    return typeof z != "object" || !(z && "then" in z) ? (w(c, z, void 0, F), z) : (c = z, h = !0, queueMicrotask(() => h = !1), y1(() => {
      S(C ? "refreshing" : "pending"), Y();
    }, !1), z.then((u1) => w(z, u1, void 0, F), (u1) => w(z, void 0, qe(u1), F)));
  }
  return Object.defineProperties(n1, {
    state: {
      get: () => P()
    },
    error: {
      get: () => j()
    },
    loading: {
      get() {
        const I = P();
        return I === "pending" || I === "refreshing";
      }
    },
    latest: {
      get() {
        if (!C)
          return n1();
        const I = j();
        if (I && !c)
          throw I;
        return k();
      }
    }
  }), m ? ie(() => l1(!1)) : l1(!1), [n1, {
    refetch: l1,
    mutate: N
  }];
}
function C1(e) {
  if (E === null)
    return e();
  const t = E;
  E = null;
  try {
    return e();
  } finally {
    E = t;
  }
}
function Ve(e) {
  f1(() => C1(e));
}
function B0(e) {
  return V === null || (V.cleanups === null ? V.cleanups = [e] : V.cleanups.push(e)), e;
}
function c5(e) {
  const t = E, n = V;
  return Promise.resolve().then(() => {
    E = t, V = n;
    let r;
    return y1(e, !1), E = V = null, r ? r.done : void 0;
  });
}
let l5;
function Ge() {
  const e = L1;
  if (this.sources && (this.state || e))
    if (this.state === h1 || e)
      w1(this);
    else {
      const t = q;
      q = null, y1(() => o0(this), !1), q = t;
    }
  if (E) {
    const t = this.observers ? this.observers.length : 0;
    E.sources ? (E.sources.push(this), E.sourceSlots.push(t)) : (E.sources = [this], E.sourceSlots = [t]), this.observers ? (this.observers.push(E), this.observerSlots.push(E.sources.length - 1)) : (this.observers = [E], this.observerSlots = [E.sources.length - 1]);
  }
  return this.value;
}
function Xe(e, t, n) {
  let r = e.value;
  return (!e.comparator || !e.comparator(r, t)) && (e.value = t, e.observers && e.observers.length && y1(() => {
    for (let a = 0; a < e.observers.length; a += 1) {
      const i = e.observers[a], c = L1 && L1.running;
      c && L1.disposed.has(i), (c && !i.tState || !c && !i.state) && (i.pure ? q.push(i) : d1.push(i), i.observers && We(i)), c || (i.state = h1);
    }
    if (q.length > 1e6)
      throw q = [], new Error();
  }, !1)), t;
}
function w1(e) {
  if (!e.fn)
    return;
  h0(e);
  const t = V, n = E, r = O0;
  E = V = e, u5(e, e.value, r), E = n, V = t;
}
function u5(e, t, n) {
  let r;
  try {
    r = e.fn(t);
  } catch (a) {
    e.pure && (e.state = h1, e.owned && e.owned.forEach(h0), e.owned = null), e9(a);
  }
  (!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && "observers" in e ? Xe(e, r) : e.value = r, e.updatedAt = n);
}
function C0(e, t, n, r = h1, a) {
  const i = {
    fn: e,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: V,
    context: null,
    pure: n
  };
  return V === null || V !== He && (V.owned ? V.owned.push(i) : V.owned = [i]), i;
}
function s0(e) {
  const t = L1;
  if (e.state === 0 || t)
    return;
  if (e.state === i0 || t)
    return o0(e);
  if (e.suspense && C1(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const n = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < O0); )
    (e.state || t) && n.push(e);
  for (let r = n.length - 1; r >= 0; r--)
    if (e = n[r], e.state === h1 || t)
      w1(e);
    else if (e.state === i0 || t) {
      const a = q;
      q = null, y1(() => o0(e, n[0]), !1), q = a;
    }
}
function y1(e, t) {
  if (q)
    return e();
  let n = !1;
  t || (q = []), d1 ? n = !0 : d1 = [], O0++;
  try {
    const r = e();
    return f5(n), r;
  } catch (r) {
    n || (d1 = null), q = null, e9(r);
  }
}
function f5(e) {
  if (q && (Je(q), q = null), e)
    return;
  const t = d1;
  d1 = null, t.length && y1(() => Ye(t), !1);
}
function Je(e) {
  for (let t = 0; t < e.length; t++)
    s0(e[t]);
}
function d5(e) {
  let t, n = 0;
  for (t = 0; t < e.length; t++) {
    const r = e[t];
    r.user ? e[n++] = r : s0(r);
  }
  for (t1.context && a5(), t = 0; t < n; t++)
    s0(e[t]);
}
function o0(e, t) {
  const n = L1;
  e.state = 0;
  for (let r = 0; r < e.sources.length; r += 1) {
    const a = e.sources[r];
    a.sources && (a.state === h1 || n ? a !== t && s0(a) : (a.state === i0 || n) && o0(a, t));
  }
}
function We(e) {
  const t = L1;
  for (let n = 0; n < e.observers.length; n += 1) {
    const r = e.observers[n];
    (!r.state || t) && (r.state = i0, r.pure ? q.push(r) : d1.push(r), r.observers && We(r));
  }
}
function h0(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const n = e.sources.pop(), r = e.sourceSlots.pop(), a = n.observers;
      if (a && a.length) {
        const i = a.pop(), c = n.observerSlots.pop();
        r < a.length && (i.sourceSlots[c] = r, a[r] = i, n.observerSlots[r] = c);
      }
    }
  if (e.owned) {
    for (t = 0; t < e.owned.length; t++)
      h0(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = 0; t < e.cleanups.length; t++)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function qe(e) {
  return e instanceof Error || typeof e == "string" ? e : new Error("Unknown error");
}
function e9(e) {
  throw e = qe(e), e;
}
const C5 = Symbol("fallback");
function se(e) {
  for (let t = 0; t < e.length; t++)
    e[t]();
}
function h5(e, t, n = {}) {
  let r = [], a = [], i = [], c = 0, s = t.length > 1 ? [] : null;
  return B0(() => se(i)), () => {
    let f = e() || [], h, C;
    return f[s5], C1(() => {
      let b = f.length, k, N, j, Q, D, Y, P, S, w;
      if (b === 0)
        c !== 0 && (se(i), i = [], r = [], a = [], c = 0, s && (s = [])), n.fallback && (r = [C5], a[0] = n0((Z) => (i[0] = Z, n.fallback())), c = 1);
      else if (c === 0) {
        for (a = new Array(b), C = 0; C < b; C++)
          r[C] = f[C], a[C] = n0(m);
        c = b;
      } else {
        for (j = new Array(b), Q = new Array(b), s && (D = new Array(b)), Y = 0, P = Math.min(c, b); Y < P && r[Y] === f[Y]; Y++)
          ;
        for (P = c - 1, S = b - 1; P >= Y && S >= Y && r[P] === f[S]; P--, S--)
          j[S] = a[P], Q[S] = i[P], s && (D[S] = s[P]);
        for (k = /* @__PURE__ */ new Map(), N = new Array(S + 1), C = S; C >= Y; C--)
          w = f[C], h = k.get(w), N[C] = h === void 0 ? -1 : h, k.set(w, C);
        for (h = Y; h <= P; h++)
          w = r[h], C = k.get(w), C !== void 0 && C !== -1 ? (j[C] = a[h], Q[C] = i[h], s && (D[C] = s[h]), C = N[C], k.set(w, C)) : i[h]();
        for (C = Y; C < b; C++)
          C in j ? (a[C] = j[C], i[C] = Q[C], s && (s[C] = D[C], s[C](C))) : a[C] = n0(m);
        a = a.slice(0, c = b), r = f.slice(0);
      }
      return a;
    });
    function m(b) {
      if (i[C] = b, s) {
        const [k, N] = A(C);
        return s[C] = N, t(f[C], k);
      }
      return t(f[C]);
    }
  };
}
function L(e, t) {
  return C1(() => e(t || {}));
}
function q1() {
  return !0;
}
const g5 = {
  get(e, t, n) {
    return t === w0 ? n : e.get(t);
  },
  has(e, t) {
    return t === w0 ? !0 : e.has(t);
  },
  set: q1,
  deleteProperty: q1,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: q1,
      deleteProperty: q1
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function b0(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function t9(...e) {
  let t = !1;
  for (let r = 0; r < e.length; r++) {
    const a = e[r];
    t = t || !!a && w0 in a, e[r] = typeof a == "function" ? (t = !0, U(a)) : a;
  }
  if (t)
    return new Proxy({
      get(r) {
        for (let a = e.length - 1; a >= 0; a--) {
          const i = b0(e[a])[r];
          if (i !== void 0)
            return i;
        }
      },
      has(r) {
        for (let a = e.length - 1; a >= 0; a--)
          if (r in b0(e[a]))
            return !0;
        return !1;
      },
      keys() {
        const r = [];
        for (let a = 0; a < e.length; a++)
          r.push(...Object.keys(b0(e[a])));
        return [...new Set(r)];
      }
    }, g5);
  const n = {};
  for (let r = e.length - 1; r >= 0; r--)
    if (e[r]) {
      const a = Object.getOwnPropertyDescriptors(e[r]);
      for (const i in a)
        i in n || Object.defineProperty(n, i, {
          enumerable: !0,
          get() {
            for (let c = e.length - 1; c >= 0; c--) {
              const s = (e[c] || {})[i];
              if (s !== void 0)
                return s;
            }
          }
        });
    }
  return n;
}
function y5(e) {
  const t = "fallback" in e && {
    fallback: () => e.fallback
  };
  return U(h5(() => e.each, e.children, t || void 0));
}
function W(e) {
  let t = !1;
  const n = e.keyed, r = U(() => e.when, void 0, {
    equals: (a, i) => t ? a === i : !a == !i
  });
  return U(() => {
    const a = r();
    if (a) {
      const i = e.children, c = typeof i == "function" && i.length > 0;
      return t = n || c, c ? C1(() => i(a)) : i;
    }
    return e.fallback;
  }, void 0, void 0);
}
function p5(e, t, n) {
  let r = n.length, a = t.length, i = r, c = 0, s = 0, f = t[a - 1].nextSibling, h = null;
  for (; c < a || s < i; ) {
    if (t[c] === n[s]) {
      c++, s++;
      continue;
    }
    for (; t[a - 1] === n[i - 1]; )
      a--, i--;
    if (a === c) {
      const C = i < r ? s ? n[s - 1].nextSibling : n[i - s] : f;
      for (; s < i; )
        e.insertBefore(n[s++], C);
    } else if (i === s)
      for (; c < a; )
        (!h || !h.has(t[c])) && t[c].remove(), c++;
    else if (t[c] === n[i - 1] && n[s] === t[a - 1]) {
      const C = t[--a].nextSibling;
      e.insertBefore(n[s++], t[c++].nextSibling), e.insertBefore(n[--i], C), t[a] = n[i];
    } else {
      if (!h) {
        h = /* @__PURE__ */ new Map();
        let m = s;
        for (; m < i; )
          h.set(n[m], m++);
      }
      const C = h.get(t[c]);
      if (C != null)
        if (s < C && C < i) {
          let m = c, b = 1, k;
          for (; ++m < a && m < i && !((k = h.get(t[m])) == null || k !== C + b); )
            b++;
          if (b > C - s) {
            const N = t[c];
            for (; s < C; )
              e.insertBefore(n[s++], N);
          } else
            e.replaceChild(n[s++], t[c++]);
        } else
          c++;
      else
        t[c++].remove();
    }
  }
}
const oe = "_$DX_DELEGATE";
function m5(e, t, n, r = {}) {
  let a;
  return n0((i) => {
    a = i, t === document ? e() : $(t, e(), t.firstChild ? null : void 0, n);
  }, r.owner), () => {
    a(), t.textContent = "";
  };
}
function p(e, t, n) {
  const r = document.createElement("template");
  r.innerHTML = e;
  let a = r.content.firstChild;
  return n && (a = a.firstChild), a;
}
function o1(e, t = window.document) {
  const n = t[oe] || (t[oe] = /* @__PURE__ */ new Set());
  for (let r = 0, a = e.length; r < a; r++) {
    const i = e[r];
    n.has(i) || (n.add(i), t.addEventListener(i, v5));
  }
}
function r1(e, t, n) {
  n == null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function $1(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function g1(e, t, n, r) {
  if (r)
    Array.isArray(n) ? (e[`$$${t}`] = n[0], e[`$$${t}Data`] = n[1]) : e[`$$${t}`] = n;
  else if (Array.isArray(n)) {
    const a = n[0];
    e.addEventListener(t, n[0] = (i) => a.call(e, n[1], i));
  } else
    e.addEventListener(t, n);
}
function M1(e, t, n) {
  if (!t)
    return n ? r1(e, "style") : t;
  const r = e.style;
  if (typeof t == "string")
    return r.cssText = t;
  typeof n == "string" && (r.cssText = n = void 0), n || (n = {}), t || (t = {});
  let a, i;
  for (i in n)
    t[i] == null && r.removeProperty(i), delete n[i];
  for (i in t)
    a = t[i], a !== n[i] && (r.setProperty(i, a), n[i] = a);
  return n;
}
function E0(e, t, n) {
  return C1(() => e(t, n));
}
function $(e, t, n, r) {
  if (n !== void 0 && !r && (r = []), typeof t != "function")
    return c0(e, t, r, n);
  H((a) => c0(e, t(), a, n), r);
}
function v5(e) {
  const t = `$$${e.type}`;
  let n = e.composedPath && e.composedPath()[0] || e.target;
  for (e.target !== n && Object.defineProperty(e, "target", {
    configurable: !0,
    value: n
  }), Object.defineProperty(e, "currentTarget", {
    configurable: !0,
    get() {
      return n || document;
    }
  }), t1.registry && !t1.done && (t1.done = !0, document.querySelectorAll("[id^=pl-]").forEach((r) => {
    for (; r && r.nodeType !== 8 && r.nodeValue !== "pl-" + e; ) {
      let a = r.nextSibling;
      r.remove(), r = a;
    }
    r && r.remove();
  })); n; ) {
    const r = n[t];
    if (r && !n.disabled) {
      const a = n[`${t}Data`];
      if (a !== void 0 ? r.call(n, a, e) : r.call(n, e), e.cancelBubble)
        return;
    }
    n = n._$host || n.parentNode || n.host;
  }
}
function c0(e, t, n, r, a) {
  for (t1.context && !n && (n = [...e.childNodes]); typeof n == "function"; )
    n = n();
  if (t === n)
    return n;
  const i = typeof t, c = r !== void 0;
  if (e = c && n[0] && n[0].parentNode || e, i === "string" || i === "number") {
    if (t1.context)
      return n;
    if (i === "number" && (t = t.toString()), c) {
      let s = n[0];
      s && s.nodeType === 3 ? s.data = t : s = document.createTextNode(t), n = A1(e, n, r, s);
    } else
      n !== "" && typeof n == "string" ? n = e.firstChild.data = t : n = e.textContent = t;
  } else if (t == null || i === "boolean") {
    if (t1.context)
      return n;
    n = A1(e, n, r);
  } else {
    if (i === "function")
      return H(() => {
        let s = t();
        for (; typeof s == "function"; )
          s = s();
        n = c0(e, s, n, r);
      }), () => n;
    if (Array.isArray(t)) {
      const s = [], f = n && Array.isArray(n);
      if (M0(s, t, n, a))
        return H(() => n = c0(e, s, n, r, !0)), () => n;
      if (t1.context) {
        if (!s.length)
          return n;
        for (let h = 0; h < s.length; h++)
          if (s[h].parentNode)
            return n = s;
      }
      if (s.length === 0) {
        if (n = A1(e, n, r), c)
          return n;
      } else
        f ? n.length === 0 ? ce(e, s, r) : p5(e, n, s) : (n && A1(e), ce(e, s));
      n = s;
    } else if (t instanceof Node) {
      if (t1.context && t.parentNode)
        return n = c ? [t] : t;
      if (Array.isArray(n)) {
        if (c)
          return n = A1(e, n, r, t);
        A1(e, n, null, t);
      } else
        n == null || n === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      n = t;
    }
  }
  return n;
}
function M0(e, t, n, r) {
  let a = !1;
  for (let i = 0, c = t.length; i < c; i++) {
    let s = t[i], f = n && n[i];
    if (s instanceof Node)
      e.push(s);
    else if (!(s == null || s === !0 || s === !1))
      if (Array.isArray(s))
        a = M0(e, s, f) || a;
      else if (typeof s == "function")
        if (r) {
          for (; typeof s == "function"; )
            s = s();
          a = M0(e, Array.isArray(s) ? s : [s], Array.isArray(f) ? f : [f]) || a;
        } else
          e.push(s), a = !0;
      else {
        const h = String(s);
        f && f.nodeType === 3 && f.data === h ? e.push(f) : e.push(document.createTextNode(h));
      }
  }
  return a;
}
function ce(e, t, n = null) {
  for (let r = 0, a = t.length; r < a; r++)
    e.insertBefore(t[r], n);
}
function A1(e, t, n, r) {
  if (n === void 0)
    return e.textContent = "";
  const a = r || document.createTextNode("");
  if (t.length) {
    let i = !1;
    for (let c = t.length - 1; c >= 0; c--) {
      const s = t[c];
      if (a !== s) {
        const f = s.parentNode === e;
        !i && !c ? f ? e.replaceChild(a, s) : e.insertBefore(a, n) : f && s.remove();
      } else
        i = !0;
    }
  } else
    e.insertBefore(a, n);
  return [a];
}
var e0 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function n9(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var _5 = typeof e0 == "object" && e0 && e0.Object === Object && e0, r9 = _5, L5 = r9, $5 = typeof self == "object" && self && self.Object === Object && self, b5 = L5 || $5 || Function("return this")(), c1 = b5, x5 = c1, k5 = x5.Symbol, g0 = k5, le = g0, a9 = Object.prototype, A5 = a9.hasOwnProperty, w5 = a9.toString, z1 = le ? le.toStringTag : void 0;
function M5(e) {
  var t = A5.call(e, z1), n = e[z1];
  try {
    e[z1] = void 0;
    var r = !0;
  } catch {
  }
  var a = w5.call(e);
  return r && (t ? e[z1] = n : delete e[z1]), a;
}
var S5 = M5, I5 = Object.prototype, T5 = I5.toString;
function D5(e) {
  return T5.call(e);
}
var N5 = D5, ue = g0, P5 = S5, O5 = N5, B5 = "[object Null]", E5 = "[object Undefined]", fe = ue ? ue.toStringTag : void 0;
function F5(e) {
  return e == null ? e === void 0 ? E5 : B5 : fe && fe in Object(e) ? P5(e) : O5(e);
}
var R1 = F5;
function K5(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var S1 = K5, j5 = R1, Z5 = S1, Q5 = "[object AsyncFunction]", z5 = "[object Function]", U5 = "[object GeneratorFunction]", R5 = "[object Proxy]";
function Y5(e) {
  if (!Z5(e))
    return !1;
  var t = j5(e);
  return t == z5 || t == U5 || t == Q5 || t == R5;
}
var i9 = Y5, H5 = c1, V5 = H5["__core-js_shared__"], G5 = V5, x0 = G5, de = function() {
  var e = /[^.]+$/.exec(x0 && x0.keys && x0.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function X5(e) {
  return !!de && de in e;
}
var J5 = X5, W5 = Function.prototype, q5 = W5.toString;
function e6(e) {
  if (e != null) {
    try {
      return q5.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var s9 = e6, t6 = i9, n6 = J5, r6 = S1, a6 = s9, i6 = /[\\^$.*+?()[\]{}|]/g, s6 = /^\[object .+?Constructor\]$/, o6 = Function.prototype, c6 = Object.prototype, l6 = o6.toString, u6 = c6.hasOwnProperty, f6 = RegExp(
  "^" + l6.call(u6).replace(i6, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function d6(e) {
  if (!r6(e) || n6(e))
    return !1;
  var t = t6(e) ? f6 : s6;
  return t.test(a6(e));
}
var C6 = d6;
function h6(e, t) {
  return e == null ? void 0 : e[t];
}
var g6 = h6, y6 = C6, p6 = g6;
function m6(e, t) {
  var n = p6(e, t);
  return y6(n) ? n : void 0;
}
var b1 = m6, v6 = b1, _6 = function() {
  try {
    var e = v6(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), L6 = _6, Ce = L6;
function $6(e, t, n) {
  t == "__proto__" && Ce ? Ce(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
var o9 = $6;
function b6(e, t) {
  return e === t || e !== e && t !== t;
}
var c9 = b6, x6 = o9, k6 = c9, A6 = Object.prototype, w6 = A6.hasOwnProperty;
function M6(e, t, n) {
  var r = e[t];
  (!(w6.call(e, t) && k6(r, n)) || n === void 0 && !(t in e)) && x6(e, t, n);
}
var F0 = M6, S6 = Array.isArray, I1 = S6;
function I6(e) {
  return e != null && typeof e == "object";
}
var T1 = I6, T6 = R1, D6 = T1, N6 = "[object Symbol]";
function P6(e) {
  return typeof e == "symbol" || D6(e) && T6(e) == N6;
}
var K0 = P6, O6 = I1, B6 = K0, E6 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, F6 = /^\w*$/;
function K6(e, t) {
  if (O6(e))
    return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || B6(e) ? !0 : F6.test(e) || !E6.test(e) || t != null && e in Object(t);
}
var j6 = K6, Z6 = b1, Q6 = Z6(Object, "create"), y0 = Q6, he = y0;
function z6() {
  this.__data__ = he ? he(null) : {}, this.size = 0;
}
var U6 = z6;
function R6(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var Y6 = R6, H6 = y0, V6 = "__lodash_hash_undefined__", G6 = Object.prototype, X6 = G6.hasOwnProperty;
function J6(e) {
  var t = this.__data__;
  if (H6) {
    var n = t[e];
    return n === V6 ? void 0 : n;
  }
  return X6.call(t, e) ? t[e] : void 0;
}
var W6 = J6, q6 = y0, e2 = Object.prototype, t2 = e2.hasOwnProperty;
function n2(e) {
  var t = this.__data__;
  return q6 ? t[e] !== void 0 : t2.call(t, e);
}
var r2 = n2, a2 = y0, i2 = "__lodash_hash_undefined__";
function s2(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = a2 && t === void 0 ? i2 : t, this;
}
var o2 = s2, c2 = U6, l2 = Y6, u2 = W6, f2 = r2, d2 = o2;
function D1(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
D1.prototype.clear = c2;
D1.prototype.delete = l2;
D1.prototype.get = u2;
D1.prototype.has = f2;
D1.prototype.set = d2;
var C2 = D1;
function h2() {
  this.__data__ = [], this.size = 0;
}
var g2 = h2, y2 = c9;
function p2(e, t) {
  for (var n = e.length; n--; )
    if (y2(e[n][0], t))
      return n;
  return -1;
}
var p0 = p2, m2 = p0, v2 = Array.prototype, _2 = v2.splice;
function L2(e) {
  var t = this.__data__, n = m2(t, e);
  if (n < 0)
    return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : _2.call(t, n, 1), --this.size, !0;
}
var $2 = L2, b2 = p0;
function x2(e) {
  var t = this.__data__, n = b2(t, e);
  return n < 0 ? void 0 : t[n][1];
}
var k2 = x2, A2 = p0;
function w2(e) {
  return A2(this.__data__, e) > -1;
}
var M2 = w2, S2 = p0;
function I2(e, t) {
  var n = this.__data__, r = S2(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
}
var T2 = I2, D2 = g2, N2 = $2, P2 = k2, O2 = M2, B2 = T2;
function N1(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
N1.prototype.clear = D2;
N1.prototype.delete = N2;
N1.prototype.get = P2;
N1.prototype.has = O2;
N1.prototype.set = B2;
var m0 = N1, E2 = b1, F2 = c1, K2 = E2(F2, "Map"), j0 = K2, ge = C2, j2 = m0, Z2 = j0;
function Q2() {
  this.size = 0, this.__data__ = {
    hash: new ge(),
    map: new (Z2 || j2)(),
    string: new ge()
  };
}
var z2 = Q2;
function U2(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var R2 = U2, Y2 = R2;
function H2(e, t) {
  var n = e.__data__;
  return Y2(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
var v0 = H2, V2 = v0;
function G2(e) {
  var t = V2(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var X2 = G2, J2 = v0;
function W2(e) {
  return J2(this, e).get(e);
}
var q2 = W2, e3 = v0;
function t3(e) {
  return e3(this, e).has(e);
}
var n3 = t3, r3 = v0;
function a3(e, t) {
  var n = r3(this, e), r = n.size;
  return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
}
var i3 = a3, s3 = z2, o3 = X2, c3 = q2, l3 = n3, u3 = i3;
function P1(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
P1.prototype.clear = s3;
P1.prototype.delete = o3;
P1.prototype.get = c3;
P1.prototype.has = l3;
P1.prototype.set = u3;
var l9 = P1, u9 = l9, f3 = "Expected a function";
function Z0(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(f3);
  var n = function() {
    var r = arguments, a = t ? t.apply(this, r) : r[0], i = n.cache;
    if (i.has(a))
      return i.get(a);
    var c = e.apply(this, r);
    return n.cache = i.set(a, c) || i, c;
  };
  return n.cache = new (Z0.Cache || u9)(), n;
}
Z0.Cache = u9;
var d3 = Z0, C3 = d3, h3 = 500;
function g3(e) {
  var t = C3(e, function(r) {
    return n.size === h3 && n.clear(), r;
  }), n = t.cache;
  return t;
}
var y3 = g3, p3 = y3, m3 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, v3 = /\\(\\)?/g, _3 = p3(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(m3, function(n, r, a, i) {
    t.push(a ? i.replace(v3, "$1") : r || n);
  }), t;
}), L3 = _3;
function $3(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, a = Array(r); ++n < r; )
    a[n] = t(e[n], n, e);
  return a;
}
var b3 = $3, ye = g0, x3 = b3, k3 = I1, A3 = K0, w3 = 1 / 0, pe = ye ? ye.prototype : void 0, me = pe ? pe.toString : void 0;
function f9(e) {
  if (typeof e == "string")
    return e;
  if (k3(e))
    return x3(e, f9) + "";
  if (A3(e))
    return me ? me.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -w3 ? "-0" : t;
}
var M3 = f9, S3 = M3;
function I3(e) {
  return e == null ? "" : S3(e);
}
var T3 = I3, D3 = I1, N3 = j6, P3 = L3, O3 = T3;
function B3(e, t) {
  return D3(e) ? e : N3(e, t) ? [e] : P3(O3(e));
}
var E3 = B3, F3 = 9007199254740991, K3 = /^(?:0|[1-9]\d*)$/;
function j3(e, t) {
  var n = typeof e;
  return t = t ?? F3, !!t && (n == "number" || n != "symbol" && K3.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var d9 = j3, Z3 = K0, Q3 = 1 / 0;
function z3(e) {
  if (typeof e == "string" || Z3(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -Q3 ? "-0" : t;
}
var U3 = z3, R3 = F0, Y3 = E3, H3 = d9, ve = S1, V3 = U3;
function G3(e, t, n, r) {
  if (!ve(e))
    return e;
  t = Y3(t, e);
  for (var a = -1, i = t.length, c = i - 1, s = e; s != null && ++a < i; ) {
    var f = V3(t[a]), h = n;
    if (f === "__proto__" || f === "constructor" || f === "prototype")
      return e;
    if (a != c) {
      var C = s[f];
      h = r ? r(C, f, s) : void 0, h === void 0 && (h = ve(C) ? C : H3(t[a + 1]) ? [] : {});
    }
    R3(s, f, h), s = s[f];
  }
  return e;
}
var X3 = G3, J3 = X3;
function W3(e, t, n) {
  return e == null ? e : J3(e, t, n);
}
var q3 = W3;
const S0 = /* @__PURE__ */ n9(q3);
var e8 = m0;
function t8() {
  this.__data__ = new e8(), this.size = 0;
}
var n8 = t8;
function r8(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
var a8 = r8;
function i8(e) {
  return this.__data__.get(e);
}
var s8 = i8;
function o8(e) {
  return this.__data__.has(e);
}
var c8 = o8, l8 = m0, u8 = j0, f8 = l9, d8 = 200;
function C8(e, t) {
  var n = this.__data__;
  if (n instanceof l8) {
    var r = n.__data__;
    if (!u8 || r.length < d8 - 1)
      return r.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new f8(r);
  }
  return n.set(e, t), this.size = n.size, this;
}
var h8 = C8, g8 = m0, y8 = n8, p8 = a8, m8 = s8, v8 = c8, _8 = h8;
function O1(e) {
  var t = this.__data__ = new g8(e);
  this.size = t.size;
}
O1.prototype.clear = y8;
O1.prototype.delete = p8;
O1.prototype.get = m8;
O1.prototype.has = v8;
O1.prototype.set = _8;
var L8 = O1;
function $8(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r && t(e[n], n, e) !== !1; )
    ;
  return e;
}
var b8 = $8, x8 = F0, k8 = o9;
function A8(e, t, n, r) {
  var a = !n;
  n || (n = {});
  for (var i = -1, c = t.length; ++i < c; ) {
    var s = t[i], f = r ? r(n[s], e[s], s, n, e) : void 0;
    f === void 0 && (f = e[s]), a ? k8(n, s, f) : x8(n, s, f);
  }
  return n;
}
var _0 = A8;
function w8(e, t) {
  for (var n = -1, r = Array(e); ++n < e; )
    r[n] = t(n);
  return r;
}
var M8 = w8, S8 = R1, I8 = T1, T8 = "[object Arguments]";
function D8(e) {
  return I8(e) && S8(e) == T8;
}
var N8 = D8, _e = N8, P8 = T1, C9 = Object.prototype, O8 = C9.hasOwnProperty, B8 = C9.propertyIsEnumerable, E8 = _e(function() {
  return arguments;
}()) ? _e : function(e) {
  return P8(e) && O8.call(e, "callee") && !B8.call(e, "callee");
}, F8 = E8, l0 = { exports: {} };
function K8() {
  return !1;
}
var j8 = K8;
l0.exports;
(function(e, t) {
  var n = c1, r = j8, a = t && !t.nodeType && t, i = a && !0 && e && !e.nodeType && e, c = i && i.exports === a, s = c ? n.Buffer : void 0, f = s ? s.isBuffer : void 0, h = f || r;
  e.exports = h;
})(l0, l0.exports);
var h9 = l0.exports, Z8 = 9007199254740991;
function Q8(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Z8;
}
var g9 = Q8, z8 = R1, U8 = g9, R8 = T1, Y8 = "[object Arguments]", H8 = "[object Array]", V8 = "[object Boolean]", G8 = "[object Date]", X8 = "[object Error]", J8 = "[object Function]", W8 = "[object Map]", q8 = "[object Number]", et = "[object Object]", tt = "[object RegExp]", nt = "[object Set]", rt = "[object String]", at = "[object WeakMap]", it = "[object ArrayBuffer]", st = "[object DataView]", ot = "[object Float32Array]", ct = "[object Float64Array]", lt = "[object Int8Array]", ut = "[object Int16Array]", ft = "[object Int32Array]", dt = "[object Uint8Array]", Ct = "[object Uint8ClampedArray]", ht = "[object Uint16Array]", gt = "[object Uint32Array]", B = {};
B[ot] = B[ct] = B[lt] = B[ut] = B[ft] = B[dt] = B[Ct] = B[ht] = B[gt] = !0;
B[Y8] = B[H8] = B[it] = B[V8] = B[st] = B[G8] = B[X8] = B[J8] = B[W8] = B[q8] = B[et] = B[tt] = B[nt] = B[rt] = B[at] = !1;
function yt(e) {
  return R8(e) && U8(e.length) && !!B[z8(e)];
}
var pt = yt;
function mt(e) {
  return function(t) {
    return e(t);
  };
}
var Q0 = mt, u0 = { exports: {} };
u0.exports;
(function(e, t) {
  var n = r9, r = t && !t.nodeType && t, a = r && !0 && e && !e.nodeType && e, i = a && a.exports === r, c = i && n.process, s = function() {
    try {
      var f = a && a.require && a.require("util").types;
      return f || c && c.binding && c.binding("util");
    } catch {
    }
  }();
  e.exports = s;
})(u0, u0.exports);
var z0 = u0.exports, vt = pt, _t = Q0, Le = z0, $e = Le && Le.isTypedArray, Lt = $e ? _t($e) : vt, $t = Lt, bt = M8, xt = F8, kt = I1, At = h9, wt = d9, Mt = $t, St = Object.prototype, It = St.hasOwnProperty;
function Tt(e, t) {
  var n = kt(e), r = !n && xt(e), a = !n && !r && At(e), i = !n && !r && !a && Mt(e), c = n || r || a || i, s = c ? bt(e.length, String) : [], f = s.length;
  for (var h in e)
    (t || It.call(e, h)) && !(c && // Safari 9 has enumerable `arguments.length` in strict mode.
    (h == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    a && (h == "offset" || h == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (h == "buffer" || h == "byteLength" || h == "byteOffset") || // Skip index properties.
    wt(h, f))) && s.push(h);
  return s;
}
var y9 = Tt, Dt = Object.prototype;
function Nt(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || Dt;
  return e === n;
}
var U0 = Nt;
function Pt(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var p9 = Pt, Ot = p9, Bt = Ot(Object.keys, Object), Et = Bt, Ft = U0, Kt = Et, jt = Object.prototype, Zt = jt.hasOwnProperty;
function Qt(e) {
  if (!Ft(e))
    return Kt(e);
  var t = [];
  for (var n in Object(e))
    Zt.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
var zt = Qt, Ut = i9, Rt = g9;
function Yt(e) {
  return e != null && Rt(e.length) && !Ut(e);
}
var m9 = Yt, Ht = y9, Vt = zt, Gt = m9;
function Xt(e) {
  return Gt(e) ? Ht(e) : Vt(e);
}
var R0 = Xt, Jt = _0, Wt = R0;
function qt(e, t) {
  return e && Jt(t, Wt(t), e);
}
var e7 = qt;
function t7(e) {
  var t = [];
  if (e != null)
    for (var n in Object(e))
      t.push(n);
  return t;
}
var n7 = t7, r7 = S1, a7 = U0, i7 = n7, s7 = Object.prototype, o7 = s7.hasOwnProperty;
function c7(e) {
  if (!r7(e))
    return i7(e);
  var t = a7(e), n = [];
  for (var r in e)
    r == "constructor" && (t || !o7.call(e, r)) || n.push(r);
  return n;
}
var l7 = c7, u7 = y9, f7 = l7, d7 = m9;
function C7(e) {
  return d7(e) ? u7(e, !0) : f7(e);
}
var Y0 = C7, h7 = _0, g7 = Y0;
function y7(e, t) {
  return e && h7(t, g7(t), e);
}
var p7 = y7, f0 = { exports: {} };
f0.exports;
(function(e, t) {
  var n = c1, r = t && !t.nodeType && t, a = r && !0 && e && !e.nodeType && e, i = a && a.exports === r, c = i ? n.Buffer : void 0, s = c ? c.allocUnsafe : void 0;
  function f(h, C) {
    if (C)
      return h.slice();
    var m = h.length, b = s ? s(m) : new h.constructor(m);
    return h.copy(b), b;
  }
  e.exports = f;
})(f0, f0.exports);
var m7 = f0.exports;
function v7(e, t) {
  var n = -1, r = e.length;
  for (t || (t = Array(r)); ++n < r; )
    t[n] = e[n];
  return t;
}
var _7 = v7;
function L7(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, a = 0, i = []; ++n < r; ) {
    var c = e[n];
    t(c, n, e) && (i[a++] = c);
  }
  return i;
}
var $7 = L7;
function b7() {
  return [];
}
var v9 = b7, x7 = $7, k7 = v9, A7 = Object.prototype, w7 = A7.propertyIsEnumerable, be = Object.getOwnPropertySymbols, M7 = be ? function(e) {
  return e == null ? [] : (e = Object(e), x7(be(e), function(t) {
    return w7.call(e, t);
  }));
} : k7, H0 = M7, S7 = _0, I7 = H0;
function T7(e, t) {
  return S7(e, I7(e), t);
}
var D7 = T7;
function N7(e, t) {
  for (var n = -1, r = t.length, a = e.length; ++n < r; )
    e[a + n] = t[n];
  return e;
}
var _9 = N7, P7 = p9, O7 = P7(Object.getPrototypeOf, Object), L9 = O7, B7 = _9, E7 = L9, F7 = H0, K7 = v9, j7 = Object.getOwnPropertySymbols, Z7 = j7 ? function(e) {
  for (var t = []; e; )
    B7(t, F7(e)), e = E7(e);
  return t;
} : K7, $9 = Z7, Q7 = _0, z7 = $9;
function U7(e, t) {
  return Q7(e, z7(e), t);
}
var R7 = U7, Y7 = _9, H7 = I1;
function V7(e, t, n) {
  var r = t(e);
  return H7(e) ? r : Y7(r, n(e));
}
var b9 = V7, G7 = b9, X7 = H0, J7 = R0;
function W7(e) {
  return G7(e, J7, X7);
}
var q7 = W7, en = b9, tn = $9, nn = Y0;
function rn(e) {
  return en(e, nn, tn);
}
var an = rn, sn = b1, on = c1, cn = sn(on, "DataView"), ln = cn, un = b1, fn = c1, dn = un(fn, "Promise"), Cn = dn, hn = b1, gn = c1, yn = hn(gn, "Set"), pn = yn, mn = b1, vn = c1, _n = mn(vn, "WeakMap"), Ln = _n, I0 = ln, T0 = j0, D0 = Cn, N0 = pn, P0 = Ln, x9 = R1, B1 = s9, xe = "[object Map]", $n = "[object Object]", ke = "[object Promise]", Ae = "[object Set]", we = "[object WeakMap]", Me = "[object DataView]", bn = B1(I0), xn = B1(T0), kn = B1(D0), An = B1(N0), wn = B1(P0), _1 = x9;
(I0 && _1(new I0(new ArrayBuffer(1))) != Me || T0 && _1(new T0()) != xe || D0 && _1(D0.resolve()) != ke || N0 && _1(new N0()) != Ae || P0 && _1(new P0()) != we) && (_1 = function(e) {
  var t = x9(e), n = t == $n ? e.constructor : void 0, r = n ? B1(n) : "";
  if (r)
    switch (r) {
      case bn:
        return Me;
      case xn:
        return xe;
      case kn:
        return ke;
      case An:
        return Ae;
      case wn:
        return we;
    }
  return t;
});
var V0 = _1, Mn = Object.prototype, Sn = Mn.hasOwnProperty;
function In(e) {
  var t = e.length, n = new e.constructor(t);
  return t && typeof e[0] == "string" && Sn.call(e, "index") && (n.index = e.index, n.input = e.input), n;
}
var Tn = In, Dn = c1, Nn = Dn.Uint8Array, Pn = Nn, Se = Pn;
function On(e) {
  var t = new e.constructor(e.byteLength);
  return new Se(t).set(new Se(e)), t;
}
var G0 = On, Bn = G0;
function En(e, t) {
  var n = t ? Bn(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.byteLength);
}
var Fn = En, Kn = /\w*$/;
function jn(e) {
  var t = new e.constructor(e.source, Kn.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var Zn = jn, Ie = g0, Te = Ie ? Ie.prototype : void 0, De = Te ? Te.valueOf : void 0;
function Qn(e) {
  return De ? Object(De.call(e)) : {};
}
var zn = Qn, Un = G0;
function Rn(e, t) {
  var n = t ? Un(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.length);
}
var Yn = Rn, Hn = G0, Vn = Fn, Gn = Zn, Xn = zn, Jn = Yn, Wn = "[object Boolean]", qn = "[object Date]", e4 = "[object Map]", t4 = "[object Number]", n4 = "[object RegExp]", r4 = "[object Set]", a4 = "[object String]", i4 = "[object Symbol]", s4 = "[object ArrayBuffer]", o4 = "[object DataView]", c4 = "[object Float32Array]", l4 = "[object Float64Array]", u4 = "[object Int8Array]", f4 = "[object Int16Array]", d4 = "[object Int32Array]", C4 = "[object Uint8Array]", h4 = "[object Uint8ClampedArray]", g4 = "[object Uint16Array]", y4 = "[object Uint32Array]";
function p4(e, t, n) {
  var r = e.constructor;
  switch (t) {
    case s4:
      return Hn(e);
    case Wn:
    case qn:
      return new r(+e);
    case o4:
      return Vn(e, n);
    case c4:
    case l4:
    case u4:
    case f4:
    case d4:
    case C4:
    case h4:
    case g4:
    case y4:
      return Jn(e, n);
    case e4:
      return new r();
    case t4:
    case a4:
      return new r(e);
    case n4:
      return Gn(e);
    case r4:
      return new r();
    case i4:
      return Xn(e);
  }
}
var m4 = p4, v4 = S1, Ne = Object.create, _4 = function() {
  function e() {
  }
  return function(t) {
    if (!v4(t))
      return {};
    if (Ne)
      return Ne(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}(), L4 = _4, $4 = L4, b4 = L9, x4 = U0;
function k4(e) {
  return typeof e.constructor == "function" && !x4(e) ? $4(b4(e)) : {};
}
var A4 = k4, w4 = V0, M4 = T1, S4 = "[object Map]";
function I4(e) {
  return M4(e) && w4(e) == S4;
}
var T4 = I4, D4 = T4, N4 = Q0, Pe = z0, Oe = Pe && Pe.isMap, P4 = Oe ? N4(Oe) : D4, O4 = P4, B4 = V0, E4 = T1, F4 = "[object Set]";
function K4(e) {
  return E4(e) && B4(e) == F4;
}
var j4 = K4, Z4 = j4, Q4 = Q0, Be = z0, Ee = Be && Be.isSet, z4 = Ee ? Q4(Ee) : Z4, U4 = z4, R4 = L8, Y4 = b8, H4 = F0, V4 = e7, G4 = p7, X4 = m7, J4 = _7, W4 = D7, q4 = R7, er = q7, tr = an, nr = V0, rr = Tn, ar = m4, ir = A4, sr = I1, or = h9, cr = O4, lr = S1, ur = U4, fr = R0, dr = Y0, Cr = 1, hr = 2, gr = 4, k9 = "[object Arguments]", yr = "[object Array]", pr = "[object Boolean]", mr = "[object Date]", vr = "[object Error]", A9 = "[object Function]", _r = "[object GeneratorFunction]", Lr = "[object Map]", $r = "[object Number]", w9 = "[object Object]", br = "[object RegExp]", xr = "[object Set]", kr = "[object String]", Ar = "[object Symbol]", wr = "[object WeakMap]", Mr = "[object ArrayBuffer]", Sr = "[object DataView]", Ir = "[object Float32Array]", Tr = "[object Float64Array]", Dr = "[object Int8Array]", Nr = "[object Int16Array]", Pr = "[object Int32Array]", Or = "[object Uint8Array]", Br = "[object Uint8ClampedArray]", Er = "[object Uint16Array]", Fr = "[object Uint32Array]", O = {};
O[k9] = O[yr] = O[Mr] = O[Sr] = O[pr] = O[mr] = O[Ir] = O[Tr] = O[Dr] = O[Nr] = O[Pr] = O[Lr] = O[$r] = O[w9] = O[br] = O[xr] = O[kr] = O[Ar] = O[Or] = O[Br] = O[Er] = O[Fr] = !0;
O[vr] = O[A9] = O[wr] = !1;
function r0(e, t, n, r, a, i) {
  var c, s = t & Cr, f = t & hr, h = t & gr;
  if (n && (c = a ? n(e, r, a, i) : n(e)), c !== void 0)
    return c;
  if (!lr(e))
    return e;
  var C = sr(e);
  if (C) {
    if (c = rr(e), !s)
      return J4(e, c);
  } else {
    var m = nr(e), b = m == A9 || m == _r;
    if (or(e))
      return X4(e, s);
    if (m == w9 || m == k9 || b && !a) {
      if (c = f || b ? {} : ir(e), !s)
        return f ? q4(e, G4(c, e)) : W4(e, V4(c, e));
    } else {
      if (!O[m])
        return a ? e : {};
      c = ar(e, m, s);
    }
  }
  i || (i = new R4());
  var k = i.get(e);
  if (k)
    return k;
  i.set(e, c), ur(e) ? e.forEach(function(Q) {
    c.add(r0(Q, t, n, Q, e, i));
  }) : cr(e) && e.forEach(function(Q, D) {
    c.set(D, r0(Q, t, n, D, e, i));
  });
  var N = h ? f ? tr : er : f ? dr : fr, j = C ? void 0 : N(e);
  return Y4(j || e, function(Q, D) {
    j && (D = Q, Q = e[D]), H4(c, D, r0(Q, t, n, D, e, i));
  }), c;
}
var Kr = r0, jr = Kr, Zr = 1, Qr = 4;
function zr(e) {
  return jr(e, Zr | Qr);
}
var Ur = zr;
const Rr = /* @__PURE__ */ n9(Ur), Yr = /* @__PURE__ */ p("<button></button>"), Hr = (e) => (() => {
  const t = Yr.cloneNode(!0);
  return g1(t, "click", e.onClick, !0), $(t, () => e.children), H((n) => {
    const r = e.style, a = `klinecharts-pro-button ${e.type ?? "confirm"} ${e.class ?? ""}`;
    return n._v$ = M1(t, r, n._v$), a !== n._v$2 && $1(t, n._v$2 = a), n;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
o1(["click"]);
const Vr = /* @__PURE__ */ p('<svg viewBox="0 0 1024 1024" class="icon"><path d="M810.666667 128H213.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v597.333334c0 46.933333 38.4 85.333333 85.333333 85.333333h597.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V213.333333c0-46.933333-38.4-85.333333-85.333333-85.333333z m-353.706667 567.04a42.496 42.496 0 0 1-60.16 0L243.626667 541.866667c-8.106667-8.106667-12.373333-18.773333-12.373334-29.866667s4.693333-22.186667 12.373334-29.866667a42.496 42.496 0 0 1 60.16 0L426.666667 604.586667l293.546666-293.546667a42.496 42.496 0 1 1 60.16 60.16l-323.413333 323.84z"></path></svg>'), Gr = /* @__PURE__ */ p('<svg viewBox="0 0 1024 1024" class="icon"><path d="M245.333333 128h533.333334A117.333333 117.333333 0 0 1 896 245.333333v533.333334A117.333333 117.333333 0 0 1 778.666667 896H245.333333A117.333333 117.333333 0 0 1 128 778.666667V245.333333A117.333333 117.333333 0 0 1 245.333333 128z m0 64c-29.44 0-53.333333 23.893333-53.333333 53.333333v533.333334c0 29.44 23.893333 53.333333 53.333333 53.333333h533.333334c29.44 0 53.333333-23.893333 53.333333-53.333333V245.333333c0-29.44-23.893333-53.333333-53.333333-53.333333H245.333333z"></path></svg>'), Xr = /* @__PURE__ */ p("<div></div>"), Jr = /* @__PURE__ */ p('<span class="label"></span>'), Wr = () => Vr.cloneNode(!0), qr = () => Gr.cloneNode(!0), Fe = (e) => {
  const [t, n] = A(e.checked ?? !1);
  return f1(() => {
    "checked" in e && n(e.checked);
  }), (() => {
    const r = Xr.cloneNode(!0);
    return r.$$click = (a) => {
      const i = !t();
      e.onChange && e.onChange(i), n(i);
    }, $(r, (() => {
      const a = U(() => !!t());
      return () => a() ? L(Wr, {}) : L(qr, {});
    })(), null), $(r, (() => {
      const a = U(() => !!e.label);
      return () => a() && (() => {
        const i = Jr.cloneNode(!0);
        return $(i, () => e.label), i;
      })();
    })(), null), H((a) => {
      const i = e.style, c = `klinecharts-pro-checkbox ${t() && "checked" || ""} ${e.class || ""}`;
      return a._v$ = M1(r, i, a._v$), c !== a._v$2 && $1(r, a._v$2 = c), a;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), r;
  })();
};
o1(["click"]);
const ea = /* @__PURE__ */ p('<div class="klinecharts-pro-loading"><i class="circle1"></i><i class="circle2"></i><i class="circle3"></i></div>'), M9 = () => ea.cloneNode(!0), ta = /* @__PURE__ */ p('<div class="klinecharts-pro-empty"><svg class="icon" viewBox="0 0 1024 1024"><path d="M855.6 427.2H168.5c-12.7 0-24.4 6.9-30.6 18L4.4 684.7C1.5 689.9 0 695.8 0 701.8v287.1c0 19.4 15.7 35.1 35.1 35.1H989c19.4 0 35.1-15.7 35.1-35.1V701.8c0-6-1.5-11.8-4.4-17.1L886.2 445.2c-6.2-11.1-17.9-18-30.6-18zM673.4 695.6c-16.5 0-30.8 11.5-34.3 27.7-12.7 58.5-64.8 102.3-127.2 102.3s-114.5-43.8-127.2-102.3c-3.5-16.1-17.8-27.7-34.3-27.7H119c-26.4 0-43.3-28-31.1-51.4l81.7-155.8c6.1-11.6 18-18.8 31.1-18.8h622.4c13 0 25 7.2 31.1 18.8l81.7 155.8c12.2 23.4-4.7 51.4-31.1 51.4H673.4zM819.9 209.5c-1-1.8-2.1-3.7-3.2-5.5-9.8-16.6-31.1-22.2-47.8-12.6L648.5 261c-17 9.8-22.7 31.6-12.6 48.4 0.9 1.4 1.7 2.9 2.5 4.4 9.5 17 31.2 22.8 48 13L807 257.3c16.7-9.7 22.4-31 12.9-47.8zM375.4 261.1L255 191.6c-16.7-9.6-38-4-47.8 12.6-1.1 1.8-2.1 3.6-3.2 5.5-9.5 16.8-3.8 38.1 12.9 47.8L337.3 327c16.9 9.7 38.6 4 48-13.1 0.8-1.5 1.7-2.9 2.5-4.4 10.2-16.8 4.5-38.6-12.4-48.4zM512 239.3h2.5c19.5 0.3 35.5-15.5 35.5-35.1v-139c0-19.3-15.6-34.9-34.8-35.1h-6.4C489.6 30.3 474 46 474 65.2v139c0 19.5 15.9 35.4 35.5 35.1h2.5z"></path></svg></div>'), na = () => ta.cloneNode(!0), ra = /* @__PURE__ */ p("<ul></ul>"), aa = /* @__PURE__ */ p("<li></li>"), d0 = (e) => (() => {
  const t = ra.cloneNode(!0);
  return $(t, L(W, {
    get when() {
      return e.loading;
    },
    get children() {
      return L(M9, {});
    }
  }), null), $(t, L(W, {
    get when() {
      var n;
      return !e.loading && !e.children && !((n = e.dataSource) != null && n.length);
    },
    get children() {
      return L(na, {});
    }
  }), null), $(t, L(W, {
    get when() {
      return e.children;
    },
    get children() {
      return e.children;
    }
  }), null), $(t, L(W, {
    get when() {
      return !e.children;
    },
    get children() {
      var n;
      return (n = e.dataSource) == null ? void 0 : n.map((r) => {
        var a;
        return ((a = e.renderItem) == null ? void 0 : a.call(e, r)) ?? aa.cloneNode(!0);
      });
    }
  }), null), H((n) => {
    const r = e.style, a = `klinecharts-pro-list ${e.class ?? ""}`;
    return n._v$ = M1(t, r, n._v$), a !== n._v$2 && $1(t, n._v$2 = a), n;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})(), ia = /* @__PURE__ */ p('<div class="klinecharts-pro-modal"><div class="inner"><div class="title-container"><svg class="close-icon" viewBox="0 0 1024 1024"><path d="M934.184927 199.723787 622.457206 511.452531l311.727721 311.703161c14.334473 14.229073 23.069415 33.951253 23.069415 55.743582 0 43.430138-35.178197 78.660524-78.735226 78.660524-21.664416 0-41.361013-8.865925-55.642275-23.069415L511.149121 622.838388 199.420377 934.490384c-14.204513 14.20349-33.901111 23.069415-55.642275 23.069415-43.482327 0-78.737272-35.230386-78.737272-78.660524 0-21.792329 8.864902-41.513486 23.094998-55.743582l311.677579-311.703161L88.135828 199.723787c-14.230096-14.255679-23.094998-33.92567-23.094998-55.642275 0-43.430138 35.254945-78.762855 78.737272-78.762855 21.741163 0 41.437761 8.813736 55.642275 23.069415l311.727721 311.727721L822.876842 88.389096c14.281261-14.255679 33.977859-23.069415 55.642275-23.069415 43.557028 0 78.735226 35.332716 78.735226 78.762855C957.254342 165.798117 948.5194 185.468109 934.184927 199.723787"></path></svg></div><div class="content-container"></div></div></div>'), sa = /* @__PURE__ */ p('<div class="button-container"></div>'), E1 = (e) => (() => {
  const t = ia.cloneNode(!0), n = t.firstChild, r = n.firstChild, a = r.firstChild, i = r.nextSibling;
  return $(r, () => e.title, a), g1(a, "click", e.onClose, !0), $(i, () => e.children), $(n, (() => {
    const c = U(() => !!(e.buttons && e.buttons.length > 0));
    return () => c() && (() => {
      const s = sa.cloneNode(!0);
      return $(s, () => e.buttons.map((f) => L(Hr, t9(f, {
        get children() {
          return f.children;
        }
      })))), s;
    })();
  })(), null), H(() => n.style.setProperty("width", `${e.width ?? 400}px`)), t;
})();
o1(["click"]);
const oa = /* @__PURE__ */ p('<div tabindex="0"><div class="selector-container"><span class="value"></span><i class="arrow"></i></div></div>'), ca = /* @__PURE__ */ p('<div class="drop-down-container"><ul></ul></div>'), la = /* @__PURE__ */ p("<li></li>"), S9 = (e) => {
  const [t, n] = A(!1);
  return (() => {
    const r = oa.cloneNode(!0), a = r.firstChild, i = a.firstChild;
    return r.addEventListener("blur", (c) => {
      n(!1);
    }), r.$$click = (c) => {
      n((s) => !s);
    }, $(i, () => e.value), $(r, (() => {
      const c = U(() => !!(e.dataSource && e.dataSource.length > 0));
      return () => c() && (() => {
        const s = ca.cloneNode(!0), f = s.firstChild;
        return $(f, () => e.dataSource.map((h) => {
          const m = h[e.valueKey ?? "text"] ?? h;
          return (() => {
            const b = la.cloneNode(!0);
            return b.$$click = (k) => {
              var N;
              k.stopPropagation(), e.value !== m && ((N = e.onSelected) == null || N.call(e, h)), n(!1);
            }, $(b, m), b;
          })();
        })), s;
      })();
    })(), null), H((c) => {
      const s = e.style, f = `klinecharts-pro-select ${e.class ?? ""} ${t() ? "klinecharts-pro-select-show" : ""}`;
      return c._v$ = M1(r, s, c._v$), f !== c._v$2 && $1(r, c._v$2 = f), c;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), r;
  })();
};
o1(["click"]);
const ua = /* @__PURE__ */ p('<span class="prefix"></span>'), fa = /* @__PURE__ */ p('<span class="suffix"></span>'), da = /* @__PURE__ */ p('<div><input class="value"></div>'), I9 = (e) => {
  const t = t9({
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER
  }, e);
  let n;
  const [r, a] = A("normal");
  return (() => {
    const i = da.cloneNode(!0), c = i.firstChild;
    return i.$$click = () => {
      n == null || n.focus();
    }, $(i, L(W, {
      get when() {
        return t.prefix;
      },
      get children() {
        const s = ua.cloneNode(!0);
        return $(s, () => t.prefix), s;
      }
    }), c), c.addEventListener("change", (s) => {
      var h, C;
      const f = s.target.value;
      if ("precision" in t) {
        let m;
        const b = Math.max(0, Math.floor(t.precision));
        b <= 0 ? m = new RegExp(/^[1-9]\d*$/) : m = new RegExp("^\\d+\\.?\\d{0," + b + "}$"), (f === "" || m.test(f) && +f >= t.min && +f <= t.max) && ((h = t.onChange) == null || h.call(t, f === "" ? f : +f));
      } else
        (C = t.onChange) == null || C.call(t, f);
    }), c.addEventListener("blur", () => {
      a("normal");
    }), c.addEventListener("focus", () => {
      a("focus");
    }), E0((s) => {
      n = s;
    }, c), $(i, L(W, {
      get when() {
        return t.suffix;
      },
      get children() {
        const s = fa.cloneNode(!0);
        return $(s, () => t.suffix), s;
      }
    }), null), H((s) => {
      const f = t.style, h = `klinecharts-pro-input ${t.class ?? ""}`, C = r(), m = t.placeholder ?? "";
      return s._v$ = M1(i, f, s._v$), h !== s._v$2 && $1(i, s._v$2 = h), C !== s._v$3 && r1(i, "data-status", s._v$3 = C), m !== s._v$4 && r1(c, "placeholder", s._v$4 = m), s;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0
    }), H(() => c.value = t.value), i;
  })();
};
o1(["click"]);
const Ca = /* @__PURE__ */ p('<div><i class="thumb"></i></div>'), ha = (e) => (() => {
  const t = Ca.cloneNode(!0);
  return t.$$click = (n) => {
    e.onChange && e.onChange();
  }, H((n) => {
    const r = e.style, a = `klinecharts-pro-switch ${e.open ? "turn-on" : "turn-off"} ${e.class ?? ""}`;
    return n._v$ = M1(t, r, n._v$), a !== n._v$2 && $1(t, n._v$2 = a), n;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
o1(["click"]);
const ga = "指标", ya = "主图指标", pa = "副图指标", ma = "设置", va = "时区", _a = "截屏", La = "全屏", $a = "退出全屏", ba = "保存", xa = "确定", ka = "取消", Aa = "MA(移动平均线)", wa = "EMA(指数平滑移动平均线)", Ma = "SMA", Sa = "BOLL(布林线)", Ia = "BBI(多空指数)", Ta = "SAR(停损点指向指标)", Da = "VOL(成交量)", Na = "MACD(指数平滑异同移动平均线)", Pa = "KDJ(随机指标)", Oa = "RSI(相对强弱指标)", Ba = "BIAS(乖离率)", Ea = "BRAR(情绪指标)", Fa = "CCI(顺势指标)", Ka = "DMI(动向指标)", ja = "CR(能量指标)", Za = "PSY(心理线)", Qa = "DMA(平行线差指标)", za = "TRIX(三重指数平滑平均线)", Ua = "OBV(能量潮指标)", Ra = "VR(成交量变异率)", Ya = "WR(威廉指标)", Ha = "MTM(动量指标)", Va = "EMV(简易波动指标)", Ga = "ROC(变动率指标)", Xa = "PVT(价量趋势指标)", Ja = "AO(动量震荡指标)", Wa = "世界统一时间", qa = "(UTC-10) 檀香山", ei = "(UTC-8) 朱诺", ti = "(UTC-7) 洛杉矶", ni = "(UTC-5) 芝加哥", ri = "(UTC-4) 多伦多", ai = "(UTC-3) 圣保罗", ii = "(UTC+1) 伦敦", si = "(UTC+2) 柏林", oi = "(UTC+3) 巴林", ci = "(UTC+4) 迪拜", li = "(UTC+5) 阿什哈巴德", ui = "(UTC+6) 阿拉木图", fi = "(UTC+7) 曼谷", di = "(UTC+8) 上海", Ci = "(UTC+9) 东京", hi = "(UTC+10) 悉尼", gi = "(UTC+12) 诺福克岛", yi = "水平直线", pi = "水平射线", mi = "水平线段", vi = "垂直直线", _i = "垂直射线", Li = "垂直线段", $i = "直线", bi = "射线", xi = "线段", ki = "箭头", Ai = "价格线", wi = "价格通道线", Mi = "平行直线", Si = "斐波那契回调直线", Ii = "斐波那契回调线段", Ti = "斐波那契圆环", Di = "斐波那契螺旋", Ni = "斐波那契速度阻力扇", Pi = "斐波那契趋势扩展", Oi = "江恩箱", Bi = "矩形", Ei = "平行四边形", Fi = "圆", Ki = "三角形", ji = "三浪", Zi = "五浪", Qi = "八浪", zi = "任意浪", Ui = "ABCD形态", Ri = "XABCD形态", Yi = "弱磁模式", Hi = "强磁模式", Vi = "商品搜索", Gi = "商品代码", Xi = "参数1", Ji = "参数2", Wi = "参数3", qi = "参数4", es = "参数5", ts = "周期", ns = "标准差", rs = "蜡烛图类型", as = "全实心", is = "全空心", ss = "涨空心", os = "跌空心", cs = "OHLC", ls = "面积图", us = "最新价显示", fs = "最高价显示", ds = "最低价显示", Cs = "指标最新值显示", hs = "价格轴类型", gs = "线性轴", ys = "百分比轴", ps = "对数轴", ms = "倒置坐标", vs = "网格线显示", _s = "恢复默认", Ls = {
  indicator: ga,
  main_indicator: ya,
  sub_indicator: pa,
  setting: ma,
  timezone: va,
  screenshot: _a,
  full_screen: La,
  exit_full_screen: $a,
  save: ba,
  confirm: xa,
  cancel: ka,
  ma: Aa,
  ema: wa,
  sma: Ma,
  boll: Sa,
  bbi: Ia,
  sar: Ta,
  vol: Da,
  macd: Na,
  kdj: Pa,
  rsi: Oa,
  bias: Ba,
  brar: Ea,
  cci: Fa,
  dmi: Ka,
  cr: ja,
  psy: Za,
  dma: Qa,
  trix: za,
  obv: Ua,
  vr: Ra,
  wr: Ya,
  mtm: Ha,
  emv: Va,
  roc: Ga,
  pvt: Xa,
  ao: Ja,
  utc: Wa,
  honolulu: qa,
  juneau: ei,
  los_angeles: ti,
  chicago: ni,
  toronto: ri,
  sao_paulo: ai,
  london: ii,
  berlin: si,
  bahrain: oi,
  dubai: ci,
  ashkhabad: li,
  almaty: ui,
  bangkok: fi,
  shanghai: di,
  tokyo: Ci,
  sydney: hi,
  norfolk: gi,
  horizontal_straight_line: yi,
  horizontal_ray_line: pi,
  horizontal_segment: mi,
  vertical_straight_line: vi,
  vertical_ray_line: _i,
  vertical_segment: Li,
  straight_line: $i,
  ray_line: bi,
  segment: xi,
  arrow: ki,
  price_line: Ai,
  price_channel_line: wi,
  parallel_straight_line: Mi,
  fibonacci_line: Si,
  fibonacci_segment: Ii,
  fibonacci_circle: Ti,
  fibonacci_spiral: Di,
  fibonacci_speed_resistance_fan: Ni,
  fibonacci_extension: Pi,
  gann_box: Oi,
  rect: Bi,
  parallelogram: Ei,
  circle: Fi,
  triangle: Ki,
  three_waves: ji,
  five_waves: Zi,
  eight_waves: Qi,
  any_waves: zi,
  abcd: Ui,
  xabcd: Ri,
  weak_magnet: Yi,
  strong_magnet: Hi,
  symbol_search: Vi,
  symbol_code: Gi,
  params_1: Xi,
  params_2: Ji,
  params_3: Wi,
  params_4: qi,
  params_5: es,
  period: ts,
  standard_deviation: ns,
  candle_type: rs,
  candle_solid: as,
  candle_stroke: is,
  candle_up_stroke: ss,
  candle_down_stroke: os,
  ohlc: cs,
  area: ls,
  last_price_show: us,
  high_price_show: fs,
  low_price_show: ds,
  indicator_last_value_show: Cs,
  price_axis_type: hs,
  normal: gs,
  percentage: ys,
  log: ps,
  reverse_coordinate: ms,
  grid_show: vs,
  restore_default: _s
}, $s = "Indicator", bs = "Main Indicator", xs = "Sub Indicator", ks = "Setting", As = "Timezone", ws = "Screenshot", Ms = "Full Screen", Ss = "Exit", Is = "Save", Ts = "Confirm", Ds = "Cancel", Ns = "MA(Moving Average)", Ps = "EMA(Exponential Moving Average)", Os = "SMA", Bs = "BOLL(Bolinger Bands)", Es = "BBI(Bull And Bearlndex)", Fs = "SAR(Stop and Reverse)", Ks = "VOL(Volume)", js = "MACD(Moving Average Convergence / Divergence)", Zs = "KDJ(KDJ Index)", Qs = "RSI(Relative Strength Index)", zs = "BIAS(Bias Ratio)", Us = "BRAR(情绪指标)", Rs = "CCI(Commodity Channel Index)", Ys = "DMI(Directional Movement Index)", Hs = "CR(能量指标)", Vs = "PSY(Psychological Line)", Gs = "DMA(Different of Moving Average)", Xs = "TRIX(Triple Exponentially Smoothed Moving Average)", Js = "OBV(On Balance Volume)", Ws = "VR(Volatility Volume Ratio)", qs = "WR(Williams %R)", eo = "MTM(Momentum Index)", to = "EMV(Ease of Movement Value)", no = "ROC(Price Rate of Change)", ro = "PVT(Price and Volume Trend)", ao = "AO(Awesome Oscillator)", io = "UTC", so = "(UTC-10) Honolulu", oo = "(UTC-8) Juneau", co = "(UTC-7) Los Angeles", lo = "(UTC-5) Chicago", uo = "(UTC-4) Toronto", fo = "(UTC-3) Sao Paulo", Co = "(UTC+1) London", ho = "(UTC+2) Berlin", go = "(UTC+3) Bahrain", yo = "(UTC+4) Dubai", po = "(UTC+5) Ashkhabad", mo = "(UTC+6) Almaty", vo = "(UTC+7) Bangkok", _o = "(UTC+8) Shanghai", Lo = "(UTC+9) Tokyo", $o = "(UTC+10) Sydney", bo = "(UTC+12) Norfolk", xo = "Horizontal Line", ko = "Horizontal Ray", Ao = "Horizontal Segment", wo = "Vertical Line", Mo = "Vertical Ray", So = "Vertical Segment", Io = "Trend Line", To = "Ray", Do = "Segment", No = "Arrow", Po = "Price Line", Oo = "Price Channel Line", Bo = "Parallel Line", Eo = "Fibonacci Line", Fo = "Fibonacci Segment", Ko = "Fibonacci Circle", jo = "Fibonacci Spiral", Zo = "Fibonacci Sector", Qo = "Fibonacci Extension", zo = "Gann Box", Uo = "Rect", Ro = "Parallelogram", Yo = "Circle", Ho = "Triangle", Vo = "Three Waves", Go = "Five Waves", Xo = "Eight Waves", Jo = "Any Waves", Wo = "ABCD Pattern", qo = "XABCD Pattern", ec = "Weak Magnet", tc = "Strong Magnet", nc = "Symbol Search", rc = "Symbol Code", ac = "Parameter 1", ic = "Parameter 2", sc = "Parameter 3", oc = "Parameter 4", cc = "Parameter 5", lc = "Period", uc = "Standard Deviation", fc = "Candle Type", dc = "Candle Solid", Cc = "Candle Stroke", hc = "Candle Up Stroke", gc = "Candle Down Stroke", yc = "OHLC", pc = "Area", mc = "Show Last Price", vc = "Show Highest Price", _c = "Show Lowest Price", Lc = "Show indicator's last value", $c = "Price Axis Type", bc = "Normal", xc = "Percentage", kc = "Log", Ac = "Reverse Coordinate", wc = "Show Grids", Mc = "Restore Defaults", Sc = {
  indicator: $s,
  main_indicator: bs,
  sub_indicator: xs,
  setting: ks,
  timezone: As,
  screenshot: ws,
  full_screen: Ms,
  exit_full_screen: Ss,
  save: Is,
  confirm: Ts,
  cancel: Ds,
  ma: Ns,
  ema: Ps,
  sma: Os,
  boll: Bs,
  bbi: Es,
  sar: Fs,
  vol: Ks,
  macd: js,
  kdj: Zs,
  rsi: Qs,
  bias: zs,
  brar: Us,
  cci: Rs,
  dmi: Ys,
  cr: Hs,
  psy: Vs,
  dma: Gs,
  trix: Xs,
  obv: Js,
  vr: Ws,
  wr: qs,
  mtm: eo,
  emv: to,
  roc: no,
  pvt: ro,
  ao,
  utc: io,
  honolulu: so,
  juneau: oo,
  los_angeles: co,
  chicago: lo,
  toronto: uo,
  sao_paulo: fo,
  london: Co,
  berlin: ho,
  bahrain: go,
  dubai: yo,
  ashkhabad: po,
  almaty: mo,
  bangkok: vo,
  shanghai: _o,
  tokyo: Lo,
  sydney: $o,
  norfolk: bo,
  horizontal_straight_line: xo,
  horizontal_ray_line: ko,
  horizontal_segment: Ao,
  vertical_straight_line: wo,
  vertical_ray_line: Mo,
  vertical_segment: So,
  straight_line: Io,
  ray_line: To,
  segment: Do,
  arrow: No,
  price_line: Po,
  price_channel_line: Oo,
  parallel_straight_line: Bo,
  fibonacci_line: Eo,
  fibonacci_segment: Fo,
  fibonacci_circle: Ko,
  fibonacci_spiral: jo,
  fibonacci_speed_resistance_fan: Zo,
  fibonacci_extension: Qo,
  gann_box: zo,
  rect: Uo,
  parallelogram: Ro,
  circle: Yo,
  triangle: Ho,
  three_waves: Vo,
  five_waves: Go,
  eight_waves: Xo,
  any_waves: Jo,
  abcd: Wo,
  xabcd: qo,
  weak_magnet: ec,
  strong_magnet: tc,
  symbol_search: nc,
  symbol_code: rc,
  params_1: ac,
  params_2: ic,
  params_3: sc,
  params_4: oc,
  params_5: cc,
  period: lc,
  standard_deviation: uc,
  candle_type: fc,
  candle_solid: dc,
  candle_stroke: Cc,
  candle_up_stroke: hc,
  candle_down_stroke: gc,
  ohlc: yc,
  area: pc,
  last_price_show: mc,
  high_price_show: vc,
  low_price_show: _c,
  indicator_last_value_show: Lc,
  price_axis_type: $c,
  normal: bc,
  percentage: xc,
  log: kc,
  reverse_coordinate: Ac,
  grid_show: wc,
  restore_default: Mc
}, T9 = {
  "zh-CN": Ls,
  "en-US": Sc
};
function Bu(e, t) {
  T9[e] = t;
}
const d = (e, t) => {
  var n;
  return ((n = T9[t]) == null ? void 0 : n[e]) ?? e;
}, Ic = /* @__PURE__ */ p('<img alt="symbol">'), Tc = /* @__PURE__ */ p('<div class="symbol"><span></span></div>'), Dc = /* @__PURE__ */ p('<div class="klinecharts-pro-period-bar"><div class="menu-container"><svg viewBox="0 0 1024 1024"><path d="M192.037 287.953h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 479.169H438.553c-17.673 0-32 14.327-32 32s14.327 32 32 32h393.608c17.673 0 32-14.327 32-32s-14.327-32-32-32zM832.161 735.802H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32zM319.028 351.594l-160 160 160 160z"></path></svg></div><div class="item tools"><svg viewBox="0 0 20 20"><path d="M15.873,20L3.65079,20C1.5873,20,0,18.3871,0,16.2903L0,3.70968C-3.78442e-7,1.6129,1.5873,0,3.65079,0L15.873,0C17.9365,0,19.5238,1.6129,19.5238,3.70968C19.5238,4.35484,19.2063,4.51613,18.5714,4.51613C17.9365,4.51613,17.619,4.19355,17.619,3.70968C17.619,2.74194,16.8254,1.93548,15.873,1.93548L3.65079,1.93548C2.69841,1.93548,1.90476,2.74194,1.90476,3.70968L1.90476,16.2903C1.90476,17.2581,2.69841,18.0645,3.65079,18.0645L15.873,18.0645C16.8254,18.0645,17.619,17.2581,17.619,16.2903C17.619,15.8065,18.0952,15.3226,18.5714,15.3226C19.0476,15.3226,19.5238,15.8065,19.5238,16.2903C19.5238,18.2258,17.9365,20,15.873,20ZM14.9206,12.9032C14.7619,12.9032,14.4444,12.9032,14.2857,12.7419L11.2698,9.35484C10.9524,9.03226,10.9524,8.54839,11.2698,8.22581C11.5873,7.90323,12.0635,7.90323,12.381,8.22581L15.3968,11.6129C15.7143,11.9355,15.7143,12.4194,15.3968,12.7419C15.3968,12.9032,15.2381,12.9032,14.9206,12.9032ZM11.4286,13.2258C11.2698,13.2258,11.1111,13.2258,10.9524,13.0645C10.6349,12.7419,10.6349,12.4194,10.9524,12.0968L15.0794,7.74193C15.3968,7.41935,15.7143,7.41935,16.0317,7.74193C16.3492,8.06452,16.3492,8.3871,16.0317,8.70968L11.9048,13.0645C11.746,13.2258,11.5873,13.2258,11.4286,13.2258ZM10.3175,3.70968C10.6349,3.70968,11.4286,3.87097,11.4286,4.67742C11.4286,5.32258,10.4762,5.16129,10.1587,5.16129C8.73016,5.16129,8.25397,5.96774,8.09524,6.6129L7.77778,8.54839L9.36508,8.54839C9.68254,8.54839,10,8.87097,10,9.19355C10,9.51613,9.68254,9.83871,9.36508,9.83871L7.61905,9.83871L6.50794,14.8387Q6.34921,16.2903,5.39683,16.2903Q4.44444,16.2903,4.92064,14.8387L6.03175,10L4.60317,10C4.28571,10,3.96825,9.67742,3.96825,9.35484C3.96825,8.70968,4.28571,8.54839,4.60317,8.54839L6.34921,8.54839L6.8254,6.45161C7.14286,3.70968,9.52381,3.54839,10.3175,3.70968ZM18.4127,6.6129C18.5714,6.12903,18.8889,5.96774,19.3651,5.96774C19.8413,6.12903,20,6.45161,20,6.93548L18.4127,13.3871C18.254,13.871,17.9365,14.0323,17.4603,14.0323C16.9841,13.871,16.8254,13.5484,16.8254,13.0645L18.4127,6.6129Z"></path></svg><span></span></div><div class="item tools"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path><path d="M15.22299772857666,9.722223632261718C12.59389772857666,9.722223632261718,10.44600772857666,12.020201374511718,10.44600772857666,14.861111374511719C10.44600772857666,17.70202137451172,12.58215772857666,20.000021374511718,15.223007728576661,20.000021374511718C17.86384772857666,20.000021374511718,19.99999772857666,17.70202137451172,19.99999772857666,14.861111374511719C19.99999772857666,12.020201374511718,17.85211772857666,9.72222212709572,15.22299772857666,9.722223632261718ZM15.22299772857666,18.598491374511717C13.30985772857666,18.598491374511717,11.737087728576661,16.91919137451172,11.737087728576661,14.848481374511719C11.737087728576661,12.777781374511719,13.29811772857666,11.098491374511719,15.22299772857666,11.098491374511719C17.14787772857666,11.098491374511719,18.708917728576658,12.777781374511719,18.708917728576658,14.848481374511719C18.708917728576658,16.91919137451172,17.13614772857666,18.59848137451172,15.22299772857666,18.598491374511717Z"></path><path d="M15.692486288146974,15.050496970825195L15.692486288146974,12.676760970825196C15.692486288146974,12.297972970825196,15.399058288146973,11.982316970825195,15.046945288146972,11.982316970825195C14.694833288146972,11.982316970825195,14.401406288146973,12.297972970825196,14.401406288146973,12.676760970825196L14.401406288146973,15.340896970825195C14.401406288146973,15.530296970825194,14.471829288146973,15.694436970825196,14.589200288146973,15.833326970825196L15.751176288146972,17.095956970825195C15.868546288146973,17.222216970825194,16.032866288146973,17.297976970825196,16.208916288146973,17.297976970825196C16.384976288146973,17.297976970825196,16.537556288146973,17.222216970825194,16.666666288146974,17.095956970825195C16.78403628814697,16.969686970825194,16.854456288146974,16.792916970825196,16.854456288146974,16.603526970825193C16.854456288146974,16.414136970825197,16.78403628814697,16.237366970825196,16.666666288146974,16.111106970825197L15.692486288146974,15.050496970825195Z"></path></svg><span></span></div><div class="item tools"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg><span></span></div><div class="item tools"><svg viewBox="0 0 20 20"><path d="M6.50977,1L13.4902,1C13.6406,1,13.7695,1.1104910000000001,13.7969,1.2631700000000001L14.0273,2.52277C14.1387,3.13147,14.6543,3.57143,15.2559,3.57143L17.5,3.57143C18.8809,3.57143,20,4.72254,20,6.14286L20,16.4286C20,17.8489,18.8809,19,17.5,19L2.5,19C1.11914,19,0,17.8489,0,16.4286L0,6.14286C0,4.72254,1.11914,3.57143,2.5,3.57143L4.74414,3.57143C5.3457,3.57143,5.86133,3.13147,5.97266,2.52277L6.20312,1.2631700000000001C6.23047,1.1104910000000001,6.35937,1,6.50977,1ZM15.2559,4.857139999999999C14.0547,4.857139999999999,13.0215,3.97522,12.7988,2.75982L12.7129,2.28571L7.28711,2.28571L7.20117,2.75982C6.98047,3.97522,5.94727,4.857139999999999,4.74414,4.857139999999999L2.5,4.857139999999999C1.81055,4.857139999999999,1.25,5.43371,1.25,6.14286L1.25,16.4286C1.25,17.1377,1.81055,17.7143,2.5,17.7143L17.5,17.7143C18.1895,17.7143,18.75,17.1377,18.75,16.4286L18.75,6.14286C18.75,5.43371,18.1895,4.857139999999999,17.5,4.857139999999999L15.2559,4.857139999999999ZM4.375,6.78571L3.125,6.78571C2.7793,6.78571,2.5,6.49844,2.5,6.14286C2.5,5.78728,2.7793,5.5,3.125,5.5L4.375,5.5C4.7207,5.5,5,5.78728,5,6.14286C5,6.49844,4.7207,6.78571,4.375,6.78571ZM10,6.14286C7.06641,6.14286,4.6875,8.58973,4.6875,11.6071C4.6875,14.6246,7.06641,17.0714,10,17.0714C12.9336,17.0714,15.3125,14.6246,15.3125,11.6071C15.3125,8.58973,12.9336,6.14286,10,6.14286ZM10,7.42857C11.0859,7.42857,12.1055,7.8625,12.873,8.65201C13.6406,9.44152,14.0625,10.49018,14.0625,11.6071C14.0625,12.7241,13.6406,13.7728,12.873,14.5623C12.1055,15.3518,11.0859,15.7857,10,15.7857C8.91406,15.7857,7.89453,15.3518,7.12695,14.5623C6.35937,13.7728,5.9375,12.7241,5.9375,11.6071C5.9375,10.49018,6.35938,9.44152,7.12695,8.65201C7.89453,7.8625,8.91406,7.42857,10,7.42857ZM10,9.67857C8.96484,9.67857,8.125,10.54241,8.125,11.6071C8.125,12.6719,8.96484,13.5357,10,13.5357C11.0352,13.5357,11.875,12.6719,11.875,11.6071C11.875,10.54241,11.0352,9.67857,10,9.67857ZM10,10.96429C10.3438,10.96429,10.625,11.2536,10.625,11.6071C10.625,11.9607,10.3438,12.25,10,12.25C9.65625,12.25,9.375,11.9607,9.375,11.6071C9.375,11.2536,9.65625,10.96429,10,10.96429Z"></path></svg><span></span></div><div class="item tools"></div></div>'), k0 = /* @__PURE__ */ p("<span></span>"), Nc = /* @__PURE__ */ p('<svg viewBox="0 0 20 20"><path d="M1.08108,0L0,1.079L4.18919,5.27938L2.54826,6.91715L6.9112,6.91715L6.9112,2.56262L5.28957,4.18112L1.08108,0ZM15.8108,5.27938L20,1.079L18.9189,0L14.7104,4.18112L13.0888,2.56262L13.0888,6.91715L17.4517,6.91715L15.8108,5.27938ZM4.16988,14.7014L0.07722,18.8054L1.1583,20L5.27027,15.7996L6.9112,17.4374L6.9112,13.0829L2.54826,13.0829L4.16988,14.7014ZM17.4517,13.0829L13.0888,13.0829L13.0888,17.4374L14.7297,15.7996L18.8417,20L19.9228,18.8054L15.8301,14.7013L17.4517,13.0829Z"></path></svg>'), Pc = /* @__PURE__ */ p('<svg viewBox="0 0 20 20"><path d="M2.93444,1.76899L7.57544,6.40999L6.38918,7.59626L1.76899,2.93444L0,4.70343L0,0L4.70343,0L2.93444,1.76899ZM6.40999,12.4037L1.76899,17.0447L0,15.2758L0,19.9792L4.70343,19.9792L2.93444,18.2102L7.57544,13.5692L6.40999,12.4037ZM15.2758,0L17.0447,1.76899L12.4037,6.40999L13.59,7.59626L18.231,2.95526L20,4.72425L20,0L15.2758,0ZM13.5692,12.4037L12.3829,13.59L17.0239,18.231L15.2549,20L19.9792,20L19.9792,15.2758L18.2102,17.0447L13.5692,12.4037Z"></path></svg>'), Oc = (e) => {
  let t;
  const [n, r] = A(!1), a = () => {
    r((i) => !i);
  };
  return Ve(() => {
    document.addEventListener("fullscreenchange", a), document.addEventListener("mozfullscreenchange", a), document.addEventListener("webkitfullscreenchange", a), document.addEventListener("msfullscreenchange", a);
  }), B0(() => {
    document.removeEventListener("fullscreenchange", a), document.removeEventListener("mozfullscreenchange", a), document.removeEventListener("webkitfullscreenchange", a), document.removeEventListener("msfullscreenchange", a);
  }), (() => {
    const i = Dc.cloneNode(!0), c = i.firstChild, s = c.firstChild, f = c.nextSibling, h = f.firstChild, C = h.nextSibling, m = f.nextSibling, b = m.firstChild, k = b.nextSibling, N = m.nextSibling, j = N.firstChild, Q = j.nextSibling, D = N.nextSibling, Y = D.firstChild, P = Y.nextSibling, S = D.nextSibling;
    return E0((w) => {
      t = w;
    }, i), g1(s, "click", e.onMenuClick, !0), $(i, L(W, {
      get when() {
        return e.symbol;
      },
      get children() {
        const w = Tc.cloneNode(!0), Z = w.firstChild;
        return g1(w, "click", e.onSymbolClick, !0), $(w, L(W, {
          get when() {
            return e.symbol.logo;
          },
          get children() {
            const n1 = Ic.cloneNode(!0);
            return H(() => r1(n1, "src", e.symbol.logo)), n1;
          }
        }), Z), $(Z, () => e.symbol.shortName ?? e.symbol.name ?? e.symbol.ticker), w;
      }
    }), f), $(i, () => e.periods.map((w) => (() => {
      const Z = k0.cloneNode(!0);
      return Z.$$click = () => {
        e.onPeriodChange(w);
      }, $(Z, () => w.text), H(() => $1(Z, `item period ${w.text === e.period.text ? "selected" : ""}`)), Z;
    })()), f), g1(f, "click", e.onIndicatorClick, !0), $(C, () => d("indicator", e.locale)), g1(m, "click", e.onTimezoneClick, !0), $(k, () => d("timezone", e.locale)), g1(N, "click", e.onSettingClick, !0), $(Q, () => d("setting", e.locale)), g1(D, "click", e.onScreenshotClick, !0), $(P, () => d("screenshot", e.locale)), S.$$click = () => {
      if (n())
        (document.exitFullscreen ?? document.msExitFullscreen ?? document.mozCancelFullScreen ?? document.webkitExitFullscreen).call(document);
      else {
        const w = t == null ? void 0 : t.parentElement;
        w && (w.requestFullscreen ?? w.webkitRequestFullscreen ?? w.mozRequestFullScreen ?? w.msRequestFullscreen).call(w);
      }
    }, $(S, (() => {
      const w = U(() => !!n());
      return () => w() ? [Nc.cloneNode(!0), (() => {
        const Z = k0.cloneNode(!0);
        return $(Z, () => d("exit_full_screen", e.locale)), Z;
      })()] : [Pc.cloneNode(!0), (() => {
        const Z = k0.cloneNode(!0);
        return $(Z, () => d("full_screen", e.locale)), Z;
      })()];
    })()), H(() => r1(s, "class", e.spread ? "" : "rotate")), i;
  })();
};
o1(["click"]);
const Bc = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M12.41465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L12.41465,12C12.20873,12.5826,11.65311,13,11,13C10.34689,13,9.79127,12.5826,9.58535,12L3.5,12C3.223857,12,3,11.77614,3,11.5C3,11.22386,3.223857,11,3.5,11L9.58535,11C9.79127,10.417404,10.34689,10,11,10C11.65311,10,12.20873,10.417404,12.41465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), Ec = () => Bc.cloneNode(!0), Fc = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,11L11.08535,11C11.29127,10.417404,11.84689,10,12.5,10C13.15311,10,13.70873,10.417404,13.91465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L13.91465,12C13.70873,12.5826,13.15311,13,12.5,13C11.84689,13,11.29127,12.5826,11.08535,12L6.91465,12C6.70873,12.5826,6.15311,13,5.5,13C4.671573,13,4,12.32843,4,11.5C4,10.671573,4.671573,10,5.5,10C6.15311,10,6.70873,10.417404,6.91465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), Kc = () => Fc.cloneNode(!0), jc = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,12.5C6.70873,13.0826,6.15311,13.5,5.5,13.5C4.671573,13.5,4,12.82843,4,12C4,11.171573,4.671573,10.5,5.5,10.5C6.15311,10.5,6.70873,10.917404,6.91465,11.5L16.0853,11.5C16.2913,10.917404,16.846899999999998,10.5,17.5,10.5C18.328400000000002,10.5,19,11.171573,19,12C19,12.82843,18.328400000000002,13.5,17.5,13.5C16.846899999999998,13.5,16.2913,13.0826,16.0853,12.5L6.91465,12.5Z" stroke-opacity="0" stroke="none"></path></svg>'), Zc = () => jc.cloneNode(!0), Qc = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,12.41465L11,18.5C11,18.7761,11.22386,19,11.5,19C11.77614,19,12,18.7761,12,18.5L12,12.41465C12.5826,12.20873,13,11.65311,13,11C13,10.34689,12.5826,9.79127,12,9.58535L12,3.5C12,3.223857,11.77614,3,11.5,3C11.22386,3,11,3.223857,11,3.5L11,9.58535C10.417404,9.79127,10,10.34689,10,11C10,11.65311,10.417404,12.20873,11,12.41465Z" stroke-opacity="0" stroke="none"></path></svg>'), zc = () => Qc.cloneNode(!0), Uc = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.66558837890625,19C10.83716137890625,19,10.16558837890625,18.328400000000002,10.16558837890625,17.5C10.16558837890625,16.846899999999998,10.58298437890625,16.2913,11.16557337890625,16.0854L11.16557337890625,11.91464C10.58298437890625,11.70872,10.16558837890625,11.1531,10.16558837890625,10.5C10.16558837890625,9.8469,10.58298437890625,9.29128,11.16557337890625,9.08536L11.16557337890625,4.5C11.16557337890625,4.223857,11.38942837890625,4,11.66556837890625,4C11.94171837890625,4,12.16556837890625,4.223857,12.16556837890625,4.5L12.16556837890625,9.08535C12.74817837890625,9.291260000000001,13.16558837890625,9.846879999999999,13.16558837890625,10.5C13.16558837890625,11.153120000000001,12.74817837890625,11.708739999999999,12.16556837890625,11.91465L12.16556837890625,16.0854C12.74817837890625,16.2913,13.16558837890625,16.846899999999998,13.16558837890625,17.5C13.16558837890625,18.328400000000002,12.49401837890625,19,11.66558837890625,19Z" stroke-opacity="0" stroke="none"></path></svg>'), Rc = () => Uc.cloneNode(!0), Yc = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.165603637695312,6.91465C11.748203637695312,6.70873,12.165603637695312,6.15311,12.165603637695312,5.5C12.165603637695312,4.671573,11.494033637695313,4,10.665603637695312,4C9.837176637695313,4,9.165603637695312,4.671573,9.165603637695312,5.5C9.165603637695312,6.15311,9.583007637695312,6.70873,10.165603637695312,6.91465L10.165603637695312,16.0854C9.583007637695312,16.2913,9.165603637695312,16.846899999999998,9.165603637695312,17.5C9.165603637695312,18.328400000000002,9.837176637695313,19,10.665603637695312,19C11.494033637695313,19,12.165603637695312,18.328400000000002,12.165603637695312,17.5C12.165603637695312,16.846899999999998,11.748203637695312,16.2913,11.165603637695312,16.0854L11.165603637695312,6.91465Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Hc = () => Yc.cloneNode(!0), Vc = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.146447,15.753C4.9511845,15.9483,4.9511845,16.2649,5.146447,16.4602C5.341709,16.6554,5.658291,16.6554,5.853554,16.4602L8.156600000000001,14.15711C8.352409999999999,14.25082,8.57173,14.3033,8.8033,14.3033C9.631730000000001,14.3033,10.3033,13.63172,10.3033,12.80329C10.3033,12.57172,10.250820000000001,12.352409999999999,10.157119999999999,12.15659L12.156600000000001,10.15711C12.352409999999999,10.250820000000001,12.571729999999999,10.30329,12.8033,10.30329C13.63173,10.30329,14.3033,9.63172,14.3033,8.80329C14.3033,8.57172,14.25082,8.352409999999999,14.15712,8.15659L16.4602,5.853553C16.6554,5.658291,16.6554,5.341709,16.4602,5.146447C16.2649,4.9511843,15.9483,4.9511843,15.753,5.146447L13.45001,7.449479999999999C13.25419,7.35577,13.03487,7.3032900000000005,12.8033,7.3032900000000005C11.97487,7.3032900000000005,11.3033,7.97487,11.3033,8.80329C11.3033,9.03487,11.35578,9.254190000000001,11.44949,9.450009999999999L9.450009999999999,11.449480000000001C9.254190000000001,11.35577,9.03487,11.30329,8.8033,11.30329C7.97487,11.30329,7.3033,11.97487,7.3033,12.80329C7.3033,13.03487,7.35578,13.25419,7.44949,13.45001L5.146447,15.753Z" stroke-opacity="0" stroke="none"></path></svg>'), Gc = () => Vc.cloneNode(!0), Xc = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M7.573332939453125,14.54567903564453C7.667042939453125,14.741499035644532,7.719512939453125,14.960809035644532,7.719512939453125,15.19239903564453C7.719512939453125,16.02079903564453,7.047942939453125,16.69239903564453,6.219512939453125,16.69239903564453C5.391085939453125,16.69239903564453,4.719512939453125,16.02079903564453,4.719512939453125,15.19239903564453C4.719512939453125,14.36394903564453,5.391085939453125,13.692379035644532,6.219512939453125,13.692379035644532C6.451092939453125,13.692379035644532,6.670412939453125,13.74485903564453,6.866232939453125,13.83856903564453L9.865702939453126,10.83909903564453C9.771992939453124,10.643279035644532,9.719512939453125,10.42395903564453,9.719512939453125,10.192379035644532C9.719512939453125,9.36394903564453,10.391082939453124,8.692379035644532,11.219512939453125,8.692379035644532C11.451092939453126,8.692379035644532,11.670412939453126,8.74485903564453,11.866232939453125,8.838569035644532L15.462112939453124,5.242645035644531C15.657412939453126,5.047383335644532,15.974012939453125,5.047383335644532,16.169212939453125,5.242645035644531C16.364512939453125,5.437907035644531,16.364512939453125,5.754489035644531,16.169212939453125,5.949752035644531L12.573332939453124,9.545679035644532C12.667042939453125,9.74149903564453,12.719512939453125,9.96080903564453,12.719512939453125,10.192379035644532C12.719512939453125,11.020809035644533,12.047942939453126,11.692379035644532,11.219512939453125,11.692379035644532C10.987942939453125,11.692379035644532,10.768632939453125,11.639909035644532,10.572812939453126,11.54619903564453L7.573332939453125,14.54567903564453Z" stroke-opacity="0" stroke="none"></path></svg>'), Jc = () => Xc.cloneNode(!0), Wc = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M15.719512939453125,8.461776733398438C16.547912939453127,8.461776733398438,17.219512939453125,7.7902067333984375,17.219512939453125,6.9617767333984375C17.219512939453125,6.133349733398438,16.547912939453127,5.4617767333984375,15.719512939453125,5.4617767333984375C14.891082939453124,5.4617767333984375,14.219512939453125,6.133349733398438,14.219512939453125,6.9617767333984375C14.219512939453125,7.193346733398437,14.271992939453124,7.412666733398438,14.365692939453124,7.608486733398438L7.366222939453126,14.607956733398437C7.170402939453125,14.514256733398437,6.951082939453125,14.461776733398438,6.719512939453125,14.461776733398438C5.891085939453125,14.461776733398438,5.219512939453125,15.133346733398437,5.219512939453125,15.961776733398438C5.219512939453125,16.79017673339844,5.891085939453125,17.461776733398438,6.719512939453125,17.461776733398438C7.547942939453125,17.461776733398438,8.219512939453125,16.79017673339844,8.219512939453125,15.961776733398438C8.219512939453125,15.730176733398437,8.167032939453126,15.510876733398437,8.073322939453124,15.315066733398437L15.072802939453124,8.315586733398437C15.268612939453124,8.409296733398438,15.487912939453125,8.461776733398438,15.719512939453125,8.461776733398438Z" stroke-opacity="0" stroke="none"></path></svg>'), qc = () => Wc.cloneNode(!0), el = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17.0643,7.033864912109375L18,3.585784912109375L14.5078,4.509695912109375L15.3537,5.344934912109375L6.02026,14.560584912109375C5.87635,14.517484912109374,5.72366,14.494284912109375,5.5655,14.494284912109375C4.7009,14.494284912109375,4,15.186384912109375,4,16.040084912109375C4,16.893784912109375,4.7009,17.585784912109375,5.5655,17.585784912109375C6.43011,17.585784912109375,7.13101,16.893784912109375,7.13101,16.040084912109375C7.13101,15.722284912109375,7.03392,15.426984912109376,6.86744,15.181384912109374L16.0917,6.073604912109375L17.0643,7.033864912109375Z" stroke-opacity="0" stroke="none"></path></svg>'), tl = () => el.cloneNode(!0), nl = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,13.00505L18.5,13.00505C18.7761,13.00505,19,13.228909999999999,19,13.50505C19,13.781189999999999,18.7761,14.00505,18.5,14.00505L6.91465,14.00505C6.70873,14.58765,6.15311,15.00505,5.5,15.00505C4.671573,15.00505,4,14.33348,4,13.50505C4,12.67662,4.671573,12.00505,5.5,12.00505C6.15311,12.00505,6.70873,12.422450000000001,6.91465,13.00505ZM7.81404,11.625L10.48591,11.625L10.48591,10.90625L9.65193,10.90625L9.65193,7.125L8.997630000000001,7.125C8.71443,7.306641,8.415600000000001,7.419922,7.96443,7.498047L7.96443,8.05078L8.77497,8.05078L8.77497,10.90625L7.81404,10.90625L7.81404,11.625ZM11.081620000000001,11.625L14.0562,11.625L14.0562,10.88281L13.09724,10.88281C12.8863,10.88281,12.59333,10.90625,12.36482,10.93555C13.17537,10.11328,13.84724,9.2207,13.84724,8.39062C13.84724,7.541016,13.28865,7,12.4488,7C11.84333,7,11.446850000000001,7.234375,11.03279,7.679688L11.52497,8.16797C11.747630000000001,7.914062,12.0113,7.697266,12.33552,7.697266C12.7613,7.697266,13.00154,7.982422,13.00154,8.43359C13.00154,9.14648,12.29255,10.00781,11.081620000000001,11.11523L11.081620000000001,11.625ZM15.9605,11.75C16.8121,11.75,17.526899999999998,11.2832,17.526899999999998,10.4375C17.526899999999998,9.82031,17.142200000000003,9.43945,16.6441,9.30078L16.6441,9.27148C17.1129,9.08594,17.3824,8.7207,17.3824,8.21289C17.3824,7.421875,16.8004,7,15.9429,7C15.4215,7,14.9957,7.210938,14.6109,7.541016L15.066,8.11133C15.3258,7.849609,15.5836,7.697266,15.9019,7.697266C16.2789,7.697266,16.4957,7.914062,16.4957,8.28125C16.4957,8.70898,16.2301,9,15.4215,9L15.4215,9.63672C16.3804,9.63672,16.6383,9.91992,16.6383,10.38086C16.6383,10.79688,16.3336,11.03125,15.8824,11.03125C15.4742,11.03125,15.1578,10.82227,14.8922,10.55078L14.4781,11.13281C14.7906,11.486329999999999,15.2652,11.75,15.9605,11.75Z" stroke-opacity="0" stroke="none"></path></svg>'), rl = () => nl.cloneNode(!0), al = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.146447,14.178126025390625C2.9511847,13.982826025390626,2.9511847,13.666226025390625,3.146447,13.470926025390625L7.39146,9.225966025390626C7.35417,9.095106025390624,7.33421,8.956946025390625,7.33421,8.814116025390625C7.33421,7.985696025390625,8.00578,7.314116025390625,8.834209999999999,7.314116025390625C8.97703,7.314116025390625,9.11519,7.334086025390625,9.24605,7.371366025390625L13.753,2.864373025390625C13.9483,2.669110325390625,14.2649,2.669110325390625,14.4602,2.864373025390625C14.6554,3.059635025390625,14.6554,3.376217025390625,14.4602,3.571479025390625L10.06916,7.962476025390625C10.23631,8.204386025390626,10.334209999999999,8.497826025390625,10.334209999999999,8.814116025390625C10.334209999999999,9.642546025390626,9.66264,10.314116025390625,8.834209999999999,10.314116025390625C8.51791,10.314116025390625,8.22448,10.216226025390625,7.98256,10.049076025390626L3.853554,14.178126025390625C3.658291,14.373326025390625,3.341709,14.373326025390625,3.146447,14.178126025390625ZM7.67736,19.188526025390626C7.4821,18.993226025390626,7.4821,18.676626025390625,7.67736,18.481426025390626L9.9804,16.178326025390625C9.88669,15.982526025390625,9.834209999999999,15.763226025390624,9.834209999999999,15.531626025390626C9.834209999999999,14.703226025390626,10.50578,14.031626025390626,11.33421,14.031626025390626C11.56579,14.031626025390626,11.78511,14.084126025390624,11.98093,14.177826025390624L13.9804,12.178356025390626C13.8867,11.982536025390624,13.8342,11.763216025390625,13.8342,11.531636025390625C13.8342,10.703206025390624,14.5058,10.031636025390625,15.3342,10.031636025390625C15.5658,10.031636025390625,15.7851,10.084116025390625,15.9809,10.177826025390626L18.284,7.874796025390625C18.4792,7.679536025390625,18.7958,7.679536025390625,18.9911,7.874796025390625C19.1863,8.070056025390624,19.1863,8.386636025390626,18.9911,8.581906025390625L16.688000000000002,10.884936025390624C16.7817,11.080756025390626,16.8342,11.300066025390626,16.8342,11.531636025390625C16.8342,12.360066025390624,16.162599999999998,13.031626025390626,15.3342,13.031626025390626C15.1026,13.031626025390626,14.8833,12.979126025390626,14.6875,12.885426025390625L12.68803,14.884926025390625C12.78174,15.080726025390625,12.83421,15.300026025390626,12.83421,15.531626025390626C12.83421,16.360026025390624,12.16264,17.031626025390626,11.33421,17.031626025390626C11.10264,17.031626025390626,10.88333,16.979126025390627,10.68751,16.885426025390625L8.38446,19.188526025390626C8.1892,19.383726025390626,7.87262,19.383726025390626,7.67736,19.188526025390626Z" stroke-opacity="0" stroke="none"></path></svg>'), il = () => al.cloneNode(!0), sl = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.3367688759765626,12.63173C3.5320318759765623,12.82699,3.8486138759765627,12.82699,4.043876875976562,12.63173L11.822052875976562,4.853553C12.017312875976563,4.658291,12.017312875976563,4.341708,11.822052875976562,4.146446C11.626792875976562,3.9511843,11.310202875976563,3.9511843,11.114942875976563,4.146446L3.3367688759765626,11.92462C3.1415071759765625,12.11988,3.1415071759765625,12.43647,3.3367688759765626,12.63173ZM5.001492875976562,17.0351C4.806232875976562,16.8399,4.806232875976562,16.5233,5.001492875976562,16.328L7.304532875976562,14.025C7.210822875976563,13.82916,7.158352875976563,13.60984,7.158352875976563,13.37827C7.158352875976563,12.54984,7.829922875976562,11.87827,8.658352875976561,11.87827C8.889922875976563,11.87827,9.109232875976563,11.93075,9.305052875976562,12.02446L11.304532875976562,10.02498C11.210822875976563,9.82916,11.158352875976561,9.60984,11.158352875976561,9.37827C11.158352875976561,8.54984,11.829922875976562,7.8782700000000006,12.658352875976563,7.8782700000000006C12.889922875976563,7.8782700000000006,13.109232875976563,7.93075,13.305022875976562,8.024460000000001L15.608122875976562,5.72142C15.803322875976562,5.5261499999999995,16.119922875976563,5.5261499999999995,16.315222875976563,5.72142C16.510422875976563,5.9166799999999995,16.510422875976563,6.23326,16.315222875976563,6.42852L14.012122875976562,8.73156C14.105822875976562,8.92738,14.158322875976562,9.1467,14.158322875976562,9.37827C14.158322875976562,10.2067,13.486822875976562,10.87827,12.658352875976563,10.87827C12.426772875976562,10.87827,12.207452875976562,10.82579,12.011642875976563,10.73209L10.012162875976562,12.73156C10.105872875976562,12.92738,10.158352875976561,13.1467,10.158352875976561,13.37827C10.158352875976561,14.2067,9.486772875976563,14.8783,8.658352875976561,14.8783C8.426772875976562,14.8783,8.207452875976562,14.8258,8.011642875976563,14.7321L5.708602875976562,17.0351C5.513342875976562,17.2304,5.196752875976562,17.2304,5.001492875976562,17.0351ZM10.415712875976563,18.328C10.220452875976562,18.5233,9.903862875976563,18.5233,9.708602875976563,18.328C9.513342875976562,18.1328,9.513342875976562,17.816200000000002,9.708602875976563,17.6209L12.304532875976562,15.025C12.210822875976563,14.8292,12.158352875976563,14.6098,12.158352875976563,14.3783C12.158352875976563,13.54984,12.829922875976562,12.87827,13.658322875976562,12.87827C13.889922875976563,12.87827,14.109222875976563,12.93075,14.305022875976562,13.02446L17.486822875976564,9.84274C17.682022875976564,9.64747,17.99862287597656,9.64747,18.19392287597656,9.84274C18.38912287597656,10.038,18.38912287597656,10.35458,18.19392287597656,10.54984L15.012122875976562,13.73156C15.105822875976562,13.92738,15.158322875976562,14.1467,15.158322875976562,14.3783C15.158322875976562,15.2067,14.486822875976562,15.8783,13.658322875976562,15.8783C13.426822875976562,15.8783,13.207422875976562,15.8258,13.011642875976563,15.7321L10.415712875976563,18.328Z" stroke-opacity="0" stroke="none"></path></svg>'), ol = () => sl.cloneNode(!0), cl = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M13.1889,6C12.98303,6.582599999999999,12.42741,7,11.7743,7C11.12119,7,10.565570000000001,6.582599999999999,10.35965,6L3.5,6C3.223857,6,3,5.77614,3,5.5C3,5.22386,3.223857,5,3.5,5L10.35965,5C10.565570000000001,4.417404,11.12119,4,11.7743,4C12.42741,4,12.98303,4.417404,13.1889,5L18.5,5C18.7761,5,19,5.22386,19,5.5C19,5.77614,18.7761,6,18.5,6L13.1889,6ZM3,8.5C3,8.22386,3.223857,8,3.5,8L18.5,8C18.7761,8,19,8.22386,19,8.5C19,8.77614,18.7761,9,18.5,9L3.5,9C3.223857,9,3,8.77614,3,8.5ZM3.278549,11.5C3.278549,11.22386,3.502407,11,3.778549,11L18.7785,11C19.0547,11,19.2785,11.22386,19.2785,11.5C19.2785,11.77614,19.0547,12,18.7785,12L3.778549,12C3.502407,12,3.278549,11.77614,3.278549,11.5ZM3.139267,14.5C3.139267,14.2239,3.363124,14,3.6392670000000003,14L18.6393,14C18.915399999999998,14,19.1393,14.2239,19.1393,14.5C19.1393,14.7761,18.915399999999998,15,18.6393,15L3.6392670000000003,15C3.363124,15,3.139267,14.7761,3.139267,14.5ZM13.1889,18C12.98303,18.5826,12.42741,19,11.7743,19C11.12119,19,10.565570000000001,18.5826,10.35965,18L3.778549,18C3.502407,18,3.278549,17.7761,3.278549,17.5C3.278549,17.2239,3.502407,17,3.778549,17L10.35965,17C10.565570000000001,16.4174,11.12119,16,11.7743,16C12.42741,16,12.98303,16.4174,13.1889,17L18.7785,17C19.0547,17,19.2785,17.2239,19.2785,17.5C19.2785,17.7761,19.0547,18,18.7785,18L13.1889,18Z" stroke-opacity="0" stroke="none"></path></svg>'), ll = () => cl.cloneNode(!0), ul = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4.91465,6C4.70873,6.582599999999999,4.15311,7,3.5,7C2.671573,7,2,6.32843,2,5.5C2,4.671573,2.671573,4,3.5,4C4.15311,4,4.70873,4.417404,4.91465,5L18.2257,5C18.5018,5,18.7257,5.22386,18.7257,5.5C18.7257,5.77614,18.5018,6,18.2257,6L4.91465,6ZM2.7257,8.5C2.7257,8.22386,2.949558,8,3.2257,8L18.2257,8C18.5018,8,18.7257,8.22386,18.7257,8.5C18.7257,8.77614,18.5018,9,18.2257,9L3.2257,9C2.949558,9,2.7257,8.77614,2.7257,8.5ZM3.00425,11.5C3.00425,11.22386,3.22811,11,3.50425,11L18.5042,11C18.7804,11,19.0042,11.22386,19.0042,11.5C19.0042,11.77614,18.7804,12,18.5042,12L3.50425,12C3.22811,12,3.00425,11.77614,3.00425,11.5ZM2.864967,14.5C2.864967,14.2239,3.08882,14,3.36497,14L18.365,14C18.6411,14,18.865,14.2239,18.865,14.5C18.865,14.7761,18.6411,15,18.365,15L3.36497,15C3.08882,15,2.864967,14.7761,2.864967,14.5ZM20,17.5C20,18.328400000000002,19.3284,19,18.5,19C17.846899999999998,19,17.2913,18.5826,17.0854,18L3.50425,18C3.22811,18,3.00425,17.7761,3.00425,17.5C3.00425,17.2239,3.22811,17,3.50425,17L17.0854,17C17.2913,16.4174,17.846899999999998,16,18.5,16C19.3284,16,20,16.671599999999998,20,17.5Z" stroke-opacity="0" stroke="none"></path></svg>'), fl = () => ul.cloneNode(!0), dl = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="5" ry="5" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="3" ry="3" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse></svg>'), Cl = () => dl.cloneNode(!0), hl = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3,7.32468C5.90649,3.3893050000000002,11.49833,2.81306,14.6674,6.31944C14.9056,6.1554199999999994,15.192,6.05979,15.5,6.05979C15.845,6.05979,16.1628,6.17974,16.4162,6.381349999999999L18.4509,4.23827L19,4.816615L16.8945,7.03429C16.962600000000002,7.21075,17,7.40319,17,7.60463C17,8.45782,16.328400000000002,9.14947,15.5,9.14947C14.6716,9.14947,14,8.45782,14,7.60463C14,7.36402,14.0534,7.13625,14.1487,6.93322C11.32695,3.748365,6.25159,4.253956,3.612785,7.82695L3,7.32468ZM14.09,15.4717C15.7427,13.78985,16.244500000000002,11.524740000000001,15.5633,9.30134L15.5618,9.30134L16.3012,9.0502C17.072400000000002,11.56646,16.497700000000002,14.158,14.6282,16.0599C12.28737,18.442,8.62386,18.6988,6.41348,16.4501C4.5526,14.5572,4.52076,11.19671,6.36766,9.3177C7.89069,7.76754,10.07544,7.706189999999999,11.56741,9.22363C11.95453,9.61742,12.24817,10.08363,12.43369,10.57677L14.1451,8.77421L14.6942,9.35256L12.64982,11.50582C12.65827,11.59712,12.66295,11.68839,12.66378,11.77936C12.87398,12.04523,13,12.38451,13,12.7541C13,13.60729,12.32843,14.2989,11.5,14.2989C10.67157,14.2989,10,13.60729,10,12.7541C10,11.90091,10.67157,11.20926,11.5,11.20926C11.60387,11.20926,11.70528,11.220130000000001,11.8032,11.240829999999999L11.81763,11.22564C11.69858,10.71874,11.42858,10.21929,11.0284,9.81179C9.844000000000001,8.60765,8.136890000000001,8.65592,6.90822,9.90586C5.37975,11.460930000000001,5.40693,14.288,6.95404,15.8619C8.84598,17.7867,12.03496,17.5626,14.09,15.4717Z" stroke-opacity="0" stroke="none"></path></svg>'), gl = () => hl.cloneNode(!0), yl = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4,17.0854L4,3.5C4,3.223858,4.22386,3,4.5,3C4.77614,3,5,3.223858,5,3.5L5,10L7.57584,10L9.8127,4.46359C9.91614,4.20756,10.20756,4.08386,10.46359,4.1873000000000005C10.71963,4.29075,10.84333,4.58216,10.73988,4.8382000000000005L8.65438,10L11.08535,10C11.29127,9.4174,11.84689,9,12.5,9C12.65154,9,12.79784,9.02247,12.93573,9.06427L16.6464,5.35355C16.8417,5.15829,17.1583,5.15829,17.3536,5.35355C17.5488,5.54882,17.5488,5.8654,17.3536,6.06066L13.7475,9.66675C13.907,9.90508,14,10.19168,14,10.5C14,11.15311,13.5826,11.70873,13,11.91465L13,14.3638L18.3714,12.1936C18.6274,12.09015,18.918799999999997,12.21385,19.0222,12.46989C19.1257,12.72592,19.002,13.0173,18.746000000000002,13.1208L13,15.4423L13,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854ZM6.3729499999999994,17.0413L12,14.7678L12,11.91465C11.88136,11.87271,11.76956,11.81627,11.66675,11.74746L6.3729499999999994,17.0413ZM12,15.8463L6.6694700000000005,18L12,18L12,15.8463ZM6.38629,15.6137L8.250350000000001,11L11,11L6.38629,15.6137ZM5,11L7.17182,11L5,16.3754L5,11Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), pl = () => yl.cloneNode(!0), ml = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17,4.5C17,5.32843,16.328400000000002,6,15.5,6C15.0931,6,14.7241,5.83802,14.4539,5.57503L5.98992,8.32515C5.99658,8.38251,6,8.440850000000001,6,8.5C6,9.15311,5.582599999999999,9.70873,5,9.91465L5,11.08535C5.42621,11.236,5.763999999999999,11.57379,5.91465,12L19.5,12C19.7761,12,20,12.22386,20,12.5C20,12.77614,19.7761,13,19.5,13L5.91465,13C5.70873,13.5826,5.15311,14,4.5,14C3.671573,14,3,13.3284,3,12.5C3,11.84689,3.417404,11.29127,4,11.08535L4,9.91465C3.417404,9.70873,3,9.15311,3,8.5C3,7.67157,3.671573,7,4.5,7C4.90411,7,5.2709,7.15981,5.5406200000000005,7.41967L14.0093,4.66802C14.0032,4.6128599999999995,14,4.5568,14,4.5C14,3.671573,14.6716,3,15.5,3C16.328400000000002,3,17,3.671573,17,4.5ZM4,15.5C4,15.2239,4.22386,15,4.5,15L19.5,15C19.7761,15,20,15.2239,20,15.5C20,15.7761,19.7761,16,19.5,16L4.5,16C4.22386,16,4,15.7761,4,15.5ZM4,18.5C4,18.2239,4.22386,18,4.5,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L4.5,19C4.22386,19,4,18.7761,4,18.5Z" stroke-opacity="0" stroke="none"></path></svg>'), vl = () => ml.cloneNode(!0), _l = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M20,3.5C20,4.15311,19.5826,4.70873,19,4.91465L19,18.5C19,18.7761,18.7761,19,18.5,19L4.91465,19C4.70873,19.5826,4.15311,20,3.5,20C2.671573,20,2,19.3284,2,18.5C2,17.846899999999998,2.417404,17.2913,3,17.0854L3,3.5C3,3.22386,3.22386,3,3.5,3L17.0854,3C17.2913,2.417404,17.846899999999998,2,18.5,2C19.3284,2,20,2.671573,20,3.5ZM17.0854,4C17.236,4.42621,17.5738,4.763999999999999,18,4.91465L18,8L14,8L14,4L17.0854,4ZM13,4L13,8L9,8L9,4L13,4ZM13,9L9,9L9,13L13,13L13,9ZM13,14L9,14L9,18L13,18L13,14ZM14,18L14,14L18,14L18,18L14,18ZM18,13L14,13L14,9L18,9L18,13ZM4.91465,18C4.763999999999999,17.5738,4.42621,17.236,4,17.0854L4,14L8,14L8,18L4.91465,18ZM4,8L4,4L8,4L8,8L4,8ZM8,9L8,13L4,13L4,9L8,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Ll = () => _l.cloneNode(!0), $l = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" fill="none" stroke-opacity="1" stroke-width="1"></ellipse></svg>'), bl = () => $l.cloneNode(!0), xl = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.57625,6.9981C11.55099,6.999359999999999,11.52557,7,11.5,7C11.34,7,11.18584,6.97495,11.04125,6.9285499999999995L5.55401,16.4327C5.713760000000001,16.5905,5.83826,16.7839,5.91465,17L16.0854,17C16.2187,16.622700000000002,16.4987,16.314700000000002,16.8569,16.1445L11.57625,6.9981ZM12.50759,6.611219999999999C12.81005,6.336790000000001,13,5.94058,13,5.5C13,4.671573,12.32843,4,11.5,4C10.67157,4,10,4.671573,10,5.5C10,5.80059,10.08841,6.08052,10.24066,6.31522L4.64514,16.0069C4.59738,16.002299999999998,4.54896,16,4.5,16C3.671573,16,3,16.671599999999998,3,17.5C3,18.328400000000002,3.671573,19,4.5,19C5.15311,19,5.70873,18.5826,5.91465,18L16.0854,18C16.2913,18.5826,16.846899999999998,19,17.5,19C18.328400000000002,19,19,18.328400000000002,19,17.5C19,16.8365,18.5691,16.2735,17.971899999999998,16.075699999999998L12.50759,6.611219999999999Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), kl = () => xl.cloneNode(!0), Al = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19,4.5C19,5.15311,18.5826,5.70873,18,5.91465L18,18.5C18,18.7761,17.7761,19,17.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854L4,4.5C4,4.22386,4.22386,4,4.5,4L16.0854,4C16.2913,3.417404,16.846899999999998,3,17.5,3C18.328400000000002,3,19,3.671573,19,4.5ZM5,5L16.0854,5C16.236,5.42621,16.5738,5.763999999999999,17,5.91465L17,18L5.91465,18C5.763999999999999,17.5738,5.42621,17.236,5,17.0854L5,5Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), wl = () => Al.cloneNode(!0), Ml = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19.6401,7.99355C20.4028,7.92291,21,7.2811900000000005,21,6.5C21,5.671573,20.3284,5,19.5,5C18.8469,5,18.2913,5.417404,18.0854,6L7.62067,6C7.34453,6,7.12067,6.22386,7.12067,6.5C7.12067,6.5479,7.12741,6.59423,7.13999,6.63809L3.2294099999999997,15.0243C2.530138,15.1517,2,15.764,2,16.5C2,17.328400000000002,2.671573,18,3.5,18C4.15311,18,4.70873,17.5826,4.91465,17L14.5963,17C14.6456,17.076,14.7162,17.1396,14.8044,17.1807C15.0546,17.2974,15.3521,17.1891,15.4688,16.9388L19.6401,7.99355ZM14.7896,16.0293L18.6551,7.739599999999999C18.3942,7.56144,18.1925,7.30307,18.0854,7L8.0746,7L4.25044,15.2009C4.55701,15.3784,4.79493,15.6613,4.91465,16L14.6207,16C14.68,16,14.7368,16.0103,14.7896,16.0293Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Sl = () => Ml.cloneNode(!0), Il = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.134443814697265,7.494615087890625L8.764323814697265,7.494615087890625L8.764323814697265,3.414215087890625L8.310223814697267,3.414215087890625L7.294603814697266,4.005035087890625L7.289713814697266,4.634915087890625L8.134443814697265,4.149892087890625L8.134443814697265,7.494615087890625ZM18.832003814697266,6.933095087890624Q19.004603814697266,6.635245087890625,19.004603814697266,6.2543850878906255Q19.004603814697266,5.884915087890625,18.845103814697264,5.593575087890625Q18.685503814697267,5.3006050878906255,18.399103814697266,5.136225087890625Q18.114303814697266,4.9702050878906245,17.754603814697266,4.9653250878906245L18.820603814697265,3.840647087890625L18.820603814697265,3.414215087890625L16.519203814697264,3.414215087890625L16.519203814697264,3.939931087890625L18.050803814697264,3.939931087890625L16.719403814697266,5.334785087890625L17.074203814697263,5.7205350878906245Q17.254903814697265,5.484525087890625,17.619503814697268,5.484525087890625Q17.980803814697268,5.484525087890625,18.187503814697266,5.689605087890625Q18.394203814697267,5.894685087890625,18.394203814697267,6.2543850878906255Q18.394203814697267,6.604315087890625,18.187503814697266,6.822415087890625Q17.980803814697268,7.0405150878906255,17.640603814697265,7.0405150878906255Q17.334603814697267,7.0405150878906255,17.124703814697266,6.890775087890625Q16.914703814697265,6.739415087890626,16.820303814697265,6.469225087890624L16.354803814697263,6.744295087890626Q16.480103814697266,7.125155087890625,16.821903814697265,7.341625087890625Q17.165403814697264,7.559725087890625,17.640603814697265,7.559725087890625Q18.039403814697266,7.559725087890625,18.348603814697267,7.393705087890625Q18.659503814697267,7.229315087890625,18.832003814697266,6.933095087890624ZM10.000003814697266,10.634915087890626C10.000003814697266,11.024655087890626,9.851363814697265,11.379685087890625,9.607683814697266,11.646395087890625L12.168903814697266,15.171615087890626C12.275403814697265,15.147615087890625,12.386203814697266,15.134915087890626,12.500003814697266,15.134915087890626C12.596503814697266,15.134915087890626,12.690803814697265,15.144015087890624,12.782303814697265,15.161415087890624L16.108803814697268,11.196955087890625C16.038703814697264,11.023375087890624,16.000003814697266,10.833655087890625,16.000003814697266,10.634915087890626C16.000003814697266,9.806495087890625,16.671603814697264,9.134915087890626,17.500003814697266,9.134915087890626C18.328403814697264,9.134915087890626,19.000003814697266,9.806495087890625,19.000003814697266,10.634915087890626C19.000003814697266,11.463345087890625,18.328403814697264,12.134915087890626,17.500003814697266,12.134915087890626C17.239503814697265,12.134915087890626,16.994503814697268,12.068495087890625,16.781003814697264,11.951675087890624L13.654703814697266,15.677415087890624C13.870303814697266,15.937215087890625,14.000003814697266,16.270915087890625,14.000003814697266,16.634915087890626C14.000003814697266,17.463315087890624,13.328403814697266,18.134915087890626,12.500003814697266,18.134915087890626C11.671573814697265,18.134915087890626,11.000003814697266,17.463315087890624,11.000003814697266,16.634915087890626C11.000003814697266,16.284415087890626,11.120193814697265,15.962015087890626,11.321603814697266,15.706715087890625L8.715393814697265,12.119565087890624C8.645053814697267,12.129685087890625,8.573143814697266,12.134915087890626,8.500003814697266,12.134915087890626C8.162103814697264,12.134915087890626,7.8503038146972655,12.023195087890626,7.599523814697266,11.834665087890626L4.505583814697266,15.521915087890624C4.809213814697266,15.796415087890624,5.000003814697266,16.193415087890624,5.000003814697266,16.634915087890626C5.000003814697266,17.463315087890624,4.328433814697266,18.134915087890626,3.5000038146972656,18.134915087890626C2.6715768146972656,18.134915087890626,2.0000038146972656,17.463315087890624,2.0000038146972656,16.634915087890626C2.0000038146972656,15.806515087890626,2.6715768146972656,15.134915087890626,3.5000038146972656,15.134915087890626C3.508253814697266,15.134915087890626,3.5164838146972657,15.135015087890626,3.524703814697266,15.135115087890625L7.033823814697266,10.953115087890625C7.011673814697265,10.850565087890626,7.000003814697266,10.744105087890624,7.000003814697266,10.634915087890626C7.000003814697266,9.806495087890625,7.671573814697266,9.134915087890626,8.500003814697266,9.134915087890626C9.328433814697267,9.134915087890626,10.000003814697266,9.806495087890625,10.000003814697266,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Tl = () => Il.cloneNode(!0), Dl = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.13444,7.494615087890625L8.76432,7.494615087890625L8.76432,3.414215087890625L8.310220000000001,3.414215087890625L7.2946,4.005035087890625L7.28971,4.634915087890625L8.13444,4.149892087890625L8.13444,7.494615087890625ZM18.832,6.929835087890625Q19.0046,6.635245087890625,19.0046,6.2543850878906255Q19.0046,5.889805087890625,18.8451,5.5952050878906245Q18.6855,5.3006050878906255,18.3975,5.132965087890625Q18.1094,4.9653250878906245,17.7399,4.9653250878906245Q17.435499999999998,4.9653250878906245,17.1556,5.149245087890625L17.2793,3.939931087890625L18.8304,3.939931087890625L18.8304,3.414215087890625L16.7406,3.414215087890625L16.5094,5.665195087890625L17.0156,5.795405087890625Q17.095399999999998,5.655425087890626,17.2516,5.570795087890625Q17.4095,5.484525087890625,17.6357,5.484525087890625Q17.9694,5.484525087890625,18.1842,5.697745087890625Q18.4007,5.909335087890625,18.4007,6.2543850878906255Q18.4007,6.604315087890625,18.1842,6.822415087890625Q17.9694,7.0405150878906255,17.6292,7.0405150878906255Q17.3298,7.0405150878906255,17.119799999999998,6.890775087890625Q16.9098,6.739415087890626,16.825200000000002,6.474115087890625L16.3597,6.749175087890626Q16.470399999999998,7.110505087890624,16.807299999999998,7.335115087890625Q17.144199999999998,7.559725087890625,17.6292,7.559725087890625Q18.0296,7.559725087890625,18.3438,7.392075087890625Q18.6595,7.224435087890625,18.832,6.929835087890625ZM10,10.634915087890626C10,11.024655087890626,9.85136,11.379685087890625,9.60768,11.646395087890625L12.1689,15.171615087890626C12.2754,15.147615087890625,12.3862,15.134915087890626,12.5,15.134915087890626C12.5965,15.134915087890626,12.6908,15.144015087890624,12.7823,15.161415087890624L16.108800000000002,11.196955087890625C16.0387,11.023375087890624,16,10.833655087890625,16,10.634915087890626C16,9.806495087890625,16.671599999999998,9.134915087890626,17.5,9.134915087890626C18.3284,9.134915087890626,19,9.806495087890625,19,10.634915087890626C19,11.463345087890625,18.3284,12.134915087890626,17.5,12.134915087890626C17.2395,12.134915087890626,16.994500000000002,12.068505087890625,16.781,11.951675087890624L13.6547,15.677415087890624C13.8703,15.937215087890625,14,16.270915087890625,14,16.634915087890626C14,17.463315087890624,13.3284,18.134915087890626,12.5,18.134915087890626C11.67157,18.134915087890626,11,17.463315087890624,11,16.634915087890626C11,16.284415087890626,11.12019,15.962015087890626,11.3216,15.706715087890625L8.71539,12.119565087890624C8.645050000000001,12.129685087890625,8.57314,12.134915087890626,8.5,12.134915087890626C8.162099999999999,12.134915087890626,7.8503,12.023195087890626,7.59952,11.834665087890626L4.50558,15.521915087890624C4.80921,15.796415087890624,5,16.193415087890624,5,16.634915087890626C5,17.463315087890624,4.32843,18.134915087890626,3.5,18.134915087890626C2.671573,18.134915087890626,2,17.463315087890624,2,16.634915087890626C2,15.806515087890626,2.671573,15.134915087890626,3.5,15.134915087890626C3.5082500000000003,15.134915087890626,3.51648,15.135015087890626,3.5247,15.135115087890625L7.03382,10.953115087890625C7.01167,10.850565087890626,7,10.744105087890624,7,10.634915087890626C7,9.806495087890625,7.67157,9.134915087890626,8.5,9.134915087890626C9.32843,9.134915087890626,10,9.806495087890625,10,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Nl = () => Dl.cloneNode(!0), Pl = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M18.8532,7.020985087890625Q19.0257,6.734525087890625,19.0257,6.369945087890625Q19.0257,6.020005087890625,18.8499,5.754705087890625Q18.6758,5.489415087890626,18.3649,5.339675087890625Q18.5944,5.209465087890625,18.7214,4.994615087890625Q18.8499,4.779775087890625,18.8499,4.5193550878906255Q18.8499,4.2003480878906245,18.7002,3.951324087890625Q18.5505,3.700673087890625,18.277,3.557444087890625Q18.0052,3.414215087890625,17.6455,3.414215087890625Q17.285800000000002,3.414215087890625,17.0107,3.557444087890625Q16.7357,3.700673087890625,16.5843,3.951324087890625Q16.4346,4.2003480878906245,16.4346,4.5193550878906255Q16.4346,4.779775087890625,16.561500000000002,4.994615087890625Q16.6901,5.209465087890625,16.919600000000003,5.339675087890625Q16.6055,5.489415087890626,16.4297,5.757965087890625Q16.255499999999998,6.024895087890625,16.255499999999998,6.369945087890625Q16.255499999999998,6.734525087890625,16.4297,7.020985087890625Q16.6055,7.305815087890625,16.919600000000003,7.465325087890625Q17.2354,7.624825087890625,17.6455,7.624825087890625Q18.0557,7.624825087890625,18.3682,7.465325087890625Q18.6807,7.305815087890625,18.8532,7.020985087890625ZM8.76432,7.559725087890625L8.13444,7.559725087890625L8.13444,4.214996087890625L7.28971,4.700025087890625L7.2946,4.070139087890625L8.310220000000001,3.479319087890625L8.76432,3.479319087890625L8.76432,7.559725087890625ZM17.1816,4.955555087890625Q17.0042,4.784655087890625,17.0042,4.5095950878906255Q17.0042,4.229645087890625,17.18,4.057119087890625Q17.355800000000002,3.884592087890625,17.6455,3.884592087890625Q17.935200000000002,3.884592087890625,18.1077,4.057119087890625Q18.2803,4.229645087890625,18.2803,4.5095950878906255Q18.2803,4.784655087890625,18.1045,4.955555087890625Q17.930300000000003,5.124825087890625,17.6455,5.124825087890625Q17.3607,5.124825087890625,17.1816,4.955555087890625ZM18.2217,5.7953950878906255Q18.4398,6.005365087890625,18.4398,6.3552950878906245Q18.4398,6.705235087890625,18.2217,6.915195087890625Q18.0052,7.125155087890625,17.6455,7.125155087890625Q17.285800000000002,7.125155087890625,17.067700000000002,6.915195087890625Q16.849600000000002,6.705235087890625,16.849600000000002,6.3552950878906245Q16.849600000000002,6.005365087890625,17.064500000000002,5.7953950878906255Q17.2793,5.585435087890625,17.6455,5.585435087890625Q18.0052,5.585435087890625,18.2217,5.7953950878906255ZM9.60768,11.711495087890626C9.85136,11.444785087890626,10,11.089765087890626,10,10.700025087890625C10,9.871595087890626,9.32843,9.200025087890625,8.5,9.200025087890625C7.67157,9.200025087890625,7,9.871595087890626,7,10.700025087890625C7,10.809205087890625,7.01167,10.915665087890625,7.03382,11.018215087890624L3.5247,15.200215087890625C3.51648,15.200115087890625,3.5082500000000003,15.200015087890625,3.5,15.200015087890625C2.671573,15.200015087890625,2,15.871615087890625,2,16.700015087890627C2,17.528415087890625,2.671573,18.200015087890627,3.5,18.200015087890627C4.32843,18.200015087890627,5,17.528415087890625,5,16.700015087890627C5,16.258515087890625,4.80921,15.861515087890625,4.50558,15.587015087890626L7.59952,11.899765087890625C7.8503,12.088295087890625,8.162099999999999,12.200025087890625,8.5,12.200025087890625C8.57314,12.200025087890625,8.645050000000001,12.194785087890626,8.71539,12.184675087890625L11.3216,15.771815087890625C11.12019,16.027215087890625,11,16.349515087890623,11,16.700015087890627C11,17.528415087890625,11.67157,18.200015087890627,12.5,18.200015087890627C13.3284,18.200015087890627,14,17.528415087890625,14,16.700015087890627C14,16.336015087890623,13.8703,16.002315087890626,13.6547,15.742515087890625L16.781,12.016775087890625C16.994500000000002,12.133605087890626,17.2395,12.200025087890625,17.5,12.200025087890625C18.3284,12.200025087890625,19,11.528445087890624,19,10.700025087890625C19,9.871595087890626,18.3284,9.200025087890625,17.5,9.200025087890625C16.671599999999998,9.200025087890625,16,9.871595087890626,16,10.700025087890625C16,10.898765087890624,16.0387,11.088475087890625,16.108800000000002,11.262055087890625L12.7823,15.226515087890625C12.6908,15.209115087890625,12.5965,15.200015087890625,12.5,15.200015087890625C12.3862,15.200015087890625,12.2754,15.212715087890626,12.1689,15.236715087890625L9.60768,11.711495087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Ol = () => Pl.cloneNode(!0), Bl = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M9.474616630859375,7.494615087890625L8.844736630859375,7.494615087890625L8.844736630859375,4.149892087890625L8.000006630859374,4.634915087890625L8.004896630859374,4.005035087890625L9.020516630859376,3.414215087890625L9.474616630859375,3.414215087890625L9.474616630859375,7.494615087890625ZM18.529296630859378,4.8318550878906255Q18.307996630859375,5.028795087890625,18.122396630859377,5.385245087890625Q17.868496630859376,5.019035087890625,17.629196630859376,4.8269750878906255Q17.389996630859375,4.634915087890625,17.168596630859376,4.634915087890625Q16.794296630859375,4.634915087890625,16.522496630859376,4.976715087890625Q16.252296630859377,5.3168850878906255,16.252296630859377,5.7856350878906255Q16.252296630859377,6.218575087890625,16.502896630859375,6.521315087890625Q16.755196630859373,6.822415087890625,17.114896630859377,6.822415087890625Q17.368796630859375,6.822415087890625,17.588596630859374,6.625475087890624Q17.809896630859377,6.428535087890625,17.998696630859374,6.0688350878906245Q18.249396630859373,6.439935087890625,18.488596630859377,6.631985087890625Q18.727896630859377,6.822415087890625,18.952496630859375,6.822415087890625Q19.326796630859373,6.822415087890625,19.596996630859376,6.482245087890625Q19.868796630859375,6.140455087890626,19.868796630859375,5.671705087890626Q19.868796630859375,5.238755087890625,19.618196630859376,4.937655087890625Q19.367496630859375,4.634915087890625,19.006196630859375,4.634915087890625Q18.750696630859377,4.634915087890625,18.529296630859378,4.8318550878906255ZM18.337296630859377,5.674955087890625L18.278696630859375,5.596835087890625Q18.449596630859375,5.272935087890625,18.622096630859374,5.1101750878906245Q18.794596630859374,4.947415087890625,18.967096630859373,4.947415087890625Q19.194996630859375,4.947415087890625,19.346396630859374,5.1345950878906255Q19.497696630859377,5.320135087890625,19.497696630859377,5.598455087890625Q19.497696630859377,5.8914250878906245,19.360996630859376,6.096505087890625Q19.224296630859374,6.301585087890626,19.027396630859375,6.301585087890626Q18.915096630859374,6.301585087890626,18.742496630859375,6.146965087890624Q18.569996630859375,5.992335087890625,18.337296630859377,5.674955087890625ZM17.785496630859377,5.779125087890625L17.842496630859372,5.857245087890625Q17.668296630859373,6.186025087890625,17.495796630859374,6.348785087890625Q17.324896630859374,6.509915087890625,17.153996630859375,6.509915087890625Q16.926096630859377,6.509915087890625,16.774796630859377,6.324375087890624Q16.623396630859375,6.137195087890625,16.623396630859375,5.858875087890625Q16.623396630859375,5.565905087890625,16.761696630859376,5.360825087890625Q16.900096630859373,5.1557550878906255,17.095396630859376,5.1557550878906255Q17.228896630859374,5.1557550878906255,17.365596630859375,5.2778250878906245Q17.502296630859377,5.399895087890625,17.785496630859377,5.779125087890625ZM10.710296630859375,10.634915087890626C10.710296630859375,11.024655087890626,10.561656630859375,11.379685087890625,10.317976630859375,11.646395087890625L12.879196630859376,15.171615087890626C12.985696630859374,15.147615087890625,13.096496630859376,15.134915087890626,13.210296630859375,15.134915087890626C13.306796630859376,15.134915087890626,13.401096630859374,15.144015087890624,13.492596630859374,15.161415087890624L16.819096630859377,11.196955087890625C16.748996630859374,11.023375087890624,16.710296630859375,10.833655087890625,16.710296630859375,10.634915087890626C16.710296630859375,9.806495087890625,17.381896630859373,9.134915087890626,18.210296630859375,9.134915087890626C19.038696630859373,9.134915087890626,19.710296630859375,9.806495087890625,19.710296630859375,10.634915087890626C19.710296630859375,11.463345087890625,19.038696630859373,12.134915087890626,18.210296630859375,12.134915087890626C17.949796630859375,12.134915087890626,17.704796630859377,12.068505087890625,17.491296630859374,11.951675087890624L14.364996630859375,15.677415087890624C14.580596630859375,15.937215087890625,14.710296630859375,16.270915087890625,14.710296630859375,16.634915087890626C14.710296630859375,17.463315087890624,14.038696630859375,18.134915087890626,13.210296630859375,18.134915087890626C12.381866630859374,18.134915087890626,11.710296630859375,17.463315087890624,11.710296630859375,16.634915087890626C11.710296630859375,16.284415087890626,11.830486630859374,15.962015087890626,12.031896630859375,15.706715087890625L9.425686630859374,12.119565087890624C9.355346630859376,12.129685087890625,9.283436630859375,12.134915087890626,9.210296630859375,12.134915087890626C8.872396630859374,12.134915087890626,8.560596630859376,12.023195087890626,8.309816630859375,11.834665087890626L5.215876630859375,15.521915087890624C5.519506630859375,15.796415087890624,5.710296630859375,16.193415087890624,5.710296630859375,16.634915087890626C5.710296630859375,17.463315087890624,5.038726630859375,18.134915087890626,4.210296630859375,18.134915087890626C3.381869630859375,18.134915087890626,2.710296630859375,17.463315087890624,2.710296630859375,16.634915087890626C2.710296630859375,15.806515087890626,3.381869630859375,15.134915087890626,4.210296630859375,15.134915087890626C4.218546630859375,15.134915087890626,4.226776630859375,15.135015087890626,4.234996630859375,15.135115087890625L7.744116630859375,10.953115087890625C7.721966630859375,10.850565087890626,7.710296630859375,10.744105087890624,7.710296630859375,10.634915087890626C7.710296630859375,9.806495087890625,8.381866630859374,9.134915087890626,9.210296630859375,9.134915087890626C10.038726630859376,9.134915087890626,10.710296630859375,9.806495087890625,10.710296630859375,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), El = () => Bl.cloneNode(!0), Fl = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M21,5.5C21,6.32843,20.3284,7,19.5,7C19.4136,7,19.3289,6.99269,19.2465,6.97866L15.6257,15.5086C15.8587,15.7729,16,16.119999999999997,16,16.5C16,17.328400000000002,15.3284,18,14.5,18C13.8469,18,13.2913,17.5826,13.0854,17L3.91465,17C3.70873,17.5826,3.15311,18,2.5,18C1.671573,18,1,17.328400000000002,1,16.5C1,15.6716,1.671573,15,2.5,15C2.5840199999999998,15,2.66643,15.0069,2.74668,15.0202L6.36934,6.48574C6.13933,6.22213,6,5.87733,6,5.5C6,4.671573,6.67157,4,7.5,4C8.15311,4,8.70873,4.417404,8.91465,5L18.0854,5C18.2913,4.417404,18.8469,4,19.5,4C20.3284,4,21,4.671573,21,5.5ZM18.0854,6L8.91465,6C8.892579999999999,6.06243,8.8665,6.12296,8.83672,6.18128L13.9814,15.0921C14.143,15.0325,14.3177,15,14.5,15C14.584,15,14.6664,15.0069,14.7467,15.0202L18.3693,6.48574C18.2462,6.3446,18.149,6.1802,18.0854,6ZM13.2036,15.745L8.0861,6.8811800000000005C7.90605,6.95768,7.70797,7,7.5,7C7.41359,7,7.32888,6.99269,7.24647,6.97866L3.62571,15.5086C3.7512,15.651,3.8501,15.8174,3.91465,16L13.0854,16C13.1169,15.9108,13.1566,15.8255,13.2036,15.745Z" stroke-opacity="0" stroke="none"></path></svg>'), Kl = () => Fl.cloneNode(!0), jl = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.92159,5.93994C6.04014,5.90529,6.152620000000001,5.85639,6.25704,5.79523L9.12729,9.89437C9.045449999999999,10.07959,9,10.28449,9,10.5C9,10.79522,9.08529,11.07053,9.232569999999999,11.30262L4.97573,16.7511L5.92159,5.93994ZM4.92259,5.8848400000000005C4.38078,5.658659999999999,4,5.1238,4,4.5C4,3.671573,4.67157,3,5.5,3C6.2157,3,6.81433,3.50124,6.96399,4.17183L15.1309,4.88634C15.3654,4.36387,15.8902,4,16.5,4C17.328400000000002,4,18,4.67157,18,5.5C18,6.08983,17.659599999999998,6.60015,17.1645,6.84518L18.4264,14.0018C18.4508,14.0006,18.4753,14,18.5,14C19.3284,14,20,14.6716,20,15.5C20,16.328400000000002,19.3284,17,18.5,17C17.932499999999997,17,17.4386,16.6849,17.183799999999998,16.22L5.99686,18.5979C5.946429999999999,19.3807,5.29554,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.869300000000003,3.389292,17.3295,3.94071,17.1077L4.92259,5.8848400000000005ZM5.72452,17.6334C5.69799,17.596,5.6698,17.5599,5.64004,17.525100000000002L10.01843,11.92103C10.16958,11.97223,10.33155,12,10.5,12C10.80059,12,11.08052,11.91158,11.31522,11.75934L17.0606,15.0765C17.0457,15.1271,17.0335,15.1789,17.023899999999998,15.2317L5.72452,17.6334ZM11.92855,10.95875L17.4349,14.1379L16.1699,6.96356C15.9874,6.92257,15.8174,6.8483,15.6667,6.74746L11.99771,10.4165C11.99923,10.44414,12,10.47198,12,10.5C12,10.66,11.97495,10.814160000000001,11.92855,10.95875ZM10.5,9C10.259830000000001,9,10.03285,9.05644,9.83159,9.15679L7.04919,5.1831L15.0493,5.88302C15.054,5.90072,15.059,5.91829,15.0643,5.9357299999999995L11.56066,9.43934C11.28921,9.16789,10.91421,9,10.5,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Zl = () => jl.cloneNode(!0), Ql = /* @__PURE__ */ p('<svg viewBox="0 0 22 22"><path d="M4.727219638671875,8.007996215820313L9.973849638671876,2.7629472158203123C10.167279638671875,2.5696791158203123,10.480729638671875,2.5696791158203123,10.674169638671875,2.7629472158203123L13.223329638671874,5.311756215820313C13.416929638671874,5.505236215820313,13.416929638671874,5.8189862158203125,13.223329638671874,6.012466215820313L7.977129638671875,11.257906215820313C7.379859638671875,11.855176215820313,7.407609638671875,12.909396215820312,8.033809638671876,13.535596215820313C8.660409638671876,14.162596215820313,9.713849638671874,14.189996215820312,10.311129638671876,13.591896215820313L15.556929638671875,8.346066215820311C15.750429638671875,8.152526215820313,16.064229638671875,8.152526215820313,16.257629638671872,8.346066215820311L18.806529638671876,10.895266215820312C19.000029638671876,11.088746215820313,19.000029638671876,11.402496215820312,18.806529638671876,11.595976215820313L13.560629638671875,16.841796215820313C11.165619638671876,19.237196215820312,7.197149638671875,19.19919621582031,4.783499638671875,16.785496215820313C2.3698426386718747,14.371896215820312,2.331397638671875,10.403416215820313,4.727219638671875,8.007996215820313ZM12.172299638671875,5.662106215820312L10.323809638671875,3.8136162158203124L5.4287196386718755,8.709096215820313C3.422893638671875,10.714536215820312,3.4549956386718748,14.055196215820313,5.484999638671875,16.08479621582031C7.514609638671875,18.114796215820313,10.855289638671875,18.146496215820314,12.860719638671876,16.141096215820312L15.465629638671874,13.535796215820312L14.090929638671875,12.160756215820312L14.791629638671875,11.460436215820312L16.166229638671876,12.834996215820313L17.755829638671877,11.245226215820313L15.907729638671874,9.396736215820312L11.011839638671875,14.292596215820312C10.042809638671875,15.262396215820312,8.418249638671874,15.243796215820312,7.406019638671875,14.306496215820312L7.333099638671875,14.236296215820312C6.327599638671876,13.230796215820313,6.284009638671876,11.550396215820312,7.276419638671875,10.557586215820312L9.882199638671874,7.952026215820313L8.501079638671875,6.570906215820313L9.201789638671876,5.870186215820313L10.582939638671874,7.251336215820312L12.172299638671875,5.662106215820312Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), zl = (e) => (() => {
  const t = Ql.cloneNode(!0);
  return r1(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), Ul = /* @__PURE__ */ p('<svg viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_615"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_615)"><path d="M19.672,3.0673368C19.4417,2.9354008,19.1463,3.00292252,18.9994,3.2210900000000002L17.4588,5.50622L16.743299999999998,3.781253L13.9915,7.4662L13.9618,7.51108C13.8339,7.72862,13.8936,8.005659999999999,14.1004,8.15391L14.1462,8.183430000000001C14.3683,8.308720000000001,14.6511,8.25001,14.8022,8.047229999999999L16.4907,5.78571L17.246299999999998,7.60713L19.8374,3.7635389999999997L19.8651,3.717088C19.9871,3.484615,19.9023,3.199273,19.672,3.0673368ZM4.79974,8.462530000000001L10.117740000000001,3.252975C10.31381,3.0610145,10.63152,3.0610145,10.82759,3.252975L13.4115,5.78453C13.6076,5.976710000000001,13.6076,6.28833,13.4115,6.4805L8.093869999999999,11.69045C7.48847,12.28368,7.51659,13.3308,8.151309999999999,13.9528C8.786439999999999,14.5755,9.85421,14.6027,10.45961,14.0087L15.7768,8.79831C15.9729,8.60609,16.2909,8.60609,16.487099999999998,8.79831L19.0705,11.33026C19.2667,11.52244,19.2667,11.83406,19.0705,12.02623L13.7533,17.2366C11.32572,19.6158,7.30328,19.578,4.85679,17.1807C2.410298,14.7834,2.371331,10.84174,4.79974,8.462530000000001ZM12.3461,6.1325199999999995L10.47246,4.29654L5.51079,9.15889C3.477674,11.15076,3.510214,14.4688,5.56784,16.4847C7.62506,18.500999999999998,11.01117,18.5325,13.0439,16.540599999999998L15.6842,13.9529L14.2908,12.58718L15.0011,11.89161L16.394399999999997,13.2569L18.0056,11.67786L16.1323,9.84188L11.16985,14.7046C10.18764,15.6679,8.540980000000001,15.6494,7.51498,14.7184L7.44107,14.6487C6.4219,13.65,6.37771,11.98096,7.38362,10.994869999999999L10.02485,8.40693L8.624939999999999,7.03516L9.335180000000001,6.33919L10.73512,7.71099L12.3461,6.1325199999999995Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), Rl = (e) => (() => {
  const t = Ul.cloneNode(!0);
  return r1(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), Yl = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,17C5.80945,17,3.667717,12.85,3.113386,11.575C2.9622047,11.2,2.9622047,10.8,3.113386,10.425C3.667717,9.15,5.80945,5,11,5C16.165399999999998,5,18.3323,9.15,18.8866,10.425C19.0378,10.8,19.0378,11.2,18.8866,11.575C18.3323,12.85,16.165399999999998,17,11,17ZM4.04567,10.8C3.995276,10.925,3.995276,11.05,4.04567,11.175C4.52441,12.325,6.43937,16,11,16C15.5606,16,17.4756,12.325,17.9543,11.2C18.0047,11.075,18.0047,10.95,17.9543,10.825C17.4756,9.675,15.5606,6,11,6C6.43937,6,4.52441,9.675,4.04567,10.8ZM11,13.5C9.61417,13.5,8.480319999999999,12.375,8.480319999999999,11C8.480319999999999,9.625,9.61417,8.5,11,8.5C12.38583,8.5,13.5197,9.625,13.5197,11C13.5197,12.375,12.38583,13.5,11,13.5ZM11,9.5C10.1685,9.5,9.48819,10.175,9.48819,11C9.48819,11.825,10.1685,12.5,11,12.5C11.8315,12.5,12.51181,11.825,12.51181,11C12.51181,10.175,11.8315,9.5,11,9.5Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), Hl = () => Yl.cloneNode(!0), Vl = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.80417,14.9887L4.62563,16.167299999999997C4.43037,16.3625,4.43037,16.6791,4.62563,16.8744C4.82089,17.0696,5.13748,17.0696,5.332739999999999,16.8744L6.62638,15.5807C7.75595,16.290100000000002,9.19328,16.7929,11,16.7929C16.165399999999998,16.7929,18.3323,12.64289,18.8866,11.36789C19.0378,10.99289,19.0378,10.59289,18.8866,10.21789C18.5549,9.45486,17.6456,7.66212,15.8617,6.34545L17.3536,4.853553C17.5488,4.658291,17.5488,4.341709,17.3536,4.146447C17.1583,3.9511845,16.8417,3.9511845,16.6464,4.146447L15.0014,5.7915399999999995C13.9314,5.1969,12.61166,4.792893,11,4.792893C5.80945,4.792893,3.667717,8.94289,3.113386,10.21789C2.9622049,10.59289,2.9622049,10.99289,3.113386,11.36789C3.424435,12.08333,4.2353000000000005,13.70399,5.80417,14.9887ZM7.36012,14.847C8.32327,15.4074,9.52286,15.7929,11,15.7929C15.5606,15.7929,17.4756,12.11789,17.9543,10.99289C18.0047,10.86789,18.0047,10.74289,17.9543,10.61789C17.659,9.90846,16.8171,8.23812,15.1447,7.06241L12.96929,9.23782C13.3134,9.66543,13.5197,10.20642,13.5197,10.79289C13.5197,12.16789,12.38583,13.29289,11,13.29289C10.41596,13.29289,9.87667,13.09308,9.44815,12.75896L7.36012,14.847ZM8.794609999999999,11.99829L6.520099999999999,14.2728C5.06905,13.12119,4.32057,11.628250000000001,4.04567,10.96789C3.995275,10.84289,3.995275,10.71789,4.04567,10.59289C4.52441,9.46789,6.43937,5.79289,11,5.79289C12.28868,5.79289,13.3661,6.086320000000001,14.2596,6.53329L12.19759,8.5953C11.84086,8.40257,11.43271,8.29289,11,8.29289C9.61417,8.29289,8.480319999999999,9.41789,8.480319999999999,10.79289C8.480319999999999,11.22918,8.594470000000001,11.64029,8.794609999999999,11.99829ZM10.16528,12.04183C10.404869999999999,12.20032,10.692070000000001,12.29289,11,12.29289C11.8315,12.29289,12.51181,11.61789,12.51181,10.79289C12.51181,10.48318,12.41593,10.194600000000001,12.25216,9.95494L10.16528,12.04183ZM11.43602,9.35687L9.55616,11.236740000000001C9.512,11.09633,9.48819,10.94724,9.48819,10.79289C9.48819,9.96789,10.1685,9.29289,11,9.29289C11.15142,9.29289,11.29782,9.31528,11.43602,9.35687Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Gl = () => Vl.cloneNode(!0), Xl = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_625"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_625)"><path d="M14.5385,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807692,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.88462,4,14.5385,5.61538,14.5385,7.576919999999999L14.5385,9.76923ZM10.88461,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923L13.38462,9.76923L13.38462,7.576919999999999C13.38462,6.23077,12.26923,5.15385,10.88461,5.15385ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.038450000000001,12.07692,11.307680000000001,12.34615,11.307680000000001,12.65385L11.307680000000001,14.5769C11.307680000000001,14.8846,11.038450000000001,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), Jl = () => Xl.cloneNode(!0), Wl = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_620"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_620)"><path d="M8.38461,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807693,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.46154,4,13.84615,4.961539,14.3462,6.423080000000001C14.4615,6.73077,14.3077,7.038460000000001,14,7.15385C13.69231,7.26923,13.38461,7.11538,13.26923,6.80769C12.92308,5.80769,11.96154,5.15385,10.88462,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.03846,12.07692,11.307690000000001,12.34615,11.307690000000001,12.65385L11.307690000000001,14.5769C11.307690000000001,14.8846,11.03846,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), ql = () => Wl.cloneNode(!0), eu = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M16.966900000000003,8.67144C16.6669,8.67144,16.4247,8.91558,16.4247,9.21802L16.4247,16.631500000000003C16.4247,17.322,16.007199999999997,17.9068,15.5139,17.9068L13.93072,17.9068L13.93072,9.2162C13.93072,8.91741,13.68675,8.67144,13.38855,8.67144C13.09036,8.67144,12.84639,8.91741,12.84639,9.21802L12.84639,17.9068L10.151810000000001,17.9068L10.151810000000001,9.21802C10.151810000000001,8.91741,9.90783,8.67144,9.609639999999999,8.67144C9.31145,8.67144,9.06747,8.91741,9.06747,9.219850000000001L9.06747,17.9068L7.48614,17.9068C6.99277,17.9068,6.5753,17.322,6.5753,16.631500000000003L6.5753,9.21802C6.5753,8.91558,6.333130000000001,8.67144,6.03313,8.67144C5.73313,8.67144,5.49096,8.91558,5.49096,9.21802L5.49096,16.631500000000003C5.49096,17.9378,6.385540000000001,19,7.48614,19L15.512,19C16.6127,19,17.509,17.9378,17.509,16.631500000000003L17.509,9.21802C17.509,8.91558,17.2669,8.67144,16.966900000000003,8.67144ZM18.4578,6.21183L4.542169,6.21183C4.243976,6.21183,4,6.45779,4,6.75841C4,7.05903,4.243976,7.30499,4.542169,7.30499L18.4578,7.30499C18.756,7.30499,19,7.05903,19,6.75841C19,6.45779,18.756,6.21183,18.4578,6.21183ZM8.68072,5.10045L14.3193,5.10045C14.6175,5.10045,14.8614,4.852666,14.8614,4.550225C14.8614,4.247783,14.6175,4,14.3193,4L8.68072,4C8.38253,4,8.13855,4.247783,8.13855,4.550225C8.13855,4.852666,8.38253,5.10045,8.68072,5.10045Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), tu = () => eu.cloneNode(!0), nu = {
  horizontalStraightLine: Ec,
  horizontalRayLine: Kc,
  horizontalSegment: Zc,
  verticalStraightLine: zc,
  verticalRayLine: Rc,
  verticalSegment: Hc,
  straightLine: Gc,
  rayLine: Jc,
  segment: qc,
  arrow: tl,
  priceLine: rl,
  priceChannelLine: il,
  parallelStraightLine: ol,
  fibonacciLine: ll,
  fibonacciSegment: fl,
  fibonacciCircle: Cl,
  fibonacciSpiral: gl,
  fibonacciSpeedResistanceFan: pl,
  fibonacciExtension: vl,
  gannBox: Ll,
  circle: bl,
  triangle: kl,
  rect: wl,
  parallelogram: Sl,
  threeWaves: Tl,
  fiveWaves: Nl,
  eightWaves: Ol,
  anyWaves: El,
  abcd: Kl,
  xabcd: Zl,
  weak_magnet: zl,
  strong_magnet: Rl,
  lock: Jl,
  unlock: ql,
  visible: Hl,
  invisible: Gl,
  remove: tu
};
function ru(e) {
  return [
    { key: "horizontalStraightLine", text: d("horizontal_straight_line", e) },
    { key: "horizontalRayLine", text: d("horizontal_ray_line", e) },
    { key: "horizontalSegment", text: d("horizontal_segment", e) },
    { key: "verticalStraightLine", text: d("vertical_straight_line", e) },
    { key: "verticalRayLine", text: d("vertical_ray_line", e) },
    { key: "verticalSegment", text: d("vertical_segment", e) },
    { key: "straightLine", text: d("straight_line", e) },
    { key: "rayLine", text: d("ray_line", e) },
    { key: "segment", text: d("segment", e) },
    { key: "arrow", text: d("arrow", e) },
    { key: "priceLine", text: d("price_line", e) }
  ];
}
function au(e) {
  return [
    { key: "priceChannelLine", text: d("price_channel_line", e) },
    { key: "parallelStraightLine", text: d("parallel_straight_line", e) }
  ];
}
function iu(e) {
  return [
    { key: "circle", text: d("circle", e) },
    { key: "rect", text: d("rect", e) },
    { key: "parallelogram", text: d("parallelogram", e) },
    { key: "triangle", text: d("triangle", e) }
  ];
}
function su(e) {
  return [
    { key: "fibonacciLine", text: d("fibonacci_line", e) },
    { key: "fibonacciSegment", text: d("fibonacci_segment", e) },
    { key: "fibonacciCircle", text: d("fibonacci_circle", e) },
    { key: "fibonacciSpiral", text: d("fibonacci_spiral", e) },
    { key: "fibonacciSpeedResistanceFan", text: d("fibonacci_speed_resistance_fan", e) },
    { key: "fibonacciExtension", text: d("fibonacci_extension", e) },
    { key: "gannBox", text: d("gann_box", e) }
  ];
}
function ou(e) {
  return [
    { key: "xabcd", text: d("xabcd", e) },
    { key: "abcd", text: d("abcd", e) },
    { key: "threeWaves", text: d("three_waves", e) },
    { key: "fiveWaves", text: d("five_waves", e) },
    { key: "eightWaves", text: d("eight_waves", e) },
    { key: "anyWaves", text: d("any_waves", e) }
  ];
}
function cu(e) {
  return [
    { key: "weak_magnet", text: d("weak_magnet", e) },
    { key: "strong_magnet", text: d("strong_magnet", e) }
  ];
}
const a1 = (e) => nu[e.name](e.class), lu = /* @__PURE__ */ p('<div class="klinecharts-pro-drawing-bar"><span class="split-line"></span><div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div><div class="item"><span style="width:32px;height:32px"></span></div><div class="item"><span style="width:32px;height:32px"></span></div><span class="split-line"></span><div class="item"><span style="width:32px;height:32px"></span></div></div>'), uu = /* @__PURE__ */ p('<div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div>'), Ke = /* @__PURE__ */ p('<li><span style="padding-left:8px"></span></li>'), je = "drawing_tools", fu = (e) => {
  const [t, n] = A("horizontalStraightLine"), [r, a] = A("priceChannelLine"), [i, c] = A("circle"), [s, f] = A("fibonacciLine"), [h, C] = A("xabcd"), [m, b] = A("weak_magnet"), [k, N] = A("normal"), [j, Q] = A(!1), [D, Y] = A(!0), [P, S] = A(""), w = U(() => [{
    key: "singleLine",
    icon: t(),
    list: ru(e.locale),
    setter: n
  }, {
    key: "moreLine",
    icon: r(),
    list: au(e.locale),
    setter: a
  }, {
    key: "polygon",
    icon: i(),
    list: iu(e.locale),
    setter: c
  }, {
    key: "fibonacci",
    icon: s(),
    list: su(e.locale),
    setter: f
  }, {
    key: "wave",
    icon: h(),
    list: ou(e.locale),
    setter: C
  }]), Z = U(() => cu(e.locale));
  return (() => {
    const n1 = lu.cloneNode(!0), l1 = n1.firstChild, I = l1.nextSibling, F = I.firstChild, z = F.nextSibling, u1 = z.firstChild, F1 = I.nextSibling, K1 = F1.firstChild, p1 = F1.nextSibling, Y1 = p1.firstChild, H1 = p1.nextSibling, V1 = H1.nextSibling, G1 = V1.firstChild;
    return $(n1, () => w().map((T) => (() => {
      const G = uu.cloneNode(!0), i1 = G.firstChild, R = i1.nextSibling, X = R.firstChild;
      return G.addEventListener("blur", () => {
        S("");
      }), i1.$$click = () => {
        e.onDrawingItemClick({
          groupId: je,
          name: T.icon,
          visible: D(),
          lock: j(),
          mode: k()
        });
      }, $(i1, L(a1, {
        get name() {
          return T.icon;
        }
      })), R.$$click = () => {
        T.key === P() ? S("") : S(T.key);
      }, $(G, (() => {
        const m1 = U(() => T.key === P());
        return () => m1() && L(d0, {
          class: "list",
          get children() {
            return T.list.map((s1) => (() => {
              const x1 = Ke.cloneNode(!0), v1 = x1.firstChild;
              return x1.$$click = () => {
                T.setter(s1.key), e.onDrawingItemClick({
                  name: s1.key,
                  lock: j(),
                  mode: k()
                }), S("");
              }, $(x1, L(a1, {
                get name() {
                  return s1.key;
                }
              }), v1), $(v1, () => s1.text), x1;
            })());
          }
        });
      })(), null), H(() => r1(X, "class", T.key === P() ? "rotate" : "")), G;
    })()), l1), I.addEventListener("blur", () => {
      S("");
    }), F.$$click = () => {
      let T = m();
      k() !== "normal" && (T = "normal"), N(T), e.onModeChange(T);
    }, $(F, (() => {
      const T = U(() => m() === "weak_magnet");
      return () => T() ? (() => {
        const G = U(() => k() === "weak_magnet");
        return () => G() ? L(a1, {
          name: "weak_magnet",
          class: "selected"
        }) : L(a1, {
          name: "weak_magnet"
        });
      })() : (() => {
        const G = U(() => k() === "strong_magnet");
        return () => G() ? L(a1, {
          name: "strong_magnet",
          class: "selected"
        }) : L(a1, {
          name: "strong_magnet"
        });
      })();
    })()), z.$$click = () => {
      P() === "mode" ? S("") : S("mode");
    }, $(I, (() => {
      const T = U(() => P() === "mode");
      return () => T() && L(d0, {
        class: "list",
        get children() {
          return Z().map((G) => (() => {
            const i1 = Ke.cloneNode(!0), R = i1.firstChild;
            return i1.$$click = () => {
              b(G.key), N(G.key), e.onModeChange(G.key), S("");
            }, $(i1, L(a1, {
              get name() {
                return G.key;
              }
            }), R), $(R, () => G.text), i1;
          })());
        }
      });
    })(), null), K1.$$click = () => {
      const T = !j();
      Q(T), e.onLockChange(T);
    }, $(K1, (() => {
      const T = U(() => !!j());
      return () => T() ? L(a1, {
        name: "lock"
      }) : L(a1, {
        name: "unlock"
      });
    })()), Y1.$$click = () => {
      const T = !D();
      Y(T), e.onVisibleChange(T);
    }, $(Y1, (() => {
      const T = U(() => !!D());
      return () => T() ? L(a1, {
        name: "visible"
      }) : L(a1, {
        name: "invisible"
      });
    })()), G1.$$click = () => {
      e.onRemoveClick(je);
    }, $(G1, L(a1, {
      name: "remove"
    })), H(() => r1(u1, "class", P() === "mode" ? "rotate" : "")), n1;
  })();
};
o1(["click"]);
const Ze = /* @__PURE__ */ p('<li class="title"></li>'), Qe = /* @__PURE__ */ p('<li class="row"></li>'), du = (e) => L(E1, {
  get title() {
    return d("indicator", e.locale);
  },
  width: 400,
  get onClose() {
    return e.onClose;
  },
  get children() {
    return L(d0, {
      class: "klinecharts-pro-indicator-modal-list",
      get children() {
        return [(() => {
          const t = Ze.cloneNode(!0);
          return $(t, () => d("main_indicator", e.locale)), t;
        })(), U(() => ["MA", "EMA", "SMA", "BOLL", "SAR", "BBI"].map((t) => {
          const n = e.mainIndicators.includes(t);
          return (() => {
            const r = Qe.cloneNode(!0);
            return r.$$click = (a) => {
              e.onMainIndicatorChange({
                name: t,
                paneId: "candle_pane",
                added: !n
              });
            }, $(r, L(Fe, {
              checked: n,
              get label() {
                return d(t.toLowerCase(), e.locale);
              }
            })), r;
          })();
        })), (() => {
          const t = Ze.cloneNode(!0);
          return $(t, () => d("sub_indicator", e.locale)), t;
        })(), U(() => ["MA", "EMA", "VOL", "MACD", "BOLL", "KDJ", "RSI", "BIAS", "BRAR", "CCI", "DMI", "CR", "PSY", "DMA", "TRIX", "OBV", "VR", "WR", "MTM", "EMV", "SAR", "SMA", "ROC", "PVT", "BBI", "AO"].map((t) => {
          const n = t in e.subIndicators;
          return (() => {
            const r = Qe.cloneNode(!0);
            return r.$$click = (a) => {
              e.onSubIndicatorChange({
                name: t,
                paneId: e.subIndicators[t] ?? "",
                added: !n
              });
            }, $(r, L(Fe, {
              checked: n,
              get label() {
                return d(t.toLowerCase(), e.locale);
              }
            })), r;
          })();
        }))];
      }
    });
  }
});
o1(["click"]);
function ze(e, t) {
  switch (e) {
    case "Etc/UTC":
      return d("utc", t);
    case "Pacific/Honolulu":
      return d("honolulu", t);
    case "America/Juneau":
      return d("juneau", t);
    case "America/Los_Angeles":
      return d("los_angeles", t);
    case "America/Chicago":
      return d("chicago", t);
    case "America/Toronto":
      return d("toronto", t);
    case "America/Sao_Paulo":
      return d("sao_paulo", t);
    case "Europe/London":
      return d("london", t);
    case "Europe/Berlin":
      return d("berlin", t);
    case "Asia/Bahrain":
      return d("bahrain", t);
    case "Asia/Dubai":
      return d("dubai", t);
    case "Asia/Ashkhabad":
      return d("ashkhabad", t);
    case "Asia/Almaty":
      return d("almaty", t);
    case "Asia/Bangkok":
      return d("bangkok", t);
    case "Asia/Shanghai":
      return d("shanghai", t);
    case "Asia/Tokyo":
      return d("tokyo", t);
    case "Australia/Sydney":
      return d("sydney", t);
    case "Pacific/Norfolk":
      return d("norfolk", t);
  }
  return e;
}
function Cu(e) {
  return [
    { key: "Etc/UTC", text: d("utc", e) },
    { key: "Pacific/Honolulu", text: d("honolulu", e) },
    { key: "America/Juneau", text: d("juneau", e) },
    { key: "America/Los_Angeles", text: d("los_angeles", e) },
    { key: "America/Chicago", text: d("chicago", e) },
    { key: "America/Toronto", text: d("toronto", e) },
    { key: "America/Sao_Paulo", text: d("sao_paulo", e) },
    { key: "Europe/London", text: d("london", e) },
    { key: "Europe/Berlin", text: d("berlin", e) },
    { key: "Asia/Bahrain", text: d("bahrain", e) },
    { key: "Asia/Dubai", text: d("dubai", e) },
    { key: "Asia/Ashkhabad", text: d("ashkhabad", e) },
    { key: "Asia/Almaty", text: d("almaty", e) },
    { key: "Asia/Bangkok", text: d("bangkok", e) },
    { key: "Asia/Shanghai", text: d("shanghai", e) },
    { key: "Asia/Tokyo", text: d("tokyo", e) },
    { key: "Australia/Sydney", text: d("sydney", e) },
    { key: "Pacific/Norfolk", text: d("norfolk", e) }
  ];
}
const hu = (e) => {
  const [t, n] = A(e.timezone), r = U(() => Cu(e.locale));
  return L(E1, {
    get title() {
      return d("timezone", e.locale);
    },
    width: 320,
    get buttons() {
      return [{
        children: d("confirm", e.locale),
        onClick: () => {
          e.onConfirm(t()), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      return L(S9, {
        style: {
          width: "100%",
          "margin-top": "20px"
        },
        get value() {
          return t().text;
        },
        onSelected: (a) => {
          n(a);
        },
        get dataSource() {
          return r();
        }
      });
    }
  });
};
function Ue(e) {
  return [
    {
      key: "candle.type",
      text: d("candle_type", e),
      component: "select",
      dataSource: [
        { key: "candle_solid", text: d("candle_solid", e) },
        { key: "candle_stroke", text: d("candle_stroke", e) },
        { key: "candle_up_stroke", text: d("candle_up_stroke", e) },
        { key: "candle_down_stroke", text: d("candle_down_stroke", e) },
        { key: "ohlc", text: d("ohlc", e) },
        { key: "area", text: d("area", e) }
      ]
    },
    {
      key: "candle.priceMark.last.show",
      text: d("last_price_show", e),
      component: "switch"
    },
    {
      key: "candle.priceMark.high.show",
      text: d("high_price_show", e),
      component: "switch"
    },
    {
      key: "candle.priceMark.low.show",
      text: d("low_price_show", e),
      component: "switch"
    },
    {
      key: "indicator.lastValueMark.show",
      text: d("indicator_last_value_show", e),
      component: "switch"
    },
    {
      key: "yAxis.type",
      text: d("price_axis_type", e),
      component: "select",
      dataSource: [
        { key: "normal", text: d("normal", e) },
        { key: "percentage", text: d("percentage", e) },
        { key: "log", text: d("log", e) }
      ]
    },
    {
      key: "yAxis.reverse",
      text: d("reverse_coordinate", e),
      component: "switch"
    },
    {
      key: "grid.show",
      text: d("grid_show", e),
      component: "switch"
    }
  ];
}
const gu = /* @__PURE__ */ p('<div class="klinecharts-pro-setting-modal-content"></div>'), yu = /* @__PURE__ */ p("<span></span>"), pu = (e) => {
  const [t, n] = A(e.currentStyles), [r, a] = A(Ue(e.locale));
  f1(() => {
    a(Ue(e.locale));
  });
  const i = (c, s) => {
    const f = {};
    S0(f, c.key, s);
    const h = K.clone(t());
    S0(h, c.key, s), n(h), a(r().map((C) => ({
      ...C
    }))), e.onChange(f);
  };
  return L(E1, {
    get title() {
      return d("setting", e.locale);
    },
    width: 560,
    get buttons() {
      return [{
        children: d("restore_default", e.locale),
        onClick: () => {
          e.onRestoreDefault(r()), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      const c = gu.cloneNode(!0);
      return $(c, L(y5, {
        get each() {
          return r();
        },
        children: (s) => {
          let f;
          const h = K.formatValue(t(), s.key);
          switch (s.component) {
            case "select": {
              f = L(S9, {
                style: {
                  width: "120px"
                },
                get value() {
                  return d(h, e.locale);
                },
                get dataSource() {
                  return s.dataSource;
                },
                onSelected: (C) => {
                  const m = C.key;
                  i(s, m);
                }
              });
              break;
            }
            case "switch": {
              const C = !!h;
              f = L(ha, {
                open: C,
                onChange: () => {
                  i(s, !C);
                }
              });
              break;
            }
          }
          return [(() => {
            const C = yu.cloneNode(!0);
            return $(C, () => s.text), C;
          })(), f];
        }
      })), c;
    }
  });
}, mu = /* @__PURE__ */ p('<img style="width:500px;margin-top: 20px">'), vu = (e) => L(E1, {
  get title() {
    return d("screenshot", e.locale);
  },
  width: 540,
  get buttons() {
    return [{
      type: "confirm",
      children: d("save", e.locale),
      onClick: () => {
        const t = document.createElement("a");
        t.download = "screenshot", t.href = e.url, document.body.appendChild(t), t.click(), t.remove();
      }
    }];
  },
  get onClose() {
    return e.onClose;
  },
  get children() {
    const t = mu.cloneNode(!0);
    return H(() => r1(t, "src", e.url)), t;
  }
}), _u = {
  AO: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 5 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 34 }
  ],
  BIAS: [
    { paramNameKey: "BIAS1", precision: 0, min: 1, styleKey: "lines[0].color" },
    { paramNameKey: "BIAS2", precision: 0, min: 1, styleKey: "lines[1].color" },
    { paramNameKey: "BIAS3", precision: 0, min: 1, styleKey: "lines[2].color" },
    { paramNameKey: "BIAS4", precision: 0, min: 1, styleKey: "lines[3].color" },
    { paramNameKey: "BIAS5", precision: 0, min: 1, styleKey: "lines[4].color" }
  ],
  BOLL: [
    { paramNameKey: "period", precision: 0, min: 1, default: 20 },
    { paramNameKey: "standard_deviation", precision: 2, min: 1, default: 2 }
  ],
  BRAR: [
    { paramNameKey: "period", precision: 0, min: 1, default: 26 }
  ],
  BBI: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 3 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 6 },
    { paramNameKey: "params_3", precision: 0, min: 1, default: 12 },
    { paramNameKey: "params_4", precision: 0, min: 1, default: 24 }
  ],
  CCI: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 20 }
  ],
  CR: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 26 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 10 },
    { paramNameKey: "params_3", precision: 0, min: 1, default: 20 },
    { paramNameKey: "params_4", precision: 0, min: 1, default: 40 },
    { paramNameKey: "params_5", precision: 0, min: 1, default: 60 }
  ],
  DMA: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 10 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 50 },
    { paramNameKey: "params_3", precision: 0, min: 1, default: 10 }
  ],
  DMI: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 14 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 6 }
  ],
  EMV: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 14 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 9 }
  ],
  EMA: [
    { paramNameKey: "EMA1", precision: 0, min: 1, styleKey: "lines[0].color" },
    { paramNameKey: "EMA2", precision: 0, min: 1, styleKey: "lines[1].color" },
    { paramNameKey: "EMA3", precision: 0, min: 1, styleKey: "lines[2].color" },
    { paramNameKey: "EMA4", precision: 0, min: 1, styleKey: "lines[3].color" },
    { paramNameKey: "EMA5", precision: 0, min: 1, styleKey: "lines[4].color" }
  ],
  MTM: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 12 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 6 }
  ],
  MA: [
    { paramNameKey: "MA1", precision: 0, min: 1, styleKey: "lines[0].color" },
    { paramNameKey: "MA2", precision: 0, min: 1, styleKey: "lines[1].color" },
    { paramNameKey: "MA3", precision: 0, min: 1, styleKey: "lines[2].color" },
    { paramNameKey: "MA4", precision: 0, min: 1, styleKey: "lines[3].color" },
    { paramNameKey: "MA5", precision: 0, min: 1, styleKey: "lines[4].color" }
  ],
  MACD: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 12 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 26 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 9 }
  ],
  OBV: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 30 }
  ],
  PVT: [],
  PSY: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 12 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 6 }
  ],
  ROC: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 12 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 6 }
  ],
  RSI: [
    { paramNameKey: "RSI1", precision: 0, min: 1, styleKey: "lines[0].color" },
    { paramNameKey: "RSI2", precision: 0, min: 1, styleKey: "lines[1].color" },
    { paramNameKey: "RSI3", precision: 0, min: 1, styleKey: "lines[2].color" },
    { paramNameKey: "RSI4", precision: 0, min: 1, styleKey: "lines[3].color" },
    { paramNameKey: "RSI5", precision: 0, min: 1, styleKey: "lines[4].color" }
  ],
  SMA: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 12 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 2 }
  ],
  KDJ: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 9 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 3 },
    { paramNameKey: "params_3", precision: 0, min: 1, default: 3 }
  ],
  SAR: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 2 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 2 },
    { paramNameKey: "params_3", precision: 0, min: 1, default: 20 }
  ],
  TRIX: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 12 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 9 }
  ],
  VOL: [
    { paramNameKey: "MA1", precision: 0, min: 1, styleKey: "lines[0].color" },
    { paramNameKey: "MA2", precision: 0, min: 1, styleKey: "lines[1].color" },
    { paramNameKey: "MA3", precision: 0, min: 1, styleKey: "lines[2].color" },
    { paramNameKey: "MA4", precision: 0, min: 1, styleKey: "lines[3].color" },
    { paramNameKey: "MA5", precision: 0, min: 1, styleKey: "lines[4].color" }
  ],
  VR: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 26 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 6 }
  ],
  WR: [
    { paramNameKey: "WR1", precision: 0, min: 1, styleKey: "lines[0].color" },
    { paramNameKey: "WR2", precision: 0, min: 1, styleKey: "lines[1].color" },
    { paramNameKey: "WR3", precision: 0, min: 1, styleKey: "lines[2].color" },
    { paramNameKey: "WR4", precision: 0, min: 1, styleKey: "lines[3].color" },
    { paramNameKey: "WR5", precision: 0, min: 1, styleKey: "lines[4].color" }
  ]
}, Lu = /* @__PURE__ */ p('<div class="klinecharts-pro-indicator-setting-modal-content"></div>'), $u = /* @__PURE__ */ p("<span></span>"), bu = (e) => {
  const [t, n] = A(K.clone(e.params.calcParams)), r = (a) => _u[a];
  return L(E1, {
    get title() {
      return e.params.indicatorName;
    },
    width: 360,
    get buttons() {
      return [{
        type: "confirm",
        children: d("confirm", e.locale),
        onClick: () => {
          const a = r(e.params.indicatorName), i = [];
          K.clone(t()).forEach((c, s) => {
            !K.isValid(c) || c === "" ? "default" in a[s] && i.push(a[s].default) : i.push(c);
          }), e.onConfirm(i), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      const a = Lu.cloneNode(!0);
      return $(a, () => r(e.params.indicatorName).map((i, c) => [(() => {
        const s = $u.cloneNode(!0);
        return $(s, () => d(i.paramNameKey, e.locale)), s;
      })(), L(I9, {
        style: {
          width: "200px"
        },
        get value() {
          return t()[c] ?? "";
        },
        get precision() {
          return i.precision;
        },
        get min() {
          return i.min;
        },
        onChange: (s) => {
          const f = K.clone(t());
          f[c] = s, n(f);
        }
      })])), a;
    }
  });
}, xu = /* @__PURE__ */ p('<svg viewBox="0 0 1024 1024"><path d="M945.066667 898.133333l-189.866667-189.866666c55.466667-64 87.466667-149.333333 87.466667-241.066667 0-204.8-168.533333-373.333333-373.333334-373.333333S96 264.533333 96 469.333333 264.533333 842.666667 469.333333 842.666667c91.733333 0 174.933333-34.133333 241.066667-87.466667l189.866667 189.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c8.533333-12.8 8.533333-34.133333-2.133333-46.933334zM469.333333 778.666667C298.666667 778.666667 160 640 160 469.333333S298.666667 160 469.333333 160 778.666667 298.666667 778.666667 469.333333 640 778.666667 469.333333 778.666667z"></path></svg>'), ku = /* @__PURE__ */ p('<img alt="symbol">'), Au = /* @__PURE__ */ p("<li><div><span></span></div></li>"), wu = (e) => {
  const [t, n] = A(""), [r] = o5(t, e.datafeed.searchSymbols.bind(e.datafeed));
  return L(E1, {
    get title() {
      return d("symbol_search", e.locale);
    },
    width: 460,
    get onClose() {
      return e.onClose;
    },
    get children() {
      return [L(I9, {
        class: "klinecharts-pro-symbol-search-modal-input",
        get placeholder() {
          return d("symbol_code", e.locale);
        },
        get suffix() {
          return xu.cloneNode(!0);
        },
        get value() {
          return t();
        },
        onChange: (a) => {
          const i = `${a}`;
          n(i);
        }
      }), L(d0, {
        class: "klinecharts-pro-symbol-search-modal-list",
        get loading() {
          return r.loading;
        },
        get dataSource() {
          return r() ?? [];
        },
        renderItem: (a) => (() => {
          const i = Au.cloneNode(!0), c = i.firstChild, s = c.firstChild;
          return i.$$click = () => {
            e.onSymbolSelected(a), e.onClose();
          }, $(c, L(W, {
            get when() {
              return a.logo;
            },
            get children() {
              const f = ku.cloneNode(!0);
              return H(() => r1(f, "src", a.logo)), f;
            }
          }), s), $(s, () => a.shortName ?? a.ticker, null), $(s, () => `${a.name ? `(${a.name})` : ""}`, null), $(i, () => a.exchange ?? "", null), H(() => r1(s, "title", a.name ?? "")), i;
        })()
      })];
    }
  });
};
o1(["click"]);
const Mu = /* @__PURE__ */ p('<i class="icon-close klinecharts-pro-load-icon"></i>'), Su = /* @__PURE__ */ p('<div class="klinecharts-pro-content"><div class="klinecharts-pro-widget"></div></div>');
function t0(e, t, n, r) {
  return t === "VOL" && (r = {
    gap: {
      bottom: 2
    },
    ...r
  }), (e == null ? void 0 : e.createIndicator({
    name: t,
    // @ts-expect-error
    createTooltipDataSource: ({
      indicator: a,
      defaultStyles: i
    }) => {
      const c = [];
      return a.visible ? (c.push(i.tooltip.icons[1]), c.push(i.tooltip.icons[2]), c.push(i.tooltip.icons[3])) : (c.push(i.tooltip.icons[0]), c.push(i.tooltip.icons[2]), c.push(i.tooltip.icons[3])), {
        icons: c
      };
    }
  }, n, r)) ?? null;
}
const Iu = (e) => {
  let t, n = null, r, a = !1;
  const [i, c] = A(e.theme), [s, f] = A(e.styles), [h, C] = A(e.locale), [m, b] = A(e.symbol), [k, N] = A(e.period), [j, Q] = A(!1), [D, Y] = A([...e.mainIndicators]), [P, S] = A({}), [w, Z] = A(!1), [n1, l1] = A({
    key: e.timezone,
    text: ze(e.timezone, e.locale)
  }), [I, F] = A(!1), [z, u1] = A(), [F1, K1] = A(""), [p1, Y1] = A(e.drawingBarVisible), [H1, V1] = A(!1), [G1, T] = A(!1), [G, i1] = A({
    visible: !1,
    indicatorName: "",
    paneId: "",
    calcParams: []
  });
  let R = /* @__PURE__ */ new Map(), X = /* @__PURE__ */ new Map();
  const m1 = (o) => ({
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
    priceChannelLine: 3
  })[o] || 1, s1 = (o, l = /* @__PURE__ */ new WeakSet()) => {
    if (o == null)
      return o;
    if (l.has(o))
      return "[Circular]";
    if (typeof o != "object")
      return o;
    if (l.add(o), Array.isArray(o))
      return o.map((u) => s1(u, l));
    const y = {};
    for (const u in o)
      if (!(u === "__proto__" || u === "constructor" || u === "prototype"))
        try {
          const g = o[u];
          if (typeof g == "function")
            continue;
          y[u] = s1(g, l);
        } catch (g) {
          y[u] = `[Error: ${g.message}]`;
        }
    return y;
  }, x1 = (o) => {
    if (!o)
      return null;
    try {
      return {
        id: o.id || "",
        type: o.name || "",
        name: o.name || "",
        points: (o.points || []).map((l) => ({
          timestamp: l.timestamp || 0,
          value: l.value || 0,
          dataIndex: l.dataIndex || 0
        })),
        extendData: s1(o.extendData || {}),
        styles: s1(o.styles || {}),
        visible: o.visible ?? !0,
        lock: o.lock ?? !1,
        mode: o.mode || ne.Normal
      };
    } catch (l) {
      return console.error("Error extracting overlay data:", l), null;
    }
  }, v1 = (o) => {
    var l, y, u;
    try {
      const g = (l = n == null ? void 0 : n.getOverlayById) == null ? void 0 : l.call(n, o);
      if (!g)
        return;
      const _ = x1(g);
      if (_) {
        const v = R.get(o), x = ((y = v == null ? void 0 : v.points) == null ? void 0 : y.length) || 0, M = ((u = _.points) == null ? void 0 : u.length) || 0;
        R.set(o, _), M > x && console.log(`📌 ${_.type} ${o}: ${x} → ${M} points`);
        const J = m1(_.type);
        if (M >= J) {
          const e1 = X.get(o);
          e1 && !e1.complete && (e1.complete = !0, console.log(`✅ ${_.type} ${o} is complete (${M}/${J} points)!`), e1.checkInterval && (clearInterval(e1.checkInterval), e1.checkInterval = void 0));
        }
      }
    } catch (g) {
      console.error(`Error updating overlay tracking for ${o}:`, g);
    }
  }, D9 = (o, l) => {
    if (X.has(o))
      return;
    const y = {
      monitoring: !0,
      complete: !1,
      lastPointCount: 0
    };
    X.set(o, y), console.log(`🔍 Started monitoring ${l} ${o}`), v1(o);
    const u = () => {
      v1(o);
    };
    document.addEventListener("mouseup", u), document.addEventListener("touchend", u), setTimeout(() => {
      var _;
      const g = X.get(o);
      if (g && !g.complete) {
        console.log(`⏰ Stopped monitoring ${o} after 30 seconds`), g.checkInterval && clearInterval(g.checkInterval), g.mouseUpHandler && (document.removeEventListener("mouseup", g.mouseUpHandler), document.removeEventListener("touchend", g.mouseUpHandler)), v1(o);
        const v = R.get(o);
        if (v) {
          const x = m1(v.type), M = ((_ = v.points) == null ? void 0 : _.length) || 0;
          M < x && console.warn(`⚠️ ${v.type} ${o} has only ${M} point(s), should have ${x}`);
        }
      }
    }, 3e4);
  };
  let k1 = {
    saveDrawings: (o, l) => {
      try {
        const y = `kline_drawings_${o}`, u = l.map((_) => {
          var J;
          const v = {
            ..._
          };
          v.extendData && (v.extendData = s1(v.extendData)), v.styles && (v.styles = s1(v.styles));
          const x = m1(_.type), M = ((J = _.points) == null ? void 0 : J.length) || 0;
          return M < x && console.warn(`⚠️ Saving ${_.type} with only ${M} point(s), needs ${x}`), v;
        }), g = {
          drawings: u,
          timestamp: Date.now()
        };
        localStorage.setItem(y, JSON.stringify(g, null, 2)), console.log(`💾 Library: Saved ${l.length} drawings for ${o}`), u.forEach((_, v) => {
          var x;
          console.log(`📝 Drawing ${v + 1}:`, {
            type: _.type,
            points: ((x = _.points) == null ? void 0 : x.length) || 0,
            hasExtendData: !!_.extendData,
            hasStyles: !!_.styles
          });
        });
      } catch (y) {
        console.error("Library: Error saving drawings:", y);
      }
    },
    loadDrawings: (o) => {
      var l;
      try {
        const y = `kline_drawings_${o}`, u = localStorage.getItem(y);
        if (u) {
          const g = JSON.parse(u);
          console.log(`📂 Library: Loaded ${((l = g.drawings) == null ? void 0 : l.length) || 0} drawings for ${o}`);
          const _ = [];
          return g.drawings && g.drawings.forEach((v, x) => {
            var e1;
            const M = m1(v.type), J = ((e1 = v.points) == null ? void 0 : e1.length) || 0;
            J >= M ? (_.push(v), console.log(`📥 Valid drawing ${x + 1}:`, {
              type: v.type,
              points: J
            })) : console.warn(`📥 Skipping ${v.type}: Only ${J} point(s), need ${M}`);
          }), _;
        }
      } catch (y) {
        console.error("Library: Error loading drawings:", y);
      }
      return [];
    },
    clearDrawings: (o) => {
      try {
        const l = `kline_drawings_${o}`;
        localStorage.removeItem(l), console.log(`🧹 Library: Cleared drawings for ${o}`);
      } catch (l) {
        console.error("Library: Error clearing drawings:", l);
      }
    }
  };
  const X0 = () => {
    const o = m();
    if (o != null && o.ticker) {
      const l = Array.from(R.values());
      k1.saveDrawings(o.ticker, l);
    }
  };
  e.ref({
    setTheme: c,
    getTheme: () => i(),
    setStyles: f,
    getStyles: () => n.getStyles(),
    setLocale: C,
    getLocale: () => h(),
    setTimezone: (o) => {
      l1({
        key: o,
        text: ze(e.timezone, h())
      });
    },
    getTimezone: () => n1().key,
    setSymbol: b,
    getSymbol: () => m(),
    setPeriod: N,
    getPeriod: () => k(),
    getMainIndicators: () => D(),
    getSubIndicators: () => P(),
    setMainIndicators: Y,
    setSubIndicators: S,
    overrideIndicator: (o, l) => {
      n == null || n.overrideIndicator(o, l);
    },
    createOverlay: (o) => {
      var l;
      return ((l = n == null ? void 0 : n.createOverlay) == null ? void 0 : l.call(n, o)) ?? null;
    },
    removeOverlay: (o) => {
      var l;
      if ((l = n == null ? void 0 : n.removeOverlay) == null || l.call(n, o), o.id) {
        R.delete(o.id);
        const y = X.get(o.id);
        y && (y.checkInterval && clearInterval(y.checkInterval), y.mouseUpHandler && (document.removeEventListener("mouseup", y.mouseUpHandler), document.removeEventListener("touchend", y.mouseUpHandler)), X.delete(o.id)), X0();
      }
    },
    removeAllOverlay: () => {
      R.forEach((o, l) => {
        var u;
        (u = n == null ? void 0 : n.removeOverlay) == null || u.call(n, {
          id: l
        });
        const y = X.get(l);
        y && (y.checkInterval && clearInterval(y.checkInterval), y.mouseUpHandler && (document.removeEventListener("mouseup", y.mouseUpHandler), document.removeEventListener("touchend", y.mouseUpHandler)));
      }), R.clear(), X.clear();
    },
    getAllOverlay: () => Array.from(R.values()),
    getOverlay: (o) => R.get(o) || null,
    overrideOverlay: (o) => {
      n && "overrideOverlay" in n && typeof n.overrideOverlay == "function" ? n.overrideOverlay(o) : console.warn("overrideOverlay method not available on widget");
    },
    dispose: () => {
      t && re(t);
    },
    resize: () => {
      n && "resize" in n && typeof n.resize == "function" ? n.resize() : console.warn("resize method not available on widget");
    },
    getSettings: () => {
      var y, u, g, _, v, x, M, J, e1, j1, Z1, X1, W0, q0, ee, te;
      if (!n)
        return {};
      const o = n.getStyles(), l = (y = o.candle) == null ? void 0 : y.bar;
      return {
        // Candle settings
        candleType: (u = o.candle) == null ? void 0 : u.type,
        candleBarStyle: l == null ? void 0 : l.style,
        // bar.style might be LineType
        showLastPrice: (v = (_ = (g = o.candle) == null ? void 0 : g.priceMark) == null ? void 0 : _.last) == null ? void 0 : v.show,
        showHighestPrice: (J = (M = (x = o.candle) == null ? void 0 : x.priceMark) == null ? void 0 : M.high) == null ? void 0 : J.show,
        showLowestPrice: (Z1 = (j1 = (e1 = o.candle) == null ? void 0 : e1.priceMark) == null ? void 0 : j1.low) == null ? void 0 : Z1.show,
        // Indicator settings
        showIndicatorLastValue: (W0 = (X1 = o.indicator) == null ? void 0 : X1.lastValueMark) == null ? void 0 : W0.show,
        // Axis settings - yAxis.reverse is boolean according to YAxisStyle interface
        priceAxisType: (q0 = o.yAxis) == null ? void 0 : q0.type,
        reverseCoordinate: (ee = o.yAxis) == null ? void 0 : ee.reverse,
        // Grid settings
        showGrids: (te = o.grid) == null ? void 0 : te.show,
        timestamp: Date.now()
      };
    },
    setSettings: (o) => {
      var y, u, g, _, v, x, M, J, e1, j1, Z1;
      if (!n)
        return;
      const l = {};
      if (o.candleType !== void 0 && (l.candle = {
        ...l.candle,
        type: o.candleType
      }), o.candleBarStyle !== void 0) {
        const X1 = ((y = l.candle) == null ? void 0 : y.bar) || {};
        l.candle = {
          ...l.candle,
          bar: {
            ...X1,
            style: o.candleBarStyle
          }
          // Use any since ChangeColor doesn't have style
        };
      }
      o.showLastPrice !== void 0 && (l.candle = {
        ...l.candle,
        priceMark: {
          ...(u = l.candle) == null ? void 0 : u.priceMark,
          last: {
            ...(_ = (g = l.candle) == null ? void 0 : g.priceMark) == null ? void 0 : _.last,
            show: o.showLastPrice
          }
        }
      }), o.showHighestPrice !== void 0 && (l.candle = {
        ...l.candle,
        priceMark: {
          ...(v = l.candle) == null ? void 0 : v.priceMark,
          high: {
            ...(M = (x = l.candle) == null ? void 0 : x.priceMark) == null ? void 0 : M.high,
            show: o.showHighestPrice
          }
        }
      }), o.showLowestPrice !== void 0 && (l.candle = {
        ...l.candle,
        priceMark: {
          ...(J = l.candle) == null ? void 0 : J.priceMark,
          low: {
            ...(j1 = (e1 = l.candle) == null ? void 0 : e1.priceMark) == null ? void 0 : j1.low,
            show: o.showLowestPrice
          }
        }
      }), o.showIndicatorLastValue !== void 0 && (l.indicator = {
        ...l.indicator,
        lastValueMark: {
          ...(Z1 = l.indicator) == null ? void 0 : Z1.lastValueMark,
          show: o.showIndicatorLastValue
        }
      }), o.priceAxisType !== void 0 && (l.yAxis = {
        ...l.yAxis,
        type: o.priceAxisType
      }), o.reverseCoordinate !== void 0 && (l.yAxis = {
        ...l.yAxis,
        reverse: o.reverseCoordinate
      }), o.showGrids !== void 0 && (l.grid = {
        ...l.grid,
        show: o.showGrids
      }), n.setStyles(l);
    },
    resetSettings: () => {
      var y, u, g, _, v, x, M;
      if (!n)
        return;
      n.getStyles();
      const o = {
        candle: {
          type: E9.CandleSolid,
          // Default to solid candles
          priceMark: {
            last: {
              show: !0
            },
            high: {
              show: !0
            },
            low: {
              show: !0
            }
          }
        },
        indicator: {
          lastValueMark: {
            show: !0
          }
        },
        yAxis: {
          type: F9.Normal,
          reverse: !1
        },
        grid: {
          show: !0,
          horizontal: {
            show: !0,
            color: "#1e293b",
            size: 0.5
          },
          vertical: {
            show: !0,
            color: "#1e293b",
            size: 0.5
          }
        }
      }, l = z();
      if (l) {
        const J = {
          candle: {
            type: (y = l.candle) == null ? void 0 : y.type,
            bar: (u = l.candle) == null ? void 0 : u.bar,
            priceMark: (g = l.candle) == null ? void 0 : g.priceMark
          },
          indicator: {
            lastValueMark: (_ = l.indicator) == null ? void 0 : _.lastValueMark
          },
          yAxis: {
            type: (v = l.yAxis) == null ? void 0 : v.type,
            reverse: (x = l.yAxis) == null ? void 0 : x.reverse
          },
          grid: {
            show: (M = l.grid) == null ? void 0 : M.show
          }
        };
        n.setStyles(J);
      } else
        n.setStyles(o);
    },
    // === Drawing Methods ===
    saveDrawings: (o) => {
      const l = Array.from(R.values());
      l.forEach((y, u) => {
        var v;
        const g = m1(y.type), _ = ((v = y.points) == null ? void 0 : v.length) || 0;
        _ < g && console.warn(`⚠️ ${y.type} ${y.id} has only ${_} point(s), should have ${g}`);
      }), k1.saveDrawings(o, l);
    },
    loadDrawings: (o) => {
      const l = k1.loadDrawings(o);
      console.log(`🔄 Restoring ${l.length} drawings...`), l.forEach((y, u) => {
        var g, _;
        try {
          console.log(`   ${u + 1}/${l.length}: ${y.type} with ${((g = y.points) == null ? void 0 : g.length) || 0} points`);
          const v = {
            name: y.type,
            points: y.points || [],
            extendData: y.extendData,
            styles: y.styles,
            visible: y.visible ?? !0,
            lock: y.lock ?? !1,
            mode: y.mode ?? ne.Normal
          }, x = n == null ? void 0 : n.createOverlay(v);
          x && (console.log(`   ✅ Created ${x}`), R.set(x, {
            ...y,
            id: x
          }), X.set(x, {
            monitoring: !1,
            complete: !0,
            lastPointCount: ((_ = y.points) == null ? void 0 : _.length) || 0
          }));
        } catch (v) {
          console.error(`   ❌ Error restoring ${y.type}:`, v);
        }
      }), console.log("✅ Finished restoring drawings");
    },
    getDrawings: (o) => k1.loadDrawings(o),
    clearDrawings: (o) => {
      k1.clearDrawings(o);
    },
    // Auto-save on overlay events
    enableAutoSave: (o, l = !0) => {
      if (l) {
        console.log(`🔧 Auto-save enabled for ${o}`);
        const y = setInterval(() => {
          const u = Array.from(R.values());
          u.length > 0 && (console.log(`⏰ Auto-saving ${u.length} drawings...`), k1.saveDrawings(o, u));
        }, 3e4);
        return () => {
          clearInterval(y), console.log(`🔧 Auto-save disabled for ${o}`);
        };
      }
    }
  });
  const J0 = () => {
    n == null || n.resize();
  }, L0 = (o, l, y) => {
    let u = l, g = u;
    switch (o.timespan) {
      case "minute": {
        u = u - u % (60 * 1e3), g = u - y * o.multiplier * 60 * 1e3;
        break;
      }
      case "hour": {
        u = u - u % (60 * 60 * 1e3), g = u - y * o.multiplier * 60 * 60 * 1e3;
        break;
      }
      case "day": {
        u = u - u % (60 * 60 * 1e3), g = u - y * o.multiplier * 24 * 60 * 60 * 1e3;
        break;
      }
      case "week": {
        const v = new Date(u).getDay(), x = v === 0 ? 6 : v - 1;
        u = u - x * 60 * 60 * 24;
        const M = new Date(u);
        u = (/* @__PURE__ */ new Date(`${M.getFullYear()}-${M.getMonth() + 1}-${M.getDate()}`)).getTime(), g = y * o.multiplier * 7 * 24 * 60 * 60 * 1e3;
        break;
      }
      case "month": {
        const _ = new Date(u), v = _.getFullYear(), x = _.getMonth() + 1;
        u = (/* @__PURE__ */ new Date(`${v}-${x}-01`)).getTime(), g = y * o.multiplier * 30 * 24 * 60 * 60 * 1e3;
        const M = new Date(g);
        g = (/* @__PURE__ */ new Date(`${M.getFullYear()}-${M.getMonth() + 1}-01`)).getTime();
        break;
      }
      case "year": {
        const v = new Date(u).getFullYear();
        u = (/* @__PURE__ */ new Date(`${v}-01-01`)).getTime(), g = y * o.multiplier * 365 * 24 * 60 * 60 * 1e3;
        const x = new Date(g);
        g = (/* @__PURE__ */ new Date(`${x.getFullYear()}-01-01`)).getTime();
        break;
      }
    }
    return [g, u];
  };
  return Ve(() => {
    if (window.addEventListener("resize", J0), n = O9(t, {
      customApi: {
        formatDate: (u, g, _, v) => {
          switch (k().timespan) {
            case "minute":
              return v === J1.XAxis ? K.formatDate(u, g, "HH:mm") : K.formatDate(u, g, "YYYY-MM-DD HH:mm");
            case "hour":
              return v === J1.XAxis ? K.formatDate(u, g, "MM-DD HH:mm") : K.formatDate(u, g, "YYYY-MM-DD HH:mm");
            case "day":
            case "week":
              return K.formatDate(u, g, "YYYY-MM-DD");
            case "month":
              return v === J1.XAxis ? K.formatDate(u, g, "YYYY-MM") : K.formatDate(u, g, "YYYY-MM-DD");
            case "year":
              return v === J1.XAxis ? K.formatDate(u, g, "YYYY") : K.formatDate(u, g, "YYYY-MM-DD");
          }
          return K.formatDate(u, g, "YYYY-MM-DD HH:mm");
        }
      }
    }), n) {
      const u = n.getDom("candle_pane", ae.Main);
      if (u) {
        let _ = document.createElement("div");
        if (_.className = "klinecharts-pro-watermark", K.isString(e.watermark)) {
          const v = e.watermark.replace(/(^\s*)|(\s*$)/g, "");
          _.innerHTML = v;
        } else
          _.appendChild(e.watermark);
        u.appendChild(_);
      }
      const g = n.getDom("candle_pane", ae.YAxis);
      r = document.createElement("span"), r.className = "klinecharts-pro-price-unit", g == null || g.appendChild(r);
    }
    D().forEach((u) => {
      t0(n, u, !0, {
        id: "candle_pane"
      });
    });
    const o = {};
    e.subIndicators.forEach((u) => {
      const g = t0(n, u, !0);
      g && (o[u] = g);
    }), S(o), n == null || n.loadMore((u) => {
      a = !0, (async () => {
        const _ = k(), [v] = L0(_, u, 1), [x] = L0(_, v, 500), M = await e.datafeed.getHistoryKLineData(m(), _, x, v);
        n == null || n.applyMoreData(M, M.length > 0), a = !1;
      })();
    }), n == null || n.subscribeAction(B9.OnTooltipIconClick, (u) => {
      if (u.indicatorName)
        switch (u.iconId) {
          case "visible": {
            n == null || n.overrideIndicator({
              name: u.indicatorName,
              visible: !0
            }, u.paneId);
            break;
          }
          case "invisible": {
            n == null || n.overrideIndicator({
              name: u.indicatorName,
              visible: !1
            }, u.paneId);
            break;
          }
          case "setting": {
            const g = n == null ? void 0 : n.getIndicatorByPaneId(u.paneId, u.indicatorName);
            i1({
              visible: !0,
              indicatorName: u.indicatorName,
              paneId: u.paneId,
              calcParams: g.calcParams
            });
            break;
          }
          case "close":
            if (u.paneId === "candle_pane") {
              const g = [...D()];
              n == null || n.removeIndicator("candle_pane", u.indicatorName), g.splice(g.indexOf(u.indicatorName), 1), Y(g);
            } else {
              const g = {
                ...P()
              };
              n == null || n.removeIndicator(u.paneId, u.indicatorName), delete g[u.indicatorName], S(g);
            }
        }
    });
    const l = n == null ? void 0 : n.createOverlay;
    n && l && (n.createOverlay = function(...u) {
      const g = u[0], _ = l.apply(this, u);
      return _ && (console.log(`🆕 ${g.name} created with ID: ${_}`), D9(_, g.name || "unknown"), v1(_), X0()), _;
    });
    const y = n == null ? void 0 : n.removeOverlay;
    n && y && (n.removeOverlay = function(...u) {
      const g = y.apply(this, u), _ = u[0];
      if (typeof _ == "string") {
        const v = _;
        R.delete(v);
        const x = X.get(v);
        x && (x.checkInterval && clearInterval(x.checkInterval), x.mouseUpHandler && (document.removeEventListener("mouseup", x.mouseUpHandler), document.removeEventListener("touchend", x.mouseUpHandler)), X.delete(v)), console.log(`🗑️ Removed overlay ${v}`);
      } else if (_ && typeof _ == "object" && _.id) {
        const v = _.id;
        R.delete(v);
        const x = X.get(v);
        x && (x.checkInterval && clearInterval(x.checkInterval), x.mouseUpHandler && (document.removeEventListener("mouseup", x.mouseUpHandler), document.removeEventListener("touchend", x.mouseUpHandler)), X.delete(v)), console.log(`🗑️ Removed overlay ${v}`);
      }
      return g;
    });
  }), B0(() => {
    window.removeEventListener("resize", J0), X.forEach((o, l) => {
      o.checkInterval && clearInterval(o.checkInterval), o.mouseUpHandler && (document.removeEventListener("mouseup", o.mouseUpHandler), document.removeEventListener("touchend", o.mouseUpHandler));
    }), X.clear(), R.clear(), re(t);
  }), f1(() => {
    const o = m();
    o != null && o.priceCurrency ? (r.innerHTML = o == null ? void 0 : o.priceCurrency.toLocaleUpperCase(), r.style.display = "flex") : r.style.display = "none", n == null || n.setPriceVolumePrecision((o == null ? void 0 : o.pricePrecision) ?? 2, (o == null ? void 0 : o.volumePrecision) ?? 0);
  }), f1((o) => {
    if (!a) {
      o && e.datafeed.unsubscribe(o.symbol, o.period);
      const l = m(), y = k();
      return a = !0, T(!0), (async () => {
        const [g, _] = L0(y, (/* @__PURE__ */ new Date()).getTime(), 500), v = await e.datafeed.getHistoryKLineData(l, y, g, _);
        n == null || n.applyNewData(v, v.length > 0), e.datafeed.subscribe(l, y, (x) => {
          n == null || n.updateData(x);
        }), a = !1, T(!1);
      })(), {
        symbol: l,
        period: y
      };
    }
    return o;
  }), f1(() => {
    const o = i();
    n == null || n.setStyles(o);
    const l = o === "dark" ? "#929AA5" : "#76808F";
    n == null || n.setStyles({
      indicator: {
        tooltip: {
          icons: [{
            id: "visible",
            position: W1.Middle,
            marginLeft: 8,
            marginTop: 7,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: 14,
            color: l,
            activeColor: l,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "invisible",
            position: W1.Middle,
            marginLeft: 8,
            marginTop: 7,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: 14,
            color: l,
            activeColor: l,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "setting",
            position: W1.Middle,
            marginLeft: 6,
            marginTop: 7,
            marginBottom: 0,
            marginRight: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: 14,
            color: l,
            activeColor: l,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "close",
            position: W1.Middle,
            marginLeft: 6,
            marginTop: 7,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: 14,
            color: l,
            activeColor: l,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }]
        }
      }
    });
  }), f1(() => {
    n == null || n.setLocale(h());
  }), f1(() => {
    n == null || n.setTimezone(n1().key);
  }), f1(() => {
    s() && (n == null || n.setStyles(s()), u1(Rr(n.getStyles())));
  }), [Mu.cloneNode(!0), L(W, {
    get when() {
      return H1();
    },
    get children() {
      return L(wu, {
        get locale() {
          return e.locale;
        },
        get datafeed() {
          return e.datafeed;
        },
        onSymbolSelected: (o) => {
          b(o);
        },
        onClose: () => {
          V1(!1);
        }
      });
    }
  }), L(W, {
    get when() {
      return j();
    },
    get children() {
      return L(du, {
        get locale() {
          return e.locale;
        },
        get mainIndicators() {
          return D();
        },
        get subIndicators() {
          return P();
        },
        onClose: () => {
          Q(!1);
        },
        onMainIndicatorChange: (o) => {
          const l = [...D()];
          o.added ? (t0(n, o.name, !0, {
            id: "candle_pane"
          }), l.push(o.name)) : (n == null || n.removeIndicator("candle_pane", o.name), l.splice(l.indexOf(o.name), 1)), Y(l);
        },
        onSubIndicatorChange: (o) => {
          const l = {
            ...P()
          };
          if (o.added) {
            const y = t0(n, o.name);
            y && (l[o.name] = y);
          } else
            o.paneId && (n == null || n.removeIndicator(o.paneId, o.name), delete l[o.name]);
          S(l);
        }
      });
    }
  }), L(W, {
    get when() {
      return w();
    },
    get children() {
      return L(hu, {
        get locale() {
          return e.locale;
        },
        get timezone() {
          return n1();
        },
        onClose: () => {
          Z(!1);
        },
        onConfirm: l1
      });
    }
  }), L(W, {
    get when() {
      return I();
    },
    get children() {
      return L(pu, {
        get locale() {
          return e.locale;
        },
        get currentStyles() {
          return K.clone(n.getStyles());
        },
        onClose: () => {
          F(!1);
        },
        onChange: (o) => {
          n == null || n.setStyles(o);
        },
        onRestoreDefault: (o) => {
          const l = {};
          o.forEach((y) => {
            const u = y.key;
            S0(l, u, K.formatValue(z(), u));
          }), n == null || n.setStyles(l);
        }
      });
    }
  }), L(W, {
    get when() {
      return F1().length > 0;
    },
    get children() {
      return L(vu, {
        get locale() {
          return e.locale;
        },
        get url() {
          return F1();
        },
        onClose: () => {
          K1("");
        }
      });
    }
  }), L(W, {
    get when() {
      return G().visible;
    },
    get children() {
      return L(bu, {
        get locale() {
          return e.locale;
        },
        get params() {
          return G();
        },
        onClose: () => {
          i1({
            visible: !1,
            indicatorName: "",
            paneId: "",
            calcParams: []
          });
        },
        onConfirm: (o) => {
          const l = G();
          n == null || n.overrideIndicator({
            name: l.indicatorName,
            calcParams: o
          }, l.paneId);
        }
      });
    }
  }), L(Oc, {
    get locale() {
      return e.locale;
    },
    get symbol() {
      return m();
    },
    get spread() {
      return p1();
    },
    get period() {
      return k();
    },
    get periods() {
      return e.periods;
    },
    onMenuClick: async () => {
      try {
        await c5(() => Y1(!p1())), n == null || n.resize();
      } catch {
      }
    },
    onSymbolClick: () => {
      V1(!H1());
    },
    onPeriodChange: N,
    onIndicatorClick: () => {
      Q((o) => !o);
    },
    onTimezoneClick: () => {
      Z((o) => !o);
    },
    onSettingClick: () => {
      F((o) => !o);
    },
    onScreenshotClick: () => {
      if (n) {
        const o = n.getConvertPictureUrl(!0, "jpeg", e.theme === "dark" ? "#151517" : "#ffffff");
        K1(o);
      }
    }
  }), (() => {
    const o = Su.cloneNode(!0), l = o.firstChild;
    $(o, L(W, {
      get when() {
        return G1();
      },
      get children() {
        return L(M9, {});
      }
    }), l), $(o, L(W, {
      get when() {
        return p1();
      },
      get children() {
        return L(fu, {
          get locale() {
            return e.locale;
          },
          onDrawingItemClick: (u) => {
            n == null || n.createOverlay(u);
          },
          onModeChange: (u) => {
            n == null || n.overrideOverlay({
              mode: u
            });
          },
          onLockChange: (u) => {
            n == null || n.overrideOverlay({
              lock: u
            });
          },
          onVisibleChange: (u) => {
            n == null || n.overrideOverlay({
              visible: u
            });
          },
          onRemoveClick: (u) => {
            n == null || n.removeOverlay({
              groupId: u
            });
          }
        });
      }
    }), l);
    const y = t;
    return typeof y == "function" ? E0(y, l) : t = l, H(() => r1(l, "data-drawing-bar-visible", p1())), o;
  })()];
}, Tu = /* @__PURE__ */ p('<svg class="logo" viewBox="0 0 80 92"><path d="M28.148808359375,51.7280513671875L22.963588359375,51.7280513671875C21.572648359375002,51.7280513671875,20.445068359375,52.6220613671875,20.445068359375,53.7248813671875L20.445068359375,72.3979013671875C20.445068359375,73.5007013671875,21.572648359375002,74.39470136718751,22.963588359375,74.39470136718751L33.926568359375,74.39470136718751C35.317468359375,74.39470136718751,36.445068359375,73.5007013671875,36.445068359375,72.3979013671875L36.445068359375,53.7248813671875C36.445068359375,52.6220613671875,35.317468359375,51.7280513671875,33.926568359375,51.7280513671875L28.741398359374998,51.7280513671875L28.741398359374998,46.2963223671875C28.741398359374998,46.1665793671875,28.608748359375,46.0614013671875,28.445108359375,46.0614013671875C28.281468359375,46.0614013671875,28.148808359375,46.1665793671875,28.148808359375,46.2963223671875L28.148808359375,51.7280513671875ZM28.741398359374998,74.3948013671875L28.741398359374998,79.82650136718749C28.741398359374998,79.9563013671875,28.608748359375,80.0614013671875,28.445108359375,80.0614013671875C28.281468359375,80.0614013671875,28.148808359375,79.9563013671875,28.148808359375,79.82650136718749L28.148808359375,74.3948013671875L28.741398359374998,74.3948013671875Z"></path><path d="M51.148808359374996,44.7280513671875L45.963588359375,44.7280513671875C44.572648359375,44.7280513671875,43.445068359375,45.6220613671875,43.445068359375,46.7248813671875L43.445068359375,65.3979013671875C43.445068359375,66.5007013671875,44.572648359375,67.39470136718751,45.963588359375,67.39470136718751L56.926568359375,67.39470136718751C58.317468359375,67.39470136718751,59.445068359375,66.5007013671875,59.445068359375,65.3979013671875L59.445068359375,46.7248813671875C59.445068359375,45.6220613671875,58.317468359375,44.7280513671875,56.926568359375,44.7280513671875L51.741398359375,44.7280513671875L51.741398359375,39.2963223671875C51.741398359375,39.1665793671875,51.608748359375,39.0614013671875,51.445108359375,39.0614013671875C51.281468359375,39.0614013671875,51.148808359374996,39.1665793671875,51.148808359374996,39.2963223671875L51.148808359374996,44.7280513671875ZM51.741398359375,67.3948013671875L51.741398359375,72.82650136718749C51.741398359375,72.9563013671875,51.608748359375,73.0614013671875,51.445108359375,73.0614013671875C51.281468359375,73.0614013671875,51.148808359374996,72.9563013671875,51.148808359374996,72.82650136718749L51.148808359374996,67.3948013671875L51.741398359375,67.3948013671875Z"></path><path d="M17.7274,90.6541C17.5901,90.6541,17.4517,90.6436,17.3121,90.6225C9.93219,89.5095,4.80718,86.7136,2.07787,82.3084C-1.1223,77.1437,0.241766,71.6314,0.56829,70.5137C5.37624,46.647,15.0785,38.4945,21.5025,33.0957C22.9683,31.8633,24.2342,30.7995,25.1676,29.7672C25.4105,29.4984,25.6051,29.2154,25.7556,28.9202C24.7465,29.2231,24.1971,29.4326,24.1703,29.4429C22.908,29.9368,21.4777,29.3247,20.9761,28.076C20.4756,26.8272,21.0897,25.4146,22.352,24.9172C22.5042,24.8571,23.5312,24.4607,25.3073,23.9616C24.087,21.4425,21.7693,18.7949,19.7125,16.6431L19.2819,16.1902C16.2438,12.9776,14.6017,4.80159,14.3036,3.19471C14.1306,2.26212,14.4636,1.30796,15.1814,0.679657C15.8995,0.0512175,16.8976,-0.159672,17.8125,0.123747C22.7731,1.66274,24.2638,1.81255,27.2321,2.11098C28.7357,2.26195,29.83,3.59029,29.6762,5.07662C29.5236,6.56295,28.182,7.64786,26.6784,7.49454C24.4992,7.27569,22.9517,7.09896,20.724,6.56646C21.4493,9.09088,22.3803,11.5427,23.2771,12.4919L23.6876,12.9237C25.3757,14.69,28.9691,18.45,30.7016,22.7299C35.0392,21.9433,40.8791,21.3359,47.7817,21.7249C48.2004,20.7386,48.8054,19.7953,49.5907,18.9135C49.7137,18.7754,49.8498,18.6502,49.9988,18.539C53.6142,15.8508,57.5491,12.857,59.7803,11.0758C58.1028,11.2502,56.1034,11.0278,53.9124,9.70882C53.2439,9.30622,52.5992,8.89427,51.9662,8.48933C48.4668,6.25164,46.497,5.12109,43.4234,5.94853C41.9647,6.34058,40.4622,5.48975,40.0659,4.04789C39.6695,2.60604,40.5296,1.11853,41.9871,0.726471C47.5602,-0.773825,51.4796,1.73271,54.9364,3.9434L54.9364,3.9434C55.5284,4.32176,56.1318,4.70797,56.7564,5.08482C58.3843,6.06556,59.4858,5.76127,61.2899,5.13865C62.3511,4.77234,63.5567,4.35687,64.8675,4.53476C66.3321,4.73254,67.4406,5.56933,67.9103,6.83096C68.7444,9.07333,67.1035,11.5533,65.5797,13.2374C64.6729,14.2394,60.0845,17.7606,56.4519,20.4957C56.9477,20.3369,57.4767,20.2511,58.026,20.2511C59.4281,20.2511,60.6982,20.8102,61.621,21.7153C65.4948,20.6901,67.87,17.9563,67.9033,17.9175C68.78,16.8888,70.3322,16.7577,71.3721,17.6226C72.412,18.4886,72.5457,20.0253,71.6702,21.054C71.5221,21.2286,69.5063,23.5492,66.0787,25.233C69.5399,26.8822,72.9993,29.682,74.1841,34.4145C74.5106,35.7206,73.7062,37.0407,72.3859,37.3638C72.1871,37.4117,71.9884,37.4351,71.792,37.4351C70.687,37.4351,69.6826,36.6932,69.4046,35.5848C68.4378,31.7217,64.8144,29.7431,61.7619,28.7456C60.8298,29.7349,59.5009,30.3535,58.026,30.3535C55.8642,30.3535,54.0162,29.0245,53.2713,27.1474C53.2022,27.138,53.1331,27.1287,53.0642,27.1195C54.232,29.5936,57.0851,31.9259,58.1868,32.665C58.3157,32.7516,58.4423,32.8523,58.5547,32.9599C66.5865,40.6151,72.4887,48.8133,76.0971,57.3287C76.6815,58.7074,76.0249,60.2932,74.6313,60.8702C74.2976,61.01,73.9388,61.082,73.576,61.082C72.5065,61.082,71.4914,60.4582,71.0525,59.4213C67.7577,51.6455,62.331,44.1074,54.9203,37.0116C53.6073,36.1009,48.0984,31.9917,47.2065,26.583C40.9421,26.2679,35.6187,26.8278,31.6725,27.5336C31.6197,29.527,30.9225,31.5172,29.2456,33.3731C28.0614,34.6827,26.5968,35.915,25.0446,37.2188C21.9414,39.8269,18.2648,42.9169,14.8104,48.1192C11.356,53.3215,8.12389,60.6361,5.9098,71.6934C5.88732,71.8035,5.85893,71.9123,5.82344,72.0188C5.81634,72.041,4.57886,76.0413,6.77344,79.5289C8.6332,82.4828,12.4557,84.4139,18.1367,85.2705C19.6297,85.4953,20.6566,86.8762,20.4295,88.3532C20.2213,89.6944,19.0559,90.6541,17.7274,90.6541ZM35.1195,7.03101C33.3502,7.03101,31.9158,5.61208,31.9158,3.86173C31.9158,2.11139,33.3502,0.69245,35.1195,0.69245C36.8889,0.69245,38.3233,2.11139,38.3233,3.86173C38.3233,5.61208,36.8889,7.03101,35.1195,7.03101ZM57.6848,23.1892L58.414,24.4754C58.8984,24.3623,59.3923,24.3435,59.8644,24.4203C60.2191,24.5005,60.5087,24.7182,60.6663,25.0229C60.8636,25.3394,60.8993,25.7346,60.7646,26.1094C60.5988,26.5176,60.2972,26.8749,59.9085,27.1235L60.31,27.8316L59.7886,28.1294L59.3994,27.443C58.9257,27.7175,58.399,27.883,57.8664,27.9247L57.3744,27.0569C57.6378,27.0741,57.9071,27.048,58.1704,26.9797C58.4501,26.9251,58.7239,26.8323,58.9829,26.7044L58.2801,25.4647C57.8047,25.5877,57.3167,25.6065,56.8549,25.5197C56.4913,25.4263,56.196,25.1971,56.0328,24.8814C55.8433,24.5561,55.8127,24.1572,55.9484,23.7789C56.088,23.373,56.3763,23.0149,56.7584,22.7726L56.4166,22.1699L56.938,21.8721L57.2727,22.4625C57.6615,22.2376,58.0888,22.0901,58.5254,22.0301L59.0042,22.8746C58.5548,22.8828,58.103,22.9906,57.6848,23.1892ZM56.9319,24.2961Q57.1278,24.6417,57.7863,24.5856L57.1695,23.4978Q56.6982,23.884,56.9319,24.2961ZM58.9077,25.3462L59.4981,26.3875L59.499,26.3891Q59.9965,26.0045,59.7628,25.5923Q59.573,25.2576,58.9077,25.3462ZM73.2212,66.5065C73.2212,68.2569,74.6555,69.6758,76.4249,69.6758C78.1943,69.6758,79.6286,68.2569,79.6286,66.5065C79.6286,64.7562,78.1943,63.3372,76.4249,63.3372C74.6555,63.3372,73.2212,64.7562,73.2212,66.5065ZM35.9465,91.8045C35.0734,91.8045,34.2038,91.7987,33.3378,91.7858C31.827,91.7636,30.6203,90.5359,30.6428,89.0402C30.6653,87.5457,31.9158,86.3297,33.4183,86.3742C49.6344,86.6059,65.7512,84.6175,67.6134,84.037C72.1953,82.4184,74.5295,79.3603,74.5295,74.9575C74.5295,73.463,75.754,72.2517,77.2648,72.2517C78.7755,72.2517,80,73.463,80,74.9575C80,81.5992,76.148,86.7686,69.4317,89.142C67.0041,89.9999,51.0955,91.8046,35.9465,91.8045ZM25.2731,92C23.5037,92,22.0693,90.5811,22.0693,88.8307C22.0693,87.0804,23.5037,85.6615,25.2731,85.6615C27.0424,85.6615,28.4768,87.0804,28.4768,88.8307C28.4768,90.5811,27.0424,92,25.2731,92Z"></path></svg>'), Du = Tu.cloneNode(!0);
class Eu {
  constructor(t) {
    Q1(this, "_chartApi", null);
    if (K.isString(t.container)) {
      if (this._container = document.getElementById(t.container), !this._container)
        throw new Error("Container is null");
    } else
      this._container = t.container;
    this._container.classList.add("klinecharts-pro"), this._container.setAttribute("data-theme", t.theme ?? "light");
    const n = this;
    m5(() => L(Iu, {
      ref: (r) => {
        n._chartApi = r;
      },
      get styles() {
        return t.styles ?? {};
      },
      get watermark() {
        return t.watermark ?? Du;
      },
      get theme() {
        return t.theme ?? "light";
      },
      get locale() {
        return t.locale ?? "zh-CN";
      },
      get drawingBarVisible() {
        return t.drawingBarVisible ?? !0;
      },
      get symbol() {
        return t.symbol;
      },
      get period() {
        return t.period;
      },
      get periods() {
        return t.periods ?? [{
          multiplier: 1,
          timespan: "minute",
          text: "1m"
        }, {
          multiplier: 5,
          timespan: "minute",
          text: "5m"
        }, {
          multiplier: 15,
          timespan: "minute",
          text: "15m"
        }, {
          multiplier: 1,
          timespan: "hour",
          text: "1H"
        }, {
          multiplier: 2,
          timespan: "hour",
          text: "2H"
        }, {
          multiplier: 4,
          timespan: "hour",
          text: "4H"
        }, {
          multiplier: 1,
          timespan: "day",
          text: "D"
        }, {
          multiplier: 1,
          timespan: "week",
          text: "W"
        }, {
          multiplier: 1,
          timespan: "month",
          text: "M"
        }, {
          multiplier: 1,
          timespan: "year",
          text: "Y"
        }];
      },
      get timezone() {
        return t.timezone ?? "Asia/Shanghai";
      },
      get mainIndicators() {
        return t.mainIndicators ?? ["MA"];
      },
      get subIndicators() {
        return t.subIndicators ?? ["VOL"];
      },
      get datafeed() {
        return t.datafeed;
      }
    }), this._container);
  }
  // Drawing methods
  createOverlay(t) {
    var n, r;
    return ((r = (n = this._chartApi) == null ? void 0 : n.createOverlay) == null ? void 0 : r.call(n, t)) ?? null;
  }
  removeOverlay(t) {
    var n, r;
    (r = (n = this._chartApi) == null ? void 0 : n.removeOverlay) == null || r.call(n, t);
  }
  removeAllOverlay() {
    var t, n;
    (n = (t = this._chartApi) == null ? void 0 : t.removeAllOverlay) == null || n.call(t);
  }
  getAllOverlay() {
    var t, n;
    return ((n = (t = this._chartApi) == null ? void 0 : t.getAllOverlay) == null ? void 0 : n.call(t)) || [];
  }
  getOverlay(t) {
    var n, r;
    return ((r = (n = this._chartApi) == null ? void 0 : n.getOverlay) == null ? void 0 : r.call(n, t)) ?? null;
  }
  overrideOverlay(t) {
    var n, r;
    (r = (n = this._chartApi) == null ? void 0 : n.overrideOverlay) == null || r.call(n, t);
  }
  // Utility methods
  dispose() {
    var t, n;
    (n = (t = this._chartApi) == null ? void 0 : t.dispose) == null || n.call(t);
  }
  resize() {
    var t, n;
    (n = (t = this._chartApi) == null ? void 0 : t.resize) == null || n.call(t);
  }
  getMainIndicators() {
    return this._chartApi.getMainIndicators();
  }
  overrideIndicator(t, n) {
    const r = this._chartApi;
    r && typeof r.overrideIndicator == "function" ? r.overrideIndicator(t, n) : console.warn("overrideIndicator method not available on chart API");
  }
  setMainIndicators(t) {
    return this._chartApi.setMainIndicators(t);
  }
  getSubIndicators() {
    return this._chartApi.getSubIndicators();
  }
  setSubIndicators(t) {
    return this._chartApi.setSubIndicators(t);
  }
  setTheme(t) {
    var n;
    (n = this._container) == null || n.setAttribute("data-theme", t), this._chartApi.setTheme(t);
  }
  getTheme() {
    return this._chartApi.getTheme();
  }
  setStyles(t) {
    this._chartApi.setStyles(t);
  }
  getStyles() {
    return this._chartApi.getStyles();
  }
  setLocale(t) {
    this._chartApi.setLocale(t);
  }
  getLocale() {
    return this._chartApi.getLocale();
  }
  setTimezone(t) {
    this._chartApi.setTimezone(t);
  }
  getTimezone() {
    return this._chartApi.getTimezone();
  }
  setSymbol(t) {
    this._chartApi.setSymbol(t);
  }
  getSymbol() {
    return this._chartApi.getSymbol();
  }
  setPeriod(t) {
    this._chartApi.setPeriod(t);
  }
  getPeriod() {
    return this._chartApi.getPeriod();
  }
  getSettings() {
    return this._chartApi.getSettings();
  }
  setSettings(t) {
    this._chartApi.setSettings(t);
  }
  resetSettings() {
    this._chartApi.resetSettings();
  }
  saveDrawings(t) {
    var n, r;
    (r = (n = this._chartApi) == null ? void 0 : n.saveDrawings) == null || r.call(n, t);
  }
  loadDrawings(t) {
    var n, r;
    (r = (n = this._chartApi) == null ? void 0 : n.loadDrawings) == null || r.call(n, t);
  }
  getDrawings(t) {
    var n, r;
    return ((r = (n = this._chartApi) == null ? void 0 : n.getDrawings) == null ? void 0 : r.call(n, t)) || [];
  }
  clearDrawings(t) {
    var n, r;
    (r = (n = this._chartApi) == null ? void 0 : n.clearDrawings) == null || r.call(n, t);
  }
  enableAutoSave(t, n = !0) {
    var r, a;
    (a = (r = this._chartApi) == null ? void 0 : r.enableAutoSave) == null || a.call(r, t, n);
  }
}
r5.forEach((e) => {
  K9(e);
});
export {
  Ou as DefaultDatafeed,
  Eu as KLineChartPro,
  Bu as loadLocales
};
//# sourceMappingURL=klinecharts-pro.js.map
