var m9 = Object.defineProperty;
var p9 = (e, t, n) => t in e ? m9(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ce = (e, t, n) => (p9(e, typeof t != "symbol" ? t + "" : t, n), n);
import { utils as n1, OverlayMode as B0, init as v9, FormatDateType as $e, DomPosition as U0, ActionType as be, dispose as F0, TooltipIconPosition as Le, CandleType as _9, YAxisType as $9, registerOverlay as b9 } from "klinecharts";
function ue(e, t, n) {
  const r = (e.x - t.x) * Math.cos(n) - (e.y - t.y) * Math.sin(n) + t.x, a = (e.x - t.x) * Math.sin(n) + (e.y - t.y) * Math.cos(n) + t.y;
  return { x: r, y: a };
}
function We(e, t) {
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
      y: n1.getLinearYFromCoordinates(e[0], e[1], { x: 0, y: e[0].y })
    } : n = {
      x: t.width,
      y: n1.getLinearYFromCoordinates(e[0], e[1], { x: t.width, y: e[0].y })
    }, { coordinates: [e[0], n] };
  }
  return [];
}
function At(e, t) {
  const n = Math.abs(e.x - t.x), r = Math.abs(e.y - t.y);
  return Math.sqrt(n * n + r * r);
}
const L9 = {
  name: "arrow",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = e[1].x > e[0].x ? 0 : 1, n = n1.getLinearSlopeIntercept(e[0], e[1]);
      let r;
      n ? r = Math.atan(n[0]) + Math.PI * t : e[1].y > e[0].y ? r = Math.PI / 2 : r = Math.PI / 2 * 3;
      const a = ue({ x: e[1].x - 8, y: e[1].y + 4 }, e[1], r), s = ue({ x: e[1].x - 8, y: e[1].y - 4 }, e[1], r);
      return [
        {
          type: "line",
          attrs: { coordinates: e }
        },
        {
          type: "line",
          ignoreEvent: !0,
          attrs: { coordinates: [a, e[1], s] }
        }
      ];
    }
    return [];
  }
}, x9 = {
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
      const t = At(e[0], e[1]);
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
}, k9 = {
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
}, A9 = {
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
}, w9 = {
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
}, M9 = {
  name: "fibonacciCircle",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = Math.abs(e[0].x - e[1].x), n = Math.abs(e[0].y - e[1].y), r = Math.sqrt(t * t + n * n), a = [0.236, 0.382, 0.5, 0.618, 0.786, 1], s = [], l = [];
      return a.forEach((c) => {
        const h = r * c;
        s.push(
          { ...e[0], r: h }
        ), l.push({
          x: e[0].x,
          y: e[0].y + h + 6,
          text: `${(c * 100).toFixed(1)}%`
        });
      }), [
        {
          type: "circle",
          attrs: s,
          styles: { style: "stroke" }
        },
        {
          type: "text",
          ignoreEvent: !0,
          attrs: l
        }
      ];
    }
    return [];
  }
}, S9 = {
  name: "fibonacciSegment",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: n }) => {
    const r = [], a = [];
    if (e.length > 1) {
      const s = e[1].x > e[0].x ? e[0].x : e[1].x, l = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0], c = e[0].y - e[1].y, h = t.points, m = h[0].value - h[1].value;
      l.forEach((d) => {
        const $ = e[1].y + c * d, v = (h[1].value + m * d).toFixed(n.price);
        r.push({ coordinates: [{ x: e[0].x, y: $ }, { x: e[1].x, y: $ }] }), a.push({
          x: s,
          y: $,
          text: `${v} (${(d * 100).toFixed(1)}%)`,
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
}, T9 = {
  name: "fibonacciSpiral",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, bounding: t }) => {
    if (e.length > 1) {
      const n = At(e[0], e[1]) / Math.sqrt(24), r = e[1].x > e[0].x ? 0 : 1, a = n1.getLinearSlopeIntercept(e[0], e[1]);
      let s;
      a ? s = Math.atan(a[0]) + Math.PI * r : e[1].y > e[0].y ? s = Math.PI / 2 : s = Math.PI / 2 * 3;
      const l = ue(
        { x: e[0].x - n, y: e[0].y },
        e[0],
        s
      ), c = ue(
        { x: e[0].x - n, y: e[0].y - n },
        e[0],
        s
      ), h = [{
        ...l,
        r: n,
        startAngle: s,
        endAngle: s + Math.PI / 2
      }, {
        ...c,
        r: n * 2,
        startAngle: s + Math.PI / 2,
        endAngle: s + Math.PI
      }];
      let m = e[0].x - n, d = e[0].y - n;
      for (let $ = 2; $ < 9; $++) {
        const v = h[$ - 2].r + h[$ - 1].r;
        let A = 0;
        switch ($ % 4) {
          case 0: {
            A = s, m -= h[$ - 2].r;
            break;
          }
          case 1: {
            A = s + Math.PI / 2, d -= h[$ - 2].r;
            break;
          }
          case 2: {
            A = s + Math.PI, m += h[$ - 2].r;
            break;
          }
          case 3: {
            A = s + Math.PI / 2 * 3, d += h[$ - 2].r;
            break;
          }
        }
        const T = A + Math.PI / 2, E = ue({ x: m, y: d }, e[0], s);
        h.push({
          ...E,
          r: v,
          startAngle: A,
          endAngle: T
        });
      }
      return [
        {
          type: "arc",
          attrs: h
        },
        {
          type: "line",
          attrs: We(e, t)
        }
      ];
    }
    return [];
  }
}, P9 = {
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
      const s = e[1].x > e[0].x ? -38 : 4, l = e[1].y > e[0].y ? -2 : 20, c = e[1].x - e[0].x, h = e[1].y - e[0].y;
      [1, 0.75, 0.618, 0.5, 0.382, 0.25, 0].forEach((d) => {
        const $ = e[1].x - c * d, v = e[1].y - h * d;
        n.push({ coordinates: [{ x: $, y: e[0].y }, { x: $, y: e[1].y }] }), n.push({ coordinates: [{ x: e[0].x, y: v }, { x: e[1].x, y: v }] }), r = r.concat(We([e[0], { x: $, y: e[1].y }], t)), r = r.concat(We([e[0], { x: e[1].x, y: v }], t)), a.unshift({
          x: e[0].x + s,
          y: v + 10,
          text: `${d.toFixed(3)}`
        }), a.unshift({
          x: $ - 18,
          y: e[0].y + l,
          text: `${d.toFixed(3)}`
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
}, I9 = {
  name: "fibonacciExtension",
  totalStep: 4,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: n }) => {
    const r = [], a = [];
    if (e.length > 2) {
      const s = t.points, l = s[1].value - s[0].value, c = e[1].y - e[0].y, h = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1], m = e[2].x > e[1].x ? e[1].x : e[2].x;
      h.forEach((d) => {
        const $ = e[2].y + c * d, v = (s[2].value + l * d).toFixed(n.price);
        r.push({ coordinates: [{ x: e[1].x, y: $ }, { x: e[2].x, y: $ }] }), a.push({
          x: m,
          y: $,
          text: `${v} (${(d * 100).toFixed(1)}%)`,
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
}, O9 = {
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
}, N9 = {
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
}, D9 = {
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
}, E9 = {
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
}, B9 = {
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
}, U9 = {
  name: "abcd",
  totalStep: 5,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    let t = [], n = [];
    const r = ["A", "B", "C", "D"], a = e.map((s, l) => ({
      ...s,
      baseline: "bottom",
      text: `(${r[l]})`
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
}, F9 = {
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
    const n = [], r = [], a = ["X", "A", "B", "C", "D"], s = e.map((l, c) => ({
      ...l,
      baseline: "bottom",
      text: `(${a[c]})`
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
        attrs: s
      }
    ];
  }
}, K9 = [
  L9,
  x9,
  k9,
  w9,
  A9,
  M9,
  S9,
  T9,
  P9,
  I9,
  O9,
  N9,
  D9,
  E9,
  B9,
  U9,
  F9
];
class Fd {
  constructor(t) {
    ce(this, "_apiKey");
    ce(this, "_prevSymbolMarket");
    ce(this, "_ws");
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
    return await ((await (await fetch(`https://api.polygon.io/v2/aggs/ticker/${t.ticker}/range/${n.multiplier}/${n.timespan}/${r}/${a}?apiKey=${this._apiKey}`)).json()).results || []).map((c) => ({
      timestamp: c.t,
      open: c.o,
      high: c.h,
      low: c.l,
      close: c.c,
      volume: c.v,
      turnover: c.vw
    }));
  }
  subscribe(t, n, r) {
    var a, s;
    this._prevSymbolMarket !== t.market ? ((a = this._ws) == null || a.close(), this._ws = new WebSocket(`wss://delayed.polygon.io/${t.market}`), this._ws.onopen = () => {
      var l;
      (l = this._ws) == null || l.send(JSON.stringify({ action: "auth", params: this._apiKey }));
    }, this._ws.onmessage = (l) => {
      var h;
      const c = JSON.parse(l.data);
      c[0].ev === "status" ? c[0].status === "auth_success" && ((h = this._ws) == null || h.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` }))) : "sym" in c && r({
        timestamp: c.s,
        open: c.o,
        high: c.h,
        low: c.l,
        close: c.c,
        volume: c.v,
        turnover: c.vw
      });
    }) : (s = this._ws) == null || s.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` })), this._prevSymbolMarket = t.market;
  }
  unsubscribe(t, n) {
  }
}
const s1 = {};
function j9(e) {
  s1.context = e;
}
const z9 = (e, t) => e === t, Xe = Symbol("solid-proxy"), Q9 = Symbol("solid-track"), Me = {
  equals: z9
};
let wt = Pt;
const T1 = 1, Se = 2, Mt = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, Ye = {};
var a1 = null;
let U1 = null, e1 = null, c1 = null, M1 = null, s0 = 0;
function de(e, t) {
  const n = e1, r = a1, a = e.length === 0, s = a ? Mt : {
    owned: null,
    cleanups: null,
    context: null,
    owner: t === void 0 ? r : t
  }, l = a ? e : () => e(() => S1(() => Ue(s)));
  a1 = s, e1 = null;
  try {
    return I1(l, !0);
  } finally {
    e1 = n, a1 = r;
  }
}
function w(e, t) {
  t = t ? Object.assign({}, Me, t) : Me;
  const n = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, r = (a) => (typeof a == "function" && (a = a(n.value)), Tt(n, a));
  return [St.bind(n), r];
}
function K0(e, t, n) {
  const r = Be(e, t, !0, T1);
  q1(r);
}
function Q(e, t, n) {
  const r = Be(e, t, !1, T1);
  q1(r);
}
function m1(e, t, n) {
  wt = G9;
  const r = Be(e, t, !1, T1);
  r.user = !0, M1 ? M1.push(r) : q1(r);
}
function V(e, t, n) {
  n = n ? Object.assign({}, Me, n) : Me;
  const r = Be(e, t, !0, 0);
  return r.observers = null, r.observerSlots = null, r.comparator = n.equals || void 0, q1(r), St.bind(r);
}
function Z9(e, t, n) {
  let r, a, s;
  arguments.length === 2 && typeof t == "object" || arguments.length === 1 ? (r = !0, a = e, s = t || {}) : (r = e, a = t, s = n || {});
  let l = null, c = Ye, h = null, m = !1, d = "initialValue" in s, $ = typeof r == "function" && V(r);
  const v = /* @__PURE__ */ new Set(), [A, T] = (s.storage || w)(s.initialValue), [E, O] = w(void 0), [F, K] = w(void 0, {
    equals: !1
  }), [P, B] = w(d ? "ready" : "unresolved");
  if (s1.context) {
    h = `${s1.context.id}${s1.context.count++}`;
    let N;
    s.ssrLoadFrom === "initial" ? c = s.initialValue : s1.load && (N = s1.load(h)) && (c = N[0]);
  }
  function z(N, G, R, D) {
    return l === N && (l = null, d = !0, (N === c || G === c) && s.onHydrated && queueMicrotask(() => s.onHydrated(D, {
      value: G
    })), c = Ye, _1(G, R)), G;
  }
  function _1(N, G) {
    I1(() => {
      G === void 0 && T(() => N), B(G !== void 0 ? "errored" : "ready"), O(G);
      for (const R of v.keys())
        R.decrement();
      v.clear();
    }, !1);
  }
  function i1() {
    const N = H9, G = A(), R = E();
    if (R !== void 0 && !l)
      throw R;
    return e1 && !e1.user && N && K0(() => {
      F(), l && (N.resolved || v.has(N) || (N.increment(), v.add(N)));
    }), G;
  }
  function f1(N = !0) {
    if (N !== !1 && m)
      return;
    m = !1;
    const G = $ ? $() : r;
    if (G == null || G === !1) {
      z(l, S1(A));
      return;
    }
    const R = c !== Ye ? c : S1(() => a(G, {
      value: A(),
      refetching: N
    }));
    return typeof R != "object" || !(R && "then" in R) ? (z(l, R, void 0, G), R) : (l = R, m = !0, queueMicrotask(() => m = !1), I1(() => {
      B(d ? "refreshing" : "pending"), K();
    }, !1), R.then((D) => z(R, D, void 0, G), (D) => z(R, void 0, Ot(D), G)));
  }
  return Object.defineProperties(i1, {
    state: {
      get: () => P()
    },
    error: {
      get: () => E()
    },
    loading: {
      get() {
        const N = P();
        return N === "pending" || N === "refreshing";
      }
    },
    latest: {
      get() {
        if (!d)
          return i1();
        const N = E();
        if (N && !l)
          throw N;
        return A();
      }
    }
  }), $ ? K0(() => f1(!1)) : f1(!1), [i1, {
    refetch: f1,
    mutate: T
  }];
}
function S1(e) {
  if (e1 === null)
    return e();
  const t = e1;
  e1 = null;
  try {
    return e();
  } finally {
    e1 = t;
  }
}
function o0(e) {
  m1(() => S1(e));
}
function K1(e) {
  return a1 === null || (a1.cleanups === null ? a1.cleanups = [e] : a1.cleanups.push(e)), e;
}
function R9(e) {
  const t = e1, n = a1;
  return Promise.resolve().then(() => {
    e1 = t, a1 = n;
    let r;
    return I1(e, !1), e1 = a1 = null, r ? r.done : void 0;
  });
}
let H9;
function St() {
  const e = U1;
  if (this.sources && (this.state || e))
    if (this.state === T1 || e)
      q1(this);
    else {
      const t = c1;
      c1 = null, I1(() => Pe(this), !1), c1 = t;
    }
  if (e1) {
    const t = this.observers ? this.observers.length : 0;
    e1.sources ? (e1.sources.push(this), e1.sourceSlots.push(t)) : (e1.sources = [this], e1.sourceSlots = [t]), this.observers ? (this.observers.push(e1), this.observerSlots.push(e1.sources.length - 1)) : (this.observers = [e1], this.observerSlots = [e1.sources.length - 1]);
  }
  return this.value;
}
function Tt(e, t, n) {
  let r = e.value;
  return (!e.comparator || !e.comparator(r, t)) && (e.value = t, e.observers && e.observers.length && I1(() => {
    for (let a = 0; a < e.observers.length; a += 1) {
      const s = e.observers[a], l = U1 && U1.running;
      l && U1.disposed.has(s), (l && !s.tState || !l && !s.state) && (s.pure ? c1.push(s) : M1.push(s), s.observers && It(s)), l || (s.state = T1);
    }
    if (c1.length > 1e6)
      throw c1 = [], new Error();
  }, !1)), t;
}
function q1(e) {
  if (!e.fn)
    return;
  Ue(e);
  const t = a1, n = e1, r = s0;
  e1 = a1 = e, V9(e, e.value, r), e1 = n, a1 = t;
}
function V9(e, t, n) {
  let r;
  try {
    r = e.fn(t);
  } catch (a) {
    e.pure && (e.state = T1, e.owned && e.owned.forEach(Ue), e.owned = null), Nt(a);
  }
  (!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && "observers" in e ? Tt(e, r) : e.value = r, e.updatedAt = n);
}
function Be(e, t, n, r = T1, a) {
  const s = {
    fn: e,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: a1,
    context: null,
    pure: n
  };
  return a1 === null || a1 !== Mt && (a1.owned ? a1.owned.push(s) : a1.owned = [s]), s;
}
function Te(e) {
  const t = U1;
  if (e.state === 0 || t)
    return;
  if (e.state === Se || t)
    return Pe(e);
  if (e.suspense && S1(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const n = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < s0); )
    (e.state || t) && n.push(e);
  for (let r = n.length - 1; r >= 0; r--)
    if (e = n[r], e.state === T1 || t)
      q1(e);
    else if (e.state === Se || t) {
      const a = c1;
      c1 = null, I1(() => Pe(e, n[0]), !1), c1 = a;
    }
}
function I1(e, t) {
  if (c1)
    return e();
  let n = !1;
  t || (c1 = []), M1 ? n = !0 : M1 = [], s0++;
  try {
    const r = e();
    return Y9(n), r;
  } catch (r) {
    n || (M1 = null), c1 = null, Nt(r);
  }
}
function Y9(e) {
  if (c1 && (Pt(c1), c1 = null), e)
    return;
  const t = M1;
  M1 = null, t.length && I1(() => wt(t), !1);
}
function Pt(e) {
  for (let t = 0; t < e.length; t++)
    Te(e[t]);
}
function G9(e) {
  let t, n = 0;
  for (t = 0; t < e.length; t++) {
    const r = e[t];
    r.user ? e[n++] = r : Te(r);
  }
  for (s1.context && j9(), t = 0; t < n; t++)
    Te(e[t]);
}
function Pe(e, t) {
  const n = U1;
  e.state = 0;
  for (let r = 0; r < e.sources.length; r += 1) {
    const a = e.sources[r];
    a.sources && (a.state === T1 || n ? a !== t && Te(a) : (a.state === Se || n) && Pe(a, t));
  }
}
function It(e) {
  const t = U1;
  for (let n = 0; n < e.observers.length; n += 1) {
    const r = e.observers[n];
    (!r.state || t) && (r.state = Se, r.pure ? c1.push(r) : M1.push(r), r.observers && It(r));
  }
}
function Ue(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const n = e.sources.pop(), r = e.sourceSlots.pop(), a = n.observers;
      if (a && a.length) {
        const s = a.pop(), l = n.observerSlots.pop();
        r < a.length && (s.sourceSlots[l] = r, a[r] = s, n.observerSlots[r] = l);
      }
    }
  if (e.owned) {
    for (t = 0; t < e.owned.length; t++)
      Ue(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = 0; t < e.cleanups.length; t++)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function Ot(e) {
  return e instanceof Error || typeof e == "string" ? e : new Error("Unknown error");
}
function Nt(e) {
  throw e = Ot(e), e;
}
const q9 = Symbol("fallback");
function j0(e) {
  for (let t = 0; t < e.length; t++)
    e[t]();
}
function W9(e, t, n = {}) {
  let r = [], a = [], s = [], l = 0, c = t.length > 1 ? [] : null;
  return K1(() => j0(s)), () => {
    let h = e() || [], m, d;
    return h[Q9], S1(() => {
      let v = h.length, A, T, E, O, F, K, P, B, z;
      if (v === 0)
        l !== 0 && (j0(s), s = [], r = [], a = [], l = 0, c && (c = [])), n.fallback && (r = [q9], a[0] = de((_1) => (s[0] = _1, n.fallback())), l = 1);
      else if (l === 0) {
        for (a = new Array(v), d = 0; d < v; d++)
          r[d] = h[d], a[d] = de($);
        l = v;
      } else {
        for (E = new Array(v), O = new Array(v), c && (F = new Array(v)), K = 0, P = Math.min(l, v); K < P && r[K] === h[K]; K++)
          ;
        for (P = l - 1, B = v - 1; P >= K && B >= K && r[P] === h[B]; P--, B--)
          E[B] = a[P], O[B] = s[P], c && (F[B] = c[P]);
        for (A = /* @__PURE__ */ new Map(), T = new Array(B + 1), d = B; d >= K; d--)
          z = h[d], m = A.get(z), T[d] = m === void 0 ? -1 : m, A.set(z, d);
        for (m = K; m <= P; m++)
          z = r[m], d = A.get(z), d !== void 0 && d !== -1 ? (E[d] = a[m], O[d] = s[m], c && (F[d] = c[m]), d = T[d], A.set(z, d)) : s[m]();
        for (d = K; d < v; d++)
          d in E ? (a[d] = E[d], s[d] = O[d], c && (c[d] = F[d], c[d](d))) : a[d] = de($);
        a = a.slice(0, l = v), r = h.slice(0);
      }
      return a;
    });
    function $(v) {
      if (s[d] = v, c) {
        const [A, T] = w(d);
        return c[d] = T, t(h[d], A);
      }
      return t(h[d]);
    }
  };
}
function L(e, t) {
  return S1(() => e(t || {}));
}
function xe() {
  return !0;
}
const X9 = {
  get(e, t, n) {
    return t === Xe ? n : e.get(t);
  },
  has(e, t) {
    return t === Xe ? !0 : e.has(t);
  },
  set: xe,
  deleteProperty: xe,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: xe,
      deleteProperty: xe
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function Ge(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function Dt(...e) {
  let t = !1;
  for (let r = 0; r < e.length; r++) {
    const a = e[r];
    t = t || !!a && Xe in a, e[r] = typeof a == "function" ? (t = !0, V(a)) : a;
  }
  if (t)
    return new Proxy({
      get(r) {
        for (let a = e.length - 1; a >= 0; a--) {
          const s = Ge(e[a])[r];
          if (s !== void 0)
            return s;
        }
      },
      has(r) {
        for (let a = e.length - 1; a >= 0; a--)
          if (r in Ge(e[a]))
            return !0;
        return !1;
      },
      keys() {
        const r = [];
        for (let a = 0; a < e.length; a++)
          r.push(...Object.keys(Ge(e[a])));
        return [...new Set(r)];
      }
    }, X9);
  const n = {};
  for (let r = e.length - 1; r >= 0; r--)
    if (e[r]) {
      const a = Object.getOwnPropertyDescriptors(e[r]);
      for (const s in a)
        s in n || Object.defineProperty(n, s, {
          enumerable: !0,
          get() {
            for (let l = e.length - 1; l >= 0; l--) {
              const c = (e[l] || {})[s];
              if (c !== void 0)
                return c;
            }
          }
        });
    }
  return n;
}
function J9(e) {
  const t = "fallback" in e && {
    fallback: () => e.fallback
  };
  return V(W9(() => e.each, e.children, t || void 0));
}
function H(e) {
  let t = !1;
  const n = e.keyed, r = V(() => e.when, void 0, {
    equals: (a, s) => t ? a === s : !a == !s
  });
  return V(() => {
    const a = r();
    if (a) {
      const s = e.children, l = typeof s == "function" && s.length > 0;
      return t = n || l, l ? S1(() => s(a)) : s;
    }
    return e.fallback;
  }, void 0, void 0);
}
function e5(e, t, n) {
  let r = n.length, a = t.length, s = r, l = 0, c = 0, h = t[a - 1].nextSibling, m = null;
  for (; l < a || c < s; ) {
    if (t[l] === n[c]) {
      l++, c++;
      continue;
    }
    for (; t[a - 1] === n[s - 1]; )
      a--, s--;
    if (a === l) {
      const d = s < r ? c ? n[c - 1].nextSibling : n[s - c] : h;
      for (; c < s; )
        e.insertBefore(n[c++], d);
    } else if (s === c)
      for (; l < a; )
        (!m || !m.has(t[l])) && t[l].remove(), l++;
    else if (t[l] === n[s - 1] && n[c] === t[a - 1]) {
      const d = t[--a].nextSibling;
      e.insertBefore(n[c++], t[l++].nextSibling), e.insertBefore(n[--s], d), t[a] = n[s];
    } else {
      if (!m) {
        m = /* @__PURE__ */ new Map();
        let $ = c;
        for (; $ < s; )
          m.set(n[$], $++);
      }
      const d = m.get(t[l]);
      if (d != null)
        if (c < d && d < s) {
          let $ = l, v = 1, A;
          for (; ++$ < a && $ < s && !((A = m.get(t[$])) == null || A !== d + v); )
            v++;
          if (v > d - c) {
            const T = t[l];
            for (; c < d; )
              e.insertBefore(n[c++], T);
          } else
            e.replaceChild(n[c++], t[l++]);
        } else
          l++;
      else
        t[l++].remove();
    }
  }
}
const z0 = "_$DX_DELEGATE";
function t5(e, t, n, r = {}) {
  let a;
  return de((s) => {
    a = s, t === document ? e() : _(t, e(), t.firstChild ? null : void 0, n);
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
function v1(e, t = window.document) {
  const n = t[z0] || (t[z0] = /* @__PURE__ */ new Set());
  for (let r = 0, a = e.length; r < a; r++) {
    const s = e[r];
    n.has(s) || (n.add(s), t.addEventListener(s, n5));
  }
}
function y1(e, t, n) {
  n == null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function j1(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function P1(e, t, n, r) {
  if (r)
    Array.isArray(n) ? (e[`$$${t}`] = n[0], e[`$$${t}Data`] = n[1]) : e[`$$${t}`] = n;
  else if (Array.isArray(n)) {
    const a = n[0];
    e.addEventListener(t, n[0] = (s) => a.call(e, n[1], s));
  } else
    e.addEventListener(t, n);
}
function z1(e, t, n) {
  if (!t)
    return n ? y1(e, "style") : t;
  const r = e.style;
  if (typeof t == "string")
    return r.cssText = t;
  typeof n == "string" && (r.cssText = n = void 0), n || (n = {}), t || (t = {});
  let a, s;
  for (s in n)
    t[s] == null && r.removeProperty(s), delete n[s];
  for (s in t)
    a = t[s], a !== n[s] && (r.setProperty(s, a), n[s] = a);
  return n;
}
function F1(e, t, n) {
  return S1(() => e(t, n));
}
function _(e, t, n, r) {
  if (n !== void 0 && !r && (r = []), typeof t != "function")
    return Ie(e, t, r, n);
  Q((a) => Ie(e, t(), a, n), r);
}
function n5(e) {
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
  }), s1.registry && !s1.done && (s1.done = !0, document.querySelectorAll("[id^=pl-]").forEach((r) => {
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
function Ie(e, t, n, r, a) {
  for (s1.context && !n && (n = [...e.childNodes]); typeof n == "function"; )
    n = n();
  if (t === n)
    return n;
  const s = typeof t, l = r !== void 0;
  if (e = l && n[0] && n[0].parentNode || e, s === "string" || s === "number") {
    if (s1.context)
      return n;
    if (s === "number" && (t = t.toString()), l) {
      let c = n[0];
      c && c.nodeType === 3 ? c.data = t : c = document.createTextNode(t), n = G1(e, n, r, c);
    } else
      n !== "" && typeof n == "string" ? n = e.firstChild.data = t : n = e.textContent = t;
  } else if (t == null || s === "boolean") {
    if (s1.context)
      return n;
    n = G1(e, n, r);
  } else {
    if (s === "function")
      return Q(() => {
        let c = t();
        for (; typeof c == "function"; )
          c = c();
        n = Ie(e, c, n, r);
      }), () => n;
    if (Array.isArray(t)) {
      const c = [], h = n && Array.isArray(n);
      if (Je(c, t, n, a))
        return Q(() => n = Ie(e, c, n, r, !0)), () => n;
      if (s1.context) {
        if (!c.length)
          return n;
        for (let m = 0; m < c.length; m++)
          if (c[m].parentNode)
            return n = c;
      }
      if (c.length === 0) {
        if (n = G1(e, n, r), l)
          return n;
      } else
        h ? n.length === 0 ? Q0(e, c, r) : e5(e, n, c) : (n && G1(e), Q0(e, c));
      n = c;
    } else if (t instanceof Node) {
      if (s1.context && t.parentNode)
        return n = l ? [t] : t;
      if (Array.isArray(n)) {
        if (l)
          return n = G1(e, n, r, t);
        G1(e, n, null, t);
      } else
        n == null || n === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      n = t;
    }
  }
  return n;
}
function Je(e, t, n, r) {
  let a = !1;
  for (let s = 0, l = t.length; s < l; s++) {
    let c = t[s], h = n && n[s];
    if (c instanceof Node)
      e.push(c);
    else if (!(c == null || c === !0 || c === !1))
      if (Array.isArray(c))
        a = Je(e, c, h) || a;
      else if (typeof c == "function")
        if (r) {
          for (; typeof c == "function"; )
            c = c();
          a = Je(e, Array.isArray(c) ? c : [c], Array.isArray(h) ? h : [h]) || a;
        } else
          e.push(c), a = !0;
      else {
        const m = String(c);
        h && h.nodeType === 3 && h.data === m ? e.push(h) : e.push(document.createTextNode(m));
      }
  }
  return a;
}
function Q0(e, t, n = null) {
  for (let r = 0, a = t.length; r < a; r++)
    e.insertBefore(t[r], n);
}
function G1(e, t, n, r) {
  if (n === void 0)
    return e.textContent = "";
  const a = r || document.createTextNode("");
  if (t.length) {
    let s = !1;
    for (let l = t.length - 1; l >= 0; l--) {
      const c = t[l];
      if (a !== c) {
        const h = c.parentNode === e;
        !s && !l ? h ? e.replaceChild(a, c) : e.insertBefore(a, n) : h && c.remove();
      } else
        s = !0;
    }
  } else
    e.insertBefore(a, n);
  return [a];
}
const r5 = "http://www.w3.org/2000/svg";
function a5(e, t = !1) {
  return t ? document.createElementNS(r5, e) : document.createElement(e);
}
function i5(e) {
  const {
    useShadow: t
  } = e, n = document.createTextNode(""), r = e.mount || document.body;
  function a() {
    if (s1.context) {
      const [s, l] = w(!1);
      return queueMicrotask(() => l(!0)), () => s() && e.children;
    } else
      return () => e.children;
  }
  if (r instanceof HTMLHeadElement) {
    const [s, l] = w(!1), c = () => l(!0);
    de((h) => _(r, () => s() ? h() : a()(), null)), K1(() => {
      s1.context ? queueMicrotask(c) : c();
    });
  } else {
    const s = a5(e.isSVG ? "g" : "div", e.isSVG), l = t && s.attachShadow ? s.attachShadow({
      mode: "open"
    }) : s;
    Object.defineProperty(s, "_$host", {
      get() {
        return n.parentNode;
      },
      configurable: !0
    }), _(l, a()), r.appendChild(s), e.ref && e.ref(s), K1(() => r.removeChild(s));
  }
  return n;
}
var ke = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Et(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var s5 = typeof ke == "object" && ke && ke.Object === Object && ke, Bt = s5, o5 = Bt, c5 = typeof self == "object" && self && self.Object === Object && self, l5 = o5 || c5 || Function("return this")(), x1 = l5, u5 = x1, d5 = u5.Symbol, Fe = d5, Z0 = Fe, Ut = Object.prototype, h5 = Ut.hasOwnProperty, C5 = Ut.toString, le = Z0 ? Z0.toStringTag : void 0;
function y5(e) {
  var t = h5.call(e, le), n = e[le];
  try {
    e[le] = void 0;
    var r = !0;
  } catch {
  }
  var a = C5.call(e);
  return r && (t ? e[le] = n : delete e[le]), a;
}
var f5 = y5, g5 = Object.prototype, m5 = g5.toString;
function p5(e) {
  return m5.call(e);
}
var v5 = p5, R0 = Fe, _5 = f5, $5 = v5, b5 = "[object Null]", L5 = "[object Undefined]", H0 = R0 ? R0.toStringTag : void 0;
function x5(e) {
  return e == null ? e === void 0 ? L5 : b5 : H0 && H0 in Object(e) ? _5(e) : $5(e);
}
var he = x5;
function k5(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var W1 = k5, A5 = he, w5 = W1, M5 = "[object AsyncFunction]", S5 = "[object Function]", T5 = "[object GeneratorFunction]", P5 = "[object Proxy]";
function I5(e) {
  if (!w5(e))
    return !1;
  var t = A5(e);
  return t == S5 || t == T5 || t == M5 || t == P5;
}
var Ft = I5, O5 = x1, N5 = O5["__core-js_shared__"], D5 = N5, qe = D5, V0 = function() {
  var e = /[^.]+$/.exec(qe && qe.keys && qe.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function E5(e) {
  return !!V0 && V0 in e;
}
var B5 = E5, U5 = Function.prototype, F5 = U5.toString;
function K5(e) {
  if (e != null) {
    try {
      return F5.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Kt = K5, j5 = Ft, z5 = B5, Q5 = W1, Z5 = Kt, R5 = /[\\^$.*+?()[\]{}|]/g, H5 = /^\[object .+?Constructor\]$/, V5 = Function.prototype, Y5 = Object.prototype, G5 = V5.toString, q5 = Y5.hasOwnProperty, W5 = RegExp(
  "^" + G5.call(q5).replace(R5, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function X5(e) {
  if (!Q5(e) || z5(e))
    return !1;
  var t = j5(e) ? W5 : H5;
  return t.test(Z5(e));
}
var J5 = X5;
function e6(e, t) {
  return e == null ? void 0 : e[t];
}
var t6 = e6, n6 = J5, r6 = t6;
function a6(e, t) {
  var n = r6(e, t);
  return n6(n) ? n : void 0;
}
var Q1 = a6, i6 = Q1, s6 = function() {
  try {
    var e = i6(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), o6 = s6, Y0 = o6;
function c6(e, t, n) {
  t == "__proto__" && Y0 ? Y0(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
var jt = c6;
function l6(e, t) {
  return e === t || e !== e && t !== t;
}
var zt = l6, u6 = jt, d6 = zt, h6 = Object.prototype, C6 = h6.hasOwnProperty;
function y6(e, t, n) {
  var r = e[t];
  (!(C6.call(e, t) && d6(r, n)) || n === void 0 && !(t in e)) && u6(e, t, n);
}
var c0 = y6, f6 = Array.isArray, X1 = f6;
function g6(e) {
  return e != null && typeof e == "object";
}
var J1 = g6, m6 = he, p6 = J1, v6 = "[object Symbol]";
function _6(e) {
  return typeof e == "symbol" || p6(e) && m6(e) == v6;
}
var l0 = _6, $6 = X1, b6 = l0, L6 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, x6 = /^\w*$/;
function k6(e, t) {
  if ($6(e))
    return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || b6(e) ? !0 : x6.test(e) || !L6.test(e) || t != null && e in Object(t);
}
var A6 = k6, w6 = Q1, M6 = w6(Object, "create"), Ke = M6, G0 = Ke;
function S6() {
  this.__data__ = G0 ? G0(null) : {}, this.size = 0;
}
var T6 = S6;
function P6(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var I6 = P6, O6 = Ke, N6 = "__lodash_hash_undefined__", D6 = Object.prototype, E6 = D6.hasOwnProperty;
function B6(e) {
  var t = this.__data__;
  if (O6) {
    var n = t[e];
    return n === N6 ? void 0 : n;
  }
  return E6.call(t, e) ? t[e] : void 0;
}
var U6 = B6, F6 = Ke, K6 = Object.prototype, j6 = K6.hasOwnProperty;
function z6(e) {
  var t = this.__data__;
  return F6 ? t[e] !== void 0 : j6.call(t, e);
}
var Q6 = z6, Z6 = Ke, R6 = "__lodash_hash_undefined__";
function H6(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = Z6 && t === void 0 ? R6 : t, this;
}
var V6 = H6, Y6 = T6, G6 = I6, q6 = U6, W6 = Q6, X6 = V6;
function ee(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
ee.prototype.clear = Y6;
ee.prototype.delete = G6;
ee.prototype.get = q6;
ee.prototype.has = W6;
ee.prototype.set = X6;
var J6 = ee;
function e2() {
  this.__data__ = [], this.size = 0;
}
var t2 = e2, n2 = zt;
function r2(e, t) {
  for (var n = e.length; n--; )
    if (n2(e[n][0], t))
      return n;
  return -1;
}
var je = r2, a2 = je, i2 = Array.prototype, s2 = i2.splice;
function o2(e) {
  var t = this.__data__, n = a2(t, e);
  if (n < 0)
    return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : s2.call(t, n, 1), --this.size, !0;
}
var c2 = o2, l2 = je;
function u2(e) {
  var t = this.__data__, n = l2(t, e);
  return n < 0 ? void 0 : t[n][1];
}
var d2 = u2, h2 = je;
function C2(e) {
  return h2(this.__data__, e) > -1;
}
var y2 = C2, f2 = je;
function g2(e, t) {
  var n = this.__data__, r = f2(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
}
var m2 = g2, p2 = t2, v2 = c2, _2 = d2, $2 = y2, b2 = m2;
function te(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
te.prototype.clear = p2;
te.prototype.delete = v2;
te.prototype.get = _2;
te.prototype.has = $2;
te.prototype.set = b2;
var ze = te, L2 = Q1, x2 = x1, k2 = L2(x2, "Map"), u0 = k2, q0 = J6, A2 = ze, w2 = u0;
function M2() {
  this.size = 0, this.__data__ = {
    hash: new q0(),
    map: new (w2 || A2)(),
    string: new q0()
  };
}
var S2 = M2;
function T2(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var P2 = T2, I2 = P2;
function O2(e, t) {
  var n = e.__data__;
  return I2(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
var Qe = O2, N2 = Qe;
function D2(e) {
  var t = N2(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var E2 = D2, B2 = Qe;
function U2(e) {
  return B2(this, e).get(e);
}
var F2 = U2, K2 = Qe;
function j2(e) {
  return K2(this, e).has(e);
}
var z2 = j2, Q2 = Qe;
function Z2(e, t) {
  var n = Q2(this, e), r = n.size;
  return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
}
var R2 = Z2, H2 = S2, V2 = E2, Y2 = F2, G2 = z2, q2 = R2;
function ne(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
ne.prototype.clear = H2;
ne.prototype.delete = V2;
ne.prototype.get = Y2;
ne.prototype.has = G2;
ne.prototype.set = q2;
var Qt = ne, Zt = Qt, W2 = "Expected a function";
function d0(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(W2);
  var n = function() {
    var r = arguments, a = t ? t.apply(this, r) : r[0], s = n.cache;
    if (s.has(a))
      return s.get(a);
    var l = e.apply(this, r);
    return n.cache = s.set(a, l) || s, l;
  };
  return n.cache = new (d0.Cache || Zt)(), n;
}
d0.Cache = Zt;
var X2 = d0, J2 = X2, e3 = 500;
function t3(e) {
  var t = J2(e, function(r) {
    return n.size === e3 && n.clear(), r;
  }), n = t.cache;
  return t;
}
var n3 = t3, r3 = n3, a3 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, i3 = /\\(\\)?/g, s3 = r3(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(a3, function(n, r, a, s) {
    t.push(a ? s.replace(i3, "$1") : r || n);
  }), t;
}), o3 = s3;
function c3(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, a = Array(r); ++n < r; )
    a[n] = t(e[n], n, e);
  return a;
}
var l3 = c3, W0 = Fe, u3 = l3, d3 = X1, h3 = l0, C3 = 1 / 0, X0 = W0 ? W0.prototype : void 0, J0 = X0 ? X0.toString : void 0;
function Rt(e) {
  if (typeof e == "string")
    return e;
  if (d3(e))
    return u3(e, Rt) + "";
  if (h3(e))
    return J0 ? J0.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -C3 ? "-0" : t;
}
var y3 = Rt, f3 = y3;
function g3(e) {
  return e == null ? "" : f3(e);
}
var m3 = g3, p3 = X1, v3 = A6, _3 = o3, $3 = m3;
function b3(e, t) {
  return p3(e) ? e : v3(e, t) ? [e] : _3($3(e));
}
var L3 = b3, x3 = 9007199254740991, k3 = /^(?:0|[1-9]\d*)$/;
function A3(e, t) {
  var n = typeof e;
  return t = t ?? x3, !!t && (n == "number" || n != "symbol" && k3.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var Ht = A3, w3 = l0, M3 = 1 / 0;
function S3(e) {
  if (typeof e == "string" || w3(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -M3 ? "-0" : t;
}
var T3 = S3, P3 = c0, I3 = L3, O3 = Ht, et = W1, N3 = T3;
function D3(e, t, n, r) {
  if (!et(e))
    return e;
  t = I3(t, e);
  for (var a = -1, s = t.length, l = s - 1, c = e; c != null && ++a < s; ) {
    var h = N3(t[a]), m = n;
    if (h === "__proto__" || h === "constructor" || h === "prototype")
      return e;
    if (a != l) {
      var d = c[h];
      m = r ? r(d, h, c) : void 0, m === void 0 && (m = et(d) ? d : O3(t[a + 1]) ? [] : {});
    }
    P3(c, h, m), c = c[h];
  }
  return e;
}
var E3 = D3, B3 = E3;
function U3(e, t, n) {
  return e == null ? e : B3(e, t, n);
}
var F3 = U3;
const e0 = /* @__PURE__ */ Et(F3);
var K3 = ze;
function j3() {
  this.__data__ = new K3(), this.size = 0;
}
var z3 = j3;
function Q3(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
var Z3 = Q3;
function R3(e) {
  return this.__data__.get(e);
}
var H3 = R3;
function V3(e) {
  return this.__data__.has(e);
}
var Y3 = V3, G3 = ze, q3 = u0, W3 = Qt, X3 = 200;
function J3(e, t) {
  var n = this.__data__;
  if (n instanceof G3) {
    var r = n.__data__;
    if (!q3 || r.length < X3 - 1)
      return r.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new W3(r);
  }
  return n.set(e, t), this.size = n.size, this;
}
var e8 = J3, t8 = ze, n8 = z3, r8 = Z3, a8 = H3, i8 = Y3, s8 = e8;
function re(e) {
  var t = this.__data__ = new t8(e);
  this.size = t.size;
}
re.prototype.clear = n8;
re.prototype.delete = r8;
re.prototype.get = a8;
re.prototype.has = i8;
re.prototype.set = s8;
var o8 = re;
function c8(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r && t(e[n], n, e) !== !1; )
    ;
  return e;
}
var l8 = c8, u8 = c0, d8 = jt;
function h8(e, t, n, r) {
  var a = !n;
  n || (n = {});
  for (var s = -1, l = t.length; ++s < l; ) {
    var c = t[s], h = r ? r(n[c], e[c], c, n, e) : void 0;
    h === void 0 && (h = e[c]), a ? d8(n, c, h) : u8(n, c, h);
  }
  return n;
}
var Ze = h8;
function C8(e, t) {
  for (var n = -1, r = Array(e); ++n < e; )
    r[n] = t(n);
  return r;
}
var y8 = C8, f8 = he, g8 = J1, m8 = "[object Arguments]";
function p8(e) {
  return g8(e) && f8(e) == m8;
}
var v8 = p8, tt = v8, _8 = J1, Vt = Object.prototype, $8 = Vt.hasOwnProperty, b8 = Vt.propertyIsEnumerable, L8 = tt(function() {
  return arguments;
}()) ? tt : function(e) {
  return _8(e) && $8.call(e, "callee") && !b8.call(e, "callee");
}, x8 = L8, Oe = { exports: {} };
function k8() {
  return !1;
}
var A8 = k8;
Oe.exports;
(function(e, t) {
  var n = x1, r = A8, a = t && !t.nodeType && t, s = a && !0 && e && !e.nodeType && e, l = s && s.exports === a, c = l ? n.Buffer : void 0, h = c ? c.isBuffer : void 0, m = h || r;
  e.exports = m;
})(Oe, Oe.exports);
var Yt = Oe.exports, w8 = 9007199254740991;
function M8(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= w8;
}
var Gt = M8, S8 = he, T8 = Gt, P8 = J1, I8 = "[object Arguments]", O8 = "[object Array]", N8 = "[object Boolean]", D8 = "[object Date]", E8 = "[object Error]", B8 = "[object Function]", U8 = "[object Map]", F8 = "[object Number]", K8 = "[object Object]", j8 = "[object RegExp]", z8 = "[object Set]", Q8 = "[object String]", Z8 = "[object WeakMap]", R8 = "[object ArrayBuffer]", H8 = "[object DataView]", V8 = "[object Float32Array]", Y8 = "[object Float64Array]", G8 = "[object Int8Array]", q8 = "[object Int16Array]", W8 = "[object Int32Array]", X8 = "[object Uint8Array]", J8 = "[object Uint8ClampedArray]", e7 = "[object Uint16Array]", t7 = "[object Uint32Array]", J = {};
J[V8] = J[Y8] = J[G8] = J[q8] = J[W8] = J[X8] = J[J8] = J[e7] = J[t7] = !0;
J[I8] = J[O8] = J[R8] = J[N8] = J[H8] = J[D8] = J[E8] = J[B8] = J[U8] = J[F8] = J[K8] = J[j8] = J[z8] = J[Q8] = J[Z8] = !1;
function n7(e) {
  return P8(e) && T8(e.length) && !!J[S8(e)];
}
var r7 = n7;
function a7(e) {
  return function(t) {
    return e(t);
  };
}
var h0 = a7, Ne = { exports: {} };
Ne.exports;
(function(e, t) {
  var n = Bt, r = t && !t.nodeType && t, a = r && !0 && e && !e.nodeType && e, s = a && a.exports === r, l = s && n.process, c = function() {
    try {
      var h = a && a.require && a.require("util").types;
      return h || l && l.binding && l.binding("util");
    } catch {
    }
  }();
  e.exports = c;
})(Ne, Ne.exports);
var C0 = Ne.exports, i7 = r7, s7 = h0, nt = C0, rt = nt && nt.isTypedArray, o7 = rt ? s7(rt) : i7, c7 = o7, l7 = y8, u7 = x8, d7 = X1, h7 = Yt, C7 = Ht, y7 = c7, f7 = Object.prototype, g7 = f7.hasOwnProperty;
function m7(e, t) {
  var n = d7(e), r = !n && u7(e), a = !n && !r && h7(e), s = !n && !r && !a && y7(e), l = n || r || a || s, c = l ? l7(e.length, String) : [], h = c.length;
  for (var m in e)
    (t || g7.call(e, m)) && !(l && // Safari 9 has enumerable `arguments.length` in strict mode.
    (m == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    a && (m == "offset" || m == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    s && (m == "buffer" || m == "byteLength" || m == "byteOffset") || // Skip index properties.
    C7(m, h))) && c.push(m);
  return c;
}
var qt = m7, p7 = Object.prototype;
function v7(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || p7;
  return e === n;
}
var y0 = v7;
function _7(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var Wt = _7, $7 = Wt, b7 = $7(Object.keys, Object), L7 = b7, x7 = y0, k7 = L7, A7 = Object.prototype, w7 = A7.hasOwnProperty;
function M7(e) {
  if (!x7(e))
    return k7(e);
  var t = [];
  for (var n in Object(e))
    w7.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
var S7 = M7, T7 = Ft, P7 = Gt;
function I7(e) {
  return e != null && P7(e.length) && !T7(e);
}
var Xt = I7, O7 = qt, N7 = S7, D7 = Xt;
function E7(e) {
  return D7(e) ? O7(e) : N7(e);
}
var f0 = E7, B7 = Ze, U7 = f0;
function F7(e, t) {
  return e && B7(t, U7(t), e);
}
var K7 = F7;
function j7(e) {
  var t = [];
  if (e != null)
    for (var n in Object(e))
      t.push(n);
  return t;
}
var z7 = j7, Q7 = W1, Z7 = y0, R7 = z7, H7 = Object.prototype, V7 = H7.hasOwnProperty;
function Y7(e) {
  if (!Q7(e))
    return R7(e);
  var t = Z7(e), n = [];
  for (var r in e)
    r == "constructor" && (t || !V7.call(e, r)) || n.push(r);
  return n;
}
var G7 = Y7, q7 = qt, W7 = G7, X7 = Xt;
function J7(e) {
  return X7(e) ? q7(e, !0) : W7(e);
}
var g0 = J7, en = Ze, tn = g0;
function nn(e, t) {
  return e && en(t, tn(t), e);
}
var rn = nn, De = { exports: {} };
De.exports;
(function(e, t) {
  var n = x1, r = t && !t.nodeType && t, a = r && !0 && e && !e.nodeType && e, s = a && a.exports === r, l = s ? n.Buffer : void 0, c = l ? l.allocUnsafe : void 0;
  function h(m, d) {
    if (d)
      return m.slice();
    var $ = m.length, v = c ? c($) : new m.constructor($);
    return m.copy(v), v;
  }
  e.exports = h;
})(De, De.exports);
var an = De.exports;
function sn(e, t) {
  var n = -1, r = e.length;
  for (t || (t = Array(r)); ++n < r; )
    t[n] = e[n];
  return t;
}
var on = sn;
function cn(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, a = 0, s = []; ++n < r; ) {
    var l = e[n];
    t(l, n, e) && (s[a++] = l);
  }
  return s;
}
var ln = cn;
function un() {
  return [];
}
var Jt = un, dn = ln, hn = Jt, Cn = Object.prototype, yn = Cn.propertyIsEnumerable, at = Object.getOwnPropertySymbols, fn = at ? function(e) {
  return e == null ? [] : (e = Object(e), dn(at(e), function(t) {
    return yn.call(e, t);
  }));
} : hn, m0 = fn, gn = Ze, mn = m0;
function pn(e, t) {
  return gn(e, mn(e), t);
}
var vn = pn;
function _n(e, t) {
  for (var n = -1, r = t.length, a = e.length; ++n < r; )
    e[a + n] = t[n];
  return e;
}
var e9 = _n, $n = Wt, bn = $n(Object.getPrototypeOf, Object), t9 = bn, Ln = e9, xn = t9, kn = m0, An = Jt, wn = Object.getOwnPropertySymbols, Mn = wn ? function(e) {
  for (var t = []; e; )
    Ln(t, kn(e)), e = xn(e);
  return t;
} : An, n9 = Mn, Sn = Ze, Tn = n9;
function Pn(e, t) {
  return Sn(e, Tn(e), t);
}
var In = Pn, On = e9, Nn = X1;
function Dn(e, t, n) {
  var r = t(e);
  return Nn(e) ? r : On(r, n(e));
}
var r9 = Dn, En = r9, Bn = m0, Un = f0;
function Fn(e) {
  return En(e, Un, Bn);
}
var Kn = Fn, jn = r9, zn = n9, Qn = g0;
function Zn(e) {
  return jn(e, Qn, zn);
}
var Rn = Zn, Hn = Q1, Vn = x1, Yn = Hn(Vn, "DataView"), Gn = Yn, qn = Q1, Wn = x1, Xn = qn(Wn, "Promise"), Jn = Xn, er = Q1, tr = x1, nr = er(tr, "Set"), rr = nr, ar = Q1, ir = x1, sr = ar(ir, "WeakMap"), or = sr, t0 = Gn, n0 = u0, r0 = Jn, a0 = rr, i0 = or, a9 = he, ae = Kt, it = "[object Map]", cr = "[object Object]", st = "[object Promise]", ot = "[object Set]", ct = "[object WeakMap]", lt = "[object DataView]", lr = ae(t0), ur = ae(n0), dr = ae(r0), hr = ae(a0), Cr = ae(i0), B1 = a9;
(t0 && B1(new t0(new ArrayBuffer(1))) != lt || n0 && B1(new n0()) != it || r0 && B1(r0.resolve()) != st || a0 && B1(new a0()) != ot || i0 && B1(new i0()) != ct) && (B1 = function(e) {
  var t = a9(e), n = t == cr ? e.constructor : void 0, r = n ? ae(n) : "";
  if (r)
    switch (r) {
      case lr:
        return lt;
      case ur:
        return it;
      case dr:
        return st;
      case hr:
        return ot;
      case Cr:
        return ct;
    }
  return t;
});
var p0 = B1, yr = Object.prototype, fr = yr.hasOwnProperty;
function gr(e) {
  var t = e.length, n = new e.constructor(t);
  return t && typeof e[0] == "string" && fr.call(e, "index") && (n.index = e.index, n.input = e.input), n;
}
var mr = gr, pr = x1, vr = pr.Uint8Array, _r = vr, ut = _r;
function $r(e) {
  var t = new e.constructor(e.byteLength);
  return new ut(t).set(new ut(e)), t;
}
var v0 = $r, br = v0;
function Lr(e, t) {
  var n = t ? br(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.byteLength);
}
var xr = Lr, kr = /\w*$/;
function Ar(e) {
  var t = new e.constructor(e.source, kr.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var wr = Ar, dt = Fe, ht = dt ? dt.prototype : void 0, Ct = ht ? ht.valueOf : void 0;
function Mr(e) {
  return Ct ? Object(Ct.call(e)) : {};
}
var Sr = Mr, Tr = v0;
function Pr(e, t) {
  var n = t ? Tr(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.length);
}
var Ir = Pr, Or = v0, Nr = xr, Dr = wr, Er = Sr, Br = Ir, Ur = "[object Boolean]", Fr = "[object Date]", Kr = "[object Map]", jr = "[object Number]", zr = "[object RegExp]", Qr = "[object Set]", Zr = "[object String]", Rr = "[object Symbol]", Hr = "[object ArrayBuffer]", Vr = "[object DataView]", Yr = "[object Float32Array]", Gr = "[object Float64Array]", qr = "[object Int8Array]", Wr = "[object Int16Array]", Xr = "[object Int32Array]", Jr = "[object Uint8Array]", e4 = "[object Uint8ClampedArray]", t4 = "[object Uint16Array]", n4 = "[object Uint32Array]";
function r4(e, t, n) {
  var r = e.constructor;
  switch (t) {
    case Hr:
      return Or(e);
    case Ur:
    case Fr:
      return new r(+e);
    case Vr:
      return Nr(e, n);
    case Yr:
    case Gr:
    case qr:
    case Wr:
    case Xr:
    case Jr:
    case e4:
    case t4:
    case n4:
      return Br(e, n);
    case Kr:
      return new r();
    case jr:
    case Zr:
      return new r(e);
    case zr:
      return Dr(e);
    case Qr:
      return new r();
    case Rr:
      return Er(e);
  }
}
var a4 = r4, i4 = W1, yt = Object.create, s4 = function() {
  function e() {
  }
  return function(t) {
    if (!i4(t))
      return {};
    if (yt)
      return yt(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}(), o4 = s4, c4 = o4, l4 = t9, u4 = y0;
function d4(e) {
  return typeof e.constructor == "function" && !u4(e) ? c4(l4(e)) : {};
}
var h4 = d4, C4 = p0, y4 = J1, f4 = "[object Map]";
function g4(e) {
  return y4(e) && C4(e) == f4;
}
var m4 = g4, p4 = m4, v4 = h0, ft = C0, gt = ft && ft.isMap, _4 = gt ? v4(gt) : p4, $4 = _4, b4 = p0, L4 = J1, x4 = "[object Set]";
function k4(e) {
  return L4(e) && b4(e) == x4;
}
var A4 = k4, w4 = A4, M4 = h0, mt = C0, pt = mt && mt.isSet, S4 = pt ? M4(pt) : w4, T4 = S4, P4 = o8, I4 = l8, O4 = c0, N4 = K7, D4 = rn, E4 = an, B4 = on, U4 = vn, F4 = In, K4 = Kn, j4 = Rn, z4 = p0, Q4 = mr, Z4 = a4, R4 = h4, H4 = X1, V4 = Yt, Y4 = $4, G4 = W1, q4 = T4, W4 = f0, X4 = g0, J4 = 1, ea = 2, ta = 4, i9 = "[object Arguments]", na = "[object Array]", ra = "[object Boolean]", aa = "[object Date]", ia = "[object Error]", s9 = "[object Function]", sa = "[object GeneratorFunction]", oa = "[object Map]", ca = "[object Number]", o9 = "[object Object]", la = "[object RegExp]", ua = "[object Set]", da = "[object String]", ha = "[object Symbol]", Ca = "[object WeakMap]", ya = "[object ArrayBuffer]", fa = "[object DataView]", ga = "[object Float32Array]", ma = "[object Float64Array]", pa = "[object Int8Array]", va = "[object Int16Array]", _a = "[object Int32Array]", $a = "[object Uint8Array]", ba = "[object Uint8ClampedArray]", La = "[object Uint16Array]", xa = "[object Uint32Array]", W = {};
W[i9] = W[na] = W[ya] = W[fa] = W[ra] = W[aa] = W[ga] = W[ma] = W[pa] = W[va] = W[_a] = W[oa] = W[ca] = W[o9] = W[la] = W[ua] = W[da] = W[ha] = W[$a] = W[ba] = W[La] = W[xa] = !0;
W[ia] = W[s9] = W[Ca] = !1;
function we(e, t, n, r, a, s) {
  var l, c = t & J4, h = t & ea, m = t & ta;
  if (n && (l = a ? n(e, r, a, s) : n(e)), l !== void 0)
    return l;
  if (!G4(e))
    return e;
  var d = H4(e);
  if (d) {
    if (l = Q4(e), !c)
      return B4(e, l);
  } else {
    var $ = z4(e), v = $ == s9 || $ == sa;
    if (V4(e))
      return E4(e, c);
    if ($ == o9 || $ == i9 || v && !a) {
      if (l = h || v ? {} : R4(e), !c)
        return h ? F4(e, D4(l, e)) : U4(e, N4(l, e));
    } else {
      if (!W[$])
        return a ? e : {};
      l = Z4(e, $, c);
    }
  }
  s || (s = new P4());
  var A = s.get(e);
  if (A)
    return A;
  s.set(e, l), q4(e) ? e.forEach(function(O) {
    l.add(we(O, t, n, O, e, s));
  }) : Y4(e) && e.forEach(function(O, F) {
    l.set(F, we(O, t, n, F, e, s));
  });
  var T = m ? h ? j4 : K4 : h ? X4 : W4, E = d ? void 0 : T(e);
  return I4(E || e, function(O, F) {
    E && (F = O, O = e[F]), O4(l, F, we(O, t, n, F, e, s));
  }), l;
}
var ka = we, Aa = ka, wa = 1, Ma = 4;
function Sa(e) {
  return Aa(e, wa | Ma);
}
var Ta = Sa;
const Pa = /* @__PURE__ */ Et(Ta), Ia = /* @__PURE__ */ p("<button></button>"), Oa = (e) => (() => {
  const t = Ia.cloneNode(!0);
  return P1(t, "click", e.onClick, !0), _(t, () => e.children), Q((n) => {
    const r = e.style, a = `klinecharts-pro-button ${e.type ?? "confirm"} ${e.class ?? ""}`;
    return n._v$ = z1(t, r, n._v$), a !== n._v$2 && j1(t, n._v$2 = a), n;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
v1(["click"]);
const Na = /* @__PURE__ */ p('<svg viewBox="0 0 1024 1024" class="icon"><path d="M810.666667 128H213.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v597.333334c0 46.933333 38.4 85.333333 85.333333 85.333333h597.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V213.333333c0-46.933333-38.4-85.333333-85.333333-85.333333z m-353.706667 567.04a42.496 42.496 0 0 1-60.16 0L243.626667 541.866667c-8.106667-8.106667-12.373333-18.773333-12.373334-29.866667s4.693333-22.186667 12.373334-29.866667a42.496 42.496 0 0 1 60.16 0L426.666667 604.586667l293.546666-293.546667a42.496 42.496 0 1 1 60.16 60.16l-323.413333 323.84z"></path></svg>'), Da = /* @__PURE__ */ p('<svg viewBox="0 0 1024 1024" class="icon"><path d="M245.333333 128h533.333334A117.333333 117.333333 0 0 1 896 245.333333v533.333334A117.333333 117.333333 0 0 1 778.666667 896H245.333333A117.333333 117.333333 0 0 1 128 778.666667V245.333333A117.333333 117.333333 0 0 1 245.333333 128z m0 64c-29.44 0-53.333333 23.893333-53.333333 53.333333v533.333334c0 29.44 23.893333 53.333333 53.333333 53.333333h533.333334c29.44 0 53.333333-23.893333 53.333333-53.333333V245.333333c0-29.44-23.893333-53.333333-53.333333-53.333333H245.333333z"></path></svg>'), Ea = /* @__PURE__ */ p("<div></div>"), Ba = /* @__PURE__ */ p('<span class="label"></span>'), Ua = () => Na.cloneNode(!0), Fa = () => Da.cloneNode(!0), vt = (e) => {
  const [t, n] = w(e.checked ?? !1);
  return m1(() => {
    "checked" in e && n(e.checked);
  }), (() => {
    const r = Ea.cloneNode(!0);
    return r.$$click = (a) => {
      const s = !t();
      e.onChange && e.onChange(s), n(s);
    }, _(r, (() => {
      const a = V(() => !!t());
      return () => a() ? L(Ua, {}) : L(Fa, {});
    })(), null), _(r, (() => {
      const a = V(() => !!e.label);
      return () => a() && (() => {
        const s = Ba.cloneNode(!0);
        return _(s, () => e.label), s;
      })();
    })(), null), Q((a) => {
      const s = e.style, l = `klinecharts-pro-checkbox ${t() && "checked" || ""} ${e.class || ""}`;
      return a._v$ = z1(r, s, a._v$), l !== a._v$2 && j1(r, a._v$2 = l), a;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), r;
  })();
};
v1(["click"]);
const Ka = /* @__PURE__ */ p('<div class="klinecharts-pro-loading"><i class="circle1"></i><i class="circle2"></i><i class="circle3"></i></div>'), c9 = () => Ka.cloneNode(!0), ja = /* @__PURE__ */ p('<div class="klinecharts-pro-empty"><svg class="icon" viewBox="0 0 1024 1024"><path d="M855.6 427.2H168.5c-12.7 0-24.4 6.9-30.6 18L4.4 684.7C1.5 689.9 0 695.8 0 701.8v287.1c0 19.4 15.7 35.1 35.1 35.1H989c19.4 0 35.1-15.7 35.1-35.1V701.8c0-6-1.5-11.8-4.4-17.1L886.2 445.2c-6.2-11.1-17.9-18-30.6-18zM673.4 695.6c-16.5 0-30.8 11.5-34.3 27.7-12.7 58.5-64.8 102.3-127.2 102.3s-114.5-43.8-127.2-102.3c-3.5-16.1-17.8-27.7-34.3-27.7H119c-26.4 0-43.3-28-31.1-51.4l81.7-155.8c6.1-11.6 18-18.8 31.1-18.8h622.4c13 0 25 7.2 31.1 18.8l81.7 155.8c12.2 23.4-4.7 51.4-31.1 51.4H673.4zM819.9 209.5c-1-1.8-2.1-3.7-3.2-5.5-9.8-16.6-31.1-22.2-47.8-12.6L648.5 261c-17 9.8-22.7 31.6-12.6 48.4 0.9 1.4 1.7 2.9 2.5 4.4 9.5 17 31.2 22.8 48 13L807 257.3c16.7-9.7 22.4-31 12.9-47.8zM375.4 261.1L255 191.6c-16.7-9.6-38-4-47.8 12.6-1.1 1.8-2.1 3.6-3.2 5.5-9.5 16.8-3.8 38.1 12.9 47.8L337.3 327c16.9 9.7 38.6 4 48-13.1 0.8-1.5 1.7-2.9 2.5-4.4 10.2-16.8 4.5-38.6-12.4-48.4zM512 239.3h2.5c19.5 0.3 35.5-15.5 35.5-35.1v-139c0-19.3-15.6-34.9-34.8-35.1h-6.4C489.6 30.3 474 46 474 65.2v139c0 19.5 15.9 35.4 35.5 35.1h2.5z"></path></svg></div>'), za = () => ja.cloneNode(!0), Qa = /* @__PURE__ */ p("<ul></ul>"), Za = /* @__PURE__ */ p("<li></li>"), Ee = (e) => (() => {
  const t = Qa.cloneNode(!0);
  return _(t, L(H, {
    get when() {
      return e.loading;
    },
    get children() {
      return L(c9, {});
    }
  }), null), _(t, L(H, {
    get when() {
      var n;
      return !e.loading && !e.children && !((n = e.dataSource) != null && n.length);
    },
    get children() {
      return L(za, {});
    }
  }), null), _(t, L(H, {
    get when() {
      return e.children;
    },
    get children() {
      return e.children;
    }
  }), null), _(t, L(H, {
    get when() {
      return !e.children;
    },
    get children() {
      var n;
      return (n = e.dataSource) == null ? void 0 : n.map((r) => {
        var a;
        return ((a = e.renderItem) == null ? void 0 : a.call(e, r)) ?? Za.cloneNode(!0);
      });
    }
  }), null), Q((n) => {
    const r = e.style, a = `klinecharts-pro-list ${e.class ?? ""}`;
    return n._v$ = z1(t, r, n._v$), a !== n._v$2 && j1(t, n._v$2 = a), n;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})(), Ra = /* @__PURE__ */ p('<div class="klinecharts-pro-modal"><div class="inner"><div class="title-container"><svg class="close-icon" viewBox="0 0 1024 1024"><path d="M934.184927 199.723787 622.457206 511.452531l311.727721 311.703161c14.334473 14.229073 23.069415 33.951253 23.069415 55.743582 0 43.430138-35.178197 78.660524-78.735226 78.660524-21.664416 0-41.361013-8.865925-55.642275-23.069415L511.149121 622.838388 199.420377 934.490384c-14.204513 14.20349-33.901111 23.069415-55.642275 23.069415-43.482327 0-78.737272-35.230386-78.737272-78.660524 0-21.792329 8.864902-41.513486 23.094998-55.743582l311.677579-311.703161L88.135828 199.723787c-14.230096-14.255679-23.094998-33.92567-23.094998-55.642275 0-43.430138 35.254945-78.762855 78.737272-78.762855 21.741163 0 41.437761 8.813736 55.642275 23.069415l311.727721 311.727721L822.876842 88.389096c14.281261-14.255679 33.977859-23.069415 55.642275-23.069415 43.557028 0 78.735226 35.332716 78.735226 78.762855C957.254342 165.798117 948.5194 185.468109 934.184927 199.723787"></path></svg></div><div class="content-container"></div></div></div>'), Ha = /* @__PURE__ */ p('<div class="button-container"></div>'), Z1 = (e) => (() => {
  const t = Ra.cloneNode(!0), n = t.firstChild, r = n.firstChild, a = r.firstChild, s = r.nextSibling;
  return t.$$click = (l) => {
    l.target === l.currentTarget && e.onClose && e.onClose();
  }, _(r, () => e.title, a), P1(a, "click", e.onClose, !0), _(s, () => e.children), _(n, (() => {
    const l = V(() => !!(e.buttons && e.buttons.length > 0));
    return () => l() && (() => {
      const c = Ha.cloneNode(!0);
      return _(c, () => e.buttons.map((h) => L(Oa, Dt(h, {
        get style() {
          return {
            ...e.minButtonWidth ? {
              "min-width": `${e.minButtonWidth}px`
            } : {},
            width: e.isMobile ? "100%" : "auto"
          };
        },
        get children() {
          return h.children;
        }
      })))), Q((h) => {
        const m = e.btnParentStyle, d = !!e.isMobile;
        return h._v$8 = z1(c, m, h._v$8), d !== h._v$9 && c.classList.toggle("mobile-buttons", h._v$9 = d), h;
      }, {
        _v$8: void 0,
        _v$9: void 0
      }), c;
    })();
  })(), null), Q((l) => {
    const c = !!e.isMobile, h = e.isMobile ? "100%" : `${e.width ?? 400}px`, m = (e.isMobile, "auto"), d = e.isMobile ? "60vh" : "90vh", $ = !!e.isMobile, v = !!e.isMobile, A = !!e.isMobile;
    return c !== l._v$ && t.classList.toggle("mobile-modal", l._v$ = c), h !== l._v$2 && n.style.setProperty("width", l._v$2 = h), m !== l._v$3 && n.style.setProperty("height", l._v$3 = m), d !== l._v$4 && n.style.setProperty("max-height", l._v$4 = d), $ !== l._v$5 && n.classList.toggle("mobile-inner", l._v$5 = $), v !== l._v$6 && r.classList.toggle("mobile-title", l._v$6 = v), A !== l._v$7 && s.classList.toggle("mobile-content", l._v$7 = A), l;
  }, {
    _v$: void 0,
    _v$2: void 0,
    _v$3: void 0,
    _v$4: void 0,
    _v$5: void 0,
    _v$6: void 0,
    _v$7: void 0
  }), t;
})();
v1(["click"]);
const Va = /* @__PURE__ */ p('<div tabindex="0"><div class="selector-container"><span class="value"></span><i class="arrow"></i></div></div>'), Ya = /* @__PURE__ */ p('<div class="drop-down-container"><ul></ul></div>'), Ga = /* @__PURE__ */ p('<div><input type="text"></div>'), qa = /* @__PURE__ */ p("<li></li>"), l9 = (e) => {
  const [t, n] = w(!1), [r, a] = w("");
  let s, l;
  const c = V(() => {
    if (!e.dataSource || !e.searchable)
      return e.dataSource;
    const d = r().toLowerCase().trim();
    return d ? typeof e.dataSource[0] == "string" ? e.dataSource.filter((v) => v.toLowerCase().includes(d)) : e.dataSource.filter((v) => {
      var E, O;
      const A = ((E = v.text) == null ? void 0 : E.toString().toLowerCase()) || "", T = ((O = v.key) == null ? void 0 : O.toLowerCase()) || "";
      return A.includes(d) || T.includes(d);
    }) : e.dataSource;
  }), h = () => {
    const d = !t();
    n(d), a(""), d && e.searchable && setTimeout(() => s == null ? void 0 : s.focus(), 50);
  }, m = (d) => {
    const $ = d.relatedTarget;
    l && $ && l.contains($) || (n(!1), a(""));
  };
  return (() => {
    const d = Va.cloneNode(!0), $ = d.firstChild, v = $.firstChild;
    d.addEventListener("blur", m), d.$$click = (T) => {
      T.stopPropagation(), h();
    };
    const A = l;
    return typeof A == "function" ? F1(A, d) : l = d, _(v, () => e.value), _(d, (() => {
      const T = V(() => !!(e.dataSource && e.dataSource.length > 0));
      return () => T() && (() => {
        const E = Ya.cloneNode(!0), O = E.firstChild;
        return E.$$mousedown = (F) => F.preventDefault(), _(E, (() => {
          const F = V(() => !!e.searchable);
          return () => F() && (() => {
            const K = Ga.cloneNode(!0), P = K.firstChild;
            K.style.setProperty("padding", "8px"), K.style.setProperty("border-bottom", "1px solid #333"), P.$$click = (z) => z.stopPropagation(), P.$$input = (z) => a(z.currentTarget.value);
            const B = s;
            return typeof B == "function" ? F1(B, P) : s = P, P.style.setProperty("width", "100%"), P.style.setProperty("padding", "6px 10px"), P.style.setProperty("border", "1px solid var(--klinecharts-pro-border-color)"), P.style.setProperty("border-radius", "4px"), P.style.setProperty("background-color", "var(--klinecharts-pro-popover-background-color)"), P.style.setProperty("color", "#fff"), P.style.setProperty("font-size", "13px"), P.style.setProperty("outline", "none"), Q(() => y1(P, "placeholder", e.searchPlaceholder || "Search...")), Q(() => P.value = r()), K;
          })();
        })(), O), _(O, () => {
          var F;
          return (F = c()) == null ? void 0 : F.map((K) => {
            const B = K[e.valueKey ?? "text"] ?? K;
            return (() => {
              const z = qa.cloneNode(!0);
              return z.$$click = (_1) => {
                var i1;
                _1.stopPropagation(), e.value !== B && ((i1 = e.onSelected) == null || i1.call(e, K)), n(!1), a("");
              }, _(z, B), z;
            })();
          });
        }), E;
      })();
    })(), null), Q((T) => {
      const E = e.style, O = `klinecharts-pro-select ${e.class ?? ""} ${t() ? "klinecharts-pro-select-show" : ""}`;
      return T._v$ = z1(d, E, T._v$), O !== T._v$2 && j1(d, T._v$2 = O), T;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), d;
  })();
};
v1(["click", "mousedown", "input"]);
const Wa = /* @__PURE__ */ p('<span class="prefix"></span>'), Xa = /* @__PURE__ */ p('<span class="suffix"></span>'), Ja = /* @__PURE__ */ p('<div><input class="value"></div>'), u9 = (e) => {
  const t = Dt({
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER
  }, e);
  let n;
  const [r, a] = w("normal");
  return (() => {
    const s = Ja.cloneNode(!0), l = s.firstChild;
    return s.$$click = () => {
      n == null || n.focus();
    }, _(s, L(H, {
      get when() {
        return t.prefix;
      },
      get children() {
        const c = Wa.cloneNode(!0);
        return _(c, () => t.prefix), c;
      }
    }), l), l.addEventListener("change", (c) => {
      var m, d;
      const h = c.target.value;
      if ("precision" in t) {
        let $;
        const v = Math.max(0, Math.floor(t.precision));
        v <= 0 ? $ = new RegExp(/^[1-9]\d*$/) : $ = new RegExp("^\\d+\\.?\\d{0," + v + "}$"), (h === "" || $.test(h) && +h >= t.min && +h <= t.max) && ((m = t.onChange) == null || m.call(t, h === "" ? h : +h));
      } else
        (d = t.onChange) == null || d.call(t, h);
    }), l.addEventListener("blur", () => {
      a("normal");
    }), l.addEventListener("focus", () => {
      a("focus");
    }), F1((c) => {
      n = c;
    }, l), _(s, L(H, {
      get when() {
        return t.suffix;
      },
      get children() {
        const c = Xa.cloneNode(!0);
        return _(c, () => t.suffix), c;
      }
    }), null), Q((c) => {
      const h = t.style, m = `klinecharts-pro-input ${t.class ?? ""}`, d = r(), $ = t.placeholder ?? "";
      return c._v$ = z1(s, h, c._v$), m !== c._v$2 && j1(s, c._v$2 = m), d !== c._v$3 && y1(s, "data-status", c._v$3 = d), $ !== c._v$4 && y1(l, "placeholder", c._v$4 = $), c;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0
    }), Q(() => l.value = t.value), s;
  })();
};
v1(["click"]);
const ei = /* @__PURE__ */ p('<div><i class="thumb"></i></div>'), ti = (e) => (() => {
  const t = ei.cloneNode(!0);
  return t.$$click = (n) => {
    e.onChange && e.onChange();
  }, Q((n) => {
    const r = e.style, a = `klinecharts-pro-switch ${e.open ? "turn-on" : "turn-off"} ${e.class ?? ""}`;
    return n._v$ = z1(t, r, n._v$), a !== n._v$2 && j1(t, n._v$2 = a), n;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
v1(["click"]);
const ni = "指标", ri = "更多", ai = "主图指标", ii = "副图指标", si = "设置", oi = "时区", ci = "截屏", li = "全屏", ui = "退出全屏", di = "保存", hi = "确定", Ci = "取消", yi = "MA(移动平均线)", fi = "EMA(指数平滑移动平均线)", gi = "SMA", mi = "BOLL(布林线)", pi = "BBI(多空指数)", vi = "SAR(停损点指向指标)", _i = "VOL(成交量)", $i = "MACD(指数平滑异同移动平均线)", bi = "KDJ(随机指标)", Li = "RSI(相对强弱指标)", xi = "BIAS(乖离率)", ki = "BRAR(情绪指标)", Ai = "CCI(顺势指标)", wi = "DMI(动向指标)", Mi = "CR(能量指标)", Si = "PSY(心理线)", Ti = "DMA(平行线差指标)", Pi = "TRIX(三重指数平滑平均线)", Ii = "OBV(能量潮指标)", Oi = "VR(成交量变异率)", Ni = "WR(威廉指标)", Di = "MTM(动量指标)", Ei = "EMV(简易波动指标)", Bi = "ROC(变动率指标)", Ui = "PVT(价量趋势指标)", Fi = "AO(动量震荡指标)", Ki = "世界统一时间", ji = "(UTC-10) 檀香山", zi = "(UTC-8) 朱诺", Qi = "(UTC-7) 洛杉矶", Zi = "(UTC-5) 芝加哥", Ri = "(UTC-4) 多伦多", Hi = "(UTC-3) 圣保罗", Vi = "(UTC+1) 伦敦", Yi = "(UTC+2) 柏林", Gi = "(UTC+3) 巴林", qi = "(UTC+4) 迪拜", Wi = "(UTC+5) 阿什哈巴德", Xi = "(UTC+6) 阿拉木图", Ji = "(UTC+7) 曼谷", es = "(UTC+8) 上海", ts = "(UTC+9) 东京", ns = "(UTC+10) 悉尼", rs = "(UTC+12) 诺福克岛", as = "水平直线", is = "水平射线", ss = "水平线段", os = "垂直直线", cs = "垂直射线", ls = "垂直线段", us = "直线", ds = "射线", hs = "线段", Cs = "箭头", ys = "价格线", fs = "价格通道线", gs = "平行直线", ms = "斐波那契回调直线", ps = "斐波那契回调线段", vs = "斐波那契圆环", _s = "斐波那契螺旋", $s = "斐波那契速度阻力扇", bs = "斐波那契趋势扩展", Ls = "江恩箱", xs = "矩形", ks = "平行四边形", As = "圆", ws = "三角形", Ms = "三浪", Ss = "五浪", Ts = "八浪", Ps = "任意浪", Is = "ABCD形态", Os = "XABCD形态", Ns = "弱磁模式", Ds = "强磁模式", Es = "商品搜索", Bs = "商品代码", Us = "参数1", Fs = "参数2", Ks = "参数3", js = "参数4", zs = "参数5", Qs = "周期", Zs = "标准差", Rs = "蜡烛图类型", Hs = "全实心", Vs = "全空心", Ys = "涨空心", Gs = "跌空心", qs = "OHLC", Ws = "面积图", Xs = "最新价显示", Js = "最高价显示", eo = "最低价显示", to = "指标最新值显示", no = "价格轴类型", ro = "线性轴", ao = "百分比轴", io = "对数轴", so = "倒置坐标", oo = "网格线显示", co = "恢复默认", lo = {
  indicator: ni,
  more: ri,
  main_indicator: ai,
  sub_indicator: ii,
  setting: si,
  timezone: oi,
  screenshot: ci,
  full_screen: li,
  exit_full_screen: ui,
  save: di,
  confirm: hi,
  cancel: Ci,
  ma: yi,
  ema: fi,
  sma: gi,
  boll: mi,
  bbi: pi,
  sar: vi,
  vol: _i,
  macd: $i,
  kdj: bi,
  rsi: Li,
  bias: xi,
  brar: ki,
  cci: Ai,
  dmi: wi,
  cr: Mi,
  psy: Si,
  dma: Ti,
  trix: Pi,
  obv: Ii,
  vr: Oi,
  wr: Ni,
  mtm: Di,
  emv: Ei,
  roc: Bi,
  pvt: Ui,
  ao: Fi,
  utc: Ki,
  honolulu: ji,
  juneau: zi,
  los_angeles: Qi,
  chicago: Zi,
  toronto: Ri,
  sao_paulo: Hi,
  london: Vi,
  berlin: Yi,
  bahrain: Gi,
  dubai: qi,
  ashkhabad: Wi,
  almaty: Xi,
  bangkok: Ji,
  shanghai: es,
  tokyo: ts,
  sydney: ns,
  norfolk: rs,
  horizontal_straight_line: as,
  horizontal_ray_line: is,
  horizontal_segment: ss,
  vertical_straight_line: os,
  vertical_ray_line: cs,
  vertical_segment: ls,
  straight_line: us,
  ray_line: ds,
  segment: hs,
  arrow: Cs,
  price_line: ys,
  price_channel_line: fs,
  parallel_straight_line: gs,
  fibonacci_line: ms,
  fibonacci_segment: ps,
  fibonacci_circle: vs,
  fibonacci_spiral: _s,
  fibonacci_speed_resistance_fan: $s,
  fibonacci_extension: bs,
  gann_box: Ls,
  rect: xs,
  parallelogram: ks,
  circle: As,
  triangle: ws,
  three_waves: Ms,
  five_waves: Ss,
  eight_waves: Ts,
  any_waves: Ps,
  abcd: Is,
  xabcd: Os,
  weak_magnet: Ns,
  strong_magnet: Ds,
  symbol_search: Es,
  symbol_code: Bs,
  params_1: Us,
  params_2: Fs,
  params_3: Ks,
  params_4: js,
  params_5: zs,
  period: Qs,
  standard_deviation: Zs,
  candle_type: Rs,
  candle_solid: Hs,
  candle_stroke: Vs,
  candle_up_stroke: Ys,
  candle_down_stroke: Gs,
  ohlc: qs,
  area: Ws,
  last_price_show: Xs,
  high_price_show: Js,
  low_price_show: eo,
  indicator_last_value_show: to,
  price_axis_type: no,
  normal: ro,
  percentage: ao,
  log: io,
  reverse_coordinate: so,
  grid_show: oo,
  restore_default: co
}, uo = "Indicator", ho = "More", Co = "Main Indicator", yo = "Sub Indicator", fo = "Setting", go = "Timezone", mo = "Screenshot", po = "Full Screen", vo = "Exit", _o = "Save", $o = "Confirm", bo = "Cancel", Lo = "MA(Moving Average)", xo = "EMA(Exponential Moving Average)", ko = "SMA", Ao = "BOLL(Bolinger Bands)", wo = "BBI(Bull And Bearlndex)", Mo = "SAR(Stop and Reverse)", So = "VOL(Volume)", To = "MACD(Moving Average Convergence / Divergence)", Po = "KDJ(KDJ Index)", Io = "RSI(Relative Strength Index)", Oo = "BIAS(Bias Ratio)", No = "BRAR(情绪指标)", Do = "CCI(Commodity Channel Index)", Eo = "DMI(Directional Movement Index)", Bo = "CR(能量指标)", Uo = "PSY(Psychological Line)", Fo = "DMA(Different of Moving Average)", Ko = "TRIX(Triple Exponentially Smoothed Moving Average)", jo = "OBV(On Balance Volume)", zo = "VR(Volatility Volume Ratio)", Qo = "WR(Williams %R)", Zo = "MTM(Momentum Index)", Ro = "EMV(Ease of Movement Value)", Ho = "ROC(Price Rate of Change)", Vo = "PVT(Price and Volume Trend)", Yo = "AO(Awesome Oscillator)", Go = "UTC", qo = "(UTC-10) Honolulu", Wo = "(UTC-8) Juneau", Xo = "(UTC-7) Los Angeles", Jo = "(UTC-5) Chicago", ec = "(UTC-4) Toronto", tc = "(UTC-3) Sao Paulo", nc = "(UTC+1) London", rc = "(UTC+2) Berlin", ac = "(UTC+3) Bahrain", ic = "(UTC+4) Dubai", sc = "(UTC+5) Ashkhabad", oc = "(UTC+6) Almaty", cc = "(UTC+7) Bangkok", lc = "(UTC+8) Shanghai", uc = "(UTC+9) Tokyo", dc = "(UTC+10) Sydney", hc = "(UTC+12) Norfolk", Cc = "Horizontal Line", yc = "Horizontal Ray", fc = "Horizontal Segment", gc = "Vertical Line", mc = "Vertical Ray", pc = "Vertical Segment", vc = "Trend Line", _c = "Ray", $c = "Segment", bc = "Arrow", Lc = "Price Line", xc = "Price Channel Line", kc = "Parallel Line", Ac = "Fibonacci Line", wc = "Fibonacci Segment", Mc = "Fibonacci Circle", Sc = "Fibonacci Spiral", Tc = "Fibonacci Sector", Pc = "Fibonacci Extension", Ic = "Gann Box", Oc = "Rect", Nc = "Parallelogram", Dc = "Circle", Ec = "Triangle", Bc = "Three Waves", Uc = "Five Waves", Fc = "Eight Waves", Kc = "Any Waves", jc = "ABCD Pattern", zc = "XABCD Pattern", Qc = "Weak Magnet", Zc = "Strong Magnet", Rc = "Symbol Search", Hc = "Symbol Code", Vc = "Parameter 1", Yc = "Parameter 2", Gc = "Parameter 3", qc = "Parameter 4", Wc = "Parameter 5", Xc = "Period", Jc = "Standard Deviation", el = "Candle Type", tl = "Candle Solid", nl = "Candle Stroke", rl = "Candle Up Stroke", al = "Candle Down Stroke", il = "OHLC", sl = "Area", ol = "Show Last Price", cl = "Show Highest Price", ll = "Show Lowest Price", ul = "Show indicator's last value", dl = "Price Axis Type", hl = "Normal", Cl = "Percentage", yl = "Log", fl = "Reverse Coordinate", gl = "Show Grids", ml = "Restore Defaults", pl = {
  indicator: uo,
  more: ho,
  main_indicator: Co,
  sub_indicator: yo,
  setting: fo,
  timezone: go,
  screenshot: mo,
  full_screen: po,
  exit_full_screen: vo,
  save: _o,
  confirm: $o,
  cancel: bo,
  ma: Lo,
  ema: xo,
  sma: ko,
  boll: Ao,
  bbi: wo,
  sar: Mo,
  vol: So,
  macd: To,
  kdj: Po,
  rsi: Io,
  bias: Oo,
  brar: No,
  cci: Do,
  dmi: Eo,
  cr: Bo,
  psy: Uo,
  dma: Fo,
  trix: Ko,
  obv: jo,
  vr: zo,
  wr: Qo,
  mtm: Zo,
  emv: Ro,
  roc: Ho,
  pvt: Vo,
  ao: Yo,
  utc: Go,
  honolulu: qo,
  juneau: Wo,
  los_angeles: Xo,
  chicago: Jo,
  toronto: ec,
  sao_paulo: tc,
  london: nc,
  berlin: rc,
  bahrain: ac,
  dubai: ic,
  ashkhabad: sc,
  almaty: oc,
  bangkok: cc,
  shanghai: lc,
  tokyo: uc,
  sydney: dc,
  norfolk: hc,
  horizontal_straight_line: Cc,
  horizontal_ray_line: yc,
  horizontal_segment: fc,
  vertical_straight_line: gc,
  vertical_ray_line: mc,
  vertical_segment: pc,
  straight_line: vc,
  ray_line: _c,
  segment: $c,
  arrow: bc,
  price_line: Lc,
  price_channel_line: xc,
  parallel_straight_line: kc,
  fibonacci_line: Ac,
  fibonacci_segment: wc,
  fibonacci_circle: Mc,
  fibonacci_spiral: Sc,
  fibonacci_speed_resistance_fan: Tc,
  fibonacci_extension: Pc,
  gann_box: Ic,
  rect: Oc,
  parallelogram: Nc,
  circle: Dc,
  triangle: Ec,
  three_waves: Bc,
  five_waves: Uc,
  eight_waves: Fc,
  any_waves: Kc,
  abcd: jc,
  xabcd: zc,
  weak_magnet: Qc,
  strong_magnet: Zc,
  symbol_search: Rc,
  symbol_code: Hc,
  params_1: Vc,
  params_2: Yc,
  params_3: Gc,
  params_4: qc,
  params_5: Wc,
  period: Xc,
  standard_deviation: Jc,
  candle_type: el,
  candle_solid: tl,
  candle_stroke: nl,
  candle_up_stroke: rl,
  candle_down_stroke: al,
  ohlc: il,
  area: sl,
  last_price_show: ol,
  high_price_show: cl,
  low_price_show: ll,
  indicator_last_value_show: ul,
  price_axis_type: dl,
  normal: hl,
  percentage: Cl,
  log: yl,
  reverse_coordinate: fl,
  grid_show: gl,
  restore_default: ml
}, d9 = {
  "zh-CN": lo,
  "en-US": pl
};
function Kd(e, t) {
  d9[e] = t;
}
const i = (e, t) => {
  var n;
  return ((n = d9[t]) == null ? void 0 : n[e]) ?? e;
}, vl = /* @__PURE__ */ p('<div class="scroll-indicator left"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg></div>'), _l = /* @__PURE__ */ p('<img alt="symbol">'), $l = /* @__PURE__ */ p('<div class="symbol"><span></span></div>'), bl = /* @__PURE__ */ p('<span class="down-arrow-icon mobile-separate-arrow"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></span>'), Ll = /* @__PURE__ */ p('<span class="mobile-more-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg></span>'), xl = /* @__PURE__ */ p('<div class="item tools"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div>'), kl = /* @__PURE__ */ p('<div class="klinecharts-pro-order-tools-popover"><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Quick Order</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Open Orders</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Positions</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Order History</span></label></div>'), Al = /* @__PURE__ */ p('<div><div class="item tools order-tools-trigger"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Orders"><path d="M4 7h10"></path><path d="M4 12h8"></path><path d="M4 17h6"></path><path d="M18 6v12"></path><path d="M15 15l3 3 3-3"></path></svg><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></div></div>'), wl = /* @__PURE__ */ p('<div class="item tools"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path><path d="M15.22299772857666,9.722223632261718C12.59389772857666,9.722223632261718,10.44600772857666,12.020201374511718,10.44600772857666,14.861111374511719C10.44600772857666,17.70202137451172,12.58215772857666,20.000021374511718,15.223007728576661,20.000021374511718C17.86384772857666,20.000021374511718,19.99999772857666,17.70202137451172,19.99999772857666,14.861111374511719C19.99999772857666,12.020201374511718,17.85211772857666,9.72222212709572,15.22299772857666,9.722223632261718ZM15.22299772857666,18.598491374511717C13.30985772857666,18.598491374511717,11.737087728576661,16.91919137451172,11.737087728576661,14.848481374511719C11.737087728576661,12.777781374511719,13.29811772857666,11.098491374511719,15.22299772857666,11.098491374511719C17.14787772857666,11.098491374511719,18.708917728576658,12.777781374511719,18.708917728576658,14.848481374511719C18.708917728576658,16.91919137451172,17.13614772857666,18.59848137451172,15.22299772857666,18.598491374511717Z"></path><path d="M15.692486288146974,15.050496970825195L15.692486288146974,12.676760970825196C15.692486288146974,12.297972970825196,15.399058288146973,11.982316970825195,15.046945288146972,11.982316970825195C14.694833288146972,11.982316970825195,14.401406288146973,12.297972970825196,14.401406288146973,12.676760970825196L14.401406288146973,15.340896970825195C14.401406288146973,15.530296970825194,14.471829288146973,15.694436970825196,14.589200288146973,15.833326970825196L15.751176288146972,17.095956970825195C15.868546288146973,17.222216970825194,16.032866288146973,17.297976970825196,16.208916288146973,17.297976970825196C16.384976288146973,17.297976970825196,16.537556288146973,17.222216970825194,16.666666288146974,17.095956970825195C16.78403628814697,16.969686970825194,16.854456288146974,16.792916970825196,16.854456288146974,16.603526970825193C16.854456288146974,16.414136970825197,16.78403628814697,16.237366970825196,16.666666288146974,16.111106970825197L15.692486288146974,15.050496970825195Z"></path></svg></div>'), Ml = /* @__PURE__ */ p('<div class="item tools"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg></div>'), Sl = /* @__PURE__ */ p('<div class="item tools"><svg viewBox="0 0 20 20"><path d="M6.50977,1L13.4902,1C13.6406,1,13.7695,1.1104910000000001,13.7969,1.2631700000000001L14.0273,2.52277C14.1387,3.13147,14.6543,3.57143,15.2559,3.57143L17.5,3.57143C18.8809,3.57143,20,4.72254,20,6.14286L20,16.4286C20,17.8489,18.8809,19,17.5,19L2.5,19C1.11914,19,0,17.8489,0,16.4286L0,6.14286C0,4.72254,1.11914,3.57143,2.5,3.57143L4.74414,3.57143C5.3457,3.57143,5.86133,3.13147,5.97266,2.52277L6.20312,1.2631700000000001C6.23047,1.1104910000000001,6.35937,1,6.50977,1ZM15.2559,4.857139999999999C14.0547,4.857139999999999,13.0215,3.97522,12.7988,2.75982L12.7129,2.28571L7.28711,2.28571L7.20117,2.75982C6.98047,3.97522,5.94727,4.857139999999999,4.74414,4.857139999999999L2.5,4.857139999999999C1.81055,4.857139999999999,1.25,5.43371,1.25,6.14286L1.25,16.4286C1.25,17.1377,1.81055,17.7143,2.5,17.7143L17.5,17.7143C18.1895,17.7143,18.75,17.1377,18.75,16.4286L18.75,6.14286C18.75,5.43371,18.1895,4.857139999999999,17.5,4.857139999999999L15.2559,4.857139999999999ZM4.375,6.78571L3.125,6.78571C2.7793,6.78571,2.5,6.49844,2.5,6.14286C2.5,5.78728,2.7793,5.5,3.125,5.5L4.375,5.5C4.7207,5.5,5,5.78728,5,6.14286C5,6.49844,4.7207,6.78571,4.375,6.78571ZM10,6.14286C7.06641,6.14286,4.6875,8.58973,4.6875,11.6071C4.6875,14.6246,7.06641,17.0714,10,17.0714C12.9336,17.0714,15.3125,14.6246,15.3125,11.6071C15.3125,8.58973,12.9336,6.14286,10,6.14286ZM10,7.42857C11.0859,7.42857,12.1055,7.8625,12.873,8.65201C13.6406,9.44152,14.0625,10.49018,14.0625,11.6071C14.0625,12.7241,13.6406,13.7728,12.873,14.5623C12.1055,15.3518,11.0859,15.7857,10,15.7857C8.91406,15.7857,7.89453,15.3518,7.12695,14.5623C6.35937,13.7728,5.9375,12.7241,5.9375,11.6071C5.9375,10.49018,6.35938,9.44152,7.12695,8.65201C7.89453,7.8625,8.91406,7.42857,10,7.42857ZM10,9.67857C8.96484,9.67857,8.125,10.54241,8.125,11.6071C8.125,12.6719,8.96484,13.5357,10,13.5357C11.0352,13.5357,11.875,12.6719,11.875,11.6071C11.875,10.54241,11.0352,9.67857,10,9.67857ZM10,10.96429C10.3438,10.96429,10.625,11.2536,10.625,11.6071C10.625,11.9607,10.3438,12.25,10,12.25C9.65625,12.25,9.375,11.9607,9.375,11.6071C9.375,11.2536,9.65625,10.96429,10,10.96429Z"></path></svg></div>'), Tl = /* @__PURE__ */ p('<div class="scroll-indicator right"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"></path></svg></div>'), Pl = /* @__PURE__ */ p('<div><div class="klinecharts-pro-period-bar"><div class="menu-container"><svg viewBox="0 0 1024 1024"><path d="M192.037 287.953h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 479.169H438.553c-17.673 0-32 14.327-32 32s14.327 32 32 32h393.608c17.673 0 32-14.327 32-32s-14.327-32-32-32zM832.161 735.802H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32zM319.028 351.594l-160 160 160 160z"></path></svg></div><div><div class="item tools"></div></div></div></div>'), Il = /* @__PURE__ */ p("<span></span>"), Ol = /* @__PURE__ */ p('<svg viewBox="0 0 20 20"><path d="M1.08108,0L0,1.079L4.18919,5.27938L2.54826,6.91715L6.9112,6.91715L6.9112,2.56262L5.28957,4.18112L1.08108,0ZM15.8108,5.27938L20,1.079L18.9189,0L14.7104,4.18112L13.0888,2.56262L13.0888,6.91715L17.4517,6.91715L15.8108,5.27938ZM4.16988,14.7014L0.07722,18.8054L1.1583,20L5.27027,15.7996L6.9112,17.4374L6.9112,13.0829L2.54826,13.0829L4.16988,14.7014ZM17.4517,13.0829L13.0888,13.0829L13.0888,17.4374L14.7297,15.7996L18.8417,20L19.9228,18.8054L15.8301,14.7013L17.4517,13.0829Z"></path></svg>'), Nl = /* @__PURE__ */ p('<svg viewBox="0 0 20 20"><path d="M2.93444,1.76899L7.57544,6.40999L6.38918,7.59626L1.76899,2.93444L0,4.70343L0,0L4.70343,0L2.93444,1.76899ZM6.40999,12.4037L1.76899,17.0447L0,15.2758L0,19.9792L4.70343,19.9792L2.93444,18.2102L7.57544,13.5692L6.40999,12.4037ZM15.2758,0L17.0447,1.76899L12.4037,6.40999L13.59,7.59626L18.231,2.95526L20,4.72425L20,0L15.2758,0ZM13.5692,12.4037L12.3829,13.59L17.0239,18.231L15.2549,20L19.9792,20L19.9792,15.2758L18.2102,17.0447L13.5692,12.4037Z"></path></svg>'), Dl = (e) => {
  let t, n, r;
  const [a, s] = w(window.innerWidth < 768), [l, c] = w(localStorage.getItem("klinechart_secondary_period") || ""), [h, m] = w(!1), [d, $] = w({
    top: 0,
    left: 0,
    minWidth: 220
  }), v = () => {
    s(window.innerWidth < 768), h() && z();
  }, [A, T] = w(!1), E = () => document.fullscreenElement ?? document.body, O = () => {
    T(!!document.fullscreenElement);
  }, [F, K] = w(!1), [P, B] = w(!1), z = () => {
    if (!n)
      return;
    const D = n.getBoundingClientRect(), Z = Math.max(220, Math.ceil(D.width)), u1 = window.innerWidth, l1 = Math.min(Math.max(8, D.right - Z), Math.max(8, u1 - Z - 8));
    $({
      top: Math.ceil(D.bottom + 8),
      left: Math.ceil(l1),
      minWidth: Z
    });
  }, _1 = () => {
    m((D) => {
      const Z = !D;
      return Z && queueMicrotask(z), Z;
    });
  }, i1 = (D) => {
    if (!h())
      return;
    const Z = D.target;
    Z && (n != null && n.contains(Z) || r != null && r.contains(Z) || m(!1));
  }, f1 = () => {
    h() && z();
  }, N = () => {
    if (t && a()) {
      const D = t;
      K(D.scrollLeft > 10), B(D.scrollLeft + D.clientWidth < D.scrollWidth - 10);
    } else
      K(!1), B(!1);
  };
  o0(() => {
    window.addEventListener("resize", v), document.addEventListener("fullscreenchange", O), document.addEventListener("mousedown", i1), window.addEventListener("scroll", f1, !0), document.addEventListener("mozfullscreenchange", O), document.addEventListener("webkitfullscreenchange", O), document.addEventListener("msfullscreenchange", O), t && (t.addEventListener("scroll", N), setTimeout(N, 100));
  }), K1(() => {
    window.removeEventListener("resize", v), document.removeEventListener("fullscreenchange", O), document.removeEventListener("mousedown", i1), window.removeEventListener("scroll", f1, !0), document.removeEventListener("mozfullscreenchange", O), document.removeEventListener("webkitfullscreenchange", O), document.removeEventListener("msfullscreenchange", O), t && t.removeEventListener("scroll", N);
  });
  const G = V(() => {
    const D = e.periods.filter((Z) => {
      if (!a() || A())
        return !0;
      const u1 = e.period.text, l1 = l();
      if (Z.text === u1 || l1 && Z.text === l1)
        return !0;
      if (!l1 || l1 === u1) {
        const q = e.periods.find(($1) => $1.text !== u1);
        return Z.text === (q == null ? void 0 : q.text);
      }
      return !1;
    }).slice(0, a() && !A() ? 2 : e.periods.length);
    return setTimeout(N, 50), D;
  });
  let R = e.period.text;
  return m1(() => {
    const D = e.period.text;
    D !== R && (a() && (c(R), localStorage.setItem("klinechart_secondary_period", R)), R = D), setTimeout(N, 50);
  }), m1(() => {
    A(), setTimeout(N, 100);
  }), m1(() => {
    if (!e.showOrderToolsMenu) {
      m(!1);
      return;
    }
    h() && queueMicrotask(z);
  }), (() => {
    const D = Pl.cloneNode(!0), Z = D.firstChild, u1 = Z.firstChild, l1 = u1.firstChild, q = u1.nextSibling, $1 = q.firstChild;
    return D.style.setProperty("position", "relative"), D.style.setProperty("width", "100%"), D.style.setProperty("display", "flex"), D.style.setProperty("align-items", "center"), _(D, L(H, {
      get when() {
        return V(() => !!a())() && F();
      },
      get children() {
        const g = vl.cloneNode(!0);
        return g.$$click = () => t.scrollBy({
          left: -100,
          behavior: "smooth"
        }), g.style.setProperty("position", "absolute"), g.style.setProperty("left", "0"), g.style.setProperty("top", "0"), g.style.setProperty("bottom", "1px"), g.style.setProperty("width", "30px"), g.style.setProperty("display", "flex"), g.style.setProperty("align-items", "center"), g.style.setProperty("justify-content", "center"), g.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), g.style.setProperty("z-index", "10"), g.style.setProperty("cursor", "pointer"), g.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), g;
      }
    }), Z), F1((g) => {
      t = g;
    }, Z), Z.style.setProperty("width", "100%"), P1(l1, "click", e.onMenuClick, !0), _(Z, L(H, {
      get when() {
        return e.symbol;
      },
      get children() {
        const g = $l.cloneNode(!0), t1 = g.firstChild;
        return P1(g, "click", e.onSymbolClick, !0), _(g, L(H, {
          get when() {
            return e.symbol.logo;
          },
          get children() {
            const S = _l.cloneNode(!0);
            return Q(() => y1(S, "src", e.symbol.logo)), S;
          }
        }), t1), _(t1, () => e.symbol.shortName ?? e.symbol.name ?? e.symbol.ticker), g;
      }
    }), q), _(Z, () => G().map((g, t1) => {
      const S = g.text === e.period.text;
      return (() => {
        const Y = Il.cloneNode(!0);
        return Y.$$click = (j) => {
          a() && S && !A() ? (e.onMobilePeriodClick ? e.onMobilePeriodClick(g) : e.onMenuClick(), j.stopPropagation()) : e.onPeriodChange(g);
        }, j1(Y, `item period ${S ? "selected" : ""}`), _(Y, () => g.text), Y;
      })();
    }), q), _(Z, L(H, {
      get when() {
        return V(() => !!(a() && !A()))() && G().length > 1;
      },
      get children() {
        const g = bl.cloneNode(!0);
        return g.$$click = (t1) => {
          t1.stopPropagation(), e.onMobilePeriodClick ? e.onMobilePeriodClick(e.period) : e.onMenuClick();
        }, g.style.setProperty("margin-left", "4px"), g.style.setProperty("display", "inline-flex"), g.style.setProperty("align-items", "center"), g;
      }
    }), q), _(Z, L(H, {
      get when() {
        return V(() => !!a())() && !A();
      },
      get children() {
        const g = Ll.cloneNode(!0);
        return g.$$click = (t1) => {
          var S;
          t1.stopPropagation(), (S = e.onMobileMoreClick) == null || S.call(e);
        }, g.style.setProperty("margin-left", "8px"), g.style.setProperty("display", "inline-flex"), g.style.setProperty("align-items", "center"), g.style.setProperty("cursor", "pointer"), g.style.setProperty("padding", "0 4px"), g;
      }
    }), q), _(Z, L(H, {
      get when() {
        return !a();
      },
      get children() {
        const g = xl.cloneNode(!0), t1 = g.firstChild, S = t1.nextSibling;
        return P1(g, "click", e.onIndicatorClick, !0), _(S, () => i("indicator", e.locale)), g;
      }
    }), q), q.style.setProperty("display", "flex"), q.style.setProperty("gap", "4px"), q.style.setProperty("margin-left", "auto"), q.style.setProperty("align-items", "center"), _(q, L(H, {
      get when() {
        return e.showOrderToolsMenu;
      },
      get children() {
        const g = Al.cloneNode(!0), t1 = g.firstChild, S = t1.firstChild, Y = S.nextSibling;
        return F1((j) => {
          n = j;
        }, g), g.style.setProperty("display", "flex"), g.style.setProperty("align-items", "center"), t1.$$click = (j) => {
          j.stopPropagation(), _1();
        }, t1.style.setProperty("gap", "6px"), Y.style.setProperty("transition", "transform 0.2s ease"), _(g, L(H, {
          get when() {
            return h();
          },
          get children() {
            return L(i5, {
              get mount() {
                return E();
              },
              get children() {
                const j = kl.cloneNode(!0), d1 = j.firstChild, g1 = d1.firstChild, O1 = g1.firstChild, b1 = d1.nextSibling, L1 = b1.nextSibling, k1 = L1.firstChild, A1 = k1.firstChild, Ce = L1.nextSibling, R1 = Ce.nextSibling, ie = R1.firstChild, H1 = ie.firstChild, ye = R1.nextSibling, o1 = ye.nextSibling, h1 = o1.firstChild, fe = h1.firstChild;
                return j.$$mousedown = (I) => I.stopPropagation(), F1((I) => {
                  r = I;
                }, j), j.style.setProperty("position", "fixed"), j.style.setProperty("z-index", "9999"), O1.addEventListener("change", (I) => {
                  var r1;
                  (r1 = e.onOrderToolsStateChange) == null || r1.call(e, {
                    quickOrder: I.currentTarget.checked
                  });
                }), A1.addEventListener("change", (I) => {
                  var r1;
                  (r1 = e.onOrderToolsStateChange) == null || r1.call(e, {
                    openOrders: I.currentTarget.checked
                  });
                }), H1.addEventListener("change", (I) => {
                  var r1;
                  (r1 = e.onOrderToolsStateChange) == null || r1.call(e, {
                    positions: I.currentTarget.checked
                  });
                }), fe.addEventListener("change", (I) => {
                  var r1;
                  (r1 = e.onOrderToolsStateChange) == null || r1.call(e, {
                    orderHistory: I.currentTarget.checked
                  });
                }), Q((I) => {
                  const r1 = `${d().top}px`, w1 = `${d().left}px`, ge = `${d().minWidth}px`;
                  return r1 !== I._v$ && j.style.setProperty("top", I._v$ = r1), w1 !== I._v$2 && j.style.setProperty("left", I._v$2 = w1), ge !== I._v$3 && j.style.setProperty("width", I._v$3 = ge), I;
                }, {
                  _v$: void 0,
                  _v$2: void 0,
                  _v$3: void 0
                }), Q(() => {
                  var I;
                  return O1.checked = ((I = e.orderToolsState) == null ? void 0 : I.quickOrder) ?? !0;
                }), Q(() => {
                  var I;
                  return A1.checked = ((I = e.orderToolsState) == null ? void 0 : I.openOrders) ?? !0;
                }), Q(() => {
                  var I;
                  return H1.checked = ((I = e.orderToolsState) == null ? void 0 : I.positions) ?? !0;
                }), Q(() => {
                  var I;
                  return fe.checked = ((I = e.orderToolsState) == null ? void 0 : I.orderHistory) ?? !0;
                }), j;
              }
            });
          }
        }), null), Q((j) => {
          const d1 = a() ? "0 8px" : "0 10px", g1 = h() ? "rotate(180deg)" : "rotate(0deg)";
          return d1 !== j._v$4 && t1.style.setProperty("padding", j._v$4 = d1), g1 !== j._v$5 && Y.style.setProperty("transform", j._v$5 = g1), j;
        }, {
          _v$4: void 0,
          _v$5: void 0
        }), g;
      }
    }), $1), _(q, L(H, {
      get when() {
        return !a();
      },
      get children() {
        return [(() => {
          const g = wl.cloneNode(!0);
          return P1(g, "click", e.onTimezoneClick, !0), g;
        })(), (() => {
          const g = Ml.cloneNode(!0);
          return P1(g, "click", e.onSettingClick, !0), g;
        })()];
      }
    }), $1), _(q, L(H, {
      get when() {
        return !a();
      },
      get children() {
        const g = Sl.cloneNode(!0);
        return P1(g, "click", e.onScreenshotClick, !0), g;
      }
    }), $1), $1.$$click = () => {
      if (A())
        (document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen).call(document);
      else {
        const g = t == null ? void 0 : t.closest(".klinecharts-pro");
        g && ((g == null ? void 0 : g.requestFullscreen) ?? (g == null ? void 0 : g.webkitRequestFullscreen) ?? (g == null ? void 0 : g.mozRequestFullScreen) ?? (g == null ? void 0 : g.msRequestFullscreen)).call(g);
      }
    }, _($1, (() => {
      const g = V(() => !!A());
      return () => g() ? Ol.cloneNode(!0) : Nl.cloneNode(!0);
    })()), _(D, L(H, {
      get when() {
        return V(() => !!a())() && P();
      },
      get children() {
        const g = Tl.cloneNode(!0);
        return g.$$click = () => t.scrollBy({
          left: 100,
          behavior: "smooth"
        }), g.style.setProperty("position", "absolute"), g.style.setProperty("right", "0"), g.style.setProperty("top", "0"), g.style.setProperty("bottom", "1px"), g.style.setProperty("width", "30px"), g.style.setProperty("display", "flex"), g.style.setProperty("align-items", "center"), g.style.setProperty("justify-content", "center"), g.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), g.style.setProperty("z-index", "10"), g.style.setProperty("cursor", "pointer"), g.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), g;
      }
    }), null), Q((g) => {
      const t1 = a() ? "auto" : "visible", S = e.spread ? "" : "rotate", Y = A() ? "0px" : "var(--klinecharts-pro-period-bar-padding-right)";
      return t1 !== g._v$6 && Z.style.setProperty("overflow", g._v$6 = t1), S !== g._v$7 && y1(l1, "class", g._v$7 = S), Y !== g._v$8 && q.style.setProperty("padding-right", g._v$8 = Y), g;
    }, {
      _v$6: void 0,
      _v$7: void 0,
      _v$8: void 0
    }), D;
  })();
};
v1(["click", "mousedown"]);
const El = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M12.41465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L12.41465,12C12.20873,12.5826,11.65311,13,11,13C10.34689,13,9.79127,12.5826,9.58535,12L3.5,12C3.223857,12,3,11.77614,3,11.5C3,11.22386,3.223857,11,3.5,11L9.58535,11C9.79127,10.417404,10.34689,10,11,10C11.65311,10,12.20873,10.417404,12.41465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), Bl = () => El.cloneNode(!0), Ul = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,11L11.08535,11C11.29127,10.417404,11.84689,10,12.5,10C13.15311,10,13.70873,10.417404,13.91465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L13.91465,12C13.70873,12.5826,13.15311,13,12.5,13C11.84689,13,11.29127,12.5826,11.08535,12L6.91465,12C6.70873,12.5826,6.15311,13,5.5,13C4.671573,13,4,12.32843,4,11.5C4,10.671573,4.671573,10,5.5,10C6.15311,10,6.70873,10.417404,6.91465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), Fl = () => Ul.cloneNode(!0), Kl = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,12.5C6.70873,13.0826,6.15311,13.5,5.5,13.5C4.671573,13.5,4,12.82843,4,12C4,11.171573,4.671573,10.5,5.5,10.5C6.15311,10.5,6.70873,10.917404,6.91465,11.5L16.0853,11.5C16.2913,10.917404,16.846899999999998,10.5,17.5,10.5C18.328400000000002,10.5,19,11.171573,19,12C19,12.82843,18.328400000000002,13.5,17.5,13.5C16.846899999999998,13.5,16.2913,13.0826,16.0853,12.5L6.91465,12.5Z" stroke-opacity="0" stroke="none"></path></svg>'), jl = () => Kl.cloneNode(!0), zl = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,12.41465L11,18.5C11,18.7761,11.22386,19,11.5,19C11.77614,19,12,18.7761,12,18.5L12,12.41465C12.5826,12.20873,13,11.65311,13,11C13,10.34689,12.5826,9.79127,12,9.58535L12,3.5C12,3.223857,11.77614,3,11.5,3C11.22386,3,11,3.223857,11,3.5L11,9.58535C10.417404,9.79127,10,10.34689,10,11C10,11.65311,10.417404,12.20873,11,12.41465Z" stroke-opacity="0" stroke="none"></path></svg>'), Ql = () => zl.cloneNode(!0), Zl = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.66558837890625,19C10.83716137890625,19,10.16558837890625,18.328400000000002,10.16558837890625,17.5C10.16558837890625,16.846899999999998,10.58298437890625,16.2913,11.16557337890625,16.0854L11.16557337890625,11.91464C10.58298437890625,11.70872,10.16558837890625,11.1531,10.16558837890625,10.5C10.16558837890625,9.8469,10.58298437890625,9.29128,11.16557337890625,9.08536L11.16557337890625,4.5C11.16557337890625,4.223857,11.38942837890625,4,11.66556837890625,4C11.94171837890625,4,12.16556837890625,4.223857,12.16556837890625,4.5L12.16556837890625,9.08535C12.74817837890625,9.291260000000001,13.16558837890625,9.846879999999999,13.16558837890625,10.5C13.16558837890625,11.153120000000001,12.74817837890625,11.708739999999999,12.16556837890625,11.91465L12.16556837890625,16.0854C12.74817837890625,16.2913,13.16558837890625,16.846899999999998,13.16558837890625,17.5C13.16558837890625,18.328400000000002,12.49401837890625,19,11.66558837890625,19Z" stroke-opacity="0" stroke="none"></path></svg>'), Rl = () => Zl.cloneNode(!0), Hl = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.165603637695312,6.91465C11.748203637695312,6.70873,12.165603637695312,6.15311,12.165603637695312,5.5C12.165603637695312,4.671573,11.494033637695313,4,10.665603637695312,4C9.837176637695313,4,9.165603637695312,4.671573,9.165603637695312,5.5C9.165603637695312,6.15311,9.583007637695312,6.70873,10.165603637695312,6.91465L10.165603637695312,16.0854C9.583007637695312,16.2913,9.165603637695312,16.846899999999998,9.165603637695312,17.5C9.165603637695312,18.328400000000002,9.837176637695313,19,10.665603637695312,19C11.494033637695313,19,12.165603637695312,18.328400000000002,12.165603637695312,17.5C12.165603637695312,16.846899999999998,11.748203637695312,16.2913,11.165603637695312,16.0854L11.165603637695312,6.91465Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Vl = () => Hl.cloneNode(!0), Yl = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.146447,15.753C4.9511845,15.9483,4.9511845,16.2649,5.146447,16.4602C5.341709,16.6554,5.658291,16.6554,5.853554,16.4602L8.156600000000001,14.15711C8.352409999999999,14.25082,8.57173,14.3033,8.8033,14.3033C9.631730000000001,14.3033,10.3033,13.63172,10.3033,12.80329C10.3033,12.57172,10.250820000000001,12.352409999999999,10.157119999999999,12.15659L12.156600000000001,10.15711C12.352409999999999,10.250820000000001,12.571729999999999,10.30329,12.8033,10.30329C13.63173,10.30329,14.3033,9.63172,14.3033,8.80329C14.3033,8.57172,14.25082,8.352409999999999,14.15712,8.15659L16.4602,5.853553C16.6554,5.658291,16.6554,5.341709,16.4602,5.146447C16.2649,4.9511843,15.9483,4.9511843,15.753,5.146447L13.45001,7.449479999999999C13.25419,7.35577,13.03487,7.3032900000000005,12.8033,7.3032900000000005C11.97487,7.3032900000000005,11.3033,7.97487,11.3033,8.80329C11.3033,9.03487,11.35578,9.254190000000001,11.44949,9.450009999999999L9.450009999999999,11.449480000000001C9.254190000000001,11.35577,9.03487,11.30329,8.8033,11.30329C7.97487,11.30329,7.3033,11.97487,7.3033,12.80329C7.3033,13.03487,7.35578,13.25419,7.44949,13.45001L5.146447,15.753Z" stroke-opacity="0" stroke="none"></path></svg>'), Gl = () => Yl.cloneNode(!0), ql = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M7.573332939453125,14.54567903564453C7.667042939453125,14.741499035644532,7.719512939453125,14.960809035644532,7.719512939453125,15.19239903564453C7.719512939453125,16.02079903564453,7.047942939453125,16.69239903564453,6.219512939453125,16.69239903564453C5.391085939453125,16.69239903564453,4.719512939453125,16.02079903564453,4.719512939453125,15.19239903564453C4.719512939453125,14.36394903564453,5.391085939453125,13.692379035644532,6.219512939453125,13.692379035644532C6.451092939453125,13.692379035644532,6.670412939453125,13.74485903564453,6.866232939453125,13.83856903564453L9.865702939453126,10.83909903564453C9.771992939453124,10.643279035644532,9.719512939453125,10.42395903564453,9.719512939453125,10.192379035644532C9.719512939453125,9.36394903564453,10.391082939453124,8.692379035644532,11.219512939453125,8.692379035644532C11.451092939453126,8.692379035644532,11.670412939453126,8.74485903564453,11.866232939453125,8.838569035644532L15.462112939453124,5.242645035644531C15.657412939453126,5.047383335644532,15.974012939453125,5.047383335644532,16.169212939453125,5.242645035644531C16.364512939453125,5.437907035644531,16.364512939453125,5.754489035644531,16.169212939453125,5.949752035644531L12.573332939453124,9.545679035644532C12.667042939453125,9.74149903564453,12.719512939453125,9.96080903564453,12.719512939453125,10.192379035644532C12.719512939453125,11.020809035644533,12.047942939453126,11.692379035644532,11.219512939453125,11.692379035644532C10.987942939453125,11.692379035644532,10.768632939453125,11.639909035644532,10.572812939453126,11.54619903564453L7.573332939453125,14.54567903564453Z" stroke-opacity="0" stroke="none"></path></svg>'), Wl = () => ql.cloneNode(!0), Xl = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M15.719512939453125,8.461776733398438C16.547912939453127,8.461776733398438,17.219512939453125,7.7902067333984375,17.219512939453125,6.9617767333984375C17.219512939453125,6.133349733398438,16.547912939453127,5.4617767333984375,15.719512939453125,5.4617767333984375C14.891082939453124,5.4617767333984375,14.219512939453125,6.133349733398438,14.219512939453125,6.9617767333984375C14.219512939453125,7.193346733398437,14.271992939453124,7.412666733398438,14.365692939453124,7.608486733398438L7.366222939453126,14.607956733398437C7.170402939453125,14.514256733398437,6.951082939453125,14.461776733398438,6.719512939453125,14.461776733398438C5.891085939453125,14.461776733398438,5.219512939453125,15.133346733398437,5.219512939453125,15.961776733398438C5.219512939453125,16.79017673339844,5.891085939453125,17.461776733398438,6.719512939453125,17.461776733398438C7.547942939453125,17.461776733398438,8.219512939453125,16.79017673339844,8.219512939453125,15.961776733398438C8.219512939453125,15.730176733398437,8.167032939453126,15.510876733398437,8.073322939453124,15.315066733398437L15.072802939453124,8.315586733398437C15.268612939453124,8.409296733398438,15.487912939453125,8.461776733398438,15.719512939453125,8.461776733398438Z" stroke-opacity="0" stroke="none"></path></svg>'), Jl = () => Xl.cloneNode(!0), eu = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17.0643,7.033864912109375L18,3.585784912109375L14.5078,4.509695912109375L15.3537,5.344934912109375L6.02026,14.560584912109375C5.87635,14.517484912109374,5.72366,14.494284912109375,5.5655,14.494284912109375C4.7009,14.494284912109375,4,15.186384912109375,4,16.040084912109375C4,16.893784912109375,4.7009,17.585784912109375,5.5655,17.585784912109375C6.43011,17.585784912109375,7.13101,16.893784912109375,7.13101,16.040084912109375C7.13101,15.722284912109375,7.03392,15.426984912109376,6.86744,15.181384912109374L16.0917,6.073604912109375L17.0643,7.033864912109375Z" stroke-opacity="0" stroke="none"></path></svg>'), tu = () => eu.cloneNode(!0), nu = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,13.00505L18.5,13.00505C18.7761,13.00505,19,13.228909999999999,19,13.50505C19,13.781189999999999,18.7761,14.00505,18.5,14.00505L6.91465,14.00505C6.70873,14.58765,6.15311,15.00505,5.5,15.00505C4.671573,15.00505,4,14.33348,4,13.50505C4,12.67662,4.671573,12.00505,5.5,12.00505C6.15311,12.00505,6.70873,12.422450000000001,6.91465,13.00505ZM7.81404,11.625L10.48591,11.625L10.48591,10.90625L9.65193,10.90625L9.65193,7.125L8.997630000000001,7.125C8.71443,7.306641,8.415600000000001,7.419922,7.96443,7.498047L7.96443,8.05078L8.77497,8.05078L8.77497,10.90625L7.81404,10.90625L7.81404,11.625ZM11.081620000000001,11.625L14.0562,11.625L14.0562,10.88281L13.09724,10.88281C12.8863,10.88281,12.59333,10.90625,12.36482,10.93555C13.17537,10.11328,13.84724,9.2207,13.84724,8.39062C13.84724,7.541016,13.28865,7,12.4488,7C11.84333,7,11.446850000000001,7.234375,11.03279,7.679688L11.52497,8.16797C11.747630000000001,7.914062,12.0113,7.697266,12.33552,7.697266C12.7613,7.697266,13.00154,7.982422,13.00154,8.43359C13.00154,9.14648,12.29255,10.00781,11.081620000000001,11.11523L11.081620000000001,11.625ZM15.9605,11.75C16.8121,11.75,17.526899999999998,11.2832,17.526899999999998,10.4375C17.526899999999998,9.82031,17.142200000000003,9.43945,16.6441,9.30078L16.6441,9.27148C17.1129,9.08594,17.3824,8.7207,17.3824,8.21289C17.3824,7.421875,16.8004,7,15.9429,7C15.4215,7,14.9957,7.210938,14.6109,7.541016L15.066,8.11133C15.3258,7.849609,15.5836,7.697266,15.9019,7.697266C16.2789,7.697266,16.4957,7.914062,16.4957,8.28125C16.4957,8.70898,16.2301,9,15.4215,9L15.4215,9.63672C16.3804,9.63672,16.6383,9.91992,16.6383,10.38086C16.6383,10.79688,16.3336,11.03125,15.8824,11.03125C15.4742,11.03125,15.1578,10.82227,14.8922,10.55078L14.4781,11.13281C14.7906,11.486329999999999,15.2652,11.75,15.9605,11.75Z" stroke-opacity="0" stroke="none"></path></svg>'), ru = () => nu.cloneNode(!0), au = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.146447,14.178126025390625C2.9511847,13.982826025390626,2.9511847,13.666226025390625,3.146447,13.470926025390625L7.39146,9.225966025390626C7.35417,9.095106025390624,7.33421,8.956946025390625,7.33421,8.814116025390625C7.33421,7.985696025390625,8.00578,7.314116025390625,8.834209999999999,7.314116025390625C8.97703,7.314116025390625,9.11519,7.334086025390625,9.24605,7.371366025390625L13.753,2.864373025390625C13.9483,2.669110325390625,14.2649,2.669110325390625,14.4602,2.864373025390625C14.6554,3.059635025390625,14.6554,3.376217025390625,14.4602,3.571479025390625L10.06916,7.962476025390625C10.23631,8.204386025390626,10.334209999999999,8.497826025390625,10.334209999999999,8.814116025390625C10.334209999999999,9.642546025390626,9.66264,10.314116025390625,8.834209999999999,10.314116025390625C8.51791,10.314116025390625,8.22448,10.216226025390625,7.98256,10.049076025390626L3.853554,14.178126025390625C3.658291,14.373326025390625,3.341709,14.373326025390625,3.146447,14.178126025390625ZM7.67736,19.188526025390626C7.4821,18.993226025390626,7.4821,18.676626025390625,7.67736,18.481426025390626L9.9804,16.178326025390625C9.88669,15.982526025390625,9.834209999999999,15.763226025390624,9.834209999999999,15.531626025390626C9.834209999999999,14.703226025390626,10.50578,14.031626025390626,11.33421,14.031626025390626C11.56579,14.031626025390626,11.78511,14.084126025390624,11.98093,14.177826025390624L13.9804,12.178356025390626C13.8867,11.982536025390624,13.8342,11.763216025390625,13.8342,11.531636025390625C13.8342,10.703206025390624,14.5058,10.031636025390625,15.3342,10.031636025390625C15.5658,10.031636025390625,15.7851,10.084116025390625,15.9809,10.177826025390626L18.284,7.874796025390625C18.4792,7.679536025390625,18.7958,7.679536025390625,18.9911,7.874796025390625C19.1863,8.070056025390624,19.1863,8.386636025390626,18.9911,8.581906025390625L16.688000000000002,10.884936025390624C16.7817,11.080756025390626,16.8342,11.300066025390626,16.8342,11.531636025390625C16.8342,12.360066025390624,16.162599999999998,13.031626025390626,15.3342,13.031626025390626C15.1026,13.031626025390626,14.8833,12.979126025390626,14.6875,12.885426025390625L12.68803,14.884926025390625C12.78174,15.080726025390625,12.83421,15.300026025390626,12.83421,15.531626025390626C12.83421,16.360026025390624,12.16264,17.031626025390626,11.33421,17.031626025390626C11.10264,17.031626025390626,10.88333,16.979126025390627,10.68751,16.885426025390625L8.38446,19.188526025390626C8.1892,19.383726025390626,7.87262,19.383726025390626,7.67736,19.188526025390626Z" stroke-opacity="0" stroke="none"></path></svg>'), iu = () => au.cloneNode(!0), su = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.3367688759765626,12.63173C3.5320318759765623,12.82699,3.8486138759765627,12.82699,4.043876875976562,12.63173L11.822052875976562,4.853553C12.017312875976563,4.658291,12.017312875976563,4.341708,11.822052875976562,4.146446C11.626792875976562,3.9511843,11.310202875976563,3.9511843,11.114942875976563,4.146446L3.3367688759765626,11.92462C3.1415071759765625,12.11988,3.1415071759765625,12.43647,3.3367688759765626,12.63173ZM5.001492875976562,17.0351C4.806232875976562,16.8399,4.806232875976562,16.5233,5.001492875976562,16.328L7.304532875976562,14.025C7.210822875976563,13.82916,7.158352875976563,13.60984,7.158352875976563,13.37827C7.158352875976563,12.54984,7.829922875976562,11.87827,8.658352875976561,11.87827C8.889922875976563,11.87827,9.109232875976563,11.93075,9.305052875976562,12.02446L11.304532875976562,10.02498C11.210822875976563,9.82916,11.158352875976561,9.60984,11.158352875976561,9.37827C11.158352875976561,8.54984,11.829922875976562,7.8782700000000006,12.658352875976563,7.8782700000000006C12.889922875976563,7.8782700000000006,13.109232875976563,7.93075,13.305022875976562,8.024460000000001L15.608122875976562,5.72142C15.803322875976562,5.5261499999999995,16.119922875976563,5.5261499999999995,16.315222875976563,5.72142C16.510422875976563,5.9166799999999995,16.510422875976563,6.23326,16.315222875976563,6.42852L14.012122875976562,8.73156C14.105822875976562,8.92738,14.158322875976562,9.1467,14.158322875976562,9.37827C14.158322875976562,10.2067,13.486822875976562,10.87827,12.658352875976563,10.87827C12.426772875976562,10.87827,12.207452875976562,10.82579,12.011642875976563,10.73209L10.012162875976562,12.73156C10.105872875976562,12.92738,10.158352875976561,13.1467,10.158352875976561,13.37827C10.158352875976561,14.2067,9.486772875976563,14.8783,8.658352875976561,14.8783C8.426772875976562,14.8783,8.207452875976562,14.8258,8.011642875976563,14.7321L5.708602875976562,17.0351C5.513342875976562,17.2304,5.196752875976562,17.2304,5.001492875976562,17.0351ZM10.415712875976563,18.328C10.220452875976562,18.5233,9.903862875976563,18.5233,9.708602875976563,18.328C9.513342875976562,18.1328,9.513342875976562,17.816200000000002,9.708602875976563,17.6209L12.304532875976562,15.025C12.210822875976563,14.8292,12.158352875976563,14.6098,12.158352875976563,14.3783C12.158352875976563,13.54984,12.829922875976562,12.87827,13.658322875976562,12.87827C13.889922875976563,12.87827,14.109222875976563,12.93075,14.305022875976562,13.02446L17.486822875976564,9.84274C17.682022875976564,9.64747,17.99862287597656,9.64747,18.19392287597656,9.84274C18.38912287597656,10.038,18.38912287597656,10.35458,18.19392287597656,10.54984L15.012122875976562,13.73156C15.105822875976562,13.92738,15.158322875976562,14.1467,15.158322875976562,14.3783C15.158322875976562,15.2067,14.486822875976562,15.8783,13.658322875976562,15.8783C13.426822875976562,15.8783,13.207422875976562,15.8258,13.011642875976563,15.7321L10.415712875976563,18.328Z" stroke-opacity="0" stroke="none"></path></svg>'), ou = () => su.cloneNode(!0), cu = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M13.1889,6C12.98303,6.582599999999999,12.42741,7,11.7743,7C11.12119,7,10.565570000000001,6.582599999999999,10.35965,6L3.5,6C3.223857,6,3,5.77614,3,5.5C3,5.22386,3.223857,5,3.5,5L10.35965,5C10.565570000000001,4.417404,11.12119,4,11.7743,4C12.42741,4,12.98303,4.417404,13.1889,5L18.5,5C18.7761,5,19,5.22386,19,5.5C19,5.77614,18.7761,6,18.5,6L13.1889,6ZM3,8.5C3,8.22386,3.223857,8,3.5,8L18.5,8C18.7761,8,19,8.22386,19,8.5C19,8.77614,18.7761,9,18.5,9L3.5,9C3.223857,9,3,8.77614,3,8.5ZM3.278549,11.5C3.278549,11.22386,3.502407,11,3.778549,11L18.7785,11C19.0547,11,19.2785,11.22386,19.2785,11.5C19.2785,11.77614,19.0547,12,18.7785,12L3.778549,12C3.502407,12,3.278549,11.77614,3.278549,11.5ZM3.139267,14.5C3.139267,14.2239,3.363124,14,3.6392670000000003,14L18.6393,14C18.915399999999998,14,19.1393,14.2239,19.1393,14.5C19.1393,14.7761,18.915399999999998,15,18.6393,15L3.6392670000000003,15C3.363124,15,3.139267,14.7761,3.139267,14.5ZM13.1889,18C12.98303,18.5826,12.42741,19,11.7743,19C11.12119,19,10.565570000000001,18.5826,10.35965,18L3.778549,18C3.502407,18,3.278549,17.7761,3.278549,17.5C3.278549,17.2239,3.502407,17,3.778549,17L10.35965,17C10.565570000000001,16.4174,11.12119,16,11.7743,16C12.42741,16,12.98303,16.4174,13.1889,17L18.7785,17C19.0547,17,19.2785,17.2239,19.2785,17.5C19.2785,17.7761,19.0547,18,18.7785,18L13.1889,18Z" stroke-opacity="0" stroke="none"></path></svg>'), lu = () => cu.cloneNode(!0), uu = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4.91465,6C4.70873,6.582599999999999,4.15311,7,3.5,7C2.671573,7,2,6.32843,2,5.5C2,4.671573,2.671573,4,3.5,4C4.15311,4,4.70873,4.417404,4.91465,5L18.2257,5C18.5018,5,18.7257,5.22386,18.7257,5.5C18.7257,5.77614,18.5018,6,18.2257,6L4.91465,6ZM2.7257,8.5C2.7257,8.22386,2.949558,8,3.2257,8L18.2257,8C18.5018,8,18.7257,8.22386,18.7257,8.5C18.7257,8.77614,18.5018,9,18.2257,9L3.2257,9C2.949558,9,2.7257,8.77614,2.7257,8.5ZM3.00425,11.5C3.00425,11.22386,3.22811,11,3.50425,11L18.5042,11C18.7804,11,19.0042,11.22386,19.0042,11.5C19.0042,11.77614,18.7804,12,18.5042,12L3.50425,12C3.22811,12,3.00425,11.77614,3.00425,11.5ZM2.864967,14.5C2.864967,14.2239,3.08882,14,3.36497,14L18.365,14C18.6411,14,18.865,14.2239,18.865,14.5C18.865,14.7761,18.6411,15,18.365,15L3.36497,15C3.08882,15,2.864967,14.7761,2.864967,14.5ZM20,17.5C20,18.328400000000002,19.3284,19,18.5,19C17.846899999999998,19,17.2913,18.5826,17.0854,18L3.50425,18C3.22811,18,3.00425,17.7761,3.00425,17.5C3.00425,17.2239,3.22811,17,3.50425,17L17.0854,17C17.2913,16.4174,17.846899999999998,16,18.5,16C19.3284,16,20,16.671599999999998,20,17.5Z" stroke-opacity="0" stroke="none"></path></svg>'), du = () => uu.cloneNode(!0), hu = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="5" ry="5" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="3" ry="3" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse></svg>'), Cu = () => hu.cloneNode(!0), yu = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3,7.32468C5.90649,3.3893050000000002,11.49833,2.81306,14.6674,6.31944C14.9056,6.1554199999999994,15.192,6.05979,15.5,6.05979C15.845,6.05979,16.1628,6.17974,16.4162,6.381349999999999L18.4509,4.23827L19,4.816615L16.8945,7.03429C16.962600000000002,7.21075,17,7.40319,17,7.60463C17,8.45782,16.328400000000002,9.14947,15.5,9.14947C14.6716,9.14947,14,8.45782,14,7.60463C14,7.36402,14.0534,7.13625,14.1487,6.93322C11.32695,3.748365,6.25159,4.253956,3.612785,7.82695L3,7.32468ZM14.09,15.4717C15.7427,13.78985,16.244500000000002,11.524740000000001,15.5633,9.30134L15.5618,9.30134L16.3012,9.0502C17.072400000000002,11.56646,16.497700000000002,14.158,14.6282,16.0599C12.28737,18.442,8.62386,18.6988,6.41348,16.4501C4.5526,14.5572,4.52076,11.19671,6.36766,9.3177C7.89069,7.76754,10.07544,7.706189999999999,11.56741,9.22363C11.95453,9.61742,12.24817,10.08363,12.43369,10.57677L14.1451,8.77421L14.6942,9.35256L12.64982,11.50582C12.65827,11.59712,12.66295,11.68839,12.66378,11.77936C12.87398,12.04523,13,12.38451,13,12.7541C13,13.60729,12.32843,14.2989,11.5,14.2989C10.67157,14.2989,10,13.60729,10,12.7541C10,11.90091,10.67157,11.20926,11.5,11.20926C11.60387,11.20926,11.70528,11.220130000000001,11.8032,11.240829999999999L11.81763,11.22564C11.69858,10.71874,11.42858,10.21929,11.0284,9.81179C9.844000000000001,8.60765,8.136890000000001,8.65592,6.90822,9.90586C5.37975,11.460930000000001,5.40693,14.288,6.95404,15.8619C8.84598,17.7867,12.03496,17.5626,14.09,15.4717Z" stroke-opacity="0" stroke="none"></path></svg>'), fu = () => yu.cloneNode(!0), gu = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4,17.0854L4,3.5C4,3.223858,4.22386,3,4.5,3C4.77614,3,5,3.223858,5,3.5L5,10L7.57584,10L9.8127,4.46359C9.91614,4.20756,10.20756,4.08386,10.46359,4.1873000000000005C10.71963,4.29075,10.84333,4.58216,10.73988,4.8382000000000005L8.65438,10L11.08535,10C11.29127,9.4174,11.84689,9,12.5,9C12.65154,9,12.79784,9.02247,12.93573,9.06427L16.6464,5.35355C16.8417,5.15829,17.1583,5.15829,17.3536,5.35355C17.5488,5.54882,17.5488,5.8654,17.3536,6.06066L13.7475,9.66675C13.907,9.90508,14,10.19168,14,10.5C14,11.15311,13.5826,11.70873,13,11.91465L13,14.3638L18.3714,12.1936C18.6274,12.09015,18.918799999999997,12.21385,19.0222,12.46989C19.1257,12.72592,19.002,13.0173,18.746000000000002,13.1208L13,15.4423L13,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854ZM6.3729499999999994,17.0413L12,14.7678L12,11.91465C11.88136,11.87271,11.76956,11.81627,11.66675,11.74746L6.3729499999999994,17.0413ZM12,15.8463L6.6694700000000005,18L12,18L12,15.8463ZM6.38629,15.6137L8.250350000000001,11L11,11L6.38629,15.6137ZM5,11L7.17182,11L5,16.3754L5,11Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), mu = () => gu.cloneNode(!0), pu = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17,4.5C17,5.32843,16.328400000000002,6,15.5,6C15.0931,6,14.7241,5.83802,14.4539,5.57503L5.98992,8.32515C5.99658,8.38251,6,8.440850000000001,6,8.5C6,9.15311,5.582599999999999,9.70873,5,9.91465L5,11.08535C5.42621,11.236,5.763999999999999,11.57379,5.91465,12L19.5,12C19.7761,12,20,12.22386,20,12.5C20,12.77614,19.7761,13,19.5,13L5.91465,13C5.70873,13.5826,5.15311,14,4.5,14C3.671573,14,3,13.3284,3,12.5C3,11.84689,3.417404,11.29127,4,11.08535L4,9.91465C3.417404,9.70873,3,9.15311,3,8.5C3,7.67157,3.671573,7,4.5,7C4.90411,7,5.2709,7.15981,5.5406200000000005,7.41967L14.0093,4.66802C14.0032,4.6128599999999995,14,4.5568,14,4.5C14,3.671573,14.6716,3,15.5,3C16.328400000000002,3,17,3.671573,17,4.5ZM4,15.5C4,15.2239,4.22386,15,4.5,15L19.5,15C19.7761,15,20,15.2239,20,15.5C20,15.7761,19.7761,16,19.5,16L4.5,16C4.22386,16,4,15.7761,4,15.5ZM4,18.5C4,18.2239,4.22386,18,4.5,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L4.5,19C4.22386,19,4,18.7761,4,18.5Z" stroke-opacity="0" stroke="none"></path></svg>'), vu = () => pu.cloneNode(!0), _u = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M20,3.5C20,4.15311,19.5826,4.70873,19,4.91465L19,18.5C19,18.7761,18.7761,19,18.5,19L4.91465,19C4.70873,19.5826,4.15311,20,3.5,20C2.671573,20,2,19.3284,2,18.5C2,17.846899999999998,2.417404,17.2913,3,17.0854L3,3.5C3,3.22386,3.22386,3,3.5,3L17.0854,3C17.2913,2.417404,17.846899999999998,2,18.5,2C19.3284,2,20,2.671573,20,3.5ZM17.0854,4C17.236,4.42621,17.5738,4.763999999999999,18,4.91465L18,8L14,8L14,4L17.0854,4ZM13,4L13,8L9,8L9,4L13,4ZM13,9L9,9L9,13L13,13L13,9ZM13,14L9,14L9,18L13,18L13,14ZM14,18L14,14L18,14L18,18L14,18ZM18,13L14,13L14,9L18,9L18,13ZM4.91465,18C4.763999999999999,17.5738,4.42621,17.236,4,17.0854L4,14L8,14L8,18L4.91465,18ZM4,8L4,4L8,4L8,8L4,8ZM8,9L8,13L4,13L4,9L8,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), $u = () => _u.cloneNode(!0), bu = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" fill="none" stroke-opacity="1" stroke-width="1"></ellipse></svg>'), Lu = () => bu.cloneNode(!0), xu = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.57625,6.9981C11.55099,6.999359999999999,11.52557,7,11.5,7C11.34,7,11.18584,6.97495,11.04125,6.9285499999999995L5.55401,16.4327C5.713760000000001,16.5905,5.83826,16.7839,5.91465,17L16.0854,17C16.2187,16.622700000000002,16.4987,16.314700000000002,16.8569,16.1445L11.57625,6.9981ZM12.50759,6.611219999999999C12.81005,6.336790000000001,13,5.94058,13,5.5C13,4.671573,12.32843,4,11.5,4C10.67157,4,10,4.671573,10,5.5C10,5.80059,10.08841,6.08052,10.24066,6.31522L4.64514,16.0069C4.59738,16.002299999999998,4.54896,16,4.5,16C3.671573,16,3,16.671599999999998,3,17.5C3,18.328400000000002,3.671573,19,4.5,19C5.15311,19,5.70873,18.5826,5.91465,18L16.0854,18C16.2913,18.5826,16.846899999999998,19,17.5,19C18.328400000000002,19,19,18.328400000000002,19,17.5C19,16.8365,18.5691,16.2735,17.971899999999998,16.075699999999998L12.50759,6.611219999999999Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), ku = () => xu.cloneNode(!0), Au = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19,4.5C19,5.15311,18.5826,5.70873,18,5.91465L18,18.5C18,18.7761,17.7761,19,17.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854L4,4.5C4,4.22386,4.22386,4,4.5,4L16.0854,4C16.2913,3.417404,16.846899999999998,3,17.5,3C18.328400000000002,3,19,3.671573,19,4.5ZM5,5L16.0854,5C16.236,5.42621,16.5738,5.763999999999999,17,5.91465L17,18L5.91465,18C5.763999999999999,17.5738,5.42621,17.236,5,17.0854L5,5Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), wu = () => Au.cloneNode(!0), Mu = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19.6401,7.99355C20.4028,7.92291,21,7.2811900000000005,21,6.5C21,5.671573,20.3284,5,19.5,5C18.8469,5,18.2913,5.417404,18.0854,6L7.62067,6C7.34453,6,7.12067,6.22386,7.12067,6.5C7.12067,6.5479,7.12741,6.59423,7.13999,6.63809L3.2294099999999997,15.0243C2.530138,15.1517,2,15.764,2,16.5C2,17.328400000000002,2.671573,18,3.5,18C4.15311,18,4.70873,17.5826,4.91465,17L14.5963,17C14.6456,17.076,14.7162,17.1396,14.8044,17.1807C15.0546,17.2974,15.3521,17.1891,15.4688,16.9388L19.6401,7.99355ZM14.7896,16.0293L18.6551,7.739599999999999C18.3942,7.56144,18.1925,7.30307,18.0854,7L8.0746,7L4.25044,15.2009C4.55701,15.3784,4.79493,15.6613,4.91465,16L14.6207,16C14.68,16,14.7368,16.0103,14.7896,16.0293Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Su = () => Mu.cloneNode(!0), Tu = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.134443814697265,7.494615087890625L8.764323814697265,7.494615087890625L8.764323814697265,3.414215087890625L8.310223814697267,3.414215087890625L7.294603814697266,4.005035087890625L7.289713814697266,4.634915087890625L8.134443814697265,4.149892087890625L8.134443814697265,7.494615087890625ZM18.832003814697266,6.933095087890624Q19.004603814697266,6.635245087890625,19.004603814697266,6.2543850878906255Q19.004603814697266,5.884915087890625,18.845103814697264,5.593575087890625Q18.685503814697267,5.3006050878906255,18.399103814697266,5.136225087890625Q18.114303814697266,4.9702050878906245,17.754603814697266,4.9653250878906245L18.820603814697265,3.840647087890625L18.820603814697265,3.414215087890625L16.519203814697264,3.414215087890625L16.519203814697264,3.939931087890625L18.050803814697264,3.939931087890625L16.719403814697266,5.334785087890625L17.074203814697263,5.7205350878906245Q17.254903814697265,5.484525087890625,17.619503814697268,5.484525087890625Q17.980803814697268,5.484525087890625,18.187503814697266,5.689605087890625Q18.394203814697267,5.894685087890625,18.394203814697267,6.2543850878906255Q18.394203814697267,6.604315087890625,18.187503814697266,6.822415087890625Q17.980803814697268,7.0405150878906255,17.640603814697265,7.0405150878906255Q17.334603814697267,7.0405150878906255,17.124703814697266,6.890775087890625Q16.914703814697265,6.739415087890626,16.820303814697265,6.469225087890624L16.354803814697263,6.744295087890626Q16.480103814697266,7.125155087890625,16.821903814697265,7.341625087890625Q17.165403814697264,7.559725087890625,17.640603814697265,7.559725087890625Q18.039403814697266,7.559725087890625,18.348603814697267,7.393705087890625Q18.659503814697267,7.229315087890625,18.832003814697266,6.933095087890624ZM10.000003814697266,10.634915087890626C10.000003814697266,11.024655087890626,9.851363814697265,11.379685087890625,9.607683814697266,11.646395087890625L12.168903814697266,15.171615087890626C12.275403814697265,15.147615087890625,12.386203814697266,15.134915087890626,12.500003814697266,15.134915087890626C12.596503814697266,15.134915087890626,12.690803814697265,15.144015087890624,12.782303814697265,15.161415087890624L16.108803814697268,11.196955087890625C16.038703814697264,11.023375087890624,16.000003814697266,10.833655087890625,16.000003814697266,10.634915087890626C16.000003814697266,9.806495087890625,16.671603814697264,9.134915087890626,17.500003814697266,9.134915087890626C18.328403814697264,9.134915087890626,19.000003814697266,9.806495087890625,19.000003814697266,10.634915087890626C19.000003814697266,11.463345087890625,18.328403814697264,12.134915087890626,17.500003814697266,12.134915087890626C17.239503814697265,12.134915087890626,16.994503814697268,12.068495087890625,16.781003814697264,11.951675087890624L13.654703814697266,15.677415087890624C13.870303814697266,15.937215087890625,14.000003814697266,16.270915087890625,14.000003814697266,16.634915087890626C14.000003814697266,17.463315087890624,13.328403814697266,18.134915087890626,12.500003814697266,18.134915087890626C11.671573814697265,18.134915087890626,11.000003814697266,17.463315087890624,11.000003814697266,16.634915087890626C11.000003814697266,16.284415087890626,11.120193814697265,15.962015087890626,11.321603814697266,15.706715087890625L8.715393814697265,12.119565087890624C8.645053814697267,12.129685087890625,8.573143814697266,12.134915087890626,8.500003814697266,12.134915087890626C8.162103814697264,12.134915087890626,7.8503038146972655,12.023195087890626,7.599523814697266,11.834665087890626L4.505583814697266,15.521915087890624C4.809213814697266,15.796415087890624,5.000003814697266,16.193415087890624,5.000003814697266,16.634915087890626C5.000003814697266,17.463315087890624,4.328433814697266,18.134915087890626,3.5000038146972656,18.134915087890626C2.6715768146972656,18.134915087890626,2.0000038146972656,17.463315087890624,2.0000038146972656,16.634915087890626C2.0000038146972656,15.806515087890626,2.6715768146972656,15.134915087890626,3.5000038146972656,15.134915087890626C3.508253814697266,15.134915087890626,3.5164838146972657,15.135015087890626,3.524703814697266,15.135115087890625L7.033823814697266,10.953115087890625C7.011673814697265,10.850565087890626,7.000003814697266,10.744105087890624,7.000003814697266,10.634915087890626C7.000003814697266,9.806495087890625,7.671573814697266,9.134915087890626,8.500003814697266,9.134915087890626C9.328433814697267,9.134915087890626,10.000003814697266,9.806495087890625,10.000003814697266,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Pu = () => Tu.cloneNode(!0), Iu = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.13444,7.494615087890625L8.76432,7.494615087890625L8.76432,3.414215087890625L8.310220000000001,3.414215087890625L7.2946,4.005035087890625L7.28971,4.634915087890625L8.13444,4.149892087890625L8.13444,7.494615087890625ZM18.832,6.929835087890625Q19.0046,6.635245087890625,19.0046,6.2543850878906255Q19.0046,5.889805087890625,18.8451,5.5952050878906245Q18.6855,5.3006050878906255,18.3975,5.132965087890625Q18.1094,4.9653250878906245,17.7399,4.9653250878906245Q17.435499999999998,4.9653250878906245,17.1556,5.149245087890625L17.2793,3.939931087890625L18.8304,3.939931087890625L18.8304,3.414215087890625L16.7406,3.414215087890625L16.5094,5.665195087890625L17.0156,5.795405087890625Q17.095399999999998,5.655425087890626,17.2516,5.570795087890625Q17.4095,5.484525087890625,17.6357,5.484525087890625Q17.9694,5.484525087890625,18.1842,5.697745087890625Q18.4007,5.909335087890625,18.4007,6.2543850878906255Q18.4007,6.604315087890625,18.1842,6.822415087890625Q17.9694,7.0405150878906255,17.6292,7.0405150878906255Q17.3298,7.0405150878906255,17.119799999999998,6.890775087890625Q16.9098,6.739415087890626,16.825200000000002,6.474115087890625L16.3597,6.749175087890626Q16.470399999999998,7.110505087890624,16.807299999999998,7.335115087890625Q17.144199999999998,7.559725087890625,17.6292,7.559725087890625Q18.0296,7.559725087890625,18.3438,7.392075087890625Q18.6595,7.224435087890625,18.832,6.929835087890625ZM10,10.634915087890626C10,11.024655087890626,9.85136,11.379685087890625,9.60768,11.646395087890625L12.1689,15.171615087890626C12.2754,15.147615087890625,12.3862,15.134915087890626,12.5,15.134915087890626C12.5965,15.134915087890626,12.6908,15.144015087890624,12.7823,15.161415087890624L16.108800000000002,11.196955087890625C16.0387,11.023375087890624,16,10.833655087890625,16,10.634915087890626C16,9.806495087890625,16.671599999999998,9.134915087890626,17.5,9.134915087890626C18.3284,9.134915087890626,19,9.806495087890625,19,10.634915087890626C19,11.463345087890625,18.3284,12.134915087890626,17.5,12.134915087890626C17.2395,12.134915087890626,16.994500000000002,12.068505087890625,16.781,11.951675087890624L13.6547,15.677415087890624C13.8703,15.937215087890625,14,16.270915087890625,14,16.634915087890626C14,17.463315087890624,13.3284,18.134915087890626,12.5,18.134915087890626C11.67157,18.134915087890626,11,17.463315087890624,11,16.634915087890626C11,16.284415087890626,11.12019,15.962015087890626,11.3216,15.706715087890625L8.71539,12.119565087890624C8.645050000000001,12.129685087890625,8.57314,12.134915087890626,8.5,12.134915087890626C8.162099999999999,12.134915087890626,7.8503,12.023195087890626,7.59952,11.834665087890626L4.50558,15.521915087890624C4.80921,15.796415087890624,5,16.193415087890624,5,16.634915087890626C5,17.463315087890624,4.32843,18.134915087890626,3.5,18.134915087890626C2.671573,18.134915087890626,2,17.463315087890624,2,16.634915087890626C2,15.806515087890626,2.671573,15.134915087890626,3.5,15.134915087890626C3.5082500000000003,15.134915087890626,3.51648,15.135015087890626,3.5247,15.135115087890625L7.03382,10.953115087890625C7.01167,10.850565087890626,7,10.744105087890624,7,10.634915087890626C7,9.806495087890625,7.67157,9.134915087890626,8.5,9.134915087890626C9.32843,9.134915087890626,10,9.806495087890625,10,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Ou = () => Iu.cloneNode(!0), Nu = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M18.8532,7.020985087890625Q19.0257,6.734525087890625,19.0257,6.369945087890625Q19.0257,6.020005087890625,18.8499,5.754705087890625Q18.6758,5.489415087890626,18.3649,5.339675087890625Q18.5944,5.209465087890625,18.7214,4.994615087890625Q18.8499,4.779775087890625,18.8499,4.5193550878906255Q18.8499,4.2003480878906245,18.7002,3.951324087890625Q18.5505,3.700673087890625,18.277,3.557444087890625Q18.0052,3.414215087890625,17.6455,3.414215087890625Q17.285800000000002,3.414215087890625,17.0107,3.557444087890625Q16.7357,3.700673087890625,16.5843,3.951324087890625Q16.4346,4.2003480878906245,16.4346,4.5193550878906255Q16.4346,4.779775087890625,16.561500000000002,4.994615087890625Q16.6901,5.209465087890625,16.919600000000003,5.339675087890625Q16.6055,5.489415087890626,16.4297,5.757965087890625Q16.255499999999998,6.024895087890625,16.255499999999998,6.369945087890625Q16.255499999999998,6.734525087890625,16.4297,7.020985087890625Q16.6055,7.305815087890625,16.919600000000003,7.465325087890625Q17.2354,7.624825087890625,17.6455,7.624825087890625Q18.0557,7.624825087890625,18.3682,7.465325087890625Q18.6807,7.305815087890625,18.8532,7.020985087890625ZM8.76432,7.559725087890625L8.13444,7.559725087890625L8.13444,4.214996087890625L7.28971,4.700025087890625L7.2946,4.070139087890625L8.310220000000001,3.479319087890625L8.76432,3.479319087890625L8.76432,7.559725087890625ZM17.1816,4.955555087890625Q17.0042,4.784655087890625,17.0042,4.5095950878906255Q17.0042,4.229645087890625,17.18,4.057119087890625Q17.355800000000002,3.884592087890625,17.6455,3.884592087890625Q17.935200000000002,3.884592087890625,18.1077,4.057119087890625Q18.2803,4.229645087890625,18.2803,4.5095950878906255Q18.2803,4.784655087890625,18.1045,4.955555087890625Q17.930300000000003,5.124825087890625,17.6455,5.124825087890625Q17.3607,5.124825087890625,17.1816,4.955555087890625ZM18.2217,5.7953950878906255Q18.4398,6.005365087890625,18.4398,6.3552950878906245Q18.4398,6.705235087890625,18.2217,6.915195087890625Q18.0052,7.125155087890625,17.6455,7.125155087890625Q17.285800000000002,7.125155087890625,17.067700000000002,6.915195087890625Q16.849600000000002,6.705235087890625,16.849600000000002,6.3552950878906245Q16.849600000000002,6.005365087890625,17.064500000000002,5.7953950878906255Q17.2793,5.585435087890625,17.6455,5.585435087890625Q18.0052,5.585435087890625,18.2217,5.7953950878906255ZM9.60768,11.711495087890626C9.85136,11.444785087890626,10,11.089765087890626,10,10.700025087890625C10,9.871595087890626,9.32843,9.200025087890625,8.5,9.200025087890625C7.67157,9.200025087890625,7,9.871595087890626,7,10.700025087890625C7,10.809205087890625,7.01167,10.915665087890625,7.03382,11.018215087890624L3.5247,15.200215087890625C3.51648,15.200115087890625,3.5082500000000003,15.200015087890625,3.5,15.200015087890625C2.671573,15.200015087890625,2,15.871615087890625,2,16.700015087890627C2,17.528415087890625,2.671573,18.200015087890627,3.5,18.200015087890627C4.32843,18.200015087890627,5,17.528415087890625,5,16.700015087890627C5,16.258515087890625,4.80921,15.861515087890625,4.50558,15.587015087890626L7.59952,11.899765087890625C7.8503,12.088295087890625,8.162099999999999,12.200025087890625,8.5,12.200025087890625C8.57314,12.200025087890625,8.645050000000001,12.194785087890626,8.71539,12.184675087890625L11.3216,15.771815087890625C11.12019,16.027215087890625,11,16.349515087890623,11,16.700015087890627C11,17.528415087890625,11.67157,18.200015087890627,12.5,18.200015087890627C13.3284,18.200015087890627,14,17.528415087890625,14,16.700015087890627C14,16.336015087890623,13.8703,16.002315087890626,13.6547,15.742515087890625L16.781,12.016775087890625C16.994500000000002,12.133605087890626,17.2395,12.200025087890625,17.5,12.200025087890625C18.3284,12.200025087890625,19,11.528445087890624,19,10.700025087890625C19,9.871595087890626,18.3284,9.200025087890625,17.5,9.200025087890625C16.671599999999998,9.200025087890625,16,9.871595087890626,16,10.700025087890625C16,10.898765087890624,16.0387,11.088475087890625,16.108800000000002,11.262055087890625L12.7823,15.226515087890625C12.6908,15.209115087890625,12.5965,15.200015087890625,12.5,15.200015087890625C12.3862,15.200015087890625,12.2754,15.212715087890626,12.1689,15.236715087890625L9.60768,11.711495087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Du = () => Nu.cloneNode(!0), Eu = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M9.474616630859375,7.494615087890625L8.844736630859375,7.494615087890625L8.844736630859375,4.149892087890625L8.000006630859374,4.634915087890625L8.004896630859374,4.005035087890625L9.020516630859376,3.414215087890625L9.474616630859375,3.414215087890625L9.474616630859375,7.494615087890625ZM18.529296630859378,4.8318550878906255Q18.307996630859375,5.028795087890625,18.122396630859377,5.385245087890625Q17.868496630859376,5.019035087890625,17.629196630859376,4.8269750878906255Q17.389996630859375,4.634915087890625,17.168596630859376,4.634915087890625Q16.794296630859375,4.634915087890625,16.522496630859376,4.976715087890625Q16.252296630859377,5.3168850878906255,16.252296630859377,5.7856350878906255Q16.252296630859377,6.218575087890625,16.502896630859375,6.521315087890625Q16.755196630859373,6.822415087890625,17.114896630859377,6.822415087890625Q17.368796630859375,6.822415087890625,17.588596630859374,6.625475087890624Q17.809896630859377,6.428535087890625,17.998696630859374,6.0688350878906245Q18.249396630859373,6.439935087890625,18.488596630859377,6.631985087890625Q18.727896630859377,6.822415087890625,18.952496630859375,6.822415087890625Q19.326796630859373,6.822415087890625,19.596996630859376,6.482245087890625Q19.868796630859375,6.140455087890626,19.868796630859375,5.671705087890626Q19.868796630859375,5.238755087890625,19.618196630859376,4.937655087890625Q19.367496630859375,4.634915087890625,19.006196630859375,4.634915087890625Q18.750696630859377,4.634915087890625,18.529296630859378,4.8318550878906255ZM18.337296630859377,5.674955087890625L18.278696630859375,5.596835087890625Q18.449596630859375,5.272935087890625,18.622096630859374,5.1101750878906245Q18.794596630859374,4.947415087890625,18.967096630859373,4.947415087890625Q19.194996630859375,4.947415087890625,19.346396630859374,5.1345950878906255Q19.497696630859377,5.320135087890625,19.497696630859377,5.598455087890625Q19.497696630859377,5.8914250878906245,19.360996630859376,6.096505087890625Q19.224296630859374,6.301585087890626,19.027396630859375,6.301585087890626Q18.915096630859374,6.301585087890626,18.742496630859375,6.146965087890624Q18.569996630859375,5.992335087890625,18.337296630859377,5.674955087890625ZM17.785496630859377,5.779125087890625L17.842496630859372,5.857245087890625Q17.668296630859373,6.186025087890625,17.495796630859374,6.348785087890625Q17.324896630859374,6.509915087890625,17.153996630859375,6.509915087890625Q16.926096630859377,6.509915087890625,16.774796630859377,6.324375087890624Q16.623396630859375,6.137195087890625,16.623396630859375,5.858875087890625Q16.623396630859375,5.565905087890625,16.761696630859376,5.360825087890625Q16.900096630859373,5.1557550878906255,17.095396630859376,5.1557550878906255Q17.228896630859374,5.1557550878906255,17.365596630859375,5.2778250878906245Q17.502296630859377,5.399895087890625,17.785496630859377,5.779125087890625ZM10.710296630859375,10.634915087890626C10.710296630859375,11.024655087890626,10.561656630859375,11.379685087890625,10.317976630859375,11.646395087890625L12.879196630859376,15.171615087890626C12.985696630859374,15.147615087890625,13.096496630859376,15.134915087890626,13.210296630859375,15.134915087890626C13.306796630859376,15.134915087890626,13.401096630859374,15.144015087890624,13.492596630859374,15.161415087890624L16.819096630859377,11.196955087890625C16.748996630859374,11.023375087890624,16.710296630859375,10.833655087890625,16.710296630859375,10.634915087890626C16.710296630859375,9.806495087890625,17.381896630859373,9.134915087890626,18.210296630859375,9.134915087890626C19.038696630859373,9.134915087890626,19.710296630859375,9.806495087890625,19.710296630859375,10.634915087890626C19.710296630859375,11.463345087890625,19.038696630859373,12.134915087890626,18.210296630859375,12.134915087890626C17.949796630859375,12.134915087890626,17.704796630859377,12.068505087890625,17.491296630859374,11.951675087890624L14.364996630859375,15.677415087890624C14.580596630859375,15.937215087890625,14.710296630859375,16.270915087890625,14.710296630859375,16.634915087890626C14.710296630859375,17.463315087890624,14.038696630859375,18.134915087890626,13.210296630859375,18.134915087890626C12.381866630859374,18.134915087890626,11.710296630859375,17.463315087890624,11.710296630859375,16.634915087890626C11.710296630859375,16.284415087890626,11.830486630859374,15.962015087890626,12.031896630859375,15.706715087890625L9.425686630859374,12.119565087890624C9.355346630859376,12.129685087890625,9.283436630859375,12.134915087890626,9.210296630859375,12.134915087890626C8.872396630859374,12.134915087890626,8.560596630859376,12.023195087890626,8.309816630859375,11.834665087890626L5.215876630859375,15.521915087890624C5.519506630859375,15.796415087890624,5.710296630859375,16.193415087890624,5.710296630859375,16.634915087890626C5.710296630859375,17.463315087890624,5.038726630859375,18.134915087890626,4.210296630859375,18.134915087890626C3.381869630859375,18.134915087890626,2.710296630859375,17.463315087890624,2.710296630859375,16.634915087890626C2.710296630859375,15.806515087890626,3.381869630859375,15.134915087890626,4.210296630859375,15.134915087890626C4.218546630859375,15.134915087890626,4.226776630859375,15.135015087890626,4.234996630859375,15.135115087890625L7.744116630859375,10.953115087890625C7.721966630859375,10.850565087890626,7.710296630859375,10.744105087890624,7.710296630859375,10.634915087890626C7.710296630859375,9.806495087890625,8.381866630859374,9.134915087890626,9.210296630859375,9.134915087890626C10.038726630859376,9.134915087890626,10.710296630859375,9.806495087890625,10.710296630859375,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Bu = () => Eu.cloneNode(!0), Uu = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M21,5.5C21,6.32843,20.3284,7,19.5,7C19.4136,7,19.3289,6.99269,19.2465,6.97866L15.6257,15.5086C15.8587,15.7729,16,16.119999999999997,16,16.5C16,17.328400000000002,15.3284,18,14.5,18C13.8469,18,13.2913,17.5826,13.0854,17L3.91465,17C3.70873,17.5826,3.15311,18,2.5,18C1.671573,18,1,17.328400000000002,1,16.5C1,15.6716,1.671573,15,2.5,15C2.5840199999999998,15,2.66643,15.0069,2.74668,15.0202L6.36934,6.48574C6.13933,6.22213,6,5.87733,6,5.5C6,4.671573,6.67157,4,7.5,4C8.15311,4,8.70873,4.417404,8.91465,5L18.0854,5C18.2913,4.417404,18.8469,4,19.5,4C20.3284,4,21,4.671573,21,5.5ZM18.0854,6L8.91465,6C8.892579999999999,6.06243,8.8665,6.12296,8.83672,6.18128L13.9814,15.0921C14.143,15.0325,14.3177,15,14.5,15C14.584,15,14.6664,15.0069,14.7467,15.0202L18.3693,6.48574C18.2462,6.3446,18.149,6.1802,18.0854,6ZM13.2036,15.745L8.0861,6.8811800000000005C7.90605,6.95768,7.70797,7,7.5,7C7.41359,7,7.32888,6.99269,7.24647,6.97866L3.62571,15.5086C3.7512,15.651,3.8501,15.8174,3.91465,16L13.0854,16C13.1169,15.9108,13.1566,15.8255,13.2036,15.745Z" stroke-opacity="0" stroke="none"></path></svg>'), Fu = () => Uu.cloneNode(!0), Ku = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.92159,5.93994C6.04014,5.90529,6.152620000000001,5.85639,6.25704,5.79523L9.12729,9.89437C9.045449999999999,10.07959,9,10.28449,9,10.5C9,10.79522,9.08529,11.07053,9.232569999999999,11.30262L4.97573,16.7511L5.92159,5.93994ZM4.92259,5.8848400000000005C4.38078,5.658659999999999,4,5.1238,4,4.5C4,3.671573,4.67157,3,5.5,3C6.2157,3,6.81433,3.50124,6.96399,4.17183L15.1309,4.88634C15.3654,4.36387,15.8902,4,16.5,4C17.328400000000002,4,18,4.67157,18,5.5C18,6.08983,17.659599999999998,6.60015,17.1645,6.84518L18.4264,14.0018C18.4508,14.0006,18.4753,14,18.5,14C19.3284,14,20,14.6716,20,15.5C20,16.328400000000002,19.3284,17,18.5,17C17.932499999999997,17,17.4386,16.6849,17.183799999999998,16.22L5.99686,18.5979C5.946429999999999,19.3807,5.29554,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.869300000000003,3.389292,17.3295,3.94071,17.1077L4.92259,5.8848400000000005ZM5.72452,17.6334C5.69799,17.596,5.6698,17.5599,5.64004,17.525100000000002L10.01843,11.92103C10.16958,11.97223,10.33155,12,10.5,12C10.80059,12,11.08052,11.91158,11.31522,11.75934L17.0606,15.0765C17.0457,15.1271,17.0335,15.1789,17.023899999999998,15.2317L5.72452,17.6334ZM11.92855,10.95875L17.4349,14.1379L16.1699,6.96356C15.9874,6.92257,15.8174,6.8483,15.6667,6.74746L11.99771,10.4165C11.99923,10.44414,12,10.47198,12,10.5C12,10.66,11.97495,10.814160000000001,11.92855,10.95875ZM10.5,9C10.259830000000001,9,10.03285,9.05644,9.83159,9.15679L7.04919,5.1831L15.0493,5.88302C15.054,5.90072,15.059,5.91829,15.0643,5.9357299999999995L11.56066,9.43934C11.28921,9.16789,10.91421,9,10.5,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), ju = () => Ku.cloneNode(!0), zu = /* @__PURE__ */ p('<svg viewBox="0 0 22 22"><path d="M4.727219638671875,8.007996215820313L9.973849638671876,2.7629472158203123C10.167279638671875,2.5696791158203123,10.480729638671875,2.5696791158203123,10.674169638671875,2.7629472158203123L13.223329638671874,5.311756215820313C13.416929638671874,5.505236215820313,13.416929638671874,5.8189862158203125,13.223329638671874,6.012466215820313L7.977129638671875,11.257906215820313C7.379859638671875,11.855176215820313,7.407609638671875,12.909396215820312,8.033809638671876,13.535596215820313C8.660409638671876,14.162596215820313,9.713849638671874,14.189996215820312,10.311129638671876,13.591896215820313L15.556929638671875,8.346066215820311C15.750429638671875,8.152526215820313,16.064229638671875,8.152526215820313,16.257629638671872,8.346066215820311L18.806529638671876,10.895266215820312C19.000029638671876,11.088746215820313,19.000029638671876,11.402496215820312,18.806529638671876,11.595976215820313L13.560629638671875,16.841796215820313C11.165619638671876,19.237196215820312,7.197149638671875,19.19919621582031,4.783499638671875,16.785496215820313C2.3698426386718747,14.371896215820312,2.331397638671875,10.403416215820313,4.727219638671875,8.007996215820313ZM12.172299638671875,5.662106215820312L10.323809638671875,3.8136162158203124L5.4287196386718755,8.709096215820313C3.422893638671875,10.714536215820312,3.4549956386718748,14.055196215820313,5.484999638671875,16.08479621582031C7.514609638671875,18.114796215820313,10.855289638671875,18.146496215820314,12.860719638671876,16.141096215820312L15.465629638671874,13.535796215820312L14.090929638671875,12.160756215820312L14.791629638671875,11.460436215820312L16.166229638671876,12.834996215820313L17.755829638671877,11.245226215820313L15.907729638671874,9.396736215820312L11.011839638671875,14.292596215820312C10.042809638671875,15.262396215820312,8.418249638671874,15.243796215820312,7.406019638671875,14.306496215820312L7.333099638671875,14.236296215820312C6.327599638671876,13.230796215820313,6.284009638671876,11.550396215820312,7.276419638671875,10.557586215820312L9.882199638671874,7.952026215820313L8.501079638671875,6.570906215820313L9.201789638671876,5.870186215820313L10.582939638671874,7.251336215820312L12.172299638671875,5.662106215820312Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Qu = (e) => (() => {
  const t = zu.cloneNode(!0);
  return y1(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), Zu = /* @__PURE__ */ p('<svg viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_615"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_615)"><path d="M19.672,3.0673368C19.4417,2.9354008,19.1463,3.00292252,18.9994,3.2210900000000002L17.4588,5.50622L16.743299999999998,3.781253L13.9915,7.4662L13.9618,7.51108C13.8339,7.72862,13.8936,8.005659999999999,14.1004,8.15391L14.1462,8.183430000000001C14.3683,8.308720000000001,14.6511,8.25001,14.8022,8.047229999999999L16.4907,5.78571L17.246299999999998,7.60713L19.8374,3.7635389999999997L19.8651,3.717088C19.9871,3.484615,19.9023,3.199273,19.672,3.0673368ZM4.79974,8.462530000000001L10.117740000000001,3.252975C10.31381,3.0610145,10.63152,3.0610145,10.82759,3.252975L13.4115,5.78453C13.6076,5.976710000000001,13.6076,6.28833,13.4115,6.4805L8.093869999999999,11.69045C7.48847,12.28368,7.51659,13.3308,8.151309999999999,13.9528C8.786439999999999,14.5755,9.85421,14.6027,10.45961,14.0087L15.7768,8.79831C15.9729,8.60609,16.2909,8.60609,16.487099999999998,8.79831L19.0705,11.33026C19.2667,11.52244,19.2667,11.83406,19.0705,12.02623L13.7533,17.2366C11.32572,19.6158,7.30328,19.578,4.85679,17.1807C2.410298,14.7834,2.371331,10.84174,4.79974,8.462530000000001ZM12.3461,6.1325199999999995L10.47246,4.29654L5.51079,9.15889C3.477674,11.15076,3.510214,14.4688,5.56784,16.4847C7.62506,18.500999999999998,11.01117,18.5325,13.0439,16.540599999999998L15.6842,13.9529L14.2908,12.58718L15.0011,11.89161L16.394399999999997,13.2569L18.0056,11.67786L16.1323,9.84188L11.16985,14.7046C10.18764,15.6679,8.540980000000001,15.6494,7.51498,14.7184L7.44107,14.6487C6.4219,13.65,6.37771,11.98096,7.38362,10.994869999999999L10.02485,8.40693L8.624939999999999,7.03516L9.335180000000001,6.33919L10.73512,7.71099L12.3461,6.1325199999999995Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), Ru = (e) => (() => {
  const t = Zu.cloneNode(!0);
  return y1(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), Hu = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,17C5.80945,17,3.667717,12.85,3.113386,11.575C2.9622047,11.2,2.9622047,10.8,3.113386,10.425C3.667717,9.15,5.80945,5,11,5C16.165399999999998,5,18.3323,9.15,18.8866,10.425C19.0378,10.8,19.0378,11.2,18.8866,11.575C18.3323,12.85,16.165399999999998,17,11,17ZM4.04567,10.8C3.995276,10.925,3.995276,11.05,4.04567,11.175C4.52441,12.325,6.43937,16,11,16C15.5606,16,17.4756,12.325,17.9543,11.2C18.0047,11.075,18.0047,10.95,17.9543,10.825C17.4756,9.675,15.5606,6,11,6C6.43937,6,4.52441,9.675,4.04567,10.8ZM11,13.5C9.61417,13.5,8.480319999999999,12.375,8.480319999999999,11C8.480319999999999,9.625,9.61417,8.5,11,8.5C12.38583,8.5,13.5197,9.625,13.5197,11C13.5197,12.375,12.38583,13.5,11,13.5ZM11,9.5C10.1685,9.5,9.48819,10.175,9.48819,11C9.48819,11.825,10.1685,12.5,11,12.5C11.8315,12.5,12.51181,11.825,12.51181,11C12.51181,10.175,11.8315,9.5,11,9.5Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), Vu = () => Hu.cloneNode(!0), Yu = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.80417,14.9887L4.62563,16.167299999999997C4.43037,16.3625,4.43037,16.6791,4.62563,16.8744C4.82089,17.0696,5.13748,17.0696,5.332739999999999,16.8744L6.62638,15.5807C7.75595,16.290100000000002,9.19328,16.7929,11,16.7929C16.165399999999998,16.7929,18.3323,12.64289,18.8866,11.36789C19.0378,10.99289,19.0378,10.59289,18.8866,10.21789C18.5549,9.45486,17.6456,7.66212,15.8617,6.34545L17.3536,4.853553C17.5488,4.658291,17.5488,4.341709,17.3536,4.146447C17.1583,3.9511845,16.8417,3.9511845,16.6464,4.146447L15.0014,5.7915399999999995C13.9314,5.1969,12.61166,4.792893,11,4.792893C5.80945,4.792893,3.667717,8.94289,3.113386,10.21789C2.9622049,10.59289,2.9622049,10.99289,3.113386,11.36789C3.424435,12.08333,4.2353000000000005,13.70399,5.80417,14.9887ZM7.36012,14.847C8.32327,15.4074,9.52286,15.7929,11,15.7929C15.5606,15.7929,17.4756,12.11789,17.9543,10.99289C18.0047,10.86789,18.0047,10.74289,17.9543,10.61789C17.659,9.90846,16.8171,8.23812,15.1447,7.06241L12.96929,9.23782C13.3134,9.66543,13.5197,10.20642,13.5197,10.79289C13.5197,12.16789,12.38583,13.29289,11,13.29289C10.41596,13.29289,9.87667,13.09308,9.44815,12.75896L7.36012,14.847ZM8.794609999999999,11.99829L6.520099999999999,14.2728C5.06905,13.12119,4.32057,11.628250000000001,4.04567,10.96789C3.995275,10.84289,3.995275,10.71789,4.04567,10.59289C4.52441,9.46789,6.43937,5.79289,11,5.79289C12.28868,5.79289,13.3661,6.086320000000001,14.2596,6.53329L12.19759,8.5953C11.84086,8.40257,11.43271,8.29289,11,8.29289C9.61417,8.29289,8.480319999999999,9.41789,8.480319999999999,10.79289C8.480319999999999,11.22918,8.594470000000001,11.64029,8.794609999999999,11.99829ZM10.16528,12.04183C10.404869999999999,12.20032,10.692070000000001,12.29289,11,12.29289C11.8315,12.29289,12.51181,11.61789,12.51181,10.79289C12.51181,10.48318,12.41593,10.194600000000001,12.25216,9.95494L10.16528,12.04183ZM11.43602,9.35687L9.55616,11.236740000000001C9.512,11.09633,9.48819,10.94724,9.48819,10.79289C9.48819,9.96789,10.1685,9.29289,11,9.29289C11.15142,9.29289,11.29782,9.31528,11.43602,9.35687Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Gu = () => Yu.cloneNode(!0), qu = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_625"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_625)"><path d="M14.5385,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807692,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.88462,4,14.5385,5.61538,14.5385,7.576919999999999L14.5385,9.76923ZM10.88461,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923L13.38462,9.76923L13.38462,7.576919999999999C13.38462,6.23077,12.26923,5.15385,10.88461,5.15385ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.038450000000001,12.07692,11.307680000000001,12.34615,11.307680000000001,12.65385L11.307680000000001,14.5769C11.307680000000001,14.8846,11.038450000000001,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), Wu = () => qu.cloneNode(!0), Xu = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_620"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_620)"><path d="M8.38461,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807693,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.46154,4,13.84615,4.961539,14.3462,6.423080000000001C14.4615,6.73077,14.3077,7.038460000000001,14,7.15385C13.69231,7.26923,13.38461,7.11538,13.26923,6.80769C12.92308,5.80769,11.96154,5.15385,10.88462,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.03846,12.07692,11.307690000000001,12.34615,11.307690000000001,12.65385L11.307690000000001,14.5769C11.307690000000001,14.8846,11.03846,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), Ju = () => Xu.cloneNode(!0), ed = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M16.966900000000003,8.67144C16.6669,8.67144,16.4247,8.91558,16.4247,9.21802L16.4247,16.631500000000003C16.4247,17.322,16.007199999999997,17.9068,15.5139,17.9068L13.93072,17.9068L13.93072,9.2162C13.93072,8.91741,13.68675,8.67144,13.38855,8.67144C13.09036,8.67144,12.84639,8.91741,12.84639,9.21802L12.84639,17.9068L10.151810000000001,17.9068L10.151810000000001,9.21802C10.151810000000001,8.91741,9.90783,8.67144,9.609639999999999,8.67144C9.31145,8.67144,9.06747,8.91741,9.06747,9.219850000000001L9.06747,17.9068L7.48614,17.9068C6.99277,17.9068,6.5753,17.322,6.5753,16.631500000000003L6.5753,9.21802C6.5753,8.91558,6.333130000000001,8.67144,6.03313,8.67144C5.73313,8.67144,5.49096,8.91558,5.49096,9.21802L5.49096,16.631500000000003C5.49096,17.9378,6.385540000000001,19,7.48614,19L15.512,19C16.6127,19,17.509,17.9378,17.509,16.631500000000003L17.509,9.21802C17.509,8.91558,17.2669,8.67144,16.966900000000003,8.67144ZM18.4578,6.21183L4.542169,6.21183C4.243976,6.21183,4,6.45779,4,6.75841C4,7.05903,4.243976,7.30499,4.542169,7.30499L18.4578,7.30499C18.756,7.30499,19,7.05903,19,6.75841C19,6.45779,18.756,6.21183,18.4578,6.21183ZM8.68072,5.10045L14.3193,5.10045C14.6175,5.10045,14.8614,4.852666,14.8614,4.550225C14.8614,4.247783,14.6175,4,14.3193,4L8.68072,4C8.38253,4,8.13855,4.247783,8.13855,4.550225C8.13855,4.852666,8.38253,5.10045,8.68072,5.10045Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), td = () => ed.cloneNode(!0), nd = {
  horizontalStraightLine: Bl,
  horizontalRayLine: Fl,
  horizontalSegment: jl,
  verticalStraightLine: Ql,
  verticalRayLine: Rl,
  verticalSegment: Vl,
  straightLine: Gl,
  rayLine: Wl,
  segment: Jl,
  arrow: tu,
  priceLine: ru,
  priceChannelLine: iu,
  parallelStraightLine: ou,
  fibonacciLine: lu,
  fibonacciSegment: du,
  fibonacciCircle: Cu,
  fibonacciSpiral: fu,
  fibonacciSpeedResistanceFan: mu,
  fibonacciExtension: vu,
  gannBox: $u,
  circle: Lu,
  triangle: ku,
  rect: wu,
  parallelogram: Su,
  threeWaves: Pu,
  fiveWaves: Ou,
  eightWaves: Du,
  anyWaves: Bu,
  abcd: Fu,
  xabcd: ju,
  weak_magnet: Qu,
  strong_magnet: Ru,
  lock: Wu,
  unlock: Ju,
  visible: Vu,
  invisible: Gu,
  remove: td
};
function rd(e) {
  return [
    { key: "horizontalStraightLine", text: i("horizontal_straight_line", e) },
    { key: "horizontalRayLine", text: i("horizontal_ray_line", e) },
    { key: "horizontalSegment", text: i("horizontal_segment", e) },
    { key: "verticalStraightLine", text: i("vertical_straight_line", e) },
    { key: "verticalRayLine", text: i("vertical_ray_line", e) },
    { key: "verticalSegment", text: i("vertical_segment", e) },
    { key: "straightLine", text: i("straight_line", e) },
    { key: "rayLine", text: i("ray_line", e) },
    { key: "segment", text: i("segment", e) },
    { key: "arrow", text: i("arrow", e) },
    { key: "priceLine", text: i("price_line", e) }
  ];
}
function ad(e) {
  return [
    { key: "priceChannelLine", text: i("price_channel_line", e) },
    { key: "parallelStraightLine", text: i("parallel_straight_line", e) }
  ];
}
function id(e) {
  return [
    { key: "circle", text: i("circle", e) },
    { key: "rect", text: i("rect", e) },
    { key: "parallelogram", text: i("parallelogram", e) },
    { key: "triangle", text: i("triangle", e) }
  ];
}
function sd(e) {
  return [
    { key: "fibonacciLine", text: i("fibonacci_line", e) },
    { key: "fibonacciSegment", text: i("fibonacci_segment", e) },
    { key: "fibonacciCircle", text: i("fibonacci_circle", e) },
    { key: "fibonacciSpiral", text: i("fibonacci_spiral", e) },
    { key: "fibonacciSpeedResistanceFan", text: i("fibonacci_speed_resistance_fan", e) },
    { key: "fibonacciExtension", text: i("fibonacci_extension", e) },
    { key: "gannBox", text: i("gann_box", e) }
  ];
}
function od(e) {
  return [
    { key: "xabcd", text: i("xabcd", e) },
    { key: "abcd", text: i("abcd", e) },
    { key: "threeWaves", text: i("three_waves", e) },
    { key: "fiveWaves", text: i("five_waves", e) },
    { key: "eightWaves", text: i("eight_waves", e) },
    { key: "anyWaves", text: i("any_waves", e) }
  ];
}
function cd(e) {
  return [
    { key: "weak_magnet", text: i("weak_magnet", e) },
    { key: "strong_magnet", text: i("strong_magnet", e) }
  ];
}
const p1 = (e) => nd[e.name](e.class), ld = /* @__PURE__ */ p('<div class="klinecharts-pro-drawing-bar"><span class="split-line"></span><div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div><div class="item"><span style="width:32px;height:32px"></span></div><div class="item"><span style="width:32px;height:32px"></span></div><span class="split-line"></span><div class="item"><span style="width:32px;height:32px"></span></div></div>'), ud = /* @__PURE__ */ p('<div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div>'), _t = /* @__PURE__ */ p('<li><span style="padding-left:8px"></span></li>'), $t = "drawing_tools", dd = (e) => {
  const [t, n] = w("horizontalStraightLine"), [r, a] = w("priceChannelLine"), [s, l] = w("circle"), [c, h] = w("fibonacciLine"), [m, d] = w("xabcd"), [$, v] = w("weak_magnet"), [A, T] = w("normal"), [E, O] = w(!1), [F, K] = w(!0), [P, B] = w(""), z = V(() => [{
    key: "singleLine",
    icon: t(),
    list: rd(e.locale),
    setter: n
  }, {
    key: "moreLine",
    icon: r(),
    list: ad(e.locale),
    setter: a
  }, {
    key: "polygon",
    icon: s(),
    list: id(e.locale),
    setter: l
  }, {
    key: "fibonacci",
    icon: c(),
    list: sd(e.locale),
    setter: h
  }, {
    key: "wave",
    icon: m(),
    list: od(e.locale),
    setter: d
  }]), _1 = V(() => cd(e.locale));
  return (() => {
    const i1 = ld.cloneNode(!0), f1 = i1.firstChild, N = f1.nextSibling, G = N.firstChild, R = G.nextSibling, D = R.firstChild, Z = N.nextSibling, u1 = Z.firstChild, l1 = Z.nextSibling, q = l1.firstChild, $1 = l1.nextSibling, g = $1.nextSibling, t1 = g.firstChild;
    return _(i1, () => z().map((S) => (() => {
      const Y = ud.cloneNode(!0), j = Y.firstChild, d1 = j.nextSibling, g1 = d1.firstChild;
      return Y.addEventListener("blur", () => {
        B("");
      }), j.$$click = () => {
        e.onDrawingItemClick({
          groupId: $t,
          name: S.icon,
          visible: F(),
          lock: E(),
          mode: A()
        });
      }, _(j, L(p1, {
        get name() {
          return S.icon;
        }
      })), d1.$$click = () => {
        S.key === P() ? B("") : B(S.key);
      }, _(Y, (() => {
        const O1 = V(() => S.key === P());
        return () => O1() && L(Ee, {
          class: "list",
          get children() {
            return S.list.map((b1) => (() => {
              const L1 = _t.cloneNode(!0), k1 = L1.firstChild;
              return L1.$$click = () => {
                S.setter(b1.key), e.onDrawingItemClick({
                  name: b1.key,
                  lock: E(),
                  mode: A()
                }), B("");
              }, _(L1, L(p1, {
                get name() {
                  return b1.key;
                }
              }), k1), _(k1, () => b1.text), L1;
            })());
          }
        });
      })(), null), Q(() => y1(g1, "class", S.key === P() ? "rotate" : "")), Y;
    })()), f1), N.addEventListener("blur", () => {
      B("");
    }), G.$$click = () => {
      let S = $();
      A() !== "normal" && (S = "normal"), T(S), e.onModeChange(S);
    }, _(G, (() => {
      const S = V(() => $() === "weak_magnet");
      return () => S() ? (() => {
        const Y = V(() => A() === "weak_magnet");
        return () => Y() ? L(p1, {
          name: "weak_magnet",
          class: "selected"
        }) : L(p1, {
          name: "weak_magnet"
        });
      })() : (() => {
        const Y = V(() => A() === "strong_magnet");
        return () => Y() ? L(p1, {
          name: "strong_magnet",
          class: "selected"
        }) : L(p1, {
          name: "strong_magnet"
        });
      })();
    })()), R.$$click = () => {
      P() === "mode" ? B("") : B("mode");
    }, _(N, (() => {
      const S = V(() => P() === "mode");
      return () => S() && L(Ee, {
        class: "list",
        get children() {
          return _1().map((Y) => (() => {
            const j = _t.cloneNode(!0), d1 = j.firstChild;
            return j.$$click = () => {
              v(Y.key), T(Y.key), e.onModeChange(Y.key), B("");
            }, _(j, L(p1, {
              get name() {
                return Y.key;
              }
            }), d1), _(d1, () => Y.text), j;
          })());
        }
      });
    })(), null), u1.$$click = () => {
      const S = !E();
      O(S), e.onLockChange(S);
    }, _(u1, (() => {
      const S = V(() => !!E());
      return () => S() ? L(p1, {
        name: "lock"
      }) : L(p1, {
        name: "unlock"
      });
    })()), q.$$click = () => {
      const S = !F();
      K(S), e.onVisibleChange(S);
    }, _(q, (() => {
      const S = V(() => !!F());
      return () => S() ? L(p1, {
        name: "visible"
      }) : L(p1, {
        name: "invisible"
      });
    })()), t1.$$click = () => {
      e.onRemoveClick($t);
    }, _(t1, L(p1, {
      name: "remove"
    })), Q(() => y1(D, "class", P() === "mode" ? "rotate" : "")), i1;
  })();
};
v1(["click"]);
const bt = /* @__PURE__ */ p('<li class="title"></li>'), Lt = /* @__PURE__ */ p('<li class="row"></li>'), hd = (e) => L(Z1, {
  get title() {
    return i("indicator", e.locale);
  },
  width: 400,
  get onClose() {
    return e.onClose;
  },
  get children() {
    return L(Ee, {
      class: "klinecharts-pro-indicator-modal-list",
      get children() {
        return [(() => {
          const t = bt.cloneNode(!0);
          return _(t, () => i("main_indicator", e.locale)), t;
        })(), V(() => ["MA", "EMA", "SMA", "BOLL", "SAR", "BBI"].map((t) => {
          const n = e.mainIndicators.includes(t);
          return (() => {
            const r = Lt.cloneNode(!0);
            return r.$$click = (a) => {
              e.onMainIndicatorChange({
                name: t,
                paneId: "candle_pane",
                added: !n
              });
            }, _(r, L(vt, {
              checked: n,
              get label() {
                return i(t.toLowerCase(), e.locale);
              }
            })), r;
          })();
        })), (() => {
          const t = bt.cloneNode(!0);
          return _(t, () => i("sub_indicator", e.locale)), t;
        })(), V(() => ["MA", "EMA", "VOL", "MACD", "BOLL", "KDJ", "RSI", "BIAS", "BRAR", "CCI", "DMI", "CR", "PSY", "DMA", "TRIX", "OBV", "VR", "WR", "MTM", "EMV", "SAR", "SMA", "ROC", "PVT", "BBI", "AO"].map((t) => {
          const n = t in e.subIndicators;
          return (() => {
            const r = Lt.cloneNode(!0);
            return r.$$click = (a) => {
              e.onSubIndicatorChange({
                name: t,
                paneId: e.subIndicators[t] ?? "",
                added: !n
              });
            }, _(r, L(vt, {
              checked: n,
              get label() {
                return i(t.toLowerCase(), e.locale);
              }
            })), r;
          })();
        }))];
      }
    });
  }
});
v1(["click"]);
function xt(e, t) {
  switch (e) {
    case "Etc/UTC":
      return i("utc", t);
    case "Pacific/Midway":
      return i("midway", t);
    case "Pacific/Honolulu":
      return i("honolulu", t);
    case "America/Anchorage":
      return i("anchorage", t);
    case "America/Juneau":
      return i("juneau", t);
    case "America/Los_Angeles":
      return i("los_angeles", t);
    case "America/Vancouver":
      return i("vancouver", t);
    case "America/Tijuana":
      return i("tijuana", t);
    case "America/Phoenix":
      return i("phoenix", t);
    case "America/Denver":
      return i("denver", t);
    case "America/Chicago":
      return i("chicago", t);
    case "America/Mexico_City":
      return i("mexico_city", t);
    case "America/Guatemala":
      return i("guatemala", t);
    case "America/New_York":
      return i("new_york", t);
    case "America/Toronto":
      return i("toronto", t);
    case "America/Bogota":
      return i("bogota", t);
    case "America/Lima":
      return i("lima", t);
    case "America/Caracas":
      return i("caracas", t);
    case "America/Halifax":
      return i("halifax", t);
    case "America/Santiago":
      return i("santiago", t);
    case "America/La_Paz":
      return i("la_paz", t);
    case "America/Sao_Paulo":
      return i("sao_paulo", t);
    case "America/Buenos_Aires":
      return i("buenos_aires", t);
    case "America/Montevideo":
      return i("montevideo", t);
    case "America/Godthab":
      return i("godthab", t);
    case "Atlantic/Azores":
      return i("azores", t);
    case "Atlantic/Cape_Verde":
      return i("cape_verde", t);
    case "Europe/London":
      return i("london", t);
    case "Europe/Dublin":
      return i("dublin", t);
    case "Europe/Lisbon":
      return i("lisbon", t);
    case "Africa/Casablanca":
      return i("casablanca", t);
    case "Europe/Paris":
      return i("paris", t);
    case "Europe/Berlin":
      return i("berlin", t);
    case "Europe/Amsterdam":
      return i("amsterdam", t);
    case "Europe/Brussels":
      return i("brussels", t);
    case "Europe/Madrid":
      return i("madrid", t);
    case "Europe/Rome":
      return i("rome", t);
    case "Europe/Vienna":
      return i("vienna", t);
    case "Europe/Warsaw":
      return i("warsaw", t);
    case "Africa/Lagos":
      return i("lagos", t);
    case "Europe/Athens":
      return i("athens", t);
    case "Europe/Bucharest":
      return i("bucharest", t);
    case "Europe/Helsinki":
      return i("helsinki", t);
    case "Europe/Istanbul":
      return i("istanbul", t);
    case "Europe/Kiev":
      return i("kiev", t);
    case "Africa/Cairo":
      return i("cairo", t);
    case "Africa/Johannesburg":
      return i("johannesburg", t);
    case "Asia/Jerusalem":
      return i("jerusalem", t);
    case "Europe/Moscow":
      return i("moscow", t);
    case "Asia/Baghdad":
      return i("baghdad", t);
    case "Asia/Kuwait":
      return i("kuwait", t);
    case "Asia/Riyadh":
      return i("riyadh", t);
    case "Asia/Bahrain":
      return i("bahrain", t);
    case "Africa/Nairobi":
      return i("nairobi", t);
    case "Asia/Tehran":
      return i("tehran", t);
    case "Asia/Dubai":
      return i("dubai", t);
    case "Asia/Muscat":
      return i("muscat", t);
    case "Asia/Baku":
      return i("baku", t);
    case "Asia/Kabul":
      return i("kabul", t);
    case "Asia/Karachi":
      return i("karachi", t);
    case "Asia/Tashkent":
      return i("tashkent", t);
    case "Asia/Ashkhabad":
      return i("ashkhabad", t);
    case "Asia/Kolkata":
      return i("kolkata", t);
    case "Asia/Mumbai":
      return i("mumbai", t);
    case "Asia/Colombo":
      return i("colombo", t);
    case "Asia/Kathmandu":
      return i("kathmandu", t);
    case "Asia/Dhaka":
      return i("dhaka", t);
    case "Asia/Almaty":
      return i("almaty", t);
    case "Asia/Yangon":
      return i("yangon", t);
    case "Asia/Bangkok":
      return i("bangkok", t);
    case "Asia/Jakarta":
      return i("jakarta", t);
    case "Asia/Ho_Chi_Minh":
      return i("ho_chi_minh", t);
    case "Asia/Shanghai":
      return i("shanghai", t);
    case "Asia/Hong_Kong":
      return i("hong_kong", t);
    case "Asia/Singapore":
      return i("singapore", t);
    case "Asia/Taipei":
      return i("taipei", t);
    case "Asia/Manila":
      return i("manila", t);
    case "Asia/Kuala_Lumpur":
      return i("kuala_lumpur", t);
    case "Australia/Perth":
      return i("perth", t);
    case "Asia/Tokyo":
      return i("tokyo", t);
    case "Asia/Seoul":
      return i("seoul", t);
    case "Asia/Pyongyang":
      return i("pyongyang", t);
    case "Australia/Adelaide":
      return i("adelaide", t);
    case "Australia/Darwin":
      return i("darwin", t);
    case "Australia/Brisbane":
      return i("brisbane", t);
    case "Australia/Sydney":
      return i("sydney", t);
    case "Australia/Melbourne":
      return i("melbourne", t);
    case "Pacific/Guam":
      return i("guam", t);
    case "Pacific/Port_Moresby":
      return i("port_moresby", t);
    case "Pacific/Norfolk":
      return i("norfolk", t);
    case "Pacific/Guadalcanal":
      return i("guadalcanal", t);
    case "Pacific/Auckland":
      return i("auckland", t);
    case "Pacific/Fiji":
      return i("fiji", t);
    case "Pacific/Tongatapu":
      return i("tongatapu", t);
    case "Pacific/Apia":
      return i("apia", t);
    case "Asia/Karachi":
      return i("karachi", t);
  }
  return e;
}
function Cd(e) {
  return [
    // UTC
    { key: "Etc/UTC", text: `(UTC+0:00) ${i("utc", e)}` },
    // Pacific (UTC-12 to UTC-8)
    { key: "Pacific/Midway", text: `(UTC-11:00) ${i("midway", e)}` },
    { key: "Pacific/Honolulu", text: `(UTC-10:00) ${i("honolulu", e)}` },
    { key: "America/Anchorage", text: `(UTC-9:00) ${i("anchorage", e)}` },
    { key: "America/Juneau", text: `(UTC-9:00) ${i("juneau", e)}` },
    // North America West (UTC-8 to UTC-7)
    { key: "America/Los_Angeles", text: `(UTC-8:00) ${i("los_angeles", e)}` },
    { key: "America/Vancouver", text: `(UTC-8:00) ${i("vancouver", e)}` },
    { key: "America/Tijuana", text: `(UTC-8:00) ${i("tijuana", e)}` },
    { key: "America/Phoenix", text: `(UTC-7:00) ${i("phoenix", e)}` },
    { key: "America/Denver", text: `(UTC-7:00) ${i("denver", e)}` },
    // North America Central (UTC-6)
    { key: "America/Chicago", text: `(UTC-6:00) ${i("chicago", e)}` },
    { key: "America/Mexico_City", text: `(UTC-6:00) ${i("mexico_city", e)}` },
    { key: "America/Guatemala", text: `(UTC-6:00) ${i("guatemala", e)}` },
    // North America East (UTC-5 to UTC-4)
    { key: "America/New_York", text: `(UTC-5:00) ${i("new_york", e)}` },
    { key: "America/Toronto", text: `(UTC-5:00) ${i("toronto", e)}` },
    { key: "America/Bogota", text: `(UTC-5:00) ${i("bogota", e)}` },
    { key: "America/Lima", text: `(UTC-5:00) ${i("lima", e)}` },
    { key: "America/Caracas", text: `(UTC-4:00) ${i("caracas", e)}` },
    { key: "America/Halifax", text: `(UTC-4:00) ${i("halifax", e)}` },
    // South America (UTC-4 to UTC-3)
    { key: "America/Santiago", text: `(UTC-4:00) ${i("santiago", e)}` },
    { key: "America/La_Paz", text: `(UTC-4:00) ${i("la_paz", e)}` },
    { key: "America/Sao_Paulo", text: `(UTC-3:00) ${i("sao_paulo", e)}` },
    { key: "America/Buenos_Aires", text: `(UTC-3:00) ${i("buenos_aires", e)}` },
    { key: "America/Montevideo", text: `(UTC-3:00) ${i("montevideo", e)}` },
    // Atlantic (UTC-3 to UTC-1)
    { key: "America/Godthab", text: `(UTC-3:00) ${i("godthab", e)}` },
    { key: "Atlantic/Azores", text: `(UTC-1:00) ${i("azores", e)}` },
    { key: "Atlantic/Cape_Verde", text: `(UTC-1:00) ${i("cape_verde", e)}` },
    // Western Europe (UTC+0 to UTC+1)
    { key: "Europe/London", text: `(UTC+0:00) ${i("london", e)}` },
    { key: "Europe/Dublin", text: `(UTC+0:00) ${i("dublin", e)}` },
    { key: "Europe/Lisbon", text: `(UTC+0:00) ${i("lisbon", e)}` },
    { key: "Africa/Casablanca", text: `(UTC+0:00) ${i("casablanca", e)}` },
    { key: "Europe/Paris", text: `(UTC+1:00) ${i("paris", e)}` },
    { key: "Europe/Berlin", text: `(UTC+1:00) ${i("berlin", e)}` },
    { key: "Europe/Amsterdam", text: `(UTC+1:00) ${i("amsterdam", e)}` },
    { key: "Europe/Brussels", text: `(UTC+1:00) ${i("brussels", e)}` },
    { key: "Europe/Madrid", text: `(UTC+1:00) ${i("madrid", e)}` },
    { key: "Europe/Rome", text: `(UTC+1:00) ${i("rome", e)}` },
    { key: "Europe/Vienna", text: `(UTC+1:00) ${i("vienna", e)}` },
    { key: "Europe/Warsaw", text: `(UTC+1:00) ${i("warsaw", e)}` },
    { key: "Africa/Lagos", text: `(UTC+1:00) ${i("lagos", e)}` },
    // Central Europe (UTC+2)
    { key: "Europe/Athens", text: `(UTC+2:00) ${i("athens", e)}` },
    { key: "Europe/Bucharest", text: `(UTC+2:00) ${i("bucharest", e)}` },
    { key: "Europe/Helsinki", text: `(UTC+2:00) ${i("helsinki", e)}` },
    { key: "Europe/Istanbul", text: `(UTC+2:00) ${i("istanbul", e)}` },
    { key: "Europe/Kiev", text: `(UTC+2:00) ${i("kiev", e)}` },
    { key: "Africa/Cairo", text: `(UTC+2:00) ${i("cairo", e)}` },
    { key: "Africa/Johannesburg", text: `(UTC+2:00) ${i("johannesburg", e)}` },
    { key: "Asia/Jerusalem", text: `(UTC+2:00) ${i("jerusalem", e)}` },
    // Eastern Europe / Middle East (UTC+3)
    { key: "Europe/Moscow", text: `(UTC+3:00) ${i("moscow", e)}` },
    { key: "Asia/Baghdad", text: `(UTC+3:00) ${i("baghdad", e)}` },
    { key: "Asia/Kuwait", text: `(UTC+3:00) ${i("kuwait", e)}` },
    { key: "Asia/Riyadh", text: `(UTC+3:00) ${i("riyadh", e)}` },
    { key: "Asia/Bahrain", text: `(UTC+3:00) ${i("bahrain", e)}` },
    { key: "Africa/Nairobi", text: `(UTC+3:00) ${i("nairobi", e)}` },
    // Middle East (UTC+3:30 to UTC+4)
    { key: "Asia/Tehran", text: `(UTC+3:30) ${i("tehran", e)}` },
    { key: "Asia/Dubai", text: `(UTC+4:00) ${i("dubai", e)}` },
    { key: "Asia/Muscat", text: `(UTC+4:00) ${i("muscat", e)}` },
    { key: "Asia/Baku", text: `(UTC+4:00) ${i("baku", e)}` },
    // Central Asia (UTC+4:30 to UTC+5)
    { key: "Asia/Kabul", text: `(UTC+4:30) ${i("kabul", e)}` },
    { key: "Asia/Karachi", text: `(UTC+5:00) ${i("karachi", e)}` },
    { key: "Asia/Tashkent", text: `(UTC+5:00) ${i("tashkent", e)}` },
    { key: "Asia/Ashkhabad", text: `(UTC+5:00) ${i("ashkhabad", e)}` },
    // South Asia (UTC+5:30 to UTC+6)
    { key: "Asia/Kolkata", text: `(UTC+5:30) ${i("kolkata", e)}` },
    { key: "Asia/Mumbai", text: `(UTC+5:30) ${i("mumbai", e)}` },
    { key: "Asia/Colombo", text: `(UTC+5:30) ${i("colombo", e)}` },
    { key: "Asia/Kathmandu", text: `(UTC+5:45) ${i("kathmandu", e)}` },
    { key: "Asia/Dhaka", text: `(UTC+6:00) ${i("dhaka", e)}` },
    { key: "Asia/Almaty", text: `(UTC+6:00) ${i("almaty", e)}` },
    // Southeast Asia (UTC+6:30 to UTC+7)
    { key: "Asia/Yangon", text: `(UTC+6:30) ${i("yangon", e)}` },
    { key: "Asia/Bangkok", text: `(UTC+7:00) ${i("bangkok", e)}` },
    { key: "Asia/Jakarta", text: `(UTC+7:00) ${i("jakarta", e)}` },
    { key: "Asia/Ho_Chi_Minh", text: `(UTC+7:00) ${i("ho_chi_minh", e)}` },
    // East Asia (UTC+8)
    { key: "Asia/Shanghai", text: `(UTC+8:00) ${i("shanghai", e)}` },
    { key: "Asia/Hong_Kong", text: `(UTC+8:00) ${i("hong_kong", e)}` },
    { key: "Asia/Singapore", text: `(UTC+8:00) ${i("singapore", e)}` },
    { key: "Asia/Taipei", text: `(UTC+8:00) ${i("taipei", e)}` },
    { key: "Asia/Manila", text: `(UTC+8:00) ${i("manila", e)}` },
    { key: "Asia/Kuala_Lumpur", text: `(UTC+8:00) ${i("kuala_lumpur", e)}` },
    { key: "Australia/Perth", text: `(UTC+8:00) ${i("perth", e)}` },
    // East Asia (UTC+9)
    { key: "Asia/Tokyo", text: `(UTC+9:00) ${i("tokyo", e)}` },
    { key: "Asia/Seoul", text: `(UTC+9:00) ${i("seoul", e)}` },
    { key: "Asia/Pyongyang", text: `(UTC+9:00) ${i("pyongyang", e)}` },
    // Australia (UTC+9:30 to UTC+10)
    { key: "Australia/Adelaide", text: `(UTC+9:30) ${i("adelaide", e)}` },
    { key: "Australia/Darwin", text: `(UTC+9:30) ${i("darwin", e)}` },
    { key: "Australia/Brisbane", text: `(UTC+10:00) ${i("brisbane", e)}` },
    { key: "Australia/Sydney", text: `(UTC+10:00) ${i("sydney", e)}` },
    { key: "Australia/Melbourne", text: `(UTC+10:00) ${i("melbourne", e)}` },
    { key: "Pacific/Guam", text: `(UTC+10:00) ${i("guam", e)}` },
    // Pacific (UTC+10 to UTC+13)
    { key: "Pacific/Port_Moresby", text: `(UTC+10:00) ${i("port_moresby", e)}` },
    { key: "Pacific/Norfolk", text: `(UTC+11:00) ${i("norfolk", e)}` },
    { key: "Pacific/Guadalcanal", text: `(UTC+11:00) ${i("guadalcanal", e)}` },
    { key: "Pacific/Auckland", text: `(UTC+12:00) ${i("auckland", e)}` },
    { key: "Pacific/Fiji", text: `(UTC+12:00) ${i("fiji", e)}` },
    { key: "Pacific/Tongatapu", text: `(UTC+13:00) ${i("tongatapu", e)}` },
    { key: "Pacific/Apia", text: `(UTC+13:00) ${i("apia", e)}` }
  ];
}
const yd = (e) => {
  const [t, n] = w(e.timezone), r = V(() => Cd(e.locale));
  return L(Z1, {
    get title() {
      return i("timezone", e.locale);
    },
    width: 320,
    get buttons() {
      return [{
        children: i("confirm", e.locale),
        onClick: () => {
          e.onConfirm(t()), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      return L(l9, {
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
        },
        searchable: !0,
        get searchPlaceholder() {
          return i("Search Timezone", e.locale) || "Search timezone...";
        }
      });
    }
  });
};
function kt(e) {
  return [
    {
      key: "candle.type",
      text: i("candle_type", e),
      component: "select",
      dataSource: [
        { key: "candle_solid", text: i("candle_solid", e) },
        { key: "candle_stroke", text: i("candle_stroke", e) },
        { key: "candle_up_stroke", text: i("candle_up_stroke", e) },
        { key: "candle_down_stroke", text: i("candle_down_stroke", e) },
        { key: "ohlc", text: i("ohlc", e) },
        { key: "area", text: i("area", e) }
      ]
    },
    {
      key: "candle.priceMark.last.show",
      text: i("last_price_show", e),
      component: "switch"
    },
    {
      key: "candle.priceMark.high.show",
      text: i("high_price_show", e),
      component: "switch"
    },
    {
      key: "candle.priceMark.low.show",
      text: i("low_price_show", e),
      component: "switch"
    },
    {
      key: "indicator.lastValueMark.show",
      text: i("indicator_last_value_show", e),
      component: "switch"
    },
    {
      key: "yAxis.type",
      text: i("price_axis_type", e),
      component: "select",
      dataSource: [
        { key: "normal", text: i("normal", e) },
        { key: "percentage", text: i("percentage", e) },
        { key: "log", text: i("log", e) }
      ]
    },
    {
      key: "yAxis.reverse",
      text: i("reverse_coordinate", e),
      component: "switch"
    },
    {
      key: "grid.show",
      text: i("grid_show", e),
      component: "switch"
    }
  ];
}
const fd = /* @__PURE__ */ p('<div class="klinecharts-pro-setting-modal-content"></div>'), gd = /* @__PURE__ */ p('<div class="setting-item"><span class="setting-label"></span><div class="setting-control"></div></div>'), md = (e) => {
  const [t, n] = w(e.currentStyles), [r, a] = w(kt(e.locale)), [s, l] = w(!1), c = () => {
    l(window.innerWidth <= 768);
  };
  o0(() => {
    c(), window.addEventListener("resize", c);
  }), K1(() => {
    window.removeEventListener("resize", c);
  }), m1(() => {
    a(kt(e.locale));
  });
  const h = (m, d) => {
    const $ = {};
    e0($, m.key, d);
    const v = n1.clone(t());
    e0(v, m.key, d), n(v), a(r().map((A) => ({
      ...A
    }))), e.onChange($);
  };
  return L(Z1, {
    get title() {
      return i("setting", e.locale);
    },
    width: 690,
    btnParentStyle: {
      display: "flex",
      "justify-content": "center"
    },
    minButtonWidth: 200,
    get isMobile() {
      return s();
    },
    get buttons() {
      return [{
        children: i("restore_default", e.locale),
        onClick: () => {
          e.onRestoreDefault(r()), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      const m = fd.cloneNode(!0);
      return _(m, L(J9, {
        get each() {
          return r();
        },
        children: (d) => {
          let $;
          const v = n1.formatValue(t(), d.key);
          switch (d.component) {
            case "select": {
              $ = L(l9, {
                get style() {
                  return {
                    width: s() ? "100%" : "120px",
                    "min-width": s() ? "auto" : "120px"
                  };
                },
                get value() {
                  return i(v, e.locale);
                },
                get dataSource() {
                  return d.dataSource;
                },
                onSelected: (A) => {
                  const T = A.key;
                  h(d, T);
                }
              });
              break;
            }
            case "switch": {
              const A = !!v;
              $ = L(ti, {
                open: A,
                onChange: () => {
                  h(d, !A);
                }
              });
              break;
            }
          }
          return (() => {
            const A = gd.cloneNode(!0), T = A.firstChild, E = T.nextSibling;
            return _(T, () => d.text), _(E, $), Q(() => A.classList.toggle("mobile-item", !!s())), A;
          })();
        }
      })), Q(() => m.classList.toggle("mobile-layout", !!s())), m;
    }
  });
}, pd = /* @__PURE__ */ p('<img style="width:500px;margin-top: 20px">'), vd = (e) => L(Z1, {
  get title() {
    return i("screenshot", e.locale);
  },
  width: 540,
  get buttons() {
    return [{
      type: "confirm",
      children: i("save", e.locale),
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
    const t = pd.cloneNode(!0);
    return Q(() => y1(t, "src", e.url)), t;
  }
}), _d = {
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
}, $d = /* @__PURE__ */ p('<div class="klinecharts-pro-indicator-setting-modal-content"></div>'), bd = /* @__PURE__ */ p("<span></span>"), Ld = (e) => {
  const [t, n] = w(n1.clone(e.params.calcParams)), r = (a) => _d[a];
  return L(Z1, {
    get title() {
      return e.params.indicatorName;
    },
    width: 360,
    get buttons() {
      return [{
        type: "confirm",
        children: i("confirm", e.locale),
        onClick: () => {
          const a = r(e.params.indicatorName), s = [];
          n1.clone(t()).forEach((l, c) => {
            !n1.isValid(l) || l === "" ? "default" in a[c] && s.push(a[c].default) : s.push(l);
          }), e.onConfirm(s), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      const a = $d.cloneNode(!0);
      return _(a, () => r(e.params.indicatorName).map((s, l) => [(() => {
        const c = bd.cloneNode(!0);
        return _(c, () => i(s.paramNameKey, e.locale)), c;
      })(), L(u9, {
        style: {
          width: "200px"
        },
        get value() {
          return t()[l] ?? "";
        },
        get precision() {
          return s.precision;
        },
        get min() {
          return s.min;
        },
        onChange: (c) => {
          const h = n1.clone(t());
          h[l] = c, n(h);
        }
      })])), a;
    }
  });
}, xd = /* @__PURE__ */ p('<svg viewBox="0 0 1024 1024"><path d="M945.066667 898.133333l-189.866667-189.866666c55.466667-64 87.466667-149.333333 87.466667-241.066667 0-204.8-168.533333-373.333333-373.333334-373.333333S96 264.533333 96 469.333333 264.533333 842.666667 469.333333 842.666667c91.733333 0 174.933333-34.133333 241.066667-87.466667l189.866667 189.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c8.533333-12.8 8.533333-34.133333-2.133333-46.933334zM469.333333 778.666667C298.666667 778.666667 160 640 160 469.333333S298.666667 160 469.333333 160 778.666667 298.666667 778.666667 469.333333 640 778.666667 469.333333 778.666667z"></path></svg>'), kd = /* @__PURE__ */ p('<img alt="symbol">'), Ad = /* @__PURE__ */ p("<li><div><span></span></div></li>"), wd = (e) => {
  const [t, n] = w(""), [r] = Z9(t, e.datafeed.searchSymbols.bind(e.datafeed));
  return L(Z1, {
    get title() {
      return i("symbol_search", e.locale);
    },
    width: 460,
    get onClose() {
      return e.onClose;
    },
    get children() {
      return [L(u9, {
        class: "klinecharts-pro-symbol-search-modal-input",
        get placeholder() {
          return i("symbol_code", e.locale);
        },
        get suffix() {
          return xd.cloneNode(!0);
        },
        get value() {
          return t();
        },
        onChange: (a) => {
          const s = `${a}`;
          n(s);
        }
      }), L(Ee, {
        class: "klinecharts-pro-symbol-search-modal-list",
        get loading() {
          return r.loading;
        },
        get dataSource() {
          return r() ?? [];
        },
        renderItem: (a) => (() => {
          const s = Ad.cloneNode(!0), l = s.firstChild, c = l.firstChild;
          return s.$$click = () => {
            e.onSymbolSelected(a), e.onClose();
          }, _(l, L(H, {
            get when() {
              return a.logo;
            },
            get children() {
              const h = kd.cloneNode(!0);
              return Q(() => y1(h, "src", a.logo)), h;
            }
          }), c), _(c, () => a.shortName ?? a.ticker, null), _(c, () => `${a.name ? `(${a.name})` : ""}`, null), _(s, () => a.exchange ?? "", null), Q(() => y1(c, "title", a.name ?? "")), s;
        })()
      })];
    }
  });
};
v1(["click"]);
const Md = /* @__PURE__ */ p('<div class="klinecharts-pro-mobile-more-modal-content"><div class="item"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div><div class="item"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path></svg><span></span></div><div class="item"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg><span></span></div></div>'), Sd = (e) => L(Z1, {
  get title() {
    return i("more", e.locale);
  },
  isMobile: !0,
  get onClose() {
    return e.onClose;
  },
  get children() {
    const t = Md.cloneNode(!0), n = t.firstChild, r = n.firstChild, a = r.nextSibling, s = n.nextSibling, l = s.firstChild, c = l.nextSibling, h = s.nextSibling, m = h.firstChild, d = m.nextSibling;
    return n.$$click = () => {
      e.onIndicatorClick(), e.onClose();
    }, _(a, () => i("indicator", e.locale)), s.$$click = () => {
      e.onTimezoneClick(), e.onClose();
    }, _(c, () => i("timezone", e.locale)), h.$$click = () => {
      e.onSettingClick(), e.onClose();
    }, _(d, () => i("setting", e.locale)), t;
  }
});
v1(["click"]);
const Td = /* @__PURE__ */ p('<i class="icon-close klinecharts-pro-load-icon"></i>'), Pd = /* @__PURE__ */ p('<div class="klinecharts-pro-content"><div class="klinecharts-pro-widget"></div></div>'), Id = /* @__PURE__ */ p('<div class="klinecharts-pro-quick-order-menu"><button type="button">Buy <!> @ <!> Limit</button><button type="button">Buy <!> @ <!> Stop</button><button type="button">Create new order...</button><button type="button">Copy Price (<!>)</button><button type="button">Draw horizontal line on </button></div>'), Od = /* @__PURE__ */ p('<div class="klinecharts-pro-quick-order-marker"><button type="button" class="klinecharts-pro-quick-order-plus">+</button></div>');
function Ae(e, t, n, r) {
  t === "VOL" && (r = {
    gap: {
      bottom: 2
    },
    ...r
  });
  const a = (e == null ? void 0 : e.createIndicator({
    name: t,
    // @ts-expect-error
    createTooltipDataSource: ({
      indicator: s,
      defaultStyles: l
    }) => {
      const c = [];
      return s.visible ? (c.push(l.tooltip.icons[1]), c.push(l.tooltip.icons[2]), c.push(l.tooltip.icons[3])) : (c.push(l.tooltip.icons[0]), c.push(l.tooltip.icons[2]), c.push(l.tooltip.icons[3])), {
        icons: c
      };
    }
  }, n, r)) ?? null;
  if (a && t === "MA")
    try {
      e == null || e.overrideIndicator({
        name: "MA",
        calcParams: [7, 25, 99]
      }, a);
    } catch {
    }
  return a;
}
const Nd = (e) => {
  var M0, S0, T0, P0, I0, O0, N0, D0;
  let t, n = null, r;
  const [a, s] = w(!1), [l, c] = w(e.theme), [h, m] = w(e.styles), [d, $] = w(e.locale), [v, A] = w(e.symbol), [T, E] = w(e.period), [O, F] = w(!1), [K, P] = w([...e.mainIndicators]), [B, z] = w({}), [_1, i1] = w(!1), [f1, N] = w({
    key: e.timezone,
    text: xt(e.timezone, e.locale)
  }), [G, R] = w(!1), [D, Z] = w(), [u1, l1] = w(""), [q, $1] = w(e.drawingBarVisible), [g, t1] = w(!1), [S, Y] = w(!1), [j, d1] = w(!1), [g1, O1] = w({
    quickOrder: ((M0 = e.orderTools) == null ? void 0 : M0.quickOrder) ?? !0,
    openOrders: ((S0 = e.orderTools) == null ? void 0 : S0.openOrders) ?? !0,
    positions: ((T0 = e.orderTools) == null ? void 0 : T0.positions) ?? !0,
    orderHistory: ((P0 = e.orderTools) == null ? void 0 : P0.orderHistory) ?? !0
  }), [b1, L1] = w(null), [k1, A1] = w(!1), [Ce, R1] = w(!1);
  let ie = null;
  const [H1, ye] = w({
    visible: !1,
    indicatorName: "",
    paneId: "",
    calcParams: []
  });
  let o1 = /* @__PURE__ */ new Map(), h1 = /* @__PURE__ */ new Map();
  const fe = (o, u, C) => {
    const f = n == null ? void 0 : n.getIndicatorByPaneId(u, o);
    return {
      name: o,
      shortName: (f == null ? void 0 : f.shortName) || o,
      paneId: u,
      type: C,
      calcParams: (f == null ? void 0 : f.calcParams) || [],
      precision: (f == null ? void 0 : f.precision) ?? 4,
      visible: (f == null ? void 0 : f.visible) ?? !0,
      styles: f == null ? void 0 : f.styles,
      figures: f == null ? void 0 : f.figures
    };
  }, I = (o, u, C, f) => {
    if (e.onIndicatorChange)
      if (f === "add" || f === "change")
        setTimeout(() => {
          const x = fe(o, u, C);
          e.onIndicatorChange({
            action: f,
            indicator: x
          });
        }, 50);
      else {
        const x = {
          name: o,
          shortName: o,
          paneId: u,
          type: C,
          calcParams: [],
          precision: 4,
          visible: !1,
          styles: void 0,
          figures: void 0
        };
        e.onIndicatorChange({
          action: f,
          indicator: x
        });
      }
  }, r1 = (o) => ({
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
  })[o] || 1, w1 = (o, u = /* @__PURE__ */ new WeakSet()) => {
    if (o == null)
      return o;
    if (u.has(o))
      return "[Circular]";
    if (typeof o != "object")
      return o;
    if (u.add(o), Array.isArray(o))
      return o.map((f) => w1(f, u));
    const C = {};
    for (const f in o)
      if (!(f === "__proto__" || f === "constructor" || f === "prototype"))
        try {
          const x = o[f];
          if (typeof x == "function")
            continue;
          C[f] = w1(x, u);
        } catch (x) {
          C[f] = `[Error: ${x.message}]`;
        }
    return C;
  }, ge = (o) => {
    if (!o)
      return null;
    try {
      return {
        id: o.id || "",
        type: o.name || "",
        name: o.name || "",
        points: (o.points || []).map((u) => ({
          timestamp: u.timestamp || 0,
          value: u.value || 0,
          dataIndex: u.dataIndex || 0
        })),
        extendData: w1(o.extendData || {}),
        styles: w1(o.styles || {}),
        visible: o.visible ?? !0,
        lock: o.lock ?? !1,
        mode: o.mode || B0.Normal
      };
    } catch (u) {
      return console.error("Error extracting overlay data:", u), null;
    }
  }, me = (o) => {
    var u, C, f;
    try {
      const x = (u = n == null ? void 0 : n.getOverlayById) == null ? void 0 : u.call(n, o);
      if (!x)
        return;
      const k = ge(x);
      if (k) {
        const y = o1.get(o), b = ((C = y == null ? void 0 : y.points) == null ? void 0 : C.length) || 0, M = ((f = k.points) == null ? void 0 : f.length) || 0;
        o1.set(o, k);
        const U = r1(k.type);
        if (M >= U) {
          const X = h1.get(o);
          X && !X.complete && (X.complete = !0, X.checkInterval && (clearInterval(X.checkInterval), X.checkInterval = void 0));
        }
      }
    } catch (x) {
      console.error(`Error updating overlay tracking for ${o}:`, x);
    }
  }, h9 = (o, u) => {
    if (h1.has(o))
      return;
    const C = {
      monitoring: !0,
      complete: !1,
      lastPointCount: 0
    };
    h1.set(o, C), me(o);
    const f = () => {
      me(o);
    };
    document.addEventListener("mouseup", f), document.addEventListener("touchend", f), setTimeout(() => {
      var k;
      const x = h1.get(o);
      if (x && !x.complete) {
        x.checkInterval && clearInterval(x.checkInterval), x.mouseUpHandler && (document.removeEventListener("mouseup", x.mouseUpHandler), document.removeEventListener("touchend", x.mouseUpHandler)), me(o);
        const y = o1.get(o);
        if (y) {
          const b = r1(y.type), M = ((k = y.points) == null ? void 0 : k.length) || 0;
          M < b && console.warn(`âš ï¸ ${y.type} ${o} has only ${M} point(s), should have ${b}`);
        }
      }
    }, 3e4);
  };
  let V1 = {
    saveDrawings: (o, u) => {
      try {
        const C = `kline_drawings_${o}`, x = {
          drawings: u.map((k) => {
            var U;
            const y = {
              ...k
            };
            y.extendData && (y.extendData = w1(y.extendData)), y.styles && (y.styles = w1(y.styles));
            const b = r1(k.type), M = ((U = k.points) == null ? void 0 : U.length) || 0;
            return M < b && console.warn(`âš ï¸ Saving ${k.type} with only ${M} point(s), needs ${b}`), y;
          }),
          timestamp: Date.now()
        };
      } catch (C) {
        console.error("Library: Error saving drawings:", C);
      }
    },
    loadDrawings: (o) => {
      try {
        const u = `kline_drawings_${o}`;
      } catch (u) {
        console.error("Library: Error loading drawings:", u);
      }
      return [];
    },
    clearDrawings: (o) => {
      try {
        const u = `kline_drawings_${o}`;
      } catch (u) {
        console.error("Library: Error clearing drawings:", u);
      }
    }
  };
  const _0 = () => {
    const o = v();
    if (o != null && o.ticker) {
      const u = Array.from(o1.values());
      V1.saveDrawings(o.ticker, u);
    }
  }, $0 = (o) => {
    var C, f;
    const u = {
      ...g1(),
      ...o
    };
    O1(u), (f = (C = e.orderTools) == null ? void 0 : C.onChange) == null || f.call(C, u);
  }, pe = (o) => {
    var C;
    const u = Math.min(Math.max(((C = v()) == null ? void 0 : C.pricePrecision) ?? 2, 0), 8);
    return o.toLocaleString(void 0, {
      minimumFractionDigits: u,
      maximumFractionDigits: u
    });
  }, C9 = (o) => {
    var C, f;
    const u = Number(o == null ? void 0 : o.y);
    if (!Number.isFinite(u))
      return NaN;
    try {
      const x = n == null ? void 0 : n.convertFromPixel([{
        x: (o == null ? void 0 : o.x) ?? 0,
        y: u
      }], {
        paneId: "candle_pane"
      }), k = Number((C = x == null ? void 0 : x[0]) == null ? void 0 : C.value);
      if (Number.isFinite(k) && k > 0)
        return k;
    } catch {
    }
    try {
      const x = n == null ? void 0 : n.convertFromPixel([{
        x: (o == null ? void 0 : o.x) ?? 0,
        y: u
      }], {
        paneId: "candle_pane",
        absolute: !0
      }), k = Number((f = x == null ? void 0 : x[0]) == null ? void 0 : f.value);
      if (Number.isFinite(k) && k > 0)
        return k;
    } catch {
    }
    return NaN;
  }, b0 = (o) => {
    if (!g1().quickOrder || (o == null ? void 0 : o.paneId) !== "candle_pane" || !t) {
      if (Ce() || k1())
        return;
      L1(null), A1(!1);
      return;
    }
    const u = Number(o.y), C = C9(o), f = t.clientHeight;
    if (!Number.isFinite(u) || !Number.isFinite(C) || C <= 0 || u < 0 || u > f) {
      if (Ce() || k1())
        return;
      L1(null), A1(!1);
      return;
    }
    ie = {
      ...o
    }, L1({
      y: u,
      price: C
    });
  }, Y1 = () => {
    var o;
    if (ie)
      try {
        (o = n == null ? void 0 : n.executeAction) == null || o.call(n, be.OnCrosshairChange, ie);
      } catch {
      }
  }, Re = (o) => {
    var C, f;
    const u = b1();
    u && ((f = (C = e.orderTools) == null ? void 0 : C.onQuickOrderAction) == null || f.call(C, {
      action: o,
      price: u.price,
      symbol: v()
    }), A1(!1));
  }, y9 = async () => {
    var u;
    const o = b1();
    if (o) {
      try {
        await ((u = navigator.clipboard) == null ? void 0 : u.writeText(String(o.price)));
      } catch {
      }
      A1(!1);
    }
  }, f9 = () => {
    const o = b1();
    o && (n == null || n.createOverlay({
      name: "horizontalStraightLine",
      points: [{
        value: o.price
      }],
      lock: !1
    }), A1(!1));
  };
  let L0 = (I0 = e.orderTools) == null ? void 0 : I0.quickOrder, x0 = (O0 = e.orderTools) == null ? void 0 : O0.openOrders, k0 = (N0 = e.orderTools) == null ? void 0 : N0.positions, A0 = (D0 = e.orderTools) == null ? void 0 : D0.orderHistory;
  m1(() => {
    var k, y, b, M;
    const o = (k = e.orderTools) == null ? void 0 : k.quickOrder, u = (y = e.orderTools) == null ? void 0 : y.openOrders, C = (b = e.orderTools) == null ? void 0 : b.positions, f = (M = e.orderTools) == null ? void 0 : M.orderHistory, x = {};
    typeof o == "boolean" && o !== L0 && (L0 = o, x.quickOrder = o), typeof u == "boolean" && u !== x0 && (x0 = u, x.openOrders = u), typeof C == "boolean" && C !== k0 && (k0 = C, x.positions = C), typeof f == "boolean" && f !== A0 && (A0 = f, x.orderHistory = f), Object.keys(x).length > 0 && O1({
      ...g1(),
      ...x
    });
  }), e.ref({
    setTheme: c,
    getTheme: () => l(),
    setStyles: m,
    getStyles: () => n.getStyles(),
    setLocale: $,
    getLocale: () => d(),
    setTimezone: (o) => {
      N({
        key: o,
        text: xt(e.timezone, d())
      });
    },
    getTimezone: () => f1().key,
    setSymbol: A,
    getSymbol: () => v(),
    setPeriod: E,
    getPeriod: () => T(),
    getMainIndicators: () => K(),
    getSubIndicators: () => B(),
    setMainIndicators: P,
    setSubIndicators: z,
    overrideIndicator: (o, u) => {
      n == null || n.overrideIndicator(o, u);
    },
    createOverlay: (o) => {
      var C;
      const u = (C = n == null ? void 0 : n.createOverlay) == null ? void 0 : C.call(n, o);
      return typeof u == "string" ? u : null;
    },
    removeOverlay: (o) => {
      var u;
      if ((u = n == null ? void 0 : n.removeOverlay) == null || u.call(n, o), o.id) {
        o1.delete(o.id);
        const C = h1.get(o.id);
        C && (C.checkInterval && clearInterval(C.checkInterval), C.mouseUpHandler && (document.removeEventListener("mouseup", C.mouseUpHandler), document.removeEventListener("touchend", C.mouseUpHandler)), h1.delete(o.id)), _0();
      }
    },
    removeAllOverlay: () => {
      o1.forEach((o, u) => {
        var f;
        (f = n == null ? void 0 : n.removeOverlay) == null || f.call(n, {
          id: u
        });
        const C = h1.get(u);
        C && (C.checkInterval && clearInterval(C.checkInterval), C.mouseUpHandler && (document.removeEventListener("mouseup", C.mouseUpHandler), document.removeEventListener("touchend", C.mouseUpHandler)));
      }), o1.clear(), h1.clear();
    },
    getAllOverlay: () => Array.from(o1.values()),
    getOverlay: (o) => o1.get(o) || null,
    overrideOverlay: (o) => {
      n && "overrideOverlay" in n && typeof n.overrideOverlay == "function" ? n.overrideOverlay(o) : console.warn("overrideOverlay method not available on widget");
    },
    convertToPixel: (o, u) => n ? n.convertToPixel(o, u) : Array.isArray(o) ? [] : {},
    convertFromPixel: (o, u) => n ? n.convertFromPixel(o, u) : [],
    getVisibleRange: () => n ? n.getVisibleRange() : {
      from: 0,
      to: 0
    },
    getDataList: () => n ? n.getDataList() : [],
    getSize: (o, u) => n ? n.getSize(o, u) : null,
    subscribeAction: (o, u) => {
      n && n.subscribeAction(o, u);
    },
    unsubscribeAction: (o, u) => {
      n && n.unsubscribeAction(o, u);
    },
    setIndicatorModalVisible: F,
    setTimezoneModalVisible: i1,
    setSettingModalVisible: R,
    getOrderToolsState: () => g1(),
    setOrderToolsState: (o) => {
      $0(o);
    },
    dispose: () => {
      t && F0(t);
    },
    resize: () => {
      n && "resize" in n && typeof n.resize == "function" ? n.resize() : console.warn("resize method not available on widget");
    },
    getSettings: () => {
      var C, f, x, k, y, b, M, U, X, C1, N1, D1, ve, se, oe, E1;
      if (!n)
        return {};
      const o = n.getStyles(), u = (C = o.candle) == null ? void 0 : C.bar;
      return {
        // Candle settings
        candleType: (f = o.candle) == null ? void 0 : f.type,
        candleBarStyle: u == null ? void 0 : u.style,
        // bar.style might be LineType
        showLastPrice: (y = (k = (x = o.candle) == null ? void 0 : x.priceMark) == null ? void 0 : k.last) == null ? void 0 : y.show,
        showHighestPrice: (U = (M = (b = o.candle) == null ? void 0 : b.priceMark) == null ? void 0 : M.high) == null ? void 0 : U.show,
        showLowestPrice: (N1 = (C1 = (X = o.candle) == null ? void 0 : X.priceMark) == null ? void 0 : C1.low) == null ? void 0 : N1.show,
        // Indicator settings
        showIndicatorLastValue: (ve = (D1 = o.indicator) == null ? void 0 : D1.lastValueMark) == null ? void 0 : ve.show,
        // Axis settings - yAxis.reverse is boolean according to YAxisStyle interface
        priceAxisType: (se = o.yAxis) == null ? void 0 : se.type,
        reverseCoordinate: (oe = o.yAxis) == null ? void 0 : oe.reverse,
        // Grid settings
        showGrids: (E1 = o.grid) == null ? void 0 : E1.show,
        timestamp: Date.now()
      };
    },
    setSettings: (o) => {
      var C, f, x, k, y, b, M, U, X, C1, N1;
      if (!n)
        return;
      const u = {};
      if (o.candleType !== void 0 && (u.candle = {
        ...u.candle,
        type: o.candleType
      }), o.candleBarStyle !== void 0) {
        const D1 = ((C = u.candle) == null ? void 0 : C.bar) || {};
        u.candle = {
          ...u.candle,
          bar: {
            ...D1,
            style: o.candleBarStyle
          }
          // Use any since ChangeColor doesn't have style
        };
      }
      o.showLastPrice !== void 0 && (u.candle = {
        ...u.candle,
        priceMark: {
          ...(f = u.candle) == null ? void 0 : f.priceMark,
          last: {
            ...(k = (x = u.candle) == null ? void 0 : x.priceMark) == null ? void 0 : k.last,
            show: o.showLastPrice
          }
        }
      }), o.showHighestPrice !== void 0 && (u.candle = {
        ...u.candle,
        priceMark: {
          ...(y = u.candle) == null ? void 0 : y.priceMark,
          high: {
            ...(M = (b = u.candle) == null ? void 0 : b.priceMark) == null ? void 0 : M.high,
            show: o.showHighestPrice
          }
        }
      }), o.showLowestPrice !== void 0 && (u.candle = {
        ...u.candle,
        priceMark: {
          ...(U = u.candle) == null ? void 0 : U.priceMark,
          low: {
            ...(C1 = (X = u.candle) == null ? void 0 : X.priceMark) == null ? void 0 : C1.low,
            show: o.showLowestPrice
          }
        }
      }), o.showIndicatorLastValue !== void 0 && (u.indicator = {
        ...u.indicator,
        lastValueMark: {
          ...(N1 = u.indicator) == null ? void 0 : N1.lastValueMark,
          show: o.showIndicatorLastValue
        }
      }), o.priceAxisType !== void 0 && (u.yAxis = {
        ...u.yAxis,
        type: o.priceAxisType
      }), o.reverseCoordinate !== void 0 && (u.yAxis = {
        ...u.yAxis,
        reverse: o.reverseCoordinate
      }), o.showGrids !== void 0 && (u.grid = {
        ...u.grid,
        show: o.showGrids
      }), n.setStyles(u);
    },
    resetSettings: () => {
      var C, f, x, k, y, b, M;
      if (!n)
        return;
      n.getStyles();
      const o = {
        candle: {
          type: _9.CandleSolid,
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
          type: $9.Normal,
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
      }, u = D();
      if (u) {
        const U = {
          candle: {
            type: (C = u.candle) == null ? void 0 : C.type,
            bar: (f = u.candle) == null ? void 0 : f.bar,
            priceMark: (x = u.candle) == null ? void 0 : x.priceMark
          },
          indicator: {
            lastValueMark: (k = u.indicator) == null ? void 0 : k.lastValueMark
          },
          yAxis: {
            type: (y = u.yAxis) == null ? void 0 : y.type,
            reverse: (b = u.yAxis) == null ? void 0 : b.reverse
          },
          grid: {
            show: (M = u.grid) == null ? void 0 : M.show
          }
        };
        n.setStyles(U);
      } else
        n.setStyles(o);
    },
    // === Drawing Methods ===
    saveDrawings: (o) => {
      const u = Array.from(o1.values());
      u.forEach((C, f) => {
        var y;
        const x = r1(C.type), k = ((y = C.points) == null ? void 0 : y.length) || 0;
        k < x && console.warn(`âš ï¸ ${C.type} ${C.id} has only ${k} point(s), should have ${x}`);
      }), V1.saveDrawings(o, u);
    },
    loadDrawings: (o) => {
      V1.loadDrawings(o).forEach((C, f) => {
        var x;
        try {
          const k = {
            name: C.type,
            points: C.points || [],
            extendData: C.extendData,
            styles: C.styles,
            visible: C.visible ?? !0,
            lock: C.lock ?? !1,
            mode: C.mode ?? B0.Normal
          }, y = n == null ? void 0 : n.createOverlay(k), b = typeof y == "string" ? y : null;
          b && (o1.set(b, {
            ...C,
            id: b
          }), h1.set(b, {
            monitoring: !1,
            complete: !0,
            lastPointCount: ((x = C.points) == null ? void 0 : x.length) || 0
          }));
        } catch (k) {
          console.error(`   âŒ Error restoring ${C.type}:`, k);
        }
      });
    },
    getDrawings: (o) => V1.loadDrawings(o),
    clearDrawings: (o) => {
      V1.clearDrawings(o);
    },
    // Auto-save on overlay events
    enableAutoSave: (o, u = !0) => {
    }
  });
  const w0 = () => {
    n == null || n.resize();
  }, He = (o, u, C) => {
    let f = u, x = f;
    switch (o.timespan) {
      case "minute": {
        f = f - f % (60 * 1e3), x = f - C * o.multiplier * 60 * 1e3;
        break;
      }
      case "hour": {
        f = f - f % (60 * 60 * 1e3), x = f - C * o.multiplier * 60 * 60 * 1e3;
        break;
      }
      case "day": {
        f = f - f % (60 * 60 * 1e3), x = f - C * o.multiplier * 24 * 60 * 60 * 1e3;
        break;
      }
      case "week": {
        const y = new Date(f).getDay(), b = y === 0 ? 6 : y - 1;
        f = f - b * 60 * 60 * 24;
        const M = new Date(f);
        f = (/* @__PURE__ */ new Date(`${M.getFullYear()}-${M.getMonth() + 1}-${M.getDate()}`)).getTime(), x = C * o.multiplier * 7 * 24 * 60 * 60 * 1e3;
        break;
      }
      case "month": {
        const k = new Date(f), y = k.getFullYear(), b = k.getMonth() + 1;
        f = (/* @__PURE__ */ new Date(`${y}-${b}-01`)).getTime(), x = C * o.multiplier * 30 * 24 * 60 * 60 * 1e3;
        const M = new Date(x);
        x = (/* @__PURE__ */ new Date(`${M.getFullYear()}-${M.getMonth() + 1}-01`)).getTime();
        break;
      }
      case "year": {
        const y = new Date(f).getFullYear();
        f = (/* @__PURE__ */ new Date(`${y}-01-01`)).getTime(), x = C * o.multiplier * 365 * 24 * 60 * 60 * 1e3;
        const b = new Date(x);
        x = (/* @__PURE__ */ new Date(`${b.getFullYear()}-01-01`)).getTime();
        break;
      }
    }
    return [x, f];
  };
  return o0(() => {
    if (window.addEventListener("resize", w0), n = v9(t, {
      customApi: {
        formatDate: (y, b, M, U) => {
          switch (T().timespan) {
            case "minute":
              return U === $e.XAxis ? n1.formatDate(y, b, "HH:mm") : n1.formatDate(y, b, "YYYY-MM-DD HH:mm");
            case "hour":
              return U === $e.XAxis ? n1.formatDate(y, b, "MM-DD HH:mm") : n1.formatDate(y, b, "YYYY-MM-DD HH:mm");
            case "day":
            case "week":
              return n1.formatDate(y, b, "YYYY-MM-DD");
            case "month":
              return U === $e.XAxis ? n1.formatDate(y, b, "YYYY-MM") : n1.formatDate(y, b, "YYYY-MM-DD");
            case "year":
              return U === $e.XAxis ? n1.formatDate(y, b, "YYYY") : n1.formatDate(y, b, "YYYY-MM-DD");
          }
          return n1.formatDate(y, b, "YYYY-MM-DD HH:mm");
        }
      }
    }), n) {
      const y = n.getDom("candle_pane", U0.Main);
      if (y) {
        let M = document.createElement("div");
        if (M.className = "klinecharts-pro-watermark", n1.isString(e.watermark)) {
          const U = e.watermark.replace(/(^\s*)|(\s*$)/g, "");
          M.innerHTML = U;
        } else
          M.appendChild(e.watermark);
        y.appendChild(M);
      }
      const b = n.getDom("candle_pane", U0.YAxis);
      r = document.createElement("span"), r.className = "klinecharts-pro-price-unit", b == null || b.appendChild(r);
    }
    let o = !1;
    const u = () => {
      const y = v();
      if (y != null && y.ticker)
        try {
          const b = Array.from(o1.values());
          V1.saveDrawings(y.ticker, b);
        } catch (b) {
          console.error("âŒ Error refreshing local storage:", b);
        }
    }, C = (y) => {
      o || (o = !0, y.preventDefault());
    };
    setTimeout(() => {
      t && t.addEventListener("contextmenu", C);
    }, 1e3), document.addEventListener("contextmenu", (y) => {
      t && t.contains(y.target) && C(y);
    });
    const f = n == null ? void 0 : n.removeOverlay;
    n && f && (n.removeOverlay = function(...y) {
      const b = f.apply(this, y), M = y[0];
      let U;
      if (typeof M == "string" ? U = M : M && typeof M == "object" && M.id && (U = M.id), U) {
        o1.delete(U);
        const X = h1.get(U);
        X && (X.checkInterval && clearInterval(X.checkInterval), X.mouseUpHandler && (document.removeEventListener("mouseup", X.mouseUpHandler), document.removeEventListener("touchend", X.mouseUpHandler)), h1.delete(U)), u();
      }
      return b;
    }), K().forEach((y) => {
      Ae(n, y, !0, {
        id: "candle_pane"
      });
    });
    const x = {};
    e.subIndicators.forEach((y) => {
      const b = Ae(n, y, !0);
      b && (x[y] = b);
    }), z(x), n == null || n.loadMore((y) => {
      s(!0), (async () => {
        try {
          const M = T(), [U] = He(M, y, 1), [X] = He(M, U, 500), C1 = await e.datafeed.getHistoryKLineData(v(), M, X, U);
          n == null || n.applyMoreData(C1, C1.length > 0);
        } finally {
          s(!1);
        }
      })();
    }), n == null || n.subscribeAction(be.OnTooltipIconClick, (y) => {
      if (y.indicatorName)
        switch (y.iconId) {
          case "visible": {
            n == null || n.overrideIndicator({
              name: y.indicatorName,
              visible: !0
            }, y.paneId);
            const b = y.paneId === "candle_pane" ? "main" : "sub";
            I(y.indicatorName, y.paneId, b, "change");
            break;
          }
          case "invisible": {
            n == null || n.overrideIndicator({
              name: y.indicatorName,
              visible: !1
            }, y.paneId);
            const b = y.paneId === "candle_pane" ? "main" : "sub";
            I(y.indicatorName, y.paneId, b, "change");
            break;
          }
          case "setting": {
            const b = n == null ? void 0 : n.getIndicatorByPaneId(y.paneId, y.indicatorName);
            ye({
              visible: !0,
              indicatorName: y.indicatorName,
              paneId: y.paneId,
              calcParams: b.calcParams
            });
            break;
          }
          case "close":
            if (y.paneId === "candle_pane") {
              const b = [...K()];
              n == null || n.removeIndicator("candle_pane", y.indicatorName), b.splice(b.indexOf(y.indicatorName), 1), P(b), I(y.indicatorName, "candle_pane", "main", "remove");
            } else {
              const b = {
                ...B()
              };
              n == null || n.removeIndicator(y.paneId, y.indicatorName), delete b[y.indicatorName], z(b), I(y.indicatorName, y.paneId, "sub", "remove");
            }
        }
    }), n == null || n.subscribeAction(be.OnCrosshairChange, b0);
    const k = n == null ? void 0 : n.createOverlay;
    n && k && (n.createOverlay = function(...y) {
      const b = y[0], M = k.apply(this, y), U = typeof M == "string" ? M : null;
      return U && (h9(U, b.name || "unknown"), me(U), _0()), M;
    });
  }), K1(() => {
    window.removeEventListener("resize", w0), n == null || n.unsubscribeAction(be.OnCrosshairChange, b0), h1.clear(), o1.clear(), F0(t);
  }), m1(() => {
    const o = v();
    o != null && o.priceCurrency ? (r.innerHTML = o == null ? void 0 : o.priceCurrency.toLocaleUpperCase(), r.style.display = "flex") : r.style.display = "none", n == null || n.setPriceVolumePrecision((o == null ? void 0 : o.pricePrecision) ?? 2, (o == null ? void 0 : o.volumePrecision) ?? 0);
  }), m1((o) => {
    const u = v(), C = T();
    let f = !0;
    return K1(() => {
      f = !1;
    }), o && e.datafeed.unsubscribe(o.symbol, o.period), s(!0), Y(!0), (async () => {
      try {
        const [k, y] = He(C, (/* @__PURE__ */ new Date()).getTime(), 500), b = await e.datafeed.getHistoryKLineData(u, C, k, y);
        if (!f)
          return;
        n == null || n.applyNewData(b, b.length > 0), e.datafeed.subscribe(u, C, (M) => {
          n == null || n.updateData(M);
        });
      } finally {
        f && (s(!1), Y(!1));
      }
    })(), {
      symbol: u,
      period: C
    };
  }), m1(() => {
    const o = l();
    n == null || n.setStyles(o);
    const u = o === "dark" ? "#929AA5" : "#76808F";
    n == null || n.setStyles({
      candle: {
        tooltip: {
          rect: {
            offsetLeft: 0,
            paddingLeft: 0
          }
        }
      },
      indicator: {
        tooltip: {
          icons: [{
            id: "visible",
            position: Le.Middle,
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
            color: u,
            activeColor: u,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "invisible",
            position: Le.Middle,
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
            color: u,
            activeColor: u,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "setting",
            position: Le.Middle,
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
            color: u,
            activeColor: u,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "close",
            position: Le.Middle,
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
            color: u,
            activeColor: u,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }]
        }
      }
    });
  }), m1(() => {
    n == null || n.setLocale(d());
  }), m1(() => {
    n == null || n.setTimezone(f1().key);
  }), m1(() => {
    h() && (n == null || n.setStyles(h()), Z(Pa(n.getStyles())));
  }), [Td.cloneNode(!0), L(Dl, {
    get locale() {
      return e.locale;
    },
    get symbol() {
      return v();
    },
    get spread() {
      return q();
    },
    get period() {
      return T();
    },
    get periods() {
      return e.periods;
    },
    onMenuClick: async () => {
      try {
        await R9(() => $1(!q())), n == null || n.resize();
      } catch {
      }
    },
    onSymbolClick: () => {
      t1(!g());
    },
    get onMobilePeriodClick() {
      return e.onMobilePeriodClick;
    },
    onMobileMoreClick: () => {
      e.onMobileMoreClick ? e.onMobileMoreClick() : d1(!0);
    },
    onPeriodChange: E,
    onIndicatorClick: () => {
      F((o) => !o);
    },
    onTimezoneClick: () => {
      i1((o) => !o);
    },
    onSettingClick: () => {
      R((o) => !o);
    },
    onScreenshotClick: () => {
      if (n) {
        const o = e.screenshotBackgroundColor || (e.theme === "dark" ? "#11131E" : "#ffffff"), u = n.getConvertPictureUrl(!0, "jpeg", o);
        l1(u);
      }
    },
    get showOrderToolsMenu() {
      var o;
      return ((o = e.orderTools) == null ? void 0 : o.visible) ?? !1;
    },
    get orderToolsState() {
      return g1();
    },
    onOrderToolsStateChange: $0
  }), (() => {
    const o = Pd.cloneNode(!0), u = o.firstChild;
    return _(o, L(H, {
      get when() {
        return S();
      },
      get children() {
        return L(c9, {});
      }
    }), u), _(o, L(H, {
      get when() {
        return q();
      },
      get children() {
        return L(dd, {
          get locale() {
            return e.locale;
          },
          onDrawingItemClick: (C) => {
            n == null || n.createOverlay(C);
          },
          onModeChange: (C) => {
            n == null || n.overrideOverlay({
              mode: C
            });
          },
          onLockChange: (C) => {
            n == null || n.overrideOverlay({
              lock: C
            });
          },
          onVisibleChange: (C) => {
            n == null || n.overrideOverlay({
              visible: C
            });
          },
          onRemoveClick: (C) => {
            n == null || n.removeOverlay({
              groupId: C
            });
          }
        });
      }
    }), u), F1((C) => t = C, u), _(o, L(H, {
      get when() {
        return b1();
      },
      keyed: !0,
      children: (C) => (() => {
        const f = Od.cloneNode(!0), x = f.firstChild;
        return f.addEventListener("mouseleave", () => {
          k1() || R1(!1);
        }), f.$$mousemove = (k) => {
          k.stopPropagation(), Y1();
        }, f.addEventListener("mouseenter", () => {
          R1(!0), Y1();
        }), x.$$click = (k) => {
          k.stopPropagation(), A1((y) => !y), R1(!0), Y1();
        }, x.$$mousedown = (k) => {
          k.preventDefault(), k.stopPropagation(), Y1();
        }, _(f, L(H, {
          get when() {
            return k1();
          },
          get children() {
            const k = Id.cloneNode(!0), y = k.firstChild, b = y.firstChild, M = b.nextSibling, U = M.nextSibling, X = U.nextSibling;
            X.nextSibling;
            const C1 = y.nextSibling, N1 = C1.firstChild, D1 = N1.nextSibling, ve = D1.nextSibling, se = ve.nextSibling;
            se.nextSibling;
            const oe = C1.nextSibling, E1 = oe.nextSibling, g9 = E1.firstChild, E0 = g9.nextSibling;
            E0.nextSibling;
            const Ve = E1.nextSibling;
            return Ve.firstChild, k.$$mousemove = (_e) => {
              _e.stopPropagation(), Y1();
            }, k.$$mousedown = (_e) => {
              _e.preventDefault(), _e.stopPropagation(), Y1();
            }, y.$$click = () => Re("limit"), _(y, () => v().shortName ?? v().name ?? v().ticker, M), _(y, () => pe(C.price), X), C1.$$click = () => Re("stop"), _(C1, () => v().shortName ?? v().name ?? v().ticker, D1), _(C1, () => pe(C.price), se), oe.$$click = () => Re("create"), E1.$$click = y9, _(E1, () => pe(C.price), E0), Ve.$$click = f9, _(Ve, () => pe(C.price), null), k;
          }
        }), null), Q((k) => {
          const y = `${Math.max(0, C.y - 18)}px`, b = g1().quickOrder ? "block" : "none";
          return y !== k._v$ && f.style.setProperty("top", k._v$ = y), b !== k._v$2 && f.style.setProperty("display", k._v$2 = b), k;
        }, {
          _v$: void 0,
          _v$2: void 0
        }), f;
      })()
    }), null), Q(() => y1(u, "data-drawing-bar-visible", q())), o;
  })(), L(H, {
    get when() {
      return g();
    },
    get children() {
      return L(wd, {
        get locale() {
          return e.locale;
        },
        get datafeed() {
          return e.datafeed;
        },
        onSymbolSelected: (o) => {
          A(o);
        },
        onClose: () => {
          t1(!1);
        }
      });
    }
  }), L(H, {
    get when() {
      return O();
    },
    get children() {
      return L(hd, {
        get locale() {
          return e.locale;
        },
        get mainIndicators() {
          return K();
        },
        get subIndicators() {
          return B();
        },
        onClose: () => {
          F(!1);
        },
        onMainIndicatorChange: (o) => {
          const u = [...K()];
          o.added ? (Ae(n, o.name, !0, {
            id: "candle_pane"
          }), u.push(o.name), I(o.name, "candle_pane", "main", "add")) : (n == null || n.removeIndicator("candle_pane", o.name), u.splice(u.indexOf(o.name), 1), I(o.name, "candle_pane", "main", "remove")), P(u);
        },
        onSubIndicatorChange: (o) => {
          const u = {
            ...B()
          };
          if (o.added) {
            const C = Ae(n, o.name);
            C && (u[o.name] = C, I(o.name, C, "sub", "add"));
          } else
            o.paneId && (n == null || n.removeIndicator(o.paneId, o.name), delete u[o.name], I(o.name, o.paneId, "sub", "remove"));
          z(u);
        }
      });
    }
  }), L(H, {
    get when() {
      return _1();
    },
    get children() {
      return L(yd, {
        get locale() {
          return e.locale;
        },
        get timezone() {
          return f1();
        },
        onClose: () => {
          i1(!1);
        },
        onConfirm: N
      });
    }
  }), L(H, {
    get when() {
      return G();
    },
    get children() {
      return L(md, {
        get locale() {
          return e.locale;
        },
        get currentStyles() {
          return n1.clone(n.getStyles());
        },
        onClose: () => {
          R(!1);
        },
        onChange: (o) => {
          n == null || n.setStyles(o);
        },
        onRestoreDefault: (o) => {
          const u = {};
          o.forEach((C) => {
            const f = C.key;
            e0(u, f, n1.formatValue(D(), f));
          }), n == null || n.setStyles(u);
        }
      });
    }
  }), L(H, {
    get when() {
      return u1().length > 0;
    },
    get children() {
      return L(vd, {
        get locale() {
          return e.locale;
        },
        get url() {
          return u1();
        },
        onClose: () => {
          l1("");
        }
      });
    }
  }), L(H, {
    get when() {
      return H1().visible;
    },
    get children() {
      return L(Ld, {
        get locale() {
          return e.locale;
        },
        get params() {
          return H1();
        },
        onClose: () => {
          ye({
            visible: !1,
            indicatorName: "",
            paneId: "",
            calcParams: []
          });
        },
        onConfirm: (o) => {
          const u = H1();
          n == null || n.overrideIndicator({
            name: u.indicatorName,
            calcParams: o
          }, u.paneId);
          const C = u.paneId === "candle_pane" ? "main" : "sub";
          I(u.indicatorName, u.paneId, C, "change");
        }
      });
    }
  }), L(H, {
    get when() {
      return j();
    },
    get children() {
      return L(Sd, {
        get locale() {
          return e.locale;
        },
        onIndicatorClick: () => {
          F(!0);
        },
        onTimezoneClick: () => {
          i1(!0);
        },
        onSettingClick: () => {
          R(!0);
        },
        onClose: () => {
          d1(!1);
        }
      });
    }
  })];
};
v1(["mousemove", "mousedown", "click"]);
const Dd = /* @__PURE__ */ p('<svg class="logo" viewBox="0 0 80 92"><path d="M28.148808359375,51.7280513671875L22.963588359375,51.7280513671875C21.572648359375002,51.7280513671875,20.445068359375,52.6220613671875,20.445068359375,53.7248813671875L20.445068359375,72.3979013671875C20.445068359375,73.5007013671875,21.572648359375002,74.39470136718751,22.963588359375,74.39470136718751L33.926568359375,74.39470136718751C35.317468359375,74.39470136718751,36.445068359375,73.5007013671875,36.445068359375,72.3979013671875L36.445068359375,53.7248813671875C36.445068359375,52.6220613671875,35.317468359375,51.7280513671875,33.926568359375,51.7280513671875L28.741398359374998,51.7280513671875L28.741398359374998,46.2963223671875C28.741398359374998,46.1665793671875,28.608748359375,46.0614013671875,28.445108359375,46.0614013671875C28.281468359375,46.0614013671875,28.148808359375,46.1665793671875,28.148808359375,46.2963223671875L28.148808359375,51.7280513671875ZM28.741398359374998,74.3948013671875L28.741398359374998,79.82650136718749C28.741398359374998,79.9563013671875,28.608748359375,80.0614013671875,28.445108359375,80.0614013671875C28.281468359375,80.0614013671875,28.148808359375,79.9563013671875,28.148808359375,79.82650136718749L28.148808359375,74.3948013671875L28.741398359374998,74.3948013671875Z"></path><path d="M51.148808359374996,44.7280513671875L45.963588359375,44.7280513671875C44.572648359375,44.7280513671875,43.445068359375,45.6220613671875,43.445068359375,46.7248813671875L43.445068359375,65.3979013671875C43.445068359375,66.5007013671875,44.572648359375,67.39470136718751,45.963588359375,67.39470136718751L56.926568359375,67.39470136718751C58.317468359375,67.39470136718751,59.445068359375,66.5007013671875,59.445068359375,65.3979013671875L59.445068359375,46.7248813671875C59.445068359375,45.6220613671875,58.317468359375,44.7280513671875,56.926568359375,44.7280513671875L51.741398359375,44.7280513671875L51.741398359375,39.2963223671875C51.741398359375,39.1665793671875,51.608748359375,39.0614013671875,51.445108359375,39.0614013671875C51.281468359375,39.0614013671875,51.148808359374996,39.1665793671875,51.148808359374996,39.2963223671875L51.148808359374996,44.7280513671875ZM51.741398359375,67.3948013671875L51.741398359375,72.82650136718749C51.741398359375,72.9563013671875,51.608748359375,73.0614013671875,51.445108359375,73.0614013671875C51.281468359375,73.0614013671875,51.148808359374996,72.9563013671875,51.148808359374996,72.82650136718749L51.148808359374996,67.3948013671875L51.741398359375,67.3948013671875Z"></path><path d="M17.7274,90.6541C17.5901,90.6541,17.4517,90.6436,17.3121,90.6225C9.93219,89.5095,4.80718,86.7136,2.07787,82.3084C-1.1223,77.1437,0.241766,71.6314,0.56829,70.5137C5.37624,46.647,15.0785,38.4945,21.5025,33.0957C22.9683,31.8633,24.2342,30.7995,25.1676,29.7672C25.4105,29.4984,25.6051,29.2154,25.7556,28.9202C24.7465,29.2231,24.1971,29.4326,24.1703,29.4429C22.908,29.9368,21.4777,29.3247,20.9761,28.076C20.4756,26.8272,21.0897,25.4146,22.352,24.9172C22.5042,24.8571,23.5312,24.4607,25.3073,23.9616C24.087,21.4425,21.7693,18.7949,19.7125,16.6431L19.2819,16.1902C16.2438,12.9776,14.6017,4.80159,14.3036,3.19471C14.1306,2.26212,14.4636,1.30796,15.1814,0.679657C15.8995,0.0512175,16.8976,-0.159672,17.8125,0.123747C22.7731,1.66274,24.2638,1.81255,27.2321,2.11098C28.7357,2.26195,29.83,3.59029,29.6762,5.07662C29.5236,6.56295,28.182,7.64786,26.6784,7.49454C24.4992,7.27569,22.9517,7.09896,20.724,6.56646C21.4493,9.09088,22.3803,11.5427,23.2771,12.4919L23.6876,12.9237C25.3757,14.69,28.9691,18.45,30.7016,22.7299C35.0392,21.9433,40.8791,21.3359,47.7817,21.7249C48.2004,20.7386,48.8054,19.7953,49.5907,18.9135C49.7137,18.7754,49.8498,18.6502,49.9988,18.539C53.6142,15.8508,57.5491,12.857,59.7803,11.0758C58.1028,11.2502,56.1034,11.0278,53.9124,9.70882C53.2439,9.30622,52.5992,8.89427,51.9662,8.48933C48.4668,6.25164,46.497,5.12109,43.4234,5.94853C41.9647,6.34058,40.4622,5.48975,40.0659,4.04789C39.6695,2.60604,40.5296,1.11853,41.9871,0.726471C47.5602,-0.773825,51.4796,1.73271,54.9364,3.9434L54.9364,3.9434C55.5284,4.32176,56.1318,4.70797,56.7564,5.08482C58.3843,6.06556,59.4858,5.76127,61.2899,5.13865C62.3511,4.77234,63.5567,4.35687,64.8675,4.53476C66.3321,4.73254,67.4406,5.56933,67.9103,6.83096C68.7444,9.07333,67.1035,11.5533,65.5797,13.2374C64.6729,14.2394,60.0845,17.7606,56.4519,20.4957C56.9477,20.3369,57.4767,20.2511,58.026,20.2511C59.4281,20.2511,60.6982,20.8102,61.621,21.7153C65.4948,20.6901,67.87,17.9563,67.9033,17.9175C68.78,16.8888,70.3322,16.7577,71.3721,17.6226C72.412,18.4886,72.5457,20.0253,71.6702,21.054C71.5221,21.2286,69.5063,23.5492,66.0787,25.233C69.5399,26.8822,72.9993,29.682,74.1841,34.4145C74.5106,35.7206,73.7062,37.0407,72.3859,37.3638C72.1871,37.4117,71.9884,37.4351,71.792,37.4351C70.687,37.4351,69.6826,36.6932,69.4046,35.5848C68.4378,31.7217,64.8144,29.7431,61.7619,28.7456C60.8298,29.7349,59.5009,30.3535,58.026,30.3535C55.8642,30.3535,54.0162,29.0245,53.2713,27.1474C53.2022,27.138,53.1331,27.1287,53.0642,27.1195C54.232,29.5936,57.0851,31.9259,58.1868,32.665C58.3157,32.7516,58.4423,32.8523,58.5547,32.9599C66.5865,40.6151,72.4887,48.8133,76.0971,57.3287C76.6815,58.7074,76.0249,60.2932,74.6313,60.8702C74.2976,61.01,73.9388,61.082,73.576,61.082C72.5065,61.082,71.4914,60.4582,71.0525,59.4213C67.7577,51.6455,62.331,44.1074,54.9203,37.0116C53.6073,36.1009,48.0984,31.9917,47.2065,26.583C40.9421,26.2679,35.6187,26.8278,31.6725,27.5336C31.6197,29.527,30.9225,31.5172,29.2456,33.3731C28.0614,34.6827,26.5968,35.915,25.0446,37.2188C21.9414,39.8269,18.2648,42.9169,14.8104,48.1192C11.356,53.3215,8.12389,60.6361,5.9098,71.6934C5.88732,71.8035,5.85893,71.9123,5.82344,72.0188C5.81634,72.041,4.57886,76.0413,6.77344,79.5289C8.6332,82.4828,12.4557,84.4139,18.1367,85.2705C19.6297,85.4953,20.6566,86.8762,20.4295,88.3532C20.2213,89.6944,19.0559,90.6541,17.7274,90.6541ZM35.1195,7.03101C33.3502,7.03101,31.9158,5.61208,31.9158,3.86173C31.9158,2.11139,33.3502,0.69245,35.1195,0.69245C36.8889,0.69245,38.3233,2.11139,38.3233,3.86173C38.3233,5.61208,36.8889,7.03101,35.1195,7.03101ZM57.6848,23.1892L58.414,24.4754C58.8984,24.3623,59.3923,24.3435,59.8644,24.4203C60.2191,24.5005,60.5087,24.7182,60.6663,25.0229C60.8636,25.3394,60.8993,25.7346,60.7646,26.1094C60.5988,26.5176,60.2972,26.8749,59.9085,27.1235L60.31,27.8316L59.7886,28.1294L59.3994,27.443C58.9257,27.7175,58.399,27.883,57.8664,27.9247L57.3744,27.0569C57.6378,27.0741,57.9071,27.048,58.1704,26.9797C58.4501,26.9251,58.7239,26.8323,58.9829,26.7044L58.2801,25.4647C57.8047,25.5877,57.3167,25.6065,56.8549,25.5197C56.4913,25.4263,56.196,25.1971,56.0328,24.8814C55.8433,24.5561,55.8127,24.1572,55.9484,23.7789C56.088,23.373,56.3763,23.0149,56.7584,22.7726L56.4166,22.1699L56.938,21.8721L57.2727,22.4625C57.6615,22.2376,58.0888,22.0901,58.5254,22.0301L59.0042,22.8746C58.5548,22.8828,58.103,22.9906,57.6848,23.1892ZM56.9319,24.2961Q57.1278,24.6417,57.7863,24.5856L57.1695,23.4978Q56.6982,23.884,56.9319,24.2961ZM58.9077,25.3462L59.4981,26.3875L59.499,26.3891Q59.9965,26.0045,59.7628,25.5923Q59.573,25.2576,58.9077,25.3462ZM73.2212,66.5065C73.2212,68.2569,74.6555,69.6758,76.4249,69.6758C78.1943,69.6758,79.6286,68.2569,79.6286,66.5065C79.6286,64.7562,78.1943,63.3372,76.4249,63.3372C74.6555,63.3372,73.2212,64.7562,73.2212,66.5065ZM35.9465,91.8045C35.0734,91.8045,34.2038,91.7987,33.3378,91.7858C31.827,91.7636,30.6203,90.5359,30.6428,89.0402C30.6653,87.5457,31.9158,86.3297,33.4183,86.3742C49.6344,86.6059,65.7512,84.6175,67.6134,84.037C72.1953,82.4184,74.5295,79.3603,74.5295,74.9575C74.5295,73.463,75.754,72.2517,77.2648,72.2517C78.7755,72.2517,80,73.463,80,74.9575C80,81.5992,76.148,86.7686,69.4317,89.142C67.0041,89.9999,51.0955,91.8046,35.9465,91.8045ZM25.2731,92C23.5037,92,22.0693,90.5811,22.0693,88.8307C22.0693,87.0804,23.5037,85.6615,25.2731,85.6615C27.0424,85.6615,28.4768,87.0804,28.4768,88.8307C28.4768,90.5811,27.0424,92,25.2731,92Z"></path></svg>'), Ed = Dd.cloneNode(!0);
class jd {
  constructor(t) {
    ce(this, "_chartApi", null);
    if (n1.isString(t.container)) {
      if (this._container = document.getElementById(t.container), !this._container)
        throw new Error("Container is null");
    } else
      this._container = t.container;
    this._container.classList.add("klinecharts-pro"), this._container.setAttribute("data-theme", t.theme ?? "light");
    const n = this;
    t5(() => L(Nd, {
      ref: (r) => {
        n._chartApi = r;
      },
      get styles() {
        return t.styles ?? {};
      },
      get watermark() {
        return t.watermark ?? Ed;
      },
      get theme() {
        return t.theme ?? "light";
      },
      get locale() {
        return t.locale ?? "zh-CN";
      },
      get drawingBarVisible() {
        return t.drawingBarVisible ?? (typeof window < "u" && window.innerWidth > 768);
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
      },
      get onIndicatorChange() {
        return t.onIndicatorChange;
      },
      get onMobilePeriodClick() {
        return t.onMobilePeriodClick;
      },
      get onMobileMoreClick() {
        return t.onMobileMoreClick;
      },
      get screenshotBackgroundColor() {
        return t.screenshotBackgroundColor;
      },
      get orderTools() {
        return t.orderTools ?? {
          visible: !1,
          quickOrder: !0,
          openOrders: !0,
          positions: !0,
          orderHistory: !0
        };
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
  setIndicatorModalVisible(t) {
    var n, r;
    (r = (n = this._chartApi) == null ? void 0 : n.setIndicatorModalVisible) == null || r.call(n, t);
  }
  setTimezoneModalVisible(t) {
    var n, r;
    (r = (n = this._chartApi) == null ? void 0 : n.setTimezoneModalVisible) == null || r.call(n, t);
  }
  setSettingModalVisible(t) {
    var n, r;
    (r = (n = this._chartApi) == null ? void 0 : n.setSettingModalVisible) == null || r.call(n, t);
  }
  getOrderToolsState() {
    var t, n;
    return ((n = (t = this._chartApi) == null ? void 0 : t.getOrderToolsState) == null ? void 0 : n.call(t)) ?? {
      quickOrder: !0,
      openOrders: !0,
      positions: !0,
      orderHistory: !0
    };
  }
  setOrderToolsState(t) {
    var n, r;
    (r = (n = this._chartApi) == null ? void 0 : n.setOrderToolsState) == null || r.call(n, t);
  }
  // Forwarded klinecharts chart methods for synchronizing DOM overlays
  // with the canvas (price/pixel conversion, visible-range, data, actions).
  convertToPixel(t, n) {
    return this._chartApi.convertToPixel(t, n);
  }
  convertFromPixel(t, n) {
    return this._chartApi.convertFromPixel(t, n);
  }
  getVisibleRange() {
    return this._chartApi.getVisibleRange();
  }
  getDataList() {
    var t, n;
    return ((n = (t = this._chartApi) == null ? void 0 : t.getDataList) == null ? void 0 : n.call(t)) ?? [];
  }
  getSize(t, n) {
    var r, a;
    return ((a = (r = this._chartApi) == null ? void 0 : r.getSize) == null ? void 0 : a.call(r, t, n)) ?? null;
  }
  subscribeAction(t, n) {
    var r, a;
    (a = (r = this._chartApi) == null ? void 0 : r.subscribeAction) == null || a.call(r, t, n);
  }
  unsubscribeAction(t, n) {
    var r, a;
    (a = (r = this._chartApi) == null ? void 0 : r.unsubscribeAction) == null || a.call(r, t, n);
  }
}
K9.forEach((e) => {
  b9(e);
});
export {
  Fd as DefaultDatafeed,
  jd as KLineChartPro,
  Kd as loadLocales
};
//# sourceMappingURL=klinecharts-pro.js.map
