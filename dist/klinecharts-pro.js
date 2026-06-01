var _9 = Object.defineProperty;
var k9 = (e, n, t) => n in e ? _9(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var ut = (e, n, t) => (k9(e, typeof n != "symbol" ? n + "" : n, t), t);
import { utils as le, OverlayMode as u0, ActionType as T1, LineType as o1, init as x9, FormatDateType as Ot, DomPosition as Dt, dispose as Un, TooltipIconPosition as Nt, CandleType as L9, YAxisType as w9, registerOverlay as A9 } from "klinecharts";
function ht(e, n, t) {
  const r = (e.x - n.x) * Math.cos(t) - (e.y - n.y) * Math.sin(t) + n.x, a = (e.x - n.x) * Math.sin(t) + (e.y - n.y) * Math.cos(t) + n.y;
  return { x: r, y: a };
}
function m0(e, n) {
  if (e.length > 1) {
    let t;
    return e[0].x === e[1].x && e[0].y !== e[1].y ? e[0].y < e[1].y ? t = {
      x: e[0].x,
      y: n.height
    } : t = {
      x: e[0].x,
      y: 0
    } : e[0].x > e[1].x ? t = {
      x: 0,
      y: le.getLinearYFromCoordinates(e[0], e[1], { x: 0, y: e[0].y })
    } : t = {
      x: n.width,
      y: le.getLinearYFromCoordinates(e[0], e[1], { x: n.width, y: e[0].y })
    }, { coordinates: [e[0], t] };
  }
  return [];
}
function Tr(e, n) {
  const t = Math.abs(e.x - n.x), r = Math.abs(e.y - n.y);
  return Math.sqrt(t * t + r * r);
}
const M9 = {
  name: "arrow",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const n = e[1].x > e[0].x ? 0 : 1, t = le.getLinearSlopeIntercept(e[0], e[1]);
      let r;
      t ? r = Math.atan(t[0]) + Math.PI * n : e[1].y > e[0].y ? r = Math.PI / 2 : r = Math.PI / 2 * 3;
      const a = ht({ x: e[1].x - 8, y: e[1].y + 4 }, e[1], r), s = ht({ x: e[1].x - 8, y: e[1].y - 4 }, e[1], r);
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
}, T9 = {
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
      const n = Tr(e[0], e[1]);
      return {
        type: "circle",
        attrs: {
          ...e[0],
          r: n
        },
        styles: { style: "stroke_fill" }
      };
    }
    return [];
  }
}, S9 = {
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
}, P9 = {
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
      const n = { x: e[0].x + (e[2].x - e[1].x), y: e[2].y };
      return [
        {
          type: "polygon",
          attrs: { coordinates: [e[0], e[1], e[2], n] },
          styles: { style: "stroke_fill" }
        }
      ];
    }
    return [];
  },
  performEventPressedMove: ({ points: e, performPointIndex: n, performPoint: t }) => {
    n < 2 && (e[0].price = t.price, e[1].price = t.price);
  },
  performEventMoveForDrawing: ({ currentStep: e, points: n, performPoint: t }) => {
    e === 2 && (n[0].price = t.price);
  }
}, O9 = {
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
}, D9 = {
  name: "fibonacciCircle",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const n = Math.abs(e[0].x - e[1].x), t = Math.abs(e[0].y - e[1].y), r = Math.sqrt(n * n + t * t), a = [0.236, 0.382, 0.5, 0.618, 0.786, 1], s = [], d = [];
      return a.forEach((u) => {
        const m = r * u;
        s.push(
          { ...e[0], r: m }
        ), d.push({
          x: e[0].x,
          y: e[0].y + m + 6,
          text: `${(u * 100).toFixed(1)}%`
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
          attrs: d
        }
      ];
    }
    return [];
  }
}, N9 = {
  name: "fibonacciSegment",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: n, precision: t }) => {
    const r = [], a = [];
    if (e.length > 1) {
      const s = e[1].x > e[0].x ? e[0].x : e[1].x, d = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0], u = e[0].y - e[1].y, m = n.points, k = m[0].value - m[1].value;
      d.forEach((g) => {
        const w = e[1].y + u * g, A = (m[1].value + k * g).toFixed(t.price);
        r.push({ coordinates: [{ x: e[0].x, y: w }, { x: e[1].x, y: w }] }), a.push({
          x: s,
          y: w,
          text: `${A} (${(g * 100).toFixed(1)}%)`,
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
}, I9 = {
  name: "fibonacciSpiral",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, bounding: n }) => {
    if (e.length > 1) {
      const t = Tr(e[0], e[1]) / Math.sqrt(24), r = e[1].x > e[0].x ? 0 : 1, a = le.getLinearSlopeIntercept(e[0], e[1]);
      let s;
      a ? s = Math.atan(a[0]) + Math.PI * r : e[1].y > e[0].y ? s = Math.PI / 2 : s = Math.PI / 2 * 3;
      const d = ht(
        { x: e[0].x - t, y: e[0].y },
        e[0],
        s
      ), u = ht(
        { x: e[0].x - t, y: e[0].y - t },
        e[0],
        s
      ), m = [{
        ...d,
        r: t,
        startAngle: s,
        endAngle: s + Math.PI / 2
      }, {
        ...u,
        r: t * 2,
        startAngle: s + Math.PI / 2,
        endAngle: s + Math.PI
      }];
      let k = e[0].x - t, g = e[0].y - t;
      for (let w = 2; w < 9; w++) {
        const A = m[w - 2].r + m[w - 1].r;
        let O = 0;
        switch (w % 4) {
          case 0: {
            O = s, k -= m[w - 2].r;
            break;
          }
          case 1: {
            O = s + Math.PI / 2, g -= m[w - 2].r;
            break;
          }
          case 2: {
            O = s + Math.PI, k += m[w - 2].r;
            break;
          }
          case 3: {
            O = s + Math.PI / 2 * 3, g += m[w - 2].r;
            break;
          }
        }
        const F = O + Math.PI / 2, E = ht({ x: k, y: g }, e[0], s);
        m.push({
          ...E,
          r: A,
          startAngle: O,
          endAngle: F
        });
      }
      return [
        {
          type: "arc",
          attrs: m
        },
        {
          type: "line",
          attrs: m0(e, n)
        }
      ];
    }
    return [];
  }
}, E9 = {
  name: "fibonacciSpeedResistanceFan",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, bounding: n }) => {
    const t = [];
    let r = [];
    const a = [];
    if (e.length > 1) {
      const s = e[1].x > e[0].x ? -38 : 4, d = e[1].y > e[0].y ? -2 : 20, u = e[1].x - e[0].x, m = e[1].y - e[0].y;
      [1, 0.75, 0.618, 0.5, 0.382, 0.25, 0].forEach((g) => {
        const w = e[1].x - u * g, A = e[1].y - m * g;
        t.push({ coordinates: [{ x: w, y: e[0].y }, { x: w, y: e[1].y }] }), t.push({ coordinates: [{ x: e[0].x, y: A }, { x: e[1].x, y: A }] }), r = r.concat(m0([e[0], { x: w, y: e[1].y }], n)), r = r.concat(m0([e[0], { x: e[1].x, y: A }], n)), a.unshift({
          x: e[0].x + s,
          y: A + 10,
          text: `${g.toFixed(3)}`
        }), a.unshift({
          x: w - 18,
          y: e[0].y + d,
          text: `${g.toFixed(3)}`
        });
      });
    }
    return [
      {
        type: "line",
        attrs: t
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
}, B9 = {
  name: "fibonacciExtension",
  totalStep: 4,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: n, precision: t }) => {
    const r = [], a = [];
    if (e.length > 2) {
      const s = n.points, d = s[1].value - s[0].value, u = e[1].y - e[0].y, m = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1], k = e[2].x > e[1].x ? e[1].x : e[2].x;
      m.forEach((g) => {
        const w = e[2].y + u * g, A = (s[2].value + d * g).toFixed(t.price);
        r.push({ coordinates: [{ x: e[1].x, y: w }, { x: e[2].x, y: w }] }), a.push({
          x: k,
          y: w,
          text: `${A} (${(g * 100).toFixed(1)}%)`,
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
}, F9 = {
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
      const n = (e[1].y - e[0].y) / 4, t = e[1].x - e[0].x, r = [
        { coordinates: [e[0], { x: e[1].x, y: e[1].y - n }] },
        { coordinates: [e[0], { x: e[1].x, y: e[1].y - n * 2 }] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[1].x, y: e[0].y + n }] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[1].x, y: e[0].y + n * 2 }] },
        { coordinates: [{ ...e[0] }, { x: e[0].x + t * 0.236, y: e[1].y }] },
        { coordinates: [{ ...e[0] }, { x: e[0].x + t * 0.5, y: e[1].y }] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[0].x + t * 0.236, y: e[0].y }] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[0].x + t * 0.5, y: e[0].y }] }
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
}, U9 = {
  name: "threeWaves",
  totalStep: 5,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    const n = e.map((t, r) => ({
      ...t,
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
        attrs: n
      }
    ];
  }
}, z9 = {
  name: "fiveWaves",
  totalStep: 7,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    const n = e.map((t, r) => ({
      ...t,
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
        attrs: n
      }
    ];
  }
}, K9 = {
  name: "eightWaves",
  totalStep: 10,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    const n = e.map((t, r) => ({
      ...t,
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
        attrs: n
      }
    ];
  }
}, j9 = {
  name: "anyWaves",
  totalStep: Number.MAX_SAFE_INTEGER,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    const n = e.map((t, r) => ({
      ...t,
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
        attrs: n
      }
    ];
  }
}, Q9 = {
  name: "abcd",
  totalStep: 5,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    let n = [], t = [];
    const r = ["A", "B", "C", "D"], a = e.map((s, d) => ({
      ...s,
      baseline: "bottom",
      text: `(${r[d]})`
    }));
    return e.length > 2 && (n = [e[0], e[2]], e.length > 3 && (t = [e[1], e[3]])), [
      {
        type: "line",
        attrs: { coordinates: e }
      },
      {
        type: "line",
        attrs: [{ coordinates: n }, { coordinates: t }],
        styles: { style: "dashed" }
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: a
      }
    ];
  }
}, R9 = {
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
  createPointFigures: ({ coordinates: e, overlay: n }) => {
    const t = [], r = [], a = ["X", "A", "B", "C", "D"], s = e.map((d, u) => ({
      ...d,
      baseline: "bottom",
      text: `(${a[u]})`
    }));
    return e.length > 2 && (t.push({ coordinates: [e[0], e[2]] }), r.push({ coordinates: [e[0], e[1], e[2]] }), e.length > 3 && (t.push({ coordinates: [e[1], e[3]] }), e.length > 4 && (t.push({ coordinates: [e[2], e[4]] }), r.push({ coordinates: [e[2], e[3], e[4]] })))), [
      {
        type: "line",
        attrs: { coordinates: e }
      },
      {
        type: "line",
        attrs: t,
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
}, Z9 = [
  M9,
  T9,
  S9,
  O9,
  P9,
  D9,
  N9,
  I9,
  E9,
  B9,
  F9,
  U9,
  z9,
  K9,
  j9,
  Q9,
  R9
];
class _y {
  constructor(n) {
    ut(this, "_apiKey");
    ut(this, "_prevSymbolMarket");
    ut(this, "_ws");
    this._apiKey = n;
  }
  async searchSymbols(n) {
    return await ((await (await fetch(`https://api.polygon.io/v3/reference/tickers?apiKey=${this._apiKey}&active=true&search=${n ?? ""}`)).json()).results || []).map((a) => ({
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
  async getHistoryKLineData(n, t, r, a) {
    return await ((await (await fetch(`https://api.polygon.io/v2/aggs/ticker/${n.ticker}/range/${t.multiplier}/${t.timespan}/${r}/${a}?apiKey=${this._apiKey}`)).json()).results || []).map((u) => ({
      timestamp: u.t,
      open: u.o,
      high: u.h,
      low: u.l,
      close: u.c,
      volume: u.v,
      turnover: u.vw
    }));
  }
  subscribe(n, t, r) {
    var a, s;
    this._prevSymbolMarket !== n.market ? ((a = this._ws) == null || a.close(), this._ws = new WebSocket(`wss://delayed.polygon.io/${n.market}`), this._ws.onopen = () => {
      var d;
      (d = this._ws) == null || d.send(JSON.stringify({ action: "auth", params: this._apiKey }));
    }, this._ws.onmessage = (d) => {
      var m;
      const u = JSON.parse(d.data);
      u[0].ev === "status" ? u[0].status === "auth_success" && ((m = this._ws) == null || m.send(JSON.stringify({ action: "subscribe", params: `T.${n.ticker}` }))) : "sym" in u && r({
        timestamp: u.s,
        open: u.o,
        high: u.h,
        low: u.l,
        close: u.c,
        volume: u.v,
        turnover: u.vw
      });
    }) : (s = this._ws) == null || s.send(JSON.stringify({ action: "subscribe", params: `T.${n.ticker}` })), this._prevSymbolMarket = n.market;
  }
  unsubscribe(n, t) {
  }
}
const De = {};
function V9(e) {
  De.context = e;
}
const H9 = (e, n) => e === n, p0 = Symbol("solid-proxy"), q9 = Symbol("solid-track"), Kt = {
  equals: H9
};
let Sr = Nr;
const f1 = 1, jt = 2, Pr = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, d0 = {};
var Le = null;
let O1 = null, ge = null, Be = null, d1 = null, A0 = 0;
function ft(e, n) {
  const t = ge, r = Le, a = e.length === 0, s = a ? Pr : {
    owned: null,
    cleanups: null,
    context: null,
    owner: n === void 0 ? r : n
  }, d = a ? e : () => e(() => h1(() => Wt(s)));
  Le = s, ge = null;
  try {
    return v1(d, !0);
  } finally {
    ge = t, Le = r;
  }
}
function T(e, n) {
  n = n ? Object.assign({}, Kt, n) : Kt;
  const t = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: n.equals || void 0
  }, r = (a) => (typeof a == "function" && (a = a(t.value)), Dr(t, a));
  return [Or.bind(t), r];
}
function zn(e, n, t) {
  const r = Gt(e, n, !0, f1);
  R1(r);
}
function I(e, n, t) {
  const r = Gt(e, n, !1, f1);
  R1(r);
}
function Ue(e, n, t) {
  Sr = e5;
  const r = Gt(e, n, !1, f1);
  r.user = !0, d1 ? d1.push(r) : R1(r);
}
function R(e, n, t) {
  t = t ? Object.assign({}, Kt, t) : Kt;
  const r = Gt(e, n, !0, 0);
  return r.observers = null, r.observerSlots = null, r.comparator = t.equals || void 0, R1(r), Or.bind(r);
}
function Y9(e, n, t) {
  let r, a, s;
  arguments.length === 2 && typeof n == "object" || arguments.length === 1 ? (r = !0, a = e, s = n || {}) : (r = e, a = n, s = t || {});
  let d = null, u = d0, m = null, k = !1, g = "initialValue" in s, w = typeof r == "function" && R(r);
  const A = /* @__PURE__ */ new Set(), [O, F] = (s.storage || T)(s.initialValue), [E, D] = T(void 0), [K, X] = T(void 0, {
    equals: !1
  }), [U, Y] = T(g ? "ready" : "unresolved");
  if (De.context) {
    m = `${De.context.id}${De.context.count++}`;
    let H;
    s.ssrLoadFrom === "initial" ? u = s.initialValue : De.load && (H = De.load(m)) && (u = H[0]);
  }
  function Z(H, ne, oe, Ce) {
    return d === H && (d = null, g = !0, (H === u || ne === u) && s.onHydrated && queueMicrotask(() => s.onHydrated(Ce, {
      value: ne
    })), u = d0, ce(ne, oe)), ne;
  }
  function ce(H, ne) {
    v1(() => {
      ne === void 0 && F(() => H), Y(ne !== void 0 ? "errored" : "ready"), D(ne);
      for (const oe of A.keys())
        oe.decrement();
      A.clear();
    }, !1);
  }
  function j() {
    const H = W9, ne = O(), oe = E();
    if (oe !== void 0 && !d)
      throw oe;
    return ge && !ge.user && H && zn(() => {
      K(), d && (H.resolved || A.has(H) || (H.increment(), A.add(H)));
    }), ne;
  }
  function V(H = !0) {
    if (H !== !1 && k)
      return;
    k = !1;
    const ne = w ? w() : r;
    if (ne == null || ne === !1) {
      Z(d, h1(O));
      return;
    }
    const oe = u !== d0 ? u : h1(() => a(ne, {
      value: O(),
      refetching: H
    }));
    return typeof oe != "object" || !(oe && "then" in oe) ? (Z(d, oe, void 0, ne), oe) : (d = oe, k = !0, queueMicrotask(() => k = !1), v1(() => {
      Y(g ? "refreshing" : "pending"), X();
    }, !1), oe.then((Ce) => Z(oe, Ce, void 0, ne), (Ce) => Z(oe, void 0, Er(Ce), ne)));
  }
  return Object.defineProperties(j, {
    state: {
      get: () => U()
    },
    error: {
      get: () => E()
    },
    loading: {
      get() {
        const H = U();
        return H === "pending" || H === "refreshing";
      }
    },
    latest: {
      get() {
        if (!g)
          return j();
        const H = E();
        if (H && !d)
          throw H;
        return O();
      }
    }
  }), w ? zn(() => V(!1)) : V(!1), [j, {
    refetch: V,
    mutate: F
  }];
}
function h1(e) {
  if (ge === null)
    return e();
  const n = ge;
  ge = null;
  try {
    return e();
  } finally {
    ge = n;
  }
}
function M0(e) {
  Ue(() => h1(e));
}
function N1(e) {
  return Le === null || (Le.cleanups === null ? Le.cleanups = [e] : Le.cleanups.push(e)), e;
}
function G9(e) {
  const n = ge, t = Le;
  return Promise.resolve().then(() => {
    ge = n, Le = t;
    let r;
    return v1(e, !1), ge = Le = null, r ? r.done : void 0;
  });
}
let W9;
function Or() {
  const e = O1;
  if (this.sources && (this.state || e))
    if (this.state === f1 || e)
      R1(this);
    else {
      const n = Be;
      Be = null, v1(() => Rt(this), !1), Be = n;
    }
  if (ge) {
    const n = this.observers ? this.observers.length : 0;
    ge.sources ? (ge.sources.push(this), ge.sourceSlots.push(n)) : (ge.sources = [this], ge.sourceSlots = [n]), this.observers ? (this.observers.push(ge), this.observerSlots.push(ge.sources.length - 1)) : (this.observers = [ge], this.observerSlots = [ge.sources.length - 1]);
  }
  return this.value;
}
function Dr(e, n, t) {
  let r = e.value;
  return (!e.comparator || !e.comparator(r, n)) && (e.value = n, e.observers && e.observers.length && v1(() => {
    for (let a = 0; a < e.observers.length; a += 1) {
      const s = e.observers[a], d = O1 && O1.running;
      d && O1.disposed.has(s), (d && !s.tState || !d && !s.state) && (s.pure ? Be.push(s) : d1.push(s), s.observers && Ir(s)), d || (s.state = f1);
    }
    if (Be.length > 1e6)
      throw Be = [], new Error();
  }, !1)), n;
}
function R1(e) {
  if (!e.fn)
    return;
  Wt(e);
  const n = Le, t = ge, r = A0;
  ge = Le = e, X9(e, e.value, r), ge = t, Le = n;
}
function X9(e, n, t) {
  let r;
  try {
    r = e.fn(n);
  } catch (a) {
    e.pure && (e.state = f1, e.owned && e.owned.forEach(Wt), e.owned = null), Br(a);
  }
  (!e.updatedAt || e.updatedAt <= t) && (e.updatedAt != null && "observers" in e ? Dr(e, r) : e.value = r, e.updatedAt = t);
}
function Gt(e, n, t, r = f1, a) {
  const s = {
    fn: e,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: n,
    owner: Le,
    context: null,
    pure: t
  };
  return Le === null || Le !== Pr && (Le.owned ? Le.owned.push(s) : Le.owned = [s]), s;
}
function Qt(e) {
  const n = O1;
  if (e.state === 0 || n)
    return;
  if (e.state === jt || n)
    return Rt(e);
  if (e.suspense && h1(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < A0); )
    (e.state || n) && t.push(e);
  for (let r = t.length - 1; r >= 0; r--)
    if (e = t[r], e.state === f1 || n)
      R1(e);
    else if (e.state === jt || n) {
      const a = Be;
      Be = null, v1(() => Rt(e, t[0]), !1), Be = a;
    }
}
function v1(e, n) {
  if (Be)
    return e();
  let t = !1;
  n || (Be = []), d1 ? t = !0 : d1 = [], A0++;
  try {
    const r = e();
    return J9(t), r;
  } catch (r) {
    t || (d1 = null), Be = null, Br(r);
  }
}
function J9(e) {
  if (Be && (Nr(Be), Be = null), e)
    return;
  const n = d1;
  d1 = null, n.length && v1(() => Sr(n), !1);
}
function Nr(e) {
  for (let n = 0; n < e.length; n++)
    Qt(e[n]);
}
function e5(e) {
  let n, t = 0;
  for (n = 0; n < e.length; n++) {
    const r = e[n];
    r.user ? e[t++] = r : Qt(r);
  }
  for (De.context && V9(), n = 0; n < t; n++)
    Qt(e[n]);
}
function Rt(e, n) {
  const t = O1;
  e.state = 0;
  for (let r = 0; r < e.sources.length; r += 1) {
    const a = e.sources[r];
    a.sources && (a.state === f1 || t ? a !== n && Qt(a) : (a.state === jt || t) && Rt(a, n));
  }
}
function Ir(e) {
  const n = O1;
  for (let t = 0; t < e.observers.length; t += 1) {
    const r = e.observers[t];
    (!r.state || n) && (r.state = jt, r.pure ? Be.push(r) : d1.push(r), r.observers && Ir(r));
  }
}
function Wt(e) {
  let n;
  if (e.sources)
    for (; e.sources.length; ) {
      const t = e.sources.pop(), r = e.sourceSlots.pop(), a = t.observers;
      if (a && a.length) {
        const s = a.pop(), d = t.observerSlots.pop();
        r < a.length && (s.sourceSlots[d] = r, a[r] = s, t.observerSlots[r] = d);
      }
    }
  if (e.owned) {
    for (n = 0; n < e.owned.length; n++)
      Wt(e.owned[n]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (n = 0; n < e.cleanups.length; n++)
      e.cleanups[n]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function Er(e) {
  return e instanceof Error || typeof e == "string" ? e : new Error("Unknown error");
}
function Br(e) {
  throw e = Er(e), e;
}
const t5 = Symbol("fallback");
function Kn(e) {
  for (let n = 0; n < e.length; n++)
    e[n]();
}
function n5(e, n, t = {}) {
  let r = [], a = [], s = [], d = 0, u = n.length > 1 ? [] : null;
  return N1(() => Kn(s)), () => {
    let m = e() || [], k, g;
    return m[q9], h1(() => {
      let A = m.length, O, F, E, D, K, X, U, Y, Z;
      if (A === 0)
        d !== 0 && (Kn(s), s = [], r = [], a = [], d = 0, u && (u = [])), t.fallback && (r = [t5], a[0] = ft((ce) => (s[0] = ce, t.fallback())), d = 1);
      else if (d === 0) {
        for (a = new Array(A), g = 0; g < A; g++)
          r[g] = m[g], a[g] = ft(w);
        d = A;
      } else {
        for (E = new Array(A), D = new Array(A), u && (K = new Array(A)), X = 0, U = Math.min(d, A); X < U && r[X] === m[X]; X++)
          ;
        for (U = d - 1, Y = A - 1; U >= X && Y >= X && r[U] === m[Y]; U--, Y--)
          E[Y] = a[U], D[Y] = s[U], u && (K[Y] = u[U]);
        for (O = /* @__PURE__ */ new Map(), F = new Array(Y + 1), g = Y; g >= X; g--)
          Z = m[g], k = O.get(Z), F[g] = k === void 0 ? -1 : k, O.set(Z, g);
        for (k = X; k <= U; k++)
          Z = r[k], g = O.get(Z), g !== void 0 && g !== -1 ? (E[g] = a[k], D[g] = s[k], u && (K[g] = u[k]), g = F[g], O.set(Z, g)) : s[k]();
        for (g = X; g < A; g++)
          g in E ? (a[g] = E[g], s[g] = D[g], u && (u[g] = K[g], u[g](g))) : a[g] = ft(w);
        a = a.slice(0, d = A), r = m.slice(0);
      }
      return a;
    });
    function w(A) {
      if (s[g] = A, u) {
        const [O, F] = T(g);
        return u[g] = F, n(m[g], O);
      }
      return n(m[g]);
    }
  };
}
function L(e, n) {
  return h1(() => e(n || {}));
}
function It() {
  return !0;
}
const r5 = {
  get(e, n, t) {
    return n === p0 ? t : e.get(n);
  },
  has(e, n) {
    return n === p0 ? !0 : e.has(n);
  },
  set: It,
  deleteProperty: It,
  getOwnPropertyDescriptor(e, n) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(n);
      },
      set: It,
      deleteProperty: It
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function h0(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function Fr(...e) {
  let n = !1;
  for (let r = 0; r < e.length; r++) {
    const a = e[r];
    n = n || !!a && p0 in a, e[r] = typeof a == "function" ? (n = !0, R(a)) : a;
  }
  if (n)
    return new Proxy({
      get(r) {
        for (let a = e.length - 1; a >= 0; a--) {
          const s = h0(e[a])[r];
          if (s !== void 0)
            return s;
        }
      },
      has(r) {
        for (let a = e.length - 1; a >= 0; a--)
          if (r in h0(e[a]))
            return !0;
        return !1;
      },
      keys() {
        const r = [];
        for (let a = 0; a < e.length; a++)
          r.push(...Object.keys(h0(e[a])));
        return [...new Set(r)];
      }
    }, r5);
  const t = {};
  for (let r = e.length - 1; r >= 0; r--)
    if (e[r]) {
      const a = Object.getOwnPropertyDescriptors(e[r]);
      for (const s in a)
        s in t || Object.defineProperty(t, s, {
          enumerable: !0,
          get() {
            for (let d = e.length - 1; d >= 0; d--) {
              const u = (e[d] || {})[s];
              if (u !== void 0)
                return u;
            }
          }
        });
    }
  return t;
}
function v0(e) {
  const n = "fallback" in e && {
    fallback: () => e.fallback
  };
  return R(n5(() => e.each, e.children, n || void 0));
}
function J(e) {
  let n = !1;
  const t = e.keyed, r = R(() => e.when, void 0, {
    equals: (a, s) => n ? a === s : !a == !s
  });
  return R(() => {
    const a = r();
    if (a) {
      const s = e.children, d = typeof s == "function" && s.length > 0;
      return n = t || d, d ? h1(() => s(a)) : s;
    }
    return e.fallback;
  }, void 0, void 0);
}
function o5(e, n, t) {
  let r = t.length, a = n.length, s = r, d = 0, u = 0, m = n[a - 1].nextSibling, k = null;
  for (; d < a || u < s; ) {
    if (n[d] === t[u]) {
      d++, u++;
      continue;
    }
    for (; n[a - 1] === t[s - 1]; )
      a--, s--;
    if (a === d) {
      const g = s < r ? u ? t[u - 1].nextSibling : t[s - u] : m;
      for (; u < s; )
        e.insertBefore(t[u++], g);
    } else if (s === u)
      for (; d < a; )
        (!k || !k.has(n[d])) && n[d].remove(), d++;
    else if (n[d] === t[s - 1] && t[u] === n[a - 1]) {
      const g = n[--a].nextSibling;
      e.insertBefore(t[u++], n[d++].nextSibling), e.insertBefore(t[--s], g), n[a] = t[s];
    } else {
      if (!k) {
        k = /* @__PURE__ */ new Map();
        let w = u;
        for (; w < s; )
          k.set(t[w], w++);
      }
      const g = k.get(n[d]);
      if (g != null)
        if (u < g && g < s) {
          let w = d, A = 1, O;
          for (; ++w < a && w < s && !((O = k.get(n[w])) == null || O !== g + A); )
            A++;
          if (A > g - u) {
            const F = n[d];
            for (; u < g; )
              e.insertBefore(t[u++], F);
          } else
            e.replaceChild(t[u++], n[d++]);
        } else
          d++;
      else
        n[d++].remove();
    }
  }
}
const jn = "_$DX_DELEGATE";
function i5(e, n, t, r = {}) {
  let a;
  return ft((s) => {
    a = s, n === document ? e() : p(n, e(), n.firstChild ? null : void 0, t);
  }, r.owner), () => {
    a(), n.textContent = "";
  };
}
function $(e, n, t) {
  const r = document.createElement("template");
  r.innerHTML = e;
  let a = r.content.firstChild;
  return t && (a = a.firstChild), a;
}
function Qe(e, n = window.document) {
  const t = n[jn] || (n[jn] = /* @__PURE__ */ new Set());
  for (let r = 0, a = e.length; r < a; r++) {
    const s = e[r];
    t.has(s) || (t.add(s), n.addEventListener(s, a5));
  }
}
function Se(e, n, t) {
  t == null ? e.removeAttribute(n) : e.setAttribute(n, t);
}
function re(e, n) {
  n == null ? e.removeAttribute("class") : e.className = n;
}
function i1(e, n, t, r) {
  if (r)
    Array.isArray(t) ? (e[`$$${n}`] = t[0], e[`$$${n}Data`] = t[1]) : e[`$$${n}`] = t;
  else if (Array.isArray(t)) {
    const a = t[0];
    e.addEventListener(n, t[0] = (s) => a.call(e, t[1], s));
  } else
    e.addEventListener(n, t);
}
function I1(e, n, t) {
  if (!n)
    return t ? Se(e, "style") : n;
  const r = e.style;
  if (typeof n == "string")
    return r.cssText = n;
  typeof t == "string" && (r.cssText = t = void 0), t || (t = {}), n || (n = {});
  let a, s;
  for (s in t)
    n[s] == null && r.removeProperty(s), delete t[s];
  for (s in n)
    a = n[s], a !== t[s] && (r.setProperty(s, a), t[s] = a);
  return t;
}
function D1(e, n, t) {
  return h1(() => e(n, t));
}
function p(e, n, t, r) {
  if (t !== void 0 && !r && (r = []), typeof n != "function")
    return Zt(e, n, r, t);
  I((a) => Zt(e, n(), a, t), r);
}
function a5(e) {
  const n = `$$${e.type}`;
  let t = e.composedPath && e.composedPath()[0] || e.target;
  for (e.target !== t && Object.defineProperty(e, "target", {
    configurable: !0,
    value: t
  }), Object.defineProperty(e, "currentTarget", {
    configurable: !0,
    get() {
      return t || document;
    }
  }), De.registry && !De.done && (De.done = !0, document.querySelectorAll("[id^=pl-]").forEach((r) => {
    for (; r && r.nodeType !== 8 && r.nodeValue !== "pl-" + e; ) {
      let a = r.nextSibling;
      r.remove(), r = a;
    }
    r && r.remove();
  })); t; ) {
    const r = t[n];
    if (r && !t.disabled) {
      const a = t[`${n}Data`];
      if (a !== void 0 ? r.call(t, a, e) : r.call(t, e), e.cancelBubble)
        return;
    }
    t = t._$host || t.parentNode || t.host;
  }
}
function Zt(e, n, t, r, a) {
  for (De.context && !t && (t = [...e.childNodes]); typeof t == "function"; )
    t = t();
  if (n === t)
    return t;
  const s = typeof n, d = r !== void 0;
  if (e = d && t[0] && t[0].parentNode || e, s === "string" || s === "number") {
    if (De.context)
      return t;
    if (s === "number" && (n = n.toString()), d) {
      let u = t[0];
      u && u.nodeType === 3 ? u.data = n : u = document.createTextNode(n), t = j1(e, t, r, u);
    } else
      t !== "" && typeof t == "string" ? t = e.firstChild.data = n : t = e.textContent = n;
  } else if (n == null || s === "boolean") {
    if (De.context)
      return t;
    t = j1(e, t, r);
  } else {
    if (s === "function")
      return I(() => {
        let u = n();
        for (; typeof u == "function"; )
          u = u();
        t = Zt(e, u, t, r);
      }), () => t;
    if (Array.isArray(n)) {
      const u = [], m = t && Array.isArray(t);
      if (C0(u, n, t, a))
        return I(() => t = Zt(e, u, t, r, !0)), () => t;
      if (De.context) {
        if (!u.length)
          return t;
        for (let k = 0; k < u.length; k++)
          if (u[k].parentNode)
            return t = u;
      }
      if (u.length === 0) {
        if (t = j1(e, t, r), d)
          return t;
      } else
        m ? t.length === 0 ? Qn(e, u, r) : o5(e, t, u) : (t && j1(e), Qn(e, u));
      t = u;
    } else if (n instanceof Node) {
      if (De.context && n.parentNode)
        return t = d ? [n] : n;
      if (Array.isArray(t)) {
        if (d)
          return t = j1(e, t, r, n);
        j1(e, t, null, n);
      } else
        t == null || t === "" || !e.firstChild ? e.appendChild(n) : e.replaceChild(n, e.firstChild);
      t = n;
    }
  }
  return t;
}
function C0(e, n, t, r) {
  let a = !1;
  for (let s = 0, d = n.length; s < d; s++) {
    let u = n[s], m = t && t[s];
    if (u instanceof Node)
      e.push(u);
    else if (!(u == null || u === !0 || u === !1))
      if (Array.isArray(u))
        a = C0(e, u, m) || a;
      else if (typeof u == "function")
        if (r) {
          for (; typeof u == "function"; )
            u = u();
          a = C0(e, Array.isArray(u) ? u : [u], Array.isArray(m) ? m : [m]) || a;
        } else
          e.push(u), a = !0;
      else {
        const k = String(u);
        m && m.nodeType === 3 && m.data === k ? e.push(m) : e.push(document.createTextNode(k));
      }
  }
  return a;
}
function Qn(e, n, t = null) {
  for (let r = 0, a = n.length; r < a; r++)
    e.insertBefore(n[r], t);
}
function j1(e, n, t, r) {
  if (t === void 0)
    return e.textContent = "";
  const a = r || document.createTextNode("");
  if (n.length) {
    let s = !1;
    for (let d = n.length - 1; d >= 0; d--) {
      const u = n[d];
      if (a !== u) {
        const m = u.parentNode === e;
        !s && !d ? m ? e.replaceChild(a, u) : e.insertBefore(a, t) : m && u.remove();
      } else
        s = !0;
    }
  } else
    e.insertBefore(a, t);
  return [a];
}
const s5 = "http://www.w3.org/2000/svg";
function l5(e, n = !1) {
  return n ? document.createElementNS(s5, e) : document.createElement(e);
}
function c5(e) {
  const {
    useShadow: n
  } = e, t = document.createTextNode(""), r = e.mount || document.body;
  function a() {
    if (De.context) {
      const [s, d] = T(!1);
      return queueMicrotask(() => d(!0)), () => s() && e.children;
    } else
      return () => e.children;
  }
  if (r instanceof HTMLHeadElement) {
    const [s, d] = T(!1), u = () => d(!0);
    ft((m) => p(r, () => s() ? m() : a()(), null)), N1(() => {
      De.context ? queueMicrotask(u) : u();
    });
  } else {
    const s = l5(e.isSVG ? "g" : "div", e.isSVG), d = n && s.attachShadow ? s.attachShadow({
      mode: "open"
    }) : s;
    Object.defineProperty(s, "_$host", {
      get() {
        return t.parentNode;
      },
      configurable: !0
    }), p(d, a()), r.appendChild(s), e.ref && e.ref(s), N1(() => r.removeChild(s));
  }
  return t;
}
var Et = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ur(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var u5 = typeof Et == "object" && Et && Et.Object === Object && Et, zr = u5, d5 = zr, h5 = typeof self == "object" && self && self.Object === Object && self, f5 = d5 || h5 || Function("return this")(), a1 = f5, y5 = a1, g5 = y5.Symbol, Xt = g5, Rn = Xt, Kr = Object.prototype, m5 = Kr.hasOwnProperty, p5 = Kr.toString, dt = Rn ? Rn.toStringTag : void 0;
function v5(e) {
  var n = m5.call(e, dt), t = e[dt];
  try {
    e[dt] = void 0;
    var r = !0;
  } catch {
  }
  var a = p5.call(e);
  return r && (n ? e[dt] = t : delete e[dt]), a;
}
var C5 = v5, $5 = Object.prototype, b5 = $5.toString;
function _5(e) {
  return b5.call(e);
}
var k5 = _5, Zn = Xt, x5 = C5, L5 = k5, w5 = "[object Null]", A5 = "[object Undefined]", Vn = Zn ? Zn.toStringTag : void 0;
function M5(e) {
  return e == null ? e === void 0 ? A5 : w5 : Vn && Vn in Object(e) ? x5(e) : L5(e);
}
var yt = M5;
function T5(e) {
  var n = typeof e;
  return e != null && (n == "object" || n == "function");
}
var Z1 = T5, S5 = yt, P5 = Z1, O5 = "[object AsyncFunction]", D5 = "[object Function]", N5 = "[object GeneratorFunction]", I5 = "[object Proxy]";
function E5(e) {
  if (!P5(e))
    return !1;
  var n = S5(e);
  return n == D5 || n == N5 || n == O5 || n == I5;
}
var jr = E5, B5 = a1, F5 = B5["__core-js_shared__"], U5 = F5, f0 = U5, Hn = function() {
  var e = /[^.]+$/.exec(f0 && f0.keys && f0.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function z5(e) {
  return !!Hn && Hn in e;
}
var K5 = z5, j5 = Function.prototype, Q5 = j5.toString;
function R5(e) {
  if (e != null) {
    try {
      return Q5.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Qr = R5, Z5 = jr, V5 = K5, H5 = Z1, q5 = Qr, Y5 = /[\\^$.*+?()[\]{}|]/g, G5 = /^\[object .+?Constructor\]$/, W5 = Function.prototype, X5 = Object.prototype, J5 = W5.toString, e6 = X5.hasOwnProperty, t6 = RegExp(
  "^" + J5.call(e6).replace(Y5, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function n6(e) {
  if (!H5(e) || V5(e))
    return !1;
  var n = Z5(e) ? t6 : G5;
  return n.test(q5(e));
}
var r6 = n6;
function o6(e, n) {
  return e == null ? void 0 : e[n];
}
var i6 = o6, a6 = r6, s6 = i6;
function l6(e, n) {
  var t = s6(e, n);
  return a6(t) ? t : void 0;
}
var E1 = l6, c6 = E1, u6 = function() {
  try {
    var e = c6(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), d6 = u6, qn = d6;
function h6(e, n, t) {
  n == "__proto__" && qn ? qn(e, n, {
    configurable: !0,
    enumerable: !0,
    value: t,
    writable: !0
  }) : e[n] = t;
}
var Rr = h6;
function f6(e, n) {
  return e === n || e !== e && n !== n;
}
var Zr = f6, y6 = Rr, g6 = Zr, m6 = Object.prototype, p6 = m6.hasOwnProperty;
function v6(e, n, t) {
  var r = e[n];
  (!(p6.call(e, n) && g6(r, t)) || t === void 0 && !(n in e)) && y6(e, n, t);
}
var T0 = v6, C6 = Array.isArray, V1 = C6;
function $6(e) {
  return e != null && typeof e == "object";
}
var H1 = $6, b6 = yt, _6 = H1, k6 = "[object Symbol]";
function x6(e) {
  return typeof e == "symbol" || _6(e) && b6(e) == k6;
}
var S0 = x6, L6 = V1, w6 = S0, A6 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, M6 = /^\w*$/;
function T6(e, n) {
  if (L6(e))
    return !1;
  var t = typeof e;
  return t == "number" || t == "symbol" || t == "boolean" || e == null || w6(e) ? !0 : M6.test(e) || !A6.test(e) || n != null && e in Object(n);
}
var S6 = T6, P6 = E1, O6 = P6(Object, "create"), Jt = O6, Yn = Jt;
function D6() {
  this.__data__ = Yn ? Yn(null) : {}, this.size = 0;
}
var N6 = D6;
function I6(e) {
  var n = this.has(e) && delete this.__data__[e];
  return this.size -= n ? 1 : 0, n;
}
var E6 = I6, B6 = Jt, F6 = "__lodash_hash_undefined__", U6 = Object.prototype, z6 = U6.hasOwnProperty;
function K6(e) {
  var n = this.__data__;
  if (B6) {
    var t = n[e];
    return t === F6 ? void 0 : t;
  }
  return z6.call(n, e) ? n[e] : void 0;
}
var j6 = K6, Q6 = Jt, R6 = Object.prototype, Z6 = R6.hasOwnProperty;
function V6(e) {
  var n = this.__data__;
  return Q6 ? n[e] !== void 0 : Z6.call(n, e);
}
var H6 = V6, q6 = Jt, Y6 = "__lodash_hash_undefined__";
function G6(e, n) {
  var t = this.__data__;
  return this.size += this.has(e) ? 0 : 1, t[e] = q6 && n === void 0 ? Y6 : n, this;
}
var W6 = G6, X6 = N6, J6 = E6, e2 = j6, t2 = H6, n2 = W6;
function q1(e) {
  var n = -1, t = e == null ? 0 : e.length;
  for (this.clear(); ++n < t; ) {
    var r = e[n];
    this.set(r[0], r[1]);
  }
}
q1.prototype.clear = X6;
q1.prototype.delete = J6;
q1.prototype.get = e2;
q1.prototype.has = t2;
q1.prototype.set = n2;
var r2 = q1;
function o2() {
  this.__data__ = [], this.size = 0;
}
var i2 = o2, a2 = Zr;
function s2(e, n) {
  for (var t = e.length; t--; )
    if (a2(e[t][0], n))
      return t;
  return -1;
}
var e0 = s2, l2 = e0, c2 = Array.prototype, u2 = c2.splice;
function d2(e) {
  var n = this.__data__, t = l2(n, e);
  if (t < 0)
    return !1;
  var r = n.length - 1;
  return t == r ? n.pop() : u2.call(n, t, 1), --this.size, !0;
}
var h2 = d2, f2 = e0;
function y2(e) {
  var n = this.__data__, t = f2(n, e);
  return t < 0 ? void 0 : n[t][1];
}
var g2 = y2, m2 = e0;
function p2(e) {
  return m2(this.__data__, e) > -1;
}
var v2 = p2, C2 = e0;
function $2(e, n) {
  var t = this.__data__, r = C2(t, e);
  return r < 0 ? (++this.size, t.push([e, n])) : t[r][1] = n, this;
}
var b2 = $2, _2 = i2, k2 = h2, x2 = g2, L2 = v2, w2 = b2;
function Y1(e) {
  var n = -1, t = e == null ? 0 : e.length;
  for (this.clear(); ++n < t; ) {
    var r = e[n];
    this.set(r[0], r[1]);
  }
}
Y1.prototype.clear = _2;
Y1.prototype.delete = k2;
Y1.prototype.get = x2;
Y1.prototype.has = L2;
Y1.prototype.set = w2;
var t0 = Y1, A2 = E1, M2 = a1, T2 = A2(M2, "Map"), P0 = T2, Gn = r2, S2 = t0, P2 = P0;
function O2() {
  this.size = 0, this.__data__ = {
    hash: new Gn(),
    map: new (P2 || S2)(),
    string: new Gn()
  };
}
var D2 = O2;
function N2(e) {
  var n = typeof e;
  return n == "string" || n == "number" || n == "symbol" || n == "boolean" ? e !== "__proto__" : e === null;
}
var I2 = N2, E2 = I2;
function B2(e, n) {
  var t = e.__data__;
  return E2(n) ? t[typeof n == "string" ? "string" : "hash"] : t.map;
}
var n0 = B2, F2 = n0;
function U2(e) {
  var n = F2(this, e).delete(e);
  return this.size -= n ? 1 : 0, n;
}
var z2 = U2, K2 = n0;
function j2(e) {
  return K2(this, e).get(e);
}
var Q2 = j2, R2 = n0;
function Z2(e) {
  return R2(this, e).has(e);
}
var V2 = Z2, H2 = n0;
function q2(e, n) {
  var t = H2(this, e), r = t.size;
  return t.set(e, n), this.size += t.size == r ? 0 : 1, this;
}
var Y2 = q2, G2 = D2, W2 = z2, X2 = Q2, J2 = V2, e3 = Y2;
function G1(e) {
  var n = -1, t = e == null ? 0 : e.length;
  for (this.clear(); ++n < t; ) {
    var r = e[n];
    this.set(r[0], r[1]);
  }
}
G1.prototype.clear = G2;
G1.prototype.delete = W2;
G1.prototype.get = X2;
G1.prototype.has = J2;
G1.prototype.set = e3;
var Vr = G1, Hr = Vr, t3 = "Expected a function";
function O0(e, n) {
  if (typeof e != "function" || n != null && typeof n != "function")
    throw new TypeError(t3);
  var t = function() {
    var r = arguments, a = n ? n.apply(this, r) : r[0], s = t.cache;
    if (s.has(a))
      return s.get(a);
    var d = e.apply(this, r);
    return t.cache = s.set(a, d) || s, d;
  };
  return t.cache = new (O0.Cache || Hr)(), t;
}
O0.Cache = Hr;
var n3 = O0, r3 = n3, o3 = 500;
function i3(e) {
  var n = r3(e, function(r) {
    return t.size === o3 && t.clear(), r;
  }), t = n.cache;
  return n;
}
var a3 = i3, s3 = a3, l3 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, c3 = /\\(\\)?/g, u3 = s3(function(e) {
  var n = [];
  return e.charCodeAt(0) === 46 && n.push(""), e.replace(l3, function(t, r, a, s) {
    n.push(a ? s.replace(c3, "$1") : r || t);
  }), n;
}), d3 = u3;
function h3(e, n) {
  for (var t = -1, r = e == null ? 0 : e.length, a = Array(r); ++t < r; )
    a[t] = n(e[t], t, e);
  return a;
}
var f3 = h3, Wn = Xt, y3 = f3, g3 = V1, m3 = S0, p3 = 1 / 0, Xn = Wn ? Wn.prototype : void 0, Jn = Xn ? Xn.toString : void 0;
function qr(e) {
  if (typeof e == "string")
    return e;
  if (g3(e))
    return y3(e, qr) + "";
  if (m3(e))
    return Jn ? Jn.call(e) : "";
  var n = e + "";
  return n == "0" && 1 / e == -p3 ? "-0" : n;
}
var v3 = qr, C3 = v3;
function $3(e) {
  return e == null ? "" : C3(e);
}
var b3 = $3, _3 = V1, k3 = S6, x3 = d3, L3 = b3;
function w3(e, n) {
  return _3(e) ? e : k3(e, n) ? [e] : x3(L3(e));
}
var A3 = w3, M3 = 9007199254740991, T3 = /^(?:0|[1-9]\d*)$/;
function S3(e, n) {
  var t = typeof e;
  return n = n ?? M3, !!n && (t == "number" || t != "symbol" && T3.test(e)) && e > -1 && e % 1 == 0 && e < n;
}
var Yr = S3, P3 = S0, O3 = 1 / 0;
function D3(e) {
  if (typeof e == "string" || P3(e))
    return e;
  var n = e + "";
  return n == "0" && 1 / e == -O3 ? "-0" : n;
}
var N3 = D3, I3 = T0, E3 = A3, B3 = Yr, er = Z1, F3 = N3;
function U3(e, n, t, r) {
  if (!er(e))
    return e;
  n = E3(n, e);
  for (var a = -1, s = n.length, d = s - 1, u = e; u != null && ++a < s; ) {
    var m = F3(n[a]), k = t;
    if (m === "__proto__" || m === "constructor" || m === "prototype")
      return e;
    if (a != d) {
      var g = u[m];
      k = r ? r(g, m, u) : void 0, k === void 0 && (k = er(g) ? g : B3(n[a + 1]) ? [] : {});
    }
    I3(u, m, k), u = u[m];
  }
  return e;
}
var z3 = U3, K3 = z3;
function j3(e, n, t) {
  return e == null ? e : K3(e, n, t);
}
var Q3 = j3;
const $0 = /* @__PURE__ */ Ur(Q3);
var R3 = t0;
function Z3() {
  this.__data__ = new R3(), this.size = 0;
}
var V3 = Z3;
function H3(e) {
  var n = this.__data__, t = n.delete(e);
  return this.size = n.size, t;
}
var q3 = H3;
function Y3(e) {
  return this.__data__.get(e);
}
var G3 = Y3;
function W3(e) {
  return this.__data__.has(e);
}
var X3 = W3, J3 = t0, eo = P0, to = Vr, no = 200;
function ro(e, n) {
  var t = this.__data__;
  if (t instanceof J3) {
    var r = t.__data__;
    if (!eo || r.length < no - 1)
      return r.push([e, n]), this.size = ++t.size, this;
    t = this.__data__ = new to(r);
  }
  return t.set(e, n), this.size = t.size, this;
}
var oo = ro, io = t0, ao = V3, so = q3, lo = G3, co = X3, uo = oo;
function W1(e) {
  var n = this.__data__ = new io(e);
  this.size = n.size;
}
W1.prototype.clear = ao;
W1.prototype.delete = so;
W1.prototype.get = lo;
W1.prototype.has = co;
W1.prototype.set = uo;
var ho = W1;
function fo(e, n) {
  for (var t = -1, r = e == null ? 0 : e.length; ++t < r && n(e[t], t, e) !== !1; )
    ;
  return e;
}
var yo = fo, go = T0, mo = Rr;
function po(e, n, t, r) {
  var a = !t;
  t || (t = {});
  for (var s = -1, d = n.length; ++s < d; ) {
    var u = n[s], m = r ? r(t[u], e[u], u, t, e) : void 0;
    m === void 0 && (m = e[u]), a ? mo(t, u, m) : go(t, u, m);
  }
  return t;
}
var r0 = po;
function vo(e, n) {
  for (var t = -1, r = Array(e); ++t < e; )
    r[t] = n(t);
  return r;
}
var Co = vo, $o = yt, bo = H1, _o = "[object Arguments]";
function ko(e) {
  return bo(e) && $o(e) == _o;
}
var xo = ko, tr = xo, Lo = H1, Gr = Object.prototype, wo = Gr.hasOwnProperty, Ao = Gr.propertyIsEnumerable, Mo = tr(function() {
  return arguments;
}()) ? tr : function(e) {
  return Lo(e) && wo.call(e, "callee") && !Ao.call(e, "callee");
}, To = Mo, Vt = { exports: {} };
function So() {
  return !1;
}
var Po = So;
Vt.exports;
(function(e, n) {
  var t = a1, r = Po, a = n && !n.nodeType && n, s = a && !0 && e && !e.nodeType && e, d = s && s.exports === a, u = d ? t.Buffer : void 0, m = u ? u.isBuffer : void 0, k = m || r;
  e.exports = k;
})(Vt, Vt.exports);
var Wr = Vt.exports, Oo = 9007199254740991;
function Do(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Oo;
}
var Xr = Do, No = yt, Io = Xr, Eo = H1, Bo = "[object Arguments]", Fo = "[object Array]", Uo = "[object Boolean]", zo = "[object Date]", Ko = "[object Error]", jo = "[object Function]", Qo = "[object Map]", Ro = "[object Number]", Zo = "[object Object]", Vo = "[object RegExp]", Ho = "[object Set]", qo = "[object String]", Yo = "[object WeakMap]", Go = "[object ArrayBuffer]", Wo = "[object DataView]", Xo = "[object Float32Array]", Jo = "[object Float64Array]", ei = "[object Int8Array]", ti = "[object Int16Array]", ni = "[object Int32Array]", ri = "[object Uint8Array]", oi = "[object Uint8ClampedArray]", ii = "[object Uint16Array]", ai = "[object Uint32Array]", ye = {};
ye[Xo] = ye[Jo] = ye[ei] = ye[ti] = ye[ni] = ye[ri] = ye[oi] = ye[ii] = ye[ai] = !0;
ye[Bo] = ye[Fo] = ye[Go] = ye[Uo] = ye[Wo] = ye[zo] = ye[Ko] = ye[jo] = ye[Qo] = ye[Ro] = ye[Zo] = ye[Vo] = ye[Ho] = ye[qo] = ye[Yo] = !1;
function si(e) {
  return Eo(e) && Io(e.length) && !!ye[No(e)];
}
var li = si;
function ci(e) {
  return function(n) {
    return e(n);
  };
}
var D0 = ci, Ht = { exports: {} };
Ht.exports;
(function(e, n) {
  var t = zr, r = n && !n.nodeType && n, a = r && !0 && e && !e.nodeType && e, s = a && a.exports === r, d = s && t.process, u = function() {
    try {
      var m = a && a.require && a.require("util").types;
      return m || d && d.binding && d.binding("util");
    } catch {
    }
  }();
  e.exports = u;
})(Ht, Ht.exports);
var N0 = Ht.exports, ui = li, di = D0, nr = N0, rr = nr && nr.isTypedArray, hi = rr ? di(rr) : ui, fi = hi, yi = Co, gi = To, mi = V1, pi = Wr, vi = Yr, Ci = fi, $i = Object.prototype, bi = $i.hasOwnProperty;
function _i(e, n) {
  var t = mi(e), r = !t && gi(e), a = !t && !r && pi(e), s = !t && !r && !a && Ci(e), d = t || r || a || s, u = d ? yi(e.length, String) : [], m = u.length;
  for (var k in e)
    (n || bi.call(e, k)) && !(d && // Safari 9 has enumerable `arguments.length` in strict mode.
    (k == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    a && (k == "offset" || k == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    s && (k == "buffer" || k == "byteLength" || k == "byteOffset") || // Skip index properties.
    vi(k, m))) && u.push(k);
  return u;
}
var Jr = _i, ki = Object.prototype;
function xi(e) {
  var n = e && e.constructor, t = typeof n == "function" && n.prototype || ki;
  return e === t;
}
var I0 = xi;
function Li(e, n) {
  return function(t) {
    return e(n(t));
  };
}
var e9 = Li, wi = e9, Ai = wi(Object.keys, Object), Mi = Ai, Ti = I0, Si = Mi, Pi = Object.prototype, Oi = Pi.hasOwnProperty;
function Di(e) {
  if (!Ti(e))
    return Si(e);
  var n = [];
  for (var t in Object(e))
    Oi.call(e, t) && t != "constructor" && n.push(t);
  return n;
}
var Ni = Di, Ii = jr, Ei = Xr;
function Bi(e) {
  return e != null && Ei(e.length) && !Ii(e);
}
var t9 = Bi, Fi = Jr, Ui = Ni, zi = t9;
function Ki(e) {
  return zi(e) ? Fi(e) : Ui(e);
}
var E0 = Ki, ji = r0, Qi = E0;
function Ri(e, n) {
  return e && ji(n, Qi(n), e);
}
var Zi = Ri;
function Vi(e) {
  var n = [];
  if (e != null)
    for (var t in Object(e))
      n.push(t);
  return n;
}
var Hi = Vi, qi = Z1, Yi = I0, Gi = Hi, Wi = Object.prototype, Xi = Wi.hasOwnProperty;
function Ji(e) {
  if (!qi(e))
    return Gi(e);
  var n = Yi(e), t = [];
  for (var r in e)
    r == "constructor" && (n || !Xi.call(e, r)) || t.push(r);
  return t;
}
var e8 = Ji, t8 = Jr, n8 = e8, r8 = t9;
function o8(e) {
  return r8(e) ? t8(e, !0) : n8(e);
}
var B0 = o8, i8 = r0, a8 = B0;
function s8(e, n) {
  return e && i8(n, a8(n), e);
}
var l8 = s8, qt = { exports: {} };
qt.exports;
(function(e, n) {
  var t = a1, r = n && !n.nodeType && n, a = r && !0 && e && !e.nodeType && e, s = a && a.exports === r, d = s ? t.Buffer : void 0, u = d ? d.allocUnsafe : void 0;
  function m(k, g) {
    if (g)
      return k.slice();
    var w = k.length, A = u ? u(w) : new k.constructor(w);
    return k.copy(A), A;
  }
  e.exports = m;
})(qt, qt.exports);
var c8 = qt.exports;
function u8(e, n) {
  var t = -1, r = e.length;
  for (n || (n = Array(r)); ++t < r; )
    n[t] = e[t];
  return n;
}
var d8 = u8;
function h8(e, n) {
  for (var t = -1, r = e == null ? 0 : e.length, a = 0, s = []; ++t < r; ) {
    var d = e[t];
    n(d, t, e) && (s[a++] = d);
  }
  return s;
}
var f8 = h8;
function y8() {
  return [];
}
var n9 = y8, g8 = f8, m8 = n9, p8 = Object.prototype, v8 = p8.propertyIsEnumerable, or = Object.getOwnPropertySymbols, C8 = or ? function(e) {
  return e == null ? [] : (e = Object(e), g8(or(e), function(n) {
    return v8.call(e, n);
  }));
} : m8, F0 = C8, $8 = r0, b8 = F0;
function _8(e, n) {
  return $8(e, b8(e), n);
}
var k8 = _8;
function x8(e, n) {
  for (var t = -1, r = n.length, a = e.length; ++t < r; )
    e[a + t] = n[t];
  return e;
}
var r9 = x8, L8 = e9, w8 = L8(Object.getPrototypeOf, Object), o9 = w8, A8 = r9, M8 = o9, T8 = F0, S8 = n9, P8 = Object.getOwnPropertySymbols, O8 = P8 ? function(e) {
  for (var n = []; e; )
    A8(n, T8(e)), e = M8(e);
  return n;
} : S8, i9 = O8, D8 = r0, N8 = i9;
function I8(e, n) {
  return D8(e, N8(e), n);
}
var E8 = I8, B8 = r9, F8 = V1;
function U8(e, n, t) {
  var r = n(e);
  return F8(e) ? r : B8(r, t(e));
}
var a9 = U8, z8 = a9, K8 = F0, j8 = E0;
function Q8(e) {
  return z8(e, j8, K8);
}
var R8 = Q8, Z8 = a9, V8 = i9, H8 = B0;
function q8(e) {
  return Z8(e, H8, V8);
}
var Y8 = q8, G8 = E1, W8 = a1, X8 = G8(W8, "DataView"), J8 = X8, ea = E1, ta = a1, na = ea(ta, "Promise"), ra = na, oa = E1, ia = a1, aa = oa(ia, "Set"), sa = aa, la = E1, ca = a1, ua = la(ca, "WeakMap"), da = ua, b0 = J8, _0 = P0, k0 = ra, x0 = sa, L0 = da, s9 = yt, X1 = Qr, ir = "[object Map]", ha = "[object Object]", ar = "[object Promise]", sr = "[object Set]", lr = "[object WeakMap]", cr = "[object DataView]", fa = X1(b0), ya = X1(_0), ga = X1(k0), ma = X1(x0), pa = X1(L0), S1 = s9;
(b0 && S1(new b0(new ArrayBuffer(1))) != cr || _0 && S1(new _0()) != ir || k0 && S1(k0.resolve()) != ar || x0 && S1(new x0()) != sr || L0 && S1(new L0()) != lr) && (S1 = function(e) {
  var n = s9(e), t = n == ha ? e.constructor : void 0, r = t ? X1(t) : "";
  if (r)
    switch (r) {
      case fa:
        return cr;
      case ya:
        return ir;
      case ga:
        return ar;
      case ma:
        return sr;
      case pa:
        return lr;
    }
  return n;
});
var U0 = S1, va = Object.prototype, Ca = va.hasOwnProperty;
function $a(e) {
  var n = e.length, t = new e.constructor(n);
  return n && typeof e[0] == "string" && Ca.call(e, "index") && (t.index = e.index, t.input = e.input), t;
}
var ba = $a, _a = a1, ka = _a.Uint8Array, xa = ka, ur = xa;
function La(e) {
  var n = new e.constructor(e.byteLength);
  return new ur(n).set(new ur(e)), n;
}
var z0 = La, wa = z0;
function Aa(e, n) {
  var t = n ? wa(e.buffer) : e.buffer;
  return new e.constructor(t, e.byteOffset, e.byteLength);
}
var Ma = Aa, Ta = /\w*$/;
function Sa(e) {
  var n = new e.constructor(e.source, Ta.exec(e));
  return n.lastIndex = e.lastIndex, n;
}
var Pa = Sa, dr = Xt, hr = dr ? dr.prototype : void 0, fr = hr ? hr.valueOf : void 0;
function Oa(e) {
  return fr ? Object(fr.call(e)) : {};
}
var Da = Oa, Na = z0;
function Ia(e, n) {
  var t = n ? Na(e.buffer) : e.buffer;
  return new e.constructor(t, e.byteOffset, e.length);
}
var Ea = Ia, Ba = z0, Fa = Ma, Ua = Pa, za = Da, Ka = Ea, ja = "[object Boolean]", Qa = "[object Date]", Ra = "[object Map]", Za = "[object Number]", Va = "[object RegExp]", Ha = "[object Set]", qa = "[object String]", Ya = "[object Symbol]", Ga = "[object ArrayBuffer]", Wa = "[object DataView]", Xa = "[object Float32Array]", Ja = "[object Float64Array]", e7 = "[object Int8Array]", t7 = "[object Int16Array]", n7 = "[object Int32Array]", r7 = "[object Uint8Array]", o7 = "[object Uint8ClampedArray]", i7 = "[object Uint16Array]", a7 = "[object Uint32Array]";
function s7(e, n, t) {
  var r = e.constructor;
  switch (n) {
    case Ga:
      return Ba(e);
    case ja:
    case Qa:
      return new r(+e);
    case Wa:
      return Fa(e, t);
    case Xa:
    case Ja:
    case e7:
    case t7:
    case n7:
    case r7:
    case o7:
    case i7:
    case a7:
      return Ka(e, t);
    case Ra:
      return new r();
    case Za:
    case qa:
      return new r(e);
    case Va:
      return Ua(e);
    case Ha:
      return new r();
    case Ya:
      return za(e);
  }
}
var l7 = s7, c7 = Z1, yr = Object.create, u7 = function() {
  function e() {
  }
  return function(n) {
    if (!c7(n))
      return {};
    if (yr)
      return yr(n);
    e.prototype = n;
    var t = new e();
    return e.prototype = void 0, t;
  };
}(), d7 = u7, h7 = d7, f7 = o9, y7 = I0;
function g7(e) {
  return typeof e.constructor == "function" && !y7(e) ? h7(f7(e)) : {};
}
var m7 = g7, p7 = U0, v7 = H1, C7 = "[object Map]";
function $7(e) {
  return v7(e) && p7(e) == C7;
}
var b7 = $7, _7 = b7, k7 = D0, gr = N0, mr = gr && gr.isMap, x7 = mr ? k7(mr) : _7, L7 = x7, w7 = U0, A7 = H1, M7 = "[object Set]";
function T7(e) {
  return A7(e) && w7(e) == M7;
}
var S7 = T7, P7 = S7, O7 = D0, pr = N0, vr = pr && pr.isSet, D7 = vr ? O7(vr) : P7, N7 = D7, I7 = ho, E7 = yo, B7 = T0, F7 = Zi, U7 = l8, z7 = c8, K7 = d8, j7 = k8, Q7 = E8, R7 = R8, Z7 = Y8, V7 = U0, H7 = ba, q7 = l7, Y7 = m7, G7 = V1, W7 = Wr, X7 = L7, J7 = Z1, es = N7, ts = E0, ns = B0, rs = 1, os = 2, is = 4, l9 = "[object Arguments]", as = "[object Array]", ss = "[object Boolean]", ls = "[object Date]", cs = "[object Error]", c9 = "[object Function]", us = "[object GeneratorFunction]", ds = "[object Map]", hs = "[object Number]", u9 = "[object Object]", fs = "[object RegExp]", ys = "[object Set]", gs = "[object String]", ms = "[object Symbol]", ps = "[object WeakMap]", vs = "[object ArrayBuffer]", Cs = "[object DataView]", $s = "[object Float32Array]", bs = "[object Float64Array]", _s = "[object Int8Array]", ks = "[object Int16Array]", xs = "[object Int32Array]", Ls = "[object Uint8Array]", ws = "[object Uint8ClampedArray]", As = "[object Uint16Array]", Ms = "[object Uint32Array]", fe = {};
fe[l9] = fe[as] = fe[vs] = fe[Cs] = fe[ss] = fe[ls] = fe[$s] = fe[bs] = fe[_s] = fe[ks] = fe[xs] = fe[ds] = fe[hs] = fe[u9] = fe[fs] = fe[ys] = fe[gs] = fe[ms] = fe[Ls] = fe[ws] = fe[As] = fe[Ms] = !0;
fe[cs] = fe[c9] = fe[ps] = !1;
function zt(e, n, t, r, a, s) {
  var d, u = n & rs, m = n & os, k = n & is;
  if (t && (d = a ? t(e, r, a, s) : t(e)), d !== void 0)
    return d;
  if (!J7(e))
    return e;
  var g = G7(e);
  if (g) {
    if (d = H7(e), !u)
      return K7(e, d);
  } else {
    var w = V7(e), A = w == c9 || w == us;
    if (W7(e))
      return z7(e, u);
    if (w == u9 || w == l9 || A && !a) {
      if (d = m || A ? {} : Y7(e), !u)
        return m ? Q7(e, U7(d, e)) : j7(e, F7(d, e));
    } else {
      if (!fe[w])
        return a ? e : {};
      d = q7(e, w, u);
    }
  }
  s || (s = new I7());
  var O = s.get(e);
  if (O)
    return O;
  s.set(e, d), es(e) ? e.forEach(function(D) {
    d.add(zt(D, n, t, D, e, s));
  }) : X7(e) && e.forEach(function(D, K) {
    d.set(K, zt(D, n, t, K, e, s));
  });
  var F = k ? m ? Z7 : R7 : m ? ns : ts, E = g ? void 0 : F(e);
  return E7(E || e, function(D, K) {
    E && (K = D, D = e[K]), B7(d, K, zt(D, n, t, K, e, s));
  }), d;
}
var Ts = zt, Ss = Ts, Ps = 1, Os = 4;
function Ds(e) {
  return Ss(e, Ps | Os);
}
var Ns = Ds;
const Is = /* @__PURE__ */ Ur(Ns), Es = /* @__PURE__ */ $("<button></button>"), Bs = (e) => (() => {
  const n = Es.cloneNode(!0);
  return i1(n, "click", e.onClick, !0), p(n, () => e.children), I((t) => {
    const r = e.style, a = `klinecharts-pro-button ${e.type ?? "confirm"} ${e.class ?? ""}`;
    return t._v$ = I1(n, r, t._v$), a !== t._v$2 && re(n, t._v$2 = a), t;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), n;
})();
Qe(["click"]);
const Fs = /* @__PURE__ */ $('<svg viewBox="0 0 1024 1024" class="icon"><path d="M810.666667 128H213.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v597.333334c0 46.933333 38.4 85.333333 85.333333 85.333333h597.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V213.333333c0-46.933333-38.4-85.333333-85.333333-85.333333z m-353.706667 567.04a42.496 42.496 0 0 1-60.16 0L243.626667 541.866667c-8.106667-8.106667-12.373333-18.773333-12.373334-29.866667s4.693333-22.186667 12.373334-29.866667a42.496 42.496 0 0 1 60.16 0L426.666667 604.586667l293.546666-293.546667a42.496 42.496 0 1 1 60.16 60.16l-323.413333 323.84z"></path></svg>'), Us = /* @__PURE__ */ $('<svg viewBox="0 0 1024 1024" class="icon"><path d="M245.333333 128h533.333334A117.333333 117.333333 0 0 1 896 245.333333v533.333334A117.333333 117.333333 0 0 1 778.666667 896H245.333333A117.333333 117.333333 0 0 1 128 778.666667V245.333333A117.333333 117.333333 0 0 1 245.333333 128z m0 64c-29.44 0-53.333333 23.893333-53.333333 53.333333v533.333334c0 29.44 23.893333 53.333333 53.333333 53.333333h533.333334c29.44 0 53.333333-23.893333 53.333333-53.333333V245.333333c0-29.44-23.893333-53.333333-53.333333-53.333333H245.333333z"></path></svg>'), zs = /* @__PURE__ */ $("<div></div>"), Ks = /* @__PURE__ */ $('<span class="label"></span>'), js = () => Fs.cloneNode(!0), Qs = () => Us.cloneNode(!0), Cr = (e) => {
  const [n, t] = T(e.checked ?? !1);
  return Ue(() => {
    "checked" in e && t(e.checked);
  }), (() => {
    const r = zs.cloneNode(!0);
    return r.$$click = (a) => {
      const s = !n();
      e.onChange && e.onChange(s), t(s);
    }, p(r, (() => {
      const a = R(() => !!n());
      return () => a() ? L(js, {}) : L(Qs, {});
    })(), null), p(r, (() => {
      const a = R(() => !!e.label);
      return () => a() && (() => {
        const s = Ks.cloneNode(!0);
        return p(s, () => e.label), s;
      })();
    })(), null), I((a) => {
      const s = e.style, d = `klinecharts-pro-checkbox ${n() && "checked" || ""} ${e.class || ""}`;
      return a._v$ = I1(r, s, a._v$), d !== a._v$2 && re(r, a._v$2 = d), a;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), r;
  })();
};
Qe(["click"]);
const Rs = /* @__PURE__ */ $('<div class="klinecharts-pro-loading"><i class="circle1"></i><i class="circle2"></i><i class="circle3"></i></div>'), d9 = () => Rs.cloneNode(!0), Zs = /* @__PURE__ */ $('<div class="klinecharts-pro-empty"><svg class="icon" viewBox="0 0 1024 1024"><path d="M855.6 427.2H168.5c-12.7 0-24.4 6.9-30.6 18L4.4 684.7C1.5 689.9 0 695.8 0 701.8v287.1c0 19.4 15.7 35.1 35.1 35.1H989c19.4 0 35.1-15.7 35.1-35.1V701.8c0-6-1.5-11.8-4.4-17.1L886.2 445.2c-6.2-11.1-17.9-18-30.6-18zM673.4 695.6c-16.5 0-30.8 11.5-34.3 27.7-12.7 58.5-64.8 102.3-127.2 102.3s-114.5-43.8-127.2-102.3c-3.5-16.1-17.8-27.7-34.3-27.7H119c-26.4 0-43.3-28-31.1-51.4l81.7-155.8c6.1-11.6 18-18.8 31.1-18.8h622.4c13 0 25 7.2 31.1 18.8l81.7 155.8c12.2 23.4-4.7 51.4-31.1 51.4H673.4zM819.9 209.5c-1-1.8-2.1-3.7-3.2-5.5-9.8-16.6-31.1-22.2-47.8-12.6L648.5 261c-17 9.8-22.7 31.6-12.6 48.4 0.9 1.4 1.7 2.9 2.5 4.4 9.5 17 31.2 22.8 48 13L807 257.3c16.7-9.7 22.4-31 12.9-47.8zM375.4 261.1L255 191.6c-16.7-9.6-38-4-47.8 12.6-1.1 1.8-2.1 3.6-3.2 5.5-9.5 16.8-3.8 38.1 12.9 47.8L337.3 327c16.9 9.7 38.6 4 48-13.1 0.8-1.5 1.7-2.9 2.5-4.4 10.2-16.8 4.5-38.6-12.4-48.4zM512 239.3h2.5c19.5 0.3 35.5-15.5 35.5-35.1v-139c0-19.3-15.6-34.9-34.8-35.1h-6.4C489.6 30.3 474 46 474 65.2v139c0 19.5 15.9 35.4 35.5 35.1h2.5z"></path></svg></div>'), Vs = () => Zs.cloneNode(!0), Hs = /* @__PURE__ */ $("<ul></ul>"), qs = /* @__PURE__ */ $("<li></li>"), Yt = (e) => (() => {
  const n = Hs.cloneNode(!0);
  return p(n, L(J, {
    get when() {
      return e.loading;
    },
    get children() {
      return L(d9, {});
    }
  }), null), p(n, L(J, {
    get when() {
      var t;
      return !e.loading && !e.children && !((t = e.dataSource) != null && t.length);
    },
    get children() {
      return L(Vs, {});
    }
  }), null), p(n, L(J, {
    get when() {
      return e.children;
    },
    get children() {
      return e.children;
    }
  }), null), p(n, L(J, {
    get when() {
      return !e.children;
    },
    get children() {
      var t;
      return (t = e.dataSource) == null ? void 0 : t.map((r) => {
        var a;
        return ((a = e.renderItem) == null ? void 0 : a.call(e, r)) ?? qs.cloneNode(!0);
      });
    }
  }), null), I((t) => {
    const r = e.style, a = `klinecharts-pro-list ${e.class ?? ""}`;
    return t._v$ = I1(n, r, t._v$), a !== t._v$2 && re(n, t._v$2 = a), t;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), n;
})(), Ys = /* @__PURE__ */ $('<div class="klinecharts-pro-modal"><div class="inner"><div class="title-container"><svg class="close-icon" viewBox="0 0 1024 1024"><path d="M934.184927 199.723787 622.457206 511.452531l311.727721 311.703161c14.334473 14.229073 23.069415 33.951253 23.069415 55.743582 0 43.430138-35.178197 78.660524-78.735226 78.660524-21.664416 0-41.361013-8.865925-55.642275-23.069415L511.149121 622.838388 199.420377 934.490384c-14.204513 14.20349-33.901111 23.069415-55.642275 23.069415-43.482327 0-78.737272-35.230386-78.737272-78.660524 0-21.792329 8.864902-41.513486 23.094998-55.743582l311.677579-311.703161L88.135828 199.723787c-14.230096-14.255679-23.094998-33.92567-23.094998-55.642275 0-43.430138 35.254945-78.762855 78.737272-78.762855 21.741163 0 41.437761 8.813736 55.642275 23.069415l311.727721 311.727721L822.876842 88.389096c14.281261-14.255679 33.977859-23.069415 55.642275-23.069415 43.557028 0 78.735226 35.332716 78.735226 78.762855C957.254342 165.798117 948.5194 185.468109 934.184927 199.723787"></path></svg></div><div class="content-container"></div></div></div>'), Gs = /* @__PURE__ */ $('<div class="button-container"></div>'), C1 = (e) => (() => {
  const n = Ys.cloneNode(!0), t = n.firstChild, r = t.firstChild, a = r.firstChild, s = r.nextSibling;
  return n.$$click = (d) => {
    d.target === d.currentTarget && e.onClose && e.onClose();
  }, p(r, () => e.title, a), i1(a, "click", e.onClose, !0), p(s, () => e.children), p(t, (() => {
    const d = R(() => !!(e.buttons && e.buttons.length > 0));
    return () => d() && (() => {
      const u = Gs.cloneNode(!0);
      return p(u, () => e.buttons.map((m) => L(Bs, Fr(m, {
        get style() {
          return {
            ...e.minButtonWidth ? {
              "min-width": `${e.minButtonWidth}px`
            } : {},
            width: e.isMobile ? "100%" : "auto"
          };
        },
        get children() {
          return m.children;
        }
      })))), I((m) => {
        const k = e.btnParentStyle, g = !!e.isMobile;
        return m._v$8 = I1(u, k, m._v$8), g !== m._v$9 && u.classList.toggle("mobile-buttons", m._v$9 = g), m;
      }, {
        _v$8: void 0,
        _v$9: void 0
      }), u;
    })();
  })(), null), I((d) => {
    const u = !!e.isMobile, m = e.isMobile ? "100%" : `${e.width ?? 400}px`, k = (e.isMobile, "auto"), g = e.isMobile ? "60vh" : "90vh", w = !!e.isMobile, A = !!e.isMobile, O = !!e.isMobile;
    return u !== d._v$ && n.classList.toggle("mobile-modal", d._v$ = u), m !== d._v$2 && t.style.setProperty("width", d._v$2 = m), k !== d._v$3 && t.style.setProperty("height", d._v$3 = k), g !== d._v$4 && t.style.setProperty("max-height", d._v$4 = g), w !== d._v$5 && t.classList.toggle("mobile-inner", d._v$5 = w), A !== d._v$6 && r.classList.toggle("mobile-title", d._v$6 = A), O !== d._v$7 && s.classList.toggle("mobile-content", d._v$7 = O), d;
  }, {
    _v$: void 0,
    _v$2: void 0,
    _v$3: void 0,
    _v$4: void 0,
    _v$5: void 0,
    _v$6: void 0,
    _v$7: void 0
  }), n;
})();
Qe(["click"]);
const Ws = /* @__PURE__ */ $('<div tabindex="0"><div class="selector-container"><span class="value"></span><i class="arrow"></i></div></div>'), Xs = /* @__PURE__ */ $('<div class="drop-down-container"><ul></ul></div>'), Js = /* @__PURE__ */ $('<div><input type="text"></div>'), e4 = /* @__PURE__ */ $("<li></li>"), h9 = (e) => {
  const [n, t] = T(!1), [r, a] = T("");
  let s, d;
  const u = R(() => {
    if (!e.dataSource || !e.searchable)
      return e.dataSource;
    const g = r().toLowerCase().trim();
    return g ? typeof e.dataSource[0] == "string" ? e.dataSource.filter((A) => A.toLowerCase().includes(g)) : e.dataSource.filter((A) => {
      var E, D;
      const O = ((E = A.text) == null ? void 0 : E.toString().toLowerCase()) || "", F = ((D = A.key) == null ? void 0 : D.toLowerCase()) || "";
      return O.includes(g) || F.includes(g);
    }) : e.dataSource;
  }), m = () => {
    const g = !n();
    t(g), a(""), g && e.searchable && setTimeout(() => s == null ? void 0 : s.focus(), 50);
  }, k = (g) => {
    const w = g.relatedTarget;
    d && w && d.contains(w) || (t(!1), a(""));
  };
  return (() => {
    const g = Ws.cloneNode(!0), w = g.firstChild, A = w.firstChild;
    g.addEventListener("blur", k), g.$$click = (F) => {
      F.stopPropagation(), m();
    };
    const O = d;
    return typeof O == "function" ? D1(O, g) : d = g, p(A, () => e.value), p(g, (() => {
      const F = R(() => !!(e.dataSource && e.dataSource.length > 0));
      return () => F() && (() => {
        const E = Xs.cloneNode(!0), D = E.firstChild;
        return E.$$mousedown = (K) => K.preventDefault(), p(E, (() => {
          const K = R(() => !!e.searchable);
          return () => K() && (() => {
            const X = Js.cloneNode(!0), U = X.firstChild;
            X.style.setProperty("padding", "8px"), X.style.setProperty("border-bottom", "1px solid #333"), U.$$click = (Z) => Z.stopPropagation(), U.$$input = (Z) => a(Z.currentTarget.value);
            const Y = s;
            return typeof Y == "function" ? D1(Y, U) : s = U, U.style.setProperty("width", "100%"), U.style.setProperty("padding", "6px 10px"), U.style.setProperty("border", "1px solid var(--klinecharts-pro-border-color)"), U.style.setProperty("border-radius", "4px"), U.style.setProperty("background-color", "var(--klinecharts-pro-popover-background-color)"), U.style.setProperty("color", "#fff"), U.style.setProperty("font-size", "13px"), U.style.setProperty("outline", "none"), I(() => Se(U, "placeholder", e.searchPlaceholder || "Search...")), I(() => U.value = r()), X;
          })();
        })(), D), p(D, () => {
          var K;
          return (K = u()) == null ? void 0 : K.map((X) => {
            const Y = X[e.valueKey ?? "text"] ?? X;
            return (() => {
              const Z = e4.cloneNode(!0);
              return Z.$$click = (ce) => {
                var j;
                ce.stopPropagation(), e.value !== Y && ((j = e.onSelected) == null || j.call(e, X)), t(!1), a("");
              }, p(Z, Y), I(() => Z.classList.toggle("selected", e.value === Y)), Z;
            })();
          });
        }), E;
      })();
    })(), null), I((F) => {
      const E = e.style, D = `klinecharts-pro-select ${e.class ?? ""} ${n() ? "klinecharts-pro-select-show" : ""}`;
      return F._v$ = I1(g, E, F._v$), D !== F._v$2 && re(g, F._v$2 = D), F;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), g;
  })();
};
Qe(["click", "mousedown", "input"]);
const t4 = /* @__PURE__ */ $('<span class="prefix"></span>'), n4 = /* @__PURE__ */ $('<span class="suffix"></span>'), r4 = /* @__PURE__ */ $('<div><input class="value"></div>'), f9 = (e) => {
  const n = Fr({
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER
  }, e);
  let t;
  const [r, a] = T("normal");
  return (() => {
    const s = r4.cloneNode(!0), d = s.firstChild;
    return s.$$click = () => {
      t == null || t.focus();
    }, p(s, L(J, {
      get when() {
        return n.prefix;
      },
      get children() {
        const u = t4.cloneNode(!0);
        return p(u, () => n.prefix), u;
      }
    }), d), d.addEventListener("change", (u) => {
      var k, g;
      const m = u.target.value;
      if ("precision" in n) {
        let w;
        const A = Math.max(0, Math.floor(n.precision));
        A <= 0 ? w = new RegExp(/^[1-9]\d*$/) : w = new RegExp("^\\d+\\.?\\d{0," + A + "}$"), (m === "" || w.test(m) && +m >= n.min && +m <= n.max) && ((k = n.onChange) == null || k.call(n, m === "" ? m : +m));
      } else
        (g = n.onChange) == null || g.call(n, m);
    }), d.addEventListener("blur", () => {
      a("normal");
    }), d.addEventListener("focus", () => {
      a("focus");
    }), D1((u) => {
      t = u;
    }, d), p(s, L(J, {
      get when() {
        return n.suffix;
      },
      get children() {
        const u = n4.cloneNode(!0);
        return p(u, () => n.suffix), u;
      }
    }), null), I((u) => {
      const m = n.style, k = `klinecharts-pro-input ${n.class ?? ""}`, g = r(), w = n.placeholder ?? "";
      return u._v$ = I1(s, m, u._v$), k !== u._v$2 && re(s, u._v$2 = k), g !== u._v$3 && Se(s, "data-status", u._v$3 = g), w !== u._v$4 && Se(d, "placeholder", u._v$4 = w), u;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0
    }), I(() => d.value = n.value), s;
  })();
};
Qe(["click"]);
const o4 = /* @__PURE__ */ $('<div><i class="thumb"></i></div>'), i4 = (e) => (() => {
  const n = o4.cloneNode(!0);
  return n.$$click = (t) => {
    e.onChange && e.onChange();
  }, I((t) => {
    const r = e.style, a = `klinecharts-pro-switch ${e.open ? "turn-on" : "turn-off"} ${e.class ?? ""}`;
    return t._v$ = I1(n, r, t._v$), a !== t._v$2 && re(n, t._v$2 = a), t;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), n;
})();
Qe(["click"]);
const a4 = "指标", s4 = "更多", l4 = "主图指标", c4 = "副图指标", u4 = "设置", d4 = "时区", h4 = "截屏", f4 = "全屏", y4 = "退出全屏", g4 = "保存", m4 = "确定", p4 = "取消", v4 = "MA(移动平均线)", C4 = "EMA(指数平滑移动平均线)", $4 = "SMA", b4 = "BOLL(布林线)", _4 = "BBI(多空指数)", k4 = "SAR(停损点指向指标)", x4 = "VOL(成交量)", L4 = "MACD(指数平滑异同移动平均线)", w4 = "KDJ(随机指标)", A4 = "RSI(相对强弱指标)", M4 = "BIAS(乖离率)", T4 = "BRAR(情绪指标)", S4 = "CCI(顺势指标)", P4 = "DMI(动向指标)", O4 = "CR(能量指标)", D4 = "PSY(心理线)", N4 = "DMA(平行线差指标)", I4 = "TRIX(三重指数平滑平均线)", E4 = "OBV(能量潮指标)", B4 = "VR(成交量变异率)", F4 = "WR(威廉指标)", U4 = "MTM(动量指标)", z4 = "EMV(简易波动指标)", K4 = "ROC(变动率指标)", j4 = "PVT(价量趋势指标)", Q4 = "AO(动量震荡指标)", R4 = "世界统一时间", Z4 = "(UTC-10) 檀香山", V4 = "(UTC-8) 朱诺", H4 = "(UTC-7) 洛杉矶", q4 = "(UTC-5) 芝加哥", Y4 = "(UTC-4) 多伦多", G4 = "(UTC-3) 圣保罗", W4 = "(UTC+1) 伦敦", X4 = "(UTC+2) 柏林", J4 = "(UTC+3) 巴林", el = "(UTC+4) 迪拜", tl = "(UTC+5) 阿什哈巴德", nl = "(UTC+6) 阿拉木图", rl = "(UTC+7) 曼谷", ol = "(UTC+8) 上海", il = "(UTC+9) 东京", al = "(UTC+10) 悉尼", sl = "(UTC+12) 诺福克岛", ll = "水平直线", cl = "水平射线", ul = "水平线段", dl = "垂直直线", hl = "垂直射线", fl = "垂直线段", yl = "直线", gl = "射线", ml = "线段", pl = "箭头", vl = "价格线", Cl = "价格通道线", $l = "平行直线", bl = "斐波那契回调直线", _l = "斐波那契回调线段", kl = "斐波那契圆环", xl = "斐波那契螺旋", Ll = "斐波那契速度阻力扇", wl = "斐波那契趋势扩展", Al = "江恩箱", Ml = "矩形", Tl = "平行四边形", Sl = "圆", Pl = "三角形", Ol = "三浪", Dl = "五浪", Nl = "八浪", Il = "任意浪", El = "ABCD形态", Bl = "XABCD形态", Fl = "弱磁模式", Ul = "强磁模式", zl = "商品搜索", Kl = "商品代码", jl = "参数1", Ql = "参数2", Rl = "参数3", Zl = "参数4", Vl = "参数5", Hl = "周期", ql = "标准差", Yl = "蜡烛图类型", Gl = "全实心", Wl = "全空心", Xl = "涨空心", Jl = "跌空心", ec = "OHLC", tc = "面积图", nc = "最新价显示", rc = "最高价显示", oc = "最低价显示", ic = "指标最新值显示", ac = "价格轴类型", sc = "线性轴", lc = "百分比轴", cc = "对数轴", uc = "倒置坐标", dc = "网格线显示", hc = "恢复默认", fc = {
  indicator: a4,
  more: s4,
  main_indicator: l4,
  sub_indicator: c4,
  setting: u4,
  timezone: d4,
  screenshot: h4,
  full_screen: f4,
  exit_full_screen: y4,
  save: g4,
  confirm: m4,
  cancel: p4,
  ma: v4,
  ema: C4,
  sma: $4,
  boll: b4,
  bbi: _4,
  sar: k4,
  vol: x4,
  macd: L4,
  kdj: w4,
  rsi: A4,
  bias: M4,
  brar: T4,
  cci: S4,
  dmi: P4,
  cr: O4,
  psy: D4,
  dma: N4,
  trix: I4,
  obv: E4,
  vr: B4,
  wr: F4,
  mtm: U4,
  emv: z4,
  roc: K4,
  pvt: j4,
  ao: Q4,
  utc: R4,
  honolulu: Z4,
  juneau: V4,
  los_angeles: H4,
  chicago: q4,
  toronto: Y4,
  sao_paulo: G4,
  london: W4,
  berlin: X4,
  bahrain: J4,
  dubai: el,
  ashkhabad: tl,
  almaty: nl,
  bangkok: rl,
  shanghai: ol,
  tokyo: il,
  sydney: al,
  norfolk: sl,
  horizontal_straight_line: ll,
  horizontal_ray_line: cl,
  horizontal_segment: ul,
  vertical_straight_line: dl,
  vertical_ray_line: hl,
  vertical_segment: fl,
  straight_line: yl,
  ray_line: gl,
  segment: ml,
  arrow: pl,
  price_line: vl,
  price_channel_line: Cl,
  parallel_straight_line: $l,
  fibonacci_line: bl,
  fibonacci_segment: _l,
  fibonacci_circle: kl,
  fibonacci_spiral: xl,
  fibonacci_speed_resistance_fan: Ll,
  fibonacci_extension: wl,
  gann_box: Al,
  rect: Ml,
  parallelogram: Tl,
  circle: Sl,
  triangle: Pl,
  three_waves: Ol,
  five_waves: Dl,
  eight_waves: Nl,
  any_waves: Il,
  abcd: El,
  xabcd: Bl,
  weak_magnet: Fl,
  strong_magnet: Ul,
  symbol_search: zl,
  symbol_code: Kl,
  params_1: jl,
  params_2: Ql,
  params_3: Rl,
  params_4: Zl,
  params_5: Vl,
  period: Hl,
  standard_deviation: ql,
  candle_type: Yl,
  candle_solid: Gl,
  candle_stroke: Wl,
  candle_up_stroke: Xl,
  candle_down_stroke: Jl,
  ohlc: ec,
  area: tc,
  last_price_show: nc,
  high_price_show: rc,
  low_price_show: oc,
  indicator_last_value_show: ic,
  price_axis_type: ac,
  normal: sc,
  percentage: lc,
  log: cc,
  reverse_coordinate: uc,
  grid_show: dc,
  restore_default: hc
}, yc = "Indicator", gc = "More", mc = "Main Indicator", pc = "Sub Indicator", vc = "Setting", Cc = "Timezone", $c = "Screenshot", bc = "Full Screen", _c = "Exit", kc = "Save", xc = "Confirm", Lc = "Cancel", wc = "MA(Moving Average)", Ac = "EMA(Exponential Moving Average)", Mc = "SMA", Tc = "BOLL(Bolinger Bands)", Sc = "BBI(Bull And Bearlndex)", Pc = "SAR(Stop and Reverse)", Oc = "VOL(Volume)", Dc = "MACD(Moving Average Convergence / Divergence)", Nc = "KDJ(KDJ Index)", Ic = "RSI(Relative Strength Index)", Ec = "BIAS(Bias Ratio)", Bc = "BRAR(情绪指标)", Fc = "CCI(Commodity Channel Index)", Uc = "DMI(Directional Movement Index)", zc = "CR(能量指标)", Kc = "PSY(Psychological Line)", jc = "DMA(Different of Moving Average)", Qc = "TRIX(Triple Exponentially Smoothed Moving Average)", Rc = "OBV(On Balance Volume)", Zc = "VR(Volatility Volume Ratio)", Vc = "WR(Williams %R)", Hc = "MTM(Momentum Index)", qc = "EMV(Ease of Movement Value)", Yc = "ROC(Price Rate of Change)", Gc = "PVT(Price and Volume Trend)", Wc = "AO(Awesome Oscillator)", Xc = "UTC", Jc = "(UTC-10) Honolulu", eu = "(UTC-8) Juneau", tu = "(UTC-7) Los Angeles", nu = "(UTC-5) Chicago", ru = "(UTC-4) Toronto", ou = "(UTC-3) Sao Paulo", iu = "(UTC+1) London", au = "(UTC+2) Berlin", su = "(UTC+3) Bahrain", lu = "(UTC+4) Dubai", cu = "(UTC+5) Ashkhabad", uu = "(UTC+6) Almaty", du = "(UTC+7) Bangkok", hu = "(UTC+8) Shanghai", fu = "(UTC+9) Tokyo", yu = "(UTC+10) Sydney", gu = "(UTC+12) Norfolk", mu = "Horizontal Line", pu = "Horizontal Ray", vu = "Horizontal Segment", Cu = "Vertical Line", $u = "Vertical Ray", bu = "Vertical Segment", _u = "Trend Line", ku = "Ray", xu = "Segment", Lu = "Arrow", wu = "Price Line", Au = "Price Channel Line", Mu = "Parallel Line", Tu = "Fibonacci Line", Su = "Fibonacci Segment", Pu = "Fibonacci Circle", Ou = "Fibonacci Spiral", Du = "Fibonacci Sector", Nu = "Fibonacci Extension", Iu = "Gann Box", Eu = "Rect", Bu = "Parallelogram", Fu = "Circle", Uu = "Triangle", zu = "Three Waves", Ku = "Five Waves", ju = "Eight Waves", Qu = "Any Waves", Ru = "ABCD Pattern", Zu = "XABCD Pattern", Vu = "Weak Magnet", Hu = "Strong Magnet", qu = "Symbol Search", Yu = "Symbol Code", Gu = "Parameter 1", Wu = "Parameter 2", Xu = "Parameter 3", Ju = "Parameter 4", ed = "Parameter 5", td = "Period", nd = "Standard Deviation", rd = "Candle Type", od = "Candle Solid", id = "Candle Stroke", ad = "Candle Up Stroke", sd = "Candle Down Stroke", ld = "OHLC", cd = "Area", ud = "Show Last Price", dd = "Show Highest Price", hd = "Show Lowest Price", fd = "Show indicator's last value", yd = "Price Axis Type", gd = "Normal", md = "Percentage", pd = "Log", vd = "Reverse Coordinate", Cd = "Show Grids", $d = "Restore Defaults", bd = {
  indicator: yc,
  more: gc,
  main_indicator: mc,
  sub_indicator: pc,
  setting: vc,
  timezone: Cc,
  screenshot: $c,
  full_screen: bc,
  exit_full_screen: _c,
  save: kc,
  confirm: xc,
  cancel: Lc,
  ma: wc,
  ema: Ac,
  sma: Mc,
  boll: Tc,
  bbi: Sc,
  sar: Pc,
  vol: Oc,
  macd: Dc,
  kdj: Nc,
  rsi: Ic,
  bias: Ec,
  brar: Bc,
  cci: Fc,
  dmi: Uc,
  cr: zc,
  psy: Kc,
  dma: jc,
  trix: Qc,
  obv: Rc,
  vr: Zc,
  wr: Vc,
  mtm: Hc,
  emv: qc,
  roc: Yc,
  pvt: Gc,
  ao: Wc,
  utc: Xc,
  honolulu: Jc,
  juneau: eu,
  los_angeles: tu,
  chicago: nu,
  toronto: ru,
  sao_paulo: ou,
  london: iu,
  berlin: au,
  bahrain: su,
  dubai: lu,
  ashkhabad: cu,
  almaty: uu,
  bangkok: du,
  shanghai: hu,
  tokyo: fu,
  sydney: yu,
  norfolk: gu,
  horizontal_straight_line: mu,
  horizontal_ray_line: pu,
  horizontal_segment: vu,
  vertical_straight_line: Cu,
  vertical_ray_line: $u,
  vertical_segment: bu,
  straight_line: _u,
  ray_line: ku,
  segment: xu,
  arrow: Lu,
  price_line: wu,
  price_channel_line: Au,
  parallel_straight_line: Mu,
  fibonacci_line: Tu,
  fibonacci_segment: Su,
  fibonacci_circle: Pu,
  fibonacci_spiral: Ou,
  fibonacci_speed_resistance_fan: Du,
  fibonacci_extension: Nu,
  gann_box: Iu,
  rect: Eu,
  parallelogram: Bu,
  circle: Fu,
  triangle: Uu,
  three_waves: zu,
  five_waves: Ku,
  eight_waves: ju,
  any_waves: Qu,
  abcd: Ru,
  xabcd: Zu,
  weak_magnet: Vu,
  strong_magnet: Hu,
  symbol_search: qu,
  symbol_code: Yu,
  params_1: Gu,
  params_2: Wu,
  params_3: Xu,
  params_4: Ju,
  params_5: ed,
  period: td,
  standard_deviation: nd,
  candle_type: rd,
  candle_solid: od,
  candle_stroke: id,
  candle_up_stroke: ad,
  candle_down_stroke: sd,
  ohlc: ld,
  area: cd,
  last_price_show: ud,
  high_price_show: dd,
  low_price_show: hd,
  indicator_last_value_show: fd,
  price_axis_type: yd,
  normal: gd,
  percentage: md,
  log: pd,
  reverse_coordinate: vd,
  grid_show: Cd,
  restore_default: $d
}, y9 = {
  "zh-CN": fc,
  "en-US": bd
};
function ky(e, n) {
  y9[e] = n;
}
const c = (e, n) => {
  var t;
  return ((t = y9[n]) == null ? void 0 : t[e]) ?? e;
}, _d = /* @__PURE__ */ $('<div class="scroll-indicator left"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg></div>'), kd = /* @__PURE__ */ $('<img alt="symbol">'), xd = /* @__PURE__ */ $('<div class="symbol"><span></span></div>'), Ld = /* @__PURE__ */ $('<span class="down-arrow-icon mobile-separate-arrow"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></span>'), wd = /* @__PURE__ */ $('<span class="mobile-more-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg></span>'), Ad = /* @__PURE__ */ $('<div class="item tools" title="Time Tools"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M16 3v4"></path><path d="M8 3v4"></path><path d="M3 10h18"></path><path d="M12 14v4"></path><path d="M10 16h4"></path></svg></div>'), Md = /* @__PURE__ */ $('<div class="item tools"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div>'), Td = /* @__PURE__ */ $('<div class="klinecharts-pro-order-tools-display-menu"></div>'), Sd = /* @__PURE__ */ $('<div class="klinecharts-pro-order-tools-popover"><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Quick Order</span></span><span class="klinecharts-pro-order-tools-chevron">›</span></button><div class="klinecharts-pro-order-tools-submenu"><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Floating Window</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Plus Button</span></label></div></div><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Open Orders</span></span><span class="klinecharts-pro-order-tools-chevron">&rsaquo;</span></button><div class="klinecharts-pro-order-tools-submenu"><div class="klinecharts-pro-order-tools-setting-row"><span class="klinecharts-pro-order-tools-label">Extended Price Line</span><button type="button"><span></span></button></div><div class="klinecharts-pro-order-tools-setting-row"><span class="klinecharts-pro-order-tools-label">Display</span><div class="klinecharts-pro-order-tools-display"><button type="button" class="klinecharts-pro-order-tools-display-button"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4"></path></svg></button></div></div></div></div><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Positions</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Breakeven Price</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Liquidation Price</span></label><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Price Line</span></span><span class="klinecharts-pro-order-tools-chevron">&rsaquo;</span></button><div class="klinecharts-pro-order-tools-submenu"><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Market Price Line</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Count Down</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Bid & Ask Price</span></label></div></div><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Order History</span></label></div>'), Pd = /* @__PURE__ */ $('<div><div class="item tools order-tools-trigger"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Orders"><path d="M4 7h10"></path><path d="M4 12h8"></path><path d="M4 17h6"></path><path d="M18 6v12"></path><path d="M15 15l3 3 3-3"></path></svg><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></div></div>'), Od = /* @__PURE__ */ $('<div class="item tools"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path><path d="M15.22299772857666,9.722223632261718C12.59389772857666,9.722223632261718,10.44600772857666,12.020201374511718,10.44600772857666,14.861111374511719C10.44600772857666,17.70202137451172,12.58215772857666,20.000021374511718,15.223007728576661,20.000021374511718C17.86384772857666,20.000021374511718,19.99999772857666,17.70202137451172,19.99999772857666,14.861111374511719C19.99999772857666,12.020201374511718,17.85211772857666,9.72222212709572,15.22299772857666,9.722223632261718ZM15.22299772857666,18.598491374511717C13.30985772857666,18.598491374511717,11.737087728576661,16.91919137451172,11.737087728576661,14.848481374511719C11.737087728576661,12.777781374511719,13.29811772857666,11.098491374511719,15.22299772857666,11.098491374511719C17.14787772857666,11.098491374511719,18.708917728576658,12.777781374511719,18.708917728576658,14.848481374511719C18.708917728576658,16.91919137451172,17.13614772857666,18.59848137451172,15.22299772857666,18.598491374511717Z"></path><path d="M15.692486288146974,15.050496970825195L15.692486288146974,12.676760970825196C15.692486288146974,12.297972970825196,15.399058288146973,11.982316970825195,15.046945288146972,11.982316970825195C14.694833288146972,11.982316970825195,14.401406288146973,12.297972970825196,14.401406288146973,12.676760970825196L14.401406288146973,15.340896970825195C14.401406288146973,15.530296970825194,14.471829288146973,15.694436970825196,14.589200288146973,15.833326970825196L15.751176288146972,17.095956970825195C15.868546288146973,17.222216970825194,16.032866288146973,17.297976970825196,16.208916288146973,17.297976970825196C16.384976288146973,17.297976970825196,16.537556288146973,17.222216970825194,16.666666288146974,17.095956970825195C16.78403628814697,16.969686970825194,16.854456288146974,16.792916970825196,16.854456288146974,16.603526970825193C16.854456288146974,16.414136970825197,16.78403628814697,16.237366970825196,16.666666288146974,16.111106970825197L15.692486288146974,15.050496970825195Z"></path></svg></div>'), Dd = /* @__PURE__ */ $('<div class="item tools"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg></div>'), Nd = /* @__PURE__ */ $('<div class="item tools"><svg viewBox="0 0 20 20"><path d="M6.50977,1L13.4902,1C13.6406,1,13.7695,1.1104910000000001,13.7969,1.2631700000000001L14.0273,2.52277C14.1387,3.13147,14.6543,3.57143,15.2559,3.57143L17.5,3.57143C18.8809,3.57143,20,4.72254,20,6.14286L20,16.4286C20,17.8489,18.8809,19,17.5,19L2.5,19C1.11914,19,0,17.8489,0,16.4286L0,6.14286C0,4.72254,1.11914,3.57143,2.5,3.57143L4.74414,3.57143C5.3457,3.57143,5.86133,3.13147,5.97266,2.52277L6.20312,1.2631700000000001C6.23047,1.1104910000000001,6.35937,1,6.50977,1ZM15.2559,4.857139999999999C14.0547,4.857139999999999,13.0215,3.97522,12.7988,2.75982L12.7129,2.28571L7.28711,2.28571L7.20117,2.75982C6.98047,3.97522,5.94727,4.857139999999999,4.74414,4.857139999999999L2.5,4.857139999999999C1.81055,4.857139999999999,1.25,5.43371,1.25,6.14286L1.25,16.4286C1.25,17.1377,1.81055,17.7143,2.5,17.7143L17.5,17.7143C18.1895,17.7143,18.75,17.1377,18.75,16.4286L18.75,6.14286C18.75,5.43371,18.1895,4.857139999999999,17.5,4.857139999999999L15.2559,4.857139999999999ZM4.375,6.78571L3.125,6.78571C2.7793,6.78571,2.5,6.49844,2.5,6.14286C2.5,5.78728,2.7793,5.5,3.125,5.5L4.375,5.5C4.7207,5.5,5,5.78728,5,6.14286C5,6.49844,4.7207,6.78571,4.375,6.78571ZM10,6.14286C7.06641,6.14286,4.6875,8.58973,4.6875,11.6071C4.6875,14.6246,7.06641,17.0714,10,17.0714C12.9336,17.0714,15.3125,14.6246,15.3125,11.6071C15.3125,8.58973,12.9336,6.14286,10,6.14286ZM10,7.42857C11.0859,7.42857,12.1055,7.8625,12.873,8.65201C13.6406,9.44152,14.0625,10.49018,14.0625,11.6071C14.0625,12.7241,13.6406,13.7728,12.873,14.5623C12.1055,15.3518,11.0859,15.7857,10,15.7857C8.91406,15.7857,7.89453,15.3518,7.12695,14.5623C6.35937,13.7728,5.9375,12.7241,5.9375,11.6071C5.9375,10.49018,6.35938,9.44152,7.12695,8.65201C7.89453,7.8625,8.91406,7.42857,10,7.42857ZM10,9.67857C8.96484,9.67857,8.125,10.54241,8.125,11.6071C8.125,12.6719,8.96484,13.5357,10,13.5357C11.0352,13.5357,11.875,12.6719,11.875,11.6071C11.875,10.54241,11.0352,9.67857,10,9.67857ZM10,10.96429C10.3438,10.96429,10.625,11.2536,10.625,11.6071C10.625,11.9607,10.3438,12.25,10,12.25C9.65625,12.25,9.375,11.9607,9.375,11.6071C9.375,11.2536,9.65625,10.96429,10,10.96429Z"></path></svg></div>'), Id = /* @__PURE__ */ $('<div class="item tools chart-view-toggle"></div>'), Ed = /* @__PURE__ */ $('<div class="scroll-indicator right"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"></path></svg></div>'), Bd = /* @__PURE__ */ $('<div><div class="klinecharts-pro-period-bar"><div class="menu-container"><svg viewBox="0 0 1024 1024"><path d="M192.037 287.953h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 479.169H438.553c-17.673 0-32 14.327-32 32s14.327 32 32 32h393.608c17.673 0 32-14.327 32-32s-14.327-32-32-32zM832.161 735.802H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32zM319.028 351.594l-160 160 160 160z"></path></svg></div><div><div class="item tools fullscreen-toggle"></div></div></div></div>'), Fd = /* @__PURE__ */ $("<span></span>"), Ud = /* @__PURE__ */ $('<button type="button"></button>'), zd = /* @__PURE__ */ $('<svg viewBox="0 0 20 20"><path d="M1.08108,0L0,1.079L4.18919,5.27938L2.54826,6.91715L6.9112,6.91715L6.9112,2.56262L5.28957,4.18112L1.08108,0ZM15.8108,5.27938L20,1.079L18.9189,0L14.7104,4.18112L13.0888,2.56262L13.0888,6.91715L17.4517,6.91715L15.8108,5.27938ZM4.16988,14.7014L0.07722,18.8054L1.1583,20L5.27027,15.7996L6.9112,17.4374L6.9112,13.0829L2.54826,13.0829L4.16988,14.7014ZM17.4517,13.0829L13.0888,13.0829L13.0888,17.4374L14.7297,15.7996L18.8417,20L19.9228,18.8054L15.8301,14.7013L17.4517,13.0829Z"></path></svg>'), Kd = /* @__PURE__ */ $('<svg viewBox="0 0 20 20"><path d="M2.93444,1.76899L7.57544,6.40999L6.38918,7.59626L1.76899,2.93444L0,4.70343L0,0L4.70343,0L2.93444,1.76899ZM6.40999,12.4037L1.76899,17.0447L0,15.2758L0,19.9792L4.70343,19.9792L2.93444,18.2102L7.57544,13.5692L6.40999,12.4037ZM15.2758,0L17.0447,1.76899L12.4037,6.40999L13.59,7.59626L18.231,2.95526L20,4.72425L20,0L15.2758,0ZM13.5692,12.4037L12.3829,13.59L17.0239,18.231L15.2549,20L19.9792,20L19.9792,15.2758L18.2102,17.0447L13.5692,12.4037Z"></path></svg>'), jd = /* @__PURE__ */ $('<svg viewBox="0 0 24 24"><path d="M3 20V7l4 3 5-7 5 4h4v13H3Zm5-3 4-5.5 7 5.45V9h-2.7l-3.9-3.1-4.95 6.95L5 10.4V14l3 3Z"></path></svg>'), Qd = /* @__PURE__ */ $('<svg viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M9 4H7v2H5v12h2v2h2v-2h2V6H9zM19 8h-2V4h-2v4h-2v7h2v5h2v-5h2z"></path></svg>'), $r = (e) => e.charAt(0).toUpperCase() + e.slice(1), Rd = (e) => {
  let n, t, r;
  const [a, s] = T(window.innerWidth < 768), [d, u] = T(localStorage.getItem("klinechart_secondary_period") || ""), [m, k] = T(!1), [g, w] = T(!1), [A, O] = T(!1), [F, E] = T(!1), [D, K] = T(!1), [X, U] = T({
    top: 0,
    left: 0,
    minWidth: 220
  }), Y = () => {
    s(window.innerWidth < 768), requestAnimationFrame(ie), m() && Pe();
  }, [Z, ce] = T(!1), j = () => document.fullscreenElement ?? document.body, V = () => {
    ce(!!document.fullscreenElement);
  }, [H, ne] = T(!1), [oe, Ce] = T(!1), Pe = () => {
    if (!t)
      return;
    const N = t.getBoundingClientRect(), B = Math.max(220, Math.ceil(N.width)), we = window.innerWidth, ze = Math.min(Math.max(8, N.right - B), Math.max(8, we - B - 8));
    U({
      top: Math.ceil(N.bottom + 8),
      left: Math.ceil(ze),
      minWidth: B
    });
  }, $e = () => {
    w(!1), O(!1), E(!1), K(!1);
  }, Re = () => {
    k((N) => {
      const B = !N;
      return B ? queueMicrotask(Pe) : $e(), B;
    });
  }, be = (N) => {
    if (!m())
      return;
    const B = N.target;
    B && (t != null && t.contains(B) || r != null && r.contains(B) || ($e(), k(!1)));
  }, me = () => {
    m() && Pe();
  }, ie = () => {
    if (!n) {
      ne(!1), Ce(!1);
      return;
    }
    const N = n, B = N.scrollWidth > N.clientWidth + 2;
    ne(B && N.scrollLeft > 2), Ce(B && N.scrollLeft + N.clientWidth < N.scrollWidth - 2);
  };
  M0(() => {
    window.addEventListener("resize", Y), document.addEventListener("fullscreenchange", V), document.addEventListener("mousedown", be), window.addEventListener("scroll", me, !0), document.addEventListener("mozfullscreenchange", V), document.addEventListener("webkitfullscreenchange", V), document.addEventListener("msfullscreenchange", V), n && (n.addEventListener("scroll", ie), setTimeout(ie, 100));
  }), N1(() => {
    window.removeEventListener("resize", Y), document.removeEventListener("fullscreenchange", V), document.removeEventListener("mousedown", be), window.removeEventListener("scroll", me, !0), document.removeEventListener("mozfullscreenchange", V), document.removeEventListener("webkitfullscreenchange", V), document.removeEventListener("msfullscreenchange", V), n && n.removeEventListener("scroll", ie);
  });
  const pe = R(() => {
    const N = e.periods.filter((B) => {
      if (!a() || Z())
        return !0;
      const we = e.period.text, ze = d();
      if (B.text === we || ze && B.text === ze)
        return !0;
      if (!ze || ze === we) {
        const se = e.periods.find((Oe) => Oe.text !== we);
        return B.text === (se == null ? void 0 : se.text);
      }
      return !1;
    }).slice(0, a() && !Z() ? 2 : e.periods.length);
    return setTimeout(ie, 50), N;
  });
  let q = e.period.text;
  return Ue(() => {
    const N = e.period.text;
    N !== q && (a() && (u(q), localStorage.setItem("klinechart_secondary_period", q)), q = N), setTimeout(ie, 50);
  }), Ue(() => {
    Z(), setTimeout(ie, 100);
  }), Ue(() => {
    if (!e.showOrderToolsMenu) {
      k(!1);
      return;
    }
    m() && queueMicrotask(Pe);
  }), (() => {
    const N = Bd.cloneNode(!0), B = N.firstChild, we = B.firstChild, ze = we.firstChild, se = we.nextSibling, Oe = se.firstChild;
    return N.style.setProperty("position", "relative"), N.style.setProperty("width", "100%"), N.style.setProperty("display", "flex"), N.style.setProperty("align-items", "center"), p(N, L(J, {
      get when() {
        return H();
      },
      get children() {
        const _ = _d.cloneNode(!0);
        return _.$$click = () => n.scrollBy({
          left: -100,
          behavior: "smooth"
        }), _.style.setProperty("position", "absolute"), _.style.setProperty("left", "0"), _.style.setProperty("top", "0"), _.style.setProperty("bottom", "1px"), _.style.setProperty("width", "30px"), _.style.setProperty("display", "flex"), _.style.setProperty("align-items", "center"), _.style.setProperty("justify-content", "center"), _.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), _.style.setProperty("z-index", "10"), _.style.setProperty("cursor", "pointer"), _.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), _;
      }
    }), B), D1((_) => {
      n = _;
    }, B), B.style.setProperty("width", "100%"), B.style.setProperty("overflow", "auto"), i1(ze, "click", e.onMenuClick, !0), p(B, L(J, {
      get when() {
        return e.symbol;
      },
      get children() {
        const _ = xd.cloneNode(!0), ue = _.firstChild;
        return i1(_, "click", e.onSymbolClick, !0), p(_, L(J, {
          get when() {
            return e.symbol.logo;
          },
          get children() {
            const Ae = kd.cloneNode(!0);
            return I(() => Se(Ae, "src", e.symbol.logo)), Ae;
          }
        }), ue), p(ue, () => e.symbol.shortName ?? e.symbol.name ?? e.symbol.ticker), _;
      }
    }), se), p(B, () => pe().map((_, ue) => {
      const Ae = _.text === e.period.text;
      return (() => {
        const s1 = Fd.cloneNode(!0);
        return s1.$$click = (de) => {
          a() && Ae && !Z() ? (e.onMobilePeriodClick ? e.onMobilePeriodClick(_) : e.onMenuClick(), de.stopPropagation()) : e.onPeriodChange(_);
        }, re(s1, `item period ${Ae ? "selected" : ""}`), p(s1, () => _.text), s1;
      })();
    }), se), p(B, L(J, {
      get when() {
        return R(() => !!(a() && !Z()))() && pe().length > 1;
      },
      get children() {
        const _ = Ld.cloneNode(!0);
        return _.$$click = (ue) => {
          ue.stopPropagation(), e.onMobilePeriodClick ? e.onMobilePeriodClick(e.period) : e.onMenuClick();
        }, _.style.setProperty("margin-left", "4px"), _.style.setProperty("display", "inline-flex"), _.style.setProperty("align-items", "center"), _;
      }
    }), se), p(B, L(J, {
      get when() {
        return R(() => !!a())() && !Z();
      },
      get children() {
        const _ = wd.cloneNode(!0);
        return _.$$click = (ue) => {
          var Ae;
          ue.stopPropagation(), (Ae = e.onMobileMoreClick) == null || Ae.call(e);
        }, _.style.setProperty("margin-left", "8px"), _.style.setProperty("display", "inline-flex"), _.style.setProperty("align-items", "center"), _.style.setProperty("cursor", "pointer"), _.style.setProperty("padding", "0 4px"), _;
      }
    }), se), p(B, L(J, {
      get when() {
        return !a();
      },
      get children() {
        const _ = Ad.cloneNode(!0);
        return i1(_, "click", e.onTimeToolsClick, !0), _;
      }
    }), se), p(B, L(J, {
      get when() {
        return !a();
      },
      get children() {
        const _ = Md.cloneNode(!0), ue = _.firstChild, Ae = ue.nextSibling;
        return i1(_, "click", e.onIndicatorClick, !0), p(Ae, () => c("indicator", e.locale)), _;
      }
    }), se), se.style.setProperty("display", "flex"), se.style.setProperty("gap", "4px"), se.style.setProperty("margin-left", "auto"), se.style.setProperty("align-items", "center"), se.style.setProperty("flex", "0 0 auto"), p(se, L(J, {
      get when() {
        return e.showOrderToolsMenu;
      },
      get children() {
        const _ = Pd.cloneNode(!0), ue = _.firstChild, Ae = ue.firstChild, s1 = Ae.nextSibling;
        return D1((de) => {
          t = de;
        }, _), _.style.setProperty("display", "flex"), _.style.setProperty("align-items", "center"), ue.$$click = (de) => {
          de.stopPropagation(), Re();
        }, ue.style.setProperty("gap", "6px"), s1.style.setProperty("transition", "transform 0.2s ease"), p(_, L(J, {
          get when() {
            return m();
          },
          get children() {
            return L(c5, {
              get mount() {
                return j();
              },
              get children() {
                const de = Sd.cloneNode(!0), y1 = de.firstChild, l1 = y1.firstChild, J1 = l1.firstChild, Ne = J1.firstChild, gt = Ne.firstChild, B1 = l1.nextSibling, $1 = B1.firstChild, b1 = $1.firstChild, t1 = b1.firstChild, mt = $1.nextSibling, Ze = mt.firstChild, et = Ze.firstChild, tt = y1.nextSibling, g1 = tt.firstChild, _1 = g1.firstChild, nt = _1.firstChild, pt = nt.firstChild, F1 = g1.nextSibling, rt = F1.firstChild, vt = rt.firstChild, Fe = vt.nextSibling, Ke = rt.nextSibling, He = Ke.firstChild, je = He.nextSibling, ot = je.firstChild, U1 = ot.firstChild, z1 = tt.nextSibling, Ct = z1.firstChild, ke = Ct.firstChild, Ie = z1.nextSibling, $t = Ie.nextSibling, qe = $t.firstChild, m1 = qe.firstChild, p1 = $t.nextSibling, bt = p1.nextSibling, k1 = bt.firstChild, _t = k1.firstChild, Ye = bt.nextSibling, x1 = Ye.firstChild, o0 = x1.firstChild, L1 = o0.firstChild, w1 = L1.firstChild, Ge = x1.nextSibling, kt = Ge.firstChild, xt = kt.firstChild, c1 = xt.firstChild, K1 = kt.nextSibling, i0 = K1.firstChild, Lt = i0.firstChild, a0 = K1.nextSibling, it = a0.firstChild, at = it.firstChild, A1 = Ye.nextSibling, s0 = A1.firstChild, u1 = s0.firstChild;
                return de.$$mousedown = (b) => b.stopPropagation(), D1((b) => {
                  r = b;
                }, de), de.style.setProperty("position", "fixed"), de.style.setProperty("z-index", "9999"), l1.$$click = (b) => {
                  b.preventDefault(), b.stopPropagation(), w((S) => !S);
                }, Ne.$$mousedown = (b) => b.stopPropagation(), Ne.$$click = (b) => b.stopPropagation(), gt.addEventListener("change", (b) => {
                  var S;
                  b.stopPropagation(), w(!0), (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    quickOrder: b.currentTarget.checked
                  });
                }), t1.addEventListener("change", (b) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    quickOrderFloatingWindow: b.currentTarget.checked
                  });
                }), et.addEventListener("change", (b) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    quickOrderPlusButton: b.currentTarget.checked
                  });
                }), g1.$$click = (b) => {
                  b.preventDefault(), b.stopPropagation(), O((S) => !S), E(!1);
                }, nt.$$mousedown = (b) => b.stopPropagation(), nt.$$click = (b) => b.stopPropagation(), pt.addEventListener("change", (b) => {
                  var S;
                  b.stopPropagation(), O(!0), (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    openOrders: b.currentTarget.checked
                  });
                }), Fe.$$click = (b) => {
                  var S, Me;
                  b.preventDefault(), b.stopPropagation(), (Me = e.onOrderToolsStateChange) == null || Me.call(e, {
                    openOrdersExtendedPriceLine: !(((S = e.orderToolsState) == null ? void 0 : S.openOrdersExtendedPriceLine) ?? !0)
                  });
                }, ot.$$click = (b) => {
                  b.preventDefault(), b.stopPropagation(), E((S) => !S);
                }, p(ot, () => {
                  var b;
                  return $r(((b = e.orderToolsState) == null ? void 0 : b.openOrdersDisplay) ?? "right");
                }, U1), p(je, L(J, {
                  get when() {
                    return F();
                  },
                  get children() {
                    const b = Td.cloneNode(!0);
                    return p(b, () => ["left", "center", "right"].map((S) => (() => {
                      const Me = Ud.cloneNode(!0);
                      return Me.$$click = (Te) => {
                        var n1;
                        Te.preventDefault(), Te.stopPropagation(), (n1 = e.onOrderToolsStateChange) == null || n1.call(e, {
                          openOrdersDisplay: S
                        }), E(!1);
                      }, p(Me, () => $r(S)), I(() => {
                        var Te;
                        return re(Me, (((Te = e.orderToolsState) == null ? void 0 : Te.openOrdersDisplay) ?? "right") === S ? "selected" : "");
                      }), Me;
                    })())), b;
                  }
                }), null), ke.addEventListener("change", (b) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    positions: b.currentTarget.checked
                  });
                }), m1.addEventListener("change", (b) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    breakevenPrice: b.currentTarget.checked
                  });
                }), _t.addEventListener("change", (b) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    liquidationPrice: b.currentTarget.checked
                  });
                }), x1.$$click = (b) => {
                  b.preventDefault(), b.stopPropagation(), K((S) => !S);
                }, L1.$$mousedown = (b) => b.stopPropagation(), L1.$$click = (b) => b.stopPropagation(), w1.addEventListener("change", (b) => {
                  var S;
                  b.stopPropagation(), K(!0), (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    priceLine: b.currentTarget.checked
                  });
                }), c1.addEventListener("change", (b) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    marketPriceLine: b.currentTarget.checked
                  });
                }), Lt.addEventListener("change", (b) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    countDown: b.currentTarget.checked
                  });
                }), at.addEventListener("change", (b) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    bidAskPrice: b.currentTarget.checked
                  });
                }), u1.addEventListener("change", (b) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    orderHistory: b.currentTarget.checked
                  });
                }), I((b) => {
                  var lt;
                  const S = `${X().top}px`, Me = `${X().left}px`, Te = `${X().minWidth}px`, n1 = `klinecharts-pro-order-tools-group${g() ? " klinecharts-pro-order-tools-group-open" : ""}`, M1 = `klinecharts-pro-order-tools-group${A() ? " klinecharts-pro-order-tools-group-open" : ""}`, wt = `klinecharts-pro-order-tools-switch${((lt = e.orderToolsState) == null ? void 0 : lt.openOrdersExtendedPriceLine) ?? !0 ? " klinecharts-pro-order-tools-switch-on" : ""}`, At = `klinecharts-pro-order-tools-display-arrow${F() ? " klinecharts-pro-order-tools-display-arrow-open" : ""}`, st = `klinecharts-pro-order-tools-group${D() ? " klinecharts-pro-order-tools-group-open" : ""}`;
                  return S !== b._v$ && de.style.setProperty("top", b._v$ = S), Me !== b._v$2 && de.style.setProperty("left", b._v$2 = Me), Te !== b._v$3 && de.style.setProperty("width", b._v$3 = Te), n1 !== b._v$4 && re(y1, b._v$4 = n1), M1 !== b._v$5 && re(tt, b._v$5 = M1), wt !== b._v$6 && re(Fe, b._v$6 = wt), At !== b._v$7 && Se(U1, "class", b._v$7 = At), st !== b._v$8 && re(Ye, b._v$8 = st), b;
                }, {
                  _v$: void 0,
                  _v$2: void 0,
                  _v$3: void 0,
                  _v$4: void 0,
                  _v$5: void 0,
                  _v$6: void 0,
                  _v$7: void 0,
                  _v$8: void 0
                }), I(() => {
                  var b, S, Me, Te;
                  return gt.checked = (((b = e.orderToolsState) == null ? void 0 : b.quickOrderFloatingWindow) ?? ((S = e.orderToolsState) == null ? void 0 : S.quickOrder) ?? !0) || (((Me = e.orderToolsState) == null ? void 0 : Me.quickOrderPlusButton) ?? ((Te = e.orderToolsState) == null ? void 0 : Te.quickOrder) ?? !0);
                }), I(() => {
                  var b, S;
                  return t1.checked = ((b = e.orderToolsState) == null ? void 0 : b.quickOrderFloatingWindow) ?? ((S = e.orderToolsState) == null ? void 0 : S.quickOrder) ?? !0;
                }), I(() => {
                  var b, S;
                  return et.checked = ((b = e.orderToolsState) == null ? void 0 : b.quickOrderPlusButton) ?? ((S = e.orderToolsState) == null ? void 0 : S.quickOrder) ?? !0;
                }), I(() => {
                  var b;
                  return pt.checked = ((b = e.orderToolsState) == null ? void 0 : b.openOrders) ?? !0;
                }), I(() => {
                  var b;
                  return ke.checked = ((b = e.orderToolsState) == null ? void 0 : b.positions) ?? !0;
                }), I(() => {
                  var b;
                  return m1.checked = ((b = e.orderToolsState) == null ? void 0 : b.breakevenPrice) ?? !0;
                }), I(() => {
                  var b;
                  return _t.checked = ((b = e.orderToolsState) == null ? void 0 : b.liquidationPrice) ?? !0;
                }), I(() => {
                  var b, S, Me, Te, n1, M1;
                  return w1.checked = (((b = e.orderToolsState) == null ? void 0 : b.marketPriceLine) ?? ((S = e.orderToolsState) == null ? void 0 : S.priceLine) ?? !0) || (((Me = e.orderToolsState) == null ? void 0 : Me.countDown) ?? ((Te = e.orderToolsState) == null ? void 0 : Te.priceLine) ?? !0) || (((n1 = e.orderToolsState) == null ? void 0 : n1.bidAskPrice) ?? ((M1 = e.orderToolsState) == null ? void 0 : M1.priceLine) ?? !0);
                }), I(() => {
                  var b, S;
                  return c1.checked = ((b = e.orderToolsState) == null ? void 0 : b.marketPriceLine) ?? ((S = e.orderToolsState) == null ? void 0 : S.priceLine) ?? !0;
                }), I(() => {
                  var b, S;
                  return Lt.checked = ((b = e.orderToolsState) == null ? void 0 : b.countDown) ?? ((S = e.orderToolsState) == null ? void 0 : S.priceLine) ?? !0;
                }), I(() => {
                  var b, S;
                  return at.checked = ((b = e.orderToolsState) == null ? void 0 : b.bidAskPrice) ?? ((S = e.orderToolsState) == null ? void 0 : S.priceLine) ?? !0;
                }), I(() => {
                  var b;
                  return u1.checked = ((b = e.orderToolsState) == null ? void 0 : b.orderHistory) ?? !0;
                }), de;
              }
            });
          }
        }), null), I((de) => {
          const y1 = a() ? "0 8px" : "0 10px", l1 = m() ? "rotate(180deg)" : "rotate(0deg)";
          return y1 !== de._v$9 && ue.style.setProperty("padding", de._v$9 = y1), l1 !== de._v$10 && s1.style.setProperty("transform", de._v$10 = l1), de;
        }, {
          _v$9: void 0,
          _v$10: void 0
        }), _;
      }
    }), Oe), p(se, L(J, {
      get when() {
        return !a();
      },
      get children() {
        return [(() => {
          const _ = Od.cloneNode(!0);
          return i1(_, "click", e.onTimezoneClick, !0), _;
        })(), (() => {
          const _ = Dd.cloneNode(!0);
          return i1(_, "click", e.onSettingClick, !0), _;
        })()];
      }
    }), Oe), p(se, L(J, {
      get when() {
        return !a();
      },
      get children() {
        const _ = Nd.cloneNode(!0);
        return i1(_, "click", e.onScreenshotClick, !0), _;
      }
    }), Oe), Oe.$$click = () => {
      if (Z())
        (document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen).call(document);
      else {
        const _ = n == null ? void 0 : n.closest(".klinecharts-pro");
        _ && ((_ == null ? void 0 : _.requestFullscreen) ?? (_ == null ? void 0 : _.webkitRequestFullscreen) ?? (_ == null ? void 0 : _.mozRequestFullScreen) ?? (_ == null ? void 0 : _.msRequestFullscreen)).call(_);
      }
    }, p(Oe, (() => {
      const _ = R(() => !!Z());
      return () => _() ? zd.cloneNode(!0) : Kd.cloneNode(!0);
    })()), p(se, L(J, {
      get when() {
        return R(() => !!e.chartViewToggle)() && !Z();
      },
      get children() {
        const _ = Id.cloneNode(!0);
        return i1(_, "click", e.chartViewToggle.onToggle, !0), p(_, (() => {
          const ue = R(() => e.chartViewToggle.view === "chart");
          return () => ue() ? jd.cloneNode(!0) : Qd.cloneNode(!0);
        })()), I(() => Se(_, "title", e.chartViewToggle.view === "chart" ? "View Depth" : "View Chart")), _;
      }
    }), null), p(N, L(J, {
      get when() {
        return oe();
      },
      get children() {
        const _ = Ed.cloneNode(!0);
        return _.$$click = () => n.scrollBy({
          left: 100,
          behavior: "smooth"
        }), _.style.setProperty("position", "absolute"), _.style.setProperty("right", "0"), _.style.setProperty("top", "0"), _.style.setProperty("bottom", "1px"), _.style.setProperty("width", "30px"), _.style.setProperty("display", "flex"), _.style.setProperty("align-items", "center"), _.style.setProperty("justify-content", "center"), _.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), _.style.setProperty("z-index", "10"), _.style.setProperty("cursor", "pointer"), _.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), _;
      }
    }), null), I((_) => {
      const ue = e.spread ? "" : "rotate", Ae = Z() ? "0px" : "var(--klinecharts-pro-period-bar-padding-right)";
      return ue !== _._v$11 && Se(ze, "class", _._v$11 = ue), Ae !== _._v$12 && se.style.setProperty("padding-right", _._v$12 = Ae), _;
    }, {
      _v$11: void 0,
      _v$12: void 0
    }), N;
  })();
};
Qe(["click", "mousedown"]);
const Zd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M12.41465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L12.41465,12C12.20873,12.5826,11.65311,13,11,13C10.34689,13,9.79127,12.5826,9.58535,12L3.5,12C3.223857,12,3,11.77614,3,11.5C3,11.22386,3.223857,11,3.5,11L9.58535,11C9.79127,10.417404,10.34689,10,11,10C11.65311,10,12.20873,10.417404,12.41465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), Vd = () => Zd.cloneNode(!0), Hd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,11L11.08535,11C11.29127,10.417404,11.84689,10,12.5,10C13.15311,10,13.70873,10.417404,13.91465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L13.91465,12C13.70873,12.5826,13.15311,13,12.5,13C11.84689,13,11.29127,12.5826,11.08535,12L6.91465,12C6.70873,12.5826,6.15311,13,5.5,13C4.671573,13,4,12.32843,4,11.5C4,10.671573,4.671573,10,5.5,10C6.15311,10,6.70873,10.417404,6.91465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), qd = () => Hd.cloneNode(!0), Yd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,12.5C6.70873,13.0826,6.15311,13.5,5.5,13.5C4.671573,13.5,4,12.82843,4,12C4,11.171573,4.671573,10.5,5.5,10.5C6.15311,10.5,6.70873,10.917404,6.91465,11.5L16.0853,11.5C16.2913,10.917404,16.846899999999998,10.5,17.5,10.5C18.328400000000002,10.5,19,11.171573,19,12C19,12.82843,18.328400000000002,13.5,17.5,13.5C16.846899999999998,13.5,16.2913,13.0826,16.0853,12.5L6.91465,12.5Z" stroke-opacity="0" stroke="none"></path></svg>'), Gd = () => Yd.cloneNode(!0), Wd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,12.41465L11,18.5C11,18.7761,11.22386,19,11.5,19C11.77614,19,12,18.7761,12,18.5L12,12.41465C12.5826,12.20873,13,11.65311,13,11C13,10.34689,12.5826,9.79127,12,9.58535L12,3.5C12,3.223857,11.77614,3,11.5,3C11.22386,3,11,3.223857,11,3.5L11,9.58535C10.417404,9.79127,10,10.34689,10,11C10,11.65311,10.417404,12.20873,11,12.41465Z" stroke-opacity="0" stroke="none"></path></svg>'), Xd = () => Wd.cloneNode(!0), Jd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.66558837890625,19C10.83716137890625,19,10.16558837890625,18.328400000000002,10.16558837890625,17.5C10.16558837890625,16.846899999999998,10.58298437890625,16.2913,11.16557337890625,16.0854L11.16557337890625,11.91464C10.58298437890625,11.70872,10.16558837890625,11.1531,10.16558837890625,10.5C10.16558837890625,9.8469,10.58298437890625,9.29128,11.16557337890625,9.08536L11.16557337890625,4.5C11.16557337890625,4.223857,11.38942837890625,4,11.66556837890625,4C11.94171837890625,4,12.16556837890625,4.223857,12.16556837890625,4.5L12.16556837890625,9.08535C12.74817837890625,9.291260000000001,13.16558837890625,9.846879999999999,13.16558837890625,10.5C13.16558837890625,11.153120000000001,12.74817837890625,11.708739999999999,12.16556837890625,11.91465L12.16556837890625,16.0854C12.74817837890625,16.2913,13.16558837890625,16.846899999999998,13.16558837890625,17.5C13.16558837890625,18.328400000000002,12.49401837890625,19,11.66558837890625,19Z" stroke-opacity="0" stroke="none"></path></svg>'), eh = () => Jd.cloneNode(!0), th = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.165603637695312,6.91465C11.748203637695312,6.70873,12.165603637695312,6.15311,12.165603637695312,5.5C12.165603637695312,4.671573,11.494033637695313,4,10.665603637695312,4C9.837176637695313,4,9.165603637695312,4.671573,9.165603637695312,5.5C9.165603637695312,6.15311,9.583007637695312,6.70873,10.165603637695312,6.91465L10.165603637695312,16.0854C9.583007637695312,16.2913,9.165603637695312,16.846899999999998,9.165603637695312,17.5C9.165603637695312,18.328400000000002,9.837176637695313,19,10.665603637695312,19C11.494033637695313,19,12.165603637695312,18.328400000000002,12.165603637695312,17.5C12.165603637695312,16.846899999999998,11.748203637695312,16.2913,11.165603637695312,16.0854L11.165603637695312,6.91465Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), nh = () => th.cloneNode(!0), rh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.146447,15.753C4.9511845,15.9483,4.9511845,16.2649,5.146447,16.4602C5.341709,16.6554,5.658291,16.6554,5.853554,16.4602L8.156600000000001,14.15711C8.352409999999999,14.25082,8.57173,14.3033,8.8033,14.3033C9.631730000000001,14.3033,10.3033,13.63172,10.3033,12.80329C10.3033,12.57172,10.250820000000001,12.352409999999999,10.157119999999999,12.15659L12.156600000000001,10.15711C12.352409999999999,10.250820000000001,12.571729999999999,10.30329,12.8033,10.30329C13.63173,10.30329,14.3033,9.63172,14.3033,8.80329C14.3033,8.57172,14.25082,8.352409999999999,14.15712,8.15659L16.4602,5.853553C16.6554,5.658291,16.6554,5.341709,16.4602,5.146447C16.2649,4.9511843,15.9483,4.9511843,15.753,5.146447L13.45001,7.449479999999999C13.25419,7.35577,13.03487,7.3032900000000005,12.8033,7.3032900000000005C11.97487,7.3032900000000005,11.3033,7.97487,11.3033,8.80329C11.3033,9.03487,11.35578,9.254190000000001,11.44949,9.450009999999999L9.450009999999999,11.449480000000001C9.254190000000001,11.35577,9.03487,11.30329,8.8033,11.30329C7.97487,11.30329,7.3033,11.97487,7.3033,12.80329C7.3033,13.03487,7.35578,13.25419,7.44949,13.45001L5.146447,15.753Z" stroke-opacity="0" stroke="none"></path></svg>'), oh = () => rh.cloneNode(!0), ih = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M7.573332939453125,14.54567903564453C7.667042939453125,14.741499035644532,7.719512939453125,14.960809035644532,7.719512939453125,15.19239903564453C7.719512939453125,16.02079903564453,7.047942939453125,16.69239903564453,6.219512939453125,16.69239903564453C5.391085939453125,16.69239903564453,4.719512939453125,16.02079903564453,4.719512939453125,15.19239903564453C4.719512939453125,14.36394903564453,5.391085939453125,13.692379035644532,6.219512939453125,13.692379035644532C6.451092939453125,13.692379035644532,6.670412939453125,13.74485903564453,6.866232939453125,13.83856903564453L9.865702939453126,10.83909903564453C9.771992939453124,10.643279035644532,9.719512939453125,10.42395903564453,9.719512939453125,10.192379035644532C9.719512939453125,9.36394903564453,10.391082939453124,8.692379035644532,11.219512939453125,8.692379035644532C11.451092939453126,8.692379035644532,11.670412939453126,8.74485903564453,11.866232939453125,8.838569035644532L15.462112939453124,5.242645035644531C15.657412939453126,5.047383335644532,15.974012939453125,5.047383335644532,16.169212939453125,5.242645035644531C16.364512939453125,5.437907035644531,16.364512939453125,5.754489035644531,16.169212939453125,5.949752035644531L12.573332939453124,9.545679035644532C12.667042939453125,9.74149903564453,12.719512939453125,9.96080903564453,12.719512939453125,10.192379035644532C12.719512939453125,11.020809035644533,12.047942939453126,11.692379035644532,11.219512939453125,11.692379035644532C10.987942939453125,11.692379035644532,10.768632939453125,11.639909035644532,10.572812939453126,11.54619903564453L7.573332939453125,14.54567903564453Z" stroke-opacity="0" stroke="none"></path></svg>'), ah = () => ih.cloneNode(!0), sh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M15.719512939453125,8.461776733398438C16.547912939453127,8.461776733398438,17.219512939453125,7.7902067333984375,17.219512939453125,6.9617767333984375C17.219512939453125,6.133349733398438,16.547912939453127,5.4617767333984375,15.719512939453125,5.4617767333984375C14.891082939453124,5.4617767333984375,14.219512939453125,6.133349733398438,14.219512939453125,6.9617767333984375C14.219512939453125,7.193346733398437,14.271992939453124,7.412666733398438,14.365692939453124,7.608486733398438L7.366222939453126,14.607956733398437C7.170402939453125,14.514256733398437,6.951082939453125,14.461776733398438,6.719512939453125,14.461776733398438C5.891085939453125,14.461776733398438,5.219512939453125,15.133346733398437,5.219512939453125,15.961776733398438C5.219512939453125,16.79017673339844,5.891085939453125,17.461776733398438,6.719512939453125,17.461776733398438C7.547942939453125,17.461776733398438,8.219512939453125,16.79017673339844,8.219512939453125,15.961776733398438C8.219512939453125,15.730176733398437,8.167032939453126,15.510876733398437,8.073322939453124,15.315066733398437L15.072802939453124,8.315586733398437C15.268612939453124,8.409296733398438,15.487912939453125,8.461776733398438,15.719512939453125,8.461776733398438Z" stroke-opacity="0" stroke="none"></path></svg>'), lh = () => sh.cloneNode(!0), ch = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17.0643,7.033864912109375L18,3.585784912109375L14.5078,4.509695912109375L15.3537,5.344934912109375L6.02026,14.560584912109375C5.87635,14.517484912109374,5.72366,14.494284912109375,5.5655,14.494284912109375C4.7009,14.494284912109375,4,15.186384912109375,4,16.040084912109375C4,16.893784912109375,4.7009,17.585784912109375,5.5655,17.585784912109375C6.43011,17.585784912109375,7.13101,16.893784912109375,7.13101,16.040084912109375C7.13101,15.722284912109375,7.03392,15.426984912109376,6.86744,15.181384912109374L16.0917,6.073604912109375L17.0643,7.033864912109375Z" stroke-opacity="0" stroke="none"></path></svg>'), uh = () => ch.cloneNode(!0), dh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,13.00505L18.5,13.00505C18.7761,13.00505,19,13.228909999999999,19,13.50505C19,13.781189999999999,18.7761,14.00505,18.5,14.00505L6.91465,14.00505C6.70873,14.58765,6.15311,15.00505,5.5,15.00505C4.671573,15.00505,4,14.33348,4,13.50505C4,12.67662,4.671573,12.00505,5.5,12.00505C6.15311,12.00505,6.70873,12.422450000000001,6.91465,13.00505ZM7.81404,11.625L10.48591,11.625L10.48591,10.90625L9.65193,10.90625L9.65193,7.125L8.997630000000001,7.125C8.71443,7.306641,8.415600000000001,7.419922,7.96443,7.498047L7.96443,8.05078L8.77497,8.05078L8.77497,10.90625L7.81404,10.90625L7.81404,11.625ZM11.081620000000001,11.625L14.0562,11.625L14.0562,10.88281L13.09724,10.88281C12.8863,10.88281,12.59333,10.90625,12.36482,10.93555C13.17537,10.11328,13.84724,9.2207,13.84724,8.39062C13.84724,7.541016,13.28865,7,12.4488,7C11.84333,7,11.446850000000001,7.234375,11.03279,7.679688L11.52497,8.16797C11.747630000000001,7.914062,12.0113,7.697266,12.33552,7.697266C12.7613,7.697266,13.00154,7.982422,13.00154,8.43359C13.00154,9.14648,12.29255,10.00781,11.081620000000001,11.11523L11.081620000000001,11.625ZM15.9605,11.75C16.8121,11.75,17.526899999999998,11.2832,17.526899999999998,10.4375C17.526899999999998,9.82031,17.142200000000003,9.43945,16.6441,9.30078L16.6441,9.27148C17.1129,9.08594,17.3824,8.7207,17.3824,8.21289C17.3824,7.421875,16.8004,7,15.9429,7C15.4215,7,14.9957,7.210938,14.6109,7.541016L15.066,8.11133C15.3258,7.849609,15.5836,7.697266,15.9019,7.697266C16.2789,7.697266,16.4957,7.914062,16.4957,8.28125C16.4957,8.70898,16.2301,9,15.4215,9L15.4215,9.63672C16.3804,9.63672,16.6383,9.91992,16.6383,10.38086C16.6383,10.79688,16.3336,11.03125,15.8824,11.03125C15.4742,11.03125,15.1578,10.82227,14.8922,10.55078L14.4781,11.13281C14.7906,11.486329999999999,15.2652,11.75,15.9605,11.75Z" stroke-opacity="0" stroke="none"></path></svg>'), hh = () => dh.cloneNode(!0), fh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.146447,14.178126025390625C2.9511847,13.982826025390626,2.9511847,13.666226025390625,3.146447,13.470926025390625L7.39146,9.225966025390626C7.35417,9.095106025390624,7.33421,8.956946025390625,7.33421,8.814116025390625C7.33421,7.985696025390625,8.00578,7.314116025390625,8.834209999999999,7.314116025390625C8.97703,7.314116025390625,9.11519,7.334086025390625,9.24605,7.371366025390625L13.753,2.864373025390625C13.9483,2.669110325390625,14.2649,2.669110325390625,14.4602,2.864373025390625C14.6554,3.059635025390625,14.6554,3.376217025390625,14.4602,3.571479025390625L10.06916,7.962476025390625C10.23631,8.204386025390626,10.334209999999999,8.497826025390625,10.334209999999999,8.814116025390625C10.334209999999999,9.642546025390626,9.66264,10.314116025390625,8.834209999999999,10.314116025390625C8.51791,10.314116025390625,8.22448,10.216226025390625,7.98256,10.049076025390626L3.853554,14.178126025390625C3.658291,14.373326025390625,3.341709,14.373326025390625,3.146447,14.178126025390625ZM7.67736,19.188526025390626C7.4821,18.993226025390626,7.4821,18.676626025390625,7.67736,18.481426025390626L9.9804,16.178326025390625C9.88669,15.982526025390625,9.834209999999999,15.763226025390624,9.834209999999999,15.531626025390626C9.834209999999999,14.703226025390626,10.50578,14.031626025390626,11.33421,14.031626025390626C11.56579,14.031626025390626,11.78511,14.084126025390624,11.98093,14.177826025390624L13.9804,12.178356025390626C13.8867,11.982536025390624,13.8342,11.763216025390625,13.8342,11.531636025390625C13.8342,10.703206025390624,14.5058,10.031636025390625,15.3342,10.031636025390625C15.5658,10.031636025390625,15.7851,10.084116025390625,15.9809,10.177826025390626L18.284,7.874796025390625C18.4792,7.679536025390625,18.7958,7.679536025390625,18.9911,7.874796025390625C19.1863,8.070056025390624,19.1863,8.386636025390626,18.9911,8.581906025390625L16.688000000000002,10.884936025390624C16.7817,11.080756025390626,16.8342,11.300066025390626,16.8342,11.531636025390625C16.8342,12.360066025390624,16.162599999999998,13.031626025390626,15.3342,13.031626025390626C15.1026,13.031626025390626,14.8833,12.979126025390626,14.6875,12.885426025390625L12.68803,14.884926025390625C12.78174,15.080726025390625,12.83421,15.300026025390626,12.83421,15.531626025390626C12.83421,16.360026025390624,12.16264,17.031626025390626,11.33421,17.031626025390626C11.10264,17.031626025390626,10.88333,16.979126025390627,10.68751,16.885426025390625L8.38446,19.188526025390626C8.1892,19.383726025390626,7.87262,19.383726025390626,7.67736,19.188526025390626Z" stroke-opacity="0" stroke="none"></path></svg>'), yh = () => fh.cloneNode(!0), gh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.3367688759765626,12.63173C3.5320318759765623,12.82699,3.8486138759765627,12.82699,4.043876875976562,12.63173L11.822052875976562,4.853553C12.017312875976563,4.658291,12.017312875976563,4.341708,11.822052875976562,4.146446C11.626792875976562,3.9511843,11.310202875976563,3.9511843,11.114942875976563,4.146446L3.3367688759765626,11.92462C3.1415071759765625,12.11988,3.1415071759765625,12.43647,3.3367688759765626,12.63173ZM5.001492875976562,17.0351C4.806232875976562,16.8399,4.806232875976562,16.5233,5.001492875976562,16.328L7.304532875976562,14.025C7.210822875976563,13.82916,7.158352875976563,13.60984,7.158352875976563,13.37827C7.158352875976563,12.54984,7.829922875976562,11.87827,8.658352875976561,11.87827C8.889922875976563,11.87827,9.109232875976563,11.93075,9.305052875976562,12.02446L11.304532875976562,10.02498C11.210822875976563,9.82916,11.158352875976561,9.60984,11.158352875976561,9.37827C11.158352875976561,8.54984,11.829922875976562,7.8782700000000006,12.658352875976563,7.8782700000000006C12.889922875976563,7.8782700000000006,13.109232875976563,7.93075,13.305022875976562,8.024460000000001L15.608122875976562,5.72142C15.803322875976562,5.5261499999999995,16.119922875976563,5.5261499999999995,16.315222875976563,5.72142C16.510422875976563,5.9166799999999995,16.510422875976563,6.23326,16.315222875976563,6.42852L14.012122875976562,8.73156C14.105822875976562,8.92738,14.158322875976562,9.1467,14.158322875976562,9.37827C14.158322875976562,10.2067,13.486822875976562,10.87827,12.658352875976563,10.87827C12.426772875976562,10.87827,12.207452875976562,10.82579,12.011642875976563,10.73209L10.012162875976562,12.73156C10.105872875976562,12.92738,10.158352875976561,13.1467,10.158352875976561,13.37827C10.158352875976561,14.2067,9.486772875976563,14.8783,8.658352875976561,14.8783C8.426772875976562,14.8783,8.207452875976562,14.8258,8.011642875976563,14.7321L5.708602875976562,17.0351C5.513342875976562,17.2304,5.196752875976562,17.2304,5.001492875976562,17.0351ZM10.415712875976563,18.328C10.220452875976562,18.5233,9.903862875976563,18.5233,9.708602875976563,18.328C9.513342875976562,18.1328,9.513342875976562,17.816200000000002,9.708602875976563,17.6209L12.304532875976562,15.025C12.210822875976563,14.8292,12.158352875976563,14.6098,12.158352875976563,14.3783C12.158352875976563,13.54984,12.829922875976562,12.87827,13.658322875976562,12.87827C13.889922875976563,12.87827,14.109222875976563,12.93075,14.305022875976562,13.02446L17.486822875976564,9.84274C17.682022875976564,9.64747,17.99862287597656,9.64747,18.19392287597656,9.84274C18.38912287597656,10.038,18.38912287597656,10.35458,18.19392287597656,10.54984L15.012122875976562,13.73156C15.105822875976562,13.92738,15.158322875976562,14.1467,15.158322875976562,14.3783C15.158322875976562,15.2067,14.486822875976562,15.8783,13.658322875976562,15.8783C13.426822875976562,15.8783,13.207422875976562,15.8258,13.011642875976563,15.7321L10.415712875976563,18.328Z" stroke-opacity="0" stroke="none"></path></svg>'), mh = () => gh.cloneNode(!0), ph = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M13.1889,6C12.98303,6.582599999999999,12.42741,7,11.7743,7C11.12119,7,10.565570000000001,6.582599999999999,10.35965,6L3.5,6C3.223857,6,3,5.77614,3,5.5C3,5.22386,3.223857,5,3.5,5L10.35965,5C10.565570000000001,4.417404,11.12119,4,11.7743,4C12.42741,4,12.98303,4.417404,13.1889,5L18.5,5C18.7761,5,19,5.22386,19,5.5C19,5.77614,18.7761,6,18.5,6L13.1889,6ZM3,8.5C3,8.22386,3.223857,8,3.5,8L18.5,8C18.7761,8,19,8.22386,19,8.5C19,8.77614,18.7761,9,18.5,9L3.5,9C3.223857,9,3,8.77614,3,8.5ZM3.278549,11.5C3.278549,11.22386,3.502407,11,3.778549,11L18.7785,11C19.0547,11,19.2785,11.22386,19.2785,11.5C19.2785,11.77614,19.0547,12,18.7785,12L3.778549,12C3.502407,12,3.278549,11.77614,3.278549,11.5ZM3.139267,14.5C3.139267,14.2239,3.363124,14,3.6392670000000003,14L18.6393,14C18.915399999999998,14,19.1393,14.2239,19.1393,14.5C19.1393,14.7761,18.915399999999998,15,18.6393,15L3.6392670000000003,15C3.363124,15,3.139267,14.7761,3.139267,14.5ZM13.1889,18C12.98303,18.5826,12.42741,19,11.7743,19C11.12119,19,10.565570000000001,18.5826,10.35965,18L3.778549,18C3.502407,18,3.278549,17.7761,3.278549,17.5C3.278549,17.2239,3.502407,17,3.778549,17L10.35965,17C10.565570000000001,16.4174,11.12119,16,11.7743,16C12.42741,16,12.98303,16.4174,13.1889,17L18.7785,17C19.0547,17,19.2785,17.2239,19.2785,17.5C19.2785,17.7761,19.0547,18,18.7785,18L13.1889,18Z" stroke-opacity="0" stroke="none"></path></svg>'), vh = () => ph.cloneNode(!0), Ch = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4.91465,6C4.70873,6.582599999999999,4.15311,7,3.5,7C2.671573,7,2,6.32843,2,5.5C2,4.671573,2.671573,4,3.5,4C4.15311,4,4.70873,4.417404,4.91465,5L18.2257,5C18.5018,5,18.7257,5.22386,18.7257,5.5C18.7257,5.77614,18.5018,6,18.2257,6L4.91465,6ZM2.7257,8.5C2.7257,8.22386,2.949558,8,3.2257,8L18.2257,8C18.5018,8,18.7257,8.22386,18.7257,8.5C18.7257,8.77614,18.5018,9,18.2257,9L3.2257,9C2.949558,9,2.7257,8.77614,2.7257,8.5ZM3.00425,11.5C3.00425,11.22386,3.22811,11,3.50425,11L18.5042,11C18.7804,11,19.0042,11.22386,19.0042,11.5C19.0042,11.77614,18.7804,12,18.5042,12L3.50425,12C3.22811,12,3.00425,11.77614,3.00425,11.5ZM2.864967,14.5C2.864967,14.2239,3.08882,14,3.36497,14L18.365,14C18.6411,14,18.865,14.2239,18.865,14.5C18.865,14.7761,18.6411,15,18.365,15L3.36497,15C3.08882,15,2.864967,14.7761,2.864967,14.5ZM20,17.5C20,18.328400000000002,19.3284,19,18.5,19C17.846899999999998,19,17.2913,18.5826,17.0854,18L3.50425,18C3.22811,18,3.00425,17.7761,3.00425,17.5C3.00425,17.2239,3.22811,17,3.50425,17L17.0854,17C17.2913,16.4174,17.846899999999998,16,18.5,16C19.3284,16,20,16.671599999999998,20,17.5Z" stroke-opacity="0" stroke="none"></path></svg>'), $h = () => Ch.cloneNode(!0), bh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="5" ry="5" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="3" ry="3" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse></svg>'), _h = () => bh.cloneNode(!0), kh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3,7.32468C5.90649,3.3893050000000002,11.49833,2.81306,14.6674,6.31944C14.9056,6.1554199999999994,15.192,6.05979,15.5,6.05979C15.845,6.05979,16.1628,6.17974,16.4162,6.381349999999999L18.4509,4.23827L19,4.816615L16.8945,7.03429C16.962600000000002,7.21075,17,7.40319,17,7.60463C17,8.45782,16.328400000000002,9.14947,15.5,9.14947C14.6716,9.14947,14,8.45782,14,7.60463C14,7.36402,14.0534,7.13625,14.1487,6.93322C11.32695,3.748365,6.25159,4.253956,3.612785,7.82695L3,7.32468ZM14.09,15.4717C15.7427,13.78985,16.244500000000002,11.524740000000001,15.5633,9.30134L15.5618,9.30134L16.3012,9.0502C17.072400000000002,11.56646,16.497700000000002,14.158,14.6282,16.0599C12.28737,18.442,8.62386,18.6988,6.41348,16.4501C4.5526,14.5572,4.52076,11.19671,6.36766,9.3177C7.89069,7.76754,10.07544,7.706189999999999,11.56741,9.22363C11.95453,9.61742,12.24817,10.08363,12.43369,10.57677L14.1451,8.77421L14.6942,9.35256L12.64982,11.50582C12.65827,11.59712,12.66295,11.68839,12.66378,11.77936C12.87398,12.04523,13,12.38451,13,12.7541C13,13.60729,12.32843,14.2989,11.5,14.2989C10.67157,14.2989,10,13.60729,10,12.7541C10,11.90091,10.67157,11.20926,11.5,11.20926C11.60387,11.20926,11.70528,11.220130000000001,11.8032,11.240829999999999L11.81763,11.22564C11.69858,10.71874,11.42858,10.21929,11.0284,9.81179C9.844000000000001,8.60765,8.136890000000001,8.65592,6.90822,9.90586C5.37975,11.460930000000001,5.40693,14.288,6.95404,15.8619C8.84598,17.7867,12.03496,17.5626,14.09,15.4717Z" stroke-opacity="0" stroke="none"></path></svg>'), xh = () => kh.cloneNode(!0), Lh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4,17.0854L4,3.5C4,3.223858,4.22386,3,4.5,3C4.77614,3,5,3.223858,5,3.5L5,10L7.57584,10L9.8127,4.46359C9.91614,4.20756,10.20756,4.08386,10.46359,4.1873000000000005C10.71963,4.29075,10.84333,4.58216,10.73988,4.8382000000000005L8.65438,10L11.08535,10C11.29127,9.4174,11.84689,9,12.5,9C12.65154,9,12.79784,9.02247,12.93573,9.06427L16.6464,5.35355C16.8417,5.15829,17.1583,5.15829,17.3536,5.35355C17.5488,5.54882,17.5488,5.8654,17.3536,6.06066L13.7475,9.66675C13.907,9.90508,14,10.19168,14,10.5C14,11.15311,13.5826,11.70873,13,11.91465L13,14.3638L18.3714,12.1936C18.6274,12.09015,18.918799999999997,12.21385,19.0222,12.46989C19.1257,12.72592,19.002,13.0173,18.746000000000002,13.1208L13,15.4423L13,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854ZM6.3729499999999994,17.0413L12,14.7678L12,11.91465C11.88136,11.87271,11.76956,11.81627,11.66675,11.74746L6.3729499999999994,17.0413ZM12,15.8463L6.6694700000000005,18L12,18L12,15.8463ZM6.38629,15.6137L8.250350000000001,11L11,11L6.38629,15.6137ZM5,11L7.17182,11L5,16.3754L5,11Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), wh = () => Lh.cloneNode(!0), Ah = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17,4.5C17,5.32843,16.328400000000002,6,15.5,6C15.0931,6,14.7241,5.83802,14.4539,5.57503L5.98992,8.32515C5.99658,8.38251,6,8.440850000000001,6,8.5C6,9.15311,5.582599999999999,9.70873,5,9.91465L5,11.08535C5.42621,11.236,5.763999999999999,11.57379,5.91465,12L19.5,12C19.7761,12,20,12.22386,20,12.5C20,12.77614,19.7761,13,19.5,13L5.91465,13C5.70873,13.5826,5.15311,14,4.5,14C3.671573,14,3,13.3284,3,12.5C3,11.84689,3.417404,11.29127,4,11.08535L4,9.91465C3.417404,9.70873,3,9.15311,3,8.5C3,7.67157,3.671573,7,4.5,7C4.90411,7,5.2709,7.15981,5.5406200000000005,7.41967L14.0093,4.66802C14.0032,4.6128599999999995,14,4.5568,14,4.5C14,3.671573,14.6716,3,15.5,3C16.328400000000002,3,17,3.671573,17,4.5ZM4,15.5C4,15.2239,4.22386,15,4.5,15L19.5,15C19.7761,15,20,15.2239,20,15.5C20,15.7761,19.7761,16,19.5,16L4.5,16C4.22386,16,4,15.7761,4,15.5ZM4,18.5C4,18.2239,4.22386,18,4.5,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L4.5,19C4.22386,19,4,18.7761,4,18.5Z" stroke-opacity="0" stroke="none"></path></svg>'), Mh = () => Ah.cloneNode(!0), Th = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M20,3.5C20,4.15311,19.5826,4.70873,19,4.91465L19,18.5C19,18.7761,18.7761,19,18.5,19L4.91465,19C4.70873,19.5826,4.15311,20,3.5,20C2.671573,20,2,19.3284,2,18.5C2,17.846899999999998,2.417404,17.2913,3,17.0854L3,3.5C3,3.22386,3.22386,3,3.5,3L17.0854,3C17.2913,2.417404,17.846899999999998,2,18.5,2C19.3284,2,20,2.671573,20,3.5ZM17.0854,4C17.236,4.42621,17.5738,4.763999999999999,18,4.91465L18,8L14,8L14,4L17.0854,4ZM13,4L13,8L9,8L9,4L13,4ZM13,9L9,9L9,13L13,13L13,9ZM13,14L9,14L9,18L13,18L13,14ZM14,18L14,14L18,14L18,18L14,18ZM18,13L14,13L14,9L18,9L18,13ZM4.91465,18C4.763999999999999,17.5738,4.42621,17.236,4,17.0854L4,14L8,14L8,18L4.91465,18ZM4,8L4,4L8,4L8,8L4,8ZM8,9L8,13L4,13L4,9L8,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Sh = () => Th.cloneNode(!0), Ph = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" fill="none" stroke-opacity="1" stroke-width="1"></ellipse></svg>'), Oh = () => Ph.cloneNode(!0), Dh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.57625,6.9981C11.55099,6.999359999999999,11.52557,7,11.5,7C11.34,7,11.18584,6.97495,11.04125,6.9285499999999995L5.55401,16.4327C5.713760000000001,16.5905,5.83826,16.7839,5.91465,17L16.0854,17C16.2187,16.622700000000002,16.4987,16.314700000000002,16.8569,16.1445L11.57625,6.9981ZM12.50759,6.611219999999999C12.81005,6.336790000000001,13,5.94058,13,5.5C13,4.671573,12.32843,4,11.5,4C10.67157,4,10,4.671573,10,5.5C10,5.80059,10.08841,6.08052,10.24066,6.31522L4.64514,16.0069C4.59738,16.002299999999998,4.54896,16,4.5,16C3.671573,16,3,16.671599999999998,3,17.5C3,18.328400000000002,3.671573,19,4.5,19C5.15311,19,5.70873,18.5826,5.91465,18L16.0854,18C16.2913,18.5826,16.846899999999998,19,17.5,19C18.328400000000002,19,19,18.328400000000002,19,17.5C19,16.8365,18.5691,16.2735,17.971899999999998,16.075699999999998L12.50759,6.611219999999999Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Nh = () => Dh.cloneNode(!0), Ih = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19,4.5C19,5.15311,18.5826,5.70873,18,5.91465L18,18.5C18,18.7761,17.7761,19,17.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854L4,4.5C4,4.22386,4.22386,4,4.5,4L16.0854,4C16.2913,3.417404,16.846899999999998,3,17.5,3C18.328400000000002,3,19,3.671573,19,4.5ZM5,5L16.0854,5C16.236,5.42621,16.5738,5.763999999999999,17,5.91465L17,18L5.91465,18C5.763999999999999,17.5738,5.42621,17.236,5,17.0854L5,5Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Eh = () => Ih.cloneNode(!0), Bh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19.6401,7.99355C20.4028,7.92291,21,7.2811900000000005,21,6.5C21,5.671573,20.3284,5,19.5,5C18.8469,5,18.2913,5.417404,18.0854,6L7.62067,6C7.34453,6,7.12067,6.22386,7.12067,6.5C7.12067,6.5479,7.12741,6.59423,7.13999,6.63809L3.2294099999999997,15.0243C2.530138,15.1517,2,15.764,2,16.5C2,17.328400000000002,2.671573,18,3.5,18C4.15311,18,4.70873,17.5826,4.91465,17L14.5963,17C14.6456,17.076,14.7162,17.1396,14.8044,17.1807C15.0546,17.2974,15.3521,17.1891,15.4688,16.9388L19.6401,7.99355ZM14.7896,16.0293L18.6551,7.739599999999999C18.3942,7.56144,18.1925,7.30307,18.0854,7L8.0746,7L4.25044,15.2009C4.55701,15.3784,4.79493,15.6613,4.91465,16L14.6207,16C14.68,16,14.7368,16.0103,14.7896,16.0293Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Fh = () => Bh.cloneNode(!0), Uh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.134443814697265,7.494615087890625L8.764323814697265,7.494615087890625L8.764323814697265,3.414215087890625L8.310223814697267,3.414215087890625L7.294603814697266,4.005035087890625L7.289713814697266,4.634915087890625L8.134443814697265,4.149892087890625L8.134443814697265,7.494615087890625ZM18.832003814697266,6.933095087890624Q19.004603814697266,6.635245087890625,19.004603814697266,6.2543850878906255Q19.004603814697266,5.884915087890625,18.845103814697264,5.593575087890625Q18.685503814697267,5.3006050878906255,18.399103814697266,5.136225087890625Q18.114303814697266,4.9702050878906245,17.754603814697266,4.9653250878906245L18.820603814697265,3.840647087890625L18.820603814697265,3.414215087890625L16.519203814697264,3.414215087890625L16.519203814697264,3.939931087890625L18.050803814697264,3.939931087890625L16.719403814697266,5.334785087890625L17.074203814697263,5.7205350878906245Q17.254903814697265,5.484525087890625,17.619503814697268,5.484525087890625Q17.980803814697268,5.484525087890625,18.187503814697266,5.689605087890625Q18.394203814697267,5.894685087890625,18.394203814697267,6.2543850878906255Q18.394203814697267,6.604315087890625,18.187503814697266,6.822415087890625Q17.980803814697268,7.0405150878906255,17.640603814697265,7.0405150878906255Q17.334603814697267,7.0405150878906255,17.124703814697266,6.890775087890625Q16.914703814697265,6.739415087890626,16.820303814697265,6.469225087890624L16.354803814697263,6.744295087890626Q16.480103814697266,7.125155087890625,16.821903814697265,7.341625087890625Q17.165403814697264,7.559725087890625,17.640603814697265,7.559725087890625Q18.039403814697266,7.559725087890625,18.348603814697267,7.393705087890625Q18.659503814697267,7.229315087890625,18.832003814697266,6.933095087890624ZM10.000003814697266,10.634915087890626C10.000003814697266,11.024655087890626,9.851363814697265,11.379685087890625,9.607683814697266,11.646395087890625L12.168903814697266,15.171615087890626C12.275403814697265,15.147615087890625,12.386203814697266,15.134915087890626,12.500003814697266,15.134915087890626C12.596503814697266,15.134915087890626,12.690803814697265,15.144015087890624,12.782303814697265,15.161415087890624L16.108803814697268,11.196955087890625C16.038703814697264,11.023375087890624,16.000003814697266,10.833655087890625,16.000003814697266,10.634915087890626C16.000003814697266,9.806495087890625,16.671603814697264,9.134915087890626,17.500003814697266,9.134915087890626C18.328403814697264,9.134915087890626,19.000003814697266,9.806495087890625,19.000003814697266,10.634915087890626C19.000003814697266,11.463345087890625,18.328403814697264,12.134915087890626,17.500003814697266,12.134915087890626C17.239503814697265,12.134915087890626,16.994503814697268,12.068495087890625,16.781003814697264,11.951675087890624L13.654703814697266,15.677415087890624C13.870303814697266,15.937215087890625,14.000003814697266,16.270915087890625,14.000003814697266,16.634915087890626C14.000003814697266,17.463315087890624,13.328403814697266,18.134915087890626,12.500003814697266,18.134915087890626C11.671573814697265,18.134915087890626,11.000003814697266,17.463315087890624,11.000003814697266,16.634915087890626C11.000003814697266,16.284415087890626,11.120193814697265,15.962015087890626,11.321603814697266,15.706715087890625L8.715393814697265,12.119565087890624C8.645053814697267,12.129685087890625,8.573143814697266,12.134915087890626,8.500003814697266,12.134915087890626C8.162103814697264,12.134915087890626,7.8503038146972655,12.023195087890626,7.599523814697266,11.834665087890626L4.505583814697266,15.521915087890624C4.809213814697266,15.796415087890624,5.000003814697266,16.193415087890624,5.000003814697266,16.634915087890626C5.000003814697266,17.463315087890624,4.328433814697266,18.134915087890626,3.5000038146972656,18.134915087890626C2.6715768146972656,18.134915087890626,2.0000038146972656,17.463315087890624,2.0000038146972656,16.634915087890626C2.0000038146972656,15.806515087890626,2.6715768146972656,15.134915087890626,3.5000038146972656,15.134915087890626C3.508253814697266,15.134915087890626,3.5164838146972657,15.135015087890626,3.524703814697266,15.135115087890625L7.033823814697266,10.953115087890625C7.011673814697265,10.850565087890626,7.000003814697266,10.744105087890624,7.000003814697266,10.634915087890626C7.000003814697266,9.806495087890625,7.671573814697266,9.134915087890626,8.500003814697266,9.134915087890626C9.328433814697267,9.134915087890626,10.000003814697266,9.806495087890625,10.000003814697266,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), zh = () => Uh.cloneNode(!0), Kh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.13444,7.494615087890625L8.76432,7.494615087890625L8.76432,3.414215087890625L8.310220000000001,3.414215087890625L7.2946,4.005035087890625L7.28971,4.634915087890625L8.13444,4.149892087890625L8.13444,7.494615087890625ZM18.832,6.929835087890625Q19.0046,6.635245087890625,19.0046,6.2543850878906255Q19.0046,5.889805087890625,18.8451,5.5952050878906245Q18.6855,5.3006050878906255,18.3975,5.132965087890625Q18.1094,4.9653250878906245,17.7399,4.9653250878906245Q17.435499999999998,4.9653250878906245,17.1556,5.149245087890625L17.2793,3.939931087890625L18.8304,3.939931087890625L18.8304,3.414215087890625L16.7406,3.414215087890625L16.5094,5.665195087890625L17.0156,5.795405087890625Q17.095399999999998,5.655425087890626,17.2516,5.570795087890625Q17.4095,5.484525087890625,17.6357,5.484525087890625Q17.9694,5.484525087890625,18.1842,5.697745087890625Q18.4007,5.909335087890625,18.4007,6.2543850878906255Q18.4007,6.604315087890625,18.1842,6.822415087890625Q17.9694,7.0405150878906255,17.6292,7.0405150878906255Q17.3298,7.0405150878906255,17.119799999999998,6.890775087890625Q16.9098,6.739415087890626,16.825200000000002,6.474115087890625L16.3597,6.749175087890626Q16.470399999999998,7.110505087890624,16.807299999999998,7.335115087890625Q17.144199999999998,7.559725087890625,17.6292,7.559725087890625Q18.0296,7.559725087890625,18.3438,7.392075087890625Q18.6595,7.224435087890625,18.832,6.929835087890625ZM10,10.634915087890626C10,11.024655087890626,9.85136,11.379685087890625,9.60768,11.646395087890625L12.1689,15.171615087890626C12.2754,15.147615087890625,12.3862,15.134915087890626,12.5,15.134915087890626C12.5965,15.134915087890626,12.6908,15.144015087890624,12.7823,15.161415087890624L16.108800000000002,11.196955087890625C16.0387,11.023375087890624,16,10.833655087890625,16,10.634915087890626C16,9.806495087890625,16.671599999999998,9.134915087890626,17.5,9.134915087890626C18.3284,9.134915087890626,19,9.806495087890625,19,10.634915087890626C19,11.463345087890625,18.3284,12.134915087890626,17.5,12.134915087890626C17.2395,12.134915087890626,16.994500000000002,12.068505087890625,16.781,11.951675087890624L13.6547,15.677415087890624C13.8703,15.937215087890625,14,16.270915087890625,14,16.634915087890626C14,17.463315087890624,13.3284,18.134915087890626,12.5,18.134915087890626C11.67157,18.134915087890626,11,17.463315087890624,11,16.634915087890626C11,16.284415087890626,11.12019,15.962015087890626,11.3216,15.706715087890625L8.71539,12.119565087890624C8.645050000000001,12.129685087890625,8.57314,12.134915087890626,8.5,12.134915087890626C8.162099999999999,12.134915087890626,7.8503,12.023195087890626,7.59952,11.834665087890626L4.50558,15.521915087890624C4.80921,15.796415087890624,5,16.193415087890624,5,16.634915087890626C5,17.463315087890624,4.32843,18.134915087890626,3.5,18.134915087890626C2.671573,18.134915087890626,2,17.463315087890624,2,16.634915087890626C2,15.806515087890626,2.671573,15.134915087890626,3.5,15.134915087890626C3.5082500000000003,15.134915087890626,3.51648,15.135015087890626,3.5247,15.135115087890625L7.03382,10.953115087890625C7.01167,10.850565087890626,7,10.744105087890624,7,10.634915087890626C7,9.806495087890625,7.67157,9.134915087890626,8.5,9.134915087890626C9.32843,9.134915087890626,10,9.806495087890625,10,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), jh = () => Kh.cloneNode(!0), Qh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M18.8532,7.020985087890625Q19.0257,6.734525087890625,19.0257,6.369945087890625Q19.0257,6.020005087890625,18.8499,5.754705087890625Q18.6758,5.489415087890626,18.3649,5.339675087890625Q18.5944,5.209465087890625,18.7214,4.994615087890625Q18.8499,4.779775087890625,18.8499,4.5193550878906255Q18.8499,4.2003480878906245,18.7002,3.951324087890625Q18.5505,3.700673087890625,18.277,3.557444087890625Q18.0052,3.414215087890625,17.6455,3.414215087890625Q17.285800000000002,3.414215087890625,17.0107,3.557444087890625Q16.7357,3.700673087890625,16.5843,3.951324087890625Q16.4346,4.2003480878906245,16.4346,4.5193550878906255Q16.4346,4.779775087890625,16.561500000000002,4.994615087890625Q16.6901,5.209465087890625,16.919600000000003,5.339675087890625Q16.6055,5.489415087890626,16.4297,5.757965087890625Q16.255499999999998,6.024895087890625,16.255499999999998,6.369945087890625Q16.255499999999998,6.734525087890625,16.4297,7.020985087890625Q16.6055,7.305815087890625,16.919600000000003,7.465325087890625Q17.2354,7.624825087890625,17.6455,7.624825087890625Q18.0557,7.624825087890625,18.3682,7.465325087890625Q18.6807,7.305815087890625,18.8532,7.020985087890625ZM8.76432,7.559725087890625L8.13444,7.559725087890625L8.13444,4.214996087890625L7.28971,4.700025087890625L7.2946,4.070139087890625L8.310220000000001,3.479319087890625L8.76432,3.479319087890625L8.76432,7.559725087890625ZM17.1816,4.955555087890625Q17.0042,4.784655087890625,17.0042,4.5095950878906255Q17.0042,4.229645087890625,17.18,4.057119087890625Q17.355800000000002,3.884592087890625,17.6455,3.884592087890625Q17.935200000000002,3.884592087890625,18.1077,4.057119087890625Q18.2803,4.229645087890625,18.2803,4.5095950878906255Q18.2803,4.784655087890625,18.1045,4.955555087890625Q17.930300000000003,5.124825087890625,17.6455,5.124825087890625Q17.3607,5.124825087890625,17.1816,4.955555087890625ZM18.2217,5.7953950878906255Q18.4398,6.005365087890625,18.4398,6.3552950878906245Q18.4398,6.705235087890625,18.2217,6.915195087890625Q18.0052,7.125155087890625,17.6455,7.125155087890625Q17.285800000000002,7.125155087890625,17.067700000000002,6.915195087890625Q16.849600000000002,6.705235087890625,16.849600000000002,6.3552950878906245Q16.849600000000002,6.005365087890625,17.064500000000002,5.7953950878906255Q17.2793,5.585435087890625,17.6455,5.585435087890625Q18.0052,5.585435087890625,18.2217,5.7953950878906255ZM9.60768,11.711495087890626C9.85136,11.444785087890626,10,11.089765087890626,10,10.700025087890625C10,9.871595087890626,9.32843,9.200025087890625,8.5,9.200025087890625C7.67157,9.200025087890625,7,9.871595087890626,7,10.700025087890625C7,10.809205087890625,7.01167,10.915665087890625,7.03382,11.018215087890624L3.5247,15.200215087890625C3.51648,15.200115087890625,3.5082500000000003,15.200015087890625,3.5,15.200015087890625C2.671573,15.200015087890625,2,15.871615087890625,2,16.700015087890627C2,17.528415087890625,2.671573,18.200015087890627,3.5,18.200015087890627C4.32843,18.200015087890627,5,17.528415087890625,5,16.700015087890627C5,16.258515087890625,4.80921,15.861515087890625,4.50558,15.587015087890626L7.59952,11.899765087890625C7.8503,12.088295087890625,8.162099999999999,12.200025087890625,8.5,12.200025087890625C8.57314,12.200025087890625,8.645050000000001,12.194785087890626,8.71539,12.184675087890625L11.3216,15.771815087890625C11.12019,16.027215087890625,11,16.349515087890623,11,16.700015087890627C11,17.528415087890625,11.67157,18.200015087890627,12.5,18.200015087890627C13.3284,18.200015087890627,14,17.528415087890625,14,16.700015087890627C14,16.336015087890623,13.8703,16.002315087890626,13.6547,15.742515087890625L16.781,12.016775087890625C16.994500000000002,12.133605087890626,17.2395,12.200025087890625,17.5,12.200025087890625C18.3284,12.200025087890625,19,11.528445087890624,19,10.700025087890625C19,9.871595087890626,18.3284,9.200025087890625,17.5,9.200025087890625C16.671599999999998,9.200025087890625,16,9.871595087890626,16,10.700025087890625C16,10.898765087890624,16.0387,11.088475087890625,16.108800000000002,11.262055087890625L12.7823,15.226515087890625C12.6908,15.209115087890625,12.5965,15.200015087890625,12.5,15.200015087890625C12.3862,15.200015087890625,12.2754,15.212715087890626,12.1689,15.236715087890625L9.60768,11.711495087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Rh = () => Qh.cloneNode(!0), Zh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M9.474616630859375,7.494615087890625L8.844736630859375,7.494615087890625L8.844736630859375,4.149892087890625L8.000006630859374,4.634915087890625L8.004896630859374,4.005035087890625L9.020516630859376,3.414215087890625L9.474616630859375,3.414215087890625L9.474616630859375,7.494615087890625ZM18.529296630859378,4.8318550878906255Q18.307996630859375,5.028795087890625,18.122396630859377,5.385245087890625Q17.868496630859376,5.019035087890625,17.629196630859376,4.8269750878906255Q17.389996630859375,4.634915087890625,17.168596630859376,4.634915087890625Q16.794296630859375,4.634915087890625,16.522496630859376,4.976715087890625Q16.252296630859377,5.3168850878906255,16.252296630859377,5.7856350878906255Q16.252296630859377,6.218575087890625,16.502896630859375,6.521315087890625Q16.755196630859373,6.822415087890625,17.114896630859377,6.822415087890625Q17.368796630859375,6.822415087890625,17.588596630859374,6.625475087890624Q17.809896630859377,6.428535087890625,17.998696630859374,6.0688350878906245Q18.249396630859373,6.439935087890625,18.488596630859377,6.631985087890625Q18.727896630859377,6.822415087890625,18.952496630859375,6.822415087890625Q19.326796630859373,6.822415087890625,19.596996630859376,6.482245087890625Q19.868796630859375,6.140455087890626,19.868796630859375,5.671705087890626Q19.868796630859375,5.238755087890625,19.618196630859376,4.937655087890625Q19.367496630859375,4.634915087890625,19.006196630859375,4.634915087890625Q18.750696630859377,4.634915087890625,18.529296630859378,4.8318550878906255ZM18.337296630859377,5.674955087890625L18.278696630859375,5.596835087890625Q18.449596630859375,5.272935087890625,18.622096630859374,5.1101750878906245Q18.794596630859374,4.947415087890625,18.967096630859373,4.947415087890625Q19.194996630859375,4.947415087890625,19.346396630859374,5.1345950878906255Q19.497696630859377,5.320135087890625,19.497696630859377,5.598455087890625Q19.497696630859377,5.8914250878906245,19.360996630859376,6.096505087890625Q19.224296630859374,6.301585087890626,19.027396630859375,6.301585087890626Q18.915096630859374,6.301585087890626,18.742496630859375,6.146965087890624Q18.569996630859375,5.992335087890625,18.337296630859377,5.674955087890625ZM17.785496630859377,5.779125087890625L17.842496630859372,5.857245087890625Q17.668296630859373,6.186025087890625,17.495796630859374,6.348785087890625Q17.324896630859374,6.509915087890625,17.153996630859375,6.509915087890625Q16.926096630859377,6.509915087890625,16.774796630859377,6.324375087890624Q16.623396630859375,6.137195087890625,16.623396630859375,5.858875087890625Q16.623396630859375,5.565905087890625,16.761696630859376,5.360825087890625Q16.900096630859373,5.1557550878906255,17.095396630859376,5.1557550878906255Q17.228896630859374,5.1557550878906255,17.365596630859375,5.2778250878906245Q17.502296630859377,5.399895087890625,17.785496630859377,5.779125087890625ZM10.710296630859375,10.634915087890626C10.710296630859375,11.024655087890626,10.561656630859375,11.379685087890625,10.317976630859375,11.646395087890625L12.879196630859376,15.171615087890626C12.985696630859374,15.147615087890625,13.096496630859376,15.134915087890626,13.210296630859375,15.134915087890626C13.306796630859376,15.134915087890626,13.401096630859374,15.144015087890624,13.492596630859374,15.161415087890624L16.819096630859377,11.196955087890625C16.748996630859374,11.023375087890624,16.710296630859375,10.833655087890625,16.710296630859375,10.634915087890626C16.710296630859375,9.806495087890625,17.381896630859373,9.134915087890626,18.210296630859375,9.134915087890626C19.038696630859373,9.134915087890626,19.710296630859375,9.806495087890625,19.710296630859375,10.634915087890626C19.710296630859375,11.463345087890625,19.038696630859373,12.134915087890626,18.210296630859375,12.134915087890626C17.949796630859375,12.134915087890626,17.704796630859377,12.068505087890625,17.491296630859374,11.951675087890624L14.364996630859375,15.677415087890624C14.580596630859375,15.937215087890625,14.710296630859375,16.270915087890625,14.710296630859375,16.634915087890626C14.710296630859375,17.463315087890624,14.038696630859375,18.134915087890626,13.210296630859375,18.134915087890626C12.381866630859374,18.134915087890626,11.710296630859375,17.463315087890624,11.710296630859375,16.634915087890626C11.710296630859375,16.284415087890626,11.830486630859374,15.962015087890626,12.031896630859375,15.706715087890625L9.425686630859374,12.119565087890624C9.355346630859376,12.129685087890625,9.283436630859375,12.134915087890626,9.210296630859375,12.134915087890626C8.872396630859374,12.134915087890626,8.560596630859376,12.023195087890626,8.309816630859375,11.834665087890626L5.215876630859375,15.521915087890624C5.519506630859375,15.796415087890624,5.710296630859375,16.193415087890624,5.710296630859375,16.634915087890626C5.710296630859375,17.463315087890624,5.038726630859375,18.134915087890626,4.210296630859375,18.134915087890626C3.381869630859375,18.134915087890626,2.710296630859375,17.463315087890624,2.710296630859375,16.634915087890626C2.710296630859375,15.806515087890626,3.381869630859375,15.134915087890626,4.210296630859375,15.134915087890626C4.218546630859375,15.134915087890626,4.226776630859375,15.135015087890626,4.234996630859375,15.135115087890625L7.744116630859375,10.953115087890625C7.721966630859375,10.850565087890626,7.710296630859375,10.744105087890624,7.710296630859375,10.634915087890626C7.710296630859375,9.806495087890625,8.381866630859374,9.134915087890626,9.210296630859375,9.134915087890626C10.038726630859376,9.134915087890626,10.710296630859375,9.806495087890625,10.710296630859375,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Vh = () => Zh.cloneNode(!0), Hh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M21,5.5C21,6.32843,20.3284,7,19.5,7C19.4136,7,19.3289,6.99269,19.2465,6.97866L15.6257,15.5086C15.8587,15.7729,16,16.119999999999997,16,16.5C16,17.328400000000002,15.3284,18,14.5,18C13.8469,18,13.2913,17.5826,13.0854,17L3.91465,17C3.70873,17.5826,3.15311,18,2.5,18C1.671573,18,1,17.328400000000002,1,16.5C1,15.6716,1.671573,15,2.5,15C2.5840199999999998,15,2.66643,15.0069,2.74668,15.0202L6.36934,6.48574C6.13933,6.22213,6,5.87733,6,5.5C6,4.671573,6.67157,4,7.5,4C8.15311,4,8.70873,4.417404,8.91465,5L18.0854,5C18.2913,4.417404,18.8469,4,19.5,4C20.3284,4,21,4.671573,21,5.5ZM18.0854,6L8.91465,6C8.892579999999999,6.06243,8.8665,6.12296,8.83672,6.18128L13.9814,15.0921C14.143,15.0325,14.3177,15,14.5,15C14.584,15,14.6664,15.0069,14.7467,15.0202L18.3693,6.48574C18.2462,6.3446,18.149,6.1802,18.0854,6ZM13.2036,15.745L8.0861,6.8811800000000005C7.90605,6.95768,7.70797,7,7.5,7C7.41359,7,7.32888,6.99269,7.24647,6.97866L3.62571,15.5086C3.7512,15.651,3.8501,15.8174,3.91465,16L13.0854,16C13.1169,15.9108,13.1566,15.8255,13.2036,15.745Z" stroke-opacity="0" stroke="none"></path></svg>'), qh = () => Hh.cloneNode(!0), Yh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.92159,5.93994C6.04014,5.90529,6.152620000000001,5.85639,6.25704,5.79523L9.12729,9.89437C9.045449999999999,10.07959,9,10.28449,9,10.5C9,10.79522,9.08529,11.07053,9.232569999999999,11.30262L4.97573,16.7511L5.92159,5.93994ZM4.92259,5.8848400000000005C4.38078,5.658659999999999,4,5.1238,4,4.5C4,3.671573,4.67157,3,5.5,3C6.2157,3,6.81433,3.50124,6.96399,4.17183L15.1309,4.88634C15.3654,4.36387,15.8902,4,16.5,4C17.328400000000002,4,18,4.67157,18,5.5C18,6.08983,17.659599999999998,6.60015,17.1645,6.84518L18.4264,14.0018C18.4508,14.0006,18.4753,14,18.5,14C19.3284,14,20,14.6716,20,15.5C20,16.328400000000002,19.3284,17,18.5,17C17.932499999999997,17,17.4386,16.6849,17.183799999999998,16.22L5.99686,18.5979C5.946429999999999,19.3807,5.29554,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.869300000000003,3.389292,17.3295,3.94071,17.1077L4.92259,5.8848400000000005ZM5.72452,17.6334C5.69799,17.596,5.6698,17.5599,5.64004,17.525100000000002L10.01843,11.92103C10.16958,11.97223,10.33155,12,10.5,12C10.80059,12,11.08052,11.91158,11.31522,11.75934L17.0606,15.0765C17.0457,15.1271,17.0335,15.1789,17.023899999999998,15.2317L5.72452,17.6334ZM11.92855,10.95875L17.4349,14.1379L16.1699,6.96356C15.9874,6.92257,15.8174,6.8483,15.6667,6.74746L11.99771,10.4165C11.99923,10.44414,12,10.47198,12,10.5C12,10.66,11.97495,10.814160000000001,11.92855,10.95875ZM10.5,9C10.259830000000001,9,10.03285,9.05644,9.83159,9.15679L7.04919,5.1831L15.0493,5.88302C15.054,5.90072,15.059,5.91829,15.0643,5.9357299999999995L11.56066,9.43934C11.28921,9.16789,10.91421,9,10.5,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Gh = () => Yh.cloneNode(!0), Wh = /* @__PURE__ */ $('<svg viewBox="0 0 22 22"><path d="M4.727219638671875,8.007996215820313L9.973849638671876,2.7629472158203123C10.167279638671875,2.5696791158203123,10.480729638671875,2.5696791158203123,10.674169638671875,2.7629472158203123L13.223329638671874,5.311756215820313C13.416929638671874,5.505236215820313,13.416929638671874,5.8189862158203125,13.223329638671874,6.012466215820313L7.977129638671875,11.257906215820313C7.379859638671875,11.855176215820313,7.407609638671875,12.909396215820312,8.033809638671876,13.535596215820313C8.660409638671876,14.162596215820313,9.713849638671874,14.189996215820312,10.311129638671876,13.591896215820313L15.556929638671875,8.346066215820311C15.750429638671875,8.152526215820313,16.064229638671875,8.152526215820313,16.257629638671872,8.346066215820311L18.806529638671876,10.895266215820312C19.000029638671876,11.088746215820313,19.000029638671876,11.402496215820312,18.806529638671876,11.595976215820313L13.560629638671875,16.841796215820313C11.165619638671876,19.237196215820312,7.197149638671875,19.19919621582031,4.783499638671875,16.785496215820313C2.3698426386718747,14.371896215820312,2.331397638671875,10.403416215820313,4.727219638671875,8.007996215820313ZM12.172299638671875,5.662106215820312L10.323809638671875,3.8136162158203124L5.4287196386718755,8.709096215820313C3.422893638671875,10.714536215820312,3.4549956386718748,14.055196215820313,5.484999638671875,16.08479621582031C7.514609638671875,18.114796215820313,10.855289638671875,18.146496215820314,12.860719638671876,16.141096215820312L15.465629638671874,13.535796215820312L14.090929638671875,12.160756215820312L14.791629638671875,11.460436215820312L16.166229638671876,12.834996215820313L17.755829638671877,11.245226215820313L15.907729638671874,9.396736215820312L11.011839638671875,14.292596215820312C10.042809638671875,15.262396215820312,8.418249638671874,15.243796215820312,7.406019638671875,14.306496215820312L7.333099638671875,14.236296215820312C6.327599638671876,13.230796215820313,6.284009638671876,11.550396215820312,7.276419638671875,10.557586215820312L9.882199638671874,7.952026215820313L8.501079638671875,6.570906215820313L9.201789638671876,5.870186215820313L10.582939638671874,7.251336215820312L12.172299638671875,5.662106215820312Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Xh = (e) => (() => {
  const n = Wh.cloneNode(!0);
  return Se(n, "class", `icon-overlay ${e ?? ""}`), n;
})(), Jh = /* @__PURE__ */ $('<svg viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_615"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_615)"><path d="M19.672,3.0673368C19.4417,2.9354008,19.1463,3.00292252,18.9994,3.2210900000000002L17.4588,5.50622L16.743299999999998,3.781253L13.9915,7.4662L13.9618,7.51108C13.8339,7.72862,13.8936,8.005659999999999,14.1004,8.15391L14.1462,8.183430000000001C14.3683,8.308720000000001,14.6511,8.25001,14.8022,8.047229999999999L16.4907,5.78571L17.246299999999998,7.60713L19.8374,3.7635389999999997L19.8651,3.717088C19.9871,3.484615,19.9023,3.199273,19.672,3.0673368ZM4.79974,8.462530000000001L10.117740000000001,3.252975C10.31381,3.0610145,10.63152,3.0610145,10.82759,3.252975L13.4115,5.78453C13.6076,5.976710000000001,13.6076,6.28833,13.4115,6.4805L8.093869999999999,11.69045C7.48847,12.28368,7.51659,13.3308,8.151309999999999,13.9528C8.786439999999999,14.5755,9.85421,14.6027,10.45961,14.0087L15.7768,8.79831C15.9729,8.60609,16.2909,8.60609,16.487099999999998,8.79831L19.0705,11.33026C19.2667,11.52244,19.2667,11.83406,19.0705,12.02623L13.7533,17.2366C11.32572,19.6158,7.30328,19.578,4.85679,17.1807C2.410298,14.7834,2.371331,10.84174,4.79974,8.462530000000001ZM12.3461,6.1325199999999995L10.47246,4.29654L5.51079,9.15889C3.477674,11.15076,3.510214,14.4688,5.56784,16.4847C7.62506,18.500999999999998,11.01117,18.5325,13.0439,16.540599999999998L15.6842,13.9529L14.2908,12.58718L15.0011,11.89161L16.394399999999997,13.2569L18.0056,11.67786L16.1323,9.84188L11.16985,14.7046C10.18764,15.6679,8.540980000000001,15.6494,7.51498,14.7184L7.44107,14.6487C6.4219,13.65,6.37771,11.98096,7.38362,10.994869999999999L10.02485,8.40693L8.624939999999999,7.03516L9.335180000000001,6.33919L10.73512,7.71099L12.3461,6.1325199999999995Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), ef = (e) => (() => {
  const n = Jh.cloneNode(!0);
  return Se(n, "class", `icon-overlay ${e ?? ""}`), n;
})(), tf = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,17C5.80945,17,3.667717,12.85,3.113386,11.575C2.9622047,11.2,2.9622047,10.8,3.113386,10.425C3.667717,9.15,5.80945,5,11,5C16.165399999999998,5,18.3323,9.15,18.8866,10.425C19.0378,10.8,19.0378,11.2,18.8866,11.575C18.3323,12.85,16.165399999999998,17,11,17ZM4.04567,10.8C3.995276,10.925,3.995276,11.05,4.04567,11.175C4.52441,12.325,6.43937,16,11,16C15.5606,16,17.4756,12.325,17.9543,11.2C18.0047,11.075,18.0047,10.95,17.9543,10.825C17.4756,9.675,15.5606,6,11,6C6.43937,6,4.52441,9.675,4.04567,10.8ZM11,13.5C9.61417,13.5,8.480319999999999,12.375,8.480319999999999,11C8.480319999999999,9.625,9.61417,8.5,11,8.5C12.38583,8.5,13.5197,9.625,13.5197,11C13.5197,12.375,12.38583,13.5,11,13.5ZM11,9.5C10.1685,9.5,9.48819,10.175,9.48819,11C9.48819,11.825,10.1685,12.5,11,12.5C11.8315,12.5,12.51181,11.825,12.51181,11C12.51181,10.175,11.8315,9.5,11,9.5Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), nf = () => tf.cloneNode(!0), rf = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.80417,14.9887L4.62563,16.167299999999997C4.43037,16.3625,4.43037,16.6791,4.62563,16.8744C4.82089,17.0696,5.13748,17.0696,5.332739999999999,16.8744L6.62638,15.5807C7.75595,16.290100000000002,9.19328,16.7929,11,16.7929C16.165399999999998,16.7929,18.3323,12.64289,18.8866,11.36789C19.0378,10.99289,19.0378,10.59289,18.8866,10.21789C18.5549,9.45486,17.6456,7.66212,15.8617,6.34545L17.3536,4.853553C17.5488,4.658291,17.5488,4.341709,17.3536,4.146447C17.1583,3.9511845,16.8417,3.9511845,16.6464,4.146447L15.0014,5.7915399999999995C13.9314,5.1969,12.61166,4.792893,11,4.792893C5.80945,4.792893,3.667717,8.94289,3.113386,10.21789C2.9622049,10.59289,2.9622049,10.99289,3.113386,11.36789C3.424435,12.08333,4.2353000000000005,13.70399,5.80417,14.9887ZM7.36012,14.847C8.32327,15.4074,9.52286,15.7929,11,15.7929C15.5606,15.7929,17.4756,12.11789,17.9543,10.99289C18.0047,10.86789,18.0047,10.74289,17.9543,10.61789C17.659,9.90846,16.8171,8.23812,15.1447,7.06241L12.96929,9.23782C13.3134,9.66543,13.5197,10.20642,13.5197,10.79289C13.5197,12.16789,12.38583,13.29289,11,13.29289C10.41596,13.29289,9.87667,13.09308,9.44815,12.75896L7.36012,14.847ZM8.794609999999999,11.99829L6.520099999999999,14.2728C5.06905,13.12119,4.32057,11.628250000000001,4.04567,10.96789C3.995275,10.84289,3.995275,10.71789,4.04567,10.59289C4.52441,9.46789,6.43937,5.79289,11,5.79289C12.28868,5.79289,13.3661,6.086320000000001,14.2596,6.53329L12.19759,8.5953C11.84086,8.40257,11.43271,8.29289,11,8.29289C9.61417,8.29289,8.480319999999999,9.41789,8.480319999999999,10.79289C8.480319999999999,11.22918,8.594470000000001,11.64029,8.794609999999999,11.99829ZM10.16528,12.04183C10.404869999999999,12.20032,10.692070000000001,12.29289,11,12.29289C11.8315,12.29289,12.51181,11.61789,12.51181,10.79289C12.51181,10.48318,12.41593,10.194600000000001,12.25216,9.95494L10.16528,12.04183ZM11.43602,9.35687L9.55616,11.236740000000001C9.512,11.09633,9.48819,10.94724,9.48819,10.79289C9.48819,9.96789,10.1685,9.29289,11,9.29289C11.15142,9.29289,11.29782,9.31528,11.43602,9.35687Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), of = () => rf.cloneNode(!0), af = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_625"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_625)"><path d="M14.5385,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807692,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.88462,4,14.5385,5.61538,14.5385,7.576919999999999L14.5385,9.76923ZM10.88461,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923L13.38462,9.76923L13.38462,7.576919999999999C13.38462,6.23077,12.26923,5.15385,10.88461,5.15385ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.038450000000001,12.07692,11.307680000000001,12.34615,11.307680000000001,12.65385L11.307680000000001,14.5769C11.307680000000001,14.8846,11.038450000000001,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), sf = () => af.cloneNode(!0), lf = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_620"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_620)"><path d="M8.38461,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807693,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.46154,4,13.84615,4.961539,14.3462,6.423080000000001C14.4615,6.73077,14.3077,7.038460000000001,14,7.15385C13.69231,7.26923,13.38461,7.11538,13.26923,6.80769C12.92308,5.80769,11.96154,5.15385,10.88462,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.03846,12.07692,11.307690000000001,12.34615,11.307690000000001,12.65385L11.307690000000001,14.5769C11.307690000000001,14.8846,11.03846,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), cf = () => lf.cloneNode(!0), uf = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M16.966900000000003,8.67144C16.6669,8.67144,16.4247,8.91558,16.4247,9.21802L16.4247,16.631500000000003C16.4247,17.322,16.007199999999997,17.9068,15.5139,17.9068L13.93072,17.9068L13.93072,9.2162C13.93072,8.91741,13.68675,8.67144,13.38855,8.67144C13.09036,8.67144,12.84639,8.91741,12.84639,9.21802L12.84639,17.9068L10.151810000000001,17.9068L10.151810000000001,9.21802C10.151810000000001,8.91741,9.90783,8.67144,9.609639999999999,8.67144C9.31145,8.67144,9.06747,8.91741,9.06747,9.219850000000001L9.06747,17.9068L7.48614,17.9068C6.99277,17.9068,6.5753,17.322,6.5753,16.631500000000003L6.5753,9.21802C6.5753,8.91558,6.333130000000001,8.67144,6.03313,8.67144C5.73313,8.67144,5.49096,8.91558,5.49096,9.21802L5.49096,16.631500000000003C5.49096,17.9378,6.385540000000001,19,7.48614,19L15.512,19C16.6127,19,17.509,17.9378,17.509,16.631500000000003L17.509,9.21802C17.509,8.91558,17.2669,8.67144,16.966900000000003,8.67144ZM18.4578,6.21183L4.542169,6.21183C4.243976,6.21183,4,6.45779,4,6.75841C4,7.05903,4.243976,7.30499,4.542169,7.30499L18.4578,7.30499C18.756,7.30499,19,7.05903,19,6.75841C19,6.45779,18.756,6.21183,18.4578,6.21183ZM8.68072,5.10045L14.3193,5.10045C14.6175,5.10045,14.8614,4.852666,14.8614,4.550225C14.8614,4.247783,14.6175,4,14.3193,4L8.68072,4C8.38253,4,8.13855,4.247783,8.13855,4.550225C8.13855,4.852666,8.38253,5.10045,8.68072,5.10045Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), df = () => uf.cloneNode(!0), hf = {
  horizontalStraightLine: Vd,
  horizontalRayLine: qd,
  horizontalSegment: Gd,
  verticalStraightLine: Xd,
  verticalRayLine: eh,
  verticalSegment: nh,
  straightLine: oh,
  rayLine: ah,
  segment: lh,
  arrow: uh,
  priceLine: hh,
  priceChannelLine: yh,
  parallelStraightLine: mh,
  fibonacciLine: vh,
  fibonacciSegment: $h,
  fibonacciCircle: _h,
  fibonacciSpiral: xh,
  fibonacciSpeedResistanceFan: wh,
  fibonacciExtension: Mh,
  gannBox: Sh,
  circle: Oh,
  triangle: Nh,
  rect: Eh,
  parallelogram: Fh,
  threeWaves: zh,
  fiveWaves: jh,
  eightWaves: Rh,
  anyWaves: Vh,
  abcd: qh,
  xabcd: Gh,
  weak_magnet: Xh,
  strong_magnet: ef,
  lock: sf,
  unlock: cf,
  visible: nf,
  invisible: of,
  remove: df
};
function ff(e) {
  return [
    { key: "horizontalStraightLine", text: c("horizontal_straight_line", e) },
    { key: "horizontalRayLine", text: c("horizontal_ray_line", e) },
    { key: "horizontalSegment", text: c("horizontal_segment", e) },
    { key: "verticalStraightLine", text: c("vertical_straight_line", e) },
    { key: "verticalRayLine", text: c("vertical_ray_line", e) },
    { key: "verticalSegment", text: c("vertical_segment", e) },
    { key: "straightLine", text: c("straight_line", e) },
    { key: "rayLine", text: c("ray_line", e) },
    { key: "segment", text: c("segment", e) },
    { key: "arrow", text: c("arrow", e) },
    { key: "priceLine", text: c("price_line", e) }
  ];
}
function yf(e) {
  return [
    { key: "priceChannelLine", text: c("price_channel_line", e) },
    { key: "parallelStraightLine", text: c("parallel_straight_line", e) }
  ];
}
function gf(e) {
  return [
    { key: "circle", text: c("circle", e) },
    { key: "rect", text: c("rect", e) },
    { key: "parallelogram", text: c("parallelogram", e) },
    { key: "triangle", text: c("triangle", e) }
  ];
}
function mf(e) {
  return [
    { key: "fibonacciLine", text: c("fibonacci_line", e) },
    { key: "fibonacciSegment", text: c("fibonacci_segment", e) },
    { key: "fibonacciCircle", text: c("fibonacci_circle", e) },
    { key: "fibonacciSpiral", text: c("fibonacci_spiral", e) },
    { key: "fibonacciSpeedResistanceFan", text: c("fibonacci_speed_resistance_fan", e) },
    { key: "fibonacciExtension", text: c("fibonacci_extension", e) },
    { key: "gannBox", text: c("gann_box", e) }
  ];
}
function pf(e) {
  return [
    { key: "xabcd", text: c("xabcd", e) },
    { key: "abcd", text: c("abcd", e) },
    { key: "threeWaves", text: c("three_waves", e) },
    { key: "fiveWaves", text: c("five_waves", e) },
    { key: "eightWaves", text: c("eight_waves", e) },
    { key: "anyWaves", text: c("any_waves", e) }
  ];
}
function vf(e) {
  return [
    { key: "weak_magnet", text: c("weak_magnet", e) },
    { key: "strong_magnet", text: c("strong_magnet", e) }
  ];
}
const Ve = (e) => hf[e.name](e.class), Cf = /* @__PURE__ */ $('<div class="klinecharts-pro-drawing-bar"><span class="split-line"></span><div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div><div class="item"><span style="width:32px;height:32px"></span></div><div class="item"><span style="width:32px;height:32px"></span></div><span class="split-line"></span><div class="item"><span style="width:32px;height:32px"></span></div></div>'), $f = /* @__PURE__ */ $('<div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div>'), br = /* @__PURE__ */ $('<li><span style="padding-left:8px"></span></li>'), _r = "drawing_tools", bf = (e) => {
  const [n, t] = T("horizontalStraightLine"), [r, a] = T("priceChannelLine"), [s, d] = T("circle"), [u, m] = T("fibonacciLine"), [k, g] = T("xabcd"), [w, A] = T("weak_magnet"), [O, F] = T("normal"), [E, D] = T(!1), [K, X] = T(!0), [U, Y] = T(""), Z = R(() => [{
    key: "singleLine",
    icon: n(),
    list: ff(e.locale),
    setter: t
  }, {
    key: "moreLine",
    icon: r(),
    list: yf(e.locale),
    setter: a
  }, {
    key: "polygon",
    icon: s(),
    list: gf(e.locale),
    setter: d
  }, {
    key: "fibonacci",
    icon: u(),
    list: mf(e.locale),
    setter: m
  }, {
    key: "wave",
    icon: k(),
    list: pf(e.locale),
    setter: g
  }]), ce = R(() => vf(e.locale));
  return (() => {
    const j = Cf.cloneNode(!0), V = j.firstChild, H = V.nextSibling, ne = H.firstChild, oe = ne.nextSibling, Ce = oe.firstChild, Pe = H.nextSibling, $e = Pe.firstChild, Re = Pe.nextSibling, be = Re.firstChild, me = Re.nextSibling, ie = me.nextSibling, pe = ie.firstChild;
    return p(j, () => Z().map((q) => (() => {
      const N = $f.cloneNode(!0), B = N.firstChild, we = B.nextSibling, ze = we.firstChild;
      return N.addEventListener("blur", () => {
        Y("");
      }), B.$$click = () => {
        e.onDrawingItemClick({
          groupId: _r,
          name: q.icon,
          visible: K(),
          lock: E(),
          mode: O()
        });
      }, p(B, L(Ve, {
        get name() {
          return q.icon;
        }
      })), we.$$click = () => {
        q.key === U() ? Y("") : Y(q.key);
      }, p(N, (() => {
        const se = R(() => q.key === U());
        return () => se() && L(Yt, {
          class: "list",
          get children() {
            return q.list.map((Oe) => (() => {
              const _ = br.cloneNode(!0), ue = _.firstChild;
              return _.$$click = () => {
                q.setter(Oe.key), e.onDrawingItemClick({
                  name: Oe.key,
                  lock: E(),
                  mode: O()
                }), Y("");
              }, p(_, L(Ve, {
                get name() {
                  return Oe.key;
                }
              }), ue), p(ue, () => Oe.text), _;
            })());
          }
        });
      })(), null), I(() => Se(ze, "class", q.key === U() ? "rotate" : "")), N;
    })()), V), H.addEventListener("blur", () => {
      Y("");
    }), ne.$$click = () => {
      let q = w();
      O() !== "normal" && (q = "normal"), F(q), e.onModeChange(q);
    }, p(ne, (() => {
      const q = R(() => w() === "weak_magnet");
      return () => q() ? (() => {
        const N = R(() => O() === "weak_magnet");
        return () => N() ? L(Ve, {
          name: "weak_magnet",
          class: "selected"
        }) : L(Ve, {
          name: "weak_magnet"
        });
      })() : (() => {
        const N = R(() => O() === "strong_magnet");
        return () => N() ? L(Ve, {
          name: "strong_magnet",
          class: "selected"
        }) : L(Ve, {
          name: "strong_magnet"
        });
      })();
    })()), oe.$$click = () => {
      U() === "mode" ? Y("") : Y("mode");
    }, p(H, (() => {
      const q = R(() => U() === "mode");
      return () => q() && L(Yt, {
        class: "list",
        get children() {
          return ce().map((N) => (() => {
            const B = br.cloneNode(!0), we = B.firstChild;
            return B.$$click = () => {
              A(N.key), F(N.key), e.onModeChange(N.key), Y("");
            }, p(B, L(Ve, {
              get name() {
                return N.key;
              }
            }), we), p(we, () => N.text), B;
          })());
        }
      });
    })(), null), $e.$$click = () => {
      const q = !E();
      D(q), e.onLockChange(q);
    }, p($e, (() => {
      const q = R(() => !!E());
      return () => q() ? L(Ve, {
        name: "lock"
      }) : L(Ve, {
        name: "unlock"
      });
    })()), be.$$click = () => {
      const q = !K();
      X(q), e.onVisibleChange(q);
    }, p(be, (() => {
      const q = R(() => !!K());
      return () => q() ? L(Ve, {
        name: "visible"
      }) : L(Ve, {
        name: "invisible"
      });
    })()), pe.$$click = () => {
      e.onRemoveClick(_r);
    }, p(pe, L(Ve, {
      name: "remove"
    })), I(() => Se(Ce, "class", U() === "mode" ? "rotate" : "")), j;
  })();
};
Qe(["click"]);
const kr = /* @__PURE__ */ $('<li class="title"></li>'), xr = /* @__PURE__ */ $('<li class="row"></li>'), _f = (e) => L(C1, {
  get title() {
    return c("indicator", e.locale);
  },
  width: 400,
  get onClose() {
    return e.onClose;
  },
  get children() {
    return L(Yt, {
      class: "klinecharts-pro-indicator-modal-list",
      get children() {
        return [(() => {
          const n = kr.cloneNode(!0);
          return p(n, () => c("main_indicator", e.locale)), n;
        })(), R(() => ["MA", "EMA", "SMA", "BOLL", "SAR", "BBI"].map((n) => {
          const t = e.mainIndicators.includes(n);
          return (() => {
            const r = xr.cloneNode(!0);
            return r.$$click = (a) => {
              e.onMainIndicatorChange({
                name: n,
                paneId: "candle_pane",
                added: !t
              });
            }, p(r, L(Cr, {
              checked: t,
              get label() {
                return c(n.toLowerCase(), e.locale);
              }
            })), r;
          })();
        })), (() => {
          const n = kr.cloneNode(!0);
          return p(n, () => c("sub_indicator", e.locale)), n;
        })(), R(() => ["MA", "EMA", "VOL", "MACD", "BOLL", "KDJ", "RSI", "BIAS", "BRAR", "CCI", "DMI", "CR", "PSY", "DMA", "TRIX", "OBV", "VR", "WR", "MTM", "EMV", "SAR", "SMA", "ROC", "PVT", "BBI", "AO"].map((n) => {
          const t = n in e.subIndicators;
          return (() => {
            const r = xr.cloneNode(!0);
            return r.$$click = (a) => {
              e.onSubIndicatorChange({
                name: n,
                paneId: e.subIndicators[n] ?? "",
                added: !t
              });
            }, p(r, L(Cr, {
              checked: t,
              get label() {
                return c(n.toLowerCase(), e.locale);
              }
            })), r;
          })();
        }))];
      }
    });
  }
});
Qe(["click"]);
function Lr(e, n) {
  switch (e) {
    case "Etc/UTC":
      return c("utc", n);
    case "Pacific/Midway":
      return c("midway", n);
    case "Pacific/Honolulu":
      return c("honolulu", n);
    case "America/Anchorage":
      return c("anchorage", n);
    case "America/Juneau":
      return c("juneau", n);
    case "America/Los_Angeles":
      return c("los_angeles", n);
    case "America/Vancouver":
      return c("vancouver", n);
    case "America/Tijuana":
      return c("tijuana", n);
    case "America/Phoenix":
      return c("phoenix", n);
    case "America/Denver":
      return c("denver", n);
    case "America/Chicago":
      return c("chicago", n);
    case "America/Mexico_City":
      return c("mexico_city", n);
    case "America/Guatemala":
      return c("guatemala", n);
    case "America/New_York":
      return c("new_york", n);
    case "America/Toronto":
      return c("toronto", n);
    case "America/Bogota":
      return c("bogota", n);
    case "America/Lima":
      return c("lima", n);
    case "America/Caracas":
      return c("caracas", n);
    case "America/Halifax":
      return c("halifax", n);
    case "America/Santiago":
      return c("santiago", n);
    case "America/La_Paz":
      return c("la_paz", n);
    case "America/Sao_Paulo":
      return c("sao_paulo", n);
    case "America/Buenos_Aires":
      return c("buenos_aires", n);
    case "America/Montevideo":
      return c("montevideo", n);
    case "America/Godthab":
      return c("godthab", n);
    case "Atlantic/Azores":
      return c("azores", n);
    case "Atlantic/Cape_Verde":
      return c("cape_verde", n);
    case "Europe/London":
      return c("london", n);
    case "Europe/Dublin":
      return c("dublin", n);
    case "Europe/Lisbon":
      return c("lisbon", n);
    case "Africa/Casablanca":
      return c("casablanca", n);
    case "Europe/Paris":
      return c("paris", n);
    case "Europe/Berlin":
      return c("berlin", n);
    case "Europe/Amsterdam":
      return c("amsterdam", n);
    case "Europe/Brussels":
      return c("brussels", n);
    case "Europe/Madrid":
      return c("madrid", n);
    case "Europe/Rome":
      return c("rome", n);
    case "Europe/Vienna":
      return c("vienna", n);
    case "Europe/Warsaw":
      return c("warsaw", n);
    case "Africa/Lagos":
      return c("lagos", n);
    case "Europe/Athens":
      return c("athens", n);
    case "Europe/Bucharest":
      return c("bucharest", n);
    case "Europe/Helsinki":
      return c("helsinki", n);
    case "Europe/Istanbul":
      return c("istanbul", n);
    case "Europe/Kiev":
      return c("kiev", n);
    case "Africa/Cairo":
      return c("cairo", n);
    case "Africa/Johannesburg":
      return c("johannesburg", n);
    case "Asia/Jerusalem":
      return c("jerusalem", n);
    case "Europe/Moscow":
      return c("moscow", n);
    case "Asia/Baghdad":
      return c("baghdad", n);
    case "Asia/Kuwait":
      return c("kuwait", n);
    case "Asia/Riyadh":
      return c("riyadh", n);
    case "Asia/Bahrain":
      return c("bahrain", n);
    case "Africa/Nairobi":
      return c("nairobi", n);
    case "Asia/Tehran":
      return c("tehran", n);
    case "Asia/Dubai":
      return c("dubai", n);
    case "Asia/Muscat":
      return c("muscat", n);
    case "Asia/Baku":
      return c("baku", n);
    case "Asia/Kabul":
      return c("kabul", n);
    case "Asia/Karachi":
      return c("karachi", n);
    case "Asia/Tashkent":
      return c("tashkent", n);
    case "Asia/Ashkhabad":
      return c("ashkhabad", n);
    case "Asia/Kolkata":
      return c("kolkata", n);
    case "Asia/Mumbai":
      return c("mumbai", n);
    case "Asia/Colombo":
      return c("colombo", n);
    case "Asia/Kathmandu":
      return c("kathmandu", n);
    case "Asia/Dhaka":
      return c("dhaka", n);
    case "Asia/Almaty":
      return c("almaty", n);
    case "Asia/Yangon":
      return c("yangon", n);
    case "Asia/Bangkok":
      return c("bangkok", n);
    case "Asia/Jakarta":
      return c("jakarta", n);
    case "Asia/Ho_Chi_Minh":
      return c("ho_chi_minh", n);
    case "Asia/Shanghai":
      return c("shanghai", n);
    case "Asia/Hong_Kong":
      return c("hong_kong", n);
    case "Asia/Singapore":
      return c("singapore", n);
    case "Asia/Taipei":
      return c("taipei", n);
    case "Asia/Manila":
      return c("manila", n);
    case "Asia/Kuala_Lumpur":
      return c("kuala_lumpur", n);
    case "Australia/Perth":
      return c("perth", n);
    case "Asia/Tokyo":
      return c("tokyo", n);
    case "Asia/Seoul":
      return c("seoul", n);
    case "Asia/Pyongyang":
      return c("pyongyang", n);
    case "Australia/Adelaide":
      return c("adelaide", n);
    case "Australia/Darwin":
      return c("darwin", n);
    case "Australia/Brisbane":
      return c("brisbane", n);
    case "Australia/Sydney":
      return c("sydney", n);
    case "Australia/Melbourne":
      return c("melbourne", n);
    case "Pacific/Guam":
      return c("guam", n);
    case "Pacific/Port_Moresby":
      return c("port_moresby", n);
    case "Pacific/Norfolk":
      return c("norfolk", n);
    case "Pacific/Guadalcanal":
      return c("guadalcanal", n);
    case "Pacific/Auckland":
      return c("auckland", n);
    case "Pacific/Fiji":
      return c("fiji", n);
    case "Pacific/Tongatapu":
      return c("tongatapu", n);
    case "Pacific/Apia":
      return c("apia", n);
    case "Asia/Karachi":
      return c("karachi", n);
  }
  return e;
}
function kf(e) {
  return [
    // UTC
    { key: "Etc/UTC", text: `(UTC+0:00) ${c("utc", e)}` },
    // Pacific (UTC-12 to UTC-8)
    { key: "Pacific/Midway", text: `(UTC-11:00) ${c("midway", e)}` },
    { key: "Pacific/Honolulu", text: `(UTC-10:00) ${c("honolulu", e)}` },
    { key: "America/Anchorage", text: `(UTC-9:00) ${c("anchorage", e)}` },
    { key: "America/Juneau", text: `(UTC-9:00) ${c("juneau", e)}` },
    // North America West (UTC-8 to UTC-7)
    { key: "America/Los_Angeles", text: `(UTC-8:00) ${c("los_angeles", e)}` },
    { key: "America/Vancouver", text: `(UTC-8:00) ${c("vancouver", e)}` },
    { key: "America/Tijuana", text: `(UTC-8:00) ${c("tijuana", e)}` },
    { key: "America/Phoenix", text: `(UTC-7:00) ${c("phoenix", e)}` },
    { key: "America/Denver", text: `(UTC-7:00) ${c("denver", e)}` },
    // North America Central (UTC-6)
    { key: "America/Chicago", text: `(UTC-6:00) ${c("chicago", e)}` },
    { key: "America/Mexico_City", text: `(UTC-6:00) ${c("mexico_city", e)}` },
    { key: "America/Guatemala", text: `(UTC-6:00) ${c("guatemala", e)}` },
    // North America East (UTC-5 to UTC-4)
    { key: "America/New_York", text: `(UTC-5:00) ${c("new_york", e)}` },
    { key: "America/Toronto", text: `(UTC-5:00) ${c("toronto", e)}` },
    { key: "America/Bogota", text: `(UTC-5:00) ${c("bogota", e)}` },
    { key: "America/Lima", text: `(UTC-5:00) ${c("lima", e)}` },
    { key: "America/Caracas", text: `(UTC-4:00) ${c("caracas", e)}` },
    { key: "America/Halifax", text: `(UTC-4:00) ${c("halifax", e)}` },
    // South America (UTC-4 to UTC-3)
    { key: "America/Santiago", text: `(UTC-4:00) ${c("santiago", e)}` },
    { key: "America/La_Paz", text: `(UTC-4:00) ${c("la_paz", e)}` },
    { key: "America/Sao_Paulo", text: `(UTC-3:00) ${c("sao_paulo", e)}` },
    { key: "America/Buenos_Aires", text: `(UTC-3:00) ${c("buenos_aires", e)}` },
    { key: "America/Montevideo", text: `(UTC-3:00) ${c("montevideo", e)}` },
    // Atlantic (UTC-3 to UTC-1)
    { key: "America/Godthab", text: `(UTC-3:00) ${c("godthab", e)}` },
    { key: "Atlantic/Azores", text: `(UTC-1:00) ${c("azores", e)}` },
    { key: "Atlantic/Cape_Verde", text: `(UTC-1:00) ${c("cape_verde", e)}` },
    // Western Europe (UTC+0 to UTC+1)
    { key: "Europe/London", text: `(UTC+0:00) ${c("london", e)}` },
    { key: "Europe/Dublin", text: `(UTC+0:00) ${c("dublin", e)}` },
    { key: "Europe/Lisbon", text: `(UTC+0:00) ${c("lisbon", e)}` },
    { key: "Africa/Casablanca", text: `(UTC+0:00) ${c("casablanca", e)}` },
    { key: "Europe/Paris", text: `(UTC+1:00) ${c("paris", e)}` },
    { key: "Europe/Berlin", text: `(UTC+1:00) ${c("berlin", e)}` },
    { key: "Europe/Amsterdam", text: `(UTC+1:00) ${c("amsterdam", e)}` },
    { key: "Europe/Brussels", text: `(UTC+1:00) ${c("brussels", e)}` },
    { key: "Europe/Madrid", text: `(UTC+1:00) ${c("madrid", e)}` },
    { key: "Europe/Rome", text: `(UTC+1:00) ${c("rome", e)}` },
    { key: "Europe/Vienna", text: `(UTC+1:00) ${c("vienna", e)}` },
    { key: "Europe/Warsaw", text: `(UTC+1:00) ${c("warsaw", e)}` },
    { key: "Africa/Lagos", text: `(UTC+1:00) ${c("lagos", e)}` },
    // Central Europe (UTC+2)
    { key: "Europe/Athens", text: `(UTC+2:00) ${c("athens", e)}` },
    { key: "Europe/Bucharest", text: `(UTC+2:00) ${c("bucharest", e)}` },
    { key: "Europe/Helsinki", text: `(UTC+2:00) ${c("helsinki", e)}` },
    { key: "Europe/Istanbul", text: `(UTC+2:00) ${c("istanbul", e)}` },
    { key: "Europe/Kiev", text: `(UTC+2:00) ${c("kiev", e)}` },
    { key: "Africa/Cairo", text: `(UTC+2:00) ${c("cairo", e)}` },
    { key: "Africa/Johannesburg", text: `(UTC+2:00) ${c("johannesburg", e)}` },
    { key: "Asia/Jerusalem", text: `(UTC+2:00) ${c("jerusalem", e)}` },
    // Eastern Europe / Middle East (UTC+3)
    { key: "Europe/Moscow", text: `(UTC+3:00) ${c("moscow", e)}` },
    { key: "Asia/Baghdad", text: `(UTC+3:00) ${c("baghdad", e)}` },
    { key: "Asia/Kuwait", text: `(UTC+3:00) ${c("kuwait", e)}` },
    { key: "Asia/Riyadh", text: `(UTC+3:00) ${c("riyadh", e)}` },
    { key: "Asia/Bahrain", text: `(UTC+3:00) ${c("bahrain", e)}` },
    { key: "Africa/Nairobi", text: `(UTC+3:00) ${c("nairobi", e)}` },
    // Middle East (UTC+3:30 to UTC+4)
    { key: "Asia/Tehran", text: `(UTC+3:30) ${c("tehran", e)}` },
    { key: "Asia/Dubai", text: `(UTC+4:00) ${c("dubai", e)}` },
    { key: "Asia/Muscat", text: `(UTC+4:00) ${c("muscat", e)}` },
    { key: "Asia/Baku", text: `(UTC+4:00) ${c("baku", e)}` },
    // Central Asia (UTC+4:30 to UTC+5)
    { key: "Asia/Kabul", text: `(UTC+4:30) ${c("kabul", e)}` },
    { key: "Asia/Karachi", text: `(UTC+5:00) ${c("karachi", e)}` },
    { key: "Asia/Tashkent", text: `(UTC+5:00) ${c("tashkent", e)}` },
    { key: "Asia/Ashkhabad", text: `(UTC+5:00) ${c("ashkhabad", e)}` },
    // South Asia (UTC+5:30 to UTC+6)
    { key: "Asia/Kolkata", text: `(UTC+5:30) ${c("kolkata", e)}` },
    { key: "Asia/Mumbai", text: `(UTC+5:30) ${c("mumbai", e)}` },
    { key: "Asia/Colombo", text: `(UTC+5:30) ${c("colombo", e)}` },
    { key: "Asia/Kathmandu", text: `(UTC+5:45) ${c("kathmandu", e)}` },
    { key: "Asia/Dhaka", text: `(UTC+6:00) ${c("dhaka", e)}` },
    { key: "Asia/Almaty", text: `(UTC+6:00) ${c("almaty", e)}` },
    // Southeast Asia (UTC+6:30 to UTC+7)
    { key: "Asia/Yangon", text: `(UTC+6:30) ${c("yangon", e)}` },
    { key: "Asia/Bangkok", text: `(UTC+7:00) ${c("bangkok", e)}` },
    { key: "Asia/Jakarta", text: `(UTC+7:00) ${c("jakarta", e)}` },
    { key: "Asia/Ho_Chi_Minh", text: `(UTC+7:00) ${c("ho_chi_minh", e)}` },
    // East Asia (UTC+8)
    { key: "Asia/Shanghai", text: `(UTC+8:00) ${c("shanghai", e)}` },
    { key: "Asia/Hong_Kong", text: `(UTC+8:00) ${c("hong_kong", e)}` },
    { key: "Asia/Singapore", text: `(UTC+8:00) ${c("singapore", e)}` },
    { key: "Asia/Taipei", text: `(UTC+8:00) ${c("taipei", e)}` },
    { key: "Asia/Manila", text: `(UTC+8:00) ${c("manila", e)}` },
    { key: "Asia/Kuala_Lumpur", text: `(UTC+8:00) ${c("kuala_lumpur", e)}` },
    { key: "Australia/Perth", text: `(UTC+8:00) ${c("perth", e)}` },
    // East Asia (UTC+9)
    { key: "Asia/Tokyo", text: `(UTC+9:00) ${c("tokyo", e)}` },
    { key: "Asia/Seoul", text: `(UTC+9:00) ${c("seoul", e)}` },
    { key: "Asia/Pyongyang", text: `(UTC+9:00) ${c("pyongyang", e)}` },
    // Australia (UTC+9:30 to UTC+10)
    { key: "Australia/Adelaide", text: `(UTC+9:30) ${c("adelaide", e)}` },
    { key: "Australia/Darwin", text: `(UTC+9:30) ${c("darwin", e)}` },
    { key: "Australia/Brisbane", text: `(UTC+10:00) ${c("brisbane", e)}` },
    { key: "Australia/Sydney", text: `(UTC+10:00) ${c("sydney", e)}` },
    { key: "Australia/Melbourne", text: `(UTC+10:00) ${c("melbourne", e)}` },
    { key: "Pacific/Guam", text: `(UTC+10:00) ${c("guam", e)}` },
    // Pacific (UTC+10 to UTC+13)
    { key: "Pacific/Port_Moresby", text: `(UTC+10:00) ${c("port_moresby", e)}` },
    { key: "Pacific/Norfolk", text: `(UTC+11:00) ${c("norfolk", e)}` },
    { key: "Pacific/Guadalcanal", text: `(UTC+11:00) ${c("guadalcanal", e)}` },
    { key: "Pacific/Auckland", text: `(UTC+12:00) ${c("auckland", e)}` },
    { key: "Pacific/Fiji", text: `(UTC+12:00) ${c("fiji", e)}` },
    { key: "Pacific/Tongatapu", text: `(UTC+13:00) ${c("tongatapu", e)}` },
    { key: "Pacific/Apia", text: `(UTC+13:00) ${c("apia", e)}` }
  ];
}
const xf = (e) => {
  const [n, t] = T(e.timezone), r = R(() => kf(e.locale));
  return L(C1, {
    get title() {
      return c("timezone", e.locale);
    },
    width: 320,
    get buttons() {
      return [{
        children: c("confirm", e.locale),
        onClick: () => {
          e.onConfirm(n()), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      return L(h9, {
        style: {
          width: "100%",
          "margin-top": "20px"
        },
        get value() {
          return n().text;
        },
        onSelected: (a) => {
          t(a);
        },
        get dataSource() {
          return r();
        },
        searchable: !0,
        get searchPlaceholder() {
          return c("Search Timezone", e.locale) || "Search timezone...";
        }
      });
    }
  });
};
function wr(e) {
  return [
    {
      key: "candle.type",
      text: c("candle_type", e),
      component: "select",
      dataSource: [
        { key: "candle_solid", text: c("candle_solid", e) },
        { key: "candle_stroke", text: c("candle_stroke", e) },
        { key: "candle_up_stroke", text: c("candle_up_stroke", e) },
        { key: "candle_down_stroke", text: c("candle_down_stroke", e) },
        { key: "ohlc", text: c("ohlc", e) },
        { key: "area", text: c("area", e) }
      ]
    },
    {
      key: "candle.priceMark.last.show",
      text: c("last_price_show", e),
      component: "switch"
    },
    {
      key: "candle.priceMark.high.show",
      text: c("high_price_show", e),
      component: "switch"
    },
    {
      key: "candle.priceMark.low.show",
      text: c("low_price_show", e),
      component: "switch"
    },
    {
      key: "indicator.lastValueMark.show",
      text: c("indicator_last_value_show", e),
      component: "switch"
    },
    {
      key: "yAxis.type",
      text: c("price_axis_type", e),
      component: "select",
      dataSource: [
        { key: "normal", text: c("normal", e) },
        { key: "percentage", text: c("percentage", e) },
        { key: "log", text: c("log", e) }
      ]
    },
    {
      key: "yAxis.reverse",
      text: c("reverse_coordinate", e),
      component: "switch"
    },
    {
      key: "grid.show",
      text: c("grid_show", e),
      component: "switch"
    }
  ];
}
const Lf = /* @__PURE__ */ $('<div class="klinecharts-pro-setting-modal-content"></div>'), wf = /* @__PURE__ */ $('<div class="setting-item"><span class="setting-label"></span><div class="setting-control"></div></div>'), Af = (e) => {
  const [n, t] = T(e.currentStyles), [r, a] = T(wr(e.locale)), [s, d] = T(!1), u = () => {
    d(window.innerWidth <= 768);
  };
  M0(() => {
    u(), window.addEventListener("resize", u);
  }), N1(() => {
    window.removeEventListener("resize", u);
  }), Ue(() => {
    a(wr(e.locale));
  });
  const m = (k, g) => {
    const w = {};
    $0(w, k.key, g);
    const A = le.clone(n());
    $0(A, k.key, g), t(A), a(r().map((O) => ({
      ...O
    }))), e.onChange(w);
  };
  return L(C1, {
    get title() {
      return c("setting", e.locale);
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
        children: c("restore_default", e.locale),
        onClick: () => {
          e.onRestoreDefault(r()), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      const k = Lf.cloneNode(!0);
      return p(k, L(v0, {
        get each() {
          return r();
        },
        children: (g) => {
          let w;
          const A = le.formatValue(n(), g.key);
          switch (g.component) {
            case "select": {
              const O = g.key === "candle.type" ? "170px" : "120px";
              w = L(h9, {
                get style() {
                  return {
                    width: s() ? "100%" : O,
                    "min-width": s() ? "auto" : O
                  };
                },
                get value() {
                  return c(A, e.locale);
                },
                get dataSource() {
                  return g.dataSource;
                },
                onSelected: (F) => {
                  const E = F.key;
                  m(g, E);
                }
              });
              break;
            }
            case "switch": {
              const O = !!A;
              w = L(i4, {
                open: O,
                onChange: () => {
                  m(g, !O);
                }
              });
              break;
            }
          }
          return (() => {
            const O = wf.cloneNode(!0), F = O.firstChild, E = F.nextSibling;
            return p(F, () => g.text), p(E, w), I(() => O.classList.toggle("mobile-item", !!s())), O;
          })();
        }
      })), I(() => k.classList.toggle("mobile-layout", !!s())), k;
    }
  });
}, Mf = /* @__PURE__ */ $('<img style="width:500px;margin-top: 20px">'), Tf = (e) => L(C1, {
  get title() {
    return c("screenshot", e.locale);
  },
  width: 540,
  get buttons() {
    return [{
      type: "confirm",
      children: c("save", e.locale),
      onClick: () => {
        const n = document.createElement("a");
        n.download = "screenshot", n.href = e.url, document.body.appendChild(n), n.click(), n.remove();
      }
    }];
  },
  get onClose() {
    return e.onClose;
  },
  get children() {
    const n = Mf.cloneNode(!0);
    return I(() => Se(n, "src", e.url)), n;
  }
}), Sf = {
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
}, Pf = /* @__PURE__ */ $('<div class="klinecharts-pro-indicator-setting-modal-content"></div>'), Of = /* @__PURE__ */ $("<span></span>"), Df = (e) => {
  const [n, t] = T(le.clone(e.params.calcParams)), r = (a) => Sf[a];
  return L(C1, {
    get title() {
      return e.params.indicatorName;
    },
    width: 360,
    get buttons() {
      return [{
        type: "confirm",
        children: c("confirm", e.locale),
        onClick: () => {
          const a = r(e.params.indicatorName), s = [];
          le.clone(n()).forEach((d, u) => {
            !le.isValid(d) || d === "" ? "default" in a[u] && s.push(a[u].default) : s.push(d);
          }), e.onConfirm(s), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      const a = Pf.cloneNode(!0);
      return p(a, () => r(e.params.indicatorName).map((s, d) => [(() => {
        const u = Of.cloneNode(!0);
        return p(u, () => c(s.paramNameKey, e.locale)), u;
      })(), L(f9, {
        style: {
          width: "200px"
        },
        get value() {
          return n()[d] ?? "";
        },
        get precision() {
          return s.precision;
        },
        get min() {
          return s.min;
        },
        onChange: (u) => {
          const m = le.clone(n());
          m[d] = u, t(m);
        }
      })])), a;
    }
  });
}, Nf = /* @__PURE__ */ $('<svg viewBox="0 0 1024 1024"><path d="M945.066667 898.133333l-189.866667-189.866666c55.466667-64 87.466667-149.333333 87.466667-241.066667 0-204.8-168.533333-373.333333-373.333334-373.333333S96 264.533333 96 469.333333 264.533333 842.666667 469.333333 842.666667c91.733333 0 174.933333-34.133333 241.066667-87.466667l189.866667 189.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c8.533333-12.8 8.533333-34.133333-2.133333-46.933334zM469.333333 778.666667C298.666667 778.666667 160 640 160 469.333333S298.666667 160 469.333333 160 778.666667 298.666667 778.666667 469.333333 640 778.666667 469.333333 778.666667z"></path></svg>'), If = /* @__PURE__ */ $('<img alt="symbol">'), Ef = /* @__PURE__ */ $("<li><div><span></span></div></li>"), Bf = (e) => {
  const [n, t] = T(""), [r] = Y9(n, e.datafeed.searchSymbols.bind(e.datafeed));
  return L(C1, {
    get title() {
      return c("symbol_search", e.locale);
    },
    width: 460,
    get onClose() {
      return e.onClose;
    },
    get children() {
      return [L(f9, {
        class: "klinecharts-pro-symbol-search-modal-input",
        get placeholder() {
          return c("symbol_code", e.locale);
        },
        get suffix() {
          return Nf.cloneNode(!0);
        },
        get value() {
          return n();
        },
        onChange: (a) => {
          const s = `${a}`;
          t(s);
        }
      }), L(Yt, {
        class: "klinecharts-pro-symbol-search-modal-list",
        get loading() {
          return r.loading;
        },
        get dataSource() {
          return r() ?? [];
        },
        renderItem: (a) => (() => {
          const s = Ef.cloneNode(!0), d = s.firstChild, u = d.firstChild;
          return s.$$click = () => {
            e.onSymbolSelected(a), e.onClose();
          }, p(d, L(J, {
            get when() {
              return a.logo;
            },
            get children() {
              const m = If.cloneNode(!0);
              return I(() => Se(m, "src", a.logo)), m;
            }
          }), u), p(u, () => a.shortName ?? a.ticker, null), p(u, () => `${a.name ? `(${a.name})` : ""}`, null), p(s, () => a.exchange ?? "", null), I(() => Se(u, "title", a.name ?? "")), s;
        })()
      })];
    }
  });
};
Qe(["click"]);
const Ff = /* @__PURE__ */ $('<div class="klinecharts-pro-mobile-more-modal-content"><div class="item"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div><div class="item"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path></svg><span></span></div><div class="item"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg><span></span></div></div>'), Uf = (e) => L(C1, {
  get title() {
    return c("more", e.locale);
  },
  isMobile: !0,
  get onClose() {
    return e.onClose;
  },
  get children() {
    const n = Ff.cloneNode(!0), t = n.firstChild, r = t.firstChild, a = r.nextSibling, s = t.nextSibling, d = s.firstChild, u = d.nextSibling, m = s.nextSibling, k = m.firstChild, g = k.nextSibling;
    return t.$$click = () => {
      e.onIndicatorClick(), e.onClose();
    }, p(a, () => c("indicator", e.locale)), s.$$click = () => {
      e.onTimezoneClick(), e.onClose();
    }, p(u, () => c("timezone", e.locale)), m.$$click = () => {
      e.onSettingClick(), e.onClose();
    }, p(g, () => c("setting", e.locale)), n;
  }
});
Qe(["click"]);
const zf = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-picker"></div>'), Kf = /* @__PURE__ */ $('<label class="klinecharts-pro-time-tools-field"><span></span><button type="button" class="klinecharts-pro-time-tools-input"><span></span><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M8 3v4M16 3v4M4 10h16"></path></svg></button></label>'), jf = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-calendar"><div class="klinecharts-pro-time-tools-month"><button type="button">&lt;&lt;</button><button type="button">&lt;</button><button type="button" class="calendar-title"></button><button type="button">></button><button type="button">>></button></div></div>'), Qf = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-grid"></div>'), Rf = /* @__PURE__ */ $('<span class="weekday"></span>'), P1 = /* @__PURE__ */ $('<button type="button"></button>'), Zf = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-month-grid"></div>'), Vf = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-month-grid year-grid"></div>'), Hf = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-spinners"><div class="spinner-column scrollable"></div><div class="spinner-column scrollable"></div><div class="spinner-column"></div></div>'), qf = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-content"></div>'), Yf = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-tabs"></div>'), Gf = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-range-panel"><div class="klinecharts-pro-time-tools-range-header"><button type="button"></button><span class="klinecharts-pro-time-tools-range-arrow">-></span><button type="button"></button><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M8 3v4M16 3v4M4 10h16"></path></svg></div></div>'), Wf = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-panel"><div class="klinecharts-pro-time-tools-row"><div><strong>Time Anchor</strong><span>Anchor to a time on the chart when switching between intervals</span></div><button type="button"><span></span></button></div><div class="klinecharts-pro-time-tools-row"><div><strong>Anchor Point</strong></div><select><option value="date">Date</option><option value="current">Current</option></select></div><div class="klinecharts-pro-time-tools-row with-divider"><div><strong>Anchor line</strong><span>Mark the anchored time on the chart with a vertical line</span></div><button type="button"><span></span></button></div><div class="klinecharts-pro-time-tools-row with-divider"><div><strong>Across Tokens</strong><span>Retain onscreen chart range when switching symbols</span></div><button type="button"><span></span></button></div></div>'), Xf = [{
  key: "goToDate",
  label: "Go to Date"
}, {
  key: "timeRange",
  label: "Time Range"
}, {
  key: "timeAnchor",
  label: "Time Anchor"
}], Jf = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], Ar = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Q1 = (e) => String(e).padStart(2, "0"), Mr = (e, n, t) => Math.min(t, new Date(e, n + 1, 0).getDate()), y0 = (e) => {
  const n = new Date(e);
  return {
    year: n.getFullYear(),
    month: n.getMonth(),
    day: n.getDate(),
    hour: n.getHours(),
    minute: n.getMinutes()
  };
}, Bt = (e) => new Date(e.year, e.month, e.day, e.hour, e.minute, 0, 0).getTime(), w0 = (e) => {
  const n = e.hour >= 12 ? "PM" : "AM", t = e.hour % 12 || 12;
  return `${Q1(e.month + 1)}/${Q1(e.day)}/${e.year} ${Q1(t)}:${Q1(e.minute)} ${n}`;
}, ey = (e, n) => {
  const t = new Date(e, n, 1).getDay(), r = new Date(e, n + 1, 0).getDate(), a = new Date(e, n, 0).getDate(), s = [];
  for (let d = t - 1; d >= 0; d -= 1)
    s.push({
      date: new Date(e, n - 1, a - d),
      current: !1
    });
  for (let d = 1; d <= r; d += 1)
    s.push({
      date: new Date(e, n, d),
      current: !0
    });
  for (; s.length < 42; ) {
    const d = s[s.length - 1].date;
    s.push({
      date: new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1),
      current: !1
    });
  }
  return s;
}, Ft = (e) => {
  const [n, t] = T(!0), [r, a] = T("date"), [s, d] = T(e.value.year), [u, m] = T(e.value.month), k = R(() => ey(s(), u())), g = R(() => Math.floor(s() / 10) * 10), w = R(() => Array.from({
    length: 12
  }, (j, V) => g() - 1 + V)), A = R(() => e.value.hour % 12 || 12), O = R(() => e.value.hour >= 12 ? "PM" : "AM"), F = Array.from({
    length: 12
  }, (j, V) => V + 1), E = Array.from({
    length: 60
  }, (j, V) => V), D = (j) => {
    const V = new Date(s(), u() + j, 1);
    d(V.getFullYear()), m(V.getMonth());
  }, K = () => {
    r() === "date" ? a("month") : r() === "month" && a("year");
  }, X = (j) => {
    e.onChange({
      ...e.value,
      year: j.getFullYear(),
      month: j.getMonth(),
      day: j.getDate()
    }), d(j.getFullYear()), m(j.getMonth());
  }, U = (j) => {
    m(j), e.onChange({
      ...e.value,
      year: s(),
      month: j,
      day: Mr(s(), j, e.value.day)
    }), a("date");
  }, Y = (j) => {
    d(j), e.onChange({
      ...e.value,
      year: j,
      day: Mr(j, e.value.month, e.value.day)
    }), a("month");
  }, Z = (j) => {
    const V = O() === "PM";
    e.onChange({
      ...e.value,
      hour: V ? j === 12 ? 12 : j + 12 : j === 12 ? 0 : j
    });
  }, ce = (j) => {
    const V = A();
    e.onChange({
      ...e.value,
      hour: j === "PM" ? V === 12 ? 12 : V + 12 : V === 12 ? 0 : V
    });
  };
  return (() => {
    const j = zf.cloneNode(!0);
    return p(j, (() => {
      const V = R(() => e.showInput !== !1);
      return () => V() && (() => {
        const H = Kf.cloneNode(!0), ne = H.firstChild, oe = ne.nextSibling, Ce = oe.firstChild;
        return p(ne, () => e.label), oe.$$click = () => t(!n()), p(Ce, () => w0(e.value)), H;
      })();
    })(), null), p(j, (() => {
      const V = R(() => !!n());
      return () => V() && (() => {
        const H = jf.cloneNode(!0), ne = H.firstChild, oe = ne.firstChild, Ce = oe.nextSibling, Pe = Ce.nextSibling, $e = Pe.nextSibling, Re = $e.nextSibling;
        return oe.$$click = () => {
          r() === "year" ? d(s() - 10) : r() === "month" ? d(s() - 1) : D(-12);
        }, Ce.$$click = () => {
          r() === "year" ? d(s() - 10) : r() === "month" ? d(s() - 1) : D(-1);
        }, Pe.$$click = K, p(Pe, (() => {
          const be = R(() => r() === "year");
          return () => be() ? `${g()}-${g() + 9}` : (() => {
            const me = R(() => r() === "month");
            return () => me() ? s() : `${Ar[u()]} ${s()}`;
          })();
        })()), $e.$$click = () => {
          r() === "year" ? d(s() + 10) : r() === "month" ? d(s() + 1) : D(1);
        }, Re.$$click = () => {
          r() === "year" ? d(s() + 10) : r() === "month" ? d(s() + 1) : D(12);
        }, p(H, (() => {
          const be = R(() => r() === "date");
          return () => be() && (() => {
            const me = Qf.cloneNode(!0);
            return p(me, () => Jf.map((ie) => (() => {
              const pe = Rf.cloneNode(!0);
              return p(pe, ie), pe;
            })()), null), p(me, () => k().map(({
              date: ie,
              current: pe
            }) => {
              const q = ie.getFullYear() === e.value.year && ie.getMonth() === e.value.month && ie.getDate() === e.value.day;
              return (() => {
                const N = P1.cloneNode(!0);
                return N.$$click = () => X(ie), re(N, `${pe ? "" : "muted"} ${q ? "selected" : ""}`), p(N, () => ie.getDate()), N;
              })();
            }), null), me;
          })();
        })(), null), p(H, (() => {
          const be = R(() => r() === "month");
          return () => be() && (() => {
            const me = Zf.cloneNode(!0);
            return p(me, () => Ar.map((ie, pe) => (() => {
              const q = P1.cloneNode(!0);
              return q.$$click = () => U(pe), p(q, ie), I(() => re(q, pe === e.value.month && s() === e.value.year ? "selected" : "")), q;
            })())), me;
          })();
        })(), null), p(H, (() => {
          const be = R(() => r() === "year");
          return () => be() && (() => {
            const me = Vf.cloneNode(!0);
            return p(me, () => w().map((ie) => (() => {
              const pe = P1.cloneNode(!0);
              return pe.$$click = () => Y(ie), p(pe, ie), I(() => re(pe, `${ie < g() || ie > g() + 9 ? "muted" : ""} ${ie === e.value.year ? "selected" : ""}`)), pe;
            })())), me;
          })();
        })(), null), p(H, (() => {
          const be = R(() => r() === "date");
          return () => be() && (() => {
            const me = Hf.cloneNode(!0), ie = me.firstChild, pe = ie.nextSibling, q = pe.nextSibling;
            return p(ie, () => F.map((N) => (() => {
              const B = P1.cloneNode(!0);
              return B.$$click = () => Z(N), p(B, () => Q1(N)), I(() => re(B, N === A() ? "selected" : "")), B;
            })())), p(pe, () => E.map((N) => (() => {
              const B = P1.cloneNode(!0);
              return B.$$click = () => e.onChange({
                ...e.value,
                minute: N
              }), p(B, () => Q1(N)), I(() => re(B, N === e.value.minute ? "selected" : "")), B;
            })())), p(q, () => ["AM", "PM"].map((N) => (() => {
              const B = P1.cloneNode(!0);
              return B.$$click = () => ce(N), p(B, N), I(() => re(B, N === O() ? "selected" : "")), B;
            })())), me;
          })();
        })(), null), H;
      })();
    })(), null), j;
  })();
}, ty = (e) => {
  const [n, t] = T(e.initialTab ?? "goToDate"), [r, a] = T(y0(e.initialTimestamp)), [s, d] = T(y0(e.initialRange.from)), [u, m] = T(y0(e.initialRange.to)), [k, g] = T("from"), [w, A] = T({
    ...e.anchorSettings
  }), O = (E) => {
    A((D) => ({
      ...D,
      ...E
    }));
  }, F = () => {
    const E = n();
    if (E === "goToDate")
      e.onGoToDate(Bt(r()));
    else if (E === "timeRange") {
      const D = Bt(s()), K = Bt(u());
      e.onTimeRange(D <= K ? {
        from: D,
        to: K
      } : {
        from: K,
        to: D
      });
    } else {
      const D = w();
      e.onTimeAnchorChange({
        ...D,
        timestamp: D.anchorPoint === "current" ? Date.now() : Bt(r())
      });
    }
    e.onClose();
  };
  return L(C1, {
    width: 620,
    get title() {
      return (() => {
        const E = Yf.cloneNode(!0);
        return p(E, () => Xf.map((D) => (() => {
          const K = P1.cloneNode(!0);
          return K.$$click = () => t(D.key), p(K, () => D.label), I(() => re(K, n() === D.key ? "active" : "")), K;
        })())), E;
      })();
    },
    get buttons() {
      return [{
        children: "Close",
        type: "cancel",
        onClick: e.onClose
      }, {
        children: "Confirm",
        onClick: F
      }];
    },
    get onClose() {
      return e.onClose;
    },
    minButtonWidth: 112,
    get children() {
      const E = qf.cloneNode(!0);
      return p(E, (() => {
        const D = R(() => n() === "goToDate");
        return () => D() && L(Ft, {
          label: "Date and time",
          get value() {
            return r();
          },
          onChange: a
        });
      })(), null), p(E, (() => {
        const D = R(() => n() === "timeRange");
        return () => D() && (() => {
          const K = Gf.cloneNode(!0), X = K.firstChild, U = X.firstChild, Y = U.nextSibling, Z = Y.nextSibling;
          return U.$$click = () => g("from"), p(U, () => w0(s())), Z.$$click = () => g("to"), p(Z, () => w0(u())), p(K, (() => {
            const ce = R(() => k() === "from");
            return () => ce() ? L(Ft, {
              label: "Start",
              get value() {
                return s();
              },
              onChange: d,
              showInput: !1
            }) : L(Ft, {
              label: "End",
              get value() {
                return u();
              },
              onChange: m,
              showInput: !1
            });
          })(), null), I((ce) => {
            const j = k() === "from" ? "active" : "", V = k() === "to" ? "active" : "";
            return j !== ce._v$ && re(U, ce._v$ = j), V !== ce._v$2 && re(Z, ce._v$2 = V), ce;
          }, {
            _v$: void 0,
            _v$2: void 0
          }), K;
        })();
      })(), null), p(E, (() => {
        const D = R(() => n() === "timeAnchor");
        return () => D() && (() => {
          const K = Wf.cloneNode(!0), X = K.firstChild, U = X.firstChild, Y = U.nextSibling, Z = X.nextSibling, ce = Z.firstChild, j = ce.nextSibling, V = Z.nextSibling, H = V.firstChild, ne = H.nextSibling, oe = V.nextSibling, Ce = oe.firstChild, Pe = Ce.nextSibling;
          return Y.$$click = () => O({
            enabled: !w().enabled
          }), j.addEventListener("change", ($e) => O({
            anchorPoint: $e.currentTarget.value
          })), p(K, (() => {
            const $e = R(() => w().anchorPoint === "date");
            return () => $e() && L(Ft, {
              label: "Anchor date",
              get value() {
                return r();
              },
              onChange: a
            });
          })(), V), ne.$$click = () => O({
            anchorLine: !w().anchorLine
          }), Pe.$$click = () => O({
            acrossTokens: !w().acrossTokens
          }), I(($e) => {
            const Re = `klinecharts-pro-time-tools-switch${w().enabled ? " on" : ""}`, be = `klinecharts-pro-time-tools-switch${w().anchorLine ? " on" : ""}`, me = `klinecharts-pro-time-tools-switch${w().acrossTokens ? " on" : ""}`;
            return Re !== $e._v$3 && re(Y, $e._v$3 = Re), be !== $e._v$4 && re(ne, $e._v$4 = be), me !== $e._v$5 && re(Pe, $e._v$5 = me), $e;
          }, {
            _v$3: void 0,
            _v$4: void 0,
            _v$5: void 0
          }), I(() => j.value = w().anchorPoint), K;
        })();
      })(), null), E;
    }
  });
};
Qe(["click"]);
const ny = /* @__PURE__ */ $('<i class="icon-close klinecharts-pro-load-icon"></i>'), ry = /* @__PURE__ */ $('<div class="klinecharts-pro-content"><div class="klinecharts-pro-widget"></div></div>'), oy = /* @__PURE__ */ $('<div class="klinecharts-pro-time-navigation-tooltip"></div>'), iy = /* @__PURE__ */ $('<div class="klinecharts-pro-countdown-price-mark"><span class="klinecharts-pro-countdown-price-mark-price"></span><span class="klinecharts-pro-countdown-price-mark-timer"></span></div>'), ay = /* @__PURE__ */ $('<div class="overlay-toolbar-color-popover"><div class="overlay-toolbar-color-grid"></div><div class="overlay-toolbar-color-footer"><button type="button" class="overlay-toolbar-add-color">+</button><div class="overlay-toolbar-color-slider"><span></span></div></div></div>'), sy = /* @__PURE__ */ $('<div class="overlay-toolbar-dropdown width-menu"></div>'), ly = /* @__PURE__ */ $('<div class="overlay-toolbar-dropdown style-menu"><button type="button"><span class="overlay-toolbar-style-sample solid"></span></button><button type="button"><span class="overlay-toolbar-style-sample dashed"></span></button><button type="button"><span class="overlay-toolbar-style-sample dotted"></span></button></div>'), cy = /* @__PURE__ */ $('<div class="klinecharts-pro-overlay-toolbar"><button type="button" class="overlay-toolbar-icon drag" title="Move"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="6" r="1.5"></circle><circle cx="15" cy="6" r="1.5"></circle><circle cx="9" cy="12" r="1.5"></circle><circle cx="15" cy="12" r="1.5"></circle><circle cx="9" cy="18" r="1.5"></circle><circle cx="15" cy="18" r="1.5"></circle></svg></button><button type="button" class="overlay-toolbar-icon refresh" title="Reset"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 15.4-6.36L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-15.4 6.36L3 16"></path><path d="M3 21v-5h5"></path></svg></button><div class="overlay-toolbar-picker"><button type="button" title="Color"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg></button></div><div class="overlay-toolbar-picker"><button type="button" title="Line width"><span class="overlay-toolbar-line-preview"></span><span>px</span></button></div><div class="overlay-toolbar-picker"><button type="button" title="Line style"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16"></path></svg></button></div><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2"></rect><path d="M20 4 4 20"></path></svg></button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg></button><button type="button" class="overlay-toolbar-icon delete" title="Delete"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6 18 20H6L5 6"></path><path d="M10 11v5"></path><path d="M14 11v5"></path></svg></button></div>'), uy = /* @__PURE__ */ $('<button type="button"></button>'), dy = /* @__PURE__ */ $('<button type="button"><span class="overlay-toolbar-width-sample"></span></button>'), hy = /* @__PURE__ */ $('<div class="klinecharts-pro-quick-order-marker"><button type="button" class="klinecharts-pro-quick-order-plus"></button></div>'), fy = /* @__PURE__ */ $('<span class="klinecharts-pro-quick-order-plus-icon"></span>'), yy = /* @__PURE__ */ $('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" aria-hidden="true"><path d="M460-300h40v-160h160v-40H500v-160h-40v160H300v40h160v160ZM224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h510.76q27.62 0 46.12 18.5Q800-763 800-735.38v510.76q0 27.62-18.5 46.12Q763-160 735.38-160H224.62Zm0-40h510.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-510.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69H224.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v510.76q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69ZM200-760v560-560Z"></path></svg>'), gy = /* @__PURE__ */ $('<div class="klinecharts-pro-quick-order-menu-anchor"><div class="klinecharts-pro-quick-order-menu"><button type="button">Trade <!> @ <!> Limit</button><button type="button">Trade <!> @ <!> Stop</button><button type="button">Create new order...</button><button type="button">Copy Price (<!>)</button><button type="button">Draw horizontal line on </button></div></div>');
function Ut(e, n, t, r) {
  n === "VOL" && (r = {
    gap: {
      bottom: 2
    },
    ...r
  });
  const a = (e == null ? void 0 : e.createIndicator({
    name: n,
    // @ts-expect-error
    createTooltipDataSource: ({
      indicator: s,
      defaultStyles: d
    }) => {
      const u = [];
      return s.visible ? (u.push(d.tooltip.icons[1]), u.push(d.tooltip.icons[2]), u.push(d.tooltip.icons[3])) : (u.push(d.tooltip.icons[0]), u.push(d.tooltip.icons[2]), u.push(d.tooltip.icons[3])), {
        icons: u
      };
    }
  }, t, r)) ?? null;
  if (a && n === "MA")
    try {
      e == null || e.overrideIndicator({
        name: "MA",
        calcParams: [7, 25, 99]
      }, a);
    } catch {
    }
  return a;
}
function g0(e) {
  const n = Math.max(1, e.multiplier || 1);
  switch (e.timespan) {
    case "minute":
      return n * 60 * 1e3;
    case "hour":
      return n * 60 * 60 * 1e3;
    case "day":
      return n * 24 * 60 * 60 * 1e3;
    case "week":
      return n * 7 * 24 * 60 * 60 * 1e3;
    case "month":
      return n * 30 * 24 * 60 * 60 * 1e3;
    case "year":
      return n * 365 * 24 * 60 * 60 * 1e3;
    default:
      return 60 * 60 * 1e3;
  }
}
function my(e) {
  const n = Math.max(0, Math.ceil(e / 1e3)), t = Math.floor(n / 3600), r = Math.floor(n % 3600 / 60), a = n % 60, s = (d) => String(d).padStart(2, "0");
  return t > 0 ? `${s(t)}:${s(r)}:${s(a)}` : `${s(r)}:${s(a)}`;
}
const py = (e) => {
  var ln, cn, un, dn, hn, fn, yn, gn, mn, pn, vn, Cn, $n, bn, _n, kn, xn, Ln, wn, An, Mn, Tn, Sn, Pn, On, Dn, Nn, In;
  let n, t = null, r;
  const [a, s] = T(!1), [d, u] = T(e.theme), [m, k] = T(e.styles), [g, w] = T(e.locale), [A, O] = T(e.symbol), [F, E] = T(e.period), D = () => {
    var o, i, l, h;
    return {
      visibleMarginLeft: ((o = e.indicatorTooltipIconStyles) == null ? void 0 : o.visibleMarginLeft) ?? 7,
      secondaryMarginLeft: ((i = e.indicatorTooltipIconStyles) == null ? void 0 : i.secondaryMarginLeft) ?? 7,
      marginTop: ((l = e.indicatorTooltipIconStyles) == null ? void 0 : l.marginTop) ?? 1,
      size: ((h = e.indicatorTooltipIconStyles) == null ? void 0 : h.size) ?? 12
    };
  }, [K, X] = T(!1), [U, Y] = T([...e.mainIndicators]), [Z, ce] = T({}), [j, V] = T(!1), [H, ne] = T({
    key: e.timezone,
    text: Lr(e.timezone, e.locale)
  }), [oe, Ce] = T(!1), [Pe, $e] = T(), [Re, be] = T(""), [me, ie] = T(!1), [pe, q] = T(Date.now()), [N, B] = T({
    from: Date.now() - 30 * 24 * 60 * 60 * 1e3,
    to: Date.now()
  }), [we, ze] = T({
    enabled: !1,
    timestamp: Date.now(),
    anchorPoint: "date",
    anchorLine: !1,
    acrossTokens: !1
  });
  let se = null;
  const [Oe, _] = T(e.drawingBarVisible), [ue, Ae] = T(!1), [s1, de] = T(!1), [y1, l1] = T(!1), J1 = ((ln = e.orderTools) == null ? void 0 : ln.quickOrder) ?? !0, [Ne, gt] = T({
    quickOrder: J1,
    quickOrderFloatingWindow: ((cn = e.orderTools) == null ? void 0 : cn.quickOrderFloatingWindow) ?? J1,
    quickOrderPlusButton: ((un = e.orderTools) == null ? void 0 : un.quickOrderPlusButton) ?? J1,
    openOrders: ((dn = e.orderTools) == null ? void 0 : dn.openOrders) ?? !0,
    openOrdersExtendedPriceLine: ((hn = e.orderTools) == null ? void 0 : hn.openOrdersExtendedPriceLine) ?? !0,
    openOrdersDisplay: ((fn = e.orderTools) == null ? void 0 : fn.openOrdersDisplay) ?? "right",
    positions: ((yn = e.orderTools) == null ? void 0 : yn.positions) ?? !0,
    breakevenPrice: ((gn = e.orderTools) == null ? void 0 : gn.breakevenPrice) ?? !0,
    liquidationPrice: ((mn = e.orderTools) == null ? void 0 : mn.liquidationPrice) ?? !0,
    priceLine: ((pn = e.orderTools) == null ? void 0 : pn.priceLine) ?? !0,
    marketPriceLine: ((vn = e.orderTools) == null ? void 0 : vn.marketPriceLine) ?? !0,
    countDown: ((Cn = e.orderTools) == null ? void 0 : Cn.countDown) ?? !0,
    bidAskPrice: (($n = e.orderTools) == null ? void 0 : $n.bidAskPrice) ?? !0,
    orderHistory: ((bn = e.orderTools) == null ? void 0 : bn.orderHistory) ?? !0
  }), [B1, $1] = T(null), [b1, t1] = T(!1), [mt, Ze] = T(!1), [et, tt] = T(64), [g1, _1] = T(null), nt = 6, [pt, F1] = T(null), [rt, vt] = T(null), [Fe, Ke] = T(null), [He, je] = T(null), ot = ["#000000", "#2b3342", "#3f4653", "#565d69", "#6f7580", "#8a9099", "#a7acb3", "#c4c8ce", "#ffffff", "#ff4d67", "#ffa629", "#f7ed4a", "#2fc58d", "#4ab09c", "#52c4d3", "#3157f6", "#6a36b8", "#a644b9", "#d83972", "#f2a3a6", "#f5c879", "#f7ee97", "#a6d29f", "#7fc9b9", "#91d7df", "#8fb2ee", "#b09ad2", "#c89ccf", "#d987ab", "#e8757a", "#efb34f", "#efe36e", "#86c17d", "#66b7a8", "#68c4d0", "#5f91e4", "#8059c9", "#aa62c2", "#d34d83", "#b9353d", "#ea8527", "#e8c245", "#4b8c43", "#2f6f60", "#47919b", "#2646c6", "#56309c", "#892f95", "#a82563", "#8e2528", "#de5c1f", "#dc8527", "#255a22", "#164b34", "#225b63", "#15309b", "#442180", "#6b1f74", "#86154e"];
  let U1 = null;
  const [z1, Ct] = T({
    visible: !1,
    indicatorName: "",
    paneId: "",
    calcParams: []
  });
  let ke = /* @__PURE__ */ new Map(), Ie = /* @__PURE__ */ new Map();
  const $t = (o, i, l) => {
    const h = t == null ? void 0 : t.getIndicatorByPaneId(i, o);
    return {
      name: o,
      shortName: (h == null ? void 0 : h.shortName) || o,
      paneId: i,
      type: l,
      calcParams: (h == null ? void 0 : h.calcParams) || [],
      precision: (h == null ? void 0 : h.precision) ?? 4,
      visible: (h == null ? void 0 : h.visible) ?? !0,
      styles: h == null ? void 0 : h.styles,
      figures: h == null ? void 0 : h.figures
    };
  }, qe = (o, i, l, h) => {
    if (e.onIndicatorChange)
      if (h === "add" || h === "change")
        setTimeout(() => {
          const y = $t(o, i, l);
          e.onIndicatorChange({
            action: h,
            indicator: y
          });
        }, 50);
      else {
        const y = {
          name: o,
          shortName: o,
          paneId: i,
          type: l,
          calcParams: [],
          precision: 4,
          visible: !1,
          styles: void 0,
          figures: void 0
        };
        e.onIndicatorChange({
          action: h,
          indicator: y
        });
      }
  }, m1 = (o) => ({
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
  })[o] || 1, p1 = (o, i = /* @__PURE__ */ new WeakSet()) => {
    if (o == null)
      return o;
    if (i.has(o))
      return "[Circular]";
    if (typeof o != "object")
      return o;
    if (i.add(o), Array.isArray(o))
      return o.map((h) => p1(h, i));
    const l = {};
    for (const h in o)
      if (!(h === "__proto__" || h === "constructor" || h === "prototype"))
        try {
          const y = o[h];
          if (typeof y == "function")
            continue;
          l[h] = p1(y, i);
        } catch (y) {
          l[h] = `[Error: ${y.message}]`;
        }
    return l;
  }, bt = (o) => {
    if (!o)
      return null;
    try {
      return {
        id: o.id || "",
        type: o.name || "",
        name: o.name || "",
        points: (o.points || []).map((i) => ({
          timestamp: i.timestamp || 0,
          value: i.value || 0,
          dataIndex: i.dataIndex || 0
        })),
        extendData: p1(o.extendData || {}),
        styles: p1(o.styles || {}),
        visible: o.visible ?? !0,
        lock: o.lock ?? !1,
        mode: o.mode || u0.Normal
      };
    } catch (i) {
      return console.error("Error extracting overlay data:", i), null;
    }
  }, k1 = (o) => {
    var i, l, h;
    try {
      const y = (i = t == null ? void 0 : t.getOverlayById) == null ? void 0 : i.call(t, o);
      if (!y)
        return;
      const v = bt(y);
      if (v) {
        const f = ke.get(o), C = ((l = f == null ? void 0 : f.points) == null ? void 0 : l.length) || 0, x = ((h = v.points) == null ? void 0 : h.length) || 0;
        ke.set(o, v);
        const M = m1(v.type);
        if (x >= M) {
          const P = Ie.get(o);
          P && !P.complete && (P.complete = !0, P.checkInterval && (clearInterval(P.checkInterval), P.checkInterval = void 0));
        }
      }
    } catch (y) {
      console.error(`Error updating overlay tracking for ${o}:`, y);
    }
  }, _t = (o, i) => {
    if (Ie.has(o))
      return;
    const l = {
      monitoring: !0,
      complete: !1,
      lastPointCount: 0
    };
    Ie.set(o, l), k1(o);
    const h = () => {
      k1(o);
    };
    document.addEventListener("mouseup", h), document.addEventListener("touchend", h), setTimeout(() => {
      var v;
      const y = Ie.get(o);
      if (y && !y.complete) {
        y.checkInterval && clearInterval(y.checkInterval), y.mouseUpHandler && (document.removeEventListener("mouseup", y.mouseUpHandler), document.removeEventListener("touchend", y.mouseUpHandler)), k1(o);
        const f = ke.get(o);
        if (f) {
          const C = m1(f.type), x = ((v = f.points) == null ? void 0 : v.length) || 0;
          x < C && console.warn(`âš ï¸ ${f.type} ${o} has only ${x} point(s), should have ${C}`);
        }
      }
    }, 3e4);
  };
  let Ye = {
    saveDrawings: (o, i) => {
      try {
        const l = `kline_drawings_${o}`, y = {
          drawings: i.map((v) => {
            var M;
            const f = {
              ...v
            };
            f.extendData && (f.extendData = p1(f.extendData)), f.styles && (f.styles = p1(f.styles));
            const C = m1(v.type), x = ((M = v.points) == null ? void 0 : M.length) || 0;
            return x < C && console.warn(`âš ï¸ Saving ${v.type} with only ${x} point(s), needs ${C}`), f;
          }),
          timestamp: Date.now()
        };
        localStorage.setItem(l, JSON.stringify(y));
      } catch (l) {
        console.error("Library: Error saving drawings:", l);
      }
    },
    loadDrawings: (o) => {
      try {
        const i = `kline_drawings_${o}`, l = localStorage.getItem(i);
        if (l) {
          const h = JSON.parse(l), y = [];
          return Array.isArray(h.drawings) && h.drawings.forEach((v) => {
            var x;
            const f = m1(v.type);
            (((x = v.points) == null ? void 0 : x.length) || 0) >= f && y.push(v);
          }), y;
        }
      } catch (i) {
        console.error("Library: Error loading drawings:", i);
      }
      return [];
    },
    clearDrawings: (o) => {
      try {
        const i = `kline_drawings_${o}`;
        localStorage.removeItem(i);
      } catch (i) {
        console.error("Library: Error clearing drawings:", i);
      }
    }
  };
  const x1 = () => {
    const o = A();
    if (o != null && o.ticker) {
      const i = Array.from(ke.values());
      Ye.saveDrawings(o.ticker, i);
    }
  }, o0 = (o) => {
    if (!o || !t)
      return;
    ke.forEach((l, h) => {
      var y;
      (y = t == null ? void 0 : t.removeOverlay) == null || y.call(t, {
        id: h
      });
    }), ke.clear(), Ie.clear(), Ke(null), je(null), Ye.loadDrawings(o).forEach((l) => {
      var h;
      try {
        const y = A1({
          name: l.type,
          points: l.points || [],
          extendData: l.extendData,
          styles: l.styles,
          visible: l.visible ?? !0,
          lock: l.lock ?? !1,
          mode: l.mode || u0.Normal
        }), v = t == null ? void 0 : t.createOverlay(y), f = typeof v == "string" ? v : null;
        f && (ke.set(f, {
          ...l,
          id: f
        }), Ie.set(f, {
          monitoring: !1,
          complete: !0,
          lastPointCount: ((h = l.points) == null ? void 0 : h.length) || 0
        }));
      } catch (y) {
        console.error("Library: Error restoring drawing:", y);
      }
    });
  }, L1 = (o) => {
    var l, h;
    const i = {
      ...Ne(),
      ...o
    };
    if ("quickOrder" in o) {
      const y = o.quickOrder ?? !1;
      i.quickOrderFloatingWindow = y, i.quickOrderPlusButton = y;
    } else if ("priceLine" in o) {
      const y = o.priceLine ?? !1;
      i.marketPriceLine = y, i.countDown = y, i.bidAskPrice = y;
    } else
      "quickOrderFloatingWindow" in o || "quickOrderPlusButton" in o ? i.quickOrder = i.quickOrderFloatingWindow || i.quickOrderPlusButton : ("marketPriceLine" in o || "countDown" in o || "bidAskPrice" in o) && (i.priceLine = i.marketPriceLine || i.countDown || i.bidAskPrice);
    gt(i), (h = (l = e.orderTools) == null ? void 0 : l.onChange) == null || h.call(l, i);
  }, w1 = (o) => {
    var l;
    const i = Math.min(Math.max(((l = A()) == null ? void 0 : l.pricePrecision) ?? 2, 0), 8);
    return o.toLocaleString(void 0, {
      minimumFractionDigits: i,
      maximumFractionDigits: i
    });
  }, Ge = (o = Date.now()) => {
    var Je, e1, ct, En, Bn, Fn;
    if (!t || !n || !Ne().countDown) {
      F1(null);
      return;
    }
    t.setStyles({
      candle: {
        priceMark: {
          last: {
            show: !0,
            line: {
              show: Ne().marketPriceLine
            },
            text: {
              show: !1
            }
          }
        }
      }
    });
    const i = ((Je = t.getDataList) == null ? void 0 : Je.call(t)) ?? [], l = i[i.length - 1], h = Number(l == null ? void 0 : l.close);
    if (!l || !Number.isFinite(h) || h <= 0) {
      F1(null);
      return;
    }
    const y = (e1 = t.convertToPixel) == null ? void 0 : e1.call(t, [{
      value: h
    }], {
      paneId: "candle_pane",
      absolute: !0
    }), v = Number((ct = y == null ? void 0 : y[0]) == null ? void 0 : ct.y), f = (En = t.getSize) == null ? void 0 : En.call(t, "candle_pane"), C = (f == null ? void 0 : f.height) ?? n.clientHeight;
    if (!Number.isFinite(v) || v < 0 || v > C) {
      F1(null);
      return;
    }
    const x = Math.min(Math.max(((Bn = A()) == null ? void 0 : Bn.pricePrecision) ?? 2, 0), 8), M = h.toLocaleString(void 0, {
      minimumFractionDigits: x,
      maximumFractionDigits: x
    }), P = (Fn = t.getSize) == null ? void 0 : Fn.call(t, "candle_pane", Dt.YAxis), G = P != null && P.width && Number.isFinite(P.width) ? Math.max(74, Math.floor(P.width) - 2) : 96, te = g0(F()), ee = o % te, Q = ee === 0 ? te : te - ee, W = Number(l.close), he = Number(l.open), Ee = t.getStyles().candle.priceMark.last, z = Ee.text, ve = Number(z.size) || 12, ae = Number(z.paddingTop) || 2, _e = Number(z.paddingBottom) || 2, xe = Math.min(Number(z.paddingLeft) || 4, 3), We = Math.min(Number(z.paddingRight) || 4, 3), Xe = Math.max(34, ve * 2 + ae + _e + 6), r1 = Math.max(0, Math.min(v - Xe / 2, C - Xe));
    F1({
      top: r1,
      width: Math.min(G, Math.max(62, M.length * (ve * 0.56) + xe + We + 4)),
      priceText: M,
      text: my(Q),
      color: Number.isFinite(W) && Number.isFinite(he) && W < he ? Ee.downColor : Ee.upColor,
      textSize: ve,
      textFamily: z.family,
      textWeight: z.weight,
      paddingLeft: xe,
      paddingRight: We,
      paddingTop: ae,
      paddingBottom: _e,
      borderRadius: Number(z.borderRadius) || 2
    });
  }, kt = (o) => {
    var l, h;
    const i = Number(o == null ? void 0 : o.y);
    if (!Number.isFinite(i))
      return NaN;
    try {
      const y = t == null ? void 0 : t.convertFromPixel([{
        x: (o == null ? void 0 : o.x) ?? 0,
        y: i
      }], {
        paneId: "candle_pane"
      }), v = Number((l = y == null ? void 0 : y[0]) == null ? void 0 : l.value);
      if (Number.isFinite(v) && v > 0)
        return v;
    } catch {
    }
    try {
      const y = t == null ? void 0 : t.convertFromPixel([{
        x: (o == null ? void 0 : o.x) ?? 0,
        y: i
      }], {
        paneId: "candle_pane",
        absolute: !0
      }), v = Number((h = y == null ? void 0 : y[0]) == null ? void 0 : h.value);
      if (Number.isFinite(v) && v > 0)
        return v;
    } catch {
    }
    return NaN;
  }, xt = (o) => {
    var v;
    if (!Ne().quickOrderPlusButton || (o == null ? void 0 : o.paneId) !== "candle_pane" || !n) {
      if (mt() || b1())
        return;
      $1(null), t1(!1);
      return;
    }
    const i = (v = t == null ? void 0 : t.getSize) == null ? void 0 : v.call(t, "candle_pane", Dt.YAxis);
    i != null && i.width && Number.isFinite(i.width) && tt(Math.max(44, Math.ceil(i.width)));
    const l = Number(o.y), h = kt(o), y = n.clientHeight;
    if (!Number.isFinite(l) || !Number.isFinite(h) || h <= 0 || l < 0 || l > y) {
      if (mt() || b1())
        return;
      $1(null), t1(!1);
      return;
    }
    U1 = {
      ...o
    }, $1({
      y: l,
      price: h
    });
  }, c1 = () => {
    var o;
    if (U1)
      try {
        (o = t == null ? void 0 : t.executeAction) == null || o.call(t, T1.OnCrosshairChange, U1);
      } catch {
      }
  }, K1 = (o) => {
    var l, h;
    const i = g1() ?? B1();
    i && ((h = (l = e.orderTools) == null ? void 0 : l.onQuickOrderAction) == null || h.call(l, {
      action: o,
      price: i.price,
      symbol: A()
    }), t1(!1), _1(null), Ze(!1));
  }, i0 = async () => {
    var i;
    const o = g1() ?? B1();
    if (o) {
      try {
        await ((i = navigator.clipboard) == null ? void 0 : i.writeText(String(o.price)));
      } catch {
      }
      t1(!1), _1(null), Ze(!1);
    }
  }, Lt = () => {
    const o = g1() ?? B1();
    o && (t == null || t.createOverlay(A1({
      name: "horizontalStraightLine",
      points: [{
        value: o.price
      }],
      lock: !1
    })), t1(!1), _1(null), Ze(!1));
  }, a0 = (o) => {
    var C, x, M, P, G, te;
    const i = (x = (C = n == null ? void 0 : n.parentElement) == null ? void 0 : C.getBoundingClientRect) == null ? void 0 : x.call(C), l = (M = n == null ? void 0 : n.getBoundingClientRect) == null ? void 0 : M.call(n), h = o == null ? void 0 : o.overlay, y = (P = h == null ? void 0 : h.points) == null ? void 0 : P[0];
    let v = 72, f = 40;
    if (i) {
      if (Number.isFinite(o == null ? void 0 : o.pageX) ? v = o.pageX - i.left : Number.isFinite(o == null ? void 0 : o.x) && l && (v = l.left - i.left + o.x), Number.isFinite(o == null ? void 0 : o.pageY))
        f = o.pageY - i.top;
      else if (Number.isFinite(o == null ? void 0 : o.y) && l)
        f = l.top - i.top + o.y;
      else if (Number.isFinite(y == null ? void 0 : y.value))
        try {
          const ee = (G = t == null ? void 0 : t.convertToPixel) == null ? void 0 : G.call(t, [{
            value: y.value
          }], {
            paneId: "candle_pane",
            absolute: !0
          }), Q = Number((te = ee == null ? void 0 : ee[0]) == null ? void 0 : te.y);
          Number.isFinite(Q) && (f = Q - i.top);
        } catch {
        }
    }
    return {
      x: Math.max(12, Math.min(v - 28, ((i == null ? void 0 : i.width) ?? 360) - 320)),
      y: Math.max(8, f - 52)
    };
  }, it = (o) => {
    var C, x, M, P, G, te, ee, Q;
    const i = o == null ? void 0 : o.overlay;
    if (!(i != null && i.id) || i.name !== "horizontalStraightLine")
      return !1;
    const l = a0(o), h = Number((x = (C = i.styles) == null ? void 0 : C.line) == null ? void 0 : x.size) || 3, y = ((P = (M = i.styles) == null ? void 0 : M.line) == null ? void 0 : P.style) ?? o1.Solid, v = Array.isArray((te = (G = i.styles) == null ? void 0 : G.line) == null ? void 0 : te.dashedValue) ? i.styles.line.dashedValue : [], f = ((Q = (ee = i.styles) == null ? void 0 : ee.line) == null ? void 0 : Q.color) ?? "#2f6df6";
    return Ke({
      id: i.id,
      x: l.x,
      y: l.y,
      lineSize: h,
      lineStyle: y,
      dashedValue: v,
      color: f,
      locked: i.lock ?? !1,
      visible: i.visible ?? !0
    }), !1;
  }, at = (o) => {
    var l, h;
    const i = (l = o == null ? void 0 : o.overlay) == null ? void 0 : l.id;
    return (!i || ((h = Fe()) == null ? void 0 : h.id) === i) && (Ke(null), je(null)), !1;
  }, A1 = (o) => {
    var f, C, x, M, P, G, te, ee, Q;
    if (o.name !== "horizontalStraightLine")
      return o;
    const i = o.onClick, l = o.onSelected, h = o.onDeselected, y = o.onRemoved, v = o.onPressedMoveEnd;
    return {
      ...o,
      styles: {
        ...o.styles,
        line: {
          ...(f = o.styles) == null ? void 0 : f.line,
          size: Number((x = (C = o.styles) == null ? void 0 : C.line) == null ? void 0 : x.size) || 3,
          style: ((P = (M = o.styles) == null ? void 0 : M.line) == null ? void 0 : P.style) ?? o1.Solid,
          dashedValue: ((te = (G = o.styles) == null ? void 0 : G.line) == null ? void 0 : te.dashedValue) ?? [6, 4],
          color: ((Q = (ee = o.styles) == null ? void 0 : ee.line) == null ? void 0 : Q.color) ?? "#2f6df6"
        }
      },
      onClick: (W) => (it(W), (i == null ? void 0 : i(W)) ?? !1),
      onSelected: (W) => (it(W), (l == null ? void 0 : l(W)) ?? !1),
      onPressedMoveEnd: (W) => (it(W), (v == null ? void 0 : v(W)) ?? !1),
      onDeselected: (W) => (at(W), (h == null ? void 0 : h(W)) ?? !1),
      onRemoved: (W) => (at(W), (y == null ? void 0 : y(W)) ?? !1)
    };
  }, s0 = () => {
    var i;
    const o = Fe();
    o && ((i = t == null ? void 0 : t.removeOverlay) == null || i.call(t, {
      id: o.id
    }), Ke(null), je(null));
  }, u1 = (o) => {
    var l;
    const i = Fe();
    i && ((l = t == null ? void 0 : t.overrideOverlay) == null || l.call(t, {
      id: i.id,
      ...o
    }), setTimeout(() => {
      k1(i.id), x1();
    }, 0));
  }, b = () => {
    const o = Fe();
    if (!o)
      return;
    const i = !o.locked;
    u1({
      lock: i
    }), Ke({
      ...o,
      locked: i
    });
  }, S = () => {
    const o = Fe();
    if (!o)
      return;
    const i = !o.visible;
    u1({
      visible: i
    }), Ke({
      ...o,
      visible: i
    });
  }, Me = (o) => {
    const i = Fe();
    i && (u1({
      styles: {
        line: {
          size: o
        }
      }
    }), Ke({
      ...i,
      lineSize: o
    }), je(null));
  }, Te = (o, i) => {
    const l = Fe();
    l && (u1({
      styles: {
        line: {
          style: o,
          dashedValue: i
        }
      }
    }), Ke({
      ...l,
      lineStyle: o,
      dashedValue: i
    }), je(null));
  }, n1 = () => {
    const o = Fe();
    if (!o)
      return;
    const i = 1, l = o1.Solid, h = [6, 4], y = "#2f6df6";
    u1({
      styles: {
        line: {
          size: i,
          style: l,
          dashedValue: h,
          color: y
        }
      }
    }), Ke({
      ...o,
      lineSize: i,
      lineStyle: l,
      dashedValue: h,
      color: y
    }), je(null);
  }, M1 = (o) => {
    const i = Fe();
    i && (u1({
      styles: {
        line: {
          color: o
        }
      }
    }), Ke({
      ...i,
      color: o
    }));
  }, wt = (o) => {
    var M, P;
    const i = Fe();
    if (!i || !n)
      return;
    o.preventDefault(), o.stopPropagation(), je(null);
    const l = (P = (M = n.parentElement) == null ? void 0 : M.getBoundingClientRect) == null ? void 0 : P.call(M);
    if (!l)
      return;
    const h = o.clientX, y = o.clientY, v = i.x, f = i.y, C = (G) => {
      G.preventDefault();
      const te = v + G.clientX - h, ee = f + G.clientY - y;
      Ke({
        ...i,
        x: Math.max(8, Math.min(te, l.width - 320)),
        y: Math.max(8, Math.min(ee, l.height - 48))
      });
    }, x = () => {
      document.removeEventListener("mousemove", C), document.removeEventListener("mouseup", x);
    };
    document.addEventListener("mousemove", C), document.addEventListener("mouseup", x);
  }, At = () => {
    t1(!1), _1(null), Ze(!1);
  }, st = (o) => {
    var l, h;
    if (!b1())
      return;
    const i = o.target;
    (l = i == null ? void 0 : i.closest) != null && l.call(i, ".klinecharts-pro-quick-order-marker") || (h = i == null ? void 0 : i.closest) != null && h.call(i, ".klinecharts-pro-quick-order-menu-anchor") || At();
  };
  let lt = (_n = e.orderTools) == null ? void 0 : _n.quickOrder, K0 = (kn = e.orderTools) == null ? void 0 : kn.quickOrderFloatingWindow, j0 = (xn = e.orderTools) == null ? void 0 : xn.quickOrderPlusButton, Q0 = (Ln = e.orderTools) == null ? void 0 : Ln.openOrders, R0 = (wn = e.orderTools) == null ? void 0 : wn.openOrdersExtendedPriceLine, Z0 = (An = e.orderTools) == null ? void 0 : An.openOrdersDisplay, V0 = (Mn = e.orderTools) == null ? void 0 : Mn.positions, H0 = (Tn = e.orderTools) == null ? void 0 : Tn.breakevenPrice, q0 = (Sn = e.orderTools) == null ? void 0 : Sn.liquidationPrice, Y0 = (Pn = e.orderTools) == null ? void 0 : Pn.priceLine, G0 = (On = e.orderTools) == null ? void 0 : On.marketPriceLine, W0 = (Dn = e.orderTools) == null ? void 0 : Dn.countDown, X0 = (Nn = e.orderTools) == null ? void 0 : Nn.bidAskPrice, J0 = (In = e.orderTools) == null ? void 0 : In.orderHistory;
  Ue(() => {
    var W, he, Ee, z, ve, ae, _e, xe, We, Xe, r1, Je, e1, ct;
    const o = (W = e.orderTools) == null ? void 0 : W.quickOrder, i = (he = e.orderTools) == null ? void 0 : he.quickOrderFloatingWindow, l = (Ee = e.orderTools) == null ? void 0 : Ee.quickOrderPlusButton, h = (z = e.orderTools) == null ? void 0 : z.openOrders, y = (ve = e.orderTools) == null ? void 0 : ve.openOrdersExtendedPriceLine, v = (ae = e.orderTools) == null ? void 0 : ae.openOrdersDisplay, f = (_e = e.orderTools) == null ? void 0 : _e.positions, C = (xe = e.orderTools) == null ? void 0 : xe.breakevenPrice, x = (We = e.orderTools) == null ? void 0 : We.liquidationPrice, M = (Xe = e.orderTools) == null ? void 0 : Xe.priceLine, P = (r1 = e.orderTools) == null ? void 0 : r1.marketPriceLine, G = (Je = e.orderTools) == null ? void 0 : Je.countDown, te = (e1 = e.orderTools) == null ? void 0 : e1.bidAskPrice, ee = (ct = e.orderTools) == null ? void 0 : ct.orderHistory, Q = {};
    typeof o == "boolean" && o !== lt && (lt = o, Q.quickOrder = o, typeof i != "boolean" && (Q.quickOrderFloatingWindow = o), typeof l != "boolean" && (Q.quickOrderPlusButton = o)), typeof i == "boolean" && i !== K0 && (K0 = i, Q.quickOrderFloatingWindow = i), typeof l == "boolean" && l !== j0 && (j0 = l, Q.quickOrderPlusButton = l), typeof h == "boolean" && h !== Q0 && (Q0 = h, Q.openOrders = h), typeof y == "boolean" && y !== R0 && (R0 = y, Q.openOrdersExtendedPriceLine = y), v !== void 0 && v !== Z0 && (Z0 = v, Q.openOrdersDisplay = v), typeof f == "boolean" && f !== V0 && (V0 = f, Q.positions = f), typeof C == "boolean" && C !== H0 && (H0 = C, Q.breakevenPrice = C), typeof x == "boolean" && x !== q0 && (q0 = x, Q.liquidationPrice = x), typeof M == "boolean" && M !== Y0 && (Y0 = M, Q.priceLine = M, typeof P != "boolean" && (Q.marketPriceLine = M), typeof G != "boolean" && (Q.countDown = M), typeof te != "boolean" && (Q.bidAskPrice = M)), typeof P == "boolean" && P !== G0 && (G0 = P, Q.marketPriceLine = P), typeof G == "boolean" && G !== W0 && (W0 = G, Q.countDown = G), typeof te == "boolean" && te !== X0 && (X0 = te, Q.bidAskPrice = te), typeof ee == "boolean" && ee !== J0 && (J0 = ee, Q.orderHistory = ee), Object.keys(Q).length > 0 && L1(Q);
  }), Ue(() => {
    Ne().marketPriceLine, Ne().countDown, F(), A(), t == null || t.setStyles({
      candle: {
        priceMark: {
          last: {
            show: !0,
            line: {
              show: Ne().marketPriceLine
            },
            text: {
              show: !Ne().countDown
            }
          }
        }
      }
    }), Ge();
  }), e.ref({
    setTheme: u,
    getTheme: () => d(),
    setStyles: k,
    getStyles: () => t.getStyles(),
    setLocale: w,
    getLocale: () => g(),
    setTimezone: (o) => {
      ne({
        key: o,
        text: Lr(e.timezone, g())
      });
    },
    getTimezone: () => H().key,
    setSymbol: O,
    getSymbol: () => A(),
    setPeriod: E,
    getPeriod: () => F(),
    getMainIndicators: () => U(),
    getSubIndicators: () => Z(),
    setMainIndicators: Y,
    setSubIndicators: ce,
    overrideIndicator: (o, i) => {
      t == null || t.overrideIndicator(o, i);
    },
    createOverlay: (o) => {
      var l;
      const i = (l = t == null ? void 0 : t.createOverlay) == null ? void 0 : l.call(t, A1(o));
      return typeof i == "string" ? i : null;
    },
    removeOverlay: (o) => {
      var i;
      if ((i = t == null ? void 0 : t.removeOverlay) == null || i.call(t, o), o.id) {
        ke.delete(o.id);
        const l = Ie.get(o.id);
        l && (l.checkInterval && clearInterval(l.checkInterval), l.mouseUpHandler && (document.removeEventListener("mouseup", l.mouseUpHandler), document.removeEventListener("touchend", l.mouseUpHandler)), Ie.delete(o.id)), x1();
      }
    },
    removeAllOverlay: () => {
      ke.forEach((o, i) => {
        var h;
        (h = t == null ? void 0 : t.removeOverlay) == null || h.call(t, {
          id: i
        });
        const l = Ie.get(i);
        l && (l.checkInterval && clearInterval(l.checkInterval), l.mouseUpHandler && (document.removeEventListener("mouseup", l.mouseUpHandler), document.removeEventListener("touchend", l.mouseUpHandler)));
      }), ke.clear(), Ie.clear();
    },
    getAllOverlay: () => Array.from(ke.values()),
    getOverlay: (o) => ke.get(o) || null,
    overrideOverlay: (o) => {
      t && "overrideOverlay" in t && typeof t.overrideOverlay == "function" ? t.overrideOverlay(o) : console.warn("overrideOverlay method not available on widget");
    },
    convertToPixel: (o, i) => t ? t.convertToPixel(o, i) : Array.isArray(o) ? [] : {},
    convertFromPixel: (o, i) => t ? t.convertFromPixel(o, i) : [],
    getVisibleRange: () => t ? t.getVisibleRange() : {
      from: 0,
      to: 0
    },
    getDataList: () => t ? t.getDataList() : [],
    getSize: (o, i) => t ? t.getSize(o, i) : null,
    getDom: (o, i) => t ? t.getDom(o, i) : null,
    subscribeAction: (o, i) => {
      t && t.subscribeAction(o, i);
    },
    unsubscribeAction: (o, i) => {
      t && t.unsubscribeAction(o, i);
    },
    setIndicatorModalVisible: X,
    setTimezoneModalVisible: V,
    setSettingModalVisible: Ce,
    getOrderToolsState: () => Ne(),
    setOrderToolsState: (o) => {
      L1(o);
    },
    dispose: () => {
      n && Un(n);
    },
    resize: () => {
      t && "resize" in t && typeof t.resize == "function" ? t.resize() : console.warn("resize method not available on widget");
    },
    getSettings: () => {
      var l, h, y, v, f, C, x, M, P, G, te, ee, Q, W, he, Ee;
      if (!t)
        return {};
      const o = t.getStyles(), i = (l = o.candle) == null ? void 0 : l.bar;
      return {
        // Candle settings
        candleType: (h = o.candle) == null ? void 0 : h.type,
        candleBarStyle: i == null ? void 0 : i.style,
        // bar.style might be LineType
        showLastPrice: (f = (v = (y = o.candle) == null ? void 0 : y.priceMark) == null ? void 0 : v.last) == null ? void 0 : f.show,
        showHighestPrice: (M = (x = (C = o.candle) == null ? void 0 : C.priceMark) == null ? void 0 : x.high) == null ? void 0 : M.show,
        showLowestPrice: (te = (G = (P = o.candle) == null ? void 0 : P.priceMark) == null ? void 0 : G.low) == null ? void 0 : te.show,
        // Indicator settings
        showIndicatorLastValue: (Q = (ee = o.indicator) == null ? void 0 : ee.lastValueMark) == null ? void 0 : Q.show,
        // Axis settings - yAxis.reverse is boolean according to YAxisStyle interface
        priceAxisType: (W = o.yAxis) == null ? void 0 : W.type,
        reverseCoordinate: (he = o.yAxis) == null ? void 0 : he.reverse,
        // Grid settings
        showGrids: (Ee = o.grid) == null ? void 0 : Ee.show,
        timestamp: Date.now()
      };
    },
    setSettings: (o) => {
      var l, h, y, v, f, C, x, M, P, G, te, ee, Q, W;
      if (!t)
        return;
      const i = {};
      if (o.candleType !== void 0 && (i.candle = {
        ...i.candle,
        type: o.candleType
      }), o.candleBarStyle !== void 0) {
        const he = ((l = i.candle) == null ? void 0 : l.bar) || {};
        i.candle = {
          ...i.candle,
          bar: {
            ...he,
            style: o.candleBarStyle
          }
          // Use any since ChangeColor doesn't have style
        };
      }
      o.showLastPrice !== void 0 && (i.candle = {
        ...i.candle,
        priceMark: {
          ...(h = i.candle) == null ? void 0 : h.priceMark,
          last: {
            ...(v = (y = i.candle) == null ? void 0 : y.priceMark) == null ? void 0 : v.last,
            show: o.showLastPrice,
            text: {
              ...(x = (C = (f = i.candle) == null ? void 0 : f.priceMark) == null ? void 0 : C.last) == null ? void 0 : x.text,
              show: o.showLastPrice && !Ne().countDown
            }
          }
        }
      }), o.showHighestPrice !== void 0 && (i.candle = {
        ...i.candle,
        priceMark: {
          ...(M = i.candle) == null ? void 0 : M.priceMark,
          high: {
            ...(G = (P = i.candle) == null ? void 0 : P.priceMark) == null ? void 0 : G.high,
            show: o.showHighestPrice
          }
        }
      }), o.showLowestPrice !== void 0 && (i.candle = {
        ...i.candle,
        priceMark: {
          ...(te = i.candle) == null ? void 0 : te.priceMark,
          low: {
            ...(Q = (ee = i.candle) == null ? void 0 : ee.priceMark) == null ? void 0 : Q.low,
            show: o.showLowestPrice
          }
        }
      }), o.showIndicatorLastValue !== void 0 && (i.indicator = {
        ...i.indicator,
        lastValueMark: {
          ...(W = i.indicator) == null ? void 0 : W.lastValueMark,
          show: o.showIndicatorLastValue
        }
      }), o.priceAxisType !== void 0 && (i.yAxis = {
        ...i.yAxis,
        type: o.priceAxisType
      }), o.reverseCoordinate !== void 0 && (i.yAxis = {
        ...i.yAxis,
        reverse: o.reverseCoordinate
      }), o.showGrids !== void 0 && (i.grid = {
        ...i.grid,
        show: o.showGrids
      }), t.setStyles(i);
    },
    resetSettings: () => {
      var l, h, y, v, f, C, x;
      if (!t)
        return;
      t.getStyles();
      const o = {
        candle: {
          type: L9.CandleSolid,
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
          type: w9.Normal,
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
      }, i = Pe();
      if (i) {
        const M = {
          candle: {
            type: (l = i.candle) == null ? void 0 : l.type,
            bar: (h = i.candle) == null ? void 0 : h.bar,
            priceMark: (y = i.candle) == null ? void 0 : y.priceMark
          },
          indicator: {
            lastValueMark: (v = i.indicator) == null ? void 0 : v.lastValueMark
          },
          yAxis: {
            type: (f = i.yAxis) == null ? void 0 : f.type,
            reverse: (C = i.yAxis) == null ? void 0 : C.reverse
          },
          grid: {
            show: (x = i.grid) == null ? void 0 : x.show
          }
        };
        t.setStyles(M);
      } else
        t.setStyles(o);
    },
    // === Drawing Methods ===
    saveDrawings: (o) => {
      const i = Array.from(ke.values());
      i.forEach((l, h) => {
        var f;
        const y = m1(l.type), v = ((f = l.points) == null ? void 0 : f.length) || 0;
        v < y && console.warn(`âš ï¸ ${l.type} ${l.id} has only ${v} point(s), should have ${y}`);
      }), Ye.saveDrawings(o, i);
    },
    loadDrawings: (o) => {
      Ye.loadDrawings(o).forEach((l, h) => {
        var y;
        try {
          const v = {
            name: l.type,
            points: l.points || [],
            extendData: l.extendData,
            styles: l.styles,
            visible: l.visible ?? !0,
            lock: l.lock ?? !1,
            mode: l.mode ?? u0.Normal
          }, f = t == null ? void 0 : t.createOverlay(v), C = typeof f == "string" ? f : null;
          C && (ke.set(C, {
            ...l,
            id: C
          }), Ie.set(C, {
            monitoring: !1,
            complete: !0,
            lastPointCount: ((y = l.points) == null ? void 0 : y.length) || 0
          }));
        } catch (v) {
          console.error(`   âŒ Error restoring ${l.type}:`, v);
        }
      });
    },
    getDrawings: (o) => Ye.loadDrawings(o),
    clearDrawings: (o) => {
      Ye.clearDrawings(o);
    },
    // Auto-save on overlay events
    enableAutoSave: (o, i = !0) => {
    }
  });
  const en = () => {
    t == null || t.resize(), Ge(), on();
  }, tn = () => {
    Ge(), on();
  }, nn = [T1.OnVisibleRangeChange, T1.OnZoom, T1.OnScroll];
  let Mt, Tt;
  const g9 = (o) => {
    const i = new Date(o), l = i.getFullYear(), h = `${i.getMonth() + 1}`.padStart(2, "0"), y = `${i.getDate()}`.padStart(2, "0"), v = `${i.getHours()}`.padStart(2, "0"), f = `${i.getMinutes()}`.padStart(2, "0");
    return `${l}/${h}/${y} ${v}:${f}`;
  }, m9 = (o) => {
    var f;
    const i = ((f = t == null ? void 0 : t.getDataList) == null ? void 0 : f.call(t)) ?? [];
    if (i.length === 0)
      return null;
    let l = i[0], h = 0, y = Number(l == null ? void 0 : l.timestamp), v = Math.abs(y - o);
    for (let C = 1; C < i.length; C += 1) {
      const x = i[C], M = Number(x == null ? void 0 : x.timestamp);
      if (!Number.isFinite(M))
        continue;
      const P = Math.abs(M - o);
      P < v && (l = x, h = C, y = M, v = P);
    }
    return l && Number.isFinite(y) ? {
      candle: l,
      dataIndex: h
    } : null;
  }, rn = (o) => {
    var ee, Q, W, he;
    if (!t || !n)
      return null;
    const i = m9(o), l = i == null ? void 0 : i.candle, h = Number((l == null ? void 0 : l.timestamp) ?? o), y = Number((l == null ? void 0 : l.high) ?? (l == null ? void 0 : l.close) ?? (l == null ? void 0 : l.open)), v = ((ee = t == null ? void 0 : t.getDataList) == null ? void 0 : ee.call(t)) ?? [], f = i && i.dataIndex < v.length - 1 ? i.dataIndex + 1 : i == null ? void 0 : i.dataIndex, C = i && Number.isFinite(y) ? {
      dataIndex: f,
      value: y
    } : {
      timestamp: h
    }, x = (Q = t.convertToPixel) == null ? void 0 : Q.call(t, [C], {
      paneId: "candle_pane",
      absolute: !0
    }), M = Number((W = x == null ? void 0 : x[0]) == null ? void 0 : W.x), P = Number((he = x == null ? void 0 : x[0]) == null ? void 0 : he.y), G = n.clientWidth, te = n.clientHeight;
    return !Number.isFinite(M) || M < -80 || M > G + 80 ? null : {
      timestamp: h,
      text: g9(h),
      left: Math.max(58, Math.min(M, G - 58)),
      top: Number.isFinite(P) ? Math.max(8, Math.min(P - 42, te - 38)) : 10
    };
  }, on = () => {
    const o = rt();
    if (!o || !t || !n)
      return;
    const i = rn(o.timestamp);
    i && vt(i);
  }, an = (o, i = 0) => {
    if (!t || !n)
      return;
    const l = rn(o);
    if (l) {
      vt(l);
      return;
    }
    i < 6 && (Tt = window.setTimeout(() => an(o, i + 1), 80));
  }, l0 = (o, i, l) => {
    let h = i, y = h;
    switch (o.timespan) {
      case "minute": {
        h = h - h % (60 * 1e3), y = h - l * o.multiplier * 60 * 1e3;
        break;
      }
      case "hour": {
        h = h - h % (60 * 60 * 1e3), y = h - l * o.multiplier * 60 * 60 * 1e3;
        break;
      }
      case "day": {
        h = h - h % (60 * 60 * 1e3), y = h - l * o.multiplier * 24 * 60 * 60 * 1e3;
        break;
      }
      case "week": {
        const f = new Date(h).getDay(), C = f === 0 ? 6 : f - 1;
        h = h - C * 60 * 60 * 24;
        const x = new Date(h);
        h = (/* @__PURE__ */ new Date(`${x.getFullYear()}-${x.getMonth() + 1}-${x.getDate()}`)).getTime(), y = l * o.multiplier * 7 * 24 * 60 * 60 * 1e3;
        break;
      }
      case "month": {
        const v = new Date(h), f = v.getFullYear(), C = v.getMonth() + 1;
        h = (/* @__PURE__ */ new Date(`${f}-${C}-01`)).getTime(), y = l * o.multiplier * 30 * 24 * 60 * 60 * 1e3;
        const x = new Date(y);
        y = (/* @__PURE__ */ new Date(`${x.getFullYear()}-${x.getMonth() + 1}-01`)).getTime();
        break;
      }
      case "year": {
        const f = new Date(h).getFullYear();
        h = (/* @__PURE__ */ new Date(`${f}-01-01`)).getTime(), y = l * o.multiplier * 365 * 24 * 60 * 60 * 1e3;
        const C = new Date(y);
        y = (/* @__PURE__ */ new Date(`${C.getFullYear()}-01-01`)).getTime();
        break;
      }
    }
    return [y, h];
  }, p9 = (o, i = 500) => {
    const l = g0(F()), h = Math.max(1, Math.floor(i / 2)) * l;
    return {
      from: o - h,
      to: o + h
    };
  }, c0 = (o) => {
    var i;
    !t || !Number.isFinite(o) || ((i = t.scrollToTimestamp) == null || i.call(t, o, 250), requestAnimationFrame(() => an(o)), Ge());
  }, St = () => {
    var l, h;
    se && ((l = t == null ? void 0 : t.removeOverlay) == null || l.call(t, {
      id: se
    }), se = null);
    const o = we();
    if (!t || !o.enabled || !o.anchorLine)
      return;
    const i = (h = t.createOverlay) == null ? void 0 : h.call(t, {
      name: "verticalStraightLine",
      points: [{
        timestamp: o.timestamp
      }],
      lock: !0,
      styles: {
        line: {
          color: "rgba(156, 163, 175, 0.75)",
          size: 1,
          style: o1.Dashed,
          dashedValue: [4, 4]
        }
      }
    });
    se = typeof i == "string" ? i : null;
  }, sn = async (o, i) => {
    if (t) {
      s(!0), de(!0);
      try {
        const l = F(), h = o.from <= o.to ? o : {
          from: o.to,
          to: o.from
        }, y = await e.datafeed.getHistoryKLineData(A(), l, h.from, h.to);
        t.applyNewData(y, y.length > 0), B(h), requestAnimationFrame(() => {
          c0(i ?? h.to), St();
        });
      } finally {
        s(!1), de(!1);
      }
    }
  }, v9 = async (o) => {
    q(o), await sn(p9(o), o);
  }, C9 = (o) => {
    ze(o), o.enabled && (q(o.timestamp), requestAnimationFrame(() => c0(o.timestamp))), requestAnimationFrame(St);
  };
  M0(() => {
    if (window.addEventListener("resize", en), t = x9(n, {
      customApi: {
        formatDate: (f, C, x, M) => {
          switch (F().timespan) {
            case "minute":
              return M === Ot.XAxis ? le.formatDate(f, C, "HH:mm") : le.formatDate(f, C, "YYYY-MM-DD HH:mm");
            case "hour":
              return M === Ot.XAxis ? le.formatDate(f, C, "MM-DD HH:mm") : le.formatDate(f, C, "YYYY-MM-DD HH:mm");
            case "day":
            case "week":
              return le.formatDate(f, C, "YYYY-MM-DD");
            case "month":
              return M === Ot.XAxis ? le.formatDate(f, C, "YYYY-MM") : le.formatDate(f, C, "YYYY-MM-DD");
            case "year":
              return M === Ot.XAxis ? le.formatDate(f, C, "YYYY") : le.formatDate(f, C, "YYYY-MM-DD");
          }
          return le.formatDate(f, C, "YYYY-MM-DD HH:mm");
        }
      }
    }), t) {
      const f = t.getDom("candle_pane", Dt.Main);
      if (f) {
        let x = document.createElement("div");
        if (x.className = "klinecharts-pro-watermark", le.isString(e.watermark)) {
          const M = e.watermark.replace(/(^\s*)|(\s*$)/g, "");
          x.innerHTML = M;
        } else
          x.appendChild(e.watermark);
        f.appendChild(x);
      }
      const C = t.getDom("candle_pane", Dt.YAxis);
      r = document.createElement("span"), r.className = "klinecharts-pro-price-unit", C == null || C.appendChild(r);
    }
    let o = !1;
    const i = () => {
      const f = A();
      if (f != null && f.ticker)
        try {
          const C = Array.from(ke.values());
          Ye.saveDrawings(f.ticker, C);
        } catch (C) {
          console.error("âŒ Error refreshing local storage:", C);
        }
    }, l = (f) => {
      o || (o = !0, f.preventDefault());
    };
    setTimeout(() => {
      n && n.addEventListener("contextmenu", l);
    }, 1e3), document.addEventListener("contextmenu", (f) => {
      n && n.contains(f.target) && l(f);
    });
    const h = t == null ? void 0 : t.removeOverlay;
    t && h && (t.removeOverlay = function(...f) {
      const C = h.apply(this, f), x = f[0];
      let M;
      if (typeof x == "string" ? M = x : x && typeof x == "object" && x.id && (M = x.id), M) {
        ke.delete(M);
        const P = Ie.get(M);
        P && (P.checkInterval && clearInterval(P.checkInterval), P.mouseUpHandler && (document.removeEventListener("mouseup", P.mouseUpHandler), document.removeEventListener("touchend", P.mouseUpHandler)), Ie.delete(M)), i();
      }
      return C;
    }), U().forEach((f) => {
      Ut(t, f, !0, {
        id: "candle_pane"
      });
    });
    const y = {};
    e.subIndicators.forEach((f) => {
      const C = Ut(t, f, !0);
      C && (y[f] = C);
    }), ce(y), t == null || t.loadMore((f) => {
      s(!0), (async () => {
        try {
          const x = F(), [M] = l0(x, f, 1), [P] = l0(x, M, 500), G = await e.datafeed.getHistoryKLineData(A(), x, P, M);
          t == null || t.applyMoreData(G, G.length > 0);
        } finally {
          s(!1);
        }
      })();
    }), t == null || t.subscribeAction(T1.OnTooltipIconClick, (f) => {
      if (f.indicatorName)
        switch (f.iconId) {
          case "visible": {
            t == null || t.overrideIndicator({
              name: f.indicatorName,
              visible: !0
            }, f.paneId);
            const C = f.paneId === "candle_pane" ? "main" : "sub";
            qe(f.indicatorName, f.paneId, C, "change");
            break;
          }
          case "invisible": {
            t == null || t.overrideIndicator({
              name: f.indicatorName,
              visible: !1
            }, f.paneId);
            const C = f.paneId === "candle_pane" ? "main" : "sub";
            qe(f.indicatorName, f.paneId, C, "change");
            break;
          }
          case "setting": {
            const C = t == null ? void 0 : t.getIndicatorByPaneId(f.paneId, f.indicatorName);
            Ct({
              visible: !0,
              indicatorName: f.indicatorName,
              paneId: f.paneId,
              calcParams: C.calcParams
            });
            break;
          }
          case "close":
            if (f.paneId === "candle_pane") {
              const C = [...U()];
              t == null || t.removeIndicator("candle_pane", f.indicatorName), C.splice(C.indexOf(f.indicatorName), 1), Y(C), qe(f.indicatorName, "candle_pane", "main", "remove");
            } else {
              const C = {
                ...Z()
              };
              t == null || t.removeIndicator(f.paneId, f.indicatorName), delete C[f.indicatorName], ce(C), qe(f.indicatorName, f.paneId, "sub", "remove");
            }
        }
    }), t == null || t.subscribeAction(T1.OnCrosshairChange, xt), nn.forEach((f) => {
      t == null || t.subscribeAction(f, tn);
    }), Mt = window.setInterval(() => Ge(), 1e3), Ge(), document.addEventListener("mousedown", st);
    const v = t == null ? void 0 : t.createOverlay;
    t && v && (t.createOverlay = function(...f) {
      const C = A1(f[0]), x = v.apply(this, [C, ...f.slice(1)]), M = typeof x == "string" ? x : null;
      return M && (_t(M, C.name || "unknown"), k1(M), x1()), x;
    });
  }), N1(() => {
    window.removeEventListener("resize", en), t == null || t.unsubscribeAction(T1.OnCrosshairChange, xt), nn.forEach((o) => {
      t == null || t.unsubscribeAction(o, tn);
    }), Mt && (window.clearInterval(Mt), Mt = void 0), Tt && (window.clearTimeout(Tt), Tt = void 0), document.removeEventListener("mousedown", st), Ie.clear(), ke.clear(), Un(n);
  }), Ue(() => {
    const o = A();
    o != null && o.priceCurrency ? (r.innerHTML = o == null ? void 0 : o.priceCurrency.toLocaleUpperCase(), r.style.display = "flex") : r.style.display = "none", t == null || t.setPriceVolumePrecision((o == null ? void 0 : o.pricePrecision) ?? 2, (o == null ? void 0 : o.volumePrecision) ?? 0);
  });
  const $9 = (o) => {
    const i = new Date(o), l = i.getFullYear(), h = `${i.getMonth() + 1}`.padStart(2, "0"), y = `${i.getDate()}`.padStart(2, "0"), v = `${i.getHours()}`.padStart(2, "0"), f = `${i.getMinutes()}`.padStart(2, "0"), C = `${l}-${h}-${y}`;
    switch (F().timespan) {
      case "minute":
      case "hour":
        return `${C} ${v}:${f}`;
      case "day":
      case "week":
        return C;
      case "month":
        return C;
      case "year":
        return C;
    }
    return `${C} ${v}:${f}`;
  }, b9 = (o, i) => {
    var x, M;
    const {
      current: l
    } = o, h = i.tooltip.text.color, y = l.close > l.open ? i.bar.upColor : l.close < l.open ? i.bar.downColor : i.bar.noChangeColor, v = Math.min(Math.max(((x = A()) == null ? void 0 : x.pricePrecision) ?? 2, 0), 8), f = Math.min(Math.max(((M = A()) == null ? void 0 : M.volumePrecision) ?? 0, 0), 8), C = (P) => ({
      text: le.formatPrecision(P, v),
      color: y
    });
    return [{
      title: "time",
      value: {
        text: $9(l.timestamp),
        color: h
      }
    }, {
      title: "open",
      value: C(l.open)
    }, {
      title: "high",
      value: C(l.high)
    }, {
      title: "low",
      value: C(l.low)
    }, {
      title: "close",
      value: C(l.close)
    }, {
      title: "volume",
      value: {
        text: le.formatBigNumber(le.formatPrecision(l.volume ?? i.tooltip.defaultValue, f)),
        color: y
      }
    }];
  }, Pt = () => {
    t == null || t.setStyles({
      candle: {
        tooltip: {
          custom: b9,
          rect: {
            offsetLeft: 0,
            paddingLeft: 0
          }
        }
      }
    });
  };
  return Ue((o) => {
    const i = A(), l = F();
    let h = !0;
    return N1(() => {
      h = !1;
    }), o && e.datafeed.unsubscribe(o.symbol, o.period), s(!0), de(!0), (async () => {
      try {
        const v = we(), f = v.enabled && (!o || o.symbol.ticker === i.ticker || v.acrossTokens), C = f ? v.timestamp + g0(l) * 250 : (/* @__PURE__ */ new Date()).getTime(), [x, M] = l0(l, C, 500), P = await e.datafeed.getHistoryKLineData(i, l, x, M);
        if (!h)
          return;
        t == null || t.applyNewData(P, P.length > 0), f ? requestAnimationFrame(() => {
          c0(v.timestamp), St();
        }) : St(), Ge(), setTimeout(() => {
          h && (o0(i == null ? void 0 : i.ticker), Ge());
        }, 0), e.datafeed.subscribe(i, l, (G) => {
          t == null || t.updateData(G), Ge();
        });
      } finally {
        h && (s(!1), de(!1));
      }
    })(), {
      symbol: i,
      period: l
    };
  }), Ue(() => {
    const o = d();
    t == null || t.setStyles(o);
    const i = o === "dark" ? "#929AA5" : "#76808F";
    Pt(), t == null || t.setStyles({
      indicator: {
        tooltip: {
          icons: [{
            id: "visible",
            position: Nt.Middle,
            marginLeft: D().visibleMarginLeft,
            marginTop: D().marginTop,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: D().size,
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "invisible",
            position: Nt.Middle,
            marginLeft: D().secondaryMarginLeft,
            marginTop: D().marginTop,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: D().size,
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "setting",
            position: Nt.Middle,
            marginLeft: D().secondaryMarginLeft,
            marginTop: D().marginTop,
            marginBottom: 0,
            marginRight: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: D().size,
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "close",
            position: Nt.Middle,
            marginLeft: D().secondaryMarginLeft,
            marginTop: D().marginTop,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: D().size,
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }]
        }
      }
    });
  }), Ue(() => {
    t == null || t.setLocale(g());
  }), Ue(() => {
    t == null || t.setTimezone(H().key);
  }), Ue(() => {
    m() && (t == null || t.setStyles(m()), Pt(), $e(Is(t.getStyles())));
  }), [ny.cloneNode(!0), L(Rd, {
    get locale() {
      return e.locale;
    },
    get symbol() {
      return A();
    },
    get spread() {
      return Oe();
    },
    get period() {
      return F();
    },
    get periods() {
      return e.periods;
    },
    onMenuClick: async () => {
      try {
        await G9(() => _(!Oe())), t == null || t.resize();
      } catch {
      }
    },
    onSymbolClick: () => {
      Ae(!ue());
    },
    get onMobilePeriodClick() {
      return e.onMobilePeriodClick;
    },
    onMobileMoreClick: () => {
      e.onMobileMoreClick ? e.onMobileMoreClick() : l1(!0);
    },
    onPeriodChange: E,
    onTimeToolsClick: () => {
      var f, C, x, M;
      const o = ((f = t == null ? void 0 : t.getDataList) == null ? void 0 : f.call(t)) ?? [], i = (C = t == null ? void 0 : t.getVisibleRange) == null ? void 0 : C.call(t), l = Math.max(0, Math.floor((i == null ? void 0 : i.from) ?? 0)), h = Math.min(o.length - 1, Math.ceil((i == null ? void 0 : i.to) ?? o.length - 1)), y = (x = o[l]) == null ? void 0 : x.timestamp, v = (M = o[h]) == null ? void 0 : M.timestamp;
      q(Date.now()), Number.isFinite(y) && Number.isFinite(v) && B({
        from: y,
        to: v
      }), ie(!0);
    },
    onIndicatorClick: () => {
      X((o) => !o);
    },
    onTimezoneClick: () => {
      V((o) => !o);
    },
    onSettingClick: () => {
      Ce((o) => !o);
    },
    onScreenshotClick: () => {
      if (t) {
        const o = e.screenshotBackgroundColor || (e.theme === "dark" ? "#11131E" : "#ffffff"), i = t.getConvertPictureUrl(!0, "jpeg", o);
        be(i);
      }
    },
    get chartViewToggle() {
      return e.chartViewToggle;
    },
    get showOrderToolsMenu() {
      var o;
      return ((o = e.orderTools) == null ? void 0 : o.visible) ?? !1;
    },
    get orderToolsState() {
      return Ne();
    },
    onOrderToolsStateChange: L1
  }), (() => {
    const o = ry.cloneNode(!0), i = o.firstChild;
    return o.addEventListener("mouseleave", () => {
      $1(null), Ze(!1);
    }), p(o, L(J, {
      get when() {
        return s1();
      },
      get children() {
        return L(d9, {});
      }
    }), i), p(o, L(J, {
      get when() {
        return Oe();
      },
      get children() {
        return L(bf, {
          get locale() {
            return e.locale;
          },
          onDrawingItemClick: (l) => {
            t == null || t.createOverlay(A1(l));
          },
          onModeChange: (l) => {
            t == null || t.overrideOverlay({
              mode: l
            });
          },
          onLockChange: (l) => {
            t == null || t.overrideOverlay({
              lock: l
            });
          },
          onVisibleChange: (l) => {
            t == null || t.overrideOverlay({
              visible: l
            });
          },
          onRemoveClick: (l) => {
            t == null || t.removeOverlay({
              groupId: l
            });
          }
        });
      }
    }), i), D1((l) => n = l, i), p(o, L(J, {
      get when() {
        return rt();
      },
      keyed: !0,
      children: (l) => (() => {
        const h = oy.cloneNode(!0);
        return p(h, () => l.text), I((y) => {
          const v = `${l.left}px`, f = `${l.top}px`;
          return v !== y._v$ && h.style.setProperty("left", y._v$ = v), f !== y._v$2 && h.style.setProperty("top", y._v$2 = f), y;
        }, {
          _v$: void 0,
          _v$2: void 0
        }), h;
      })()
    }), null), p(o, L(J, {
      get when() {
        return pt();
      },
      keyed: !0,
      children: (l) => (() => {
        const h = iy.cloneNode(!0), y = h.firstChild, v = y.nextSibling;
        return h.style.setProperty("right", "0px"), p(y, () => l.priceText), p(v, () => l.text), I((f) => {
          const C = `${l.top}px`, x = `${l.width}px`, M = l.color, P = `${l.borderRadius}px`, G = l.textFamily, te = l.textWeight, ee = `${l.paddingLeft}px`, Q = `${l.paddingRight}px`, W = `${l.paddingTop}px`, he = `${l.paddingBottom}px`, Ee = `${l.textSize}px`, z = `${Math.max(10, l.textSize - 1)}px`;
          return C !== f._v$3 && h.style.setProperty("top", f._v$3 = C), x !== f._v$4 && h.style.setProperty("width", f._v$4 = x), M !== f._v$5 && h.style.setProperty("background", f._v$5 = M), P !== f._v$6 && h.style.setProperty("border-radius", f._v$6 = P), G !== f._v$7 && h.style.setProperty("font-family", f._v$7 = G), te !== f._v$8 && h.style.setProperty("font-weight", f._v$8 = te), ee !== f._v$9 && h.style.setProperty("padding-left", f._v$9 = ee), Q !== f._v$10 && h.style.setProperty("padding-right", f._v$10 = Q), W !== f._v$11 && h.style.setProperty("padding-top", f._v$11 = W), he !== f._v$12 && h.style.setProperty("padding-bottom", f._v$12 = he), Ee !== f._v$13 && y.style.setProperty("font-size", f._v$13 = Ee), z !== f._v$14 && v.style.setProperty("font-size", f._v$14 = z), f;
        }, {
          _v$3: void 0,
          _v$4: void 0,
          _v$5: void 0,
          _v$6: void 0,
          _v$7: void 0,
          _v$8: void 0,
          _v$9: void 0,
          _v$10: void 0,
          _v$11: void 0,
          _v$12: void 0,
          _v$13: void 0,
          _v$14: void 0
        }), h;
      })()
    }), null), p(o, L(J, {
      get when() {
        return Fe();
      },
      keyed: !0,
      children: (l) => (() => {
        const h = cy.cloneNode(!0), y = h.firstChild, v = y.nextSibling, f = v.nextSibling, C = f.firstChild, x = f.nextSibling, M = x.firstChild, P = M.firstChild, G = P.nextSibling, te = G.firstChild, ee = x.nextSibling, Q = ee.firstChild, W = ee.nextSibling, he = W.nextSibling, Ee = he.nextSibling;
        return h.$$click = (z) => {
          z.stopPropagation();
        }, h.$$mousedown = (z) => {
          z.preventDefault(), z.stopPropagation();
        }, y.$$mousedown = wt, v.$$click = n1, C.$$click = () => je(He() === "color" ? null : "color"), p(f, L(J, {
          get when() {
            return He() === "color";
          },
          get children() {
            const z = ay.cloneNode(!0), ve = z.firstChild;
            return p(ve, L(v0, {
              each: ot,
              children: (ae) => (() => {
                const _e = uy.cloneNode(!0);
                return _e.$$click = () => M1(ae), _e.style.setProperty("background", ae), I(() => re(_e, `overlay-toolbar-color-swatch ${l.color.toLowerCase() === ae.toLowerCase() ? "selected" : ""}`)), _e;
              })()
            })), z;
          }
        }), null), M.$$click = () => je(He() === "width" ? null : "width"), p(G, () => l.lineSize, te), p(x, L(J, {
          get when() {
            return He() === "width";
          },
          get children() {
            const z = sy.cloneNode(!0);
            return p(z, L(v0, {
              each: [1, 2, 3, 4],
              children: (ve) => (() => {
                const ae = dy.cloneNode(!0), _e = ae.firstChild;
                return ae.$$click = () => Me(ve), _e.style.setProperty("height", `${ve}px`), I(() => re(ae, l.lineSize === ve ? "selected" : "")), ae;
              })()
            })), z;
          }
        }), null), Q.$$click = () => je(He() === "style" ? null : "style"), p(ee, L(J, {
          get when() {
            return He() === "style";
          },
          get children() {
            const z = ly.cloneNode(!0), ve = z.firstChild, ae = ve.nextSibling, _e = ae.nextSibling;
            return ve.$$click = () => Te(o1.Solid, []), ae.$$click = () => Te(o1.Dashed, [6, 4]), _e.$$click = () => Te(o1.Dashed, [2, 4]), I((xe) => {
              var Je, e1;
              const We = l.lineStyle === o1.Solid ? "selected" : "", Xe = l.lineStyle === o1.Dashed && ((Je = l.dashedValue) == null ? void 0 : Je[0]) === 6 ? "selected" : "", r1 = l.lineStyle === o1.Dashed && ((e1 = l.dashedValue) == null ? void 0 : e1[0]) === 2 ? "selected" : "";
              return We !== xe._v$15 && re(ve, xe._v$15 = We), Xe !== xe._v$16 && re(ae, xe._v$16 = Xe), r1 !== xe._v$17 && re(_e, xe._v$17 = r1), xe;
            }, {
              _v$15: void 0,
              _v$16: void 0,
              _v$17: void 0
            }), z;
          }
        }), null), W.$$click = S, he.$$click = b, Ee.$$click = s0, I((z) => {
          const ve = `${l.x}px`, ae = `${l.y}px`, _e = `overlay-toolbar-icon edit ${He() === "color" ? "active" : ""}`, xe = `overlay-toolbar-line-size ${He() === "width" ? "active" : ""}`, We = `overlay-toolbar-icon minus ${He() === "style" ? "active" : ""}`, Xe = `overlay-toolbar-icon visibility ${l.visible ? "" : "muted"}`, r1 = l.visible ? "Hide" : "Show", Je = `overlay-toolbar-icon lock ${l.locked ? "active" : ""}`, e1 = l.locked ? "Unlock" : "Lock";
          return ve !== z._v$18 && h.style.setProperty("left", z._v$18 = ve), ae !== z._v$19 && h.style.setProperty("top", z._v$19 = ae), _e !== z._v$20 && re(C, z._v$20 = _e), xe !== z._v$21 && re(M, z._v$21 = xe), We !== z._v$22 && re(Q, z._v$22 = We), Xe !== z._v$23 && re(W, z._v$23 = Xe), r1 !== z._v$24 && Se(W, "title", z._v$24 = r1), Je !== z._v$25 && re(he, z._v$25 = Je), e1 !== z._v$26 && Se(he, "title", z._v$26 = e1), z;
        }, {
          _v$18: void 0,
          _v$19: void 0,
          _v$20: void 0,
          _v$21: void 0,
          _v$22: void 0,
          _v$23: void 0,
          _v$24: void 0,
          _v$25: void 0,
          _v$26: void 0
        }), h;
      })()
    }), null), p(o, L(J, {
      get when() {
        return B1();
      },
      keyed: !0,
      children: (l) => (() => {
        const h = hy.cloneNode(!0), y = h.firstChild;
        return h.addEventListener("mouseleave", () => {
          b1() || Ze(!1);
        }), h.$$mousemove = (v) => {
          v.stopPropagation(), c1();
        }, h.addEventListener("mouseenter", () => {
          Ze(!0), c1();
        }), y.$$click = (v) => {
          v.stopPropagation(), Ze(!0), _1({
            y: l.y,
            price: l.price,
            yAxisWidth: et()
          }), t1(!0), c1();
        }, y.$$mousedown = (v) => {
          v.preventDefault(), v.stopPropagation(), c1();
        }, p(y, (() => {
          const v = R(() => {
            var f;
            return !!((f = e.orderTools) != null && f.quickOrderPlusIcon);
          });
          return () => v() ? (() => {
            const f = fy.cloneNode(!0);
            return I(() => f.innerHTML = e.orderTools.quickOrderPlusIcon), f;
          })() : yy.cloneNode(!0);
        })()), I((v) => {
          const f = `${Math.max(0, l.y - 12)}px`, C = `${et()}px`, x = Ne().quickOrderPlusButton ? "block" : "none";
          return f !== v._v$27 && h.style.setProperty("top", v._v$27 = f), C !== v._v$28 && h.style.setProperty("right", v._v$28 = C), x !== v._v$29 && h.style.setProperty("display", v._v$29 = x), v;
        }, {
          _v$27: void 0,
          _v$28: void 0,
          _v$29: void 0
        }), h;
      })()
    }), null), p(o, L(J, {
      get when() {
        return R(() => !!b1())() && g1();
      },
      keyed: !0,
      children: (l) => (() => {
        const h = gy.cloneNode(!0), y = h.firstChild, v = y.firstChild, f = v.firstChild, C = f.nextSibling, x = C.nextSibling, M = x.nextSibling;
        M.nextSibling;
        const P = v.nextSibling, G = P.firstChild, te = G.nextSibling, ee = te.nextSibling, Q = ee.nextSibling;
        Q.nextSibling;
        const W = P.nextSibling, he = W.nextSibling, Ee = he.firstChild, z = Ee.nextSibling;
        z.nextSibling;
        const ve = he.nextSibling;
        return ve.firstChild, h.addEventListener("mouseleave", () => Ze(!1)), h.addEventListener("mouseenter", () => Ze(!0)), y.$$mousemove = () => {
          c1();
        }, y.$$mousedown = (ae) => {
          ae.preventDefault(), ae.stopPropagation(), c1();
        }, v.$$click = () => K1("limit"), p(v, () => A().shortName ?? A().name ?? A().ticker, C), p(v, () => w1(l.price), M), P.$$click = () => K1("stop"), p(P, () => A().shortName ?? A().name ?? A().ticker, te), p(P, () => w1(l.price), Q), W.$$click = () => K1("create"), he.$$click = i0, p(he, () => w1(l.price), z), ve.$$click = Lt, p(ve, () => w1(l.price), null), I((ae) => {
          const _e = `${Math.max(0, l.y + 24)}px`, xe = `${l.yAxisWidth + nt}px`;
          return _e !== ae._v$30 && h.style.setProperty("top", ae._v$30 = _e), xe !== ae._v$31 && h.style.setProperty("right", ae._v$31 = xe), ae;
        }, {
          _v$30: void 0,
          _v$31: void 0
        }), h;
      })()
    }), null), I(() => Se(i, "data-drawing-bar-visible", Oe())), o;
  })(), L(J, {
    get when() {
      return ue();
    },
    get children() {
      return L(Bf, {
        get locale() {
          return e.locale;
        },
        get datafeed() {
          return e.datafeed;
        },
        onSymbolSelected: (o) => {
          O(o);
        },
        onClose: () => {
          Ae(!1);
        }
      });
    }
  }), L(J, {
    get when() {
      return K();
    },
    get children() {
      return L(_f, {
        get locale() {
          return e.locale;
        },
        get mainIndicators() {
          return U();
        },
        get subIndicators() {
          return Z();
        },
        onClose: () => {
          X(!1);
        },
        onMainIndicatorChange: (o) => {
          const i = [...U()];
          o.added ? (Ut(t, o.name, !0, {
            id: "candle_pane"
          }), i.push(o.name), qe(o.name, "candle_pane", "main", "add")) : (t == null || t.removeIndicator("candle_pane", o.name), i.splice(i.indexOf(o.name), 1), qe(o.name, "candle_pane", "main", "remove")), Y(i);
        },
        onSubIndicatorChange: (o) => {
          const i = {
            ...Z()
          };
          if (o.added) {
            const l = Ut(t, o.name);
            l && (i[o.name] = l, qe(o.name, l, "sub", "add"));
          } else
            o.paneId && (t == null || t.removeIndicator(o.paneId, o.name), delete i[o.name], qe(o.name, o.paneId, "sub", "remove"));
          ce(i);
        }
      });
    }
  }), L(J, {
    get when() {
      return j();
    },
    get children() {
      return L(xf, {
        get locale() {
          return e.locale;
        },
        get timezone() {
          return H();
        },
        onClose: () => {
          V(!1);
        },
        onConfirm: ne
      });
    }
  }), L(J, {
    get when() {
      return oe();
    },
    get children() {
      return L(Af, {
        get locale() {
          return e.locale;
        },
        get currentStyles() {
          return le.clone(t.getStyles());
        },
        onClose: () => {
          Ce(!1);
        },
        onChange: (o) => {
          t == null || t.setStyles(o), Pt();
        },
        onRestoreDefault: (o) => {
          const i = {};
          o.forEach((l) => {
            const h = l.key;
            $0(i, h, le.formatValue(Pe(), h));
          }), t == null || t.setStyles(i), Pt();
        }
      });
    }
  }), L(J, {
    get when() {
      return Re().length > 0;
    },
    get children() {
      return L(Tf, {
        get locale() {
          return e.locale;
        },
        get url() {
          return Re();
        },
        onClose: () => {
          be("");
        }
      });
    }
  }), L(J, {
    get when() {
      return me();
    },
    get children() {
      return L(ty, {
        get initialTimestamp() {
          return pe();
        },
        get initialRange() {
          return N();
        },
        get anchorSettings() {
          return we();
        },
        onClose: () => {
          ie(!1);
        },
        onGoToDate: v9,
        onTimeRange: (o) => {
          sn(o);
        },
        onTimeAnchorChange: C9
      });
    }
  }), L(J, {
    get when() {
      return z1().visible;
    },
    get children() {
      return L(Df, {
        get locale() {
          return e.locale;
        },
        get params() {
          return z1();
        },
        onClose: () => {
          Ct({
            visible: !1,
            indicatorName: "",
            paneId: "",
            calcParams: []
          });
        },
        onConfirm: (o) => {
          const i = z1();
          t == null || t.overrideIndicator({
            name: i.indicatorName,
            calcParams: o
          }, i.paneId);
          const l = i.paneId === "candle_pane" ? "main" : "sub";
          qe(i.indicatorName, i.paneId, l, "change");
        }
      });
    }
  }), L(J, {
    get when() {
      return y1();
    },
    get children() {
      return L(Uf, {
        get locale() {
          return e.locale;
        },
        onIndicatorClick: () => {
          X(!0);
        },
        onTimezoneClick: () => {
          V(!0);
        },
        onSettingClick: () => {
          Ce(!0);
        },
        onClose: () => {
          l1(!1);
        }
      });
    }
  })];
};
Qe(["mousedown", "click", "mousemove"]);
const vy = /* @__PURE__ */ $('<svg class="logo" viewBox="0 0 80 92"><path d="M28.148808359375,51.7280513671875L22.963588359375,51.7280513671875C21.572648359375002,51.7280513671875,20.445068359375,52.6220613671875,20.445068359375,53.7248813671875L20.445068359375,72.3979013671875C20.445068359375,73.5007013671875,21.572648359375002,74.39470136718751,22.963588359375,74.39470136718751L33.926568359375,74.39470136718751C35.317468359375,74.39470136718751,36.445068359375,73.5007013671875,36.445068359375,72.3979013671875L36.445068359375,53.7248813671875C36.445068359375,52.6220613671875,35.317468359375,51.7280513671875,33.926568359375,51.7280513671875L28.741398359374998,51.7280513671875L28.741398359374998,46.2963223671875C28.741398359374998,46.1665793671875,28.608748359375,46.0614013671875,28.445108359375,46.0614013671875C28.281468359375,46.0614013671875,28.148808359375,46.1665793671875,28.148808359375,46.2963223671875L28.148808359375,51.7280513671875ZM28.741398359374998,74.3948013671875L28.741398359374998,79.82650136718749C28.741398359374998,79.9563013671875,28.608748359375,80.0614013671875,28.445108359375,80.0614013671875C28.281468359375,80.0614013671875,28.148808359375,79.9563013671875,28.148808359375,79.82650136718749L28.148808359375,74.3948013671875L28.741398359374998,74.3948013671875Z"></path><path d="M51.148808359374996,44.7280513671875L45.963588359375,44.7280513671875C44.572648359375,44.7280513671875,43.445068359375,45.6220613671875,43.445068359375,46.7248813671875L43.445068359375,65.3979013671875C43.445068359375,66.5007013671875,44.572648359375,67.39470136718751,45.963588359375,67.39470136718751L56.926568359375,67.39470136718751C58.317468359375,67.39470136718751,59.445068359375,66.5007013671875,59.445068359375,65.3979013671875L59.445068359375,46.7248813671875C59.445068359375,45.6220613671875,58.317468359375,44.7280513671875,56.926568359375,44.7280513671875L51.741398359375,44.7280513671875L51.741398359375,39.2963223671875C51.741398359375,39.1665793671875,51.608748359375,39.0614013671875,51.445108359375,39.0614013671875C51.281468359375,39.0614013671875,51.148808359374996,39.1665793671875,51.148808359374996,39.2963223671875L51.148808359374996,44.7280513671875ZM51.741398359375,67.3948013671875L51.741398359375,72.82650136718749C51.741398359375,72.9563013671875,51.608748359375,73.0614013671875,51.445108359375,73.0614013671875C51.281468359375,73.0614013671875,51.148808359374996,72.9563013671875,51.148808359374996,72.82650136718749L51.148808359374996,67.3948013671875L51.741398359375,67.3948013671875Z"></path><path d="M17.7274,90.6541C17.5901,90.6541,17.4517,90.6436,17.3121,90.6225C9.93219,89.5095,4.80718,86.7136,2.07787,82.3084C-1.1223,77.1437,0.241766,71.6314,0.56829,70.5137C5.37624,46.647,15.0785,38.4945,21.5025,33.0957C22.9683,31.8633,24.2342,30.7995,25.1676,29.7672C25.4105,29.4984,25.6051,29.2154,25.7556,28.9202C24.7465,29.2231,24.1971,29.4326,24.1703,29.4429C22.908,29.9368,21.4777,29.3247,20.9761,28.076C20.4756,26.8272,21.0897,25.4146,22.352,24.9172C22.5042,24.8571,23.5312,24.4607,25.3073,23.9616C24.087,21.4425,21.7693,18.7949,19.7125,16.6431L19.2819,16.1902C16.2438,12.9776,14.6017,4.80159,14.3036,3.19471C14.1306,2.26212,14.4636,1.30796,15.1814,0.679657C15.8995,0.0512175,16.8976,-0.159672,17.8125,0.123747C22.7731,1.66274,24.2638,1.81255,27.2321,2.11098C28.7357,2.26195,29.83,3.59029,29.6762,5.07662C29.5236,6.56295,28.182,7.64786,26.6784,7.49454C24.4992,7.27569,22.9517,7.09896,20.724,6.56646C21.4493,9.09088,22.3803,11.5427,23.2771,12.4919L23.6876,12.9237C25.3757,14.69,28.9691,18.45,30.7016,22.7299C35.0392,21.9433,40.8791,21.3359,47.7817,21.7249C48.2004,20.7386,48.8054,19.7953,49.5907,18.9135C49.7137,18.7754,49.8498,18.6502,49.9988,18.539C53.6142,15.8508,57.5491,12.857,59.7803,11.0758C58.1028,11.2502,56.1034,11.0278,53.9124,9.70882C53.2439,9.30622,52.5992,8.89427,51.9662,8.48933C48.4668,6.25164,46.497,5.12109,43.4234,5.94853C41.9647,6.34058,40.4622,5.48975,40.0659,4.04789C39.6695,2.60604,40.5296,1.11853,41.9871,0.726471C47.5602,-0.773825,51.4796,1.73271,54.9364,3.9434L54.9364,3.9434C55.5284,4.32176,56.1318,4.70797,56.7564,5.08482C58.3843,6.06556,59.4858,5.76127,61.2899,5.13865C62.3511,4.77234,63.5567,4.35687,64.8675,4.53476C66.3321,4.73254,67.4406,5.56933,67.9103,6.83096C68.7444,9.07333,67.1035,11.5533,65.5797,13.2374C64.6729,14.2394,60.0845,17.7606,56.4519,20.4957C56.9477,20.3369,57.4767,20.2511,58.026,20.2511C59.4281,20.2511,60.6982,20.8102,61.621,21.7153C65.4948,20.6901,67.87,17.9563,67.9033,17.9175C68.78,16.8888,70.3322,16.7577,71.3721,17.6226C72.412,18.4886,72.5457,20.0253,71.6702,21.054C71.5221,21.2286,69.5063,23.5492,66.0787,25.233C69.5399,26.8822,72.9993,29.682,74.1841,34.4145C74.5106,35.7206,73.7062,37.0407,72.3859,37.3638C72.1871,37.4117,71.9884,37.4351,71.792,37.4351C70.687,37.4351,69.6826,36.6932,69.4046,35.5848C68.4378,31.7217,64.8144,29.7431,61.7619,28.7456C60.8298,29.7349,59.5009,30.3535,58.026,30.3535C55.8642,30.3535,54.0162,29.0245,53.2713,27.1474C53.2022,27.138,53.1331,27.1287,53.0642,27.1195C54.232,29.5936,57.0851,31.9259,58.1868,32.665C58.3157,32.7516,58.4423,32.8523,58.5547,32.9599C66.5865,40.6151,72.4887,48.8133,76.0971,57.3287C76.6815,58.7074,76.0249,60.2932,74.6313,60.8702C74.2976,61.01,73.9388,61.082,73.576,61.082C72.5065,61.082,71.4914,60.4582,71.0525,59.4213C67.7577,51.6455,62.331,44.1074,54.9203,37.0116C53.6073,36.1009,48.0984,31.9917,47.2065,26.583C40.9421,26.2679,35.6187,26.8278,31.6725,27.5336C31.6197,29.527,30.9225,31.5172,29.2456,33.3731C28.0614,34.6827,26.5968,35.915,25.0446,37.2188C21.9414,39.8269,18.2648,42.9169,14.8104,48.1192C11.356,53.3215,8.12389,60.6361,5.9098,71.6934C5.88732,71.8035,5.85893,71.9123,5.82344,72.0188C5.81634,72.041,4.57886,76.0413,6.77344,79.5289C8.6332,82.4828,12.4557,84.4139,18.1367,85.2705C19.6297,85.4953,20.6566,86.8762,20.4295,88.3532C20.2213,89.6944,19.0559,90.6541,17.7274,90.6541ZM35.1195,7.03101C33.3502,7.03101,31.9158,5.61208,31.9158,3.86173C31.9158,2.11139,33.3502,0.69245,35.1195,0.69245C36.8889,0.69245,38.3233,2.11139,38.3233,3.86173C38.3233,5.61208,36.8889,7.03101,35.1195,7.03101ZM57.6848,23.1892L58.414,24.4754C58.8984,24.3623,59.3923,24.3435,59.8644,24.4203C60.2191,24.5005,60.5087,24.7182,60.6663,25.0229C60.8636,25.3394,60.8993,25.7346,60.7646,26.1094C60.5988,26.5176,60.2972,26.8749,59.9085,27.1235L60.31,27.8316L59.7886,28.1294L59.3994,27.443C58.9257,27.7175,58.399,27.883,57.8664,27.9247L57.3744,27.0569C57.6378,27.0741,57.9071,27.048,58.1704,26.9797C58.4501,26.9251,58.7239,26.8323,58.9829,26.7044L58.2801,25.4647C57.8047,25.5877,57.3167,25.6065,56.8549,25.5197C56.4913,25.4263,56.196,25.1971,56.0328,24.8814C55.8433,24.5561,55.8127,24.1572,55.9484,23.7789C56.088,23.373,56.3763,23.0149,56.7584,22.7726L56.4166,22.1699L56.938,21.8721L57.2727,22.4625C57.6615,22.2376,58.0888,22.0901,58.5254,22.0301L59.0042,22.8746C58.5548,22.8828,58.103,22.9906,57.6848,23.1892ZM56.9319,24.2961Q57.1278,24.6417,57.7863,24.5856L57.1695,23.4978Q56.6982,23.884,56.9319,24.2961ZM58.9077,25.3462L59.4981,26.3875L59.499,26.3891Q59.9965,26.0045,59.7628,25.5923Q59.573,25.2576,58.9077,25.3462ZM73.2212,66.5065C73.2212,68.2569,74.6555,69.6758,76.4249,69.6758C78.1943,69.6758,79.6286,68.2569,79.6286,66.5065C79.6286,64.7562,78.1943,63.3372,76.4249,63.3372C74.6555,63.3372,73.2212,64.7562,73.2212,66.5065ZM35.9465,91.8045C35.0734,91.8045,34.2038,91.7987,33.3378,91.7858C31.827,91.7636,30.6203,90.5359,30.6428,89.0402C30.6653,87.5457,31.9158,86.3297,33.4183,86.3742C49.6344,86.6059,65.7512,84.6175,67.6134,84.037C72.1953,82.4184,74.5295,79.3603,74.5295,74.9575C74.5295,73.463,75.754,72.2517,77.2648,72.2517C78.7755,72.2517,80,73.463,80,74.9575C80,81.5992,76.148,86.7686,69.4317,89.142C67.0041,89.9999,51.0955,91.8046,35.9465,91.8045ZM25.2731,92C23.5037,92,22.0693,90.5811,22.0693,88.8307C22.0693,87.0804,23.5037,85.6615,25.2731,85.6615C27.0424,85.6615,28.4768,87.0804,28.4768,88.8307C28.4768,90.5811,27.0424,92,25.2731,92Z"></path></svg>'), Cy = vy.cloneNode(!0);
class xy {
  constructor(n) {
    ut(this, "_chartApi", null);
    if (le.isString(n.container)) {
      if (this._container = document.getElementById(n.container), !this._container)
        throw new Error("Container is null");
    } else
      this._container = n.container;
    this._container.classList.add("klinecharts-pro"), this._container.setAttribute("data-theme", n.theme ?? "light");
    const t = this;
    i5(() => L(py, {
      ref: (r) => {
        t._chartApi = r;
      },
      get styles() {
        return n.styles ?? {};
      },
      get watermark() {
        return n.watermark ?? Cy;
      },
      get theme() {
        return n.theme ?? "light";
      },
      get locale() {
        return n.locale ?? "zh-CN";
      },
      get drawingBarVisible() {
        return n.drawingBarVisible ?? (typeof window < "u" && window.innerWidth > 768);
      },
      get symbol() {
        return n.symbol;
      },
      get period() {
        return n.period;
      },
      get periods() {
        return n.periods ?? [{
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
        return n.timezone ?? "Asia/Shanghai";
      },
      get mainIndicators() {
        return n.mainIndicators ?? ["MA"];
      },
      get subIndicators() {
        return n.subIndicators ?? ["VOL"];
      },
      get datafeed() {
        return n.datafeed;
      },
      get onIndicatorChange() {
        return n.onIndicatorChange;
      },
      get onMobilePeriodClick() {
        return n.onMobilePeriodClick;
      },
      get onMobileMoreClick() {
        return n.onMobileMoreClick;
      },
      get screenshotBackgroundColor() {
        return n.screenshotBackgroundColor;
      },
      get chartViewToggle() {
        return n.chartViewToggle;
      },
      get indicatorTooltipIconStyles() {
        return n.indicatorTooltipIconStyles ?? {};
      },
      get orderTools() {
        return n.orderTools ?? {
          visible: !1,
          quickOrder: !0,
          quickOrderFloatingWindow: !0,
          quickOrderPlusButton: !0,
          openOrders: !0,
          openOrdersExtendedPriceLine: !0,
          openOrdersDisplay: "right",
          positions: !0,
          breakevenPrice: !0,
          liquidationPrice: !0,
          priceLine: !0,
          marketPriceLine: !0,
          countDown: !0,
          bidAskPrice: !0,
          orderHistory: !0
        };
      }
    }), this._container);
  }
  // Drawing methods
  createOverlay(n) {
    var t, r;
    return ((r = (t = this._chartApi) == null ? void 0 : t.createOverlay) == null ? void 0 : r.call(t, n)) ?? null;
  }
  removeOverlay(n) {
    var t, r;
    (r = (t = this._chartApi) == null ? void 0 : t.removeOverlay) == null || r.call(t, n);
  }
  removeAllOverlay() {
    var n, t;
    (t = (n = this._chartApi) == null ? void 0 : n.removeAllOverlay) == null || t.call(n);
  }
  getAllOverlay() {
    var n, t;
    return ((t = (n = this._chartApi) == null ? void 0 : n.getAllOverlay) == null ? void 0 : t.call(n)) || [];
  }
  getOverlay(n) {
    var t, r;
    return ((r = (t = this._chartApi) == null ? void 0 : t.getOverlay) == null ? void 0 : r.call(t, n)) ?? null;
  }
  overrideOverlay(n) {
    var t, r;
    (r = (t = this._chartApi) == null ? void 0 : t.overrideOverlay) == null || r.call(t, n);
  }
  // Utility methods
  dispose() {
    var n, t;
    (t = (n = this._chartApi) == null ? void 0 : n.dispose) == null || t.call(n);
  }
  resize() {
    var n, t;
    (t = (n = this._chartApi) == null ? void 0 : n.resize) == null || t.call(n);
  }
  getMainIndicators() {
    return this._chartApi.getMainIndicators();
  }
  overrideIndicator(n, t) {
    const r = this._chartApi;
    r && typeof r.overrideIndicator == "function" ? r.overrideIndicator(n, t) : console.warn("overrideIndicator method not available on chart API");
  }
  setMainIndicators(n) {
    return this._chartApi.setMainIndicators(n);
  }
  getSubIndicators() {
    return this._chartApi.getSubIndicators();
  }
  setSubIndicators(n) {
    return this._chartApi.setSubIndicators(n);
  }
  setTheme(n) {
    var t;
    (t = this._container) == null || t.setAttribute("data-theme", n), this._chartApi.setTheme(n);
  }
  getTheme() {
    return this._chartApi.getTheme();
  }
  setStyles(n) {
    this._chartApi.setStyles(n);
  }
  getStyles() {
    return this._chartApi.getStyles();
  }
  setLocale(n) {
    this._chartApi.setLocale(n);
  }
  getLocale() {
    return this._chartApi.getLocale();
  }
  setTimezone(n) {
    this._chartApi.setTimezone(n);
  }
  getTimezone() {
    return this._chartApi.getTimezone();
  }
  setSymbol(n) {
    this._chartApi.setSymbol(n);
  }
  getSymbol() {
    return this._chartApi.getSymbol();
  }
  setPeriod(n) {
    this._chartApi.setPeriod(n);
  }
  getPeriod() {
    return this._chartApi.getPeriod();
  }
  getSettings() {
    return this._chartApi.getSettings();
  }
  setSettings(n) {
    this._chartApi.setSettings(n);
  }
  resetSettings() {
    this._chartApi.resetSettings();
  }
  saveDrawings(n) {
    var t, r;
    (r = (t = this._chartApi) == null ? void 0 : t.saveDrawings) == null || r.call(t, n);
  }
  loadDrawings(n) {
    var t, r;
    (r = (t = this._chartApi) == null ? void 0 : t.loadDrawings) == null || r.call(t, n);
  }
  getDrawings(n) {
    var t, r;
    return ((r = (t = this._chartApi) == null ? void 0 : t.getDrawings) == null ? void 0 : r.call(t, n)) || [];
  }
  clearDrawings(n) {
    var t, r;
    (r = (t = this._chartApi) == null ? void 0 : t.clearDrawings) == null || r.call(t, n);
  }
  enableAutoSave(n, t = !0) {
    var r, a;
    (a = (r = this._chartApi) == null ? void 0 : r.enableAutoSave) == null || a.call(r, n, t);
  }
  setIndicatorModalVisible(n) {
    var t, r;
    (r = (t = this._chartApi) == null ? void 0 : t.setIndicatorModalVisible) == null || r.call(t, n);
  }
  setTimezoneModalVisible(n) {
    var t, r;
    (r = (t = this._chartApi) == null ? void 0 : t.setTimezoneModalVisible) == null || r.call(t, n);
  }
  setSettingModalVisible(n) {
    var t, r;
    (r = (t = this._chartApi) == null ? void 0 : t.setSettingModalVisible) == null || r.call(t, n);
  }
  getOrderToolsState() {
    var n, t;
    return ((t = (n = this._chartApi) == null ? void 0 : n.getOrderToolsState) == null ? void 0 : t.call(n)) ?? {
      quickOrder: !0,
      quickOrderFloatingWindow: !0,
      quickOrderPlusButton: !0,
      openOrders: !0,
      openOrdersExtendedPriceLine: !0,
      openOrdersDisplay: "right",
      positions: !0,
      breakevenPrice: !0,
      liquidationPrice: !0,
      priceLine: !0,
      marketPriceLine: !0,
      countDown: !0,
      bidAskPrice: !0,
      orderHistory: !0
    };
  }
  setOrderToolsState(n) {
    var t, r;
    (r = (t = this._chartApi) == null ? void 0 : t.setOrderToolsState) == null || r.call(t, n);
  }
  // Forwarded klinecharts chart methods for synchronizing DOM overlays
  // with the canvas (price/pixel conversion, visible-range, data, actions).
  convertToPixel(n, t) {
    return this._chartApi.convertToPixel(n, t);
  }
  convertFromPixel(n, t) {
    return this._chartApi.convertFromPixel(n, t);
  }
  getVisibleRange() {
    return this._chartApi.getVisibleRange();
  }
  getDataList() {
    var n, t;
    return ((t = (n = this._chartApi) == null ? void 0 : n.getDataList) == null ? void 0 : t.call(n)) ?? [];
  }
  getSize(n, t) {
    var r, a;
    return ((a = (r = this._chartApi) == null ? void 0 : r.getSize) == null ? void 0 : a.call(r, n, t)) ?? null;
  }
  getDom(n, t) {
    var r, a;
    return ((a = (r = this._chartApi) == null ? void 0 : r.getDom) == null ? void 0 : a.call(r, n, t)) ?? null;
  }
  subscribeAction(n, t) {
    var r, a;
    (a = (r = this._chartApi) == null ? void 0 : r.subscribeAction) == null || a.call(r, n, t);
  }
  unsubscribeAction(n, t) {
    var r, a;
    (a = (r = this._chartApi) == null ? void 0 : r.unsubscribeAction) == null || a.call(r, n, t);
  }
}
Z9.forEach((e) => {
  A9(e);
});
export {
  _y as DefaultDatafeed,
  xy as KLineChartPro,
  ky as loadLocales
};
//# sourceMappingURL=klinecharts-pro.js.map
