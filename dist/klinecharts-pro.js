var m9 = Object.defineProperty;
var p9 = (e, t, n) => t in e ? m9(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ut = (e, t, n) => (p9(e, typeof t != "symbol" ? t + "" : t, n), n);
import { utils as le, OverlayMode as c0, ActionType as T1, LineType as o1, init as C9, FormatDateType as Pt, DomPosition as Ot, dispose as In, TooltipIconPosition as Dt, CandleType as v9, YAxisType as b9, registerOverlay as $9 } from "klinecharts";
function ft(e, t, n) {
  const r = (e.x - t.x) * Math.cos(n) - (e.y - t.y) * Math.sin(n) + t.x, i = (e.x - t.x) * Math.sin(n) + (e.y - t.y) * Math.cos(n) + t.y;
  return { x: r, y: i };
}
function g0(e, t) {
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
      y: le.getLinearYFromCoordinates(e[0], e[1], { x: 0, y: e[0].y })
    } : n = {
      x: t.width,
      y: le.getLinearYFromCoordinates(e[0], e[1], { x: t.width, y: e[0].y })
    }, { coordinates: [e[0], n] };
  }
  return [];
}
function kr(e, t) {
  const n = Math.abs(e.x - t.x), r = Math.abs(e.y - t.y);
  return Math.sqrt(n * n + r * r);
}
const _9 = {
  name: "arrow",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = e[1].x > e[0].x ? 0 : 1, n = le.getLinearSlopeIntercept(e[0], e[1]);
      let r;
      n ? r = Math.atan(n[0]) + Math.PI * t : e[1].y > e[0].y ? r = Math.PI / 2 : r = Math.PI / 2 * 3;
      const i = ft({ x: e[1].x - 8, y: e[1].y + 4 }, e[1], r), s = ft({ x: e[1].x - 8, y: e[1].y - 4 }, e[1], r);
      return [
        {
          type: "line",
          attrs: { coordinates: e }
        },
        {
          type: "line",
          ignoreEvent: !0,
          attrs: { coordinates: [i, e[1], s] }
        }
      ];
    }
    return [];
  }
}, k9 = {
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
      const t = kr(e[0], e[1]);
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
}, x9 = {
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
}, L9 = {
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
}, A9 = {
  name: "fibonacciCircle",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = Math.abs(e[0].x - e[1].x), n = Math.abs(e[0].y - e[1].y), r = Math.sqrt(t * t + n * n), i = [0.236, 0.382, 0.5, 0.618, 0.786, 1], s = [], d = [];
      return i.forEach((u) => {
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
}, M9 = {
  name: "fibonacciSegment",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: n }) => {
    const r = [], i = [];
    if (e.length > 1) {
      const s = e[1].x > e[0].x ? e[0].x : e[1].x, d = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0], u = e[0].y - e[1].y, m = t.points, k = m[0].value - m[1].value;
      d.forEach((g) => {
        const M = e[1].y + u * g, L = (m[1].value + k * g).toFixed(n.price);
        r.push({ coordinates: [{ x: e[0].x, y: M }, { x: e[1].x, y: M }] }), i.push({
          x: s,
          y: M,
          text: `${L} (${(g * 100).toFixed(1)}%)`,
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
        attrs: i
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
      const n = kr(e[0], e[1]) / Math.sqrt(24), r = e[1].x > e[0].x ? 0 : 1, i = le.getLinearSlopeIntercept(e[0], e[1]);
      let s;
      i ? s = Math.atan(i[0]) + Math.PI * r : e[1].y > e[0].y ? s = Math.PI / 2 : s = Math.PI / 2 * 3;
      const d = ft(
        { x: e[0].x - n, y: e[0].y },
        e[0],
        s
      ), u = ft(
        { x: e[0].x - n, y: e[0].y - n },
        e[0],
        s
      ), m = [{
        ...d,
        r: n,
        startAngle: s,
        endAngle: s + Math.PI / 2
      }, {
        ...u,
        r: n * 2,
        startAngle: s + Math.PI / 2,
        endAngle: s + Math.PI
      }];
      let k = e[0].x - n, g = e[0].y - n;
      for (let M = 2; M < 9; M++) {
        const L = m[M - 2].r + m[M - 1].r;
        let O = 0;
        switch (M % 4) {
          case 0: {
            O = s, k -= m[M - 2].r;
            break;
          }
          case 1: {
            O = s + Math.PI / 2, g -= m[M - 2].r;
            break;
          }
          case 2: {
            O = s + Math.PI, k += m[M - 2].r;
            break;
          }
          case 3: {
            O = s + Math.PI / 2 * 3, g += m[M - 2].r;
            break;
          }
        }
        const w = O + Math.PI / 2, D = ft({ x: k, y: g }, e[0], s);
        m.push({
          ...D,
          r: L,
          startAngle: O,
          endAngle: w
        });
      }
      return [
        {
          type: "arc",
          attrs: m
        },
        {
          type: "line",
          attrs: g0(e, t)
        }
      ];
    }
    return [];
  }
}, S9 = {
  name: "fibonacciSpeedResistanceFan",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, bounding: t }) => {
    const n = [];
    let r = [];
    const i = [];
    if (e.length > 1) {
      const s = e[1].x > e[0].x ? -38 : 4, d = e[1].y > e[0].y ? -2 : 20, u = e[1].x - e[0].x, m = e[1].y - e[0].y;
      [1, 0.75, 0.618, 0.5, 0.382, 0.25, 0].forEach((g) => {
        const M = e[1].x - u * g, L = e[1].y - m * g;
        n.push({ coordinates: [{ x: M, y: e[0].y }, { x: M, y: e[1].y }] }), n.push({ coordinates: [{ x: e[0].x, y: L }, { x: e[1].x, y: L }] }), r = r.concat(g0([e[0], { x: M, y: e[1].y }], t)), r = r.concat(g0([e[0], { x: e[1].x, y: L }], t)), i.unshift({
          x: e[0].x + s,
          y: L + 10,
          text: `${g.toFixed(3)}`
        }), i.unshift({
          x: M - 18,
          y: e[0].y + d,
          text: `${g.toFixed(3)}`
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
        attrs: i
      }
    ];
  }
}, P9 = {
  name: "fibonacciExtension",
  totalStep: 4,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: n }) => {
    const r = [], i = [];
    if (e.length > 2) {
      const s = t.points, d = s[1].value - s[0].value, u = e[1].y - e[0].y, m = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1], k = e[2].x > e[1].x ? e[1].x : e[2].x;
      m.forEach((g) => {
        const M = e[2].y + u * g, L = (s[2].value + d * g).toFixed(n.price);
        r.push({ coordinates: [{ x: e[1].x, y: M }, { x: e[2].x, y: M }] }), i.push({
          x: k,
          y: M,
          text: `${L} (${(g * 100).toFixed(1)}%)`,
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
        attrs: i
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
      ], i = [
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
          attrs: i
        }
      ];
    }
    return [];
  }
}, D9 = {
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
}, N9 = {
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
}, I9 = {
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
}, E9 = {
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
}, B9 = {
  name: "abcd",
  totalStep: 5,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    let t = [], n = [];
    const r = ["A", "B", "C", "D"], i = e.map((s, d) => ({
      ...s,
      baseline: "bottom",
      text: `(${r[d]})`
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
        attrs: i
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
    const n = [], r = [], i = ["X", "A", "B", "C", "D"], s = e.map((d, u) => ({
      ...d,
      baseline: "bottom",
      text: `(${i[u]})`
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
}, U9 = [
  _9,
  k9,
  x9,
  w9,
  L9,
  A9,
  M9,
  T9,
  S9,
  P9,
  O9,
  D9,
  N9,
  I9,
  E9,
  B9,
  F9
];
class fy {
  constructor(t) {
    ut(this, "_apiKey");
    ut(this, "_prevSymbolMarket");
    ut(this, "_ws");
    this._apiKey = t;
  }
  async searchSymbols(t) {
    return await ((await (await fetch(`https://api.polygon.io/v3/reference/tickers?apiKey=${this._apiKey}&active=true&search=${t ?? ""}`)).json()).results || []).map((i) => ({
      ticker: i.ticker,
      name: i.name,
      shortName: i.ticker,
      market: i.market,
      exchange: i.primary_exchange,
      priceCurrency: i.currency_name,
      type: i.type,
      logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAA66SURBVHic7Z17cFTVGcB/527AiKGgRA0ShGhKoQjFMb4qUMCMPIrWqdbHSEdlHDGgI9V2aq2d1hmKtVbRsSTGEcQRp4pStaZQlNYUwYLiSKU0SCMBDRCmoQSJGGF3T/84d2VZk+w9d899hf3NMBnl3ns+5vtyHt/5HoIehpQIaijDYjiSciRlwCCgBCgG+gNFQCGCAvUScaADaAfagFagBdiFoAlBI0m2UkWTEMgA/lmeIYIWIFdkLQNJMBbBJUjOA8agFOwF7cAmBO8hWUeMtWIWezwayxciZwByGb1pZTyCaUguA0YGLNIWBK8jWUExa8Q1HA5YHi0iYQByGTH2UYnkBmA6cHLQMnXBfqAOwXMMYLW4hkTQAmUj1AYgqzkLuAXBTUgGBi2PFoI9SJYAT4nZbA9anK4IpQHIhUzE4i4k04OWxQiCOpI8IubwZtCiZBIqA5A1TEdyH3Bh0LJ4xAYE80QVdUELkiIUBiCf4FIk85FcELQsviB4B8G94jb+GrwoASKfZBgJHkUyNUg5AkOwkhhzxa1sC06EAJALKUJwL3A30DsIGULEYeBhJPPFHNr9Htx3A5A1TECyGCjze+yQ04Rgpqii3s9BfTMAWUsfksxD8iO/xowkggVY3Cdmccif4XxAPskw4rwCjPBjvB5AAwVc6cfewPJ6AFnNzcTZSF75OowgzkZZzc1eD+SZAUiJkNX8FlgM9PVqnB5MX2CxrOa3Uno3U3vyYVlLPxIshR7iyQueOmLMELM4YPrDxg1A1jKQJKuQjDL97eMawWYsJpu+fjZqAPL3DMFiNVBu8rt5vqSRJJXidnaa+qAxA5CPU0aMvwFDTX0zT6fsIMEkcQdNJj5mxADs3/x68sr3ix0kmWBiJsjZAOyQrDXkp32/aSTG+Fz3BDkZgKylH0neym/4AkJtDMflcjpw7QeQEkGCpXnlB4hkFAmW5uIncO8IquFB8uf8MDDd1oUrXFmO7aJc7HbQPJ4wU8zmad2XtA3AvtjZSN69GzYOUkCF7gWSlgHIWvqQyF/shJgGYlToXCXr7QGSzCOv/DAzwtaRYxzPAHYkT+jCmvN0gmCi08giRwZgx/B9QD6MKyo0IRntJMbQ2RKgAjjzyo8OZbbOspJ1BrB3/ZvJR+9GjcMUMCrbqSD7DJDgUfLKjyK9bd11S7czgHyCS0my2pxMIaHvUCgshl5FUFQKQtWJ4FALHGmHz5rhizY43BaomEawqOwuA6mg25cl840L5DexQiithNMvhNMvglMr4IT+zt5t3QS762H332FXfTQNQumwy1zLLmcAO1HzNU+E8oNTK+AbN8KwGc4V3h3JODS9Av98GPauz/17fiK4vKuE1K4NoJr1RDFLd+BY+PYCOK3CuzH2rof3fg07Q5Pkm40NYjYXdfYXnRqAXMhEBH/zVibDFBbDRQ/AiFv8G3PbUlhTpfYNYUcyqbP6BJ2fAizu8lwgkwwcC9c3+Kt8UMvLtZuhZKy/47qhC51+ZQawy7J85LlApjhjAkx7Te3ogyIZhz9PhebQH5jOzixX09kM4POvUQ6cdTVc/kawygewCmDKy2omCjdf0e0xM4BdjeuTSBRk6jtUTb9BKz+djlZ4eRy0bQ1aks4R7GEAg9Orlx07A6hSbOFXPsCkp8OlfFAb0UnaQTn+IRnIPirT/1dBxgM3+CqQW0beptZ+NyTj0LIW9m6A//0L2puP/l1RKXytHAZ9RzmNYoX63z/9IrU53LbUnXxeo3S8KvWfXy4BdgXOFsJbhFFhFcAPP4E+JXrvJeOw+TH44NFjld4VfUrg3Htg5Cx9QzjUAn8YEVbP4X6KKUlVND26BLQynrArH9TGT1f5h1pg+fnw9o+dKT/1zrq58MeL4UCj3nh9StQsFU5OtnUNpBuAYFog4ugy5Lt6z3/RBq9OVH59N7RuUu93tOq9N3KWu/H8IE3XRw1AFV4OP2dO0Xt+4/2578o/a1YePx36DoXiMbmN6xVpurbAzu8Lvup2dgqL1R+nHGmHLU+YGfujl/RnkUGV2Z8JhpG2zu0ZIEHoPRgA9NPMP21eDYkOc+M3LNJ7/rTzzI1tGlvnygAElwQqjFPc7MZNouvq1TVYP7F1rgxAddrIkw3dvYTOcuU3ts4L7B47Id2tZHBwh97zXvwGNr4AfU539uyhvebHN8cYKREiUrd/sUK49XPnzyfj8FyZ87P/8cfZFhbDg5bCMYkOdSRzilUAFz/knTxRx2K4hYxYaZcdmmFY5ddBxa88ESXySMotu69edNi+XP+d838Jlz4bvtvDoJGUWaimitFhz1p3a/qwGXBdg/qZJ8UgC9VRMzokOuDdX7h7t6hUzQTX2fGDbq57exYlQlbzb6KY83/1uyr2PxeOtKtY/w+fUQkgybgJyaJEg5DV7IaIRAGlc8o58P1/mFvXj7SrOP+df4aP/6J/+xdN9ghZzadEtd7PmVNg6mvquGeSZFzNCB8th8bnwxrYYYKDQlZzGOgVtCSuGXELjK8xbwQpEh3KCLbURi8lLDtHhKwhiYcNCXzhzClw2YveH/N218O796ufPQGB7BkGANB/OEx9Wf30mubV8NYd4Q3/dopAWkh6xta3bSssO1clbZqMAeiM0kq45n3lYfRq6fEDSTzam8Cu6FcOYx/XDx9zw+56eON687EH/nDQAv+7VXrOgUaVq/fyOHXO9/J8f8YE+N6b4Q7+6Jr26DqCdOhXDufcrgpGmCgW0RmHWuCVcfoh5MHSIGQ1a4BxQUviC7FCtSycdRUMmW7eGNq2wkvnR6NegOItIatZBvwgaEl8xypQ03f5tcooTio1892ddbDicjPf8p4XC4BdQUsRCMm4Os6lAj1PrYCzr1bLhG7mUTpDpsM3boIPl5iQ0mt2WQgz3aciz383wvp74NnBsOoH7jOJAC5ZAL092muYRNBkIYjUrsVzknHY/hK8eK77490J/WH0XPOymUbQaJEk4u4sD2l8Hl4YBZ+syv5sJqPmhN9JlGSrRRVN9ERfgCk6WmHlldCyTu+9wmL3NQz8oZ0qmiwhkEAOC95xQKIDVl2tf7wbPNkbecywSQikmqME7yFDnB/Yq0jVBXDK5y0qqMMkh1rgg8fgvJ87fyes2cGgdE6qRIxkHXBnkPJ0i27tnb3rzRsAKLeyjgGE2T2sdG7nBsZYG6gw2dD15Zty6mTy3416z+fiT/AaW+cWgN1/dkugAnXHZ816629RqXeJmTqZSeGNOt6S6jmcXiLm9cDEcYLuJcsQj5qanhji32qnpOk6vUTMikCEcYru9DvMg4p3/cr1zvY6s4WfpOn6qAEUswbYH4Q8jtB1xpRWmp8Fvq6ZVfTpDrPjm2G/rWsgzQDsunHhLYD/8V9UxS8dxj1ubiN2UimMuVvvnX2hdK/UpWoEQmapWMFzvovjlCPt+jV6+g5V0Tp9h+Y2dp8SuMJFUeqPXbiQvSZDx8cawABWI9TuMJS8/xv9jJ3+w1VR6dFz3fnmB09RGUi60cZftIWvfLwqFn2MUMcYgLiGBJIlvgqlQ0crvP0T/fd6Fakr2hv3qJ+Dp3R/TDzlHPjmbXDVuzB9pbsZpGGR99HJukiWpFcKh6g2jJhWp18xtDMOtSglpa58+5QcbSeXC+3N6hYxfCllX2kY0XnPoBpeQ+LRQdoAJ5Wq7OCwetpWXB6+hlKCOlHFV2LVOu8ZlOQRzwXKhc+aVf3eMMbiNywKn/KhS51Gu21c/+Fqlx+WmWD7cnjjujDWGeiybVzXvYMF8zwTxxRtW1Usfi7xe6b48JmwKr9bXXbfO7iGDUguMC+RYawCuGAefOtu/8OwjrSrjOF//s7fcZ0ieEdUdT2Td9893GEP+sBJxlVE7/Mj1J29XzS9qnb7YVU+ZNVh1rRwWcMKJFPNSeQDp5yjHD/l15qvGZDoUEbWsCh8jp5MBCtFVfeNQLIbwJMMI85moLcxwfwilQo2eLJq5uQ2ROuLNnUbuX05/CcyJWMOU8AocSvbunvIUWEIWc184GdGxAqSXkWqzWvxGCgcoJw+J2Y4flI3eAd3qq5i+zZFLeEzxQNidvYl3JkBLKQIwQcQsaqixy9NSEaLOdnD/bvfBNqIObQjmJm7XHl8QTDTifLBoQEAiCrqESxwL1UeXxAsEFXUO33csQHYT98HNGiKlMc/GmwdOUa7Oph9KthIT6srFH0OUkBFtl1/JnozAGAPEN4kkuOXO3WVDy4MAEDM5mkg34ojPDxk60Qb1wUi7WZTf4IQxw0cH9RRxRV2kq82rmYAACGQxJiBYLPbb+TJEcFmYsxwq3zIwQAAxCwOYDEZ8lVGAqARi8liFgdy+UhOBgB2XmGSSmBHrt/K45gdJKlM5fflQs4GACBuZycJJpE3Aj/YQYJJ4nZ2mviYEQMAEHfQRJIJ5JcDL2kkyQRxh7nKbsbLxMtaBpJkFZJRpr99XCPYbK/5RhN3jM0AKcQs9mAxjjDnGUaPOizGmVY+eDADpLD9BA8CLlJ58qTxEFX8NJejXnd43ilEVnMz8Bj5uwNdDgJ3uvXwOcWXVjH2BdIr9PSy9OZooIAr3fj2dTG+B+gMcSvbiFGRjydwgGABMf1bPffD+YysYQKSxeTDyzJpQjBTJ5jDBL7MAOmIKuqRjAYegKOVKo5jDgMPIBntt/IhgBkgHfkkw0jwaOTyDkwhWEmMuX5N952LEALkE1yKZH4k0tBMIHgHwb3iNv4avCghQtYwHcl9hD0r2T0bEMwTVeFxkoXKAFLIhUzE4q5QF6nQQVBHkkfEHN4MWpRMQmkAKexyNbcguAkZsRb3gj12vaWnMsuyhIlQG0AKuYwY+6hEcgMqBO3koGXqgv1AHYLnGMDqzIJMYSQSBpCOXEZvWhmPYBqSy4CRAYu0BcHrSFZQzJr0IoxRIHIGkImsZSAJxiK4BMl5wBjAqz7y7cAmu8HGOmKs9eKGzk8ibwCZ2LeQZVgMR1KOpAwYBJQAxUB/lIEUIr5smBEHOlAKbgNagRZgF4ImBI0k2UoVTV7dygXF/wF+fTz59Jc5ygAAAABJRU5ErkJggg=="
    }));
  }
  async getHistoryKLineData(t, n, r, i) {
    return await ((await (await fetch(`https://api.polygon.io/v2/aggs/ticker/${t.ticker}/range/${n.multiplier}/${n.timespan}/${r}/${i}?apiKey=${this._apiKey}`)).json()).results || []).map((u) => ({
      timestamp: u.t,
      open: u.o,
      high: u.h,
      low: u.l,
      close: u.c,
      volume: u.v,
      turnover: u.vw
    }));
  }
  subscribe(t, n, r) {
    var i, s;
    this._prevSymbolMarket !== t.market ? ((i = this._ws) == null || i.close(), this._ws = new WebSocket(`wss://delayed.polygon.io/${t.market}`), this._ws.onopen = () => {
      var d;
      (d = this._ws) == null || d.send(JSON.stringify({ action: "auth", params: this._apiKey }));
    }, this._ws.onmessage = (d) => {
      var m;
      const u = JSON.parse(d.data);
      u[0].ev === "status" ? u[0].status === "auth_success" && ((m = this._ws) == null || m.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` }))) : "sym" in u && r({
        timestamp: u.s,
        open: u.o,
        high: u.h,
        low: u.l,
        close: u.c,
        volume: u.v,
        turnover: u.vw
      });
    }) : (s = this._ws) == null || s.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` })), this._prevSymbolMarket = t.market;
  }
  unsubscribe(t, n) {
  }
}
const Se = {};
function z9(e) {
  Se.context = e;
}
const K9 = (e, t) => e === t, m0 = Symbol("solid-proxy"), j9 = Symbol("solid-track"), zt = {
  equals: K9
};
let xr = Mr;
const f1 = 1, Kt = 2, Lr = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, u0 = {};
var ke = null;
let P1 = null, fe = null, Ne = null, d1 = null, L0 = 0;
function yt(e, t) {
  const n = fe, r = ke, i = e.length === 0, s = i ? Lr : {
    owned: null,
    cleanups: null,
    context: null,
    owner: t === void 0 ? r : t
  }, d = i ? e : () => e(() => h1(() => Gt(s)));
  ke = s, fe = null;
  try {
    return C1(d, !0);
  } finally {
    fe = n, ke = r;
  }
}
function T(e, t) {
  t = t ? Object.assign({}, zt, t) : zt;
  const n = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, r = (i) => (typeof i == "function" && (i = i(n.value)), Ar(n, i));
  return [wr.bind(n), r];
}
function En(e, t, n) {
  const r = Yt(e, t, !0, f1);
  Q1(r);
}
function I(e, t, n) {
  const r = Yt(e, t, !1, f1);
  Q1(r);
}
function Be(e, t, n) {
  xr = q9;
  const r = Yt(e, t, !1, f1);
  r.user = !0, d1 ? d1.push(r) : Q1(r);
}
function H(e, t, n) {
  n = n ? Object.assign({}, zt, n) : zt;
  const r = Yt(e, t, !0, 0);
  return r.observers = null, r.observerSlots = null, r.comparator = n.equals || void 0, Q1(r), wr.bind(r);
}
function Q9(e, t, n) {
  let r, i, s;
  arguments.length === 2 && typeof t == "object" || arguments.length === 1 ? (r = !0, i = e, s = t || {}) : (r = e, i = t, s = n || {});
  let d = null, u = u0, m = null, k = !1, g = "initialValue" in s, M = typeof r == "function" && H(r);
  const L = /* @__PURE__ */ new Set(), [O, w] = (s.storage || T)(s.initialValue), [D, B] = T(void 0), [W, q] = T(void 0, {
    equals: !1
  }), [F, R] = T(g ? "ready" : "unresolved");
  if (Se.context) {
    m = `${Se.context.id}${Se.context.count++}`;
    let Y;
    s.ssrLoadFrom === "initial" ? u = s.initialValue : Se.load && (Y = Se.load(m)) && (u = Y[0]);
  }
  function K(Y, ee, ae, te) {
    return d === Y && (d = null, g = !0, (Y === u || ee === u) && s.onHydrated && queueMicrotask(() => s.onHydrated(te, {
      value: ee
    })), u = u0, pe(ee, ae)), ee;
  }
  function pe(Y, ee) {
    C1(() => {
      ee === void 0 && w(() => Y), R(ee !== void 0 ? "errored" : "ready"), B(ee);
      for (const ae of L.keys())
        ae.decrement();
      L.clear();
    }, !1);
  }
  function be() {
    const Y = Z9, ee = O(), ae = D();
    if (ae !== void 0 && !d)
      throw ae;
    return fe && !fe.user && Y && En(() => {
      W(), d && (Y.resolved || L.has(Y) || (Y.increment(), L.add(Y)));
    }), ee;
  }
  function ie(Y = !0) {
    if (Y !== !1 && k)
      return;
    k = !1;
    const ee = M ? M() : r;
    if (ee == null || ee === !1) {
      K(d, h1(O));
      return;
    }
    const ae = u !== u0 ? u : h1(() => i(ee, {
      value: O(),
      refetching: Y
    }));
    return typeof ae != "object" || !(ae && "then" in ae) ? (K(d, ae, void 0, ee), ae) : (d = ae, k = !0, queueMicrotask(() => k = !1), C1(() => {
      R(g ? "refreshing" : "pending"), q();
    }, !1), ae.then((te) => K(ae, te, void 0, ee), (te) => K(ae, void 0, Sr(te), ee)));
  }
  return Object.defineProperties(be, {
    state: {
      get: () => F()
    },
    error: {
      get: () => D()
    },
    loading: {
      get() {
        const Y = F();
        return Y === "pending" || Y === "refreshing";
      }
    },
    latest: {
      get() {
        if (!g)
          return be();
        const Y = D();
        if (Y && !d)
          throw Y;
        return O();
      }
    }
  }), M ? En(() => ie(!1)) : ie(!1), [be, {
    refetch: ie,
    mutate: w
  }];
}
function h1(e) {
  if (fe === null)
    return e();
  const t = fe;
  fe = null;
  try {
    return e();
  } finally {
    fe = t;
  }
}
function w0(e) {
  Be(() => h1(e));
}
function D1(e) {
  return ke === null || (ke.cleanups === null ? ke.cleanups = [e] : ke.cleanups.push(e)), e;
}
function R9(e) {
  const t = fe, n = ke;
  return Promise.resolve().then(() => {
    fe = t, ke = n;
    let r;
    return C1(e, !1), fe = ke = null, r ? r.done : void 0;
  });
}
let Z9;
function wr() {
  const e = P1;
  if (this.sources && (this.state || e))
    if (this.state === f1 || e)
      Q1(this);
    else {
      const t = Ne;
      Ne = null, C1(() => Qt(this), !1), Ne = t;
    }
  if (fe) {
    const t = this.observers ? this.observers.length : 0;
    fe.sources ? (fe.sources.push(this), fe.sourceSlots.push(t)) : (fe.sources = [this], fe.sourceSlots = [t]), this.observers ? (this.observers.push(fe), this.observerSlots.push(fe.sources.length - 1)) : (this.observers = [fe], this.observerSlots = [fe.sources.length - 1]);
  }
  return this.value;
}
function Ar(e, t, n) {
  let r = e.value;
  return (!e.comparator || !e.comparator(r, t)) && (e.value = t, e.observers && e.observers.length && C1(() => {
    for (let i = 0; i < e.observers.length; i += 1) {
      const s = e.observers[i], d = P1 && P1.running;
      d && P1.disposed.has(s), (d && !s.tState || !d && !s.state) && (s.pure ? Ne.push(s) : d1.push(s), s.observers && Tr(s)), d || (s.state = f1);
    }
    if (Ne.length > 1e6)
      throw Ne = [], new Error();
  }, !1)), t;
}
function Q1(e) {
  if (!e.fn)
    return;
  Gt(e);
  const t = ke, n = fe, r = L0;
  fe = ke = e, V9(e, e.value, r), fe = n, ke = t;
}
function V9(e, t, n) {
  let r;
  try {
    r = e.fn(t);
  } catch (i) {
    e.pure && (e.state = f1, e.owned && e.owned.forEach(Gt), e.owned = null), Pr(i);
  }
  (!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && "observers" in e ? Ar(e, r) : e.value = r, e.updatedAt = n);
}
function Yt(e, t, n, r = f1, i) {
  const s = {
    fn: e,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: ke,
    context: null,
    pure: n
  };
  return ke === null || ke !== Lr && (ke.owned ? ke.owned.push(s) : ke.owned = [s]), s;
}
function jt(e) {
  const t = P1;
  if (e.state === 0 || t)
    return;
  if (e.state === Kt || t)
    return Qt(e);
  if (e.suspense && h1(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const n = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < L0); )
    (e.state || t) && n.push(e);
  for (let r = n.length - 1; r >= 0; r--)
    if (e = n[r], e.state === f1 || t)
      Q1(e);
    else if (e.state === Kt || t) {
      const i = Ne;
      Ne = null, C1(() => Qt(e, n[0]), !1), Ne = i;
    }
}
function C1(e, t) {
  if (Ne)
    return e();
  let n = !1;
  t || (Ne = []), d1 ? n = !0 : d1 = [], L0++;
  try {
    const r = e();
    return H9(n), r;
  } catch (r) {
    n || (d1 = null), Ne = null, Pr(r);
  }
}
function H9(e) {
  if (Ne && (Mr(Ne), Ne = null), e)
    return;
  const t = d1;
  d1 = null, t.length && C1(() => xr(t), !1);
}
function Mr(e) {
  for (let t = 0; t < e.length; t++)
    jt(e[t]);
}
function q9(e) {
  let t, n = 0;
  for (t = 0; t < e.length; t++) {
    const r = e[t];
    r.user ? e[n++] = r : jt(r);
  }
  for (Se.context && z9(), t = 0; t < n; t++)
    jt(e[t]);
}
function Qt(e, t) {
  const n = P1;
  e.state = 0;
  for (let r = 0; r < e.sources.length; r += 1) {
    const i = e.sources[r];
    i.sources && (i.state === f1 || n ? i !== t && jt(i) : (i.state === Kt || n) && Qt(i, t));
  }
}
function Tr(e) {
  const t = P1;
  for (let n = 0; n < e.observers.length; n += 1) {
    const r = e.observers[n];
    (!r.state || t) && (r.state = Kt, r.pure ? Ne.push(r) : d1.push(r), r.observers && Tr(r));
  }
}
function Gt(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const n = e.sources.pop(), r = e.sourceSlots.pop(), i = n.observers;
      if (i && i.length) {
        const s = i.pop(), d = n.observerSlots.pop();
        r < i.length && (s.sourceSlots[d] = r, i[r] = s, n.observerSlots[r] = d);
      }
    }
  if (e.owned) {
    for (t = 0; t < e.owned.length; t++)
      Gt(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = 0; t < e.cleanups.length; t++)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function Sr(e) {
  return e instanceof Error || typeof e == "string" ? e : new Error("Unknown error");
}
function Pr(e) {
  throw e = Sr(e), e;
}
const Y9 = Symbol("fallback");
function Bn(e) {
  for (let t = 0; t < e.length; t++)
    e[t]();
}
function G9(e, t, n = {}) {
  let r = [], i = [], s = [], d = 0, u = t.length > 1 ? [] : null;
  return D1(() => Bn(s)), () => {
    let m = e() || [], k, g;
    return m[j9], h1(() => {
      let L = m.length, O, w, D, B, W, q, F, R, K;
      if (L === 0)
        d !== 0 && (Bn(s), s = [], r = [], i = [], d = 0, u && (u = [])), n.fallback && (r = [Y9], i[0] = yt((pe) => (s[0] = pe, n.fallback())), d = 1);
      else if (d === 0) {
        for (i = new Array(L), g = 0; g < L; g++)
          r[g] = m[g], i[g] = yt(M);
        d = L;
      } else {
        for (D = new Array(L), B = new Array(L), u && (W = new Array(L)), q = 0, F = Math.min(d, L); q < F && r[q] === m[q]; q++)
          ;
        for (F = d - 1, R = L - 1; F >= q && R >= q && r[F] === m[R]; F--, R--)
          D[R] = i[F], B[R] = s[F], u && (W[R] = u[F]);
        for (O = /* @__PURE__ */ new Map(), w = new Array(R + 1), g = R; g >= q; g--)
          K = m[g], k = O.get(K), w[g] = k === void 0 ? -1 : k, O.set(K, g);
        for (k = q; k <= F; k++)
          K = r[k], g = O.get(K), g !== void 0 && g !== -1 ? (D[g] = i[k], B[g] = s[k], u && (W[g] = u[k]), g = w[g], O.set(K, g)) : s[k]();
        for (g = q; g < L; g++)
          g in D ? (i[g] = D[g], s[g] = B[g], u && (u[g] = W[g], u[g](g))) : i[g] = yt(M);
        i = i.slice(0, d = L), r = m.slice(0);
      }
      return i;
    });
    function M(L) {
      if (s[g] = L, u) {
        const [O, w] = T(g);
        return u[g] = w, t(m[g], O);
      }
      return t(m[g]);
    }
  };
}
function x(e, t) {
  return h1(() => e(t || {}));
}
function Nt() {
  return !0;
}
const W9 = {
  get(e, t, n) {
    return t === m0 ? n : e.get(t);
  },
  has(e, t) {
    return t === m0 ? !0 : e.has(t);
  },
  set: Nt,
  deleteProperty: Nt,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: Nt,
      deleteProperty: Nt
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function d0(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function Or(...e) {
  let t = !1;
  for (let r = 0; r < e.length; r++) {
    const i = e[r];
    t = t || !!i && m0 in i, e[r] = typeof i == "function" ? (t = !0, H(i)) : i;
  }
  if (t)
    return new Proxy({
      get(r) {
        for (let i = e.length - 1; i >= 0; i--) {
          const s = d0(e[i])[r];
          if (s !== void 0)
            return s;
        }
      },
      has(r) {
        for (let i = e.length - 1; i >= 0; i--)
          if (r in d0(e[i]))
            return !0;
        return !1;
      },
      keys() {
        const r = [];
        for (let i = 0; i < e.length; i++)
          r.push(...Object.keys(d0(e[i])));
        return [...new Set(r)];
      }
    }, W9);
  const n = {};
  for (let r = e.length - 1; r >= 0; r--)
    if (e[r]) {
      const i = Object.getOwnPropertyDescriptors(e[r]);
      for (const s in i)
        s in n || Object.defineProperty(n, s, {
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
  return n;
}
function p0(e) {
  const t = "fallback" in e && {
    fallback: () => e.fallback
  };
  return H(G9(() => e.each, e.children, t || void 0));
}
function V(e) {
  let t = !1;
  const n = e.keyed, r = H(() => e.when, void 0, {
    equals: (i, s) => t ? i === s : !i == !s
  });
  return H(() => {
    const i = r();
    if (i) {
      const s = e.children, d = typeof s == "function" && s.length > 0;
      return t = n || d, d ? h1(() => s(i)) : s;
    }
    return e.fallback;
  }, void 0, void 0);
}
function X9(e, t, n) {
  let r = n.length, i = t.length, s = r, d = 0, u = 0, m = t[i - 1].nextSibling, k = null;
  for (; d < i || u < s; ) {
    if (t[d] === n[u]) {
      d++, u++;
      continue;
    }
    for (; t[i - 1] === n[s - 1]; )
      i--, s--;
    if (i === d) {
      const g = s < r ? u ? n[u - 1].nextSibling : n[s - u] : m;
      for (; u < s; )
        e.insertBefore(n[u++], g);
    } else if (s === u)
      for (; d < i; )
        (!k || !k.has(t[d])) && t[d].remove(), d++;
    else if (t[d] === n[s - 1] && n[u] === t[i - 1]) {
      const g = t[--i].nextSibling;
      e.insertBefore(n[u++], t[d++].nextSibling), e.insertBefore(n[--s], g), t[i] = n[s];
    } else {
      if (!k) {
        k = /* @__PURE__ */ new Map();
        let M = u;
        for (; M < s; )
          k.set(n[M], M++);
      }
      const g = k.get(t[d]);
      if (g != null)
        if (u < g && g < s) {
          let M = d, L = 1, O;
          for (; ++M < i && M < s && !((O = k.get(t[M])) == null || O !== g + L); )
            L++;
          if (L > g - u) {
            const w = t[d];
            for (; u < g; )
              e.insertBefore(n[u++], w);
          } else
            e.replaceChild(n[u++], t[d++]);
        } else
          d++;
      else
        t[d++].remove();
    }
  }
}
const Fn = "_$DX_DELEGATE";
function J9(e, t, n, r = {}) {
  let i;
  return yt((s) => {
    i = s, t === document ? e() : C(t, e(), t.firstChild ? null : void 0, n);
  }, r.owner), () => {
    i(), t.textContent = "";
  };
}
function $(e, t, n) {
  const r = document.createElement("template");
  r.innerHTML = e;
  let i = r.content.firstChild;
  return n && (i = i.firstChild), i;
}
function Qe(e, t = window.document) {
  const n = t[Fn] || (t[Fn] = /* @__PURE__ */ new Set());
  for (let r = 0, i = e.length; r < i; r++) {
    const s = e[r];
    n.has(s) || (n.add(s), t.addEventListener(s, e5));
  }
}
function Me(e, t, n) {
  n == null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function oe(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function i1(e, t, n, r) {
  if (r)
    Array.isArray(n) ? (e[`$$${t}`] = n[0], e[`$$${t}Data`] = n[1]) : e[`$$${t}`] = n;
  else if (Array.isArray(n)) {
    const i = n[0];
    e.addEventListener(t, n[0] = (s) => i.call(e, n[1], s));
  } else
    e.addEventListener(t, n);
}
function N1(e, t, n) {
  if (!t)
    return n ? Me(e, "style") : t;
  const r = e.style;
  if (typeof t == "string")
    return r.cssText = t;
  typeof n == "string" && (r.cssText = n = void 0), n || (n = {}), t || (t = {});
  let i, s;
  for (s in n)
    t[s] == null && r.removeProperty(s), delete n[s];
  for (s in t)
    i = t[s], i !== n[s] && (r.setProperty(s, i), n[s] = i);
  return n;
}
function O1(e, t, n) {
  return h1(() => e(t, n));
}
function C(e, t, n, r) {
  if (n !== void 0 && !r && (r = []), typeof t != "function")
    return Rt(e, t, r, n);
  I((i) => Rt(e, t(), i, n), r);
}
function e5(e) {
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
  }), Se.registry && !Se.done && (Se.done = !0, document.querySelectorAll("[id^=pl-]").forEach((r) => {
    for (; r && r.nodeType !== 8 && r.nodeValue !== "pl-" + e; ) {
      let i = r.nextSibling;
      r.remove(), r = i;
    }
    r && r.remove();
  })); n; ) {
    const r = n[t];
    if (r && !n.disabled) {
      const i = n[`${t}Data`];
      if (i !== void 0 ? r.call(n, i, e) : r.call(n, e), e.cancelBubble)
        return;
    }
    n = n._$host || n.parentNode || n.host;
  }
}
function Rt(e, t, n, r, i) {
  for (Se.context && !n && (n = [...e.childNodes]); typeof n == "function"; )
    n = n();
  if (t === n)
    return n;
  const s = typeof t, d = r !== void 0;
  if (e = d && n[0] && n[0].parentNode || e, s === "string" || s === "number") {
    if (Se.context)
      return n;
    if (s === "number" && (t = t.toString()), d) {
      let u = n[0];
      u && u.nodeType === 3 ? u.data = t : u = document.createTextNode(t), n = K1(e, n, r, u);
    } else
      n !== "" && typeof n == "string" ? n = e.firstChild.data = t : n = e.textContent = t;
  } else if (t == null || s === "boolean") {
    if (Se.context)
      return n;
    n = K1(e, n, r);
  } else {
    if (s === "function")
      return I(() => {
        let u = t();
        for (; typeof u == "function"; )
          u = u();
        n = Rt(e, u, n, r);
      }), () => n;
    if (Array.isArray(t)) {
      const u = [], m = n && Array.isArray(n);
      if (C0(u, t, n, i))
        return I(() => n = Rt(e, u, n, r, !0)), () => n;
      if (Se.context) {
        if (!u.length)
          return n;
        for (let k = 0; k < u.length; k++)
          if (u[k].parentNode)
            return n = u;
      }
      if (u.length === 0) {
        if (n = K1(e, n, r), d)
          return n;
      } else
        m ? n.length === 0 ? Un(e, u, r) : X9(e, n, u) : (n && K1(e), Un(e, u));
      n = u;
    } else if (t instanceof Node) {
      if (Se.context && t.parentNode)
        return n = d ? [t] : t;
      if (Array.isArray(n)) {
        if (d)
          return n = K1(e, n, r, t);
        K1(e, n, null, t);
      } else
        n == null || n === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      n = t;
    }
  }
  return n;
}
function C0(e, t, n, r) {
  let i = !1;
  for (let s = 0, d = t.length; s < d; s++) {
    let u = t[s], m = n && n[s];
    if (u instanceof Node)
      e.push(u);
    else if (!(u == null || u === !0 || u === !1))
      if (Array.isArray(u))
        i = C0(e, u, m) || i;
      else if (typeof u == "function")
        if (r) {
          for (; typeof u == "function"; )
            u = u();
          i = C0(e, Array.isArray(u) ? u : [u], Array.isArray(m) ? m : [m]) || i;
        } else
          e.push(u), i = !0;
      else {
        const k = String(u);
        m && m.nodeType === 3 && m.data === k ? e.push(m) : e.push(document.createTextNode(k));
      }
  }
  return i;
}
function Un(e, t, n = null) {
  for (let r = 0, i = t.length; r < i; r++)
    e.insertBefore(t[r], n);
}
function K1(e, t, n, r) {
  if (n === void 0)
    return e.textContent = "";
  const i = r || document.createTextNode("");
  if (t.length) {
    let s = !1;
    for (let d = t.length - 1; d >= 0; d--) {
      const u = t[d];
      if (i !== u) {
        const m = u.parentNode === e;
        !s && !d ? m ? e.replaceChild(i, u) : e.insertBefore(i, n) : m && u.remove();
      } else
        s = !0;
    }
  } else
    e.insertBefore(i, n);
  return [i];
}
const t5 = "http://www.w3.org/2000/svg";
function n5(e, t = !1) {
  return t ? document.createElementNS(t5, e) : document.createElement(e);
}
function r5(e) {
  const {
    useShadow: t
  } = e, n = document.createTextNode(""), r = e.mount || document.body;
  function i() {
    if (Se.context) {
      const [s, d] = T(!1);
      return queueMicrotask(() => d(!0)), () => s() && e.children;
    } else
      return () => e.children;
  }
  if (r instanceof HTMLHeadElement) {
    const [s, d] = T(!1), u = () => d(!0);
    yt((m) => C(r, () => s() ? m() : i()(), null)), D1(() => {
      Se.context ? queueMicrotask(u) : u();
    });
  } else {
    const s = n5(e.isSVG ? "g" : "div", e.isSVG), d = t && s.attachShadow ? s.attachShadow({
      mode: "open"
    }) : s;
    Object.defineProperty(s, "_$host", {
      get() {
        return n.parentNode;
      },
      configurable: !0
    }), C(d, i()), r.appendChild(s), e.ref && e.ref(s), D1(() => r.removeChild(s));
  }
  return n;
}
var It = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Dr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var o5 = typeof It == "object" && It && It.Object === Object && It, Nr = o5, i5 = Nr, a5 = typeof self == "object" && self && self.Object === Object && self, s5 = i5 || a5 || Function("return this")(), a1 = s5, l5 = a1, c5 = l5.Symbol, Wt = c5, zn = Wt, Ir = Object.prototype, u5 = Ir.hasOwnProperty, d5 = Ir.toString, dt = zn ? zn.toStringTag : void 0;
function h5(e) {
  var t = u5.call(e, dt), n = e[dt];
  try {
    e[dt] = void 0;
    var r = !0;
  } catch {
  }
  var i = d5.call(e);
  return r && (t ? e[dt] = n : delete e[dt]), i;
}
var f5 = h5, y5 = Object.prototype, g5 = y5.toString;
function m5(e) {
  return g5.call(e);
}
var p5 = m5, Kn = Wt, C5 = f5, v5 = p5, b5 = "[object Null]", $5 = "[object Undefined]", jn = Kn ? Kn.toStringTag : void 0;
function _5(e) {
  return e == null ? e === void 0 ? $5 : b5 : jn && jn in Object(e) ? C5(e) : v5(e);
}
var gt = _5;
function k5(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var R1 = k5, x5 = gt, L5 = R1, w5 = "[object AsyncFunction]", A5 = "[object Function]", M5 = "[object GeneratorFunction]", T5 = "[object Proxy]";
function S5(e) {
  if (!L5(e))
    return !1;
  var t = x5(e);
  return t == A5 || t == M5 || t == w5 || t == T5;
}
var Er = S5, P5 = a1, O5 = P5["__core-js_shared__"], D5 = O5, h0 = D5, Qn = function() {
  var e = /[^.]+$/.exec(h0 && h0.keys && h0.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function N5(e) {
  return !!Qn && Qn in e;
}
var I5 = N5, E5 = Function.prototype, B5 = E5.toString;
function F5(e) {
  if (e != null) {
    try {
      return B5.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Br = F5, U5 = Er, z5 = I5, K5 = R1, j5 = Br, Q5 = /[\\^$.*+?()[\]{}|]/g, R5 = /^\[object .+?Constructor\]$/, Z5 = Function.prototype, V5 = Object.prototype, H5 = Z5.toString, q5 = V5.hasOwnProperty, Y5 = RegExp(
  "^" + H5.call(q5).replace(Q5, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function G5(e) {
  if (!K5(e) || z5(e))
    return !1;
  var t = U5(e) ? Y5 : R5;
  return t.test(j5(e));
}
var W5 = G5;
function X5(e, t) {
  return e == null ? void 0 : e[t];
}
var J5 = X5, e6 = W5, t6 = J5;
function n6(e, t) {
  var n = t6(e, t);
  return e6(n) ? n : void 0;
}
var I1 = n6, r6 = I1, o6 = function() {
  try {
    var e = r6(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), i6 = o6, Rn = i6;
function a6(e, t, n) {
  t == "__proto__" && Rn ? Rn(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
var Fr = a6;
function s6(e, t) {
  return e === t || e !== e && t !== t;
}
var Ur = s6, l6 = Fr, c6 = Ur, u6 = Object.prototype, d6 = u6.hasOwnProperty;
function h6(e, t, n) {
  var r = e[t];
  (!(d6.call(e, t) && c6(r, n)) || n === void 0 && !(t in e)) && l6(e, t, n);
}
var A0 = h6, f6 = Array.isArray, Z1 = f6;
function y6(e) {
  return e != null && typeof e == "object";
}
var V1 = y6, g6 = gt, m6 = V1, p6 = "[object Symbol]";
function C6(e) {
  return typeof e == "symbol" || m6(e) && g6(e) == p6;
}
var M0 = C6, v6 = Z1, b6 = M0, $6 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, _6 = /^\w*$/;
function k6(e, t) {
  if (v6(e))
    return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || b6(e) ? !0 : _6.test(e) || !$6.test(e) || t != null && e in Object(t);
}
var x6 = k6, L6 = I1, w6 = L6(Object, "create"), Xt = w6, Zn = Xt;
function A6() {
  this.__data__ = Zn ? Zn(null) : {}, this.size = 0;
}
var M6 = A6;
function T6(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var S6 = T6, P6 = Xt, O6 = "__lodash_hash_undefined__", D6 = Object.prototype, N6 = D6.hasOwnProperty;
function I6(e) {
  var t = this.__data__;
  if (P6) {
    var n = t[e];
    return n === O6 ? void 0 : n;
  }
  return N6.call(t, e) ? t[e] : void 0;
}
var E6 = I6, B6 = Xt, F6 = Object.prototype, U6 = F6.hasOwnProperty;
function z6(e) {
  var t = this.__data__;
  return B6 ? t[e] !== void 0 : U6.call(t, e);
}
var K6 = z6, j6 = Xt, Q6 = "__lodash_hash_undefined__";
function R6(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = j6 && t === void 0 ? Q6 : t, this;
}
var Z6 = R6, V6 = M6, H6 = S6, q6 = E6, Y6 = K6, G6 = Z6;
function H1(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
H1.prototype.clear = V6;
H1.prototype.delete = H6;
H1.prototype.get = q6;
H1.prototype.has = Y6;
H1.prototype.set = G6;
var W6 = H1;
function X6() {
  this.__data__ = [], this.size = 0;
}
var J6 = X6, e2 = Ur;
function t2(e, t) {
  for (var n = e.length; n--; )
    if (e2(e[n][0], t))
      return n;
  return -1;
}
var Jt = t2, n2 = Jt, r2 = Array.prototype, o2 = r2.splice;
function i2(e) {
  var t = this.__data__, n = n2(t, e);
  if (n < 0)
    return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : o2.call(t, n, 1), --this.size, !0;
}
var a2 = i2, s2 = Jt;
function l2(e) {
  var t = this.__data__, n = s2(t, e);
  return n < 0 ? void 0 : t[n][1];
}
var c2 = l2, u2 = Jt;
function d2(e) {
  return u2(this.__data__, e) > -1;
}
var h2 = d2, f2 = Jt;
function y2(e, t) {
  var n = this.__data__, r = f2(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
}
var g2 = y2, m2 = J6, p2 = a2, C2 = c2, v2 = h2, b2 = g2;
function q1(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
q1.prototype.clear = m2;
q1.prototype.delete = p2;
q1.prototype.get = C2;
q1.prototype.has = v2;
q1.prototype.set = b2;
var e0 = q1, $2 = I1, _2 = a1, k2 = $2(_2, "Map"), T0 = k2, Vn = W6, x2 = e0, L2 = T0;
function w2() {
  this.size = 0, this.__data__ = {
    hash: new Vn(),
    map: new (L2 || x2)(),
    string: new Vn()
  };
}
var A2 = w2;
function M2(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var T2 = M2, S2 = T2;
function P2(e, t) {
  var n = e.__data__;
  return S2(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
var t0 = P2, O2 = t0;
function D2(e) {
  var t = O2(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var N2 = D2, I2 = t0;
function E2(e) {
  return I2(this, e).get(e);
}
var B2 = E2, F2 = t0;
function U2(e) {
  return F2(this, e).has(e);
}
var z2 = U2, K2 = t0;
function j2(e, t) {
  var n = K2(this, e), r = n.size;
  return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
}
var Q2 = j2, R2 = A2, Z2 = N2, V2 = B2, H2 = z2, q2 = Q2;
function Y1(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
Y1.prototype.clear = R2;
Y1.prototype.delete = Z2;
Y1.prototype.get = V2;
Y1.prototype.has = H2;
Y1.prototype.set = q2;
var zr = Y1, Kr = zr, Y2 = "Expected a function";
function S0(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Y2);
  var n = function() {
    var r = arguments, i = t ? t.apply(this, r) : r[0], s = n.cache;
    if (s.has(i))
      return s.get(i);
    var d = e.apply(this, r);
    return n.cache = s.set(i, d) || s, d;
  };
  return n.cache = new (S0.Cache || Kr)(), n;
}
S0.Cache = Kr;
var G2 = S0, W2 = G2, X2 = 500;
function J2(e) {
  var t = W2(e, function(r) {
    return n.size === X2 && n.clear(), r;
  }), n = t.cache;
  return t;
}
var e3 = J2, t3 = e3, n3 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, r3 = /\\(\\)?/g, o3 = t3(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(n3, function(n, r, i, s) {
    t.push(i ? s.replace(r3, "$1") : r || n);
  }), t;
}), i3 = o3;
function a3(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, i = Array(r); ++n < r; )
    i[n] = t(e[n], n, e);
  return i;
}
var s3 = a3, Hn = Wt, l3 = s3, c3 = Z1, u3 = M0, d3 = 1 / 0, qn = Hn ? Hn.prototype : void 0, Yn = qn ? qn.toString : void 0;
function jr(e) {
  if (typeof e == "string")
    return e;
  if (c3(e))
    return l3(e, jr) + "";
  if (u3(e))
    return Yn ? Yn.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -d3 ? "-0" : t;
}
var h3 = jr, f3 = h3;
function y3(e) {
  return e == null ? "" : f3(e);
}
var g3 = y3, m3 = Z1, p3 = x6, C3 = i3, v3 = g3;
function b3(e, t) {
  return m3(e) ? e : p3(e, t) ? [e] : C3(v3(e));
}
var $3 = b3, _3 = 9007199254740991, k3 = /^(?:0|[1-9]\d*)$/;
function x3(e, t) {
  var n = typeof e;
  return t = t ?? _3, !!t && (n == "number" || n != "symbol" && k3.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var Qr = x3, L3 = M0, w3 = 1 / 0;
function A3(e) {
  if (typeof e == "string" || L3(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -w3 ? "-0" : t;
}
var M3 = A3, T3 = A0, S3 = $3, P3 = Qr, Gn = R1, O3 = M3;
function D3(e, t, n, r) {
  if (!Gn(e))
    return e;
  t = S3(t, e);
  for (var i = -1, s = t.length, d = s - 1, u = e; u != null && ++i < s; ) {
    var m = O3(t[i]), k = n;
    if (m === "__proto__" || m === "constructor" || m === "prototype")
      return e;
    if (i != d) {
      var g = u[m];
      k = r ? r(g, m, u) : void 0, k === void 0 && (k = Gn(g) ? g : P3(t[i + 1]) ? [] : {});
    }
    T3(u, m, k), u = u[m];
  }
  return e;
}
var N3 = D3, I3 = N3;
function E3(e, t, n) {
  return e == null ? e : I3(e, t, n);
}
var B3 = E3;
const v0 = /* @__PURE__ */ Dr(B3);
var F3 = e0;
function U3() {
  this.__data__ = new F3(), this.size = 0;
}
var z3 = U3;
function K3(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
var j3 = K3;
function Q3(e) {
  return this.__data__.get(e);
}
var R3 = Q3;
function Z3(e) {
  return this.__data__.has(e);
}
var V3 = Z3, H3 = e0, q3 = T0, Y3 = zr, G3 = 200;
function W3(e, t) {
  var n = this.__data__;
  if (n instanceof H3) {
    var r = n.__data__;
    if (!q3 || r.length < G3 - 1)
      return r.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new Y3(r);
  }
  return n.set(e, t), this.size = n.size, this;
}
var X3 = W3, J3 = e0, eo = z3, to = j3, no = R3, ro = V3, oo = X3;
function G1(e) {
  var t = this.__data__ = new J3(e);
  this.size = t.size;
}
G1.prototype.clear = eo;
G1.prototype.delete = to;
G1.prototype.get = no;
G1.prototype.has = ro;
G1.prototype.set = oo;
var io = G1;
function ao(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r && t(e[n], n, e) !== !1; )
    ;
  return e;
}
var so = ao, lo = A0, co = Fr;
function uo(e, t, n, r) {
  var i = !n;
  n || (n = {});
  for (var s = -1, d = t.length; ++s < d; ) {
    var u = t[s], m = r ? r(n[u], e[u], u, n, e) : void 0;
    m === void 0 && (m = e[u]), i ? co(n, u, m) : lo(n, u, m);
  }
  return n;
}
var n0 = uo;
function ho(e, t) {
  for (var n = -1, r = Array(e); ++n < e; )
    r[n] = t(n);
  return r;
}
var fo = ho, yo = gt, go = V1, mo = "[object Arguments]";
function po(e) {
  return go(e) && yo(e) == mo;
}
var Co = po, Wn = Co, vo = V1, Rr = Object.prototype, bo = Rr.hasOwnProperty, $o = Rr.propertyIsEnumerable, _o = Wn(function() {
  return arguments;
}()) ? Wn : function(e) {
  return vo(e) && bo.call(e, "callee") && !$o.call(e, "callee");
}, ko = _o, Zt = { exports: {} };
function xo() {
  return !1;
}
var Lo = xo;
Zt.exports;
(function(e, t) {
  var n = a1, r = Lo, i = t && !t.nodeType && t, s = i && !0 && e && !e.nodeType && e, d = s && s.exports === i, u = d ? n.Buffer : void 0, m = u ? u.isBuffer : void 0, k = m || r;
  e.exports = k;
})(Zt, Zt.exports);
var Zr = Zt.exports, wo = 9007199254740991;
function Ao(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= wo;
}
var Vr = Ao, Mo = gt, To = Vr, So = V1, Po = "[object Arguments]", Oo = "[object Array]", Do = "[object Boolean]", No = "[object Date]", Io = "[object Error]", Eo = "[object Function]", Bo = "[object Map]", Fo = "[object Number]", Uo = "[object Object]", zo = "[object RegExp]", Ko = "[object Set]", jo = "[object String]", Qo = "[object WeakMap]", Ro = "[object ArrayBuffer]", Zo = "[object DataView]", Vo = "[object Float32Array]", Ho = "[object Float64Array]", qo = "[object Int8Array]", Yo = "[object Int16Array]", Go = "[object Int32Array]", Wo = "[object Uint8Array]", Xo = "[object Uint8ClampedArray]", Jo = "[object Uint16Array]", ei = "[object Uint32Array]", he = {};
he[Vo] = he[Ho] = he[qo] = he[Yo] = he[Go] = he[Wo] = he[Xo] = he[Jo] = he[ei] = !0;
he[Po] = he[Oo] = he[Ro] = he[Do] = he[Zo] = he[No] = he[Io] = he[Eo] = he[Bo] = he[Fo] = he[Uo] = he[zo] = he[Ko] = he[jo] = he[Qo] = !1;
function ti(e) {
  return So(e) && To(e.length) && !!he[Mo(e)];
}
var ni = ti;
function ri(e) {
  return function(t) {
    return e(t);
  };
}
var P0 = ri, Vt = { exports: {} };
Vt.exports;
(function(e, t) {
  var n = Nr, r = t && !t.nodeType && t, i = r && !0 && e && !e.nodeType && e, s = i && i.exports === r, d = s && n.process, u = function() {
    try {
      var m = i && i.require && i.require("util").types;
      return m || d && d.binding && d.binding("util");
    } catch {
    }
  }();
  e.exports = u;
})(Vt, Vt.exports);
var O0 = Vt.exports, oi = ni, ii = P0, Xn = O0, Jn = Xn && Xn.isTypedArray, ai = Jn ? ii(Jn) : oi, si = ai, li = fo, ci = ko, ui = Z1, di = Zr, hi = Qr, fi = si, yi = Object.prototype, gi = yi.hasOwnProperty;
function mi(e, t) {
  var n = ui(e), r = !n && ci(e), i = !n && !r && di(e), s = !n && !r && !i && fi(e), d = n || r || i || s, u = d ? li(e.length, String) : [], m = u.length;
  for (var k in e)
    (t || gi.call(e, k)) && !(d && // Safari 9 has enumerable `arguments.length` in strict mode.
    (k == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (k == "offset" || k == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    s && (k == "buffer" || k == "byteLength" || k == "byteOffset") || // Skip index properties.
    hi(k, m))) && u.push(k);
  return u;
}
var Hr = mi, pi = Object.prototype;
function Ci(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || pi;
  return e === n;
}
var D0 = Ci;
function vi(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var qr = vi, bi = qr, $i = bi(Object.keys, Object), _i = $i, ki = D0, xi = _i, Li = Object.prototype, wi = Li.hasOwnProperty;
function Ai(e) {
  if (!ki(e))
    return xi(e);
  var t = [];
  for (var n in Object(e))
    wi.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
var Mi = Ai, Ti = Er, Si = Vr;
function Pi(e) {
  return e != null && Si(e.length) && !Ti(e);
}
var Yr = Pi, Oi = Hr, Di = Mi, Ni = Yr;
function Ii(e) {
  return Ni(e) ? Oi(e) : Di(e);
}
var N0 = Ii, Ei = n0, Bi = N0;
function Fi(e, t) {
  return e && Ei(t, Bi(t), e);
}
var Ui = Fi;
function zi(e) {
  var t = [];
  if (e != null)
    for (var n in Object(e))
      t.push(n);
  return t;
}
var Ki = zi, ji = R1, Qi = D0, Ri = Ki, Zi = Object.prototype, Vi = Zi.hasOwnProperty;
function Hi(e) {
  if (!ji(e))
    return Ri(e);
  var t = Qi(e), n = [];
  for (var r in e)
    r == "constructor" && (t || !Vi.call(e, r)) || n.push(r);
  return n;
}
var qi = Hi, Yi = Hr, Gi = qi, Wi = Yr;
function Xi(e) {
  return Wi(e) ? Yi(e, !0) : Gi(e);
}
var I0 = Xi, Ji = n0, e8 = I0;
function t8(e, t) {
  return e && Ji(t, e8(t), e);
}
var n8 = t8, Ht = { exports: {} };
Ht.exports;
(function(e, t) {
  var n = a1, r = t && !t.nodeType && t, i = r && !0 && e && !e.nodeType && e, s = i && i.exports === r, d = s ? n.Buffer : void 0, u = d ? d.allocUnsafe : void 0;
  function m(k, g) {
    if (g)
      return k.slice();
    var M = k.length, L = u ? u(M) : new k.constructor(M);
    return k.copy(L), L;
  }
  e.exports = m;
})(Ht, Ht.exports);
var r8 = Ht.exports;
function o8(e, t) {
  var n = -1, r = e.length;
  for (t || (t = Array(r)); ++n < r; )
    t[n] = e[n];
  return t;
}
var i8 = o8;
function a8(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, i = 0, s = []; ++n < r; ) {
    var d = e[n];
    t(d, n, e) && (s[i++] = d);
  }
  return s;
}
var s8 = a8;
function l8() {
  return [];
}
var Gr = l8, c8 = s8, u8 = Gr, d8 = Object.prototype, h8 = d8.propertyIsEnumerable, er = Object.getOwnPropertySymbols, f8 = er ? function(e) {
  return e == null ? [] : (e = Object(e), c8(er(e), function(t) {
    return h8.call(e, t);
  }));
} : u8, E0 = f8, y8 = n0, g8 = E0;
function m8(e, t) {
  return y8(e, g8(e), t);
}
var p8 = m8;
function C8(e, t) {
  for (var n = -1, r = t.length, i = e.length; ++n < r; )
    e[i + n] = t[n];
  return e;
}
var Wr = C8, v8 = qr, b8 = v8(Object.getPrototypeOf, Object), Xr = b8, $8 = Wr, _8 = Xr, k8 = E0, x8 = Gr, L8 = Object.getOwnPropertySymbols, w8 = L8 ? function(e) {
  for (var t = []; e; )
    $8(t, k8(e)), e = _8(e);
  return t;
} : x8, Jr = w8, A8 = n0, M8 = Jr;
function T8(e, t) {
  return A8(e, M8(e), t);
}
var S8 = T8, P8 = Wr, O8 = Z1;
function D8(e, t, n) {
  var r = t(e);
  return O8(e) ? r : P8(r, n(e));
}
var e9 = D8, N8 = e9, I8 = E0, E8 = N0;
function B8(e) {
  return N8(e, E8, I8);
}
var F8 = B8, U8 = e9, z8 = Jr, K8 = I0;
function j8(e) {
  return U8(e, K8, z8);
}
var Q8 = j8, R8 = I1, Z8 = a1, V8 = R8(Z8, "DataView"), H8 = V8, q8 = I1, Y8 = a1, G8 = q8(Y8, "Promise"), W8 = G8, X8 = I1, J8 = a1, ea = X8(J8, "Set"), ta = ea, na = I1, ra = a1, oa = na(ra, "WeakMap"), ia = oa, b0 = H8, $0 = T0, _0 = W8, k0 = ta, x0 = ia, t9 = gt, W1 = Br, tr = "[object Map]", aa = "[object Object]", nr = "[object Promise]", rr = "[object Set]", or = "[object WeakMap]", ir = "[object DataView]", sa = W1(b0), la = W1($0), ca = W1(_0), ua = W1(k0), da = W1(x0), S1 = t9;
(b0 && S1(new b0(new ArrayBuffer(1))) != ir || $0 && S1(new $0()) != tr || _0 && S1(_0.resolve()) != nr || k0 && S1(new k0()) != rr || x0 && S1(new x0()) != or) && (S1 = function(e) {
  var t = t9(e), n = t == aa ? e.constructor : void 0, r = n ? W1(n) : "";
  if (r)
    switch (r) {
      case sa:
        return ir;
      case la:
        return tr;
      case ca:
        return nr;
      case ua:
        return rr;
      case da:
        return or;
    }
  return t;
});
var B0 = S1, ha = Object.prototype, fa = ha.hasOwnProperty;
function ya(e) {
  var t = e.length, n = new e.constructor(t);
  return t && typeof e[0] == "string" && fa.call(e, "index") && (n.index = e.index, n.input = e.input), n;
}
var ga = ya, ma = a1, pa = ma.Uint8Array, Ca = pa, ar = Ca;
function va(e) {
  var t = new e.constructor(e.byteLength);
  return new ar(t).set(new ar(e)), t;
}
var F0 = va, ba = F0;
function $a(e, t) {
  var n = t ? ba(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.byteLength);
}
var _a = $a, ka = /\w*$/;
function xa(e) {
  var t = new e.constructor(e.source, ka.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var La = xa, sr = Wt, lr = sr ? sr.prototype : void 0, cr = lr ? lr.valueOf : void 0;
function wa(e) {
  return cr ? Object(cr.call(e)) : {};
}
var Aa = wa, Ma = F0;
function Ta(e, t) {
  var n = t ? Ma(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.length);
}
var Sa = Ta, Pa = F0, Oa = _a, Da = La, Na = Aa, Ia = Sa, Ea = "[object Boolean]", Ba = "[object Date]", Fa = "[object Map]", Ua = "[object Number]", za = "[object RegExp]", Ka = "[object Set]", ja = "[object String]", Qa = "[object Symbol]", Ra = "[object ArrayBuffer]", Za = "[object DataView]", Va = "[object Float32Array]", Ha = "[object Float64Array]", qa = "[object Int8Array]", Ya = "[object Int16Array]", Ga = "[object Int32Array]", Wa = "[object Uint8Array]", Xa = "[object Uint8ClampedArray]", Ja = "[object Uint16Array]", e7 = "[object Uint32Array]";
function t7(e, t, n) {
  var r = e.constructor;
  switch (t) {
    case Ra:
      return Pa(e);
    case Ea:
    case Ba:
      return new r(+e);
    case Za:
      return Oa(e, n);
    case Va:
    case Ha:
    case qa:
    case Ya:
    case Ga:
    case Wa:
    case Xa:
    case Ja:
    case e7:
      return Ia(e, n);
    case Fa:
      return new r();
    case Ua:
    case ja:
      return new r(e);
    case za:
      return Da(e);
    case Ka:
      return new r();
    case Qa:
      return Na(e);
  }
}
var n7 = t7, r7 = R1, ur = Object.create, o7 = function() {
  function e() {
  }
  return function(t) {
    if (!r7(t))
      return {};
    if (ur)
      return ur(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}(), i7 = o7, a7 = i7, s7 = Xr, l7 = D0;
function c7(e) {
  return typeof e.constructor == "function" && !l7(e) ? a7(s7(e)) : {};
}
var u7 = c7, d7 = B0, h7 = V1, f7 = "[object Map]";
function y7(e) {
  return h7(e) && d7(e) == f7;
}
var g7 = y7, m7 = g7, p7 = P0, dr = O0, hr = dr && dr.isMap, C7 = hr ? p7(hr) : m7, v7 = C7, b7 = B0, $7 = V1, _7 = "[object Set]";
function k7(e) {
  return $7(e) && b7(e) == _7;
}
var x7 = k7, L7 = x7, w7 = P0, fr = O0, yr = fr && fr.isSet, A7 = yr ? w7(yr) : L7, M7 = A7, T7 = io, S7 = so, P7 = A0, O7 = Ui, D7 = n8, N7 = r8, I7 = i8, E7 = p8, B7 = S8, F7 = F8, U7 = Q8, z7 = B0, K7 = ga, j7 = n7, Q7 = u7, R7 = Z1, Z7 = Zr, V7 = v7, H7 = R1, q7 = M7, Y7 = N0, G7 = I0, W7 = 1, X7 = 2, J7 = 4, n9 = "[object Arguments]", es = "[object Array]", ts = "[object Boolean]", ns = "[object Date]", rs = "[object Error]", r9 = "[object Function]", os = "[object GeneratorFunction]", is = "[object Map]", as = "[object Number]", o9 = "[object Object]", ss = "[object RegExp]", ls = "[object Set]", cs = "[object String]", us = "[object Symbol]", ds = "[object WeakMap]", hs = "[object ArrayBuffer]", fs = "[object DataView]", ys = "[object Float32Array]", gs = "[object Float64Array]", ms = "[object Int8Array]", ps = "[object Int16Array]", Cs = "[object Int32Array]", vs = "[object Uint8Array]", bs = "[object Uint8ClampedArray]", $s = "[object Uint16Array]", _s = "[object Uint32Array]", de = {};
de[n9] = de[es] = de[hs] = de[fs] = de[ts] = de[ns] = de[ys] = de[gs] = de[ms] = de[ps] = de[Cs] = de[is] = de[as] = de[o9] = de[ss] = de[ls] = de[cs] = de[us] = de[vs] = de[bs] = de[$s] = de[_s] = !0;
de[rs] = de[r9] = de[ds] = !1;
function Ut(e, t, n, r, i, s) {
  var d, u = t & W7, m = t & X7, k = t & J7;
  if (n && (d = i ? n(e, r, i, s) : n(e)), d !== void 0)
    return d;
  if (!H7(e))
    return e;
  var g = R7(e);
  if (g) {
    if (d = K7(e), !u)
      return I7(e, d);
  } else {
    var M = z7(e), L = M == r9 || M == os;
    if (Z7(e))
      return N7(e, u);
    if (M == o9 || M == n9 || L && !i) {
      if (d = m || L ? {} : Q7(e), !u)
        return m ? B7(e, D7(d, e)) : E7(e, O7(d, e));
    } else {
      if (!de[M])
        return i ? e : {};
      d = j7(e, M, u);
    }
  }
  s || (s = new T7());
  var O = s.get(e);
  if (O)
    return O;
  s.set(e, d), q7(e) ? e.forEach(function(B) {
    d.add(Ut(B, t, n, B, e, s));
  }) : V7(e) && e.forEach(function(B, W) {
    d.set(W, Ut(B, t, n, W, e, s));
  });
  var w = k ? m ? U7 : F7 : m ? G7 : Y7, D = g ? void 0 : w(e);
  return S7(D || e, function(B, W) {
    D && (W = B, B = e[W]), P7(d, W, Ut(B, t, n, W, e, s));
  }), d;
}
var ks = Ut, xs = ks, Ls = 1, ws = 4;
function As(e) {
  return xs(e, Ls | ws);
}
var Ms = As;
const Ts = /* @__PURE__ */ Dr(Ms), Ss = /* @__PURE__ */ $("<button></button>"), Ps = (e) => (() => {
  const t = Ss.cloneNode(!0);
  return i1(t, "click", e.onClick, !0), C(t, () => e.children), I((n) => {
    const r = e.style, i = `klinecharts-pro-button ${e.type ?? "confirm"} ${e.class ?? ""}`;
    return n._v$ = N1(t, r, n._v$), i !== n._v$2 && oe(t, n._v$2 = i), n;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
Qe(["click"]);
const Os = /* @__PURE__ */ $('<svg viewBox="0 0 1024 1024" class="icon"><path d="M810.666667 128H213.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v597.333334c0 46.933333 38.4 85.333333 85.333333 85.333333h597.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V213.333333c0-46.933333-38.4-85.333333-85.333333-85.333333z m-353.706667 567.04a42.496 42.496 0 0 1-60.16 0L243.626667 541.866667c-8.106667-8.106667-12.373333-18.773333-12.373334-29.866667s4.693333-22.186667 12.373334-29.866667a42.496 42.496 0 0 1 60.16 0L426.666667 604.586667l293.546666-293.546667a42.496 42.496 0 1 1 60.16 60.16l-323.413333 323.84z"></path></svg>'), Ds = /* @__PURE__ */ $('<svg viewBox="0 0 1024 1024" class="icon"><path d="M245.333333 128h533.333334A117.333333 117.333333 0 0 1 896 245.333333v533.333334A117.333333 117.333333 0 0 1 778.666667 896H245.333333A117.333333 117.333333 0 0 1 128 778.666667V245.333333A117.333333 117.333333 0 0 1 245.333333 128z m0 64c-29.44 0-53.333333 23.893333-53.333333 53.333333v533.333334c0 29.44 23.893333 53.333333 53.333333 53.333333h533.333334c29.44 0 53.333333-23.893333 53.333333-53.333333V245.333333c0-29.44-23.893333-53.333333-53.333333-53.333333H245.333333z"></path></svg>'), Ns = /* @__PURE__ */ $("<div></div>"), Is = /* @__PURE__ */ $('<span class="label"></span>'), Es = () => Os.cloneNode(!0), Bs = () => Ds.cloneNode(!0), gr = (e) => {
  const [t, n] = T(e.checked ?? !1);
  return Be(() => {
    "checked" in e && n(e.checked);
  }), (() => {
    const r = Ns.cloneNode(!0);
    return r.$$click = (i) => {
      const s = !t();
      e.onChange && e.onChange(s), n(s);
    }, C(r, (() => {
      const i = H(() => !!t());
      return () => i() ? x(Es, {}) : x(Bs, {});
    })(), null), C(r, (() => {
      const i = H(() => !!e.label);
      return () => i() && (() => {
        const s = Is.cloneNode(!0);
        return C(s, () => e.label), s;
      })();
    })(), null), I((i) => {
      const s = e.style, d = `klinecharts-pro-checkbox ${t() && "checked" || ""} ${e.class || ""}`;
      return i._v$ = N1(r, s, i._v$), d !== i._v$2 && oe(r, i._v$2 = d), i;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), r;
  })();
};
Qe(["click"]);
const Fs = /* @__PURE__ */ $('<div class="klinecharts-pro-loading"><i class="circle1"></i><i class="circle2"></i><i class="circle3"></i></div>'), i9 = () => Fs.cloneNode(!0), Us = /* @__PURE__ */ $('<div class="klinecharts-pro-empty"><svg class="icon" viewBox="0 0 1024 1024"><path d="M855.6 427.2H168.5c-12.7 0-24.4 6.9-30.6 18L4.4 684.7C1.5 689.9 0 695.8 0 701.8v287.1c0 19.4 15.7 35.1 35.1 35.1H989c19.4 0 35.1-15.7 35.1-35.1V701.8c0-6-1.5-11.8-4.4-17.1L886.2 445.2c-6.2-11.1-17.9-18-30.6-18zM673.4 695.6c-16.5 0-30.8 11.5-34.3 27.7-12.7 58.5-64.8 102.3-127.2 102.3s-114.5-43.8-127.2-102.3c-3.5-16.1-17.8-27.7-34.3-27.7H119c-26.4 0-43.3-28-31.1-51.4l81.7-155.8c6.1-11.6 18-18.8 31.1-18.8h622.4c13 0 25 7.2 31.1 18.8l81.7 155.8c12.2 23.4-4.7 51.4-31.1 51.4H673.4zM819.9 209.5c-1-1.8-2.1-3.7-3.2-5.5-9.8-16.6-31.1-22.2-47.8-12.6L648.5 261c-17 9.8-22.7 31.6-12.6 48.4 0.9 1.4 1.7 2.9 2.5 4.4 9.5 17 31.2 22.8 48 13L807 257.3c16.7-9.7 22.4-31 12.9-47.8zM375.4 261.1L255 191.6c-16.7-9.6-38-4-47.8 12.6-1.1 1.8-2.1 3.6-3.2 5.5-9.5 16.8-3.8 38.1 12.9 47.8L337.3 327c16.9 9.7 38.6 4 48-13.1 0.8-1.5 1.7-2.9 2.5-4.4 10.2-16.8 4.5-38.6-12.4-48.4zM512 239.3h2.5c19.5 0.3 35.5-15.5 35.5-35.1v-139c0-19.3-15.6-34.9-34.8-35.1h-6.4C489.6 30.3 474 46 474 65.2v139c0 19.5 15.9 35.4 35.5 35.1h2.5z"></path></svg></div>'), zs = () => Us.cloneNode(!0), Ks = /* @__PURE__ */ $("<ul></ul>"), js = /* @__PURE__ */ $("<li></li>"), qt = (e) => (() => {
  const t = Ks.cloneNode(!0);
  return C(t, x(V, {
    get when() {
      return e.loading;
    },
    get children() {
      return x(i9, {});
    }
  }), null), C(t, x(V, {
    get when() {
      var n;
      return !e.loading && !e.children && !((n = e.dataSource) != null && n.length);
    },
    get children() {
      return x(zs, {});
    }
  }), null), C(t, x(V, {
    get when() {
      return e.children;
    },
    get children() {
      return e.children;
    }
  }), null), C(t, x(V, {
    get when() {
      return !e.children;
    },
    get children() {
      var n;
      return (n = e.dataSource) == null ? void 0 : n.map((r) => {
        var i;
        return ((i = e.renderItem) == null ? void 0 : i.call(e, r)) ?? js.cloneNode(!0);
      });
    }
  }), null), I((n) => {
    const r = e.style, i = `klinecharts-pro-list ${e.class ?? ""}`;
    return n._v$ = N1(t, r, n._v$), i !== n._v$2 && oe(t, n._v$2 = i), n;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})(), Qs = /* @__PURE__ */ $('<div class="klinecharts-pro-modal"><div class="inner"><div class="title-container"><svg class="close-icon" viewBox="0 0 1024 1024"><path d="M934.184927 199.723787 622.457206 511.452531l311.727721 311.703161c14.334473 14.229073 23.069415 33.951253 23.069415 55.743582 0 43.430138-35.178197 78.660524-78.735226 78.660524-21.664416 0-41.361013-8.865925-55.642275-23.069415L511.149121 622.838388 199.420377 934.490384c-14.204513 14.20349-33.901111 23.069415-55.642275 23.069415-43.482327 0-78.737272-35.230386-78.737272-78.660524 0-21.792329 8.864902-41.513486 23.094998-55.743582l311.677579-311.703161L88.135828 199.723787c-14.230096-14.255679-23.094998-33.92567-23.094998-55.642275 0-43.430138 35.254945-78.762855 78.737272-78.762855 21.741163 0 41.437761 8.813736 55.642275 23.069415l311.727721 311.727721L822.876842 88.389096c14.281261-14.255679 33.977859-23.069415 55.642275-23.069415 43.557028 0 78.735226 35.332716 78.735226 78.762855C957.254342 165.798117 948.5194 185.468109 934.184927 199.723787"></path></svg></div><div class="content-container"></div></div></div>'), Rs = /* @__PURE__ */ $('<div class="button-container"></div>'), v1 = (e) => (() => {
  const t = Qs.cloneNode(!0), n = t.firstChild, r = n.firstChild, i = r.firstChild, s = r.nextSibling;
  return t.$$click = (d) => {
    d.target === d.currentTarget && e.onClose && e.onClose();
  }, C(r, () => e.title, i), i1(i, "click", e.onClose, !0), C(s, () => e.children), C(n, (() => {
    const d = H(() => !!(e.buttons && e.buttons.length > 0));
    return () => d() && (() => {
      const u = Rs.cloneNode(!0);
      return C(u, () => e.buttons.map((m) => x(Ps, Or(m, {
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
        return m._v$8 = N1(u, k, m._v$8), g !== m._v$9 && u.classList.toggle("mobile-buttons", m._v$9 = g), m;
      }, {
        _v$8: void 0,
        _v$9: void 0
      }), u;
    })();
  })(), null), I((d) => {
    const u = !!e.isMobile, m = e.isMobile ? "100%" : `${e.width ?? 400}px`, k = (e.isMobile, "auto"), g = e.isMobile ? "60vh" : "90vh", M = !!e.isMobile, L = !!e.isMobile, O = !!e.isMobile;
    return u !== d._v$ && t.classList.toggle("mobile-modal", d._v$ = u), m !== d._v$2 && n.style.setProperty("width", d._v$2 = m), k !== d._v$3 && n.style.setProperty("height", d._v$3 = k), g !== d._v$4 && n.style.setProperty("max-height", d._v$4 = g), M !== d._v$5 && n.classList.toggle("mobile-inner", d._v$5 = M), L !== d._v$6 && r.classList.toggle("mobile-title", d._v$6 = L), O !== d._v$7 && s.classList.toggle("mobile-content", d._v$7 = O), d;
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
Qe(["click"]);
const Zs = /* @__PURE__ */ $('<div tabindex="0"><div class="selector-container"><span class="value"></span><i class="arrow"></i></div></div>'), Vs = /* @__PURE__ */ $('<div class="drop-down-container"><ul></ul></div>'), Hs = /* @__PURE__ */ $('<div><input type="text"></div>'), qs = /* @__PURE__ */ $("<li></li>"), a9 = (e) => {
  const [t, n] = T(!1), [r, i] = T("");
  let s, d;
  const u = H(() => {
    if (!e.dataSource || !e.searchable)
      return e.dataSource;
    const g = r().toLowerCase().trim();
    return g ? typeof e.dataSource[0] == "string" ? e.dataSource.filter((L) => L.toLowerCase().includes(g)) : e.dataSource.filter((L) => {
      var D, B;
      const O = ((D = L.text) == null ? void 0 : D.toString().toLowerCase()) || "", w = ((B = L.key) == null ? void 0 : B.toLowerCase()) || "";
      return O.includes(g) || w.includes(g);
    }) : e.dataSource;
  }), m = () => {
    const g = !t();
    n(g), i(""), g && e.searchable && setTimeout(() => s == null ? void 0 : s.focus(), 50);
  }, k = (g) => {
    const M = g.relatedTarget;
    d && M && d.contains(M) || (n(!1), i(""));
  };
  return (() => {
    const g = Zs.cloneNode(!0), M = g.firstChild, L = M.firstChild;
    g.addEventListener("blur", k), g.$$click = (w) => {
      w.stopPropagation(), m();
    };
    const O = d;
    return typeof O == "function" ? O1(O, g) : d = g, C(L, () => e.value), C(g, (() => {
      const w = H(() => !!(e.dataSource && e.dataSource.length > 0));
      return () => w() && (() => {
        const D = Vs.cloneNode(!0), B = D.firstChild;
        return D.$$mousedown = (W) => W.preventDefault(), C(D, (() => {
          const W = H(() => !!e.searchable);
          return () => W() && (() => {
            const q = Hs.cloneNode(!0), F = q.firstChild;
            q.style.setProperty("padding", "8px"), q.style.setProperty("border-bottom", "1px solid #333"), F.$$click = (K) => K.stopPropagation(), F.$$input = (K) => i(K.currentTarget.value);
            const R = s;
            return typeof R == "function" ? O1(R, F) : s = F, F.style.setProperty("width", "100%"), F.style.setProperty("padding", "6px 10px"), F.style.setProperty("border", "1px solid var(--klinecharts-pro-border-color)"), F.style.setProperty("border-radius", "4px"), F.style.setProperty("background-color", "var(--klinecharts-pro-popover-background-color)"), F.style.setProperty("color", "#fff"), F.style.setProperty("font-size", "13px"), F.style.setProperty("outline", "none"), I(() => Me(F, "placeholder", e.searchPlaceholder || "Search...")), I(() => F.value = r()), q;
          })();
        })(), B), C(B, () => {
          var W;
          return (W = u()) == null ? void 0 : W.map((q) => {
            const R = q[e.valueKey ?? "text"] ?? q;
            return (() => {
              const K = qs.cloneNode(!0);
              return K.$$click = (pe) => {
                var be;
                pe.stopPropagation(), e.value !== R && ((be = e.onSelected) == null || be.call(e, q)), n(!1), i("");
              }, C(K, R), I(() => K.classList.toggle("selected", e.value === R)), K;
            })();
          });
        }), D;
      })();
    })(), null), I((w) => {
      const D = e.style, B = `klinecharts-pro-select ${e.class ?? ""} ${t() ? "klinecharts-pro-select-show" : ""}`;
      return w._v$ = N1(g, D, w._v$), B !== w._v$2 && oe(g, w._v$2 = B), w;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), g;
  })();
};
Qe(["click", "mousedown", "input"]);
const Ys = /* @__PURE__ */ $('<span class="prefix"></span>'), Gs = /* @__PURE__ */ $('<span class="suffix"></span>'), Ws = /* @__PURE__ */ $('<div><input class="value"></div>'), s9 = (e) => {
  const t = Or({
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER
  }, e);
  let n;
  const [r, i] = T("normal");
  return (() => {
    const s = Ws.cloneNode(!0), d = s.firstChild;
    return s.$$click = () => {
      n == null || n.focus();
    }, C(s, x(V, {
      get when() {
        return t.prefix;
      },
      get children() {
        const u = Ys.cloneNode(!0);
        return C(u, () => t.prefix), u;
      }
    }), d), d.addEventListener("change", (u) => {
      var k, g;
      const m = u.target.value;
      if ("precision" in t) {
        let M;
        const L = Math.max(0, Math.floor(t.precision));
        L <= 0 ? M = new RegExp(/^[1-9]\d*$/) : M = new RegExp("^\\d+\\.?\\d{0," + L + "}$"), (m === "" || M.test(m) && +m >= t.min && +m <= t.max) && ((k = t.onChange) == null || k.call(t, m === "" ? m : +m));
      } else
        (g = t.onChange) == null || g.call(t, m);
    }), d.addEventListener("blur", () => {
      i("normal");
    }), d.addEventListener("focus", () => {
      i("focus");
    }), O1((u) => {
      n = u;
    }, d), C(s, x(V, {
      get when() {
        return t.suffix;
      },
      get children() {
        const u = Gs.cloneNode(!0);
        return C(u, () => t.suffix), u;
      }
    }), null), I((u) => {
      const m = t.style, k = `klinecharts-pro-input ${t.class ?? ""}`, g = r(), M = t.placeholder ?? "";
      return u._v$ = N1(s, m, u._v$), k !== u._v$2 && oe(s, u._v$2 = k), g !== u._v$3 && Me(s, "data-status", u._v$3 = g), M !== u._v$4 && Me(d, "placeholder", u._v$4 = M), u;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0
    }), I(() => d.value = t.value), s;
  })();
};
Qe(["click"]);
const Xs = /* @__PURE__ */ $('<div><i class="thumb"></i></div>'), Js = (e) => (() => {
  const t = Xs.cloneNode(!0);
  return t.$$click = (n) => {
    e.onChange && e.onChange();
  }, I((n) => {
    const r = e.style, i = `klinecharts-pro-switch ${e.open ? "turn-on" : "turn-off"} ${e.class ?? ""}`;
    return n._v$ = N1(t, r, n._v$), i !== n._v$2 && oe(t, n._v$2 = i), n;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
Qe(["click"]);
const e4 = "指标", t4 = "更多", n4 = "主图指标", r4 = "副图指标", o4 = "设置", i4 = "时区", a4 = "截屏", s4 = "全屏", l4 = "退出全屏", c4 = "保存", u4 = "确定", d4 = "取消", h4 = "MA(移动平均线)", f4 = "EMA(指数平滑移动平均线)", y4 = "SMA", g4 = "BOLL(布林线)", m4 = "BBI(多空指数)", p4 = "SAR(停损点指向指标)", C4 = "VOL(成交量)", v4 = "MACD(指数平滑异同移动平均线)", b4 = "KDJ(随机指标)", $4 = "RSI(相对强弱指标)", _4 = "BIAS(乖离率)", k4 = "BRAR(情绪指标)", x4 = "CCI(顺势指标)", L4 = "DMI(动向指标)", w4 = "CR(能量指标)", A4 = "PSY(心理线)", M4 = "DMA(平行线差指标)", T4 = "TRIX(三重指数平滑平均线)", S4 = "OBV(能量潮指标)", P4 = "VR(成交量变异率)", O4 = "WR(威廉指标)", D4 = "MTM(动量指标)", N4 = "EMV(简易波动指标)", I4 = "ROC(变动率指标)", E4 = "PVT(价量趋势指标)", B4 = "AO(动量震荡指标)", F4 = "世界统一时间", U4 = "(UTC-10) 檀香山", z4 = "(UTC-8) 朱诺", K4 = "(UTC-7) 洛杉矶", j4 = "(UTC-5) 芝加哥", Q4 = "(UTC-4) 多伦多", R4 = "(UTC-3) 圣保罗", Z4 = "(UTC+1) 伦敦", V4 = "(UTC+2) 柏林", H4 = "(UTC+3) 巴林", q4 = "(UTC+4) 迪拜", Y4 = "(UTC+5) 阿什哈巴德", G4 = "(UTC+6) 阿拉木图", W4 = "(UTC+7) 曼谷", X4 = "(UTC+8) 上海", J4 = "(UTC+9) 东京", el = "(UTC+10) 悉尼", tl = "(UTC+12) 诺福克岛", nl = "水平直线", rl = "水平射线", ol = "水平线段", il = "垂直直线", al = "垂直射线", sl = "垂直线段", ll = "直线", cl = "射线", ul = "线段", dl = "箭头", hl = "价格线", fl = "价格通道线", yl = "平行直线", gl = "斐波那契回调直线", ml = "斐波那契回调线段", pl = "斐波那契圆环", Cl = "斐波那契螺旋", vl = "斐波那契速度阻力扇", bl = "斐波那契趋势扩展", $l = "江恩箱", _l = "矩形", kl = "平行四边形", xl = "圆", Ll = "三角形", wl = "三浪", Al = "五浪", Ml = "八浪", Tl = "任意浪", Sl = "ABCD形态", Pl = "XABCD形态", Ol = "弱磁模式", Dl = "强磁模式", Nl = "商品搜索", Il = "商品代码", El = "参数1", Bl = "参数2", Fl = "参数3", Ul = "参数4", zl = "参数5", Kl = "周期", jl = "标准差", Ql = "蜡烛图类型", Rl = "全实心", Zl = "全空心", Vl = "涨空心", Hl = "跌空心", ql = "OHLC", Yl = "面积图", Gl = "最新价显示", Wl = "最高价显示", Xl = "最低价显示", Jl = "指标最新值显示", ec = "价格轴类型", tc = "线性轴", nc = "百分比轴", rc = "对数轴", oc = "倒置坐标", ic = "网格线显示", ac = "恢复默认", sc = {
  indicator: e4,
  more: t4,
  main_indicator: n4,
  sub_indicator: r4,
  setting: o4,
  timezone: i4,
  screenshot: a4,
  full_screen: s4,
  exit_full_screen: l4,
  save: c4,
  confirm: u4,
  cancel: d4,
  ma: h4,
  ema: f4,
  sma: y4,
  boll: g4,
  bbi: m4,
  sar: p4,
  vol: C4,
  macd: v4,
  kdj: b4,
  rsi: $4,
  bias: _4,
  brar: k4,
  cci: x4,
  dmi: L4,
  cr: w4,
  psy: A4,
  dma: M4,
  trix: T4,
  obv: S4,
  vr: P4,
  wr: O4,
  mtm: D4,
  emv: N4,
  roc: I4,
  pvt: E4,
  ao: B4,
  utc: F4,
  honolulu: U4,
  juneau: z4,
  los_angeles: K4,
  chicago: j4,
  toronto: Q4,
  sao_paulo: R4,
  london: Z4,
  berlin: V4,
  bahrain: H4,
  dubai: q4,
  ashkhabad: Y4,
  almaty: G4,
  bangkok: W4,
  shanghai: X4,
  tokyo: J4,
  sydney: el,
  norfolk: tl,
  horizontal_straight_line: nl,
  horizontal_ray_line: rl,
  horizontal_segment: ol,
  vertical_straight_line: il,
  vertical_ray_line: al,
  vertical_segment: sl,
  straight_line: ll,
  ray_line: cl,
  segment: ul,
  arrow: dl,
  price_line: hl,
  price_channel_line: fl,
  parallel_straight_line: yl,
  fibonacci_line: gl,
  fibonacci_segment: ml,
  fibonacci_circle: pl,
  fibonacci_spiral: Cl,
  fibonacci_speed_resistance_fan: vl,
  fibonacci_extension: bl,
  gann_box: $l,
  rect: _l,
  parallelogram: kl,
  circle: xl,
  triangle: Ll,
  three_waves: wl,
  five_waves: Al,
  eight_waves: Ml,
  any_waves: Tl,
  abcd: Sl,
  xabcd: Pl,
  weak_magnet: Ol,
  strong_magnet: Dl,
  symbol_search: Nl,
  symbol_code: Il,
  params_1: El,
  params_2: Bl,
  params_3: Fl,
  params_4: Ul,
  params_5: zl,
  period: Kl,
  standard_deviation: jl,
  candle_type: Ql,
  candle_solid: Rl,
  candle_stroke: Zl,
  candle_up_stroke: Vl,
  candle_down_stroke: Hl,
  ohlc: ql,
  area: Yl,
  last_price_show: Gl,
  high_price_show: Wl,
  low_price_show: Xl,
  indicator_last_value_show: Jl,
  price_axis_type: ec,
  normal: tc,
  percentage: nc,
  log: rc,
  reverse_coordinate: oc,
  grid_show: ic,
  restore_default: ac
}, lc = "Indicator", cc = "More", uc = "Main Indicator", dc = "Sub Indicator", hc = "Setting", fc = "Timezone", yc = "Screenshot", gc = "Full Screen", mc = "Exit", pc = "Save", Cc = "Confirm", vc = "Cancel", bc = "MA(Moving Average)", $c = "EMA(Exponential Moving Average)", _c = "SMA", kc = "BOLL(Bolinger Bands)", xc = "BBI(Bull And Bearlndex)", Lc = "SAR(Stop and Reverse)", wc = "VOL(Volume)", Ac = "MACD(Moving Average Convergence / Divergence)", Mc = "KDJ(KDJ Index)", Tc = "RSI(Relative Strength Index)", Sc = "BIAS(Bias Ratio)", Pc = "BRAR(情绪指标)", Oc = "CCI(Commodity Channel Index)", Dc = "DMI(Directional Movement Index)", Nc = "CR(能量指标)", Ic = "PSY(Psychological Line)", Ec = "DMA(Different of Moving Average)", Bc = "TRIX(Triple Exponentially Smoothed Moving Average)", Fc = "OBV(On Balance Volume)", Uc = "VR(Volatility Volume Ratio)", zc = "WR(Williams %R)", Kc = "MTM(Momentum Index)", jc = "EMV(Ease of Movement Value)", Qc = "ROC(Price Rate of Change)", Rc = "PVT(Price and Volume Trend)", Zc = "AO(Awesome Oscillator)", Vc = "UTC", Hc = "(UTC-10) Honolulu", qc = "(UTC-8) Juneau", Yc = "(UTC-7) Los Angeles", Gc = "(UTC-5) Chicago", Wc = "(UTC-4) Toronto", Xc = "(UTC-3) Sao Paulo", Jc = "(UTC+1) London", eu = "(UTC+2) Berlin", tu = "(UTC+3) Bahrain", nu = "(UTC+4) Dubai", ru = "(UTC+5) Ashkhabad", ou = "(UTC+6) Almaty", iu = "(UTC+7) Bangkok", au = "(UTC+8) Shanghai", su = "(UTC+9) Tokyo", lu = "(UTC+10) Sydney", cu = "(UTC+12) Norfolk", uu = "Horizontal Line", du = "Horizontal Ray", hu = "Horizontal Segment", fu = "Vertical Line", yu = "Vertical Ray", gu = "Vertical Segment", mu = "Trend Line", pu = "Ray", Cu = "Segment", vu = "Arrow", bu = "Price Line", $u = "Price Channel Line", _u = "Parallel Line", ku = "Fibonacci Line", xu = "Fibonacci Segment", Lu = "Fibonacci Circle", wu = "Fibonacci Spiral", Au = "Fibonacci Sector", Mu = "Fibonacci Extension", Tu = "Gann Box", Su = "Rect", Pu = "Parallelogram", Ou = "Circle", Du = "Triangle", Nu = "Three Waves", Iu = "Five Waves", Eu = "Eight Waves", Bu = "Any Waves", Fu = "ABCD Pattern", Uu = "XABCD Pattern", zu = "Weak Magnet", Ku = "Strong Magnet", ju = "Symbol Search", Qu = "Symbol Code", Ru = "Parameter 1", Zu = "Parameter 2", Vu = "Parameter 3", Hu = "Parameter 4", qu = "Parameter 5", Yu = "Period", Gu = "Standard Deviation", Wu = "Candle Type", Xu = "Candle Solid", Ju = "Candle Stroke", ed = "Candle Up Stroke", td = "Candle Down Stroke", nd = "OHLC", rd = "Area", od = "Show Last Price", id = "Show Highest Price", ad = "Show Lowest Price", sd = "Show indicator's last value", ld = "Price Axis Type", cd = "Normal", ud = "Percentage", dd = "Log", hd = "Reverse Coordinate", fd = "Show Grids", yd = "Restore Defaults", gd = {
  indicator: lc,
  more: cc,
  main_indicator: uc,
  sub_indicator: dc,
  setting: hc,
  timezone: fc,
  screenshot: yc,
  full_screen: gc,
  exit_full_screen: mc,
  save: pc,
  confirm: Cc,
  cancel: vc,
  ma: bc,
  ema: $c,
  sma: _c,
  boll: kc,
  bbi: xc,
  sar: Lc,
  vol: wc,
  macd: Ac,
  kdj: Mc,
  rsi: Tc,
  bias: Sc,
  brar: Pc,
  cci: Oc,
  dmi: Dc,
  cr: Nc,
  psy: Ic,
  dma: Ec,
  trix: Bc,
  obv: Fc,
  vr: Uc,
  wr: zc,
  mtm: Kc,
  emv: jc,
  roc: Qc,
  pvt: Rc,
  ao: Zc,
  utc: Vc,
  honolulu: Hc,
  juneau: qc,
  los_angeles: Yc,
  chicago: Gc,
  toronto: Wc,
  sao_paulo: Xc,
  london: Jc,
  berlin: eu,
  bahrain: tu,
  dubai: nu,
  ashkhabad: ru,
  almaty: ou,
  bangkok: iu,
  shanghai: au,
  tokyo: su,
  sydney: lu,
  norfolk: cu,
  horizontal_straight_line: uu,
  horizontal_ray_line: du,
  horizontal_segment: hu,
  vertical_straight_line: fu,
  vertical_ray_line: yu,
  vertical_segment: gu,
  straight_line: mu,
  ray_line: pu,
  segment: Cu,
  arrow: vu,
  price_line: bu,
  price_channel_line: $u,
  parallel_straight_line: _u,
  fibonacci_line: ku,
  fibonacci_segment: xu,
  fibonacci_circle: Lu,
  fibonacci_spiral: wu,
  fibonacci_speed_resistance_fan: Au,
  fibonacci_extension: Mu,
  gann_box: Tu,
  rect: Su,
  parallelogram: Pu,
  circle: Ou,
  triangle: Du,
  three_waves: Nu,
  five_waves: Iu,
  eight_waves: Eu,
  any_waves: Bu,
  abcd: Fu,
  xabcd: Uu,
  weak_magnet: zu,
  strong_magnet: Ku,
  symbol_search: ju,
  symbol_code: Qu,
  params_1: Ru,
  params_2: Zu,
  params_3: Vu,
  params_4: Hu,
  params_5: qu,
  period: Yu,
  standard_deviation: Gu,
  candle_type: Wu,
  candle_solid: Xu,
  candle_stroke: Ju,
  candle_up_stroke: ed,
  candle_down_stroke: td,
  ohlc: nd,
  area: rd,
  last_price_show: od,
  high_price_show: id,
  low_price_show: ad,
  indicator_last_value_show: sd,
  price_axis_type: ld,
  normal: cd,
  percentage: ud,
  log: dd,
  reverse_coordinate: hd,
  grid_show: fd,
  restore_default: yd
}, l9 = {
  "zh-CN": sc,
  "en-US": gd
};
function yy(e, t) {
  l9[e] = t;
}
const l = (e, t) => {
  var n;
  return ((n = l9[t]) == null ? void 0 : n[e]) ?? e;
}, md = /* @__PURE__ */ $('<div class="scroll-indicator left"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg></div>'), pd = /* @__PURE__ */ $('<img alt="symbol">'), Cd = /* @__PURE__ */ $('<div class="symbol"><span></span></div>'), vd = /* @__PURE__ */ $('<span class="down-arrow-icon mobile-separate-arrow"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></span>'), bd = /* @__PURE__ */ $('<span class="mobile-more-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg></span>'), $d = /* @__PURE__ */ $('<div class="item tools" title="Time Tools"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M16 3v4"></path><path d="M8 3v4"></path><path d="M3 10h18"></path><path d="M12 14v4"></path><path d="M10 16h4"></path></svg></div>'), _d = /* @__PURE__ */ $('<div class="item tools"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div>'), kd = /* @__PURE__ */ $('<div class="klinecharts-pro-order-tools-display-menu"></div>'), xd = /* @__PURE__ */ $('<div class="klinecharts-pro-order-tools-popover"><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Quick Order</span></span><span class="klinecharts-pro-order-tools-chevron">›</span></button><div class="klinecharts-pro-order-tools-submenu"><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Floating Window</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Plus Button</span></label></div></div><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Open Orders</span></span><span class="klinecharts-pro-order-tools-chevron">&rsaquo;</span></button><div class="klinecharts-pro-order-tools-submenu"><div class="klinecharts-pro-order-tools-setting-row"><span class="klinecharts-pro-order-tools-label">Extended Price Line</span><button type="button"><span></span></button></div><div class="klinecharts-pro-order-tools-setting-row"><span class="klinecharts-pro-order-tools-label">Display</span><div class="klinecharts-pro-order-tools-display"><button type="button" class="klinecharts-pro-order-tools-display-button"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4"></path></svg></button></div></div></div></div><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Positions</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Breakeven Price</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Liquidation Price</span></label><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Price Line</span></span><span class="klinecharts-pro-order-tools-chevron">&rsaquo;</span></button><div class="klinecharts-pro-order-tools-submenu"><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Market Price Line</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Count Down</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Bid & Ask Price</span></label></div></div><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Order History</span></label></div>'), Ld = /* @__PURE__ */ $('<div><div class="item tools order-tools-trigger"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Orders"><path d="M4 7h10"></path><path d="M4 12h8"></path><path d="M4 17h6"></path><path d="M18 6v12"></path><path d="M15 15l3 3 3-3"></path></svg><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></div></div>'), wd = /* @__PURE__ */ $('<div class="item tools"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path><path d="M15.22299772857666,9.722223632261718C12.59389772857666,9.722223632261718,10.44600772857666,12.020201374511718,10.44600772857666,14.861111374511719C10.44600772857666,17.70202137451172,12.58215772857666,20.000021374511718,15.223007728576661,20.000021374511718C17.86384772857666,20.000021374511718,19.99999772857666,17.70202137451172,19.99999772857666,14.861111374511719C19.99999772857666,12.020201374511718,17.85211772857666,9.72222212709572,15.22299772857666,9.722223632261718ZM15.22299772857666,18.598491374511717C13.30985772857666,18.598491374511717,11.737087728576661,16.91919137451172,11.737087728576661,14.848481374511719C11.737087728576661,12.777781374511719,13.29811772857666,11.098491374511719,15.22299772857666,11.098491374511719C17.14787772857666,11.098491374511719,18.708917728576658,12.777781374511719,18.708917728576658,14.848481374511719C18.708917728576658,16.91919137451172,17.13614772857666,18.59848137451172,15.22299772857666,18.598491374511717Z"></path><path d="M15.692486288146974,15.050496970825195L15.692486288146974,12.676760970825196C15.692486288146974,12.297972970825196,15.399058288146973,11.982316970825195,15.046945288146972,11.982316970825195C14.694833288146972,11.982316970825195,14.401406288146973,12.297972970825196,14.401406288146973,12.676760970825196L14.401406288146973,15.340896970825195C14.401406288146973,15.530296970825194,14.471829288146973,15.694436970825196,14.589200288146973,15.833326970825196L15.751176288146972,17.095956970825195C15.868546288146973,17.222216970825194,16.032866288146973,17.297976970825196,16.208916288146973,17.297976970825196C16.384976288146973,17.297976970825196,16.537556288146973,17.222216970825194,16.666666288146974,17.095956970825195C16.78403628814697,16.969686970825194,16.854456288146974,16.792916970825196,16.854456288146974,16.603526970825193C16.854456288146974,16.414136970825197,16.78403628814697,16.237366970825196,16.666666288146974,16.111106970825197L15.692486288146974,15.050496970825195Z"></path></svg></div>'), Ad = /* @__PURE__ */ $('<div class="item tools"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg></div>'), Md = /* @__PURE__ */ $('<div class="item tools"><svg viewBox="0 0 20 20"><path d="M6.50977,1L13.4902,1C13.6406,1,13.7695,1.1104910000000001,13.7969,1.2631700000000001L14.0273,2.52277C14.1387,3.13147,14.6543,3.57143,15.2559,3.57143L17.5,3.57143C18.8809,3.57143,20,4.72254,20,6.14286L20,16.4286C20,17.8489,18.8809,19,17.5,19L2.5,19C1.11914,19,0,17.8489,0,16.4286L0,6.14286C0,4.72254,1.11914,3.57143,2.5,3.57143L4.74414,3.57143C5.3457,3.57143,5.86133,3.13147,5.97266,2.52277L6.20312,1.2631700000000001C6.23047,1.1104910000000001,6.35937,1,6.50977,1ZM15.2559,4.857139999999999C14.0547,4.857139999999999,13.0215,3.97522,12.7988,2.75982L12.7129,2.28571L7.28711,2.28571L7.20117,2.75982C6.98047,3.97522,5.94727,4.857139999999999,4.74414,4.857139999999999L2.5,4.857139999999999C1.81055,4.857139999999999,1.25,5.43371,1.25,6.14286L1.25,16.4286C1.25,17.1377,1.81055,17.7143,2.5,17.7143L17.5,17.7143C18.1895,17.7143,18.75,17.1377,18.75,16.4286L18.75,6.14286C18.75,5.43371,18.1895,4.857139999999999,17.5,4.857139999999999L15.2559,4.857139999999999ZM4.375,6.78571L3.125,6.78571C2.7793,6.78571,2.5,6.49844,2.5,6.14286C2.5,5.78728,2.7793,5.5,3.125,5.5L4.375,5.5C4.7207,5.5,5,5.78728,5,6.14286C5,6.49844,4.7207,6.78571,4.375,6.78571ZM10,6.14286C7.06641,6.14286,4.6875,8.58973,4.6875,11.6071C4.6875,14.6246,7.06641,17.0714,10,17.0714C12.9336,17.0714,15.3125,14.6246,15.3125,11.6071C15.3125,8.58973,12.9336,6.14286,10,6.14286ZM10,7.42857C11.0859,7.42857,12.1055,7.8625,12.873,8.65201C13.6406,9.44152,14.0625,10.49018,14.0625,11.6071C14.0625,12.7241,13.6406,13.7728,12.873,14.5623C12.1055,15.3518,11.0859,15.7857,10,15.7857C8.91406,15.7857,7.89453,15.3518,7.12695,14.5623C6.35937,13.7728,5.9375,12.7241,5.9375,11.6071C5.9375,10.49018,6.35938,9.44152,7.12695,8.65201C7.89453,7.8625,8.91406,7.42857,10,7.42857ZM10,9.67857C8.96484,9.67857,8.125,10.54241,8.125,11.6071C8.125,12.6719,8.96484,13.5357,10,13.5357C11.0352,13.5357,11.875,12.6719,11.875,11.6071C11.875,10.54241,11.0352,9.67857,10,9.67857ZM10,10.96429C10.3438,10.96429,10.625,11.2536,10.625,11.6071C10.625,11.9607,10.3438,12.25,10,12.25C9.65625,12.25,9.375,11.9607,9.375,11.6071C9.375,11.2536,9.65625,10.96429,10,10.96429Z"></path></svg></div>'), Td = /* @__PURE__ */ $('<div class="item tools chart-view-toggle"></div>'), Sd = /* @__PURE__ */ $('<div class="scroll-indicator right"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"></path></svg></div>'), Pd = /* @__PURE__ */ $('<div><div class="klinecharts-pro-period-bar"><div class="menu-container"><svg viewBox="0 0 1024 1024"><path d="M192.037 287.953h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 479.169H438.553c-17.673 0-32 14.327-32 32s14.327 32 32 32h393.608c17.673 0 32-14.327 32-32s-14.327-32-32-32zM832.161 735.802H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32zM319.028 351.594l-160 160 160 160z"></path></svg></div><div><div class="item tools fullscreen-toggle"></div></div></div></div>'), Od = /* @__PURE__ */ $("<span></span>"), Dd = /* @__PURE__ */ $('<button type="button"></button>'), Nd = /* @__PURE__ */ $('<svg viewBox="0 0 20 20"><path d="M1.08108,0L0,1.079L4.18919,5.27938L2.54826,6.91715L6.9112,6.91715L6.9112,2.56262L5.28957,4.18112L1.08108,0ZM15.8108,5.27938L20,1.079L18.9189,0L14.7104,4.18112L13.0888,2.56262L13.0888,6.91715L17.4517,6.91715L15.8108,5.27938ZM4.16988,14.7014L0.07722,18.8054L1.1583,20L5.27027,15.7996L6.9112,17.4374L6.9112,13.0829L2.54826,13.0829L4.16988,14.7014ZM17.4517,13.0829L13.0888,13.0829L13.0888,17.4374L14.7297,15.7996L18.8417,20L19.9228,18.8054L15.8301,14.7013L17.4517,13.0829Z"></path></svg>'), Id = /* @__PURE__ */ $('<svg viewBox="0 0 20 20"><path d="M2.93444,1.76899L7.57544,6.40999L6.38918,7.59626L1.76899,2.93444L0,4.70343L0,0L4.70343,0L2.93444,1.76899ZM6.40999,12.4037L1.76899,17.0447L0,15.2758L0,19.9792L4.70343,19.9792L2.93444,18.2102L7.57544,13.5692L6.40999,12.4037ZM15.2758,0L17.0447,1.76899L12.4037,6.40999L13.59,7.59626L18.231,2.95526L20,4.72425L20,0L15.2758,0ZM13.5692,12.4037L12.3829,13.59L17.0239,18.231L15.2549,20L19.9792,20L19.9792,15.2758L18.2102,17.0447L13.5692,12.4037Z"></path></svg>'), Ed = /* @__PURE__ */ $('<svg viewBox="0 0 24 24"><path d="M3 20V7l4 3 5-7 5 4h4v13H3Zm5-3 4-5.5 7 5.45V9h-2.7l-3.9-3.1-4.95 6.95L5 10.4V14l3 3Z"></path></svg>'), Bd = /* @__PURE__ */ $('<svg viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M9 4H7v2H5v12h2v2h2v-2h2V6H9zM19 8h-2V4h-2v4h-2v7h2v5h2v-5h2z"></path></svg>'), mr = (e) => e.charAt(0).toUpperCase() + e.slice(1), Fd = (e) => {
  let t, n, r;
  const [i, s] = T(window.innerWidth < 768), [d, u] = T(localStorage.getItem("klinechart_secondary_period") || ""), [m, k] = T(!1), [g, M] = T(!1), [L, O] = T(!1), [w, D] = T(!1), [B, W] = T(!1), [q, F] = T({
    top: 0,
    left: 0,
    minWidth: 220
  }), R = () => {
    s(window.innerWidth < 768), requestAnimationFrame(ne), m() && Ie();
  }, [K, pe] = T(!1), be = () => document.fullscreenElement ?? document.body, ie = () => {
    pe(!!document.fullscreenElement);
  }, [Y, ee] = T(!1), [ae, te] = T(!1), Ie = () => {
    if (!n)
      return;
    const z = n.getBoundingClientRect(), Q = Math.max(220, Math.ceil(z.width)), xe = window.innerWidth, ze = Math.min(Math.max(8, z.right - Q), Math.max(8, xe - Q - 8));
    F({
      top: Math.ceil(z.bottom + 8),
      left: Math.ceil(ze),
      minWidth: Q
    });
  }, Fe = () => {
    M(!1), O(!1), D(!1), W(!1);
  }, Ue = () => {
    k((z) => {
      const Q = !z;
      return Q ? queueMicrotask(Ie) : Fe(), Q;
    });
  }, e1 = (z) => {
    if (!m())
      return;
    const Q = z.target;
    Q && (n != null && n.contains(Q) || r != null && r.contains(Q) || (Fe(), k(!1)));
  }, me = () => {
    m() && Ie();
  }, ne = () => {
    if (!t) {
      ee(!1), te(!1);
      return;
    }
    const z = t, Q = z.scrollWidth > z.clientWidth + 2;
    ee(Q && z.scrollLeft > 2), te(Q && z.scrollLeft + z.clientWidth < z.scrollWidth - 2);
  };
  w0(() => {
    window.addEventListener("resize", R), document.addEventListener("fullscreenchange", ie), document.addEventListener("mousedown", e1), window.addEventListener("scroll", me, !0), document.addEventListener("mozfullscreenchange", ie), document.addEventListener("webkitfullscreenchange", ie), document.addEventListener("msfullscreenchange", ie), t && (t.addEventListener("scroll", ne), setTimeout(ne, 100));
  }), D1(() => {
    window.removeEventListener("resize", R), document.removeEventListener("fullscreenchange", ie), document.removeEventListener("mousedown", e1), window.removeEventListener("scroll", me, !0), document.removeEventListener("mozfullscreenchange", ie), document.removeEventListener("webkitfullscreenchange", ie), document.removeEventListener("msfullscreenchange", ie), t && t.removeEventListener("scroll", ne);
  });
  const $e = H(() => {
    const z = e.periods.filter((Q) => {
      if (!i() || K())
        return !0;
      const xe = e.period.text, ze = d();
      if (Q.text === xe || ze && Q.text === ze)
        return !0;
      if (!ze || ze === xe) {
        const se = e.periods.find((Te) => Te.text !== xe);
        return Q.text === (se == null ? void 0 : se.text);
      }
      return !1;
    }).slice(0, i() && !K() ? 2 : e.periods.length);
    return setTimeout(ne, 50), z;
  });
  let Z = e.period.text;
  return Be(() => {
    const z = e.period.text;
    z !== Z && (i() && (u(Z), localStorage.setItem("klinechart_secondary_period", Z)), Z = z), setTimeout(ne, 50);
  }), Be(() => {
    K(), setTimeout(ne, 100);
  }), Be(() => {
    if (!e.showOrderToolsMenu) {
      k(!1);
      return;
    }
    m() && queueMicrotask(Ie);
  }), (() => {
    const z = Pd.cloneNode(!0), Q = z.firstChild, xe = Q.firstChild, ze = xe.firstChild, se = xe.nextSibling, Te = se.firstChild;
    return z.style.setProperty("position", "relative"), z.style.setProperty("width", "100%"), z.style.setProperty("display", "flex"), z.style.setProperty("align-items", "center"), C(z, x(V, {
      get when() {
        return Y();
      },
      get children() {
        const _ = md.cloneNode(!0);
        return _.$$click = () => t.scrollBy({
          left: -100,
          behavior: "smooth"
        }), _.style.setProperty("position", "absolute"), _.style.setProperty("left", "0"), _.style.setProperty("top", "0"), _.style.setProperty("bottom", "1px"), _.style.setProperty("width", "30px"), _.style.setProperty("display", "flex"), _.style.setProperty("align-items", "center"), _.style.setProperty("justify-content", "center"), _.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), _.style.setProperty("z-index", "10"), _.style.setProperty("cursor", "pointer"), _.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), _;
      }
    }), Q), O1((_) => {
      t = _;
    }, Q), Q.style.setProperty("width", "100%"), Q.style.setProperty("overflow", "auto"), i1(ze, "click", e.onMenuClick, !0), C(Q, x(V, {
      get when() {
        return e.symbol;
      },
      get children() {
        const _ = Cd.cloneNode(!0), ce = _.firstChild;
        return i1(_, "click", e.onSymbolClick, !0), C(_, x(V, {
          get when() {
            return e.symbol.logo;
          },
          get children() {
            const Le = pd.cloneNode(!0);
            return I(() => Me(Le, "src", e.symbol.logo)), Le;
          }
        }), ce), C(ce, () => e.symbol.shortName ?? e.symbol.name ?? e.symbol.ticker), _;
      }
    }), se), C(Q, () => $e().map((_, ce) => {
      const Le = _.text === e.period.text;
      return (() => {
        const s1 = Od.cloneNode(!0);
        return s1.$$click = (ue) => {
          i() && Le && !K() ? (e.onMobilePeriodClick ? e.onMobilePeriodClick(_) : e.onMenuClick(), ue.stopPropagation()) : e.onPeriodChange(_);
        }, oe(s1, `item period ${Le ? "selected" : ""}`), C(s1, () => _.text), s1;
      })();
    }), se), C(Q, x(V, {
      get when() {
        return H(() => !!(i() && !K()))() && $e().length > 1;
      },
      get children() {
        const _ = vd.cloneNode(!0);
        return _.$$click = (ce) => {
          ce.stopPropagation(), e.onMobilePeriodClick ? e.onMobilePeriodClick(e.period) : e.onMenuClick();
        }, _.style.setProperty("margin-left", "4px"), _.style.setProperty("display", "inline-flex"), _.style.setProperty("align-items", "center"), _;
      }
    }), se), C(Q, x(V, {
      get when() {
        return H(() => !!i())() && !K();
      },
      get children() {
        const _ = bd.cloneNode(!0);
        return _.$$click = (ce) => {
          var Le;
          ce.stopPropagation(), (Le = e.onMobileMoreClick) == null || Le.call(e);
        }, _.style.setProperty("margin-left", "8px"), _.style.setProperty("display", "inline-flex"), _.style.setProperty("align-items", "center"), _.style.setProperty("cursor", "pointer"), _.style.setProperty("padding", "0 4px"), _;
      }
    }), se), C(Q, x(V, {
      get when() {
        return !i();
      },
      get children() {
        const _ = $d.cloneNode(!0);
        return i1(_, "click", e.onTimeToolsClick, !0), _;
      }
    }), se), C(Q, x(V, {
      get when() {
        return !i();
      },
      get children() {
        const _ = _d.cloneNode(!0), ce = _.firstChild, Le = ce.nextSibling;
        return i1(_, "click", e.onIndicatorClick, !0), C(Le, () => l("indicator", e.locale)), _;
      }
    }), se), se.style.setProperty("display", "flex"), se.style.setProperty("gap", "4px"), se.style.setProperty("margin-left", "auto"), se.style.setProperty("align-items", "center"), se.style.setProperty("flex", "0 0 auto"), C(se, x(V, {
      get when() {
        return e.showOrderToolsMenu;
      },
      get children() {
        const _ = Ld.cloneNode(!0), ce = _.firstChild, Le = ce.firstChild, s1 = Le.nextSibling;
        return O1((ue) => {
          n = ue;
        }, _), _.style.setProperty("display", "flex"), _.style.setProperty("align-items", "center"), ce.$$click = (ue) => {
          ue.stopPropagation(), Ue();
        }, ce.style.setProperty("gap", "6px"), s1.style.setProperty("transition", "transform 0.2s ease"), C(_, x(V, {
          get when() {
            return m();
          },
          get children() {
            return x(r5, {
              get mount() {
                return be();
              },
              get children() {
                const ue = xd.cloneNode(!0), y1 = ue.firstChild, l1 = y1.firstChild, X1 = l1.firstChild, Pe = X1.firstChild, mt = Pe.firstChild, E1 = l1.nextSibling, b1 = E1.firstChild, $1 = b1.firstChild, t1 = $1.firstChild, pt = b1.nextSibling, Re = pt.firstChild, J1 = Re.firstChild, et = y1.nextSibling, g1 = et.firstChild, _1 = g1.firstChild, tt = _1.firstChild, Ct = tt.firstChild, B1 = g1.nextSibling, nt = B1.firstChild, rt = nt.firstChild, Ee = rt.nextSibling, Ke = nt.nextSibling, Ve = Ke.firstChild, je = Ve.nextSibling, ot = je.firstChild, F1 = ot.firstChild, U1 = et.nextSibling, vt = U1.firstChild, ve = vt.firstChild, Oe = U1.nextSibling, bt = Oe.nextSibling, He = bt.firstChild, m1 = He.firstChild, p1 = bt.nextSibling, $t = p1.nextSibling, k1 = $t.firstChild, _t = k1.firstChild, qe = $t.nextSibling, x1 = qe.firstChild, r0 = x1.firstChild, L1 = r0.firstChild, w1 = L1.firstChild, Ye = x1.nextSibling, kt = Ye.firstChild, xt = kt.firstChild, c1 = xt.firstChild, z1 = kt.nextSibling, o0 = z1.firstChild, Lt = o0.firstChild, i0 = z1.nextSibling, it = i0.firstChild, at = it.firstChild, A1 = qe.nextSibling, a0 = A1.firstChild, u1 = a0.firstChild;
                return ue.$$mousedown = (v) => v.stopPropagation(), O1((v) => {
                  r = v;
                }, ue), ue.style.setProperty("position", "fixed"), ue.style.setProperty("z-index", "9999"), l1.$$click = (v) => {
                  v.preventDefault(), v.stopPropagation(), M((S) => !S);
                }, Pe.$$mousedown = (v) => v.stopPropagation(), Pe.$$click = (v) => v.stopPropagation(), mt.addEventListener("change", (v) => {
                  var S;
                  v.stopPropagation(), M(!0), (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    quickOrder: v.currentTarget.checked
                  });
                }), t1.addEventListener("change", (v) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    quickOrderFloatingWindow: v.currentTarget.checked
                  });
                }), J1.addEventListener("change", (v) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    quickOrderPlusButton: v.currentTarget.checked
                  });
                }), g1.$$click = (v) => {
                  v.preventDefault(), v.stopPropagation(), O((S) => !S), D(!1);
                }, tt.$$mousedown = (v) => v.stopPropagation(), tt.$$click = (v) => v.stopPropagation(), Ct.addEventListener("change", (v) => {
                  var S;
                  v.stopPropagation(), O(!0), (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    openOrders: v.currentTarget.checked
                  });
                }), Ee.$$click = (v) => {
                  var S, we;
                  v.preventDefault(), v.stopPropagation(), (we = e.onOrderToolsStateChange) == null || we.call(e, {
                    openOrdersExtendedPriceLine: !(((S = e.orderToolsState) == null ? void 0 : S.openOrdersExtendedPriceLine) ?? !0)
                  });
                }, ot.$$click = (v) => {
                  v.preventDefault(), v.stopPropagation(), D((S) => !S);
                }, C(ot, () => {
                  var v;
                  return mr(((v = e.orderToolsState) == null ? void 0 : v.openOrdersDisplay) ?? "right");
                }, F1), C(je, x(V, {
                  get when() {
                    return w();
                  },
                  get children() {
                    const v = kd.cloneNode(!0);
                    return C(v, () => ["left", "center", "right"].map((S) => (() => {
                      const we = Dd.cloneNode(!0);
                      return we.$$click = (Ae) => {
                        var n1;
                        Ae.preventDefault(), Ae.stopPropagation(), (n1 = e.onOrderToolsStateChange) == null || n1.call(e, {
                          openOrdersDisplay: S
                        }), D(!1);
                      }, C(we, () => mr(S)), I(() => {
                        var Ae;
                        return oe(we, (((Ae = e.orderToolsState) == null ? void 0 : Ae.openOrdersDisplay) ?? "right") === S ? "selected" : "");
                      }), we;
                    })())), v;
                  }
                }), null), ve.addEventListener("change", (v) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    positions: v.currentTarget.checked
                  });
                }), m1.addEventListener("change", (v) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    breakevenPrice: v.currentTarget.checked
                  });
                }), _t.addEventListener("change", (v) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    liquidationPrice: v.currentTarget.checked
                  });
                }), x1.$$click = (v) => {
                  v.preventDefault(), v.stopPropagation(), W((S) => !S);
                }, L1.$$mousedown = (v) => v.stopPropagation(), L1.$$click = (v) => v.stopPropagation(), w1.addEventListener("change", (v) => {
                  var S;
                  v.stopPropagation(), W(!0), (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    priceLine: v.currentTarget.checked
                  });
                }), c1.addEventListener("change", (v) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    marketPriceLine: v.currentTarget.checked
                  });
                }), Lt.addEventListener("change", (v) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    countDown: v.currentTarget.checked
                  });
                }), at.addEventListener("change", (v) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    bidAskPrice: v.currentTarget.checked
                  });
                }), u1.addEventListener("change", (v) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    orderHistory: v.currentTarget.checked
                  });
                }), I((v) => {
                  var lt;
                  const S = `${q().top}px`, we = `${q().left}px`, Ae = `${q().minWidth}px`, n1 = `klinecharts-pro-order-tools-group${g() ? " klinecharts-pro-order-tools-group-open" : ""}`, M1 = `klinecharts-pro-order-tools-group${L() ? " klinecharts-pro-order-tools-group-open" : ""}`, wt = `klinecharts-pro-order-tools-switch${((lt = e.orderToolsState) == null ? void 0 : lt.openOrdersExtendedPriceLine) ?? !0 ? " klinecharts-pro-order-tools-switch-on" : ""}`, At = `klinecharts-pro-order-tools-display-arrow${w() ? " klinecharts-pro-order-tools-display-arrow-open" : ""}`, st = `klinecharts-pro-order-tools-group${B() ? " klinecharts-pro-order-tools-group-open" : ""}`;
                  return S !== v._v$ && ue.style.setProperty("top", v._v$ = S), we !== v._v$2 && ue.style.setProperty("left", v._v$2 = we), Ae !== v._v$3 && ue.style.setProperty("width", v._v$3 = Ae), n1 !== v._v$4 && oe(y1, v._v$4 = n1), M1 !== v._v$5 && oe(et, v._v$5 = M1), wt !== v._v$6 && oe(Ee, v._v$6 = wt), At !== v._v$7 && Me(F1, "class", v._v$7 = At), st !== v._v$8 && oe(qe, v._v$8 = st), v;
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
                  var v, S, we, Ae;
                  return mt.checked = (((v = e.orderToolsState) == null ? void 0 : v.quickOrderFloatingWindow) ?? ((S = e.orderToolsState) == null ? void 0 : S.quickOrder) ?? !0) || (((we = e.orderToolsState) == null ? void 0 : we.quickOrderPlusButton) ?? ((Ae = e.orderToolsState) == null ? void 0 : Ae.quickOrder) ?? !0);
                }), I(() => {
                  var v, S;
                  return t1.checked = ((v = e.orderToolsState) == null ? void 0 : v.quickOrderFloatingWindow) ?? ((S = e.orderToolsState) == null ? void 0 : S.quickOrder) ?? !0;
                }), I(() => {
                  var v, S;
                  return J1.checked = ((v = e.orderToolsState) == null ? void 0 : v.quickOrderPlusButton) ?? ((S = e.orderToolsState) == null ? void 0 : S.quickOrder) ?? !0;
                }), I(() => {
                  var v;
                  return Ct.checked = ((v = e.orderToolsState) == null ? void 0 : v.openOrders) ?? !0;
                }), I(() => {
                  var v;
                  return ve.checked = ((v = e.orderToolsState) == null ? void 0 : v.positions) ?? !0;
                }), I(() => {
                  var v;
                  return m1.checked = ((v = e.orderToolsState) == null ? void 0 : v.breakevenPrice) ?? !0;
                }), I(() => {
                  var v;
                  return _t.checked = ((v = e.orderToolsState) == null ? void 0 : v.liquidationPrice) ?? !0;
                }), I(() => {
                  var v, S, we, Ae, n1, M1;
                  return w1.checked = (((v = e.orderToolsState) == null ? void 0 : v.marketPriceLine) ?? ((S = e.orderToolsState) == null ? void 0 : S.priceLine) ?? !0) || (((we = e.orderToolsState) == null ? void 0 : we.countDown) ?? ((Ae = e.orderToolsState) == null ? void 0 : Ae.priceLine) ?? !0) || (((n1 = e.orderToolsState) == null ? void 0 : n1.bidAskPrice) ?? ((M1 = e.orderToolsState) == null ? void 0 : M1.priceLine) ?? !0);
                }), I(() => {
                  var v, S;
                  return c1.checked = ((v = e.orderToolsState) == null ? void 0 : v.marketPriceLine) ?? ((S = e.orderToolsState) == null ? void 0 : S.priceLine) ?? !0;
                }), I(() => {
                  var v, S;
                  return Lt.checked = ((v = e.orderToolsState) == null ? void 0 : v.countDown) ?? ((S = e.orderToolsState) == null ? void 0 : S.priceLine) ?? !0;
                }), I(() => {
                  var v, S;
                  return at.checked = ((v = e.orderToolsState) == null ? void 0 : v.bidAskPrice) ?? ((S = e.orderToolsState) == null ? void 0 : S.priceLine) ?? !0;
                }), I(() => {
                  var v;
                  return u1.checked = ((v = e.orderToolsState) == null ? void 0 : v.orderHistory) ?? !0;
                }), ue;
              }
            });
          }
        }), null), I((ue) => {
          const y1 = i() ? "0 8px" : "0 10px", l1 = m() ? "rotate(180deg)" : "rotate(0deg)";
          return y1 !== ue._v$9 && ce.style.setProperty("padding", ue._v$9 = y1), l1 !== ue._v$10 && s1.style.setProperty("transform", ue._v$10 = l1), ue;
        }, {
          _v$9: void 0,
          _v$10: void 0
        }), _;
      }
    }), Te), C(se, x(V, {
      get when() {
        return !i();
      },
      get children() {
        return [(() => {
          const _ = wd.cloneNode(!0);
          return i1(_, "click", e.onTimezoneClick, !0), _;
        })(), (() => {
          const _ = Ad.cloneNode(!0);
          return i1(_, "click", e.onSettingClick, !0), _;
        })()];
      }
    }), Te), C(se, x(V, {
      get when() {
        return !i();
      },
      get children() {
        const _ = Md.cloneNode(!0);
        return i1(_, "click", e.onScreenshotClick, !0), _;
      }
    }), Te), Te.$$click = () => {
      if (K())
        (document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen).call(document);
      else {
        const _ = t == null ? void 0 : t.closest(".klinecharts-pro");
        _ && ((_ == null ? void 0 : _.requestFullscreen) ?? (_ == null ? void 0 : _.webkitRequestFullscreen) ?? (_ == null ? void 0 : _.mozRequestFullScreen) ?? (_ == null ? void 0 : _.msRequestFullscreen)).call(_);
      }
    }, C(Te, (() => {
      const _ = H(() => !!K());
      return () => _() ? Nd.cloneNode(!0) : Id.cloneNode(!0);
    })()), C(se, x(V, {
      get when() {
        return H(() => !!e.chartViewToggle)() && !K();
      },
      get children() {
        const _ = Td.cloneNode(!0);
        return i1(_, "click", e.chartViewToggle.onToggle, !0), C(_, (() => {
          const ce = H(() => e.chartViewToggle.view === "chart");
          return () => ce() ? Ed.cloneNode(!0) : Bd.cloneNode(!0);
        })()), I(() => Me(_, "title", e.chartViewToggle.view === "chart" ? "View Depth" : "View Chart")), _;
      }
    }), null), C(z, x(V, {
      get when() {
        return ae();
      },
      get children() {
        const _ = Sd.cloneNode(!0);
        return _.$$click = () => t.scrollBy({
          left: 100,
          behavior: "smooth"
        }), _.style.setProperty("position", "absolute"), _.style.setProperty("right", "0"), _.style.setProperty("top", "0"), _.style.setProperty("bottom", "1px"), _.style.setProperty("width", "30px"), _.style.setProperty("display", "flex"), _.style.setProperty("align-items", "center"), _.style.setProperty("justify-content", "center"), _.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), _.style.setProperty("z-index", "10"), _.style.setProperty("cursor", "pointer"), _.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), _;
      }
    }), null), I((_) => {
      const ce = e.spread ? "" : "rotate", Le = K() ? "0px" : "var(--klinecharts-pro-period-bar-padding-right)";
      return ce !== _._v$11 && Me(ze, "class", _._v$11 = ce), Le !== _._v$12 && se.style.setProperty("padding-right", _._v$12 = Le), _;
    }, {
      _v$11: void 0,
      _v$12: void 0
    }), z;
  })();
};
Qe(["click", "mousedown"]);
const Ud = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M12.41465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L12.41465,12C12.20873,12.5826,11.65311,13,11,13C10.34689,13,9.79127,12.5826,9.58535,12L3.5,12C3.223857,12,3,11.77614,3,11.5C3,11.22386,3.223857,11,3.5,11L9.58535,11C9.79127,10.417404,10.34689,10,11,10C11.65311,10,12.20873,10.417404,12.41465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), zd = () => Ud.cloneNode(!0), Kd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,11L11.08535,11C11.29127,10.417404,11.84689,10,12.5,10C13.15311,10,13.70873,10.417404,13.91465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L13.91465,12C13.70873,12.5826,13.15311,13,12.5,13C11.84689,13,11.29127,12.5826,11.08535,12L6.91465,12C6.70873,12.5826,6.15311,13,5.5,13C4.671573,13,4,12.32843,4,11.5C4,10.671573,4.671573,10,5.5,10C6.15311,10,6.70873,10.417404,6.91465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), jd = () => Kd.cloneNode(!0), Qd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,12.5C6.70873,13.0826,6.15311,13.5,5.5,13.5C4.671573,13.5,4,12.82843,4,12C4,11.171573,4.671573,10.5,5.5,10.5C6.15311,10.5,6.70873,10.917404,6.91465,11.5L16.0853,11.5C16.2913,10.917404,16.846899999999998,10.5,17.5,10.5C18.328400000000002,10.5,19,11.171573,19,12C19,12.82843,18.328400000000002,13.5,17.5,13.5C16.846899999999998,13.5,16.2913,13.0826,16.0853,12.5L6.91465,12.5Z" stroke-opacity="0" stroke="none"></path></svg>'), Rd = () => Qd.cloneNode(!0), Zd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,12.41465L11,18.5C11,18.7761,11.22386,19,11.5,19C11.77614,19,12,18.7761,12,18.5L12,12.41465C12.5826,12.20873,13,11.65311,13,11C13,10.34689,12.5826,9.79127,12,9.58535L12,3.5C12,3.223857,11.77614,3,11.5,3C11.22386,3,11,3.223857,11,3.5L11,9.58535C10.417404,9.79127,10,10.34689,10,11C10,11.65311,10.417404,12.20873,11,12.41465Z" stroke-opacity="0" stroke="none"></path></svg>'), Vd = () => Zd.cloneNode(!0), Hd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.66558837890625,19C10.83716137890625,19,10.16558837890625,18.328400000000002,10.16558837890625,17.5C10.16558837890625,16.846899999999998,10.58298437890625,16.2913,11.16557337890625,16.0854L11.16557337890625,11.91464C10.58298437890625,11.70872,10.16558837890625,11.1531,10.16558837890625,10.5C10.16558837890625,9.8469,10.58298437890625,9.29128,11.16557337890625,9.08536L11.16557337890625,4.5C11.16557337890625,4.223857,11.38942837890625,4,11.66556837890625,4C11.94171837890625,4,12.16556837890625,4.223857,12.16556837890625,4.5L12.16556837890625,9.08535C12.74817837890625,9.291260000000001,13.16558837890625,9.846879999999999,13.16558837890625,10.5C13.16558837890625,11.153120000000001,12.74817837890625,11.708739999999999,12.16556837890625,11.91465L12.16556837890625,16.0854C12.74817837890625,16.2913,13.16558837890625,16.846899999999998,13.16558837890625,17.5C13.16558837890625,18.328400000000002,12.49401837890625,19,11.66558837890625,19Z" stroke-opacity="0" stroke="none"></path></svg>'), qd = () => Hd.cloneNode(!0), Yd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.165603637695312,6.91465C11.748203637695312,6.70873,12.165603637695312,6.15311,12.165603637695312,5.5C12.165603637695312,4.671573,11.494033637695313,4,10.665603637695312,4C9.837176637695313,4,9.165603637695312,4.671573,9.165603637695312,5.5C9.165603637695312,6.15311,9.583007637695312,6.70873,10.165603637695312,6.91465L10.165603637695312,16.0854C9.583007637695312,16.2913,9.165603637695312,16.846899999999998,9.165603637695312,17.5C9.165603637695312,18.328400000000002,9.837176637695313,19,10.665603637695312,19C11.494033637695313,19,12.165603637695312,18.328400000000002,12.165603637695312,17.5C12.165603637695312,16.846899999999998,11.748203637695312,16.2913,11.165603637695312,16.0854L11.165603637695312,6.91465Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Gd = () => Yd.cloneNode(!0), Wd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.146447,15.753C4.9511845,15.9483,4.9511845,16.2649,5.146447,16.4602C5.341709,16.6554,5.658291,16.6554,5.853554,16.4602L8.156600000000001,14.15711C8.352409999999999,14.25082,8.57173,14.3033,8.8033,14.3033C9.631730000000001,14.3033,10.3033,13.63172,10.3033,12.80329C10.3033,12.57172,10.250820000000001,12.352409999999999,10.157119999999999,12.15659L12.156600000000001,10.15711C12.352409999999999,10.250820000000001,12.571729999999999,10.30329,12.8033,10.30329C13.63173,10.30329,14.3033,9.63172,14.3033,8.80329C14.3033,8.57172,14.25082,8.352409999999999,14.15712,8.15659L16.4602,5.853553C16.6554,5.658291,16.6554,5.341709,16.4602,5.146447C16.2649,4.9511843,15.9483,4.9511843,15.753,5.146447L13.45001,7.449479999999999C13.25419,7.35577,13.03487,7.3032900000000005,12.8033,7.3032900000000005C11.97487,7.3032900000000005,11.3033,7.97487,11.3033,8.80329C11.3033,9.03487,11.35578,9.254190000000001,11.44949,9.450009999999999L9.450009999999999,11.449480000000001C9.254190000000001,11.35577,9.03487,11.30329,8.8033,11.30329C7.97487,11.30329,7.3033,11.97487,7.3033,12.80329C7.3033,13.03487,7.35578,13.25419,7.44949,13.45001L5.146447,15.753Z" stroke-opacity="0" stroke="none"></path></svg>'), Xd = () => Wd.cloneNode(!0), Jd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M7.573332939453125,14.54567903564453C7.667042939453125,14.741499035644532,7.719512939453125,14.960809035644532,7.719512939453125,15.19239903564453C7.719512939453125,16.02079903564453,7.047942939453125,16.69239903564453,6.219512939453125,16.69239903564453C5.391085939453125,16.69239903564453,4.719512939453125,16.02079903564453,4.719512939453125,15.19239903564453C4.719512939453125,14.36394903564453,5.391085939453125,13.692379035644532,6.219512939453125,13.692379035644532C6.451092939453125,13.692379035644532,6.670412939453125,13.74485903564453,6.866232939453125,13.83856903564453L9.865702939453126,10.83909903564453C9.771992939453124,10.643279035644532,9.719512939453125,10.42395903564453,9.719512939453125,10.192379035644532C9.719512939453125,9.36394903564453,10.391082939453124,8.692379035644532,11.219512939453125,8.692379035644532C11.451092939453126,8.692379035644532,11.670412939453126,8.74485903564453,11.866232939453125,8.838569035644532L15.462112939453124,5.242645035644531C15.657412939453126,5.047383335644532,15.974012939453125,5.047383335644532,16.169212939453125,5.242645035644531C16.364512939453125,5.437907035644531,16.364512939453125,5.754489035644531,16.169212939453125,5.949752035644531L12.573332939453124,9.545679035644532C12.667042939453125,9.74149903564453,12.719512939453125,9.96080903564453,12.719512939453125,10.192379035644532C12.719512939453125,11.020809035644533,12.047942939453126,11.692379035644532,11.219512939453125,11.692379035644532C10.987942939453125,11.692379035644532,10.768632939453125,11.639909035644532,10.572812939453126,11.54619903564453L7.573332939453125,14.54567903564453Z" stroke-opacity="0" stroke="none"></path></svg>'), eh = () => Jd.cloneNode(!0), th = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M15.719512939453125,8.461776733398438C16.547912939453127,8.461776733398438,17.219512939453125,7.7902067333984375,17.219512939453125,6.9617767333984375C17.219512939453125,6.133349733398438,16.547912939453127,5.4617767333984375,15.719512939453125,5.4617767333984375C14.891082939453124,5.4617767333984375,14.219512939453125,6.133349733398438,14.219512939453125,6.9617767333984375C14.219512939453125,7.193346733398437,14.271992939453124,7.412666733398438,14.365692939453124,7.608486733398438L7.366222939453126,14.607956733398437C7.170402939453125,14.514256733398437,6.951082939453125,14.461776733398438,6.719512939453125,14.461776733398438C5.891085939453125,14.461776733398438,5.219512939453125,15.133346733398437,5.219512939453125,15.961776733398438C5.219512939453125,16.79017673339844,5.891085939453125,17.461776733398438,6.719512939453125,17.461776733398438C7.547942939453125,17.461776733398438,8.219512939453125,16.79017673339844,8.219512939453125,15.961776733398438C8.219512939453125,15.730176733398437,8.167032939453126,15.510876733398437,8.073322939453124,15.315066733398437L15.072802939453124,8.315586733398437C15.268612939453124,8.409296733398438,15.487912939453125,8.461776733398438,15.719512939453125,8.461776733398438Z" stroke-opacity="0" stroke="none"></path></svg>'), nh = () => th.cloneNode(!0), rh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17.0643,7.033864912109375L18,3.585784912109375L14.5078,4.509695912109375L15.3537,5.344934912109375L6.02026,14.560584912109375C5.87635,14.517484912109374,5.72366,14.494284912109375,5.5655,14.494284912109375C4.7009,14.494284912109375,4,15.186384912109375,4,16.040084912109375C4,16.893784912109375,4.7009,17.585784912109375,5.5655,17.585784912109375C6.43011,17.585784912109375,7.13101,16.893784912109375,7.13101,16.040084912109375C7.13101,15.722284912109375,7.03392,15.426984912109376,6.86744,15.181384912109374L16.0917,6.073604912109375L17.0643,7.033864912109375Z" stroke-opacity="0" stroke="none"></path></svg>'), oh = () => rh.cloneNode(!0), ih = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,13.00505L18.5,13.00505C18.7761,13.00505,19,13.228909999999999,19,13.50505C19,13.781189999999999,18.7761,14.00505,18.5,14.00505L6.91465,14.00505C6.70873,14.58765,6.15311,15.00505,5.5,15.00505C4.671573,15.00505,4,14.33348,4,13.50505C4,12.67662,4.671573,12.00505,5.5,12.00505C6.15311,12.00505,6.70873,12.422450000000001,6.91465,13.00505ZM7.81404,11.625L10.48591,11.625L10.48591,10.90625L9.65193,10.90625L9.65193,7.125L8.997630000000001,7.125C8.71443,7.306641,8.415600000000001,7.419922,7.96443,7.498047L7.96443,8.05078L8.77497,8.05078L8.77497,10.90625L7.81404,10.90625L7.81404,11.625ZM11.081620000000001,11.625L14.0562,11.625L14.0562,10.88281L13.09724,10.88281C12.8863,10.88281,12.59333,10.90625,12.36482,10.93555C13.17537,10.11328,13.84724,9.2207,13.84724,8.39062C13.84724,7.541016,13.28865,7,12.4488,7C11.84333,7,11.446850000000001,7.234375,11.03279,7.679688L11.52497,8.16797C11.747630000000001,7.914062,12.0113,7.697266,12.33552,7.697266C12.7613,7.697266,13.00154,7.982422,13.00154,8.43359C13.00154,9.14648,12.29255,10.00781,11.081620000000001,11.11523L11.081620000000001,11.625ZM15.9605,11.75C16.8121,11.75,17.526899999999998,11.2832,17.526899999999998,10.4375C17.526899999999998,9.82031,17.142200000000003,9.43945,16.6441,9.30078L16.6441,9.27148C17.1129,9.08594,17.3824,8.7207,17.3824,8.21289C17.3824,7.421875,16.8004,7,15.9429,7C15.4215,7,14.9957,7.210938,14.6109,7.541016L15.066,8.11133C15.3258,7.849609,15.5836,7.697266,15.9019,7.697266C16.2789,7.697266,16.4957,7.914062,16.4957,8.28125C16.4957,8.70898,16.2301,9,15.4215,9L15.4215,9.63672C16.3804,9.63672,16.6383,9.91992,16.6383,10.38086C16.6383,10.79688,16.3336,11.03125,15.8824,11.03125C15.4742,11.03125,15.1578,10.82227,14.8922,10.55078L14.4781,11.13281C14.7906,11.486329999999999,15.2652,11.75,15.9605,11.75Z" stroke-opacity="0" stroke="none"></path></svg>'), ah = () => ih.cloneNode(!0), sh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.146447,14.178126025390625C2.9511847,13.982826025390626,2.9511847,13.666226025390625,3.146447,13.470926025390625L7.39146,9.225966025390626C7.35417,9.095106025390624,7.33421,8.956946025390625,7.33421,8.814116025390625C7.33421,7.985696025390625,8.00578,7.314116025390625,8.834209999999999,7.314116025390625C8.97703,7.314116025390625,9.11519,7.334086025390625,9.24605,7.371366025390625L13.753,2.864373025390625C13.9483,2.669110325390625,14.2649,2.669110325390625,14.4602,2.864373025390625C14.6554,3.059635025390625,14.6554,3.376217025390625,14.4602,3.571479025390625L10.06916,7.962476025390625C10.23631,8.204386025390626,10.334209999999999,8.497826025390625,10.334209999999999,8.814116025390625C10.334209999999999,9.642546025390626,9.66264,10.314116025390625,8.834209999999999,10.314116025390625C8.51791,10.314116025390625,8.22448,10.216226025390625,7.98256,10.049076025390626L3.853554,14.178126025390625C3.658291,14.373326025390625,3.341709,14.373326025390625,3.146447,14.178126025390625ZM7.67736,19.188526025390626C7.4821,18.993226025390626,7.4821,18.676626025390625,7.67736,18.481426025390626L9.9804,16.178326025390625C9.88669,15.982526025390625,9.834209999999999,15.763226025390624,9.834209999999999,15.531626025390626C9.834209999999999,14.703226025390626,10.50578,14.031626025390626,11.33421,14.031626025390626C11.56579,14.031626025390626,11.78511,14.084126025390624,11.98093,14.177826025390624L13.9804,12.178356025390626C13.8867,11.982536025390624,13.8342,11.763216025390625,13.8342,11.531636025390625C13.8342,10.703206025390624,14.5058,10.031636025390625,15.3342,10.031636025390625C15.5658,10.031636025390625,15.7851,10.084116025390625,15.9809,10.177826025390626L18.284,7.874796025390625C18.4792,7.679536025390625,18.7958,7.679536025390625,18.9911,7.874796025390625C19.1863,8.070056025390624,19.1863,8.386636025390626,18.9911,8.581906025390625L16.688000000000002,10.884936025390624C16.7817,11.080756025390626,16.8342,11.300066025390626,16.8342,11.531636025390625C16.8342,12.360066025390624,16.162599999999998,13.031626025390626,15.3342,13.031626025390626C15.1026,13.031626025390626,14.8833,12.979126025390626,14.6875,12.885426025390625L12.68803,14.884926025390625C12.78174,15.080726025390625,12.83421,15.300026025390626,12.83421,15.531626025390626C12.83421,16.360026025390624,12.16264,17.031626025390626,11.33421,17.031626025390626C11.10264,17.031626025390626,10.88333,16.979126025390627,10.68751,16.885426025390625L8.38446,19.188526025390626C8.1892,19.383726025390626,7.87262,19.383726025390626,7.67736,19.188526025390626Z" stroke-opacity="0" stroke="none"></path></svg>'), lh = () => sh.cloneNode(!0), ch = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.3367688759765626,12.63173C3.5320318759765623,12.82699,3.8486138759765627,12.82699,4.043876875976562,12.63173L11.822052875976562,4.853553C12.017312875976563,4.658291,12.017312875976563,4.341708,11.822052875976562,4.146446C11.626792875976562,3.9511843,11.310202875976563,3.9511843,11.114942875976563,4.146446L3.3367688759765626,11.92462C3.1415071759765625,12.11988,3.1415071759765625,12.43647,3.3367688759765626,12.63173ZM5.001492875976562,17.0351C4.806232875976562,16.8399,4.806232875976562,16.5233,5.001492875976562,16.328L7.304532875976562,14.025C7.210822875976563,13.82916,7.158352875976563,13.60984,7.158352875976563,13.37827C7.158352875976563,12.54984,7.829922875976562,11.87827,8.658352875976561,11.87827C8.889922875976563,11.87827,9.109232875976563,11.93075,9.305052875976562,12.02446L11.304532875976562,10.02498C11.210822875976563,9.82916,11.158352875976561,9.60984,11.158352875976561,9.37827C11.158352875976561,8.54984,11.829922875976562,7.8782700000000006,12.658352875976563,7.8782700000000006C12.889922875976563,7.8782700000000006,13.109232875976563,7.93075,13.305022875976562,8.024460000000001L15.608122875976562,5.72142C15.803322875976562,5.5261499999999995,16.119922875976563,5.5261499999999995,16.315222875976563,5.72142C16.510422875976563,5.9166799999999995,16.510422875976563,6.23326,16.315222875976563,6.42852L14.012122875976562,8.73156C14.105822875976562,8.92738,14.158322875976562,9.1467,14.158322875976562,9.37827C14.158322875976562,10.2067,13.486822875976562,10.87827,12.658352875976563,10.87827C12.426772875976562,10.87827,12.207452875976562,10.82579,12.011642875976563,10.73209L10.012162875976562,12.73156C10.105872875976562,12.92738,10.158352875976561,13.1467,10.158352875976561,13.37827C10.158352875976561,14.2067,9.486772875976563,14.8783,8.658352875976561,14.8783C8.426772875976562,14.8783,8.207452875976562,14.8258,8.011642875976563,14.7321L5.708602875976562,17.0351C5.513342875976562,17.2304,5.196752875976562,17.2304,5.001492875976562,17.0351ZM10.415712875976563,18.328C10.220452875976562,18.5233,9.903862875976563,18.5233,9.708602875976563,18.328C9.513342875976562,18.1328,9.513342875976562,17.816200000000002,9.708602875976563,17.6209L12.304532875976562,15.025C12.210822875976563,14.8292,12.158352875976563,14.6098,12.158352875976563,14.3783C12.158352875976563,13.54984,12.829922875976562,12.87827,13.658322875976562,12.87827C13.889922875976563,12.87827,14.109222875976563,12.93075,14.305022875976562,13.02446L17.486822875976564,9.84274C17.682022875976564,9.64747,17.99862287597656,9.64747,18.19392287597656,9.84274C18.38912287597656,10.038,18.38912287597656,10.35458,18.19392287597656,10.54984L15.012122875976562,13.73156C15.105822875976562,13.92738,15.158322875976562,14.1467,15.158322875976562,14.3783C15.158322875976562,15.2067,14.486822875976562,15.8783,13.658322875976562,15.8783C13.426822875976562,15.8783,13.207422875976562,15.8258,13.011642875976563,15.7321L10.415712875976563,18.328Z" stroke-opacity="0" stroke="none"></path></svg>'), uh = () => ch.cloneNode(!0), dh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M13.1889,6C12.98303,6.582599999999999,12.42741,7,11.7743,7C11.12119,7,10.565570000000001,6.582599999999999,10.35965,6L3.5,6C3.223857,6,3,5.77614,3,5.5C3,5.22386,3.223857,5,3.5,5L10.35965,5C10.565570000000001,4.417404,11.12119,4,11.7743,4C12.42741,4,12.98303,4.417404,13.1889,5L18.5,5C18.7761,5,19,5.22386,19,5.5C19,5.77614,18.7761,6,18.5,6L13.1889,6ZM3,8.5C3,8.22386,3.223857,8,3.5,8L18.5,8C18.7761,8,19,8.22386,19,8.5C19,8.77614,18.7761,9,18.5,9L3.5,9C3.223857,9,3,8.77614,3,8.5ZM3.278549,11.5C3.278549,11.22386,3.502407,11,3.778549,11L18.7785,11C19.0547,11,19.2785,11.22386,19.2785,11.5C19.2785,11.77614,19.0547,12,18.7785,12L3.778549,12C3.502407,12,3.278549,11.77614,3.278549,11.5ZM3.139267,14.5C3.139267,14.2239,3.363124,14,3.6392670000000003,14L18.6393,14C18.915399999999998,14,19.1393,14.2239,19.1393,14.5C19.1393,14.7761,18.915399999999998,15,18.6393,15L3.6392670000000003,15C3.363124,15,3.139267,14.7761,3.139267,14.5ZM13.1889,18C12.98303,18.5826,12.42741,19,11.7743,19C11.12119,19,10.565570000000001,18.5826,10.35965,18L3.778549,18C3.502407,18,3.278549,17.7761,3.278549,17.5C3.278549,17.2239,3.502407,17,3.778549,17L10.35965,17C10.565570000000001,16.4174,11.12119,16,11.7743,16C12.42741,16,12.98303,16.4174,13.1889,17L18.7785,17C19.0547,17,19.2785,17.2239,19.2785,17.5C19.2785,17.7761,19.0547,18,18.7785,18L13.1889,18Z" stroke-opacity="0" stroke="none"></path></svg>'), hh = () => dh.cloneNode(!0), fh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4.91465,6C4.70873,6.582599999999999,4.15311,7,3.5,7C2.671573,7,2,6.32843,2,5.5C2,4.671573,2.671573,4,3.5,4C4.15311,4,4.70873,4.417404,4.91465,5L18.2257,5C18.5018,5,18.7257,5.22386,18.7257,5.5C18.7257,5.77614,18.5018,6,18.2257,6L4.91465,6ZM2.7257,8.5C2.7257,8.22386,2.949558,8,3.2257,8L18.2257,8C18.5018,8,18.7257,8.22386,18.7257,8.5C18.7257,8.77614,18.5018,9,18.2257,9L3.2257,9C2.949558,9,2.7257,8.77614,2.7257,8.5ZM3.00425,11.5C3.00425,11.22386,3.22811,11,3.50425,11L18.5042,11C18.7804,11,19.0042,11.22386,19.0042,11.5C19.0042,11.77614,18.7804,12,18.5042,12L3.50425,12C3.22811,12,3.00425,11.77614,3.00425,11.5ZM2.864967,14.5C2.864967,14.2239,3.08882,14,3.36497,14L18.365,14C18.6411,14,18.865,14.2239,18.865,14.5C18.865,14.7761,18.6411,15,18.365,15L3.36497,15C3.08882,15,2.864967,14.7761,2.864967,14.5ZM20,17.5C20,18.328400000000002,19.3284,19,18.5,19C17.846899999999998,19,17.2913,18.5826,17.0854,18L3.50425,18C3.22811,18,3.00425,17.7761,3.00425,17.5C3.00425,17.2239,3.22811,17,3.50425,17L17.0854,17C17.2913,16.4174,17.846899999999998,16,18.5,16C19.3284,16,20,16.671599999999998,20,17.5Z" stroke-opacity="0" stroke="none"></path></svg>'), yh = () => fh.cloneNode(!0), gh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="5" ry="5" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="3" ry="3" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse></svg>'), mh = () => gh.cloneNode(!0), ph = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3,7.32468C5.90649,3.3893050000000002,11.49833,2.81306,14.6674,6.31944C14.9056,6.1554199999999994,15.192,6.05979,15.5,6.05979C15.845,6.05979,16.1628,6.17974,16.4162,6.381349999999999L18.4509,4.23827L19,4.816615L16.8945,7.03429C16.962600000000002,7.21075,17,7.40319,17,7.60463C17,8.45782,16.328400000000002,9.14947,15.5,9.14947C14.6716,9.14947,14,8.45782,14,7.60463C14,7.36402,14.0534,7.13625,14.1487,6.93322C11.32695,3.748365,6.25159,4.253956,3.612785,7.82695L3,7.32468ZM14.09,15.4717C15.7427,13.78985,16.244500000000002,11.524740000000001,15.5633,9.30134L15.5618,9.30134L16.3012,9.0502C17.072400000000002,11.56646,16.497700000000002,14.158,14.6282,16.0599C12.28737,18.442,8.62386,18.6988,6.41348,16.4501C4.5526,14.5572,4.52076,11.19671,6.36766,9.3177C7.89069,7.76754,10.07544,7.706189999999999,11.56741,9.22363C11.95453,9.61742,12.24817,10.08363,12.43369,10.57677L14.1451,8.77421L14.6942,9.35256L12.64982,11.50582C12.65827,11.59712,12.66295,11.68839,12.66378,11.77936C12.87398,12.04523,13,12.38451,13,12.7541C13,13.60729,12.32843,14.2989,11.5,14.2989C10.67157,14.2989,10,13.60729,10,12.7541C10,11.90091,10.67157,11.20926,11.5,11.20926C11.60387,11.20926,11.70528,11.220130000000001,11.8032,11.240829999999999L11.81763,11.22564C11.69858,10.71874,11.42858,10.21929,11.0284,9.81179C9.844000000000001,8.60765,8.136890000000001,8.65592,6.90822,9.90586C5.37975,11.460930000000001,5.40693,14.288,6.95404,15.8619C8.84598,17.7867,12.03496,17.5626,14.09,15.4717Z" stroke-opacity="0" stroke="none"></path></svg>'), Ch = () => ph.cloneNode(!0), vh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4,17.0854L4,3.5C4,3.223858,4.22386,3,4.5,3C4.77614,3,5,3.223858,5,3.5L5,10L7.57584,10L9.8127,4.46359C9.91614,4.20756,10.20756,4.08386,10.46359,4.1873000000000005C10.71963,4.29075,10.84333,4.58216,10.73988,4.8382000000000005L8.65438,10L11.08535,10C11.29127,9.4174,11.84689,9,12.5,9C12.65154,9,12.79784,9.02247,12.93573,9.06427L16.6464,5.35355C16.8417,5.15829,17.1583,5.15829,17.3536,5.35355C17.5488,5.54882,17.5488,5.8654,17.3536,6.06066L13.7475,9.66675C13.907,9.90508,14,10.19168,14,10.5C14,11.15311,13.5826,11.70873,13,11.91465L13,14.3638L18.3714,12.1936C18.6274,12.09015,18.918799999999997,12.21385,19.0222,12.46989C19.1257,12.72592,19.002,13.0173,18.746000000000002,13.1208L13,15.4423L13,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854ZM6.3729499999999994,17.0413L12,14.7678L12,11.91465C11.88136,11.87271,11.76956,11.81627,11.66675,11.74746L6.3729499999999994,17.0413ZM12,15.8463L6.6694700000000005,18L12,18L12,15.8463ZM6.38629,15.6137L8.250350000000001,11L11,11L6.38629,15.6137ZM5,11L7.17182,11L5,16.3754L5,11Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), bh = () => vh.cloneNode(!0), $h = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17,4.5C17,5.32843,16.328400000000002,6,15.5,6C15.0931,6,14.7241,5.83802,14.4539,5.57503L5.98992,8.32515C5.99658,8.38251,6,8.440850000000001,6,8.5C6,9.15311,5.582599999999999,9.70873,5,9.91465L5,11.08535C5.42621,11.236,5.763999999999999,11.57379,5.91465,12L19.5,12C19.7761,12,20,12.22386,20,12.5C20,12.77614,19.7761,13,19.5,13L5.91465,13C5.70873,13.5826,5.15311,14,4.5,14C3.671573,14,3,13.3284,3,12.5C3,11.84689,3.417404,11.29127,4,11.08535L4,9.91465C3.417404,9.70873,3,9.15311,3,8.5C3,7.67157,3.671573,7,4.5,7C4.90411,7,5.2709,7.15981,5.5406200000000005,7.41967L14.0093,4.66802C14.0032,4.6128599999999995,14,4.5568,14,4.5C14,3.671573,14.6716,3,15.5,3C16.328400000000002,3,17,3.671573,17,4.5ZM4,15.5C4,15.2239,4.22386,15,4.5,15L19.5,15C19.7761,15,20,15.2239,20,15.5C20,15.7761,19.7761,16,19.5,16L4.5,16C4.22386,16,4,15.7761,4,15.5ZM4,18.5C4,18.2239,4.22386,18,4.5,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L4.5,19C4.22386,19,4,18.7761,4,18.5Z" stroke-opacity="0" stroke="none"></path></svg>'), _h = () => $h.cloneNode(!0), kh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M20,3.5C20,4.15311,19.5826,4.70873,19,4.91465L19,18.5C19,18.7761,18.7761,19,18.5,19L4.91465,19C4.70873,19.5826,4.15311,20,3.5,20C2.671573,20,2,19.3284,2,18.5C2,17.846899999999998,2.417404,17.2913,3,17.0854L3,3.5C3,3.22386,3.22386,3,3.5,3L17.0854,3C17.2913,2.417404,17.846899999999998,2,18.5,2C19.3284,2,20,2.671573,20,3.5ZM17.0854,4C17.236,4.42621,17.5738,4.763999999999999,18,4.91465L18,8L14,8L14,4L17.0854,4ZM13,4L13,8L9,8L9,4L13,4ZM13,9L9,9L9,13L13,13L13,9ZM13,14L9,14L9,18L13,18L13,14ZM14,18L14,14L18,14L18,18L14,18ZM18,13L14,13L14,9L18,9L18,13ZM4.91465,18C4.763999999999999,17.5738,4.42621,17.236,4,17.0854L4,14L8,14L8,18L4.91465,18ZM4,8L4,4L8,4L8,8L4,8ZM8,9L8,13L4,13L4,9L8,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), xh = () => kh.cloneNode(!0), Lh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" fill="none" stroke-opacity="1" stroke-width="1"></ellipse></svg>'), wh = () => Lh.cloneNode(!0), Ah = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.57625,6.9981C11.55099,6.999359999999999,11.52557,7,11.5,7C11.34,7,11.18584,6.97495,11.04125,6.9285499999999995L5.55401,16.4327C5.713760000000001,16.5905,5.83826,16.7839,5.91465,17L16.0854,17C16.2187,16.622700000000002,16.4987,16.314700000000002,16.8569,16.1445L11.57625,6.9981ZM12.50759,6.611219999999999C12.81005,6.336790000000001,13,5.94058,13,5.5C13,4.671573,12.32843,4,11.5,4C10.67157,4,10,4.671573,10,5.5C10,5.80059,10.08841,6.08052,10.24066,6.31522L4.64514,16.0069C4.59738,16.002299999999998,4.54896,16,4.5,16C3.671573,16,3,16.671599999999998,3,17.5C3,18.328400000000002,3.671573,19,4.5,19C5.15311,19,5.70873,18.5826,5.91465,18L16.0854,18C16.2913,18.5826,16.846899999999998,19,17.5,19C18.328400000000002,19,19,18.328400000000002,19,17.5C19,16.8365,18.5691,16.2735,17.971899999999998,16.075699999999998L12.50759,6.611219999999999Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Mh = () => Ah.cloneNode(!0), Th = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19,4.5C19,5.15311,18.5826,5.70873,18,5.91465L18,18.5C18,18.7761,17.7761,19,17.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854L4,4.5C4,4.22386,4.22386,4,4.5,4L16.0854,4C16.2913,3.417404,16.846899999999998,3,17.5,3C18.328400000000002,3,19,3.671573,19,4.5ZM5,5L16.0854,5C16.236,5.42621,16.5738,5.763999999999999,17,5.91465L17,18L5.91465,18C5.763999999999999,17.5738,5.42621,17.236,5,17.0854L5,5Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Sh = () => Th.cloneNode(!0), Ph = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19.6401,7.99355C20.4028,7.92291,21,7.2811900000000005,21,6.5C21,5.671573,20.3284,5,19.5,5C18.8469,5,18.2913,5.417404,18.0854,6L7.62067,6C7.34453,6,7.12067,6.22386,7.12067,6.5C7.12067,6.5479,7.12741,6.59423,7.13999,6.63809L3.2294099999999997,15.0243C2.530138,15.1517,2,15.764,2,16.5C2,17.328400000000002,2.671573,18,3.5,18C4.15311,18,4.70873,17.5826,4.91465,17L14.5963,17C14.6456,17.076,14.7162,17.1396,14.8044,17.1807C15.0546,17.2974,15.3521,17.1891,15.4688,16.9388L19.6401,7.99355ZM14.7896,16.0293L18.6551,7.739599999999999C18.3942,7.56144,18.1925,7.30307,18.0854,7L8.0746,7L4.25044,15.2009C4.55701,15.3784,4.79493,15.6613,4.91465,16L14.6207,16C14.68,16,14.7368,16.0103,14.7896,16.0293Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Oh = () => Ph.cloneNode(!0), Dh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.134443814697265,7.494615087890625L8.764323814697265,7.494615087890625L8.764323814697265,3.414215087890625L8.310223814697267,3.414215087890625L7.294603814697266,4.005035087890625L7.289713814697266,4.634915087890625L8.134443814697265,4.149892087890625L8.134443814697265,7.494615087890625ZM18.832003814697266,6.933095087890624Q19.004603814697266,6.635245087890625,19.004603814697266,6.2543850878906255Q19.004603814697266,5.884915087890625,18.845103814697264,5.593575087890625Q18.685503814697267,5.3006050878906255,18.399103814697266,5.136225087890625Q18.114303814697266,4.9702050878906245,17.754603814697266,4.9653250878906245L18.820603814697265,3.840647087890625L18.820603814697265,3.414215087890625L16.519203814697264,3.414215087890625L16.519203814697264,3.939931087890625L18.050803814697264,3.939931087890625L16.719403814697266,5.334785087890625L17.074203814697263,5.7205350878906245Q17.254903814697265,5.484525087890625,17.619503814697268,5.484525087890625Q17.980803814697268,5.484525087890625,18.187503814697266,5.689605087890625Q18.394203814697267,5.894685087890625,18.394203814697267,6.2543850878906255Q18.394203814697267,6.604315087890625,18.187503814697266,6.822415087890625Q17.980803814697268,7.0405150878906255,17.640603814697265,7.0405150878906255Q17.334603814697267,7.0405150878906255,17.124703814697266,6.890775087890625Q16.914703814697265,6.739415087890626,16.820303814697265,6.469225087890624L16.354803814697263,6.744295087890626Q16.480103814697266,7.125155087890625,16.821903814697265,7.341625087890625Q17.165403814697264,7.559725087890625,17.640603814697265,7.559725087890625Q18.039403814697266,7.559725087890625,18.348603814697267,7.393705087890625Q18.659503814697267,7.229315087890625,18.832003814697266,6.933095087890624ZM10.000003814697266,10.634915087890626C10.000003814697266,11.024655087890626,9.851363814697265,11.379685087890625,9.607683814697266,11.646395087890625L12.168903814697266,15.171615087890626C12.275403814697265,15.147615087890625,12.386203814697266,15.134915087890626,12.500003814697266,15.134915087890626C12.596503814697266,15.134915087890626,12.690803814697265,15.144015087890624,12.782303814697265,15.161415087890624L16.108803814697268,11.196955087890625C16.038703814697264,11.023375087890624,16.000003814697266,10.833655087890625,16.000003814697266,10.634915087890626C16.000003814697266,9.806495087890625,16.671603814697264,9.134915087890626,17.500003814697266,9.134915087890626C18.328403814697264,9.134915087890626,19.000003814697266,9.806495087890625,19.000003814697266,10.634915087890626C19.000003814697266,11.463345087890625,18.328403814697264,12.134915087890626,17.500003814697266,12.134915087890626C17.239503814697265,12.134915087890626,16.994503814697268,12.068495087890625,16.781003814697264,11.951675087890624L13.654703814697266,15.677415087890624C13.870303814697266,15.937215087890625,14.000003814697266,16.270915087890625,14.000003814697266,16.634915087890626C14.000003814697266,17.463315087890624,13.328403814697266,18.134915087890626,12.500003814697266,18.134915087890626C11.671573814697265,18.134915087890626,11.000003814697266,17.463315087890624,11.000003814697266,16.634915087890626C11.000003814697266,16.284415087890626,11.120193814697265,15.962015087890626,11.321603814697266,15.706715087890625L8.715393814697265,12.119565087890624C8.645053814697267,12.129685087890625,8.573143814697266,12.134915087890626,8.500003814697266,12.134915087890626C8.162103814697264,12.134915087890626,7.8503038146972655,12.023195087890626,7.599523814697266,11.834665087890626L4.505583814697266,15.521915087890624C4.809213814697266,15.796415087890624,5.000003814697266,16.193415087890624,5.000003814697266,16.634915087890626C5.000003814697266,17.463315087890624,4.328433814697266,18.134915087890626,3.5000038146972656,18.134915087890626C2.6715768146972656,18.134915087890626,2.0000038146972656,17.463315087890624,2.0000038146972656,16.634915087890626C2.0000038146972656,15.806515087890626,2.6715768146972656,15.134915087890626,3.5000038146972656,15.134915087890626C3.508253814697266,15.134915087890626,3.5164838146972657,15.135015087890626,3.524703814697266,15.135115087890625L7.033823814697266,10.953115087890625C7.011673814697265,10.850565087890626,7.000003814697266,10.744105087890624,7.000003814697266,10.634915087890626C7.000003814697266,9.806495087890625,7.671573814697266,9.134915087890626,8.500003814697266,9.134915087890626C9.328433814697267,9.134915087890626,10.000003814697266,9.806495087890625,10.000003814697266,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Nh = () => Dh.cloneNode(!0), Ih = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.13444,7.494615087890625L8.76432,7.494615087890625L8.76432,3.414215087890625L8.310220000000001,3.414215087890625L7.2946,4.005035087890625L7.28971,4.634915087890625L8.13444,4.149892087890625L8.13444,7.494615087890625ZM18.832,6.929835087890625Q19.0046,6.635245087890625,19.0046,6.2543850878906255Q19.0046,5.889805087890625,18.8451,5.5952050878906245Q18.6855,5.3006050878906255,18.3975,5.132965087890625Q18.1094,4.9653250878906245,17.7399,4.9653250878906245Q17.435499999999998,4.9653250878906245,17.1556,5.149245087890625L17.2793,3.939931087890625L18.8304,3.939931087890625L18.8304,3.414215087890625L16.7406,3.414215087890625L16.5094,5.665195087890625L17.0156,5.795405087890625Q17.095399999999998,5.655425087890626,17.2516,5.570795087890625Q17.4095,5.484525087890625,17.6357,5.484525087890625Q17.9694,5.484525087890625,18.1842,5.697745087890625Q18.4007,5.909335087890625,18.4007,6.2543850878906255Q18.4007,6.604315087890625,18.1842,6.822415087890625Q17.9694,7.0405150878906255,17.6292,7.0405150878906255Q17.3298,7.0405150878906255,17.119799999999998,6.890775087890625Q16.9098,6.739415087890626,16.825200000000002,6.474115087890625L16.3597,6.749175087890626Q16.470399999999998,7.110505087890624,16.807299999999998,7.335115087890625Q17.144199999999998,7.559725087890625,17.6292,7.559725087890625Q18.0296,7.559725087890625,18.3438,7.392075087890625Q18.6595,7.224435087890625,18.832,6.929835087890625ZM10,10.634915087890626C10,11.024655087890626,9.85136,11.379685087890625,9.60768,11.646395087890625L12.1689,15.171615087890626C12.2754,15.147615087890625,12.3862,15.134915087890626,12.5,15.134915087890626C12.5965,15.134915087890626,12.6908,15.144015087890624,12.7823,15.161415087890624L16.108800000000002,11.196955087890625C16.0387,11.023375087890624,16,10.833655087890625,16,10.634915087890626C16,9.806495087890625,16.671599999999998,9.134915087890626,17.5,9.134915087890626C18.3284,9.134915087890626,19,9.806495087890625,19,10.634915087890626C19,11.463345087890625,18.3284,12.134915087890626,17.5,12.134915087890626C17.2395,12.134915087890626,16.994500000000002,12.068505087890625,16.781,11.951675087890624L13.6547,15.677415087890624C13.8703,15.937215087890625,14,16.270915087890625,14,16.634915087890626C14,17.463315087890624,13.3284,18.134915087890626,12.5,18.134915087890626C11.67157,18.134915087890626,11,17.463315087890624,11,16.634915087890626C11,16.284415087890626,11.12019,15.962015087890626,11.3216,15.706715087890625L8.71539,12.119565087890624C8.645050000000001,12.129685087890625,8.57314,12.134915087890626,8.5,12.134915087890626C8.162099999999999,12.134915087890626,7.8503,12.023195087890626,7.59952,11.834665087890626L4.50558,15.521915087890624C4.80921,15.796415087890624,5,16.193415087890624,5,16.634915087890626C5,17.463315087890624,4.32843,18.134915087890626,3.5,18.134915087890626C2.671573,18.134915087890626,2,17.463315087890624,2,16.634915087890626C2,15.806515087890626,2.671573,15.134915087890626,3.5,15.134915087890626C3.5082500000000003,15.134915087890626,3.51648,15.135015087890626,3.5247,15.135115087890625L7.03382,10.953115087890625C7.01167,10.850565087890626,7,10.744105087890624,7,10.634915087890626C7,9.806495087890625,7.67157,9.134915087890626,8.5,9.134915087890626C9.32843,9.134915087890626,10,9.806495087890625,10,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Eh = () => Ih.cloneNode(!0), Bh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M18.8532,7.020985087890625Q19.0257,6.734525087890625,19.0257,6.369945087890625Q19.0257,6.020005087890625,18.8499,5.754705087890625Q18.6758,5.489415087890626,18.3649,5.339675087890625Q18.5944,5.209465087890625,18.7214,4.994615087890625Q18.8499,4.779775087890625,18.8499,4.5193550878906255Q18.8499,4.2003480878906245,18.7002,3.951324087890625Q18.5505,3.700673087890625,18.277,3.557444087890625Q18.0052,3.414215087890625,17.6455,3.414215087890625Q17.285800000000002,3.414215087890625,17.0107,3.557444087890625Q16.7357,3.700673087890625,16.5843,3.951324087890625Q16.4346,4.2003480878906245,16.4346,4.5193550878906255Q16.4346,4.779775087890625,16.561500000000002,4.994615087890625Q16.6901,5.209465087890625,16.919600000000003,5.339675087890625Q16.6055,5.489415087890626,16.4297,5.757965087890625Q16.255499999999998,6.024895087890625,16.255499999999998,6.369945087890625Q16.255499999999998,6.734525087890625,16.4297,7.020985087890625Q16.6055,7.305815087890625,16.919600000000003,7.465325087890625Q17.2354,7.624825087890625,17.6455,7.624825087890625Q18.0557,7.624825087890625,18.3682,7.465325087890625Q18.6807,7.305815087890625,18.8532,7.020985087890625ZM8.76432,7.559725087890625L8.13444,7.559725087890625L8.13444,4.214996087890625L7.28971,4.700025087890625L7.2946,4.070139087890625L8.310220000000001,3.479319087890625L8.76432,3.479319087890625L8.76432,7.559725087890625ZM17.1816,4.955555087890625Q17.0042,4.784655087890625,17.0042,4.5095950878906255Q17.0042,4.229645087890625,17.18,4.057119087890625Q17.355800000000002,3.884592087890625,17.6455,3.884592087890625Q17.935200000000002,3.884592087890625,18.1077,4.057119087890625Q18.2803,4.229645087890625,18.2803,4.5095950878906255Q18.2803,4.784655087890625,18.1045,4.955555087890625Q17.930300000000003,5.124825087890625,17.6455,5.124825087890625Q17.3607,5.124825087890625,17.1816,4.955555087890625ZM18.2217,5.7953950878906255Q18.4398,6.005365087890625,18.4398,6.3552950878906245Q18.4398,6.705235087890625,18.2217,6.915195087890625Q18.0052,7.125155087890625,17.6455,7.125155087890625Q17.285800000000002,7.125155087890625,17.067700000000002,6.915195087890625Q16.849600000000002,6.705235087890625,16.849600000000002,6.3552950878906245Q16.849600000000002,6.005365087890625,17.064500000000002,5.7953950878906255Q17.2793,5.585435087890625,17.6455,5.585435087890625Q18.0052,5.585435087890625,18.2217,5.7953950878906255ZM9.60768,11.711495087890626C9.85136,11.444785087890626,10,11.089765087890626,10,10.700025087890625C10,9.871595087890626,9.32843,9.200025087890625,8.5,9.200025087890625C7.67157,9.200025087890625,7,9.871595087890626,7,10.700025087890625C7,10.809205087890625,7.01167,10.915665087890625,7.03382,11.018215087890624L3.5247,15.200215087890625C3.51648,15.200115087890625,3.5082500000000003,15.200015087890625,3.5,15.200015087890625C2.671573,15.200015087890625,2,15.871615087890625,2,16.700015087890627C2,17.528415087890625,2.671573,18.200015087890627,3.5,18.200015087890627C4.32843,18.200015087890627,5,17.528415087890625,5,16.700015087890627C5,16.258515087890625,4.80921,15.861515087890625,4.50558,15.587015087890626L7.59952,11.899765087890625C7.8503,12.088295087890625,8.162099999999999,12.200025087890625,8.5,12.200025087890625C8.57314,12.200025087890625,8.645050000000001,12.194785087890626,8.71539,12.184675087890625L11.3216,15.771815087890625C11.12019,16.027215087890625,11,16.349515087890623,11,16.700015087890627C11,17.528415087890625,11.67157,18.200015087890627,12.5,18.200015087890627C13.3284,18.200015087890627,14,17.528415087890625,14,16.700015087890627C14,16.336015087890623,13.8703,16.002315087890626,13.6547,15.742515087890625L16.781,12.016775087890625C16.994500000000002,12.133605087890626,17.2395,12.200025087890625,17.5,12.200025087890625C18.3284,12.200025087890625,19,11.528445087890624,19,10.700025087890625C19,9.871595087890626,18.3284,9.200025087890625,17.5,9.200025087890625C16.671599999999998,9.200025087890625,16,9.871595087890626,16,10.700025087890625C16,10.898765087890624,16.0387,11.088475087890625,16.108800000000002,11.262055087890625L12.7823,15.226515087890625C12.6908,15.209115087890625,12.5965,15.200015087890625,12.5,15.200015087890625C12.3862,15.200015087890625,12.2754,15.212715087890626,12.1689,15.236715087890625L9.60768,11.711495087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Fh = () => Bh.cloneNode(!0), Uh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M9.474616630859375,7.494615087890625L8.844736630859375,7.494615087890625L8.844736630859375,4.149892087890625L8.000006630859374,4.634915087890625L8.004896630859374,4.005035087890625L9.020516630859376,3.414215087890625L9.474616630859375,3.414215087890625L9.474616630859375,7.494615087890625ZM18.529296630859378,4.8318550878906255Q18.307996630859375,5.028795087890625,18.122396630859377,5.385245087890625Q17.868496630859376,5.019035087890625,17.629196630859376,4.8269750878906255Q17.389996630859375,4.634915087890625,17.168596630859376,4.634915087890625Q16.794296630859375,4.634915087890625,16.522496630859376,4.976715087890625Q16.252296630859377,5.3168850878906255,16.252296630859377,5.7856350878906255Q16.252296630859377,6.218575087890625,16.502896630859375,6.521315087890625Q16.755196630859373,6.822415087890625,17.114896630859377,6.822415087890625Q17.368796630859375,6.822415087890625,17.588596630859374,6.625475087890624Q17.809896630859377,6.428535087890625,17.998696630859374,6.0688350878906245Q18.249396630859373,6.439935087890625,18.488596630859377,6.631985087890625Q18.727896630859377,6.822415087890625,18.952496630859375,6.822415087890625Q19.326796630859373,6.822415087890625,19.596996630859376,6.482245087890625Q19.868796630859375,6.140455087890626,19.868796630859375,5.671705087890626Q19.868796630859375,5.238755087890625,19.618196630859376,4.937655087890625Q19.367496630859375,4.634915087890625,19.006196630859375,4.634915087890625Q18.750696630859377,4.634915087890625,18.529296630859378,4.8318550878906255ZM18.337296630859377,5.674955087890625L18.278696630859375,5.596835087890625Q18.449596630859375,5.272935087890625,18.622096630859374,5.1101750878906245Q18.794596630859374,4.947415087890625,18.967096630859373,4.947415087890625Q19.194996630859375,4.947415087890625,19.346396630859374,5.1345950878906255Q19.497696630859377,5.320135087890625,19.497696630859377,5.598455087890625Q19.497696630859377,5.8914250878906245,19.360996630859376,6.096505087890625Q19.224296630859374,6.301585087890626,19.027396630859375,6.301585087890626Q18.915096630859374,6.301585087890626,18.742496630859375,6.146965087890624Q18.569996630859375,5.992335087890625,18.337296630859377,5.674955087890625ZM17.785496630859377,5.779125087890625L17.842496630859372,5.857245087890625Q17.668296630859373,6.186025087890625,17.495796630859374,6.348785087890625Q17.324896630859374,6.509915087890625,17.153996630859375,6.509915087890625Q16.926096630859377,6.509915087890625,16.774796630859377,6.324375087890624Q16.623396630859375,6.137195087890625,16.623396630859375,5.858875087890625Q16.623396630859375,5.565905087890625,16.761696630859376,5.360825087890625Q16.900096630859373,5.1557550878906255,17.095396630859376,5.1557550878906255Q17.228896630859374,5.1557550878906255,17.365596630859375,5.2778250878906245Q17.502296630859377,5.399895087890625,17.785496630859377,5.779125087890625ZM10.710296630859375,10.634915087890626C10.710296630859375,11.024655087890626,10.561656630859375,11.379685087890625,10.317976630859375,11.646395087890625L12.879196630859376,15.171615087890626C12.985696630859374,15.147615087890625,13.096496630859376,15.134915087890626,13.210296630859375,15.134915087890626C13.306796630859376,15.134915087890626,13.401096630859374,15.144015087890624,13.492596630859374,15.161415087890624L16.819096630859377,11.196955087890625C16.748996630859374,11.023375087890624,16.710296630859375,10.833655087890625,16.710296630859375,10.634915087890626C16.710296630859375,9.806495087890625,17.381896630859373,9.134915087890626,18.210296630859375,9.134915087890626C19.038696630859373,9.134915087890626,19.710296630859375,9.806495087890625,19.710296630859375,10.634915087890626C19.710296630859375,11.463345087890625,19.038696630859373,12.134915087890626,18.210296630859375,12.134915087890626C17.949796630859375,12.134915087890626,17.704796630859377,12.068505087890625,17.491296630859374,11.951675087890624L14.364996630859375,15.677415087890624C14.580596630859375,15.937215087890625,14.710296630859375,16.270915087890625,14.710296630859375,16.634915087890626C14.710296630859375,17.463315087890624,14.038696630859375,18.134915087890626,13.210296630859375,18.134915087890626C12.381866630859374,18.134915087890626,11.710296630859375,17.463315087890624,11.710296630859375,16.634915087890626C11.710296630859375,16.284415087890626,11.830486630859374,15.962015087890626,12.031896630859375,15.706715087890625L9.425686630859374,12.119565087890624C9.355346630859376,12.129685087890625,9.283436630859375,12.134915087890626,9.210296630859375,12.134915087890626C8.872396630859374,12.134915087890626,8.560596630859376,12.023195087890626,8.309816630859375,11.834665087890626L5.215876630859375,15.521915087890624C5.519506630859375,15.796415087890624,5.710296630859375,16.193415087890624,5.710296630859375,16.634915087890626C5.710296630859375,17.463315087890624,5.038726630859375,18.134915087890626,4.210296630859375,18.134915087890626C3.381869630859375,18.134915087890626,2.710296630859375,17.463315087890624,2.710296630859375,16.634915087890626C2.710296630859375,15.806515087890626,3.381869630859375,15.134915087890626,4.210296630859375,15.134915087890626C4.218546630859375,15.134915087890626,4.226776630859375,15.135015087890626,4.234996630859375,15.135115087890625L7.744116630859375,10.953115087890625C7.721966630859375,10.850565087890626,7.710296630859375,10.744105087890624,7.710296630859375,10.634915087890626C7.710296630859375,9.806495087890625,8.381866630859374,9.134915087890626,9.210296630859375,9.134915087890626C10.038726630859376,9.134915087890626,10.710296630859375,9.806495087890625,10.710296630859375,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), zh = () => Uh.cloneNode(!0), Kh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M21,5.5C21,6.32843,20.3284,7,19.5,7C19.4136,7,19.3289,6.99269,19.2465,6.97866L15.6257,15.5086C15.8587,15.7729,16,16.119999999999997,16,16.5C16,17.328400000000002,15.3284,18,14.5,18C13.8469,18,13.2913,17.5826,13.0854,17L3.91465,17C3.70873,17.5826,3.15311,18,2.5,18C1.671573,18,1,17.328400000000002,1,16.5C1,15.6716,1.671573,15,2.5,15C2.5840199999999998,15,2.66643,15.0069,2.74668,15.0202L6.36934,6.48574C6.13933,6.22213,6,5.87733,6,5.5C6,4.671573,6.67157,4,7.5,4C8.15311,4,8.70873,4.417404,8.91465,5L18.0854,5C18.2913,4.417404,18.8469,4,19.5,4C20.3284,4,21,4.671573,21,5.5ZM18.0854,6L8.91465,6C8.892579999999999,6.06243,8.8665,6.12296,8.83672,6.18128L13.9814,15.0921C14.143,15.0325,14.3177,15,14.5,15C14.584,15,14.6664,15.0069,14.7467,15.0202L18.3693,6.48574C18.2462,6.3446,18.149,6.1802,18.0854,6ZM13.2036,15.745L8.0861,6.8811800000000005C7.90605,6.95768,7.70797,7,7.5,7C7.41359,7,7.32888,6.99269,7.24647,6.97866L3.62571,15.5086C3.7512,15.651,3.8501,15.8174,3.91465,16L13.0854,16C13.1169,15.9108,13.1566,15.8255,13.2036,15.745Z" stroke-opacity="0" stroke="none"></path></svg>'), jh = () => Kh.cloneNode(!0), Qh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.92159,5.93994C6.04014,5.90529,6.152620000000001,5.85639,6.25704,5.79523L9.12729,9.89437C9.045449999999999,10.07959,9,10.28449,9,10.5C9,10.79522,9.08529,11.07053,9.232569999999999,11.30262L4.97573,16.7511L5.92159,5.93994ZM4.92259,5.8848400000000005C4.38078,5.658659999999999,4,5.1238,4,4.5C4,3.671573,4.67157,3,5.5,3C6.2157,3,6.81433,3.50124,6.96399,4.17183L15.1309,4.88634C15.3654,4.36387,15.8902,4,16.5,4C17.328400000000002,4,18,4.67157,18,5.5C18,6.08983,17.659599999999998,6.60015,17.1645,6.84518L18.4264,14.0018C18.4508,14.0006,18.4753,14,18.5,14C19.3284,14,20,14.6716,20,15.5C20,16.328400000000002,19.3284,17,18.5,17C17.932499999999997,17,17.4386,16.6849,17.183799999999998,16.22L5.99686,18.5979C5.946429999999999,19.3807,5.29554,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.869300000000003,3.389292,17.3295,3.94071,17.1077L4.92259,5.8848400000000005ZM5.72452,17.6334C5.69799,17.596,5.6698,17.5599,5.64004,17.525100000000002L10.01843,11.92103C10.16958,11.97223,10.33155,12,10.5,12C10.80059,12,11.08052,11.91158,11.31522,11.75934L17.0606,15.0765C17.0457,15.1271,17.0335,15.1789,17.023899999999998,15.2317L5.72452,17.6334ZM11.92855,10.95875L17.4349,14.1379L16.1699,6.96356C15.9874,6.92257,15.8174,6.8483,15.6667,6.74746L11.99771,10.4165C11.99923,10.44414,12,10.47198,12,10.5C12,10.66,11.97495,10.814160000000001,11.92855,10.95875ZM10.5,9C10.259830000000001,9,10.03285,9.05644,9.83159,9.15679L7.04919,5.1831L15.0493,5.88302C15.054,5.90072,15.059,5.91829,15.0643,5.9357299999999995L11.56066,9.43934C11.28921,9.16789,10.91421,9,10.5,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Rh = () => Qh.cloneNode(!0), Zh = /* @__PURE__ */ $('<svg viewBox="0 0 22 22"><path d="M4.727219638671875,8.007996215820313L9.973849638671876,2.7629472158203123C10.167279638671875,2.5696791158203123,10.480729638671875,2.5696791158203123,10.674169638671875,2.7629472158203123L13.223329638671874,5.311756215820313C13.416929638671874,5.505236215820313,13.416929638671874,5.8189862158203125,13.223329638671874,6.012466215820313L7.977129638671875,11.257906215820313C7.379859638671875,11.855176215820313,7.407609638671875,12.909396215820312,8.033809638671876,13.535596215820313C8.660409638671876,14.162596215820313,9.713849638671874,14.189996215820312,10.311129638671876,13.591896215820313L15.556929638671875,8.346066215820311C15.750429638671875,8.152526215820313,16.064229638671875,8.152526215820313,16.257629638671872,8.346066215820311L18.806529638671876,10.895266215820312C19.000029638671876,11.088746215820313,19.000029638671876,11.402496215820312,18.806529638671876,11.595976215820313L13.560629638671875,16.841796215820313C11.165619638671876,19.237196215820312,7.197149638671875,19.19919621582031,4.783499638671875,16.785496215820313C2.3698426386718747,14.371896215820312,2.331397638671875,10.403416215820313,4.727219638671875,8.007996215820313ZM12.172299638671875,5.662106215820312L10.323809638671875,3.8136162158203124L5.4287196386718755,8.709096215820313C3.422893638671875,10.714536215820312,3.4549956386718748,14.055196215820313,5.484999638671875,16.08479621582031C7.514609638671875,18.114796215820313,10.855289638671875,18.146496215820314,12.860719638671876,16.141096215820312L15.465629638671874,13.535796215820312L14.090929638671875,12.160756215820312L14.791629638671875,11.460436215820312L16.166229638671876,12.834996215820313L17.755829638671877,11.245226215820313L15.907729638671874,9.396736215820312L11.011839638671875,14.292596215820312C10.042809638671875,15.262396215820312,8.418249638671874,15.243796215820312,7.406019638671875,14.306496215820312L7.333099638671875,14.236296215820312C6.327599638671876,13.230796215820313,6.284009638671876,11.550396215820312,7.276419638671875,10.557586215820312L9.882199638671874,7.952026215820313L8.501079638671875,6.570906215820313L9.201789638671876,5.870186215820313L10.582939638671874,7.251336215820312L12.172299638671875,5.662106215820312Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Vh = (e) => (() => {
  const t = Zh.cloneNode(!0);
  return Me(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), Hh = /* @__PURE__ */ $('<svg viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_615"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_615)"><path d="M19.672,3.0673368C19.4417,2.9354008,19.1463,3.00292252,18.9994,3.2210900000000002L17.4588,5.50622L16.743299999999998,3.781253L13.9915,7.4662L13.9618,7.51108C13.8339,7.72862,13.8936,8.005659999999999,14.1004,8.15391L14.1462,8.183430000000001C14.3683,8.308720000000001,14.6511,8.25001,14.8022,8.047229999999999L16.4907,5.78571L17.246299999999998,7.60713L19.8374,3.7635389999999997L19.8651,3.717088C19.9871,3.484615,19.9023,3.199273,19.672,3.0673368ZM4.79974,8.462530000000001L10.117740000000001,3.252975C10.31381,3.0610145,10.63152,3.0610145,10.82759,3.252975L13.4115,5.78453C13.6076,5.976710000000001,13.6076,6.28833,13.4115,6.4805L8.093869999999999,11.69045C7.48847,12.28368,7.51659,13.3308,8.151309999999999,13.9528C8.786439999999999,14.5755,9.85421,14.6027,10.45961,14.0087L15.7768,8.79831C15.9729,8.60609,16.2909,8.60609,16.487099999999998,8.79831L19.0705,11.33026C19.2667,11.52244,19.2667,11.83406,19.0705,12.02623L13.7533,17.2366C11.32572,19.6158,7.30328,19.578,4.85679,17.1807C2.410298,14.7834,2.371331,10.84174,4.79974,8.462530000000001ZM12.3461,6.1325199999999995L10.47246,4.29654L5.51079,9.15889C3.477674,11.15076,3.510214,14.4688,5.56784,16.4847C7.62506,18.500999999999998,11.01117,18.5325,13.0439,16.540599999999998L15.6842,13.9529L14.2908,12.58718L15.0011,11.89161L16.394399999999997,13.2569L18.0056,11.67786L16.1323,9.84188L11.16985,14.7046C10.18764,15.6679,8.540980000000001,15.6494,7.51498,14.7184L7.44107,14.6487C6.4219,13.65,6.37771,11.98096,7.38362,10.994869999999999L10.02485,8.40693L8.624939999999999,7.03516L9.335180000000001,6.33919L10.73512,7.71099L12.3461,6.1325199999999995Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), qh = (e) => (() => {
  const t = Hh.cloneNode(!0);
  return Me(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), Yh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,17C5.80945,17,3.667717,12.85,3.113386,11.575C2.9622047,11.2,2.9622047,10.8,3.113386,10.425C3.667717,9.15,5.80945,5,11,5C16.165399999999998,5,18.3323,9.15,18.8866,10.425C19.0378,10.8,19.0378,11.2,18.8866,11.575C18.3323,12.85,16.165399999999998,17,11,17ZM4.04567,10.8C3.995276,10.925,3.995276,11.05,4.04567,11.175C4.52441,12.325,6.43937,16,11,16C15.5606,16,17.4756,12.325,17.9543,11.2C18.0047,11.075,18.0047,10.95,17.9543,10.825C17.4756,9.675,15.5606,6,11,6C6.43937,6,4.52441,9.675,4.04567,10.8ZM11,13.5C9.61417,13.5,8.480319999999999,12.375,8.480319999999999,11C8.480319999999999,9.625,9.61417,8.5,11,8.5C12.38583,8.5,13.5197,9.625,13.5197,11C13.5197,12.375,12.38583,13.5,11,13.5ZM11,9.5C10.1685,9.5,9.48819,10.175,9.48819,11C9.48819,11.825,10.1685,12.5,11,12.5C11.8315,12.5,12.51181,11.825,12.51181,11C12.51181,10.175,11.8315,9.5,11,9.5Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), Gh = () => Yh.cloneNode(!0), Wh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.80417,14.9887L4.62563,16.167299999999997C4.43037,16.3625,4.43037,16.6791,4.62563,16.8744C4.82089,17.0696,5.13748,17.0696,5.332739999999999,16.8744L6.62638,15.5807C7.75595,16.290100000000002,9.19328,16.7929,11,16.7929C16.165399999999998,16.7929,18.3323,12.64289,18.8866,11.36789C19.0378,10.99289,19.0378,10.59289,18.8866,10.21789C18.5549,9.45486,17.6456,7.66212,15.8617,6.34545L17.3536,4.853553C17.5488,4.658291,17.5488,4.341709,17.3536,4.146447C17.1583,3.9511845,16.8417,3.9511845,16.6464,4.146447L15.0014,5.7915399999999995C13.9314,5.1969,12.61166,4.792893,11,4.792893C5.80945,4.792893,3.667717,8.94289,3.113386,10.21789C2.9622049,10.59289,2.9622049,10.99289,3.113386,11.36789C3.424435,12.08333,4.2353000000000005,13.70399,5.80417,14.9887ZM7.36012,14.847C8.32327,15.4074,9.52286,15.7929,11,15.7929C15.5606,15.7929,17.4756,12.11789,17.9543,10.99289C18.0047,10.86789,18.0047,10.74289,17.9543,10.61789C17.659,9.90846,16.8171,8.23812,15.1447,7.06241L12.96929,9.23782C13.3134,9.66543,13.5197,10.20642,13.5197,10.79289C13.5197,12.16789,12.38583,13.29289,11,13.29289C10.41596,13.29289,9.87667,13.09308,9.44815,12.75896L7.36012,14.847ZM8.794609999999999,11.99829L6.520099999999999,14.2728C5.06905,13.12119,4.32057,11.628250000000001,4.04567,10.96789C3.995275,10.84289,3.995275,10.71789,4.04567,10.59289C4.52441,9.46789,6.43937,5.79289,11,5.79289C12.28868,5.79289,13.3661,6.086320000000001,14.2596,6.53329L12.19759,8.5953C11.84086,8.40257,11.43271,8.29289,11,8.29289C9.61417,8.29289,8.480319999999999,9.41789,8.480319999999999,10.79289C8.480319999999999,11.22918,8.594470000000001,11.64029,8.794609999999999,11.99829ZM10.16528,12.04183C10.404869999999999,12.20032,10.692070000000001,12.29289,11,12.29289C11.8315,12.29289,12.51181,11.61789,12.51181,10.79289C12.51181,10.48318,12.41593,10.194600000000001,12.25216,9.95494L10.16528,12.04183ZM11.43602,9.35687L9.55616,11.236740000000001C9.512,11.09633,9.48819,10.94724,9.48819,10.79289C9.48819,9.96789,10.1685,9.29289,11,9.29289C11.15142,9.29289,11.29782,9.31528,11.43602,9.35687Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Xh = () => Wh.cloneNode(!0), Jh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_625"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_625)"><path d="M14.5385,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807692,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.88462,4,14.5385,5.61538,14.5385,7.576919999999999L14.5385,9.76923ZM10.88461,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923L13.38462,9.76923L13.38462,7.576919999999999C13.38462,6.23077,12.26923,5.15385,10.88461,5.15385ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.038450000000001,12.07692,11.307680000000001,12.34615,11.307680000000001,12.65385L11.307680000000001,14.5769C11.307680000000001,14.8846,11.038450000000001,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), ef = () => Jh.cloneNode(!0), tf = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_620"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_620)"><path d="M8.38461,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807693,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.46154,4,13.84615,4.961539,14.3462,6.423080000000001C14.4615,6.73077,14.3077,7.038460000000001,14,7.15385C13.69231,7.26923,13.38461,7.11538,13.26923,6.80769C12.92308,5.80769,11.96154,5.15385,10.88462,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.03846,12.07692,11.307690000000001,12.34615,11.307690000000001,12.65385L11.307690000000001,14.5769C11.307690000000001,14.8846,11.03846,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), nf = () => tf.cloneNode(!0), rf = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M16.966900000000003,8.67144C16.6669,8.67144,16.4247,8.91558,16.4247,9.21802L16.4247,16.631500000000003C16.4247,17.322,16.007199999999997,17.9068,15.5139,17.9068L13.93072,17.9068L13.93072,9.2162C13.93072,8.91741,13.68675,8.67144,13.38855,8.67144C13.09036,8.67144,12.84639,8.91741,12.84639,9.21802L12.84639,17.9068L10.151810000000001,17.9068L10.151810000000001,9.21802C10.151810000000001,8.91741,9.90783,8.67144,9.609639999999999,8.67144C9.31145,8.67144,9.06747,8.91741,9.06747,9.219850000000001L9.06747,17.9068L7.48614,17.9068C6.99277,17.9068,6.5753,17.322,6.5753,16.631500000000003L6.5753,9.21802C6.5753,8.91558,6.333130000000001,8.67144,6.03313,8.67144C5.73313,8.67144,5.49096,8.91558,5.49096,9.21802L5.49096,16.631500000000003C5.49096,17.9378,6.385540000000001,19,7.48614,19L15.512,19C16.6127,19,17.509,17.9378,17.509,16.631500000000003L17.509,9.21802C17.509,8.91558,17.2669,8.67144,16.966900000000003,8.67144ZM18.4578,6.21183L4.542169,6.21183C4.243976,6.21183,4,6.45779,4,6.75841C4,7.05903,4.243976,7.30499,4.542169,7.30499L18.4578,7.30499C18.756,7.30499,19,7.05903,19,6.75841C19,6.45779,18.756,6.21183,18.4578,6.21183ZM8.68072,5.10045L14.3193,5.10045C14.6175,5.10045,14.8614,4.852666,14.8614,4.550225C14.8614,4.247783,14.6175,4,14.3193,4L8.68072,4C8.38253,4,8.13855,4.247783,8.13855,4.550225C8.13855,4.852666,8.38253,5.10045,8.68072,5.10045Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), of = () => rf.cloneNode(!0), af = {
  horizontalStraightLine: zd,
  horizontalRayLine: jd,
  horizontalSegment: Rd,
  verticalStraightLine: Vd,
  verticalRayLine: qd,
  verticalSegment: Gd,
  straightLine: Xd,
  rayLine: eh,
  segment: nh,
  arrow: oh,
  priceLine: ah,
  priceChannelLine: lh,
  parallelStraightLine: uh,
  fibonacciLine: hh,
  fibonacciSegment: yh,
  fibonacciCircle: mh,
  fibonacciSpiral: Ch,
  fibonacciSpeedResistanceFan: bh,
  fibonacciExtension: _h,
  gannBox: xh,
  circle: wh,
  triangle: Mh,
  rect: Sh,
  parallelogram: Oh,
  threeWaves: Nh,
  fiveWaves: Eh,
  eightWaves: Fh,
  anyWaves: zh,
  abcd: jh,
  xabcd: Rh,
  weak_magnet: Vh,
  strong_magnet: qh,
  lock: ef,
  unlock: nf,
  visible: Gh,
  invisible: Xh,
  remove: of
};
function sf(e) {
  return [
    { key: "horizontalStraightLine", text: l("horizontal_straight_line", e) },
    { key: "horizontalRayLine", text: l("horizontal_ray_line", e) },
    { key: "horizontalSegment", text: l("horizontal_segment", e) },
    { key: "verticalStraightLine", text: l("vertical_straight_line", e) },
    { key: "verticalRayLine", text: l("vertical_ray_line", e) },
    { key: "verticalSegment", text: l("vertical_segment", e) },
    { key: "straightLine", text: l("straight_line", e) },
    { key: "rayLine", text: l("ray_line", e) },
    { key: "segment", text: l("segment", e) },
    { key: "arrow", text: l("arrow", e) },
    { key: "priceLine", text: l("price_line", e) }
  ];
}
function lf(e) {
  return [
    { key: "priceChannelLine", text: l("price_channel_line", e) },
    { key: "parallelStraightLine", text: l("parallel_straight_line", e) }
  ];
}
function cf(e) {
  return [
    { key: "circle", text: l("circle", e) },
    { key: "rect", text: l("rect", e) },
    { key: "parallelogram", text: l("parallelogram", e) },
    { key: "triangle", text: l("triangle", e) }
  ];
}
function uf(e) {
  return [
    { key: "fibonacciLine", text: l("fibonacci_line", e) },
    { key: "fibonacciSegment", text: l("fibonacci_segment", e) },
    { key: "fibonacciCircle", text: l("fibonacci_circle", e) },
    { key: "fibonacciSpiral", text: l("fibonacci_spiral", e) },
    { key: "fibonacciSpeedResistanceFan", text: l("fibonacci_speed_resistance_fan", e) },
    { key: "fibonacciExtension", text: l("fibonacci_extension", e) },
    { key: "gannBox", text: l("gann_box", e) }
  ];
}
function df(e) {
  return [
    { key: "xabcd", text: l("xabcd", e) },
    { key: "abcd", text: l("abcd", e) },
    { key: "threeWaves", text: l("three_waves", e) },
    { key: "fiveWaves", text: l("five_waves", e) },
    { key: "eightWaves", text: l("eight_waves", e) },
    { key: "anyWaves", text: l("any_waves", e) }
  ];
}
function hf(e) {
  return [
    { key: "weak_magnet", text: l("weak_magnet", e) },
    { key: "strong_magnet", text: l("strong_magnet", e) }
  ];
}
const Ze = (e) => af[e.name](e.class), ff = /* @__PURE__ */ $('<div class="klinecharts-pro-drawing-bar"><span class="split-line"></span><div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div><div class="item"><span style="width:32px;height:32px"></span></div><div class="item"><span style="width:32px;height:32px"></span></div><span class="split-line"></span><div class="item"><span style="width:32px;height:32px"></span></div></div>'), yf = /* @__PURE__ */ $('<div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div>'), pr = /* @__PURE__ */ $('<li><span style="padding-left:8px"></span></li>'), Cr = "drawing_tools", gf = (e) => {
  const [t, n] = T("horizontalStraightLine"), [r, i] = T("priceChannelLine"), [s, d] = T("circle"), [u, m] = T("fibonacciLine"), [k, g] = T("xabcd"), [M, L] = T("weak_magnet"), [O, w] = T("normal"), [D, B] = T(!1), [W, q] = T(!0), [F, R] = T(""), K = H(() => [{
    key: "singleLine",
    icon: t(),
    list: sf(e.locale),
    setter: n
  }, {
    key: "moreLine",
    icon: r(),
    list: lf(e.locale),
    setter: i
  }, {
    key: "polygon",
    icon: s(),
    list: cf(e.locale),
    setter: d
  }, {
    key: "fibonacci",
    icon: u(),
    list: uf(e.locale),
    setter: m
  }, {
    key: "wave",
    icon: k(),
    list: df(e.locale),
    setter: g
  }]), pe = H(() => hf(e.locale));
  return (() => {
    const be = ff.cloneNode(!0), ie = be.firstChild, Y = ie.nextSibling, ee = Y.firstChild, ae = ee.nextSibling, te = ae.firstChild, Ie = Y.nextSibling, Fe = Ie.firstChild, Ue = Ie.nextSibling, e1 = Ue.firstChild, me = Ue.nextSibling, ne = me.nextSibling, $e = ne.firstChild;
    return C(be, () => K().map((Z) => (() => {
      const z = yf.cloneNode(!0), Q = z.firstChild, xe = Q.nextSibling, ze = xe.firstChild;
      return z.addEventListener("blur", () => {
        R("");
      }), Q.$$click = () => {
        e.onDrawingItemClick({
          groupId: Cr,
          name: Z.icon,
          visible: W(),
          lock: D(),
          mode: O()
        });
      }, C(Q, x(Ze, {
        get name() {
          return Z.icon;
        }
      })), xe.$$click = () => {
        Z.key === F() ? R("") : R(Z.key);
      }, C(z, (() => {
        const se = H(() => Z.key === F());
        return () => se() && x(qt, {
          class: "list",
          get children() {
            return Z.list.map((Te) => (() => {
              const _ = pr.cloneNode(!0), ce = _.firstChild;
              return _.$$click = () => {
                Z.setter(Te.key), e.onDrawingItemClick({
                  name: Te.key,
                  lock: D(),
                  mode: O()
                }), R("");
              }, C(_, x(Ze, {
                get name() {
                  return Te.key;
                }
              }), ce), C(ce, () => Te.text), _;
            })());
          }
        });
      })(), null), I(() => Me(ze, "class", Z.key === F() ? "rotate" : "")), z;
    })()), ie), Y.addEventListener("blur", () => {
      R("");
    }), ee.$$click = () => {
      let Z = M();
      O() !== "normal" && (Z = "normal"), w(Z), e.onModeChange(Z);
    }, C(ee, (() => {
      const Z = H(() => M() === "weak_magnet");
      return () => Z() ? (() => {
        const z = H(() => O() === "weak_magnet");
        return () => z() ? x(Ze, {
          name: "weak_magnet",
          class: "selected"
        }) : x(Ze, {
          name: "weak_magnet"
        });
      })() : (() => {
        const z = H(() => O() === "strong_magnet");
        return () => z() ? x(Ze, {
          name: "strong_magnet",
          class: "selected"
        }) : x(Ze, {
          name: "strong_magnet"
        });
      })();
    })()), ae.$$click = () => {
      F() === "mode" ? R("") : R("mode");
    }, C(Y, (() => {
      const Z = H(() => F() === "mode");
      return () => Z() && x(qt, {
        class: "list",
        get children() {
          return pe().map((z) => (() => {
            const Q = pr.cloneNode(!0), xe = Q.firstChild;
            return Q.$$click = () => {
              L(z.key), w(z.key), e.onModeChange(z.key), R("");
            }, C(Q, x(Ze, {
              get name() {
                return z.key;
              }
            }), xe), C(xe, () => z.text), Q;
          })());
        }
      });
    })(), null), Fe.$$click = () => {
      const Z = !D();
      B(Z), e.onLockChange(Z);
    }, C(Fe, (() => {
      const Z = H(() => !!D());
      return () => Z() ? x(Ze, {
        name: "lock"
      }) : x(Ze, {
        name: "unlock"
      });
    })()), e1.$$click = () => {
      const Z = !W();
      q(Z), e.onVisibleChange(Z);
    }, C(e1, (() => {
      const Z = H(() => !!W());
      return () => Z() ? x(Ze, {
        name: "visible"
      }) : x(Ze, {
        name: "invisible"
      });
    })()), $e.$$click = () => {
      e.onRemoveClick(Cr);
    }, C($e, x(Ze, {
      name: "remove"
    })), I(() => Me(te, "class", F() === "mode" ? "rotate" : "")), be;
  })();
};
Qe(["click"]);
const vr = /* @__PURE__ */ $('<li class="title"></li>'), br = /* @__PURE__ */ $('<li class="row"></li>'), mf = (e) => x(v1, {
  get title() {
    return l("indicator", e.locale);
  },
  width: 400,
  get onClose() {
    return e.onClose;
  },
  get children() {
    return x(qt, {
      class: "klinecharts-pro-indicator-modal-list",
      get children() {
        return [(() => {
          const t = vr.cloneNode(!0);
          return C(t, () => l("main_indicator", e.locale)), t;
        })(), H(() => ["MA", "EMA", "SMA", "BOLL", "SAR", "BBI"].map((t) => {
          const n = e.mainIndicators.includes(t);
          return (() => {
            const r = br.cloneNode(!0);
            return r.$$click = (i) => {
              e.onMainIndicatorChange({
                name: t,
                paneId: "candle_pane",
                added: !n
              });
            }, C(r, x(gr, {
              checked: n,
              get label() {
                return l(t.toLowerCase(), e.locale);
              }
            })), r;
          })();
        })), (() => {
          const t = vr.cloneNode(!0);
          return C(t, () => l("sub_indicator", e.locale)), t;
        })(), H(() => ["MA", "EMA", "VOL", "MACD", "BOLL", "KDJ", "RSI", "BIAS", "BRAR", "CCI", "DMI", "CR", "PSY", "DMA", "TRIX", "OBV", "VR", "WR", "MTM", "EMV", "SAR", "SMA", "ROC", "PVT", "BBI", "AO"].map((t) => {
          const n = t in e.subIndicators;
          return (() => {
            const r = br.cloneNode(!0);
            return r.$$click = (i) => {
              e.onSubIndicatorChange({
                name: t,
                paneId: e.subIndicators[t] ?? "",
                added: !n
              });
            }, C(r, x(gr, {
              checked: n,
              get label() {
                return l(t.toLowerCase(), e.locale);
              }
            })), r;
          })();
        }))];
      }
    });
  }
});
Qe(["click"]);
function $r(e, t) {
  switch (e) {
    case "Etc/UTC":
      return l("utc", t);
    case "Pacific/Midway":
      return l("midway", t);
    case "Pacific/Honolulu":
      return l("honolulu", t);
    case "America/Anchorage":
      return l("anchorage", t);
    case "America/Juneau":
      return l("juneau", t);
    case "America/Los_Angeles":
      return l("los_angeles", t);
    case "America/Vancouver":
      return l("vancouver", t);
    case "America/Tijuana":
      return l("tijuana", t);
    case "America/Phoenix":
      return l("phoenix", t);
    case "America/Denver":
      return l("denver", t);
    case "America/Chicago":
      return l("chicago", t);
    case "America/Mexico_City":
      return l("mexico_city", t);
    case "America/Guatemala":
      return l("guatemala", t);
    case "America/New_York":
      return l("new_york", t);
    case "America/Toronto":
      return l("toronto", t);
    case "America/Bogota":
      return l("bogota", t);
    case "America/Lima":
      return l("lima", t);
    case "America/Caracas":
      return l("caracas", t);
    case "America/Halifax":
      return l("halifax", t);
    case "America/Santiago":
      return l("santiago", t);
    case "America/La_Paz":
      return l("la_paz", t);
    case "America/Sao_Paulo":
      return l("sao_paulo", t);
    case "America/Buenos_Aires":
      return l("buenos_aires", t);
    case "America/Montevideo":
      return l("montevideo", t);
    case "America/Godthab":
      return l("godthab", t);
    case "Atlantic/Azores":
      return l("azores", t);
    case "Atlantic/Cape_Verde":
      return l("cape_verde", t);
    case "Europe/London":
      return l("london", t);
    case "Europe/Dublin":
      return l("dublin", t);
    case "Europe/Lisbon":
      return l("lisbon", t);
    case "Africa/Casablanca":
      return l("casablanca", t);
    case "Europe/Paris":
      return l("paris", t);
    case "Europe/Berlin":
      return l("berlin", t);
    case "Europe/Amsterdam":
      return l("amsterdam", t);
    case "Europe/Brussels":
      return l("brussels", t);
    case "Europe/Madrid":
      return l("madrid", t);
    case "Europe/Rome":
      return l("rome", t);
    case "Europe/Vienna":
      return l("vienna", t);
    case "Europe/Warsaw":
      return l("warsaw", t);
    case "Africa/Lagos":
      return l("lagos", t);
    case "Europe/Athens":
      return l("athens", t);
    case "Europe/Bucharest":
      return l("bucharest", t);
    case "Europe/Helsinki":
      return l("helsinki", t);
    case "Europe/Istanbul":
      return l("istanbul", t);
    case "Europe/Kiev":
      return l("kiev", t);
    case "Africa/Cairo":
      return l("cairo", t);
    case "Africa/Johannesburg":
      return l("johannesburg", t);
    case "Asia/Jerusalem":
      return l("jerusalem", t);
    case "Europe/Moscow":
      return l("moscow", t);
    case "Asia/Baghdad":
      return l("baghdad", t);
    case "Asia/Kuwait":
      return l("kuwait", t);
    case "Asia/Riyadh":
      return l("riyadh", t);
    case "Asia/Bahrain":
      return l("bahrain", t);
    case "Africa/Nairobi":
      return l("nairobi", t);
    case "Asia/Tehran":
      return l("tehran", t);
    case "Asia/Dubai":
      return l("dubai", t);
    case "Asia/Muscat":
      return l("muscat", t);
    case "Asia/Baku":
      return l("baku", t);
    case "Asia/Kabul":
      return l("kabul", t);
    case "Asia/Karachi":
      return l("karachi", t);
    case "Asia/Tashkent":
      return l("tashkent", t);
    case "Asia/Ashkhabad":
      return l("ashkhabad", t);
    case "Asia/Kolkata":
      return l("kolkata", t);
    case "Asia/Mumbai":
      return l("mumbai", t);
    case "Asia/Colombo":
      return l("colombo", t);
    case "Asia/Kathmandu":
      return l("kathmandu", t);
    case "Asia/Dhaka":
      return l("dhaka", t);
    case "Asia/Almaty":
      return l("almaty", t);
    case "Asia/Yangon":
      return l("yangon", t);
    case "Asia/Bangkok":
      return l("bangkok", t);
    case "Asia/Jakarta":
      return l("jakarta", t);
    case "Asia/Ho_Chi_Minh":
      return l("ho_chi_minh", t);
    case "Asia/Shanghai":
      return l("shanghai", t);
    case "Asia/Hong_Kong":
      return l("hong_kong", t);
    case "Asia/Singapore":
      return l("singapore", t);
    case "Asia/Taipei":
      return l("taipei", t);
    case "Asia/Manila":
      return l("manila", t);
    case "Asia/Kuala_Lumpur":
      return l("kuala_lumpur", t);
    case "Australia/Perth":
      return l("perth", t);
    case "Asia/Tokyo":
      return l("tokyo", t);
    case "Asia/Seoul":
      return l("seoul", t);
    case "Asia/Pyongyang":
      return l("pyongyang", t);
    case "Australia/Adelaide":
      return l("adelaide", t);
    case "Australia/Darwin":
      return l("darwin", t);
    case "Australia/Brisbane":
      return l("brisbane", t);
    case "Australia/Sydney":
      return l("sydney", t);
    case "Australia/Melbourne":
      return l("melbourne", t);
    case "Pacific/Guam":
      return l("guam", t);
    case "Pacific/Port_Moresby":
      return l("port_moresby", t);
    case "Pacific/Norfolk":
      return l("norfolk", t);
    case "Pacific/Guadalcanal":
      return l("guadalcanal", t);
    case "Pacific/Auckland":
      return l("auckland", t);
    case "Pacific/Fiji":
      return l("fiji", t);
    case "Pacific/Tongatapu":
      return l("tongatapu", t);
    case "Pacific/Apia":
      return l("apia", t);
    case "Asia/Karachi":
      return l("karachi", t);
  }
  return e;
}
function pf(e) {
  return [
    // UTC
    { key: "Etc/UTC", text: `(UTC+0:00) ${l("utc", e)}` },
    // Pacific (UTC-12 to UTC-8)
    { key: "Pacific/Midway", text: `(UTC-11:00) ${l("midway", e)}` },
    { key: "Pacific/Honolulu", text: `(UTC-10:00) ${l("honolulu", e)}` },
    { key: "America/Anchorage", text: `(UTC-9:00) ${l("anchorage", e)}` },
    { key: "America/Juneau", text: `(UTC-9:00) ${l("juneau", e)}` },
    // North America West (UTC-8 to UTC-7)
    { key: "America/Los_Angeles", text: `(UTC-8:00) ${l("los_angeles", e)}` },
    { key: "America/Vancouver", text: `(UTC-8:00) ${l("vancouver", e)}` },
    { key: "America/Tijuana", text: `(UTC-8:00) ${l("tijuana", e)}` },
    { key: "America/Phoenix", text: `(UTC-7:00) ${l("phoenix", e)}` },
    { key: "America/Denver", text: `(UTC-7:00) ${l("denver", e)}` },
    // North America Central (UTC-6)
    { key: "America/Chicago", text: `(UTC-6:00) ${l("chicago", e)}` },
    { key: "America/Mexico_City", text: `(UTC-6:00) ${l("mexico_city", e)}` },
    { key: "America/Guatemala", text: `(UTC-6:00) ${l("guatemala", e)}` },
    // North America East (UTC-5 to UTC-4)
    { key: "America/New_York", text: `(UTC-5:00) ${l("new_york", e)}` },
    { key: "America/Toronto", text: `(UTC-5:00) ${l("toronto", e)}` },
    { key: "America/Bogota", text: `(UTC-5:00) ${l("bogota", e)}` },
    { key: "America/Lima", text: `(UTC-5:00) ${l("lima", e)}` },
    { key: "America/Caracas", text: `(UTC-4:00) ${l("caracas", e)}` },
    { key: "America/Halifax", text: `(UTC-4:00) ${l("halifax", e)}` },
    // South America (UTC-4 to UTC-3)
    { key: "America/Santiago", text: `(UTC-4:00) ${l("santiago", e)}` },
    { key: "America/La_Paz", text: `(UTC-4:00) ${l("la_paz", e)}` },
    { key: "America/Sao_Paulo", text: `(UTC-3:00) ${l("sao_paulo", e)}` },
    { key: "America/Buenos_Aires", text: `(UTC-3:00) ${l("buenos_aires", e)}` },
    { key: "America/Montevideo", text: `(UTC-3:00) ${l("montevideo", e)}` },
    // Atlantic (UTC-3 to UTC-1)
    { key: "America/Godthab", text: `(UTC-3:00) ${l("godthab", e)}` },
    { key: "Atlantic/Azores", text: `(UTC-1:00) ${l("azores", e)}` },
    { key: "Atlantic/Cape_Verde", text: `(UTC-1:00) ${l("cape_verde", e)}` },
    // Western Europe (UTC+0 to UTC+1)
    { key: "Europe/London", text: `(UTC+0:00) ${l("london", e)}` },
    { key: "Europe/Dublin", text: `(UTC+0:00) ${l("dublin", e)}` },
    { key: "Europe/Lisbon", text: `(UTC+0:00) ${l("lisbon", e)}` },
    { key: "Africa/Casablanca", text: `(UTC+0:00) ${l("casablanca", e)}` },
    { key: "Europe/Paris", text: `(UTC+1:00) ${l("paris", e)}` },
    { key: "Europe/Berlin", text: `(UTC+1:00) ${l("berlin", e)}` },
    { key: "Europe/Amsterdam", text: `(UTC+1:00) ${l("amsterdam", e)}` },
    { key: "Europe/Brussels", text: `(UTC+1:00) ${l("brussels", e)}` },
    { key: "Europe/Madrid", text: `(UTC+1:00) ${l("madrid", e)}` },
    { key: "Europe/Rome", text: `(UTC+1:00) ${l("rome", e)}` },
    { key: "Europe/Vienna", text: `(UTC+1:00) ${l("vienna", e)}` },
    { key: "Europe/Warsaw", text: `(UTC+1:00) ${l("warsaw", e)}` },
    { key: "Africa/Lagos", text: `(UTC+1:00) ${l("lagos", e)}` },
    // Central Europe (UTC+2)
    { key: "Europe/Athens", text: `(UTC+2:00) ${l("athens", e)}` },
    { key: "Europe/Bucharest", text: `(UTC+2:00) ${l("bucharest", e)}` },
    { key: "Europe/Helsinki", text: `(UTC+2:00) ${l("helsinki", e)}` },
    { key: "Europe/Istanbul", text: `(UTC+2:00) ${l("istanbul", e)}` },
    { key: "Europe/Kiev", text: `(UTC+2:00) ${l("kiev", e)}` },
    { key: "Africa/Cairo", text: `(UTC+2:00) ${l("cairo", e)}` },
    { key: "Africa/Johannesburg", text: `(UTC+2:00) ${l("johannesburg", e)}` },
    { key: "Asia/Jerusalem", text: `(UTC+2:00) ${l("jerusalem", e)}` },
    // Eastern Europe / Middle East (UTC+3)
    { key: "Europe/Moscow", text: `(UTC+3:00) ${l("moscow", e)}` },
    { key: "Asia/Baghdad", text: `(UTC+3:00) ${l("baghdad", e)}` },
    { key: "Asia/Kuwait", text: `(UTC+3:00) ${l("kuwait", e)}` },
    { key: "Asia/Riyadh", text: `(UTC+3:00) ${l("riyadh", e)}` },
    { key: "Asia/Bahrain", text: `(UTC+3:00) ${l("bahrain", e)}` },
    { key: "Africa/Nairobi", text: `(UTC+3:00) ${l("nairobi", e)}` },
    // Middle East (UTC+3:30 to UTC+4)
    { key: "Asia/Tehran", text: `(UTC+3:30) ${l("tehran", e)}` },
    { key: "Asia/Dubai", text: `(UTC+4:00) ${l("dubai", e)}` },
    { key: "Asia/Muscat", text: `(UTC+4:00) ${l("muscat", e)}` },
    { key: "Asia/Baku", text: `(UTC+4:00) ${l("baku", e)}` },
    // Central Asia (UTC+4:30 to UTC+5)
    { key: "Asia/Kabul", text: `(UTC+4:30) ${l("kabul", e)}` },
    { key: "Asia/Karachi", text: `(UTC+5:00) ${l("karachi", e)}` },
    { key: "Asia/Tashkent", text: `(UTC+5:00) ${l("tashkent", e)}` },
    { key: "Asia/Ashkhabad", text: `(UTC+5:00) ${l("ashkhabad", e)}` },
    // South Asia (UTC+5:30 to UTC+6)
    { key: "Asia/Kolkata", text: `(UTC+5:30) ${l("kolkata", e)}` },
    { key: "Asia/Mumbai", text: `(UTC+5:30) ${l("mumbai", e)}` },
    { key: "Asia/Colombo", text: `(UTC+5:30) ${l("colombo", e)}` },
    { key: "Asia/Kathmandu", text: `(UTC+5:45) ${l("kathmandu", e)}` },
    { key: "Asia/Dhaka", text: `(UTC+6:00) ${l("dhaka", e)}` },
    { key: "Asia/Almaty", text: `(UTC+6:00) ${l("almaty", e)}` },
    // Southeast Asia (UTC+6:30 to UTC+7)
    { key: "Asia/Yangon", text: `(UTC+6:30) ${l("yangon", e)}` },
    { key: "Asia/Bangkok", text: `(UTC+7:00) ${l("bangkok", e)}` },
    { key: "Asia/Jakarta", text: `(UTC+7:00) ${l("jakarta", e)}` },
    { key: "Asia/Ho_Chi_Minh", text: `(UTC+7:00) ${l("ho_chi_minh", e)}` },
    // East Asia (UTC+8)
    { key: "Asia/Shanghai", text: `(UTC+8:00) ${l("shanghai", e)}` },
    { key: "Asia/Hong_Kong", text: `(UTC+8:00) ${l("hong_kong", e)}` },
    { key: "Asia/Singapore", text: `(UTC+8:00) ${l("singapore", e)}` },
    { key: "Asia/Taipei", text: `(UTC+8:00) ${l("taipei", e)}` },
    { key: "Asia/Manila", text: `(UTC+8:00) ${l("manila", e)}` },
    { key: "Asia/Kuala_Lumpur", text: `(UTC+8:00) ${l("kuala_lumpur", e)}` },
    { key: "Australia/Perth", text: `(UTC+8:00) ${l("perth", e)}` },
    // East Asia (UTC+9)
    { key: "Asia/Tokyo", text: `(UTC+9:00) ${l("tokyo", e)}` },
    { key: "Asia/Seoul", text: `(UTC+9:00) ${l("seoul", e)}` },
    { key: "Asia/Pyongyang", text: `(UTC+9:00) ${l("pyongyang", e)}` },
    // Australia (UTC+9:30 to UTC+10)
    { key: "Australia/Adelaide", text: `(UTC+9:30) ${l("adelaide", e)}` },
    { key: "Australia/Darwin", text: `(UTC+9:30) ${l("darwin", e)}` },
    { key: "Australia/Brisbane", text: `(UTC+10:00) ${l("brisbane", e)}` },
    { key: "Australia/Sydney", text: `(UTC+10:00) ${l("sydney", e)}` },
    { key: "Australia/Melbourne", text: `(UTC+10:00) ${l("melbourne", e)}` },
    { key: "Pacific/Guam", text: `(UTC+10:00) ${l("guam", e)}` },
    // Pacific (UTC+10 to UTC+13)
    { key: "Pacific/Port_Moresby", text: `(UTC+10:00) ${l("port_moresby", e)}` },
    { key: "Pacific/Norfolk", text: `(UTC+11:00) ${l("norfolk", e)}` },
    { key: "Pacific/Guadalcanal", text: `(UTC+11:00) ${l("guadalcanal", e)}` },
    { key: "Pacific/Auckland", text: `(UTC+12:00) ${l("auckland", e)}` },
    { key: "Pacific/Fiji", text: `(UTC+12:00) ${l("fiji", e)}` },
    { key: "Pacific/Tongatapu", text: `(UTC+13:00) ${l("tongatapu", e)}` },
    { key: "Pacific/Apia", text: `(UTC+13:00) ${l("apia", e)}` }
  ];
}
const Cf = (e) => {
  const [t, n] = T(e.timezone), r = H(() => pf(e.locale));
  return x(v1, {
    get title() {
      return l("timezone", e.locale);
    },
    width: 320,
    get buttons() {
      return [{
        children: l("confirm", e.locale),
        onClick: () => {
          e.onConfirm(t()), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      return x(a9, {
        style: {
          width: "100%",
          "margin-top": "20px"
        },
        get value() {
          return t().text;
        },
        onSelected: (i) => {
          n(i);
        },
        get dataSource() {
          return r();
        },
        searchable: !0,
        get searchPlaceholder() {
          return l("Search Timezone", e.locale) || "Search timezone...";
        }
      });
    }
  });
};
function _r(e) {
  return [
    {
      key: "candle.type",
      text: l("candle_type", e),
      component: "select",
      dataSource: [
        { key: "candle_solid", text: l("candle_solid", e) },
        { key: "candle_stroke", text: l("candle_stroke", e) },
        { key: "candle_up_stroke", text: l("candle_up_stroke", e) },
        { key: "candle_down_stroke", text: l("candle_down_stroke", e) },
        { key: "ohlc", text: l("ohlc", e) },
        { key: "area", text: l("area", e) }
      ]
    },
    {
      key: "candle.priceMark.last.show",
      text: l("last_price_show", e),
      component: "switch"
    },
    {
      key: "candle.priceMark.high.show",
      text: l("high_price_show", e),
      component: "switch"
    },
    {
      key: "candle.priceMark.low.show",
      text: l("low_price_show", e),
      component: "switch"
    },
    {
      key: "indicator.lastValueMark.show",
      text: l("indicator_last_value_show", e),
      component: "switch"
    },
    {
      key: "yAxis.type",
      text: l("price_axis_type", e),
      component: "select",
      dataSource: [
        { key: "normal", text: l("normal", e) },
        { key: "percentage", text: l("percentage", e) },
        { key: "log", text: l("log", e) }
      ]
    },
    {
      key: "yAxis.reverse",
      text: l("reverse_coordinate", e),
      component: "switch"
    },
    {
      key: "grid.show",
      text: l("grid_show", e),
      component: "switch"
    }
  ];
}
const vf = /* @__PURE__ */ $('<div class="klinecharts-pro-setting-modal-content"></div>'), bf = /* @__PURE__ */ $('<div class="setting-item"><span class="setting-label"></span><div class="setting-control"></div></div>'), $f = (e) => {
  const [t, n] = T(e.currentStyles), [r, i] = T(_r(e.locale)), [s, d] = T(!1), u = () => {
    d(window.innerWidth <= 768);
  };
  w0(() => {
    u(), window.addEventListener("resize", u);
  }), D1(() => {
    window.removeEventListener("resize", u);
  }), Be(() => {
    i(_r(e.locale));
  });
  const m = (k, g) => {
    const M = {};
    v0(M, k.key, g);
    const L = le.clone(t());
    v0(L, k.key, g), n(L), i(r().map((O) => ({
      ...O
    }))), e.onChange(M);
  };
  return x(v1, {
    get title() {
      return l("setting", e.locale);
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
        children: l("restore_default", e.locale),
        onClick: () => {
          e.onRestoreDefault(r()), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      const k = vf.cloneNode(!0);
      return C(k, x(p0, {
        get each() {
          return r();
        },
        children: (g) => {
          let M;
          const L = le.formatValue(t(), g.key);
          switch (g.component) {
            case "select": {
              const O = g.key === "candle.type" ? "170px" : "120px";
              M = x(a9, {
                get style() {
                  return {
                    width: s() ? "100%" : O,
                    "min-width": s() ? "auto" : O
                  };
                },
                get value() {
                  return l(L, e.locale);
                },
                get dataSource() {
                  return g.dataSource;
                },
                onSelected: (w) => {
                  const D = w.key;
                  m(g, D);
                }
              });
              break;
            }
            case "switch": {
              const O = !!L;
              M = x(Js, {
                open: O,
                onChange: () => {
                  m(g, !O);
                }
              });
              break;
            }
          }
          return (() => {
            const O = bf.cloneNode(!0), w = O.firstChild, D = w.nextSibling;
            return C(w, () => g.text), C(D, M), I(() => O.classList.toggle("mobile-item", !!s())), O;
          })();
        }
      })), I(() => k.classList.toggle("mobile-layout", !!s())), k;
    }
  });
}, _f = /* @__PURE__ */ $('<img style="width:500px;margin-top: 20px">'), kf = (e) => x(v1, {
  get title() {
    return l("screenshot", e.locale);
  },
  width: 540,
  get buttons() {
    return [{
      type: "confirm",
      children: l("save", e.locale),
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
    const t = _f.cloneNode(!0);
    return I(() => Me(t, "src", e.url)), t;
  }
}), xf = {
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
}, Lf = /* @__PURE__ */ $('<div class="klinecharts-pro-indicator-setting-modal-content"></div>'), wf = /* @__PURE__ */ $("<span></span>"), Af = (e) => {
  const [t, n] = T(le.clone(e.params.calcParams)), r = (i) => xf[i];
  return x(v1, {
    get title() {
      return e.params.indicatorName;
    },
    width: 360,
    get buttons() {
      return [{
        type: "confirm",
        children: l("confirm", e.locale),
        onClick: () => {
          const i = r(e.params.indicatorName), s = [];
          le.clone(t()).forEach((d, u) => {
            !le.isValid(d) || d === "" ? "default" in i[u] && s.push(i[u].default) : s.push(d);
          }), e.onConfirm(s), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      const i = Lf.cloneNode(!0);
      return C(i, () => r(e.params.indicatorName).map((s, d) => [(() => {
        const u = wf.cloneNode(!0);
        return C(u, () => l(s.paramNameKey, e.locale)), u;
      })(), x(s9, {
        style: {
          width: "200px"
        },
        get value() {
          return t()[d] ?? "";
        },
        get precision() {
          return s.precision;
        },
        get min() {
          return s.min;
        },
        onChange: (u) => {
          const m = le.clone(t());
          m[d] = u, n(m);
        }
      })])), i;
    }
  });
}, Mf = /* @__PURE__ */ $('<svg viewBox="0 0 1024 1024"><path d="M945.066667 898.133333l-189.866667-189.866666c55.466667-64 87.466667-149.333333 87.466667-241.066667 0-204.8-168.533333-373.333333-373.333334-373.333333S96 264.533333 96 469.333333 264.533333 842.666667 469.333333 842.666667c91.733333 0 174.933333-34.133333 241.066667-87.466667l189.866667 189.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c8.533333-12.8 8.533333-34.133333-2.133333-46.933334zM469.333333 778.666667C298.666667 778.666667 160 640 160 469.333333S298.666667 160 469.333333 160 778.666667 298.666667 778.666667 469.333333 640 778.666667 469.333333 778.666667z"></path></svg>'), Tf = /* @__PURE__ */ $('<img alt="symbol">'), Sf = /* @__PURE__ */ $("<li><div><span></span></div></li>"), Pf = (e) => {
  const [t, n] = T(""), [r] = Q9(t, e.datafeed.searchSymbols.bind(e.datafeed));
  return x(v1, {
    get title() {
      return l("symbol_search", e.locale);
    },
    width: 460,
    get onClose() {
      return e.onClose;
    },
    get children() {
      return [x(s9, {
        class: "klinecharts-pro-symbol-search-modal-input",
        get placeholder() {
          return l("symbol_code", e.locale);
        },
        get suffix() {
          return Mf.cloneNode(!0);
        },
        get value() {
          return t();
        },
        onChange: (i) => {
          const s = `${i}`;
          n(s);
        }
      }), x(qt, {
        class: "klinecharts-pro-symbol-search-modal-list",
        get loading() {
          return r.loading;
        },
        get dataSource() {
          return r() ?? [];
        },
        renderItem: (i) => (() => {
          const s = Sf.cloneNode(!0), d = s.firstChild, u = d.firstChild;
          return s.$$click = () => {
            e.onSymbolSelected(i), e.onClose();
          }, C(d, x(V, {
            get when() {
              return i.logo;
            },
            get children() {
              const m = Tf.cloneNode(!0);
              return I(() => Me(m, "src", i.logo)), m;
            }
          }), u), C(u, () => i.shortName ?? i.ticker, null), C(u, () => `${i.name ? `(${i.name})` : ""}`, null), C(s, () => i.exchange ?? "", null), I(() => Me(u, "title", i.name ?? "")), s;
        })()
      })];
    }
  });
};
Qe(["click"]);
const Of = /* @__PURE__ */ $('<div class="klinecharts-pro-mobile-more-modal-content"><div class="item"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div><div class="item"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path></svg><span></span></div><div class="item"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg><span></span></div></div>'), Df = (e) => x(v1, {
  get title() {
    return l("more", e.locale);
  },
  isMobile: !0,
  get onClose() {
    return e.onClose;
  },
  get children() {
    const t = Of.cloneNode(!0), n = t.firstChild, r = n.firstChild, i = r.nextSibling, s = n.nextSibling, d = s.firstChild, u = d.nextSibling, m = s.nextSibling, k = m.firstChild, g = k.nextSibling;
    return n.$$click = () => {
      e.onIndicatorClick(), e.onClose();
    }, C(i, () => l("indicator", e.locale)), s.$$click = () => {
      e.onTimezoneClick(), e.onClose();
    }, C(u, () => l("timezone", e.locale)), m.$$click = () => {
      e.onSettingClick(), e.onClose();
    }, C(g, () => l("setting", e.locale)), t;
  }
});
Qe(["click"]);
const Nf = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-picker"><label class="klinecharts-pro-time-tools-field"><span></span><button type="button" class="klinecharts-pro-time-tools-input"><span></span><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M8 3v4M16 3v4M4 10h16"></path></svg></button></label></div>'), If = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-calendar"><div class="klinecharts-pro-time-tools-month"><button type="button">&lt;&lt;</button><button type="button">&lt;</button><strong> </strong><button type="button">></button><button type="button">>></button></div><div class="klinecharts-pro-time-tools-grid"></div><div class="klinecharts-pro-time-tools-spinners"><div class="spinner-column"></div><div class="spinner-column"></div><div class="spinner-column"></div></div></div>'), Ef = /* @__PURE__ */ $('<span class="weekday"></span>'), ht = /* @__PURE__ */ $('<button type="button"></button>'), Bf = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-content"></div>'), Ff = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-tabs"></div>'), Uf = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-range"><span class="klinecharts-pro-time-tools-arrow">-></span></div>'), zf = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-panel"><div class="klinecharts-pro-time-tools-row"><div><strong>Time Anchor</strong><span>Anchor to a time on the chart when switching between intervals</span></div><button type="button"><span></span></button></div><div class="klinecharts-pro-time-tools-row"><div><strong>Anchor Point</strong></div><select><option value="date">Date</option><option value="current">Current</option></select></div><div class="klinecharts-pro-time-tools-row with-divider"><div><strong>Anchor line</strong><span>Mark the anchored time on the chart with a vertical line</span></div><button type="button"><span></span></button></div><div class="klinecharts-pro-time-tools-row with-divider"><div><strong>Across Tokens</strong><span>Retain onscreen chart range when switching symbols</span></div><button type="button"><span></span></button></div></div>'), Kf = [{
  key: "goToDate",
  label: "Go to Date"
}, {
  key: "timeRange",
  label: "Time Range"
}, {
  key: "timeAnchor",
  label: "Time Anchor"
}], jf = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], Qf = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], j1 = (e) => String(e).padStart(2, "0"), f0 = (e) => {
  const t = new Date(e);
  return {
    year: t.getFullYear(),
    month: t.getMonth(),
    day: t.getDate(),
    hour: t.getHours(),
    minute: t.getMinutes()
  };
}, Et = (e) => new Date(e.year, e.month, e.day, e.hour, e.minute, 0, 0).getTime(), Rf = (e) => {
  const t = e.hour >= 12 ? "PM" : "AM", n = e.hour % 12 || 12;
  return `${j1(e.month + 1)}/${j1(e.day)}/${e.year} ${j1(n)}:${j1(e.minute)} ${t}`;
}, Zf = (e, t) => {
  const n = new Date(e, t, 1).getDay(), r = new Date(e, t + 1, 0).getDate(), i = new Date(e, t, 0).getDate(), s = [];
  for (let d = n - 1; d >= 0; d -= 1)
    s.push({
      date: new Date(e, t - 1, i - d),
      current: !1
    });
  for (let d = 1; d <= r; d += 1)
    s.push({
      date: new Date(e, t, d),
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
}, Bt = (e) => {
  const [t, n] = T(!0), [r, i] = T(e.value.year), [s, d] = T(e.value.month), u = H(() => Zf(r(), s())), m = H(() => e.value.hour % 12 || 12), k = H(() => e.value.hour >= 12 ? "PM" : "AM"), g = (w) => {
    const D = new Date(r(), s() + w, 1);
    i(D.getFullYear()), d(D.getMonth());
  }, M = (w) => {
    e.onChange({
      ...e.value,
      year: w.getFullYear(),
      month: w.getMonth(),
      day: w.getDate()
    }), i(w.getFullYear()), d(w.getMonth());
  }, L = (w) => {
    const D = k() === "PM";
    e.onChange({
      ...e.value,
      hour: D ? w === 12 ? 12 : w + 12 : w === 12 ? 0 : w
    });
  }, O = (w) => {
    const D = m();
    e.onChange({
      ...e.value,
      hour: w === "PM" ? D === 12 ? 12 : D + 12 : D === 12 ? 0 : D
    });
  };
  return (() => {
    const w = Nf.cloneNode(!0), D = w.firstChild, B = D.firstChild, W = B.nextSibling, q = W.firstChild;
    return C(B, () => e.label), W.$$click = () => n(!t()), C(q, () => Rf(e.value)), C(w, (() => {
      const F = H(() => !!t());
      return () => F() && (() => {
        const R = If.cloneNode(!0), K = R.firstChild, pe = K.firstChild, be = pe.nextSibling, ie = be.nextSibling, Y = ie.firstChild, ee = ie.nextSibling, ae = ee.nextSibling, te = K.nextSibling, Ie = te.nextSibling, Fe = Ie.firstChild, Ue = Fe.nextSibling, e1 = Ue.nextSibling;
        return pe.$$click = () => g(-12), be.$$click = () => g(-1), C(ie, () => Qf[s()], Y), C(ie, r, null), ee.$$click = () => g(1), ae.$$click = () => g(12), C(te, () => jf.map((me) => (() => {
          const ne = Ef.cloneNode(!0);
          return C(ne, me), ne;
        })()), null), C(te, () => u().map(({
          date: me,
          current: ne
        }) => {
          const $e = me.getFullYear() === e.value.year && me.getMonth() === e.value.month && me.getDate() === e.value.day;
          return (() => {
            const Z = ht.cloneNode(!0);
            return Z.$$click = () => M(me), oe(Z, `${ne ? "" : "muted"} ${$e ? "selected" : ""}`), C(Z, () => me.getDate()), Z;
          })();
        }), null), C(Fe, () => [m() - 1, m(), m() + 1].map((me) => {
          const ne = (me - 1 + 12) % 12 + 1;
          return (() => {
            const $e = ht.cloneNode(!0);
            return $e.$$click = () => L(ne), C($e, () => j1(ne)), I(() => oe($e, ne === m() ? "selected" : "")), $e;
          })();
        })), C(Ue, () => [e.value.minute - 1, e.value.minute, e.value.minute + 1].map((me) => {
          const ne = (me + 60) % 60;
          return (() => {
            const $e = ht.cloneNode(!0);
            return $e.$$click = () => e.onChange({
              ...e.value,
              minute: ne
            }), C($e, () => j1(ne)), I(() => oe($e, ne === e.value.minute ? "selected" : "")), $e;
          })();
        })), C(e1, () => ["AM", "PM"].map((me) => (() => {
          const ne = ht.cloneNode(!0);
          return ne.$$click = () => O(me), C(ne, me), I(() => oe(ne, me === k() ? "selected" : "")), ne;
        })())), R;
      })();
    })(), null), w;
  })();
}, Vf = (e) => {
  const [t, n] = T(e.initialTab ?? "goToDate"), [r, i] = T(f0(e.initialTimestamp)), [s, d] = T(f0(e.initialRange.from)), [u, m] = T(f0(e.initialRange.to)), [k, g] = T({
    ...e.anchorSettings
  }), M = (O) => {
    g((w) => ({
      ...w,
      ...O
    }));
  }, L = () => {
    const O = t();
    if (O === "goToDate")
      e.onGoToDate(Et(r()));
    else if (O === "timeRange") {
      const w = Et(s()), D = Et(u());
      e.onTimeRange(w <= D ? {
        from: w,
        to: D
      } : {
        from: D,
        to: w
      });
    } else {
      const w = k();
      e.onTimeAnchorChange({
        ...w,
        timestamp: w.anchorPoint === "current" ? Date.now() : Et(r())
      });
    }
    e.onClose();
  };
  return x(v1, {
    width: 650,
    get title() {
      return (() => {
        const O = Ff.cloneNode(!0);
        return C(O, () => Kf.map((w) => (() => {
          const D = ht.cloneNode(!0);
          return D.$$click = () => n(w.key), C(D, () => w.label), I(() => oe(D, t() === w.key ? "active" : "")), D;
        })())), O;
      })();
    },
    get buttons() {
      return [{
        children: "Close",
        type: "cancel",
        onClick: e.onClose
      }, {
        children: "Confirm",
        onClick: L
      }];
    },
    get onClose() {
      return e.onClose;
    },
    minButtonWidth: 112,
    get children() {
      const O = Bf.cloneNode(!0);
      return C(O, (() => {
        const w = H(() => t() === "goToDate");
        return () => w() && x(Bt, {
          label: "Date and time",
          get value() {
            return r();
          },
          onChange: i
        });
      })(), null), C(O, (() => {
        const w = H(() => t() === "timeRange");
        return () => w() && (() => {
          const D = Uf.cloneNode(!0), B = D.firstChild;
          return C(D, x(Bt, {
            label: "Start",
            get value() {
              return s();
            },
            onChange: d
          }), B), C(D, x(Bt, {
            label: "End",
            get value() {
              return u();
            },
            onChange: m
          }), null), D;
        })();
      })(), null), C(O, (() => {
        const w = H(() => t() === "timeAnchor");
        return () => w() && (() => {
          const D = zf.cloneNode(!0), B = D.firstChild, W = B.firstChild, q = W.nextSibling, F = B.nextSibling, R = F.firstChild, K = R.nextSibling, pe = F.nextSibling, be = pe.firstChild, ie = be.nextSibling, Y = pe.nextSibling, ee = Y.firstChild, ae = ee.nextSibling;
          return q.$$click = () => M({
            enabled: !k().enabled
          }), K.addEventListener("change", (te) => M({
            anchorPoint: te.currentTarget.value
          })), C(D, (() => {
            const te = H(() => k().anchorPoint === "date");
            return () => te() && x(Bt, {
              label: "Anchor date",
              get value() {
                return r();
              },
              onChange: i
            });
          })(), pe), ie.$$click = () => M({
            anchorLine: !k().anchorLine
          }), ae.$$click = () => M({
            acrossTokens: !k().acrossTokens
          }), I((te) => {
            const Ie = `klinecharts-pro-time-tools-switch${k().enabled ? " on" : ""}`, Fe = `klinecharts-pro-time-tools-switch${k().anchorLine ? " on" : ""}`, Ue = `klinecharts-pro-time-tools-switch${k().acrossTokens ? " on" : ""}`;
            return Ie !== te._v$ && oe(q, te._v$ = Ie), Fe !== te._v$2 && oe(ie, te._v$2 = Fe), Ue !== te._v$3 && oe(ae, te._v$3 = Ue), te;
          }, {
            _v$: void 0,
            _v$2: void 0,
            _v$3: void 0
          }), I(() => K.value = k().anchorPoint), D;
        })();
      })(), null), O;
    }
  });
};
Qe(["click"]);
const Hf = /* @__PURE__ */ $('<i class="icon-close klinecharts-pro-load-icon"></i>'), qf = /* @__PURE__ */ $('<div class="klinecharts-pro-content"><div class="klinecharts-pro-widget"></div></div>'), Yf = /* @__PURE__ */ $('<div class="klinecharts-pro-time-navigation-tooltip"></div>'), Gf = /* @__PURE__ */ $('<div class="klinecharts-pro-countdown-price-mark"><span class="klinecharts-pro-countdown-price-mark-price"></span><span class="klinecharts-pro-countdown-price-mark-timer"></span></div>'), Wf = /* @__PURE__ */ $('<div class="overlay-toolbar-color-popover"><div class="overlay-toolbar-color-grid"></div><div class="overlay-toolbar-color-footer"><button type="button" class="overlay-toolbar-add-color">+</button><div class="overlay-toolbar-color-slider"><span></span></div></div></div>'), Xf = /* @__PURE__ */ $('<div class="overlay-toolbar-dropdown width-menu"></div>'), Jf = /* @__PURE__ */ $('<div class="overlay-toolbar-dropdown style-menu"><button type="button"><span class="overlay-toolbar-style-sample solid"></span></button><button type="button"><span class="overlay-toolbar-style-sample dashed"></span></button><button type="button"><span class="overlay-toolbar-style-sample dotted"></span></button></div>'), ey = /* @__PURE__ */ $('<div class="klinecharts-pro-overlay-toolbar"><button type="button" class="overlay-toolbar-icon drag" title="Move"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="6" r="1.5"></circle><circle cx="15" cy="6" r="1.5"></circle><circle cx="9" cy="12" r="1.5"></circle><circle cx="15" cy="12" r="1.5"></circle><circle cx="9" cy="18" r="1.5"></circle><circle cx="15" cy="18" r="1.5"></circle></svg></button><button type="button" class="overlay-toolbar-icon refresh" title="Reset"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 15.4-6.36L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-15.4 6.36L3 16"></path><path d="M3 21v-5h5"></path></svg></button><div class="overlay-toolbar-picker"><button type="button" title="Color"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg></button></div><div class="overlay-toolbar-picker"><button type="button" title="Line width"><span class="overlay-toolbar-line-preview"></span><span>px</span></button></div><div class="overlay-toolbar-picker"><button type="button" title="Line style"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16"></path></svg></button></div><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2"></rect><path d="M20 4 4 20"></path></svg></button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg></button><button type="button" class="overlay-toolbar-icon delete" title="Delete"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6 18 20H6L5 6"></path><path d="M10 11v5"></path><path d="M14 11v5"></path></svg></button></div>'), ty = /* @__PURE__ */ $('<button type="button"></button>'), ny = /* @__PURE__ */ $('<button type="button"><span class="overlay-toolbar-width-sample"></span></button>'), ry = /* @__PURE__ */ $('<div class="klinecharts-pro-quick-order-marker"><button type="button" class="klinecharts-pro-quick-order-plus"></button></div>'), oy = /* @__PURE__ */ $('<span class="klinecharts-pro-quick-order-plus-icon"></span>'), iy = /* @__PURE__ */ $('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" aria-hidden="true"><path d="M460-300h40v-160h160v-40H500v-160h-40v160H300v40h160v160ZM224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h510.76q27.62 0 46.12 18.5Q800-763 800-735.38v510.76q0 27.62-18.5 46.12Q763-160 735.38-160H224.62Zm0-40h510.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-510.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69H224.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v510.76q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69ZM200-760v560-560Z"></path></svg>'), ay = /* @__PURE__ */ $('<div class="klinecharts-pro-quick-order-menu-anchor"><div class="klinecharts-pro-quick-order-menu"><button type="button">Trade <!> @ <!> Limit</button><button type="button">Trade <!> @ <!> Stop</button><button type="button">Create new order...</button><button type="button">Copy Price (<!>)</button><button type="button">Draw horizontal line on </button></div></div>');
function Ft(e, t, n, r) {
  t === "VOL" && (r = {
    gap: {
      bottom: 2
    },
    ...r
  });
  const i = (e == null ? void 0 : e.createIndicator({
    name: t,
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
  }, n, r)) ?? null;
  if (i && t === "MA")
    try {
      e == null || e.overrideIndicator({
        name: "MA",
        calcParams: [7, 25, 99]
      }, i);
    } catch {
    }
  return i;
}
function y0(e) {
  const t = Math.max(1, e.multiplier || 1);
  switch (e.timespan) {
    case "minute":
      return t * 60 * 1e3;
    case "hour":
      return t * 60 * 60 * 1e3;
    case "day":
      return t * 24 * 60 * 60 * 1e3;
    case "week":
      return t * 7 * 24 * 60 * 60 * 1e3;
    case "month":
      return t * 30 * 24 * 60 * 60 * 1e3;
    case "year":
      return t * 365 * 24 * 60 * 60 * 1e3;
    default:
      return 60 * 60 * 1e3;
  }
}
function sy(e) {
  const t = Math.max(0, Math.ceil(e / 1e3)), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, s = (d) => String(d).padStart(2, "0");
  return n > 0 ? `${s(n)}:${s(r)}:${s(i)}` : `${s(r)}:${s(i)}`;
}
const ly = (e) => {
  var rn, on, an, sn, ln, cn, un, dn, hn, fn, yn, gn, mn, pn, Cn, vn, bn, $n, _n, kn, xn, Ln, wn, An, Mn, Tn, Sn, Pn;
  let t, n = null, r;
  const [i, s] = T(!1), [d, u] = T(e.theme), [m, k] = T(e.styles), [g, M] = T(e.locale), [L, O] = T(e.symbol), [w, D] = T(e.period), B = () => {
    var o, a, c, h;
    return {
      visibleMarginLeft: ((o = e.indicatorTooltipIconStyles) == null ? void 0 : o.visibleMarginLeft) ?? 7,
      secondaryMarginLeft: ((a = e.indicatorTooltipIconStyles) == null ? void 0 : a.secondaryMarginLeft) ?? 7,
      marginTop: ((c = e.indicatorTooltipIconStyles) == null ? void 0 : c.marginTop) ?? 1,
      size: ((h = e.indicatorTooltipIconStyles) == null ? void 0 : h.size) ?? 12
    };
  }, [W, q] = T(!1), [F, R] = T([...e.mainIndicators]), [K, pe] = T({}), [be, ie] = T(!1), [Y, ee] = T({
    key: e.timezone,
    text: $r(e.timezone, e.locale)
  }), [ae, te] = T(!1), [Ie, Fe] = T(), [Ue, e1] = T(""), [me, ne] = T(!1), [$e, Z] = T(Date.now()), [z, Q] = T({
    from: Date.now() - 30 * 24 * 60 * 60 * 1e3,
    to: Date.now()
  }), [xe, ze] = T({
    enabled: !1,
    timestamp: Date.now(),
    anchorPoint: "date",
    anchorLine: !1,
    acrossTokens: !1
  });
  let se = null;
  const [Te, _] = T(e.drawingBarVisible), [ce, Le] = T(!1), [s1, ue] = T(!1), [y1, l1] = T(!1), X1 = ((rn = e.orderTools) == null ? void 0 : rn.quickOrder) ?? !0, [Pe, mt] = T({
    quickOrder: X1,
    quickOrderFloatingWindow: ((on = e.orderTools) == null ? void 0 : on.quickOrderFloatingWindow) ?? X1,
    quickOrderPlusButton: ((an = e.orderTools) == null ? void 0 : an.quickOrderPlusButton) ?? X1,
    openOrders: ((sn = e.orderTools) == null ? void 0 : sn.openOrders) ?? !0,
    openOrdersExtendedPriceLine: ((ln = e.orderTools) == null ? void 0 : ln.openOrdersExtendedPriceLine) ?? !0,
    openOrdersDisplay: ((cn = e.orderTools) == null ? void 0 : cn.openOrdersDisplay) ?? "right",
    positions: ((un = e.orderTools) == null ? void 0 : un.positions) ?? !0,
    breakevenPrice: ((dn = e.orderTools) == null ? void 0 : dn.breakevenPrice) ?? !0,
    liquidationPrice: ((hn = e.orderTools) == null ? void 0 : hn.liquidationPrice) ?? !0,
    priceLine: ((fn = e.orderTools) == null ? void 0 : fn.priceLine) ?? !0,
    marketPriceLine: ((yn = e.orderTools) == null ? void 0 : yn.marketPriceLine) ?? !0,
    countDown: ((gn = e.orderTools) == null ? void 0 : gn.countDown) ?? !0,
    bidAskPrice: ((mn = e.orderTools) == null ? void 0 : mn.bidAskPrice) ?? !0,
    orderHistory: ((pn = e.orderTools) == null ? void 0 : pn.orderHistory) ?? !0
  }), [E1, b1] = T(null), [$1, t1] = T(!1), [pt, Re] = T(!1), [J1, et] = T(64), [g1, _1] = T(null), tt = 6, [Ct, B1] = T(null), [nt, rt] = T(null), [Ee, Ke] = T(null), [Ve, je] = T(null), ot = ["#000000", "#2b3342", "#3f4653", "#565d69", "#6f7580", "#8a9099", "#a7acb3", "#c4c8ce", "#ffffff", "#ff4d67", "#ffa629", "#f7ed4a", "#2fc58d", "#4ab09c", "#52c4d3", "#3157f6", "#6a36b8", "#a644b9", "#d83972", "#f2a3a6", "#f5c879", "#f7ee97", "#a6d29f", "#7fc9b9", "#91d7df", "#8fb2ee", "#b09ad2", "#c89ccf", "#d987ab", "#e8757a", "#efb34f", "#efe36e", "#86c17d", "#66b7a8", "#68c4d0", "#5f91e4", "#8059c9", "#aa62c2", "#d34d83", "#b9353d", "#ea8527", "#e8c245", "#4b8c43", "#2f6f60", "#47919b", "#2646c6", "#56309c", "#892f95", "#a82563", "#8e2528", "#de5c1f", "#dc8527", "#255a22", "#164b34", "#225b63", "#15309b", "#442180", "#6b1f74", "#86154e"];
  let F1 = null;
  const [U1, vt] = T({
    visible: !1,
    indicatorName: "",
    paneId: "",
    calcParams: []
  });
  let ve = /* @__PURE__ */ new Map(), Oe = /* @__PURE__ */ new Map();
  const bt = (o, a, c) => {
    const h = n == null ? void 0 : n.getIndicatorByPaneId(a, o);
    return {
      name: o,
      shortName: (h == null ? void 0 : h.shortName) || o,
      paneId: a,
      type: c,
      calcParams: (h == null ? void 0 : h.calcParams) || [],
      precision: (h == null ? void 0 : h.precision) ?? 4,
      visible: (h == null ? void 0 : h.visible) ?? !0,
      styles: h == null ? void 0 : h.styles,
      figures: h == null ? void 0 : h.figures
    };
  }, He = (o, a, c, h) => {
    if (e.onIndicatorChange)
      if (h === "add" || h === "change")
        setTimeout(() => {
          const y = bt(o, a, c);
          e.onIndicatorChange({
            action: h,
            indicator: y
          });
        }, 50);
      else {
        const y = {
          name: o,
          shortName: o,
          paneId: a,
          type: c,
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
  })[o] || 1, p1 = (o, a = /* @__PURE__ */ new WeakSet()) => {
    if (o == null)
      return o;
    if (a.has(o))
      return "[Circular]";
    if (typeof o != "object")
      return o;
    if (a.add(o), Array.isArray(o))
      return o.map((h) => p1(h, a));
    const c = {};
    for (const h in o)
      if (!(h === "__proto__" || h === "constructor" || h === "prototype"))
        try {
          const y = o[h];
          if (typeof y == "function")
            continue;
          c[h] = p1(y, a);
        } catch (y) {
          c[h] = `[Error: ${y.message}]`;
        }
    return c;
  }, $t = (o) => {
    if (!o)
      return null;
    try {
      return {
        id: o.id || "",
        type: o.name || "",
        name: o.name || "",
        points: (o.points || []).map((a) => ({
          timestamp: a.timestamp || 0,
          value: a.value || 0,
          dataIndex: a.dataIndex || 0
        })),
        extendData: p1(o.extendData || {}),
        styles: p1(o.styles || {}),
        visible: o.visible ?? !0,
        lock: o.lock ?? !1,
        mode: o.mode || c0.Normal
      };
    } catch (a) {
      return console.error("Error extracting overlay data:", a), null;
    }
  }, k1 = (o) => {
    var a, c, h;
    try {
      const y = (a = n == null ? void 0 : n.getOverlayById) == null ? void 0 : a.call(n, o);
      if (!y)
        return;
      const p = $t(y);
      if (p) {
        const f = ve.get(o), b = ((c = f == null ? void 0 : f.points) == null ? void 0 : c.length) || 0, A = ((h = p.points) == null ? void 0 : h.length) || 0;
        ve.set(o, p);
        const P = m1(p.type);
        if (A >= P) {
          const N = Oe.get(o);
          N && !N.complete && (N.complete = !0, N.checkInterval && (clearInterval(N.checkInterval), N.checkInterval = void 0));
        }
      }
    } catch (y) {
      console.error(`Error updating overlay tracking for ${o}:`, y);
    }
  }, _t = (o, a) => {
    if (Oe.has(o))
      return;
    const c = {
      monitoring: !0,
      complete: !1,
      lastPointCount: 0
    };
    Oe.set(o, c), k1(o);
    const h = () => {
      k1(o);
    };
    document.addEventListener("mouseup", h), document.addEventListener("touchend", h), setTimeout(() => {
      var p;
      const y = Oe.get(o);
      if (y && !y.complete) {
        y.checkInterval && clearInterval(y.checkInterval), y.mouseUpHandler && (document.removeEventListener("mouseup", y.mouseUpHandler), document.removeEventListener("touchend", y.mouseUpHandler)), k1(o);
        const f = ve.get(o);
        if (f) {
          const b = m1(f.type), A = ((p = f.points) == null ? void 0 : p.length) || 0;
          A < b && console.warn(`âš ï¸ ${f.type} ${o} has only ${A} point(s), should have ${b}`);
        }
      }
    }, 3e4);
  };
  let qe = {
    saveDrawings: (o, a) => {
      try {
        const c = `kline_drawings_${o}`, y = {
          drawings: a.map((p) => {
            var P;
            const f = {
              ...p
            };
            f.extendData && (f.extendData = p1(f.extendData)), f.styles && (f.styles = p1(f.styles));
            const b = m1(p.type), A = ((P = p.points) == null ? void 0 : P.length) || 0;
            return A < b && console.warn(`âš ï¸ Saving ${p.type} with only ${A} point(s), needs ${b}`), f;
          }),
          timestamp: Date.now()
        };
        localStorage.setItem(c, JSON.stringify(y));
      } catch (c) {
        console.error("Library: Error saving drawings:", c);
      }
    },
    loadDrawings: (o) => {
      try {
        const a = `kline_drawings_${o}`, c = localStorage.getItem(a);
        if (c) {
          const h = JSON.parse(c), y = [];
          return Array.isArray(h.drawings) && h.drawings.forEach((p) => {
            var A;
            const f = m1(p.type);
            (((A = p.points) == null ? void 0 : A.length) || 0) >= f && y.push(p);
          }), y;
        }
      } catch (a) {
        console.error("Library: Error loading drawings:", a);
      }
      return [];
    },
    clearDrawings: (o) => {
      try {
        const a = `kline_drawings_${o}`;
        localStorage.removeItem(a);
      } catch (a) {
        console.error("Library: Error clearing drawings:", a);
      }
    }
  };
  const x1 = () => {
    const o = L();
    if (o != null && o.ticker) {
      const a = Array.from(ve.values());
      qe.saveDrawings(o.ticker, a);
    }
  }, r0 = (o) => {
    if (!o || !n)
      return;
    ve.forEach((c, h) => {
      var y;
      (y = n == null ? void 0 : n.removeOverlay) == null || y.call(n, {
        id: h
      });
    }), ve.clear(), Oe.clear(), Ke(null), je(null), qe.loadDrawings(o).forEach((c) => {
      var h;
      try {
        const y = A1({
          name: c.type,
          points: c.points || [],
          extendData: c.extendData,
          styles: c.styles,
          visible: c.visible ?? !0,
          lock: c.lock ?? !1,
          mode: c.mode || c0.Normal
        }), p = n == null ? void 0 : n.createOverlay(y), f = typeof p == "string" ? p : null;
        f && (ve.set(f, {
          ...c,
          id: f
        }), Oe.set(f, {
          monitoring: !1,
          complete: !0,
          lastPointCount: ((h = c.points) == null ? void 0 : h.length) || 0
        }));
      } catch (y) {
        console.error("Library: Error restoring drawing:", y);
      }
    });
  }, L1 = (o) => {
    var c, h;
    const a = {
      ...Pe(),
      ...o
    };
    if ("quickOrder" in o) {
      const y = o.quickOrder ?? !1;
      a.quickOrderFloatingWindow = y, a.quickOrderPlusButton = y;
    } else if ("priceLine" in o) {
      const y = o.priceLine ?? !1;
      a.marketPriceLine = y, a.countDown = y, a.bidAskPrice = y;
    } else
      "quickOrderFloatingWindow" in o || "quickOrderPlusButton" in o ? a.quickOrder = a.quickOrderFloatingWindow || a.quickOrderPlusButton : ("marketPriceLine" in o || "countDown" in o || "bidAskPrice" in o) && (a.priceLine = a.marketPriceLine || a.countDown || a.bidAskPrice);
    mt(a), (h = (c = e.orderTools) == null ? void 0 : c.onChange) == null || h.call(c, a);
  }, w1 = (o) => {
    var c;
    const a = Math.min(Math.max(((c = L()) == null ? void 0 : c.pricePrecision) ?? 2, 0), 8);
    return o.toLocaleString(void 0, {
      minimumFractionDigits: a,
      maximumFractionDigits: a
    });
  }, Ye = (o = Date.now()) => {
    var Xe, Je, ct, On, Dn, Nn;
    if (!n || !t || !Pe().countDown) {
      B1(null);
      return;
    }
    n.setStyles({
      candle: {
        priceMark: {
          last: {
            show: !0,
            line: {
              show: Pe().marketPriceLine
            },
            text: {
              show: !1
            }
          }
        }
      }
    });
    const a = ((Xe = n.getDataList) == null ? void 0 : Xe.call(n)) ?? [], c = a[a.length - 1], h = Number(c == null ? void 0 : c.close);
    if (!c || !Number.isFinite(h) || h <= 0) {
      B1(null);
      return;
    }
    const y = (Je = n.convertToPixel) == null ? void 0 : Je.call(n, [{
      value: h
    }], {
      paneId: "candle_pane",
      absolute: !0
    }), p = Number((ct = y == null ? void 0 : y[0]) == null ? void 0 : ct.y), f = (On = n.getSize) == null ? void 0 : On.call(n, "candle_pane"), b = (f == null ? void 0 : f.height) ?? t.clientHeight;
    if (!Number.isFinite(p) || p < 0 || p > b) {
      B1(null);
      return;
    }
    const A = Math.min(Math.max(((Dn = L()) == null ? void 0 : Dn.pricePrecision) ?? 2, 0), 8), P = h.toLocaleString(void 0, {
      minimumFractionDigits: A,
      maximumFractionDigits: A
    }), N = (Nn = n.getSize) == null ? void 0 : Nn.call(n, "candle_pane", Ot.YAxis), j = N != null && N.width && Number.isFinite(N.width) ? Math.max(74, Math.floor(N.width) - 2) : 96, J = y0(w()), X = o % J, U = X === 0 ? J : J - X, G = Number(c.close), ye = Number(c.open), De = n.getStyles().candle.priceMark.last, E = De.text, ge = Number(E.size) || 12, re = Number(E.paddingTop) || 2, Ce = Number(E.paddingBottom) || 2, _e = Math.min(Number(E.paddingLeft) || 4, 3), Ge = Math.min(Number(E.paddingRight) || 4, 3), We = Math.max(34, ge * 2 + re + Ce + 6), r1 = Math.max(0, Math.min(p - We / 2, b - We));
    B1({
      top: r1,
      width: Math.min(j, Math.max(62, P.length * (ge * 0.56) + _e + Ge + 4)),
      priceText: P,
      text: sy(U),
      color: Number.isFinite(G) && Number.isFinite(ye) && G < ye ? De.downColor : De.upColor,
      textSize: ge,
      textFamily: E.family,
      textWeight: E.weight,
      paddingLeft: _e,
      paddingRight: Ge,
      paddingTop: re,
      paddingBottom: Ce,
      borderRadius: Number(E.borderRadius) || 2
    });
  }, kt = (o) => {
    var c, h;
    const a = Number(o == null ? void 0 : o.y);
    if (!Number.isFinite(a))
      return NaN;
    try {
      const y = n == null ? void 0 : n.convertFromPixel([{
        x: (o == null ? void 0 : o.x) ?? 0,
        y: a
      }], {
        paneId: "candle_pane"
      }), p = Number((c = y == null ? void 0 : y[0]) == null ? void 0 : c.value);
      if (Number.isFinite(p) && p > 0)
        return p;
    } catch {
    }
    try {
      const y = n == null ? void 0 : n.convertFromPixel([{
        x: (o == null ? void 0 : o.x) ?? 0,
        y: a
      }], {
        paneId: "candle_pane",
        absolute: !0
      }), p = Number((h = y == null ? void 0 : y[0]) == null ? void 0 : h.value);
      if (Number.isFinite(p) && p > 0)
        return p;
    } catch {
    }
    return NaN;
  }, xt = (o) => {
    var p;
    if (!Pe().quickOrderPlusButton || (o == null ? void 0 : o.paneId) !== "candle_pane" || !t) {
      if (pt() || $1())
        return;
      b1(null), t1(!1);
      return;
    }
    const a = (p = n == null ? void 0 : n.getSize) == null ? void 0 : p.call(n, "candle_pane", Ot.YAxis);
    a != null && a.width && Number.isFinite(a.width) && et(Math.max(44, Math.ceil(a.width)));
    const c = Number(o.y), h = kt(o), y = t.clientHeight;
    if (!Number.isFinite(c) || !Number.isFinite(h) || h <= 0 || c < 0 || c > y) {
      if (pt() || $1())
        return;
      b1(null), t1(!1);
      return;
    }
    F1 = {
      ...o
    }, b1({
      y: c,
      price: h
    });
  }, c1 = () => {
    var o;
    if (F1)
      try {
        (o = n == null ? void 0 : n.executeAction) == null || o.call(n, T1.OnCrosshairChange, F1);
      } catch {
      }
  }, z1 = (o) => {
    var c, h;
    const a = g1() ?? E1();
    a && ((h = (c = e.orderTools) == null ? void 0 : c.onQuickOrderAction) == null || h.call(c, {
      action: o,
      price: a.price,
      symbol: L()
    }), t1(!1), _1(null), Re(!1));
  }, o0 = async () => {
    var a;
    const o = g1() ?? E1();
    if (o) {
      try {
        await ((a = navigator.clipboard) == null ? void 0 : a.writeText(String(o.price)));
      } catch {
      }
      t1(!1), _1(null), Re(!1);
    }
  }, Lt = () => {
    const o = g1() ?? E1();
    o && (n == null || n.createOverlay(A1({
      name: "horizontalStraightLine",
      points: [{
        value: o.price
      }],
      lock: !1
    })), t1(!1), _1(null), Re(!1));
  }, i0 = (o) => {
    var b, A, P, N, j, J;
    const a = (A = (b = t == null ? void 0 : t.parentElement) == null ? void 0 : b.getBoundingClientRect) == null ? void 0 : A.call(b), c = (P = t == null ? void 0 : t.getBoundingClientRect) == null ? void 0 : P.call(t), h = o == null ? void 0 : o.overlay, y = (N = h == null ? void 0 : h.points) == null ? void 0 : N[0];
    let p = 72, f = 40;
    if (a) {
      if (Number.isFinite(o == null ? void 0 : o.pageX) ? p = o.pageX - a.left : Number.isFinite(o == null ? void 0 : o.x) && c && (p = c.left - a.left + o.x), Number.isFinite(o == null ? void 0 : o.pageY))
        f = o.pageY - a.top;
      else if (Number.isFinite(o == null ? void 0 : o.y) && c)
        f = c.top - a.top + o.y;
      else if (Number.isFinite(y == null ? void 0 : y.value))
        try {
          const X = (j = n == null ? void 0 : n.convertToPixel) == null ? void 0 : j.call(n, [{
            value: y.value
          }], {
            paneId: "candle_pane",
            absolute: !0
          }), U = Number((J = X == null ? void 0 : X[0]) == null ? void 0 : J.y);
          Number.isFinite(U) && (f = U - a.top);
        } catch {
        }
    }
    return {
      x: Math.max(12, Math.min(p - 28, ((a == null ? void 0 : a.width) ?? 360) - 320)),
      y: Math.max(8, f - 52)
    };
  }, it = (o) => {
    var b, A, P, N, j, J, X, U;
    const a = o == null ? void 0 : o.overlay;
    if (!(a != null && a.id) || a.name !== "horizontalStraightLine")
      return !1;
    const c = i0(o), h = Number((A = (b = a.styles) == null ? void 0 : b.line) == null ? void 0 : A.size) || 3, y = ((N = (P = a.styles) == null ? void 0 : P.line) == null ? void 0 : N.style) ?? o1.Solid, p = Array.isArray((J = (j = a.styles) == null ? void 0 : j.line) == null ? void 0 : J.dashedValue) ? a.styles.line.dashedValue : [], f = ((U = (X = a.styles) == null ? void 0 : X.line) == null ? void 0 : U.color) ?? "#2f6df6";
    return Ke({
      id: a.id,
      x: c.x,
      y: c.y,
      lineSize: h,
      lineStyle: y,
      dashedValue: p,
      color: f,
      locked: a.lock ?? !1,
      visible: a.visible ?? !0
    }), !1;
  }, at = (o) => {
    var c, h;
    const a = (c = o == null ? void 0 : o.overlay) == null ? void 0 : c.id;
    return (!a || ((h = Ee()) == null ? void 0 : h.id) === a) && (Ke(null), je(null)), !1;
  }, A1 = (o) => {
    var f, b, A, P, N, j, J, X, U;
    if (o.name !== "horizontalStraightLine")
      return o;
    const a = o.onClick, c = o.onSelected, h = o.onDeselected, y = o.onRemoved, p = o.onPressedMoveEnd;
    return {
      ...o,
      styles: {
        ...o.styles,
        line: {
          ...(f = o.styles) == null ? void 0 : f.line,
          size: Number((A = (b = o.styles) == null ? void 0 : b.line) == null ? void 0 : A.size) || 3,
          style: ((N = (P = o.styles) == null ? void 0 : P.line) == null ? void 0 : N.style) ?? o1.Solid,
          dashedValue: ((J = (j = o.styles) == null ? void 0 : j.line) == null ? void 0 : J.dashedValue) ?? [6, 4],
          color: ((U = (X = o.styles) == null ? void 0 : X.line) == null ? void 0 : U.color) ?? "#2f6df6"
        }
      },
      onClick: (G) => (it(G), (a == null ? void 0 : a(G)) ?? !1),
      onSelected: (G) => (it(G), (c == null ? void 0 : c(G)) ?? !1),
      onPressedMoveEnd: (G) => (it(G), (p == null ? void 0 : p(G)) ?? !1),
      onDeselected: (G) => (at(G), (h == null ? void 0 : h(G)) ?? !1),
      onRemoved: (G) => (at(G), (y == null ? void 0 : y(G)) ?? !1)
    };
  }, a0 = () => {
    var a;
    const o = Ee();
    o && ((a = n == null ? void 0 : n.removeOverlay) == null || a.call(n, {
      id: o.id
    }), Ke(null), je(null));
  }, u1 = (o) => {
    var c;
    const a = Ee();
    a && ((c = n == null ? void 0 : n.overrideOverlay) == null || c.call(n, {
      id: a.id,
      ...o
    }), setTimeout(() => {
      k1(a.id), x1();
    }, 0));
  }, v = () => {
    const o = Ee();
    if (!o)
      return;
    const a = !o.locked;
    u1({
      lock: a
    }), Ke({
      ...o,
      locked: a
    });
  }, S = () => {
    const o = Ee();
    if (!o)
      return;
    const a = !o.visible;
    u1({
      visible: a
    }), Ke({
      ...o,
      visible: a
    });
  }, we = (o) => {
    const a = Ee();
    a && (u1({
      styles: {
        line: {
          size: o
        }
      }
    }), Ke({
      ...a,
      lineSize: o
    }), je(null));
  }, Ae = (o, a) => {
    const c = Ee();
    c && (u1({
      styles: {
        line: {
          style: o,
          dashedValue: a
        }
      }
    }), Ke({
      ...c,
      lineStyle: o,
      dashedValue: a
    }), je(null));
  }, n1 = () => {
    const o = Ee();
    if (!o)
      return;
    const a = 1, c = o1.Solid, h = [6, 4], y = "#2f6df6";
    u1({
      styles: {
        line: {
          size: a,
          style: c,
          dashedValue: h,
          color: y
        }
      }
    }), Ke({
      ...o,
      lineSize: a,
      lineStyle: c,
      dashedValue: h,
      color: y
    }), je(null);
  }, M1 = (o) => {
    const a = Ee();
    a && (u1({
      styles: {
        line: {
          color: o
        }
      }
    }), Ke({
      ...a,
      color: o
    }));
  }, wt = (o) => {
    var P, N;
    const a = Ee();
    if (!a || !t)
      return;
    o.preventDefault(), o.stopPropagation(), je(null);
    const c = (N = (P = t.parentElement) == null ? void 0 : P.getBoundingClientRect) == null ? void 0 : N.call(P);
    if (!c)
      return;
    const h = o.clientX, y = o.clientY, p = a.x, f = a.y, b = (j) => {
      j.preventDefault();
      const J = p + j.clientX - h, X = f + j.clientY - y;
      Ke({
        ...a,
        x: Math.max(8, Math.min(J, c.width - 320)),
        y: Math.max(8, Math.min(X, c.height - 48))
      });
    }, A = () => {
      document.removeEventListener("mousemove", b), document.removeEventListener("mouseup", A);
    };
    document.addEventListener("mousemove", b), document.addEventListener("mouseup", A);
  }, At = () => {
    t1(!1), _1(null), Re(!1);
  }, st = (o) => {
    var c, h;
    if (!$1())
      return;
    const a = o.target;
    (c = a == null ? void 0 : a.closest) != null && c.call(a, ".klinecharts-pro-quick-order-marker") || (h = a == null ? void 0 : a.closest) != null && h.call(a, ".klinecharts-pro-quick-order-menu-anchor") || At();
  };
  let lt = (Cn = e.orderTools) == null ? void 0 : Cn.quickOrder, U0 = (vn = e.orderTools) == null ? void 0 : vn.quickOrderFloatingWindow, z0 = (bn = e.orderTools) == null ? void 0 : bn.quickOrderPlusButton, K0 = ($n = e.orderTools) == null ? void 0 : $n.openOrders, j0 = (_n = e.orderTools) == null ? void 0 : _n.openOrdersExtendedPriceLine, Q0 = (kn = e.orderTools) == null ? void 0 : kn.openOrdersDisplay, R0 = (xn = e.orderTools) == null ? void 0 : xn.positions, Z0 = (Ln = e.orderTools) == null ? void 0 : Ln.breakevenPrice, V0 = (wn = e.orderTools) == null ? void 0 : wn.liquidationPrice, H0 = (An = e.orderTools) == null ? void 0 : An.priceLine, q0 = (Mn = e.orderTools) == null ? void 0 : Mn.marketPriceLine, Y0 = (Tn = e.orderTools) == null ? void 0 : Tn.countDown, G0 = (Sn = e.orderTools) == null ? void 0 : Sn.bidAskPrice, W0 = (Pn = e.orderTools) == null ? void 0 : Pn.orderHistory;
  Be(() => {
    var G, ye, De, E, ge, re, Ce, _e, Ge, We, r1, Xe, Je, ct;
    const o = (G = e.orderTools) == null ? void 0 : G.quickOrder, a = (ye = e.orderTools) == null ? void 0 : ye.quickOrderFloatingWindow, c = (De = e.orderTools) == null ? void 0 : De.quickOrderPlusButton, h = (E = e.orderTools) == null ? void 0 : E.openOrders, y = (ge = e.orderTools) == null ? void 0 : ge.openOrdersExtendedPriceLine, p = (re = e.orderTools) == null ? void 0 : re.openOrdersDisplay, f = (Ce = e.orderTools) == null ? void 0 : Ce.positions, b = (_e = e.orderTools) == null ? void 0 : _e.breakevenPrice, A = (Ge = e.orderTools) == null ? void 0 : Ge.liquidationPrice, P = (We = e.orderTools) == null ? void 0 : We.priceLine, N = (r1 = e.orderTools) == null ? void 0 : r1.marketPriceLine, j = (Xe = e.orderTools) == null ? void 0 : Xe.countDown, J = (Je = e.orderTools) == null ? void 0 : Je.bidAskPrice, X = (ct = e.orderTools) == null ? void 0 : ct.orderHistory, U = {};
    typeof o == "boolean" && o !== lt && (lt = o, U.quickOrder = o, typeof a != "boolean" && (U.quickOrderFloatingWindow = o), typeof c != "boolean" && (U.quickOrderPlusButton = o)), typeof a == "boolean" && a !== U0 && (U0 = a, U.quickOrderFloatingWindow = a), typeof c == "boolean" && c !== z0 && (z0 = c, U.quickOrderPlusButton = c), typeof h == "boolean" && h !== K0 && (K0 = h, U.openOrders = h), typeof y == "boolean" && y !== j0 && (j0 = y, U.openOrdersExtendedPriceLine = y), p !== void 0 && p !== Q0 && (Q0 = p, U.openOrdersDisplay = p), typeof f == "boolean" && f !== R0 && (R0 = f, U.positions = f), typeof b == "boolean" && b !== Z0 && (Z0 = b, U.breakevenPrice = b), typeof A == "boolean" && A !== V0 && (V0 = A, U.liquidationPrice = A), typeof P == "boolean" && P !== H0 && (H0 = P, U.priceLine = P, typeof N != "boolean" && (U.marketPriceLine = P), typeof j != "boolean" && (U.countDown = P), typeof J != "boolean" && (U.bidAskPrice = P)), typeof N == "boolean" && N !== q0 && (q0 = N, U.marketPriceLine = N), typeof j == "boolean" && j !== Y0 && (Y0 = j, U.countDown = j), typeof J == "boolean" && J !== G0 && (G0 = J, U.bidAskPrice = J), typeof X == "boolean" && X !== W0 && (W0 = X, U.orderHistory = X), Object.keys(U).length > 0 && L1(U);
  }), Be(() => {
    Pe().marketPriceLine, Pe().countDown, w(), L(), n == null || n.setStyles({
      candle: {
        priceMark: {
          last: {
            show: !0,
            line: {
              show: Pe().marketPriceLine
            },
            text: {
              show: !Pe().countDown
            }
          }
        }
      }
    }), Ye();
  }), e.ref({
    setTheme: u,
    getTheme: () => d(),
    setStyles: k,
    getStyles: () => n.getStyles(),
    setLocale: M,
    getLocale: () => g(),
    setTimezone: (o) => {
      ee({
        key: o,
        text: $r(e.timezone, g())
      });
    },
    getTimezone: () => Y().key,
    setSymbol: O,
    getSymbol: () => L(),
    setPeriod: D,
    getPeriod: () => w(),
    getMainIndicators: () => F(),
    getSubIndicators: () => K(),
    setMainIndicators: R,
    setSubIndicators: pe,
    overrideIndicator: (o, a) => {
      n == null || n.overrideIndicator(o, a);
    },
    createOverlay: (o) => {
      var c;
      const a = (c = n == null ? void 0 : n.createOverlay) == null ? void 0 : c.call(n, A1(o));
      return typeof a == "string" ? a : null;
    },
    removeOverlay: (o) => {
      var a;
      if ((a = n == null ? void 0 : n.removeOverlay) == null || a.call(n, o), o.id) {
        ve.delete(o.id);
        const c = Oe.get(o.id);
        c && (c.checkInterval && clearInterval(c.checkInterval), c.mouseUpHandler && (document.removeEventListener("mouseup", c.mouseUpHandler), document.removeEventListener("touchend", c.mouseUpHandler)), Oe.delete(o.id)), x1();
      }
    },
    removeAllOverlay: () => {
      ve.forEach((o, a) => {
        var h;
        (h = n == null ? void 0 : n.removeOverlay) == null || h.call(n, {
          id: a
        });
        const c = Oe.get(a);
        c && (c.checkInterval && clearInterval(c.checkInterval), c.mouseUpHandler && (document.removeEventListener("mouseup", c.mouseUpHandler), document.removeEventListener("touchend", c.mouseUpHandler)));
      }), ve.clear(), Oe.clear();
    },
    getAllOverlay: () => Array.from(ve.values()),
    getOverlay: (o) => ve.get(o) || null,
    overrideOverlay: (o) => {
      n && "overrideOverlay" in n && typeof n.overrideOverlay == "function" ? n.overrideOverlay(o) : console.warn("overrideOverlay method not available on widget");
    },
    convertToPixel: (o, a) => n ? n.convertToPixel(o, a) : Array.isArray(o) ? [] : {},
    convertFromPixel: (o, a) => n ? n.convertFromPixel(o, a) : [],
    getVisibleRange: () => n ? n.getVisibleRange() : {
      from: 0,
      to: 0
    },
    getDataList: () => n ? n.getDataList() : [],
    getSize: (o, a) => n ? n.getSize(o, a) : null,
    getDom: (o, a) => n ? n.getDom(o, a) : null,
    subscribeAction: (o, a) => {
      n && n.subscribeAction(o, a);
    },
    unsubscribeAction: (o, a) => {
      n && n.unsubscribeAction(o, a);
    },
    setIndicatorModalVisible: q,
    setTimezoneModalVisible: ie,
    setSettingModalVisible: te,
    getOrderToolsState: () => Pe(),
    setOrderToolsState: (o) => {
      L1(o);
    },
    dispose: () => {
      t && In(t);
    },
    resize: () => {
      n && "resize" in n && typeof n.resize == "function" ? n.resize() : console.warn("resize method not available on widget");
    },
    getSettings: () => {
      var c, h, y, p, f, b, A, P, N, j, J, X, U, G, ye, De;
      if (!n)
        return {};
      const o = n.getStyles(), a = (c = o.candle) == null ? void 0 : c.bar;
      return {
        // Candle settings
        candleType: (h = o.candle) == null ? void 0 : h.type,
        candleBarStyle: a == null ? void 0 : a.style,
        // bar.style might be LineType
        showLastPrice: (f = (p = (y = o.candle) == null ? void 0 : y.priceMark) == null ? void 0 : p.last) == null ? void 0 : f.show,
        showHighestPrice: (P = (A = (b = o.candle) == null ? void 0 : b.priceMark) == null ? void 0 : A.high) == null ? void 0 : P.show,
        showLowestPrice: (J = (j = (N = o.candle) == null ? void 0 : N.priceMark) == null ? void 0 : j.low) == null ? void 0 : J.show,
        // Indicator settings
        showIndicatorLastValue: (U = (X = o.indicator) == null ? void 0 : X.lastValueMark) == null ? void 0 : U.show,
        // Axis settings - yAxis.reverse is boolean according to YAxisStyle interface
        priceAxisType: (G = o.yAxis) == null ? void 0 : G.type,
        reverseCoordinate: (ye = o.yAxis) == null ? void 0 : ye.reverse,
        // Grid settings
        showGrids: (De = o.grid) == null ? void 0 : De.show,
        timestamp: Date.now()
      };
    },
    setSettings: (o) => {
      var c, h, y, p, f, b, A, P, N, j, J, X, U, G;
      if (!n)
        return;
      const a = {};
      if (o.candleType !== void 0 && (a.candle = {
        ...a.candle,
        type: o.candleType
      }), o.candleBarStyle !== void 0) {
        const ye = ((c = a.candle) == null ? void 0 : c.bar) || {};
        a.candle = {
          ...a.candle,
          bar: {
            ...ye,
            style: o.candleBarStyle
          }
          // Use any since ChangeColor doesn't have style
        };
      }
      o.showLastPrice !== void 0 && (a.candle = {
        ...a.candle,
        priceMark: {
          ...(h = a.candle) == null ? void 0 : h.priceMark,
          last: {
            ...(p = (y = a.candle) == null ? void 0 : y.priceMark) == null ? void 0 : p.last,
            show: o.showLastPrice,
            text: {
              ...(A = (b = (f = a.candle) == null ? void 0 : f.priceMark) == null ? void 0 : b.last) == null ? void 0 : A.text,
              show: o.showLastPrice && !Pe().countDown
            }
          }
        }
      }), o.showHighestPrice !== void 0 && (a.candle = {
        ...a.candle,
        priceMark: {
          ...(P = a.candle) == null ? void 0 : P.priceMark,
          high: {
            ...(j = (N = a.candle) == null ? void 0 : N.priceMark) == null ? void 0 : j.high,
            show: o.showHighestPrice
          }
        }
      }), o.showLowestPrice !== void 0 && (a.candle = {
        ...a.candle,
        priceMark: {
          ...(J = a.candle) == null ? void 0 : J.priceMark,
          low: {
            ...(U = (X = a.candle) == null ? void 0 : X.priceMark) == null ? void 0 : U.low,
            show: o.showLowestPrice
          }
        }
      }), o.showIndicatorLastValue !== void 0 && (a.indicator = {
        ...a.indicator,
        lastValueMark: {
          ...(G = a.indicator) == null ? void 0 : G.lastValueMark,
          show: o.showIndicatorLastValue
        }
      }), o.priceAxisType !== void 0 && (a.yAxis = {
        ...a.yAxis,
        type: o.priceAxisType
      }), o.reverseCoordinate !== void 0 && (a.yAxis = {
        ...a.yAxis,
        reverse: o.reverseCoordinate
      }), o.showGrids !== void 0 && (a.grid = {
        ...a.grid,
        show: o.showGrids
      }), n.setStyles(a);
    },
    resetSettings: () => {
      var c, h, y, p, f, b, A;
      if (!n)
        return;
      n.getStyles();
      const o = {
        candle: {
          type: v9.CandleSolid,
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
          type: b9.Normal,
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
      }, a = Ie();
      if (a) {
        const P = {
          candle: {
            type: (c = a.candle) == null ? void 0 : c.type,
            bar: (h = a.candle) == null ? void 0 : h.bar,
            priceMark: (y = a.candle) == null ? void 0 : y.priceMark
          },
          indicator: {
            lastValueMark: (p = a.indicator) == null ? void 0 : p.lastValueMark
          },
          yAxis: {
            type: (f = a.yAxis) == null ? void 0 : f.type,
            reverse: (b = a.yAxis) == null ? void 0 : b.reverse
          },
          grid: {
            show: (A = a.grid) == null ? void 0 : A.show
          }
        };
        n.setStyles(P);
      } else
        n.setStyles(o);
    },
    // === Drawing Methods ===
    saveDrawings: (o) => {
      const a = Array.from(ve.values());
      a.forEach((c, h) => {
        var f;
        const y = m1(c.type), p = ((f = c.points) == null ? void 0 : f.length) || 0;
        p < y && console.warn(`âš ï¸ ${c.type} ${c.id} has only ${p} point(s), should have ${y}`);
      }), qe.saveDrawings(o, a);
    },
    loadDrawings: (o) => {
      qe.loadDrawings(o).forEach((c, h) => {
        var y;
        try {
          const p = {
            name: c.type,
            points: c.points || [],
            extendData: c.extendData,
            styles: c.styles,
            visible: c.visible ?? !0,
            lock: c.lock ?? !1,
            mode: c.mode ?? c0.Normal
          }, f = n == null ? void 0 : n.createOverlay(p), b = typeof f == "string" ? f : null;
          b && (ve.set(b, {
            ...c,
            id: b
          }), Oe.set(b, {
            monitoring: !1,
            complete: !0,
            lastPointCount: ((y = c.points) == null ? void 0 : y.length) || 0
          }));
        } catch (p) {
          console.error(`   âŒ Error restoring ${c.type}:`, p);
        }
      });
    },
    getDrawings: (o) => qe.loadDrawings(o),
    clearDrawings: (o) => {
      qe.clearDrawings(o);
    },
    // Auto-save on overlay events
    enableAutoSave: (o, a = !0) => {
    }
  });
  const X0 = () => {
    n == null || n.resize(), Ye(), tn();
  }, J0 = () => {
    Ye(), tn();
  }, en = [T1.OnVisibleRangeChange, T1.OnZoom, T1.OnScroll];
  let Mt;
  const c9 = (o) => {
    const a = new Date(o), c = a.getFullYear(), h = `${a.getMonth() + 1}`.padStart(2, "0"), y = `${a.getDate()}`.padStart(2, "0"), p = `${a.getHours()}`.padStart(2, "0"), f = `${a.getMinutes()}`.padStart(2, "0");
    return `${c}/${h}/${y} ${p}:${f}`;
  }, tn = () => {
    var y, p;
    const o = nt();
    if (!o || !n || !t)
      return;
    const a = (y = n.convertToPixel) == null ? void 0 : y.call(n, [{
      timestamp: o.timestamp
    }], {
      paneId: "candle_pane",
      absolute: !0
    }), c = Number((p = a == null ? void 0 : a[0]) == null ? void 0 : p.x), h = t.clientWidth;
    if (!Number.isFinite(c) || c < -80 || c > h + 80) {
      rt(null);
      return;
    }
    rt({
      ...o,
      left: Math.max(58, Math.min(c, h - 58))
    });
  }, u9 = (o) => {
    var y, p;
    if (!n || !t)
      return;
    const a = (y = n.convertToPixel) == null ? void 0 : y.call(n, [{
      timestamp: o
    }], {
      paneId: "candle_pane",
      absolute: !0
    }), c = Number((p = a == null ? void 0 : a[0]) == null ? void 0 : p.x), h = t.clientWidth;
    rt({
      timestamp: o,
      text: c9(o),
      left: Number.isFinite(c) ? Math.max(58, Math.min(c, h - 58)) : Math.max(58, Math.min(h / 2, h - 58))
    });
  }, s0 = (o, a, c) => {
    let h = a, y = h;
    switch (o.timespan) {
      case "minute": {
        h = h - h % (60 * 1e3), y = h - c * o.multiplier * 60 * 1e3;
        break;
      }
      case "hour": {
        h = h - h % (60 * 60 * 1e3), y = h - c * o.multiplier * 60 * 60 * 1e3;
        break;
      }
      case "day": {
        h = h - h % (60 * 60 * 1e3), y = h - c * o.multiplier * 24 * 60 * 60 * 1e3;
        break;
      }
      case "week": {
        const f = new Date(h).getDay(), b = f === 0 ? 6 : f - 1;
        h = h - b * 60 * 60 * 24;
        const A = new Date(h);
        h = (/* @__PURE__ */ new Date(`${A.getFullYear()}-${A.getMonth() + 1}-${A.getDate()}`)).getTime(), y = c * o.multiplier * 7 * 24 * 60 * 60 * 1e3;
        break;
      }
      case "month": {
        const p = new Date(h), f = p.getFullYear(), b = p.getMonth() + 1;
        h = (/* @__PURE__ */ new Date(`${f}-${b}-01`)).getTime(), y = c * o.multiplier * 30 * 24 * 60 * 60 * 1e3;
        const A = new Date(y);
        y = (/* @__PURE__ */ new Date(`${A.getFullYear()}-${A.getMonth() + 1}-01`)).getTime();
        break;
      }
      case "year": {
        const f = new Date(h).getFullYear();
        h = (/* @__PURE__ */ new Date(`${f}-01-01`)).getTime(), y = c * o.multiplier * 365 * 24 * 60 * 60 * 1e3;
        const b = new Date(y);
        y = (/* @__PURE__ */ new Date(`${b.getFullYear()}-01-01`)).getTime();
        break;
      }
    }
    return [y, h];
  }, d9 = (o, a = 500) => {
    const c = y0(w()), h = Math.max(1, Math.floor(a / 2)) * c;
    return {
      from: o - h,
      to: o + h
    };
  }, l0 = (o) => {
    var a;
    !n || !Number.isFinite(o) || ((a = n.scrollToTimestamp) == null || a.call(n, o, 250), requestAnimationFrame(() => u9(o)), Ye());
  }, Tt = () => {
    var c, h;
    se && ((c = n == null ? void 0 : n.removeOverlay) == null || c.call(n, {
      id: se
    }), se = null);
    const o = xe();
    if (!n || !o.enabled || !o.anchorLine)
      return;
    const a = (h = n.createOverlay) == null ? void 0 : h.call(n, {
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
    se = typeof a == "string" ? a : null;
  }, nn = async (o, a) => {
    if (n) {
      s(!0), ue(!0);
      try {
        const c = w(), h = o.from <= o.to ? o : {
          from: o.to,
          to: o.from
        }, y = await e.datafeed.getHistoryKLineData(L(), c, h.from, h.to);
        n.applyNewData(y, y.length > 0), Q(h), requestAnimationFrame(() => {
          l0(a ?? h.to), Tt();
        });
      } finally {
        s(!1), ue(!1);
      }
    }
  }, h9 = async (o) => {
    Z(o), await nn(d9(o), o);
  }, f9 = (o) => {
    ze(o), o.enabled && (Z(o.timestamp), requestAnimationFrame(() => l0(o.timestamp))), requestAnimationFrame(Tt);
  };
  w0(() => {
    if (window.addEventListener("resize", X0), n = C9(t, {
      customApi: {
        formatDate: (f, b, A, P) => {
          switch (w().timespan) {
            case "minute":
              return P === Pt.XAxis ? le.formatDate(f, b, "HH:mm") : le.formatDate(f, b, "YYYY-MM-DD HH:mm");
            case "hour":
              return P === Pt.XAxis ? le.formatDate(f, b, "MM-DD HH:mm") : le.formatDate(f, b, "YYYY-MM-DD HH:mm");
            case "day":
            case "week":
              return le.formatDate(f, b, "YYYY-MM-DD");
            case "month":
              return P === Pt.XAxis ? le.formatDate(f, b, "YYYY-MM") : le.formatDate(f, b, "YYYY-MM-DD");
            case "year":
              return P === Pt.XAxis ? le.formatDate(f, b, "YYYY") : le.formatDate(f, b, "YYYY-MM-DD");
          }
          return le.formatDate(f, b, "YYYY-MM-DD HH:mm");
        }
      }
    }), n) {
      const f = n.getDom("candle_pane", Ot.Main);
      if (f) {
        let A = document.createElement("div");
        if (A.className = "klinecharts-pro-watermark", le.isString(e.watermark)) {
          const P = e.watermark.replace(/(^\s*)|(\s*$)/g, "");
          A.innerHTML = P;
        } else
          A.appendChild(e.watermark);
        f.appendChild(A);
      }
      const b = n.getDom("candle_pane", Ot.YAxis);
      r = document.createElement("span"), r.className = "klinecharts-pro-price-unit", b == null || b.appendChild(r);
    }
    let o = !1;
    const a = () => {
      const f = L();
      if (f != null && f.ticker)
        try {
          const b = Array.from(ve.values());
          qe.saveDrawings(f.ticker, b);
        } catch (b) {
          console.error("âŒ Error refreshing local storage:", b);
        }
    }, c = (f) => {
      o || (o = !0, f.preventDefault());
    };
    setTimeout(() => {
      t && t.addEventListener("contextmenu", c);
    }, 1e3), document.addEventListener("contextmenu", (f) => {
      t && t.contains(f.target) && c(f);
    });
    const h = n == null ? void 0 : n.removeOverlay;
    n && h && (n.removeOverlay = function(...f) {
      const b = h.apply(this, f), A = f[0];
      let P;
      if (typeof A == "string" ? P = A : A && typeof A == "object" && A.id && (P = A.id), P) {
        ve.delete(P);
        const N = Oe.get(P);
        N && (N.checkInterval && clearInterval(N.checkInterval), N.mouseUpHandler && (document.removeEventListener("mouseup", N.mouseUpHandler), document.removeEventListener("touchend", N.mouseUpHandler)), Oe.delete(P)), a();
      }
      return b;
    }), F().forEach((f) => {
      Ft(n, f, !0, {
        id: "candle_pane"
      });
    });
    const y = {};
    e.subIndicators.forEach((f) => {
      const b = Ft(n, f, !0);
      b && (y[f] = b);
    }), pe(y), n == null || n.loadMore((f) => {
      s(!0), (async () => {
        try {
          const A = w(), [P] = s0(A, f, 1), [N] = s0(A, P, 500), j = await e.datafeed.getHistoryKLineData(L(), A, N, P);
          n == null || n.applyMoreData(j, j.length > 0);
        } finally {
          s(!1);
        }
      })();
    }), n == null || n.subscribeAction(T1.OnTooltipIconClick, (f) => {
      if (f.indicatorName)
        switch (f.iconId) {
          case "visible": {
            n == null || n.overrideIndicator({
              name: f.indicatorName,
              visible: !0
            }, f.paneId);
            const b = f.paneId === "candle_pane" ? "main" : "sub";
            He(f.indicatorName, f.paneId, b, "change");
            break;
          }
          case "invisible": {
            n == null || n.overrideIndicator({
              name: f.indicatorName,
              visible: !1
            }, f.paneId);
            const b = f.paneId === "candle_pane" ? "main" : "sub";
            He(f.indicatorName, f.paneId, b, "change");
            break;
          }
          case "setting": {
            const b = n == null ? void 0 : n.getIndicatorByPaneId(f.paneId, f.indicatorName);
            vt({
              visible: !0,
              indicatorName: f.indicatorName,
              paneId: f.paneId,
              calcParams: b.calcParams
            });
            break;
          }
          case "close":
            if (f.paneId === "candle_pane") {
              const b = [...F()];
              n == null || n.removeIndicator("candle_pane", f.indicatorName), b.splice(b.indexOf(f.indicatorName), 1), R(b), He(f.indicatorName, "candle_pane", "main", "remove");
            } else {
              const b = {
                ...K()
              };
              n == null || n.removeIndicator(f.paneId, f.indicatorName), delete b[f.indicatorName], pe(b), He(f.indicatorName, f.paneId, "sub", "remove");
            }
        }
    }), n == null || n.subscribeAction(T1.OnCrosshairChange, xt), en.forEach((f) => {
      n == null || n.subscribeAction(f, J0);
    }), Mt = window.setInterval(() => Ye(), 1e3), Ye(), document.addEventListener("mousedown", st);
    const p = n == null ? void 0 : n.createOverlay;
    n && p && (n.createOverlay = function(...f) {
      const b = A1(f[0]), A = p.apply(this, [b, ...f.slice(1)]), P = typeof A == "string" ? A : null;
      return P && (_t(P, b.name || "unknown"), k1(P), x1()), A;
    });
  }), D1(() => {
    window.removeEventListener("resize", X0), n == null || n.unsubscribeAction(T1.OnCrosshairChange, xt), en.forEach((o) => {
      n == null || n.unsubscribeAction(o, J0);
    }), Mt && (window.clearInterval(Mt), Mt = void 0), document.removeEventListener("mousedown", st), Oe.clear(), ve.clear(), In(t);
  }), Be(() => {
    const o = L();
    o != null && o.priceCurrency ? (r.innerHTML = o == null ? void 0 : o.priceCurrency.toLocaleUpperCase(), r.style.display = "flex") : r.style.display = "none", n == null || n.setPriceVolumePrecision((o == null ? void 0 : o.pricePrecision) ?? 2, (o == null ? void 0 : o.volumePrecision) ?? 0);
  });
  const y9 = (o) => {
    const a = new Date(o), c = a.getFullYear(), h = `${a.getMonth() + 1}`.padStart(2, "0"), y = `${a.getDate()}`.padStart(2, "0"), p = `${a.getHours()}`.padStart(2, "0"), f = `${a.getMinutes()}`.padStart(2, "0"), b = `${c}-${h}-${y}`;
    switch (w().timespan) {
      case "minute":
      case "hour":
        return `${b} ${p}:${f}`;
      case "day":
      case "week":
        return b;
      case "month":
        return b;
      case "year":
        return b;
    }
    return `${b} ${p}:${f}`;
  }, g9 = (o, a) => {
    var A, P;
    const {
      current: c
    } = o, h = a.tooltip.text.color, y = c.close > c.open ? a.bar.upColor : c.close < c.open ? a.bar.downColor : a.bar.noChangeColor, p = Math.min(Math.max(((A = L()) == null ? void 0 : A.pricePrecision) ?? 2, 0), 8), f = Math.min(Math.max(((P = L()) == null ? void 0 : P.volumePrecision) ?? 0, 0), 8), b = (N) => ({
      text: le.formatPrecision(N, p),
      color: y
    });
    return [{
      title: "time",
      value: {
        text: y9(c.timestamp),
        color: h
      }
    }, {
      title: "open",
      value: b(c.open)
    }, {
      title: "high",
      value: b(c.high)
    }, {
      title: "low",
      value: b(c.low)
    }, {
      title: "close",
      value: b(c.close)
    }, {
      title: "volume",
      value: {
        text: le.formatBigNumber(le.formatPrecision(c.volume ?? a.tooltip.defaultValue, f)),
        color: y
      }
    }];
  }, St = () => {
    n == null || n.setStyles({
      candle: {
        tooltip: {
          custom: g9,
          rect: {
            offsetLeft: 0,
            paddingLeft: 0
          }
        }
      }
    });
  };
  return Be((o) => {
    const a = L(), c = w();
    let h = !0;
    return D1(() => {
      h = !1;
    }), o && e.datafeed.unsubscribe(o.symbol, o.period), s(!0), ue(!0), (async () => {
      try {
        const p = xe(), f = p.enabled && (!o || o.symbol.ticker === a.ticker || p.acrossTokens), b = f ? p.timestamp + y0(c) * 250 : (/* @__PURE__ */ new Date()).getTime(), [A, P] = s0(c, b, 500), N = await e.datafeed.getHistoryKLineData(a, c, A, P);
        if (!h)
          return;
        n == null || n.applyNewData(N, N.length > 0), f ? requestAnimationFrame(() => {
          l0(p.timestamp), Tt();
        }) : Tt(), Ye(), setTimeout(() => {
          h && (r0(a == null ? void 0 : a.ticker), Ye());
        }, 0), e.datafeed.subscribe(a, c, (j) => {
          n == null || n.updateData(j), Ye();
        });
      } finally {
        h && (s(!1), ue(!1));
      }
    })(), {
      symbol: a,
      period: c
    };
  }), Be(() => {
    const o = d();
    n == null || n.setStyles(o);
    const a = o === "dark" ? "#929AA5" : "#76808F";
    St(), n == null || n.setStyles({
      indicator: {
        tooltip: {
          icons: [{
            id: "visible",
            position: Dt.Middle,
            marginLeft: B().visibleMarginLeft,
            marginTop: B().marginTop,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: B().size,
            color: a,
            activeColor: a,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "invisible",
            position: Dt.Middle,
            marginLeft: B().secondaryMarginLeft,
            marginTop: B().marginTop,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: B().size,
            color: a,
            activeColor: a,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "setting",
            position: Dt.Middle,
            marginLeft: B().secondaryMarginLeft,
            marginTop: B().marginTop,
            marginBottom: 0,
            marginRight: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: B().size,
            color: a,
            activeColor: a,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "close",
            position: Dt.Middle,
            marginLeft: B().secondaryMarginLeft,
            marginTop: B().marginTop,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: B().size,
            color: a,
            activeColor: a,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }]
        }
      }
    });
  }), Be(() => {
    n == null || n.setLocale(g());
  }), Be(() => {
    n == null || n.setTimezone(Y().key);
  }), Be(() => {
    m() && (n == null || n.setStyles(m()), St(), Fe(Ts(n.getStyles())));
  }), [Hf.cloneNode(!0), x(Fd, {
    get locale() {
      return e.locale;
    },
    get symbol() {
      return L();
    },
    get spread() {
      return Te();
    },
    get period() {
      return w();
    },
    get periods() {
      return e.periods;
    },
    onMenuClick: async () => {
      try {
        await R9(() => _(!Te())), n == null || n.resize();
      } catch {
      }
    },
    onSymbolClick: () => {
      Le(!ce());
    },
    get onMobilePeriodClick() {
      return e.onMobilePeriodClick;
    },
    onMobileMoreClick: () => {
      e.onMobileMoreClick ? e.onMobileMoreClick() : l1(!0);
    },
    onPeriodChange: D,
    onTimeToolsClick: () => {
      var b, A, P, N, j;
      const o = ((b = n == null ? void 0 : n.getDataList) == null ? void 0 : b.call(n)) ?? [], a = (A = n == null ? void 0 : n.getVisibleRange) == null ? void 0 : A.call(n), c = Math.max(0, Math.floor((a == null ? void 0 : a.from) ?? 0)), h = Math.min(o.length - 1, Math.ceil((a == null ? void 0 : a.to) ?? o.length - 1)), y = (P = o[c]) == null ? void 0 : P.timestamp, p = (N = o[h]) == null ? void 0 : N.timestamp, f = p ?? ((j = o[o.length - 1]) == null ? void 0 : j.timestamp) ?? Date.now();
      Z(f), Number.isFinite(y) && Number.isFinite(p) && Q({
        from: y,
        to: p
      }), ne(!0);
    },
    onIndicatorClick: () => {
      q((o) => !o);
    },
    onTimezoneClick: () => {
      ie((o) => !o);
    },
    onSettingClick: () => {
      te((o) => !o);
    },
    onScreenshotClick: () => {
      if (n) {
        const o = e.screenshotBackgroundColor || (e.theme === "dark" ? "#11131E" : "#ffffff"), a = n.getConvertPictureUrl(!0, "jpeg", o);
        e1(a);
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
      return Pe();
    },
    onOrderToolsStateChange: L1
  }), (() => {
    const o = qf.cloneNode(!0), a = o.firstChild;
    return o.addEventListener("mouseleave", () => {
      b1(null), Re(!1);
    }), C(o, x(V, {
      get when() {
        return s1();
      },
      get children() {
        return x(i9, {});
      }
    }), a), C(o, x(V, {
      get when() {
        return Te();
      },
      get children() {
        return x(gf, {
          get locale() {
            return e.locale;
          },
          onDrawingItemClick: (c) => {
            n == null || n.createOverlay(A1(c));
          },
          onModeChange: (c) => {
            n == null || n.overrideOverlay({
              mode: c
            });
          },
          onLockChange: (c) => {
            n == null || n.overrideOverlay({
              lock: c
            });
          },
          onVisibleChange: (c) => {
            n == null || n.overrideOverlay({
              visible: c
            });
          },
          onRemoveClick: (c) => {
            n == null || n.removeOverlay({
              groupId: c
            });
          }
        });
      }
    }), a), O1((c) => t = c, a), C(o, x(V, {
      get when() {
        return nt();
      },
      keyed: !0,
      children: (c) => (() => {
        const h = Yf.cloneNode(!0);
        return C(h, () => c.text), I(() => h.style.setProperty("left", `${c.left}px`)), h;
      })()
    }), null), C(o, x(V, {
      get when() {
        return Ct();
      },
      keyed: !0,
      children: (c) => (() => {
        const h = Gf.cloneNode(!0), y = h.firstChild, p = y.nextSibling;
        return h.style.setProperty("right", "0px"), C(y, () => c.priceText), C(p, () => c.text), I((f) => {
          const b = `${c.top}px`, A = `${c.width}px`, P = c.color, N = `${c.borderRadius}px`, j = c.textFamily, J = c.textWeight, X = `${c.paddingLeft}px`, U = `${c.paddingRight}px`, G = `${c.paddingTop}px`, ye = `${c.paddingBottom}px`, De = `${c.textSize}px`, E = `${Math.max(10, c.textSize - 1)}px`;
          return b !== f._v$ && h.style.setProperty("top", f._v$ = b), A !== f._v$2 && h.style.setProperty("width", f._v$2 = A), P !== f._v$3 && h.style.setProperty("background", f._v$3 = P), N !== f._v$4 && h.style.setProperty("border-radius", f._v$4 = N), j !== f._v$5 && h.style.setProperty("font-family", f._v$5 = j), J !== f._v$6 && h.style.setProperty("font-weight", f._v$6 = J), X !== f._v$7 && h.style.setProperty("padding-left", f._v$7 = X), U !== f._v$8 && h.style.setProperty("padding-right", f._v$8 = U), G !== f._v$9 && h.style.setProperty("padding-top", f._v$9 = G), ye !== f._v$10 && h.style.setProperty("padding-bottom", f._v$10 = ye), De !== f._v$11 && y.style.setProperty("font-size", f._v$11 = De), E !== f._v$12 && p.style.setProperty("font-size", f._v$12 = E), f;
        }, {
          _v$: void 0,
          _v$2: void 0,
          _v$3: void 0,
          _v$4: void 0,
          _v$5: void 0,
          _v$6: void 0,
          _v$7: void 0,
          _v$8: void 0,
          _v$9: void 0,
          _v$10: void 0,
          _v$11: void 0,
          _v$12: void 0
        }), h;
      })()
    }), null), C(o, x(V, {
      get when() {
        return Ee();
      },
      keyed: !0,
      children: (c) => (() => {
        const h = ey.cloneNode(!0), y = h.firstChild, p = y.nextSibling, f = p.nextSibling, b = f.firstChild, A = f.nextSibling, P = A.firstChild, N = P.firstChild, j = N.nextSibling, J = j.firstChild, X = A.nextSibling, U = X.firstChild, G = X.nextSibling, ye = G.nextSibling, De = ye.nextSibling;
        return h.$$click = (E) => {
          E.stopPropagation();
        }, h.$$mousedown = (E) => {
          E.preventDefault(), E.stopPropagation();
        }, y.$$mousedown = wt, p.$$click = n1, b.$$click = () => je(Ve() === "color" ? null : "color"), C(f, x(V, {
          get when() {
            return Ve() === "color";
          },
          get children() {
            const E = Wf.cloneNode(!0), ge = E.firstChild;
            return C(ge, x(p0, {
              each: ot,
              children: (re) => (() => {
                const Ce = ty.cloneNode(!0);
                return Ce.$$click = () => M1(re), Ce.style.setProperty("background", re), I(() => oe(Ce, `overlay-toolbar-color-swatch ${c.color.toLowerCase() === re.toLowerCase() ? "selected" : ""}`)), Ce;
              })()
            })), E;
          }
        }), null), P.$$click = () => je(Ve() === "width" ? null : "width"), C(j, () => c.lineSize, J), C(A, x(V, {
          get when() {
            return Ve() === "width";
          },
          get children() {
            const E = Xf.cloneNode(!0);
            return C(E, x(p0, {
              each: [1, 2, 3, 4],
              children: (ge) => (() => {
                const re = ny.cloneNode(!0), Ce = re.firstChild;
                return re.$$click = () => we(ge), Ce.style.setProperty("height", `${ge}px`), I(() => oe(re, c.lineSize === ge ? "selected" : "")), re;
              })()
            })), E;
          }
        }), null), U.$$click = () => je(Ve() === "style" ? null : "style"), C(X, x(V, {
          get when() {
            return Ve() === "style";
          },
          get children() {
            const E = Jf.cloneNode(!0), ge = E.firstChild, re = ge.nextSibling, Ce = re.nextSibling;
            return ge.$$click = () => Ae(o1.Solid, []), re.$$click = () => Ae(o1.Dashed, [6, 4]), Ce.$$click = () => Ae(o1.Dashed, [2, 4]), I((_e) => {
              var Xe, Je;
              const Ge = c.lineStyle === o1.Solid ? "selected" : "", We = c.lineStyle === o1.Dashed && ((Xe = c.dashedValue) == null ? void 0 : Xe[0]) === 6 ? "selected" : "", r1 = c.lineStyle === o1.Dashed && ((Je = c.dashedValue) == null ? void 0 : Je[0]) === 2 ? "selected" : "";
              return Ge !== _e._v$13 && oe(ge, _e._v$13 = Ge), We !== _e._v$14 && oe(re, _e._v$14 = We), r1 !== _e._v$15 && oe(Ce, _e._v$15 = r1), _e;
            }, {
              _v$13: void 0,
              _v$14: void 0,
              _v$15: void 0
            }), E;
          }
        }), null), G.$$click = S, ye.$$click = v, De.$$click = a0, I((E) => {
          const ge = `${c.x}px`, re = `${c.y}px`, Ce = `overlay-toolbar-icon edit ${Ve() === "color" ? "active" : ""}`, _e = `overlay-toolbar-line-size ${Ve() === "width" ? "active" : ""}`, Ge = `overlay-toolbar-icon minus ${Ve() === "style" ? "active" : ""}`, We = `overlay-toolbar-icon visibility ${c.visible ? "" : "muted"}`, r1 = c.visible ? "Hide" : "Show", Xe = `overlay-toolbar-icon lock ${c.locked ? "active" : ""}`, Je = c.locked ? "Unlock" : "Lock";
          return ge !== E._v$16 && h.style.setProperty("left", E._v$16 = ge), re !== E._v$17 && h.style.setProperty("top", E._v$17 = re), Ce !== E._v$18 && oe(b, E._v$18 = Ce), _e !== E._v$19 && oe(P, E._v$19 = _e), Ge !== E._v$20 && oe(U, E._v$20 = Ge), We !== E._v$21 && oe(G, E._v$21 = We), r1 !== E._v$22 && Me(G, "title", E._v$22 = r1), Xe !== E._v$23 && oe(ye, E._v$23 = Xe), Je !== E._v$24 && Me(ye, "title", E._v$24 = Je), E;
        }, {
          _v$16: void 0,
          _v$17: void 0,
          _v$18: void 0,
          _v$19: void 0,
          _v$20: void 0,
          _v$21: void 0,
          _v$22: void 0,
          _v$23: void 0,
          _v$24: void 0
        }), h;
      })()
    }), null), C(o, x(V, {
      get when() {
        return E1();
      },
      keyed: !0,
      children: (c) => (() => {
        const h = ry.cloneNode(!0), y = h.firstChild;
        return h.addEventListener("mouseleave", () => {
          $1() || Re(!1);
        }), h.$$mousemove = (p) => {
          p.stopPropagation(), c1();
        }, h.addEventListener("mouseenter", () => {
          Re(!0), c1();
        }), y.$$click = (p) => {
          p.stopPropagation(), Re(!0), _1({
            y: c.y,
            price: c.price,
            yAxisWidth: J1()
          }), t1(!0), c1();
        }, y.$$mousedown = (p) => {
          p.preventDefault(), p.stopPropagation(), c1();
        }, C(y, (() => {
          const p = H(() => {
            var f;
            return !!((f = e.orderTools) != null && f.quickOrderPlusIcon);
          });
          return () => p() ? (() => {
            const f = oy.cloneNode(!0);
            return I(() => f.innerHTML = e.orderTools.quickOrderPlusIcon), f;
          })() : iy.cloneNode(!0);
        })()), I((p) => {
          const f = `${Math.max(0, c.y - 12)}px`, b = `${J1()}px`, A = Pe().quickOrderPlusButton ? "block" : "none";
          return f !== p._v$25 && h.style.setProperty("top", p._v$25 = f), b !== p._v$26 && h.style.setProperty("right", p._v$26 = b), A !== p._v$27 && h.style.setProperty("display", p._v$27 = A), p;
        }, {
          _v$25: void 0,
          _v$26: void 0,
          _v$27: void 0
        }), h;
      })()
    }), null), C(o, x(V, {
      get when() {
        return H(() => !!$1())() && g1();
      },
      keyed: !0,
      children: (c) => (() => {
        const h = ay.cloneNode(!0), y = h.firstChild, p = y.firstChild, f = p.firstChild, b = f.nextSibling, A = b.nextSibling, P = A.nextSibling;
        P.nextSibling;
        const N = p.nextSibling, j = N.firstChild, J = j.nextSibling, X = J.nextSibling, U = X.nextSibling;
        U.nextSibling;
        const G = N.nextSibling, ye = G.nextSibling, De = ye.firstChild, E = De.nextSibling;
        E.nextSibling;
        const ge = ye.nextSibling;
        return ge.firstChild, h.addEventListener("mouseleave", () => Re(!1)), h.addEventListener("mouseenter", () => Re(!0)), y.$$mousemove = () => {
          c1();
        }, y.$$mousedown = (re) => {
          re.preventDefault(), re.stopPropagation(), c1();
        }, p.$$click = () => z1("limit"), C(p, () => L().shortName ?? L().name ?? L().ticker, b), C(p, () => w1(c.price), P), N.$$click = () => z1("stop"), C(N, () => L().shortName ?? L().name ?? L().ticker, J), C(N, () => w1(c.price), U), G.$$click = () => z1("create"), ye.$$click = o0, C(ye, () => w1(c.price), E), ge.$$click = Lt, C(ge, () => w1(c.price), null), I((re) => {
          const Ce = `${Math.max(0, c.y + 24)}px`, _e = `${c.yAxisWidth + tt}px`;
          return Ce !== re._v$28 && h.style.setProperty("top", re._v$28 = Ce), _e !== re._v$29 && h.style.setProperty("right", re._v$29 = _e), re;
        }, {
          _v$28: void 0,
          _v$29: void 0
        }), h;
      })()
    }), null), I(() => Me(a, "data-drawing-bar-visible", Te())), o;
  })(), x(V, {
    get when() {
      return ce();
    },
    get children() {
      return x(Pf, {
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
          Le(!1);
        }
      });
    }
  }), x(V, {
    get when() {
      return W();
    },
    get children() {
      return x(mf, {
        get locale() {
          return e.locale;
        },
        get mainIndicators() {
          return F();
        },
        get subIndicators() {
          return K();
        },
        onClose: () => {
          q(!1);
        },
        onMainIndicatorChange: (o) => {
          const a = [...F()];
          o.added ? (Ft(n, o.name, !0, {
            id: "candle_pane"
          }), a.push(o.name), He(o.name, "candle_pane", "main", "add")) : (n == null || n.removeIndicator("candle_pane", o.name), a.splice(a.indexOf(o.name), 1), He(o.name, "candle_pane", "main", "remove")), R(a);
        },
        onSubIndicatorChange: (o) => {
          const a = {
            ...K()
          };
          if (o.added) {
            const c = Ft(n, o.name);
            c && (a[o.name] = c, He(o.name, c, "sub", "add"));
          } else
            o.paneId && (n == null || n.removeIndicator(o.paneId, o.name), delete a[o.name], He(o.name, o.paneId, "sub", "remove"));
          pe(a);
        }
      });
    }
  }), x(V, {
    get when() {
      return be();
    },
    get children() {
      return x(Cf, {
        get locale() {
          return e.locale;
        },
        get timezone() {
          return Y();
        },
        onClose: () => {
          ie(!1);
        },
        onConfirm: ee
      });
    }
  }), x(V, {
    get when() {
      return ae();
    },
    get children() {
      return x($f, {
        get locale() {
          return e.locale;
        },
        get currentStyles() {
          return le.clone(n.getStyles());
        },
        onClose: () => {
          te(!1);
        },
        onChange: (o) => {
          n == null || n.setStyles(o), St();
        },
        onRestoreDefault: (o) => {
          const a = {};
          o.forEach((c) => {
            const h = c.key;
            v0(a, h, le.formatValue(Ie(), h));
          }), n == null || n.setStyles(a), St();
        }
      });
    }
  }), x(V, {
    get when() {
      return Ue().length > 0;
    },
    get children() {
      return x(kf, {
        get locale() {
          return e.locale;
        },
        get url() {
          return Ue();
        },
        onClose: () => {
          e1("");
        }
      });
    }
  }), x(V, {
    get when() {
      return me();
    },
    get children() {
      return x(Vf, {
        get initialTimestamp() {
          return $e();
        },
        get initialRange() {
          return z();
        },
        get anchorSettings() {
          return xe();
        },
        onClose: () => {
          ne(!1);
        },
        onGoToDate: h9,
        onTimeRange: (o) => {
          nn(o);
        },
        onTimeAnchorChange: f9
      });
    }
  }), x(V, {
    get when() {
      return U1().visible;
    },
    get children() {
      return x(Af, {
        get locale() {
          return e.locale;
        },
        get params() {
          return U1();
        },
        onClose: () => {
          vt({
            visible: !1,
            indicatorName: "",
            paneId: "",
            calcParams: []
          });
        },
        onConfirm: (o) => {
          const a = U1();
          n == null || n.overrideIndicator({
            name: a.indicatorName,
            calcParams: o
          }, a.paneId);
          const c = a.paneId === "candle_pane" ? "main" : "sub";
          He(a.indicatorName, a.paneId, c, "change");
        }
      });
    }
  }), x(V, {
    get when() {
      return y1();
    },
    get children() {
      return x(Df, {
        get locale() {
          return e.locale;
        },
        onIndicatorClick: () => {
          q(!0);
        },
        onTimezoneClick: () => {
          ie(!0);
        },
        onSettingClick: () => {
          te(!0);
        },
        onClose: () => {
          l1(!1);
        }
      });
    }
  })];
};
Qe(["mousedown", "click", "mousemove"]);
const cy = /* @__PURE__ */ $('<svg class="logo" viewBox="0 0 80 92"><path d="M28.148808359375,51.7280513671875L22.963588359375,51.7280513671875C21.572648359375002,51.7280513671875,20.445068359375,52.6220613671875,20.445068359375,53.7248813671875L20.445068359375,72.3979013671875C20.445068359375,73.5007013671875,21.572648359375002,74.39470136718751,22.963588359375,74.39470136718751L33.926568359375,74.39470136718751C35.317468359375,74.39470136718751,36.445068359375,73.5007013671875,36.445068359375,72.3979013671875L36.445068359375,53.7248813671875C36.445068359375,52.6220613671875,35.317468359375,51.7280513671875,33.926568359375,51.7280513671875L28.741398359374998,51.7280513671875L28.741398359374998,46.2963223671875C28.741398359374998,46.1665793671875,28.608748359375,46.0614013671875,28.445108359375,46.0614013671875C28.281468359375,46.0614013671875,28.148808359375,46.1665793671875,28.148808359375,46.2963223671875L28.148808359375,51.7280513671875ZM28.741398359374998,74.3948013671875L28.741398359374998,79.82650136718749C28.741398359374998,79.9563013671875,28.608748359375,80.0614013671875,28.445108359375,80.0614013671875C28.281468359375,80.0614013671875,28.148808359375,79.9563013671875,28.148808359375,79.82650136718749L28.148808359375,74.3948013671875L28.741398359374998,74.3948013671875Z"></path><path d="M51.148808359374996,44.7280513671875L45.963588359375,44.7280513671875C44.572648359375,44.7280513671875,43.445068359375,45.6220613671875,43.445068359375,46.7248813671875L43.445068359375,65.3979013671875C43.445068359375,66.5007013671875,44.572648359375,67.39470136718751,45.963588359375,67.39470136718751L56.926568359375,67.39470136718751C58.317468359375,67.39470136718751,59.445068359375,66.5007013671875,59.445068359375,65.3979013671875L59.445068359375,46.7248813671875C59.445068359375,45.6220613671875,58.317468359375,44.7280513671875,56.926568359375,44.7280513671875L51.741398359375,44.7280513671875L51.741398359375,39.2963223671875C51.741398359375,39.1665793671875,51.608748359375,39.0614013671875,51.445108359375,39.0614013671875C51.281468359375,39.0614013671875,51.148808359374996,39.1665793671875,51.148808359374996,39.2963223671875L51.148808359374996,44.7280513671875ZM51.741398359375,67.3948013671875L51.741398359375,72.82650136718749C51.741398359375,72.9563013671875,51.608748359375,73.0614013671875,51.445108359375,73.0614013671875C51.281468359375,73.0614013671875,51.148808359374996,72.9563013671875,51.148808359374996,72.82650136718749L51.148808359374996,67.3948013671875L51.741398359375,67.3948013671875Z"></path><path d="M17.7274,90.6541C17.5901,90.6541,17.4517,90.6436,17.3121,90.6225C9.93219,89.5095,4.80718,86.7136,2.07787,82.3084C-1.1223,77.1437,0.241766,71.6314,0.56829,70.5137C5.37624,46.647,15.0785,38.4945,21.5025,33.0957C22.9683,31.8633,24.2342,30.7995,25.1676,29.7672C25.4105,29.4984,25.6051,29.2154,25.7556,28.9202C24.7465,29.2231,24.1971,29.4326,24.1703,29.4429C22.908,29.9368,21.4777,29.3247,20.9761,28.076C20.4756,26.8272,21.0897,25.4146,22.352,24.9172C22.5042,24.8571,23.5312,24.4607,25.3073,23.9616C24.087,21.4425,21.7693,18.7949,19.7125,16.6431L19.2819,16.1902C16.2438,12.9776,14.6017,4.80159,14.3036,3.19471C14.1306,2.26212,14.4636,1.30796,15.1814,0.679657C15.8995,0.0512175,16.8976,-0.159672,17.8125,0.123747C22.7731,1.66274,24.2638,1.81255,27.2321,2.11098C28.7357,2.26195,29.83,3.59029,29.6762,5.07662C29.5236,6.56295,28.182,7.64786,26.6784,7.49454C24.4992,7.27569,22.9517,7.09896,20.724,6.56646C21.4493,9.09088,22.3803,11.5427,23.2771,12.4919L23.6876,12.9237C25.3757,14.69,28.9691,18.45,30.7016,22.7299C35.0392,21.9433,40.8791,21.3359,47.7817,21.7249C48.2004,20.7386,48.8054,19.7953,49.5907,18.9135C49.7137,18.7754,49.8498,18.6502,49.9988,18.539C53.6142,15.8508,57.5491,12.857,59.7803,11.0758C58.1028,11.2502,56.1034,11.0278,53.9124,9.70882C53.2439,9.30622,52.5992,8.89427,51.9662,8.48933C48.4668,6.25164,46.497,5.12109,43.4234,5.94853C41.9647,6.34058,40.4622,5.48975,40.0659,4.04789C39.6695,2.60604,40.5296,1.11853,41.9871,0.726471C47.5602,-0.773825,51.4796,1.73271,54.9364,3.9434L54.9364,3.9434C55.5284,4.32176,56.1318,4.70797,56.7564,5.08482C58.3843,6.06556,59.4858,5.76127,61.2899,5.13865C62.3511,4.77234,63.5567,4.35687,64.8675,4.53476C66.3321,4.73254,67.4406,5.56933,67.9103,6.83096C68.7444,9.07333,67.1035,11.5533,65.5797,13.2374C64.6729,14.2394,60.0845,17.7606,56.4519,20.4957C56.9477,20.3369,57.4767,20.2511,58.026,20.2511C59.4281,20.2511,60.6982,20.8102,61.621,21.7153C65.4948,20.6901,67.87,17.9563,67.9033,17.9175C68.78,16.8888,70.3322,16.7577,71.3721,17.6226C72.412,18.4886,72.5457,20.0253,71.6702,21.054C71.5221,21.2286,69.5063,23.5492,66.0787,25.233C69.5399,26.8822,72.9993,29.682,74.1841,34.4145C74.5106,35.7206,73.7062,37.0407,72.3859,37.3638C72.1871,37.4117,71.9884,37.4351,71.792,37.4351C70.687,37.4351,69.6826,36.6932,69.4046,35.5848C68.4378,31.7217,64.8144,29.7431,61.7619,28.7456C60.8298,29.7349,59.5009,30.3535,58.026,30.3535C55.8642,30.3535,54.0162,29.0245,53.2713,27.1474C53.2022,27.138,53.1331,27.1287,53.0642,27.1195C54.232,29.5936,57.0851,31.9259,58.1868,32.665C58.3157,32.7516,58.4423,32.8523,58.5547,32.9599C66.5865,40.6151,72.4887,48.8133,76.0971,57.3287C76.6815,58.7074,76.0249,60.2932,74.6313,60.8702C74.2976,61.01,73.9388,61.082,73.576,61.082C72.5065,61.082,71.4914,60.4582,71.0525,59.4213C67.7577,51.6455,62.331,44.1074,54.9203,37.0116C53.6073,36.1009,48.0984,31.9917,47.2065,26.583C40.9421,26.2679,35.6187,26.8278,31.6725,27.5336C31.6197,29.527,30.9225,31.5172,29.2456,33.3731C28.0614,34.6827,26.5968,35.915,25.0446,37.2188C21.9414,39.8269,18.2648,42.9169,14.8104,48.1192C11.356,53.3215,8.12389,60.6361,5.9098,71.6934C5.88732,71.8035,5.85893,71.9123,5.82344,72.0188C5.81634,72.041,4.57886,76.0413,6.77344,79.5289C8.6332,82.4828,12.4557,84.4139,18.1367,85.2705C19.6297,85.4953,20.6566,86.8762,20.4295,88.3532C20.2213,89.6944,19.0559,90.6541,17.7274,90.6541ZM35.1195,7.03101C33.3502,7.03101,31.9158,5.61208,31.9158,3.86173C31.9158,2.11139,33.3502,0.69245,35.1195,0.69245C36.8889,0.69245,38.3233,2.11139,38.3233,3.86173C38.3233,5.61208,36.8889,7.03101,35.1195,7.03101ZM57.6848,23.1892L58.414,24.4754C58.8984,24.3623,59.3923,24.3435,59.8644,24.4203C60.2191,24.5005,60.5087,24.7182,60.6663,25.0229C60.8636,25.3394,60.8993,25.7346,60.7646,26.1094C60.5988,26.5176,60.2972,26.8749,59.9085,27.1235L60.31,27.8316L59.7886,28.1294L59.3994,27.443C58.9257,27.7175,58.399,27.883,57.8664,27.9247L57.3744,27.0569C57.6378,27.0741,57.9071,27.048,58.1704,26.9797C58.4501,26.9251,58.7239,26.8323,58.9829,26.7044L58.2801,25.4647C57.8047,25.5877,57.3167,25.6065,56.8549,25.5197C56.4913,25.4263,56.196,25.1971,56.0328,24.8814C55.8433,24.5561,55.8127,24.1572,55.9484,23.7789C56.088,23.373,56.3763,23.0149,56.7584,22.7726L56.4166,22.1699L56.938,21.8721L57.2727,22.4625C57.6615,22.2376,58.0888,22.0901,58.5254,22.0301L59.0042,22.8746C58.5548,22.8828,58.103,22.9906,57.6848,23.1892ZM56.9319,24.2961Q57.1278,24.6417,57.7863,24.5856L57.1695,23.4978Q56.6982,23.884,56.9319,24.2961ZM58.9077,25.3462L59.4981,26.3875L59.499,26.3891Q59.9965,26.0045,59.7628,25.5923Q59.573,25.2576,58.9077,25.3462ZM73.2212,66.5065C73.2212,68.2569,74.6555,69.6758,76.4249,69.6758C78.1943,69.6758,79.6286,68.2569,79.6286,66.5065C79.6286,64.7562,78.1943,63.3372,76.4249,63.3372C74.6555,63.3372,73.2212,64.7562,73.2212,66.5065ZM35.9465,91.8045C35.0734,91.8045,34.2038,91.7987,33.3378,91.7858C31.827,91.7636,30.6203,90.5359,30.6428,89.0402C30.6653,87.5457,31.9158,86.3297,33.4183,86.3742C49.6344,86.6059,65.7512,84.6175,67.6134,84.037C72.1953,82.4184,74.5295,79.3603,74.5295,74.9575C74.5295,73.463,75.754,72.2517,77.2648,72.2517C78.7755,72.2517,80,73.463,80,74.9575C80,81.5992,76.148,86.7686,69.4317,89.142C67.0041,89.9999,51.0955,91.8046,35.9465,91.8045ZM25.2731,92C23.5037,92,22.0693,90.5811,22.0693,88.8307C22.0693,87.0804,23.5037,85.6615,25.2731,85.6615C27.0424,85.6615,28.4768,87.0804,28.4768,88.8307C28.4768,90.5811,27.0424,92,25.2731,92Z"></path></svg>'), uy = cy.cloneNode(!0);
class gy {
  constructor(t) {
    ut(this, "_chartApi", null);
    if (le.isString(t.container)) {
      if (this._container = document.getElementById(t.container), !this._container)
        throw new Error("Container is null");
    } else
      this._container = t.container;
    this._container.classList.add("klinecharts-pro"), this._container.setAttribute("data-theme", t.theme ?? "light");
    const n = this;
    J9(() => x(ly, {
      ref: (r) => {
        n._chartApi = r;
      },
      get styles() {
        return t.styles ?? {};
      },
      get watermark() {
        return t.watermark ?? uy;
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
      get chartViewToggle() {
        return t.chartViewToggle;
      },
      get indicatorTooltipIconStyles() {
        return t.indicatorTooltipIconStyles ?? {};
      },
      get orderTools() {
        return t.orderTools ?? {
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
    var r, i;
    (i = (r = this._chartApi) == null ? void 0 : r.enableAutoSave) == null || i.call(r, t, n);
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
    var r, i;
    return ((i = (r = this._chartApi) == null ? void 0 : r.getSize) == null ? void 0 : i.call(r, t, n)) ?? null;
  }
  getDom(t, n) {
    var r, i;
    return ((i = (r = this._chartApi) == null ? void 0 : r.getDom) == null ? void 0 : i.call(r, t, n)) ?? null;
  }
  subscribeAction(t, n) {
    var r, i;
    (i = (r = this._chartApi) == null ? void 0 : r.subscribeAction) == null || i.call(r, t, n);
  }
  unsubscribeAction(t, n) {
    var r, i;
    (i = (r = this._chartApi) == null ? void 0 : r.unsubscribeAction) == null || i.call(r, t, n);
  }
}
U9.forEach((e) => {
  $9(e);
});
export {
  fy as DefaultDatafeed,
  gy as KLineChartPro,
  yy as loadLocales
};
//# sourceMappingURL=klinecharts-pro.js.map
