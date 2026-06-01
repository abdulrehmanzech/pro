var T9 = Object.defineProperty;
var S9 = (e, n, t) => n in e ? T9(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var dt = (e, n, t) => (S9(e, typeof n != "symbol" ? n + "" : n, t), t);
import { utils as ce, OverlayMode as fn, ActionType as T1, LineType as o1, init as P9, FormatDateType as Dt, DomPosition as R1, dispose as z0, TooltipIconPosition as Nt, CandleType as O9, YAxisType as D9, registerOverlay as N9 } from "klinecharts";
function ft(e, n, t) {
  const r = (e.x - n.x) * Math.cos(t) - (e.y - n.y) * Math.sin(t) + n.x, a = (e.x - n.x) * Math.sin(t) + (e.y - n.y) * Math.cos(t) + n.y;
  return { x: r, y: a };
}
function Cn(e, n) {
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
      y: ce.getLinearYFromCoordinates(e[0], e[1], { x: 0, y: e[0].y })
    } : t = {
      x: n.width,
      y: ce.getLinearYFromCoordinates(e[0], e[1], { x: n.width, y: e[0].y })
    }, { coordinates: [e[0], t] };
  }
  return [];
}
function Sr(e, n) {
  const t = Math.abs(e.x - n.x), r = Math.abs(e.y - n.y);
  return Math.sqrt(t * t + r * r);
}
const I9 = {
  name: "arrow",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const n = e[1].x > e[0].x ? 0 : 1, t = ce.getLinearSlopeIntercept(e[0], e[1]);
      let r;
      t ? r = Math.atan(t[0]) + Math.PI * n : e[1].y > e[0].y ? r = Math.PI / 2 : r = Math.PI / 2 * 3;
      const a = ft({ x: e[1].x - 8, y: e[1].y + 4 }, e[1], r), l = ft({ x: e[1].x - 8, y: e[1].y - 4 }, e[1], r);
      return [
        {
          type: "line",
          attrs: { coordinates: e }
        },
        {
          type: "line",
          ignoreEvent: !0,
          attrs: { coordinates: [a, e[1], l] }
        }
      ];
    }
    return [];
  }
}, E9 = {
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
      const n = Sr(e[0], e[1]);
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
}, F9 = {
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
}, z9 = {
  name: "fibonacciCircle",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const n = Math.abs(e[0].x - e[1].x), t = Math.abs(e[0].y - e[1].y), r = Math.sqrt(n * n + t * t), a = [0.236, 0.382, 0.5, 0.618, 0.786, 1], l = [], h = [];
      return a.forEach((u) => {
        const p = r * u;
        l.push(
          { ...e[0], r: p }
        ), h.push({
          x: e[0].x,
          y: e[0].y + p + 6,
          text: `${(u * 100).toFixed(1)}%`
        });
      }), [
        {
          type: "circle",
          attrs: l,
          styles: { style: "stroke" }
        },
        {
          type: "text",
          ignoreEvent: !0,
          attrs: h
        }
      ];
    }
    return [];
  }
}, K9 = {
  name: "fibonacciSegment",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: n, precision: t }) => {
    const r = [], a = [];
    if (e.length > 1) {
      const l = e[1].x > e[0].x ? e[0].x : e[1].x, h = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0], u = e[0].y - e[1].y, p = n.points, k = p[0].value - p[1].value;
      h.forEach((y) => {
        const w = e[1].y + u * y, A = (p[1].value + k * y).toFixed(t.price);
        r.push({ coordinates: [{ x: e[0].x, y: w }, { x: e[1].x, y: w }] }), a.push({
          x: l,
          y: w,
          text: `${A} (${(y * 100).toFixed(1)}%)`,
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
}, R9 = {
  name: "fibonacciSpiral",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, bounding: n }) => {
    if (e.length > 1) {
      const t = Sr(e[0], e[1]) / Math.sqrt(24), r = e[1].x > e[0].x ? 0 : 1, a = ce.getLinearSlopeIntercept(e[0], e[1]);
      let l;
      a ? l = Math.atan(a[0]) + Math.PI * r : e[1].y > e[0].y ? l = Math.PI / 2 : l = Math.PI / 2 * 3;
      const h = ft(
        { x: e[0].x - t, y: e[0].y },
        e[0],
        l
      ), u = ft(
        { x: e[0].x - t, y: e[0].y - t },
        e[0],
        l
      ), p = [{
        ...h,
        r: t,
        startAngle: l,
        endAngle: l + Math.PI / 2
      }, {
        ...u,
        r: t * 2,
        startAngle: l + Math.PI / 2,
        endAngle: l + Math.PI
      }];
      let k = e[0].x - t, y = e[0].y - t;
      for (let w = 2; w < 9; w++) {
        const A = p[w - 2].r + p[w - 1].r;
        let O = 0;
        switch (w % 4) {
          case 0: {
            O = l, k -= p[w - 2].r;
            break;
          }
          case 1: {
            O = l + Math.PI / 2, y -= p[w - 2].r;
            break;
          }
          case 2: {
            O = l + Math.PI, k += p[w - 2].r;
            break;
          }
          case 3: {
            O = l + Math.PI / 2 * 3, y += p[w - 2].r;
            break;
          }
        }
        const F = O + Math.PI / 2, B = ft({ x: k, y }, e[0], l);
        p.push({
          ...B,
          r: A,
          startAngle: O,
          endAngle: F
        });
      }
      return [
        {
          type: "arc",
          attrs: p
        },
        {
          type: "line",
          attrs: Cn(e, n)
        }
      ];
    }
    return [];
  }
}, j9 = {
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
      const l = e[1].x > e[0].x ? -38 : 4, h = e[1].y > e[0].y ? -2 : 20, u = e[1].x - e[0].x, p = e[1].y - e[0].y;
      [1, 0.75, 0.618, 0.5, 0.382, 0.25, 0].forEach((y) => {
        const w = e[1].x - u * y, A = e[1].y - p * y;
        t.push({ coordinates: [{ x: w, y: e[0].y }, { x: w, y: e[1].y }] }), t.push({ coordinates: [{ x: e[0].x, y: A }, { x: e[1].x, y: A }] }), r = r.concat(Cn([e[0], { x: w, y: e[1].y }], n)), r = r.concat(Cn([e[0], { x: e[1].x, y: A }], n)), a.unshift({
          x: e[0].x + l,
          y: A + 10,
          text: `${y.toFixed(3)}`
        }), a.unshift({
          x: w - 18,
          y: e[0].y + h,
          text: `${y.toFixed(3)}`
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
}, Q9 = {
  name: "fibonacciExtension",
  totalStep: 4,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: n, precision: t }) => {
    const r = [], a = [];
    if (e.length > 2) {
      const l = n.points, h = l[1].value - l[0].value, u = e[1].y - e[0].y, p = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1], k = e[2].x > e[1].x ? e[1].x : e[2].x;
      p.forEach((y) => {
        const w = e[2].y + u * y, A = (l[2].value + h * y).toFixed(t.price);
        r.push({ coordinates: [{ x: e[1].x, y: w }, { x: e[2].x, y: w }] }), a.push({
          x: k,
          y: w,
          text: `${A} (${(y * 100).toFixed(1)}%)`,
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
}, Z9 = {
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
}, V9 = {
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
}, H9 = {
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
}, q9 = {
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
}, Y9 = {
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
}, W9 = {
  name: "abcd",
  totalStep: 5,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    let n = [], t = [];
    const r = ["A", "B", "C", "D"], a = e.map((l, h) => ({
      ...l,
      baseline: "bottom",
      text: `(${r[h]})`
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
}, G9 = {
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
    const t = [], r = [], a = ["X", "A", "B", "C", "D"], l = e.map((h, u) => ({
      ...h,
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
        attrs: l
      }
    ];
  }
}, X9 = [
  I9,
  E9,
  B9,
  U9,
  F9,
  z9,
  K9,
  R9,
  j9,
  Q9,
  Z9,
  V9,
  H9,
  q9,
  Y9,
  W9,
  G9
];
class Sm {
  constructor(n) {
    dt(this, "_apiKey");
    dt(this, "_prevSymbolMarket");
    dt(this, "_ws");
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
    var a, l;
    this._prevSymbolMarket !== n.market ? ((a = this._ws) == null || a.close(), this._ws = new WebSocket(`wss://delayed.polygon.io/${n.market}`), this._ws.onopen = () => {
      var h;
      (h = this._ws) == null || h.send(JSON.stringify({ action: "auth", params: this._apiKey }));
    }, this._ws.onmessage = (h) => {
      var p;
      const u = JSON.parse(h.data);
      u[0].ev === "status" ? u[0].status === "auth_success" && ((p = this._ws) == null || p.send(JSON.stringify({ action: "subscribe", params: `T.${n.ticker}` }))) : "sym" in u && r({
        timestamp: u.s,
        open: u.o,
        high: u.h,
        low: u.l,
        close: u.c,
        volume: u.v,
        turnover: u.vw
      });
    }) : (l = this._ws) == null || l.send(JSON.stringify({ action: "subscribe", params: `T.${n.ticker}` })), this._prevSymbolMarket = n.market;
  }
  unsubscribe(n, t) {
  }
}
const De = {};
function J9(e) {
  De.context = e;
}
const e5 = (e, n) => e === n, $n = Symbol("solid-proxy"), t5 = Symbol("solid-track"), Rt = {
  equals: e5
};
let Pr = Ir;
const f1 = 1, jt = 2, Or = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, mn = {};
var Ae = null;
let O1 = null, pe = null, Fe = null, d1 = null, Sn = 0;
function mt(e, n) {
  const t = pe, r = Ae, a = e.length === 0, l = a ? Or : {
    owned: null,
    cleanups: null,
    context: null,
    owner: n === void 0 ? r : n
  }, h = a ? e : () => e(() => h1(() => Xt(l)));
  Ae = l, pe = null;
  try {
    return v1(h, !0);
  } finally {
    pe = t, Ae = r;
  }
}
function T(e, n) {
  n = n ? Object.assign({}, Rt, n) : Rt;
  const t = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: n.equals || void 0
  }, r = (a) => (typeof a == "function" && (a = a(t.value)), Nr(t, a));
  return [Dr.bind(t), r];
}
function K0(e, n, t) {
  const r = Gt(e, n, !0, f1);
  Z1(r);
}
function I(e, n, t) {
  const r = Gt(e, n, !1, f1);
  Z1(r);
}
function Ke(e, n, t) {
  Pr = s5;
  const r = Gt(e, n, !1, f1);
  r.user = !0, d1 ? d1.push(r) : Z1(r);
}
function Z(e, n, t) {
  t = t ? Object.assign({}, Rt, t) : Rt;
  const r = Gt(e, n, !0, 0);
  return r.observers = null, r.observerSlots = null, r.comparator = t.equals || void 0, Z1(r), Dr.bind(r);
}
function n5(e, n, t) {
  let r, a, l;
  arguments.length === 2 && typeof n == "object" || arguments.length === 1 ? (r = !0, a = e, l = n || {}) : (r = e, a = n, l = t || {});
  let h = null, u = mn, p = null, k = !1, y = "initialValue" in l, w = typeof r == "function" && Z(r);
  const A = /* @__PURE__ */ new Set(), [O, F] = (l.storage || T)(l.initialValue), [B, D] = T(void 0), [R, X] = T(void 0, {
    equals: !1
  }), [U, W] = T(y ? "ready" : "unresolved");
  if (De.context) {
    p = `${De.context.id}${De.context.count++}`;
    let q;
    l.ssrLoadFrom === "initial" ? u = l.initialValue : De.load && (q = De.load(p)) && (u = q[0]);
  }
  function V(q, re, ie, be) {
    return h === q && (h = null, y = !0, (q === u || re === u) && l.onHydrated && queueMicrotask(() => l.onHydrated(be, {
      value: re
    })), u = mn, ue(re, ie)), re;
  }
  function ue(q, re) {
    v1(() => {
      re === void 0 && F(() => q), W(re !== void 0 ? "errored" : "ready"), D(re);
      for (const ie of A.keys())
        ie.decrement();
      A.clear();
    }, !1);
  }
  function z() {
    const q = o5, re = O(), ie = B();
    if (ie !== void 0 && !h)
      throw ie;
    return pe && !pe.user && q && K0(() => {
      R(), h && (q.resolved || A.has(q) || (q.increment(), A.add(q)));
    }), re;
  }
  function j(q = !0) {
    if (q !== !1 && k)
      return;
    k = !1;
    const re = w ? w() : r;
    if (re == null || re === !1) {
      V(h, h1(O));
      return;
    }
    const ie = u !== mn ? u : h1(() => a(re, {
      value: O(),
      refetching: q
    }));
    return typeof ie != "object" || !(ie && "then" in ie) ? (V(h, ie, void 0, re), ie) : (h = ie, k = !0, queueMicrotask(() => k = !1), v1(() => {
      W(y ? "refreshing" : "pending"), X();
    }, !1), ie.then((be) => V(ie, be, void 0, re), (be) => V(ie, void 0, Br(be), re)));
  }
  return Object.defineProperties(z, {
    state: {
      get: () => U()
    },
    error: {
      get: () => B()
    },
    loading: {
      get() {
        const q = U();
        return q === "pending" || q === "refreshing";
      }
    },
    latest: {
      get() {
        if (!y)
          return z();
        const q = B();
        if (q && !h)
          throw q;
        return O();
      }
    }
  }), w ? K0(() => j(!1)) : j(!1), [z, {
    refetch: j,
    mutate: F
  }];
}
function h1(e) {
  if (pe === null)
    return e();
  const n = pe;
  pe = null;
  try {
    return e();
  } finally {
    pe = n;
  }
}
function Pn(e) {
  Ke(() => h1(e));
}
function N1(e) {
  return Ae === null || (Ae.cleanups === null ? Ae.cleanups = [e] : Ae.cleanups.push(e)), e;
}
function r5(e) {
  const n = pe, t = Ae;
  return Promise.resolve().then(() => {
    pe = n, Ae = t;
    let r;
    return v1(e, !1), pe = Ae = null, r ? r.done : void 0;
  });
}
let o5;
function Dr() {
  const e = O1;
  if (this.sources && (this.state || e))
    if (this.state === f1 || e)
      Z1(this);
    else {
      const n = Fe;
      Fe = null, v1(() => Zt(this), !1), Fe = n;
    }
  if (pe) {
    const n = this.observers ? this.observers.length : 0;
    pe.sources ? (pe.sources.push(this), pe.sourceSlots.push(n)) : (pe.sources = [this], pe.sourceSlots = [n]), this.observers ? (this.observers.push(pe), this.observerSlots.push(pe.sources.length - 1)) : (this.observers = [pe], this.observerSlots = [pe.sources.length - 1]);
  }
  return this.value;
}
function Nr(e, n, t) {
  let r = e.value;
  return (!e.comparator || !e.comparator(r, n)) && (e.value = n, e.observers && e.observers.length && v1(() => {
    for (let a = 0; a < e.observers.length; a += 1) {
      const l = e.observers[a], h = O1 && O1.running;
      h && O1.disposed.has(l), (h && !l.tState || !h && !l.state) && (l.pure ? Fe.push(l) : d1.push(l), l.observers && Er(l)), h || (l.state = f1);
    }
    if (Fe.length > 1e6)
      throw Fe = [], new Error();
  }, !1)), n;
}
function Z1(e) {
  if (!e.fn)
    return;
  Xt(e);
  const n = Ae, t = pe, r = Sn;
  pe = Ae = e, i5(e, e.value, r), pe = t, Ae = n;
}
function i5(e, n, t) {
  let r;
  try {
    r = e.fn(n);
  } catch (a) {
    e.pure && (e.state = f1, e.owned && e.owned.forEach(Xt), e.owned = null), Fr(a);
  }
  (!e.updatedAt || e.updatedAt <= t) && (e.updatedAt != null && "observers" in e ? Nr(e, r) : e.value = r, e.updatedAt = t);
}
function Gt(e, n, t, r = f1, a) {
  const l = {
    fn: e,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: n,
    owner: Ae,
    context: null,
    pure: t
  };
  return Ae === null || Ae !== Or && (Ae.owned ? Ae.owned.push(l) : Ae.owned = [l]), l;
}
function Qt(e) {
  const n = O1;
  if (e.state === 0 || n)
    return;
  if (e.state === jt || n)
    return Zt(e);
  if (e.suspense && h1(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < Sn); )
    (e.state || n) && t.push(e);
  for (let r = t.length - 1; r >= 0; r--)
    if (e = t[r], e.state === f1 || n)
      Z1(e);
    else if (e.state === jt || n) {
      const a = Fe;
      Fe = null, v1(() => Zt(e, t[0]), !1), Fe = a;
    }
}
function v1(e, n) {
  if (Fe)
    return e();
  let t = !1;
  n || (Fe = []), d1 ? t = !0 : d1 = [], Sn++;
  try {
    const r = e();
    return a5(t), r;
  } catch (r) {
    t || (d1 = null), Fe = null, Fr(r);
  }
}
function a5(e) {
  if (Fe && (Ir(Fe), Fe = null), e)
    return;
  const n = d1;
  d1 = null, n.length && v1(() => Pr(n), !1);
}
function Ir(e) {
  for (let n = 0; n < e.length; n++)
    Qt(e[n]);
}
function s5(e) {
  let n, t = 0;
  for (n = 0; n < e.length; n++) {
    const r = e[n];
    r.user ? e[t++] = r : Qt(r);
  }
  for (De.context && J9(), n = 0; n < t; n++)
    Qt(e[n]);
}
function Zt(e, n) {
  const t = O1;
  e.state = 0;
  for (let r = 0; r < e.sources.length; r += 1) {
    const a = e.sources[r];
    a.sources && (a.state === f1 || t ? a !== n && Qt(a) : (a.state === jt || t) && Zt(a, n));
  }
}
function Er(e) {
  const n = O1;
  for (let t = 0; t < e.observers.length; t += 1) {
    const r = e.observers[t];
    (!r.state || n) && (r.state = jt, r.pure ? Fe.push(r) : d1.push(r), r.observers && Er(r));
  }
}
function Xt(e) {
  let n;
  if (e.sources)
    for (; e.sources.length; ) {
      const t = e.sources.pop(), r = e.sourceSlots.pop(), a = t.observers;
      if (a && a.length) {
        const l = a.pop(), h = t.observerSlots.pop();
        r < a.length && (l.sourceSlots[h] = r, a[r] = l, t.observerSlots[r] = h);
      }
    }
  if (e.owned) {
    for (n = 0; n < e.owned.length; n++)
      Xt(e.owned[n]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (n = 0; n < e.cleanups.length; n++)
      e.cleanups[n]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function Br(e) {
  return e instanceof Error || typeof e == "string" ? e : new Error("Unknown error");
}
function Fr(e) {
  throw e = Br(e), e;
}
const l5 = Symbol("fallback");
function R0(e) {
  for (let n = 0; n < e.length; n++)
    e[n]();
}
function c5(e, n, t = {}) {
  let r = [], a = [], l = [], h = 0, u = n.length > 1 ? [] : null;
  return N1(() => R0(l)), () => {
    let p = e() || [], k, y;
    return p[t5], h1(() => {
      let A = p.length, O, F, B, D, R, X, U, W, V;
      if (A === 0)
        h !== 0 && (R0(l), l = [], r = [], a = [], h = 0, u && (u = [])), t.fallback && (r = [l5], a[0] = mt((ue) => (l[0] = ue, t.fallback())), h = 1);
      else if (h === 0) {
        for (a = new Array(A), y = 0; y < A; y++)
          r[y] = p[y], a[y] = mt(w);
        h = A;
      } else {
        for (B = new Array(A), D = new Array(A), u && (R = new Array(A)), X = 0, U = Math.min(h, A); X < U && r[X] === p[X]; X++)
          ;
        for (U = h - 1, W = A - 1; U >= X && W >= X && r[U] === p[W]; U--, W--)
          B[W] = a[U], D[W] = l[U], u && (R[W] = u[U]);
        for (O = /* @__PURE__ */ new Map(), F = new Array(W + 1), y = W; y >= X; y--)
          V = p[y], k = O.get(V), F[y] = k === void 0 ? -1 : k, O.set(V, y);
        for (k = X; k <= U; k++)
          V = r[k], y = O.get(V), y !== void 0 && y !== -1 ? (B[y] = a[k], D[y] = l[k], u && (R[y] = u[k]), y = F[y], O.set(V, y)) : l[k]();
        for (y = X; y < A; y++)
          y in B ? (a[y] = B[y], l[y] = D[y], u && (u[y] = R[y], u[y](y))) : a[y] = mt(w);
        a = a.slice(0, h = A), r = p.slice(0);
      }
      return a;
    });
    function w(A) {
      if (l[y] = A, u) {
        const [O, F] = T(y);
        return u[y] = F, n(p[y], O);
      }
      return n(p[y]);
    }
  };
}
function L(e, n) {
  return h1(() => e(n || {}));
}
function It() {
  return !0;
}
const u5 = {
  get(e, n, t) {
    return n === $n ? t : e.get(n);
  },
  has(e, n) {
    return n === $n ? !0 : e.has(n);
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
function gn(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function Ur(...e) {
  let n = !1;
  for (let r = 0; r < e.length; r++) {
    const a = e[r];
    n = n || !!a && $n in a, e[r] = typeof a == "function" ? (n = !0, Z(a)) : a;
  }
  if (n)
    return new Proxy({
      get(r) {
        for (let a = e.length - 1; a >= 0; a--) {
          const l = gn(e[a])[r];
          if (l !== void 0)
            return l;
        }
      },
      has(r) {
        for (let a = e.length - 1; a >= 0; a--)
          if (r in gn(e[a]))
            return !0;
        return !1;
      },
      keys() {
        const r = [];
        for (let a = 0; a < e.length; a++)
          r.push(...Object.keys(gn(e[a])));
        return [...new Set(r)];
      }
    }, u5);
  const t = {};
  for (let r = e.length - 1; r >= 0; r--)
    if (e[r]) {
      const a = Object.getOwnPropertyDescriptors(e[r]);
      for (const l in a)
        l in t || Object.defineProperty(t, l, {
          enumerable: !0,
          get() {
            for (let h = e.length - 1; h >= 0; h--) {
              const u = (e[h] || {})[l];
              if (u !== void 0)
                return u;
            }
          }
        });
    }
  return t;
}
function bn(e) {
  const n = "fallback" in e && {
    fallback: () => e.fallback
  };
  return Z(c5(() => e.each, e.children, n || void 0));
}
function J(e) {
  let n = !1;
  const t = e.keyed, r = Z(() => e.when, void 0, {
    equals: (a, l) => n ? a === l : !a == !l
  });
  return Z(() => {
    const a = r();
    if (a) {
      const l = e.children, h = typeof l == "function" && l.length > 0;
      return n = t || h, h ? h1(() => l(a)) : l;
    }
    return e.fallback;
  }, void 0, void 0);
}
function d5(e, n, t) {
  let r = t.length, a = n.length, l = r, h = 0, u = 0, p = n[a - 1].nextSibling, k = null;
  for (; h < a || u < l; ) {
    if (n[h] === t[u]) {
      h++, u++;
      continue;
    }
    for (; n[a - 1] === t[l - 1]; )
      a--, l--;
    if (a === h) {
      const y = l < r ? u ? t[u - 1].nextSibling : t[l - u] : p;
      for (; u < l; )
        e.insertBefore(t[u++], y);
    } else if (l === u)
      for (; h < a; )
        (!k || !k.has(n[h])) && n[h].remove(), h++;
    else if (n[h] === t[l - 1] && t[u] === n[a - 1]) {
      const y = n[--a].nextSibling;
      e.insertBefore(t[u++], n[h++].nextSibling), e.insertBefore(t[--l], y), n[a] = t[l];
    } else {
      if (!k) {
        k = /* @__PURE__ */ new Map();
        let w = u;
        for (; w < l; )
          k.set(t[w], w++);
      }
      const y = k.get(n[h]);
      if (y != null)
        if (u < y && y < l) {
          let w = h, A = 1, O;
          for (; ++w < a && w < l && !((O = k.get(n[w])) == null || O !== y + A); )
            A++;
          if (A > y - u) {
            const F = n[h];
            for (; u < y; )
              e.insertBefore(t[u++], F);
          } else
            e.replaceChild(t[u++], n[h++]);
        } else
          h++;
      else
        n[h++].remove();
    }
  }
}
const j0 = "_$DX_DELEGATE";
function h5(e, n, t, r = {}) {
  let a;
  return mt((l) => {
    a = l, n === document ? e() : v(n, e(), n.firstChild ? null : void 0, t);
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
  const t = n[j0] || (n[j0] = /* @__PURE__ */ new Set());
  for (let r = 0, a = e.length; r < a; r++) {
    const l = e[r];
    t.has(l) || (t.add(l), n.addEventListener(l, f5));
  }
}
function Pe(e, n, t) {
  t == null ? e.removeAttribute(n) : e.setAttribute(n, t);
}
function oe(e, n) {
  n == null ? e.removeAttribute("class") : e.className = n;
}
function i1(e, n, t, r) {
  if (r)
    Array.isArray(t) ? (e[`$$${n}`] = t[0], e[`$$${n}Data`] = t[1]) : e[`$$${n}`] = t;
  else if (Array.isArray(t)) {
    const a = t[0];
    e.addEventListener(n, t[0] = (l) => a.call(e, t[1], l));
  } else
    e.addEventListener(n, t);
}
function I1(e, n, t) {
  if (!n)
    return t ? Pe(e, "style") : n;
  const r = e.style;
  if (typeof n == "string")
    return r.cssText = n;
  typeof t == "string" && (r.cssText = t = void 0), t || (t = {}), n || (n = {});
  let a, l;
  for (l in t)
    n[l] == null && r.removeProperty(l), delete t[l];
  for (l in n)
    a = n[l], a !== t[l] && (r.setProperty(l, a), t[l] = a);
  return t;
}
function D1(e, n, t) {
  return h1(() => e(n, t));
}
function v(e, n, t, r) {
  if (t !== void 0 && !r && (r = []), typeof n != "function")
    return Vt(e, n, r, t);
  I((a) => Vt(e, n(), a, t), r);
}
function f5(e) {
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
function Vt(e, n, t, r, a) {
  for (De.context && !t && (t = [...e.childNodes]); typeof t == "function"; )
    t = t();
  if (n === t)
    return t;
  const l = typeof n, h = r !== void 0;
  if (e = h && t[0] && t[0].parentNode || e, l === "string" || l === "number") {
    if (De.context)
      return t;
    if (l === "number" && (n = n.toString()), h) {
      let u = t[0];
      u && u.nodeType === 3 ? u.data = n : u = document.createTextNode(n), t = j1(e, t, r, u);
    } else
      t !== "" && typeof t == "string" ? t = e.firstChild.data = n : t = e.textContent = n;
  } else if (n == null || l === "boolean") {
    if (De.context)
      return t;
    t = j1(e, t, r);
  } else {
    if (l === "function")
      return I(() => {
        let u = n();
        for (; typeof u == "function"; )
          u = u();
        t = Vt(e, u, t, r);
      }), () => t;
    if (Array.isArray(n)) {
      const u = [], p = t && Array.isArray(t);
      if (_n(u, n, t, a))
        return I(() => t = Vt(e, u, t, r, !0)), () => t;
      if (De.context) {
        if (!u.length)
          return t;
        for (let k = 0; k < u.length; k++)
          if (u[k].parentNode)
            return t = u;
      }
      if (u.length === 0) {
        if (t = j1(e, t, r), h)
          return t;
      } else
        p ? t.length === 0 ? Q0(e, u, r) : d5(e, t, u) : (t && j1(e), Q0(e, u));
      t = u;
    } else if (n instanceof Node) {
      if (De.context && n.parentNode)
        return t = h ? [n] : n;
      if (Array.isArray(t)) {
        if (h)
          return t = j1(e, t, r, n);
        j1(e, t, null, n);
      } else
        t == null || t === "" || !e.firstChild ? e.appendChild(n) : e.replaceChild(n, e.firstChild);
      t = n;
    }
  }
  return t;
}
function _n(e, n, t, r) {
  let a = !1;
  for (let l = 0, h = n.length; l < h; l++) {
    let u = n[l], p = t && t[l];
    if (u instanceof Node)
      e.push(u);
    else if (!(u == null || u === !0 || u === !1))
      if (Array.isArray(u))
        a = _n(e, u, p) || a;
      else if (typeof u == "function")
        if (r) {
          for (; typeof u == "function"; )
            u = u();
          a = _n(e, Array.isArray(u) ? u : [u], Array.isArray(p) ? p : [p]) || a;
        } else
          e.push(u), a = !0;
      else {
        const k = String(u);
        p && p.nodeType === 3 && p.data === k ? e.push(p) : e.push(document.createTextNode(k));
      }
  }
  return a;
}
function Q0(e, n, t = null) {
  for (let r = 0, a = n.length; r < a; r++)
    e.insertBefore(n[r], t);
}
function j1(e, n, t, r) {
  if (t === void 0)
    return e.textContent = "";
  const a = r || document.createTextNode("");
  if (n.length) {
    let l = !1;
    for (let h = n.length - 1; h >= 0; h--) {
      const u = n[h];
      if (a !== u) {
        const p = u.parentNode === e;
        !l && !h ? p ? e.replaceChild(a, u) : e.insertBefore(a, t) : p && u.remove();
      } else
        l = !0;
    }
  } else
    e.insertBefore(a, t);
  return [a];
}
const m5 = "http://www.w3.org/2000/svg";
function g5(e, n = !1) {
  return n ? document.createElementNS(m5, e) : document.createElement(e);
}
function y5(e) {
  const {
    useShadow: n
  } = e, t = document.createTextNode(""), r = e.mount || document.body;
  function a() {
    if (De.context) {
      const [l, h] = T(!1);
      return queueMicrotask(() => h(!0)), () => l() && e.children;
    } else
      return () => e.children;
  }
  if (r instanceof HTMLHeadElement) {
    const [l, h] = T(!1), u = () => h(!0);
    mt((p) => v(r, () => l() ? p() : a()(), null)), N1(() => {
      De.context ? queueMicrotask(u) : u();
    });
  } else {
    const l = g5(e.isSVG ? "g" : "div", e.isSVG), h = n && l.attachShadow ? l.attachShadow({
      mode: "open"
    }) : l;
    Object.defineProperty(l, "_$host", {
      get() {
        return t.parentNode;
      },
      configurable: !0
    }), v(h, a()), r.appendChild(l), e.ref && e.ref(l), N1(() => r.removeChild(l));
  }
  return t;
}
var Et = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function zr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var p5 = typeof Et == "object" && Et && Et.Object === Object && Et, Kr = p5, v5 = Kr, C5 = typeof self == "object" && self && self.Object === Object && self, $5 = v5 || C5 || Function("return this")(), a1 = $5, b5 = a1, _5 = b5.Symbol, Jt = _5, Z0 = Jt, Rr = Object.prototype, k5 = Rr.hasOwnProperty, x5 = Rr.toString, ht = Z0 ? Z0.toStringTag : void 0;
function L5(e) {
  var n = k5.call(e, ht), t = e[ht];
  try {
    e[ht] = void 0;
    var r = !0;
  } catch {
  }
  var a = x5.call(e);
  return r && (n ? e[ht] = t : delete e[ht]), a;
}
var w5 = L5, A5 = Object.prototype, M5 = A5.toString;
function T5(e) {
  return M5.call(e);
}
var S5 = T5, V0 = Jt, P5 = w5, O5 = S5, D5 = "[object Null]", N5 = "[object Undefined]", H0 = V0 ? V0.toStringTag : void 0;
function I5(e) {
  return e == null ? e === void 0 ? N5 : D5 : H0 && H0 in Object(e) ? P5(e) : O5(e);
}
var gt = I5;
function E5(e) {
  var n = typeof e;
  return e != null && (n == "object" || n == "function");
}
var V1 = E5, B5 = gt, F5 = V1, U5 = "[object AsyncFunction]", z5 = "[object Function]", K5 = "[object GeneratorFunction]", R5 = "[object Proxy]";
function j5(e) {
  if (!F5(e))
    return !1;
  var n = B5(e);
  return n == z5 || n == K5 || n == U5 || n == R5;
}
var jr = j5, Q5 = a1, Z5 = Q5["__core-js_shared__"], V5 = Z5, yn = V5, q0 = function() {
  var e = /[^.]+$/.exec(yn && yn.keys && yn.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function H5(e) {
  return !!q0 && q0 in e;
}
var q5 = H5, Y5 = Function.prototype, W5 = Y5.toString;
function G5(e) {
  if (e != null) {
    try {
      return W5.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Qr = G5, X5 = jr, J5 = q5, e6 = V1, t6 = Qr, n6 = /[\\^$.*+?()[\]{}|]/g, r6 = /^\[object .+?Constructor\]$/, o6 = Function.prototype, i6 = Object.prototype, a6 = o6.toString, s6 = i6.hasOwnProperty, l6 = RegExp(
  "^" + a6.call(s6).replace(n6, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function c6(e) {
  if (!e6(e) || J5(e))
    return !1;
  var n = X5(e) ? l6 : r6;
  return n.test(t6(e));
}
var u6 = c6;
function d6(e, n) {
  return e == null ? void 0 : e[n];
}
var h6 = d6, f6 = u6, m6 = h6;
function g6(e, n) {
  var t = m6(e, n);
  return f6(t) ? t : void 0;
}
var E1 = g6, y6 = E1, p6 = function() {
  try {
    var e = y6(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), v6 = p6, Y0 = v6;
function C6(e, n, t) {
  n == "__proto__" && Y0 ? Y0(e, n, {
    configurable: !0,
    enumerable: !0,
    value: t,
    writable: !0
  }) : e[n] = t;
}
var Zr = C6;
function $6(e, n) {
  return e === n || e !== e && n !== n;
}
var Vr = $6, b6 = Zr, _6 = Vr, k6 = Object.prototype, x6 = k6.hasOwnProperty;
function L6(e, n, t) {
  var r = e[n];
  (!(x6.call(e, n) && _6(r, t)) || t === void 0 && !(n in e)) && b6(e, n, t);
}
var On = L6, w6 = Array.isArray, H1 = w6;
function A6(e) {
  return e != null && typeof e == "object";
}
var q1 = A6, M6 = gt, T6 = q1, S6 = "[object Symbol]";
function P6(e) {
  return typeof e == "symbol" || T6(e) && M6(e) == S6;
}
var Dn = P6, O6 = H1, D6 = Dn, N6 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, I6 = /^\w*$/;
function E6(e, n) {
  if (O6(e))
    return !1;
  var t = typeof e;
  return t == "number" || t == "symbol" || t == "boolean" || e == null || D6(e) ? !0 : I6.test(e) || !N6.test(e) || n != null && e in Object(n);
}
var B6 = E6, F6 = E1, U6 = F6(Object, "create"), en = U6, W0 = en;
function z6() {
  this.__data__ = W0 ? W0(null) : {}, this.size = 0;
}
var K6 = z6;
function R6(e) {
  var n = this.has(e) && delete this.__data__[e];
  return this.size -= n ? 1 : 0, n;
}
var j6 = R6, Q6 = en, Z6 = "__lodash_hash_undefined__", V6 = Object.prototype, H6 = V6.hasOwnProperty;
function q6(e) {
  var n = this.__data__;
  if (Q6) {
    var t = n[e];
    return t === Z6 ? void 0 : t;
  }
  return H6.call(n, e) ? n[e] : void 0;
}
var Y6 = q6, W6 = en, G6 = Object.prototype, X6 = G6.hasOwnProperty;
function J6(e) {
  var n = this.__data__;
  return W6 ? n[e] !== void 0 : X6.call(n, e);
}
var e2 = J6, t2 = en, n2 = "__lodash_hash_undefined__";
function r2(e, n) {
  var t = this.__data__;
  return this.size += this.has(e) ? 0 : 1, t[e] = t2 && n === void 0 ? n2 : n, this;
}
var o2 = r2, i2 = K6, a2 = j6, s2 = Y6, l2 = e2, c2 = o2;
function Y1(e) {
  var n = -1, t = e == null ? 0 : e.length;
  for (this.clear(); ++n < t; ) {
    var r = e[n];
    this.set(r[0], r[1]);
  }
}
Y1.prototype.clear = i2;
Y1.prototype.delete = a2;
Y1.prototype.get = s2;
Y1.prototype.has = l2;
Y1.prototype.set = c2;
var u2 = Y1;
function d2() {
  this.__data__ = [], this.size = 0;
}
var h2 = d2, f2 = Vr;
function m2(e, n) {
  for (var t = e.length; t--; )
    if (f2(e[t][0], n))
      return t;
  return -1;
}
var tn = m2, g2 = tn, y2 = Array.prototype, p2 = y2.splice;
function v2(e) {
  var n = this.__data__, t = g2(n, e);
  if (t < 0)
    return !1;
  var r = n.length - 1;
  return t == r ? n.pop() : p2.call(n, t, 1), --this.size, !0;
}
var C2 = v2, $2 = tn;
function b2(e) {
  var n = this.__data__, t = $2(n, e);
  return t < 0 ? void 0 : n[t][1];
}
var _2 = b2, k2 = tn;
function x2(e) {
  return k2(this.__data__, e) > -1;
}
var L2 = x2, w2 = tn;
function A2(e, n) {
  var t = this.__data__, r = w2(t, e);
  return r < 0 ? (++this.size, t.push([e, n])) : t[r][1] = n, this;
}
var M2 = A2, T2 = h2, S2 = C2, P2 = _2, O2 = L2, D2 = M2;
function W1(e) {
  var n = -1, t = e == null ? 0 : e.length;
  for (this.clear(); ++n < t; ) {
    var r = e[n];
    this.set(r[0], r[1]);
  }
}
W1.prototype.clear = T2;
W1.prototype.delete = S2;
W1.prototype.get = P2;
W1.prototype.has = O2;
W1.prototype.set = D2;
var nn = W1, N2 = E1, I2 = a1, E2 = N2(I2, "Map"), Nn = E2, G0 = u2, B2 = nn, F2 = Nn;
function U2() {
  this.size = 0, this.__data__ = {
    hash: new G0(),
    map: new (F2 || B2)(),
    string: new G0()
  };
}
var z2 = U2;
function K2(e) {
  var n = typeof e;
  return n == "string" || n == "number" || n == "symbol" || n == "boolean" ? e !== "__proto__" : e === null;
}
var R2 = K2, j2 = R2;
function Q2(e, n) {
  var t = e.__data__;
  return j2(n) ? t[typeof n == "string" ? "string" : "hash"] : t.map;
}
var rn = Q2, Z2 = rn;
function V2(e) {
  var n = Z2(this, e).delete(e);
  return this.size -= n ? 1 : 0, n;
}
var H2 = V2, q2 = rn;
function Y2(e) {
  return q2(this, e).get(e);
}
var W2 = Y2, G2 = rn;
function X2(e) {
  return G2(this, e).has(e);
}
var J2 = X2, eo = rn;
function to(e, n) {
  var t = eo(this, e), r = t.size;
  return t.set(e, n), this.size += t.size == r ? 0 : 1, this;
}
var no = to, ro = z2, oo = H2, io = W2, ao = J2, so = no;
function G1(e) {
  var n = -1, t = e == null ? 0 : e.length;
  for (this.clear(); ++n < t; ) {
    var r = e[n];
    this.set(r[0], r[1]);
  }
}
G1.prototype.clear = ro;
G1.prototype.delete = oo;
G1.prototype.get = io;
G1.prototype.has = ao;
G1.prototype.set = so;
var Hr = G1, qr = Hr, lo = "Expected a function";
function In(e, n) {
  if (typeof e != "function" || n != null && typeof n != "function")
    throw new TypeError(lo);
  var t = function() {
    var r = arguments, a = n ? n.apply(this, r) : r[0], l = t.cache;
    if (l.has(a))
      return l.get(a);
    var h = e.apply(this, r);
    return t.cache = l.set(a, h) || l, h;
  };
  return t.cache = new (In.Cache || qr)(), t;
}
In.Cache = qr;
var co = In, uo = co, ho = 500;
function fo(e) {
  var n = uo(e, function(r) {
    return t.size === ho && t.clear(), r;
  }), t = n.cache;
  return n;
}
var mo = fo, go = mo, yo = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, po = /\\(\\)?/g, vo = go(function(e) {
  var n = [];
  return e.charCodeAt(0) === 46 && n.push(""), e.replace(yo, function(t, r, a, l) {
    n.push(a ? l.replace(po, "$1") : r || t);
  }), n;
}), Co = vo;
function $o(e, n) {
  for (var t = -1, r = e == null ? 0 : e.length, a = Array(r); ++t < r; )
    a[t] = n(e[t], t, e);
  return a;
}
var bo = $o, X0 = Jt, _o = bo, ko = H1, xo = Dn, Lo = 1 / 0, J0 = X0 ? X0.prototype : void 0, er = J0 ? J0.toString : void 0;
function Yr(e) {
  if (typeof e == "string")
    return e;
  if (ko(e))
    return _o(e, Yr) + "";
  if (xo(e))
    return er ? er.call(e) : "";
  var n = e + "";
  return n == "0" && 1 / e == -Lo ? "-0" : n;
}
var wo = Yr, Ao = wo;
function Mo(e) {
  return e == null ? "" : Ao(e);
}
var To = Mo, So = H1, Po = B6, Oo = Co, Do = To;
function No(e, n) {
  return So(e) ? e : Po(e, n) ? [e] : Oo(Do(e));
}
var Io = No, Eo = 9007199254740991, Bo = /^(?:0|[1-9]\d*)$/;
function Fo(e, n) {
  var t = typeof e;
  return n = n ?? Eo, !!n && (t == "number" || t != "symbol" && Bo.test(e)) && e > -1 && e % 1 == 0 && e < n;
}
var Wr = Fo, Uo = Dn, zo = 1 / 0;
function Ko(e) {
  if (typeof e == "string" || Uo(e))
    return e;
  var n = e + "";
  return n == "0" && 1 / e == -zo ? "-0" : n;
}
var Ro = Ko, jo = On, Qo = Io, Zo = Wr, tr = V1, Vo = Ro;
function Ho(e, n, t, r) {
  if (!tr(e))
    return e;
  n = Qo(n, e);
  for (var a = -1, l = n.length, h = l - 1, u = e; u != null && ++a < l; ) {
    var p = Vo(n[a]), k = t;
    if (p === "__proto__" || p === "constructor" || p === "prototype")
      return e;
    if (a != h) {
      var y = u[p];
      k = r ? r(y, p, u) : void 0, k === void 0 && (k = tr(y) ? y : Zo(n[a + 1]) ? [] : {});
    }
    jo(u, p, k), u = u[p];
  }
  return e;
}
var qo = Ho, Yo = qo;
function Wo(e, n, t) {
  return e == null ? e : Yo(e, n, t);
}
var Go = Wo;
const kn = /* @__PURE__ */ zr(Go);
var Xo = nn;
function Jo() {
  this.__data__ = new Xo(), this.size = 0;
}
var ei = Jo;
function ti(e) {
  var n = this.__data__, t = n.delete(e);
  return this.size = n.size, t;
}
var ni = ti;
function ri(e) {
  return this.__data__.get(e);
}
var oi = ri;
function ii(e) {
  return this.__data__.has(e);
}
var ai = ii, si = nn, li = Nn, ci = Hr, ui = 200;
function di(e, n) {
  var t = this.__data__;
  if (t instanceof si) {
    var r = t.__data__;
    if (!li || r.length < ui - 1)
      return r.push([e, n]), this.size = ++t.size, this;
    t = this.__data__ = new ci(r);
  }
  return t.set(e, n), this.size = t.size, this;
}
var hi = di, fi = nn, mi = ei, gi = ni, yi = oi, pi = ai, vi = hi;
function X1(e) {
  var n = this.__data__ = new fi(e);
  this.size = n.size;
}
X1.prototype.clear = mi;
X1.prototype.delete = gi;
X1.prototype.get = yi;
X1.prototype.has = pi;
X1.prototype.set = vi;
var Ci = X1;
function $i(e, n) {
  for (var t = -1, r = e == null ? 0 : e.length; ++t < r && n(e[t], t, e) !== !1; )
    ;
  return e;
}
var bi = $i, _i = On, ki = Zr;
function xi(e, n, t, r) {
  var a = !t;
  t || (t = {});
  for (var l = -1, h = n.length; ++l < h; ) {
    var u = n[l], p = r ? r(t[u], e[u], u, t, e) : void 0;
    p === void 0 && (p = e[u]), a ? ki(t, u, p) : _i(t, u, p);
  }
  return t;
}
var on = xi;
function Li(e, n) {
  for (var t = -1, r = Array(e); ++t < e; )
    r[t] = n(t);
  return r;
}
var wi = Li, Ai = gt, Mi = q1, Ti = "[object Arguments]";
function Si(e) {
  return Mi(e) && Ai(e) == Ti;
}
var Pi = Si, nr = Pi, Oi = q1, Gr = Object.prototype, Di = Gr.hasOwnProperty, Ni = Gr.propertyIsEnumerable, Ii = nr(function() {
  return arguments;
}()) ? nr : function(e) {
  return Oi(e) && Di.call(e, "callee") && !Ni.call(e, "callee");
}, Ei = Ii, Ht = { exports: {} };
function Bi() {
  return !1;
}
var Fi = Bi;
Ht.exports;
(function(e, n) {
  var t = a1, r = Fi, a = n && !n.nodeType && n, l = a && !0 && e && !e.nodeType && e, h = l && l.exports === a, u = h ? t.Buffer : void 0, p = u ? u.isBuffer : void 0, k = p || r;
  e.exports = k;
})(Ht, Ht.exports);
var Xr = Ht.exports, Ui = 9007199254740991;
function zi(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Ui;
}
var Jr = zi, Ki = gt, Ri = Jr, ji = q1, Qi = "[object Arguments]", Zi = "[object Array]", Vi = "[object Boolean]", Hi = "[object Date]", qi = "[object Error]", Yi = "[object Function]", Wi = "[object Map]", Gi = "[object Number]", Xi = "[object Object]", Ji = "[object RegExp]", e3 = "[object Set]", t3 = "[object String]", n3 = "[object WeakMap]", r3 = "[object ArrayBuffer]", o3 = "[object DataView]", i3 = "[object Float32Array]", a3 = "[object Float64Array]", s3 = "[object Int8Array]", l3 = "[object Int16Array]", c3 = "[object Int32Array]", u3 = "[object Uint8Array]", d3 = "[object Uint8ClampedArray]", h3 = "[object Uint16Array]", f3 = "[object Uint32Array]", ye = {};
ye[i3] = ye[a3] = ye[s3] = ye[l3] = ye[c3] = ye[u3] = ye[d3] = ye[h3] = ye[f3] = !0;
ye[Qi] = ye[Zi] = ye[r3] = ye[Vi] = ye[o3] = ye[Hi] = ye[qi] = ye[Yi] = ye[Wi] = ye[Gi] = ye[Xi] = ye[Ji] = ye[e3] = ye[t3] = ye[n3] = !1;
function m3(e) {
  return ji(e) && Ri(e.length) && !!ye[Ki(e)];
}
var g3 = m3;
function y3(e) {
  return function(n) {
    return e(n);
  };
}
var En = y3, qt = { exports: {} };
qt.exports;
(function(e, n) {
  var t = Kr, r = n && !n.nodeType && n, a = r && !0 && e && !e.nodeType && e, l = a && a.exports === r, h = l && t.process, u = function() {
    try {
      var p = a && a.require && a.require("util").types;
      return p || h && h.binding && h.binding("util");
    } catch {
    }
  }();
  e.exports = u;
})(qt, qt.exports);
var Bn = qt.exports, p3 = g3, v3 = En, rr = Bn, or = rr && rr.isTypedArray, C3 = or ? v3(or) : p3, $3 = C3, b3 = wi, _3 = Ei, k3 = H1, x3 = Xr, L3 = Wr, w3 = $3, A3 = Object.prototype, M3 = A3.hasOwnProperty;
function T3(e, n) {
  var t = k3(e), r = !t && _3(e), a = !t && !r && x3(e), l = !t && !r && !a && w3(e), h = t || r || a || l, u = h ? b3(e.length, String) : [], p = u.length;
  for (var k in e)
    (n || M3.call(e, k)) && !(h && // Safari 9 has enumerable `arguments.length` in strict mode.
    (k == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    a && (k == "offset" || k == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    l && (k == "buffer" || k == "byteLength" || k == "byteOffset") || // Skip index properties.
    L3(k, p))) && u.push(k);
  return u;
}
var e9 = T3, S3 = Object.prototype;
function P3(e) {
  var n = e && e.constructor, t = typeof n == "function" && n.prototype || S3;
  return e === t;
}
var Fn = P3;
function O3(e, n) {
  return function(t) {
    return e(n(t));
  };
}
var t9 = O3, D3 = t9, N3 = D3(Object.keys, Object), I3 = N3, E3 = Fn, B3 = I3, F3 = Object.prototype, U3 = F3.hasOwnProperty;
function z3(e) {
  if (!E3(e))
    return B3(e);
  var n = [];
  for (var t in Object(e))
    U3.call(e, t) && t != "constructor" && n.push(t);
  return n;
}
var K3 = z3, R3 = jr, j3 = Jr;
function Q3(e) {
  return e != null && j3(e.length) && !R3(e);
}
var n9 = Q3, Z3 = e9, V3 = K3, H3 = n9;
function q3(e) {
  return H3(e) ? Z3(e) : V3(e);
}
var Un = q3, Y3 = on, W3 = Un;
function G3(e, n) {
  return e && Y3(n, W3(n), e);
}
var X3 = G3;
function J3(e) {
  var n = [];
  if (e != null)
    for (var t in Object(e))
      n.push(t);
  return n;
}
var ea = J3, ta = V1, na = Fn, ra = ea, oa = Object.prototype, ia = oa.hasOwnProperty;
function aa(e) {
  if (!ta(e))
    return ra(e);
  var n = na(e), t = [];
  for (var r in e)
    r == "constructor" && (n || !ia.call(e, r)) || t.push(r);
  return t;
}
var sa = aa, la = e9, ca = sa, ua = n9;
function da(e) {
  return ua(e) ? la(e, !0) : ca(e);
}
var zn = da, ha = on, fa = zn;
function ma(e, n) {
  return e && ha(n, fa(n), e);
}
var ga = ma, Yt = { exports: {} };
Yt.exports;
(function(e, n) {
  var t = a1, r = n && !n.nodeType && n, a = r && !0 && e && !e.nodeType && e, l = a && a.exports === r, h = l ? t.Buffer : void 0, u = h ? h.allocUnsafe : void 0;
  function p(k, y) {
    if (y)
      return k.slice();
    var w = k.length, A = u ? u(w) : new k.constructor(w);
    return k.copy(A), A;
  }
  e.exports = p;
})(Yt, Yt.exports);
var ya = Yt.exports;
function pa(e, n) {
  var t = -1, r = e.length;
  for (n || (n = Array(r)); ++t < r; )
    n[t] = e[t];
  return n;
}
var va = pa;
function Ca(e, n) {
  for (var t = -1, r = e == null ? 0 : e.length, a = 0, l = []; ++t < r; ) {
    var h = e[t];
    n(h, t, e) && (l[a++] = h);
  }
  return l;
}
var $a = Ca;
function ba() {
  return [];
}
var r9 = ba, _a = $a, ka = r9, xa = Object.prototype, La = xa.propertyIsEnumerable, ir = Object.getOwnPropertySymbols, wa = ir ? function(e) {
  return e == null ? [] : (e = Object(e), _a(ir(e), function(n) {
    return La.call(e, n);
  }));
} : ka, Kn = wa, Aa = on, Ma = Kn;
function Ta(e, n) {
  return Aa(e, Ma(e), n);
}
var Sa = Ta;
function Pa(e, n) {
  for (var t = -1, r = n.length, a = e.length; ++t < r; )
    e[a + t] = n[t];
  return e;
}
var o9 = Pa, Oa = t9, Da = Oa(Object.getPrototypeOf, Object), i9 = Da, Na = o9, Ia = i9, Ea = Kn, Ba = r9, Fa = Object.getOwnPropertySymbols, Ua = Fa ? function(e) {
  for (var n = []; e; )
    Na(n, Ea(e)), e = Ia(e);
  return n;
} : Ba, a9 = Ua, za = on, Ka = a9;
function Ra(e, n) {
  return za(e, Ka(e), n);
}
var ja = Ra, Qa = o9, Za = H1;
function Va(e, n, t) {
  var r = n(e);
  return Za(e) ? r : Qa(r, t(e));
}
var s9 = Va, Ha = s9, qa = Kn, Ya = Un;
function Wa(e) {
  return Ha(e, Ya, qa);
}
var Ga = Wa, Xa = s9, Ja = a9, e8 = zn;
function t8(e) {
  return Xa(e, e8, Ja);
}
var n8 = t8, r8 = E1, o8 = a1, i8 = r8(o8, "DataView"), a8 = i8, s8 = E1, l8 = a1, c8 = s8(l8, "Promise"), u8 = c8, d8 = E1, h8 = a1, f8 = d8(h8, "Set"), m8 = f8, g8 = E1, y8 = a1, p8 = g8(y8, "WeakMap"), v8 = p8, xn = a8, Ln = Nn, wn = u8, An = m8, Mn = v8, l9 = gt, J1 = Qr, ar = "[object Map]", C8 = "[object Object]", sr = "[object Promise]", lr = "[object Set]", cr = "[object WeakMap]", ur = "[object DataView]", $8 = J1(xn), b8 = J1(Ln), _8 = J1(wn), k8 = J1(An), x8 = J1(Mn), S1 = l9;
(xn && S1(new xn(new ArrayBuffer(1))) != ur || Ln && S1(new Ln()) != ar || wn && S1(wn.resolve()) != sr || An && S1(new An()) != lr || Mn && S1(new Mn()) != cr) && (S1 = function(e) {
  var n = l9(e), t = n == C8 ? e.constructor : void 0, r = t ? J1(t) : "";
  if (r)
    switch (r) {
      case $8:
        return ur;
      case b8:
        return ar;
      case _8:
        return sr;
      case k8:
        return lr;
      case x8:
        return cr;
    }
  return n;
});
var Rn = S1, L8 = Object.prototype, w8 = L8.hasOwnProperty;
function A8(e) {
  var n = e.length, t = new e.constructor(n);
  return n && typeof e[0] == "string" && w8.call(e, "index") && (t.index = e.index, t.input = e.input), t;
}
var M8 = A8, T8 = a1, S8 = T8.Uint8Array, P8 = S8, dr = P8;
function O8(e) {
  var n = new e.constructor(e.byteLength);
  return new dr(n).set(new dr(e)), n;
}
var jn = O8, D8 = jn;
function N8(e, n) {
  var t = n ? D8(e.buffer) : e.buffer;
  return new e.constructor(t, e.byteOffset, e.byteLength);
}
var I8 = N8, E8 = /\w*$/;
function B8(e) {
  var n = new e.constructor(e.source, E8.exec(e));
  return n.lastIndex = e.lastIndex, n;
}
var F8 = B8, hr = Jt, fr = hr ? hr.prototype : void 0, mr = fr ? fr.valueOf : void 0;
function U8(e) {
  return mr ? Object(mr.call(e)) : {};
}
var z8 = U8, K8 = jn;
function R8(e, n) {
  var t = n ? K8(e.buffer) : e.buffer;
  return new e.constructor(t, e.byteOffset, e.length);
}
var j8 = R8, Q8 = jn, Z8 = I8, V8 = F8, H8 = z8, q8 = j8, Y8 = "[object Boolean]", W8 = "[object Date]", G8 = "[object Map]", X8 = "[object Number]", J8 = "[object RegExp]", es = "[object Set]", ts = "[object String]", ns = "[object Symbol]", rs = "[object ArrayBuffer]", os = "[object DataView]", is = "[object Float32Array]", as = "[object Float64Array]", ss = "[object Int8Array]", ls = "[object Int16Array]", cs = "[object Int32Array]", us = "[object Uint8Array]", ds = "[object Uint8ClampedArray]", hs = "[object Uint16Array]", fs = "[object Uint32Array]";
function ms(e, n, t) {
  var r = e.constructor;
  switch (n) {
    case rs:
      return Q8(e);
    case Y8:
    case W8:
      return new r(+e);
    case os:
      return Z8(e, t);
    case is:
    case as:
    case ss:
    case ls:
    case cs:
    case us:
    case ds:
    case hs:
    case fs:
      return q8(e, t);
    case G8:
      return new r();
    case X8:
    case ts:
      return new r(e);
    case J8:
      return V8(e);
    case es:
      return new r();
    case ns:
      return H8(e);
  }
}
var gs = ms, ys = V1, gr = Object.create, ps = function() {
  function e() {
  }
  return function(n) {
    if (!ys(n))
      return {};
    if (gr)
      return gr(n);
    e.prototype = n;
    var t = new e();
    return e.prototype = void 0, t;
  };
}(), vs = ps, Cs = vs, $s = i9, bs = Fn;
function _s(e) {
  return typeof e.constructor == "function" && !bs(e) ? Cs($s(e)) : {};
}
var ks = _s, xs = Rn, Ls = q1, ws = "[object Map]";
function As(e) {
  return Ls(e) && xs(e) == ws;
}
var Ms = As, Ts = Ms, Ss = En, yr = Bn, pr = yr && yr.isMap, Ps = pr ? Ss(pr) : Ts, Os = Ps, Ds = Rn, Ns = q1, Is = "[object Set]";
function Es(e) {
  return Ns(e) && Ds(e) == Is;
}
var Bs = Es, Fs = Bs, Us = En, vr = Bn, Cr = vr && vr.isSet, zs = Cr ? Us(Cr) : Fs, Ks = zs, Rs = Ci, js = bi, Qs = On, Zs = X3, Vs = ga, Hs = ya, qs = va, Ys = Sa, Ws = ja, Gs = Ga, Xs = n8, Js = Rn, e7 = M8, t7 = gs, n7 = ks, r7 = H1, o7 = Xr, i7 = Os, a7 = V1, s7 = Ks, l7 = Un, c7 = zn, u7 = 1, d7 = 2, h7 = 4, c9 = "[object Arguments]", f7 = "[object Array]", m7 = "[object Boolean]", g7 = "[object Date]", y7 = "[object Error]", u9 = "[object Function]", p7 = "[object GeneratorFunction]", v7 = "[object Map]", C7 = "[object Number]", d9 = "[object Object]", $7 = "[object RegExp]", b7 = "[object Set]", _7 = "[object String]", k7 = "[object Symbol]", x7 = "[object WeakMap]", L7 = "[object ArrayBuffer]", w7 = "[object DataView]", A7 = "[object Float32Array]", M7 = "[object Float64Array]", T7 = "[object Int8Array]", S7 = "[object Int16Array]", P7 = "[object Int32Array]", O7 = "[object Uint8Array]", D7 = "[object Uint8ClampedArray]", N7 = "[object Uint16Array]", I7 = "[object Uint32Array]", ge = {};
ge[c9] = ge[f7] = ge[L7] = ge[w7] = ge[m7] = ge[g7] = ge[A7] = ge[M7] = ge[T7] = ge[S7] = ge[P7] = ge[v7] = ge[C7] = ge[d9] = ge[$7] = ge[b7] = ge[_7] = ge[k7] = ge[O7] = ge[D7] = ge[N7] = ge[I7] = !0;
ge[y7] = ge[u9] = ge[x7] = !1;
function Kt(e, n, t, r, a, l) {
  var h, u = n & u7, p = n & d7, k = n & h7;
  if (t && (h = a ? t(e, r, a, l) : t(e)), h !== void 0)
    return h;
  if (!a7(e))
    return e;
  var y = r7(e);
  if (y) {
    if (h = e7(e), !u)
      return qs(e, h);
  } else {
    var w = Js(e), A = w == u9 || w == p7;
    if (o7(e))
      return Hs(e, u);
    if (w == d9 || w == c9 || A && !a) {
      if (h = p || A ? {} : n7(e), !u)
        return p ? Ws(e, Vs(h, e)) : Ys(e, Zs(h, e));
    } else {
      if (!ge[w])
        return a ? e : {};
      h = t7(e, w, u);
    }
  }
  l || (l = new Rs());
  var O = l.get(e);
  if (O)
    return O;
  l.set(e, h), s7(e) ? e.forEach(function(D) {
    h.add(Kt(D, n, t, D, e, l));
  }) : i7(e) && e.forEach(function(D, R) {
    h.set(R, Kt(D, n, t, R, e, l));
  });
  var F = k ? p ? Xs : Gs : p ? c7 : l7, B = y ? void 0 : F(e);
  return js(B || e, function(D, R) {
    B && (R = D, D = e[R]), Qs(h, R, Kt(D, n, t, R, e, l));
  }), h;
}
var E7 = Kt, B7 = E7, F7 = 1, U7 = 4;
function z7(e) {
  return B7(e, F7 | U7);
}
var K7 = z7;
const R7 = /* @__PURE__ */ zr(K7), j7 = /* @__PURE__ */ $("<button></button>"), Q7 = (e) => (() => {
  const n = j7.cloneNode(!0);
  return i1(n, "click", e.onClick, !0), v(n, () => e.children), I((t) => {
    const r = e.style, a = `klinecharts-pro-button ${e.type ?? "confirm"} ${e.class ?? ""}`;
    return t._v$ = I1(n, r, t._v$), a !== t._v$2 && oe(n, t._v$2 = a), t;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), n;
})();
Qe(["click"]);
const Z7 = /* @__PURE__ */ $('<svg viewBox="0 0 1024 1024" class="icon"><path d="M810.666667 128H213.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v597.333334c0 46.933333 38.4 85.333333 85.333333 85.333333h597.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V213.333333c0-46.933333-38.4-85.333333-85.333333-85.333333z m-353.706667 567.04a42.496 42.496 0 0 1-60.16 0L243.626667 541.866667c-8.106667-8.106667-12.373333-18.773333-12.373334-29.866667s4.693333-22.186667 12.373334-29.866667a42.496 42.496 0 0 1 60.16 0L426.666667 604.586667l293.546666-293.546667a42.496 42.496 0 1 1 60.16 60.16l-323.413333 323.84z"></path></svg>'), V7 = /* @__PURE__ */ $('<svg viewBox="0 0 1024 1024" class="icon"><path d="M245.333333 128h533.333334A117.333333 117.333333 0 0 1 896 245.333333v533.333334A117.333333 117.333333 0 0 1 778.666667 896H245.333333A117.333333 117.333333 0 0 1 128 778.666667V245.333333A117.333333 117.333333 0 0 1 245.333333 128z m0 64c-29.44 0-53.333333 23.893333-53.333333 53.333333v533.333334c0 29.44 23.893333 53.333333 53.333333 53.333333h533.333334c29.44 0 53.333333-23.893333 53.333333-53.333333V245.333333c0-29.44-23.893333-53.333333-53.333333-53.333333H245.333333z"></path></svg>'), H7 = /* @__PURE__ */ $("<div></div>"), q7 = /* @__PURE__ */ $('<span class="label"></span>'), Y7 = () => Z7.cloneNode(!0), W7 = () => V7.cloneNode(!0), $r = (e) => {
  const [n, t] = T(e.checked ?? !1);
  return Ke(() => {
    "checked" in e && t(e.checked);
  }), (() => {
    const r = H7.cloneNode(!0);
    return r.$$click = (a) => {
      const l = !n();
      e.onChange && e.onChange(l), t(l);
    }, v(r, (() => {
      const a = Z(() => !!n());
      return () => a() ? L(Y7, {}) : L(W7, {});
    })(), null), v(r, (() => {
      const a = Z(() => !!e.label);
      return () => a() && (() => {
        const l = q7.cloneNode(!0);
        return v(l, () => e.label), l;
      })();
    })(), null), I((a) => {
      const l = e.style, h = `klinecharts-pro-checkbox ${n() && "checked" || ""} ${e.class || ""}`;
      return a._v$ = I1(r, l, a._v$), h !== a._v$2 && oe(r, a._v$2 = h), a;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), r;
  })();
};
Qe(["click"]);
const G7 = /* @__PURE__ */ $('<div class="klinecharts-pro-loading"><i class="circle1"></i><i class="circle2"></i><i class="circle3"></i></div>'), h9 = () => G7.cloneNode(!0), X7 = /* @__PURE__ */ $('<div class="klinecharts-pro-empty"><svg class="icon" viewBox="0 0 1024 1024"><path d="M855.6 427.2H168.5c-12.7 0-24.4 6.9-30.6 18L4.4 684.7C1.5 689.9 0 695.8 0 701.8v287.1c0 19.4 15.7 35.1 35.1 35.1H989c19.4 0 35.1-15.7 35.1-35.1V701.8c0-6-1.5-11.8-4.4-17.1L886.2 445.2c-6.2-11.1-17.9-18-30.6-18zM673.4 695.6c-16.5 0-30.8 11.5-34.3 27.7-12.7 58.5-64.8 102.3-127.2 102.3s-114.5-43.8-127.2-102.3c-3.5-16.1-17.8-27.7-34.3-27.7H119c-26.4 0-43.3-28-31.1-51.4l81.7-155.8c6.1-11.6 18-18.8 31.1-18.8h622.4c13 0 25 7.2 31.1 18.8l81.7 155.8c12.2 23.4-4.7 51.4-31.1 51.4H673.4zM819.9 209.5c-1-1.8-2.1-3.7-3.2-5.5-9.8-16.6-31.1-22.2-47.8-12.6L648.5 261c-17 9.8-22.7 31.6-12.6 48.4 0.9 1.4 1.7 2.9 2.5 4.4 9.5 17 31.2 22.8 48 13L807 257.3c16.7-9.7 22.4-31 12.9-47.8zM375.4 261.1L255 191.6c-16.7-9.6-38-4-47.8 12.6-1.1 1.8-2.1 3.6-3.2 5.5-9.5 16.8-3.8 38.1 12.9 47.8L337.3 327c16.9 9.7 38.6 4 48-13.1 0.8-1.5 1.7-2.9 2.5-4.4 10.2-16.8 4.5-38.6-12.4-48.4zM512 239.3h2.5c19.5 0.3 35.5-15.5 35.5-35.1v-139c0-19.3-15.6-34.9-34.8-35.1h-6.4C489.6 30.3 474 46 474 65.2v139c0 19.5 15.9 35.4 35.5 35.1h2.5z"></path></svg></div>'), J7 = () => X7.cloneNode(!0), el = /* @__PURE__ */ $("<ul></ul>"), tl = /* @__PURE__ */ $("<li></li>"), Wt = (e) => (() => {
  const n = el.cloneNode(!0);
  return v(n, L(J, {
    get when() {
      return e.loading;
    },
    get children() {
      return L(h9, {});
    }
  }), null), v(n, L(J, {
    get when() {
      var t;
      return !e.loading && !e.children && !((t = e.dataSource) != null && t.length);
    },
    get children() {
      return L(J7, {});
    }
  }), null), v(n, L(J, {
    get when() {
      return e.children;
    },
    get children() {
      return e.children;
    }
  }), null), v(n, L(J, {
    get when() {
      return !e.children;
    },
    get children() {
      var t;
      return (t = e.dataSource) == null ? void 0 : t.map((r) => {
        var a;
        return ((a = e.renderItem) == null ? void 0 : a.call(e, r)) ?? tl.cloneNode(!0);
      });
    }
  }), null), I((t) => {
    const r = e.style, a = `klinecharts-pro-list ${e.class ?? ""}`;
    return t._v$ = I1(n, r, t._v$), a !== t._v$2 && oe(n, t._v$2 = a), t;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), n;
})(), nl = /* @__PURE__ */ $('<div class="klinecharts-pro-modal"><div class="inner"><div class="title-container"><svg class="close-icon" viewBox="0 0 1024 1024"><path d="M934.184927 199.723787 622.457206 511.452531l311.727721 311.703161c14.334473 14.229073 23.069415 33.951253 23.069415 55.743582 0 43.430138-35.178197 78.660524-78.735226 78.660524-21.664416 0-41.361013-8.865925-55.642275-23.069415L511.149121 622.838388 199.420377 934.490384c-14.204513 14.20349-33.901111 23.069415-55.642275 23.069415-43.482327 0-78.737272-35.230386-78.737272-78.660524 0-21.792329 8.864902-41.513486 23.094998-55.743582l311.677579-311.703161L88.135828 199.723787c-14.230096-14.255679-23.094998-33.92567-23.094998-55.642275 0-43.430138 35.254945-78.762855 78.737272-78.762855 21.741163 0 41.437761 8.813736 55.642275 23.069415l311.727721 311.727721L822.876842 88.389096c14.281261-14.255679 33.977859-23.069415 55.642275-23.069415 43.557028 0 78.735226 35.332716 78.735226 78.762855C957.254342 165.798117 948.5194 185.468109 934.184927 199.723787"></path></svg></div><div class="content-container"></div></div></div>'), rl = /* @__PURE__ */ $('<div class="button-container"></div>'), C1 = (e) => (() => {
  const n = nl.cloneNode(!0), t = n.firstChild, r = t.firstChild, a = r.firstChild, l = r.nextSibling;
  return n.$$click = (h) => {
    h.target === h.currentTarget && e.onClose && e.onClose();
  }, v(r, () => e.title, a), i1(a, "click", e.onClose, !0), v(l, () => e.children), v(t, (() => {
    const h = Z(() => !!(e.buttons && e.buttons.length > 0));
    return () => h() && (() => {
      const u = rl.cloneNode(!0);
      return v(u, () => e.buttons.map((p) => L(Q7, Ur(p, {
        get style() {
          return {
            ...e.minButtonWidth ? {
              "min-width": `${e.minButtonWidth}px`
            } : {},
            width: e.isMobile ? "100%" : "auto"
          };
        },
        get children() {
          return p.children;
        }
      })))), I((p) => {
        const k = e.btnParentStyle, y = !!e.isMobile;
        return p._v$8 = I1(u, k, p._v$8), y !== p._v$9 && u.classList.toggle("mobile-buttons", p._v$9 = y), p;
      }, {
        _v$8: void 0,
        _v$9: void 0
      }), u;
    })();
  })(), null), I((h) => {
    const u = !!e.isMobile, p = e.isMobile ? "100%" : `${e.width ?? 400}px`, k = (e.isMobile, "auto"), y = e.isMobile ? "60vh" : "90vh", w = !!e.isMobile, A = !!e.isMobile, O = !!e.isMobile;
    return u !== h._v$ && n.classList.toggle("mobile-modal", h._v$ = u), p !== h._v$2 && t.style.setProperty("width", h._v$2 = p), k !== h._v$3 && t.style.setProperty("height", h._v$3 = k), y !== h._v$4 && t.style.setProperty("max-height", h._v$4 = y), w !== h._v$5 && t.classList.toggle("mobile-inner", h._v$5 = w), A !== h._v$6 && r.classList.toggle("mobile-title", h._v$6 = A), O !== h._v$7 && l.classList.toggle("mobile-content", h._v$7 = O), h;
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
const ol = /* @__PURE__ */ $('<div tabindex="0"><div class="selector-container"><span class="value"></span><i class="arrow"></i></div></div>'), il = /* @__PURE__ */ $('<div class="drop-down-container"><ul></ul></div>'), al = /* @__PURE__ */ $('<div><input type="text"></div>'), sl = /* @__PURE__ */ $("<li></li>"), f9 = (e) => {
  const [n, t] = T(!1), [r, a] = T("");
  let l, h;
  const u = Z(() => {
    if (!e.dataSource || !e.searchable)
      return e.dataSource;
    const y = r().toLowerCase().trim();
    return y ? typeof e.dataSource[0] == "string" ? e.dataSource.filter((A) => A.toLowerCase().includes(y)) : e.dataSource.filter((A) => {
      var B, D;
      const O = ((B = A.text) == null ? void 0 : B.toString().toLowerCase()) || "", F = ((D = A.key) == null ? void 0 : D.toLowerCase()) || "";
      return O.includes(y) || F.includes(y);
    }) : e.dataSource;
  }), p = () => {
    const y = !n();
    t(y), a(""), y && e.searchable && setTimeout(() => l == null ? void 0 : l.focus(), 50);
  }, k = (y) => {
    const w = y.relatedTarget;
    h && w && h.contains(w) || (t(!1), a(""));
  };
  return (() => {
    const y = ol.cloneNode(!0), w = y.firstChild, A = w.firstChild;
    y.addEventListener("blur", k), y.$$click = (F) => {
      F.stopPropagation(), p();
    };
    const O = h;
    return typeof O == "function" ? D1(O, y) : h = y, v(A, () => e.value), v(y, (() => {
      const F = Z(() => !!(e.dataSource && e.dataSource.length > 0));
      return () => F() && (() => {
        const B = il.cloneNode(!0), D = B.firstChild;
        return B.$$mousedown = (R) => R.preventDefault(), v(B, (() => {
          const R = Z(() => !!e.searchable);
          return () => R() && (() => {
            const X = al.cloneNode(!0), U = X.firstChild;
            X.style.setProperty("padding", "8px"), X.style.setProperty("border-bottom", "1px solid #333"), U.$$click = (V) => V.stopPropagation(), U.$$input = (V) => a(V.currentTarget.value);
            const W = l;
            return typeof W == "function" ? D1(W, U) : l = U, U.style.setProperty("width", "100%"), U.style.setProperty("padding", "6px 10px"), U.style.setProperty("border", "1px solid var(--klinecharts-pro-border-color)"), U.style.setProperty("border-radius", "4px"), U.style.setProperty("background-color", "var(--klinecharts-pro-popover-background-color)"), U.style.setProperty("color", "#fff"), U.style.setProperty("font-size", "13px"), U.style.setProperty("outline", "none"), I(() => Pe(U, "placeholder", e.searchPlaceholder || "Search...")), I(() => U.value = r()), X;
          })();
        })(), D), v(D, () => {
          var R;
          return (R = u()) == null ? void 0 : R.map((X) => {
            const W = X[e.valueKey ?? "text"] ?? X;
            return (() => {
              const V = sl.cloneNode(!0);
              return V.$$click = (ue) => {
                var z;
                ue.stopPropagation(), e.value !== W && ((z = e.onSelected) == null || z.call(e, X)), t(!1), a("");
              }, v(V, W), I(() => V.classList.toggle("selected", e.value === W)), V;
            })();
          });
        }), B;
      })();
    })(), null), I((F) => {
      const B = e.style, D = `klinecharts-pro-select ${e.class ?? ""} ${n() ? "klinecharts-pro-select-show" : ""}`;
      return F._v$ = I1(y, B, F._v$), D !== F._v$2 && oe(y, F._v$2 = D), F;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), y;
  })();
};
Qe(["click", "mousedown", "input"]);
const ll = /* @__PURE__ */ $('<span class="prefix"></span>'), cl = /* @__PURE__ */ $('<span class="suffix"></span>'), ul = /* @__PURE__ */ $('<div><input class="value"></div>'), m9 = (e) => {
  const n = Ur({
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER
  }, e);
  let t;
  const [r, a] = T("normal");
  return (() => {
    const l = ul.cloneNode(!0), h = l.firstChild;
    return l.$$click = () => {
      t == null || t.focus();
    }, v(l, L(J, {
      get when() {
        return n.prefix;
      },
      get children() {
        const u = ll.cloneNode(!0);
        return v(u, () => n.prefix), u;
      }
    }), h), h.addEventListener("change", (u) => {
      var k, y;
      const p = u.target.value;
      if ("precision" in n) {
        let w;
        const A = Math.max(0, Math.floor(n.precision));
        A <= 0 ? w = new RegExp(/^[1-9]\d*$/) : w = new RegExp("^\\d+\\.?\\d{0," + A + "}$"), (p === "" || w.test(p) && +p >= n.min && +p <= n.max) && ((k = n.onChange) == null || k.call(n, p === "" ? p : +p));
      } else
        (y = n.onChange) == null || y.call(n, p);
    }), h.addEventListener("blur", () => {
      a("normal");
    }), h.addEventListener("focus", () => {
      a("focus");
    }), D1((u) => {
      t = u;
    }, h), v(l, L(J, {
      get when() {
        return n.suffix;
      },
      get children() {
        const u = cl.cloneNode(!0);
        return v(u, () => n.suffix), u;
      }
    }), null), I((u) => {
      const p = n.style, k = `klinecharts-pro-input ${n.class ?? ""}`, y = r(), w = n.placeholder ?? "";
      return u._v$ = I1(l, p, u._v$), k !== u._v$2 && oe(l, u._v$2 = k), y !== u._v$3 && Pe(l, "data-status", u._v$3 = y), w !== u._v$4 && Pe(h, "placeholder", u._v$4 = w), u;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0
    }), I(() => h.value = n.value), l;
  })();
};
Qe(["click"]);
const dl = /* @__PURE__ */ $('<div><i class="thumb"></i></div>'), hl = (e) => (() => {
  const n = dl.cloneNode(!0);
  return n.$$click = (t) => {
    e.onChange && e.onChange();
  }, I((t) => {
    const r = e.style, a = `klinecharts-pro-switch ${e.open ? "turn-on" : "turn-off"} ${e.class ?? ""}`;
    return t._v$ = I1(n, r, t._v$), a !== t._v$2 && oe(n, t._v$2 = a), t;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), n;
})();
Qe(["click"]);
const fl = "指标", ml = "更多", gl = "主图指标", yl = "副图指标", pl = "设置", vl = "时区", Cl = "截屏", $l = "全屏", bl = "退出全屏", _l = "保存", kl = "确定", xl = "取消", Ll = "MA(移动平均线)", wl = "EMA(指数平滑移动平均线)", Al = "SMA", Ml = "BOLL(布林线)", Tl = "BBI(多空指数)", Sl = "SAR(停损点指向指标)", Pl = "VOL(成交量)", Ol = "MACD(指数平滑异同移动平均线)", Dl = "KDJ(随机指标)", Nl = "RSI(相对强弱指标)", Il = "BIAS(乖离率)", El = "BRAR(情绪指标)", Bl = "CCI(顺势指标)", Fl = "DMI(动向指标)", Ul = "CR(能量指标)", zl = "PSY(心理线)", Kl = "DMA(平行线差指标)", Rl = "TRIX(三重指数平滑平均线)", jl = "OBV(能量潮指标)", Ql = "VR(成交量变异率)", Zl = "WR(威廉指标)", Vl = "MTM(动量指标)", Hl = "EMV(简易波动指标)", ql = "ROC(变动率指标)", Yl = "PVT(价量趋势指标)", Wl = "AO(动量震荡指标)", Gl = "世界统一时间", Xl = "(UTC-10) 檀香山", Jl = "(UTC-8) 朱诺", e4 = "(UTC-7) 洛杉矶", t4 = "(UTC-5) 芝加哥", n4 = "(UTC-4) 多伦多", r4 = "(UTC-3) 圣保罗", o4 = "(UTC+1) 伦敦", i4 = "(UTC+2) 柏林", a4 = "(UTC+3) 巴林", s4 = "(UTC+4) 迪拜", l4 = "(UTC+5) 阿什哈巴德", c4 = "(UTC+6) 阿拉木图", u4 = "(UTC+7) 曼谷", d4 = "(UTC+8) 上海", h4 = "(UTC+9) 东京", f4 = "(UTC+10) 悉尼", m4 = "(UTC+12) 诺福克岛", g4 = "水平直线", y4 = "水平射线", p4 = "水平线段", v4 = "垂直直线", C4 = "垂直射线", $4 = "垂直线段", b4 = "直线", _4 = "射线", k4 = "线段", x4 = "箭头", L4 = "价格线", w4 = "价格通道线", A4 = "平行直线", M4 = "斐波那契回调直线", T4 = "斐波那契回调线段", S4 = "斐波那契圆环", P4 = "斐波那契螺旋", O4 = "斐波那契速度阻力扇", D4 = "斐波那契趋势扩展", N4 = "江恩箱", I4 = "矩形", E4 = "平行四边形", B4 = "圆", F4 = "三角形", U4 = "三浪", z4 = "五浪", K4 = "八浪", R4 = "任意浪", j4 = "ABCD形态", Q4 = "XABCD形态", Z4 = "弱磁模式", V4 = "强磁模式", H4 = "商品搜索", q4 = "商品代码", Y4 = "参数1", W4 = "参数2", G4 = "参数3", X4 = "参数4", J4 = "参数5", ec = "周期", tc = "标准差", nc = "蜡烛图类型", rc = "全实心", oc = "全空心", ic = "涨空心", ac = "跌空心", sc = "OHLC", lc = "面积图", cc = "最新价显示", uc = "最高价显示", dc = "最低价显示", hc = "指标最新值显示", fc = "价格轴类型", mc = "线性轴", gc = "百分比轴", yc = "对数轴", pc = "倒置坐标", vc = "网格线显示", Cc = "恢复默认", $c = {
  indicator: fl,
  more: ml,
  main_indicator: gl,
  sub_indicator: yl,
  setting: pl,
  timezone: vl,
  screenshot: Cl,
  full_screen: $l,
  exit_full_screen: bl,
  save: _l,
  confirm: kl,
  cancel: xl,
  ma: Ll,
  ema: wl,
  sma: Al,
  boll: Ml,
  bbi: Tl,
  sar: Sl,
  vol: Pl,
  macd: Ol,
  kdj: Dl,
  rsi: Nl,
  bias: Il,
  brar: El,
  cci: Bl,
  dmi: Fl,
  cr: Ul,
  psy: zl,
  dma: Kl,
  trix: Rl,
  obv: jl,
  vr: Ql,
  wr: Zl,
  mtm: Vl,
  emv: Hl,
  roc: ql,
  pvt: Yl,
  ao: Wl,
  utc: Gl,
  honolulu: Xl,
  juneau: Jl,
  los_angeles: e4,
  chicago: t4,
  toronto: n4,
  sao_paulo: r4,
  london: o4,
  berlin: i4,
  bahrain: a4,
  dubai: s4,
  ashkhabad: l4,
  almaty: c4,
  bangkok: u4,
  shanghai: d4,
  tokyo: h4,
  sydney: f4,
  norfolk: m4,
  horizontal_straight_line: g4,
  horizontal_ray_line: y4,
  horizontal_segment: p4,
  vertical_straight_line: v4,
  vertical_ray_line: C4,
  vertical_segment: $4,
  straight_line: b4,
  ray_line: _4,
  segment: k4,
  arrow: x4,
  price_line: L4,
  price_channel_line: w4,
  parallel_straight_line: A4,
  fibonacci_line: M4,
  fibonacci_segment: T4,
  fibonacci_circle: S4,
  fibonacci_spiral: P4,
  fibonacci_speed_resistance_fan: O4,
  fibonacci_extension: D4,
  gann_box: N4,
  rect: I4,
  parallelogram: E4,
  circle: B4,
  triangle: F4,
  three_waves: U4,
  five_waves: z4,
  eight_waves: K4,
  any_waves: R4,
  abcd: j4,
  xabcd: Q4,
  weak_magnet: Z4,
  strong_magnet: V4,
  symbol_search: H4,
  symbol_code: q4,
  params_1: Y4,
  params_2: W4,
  params_3: G4,
  params_4: X4,
  params_5: J4,
  period: ec,
  standard_deviation: tc,
  candle_type: nc,
  candle_solid: rc,
  candle_stroke: oc,
  candle_up_stroke: ic,
  candle_down_stroke: ac,
  ohlc: sc,
  area: lc,
  last_price_show: cc,
  high_price_show: uc,
  low_price_show: dc,
  indicator_last_value_show: hc,
  price_axis_type: fc,
  normal: mc,
  percentage: gc,
  log: yc,
  reverse_coordinate: pc,
  grid_show: vc,
  restore_default: Cc
}, bc = "Indicator", _c = "More", kc = "Main Indicator", xc = "Sub Indicator", Lc = "Setting", wc = "Timezone", Ac = "Screenshot", Mc = "Full Screen", Tc = "Exit", Sc = "Save", Pc = "Confirm", Oc = "Cancel", Dc = "MA(Moving Average)", Nc = "EMA(Exponential Moving Average)", Ic = "SMA", Ec = "BOLL(Bolinger Bands)", Bc = "BBI(Bull And Bearlndex)", Fc = "SAR(Stop and Reverse)", Uc = "VOL(Volume)", zc = "MACD(Moving Average Convergence / Divergence)", Kc = "KDJ(KDJ Index)", Rc = "RSI(Relative Strength Index)", jc = "BIAS(Bias Ratio)", Qc = "BRAR(情绪指标)", Zc = "CCI(Commodity Channel Index)", Vc = "DMI(Directional Movement Index)", Hc = "CR(能量指标)", qc = "PSY(Psychological Line)", Yc = "DMA(Different of Moving Average)", Wc = "TRIX(Triple Exponentially Smoothed Moving Average)", Gc = "OBV(On Balance Volume)", Xc = "VR(Volatility Volume Ratio)", Jc = "WR(Williams %R)", eu = "MTM(Momentum Index)", tu = "EMV(Ease of Movement Value)", nu = "ROC(Price Rate of Change)", ru = "PVT(Price and Volume Trend)", ou = "AO(Awesome Oscillator)", iu = "UTC", au = "(UTC-10) Honolulu", su = "(UTC-8) Juneau", lu = "(UTC-7) Los Angeles", cu = "(UTC-5) Chicago", uu = "(UTC-4) Toronto", du = "(UTC-3) Sao Paulo", hu = "(UTC+1) London", fu = "(UTC+2) Berlin", mu = "(UTC+3) Bahrain", gu = "(UTC+4) Dubai", yu = "(UTC+5) Ashkhabad", pu = "(UTC+6) Almaty", vu = "(UTC+7) Bangkok", Cu = "(UTC+8) Shanghai", $u = "(UTC+9) Tokyo", bu = "(UTC+10) Sydney", _u = "(UTC+12) Norfolk", ku = "Horizontal Line", xu = "Horizontal Ray", Lu = "Horizontal Segment", wu = "Vertical Line", Au = "Vertical Ray", Mu = "Vertical Segment", Tu = "Trend Line", Su = "Ray", Pu = "Segment", Ou = "Arrow", Du = "Price Line", Nu = "Price Channel Line", Iu = "Parallel Line", Eu = "Fibonacci Line", Bu = "Fibonacci Segment", Fu = "Fibonacci Circle", Uu = "Fibonacci Spiral", zu = "Fibonacci Sector", Ku = "Fibonacci Extension", Ru = "Gann Box", ju = "Rect", Qu = "Parallelogram", Zu = "Circle", Vu = "Triangle", Hu = "Three Waves", qu = "Five Waves", Yu = "Eight Waves", Wu = "Any Waves", Gu = "ABCD Pattern", Xu = "XABCD Pattern", Ju = "Weak Magnet", ed = "Strong Magnet", td = "Symbol Search", nd = "Symbol Code", rd = "Parameter 1", od = "Parameter 2", id = "Parameter 3", ad = "Parameter 4", sd = "Parameter 5", ld = "Period", cd = "Standard Deviation", ud = "Candle Type", dd = "Candle Solid", hd = "Candle Stroke", fd = "Candle Up Stroke", md = "Candle Down Stroke", gd = "OHLC", yd = "Area", pd = "Show Last Price", vd = "Show Highest Price", Cd = "Show Lowest Price", $d = "Show indicator's last value", bd = "Price Axis Type", _d = "Normal", kd = "Percentage", xd = "Log", Ld = "Reverse Coordinate", wd = "Show Grids", Ad = "Restore Defaults", Md = {
  indicator: bc,
  more: _c,
  main_indicator: kc,
  sub_indicator: xc,
  setting: Lc,
  timezone: wc,
  screenshot: Ac,
  full_screen: Mc,
  exit_full_screen: Tc,
  save: Sc,
  confirm: Pc,
  cancel: Oc,
  ma: Dc,
  ema: Nc,
  sma: Ic,
  boll: Ec,
  bbi: Bc,
  sar: Fc,
  vol: Uc,
  macd: zc,
  kdj: Kc,
  rsi: Rc,
  bias: jc,
  brar: Qc,
  cci: Zc,
  dmi: Vc,
  cr: Hc,
  psy: qc,
  dma: Yc,
  trix: Wc,
  obv: Gc,
  vr: Xc,
  wr: Jc,
  mtm: eu,
  emv: tu,
  roc: nu,
  pvt: ru,
  ao: ou,
  utc: iu,
  honolulu: au,
  juneau: su,
  los_angeles: lu,
  chicago: cu,
  toronto: uu,
  sao_paulo: du,
  london: hu,
  berlin: fu,
  bahrain: mu,
  dubai: gu,
  ashkhabad: yu,
  almaty: pu,
  bangkok: vu,
  shanghai: Cu,
  tokyo: $u,
  sydney: bu,
  norfolk: _u,
  horizontal_straight_line: ku,
  horizontal_ray_line: xu,
  horizontal_segment: Lu,
  vertical_straight_line: wu,
  vertical_ray_line: Au,
  vertical_segment: Mu,
  straight_line: Tu,
  ray_line: Su,
  segment: Pu,
  arrow: Ou,
  price_line: Du,
  price_channel_line: Nu,
  parallel_straight_line: Iu,
  fibonacci_line: Eu,
  fibonacci_segment: Bu,
  fibonacci_circle: Fu,
  fibonacci_spiral: Uu,
  fibonacci_speed_resistance_fan: zu,
  fibonacci_extension: Ku,
  gann_box: Ru,
  rect: ju,
  parallelogram: Qu,
  circle: Zu,
  triangle: Vu,
  three_waves: Hu,
  five_waves: qu,
  eight_waves: Yu,
  any_waves: Wu,
  abcd: Gu,
  xabcd: Xu,
  weak_magnet: Ju,
  strong_magnet: ed,
  symbol_search: td,
  symbol_code: nd,
  params_1: rd,
  params_2: od,
  params_3: id,
  params_4: ad,
  params_5: sd,
  period: ld,
  standard_deviation: cd,
  candle_type: ud,
  candle_solid: dd,
  candle_stroke: hd,
  candle_up_stroke: fd,
  candle_down_stroke: md,
  ohlc: gd,
  area: yd,
  last_price_show: pd,
  high_price_show: vd,
  low_price_show: Cd,
  indicator_last_value_show: $d,
  price_axis_type: bd,
  normal: _d,
  percentage: kd,
  log: xd,
  reverse_coordinate: Ld,
  grid_show: wd,
  restore_default: Ad
}, g9 = {
  "zh-CN": $c,
  "en-US": Md
};
function Pm(e, n) {
  g9[e] = n;
}
const c = (e, n) => {
  var t;
  return ((t = g9[n]) == null ? void 0 : t[e]) ?? e;
}, Td = /* @__PURE__ */ $('<div class="scroll-indicator left"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg></div>'), Sd = /* @__PURE__ */ $('<img alt="symbol">'), Pd = /* @__PURE__ */ $('<div class="symbol"><span></span></div>'), Od = /* @__PURE__ */ $('<span class="down-arrow-icon mobile-separate-arrow"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></span>'), Dd = /* @__PURE__ */ $('<span class="mobile-more-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg></span>'), Nd = /* @__PURE__ */ $('<div class="item tools" title="Time Tools"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M16 3v4"></path><path d="M8 3v4"></path><path d="M3 10h18"></path><path d="M12 14v4"></path><path d="M10 16h4"></path></svg></div>'), Id = /* @__PURE__ */ $('<div class="item tools"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div>'), Ed = /* @__PURE__ */ $('<div class="klinecharts-pro-order-tools-display-menu"></div>'), Bd = /* @__PURE__ */ $('<div class="klinecharts-pro-order-tools-popover"><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Quick Order</span></span><span class="klinecharts-pro-order-tools-chevron">›</span></button><div class="klinecharts-pro-order-tools-submenu"><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Floating Window</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Plus Button</span></label></div></div><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Open Orders</span></span><span class="klinecharts-pro-order-tools-chevron">&rsaquo;</span></button><div class="klinecharts-pro-order-tools-submenu"><div class="klinecharts-pro-order-tools-setting-row"><span class="klinecharts-pro-order-tools-label">Extended Price Line</span><button type="button"><span></span></button></div><div class="klinecharts-pro-order-tools-setting-row"><span class="klinecharts-pro-order-tools-label">Display</span><div class="klinecharts-pro-order-tools-display"><button type="button" class="klinecharts-pro-order-tools-display-button"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4"></path></svg></button></div></div></div></div><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Positions</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Breakeven Price</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Liquidation Price</span></label><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Price Line</span></span><span class="klinecharts-pro-order-tools-chevron">&rsaquo;</span></button><div class="klinecharts-pro-order-tools-submenu"><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Market Price Line</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Count Down</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Bid & Ask Price</span></label></div></div><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Order History</span></label></div>'), Fd = /* @__PURE__ */ $('<div><div class="item tools order-tools-trigger"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Orders"><path d="M4 7h10"></path><path d="M4 12h8"></path><path d="M4 17h6"></path><path d="M18 6v12"></path><path d="M15 15l3 3 3-3"></path></svg><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></div></div>'), Ud = /* @__PURE__ */ $('<div class="item tools"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path><path d="M15.22299772857666,9.722223632261718C12.59389772857666,9.722223632261718,10.44600772857666,12.020201374511718,10.44600772857666,14.861111374511719C10.44600772857666,17.70202137451172,12.58215772857666,20.000021374511718,15.223007728576661,20.000021374511718C17.86384772857666,20.000021374511718,19.99999772857666,17.70202137451172,19.99999772857666,14.861111374511719C19.99999772857666,12.020201374511718,17.85211772857666,9.72222212709572,15.22299772857666,9.722223632261718ZM15.22299772857666,18.598491374511717C13.30985772857666,18.598491374511717,11.737087728576661,16.91919137451172,11.737087728576661,14.848481374511719C11.737087728576661,12.777781374511719,13.29811772857666,11.098491374511719,15.22299772857666,11.098491374511719C17.14787772857666,11.098491374511719,18.708917728576658,12.777781374511719,18.708917728576658,14.848481374511719C18.708917728576658,16.91919137451172,17.13614772857666,18.59848137451172,15.22299772857666,18.598491374511717Z"></path><path d="M15.692486288146974,15.050496970825195L15.692486288146974,12.676760970825196C15.692486288146974,12.297972970825196,15.399058288146973,11.982316970825195,15.046945288146972,11.982316970825195C14.694833288146972,11.982316970825195,14.401406288146973,12.297972970825196,14.401406288146973,12.676760970825196L14.401406288146973,15.340896970825195C14.401406288146973,15.530296970825194,14.471829288146973,15.694436970825196,14.589200288146973,15.833326970825196L15.751176288146972,17.095956970825195C15.868546288146973,17.222216970825194,16.032866288146973,17.297976970825196,16.208916288146973,17.297976970825196C16.384976288146973,17.297976970825196,16.537556288146973,17.222216970825194,16.666666288146974,17.095956970825195C16.78403628814697,16.969686970825194,16.854456288146974,16.792916970825196,16.854456288146974,16.603526970825193C16.854456288146974,16.414136970825197,16.78403628814697,16.237366970825196,16.666666288146974,16.111106970825197L15.692486288146974,15.050496970825195Z"></path></svg></div>'), zd = /* @__PURE__ */ $('<div class="item tools"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg></div>'), Kd = /* @__PURE__ */ $('<div class="item tools"><svg viewBox="0 0 20 20"><path d="M6.50977,1L13.4902,1C13.6406,1,13.7695,1.1104910000000001,13.7969,1.2631700000000001L14.0273,2.52277C14.1387,3.13147,14.6543,3.57143,15.2559,3.57143L17.5,3.57143C18.8809,3.57143,20,4.72254,20,6.14286L20,16.4286C20,17.8489,18.8809,19,17.5,19L2.5,19C1.11914,19,0,17.8489,0,16.4286L0,6.14286C0,4.72254,1.11914,3.57143,2.5,3.57143L4.74414,3.57143C5.3457,3.57143,5.86133,3.13147,5.97266,2.52277L6.20312,1.2631700000000001C6.23047,1.1104910000000001,6.35937,1,6.50977,1ZM15.2559,4.857139999999999C14.0547,4.857139999999999,13.0215,3.97522,12.7988,2.75982L12.7129,2.28571L7.28711,2.28571L7.20117,2.75982C6.98047,3.97522,5.94727,4.857139999999999,4.74414,4.857139999999999L2.5,4.857139999999999C1.81055,4.857139999999999,1.25,5.43371,1.25,6.14286L1.25,16.4286C1.25,17.1377,1.81055,17.7143,2.5,17.7143L17.5,17.7143C18.1895,17.7143,18.75,17.1377,18.75,16.4286L18.75,6.14286C18.75,5.43371,18.1895,4.857139999999999,17.5,4.857139999999999L15.2559,4.857139999999999ZM4.375,6.78571L3.125,6.78571C2.7793,6.78571,2.5,6.49844,2.5,6.14286C2.5,5.78728,2.7793,5.5,3.125,5.5L4.375,5.5C4.7207,5.5,5,5.78728,5,6.14286C5,6.49844,4.7207,6.78571,4.375,6.78571ZM10,6.14286C7.06641,6.14286,4.6875,8.58973,4.6875,11.6071C4.6875,14.6246,7.06641,17.0714,10,17.0714C12.9336,17.0714,15.3125,14.6246,15.3125,11.6071C15.3125,8.58973,12.9336,6.14286,10,6.14286ZM10,7.42857C11.0859,7.42857,12.1055,7.8625,12.873,8.65201C13.6406,9.44152,14.0625,10.49018,14.0625,11.6071C14.0625,12.7241,13.6406,13.7728,12.873,14.5623C12.1055,15.3518,11.0859,15.7857,10,15.7857C8.91406,15.7857,7.89453,15.3518,7.12695,14.5623C6.35937,13.7728,5.9375,12.7241,5.9375,11.6071C5.9375,10.49018,6.35938,9.44152,7.12695,8.65201C7.89453,7.8625,8.91406,7.42857,10,7.42857ZM10,9.67857C8.96484,9.67857,8.125,10.54241,8.125,11.6071C8.125,12.6719,8.96484,13.5357,10,13.5357C11.0352,13.5357,11.875,12.6719,11.875,11.6071C11.875,10.54241,11.0352,9.67857,10,9.67857ZM10,10.96429C10.3438,10.96429,10.625,11.2536,10.625,11.6071C10.625,11.9607,10.3438,12.25,10,12.25C9.65625,12.25,9.375,11.9607,9.375,11.6071C9.375,11.2536,9.65625,10.96429,10,10.96429Z"></path></svg></div>'), Rd = /* @__PURE__ */ $('<div class="item tools chart-view-toggle"></div>'), jd = /* @__PURE__ */ $('<div class="scroll-indicator right"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"></path></svg></div>'), Qd = /* @__PURE__ */ $('<div><div class="klinecharts-pro-period-bar"><div class="menu-container"><svg viewBox="0 0 1024 1024"><path d="M192.037 287.953h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 479.169H438.553c-17.673 0-32 14.327-32 32s14.327 32 32 32h393.608c17.673 0 32-14.327 32-32s-14.327-32-32-32zM832.161 735.802H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32zM319.028 351.594l-160 160 160 160z"></path></svg></div><div><div class="item tools fullscreen-toggle"></div></div></div></div>'), Zd = /* @__PURE__ */ $("<span></span>"), Vd = /* @__PURE__ */ $('<button type="button"></button>'), Hd = /* @__PURE__ */ $('<svg viewBox="0 0 20 20"><path d="M1.08108,0L0,1.079L4.18919,5.27938L2.54826,6.91715L6.9112,6.91715L6.9112,2.56262L5.28957,4.18112L1.08108,0ZM15.8108,5.27938L20,1.079L18.9189,0L14.7104,4.18112L13.0888,2.56262L13.0888,6.91715L17.4517,6.91715L15.8108,5.27938ZM4.16988,14.7014L0.07722,18.8054L1.1583,20L5.27027,15.7996L6.9112,17.4374L6.9112,13.0829L2.54826,13.0829L4.16988,14.7014ZM17.4517,13.0829L13.0888,13.0829L13.0888,17.4374L14.7297,15.7996L18.8417,20L19.9228,18.8054L15.8301,14.7013L17.4517,13.0829Z"></path></svg>'), qd = /* @__PURE__ */ $('<svg viewBox="0 0 20 20"><path d="M2.93444,1.76899L7.57544,6.40999L6.38918,7.59626L1.76899,2.93444L0,4.70343L0,0L4.70343,0L2.93444,1.76899ZM6.40999,12.4037L1.76899,17.0447L0,15.2758L0,19.9792L4.70343,19.9792L2.93444,18.2102L7.57544,13.5692L6.40999,12.4037ZM15.2758,0L17.0447,1.76899L12.4037,6.40999L13.59,7.59626L18.231,2.95526L20,4.72425L20,0L15.2758,0ZM13.5692,12.4037L12.3829,13.59L17.0239,18.231L15.2549,20L19.9792,20L19.9792,15.2758L18.2102,17.0447L13.5692,12.4037Z"></path></svg>'), Yd = /* @__PURE__ */ $('<svg viewBox="0 0 24 24"><path d="M3 20V7l4 3 5-7 5 4h4v13H3Zm5-3 4-5.5 7 5.45V9h-2.7l-3.9-3.1-4.95 6.95L5 10.4V14l3 3Z"></path></svg>'), Wd = /* @__PURE__ */ $('<svg viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M9 4H7v2H5v12h2v2h2v-2h2V6H9zM19 8h-2V4h-2v4h-2v7h2v5h2v-5h2z"></path></svg>'), br = (e) => e.charAt(0).toUpperCase() + e.slice(1), Gd = (e) => {
  let n, t, r;
  const [a, l] = T(window.innerWidth < 768), [h, u] = T(localStorage.getItem("klinechart_secondary_period") || ""), [p, k] = T(!1), [y, w] = T(!1), [A, O] = T(!1), [F, B] = T(!1), [D, R] = T(!1), [X, U] = T({
    top: 0,
    left: 0,
    minWidth: 220
  }), W = () => {
    l(window.innerWidth < 768), requestAnimationFrame(te), p() && Oe();
  }, [V, ue] = T(!1), z = () => document.fullscreenElement ?? document.body, j = () => {
    ue(!!document.fullscreenElement);
  }, [q, re] = T(!1), [ie, be] = T(!1), Oe = () => {
    if (!t)
      return;
    const N = t.getBoundingClientRect(), E = Math.max(220, Math.ceil(N.width)), Ce = window.innerWidth, Ne = Math.min(Math.max(8, N.right - E), Math.max(8, Ce - E - 8));
    U({
      top: Math.ceil(N.bottom + 8),
      left: Math.ceil(Ne),
      minWidth: E
    });
  }, de = () => {
    w(!1), O(!1), B(!1), R(!1);
  }, Ue = () => {
    k((N) => {
      const E = !N;
      return E ? queueMicrotask(Oe) : de(), E;
    });
  }, _e = (N) => {
    if (!p())
      return;
    const E = N.target;
    E && (t != null && t.contains(E) || r != null && r.contains(E) || (de(), k(!1)));
  }, ve = () => {
    p() && Oe();
  }, te = () => {
    if (!n) {
      re(!1), be(!1);
      return;
    }
    const N = n, E = N.scrollWidth > N.clientWidth + 2;
    re(E && N.scrollLeft > 2), be(E && N.scrollLeft + N.clientWidth < N.scrollWidth - 2);
  };
  Pn(() => {
    window.addEventListener("resize", W), document.addEventListener("fullscreenchange", j), document.addEventListener("mousedown", _e), window.addEventListener("scroll", ve, !0), document.addEventListener("mozfullscreenchange", j), document.addEventListener("webkitfullscreenchange", j), document.addEventListener("msfullscreenchange", j), n && (n.addEventListener("scroll", te), setTimeout(te, 100));
  }), N1(() => {
    window.removeEventListener("resize", W), document.removeEventListener("fullscreenchange", j), document.removeEventListener("mousedown", _e), window.removeEventListener("scroll", ve, !0), document.removeEventListener("mozfullscreenchange", j), document.removeEventListener("webkitfullscreenchange", j), document.removeEventListener("msfullscreenchange", j), n && n.removeEventListener("scroll", te);
  });
  const he = Z(() => {
    const N = e.periods.filter((E) => {
      if (!a() || V())
        return !0;
      const Ce = e.period.text, Ne = h();
      if (E.text === Ce || Ne && E.text === Ne)
        return !0;
      if (!Ne || Ne === Ce) {
        const se = e.periods.find((Le) => Le.text !== Ce);
        return E.text === (se == null ? void 0 : se.text);
      }
      return !1;
    }).slice(0, a() && !V() ? 2 : e.periods.length);
    return setTimeout(te, 50), N;
  });
  let H = e.period.text;
  return Ke(() => {
    const N = e.period.text;
    N !== H && (a() && (u(H), localStorage.setItem("klinechart_secondary_period", H)), H = N), setTimeout(te, 50);
  }), Ke(() => {
    V(), setTimeout(te, 100);
  }), Ke(() => {
    if (!e.showOrderToolsMenu) {
      k(!1);
      return;
    }
    p() && queueMicrotask(Oe);
  }), (() => {
    const N = Qd.cloneNode(!0), E = N.firstChild, Ce = E.firstChild, Ne = Ce.firstChild, se = Ce.nextSibling, Le = se.firstChild;
    return N.style.setProperty("position", "relative"), N.style.setProperty("width", "100%"), N.style.setProperty("display", "flex"), N.style.setProperty("align-items", "center"), v(N, L(J, {
      get when() {
        return q();
      },
      get children() {
        const _ = Td.cloneNode(!0);
        return _.$$click = () => n.scrollBy({
          left: -100,
          behavior: "smooth"
        }), _.style.setProperty("position", "absolute"), _.style.setProperty("left", "0"), _.style.setProperty("top", "0"), _.style.setProperty("bottom", "1px"), _.style.setProperty("width", "30px"), _.style.setProperty("display", "flex"), _.style.setProperty("align-items", "center"), _.style.setProperty("justify-content", "center"), _.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), _.style.setProperty("z-index", "10"), _.style.setProperty("cursor", "pointer"), _.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), _;
      }
    }), E), D1((_) => {
      n = _;
    }, E), E.style.setProperty("width", "100%"), E.style.setProperty("overflow", "auto"), i1(Ne, "click", e.onMenuClick, !0), v(E, L(J, {
      get when() {
        return e.symbol;
      },
      get children() {
        const _ = Pd.cloneNode(!0), ae = _.firstChild;
        return i1(_, "click", e.onSymbolClick, !0), v(_, L(J, {
          get when() {
            return e.symbol.logo;
          },
          get children() {
            const Me = Sd.cloneNode(!0);
            return I(() => Pe(Me, "src", e.symbol.logo)), Me;
          }
        }), ae), v(ae, () => e.symbol.shortName ?? e.symbol.name ?? e.symbol.ticker), _;
      }
    }), se), v(E, () => he().map((_, ae) => {
      const Me = _.text === e.period.text;
      return (() => {
        const s1 = Zd.cloneNode(!0);
        return s1.$$click = (fe) => {
          a() && Me && !V() ? (e.onMobilePeriodClick ? e.onMobilePeriodClick(_) : e.onMenuClick(), fe.stopPropagation()) : e.onPeriodChange(_);
        }, oe(s1, `item period ${Me ? "selected" : ""}`), v(s1, () => _.text), s1;
      })();
    }), se), v(E, L(J, {
      get when() {
        return Z(() => !!(a() && !V()))() && he().length > 1;
      },
      get children() {
        const _ = Od.cloneNode(!0);
        return _.$$click = (ae) => {
          ae.stopPropagation(), e.onMobilePeriodClick ? e.onMobilePeriodClick(e.period) : e.onMenuClick();
        }, _.style.setProperty("margin-left", "4px"), _.style.setProperty("display", "inline-flex"), _.style.setProperty("align-items", "center"), _;
      }
    }), se), v(E, L(J, {
      get when() {
        return Z(() => !!a())() && !V();
      },
      get children() {
        const _ = Dd.cloneNode(!0);
        return _.$$click = (ae) => {
          var Me;
          ae.stopPropagation(), (Me = e.onMobileMoreClick) == null || Me.call(e);
        }, _.style.setProperty("margin-left", "8px"), _.style.setProperty("display", "inline-flex"), _.style.setProperty("align-items", "center"), _.style.setProperty("cursor", "pointer"), _.style.setProperty("padding", "0 4px"), _;
      }
    }), se), v(E, L(J, {
      get when() {
        return !a();
      },
      get children() {
        const _ = Nd.cloneNode(!0);
        return i1(_, "click", e.onTimeToolsClick, !0), _;
      }
    }), se), v(E, L(J, {
      get when() {
        return !a();
      },
      get children() {
        const _ = Id.cloneNode(!0), ae = _.firstChild, Me = ae.nextSibling;
        return i1(_, "click", e.onIndicatorClick, !0), v(Me, () => c("indicator", e.locale)), _;
      }
    }), se), se.style.setProperty("display", "flex"), se.style.setProperty("gap", "4px"), se.style.setProperty("margin-left", "auto"), se.style.setProperty("align-items", "center"), se.style.setProperty("flex", "0 0 auto"), v(se, L(J, {
      get when() {
        return e.showOrderToolsMenu;
      },
      get children() {
        const _ = Fd.cloneNode(!0), ae = _.firstChild, Me = ae.firstChild, s1 = Me.nextSibling;
        return D1((fe) => {
          t = fe;
        }, _), _.style.setProperty("display", "flex"), _.style.setProperty("align-items", "center"), ae.$$click = (fe) => {
          fe.stopPropagation(), Ue();
        }, ae.style.setProperty("gap", "6px"), s1.style.setProperty("transition", "transform 0.2s ease"), v(_, L(J, {
          get when() {
            return p();
          },
          get children() {
            return L(y5, {
              get mount() {
                return z();
              },
              get children() {
                const fe = Bd.cloneNode(!0), m1 = fe.firstChild, l1 = m1.firstChild, et = l1.firstChild, Ie = et.firstChild, yt = Ie.firstChild, B1 = l1.nextSibling, $1 = B1.firstChild, b1 = $1.firstChild, t1 = b1.firstChild, pt = $1.nextSibling, Ze = pt.firstChild, tt = Ze.firstChild, nt = m1.nextSibling, g1 = nt.firstChild, _1 = g1.firstChild, rt = _1.firstChild, vt = rt.firstChild, F1 = g1.nextSibling, ot = F1.firstChild, Ct = ot.firstChild, ze = Ct.nextSibling, Re = ot.nextSibling, He = Re.firstChild, je = He.nextSibling, it = je.firstChild, U1 = it.firstChild, z1 = nt.nextSibling, $t = z1.firstChild, xe = $t.firstChild, Ee = z1.nextSibling, bt = Ee.nextSibling, qe = bt.firstChild, y1 = qe.firstChild, p1 = bt.nextSibling, _t = p1.nextSibling, k1 = _t.firstChild, kt = k1.firstChild, Ye = _t.nextSibling, x1 = Ye.firstChild, an = x1.firstChild, L1 = an.firstChild, w1 = L1.firstChild, We = x1.nextSibling, xt = We.firstChild, Lt = xt.firstChild, c1 = Lt.firstChild, K1 = xt.nextSibling, sn = K1.firstChild, wt = sn.firstChild, ln = K1.nextSibling, at = ln.firstChild, st = at.firstChild, A1 = Ye.nextSibling, cn = A1.firstChild, u1 = cn.firstChild;
                return fe.$$mousedown = (b) => b.stopPropagation(), D1((b) => {
                  r = b;
                }, fe), fe.style.setProperty("position", "fixed"), fe.style.setProperty("z-index", "9999"), l1.$$click = (b) => {
                  b.preventDefault(), b.stopPropagation(), w((S) => !S);
                }, Ie.$$mousedown = (b) => b.stopPropagation(), Ie.$$click = (b) => b.stopPropagation(), yt.addEventListener("change", (b) => {
                  var S;
                  b.stopPropagation(), w(!0), (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    quickOrder: b.currentTarget.checked
                  });
                }), t1.addEventListener("change", (b) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    quickOrderFloatingWindow: b.currentTarget.checked
                  });
                }), tt.addEventListener("change", (b) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    quickOrderPlusButton: b.currentTarget.checked
                  });
                }), g1.$$click = (b) => {
                  b.preventDefault(), b.stopPropagation(), O((S) => !S), B(!1);
                }, rt.$$mousedown = (b) => b.stopPropagation(), rt.$$click = (b) => b.stopPropagation(), vt.addEventListener("change", (b) => {
                  var S;
                  b.stopPropagation(), O(!0), (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    openOrders: b.currentTarget.checked
                  });
                }), ze.$$click = (b) => {
                  var S, Te;
                  b.preventDefault(), b.stopPropagation(), (Te = e.onOrderToolsStateChange) == null || Te.call(e, {
                    openOrdersExtendedPriceLine: !(((S = e.orderToolsState) == null ? void 0 : S.openOrdersExtendedPriceLine) ?? !0)
                  });
                }, it.$$click = (b) => {
                  b.preventDefault(), b.stopPropagation(), B((S) => !S);
                }, v(it, () => {
                  var b;
                  return br(((b = e.orderToolsState) == null ? void 0 : b.openOrdersDisplay) ?? "right");
                }, U1), v(je, L(J, {
                  get when() {
                    return F();
                  },
                  get children() {
                    const b = Ed.cloneNode(!0);
                    return v(b, () => ["left", "center", "right"].map((S) => (() => {
                      const Te = Vd.cloneNode(!0);
                      return Te.$$click = (Se) => {
                        var n1;
                        Se.preventDefault(), Se.stopPropagation(), (n1 = e.onOrderToolsStateChange) == null || n1.call(e, {
                          openOrdersDisplay: S
                        }), B(!1);
                      }, v(Te, () => br(S)), I(() => {
                        var Se;
                        return oe(Te, (((Se = e.orderToolsState) == null ? void 0 : Se.openOrdersDisplay) ?? "right") === S ? "selected" : "");
                      }), Te;
                    })())), b;
                  }
                }), null), xe.addEventListener("change", (b) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    positions: b.currentTarget.checked
                  });
                }), y1.addEventListener("change", (b) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    breakevenPrice: b.currentTarget.checked
                  });
                }), kt.addEventListener("change", (b) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    liquidationPrice: b.currentTarget.checked
                  });
                }), x1.$$click = (b) => {
                  b.preventDefault(), b.stopPropagation(), R((S) => !S);
                }, L1.$$mousedown = (b) => b.stopPropagation(), L1.$$click = (b) => b.stopPropagation(), w1.addEventListener("change", (b) => {
                  var S;
                  b.stopPropagation(), R(!0), (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    priceLine: b.currentTarget.checked
                  });
                }), c1.addEventListener("change", (b) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    marketPriceLine: b.currentTarget.checked
                  });
                }), wt.addEventListener("change", (b) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    countDown: b.currentTarget.checked
                  });
                }), st.addEventListener("change", (b) => {
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
                  var ct;
                  const S = `${X().top}px`, Te = `${X().left}px`, Se = `${X().minWidth}px`, n1 = `klinecharts-pro-order-tools-group${y() ? " klinecharts-pro-order-tools-group-open" : ""}`, M1 = `klinecharts-pro-order-tools-group${A() ? " klinecharts-pro-order-tools-group-open" : ""}`, At = `klinecharts-pro-order-tools-switch${((ct = e.orderToolsState) == null ? void 0 : ct.openOrdersExtendedPriceLine) ?? !0 ? " klinecharts-pro-order-tools-switch-on" : ""}`, Mt = `klinecharts-pro-order-tools-display-arrow${F() ? " klinecharts-pro-order-tools-display-arrow-open" : ""}`, lt = `klinecharts-pro-order-tools-group${D() ? " klinecharts-pro-order-tools-group-open" : ""}`;
                  return S !== b._v$ && fe.style.setProperty("top", b._v$ = S), Te !== b._v$2 && fe.style.setProperty("left", b._v$2 = Te), Se !== b._v$3 && fe.style.setProperty("width", b._v$3 = Se), n1 !== b._v$4 && oe(m1, b._v$4 = n1), M1 !== b._v$5 && oe(nt, b._v$5 = M1), At !== b._v$6 && oe(ze, b._v$6 = At), Mt !== b._v$7 && Pe(U1, "class", b._v$7 = Mt), lt !== b._v$8 && oe(Ye, b._v$8 = lt), b;
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
                  var b, S, Te, Se;
                  return yt.checked = (((b = e.orderToolsState) == null ? void 0 : b.quickOrderFloatingWindow) ?? ((S = e.orderToolsState) == null ? void 0 : S.quickOrder) ?? !0) || (((Te = e.orderToolsState) == null ? void 0 : Te.quickOrderPlusButton) ?? ((Se = e.orderToolsState) == null ? void 0 : Se.quickOrder) ?? !0);
                }), I(() => {
                  var b, S;
                  return t1.checked = ((b = e.orderToolsState) == null ? void 0 : b.quickOrderFloatingWindow) ?? ((S = e.orderToolsState) == null ? void 0 : S.quickOrder) ?? !0;
                }), I(() => {
                  var b, S;
                  return tt.checked = ((b = e.orderToolsState) == null ? void 0 : b.quickOrderPlusButton) ?? ((S = e.orderToolsState) == null ? void 0 : S.quickOrder) ?? !0;
                }), I(() => {
                  var b;
                  return vt.checked = ((b = e.orderToolsState) == null ? void 0 : b.openOrders) ?? !0;
                }), I(() => {
                  var b;
                  return xe.checked = ((b = e.orderToolsState) == null ? void 0 : b.positions) ?? !0;
                }), I(() => {
                  var b;
                  return y1.checked = ((b = e.orderToolsState) == null ? void 0 : b.breakevenPrice) ?? !0;
                }), I(() => {
                  var b;
                  return kt.checked = ((b = e.orderToolsState) == null ? void 0 : b.liquidationPrice) ?? !0;
                }), I(() => {
                  var b, S, Te, Se, n1, M1;
                  return w1.checked = (((b = e.orderToolsState) == null ? void 0 : b.marketPriceLine) ?? ((S = e.orderToolsState) == null ? void 0 : S.priceLine) ?? !0) || (((Te = e.orderToolsState) == null ? void 0 : Te.countDown) ?? ((Se = e.orderToolsState) == null ? void 0 : Se.priceLine) ?? !0) || (((n1 = e.orderToolsState) == null ? void 0 : n1.bidAskPrice) ?? ((M1 = e.orderToolsState) == null ? void 0 : M1.priceLine) ?? !0);
                }), I(() => {
                  var b, S;
                  return c1.checked = ((b = e.orderToolsState) == null ? void 0 : b.marketPriceLine) ?? ((S = e.orderToolsState) == null ? void 0 : S.priceLine) ?? !0;
                }), I(() => {
                  var b, S;
                  return wt.checked = ((b = e.orderToolsState) == null ? void 0 : b.countDown) ?? ((S = e.orderToolsState) == null ? void 0 : S.priceLine) ?? !0;
                }), I(() => {
                  var b, S;
                  return st.checked = ((b = e.orderToolsState) == null ? void 0 : b.bidAskPrice) ?? ((S = e.orderToolsState) == null ? void 0 : S.priceLine) ?? !0;
                }), I(() => {
                  var b;
                  return u1.checked = ((b = e.orderToolsState) == null ? void 0 : b.orderHistory) ?? !0;
                }), fe;
              }
            });
          }
        }), null), I((fe) => {
          const m1 = a() ? "0 8px" : "0 10px", l1 = p() ? "rotate(180deg)" : "rotate(0deg)";
          return m1 !== fe._v$9 && ae.style.setProperty("padding", fe._v$9 = m1), l1 !== fe._v$10 && s1.style.setProperty("transform", fe._v$10 = l1), fe;
        }, {
          _v$9: void 0,
          _v$10: void 0
        }), _;
      }
    }), Le), v(se, L(J, {
      get when() {
        return !a();
      },
      get children() {
        return [(() => {
          const _ = Ud.cloneNode(!0);
          return i1(_, "click", e.onTimezoneClick, !0), _;
        })(), (() => {
          const _ = zd.cloneNode(!0);
          return i1(_, "click", e.onSettingClick, !0), _;
        })()];
      }
    }), Le), v(se, L(J, {
      get when() {
        return !a();
      },
      get children() {
        const _ = Kd.cloneNode(!0);
        return i1(_, "click", e.onScreenshotClick, !0), _;
      }
    }), Le), Le.$$click = () => {
      if (V())
        (document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen).call(document);
      else {
        const _ = n == null ? void 0 : n.closest(".klinecharts-pro");
        _ && ((_ == null ? void 0 : _.requestFullscreen) ?? (_ == null ? void 0 : _.webkitRequestFullscreen) ?? (_ == null ? void 0 : _.mozRequestFullScreen) ?? (_ == null ? void 0 : _.msRequestFullscreen)).call(_);
      }
    }, v(Le, (() => {
      const _ = Z(() => !!V());
      return () => _() ? Hd.cloneNode(!0) : qd.cloneNode(!0);
    })()), v(se, L(J, {
      get when() {
        return Z(() => !!e.chartViewToggle)() && !V();
      },
      get children() {
        const _ = Rd.cloneNode(!0);
        return i1(_, "click", e.chartViewToggle.onToggle, !0), v(_, (() => {
          const ae = Z(() => e.chartViewToggle.view === "chart");
          return () => ae() ? Yd.cloneNode(!0) : Wd.cloneNode(!0);
        })()), I(() => Pe(_, "title", e.chartViewToggle.view === "chart" ? "View Depth" : "View Chart")), _;
      }
    }), null), v(N, L(J, {
      get when() {
        return ie();
      },
      get children() {
        const _ = jd.cloneNode(!0);
        return _.$$click = () => n.scrollBy({
          left: 100,
          behavior: "smooth"
        }), _.style.setProperty("position", "absolute"), _.style.setProperty("right", "0"), _.style.setProperty("top", "0"), _.style.setProperty("bottom", "1px"), _.style.setProperty("width", "30px"), _.style.setProperty("display", "flex"), _.style.setProperty("align-items", "center"), _.style.setProperty("justify-content", "center"), _.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), _.style.setProperty("z-index", "10"), _.style.setProperty("cursor", "pointer"), _.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), _;
      }
    }), null), I((_) => {
      const ae = e.spread ? "" : "rotate", Me = V() ? "0px" : "var(--klinecharts-pro-period-bar-padding-right)";
      return ae !== _._v$11 && Pe(Ne, "class", _._v$11 = ae), Me !== _._v$12 && se.style.setProperty("padding-right", _._v$12 = Me), _;
    }, {
      _v$11: void 0,
      _v$12: void 0
    }), N;
  })();
};
Qe(["click", "mousedown"]);
const Xd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M12.41465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L12.41465,12C12.20873,12.5826,11.65311,13,11,13C10.34689,13,9.79127,12.5826,9.58535,12L3.5,12C3.223857,12,3,11.77614,3,11.5C3,11.22386,3.223857,11,3.5,11L9.58535,11C9.79127,10.417404,10.34689,10,11,10C11.65311,10,12.20873,10.417404,12.41465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), Jd = () => Xd.cloneNode(!0), eh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,11L11.08535,11C11.29127,10.417404,11.84689,10,12.5,10C13.15311,10,13.70873,10.417404,13.91465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L13.91465,12C13.70873,12.5826,13.15311,13,12.5,13C11.84689,13,11.29127,12.5826,11.08535,12L6.91465,12C6.70873,12.5826,6.15311,13,5.5,13C4.671573,13,4,12.32843,4,11.5C4,10.671573,4.671573,10,5.5,10C6.15311,10,6.70873,10.417404,6.91465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), th = () => eh.cloneNode(!0), nh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,12.5C6.70873,13.0826,6.15311,13.5,5.5,13.5C4.671573,13.5,4,12.82843,4,12C4,11.171573,4.671573,10.5,5.5,10.5C6.15311,10.5,6.70873,10.917404,6.91465,11.5L16.0853,11.5C16.2913,10.917404,16.846899999999998,10.5,17.5,10.5C18.328400000000002,10.5,19,11.171573,19,12C19,12.82843,18.328400000000002,13.5,17.5,13.5C16.846899999999998,13.5,16.2913,13.0826,16.0853,12.5L6.91465,12.5Z" stroke-opacity="0" stroke="none"></path></svg>'), rh = () => nh.cloneNode(!0), oh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,12.41465L11,18.5C11,18.7761,11.22386,19,11.5,19C11.77614,19,12,18.7761,12,18.5L12,12.41465C12.5826,12.20873,13,11.65311,13,11C13,10.34689,12.5826,9.79127,12,9.58535L12,3.5C12,3.223857,11.77614,3,11.5,3C11.22386,3,11,3.223857,11,3.5L11,9.58535C10.417404,9.79127,10,10.34689,10,11C10,11.65311,10.417404,12.20873,11,12.41465Z" stroke-opacity="0" stroke="none"></path></svg>'), ih = () => oh.cloneNode(!0), ah = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.66558837890625,19C10.83716137890625,19,10.16558837890625,18.328400000000002,10.16558837890625,17.5C10.16558837890625,16.846899999999998,10.58298437890625,16.2913,11.16557337890625,16.0854L11.16557337890625,11.91464C10.58298437890625,11.70872,10.16558837890625,11.1531,10.16558837890625,10.5C10.16558837890625,9.8469,10.58298437890625,9.29128,11.16557337890625,9.08536L11.16557337890625,4.5C11.16557337890625,4.223857,11.38942837890625,4,11.66556837890625,4C11.94171837890625,4,12.16556837890625,4.223857,12.16556837890625,4.5L12.16556837890625,9.08535C12.74817837890625,9.291260000000001,13.16558837890625,9.846879999999999,13.16558837890625,10.5C13.16558837890625,11.153120000000001,12.74817837890625,11.708739999999999,12.16556837890625,11.91465L12.16556837890625,16.0854C12.74817837890625,16.2913,13.16558837890625,16.846899999999998,13.16558837890625,17.5C13.16558837890625,18.328400000000002,12.49401837890625,19,11.66558837890625,19Z" stroke-opacity="0" stroke="none"></path></svg>'), sh = () => ah.cloneNode(!0), lh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.165603637695312,6.91465C11.748203637695312,6.70873,12.165603637695312,6.15311,12.165603637695312,5.5C12.165603637695312,4.671573,11.494033637695313,4,10.665603637695312,4C9.837176637695313,4,9.165603637695312,4.671573,9.165603637695312,5.5C9.165603637695312,6.15311,9.583007637695312,6.70873,10.165603637695312,6.91465L10.165603637695312,16.0854C9.583007637695312,16.2913,9.165603637695312,16.846899999999998,9.165603637695312,17.5C9.165603637695312,18.328400000000002,9.837176637695313,19,10.665603637695312,19C11.494033637695313,19,12.165603637695312,18.328400000000002,12.165603637695312,17.5C12.165603637695312,16.846899999999998,11.748203637695312,16.2913,11.165603637695312,16.0854L11.165603637695312,6.91465Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), ch = () => lh.cloneNode(!0), uh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.146447,15.753C4.9511845,15.9483,4.9511845,16.2649,5.146447,16.4602C5.341709,16.6554,5.658291,16.6554,5.853554,16.4602L8.156600000000001,14.15711C8.352409999999999,14.25082,8.57173,14.3033,8.8033,14.3033C9.631730000000001,14.3033,10.3033,13.63172,10.3033,12.80329C10.3033,12.57172,10.250820000000001,12.352409999999999,10.157119999999999,12.15659L12.156600000000001,10.15711C12.352409999999999,10.250820000000001,12.571729999999999,10.30329,12.8033,10.30329C13.63173,10.30329,14.3033,9.63172,14.3033,8.80329C14.3033,8.57172,14.25082,8.352409999999999,14.15712,8.15659L16.4602,5.853553C16.6554,5.658291,16.6554,5.341709,16.4602,5.146447C16.2649,4.9511843,15.9483,4.9511843,15.753,5.146447L13.45001,7.449479999999999C13.25419,7.35577,13.03487,7.3032900000000005,12.8033,7.3032900000000005C11.97487,7.3032900000000005,11.3033,7.97487,11.3033,8.80329C11.3033,9.03487,11.35578,9.254190000000001,11.44949,9.450009999999999L9.450009999999999,11.449480000000001C9.254190000000001,11.35577,9.03487,11.30329,8.8033,11.30329C7.97487,11.30329,7.3033,11.97487,7.3033,12.80329C7.3033,13.03487,7.35578,13.25419,7.44949,13.45001L5.146447,15.753Z" stroke-opacity="0" stroke="none"></path></svg>'), dh = () => uh.cloneNode(!0), hh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M7.573332939453125,14.54567903564453C7.667042939453125,14.741499035644532,7.719512939453125,14.960809035644532,7.719512939453125,15.19239903564453C7.719512939453125,16.02079903564453,7.047942939453125,16.69239903564453,6.219512939453125,16.69239903564453C5.391085939453125,16.69239903564453,4.719512939453125,16.02079903564453,4.719512939453125,15.19239903564453C4.719512939453125,14.36394903564453,5.391085939453125,13.692379035644532,6.219512939453125,13.692379035644532C6.451092939453125,13.692379035644532,6.670412939453125,13.74485903564453,6.866232939453125,13.83856903564453L9.865702939453126,10.83909903564453C9.771992939453124,10.643279035644532,9.719512939453125,10.42395903564453,9.719512939453125,10.192379035644532C9.719512939453125,9.36394903564453,10.391082939453124,8.692379035644532,11.219512939453125,8.692379035644532C11.451092939453126,8.692379035644532,11.670412939453126,8.74485903564453,11.866232939453125,8.838569035644532L15.462112939453124,5.242645035644531C15.657412939453126,5.047383335644532,15.974012939453125,5.047383335644532,16.169212939453125,5.242645035644531C16.364512939453125,5.437907035644531,16.364512939453125,5.754489035644531,16.169212939453125,5.949752035644531L12.573332939453124,9.545679035644532C12.667042939453125,9.74149903564453,12.719512939453125,9.96080903564453,12.719512939453125,10.192379035644532C12.719512939453125,11.020809035644533,12.047942939453126,11.692379035644532,11.219512939453125,11.692379035644532C10.987942939453125,11.692379035644532,10.768632939453125,11.639909035644532,10.572812939453126,11.54619903564453L7.573332939453125,14.54567903564453Z" stroke-opacity="0" stroke="none"></path></svg>'), fh = () => hh.cloneNode(!0), mh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M15.719512939453125,8.461776733398438C16.547912939453127,8.461776733398438,17.219512939453125,7.7902067333984375,17.219512939453125,6.9617767333984375C17.219512939453125,6.133349733398438,16.547912939453127,5.4617767333984375,15.719512939453125,5.4617767333984375C14.891082939453124,5.4617767333984375,14.219512939453125,6.133349733398438,14.219512939453125,6.9617767333984375C14.219512939453125,7.193346733398437,14.271992939453124,7.412666733398438,14.365692939453124,7.608486733398438L7.366222939453126,14.607956733398437C7.170402939453125,14.514256733398437,6.951082939453125,14.461776733398438,6.719512939453125,14.461776733398438C5.891085939453125,14.461776733398438,5.219512939453125,15.133346733398437,5.219512939453125,15.961776733398438C5.219512939453125,16.79017673339844,5.891085939453125,17.461776733398438,6.719512939453125,17.461776733398438C7.547942939453125,17.461776733398438,8.219512939453125,16.79017673339844,8.219512939453125,15.961776733398438C8.219512939453125,15.730176733398437,8.167032939453126,15.510876733398437,8.073322939453124,15.315066733398437L15.072802939453124,8.315586733398437C15.268612939453124,8.409296733398438,15.487912939453125,8.461776733398438,15.719512939453125,8.461776733398438Z" stroke-opacity="0" stroke="none"></path></svg>'), gh = () => mh.cloneNode(!0), yh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17.0643,7.033864912109375L18,3.585784912109375L14.5078,4.509695912109375L15.3537,5.344934912109375L6.02026,14.560584912109375C5.87635,14.517484912109374,5.72366,14.494284912109375,5.5655,14.494284912109375C4.7009,14.494284912109375,4,15.186384912109375,4,16.040084912109375C4,16.893784912109375,4.7009,17.585784912109375,5.5655,17.585784912109375C6.43011,17.585784912109375,7.13101,16.893784912109375,7.13101,16.040084912109375C7.13101,15.722284912109375,7.03392,15.426984912109376,6.86744,15.181384912109374L16.0917,6.073604912109375L17.0643,7.033864912109375Z" stroke-opacity="0" stroke="none"></path></svg>'), ph = () => yh.cloneNode(!0), vh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,13.00505L18.5,13.00505C18.7761,13.00505,19,13.228909999999999,19,13.50505C19,13.781189999999999,18.7761,14.00505,18.5,14.00505L6.91465,14.00505C6.70873,14.58765,6.15311,15.00505,5.5,15.00505C4.671573,15.00505,4,14.33348,4,13.50505C4,12.67662,4.671573,12.00505,5.5,12.00505C6.15311,12.00505,6.70873,12.422450000000001,6.91465,13.00505ZM7.81404,11.625L10.48591,11.625L10.48591,10.90625L9.65193,10.90625L9.65193,7.125L8.997630000000001,7.125C8.71443,7.306641,8.415600000000001,7.419922,7.96443,7.498047L7.96443,8.05078L8.77497,8.05078L8.77497,10.90625L7.81404,10.90625L7.81404,11.625ZM11.081620000000001,11.625L14.0562,11.625L14.0562,10.88281L13.09724,10.88281C12.8863,10.88281,12.59333,10.90625,12.36482,10.93555C13.17537,10.11328,13.84724,9.2207,13.84724,8.39062C13.84724,7.541016,13.28865,7,12.4488,7C11.84333,7,11.446850000000001,7.234375,11.03279,7.679688L11.52497,8.16797C11.747630000000001,7.914062,12.0113,7.697266,12.33552,7.697266C12.7613,7.697266,13.00154,7.982422,13.00154,8.43359C13.00154,9.14648,12.29255,10.00781,11.081620000000001,11.11523L11.081620000000001,11.625ZM15.9605,11.75C16.8121,11.75,17.526899999999998,11.2832,17.526899999999998,10.4375C17.526899999999998,9.82031,17.142200000000003,9.43945,16.6441,9.30078L16.6441,9.27148C17.1129,9.08594,17.3824,8.7207,17.3824,8.21289C17.3824,7.421875,16.8004,7,15.9429,7C15.4215,7,14.9957,7.210938,14.6109,7.541016L15.066,8.11133C15.3258,7.849609,15.5836,7.697266,15.9019,7.697266C16.2789,7.697266,16.4957,7.914062,16.4957,8.28125C16.4957,8.70898,16.2301,9,15.4215,9L15.4215,9.63672C16.3804,9.63672,16.6383,9.91992,16.6383,10.38086C16.6383,10.79688,16.3336,11.03125,15.8824,11.03125C15.4742,11.03125,15.1578,10.82227,14.8922,10.55078L14.4781,11.13281C14.7906,11.486329999999999,15.2652,11.75,15.9605,11.75Z" stroke-opacity="0" stroke="none"></path></svg>'), Ch = () => vh.cloneNode(!0), $h = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.146447,14.178126025390625C2.9511847,13.982826025390626,2.9511847,13.666226025390625,3.146447,13.470926025390625L7.39146,9.225966025390626C7.35417,9.095106025390624,7.33421,8.956946025390625,7.33421,8.814116025390625C7.33421,7.985696025390625,8.00578,7.314116025390625,8.834209999999999,7.314116025390625C8.97703,7.314116025390625,9.11519,7.334086025390625,9.24605,7.371366025390625L13.753,2.864373025390625C13.9483,2.669110325390625,14.2649,2.669110325390625,14.4602,2.864373025390625C14.6554,3.059635025390625,14.6554,3.376217025390625,14.4602,3.571479025390625L10.06916,7.962476025390625C10.23631,8.204386025390626,10.334209999999999,8.497826025390625,10.334209999999999,8.814116025390625C10.334209999999999,9.642546025390626,9.66264,10.314116025390625,8.834209999999999,10.314116025390625C8.51791,10.314116025390625,8.22448,10.216226025390625,7.98256,10.049076025390626L3.853554,14.178126025390625C3.658291,14.373326025390625,3.341709,14.373326025390625,3.146447,14.178126025390625ZM7.67736,19.188526025390626C7.4821,18.993226025390626,7.4821,18.676626025390625,7.67736,18.481426025390626L9.9804,16.178326025390625C9.88669,15.982526025390625,9.834209999999999,15.763226025390624,9.834209999999999,15.531626025390626C9.834209999999999,14.703226025390626,10.50578,14.031626025390626,11.33421,14.031626025390626C11.56579,14.031626025390626,11.78511,14.084126025390624,11.98093,14.177826025390624L13.9804,12.178356025390626C13.8867,11.982536025390624,13.8342,11.763216025390625,13.8342,11.531636025390625C13.8342,10.703206025390624,14.5058,10.031636025390625,15.3342,10.031636025390625C15.5658,10.031636025390625,15.7851,10.084116025390625,15.9809,10.177826025390626L18.284,7.874796025390625C18.4792,7.679536025390625,18.7958,7.679536025390625,18.9911,7.874796025390625C19.1863,8.070056025390624,19.1863,8.386636025390626,18.9911,8.581906025390625L16.688000000000002,10.884936025390624C16.7817,11.080756025390626,16.8342,11.300066025390626,16.8342,11.531636025390625C16.8342,12.360066025390624,16.162599999999998,13.031626025390626,15.3342,13.031626025390626C15.1026,13.031626025390626,14.8833,12.979126025390626,14.6875,12.885426025390625L12.68803,14.884926025390625C12.78174,15.080726025390625,12.83421,15.300026025390626,12.83421,15.531626025390626C12.83421,16.360026025390624,12.16264,17.031626025390626,11.33421,17.031626025390626C11.10264,17.031626025390626,10.88333,16.979126025390627,10.68751,16.885426025390625L8.38446,19.188526025390626C8.1892,19.383726025390626,7.87262,19.383726025390626,7.67736,19.188526025390626Z" stroke-opacity="0" stroke="none"></path></svg>'), bh = () => $h.cloneNode(!0), _h = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.3367688759765626,12.63173C3.5320318759765623,12.82699,3.8486138759765627,12.82699,4.043876875976562,12.63173L11.822052875976562,4.853553C12.017312875976563,4.658291,12.017312875976563,4.341708,11.822052875976562,4.146446C11.626792875976562,3.9511843,11.310202875976563,3.9511843,11.114942875976563,4.146446L3.3367688759765626,11.92462C3.1415071759765625,12.11988,3.1415071759765625,12.43647,3.3367688759765626,12.63173ZM5.001492875976562,17.0351C4.806232875976562,16.8399,4.806232875976562,16.5233,5.001492875976562,16.328L7.304532875976562,14.025C7.210822875976563,13.82916,7.158352875976563,13.60984,7.158352875976563,13.37827C7.158352875976563,12.54984,7.829922875976562,11.87827,8.658352875976561,11.87827C8.889922875976563,11.87827,9.109232875976563,11.93075,9.305052875976562,12.02446L11.304532875976562,10.02498C11.210822875976563,9.82916,11.158352875976561,9.60984,11.158352875976561,9.37827C11.158352875976561,8.54984,11.829922875976562,7.8782700000000006,12.658352875976563,7.8782700000000006C12.889922875976563,7.8782700000000006,13.109232875976563,7.93075,13.305022875976562,8.024460000000001L15.608122875976562,5.72142C15.803322875976562,5.5261499999999995,16.119922875976563,5.5261499999999995,16.315222875976563,5.72142C16.510422875976563,5.9166799999999995,16.510422875976563,6.23326,16.315222875976563,6.42852L14.012122875976562,8.73156C14.105822875976562,8.92738,14.158322875976562,9.1467,14.158322875976562,9.37827C14.158322875976562,10.2067,13.486822875976562,10.87827,12.658352875976563,10.87827C12.426772875976562,10.87827,12.207452875976562,10.82579,12.011642875976563,10.73209L10.012162875976562,12.73156C10.105872875976562,12.92738,10.158352875976561,13.1467,10.158352875976561,13.37827C10.158352875976561,14.2067,9.486772875976563,14.8783,8.658352875976561,14.8783C8.426772875976562,14.8783,8.207452875976562,14.8258,8.011642875976563,14.7321L5.708602875976562,17.0351C5.513342875976562,17.2304,5.196752875976562,17.2304,5.001492875976562,17.0351ZM10.415712875976563,18.328C10.220452875976562,18.5233,9.903862875976563,18.5233,9.708602875976563,18.328C9.513342875976562,18.1328,9.513342875976562,17.816200000000002,9.708602875976563,17.6209L12.304532875976562,15.025C12.210822875976563,14.8292,12.158352875976563,14.6098,12.158352875976563,14.3783C12.158352875976563,13.54984,12.829922875976562,12.87827,13.658322875976562,12.87827C13.889922875976563,12.87827,14.109222875976563,12.93075,14.305022875976562,13.02446L17.486822875976564,9.84274C17.682022875976564,9.64747,17.99862287597656,9.64747,18.19392287597656,9.84274C18.38912287597656,10.038,18.38912287597656,10.35458,18.19392287597656,10.54984L15.012122875976562,13.73156C15.105822875976562,13.92738,15.158322875976562,14.1467,15.158322875976562,14.3783C15.158322875976562,15.2067,14.486822875976562,15.8783,13.658322875976562,15.8783C13.426822875976562,15.8783,13.207422875976562,15.8258,13.011642875976563,15.7321L10.415712875976563,18.328Z" stroke-opacity="0" stroke="none"></path></svg>'), kh = () => _h.cloneNode(!0), xh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M13.1889,6C12.98303,6.582599999999999,12.42741,7,11.7743,7C11.12119,7,10.565570000000001,6.582599999999999,10.35965,6L3.5,6C3.223857,6,3,5.77614,3,5.5C3,5.22386,3.223857,5,3.5,5L10.35965,5C10.565570000000001,4.417404,11.12119,4,11.7743,4C12.42741,4,12.98303,4.417404,13.1889,5L18.5,5C18.7761,5,19,5.22386,19,5.5C19,5.77614,18.7761,6,18.5,6L13.1889,6ZM3,8.5C3,8.22386,3.223857,8,3.5,8L18.5,8C18.7761,8,19,8.22386,19,8.5C19,8.77614,18.7761,9,18.5,9L3.5,9C3.223857,9,3,8.77614,3,8.5ZM3.278549,11.5C3.278549,11.22386,3.502407,11,3.778549,11L18.7785,11C19.0547,11,19.2785,11.22386,19.2785,11.5C19.2785,11.77614,19.0547,12,18.7785,12L3.778549,12C3.502407,12,3.278549,11.77614,3.278549,11.5ZM3.139267,14.5C3.139267,14.2239,3.363124,14,3.6392670000000003,14L18.6393,14C18.915399999999998,14,19.1393,14.2239,19.1393,14.5C19.1393,14.7761,18.915399999999998,15,18.6393,15L3.6392670000000003,15C3.363124,15,3.139267,14.7761,3.139267,14.5ZM13.1889,18C12.98303,18.5826,12.42741,19,11.7743,19C11.12119,19,10.565570000000001,18.5826,10.35965,18L3.778549,18C3.502407,18,3.278549,17.7761,3.278549,17.5C3.278549,17.2239,3.502407,17,3.778549,17L10.35965,17C10.565570000000001,16.4174,11.12119,16,11.7743,16C12.42741,16,12.98303,16.4174,13.1889,17L18.7785,17C19.0547,17,19.2785,17.2239,19.2785,17.5C19.2785,17.7761,19.0547,18,18.7785,18L13.1889,18Z" stroke-opacity="0" stroke="none"></path></svg>'), Lh = () => xh.cloneNode(!0), wh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4.91465,6C4.70873,6.582599999999999,4.15311,7,3.5,7C2.671573,7,2,6.32843,2,5.5C2,4.671573,2.671573,4,3.5,4C4.15311,4,4.70873,4.417404,4.91465,5L18.2257,5C18.5018,5,18.7257,5.22386,18.7257,5.5C18.7257,5.77614,18.5018,6,18.2257,6L4.91465,6ZM2.7257,8.5C2.7257,8.22386,2.949558,8,3.2257,8L18.2257,8C18.5018,8,18.7257,8.22386,18.7257,8.5C18.7257,8.77614,18.5018,9,18.2257,9L3.2257,9C2.949558,9,2.7257,8.77614,2.7257,8.5ZM3.00425,11.5C3.00425,11.22386,3.22811,11,3.50425,11L18.5042,11C18.7804,11,19.0042,11.22386,19.0042,11.5C19.0042,11.77614,18.7804,12,18.5042,12L3.50425,12C3.22811,12,3.00425,11.77614,3.00425,11.5ZM2.864967,14.5C2.864967,14.2239,3.08882,14,3.36497,14L18.365,14C18.6411,14,18.865,14.2239,18.865,14.5C18.865,14.7761,18.6411,15,18.365,15L3.36497,15C3.08882,15,2.864967,14.7761,2.864967,14.5ZM20,17.5C20,18.328400000000002,19.3284,19,18.5,19C17.846899999999998,19,17.2913,18.5826,17.0854,18L3.50425,18C3.22811,18,3.00425,17.7761,3.00425,17.5C3.00425,17.2239,3.22811,17,3.50425,17L17.0854,17C17.2913,16.4174,17.846899999999998,16,18.5,16C19.3284,16,20,16.671599999999998,20,17.5Z" stroke-opacity="0" stroke="none"></path></svg>'), Ah = () => wh.cloneNode(!0), Mh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="5" ry="5" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="3" ry="3" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse></svg>'), Th = () => Mh.cloneNode(!0), Sh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3,7.32468C5.90649,3.3893050000000002,11.49833,2.81306,14.6674,6.31944C14.9056,6.1554199999999994,15.192,6.05979,15.5,6.05979C15.845,6.05979,16.1628,6.17974,16.4162,6.381349999999999L18.4509,4.23827L19,4.816615L16.8945,7.03429C16.962600000000002,7.21075,17,7.40319,17,7.60463C17,8.45782,16.328400000000002,9.14947,15.5,9.14947C14.6716,9.14947,14,8.45782,14,7.60463C14,7.36402,14.0534,7.13625,14.1487,6.93322C11.32695,3.748365,6.25159,4.253956,3.612785,7.82695L3,7.32468ZM14.09,15.4717C15.7427,13.78985,16.244500000000002,11.524740000000001,15.5633,9.30134L15.5618,9.30134L16.3012,9.0502C17.072400000000002,11.56646,16.497700000000002,14.158,14.6282,16.0599C12.28737,18.442,8.62386,18.6988,6.41348,16.4501C4.5526,14.5572,4.52076,11.19671,6.36766,9.3177C7.89069,7.76754,10.07544,7.706189999999999,11.56741,9.22363C11.95453,9.61742,12.24817,10.08363,12.43369,10.57677L14.1451,8.77421L14.6942,9.35256L12.64982,11.50582C12.65827,11.59712,12.66295,11.68839,12.66378,11.77936C12.87398,12.04523,13,12.38451,13,12.7541C13,13.60729,12.32843,14.2989,11.5,14.2989C10.67157,14.2989,10,13.60729,10,12.7541C10,11.90091,10.67157,11.20926,11.5,11.20926C11.60387,11.20926,11.70528,11.220130000000001,11.8032,11.240829999999999L11.81763,11.22564C11.69858,10.71874,11.42858,10.21929,11.0284,9.81179C9.844000000000001,8.60765,8.136890000000001,8.65592,6.90822,9.90586C5.37975,11.460930000000001,5.40693,14.288,6.95404,15.8619C8.84598,17.7867,12.03496,17.5626,14.09,15.4717Z" stroke-opacity="0" stroke="none"></path></svg>'), Ph = () => Sh.cloneNode(!0), Oh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4,17.0854L4,3.5C4,3.223858,4.22386,3,4.5,3C4.77614,3,5,3.223858,5,3.5L5,10L7.57584,10L9.8127,4.46359C9.91614,4.20756,10.20756,4.08386,10.46359,4.1873000000000005C10.71963,4.29075,10.84333,4.58216,10.73988,4.8382000000000005L8.65438,10L11.08535,10C11.29127,9.4174,11.84689,9,12.5,9C12.65154,9,12.79784,9.02247,12.93573,9.06427L16.6464,5.35355C16.8417,5.15829,17.1583,5.15829,17.3536,5.35355C17.5488,5.54882,17.5488,5.8654,17.3536,6.06066L13.7475,9.66675C13.907,9.90508,14,10.19168,14,10.5C14,11.15311,13.5826,11.70873,13,11.91465L13,14.3638L18.3714,12.1936C18.6274,12.09015,18.918799999999997,12.21385,19.0222,12.46989C19.1257,12.72592,19.002,13.0173,18.746000000000002,13.1208L13,15.4423L13,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854ZM6.3729499999999994,17.0413L12,14.7678L12,11.91465C11.88136,11.87271,11.76956,11.81627,11.66675,11.74746L6.3729499999999994,17.0413ZM12,15.8463L6.6694700000000005,18L12,18L12,15.8463ZM6.38629,15.6137L8.250350000000001,11L11,11L6.38629,15.6137ZM5,11L7.17182,11L5,16.3754L5,11Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Dh = () => Oh.cloneNode(!0), Nh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17,4.5C17,5.32843,16.328400000000002,6,15.5,6C15.0931,6,14.7241,5.83802,14.4539,5.57503L5.98992,8.32515C5.99658,8.38251,6,8.440850000000001,6,8.5C6,9.15311,5.582599999999999,9.70873,5,9.91465L5,11.08535C5.42621,11.236,5.763999999999999,11.57379,5.91465,12L19.5,12C19.7761,12,20,12.22386,20,12.5C20,12.77614,19.7761,13,19.5,13L5.91465,13C5.70873,13.5826,5.15311,14,4.5,14C3.671573,14,3,13.3284,3,12.5C3,11.84689,3.417404,11.29127,4,11.08535L4,9.91465C3.417404,9.70873,3,9.15311,3,8.5C3,7.67157,3.671573,7,4.5,7C4.90411,7,5.2709,7.15981,5.5406200000000005,7.41967L14.0093,4.66802C14.0032,4.6128599999999995,14,4.5568,14,4.5C14,3.671573,14.6716,3,15.5,3C16.328400000000002,3,17,3.671573,17,4.5ZM4,15.5C4,15.2239,4.22386,15,4.5,15L19.5,15C19.7761,15,20,15.2239,20,15.5C20,15.7761,19.7761,16,19.5,16L4.5,16C4.22386,16,4,15.7761,4,15.5ZM4,18.5C4,18.2239,4.22386,18,4.5,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L4.5,19C4.22386,19,4,18.7761,4,18.5Z" stroke-opacity="0" stroke="none"></path></svg>'), Ih = () => Nh.cloneNode(!0), Eh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M20,3.5C20,4.15311,19.5826,4.70873,19,4.91465L19,18.5C19,18.7761,18.7761,19,18.5,19L4.91465,19C4.70873,19.5826,4.15311,20,3.5,20C2.671573,20,2,19.3284,2,18.5C2,17.846899999999998,2.417404,17.2913,3,17.0854L3,3.5C3,3.22386,3.22386,3,3.5,3L17.0854,3C17.2913,2.417404,17.846899999999998,2,18.5,2C19.3284,2,20,2.671573,20,3.5ZM17.0854,4C17.236,4.42621,17.5738,4.763999999999999,18,4.91465L18,8L14,8L14,4L17.0854,4ZM13,4L13,8L9,8L9,4L13,4ZM13,9L9,9L9,13L13,13L13,9ZM13,14L9,14L9,18L13,18L13,14ZM14,18L14,14L18,14L18,18L14,18ZM18,13L14,13L14,9L18,9L18,13ZM4.91465,18C4.763999999999999,17.5738,4.42621,17.236,4,17.0854L4,14L8,14L8,18L4.91465,18ZM4,8L4,4L8,4L8,8L4,8ZM8,9L8,13L4,13L4,9L8,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Bh = () => Eh.cloneNode(!0), Fh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" fill="none" stroke-opacity="1" stroke-width="1"></ellipse></svg>'), Uh = () => Fh.cloneNode(!0), zh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.57625,6.9981C11.55099,6.999359999999999,11.52557,7,11.5,7C11.34,7,11.18584,6.97495,11.04125,6.9285499999999995L5.55401,16.4327C5.713760000000001,16.5905,5.83826,16.7839,5.91465,17L16.0854,17C16.2187,16.622700000000002,16.4987,16.314700000000002,16.8569,16.1445L11.57625,6.9981ZM12.50759,6.611219999999999C12.81005,6.336790000000001,13,5.94058,13,5.5C13,4.671573,12.32843,4,11.5,4C10.67157,4,10,4.671573,10,5.5C10,5.80059,10.08841,6.08052,10.24066,6.31522L4.64514,16.0069C4.59738,16.002299999999998,4.54896,16,4.5,16C3.671573,16,3,16.671599999999998,3,17.5C3,18.328400000000002,3.671573,19,4.5,19C5.15311,19,5.70873,18.5826,5.91465,18L16.0854,18C16.2913,18.5826,16.846899999999998,19,17.5,19C18.328400000000002,19,19,18.328400000000002,19,17.5C19,16.8365,18.5691,16.2735,17.971899999999998,16.075699999999998L12.50759,6.611219999999999Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Kh = () => zh.cloneNode(!0), Rh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19,4.5C19,5.15311,18.5826,5.70873,18,5.91465L18,18.5C18,18.7761,17.7761,19,17.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854L4,4.5C4,4.22386,4.22386,4,4.5,4L16.0854,4C16.2913,3.417404,16.846899999999998,3,17.5,3C18.328400000000002,3,19,3.671573,19,4.5ZM5,5L16.0854,5C16.236,5.42621,16.5738,5.763999999999999,17,5.91465L17,18L5.91465,18C5.763999999999999,17.5738,5.42621,17.236,5,17.0854L5,5Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), jh = () => Rh.cloneNode(!0), Qh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19.6401,7.99355C20.4028,7.92291,21,7.2811900000000005,21,6.5C21,5.671573,20.3284,5,19.5,5C18.8469,5,18.2913,5.417404,18.0854,6L7.62067,6C7.34453,6,7.12067,6.22386,7.12067,6.5C7.12067,6.5479,7.12741,6.59423,7.13999,6.63809L3.2294099999999997,15.0243C2.530138,15.1517,2,15.764,2,16.5C2,17.328400000000002,2.671573,18,3.5,18C4.15311,18,4.70873,17.5826,4.91465,17L14.5963,17C14.6456,17.076,14.7162,17.1396,14.8044,17.1807C15.0546,17.2974,15.3521,17.1891,15.4688,16.9388L19.6401,7.99355ZM14.7896,16.0293L18.6551,7.739599999999999C18.3942,7.56144,18.1925,7.30307,18.0854,7L8.0746,7L4.25044,15.2009C4.55701,15.3784,4.79493,15.6613,4.91465,16L14.6207,16C14.68,16,14.7368,16.0103,14.7896,16.0293Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Zh = () => Qh.cloneNode(!0), Vh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.134443814697265,7.494615087890625L8.764323814697265,7.494615087890625L8.764323814697265,3.414215087890625L8.310223814697267,3.414215087890625L7.294603814697266,4.005035087890625L7.289713814697266,4.634915087890625L8.134443814697265,4.149892087890625L8.134443814697265,7.494615087890625ZM18.832003814697266,6.933095087890624Q19.004603814697266,6.635245087890625,19.004603814697266,6.2543850878906255Q19.004603814697266,5.884915087890625,18.845103814697264,5.593575087890625Q18.685503814697267,5.3006050878906255,18.399103814697266,5.136225087890625Q18.114303814697266,4.9702050878906245,17.754603814697266,4.9653250878906245L18.820603814697265,3.840647087890625L18.820603814697265,3.414215087890625L16.519203814697264,3.414215087890625L16.519203814697264,3.939931087890625L18.050803814697264,3.939931087890625L16.719403814697266,5.334785087890625L17.074203814697263,5.7205350878906245Q17.254903814697265,5.484525087890625,17.619503814697268,5.484525087890625Q17.980803814697268,5.484525087890625,18.187503814697266,5.689605087890625Q18.394203814697267,5.894685087890625,18.394203814697267,6.2543850878906255Q18.394203814697267,6.604315087890625,18.187503814697266,6.822415087890625Q17.980803814697268,7.0405150878906255,17.640603814697265,7.0405150878906255Q17.334603814697267,7.0405150878906255,17.124703814697266,6.890775087890625Q16.914703814697265,6.739415087890626,16.820303814697265,6.469225087890624L16.354803814697263,6.744295087890626Q16.480103814697266,7.125155087890625,16.821903814697265,7.341625087890625Q17.165403814697264,7.559725087890625,17.640603814697265,7.559725087890625Q18.039403814697266,7.559725087890625,18.348603814697267,7.393705087890625Q18.659503814697267,7.229315087890625,18.832003814697266,6.933095087890624ZM10.000003814697266,10.634915087890626C10.000003814697266,11.024655087890626,9.851363814697265,11.379685087890625,9.607683814697266,11.646395087890625L12.168903814697266,15.171615087890626C12.275403814697265,15.147615087890625,12.386203814697266,15.134915087890626,12.500003814697266,15.134915087890626C12.596503814697266,15.134915087890626,12.690803814697265,15.144015087890624,12.782303814697265,15.161415087890624L16.108803814697268,11.196955087890625C16.038703814697264,11.023375087890624,16.000003814697266,10.833655087890625,16.000003814697266,10.634915087890626C16.000003814697266,9.806495087890625,16.671603814697264,9.134915087890626,17.500003814697266,9.134915087890626C18.328403814697264,9.134915087890626,19.000003814697266,9.806495087890625,19.000003814697266,10.634915087890626C19.000003814697266,11.463345087890625,18.328403814697264,12.134915087890626,17.500003814697266,12.134915087890626C17.239503814697265,12.134915087890626,16.994503814697268,12.068495087890625,16.781003814697264,11.951675087890624L13.654703814697266,15.677415087890624C13.870303814697266,15.937215087890625,14.000003814697266,16.270915087890625,14.000003814697266,16.634915087890626C14.000003814697266,17.463315087890624,13.328403814697266,18.134915087890626,12.500003814697266,18.134915087890626C11.671573814697265,18.134915087890626,11.000003814697266,17.463315087890624,11.000003814697266,16.634915087890626C11.000003814697266,16.284415087890626,11.120193814697265,15.962015087890626,11.321603814697266,15.706715087890625L8.715393814697265,12.119565087890624C8.645053814697267,12.129685087890625,8.573143814697266,12.134915087890626,8.500003814697266,12.134915087890626C8.162103814697264,12.134915087890626,7.8503038146972655,12.023195087890626,7.599523814697266,11.834665087890626L4.505583814697266,15.521915087890624C4.809213814697266,15.796415087890624,5.000003814697266,16.193415087890624,5.000003814697266,16.634915087890626C5.000003814697266,17.463315087890624,4.328433814697266,18.134915087890626,3.5000038146972656,18.134915087890626C2.6715768146972656,18.134915087890626,2.0000038146972656,17.463315087890624,2.0000038146972656,16.634915087890626C2.0000038146972656,15.806515087890626,2.6715768146972656,15.134915087890626,3.5000038146972656,15.134915087890626C3.508253814697266,15.134915087890626,3.5164838146972657,15.135015087890626,3.524703814697266,15.135115087890625L7.033823814697266,10.953115087890625C7.011673814697265,10.850565087890626,7.000003814697266,10.744105087890624,7.000003814697266,10.634915087890626C7.000003814697266,9.806495087890625,7.671573814697266,9.134915087890626,8.500003814697266,9.134915087890626C9.328433814697267,9.134915087890626,10.000003814697266,9.806495087890625,10.000003814697266,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Hh = () => Vh.cloneNode(!0), qh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.13444,7.494615087890625L8.76432,7.494615087890625L8.76432,3.414215087890625L8.310220000000001,3.414215087890625L7.2946,4.005035087890625L7.28971,4.634915087890625L8.13444,4.149892087890625L8.13444,7.494615087890625ZM18.832,6.929835087890625Q19.0046,6.635245087890625,19.0046,6.2543850878906255Q19.0046,5.889805087890625,18.8451,5.5952050878906245Q18.6855,5.3006050878906255,18.3975,5.132965087890625Q18.1094,4.9653250878906245,17.7399,4.9653250878906245Q17.435499999999998,4.9653250878906245,17.1556,5.149245087890625L17.2793,3.939931087890625L18.8304,3.939931087890625L18.8304,3.414215087890625L16.7406,3.414215087890625L16.5094,5.665195087890625L17.0156,5.795405087890625Q17.095399999999998,5.655425087890626,17.2516,5.570795087890625Q17.4095,5.484525087890625,17.6357,5.484525087890625Q17.9694,5.484525087890625,18.1842,5.697745087890625Q18.4007,5.909335087890625,18.4007,6.2543850878906255Q18.4007,6.604315087890625,18.1842,6.822415087890625Q17.9694,7.0405150878906255,17.6292,7.0405150878906255Q17.3298,7.0405150878906255,17.119799999999998,6.890775087890625Q16.9098,6.739415087890626,16.825200000000002,6.474115087890625L16.3597,6.749175087890626Q16.470399999999998,7.110505087890624,16.807299999999998,7.335115087890625Q17.144199999999998,7.559725087890625,17.6292,7.559725087890625Q18.0296,7.559725087890625,18.3438,7.392075087890625Q18.6595,7.224435087890625,18.832,6.929835087890625ZM10,10.634915087890626C10,11.024655087890626,9.85136,11.379685087890625,9.60768,11.646395087890625L12.1689,15.171615087890626C12.2754,15.147615087890625,12.3862,15.134915087890626,12.5,15.134915087890626C12.5965,15.134915087890626,12.6908,15.144015087890624,12.7823,15.161415087890624L16.108800000000002,11.196955087890625C16.0387,11.023375087890624,16,10.833655087890625,16,10.634915087890626C16,9.806495087890625,16.671599999999998,9.134915087890626,17.5,9.134915087890626C18.3284,9.134915087890626,19,9.806495087890625,19,10.634915087890626C19,11.463345087890625,18.3284,12.134915087890626,17.5,12.134915087890626C17.2395,12.134915087890626,16.994500000000002,12.068505087890625,16.781,11.951675087890624L13.6547,15.677415087890624C13.8703,15.937215087890625,14,16.270915087890625,14,16.634915087890626C14,17.463315087890624,13.3284,18.134915087890626,12.5,18.134915087890626C11.67157,18.134915087890626,11,17.463315087890624,11,16.634915087890626C11,16.284415087890626,11.12019,15.962015087890626,11.3216,15.706715087890625L8.71539,12.119565087890624C8.645050000000001,12.129685087890625,8.57314,12.134915087890626,8.5,12.134915087890626C8.162099999999999,12.134915087890626,7.8503,12.023195087890626,7.59952,11.834665087890626L4.50558,15.521915087890624C4.80921,15.796415087890624,5,16.193415087890624,5,16.634915087890626C5,17.463315087890624,4.32843,18.134915087890626,3.5,18.134915087890626C2.671573,18.134915087890626,2,17.463315087890624,2,16.634915087890626C2,15.806515087890626,2.671573,15.134915087890626,3.5,15.134915087890626C3.5082500000000003,15.134915087890626,3.51648,15.135015087890626,3.5247,15.135115087890625L7.03382,10.953115087890625C7.01167,10.850565087890626,7,10.744105087890624,7,10.634915087890626C7,9.806495087890625,7.67157,9.134915087890626,8.5,9.134915087890626C9.32843,9.134915087890626,10,9.806495087890625,10,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Yh = () => qh.cloneNode(!0), Wh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M18.8532,7.020985087890625Q19.0257,6.734525087890625,19.0257,6.369945087890625Q19.0257,6.020005087890625,18.8499,5.754705087890625Q18.6758,5.489415087890626,18.3649,5.339675087890625Q18.5944,5.209465087890625,18.7214,4.994615087890625Q18.8499,4.779775087890625,18.8499,4.5193550878906255Q18.8499,4.2003480878906245,18.7002,3.951324087890625Q18.5505,3.700673087890625,18.277,3.557444087890625Q18.0052,3.414215087890625,17.6455,3.414215087890625Q17.285800000000002,3.414215087890625,17.0107,3.557444087890625Q16.7357,3.700673087890625,16.5843,3.951324087890625Q16.4346,4.2003480878906245,16.4346,4.5193550878906255Q16.4346,4.779775087890625,16.561500000000002,4.994615087890625Q16.6901,5.209465087890625,16.919600000000003,5.339675087890625Q16.6055,5.489415087890626,16.4297,5.757965087890625Q16.255499999999998,6.024895087890625,16.255499999999998,6.369945087890625Q16.255499999999998,6.734525087890625,16.4297,7.020985087890625Q16.6055,7.305815087890625,16.919600000000003,7.465325087890625Q17.2354,7.624825087890625,17.6455,7.624825087890625Q18.0557,7.624825087890625,18.3682,7.465325087890625Q18.6807,7.305815087890625,18.8532,7.020985087890625ZM8.76432,7.559725087890625L8.13444,7.559725087890625L8.13444,4.214996087890625L7.28971,4.700025087890625L7.2946,4.070139087890625L8.310220000000001,3.479319087890625L8.76432,3.479319087890625L8.76432,7.559725087890625ZM17.1816,4.955555087890625Q17.0042,4.784655087890625,17.0042,4.5095950878906255Q17.0042,4.229645087890625,17.18,4.057119087890625Q17.355800000000002,3.884592087890625,17.6455,3.884592087890625Q17.935200000000002,3.884592087890625,18.1077,4.057119087890625Q18.2803,4.229645087890625,18.2803,4.5095950878906255Q18.2803,4.784655087890625,18.1045,4.955555087890625Q17.930300000000003,5.124825087890625,17.6455,5.124825087890625Q17.3607,5.124825087890625,17.1816,4.955555087890625ZM18.2217,5.7953950878906255Q18.4398,6.005365087890625,18.4398,6.3552950878906245Q18.4398,6.705235087890625,18.2217,6.915195087890625Q18.0052,7.125155087890625,17.6455,7.125155087890625Q17.285800000000002,7.125155087890625,17.067700000000002,6.915195087890625Q16.849600000000002,6.705235087890625,16.849600000000002,6.3552950878906245Q16.849600000000002,6.005365087890625,17.064500000000002,5.7953950878906255Q17.2793,5.585435087890625,17.6455,5.585435087890625Q18.0052,5.585435087890625,18.2217,5.7953950878906255ZM9.60768,11.711495087890626C9.85136,11.444785087890626,10,11.089765087890626,10,10.700025087890625C10,9.871595087890626,9.32843,9.200025087890625,8.5,9.200025087890625C7.67157,9.200025087890625,7,9.871595087890626,7,10.700025087890625C7,10.809205087890625,7.01167,10.915665087890625,7.03382,11.018215087890624L3.5247,15.200215087890625C3.51648,15.200115087890625,3.5082500000000003,15.200015087890625,3.5,15.200015087890625C2.671573,15.200015087890625,2,15.871615087890625,2,16.700015087890627C2,17.528415087890625,2.671573,18.200015087890627,3.5,18.200015087890627C4.32843,18.200015087890627,5,17.528415087890625,5,16.700015087890627C5,16.258515087890625,4.80921,15.861515087890625,4.50558,15.587015087890626L7.59952,11.899765087890625C7.8503,12.088295087890625,8.162099999999999,12.200025087890625,8.5,12.200025087890625C8.57314,12.200025087890625,8.645050000000001,12.194785087890626,8.71539,12.184675087890625L11.3216,15.771815087890625C11.12019,16.027215087890625,11,16.349515087890623,11,16.700015087890627C11,17.528415087890625,11.67157,18.200015087890627,12.5,18.200015087890627C13.3284,18.200015087890627,14,17.528415087890625,14,16.700015087890627C14,16.336015087890623,13.8703,16.002315087890626,13.6547,15.742515087890625L16.781,12.016775087890625C16.994500000000002,12.133605087890626,17.2395,12.200025087890625,17.5,12.200025087890625C18.3284,12.200025087890625,19,11.528445087890624,19,10.700025087890625C19,9.871595087890626,18.3284,9.200025087890625,17.5,9.200025087890625C16.671599999999998,9.200025087890625,16,9.871595087890626,16,10.700025087890625C16,10.898765087890624,16.0387,11.088475087890625,16.108800000000002,11.262055087890625L12.7823,15.226515087890625C12.6908,15.209115087890625,12.5965,15.200015087890625,12.5,15.200015087890625C12.3862,15.200015087890625,12.2754,15.212715087890626,12.1689,15.236715087890625L9.60768,11.711495087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Gh = () => Wh.cloneNode(!0), Xh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M9.474616630859375,7.494615087890625L8.844736630859375,7.494615087890625L8.844736630859375,4.149892087890625L8.000006630859374,4.634915087890625L8.004896630859374,4.005035087890625L9.020516630859376,3.414215087890625L9.474616630859375,3.414215087890625L9.474616630859375,7.494615087890625ZM18.529296630859378,4.8318550878906255Q18.307996630859375,5.028795087890625,18.122396630859377,5.385245087890625Q17.868496630859376,5.019035087890625,17.629196630859376,4.8269750878906255Q17.389996630859375,4.634915087890625,17.168596630859376,4.634915087890625Q16.794296630859375,4.634915087890625,16.522496630859376,4.976715087890625Q16.252296630859377,5.3168850878906255,16.252296630859377,5.7856350878906255Q16.252296630859377,6.218575087890625,16.502896630859375,6.521315087890625Q16.755196630859373,6.822415087890625,17.114896630859377,6.822415087890625Q17.368796630859375,6.822415087890625,17.588596630859374,6.625475087890624Q17.809896630859377,6.428535087890625,17.998696630859374,6.0688350878906245Q18.249396630859373,6.439935087890625,18.488596630859377,6.631985087890625Q18.727896630859377,6.822415087890625,18.952496630859375,6.822415087890625Q19.326796630859373,6.822415087890625,19.596996630859376,6.482245087890625Q19.868796630859375,6.140455087890626,19.868796630859375,5.671705087890626Q19.868796630859375,5.238755087890625,19.618196630859376,4.937655087890625Q19.367496630859375,4.634915087890625,19.006196630859375,4.634915087890625Q18.750696630859377,4.634915087890625,18.529296630859378,4.8318550878906255ZM18.337296630859377,5.674955087890625L18.278696630859375,5.596835087890625Q18.449596630859375,5.272935087890625,18.622096630859374,5.1101750878906245Q18.794596630859374,4.947415087890625,18.967096630859373,4.947415087890625Q19.194996630859375,4.947415087890625,19.346396630859374,5.1345950878906255Q19.497696630859377,5.320135087890625,19.497696630859377,5.598455087890625Q19.497696630859377,5.8914250878906245,19.360996630859376,6.096505087890625Q19.224296630859374,6.301585087890626,19.027396630859375,6.301585087890626Q18.915096630859374,6.301585087890626,18.742496630859375,6.146965087890624Q18.569996630859375,5.992335087890625,18.337296630859377,5.674955087890625ZM17.785496630859377,5.779125087890625L17.842496630859372,5.857245087890625Q17.668296630859373,6.186025087890625,17.495796630859374,6.348785087890625Q17.324896630859374,6.509915087890625,17.153996630859375,6.509915087890625Q16.926096630859377,6.509915087890625,16.774796630859377,6.324375087890624Q16.623396630859375,6.137195087890625,16.623396630859375,5.858875087890625Q16.623396630859375,5.565905087890625,16.761696630859376,5.360825087890625Q16.900096630859373,5.1557550878906255,17.095396630859376,5.1557550878906255Q17.228896630859374,5.1557550878906255,17.365596630859375,5.2778250878906245Q17.502296630859377,5.399895087890625,17.785496630859377,5.779125087890625ZM10.710296630859375,10.634915087890626C10.710296630859375,11.024655087890626,10.561656630859375,11.379685087890625,10.317976630859375,11.646395087890625L12.879196630859376,15.171615087890626C12.985696630859374,15.147615087890625,13.096496630859376,15.134915087890626,13.210296630859375,15.134915087890626C13.306796630859376,15.134915087890626,13.401096630859374,15.144015087890624,13.492596630859374,15.161415087890624L16.819096630859377,11.196955087890625C16.748996630859374,11.023375087890624,16.710296630859375,10.833655087890625,16.710296630859375,10.634915087890626C16.710296630859375,9.806495087890625,17.381896630859373,9.134915087890626,18.210296630859375,9.134915087890626C19.038696630859373,9.134915087890626,19.710296630859375,9.806495087890625,19.710296630859375,10.634915087890626C19.710296630859375,11.463345087890625,19.038696630859373,12.134915087890626,18.210296630859375,12.134915087890626C17.949796630859375,12.134915087890626,17.704796630859377,12.068505087890625,17.491296630859374,11.951675087890624L14.364996630859375,15.677415087890624C14.580596630859375,15.937215087890625,14.710296630859375,16.270915087890625,14.710296630859375,16.634915087890626C14.710296630859375,17.463315087890624,14.038696630859375,18.134915087890626,13.210296630859375,18.134915087890626C12.381866630859374,18.134915087890626,11.710296630859375,17.463315087890624,11.710296630859375,16.634915087890626C11.710296630859375,16.284415087890626,11.830486630859374,15.962015087890626,12.031896630859375,15.706715087890625L9.425686630859374,12.119565087890624C9.355346630859376,12.129685087890625,9.283436630859375,12.134915087890626,9.210296630859375,12.134915087890626C8.872396630859374,12.134915087890626,8.560596630859376,12.023195087890626,8.309816630859375,11.834665087890626L5.215876630859375,15.521915087890624C5.519506630859375,15.796415087890624,5.710296630859375,16.193415087890624,5.710296630859375,16.634915087890626C5.710296630859375,17.463315087890624,5.038726630859375,18.134915087890626,4.210296630859375,18.134915087890626C3.381869630859375,18.134915087890626,2.710296630859375,17.463315087890624,2.710296630859375,16.634915087890626C2.710296630859375,15.806515087890626,3.381869630859375,15.134915087890626,4.210296630859375,15.134915087890626C4.218546630859375,15.134915087890626,4.226776630859375,15.135015087890626,4.234996630859375,15.135115087890625L7.744116630859375,10.953115087890625C7.721966630859375,10.850565087890626,7.710296630859375,10.744105087890624,7.710296630859375,10.634915087890626C7.710296630859375,9.806495087890625,8.381866630859374,9.134915087890626,9.210296630859375,9.134915087890626C10.038726630859376,9.134915087890626,10.710296630859375,9.806495087890625,10.710296630859375,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Jh = () => Xh.cloneNode(!0), ef = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M21,5.5C21,6.32843,20.3284,7,19.5,7C19.4136,7,19.3289,6.99269,19.2465,6.97866L15.6257,15.5086C15.8587,15.7729,16,16.119999999999997,16,16.5C16,17.328400000000002,15.3284,18,14.5,18C13.8469,18,13.2913,17.5826,13.0854,17L3.91465,17C3.70873,17.5826,3.15311,18,2.5,18C1.671573,18,1,17.328400000000002,1,16.5C1,15.6716,1.671573,15,2.5,15C2.5840199999999998,15,2.66643,15.0069,2.74668,15.0202L6.36934,6.48574C6.13933,6.22213,6,5.87733,6,5.5C6,4.671573,6.67157,4,7.5,4C8.15311,4,8.70873,4.417404,8.91465,5L18.0854,5C18.2913,4.417404,18.8469,4,19.5,4C20.3284,4,21,4.671573,21,5.5ZM18.0854,6L8.91465,6C8.892579999999999,6.06243,8.8665,6.12296,8.83672,6.18128L13.9814,15.0921C14.143,15.0325,14.3177,15,14.5,15C14.584,15,14.6664,15.0069,14.7467,15.0202L18.3693,6.48574C18.2462,6.3446,18.149,6.1802,18.0854,6ZM13.2036,15.745L8.0861,6.8811800000000005C7.90605,6.95768,7.70797,7,7.5,7C7.41359,7,7.32888,6.99269,7.24647,6.97866L3.62571,15.5086C3.7512,15.651,3.8501,15.8174,3.91465,16L13.0854,16C13.1169,15.9108,13.1566,15.8255,13.2036,15.745Z" stroke-opacity="0" stroke="none"></path></svg>'), tf = () => ef.cloneNode(!0), nf = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.92159,5.93994C6.04014,5.90529,6.152620000000001,5.85639,6.25704,5.79523L9.12729,9.89437C9.045449999999999,10.07959,9,10.28449,9,10.5C9,10.79522,9.08529,11.07053,9.232569999999999,11.30262L4.97573,16.7511L5.92159,5.93994ZM4.92259,5.8848400000000005C4.38078,5.658659999999999,4,5.1238,4,4.5C4,3.671573,4.67157,3,5.5,3C6.2157,3,6.81433,3.50124,6.96399,4.17183L15.1309,4.88634C15.3654,4.36387,15.8902,4,16.5,4C17.328400000000002,4,18,4.67157,18,5.5C18,6.08983,17.659599999999998,6.60015,17.1645,6.84518L18.4264,14.0018C18.4508,14.0006,18.4753,14,18.5,14C19.3284,14,20,14.6716,20,15.5C20,16.328400000000002,19.3284,17,18.5,17C17.932499999999997,17,17.4386,16.6849,17.183799999999998,16.22L5.99686,18.5979C5.946429999999999,19.3807,5.29554,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.869300000000003,3.389292,17.3295,3.94071,17.1077L4.92259,5.8848400000000005ZM5.72452,17.6334C5.69799,17.596,5.6698,17.5599,5.64004,17.525100000000002L10.01843,11.92103C10.16958,11.97223,10.33155,12,10.5,12C10.80059,12,11.08052,11.91158,11.31522,11.75934L17.0606,15.0765C17.0457,15.1271,17.0335,15.1789,17.023899999999998,15.2317L5.72452,17.6334ZM11.92855,10.95875L17.4349,14.1379L16.1699,6.96356C15.9874,6.92257,15.8174,6.8483,15.6667,6.74746L11.99771,10.4165C11.99923,10.44414,12,10.47198,12,10.5C12,10.66,11.97495,10.814160000000001,11.92855,10.95875ZM10.5,9C10.259830000000001,9,10.03285,9.05644,9.83159,9.15679L7.04919,5.1831L15.0493,5.88302C15.054,5.90072,15.059,5.91829,15.0643,5.9357299999999995L11.56066,9.43934C11.28921,9.16789,10.91421,9,10.5,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), rf = () => nf.cloneNode(!0), of = /* @__PURE__ */ $('<svg viewBox="0 0 22 22"><path d="M4.727219638671875,8.007996215820313L9.973849638671876,2.7629472158203123C10.167279638671875,2.5696791158203123,10.480729638671875,2.5696791158203123,10.674169638671875,2.7629472158203123L13.223329638671874,5.311756215820313C13.416929638671874,5.505236215820313,13.416929638671874,5.8189862158203125,13.223329638671874,6.012466215820313L7.977129638671875,11.257906215820313C7.379859638671875,11.855176215820313,7.407609638671875,12.909396215820312,8.033809638671876,13.535596215820313C8.660409638671876,14.162596215820313,9.713849638671874,14.189996215820312,10.311129638671876,13.591896215820313L15.556929638671875,8.346066215820311C15.750429638671875,8.152526215820313,16.064229638671875,8.152526215820313,16.257629638671872,8.346066215820311L18.806529638671876,10.895266215820312C19.000029638671876,11.088746215820313,19.000029638671876,11.402496215820312,18.806529638671876,11.595976215820313L13.560629638671875,16.841796215820313C11.165619638671876,19.237196215820312,7.197149638671875,19.19919621582031,4.783499638671875,16.785496215820313C2.3698426386718747,14.371896215820312,2.331397638671875,10.403416215820313,4.727219638671875,8.007996215820313ZM12.172299638671875,5.662106215820312L10.323809638671875,3.8136162158203124L5.4287196386718755,8.709096215820313C3.422893638671875,10.714536215820312,3.4549956386718748,14.055196215820313,5.484999638671875,16.08479621582031C7.514609638671875,18.114796215820313,10.855289638671875,18.146496215820314,12.860719638671876,16.141096215820312L15.465629638671874,13.535796215820312L14.090929638671875,12.160756215820312L14.791629638671875,11.460436215820312L16.166229638671876,12.834996215820313L17.755829638671877,11.245226215820313L15.907729638671874,9.396736215820312L11.011839638671875,14.292596215820312C10.042809638671875,15.262396215820312,8.418249638671874,15.243796215820312,7.406019638671875,14.306496215820312L7.333099638671875,14.236296215820312C6.327599638671876,13.230796215820313,6.284009638671876,11.550396215820312,7.276419638671875,10.557586215820312L9.882199638671874,7.952026215820313L8.501079638671875,6.570906215820313L9.201789638671876,5.870186215820313L10.582939638671874,7.251336215820312L12.172299638671875,5.662106215820312Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), af = (e) => (() => {
  const n = of.cloneNode(!0);
  return Pe(n, "class", `icon-overlay ${e ?? ""}`), n;
})(), sf = /* @__PURE__ */ $('<svg viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_615"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_615)"><path d="M19.672,3.0673368C19.4417,2.9354008,19.1463,3.00292252,18.9994,3.2210900000000002L17.4588,5.50622L16.743299999999998,3.781253L13.9915,7.4662L13.9618,7.51108C13.8339,7.72862,13.8936,8.005659999999999,14.1004,8.15391L14.1462,8.183430000000001C14.3683,8.308720000000001,14.6511,8.25001,14.8022,8.047229999999999L16.4907,5.78571L17.246299999999998,7.60713L19.8374,3.7635389999999997L19.8651,3.717088C19.9871,3.484615,19.9023,3.199273,19.672,3.0673368ZM4.79974,8.462530000000001L10.117740000000001,3.252975C10.31381,3.0610145,10.63152,3.0610145,10.82759,3.252975L13.4115,5.78453C13.6076,5.976710000000001,13.6076,6.28833,13.4115,6.4805L8.093869999999999,11.69045C7.48847,12.28368,7.51659,13.3308,8.151309999999999,13.9528C8.786439999999999,14.5755,9.85421,14.6027,10.45961,14.0087L15.7768,8.79831C15.9729,8.60609,16.2909,8.60609,16.487099999999998,8.79831L19.0705,11.33026C19.2667,11.52244,19.2667,11.83406,19.0705,12.02623L13.7533,17.2366C11.32572,19.6158,7.30328,19.578,4.85679,17.1807C2.410298,14.7834,2.371331,10.84174,4.79974,8.462530000000001ZM12.3461,6.1325199999999995L10.47246,4.29654L5.51079,9.15889C3.477674,11.15076,3.510214,14.4688,5.56784,16.4847C7.62506,18.500999999999998,11.01117,18.5325,13.0439,16.540599999999998L15.6842,13.9529L14.2908,12.58718L15.0011,11.89161L16.394399999999997,13.2569L18.0056,11.67786L16.1323,9.84188L11.16985,14.7046C10.18764,15.6679,8.540980000000001,15.6494,7.51498,14.7184L7.44107,14.6487C6.4219,13.65,6.37771,11.98096,7.38362,10.994869999999999L10.02485,8.40693L8.624939999999999,7.03516L9.335180000000001,6.33919L10.73512,7.71099L12.3461,6.1325199999999995Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), lf = (e) => (() => {
  const n = sf.cloneNode(!0);
  return Pe(n, "class", `icon-overlay ${e ?? ""}`), n;
})(), cf = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,17C5.80945,17,3.667717,12.85,3.113386,11.575C2.9622047,11.2,2.9622047,10.8,3.113386,10.425C3.667717,9.15,5.80945,5,11,5C16.165399999999998,5,18.3323,9.15,18.8866,10.425C19.0378,10.8,19.0378,11.2,18.8866,11.575C18.3323,12.85,16.165399999999998,17,11,17ZM4.04567,10.8C3.995276,10.925,3.995276,11.05,4.04567,11.175C4.52441,12.325,6.43937,16,11,16C15.5606,16,17.4756,12.325,17.9543,11.2C18.0047,11.075,18.0047,10.95,17.9543,10.825C17.4756,9.675,15.5606,6,11,6C6.43937,6,4.52441,9.675,4.04567,10.8ZM11,13.5C9.61417,13.5,8.480319999999999,12.375,8.480319999999999,11C8.480319999999999,9.625,9.61417,8.5,11,8.5C12.38583,8.5,13.5197,9.625,13.5197,11C13.5197,12.375,12.38583,13.5,11,13.5ZM11,9.5C10.1685,9.5,9.48819,10.175,9.48819,11C9.48819,11.825,10.1685,12.5,11,12.5C11.8315,12.5,12.51181,11.825,12.51181,11C12.51181,10.175,11.8315,9.5,11,9.5Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), uf = () => cf.cloneNode(!0), df = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.80417,14.9887L4.62563,16.167299999999997C4.43037,16.3625,4.43037,16.6791,4.62563,16.8744C4.82089,17.0696,5.13748,17.0696,5.332739999999999,16.8744L6.62638,15.5807C7.75595,16.290100000000002,9.19328,16.7929,11,16.7929C16.165399999999998,16.7929,18.3323,12.64289,18.8866,11.36789C19.0378,10.99289,19.0378,10.59289,18.8866,10.21789C18.5549,9.45486,17.6456,7.66212,15.8617,6.34545L17.3536,4.853553C17.5488,4.658291,17.5488,4.341709,17.3536,4.146447C17.1583,3.9511845,16.8417,3.9511845,16.6464,4.146447L15.0014,5.7915399999999995C13.9314,5.1969,12.61166,4.792893,11,4.792893C5.80945,4.792893,3.667717,8.94289,3.113386,10.21789C2.9622049,10.59289,2.9622049,10.99289,3.113386,11.36789C3.424435,12.08333,4.2353000000000005,13.70399,5.80417,14.9887ZM7.36012,14.847C8.32327,15.4074,9.52286,15.7929,11,15.7929C15.5606,15.7929,17.4756,12.11789,17.9543,10.99289C18.0047,10.86789,18.0047,10.74289,17.9543,10.61789C17.659,9.90846,16.8171,8.23812,15.1447,7.06241L12.96929,9.23782C13.3134,9.66543,13.5197,10.20642,13.5197,10.79289C13.5197,12.16789,12.38583,13.29289,11,13.29289C10.41596,13.29289,9.87667,13.09308,9.44815,12.75896L7.36012,14.847ZM8.794609999999999,11.99829L6.520099999999999,14.2728C5.06905,13.12119,4.32057,11.628250000000001,4.04567,10.96789C3.995275,10.84289,3.995275,10.71789,4.04567,10.59289C4.52441,9.46789,6.43937,5.79289,11,5.79289C12.28868,5.79289,13.3661,6.086320000000001,14.2596,6.53329L12.19759,8.5953C11.84086,8.40257,11.43271,8.29289,11,8.29289C9.61417,8.29289,8.480319999999999,9.41789,8.480319999999999,10.79289C8.480319999999999,11.22918,8.594470000000001,11.64029,8.794609999999999,11.99829ZM10.16528,12.04183C10.404869999999999,12.20032,10.692070000000001,12.29289,11,12.29289C11.8315,12.29289,12.51181,11.61789,12.51181,10.79289C12.51181,10.48318,12.41593,10.194600000000001,12.25216,9.95494L10.16528,12.04183ZM11.43602,9.35687L9.55616,11.236740000000001C9.512,11.09633,9.48819,10.94724,9.48819,10.79289C9.48819,9.96789,10.1685,9.29289,11,9.29289C11.15142,9.29289,11.29782,9.31528,11.43602,9.35687Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), hf = () => df.cloneNode(!0), ff = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_625"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_625)"><path d="M14.5385,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807692,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.88462,4,14.5385,5.61538,14.5385,7.576919999999999L14.5385,9.76923ZM10.88461,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923L13.38462,9.76923L13.38462,7.576919999999999C13.38462,6.23077,12.26923,5.15385,10.88461,5.15385ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.038450000000001,12.07692,11.307680000000001,12.34615,11.307680000000001,12.65385L11.307680000000001,14.5769C11.307680000000001,14.8846,11.038450000000001,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), mf = () => ff.cloneNode(!0), gf = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_620"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_620)"><path d="M8.38461,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807693,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.46154,4,13.84615,4.961539,14.3462,6.423080000000001C14.4615,6.73077,14.3077,7.038460000000001,14,7.15385C13.69231,7.26923,13.38461,7.11538,13.26923,6.80769C12.92308,5.80769,11.96154,5.15385,10.88462,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.03846,12.07692,11.307690000000001,12.34615,11.307690000000001,12.65385L11.307690000000001,14.5769C11.307690000000001,14.8846,11.03846,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), yf = () => gf.cloneNode(!0), pf = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M16.966900000000003,8.67144C16.6669,8.67144,16.4247,8.91558,16.4247,9.21802L16.4247,16.631500000000003C16.4247,17.322,16.007199999999997,17.9068,15.5139,17.9068L13.93072,17.9068L13.93072,9.2162C13.93072,8.91741,13.68675,8.67144,13.38855,8.67144C13.09036,8.67144,12.84639,8.91741,12.84639,9.21802L12.84639,17.9068L10.151810000000001,17.9068L10.151810000000001,9.21802C10.151810000000001,8.91741,9.90783,8.67144,9.609639999999999,8.67144C9.31145,8.67144,9.06747,8.91741,9.06747,9.219850000000001L9.06747,17.9068L7.48614,17.9068C6.99277,17.9068,6.5753,17.322,6.5753,16.631500000000003L6.5753,9.21802C6.5753,8.91558,6.333130000000001,8.67144,6.03313,8.67144C5.73313,8.67144,5.49096,8.91558,5.49096,9.21802L5.49096,16.631500000000003C5.49096,17.9378,6.385540000000001,19,7.48614,19L15.512,19C16.6127,19,17.509,17.9378,17.509,16.631500000000003L17.509,9.21802C17.509,8.91558,17.2669,8.67144,16.966900000000003,8.67144ZM18.4578,6.21183L4.542169,6.21183C4.243976,6.21183,4,6.45779,4,6.75841C4,7.05903,4.243976,7.30499,4.542169,7.30499L18.4578,7.30499C18.756,7.30499,19,7.05903,19,6.75841C19,6.45779,18.756,6.21183,18.4578,6.21183ZM8.68072,5.10045L14.3193,5.10045C14.6175,5.10045,14.8614,4.852666,14.8614,4.550225C14.8614,4.247783,14.6175,4,14.3193,4L8.68072,4C8.38253,4,8.13855,4.247783,8.13855,4.550225C8.13855,4.852666,8.38253,5.10045,8.68072,5.10045Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), vf = () => pf.cloneNode(!0), Cf = {
  horizontalStraightLine: Jd,
  horizontalRayLine: th,
  horizontalSegment: rh,
  verticalStraightLine: ih,
  verticalRayLine: sh,
  verticalSegment: ch,
  straightLine: dh,
  rayLine: fh,
  segment: gh,
  arrow: ph,
  priceLine: Ch,
  priceChannelLine: bh,
  parallelStraightLine: kh,
  fibonacciLine: Lh,
  fibonacciSegment: Ah,
  fibonacciCircle: Th,
  fibonacciSpiral: Ph,
  fibonacciSpeedResistanceFan: Dh,
  fibonacciExtension: Ih,
  gannBox: Bh,
  circle: Uh,
  triangle: Kh,
  rect: jh,
  parallelogram: Zh,
  threeWaves: Hh,
  fiveWaves: Yh,
  eightWaves: Gh,
  anyWaves: Jh,
  abcd: tf,
  xabcd: rf,
  weak_magnet: af,
  strong_magnet: lf,
  lock: mf,
  unlock: yf,
  visible: uf,
  invisible: hf,
  remove: vf
};
function $f(e) {
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
function bf(e) {
  return [
    { key: "priceChannelLine", text: c("price_channel_line", e) },
    { key: "parallelStraightLine", text: c("parallel_straight_line", e) }
  ];
}
function _f(e) {
  return [
    { key: "circle", text: c("circle", e) },
    { key: "rect", text: c("rect", e) },
    { key: "parallelogram", text: c("parallelogram", e) },
    { key: "triangle", text: c("triangle", e) }
  ];
}
function kf(e) {
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
function xf(e) {
  return [
    { key: "xabcd", text: c("xabcd", e) },
    { key: "abcd", text: c("abcd", e) },
    { key: "threeWaves", text: c("three_waves", e) },
    { key: "fiveWaves", text: c("five_waves", e) },
    { key: "eightWaves", text: c("eight_waves", e) },
    { key: "anyWaves", text: c("any_waves", e) }
  ];
}
function Lf(e) {
  return [
    { key: "weak_magnet", text: c("weak_magnet", e) },
    { key: "strong_magnet", text: c("strong_magnet", e) }
  ];
}
const Ve = (e) => Cf[e.name](e.class), wf = /* @__PURE__ */ $('<div class="klinecharts-pro-drawing-bar"><span class="split-line"></span><div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div><div class="item"><span style="width:32px;height:32px"></span></div><div class="item"><span style="width:32px;height:32px"></span></div><span class="split-line"></span><div class="item"><span style="width:32px;height:32px"></span></div></div>'), Af = /* @__PURE__ */ $('<div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div>'), _r = /* @__PURE__ */ $('<li><span style="padding-left:8px"></span></li>'), kr = "drawing_tools", Mf = (e) => {
  const [n, t] = T("horizontalStraightLine"), [r, a] = T("priceChannelLine"), [l, h] = T("circle"), [u, p] = T("fibonacciLine"), [k, y] = T("xabcd"), [w, A] = T("weak_magnet"), [O, F] = T("normal"), [B, D] = T(!1), [R, X] = T(!0), [U, W] = T(""), V = Z(() => [{
    key: "singleLine",
    icon: n(),
    list: $f(e.locale),
    setter: t
  }, {
    key: "moreLine",
    icon: r(),
    list: bf(e.locale),
    setter: a
  }, {
    key: "polygon",
    icon: l(),
    list: _f(e.locale),
    setter: h
  }, {
    key: "fibonacci",
    icon: u(),
    list: kf(e.locale),
    setter: p
  }, {
    key: "wave",
    icon: k(),
    list: xf(e.locale),
    setter: y
  }]), ue = Z(() => Lf(e.locale));
  return (() => {
    const z = wf.cloneNode(!0), j = z.firstChild, q = j.nextSibling, re = q.firstChild, ie = re.nextSibling, be = ie.firstChild, Oe = q.nextSibling, de = Oe.firstChild, Ue = Oe.nextSibling, _e = Ue.firstChild, ve = Ue.nextSibling, te = ve.nextSibling, he = te.firstChild;
    return v(z, () => V().map((H) => (() => {
      const N = Af.cloneNode(!0), E = N.firstChild, Ce = E.nextSibling, Ne = Ce.firstChild;
      return N.addEventListener("blur", () => {
        W("");
      }), E.$$click = () => {
        e.onDrawingItemClick({
          groupId: kr,
          name: H.icon,
          visible: R(),
          lock: B(),
          mode: O()
        });
      }, v(E, L(Ve, {
        get name() {
          return H.icon;
        }
      })), Ce.$$click = () => {
        H.key === U() ? W("") : W(H.key);
      }, v(N, (() => {
        const se = Z(() => H.key === U());
        return () => se() && L(Wt, {
          class: "list",
          get children() {
            return H.list.map((Le) => (() => {
              const _ = _r.cloneNode(!0), ae = _.firstChild;
              return _.$$click = () => {
                H.setter(Le.key), e.onDrawingItemClick({
                  name: Le.key,
                  lock: B(),
                  mode: O()
                }), W("");
              }, v(_, L(Ve, {
                get name() {
                  return Le.key;
                }
              }), ae), v(ae, () => Le.text), _;
            })());
          }
        });
      })(), null), I(() => Pe(Ne, "class", H.key === U() ? "rotate" : "")), N;
    })()), j), q.addEventListener("blur", () => {
      W("");
    }), re.$$click = () => {
      let H = w();
      O() !== "normal" && (H = "normal"), F(H), e.onModeChange(H);
    }, v(re, (() => {
      const H = Z(() => w() === "weak_magnet");
      return () => H() ? (() => {
        const N = Z(() => O() === "weak_magnet");
        return () => N() ? L(Ve, {
          name: "weak_magnet",
          class: "selected"
        }) : L(Ve, {
          name: "weak_magnet"
        });
      })() : (() => {
        const N = Z(() => O() === "strong_magnet");
        return () => N() ? L(Ve, {
          name: "strong_magnet",
          class: "selected"
        }) : L(Ve, {
          name: "strong_magnet"
        });
      })();
    })()), ie.$$click = () => {
      U() === "mode" ? W("") : W("mode");
    }, v(q, (() => {
      const H = Z(() => U() === "mode");
      return () => H() && L(Wt, {
        class: "list",
        get children() {
          return ue().map((N) => (() => {
            const E = _r.cloneNode(!0), Ce = E.firstChild;
            return E.$$click = () => {
              A(N.key), F(N.key), e.onModeChange(N.key), W("");
            }, v(E, L(Ve, {
              get name() {
                return N.key;
              }
            }), Ce), v(Ce, () => N.text), E;
          })());
        }
      });
    })(), null), de.$$click = () => {
      const H = !B();
      D(H), e.onLockChange(H);
    }, v(de, (() => {
      const H = Z(() => !!B());
      return () => H() ? L(Ve, {
        name: "lock"
      }) : L(Ve, {
        name: "unlock"
      });
    })()), _e.$$click = () => {
      const H = !R();
      X(H), e.onVisibleChange(H);
    }, v(_e, (() => {
      const H = Z(() => !!R());
      return () => H() ? L(Ve, {
        name: "visible"
      }) : L(Ve, {
        name: "invisible"
      });
    })()), he.$$click = () => {
      e.onRemoveClick(kr);
    }, v(he, L(Ve, {
      name: "remove"
    })), I(() => Pe(be, "class", U() === "mode" ? "rotate" : "")), z;
  })();
};
Qe(["click"]);
const xr = /* @__PURE__ */ $('<li class="title"></li>'), Lr = /* @__PURE__ */ $('<li class="row"></li>'), Tf = (e) => L(C1, {
  get title() {
    return c("indicator", e.locale);
  },
  width: 400,
  get onClose() {
    return e.onClose;
  },
  get children() {
    return L(Wt, {
      class: "klinecharts-pro-indicator-modal-list",
      get children() {
        return [(() => {
          const n = xr.cloneNode(!0);
          return v(n, () => c("main_indicator", e.locale)), n;
        })(), Z(() => ["MA", "EMA", "SMA", "BOLL", "SAR", "BBI"].map((n) => {
          const t = e.mainIndicators.includes(n);
          return (() => {
            const r = Lr.cloneNode(!0);
            return r.$$click = (a) => {
              e.onMainIndicatorChange({
                name: n,
                paneId: "candle_pane",
                added: !t
              });
            }, v(r, L($r, {
              checked: t,
              get label() {
                return c(n.toLowerCase(), e.locale);
              }
            })), r;
          })();
        })), (() => {
          const n = xr.cloneNode(!0);
          return v(n, () => c("sub_indicator", e.locale)), n;
        })(), Z(() => ["MA", "EMA", "VOL", "MACD", "BOLL", "KDJ", "RSI", "BIAS", "BRAR", "CCI", "DMI", "CR", "PSY", "DMA", "TRIX", "OBV", "VR", "WR", "MTM", "EMV", "SAR", "SMA", "ROC", "PVT", "BBI", "AO"].map((n) => {
          const t = n in e.subIndicators;
          return (() => {
            const r = Lr.cloneNode(!0);
            return r.$$click = (a) => {
              e.onSubIndicatorChange({
                name: n,
                paneId: e.subIndicators[n] ?? "",
                added: !t
              });
            }, v(r, L($r, {
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
function wr(e, n) {
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
function Sf(e) {
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
const Pf = (e) => {
  const [n, t] = T(e.timezone), r = Z(() => Sf(e.locale));
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
      return L(f9, {
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
function Ar(e) {
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
const Of = /* @__PURE__ */ $('<div class="klinecharts-pro-setting-modal-content"></div>'), Df = /* @__PURE__ */ $('<div class="setting-item"><span class="setting-label"></span><div class="setting-control"></div></div>'), Nf = (e) => {
  const [n, t] = T(e.currentStyles), [r, a] = T(Ar(e.locale)), [l, h] = T(!1), u = () => {
    h(window.innerWidth <= 768);
  };
  Pn(() => {
    u(), window.addEventListener("resize", u);
  }), N1(() => {
    window.removeEventListener("resize", u);
  }), Ke(() => {
    a(Ar(e.locale));
  });
  const p = (k, y) => {
    const w = {};
    kn(w, k.key, y);
    const A = ce.clone(n());
    kn(A, k.key, y), t(A), a(r().map((O) => ({
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
      return l();
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
      const k = Of.cloneNode(!0);
      return v(k, L(bn, {
        get each() {
          return r();
        },
        children: (y) => {
          let w;
          const A = ce.formatValue(n(), y.key);
          switch (y.component) {
            case "select": {
              const O = y.key === "candle.type" ? "170px" : "120px";
              w = L(f9, {
                get style() {
                  return {
                    width: l() ? "100%" : O,
                    "min-width": l() ? "auto" : O
                  };
                },
                get value() {
                  return c(A, e.locale);
                },
                get dataSource() {
                  return y.dataSource;
                },
                onSelected: (F) => {
                  const B = F.key;
                  p(y, B);
                }
              });
              break;
            }
            case "switch": {
              const O = !!A;
              w = L(hl, {
                open: O,
                onChange: () => {
                  p(y, !O);
                }
              });
              break;
            }
          }
          return (() => {
            const O = Df.cloneNode(!0), F = O.firstChild, B = F.nextSibling;
            return v(F, () => y.text), v(B, w), I(() => O.classList.toggle("mobile-item", !!l())), O;
          })();
        }
      })), I(() => k.classList.toggle("mobile-layout", !!l())), k;
    }
  });
}, If = /* @__PURE__ */ $('<img style="width:500px;margin-top: 20px">'), Ef = (e) => L(C1, {
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
    const n = If.cloneNode(!0);
    return I(() => Pe(n, "src", e.url)), n;
  }
}), Bf = {
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
}, Ff = /* @__PURE__ */ $('<div class="klinecharts-pro-indicator-setting-modal-content"></div>'), Uf = /* @__PURE__ */ $("<span></span>"), zf = (e) => {
  const [n, t] = T(ce.clone(e.params.calcParams)), r = (a) => Bf[a];
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
          const a = r(e.params.indicatorName), l = [];
          ce.clone(n()).forEach((h, u) => {
            !ce.isValid(h) || h === "" ? "default" in a[u] && l.push(a[u].default) : l.push(h);
          }), e.onConfirm(l), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      const a = Ff.cloneNode(!0);
      return v(a, () => r(e.params.indicatorName).map((l, h) => [(() => {
        const u = Uf.cloneNode(!0);
        return v(u, () => c(l.paramNameKey, e.locale)), u;
      })(), L(m9, {
        style: {
          width: "200px"
        },
        get value() {
          return n()[h] ?? "";
        },
        get precision() {
          return l.precision;
        },
        get min() {
          return l.min;
        },
        onChange: (u) => {
          const p = ce.clone(n());
          p[h] = u, t(p);
        }
      })])), a;
    }
  });
}, Kf = /* @__PURE__ */ $('<svg viewBox="0 0 1024 1024"><path d="M945.066667 898.133333l-189.866667-189.866666c55.466667-64 87.466667-149.333333 87.466667-241.066667 0-204.8-168.533333-373.333333-373.333334-373.333333S96 264.533333 96 469.333333 264.533333 842.666667 469.333333 842.666667c91.733333 0 174.933333-34.133333 241.066667-87.466667l189.866667 189.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c8.533333-12.8 8.533333-34.133333-2.133333-46.933334zM469.333333 778.666667C298.666667 778.666667 160 640 160 469.333333S298.666667 160 469.333333 160 778.666667 298.666667 778.666667 469.333333 640 778.666667 469.333333 778.666667z"></path></svg>'), Rf = /* @__PURE__ */ $('<img alt="symbol">'), jf = /* @__PURE__ */ $("<li><div><span></span></div></li>"), Qf = (e) => {
  const [n, t] = T(""), [r] = n5(n, e.datafeed.searchSymbols.bind(e.datafeed));
  return L(C1, {
    get title() {
      return c("symbol_search", e.locale);
    },
    width: 460,
    get onClose() {
      return e.onClose;
    },
    get children() {
      return [L(m9, {
        class: "klinecharts-pro-symbol-search-modal-input",
        get placeholder() {
          return c("symbol_code", e.locale);
        },
        get suffix() {
          return Kf.cloneNode(!0);
        },
        get value() {
          return n();
        },
        onChange: (a) => {
          const l = `${a}`;
          t(l);
        }
      }), L(Wt, {
        class: "klinecharts-pro-symbol-search-modal-list",
        get loading() {
          return r.loading;
        },
        get dataSource() {
          return r() ?? [];
        },
        renderItem: (a) => (() => {
          const l = jf.cloneNode(!0), h = l.firstChild, u = h.firstChild;
          return l.$$click = () => {
            e.onSymbolSelected(a), e.onClose();
          }, v(h, L(J, {
            get when() {
              return a.logo;
            },
            get children() {
              const p = Rf.cloneNode(!0);
              return I(() => Pe(p, "src", a.logo)), p;
            }
          }), u), v(u, () => a.shortName ?? a.ticker, null), v(u, () => `${a.name ? `(${a.name})` : ""}`, null), v(l, () => a.exchange ?? "", null), I(() => Pe(u, "title", a.name ?? "")), l;
        })()
      })];
    }
  });
};
Qe(["click"]);
const Zf = /* @__PURE__ */ $('<div class="klinecharts-pro-mobile-more-modal-content"><div class="item"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div><div class="item"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path></svg><span></span></div><div class="item"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg><span></span></div></div>'), Vf = (e) => L(C1, {
  get title() {
    return c("more", e.locale);
  },
  isMobile: !0,
  get onClose() {
    return e.onClose;
  },
  get children() {
    const n = Zf.cloneNode(!0), t = n.firstChild, r = t.firstChild, a = r.nextSibling, l = t.nextSibling, h = l.firstChild, u = h.nextSibling, p = l.nextSibling, k = p.firstChild, y = k.nextSibling;
    return t.$$click = () => {
      e.onIndicatorClick(), e.onClose();
    }, v(a, () => c("indicator", e.locale)), l.$$click = () => {
      e.onTimezoneClick(), e.onClose();
    }, v(u, () => c("timezone", e.locale)), p.$$click = () => {
      e.onSettingClick(), e.onClose();
    }, v(y, () => c("setting", e.locale)), n;
  }
});
Qe(["click"]);
const Hf = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-picker"></div>'), qf = /* @__PURE__ */ $('<label class="klinecharts-pro-time-tools-field"><span></span><button type="button" class="klinecharts-pro-time-tools-input"><span></span><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M8 3v4M16 3v4M4 10h16"></path></svg></button></label>'), Yf = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-calendar"><div class="klinecharts-pro-time-tools-month"><button type="button">&lt;&lt;</button><button type="button">&lt;</button><button type="button" class="calendar-title"></button><button type="button">></button><button type="button">>></button></div></div>'), Wf = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-grid"></div>'), Gf = /* @__PURE__ */ $('<span class="weekday"></span>'), P1 = /* @__PURE__ */ $('<button type="button"></button>'), Xf = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-month-grid"></div>'), Jf = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-month-grid year-grid"></div>'), em = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-spinners"><div class="spinner-column scrollable"></div><div class="spinner-column scrollable"></div><div class="spinner-column"></div></div>'), tm = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-content"></div>'), nm = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-tabs"></div>'), rm = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-range-panel"><div class="klinecharts-pro-time-tools-range-header"><button type="button"></button><span class="klinecharts-pro-time-tools-range-arrow">-></span><button type="button"></button><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M8 3v4M16 3v4M4 10h16"></path></svg></div></div>'), om = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-panel"><div class="klinecharts-pro-time-tools-row"><div><strong>Time Anchor</strong><span>Anchor to a time on the chart when switching between intervals</span></div><button type="button"><span></span></button></div><div><div><strong>Anchor Point</strong></div><select><option value="date">Date</option><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option></select></div><div class="klinecharts-pro-time-tools-row with-divider"><div><strong>Anchor line</strong><span>Mark the anchored time on the chart with a vertical line</span></div><button type="button"><span></span></button></div><div class="klinecharts-pro-time-tools-row with-divider"><div><strong>Across Tokens</strong><span>Retain onscreen chart range when switching symbols</span></div><button type="button"><span></span></button></div></div>'), im = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-anchor-date"></div>'), am = [{
  key: "goToDate",
  label: "Go to Date"
}, {
  key: "timeRange",
  label: "Time Range"
}, {
  key: "timeAnchor",
  label: "Time Anchor"
}], sm = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], Mr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Q1 = (e) => String(e).padStart(2, "0"), Tr = (e, n, t) => Math.min(t, new Date(e, n + 1, 0).getDate()), pn = (e) => {
  const n = new Date(e);
  return {
    year: n.getFullYear(),
    month: n.getMonth(),
    day: n.getDate(),
    hour: n.getHours(),
    minute: n.getMinutes()
  };
}, Bt = (e) => new Date(e.year, e.month, e.day, e.hour, e.minute, 0, 0).getTime(), vn = (e) => e.year * 1e4 + (e.month + 1) * 100 + e.day, Tn = (e) => {
  const n = e.hour >= 12 ? "PM" : "AM", t = e.hour % 12 || 12;
  return `${Q1(e.month + 1)}/${Q1(e.day)}/${e.year} ${Q1(t)}:${Q1(e.minute)} ${n}`;
}, lm = (e, n) => {
  const t = new Date(e, n, 1).getDay(), r = new Date(e, n + 1, 0).getDate(), a = new Date(e, n, 0).getDate(), l = [];
  for (let h = t - 1; h >= 0; h -= 1)
    l.push({
      date: new Date(e, n - 1, a - h),
      current: !1
    });
  for (let h = 1; h <= r; h += 1)
    l.push({
      date: new Date(e, n, h),
      current: !0
    });
  for (; l.length < 42; ) {
    const h = l[l.length - 1].date;
    l.push({
      date: new Date(h.getFullYear(), h.getMonth(), h.getDate() + 1),
      current: !1
    });
  }
  return l;
}, Ft = (e) => {
  const [n, t] = T(!0), [r, a] = T("date"), [l, h] = T(e.value.year), [u, p] = T(e.value.month), k = Z(() => lm(l(), u())), y = Z(() => Math.floor(l() / 10) * 10), w = Z(() => Array.from({
    length: 12
  }, (z, j) => y() - 1 + j)), A = Z(() => e.value.hour % 12 || 12), O = Z(() => e.value.hour >= 12 ? "PM" : "AM"), F = Array.from({
    length: 12
  }, (z, j) => j + 1), B = Array.from({
    length: 60
  }, (z, j) => j), D = (z) => {
    const j = new Date(l(), u() + z, 1);
    h(j.getFullYear()), p(j.getMonth());
  }, R = () => {
    r() === "date" ? a("month") : r() === "month" && a("year");
  }, X = (z) => {
    var j;
    e.onChange({
      ...e.value,
      year: z.getFullYear(),
      month: z.getMonth(),
      day: z.getDate()
    }), (j = e.onDateSelect) == null || j.call(e), h(z.getFullYear()), p(z.getMonth());
  }, U = (z) => {
    p(z), e.onChange({
      ...e.value,
      year: l(),
      month: z,
      day: Tr(l(), z, e.value.day)
    }), a("date");
  }, W = (z) => {
    h(z), e.onChange({
      ...e.value,
      year: z,
      day: Tr(z, e.value.month, e.value.day)
    }), a("month");
  }, V = (z) => {
    const j = O() === "PM";
    e.onChange({
      ...e.value,
      hour: j ? z === 12 ? 12 : z + 12 : z === 12 ? 0 : z
    });
  }, ue = (z) => {
    const j = A();
    e.onChange({
      ...e.value,
      hour: z === "PM" ? j === 12 ? 12 : j + 12 : j === 12 ? 0 : j
    });
  };
  return (() => {
    const z = Hf.cloneNode(!0);
    return v(z, (() => {
      const j = Z(() => e.showInput !== !1);
      return () => j() && (() => {
        const q = qf.cloneNode(!0), re = q.firstChild, ie = re.nextSibling, be = ie.firstChild;
        return v(re, () => e.label), ie.$$click = () => t(!n()), v(be, () => Tn(e.value)), q;
      })();
    })(), null), v(z, (() => {
      const j = Z(() => !!n());
      return () => j() && (() => {
        const q = Yf.cloneNode(!0), re = q.firstChild, ie = re.firstChild, be = ie.nextSibling, Oe = be.nextSibling, de = Oe.nextSibling, Ue = de.nextSibling;
        return ie.$$click = () => {
          r() === "year" ? h(l() - 10) : r() === "month" ? h(l() - 1) : D(-12);
        }, be.$$click = () => {
          r() === "year" ? h(l() - 10) : r() === "month" ? h(l() - 1) : D(-1);
        }, Oe.$$click = R, v(Oe, (() => {
          const _e = Z(() => r() === "year");
          return () => _e() ? `${y()}-${y() + 9}` : (() => {
            const ve = Z(() => r() === "month");
            return () => ve() ? l() : `${Mr[u()]} ${l()}`;
          })();
        })()), de.$$click = () => {
          r() === "year" ? h(l() + 10) : r() === "month" ? h(l() + 1) : D(1);
        }, Ue.$$click = () => {
          r() === "year" ? h(l() + 10) : r() === "month" ? h(l() + 1) : D(12);
        }, v(q, (() => {
          const _e = Z(() => r() === "date");
          return () => _e() && (() => {
            const ve = Wf.cloneNode(!0);
            return v(ve, () => sm.map((te) => (() => {
              const he = Gf.cloneNode(!0);
              return v(he, te), he;
            })()), null), v(ve, () => k().map(({
              date: te,
              current: he
            }) => {
              const H = vn({
                year: te.getFullYear(),
                month: te.getMonth(),
                day: te.getDate()
              }), N = e.range ? vn(e.range.from) : NaN, E = e.range ? vn(e.range.to) : NaN, Ce = Math.min(N, E), Ne = Math.max(N, E), se = Number.isFinite(Ce) && H >= Ce && H <= Ne, Le = Number.isFinite(Ce) && (H === Ce || H === Ne), _ = te.getFullYear() === e.value.year && te.getMonth() === e.value.month && te.getDate() === e.value.day;
              return (() => {
                const ae = P1.cloneNode(!0);
                return ae.$$click = () => X(te), oe(ae, `${he ? "" : "muted"} ${se ? "in-range" : ""} ${Le || _ ? "selected" : ""}`), v(ae, () => te.getDate()), ae;
              })();
            }), null), ve;
          })();
        })(), null), v(q, (() => {
          const _e = Z(() => r() === "month");
          return () => _e() && (() => {
            const ve = Xf.cloneNode(!0);
            return v(ve, () => Mr.map((te, he) => (() => {
              const H = P1.cloneNode(!0);
              return H.$$click = () => U(he), v(H, te), I(() => oe(H, he === e.value.month && l() === e.value.year ? "selected" : "")), H;
            })())), ve;
          })();
        })(), null), v(q, (() => {
          const _e = Z(() => r() === "year");
          return () => _e() && (() => {
            const ve = Jf.cloneNode(!0);
            return v(ve, () => w().map((te) => (() => {
              const he = P1.cloneNode(!0);
              return he.$$click = () => W(te), v(he, te), I(() => oe(he, `${te < y() || te > y() + 9 ? "muted" : ""} ${te === e.value.year ? "selected" : ""}`)), he;
            })())), ve;
          })();
        })(), null), v(q, (() => {
          const _e = Z(() => r() === "date");
          return () => _e() && (() => {
            const ve = em.cloneNode(!0), te = ve.firstChild, he = te.nextSibling, H = he.nextSibling;
            return v(te, () => F.map((N) => (() => {
              const E = P1.cloneNode(!0);
              return E.$$click = () => V(N), v(E, () => Q1(N)), I(() => oe(E, N === A() ? "selected" : "")), E;
            })())), v(he, () => B.map((N) => (() => {
              const E = P1.cloneNode(!0);
              return E.$$click = () => e.onChange({
                ...e.value,
                minute: N
              }), v(E, () => Q1(N)), I(() => oe(E, N === e.value.minute ? "selected" : "")), E;
            })())), v(H, () => ["AM", "PM"].map((N) => (() => {
              const E = P1.cloneNode(!0);
              return E.$$click = () => ue(N), v(E, N), I(() => oe(E, N === O() ? "selected" : "")), E;
            })())), ve;
          })();
        })(), null), q;
      })();
    })(), null), z;
  })();
}, cm = (e) => {
  const [n, t] = T(e.initialTab ?? "goToDate"), [r, a] = T(pn(e.initialTimestamp)), [l, h] = T(pn(e.initialRange.from)), [u, p] = T(pn(e.initialRange.to)), [k, y] = T("from"), [w, A] = T({
    ...e.anchorSettings
  }), O = (B) => {
    A((D) => ({
      ...D,
      ...B
    }));
  }, F = () => {
    const B = n();
    if (B === "goToDate")
      e.onGoToDate(Bt(r()));
    else if (B === "timeRange") {
      const D = Bt(l()), R = Bt(u());
      e.onTimeRange(D <= R ? {
        from: D,
        to: R
      } : {
        from: R,
        to: D
      });
    } else {
      const D = w();
      e.onTimeAnchorChange({
        ...D,
        timestamp: D.anchorPoint === "date" ? Bt(r()) : D.timestamp
      });
    }
    e.onClose();
  };
  return L(C1, {
    width: 620,
    get title() {
      return (() => {
        const B = nm.cloneNode(!0);
        return v(B, () => am.map((D) => (() => {
          const R = P1.cloneNode(!0);
          return R.$$click = () => t(D.key), v(R, () => D.label), I(() => oe(R, n() === D.key ? "active" : "")), R;
        })())), B;
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
      const B = tm.cloneNode(!0);
      return v(B, (() => {
        const D = Z(() => n() === "goToDate");
        return () => D() && L(Ft, {
          label: "Date and time",
          get value() {
            return r();
          },
          onChange: a
        });
      })(), null), v(B, (() => {
        const D = Z(() => n() === "timeRange");
        return () => D() && (() => {
          const R = rm.cloneNode(!0), X = R.firstChild, U = X.firstChild, W = U.nextSibling, V = W.nextSibling;
          return U.$$click = () => y("from"), v(U, () => Tn(l())), V.$$click = () => y("to"), v(V, () => Tn(u())), v(R, (() => {
            const ue = Z(() => k() === "from");
            return () => ue() ? L(Ft, {
              label: "Start",
              get value() {
                return l();
              },
              onChange: h,
              onDateSelect: () => y("to"),
              showInput: !1,
              get range() {
                return {
                  from: l(),
                  to: u()
                };
              }
            }) : L(Ft, {
              label: "End",
              get value() {
                return u();
              },
              onChange: p,
              showInput: !1,
              get range() {
                return {
                  from: l(),
                  to: u()
                };
              }
            });
          })(), null), I((ue) => {
            const z = k() === "from" ? "active" : "", j = k() === "to" ? "active" : "";
            return z !== ue._v$ && oe(U, ue._v$ = z), j !== ue._v$2 && oe(V, ue._v$2 = j), ue;
          }, {
            _v$: void 0,
            _v$2: void 0
          }), R;
        })();
      })(), null), v(B, (() => {
        const D = Z(() => n() === "timeAnchor");
        return () => D() && (() => {
          const R = om.cloneNode(!0), X = R.firstChild, U = X.firstChild, W = U.nextSibling, V = X.nextSibling, ue = V.firstChild, z = ue.nextSibling, j = V.nextSibling, q = j.firstChild, re = q.nextSibling, ie = j.nextSibling, be = ie.firstChild, Oe = be.nextSibling;
          return W.$$click = () => O({
            enabled: !w().enabled
          }), z.addEventListener("change", (de) => O({
            anchorPoint: de.currentTarget.value
          })), v(R, (() => {
            const de = Z(() => !!(w().enabled && w().anchorPoint === "date"));
            return () => de() && (() => {
              const Ue = im.cloneNode(!0);
              return v(Ue, L(Ft, {
                label: "Anchor date",
                get value() {
                  return r();
                },
                onChange: a
              })), Ue;
            })();
          })(), j), re.$$click = () => O({
            anchorLine: !w().anchorLine
          }), Oe.$$click = () => O({
            acrossTokens: !w().acrossTokens
          }), I((de) => {
            const Ue = `klinecharts-pro-time-tools-switch${w().enabled ? " on" : ""}`, _e = `klinecharts-pro-time-tools-row${w().enabled ? "" : " disabled"}`, ve = !w().enabled, te = `klinecharts-pro-time-tools-switch${w().anchorLine ? " on" : ""}`, he = `klinecharts-pro-time-tools-switch${w().acrossTokens ? " on" : ""}`;
            return Ue !== de._v$3 && oe(W, de._v$3 = Ue), _e !== de._v$4 && oe(V, de._v$4 = _e), ve !== de._v$5 && (z.disabled = de._v$5 = ve), te !== de._v$6 && oe(re, de._v$6 = te), he !== de._v$7 && oe(Oe, de._v$7 = he), de;
          }, {
            _v$3: void 0,
            _v$4: void 0,
            _v$5: void 0,
            _v$6: void 0,
            _v$7: void 0
          }), I(() => z.value = w().anchorPoint), R;
        })();
      })(), null), B;
    }
  });
};
Qe(["click"]);
const um = /* @__PURE__ */ $('<i class="icon-close klinecharts-pro-load-icon"></i>'), dm = /* @__PURE__ */ $('<div class="klinecharts-pro-content"><div class="klinecharts-pro-widget"></div></div>'), hm = /* @__PURE__ */ $('<div class="klinecharts-pro-time-navigation-tooltip"></div>'), fm = /* @__PURE__ */ $('<div class="klinecharts-pro-countdown-price-mark"><span class="klinecharts-pro-countdown-price-mark-price"></span><span class="klinecharts-pro-countdown-price-mark-timer"></span></div>'), mm = /* @__PURE__ */ $('<div class="overlay-toolbar-color-popover"><div class="overlay-toolbar-color-grid"></div><div class="overlay-toolbar-color-footer"><button type="button" class="overlay-toolbar-add-color">+</button><div class="overlay-toolbar-color-slider"><span></span></div></div></div>'), gm = /* @__PURE__ */ $('<div class="overlay-toolbar-dropdown width-menu"></div>'), ym = /* @__PURE__ */ $('<div class="overlay-toolbar-dropdown style-menu"><button type="button"><span class="overlay-toolbar-style-sample solid"></span></button><button type="button"><span class="overlay-toolbar-style-sample dashed"></span></button><button type="button"><span class="overlay-toolbar-style-sample dotted"></span></button></div>'), pm = /* @__PURE__ */ $('<div class="klinecharts-pro-overlay-toolbar"><button type="button" class="overlay-toolbar-icon drag" title="Move"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="6" r="1.5"></circle><circle cx="15" cy="6" r="1.5"></circle><circle cx="9" cy="12" r="1.5"></circle><circle cx="15" cy="12" r="1.5"></circle><circle cx="9" cy="18" r="1.5"></circle><circle cx="15" cy="18" r="1.5"></circle></svg></button><button type="button" class="overlay-toolbar-icon refresh" title="Reset"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 15.4-6.36L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-15.4 6.36L3 16"></path><path d="M3 21v-5h5"></path></svg></button><div class="overlay-toolbar-picker"><button type="button" title="Color"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg></button></div><div class="overlay-toolbar-picker"><button type="button" title="Line width"><span class="overlay-toolbar-line-preview"></span><span>px</span></button></div><div class="overlay-toolbar-picker"><button type="button" title="Line style"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16"></path></svg></button></div><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2"></rect><path d="M20 4 4 20"></path></svg></button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg></button><button type="button" class="overlay-toolbar-icon delete" title="Delete"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6 18 20H6L5 6"></path><path d="M10 11v5"></path><path d="M14 11v5"></path></svg></button></div>'), vm = /* @__PURE__ */ $('<button type="button"></button>'), Cm = /* @__PURE__ */ $('<button type="button"><span class="overlay-toolbar-width-sample"></span></button>'), $m = /* @__PURE__ */ $('<div class="klinecharts-pro-quick-order-marker"><button type="button" class="klinecharts-pro-quick-order-plus"></button></div>'), bm = /* @__PURE__ */ $('<span class="klinecharts-pro-quick-order-plus-icon"></span>'), _m = /* @__PURE__ */ $('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" aria-hidden="true"><path d="M460-300h40v-160h160v-40H500v-160h-40v160H300v40h160v160ZM224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h510.76q27.62 0 46.12 18.5Q800-763 800-735.38v510.76q0 27.62-18.5 46.12Q763-160 735.38-160H224.62Zm0-40h510.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-510.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69H224.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v510.76q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69ZM200-760v560-560Z"></path></svg>'), km = /* @__PURE__ */ $('<div class="klinecharts-pro-quick-order-menu-anchor"><div class="klinecharts-pro-quick-order-menu"><button type="button">Trade <!> @ <!> Limit</button><button type="button">Trade <!> @ <!> Stop</button><button type="button">Create new order...</button><button type="button">Copy Price (<!>)</button><button type="button">Draw horizontal line on </button></div></div>');
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
      indicator: l,
      defaultStyles: h
    }) => {
      const u = [];
      return l.visible ? (u.push(h.tooltip.icons[1]), u.push(h.tooltip.icons[2]), u.push(h.tooltip.icons[3])) : (u.push(h.tooltip.icons[0]), u.push(h.tooltip.icons[2]), u.push(h.tooltip.icons[3])), {
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
function zt(e) {
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
function xm(e) {
  const n = Math.max(0, Math.ceil(e / 1e3)), t = Math.floor(n / 3600), r = Math.floor(n % 3600 / 60), a = n % 60, l = (h) => String(h).padStart(2, "0");
  return t > 0 ? `${l(t)}:${l(r)}:${l(a)}` : `${l(r)}:${l(a)}`;
}
const Lm = (e) => {
  var c0, u0, d0, h0, f0, m0, g0, y0, p0, v0, C0, $0, b0, _0, k0, x0, L0, w0, A0, M0, T0, S0, P0, O0, D0, N0, I0, E0;
  let n, t = null, r;
  const [a, l] = T(!1), [h, u] = T(e.theme), [p, k] = T(e.styles), [y, w] = T(e.locale), [A, O] = T(e.symbol), [F, B] = T(e.period), D = () => {
    var o, i, s, d;
    return {
      visibleMarginLeft: ((o = e.indicatorTooltipIconStyles) == null ? void 0 : o.visibleMarginLeft) ?? 7,
      secondaryMarginLeft: ((i = e.indicatorTooltipIconStyles) == null ? void 0 : i.secondaryMarginLeft) ?? 7,
      marginTop: ((s = e.indicatorTooltipIconStyles) == null ? void 0 : s.marginTop) ?? 1,
      size: ((d = e.indicatorTooltipIconStyles) == null ? void 0 : d.size) ?? 12
    };
  }, [R, X] = T(!1), [U, W] = T([...e.mainIndicators]), [V, ue] = T({}), [z, j] = T(!1), [q, re] = T({
    key: e.timezone,
    text: wr(e.timezone, e.locale)
  }), [ie, be] = T(!1), [Oe, de] = T(), [Ue, _e] = T(""), [ve, te] = T(!1), [he, H] = T(Date.now()), [N, E] = T({
    from: Date.now() - 30 * 24 * 60 * 60 * 1e3,
    to: Date.now()
  }), [Ce, Ne] = T({
    enabled: !1,
    timestamp: Date.now(),
    anchorPoint: "date",
    anchorLine: !1,
    acrossTokens: !1
  });
  let se = null;
  const [Le, _] = T(e.drawingBarVisible), [ae, Me] = T(!1), [s1, fe] = T(!1), [m1, l1] = T(!1), et = ((c0 = e.orderTools) == null ? void 0 : c0.quickOrder) ?? !0, [Ie, yt] = T({
    quickOrder: et,
    quickOrderFloatingWindow: ((u0 = e.orderTools) == null ? void 0 : u0.quickOrderFloatingWindow) ?? et,
    quickOrderPlusButton: ((d0 = e.orderTools) == null ? void 0 : d0.quickOrderPlusButton) ?? et,
    openOrders: ((h0 = e.orderTools) == null ? void 0 : h0.openOrders) ?? !0,
    openOrdersExtendedPriceLine: ((f0 = e.orderTools) == null ? void 0 : f0.openOrdersExtendedPriceLine) ?? !0,
    openOrdersDisplay: ((m0 = e.orderTools) == null ? void 0 : m0.openOrdersDisplay) ?? "right",
    positions: ((g0 = e.orderTools) == null ? void 0 : g0.positions) ?? !0,
    breakevenPrice: ((y0 = e.orderTools) == null ? void 0 : y0.breakevenPrice) ?? !0,
    liquidationPrice: ((p0 = e.orderTools) == null ? void 0 : p0.liquidationPrice) ?? !0,
    priceLine: ((v0 = e.orderTools) == null ? void 0 : v0.priceLine) ?? !0,
    marketPriceLine: ((C0 = e.orderTools) == null ? void 0 : C0.marketPriceLine) ?? !0,
    countDown: (($0 = e.orderTools) == null ? void 0 : $0.countDown) ?? !0,
    bidAskPrice: ((b0 = e.orderTools) == null ? void 0 : b0.bidAskPrice) ?? !0,
    orderHistory: ((_0 = e.orderTools) == null ? void 0 : _0.orderHistory) ?? !0
  }), [B1, $1] = T(null), [b1, t1] = T(!1), [pt, Ze] = T(!1), [tt, nt] = T(64), [g1, _1] = T(null), rt = 6, [vt, F1] = T(null), [ot, Ct] = T(null), [ze, Re] = T(null), [He, je] = T(null), it = ["#000000", "#2b3342", "#3f4653", "#565d69", "#6f7580", "#8a9099", "#a7acb3", "#c4c8ce", "#ffffff", "#ff4d67", "#ffa629", "#f7ed4a", "#2fc58d", "#4ab09c", "#52c4d3", "#3157f6", "#6a36b8", "#a644b9", "#d83972", "#f2a3a6", "#f5c879", "#f7ee97", "#a6d29f", "#7fc9b9", "#91d7df", "#8fb2ee", "#b09ad2", "#c89ccf", "#d987ab", "#e8757a", "#efb34f", "#efe36e", "#86c17d", "#66b7a8", "#68c4d0", "#5f91e4", "#8059c9", "#aa62c2", "#d34d83", "#b9353d", "#ea8527", "#e8c245", "#4b8c43", "#2f6f60", "#47919b", "#2646c6", "#56309c", "#892f95", "#a82563", "#8e2528", "#de5c1f", "#dc8527", "#255a22", "#164b34", "#225b63", "#15309b", "#442180", "#6b1f74", "#86154e"];
  let U1 = null;
  const [z1, $t] = T({
    visible: !1,
    indicatorName: "",
    paneId: "",
    calcParams: []
  });
  let xe = /* @__PURE__ */ new Map(), Ee = /* @__PURE__ */ new Map();
  const bt = (o, i, s) => {
    const d = t == null ? void 0 : t.getIndicatorByPaneId(i, o);
    return {
      name: o,
      shortName: (d == null ? void 0 : d.shortName) || o,
      paneId: i,
      type: s,
      calcParams: (d == null ? void 0 : d.calcParams) || [],
      precision: (d == null ? void 0 : d.precision) ?? 4,
      visible: (d == null ? void 0 : d.visible) ?? !0,
      styles: d == null ? void 0 : d.styles,
      figures: d == null ? void 0 : d.figures
    };
  }, qe = (o, i, s, d) => {
    if (e.onIndicatorChange)
      if (d === "add" || d === "change")
        setTimeout(() => {
          const m = bt(o, i, s);
          e.onIndicatorChange({
            action: d,
            indicator: m
          });
        }, 50);
      else {
        const m = {
          name: o,
          shortName: o,
          paneId: i,
          type: s,
          calcParams: [],
          precision: 4,
          visible: !1,
          styles: void 0,
          figures: void 0
        };
        e.onIndicatorChange({
          action: d,
          indicator: m
        });
      }
  }, y1 = (o) => ({
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
      return o.map((d) => p1(d, i));
    const s = {};
    for (const d in o)
      if (!(d === "__proto__" || d === "constructor" || d === "prototype"))
        try {
          const m = o[d];
          if (typeof m == "function")
            continue;
          s[d] = p1(m, i);
        } catch (m) {
          s[d] = `[Error: ${m.message}]`;
        }
    return s;
  }, _t = (o) => {
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
        mode: o.mode || fn.Normal
      };
    } catch (i) {
      return console.error("Error extracting overlay data:", i), null;
    }
  }, k1 = (o) => {
    var i, s, d;
    try {
      const m = (i = t == null ? void 0 : t.getOverlayById) == null ? void 0 : i.call(t, o);
      if (!m)
        return;
      const g = _t(m);
      if (g) {
        const f = xe.get(o), C = ((s = f == null ? void 0 : f.points) == null ? void 0 : s.length) || 0, x = ((d = g.points) == null ? void 0 : d.length) || 0;
        xe.set(o, g);
        const M = y1(g.type);
        if (x >= M) {
          const P = Ee.get(o);
          P && !P.complete && (P.complete = !0, P.checkInterval && (clearInterval(P.checkInterval), P.checkInterval = void 0));
        }
      }
    } catch (m) {
      console.error(`Error updating overlay tracking for ${o}:`, m);
    }
  }, kt = (o, i) => {
    if (Ee.has(o))
      return;
    const s = {
      monitoring: !0,
      complete: !1,
      lastPointCount: 0
    };
    Ee.set(o, s), k1(o);
    const d = () => {
      k1(o);
    };
    document.addEventListener("mouseup", d), document.addEventListener("touchend", d), setTimeout(() => {
      var g;
      const m = Ee.get(o);
      if (m && !m.complete) {
        m.checkInterval && clearInterval(m.checkInterval), m.mouseUpHandler && (document.removeEventListener("mouseup", m.mouseUpHandler), document.removeEventListener("touchend", m.mouseUpHandler)), k1(o);
        const f = xe.get(o);
        if (f) {
          const C = y1(f.type), x = ((g = f.points) == null ? void 0 : g.length) || 0;
          x < C && console.warn(`âš ï¸ ${f.type} ${o} has only ${x} point(s), should have ${C}`);
        }
      }
    }, 3e4);
  };
  let Ye = {
    saveDrawings: (o, i) => {
      try {
        const s = `kline_drawings_${o}`, m = {
          drawings: i.map((g) => {
            var M;
            const f = {
              ...g
            };
            f.extendData && (f.extendData = p1(f.extendData)), f.styles && (f.styles = p1(f.styles));
            const C = y1(g.type), x = ((M = g.points) == null ? void 0 : M.length) || 0;
            return x < C && console.warn(`âš ï¸ Saving ${g.type} with only ${x} point(s), needs ${C}`), f;
          }),
          timestamp: Date.now()
        };
        localStorage.setItem(s, JSON.stringify(m));
      } catch (s) {
        console.error("Library: Error saving drawings:", s);
      }
    },
    loadDrawings: (o) => {
      try {
        const i = `kline_drawings_${o}`, s = localStorage.getItem(i);
        if (s) {
          const d = JSON.parse(s), m = [];
          return Array.isArray(d.drawings) && d.drawings.forEach((g) => {
            var x;
            const f = y1(g.type);
            (((x = g.points) == null ? void 0 : x.length) || 0) >= f && m.push(g);
          }), m;
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
      const i = Array.from(xe.values());
      Ye.saveDrawings(o.ticker, i);
    }
  }, an = (o) => {
    if (!o || !t)
      return;
    xe.forEach((s, d) => {
      var m;
      (m = t == null ? void 0 : t.removeOverlay) == null || m.call(t, {
        id: d
      });
    }), xe.clear(), Ee.clear(), Re(null), je(null), Ye.loadDrawings(o).forEach((s) => {
      var d;
      try {
        const m = A1({
          name: s.type,
          points: s.points || [],
          extendData: s.extendData,
          styles: s.styles,
          visible: s.visible ?? !0,
          lock: s.lock ?? !1,
          mode: s.mode || fn.Normal
        }), g = t == null ? void 0 : t.createOverlay(m), f = typeof g == "string" ? g : null;
        f && (xe.set(f, {
          ...s,
          id: f
        }), Ee.set(f, {
          monitoring: !1,
          complete: !0,
          lastPointCount: ((d = s.points) == null ? void 0 : d.length) || 0
        }));
      } catch (m) {
        console.error("Library: Error restoring drawing:", m);
      }
    });
  }, L1 = (o) => {
    var s, d;
    const i = {
      ...Ie(),
      ...o
    };
    if ("quickOrder" in o) {
      const m = o.quickOrder ?? !1;
      i.quickOrderFloatingWindow = m, i.quickOrderPlusButton = m;
    } else if ("priceLine" in o) {
      const m = o.priceLine ?? !1;
      i.marketPriceLine = m, i.countDown = m, i.bidAskPrice = m;
    } else
      "quickOrderFloatingWindow" in o || "quickOrderPlusButton" in o ? i.quickOrder = i.quickOrderFloatingWindow || i.quickOrderPlusButton : ("marketPriceLine" in o || "countDown" in o || "bidAskPrice" in o) && (i.priceLine = i.marketPriceLine || i.countDown || i.bidAskPrice);
    yt(i), (d = (s = e.orderTools) == null ? void 0 : s.onChange) == null || d.call(s, i);
  }, w1 = (o) => {
    var s;
    const i = Math.min(Math.max(((s = A()) == null ? void 0 : s.pricePrecision) ?? 2, 0), 8);
    return o.toLocaleString(void 0, {
      minimumFractionDigits: i,
      maximumFractionDigits: i
    });
  }, We = (o = Date.now()) => {
    var Je, e1, ut, B0, F0, U0;
    if (!t || !n || !Ie().countDown) {
      F1(null);
      return;
    }
    t.setStyles({
      candle: {
        priceMark: {
          last: {
            show: !0,
            line: {
              show: Ie().marketPriceLine
            },
            text: {
              show: !1
            }
          }
        }
      }
    });
    const i = ((Je = t.getDataList) == null ? void 0 : Je.call(t)) ?? [], s = i[i.length - 1], d = Number(s == null ? void 0 : s.close);
    if (!s || !Number.isFinite(d) || d <= 0) {
      F1(null);
      return;
    }
    const m = (e1 = t.convertToPixel) == null ? void 0 : e1.call(t, [{
      value: d
    }], {
      paneId: "candle_pane",
      absolute: !0
    }), g = Number((ut = m == null ? void 0 : m[0]) == null ? void 0 : ut.y), f = (B0 = t.getSize) == null ? void 0 : B0.call(t, "candle_pane"), C = (f == null ? void 0 : f.height) ?? n.clientHeight;
    if (!Number.isFinite(g) || g < 0 || g > C) {
      F1(null);
      return;
    }
    const x = Math.min(Math.max(((F0 = A()) == null ? void 0 : F0.pricePrecision) ?? 2, 0), 8), M = d.toLocaleString(void 0, {
      minimumFractionDigits: x,
      maximumFractionDigits: x
    }), P = (U0 = t.getSize) == null ? void 0 : U0.call(t, "candle_pane", R1.YAxis), Y = P != null && P.width && Number.isFinite(P.width) ? Math.max(74, Math.floor(P.width) - 2) : 96, ne = zt(F()), ee = o % ne, Q = ee === 0 ? ne : ne - ee, G = Number(s.close), me = Number(s.open), Be = t.getStyles().candle.priceMark.last, K = Be.text, $e = Number(K.size) || 12, le = Number(K.paddingTop) || 2, ke = Number(K.paddingBottom) || 2, we = Math.min(Number(K.paddingLeft) || 4, 3), Ge = Math.min(Number(K.paddingRight) || 4, 3), Xe = Math.max(34, $e * 2 + le + ke + 6), r1 = Math.max(0, Math.min(g - Xe / 2, C - Xe));
    F1({
      top: r1,
      width: Math.min(Y, Math.max(62, M.length * ($e * 0.56) + we + Ge + 4)),
      priceText: M,
      text: xm(Q),
      color: Number.isFinite(G) && Number.isFinite(me) && G < me ? Be.downColor : Be.upColor,
      textSize: $e,
      textFamily: K.family,
      textWeight: K.weight,
      paddingLeft: we,
      paddingRight: Ge,
      paddingTop: le,
      paddingBottom: ke,
      borderRadius: Number(K.borderRadius) || 2
    });
  }, xt = (o) => {
    var s, d;
    const i = Number(o == null ? void 0 : o.y);
    if (!Number.isFinite(i))
      return NaN;
    try {
      const m = t == null ? void 0 : t.convertFromPixel([{
        x: (o == null ? void 0 : o.x) ?? 0,
        y: i
      }], {
        paneId: "candle_pane"
      }), g = Number((s = m == null ? void 0 : m[0]) == null ? void 0 : s.value);
      if (Number.isFinite(g) && g > 0)
        return g;
    } catch {
    }
    try {
      const m = t == null ? void 0 : t.convertFromPixel([{
        x: (o == null ? void 0 : o.x) ?? 0,
        y: i
      }], {
        paneId: "candle_pane",
        absolute: !0
      }), g = Number((d = m == null ? void 0 : m[0]) == null ? void 0 : d.value);
      if (Number.isFinite(g) && g > 0)
        return g;
    } catch {
    }
    return NaN;
  }, Lt = (o) => {
    var g;
    if (!Ie().quickOrderPlusButton || (o == null ? void 0 : o.paneId) !== "candle_pane" || !n) {
      if (pt() || b1())
        return;
      $1(null), t1(!1);
      return;
    }
    const i = (g = t == null ? void 0 : t.getSize) == null ? void 0 : g.call(t, "candle_pane", R1.YAxis);
    i != null && i.width && Number.isFinite(i.width) && nt(Math.max(44, Math.ceil(i.width)));
    const s = Number(o.y), d = xt(o), m = n.clientHeight;
    if (!Number.isFinite(s) || !Number.isFinite(d) || d <= 0 || s < 0 || s > m) {
      if (pt() || b1())
        return;
      $1(null), t1(!1);
      return;
    }
    U1 = {
      ...o
    }, $1({
      y: s,
      price: d
    });
  }, c1 = () => {
    var o;
    if (U1)
      try {
        (o = t == null ? void 0 : t.executeAction) == null || o.call(t, T1.OnCrosshairChange, U1);
      } catch {
      }
  }, K1 = (o) => {
    var s, d;
    const i = g1() ?? B1();
    i && ((d = (s = e.orderTools) == null ? void 0 : s.onQuickOrderAction) == null || d.call(s, {
      action: o,
      price: i.price,
      symbol: A()
    }), t1(!1), _1(null), Ze(!1));
  }, sn = async () => {
    var i;
    const o = g1() ?? B1();
    if (o) {
      try {
        await ((i = navigator.clipboard) == null ? void 0 : i.writeText(String(o.price)));
      } catch {
      }
      t1(!1), _1(null), Ze(!1);
    }
  }, wt = () => {
    const o = g1() ?? B1();
    o && (t == null || t.createOverlay(A1({
      name: "horizontalStraightLine",
      points: [{
        value: o.price
      }],
      lock: !1
    })), t1(!1), _1(null), Ze(!1));
  }, ln = (o) => {
    var C, x, M, P, Y, ne;
    const i = (x = (C = n == null ? void 0 : n.parentElement) == null ? void 0 : C.getBoundingClientRect) == null ? void 0 : x.call(C), s = (M = n == null ? void 0 : n.getBoundingClientRect) == null ? void 0 : M.call(n), d = o == null ? void 0 : o.overlay, m = (P = d == null ? void 0 : d.points) == null ? void 0 : P[0];
    let g = 72, f = 40;
    if (i) {
      if (Number.isFinite(o == null ? void 0 : o.pageX) ? g = o.pageX - i.left : Number.isFinite(o == null ? void 0 : o.x) && s && (g = s.left - i.left + o.x), Number.isFinite(o == null ? void 0 : o.pageY))
        f = o.pageY - i.top;
      else if (Number.isFinite(o == null ? void 0 : o.y) && s)
        f = s.top - i.top + o.y;
      else if (Number.isFinite(m == null ? void 0 : m.value))
        try {
          const ee = (Y = t == null ? void 0 : t.convertToPixel) == null ? void 0 : Y.call(t, [{
            value: m.value
          }], {
            paneId: "candle_pane",
            absolute: !0
          }), Q = Number((ne = ee == null ? void 0 : ee[0]) == null ? void 0 : ne.y);
          Number.isFinite(Q) && (f = Q - i.top);
        } catch {
        }
    }
    return {
      x: Math.max(12, Math.min(g - 28, ((i == null ? void 0 : i.width) ?? 360) - 320)),
      y: Math.max(8, f - 52)
    };
  }, at = (o) => {
    var C, x, M, P, Y, ne, ee, Q;
    const i = o == null ? void 0 : o.overlay;
    if (!(i != null && i.id) || i.name !== "horizontalStraightLine")
      return !1;
    const s = ln(o), d = Number((x = (C = i.styles) == null ? void 0 : C.line) == null ? void 0 : x.size) || 3, m = ((P = (M = i.styles) == null ? void 0 : M.line) == null ? void 0 : P.style) ?? o1.Solid, g = Array.isArray((ne = (Y = i.styles) == null ? void 0 : Y.line) == null ? void 0 : ne.dashedValue) ? i.styles.line.dashedValue : [], f = ((Q = (ee = i.styles) == null ? void 0 : ee.line) == null ? void 0 : Q.color) ?? "#2f6df6";
    return Re({
      id: i.id,
      x: s.x,
      y: s.y,
      lineSize: d,
      lineStyle: m,
      dashedValue: g,
      color: f,
      locked: i.lock ?? !1,
      visible: i.visible ?? !0
    }), !1;
  }, st = (o) => {
    var s, d;
    const i = (s = o == null ? void 0 : o.overlay) == null ? void 0 : s.id;
    return (!i || ((d = ze()) == null ? void 0 : d.id) === i) && (Re(null), je(null)), !1;
  }, A1 = (o) => {
    var f, C, x, M, P, Y, ne, ee, Q;
    if (o.name !== "horizontalStraightLine")
      return o;
    const i = o.onClick, s = o.onSelected, d = o.onDeselected, m = o.onRemoved, g = o.onPressedMoveEnd;
    return {
      ...o,
      styles: {
        ...o.styles,
        line: {
          ...(f = o.styles) == null ? void 0 : f.line,
          size: Number((x = (C = o.styles) == null ? void 0 : C.line) == null ? void 0 : x.size) || 3,
          style: ((P = (M = o.styles) == null ? void 0 : M.line) == null ? void 0 : P.style) ?? o1.Solid,
          dashedValue: ((ne = (Y = o.styles) == null ? void 0 : Y.line) == null ? void 0 : ne.dashedValue) ?? [6, 4],
          color: ((Q = (ee = o.styles) == null ? void 0 : ee.line) == null ? void 0 : Q.color) ?? "#2f6df6"
        }
      },
      onClick: (G) => (at(G), (i == null ? void 0 : i(G)) ?? !1),
      onSelected: (G) => (at(G), (s == null ? void 0 : s(G)) ?? !1),
      onPressedMoveEnd: (G) => (at(G), (g == null ? void 0 : g(G)) ?? !1),
      onDeselected: (G) => (st(G), (d == null ? void 0 : d(G)) ?? !1),
      onRemoved: (G) => (st(G), (m == null ? void 0 : m(G)) ?? !1)
    };
  }, cn = () => {
    var i;
    const o = ze();
    o && ((i = t == null ? void 0 : t.removeOverlay) == null || i.call(t, {
      id: o.id
    }), Re(null), je(null));
  }, u1 = (o) => {
    var s;
    const i = ze();
    i && ((s = t == null ? void 0 : t.overrideOverlay) == null || s.call(t, {
      id: i.id,
      ...o
    }), setTimeout(() => {
      k1(i.id), x1();
    }, 0));
  }, b = () => {
    const o = ze();
    if (!o)
      return;
    const i = !o.locked;
    u1({
      lock: i
    }), Re({
      ...o,
      locked: i
    });
  }, S = () => {
    const o = ze();
    if (!o)
      return;
    const i = !o.visible;
    u1({
      visible: i
    }), Re({
      ...o,
      visible: i
    });
  }, Te = (o) => {
    const i = ze();
    i && (u1({
      styles: {
        line: {
          size: o
        }
      }
    }), Re({
      ...i,
      lineSize: o
    }), je(null));
  }, Se = (o, i) => {
    const s = ze();
    s && (u1({
      styles: {
        line: {
          style: o,
          dashedValue: i
        }
      }
    }), Re({
      ...s,
      lineStyle: o,
      dashedValue: i
    }), je(null));
  }, n1 = () => {
    const o = ze();
    if (!o)
      return;
    const i = 1, s = o1.Solid, d = [6, 4], m = "#2f6df6";
    u1({
      styles: {
        line: {
          size: i,
          style: s,
          dashedValue: d,
          color: m
        }
      }
    }), Re({
      ...o,
      lineSize: i,
      lineStyle: s,
      dashedValue: d,
      color: m
    }), je(null);
  }, M1 = (o) => {
    const i = ze();
    i && (u1({
      styles: {
        line: {
          color: o
        }
      }
    }), Re({
      ...i,
      color: o
    }));
  }, At = (o) => {
    var M, P;
    const i = ze();
    if (!i || !n)
      return;
    o.preventDefault(), o.stopPropagation(), je(null);
    const s = (P = (M = n.parentElement) == null ? void 0 : M.getBoundingClientRect) == null ? void 0 : P.call(M);
    if (!s)
      return;
    const d = o.clientX, m = o.clientY, g = i.x, f = i.y, C = (Y) => {
      Y.preventDefault();
      const ne = g + Y.clientX - d, ee = f + Y.clientY - m;
      Re({
        ...i,
        x: Math.max(8, Math.min(ne, s.width - 320)),
        y: Math.max(8, Math.min(ee, s.height - 48))
      });
    }, x = () => {
      document.removeEventListener("mousemove", C), document.removeEventListener("mouseup", x);
    };
    document.addEventListener("mousemove", C), document.addEventListener("mouseup", x);
  }, Mt = () => {
    t1(!1), _1(null), Ze(!1);
  }, lt = (o) => {
    var s, d;
    if (!b1())
      return;
    const i = o.target;
    (s = i == null ? void 0 : i.closest) != null && s.call(i, ".klinecharts-pro-quick-order-marker") || (d = i == null ? void 0 : i.closest) != null && d.call(i, ".klinecharts-pro-quick-order-menu-anchor") || Mt();
  };
  let ct = (k0 = e.orderTools) == null ? void 0 : k0.quickOrder, Qn = (x0 = e.orderTools) == null ? void 0 : x0.quickOrderFloatingWindow, Zn = (L0 = e.orderTools) == null ? void 0 : L0.quickOrderPlusButton, Vn = (w0 = e.orderTools) == null ? void 0 : w0.openOrders, Hn = (A0 = e.orderTools) == null ? void 0 : A0.openOrdersExtendedPriceLine, qn = (M0 = e.orderTools) == null ? void 0 : M0.openOrdersDisplay, Yn = (T0 = e.orderTools) == null ? void 0 : T0.positions, Wn = (S0 = e.orderTools) == null ? void 0 : S0.breakevenPrice, Gn = (P0 = e.orderTools) == null ? void 0 : P0.liquidationPrice, Xn = (O0 = e.orderTools) == null ? void 0 : O0.priceLine, Jn = (D0 = e.orderTools) == null ? void 0 : D0.marketPriceLine, e0 = (N0 = e.orderTools) == null ? void 0 : N0.countDown, t0 = (I0 = e.orderTools) == null ? void 0 : I0.bidAskPrice, n0 = (E0 = e.orderTools) == null ? void 0 : E0.orderHistory;
  Ke(() => {
    var G, me, Be, K, $e, le, ke, we, Ge, Xe, r1, Je, e1, ut;
    const o = (G = e.orderTools) == null ? void 0 : G.quickOrder, i = (me = e.orderTools) == null ? void 0 : me.quickOrderFloatingWindow, s = (Be = e.orderTools) == null ? void 0 : Be.quickOrderPlusButton, d = (K = e.orderTools) == null ? void 0 : K.openOrders, m = ($e = e.orderTools) == null ? void 0 : $e.openOrdersExtendedPriceLine, g = (le = e.orderTools) == null ? void 0 : le.openOrdersDisplay, f = (ke = e.orderTools) == null ? void 0 : ke.positions, C = (we = e.orderTools) == null ? void 0 : we.breakevenPrice, x = (Ge = e.orderTools) == null ? void 0 : Ge.liquidationPrice, M = (Xe = e.orderTools) == null ? void 0 : Xe.priceLine, P = (r1 = e.orderTools) == null ? void 0 : r1.marketPriceLine, Y = (Je = e.orderTools) == null ? void 0 : Je.countDown, ne = (e1 = e.orderTools) == null ? void 0 : e1.bidAskPrice, ee = (ut = e.orderTools) == null ? void 0 : ut.orderHistory, Q = {};
    typeof o == "boolean" && o !== ct && (ct = o, Q.quickOrder = o, typeof i != "boolean" && (Q.quickOrderFloatingWindow = o), typeof s != "boolean" && (Q.quickOrderPlusButton = o)), typeof i == "boolean" && i !== Qn && (Qn = i, Q.quickOrderFloatingWindow = i), typeof s == "boolean" && s !== Zn && (Zn = s, Q.quickOrderPlusButton = s), typeof d == "boolean" && d !== Vn && (Vn = d, Q.openOrders = d), typeof m == "boolean" && m !== Hn && (Hn = m, Q.openOrdersExtendedPriceLine = m), g !== void 0 && g !== qn && (qn = g, Q.openOrdersDisplay = g), typeof f == "boolean" && f !== Yn && (Yn = f, Q.positions = f), typeof C == "boolean" && C !== Wn && (Wn = C, Q.breakevenPrice = C), typeof x == "boolean" && x !== Gn && (Gn = x, Q.liquidationPrice = x), typeof M == "boolean" && M !== Xn && (Xn = M, Q.priceLine = M, typeof P != "boolean" && (Q.marketPriceLine = M), typeof Y != "boolean" && (Q.countDown = M), typeof ne != "boolean" && (Q.bidAskPrice = M)), typeof P == "boolean" && P !== Jn && (Jn = P, Q.marketPriceLine = P), typeof Y == "boolean" && Y !== e0 && (e0 = Y, Q.countDown = Y), typeof ne == "boolean" && ne !== t0 && (t0 = ne, Q.bidAskPrice = ne), typeof ee == "boolean" && ee !== n0 && (n0 = ee, Q.orderHistory = ee), Object.keys(Q).length > 0 && L1(Q);
  }), Ke(() => {
    Ie().marketPriceLine, Ie().countDown, F(), A(), t == null || t.setStyles({
      candle: {
        priceMark: {
          last: {
            show: !0,
            line: {
              show: Ie().marketPriceLine
            },
            text: {
              show: !Ie().countDown
            }
          }
        }
      }
    }), We();
  }), e.ref({
    setTheme: u,
    getTheme: () => h(),
    setStyles: k,
    getStyles: () => t.getStyles(),
    setLocale: w,
    getLocale: () => y(),
    setTimezone: (o) => {
      re({
        key: o,
        text: wr(e.timezone, y())
      });
    },
    getTimezone: () => q().key,
    setSymbol: O,
    getSymbol: () => A(),
    setPeriod: B,
    getPeriod: () => F(),
    getMainIndicators: () => U(),
    getSubIndicators: () => V(),
    setMainIndicators: W,
    setSubIndicators: ue,
    overrideIndicator: (o, i) => {
      t == null || t.overrideIndicator(o, i);
    },
    createOverlay: (o) => {
      var s;
      const i = (s = t == null ? void 0 : t.createOverlay) == null ? void 0 : s.call(t, A1(o));
      return typeof i == "string" ? i : null;
    },
    removeOverlay: (o) => {
      var i;
      if ((i = t == null ? void 0 : t.removeOverlay) == null || i.call(t, o), o.id) {
        xe.delete(o.id);
        const s = Ee.get(o.id);
        s && (s.checkInterval && clearInterval(s.checkInterval), s.mouseUpHandler && (document.removeEventListener("mouseup", s.mouseUpHandler), document.removeEventListener("touchend", s.mouseUpHandler)), Ee.delete(o.id)), x1();
      }
    },
    removeAllOverlay: () => {
      xe.forEach((o, i) => {
        var d;
        (d = t == null ? void 0 : t.removeOverlay) == null || d.call(t, {
          id: i
        });
        const s = Ee.get(i);
        s && (s.checkInterval && clearInterval(s.checkInterval), s.mouseUpHandler && (document.removeEventListener("mouseup", s.mouseUpHandler), document.removeEventListener("touchend", s.mouseUpHandler)));
      }), xe.clear(), Ee.clear();
    },
    getAllOverlay: () => Array.from(xe.values()),
    getOverlay: (o) => xe.get(o) || null,
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
    setTimezoneModalVisible: j,
    setSettingModalVisible: be,
    getOrderToolsState: () => Ie(),
    setOrderToolsState: (o) => {
      L1(o);
    },
    dispose: () => {
      n && z0(n);
    },
    resize: () => {
      t && "resize" in t && typeof t.resize == "function" ? t.resize() : console.warn("resize method not available on widget");
    },
    getSettings: () => {
      var s, d, m, g, f, C, x, M, P, Y, ne, ee, Q, G, me, Be;
      if (!t)
        return {};
      const o = t.getStyles(), i = (s = o.candle) == null ? void 0 : s.bar;
      return {
        // Candle settings
        candleType: (d = o.candle) == null ? void 0 : d.type,
        candleBarStyle: i == null ? void 0 : i.style,
        // bar.style might be LineType
        showLastPrice: (f = (g = (m = o.candle) == null ? void 0 : m.priceMark) == null ? void 0 : g.last) == null ? void 0 : f.show,
        showHighestPrice: (M = (x = (C = o.candle) == null ? void 0 : C.priceMark) == null ? void 0 : x.high) == null ? void 0 : M.show,
        showLowestPrice: (ne = (Y = (P = o.candle) == null ? void 0 : P.priceMark) == null ? void 0 : Y.low) == null ? void 0 : ne.show,
        // Indicator settings
        showIndicatorLastValue: (Q = (ee = o.indicator) == null ? void 0 : ee.lastValueMark) == null ? void 0 : Q.show,
        // Axis settings - yAxis.reverse is boolean according to YAxisStyle interface
        priceAxisType: (G = o.yAxis) == null ? void 0 : G.type,
        reverseCoordinate: (me = o.yAxis) == null ? void 0 : me.reverse,
        // Grid settings
        showGrids: (Be = o.grid) == null ? void 0 : Be.show,
        timestamp: Date.now()
      };
    },
    setSettings: (o) => {
      var s, d, m, g, f, C, x, M, P, Y, ne, ee, Q, G;
      if (!t)
        return;
      const i = {};
      if (o.candleType !== void 0 && (i.candle = {
        ...i.candle,
        type: o.candleType
      }), o.candleBarStyle !== void 0) {
        const me = ((s = i.candle) == null ? void 0 : s.bar) || {};
        i.candle = {
          ...i.candle,
          bar: {
            ...me,
            style: o.candleBarStyle
          }
          // Use any since ChangeColor doesn't have style
        };
      }
      o.showLastPrice !== void 0 && (i.candle = {
        ...i.candle,
        priceMark: {
          ...(d = i.candle) == null ? void 0 : d.priceMark,
          last: {
            ...(g = (m = i.candle) == null ? void 0 : m.priceMark) == null ? void 0 : g.last,
            show: o.showLastPrice,
            text: {
              ...(x = (C = (f = i.candle) == null ? void 0 : f.priceMark) == null ? void 0 : C.last) == null ? void 0 : x.text,
              show: o.showLastPrice && !Ie().countDown
            }
          }
        }
      }), o.showHighestPrice !== void 0 && (i.candle = {
        ...i.candle,
        priceMark: {
          ...(M = i.candle) == null ? void 0 : M.priceMark,
          high: {
            ...(Y = (P = i.candle) == null ? void 0 : P.priceMark) == null ? void 0 : Y.high,
            show: o.showHighestPrice
          }
        }
      }), o.showLowestPrice !== void 0 && (i.candle = {
        ...i.candle,
        priceMark: {
          ...(ne = i.candle) == null ? void 0 : ne.priceMark,
          low: {
            ...(Q = (ee = i.candle) == null ? void 0 : ee.priceMark) == null ? void 0 : Q.low,
            show: o.showLowestPrice
          }
        }
      }), o.showIndicatorLastValue !== void 0 && (i.indicator = {
        ...i.indicator,
        lastValueMark: {
          ...(G = i.indicator) == null ? void 0 : G.lastValueMark,
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
      var s, d, m, g, f, C, x;
      if (!t)
        return;
      t.getStyles();
      const o = {
        candle: {
          type: O9.CandleSolid,
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
          type: D9.Normal,
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
      }, i = Oe();
      if (i) {
        const M = {
          candle: {
            type: (s = i.candle) == null ? void 0 : s.type,
            bar: (d = i.candle) == null ? void 0 : d.bar,
            priceMark: (m = i.candle) == null ? void 0 : m.priceMark
          },
          indicator: {
            lastValueMark: (g = i.indicator) == null ? void 0 : g.lastValueMark
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
      const i = Array.from(xe.values());
      i.forEach((s, d) => {
        var f;
        const m = y1(s.type), g = ((f = s.points) == null ? void 0 : f.length) || 0;
        g < m && console.warn(`âš ï¸ ${s.type} ${s.id} has only ${g} point(s), should have ${m}`);
      }), Ye.saveDrawings(o, i);
    },
    loadDrawings: (o) => {
      Ye.loadDrawings(o).forEach((s, d) => {
        var m;
        try {
          const g = {
            name: s.type,
            points: s.points || [],
            extendData: s.extendData,
            styles: s.styles,
            visible: s.visible ?? !0,
            lock: s.lock ?? !1,
            mode: s.mode ?? fn.Normal
          }, f = t == null ? void 0 : t.createOverlay(g), C = typeof f == "string" ? f : null;
          C && (xe.set(C, {
            ...s,
            id: C
          }), Ee.set(C, {
            monitoring: !1,
            complete: !0,
            lastPointCount: ((m = s.points) == null ? void 0 : m.length) || 0
          }));
        } catch (g) {
          console.error(`   âŒ Error restoring ${s.type}:`, g);
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
  const r0 = () => {
    t == null || t.resize(), We(), s0();
  }, o0 = () => {
    We(), s0();
  }, i0 = [T1.OnVisibleRangeChange, T1.OnZoom, T1.OnScroll];
  let Tt, St;
  const y9 = (o) => {
    const i = new Date(o), s = i.getFullYear(), d = `${i.getMonth() + 1}`.padStart(2, "0"), m = `${i.getDate()}`.padStart(2, "0"), g = `${i.getHours()}`.padStart(2, "0"), f = `${i.getMinutes()}`.padStart(2, "0");
    return `${s}/${d}/${m} ${g}:${f}`;
  }, p9 = (o) => {
    var f;
    const i = ((f = t == null ? void 0 : t.getDataList) == null ? void 0 : f.call(t)) ?? [];
    if (i.length === 0)
      return null;
    let s = i[0], d = 0, m = Number(s == null ? void 0 : s.timestamp), g = Math.abs(m - o);
    for (let C = 1; C < i.length; C += 1) {
      const x = i[C], M = Number(x == null ? void 0 : x.timestamp);
      if (!Number.isFinite(M))
        continue;
      const P = Math.abs(M - o);
      P < g && (s = x, d = C, m = M, g = P);
    }
    return s && Number.isFinite(m) ? {
      candle: s,
      dataIndex: d
    } : null;
  }, a0 = (o) => {
    var ee, Q, G, me;
    if (!t || !n)
      return null;
    const i = p9(o), s = i == null ? void 0 : i.candle, d = Number((s == null ? void 0 : s.timestamp) ?? o), m = Number((s == null ? void 0 : s.high) ?? (s == null ? void 0 : s.close) ?? (s == null ? void 0 : s.open)), g = ((ee = t == null ? void 0 : t.getDataList) == null ? void 0 : ee.call(t)) ?? [], f = i && i.dataIndex < g.length - 1 ? i.dataIndex + 1 : i == null ? void 0 : i.dataIndex, C = i && Number.isFinite(m) ? {
      dataIndex: f,
      value: m
    } : {
      timestamp: d
    }, x = (Q = t.convertToPixel) == null ? void 0 : Q.call(t, [C], {
      paneId: "candle_pane",
      absolute: !0
    }), M = Number((G = x == null ? void 0 : x[0]) == null ? void 0 : G.x), P = Number((me = x == null ? void 0 : x[0]) == null ? void 0 : me.y), Y = n.clientWidth, ne = n.clientHeight;
    return !Number.isFinite(M) || M < -80 || M > Y + 80 ? null : {
      timestamp: d,
      text: y9(d),
      left: Math.max(58, Math.min(M, Y - 58)),
      top: Number.isFinite(P) ? Math.max(8, Math.min(P - 42, ne - 38)) : 10
    };
  }, s0 = () => {
    const o = ot();
    if (!o || !t || !n)
      return;
    const i = a0(o.timestamp);
    i && Ct(i);
  }, un = (o, i = 0) => {
    if (!t || !n)
      return;
    const s = a0(o);
    if (s) {
      Ct(s);
      return;
    }
    i < 6 && (St = window.setTimeout(() => un(o, i + 1), 80));
  }, dn = (o, i, s) => {
    let d = i, m = d;
    switch (o.timespan) {
      case "minute": {
        d = d - d % (60 * 1e3), m = d - s * o.multiplier * 60 * 1e3;
        break;
      }
      case "hour": {
        d = d - d % (60 * 60 * 1e3), m = d - s * o.multiplier * 60 * 60 * 1e3;
        break;
      }
      case "day": {
        d = d - d % (60 * 60 * 1e3), m = d - s * o.multiplier * 24 * 60 * 60 * 1e3;
        break;
      }
      case "week": {
        const f = new Date(d).getDay(), C = f === 0 ? 6 : f - 1;
        d = d - C * 60 * 60 * 24;
        const x = new Date(d);
        d = (/* @__PURE__ */ new Date(`${x.getFullYear()}-${x.getMonth() + 1}-${x.getDate()}`)).getTime(), m = s * o.multiplier * 7 * 24 * 60 * 60 * 1e3;
        break;
      }
      case "month": {
        const g = new Date(d), f = g.getFullYear(), C = g.getMonth() + 1;
        d = (/* @__PURE__ */ new Date(`${f}-${C}-01`)).getTime(), m = s * o.multiplier * 30 * 24 * 60 * 60 * 1e3;
        const x = new Date(m);
        m = (/* @__PURE__ */ new Date(`${x.getFullYear()}-${x.getMonth() + 1}-01`)).getTime();
        break;
      }
      case "year": {
        const f = new Date(d).getFullYear();
        d = (/* @__PURE__ */ new Date(`${f}-01-01`)).getTime(), m = s * o.multiplier * 365 * 24 * 60 * 60 * 1e3;
        const C = new Date(m);
        m = (/* @__PURE__ */ new Date(`${C.getFullYear()}-01-01`)).getTime();
        break;
      }
    }
    return [m, d];
  }, v9 = (o, i = 500) => {
    const s = zt(F()), d = Math.max(1, Math.floor(i / 2)) * s;
    return {
      from: o - d,
      to: o + d
    };
  }, C9 = (o) => {
    const i = new Date(o.from), s = new Date(o.to);
    return {
      from: new Date(i.getFullYear(), i.getMonth(), i.getDate(), 0, 0, 0, 0).getTime(),
      to: new Date(s.getFullYear(), s.getMonth(), s.getDate(), 23, 59, 59, 999).getTime()
    };
  }, $9 = (o, i) => {
    const s = Math.min(i.from, i.to), d = Math.max(i.from, i.to);
    return o.filter((m) => {
      const g = Number(m.timestamp);
      return g >= s && g <= d;
    });
  }, b9 = (o, i) => {
    var d;
    const s = Math.max(i.from, i.to);
    for (let m = o.length - 1; m >= 0; m -= 1) {
      const g = Number((d = o[m]) == null ? void 0 : d.timestamp);
      if (Number.isFinite(g) && g <= s)
        return g;
    }
    return s;
  }, _9 = (o, i) => {
    var d;
    const s = Math.max(i.from, i.to);
    for (let m = o.length - 1; m >= 0; m -= 1) {
      const g = Number((d = o[m]) == null ? void 0 : d.timestamp);
      if (Number.isFinite(g) && g <= s)
        return m;
    }
    return o.length - 1;
  }, k9 = (o, i) => {
    const s = zt(i), d = Math.abs(o.to - o.from), m = Math.max(1, Math.ceil(d / s) + 1), g = Math.max(m, 120) * s;
    return {
      from: o.from,
      to: Math.max(o.to, Math.min(Date.now(), o.to + g))
    };
  }, x9 = (o) => {
    var g, f;
    if (!t || !n || o.length === 0)
      return;
    const i = ((g = t.getSize("candle_pane", R1.YAxis)) == null ? void 0 : g.width) ?? 0, s = ((f = t.getSize("candle_pane", R1.Main)) == null ? void 0 : f.width) ?? n.clientWidth - i, d = Math.max(1, s - 8), m = Math.max(2, d / Math.max(1, o.length));
    t.setOffsetRightDistance(0), t.setLeftMinVisibleBarCount(0), t.setRightMinVisibleBarCount(0), t.setBarSpace(m);
  }, hn = (o) => {
    var i;
    !t || !Number.isFinite(o) || ((i = t.scrollToTimestamp) == null || i.call(t, o, 250), requestAnimationFrame(() => un(o)), We());
  }, Pt = () => {
    var s, d;
    se && ((s = t == null ? void 0 : t.removeOverlay) == null || s.call(t, {
      id: se
    }), se = null);
    const o = Ce();
    if (!t || !o.enabled || !o.anchorLine)
      return;
    const i = (d = t.createOverlay) == null ? void 0 : d.call(t, {
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
  }, l0 = async (o, i) => {
    if (t) {
      l(!0), fe(!0);
      try {
        const s = F(), d = o.from <= o.to ? o : {
          from: o.to,
          to: o.from
        }, m = C9(d), g = i ? m : k9(m, s), f = await e.datafeed.getHistoryKLineData(A(), s, g.from, g.to), C = $9(f, m);
        t.applyNewData(f, f.length > 0), E(m), requestAnimationFrame(() => {
          const x = _9(f, m);
          i ? hn(i) : (x9(C), t == null || t.scrollToDataIndex(x, 0), un(b9(C, m))), Pt();
        });
      } finally {
        l(!1), fe(!1);
      }
    }
  }, L9 = async (o) => {
    H(o), await l0(v9(o), o);
  }, w9 = (o) => {
    const s = {
      ...o,
      timestamp: (() => {
        var M, P, Y;
        if (!t || o.anchorPoint === "date")
          return o.timestamp;
        const d = ((M = t.getDataList) == null ? void 0 : M.call(t)) ?? [], m = (P = t.getVisibleRange) == null ? void 0 : P.call(t);
        if (d.length === 0 || !m)
          return o.timestamp;
        const g = Math.max(0, Math.ceil(m.from)), f = Math.min(d.length - 1, Math.floor(m.to)), C = o.anchorPoint === "left" ? g : o.anchorPoint === "right" ? f : Math.round((g + f) / 2), x = Number((Y = d[C]) == null ? void 0 : Y.timestamp);
        return Number.isFinite(x) ? x : o.timestamp;
      })()
    };
    Ne(s), s.enabled && (H(s.timestamp), requestAnimationFrame(() => hn(s.timestamp))), requestAnimationFrame(Pt);
  };
  Pn(() => {
    if (window.addEventListener("resize", r0), t = P9(n, {
      customApi: {
        formatDate: (f, C, x, M) => {
          switch (F().timespan) {
            case "minute":
              return M === Dt.XAxis ? ce.formatDate(f, C, "HH:mm") : ce.formatDate(f, C, "YYYY-MM-DD HH:mm");
            case "hour":
              return M === Dt.XAxis ? ce.formatDate(f, C, "MM-DD HH:mm") : ce.formatDate(f, C, "YYYY-MM-DD HH:mm");
            case "day":
            case "week":
              return ce.formatDate(f, C, "YYYY-MM-DD");
            case "month":
              return M === Dt.XAxis ? ce.formatDate(f, C, "YYYY-MM") : ce.formatDate(f, C, "YYYY-MM-DD");
            case "year":
              return M === Dt.XAxis ? ce.formatDate(f, C, "YYYY") : ce.formatDate(f, C, "YYYY-MM-DD");
          }
          return ce.formatDate(f, C, "YYYY-MM-DD HH:mm");
        }
      }
    }), t) {
      const f = t.getDom("candle_pane", R1.Main);
      if (f) {
        let x = document.createElement("div");
        if (x.className = "klinecharts-pro-watermark", ce.isString(e.watermark)) {
          const M = e.watermark.replace(/(^\s*)|(\s*$)/g, "");
          x.innerHTML = M;
        } else
          x.appendChild(e.watermark);
        f.appendChild(x);
      }
      const C = t.getDom("candle_pane", R1.YAxis);
      r = document.createElement("span"), r.className = "klinecharts-pro-price-unit", C == null || C.appendChild(r);
    }
    let o = !1;
    const i = () => {
      const f = A();
      if (f != null && f.ticker)
        try {
          const C = Array.from(xe.values());
          Ye.saveDrawings(f.ticker, C);
        } catch (C) {
          console.error("âŒ Error refreshing local storage:", C);
        }
    }, s = (f) => {
      o || (o = !0, f.preventDefault());
    };
    setTimeout(() => {
      n && n.addEventListener("contextmenu", s);
    }, 1e3), document.addEventListener("contextmenu", (f) => {
      n && n.contains(f.target) && s(f);
    });
    const d = t == null ? void 0 : t.removeOverlay;
    t && d && (t.removeOverlay = function(...f) {
      const C = d.apply(this, f), x = f[0];
      let M;
      if (typeof x == "string" ? M = x : x && typeof x == "object" && x.id && (M = x.id), M) {
        xe.delete(M);
        const P = Ee.get(M);
        P && (P.checkInterval && clearInterval(P.checkInterval), P.mouseUpHandler && (document.removeEventListener("mouseup", P.mouseUpHandler), document.removeEventListener("touchend", P.mouseUpHandler)), Ee.delete(M)), i();
      }
      return C;
    }), U().forEach((f) => {
      Ut(t, f, !0, {
        id: "candle_pane"
      });
    });
    const m = {};
    e.subIndicators.forEach((f) => {
      const C = Ut(t, f, !0);
      C && (m[f] = C);
    }), ue(m), t == null || t.loadMore((f) => {
      l(!0), (async () => {
        try {
          const x = F(), [M] = dn(x, f, 1), [P] = dn(x, M, 500), Y = await e.datafeed.getHistoryKLineData(A(), x, P, M);
          t == null || t.applyMoreData(Y, Y.length > 0);
        } finally {
          l(!1);
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
            $t({
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
              t == null || t.removeIndicator("candle_pane", f.indicatorName), C.splice(C.indexOf(f.indicatorName), 1), W(C), qe(f.indicatorName, "candle_pane", "main", "remove");
            } else {
              const C = {
                ...V()
              };
              t == null || t.removeIndicator(f.paneId, f.indicatorName), delete C[f.indicatorName], ue(C), qe(f.indicatorName, f.paneId, "sub", "remove");
            }
        }
    }), t == null || t.subscribeAction(T1.OnCrosshairChange, Lt), i0.forEach((f) => {
      t == null || t.subscribeAction(f, o0);
    }), Tt = window.setInterval(() => We(), 1e3), We(), document.addEventListener("mousedown", lt);
    const g = t == null ? void 0 : t.createOverlay;
    t && g && (t.createOverlay = function(...f) {
      const C = A1(f[0]), x = g.apply(this, [C, ...f.slice(1)]), M = typeof x == "string" ? x : null;
      return M && (kt(M, C.name || "unknown"), k1(M), x1()), x;
    });
  }), N1(() => {
    window.removeEventListener("resize", r0), t == null || t.unsubscribeAction(T1.OnCrosshairChange, Lt), i0.forEach((o) => {
      t == null || t.unsubscribeAction(o, o0);
    }), Tt && (window.clearInterval(Tt), Tt = void 0), St && (window.clearTimeout(St), St = void 0), document.removeEventListener("mousedown", lt), Ee.clear(), xe.clear(), z0(n);
  }), Ke(() => {
    const o = A();
    o != null && o.priceCurrency ? (r.innerHTML = o == null ? void 0 : o.priceCurrency.toLocaleUpperCase(), r.style.display = "flex") : r.style.display = "none", t == null || t.setPriceVolumePrecision((o == null ? void 0 : o.pricePrecision) ?? 2, (o == null ? void 0 : o.volumePrecision) ?? 0);
  });
  const A9 = (o) => {
    const i = new Date(o), s = i.getFullYear(), d = `${i.getMonth() + 1}`.padStart(2, "0"), m = `${i.getDate()}`.padStart(2, "0"), g = `${i.getHours()}`.padStart(2, "0"), f = `${i.getMinutes()}`.padStart(2, "0"), C = `${s}-${d}-${m}`;
    switch (F().timespan) {
      case "minute":
      case "hour":
        return `${C} ${g}:${f}`;
      case "day":
      case "week":
        return C;
      case "month":
        return C;
      case "year":
        return C;
    }
    return `${C} ${g}:${f}`;
  }, M9 = (o, i) => {
    var x, M;
    const {
      current: s
    } = o, d = i.tooltip.text.color, m = s.close > s.open ? i.bar.upColor : s.close < s.open ? i.bar.downColor : i.bar.noChangeColor, g = Math.min(Math.max(((x = A()) == null ? void 0 : x.pricePrecision) ?? 2, 0), 8), f = Math.min(Math.max(((M = A()) == null ? void 0 : M.volumePrecision) ?? 0, 0), 8), C = (P) => ({
      text: ce.formatPrecision(P, g),
      color: m
    });
    return [{
      title: "time",
      value: {
        text: A9(s.timestamp),
        color: d
      }
    }, {
      title: "open",
      value: C(s.open)
    }, {
      title: "high",
      value: C(s.high)
    }, {
      title: "low",
      value: C(s.low)
    }, {
      title: "close",
      value: C(s.close)
    }, {
      title: "volume",
      value: {
        text: ce.formatBigNumber(ce.formatPrecision(s.volume ?? i.tooltip.defaultValue, f)),
        color: m
      }
    }];
  }, Ot = () => {
    t == null || t.setStyles({
      candle: {
        tooltip: {
          custom: M9,
          rect: {
            offsetLeft: 0,
            paddingLeft: 0
          }
        }
      }
    });
  };
  return Ke((o) => {
    const i = A(), s = F();
    let d = !0;
    return N1(() => {
      d = !1;
    }), o && e.datafeed.unsubscribe(o.symbol, o.period), l(!0), fe(!0), (async () => {
      try {
        const g = Ce(), f = g.enabled && (!o || o.symbol.ticker === i.ticker || g.acrossTokens), C = f ? g.timestamp + zt(s) * 250 : (/* @__PURE__ */ new Date()).getTime(), [x, M] = dn(s, C, 500), P = await e.datafeed.getHistoryKLineData(i, s, x, M);
        if (!d)
          return;
        t == null || t.applyNewData(P, P.length > 0), f ? requestAnimationFrame(() => {
          hn(g.timestamp), Pt();
        }) : Pt(), We(), setTimeout(() => {
          d && (an(i == null ? void 0 : i.ticker), We());
        }, 0), e.datafeed.subscribe(i, s, (Y) => {
          t == null || t.updateData(Y), We();
        });
      } finally {
        d && (l(!1), fe(!1));
      }
    })(), {
      symbol: i,
      period: s
    };
  }), Ke(() => {
    const o = h();
    t == null || t.setStyles(o);
    const i = o === "dark" ? "#929AA5" : "#76808F";
    Ot(), t == null || t.setStyles({
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
  }), Ke(() => {
    t == null || t.setLocale(y());
  }), Ke(() => {
    t == null || t.setTimezone(q().key);
  }), Ke(() => {
    p() && (t == null || t.setStyles(p()), Ot(), de(R7(t.getStyles())));
  }), [um.cloneNode(!0), L(Gd, {
    get locale() {
      return e.locale;
    },
    get symbol() {
      return A();
    },
    get spread() {
      return Le();
    },
    get period() {
      return F();
    },
    get periods() {
      return e.periods;
    },
    onMenuClick: async () => {
      try {
        await r5(() => _(!Le())), t == null || t.resize();
      } catch {
      }
    },
    onSymbolClick: () => {
      Me(!ae());
    },
    get onMobilePeriodClick() {
      return e.onMobilePeriodClick;
    },
    onMobileMoreClick: () => {
      e.onMobileMoreClick ? e.onMobileMoreClick() : l1(!0);
    },
    onPeriodChange: B,
    onTimeToolsClick: () => {
      H(Date.now()), te(!0);
    },
    onIndicatorClick: () => {
      X((o) => !o);
    },
    onTimezoneClick: () => {
      j((o) => !o);
    },
    onSettingClick: () => {
      be((o) => !o);
    },
    onScreenshotClick: () => {
      if (t) {
        const o = e.screenshotBackgroundColor || (e.theme === "dark" ? "#11131E" : "#ffffff"), i = t.getConvertPictureUrl(!0, "jpeg", o);
        _e(i);
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
      return Ie();
    },
    onOrderToolsStateChange: L1
  }), (() => {
    const o = dm.cloneNode(!0), i = o.firstChild;
    return o.addEventListener("mouseleave", () => {
      $1(null), Ze(!1);
    }), v(o, L(J, {
      get when() {
        return s1();
      },
      get children() {
        return L(h9, {});
      }
    }), i), v(o, L(J, {
      get when() {
        return Le();
      },
      get children() {
        return L(Mf, {
          get locale() {
            return e.locale;
          },
          onDrawingItemClick: (s) => {
            t == null || t.createOverlay(A1(s));
          },
          onModeChange: (s) => {
            t == null || t.overrideOverlay({
              mode: s
            });
          },
          onLockChange: (s) => {
            t == null || t.overrideOverlay({
              lock: s
            });
          },
          onVisibleChange: (s) => {
            t == null || t.overrideOverlay({
              visible: s
            });
          },
          onRemoveClick: (s) => {
            t == null || t.removeOverlay({
              groupId: s
            });
          }
        });
      }
    }), i), D1((s) => n = s, i), v(o, L(J, {
      get when() {
        return ot();
      },
      keyed: !0,
      children: (s) => (() => {
        const d = hm.cloneNode(!0);
        return v(d, () => s.text), I((m) => {
          const g = `${s.left}px`, f = `${s.top}px`;
          return g !== m._v$ && d.style.setProperty("left", m._v$ = g), f !== m._v$2 && d.style.setProperty("top", m._v$2 = f), m;
        }, {
          _v$: void 0,
          _v$2: void 0
        }), d;
      })()
    }), null), v(o, L(J, {
      get when() {
        return vt();
      },
      keyed: !0,
      children: (s) => (() => {
        const d = fm.cloneNode(!0), m = d.firstChild, g = m.nextSibling;
        return d.style.setProperty("right", "0px"), v(m, () => s.priceText), v(g, () => s.text), I((f) => {
          const C = `${s.top}px`, x = `${s.width}px`, M = s.color, P = `${s.borderRadius}px`, Y = s.textFamily, ne = s.textWeight, ee = `${s.paddingLeft}px`, Q = `${s.paddingRight}px`, G = `${s.paddingTop}px`, me = `${s.paddingBottom}px`, Be = `${s.textSize}px`, K = `${Math.max(10, s.textSize - 1)}px`;
          return C !== f._v$3 && d.style.setProperty("top", f._v$3 = C), x !== f._v$4 && d.style.setProperty("width", f._v$4 = x), M !== f._v$5 && d.style.setProperty("background", f._v$5 = M), P !== f._v$6 && d.style.setProperty("border-radius", f._v$6 = P), Y !== f._v$7 && d.style.setProperty("font-family", f._v$7 = Y), ne !== f._v$8 && d.style.setProperty("font-weight", f._v$8 = ne), ee !== f._v$9 && d.style.setProperty("padding-left", f._v$9 = ee), Q !== f._v$10 && d.style.setProperty("padding-right", f._v$10 = Q), G !== f._v$11 && d.style.setProperty("padding-top", f._v$11 = G), me !== f._v$12 && d.style.setProperty("padding-bottom", f._v$12 = me), Be !== f._v$13 && m.style.setProperty("font-size", f._v$13 = Be), K !== f._v$14 && g.style.setProperty("font-size", f._v$14 = K), f;
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
        }), d;
      })()
    }), null), v(o, L(J, {
      get when() {
        return ze();
      },
      keyed: !0,
      children: (s) => (() => {
        const d = pm.cloneNode(!0), m = d.firstChild, g = m.nextSibling, f = g.nextSibling, C = f.firstChild, x = f.nextSibling, M = x.firstChild, P = M.firstChild, Y = P.nextSibling, ne = Y.firstChild, ee = x.nextSibling, Q = ee.firstChild, G = ee.nextSibling, me = G.nextSibling, Be = me.nextSibling;
        return d.$$click = (K) => {
          K.stopPropagation();
        }, d.$$mousedown = (K) => {
          K.preventDefault(), K.stopPropagation();
        }, m.$$mousedown = At, g.$$click = n1, C.$$click = () => je(He() === "color" ? null : "color"), v(f, L(J, {
          get when() {
            return He() === "color";
          },
          get children() {
            const K = mm.cloneNode(!0), $e = K.firstChild;
            return v($e, L(bn, {
              each: it,
              children: (le) => (() => {
                const ke = vm.cloneNode(!0);
                return ke.$$click = () => M1(le), ke.style.setProperty("background", le), I(() => oe(ke, `overlay-toolbar-color-swatch ${s.color.toLowerCase() === le.toLowerCase() ? "selected" : ""}`)), ke;
              })()
            })), K;
          }
        }), null), M.$$click = () => je(He() === "width" ? null : "width"), v(Y, () => s.lineSize, ne), v(x, L(J, {
          get when() {
            return He() === "width";
          },
          get children() {
            const K = gm.cloneNode(!0);
            return v(K, L(bn, {
              each: [1, 2, 3, 4],
              children: ($e) => (() => {
                const le = Cm.cloneNode(!0), ke = le.firstChild;
                return le.$$click = () => Te($e), ke.style.setProperty("height", `${$e}px`), I(() => oe(le, s.lineSize === $e ? "selected" : "")), le;
              })()
            })), K;
          }
        }), null), Q.$$click = () => je(He() === "style" ? null : "style"), v(ee, L(J, {
          get when() {
            return He() === "style";
          },
          get children() {
            const K = ym.cloneNode(!0), $e = K.firstChild, le = $e.nextSibling, ke = le.nextSibling;
            return $e.$$click = () => Se(o1.Solid, []), le.$$click = () => Se(o1.Dashed, [6, 4]), ke.$$click = () => Se(o1.Dashed, [2, 4]), I((we) => {
              var Je, e1;
              const Ge = s.lineStyle === o1.Solid ? "selected" : "", Xe = s.lineStyle === o1.Dashed && ((Je = s.dashedValue) == null ? void 0 : Je[0]) === 6 ? "selected" : "", r1 = s.lineStyle === o1.Dashed && ((e1 = s.dashedValue) == null ? void 0 : e1[0]) === 2 ? "selected" : "";
              return Ge !== we._v$15 && oe($e, we._v$15 = Ge), Xe !== we._v$16 && oe(le, we._v$16 = Xe), r1 !== we._v$17 && oe(ke, we._v$17 = r1), we;
            }, {
              _v$15: void 0,
              _v$16: void 0,
              _v$17: void 0
            }), K;
          }
        }), null), G.$$click = S, me.$$click = b, Be.$$click = cn, I((K) => {
          const $e = `${s.x}px`, le = `${s.y}px`, ke = `overlay-toolbar-icon edit ${He() === "color" ? "active" : ""}`, we = `overlay-toolbar-line-size ${He() === "width" ? "active" : ""}`, Ge = `overlay-toolbar-icon minus ${He() === "style" ? "active" : ""}`, Xe = `overlay-toolbar-icon visibility ${s.visible ? "" : "muted"}`, r1 = s.visible ? "Hide" : "Show", Je = `overlay-toolbar-icon lock ${s.locked ? "active" : ""}`, e1 = s.locked ? "Unlock" : "Lock";
          return $e !== K._v$18 && d.style.setProperty("left", K._v$18 = $e), le !== K._v$19 && d.style.setProperty("top", K._v$19 = le), ke !== K._v$20 && oe(C, K._v$20 = ke), we !== K._v$21 && oe(M, K._v$21 = we), Ge !== K._v$22 && oe(Q, K._v$22 = Ge), Xe !== K._v$23 && oe(G, K._v$23 = Xe), r1 !== K._v$24 && Pe(G, "title", K._v$24 = r1), Je !== K._v$25 && oe(me, K._v$25 = Je), e1 !== K._v$26 && Pe(me, "title", K._v$26 = e1), K;
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
        }), d;
      })()
    }), null), v(o, L(J, {
      get when() {
        return B1();
      },
      keyed: !0,
      children: (s) => (() => {
        const d = $m.cloneNode(!0), m = d.firstChild;
        return d.addEventListener("mouseleave", () => {
          b1() || Ze(!1);
        }), d.$$mousemove = (g) => {
          g.stopPropagation(), c1();
        }, d.addEventListener("mouseenter", () => {
          Ze(!0), c1();
        }), m.$$click = (g) => {
          g.stopPropagation(), Ze(!0), _1({
            y: s.y,
            price: s.price,
            yAxisWidth: tt()
          }), t1(!0), c1();
        }, m.$$mousedown = (g) => {
          g.preventDefault(), g.stopPropagation(), c1();
        }, v(m, (() => {
          const g = Z(() => {
            var f;
            return !!((f = e.orderTools) != null && f.quickOrderPlusIcon);
          });
          return () => g() ? (() => {
            const f = bm.cloneNode(!0);
            return I(() => f.innerHTML = e.orderTools.quickOrderPlusIcon), f;
          })() : _m.cloneNode(!0);
        })()), I((g) => {
          const f = `${Math.max(0, s.y - 12)}px`, C = `${tt()}px`, x = Ie().quickOrderPlusButton ? "block" : "none";
          return f !== g._v$27 && d.style.setProperty("top", g._v$27 = f), C !== g._v$28 && d.style.setProperty("right", g._v$28 = C), x !== g._v$29 && d.style.setProperty("display", g._v$29 = x), g;
        }, {
          _v$27: void 0,
          _v$28: void 0,
          _v$29: void 0
        }), d;
      })()
    }), null), v(o, L(J, {
      get when() {
        return Z(() => !!b1())() && g1();
      },
      keyed: !0,
      children: (s) => (() => {
        const d = km.cloneNode(!0), m = d.firstChild, g = m.firstChild, f = g.firstChild, C = f.nextSibling, x = C.nextSibling, M = x.nextSibling;
        M.nextSibling;
        const P = g.nextSibling, Y = P.firstChild, ne = Y.nextSibling, ee = ne.nextSibling, Q = ee.nextSibling;
        Q.nextSibling;
        const G = P.nextSibling, me = G.nextSibling, Be = me.firstChild, K = Be.nextSibling;
        K.nextSibling;
        const $e = me.nextSibling;
        return $e.firstChild, d.addEventListener("mouseleave", () => Ze(!1)), d.addEventListener("mouseenter", () => Ze(!0)), m.$$mousemove = () => {
          c1();
        }, m.$$mousedown = (le) => {
          le.preventDefault(), le.stopPropagation(), c1();
        }, g.$$click = () => K1("limit"), v(g, () => A().shortName ?? A().name ?? A().ticker, C), v(g, () => w1(s.price), M), P.$$click = () => K1("stop"), v(P, () => A().shortName ?? A().name ?? A().ticker, ne), v(P, () => w1(s.price), Q), G.$$click = () => K1("create"), me.$$click = sn, v(me, () => w1(s.price), K), $e.$$click = wt, v($e, () => w1(s.price), null), I((le) => {
          const ke = `${Math.max(0, s.y + 24)}px`, we = `${s.yAxisWidth + rt}px`;
          return ke !== le._v$30 && d.style.setProperty("top", le._v$30 = ke), we !== le._v$31 && d.style.setProperty("right", le._v$31 = we), le;
        }, {
          _v$30: void 0,
          _v$31: void 0
        }), d;
      })()
    }), null), I(() => Pe(i, "data-drawing-bar-visible", Le())), o;
  })(), L(J, {
    get when() {
      return ae();
    },
    get children() {
      return L(Qf, {
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
          Me(!1);
        }
      });
    }
  }), L(J, {
    get when() {
      return R();
    },
    get children() {
      return L(Tf, {
        get locale() {
          return e.locale;
        },
        get mainIndicators() {
          return U();
        },
        get subIndicators() {
          return V();
        },
        onClose: () => {
          X(!1);
        },
        onMainIndicatorChange: (o) => {
          const i = [...U()];
          o.added ? (Ut(t, o.name, !0, {
            id: "candle_pane"
          }), i.push(o.name), qe(o.name, "candle_pane", "main", "add")) : (t == null || t.removeIndicator("candle_pane", o.name), i.splice(i.indexOf(o.name), 1), qe(o.name, "candle_pane", "main", "remove")), W(i);
        },
        onSubIndicatorChange: (o) => {
          const i = {
            ...V()
          };
          if (o.added) {
            const s = Ut(t, o.name);
            s && (i[o.name] = s, qe(o.name, s, "sub", "add"));
          } else
            o.paneId && (t == null || t.removeIndicator(o.paneId, o.name), delete i[o.name], qe(o.name, o.paneId, "sub", "remove"));
          ue(i);
        }
      });
    }
  }), L(J, {
    get when() {
      return z();
    },
    get children() {
      return L(Pf, {
        get locale() {
          return e.locale;
        },
        get timezone() {
          return q();
        },
        onClose: () => {
          j(!1);
        },
        onConfirm: re
      });
    }
  }), L(J, {
    get when() {
      return ie();
    },
    get children() {
      return L(Nf, {
        get locale() {
          return e.locale;
        },
        get currentStyles() {
          return ce.clone(t.getStyles());
        },
        onClose: () => {
          be(!1);
        },
        onChange: (o) => {
          t == null || t.setStyles(o), Ot();
        },
        onRestoreDefault: (o) => {
          const i = {};
          o.forEach((s) => {
            const d = s.key;
            kn(i, d, ce.formatValue(Oe(), d));
          }), t == null || t.setStyles(i), Ot();
        }
      });
    }
  }), L(J, {
    get when() {
      return Ue().length > 0;
    },
    get children() {
      return L(Ef, {
        get locale() {
          return e.locale;
        },
        get url() {
          return Ue();
        },
        onClose: () => {
          _e("");
        }
      });
    }
  }), L(J, {
    get when() {
      return ve();
    },
    get children() {
      return L(cm, {
        get initialTimestamp() {
          return he();
        },
        get initialRange() {
          return N();
        },
        get anchorSettings() {
          return Ce();
        },
        onClose: () => {
          te(!1);
        },
        onGoToDate: L9,
        onTimeRange: (o) => {
          l0(o);
        },
        onTimeAnchorChange: w9
      });
    }
  }), L(J, {
    get when() {
      return z1().visible;
    },
    get children() {
      return L(zf, {
        get locale() {
          return e.locale;
        },
        get params() {
          return z1();
        },
        onClose: () => {
          $t({
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
          const s = i.paneId === "candle_pane" ? "main" : "sub";
          qe(i.indicatorName, i.paneId, s, "change");
        }
      });
    }
  }), L(J, {
    get when() {
      return m1();
    },
    get children() {
      return L(Vf, {
        get locale() {
          return e.locale;
        },
        onIndicatorClick: () => {
          X(!0);
        },
        onTimezoneClick: () => {
          j(!0);
        },
        onSettingClick: () => {
          be(!0);
        },
        onClose: () => {
          l1(!1);
        }
      });
    }
  })];
};
Qe(["mousedown", "click", "mousemove"]);
const wm = /* @__PURE__ */ $('<svg class="logo" viewBox="0 0 80 92"><path d="M28.148808359375,51.7280513671875L22.963588359375,51.7280513671875C21.572648359375002,51.7280513671875,20.445068359375,52.6220613671875,20.445068359375,53.7248813671875L20.445068359375,72.3979013671875C20.445068359375,73.5007013671875,21.572648359375002,74.39470136718751,22.963588359375,74.39470136718751L33.926568359375,74.39470136718751C35.317468359375,74.39470136718751,36.445068359375,73.5007013671875,36.445068359375,72.3979013671875L36.445068359375,53.7248813671875C36.445068359375,52.6220613671875,35.317468359375,51.7280513671875,33.926568359375,51.7280513671875L28.741398359374998,51.7280513671875L28.741398359374998,46.2963223671875C28.741398359374998,46.1665793671875,28.608748359375,46.0614013671875,28.445108359375,46.0614013671875C28.281468359375,46.0614013671875,28.148808359375,46.1665793671875,28.148808359375,46.2963223671875L28.148808359375,51.7280513671875ZM28.741398359374998,74.3948013671875L28.741398359374998,79.82650136718749C28.741398359374998,79.9563013671875,28.608748359375,80.0614013671875,28.445108359375,80.0614013671875C28.281468359375,80.0614013671875,28.148808359375,79.9563013671875,28.148808359375,79.82650136718749L28.148808359375,74.3948013671875L28.741398359374998,74.3948013671875Z"></path><path d="M51.148808359374996,44.7280513671875L45.963588359375,44.7280513671875C44.572648359375,44.7280513671875,43.445068359375,45.6220613671875,43.445068359375,46.7248813671875L43.445068359375,65.3979013671875C43.445068359375,66.5007013671875,44.572648359375,67.39470136718751,45.963588359375,67.39470136718751L56.926568359375,67.39470136718751C58.317468359375,67.39470136718751,59.445068359375,66.5007013671875,59.445068359375,65.3979013671875L59.445068359375,46.7248813671875C59.445068359375,45.6220613671875,58.317468359375,44.7280513671875,56.926568359375,44.7280513671875L51.741398359375,44.7280513671875L51.741398359375,39.2963223671875C51.741398359375,39.1665793671875,51.608748359375,39.0614013671875,51.445108359375,39.0614013671875C51.281468359375,39.0614013671875,51.148808359374996,39.1665793671875,51.148808359374996,39.2963223671875L51.148808359374996,44.7280513671875ZM51.741398359375,67.3948013671875L51.741398359375,72.82650136718749C51.741398359375,72.9563013671875,51.608748359375,73.0614013671875,51.445108359375,73.0614013671875C51.281468359375,73.0614013671875,51.148808359374996,72.9563013671875,51.148808359374996,72.82650136718749L51.148808359374996,67.3948013671875L51.741398359375,67.3948013671875Z"></path><path d="M17.7274,90.6541C17.5901,90.6541,17.4517,90.6436,17.3121,90.6225C9.93219,89.5095,4.80718,86.7136,2.07787,82.3084C-1.1223,77.1437,0.241766,71.6314,0.56829,70.5137C5.37624,46.647,15.0785,38.4945,21.5025,33.0957C22.9683,31.8633,24.2342,30.7995,25.1676,29.7672C25.4105,29.4984,25.6051,29.2154,25.7556,28.9202C24.7465,29.2231,24.1971,29.4326,24.1703,29.4429C22.908,29.9368,21.4777,29.3247,20.9761,28.076C20.4756,26.8272,21.0897,25.4146,22.352,24.9172C22.5042,24.8571,23.5312,24.4607,25.3073,23.9616C24.087,21.4425,21.7693,18.7949,19.7125,16.6431L19.2819,16.1902C16.2438,12.9776,14.6017,4.80159,14.3036,3.19471C14.1306,2.26212,14.4636,1.30796,15.1814,0.679657C15.8995,0.0512175,16.8976,-0.159672,17.8125,0.123747C22.7731,1.66274,24.2638,1.81255,27.2321,2.11098C28.7357,2.26195,29.83,3.59029,29.6762,5.07662C29.5236,6.56295,28.182,7.64786,26.6784,7.49454C24.4992,7.27569,22.9517,7.09896,20.724,6.56646C21.4493,9.09088,22.3803,11.5427,23.2771,12.4919L23.6876,12.9237C25.3757,14.69,28.9691,18.45,30.7016,22.7299C35.0392,21.9433,40.8791,21.3359,47.7817,21.7249C48.2004,20.7386,48.8054,19.7953,49.5907,18.9135C49.7137,18.7754,49.8498,18.6502,49.9988,18.539C53.6142,15.8508,57.5491,12.857,59.7803,11.0758C58.1028,11.2502,56.1034,11.0278,53.9124,9.70882C53.2439,9.30622,52.5992,8.89427,51.9662,8.48933C48.4668,6.25164,46.497,5.12109,43.4234,5.94853C41.9647,6.34058,40.4622,5.48975,40.0659,4.04789C39.6695,2.60604,40.5296,1.11853,41.9871,0.726471C47.5602,-0.773825,51.4796,1.73271,54.9364,3.9434L54.9364,3.9434C55.5284,4.32176,56.1318,4.70797,56.7564,5.08482C58.3843,6.06556,59.4858,5.76127,61.2899,5.13865C62.3511,4.77234,63.5567,4.35687,64.8675,4.53476C66.3321,4.73254,67.4406,5.56933,67.9103,6.83096C68.7444,9.07333,67.1035,11.5533,65.5797,13.2374C64.6729,14.2394,60.0845,17.7606,56.4519,20.4957C56.9477,20.3369,57.4767,20.2511,58.026,20.2511C59.4281,20.2511,60.6982,20.8102,61.621,21.7153C65.4948,20.6901,67.87,17.9563,67.9033,17.9175C68.78,16.8888,70.3322,16.7577,71.3721,17.6226C72.412,18.4886,72.5457,20.0253,71.6702,21.054C71.5221,21.2286,69.5063,23.5492,66.0787,25.233C69.5399,26.8822,72.9993,29.682,74.1841,34.4145C74.5106,35.7206,73.7062,37.0407,72.3859,37.3638C72.1871,37.4117,71.9884,37.4351,71.792,37.4351C70.687,37.4351,69.6826,36.6932,69.4046,35.5848C68.4378,31.7217,64.8144,29.7431,61.7619,28.7456C60.8298,29.7349,59.5009,30.3535,58.026,30.3535C55.8642,30.3535,54.0162,29.0245,53.2713,27.1474C53.2022,27.138,53.1331,27.1287,53.0642,27.1195C54.232,29.5936,57.0851,31.9259,58.1868,32.665C58.3157,32.7516,58.4423,32.8523,58.5547,32.9599C66.5865,40.6151,72.4887,48.8133,76.0971,57.3287C76.6815,58.7074,76.0249,60.2932,74.6313,60.8702C74.2976,61.01,73.9388,61.082,73.576,61.082C72.5065,61.082,71.4914,60.4582,71.0525,59.4213C67.7577,51.6455,62.331,44.1074,54.9203,37.0116C53.6073,36.1009,48.0984,31.9917,47.2065,26.583C40.9421,26.2679,35.6187,26.8278,31.6725,27.5336C31.6197,29.527,30.9225,31.5172,29.2456,33.3731C28.0614,34.6827,26.5968,35.915,25.0446,37.2188C21.9414,39.8269,18.2648,42.9169,14.8104,48.1192C11.356,53.3215,8.12389,60.6361,5.9098,71.6934C5.88732,71.8035,5.85893,71.9123,5.82344,72.0188C5.81634,72.041,4.57886,76.0413,6.77344,79.5289C8.6332,82.4828,12.4557,84.4139,18.1367,85.2705C19.6297,85.4953,20.6566,86.8762,20.4295,88.3532C20.2213,89.6944,19.0559,90.6541,17.7274,90.6541ZM35.1195,7.03101C33.3502,7.03101,31.9158,5.61208,31.9158,3.86173C31.9158,2.11139,33.3502,0.69245,35.1195,0.69245C36.8889,0.69245,38.3233,2.11139,38.3233,3.86173C38.3233,5.61208,36.8889,7.03101,35.1195,7.03101ZM57.6848,23.1892L58.414,24.4754C58.8984,24.3623,59.3923,24.3435,59.8644,24.4203C60.2191,24.5005,60.5087,24.7182,60.6663,25.0229C60.8636,25.3394,60.8993,25.7346,60.7646,26.1094C60.5988,26.5176,60.2972,26.8749,59.9085,27.1235L60.31,27.8316L59.7886,28.1294L59.3994,27.443C58.9257,27.7175,58.399,27.883,57.8664,27.9247L57.3744,27.0569C57.6378,27.0741,57.9071,27.048,58.1704,26.9797C58.4501,26.9251,58.7239,26.8323,58.9829,26.7044L58.2801,25.4647C57.8047,25.5877,57.3167,25.6065,56.8549,25.5197C56.4913,25.4263,56.196,25.1971,56.0328,24.8814C55.8433,24.5561,55.8127,24.1572,55.9484,23.7789C56.088,23.373,56.3763,23.0149,56.7584,22.7726L56.4166,22.1699L56.938,21.8721L57.2727,22.4625C57.6615,22.2376,58.0888,22.0901,58.5254,22.0301L59.0042,22.8746C58.5548,22.8828,58.103,22.9906,57.6848,23.1892ZM56.9319,24.2961Q57.1278,24.6417,57.7863,24.5856L57.1695,23.4978Q56.6982,23.884,56.9319,24.2961ZM58.9077,25.3462L59.4981,26.3875L59.499,26.3891Q59.9965,26.0045,59.7628,25.5923Q59.573,25.2576,58.9077,25.3462ZM73.2212,66.5065C73.2212,68.2569,74.6555,69.6758,76.4249,69.6758C78.1943,69.6758,79.6286,68.2569,79.6286,66.5065C79.6286,64.7562,78.1943,63.3372,76.4249,63.3372C74.6555,63.3372,73.2212,64.7562,73.2212,66.5065ZM35.9465,91.8045C35.0734,91.8045,34.2038,91.7987,33.3378,91.7858C31.827,91.7636,30.6203,90.5359,30.6428,89.0402C30.6653,87.5457,31.9158,86.3297,33.4183,86.3742C49.6344,86.6059,65.7512,84.6175,67.6134,84.037C72.1953,82.4184,74.5295,79.3603,74.5295,74.9575C74.5295,73.463,75.754,72.2517,77.2648,72.2517C78.7755,72.2517,80,73.463,80,74.9575C80,81.5992,76.148,86.7686,69.4317,89.142C67.0041,89.9999,51.0955,91.8046,35.9465,91.8045ZM25.2731,92C23.5037,92,22.0693,90.5811,22.0693,88.8307C22.0693,87.0804,23.5037,85.6615,25.2731,85.6615C27.0424,85.6615,28.4768,87.0804,28.4768,88.8307C28.4768,90.5811,27.0424,92,25.2731,92Z"></path></svg>'), Am = wm.cloneNode(!0);
class Om {
  constructor(n) {
    dt(this, "_chartApi", null);
    if (ce.isString(n.container)) {
      if (this._container = document.getElementById(n.container), !this._container)
        throw new Error("Container is null");
    } else
      this._container = n.container;
    this._container.classList.add("klinecharts-pro"), this._container.setAttribute("data-theme", n.theme ?? "light");
    const t = this;
    h5(() => L(Lm, {
      ref: (r) => {
        t._chartApi = r;
      },
      get styles() {
        return n.styles ?? {};
      },
      get watermark() {
        return n.watermark ?? Am;
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
X9.forEach((e) => {
  N9(e);
});
export {
  Sm as DefaultDatafeed,
  Om as KLineChartPro,
  Pm as loadLocales
};
//# sourceMappingURL=klinecharts-pro.js.map
