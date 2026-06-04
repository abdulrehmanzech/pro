var T9 = Object.defineProperty;
var M9 = (e, t, r) => t in e ? T9(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var C1 = (e, t, r) => (M9(e, typeof t != "symbol" ? t + "" : t, r), r);
import { utils as O, registerFigure as S9, PolygonType as Zt, LineType as Ke, OverlayMode as On, ActionType as St, init as P9, FormatDateType as q1, DomPosition as ct, dispose as v0, TooltipIconPosition as Y1, YAxisType as b0, CandleType as D9, registerOverlay as O9 } from "klinecharts";
function b1(e, t, r) {
  const n = (e.x - t.x) * Math.cos(r) - (e.y - t.y) * Math.sin(r) + t.x, a = (e.x - t.x) * Math.sin(r) + (e.y - t.y) * Math.cos(r) + t.y;
  return { x: n, y: a };
}
function Rn(e, t) {
  if (e.length > 1) {
    let r;
    return e[0].x === e[1].x && e[0].y !== e[1].y ? e[0].y < e[1].y ? r = {
      x: e[0].x,
      y: t.height
    } : r = {
      x: e[0].x,
      y: 0
    } : e[0].x > e[1].x ? r = {
      x: 0,
      y: O.getLinearYFromCoordinates(e[0], e[1], { x: 0, y: e[0].y })
    } : r = {
      x: t.width,
      y: O.getLinearYFromCoordinates(e[0], e[1], { x: t.width, y: e[0].y })
    }, { coordinates: [e[0], r] };
  }
  return [];
}
function mo(e, t) {
  const r = Math.abs(e.x - t.x), n = Math.abs(e.y - t.y);
  return Math.sqrt(r * r + n * n);
}
const N9 = {
  name: "arrow",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = e[1].x > e[0].x ? 0 : 1, r = O.getLinearSlopeIntercept(e[0], e[1]);
      let n;
      r ? n = Math.atan(r[0]) + Math.PI * t : e[1].y > e[0].y ? n = Math.PI / 2 : n = Math.PI / 2 * 3;
      const a = b1({ x: e[1].x - 8, y: e[1].y + 4 }, e[1], n), s = b1({ x: e[1].x - 8, y: e[1].y - 4 }, e[1], n);
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
}, I9 = {
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
      const t = mo(e[0], e[1]);
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
}, B9 = {
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
}, E9 = {
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
  performEventPressedMove: ({ points: e, performPointIndex: t, performPoint: r }) => {
    t < 2 && (e[0].price = r.price, e[1].price = r.price);
  },
  performEventMoveForDrawing: ({ currentStep: e, points: t, performPoint: r }) => {
    e === 2 && (t[0].price = r.price);
  }
}, F9 = {
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
}, U9 = {
  name: "fibonacciCircle",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = Math.abs(e[0].x - e[1].x), r = Math.abs(e[0].y - e[1].y), n = Math.sqrt(t * t + r * r), a = [0.236, 0.382, 0.5, 0.618, 0.786, 1], s = [], d = [];
      return a.forEach((h) => {
        const b = n * h;
        s.push(
          { ...e[0], r: b }
        ), d.push({
          x: e[0].x,
          y: e[0].y + b + 6,
          text: `${(h * 100).toFixed(1)}%`
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
}, z9 = {
  name: "fibonacciSegment",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: r }) => {
    const n = [], a = [];
    if (e.length > 1) {
      const s = e[1].x > e[0].x ? e[0].x : e[1].x, d = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0], h = e[0].y - e[1].y, b = t.points, x = b[0].value - b[1].value;
      d.forEach((v) => {
        const w = e[1].y + h * v, B = (b[1].value + x * v).toFixed(r.price);
        n.push({ coordinates: [{ x: e[0].x, y: w }, { x: e[1].x, y: w }] }), a.push({
          x: s,
          y: w,
          text: `${B} (${(v * 100).toFixed(1)}%)`,
          baseline: "bottom"
        });
      });
    }
    return [
      {
        type: "line",
        attrs: n
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: a
      }
    ];
  }
}, V9 = {
  name: "fibonacciSpiral",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, bounding: t }) => {
    if (e.length > 1) {
      const r = mo(e[0], e[1]) / Math.sqrt(24), n = e[1].x > e[0].x ? 0 : 1, a = O.getLinearSlopeIntercept(e[0], e[1]);
      let s;
      a ? s = Math.atan(a[0]) + Math.PI * n : e[1].y > e[0].y ? s = Math.PI / 2 : s = Math.PI / 2 * 3;
      const d = b1(
        { x: e[0].x - r, y: e[0].y },
        e[0],
        s
      ), h = b1(
        { x: e[0].x - r, y: e[0].y - r },
        e[0],
        s
      ), b = [{
        ...d,
        r,
        startAngle: s,
        endAngle: s + Math.PI / 2
      }, {
        ...h,
        r: r * 2,
        startAngle: s + Math.PI / 2,
        endAngle: s + Math.PI
      }];
      let x = e[0].x - r, v = e[0].y - r;
      for (let w = 2; w < 9; w++) {
        const B = b[w - 2].r + b[w - 1].r;
        let N = 0;
        switch (w % 4) {
          case 0: {
            N = s, x -= b[w - 2].r;
            break;
          }
          case 1: {
            N = s + Math.PI / 2, v -= b[w - 2].r;
            break;
          }
          case 2: {
            N = s + Math.PI, x += b[w - 2].r;
            break;
          }
          case 3: {
            N = s + Math.PI / 2 * 3, v += b[w - 2].r;
            break;
          }
        }
        const oe = N + Math.PI / 2, V = b1({ x, y: v }, e[0], s);
        b.push({
          ...V,
          r: B,
          startAngle: N,
          endAngle: oe
        });
      }
      return [
        {
          type: "arc",
          attrs: b
        },
        {
          type: "line",
          attrs: Rn(e, t)
        }
      ];
    }
    return [];
  }
}, K9 = {
  name: "fibonacciSpeedResistanceFan",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, bounding: t }) => {
    const r = [];
    let n = [];
    const a = [];
    if (e.length > 1) {
      const s = e[1].x > e[0].x ? -38 : 4, d = e[1].y > e[0].y ? -2 : 20, h = e[1].x - e[0].x, b = e[1].y - e[0].y;
      [1, 0.75, 0.618, 0.5, 0.382, 0.25, 0].forEach((v) => {
        const w = e[1].x - h * v, B = e[1].y - b * v;
        r.push({ coordinates: [{ x: w, y: e[0].y }, { x: w, y: e[1].y }] }), r.push({ coordinates: [{ x: e[0].x, y: B }, { x: e[1].x, y: B }] }), n = n.concat(Rn([e[0], { x: w, y: e[1].y }], t)), n = n.concat(Rn([e[0], { x: e[1].x, y: B }], t)), a.unshift({
          x: e[0].x + s,
          y: B + 10,
          text: `${v.toFixed(3)}`
        }), a.unshift({
          x: w - 18,
          y: e[0].y + d,
          text: `${v.toFixed(3)}`
        });
      });
    }
    return [
      {
        type: "line",
        attrs: r
      },
      {
        type: "line",
        attrs: n
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: a
      }
    ];
  }
}, R9 = {
  name: "fibonacciExtension",
  totalStep: 4,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: r }) => {
    const n = [], a = [];
    if (e.length > 2) {
      const s = t.points, d = s[1].value - s[0].value, h = e[1].y - e[0].y, b = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1], x = e[2].x > e[1].x ? e[1].x : e[2].x;
      b.forEach((v) => {
        const w = e[2].y + h * v, B = (s[2].value + d * v).toFixed(r.price);
        n.push({ coordinates: [{ x: e[1].x, y: w }, { x: e[2].x, y: w }] }), a.push({
          x,
          y: w,
          text: `${B} (${(v * 100).toFixed(1)}%)`,
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
        attrs: n
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: a
      }
    ];
  }
}, j9 = {
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
      const t = (e[1].y - e[0].y) / 4, r = e[1].x - e[0].x, n = [
        { coordinates: [e[0], { x: e[1].x, y: e[1].y - t }] },
        { coordinates: [e[0], { x: e[1].x, y: e[1].y - t * 2 }] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[1].x, y: e[0].y + t }] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[1].x, y: e[0].y + t * 2 }] },
        { coordinates: [{ ...e[0] }, { x: e[0].x + r * 0.236, y: e[1].y }] },
        { coordinates: [{ ...e[0] }, { x: e[0].x + r * 0.5, y: e[1].y }] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[0].x + r * 0.236, y: e[0].y }] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[0].x + r * 0.5, y: e[0].y }] }
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
          attrs: n,
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
}, Q9 = {
  name: "threeWaves",
  totalStep: 5,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    const t = e.map((r, n) => ({
      ...r,
      text: `(${n})`,
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
}, Z9 = {
  name: "fiveWaves",
  totalStep: 7,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    const t = e.map((r, n) => ({
      ...r,
      text: `(${n})`,
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
}, H9 = {
  name: "eightWaves",
  totalStep: 10,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    const t = e.map((r, n) => ({
      ...r,
      text: `(${n})`,
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
  name: "anyWaves",
  totalStep: Number.MAX_SAFE_INTEGER,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    const t = e.map((r, n) => ({
      ...r,
      text: `(${n})`,
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
  name: "abcd",
  totalStep: 5,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    let t = [], r = [];
    const n = ["A", "B", "C", "D"], a = e.map((s, d) => ({
      ...s,
      baseline: "bottom",
      text: `(${n[d]})`
    }));
    return e.length > 2 && (t = [e[0], e[2]], e.length > 3 && (r = [e[1], e[3]])), [
      {
        type: "line",
        attrs: { coordinates: e }
      },
      {
        type: "line",
        attrs: [{ coordinates: t }, { coordinates: r }],
        styles: { style: "dashed" }
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: a
      }
    ];
  }
}, Y9 = {
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
    const r = [], n = [], a = ["X", "A", "B", "C", "D"], s = e.map((d, h) => ({
      ...d,
      baseline: "bottom",
      text: `(${a[h]})`
    }));
    return e.length > 2 && (r.push({ coordinates: [e[0], e[2]] }), n.push({ coordinates: [e[0], e[1], e[2]] }), e.length > 3 && (r.push({ coordinates: [e[1], e[3]] }), e.length > 4 && (r.push({ coordinates: [e[2], e[4]] }), n.push({ coordinates: [e[2], e[3], e[4]] })))), [
      {
        type: "line",
        attrs: { coordinates: e }
      },
      {
        type: "line",
        attrs: r,
        styles: { style: "dashed" }
      },
      {
        type: "polygon",
        ignoreEvent: !0,
        attrs: n
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: s
      }
    ];
  }
}, G9 = [
  N9,
  I9,
  B9,
  F9,
  E9,
  U9,
  z9,
  V9,
  K9,
  R9,
  j9,
  Q9,
  Z9,
  H9,
  W9,
  q9,
  Y9
];
class oy {
  constructor(t) {
    C1(this, "_apiKey");
    C1(this, "_prevSymbolMarket");
    C1(this, "_ws");
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
  async getHistoryKLineData(t, r, n, a) {
    return await ((await (await fetch(`https://api.polygon.io/v2/aggs/ticker/${t.ticker}/range/${r.multiplier}/${r.timespan}/${n}/${a}?apiKey=${this._apiKey}`)).json()).results || []).map((h) => ({
      timestamp: h.t,
      open: h.o,
      high: h.h,
      low: h.l,
      close: h.c,
      volume: h.v,
      turnover: h.vw
    }));
  }
  subscribe(t, r, n) {
    var a, s;
    this._prevSymbolMarket !== t.market ? ((a = this._ws) == null || a.close(), this._ws = new WebSocket(`wss://delayed.polygon.io/${t.market}`), this._ws.onopen = () => {
      var d;
      (d = this._ws) == null || d.send(JSON.stringify({ action: "auth", params: this._apiKey }));
    }, this._ws.onmessage = (d) => {
      var b;
      const h = JSON.parse(d.data);
      h[0].ev === "status" ? h[0].status === "auth_success" && ((b = this._ws) == null || b.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` }))) : "sym" in h && n({
        timestamp: h.s,
        open: h.o,
        high: h.h,
        low: h.l,
        close: h.c,
        volume: h.v,
        turnover: h.vw
      });
    }) : (s = this._ws) == null || s.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` })), this._prevSymbolMarket = t.market;
  }
  unsubscribe(t, r) {
  }
}
const Fe = {};
function X9(e) {
  Fe.context = e;
}
const J9 = (e, t) => e === t, jn = Symbol("solid-proxy"), ei = Symbol("solid-track"), an = {
  equals: J9
};
let yo = bo;
const Ct = 1, sn = 2, Co = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, Nn = {};
var Be = null;
let Ot = null, we = null, Re = null, yt = null, tr = 0;
function $1(e, t) {
  const r = we, n = Be, a = e.length === 0, s = a ? Co : {
    owned: null,
    cleanups: null,
    context: null,
    owner: t === void 0 ? n : t
  }, d = a ? e : () => e(() => dt(() => Cn(s)));
  Be = s, we = null;
  try {
    return Lt(d, !0);
  } finally {
    we = r, Be = n;
  }
}
function M(e, t) {
  t = t ? Object.assign({}, an, t) : an;
  const r = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, n = (a) => (typeof a == "function" && (a = a(r.value)), vo(r, a));
  return [po.bind(r), n];
}
function $0(e, t, r) {
  const n = yn(e, t, !0, Ct);
  qt(n);
}
function K(e, t, r) {
  const n = yn(e, t, !1, Ct);
  qt(n);
}
function Ze(e, t, r) {
  yo = ai;
  const n = yn(e, t, !1, Ct);
  n.user = !0, yt ? yt.push(n) : qt(n);
}
function q(e, t, r) {
  r = r ? Object.assign({}, an, r) : an;
  const n = yn(e, t, !0, 0);
  return n.observers = null, n.observerSlots = null, n.comparator = r.equals || void 0, qt(n), po.bind(n);
}
function ti(e, t, r) {
  let n, a, s;
  arguments.length === 2 && typeof t == "object" || arguments.length === 1 ? (n = !0, a = e, s = t || {}) : (n = e, a = t, s = r || {});
  let d = null, h = Nn, b = null, x = !1, v = "initialValue" in s, w = typeof n == "function" && q(n);
  const B = /* @__PURE__ */ new Set(), [N, oe] = (s.storage || M)(s.initialValue), [V, R] = M(void 0), [U, he] = M(void 0, {
    equals: !1
  }), [Z, X] = M(v ? "ready" : "unresolved");
  if (Fe.context) {
    b = `${Fe.context.id}${Fe.context.count++}`;
    let ee;
    s.ssrLoadFrom === "initial" ? h = s.initialValue : Fe.load && (ee = Fe.load(b)) && (h = ee[0]);
  }
  function J(ee, se, T, j) {
    return d === ee && (d = null, v = !0, (ee === h || se === h) && s.onHydrated && queueMicrotask(() => s.onHydrated(j, {
      value: se
    })), h = Nn, ve(se, T)), se;
  }
  function ve(ee, se) {
    Lt(() => {
      se === void 0 && oe(() => ee), X(se !== void 0 ? "errored" : "ready"), R(se);
      for (const T of B.keys())
        T.decrement();
      B.clear();
    }, !1);
  }
  function W() {
    const ee = ri, se = N(), T = V();
    if (T !== void 0 && !d)
      throw T;
    return we && !we.user && ee && $0(() => {
      U(), d && (ee.resolved || B.has(ee) || (ee.increment(), B.add(ee)));
    }), se;
  }
  function H(ee = !0) {
    if (ee !== !1 && x)
      return;
    x = !1;
    const se = w ? w() : n;
    if (se == null || se === !1) {
      J(d, dt(N));
      return;
    }
    const T = h !== Nn ? h : dt(() => a(se, {
      value: N(),
      refetching: ee
    }));
    return typeof T != "object" || !(T && "then" in T) ? (J(d, T, void 0, se), T) : (d = T, x = !0, queueMicrotask(() => x = !1), Lt(() => {
      X(v ? "refreshing" : "pending"), he();
    }, !1), T.then((j) => J(T, j, void 0, se), (j) => J(T, void 0, _o(j), se)));
  }
  return Object.defineProperties(W, {
    state: {
      get: () => Z()
    },
    error: {
      get: () => V()
    },
    loading: {
      get() {
        const ee = Z();
        return ee === "pending" || ee === "refreshing";
      }
    },
    latest: {
      get() {
        if (!v)
          return W();
        const ee = V();
        if (ee && !d)
          throw ee;
        return N();
      }
    }
  }), w ? $0(() => H(!1)) : H(!1), [W, {
    refetch: H,
    mutate: oe
  }];
}
function dt(e) {
  if (we === null)
    return e();
  const t = we;
  we = null;
  try {
    return e();
  } finally {
    we = t;
  }
}
function nr(e) {
  Ze(() => dt(e));
}
function xt(e) {
  return Be === null || (Be.cleanups === null ? Be.cleanups = [e] : Be.cleanups.push(e)), e;
}
function ni(e) {
  const t = we, r = Be;
  return Promise.resolve().then(() => {
    we = t, Be = r;
    let n;
    return Lt(e, !1), we = Be = null, n ? n.done : void 0;
  });
}
let ri;
function po() {
  const e = Ot;
  if (this.sources && (this.state || e))
    if (this.state === Ct || e)
      qt(this);
    else {
      const t = Re;
      Re = null, Lt(() => cn(this), !1), Re = t;
    }
  if (we) {
    const t = this.observers ? this.observers.length : 0;
    we.sources ? (we.sources.push(this), we.sourceSlots.push(t)) : (we.sources = [this], we.sourceSlots = [t]), this.observers ? (this.observers.push(we), this.observerSlots.push(we.sources.length - 1)) : (this.observers = [we], this.observerSlots = [we.sources.length - 1]);
  }
  return this.value;
}
function vo(e, t, r) {
  let n = e.value;
  return (!e.comparator || !e.comparator(n, t)) && (e.value = t, e.observers && e.observers.length && Lt(() => {
    for (let a = 0; a < e.observers.length; a += 1) {
      const s = e.observers[a], d = Ot && Ot.running;
      d && Ot.disposed.has(s), (d && !s.tState || !d && !s.state) && (s.pure ? Re.push(s) : yt.push(s), s.observers && $o(s)), d || (s.state = Ct);
    }
    if (Re.length > 1e6)
      throw Re = [], new Error();
  }, !1)), t;
}
function qt(e) {
  if (!e.fn)
    return;
  Cn(e);
  const t = Be, r = we, n = tr;
  we = Be = e, oi(e, e.value, n), we = r, Be = t;
}
function oi(e, t, r) {
  let n;
  try {
    n = e.fn(t);
  } catch (a) {
    e.pure && (e.state = Ct, e.owned && e.owned.forEach(Cn), e.owned = null), ko(a);
  }
  (!e.updatedAt || e.updatedAt <= r) && (e.updatedAt != null && "observers" in e ? vo(e, n) : e.value = n, e.updatedAt = r);
}
function yn(e, t, r, n = Ct, a) {
  const s = {
    fn: e,
    state: n,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: Be,
    context: null,
    pure: r
  };
  return Be === null || Be !== Co && (Be.owned ? Be.owned.push(s) : Be.owned = [s]), s;
}
function ln(e) {
  const t = Ot;
  if (e.state === 0 || t)
    return;
  if (e.state === sn || t)
    return cn(e);
  if (e.suspense && dt(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const r = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < tr); )
    (e.state || t) && r.push(e);
  for (let n = r.length - 1; n >= 0; n--)
    if (e = r[n], e.state === Ct || t)
      qt(e);
    else if (e.state === sn || t) {
      const a = Re;
      Re = null, Lt(() => cn(e, r[0]), !1), Re = a;
    }
}
function Lt(e, t) {
  if (Re)
    return e();
  let r = !1;
  t || (Re = []), yt ? r = !0 : yt = [], tr++;
  try {
    const n = e();
    return ii(r), n;
  } catch (n) {
    r || (yt = null), Re = null, ko(n);
  }
}
function ii(e) {
  if (Re && (bo(Re), Re = null), e)
    return;
  const t = yt;
  yt = null, t.length && Lt(() => yo(t), !1);
}
function bo(e) {
  for (let t = 0; t < e.length; t++)
    ln(e[t]);
}
function ai(e) {
  let t, r = 0;
  for (t = 0; t < e.length; t++) {
    const n = e[t];
    n.user ? e[r++] = n : ln(n);
  }
  for (Fe.context && X9(), t = 0; t < r; t++)
    ln(e[t]);
}
function cn(e, t) {
  const r = Ot;
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
    const a = e.sources[n];
    a.sources && (a.state === Ct || r ? a !== t && ln(a) : (a.state === sn || r) && cn(a, t));
  }
}
function $o(e) {
  const t = Ot;
  for (let r = 0; r < e.observers.length; r += 1) {
    const n = e.observers[r];
    (!n.state || t) && (n.state = sn, n.pure ? Re.push(n) : yt.push(n), n.observers && $o(n));
  }
}
function Cn(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const r = e.sources.pop(), n = e.sourceSlots.pop(), a = r.observers;
      if (a && a.length) {
        const s = a.pop(), d = r.observerSlots.pop();
        n < a.length && (s.sourceSlots[d] = n, a[n] = s, r.observerSlots[n] = d);
      }
    }
  if (e.owned) {
    for (t = 0; t < e.owned.length; t++)
      Cn(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = 0; t < e.cleanups.length; t++)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function _o(e) {
  return e instanceof Error || typeof e == "string" ? e : new Error("Unknown error");
}
function ko(e) {
  throw e = _o(e), e;
}
const si = Symbol("fallback");
function _0(e) {
  for (let t = 0; t < e.length; t++)
    e[t]();
}
function li(e, t, r = {}) {
  let n = [], a = [], s = [], d = 0, h = t.length > 1 ? [] : null;
  return xt(() => _0(s)), () => {
    let b = e() || [], x, v;
    return b[ei], dt(() => {
      let B = b.length, N, oe, V, R, U, he, Z, X, J;
      if (B === 0)
        d !== 0 && (_0(s), s = [], n = [], a = [], d = 0, h && (h = [])), r.fallback && (n = [si], a[0] = $1((ve) => (s[0] = ve, r.fallback())), d = 1);
      else if (d === 0) {
        for (a = new Array(B), v = 0; v < B; v++)
          n[v] = b[v], a[v] = $1(w);
        d = B;
      } else {
        for (V = new Array(B), R = new Array(B), h && (U = new Array(B)), he = 0, Z = Math.min(d, B); he < Z && n[he] === b[he]; he++)
          ;
        for (Z = d - 1, X = B - 1; Z >= he && X >= he && n[Z] === b[X]; Z--, X--)
          V[X] = a[Z], R[X] = s[Z], h && (U[X] = h[Z]);
        for (N = /* @__PURE__ */ new Map(), oe = new Array(X + 1), v = X; v >= he; v--)
          J = b[v], x = N.get(J), oe[v] = x === void 0 ? -1 : x, N.set(J, v);
        for (x = he; x <= Z; x++)
          J = n[x], v = N.get(J), v !== void 0 && v !== -1 ? (V[v] = a[x], R[v] = s[x], h && (U[v] = h[x]), v = oe[v], N.set(J, v)) : s[x]();
        for (v = he; v < B; v++)
          v in V ? (a[v] = V[v], s[v] = R[v], h && (h[v] = U[v], h[v](v))) : a[v] = $1(w);
        a = a.slice(0, d = B), n = b.slice(0);
      }
      return a;
    });
    function w(B) {
      if (s[v] = B, h) {
        const [N, oe] = M(v);
        return h[v] = oe, t(b[v], N);
      }
      return t(b[v]);
    }
  };
}
function A(e, t) {
  return dt(() => e(t || {}));
}
function G1() {
  return !0;
}
const ci = {
  get(e, t, r) {
    return t === jn ? r : e.get(t);
  },
  has(e, t) {
    return t === jn ? !0 : e.has(t);
  },
  set: G1,
  deleteProperty: G1,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: G1,
      deleteProperty: G1
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function In(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function xo(...e) {
  let t = !1;
  for (let n = 0; n < e.length; n++) {
    const a = e[n];
    t = t || !!a && jn in a, e[n] = typeof a == "function" ? (t = !0, q(a)) : a;
  }
  if (t)
    return new Proxy({
      get(n) {
        for (let a = e.length - 1; a >= 0; a--) {
          const s = In(e[a])[n];
          if (s !== void 0)
            return s;
        }
      },
      has(n) {
        for (let a = e.length - 1; a >= 0; a--)
          if (n in In(e[a]))
            return !0;
        return !1;
      },
      keys() {
        const n = [];
        for (let a = 0; a < e.length; a++)
          n.push(...Object.keys(In(e[a])));
        return [...new Set(n)];
      }
    }, ci);
  const r = {};
  for (let n = e.length - 1; n >= 0; n--)
    if (e[n]) {
      const a = Object.getOwnPropertyDescriptors(e[n]);
      for (const s in a)
        s in r || Object.defineProperty(r, s, {
          enumerable: !0,
          get() {
            for (let d = e.length - 1; d >= 0; d--) {
              const h = (e[d] || {})[s];
              if (h !== void 0)
                return h;
            }
          }
        });
    }
  return r;
}
function _1(e) {
  const t = "fallback" in e && {
    fallback: () => e.fallback
  };
  return q(li(() => e.each, e.children, t || void 0));
}
function de(e) {
  let t = !1;
  const r = e.keyed, n = q(() => e.when, void 0, {
    equals: (a, s) => t ? a === s : !a == !s
  });
  return q(() => {
    const a = n();
    if (a) {
      const s = e.children, d = typeof s == "function" && s.length > 0;
      return t = r || d, d ? dt(() => s(a)) : s;
    }
    return e.fallback;
  }, void 0, void 0);
}
function ui(e, t, r) {
  let n = r.length, a = t.length, s = n, d = 0, h = 0, b = t[a - 1].nextSibling, x = null;
  for (; d < a || h < s; ) {
    if (t[d] === r[h]) {
      d++, h++;
      continue;
    }
    for (; t[a - 1] === r[s - 1]; )
      a--, s--;
    if (a === d) {
      const v = s < n ? h ? r[h - 1].nextSibling : r[s - h] : b;
      for (; h < s; )
        e.insertBefore(r[h++], v);
    } else if (s === h)
      for (; d < a; )
        (!x || !x.has(t[d])) && t[d].remove(), d++;
    else if (t[d] === r[s - 1] && r[h] === t[a - 1]) {
      const v = t[--a].nextSibling;
      e.insertBefore(r[h++], t[d++].nextSibling), e.insertBefore(r[--s], v), t[a] = r[s];
    } else {
      if (!x) {
        x = /* @__PURE__ */ new Map();
        let w = h;
        for (; w < s; )
          x.set(r[w], w++);
      }
      const v = x.get(t[d]);
      if (v != null)
        if (h < v && v < s) {
          let w = d, B = 1, N;
          for (; ++w < a && w < s && !((N = x.get(t[w])) == null || N !== v + B); )
            B++;
          if (B > v - h) {
            const oe = t[d];
            for (; h < v; )
              e.insertBefore(r[h++], oe);
          } else
            e.replaceChild(r[h++], t[d++]);
        } else
          d++;
      else
        t[d++].remove();
    }
  }
}
const k0 = "_$DX_DELEGATE";
function di(e, t, r, n = {}) {
  let a;
  return $1((s) => {
    a = s, t === document ? e() : C(t, e(), t.firstChild ? null : void 0, r);
  }, n.owner), () => {
    a(), t.textContent = "";
  };
}
function p(e, t, r) {
  const n = document.createElement("template");
  n.innerHTML = e;
  let a = n.content.firstChild;
  return r && (a = a.firstChild), a;
}
function He(e, t = window.document) {
  const r = t[k0] || (t[k0] = /* @__PURE__ */ new Set());
  for (let n = 0, a = e.length; n < a; n++) {
    const s = e[n];
    r.has(s) || (r.add(s), t.addEventListener(s, hi));
  }
}
function Ee(e, t, r) {
  r == null ? e.removeAttribute(t) : e.setAttribute(t, r);
}
function ge(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function ut(e, t, r, n) {
  if (n)
    Array.isArray(r) ? (e[`$$${t}`] = r[0], e[`$$${t}Data`] = r[1]) : e[`$$${t}`] = r;
  else if (Array.isArray(r)) {
    const a = r[0];
    e.addEventListener(t, r[0] = (s) => a.call(e, r[1], s));
  } else
    e.addEventListener(t, r);
}
function Nt(e, t, r) {
  if (!t)
    return r ? Ee(e, "style") : t;
  const n = e.style;
  if (typeof t == "string")
    return n.cssText = t;
  typeof r == "string" && (n.cssText = r = void 0), r || (r = {}), t || (t = {});
  let a, s;
  for (s in r)
    t[s] == null && n.removeProperty(s), delete r[s];
  for (s in t)
    a = t[s], a !== r[s] && (n.setProperty(s, a), r[s] = a);
  return r;
}
function kt(e, t, r) {
  return dt(() => e(t, r));
}
function C(e, t, r, n) {
  if (r !== void 0 && !n && (n = []), typeof t != "function")
    return un(e, t, n, r);
  K((a) => un(e, t(), a, r), n);
}
function hi(e) {
  const t = `$$${e.type}`;
  let r = e.composedPath && e.composedPath()[0] || e.target;
  for (e.target !== r && Object.defineProperty(e, "target", {
    configurable: !0,
    value: r
  }), Object.defineProperty(e, "currentTarget", {
    configurable: !0,
    get() {
      return r || document;
    }
  }), Fe.registry && !Fe.done && (Fe.done = !0, document.querySelectorAll("[id^=pl-]").forEach((n) => {
    for (; n && n.nodeType !== 8 && n.nodeValue !== "pl-" + e; ) {
      let a = n.nextSibling;
      n.remove(), n = a;
    }
    n && n.remove();
  })); r; ) {
    const n = r[t];
    if (n && !r.disabled) {
      const a = r[`${t}Data`];
      if (a !== void 0 ? n.call(r, a, e) : n.call(r, e), e.cancelBubble)
        return;
    }
    r = r._$host || r.parentNode || r.host;
  }
}
function un(e, t, r, n, a) {
  for (Fe.context && !r && (r = [...e.childNodes]); typeof r == "function"; )
    r = r();
  if (t === r)
    return r;
  const s = typeof t, d = n !== void 0;
  if (e = d && r[0] && r[0].parentNode || e, s === "string" || s === "number") {
    if (Fe.context)
      return r;
    if (s === "number" && (t = t.toString()), d) {
      let h = r[0];
      h && h.nodeType === 3 ? h.data = t : h = document.createTextNode(t), r = Ht(e, r, n, h);
    } else
      r !== "" && typeof r == "string" ? r = e.firstChild.data = t : r = e.textContent = t;
  } else if (t == null || s === "boolean") {
    if (Fe.context)
      return r;
    r = Ht(e, r, n);
  } else {
    if (s === "function")
      return K(() => {
        let h = t();
        for (; typeof h == "function"; )
          h = h();
        r = un(e, h, r, n);
      }), () => r;
    if (Array.isArray(t)) {
      const h = [], b = r && Array.isArray(r);
      if (Qn(h, t, r, a))
        return K(() => r = un(e, h, r, n, !0)), () => r;
      if (Fe.context) {
        if (!h.length)
          return r;
        for (let x = 0; x < h.length; x++)
          if (h[x].parentNode)
            return r = h;
      }
      if (h.length === 0) {
        if (r = Ht(e, r, n), d)
          return r;
      } else
        b ? r.length === 0 ? x0(e, h, n) : ui(e, r, h) : (r && Ht(e), x0(e, h));
      r = h;
    } else if (t instanceof Node) {
      if (Fe.context && t.parentNode)
        return r = d ? [t] : t;
      if (Array.isArray(r)) {
        if (d)
          return r = Ht(e, r, n, t);
        Ht(e, r, null, t);
      } else
        r == null || r === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      r = t;
    }
  }
  return r;
}
function Qn(e, t, r, n) {
  let a = !1;
  for (let s = 0, d = t.length; s < d; s++) {
    let h = t[s], b = r && r[s];
    if (h instanceof Node)
      e.push(h);
    else if (!(h == null || h === !0 || h === !1))
      if (Array.isArray(h))
        a = Qn(e, h, b) || a;
      else if (typeof h == "function")
        if (n) {
          for (; typeof h == "function"; )
            h = h();
          a = Qn(e, Array.isArray(h) ? h : [h], Array.isArray(b) ? b : [b]) || a;
        } else
          e.push(h), a = !0;
      else {
        const x = String(h);
        b && b.nodeType === 3 && b.data === x ? e.push(b) : e.push(document.createTextNode(x));
      }
  }
  return a;
}
function x0(e, t, r = null) {
  for (let n = 0, a = t.length; n < a; n++)
    e.insertBefore(t[n], r);
}
function Ht(e, t, r, n) {
  if (r === void 0)
    return e.textContent = "";
  const a = n || document.createTextNode("");
  if (t.length) {
    let s = !1;
    for (let d = t.length - 1; d >= 0; d--) {
      const h = t[d];
      if (a !== h) {
        const b = h.parentNode === e;
        !s && !d ? b ? e.replaceChild(a, h) : e.insertBefore(a, r) : b && h.remove();
      } else
        s = !0;
    }
  } else
    e.insertBefore(a, r);
  return [a];
}
const fi = "http://www.w3.org/2000/svg";
function gi(e, t = !1) {
  return t ? document.createElementNS(fi, e) : document.createElement(e);
}
function mi(e) {
  const {
    useShadow: t
  } = e, r = document.createTextNode(""), n = e.mount || document.body;
  function a() {
    if (Fe.context) {
      const [s, d] = M(!1);
      return queueMicrotask(() => d(!0)), () => s() && e.children;
    } else
      return () => e.children;
  }
  if (n instanceof HTMLHeadElement) {
    const [s, d] = M(!1), h = () => d(!0);
    $1((b) => C(n, () => s() ? b() : a()(), null)), xt(() => {
      Fe.context ? queueMicrotask(h) : h();
    });
  } else {
    const s = gi(e.isSVG ? "g" : "div", e.isSVG), d = t && s.attachShadow ? s.attachShadow({
      mode: "open"
    }) : s;
    Object.defineProperty(s, "_$host", {
      get() {
        return r.parentNode;
      },
      configurable: !0
    }), C(d, a()), n.appendChild(s), e.ref && e.ref(s), xt(() => n.removeChild(s));
  }
  return r;
}
var X1 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Lo(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var yi = typeof X1 == "object" && X1 && X1.Object === Object && X1, wo = yi, Ci = wo, pi = typeof self == "object" && self && self.Object === Object && self, vi = Ci || pi || Function("return this")(), ht = vi, bi = ht, $i = bi.Symbol, pn = $i, L0 = pn, Ao = Object.prototype, _i = Ao.hasOwnProperty, ki = Ao.toString, p1 = L0 ? L0.toStringTag : void 0;
function xi(e) {
  var t = _i.call(e, p1), r = e[p1];
  try {
    e[p1] = void 0;
    var n = !0;
  } catch {
  }
  var a = ki.call(e);
  return n && (t ? e[p1] = r : delete e[p1]), a;
}
var Li = xi, wi = Object.prototype, Ai = wi.toString;
function Ti(e) {
  return Ai.call(e);
}
var Mi = Ti, w0 = pn, Si = Li, Pi = Mi, Di = "[object Null]", Oi = "[object Undefined]", A0 = w0 ? w0.toStringTag : void 0;
function Ni(e) {
  return e == null ? e === void 0 ? Oi : Di : A0 && A0 in Object(e) ? Si(e) : Pi(e);
}
var x1 = Ni;
function Ii(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Yt = Ii, Bi = x1, Ei = Yt, Fi = "[object AsyncFunction]", Ui = "[object Function]", zi = "[object GeneratorFunction]", Vi = "[object Proxy]";
function Ki(e) {
  if (!Ei(e))
    return !1;
  var t = Bi(e);
  return t == Ui || t == zi || t == Fi || t == Vi;
}
var To = Ki, Ri = ht, ji = Ri["__core-js_shared__"], Qi = ji, Bn = Qi, T0 = function() {
  var e = /[^.]+$/.exec(Bn && Bn.keys && Bn.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Zi(e) {
  return !!T0 && T0 in e;
}
var Hi = Zi, Wi = Function.prototype, qi = Wi.toString;
function Yi(e) {
  if (e != null) {
    try {
      return qi.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Mo = Yi, Gi = To, Xi = Hi, Ji = Yt, ea = Mo, ta = /[\\^$.*+?()[\]{}|]/g, na = /^\[object .+?Constructor\]$/, ra = Function.prototype, oa = Object.prototype, ia = ra.toString, aa = oa.hasOwnProperty, sa = RegExp(
  "^" + ia.call(aa).replace(ta, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function la(e) {
  if (!Ji(e) || Xi(e))
    return !1;
  var t = Gi(e) ? sa : na;
  return t.test(ea(e));
}
var ca = la;
function ua(e, t) {
  return e == null ? void 0 : e[t];
}
var da = ua, ha = ca, fa = da;
function ga(e, t) {
  var r = fa(e, t);
  return ha(r) ? r : void 0;
}
var It = ga, ma = It, ya = function() {
  try {
    var e = ma(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), Ca = ya, M0 = Ca;
function pa(e, t, r) {
  t == "__proto__" && M0 ? M0(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var So = pa;
function va(e, t) {
  return e === t || e !== e && t !== t;
}
var Po = va, ba = So, $a = Po, _a = Object.prototype, ka = _a.hasOwnProperty;
function xa(e, t, r) {
  var n = e[t];
  (!(ka.call(e, t) && $a(n, r)) || r === void 0 && !(t in e)) && ba(e, t, r);
}
var rr = xa, La = Array.isArray, Gt = La;
function wa(e) {
  return e != null && typeof e == "object";
}
var Xt = wa, Aa = x1, Ta = Xt, Ma = "[object Symbol]";
function Sa(e) {
  return typeof e == "symbol" || Ta(e) && Aa(e) == Ma;
}
var or = Sa, Pa = Gt, Da = or, Oa = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Na = /^\w*$/;
function Ia(e, t) {
  if (Pa(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || Da(e) ? !0 : Na.test(e) || !Oa.test(e) || t != null && e in Object(t);
}
var Ba = Ia, Ea = It, Fa = Ea(Object, "create"), vn = Fa, S0 = vn;
function Ua() {
  this.__data__ = S0 ? S0(null) : {}, this.size = 0;
}
var za = Ua;
function Va(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var Ka = Va, Ra = vn, ja = "__lodash_hash_undefined__", Qa = Object.prototype, Za = Qa.hasOwnProperty;
function Ha(e) {
  var t = this.__data__;
  if (Ra) {
    var r = t[e];
    return r === ja ? void 0 : r;
  }
  return Za.call(t, e) ? t[e] : void 0;
}
var Wa = Ha, qa = vn, Ya = Object.prototype, Ga = Ya.hasOwnProperty;
function Xa(e) {
  var t = this.__data__;
  return qa ? t[e] !== void 0 : Ga.call(t, e);
}
var Ja = Xa, e5 = vn, t5 = "__lodash_hash_undefined__";
function n5(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = e5 && t === void 0 ? t5 : t, this;
}
var r5 = n5, o5 = za, i5 = Ka, a5 = Wa, s5 = Ja, l5 = r5;
function Jt(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Jt.prototype.clear = o5;
Jt.prototype.delete = i5;
Jt.prototype.get = a5;
Jt.prototype.has = s5;
Jt.prototype.set = l5;
var c5 = Jt;
function u5() {
  this.__data__ = [], this.size = 0;
}
var d5 = u5, h5 = Po;
function f5(e, t) {
  for (var r = e.length; r--; )
    if (h5(e[r][0], t))
      return r;
  return -1;
}
var bn = f5, g5 = bn, m5 = Array.prototype, y5 = m5.splice;
function C5(e) {
  var t = this.__data__, r = g5(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : y5.call(t, r, 1), --this.size, !0;
}
var p5 = C5, v5 = bn;
function b5(e) {
  var t = this.__data__, r = v5(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var $5 = b5, _5 = bn;
function k5(e) {
  return _5(this.__data__, e) > -1;
}
var x5 = k5, L5 = bn;
function w5(e, t) {
  var r = this.__data__, n = L5(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
var A5 = w5, T5 = d5, M5 = p5, S5 = $5, P5 = x5, D5 = A5;
function e1(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
e1.prototype.clear = T5;
e1.prototype.delete = M5;
e1.prototype.get = S5;
e1.prototype.has = P5;
e1.prototype.set = D5;
var $n = e1, O5 = It, N5 = ht, I5 = O5(N5, "Map"), ir = I5, P0 = c5, B5 = $n, E5 = ir;
function F5() {
  this.size = 0, this.__data__ = {
    hash: new P0(),
    map: new (E5 || B5)(),
    string: new P0()
  };
}
var U5 = F5;
function z5(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var V5 = z5, K5 = V5;
function R5(e, t) {
  var r = e.__data__;
  return K5(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var _n = R5, j5 = _n;
function Q5(e) {
  var t = j5(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var Z5 = Q5, H5 = _n;
function W5(e) {
  return H5(this, e).get(e);
}
var q5 = W5, Y5 = _n;
function G5(e) {
  return Y5(this, e).has(e);
}
var X5 = G5, J5 = _n;
function e2(e, t) {
  var r = J5(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
var t2 = e2, n2 = U5, r2 = Z5, o2 = q5, i2 = X5, a2 = t2;
function t1(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
t1.prototype.clear = n2;
t1.prototype.delete = r2;
t1.prototype.get = o2;
t1.prototype.has = i2;
t1.prototype.set = a2;
var Do = t1, Oo = Do, s2 = "Expected a function";
function ar(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(s2);
  var r = function() {
    var n = arguments, a = t ? t.apply(this, n) : n[0], s = r.cache;
    if (s.has(a))
      return s.get(a);
    var d = e.apply(this, n);
    return r.cache = s.set(a, d) || s, d;
  };
  return r.cache = new (ar.Cache || Oo)(), r;
}
ar.Cache = Oo;
var l2 = ar, c2 = l2, u2 = 500;
function d2(e) {
  var t = c2(e, function(n) {
    return r.size === u2 && r.clear(), n;
  }), r = t.cache;
  return t;
}
var h2 = d2, f2 = h2, g2 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, m2 = /\\(\\)?/g, y2 = f2(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(g2, function(r, n, a, s) {
    t.push(a ? s.replace(m2, "$1") : n || r);
  }), t;
}), C2 = y2;
function p2(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, a = Array(n); ++r < n; )
    a[r] = t(e[r], r, e);
  return a;
}
var v2 = p2, D0 = pn, b2 = v2, $2 = Gt, _2 = or, k2 = 1 / 0, O0 = D0 ? D0.prototype : void 0, N0 = O0 ? O0.toString : void 0;
function No(e) {
  if (typeof e == "string")
    return e;
  if ($2(e))
    return b2(e, No) + "";
  if (_2(e))
    return N0 ? N0.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -k2 ? "-0" : t;
}
var x2 = No, L2 = x2;
function w2(e) {
  return e == null ? "" : L2(e);
}
var A2 = w2, T2 = Gt, M2 = Ba, S2 = C2, P2 = A2;
function D2(e, t) {
  return T2(e) ? e : M2(e, t) ? [e] : S2(P2(e));
}
var O2 = D2, N2 = 9007199254740991, I2 = /^(?:0|[1-9]\d*)$/;
function B2(e, t) {
  var r = typeof e;
  return t = t ?? N2, !!t && (r == "number" || r != "symbol" && I2.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var Io = B2, E2 = or, F2 = 1 / 0;
function U2(e) {
  if (typeof e == "string" || E2(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -F2 ? "-0" : t;
}
var z2 = U2, V2 = rr, K2 = O2, R2 = Io, I0 = Yt, j2 = z2;
function Q2(e, t, r, n) {
  if (!I0(e))
    return e;
  t = K2(t, e);
  for (var a = -1, s = t.length, d = s - 1, h = e; h != null && ++a < s; ) {
    var b = j2(t[a]), x = r;
    if (b === "__proto__" || b === "constructor" || b === "prototype")
      return e;
    if (a != d) {
      var v = h[b];
      x = n ? n(v, b, h) : void 0, x === void 0 && (x = I0(v) ? v : R2(t[a + 1]) ? [] : {});
    }
    V2(h, b, x), h = h[b];
  }
  return e;
}
var Z2 = Q2, H2 = Z2;
function W2(e, t, r) {
  return e == null ? e : H2(e, t, r);
}
var q2 = W2;
const Ie = /* @__PURE__ */ Lo(q2);
var Y2 = $n;
function G2() {
  this.__data__ = new Y2(), this.size = 0;
}
var X2 = G2;
function J2(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
var e6 = J2;
function t6(e) {
  return this.__data__.get(e);
}
var n6 = t6;
function r6(e) {
  return this.__data__.has(e);
}
var o6 = r6, i6 = $n, a6 = ir, s6 = Do, l6 = 200;
function c6(e, t) {
  var r = this.__data__;
  if (r instanceof i6) {
    var n = r.__data__;
    if (!a6 || n.length < l6 - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new s6(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
var u6 = c6, d6 = $n, h6 = X2, f6 = e6, g6 = n6, m6 = o6, y6 = u6;
function n1(e) {
  var t = this.__data__ = new d6(e);
  this.size = t.size;
}
n1.prototype.clear = h6;
n1.prototype.delete = f6;
n1.prototype.get = g6;
n1.prototype.has = m6;
n1.prototype.set = y6;
var C6 = n1;
function p6(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var v6 = p6, b6 = rr, $6 = So;
function _6(e, t, r, n) {
  var a = !r;
  r || (r = {});
  for (var s = -1, d = t.length; ++s < d; ) {
    var h = t[s], b = n ? n(r[h], e[h], h, r, e) : void 0;
    b === void 0 && (b = e[h]), a ? $6(r, h, b) : b6(r, h, b);
  }
  return r;
}
var kn = _6;
function k6(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var x6 = k6, L6 = x1, w6 = Xt, A6 = "[object Arguments]";
function T6(e) {
  return w6(e) && L6(e) == A6;
}
var M6 = T6, B0 = M6, S6 = Xt, Bo = Object.prototype, P6 = Bo.hasOwnProperty, D6 = Bo.propertyIsEnumerable, O6 = B0(function() {
  return arguments;
}()) ? B0 : function(e) {
  return S6(e) && P6.call(e, "callee") && !D6.call(e, "callee");
}, N6 = O6, dn = { exports: {} };
function I6() {
  return !1;
}
var B6 = I6;
dn.exports;
(function(e, t) {
  var r = ht, n = B6, a = t && !t.nodeType && t, s = a && !0 && e && !e.nodeType && e, d = s && s.exports === a, h = d ? r.Buffer : void 0, b = h ? h.isBuffer : void 0, x = b || n;
  e.exports = x;
})(dn, dn.exports);
var Eo = dn.exports, E6 = 9007199254740991;
function F6(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= E6;
}
var Fo = F6, U6 = x1, z6 = Fo, V6 = Xt, K6 = "[object Arguments]", R6 = "[object Array]", j6 = "[object Boolean]", Q6 = "[object Date]", Z6 = "[object Error]", H6 = "[object Function]", W6 = "[object Map]", q6 = "[object Number]", Y6 = "[object Object]", G6 = "[object RegExp]", X6 = "[object Set]", J6 = "[object String]", es = "[object WeakMap]", ts = "[object ArrayBuffer]", ns = "[object DataView]", rs = "[object Float32Array]", os = "[object Float64Array]", is = "[object Int8Array]", as = "[object Int16Array]", ss = "[object Int32Array]", ls = "[object Uint8Array]", cs = "[object Uint8ClampedArray]", us = "[object Uint16Array]", ds = "[object Uint32Array]", Le = {};
Le[rs] = Le[os] = Le[is] = Le[as] = Le[ss] = Le[ls] = Le[cs] = Le[us] = Le[ds] = !0;
Le[K6] = Le[R6] = Le[ts] = Le[j6] = Le[ns] = Le[Q6] = Le[Z6] = Le[H6] = Le[W6] = Le[q6] = Le[Y6] = Le[G6] = Le[X6] = Le[J6] = Le[es] = !1;
function hs(e) {
  return V6(e) && z6(e.length) && !!Le[U6(e)];
}
var fs = hs;
function gs(e) {
  return function(t) {
    return e(t);
  };
}
var sr = gs, hn = { exports: {} };
hn.exports;
(function(e, t) {
  var r = wo, n = t && !t.nodeType && t, a = n && !0 && e && !e.nodeType && e, s = a && a.exports === n, d = s && r.process, h = function() {
    try {
      var b = a && a.require && a.require("util").types;
      return b || d && d.binding && d.binding("util");
    } catch {
    }
  }();
  e.exports = h;
})(hn, hn.exports);
var lr = hn.exports, ms = fs, ys = sr, E0 = lr, F0 = E0 && E0.isTypedArray, Cs = F0 ? ys(F0) : ms, ps = Cs, vs = x6, bs = N6, $s = Gt, _s = Eo, ks = Io, xs = ps, Ls = Object.prototype, ws = Ls.hasOwnProperty;
function As(e, t) {
  var r = $s(e), n = !r && bs(e), a = !r && !n && _s(e), s = !r && !n && !a && xs(e), d = r || n || a || s, h = d ? vs(e.length, String) : [], b = h.length;
  for (var x in e)
    (t || ws.call(e, x)) && !(d && // Safari 9 has enumerable `arguments.length` in strict mode.
    (x == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    a && (x == "offset" || x == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    s && (x == "buffer" || x == "byteLength" || x == "byteOffset") || // Skip index properties.
    ks(x, b))) && h.push(x);
  return h;
}
var Uo = As, Ts = Object.prototype;
function Ms(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || Ts;
  return e === r;
}
var cr = Ms;
function Ss(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var zo = Ss, Ps = zo, Ds = Ps(Object.keys, Object), Os = Ds, Ns = cr, Is = Os, Bs = Object.prototype, Es = Bs.hasOwnProperty;
function Fs(e) {
  if (!Ns(e))
    return Is(e);
  var t = [];
  for (var r in Object(e))
    Es.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
var Us = Fs, zs = To, Vs = Fo;
function Ks(e) {
  return e != null && Vs(e.length) && !zs(e);
}
var Vo = Ks, Rs = Uo, js = Us, Qs = Vo;
function Zs(e) {
  return Qs(e) ? Rs(e) : js(e);
}
var ur = Zs, Hs = kn, Ws = ur;
function qs(e, t) {
  return e && Hs(t, Ws(t), e);
}
var Ys = qs;
function Gs(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var Xs = Gs, Js = Yt, e3 = cr, t3 = Xs, n3 = Object.prototype, r3 = n3.hasOwnProperty;
function o3(e) {
  if (!Js(e))
    return t3(e);
  var t = e3(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !r3.call(e, n)) || r.push(n);
  return r;
}
var i3 = o3, a3 = Uo, s3 = i3, l3 = Vo;
function c3(e) {
  return l3(e) ? a3(e, !0) : s3(e);
}
var dr = c3, u3 = kn, d3 = dr;
function h3(e, t) {
  return e && u3(t, d3(t), e);
}
var f3 = h3, fn = { exports: {} };
fn.exports;
(function(e, t) {
  var r = ht, n = t && !t.nodeType && t, a = n && !0 && e && !e.nodeType && e, s = a && a.exports === n, d = s ? r.Buffer : void 0, h = d ? d.allocUnsafe : void 0;
  function b(x, v) {
    if (v)
      return x.slice();
    var w = x.length, B = h ? h(w) : new x.constructor(w);
    return x.copy(B), B;
  }
  e.exports = b;
})(fn, fn.exports);
var g3 = fn.exports;
function m3(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
var y3 = m3;
function C3(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, a = 0, s = []; ++r < n; ) {
    var d = e[r];
    t(d, r, e) && (s[a++] = d);
  }
  return s;
}
var p3 = C3;
function v3() {
  return [];
}
var Ko = v3, b3 = p3, $3 = Ko, _3 = Object.prototype, k3 = _3.propertyIsEnumerable, U0 = Object.getOwnPropertySymbols, x3 = U0 ? function(e) {
  return e == null ? [] : (e = Object(e), b3(U0(e), function(t) {
    return k3.call(e, t);
  }));
} : $3, hr = x3, L3 = kn, w3 = hr;
function A3(e, t) {
  return L3(e, w3(e), t);
}
var T3 = A3;
function M3(e, t) {
  for (var r = -1, n = t.length, a = e.length; ++r < n; )
    e[a + r] = t[r];
  return e;
}
var Ro = M3, S3 = zo, P3 = S3(Object.getPrototypeOf, Object), jo = P3, D3 = Ro, O3 = jo, N3 = hr, I3 = Ko, B3 = Object.getOwnPropertySymbols, E3 = B3 ? function(e) {
  for (var t = []; e; )
    D3(t, N3(e)), e = O3(e);
  return t;
} : I3, Qo = E3, F3 = kn, U3 = Qo;
function z3(e, t) {
  return F3(e, U3(e), t);
}
var V3 = z3, K3 = Ro, R3 = Gt;
function j3(e, t, r) {
  var n = t(e);
  return R3(e) ? n : K3(n, r(e));
}
var Zo = j3, Q3 = Zo, Z3 = hr, H3 = ur;
function W3(e) {
  return Q3(e, H3, Z3);
}
var q3 = W3, Y3 = Zo, G3 = Qo, X3 = dr;
function J3(e) {
  return Y3(e, X3, G3);
}
var e8 = J3, t8 = It, n8 = ht, r8 = t8(n8, "DataView"), o8 = r8, i8 = It, a8 = ht, s8 = i8(a8, "Promise"), l8 = s8, c8 = It, u8 = ht, d8 = c8(u8, "Set"), h8 = d8, f8 = It, g8 = ht, m8 = f8(g8, "WeakMap"), y8 = m8, Zn = o8, Hn = ir, Wn = l8, qn = h8, Yn = y8, Ho = x1, r1 = Mo, z0 = "[object Map]", C8 = "[object Object]", V0 = "[object Promise]", K0 = "[object Set]", R0 = "[object WeakMap]", j0 = "[object DataView]", p8 = r1(Zn), v8 = r1(Hn), b8 = r1(Wn), $8 = r1(qn), _8 = r1(Yn), Pt = Ho;
(Zn && Pt(new Zn(new ArrayBuffer(1))) != j0 || Hn && Pt(new Hn()) != z0 || Wn && Pt(Wn.resolve()) != V0 || qn && Pt(new qn()) != K0 || Yn && Pt(new Yn()) != R0) && (Pt = function(e) {
  var t = Ho(e), r = t == C8 ? e.constructor : void 0, n = r ? r1(r) : "";
  if (n)
    switch (n) {
      case p8:
        return j0;
      case v8:
        return z0;
      case b8:
        return V0;
      case $8:
        return K0;
      case _8:
        return R0;
    }
  return t;
});
var fr = Pt, k8 = Object.prototype, x8 = k8.hasOwnProperty;
function L8(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && x8.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
var w8 = L8, A8 = ht, T8 = A8.Uint8Array, M8 = T8, Q0 = M8;
function S8(e) {
  var t = new e.constructor(e.byteLength);
  return new Q0(t).set(new Q0(e)), t;
}
var gr = S8, P8 = gr;
function D8(e, t) {
  var r = t ? P8(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var O8 = D8, N8 = /\w*$/;
function I8(e) {
  var t = new e.constructor(e.source, N8.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var B8 = I8, Z0 = pn, H0 = Z0 ? Z0.prototype : void 0, W0 = H0 ? H0.valueOf : void 0;
function E8(e) {
  return W0 ? Object(W0.call(e)) : {};
}
var F8 = E8, U8 = gr;
function z8(e, t) {
  var r = t ? U8(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
var V8 = z8, K8 = gr, R8 = O8, j8 = B8, Q8 = F8, Z8 = V8, H8 = "[object Boolean]", W8 = "[object Date]", q8 = "[object Map]", Y8 = "[object Number]", G8 = "[object RegExp]", X8 = "[object Set]", J8 = "[object String]", el = "[object Symbol]", tl = "[object ArrayBuffer]", nl = "[object DataView]", rl = "[object Float32Array]", ol = "[object Float64Array]", il = "[object Int8Array]", al = "[object Int16Array]", sl = "[object Int32Array]", ll = "[object Uint8Array]", cl = "[object Uint8ClampedArray]", ul = "[object Uint16Array]", dl = "[object Uint32Array]";
function hl(e, t, r) {
  var n = e.constructor;
  switch (t) {
    case tl:
      return K8(e);
    case H8:
    case W8:
      return new n(+e);
    case nl:
      return R8(e, r);
    case rl:
    case ol:
    case il:
    case al:
    case sl:
    case ll:
    case cl:
    case ul:
    case dl:
      return Z8(e, r);
    case q8:
      return new n();
    case Y8:
    case J8:
      return new n(e);
    case G8:
      return j8(e);
    case X8:
      return new n();
    case el:
      return Q8(e);
  }
}
var fl = hl, gl = Yt, q0 = Object.create, ml = function() {
  function e() {
  }
  return function(t) {
    if (!gl(t))
      return {};
    if (q0)
      return q0(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}(), yl = ml, Cl = yl, pl = jo, vl = cr;
function bl(e) {
  return typeof e.constructor == "function" && !vl(e) ? Cl(pl(e)) : {};
}
var $l = bl, _l = fr, kl = Xt, xl = "[object Map]";
function Ll(e) {
  return kl(e) && _l(e) == xl;
}
var wl = Ll, Al = wl, Tl = sr, Y0 = lr, G0 = Y0 && Y0.isMap, Ml = G0 ? Tl(G0) : Al, Sl = Ml, Pl = fr, Dl = Xt, Ol = "[object Set]";
function Nl(e) {
  return Dl(e) && Pl(e) == Ol;
}
var Il = Nl, Bl = Il, El = sr, X0 = lr, J0 = X0 && X0.isSet, Fl = J0 ? El(J0) : Bl, Ul = Fl, zl = C6, Vl = v6, Kl = rr, Rl = Ys, jl = f3, Ql = g3, Zl = y3, Hl = T3, Wl = V3, ql = q3, Yl = e8, Gl = fr, Xl = w8, Jl = fl, e7 = $l, t7 = Gt, n7 = Eo, r7 = Sl, o7 = Yt, i7 = Ul, a7 = ur, s7 = dr, l7 = 1, c7 = 2, u7 = 4, Wo = "[object Arguments]", d7 = "[object Array]", h7 = "[object Boolean]", f7 = "[object Date]", g7 = "[object Error]", qo = "[object Function]", m7 = "[object GeneratorFunction]", y7 = "[object Map]", C7 = "[object Number]", Yo = "[object Object]", p7 = "[object RegExp]", v7 = "[object Set]", b7 = "[object String]", $7 = "[object Symbol]", _7 = "[object WeakMap]", k7 = "[object ArrayBuffer]", x7 = "[object DataView]", L7 = "[object Float32Array]", w7 = "[object Float64Array]", A7 = "[object Int8Array]", T7 = "[object Int16Array]", M7 = "[object Int32Array]", S7 = "[object Uint8Array]", P7 = "[object Uint8ClampedArray]", D7 = "[object Uint16Array]", O7 = "[object Uint32Array]", $e = {};
$e[Wo] = $e[d7] = $e[k7] = $e[x7] = $e[h7] = $e[f7] = $e[L7] = $e[w7] = $e[A7] = $e[T7] = $e[M7] = $e[y7] = $e[C7] = $e[Yo] = $e[p7] = $e[v7] = $e[b7] = $e[$7] = $e[S7] = $e[P7] = $e[D7] = $e[O7] = !0;
$e[g7] = $e[qo] = $e[_7] = !1;
function on(e, t, r, n, a, s) {
  var d, h = t & l7, b = t & c7, x = t & u7;
  if (r && (d = a ? r(e, n, a, s) : r(e)), d !== void 0)
    return d;
  if (!o7(e))
    return e;
  var v = t7(e);
  if (v) {
    if (d = Xl(e), !h)
      return Zl(e, d);
  } else {
    var w = Gl(e), B = w == qo || w == m7;
    if (n7(e))
      return Ql(e, h);
    if (w == Yo || w == Wo || B && !a) {
      if (d = b || B ? {} : e7(e), !h)
        return b ? Wl(e, jl(d, e)) : Hl(e, Rl(d, e));
    } else {
      if (!$e[w])
        return a ? e : {};
      d = Jl(e, w, h);
    }
  }
  s || (s = new zl());
  var N = s.get(e);
  if (N)
    return N;
  s.set(e, d), i7(e) ? e.forEach(function(R) {
    d.add(on(R, t, r, R, e, s));
  }) : r7(e) && e.forEach(function(R, U) {
    d.set(U, on(R, t, r, U, e, s));
  });
  var oe = x ? b ? Yl : ql : b ? s7 : a7, V = v ? void 0 : oe(e);
  return Vl(V || e, function(R, U) {
    V && (U = R, R = e[U]), Kl(d, U, on(R, t, r, U, e, s));
  }), d;
}
var N7 = on, I7 = N7, B7 = 1, E7 = 4;
function F7(e) {
  return I7(e, B7 | E7);
}
var U7 = F7;
const z7 = /* @__PURE__ */ Lo(U7), V7 = /* @__PURE__ */ p("<button></button>"), K7 = (e) => (() => {
  const t = V7.cloneNode(!0);
  return ut(t, "click", e.onClick, !0), C(t, () => e.children), K((r) => {
    const n = e.style, a = `klinecharts-pro-button ${e.type ?? "confirm"} ${e.class ?? ""}`;
    return r._v$ = Nt(t, n, r._v$), a !== r._v$2 && ge(t, r._v$2 = a), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
He(["click"]);
const R7 = /* @__PURE__ */ p('<svg viewBox="0 0 1024 1024" class="icon"><path d="M810.666667 128H213.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v597.333334c0 46.933333 38.4 85.333333 85.333333 85.333333h597.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V213.333333c0-46.933333-38.4-85.333333-85.333333-85.333333z m-353.706667 567.04a42.496 42.496 0 0 1-60.16 0L243.626667 541.866667c-8.106667-8.106667-12.373333-18.773333-12.373334-29.866667s4.693333-22.186667 12.373334-29.866667a42.496 42.496 0 0 1 60.16 0L426.666667 604.586667l293.546666-293.546667a42.496 42.496 0 1 1 60.16 60.16l-323.413333 323.84z"></path></svg>'), j7 = /* @__PURE__ */ p('<svg viewBox="0 0 1024 1024" class="icon"><path d="M245.333333 128h533.333334A117.333333 117.333333 0 0 1 896 245.333333v533.333334A117.333333 117.333333 0 0 1 778.666667 896H245.333333A117.333333 117.333333 0 0 1 128 778.666667V245.333333A117.333333 117.333333 0 0 1 245.333333 128z m0 64c-29.44 0-53.333333 23.893333-53.333333 53.333333v533.333334c0 29.44 23.893333 53.333333 53.333333 53.333333h533.333334c29.44 0 53.333333-23.893333 53.333333-53.333333V245.333333c0-29.44-23.893333-53.333333-53.333333-53.333333H245.333333z"></path></svg>'), Q7 = /* @__PURE__ */ p("<div></div>"), Z7 = /* @__PURE__ */ p('<span class="label"></span>'), H7 = () => R7.cloneNode(!0), W7 = () => j7.cloneNode(!0), eo = (e) => {
  const [t, r] = M(e.checked ?? !1);
  return Ze(() => {
    "checked" in e && r(e.checked);
  }), (() => {
    const n = Q7.cloneNode(!0);
    return n.$$click = (a) => {
      const s = !t();
      e.onChange && e.onChange(s), r(s);
    }, C(n, (() => {
      const a = q(() => !!t());
      return () => a() ? A(H7, {}) : A(W7, {});
    })(), null), C(n, (() => {
      const a = q(() => !!e.label);
      return () => a() && (() => {
        const s = Z7.cloneNode(!0);
        return C(s, () => e.label), s;
      })();
    })(), null), K((a) => {
      const s = e.style, d = `klinecharts-pro-checkbox ${t() && "checked" || ""} ${e.class || ""}`;
      return a._v$ = Nt(n, s, a._v$), d !== a._v$2 && ge(n, a._v$2 = d), a;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), n;
  })();
};
He(["click"]);
const q7 = /* @__PURE__ */ p('<div class="klinecharts-pro-loading"><i class="circle1"></i><i class="circle2"></i><i class="circle3"></i></div>'), Go = () => q7.cloneNode(!0), Y7 = /* @__PURE__ */ p('<div class="klinecharts-pro-empty"><svg class="icon" viewBox="0 0 1024 1024"><path d="M855.6 427.2H168.5c-12.7 0-24.4 6.9-30.6 18L4.4 684.7C1.5 689.9 0 695.8 0 701.8v287.1c0 19.4 15.7 35.1 35.1 35.1H989c19.4 0 35.1-15.7 35.1-35.1V701.8c0-6-1.5-11.8-4.4-17.1L886.2 445.2c-6.2-11.1-17.9-18-30.6-18zM673.4 695.6c-16.5 0-30.8 11.5-34.3 27.7-12.7 58.5-64.8 102.3-127.2 102.3s-114.5-43.8-127.2-102.3c-3.5-16.1-17.8-27.7-34.3-27.7H119c-26.4 0-43.3-28-31.1-51.4l81.7-155.8c6.1-11.6 18-18.8 31.1-18.8h622.4c13 0 25 7.2 31.1 18.8l81.7 155.8c12.2 23.4-4.7 51.4-31.1 51.4H673.4zM819.9 209.5c-1-1.8-2.1-3.7-3.2-5.5-9.8-16.6-31.1-22.2-47.8-12.6L648.5 261c-17 9.8-22.7 31.6-12.6 48.4 0.9 1.4 1.7 2.9 2.5 4.4 9.5 17 31.2 22.8 48 13L807 257.3c16.7-9.7 22.4-31 12.9-47.8zM375.4 261.1L255 191.6c-16.7-9.6-38-4-47.8 12.6-1.1 1.8-2.1 3.6-3.2 5.5-9.5 16.8-3.8 38.1 12.9 47.8L337.3 327c16.9 9.7 38.6 4 48-13.1 0.8-1.5 1.7-2.9 2.5-4.4 10.2-16.8 4.5-38.6-12.4-48.4zM512 239.3h2.5c19.5 0.3 35.5-15.5 35.5-35.1v-139c0-19.3-15.6-34.9-34.8-35.1h-6.4C489.6 30.3 474 46 474 65.2v139c0 19.5 15.9 35.4 35.5 35.1h2.5z"></path></svg></div>'), G7 = () => Y7.cloneNode(!0), X7 = /* @__PURE__ */ p("<ul></ul>"), J7 = /* @__PURE__ */ p("<li></li>"), gn = (e) => (() => {
  const t = X7.cloneNode(!0);
  return C(t, A(de, {
    get when() {
      return e.loading;
    },
    get children() {
      return A(Go, {});
    }
  }), null), C(t, A(de, {
    get when() {
      var r;
      return !e.loading && !e.children && !((r = e.dataSource) != null && r.length);
    },
    get children() {
      return A(G7, {});
    }
  }), null), C(t, A(de, {
    get when() {
      return e.children;
    },
    get children() {
      return e.children;
    }
  }), null), C(t, A(de, {
    get when() {
      return !e.children;
    },
    get children() {
      var r;
      return (r = e.dataSource) == null ? void 0 : r.map((n) => {
        var a;
        return ((a = e.renderItem) == null ? void 0 : a.call(e, n)) ?? J7.cloneNode(!0);
      });
    }
  }), null), K((r) => {
    const n = e.style, a = `klinecharts-pro-list ${e.class ?? ""}`;
    return r._v$ = Nt(t, n, r._v$), a !== r._v$2 && ge(t, r._v$2 = a), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})(), ec = /* @__PURE__ */ p('<div class="klinecharts-pro-modal"><div class="inner"><div class="title-container"><svg class="close-icon" viewBox="0 0 1024 1024"><path d="M934.184927 199.723787 622.457206 511.452531l311.727721 311.703161c14.334473 14.229073 23.069415 33.951253 23.069415 55.743582 0 43.430138-35.178197 78.660524-78.735226 78.660524-21.664416 0-41.361013-8.865925-55.642275-23.069415L511.149121 622.838388 199.420377 934.490384c-14.204513 14.20349-33.901111 23.069415-55.642275 23.069415-43.482327 0-78.737272-35.230386-78.737272-78.660524 0-21.792329 8.864902-41.513486 23.094998-55.743582l311.677579-311.703161L88.135828 199.723787c-14.230096-14.255679-23.094998-33.92567-23.094998-55.642275 0-43.430138 35.254945-78.762855 78.737272-78.762855 21.741163 0 41.437761 8.813736 55.642275 23.069415l311.727721 311.727721L822.876842 88.389096c14.281261-14.255679 33.977859-23.069415 55.642275-23.069415 43.557028 0 78.735226 35.332716 78.735226 78.762855C957.254342 165.798117 948.5194 185.468109 934.184927 199.723787"></path></svg></div><div class="content-container"></div></div></div>'), tc = /* @__PURE__ */ p('<div class="button-container"></div>'), wt = (e) => (() => {
  const t = ec.cloneNode(!0), r = t.firstChild, n = r.firstChild, a = n.firstChild, s = n.nextSibling;
  return t.$$click = (d) => {
    d.target === d.currentTarget && e.onClose && e.onClose();
  }, C(n, () => e.title, a), ut(a, "click", e.onClose, !0), C(s, () => e.children), C(r, (() => {
    const d = q(() => !!(e.buttons && e.buttons.length > 0));
    return () => d() && (() => {
      const h = tc.cloneNode(!0);
      return C(h, () => e.buttons.map((b) => A(K7, xo(b, {
        get style() {
          return {
            ...e.minButtonWidth ? {
              "min-width": `${e.minButtonWidth}px`
            } : {},
            width: e.isMobile ? "100%" : "auto"
          };
        },
        get children() {
          return b.children;
        }
      })))), K((b) => {
        const x = e.btnParentStyle, v = !!e.isMobile;
        return b._v$8 = Nt(h, x, b._v$8), v !== b._v$9 && h.classList.toggle("mobile-buttons", b._v$9 = v), b;
      }, {
        _v$8: void 0,
        _v$9: void 0
      }), h;
    })();
  })(), null), K((d) => {
    const h = !!e.isMobile, b = e.isMobile ? "100%" : `${e.width ?? 400}px`, x = (e.isMobile, "auto"), v = e.isMobile ? "60vh" : "90vh", w = !!e.isMobile, B = !!e.isMobile, N = !!e.isMobile;
    return h !== d._v$ && t.classList.toggle("mobile-modal", d._v$ = h), b !== d._v$2 && r.style.setProperty("width", d._v$2 = b), x !== d._v$3 && r.style.setProperty("height", d._v$3 = x), v !== d._v$4 && r.style.setProperty("max-height", d._v$4 = v), w !== d._v$5 && r.classList.toggle("mobile-inner", d._v$5 = w), B !== d._v$6 && n.classList.toggle("mobile-title", d._v$6 = B), N !== d._v$7 && s.classList.toggle("mobile-content", d._v$7 = N), d;
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
He(["click"]);
const nc = /* @__PURE__ */ p('<div tabindex="0"><div class="selector-container"><span class="value"></span><i class="arrow"></i></div></div>'), rc = /* @__PURE__ */ p('<div class="drop-down-container"><ul></ul></div>'), oc = /* @__PURE__ */ p('<div><input type="text"></div>'), ic = /* @__PURE__ */ p("<li></li>"), Gn = (e) => {
  const [t, r] = M(!1), [n, a] = M("");
  let s, d;
  const h = q(() => {
    if (!e.dataSource || !e.searchable)
      return e.dataSource;
    const v = n().toLowerCase().trim();
    return v ? typeof e.dataSource[0] == "string" ? e.dataSource.filter((B) => B.toLowerCase().includes(v)) : e.dataSource.filter((B) => {
      var V, R;
      const N = ((V = B.text) == null ? void 0 : V.toString().toLowerCase()) || "", oe = ((R = B.key) == null ? void 0 : R.toLowerCase()) || "";
      return N.includes(v) || oe.includes(v);
    }) : e.dataSource;
  }), b = () => {
    const v = !t();
    r(v), a(""), v && e.searchable && setTimeout(() => s == null ? void 0 : s.focus(), 50);
  }, x = (v) => {
    const w = v.relatedTarget;
    d && w && d.contains(w) || setTimeout(() => {
      d && document.activeElement && d.contains(document.activeElement) || (r(!1), a(""));
    }, 0);
  };
  return (() => {
    const v = nc.cloneNode(!0), w = v.firstChild, B = w.firstChild;
    v.addEventListener("blur", x), v.$$click = (oe) => {
      oe.stopPropagation(), !oe.target.closest(".drop-down-container") && b();
    };
    const N = d;
    return typeof N == "function" ? kt(N, v) : d = v, C(B, () => e.value), C(v, (() => {
      const oe = q(() => !!(e.dataSource && e.dataSource.length > 0));
      return () => oe() && (() => {
        const V = rc.cloneNode(!0), R = V.firstChild;
        return V.$$click = (U) => U.stopPropagation(), V.$$mousedown = (U) => {
          U.preventDefault(), U.stopPropagation();
        }, C(V, (() => {
          const U = q(() => !!e.searchable);
          return () => U() && (() => {
            const he = oc.cloneNode(!0), Z = he.firstChild;
            he.style.setProperty("padding", "8px"), he.style.setProperty("border-bottom", "1px solid #333"), Z.$$click = (J) => J.stopPropagation(), Z.$$input = (J) => a(J.currentTarget.value);
            const X = s;
            return typeof X == "function" ? kt(X, Z) : s = Z, Z.style.setProperty("width", "100%"), Z.style.setProperty("padding", "6px 10px"), Z.style.setProperty("border", "1px solid var(--klinecharts-pro-border-color)"), Z.style.setProperty("border-radius", "4px"), Z.style.setProperty("background-color", "var(--klinecharts-pro-popover-background-color)"), Z.style.setProperty("color", "#fff"), Z.style.setProperty("font-size", "13px"), Z.style.setProperty("outline", "none"), K(() => Ee(Z, "placeholder", e.searchPlaceholder || "Search...")), K(() => Z.value = n()), he;
          })();
        })(), R), C(R, () => {
          var U;
          return (U = h()) == null ? void 0 : U.map((he) => {
            const X = he[e.valueKey ?? "text"] ?? he;
            return (() => {
              const J = ic.cloneNode(!0);
              return J.$$click = (ve) => {
                var W;
                ve.stopPropagation(), e.value !== X && ((W = e.onSelected) == null || W.call(e, he)), r(!1), a("");
              }, C(J, X), K(() => J.classList.toggle("selected", e.value === X)), J;
            })();
          });
        }), V;
      })();
    })(), null), K((oe) => {
      const V = e.style, R = `klinecharts-pro-select ${e.class ?? ""} ${t() ? "klinecharts-pro-select-show" : ""}`;
      return oe._v$ = Nt(v, V, oe._v$), R !== oe._v$2 && ge(v, oe._v$2 = R), oe;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), v;
  })();
};
He(["click", "mousedown", "input"]);
const ac = /* @__PURE__ */ p('<span class="prefix"></span>'), sc = /* @__PURE__ */ p('<span class="suffix"></span>'), lc = /* @__PURE__ */ p('<div><input class="value"></div>'), Xo = (e) => {
  const t = xo({
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER
  }, e);
  let r;
  const [n, a] = M("normal");
  return (() => {
    const s = lc.cloneNode(!0), d = s.firstChild;
    return s.$$click = () => {
      r == null || r.focus();
    }, C(s, A(de, {
      get when() {
        return t.prefix;
      },
      get children() {
        const h = ac.cloneNode(!0);
        return C(h, () => t.prefix), h;
      }
    }), d), d.addEventListener("change", (h) => {
      var x, v;
      const b = h.target.value;
      if ("precision" in t) {
        let w;
        const B = Math.max(0, Math.floor(t.precision));
        B <= 0 ? w = new RegExp(/^[1-9]\d*$/) : w = new RegExp("^\\d+\\.?\\d{0," + B + "}$"), (b === "" || w.test(b) && +b >= t.min && +b <= t.max) && ((x = t.onChange) == null || x.call(t, b === "" ? b : +b));
      } else
        (v = t.onChange) == null || v.call(t, b);
    }), d.addEventListener("blur", () => {
      a("normal");
    }), d.addEventListener("focus", () => {
      a("focus");
    }), kt((h) => {
      r = h;
    }, d), C(s, A(de, {
      get when() {
        return t.suffix;
      },
      get children() {
        const h = sc.cloneNode(!0);
        return C(h, () => t.suffix), h;
      }
    }), null), K((h) => {
      const b = t.style, x = `klinecharts-pro-input ${t.class ?? ""}`, v = n(), w = t.placeholder ?? "";
      return h._v$ = Nt(s, b, h._v$), x !== h._v$2 && ge(s, h._v$2 = x), v !== h._v$3 && Ee(s, "data-status", h._v$3 = v), w !== h._v$4 && Ee(d, "placeholder", h._v$4 = w), h;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0
    }), K(() => d.value = t.value), s;
  })();
};
He(["click"]);
const cc = /* @__PURE__ */ p('<div><i class="thumb"></i></div>'), uc = (e) => (() => {
  const t = cc.cloneNode(!0);
  return t.$$click = (r) => {
    e.onChange && e.onChange();
  }, K((r) => {
    const n = e.style, a = `klinecharts-pro-switch ${e.open ? "turn-on" : "turn-off"} ${e.class ?? ""}`;
    return r._v$ = Nt(t, n, r._v$), a !== r._v$2 && ge(t, r._v$2 = a), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
He(["click"]);
let ue = null, to = !1;
const v1 = /* @__PURE__ */ new Map(), dc = 500, no = 3;
function J1(e) {
  return e == null ? void 0 : e.trim().toLowerCase();
}
function hc(e, t) {
  return e.x >= t.x && e.x <= t.x + t.width && e.y >= t.y && e.y <= t.y + t.height;
}
function Xn(e) {
  const t = ue;
  if (!t || !e)
    return null;
  const r = J1(e);
  return r === J1(t.upColor) ? "up" : r === J1(t.downColor) ? "down" : r === J1(t.noChangeColor) ? "noChange" : null;
}
function En(e, t, r) {
  const n = ue;
  if (!n || !e)
    return e;
  const a = r ?? Xn(e);
  return a === "up" ? t === "border" ? n.upBorderColor ?? n.borderUpColor ?? e : t === "wick" ? n.upWickColor ?? n.wickUpColor ?? e : n.upColor ?? e : a === "down" ? t === "border" ? n.downBorderColor ?? n.borderDownColor ?? e : t === "wick" ? n.downWickColor ?? n.wickDownColor ?? e : n.downColor ?? e : a === "noChange" ? t === "border" ? n.noChangeBorderColor ?? n.borderNoChangeColor ?? e : t === "wick" ? n.noChangeWickColor ?? n.wickNoChangeColor ?? e : n.noChangeColor ?? e : e;
}
function fc(e) {
  return Math.round((e.x + e.width / 2) * 1e3) / 1e3;
}
function gc(e) {
  return Math.round(Math.abs(e.width) * 1e3) / 1e3;
}
function mc(e, t) {
  if (t)
    return !1;
  const r = fc(e), n = gc(e), a = v1.get(r) ?? 0;
  if (n > Math.max(no, a)) {
    if (v1.set(r, n), v1.size > dc) {
      const d = v1.keys().next().value;
      d !== void 0 && v1.delete(d);
    }
    return !1;
  }
  const s = Math.max(no, a * 0.35);
  return n <= s;
}
function Fn(e, t, r) {
  const { x: n, y: a, width: s, height: d } = t, h = Math.max(0, Math.min(r, Math.abs(s) / 2, Math.abs(d) / 2));
  e.beginPath(), e.moveTo(n + h, a), e.arcTo(n + s, a, n + s, a + d, h), e.arcTo(n + s, a + d, n, a + d, h), e.arcTo(n, a + d, n, a, h), e.arcTo(n, a, n + s, a, h), e.closePath();
}
function yc(e, t, r) {
  const n = r.style ?? Zt.Fill, a = r.color ?? "currentColor", s = Xn(r.color) ?? Xn(r.borderColor), d = n === Zt.Stroke, h = s ? mc(t, d) : !1, b = En(a, h ? "wick" : "body", s), x = r.borderSize ?? 1, v = En(r.borderColor ?? a, "border", s), w = r.borderStyle ?? Ke.Solid, B = r.borderRadius ?? 0, N = r.borderDashedValue ?? [2, 2], oe = n === Zt.Fill || r.style === Zt.StrokeFill, V = n === Zt.Stroke || r.style === Zt.StrokeFill;
  if (oe) {
    e.fillStyle = b, Fn(e, t, B), e.fill();
    const R = En(a, "border", s);
    !h && s && R && (e.strokeStyle = R, e.lineWidth = Math.max(1, x), e.setLineDash([]), Fn(e, t, B), e.stroke());
  }
  V && (e.strokeStyle = v, e.lineWidth = x, e.setLineDash(w === Ke.Dashed ? N : []), Fn(e, t, B), e.stroke());
}
function Cc() {
  to || (to = !0, S9({
    name: "rect",
    checkEventOn: hc,
    draw: yc
  }));
}
function _t(e) {
  var r;
  const t = (r = e == null ? void 0 : e.candle) == null ? void 0 : r.bar;
  t && (ue = {
    ...ue ?? {},
    ...t,
    upBorderColor: t.upBorderColor ?? t.borderUpColor ?? t.upColor ?? (ue == null ? void 0 : ue.upBorderColor) ?? (ue == null ? void 0 : ue.borderUpColor),
    downBorderColor: t.downBorderColor ?? t.borderDownColor ?? t.downColor ?? (ue == null ? void 0 : ue.downBorderColor) ?? (ue == null ? void 0 : ue.borderDownColor),
    noChangeBorderColor: t.noChangeBorderColor ?? t.borderNoChangeColor ?? t.noChangeColor ?? (ue == null ? void 0 : ue.noChangeBorderColor) ?? (ue == null ? void 0 : ue.borderNoChangeColor),
    upWickColor: t.upWickColor ?? t.wickUpColor ?? t.upColor ?? (ue == null ? void 0 : ue.upWickColor) ?? (ue == null ? void 0 : ue.wickUpColor),
    downWickColor: t.downWickColor ?? t.wickDownColor ?? t.downColor ?? (ue == null ? void 0 : ue.downWickColor) ?? (ue == null ? void 0 : ue.wickDownColor),
    noChangeWickColor: t.noChangeWickColor ?? t.wickNoChangeColor ?? t.noChangeColor ?? (ue == null ? void 0 : ue.noChangeWickColor) ?? (ue == null ? void 0 : ue.wickNoChangeColor)
  });
}
const pc = "指标", vc = "更多", bc = "主图指标", $c = "副图指标", _c = "设置", kc = "时区", xc = "截屏", Lc = "全屏", wc = "退出全屏", Ac = "保存", Tc = "确定", Mc = "取消", Sc = "MA(移动平均线)", Pc = "EMA(指数平滑移动平均线)", Dc = "SMA", Oc = "BOLL(布林线)", Nc = "BBI(多空指数)", Ic = "SAR(停损点指向指标)", Bc = "VOL(成交量)", Ec = "MACD(指数平滑异同移动平均线)", Fc = "KDJ(随机指标)", Uc = "RSI(相对强弱指标)", zc = "BIAS(乖离率)", Vc = "BRAR(情绪指标)", Kc = "CCI(顺势指标)", Rc = "DMI(动向指标)", jc = "CR(能量指标)", Qc = "PSY(心理线)", Zc = "DMA(平行线差指标)", Hc = "TRIX(三重指数平滑平均线)", Wc = "OBV(能量潮指标)", qc = "VR(成交量变异率)", Yc = "WR(威廉指标)", Gc = "MTM(动量指标)", Xc = "EMV(简易波动指标)", Jc = "ROC(变动率指标)", e4 = "PVT(价量趋势指标)", t4 = "AO(动量震荡指标)", n4 = "世界统一时间", r4 = "(UTC-10) 檀香山", o4 = "(UTC-8) 朱诺", i4 = "(UTC-7) 洛杉矶", a4 = "(UTC-5) 芝加哥", s4 = "(UTC-4) 多伦多", l4 = "(UTC-3) 圣保罗", c4 = "(UTC+1) 伦敦", u4 = "(UTC+2) 柏林", d4 = "(UTC+3) 巴林", h4 = "(UTC+4) 迪拜", f4 = "(UTC+5) 阿什哈巴德", g4 = "(UTC+6) 阿拉木图", m4 = "(UTC+7) 曼谷", y4 = "(UTC+8) 上海", C4 = "(UTC+9) 东京", p4 = "(UTC+10) 悉尼", v4 = "(UTC+12) 诺福克岛", b4 = "水平直线", $4 = "水平射线", _4 = "水平线段", k4 = "垂直直线", x4 = "垂直射线", L4 = "垂直线段", w4 = "直线", A4 = "射线", T4 = "线段", M4 = "箭头", S4 = "价格线", P4 = "价格通道线", D4 = "平行直线", O4 = "斐波那契回调直线", N4 = "斐波那契回调线段", I4 = "斐波那契圆环", B4 = "斐波那契螺旋", E4 = "斐波那契速度阻力扇", F4 = "斐波那契趋势扩展", U4 = "江恩箱", z4 = "矩形", V4 = "平行四边形", K4 = "圆", R4 = "三角形", j4 = "三浪", Q4 = "五浪", Z4 = "八浪", H4 = "任意浪", W4 = "ABCD形态", q4 = "XABCD形态", Y4 = "弱磁模式", G4 = "强磁模式", X4 = "商品搜索", J4 = "商品代码", eu = "参数1", tu = "参数2", nu = "参数3", ru = "参数4", ou = "参数5", iu = "周期", au = "标准差", su = "蜡烛图类型", lu = "全实心", cu = "全空心", uu = "涨空心", du = "跌空心", hu = "OHLC", fu = "面积图", gu = "最新价显示", mu = "最高价显示", yu = "最低价显示", Cu = "指标最新值显示", pu = "价格轴类型", vu = "线性轴", bu = "百分比轴", $u = "对数轴", _u = "倒置坐标", ku = "网格线显示", xu = "恢复默认", Lu = {
  indicator: pc,
  more: vc,
  main_indicator: bc,
  sub_indicator: $c,
  setting: _c,
  timezone: kc,
  screenshot: xc,
  full_screen: Lc,
  exit_full_screen: wc,
  save: Ac,
  confirm: Tc,
  cancel: Mc,
  ma: Sc,
  ema: Pc,
  sma: Dc,
  boll: Oc,
  bbi: Nc,
  sar: Ic,
  vol: Bc,
  macd: Ec,
  kdj: Fc,
  rsi: Uc,
  bias: zc,
  brar: Vc,
  cci: Kc,
  dmi: Rc,
  cr: jc,
  psy: Qc,
  dma: Zc,
  trix: Hc,
  obv: Wc,
  vr: qc,
  wr: Yc,
  mtm: Gc,
  emv: Xc,
  roc: Jc,
  pvt: e4,
  ao: t4,
  utc: n4,
  honolulu: r4,
  juneau: o4,
  los_angeles: i4,
  chicago: a4,
  toronto: s4,
  sao_paulo: l4,
  london: c4,
  berlin: u4,
  bahrain: d4,
  dubai: h4,
  ashkhabad: f4,
  almaty: g4,
  bangkok: m4,
  shanghai: y4,
  tokyo: C4,
  sydney: p4,
  norfolk: v4,
  horizontal_straight_line: b4,
  horizontal_ray_line: $4,
  horizontal_segment: _4,
  vertical_straight_line: k4,
  vertical_ray_line: x4,
  vertical_segment: L4,
  straight_line: w4,
  ray_line: A4,
  segment: T4,
  arrow: M4,
  price_line: S4,
  price_channel_line: P4,
  parallel_straight_line: D4,
  fibonacci_line: O4,
  fibonacci_segment: N4,
  fibonacci_circle: I4,
  fibonacci_spiral: B4,
  fibonacci_speed_resistance_fan: E4,
  fibonacci_extension: F4,
  gann_box: U4,
  rect: z4,
  parallelogram: V4,
  circle: K4,
  triangle: R4,
  three_waves: j4,
  five_waves: Q4,
  eight_waves: Z4,
  any_waves: H4,
  abcd: W4,
  xabcd: q4,
  weak_magnet: Y4,
  strong_magnet: G4,
  symbol_search: X4,
  symbol_code: J4,
  params_1: eu,
  params_2: tu,
  params_3: nu,
  params_4: ru,
  params_5: ou,
  period: iu,
  standard_deviation: au,
  candle_type: su,
  candle_solid: lu,
  candle_stroke: cu,
  candle_up_stroke: uu,
  candle_down_stroke: du,
  ohlc: hu,
  area: fu,
  last_price_show: gu,
  high_price_show: mu,
  low_price_show: yu,
  indicator_last_value_show: Cu,
  price_axis_type: pu,
  normal: vu,
  percentage: bu,
  log: $u,
  reverse_coordinate: _u,
  grid_show: ku,
  restore_default: xu
}, wu = "Indicator", Au = "More", Tu = "Main Indicator", Mu = "Sub Indicator", Su = "Setting", Pu = "Timezone", Du = "Screenshot", Ou = "Full Screen", Nu = "Exit", Iu = "Save", Bu = "Confirm", Eu = "Cancel", Fu = "MA(Moving Average)", Uu = "EMA(Exponential Moving Average)", zu = "SMA", Vu = "BOLL(Bolinger Bands)", Ku = "BBI(Bull And Bearlndex)", Ru = "SAR(Stop and Reverse)", ju = "VOL(Volume)", Qu = "MACD(Moving Average Convergence / Divergence)", Zu = "KDJ(KDJ Index)", Hu = "RSI(Relative Strength Index)", Wu = "BIAS(Bias Ratio)", qu = "BRAR(情绪指标)", Yu = "CCI(Commodity Channel Index)", Gu = "DMI(Directional Movement Index)", Xu = "CR(能量指标)", Ju = "PSY(Psychological Line)", ed = "DMA(Different of Moving Average)", td = "TRIX(Triple Exponentially Smoothed Moving Average)", nd = "OBV(On Balance Volume)", rd = "VR(Volatility Volume Ratio)", od = "WR(Williams %R)", id = "MTM(Momentum Index)", ad = "EMV(Ease of Movement Value)", sd = "ROC(Price Rate of Change)", ld = "PVT(Price and Volume Trend)", cd = "AO(Awesome Oscillator)", ud = "UTC", dd = "(UTC-10) Honolulu", hd = "(UTC-8) Juneau", fd = "(UTC-7) Los Angeles", gd = "(UTC-5) Chicago", md = "(UTC-4) Toronto", yd = "(UTC-3) Sao Paulo", Cd = "(UTC+1) London", pd = "(UTC+2) Berlin", vd = "(UTC+3) Bahrain", bd = "(UTC+4) Dubai", $d = "(UTC+5) Ashkhabad", _d = "(UTC+6) Almaty", kd = "(UTC+7) Bangkok", xd = "(UTC+8) Shanghai", Ld = "(UTC+9) Tokyo", wd = "(UTC+10) Sydney", Ad = "(UTC+12) Norfolk", Td = "Horizontal Line", Md = "Horizontal Ray", Sd = "Horizontal Segment", Pd = "Vertical Line", Dd = "Vertical Ray", Od = "Vertical Segment", Nd = "Trend Line", Id = "Ray", Bd = "Segment", Ed = "Arrow", Fd = "Price Line", Ud = "Price Channel Line", zd = "Parallel Line", Vd = "Fibonacci Line", Kd = "Fibonacci Segment", Rd = "Fibonacci Circle", jd = "Fibonacci Spiral", Qd = "Fibonacci Sector", Zd = "Fibonacci Extension", Hd = "Gann Box", Wd = "Rect", qd = "Parallelogram", Yd = "Circle", Gd = "Triangle", Xd = "Three Waves", Jd = "Five Waves", eh = "Eight Waves", th = "Any Waves", nh = "ABCD Pattern", rh = "XABCD Pattern", oh = "Weak Magnet", ih = "Strong Magnet", ah = "Symbol Search", sh = "Symbol Code", lh = "Parameter 1", ch = "Parameter 2", uh = "Parameter 3", dh = "Parameter 4", hh = "Parameter 5", fh = "Period", gh = "Standard Deviation", mh = "Candle Type", yh = "Candle Solid", Ch = "Candle Stroke", ph = "Candle Up Stroke", vh = "Candle Down Stroke", bh = "OHLC", $h = "Area", _h = "Show Last Price", kh = "Show Highest Price", xh = "Show Lowest Price", Lh = "Show indicator's last value", wh = "Price Axis Type", Ah = "Normal", Th = "Percentage", Mh = "Log", Sh = "Reverse Coordinate", Ph = "Show Grids", Dh = "Restore Defaults", Oh = {
  indicator: wu,
  more: Au,
  main_indicator: Tu,
  sub_indicator: Mu,
  setting: Su,
  timezone: Pu,
  screenshot: Du,
  full_screen: Ou,
  exit_full_screen: Nu,
  save: Iu,
  confirm: Bu,
  cancel: Eu,
  ma: Fu,
  ema: Uu,
  sma: zu,
  boll: Vu,
  bbi: Ku,
  sar: Ru,
  vol: ju,
  macd: Qu,
  kdj: Zu,
  rsi: Hu,
  bias: Wu,
  brar: qu,
  cci: Yu,
  dmi: Gu,
  cr: Xu,
  psy: Ju,
  dma: ed,
  trix: td,
  obv: nd,
  vr: rd,
  wr: od,
  mtm: id,
  emv: ad,
  roc: sd,
  pvt: ld,
  ao: cd,
  utc: ud,
  honolulu: dd,
  juneau: hd,
  los_angeles: fd,
  chicago: gd,
  toronto: md,
  sao_paulo: yd,
  london: Cd,
  berlin: pd,
  bahrain: vd,
  dubai: bd,
  ashkhabad: $d,
  almaty: _d,
  bangkok: kd,
  shanghai: xd,
  tokyo: Ld,
  sydney: wd,
  norfolk: Ad,
  horizontal_straight_line: Td,
  horizontal_ray_line: Md,
  horizontal_segment: Sd,
  vertical_straight_line: Pd,
  vertical_ray_line: Dd,
  vertical_segment: Od,
  straight_line: Nd,
  ray_line: Id,
  segment: Bd,
  arrow: Ed,
  price_line: Fd,
  price_channel_line: Ud,
  parallel_straight_line: zd,
  fibonacci_line: Vd,
  fibonacci_segment: Kd,
  fibonacci_circle: Rd,
  fibonacci_spiral: jd,
  fibonacci_speed_resistance_fan: Qd,
  fibonacci_extension: Zd,
  gann_box: Hd,
  rect: Wd,
  parallelogram: qd,
  circle: Yd,
  triangle: Gd,
  three_waves: Xd,
  five_waves: Jd,
  eight_waves: eh,
  any_waves: th,
  abcd: nh,
  xabcd: rh,
  weak_magnet: oh,
  strong_magnet: ih,
  symbol_search: ah,
  symbol_code: sh,
  params_1: lh,
  params_2: ch,
  params_3: uh,
  params_4: dh,
  params_5: hh,
  period: fh,
  standard_deviation: gh,
  candle_type: mh,
  candle_solid: yh,
  candle_stroke: Ch,
  candle_up_stroke: ph,
  candle_down_stroke: vh,
  ohlc: bh,
  area: $h,
  last_price_show: _h,
  high_price_show: kh,
  low_price_show: xh,
  indicator_last_value_show: Lh,
  price_axis_type: wh,
  normal: Ah,
  percentage: Th,
  log: Mh,
  reverse_coordinate: Sh,
  grid_show: Ph,
  restore_default: Dh
}, Jo = {
  "zh-CN": Lu,
  "en-US": Oh
};
function iy(e, t) {
  Jo[e] = t;
}
const u = (e, t) => {
  var r;
  return ((r = Jo[t]) == null ? void 0 : r[e]) ?? e;
}, Nh = /* @__PURE__ */ p('<div class="scroll-indicator left"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg></div>'), Ih = /* @__PURE__ */ p('<img alt="symbol">'), Bh = /* @__PURE__ */ p('<div class="symbol"><span></span></div>'), Eh = /* @__PURE__ */ p('<span class="down-arrow-icon mobile-separate-arrow"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></span>'), Fh = /* @__PURE__ */ p('<span class="mobile-more-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg></span>'), Uh = /* @__PURE__ */ p('<div class="item tools" title="Time Tools"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M16 3v4"></path><path d="M8 3v4"></path><path d="M3 10h18"></path><path d="M12 14v4"></path><path d="M10 16h4"></path></svg></div>'), zh = /* @__PURE__ */ p('<div class="item tools"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div>'), Vh = /* @__PURE__ */ p('<div class="klinecharts-pro-order-tools-display-menu"></div>'), Kh = /* @__PURE__ */ p('<div class="klinecharts-pro-order-tools-popover"><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Quick Order</span></span><span class="klinecharts-pro-order-tools-chevron">›</span></button><div class="klinecharts-pro-order-tools-submenu"><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Floating Window</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Plus Button</span></label></div></div><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Open Orders</span></span><span class="klinecharts-pro-order-tools-chevron">&rsaquo;</span></button><div class="klinecharts-pro-order-tools-submenu"><div class="klinecharts-pro-order-tools-setting-row"><span class="klinecharts-pro-order-tools-label">Extended Price Line</span><button type="button"><span></span></button></div><div class="klinecharts-pro-order-tools-setting-row"><span class="klinecharts-pro-order-tools-label">Display</span><div class="klinecharts-pro-order-tools-display"><button type="button" class="klinecharts-pro-order-tools-display-button"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4"></path></svg></button></div></div></div></div><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Positions</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Breakeven Price</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Liquidation Price</span></label><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Price Line</span></span><span class="klinecharts-pro-order-tools-chevron">&rsaquo;</span></button><div class="klinecharts-pro-order-tools-submenu"><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Market Price Line</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Count Down</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Bid & Ask Price</span></label></div></div><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Order Preview Line</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Order History</span></label></div>'), Rh = /* @__PURE__ */ p('<div><div class="item tools order-tools-trigger"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Orders"><path d="M4 7h10"></path><path d="M4 12h8"></path><path d="M4 17h6"></path><path d="M18 6v12"></path><path d="M15 15l3 3 3-3"></path></svg><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></div></div>'), jh = /* @__PURE__ */ p('<div class="item tools"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path><path d="M15.22299772857666,9.722223632261718C12.59389772857666,9.722223632261718,10.44600772857666,12.020201374511718,10.44600772857666,14.861111374511719C10.44600772857666,17.70202137451172,12.58215772857666,20.000021374511718,15.223007728576661,20.000021374511718C17.86384772857666,20.000021374511718,19.99999772857666,17.70202137451172,19.99999772857666,14.861111374511719C19.99999772857666,12.020201374511718,17.85211772857666,9.72222212709572,15.22299772857666,9.722223632261718ZM15.22299772857666,18.598491374511717C13.30985772857666,18.598491374511717,11.737087728576661,16.91919137451172,11.737087728576661,14.848481374511719C11.737087728576661,12.777781374511719,13.29811772857666,11.098491374511719,15.22299772857666,11.098491374511719C17.14787772857666,11.098491374511719,18.708917728576658,12.777781374511719,18.708917728576658,14.848481374511719C18.708917728576658,16.91919137451172,17.13614772857666,18.59848137451172,15.22299772857666,18.598491374511717Z"></path><path d="M15.692486288146974,15.050496970825195L15.692486288146974,12.676760970825196C15.692486288146974,12.297972970825196,15.399058288146973,11.982316970825195,15.046945288146972,11.982316970825195C14.694833288146972,11.982316970825195,14.401406288146973,12.297972970825196,14.401406288146973,12.676760970825196L14.401406288146973,15.340896970825195C14.401406288146973,15.530296970825194,14.471829288146973,15.694436970825196,14.589200288146973,15.833326970825196L15.751176288146972,17.095956970825195C15.868546288146973,17.222216970825194,16.032866288146973,17.297976970825196,16.208916288146973,17.297976970825196C16.384976288146973,17.297976970825196,16.537556288146973,17.222216970825194,16.666666288146974,17.095956970825195C16.78403628814697,16.969686970825194,16.854456288146974,16.792916970825196,16.854456288146974,16.603526970825193C16.854456288146974,16.414136970825197,16.78403628814697,16.237366970825196,16.666666288146974,16.111106970825197L15.692486288146974,15.050496970825195Z"></path></svg></div>'), Qh = /* @__PURE__ */ p('<div class="item tools"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg></div>'), Zh = /* @__PURE__ */ p('<div class="item tools"><svg viewBox="0 0 20 20"><path d="M6.50977,1L13.4902,1C13.6406,1,13.7695,1.1104910000000001,13.7969,1.2631700000000001L14.0273,2.52277C14.1387,3.13147,14.6543,3.57143,15.2559,3.57143L17.5,3.57143C18.8809,3.57143,20,4.72254,20,6.14286L20,16.4286C20,17.8489,18.8809,19,17.5,19L2.5,19C1.11914,19,0,17.8489,0,16.4286L0,6.14286C0,4.72254,1.11914,3.57143,2.5,3.57143L4.74414,3.57143C5.3457,3.57143,5.86133,3.13147,5.97266,2.52277L6.20312,1.2631700000000001C6.23047,1.1104910000000001,6.35937,1,6.50977,1ZM15.2559,4.857139999999999C14.0547,4.857139999999999,13.0215,3.97522,12.7988,2.75982L12.7129,2.28571L7.28711,2.28571L7.20117,2.75982C6.98047,3.97522,5.94727,4.857139999999999,4.74414,4.857139999999999L2.5,4.857139999999999C1.81055,4.857139999999999,1.25,5.43371,1.25,6.14286L1.25,16.4286C1.25,17.1377,1.81055,17.7143,2.5,17.7143L17.5,17.7143C18.1895,17.7143,18.75,17.1377,18.75,16.4286L18.75,6.14286C18.75,5.43371,18.1895,4.857139999999999,17.5,4.857139999999999L15.2559,4.857139999999999ZM4.375,6.78571L3.125,6.78571C2.7793,6.78571,2.5,6.49844,2.5,6.14286C2.5,5.78728,2.7793,5.5,3.125,5.5L4.375,5.5C4.7207,5.5,5,5.78728,5,6.14286C5,6.49844,4.7207,6.78571,4.375,6.78571ZM10,6.14286C7.06641,6.14286,4.6875,8.58973,4.6875,11.6071C4.6875,14.6246,7.06641,17.0714,10,17.0714C12.9336,17.0714,15.3125,14.6246,15.3125,11.6071C15.3125,8.58973,12.9336,6.14286,10,6.14286ZM10,7.42857C11.0859,7.42857,12.1055,7.8625,12.873,8.65201C13.6406,9.44152,14.0625,10.49018,14.0625,11.6071C14.0625,12.7241,13.6406,13.7728,12.873,14.5623C12.1055,15.3518,11.0859,15.7857,10,15.7857C8.91406,15.7857,7.89453,15.3518,7.12695,14.5623C6.35937,13.7728,5.9375,12.7241,5.9375,11.6071C5.9375,10.49018,6.35938,9.44152,7.12695,8.65201C7.89453,7.8625,8.91406,7.42857,10,7.42857ZM10,9.67857C8.96484,9.67857,8.125,10.54241,8.125,11.6071C8.125,12.6719,8.96484,13.5357,10,13.5357C11.0352,13.5357,11.875,12.6719,11.875,11.6071C11.875,10.54241,11.0352,9.67857,10,9.67857ZM10,10.96429C10.3438,10.96429,10.625,11.2536,10.625,11.6071C10.625,11.9607,10.3438,12.25,10,12.25C9.65625,12.25,9.375,11.9607,9.375,11.6071C9.375,11.2536,9.65625,10.96429,10,10.96429Z"></path></svg></div>'), Hh = /* @__PURE__ */ p('<div class="item tools chart-view-toggle"></div>'), Wh = /* @__PURE__ */ p('<div class="scroll-indicator right"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"></path></svg></div>'), qh = /* @__PURE__ */ p('<div><div class="klinecharts-pro-period-bar"><div class="menu-container"><svg viewBox="0 0 1024 1024"><path d="M192.037 287.953h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 479.169H438.553c-17.673 0-32 14.327-32 32s14.327 32 32 32h393.608c17.673 0 32-14.327 32-32s-14.327-32-32-32zM832.161 735.802H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32zM319.028 351.594l-160 160 160 160z"></path></svg></div><div><div class="item tools fullscreen-toggle"></div></div></div></div>'), Yh = /* @__PURE__ */ p("<span></span>"), Gh = /* @__PURE__ */ p('<button type="button"></button>'), Xh = /* @__PURE__ */ p('<svg viewBox="0 0 20 20"><path d="M1.08108,0L0,1.079L4.18919,5.27938L2.54826,6.91715L6.9112,6.91715L6.9112,2.56262L5.28957,4.18112L1.08108,0ZM15.8108,5.27938L20,1.079L18.9189,0L14.7104,4.18112L13.0888,2.56262L13.0888,6.91715L17.4517,6.91715L15.8108,5.27938ZM4.16988,14.7014L0.07722,18.8054L1.1583,20L5.27027,15.7996L6.9112,17.4374L6.9112,13.0829L2.54826,13.0829L4.16988,14.7014ZM17.4517,13.0829L13.0888,13.0829L13.0888,17.4374L14.7297,15.7996L18.8417,20L19.9228,18.8054L15.8301,14.7013L17.4517,13.0829Z"></path></svg>'), Jh = /* @__PURE__ */ p('<svg viewBox="0 0 20 20"><path d="M2.93444,1.76899L7.57544,6.40999L6.38918,7.59626L1.76899,2.93444L0,4.70343L0,0L4.70343,0L2.93444,1.76899ZM6.40999,12.4037L1.76899,17.0447L0,15.2758L0,19.9792L4.70343,19.9792L2.93444,18.2102L7.57544,13.5692L6.40999,12.4037ZM15.2758,0L17.0447,1.76899L12.4037,6.40999L13.59,7.59626L18.231,2.95526L20,4.72425L20,0L15.2758,0ZM13.5692,12.4037L12.3829,13.59L17.0239,18.231L15.2549,20L19.9792,20L19.9792,15.2758L18.2102,17.0447L13.5692,12.4037Z"></path></svg>'), ef = /* @__PURE__ */ p('<svg viewBox="0 0 24 24"><path d="M3 20V7l4 3 5-7 5 4h4v13H3Zm5-3 4-5.5 7 5.45V9h-2.7l-3.9-3.1-4.95 6.95L5 10.4V14l3 3Z"></path></svg>'), tf = /* @__PURE__ */ p('<svg viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M9 4H7v2H5v12h2v2h2v-2h2V6H9zM19 8h-2V4h-2v4h-2v7h2v5h2v-5h2z"></path></svg>'), ro = (e) => e.charAt(0).toUpperCase() + e.slice(1), nf = (e) => {
  let t, r, n;
  const [a, s] = M(window.innerWidth < 768), [d, h] = M(localStorage.getItem("klinechart_secondary_period") || ""), [b, x] = M(!1), [v, w] = M(!1), [B, N] = M(!1), [oe, V] = M(!1), [R, U] = M(!1), [he, Z] = M({
    top: 0,
    left: 0,
    minWidth: 220
  }), X = () => {
    s(window.innerWidth < 768), requestAnimationFrame(E), b() && Q();
  }, [J, ve] = M(!1), W = () => document.fullscreenElement ?? document.body, H = () => {
    ve(!!document.fullscreenElement);
  }, [ee, se] = M(!1), [T, j] = M(!1), Q = () => {
    if (!r)
      return;
    const I = r.getBoundingClientRect(), F = Math.max(220, Math.ceil(I.width)), ye = window.innerWidth, Te = Math.min(Math.max(8, I.right - F), Math.max(8, ye - F - 8));
    Z({
      top: Math.ceil(I.bottom + 8),
      left: Math.ceil(Te),
      minWidth: F
    });
  }, z = () => {
    w(!1), N(!1), V(!1), U(!1);
  }, le = () => {
    x((I) => {
      const F = !I;
      return F ? queueMicrotask(Q) : z(), F;
    });
  }, ce = (I) => {
    if (!b())
      return;
    const F = I.target;
    F && (r != null && r.contains(F) || n != null && n.contains(F) || (z(), x(!1)));
  }, re = () => {
    b() && Q();
  }, E = () => {
    if (!t) {
      se(!1), j(!1);
      return;
    }
    const I = t, F = I.scrollWidth > I.clientWidth + 2;
    se(F && I.scrollLeft > 2), j(F && I.scrollLeft + I.clientWidth < I.scrollWidth - 2);
  };
  nr(() => {
    window.addEventListener("resize", X), document.addEventListener("fullscreenchange", H), document.addEventListener("mousedown", ce), window.addEventListener("scroll", re, !0), document.addEventListener("mozfullscreenchange", H), document.addEventListener("webkitfullscreenchange", H), document.addEventListener("msfullscreenchange", H), t && (t.addEventListener("scroll", E), setTimeout(E, 100));
  }), xt(() => {
    window.removeEventListener("resize", X), document.removeEventListener("fullscreenchange", H), document.removeEventListener("mousedown", ce), window.removeEventListener("scroll", re, !0), document.removeEventListener("mozfullscreenchange", H), document.removeEventListener("webkitfullscreenchange", H), document.removeEventListener("msfullscreenchange", H), t && t.removeEventListener("scroll", E);
  });
  const te = q(() => {
    const I = e.periods.filter((F) => {
      if (!a() || J())
        return !0;
      const ye = e.period.text, Te = d();
      if (F.text === ye || Te && F.text === Te)
        return !0;
      if (!Te || Te === ye) {
        const Ce = e.periods.find((Ue) => Ue.text !== ye);
        return F.text === (Ce == null ? void 0 : Ce.text);
      }
      return !1;
    }).slice(0, a() && !J() ? 2 : e.periods.length);
    return setTimeout(E, 50), I;
  });
  let P = e.period.text;
  return Ze(() => {
    const I = e.period.text;
    I !== P && (a() && (h(P), localStorage.setItem("klinechart_secondary_period", P)), P = I), setTimeout(E, 50);
  }), Ze(() => {
    J(), setTimeout(E, 100);
  }), Ze(() => {
    if (!e.showOrderToolsMenu) {
      x(!1);
      return;
    }
    b() && queueMicrotask(Q);
  }), (() => {
    const I = qh.cloneNode(!0), F = I.firstChild, ye = F.firstChild, Te = ye.firstChild, Ce = ye.nextSibling, Ue = Ce.firstChild;
    return I.style.setProperty("position", "relative"), I.style.setProperty("width", "100%"), I.style.setProperty("display", "flex"), I.style.setProperty("align-items", "center"), C(I, A(de, {
      get when() {
        return ee();
      },
      get children() {
        const k = Nh.cloneNode(!0);
        return k.$$click = () => t.scrollBy({
          left: -100,
          behavior: "smooth"
        }), k.style.setProperty("position", "absolute"), k.style.setProperty("left", "0"), k.style.setProperty("top", "0"), k.style.setProperty("bottom", "1px"), k.style.setProperty("width", "30px"), k.style.setProperty("display", "flex"), k.style.setProperty("align-items", "center"), k.style.setProperty("justify-content", "center"), k.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), k.style.setProperty("z-index", "10"), k.style.setProperty("cursor", "pointer"), k.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), k;
      }
    }), F), kt((k) => {
      t = k;
    }, F), F.style.setProperty("width", "100%"), F.style.setProperty("overflow", "auto"), ut(Te, "click", e.onMenuClick, !0), C(F, A(de, {
      get when() {
        return e.symbol;
      },
      get children() {
        const k = Bh.cloneNode(!0), pe = k.firstChild;
        return ut(k, "click", e.onSymbolClick, !0), C(k, A(de, {
          get when() {
            return e.symbol.logo;
          },
          get children() {
            const Me = Ih.cloneNode(!0);
            return K(() => Ee(Me, "src", e.symbol.logo)), Me;
          }
        }), pe), C(pe, () => e.symbol.shortName ?? e.symbol.name ?? e.symbol.ticker), k;
      }
    }), Ce), C(F, () => te().map((k, pe) => {
      const Me = k.text === e.period.text;
      return (() => {
        const ft = Yh.cloneNode(!0);
        return ft.$$click = (Ae) => {
          a() && Me && !J() ? (e.onMobilePeriodClick ? e.onMobilePeriodClick(k) : e.onMenuClick(), Ae.stopPropagation()) : e.onPeriodChange(k);
        }, ge(ft, `item period ${Me ? "selected" : ""}`), C(ft, () => k.text), ft;
      })();
    }), Ce), C(F, A(de, {
      get when() {
        return q(() => !!(a() && !J()))() && te().length > 1;
      },
      get children() {
        const k = Eh.cloneNode(!0);
        return k.$$click = (pe) => {
          pe.stopPropagation(), e.onMobilePeriodClick ? e.onMobilePeriodClick(e.period) : e.onMenuClick();
        }, k.style.setProperty("margin-left", "4px"), k.style.setProperty("display", "inline-flex"), k.style.setProperty("align-items", "center"), k;
      }
    }), Ce), C(F, A(de, {
      get when() {
        return q(() => !!a())() && !J();
      },
      get children() {
        const k = Fh.cloneNode(!0);
        return k.$$click = (pe) => {
          var Me;
          pe.stopPropagation(), (Me = e.onMobileMoreClick) == null || Me.call(e);
        }, k.style.setProperty("margin-left", "8px"), k.style.setProperty("display", "inline-flex"), k.style.setProperty("align-items", "center"), k.style.setProperty("cursor", "pointer"), k.style.setProperty("padding", "0 4px"), k;
      }
    }), Ce), C(F, A(de, {
      get when() {
        return !a();
      },
      get children() {
        const k = Uh.cloneNode(!0);
        return ut(k, "click", e.onTimeToolsClick, !0), k;
      }
    }), Ce), C(F, A(de, {
      get when() {
        return !a();
      },
      get children() {
        const k = zh.cloneNode(!0), pe = k.firstChild, Me = pe.nextSibling;
        return ut(k, "click", e.onIndicatorClick, !0), C(Me, () => u("indicator", e.locale)), k;
      }
    }), Ce), Ce.style.setProperty("display", "flex"), Ce.style.setProperty("gap", "4px"), Ce.style.setProperty("margin-left", "auto"), Ce.style.setProperty("align-items", "center"), Ce.style.setProperty("flex", "0 0 auto"), C(Ce, A(de, {
      get when() {
        return e.showOrderToolsMenu;
      },
      get children() {
        const k = Rh.cloneNode(!0), pe = k.firstChild, Me = pe.firstChild, ft = Me.nextSibling;
        return kt((Ae) => {
          r = Ae;
        }, k), k.style.setProperty("display", "flex"), k.style.setProperty("align-items", "center"), pe.$$click = (Ae) => {
          Ae.stopPropagation(), le();
        }, pe.style.setProperty("gap", "6px"), ft.style.setProperty("transition", "transform 0.2s ease"), C(k, A(de, {
          get when() {
            return b();
          },
          get children() {
            return A(mi, {
              get mount() {
                return W();
              },
              get children() {
                const Ae = Kh.cloneNode(!0), et = Ae.firstChild, gt = et.firstChild, Bt = gt.firstChild, o1 = Bt.firstChild, i1 = o1.firstChild, L1 = gt.nextSibling, w1 = L1.firstChild, Et = w1.firstChild, A1 = Et.firstChild, T1 = w1.nextSibling, a1 = T1.firstChild, ze = a1.firstChild, s1 = et.nextSibling, pt = s1.firstChild, Ft = pt.firstChild, mt = Ft.firstChild, at = mt.firstChild, M1 = pt.nextSibling, We = M1.firstChild, S1 = We.firstChild, P1 = S1.nextSibling, Ut = We.nextSibling, At = Ut.firstChild, l1 = At.nextSibling, zt = l1.firstChild, D1 = zt.firstChild, O1 = s1.nextSibling, xn = O1.firstChild, N1 = xn.firstChild, Vt = O1.nextSibling, c1 = Vt.nextSibling, I1 = c1.firstChild, B1 = I1.firstChild, u1 = c1.nextSibling, je = u1.nextSibling, qe = je.firstChild, Ye = qe.firstChild, Qe = je.nextSibling, d1 = Qe.firstChild, h1 = d1.firstChild, Tt = h1.firstChild, f1 = Tt.firstChild, Se = d1.nextSibling, Oe = Se.firstChild, Ln = Oe.firstChild, Ge = Ln.firstChild, vt = Oe.nextSibling, bt = vt.firstChild, E1 = bt.firstChild, Mt = vt.nextSibling, wn = Mt.firstChild, st = wn.firstChild, Kt = Qe.nextSibling, An = Kt.firstChild, Rt = An.firstChild, F1 = Kt.nextSibling, g1 = F1.firstChild, U1 = g1.firstChild;
                return Ae.$$mousedown = ($) => $.stopPropagation(), kt(($) => {
                  n = $;
                }, Ae), Ae.style.setProperty("position", "fixed"), Ae.style.setProperty("z-index", "9999"), gt.$$click = ($) => {
                  $.preventDefault(), $.stopPropagation(), w((D) => !D);
                }, o1.$$mousedown = ($) => $.stopPropagation(), o1.$$click = ($) => $.stopPropagation(), i1.addEventListener("change", ($) => {
                  var D;
                  $.stopPropagation(), w(!0), (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    quickOrder: $.currentTarget.checked
                  });
                }), A1.addEventListener("change", ($) => {
                  var D;
                  (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    quickOrderFloatingWindow: $.currentTarget.checked
                  });
                }), ze.addEventListener("change", ($) => {
                  var D;
                  (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    quickOrderPlusButton: $.currentTarget.checked
                  });
                }), pt.$$click = ($) => {
                  $.preventDefault(), $.stopPropagation(), N((D) => !D), V(!1);
                }, mt.$$mousedown = ($) => $.stopPropagation(), mt.$$click = ($) => $.stopPropagation(), at.addEventListener("change", ($) => {
                  var D;
                  $.stopPropagation(), N(!0), (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    openOrders: $.currentTarget.checked
                  });
                }), P1.$$click = ($) => {
                  var D, be;
                  $.preventDefault(), $.stopPropagation(), (be = e.onOrderToolsStateChange) == null || be.call(e, {
                    openOrdersExtendedPriceLine: !(((D = e.orderToolsState) == null ? void 0 : D.openOrdersExtendedPriceLine) ?? !0)
                  });
                }, zt.$$click = ($) => {
                  $.preventDefault(), $.stopPropagation(), V((D) => !D);
                }, C(zt, () => {
                  var $;
                  return ro((($ = e.orderToolsState) == null ? void 0 : $.openOrdersDisplay) ?? "right");
                }, D1), C(l1, A(de, {
                  get when() {
                    return oe();
                  },
                  get children() {
                    const $ = Vh.cloneNode(!0);
                    return C($, () => ["left", "center", "right"].map((D) => (() => {
                      const be = Gh.cloneNode(!0);
                      return be.$$click = (Ve) => {
                        var tt;
                        Ve.preventDefault(), Ve.stopPropagation(), (tt = e.onOrderToolsStateChange) == null || tt.call(e, {
                          openOrdersDisplay: D
                        }), V(!1);
                      }, C(be, () => ro(D)), K(() => {
                        var Ve;
                        return ge(be, (((Ve = e.orderToolsState) == null ? void 0 : Ve.openOrdersDisplay) ?? "right") === D ? "selected" : "");
                      }), be;
                    })())), $;
                  }
                }), null), N1.addEventListener("change", ($) => {
                  var D;
                  (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    positions: $.currentTarget.checked
                  });
                }), B1.addEventListener("change", ($) => {
                  var D;
                  (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    breakevenPrice: $.currentTarget.checked
                  });
                }), Ye.addEventListener("change", ($) => {
                  var D;
                  (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    liquidationPrice: $.currentTarget.checked
                  });
                }), d1.$$click = ($) => {
                  $.preventDefault(), $.stopPropagation(), U((D) => !D);
                }, Tt.$$mousedown = ($) => $.stopPropagation(), Tt.$$click = ($) => $.stopPropagation(), f1.addEventListener("change", ($) => {
                  var D;
                  $.stopPropagation(), U(!0), (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    priceLine: $.currentTarget.checked
                  });
                }), Ge.addEventListener("change", ($) => {
                  var D;
                  (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    marketPriceLine: $.currentTarget.checked
                  });
                }), E1.addEventListener("change", ($) => {
                  var D;
                  (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    countDown: $.currentTarget.checked
                  });
                }), st.addEventListener("change", ($) => {
                  var D;
                  (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    bidAskPrice: $.currentTarget.checked
                  });
                }), Rt.addEventListener("change", ($) => {
                  var D;
                  (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    orderPreviewLine: $.currentTarget.checked
                  });
                }), U1.addEventListener("change", ($) => {
                  var D;
                  (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    orderHistory: $.currentTarget.checked
                  });
                }), K(($) => {
                  var K1;
                  const D = `${he().top}px`, be = `${he().left}px`, Ve = `${he().minWidth}px`, tt = `klinecharts-pro-order-tools-group${v() ? " klinecharts-pro-order-tools-group-open" : ""}`, Xe = `klinecharts-pro-order-tools-group${B() ? " klinecharts-pro-order-tools-group-open" : ""}`, jt = `klinecharts-pro-order-tools-switch${((K1 = e.orderToolsState) == null ? void 0 : K1.openOrdersExtendedPriceLine) ?? !0 ? " klinecharts-pro-order-tools-switch-on" : ""}`, z1 = `klinecharts-pro-order-tools-display-arrow${oe() ? " klinecharts-pro-order-tools-display-arrow-open" : ""}`, V1 = `klinecharts-pro-order-tools-group${R() ? " klinecharts-pro-order-tools-group-open" : ""}`;
                  return D !== $._v$ && Ae.style.setProperty("top", $._v$ = D), be !== $._v$2 && Ae.style.setProperty("left", $._v$2 = be), Ve !== $._v$3 && Ae.style.setProperty("width", $._v$3 = Ve), tt !== $._v$4 && ge(et, $._v$4 = tt), Xe !== $._v$5 && ge(s1, $._v$5 = Xe), jt !== $._v$6 && ge(P1, $._v$6 = jt), z1 !== $._v$7 && Ee(D1, "class", $._v$7 = z1), V1 !== $._v$8 && ge(Qe, $._v$8 = V1), $;
                }, {
                  _v$: void 0,
                  _v$2: void 0,
                  _v$3: void 0,
                  _v$4: void 0,
                  _v$5: void 0,
                  _v$6: void 0,
                  _v$7: void 0,
                  _v$8: void 0
                }), K(() => {
                  var $, D, be, Ve;
                  return i1.checked = ((($ = e.orderToolsState) == null ? void 0 : $.quickOrderFloatingWindow) ?? ((D = e.orderToolsState) == null ? void 0 : D.quickOrder) ?? !0) || (((be = e.orderToolsState) == null ? void 0 : be.quickOrderPlusButton) ?? ((Ve = e.orderToolsState) == null ? void 0 : Ve.quickOrder) ?? !0);
                }), K(() => {
                  var $, D;
                  return A1.checked = (($ = e.orderToolsState) == null ? void 0 : $.quickOrderFloatingWindow) ?? ((D = e.orderToolsState) == null ? void 0 : D.quickOrder) ?? !0;
                }), K(() => {
                  var $, D;
                  return ze.checked = (($ = e.orderToolsState) == null ? void 0 : $.quickOrderPlusButton) ?? ((D = e.orderToolsState) == null ? void 0 : D.quickOrder) ?? !0;
                }), K(() => {
                  var $;
                  return at.checked = (($ = e.orderToolsState) == null ? void 0 : $.openOrders) ?? !0;
                }), K(() => {
                  var $;
                  return N1.checked = (($ = e.orderToolsState) == null ? void 0 : $.positions) ?? !0;
                }), K(() => {
                  var $;
                  return B1.checked = (($ = e.orderToolsState) == null ? void 0 : $.breakevenPrice) ?? !0;
                }), K(() => {
                  var $;
                  return Ye.checked = (($ = e.orderToolsState) == null ? void 0 : $.liquidationPrice) ?? !0;
                }), K(() => {
                  var $, D, be, Ve, tt, Xe;
                  return f1.checked = ((($ = e.orderToolsState) == null ? void 0 : $.marketPriceLine) ?? ((D = e.orderToolsState) == null ? void 0 : D.priceLine) ?? !0) || (((be = e.orderToolsState) == null ? void 0 : be.countDown) ?? ((Ve = e.orderToolsState) == null ? void 0 : Ve.priceLine) ?? !0) || (((tt = e.orderToolsState) == null ? void 0 : tt.bidAskPrice) ?? ((Xe = e.orderToolsState) == null ? void 0 : Xe.priceLine) ?? !0);
                }), K(() => {
                  var $, D;
                  return Ge.checked = (($ = e.orderToolsState) == null ? void 0 : $.marketPriceLine) ?? ((D = e.orderToolsState) == null ? void 0 : D.priceLine) ?? !0;
                }), K(() => {
                  var $, D;
                  return E1.checked = (($ = e.orderToolsState) == null ? void 0 : $.countDown) ?? ((D = e.orderToolsState) == null ? void 0 : D.priceLine) ?? !0;
                }), K(() => {
                  var $, D;
                  return st.checked = (($ = e.orderToolsState) == null ? void 0 : $.bidAskPrice) ?? ((D = e.orderToolsState) == null ? void 0 : D.priceLine) ?? !0;
                }), K(() => {
                  var $;
                  return Rt.checked = (($ = e.orderToolsState) == null ? void 0 : $.orderPreviewLine) ?? !0;
                }), K(() => {
                  var $;
                  return U1.checked = (($ = e.orderToolsState) == null ? void 0 : $.orderHistory) ?? !0;
                }), Ae;
              }
            });
          }
        }), null), K((Ae) => {
          const et = a() ? "0 8px" : "0 10px", gt = b() ? "rotate(180deg)" : "rotate(0deg)";
          return et !== Ae._v$9 && pe.style.setProperty("padding", Ae._v$9 = et), gt !== Ae._v$10 && ft.style.setProperty("transform", Ae._v$10 = gt), Ae;
        }, {
          _v$9: void 0,
          _v$10: void 0
        }), k;
      }
    }), Ue), C(Ce, A(de, {
      get when() {
        return !a();
      },
      get children() {
        return [(() => {
          const k = jh.cloneNode(!0);
          return ut(k, "click", e.onTimezoneClick, !0), k;
        })(), (() => {
          const k = Qh.cloneNode(!0);
          return ut(k, "click", e.onSettingClick, !0), k;
        })()];
      }
    }), Ue), C(Ce, A(de, {
      get when() {
        return !a();
      },
      get children() {
        const k = Zh.cloneNode(!0);
        return ut(k, "click", e.onScreenshotClick, !0), k;
      }
    }), Ue), Ue.$$click = () => {
      if (J())
        (document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen).call(document);
      else {
        const k = t == null ? void 0 : t.closest(".klinecharts-pro");
        k && ((k == null ? void 0 : k.requestFullscreen) ?? (k == null ? void 0 : k.webkitRequestFullscreen) ?? (k == null ? void 0 : k.mozRequestFullScreen) ?? (k == null ? void 0 : k.msRequestFullscreen)).call(k);
      }
    }, C(Ue, (() => {
      const k = q(() => !!J());
      return () => k() ? Xh.cloneNode(!0) : Jh.cloneNode(!0);
    })()), C(Ce, A(de, {
      get when() {
        return q(() => !!e.chartViewToggle)() && !J();
      },
      get children() {
        const k = Hh.cloneNode(!0);
        return ut(k, "click", e.chartViewToggle.onToggle, !0), C(k, (() => {
          const pe = q(() => e.chartViewToggle.view === "chart");
          return () => pe() ? ef.cloneNode(!0) : tf.cloneNode(!0);
        })()), K(() => Ee(k, "title", e.chartViewToggle.view === "chart" ? "View Depth" : "View Chart")), k;
      }
    }), null), C(I, A(de, {
      get when() {
        return T();
      },
      get children() {
        const k = Wh.cloneNode(!0);
        return k.$$click = () => t.scrollBy({
          left: 100,
          behavior: "smooth"
        }), k.style.setProperty("position", "absolute"), k.style.setProperty("right", "0"), k.style.setProperty("top", "0"), k.style.setProperty("bottom", "1px"), k.style.setProperty("width", "30px"), k.style.setProperty("display", "flex"), k.style.setProperty("align-items", "center"), k.style.setProperty("justify-content", "center"), k.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), k.style.setProperty("z-index", "10"), k.style.setProperty("cursor", "pointer"), k.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), k;
      }
    }), null), K((k) => {
      const pe = e.spread ? "" : "rotate", Me = J() ? "0px" : "var(--klinecharts-pro-period-bar-padding-right)";
      return pe !== k._v$11 && Ee(Te, "class", k._v$11 = pe), Me !== k._v$12 && Ce.style.setProperty("padding-right", k._v$12 = Me), k;
    }, {
      _v$11: void 0,
      _v$12: void 0
    }), I;
  })();
};
He(["click", "mousedown"]);
const rf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M12.41465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L12.41465,12C12.20873,12.5826,11.65311,13,11,13C10.34689,13,9.79127,12.5826,9.58535,12L3.5,12C3.223857,12,3,11.77614,3,11.5C3,11.22386,3.223857,11,3.5,11L9.58535,11C9.79127,10.417404,10.34689,10,11,10C11.65311,10,12.20873,10.417404,12.41465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), of = () => rf.cloneNode(!0), af = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,11L11.08535,11C11.29127,10.417404,11.84689,10,12.5,10C13.15311,10,13.70873,10.417404,13.91465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L13.91465,12C13.70873,12.5826,13.15311,13,12.5,13C11.84689,13,11.29127,12.5826,11.08535,12L6.91465,12C6.70873,12.5826,6.15311,13,5.5,13C4.671573,13,4,12.32843,4,11.5C4,10.671573,4.671573,10,5.5,10C6.15311,10,6.70873,10.417404,6.91465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), sf = () => af.cloneNode(!0), lf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,12.5C6.70873,13.0826,6.15311,13.5,5.5,13.5C4.671573,13.5,4,12.82843,4,12C4,11.171573,4.671573,10.5,5.5,10.5C6.15311,10.5,6.70873,10.917404,6.91465,11.5L16.0853,11.5C16.2913,10.917404,16.846899999999998,10.5,17.5,10.5C18.328400000000002,10.5,19,11.171573,19,12C19,12.82843,18.328400000000002,13.5,17.5,13.5C16.846899999999998,13.5,16.2913,13.0826,16.0853,12.5L6.91465,12.5Z" stroke-opacity="0" stroke="none"></path></svg>'), cf = () => lf.cloneNode(!0), uf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,12.41465L11,18.5C11,18.7761,11.22386,19,11.5,19C11.77614,19,12,18.7761,12,18.5L12,12.41465C12.5826,12.20873,13,11.65311,13,11C13,10.34689,12.5826,9.79127,12,9.58535L12,3.5C12,3.223857,11.77614,3,11.5,3C11.22386,3,11,3.223857,11,3.5L11,9.58535C10.417404,9.79127,10,10.34689,10,11C10,11.65311,10.417404,12.20873,11,12.41465Z" stroke-opacity="0" stroke="none"></path></svg>'), df = () => uf.cloneNode(!0), hf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.66558837890625,19C10.83716137890625,19,10.16558837890625,18.328400000000002,10.16558837890625,17.5C10.16558837890625,16.846899999999998,10.58298437890625,16.2913,11.16557337890625,16.0854L11.16557337890625,11.91464C10.58298437890625,11.70872,10.16558837890625,11.1531,10.16558837890625,10.5C10.16558837890625,9.8469,10.58298437890625,9.29128,11.16557337890625,9.08536L11.16557337890625,4.5C11.16557337890625,4.223857,11.38942837890625,4,11.66556837890625,4C11.94171837890625,4,12.16556837890625,4.223857,12.16556837890625,4.5L12.16556837890625,9.08535C12.74817837890625,9.291260000000001,13.16558837890625,9.846879999999999,13.16558837890625,10.5C13.16558837890625,11.153120000000001,12.74817837890625,11.708739999999999,12.16556837890625,11.91465L12.16556837890625,16.0854C12.74817837890625,16.2913,13.16558837890625,16.846899999999998,13.16558837890625,17.5C13.16558837890625,18.328400000000002,12.49401837890625,19,11.66558837890625,19Z" stroke-opacity="0" stroke="none"></path></svg>'), ff = () => hf.cloneNode(!0), gf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.165603637695312,6.91465C11.748203637695312,6.70873,12.165603637695312,6.15311,12.165603637695312,5.5C12.165603637695312,4.671573,11.494033637695313,4,10.665603637695312,4C9.837176637695313,4,9.165603637695312,4.671573,9.165603637695312,5.5C9.165603637695312,6.15311,9.583007637695312,6.70873,10.165603637695312,6.91465L10.165603637695312,16.0854C9.583007637695312,16.2913,9.165603637695312,16.846899999999998,9.165603637695312,17.5C9.165603637695312,18.328400000000002,9.837176637695313,19,10.665603637695312,19C11.494033637695313,19,12.165603637695312,18.328400000000002,12.165603637695312,17.5C12.165603637695312,16.846899999999998,11.748203637695312,16.2913,11.165603637695312,16.0854L11.165603637695312,6.91465Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), mf = () => gf.cloneNode(!0), yf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.146447,15.753C4.9511845,15.9483,4.9511845,16.2649,5.146447,16.4602C5.341709,16.6554,5.658291,16.6554,5.853554,16.4602L8.156600000000001,14.15711C8.352409999999999,14.25082,8.57173,14.3033,8.8033,14.3033C9.631730000000001,14.3033,10.3033,13.63172,10.3033,12.80329C10.3033,12.57172,10.250820000000001,12.352409999999999,10.157119999999999,12.15659L12.156600000000001,10.15711C12.352409999999999,10.250820000000001,12.571729999999999,10.30329,12.8033,10.30329C13.63173,10.30329,14.3033,9.63172,14.3033,8.80329C14.3033,8.57172,14.25082,8.352409999999999,14.15712,8.15659L16.4602,5.853553C16.6554,5.658291,16.6554,5.341709,16.4602,5.146447C16.2649,4.9511843,15.9483,4.9511843,15.753,5.146447L13.45001,7.449479999999999C13.25419,7.35577,13.03487,7.3032900000000005,12.8033,7.3032900000000005C11.97487,7.3032900000000005,11.3033,7.97487,11.3033,8.80329C11.3033,9.03487,11.35578,9.254190000000001,11.44949,9.450009999999999L9.450009999999999,11.449480000000001C9.254190000000001,11.35577,9.03487,11.30329,8.8033,11.30329C7.97487,11.30329,7.3033,11.97487,7.3033,12.80329C7.3033,13.03487,7.35578,13.25419,7.44949,13.45001L5.146447,15.753Z" stroke-opacity="0" stroke="none"></path></svg>'), Cf = () => yf.cloneNode(!0), pf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M7.573332939453125,14.54567903564453C7.667042939453125,14.741499035644532,7.719512939453125,14.960809035644532,7.719512939453125,15.19239903564453C7.719512939453125,16.02079903564453,7.047942939453125,16.69239903564453,6.219512939453125,16.69239903564453C5.391085939453125,16.69239903564453,4.719512939453125,16.02079903564453,4.719512939453125,15.19239903564453C4.719512939453125,14.36394903564453,5.391085939453125,13.692379035644532,6.219512939453125,13.692379035644532C6.451092939453125,13.692379035644532,6.670412939453125,13.74485903564453,6.866232939453125,13.83856903564453L9.865702939453126,10.83909903564453C9.771992939453124,10.643279035644532,9.719512939453125,10.42395903564453,9.719512939453125,10.192379035644532C9.719512939453125,9.36394903564453,10.391082939453124,8.692379035644532,11.219512939453125,8.692379035644532C11.451092939453126,8.692379035644532,11.670412939453126,8.74485903564453,11.866232939453125,8.838569035644532L15.462112939453124,5.242645035644531C15.657412939453126,5.047383335644532,15.974012939453125,5.047383335644532,16.169212939453125,5.242645035644531C16.364512939453125,5.437907035644531,16.364512939453125,5.754489035644531,16.169212939453125,5.949752035644531L12.573332939453124,9.545679035644532C12.667042939453125,9.74149903564453,12.719512939453125,9.96080903564453,12.719512939453125,10.192379035644532C12.719512939453125,11.020809035644533,12.047942939453126,11.692379035644532,11.219512939453125,11.692379035644532C10.987942939453125,11.692379035644532,10.768632939453125,11.639909035644532,10.572812939453126,11.54619903564453L7.573332939453125,14.54567903564453Z" stroke-opacity="0" stroke="none"></path></svg>'), vf = () => pf.cloneNode(!0), bf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M15.719512939453125,8.461776733398438C16.547912939453127,8.461776733398438,17.219512939453125,7.7902067333984375,17.219512939453125,6.9617767333984375C17.219512939453125,6.133349733398438,16.547912939453127,5.4617767333984375,15.719512939453125,5.4617767333984375C14.891082939453124,5.4617767333984375,14.219512939453125,6.133349733398438,14.219512939453125,6.9617767333984375C14.219512939453125,7.193346733398437,14.271992939453124,7.412666733398438,14.365692939453124,7.608486733398438L7.366222939453126,14.607956733398437C7.170402939453125,14.514256733398437,6.951082939453125,14.461776733398438,6.719512939453125,14.461776733398438C5.891085939453125,14.461776733398438,5.219512939453125,15.133346733398437,5.219512939453125,15.961776733398438C5.219512939453125,16.79017673339844,5.891085939453125,17.461776733398438,6.719512939453125,17.461776733398438C7.547942939453125,17.461776733398438,8.219512939453125,16.79017673339844,8.219512939453125,15.961776733398438C8.219512939453125,15.730176733398437,8.167032939453126,15.510876733398437,8.073322939453124,15.315066733398437L15.072802939453124,8.315586733398437C15.268612939453124,8.409296733398438,15.487912939453125,8.461776733398438,15.719512939453125,8.461776733398438Z" stroke-opacity="0" stroke="none"></path></svg>'), $f = () => bf.cloneNode(!0), _f = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17.0643,7.033864912109375L18,3.585784912109375L14.5078,4.509695912109375L15.3537,5.344934912109375L6.02026,14.560584912109375C5.87635,14.517484912109374,5.72366,14.494284912109375,5.5655,14.494284912109375C4.7009,14.494284912109375,4,15.186384912109375,4,16.040084912109375C4,16.893784912109375,4.7009,17.585784912109375,5.5655,17.585784912109375C6.43011,17.585784912109375,7.13101,16.893784912109375,7.13101,16.040084912109375C7.13101,15.722284912109375,7.03392,15.426984912109376,6.86744,15.181384912109374L16.0917,6.073604912109375L17.0643,7.033864912109375Z" stroke-opacity="0" stroke="none"></path></svg>'), kf = () => _f.cloneNode(!0), xf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,13.00505L18.5,13.00505C18.7761,13.00505,19,13.228909999999999,19,13.50505C19,13.781189999999999,18.7761,14.00505,18.5,14.00505L6.91465,14.00505C6.70873,14.58765,6.15311,15.00505,5.5,15.00505C4.671573,15.00505,4,14.33348,4,13.50505C4,12.67662,4.671573,12.00505,5.5,12.00505C6.15311,12.00505,6.70873,12.422450000000001,6.91465,13.00505ZM7.81404,11.625L10.48591,11.625L10.48591,10.90625L9.65193,10.90625L9.65193,7.125L8.997630000000001,7.125C8.71443,7.306641,8.415600000000001,7.419922,7.96443,7.498047L7.96443,8.05078L8.77497,8.05078L8.77497,10.90625L7.81404,10.90625L7.81404,11.625ZM11.081620000000001,11.625L14.0562,11.625L14.0562,10.88281L13.09724,10.88281C12.8863,10.88281,12.59333,10.90625,12.36482,10.93555C13.17537,10.11328,13.84724,9.2207,13.84724,8.39062C13.84724,7.541016,13.28865,7,12.4488,7C11.84333,7,11.446850000000001,7.234375,11.03279,7.679688L11.52497,8.16797C11.747630000000001,7.914062,12.0113,7.697266,12.33552,7.697266C12.7613,7.697266,13.00154,7.982422,13.00154,8.43359C13.00154,9.14648,12.29255,10.00781,11.081620000000001,11.11523L11.081620000000001,11.625ZM15.9605,11.75C16.8121,11.75,17.526899999999998,11.2832,17.526899999999998,10.4375C17.526899999999998,9.82031,17.142200000000003,9.43945,16.6441,9.30078L16.6441,9.27148C17.1129,9.08594,17.3824,8.7207,17.3824,8.21289C17.3824,7.421875,16.8004,7,15.9429,7C15.4215,7,14.9957,7.210938,14.6109,7.541016L15.066,8.11133C15.3258,7.849609,15.5836,7.697266,15.9019,7.697266C16.2789,7.697266,16.4957,7.914062,16.4957,8.28125C16.4957,8.70898,16.2301,9,15.4215,9L15.4215,9.63672C16.3804,9.63672,16.6383,9.91992,16.6383,10.38086C16.6383,10.79688,16.3336,11.03125,15.8824,11.03125C15.4742,11.03125,15.1578,10.82227,14.8922,10.55078L14.4781,11.13281C14.7906,11.486329999999999,15.2652,11.75,15.9605,11.75Z" stroke-opacity="0" stroke="none"></path></svg>'), Lf = () => xf.cloneNode(!0), wf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.146447,14.178126025390625C2.9511847,13.982826025390626,2.9511847,13.666226025390625,3.146447,13.470926025390625L7.39146,9.225966025390626C7.35417,9.095106025390624,7.33421,8.956946025390625,7.33421,8.814116025390625C7.33421,7.985696025390625,8.00578,7.314116025390625,8.834209999999999,7.314116025390625C8.97703,7.314116025390625,9.11519,7.334086025390625,9.24605,7.371366025390625L13.753,2.864373025390625C13.9483,2.669110325390625,14.2649,2.669110325390625,14.4602,2.864373025390625C14.6554,3.059635025390625,14.6554,3.376217025390625,14.4602,3.571479025390625L10.06916,7.962476025390625C10.23631,8.204386025390626,10.334209999999999,8.497826025390625,10.334209999999999,8.814116025390625C10.334209999999999,9.642546025390626,9.66264,10.314116025390625,8.834209999999999,10.314116025390625C8.51791,10.314116025390625,8.22448,10.216226025390625,7.98256,10.049076025390626L3.853554,14.178126025390625C3.658291,14.373326025390625,3.341709,14.373326025390625,3.146447,14.178126025390625ZM7.67736,19.188526025390626C7.4821,18.993226025390626,7.4821,18.676626025390625,7.67736,18.481426025390626L9.9804,16.178326025390625C9.88669,15.982526025390625,9.834209999999999,15.763226025390624,9.834209999999999,15.531626025390626C9.834209999999999,14.703226025390626,10.50578,14.031626025390626,11.33421,14.031626025390626C11.56579,14.031626025390626,11.78511,14.084126025390624,11.98093,14.177826025390624L13.9804,12.178356025390626C13.8867,11.982536025390624,13.8342,11.763216025390625,13.8342,11.531636025390625C13.8342,10.703206025390624,14.5058,10.031636025390625,15.3342,10.031636025390625C15.5658,10.031636025390625,15.7851,10.084116025390625,15.9809,10.177826025390626L18.284,7.874796025390625C18.4792,7.679536025390625,18.7958,7.679536025390625,18.9911,7.874796025390625C19.1863,8.070056025390624,19.1863,8.386636025390626,18.9911,8.581906025390625L16.688000000000002,10.884936025390624C16.7817,11.080756025390626,16.8342,11.300066025390626,16.8342,11.531636025390625C16.8342,12.360066025390624,16.162599999999998,13.031626025390626,15.3342,13.031626025390626C15.1026,13.031626025390626,14.8833,12.979126025390626,14.6875,12.885426025390625L12.68803,14.884926025390625C12.78174,15.080726025390625,12.83421,15.300026025390626,12.83421,15.531626025390626C12.83421,16.360026025390624,12.16264,17.031626025390626,11.33421,17.031626025390626C11.10264,17.031626025390626,10.88333,16.979126025390627,10.68751,16.885426025390625L8.38446,19.188526025390626C8.1892,19.383726025390626,7.87262,19.383726025390626,7.67736,19.188526025390626Z" stroke-opacity="0" stroke="none"></path></svg>'), Af = () => wf.cloneNode(!0), Tf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.3367688759765626,12.63173C3.5320318759765623,12.82699,3.8486138759765627,12.82699,4.043876875976562,12.63173L11.822052875976562,4.853553C12.017312875976563,4.658291,12.017312875976563,4.341708,11.822052875976562,4.146446C11.626792875976562,3.9511843,11.310202875976563,3.9511843,11.114942875976563,4.146446L3.3367688759765626,11.92462C3.1415071759765625,12.11988,3.1415071759765625,12.43647,3.3367688759765626,12.63173ZM5.001492875976562,17.0351C4.806232875976562,16.8399,4.806232875976562,16.5233,5.001492875976562,16.328L7.304532875976562,14.025C7.210822875976563,13.82916,7.158352875976563,13.60984,7.158352875976563,13.37827C7.158352875976563,12.54984,7.829922875976562,11.87827,8.658352875976561,11.87827C8.889922875976563,11.87827,9.109232875976563,11.93075,9.305052875976562,12.02446L11.304532875976562,10.02498C11.210822875976563,9.82916,11.158352875976561,9.60984,11.158352875976561,9.37827C11.158352875976561,8.54984,11.829922875976562,7.8782700000000006,12.658352875976563,7.8782700000000006C12.889922875976563,7.8782700000000006,13.109232875976563,7.93075,13.305022875976562,8.024460000000001L15.608122875976562,5.72142C15.803322875976562,5.5261499999999995,16.119922875976563,5.5261499999999995,16.315222875976563,5.72142C16.510422875976563,5.9166799999999995,16.510422875976563,6.23326,16.315222875976563,6.42852L14.012122875976562,8.73156C14.105822875976562,8.92738,14.158322875976562,9.1467,14.158322875976562,9.37827C14.158322875976562,10.2067,13.486822875976562,10.87827,12.658352875976563,10.87827C12.426772875976562,10.87827,12.207452875976562,10.82579,12.011642875976563,10.73209L10.012162875976562,12.73156C10.105872875976562,12.92738,10.158352875976561,13.1467,10.158352875976561,13.37827C10.158352875976561,14.2067,9.486772875976563,14.8783,8.658352875976561,14.8783C8.426772875976562,14.8783,8.207452875976562,14.8258,8.011642875976563,14.7321L5.708602875976562,17.0351C5.513342875976562,17.2304,5.196752875976562,17.2304,5.001492875976562,17.0351ZM10.415712875976563,18.328C10.220452875976562,18.5233,9.903862875976563,18.5233,9.708602875976563,18.328C9.513342875976562,18.1328,9.513342875976562,17.816200000000002,9.708602875976563,17.6209L12.304532875976562,15.025C12.210822875976563,14.8292,12.158352875976563,14.6098,12.158352875976563,14.3783C12.158352875976563,13.54984,12.829922875976562,12.87827,13.658322875976562,12.87827C13.889922875976563,12.87827,14.109222875976563,12.93075,14.305022875976562,13.02446L17.486822875976564,9.84274C17.682022875976564,9.64747,17.99862287597656,9.64747,18.19392287597656,9.84274C18.38912287597656,10.038,18.38912287597656,10.35458,18.19392287597656,10.54984L15.012122875976562,13.73156C15.105822875976562,13.92738,15.158322875976562,14.1467,15.158322875976562,14.3783C15.158322875976562,15.2067,14.486822875976562,15.8783,13.658322875976562,15.8783C13.426822875976562,15.8783,13.207422875976562,15.8258,13.011642875976563,15.7321L10.415712875976563,18.328Z" stroke-opacity="0" stroke="none"></path></svg>'), Mf = () => Tf.cloneNode(!0), Sf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M13.1889,6C12.98303,6.582599999999999,12.42741,7,11.7743,7C11.12119,7,10.565570000000001,6.582599999999999,10.35965,6L3.5,6C3.223857,6,3,5.77614,3,5.5C3,5.22386,3.223857,5,3.5,5L10.35965,5C10.565570000000001,4.417404,11.12119,4,11.7743,4C12.42741,4,12.98303,4.417404,13.1889,5L18.5,5C18.7761,5,19,5.22386,19,5.5C19,5.77614,18.7761,6,18.5,6L13.1889,6ZM3,8.5C3,8.22386,3.223857,8,3.5,8L18.5,8C18.7761,8,19,8.22386,19,8.5C19,8.77614,18.7761,9,18.5,9L3.5,9C3.223857,9,3,8.77614,3,8.5ZM3.278549,11.5C3.278549,11.22386,3.502407,11,3.778549,11L18.7785,11C19.0547,11,19.2785,11.22386,19.2785,11.5C19.2785,11.77614,19.0547,12,18.7785,12L3.778549,12C3.502407,12,3.278549,11.77614,3.278549,11.5ZM3.139267,14.5C3.139267,14.2239,3.363124,14,3.6392670000000003,14L18.6393,14C18.915399999999998,14,19.1393,14.2239,19.1393,14.5C19.1393,14.7761,18.915399999999998,15,18.6393,15L3.6392670000000003,15C3.363124,15,3.139267,14.7761,3.139267,14.5ZM13.1889,18C12.98303,18.5826,12.42741,19,11.7743,19C11.12119,19,10.565570000000001,18.5826,10.35965,18L3.778549,18C3.502407,18,3.278549,17.7761,3.278549,17.5C3.278549,17.2239,3.502407,17,3.778549,17L10.35965,17C10.565570000000001,16.4174,11.12119,16,11.7743,16C12.42741,16,12.98303,16.4174,13.1889,17L18.7785,17C19.0547,17,19.2785,17.2239,19.2785,17.5C19.2785,17.7761,19.0547,18,18.7785,18L13.1889,18Z" stroke-opacity="0" stroke="none"></path></svg>'), Pf = () => Sf.cloneNode(!0), Df = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4.91465,6C4.70873,6.582599999999999,4.15311,7,3.5,7C2.671573,7,2,6.32843,2,5.5C2,4.671573,2.671573,4,3.5,4C4.15311,4,4.70873,4.417404,4.91465,5L18.2257,5C18.5018,5,18.7257,5.22386,18.7257,5.5C18.7257,5.77614,18.5018,6,18.2257,6L4.91465,6ZM2.7257,8.5C2.7257,8.22386,2.949558,8,3.2257,8L18.2257,8C18.5018,8,18.7257,8.22386,18.7257,8.5C18.7257,8.77614,18.5018,9,18.2257,9L3.2257,9C2.949558,9,2.7257,8.77614,2.7257,8.5ZM3.00425,11.5C3.00425,11.22386,3.22811,11,3.50425,11L18.5042,11C18.7804,11,19.0042,11.22386,19.0042,11.5C19.0042,11.77614,18.7804,12,18.5042,12L3.50425,12C3.22811,12,3.00425,11.77614,3.00425,11.5ZM2.864967,14.5C2.864967,14.2239,3.08882,14,3.36497,14L18.365,14C18.6411,14,18.865,14.2239,18.865,14.5C18.865,14.7761,18.6411,15,18.365,15L3.36497,15C3.08882,15,2.864967,14.7761,2.864967,14.5ZM20,17.5C20,18.328400000000002,19.3284,19,18.5,19C17.846899999999998,19,17.2913,18.5826,17.0854,18L3.50425,18C3.22811,18,3.00425,17.7761,3.00425,17.5C3.00425,17.2239,3.22811,17,3.50425,17L17.0854,17C17.2913,16.4174,17.846899999999998,16,18.5,16C19.3284,16,20,16.671599999999998,20,17.5Z" stroke-opacity="0" stroke="none"></path></svg>'), Of = () => Df.cloneNode(!0), Nf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="5" ry="5" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="3" ry="3" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse></svg>'), If = () => Nf.cloneNode(!0), Bf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3,7.32468C5.90649,3.3893050000000002,11.49833,2.81306,14.6674,6.31944C14.9056,6.1554199999999994,15.192,6.05979,15.5,6.05979C15.845,6.05979,16.1628,6.17974,16.4162,6.381349999999999L18.4509,4.23827L19,4.816615L16.8945,7.03429C16.962600000000002,7.21075,17,7.40319,17,7.60463C17,8.45782,16.328400000000002,9.14947,15.5,9.14947C14.6716,9.14947,14,8.45782,14,7.60463C14,7.36402,14.0534,7.13625,14.1487,6.93322C11.32695,3.748365,6.25159,4.253956,3.612785,7.82695L3,7.32468ZM14.09,15.4717C15.7427,13.78985,16.244500000000002,11.524740000000001,15.5633,9.30134L15.5618,9.30134L16.3012,9.0502C17.072400000000002,11.56646,16.497700000000002,14.158,14.6282,16.0599C12.28737,18.442,8.62386,18.6988,6.41348,16.4501C4.5526,14.5572,4.52076,11.19671,6.36766,9.3177C7.89069,7.76754,10.07544,7.706189999999999,11.56741,9.22363C11.95453,9.61742,12.24817,10.08363,12.43369,10.57677L14.1451,8.77421L14.6942,9.35256L12.64982,11.50582C12.65827,11.59712,12.66295,11.68839,12.66378,11.77936C12.87398,12.04523,13,12.38451,13,12.7541C13,13.60729,12.32843,14.2989,11.5,14.2989C10.67157,14.2989,10,13.60729,10,12.7541C10,11.90091,10.67157,11.20926,11.5,11.20926C11.60387,11.20926,11.70528,11.220130000000001,11.8032,11.240829999999999L11.81763,11.22564C11.69858,10.71874,11.42858,10.21929,11.0284,9.81179C9.844000000000001,8.60765,8.136890000000001,8.65592,6.90822,9.90586C5.37975,11.460930000000001,5.40693,14.288,6.95404,15.8619C8.84598,17.7867,12.03496,17.5626,14.09,15.4717Z" stroke-opacity="0" stroke="none"></path></svg>'), Ef = () => Bf.cloneNode(!0), Ff = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4,17.0854L4,3.5C4,3.223858,4.22386,3,4.5,3C4.77614,3,5,3.223858,5,3.5L5,10L7.57584,10L9.8127,4.46359C9.91614,4.20756,10.20756,4.08386,10.46359,4.1873000000000005C10.71963,4.29075,10.84333,4.58216,10.73988,4.8382000000000005L8.65438,10L11.08535,10C11.29127,9.4174,11.84689,9,12.5,9C12.65154,9,12.79784,9.02247,12.93573,9.06427L16.6464,5.35355C16.8417,5.15829,17.1583,5.15829,17.3536,5.35355C17.5488,5.54882,17.5488,5.8654,17.3536,6.06066L13.7475,9.66675C13.907,9.90508,14,10.19168,14,10.5C14,11.15311,13.5826,11.70873,13,11.91465L13,14.3638L18.3714,12.1936C18.6274,12.09015,18.918799999999997,12.21385,19.0222,12.46989C19.1257,12.72592,19.002,13.0173,18.746000000000002,13.1208L13,15.4423L13,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854ZM6.3729499999999994,17.0413L12,14.7678L12,11.91465C11.88136,11.87271,11.76956,11.81627,11.66675,11.74746L6.3729499999999994,17.0413ZM12,15.8463L6.6694700000000005,18L12,18L12,15.8463ZM6.38629,15.6137L8.250350000000001,11L11,11L6.38629,15.6137ZM5,11L7.17182,11L5,16.3754L5,11Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Uf = () => Ff.cloneNode(!0), zf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17,4.5C17,5.32843,16.328400000000002,6,15.5,6C15.0931,6,14.7241,5.83802,14.4539,5.57503L5.98992,8.32515C5.99658,8.38251,6,8.440850000000001,6,8.5C6,9.15311,5.582599999999999,9.70873,5,9.91465L5,11.08535C5.42621,11.236,5.763999999999999,11.57379,5.91465,12L19.5,12C19.7761,12,20,12.22386,20,12.5C20,12.77614,19.7761,13,19.5,13L5.91465,13C5.70873,13.5826,5.15311,14,4.5,14C3.671573,14,3,13.3284,3,12.5C3,11.84689,3.417404,11.29127,4,11.08535L4,9.91465C3.417404,9.70873,3,9.15311,3,8.5C3,7.67157,3.671573,7,4.5,7C4.90411,7,5.2709,7.15981,5.5406200000000005,7.41967L14.0093,4.66802C14.0032,4.6128599999999995,14,4.5568,14,4.5C14,3.671573,14.6716,3,15.5,3C16.328400000000002,3,17,3.671573,17,4.5ZM4,15.5C4,15.2239,4.22386,15,4.5,15L19.5,15C19.7761,15,20,15.2239,20,15.5C20,15.7761,19.7761,16,19.5,16L4.5,16C4.22386,16,4,15.7761,4,15.5ZM4,18.5C4,18.2239,4.22386,18,4.5,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L4.5,19C4.22386,19,4,18.7761,4,18.5Z" stroke-opacity="0" stroke="none"></path></svg>'), Vf = () => zf.cloneNode(!0), Kf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M20,3.5C20,4.15311,19.5826,4.70873,19,4.91465L19,18.5C19,18.7761,18.7761,19,18.5,19L4.91465,19C4.70873,19.5826,4.15311,20,3.5,20C2.671573,20,2,19.3284,2,18.5C2,17.846899999999998,2.417404,17.2913,3,17.0854L3,3.5C3,3.22386,3.22386,3,3.5,3L17.0854,3C17.2913,2.417404,17.846899999999998,2,18.5,2C19.3284,2,20,2.671573,20,3.5ZM17.0854,4C17.236,4.42621,17.5738,4.763999999999999,18,4.91465L18,8L14,8L14,4L17.0854,4ZM13,4L13,8L9,8L9,4L13,4ZM13,9L9,9L9,13L13,13L13,9ZM13,14L9,14L9,18L13,18L13,14ZM14,18L14,14L18,14L18,18L14,18ZM18,13L14,13L14,9L18,9L18,13ZM4.91465,18C4.763999999999999,17.5738,4.42621,17.236,4,17.0854L4,14L8,14L8,18L4.91465,18ZM4,8L4,4L8,4L8,8L4,8ZM8,9L8,13L4,13L4,9L8,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Rf = () => Kf.cloneNode(!0), jf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" fill="none" stroke-opacity="1" stroke-width="1"></ellipse></svg>'), Qf = () => jf.cloneNode(!0), Zf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.57625,6.9981C11.55099,6.999359999999999,11.52557,7,11.5,7C11.34,7,11.18584,6.97495,11.04125,6.9285499999999995L5.55401,16.4327C5.713760000000001,16.5905,5.83826,16.7839,5.91465,17L16.0854,17C16.2187,16.622700000000002,16.4987,16.314700000000002,16.8569,16.1445L11.57625,6.9981ZM12.50759,6.611219999999999C12.81005,6.336790000000001,13,5.94058,13,5.5C13,4.671573,12.32843,4,11.5,4C10.67157,4,10,4.671573,10,5.5C10,5.80059,10.08841,6.08052,10.24066,6.31522L4.64514,16.0069C4.59738,16.002299999999998,4.54896,16,4.5,16C3.671573,16,3,16.671599999999998,3,17.5C3,18.328400000000002,3.671573,19,4.5,19C5.15311,19,5.70873,18.5826,5.91465,18L16.0854,18C16.2913,18.5826,16.846899999999998,19,17.5,19C18.328400000000002,19,19,18.328400000000002,19,17.5C19,16.8365,18.5691,16.2735,17.971899999999998,16.075699999999998L12.50759,6.611219999999999Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Hf = () => Zf.cloneNode(!0), Wf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19,4.5C19,5.15311,18.5826,5.70873,18,5.91465L18,18.5C18,18.7761,17.7761,19,17.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854L4,4.5C4,4.22386,4.22386,4,4.5,4L16.0854,4C16.2913,3.417404,16.846899999999998,3,17.5,3C18.328400000000002,3,19,3.671573,19,4.5ZM5,5L16.0854,5C16.236,5.42621,16.5738,5.763999999999999,17,5.91465L17,18L5.91465,18C5.763999999999999,17.5738,5.42621,17.236,5,17.0854L5,5Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), qf = () => Wf.cloneNode(!0), Yf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19.6401,7.99355C20.4028,7.92291,21,7.2811900000000005,21,6.5C21,5.671573,20.3284,5,19.5,5C18.8469,5,18.2913,5.417404,18.0854,6L7.62067,6C7.34453,6,7.12067,6.22386,7.12067,6.5C7.12067,6.5479,7.12741,6.59423,7.13999,6.63809L3.2294099999999997,15.0243C2.530138,15.1517,2,15.764,2,16.5C2,17.328400000000002,2.671573,18,3.5,18C4.15311,18,4.70873,17.5826,4.91465,17L14.5963,17C14.6456,17.076,14.7162,17.1396,14.8044,17.1807C15.0546,17.2974,15.3521,17.1891,15.4688,16.9388L19.6401,7.99355ZM14.7896,16.0293L18.6551,7.739599999999999C18.3942,7.56144,18.1925,7.30307,18.0854,7L8.0746,7L4.25044,15.2009C4.55701,15.3784,4.79493,15.6613,4.91465,16L14.6207,16C14.68,16,14.7368,16.0103,14.7896,16.0293Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Gf = () => Yf.cloneNode(!0), Xf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.134443814697265,7.494615087890625L8.764323814697265,7.494615087890625L8.764323814697265,3.414215087890625L8.310223814697267,3.414215087890625L7.294603814697266,4.005035087890625L7.289713814697266,4.634915087890625L8.134443814697265,4.149892087890625L8.134443814697265,7.494615087890625ZM18.832003814697266,6.933095087890624Q19.004603814697266,6.635245087890625,19.004603814697266,6.2543850878906255Q19.004603814697266,5.884915087890625,18.845103814697264,5.593575087890625Q18.685503814697267,5.3006050878906255,18.399103814697266,5.136225087890625Q18.114303814697266,4.9702050878906245,17.754603814697266,4.9653250878906245L18.820603814697265,3.840647087890625L18.820603814697265,3.414215087890625L16.519203814697264,3.414215087890625L16.519203814697264,3.939931087890625L18.050803814697264,3.939931087890625L16.719403814697266,5.334785087890625L17.074203814697263,5.7205350878906245Q17.254903814697265,5.484525087890625,17.619503814697268,5.484525087890625Q17.980803814697268,5.484525087890625,18.187503814697266,5.689605087890625Q18.394203814697267,5.894685087890625,18.394203814697267,6.2543850878906255Q18.394203814697267,6.604315087890625,18.187503814697266,6.822415087890625Q17.980803814697268,7.0405150878906255,17.640603814697265,7.0405150878906255Q17.334603814697267,7.0405150878906255,17.124703814697266,6.890775087890625Q16.914703814697265,6.739415087890626,16.820303814697265,6.469225087890624L16.354803814697263,6.744295087890626Q16.480103814697266,7.125155087890625,16.821903814697265,7.341625087890625Q17.165403814697264,7.559725087890625,17.640603814697265,7.559725087890625Q18.039403814697266,7.559725087890625,18.348603814697267,7.393705087890625Q18.659503814697267,7.229315087890625,18.832003814697266,6.933095087890624ZM10.000003814697266,10.634915087890626C10.000003814697266,11.024655087890626,9.851363814697265,11.379685087890625,9.607683814697266,11.646395087890625L12.168903814697266,15.171615087890626C12.275403814697265,15.147615087890625,12.386203814697266,15.134915087890626,12.500003814697266,15.134915087890626C12.596503814697266,15.134915087890626,12.690803814697265,15.144015087890624,12.782303814697265,15.161415087890624L16.108803814697268,11.196955087890625C16.038703814697264,11.023375087890624,16.000003814697266,10.833655087890625,16.000003814697266,10.634915087890626C16.000003814697266,9.806495087890625,16.671603814697264,9.134915087890626,17.500003814697266,9.134915087890626C18.328403814697264,9.134915087890626,19.000003814697266,9.806495087890625,19.000003814697266,10.634915087890626C19.000003814697266,11.463345087890625,18.328403814697264,12.134915087890626,17.500003814697266,12.134915087890626C17.239503814697265,12.134915087890626,16.994503814697268,12.068495087890625,16.781003814697264,11.951675087890624L13.654703814697266,15.677415087890624C13.870303814697266,15.937215087890625,14.000003814697266,16.270915087890625,14.000003814697266,16.634915087890626C14.000003814697266,17.463315087890624,13.328403814697266,18.134915087890626,12.500003814697266,18.134915087890626C11.671573814697265,18.134915087890626,11.000003814697266,17.463315087890624,11.000003814697266,16.634915087890626C11.000003814697266,16.284415087890626,11.120193814697265,15.962015087890626,11.321603814697266,15.706715087890625L8.715393814697265,12.119565087890624C8.645053814697267,12.129685087890625,8.573143814697266,12.134915087890626,8.500003814697266,12.134915087890626C8.162103814697264,12.134915087890626,7.8503038146972655,12.023195087890626,7.599523814697266,11.834665087890626L4.505583814697266,15.521915087890624C4.809213814697266,15.796415087890624,5.000003814697266,16.193415087890624,5.000003814697266,16.634915087890626C5.000003814697266,17.463315087890624,4.328433814697266,18.134915087890626,3.5000038146972656,18.134915087890626C2.6715768146972656,18.134915087890626,2.0000038146972656,17.463315087890624,2.0000038146972656,16.634915087890626C2.0000038146972656,15.806515087890626,2.6715768146972656,15.134915087890626,3.5000038146972656,15.134915087890626C3.508253814697266,15.134915087890626,3.5164838146972657,15.135015087890626,3.524703814697266,15.135115087890625L7.033823814697266,10.953115087890625C7.011673814697265,10.850565087890626,7.000003814697266,10.744105087890624,7.000003814697266,10.634915087890626C7.000003814697266,9.806495087890625,7.671573814697266,9.134915087890626,8.500003814697266,9.134915087890626C9.328433814697267,9.134915087890626,10.000003814697266,9.806495087890625,10.000003814697266,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Jf = () => Xf.cloneNode(!0), eg = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.13444,7.494615087890625L8.76432,7.494615087890625L8.76432,3.414215087890625L8.310220000000001,3.414215087890625L7.2946,4.005035087890625L7.28971,4.634915087890625L8.13444,4.149892087890625L8.13444,7.494615087890625ZM18.832,6.929835087890625Q19.0046,6.635245087890625,19.0046,6.2543850878906255Q19.0046,5.889805087890625,18.8451,5.5952050878906245Q18.6855,5.3006050878906255,18.3975,5.132965087890625Q18.1094,4.9653250878906245,17.7399,4.9653250878906245Q17.435499999999998,4.9653250878906245,17.1556,5.149245087890625L17.2793,3.939931087890625L18.8304,3.939931087890625L18.8304,3.414215087890625L16.7406,3.414215087890625L16.5094,5.665195087890625L17.0156,5.795405087890625Q17.095399999999998,5.655425087890626,17.2516,5.570795087890625Q17.4095,5.484525087890625,17.6357,5.484525087890625Q17.9694,5.484525087890625,18.1842,5.697745087890625Q18.4007,5.909335087890625,18.4007,6.2543850878906255Q18.4007,6.604315087890625,18.1842,6.822415087890625Q17.9694,7.0405150878906255,17.6292,7.0405150878906255Q17.3298,7.0405150878906255,17.119799999999998,6.890775087890625Q16.9098,6.739415087890626,16.825200000000002,6.474115087890625L16.3597,6.749175087890626Q16.470399999999998,7.110505087890624,16.807299999999998,7.335115087890625Q17.144199999999998,7.559725087890625,17.6292,7.559725087890625Q18.0296,7.559725087890625,18.3438,7.392075087890625Q18.6595,7.224435087890625,18.832,6.929835087890625ZM10,10.634915087890626C10,11.024655087890626,9.85136,11.379685087890625,9.60768,11.646395087890625L12.1689,15.171615087890626C12.2754,15.147615087890625,12.3862,15.134915087890626,12.5,15.134915087890626C12.5965,15.134915087890626,12.6908,15.144015087890624,12.7823,15.161415087890624L16.108800000000002,11.196955087890625C16.0387,11.023375087890624,16,10.833655087890625,16,10.634915087890626C16,9.806495087890625,16.671599999999998,9.134915087890626,17.5,9.134915087890626C18.3284,9.134915087890626,19,9.806495087890625,19,10.634915087890626C19,11.463345087890625,18.3284,12.134915087890626,17.5,12.134915087890626C17.2395,12.134915087890626,16.994500000000002,12.068505087890625,16.781,11.951675087890624L13.6547,15.677415087890624C13.8703,15.937215087890625,14,16.270915087890625,14,16.634915087890626C14,17.463315087890624,13.3284,18.134915087890626,12.5,18.134915087890626C11.67157,18.134915087890626,11,17.463315087890624,11,16.634915087890626C11,16.284415087890626,11.12019,15.962015087890626,11.3216,15.706715087890625L8.71539,12.119565087890624C8.645050000000001,12.129685087890625,8.57314,12.134915087890626,8.5,12.134915087890626C8.162099999999999,12.134915087890626,7.8503,12.023195087890626,7.59952,11.834665087890626L4.50558,15.521915087890624C4.80921,15.796415087890624,5,16.193415087890624,5,16.634915087890626C5,17.463315087890624,4.32843,18.134915087890626,3.5,18.134915087890626C2.671573,18.134915087890626,2,17.463315087890624,2,16.634915087890626C2,15.806515087890626,2.671573,15.134915087890626,3.5,15.134915087890626C3.5082500000000003,15.134915087890626,3.51648,15.135015087890626,3.5247,15.135115087890625L7.03382,10.953115087890625C7.01167,10.850565087890626,7,10.744105087890624,7,10.634915087890626C7,9.806495087890625,7.67157,9.134915087890626,8.5,9.134915087890626C9.32843,9.134915087890626,10,9.806495087890625,10,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), tg = () => eg.cloneNode(!0), ng = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M18.8532,7.020985087890625Q19.0257,6.734525087890625,19.0257,6.369945087890625Q19.0257,6.020005087890625,18.8499,5.754705087890625Q18.6758,5.489415087890626,18.3649,5.339675087890625Q18.5944,5.209465087890625,18.7214,4.994615087890625Q18.8499,4.779775087890625,18.8499,4.5193550878906255Q18.8499,4.2003480878906245,18.7002,3.951324087890625Q18.5505,3.700673087890625,18.277,3.557444087890625Q18.0052,3.414215087890625,17.6455,3.414215087890625Q17.285800000000002,3.414215087890625,17.0107,3.557444087890625Q16.7357,3.700673087890625,16.5843,3.951324087890625Q16.4346,4.2003480878906245,16.4346,4.5193550878906255Q16.4346,4.779775087890625,16.561500000000002,4.994615087890625Q16.6901,5.209465087890625,16.919600000000003,5.339675087890625Q16.6055,5.489415087890626,16.4297,5.757965087890625Q16.255499999999998,6.024895087890625,16.255499999999998,6.369945087890625Q16.255499999999998,6.734525087890625,16.4297,7.020985087890625Q16.6055,7.305815087890625,16.919600000000003,7.465325087890625Q17.2354,7.624825087890625,17.6455,7.624825087890625Q18.0557,7.624825087890625,18.3682,7.465325087890625Q18.6807,7.305815087890625,18.8532,7.020985087890625ZM8.76432,7.559725087890625L8.13444,7.559725087890625L8.13444,4.214996087890625L7.28971,4.700025087890625L7.2946,4.070139087890625L8.310220000000001,3.479319087890625L8.76432,3.479319087890625L8.76432,7.559725087890625ZM17.1816,4.955555087890625Q17.0042,4.784655087890625,17.0042,4.5095950878906255Q17.0042,4.229645087890625,17.18,4.057119087890625Q17.355800000000002,3.884592087890625,17.6455,3.884592087890625Q17.935200000000002,3.884592087890625,18.1077,4.057119087890625Q18.2803,4.229645087890625,18.2803,4.5095950878906255Q18.2803,4.784655087890625,18.1045,4.955555087890625Q17.930300000000003,5.124825087890625,17.6455,5.124825087890625Q17.3607,5.124825087890625,17.1816,4.955555087890625ZM18.2217,5.7953950878906255Q18.4398,6.005365087890625,18.4398,6.3552950878906245Q18.4398,6.705235087890625,18.2217,6.915195087890625Q18.0052,7.125155087890625,17.6455,7.125155087890625Q17.285800000000002,7.125155087890625,17.067700000000002,6.915195087890625Q16.849600000000002,6.705235087890625,16.849600000000002,6.3552950878906245Q16.849600000000002,6.005365087890625,17.064500000000002,5.7953950878906255Q17.2793,5.585435087890625,17.6455,5.585435087890625Q18.0052,5.585435087890625,18.2217,5.7953950878906255ZM9.60768,11.711495087890626C9.85136,11.444785087890626,10,11.089765087890626,10,10.700025087890625C10,9.871595087890626,9.32843,9.200025087890625,8.5,9.200025087890625C7.67157,9.200025087890625,7,9.871595087890626,7,10.700025087890625C7,10.809205087890625,7.01167,10.915665087890625,7.03382,11.018215087890624L3.5247,15.200215087890625C3.51648,15.200115087890625,3.5082500000000003,15.200015087890625,3.5,15.200015087890625C2.671573,15.200015087890625,2,15.871615087890625,2,16.700015087890627C2,17.528415087890625,2.671573,18.200015087890627,3.5,18.200015087890627C4.32843,18.200015087890627,5,17.528415087890625,5,16.700015087890627C5,16.258515087890625,4.80921,15.861515087890625,4.50558,15.587015087890626L7.59952,11.899765087890625C7.8503,12.088295087890625,8.162099999999999,12.200025087890625,8.5,12.200025087890625C8.57314,12.200025087890625,8.645050000000001,12.194785087890626,8.71539,12.184675087890625L11.3216,15.771815087890625C11.12019,16.027215087890625,11,16.349515087890623,11,16.700015087890627C11,17.528415087890625,11.67157,18.200015087890627,12.5,18.200015087890627C13.3284,18.200015087890627,14,17.528415087890625,14,16.700015087890627C14,16.336015087890623,13.8703,16.002315087890626,13.6547,15.742515087890625L16.781,12.016775087890625C16.994500000000002,12.133605087890626,17.2395,12.200025087890625,17.5,12.200025087890625C18.3284,12.200025087890625,19,11.528445087890624,19,10.700025087890625C19,9.871595087890626,18.3284,9.200025087890625,17.5,9.200025087890625C16.671599999999998,9.200025087890625,16,9.871595087890626,16,10.700025087890625C16,10.898765087890624,16.0387,11.088475087890625,16.108800000000002,11.262055087890625L12.7823,15.226515087890625C12.6908,15.209115087890625,12.5965,15.200015087890625,12.5,15.200015087890625C12.3862,15.200015087890625,12.2754,15.212715087890626,12.1689,15.236715087890625L9.60768,11.711495087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), rg = () => ng.cloneNode(!0), og = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M9.474616630859375,7.494615087890625L8.844736630859375,7.494615087890625L8.844736630859375,4.149892087890625L8.000006630859374,4.634915087890625L8.004896630859374,4.005035087890625L9.020516630859376,3.414215087890625L9.474616630859375,3.414215087890625L9.474616630859375,7.494615087890625ZM18.529296630859378,4.8318550878906255Q18.307996630859375,5.028795087890625,18.122396630859377,5.385245087890625Q17.868496630859376,5.019035087890625,17.629196630859376,4.8269750878906255Q17.389996630859375,4.634915087890625,17.168596630859376,4.634915087890625Q16.794296630859375,4.634915087890625,16.522496630859376,4.976715087890625Q16.252296630859377,5.3168850878906255,16.252296630859377,5.7856350878906255Q16.252296630859377,6.218575087890625,16.502896630859375,6.521315087890625Q16.755196630859373,6.822415087890625,17.114896630859377,6.822415087890625Q17.368796630859375,6.822415087890625,17.588596630859374,6.625475087890624Q17.809896630859377,6.428535087890625,17.998696630859374,6.0688350878906245Q18.249396630859373,6.439935087890625,18.488596630859377,6.631985087890625Q18.727896630859377,6.822415087890625,18.952496630859375,6.822415087890625Q19.326796630859373,6.822415087890625,19.596996630859376,6.482245087890625Q19.868796630859375,6.140455087890626,19.868796630859375,5.671705087890626Q19.868796630859375,5.238755087890625,19.618196630859376,4.937655087890625Q19.367496630859375,4.634915087890625,19.006196630859375,4.634915087890625Q18.750696630859377,4.634915087890625,18.529296630859378,4.8318550878906255ZM18.337296630859377,5.674955087890625L18.278696630859375,5.596835087890625Q18.449596630859375,5.272935087890625,18.622096630859374,5.1101750878906245Q18.794596630859374,4.947415087890625,18.967096630859373,4.947415087890625Q19.194996630859375,4.947415087890625,19.346396630859374,5.1345950878906255Q19.497696630859377,5.320135087890625,19.497696630859377,5.598455087890625Q19.497696630859377,5.8914250878906245,19.360996630859376,6.096505087890625Q19.224296630859374,6.301585087890626,19.027396630859375,6.301585087890626Q18.915096630859374,6.301585087890626,18.742496630859375,6.146965087890624Q18.569996630859375,5.992335087890625,18.337296630859377,5.674955087890625ZM17.785496630859377,5.779125087890625L17.842496630859372,5.857245087890625Q17.668296630859373,6.186025087890625,17.495796630859374,6.348785087890625Q17.324896630859374,6.509915087890625,17.153996630859375,6.509915087890625Q16.926096630859377,6.509915087890625,16.774796630859377,6.324375087890624Q16.623396630859375,6.137195087890625,16.623396630859375,5.858875087890625Q16.623396630859375,5.565905087890625,16.761696630859376,5.360825087890625Q16.900096630859373,5.1557550878906255,17.095396630859376,5.1557550878906255Q17.228896630859374,5.1557550878906255,17.365596630859375,5.2778250878906245Q17.502296630859377,5.399895087890625,17.785496630859377,5.779125087890625ZM10.710296630859375,10.634915087890626C10.710296630859375,11.024655087890626,10.561656630859375,11.379685087890625,10.317976630859375,11.646395087890625L12.879196630859376,15.171615087890626C12.985696630859374,15.147615087890625,13.096496630859376,15.134915087890626,13.210296630859375,15.134915087890626C13.306796630859376,15.134915087890626,13.401096630859374,15.144015087890624,13.492596630859374,15.161415087890624L16.819096630859377,11.196955087890625C16.748996630859374,11.023375087890624,16.710296630859375,10.833655087890625,16.710296630859375,10.634915087890626C16.710296630859375,9.806495087890625,17.381896630859373,9.134915087890626,18.210296630859375,9.134915087890626C19.038696630859373,9.134915087890626,19.710296630859375,9.806495087890625,19.710296630859375,10.634915087890626C19.710296630859375,11.463345087890625,19.038696630859373,12.134915087890626,18.210296630859375,12.134915087890626C17.949796630859375,12.134915087890626,17.704796630859377,12.068505087890625,17.491296630859374,11.951675087890624L14.364996630859375,15.677415087890624C14.580596630859375,15.937215087890625,14.710296630859375,16.270915087890625,14.710296630859375,16.634915087890626C14.710296630859375,17.463315087890624,14.038696630859375,18.134915087890626,13.210296630859375,18.134915087890626C12.381866630859374,18.134915087890626,11.710296630859375,17.463315087890624,11.710296630859375,16.634915087890626C11.710296630859375,16.284415087890626,11.830486630859374,15.962015087890626,12.031896630859375,15.706715087890625L9.425686630859374,12.119565087890624C9.355346630859376,12.129685087890625,9.283436630859375,12.134915087890626,9.210296630859375,12.134915087890626C8.872396630859374,12.134915087890626,8.560596630859376,12.023195087890626,8.309816630859375,11.834665087890626L5.215876630859375,15.521915087890624C5.519506630859375,15.796415087890624,5.710296630859375,16.193415087890624,5.710296630859375,16.634915087890626C5.710296630859375,17.463315087890624,5.038726630859375,18.134915087890626,4.210296630859375,18.134915087890626C3.381869630859375,18.134915087890626,2.710296630859375,17.463315087890624,2.710296630859375,16.634915087890626C2.710296630859375,15.806515087890626,3.381869630859375,15.134915087890626,4.210296630859375,15.134915087890626C4.218546630859375,15.134915087890626,4.226776630859375,15.135015087890626,4.234996630859375,15.135115087890625L7.744116630859375,10.953115087890625C7.721966630859375,10.850565087890626,7.710296630859375,10.744105087890624,7.710296630859375,10.634915087890626C7.710296630859375,9.806495087890625,8.381866630859374,9.134915087890626,9.210296630859375,9.134915087890626C10.038726630859376,9.134915087890626,10.710296630859375,9.806495087890625,10.710296630859375,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), ig = () => og.cloneNode(!0), ag = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M21,5.5C21,6.32843,20.3284,7,19.5,7C19.4136,7,19.3289,6.99269,19.2465,6.97866L15.6257,15.5086C15.8587,15.7729,16,16.119999999999997,16,16.5C16,17.328400000000002,15.3284,18,14.5,18C13.8469,18,13.2913,17.5826,13.0854,17L3.91465,17C3.70873,17.5826,3.15311,18,2.5,18C1.671573,18,1,17.328400000000002,1,16.5C1,15.6716,1.671573,15,2.5,15C2.5840199999999998,15,2.66643,15.0069,2.74668,15.0202L6.36934,6.48574C6.13933,6.22213,6,5.87733,6,5.5C6,4.671573,6.67157,4,7.5,4C8.15311,4,8.70873,4.417404,8.91465,5L18.0854,5C18.2913,4.417404,18.8469,4,19.5,4C20.3284,4,21,4.671573,21,5.5ZM18.0854,6L8.91465,6C8.892579999999999,6.06243,8.8665,6.12296,8.83672,6.18128L13.9814,15.0921C14.143,15.0325,14.3177,15,14.5,15C14.584,15,14.6664,15.0069,14.7467,15.0202L18.3693,6.48574C18.2462,6.3446,18.149,6.1802,18.0854,6ZM13.2036,15.745L8.0861,6.8811800000000005C7.90605,6.95768,7.70797,7,7.5,7C7.41359,7,7.32888,6.99269,7.24647,6.97866L3.62571,15.5086C3.7512,15.651,3.8501,15.8174,3.91465,16L13.0854,16C13.1169,15.9108,13.1566,15.8255,13.2036,15.745Z" stroke-opacity="0" stroke="none"></path></svg>'), sg = () => ag.cloneNode(!0), lg = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.92159,5.93994C6.04014,5.90529,6.152620000000001,5.85639,6.25704,5.79523L9.12729,9.89437C9.045449999999999,10.07959,9,10.28449,9,10.5C9,10.79522,9.08529,11.07053,9.232569999999999,11.30262L4.97573,16.7511L5.92159,5.93994ZM4.92259,5.8848400000000005C4.38078,5.658659999999999,4,5.1238,4,4.5C4,3.671573,4.67157,3,5.5,3C6.2157,3,6.81433,3.50124,6.96399,4.17183L15.1309,4.88634C15.3654,4.36387,15.8902,4,16.5,4C17.328400000000002,4,18,4.67157,18,5.5C18,6.08983,17.659599999999998,6.60015,17.1645,6.84518L18.4264,14.0018C18.4508,14.0006,18.4753,14,18.5,14C19.3284,14,20,14.6716,20,15.5C20,16.328400000000002,19.3284,17,18.5,17C17.932499999999997,17,17.4386,16.6849,17.183799999999998,16.22L5.99686,18.5979C5.946429999999999,19.3807,5.29554,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.869300000000003,3.389292,17.3295,3.94071,17.1077L4.92259,5.8848400000000005ZM5.72452,17.6334C5.69799,17.596,5.6698,17.5599,5.64004,17.525100000000002L10.01843,11.92103C10.16958,11.97223,10.33155,12,10.5,12C10.80059,12,11.08052,11.91158,11.31522,11.75934L17.0606,15.0765C17.0457,15.1271,17.0335,15.1789,17.023899999999998,15.2317L5.72452,17.6334ZM11.92855,10.95875L17.4349,14.1379L16.1699,6.96356C15.9874,6.92257,15.8174,6.8483,15.6667,6.74746L11.99771,10.4165C11.99923,10.44414,12,10.47198,12,10.5C12,10.66,11.97495,10.814160000000001,11.92855,10.95875ZM10.5,9C10.259830000000001,9,10.03285,9.05644,9.83159,9.15679L7.04919,5.1831L15.0493,5.88302C15.054,5.90072,15.059,5.91829,15.0643,5.9357299999999995L11.56066,9.43934C11.28921,9.16789,10.91421,9,10.5,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), cg = () => lg.cloneNode(!0), ug = /* @__PURE__ */ p('<svg viewBox="0 0 22 22"><path d="M4.727219638671875,8.007996215820313L9.973849638671876,2.7629472158203123C10.167279638671875,2.5696791158203123,10.480729638671875,2.5696791158203123,10.674169638671875,2.7629472158203123L13.223329638671874,5.311756215820313C13.416929638671874,5.505236215820313,13.416929638671874,5.8189862158203125,13.223329638671874,6.012466215820313L7.977129638671875,11.257906215820313C7.379859638671875,11.855176215820313,7.407609638671875,12.909396215820312,8.033809638671876,13.535596215820313C8.660409638671876,14.162596215820313,9.713849638671874,14.189996215820312,10.311129638671876,13.591896215820313L15.556929638671875,8.346066215820311C15.750429638671875,8.152526215820313,16.064229638671875,8.152526215820313,16.257629638671872,8.346066215820311L18.806529638671876,10.895266215820312C19.000029638671876,11.088746215820313,19.000029638671876,11.402496215820312,18.806529638671876,11.595976215820313L13.560629638671875,16.841796215820313C11.165619638671876,19.237196215820312,7.197149638671875,19.19919621582031,4.783499638671875,16.785496215820313C2.3698426386718747,14.371896215820312,2.331397638671875,10.403416215820313,4.727219638671875,8.007996215820313ZM12.172299638671875,5.662106215820312L10.323809638671875,3.8136162158203124L5.4287196386718755,8.709096215820313C3.422893638671875,10.714536215820312,3.4549956386718748,14.055196215820313,5.484999638671875,16.08479621582031C7.514609638671875,18.114796215820313,10.855289638671875,18.146496215820314,12.860719638671876,16.141096215820312L15.465629638671874,13.535796215820312L14.090929638671875,12.160756215820312L14.791629638671875,11.460436215820312L16.166229638671876,12.834996215820313L17.755829638671877,11.245226215820313L15.907729638671874,9.396736215820312L11.011839638671875,14.292596215820312C10.042809638671875,15.262396215820312,8.418249638671874,15.243796215820312,7.406019638671875,14.306496215820312L7.333099638671875,14.236296215820312C6.327599638671876,13.230796215820313,6.284009638671876,11.550396215820312,7.276419638671875,10.557586215820312L9.882199638671874,7.952026215820313L8.501079638671875,6.570906215820313L9.201789638671876,5.870186215820313L10.582939638671874,7.251336215820312L12.172299638671875,5.662106215820312Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), dg = (e) => (() => {
  const t = ug.cloneNode(!0);
  return Ee(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), hg = /* @__PURE__ */ p('<svg viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_615"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_615)"><path d="M19.672,3.0673368C19.4417,2.9354008,19.1463,3.00292252,18.9994,3.2210900000000002L17.4588,5.50622L16.743299999999998,3.781253L13.9915,7.4662L13.9618,7.51108C13.8339,7.72862,13.8936,8.005659999999999,14.1004,8.15391L14.1462,8.183430000000001C14.3683,8.308720000000001,14.6511,8.25001,14.8022,8.047229999999999L16.4907,5.78571L17.246299999999998,7.60713L19.8374,3.7635389999999997L19.8651,3.717088C19.9871,3.484615,19.9023,3.199273,19.672,3.0673368ZM4.79974,8.462530000000001L10.117740000000001,3.252975C10.31381,3.0610145,10.63152,3.0610145,10.82759,3.252975L13.4115,5.78453C13.6076,5.976710000000001,13.6076,6.28833,13.4115,6.4805L8.093869999999999,11.69045C7.48847,12.28368,7.51659,13.3308,8.151309999999999,13.9528C8.786439999999999,14.5755,9.85421,14.6027,10.45961,14.0087L15.7768,8.79831C15.9729,8.60609,16.2909,8.60609,16.487099999999998,8.79831L19.0705,11.33026C19.2667,11.52244,19.2667,11.83406,19.0705,12.02623L13.7533,17.2366C11.32572,19.6158,7.30328,19.578,4.85679,17.1807C2.410298,14.7834,2.371331,10.84174,4.79974,8.462530000000001ZM12.3461,6.1325199999999995L10.47246,4.29654L5.51079,9.15889C3.477674,11.15076,3.510214,14.4688,5.56784,16.4847C7.62506,18.500999999999998,11.01117,18.5325,13.0439,16.540599999999998L15.6842,13.9529L14.2908,12.58718L15.0011,11.89161L16.394399999999997,13.2569L18.0056,11.67786L16.1323,9.84188L11.16985,14.7046C10.18764,15.6679,8.540980000000001,15.6494,7.51498,14.7184L7.44107,14.6487C6.4219,13.65,6.37771,11.98096,7.38362,10.994869999999999L10.02485,8.40693L8.624939999999999,7.03516L9.335180000000001,6.33919L10.73512,7.71099L12.3461,6.1325199999999995Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), fg = (e) => (() => {
  const t = hg.cloneNode(!0);
  return Ee(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), gg = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,17C5.80945,17,3.667717,12.85,3.113386,11.575C2.9622047,11.2,2.9622047,10.8,3.113386,10.425C3.667717,9.15,5.80945,5,11,5C16.165399999999998,5,18.3323,9.15,18.8866,10.425C19.0378,10.8,19.0378,11.2,18.8866,11.575C18.3323,12.85,16.165399999999998,17,11,17ZM4.04567,10.8C3.995276,10.925,3.995276,11.05,4.04567,11.175C4.52441,12.325,6.43937,16,11,16C15.5606,16,17.4756,12.325,17.9543,11.2C18.0047,11.075,18.0047,10.95,17.9543,10.825C17.4756,9.675,15.5606,6,11,6C6.43937,6,4.52441,9.675,4.04567,10.8ZM11,13.5C9.61417,13.5,8.480319999999999,12.375,8.480319999999999,11C8.480319999999999,9.625,9.61417,8.5,11,8.5C12.38583,8.5,13.5197,9.625,13.5197,11C13.5197,12.375,12.38583,13.5,11,13.5ZM11,9.5C10.1685,9.5,9.48819,10.175,9.48819,11C9.48819,11.825,10.1685,12.5,11,12.5C11.8315,12.5,12.51181,11.825,12.51181,11C12.51181,10.175,11.8315,9.5,11,9.5Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), mg = () => gg.cloneNode(!0), yg = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.80417,14.9887L4.62563,16.167299999999997C4.43037,16.3625,4.43037,16.6791,4.62563,16.8744C4.82089,17.0696,5.13748,17.0696,5.332739999999999,16.8744L6.62638,15.5807C7.75595,16.290100000000002,9.19328,16.7929,11,16.7929C16.165399999999998,16.7929,18.3323,12.64289,18.8866,11.36789C19.0378,10.99289,19.0378,10.59289,18.8866,10.21789C18.5549,9.45486,17.6456,7.66212,15.8617,6.34545L17.3536,4.853553C17.5488,4.658291,17.5488,4.341709,17.3536,4.146447C17.1583,3.9511845,16.8417,3.9511845,16.6464,4.146447L15.0014,5.7915399999999995C13.9314,5.1969,12.61166,4.792893,11,4.792893C5.80945,4.792893,3.667717,8.94289,3.113386,10.21789C2.9622049,10.59289,2.9622049,10.99289,3.113386,11.36789C3.424435,12.08333,4.2353000000000005,13.70399,5.80417,14.9887ZM7.36012,14.847C8.32327,15.4074,9.52286,15.7929,11,15.7929C15.5606,15.7929,17.4756,12.11789,17.9543,10.99289C18.0047,10.86789,18.0047,10.74289,17.9543,10.61789C17.659,9.90846,16.8171,8.23812,15.1447,7.06241L12.96929,9.23782C13.3134,9.66543,13.5197,10.20642,13.5197,10.79289C13.5197,12.16789,12.38583,13.29289,11,13.29289C10.41596,13.29289,9.87667,13.09308,9.44815,12.75896L7.36012,14.847ZM8.794609999999999,11.99829L6.520099999999999,14.2728C5.06905,13.12119,4.32057,11.628250000000001,4.04567,10.96789C3.995275,10.84289,3.995275,10.71789,4.04567,10.59289C4.52441,9.46789,6.43937,5.79289,11,5.79289C12.28868,5.79289,13.3661,6.086320000000001,14.2596,6.53329L12.19759,8.5953C11.84086,8.40257,11.43271,8.29289,11,8.29289C9.61417,8.29289,8.480319999999999,9.41789,8.480319999999999,10.79289C8.480319999999999,11.22918,8.594470000000001,11.64029,8.794609999999999,11.99829ZM10.16528,12.04183C10.404869999999999,12.20032,10.692070000000001,12.29289,11,12.29289C11.8315,12.29289,12.51181,11.61789,12.51181,10.79289C12.51181,10.48318,12.41593,10.194600000000001,12.25216,9.95494L10.16528,12.04183ZM11.43602,9.35687L9.55616,11.236740000000001C9.512,11.09633,9.48819,10.94724,9.48819,10.79289C9.48819,9.96789,10.1685,9.29289,11,9.29289C11.15142,9.29289,11.29782,9.31528,11.43602,9.35687Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Cg = () => yg.cloneNode(!0), pg = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_625"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_625)"><path d="M14.5385,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807692,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.88462,4,14.5385,5.61538,14.5385,7.576919999999999L14.5385,9.76923ZM10.88461,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923L13.38462,9.76923L13.38462,7.576919999999999C13.38462,6.23077,12.26923,5.15385,10.88461,5.15385ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.038450000000001,12.07692,11.307680000000001,12.34615,11.307680000000001,12.65385L11.307680000000001,14.5769C11.307680000000001,14.8846,11.038450000000001,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), vg = () => pg.cloneNode(!0), bg = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_620"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_620)"><path d="M8.38461,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807693,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.46154,4,13.84615,4.961539,14.3462,6.423080000000001C14.4615,6.73077,14.3077,7.038460000000001,14,7.15385C13.69231,7.26923,13.38461,7.11538,13.26923,6.80769C12.92308,5.80769,11.96154,5.15385,10.88462,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.03846,12.07692,11.307690000000001,12.34615,11.307690000000001,12.65385L11.307690000000001,14.5769C11.307690000000001,14.8846,11.03846,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), $g = () => bg.cloneNode(!0), _g = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M16.966900000000003,8.67144C16.6669,8.67144,16.4247,8.91558,16.4247,9.21802L16.4247,16.631500000000003C16.4247,17.322,16.007199999999997,17.9068,15.5139,17.9068L13.93072,17.9068L13.93072,9.2162C13.93072,8.91741,13.68675,8.67144,13.38855,8.67144C13.09036,8.67144,12.84639,8.91741,12.84639,9.21802L12.84639,17.9068L10.151810000000001,17.9068L10.151810000000001,9.21802C10.151810000000001,8.91741,9.90783,8.67144,9.609639999999999,8.67144C9.31145,8.67144,9.06747,8.91741,9.06747,9.219850000000001L9.06747,17.9068L7.48614,17.9068C6.99277,17.9068,6.5753,17.322,6.5753,16.631500000000003L6.5753,9.21802C6.5753,8.91558,6.333130000000001,8.67144,6.03313,8.67144C5.73313,8.67144,5.49096,8.91558,5.49096,9.21802L5.49096,16.631500000000003C5.49096,17.9378,6.385540000000001,19,7.48614,19L15.512,19C16.6127,19,17.509,17.9378,17.509,16.631500000000003L17.509,9.21802C17.509,8.91558,17.2669,8.67144,16.966900000000003,8.67144ZM18.4578,6.21183L4.542169,6.21183C4.243976,6.21183,4,6.45779,4,6.75841C4,7.05903,4.243976,7.30499,4.542169,7.30499L18.4578,7.30499C18.756,7.30499,19,7.05903,19,6.75841C19,6.45779,18.756,6.21183,18.4578,6.21183ZM8.68072,5.10045L14.3193,5.10045C14.6175,5.10045,14.8614,4.852666,14.8614,4.550225C14.8614,4.247783,14.6175,4,14.3193,4L8.68072,4C8.38253,4,8.13855,4.247783,8.13855,4.550225C8.13855,4.852666,8.38253,5.10045,8.68072,5.10045Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), kg = () => _g.cloneNode(!0), xg = {
  horizontalStraightLine: of,
  horizontalRayLine: sf,
  horizontalSegment: cf,
  verticalStraightLine: df,
  verticalRayLine: ff,
  verticalSegment: mf,
  straightLine: Cf,
  rayLine: vf,
  segment: $f,
  arrow: kf,
  priceLine: Lf,
  priceChannelLine: Af,
  parallelStraightLine: Mf,
  fibonacciLine: Pf,
  fibonacciSegment: Of,
  fibonacciCircle: If,
  fibonacciSpiral: Ef,
  fibonacciSpeedResistanceFan: Uf,
  fibonacciExtension: Vf,
  gannBox: Rf,
  circle: Qf,
  triangle: Hf,
  rect: qf,
  parallelogram: Gf,
  threeWaves: Jf,
  fiveWaves: tg,
  eightWaves: rg,
  anyWaves: ig,
  abcd: sg,
  xabcd: cg,
  weak_magnet: dg,
  strong_magnet: fg,
  lock: vg,
  unlock: $g,
  visible: mg,
  invisible: Cg,
  remove: kg
};
function Lg(e) {
  return [
    { key: "horizontalStraightLine", text: u("horizontal_straight_line", e) },
    { key: "horizontalRayLine", text: u("horizontal_ray_line", e) },
    { key: "horizontalSegment", text: u("horizontal_segment", e) },
    { key: "verticalStraightLine", text: u("vertical_straight_line", e) },
    { key: "verticalRayLine", text: u("vertical_ray_line", e) },
    { key: "verticalSegment", text: u("vertical_segment", e) },
    { key: "straightLine", text: u("straight_line", e) },
    { key: "rayLine", text: u("ray_line", e) },
    { key: "segment", text: u("segment", e) },
    { key: "arrow", text: u("arrow", e) },
    { key: "priceLine", text: u("price_line", e) }
  ];
}
function wg(e) {
  return [
    { key: "priceChannelLine", text: u("price_channel_line", e) },
    { key: "parallelStraightLine", text: u("parallel_straight_line", e) }
  ];
}
function Ag(e) {
  return [
    { key: "circle", text: u("circle", e) },
    { key: "rect", text: u("rect", e) },
    { key: "parallelogram", text: u("parallelogram", e) },
    { key: "triangle", text: u("triangle", e) }
  ];
}
function Tg(e) {
  return [
    { key: "fibonacciLine", text: u("fibonacci_line", e) },
    { key: "fibonacciSegment", text: u("fibonacci_segment", e) },
    { key: "fibonacciCircle", text: u("fibonacci_circle", e) },
    { key: "fibonacciSpiral", text: u("fibonacci_spiral", e) },
    { key: "fibonacciSpeedResistanceFan", text: u("fibonacci_speed_resistance_fan", e) },
    { key: "fibonacciExtension", text: u("fibonacci_extension", e) },
    { key: "gannBox", text: u("gann_box", e) }
  ];
}
function Mg(e) {
  return [
    { key: "xabcd", text: u("xabcd", e) },
    { key: "abcd", text: u("abcd", e) },
    { key: "threeWaves", text: u("three_waves", e) },
    { key: "fiveWaves", text: u("five_waves", e) },
    { key: "eightWaves", text: u("eight_waves", e) },
    { key: "anyWaves", text: u("any_waves", e) }
  ];
}
function Sg(e) {
  return [
    { key: "weak_magnet", text: u("weak_magnet", e) },
    { key: "strong_magnet", text: u("strong_magnet", e) }
  ];
}
const Je = (e) => xg[e.name](e.class), Pg = /* @__PURE__ */ p('<div class="klinecharts-pro-drawing-bar"><span class="split-line"></span><div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div><div class="item"><span style="width:32px;height:32px"></span></div><div class="item"><span style="width:32px;height:32px"></span></div><span class="split-line"></span><div class="item"><span style="width:32px;height:32px"></span></div></div>'), Dg = /* @__PURE__ */ p('<div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div>'), oo = /* @__PURE__ */ p('<li><span style="padding-left:8px"></span></li>'), io = "drawing_tools", Og = (e) => {
  const [t, r] = M("horizontalStraightLine"), [n, a] = M("priceChannelLine"), [s, d] = M("circle"), [h, b] = M("fibonacciLine"), [x, v] = M("xabcd"), [w, B] = M("weak_magnet"), [N, oe] = M("normal"), [V, R] = M(!1), [U, he] = M(!0), [Z, X] = M(""), J = q(() => [{
    key: "singleLine",
    icon: t(),
    list: Lg(e.locale),
    setter: r
  }, {
    key: "moreLine",
    icon: n(),
    list: wg(e.locale),
    setter: a
  }, {
    key: "polygon",
    icon: s(),
    list: Ag(e.locale),
    setter: d
  }, {
    key: "fibonacci",
    icon: h(),
    list: Tg(e.locale),
    setter: b
  }, {
    key: "wave",
    icon: x(),
    list: Mg(e.locale),
    setter: v
  }]), ve = q(() => Sg(e.locale));
  return (() => {
    const W = Pg.cloneNode(!0), H = W.firstChild, ee = H.nextSibling, se = ee.firstChild, T = se.nextSibling, j = T.firstChild, Q = ee.nextSibling, z = Q.firstChild, le = Q.nextSibling, ce = le.firstChild, re = le.nextSibling, E = re.nextSibling, te = E.firstChild;
    return C(W, () => J().map((P) => (() => {
      const I = Dg.cloneNode(!0), F = I.firstChild, ye = F.nextSibling, Te = ye.firstChild;
      return I.addEventListener("blur", () => {
        X("");
      }), F.$$click = () => {
        e.onDrawingItemClick({
          groupId: io,
          name: P.icon,
          visible: U(),
          lock: V(),
          mode: N()
        });
      }, C(F, A(Je, {
        get name() {
          return P.icon;
        }
      })), ye.$$click = () => {
        P.key === Z() ? X("") : X(P.key);
      }, C(I, (() => {
        const Ce = q(() => P.key === Z());
        return () => Ce() && A(gn, {
          class: "list",
          get children() {
            return P.list.map((Ue) => (() => {
              const k = oo.cloneNode(!0), pe = k.firstChild;
              return k.$$click = () => {
                P.setter(Ue.key), e.onDrawingItemClick({
                  name: Ue.key,
                  lock: V(),
                  mode: N()
                }), X("");
              }, C(k, A(Je, {
                get name() {
                  return Ue.key;
                }
              }), pe), C(pe, () => Ue.text), k;
            })());
          }
        });
      })(), null), K(() => Ee(Te, "class", P.key === Z() ? "rotate" : "")), I;
    })()), H), ee.addEventListener("blur", () => {
      X("");
    }), se.$$click = () => {
      let P = w();
      N() !== "normal" && (P = "normal"), oe(P), e.onModeChange(P);
    }, C(se, (() => {
      const P = q(() => w() === "weak_magnet");
      return () => P() ? (() => {
        const I = q(() => N() === "weak_magnet");
        return () => I() ? A(Je, {
          name: "weak_magnet",
          class: "selected"
        }) : A(Je, {
          name: "weak_magnet"
        });
      })() : (() => {
        const I = q(() => N() === "strong_magnet");
        return () => I() ? A(Je, {
          name: "strong_magnet",
          class: "selected"
        }) : A(Je, {
          name: "strong_magnet"
        });
      })();
    })()), T.$$click = () => {
      Z() === "mode" ? X("") : X("mode");
    }, C(ee, (() => {
      const P = q(() => Z() === "mode");
      return () => P() && A(gn, {
        class: "list",
        get children() {
          return ve().map((I) => (() => {
            const F = oo.cloneNode(!0), ye = F.firstChild;
            return F.$$click = () => {
              B(I.key), oe(I.key), e.onModeChange(I.key), X("");
            }, C(F, A(Je, {
              get name() {
                return I.key;
              }
            }), ye), C(ye, () => I.text), F;
          })());
        }
      });
    })(), null), z.$$click = () => {
      const P = !V();
      R(P), e.onLockChange(P);
    }, C(z, (() => {
      const P = q(() => !!V());
      return () => P() ? A(Je, {
        name: "lock"
      }) : A(Je, {
        name: "unlock"
      });
    })()), ce.$$click = () => {
      const P = !U();
      he(P), e.onVisibleChange(P);
    }, C(ce, (() => {
      const P = q(() => !!U());
      return () => P() ? A(Je, {
        name: "visible"
      }) : A(Je, {
        name: "invisible"
      });
    })()), te.$$click = () => {
      e.onRemoveClick(io);
    }, C(te, A(Je, {
      name: "remove"
    })), K(() => Ee(j, "class", Z() === "mode" ? "rotate" : "")), W;
  })();
};
He(["click"]);
const ao = /* @__PURE__ */ p('<li class="title"></li>'), so = /* @__PURE__ */ p('<li class="row"></li>'), Ng = (e) => A(wt, {
  get title() {
    return u("indicator", e.locale);
  },
  width: 400,
  get onClose() {
    return e.onClose;
  },
  get children() {
    return A(gn, {
      class: "klinecharts-pro-indicator-modal-list",
      get children() {
        return [(() => {
          const t = ao.cloneNode(!0);
          return C(t, () => u("main_indicator", e.locale)), t;
        })(), q(() => ["MA", "EMA", "SMA", "BOLL", "SAR", "BBI"].map((t) => {
          const r = e.mainIndicators.includes(t);
          return (() => {
            const n = so.cloneNode(!0);
            return n.$$click = (a) => {
              e.onMainIndicatorChange({
                name: t,
                paneId: "candle_pane",
                added: !r
              });
            }, C(n, A(eo, {
              checked: r,
              get label() {
                return u(t.toLowerCase(), e.locale);
              }
            })), n;
          })();
        })), (() => {
          const t = ao.cloneNode(!0);
          return C(t, () => u("sub_indicator", e.locale)), t;
        })(), q(() => ["MA", "EMA", "VOL", "MACD", "BOLL", "KDJ", "RSI", "BIAS", "BRAR", "CCI", "DMI", "CR", "PSY", "DMA", "TRIX", "OBV", "VR", "WR", "MTM", "EMV", "SAR", "SMA", "ROC", "PVT", "BBI", "AO"].map((t) => {
          const r = t in e.subIndicators;
          return (() => {
            const n = so.cloneNode(!0);
            return n.$$click = (a) => {
              e.onSubIndicatorChange({
                name: t,
                paneId: e.subIndicators[t] ?? "",
                added: !r
              });
            }, C(n, A(eo, {
              checked: r,
              get label() {
                return u(t.toLowerCase(), e.locale);
              }
            })), n;
          })();
        }))];
      }
    });
  }
});
He(["click"]);
function lo(e, t) {
  switch (e) {
    case "Etc/UTC":
      return u("utc", t);
    case "Pacific/Midway":
      return u("midway", t);
    case "Pacific/Honolulu":
      return u("honolulu", t);
    case "America/Anchorage":
      return u("anchorage", t);
    case "America/Juneau":
      return u("juneau", t);
    case "America/Los_Angeles":
      return u("los_angeles", t);
    case "America/Vancouver":
      return u("vancouver", t);
    case "America/Tijuana":
      return u("tijuana", t);
    case "America/Phoenix":
      return u("phoenix", t);
    case "America/Denver":
      return u("denver", t);
    case "America/Chicago":
      return u("chicago", t);
    case "America/Mexico_City":
      return u("mexico_city", t);
    case "America/Guatemala":
      return u("guatemala", t);
    case "America/New_York":
      return u("new_york", t);
    case "America/Toronto":
      return u("toronto", t);
    case "America/Bogota":
      return u("bogota", t);
    case "America/Lima":
      return u("lima", t);
    case "America/Caracas":
      return u("caracas", t);
    case "America/Halifax":
      return u("halifax", t);
    case "America/Santiago":
      return u("santiago", t);
    case "America/La_Paz":
      return u("la_paz", t);
    case "America/Sao_Paulo":
      return u("sao_paulo", t);
    case "America/Buenos_Aires":
      return u("buenos_aires", t);
    case "America/Montevideo":
      return u("montevideo", t);
    case "America/Godthab":
      return u("godthab", t);
    case "Atlantic/Azores":
      return u("azores", t);
    case "Atlantic/Cape_Verde":
      return u("cape_verde", t);
    case "Europe/London":
      return u("london", t);
    case "Europe/Dublin":
      return u("dublin", t);
    case "Europe/Lisbon":
      return u("lisbon", t);
    case "Africa/Casablanca":
      return u("casablanca", t);
    case "Europe/Paris":
      return u("paris", t);
    case "Europe/Berlin":
      return u("berlin", t);
    case "Europe/Amsterdam":
      return u("amsterdam", t);
    case "Europe/Brussels":
      return u("brussels", t);
    case "Europe/Madrid":
      return u("madrid", t);
    case "Europe/Rome":
      return u("rome", t);
    case "Europe/Vienna":
      return u("vienna", t);
    case "Europe/Warsaw":
      return u("warsaw", t);
    case "Africa/Lagos":
      return u("lagos", t);
    case "Europe/Athens":
      return u("athens", t);
    case "Europe/Bucharest":
      return u("bucharest", t);
    case "Europe/Helsinki":
      return u("helsinki", t);
    case "Europe/Istanbul":
      return u("istanbul", t);
    case "Europe/Kiev":
      return u("kiev", t);
    case "Africa/Cairo":
      return u("cairo", t);
    case "Africa/Johannesburg":
      return u("johannesburg", t);
    case "Asia/Jerusalem":
      return u("jerusalem", t);
    case "Europe/Moscow":
      return u("moscow", t);
    case "Asia/Baghdad":
      return u("baghdad", t);
    case "Asia/Kuwait":
      return u("kuwait", t);
    case "Asia/Riyadh":
      return u("riyadh", t);
    case "Asia/Bahrain":
      return u("bahrain", t);
    case "Africa/Nairobi":
      return u("nairobi", t);
    case "Asia/Tehran":
      return u("tehran", t);
    case "Asia/Dubai":
      return u("dubai", t);
    case "Asia/Muscat":
      return u("muscat", t);
    case "Asia/Baku":
      return u("baku", t);
    case "Asia/Kabul":
      return u("kabul", t);
    case "Asia/Karachi":
      return u("karachi", t);
    case "Asia/Tashkent":
      return u("tashkent", t);
    case "Asia/Ashkhabad":
      return u("ashkhabad", t);
    case "Asia/Kolkata":
      return u("kolkata", t);
    case "Asia/Mumbai":
      return u("mumbai", t);
    case "Asia/Colombo":
      return u("colombo", t);
    case "Asia/Kathmandu":
      return u("kathmandu", t);
    case "Asia/Dhaka":
      return u("dhaka", t);
    case "Asia/Almaty":
      return u("almaty", t);
    case "Asia/Yangon":
      return u("yangon", t);
    case "Asia/Bangkok":
      return u("bangkok", t);
    case "Asia/Jakarta":
      return u("jakarta", t);
    case "Asia/Ho_Chi_Minh":
      return u("ho_chi_minh", t);
    case "Asia/Shanghai":
      return u("shanghai", t);
    case "Asia/Hong_Kong":
      return u("hong_kong", t);
    case "Asia/Singapore":
      return u("singapore", t);
    case "Asia/Taipei":
      return u("taipei", t);
    case "Asia/Manila":
      return u("manila", t);
    case "Asia/Kuala_Lumpur":
      return u("kuala_lumpur", t);
    case "Australia/Perth":
      return u("perth", t);
    case "Asia/Tokyo":
      return u("tokyo", t);
    case "Asia/Seoul":
      return u("seoul", t);
    case "Asia/Pyongyang":
      return u("pyongyang", t);
    case "Australia/Adelaide":
      return u("adelaide", t);
    case "Australia/Darwin":
      return u("darwin", t);
    case "Australia/Brisbane":
      return u("brisbane", t);
    case "Australia/Sydney":
      return u("sydney", t);
    case "Australia/Melbourne":
      return u("melbourne", t);
    case "Pacific/Guam":
      return u("guam", t);
    case "Pacific/Port_Moresby":
      return u("port_moresby", t);
    case "Pacific/Norfolk":
      return u("norfolk", t);
    case "Pacific/Guadalcanal":
      return u("guadalcanal", t);
    case "Pacific/Auckland":
      return u("auckland", t);
    case "Pacific/Fiji":
      return u("fiji", t);
    case "Pacific/Tongatapu":
      return u("tongatapu", t);
    case "Pacific/Apia":
      return u("apia", t);
    case "Asia/Karachi":
      return u("karachi", t);
  }
  return e;
}
function Ig(e) {
  return [
    // UTC
    { key: "Etc/UTC", text: `(UTC+0:00) ${u("utc", e)}` },
    // Pacific (UTC-12 to UTC-8)
    { key: "Pacific/Midway", text: `(UTC-11:00) ${u("midway", e)}` },
    { key: "Pacific/Honolulu", text: `(UTC-10:00) ${u("honolulu", e)}` },
    { key: "America/Anchorage", text: `(UTC-9:00) ${u("anchorage", e)}` },
    { key: "America/Juneau", text: `(UTC-9:00) ${u("juneau", e)}` },
    // North America West (UTC-8 to UTC-7)
    { key: "America/Los_Angeles", text: `(UTC-8:00) ${u("los_angeles", e)}` },
    { key: "America/Vancouver", text: `(UTC-8:00) ${u("vancouver", e)}` },
    { key: "America/Tijuana", text: `(UTC-8:00) ${u("tijuana", e)}` },
    { key: "America/Phoenix", text: `(UTC-7:00) ${u("phoenix", e)}` },
    { key: "America/Denver", text: `(UTC-7:00) ${u("denver", e)}` },
    // North America Central (UTC-6)
    { key: "America/Chicago", text: `(UTC-6:00) ${u("chicago", e)}` },
    { key: "America/Mexico_City", text: `(UTC-6:00) ${u("mexico_city", e)}` },
    { key: "America/Guatemala", text: `(UTC-6:00) ${u("guatemala", e)}` },
    // North America East (UTC-5 to UTC-4)
    { key: "America/New_York", text: `(UTC-5:00) ${u("new_york", e)}` },
    { key: "America/Toronto", text: `(UTC-5:00) ${u("toronto", e)}` },
    { key: "America/Bogota", text: `(UTC-5:00) ${u("bogota", e)}` },
    { key: "America/Lima", text: `(UTC-5:00) ${u("lima", e)}` },
    { key: "America/Caracas", text: `(UTC-4:00) ${u("caracas", e)}` },
    { key: "America/Halifax", text: `(UTC-4:00) ${u("halifax", e)}` },
    // South America (UTC-4 to UTC-3)
    { key: "America/Santiago", text: `(UTC-4:00) ${u("santiago", e)}` },
    { key: "America/La_Paz", text: `(UTC-4:00) ${u("la_paz", e)}` },
    { key: "America/Sao_Paulo", text: `(UTC-3:00) ${u("sao_paulo", e)}` },
    { key: "America/Buenos_Aires", text: `(UTC-3:00) ${u("buenos_aires", e)}` },
    { key: "America/Montevideo", text: `(UTC-3:00) ${u("montevideo", e)}` },
    // Atlantic (UTC-3 to UTC-1)
    { key: "America/Godthab", text: `(UTC-3:00) ${u("godthab", e)}` },
    { key: "Atlantic/Azores", text: `(UTC-1:00) ${u("azores", e)}` },
    { key: "Atlantic/Cape_Verde", text: `(UTC-1:00) ${u("cape_verde", e)}` },
    // Western Europe (UTC+0 to UTC+1)
    { key: "Europe/London", text: `(UTC+0:00) ${u("london", e)}` },
    { key: "Europe/Dublin", text: `(UTC+0:00) ${u("dublin", e)}` },
    { key: "Europe/Lisbon", text: `(UTC+0:00) ${u("lisbon", e)}` },
    { key: "Africa/Casablanca", text: `(UTC+0:00) ${u("casablanca", e)}` },
    { key: "Europe/Paris", text: `(UTC+1:00) ${u("paris", e)}` },
    { key: "Europe/Berlin", text: `(UTC+1:00) ${u("berlin", e)}` },
    { key: "Europe/Amsterdam", text: `(UTC+1:00) ${u("amsterdam", e)}` },
    { key: "Europe/Brussels", text: `(UTC+1:00) ${u("brussels", e)}` },
    { key: "Europe/Madrid", text: `(UTC+1:00) ${u("madrid", e)}` },
    { key: "Europe/Rome", text: `(UTC+1:00) ${u("rome", e)}` },
    { key: "Europe/Vienna", text: `(UTC+1:00) ${u("vienna", e)}` },
    { key: "Europe/Warsaw", text: `(UTC+1:00) ${u("warsaw", e)}` },
    { key: "Africa/Lagos", text: `(UTC+1:00) ${u("lagos", e)}` },
    // Central Europe (UTC+2)
    { key: "Europe/Athens", text: `(UTC+2:00) ${u("athens", e)}` },
    { key: "Europe/Bucharest", text: `(UTC+2:00) ${u("bucharest", e)}` },
    { key: "Europe/Helsinki", text: `(UTC+2:00) ${u("helsinki", e)}` },
    { key: "Europe/Istanbul", text: `(UTC+2:00) ${u("istanbul", e)}` },
    { key: "Europe/Kiev", text: `(UTC+2:00) ${u("kiev", e)}` },
    { key: "Africa/Cairo", text: `(UTC+2:00) ${u("cairo", e)}` },
    { key: "Africa/Johannesburg", text: `(UTC+2:00) ${u("johannesburg", e)}` },
    { key: "Asia/Jerusalem", text: `(UTC+2:00) ${u("jerusalem", e)}` },
    // Eastern Europe / Middle East (UTC+3)
    { key: "Europe/Moscow", text: `(UTC+3:00) ${u("moscow", e)}` },
    { key: "Asia/Baghdad", text: `(UTC+3:00) ${u("baghdad", e)}` },
    { key: "Asia/Kuwait", text: `(UTC+3:00) ${u("kuwait", e)}` },
    { key: "Asia/Riyadh", text: `(UTC+3:00) ${u("riyadh", e)}` },
    { key: "Asia/Bahrain", text: `(UTC+3:00) ${u("bahrain", e)}` },
    { key: "Africa/Nairobi", text: `(UTC+3:00) ${u("nairobi", e)}` },
    // Middle East (UTC+3:30 to UTC+4)
    { key: "Asia/Tehran", text: `(UTC+3:30) ${u("tehran", e)}` },
    { key: "Asia/Dubai", text: `(UTC+4:00) ${u("dubai", e)}` },
    { key: "Asia/Muscat", text: `(UTC+4:00) ${u("muscat", e)}` },
    { key: "Asia/Baku", text: `(UTC+4:00) ${u("baku", e)}` },
    // Central Asia (UTC+4:30 to UTC+5)
    { key: "Asia/Kabul", text: `(UTC+4:30) ${u("kabul", e)}` },
    { key: "Asia/Karachi", text: `(UTC+5:00) ${u("karachi", e)}` },
    { key: "Asia/Tashkent", text: `(UTC+5:00) ${u("tashkent", e)}` },
    { key: "Asia/Ashkhabad", text: `(UTC+5:00) ${u("ashkhabad", e)}` },
    // South Asia (UTC+5:30 to UTC+6)
    { key: "Asia/Kolkata", text: `(UTC+5:30) ${u("kolkata", e)}` },
    { key: "Asia/Mumbai", text: `(UTC+5:30) ${u("mumbai", e)}` },
    { key: "Asia/Colombo", text: `(UTC+5:30) ${u("colombo", e)}` },
    { key: "Asia/Kathmandu", text: `(UTC+5:45) ${u("kathmandu", e)}` },
    { key: "Asia/Dhaka", text: `(UTC+6:00) ${u("dhaka", e)}` },
    { key: "Asia/Almaty", text: `(UTC+6:00) ${u("almaty", e)}` },
    // Southeast Asia (UTC+6:30 to UTC+7)
    { key: "Asia/Yangon", text: `(UTC+6:30) ${u("yangon", e)}` },
    { key: "Asia/Bangkok", text: `(UTC+7:00) ${u("bangkok", e)}` },
    { key: "Asia/Jakarta", text: `(UTC+7:00) ${u("jakarta", e)}` },
    { key: "Asia/Ho_Chi_Minh", text: `(UTC+7:00) ${u("ho_chi_minh", e)}` },
    // East Asia (UTC+8)
    { key: "Asia/Shanghai", text: `(UTC+8:00) ${u("shanghai", e)}` },
    { key: "Asia/Hong_Kong", text: `(UTC+8:00) ${u("hong_kong", e)}` },
    { key: "Asia/Singapore", text: `(UTC+8:00) ${u("singapore", e)}` },
    { key: "Asia/Taipei", text: `(UTC+8:00) ${u("taipei", e)}` },
    { key: "Asia/Manila", text: `(UTC+8:00) ${u("manila", e)}` },
    { key: "Asia/Kuala_Lumpur", text: `(UTC+8:00) ${u("kuala_lumpur", e)}` },
    { key: "Australia/Perth", text: `(UTC+8:00) ${u("perth", e)}` },
    // East Asia (UTC+9)
    { key: "Asia/Tokyo", text: `(UTC+9:00) ${u("tokyo", e)}` },
    { key: "Asia/Seoul", text: `(UTC+9:00) ${u("seoul", e)}` },
    { key: "Asia/Pyongyang", text: `(UTC+9:00) ${u("pyongyang", e)}` },
    // Australia (UTC+9:30 to UTC+10)
    { key: "Australia/Adelaide", text: `(UTC+9:30) ${u("adelaide", e)}` },
    { key: "Australia/Darwin", text: `(UTC+9:30) ${u("darwin", e)}` },
    { key: "Australia/Brisbane", text: `(UTC+10:00) ${u("brisbane", e)}` },
    { key: "Australia/Sydney", text: `(UTC+10:00) ${u("sydney", e)}` },
    { key: "Australia/Melbourne", text: `(UTC+10:00) ${u("melbourne", e)}` },
    { key: "Pacific/Guam", text: `(UTC+10:00) ${u("guam", e)}` },
    // Pacific (UTC+10 to UTC+13)
    { key: "Pacific/Port_Moresby", text: `(UTC+10:00) ${u("port_moresby", e)}` },
    { key: "Pacific/Norfolk", text: `(UTC+11:00) ${u("norfolk", e)}` },
    { key: "Pacific/Guadalcanal", text: `(UTC+11:00) ${u("guadalcanal", e)}` },
    { key: "Pacific/Auckland", text: `(UTC+12:00) ${u("auckland", e)}` },
    { key: "Pacific/Fiji", text: `(UTC+12:00) ${u("fiji", e)}` },
    { key: "Pacific/Tongatapu", text: `(UTC+13:00) ${u("tongatapu", e)}` },
    { key: "Pacific/Apia", text: `(UTC+13:00) ${u("apia", e)}` }
  ];
}
const Bg = (e) => {
  const [t, r] = M(e.timezone), n = q(() => Ig(e.locale));
  return A(wt, {
    get title() {
      return u("timezone", e.locale);
    },
    width: 320,
    get buttons() {
      return [{
        children: u("confirm", e.locale),
        onClick: () => {
          e.onConfirm(t()), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      return A(Gn, {
        style: {
          width: "100%",
          "margin-top": "20px"
        },
        get value() {
          return t().text;
        },
        onSelected: (a) => {
          r(a);
        },
        get dataSource() {
          return n();
        },
        searchable: !0,
        get searchPlaceholder() {
          return u("Search Timezone", e.locale) || "Search timezone...";
        }
      });
    }
  });
};
function co(e) {
  return [
    {
      key: "candle.type",
      text: u("candle_type", e),
      component: "select",
      dataSource: [
        { key: "candle_solid", text: u("candle_solid", e) },
        { key: "candle_stroke", text: u("candle_stroke", e) },
        { key: "candle_up_stroke", text: u("candle_up_stroke", e) },
        { key: "candle_down_stroke", text: u("candle_down_stroke", e) },
        { key: "ohlc", text: u("ohlc", e) },
        { key: "area", text: u("area", e) }
      ]
    },
    {
      key: "candle.priceMark.last.show",
      text: u("last_price_show", e),
      component: "switch"
    },
    {
      key: "candle.priceMark.high.show",
      text: u("high_price_show", e),
      component: "switch"
    },
    {
      key: "candle.priceMark.low.show",
      text: u("low_price_show", e),
      component: "switch"
    },
    {
      key: "indicator.lastValueMark.show",
      text: u("indicator_last_value_show", e),
      component: "switch"
    },
    {
      key: "yAxis.type",
      text: u("price_axis_type", e),
      component: "select",
      dataSource: [
        { key: "normal", text: u("normal", e) },
        { key: "percentage", text: u("percentage", e) },
        { key: "log", text: u("log", e) }
      ]
    },
    {
      key: "yAxis.reverse",
      text: u("reverse_coordinate", e),
      component: "switch"
    },
    {
      key: "grid.show",
      text: u("grid_show", e),
      component: "switch"
    }
  ];
}
const Eg = /* @__PURE__ */ p('<div class="chart-style-color-picker"><button type="button" class="chart-style-color-swatch"></button></div>'), Fg = /* @__PURE__ */ p('<div class="chart-style-color-popover"><div class="chart-style-color-grid"></div></div>'), Ug = /* @__PURE__ */ p('<button type="button" class="chart-style-palette-color"></button>'), zg = /* @__PURE__ */ p('<div class="chart-style-line-control"><div class="chart-style-width-picker"><button type="button" class="chart-style-size-button"><span></span></button></div></div>'), Vg = /* @__PURE__ */ p('<div class="chart-style-width-popover"></div>'), Kg = /* @__PURE__ */ p('<button type="button"><span></span></button>'), Rg = /* @__PURE__ */ p('<div class="klinecharts-pro-setting-modal-title-tabs"><button type="button"></button><button type="button">Chart Style</button></div>'), jg = /* @__PURE__ */ p('<div class="klinecharts-pro-setting-modal-content"></div>'), Qg = /* @__PURE__ */ p('<div class="setting-item"><span class="setting-label"></span><div class="setting-control"></div></div>'), Zg = /* @__PURE__ */ p('<div class="klinecharts-pro-chart-style-content"><div class="chart-style-sidebar"><button type="button">Symbol</button><button type="button">Background</button></div><div class="chart-style-panel"><p class="chart-style-note">* Chart Style takes precedence over default chart settings. Click Reset to align with the default theme.</p></div></div>'), Hg = /* @__PURE__ */ p("<h3>Symbol</h3>"), Wg = /* @__PURE__ */ p('<div class="chart-style-row"><span>Candle Stick</span><div class="chart-style-color-pair"></div></div>'), qg = /* @__PURE__ */ p('<div class="chart-style-row"><span>Borders</span><div class="chart-style-color-pair"></div></div>'), Yg = /* @__PURE__ */ p('<div class="chart-style-row"><span>Wick</span><div class="chart-style-color-pair"></div></div>'), Gg = /* @__PURE__ */ p("<h3>Background</h3>"), Xg = /* @__PURE__ */ p('<div class="chart-style-row"><span>Color</span></div>'), Jg = /* @__PURE__ */ p('<div class="chart-style-row"><label class="chart-style-check-row"><input type="checkbox"><span class="chart-style-check-box" aria-hidden="true"></span><span>Vert Grid Lines</span></label></div>'), em = /* @__PURE__ */ p('<div class="chart-style-row"><label class="chart-style-check-row"><input type="checkbox"><span class="chart-style-check-box" aria-hidden="true"></span><span>Horz Grid Lines</span></label></div>'), k1 = "chart.backgroundColor", mn = "#171a27", tm = ["#f6465d", "#f59e0b", "#fcd535", "#2ebd85", "#4098a8", "#22c1dc", "#3861fb", "#7b3fe4", "#ec8aa4", "#f7c56b", "#fff0a3", "#9ed4a4", "#83c7bb", "#8bdce6", "#8bb9f7", "#b7a1dc", "#c9343e", "#e76f20", "#f0b93a", "#3f8d3a", "#236e5a", "#237c88", "#1d3fbf", "#3a209f", "#ffffff", "#cbd5e1", "#9ca3af", "#6b7280", "#374151", "#111827", "#000000"], nm = [{
  key: Ke.Solid,
  text: "Solid"
}, {
  key: Ke.Dashed,
  text: "Dashed"
}], rm = [1, 2, 3, 4], uo = [{
  key: "candle.type",
  text: "Candle Type"
}, {
  key: "candle.bar.upColor",
  text: "Up Color"
}, {
  key: "candle.bar.downColor",
  text: "Down Color"
}, {
  key: "candle.bar.noChangeColor",
  text: "No Change Color"
}, {
  key: "candle.bar.upBorderColor",
  text: "Border Up Color"
}, {
  key: "candle.bar.downBorderColor",
  text: "Border Down Color"
}, {
  key: "candle.bar.noChangeBorderColor",
  text: "Border No Change Color"
}, {
  key: "candle.bar.upWickColor",
  text: "Wick Up Color"
}, {
  key: "candle.bar.downWickColor",
  text: "Wick Down Color"
}, {
  key: "candle.bar.noChangeWickColor",
  text: "Wick No Change Color"
}, {
  key: k1,
  text: "Background Color"
}, {
  key: "grid.horizontal.show",
  text: "Horizontal Grids"
}, {
  key: "grid.horizontal.color",
  text: "Horizontal Grid Color"
}, {
  key: "grid.horizontal.style",
  text: "Horizontal Grid Style"
}, {
  key: "grid.horizontal.size",
  text: "Horizontal Grid Size"
}, {
  key: "grid.horizontal.dashedValue",
  text: "Horizontal Grid Dash"
}, {
  key: "grid.vertical.show",
  text: "Vertical Grids"
}, {
  key: "grid.vertical.color",
  text: "Vertical Grid Color"
}, {
  key: "grid.vertical.style",
  text: "Vertical Grid Style"
}, {
  key: "grid.vertical.size",
  text: "Vertical Grid Size"
}, {
  key: "grid.vertical.dashedValue",
  text: "Vertical Grid Dash"
}], e9 = (e, t = mn) => {
  const r = O.clone(e), n = O.formatValue(r, "candle.bar.upColor"), a = O.formatValue(r, "candle.bar.downColor"), s = O.formatValue(r, "candle.bar.noChangeColor");
  return Ie(r, "candle.bar.upBorderColor", O.formatValue(r, "candle.bar.upBorderColor", n)), Ie(r, "candle.bar.downBorderColor", O.formatValue(r, "candle.bar.downBorderColor", a)), Ie(r, "candle.bar.noChangeBorderColor", O.formatValue(r, "candle.bar.noChangeBorderColor", s)), Ie(r, "candle.bar.upWickColor", O.formatValue(r, "candle.bar.upWickColor", n)), Ie(r, "candle.bar.downWickColor", O.formatValue(r, "candle.bar.downWickColor", a)), Ie(r, "candle.bar.noChangeWickColor", O.formatValue(r, "candle.bar.noChangeWickColor", s)), Ie(r, "candle.bar.borderUpColor", O.formatValue(r, "candle.bar.borderUpColor", O.formatValue(r, "candle.bar.upBorderColor"))), Ie(r, "candle.bar.borderDownColor", O.formatValue(r, "candle.bar.borderDownColor", O.formatValue(r, "candle.bar.downBorderColor"))), Ie(r, "candle.bar.borderNoChangeColor", O.formatValue(r, "candle.bar.borderNoChangeColor", O.formatValue(r, "candle.bar.noChangeBorderColor"))), Ie(r, "candle.bar.wickUpColor", O.formatValue(r, "candle.bar.wickUpColor", O.formatValue(r, "candle.bar.upWickColor"))), Ie(r, "candle.bar.wickDownColor", O.formatValue(r, "candle.bar.wickDownColor", O.formatValue(r, "candle.bar.downWickColor"))), Ie(r, "candle.bar.wickNoChangeColor", O.formatValue(r, "candle.bar.wickNoChangeColor", O.formatValue(r, "candle.bar.noChangeWickColor"))), Ie(r, k1, t), r;
}, om = (e, t, r) => {
  if (t === k1)
    return r ?? mn;
  const a = {
    "candle.bar.upBorderColor": "candle.bar.upColor",
    "candle.bar.downBorderColor": "candle.bar.downColor",
    "candle.bar.noChangeBorderColor": "candle.bar.noChangeColor",
    "candle.bar.upWickColor": "candle.bar.upColor",
    "candle.bar.downWickColor": "candle.bar.downColor",
    "candle.bar.noChangeWickColor": "candle.bar.noChangeColor",
    "candle.bar.borderUpColor": "candle.bar.upBorderColor",
    "candle.bar.borderDownColor": "candle.bar.downBorderColor",
    "candle.bar.borderNoChangeColor": "candle.bar.noChangeBorderColor",
    "candle.bar.wickUpColor": "candle.bar.upWickColor",
    "candle.bar.wickDownColor": "candle.bar.downWickColor",
    "candle.bar.wickNoChangeColor": "candle.bar.noChangeWickColor"
  }[t];
  return a ? O.formatValue(e, a) : O.formatValue(e, t, O.formatValue(e9(e), t));
}, im = (e) => {
  const [t, r] = M(e.currentStyles), [n, a] = M(e9(e.currentStyles, e.currentBackgroundColor ?? mn)), [s, d] = M(co(e.locale)), [h, b] = M(!1), [x, v] = M("settings"), [w, B] = M("symbol"), [N, oe] = M(null), [V, R] = M(null), U = () => {
    b(window.innerWidth <= 768);
  };
  nr(() => {
    const T = (j) => {
      const Q = j.target;
      Q instanceof Element && (Q.closest(".chart-style-color-picker") || Q.closest(".chart-style-width-picker") || Q.closest(".klinecharts-pro-select") || (oe(null), R(null)));
    };
    U(), window.addEventListener("resize", U), document.addEventListener("mousedown", T), xt(() => {
      document.removeEventListener("mousedown", T);
    });
  }), xt(() => {
    window.removeEventListener("resize", U);
  }), Ze(() => {
    d(co(e.locale));
  });
  const he = (T, j) => {
    const Q = {};
    Ie(Q, T.key, j);
    const z = O.clone(t());
    Ie(z, T.key, j), r(z), d(s().map((le) => ({
      ...le
    }))), e.onChange(Q);
  }, Z = (T, j) => O.formatValue(n(), T, j), X = (T, j) => {
    const Q = O.clone(n());
    Ie(Q, T, j), a(Q), e.onChange(J(Q));
  }, J = (T) => {
    const j = O.formatValue(T, "candle.bar.upColor"), Q = O.formatValue(T, "candle.bar.downColor"), z = O.formatValue(T, "candle.bar.noChangeColor"), le = O.formatValue(T, "candle.bar.upBorderColor", j), ce = O.formatValue(T, "candle.bar.downBorderColor", Q), re = O.formatValue(T, "candle.bar.noChangeBorderColor", z), E = O.formatValue(T, "candle.bar.upWickColor", j), te = O.formatValue(T, "candle.bar.downWickColor", Q), P = O.formatValue(T, "candle.bar.noChangeWickColor", z);
    return {
      chart: {
        backgroundColor: O.formatValue(T, k1, mn)
      },
      candle: {
        type: O.formatValue(T, "candle.type"),
        bar: {
          upColor: j,
          downColor: Q,
          noChangeColor: z,
          upBorderColor: le,
          downBorderColor: ce,
          noChangeBorderColor: re,
          upWickColor: E,
          downWickColor: te,
          noChangeWickColor: P,
          borderUpColor: le,
          borderDownColor: ce,
          borderNoChangeColor: re,
          wickUpColor: E,
          wickDownColor: te,
          wickNoChangeColor: P
        }
      },
      grid: {
        horizontal: {
          show: !!O.formatValue(T, "grid.horizontal.show"),
          color: O.formatValue(T, "grid.horizontal.color"),
          style: O.formatValue(T, "grid.horizontal.style"),
          size: Number(O.formatValue(T, "grid.horizontal.size", 1)),
          dashedValue: O.formatValue(T, "grid.horizontal.dashedValue", [2, 2])
        },
        vertical: {
          show: !!O.formatValue(T, "grid.vertical.show"),
          color: O.formatValue(T, "grid.vertical.color"),
          style: O.formatValue(T, "grid.vertical.style"),
          size: Number(O.formatValue(T, "grid.vertical.size", 1)),
          dashedValue: O.formatValue(T, "grid.vertical.dashedValue", [2, 2])
        }
      }
    };
  }, ve = () => {
    var j;
    const T = J(n());
    r(O.clone(n())), e.onChange(T), (j = e.onSaveChartStyle) == null || j.call(e, T), e.onClose();
  }, W = () => {
    var j;
    (j = e.onResetChartStyle) == null || j.call(e);
    const T = e.defaultStyles;
    if (T) {
      const Q = O.clone(n());
      uo.forEach((z) => {
        Ie(Q, z.key, om(T, z.key, e.defaultBackgroundColor));
      }), a(Q), r(O.clone(Q)), e.onChange(J(Q));
    } else
      e.onRestoreDefault(uo), a(O.clone(e.currentStyles));
  }, H = (T, j = T) => {
    const Q = Z(T, "#ffffff");
    return (() => {
      const z = Eg.cloneNode(!0), le = z.firstChild;
      return le.$$click = () => {
        oe(N() === j ? null : j);
      }, le.style.setProperty("background", Q), C(z, (() => {
        const ce = q(() => N() === j);
        return () => ce() && (() => {
          const re = Fg.cloneNode(!0), E = re.firstChild;
          return C(E, A(_1, {
            each: tm,
            children: (te) => (() => {
              const P = Ug.cloneNode(!0);
              return P.$$click = () => {
                X(T, te), oe(null);
              }, P.style.setProperty("background", te), K(() => P.classList.toggle("selected", te.toLowerCase() === Q.toLowerCase())), P;
            })()
          })), re;
        })();
      })(), null), z;
    })();
  }, ee = (T) => {
    const j = `${T}.style`, Q = `${T}.color`, z = `${T}.size`, le = Z(j, Ke.Dashed), ce = Math.max(1, Number(Z(z, 1)));
    return (() => {
      const re = zg.cloneNode(!0), E = re.firstChild, te = E.firstChild, P = te.firstChild;
      return C(re, A(Gn, {
        get style() {
          return {
            width: h() ? "100%" : "134px"
          };
        },
        get value() {
          return le === Ke.Solid ? "Solid" : "Dashed";
        },
        dataSource: nm,
        onSelected: (I) => {
          const F = I.key;
          X(j, F), X(`${T}.dashedValue`, F === Ke.Solid ? [] : [2, 2]);
        }
      }), E), te.$$click = () => {
        R(V() === z ? null : z);
      }, P.style.setProperty("height", `${ce}px`), C(E, (() => {
        const I = q(() => V() === z);
        return () => I() && (() => {
          const F = Vg.cloneNode(!0);
          return C(F, A(_1, {
            each: rm,
            children: (ye) => (() => {
              const Te = Kg.cloneNode(!0), Ce = Te.firstChild;
              return Te.$$click = () => {
                X(z, ye), R(null);
              }, Te.classList.toggle("selected", ce === ye), Ce.style.setProperty("height", `${ye}px`), Te;
            })()
          })), F;
        })();
      })(), null), C(re, () => H(Q), null), re;
    })();
  }, se = (() => {
    const T = Rg.cloneNode(!0), j = T.firstChild, Q = j.nextSibling;
    return j.$$click = () => v("settings"), C(j, () => u("setting", e.locale)), Q.$$click = () => v("chartStyle"), K((z) => {
      const le = x() === "settings", ce = x() === "chartStyle";
      return le !== z._v$ && j.classList.toggle("active", z._v$ = le), ce !== z._v$2 && Q.classList.toggle("active", z._v$2 = ce), z;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), T;
  })();
  return A(wt, {
    title: se,
    get width() {
      return x() === "chartStyle" ? 760 : 690;
    },
    get btnParentStyle() {
      return {
        display: "flex",
        "justify-content": x() === "chartStyle" ? "flex-end" : "center",
        ...x() === "chartStyle" ? {
          padding: "12px 20px 18px 20px"
        } : {}
      };
    },
    get minButtonWidth() {
      return x() === "chartStyle" ? 170 : 200;
    },
    get isMobile() {
      return h();
    },
    get buttons() {
      return q(() => x() === "settings")() ? [{
        children: u("restore_default", e.locale),
        onClick: () => {
          e.onRestoreDefault(s()), e.onClose();
        }
      }] : [{
        type: "cancel",
        class: "chart-style-action-button",
        children: "Reset",
        onClick: W
      }, {
        class: "chart-style-action-button",
        children: "Save",
        onClick: ve
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      return q(() => x() === "settings")() ? (() => {
        const T = jg.cloneNode(!0);
        return C(T, A(_1, {
          get each() {
            return s();
          },
          children: (j) => {
            let Q;
            const z = O.formatValue(t(), j.key);
            switch (j.component) {
              case "select": {
                const le = j.key === "candle.type" ? "170px" : "120px";
                Q = A(Gn, {
                  get style() {
                    return {
                      width: h() ? "100%" : le,
                      "min-width": h() ? "auto" : le
                    };
                  },
                  get value() {
                    return u(z, e.locale);
                  },
                  get dataSource() {
                    return j.dataSource;
                  },
                  onSelected: (ce) => {
                    const re = ce.key;
                    he(j, re);
                  }
                });
                break;
              }
              case "switch": {
                const le = !!z;
                Q = A(uc, {
                  open: le,
                  onChange: () => {
                    he(j, !le);
                  }
                });
                break;
              }
            }
            return (() => {
              const le = Qg.cloneNode(!0), ce = le.firstChild, re = ce.nextSibling;
              return C(ce, () => j.text), C(re, Q), K(() => le.classList.toggle("mobile-item", !!h())), le;
            })();
          }
        })), K(() => T.classList.toggle("mobile-layout", !!h())), T;
      })() : (() => {
        const T = Zg.cloneNode(!0), j = T.firstChild, Q = j.firstChild, z = Q.nextSibling, le = j.nextSibling, ce = le.firstChild;
        return Q.$$click = () => B("symbol"), z.$$click = () => B("background"), C(le, (() => {
          const re = q(() => w() === "symbol");
          return () => re() ? [Hg.cloneNode(!0), (() => {
            const E = Wg.cloneNode(!0), te = E.firstChild, P = te.nextSibling;
            return C(P, () => H("candle.bar.upColor", "candle-stick-up"), null), C(P, () => H("candle.bar.downColor", "candle-stick-down"), null), E;
          })(), (() => {
            const E = qg.cloneNode(!0), te = E.firstChild, P = te.nextSibling;
            return C(P, () => H("candle.bar.upBorderColor", "border-up"), null), C(P, () => H("candle.bar.downBorderColor", "border-down"), null), E;
          })(), (() => {
            const E = Yg.cloneNode(!0), te = E.firstChild, P = te.nextSibling;
            return C(P, () => H("candle.bar.upWickColor", "wick-up"), null), C(P, () => H("candle.bar.downWickColor", "wick-down"), null), E;
          })()] : [Gg.cloneNode(!0), (() => {
            const E = Xg.cloneNode(!0);
            return E.firstChild, C(E, () => H(k1, "chart-background"), null), E;
          })(), (() => {
            const E = Jg.cloneNode(!0), te = E.firstChild, P = te.firstChild;
            return P.addEventListener("change", (I) => X("grid.vertical.show", I.currentTarget.checked)), C(E, () => ee("grid.vertical"), null), K(() => P.checked = !!Z("grid.vertical.show")), E;
          })(), (() => {
            const E = em.cloneNode(!0), te = E.firstChild, P = te.firstChild;
            return P.addEventListener("change", (I) => X("grid.horizontal.show", I.currentTarget.checked)), C(E, () => ee("grid.horizontal"), null), K(() => P.checked = !!Z("grid.horizontal.show")), E;
          })()];
        })(), ce), K((re) => {
          const E = !!h(), te = w() === "symbol", P = w() === "background";
          return E !== re._v$3 && T.classList.toggle("mobile-layout", re._v$3 = E), te !== re._v$4 && Q.classList.toggle("active", re._v$4 = te), P !== re._v$5 && z.classList.toggle("active", re._v$5 = P), re;
        }, {
          _v$3: void 0,
          _v$4: void 0,
          _v$5: void 0
        }), T;
      })();
    }
  });
};
He(["click"]);
const am = /* @__PURE__ */ p('<img style="width:500px;margin-top: 20px">'), sm = (e) => A(wt, {
  get title() {
    return u("screenshot", e.locale);
  },
  width: 540,
  get buttons() {
    return [{
      type: "confirm",
      children: u("save", e.locale),
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
    const t = am.cloneNode(!0);
    return K(() => Ee(t, "src", e.url)), t;
  }
}), lm = {
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
}, cm = /* @__PURE__ */ p('<div class="klinecharts-pro-indicator-setting-modal-content"></div>'), um = /* @__PURE__ */ p("<span></span>"), dm = (e) => {
  const [t, r] = M(O.clone(e.params.calcParams)), n = (a) => lm[a];
  return A(wt, {
    get title() {
      return e.params.indicatorName;
    },
    width: 360,
    get buttons() {
      return [{
        type: "confirm",
        children: u("confirm", e.locale),
        onClick: () => {
          const a = n(e.params.indicatorName), s = [];
          O.clone(t()).forEach((d, h) => {
            !O.isValid(d) || d === "" ? "default" in a[h] && s.push(a[h].default) : s.push(d);
          }), e.onConfirm(s), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      const a = cm.cloneNode(!0);
      return C(a, () => n(e.params.indicatorName).map((s, d) => [(() => {
        const h = um.cloneNode(!0);
        return C(h, () => u(s.paramNameKey, e.locale)), h;
      })(), A(Xo, {
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
        onChange: (h) => {
          const b = O.clone(t());
          b[d] = h, r(b);
        }
      })])), a;
    }
  });
}, hm = /* @__PURE__ */ p('<svg viewBox="0 0 1024 1024"><path d="M945.066667 898.133333l-189.866667-189.866666c55.466667-64 87.466667-149.333333 87.466667-241.066667 0-204.8-168.533333-373.333333-373.333334-373.333333S96 264.533333 96 469.333333 264.533333 842.666667 469.333333 842.666667c91.733333 0 174.933333-34.133333 241.066667-87.466667l189.866667 189.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c8.533333-12.8 8.533333-34.133333-2.133333-46.933334zM469.333333 778.666667C298.666667 778.666667 160 640 160 469.333333S298.666667 160 469.333333 160 778.666667 298.666667 778.666667 469.333333 640 778.666667 469.333333 778.666667z"></path></svg>'), fm = /* @__PURE__ */ p('<img alt="symbol">'), gm = /* @__PURE__ */ p("<li><div><span></span></div></li>"), mm = (e) => {
  const [t, r] = M(""), [n] = ti(t, e.datafeed.searchSymbols.bind(e.datafeed));
  return A(wt, {
    get title() {
      return u("symbol_search", e.locale);
    },
    width: 460,
    get onClose() {
      return e.onClose;
    },
    get children() {
      return [A(Xo, {
        class: "klinecharts-pro-symbol-search-modal-input",
        get placeholder() {
          return u("symbol_code", e.locale);
        },
        get suffix() {
          return hm.cloneNode(!0);
        },
        get value() {
          return t();
        },
        onChange: (a) => {
          const s = `${a}`;
          r(s);
        }
      }), A(gn, {
        class: "klinecharts-pro-symbol-search-modal-list",
        get loading() {
          return n.loading;
        },
        get dataSource() {
          return n() ?? [];
        },
        renderItem: (a) => (() => {
          const s = gm.cloneNode(!0), d = s.firstChild, h = d.firstChild;
          return s.$$click = () => {
            e.onSymbolSelected(a), e.onClose();
          }, C(d, A(de, {
            get when() {
              return a.logo;
            },
            get children() {
              const b = fm.cloneNode(!0);
              return K(() => Ee(b, "src", a.logo)), b;
            }
          }), h), C(h, () => a.shortName ?? a.ticker, null), C(h, () => `${a.name ? `(${a.name})` : ""}`, null), C(s, () => a.exchange ?? "", null), K(() => Ee(h, "title", a.name ?? "")), s;
        })()
      })];
    }
  });
};
He(["click"]);
const ym = /* @__PURE__ */ p('<div class="klinecharts-pro-mobile-more-modal-content"><div class="item"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div><div class="item"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path></svg><span></span></div><div class="item"><svg viewBox="0 0 20 20"><rect x="3" y="4" width="14" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"></rect><path d="M6 2.5v4M14 2.5v4M3 8h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M10 11v3l2.2 1.3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg><span>Time Tools</span></div><div class="item"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg><span></span></div></div>'), Cm = (e) => A(wt, {
  get title() {
    return u("more", e.locale);
  },
  isMobile: !0,
  get onClose() {
    return e.onClose;
  },
  get children() {
    const t = ym.cloneNode(!0), r = t.firstChild, n = r.firstChild, a = n.nextSibling, s = r.nextSibling, d = s.firstChild, h = d.nextSibling, b = s.nextSibling, x = b.nextSibling, v = x.firstChild, w = v.nextSibling;
    return r.$$click = () => {
      e.onIndicatorClick(), e.onClose();
    }, C(a, () => u("indicator", e.locale)), s.$$click = () => {
      e.onTimezoneClick(), e.onClose();
    }, C(h, () => u("timezone", e.locale)), b.$$click = () => {
      e.onTimeToolsClick(), e.onClose();
    }, x.$$click = () => {
      e.onSettingClick(), e.onClose();
    }, C(w, () => u("setting", e.locale)), t;
  }
});
He(["click"]);
const pm = /* @__PURE__ */ p('<div class="klinecharts-pro-time-tools-picker"></div>'), vm = /* @__PURE__ */ p('<label class="klinecharts-pro-time-tools-field"><button type="button" class="klinecharts-pro-time-tools-input"><span></span><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M8 3v4M16 3v4M4 10h16"></path></svg></button></label>'), bm = /* @__PURE__ */ p("<span></span>"), $m = /* @__PURE__ */ p('<div class="klinecharts-pro-time-tools-calendar"><div class="klinecharts-pro-time-tools-month"><button type="button">&lt;&lt;</button><button type="button">&lt;</button><button type="button" class="calendar-title"></button><button type="button">></button><button type="button">>></button></div></div>'), _m = /* @__PURE__ */ p('<div class="klinecharts-pro-time-tools-grid"></div>'), km = /* @__PURE__ */ p('<span class="weekday"></span>'), Dt = /* @__PURE__ */ p('<button type="button"></button>'), xm = /* @__PURE__ */ p('<div class="klinecharts-pro-time-tools-month-grid"></div>'), Lm = /* @__PURE__ */ p('<div class="klinecharts-pro-time-tools-month-grid year-grid"></div>'), wm = /* @__PURE__ */ p('<div class="klinecharts-pro-time-tools-spinners"><div class="spinner-column scrollable"></div><div class="spinner-column scrollable"></div><div class="spinner-column"></div></div>'), Am = /* @__PURE__ */ p('<div class="klinecharts-pro-time-tools-content"></div>'), Tm = /* @__PURE__ */ p('<div class="klinecharts-pro-time-tools-tabs"></div>'), Mm = /* @__PURE__ */ p('<div class="klinecharts-pro-time-tools-range-panel"><div class="klinecharts-pro-time-tools-range-header"><button type="button"></button><span class="klinecharts-pro-time-tools-range-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg></span><button type="button"></button><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M8 3v4M16 3v4M4 10h16"></path></svg></div></div>'), Sm = /* @__PURE__ */ p('<div class="klinecharts-pro-time-tools-panel"><div class="klinecharts-pro-time-tools-row"><div><strong>Time Anchor</strong><span>Anchor to a time on the chart when switching between intervals</span></div><button type="button"><span></span></button></div><div><div><strong>Anchor Point</strong></div><select><option value="date">Date</option><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option></select></div><div><div><strong>Anchor line</strong><span>Mark the anchored time on the chart with a vertical line</span></div><button type="button"><span></span></button></div><div><div><strong>Across Tokens</strong><span>Retain onscreen chart range when switching symbols</span></div><button type="button"><span></span></button></div></div>'), Pm = /* @__PURE__ */ p('<div class="klinecharts-pro-time-tools-anchor-date"></div>'), Dm = [{
  key: "goToDate",
  label: "Go to Date"
}, {
  key: "timeRange",
  label: "Time Range"
}, {
  key: "timeAnchor",
  label: "Time Anchor"
}], Om = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], ho = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Wt = (e) => String(e).padStart(2, "0"), fo = (e, t, r) => Math.min(r, new Date(e, t + 1, 0).getDate()), Un = (e) => {
  const t = new Date(e);
  return {
    year: t.getFullYear(),
    month: t.getMonth(),
    day: t.getDate(),
    hour: t.getHours(),
    minute: t.getMinutes()
  };
}, en = (e) => new Date(e.year, e.month, e.day, e.hour, e.minute, 0, 0).getTime(), zn = (e) => e.year * 1e4 + (e.month + 1) * 100 + e.day, Jn = (e) => {
  const t = e.hour >= 12 ? "PM" : "AM", r = e.hour % 12 || 12;
  return `${Wt(e.month + 1)}/${Wt(e.day)}/${e.year} ${Wt(r)}:${Wt(e.minute)} ${t}`;
}, Nm = (e, t) => {
  const r = new Date(e, t, 1).getDay(), n = new Date(e, t + 1, 0).getDate(), a = new Date(e, t, 0).getDate(), s = [];
  for (let d = r - 1; d >= 0; d -= 1)
    s.push({
      date: new Date(e, t - 1, a - d),
      current: !1
    });
  for (let d = 1; d <= n; d += 1)
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
}, tn = (e) => {
  const [t, r] = M(!0), [n, a] = M("date"), [s, d] = M(e.value.year), [h, b] = M(e.value.month), x = q(() => Nm(s(), h())), v = q(() => Math.floor(s() / 10) * 10), w = q(() => Array.from({
    length: 12
  }, (W, H) => v() - 1 + H)), B = q(() => e.value.hour % 12 || 12), N = q(() => e.value.hour >= 12 ? "PM" : "AM"), oe = Array.from({
    length: 12
  }, (W, H) => H + 1), V = Array.from({
    length: 60
  }, (W, H) => H), R = (W) => {
    const H = new Date(s(), h() + W, 1);
    d(H.getFullYear()), b(H.getMonth());
  }, U = () => {
    n() === "date" ? a("month") : n() === "month" && a("year");
  }, he = (W) => {
    var H;
    e.onChange({
      ...e.value,
      year: W.getFullYear(),
      month: W.getMonth(),
      day: W.getDate()
    }), (H = e.onDateSelect) == null || H.call(e), d(W.getFullYear()), b(W.getMonth());
  }, Z = (W) => {
    b(W), e.onChange({
      ...e.value,
      year: s(),
      month: W,
      day: fo(s(), W, e.value.day)
    }), a("date");
  }, X = (W) => {
    d(W), e.onChange({
      ...e.value,
      year: W,
      day: fo(W, e.value.month, e.value.day)
    }), a("month");
  }, J = (W) => {
    const H = N() === "PM";
    e.onChange({
      ...e.value,
      hour: H ? W === 12 ? 12 : W + 12 : W === 12 ? 0 : W
    });
  }, ve = (W) => {
    const H = B();
    e.onChange({
      ...e.value,
      hour: W === "PM" ? H === 12 ? 12 : H + 12 : H === 12 ? 0 : H
    });
  };
  return (() => {
    const W = pm.cloneNode(!0);
    return C(W, (() => {
      const H = q(() => e.showInput !== !1);
      return () => H() && (() => {
        const ee = vm.cloneNode(!0), se = ee.firstChild, T = se.firstChild;
        return C(ee, (() => {
          const j = q(() => !!e.label);
          return () => j() && (() => {
            const Q = bm.cloneNode(!0);
            return C(Q, () => e.label), Q;
          })();
        })(), se), se.$$click = () => r(!t()), C(T, () => Jn(e.value)), ee;
      })();
    })(), null), C(W, (() => {
      const H = q(() => !!t());
      return () => H() && (() => {
        const ee = $m.cloneNode(!0), se = ee.firstChild, T = se.firstChild, j = T.nextSibling, Q = j.nextSibling, z = Q.nextSibling, le = z.nextSibling;
        return T.$$click = () => {
          n() === "year" ? d(s() - 10) : n() === "month" ? d(s() - 1) : R(-12);
        }, j.$$click = () => {
          n() === "year" ? d(s() - 10) : n() === "month" ? d(s() - 1) : R(-1);
        }, Q.$$click = U, C(Q, (() => {
          const ce = q(() => n() === "year");
          return () => ce() ? `${v()}-${v() + 9}` : (() => {
            const re = q(() => n() === "month");
            return () => re() ? s() : `${ho[h()]} ${s()}`;
          })();
        })()), z.$$click = () => {
          n() === "year" ? d(s() + 10) : n() === "month" ? d(s() + 1) : R(1);
        }, le.$$click = () => {
          n() === "year" ? d(s() + 10) : n() === "month" ? d(s() + 1) : R(12);
        }, C(ee, (() => {
          const ce = q(() => n() === "date");
          return () => ce() && (() => {
            const re = _m.cloneNode(!0);
            return C(re, () => Om.map((E) => (() => {
              const te = km.cloneNode(!0);
              return C(te, E), te;
            })()), null), C(re, () => x().map(({
              date: E,
              current: te
            }) => {
              const P = zn({
                year: E.getFullYear(),
                month: E.getMonth(),
                day: E.getDate()
              }), I = e.range ? zn(e.range.from) : NaN, F = e.range ? zn(e.range.to) : NaN, ye = Math.min(I, F), Te = Math.max(I, F), Ce = Number.isFinite(ye) && P >= ye && P <= Te, Ue = Number.isFinite(ye) && (P === ye || P === Te), k = E.getFullYear() === e.value.year && E.getMonth() === e.value.month && E.getDate() === e.value.day;
              return (() => {
                const pe = Dt.cloneNode(!0);
                return pe.$$click = () => he(E), ge(pe, `${te ? "" : "muted"} ${Ce ? "in-range" : ""} ${Ue || k ? "selected" : ""}`), C(pe, () => E.getDate()), pe;
              })();
            }), null), re;
          })();
        })(), null), C(ee, (() => {
          const ce = q(() => n() === "month");
          return () => ce() && (() => {
            const re = xm.cloneNode(!0);
            return C(re, () => ho.map((E, te) => (() => {
              const P = Dt.cloneNode(!0);
              return P.$$click = () => Z(te), C(P, E), K(() => ge(P, te === e.value.month && s() === e.value.year ? "selected" : "")), P;
            })())), re;
          })();
        })(), null), C(ee, (() => {
          const ce = q(() => n() === "year");
          return () => ce() && (() => {
            const re = Lm.cloneNode(!0);
            return C(re, () => w().map((E) => (() => {
              const te = Dt.cloneNode(!0);
              return te.$$click = () => X(E), C(te, E), K(() => ge(te, `${E < v() || E > v() + 9 ? "muted" : ""} ${E === e.value.year ? "selected" : ""}`)), te;
            })())), re;
          })();
        })(), null), C(ee, (() => {
          const ce = q(() => n() === "date");
          return () => ce() && (() => {
            const re = wm.cloneNode(!0), E = re.firstChild, te = E.nextSibling, P = te.nextSibling;
            return C(E, () => oe.map((I) => (() => {
              const F = Dt.cloneNode(!0);
              return F.$$click = () => J(I), C(F, () => Wt(I)), K(() => ge(F, I === B() ? "selected" : "")), F;
            })())), C(te, () => V.map((I) => (() => {
              const F = Dt.cloneNode(!0);
              return F.$$click = () => e.onChange({
                ...e.value,
                minute: I
              }), C(F, () => Wt(I)), K(() => ge(F, I === e.value.minute ? "selected" : "")), F;
            })())), C(P, () => ["AM", "PM"].map((I) => (() => {
              const F = Dt.cloneNode(!0);
              return F.$$click = () => ve(I), C(F, I), K(() => ge(F, I === N() ? "selected" : "")), F;
            })())), re;
          })();
        })(), null), ee;
      })();
    })(), null), W;
  })();
}, Im = (e) => {
  const [t, r] = M(e.initialTab ?? "goToDate"), [n, a] = M(Un(e.initialTimestamp)), [s, d] = M(Un(e.initialRange.from)), [h, b] = M(Un(e.initialRange.to)), [x, v] = M("from"), [w, B] = M({
    ...e.anchorSettings,
    anchorLine: e.anchorSettings.anchorLine ?? !0,
    acrossTokens: e.anchorSettings.acrossTokens ?? !0
  }), N = (V) => {
    B((R) => ({
      ...R,
      ...V
    }));
  }, oe = () => {
    const V = t();
    if (V === "goToDate")
      e.onGoToDate(en(n()));
    else if (V === "timeRange") {
      const R = en(s()), U = en(h());
      e.onTimeRange(R <= U ? {
        from: R,
        to: U
      } : {
        from: U,
        to: R
      });
    } else {
      const R = w();
      e.onTimeAnchorChange({
        ...R,
        timestamp: R.anchorPoint === "date" ? en(n()) : R.timestamp
      });
    }
    e.onClose();
  };
  return A(wt, {
    width: 620,
    get title() {
      return (() => {
        const V = Tm.cloneNode(!0);
        return C(V, () => Dm.map((R) => (() => {
          const U = Dt.cloneNode(!0);
          return U.$$click = () => r(R.key), C(U, () => R.label), K(() => ge(U, t() === R.key ? "active" : "")), U;
        })())), V;
      })();
    },
    get buttons() {
      return [{
        children: "Close",
        type: "cancel",
        onClick: e.onClose
      }, {
        children: "Confirm",
        onClick: oe
      }];
    },
    get onClose() {
      return e.onClose;
    },
    minButtonWidth: 112,
    get children() {
      const V = Am.cloneNode(!0);
      return C(V, (() => {
        const R = q(() => t() === "goToDate");
        return () => R() && A(tn, {
          label: "",
          get value() {
            return n();
          },
          onChange: a
        });
      })(), null), C(V, (() => {
        const R = q(() => t() === "timeRange");
        return () => R() && (() => {
          const U = Mm.cloneNode(!0), he = U.firstChild, Z = he.firstChild, X = Z.nextSibling, J = X.nextSibling;
          return Z.$$click = () => v("from"), C(Z, () => Jn(s())), J.$$click = () => v("to"), C(J, () => Jn(h())), C(U, (() => {
            const ve = q(() => x() === "from");
            return () => ve() ? A(tn, {
              label: "Start",
              get value() {
                return s();
              },
              onChange: d,
              onDateSelect: () => v("to"),
              showInput: !1,
              get range() {
                return {
                  from: s(),
                  to: h()
                };
              }
            }) : A(tn, {
              label: "End",
              get value() {
                return h();
              },
              onChange: b,
              showInput: !1,
              get range() {
                return {
                  from: s(),
                  to: h()
                };
              }
            });
          })(), null), K((ve) => {
            const W = x() === "from" ? "active" : "", H = x() === "to" ? "active" : "";
            return W !== ve._v$ && ge(Z, ve._v$ = W), H !== ve._v$2 && ge(J, ve._v$2 = H), ve;
          }, {
            _v$: void 0,
            _v$2: void 0
          }), U;
        })();
      })(), null), C(V, (() => {
        const R = q(() => t() === "timeAnchor");
        return () => R() && (() => {
          const U = Sm.cloneNode(!0), he = U.firstChild, Z = he.firstChild, X = Z.nextSibling, J = he.nextSibling, ve = J.firstChild, W = ve.nextSibling, H = J.nextSibling, ee = H.firstChild, se = ee.nextSibling, T = H.nextSibling, j = T.firstChild, Q = j.nextSibling;
          return X.$$click = () => N({
            enabled: !w().enabled
          }), W.addEventListener("change", (z) => N({
            anchorPoint: z.currentTarget.value
          })), C(U, (() => {
            const z = q(() => !!(w().enabled && w().anchorPoint === "date"));
            return () => z() && (() => {
              const le = Pm.cloneNode(!0);
              return C(le, A(tn, {
                label: "Anchor date",
                get value() {
                  return n();
                },
                onChange: a
              })), le;
            })();
          })(), H), se.$$click = () => N({
            anchorLine: !w().anchorLine
          }), Q.$$click = () => N({
            acrossTokens: !w().acrossTokens
          }), K((z) => {
            const le = `klinecharts-pro-time-tools-switch${w().enabled ? " on" : ""}`, ce = `klinecharts-pro-time-tools-row${w().enabled ? "" : " disabled"}`, re = !w().enabled, E = `klinecharts-pro-time-tools-row with-divider${w().enabled ? "" : " disabled"}`, te = `klinecharts-pro-time-tools-switch${w().anchorLine ? " on" : ""}`, P = !w().enabled, I = `klinecharts-pro-time-tools-row with-divider${w().enabled ? "" : " disabled"}`, F = `klinecharts-pro-time-tools-switch${w().acrossTokens ? " on" : ""}`, ye = !w().enabled;
            return le !== z._v$3 && ge(X, z._v$3 = le), ce !== z._v$4 && ge(J, z._v$4 = ce), re !== z._v$5 && (W.disabled = z._v$5 = re), E !== z._v$6 && ge(H, z._v$6 = E), te !== z._v$7 && ge(se, z._v$7 = te), P !== z._v$8 && (se.disabled = z._v$8 = P), I !== z._v$9 && ge(T, z._v$9 = I), F !== z._v$10 && ge(Q, z._v$10 = F), ye !== z._v$11 && (Q.disabled = z._v$11 = ye), z;
          }, {
            _v$3: void 0,
            _v$4: void 0,
            _v$5: void 0,
            _v$6: void 0,
            _v$7: void 0,
            _v$8: void 0,
            _v$9: void 0,
            _v$10: void 0,
            _v$11: void 0
          }), K(() => W.value = w().anchorPoint), U;
        })();
      })(), null), V;
    }
  });
};
He(["click"]);
const Bm = /* @__PURE__ */ p('<i class="icon-close klinecharts-pro-load-icon"></i>'), Em = /* @__PURE__ */ p('<div class="klinecharts-pro-content"><button type="button" class="klinecharts-pro-auto-scale-button" title="Auto Scale (automatically candles resizing)">auto</button><div class="klinecharts-pro-widget"></div></div>'), Fm = /* @__PURE__ */ p('<div class="klinecharts-pro-time-anchor-line"></div>'), Um = /* @__PURE__ */ p('<div class="klinecharts-pro-time-navigation-tooltip"></div>'), zm = /* @__PURE__ */ p('<div class="klinecharts-pro-countdown-price-mark"><span class="klinecharts-pro-countdown-price-mark-price"></span><span class="klinecharts-pro-countdown-price-mark-timer"></span></div>'), Vm = /* @__PURE__ */ p('<div class="overlay-toolbar-color-popover"><div class="overlay-toolbar-color-grid"></div><div class="overlay-toolbar-color-footer"><button type="button" class="overlay-toolbar-add-color">+</button><div class="overlay-toolbar-color-slider"><span></span></div></div></div>'), Km = /* @__PURE__ */ p('<div class="overlay-toolbar-dropdown width-menu"></div>'), Rm = /* @__PURE__ */ p('<div class="overlay-toolbar-dropdown style-menu"><button type="button"><span class="overlay-toolbar-style-sample solid"></span></button><button type="button"><span class="overlay-toolbar-style-sample dashed"></span></button><button type="button"><span class="overlay-toolbar-style-sample dotted"></span></button></div>'), jm = /* @__PURE__ */ p('<div class="klinecharts-pro-overlay-toolbar"><button type="button" class="overlay-toolbar-icon drag" title="Move"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="6" r="1.5"></circle><circle cx="15" cy="6" r="1.5"></circle><circle cx="9" cy="12" r="1.5"></circle><circle cx="15" cy="12" r="1.5"></circle><circle cx="9" cy="18" r="1.5"></circle><circle cx="15" cy="18" r="1.5"></circle></svg></button><button type="button" class="overlay-toolbar-icon refresh" title="Reset"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 15.4-6.36L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-15.4 6.36L3 16"></path><path d="M3 21v-5h5"></path></svg></button><div class="overlay-toolbar-picker"><button type="button" title="Color"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg></button></div><div class="overlay-toolbar-picker"><button type="button" title="Line width"><span class="overlay-toolbar-line-preview"></span><span>px</span></button></div><div class="overlay-toolbar-picker"><button type="button" title="Line style"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16"></path></svg></button></div><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2"></rect><path d="M20 4 4 20"></path></svg></button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg></button><button type="button" class="overlay-toolbar-icon delete" title="Delete"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6 18 20H6L5 6"></path><path d="M10 11v5"></path><path d="M14 11v5"></path></svg></button></div>'), Qm = /* @__PURE__ */ p('<button type="button"></button>'), Zm = /* @__PURE__ */ p('<button type="button"><span class="overlay-toolbar-width-sample"></span></button>'), Hm = /* @__PURE__ */ p('<div class="klinecharts-pro-quick-order-marker"><button type="button" class="klinecharts-pro-quick-order-plus"></button></div>'), Wm = /* @__PURE__ */ p('<span class="klinecharts-pro-quick-order-plus-icon"></span>'), qm = /* @__PURE__ */ p('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" aria-hidden="true"><path d="M460-300h40v-160h160v-40H500v-160h-40v160H300v40h160v160ZM224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h510.76q27.62 0 46.12 18.5Q800-763 800-735.38v510.76q0 27.62-18.5 46.12Q763-160 735.38-160H224.62Zm0-40h510.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-510.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69H224.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v510.76q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69ZM200-760v560-560Z"></path></svg>'), Ym = /* @__PURE__ */ p('<div class="klinecharts-pro-quick-order-menu-anchor"><div class="klinecharts-pro-quick-order-menu"><button type="button">Trade <!> @ <!> Limit</button><button type="button">Trade <!> @ <!> Stop</button><button type="button">Create new order...</button><button type="button">Copy Price (<!>)</button><button type="button">Draw horizontal line on </button></div></div>');
Cc();
const Vn = "klinecharts_pro_chart_style", Kn = "klinecharts_pro_chart_background_color", er = "klinecharts_pro_time_anchor_settings";
function t9() {
  return {
    enabled: !1,
    timestamp: Date.now(),
    anchorPoint: "date",
    anchorLine: !0,
    acrossTokens: !0
  };
}
function Gm() {
  try {
    const e = window.localStorage.getItem(er);
    if (!e)
      return null;
    const t = JSON.parse(e);
    if (t.enabled !== !0 || t.acrossTokens !== !0 || !Number.isFinite(t.timestamp))
      return null;
    const r = t9();
    return {
      ...r,
      ...t,
      timestamp: Number(t.timestamp),
      anchorPoint: t.anchorPoint ?? r.anchorPoint,
      anchorLine: t.anchorLine ?? r.anchorLine,
      acrossTokens: !0,
      enabled: !0
    };
  } catch {
    return null;
  }
}
function go(e) {
  try {
    if (!e.enabled || !e.acrossTokens) {
      window.localStorage.removeItem(er);
      return;
    }
    window.localStorage.setItem(er, JSON.stringify(e));
  } catch {
  }
}
function nn(e, t, r, n) {
  t === "VOL" && (n = {
    gap: {
      bottom: 2
    },
    ...n
  });
  const a = (e == null ? void 0 : e.createIndicator({
    name: t,
    // @ts-expect-error
    createTooltipDataSource: ({
      indicator: s,
      defaultStyles: d
    }) => {
      const h = [];
      return s.visible ? (h.push(d.tooltip.icons[1]), h.push(d.tooltip.icons[2]), h.push(d.tooltip.icons[3])) : (h.push(d.tooltip.icons[0]), h.push(d.tooltip.icons[2]), h.push(d.tooltip.icons[3])), {
        icons: h
      };
    }
  }, r, n)) ?? null;
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
function rn(e) {
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
function Xm(e) {
  const t = Math.max(0, Math.ceil(e / 1e3)), r = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), a = t % 60, s = (d) => String(d).padStart(2, "0");
  return r > 0 ? `${s(r)}:${s(n)}:${s(a)}` : `${s(n)}:${s(a)}`;
}
const Jm = (e) => {
  var Vr, Kr, Rr, jr, Qr, Zr, Hr, Wr, qr, Yr, Gr, Xr, Jr, e0, t0, n0, r0, o0, i0, a0, s0, l0, c0, u0, d0, h0, f0, g0, m0;
  let t, r, n = null, a;
  const [s, d] = M(!1), [h, b] = M(e.theme), [x, v] = M(e.styles), [w, B] = M(e.locale), [N, oe] = M(e.symbol), [V, R] = M(e.period), U = () => {
    var o, i, l, c;
    return {
      visibleMarginLeft: ((o = e.indicatorTooltipIconStyles) == null ? void 0 : o.visibleMarginLeft) ?? 7,
      secondaryMarginLeft: ((i = e.indicatorTooltipIconStyles) == null ? void 0 : i.secondaryMarginLeft) ?? 7,
      marginTop: ((l = e.indicatorTooltipIconStyles) == null ? void 0 : l.marginTop) ?? 1,
      size: ((c = e.indicatorTooltipIconStyles) == null ? void 0 : c.size) ?? 12
    };
  }, [he, Z] = M(!1), [X, J] = M([...e.mainIndicators]), [ve, W] = M({}), [H, ee] = M(!1), [se, T] = M({
    key: e.timezone,
    text: lo(e.timezone, e.locale)
  }), [j, Q] = M(!1), [z, le] = M(), ce = () => {
    try {
      const o = window.localStorage.getItem(Vn);
      if (!o)
        return;
      const i = JSON.parse(o);
      return i && typeof i == "object" ? i : void 0;
    } catch {
      return;
    }
  }, re = (o) => {
    try {
      window.localStorage.setItem(Vn, JSON.stringify(o)), window.localStorage.removeItem(Kn);
    } catch {
    }
  }, E = () => {
    try {
      window.localStorage.removeItem(Vn), window.localStorage.removeItem(Kn);
    } catch {
    }
  }, te = () => {
    var i;
    const o = ce();
    if ((i = o == null ? void 0 : o.chart) != null && i.backgroundColor)
      return o.chart.backgroundColor;
    try {
      return window.localStorage.getItem(Kn) ?? void 0;
    } catch {
      return;
    }
  }, P = () => {
    const o = r == null ? void 0 : r.closest(".klinecharts-pro");
    return o && getComputedStyle(o).backgroundColor || "#171a27";
  }, I = () => t ? getComputedStyle(t).getPropertyValue("--klinecharts-pro-chart-background-color").trim() || te() || P() : te() ?? P(), F = (o) => {
    var l;
    const i = (l = o.chart) == null ? void 0 : l.backgroundColor;
    if (!(!i || !t)) {
      if (i.toLowerCase() === P().toLowerCase()) {
        t.style.removeProperty("--klinecharts-pro-chart-background-color");
        return;
      }
      t.style.setProperty("--klinecharts-pro-chart-background-color", i);
    }
  }, ye = (o) => {
    const {
      chart: i,
      ...l
    } = o;
    return l;
  }, [Te, Ce] = M(""), [Ue, k] = M(!1), [pe, Me] = M(Date.now()), [ft, Ae] = M({
    from: Date.now() - 30 * 24 * 60 * 60 * 1e3,
    to: Date.now()
  }), [et, gt] = M(Gm() ?? t9()), [Bt, o1] = M(e.drawingBarVisible), [i1, L1] = M(!1), [w1, Et] = M(!1), [A1, T1] = M(!1), a1 = ((Vr = e.orderTools) == null ? void 0 : Vr.quickOrder) ?? !0, [ze, s1] = M({
    quickOrder: a1,
    quickOrderFloatingWindow: ((Kr = e.orderTools) == null ? void 0 : Kr.quickOrderFloatingWindow) ?? a1,
    quickOrderPlusButton: ((Rr = e.orderTools) == null ? void 0 : Rr.quickOrderPlusButton) ?? a1,
    openOrders: ((jr = e.orderTools) == null ? void 0 : jr.openOrders) ?? !0,
    openOrdersExtendedPriceLine: ((Qr = e.orderTools) == null ? void 0 : Qr.openOrdersExtendedPriceLine) ?? !0,
    openOrdersDisplay: ((Zr = e.orderTools) == null ? void 0 : Zr.openOrdersDisplay) ?? "right",
    positions: ((Hr = e.orderTools) == null ? void 0 : Hr.positions) ?? !0,
    breakevenPrice: ((Wr = e.orderTools) == null ? void 0 : Wr.breakevenPrice) ?? !0,
    liquidationPrice: ((qr = e.orderTools) == null ? void 0 : qr.liquidationPrice) ?? !0,
    priceLine: ((Yr = e.orderTools) == null ? void 0 : Yr.priceLine) ?? !0,
    marketPriceLine: ((Gr = e.orderTools) == null ? void 0 : Gr.marketPriceLine) ?? !0,
    countDown: ((Xr = e.orderTools) == null ? void 0 : Xr.countDown) ?? !0,
    bidAskPrice: ((Jr = e.orderTools) == null ? void 0 : Jr.bidAskPrice) ?? !0,
    orderPreviewLine: ((e0 = e.orderTools) == null ? void 0 : e0.orderPreviewLine) ?? !0,
    orderHistory: ((t0 = e.orderTools) == null ? void 0 : t0.orderHistory) ?? !0
  }), [pt, Ft] = M(null), [mt, at] = M(!1), [M1, We] = M(!1), [S1, P1] = M(64), [Ut, At] = M(null), [l1, zt] = M(null), [D1, O1] = M("buy"), xn = 6, [N1, Vt] = M(null), [c1, I1] = M(null), [B1, u1] = M(null), [je, qe] = M(null), [Ye, Qe] = M(null), d1 = ["#000000", "#2b3342", "#3f4653", "#565d69", "#6f7580", "#8a9099", "#a7acb3", "#c4c8ce", "#ffffff", "#ff4d67", "#ffa629", "#f7ed4a", "#2fc58d", "#4ab09c", "#52c4d3", "#3157f6", "#6a36b8", "#a644b9", "#d83972", "#f2a3a6", "#f5c879", "#f7ee97", "#a6d29f", "#7fc9b9", "#91d7df", "#8fb2ee", "#b09ad2", "#c89ccf", "#d987ab", "#e8757a", "#efb34f", "#efe36e", "#86c17d", "#66b7a8", "#68c4d0", "#5f91e4", "#8059c9", "#aa62c2", "#d34d83", "#b9353d", "#ea8527", "#e8c245", "#4b8c43", "#2f6f60", "#47919b", "#2646c6", "#56309c", "#892f95", "#a82563", "#8e2528", "#de5c1f", "#dc8527", "#255a22", "#164b34", "#225b63", "#15309b", "#442180", "#6b1f74", "#86154e"];
  let h1 = null;
  const [Tt, f1] = M({
    visible: !1,
    indicatorName: "",
    paneId: "",
    calcParams: []
  });
  let Se = /* @__PURE__ */ new Map(), Oe = /* @__PURE__ */ new Map();
  const Ln = (o, i, l) => {
    const c = n == null ? void 0 : n.getIndicatorByPaneId(i, o);
    return {
      name: o,
      shortName: (c == null ? void 0 : c.shortName) || o,
      paneId: i,
      type: l,
      calcParams: (c == null ? void 0 : c.calcParams) || [],
      precision: (c == null ? void 0 : c.precision) ?? 4,
      visible: (c == null ? void 0 : c.visible) ?? !0,
      styles: c == null ? void 0 : c.styles,
      figures: c == null ? void 0 : c.figures
    };
  }, Ge = (o, i, l, c) => {
    if (e.onIndicatorChange)
      if (c === "add" || c === "change")
        setTimeout(() => {
          const f = Ln(o, i, l);
          e.onIndicatorChange({
            action: c,
            indicator: f
          });
        }, 50);
      else {
        const f = {
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
          action: c,
          indicator: f
        });
      }
  }, vt = (o) => ({
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
  })[o] || 1, bt = (o, i = /* @__PURE__ */ new WeakSet()) => {
    if (o == null)
      return o;
    if (i.has(o))
      return "[Circular]";
    if (typeof o != "object")
      return o;
    if (i.add(o), Array.isArray(o))
      return o.map((c) => bt(c, i));
    const l = {};
    for (const c in o)
      if (!(c === "__proto__" || c === "constructor" || c === "prototype"))
        try {
          const f = o[c];
          if (typeof f == "function")
            continue;
          l[c] = bt(f, i);
        } catch (f) {
          l[c] = `[Error: ${f.message}]`;
        }
    return l;
  }, E1 = (o) => {
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
        extendData: bt(o.extendData || {}),
        styles: bt(o.styles || {}),
        visible: o.visible ?? !0,
        lock: o.lock ?? !1,
        mode: o.mode || On.Normal
      };
    } catch (i) {
      return console.error("Error extracting overlay data:", i), null;
    }
  }, Mt = (o) => {
    var i, l, c;
    try {
      const f = (i = n == null ? void 0 : n.getOverlayById) == null ? void 0 : i.call(n, o);
      if (!f)
        return;
      const y = E1(f);
      if (y) {
        const g = Se.get(o), m = ((l = g == null ? void 0 : g.points) == null ? void 0 : l.length) || 0, _ = ((c = y.points) == null ? void 0 : c.length) || 0;
        Se.set(o, y);
        const L = vt(y.type);
        if (_ >= L) {
          const S = Oe.get(o);
          S && !S.complete && (S.complete = !0, S.checkInterval && (clearInterval(S.checkInterval), S.checkInterval = void 0));
        }
      }
    } catch (f) {
      console.error(`Error updating overlay tracking for ${o}:`, f);
    }
  }, wn = (o, i) => {
    if (Oe.has(o))
      return;
    const l = {
      monitoring: !0,
      complete: !1,
      lastPointCount: 0
    };
    Oe.set(o, l), Mt(o);
    const c = () => {
      Mt(o);
    };
    document.addEventListener("mouseup", c), document.addEventListener("touchend", c), setTimeout(() => {
      var y;
      const f = Oe.get(o);
      if (f && !f.complete) {
        f.checkInterval && clearInterval(f.checkInterval), f.mouseUpHandler && (document.removeEventListener("mouseup", f.mouseUpHandler), document.removeEventListener("touchend", f.mouseUpHandler)), Mt(o);
        const g = Se.get(o);
        if (g) {
          const m = vt(g.type), _ = ((y = g.points) == null ? void 0 : y.length) || 0;
          _ < m && console.warn(`âš ï¸ ${g.type} ${o} has only ${_} point(s), should have ${m}`);
        }
      }
    }, 3e4);
  };
  let st = {
    saveDrawings: (o, i) => {
      try {
        const l = `kline_drawings_${o}`, f = {
          drawings: i.map((y) => {
            var L;
            const g = {
              ...y
            };
            g.extendData && (g.extendData = bt(g.extendData)), g.styles && (g.styles = bt(g.styles));
            const m = vt(y.type), _ = ((L = y.points) == null ? void 0 : L.length) || 0;
            return _ < m && console.warn(`âš ï¸ Saving ${y.type} with only ${_} point(s), needs ${m}`), g;
          }),
          timestamp: Date.now()
        };
        localStorage.setItem(l, JSON.stringify(f));
      } catch (l) {
        console.error("Library: Error saving drawings:", l);
      }
    },
    loadDrawings: (o) => {
      try {
        const i = `kline_drawings_${o}`, l = localStorage.getItem(i);
        if (l) {
          const c = JSON.parse(l), f = [];
          return Array.isArray(c.drawings) && c.drawings.forEach((y) => {
            var _;
            const g = vt(y.type);
            (((_ = y.points) == null ? void 0 : _.length) || 0) >= g && f.push(y);
          }), f;
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
  const Kt = () => {
    const o = N();
    if (o != null && o.ticker) {
      const i = Array.from(Se.values());
      st.saveDrawings(o.ticker, i);
    }
  }, An = (o) => {
    if (!o || !n)
      return;
    Se.forEach((l, c) => {
      var f;
      (f = n == null ? void 0 : n.removeOverlay) == null || f.call(n, {
        id: c
      });
    }), Se.clear(), Oe.clear(), qe(null), Qe(null), st.loadDrawings(o).forEach((l) => {
      var c;
      try {
        const f = m1({
          name: l.type,
          points: l.points || [],
          extendData: l.extendData,
          styles: l.styles,
          visible: l.visible ?? !0,
          lock: l.lock ?? !1,
          mode: l.mode || On.Normal
        }), y = n == null ? void 0 : n.createOverlay(f), g = typeof y == "string" ? y : null;
        g && (Se.set(g, {
          ...l,
          id: g
        }), Oe.set(g, {
          monitoring: !1,
          complete: !0,
          lastPointCount: ((c = l.points) == null ? void 0 : c.length) || 0
        }));
      } catch (f) {
        console.error("Library: Error restoring drawing:", f);
      }
    });
  }, Rt = (o) => {
    var l, c;
    const i = {
      ...ze(),
      ...o
    };
    if ("quickOrder" in o) {
      const f = o.quickOrder ?? !1;
      i.quickOrderFloatingWindow = f, i.quickOrderPlusButton = f;
    } else if ("priceLine" in o) {
      const f = o.priceLine ?? !1;
      i.marketPriceLine = f, i.countDown = f, i.bidAskPrice = f;
    } else
      "quickOrderFloatingWindow" in o || "quickOrderPlusButton" in o ? i.quickOrder = i.quickOrderFloatingWindow || i.quickOrderPlusButton : ("marketPriceLine" in o || "countDown" in o || "bidAskPrice" in o) && (i.priceLine = i.marketPriceLine || i.countDown || i.bidAskPrice);
    s1(i), o.orderPreviewLine === !1 && g1(), (c = (l = e.orderTools) == null ? void 0 : l.onChange) == null || c.call(l, i);
  }, F1 = (o) => {
    var c, f, y, g, m, _;
    const i = Number((f = (c = o == null ? void 0 : o.points) == null ? void 0 : c[0]) == null ? void 0 : f.value);
    if (!Number.isFinite(i) || i <= 0)
      return;
    const l = ((y = o == null ? void 0 : o.extendData) == null ? void 0 : y.side) === "sell" || ((g = o == null ? void 0 : o.extendData) == null ? void 0 : g.side) === "buy" ? o.extendData.side : D1();
    (_ = (m = e.orderTools) == null ? void 0 : m.onOrderPreviewLineChange) == null || _.call(m, {
      price: i,
      side: l,
      symbol: N()
    });
  }, g1 = () => {
    var i;
    const o = l1();
    o && ((i = n == null ? void 0 : n.removeOverlay) == null || i.call(n, {
      id: o
    }), Se.delete(o), Oe.delete(o), zt(null));
  }, U1 = (o) => {
    var m, _;
    const i = Number(o.price);
    if (!n || !Number.isFinite(i) || i <= 0 || !ze().orderPreviewLine) {
      g1();
      return;
    }
    const l = o.side === "sell" ? "sell" : "buy";
    O1(l);
    const c = {
      side: l,
      label: o.label ?? "New Limit",
      showDragHint: !1,
      isOrderPreviewLine: !0
    }, f = l1();
    if (f) {
      (m = n.overrideOverlay) == null || m.call(n, {
        id: f,
        points: [{
          value: i
        }],
        extendData: c
      });
      return;
    }
    const y = (_ = n.createOverlay) == null ? void 0 : _.call(n, {
      name: "orderLine",
      points: [{
        value: i
      }],
      extendData: c,
      lock: !1,
      onPressedMoving: (L) => (F1(L.overlay), !1),
      onPressedMoveEnd: (L) => (F1(L.overlay), !1)
    }), g = typeof y == "string" ? y : null;
    g && (Se.delete(g), Oe.delete(g), zt(g));
  }, $ = (o) => {
    var l;
    const i = Math.min(Math.max(((l = N()) == null ? void 0 : l.pricePrecision) ?? 2, 0), 8);
    return o.toLocaleString(void 0, {
      minimumFractionDigits: i,
      maximumFractionDigits: i
    });
  }, D = () => {
    var i, l, c;
    if (!n)
      return;
    const o = ((i = n.getStyles().yAxis) == null ? void 0 : i.type) ?? b0.Normal;
    n.setStyles({
      yAxis: {
        type: o
      }
    }), (l = n.setBarSpace) == null || l.call(n, 6), (c = n.resize) == null || c.call(n), be();
  }, be = (o = Date.now()) => {
    var rt, ot, it, y0, C0, p0;
    if (!n || !t || !ze().countDown) {
      Vt(null);
      return;
    }
    n.setStyles({
      candle: {
        priceMark: {
          last: {
            show: !0,
            line: {
              show: ze().marketPriceLine
            },
            text: {
              show: !1
            }
          }
        }
      }
    });
    const i = ((rt = n.getDataList) == null ? void 0 : rt.call(n)) ?? [], l = i[i.length - 1], c = Number(l == null ? void 0 : l.close);
    if (!l || !Number.isFinite(c) || c <= 0) {
      Vt(null);
      return;
    }
    const f = (ot = n.convertToPixel) == null ? void 0 : ot.call(n, [{
      value: c
    }], {
      paneId: "candle_pane",
      absolute: !0
    }), y = Number((it = f == null ? void 0 : f[0]) == null ? void 0 : it.y), g = (y0 = n.getSize) == null ? void 0 : y0.call(n, "candle_pane"), m = (g == null ? void 0 : g.height) ?? t.clientHeight;
    if (!Number.isFinite(y) || y < 0 || y > m) {
      Vt(null);
      return;
    }
    const _ = Math.min(Math.max(((C0 = N()) == null ? void 0 : C0.pricePrecision) ?? 2, 0), 8), L = c.toLocaleString(void 0, {
      minimumFractionDigits: _,
      maximumFractionDigits: _
    }), S = (p0 = n.getSize) == null ? void 0 : p0.call(n, "candle_pane", ct.YAxis), ne = S != null && S.width && Number.isFinite(S.width) ? Math.max(74, Math.floor(S.width) - 2) : 96, ie = rn(V()), ae = o % ie, Y = ae === 0 ? ie : ie - ae, fe = Number(l.close), _e = Number(l.open), ke = n.getStyles().candle.priceMark.last, Pe = ke.text, G = Number(Pe.size) || 12, xe = Number(Pe.paddingTop) || 2, me = Number(Pe.paddingBottom) || 2, De = Math.min(Number(Pe.paddingLeft) || 4, 3), Ne = Math.min(Number(Pe.paddingRight) || 4, 3), nt = Math.max(34, G * 2 + xe + me + 6), lt = Math.max(0, Math.min(y - nt / 2, m - nt));
    Vt({
      top: lt,
      width: Math.min(ne, Math.max(62, L.length * (G * 0.56) + De + Ne + 4)),
      priceText: L,
      text: Xm(Y),
      color: Number.isFinite(fe) && Number.isFinite(_e) && fe < _e ? ke.downColor : ke.upColor,
      textSize: G,
      textFamily: Pe.family,
      textWeight: Pe.weight,
      paddingLeft: De,
      paddingRight: Ne,
      paddingTop: xe,
      paddingBottom: me,
      borderRadius: Number(Pe.borderRadius) || 2
    });
  }, Ve = (o) => {
    var l, c;
    const i = Number(o == null ? void 0 : o.y);
    if (!Number.isFinite(i))
      return NaN;
    try {
      const f = n == null ? void 0 : n.convertFromPixel([{
        x: (o == null ? void 0 : o.x) ?? 0,
        y: i
      }], {
        paneId: "candle_pane"
      }), y = Number((l = f == null ? void 0 : f[0]) == null ? void 0 : l.value);
      if (Number.isFinite(y) && y > 0)
        return y;
    } catch {
    }
    try {
      const f = n == null ? void 0 : n.convertFromPixel([{
        x: (o == null ? void 0 : o.x) ?? 0,
        y: i
      }], {
        paneId: "candle_pane",
        absolute: !0
      }), y = Number((c = f == null ? void 0 : f[0]) == null ? void 0 : c.value);
      if (Number.isFinite(y) && y > 0)
        return y;
    } catch {
    }
    return NaN;
  }, tt = (o) => {
    var y;
    if (!ze().quickOrderPlusButton || (o == null ? void 0 : o.paneId) !== "candle_pane" || !t) {
      if (M1() || mt())
        return;
      Ft(null), at(!1);
      return;
    }
    const i = (y = n == null ? void 0 : n.getSize) == null ? void 0 : y.call(n, "candle_pane", ct.YAxis);
    i != null && i.width && Number.isFinite(i.width) && P1(Math.max(44, Math.ceil(i.width)));
    const l = Number(o.y), c = Ve(o), f = t.clientHeight;
    if (!Number.isFinite(l) || !Number.isFinite(c) || c <= 0 || l < 0 || l > f) {
      if (M1() || mt())
        return;
      Ft(null), at(!1);
      return;
    }
    h1 = {
      ...o
    }, Ft({
      y: l,
      price: c
    });
  }, Xe = () => {
    var o;
    if (h1)
      try {
        (o = n == null ? void 0 : n.executeAction) == null || o.call(n, St.OnCrosshairChange, h1);
      } catch {
      }
  }, jt = (o) => {
    var l, c;
    const i = Ut() ?? pt();
    i && ((c = (l = e.orderTools) == null ? void 0 : l.onQuickOrderAction) == null || c.call(l, {
      action: o,
      price: i.price,
      symbol: N()
    }), at(!1), At(null), We(!1));
  }, z1 = async () => {
    var i;
    const o = Ut() ?? pt();
    if (o) {
      try {
        await ((i = navigator.clipboard) == null ? void 0 : i.writeText(String(o.price)));
      } catch {
      }
      at(!1), At(null), We(!1);
    }
  }, V1 = () => {
    const o = Ut() ?? pt();
    o && (n == null || n.createOverlay(m1({
      name: "horizontalStraightLine",
      points: [{
        value: o.price
      }],
      lock: !1
    })), at(!1), At(null), We(!1));
  }, K1 = (o) => {
    var m, _, L, S, ne, ie;
    const i = (_ = (m = t == null ? void 0 : t.parentElement) == null ? void 0 : m.getBoundingClientRect) == null ? void 0 : _.call(m), l = (L = t == null ? void 0 : t.getBoundingClientRect) == null ? void 0 : L.call(t), c = o == null ? void 0 : o.overlay, f = (S = c == null ? void 0 : c.points) == null ? void 0 : S[0];
    let y = 72, g = 40;
    if (i) {
      if (Number.isFinite(o == null ? void 0 : o.pageX) ? y = o.pageX - i.left : Number.isFinite(o == null ? void 0 : o.x) && l && (y = l.left - i.left + o.x), Number.isFinite(o == null ? void 0 : o.pageY))
        g = o.pageY - i.top;
      else if (Number.isFinite(o == null ? void 0 : o.y) && l)
        g = l.top - i.top + o.y;
      else if (Number.isFinite(f == null ? void 0 : f.value))
        try {
          const ae = (ne = n == null ? void 0 : n.convertToPixel) == null ? void 0 : ne.call(n, [{
            value: f.value
          }], {
            paneId: "candle_pane",
            absolute: !0
          }), Y = Number((ie = ae == null ? void 0 : ae[0]) == null ? void 0 : ie.y);
          Number.isFinite(Y) && (g = Y - i.top);
        } catch {
        }
    }
    return {
      x: Math.max(12, Math.min(y - 28, ((i == null ? void 0 : i.width) ?? 360) - 320)),
      y: Math.max(8, g - 52)
    };
  }, Tn = (o) => {
    var m, _, L, S, ne, ie, ae, Y;
    const i = o == null ? void 0 : o.overlay;
    if (!(i != null && i.id) || i.name !== "horizontalStraightLine")
      return !1;
    const l = K1(o), c = Number((_ = (m = i.styles) == null ? void 0 : m.line) == null ? void 0 : _.size) || 3, f = ((S = (L = i.styles) == null ? void 0 : L.line) == null ? void 0 : S.style) ?? Ke.Solid, y = Array.isArray((ie = (ne = i.styles) == null ? void 0 : ne.line) == null ? void 0 : ie.dashedValue) ? i.styles.line.dashedValue : [], g = ((Y = (ae = i.styles) == null ? void 0 : ae.line) == null ? void 0 : Y.color) ?? "#2f6df6";
    return qe({
      id: i.id,
      x: l.x,
      y: l.y,
      lineSize: c,
      lineStyle: f,
      dashedValue: y,
      color: g,
      locked: i.lock ?? !1,
      visible: i.visible ?? !0
    }), !1;
  }, mr = (o) => {
    var l, c;
    const i = (l = o == null ? void 0 : o.overlay) == null ? void 0 : l.id;
    return (!i || ((c = je()) == null ? void 0 : c.id) === i) && (qe(null), Qe(null)), !1;
  }, m1 = (o) => {
    var g, m, _, L, S, ne, ie, ae, Y;
    if (o.name !== "horizontalStraightLine")
      return o;
    const i = o.onClick, l = o.onSelected, c = o.onDeselected, f = o.onRemoved, y = o.onPressedMoveEnd;
    return {
      ...o,
      styles: {
        ...o.styles,
        line: {
          ...(g = o.styles) == null ? void 0 : g.line,
          size: Number((_ = (m = o.styles) == null ? void 0 : m.line) == null ? void 0 : _.size) || 3,
          style: ((S = (L = o.styles) == null ? void 0 : L.line) == null ? void 0 : S.style) ?? Ke.Solid,
          dashedValue: ((ie = (ne = o.styles) == null ? void 0 : ne.line) == null ? void 0 : ie.dashedValue) ?? [6, 4],
          color: ((Y = (ae = o.styles) == null ? void 0 : ae.line) == null ? void 0 : Y.color) ?? "#2f6df6"
        }
      },
      onClick: (fe) => (Tn(fe), (i == null ? void 0 : i(fe)) ?? !1),
      onSelected: (fe) => (Tn(fe), (l == null ? void 0 : l(fe)) ?? !1),
      onPressedMoveEnd: (fe) => (Tn(fe), (y == null ? void 0 : y(fe)) ?? !1),
      onDeselected: (fe) => (mr(fe), (c == null ? void 0 : c(fe)) ?? !1),
      onRemoved: (fe) => (mr(fe), (f == null ? void 0 : f(fe)) ?? !1)
    };
  }, n9 = () => {
    var i;
    const o = je();
    o && ((i = n == null ? void 0 : n.removeOverlay) == null || i.call(n, {
      id: o.id
    }), qe(null), Qe(null));
  }, Qt = (o) => {
    var l;
    const i = je();
    i && ((l = n == null ? void 0 : n.overrideOverlay) == null || l.call(n, {
      id: i.id,
      ...o
    }), setTimeout(() => {
      Mt(i.id), Kt();
    }, 0));
  }, r9 = () => {
    const o = je();
    if (!o)
      return;
    const i = !o.locked;
    Qt({
      lock: i
    }), qe({
      ...o,
      locked: i
    });
  }, o9 = () => {
    const o = je();
    if (!o)
      return;
    const i = !o.visible;
    Qt({
      visible: i
    }), qe({
      ...o,
      visible: i
    });
  }, i9 = (o) => {
    const i = je();
    i && (Qt({
      styles: {
        line: {
          size: o
        }
      }
    }), qe({
      ...i,
      lineSize: o
    }), Qe(null));
  }, Mn = (o, i) => {
    const l = je();
    l && (Qt({
      styles: {
        line: {
          style: o,
          dashedValue: i
        }
      }
    }), qe({
      ...l,
      lineStyle: o,
      dashedValue: i
    }), Qe(null));
  }, a9 = () => {
    const o = je();
    if (!o)
      return;
    const i = 1, l = Ke.Solid, c = [6, 4], f = "#2f6df6";
    Qt({
      styles: {
        line: {
          size: i,
          style: l,
          dashedValue: c,
          color: f
        }
      }
    }), qe({
      ...o,
      lineSize: i,
      lineStyle: l,
      dashedValue: c,
      color: f
    }), Qe(null);
  }, s9 = (o) => {
    const i = je();
    i && (Qt({
      styles: {
        line: {
          color: o
        }
      }
    }), qe({
      ...i,
      color: o
    }));
  }, l9 = (o) => {
    var L, S;
    const i = je();
    if (!i || !t)
      return;
    o.preventDefault(), o.stopPropagation(), Qe(null);
    const l = (S = (L = t.parentElement) == null ? void 0 : L.getBoundingClientRect) == null ? void 0 : S.call(L);
    if (!l)
      return;
    const c = o.clientX, f = o.clientY, y = i.x, g = i.y, m = (ne) => {
      ne.preventDefault();
      const ie = y + ne.clientX - c, ae = g + ne.clientY - f;
      qe({
        ...i,
        x: Math.max(8, Math.min(ie, l.width - 320)),
        y: Math.max(8, Math.min(ae, l.height - 48))
      });
    }, _ = () => {
      document.removeEventListener("mousemove", m), document.removeEventListener("mouseup", _);
    };
    document.addEventListener("mousemove", m), document.addEventListener("mouseup", _);
  }, c9 = () => {
    at(!1), At(null), We(!1);
  }, yr = (o) => {
    var l, c;
    if (!mt())
      return;
    const i = o.target;
    (l = i == null ? void 0 : i.closest) != null && l.call(i, ".klinecharts-pro-quick-order-marker") || (c = i == null ? void 0 : i.closest) != null && c.call(i, ".klinecharts-pro-quick-order-menu-anchor") || c9();
  };
  let Cr = (n0 = e.orderTools) == null ? void 0 : n0.quickOrder, pr = (r0 = e.orderTools) == null ? void 0 : r0.quickOrderFloatingWindow, vr = (o0 = e.orderTools) == null ? void 0 : o0.quickOrderPlusButton, br = (i0 = e.orderTools) == null ? void 0 : i0.openOrders, $r = (a0 = e.orderTools) == null ? void 0 : a0.openOrdersExtendedPriceLine, _r = (s0 = e.orderTools) == null ? void 0 : s0.openOrdersDisplay, kr = (l0 = e.orderTools) == null ? void 0 : l0.positions, xr = (c0 = e.orderTools) == null ? void 0 : c0.breakevenPrice, Lr = (u0 = e.orderTools) == null ? void 0 : u0.liquidationPrice, wr = (d0 = e.orderTools) == null ? void 0 : d0.priceLine, Ar = (h0 = e.orderTools) == null ? void 0 : h0.marketPriceLine, Tr = (f0 = e.orderTools) == null ? void 0 : f0.countDown, Mr = (g0 = e.orderTools) == null ? void 0 : g0.bidAskPrice, Sr = (m0 = e.orderTools) == null ? void 0 : m0.orderHistory;
  Ze(() => {
    var fe, _e, ke, Pe, G, xe, me, De, Ne, nt, lt, rt, ot, it;
    const o = (fe = e.orderTools) == null ? void 0 : fe.quickOrder, i = (_e = e.orderTools) == null ? void 0 : _e.quickOrderFloatingWindow, l = (ke = e.orderTools) == null ? void 0 : ke.quickOrderPlusButton, c = (Pe = e.orderTools) == null ? void 0 : Pe.openOrders, f = (G = e.orderTools) == null ? void 0 : G.openOrdersExtendedPriceLine, y = (xe = e.orderTools) == null ? void 0 : xe.openOrdersDisplay, g = (me = e.orderTools) == null ? void 0 : me.positions, m = (De = e.orderTools) == null ? void 0 : De.breakevenPrice, _ = (Ne = e.orderTools) == null ? void 0 : Ne.liquidationPrice, L = (nt = e.orderTools) == null ? void 0 : nt.priceLine, S = (lt = e.orderTools) == null ? void 0 : lt.marketPriceLine, ne = (rt = e.orderTools) == null ? void 0 : rt.countDown, ie = (ot = e.orderTools) == null ? void 0 : ot.bidAskPrice, ae = (it = e.orderTools) == null ? void 0 : it.orderHistory, Y = {};
    typeof o == "boolean" && o !== Cr && (Cr = o, Y.quickOrder = o, typeof i != "boolean" && (Y.quickOrderFloatingWindow = o), typeof l != "boolean" && (Y.quickOrderPlusButton = o)), typeof i == "boolean" && i !== pr && (pr = i, Y.quickOrderFloatingWindow = i), typeof l == "boolean" && l !== vr && (vr = l, Y.quickOrderPlusButton = l), typeof c == "boolean" && c !== br && (br = c, Y.openOrders = c), typeof f == "boolean" && f !== $r && ($r = f, Y.openOrdersExtendedPriceLine = f), y !== void 0 && y !== _r && (_r = y, Y.openOrdersDisplay = y), typeof g == "boolean" && g !== kr && (kr = g, Y.positions = g), typeof m == "boolean" && m !== xr && (xr = m, Y.breakevenPrice = m), typeof _ == "boolean" && _ !== Lr && (Lr = _, Y.liquidationPrice = _), typeof L == "boolean" && L !== wr && (wr = L, Y.priceLine = L, typeof S != "boolean" && (Y.marketPriceLine = L), typeof ne != "boolean" && (Y.countDown = L), typeof ie != "boolean" && (Y.bidAskPrice = L)), typeof S == "boolean" && S !== Ar && (Ar = S, Y.marketPriceLine = S), typeof ne == "boolean" && ne !== Tr && (Tr = ne, Y.countDown = ne), typeof ie == "boolean" && ie !== Mr && (Mr = ie, Y.bidAskPrice = ie), typeof ae == "boolean" && ae !== Sr && (Sr = ae, Y.orderHistory = ae), Object.keys(Y).length > 0 && Rt(Y);
  }), Ze(() => {
    ze().marketPriceLine, ze().countDown, V(), N(), n == null || n.setStyles({
      candle: {
        priceMark: {
          last: {
            show: !0,
            line: {
              show: ze().marketPriceLine
            },
            text: {
              show: !ze().countDown
            }
          }
        }
      }
    }), be();
  }), e.ref({
    setTheme: b,
    getTheme: () => h(),
    setStyles: v,
    getStyles: () => n.getStyles(),
    setLocale: B,
    getLocale: () => w(),
    setTimezone: (o) => {
      T({
        key: o,
        text: lo(e.timezone, w())
      });
    },
    getTimezone: () => se().key,
    setSymbol: oe,
    getSymbol: () => N(),
    setPeriod: R,
    getPeriod: () => V(),
    getMainIndicators: () => X(),
    getSubIndicators: () => ve(),
    setMainIndicators: J,
    setSubIndicators: W,
    overrideIndicator: (o, i) => {
      n == null || n.overrideIndicator(o, i);
    },
    createOverlay: (o) => {
      var l;
      const i = (l = n == null ? void 0 : n.createOverlay) == null ? void 0 : l.call(n, m1(o));
      return typeof i == "string" ? i : null;
    },
    removeOverlay: (o) => {
      var i;
      if ((i = n == null ? void 0 : n.removeOverlay) == null || i.call(n, o), o.id) {
        Se.delete(o.id);
        const l = Oe.get(o.id);
        l && (l.checkInterval && clearInterval(l.checkInterval), l.mouseUpHandler && (document.removeEventListener("mouseup", l.mouseUpHandler), document.removeEventListener("touchend", l.mouseUpHandler)), Oe.delete(o.id)), Kt();
      }
    },
    removeAllOverlay: () => {
      Se.forEach((o, i) => {
        var c;
        (c = n == null ? void 0 : n.removeOverlay) == null || c.call(n, {
          id: i
        });
        const l = Oe.get(i);
        l && (l.checkInterval && clearInterval(l.checkInterval), l.mouseUpHandler && (document.removeEventListener("mouseup", l.mouseUpHandler), document.removeEventListener("touchend", l.mouseUpHandler)));
      }), Se.clear(), Oe.clear();
    },
    getAllOverlay: () => Array.from(Se.values()),
    getOverlay: (o) => Se.get(o) || null,
    overrideOverlay: (o) => {
      n && "overrideOverlay" in n && typeof n.overrideOverlay == "function" ? n.overrideOverlay(o) : console.warn("overrideOverlay method not available on widget");
    },
    convertToPixel: (o, i) => n ? n.convertToPixel(o, i) : Array.isArray(o) ? [] : {},
    convertFromPixel: (o, i) => n ? n.convertFromPixel(o, i) : [],
    getVisibleRange: () => n ? n.getVisibleRange() : {
      from: 0,
      to: 0
    },
    getDataList: () => n ? n.getDataList() : [],
    getSize: (o, i) => n ? n.getSize(o, i) : null,
    getDom: (o, i) => n ? n.getDom(o, i) : null,
    subscribeAction: (o, i) => {
      n && n.subscribeAction(o, i);
    },
    unsubscribeAction: (o, i) => {
      n && n.unsubscribeAction(o, i);
    },
    setIndicatorModalVisible: Z,
    setTimezoneModalVisible: ee,
    setSettingModalVisible: Q,
    setTimeToolsModalVisible: (o) => {
      o && Me(Date.now()), k(o);
    },
    getOrderToolsState: () => ze(),
    setOrderToolsState: (o) => {
      Rt(o);
    },
    setOrderPreviewLine: U1,
    clearOrderPreviewLine: g1,
    dispose: () => {
      t && v0(t);
    },
    resize: () => {
      n && "resize" in n && typeof n.resize == "function" ? n.resize() : console.warn("resize method not available on widget");
    },
    getSettings: () => {
      var l, c, f, y, g, m, _, L, S, ne, ie, ae, Y, fe, _e, ke;
      if (!n)
        return {};
      const o = n.getStyles(), i = (l = o.candle) == null ? void 0 : l.bar;
      return {
        // Candle settings
        candleType: (c = o.candle) == null ? void 0 : c.type,
        candleBarStyle: i == null ? void 0 : i.style,
        // bar.style might be LineType
        showLastPrice: (g = (y = (f = o.candle) == null ? void 0 : f.priceMark) == null ? void 0 : y.last) == null ? void 0 : g.show,
        showHighestPrice: (L = (_ = (m = o.candle) == null ? void 0 : m.priceMark) == null ? void 0 : _.high) == null ? void 0 : L.show,
        showLowestPrice: (ie = (ne = (S = o.candle) == null ? void 0 : S.priceMark) == null ? void 0 : ne.low) == null ? void 0 : ie.show,
        // Indicator settings
        showIndicatorLastValue: (Y = (ae = o.indicator) == null ? void 0 : ae.lastValueMark) == null ? void 0 : Y.show,
        // Axis settings - yAxis.reverse is boolean according to YAxisStyle interface
        priceAxisType: (fe = o.yAxis) == null ? void 0 : fe.type,
        reverseCoordinate: (_e = o.yAxis) == null ? void 0 : _e.reverse,
        // Grid settings
        showGrids: (ke = o.grid) == null ? void 0 : ke.show,
        timestamp: Date.now()
      };
    },
    setSettings: (o) => {
      var l, c, f, y, g, m, _, L, S, ne, ie, ae, Y, fe;
      if (!n)
        return;
      const i = {};
      if (o.candleType !== void 0 && (i.candle = {
        ...i.candle,
        type: o.candleType
      }), o.candleBarStyle !== void 0) {
        const _e = ((l = i.candle) == null ? void 0 : l.bar) || {};
        i.candle = {
          ...i.candle,
          bar: {
            ..._e,
            style: o.candleBarStyle
          }
          // Use any since ChangeColor doesn't have style
        };
      }
      o.showLastPrice !== void 0 && (i.candle = {
        ...i.candle,
        priceMark: {
          ...(c = i.candle) == null ? void 0 : c.priceMark,
          last: {
            ...(y = (f = i.candle) == null ? void 0 : f.priceMark) == null ? void 0 : y.last,
            show: o.showLastPrice,
            text: {
              ...(_ = (m = (g = i.candle) == null ? void 0 : g.priceMark) == null ? void 0 : m.last) == null ? void 0 : _.text,
              show: o.showLastPrice && !ze().countDown
            }
          }
        }
      }), o.showHighestPrice !== void 0 && (i.candle = {
        ...i.candle,
        priceMark: {
          ...(L = i.candle) == null ? void 0 : L.priceMark,
          high: {
            ...(ne = (S = i.candle) == null ? void 0 : S.priceMark) == null ? void 0 : ne.high,
            show: o.showHighestPrice
          }
        }
      }), o.showLowestPrice !== void 0 && (i.candle = {
        ...i.candle,
        priceMark: {
          ...(ie = i.candle) == null ? void 0 : ie.priceMark,
          low: {
            ...(Y = (ae = i.candle) == null ? void 0 : ae.priceMark) == null ? void 0 : Y.low,
            show: o.showLowestPrice
          }
        }
      }), o.showIndicatorLastValue !== void 0 && (i.indicator = {
        ...i.indicator,
        lastValueMark: {
          ...(fe = i.indicator) == null ? void 0 : fe.lastValueMark,
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
      }), _t(i), n.setStyles(i);
    },
    resetSettings: () => {
      var l, c, f, y, g, m, _;
      if (!n)
        return;
      n.getStyles();
      const o = {
        candle: {
          type: D9.CandleSolid,
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
          type: b0.Normal,
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
      }, i = z();
      if (i) {
        const L = {
          candle: {
            type: (l = i.candle) == null ? void 0 : l.type,
            bar: (c = i.candle) == null ? void 0 : c.bar,
            priceMark: (f = i.candle) == null ? void 0 : f.priceMark
          },
          indicator: {
            lastValueMark: (y = i.indicator) == null ? void 0 : y.lastValueMark
          },
          yAxis: {
            type: (g = i.yAxis) == null ? void 0 : g.type,
            reverse: (m = i.yAxis) == null ? void 0 : m.reverse
          },
          grid: {
            show: (_ = i.grid) == null ? void 0 : _.show
          }
        };
        _t(L), n.setStyles(L);
      } else
        _t(o), n.setStyles(o);
    },
    autoScalePriceAxis: () => {
      D();
    },
    // === Drawing Methods ===
    saveDrawings: (o) => {
      const i = Array.from(Se.values());
      i.forEach((l, c) => {
        var g;
        const f = vt(l.type), y = ((g = l.points) == null ? void 0 : g.length) || 0;
        y < f && console.warn(`âš ï¸ ${l.type} ${l.id} has only ${y} point(s), should have ${f}`);
      }), st.saveDrawings(o, i);
    },
    loadDrawings: (o) => {
      st.loadDrawings(o).forEach((l, c) => {
        var f;
        try {
          const y = {
            name: l.type,
            points: l.points || [],
            extendData: l.extendData,
            styles: l.styles,
            visible: l.visible ?? !0,
            lock: l.lock ?? !1,
            mode: l.mode ?? On.Normal
          }, g = n == null ? void 0 : n.createOverlay(y), m = typeof g == "string" ? g : null;
          m && (Se.set(m, {
            ...l,
            id: m
          }), Oe.set(m, {
            monitoring: !1,
            complete: !0,
            lastPointCount: ((f = l.points) == null ? void 0 : f.length) || 0
          }));
        } catch (y) {
          console.error(`   âŒ Error restoring ${l.type}:`, y);
        }
      });
    },
    getDrawings: (o) => st.loadDrawings(o),
    clearDrawings: (o) => {
      st.clearDrawings(o);
    },
    // Auto-save on overlay events
    enableAutoSave: (o, i = !0) => {
    }
  });
  const Pr = () => {
    n == null || n.resize(), be(), Br(), $t();
  };
  let R1, j1, Q1, y1 = !1, Dr = 0;
  const u9 = () => {
    if (y1 || Date.now() < Dr)
      return;
    const o = et();
    if (!o.enabled || o.anchorPoint === "date")
      return;
    const i = Fr(o.anchorPoint, o.timestamp);
    if (Number.isFinite(i) && i !== o.timestamp) {
      const l = {
        ...o,
        timestamp: i
      };
      gt(l), go(l);
    }
  }, d9 = () => {
    Q1 && window.clearTimeout(Q1), Q1 = window.setTimeout(() => {
      Q1 = void 0, u9();
    }, 80);
  }, Or = () => {
    be(), Br(), $t(), d9();
  }, Nr = [St.OnVisibleRangeChange, St.OnZoom, St.OnScroll], h9 = (o) => {
    const i = new Date(o), l = i.getFullYear(), c = `${i.getMonth() + 1}`.padStart(2, "0"), f = `${i.getDate()}`.padStart(2, "0"), y = `${i.getHours()}`.padStart(2, "0"), g = `${i.getMinutes()}`.padStart(2, "0");
    return `${l}/${c}/${f} ${y}:${g}`;
  }, f9 = (o) => {
    var g;
    const i = ((g = n == null ? void 0 : n.getDataList) == null ? void 0 : g.call(n)) ?? [];
    if (i.length === 0)
      return null;
    let l = i[0], c = 0, f = Number(l == null ? void 0 : l.timestamp), y = Math.abs(f - o);
    for (let m = 1; m < i.length; m += 1) {
      const _ = i[m], L = Number(_ == null ? void 0 : _.timestamp);
      if (!Number.isFinite(L))
        continue;
      const S = Math.abs(L - o);
      S < y && (l = _, c = m, f = L, y = S);
    }
    return l && Number.isFinite(f) ? {
      candle: l,
      dataIndex: c
    } : null;
  }, g9 = (o) => {
    var l;
    const i = ((l = n == null ? void 0 : n.getDataList) == null ? void 0 : l.call(n)) ?? [];
    if (i.length === 0 || !Number.isFinite(o))
      return null;
    for (let c = 0; c < i.length; c += 1) {
      const f = i[c];
      if (Number(f == null ? void 0 : f.timestamp) === o)
        return {
          candle: f,
          dataIndex: c
        };
    }
    return null;
  }, Z1 = (o) => {
    var l;
    const i = ((l = n == null ? void 0 : n.getDataList) == null ? void 0 : l.call(n)) ?? [];
    return i.length === 0 || !Number.isFinite(o) || o < 0 ? -1 : Math.max(0, Math.min(i.length - 1, o + 1));
  }, Ir = (o) => {
    var ie, ae, Y;
    if (!n || !t)
      return null;
    const i = f9(o), l = i == null ? void 0 : i.candle, c = Number((l == null ? void 0 : l.timestamp) ?? o), f = Number((l == null ? void 0 : l.high) ?? (l == null ? void 0 : l.close) ?? (l == null ? void 0 : l.open)), y = i ? Z1(i.dataIndex) : void 0, g = i && Number.isFinite(f) ? {
      dataIndex: y,
      value: f
    } : {
      timestamp: c
    }, m = (ie = n.convertToPixel) == null ? void 0 : ie.call(n, [g], {
      paneId: "candle_pane",
      absolute: !0
    }), _ = Number((ae = m == null ? void 0 : m[0]) == null ? void 0 : ae.x), L = Number((Y = m == null ? void 0 : m[0]) == null ? void 0 : Y.y), S = t.clientWidth, ne = t.clientHeight;
    return !Number.isFinite(_) || _ < -80 || _ > S + 80 ? null : {
      timestamp: c,
      text: h9(c),
      left: Math.max(58, Math.min(_, S - 58)),
      top: Number.isFinite(L) ? Math.max(8, Math.min(L - 42, ne - 38)) : 10
    };
  }, Br = () => {
    const o = c1();
    if (!o || !n || !t)
      return;
    const i = Ir(o.timestamp);
    i && I1(i);
  }, H1 = (o, i = 0) => {
    if (!n || !t)
      return;
    const l = Ir(o);
    if (l) {
      I1(l);
      return;
    }
    i < 6 && (j1 = window.setTimeout(() => H1(o, i + 1), 80));
  }, Sn = (o, i, l) => {
    let c = i, f = c;
    switch (o.timespan) {
      case "minute": {
        c = c - c % (60 * 1e3), f = c - l * o.multiplier * 60 * 1e3;
        break;
      }
      case "hour": {
        c = c - c % (60 * 60 * 1e3), f = c - l * o.multiplier * 60 * 60 * 1e3;
        break;
      }
      case "day": {
        c = c - c % (60 * 60 * 1e3), f = c - l * o.multiplier * 24 * 60 * 60 * 1e3;
        break;
      }
      case "week": {
        const g = new Date(c).getDay(), m = g === 0 ? 6 : g - 1;
        c = c - m * 60 * 60 * 24;
        const _ = new Date(c);
        c = (/* @__PURE__ */ new Date(`${_.getFullYear()}-${_.getMonth() + 1}-${_.getDate()}`)).getTime(), f = l * o.multiplier * 7 * 24 * 60 * 60 * 1e3;
        break;
      }
      case "month": {
        const y = new Date(c), g = y.getFullYear(), m = y.getMonth() + 1;
        c = (/* @__PURE__ */ new Date(`${g}-${m}-01`)).getTime(), f = l * o.multiplier * 30 * 24 * 60 * 60 * 1e3;
        const _ = new Date(f);
        f = (/* @__PURE__ */ new Date(`${_.getFullYear()}-${_.getMonth() + 1}-01`)).getTime();
        break;
      }
      case "year": {
        const g = new Date(c).getFullYear();
        c = (/* @__PURE__ */ new Date(`${g}-01-01`)).getTime(), f = l * o.multiplier * 365 * 24 * 60 * 60 * 1e3;
        const m = new Date(f);
        f = (/* @__PURE__ */ new Date(`${m.getFullYear()}-01-01`)).getTime();
        break;
      }
    }
    return [f, c];
  }, m9 = (o, i = 500) => {
    const l = rn(V()), c = Math.max(1, Math.floor(i / 2)) * l;
    return {
      from: o - c,
      to: o + c
    };
  }, y9 = (o, i, l = 600) => {
    const c = rn(i), f = Math.max(120, l);
    let y = 0.5;
    o.anchorPoint === "left" ? y = 0.12 : o.anchorPoint === "right" && (y = 0.88);
    const g = Math.max(20, Math.floor(f * y)), m = Math.max(20, f - g);
    return {
      from: o.timestamp - g * c,
      to: Math.min(Date.now(), o.timestamp + m * c)
    };
  }, C9 = (o) => {
    const i = new Date(o.from), l = new Date(o.to);
    return {
      from: new Date(i.getFullYear(), i.getMonth(), i.getDate(), 0, 0, 0, 0).getTime(),
      to: new Date(l.getFullYear(), l.getMonth(), l.getDate(), 23, 59, 59, 999).getTime()
    };
  }, p9 = (o, i) => {
    const l = Math.min(i.from, i.to), c = Math.max(i.from, i.to);
    return o.filter((f) => {
      const y = Number(f.timestamp);
      return y >= l && y <= c;
    });
  }, v9 = (o, i) => {
    var c;
    const l = Math.max(i.from, i.to);
    for (let f = o.length - 1; f >= 0; f -= 1) {
      const y = Number((c = o[f]) == null ? void 0 : c.timestamp);
      if (Number.isFinite(y) && y <= l)
        return y;
    }
    return l;
  }, b9 = (o, i) => {
    var c;
    const l = Math.max(i.from, i.to);
    for (let f = o.length - 1; f >= 0; f -= 1) {
      const y = Number((c = o[f]) == null ? void 0 : c.timestamp);
      if (Number.isFinite(y) && y <= l)
        return f;
    }
    return o.length - 1;
  }, $9 = (o, i) => {
    const l = rn(i), c = Math.abs(o.to - o.from), f = Math.max(1, Math.ceil(c / l) + 1), y = Math.max(f, 120) * l;
    return {
      from: o.from,
      to: Math.max(o.to, Math.min(Date.now(), o.to + y))
    };
  }, _9 = (o) => {
    var y, g;
    if (!n || !t || o.length === 0)
      return;
    const i = ((y = n.getSize("candle_pane", ct.YAxis)) == null ? void 0 : y.width) ?? 0, l = ((g = n.getSize("candle_pane", ct.Main)) == null ? void 0 : g.width) ?? t.clientWidth - i, c = Math.max(1, l - 8), f = Math.max(2, c / Math.max(1, o.length));
    n.setOffsetRightDistance(0), n.setLeftMinVisibleBarCount(0), n.setRightMinVisibleBarCount(0), n.setBarSpace(f);
  }, Pn = (o) => {
    var i;
    !n || !Number.isFinite(o) || ((i = n.scrollToTimestamp) == null || i.call(n, o, 250), requestAnimationFrame(() => H1(o)), be());
  }, Er = (o, i = "floor") => {
    var y, g, m;
    const l = ((y = n == null ? void 0 : n.getDataList) == null ? void 0 : y.call(n)) ?? [];
    if (l.length === 0 || !Number.isFinite(o))
      return -1;
    if (i === "floor")
      for (let _ = l.length - 1; _ >= 0; _ -= 1) {
        const L = Number((g = l[_]) == null ? void 0 : g.timestamp);
        if (Number.isFinite(L) && L <= o)
          return _;
      }
    let c = 0, f = 1 / 0;
    for (let _ = 0; _ < l.length; _ += 1) {
      const L = Number((m = l[_]) == null ? void 0 : m.timestamp);
      if (!Number.isFinite(L))
        continue;
      const S = Math.abs(L - o);
      (S < f || S === f && L > o) && (f = S, c = _);
    }
    return f === 1 / 0 ? -1 : c;
  }, Dn = (o) => {
    var _, L, S;
    if (!n || !t)
      return null;
    const i = (_ = n.getDom) == null ? void 0 : _.call(n, "candle_pane", ct.Main), l = (L = i == null ? void 0 : i.getBoundingClientRect) == null ? void 0 : L.call(i), c = (S = r == null ? void 0 : r.getBoundingClientRect) == null ? void 0 : S.call(r), f = t.getBoundingClientRect(), y = l && Number.isFinite(l.left) ? l.left - ((c == null ? void 0 : c.left) ?? f.left) : f.left - ((c == null ? void 0 : c.left) ?? f.left), g = n.getSize("candle_pane", ct.Main), m = (l == null ? void 0 : l.width) ?? (g == null ? void 0 : g.width) ?? t.clientWidth;
    return o === "left" ? Math.max(8, y) : o === "center" ? y + m / 2 : o === "right" ? y + m : null;
  }, Fr = (o, i) => {
    var L, S, ne, ie, ae, Y;
    const l = Dn(o), c = ((L = n == null ? void 0 : n.getDataList) == null ? void 0 : L.call(n)) ?? [];
    if (!n || l === null || c.length === 0)
      return i;
    const f = (S = n.convertFromPixel) == null ? void 0 : S.call(n, [{
      x: l,
      y: 0
    }], {
      paneId: "candle_pane",
      absolute: !0
    }), y = Number((ne = f == null ? void 0 : f[0]) == null ? void 0 : ne.dataIndex), g = Math.max(0, Math.min(c.length - 1, Number.isFinite(y) ? Math.round(y) : -1)), m = g9(i);
    if (m) {
      const fe = Z1(m.dataIndex), _e = (ie = n.convertToPixel) == null ? void 0 : ie.call(n, [{
        dataIndex: fe
      }], {
        paneId: "candle_pane",
        absolute: !0
      }), ke = Number((ae = _e == null ? void 0 : _e[0]) == null ? void 0 : ae.x), Pe = n.getBarSpace, G = typeof Pe == "function" ? Pe.call(n) : void 0, xe = Number(typeof G == "object" ? G == null ? void 0 : G.bar : G), me = Number.isFinite(xe) ? Math.max(2, xe / 2) : 8;
      if (Number.isFinite(ke) && Math.abs(ke - l) <= me)
        return i;
    }
    const _ = Number((Y = c[g]) == null ? void 0 : Y.timestamp);
    return Number.isFinite(_) ? _ : i;
  }, Ur = (o) => {
    if (!n || !Number.isFinite(o.timestamp))
      return;
    if (y1 = !0, Dr = Date.now() + 1e3, o.anchorPoint === "date") {
      Pn(o.timestamp), window.setTimeout(() => {
        y1 = !1;
      }, 1e3);
      return;
    }
    const i = Er(o.timestamp, "nearest"), l = Z1(i), c = Dn(o.anchorPoint);
    if (l < 0 || c === null) {
      Pn(o.timestamp), window.setTimeout(() => {
        y1 = !1;
      }, 1e3);
      return;
    }
    n.scrollToDataIndex(l, 0), requestAnimationFrame(() => {
      var g, m;
      const f = (g = n == null ? void 0 : n.convertToPixel) == null ? void 0 : g.call(n, [{
        dataIndex: l
      }], {
        paneId: "candle_pane",
        absolute: !0
      }), y = Number((m = f == null ? void 0 : f[0]) == null ? void 0 : m.x);
      Number.isFinite(y) && (n == null || n.scrollByDistance(c - y, 0)), requestAnimationFrame(() => {
        $t(o), H1(o.timestamp), window.setTimeout(() => {
          y1 = !1;
        }, 1e3);
      });
    }), be();
  }, k9 = (o) => {
    var g, m;
    if (!n || !t)
      return null;
    const i = Dn(o.anchorPoint);
    if (i !== null)
      return i;
    const l = Z1(Er(o.timestamp, "nearest")), c = l >= 0 ? {
      dataIndex: l
    } : {
      timestamp: o.timestamp
    }, f = (g = n.convertToPixel) == null ? void 0 : g.call(n, [c], {
      paneId: "candle_pane",
      absolute: !0
    }), y = Number((m = f == null ? void 0 : f[0]) == null ? void 0 : m.x);
    return !Number.isFinite(y) || y < -2 || y > t.clientWidth + 2 ? null : y;
  }, $t = (o) => {
    var S, ne, ie, ae;
    const i = o ?? et();
    if (!n || !i.enabled || !i.anchorLine) {
      u1(null);
      return;
    }
    const l = k9(i), c = (S = n.getDom) == null ? void 0 : S.call(n, "candle_pane", ct.Main), f = (ne = c == null ? void 0 : c.getBoundingClientRect) == null ? void 0 : ne.call(c), y = (ie = r == null ? void 0 : r.getBoundingClientRect) == null ? void 0 : ie.call(r), g = (ae = t == null ? void 0 : t.getBoundingClientRect) == null ? void 0 : ae.call(t), m = n.getSize("candle_pane", ct.Main), _ = f && Number.isFinite(f.top) ? f.top - ((y == null ? void 0 : y.top) ?? (g == null ? void 0 : g.top) ?? 0) : 0, L = Math.max(1, (f == null ? void 0 : f.height) ?? (m == null ? void 0 : m.height) ?? 0);
    if (l === null) {
      u1(null);
      return;
    }
    u1({
      left: l,
      top: _,
      height: L
    });
  }, zr = async (o, i) => {
    if (n) {
      d(!0), Et(!0);
      try {
        const l = V(), c = o.from <= o.to ? o : {
          from: o.to,
          to: o.from
        }, f = C9(c), y = i ? f : $9(f, l), g = await e.datafeed.getHistoryKLineData(N(), l, y.from, y.to), m = p9(g, f);
        n.applyNewData(g, g.length > 0), Ae(f), requestAnimationFrame(() => {
          const _ = b9(g, f);
          i ? Pn(i) : (_9(m), n == null || n.scrollToDataIndex(_, 0), H1(v9(m, f))), $t();
        });
      } finally {
        d(!1), Et(!1);
      }
    }
  }, x9 = async (o) => {
    Me(o), await zr(m9(o), o);
  }, L9 = (o) => {
    const l = {
      ...o,
      timestamp: (() => !n || o.anchorPoint === "date" ? o.timestamp : Fr(o.anchorPoint, o.timestamp))()
    };
    gt(l), go(l), l.enabled ? (Me(l.timestamp), requestAnimationFrame(() => {
      Ur(l), $t(l);
    })) : requestAnimationFrame(() => $t(l));
  };
  nr(() => {
    if (window.addEventListener("resize", Pr), n = P9(t, {
      customApi: {
        formatDate: (g, m, _, L) => {
          switch (V().timespan) {
            case "minute":
              return L === q1.XAxis ? O.formatDate(g, m, "HH:mm") : O.formatDate(g, m, "YYYY-MM-DD HH:mm");
            case "hour":
              return L === q1.XAxis ? O.formatDate(g, m, "MM-DD HH:mm") : O.formatDate(g, m, "YYYY-MM-DD HH:mm");
            case "day":
            case "week":
              return O.formatDate(g, m, "YYYY-MM-DD");
            case "month":
              return L === q1.XAxis ? O.formatDate(g, m, "YYYY-MM") : O.formatDate(g, m, "YYYY-MM-DD");
            case "year":
              return L === q1.XAxis ? O.formatDate(g, m, "YYYY") : O.formatDate(g, m, "YYYY-MM-DD");
          }
          return O.formatDate(g, m, "YYYY-MM-DD HH:mm");
        }
      }
    }), n) {
      const g = n.getDom("candle_pane", ct.Main);
      if (g) {
        let _ = document.createElement("div");
        if (_.className = "klinecharts-pro-watermark", O.isString(e.watermark)) {
          const L = e.watermark.replace(/(^\s*)|(\s*$)/g, "");
          _.innerHTML = L;
        } else
          _.appendChild(e.watermark);
        g.appendChild(_);
      }
      const m = n.getDom("candle_pane", ct.YAxis);
      a = document.createElement("span"), a.className = "klinecharts-pro-price-unit", m == null || m.appendChild(a);
    }
    let o = !1;
    const i = () => {
      const g = N();
      if (g != null && g.ticker)
        try {
          const m = Array.from(Se.values());
          st.saveDrawings(g.ticker, m);
        } catch (m) {
          console.error("âŒ Error refreshing local storage:", m);
        }
    }, l = (g) => {
      o || (o = !0, g.preventDefault());
    };
    setTimeout(() => {
      t && t.addEventListener("contextmenu", l);
    }, 1e3), document.addEventListener("contextmenu", (g) => {
      t && t.contains(g.target) && l(g);
    });
    const c = n == null ? void 0 : n.removeOverlay;
    n && c && (n.removeOverlay = function(...g) {
      const m = c.apply(this, g), _ = g[0];
      let L;
      if (typeof _ == "string" ? L = _ : _ && typeof _ == "object" && _.id && (L = _.id), L) {
        Se.delete(L);
        const S = Oe.get(L);
        S && (S.checkInterval && clearInterval(S.checkInterval), S.mouseUpHandler && (document.removeEventListener("mouseup", S.mouseUpHandler), document.removeEventListener("touchend", S.mouseUpHandler)), Oe.delete(L)), i();
      }
      return m;
    }), X().forEach((g) => {
      nn(n, g, !0, {
        id: "candle_pane"
      });
    });
    const f = {};
    e.subIndicators.forEach((g) => {
      const m = nn(n, g, !0);
      m && (f[g] = m);
    }), W(f), n == null || n.loadMore((g) => {
      d(!0), (async () => {
        try {
          const _ = V(), [L] = Sn(_, g, 1), [S] = Sn(_, L, 500), ne = await e.datafeed.getHistoryKLineData(N(), _, S, L);
          n == null || n.applyMoreData(ne, ne.length > 0);
        } finally {
          d(!1);
        }
      })();
    }), n == null || n.subscribeAction(St.OnTooltipIconClick, (g) => {
      if (g.indicatorName)
        switch (g.iconId) {
          case "visible": {
            n == null || n.overrideIndicator({
              name: g.indicatorName,
              visible: !0
            }, g.paneId);
            const m = g.paneId === "candle_pane" ? "main" : "sub";
            Ge(g.indicatorName, g.paneId, m, "change");
            break;
          }
          case "invisible": {
            n == null || n.overrideIndicator({
              name: g.indicatorName,
              visible: !1
            }, g.paneId);
            const m = g.paneId === "candle_pane" ? "main" : "sub";
            Ge(g.indicatorName, g.paneId, m, "change");
            break;
          }
          case "setting": {
            const m = n == null ? void 0 : n.getIndicatorByPaneId(g.paneId, g.indicatorName);
            f1({
              visible: !0,
              indicatorName: g.indicatorName,
              paneId: g.paneId,
              calcParams: m.calcParams
            });
            break;
          }
          case "close":
            if (g.paneId === "candle_pane") {
              const m = [...X()];
              n == null || n.removeIndicator("candle_pane", g.indicatorName), m.splice(m.indexOf(g.indicatorName), 1), J(m), Ge(g.indicatorName, "candle_pane", "main", "remove");
            } else {
              const m = {
                ...ve()
              };
              n == null || n.removeIndicator(g.paneId, g.indicatorName), delete m[g.indicatorName], W(m), Ge(g.indicatorName, g.paneId, "sub", "remove");
            }
        }
    }), n == null || n.subscribeAction(St.OnCrosshairChange, tt), Nr.forEach((g) => {
      n == null || n.subscribeAction(g, Or);
    }), R1 = window.setInterval(() => be(), 1e3), be(), document.addEventListener("mousedown", yr);
    const y = n == null ? void 0 : n.createOverlay;
    n && y && (n.createOverlay = function(...g) {
      var S;
      const m = m1(g[0]), _ = y.apply(this, [m, ...g.slice(1)]), L = typeof _ == "string" ? _ : null;
      return L && !((S = m.extendData) != null && S.isOrderPreviewLine) && (wn(L, m.name || "unknown"), Mt(L), Kt()), _;
    });
  }), xt(() => {
    window.removeEventListener("resize", Pr), n == null || n.unsubscribeAction(St.OnCrosshairChange, tt), Nr.forEach((o) => {
      n == null || n.unsubscribeAction(o, Or);
    }), R1 && (window.clearInterval(R1), R1 = void 0), j1 && (window.clearTimeout(j1), j1 = void 0), document.removeEventListener("mousedown", yr), Oe.clear(), Se.clear(), v0(t);
  }), Ze(() => {
    const o = N();
    o != null && o.priceCurrency ? (a.innerHTML = o == null ? void 0 : o.priceCurrency.toLocaleUpperCase(), a.style.display = "flex") : a.style.display = "none", n == null || n.setPriceVolumePrecision((o == null ? void 0 : o.pricePrecision) ?? 2, (o == null ? void 0 : o.volumePrecision) ?? 0);
  });
  const w9 = (o) => {
    const i = new Date(o), l = i.getFullYear(), c = `${i.getMonth() + 1}`.padStart(2, "0"), f = `${i.getDate()}`.padStart(2, "0"), y = `${i.getHours()}`.padStart(2, "0"), g = `${i.getMinutes()}`.padStart(2, "0"), m = `${l}-${c}-${f}`;
    switch (V().timespan) {
      case "minute":
      case "hour":
        return `${m} ${y}:${g}`;
      case "day":
      case "week":
        return m;
      case "month":
        return m;
      case "year":
        return m;
    }
    return `${m} ${y}:${g}`;
  }, A9 = (o, i) => {
    var _, L;
    const {
      current: l
    } = o, c = i.tooltip.text.color, f = l.close > l.open ? i.bar.upColor : l.close < l.open ? i.bar.downColor : i.bar.noChangeColor, y = Math.min(Math.max(((_ = N()) == null ? void 0 : _.pricePrecision) ?? 2, 0), 8), g = Math.min(Math.max(((L = N()) == null ? void 0 : L.volumePrecision) ?? 0, 0), 8), m = (S) => ({
      text: O.formatPrecision(S, y),
      color: f
    });
    return [{
      title: "time",
      value: {
        text: w9(l.timestamp),
        color: c
      }
    }, {
      title: "open",
      value: m(l.open)
    }, {
      title: "high",
      value: m(l.high)
    }, {
      title: "low",
      value: m(l.low)
    }, {
      title: "close",
      value: m(l.close)
    }, {
      title: "volume",
      value: {
        text: O.formatBigNumber(O.formatPrecision(l.volume ?? i.tooltip.defaultValue, g)),
        color: f
      }
    }];
  }, W1 = () => {
    n == null || n.setStyles({
      candle: {
        tooltip: {
          custom: A9,
          rect: {
            offsetLeft: 0,
            paddingLeft: 0
          }
        }
      }
    });
  };
  return Ze((o) => {
    const i = N(), l = V();
    let c = !0;
    return xt(() => {
      c = !1;
    }), o && e.datafeed.unsubscribe(o.symbol, o.period), d(!0), Et(!0), (async () => {
      try {
        const y = dt(et), g = y.enabled && (!o || o.symbol.ticker === i.ticker || y.acrossTokens), m = g ? y9(y, l) : null, [_, L] = m ? [m.from, m.to] : Sn(l, (/* @__PURE__ */ new Date()).getTime(), 500), S = await e.datafeed.getHistoryKLineData(i, l, _, L);
        if (!c)
          return;
        n == null || n.applyNewData(S, S.length > 0), g ? requestAnimationFrame(() => {
          Ur(y), $t(y);
        }) : $t(), be(), setTimeout(() => {
          c && (An(i == null ? void 0 : i.ticker), be());
        }, 0), e.datafeed.subscribe(i, l, (ne) => {
          n == null || n.updateData(ne), be();
        });
      } finally {
        c && (d(!1), Et(!1));
      }
    })(), {
      symbol: i,
      period: l
    };
  }), Ze(() => {
    const o = h();
    n == null || n.setStyles(o);
    const i = o === "dark" ? "#929AA5" : "#76808F";
    W1(), n == null || n.setStyles({
      indicator: {
        tooltip: {
          icons: [{
            id: "visible",
            position: Y1.Middle,
            marginLeft: U().visibleMarginLeft,
            marginTop: U().marginTop,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: U().size,
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "invisible",
            position: Y1.Middle,
            marginLeft: U().secondaryMarginLeft,
            marginTop: U().marginTop,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: U().size,
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "setting",
            position: Y1.Middle,
            marginLeft: U().secondaryMarginLeft,
            marginTop: U().marginTop,
            marginBottom: 0,
            marginRight: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: U().size,
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "close",
            position: Y1.Middle,
            marginLeft: U().secondaryMarginLeft,
            marginTop: U().marginTop,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: U().size,
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }]
        }
      }
    });
  }), Ze(() => {
    n == null || n.setLocale(w());
  }), Ze(() => {
    n == null || n.setTimezone(se().key);
  }), Ze(() => {
    if (x()) {
      _t(x()), n == null || n.setStyles(x()), le(z7(n.getStyles()));
      const o = ce();
      if (o) {
        F(o);
        const i = ye(o);
        _t(i), n == null || n.setStyles(i);
      }
      W1();
    }
  }), [Bm.cloneNode(!0), A(nf, {
    get locale() {
      return e.locale;
    },
    get symbol() {
      return N();
    },
    get spread() {
      return Bt();
    },
    get period() {
      return V();
    },
    get periods() {
      return e.periods;
    },
    onMenuClick: async () => {
      try {
        await ni(() => o1(!Bt())), n == null || n.resize();
      } catch {
      }
    },
    onSymbolClick: () => {
      L1(!i1());
    },
    get onMobilePeriodClick() {
      return e.onMobilePeriodClick;
    },
    onMobileMoreClick: () => {
      e.onMobileMoreClick ? e.onMobileMoreClick() : T1(!0);
    },
    onPeriodChange: R,
    onTimeToolsClick: () => {
      Me(Date.now()), k(!0);
    },
    onIndicatorClick: () => {
      Z((o) => !o);
    },
    onTimezoneClick: () => {
      ee((o) => !o);
    },
    onSettingClick: () => {
      Q((o) => !o);
    },
    onScreenshotClick: () => {
      if (n) {
        const o = e.screenshotBackgroundColor || (e.theme === "dark" ? "#11131E" : "#ffffff"), i = n.getConvertPictureUrl(!0, "jpeg", o);
        Ce(i);
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
      return ze();
    },
    onOrderToolsStateChange: Rt
  }), (() => {
    const o = Em.cloneNode(!0), i = o.firstChild, l = i.nextSibling;
    return o.addEventListener("mouseleave", () => {
      Ft(null), We(!1);
    }), kt((c) => r = c, o), i.$$click = (c) => {
      c.preventDefault(), c.stopPropagation(), D();
    }, i.$$mousedown = (c) => {
      c.preventDefault(), c.stopPropagation();
    }, C(o, A(de, {
      get when() {
        return w1();
      },
      get children() {
        return A(Go, {});
      }
    }), l), C(o, A(de, {
      get when() {
        return Bt();
      },
      get children() {
        return A(Og, {
          get locale() {
            return e.locale;
          },
          onDrawingItemClick: (c) => {
            n == null || n.createOverlay(m1(c));
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
    }), l), kt((c) => t = c, l), C(o, A(de, {
      get when() {
        return B1();
      },
      keyed: !0,
      children: (c) => (() => {
        const f = Fm.cloneNode(!0);
        return K((y) => {
          const g = `${c.left}px`, m = `${c.top}px`, _ = `${c.height}px`;
          return g !== y._v$ && f.style.setProperty("left", y._v$ = g), m !== y._v$2 && f.style.setProperty("top", y._v$2 = m), _ !== y._v$3 && f.style.setProperty("height", y._v$3 = _), y;
        }, {
          _v$: void 0,
          _v$2: void 0,
          _v$3: void 0
        }), f;
      })()
    }), null), C(o, A(de, {
      get when() {
        return c1();
      },
      keyed: !0,
      children: (c) => (() => {
        const f = Um.cloneNode(!0);
        return C(f, () => c.text), K((y) => {
          const g = `${c.left}px`, m = `${c.top}px`;
          return g !== y._v$4 && f.style.setProperty("left", y._v$4 = g), m !== y._v$5 && f.style.setProperty("top", y._v$5 = m), y;
        }, {
          _v$4: void 0,
          _v$5: void 0
        }), f;
      })()
    }), null), C(o, A(de, {
      get when() {
        return N1();
      },
      keyed: !0,
      children: (c) => (() => {
        const f = zm.cloneNode(!0), y = f.firstChild, g = y.nextSibling;
        return f.style.setProperty("right", "0px"), C(y, () => c.priceText), C(g, () => c.text), K((m) => {
          const _ = `${c.top}px`, L = `${c.width}px`, S = c.color, ne = `${c.borderRadius}px`, ie = c.textFamily, ae = c.textWeight, Y = `${c.paddingLeft}px`, fe = `${c.paddingRight}px`, _e = `${c.paddingTop}px`, ke = `${c.paddingBottom}px`, Pe = `${c.textSize}px`, G = `${Math.max(10, c.textSize - 1)}px`;
          return _ !== m._v$6 && f.style.setProperty("top", m._v$6 = _), L !== m._v$7 && f.style.setProperty("width", m._v$7 = L), S !== m._v$8 && f.style.setProperty("background", m._v$8 = S), ne !== m._v$9 && f.style.setProperty("border-radius", m._v$9 = ne), ie !== m._v$10 && f.style.setProperty("font-family", m._v$10 = ie), ae !== m._v$11 && f.style.setProperty("font-weight", m._v$11 = ae), Y !== m._v$12 && f.style.setProperty("padding-left", m._v$12 = Y), fe !== m._v$13 && f.style.setProperty("padding-right", m._v$13 = fe), _e !== m._v$14 && f.style.setProperty("padding-top", m._v$14 = _e), ke !== m._v$15 && f.style.setProperty("padding-bottom", m._v$15 = ke), Pe !== m._v$16 && y.style.setProperty("font-size", m._v$16 = Pe), G !== m._v$17 && g.style.setProperty("font-size", m._v$17 = G), m;
        }, {
          _v$6: void 0,
          _v$7: void 0,
          _v$8: void 0,
          _v$9: void 0,
          _v$10: void 0,
          _v$11: void 0,
          _v$12: void 0,
          _v$13: void 0,
          _v$14: void 0,
          _v$15: void 0,
          _v$16: void 0,
          _v$17: void 0
        }), f;
      })()
    }), null), C(o, A(de, {
      get when() {
        return je();
      },
      keyed: !0,
      children: (c) => (() => {
        const f = jm.cloneNode(!0), y = f.firstChild, g = y.nextSibling, m = g.nextSibling, _ = m.firstChild, L = m.nextSibling, S = L.firstChild, ne = S.firstChild, ie = ne.nextSibling, ae = ie.firstChild, Y = L.nextSibling, fe = Y.firstChild, _e = Y.nextSibling, ke = _e.nextSibling, Pe = ke.nextSibling;
        return f.$$click = (G) => {
          G.stopPropagation();
        }, f.$$mousedown = (G) => {
          G.preventDefault(), G.stopPropagation();
        }, y.$$mousedown = l9, g.$$click = a9, _.$$click = () => Qe(Ye() === "color" ? null : "color"), C(m, A(de, {
          get when() {
            return Ye() === "color";
          },
          get children() {
            const G = Vm.cloneNode(!0), xe = G.firstChild;
            return C(xe, A(_1, {
              each: d1,
              children: (me) => (() => {
                const De = Qm.cloneNode(!0);
                return De.$$click = () => s9(me), De.style.setProperty("background", me), K(() => ge(De, `overlay-toolbar-color-swatch ${c.color.toLowerCase() === me.toLowerCase() ? "selected" : ""}`)), De;
              })()
            })), G;
          }
        }), null), S.$$click = () => Qe(Ye() === "width" ? null : "width"), C(ie, () => c.lineSize, ae), C(L, A(de, {
          get when() {
            return Ye() === "width";
          },
          get children() {
            const G = Km.cloneNode(!0);
            return C(G, A(_1, {
              each: [1, 2, 3, 4],
              children: (xe) => (() => {
                const me = Zm.cloneNode(!0), De = me.firstChild;
                return me.$$click = () => i9(xe), De.style.setProperty("height", `${xe}px`), K(() => ge(me, c.lineSize === xe ? "selected" : "")), me;
              })()
            })), G;
          }
        }), null), fe.$$click = () => Qe(Ye() === "style" ? null : "style"), C(Y, A(de, {
          get when() {
            return Ye() === "style";
          },
          get children() {
            const G = Rm.cloneNode(!0), xe = G.firstChild, me = xe.nextSibling, De = me.nextSibling;
            return xe.$$click = () => Mn(Ke.Solid, []), me.$$click = () => Mn(Ke.Dashed, [6, 4]), De.$$click = () => Mn(Ke.Dashed, [2, 4]), K((Ne) => {
              var ot, it;
              const nt = c.lineStyle === Ke.Solid ? "selected" : "", lt = c.lineStyle === Ke.Dashed && ((ot = c.dashedValue) == null ? void 0 : ot[0]) === 6 ? "selected" : "", rt = c.lineStyle === Ke.Dashed && ((it = c.dashedValue) == null ? void 0 : it[0]) === 2 ? "selected" : "";
              return nt !== Ne._v$18 && ge(xe, Ne._v$18 = nt), lt !== Ne._v$19 && ge(me, Ne._v$19 = lt), rt !== Ne._v$20 && ge(De, Ne._v$20 = rt), Ne;
            }, {
              _v$18: void 0,
              _v$19: void 0,
              _v$20: void 0
            }), G;
          }
        }), null), _e.$$click = o9, ke.$$click = r9, Pe.$$click = n9, K((G) => {
          const xe = `${c.x}px`, me = `${c.y}px`, De = `overlay-toolbar-icon edit ${Ye() === "color" ? "active" : ""}`, Ne = `overlay-toolbar-line-size ${Ye() === "width" ? "active" : ""}`, nt = `overlay-toolbar-icon minus ${Ye() === "style" ? "active" : ""}`, lt = `overlay-toolbar-icon visibility ${c.visible ? "" : "muted"}`, rt = c.visible ? "Hide" : "Show", ot = `overlay-toolbar-icon lock ${c.locked ? "active" : ""}`, it = c.locked ? "Unlock" : "Lock";
          return xe !== G._v$21 && f.style.setProperty("left", G._v$21 = xe), me !== G._v$22 && f.style.setProperty("top", G._v$22 = me), De !== G._v$23 && ge(_, G._v$23 = De), Ne !== G._v$24 && ge(S, G._v$24 = Ne), nt !== G._v$25 && ge(fe, G._v$25 = nt), lt !== G._v$26 && ge(_e, G._v$26 = lt), rt !== G._v$27 && Ee(_e, "title", G._v$27 = rt), ot !== G._v$28 && ge(ke, G._v$28 = ot), it !== G._v$29 && Ee(ke, "title", G._v$29 = it), G;
        }, {
          _v$21: void 0,
          _v$22: void 0,
          _v$23: void 0,
          _v$24: void 0,
          _v$25: void 0,
          _v$26: void 0,
          _v$27: void 0,
          _v$28: void 0,
          _v$29: void 0
        }), f;
      })()
    }), null), C(o, A(de, {
      get when() {
        return pt();
      },
      keyed: !0,
      children: (c) => (() => {
        const f = Hm.cloneNode(!0), y = f.firstChild;
        return f.addEventListener("mouseleave", () => {
          mt() || We(!1);
        }), f.$$mousemove = (g) => {
          g.stopPropagation(), Xe();
        }, f.addEventListener("mouseenter", () => {
          We(!0), Xe();
        }), y.$$click = (g) => {
          g.stopPropagation(), We(!0), At({
            y: c.y,
            price: c.price,
            yAxisWidth: S1()
          }), at(!0), Xe();
        }, y.$$mousedown = (g) => {
          g.preventDefault(), g.stopPropagation(), Xe();
        }, C(y, (() => {
          const g = q(() => {
            var m;
            return !!((m = e.orderTools) != null && m.quickOrderPlusIcon);
          });
          return () => g() ? (() => {
            const m = Wm.cloneNode(!0);
            return K(() => m.innerHTML = e.orderTools.quickOrderPlusIcon), m;
          })() : qm.cloneNode(!0);
        })()), K((g) => {
          const m = `${Math.max(0, c.y - 12)}px`, _ = `${S1()}px`, L = ze().quickOrderPlusButton ? "block" : "none";
          return m !== g._v$30 && f.style.setProperty("top", g._v$30 = m), _ !== g._v$31 && f.style.setProperty("right", g._v$31 = _), L !== g._v$32 && f.style.setProperty("display", g._v$32 = L), g;
        }, {
          _v$30: void 0,
          _v$31: void 0,
          _v$32: void 0
        }), f;
      })()
    }), null), C(o, A(de, {
      get when() {
        return q(() => !!mt())() && Ut();
      },
      keyed: !0,
      children: (c) => (() => {
        const f = Ym.cloneNode(!0), y = f.firstChild, g = y.firstChild, m = g.firstChild, _ = m.nextSibling, L = _.nextSibling, S = L.nextSibling;
        S.nextSibling;
        const ne = g.nextSibling, ie = ne.firstChild, ae = ie.nextSibling, Y = ae.nextSibling, fe = Y.nextSibling;
        fe.nextSibling;
        const _e = ne.nextSibling, ke = _e.nextSibling, Pe = ke.firstChild, G = Pe.nextSibling;
        G.nextSibling;
        const xe = ke.nextSibling;
        return xe.firstChild, f.addEventListener("mouseleave", () => We(!1)), f.addEventListener("mouseenter", () => We(!0)), y.$$mousemove = () => {
          Xe();
        }, y.$$mousedown = (me) => {
          me.preventDefault(), me.stopPropagation(), Xe();
        }, g.$$click = () => jt("limit"), C(g, () => N().shortName ?? N().name ?? N().ticker, _), C(g, () => $(c.price), S), ne.$$click = () => jt("stop"), C(ne, () => N().shortName ?? N().name ?? N().ticker, ae), C(ne, () => $(c.price), fe), _e.$$click = () => jt("create"), ke.$$click = z1, C(ke, () => $(c.price), G), xe.$$click = V1, C(xe, () => $(c.price), null), K((me) => {
          const De = `${Math.max(0, c.y + 24)}px`, Ne = `${c.yAxisWidth + xn}px`;
          return De !== me._v$33 && f.style.setProperty("top", me._v$33 = De), Ne !== me._v$34 && f.style.setProperty("right", me._v$34 = Ne), me;
        }, {
          _v$33: void 0,
          _v$34: void 0
        }), f;
      })()
    }), null), K(() => Ee(l, "data-drawing-bar-visible", Bt())), o;
  })(), A(de, {
    get when() {
      return i1();
    },
    get children() {
      return A(mm, {
        get locale() {
          return e.locale;
        },
        get datafeed() {
          return e.datafeed;
        },
        onSymbolSelected: (o) => {
          oe(o);
        },
        onClose: () => {
          L1(!1);
        }
      });
    }
  }), A(de, {
    get when() {
      return he();
    },
    get children() {
      return A(Ng, {
        get locale() {
          return e.locale;
        },
        get mainIndicators() {
          return X();
        },
        get subIndicators() {
          return ve();
        },
        onClose: () => {
          Z(!1);
        },
        onMainIndicatorChange: (o) => {
          const i = [...X()];
          o.added ? (nn(n, o.name, !0, {
            id: "candle_pane"
          }), i.push(o.name), Ge(o.name, "candle_pane", "main", "add")) : (n == null || n.removeIndicator("candle_pane", o.name), i.splice(i.indexOf(o.name), 1), Ge(o.name, "candle_pane", "main", "remove")), J(i);
        },
        onSubIndicatorChange: (o) => {
          const i = {
            ...ve()
          };
          if (o.added) {
            const l = nn(n, o.name);
            l && (i[o.name] = l, Ge(o.name, l, "sub", "add"));
          } else
            o.paneId && (n == null || n.removeIndicator(o.paneId, o.name), delete i[o.name], Ge(o.name, o.paneId, "sub", "remove"));
          W(i);
        }
      });
    }
  }), A(de, {
    get when() {
      return H();
    },
    get children() {
      return A(Bg, {
        get locale() {
          return e.locale;
        },
        get timezone() {
          return se();
        },
        onClose: () => {
          ee(!1);
        },
        onConfirm: T
      });
    }
  }), A(de, {
    get when() {
      return j();
    },
    get children() {
      return A(im, {
        get locale() {
          return e.locale;
        },
        get currentStyles() {
          return O.clone(n.getStyles());
        },
        get defaultStyles() {
          return z();
        },
        get currentBackgroundColor() {
          return I();
        },
        get defaultBackgroundColor() {
          return P();
        },
        onClose: () => {
          Q(!1);
        },
        onChange: (o) => {
          const i = o;
          F(i);
          const l = ye(i);
          _t(l), n == null || n.setStyles(l), n == null || n.resize(), W1();
        },
        onSaveChartStyle: (o) => {
          re(o);
        },
        onResetChartStyle: () => {
          E(), t == null || t.style.removeProperty("--klinecharts-pro-chart-background-color");
        },
        onRestoreDefault: (o) => {
          const i = {};
          o.forEach((c) => {
            const f = c.key;
            if (f === "chart.backgroundColor") {
              Ie(i, f, P());
              return;
            }
            Ie(i, f, O.formatValue(z(), f));
          }), F(i);
          const l = ye(i);
          _t(l), n == null || n.setStyles(l), n == null || n.resize(), W1();
        }
      });
    }
  }), A(de, {
    get when() {
      return Te().length > 0;
    },
    get children() {
      return A(sm, {
        get locale() {
          return e.locale;
        },
        get url() {
          return Te();
        },
        onClose: () => {
          Ce("");
        }
      });
    }
  }), A(de, {
    get when() {
      return Ue();
    },
    get children() {
      return A(Im, {
        get initialTimestamp() {
          return pe();
        },
        get initialRange() {
          return ft();
        },
        get anchorSettings() {
          return et();
        },
        onClose: () => {
          k(!1);
        },
        onGoToDate: x9,
        onTimeRange: (o) => {
          zr(o);
        },
        onTimeAnchorChange: L9
      });
    }
  }), A(de, {
    get when() {
      return Tt().visible;
    },
    get children() {
      return A(dm, {
        get locale() {
          return e.locale;
        },
        get params() {
          return Tt();
        },
        onClose: () => {
          f1({
            visible: !1,
            indicatorName: "",
            paneId: "",
            calcParams: []
          });
        },
        onConfirm: (o) => {
          const i = Tt();
          n == null || n.overrideIndicator({
            name: i.indicatorName,
            calcParams: o
          }, i.paneId);
          const l = i.paneId === "candle_pane" ? "main" : "sub";
          Ge(i.indicatorName, i.paneId, l, "change");
        }
      });
    }
  }), A(de, {
    get when() {
      return A1();
    },
    get children() {
      return A(Cm, {
        get locale() {
          return e.locale;
        },
        onIndicatorClick: () => {
          Z(!0);
        },
        onTimezoneClick: () => {
          ee(!0);
        },
        onSettingClick: () => {
          Q(!0);
        },
        onTimeToolsClick: () => {
          Me(Date.now()), k(!0);
        },
        onClose: () => {
          T1(!1);
        }
      });
    }
  })];
};
He(["mousedown", "click", "mousemove"]);
const ey = /* @__PURE__ */ p('<svg class="logo" viewBox="0 0 80 92"><path d="M28.148808359375,51.7280513671875L22.963588359375,51.7280513671875C21.572648359375002,51.7280513671875,20.445068359375,52.6220613671875,20.445068359375,53.7248813671875L20.445068359375,72.3979013671875C20.445068359375,73.5007013671875,21.572648359375002,74.39470136718751,22.963588359375,74.39470136718751L33.926568359375,74.39470136718751C35.317468359375,74.39470136718751,36.445068359375,73.5007013671875,36.445068359375,72.3979013671875L36.445068359375,53.7248813671875C36.445068359375,52.6220613671875,35.317468359375,51.7280513671875,33.926568359375,51.7280513671875L28.741398359374998,51.7280513671875L28.741398359374998,46.2963223671875C28.741398359374998,46.1665793671875,28.608748359375,46.0614013671875,28.445108359375,46.0614013671875C28.281468359375,46.0614013671875,28.148808359375,46.1665793671875,28.148808359375,46.2963223671875L28.148808359375,51.7280513671875ZM28.741398359374998,74.3948013671875L28.741398359374998,79.82650136718749C28.741398359374998,79.9563013671875,28.608748359375,80.0614013671875,28.445108359375,80.0614013671875C28.281468359375,80.0614013671875,28.148808359375,79.9563013671875,28.148808359375,79.82650136718749L28.148808359375,74.3948013671875L28.741398359374998,74.3948013671875Z"></path><path d="M51.148808359374996,44.7280513671875L45.963588359375,44.7280513671875C44.572648359375,44.7280513671875,43.445068359375,45.6220613671875,43.445068359375,46.7248813671875L43.445068359375,65.3979013671875C43.445068359375,66.5007013671875,44.572648359375,67.39470136718751,45.963588359375,67.39470136718751L56.926568359375,67.39470136718751C58.317468359375,67.39470136718751,59.445068359375,66.5007013671875,59.445068359375,65.3979013671875L59.445068359375,46.7248813671875C59.445068359375,45.6220613671875,58.317468359375,44.7280513671875,56.926568359375,44.7280513671875L51.741398359375,44.7280513671875L51.741398359375,39.2963223671875C51.741398359375,39.1665793671875,51.608748359375,39.0614013671875,51.445108359375,39.0614013671875C51.281468359375,39.0614013671875,51.148808359374996,39.1665793671875,51.148808359374996,39.2963223671875L51.148808359374996,44.7280513671875ZM51.741398359375,67.3948013671875L51.741398359375,72.82650136718749C51.741398359375,72.9563013671875,51.608748359375,73.0614013671875,51.445108359375,73.0614013671875C51.281468359375,73.0614013671875,51.148808359374996,72.9563013671875,51.148808359374996,72.82650136718749L51.148808359374996,67.3948013671875L51.741398359375,67.3948013671875Z"></path><path d="M17.7274,90.6541C17.5901,90.6541,17.4517,90.6436,17.3121,90.6225C9.93219,89.5095,4.80718,86.7136,2.07787,82.3084C-1.1223,77.1437,0.241766,71.6314,0.56829,70.5137C5.37624,46.647,15.0785,38.4945,21.5025,33.0957C22.9683,31.8633,24.2342,30.7995,25.1676,29.7672C25.4105,29.4984,25.6051,29.2154,25.7556,28.9202C24.7465,29.2231,24.1971,29.4326,24.1703,29.4429C22.908,29.9368,21.4777,29.3247,20.9761,28.076C20.4756,26.8272,21.0897,25.4146,22.352,24.9172C22.5042,24.8571,23.5312,24.4607,25.3073,23.9616C24.087,21.4425,21.7693,18.7949,19.7125,16.6431L19.2819,16.1902C16.2438,12.9776,14.6017,4.80159,14.3036,3.19471C14.1306,2.26212,14.4636,1.30796,15.1814,0.679657C15.8995,0.0512175,16.8976,-0.159672,17.8125,0.123747C22.7731,1.66274,24.2638,1.81255,27.2321,2.11098C28.7357,2.26195,29.83,3.59029,29.6762,5.07662C29.5236,6.56295,28.182,7.64786,26.6784,7.49454C24.4992,7.27569,22.9517,7.09896,20.724,6.56646C21.4493,9.09088,22.3803,11.5427,23.2771,12.4919L23.6876,12.9237C25.3757,14.69,28.9691,18.45,30.7016,22.7299C35.0392,21.9433,40.8791,21.3359,47.7817,21.7249C48.2004,20.7386,48.8054,19.7953,49.5907,18.9135C49.7137,18.7754,49.8498,18.6502,49.9988,18.539C53.6142,15.8508,57.5491,12.857,59.7803,11.0758C58.1028,11.2502,56.1034,11.0278,53.9124,9.70882C53.2439,9.30622,52.5992,8.89427,51.9662,8.48933C48.4668,6.25164,46.497,5.12109,43.4234,5.94853C41.9647,6.34058,40.4622,5.48975,40.0659,4.04789C39.6695,2.60604,40.5296,1.11853,41.9871,0.726471C47.5602,-0.773825,51.4796,1.73271,54.9364,3.9434L54.9364,3.9434C55.5284,4.32176,56.1318,4.70797,56.7564,5.08482C58.3843,6.06556,59.4858,5.76127,61.2899,5.13865C62.3511,4.77234,63.5567,4.35687,64.8675,4.53476C66.3321,4.73254,67.4406,5.56933,67.9103,6.83096C68.7444,9.07333,67.1035,11.5533,65.5797,13.2374C64.6729,14.2394,60.0845,17.7606,56.4519,20.4957C56.9477,20.3369,57.4767,20.2511,58.026,20.2511C59.4281,20.2511,60.6982,20.8102,61.621,21.7153C65.4948,20.6901,67.87,17.9563,67.9033,17.9175C68.78,16.8888,70.3322,16.7577,71.3721,17.6226C72.412,18.4886,72.5457,20.0253,71.6702,21.054C71.5221,21.2286,69.5063,23.5492,66.0787,25.233C69.5399,26.8822,72.9993,29.682,74.1841,34.4145C74.5106,35.7206,73.7062,37.0407,72.3859,37.3638C72.1871,37.4117,71.9884,37.4351,71.792,37.4351C70.687,37.4351,69.6826,36.6932,69.4046,35.5848C68.4378,31.7217,64.8144,29.7431,61.7619,28.7456C60.8298,29.7349,59.5009,30.3535,58.026,30.3535C55.8642,30.3535,54.0162,29.0245,53.2713,27.1474C53.2022,27.138,53.1331,27.1287,53.0642,27.1195C54.232,29.5936,57.0851,31.9259,58.1868,32.665C58.3157,32.7516,58.4423,32.8523,58.5547,32.9599C66.5865,40.6151,72.4887,48.8133,76.0971,57.3287C76.6815,58.7074,76.0249,60.2932,74.6313,60.8702C74.2976,61.01,73.9388,61.082,73.576,61.082C72.5065,61.082,71.4914,60.4582,71.0525,59.4213C67.7577,51.6455,62.331,44.1074,54.9203,37.0116C53.6073,36.1009,48.0984,31.9917,47.2065,26.583C40.9421,26.2679,35.6187,26.8278,31.6725,27.5336C31.6197,29.527,30.9225,31.5172,29.2456,33.3731C28.0614,34.6827,26.5968,35.915,25.0446,37.2188C21.9414,39.8269,18.2648,42.9169,14.8104,48.1192C11.356,53.3215,8.12389,60.6361,5.9098,71.6934C5.88732,71.8035,5.85893,71.9123,5.82344,72.0188C5.81634,72.041,4.57886,76.0413,6.77344,79.5289C8.6332,82.4828,12.4557,84.4139,18.1367,85.2705C19.6297,85.4953,20.6566,86.8762,20.4295,88.3532C20.2213,89.6944,19.0559,90.6541,17.7274,90.6541ZM35.1195,7.03101C33.3502,7.03101,31.9158,5.61208,31.9158,3.86173C31.9158,2.11139,33.3502,0.69245,35.1195,0.69245C36.8889,0.69245,38.3233,2.11139,38.3233,3.86173C38.3233,5.61208,36.8889,7.03101,35.1195,7.03101ZM57.6848,23.1892L58.414,24.4754C58.8984,24.3623,59.3923,24.3435,59.8644,24.4203C60.2191,24.5005,60.5087,24.7182,60.6663,25.0229C60.8636,25.3394,60.8993,25.7346,60.7646,26.1094C60.5988,26.5176,60.2972,26.8749,59.9085,27.1235L60.31,27.8316L59.7886,28.1294L59.3994,27.443C58.9257,27.7175,58.399,27.883,57.8664,27.9247L57.3744,27.0569C57.6378,27.0741,57.9071,27.048,58.1704,26.9797C58.4501,26.9251,58.7239,26.8323,58.9829,26.7044L58.2801,25.4647C57.8047,25.5877,57.3167,25.6065,56.8549,25.5197C56.4913,25.4263,56.196,25.1971,56.0328,24.8814C55.8433,24.5561,55.8127,24.1572,55.9484,23.7789C56.088,23.373,56.3763,23.0149,56.7584,22.7726L56.4166,22.1699L56.938,21.8721L57.2727,22.4625C57.6615,22.2376,58.0888,22.0901,58.5254,22.0301L59.0042,22.8746C58.5548,22.8828,58.103,22.9906,57.6848,23.1892ZM56.9319,24.2961Q57.1278,24.6417,57.7863,24.5856L57.1695,23.4978Q56.6982,23.884,56.9319,24.2961ZM58.9077,25.3462L59.4981,26.3875L59.499,26.3891Q59.9965,26.0045,59.7628,25.5923Q59.573,25.2576,58.9077,25.3462ZM73.2212,66.5065C73.2212,68.2569,74.6555,69.6758,76.4249,69.6758C78.1943,69.6758,79.6286,68.2569,79.6286,66.5065C79.6286,64.7562,78.1943,63.3372,76.4249,63.3372C74.6555,63.3372,73.2212,64.7562,73.2212,66.5065ZM35.9465,91.8045C35.0734,91.8045,34.2038,91.7987,33.3378,91.7858C31.827,91.7636,30.6203,90.5359,30.6428,89.0402C30.6653,87.5457,31.9158,86.3297,33.4183,86.3742C49.6344,86.6059,65.7512,84.6175,67.6134,84.037C72.1953,82.4184,74.5295,79.3603,74.5295,74.9575C74.5295,73.463,75.754,72.2517,77.2648,72.2517C78.7755,72.2517,80,73.463,80,74.9575C80,81.5992,76.148,86.7686,69.4317,89.142C67.0041,89.9999,51.0955,91.8046,35.9465,91.8045ZM25.2731,92C23.5037,92,22.0693,90.5811,22.0693,88.8307C22.0693,87.0804,23.5037,85.6615,25.2731,85.6615C27.0424,85.6615,28.4768,87.0804,28.4768,88.8307C28.4768,90.5811,27.0424,92,25.2731,92Z"></path></svg>'), ty = ey.cloneNode(!0);
class ay {
  constructor(t) {
    C1(this, "_chartApi", null);
    if (O.isString(t.container)) {
      if (this._container = document.getElementById(t.container), !this._container)
        throw new Error("Container is null");
    } else
      this._container = t.container;
    this._container.classList.add("klinecharts-pro"), this._container.setAttribute("data-theme", t.theme ?? "light");
    const r = this;
    di(() => A(Jm, {
      ref: (n) => {
        r._chartApi = n;
      },
      get styles() {
        return t.styles ?? {};
      },
      get watermark() {
        return t.watermark ?? ty;
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
          orderPreviewLine: !0,
          orderHistory: !0
        };
      }
    }), this._container);
  }
  // Drawing methods
  createOverlay(t) {
    var r, n;
    return ((n = (r = this._chartApi) == null ? void 0 : r.createOverlay) == null ? void 0 : n.call(r, t)) ?? null;
  }
  removeOverlay(t) {
    var r, n;
    (n = (r = this._chartApi) == null ? void 0 : r.removeOverlay) == null || n.call(r, t);
  }
  removeAllOverlay() {
    var t, r;
    (r = (t = this._chartApi) == null ? void 0 : t.removeAllOverlay) == null || r.call(t);
  }
  getAllOverlay() {
    var t, r;
    return ((r = (t = this._chartApi) == null ? void 0 : t.getAllOverlay) == null ? void 0 : r.call(t)) || [];
  }
  getOverlay(t) {
    var r, n;
    return ((n = (r = this._chartApi) == null ? void 0 : r.getOverlay) == null ? void 0 : n.call(r, t)) ?? null;
  }
  overrideOverlay(t) {
    var r, n;
    (n = (r = this._chartApi) == null ? void 0 : r.overrideOverlay) == null || n.call(r, t);
  }
  // Utility methods
  dispose() {
    var t, r;
    (r = (t = this._chartApi) == null ? void 0 : t.dispose) == null || r.call(t);
  }
  resize() {
    var t, r;
    (r = (t = this._chartApi) == null ? void 0 : t.resize) == null || r.call(t);
  }
  getMainIndicators() {
    return this._chartApi.getMainIndicators();
  }
  overrideIndicator(t, r) {
    const n = this._chartApi;
    n && typeof n.overrideIndicator == "function" ? n.overrideIndicator(t, r) : console.warn("overrideIndicator method not available on chart API");
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
    var r;
    (r = this._container) == null || r.setAttribute("data-theme", t), this._chartApi.setTheme(t);
  }
  getTheme() {
    return this._chartApi.getTheme();
  }
  setStyles(t) {
    var r, n;
    _t(t), this._chartApi.setStyles(t), (n = (r = this._chartApi).resize) == null || n.call(r);
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
  autoScalePriceAxis() {
    var t, r;
    (r = (t = this._chartApi) == null ? void 0 : t.autoScalePriceAxis) == null || r.call(t);
  }
  saveDrawings(t) {
    var r, n;
    (n = (r = this._chartApi) == null ? void 0 : r.saveDrawings) == null || n.call(r, t);
  }
  loadDrawings(t) {
    var r, n;
    (n = (r = this._chartApi) == null ? void 0 : r.loadDrawings) == null || n.call(r, t);
  }
  getDrawings(t) {
    var r, n;
    return ((n = (r = this._chartApi) == null ? void 0 : r.getDrawings) == null ? void 0 : n.call(r, t)) || [];
  }
  clearDrawings(t) {
    var r, n;
    (n = (r = this._chartApi) == null ? void 0 : r.clearDrawings) == null || n.call(r, t);
  }
  enableAutoSave(t, r = !0) {
    var n, a;
    (a = (n = this._chartApi) == null ? void 0 : n.enableAutoSave) == null || a.call(n, t, r);
  }
  setIndicatorModalVisible(t) {
    var r, n;
    (n = (r = this._chartApi) == null ? void 0 : r.setIndicatorModalVisible) == null || n.call(r, t);
  }
  setTimezoneModalVisible(t) {
    var r, n;
    (n = (r = this._chartApi) == null ? void 0 : r.setTimezoneModalVisible) == null || n.call(r, t);
  }
  setSettingModalVisible(t) {
    var r, n;
    (n = (r = this._chartApi) == null ? void 0 : r.setSettingModalVisible) == null || n.call(r, t);
  }
  setTimeToolsModalVisible(t) {
    var r, n;
    (n = (r = this._chartApi) == null ? void 0 : r.setTimeToolsModalVisible) == null || n.call(r, t);
  }
  getOrderToolsState() {
    var t, r;
    return ((r = (t = this._chartApi) == null ? void 0 : t.getOrderToolsState) == null ? void 0 : r.call(t)) ?? {
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
      orderPreviewLine: !0,
      orderHistory: !0
    };
  }
  setOrderToolsState(t) {
    var r, n;
    (n = (r = this._chartApi) == null ? void 0 : r.setOrderToolsState) == null || n.call(r, t);
  }
  setOrderPreviewLine(t) {
    var r, n;
    (n = (r = this._chartApi) == null ? void 0 : r.setOrderPreviewLine) == null || n.call(r, t);
  }
  clearOrderPreviewLine() {
    var t, r;
    (r = (t = this._chartApi) == null ? void 0 : t.clearOrderPreviewLine) == null || r.call(t);
  }
  // Forwarded klinecharts chart methods for synchronizing DOM overlays
  // with the canvas (price/pixel conversion, visible-range, data, actions).
  convertToPixel(t, r) {
    return this._chartApi.convertToPixel(t, r);
  }
  convertFromPixel(t, r) {
    return this._chartApi.convertFromPixel(t, r);
  }
  getVisibleRange() {
    return this._chartApi.getVisibleRange();
  }
  getDataList() {
    var t, r;
    return ((r = (t = this._chartApi) == null ? void 0 : t.getDataList) == null ? void 0 : r.call(t)) ?? [];
  }
  getSize(t, r) {
    var n, a;
    return ((a = (n = this._chartApi) == null ? void 0 : n.getSize) == null ? void 0 : a.call(n, t, r)) ?? null;
  }
  getDom(t, r) {
    var n, a;
    return ((a = (n = this._chartApi) == null ? void 0 : n.getDom) == null ? void 0 : a.call(n, t, r)) ?? null;
  }
  subscribeAction(t, r) {
    var n, a;
    (a = (n = this._chartApi) == null ? void 0 : n.subscribeAction) == null || a.call(n, t, r);
  }
  unsubscribeAction(t, r) {
    var n, a;
    (a = (n = this._chartApi) == null ? void 0 : n.unsubscribeAction) == null || a.call(n, t, r);
  }
}
G9.forEach((e) => {
  O9(e);
});
export {
  oy as DefaultDatafeed,
  ay as KLineChartPro,
  iy as loadLocales
};
//# sourceMappingURL=klinecharts-pro.js.map
