var Q9 = Object.defineProperty;
var Z9 = (e, t, r) => t in e ? Q9(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var dt = (e, t, r) => (Z9(e, typeof t != "symbol" ? t + "" : t, r), r);
import { utils as fe, OverlayMode as vn, ActionType as S1, LineType as d1, init as V9, FormatDateType as Ut, DomPosition as h1, dispose as W0, TooltipIconPosition as zt, CandleType as H9, YAxisType as q9, registerOverlay as Y9 } from "klinecharts";
function ft(e, t, r) {
  const n = (e.x - t.x) * Math.cos(r) - (e.y - t.y) * Math.sin(r) + t.x, s = (e.x - t.x) * Math.sin(r) + (e.y - t.y) * Math.cos(r) + t.y;
  return { x: n, y: s };
}
function kn(e, t) {
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
      y: fe.getLinearYFromCoordinates(e[0], e[1], { x: 0, y: e[0].y })
    } : r = {
      x: t.width,
      y: fe.getLinearYFromCoordinates(e[0], e[1], { x: t.width, y: e[0].y })
    }, { coordinates: [e[0], r] };
  }
  return [];
}
function zr(e, t) {
  const r = Math.abs(e.x - t.x), n = Math.abs(e.y - t.y);
  return Math.sqrt(r * r + n * n);
}
const W9 = {
  name: "arrow",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = e[1].x > e[0].x ? 0 : 1, r = fe.getLinearSlopeIntercept(e[0], e[1]);
      let n;
      r ? n = Math.atan(r[0]) + Math.PI * t : e[1].y > e[0].y ? n = Math.PI / 2 : n = Math.PI / 2 * 3;
      const s = ft({ x: e[1].x - 8, y: e[1].y + 4 }, e[1], n), l = ft({ x: e[1].x - 8, y: e[1].y - 4 }, e[1], n);
      return [
        {
          type: "line",
          attrs: { coordinates: e }
        },
        {
          type: "line",
          ignoreEvent: !0,
          attrs: { coordinates: [s, e[1], l] }
        }
      ];
    }
    return [];
  }
}, G9 = {
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
      const t = zr(e[0], e[1]);
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
}, X9 = {
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
}, J9 = {
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
}, e5 = {
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
}, t5 = {
  name: "fibonacciCircle",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = Math.abs(e[0].x - e[1].x), r = Math.abs(e[0].y - e[1].y), n = Math.sqrt(t * t + r * r), s = [0.236, 0.382, 0.5, 0.618, 0.786, 1], l = [], h = [];
      return s.forEach((d) => {
        const p = n * d;
        l.push(
          { ...e[0], r: p }
        ), h.push({
          x: e[0].x,
          y: e[0].y + p + 6,
          text: `${(d * 100).toFixed(1)}%`
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
}, n5 = {
  name: "fibonacciSegment",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: r }) => {
    const n = [], s = [];
    if (e.length > 1) {
      const l = e[1].x > e[0].x ? e[0].x : e[1].x, h = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0], d = e[0].y - e[1].y, p = t.points, x = p[0].value - p[1].value;
      h.forEach((v) => {
        const L = e[1].y + d * v, D = (p[1].value + x * v).toFixed(r.price);
        n.push({ coordinates: [{ x: e[0].x, y: L }, { x: e[1].x, y: L }] }), s.push({
          x: l,
          y: L,
          text: `${D} (${(v * 100).toFixed(1)}%)`,
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
        attrs: s
      }
    ];
  }
}, r5 = {
  name: "fibonacciSpiral",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, bounding: t }) => {
    if (e.length > 1) {
      const r = zr(e[0], e[1]) / Math.sqrt(24), n = e[1].x > e[0].x ? 0 : 1, s = fe.getLinearSlopeIntercept(e[0], e[1]);
      let l;
      s ? l = Math.atan(s[0]) + Math.PI * n : e[1].y > e[0].y ? l = Math.PI / 2 : l = Math.PI / 2 * 3;
      const h = ft(
        { x: e[0].x - r, y: e[0].y },
        e[0],
        l
      ), d = ft(
        { x: e[0].x - r, y: e[0].y - r },
        e[0],
        l
      ), p = [{
        ...h,
        r,
        startAngle: l,
        endAngle: l + Math.PI / 2
      }, {
        ...d,
        r: r * 2,
        startAngle: l + Math.PI / 2,
        endAngle: l + Math.PI
      }];
      let x = e[0].x - r, v = e[0].y - r;
      for (let L = 2; L < 9; L++) {
        const D = p[L - 2].r + p[L - 1].r;
        let M = 0;
        switch (L % 4) {
          case 0: {
            M = l, x -= p[L - 2].r;
            break;
          }
          case 1: {
            M = l + Math.PI / 2, v -= p[L - 2].r;
            break;
          }
          case 2: {
            M = l + Math.PI, x += p[L - 2].r;
            break;
          }
          case 3: {
            M = l + Math.PI / 2 * 3, v += p[L - 2].r;
            break;
          }
        }
        const q = M + Math.PI / 2, N = ft({ x, y: v }, e[0], l);
        p.push({
          ...N,
          r: D,
          startAngle: M,
          endAngle: q
        });
      }
      return [
        {
          type: "arc",
          attrs: p
        },
        {
          type: "line",
          attrs: kn(e, t)
        }
      ];
    }
    return [];
  }
}, o5 = {
  name: "fibonacciSpeedResistanceFan",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, bounding: t }) => {
    const r = [];
    let n = [];
    const s = [];
    if (e.length > 1) {
      const l = e[1].x > e[0].x ? -38 : 4, h = e[1].y > e[0].y ? -2 : 20, d = e[1].x - e[0].x, p = e[1].y - e[0].y;
      [1, 0.75, 0.618, 0.5, 0.382, 0.25, 0].forEach((v) => {
        const L = e[1].x - d * v, D = e[1].y - p * v;
        r.push({ coordinates: [{ x: L, y: e[0].y }, { x: L, y: e[1].y }] }), r.push({ coordinates: [{ x: e[0].x, y: D }, { x: e[1].x, y: D }] }), n = n.concat(kn([e[0], { x: L, y: e[1].y }], t)), n = n.concat(kn([e[0], { x: e[1].x, y: D }], t)), s.unshift({
          x: e[0].x + l,
          y: D + 10,
          text: `${v.toFixed(3)}`
        }), s.unshift({
          x: L - 18,
          y: e[0].y + h,
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
        attrs: s
      }
    ];
  }
}, i5 = {
  name: "fibonacciExtension",
  totalStep: 4,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: r }) => {
    const n = [], s = [];
    if (e.length > 2) {
      const l = t.points, h = l[1].value - l[0].value, d = e[1].y - e[0].y, p = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1], x = e[2].x > e[1].x ? e[1].x : e[2].x;
      p.forEach((v) => {
        const L = e[2].y + d * v, D = (l[2].value + h * v).toFixed(r.price);
        n.push({ coordinates: [{ x: e[1].x, y: L }, { x: e[2].x, y: L }] }), s.push({
          x,
          y: L,
          text: `${D} (${(v * 100).toFixed(1)}%)`,
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
        attrs: s
      }
    ];
  }
}, a5 = {
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
      ], s = [
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
          attrs: s
        }
      ];
    }
    return [];
  }
}, s5 = {
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
}, l5 = {
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
}, c5 = {
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
}, u5 = {
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
}, d5 = {
  name: "abcd",
  totalStep: 5,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    let t = [], r = [];
    const n = ["A", "B", "C", "D"], s = e.map((l, h) => ({
      ...l,
      baseline: "bottom",
      text: `(${n[h]})`
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
        attrs: s
      }
    ];
  }
}, h5 = {
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
    const r = [], n = [], s = ["X", "A", "B", "C", "D"], l = e.map((h, d) => ({
      ...h,
      baseline: "bottom",
      text: `(${s[d]})`
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
        attrs: l
      }
    ];
  }
}, f5 = [
  W9,
  G9,
  X9,
  e5,
  J9,
  t5,
  n5,
  r5,
  o5,
  i5,
  a5,
  s5,
  l5,
  c5,
  u5,
  d5,
  h5
];
class Hm {
  constructor(t) {
    dt(this, "_apiKey");
    dt(this, "_prevSymbolMarket");
    dt(this, "_ws");
    this._apiKey = t;
  }
  async searchSymbols(t) {
    return await ((await (await fetch(`https://api.polygon.io/v3/reference/tickers?apiKey=${this._apiKey}&active=true&search=${t ?? ""}`)).json()).results || []).map((s) => ({
      ticker: s.ticker,
      name: s.name,
      shortName: s.ticker,
      market: s.market,
      exchange: s.primary_exchange,
      priceCurrency: s.currency_name,
      type: s.type,
      logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAA66SURBVHic7Z17cFTVGcB/527AiKGgRA0ShGhKoQjFMb4qUMCMPIrWqdbHSEdlHDGgI9V2aq2d1hmKtVbRsSTGEcQRp4pStaZQlNYUwYLiSKU0SCMBDRCmoQSJGGF3T/84d2VZk+w9d899hf3NMBnl3ns+5vtyHt/5HoIehpQIaijDYjiSciRlwCCgBCgG+gNFQCGCAvUScaADaAfagFagBdiFoAlBI0m2UkWTEMgA/lmeIYIWIFdkLQNJMBbBJUjOA8agFOwF7cAmBO8hWUeMtWIWezwayxciZwByGb1pZTyCaUguA0YGLNIWBK8jWUExa8Q1HA5YHi0iYQByGTH2UYnkBmA6cHLQMnXBfqAOwXMMYLW4hkTQAmUj1AYgqzkLuAXBTUgGBi2PFoI9SJYAT4nZbA9anK4IpQHIhUzE4i4k04OWxQiCOpI8IubwZtCiZBIqA5A1TEdyH3Bh0LJ4xAYE80QVdUELkiIUBiCf4FIk85FcELQsviB4B8G94jb+GrwoASKfZBgJHkUyNUg5AkOwkhhzxa1sC06EAJALKUJwL3A30DsIGULEYeBhJPPFHNr9Htx3A5A1TECyGCjze+yQ04Rgpqii3s9BfTMAWUsfksxD8iO/xowkggVY3Cdmccif4XxAPskw4rwCjPBjvB5AAwVc6cfewPJ6AFnNzcTZSF75OowgzkZZzc1eD+SZAUiJkNX8FlgM9PVqnB5MX2CxrOa3Uno3U3vyYVlLPxIshR7iyQueOmLMELM4YPrDxg1A1jKQJKuQjDL97eMawWYsJpu+fjZqAPL3DMFiNVBu8rt5vqSRJJXidnaa+qAxA5CPU0aMvwFDTX0zT6fsIMEkcQdNJj5mxADs3/x68sr3ix0kmWBiJsjZAOyQrDXkp32/aSTG+Fz3BDkZgKylH0neym/4AkJtDMflcjpw7QeQEkGCpXnlB4hkFAmW5uIncO8IquFB8uf8MDDd1oUrXFmO7aJc7HbQPJ4wU8zmad2XtA3AvtjZSN69GzYOUkCF7gWSlgHIWvqQyF/shJgGYlToXCXr7QGSzCOv/DAzwtaRYxzPAHYkT+jCmvN0gmCi08giRwZgx/B9QD6MKyo0IRntJMbQ2RKgAjjzyo8OZbbOspJ1BrB3/ZvJR+9GjcMUMCrbqSD7DJDgUfLKjyK9bd11S7czgHyCS0my2pxMIaHvUCgshl5FUFQKQtWJ4FALHGmHz5rhizY43BaomEawqOwuA6mg25cl840L5DexQiithNMvhNMvglMr4IT+zt5t3QS762H332FXfTQNQumwy1zLLmcAO1HzNU+E8oNTK+AbN8KwGc4V3h3JODS9Av98GPauz/17fiK4vKuE1K4NoJr1RDFLd+BY+PYCOK3CuzH2rof3fg07Q5Pkm40NYjYXdfYXnRqAXMhEBH/zVibDFBbDRQ/AiFv8G3PbUlhTpfYNYUcyqbP6BJ2fAizu8lwgkwwcC9c3+Kt8UMvLtZuhZKy/47qhC51+ZQawy7J85LlApjhjAkx7Te3ogyIZhz9PhebQH5jOzixX09kM4POvUQ6cdTVc/kawygewCmDKy2omCjdf0e0xM4BdjeuTSBRk6jtUTb9BKz+djlZ4eRy0bQ1aks4R7GEAg9Orlx07A6hSbOFXPsCkp8OlfFAb0UnaQTn+IRnIPirT/1dBxgM3+CqQW0beptZ+NyTj0LIW9m6A//0L2puP/l1RKXytHAZ9RzmNYoX63z/9IrU53LbUnXxeo3S8KvWfXy4BdgXOFsJbhFFhFcAPP4E+JXrvJeOw+TH44NFjld4VfUrg3Htg5Cx9QzjUAn8YEVbP4X6KKUlVND26BLQynrArH9TGT1f5h1pg+fnw9o+dKT/1zrq58MeL4UCj3nh9StQsFU5OtnUNpBuAYFog4ugy5Lt6z3/RBq9OVH59N7RuUu93tOq9N3KWu/H8IE3XRw1AFV4OP2dO0Xt+4/2578o/a1YePx36DoXiMbmN6xVpurbAzu8Lvup2dgqL1R+nHGmHLU+YGfujl/RnkUGV2Z8JhpG2zu0ZIEHoPRgA9NPMP21eDYkOc+M3LNJ7/rTzzI1tGlvnygAElwQqjFPc7MZNouvq1TVYP7F1rgxAddrIkw3dvYTOcuU3ts4L7B47Id2tZHBwh97zXvwGNr4AfU539uyhvebHN8cYKREiUrd/sUK49XPnzyfj8FyZ87P/8cfZFhbDg5bCMYkOdSRzilUAFz/knTxRx2K4hYxYaZcdmmFY5ddBxa88ESXySMotu69edNi+XP+d838Jlz4bvtvDoJGUWaimitFhz1p3a/qwGXBdg/qZJ8UgC9VRMzokOuDdX7h7t6hUzQTX2fGDbq57exYlQlbzb6KY83/1uyr2PxeOtKtY/w+fUQkgybgJyaJEg5DV7IaIRAGlc8o58P1/mFvXj7SrOP+df4aP/6J/+xdN9ghZzadEtd7PmVNg6mvquGeSZFzNCB8th8bnwxrYYYKDQlZzGOgVtCSuGXELjK8xbwQpEh3KCLbURi8lLDtHhKwhiYcNCXzhzClw2YveH/N218O796ufPQGB7BkGANB/OEx9Wf30mubV8NYd4Q3/dopAWkh6xta3bSssO1clbZqMAeiM0kq45n3lYfRq6fEDSTzam8Cu6FcOYx/XDx9zw+56eON687EH/nDQAv+7VXrOgUaVq/fyOHXO9/J8f8YE+N6b4Q7+6Jr26DqCdOhXDufcrgpGmCgW0RmHWuCVcfoh5MHSIGQ1a4BxQUviC7FCtSycdRUMmW7eGNq2wkvnR6NegOItIatZBvwgaEl8xypQ03f5tcooTio1892ddbDicjPf8p4XC4BdQUsRCMm4Os6lAj1PrYCzr1bLhG7mUTpDpsM3boIPl5iQ0mt2WQgz3aciz383wvp74NnBsOoH7jOJAC5ZAL092muYRNBkIYjUrsVzknHY/hK8eK77490J/WH0XPOymUbQaJEk4u4sD2l8Hl4YBZ+syv5sJqPmhN9JlGSrRRVN9ERfgCk6WmHlldCyTu+9wmL3NQz8oZ0qmiwhkEAOC95xQKIDVl2tf7wbPNkbecywSQikmqME7yFDnB/Yq0jVBXDK5y0qqMMkh1rgg8fgvJ87fyes2cGgdE6qRIxkHXBnkPJ0i27tnb3rzRsAKLeyjgGE2T2sdG7nBsZYG6gw2dD15Zty6mTy3416z+fiT/AaW+cWgN1/dkugAnXHZ816629RqXeJmTqZSeGNOt6S6jmcXiLm9cDEcYLuJcsQj5qanhji32qnpOk6vUTMikCEcYru9DvMg4p3/cr1zvY6s4WfpOn6qAEUswbYH4Q8jtB1xpRWmp8Fvq6ZVfTpDrPjm2G/rWsgzQDsunHhLYD/8V9UxS8dxj1ubiN2UimMuVvvnX2hdK/UpWoEQmapWMFzvovjlCPt+jV6+g5V0Tp9h+Y2dp8SuMJFUeqPXbiQvSZDx8cawABWI9TuMJS8/xv9jJ3+w1VR6dFz3fnmB09RGUi60cZftIWvfLwqFn2MUMcYgLiGBJIlvgqlQ0crvP0T/fd6Fakr2hv3qJ+Dp3R/TDzlHPjmbXDVuzB9pbsZpGGR99HJukiWpFcKh6g2jJhWp18xtDMOtSglpa58+5QcbSeXC+3N6hYxfCllX2kY0XnPoBpeQ+LRQdoAJ5Wq7OCwetpWXB6+hlKCOlHFV2LVOu8ZlOQRzwXKhc+aVf3eMMbiNywKn/KhS51Gu21c/+Fqlx+WmWD7cnjjujDWGeiybVzXvYMF8zwTxxRtW1Usfi7xe6b48JmwKr9bXXbfO7iGDUguMC+RYawCuGAefOtu/8OwjrSrjOF//s7fcZ0ieEdUdT2Td9893GEP+sBJxlVE7/Mj1J29XzS9qnb7YVU+ZNVh1rRwWcMKJFPNSeQDp5yjHD/l15qvGZDoUEbWsCh8jp5MBCtFVfeNQLIbwJMMI85moLcxwfwilQo2eLJq5uQ2ROuLNnUbuX05/CcyJWMOU8AocSvbunvIUWEIWc184GdGxAqSXkWqzWvxGCgcoJw+J2Y4flI3eAd3qq5i+zZFLeEzxQNidvYl3JkBLKQIwQcQsaqixy9NSEaLOdnD/bvfBNqIObQjmJm7XHl8QTDTifLBoQEAiCrqESxwL1UeXxAsEFXUO33csQHYT98HNGiKlMc/GmwdOUa7Oph9KthIT6srFH0OUkBFtl1/JnozAGAPEN4kkuOXO3WVDy4MAEDM5mkg34ojPDxk60Qb1wUi7WZTf4IQxw0cH9RRxRV2kq82rmYAACGQxJiBYLPbb+TJEcFmYsxwq3zIwQAAxCwOYDEZ8lVGAqARi8liFgdy+UhOBgB2XmGSSmBHrt/K45gdJKlM5fflQs4GACBuZycJJpE3Aj/YQYJJ4nZ2mviYEQMAEHfQRJIJ5JcDL2kkyQRxh7nKbsbLxMtaBpJkFZJRpr99XCPYbK/5RhN3jM0AKcQs9mAxjjDnGUaPOizGmVY+eDADpLD9BA8CLlJ58qTxEFX8NJejXnd43ilEVnMz8Bj5uwNdDgJ3uvXwOcWXVjH2BdIr9PSy9OZooIAr3fj2dTG+B+gMcSvbiFGRjydwgGABMf1bPffD+YysYQKSxeTDyzJpQjBTJ5jDBL7MAOmIKuqRjAYegKOVKo5jDgMPIBntt/IhgBkgHfkkw0jwaOTyDkwhWEmMuX5N952LEALkE1yKZH4k0tBMIHgHwb3iNv4avCghQtYwHcl9hD0r2T0bEMwTVeFxkoXKAFLIhUzE4q5QF6nQQVBHkkfEHN4MWpRMQmkAKexyNbcguAkZsRb3gj12vaWnMsuyhIlQG0AKuYwY+6hEcgMqBO3koGXqgv1AHYLnGMDqzIJMYSQSBpCOXEZvWhmPYBqSy4CRAYu0BcHrSFZQzJr0IoxRIHIGkImsZSAJxiK4BMl5wBjAqz7y7cAmu8HGOmKs9eKGzk8ibwCZ2LeQZVgMR1KOpAwYBJQAxUB/lIEUIr5smBEHOlAKbgNagRZgF4ImBI0k2UoVTV7dygXF/wF+fTz59Jc5ygAAAABJRU5ErkJggg=="
    }));
  }
  async getHistoryKLineData(t, r, n, s) {
    return await ((await (await fetch(`https://api.polygon.io/v2/aggs/ticker/${t.ticker}/range/${r.multiplier}/${r.timespan}/${n}/${s}?apiKey=${this._apiKey}`)).json()).results || []).map((d) => ({
      timestamp: d.t,
      open: d.o,
      high: d.h,
      low: d.l,
      close: d.c,
      volume: d.v,
      turnover: d.vw
    }));
  }
  subscribe(t, r, n) {
    var s, l;
    this._prevSymbolMarket !== t.market ? ((s = this._ws) == null || s.close(), this._ws = new WebSocket(`wss://delayed.polygon.io/${t.market}`), this._ws.onopen = () => {
      var h;
      (h = this._ws) == null || h.send(JSON.stringify({ action: "auth", params: this._apiKey }));
    }, this._ws.onmessage = (h) => {
      var p;
      const d = JSON.parse(h.data);
      d[0].ev === "status" ? d[0].status === "auth_success" && ((p = this._ws) == null || p.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` }))) : "sym" in d && n({
        timestamp: d.s,
        open: d.o,
        high: d.h,
        low: d.l,
        close: d.c,
        volume: d.v,
        turnover: d.vw
      });
    }) : (l = this._ws) == null || l.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` })), this._prevSymbolMarket = t.market;
  }
  unsubscribe(t, r) {
  }
}
const Ne = {};
function m5(e) {
  Ne.context = e;
}
const g5 = (e, t) => e === t, xn = Symbol("solid-proxy"), y5 = Symbol("solid-track"), qt = {
  equals: g5
};
let Kr = Zr;
const m1 = 1, Yt = 2, Rr = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, pn = {};
var Se = null;
let O1 = null, Ce = null, Fe = null, f1 = null, Nn = 0;
function mt(e, t) {
  const r = Ce, n = Se, s = e.length === 0, l = s ? Rr : {
    owned: null,
    cleanups: null,
    context: null,
    owner: t === void 0 ? n : t
  }, h = s ? e : () => e(() => o1(() => on(l)));
  Se = l, Ce = null;
  try {
    return k1(h, !0);
  } finally {
    Ce = r, Se = n;
  }
}
function T(e, t) {
  t = t ? Object.assign({}, qt, t) : qt;
  const r = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, n = (s) => (typeof s == "function" && (s = s(r.value)), Qr(r, s));
  return [jr.bind(r), n];
}
function G0(e, t, r) {
  const n = rn(e, t, !0, m1);
  j1(n);
}
function B(e, t, r) {
  const n = rn(e, t, !1, m1);
  j1(n);
}
function Ke(e, t, r) {
  Kr = _5;
  const n = rn(e, t, !1, m1);
  n.user = !0, f1 ? f1.push(n) : j1(n);
}
function j(e, t, r) {
  r = r ? Object.assign({}, qt, r) : qt;
  const n = rn(e, t, !0, 0);
  return n.observers = null, n.observerSlots = null, n.comparator = r.equals || void 0, j1(n), jr.bind(n);
}
function v5(e, t, r) {
  let n, s, l;
  arguments.length === 2 && typeof t == "object" || arguments.length === 1 ? (n = !0, s = e, l = t || {}) : (n = e, s = t, l = r || {});
  let h = null, d = pn, p = null, x = !1, v = "initialValue" in l, L = typeof n == "function" && j(n);
  const D = /* @__PURE__ */ new Set(), [M, q] = (l.storage || T)(l.initialValue), [N, F] = T(void 0), [I, re] = T(void 0, {
    equals: !1
  }), [R, Y] = T(v ? "ready" : "unresolved");
  if (Ne.context) {
    p = `${Ne.context.id}${Ne.context.count++}`;
    let H;
    l.ssrLoadFrom === "initial" ? d = l.initialValue : Ne.load && (H = Ne.load(p)) && (d = H[0]);
  }
  function V(H, te, se, Le) {
    return h === H && (h = null, v = !0, (H === d || te === d) && l.onHydrated && queueMicrotask(() => l.onHydrated(Le, {
      value: te
    })), d = pn, me(te, se)), te;
  }
  function me(H, te) {
    k1(() => {
      te === void 0 && q(() => H), Y(te !== void 0 ? "errored" : "ready"), F(te);
      for (const se of D.keys())
        se.decrement();
      D.clear();
    }, !1);
  }
  function U() {
    const H = C5, te = M(), se = N();
    if (se !== void 0 && !h)
      throw se;
    return Ce && !Ce.user && H && G0(() => {
      I(), h && (H.resolved || D.has(H) || (H.increment(), D.add(H)));
    }), te;
  }
  function Q(H = !0) {
    if (H !== !1 && x)
      return;
    x = !1;
    const te = L ? L() : n;
    if (te == null || te === !1) {
      V(h, o1(M));
      return;
    }
    const se = d !== pn ? d : o1(() => s(te, {
      value: M(),
      refetching: H
    }));
    return typeof se != "object" || !(se && "then" in se) ? (V(h, se, void 0, te), se) : (h = se, x = !0, queueMicrotask(() => x = !1), k1(() => {
      Y(v ? "refreshing" : "pending"), re();
    }, !1), se.then((Le) => V(se, Le, void 0, te), (Le) => V(se, void 0, Hr(Le), te)));
  }
  return Object.defineProperties(U, {
    state: {
      get: () => R()
    },
    error: {
      get: () => N()
    },
    loading: {
      get() {
        const H = R();
        return H === "pending" || H === "refreshing";
      }
    },
    latest: {
      get() {
        if (!v)
          return U();
        const H = N();
        if (H && !h)
          throw H;
        return M();
      }
    }
  }), L ? G0(() => Q(!1)) : Q(!1), [U, {
    refetch: Q,
    mutate: q
  }];
}
function o1(e) {
  if (Ce === null)
    return e();
  const t = Ce;
  Ce = null;
  try {
    return e();
  } finally {
    Ce = t;
  }
}
function In(e) {
  Ke(() => o1(e));
}
function N1(e) {
  return Se === null || (Se.cleanups === null ? Se.cleanups = [e] : Se.cleanups.push(e)), e;
}
function p5(e) {
  const t = Ce, r = Se;
  return Promise.resolve().then(() => {
    Ce = t, Se = r;
    let n;
    return k1(e, !1), Ce = Se = null, n ? n.done : void 0;
  });
}
let C5;
function jr() {
  const e = O1;
  if (this.sources && (this.state || e))
    if (this.state === m1 || e)
      j1(this);
    else {
      const t = Fe;
      Fe = null, k1(() => Gt(this), !1), Fe = t;
    }
  if (Ce) {
    const t = this.observers ? this.observers.length : 0;
    Ce.sources ? (Ce.sources.push(this), Ce.sourceSlots.push(t)) : (Ce.sources = [this], Ce.sourceSlots = [t]), this.observers ? (this.observers.push(Ce), this.observerSlots.push(Ce.sources.length - 1)) : (this.observers = [Ce], this.observerSlots = [Ce.sources.length - 1]);
  }
  return this.value;
}
function Qr(e, t, r) {
  let n = e.value;
  return (!e.comparator || !e.comparator(n, t)) && (e.value = t, e.observers && e.observers.length && k1(() => {
    for (let s = 0; s < e.observers.length; s += 1) {
      const l = e.observers[s], h = O1 && O1.running;
      h && O1.disposed.has(l), (h && !l.tState || !h && !l.state) && (l.pure ? Fe.push(l) : f1.push(l), l.observers && Vr(l)), h || (l.state = m1);
    }
    if (Fe.length > 1e6)
      throw Fe = [], new Error();
  }, !1)), t;
}
function j1(e) {
  if (!e.fn)
    return;
  on(e);
  const t = Se, r = Ce, n = Nn;
  Ce = Se = e, b5(e, e.value, n), Ce = r, Se = t;
}
function b5(e, t, r) {
  let n;
  try {
    n = e.fn(t);
  } catch (s) {
    e.pure && (e.state = m1, e.owned && e.owned.forEach(on), e.owned = null), qr(s);
  }
  (!e.updatedAt || e.updatedAt <= r) && (e.updatedAt != null && "observers" in e ? Qr(e, n) : e.value = n, e.updatedAt = r);
}
function rn(e, t, r, n = m1, s) {
  const l = {
    fn: e,
    state: n,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: Se,
    context: null,
    pure: r
  };
  return Se === null || Se !== Rr && (Se.owned ? Se.owned.push(l) : Se.owned = [l]), l;
}
function Wt(e) {
  const t = O1;
  if (e.state === 0 || t)
    return;
  if (e.state === Yt || t)
    return Gt(e);
  if (e.suspense && o1(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const r = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < Nn); )
    (e.state || t) && r.push(e);
  for (let n = r.length - 1; n >= 0; n--)
    if (e = r[n], e.state === m1 || t)
      j1(e);
    else if (e.state === Yt || t) {
      const s = Fe;
      Fe = null, k1(() => Gt(e, r[0]), !1), Fe = s;
    }
}
function k1(e, t) {
  if (Fe)
    return e();
  let r = !1;
  t || (Fe = []), f1 ? r = !0 : f1 = [], Nn++;
  try {
    const n = e();
    return $5(r), n;
  } catch (n) {
    r || (f1 = null), Fe = null, qr(n);
  }
}
function $5(e) {
  if (Fe && (Zr(Fe), Fe = null), e)
    return;
  const t = f1;
  f1 = null, t.length && k1(() => Kr(t), !1);
}
function Zr(e) {
  for (let t = 0; t < e.length; t++)
    Wt(e[t]);
}
function _5(e) {
  let t, r = 0;
  for (t = 0; t < e.length; t++) {
    const n = e[t];
    n.user ? e[r++] = n : Wt(n);
  }
  for (Ne.context && m5(), t = 0; t < r; t++)
    Wt(e[t]);
}
function Gt(e, t) {
  const r = O1;
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
    const s = e.sources[n];
    s.sources && (s.state === m1 || r ? s !== t && Wt(s) : (s.state === Yt || r) && Gt(s, t));
  }
}
function Vr(e) {
  const t = O1;
  for (let r = 0; r < e.observers.length; r += 1) {
    const n = e.observers[r];
    (!n.state || t) && (n.state = Yt, n.pure ? Fe.push(n) : f1.push(n), n.observers && Vr(n));
  }
}
function on(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const r = e.sources.pop(), n = e.sourceSlots.pop(), s = r.observers;
      if (s && s.length) {
        const l = s.pop(), h = r.observerSlots.pop();
        n < s.length && (l.sourceSlots[h] = n, s[n] = l, r.observerSlots[n] = h);
      }
    }
  if (e.owned) {
    for (t = 0; t < e.owned.length; t++)
      on(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = 0; t < e.cleanups.length; t++)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function Hr(e) {
  return e instanceof Error || typeof e == "string" ? e : new Error("Unknown error");
}
function qr(e) {
  throw e = Hr(e), e;
}
const k5 = Symbol("fallback");
function X0(e) {
  for (let t = 0; t < e.length; t++)
    e[t]();
}
function x5(e, t, r = {}) {
  let n = [], s = [], l = [], h = 0, d = t.length > 1 ? [] : null;
  return N1(() => X0(l)), () => {
    let p = e() || [], x, v;
    return p[y5], o1(() => {
      let D = p.length, M, q, N, F, I, re, R, Y, V;
      if (D === 0)
        h !== 0 && (X0(l), l = [], n = [], s = [], h = 0, d && (d = [])), r.fallback && (n = [k5], s[0] = mt((me) => (l[0] = me, r.fallback())), h = 1);
      else if (h === 0) {
        for (s = new Array(D), v = 0; v < D; v++)
          n[v] = p[v], s[v] = mt(L);
        h = D;
      } else {
        for (N = new Array(D), F = new Array(D), d && (I = new Array(D)), re = 0, R = Math.min(h, D); re < R && n[re] === p[re]; re++)
          ;
        for (R = h - 1, Y = D - 1; R >= re && Y >= re && n[R] === p[Y]; R--, Y--)
          N[Y] = s[R], F[Y] = l[R], d && (I[Y] = d[R]);
        for (M = /* @__PURE__ */ new Map(), q = new Array(Y + 1), v = Y; v >= re; v--)
          V = p[v], x = M.get(V), q[v] = x === void 0 ? -1 : x, M.set(V, v);
        for (x = re; x <= R; x++)
          V = n[x], v = M.get(V), v !== void 0 && v !== -1 ? (N[v] = s[x], F[v] = l[x], d && (I[v] = d[x]), v = q[v], M.set(V, v)) : l[x]();
        for (v = re; v < D; v++)
          v in N ? (s[v] = N[v], l[v] = F[v], d && (d[v] = I[v], d[v](v))) : s[v] = mt(L);
        s = s.slice(0, h = D), n = p.slice(0);
      }
      return s;
    });
    function L(D) {
      if (l[v] = D, d) {
        const [M, q] = T(v);
        return d[v] = q, t(p[v], M);
      }
      return t(p[v]);
    }
  };
}
function w(e, t) {
  return o1(() => e(t || {}));
}
function Kt() {
  return !0;
}
const L5 = {
  get(e, t, r) {
    return t === xn ? r : e.get(t);
  },
  has(e, t) {
    return t === xn ? !0 : e.has(t);
  },
  set: Kt,
  deleteProperty: Kt,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: Kt,
      deleteProperty: Kt
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function Cn(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function Yr(...e) {
  let t = !1;
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    t = t || !!s && xn in s, e[n] = typeof s == "function" ? (t = !0, j(s)) : s;
  }
  if (t)
    return new Proxy({
      get(n) {
        for (let s = e.length - 1; s >= 0; s--) {
          const l = Cn(e[s])[n];
          if (l !== void 0)
            return l;
        }
      },
      has(n) {
        for (let s = e.length - 1; s >= 0; s--)
          if (n in Cn(e[s]))
            return !0;
        return !1;
      },
      keys() {
        const n = [];
        for (let s = 0; s < e.length; s++)
          n.push(...Object.keys(Cn(e[s])));
        return [...new Set(n)];
      }
    }, L5);
  const r = {};
  for (let n = e.length - 1; n >= 0; n--)
    if (e[n]) {
      const s = Object.getOwnPropertyDescriptors(e[n]);
      for (const l in s)
        l in r || Object.defineProperty(r, l, {
          enumerable: !0,
          get() {
            for (let h = e.length - 1; h >= 0; h--) {
              const d = (e[h] || {})[l];
              if (d !== void 0)
                return d;
            }
          }
        });
    }
  return r;
}
function Ln(e) {
  const t = "fallback" in e && {
    fallback: () => e.fallback
  };
  return j(x5(() => e.each, e.children, t || void 0));
}
function J(e) {
  let t = !1;
  const r = e.keyed, n = j(() => e.when, void 0, {
    equals: (s, l) => t ? s === l : !s == !l
  });
  return j(() => {
    const s = n();
    if (s) {
      const l = e.children, h = typeof l == "function" && l.length > 0;
      return t = r || h, h ? o1(() => l(s)) : l;
    }
    return e.fallback;
  }, void 0, void 0);
}
function w5(e, t, r) {
  let n = r.length, s = t.length, l = n, h = 0, d = 0, p = t[s - 1].nextSibling, x = null;
  for (; h < s || d < l; ) {
    if (t[h] === r[d]) {
      h++, d++;
      continue;
    }
    for (; t[s - 1] === r[l - 1]; )
      s--, l--;
    if (s === h) {
      const v = l < n ? d ? r[d - 1].nextSibling : r[l - d] : p;
      for (; d < l; )
        e.insertBefore(r[d++], v);
    } else if (l === d)
      for (; h < s; )
        (!x || !x.has(t[h])) && t[h].remove(), h++;
    else if (t[h] === r[l - 1] && r[d] === t[s - 1]) {
      const v = t[--s].nextSibling;
      e.insertBefore(r[d++], t[h++].nextSibling), e.insertBefore(r[--l], v), t[s] = r[l];
    } else {
      if (!x) {
        x = /* @__PURE__ */ new Map();
        let L = d;
        for (; L < l; )
          x.set(r[L], L++);
      }
      const v = x.get(t[h]);
      if (v != null)
        if (d < v && v < l) {
          let L = h, D = 1, M;
          for (; ++L < s && L < l && !((M = x.get(t[L])) == null || M !== v + D); )
            D++;
          if (D > v - d) {
            const q = t[h];
            for (; d < v; )
              e.insertBefore(r[d++], q);
          } else
            e.replaceChild(r[d++], t[h++]);
        } else
          h++;
      else
        t[h++].remove();
    }
  }
}
const J0 = "_$DX_DELEGATE";
function A5(e, t, r, n = {}) {
  let s;
  return mt((l) => {
    s = l, t === document ? e() : C(t, e(), t.firstChild ? null : void 0, r);
  }, n.owner), () => {
    s(), t.textContent = "";
  };
}
function b(e, t, r) {
  const n = document.createElement("template");
  n.innerHTML = e;
  let s = n.content.firstChild;
  return r && (s = s.firstChild), s;
}
function Ze(e, t = window.document) {
  const r = t[J0] || (t[J0] = /* @__PURE__ */ new Set());
  for (let n = 0, s = e.length; n < s; n++) {
    const l = e[n];
    r.has(l) || (r.add(l), t.addEventListener(l, M5));
  }
}
function Oe(e, t, r) {
  r == null ? e.removeAttribute(t) : e.setAttribute(t, r);
}
function ne(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function r1(e, t, r, n) {
  if (n)
    Array.isArray(r) ? (e[`$$${t}`] = r[0], e[`$$${t}Data`] = r[1]) : e[`$$${t}`] = r;
  else if (Array.isArray(r)) {
    const s = r[0];
    e.addEventListener(t, r[0] = (l) => s.call(e, r[1], l));
  } else
    e.addEventListener(t, r);
}
function I1(e, t, r) {
  if (!t)
    return r ? Oe(e, "style") : t;
  const n = e.style;
  if (typeof t == "string")
    return n.cssText = t;
  typeof r == "string" && (n.cssText = r = void 0), r || (r = {}), t || (t = {});
  let s, l;
  for (l in r)
    t[l] == null && n.removeProperty(l), delete r[l];
  for (l in t)
    s = t[l], s !== r[l] && (n.setProperty(l, s), r[l] = s);
  return r;
}
function _1(e, t, r) {
  return o1(() => e(t, r));
}
function C(e, t, r, n) {
  if (r !== void 0 && !n && (n = []), typeof t != "function")
    return Xt(e, t, n, r);
  B((s) => Xt(e, t(), s, r), n);
}
function M5(e) {
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
  }), Ne.registry && !Ne.done && (Ne.done = !0, document.querySelectorAll("[id^=pl-]").forEach((n) => {
    for (; n && n.nodeType !== 8 && n.nodeValue !== "pl-" + e; ) {
      let s = n.nextSibling;
      n.remove(), n = s;
    }
    n && n.remove();
  })); r; ) {
    const n = r[t];
    if (n && !r.disabled) {
      const s = r[`${t}Data`];
      if (s !== void 0 ? n.call(r, s, e) : n.call(r, e), e.cancelBubble)
        return;
    }
    r = r._$host || r.parentNode || r.host;
  }
}
function Xt(e, t, r, n, s) {
  for (Ne.context && !r && (r = [...e.childNodes]); typeof r == "function"; )
    r = r();
  if (t === r)
    return r;
  const l = typeof t, h = n !== void 0;
  if (e = h && r[0] && r[0].parentNode || e, l === "string" || l === "number") {
    if (Ne.context)
      return r;
    if (l === "number" && (t = t.toString()), h) {
      let d = r[0];
      d && d.nodeType === 3 ? d.data = t : d = document.createTextNode(t), r = K1(e, r, n, d);
    } else
      r !== "" && typeof r == "string" ? r = e.firstChild.data = t : r = e.textContent = t;
  } else if (t == null || l === "boolean") {
    if (Ne.context)
      return r;
    r = K1(e, r, n);
  } else {
    if (l === "function")
      return B(() => {
        let d = t();
        for (; typeof d == "function"; )
          d = d();
        r = Xt(e, d, r, n);
      }), () => r;
    if (Array.isArray(t)) {
      const d = [], p = r && Array.isArray(r);
      if (wn(d, t, r, s))
        return B(() => r = Xt(e, d, r, n, !0)), () => r;
      if (Ne.context) {
        if (!d.length)
          return r;
        for (let x = 0; x < d.length; x++)
          if (d[x].parentNode)
            return r = d;
      }
      if (d.length === 0) {
        if (r = K1(e, r, n), h)
          return r;
      } else
        p ? r.length === 0 ? er(e, d, n) : w5(e, r, d) : (r && K1(e), er(e, d));
      r = d;
    } else if (t instanceof Node) {
      if (Ne.context && t.parentNode)
        return r = h ? [t] : t;
      if (Array.isArray(r)) {
        if (h)
          return r = K1(e, r, n, t);
        K1(e, r, null, t);
      } else
        r == null || r === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      r = t;
    }
  }
  return r;
}
function wn(e, t, r, n) {
  let s = !1;
  for (let l = 0, h = t.length; l < h; l++) {
    let d = t[l], p = r && r[l];
    if (d instanceof Node)
      e.push(d);
    else if (!(d == null || d === !0 || d === !1))
      if (Array.isArray(d))
        s = wn(e, d, p) || s;
      else if (typeof d == "function")
        if (n) {
          for (; typeof d == "function"; )
            d = d();
          s = wn(e, Array.isArray(d) ? d : [d], Array.isArray(p) ? p : [p]) || s;
        } else
          e.push(d), s = !0;
      else {
        const x = String(d);
        p && p.nodeType === 3 && p.data === x ? e.push(p) : e.push(document.createTextNode(x));
      }
  }
  return s;
}
function er(e, t, r = null) {
  for (let n = 0, s = t.length; n < s; n++)
    e.insertBefore(t[n], r);
}
function K1(e, t, r, n) {
  if (r === void 0)
    return e.textContent = "";
  const s = n || document.createTextNode("");
  if (t.length) {
    let l = !1;
    for (let h = t.length - 1; h >= 0; h--) {
      const d = t[h];
      if (s !== d) {
        const p = d.parentNode === e;
        !l && !h ? p ? e.replaceChild(s, d) : e.insertBefore(s, r) : p && d.remove();
      } else
        l = !0;
    }
  } else
    e.insertBefore(s, r);
  return [s];
}
const T5 = "http://www.w3.org/2000/svg";
function S5(e, t = !1) {
  return t ? document.createElementNS(T5, e) : document.createElement(e);
}
function P5(e) {
  const {
    useShadow: t
  } = e, r = document.createTextNode(""), n = e.mount || document.body;
  function s() {
    if (Ne.context) {
      const [l, h] = T(!1);
      return queueMicrotask(() => h(!0)), () => l() && e.children;
    } else
      return () => e.children;
  }
  if (n instanceof HTMLHeadElement) {
    const [l, h] = T(!1), d = () => h(!0);
    mt((p) => C(n, () => l() ? p() : s()(), null)), N1(() => {
      Ne.context ? queueMicrotask(d) : d();
    });
  } else {
    const l = S5(e.isSVG ? "g" : "div", e.isSVG), h = t && l.attachShadow ? l.attachShadow({
      mode: "open"
    }) : l;
    Object.defineProperty(l, "_$host", {
      get() {
        return r.parentNode;
      },
      configurable: !0
    }), C(h, s()), n.appendChild(l), e.ref && e.ref(l), N1(() => n.removeChild(l));
  }
  return r;
}
var Rt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Wr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var D5 = typeof Rt == "object" && Rt && Rt.Object === Object && Rt, Gr = D5, O5 = Gr, N5 = typeof self == "object" && self && self.Object === Object && self, I5 = O5 || N5 || Function("return this")(), i1 = I5, E5 = i1, B5 = E5.Symbol, an = B5, tr = an, Xr = Object.prototype, F5 = Xr.hasOwnProperty, U5 = Xr.toString, ht = tr ? tr.toStringTag : void 0;
function z5(e) {
  var t = F5.call(e, ht), r = e[ht];
  try {
    e[ht] = void 0;
    var n = !0;
  } catch {
  }
  var s = U5.call(e);
  return n && (t ? e[ht] = r : delete e[ht]), s;
}
var K5 = z5, R5 = Object.prototype, j5 = R5.toString;
function Q5(e) {
  return j5.call(e);
}
var Z5 = Q5, nr = an, V5 = K5, H5 = Z5, q5 = "[object Null]", Y5 = "[object Undefined]", rr = nr ? nr.toStringTag : void 0;
function W5(e) {
  return e == null ? e === void 0 ? Y5 : q5 : rr && rr in Object(e) ? V5(e) : H5(e);
}
var gt = W5;
function G5(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Q1 = G5, X5 = gt, J5 = Q1, e6 = "[object AsyncFunction]", t6 = "[object Function]", n6 = "[object GeneratorFunction]", r6 = "[object Proxy]";
function o6(e) {
  if (!J5(e))
    return !1;
  var t = X5(e);
  return t == t6 || t == n6 || t == e6 || t == r6;
}
var Jr = o6, i6 = i1, a6 = i6["__core-js_shared__"], s6 = a6, bn = s6, or = function() {
  var e = /[^.]+$/.exec(bn && bn.keys && bn.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function l6(e) {
  return !!or && or in e;
}
var c6 = l6, u6 = Function.prototype, d6 = u6.toString;
function h6(e) {
  if (e != null) {
    try {
      return d6.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var e9 = h6, f6 = Jr, m6 = c6, g6 = Q1, y6 = e9, v6 = /[\\^$.*+?()[\]{}|]/g, p6 = /^\[object .+?Constructor\]$/, C6 = Function.prototype, b6 = Object.prototype, $6 = C6.toString, _6 = b6.hasOwnProperty, k6 = RegExp(
  "^" + $6.call(_6).replace(v6, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function x6(e) {
  if (!g6(e) || m6(e))
    return !1;
  var t = f6(e) ? k6 : p6;
  return t.test(y6(e));
}
var L6 = x6;
function w6(e, t) {
  return e == null ? void 0 : e[t];
}
var A6 = w6, M6 = L6, T6 = A6;
function S6(e, t) {
  var r = T6(e, t);
  return M6(r) ? r : void 0;
}
var E1 = S6, P6 = E1, D6 = function() {
  try {
    var e = P6(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), O6 = D6, ir = O6;
function N6(e, t, r) {
  t == "__proto__" && ir ? ir(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var t9 = N6;
function I6(e, t) {
  return e === t || e !== e && t !== t;
}
var n9 = I6, E6 = t9, B6 = n9, F6 = Object.prototype, U6 = F6.hasOwnProperty;
function z6(e, t, r) {
  var n = e[t];
  (!(U6.call(e, t) && B6(n, r)) || r === void 0 && !(t in e)) && E6(e, t, r);
}
var En = z6, K6 = Array.isArray, Z1 = K6;
function R6(e) {
  return e != null && typeof e == "object";
}
var V1 = R6, j6 = gt, Q6 = V1, Z6 = "[object Symbol]";
function V6(e) {
  return typeof e == "symbol" || Q6(e) && j6(e) == Z6;
}
var Bn = V6, H6 = Z1, q6 = Bn, Y6 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, W6 = /^\w*$/;
function G6(e, t) {
  if (H6(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || q6(e) ? !0 : W6.test(e) || !Y6.test(e) || t != null && e in Object(t);
}
var X6 = G6, J6 = E1, e2 = J6(Object, "create"), sn = e2, ar = sn;
function t2() {
  this.__data__ = ar ? ar(null) : {}, this.size = 0;
}
var n2 = t2;
function r2(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var o2 = r2, i2 = sn, a2 = "__lodash_hash_undefined__", s2 = Object.prototype, l2 = s2.hasOwnProperty;
function c2(e) {
  var t = this.__data__;
  if (i2) {
    var r = t[e];
    return r === a2 ? void 0 : r;
  }
  return l2.call(t, e) ? t[e] : void 0;
}
var u2 = c2, d2 = sn, h2 = Object.prototype, f2 = h2.hasOwnProperty;
function m2(e) {
  var t = this.__data__;
  return d2 ? t[e] !== void 0 : f2.call(t, e);
}
var g2 = m2, y2 = sn, v2 = "__lodash_hash_undefined__";
function p2(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = y2 && t === void 0 ? v2 : t, this;
}
var C2 = p2, b2 = n2, $2 = o2, _2 = u2, k2 = g2, x2 = C2;
function H1(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
H1.prototype.clear = b2;
H1.prototype.delete = $2;
H1.prototype.get = _2;
H1.prototype.has = k2;
H1.prototype.set = x2;
var L2 = H1;
function w2() {
  this.__data__ = [], this.size = 0;
}
var A2 = w2, M2 = n9;
function T2(e, t) {
  for (var r = e.length; r--; )
    if (M2(e[r][0], t))
      return r;
  return -1;
}
var ln = T2, S2 = ln, P2 = Array.prototype, D2 = P2.splice;
function O2(e) {
  var t = this.__data__, r = S2(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : D2.call(t, r, 1), --this.size, !0;
}
var N2 = O2, I2 = ln;
function E2(e) {
  var t = this.__data__, r = I2(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var B2 = E2, F2 = ln;
function U2(e) {
  return F2(this.__data__, e) > -1;
}
var z2 = U2, K2 = ln;
function R2(e, t) {
  var r = this.__data__, n = K2(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
var j2 = R2, Q2 = A2, Z2 = N2, V2 = B2, H2 = z2, q2 = j2;
function q1(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
q1.prototype.clear = Q2;
q1.prototype.delete = Z2;
q1.prototype.get = V2;
q1.prototype.has = H2;
q1.prototype.set = q2;
var cn = q1, Y2 = E1, W2 = i1, G2 = Y2(W2, "Map"), Fn = G2, sr = L2, X2 = cn, J2 = Fn;
function eo() {
  this.size = 0, this.__data__ = {
    hash: new sr(),
    map: new (J2 || X2)(),
    string: new sr()
  };
}
var to = eo;
function no(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var ro = no, oo = ro;
function io(e, t) {
  var r = e.__data__;
  return oo(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var un = io, ao = un;
function so(e) {
  var t = ao(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var lo = so, co = un;
function uo(e) {
  return co(this, e).get(e);
}
var ho = uo, fo = un;
function mo(e) {
  return fo(this, e).has(e);
}
var go = mo, yo = un;
function vo(e, t) {
  var r = yo(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
var po = vo, Co = to, bo = lo, $o = ho, _o = go, ko = po;
function Y1(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Y1.prototype.clear = Co;
Y1.prototype.delete = bo;
Y1.prototype.get = $o;
Y1.prototype.has = _o;
Y1.prototype.set = ko;
var r9 = Y1, o9 = r9, xo = "Expected a function";
function Un(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(xo);
  var r = function() {
    var n = arguments, s = t ? t.apply(this, n) : n[0], l = r.cache;
    if (l.has(s))
      return l.get(s);
    var h = e.apply(this, n);
    return r.cache = l.set(s, h) || l, h;
  };
  return r.cache = new (Un.Cache || o9)(), r;
}
Un.Cache = o9;
var Lo = Un, wo = Lo, Ao = 500;
function Mo(e) {
  var t = wo(e, function(n) {
    return r.size === Ao && r.clear(), n;
  }), r = t.cache;
  return t;
}
var To = Mo, So = To, Po = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Do = /\\(\\)?/g, Oo = So(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(Po, function(r, n, s, l) {
    t.push(s ? l.replace(Do, "$1") : n || r);
  }), t;
}), No = Oo;
function Io(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, s = Array(n); ++r < n; )
    s[r] = t(e[r], r, e);
  return s;
}
var Eo = Io, lr = an, Bo = Eo, Fo = Z1, Uo = Bn, zo = 1 / 0, cr = lr ? lr.prototype : void 0, ur = cr ? cr.toString : void 0;
function i9(e) {
  if (typeof e == "string")
    return e;
  if (Fo(e))
    return Bo(e, i9) + "";
  if (Uo(e))
    return ur ? ur.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -zo ? "-0" : t;
}
var Ko = i9, Ro = Ko;
function jo(e) {
  return e == null ? "" : Ro(e);
}
var Qo = jo, Zo = Z1, Vo = X6, Ho = No, qo = Qo;
function Yo(e, t) {
  return Zo(e) ? e : Vo(e, t) ? [e] : Ho(qo(e));
}
var Wo = Yo, Go = 9007199254740991, Xo = /^(?:0|[1-9]\d*)$/;
function Jo(e, t) {
  var r = typeof e;
  return t = t ?? Go, !!t && (r == "number" || r != "symbol" && Xo.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var a9 = Jo, ei = Bn, ti = 1 / 0;
function ni(e) {
  if (typeof e == "string" || ei(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -ti ? "-0" : t;
}
var ri = ni, oi = En, ii = Wo, ai = a9, dr = Q1, si = ri;
function li(e, t, r, n) {
  if (!dr(e))
    return e;
  t = ii(t, e);
  for (var s = -1, l = t.length, h = l - 1, d = e; d != null && ++s < l; ) {
    var p = si(t[s]), x = r;
    if (p === "__proto__" || p === "constructor" || p === "prototype")
      return e;
    if (s != h) {
      var v = d[p];
      x = n ? n(v, p, d) : void 0, x === void 0 && (x = dr(v) ? v : ai(t[s + 1]) ? [] : {});
    }
    oi(d, p, x), d = d[p];
  }
  return e;
}
var ci = li, ui = ci;
function di(e, t, r) {
  return e == null ? e : ui(e, t, r);
}
var hi = di;
const An = /* @__PURE__ */ Wr(hi);
var fi = cn;
function mi() {
  this.__data__ = new fi(), this.size = 0;
}
var gi = mi;
function yi(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
var vi = yi;
function pi(e) {
  return this.__data__.get(e);
}
var Ci = pi;
function bi(e) {
  return this.__data__.has(e);
}
var $i = bi, _i = cn, ki = Fn, xi = r9, Li = 200;
function wi(e, t) {
  var r = this.__data__;
  if (r instanceof _i) {
    var n = r.__data__;
    if (!ki || n.length < Li - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new xi(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
var Ai = wi, Mi = cn, Ti = gi, Si = vi, Pi = Ci, Di = $i, Oi = Ai;
function W1(e) {
  var t = this.__data__ = new Mi(e);
  this.size = t.size;
}
W1.prototype.clear = Ti;
W1.prototype.delete = Si;
W1.prototype.get = Pi;
W1.prototype.has = Di;
W1.prototype.set = Oi;
var Ni = W1;
function Ii(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var Ei = Ii, Bi = En, Fi = t9;
function Ui(e, t, r, n) {
  var s = !r;
  r || (r = {});
  for (var l = -1, h = t.length; ++l < h; ) {
    var d = t[l], p = n ? n(r[d], e[d], d, r, e) : void 0;
    p === void 0 && (p = e[d]), s ? Fi(r, d, p) : Bi(r, d, p);
  }
  return r;
}
var dn = Ui;
function zi(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var Ki = zi, Ri = gt, ji = V1, Qi = "[object Arguments]";
function Zi(e) {
  return ji(e) && Ri(e) == Qi;
}
var Vi = Zi, hr = Vi, Hi = V1, s9 = Object.prototype, qi = s9.hasOwnProperty, Yi = s9.propertyIsEnumerable, Wi = hr(function() {
  return arguments;
}()) ? hr : function(e) {
  return Hi(e) && qi.call(e, "callee") && !Yi.call(e, "callee");
}, Gi = Wi, Jt = { exports: {} };
function Xi() {
  return !1;
}
var Ji = Xi;
Jt.exports;
(function(e, t) {
  var r = i1, n = Ji, s = t && !t.nodeType && t, l = s && !0 && e && !e.nodeType && e, h = l && l.exports === s, d = h ? r.Buffer : void 0, p = d ? d.isBuffer : void 0, x = p || n;
  e.exports = x;
})(Jt, Jt.exports);
var l9 = Jt.exports, e3 = 9007199254740991;
function t3(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= e3;
}
var c9 = t3, n3 = gt, r3 = c9, o3 = V1, i3 = "[object Arguments]", a3 = "[object Array]", s3 = "[object Boolean]", l3 = "[object Date]", c3 = "[object Error]", u3 = "[object Function]", d3 = "[object Map]", h3 = "[object Number]", f3 = "[object Object]", m3 = "[object RegExp]", g3 = "[object Set]", y3 = "[object String]", v3 = "[object WeakMap]", p3 = "[object ArrayBuffer]", C3 = "[object DataView]", b3 = "[object Float32Array]", $3 = "[object Float64Array]", _3 = "[object Int8Array]", k3 = "[object Int16Array]", x3 = "[object Int32Array]", L3 = "[object Uint8Array]", w3 = "[object Uint8ClampedArray]", A3 = "[object Uint16Array]", M3 = "[object Uint32Array]", pe = {};
pe[b3] = pe[$3] = pe[_3] = pe[k3] = pe[x3] = pe[L3] = pe[w3] = pe[A3] = pe[M3] = !0;
pe[i3] = pe[a3] = pe[p3] = pe[s3] = pe[C3] = pe[l3] = pe[c3] = pe[u3] = pe[d3] = pe[h3] = pe[f3] = pe[m3] = pe[g3] = pe[y3] = pe[v3] = !1;
function T3(e) {
  return o3(e) && r3(e.length) && !!pe[n3(e)];
}
var S3 = T3;
function P3(e) {
  return function(t) {
    return e(t);
  };
}
var zn = P3, en = { exports: {} };
en.exports;
(function(e, t) {
  var r = Gr, n = t && !t.nodeType && t, s = n && !0 && e && !e.nodeType && e, l = s && s.exports === n, h = l && r.process, d = function() {
    try {
      var p = s && s.require && s.require("util").types;
      return p || h && h.binding && h.binding("util");
    } catch {
    }
  }();
  e.exports = d;
})(en, en.exports);
var Kn = en.exports, D3 = S3, O3 = zn, fr = Kn, mr = fr && fr.isTypedArray, N3 = mr ? O3(mr) : D3, I3 = N3, E3 = Ki, B3 = Gi, F3 = Z1, U3 = l9, z3 = a9, K3 = I3, R3 = Object.prototype, j3 = R3.hasOwnProperty;
function Q3(e, t) {
  var r = F3(e), n = !r && B3(e), s = !r && !n && U3(e), l = !r && !n && !s && K3(e), h = r || n || s || l, d = h ? E3(e.length, String) : [], p = d.length;
  for (var x in e)
    (t || j3.call(e, x)) && !(h && // Safari 9 has enumerable `arguments.length` in strict mode.
    (x == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    s && (x == "offset" || x == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    l && (x == "buffer" || x == "byteLength" || x == "byteOffset") || // Skip index properties.
    z3(x, p))) && d.push(x);
  return d;
}
var u9 = Q3, Z3 = Object.prototype;
function V3(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || Z3;
  return e === r;
}
var Rn = V3;
function H3(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var d9 = H3, q3 = d9, Y3 = q3(Object.keys, Object), W3 = Y3, G3 = Rn, X3 = W3, J3 = Object.prototype, ea = J3.hasOwnProperty;
function ta(e) {
  if (!G3(e))
    return X3(e);
  var t = [];
  for (var r in Object(e))
    ea.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
var na = ta, ra = Jr, oa = c9;
function ia(e) {
  return e != null && oa(e.length) && !ra(e);
}
var h9 = ia, aa = u9, sa = na, la = h9;
function ca(e) {
  return la(e) ? aa(e) : sa(e);
}
var jn = ca, ua = dn, da = jn;
function ha(e, t) {
  return e && ua(t, da(t), e);
}
var fa = ha;
function ma(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var ga = ma, ya = Q1, va = Rn, pa = ga, Ca = Object.prototype, ba = Ca.hasOwnProperty;
function $a(e) {
  if (!ya(e))
    return pa(e);
  var t = va(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !ba.call(e, n)) || r.push(n);
  return r;
}
var _a = $a, ka = u9, xa = _a, La = h9;
function wa(e) {
  return La(e) ? ka(e, !0) : xa(e);
}
var Qn = wa, Aa = dn, Ma = Qn;
function Ta(e, t) {
  return e && Aa(t, Ma(t), e);
}
var Sa = Ta, tn = { exports: {} };
tn.exports;
(function(e, t) {
  var r = i1, n = t && !t.nodeType && t, s = n && !0 && e && !e.nodeType && e, l = s && s.exports === n, h = l ? r.Buffer : void 0, d = h ? h.allocUnsafe : void 0;
  function p(x, v) {
    if (v)
      return x.slice();
    var L = x.length, D = d ? d(L) : new x.constructor(L);
    return x.copy(D), D;
  }
  e.exports = p;
})(tn, tn.exports);
var Pa = tn.exports;
function Da(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
var Oa = Da;
function Na(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, s = 0, l = []; ++r < n; ) {
    var h = e[r];
    t(h, r, e) && (l[s++] = h);
  }
  return l;
}
var Ia = Na;
function Ea() {
  return [];
}
var f9 = Ea, Ba = Ia, Fa = f9, Ua = Object.prototype, za = Ua.propertyIsEnumerable, gr = Object.getOwnPropertySymbols, Ka = gr ? function(e) {
  return e == null ? [] : (e = Object(e), Ba(gr(e), function(t) {
    return za.call(e, t);
  }));
} : Fa, Zn = Ka, Ra = dn, ja = Zn;
function Qa(e, t) {
  return Ra(e, ja(e), t);
}
var Za = Qa;
function Va(e, t) {
  for (var r = -1, n = t.length, s = e.length; ++r < n; )
    e[s + r] = t[r];
  return e;
}
var m9 = Va, Ha = d9, qa = Ha(Object.getPrototypeOf, Object), g9 = qa, Ya = m9, Wa = g9, Ga = Zn, Xa = f9, Ja = Object.getOwnPropertySymbols, e8 = Ja ? function(e) {
  for (var t = []; e; )
    Ya(t, Ga(e)), e = Wa(e);
  return t;
} : Xa, y9 = e8, t8 = dn, n8 = y9;
function r8(e, t) {
  return t8(e, n8(e), t);
}
var o8 = r8, i8 = m9, a8 = Z1;
function s8(e, t, r) {
  var n = t(e);
  return a8(e) ? n : i8(n, r(e));
}
var v9 = s8, l8 = v9, c8 = Zn, u8 = jn;
function d8(e) {
  return l8(e, u8, c8);
}
var h8 = d8, f8 = v9, m8 = y9, g8 = Qn;
function y8(e) {
  return f8(e, g8, m8);
}
var v8 = y8, p8 = E1, C8 = i1, b8 = p8(C8, "DataView"), $8 = b8, _8 = E1, k8 = i1, x8 = _8(k8, "Promise"), L8 = x8, w8 = E1, A8 = i1, M8 = w8(A8, "Set"), T8 = M8, S8 = E1, P8 = i1, D8 = S8(P8, "WeakMap"), O8 = D8, Mn = $8, Tn = Fn, Sn = L8, Pn = T8, Dn = O8, p9 = gt, G1 = e9, yr = "[object Map]", N8 = "[object Object]", vr = "[object Promise]", pr = "[object Set]", Cr = "[object WeakMap]", br = "[object DataView]", I8 = G1(Mn), E8 = G1(Tn), B8 = G1(Sn), F8 = G1(Pn), U8 = G1(Dn), P1 = p9;
(Mn && P1(new Mn(new ArrayBuffer(1))) != br || Tn && P1(new Tn()) != yr || Sn && P1(Sn.resolve()) != vr || Pn && P1(new Pn()) != pr || Dn && P1(new Dn()) != Cr) && (P1 = function(e) {
  var t = p9(e), r = t == N8 ? e.constructor : void 0, n = r ? G1(r) : "";
  if (n)
    switch (n) {
      case I8:
        return br;
      case E8:
        return yr;
      case B8:
        return vr;
      case F8:
        return pr;
      case U8:
        return Cr;
    }
  return t;
});
var Vn = P1, z8 = Object.prototype, K8 = z8.hasOwnProperty;
function R8(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && K8.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
var j8 = R8, Q8 = i1, Z8 = Q8.Uint8Array, V8 = Z8, $r = V8;
function H8(e) {
  var t = new e.constructor(e.byteLength);
  return new $r(t).set(new $r(e)), t;
}
var Hn = H8, q8 = Hn;
function Y8(e, t) {
  var r = t ? q8(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var W8 = Y8, G8 = /\w*$/;
function X8(e) {
  var t = new e.constructor(e.source, G8.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var J8 = X8, _r = an, kr = _r ? _r.prototype : void 0, xr = kr ? kr.valueOf : void 0;
function es(e) {
  return xr ? Object(xr.call(e)) : {};
}
var ts = es, ns = Hn;
function rs(e, t) {
  var r = t ? ns(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
var os = rs, is = Hn, as = W8, ss = J8, ls = ts, cs = os, us = "[object Boolean]", ds = "[object Date]", hs = "[object Map]", fs = "[object Number]", ms = "[object RegExp]", gs = "[object Set]", ys = "[object String]", vs = "[object Symbol]", ps = "[object ArrayBuffer]", Cs = "[object DataView]", bs = "[object Float32Array]", $s = "[object Float64Array]", _s = "[object Int8Array]", ks = "[object Int16Array]", xs = "[object Int32Array]", Ls = "[object Uint8Array]", ws = "[object Uint8ClampedArray]", As = "[object Uint16Array]", Ms = "[object Uint32Array]";
function Ts(e, t, r) {
  var n = e.constructor;
  switch (t) {
    case ps:
      return is(e);
    case us:
    case ds:
      return new n(+e);
    case Cs:
      return as(e, r);
    case bs:
    case $s:
    case _s:
    case ks:
    case xs:
    case Ls:
    case ws:
    case As:
    case Ms:
      return cs(e, r);
    case hs:
      return new n();
    case fs:
    case ys:
      return new n(e);
    case ms:
      return ss(e);
    case gs:
      return new n();
    case vs:
      return ls(e);
  }
}
var Ss = Ts, Ps = Q1, Lr = Object.create, Ds = function() {
  function e() {
  }
  return function(t) {
    if (!Ps(t))
      return {};
    if (Lr)
      return Lr(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}(), Os = Ds, Ns = Os, Is = g9, Es = Rn;
function Bs(e) {
  return typeof e.constructor == "function" && !Es(e) ? Ns(Is(e)) : {};
}
var Fs = Bs, Us = Vn, zs = V1, Ks = "[object Map]";
function Rs(e) {
  return zs(e) && Us(e) == Ks;
}
var js = Rs, Qs = js, Zs = zn, wr = Kn, Ar = wr && wr.isMap, Vs = Ar ? Zs(Ar) : Qs, Hs = Vs, qs = Vn, Ys = V1, Ws = "[object Set]";
function Gs(e) {
  return Ys(e) && qs(e) == Ws;
}
var Xs = Gs, Js = Xs, e7 = zn, Mr = Kn, Tr = Mr && Mr.isSet, t7 = Tr ? e7(Tr) : Js, n7 = t7, r7 = Ni, o7 = Ei, i7 = En, a7 = fa, s7 = Sa, l7 = Pa, c7 = Oa, u7 = Za, d7 = o8, h7 = h8, f7 = v8, m7 = Vn, g7 = j8, y7 = Ss, v7 = Fs, p7 = Z1, C7 = l9, b7 = Hs, $7 = Q1, _7 = n7, k7 = jn, x7 = Qn, L7 = 1, w7 = 2, A7 = 4, C9 = "[object Arguments]", M7 = "[object Array]", T7 = "[object Boolean]", S7 = "[object Date]", P7 = "[object Error]", b9 = "[object Function]", D7 = "[object GeneratorFunction]", O7 = "[object Map]", N7 = "[object Number]", $9 = "[object Object]", I7 = "[object RegExp]", E7 = "[object Set]", B7 = "[object String]", F7 = "[object Symbol]", U7 = "[object WeakMap]", z7 = "[object ArrayBuffer]", K7 = "[object DataView]", R7 = "[object Float32Array]", j7 = "[object Float64Array]", Q7 = "[object Int8Array]", Z7 = "[object Int16Array]", V7 = "[object Int32Array]", H7 = "[object Uint8Array]", q7 = "[object Uint8ClampedArray]", Y7 = "[object Uint16Array]", W7 = "[object Uint32Array]", ye = {};
ye[C9] = ye[M7] = ye[z7] = ye[K7] = ye[T7] = ye[S7] = ye[R7] = ye[j7] = ye[Q7] = ye[Z7] = ye[V7] = ye[O7] = ye[N7] = ye[$9] = ye[I7] = ye[E7] = ye[B7] = ye[F7] = ye[H7] = ye[q7] = ye[Y7] = ye[W7] = !0;
ye[P7] = ye[b9] = ye[U7] = !1;
function Ht(e, t, r, n, s, l) {
  var h, d = t & L7, p = t & w7, x = t & A7;
  if (r && (h = s ? r(e, n, s, l) : r(e)), h !== void 0)
    return h;
  if (!$7(e))
    return e;
  var v = p7(e);
  if (v) {
    if (h = g7(e), !d)
      return c7(e, h);
  } else {
    var L = m7(e), D = L == b9 || L == D7;
    if (C7(e))
      return l7(e, d);
    if (L == $9 || L == C9 || D && !s) {
      if (h = p || D ? {} : v7(e), !d)
        return p ? d7(e, s7(h, e)) : u7(e, a7(h, e));
    } else {
      if (!ye[L])
        return s ? e : {};
      h = y7(e, L, d);
    }
  }
  l || (l = new r7());
  var M = l.get(e);
  if (M)
    return M;
  l.set(e, h), _7(e) ? e.forEach(function(F) {
    h.add(Ht(F, t, r, F, e, l));
  }) : b7(e) && e.forEach(function(F, I) {
    h.set(I, Ht(F, t, r, I, e, l));
  });
  var q = x ? p ? f7 : h7 : p ? x7 : k7, N = v ? void 0 : q(e);
  return o7(N || e, function(F, I) {
    N && (I = F, F = e[I]), i7(h, I, Ht(F, t, r, I, e, l));
  }), h;
}
var G7 = Ht, X7 = G7, J7 = 1, el = 4;
function tl(e) {
  return X7(e, J7 | el);
}
var nl = tl;
const rl = /* @__PURE__ */ Wr(nl), ol = /* @__PURE__ */ b("<button></button>"), il = (e) => (() => {
  const t = ol.cloneNode(!0);
  return r1(t, "click", e.onClick, !0), C(t, () => e.children), B((r) => {
    const n = e.style, s = `klinecharts-pro-button ${e.type ?? "confirm"} ${e.class ?? ""}`;
    return r._v$ = I1(t, n, r._v$), s !== r._v$2 && ne(t, r._v$2 = s), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
Ze(["click"]);
const al = /* @__PURE__ */ b('<svg viewBox="0 0 1024 1024" class="icon"><path d="M810.666667 128H213.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v597.333334c0 46.933333 38.4 85.333333 85.333333 85.333333h597.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V213.333333c0-46.933333-38.4-85.333333-85.333333-85.333333z m-353.706667 567.04a42.496 42.496 0 0 1-60.16 0L243.626667 541.866667c-8.106667-8.106667-12.373333-18.773333-12.373334-29.866667s4.693333-22.186667 12.373334-29.866667a42.496 42.496 0 0 1 60.16 0L426.666667 604.586667l293.546666-293.546667a42.496 42.496 0 1 1 60.16 60.16l-323.413333 323.84z"></path></svg>'), sl = /* @__PURE__ */ b('<svg viewBox="0 0 1024 1024" class="icon"><path d="M245.333333 128h533.333334A117.333333 117.333333 0 0 1 896 245.333333v533.333334A117.333333 117.333333 0 0 1 778.666667 896H245.333333A117.333333 117.333333 0 0 1 128 778.666667V245.333333A117.333333 117.333333 0 0 1 245.333333 128z m0 64c-29.44 0-53.333333 23.893333-53.333333 53.333333v533.333334c0 29.44 23.893333 53.333333 53.333333 53.333333h533.333334c29.44 0 53.333333-23.893333 53.333333-53.333333V245.333333c0-29.44-23.893333-53.333333-53.333333-53.333333H245.333333z"></path></svg>'), ll = /* @__PURE__ */ b("<div></div>"), cl = /* @__PURE__ */ b('<span class="label"></span>'), ul = () => al.cloneNode(!0), dl = () => sl.cloneNode(!0), Sr = (e) => {
  const [t, r] = T(e.checked ?? !1);
  return Ke(() => {
    "checked" in e && r(e.checked);
  }), (() => {
    const n = ll.cloneNode(!0);
    return n.$$click = (s) => {
      const l = !t();
      e.onChange && e.onChange(l), r(l);
    }, C(n, (() => {
      const s = j(() => !!t());
      return () => s() ? w(ul, {}) : w(dl, {});
    })(), null), C(n, (() => {
      const s = j(() => !!e.label);
      return () => s() && (() => {
        const l = cl.cloneNode(!0);
        return C(l, () => e.label), l;
      })();
    })(), null), B((s) => {
      const l = e.style, h = `klinecharts-pro-checkbox ${t() && "checked" || ""} ${e.class || ""}`;
      return s._v$ = I1(n, l, s._v$), h !== s._v$2 && ne(n, s._v$2 = h), s;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), n;
  })();
};
Ze(["click"]);
const hl = /* @__PURE__ */ b('<div class="klinecharts-pro-loading"><i class="circle1"></i><i class="circle2"></i><i class="circle3"></i></div>'), _9 = () => hl.cloneNode(!0), fl = /* @__PURE__ */ b('<div class="klinecharts-pro-empty"><svg class="icon" viewBox="0 0 1024 1024"><path d="M855.6 427.2H168.5c-12.7 0-24.4 6.9-30.6 18L4.4 684.7C1.5 689.9 0 695.8 0 701.8v287.1c0 19.4 15.7 35.1 35.1 35.1H989c19.4 0 35.1-15.7 35.1-35.1V701.8c0-6-1.5-11.8-4.4-17.1L886.2 445.2c-6.2-11.1-17.9-18-30.6-18zM673.4 695.6c-16.5 0-30.8 11.5-34.3 27.7-12.7 58.5-64.8 102.3-127.2 102.3s-114.5-43.8-127.2-102.3c-3.5-16.1-17.8-27.7-34.3-27.7H119c-26.4 0-43.3-28-31.1-51.4l81.7-155.8c6.1-11.6 18-18.8 31.1-18.8h622.4c13 0 25 7.2 31.1 18.8l81.7 155.8c12.2 23.4-4.7 51.4-31.1 51.4H673.4zM819.9 209.5c-1-1.8-2.1-3.7-3.2-5.5-9.8-16.6-31.1-22.2-47.8-12.6L648.5 261c-17 9.8-22.7 31.6-12.6 48.4 0.9 1.4 1.7 2.9 2.5 4.4 9.5 17 31.2 22.8 48 13L807 257.3c16.7-9.7 22.4-31 12.9-47.8zM375.4 261.1L255 191.6c-16.7-9.6-38-4-47.8 12.6-1.1 1.8-2.1 3.6-3.2 5.5-9.5 16.8-3.8 38.1 12.9 47.8L337.3 327c16.9 9.7 38.6 4 48-13.1 0.8-1.5 1.7-2.9 2.5-4.4 10.2-16.8 4.5-38.6-12.4-48.4zM512 239.3h2.5c19.5 0.3 35.5-15.5 35.5-35.1v-139c0-19.3-15.6-34.9-34.8-35.1h-6.4C489.6 30.3 474 46 474 65.2v139c0 19.5 15.9 35.4 35.5 35.1h2.5z"></path></svg></div>'), ml = () => fl.cloneNode(!0), gl = /* @__PURE__ */ b("<ul></ul>"), yl = /* @__PURE__ */ b("<li></li>"), nn = (e) => (() => {
  const t = gl.cloneNode(!0);
  return C(t, w(J, {
    get when() {
      return e.loading;
    },
    get children() {
      return w(_9, {});
    }
  }), null), C(t, w(J, {
    get when() {
      var r;
      return !e.loading && !e.children && !((r = e.dataSource) != null && r.length);
    },
    get children() {
      return w(ml, {});
    }
  }), null), C(t, w(J, {
    get when() {
      return e.children;
    },
    get children() {
      return e.children;
    }
  }), null), C(t, w(J, {
    get when() {
      return !e.children;
    },
    get children() {
      var r;
      return (r = e.dataSource) == null ? void 0 : r.map((n) => {
        var s;
        return ((s = e.renderItem) == null ? void 0 : s.call(e, n)) ?? yl.cloneNode(!0);
      });
    }
  }), null), B((r) => {
    const n = e.style, s = `klinecharts-pro-list ${e.class ?? ""}`;
    return r._v$ = I1(t, n, r._v$), s !== r._v$2 && ne(t, r._v$2 = s), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})(), vl = /* @__PURE__ */ b('<div class="klinecharts-pro-modal"><div class="inner"><div class="title-container"><svg class="close-icon" viewBox="0 0 1024 1024"><path d="M934.184927 199.723787 622.457206 511.452531l311.727721 311.703161c14.334473 14.229073 23.069415 33.951253 23.069415 55.743582 0 43.430138-35.178197 78.660524-78.735226 78.660524-21.664416 0-41.361013-8.865925-55.642275-23.069415L511.149121 622.838388 199.420377 934.490384c-14.204513 14.20349-33.901111 23.069415-55.642275 23.069415-43.482327 0-78.737272-35.230386-78.737272-78.660524 0-21.792329 8.864902-41.513486 23.094998-55.743582l311.677579-311.703161L88.135828 199.723787c-14.230096-14.255679-23.094998-33.92567-23.094998-55.642275 0-43.430138 35.254945-78.762855 78.737272-78.762855 21.741163 0 41.437761 8.813736 55.642275 23.069415l311.727721 311.727721L822.876842 88.389096c14.281261-14.255679 33.977859-23.069415 55.642275-23.069415 43.557028 0 78.735226 35.332716 78.735226 78.762855C957.254342 165.798117 948.5194 185.468109 934.184927 199.723787"></path></svg></div><div class="content-container"></div></div></div>'), pl = /* @__PURE__ */ b('<div class="button-container"></div>'), x1 = (e) => (() => {
  const t = vl.cloneNode(!0), r = t.firstChild, n = r.firstChild, s = n.firstChild, l = n.nextSibling;
  return t.$$click = (h) => {
    h.target === h.currentTarget && e.onClose && e.onClose();
  }, C(n, () => e.title, s), r1(s, "click", e.onClose, !0), C(l, () => e.children), C(r, (() => {
    const h = j(() => !!(e.buttons && e.buttons.length > 0));
    return () => h() && (() => {
      const d = pl.cloneNode(!0);
      return C(d, () => e.buttons.map((p) => w(il, Yr(p, {
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
      })))), B((p) => {
        const x = e.btnParentStyle, v = !!e.isMobile;
        return p._v$8 = I1(d, x, p._v$8), v !== p._v$9 && d.classList.toggle("mobile-buttons", p._v$9 = v), p;
      }, {
        _v$8: void 0,
        _v$9: void 0
      }), d;
    })();
  })(), null), B((h) => {
    const d = !!e.isMobile, p = e.isMobile ? "100%" : `${e.width ?? 400}px`, x = (e.isMobile, "auto"), v = e.isMobile ? "60vh" : "90vh", L = !!e.isMobile, D = !!e.isMobile, M = !!e.isMobile;
    return d !== h._v$ && t.classList.toggle("mobile-modal", h._v$ = d), p !== h._v$2 && r.style.setProperty("width", h._v$2 = p), x !== h._v$3 && r.style.setProperty("height", h._v$3 = x), v !== h._v$4 && r.style.setProperty("max-height", h._v$4 = v), L !== h._v$5 && r.classList.toggle("mobile-inner", h._v$5 = L), D !== h._v$6 && n.classList.toggle("mobile-title", h._v$6 = D), M !== h._v$7 && l.classList.toggle("mobile-content", h._v$7 = M), h;
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
Ze(["click"]);
const Cl = /* @__PURE__ */ b('<div tabindex="0"><div class="selector-container"><span class="value"></span><i class="arrow"></i></div></div>'), bl = /* @__PURE__ */ b('<div class="drop-down-container"><ul></ul></div>'), $l = /* @__PURE__ */ b('<div><input type="text"></div>'), _l = /* @__PURE__ */ b("<li></li>"), k9 = (e) => {
  const [t, r] = T(!1), [n, s] = T("");
  let l, h;
  const d = j(() => {
    if (!e.dataSource || !e.searchable)
      return e.dataSource;
    const v = n().toLowerCase().trim();
    return v ? typeof e.dataSource[0] == "string" ? e.dataSource.filter((D) => D.toLowerCase().includes(v)) : e.dataSource.filter((D) => {
      var N, F;
      const M = ((N = D.text) == null ? void 0 : N.toString().toLowerCase()) || "", q = ((F = D.key) == null ? void 0 : F.toLowerCase()) || "";
      return M.includes(v) || q.includes(v);
    }) : e.dataSource;
  }), p = () => {
    const v = !t();
    r(v), s(""), v && e.searchable && setTimeout(() => l == null ? void 0 : l.focus(), 50);
  }, x = (v) => {
    const L = v.relatedTarget;
    h && L && h.contains(L) || (r(!1), s(""));
  };
  return (() => {
    const v = Cl.cloneNode(!0), L = v.firstChild, D = L.firstChild;
    v.addEventListener("blur", x), v.$$click = (q) => {
      q.stopPropagation(), p();
    };
    const M = h;
    return typeof M == "function" ? _1(M, v) : h = v, C(D, () => e.value), C(v, (() => {
      const q = j(() => !!(e.dataSource && e.dataSource.length > 0));
      return () => q() && (() => {
        const N = bl.cloneNode(!0), F = N.firstChild;
        return N.$$mousedown = (I) => I.preventDefault(), C(N, (() => {
          const I = j(() => !!e.searchable);
          return () => I() && (() => {
            const re = $l.cloneNode(!0), R = re.firstChild;
            re.style.setProperty("padding", "8px"), re.style.setProperty("border-bottom", "1px solid #333"), R.$$click = (V) => V.stopPropagation(), R.$$input = (V) => s(V.currentTarget.value);
            const Y = l;
            return typeof Y == "function" ? _1(Y, R) : l = R, R.style.setProperty("width", "100%"), R.style.setProperty("padding", "6px 10px"), R.style.setProperty("border", "1px solid var(--klinecharts-pro-border-color)"), R.style.setProperty("border-radius", "4px"), R.style.setProperty("background-color", "var(--klinecharts-pro-popover-background-color)"), R.style.setProperty("color", "#fff"), R.style.setProperty("font-size", "13px"), R.style.setProperty("outline", "none"), B(() => Oe(R, "placeholder", e.searchPlaceholder || "Search...")), B(() => R.value = n()), re;
          })();
        })(), F), C(F, () => {
          var I;
          return (I = d()) == null ? void 0 : I.map((re) => {
            const Y = re[e.valueKey ?? "text"] ?? re;
            return (() => {
              const V = _l.cloneNode(!0);
              return V.$$click = (me) => {
                var U;
                me.stopPropagation(), e.value !== Y && ((U = e.onSelected) == null || U.call(e, re)), r(!1), s("");
              }, C(V, Y), B(() => V.classList.toggle("selected", e.value === Y)), V;
            })();
          });
        }), N;
      })();
    })(), null), B((q) => {
      const N = e.style, F = `klinecharts-pro-select ${e.class ?? ""} ${t() ? "klinecharts-pro-select-show" : ""}`;
      return q._v$ = I1(v, N, q._v$), F !== q._v$2 && ne(v, q._v$2 = F), q;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), v;
  })();
};
Ze(["click", "mousedown", "input"]);
const kl = /* @__PURE__ */ b('<span class="prefix"></span>'), xl = /* @__PURE__ */ b('<span class="suffix"></span>'), Ll = /* @__PURE__ */ b('<div><input class="value"></div>'), x9 = (e) => {
  const t = Yr({
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER
  }, e);
  let r;
  const [n, s] = T("normal");
  return (() => {
    const l = Ll.cloneNode(!0), h = l.firstChild;
    return l.$$click = () => {
      r == null || r.focus();
    }, C(l, w(J, {
      get when() {
        return t.prefix;
      },
      get children() {
        const d = kl.cloneNode(!0);
        return C(d, () => t.prefix), d;
      }
    }), h), h.addEventListener("change", (d) => {
      var x, v;
      const p = d.target.value;
      if ("precision" in t) {
        let L;
        const D = Math.max(0, Math.floor(t.precision));
        D <= 0 ? L = new RegExp(/^[1-9]\d*$/) : L = new RegExp("^\\d+\\.?\\d{0," + D + "}$"), (p === "" || L.test(p) && +p >= t.min && +p <= t.max) && ((x = t.onChange) == null || x.call(t, p === "" ? p : +p));
      } else
        (v = t.onChange) == null || v.call(t, p);
    }), h.addEventListener("blur", () => {
      s("normal");
    }), h.addEventListener("focus", () => {
      s("focus");
    }), _1((d) => {
      r = d;
    }, h), C(l, w(J, {
      get when() {
        return t.suffix;
      },
      get children() {
        const d = xl.cloneNode(!0);
        return C(d, () => t.suffix), d;
      }
    }), null), B((d) => {
      const p = t.style, x = `klinecharts-pro-input ${t.class ?? ""}`, v = n(), L = t.placeholder ?? "";
      return d._v$ = I1(l, p, d._v$), x !== d._v$2 && ne(l, d._v$2 = x), v !== d._v$3 && Oe(l, "data-status", d._v$3 = v), L !== d._v$4 && Oe(h, "placeholder", d._v$4 = L), d;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0
    }), B(() => h.value = t.value), l;
  })();
};
Ze(["click"]);
const wl = /* @__PURE__ */ b('<div><i class="thumb"></i></div>'), Al = (e) => (() => {
  const t = wl.cloneNode(!0);
  return t.$$click = (r) => {
    e.onChange && e.onChange();
  }, B((r) => {
    const n = e.style, s = `klinecharts-pro-switch ${e.open ? "turn-on" : "turn-off"} ${e.class ?? ""}`;
    return r._v$ = I1(t, n, r._v$), s !== r._v$2 && ne(t, r._v$2 = s), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
Ze(["click"]);
const Ml = "指标", Tl = "更多", Sl = "主图指标", Pl = "副图指标", Dl = "设置", Ol = "时区", Nl = "截屏", Il = "全屏", El = "退出全屏", Bl = "保存", Fl = "确定", Ul = "取消", zl = "MA(移动平均线)", Kl = "EMA(指数平滑移动平均线)", Rl = "SMA", jl = "BOLL(布林线)", Ql = "BBI(多空指数)", Zl = "SAR(停损点指向指标)", Vl = "VOL(成交量)", Hl = "MACD(指数平滑异同移动平均线)", ql = "KDJ(随机指标)", Yl = "RSI(相对强弱指标)", Wl = "BIAS(乖离率)", Gl = "BRAR(情绪指标)", Xl = "CCI(顺势指标)", Jl = "DMI(动向指标)", e4 = "CR(能量指标)", t4 = "PSY(心理线)", n4 = "DMA(平行线差指标)", r4 = "TRIX(三重指数平滑平均线)", o4 = "OBV(能量潮指标)", i4 = "VR(成交量变异率)", a4 = "WR(威廉指标)", s4 = "MTM(动量指标)", l4 = "EMV(简易波动指标)", c4 = "ROC(变动率指标)", u4 = "PVT(价量趋势指标)", d4 = "AO(动量震荡指标)", h4 = "世界统一时间", f4 = "(UTC-10) 檀香山", m4 = "(UTC-8) 朱诺", g4 = "(UTC-7) 洛杉矶", y4 = "(UTC-5) 芝加哥", v4 = "(UTC-4) 多伦多", p4 = "(UTC-3) 圣保罗", C4 = "(UTC+1) 伦敦", b4 = "(UTC+2) 柏林", $4 = "(UTC+3) 巴林", _4 = "(UTC+4) 迪拜", k4 = "(UTC+5) 阿什哈巴德", x4 = "(UTC+6) 阿拉木图", L4 = "(UTC+7) 曼谷", w4 = "(UTC+8) 上海", A4 = "(UTC+9) 东京", M4 = "(UTC+10) 悉尼", T4 = "(UTC+12) 诺福克岛", S4 = "水平直线", P4 = "水平射线", D4 = "水平线段", O4 = "垂直直线", N4 = "垂直射线", I4 = "垂直线段", E4 = "直线", B4 = "射线", F4 = "线段", U4 = "箭头", z4 = "价格线", K4 = "价格通道线", R4 = "平行直线", j4 = "斐波那契回调直线", Q4 = "斐波那契回调线段", Z4 = "斐波那契圆环", V4 = "斐波那契螺旋", H4 = "斐波那契速度阻力扇", q4 = "斐波那契趋势扩展", Y4 = "江恩箱", W4 = "矩形", G4 = "平行四边形", X4 = "圆", J4 = "三角形", ec = "三浪", tc = "五浪", nc = "八浪", rc = "任意浪", oc = "ABCD形态", ic = "XABCD形态", ac = "弱磁模式", sc = "强磁模式", lc = "商品搜索", cc = "商品代码", uc = "参数1", dc = "参数2", hc = "参数3", fc = "参数4", mc = "参数5", gc = "周期", yc = "标准差", vc = "蜡烛图类型", pc = "全实心", Cc = "全空心", bc = "涨空心", $c = "跌空心", _c = "OHLC", kc = "面积图", xc = "最新价显示", Lc = "最高价显示", wc = "最低价显示", Ac = "指标最新值显示", Mc = "价格轴类型", Tc = "线性轴", Sc = "百分比轴", Pc = "对数轴", Dc = "倒置坐标", Oc = "网格线显示", Nc = "恢复默认", Ic = {
  indicator: Ml,
  more: Tl,
  main_indicator: Sl,
  sub_indicator: Pl,
  setting: Dl,
  timezone: Ol,
  screenshot: Nl,
  full_screen: Il,
  exit_full_screen: El,
  save: Bl,
  confirm: Fl,
  cancel: Ul,
  ma: zl,
  ema: Kl,
  sma: Rl,
  boll: jl,
  bbi: Ql,
  sar: Zl,
  vol: Vl,
  macd: Hl,
  kdj: ql,
  rsi: Yl,
  bias: Wl,
  brar: Gl,
  cci: Xl,
  dmi: Jl,
  cr: e4,
  psy: t4,
  dma: n4,
  trix: r4,
  obv: o4,
  vr: i4,
  wr: a4,
  mtm: s4,
  emv: l4,
  roc: c4,
  pvt: u4,
  ao: d4,
  utc: h4,
  honolulu: f4,
  juneau: m4,
  los_angeles: g4,
  chicago: y4,
  toronto: v4,
  sao_paulo: p4,
  london: C4,
  berlin: b4,
  bahrain: $4,
  dubai: _4,
  ashkhabad: k4,
  almaty: x4,
  bangkok: L4,
  shanghai: w4,
  tokyo: A4,
  sydney: M4,
  norfolk: T4,
  horizontal_straight_line: S4,
  horizontal_ray_line: P4,
  horizontal_segment: D4,
  vertical_straight_line: O4,
  vertical_ray_line: N4,
  vertical_segment: I4,
  straight_line: E4,
  ray_line: B4,
  segment: F4,
  arrow: U4,
  price_line: z4,
  price_channel_line: K4,
  parallel_straight_line: R4,
  fibonacci_line: j4,
  fibonacci_segment: Q4,
  fibonacci_circle: Z4,
  fibonacci_spiral: V4,
  fibonacci_speed_resistance_fan: H4,
  fibonacci_extension: q4,
  gann_box: Y4,
  rect: W4,
  parallelogram: G4,
  circle: X4,
  triangle: J4,
  three_waves: ec,
  five_waves: tc,
  eight_waves: nc,
  any_waves: rc,
  abcd: oc,
  xabcd: ic,
  weak_magnet: ac,
  strong_magnet: sc,
  symbol_search: lc,
  symbol_code: cc,
  params_1: uc,
  params_2: dc,
  params_3: hc,
  params_4: fc,
  params_5: mc,
  period: gc,
  standard_deviation: yc,
  candle_type: vc,
  candle_solid: pc,
  candle_stroke: Cc,
  candle_up_stroke: bc,
  candle_down_stroke: $c,
  ohlc: _c,
  area: kc,
  last_price_show: xc,
  high_price_show: Lc,
  low_price_show: wc,
  indicator_last_value_show: Ac,
  price_axis_type: Mc,
  normal: Tc,
  percentage: Sc,
  log: Pc,
  reverse_coordinate: Dc,
  grid_show: Oc,
  restore_default: Nc
}, Ec = "Indicator", Bc = "More", Fc = "Main Indicator", Uc = "Sub Indicator", zc = "Setting", Kc = "Timezone", Rc = "Screenshot", jc = "Full Screen", Qc = "Exit", Zc = "Save", Vc = "Confirm", Hc = "Cancel", qc = "MA(Moving Average)", Yc = "EMA(Exponential Moving Average)", Wc = "SMA", Gc = "BOLL(Bolinger Bands)", Xc = "BBI(Bull And Bearlndex)", Jc = "SAR(Stop and Reverse)", eu = "VOL(Volume)", tu = "MACD(Moving Average Convergence / Divergence)", nu = "KDJ(KDJ Index)", ru = "RSI(Relative Strength Index)", ou = "BIAS(Bias Ratio)", iu = "BRAR(情绪指标)", au = "CCI(Commodity Channel Index)", su = "DMI(Directional Movement Index)", lu = "CR(能量指标)", cu = "PSY(Psychological Line)", uu = "DMA(Different of Moving Average)", du = "TRIX(Triple Exponentially Smoothed Moving Average)", hu = "OBV(On Balance Volume)", fu = "VR(Volatility Volume Ratio)", mu = "WR(Williams %R)", gu = "MTM(Momentum Index)", yu = "EMV(Ease of Movement Value)", vu = "ROC(Price Rate of Change)", pu = "PVT(Price and Volume Trend)", Cu = "AO(Awesome Oscillator)", bu = "UTC", $u = "(UTC-10) Honolulu", _u = "(UTC-8) Juneau", ku = "(UTC-7) Los Angeles", xu = "(UTC-5) Chicago", Lu = "(UTC-4) Toronto", wu = "(UTC-3) Sao Paulo", Au = "(UTC+1) London", Mu = "(UTC+2) Berlin", Tu = "(UTC+3) Bahrain", Su = "(UTC+4) Dubai", Pu = "(UTC+5) Ashkhabad", Du = "(UTC+6) Almaty", Ou = "(UTC+7) Bangkok", Nu = "(UTC+8) Shanghai", Iu = "(UTC+9) Tokyo", Eu = "(UTC+10) Sydney", Bu = "(UTC+12) Norfolk", Fu = "Horizontal Line", Uu = "Horizontal Ray", zu = "Horizontal Segment", Ku = "Vertical Line", Ru = "Vertical Ray", ju = "Vertical Segment", Qu = "Trend Line", Zu = "Ray", Vu = "Segment", Hu = "Arrow", qu = "Price Line", Yu = "Price Channel Line", Wu = "Parallel Line", Gu = "Fibonacci Line", Xu = "Fibonacci Segment", Ju = "Fibonacci Circle", ed = "Fibonacci Spiral", td = "Fibonacci Sector", nd = "Fibonacci Extension", rd = "Gann Box", od = "Rect", id = "Parallelogram", ad = "Circle", sd = "Triangle", ld = "Three Waves", cd = "Five Waves", ud = "Eight Waves", dd = "Any Waves", hd = "ABCD Pattern", fd = "XABCD Pattern", md = "Weak Magnet", gd = "Strong Magnet", yd = "Symbol Search", vd = "Symbol Code", pd = "Parameter 1", Cd = "Parameter 2", bd = "Parameter 3", $d = "Parameter 4", _d = "Parameter 5", kd = "Period", xd = "Standard Deviation", Ld = "Candle Type", wd = "Candle Solid", Ad = "Candle Stroke", Md = "Candle Up Stroke", Td = "Candle Down Stroke", Sd = "OHLC", Pd = "Area", Dd = "Show Last Price", Od = "Show Highest Price", Nd = "Show Lowest Price", Id = "Show indicator's last value", Ed = "Price Axis Type", Bd = "Normal", Fd = "Percentage", Ud = "Log", zd = "Reverse Coordinate", Kd = "Show Grids", Rd = "Restore Defaults", jd = {
  indicator: Ec,
  more: Bc,
  main_indicator: Fc,
  sub_indicator: Uc,
  setting: zc,
  timezone: Kc,
  screenshot: Rc,
  full_screen: jc,
  exit_full_screen: Qc,
  save: Zc,
  confirm: Vc,
  cancel: Hc,
  ma: qc,
  ema: Yc,
  sma: Wc,
  boll: Gc,
  bbi: Xc,
  sar: Jc,
  vol: eu,
  macd: tu,
  kdj: nu,
  rsi: ru,
  bias: ou,
  brar: iu,
  cci: au,
  dmi: su,
  cr: lu,
  psy: cu,
  dma: uu,
  trix: du,
  obv: hu,
  vr: fu,
  wr: mu,
  mtm: gu,
  emv: yu,
  roc: vu,
  pvt: pu,
  ao: Cu,
  utc: bu,
  honolulu: $u,
  juneau: _u,
  los_angeles: ku,
  chicago: xu,
  toronto: Lu,
  sao_paulo: wu,
  london: Au,
  berlin: Mu,
  bahrain: Tu,
  dubai: Su,
  ashkhabad: Pu,
  almaty: Du,
  bangkok: Ou,
  shanghai: Nu,
  tokyo: Iu,
  sydney: Eu,
  norfolk: Bu,
  horizontal_straight_line: Fu,
  horizontal_ray_line: Uu,
  horizontal_segment: zu,
  vertical_straight_line: Ku,
  vertical_ray_line: Ru,
  vertical_segment: ju,
  straight_line: Qu,
  ray_line: Zu,
  segment: Vu,
  arrow: Hu,
  price_line: qu,
  price_channel_line: Yu,
  parallel_straight_line: Wu,
  fibonacci_line: Gu,
  fibonacci_segment: Xu,
  fibonacci_circle: Ju,
  fibonacci_spiral: ed,
  fibonacci_speed_resistance_fan: td,
  fibonacci_extension: nd,
  gann_box: rd,
  rect: od,
  parallelogram: id,
  circle: ad,
  triangle: sd,
  three_waves: ld,
  five_waves: cd,
  eight_waves: ud,
  any_waves: dd,
  abcd: hd,
  xabcd: fd,
  weak_magnet: md,
  strong_magnet: gd,
  symbol_search: yd,
  symbol_code: vd,
  params_1: pd,
  params_2: Cd,
  params_3: bd,
  params_4: $d,
  params_5: _d,
  period: kd,
  standard_deviation: xd,
  candle_type: Ld,
  candle_solid: wd,
  candle_stroke: Ad,
  candle_up_stroke: Md,
  candle_down_stroke: Td,
  ohlc: Sd,
  area: Pd,
  last_price_show: Dd,
  high_price_show: Od,
  low_price_show: Nd,
  indicator_last_value_show: Id,
  price_axis_type: Ed,
  normal: Bd,
  percentage: Fd,
  log: Ud,
  reverse_coordinate: zd,
  grid_show: Kd,
  restore_default: Rd
}, L9 = {
  "zh-CN": Ic,
  "en-US": jd
};
function qm(e, t) {
  L9[e] = t;
}
const c = (e, t) => {
  var r;
  return ((r = L9[t]) == null ? void 0 : r[e]) ?? e;
}, Qd = /* @__PURE__ */ b('<div class="scroll-indicator left"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg></div>'), Zd = /* @__PURE__ */ b('<img alt="symbol">'), Vd = /* @__PURE__ */ b('<div class="symbol"><span></span></div>'), Hd = /* @__PURE__ */ b('<span class="down-arrow-icon mobile-separate-arrow"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></span>'), qd = /* @__PURE__ */ b('<span class="mobile-more-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg></span>'), Yd = /* @__PURE__ */ b('<div class="item tools" title="Time Tools"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M16 3v4"></path><path d="M8 3v4"></path><path d="M3 10h18"></path><path d="M12 14v4"></path><path d="M10 16h4"></path></svg></div>'), Wd = /* @__PURE__ */ b('<div class="item tools"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div>'), Gd = /* @__PURE__ */ b('<div class="klinecharts-pro-order-tools-display-menu"></div>'), Xd = /* @__PURE__ */ b('<div class="klinecharts-pro-order-tools-popover"><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Quick Order</span></span><span class="klinecharts-pro-order-tools-chevron">›</span></button><div class="klinecharts-pro-order-tools-submenu"><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Floating Window</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Plus Button</span></label></div></div><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Open Orders</span></span><span class="klinecharts-pro-order-tools-chevron">&rsaquo;</span></button><div class="klinecharts-pro-order-tools-submenu"><div class="klinecharts-pro-order-tools-setting-row"><span class="klinecharts-pro-order-tools-label">Extended Price Line</span><button type="button"><span></span></button></div><div class="klinecharts-pro-order-tools-setting-row"><span class="klinecharts-pro-order-tools-label">Display</span><div class="klinecharts-pro-order-tools-display"><button type="button" class="klinecharts-pro-order-tools-display-button"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4"></path></svg></button></div></div></div></div><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Positions</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Breakeven Price</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Liquidation Price</span></label><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Price Line</span></span><span class="klinecharts-pro-order-tools-chevron">&rsaquo;</span></button><div class="klinecharts-pro-order-tools-submenu"><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Market Price Line</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Count Down</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Bid & Ask Price</span></label></div></div><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Order History</span></label></div>'), Jd = /* @__PURE__ */ b('<div><div class="item tools order-tools-trigger"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Orders"><path d="M4 7h10"></path><path d="M4 12h8"></path><path d="M4 17h6"></path><path d="M18 6v12"></path><path d="M15 15l3 3 3-3"></path></svg><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></div></div>'), eh = /* @__PURE__ */ b('<div class="item tools"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path><path d="M15.22299772857666,9.722223632261718C12.59389772857666,9.722223632261718,10.44600772857666,12.020201374511718,10.44600772857666,14.861111374511719C10.44600772857666,17.70202137451172,12.58215772857666,20.000021374511718,15.223007728576661,20.000021374511718C17.86384772857666,20.000021374511718,19.99999772857666,17.70202137451172,19.99999772857666,14.861111374511719C19.99999772857666,12.020201374511718,17.85211772857666,9.72222212709572,15.22299772857666,9.722223632261718ZM15.22299772857666,18.598491374511717C13.30985772857666,18.598491374511717,11.737087728576661,16.91919137451172,11.737087728576661,14.848481374511719C11.737087728576661,12.777781374511719,13.29811772857666,11.098491374511719,15.22299772857666,11.098491374511719C17.14787772857666,11.098491374511719,18.708917728576658,12.777781374511719,18.708917728576658,14.848481374511719C18.708917728576658,16.91919137451172,17.13614772857666,18.59848137451172,15.22299772857666,18.598491374511717Z"></path><path d="M15.692486288146974,15.050496970825195L15.692486288146974,12.676760970825196C15.692486288146974,12.297972970825196,15.399058288146973,11.982316970825195,15.046945288146972,11.982316970825195C14.694833288146972,11.982316970825195,14.401406288146973,12.297972970825196,14.401406288146973,12.676760970825196L14.401406288146973,15.340896970825195C14.401406288146973,15.530296970825194,14.471829288146973,15.694436970825196,14.589200288146973,15.833326970825196L15.751176288146972,17.095956970825195C15.868546288146973,17.222216970825194,16.032866288146973,17.297976970825196,16.208916288146973,17.297976970825196C16.384976288146973,17.297976970825196,16.537556288146973,17.222216970825194,16.666666288146974,17.095956970825195C16.78403628814697,16.969686970825194,16.854456288146974,16.792916970825196,16.854456288146974,16.603526970825193C16.854456288146974,16.414136970825197,16.78403628814697,16.237366970825196,16.666666288146974,16.111106970825197L15.692486288146974,15.050496970825195Z"></path></svg></div>'), th = /* @__PURE__ */ b('<div class="item tools"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg></div>'), nh = /* @__PURE__ */ b('<div class="item tools"><svg viewBox="0 0 20 20"><path d="M6.50977,1L13.4902,1C13.6406,1,13.7695,1.1104910000000001,13.7969,1.2631700000000001L14.0273,2.52277C14.1387,3.13147,14.6543,3.57143,15.2559,3.57143L17.5,3.57143C18.8809,3.57143,20,4.72254,20,6.14286L20,16.4286C20,17.8489,18.8809,19,17.5,19L2.5,19C1.11914,19,0,17.8489,0,16.4286L0,6.14286C0,4.72254,1.11914,3.57143,2.5,3.57143L4.74414,3.57143C5.3457,3.57143,5.86133,3.13147,5.97266,2.52277L6.20312,1.2631700000000001C6.23047,1.1104910000000001,6.35937,1,6.50977,1ZM15.2559,4.857139999999999C14.0547,4.857139999999999,13.0215,3.97522,12.7988,2.75982L12.7129,2.28571L7.28711,2.28571L7.20117,2.75982C6.98047,3.97522,5.94727,4.857139999999999,4.74414,4.857139999999999L2.5,4.857139999999999C1.81055,4.857139999999999,1.25,5.43371,1.25,6.14286L1.25,16.4286C1.25,17.1377,1.81055,17.7143,2.5,17.7143L17.5,17.7143C18.1895,17.7143,18.75,17.1377,18.75,16.4286L18.75,6.14286C18.75,5.43371,18.1895,4.857139999999999,17.5,4.857139999999999L15.2559,4.857139999999999ZM4.375,6.78571L3.125,6.78571C2.7793,6.78571,2.5,6.49844,2.5,6.14286C2.5,5.78728,2.7793,5.5,3.125,5.5L4.375,5.5C4.7207,5.5,5,5.78728,5,6.14286C5,6.49844,4.7207,6.78571,4.375,6.78571ZM10,6.14286C7.06641,6.14286,4.6875,8.58973,4.6875,11.6071C4.6875,14.6246,7.06641,17.0714,10,17.0714C12.9336,17.0714,15.3125,14.6246,15.3125,11.6071C15.3125,8.58973,12.9336,6.14286,10,6.14286ZM10,7.42857C11.0859,7.42857,12.1055,7.8625,12.873,8.65201C13.6406,9.44152,14.0625,10.49018,14.0625,11.6071C14.0625,12.7241,13.6406,13.7728,12.873,14.5623C12.1055,15.3518,11.0859,15.7857,10,15.7857C8.91406,15.7857,7.89453,15.3518,7.12695,14.5623C6.35937,13.7728,5.9375,12.7241,5.9375,11.6071C5.9375,10.49018,6.35938,9.44152,7.12695,8.65201C7.89453,7.8625,8.91406,7.42857,10,7.42857ZM10,9.67857C8.96484,9.67857,8.125,10.54241,8.125,11.6071C8.125,12.6719,8.96484,13.5357,10,13.5357C11.0352,13.5357,11.875,12.6719,11.875,11.6071C11.875,10.54241,11.0352,9.67857,10,9.67857ZM10,10.96429C10.3438,10.96429,10.625,11.2536,10.625,11.6071C10.625,11.9607,10.3438,12.25,10,12.25C9.65625,12.25,9.375,11.9607,9.375,11.6071C9.375,11.2536,9.65625,10.96429,10,10.96429Z"></path></svg></div>'), rh = /* @__PURE__ */ b('<div class="item tools chart-view-toggle"></div>'), oh = /* @__PURE__ */ b('<div class="scroll-indicator right"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"></path></svg></div>'), ih = /* @__PURE__ */ b('<div><div class="klinecharts-pro-period-bar"><div class="menu-container"><svg viewBox="0 0 1024 1024"><path d="M192.037 287.953h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 479.169H438.553c-17.673 0-32 14.327-32 32s14.327 32 32 32h393.608c17.673 0 32-14.327 32-32s-14.327-32-32-32zM832.161 735.802H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32zM319.028 351.594l-160 160 160 160z"></path></svg></div><div><div class="item tools fullscreen-toggle"></div></div></div></div>'), ah = /* @__PURE__ */ b("<span></span>"), sh = /* @__PURE__ */ b('<button type="button"></button>'), lh = /* @__PURE__ */ b('<svg viewBox="0 0 20 20"><path d="M1.08108,0L0,1.079L4.18919,5.27938L2.54826,6.91715L6.9112,6.91715L6.9112,2.56262L5.28957,4.18112L1.08108,0ZM15.8108,5.27938L20,1.079L18.9189,0L14.7104,4.18112L13.0888,2.56262L13.0888,6.91715L17.4517,6.91715L15.8108,5.27938ZM4.16988,14.7014L0.07722,18.8054L1.1583,20L5.27027,15.7996L6.9112,17.4374L6.9112,13.0829L2.54826,13.0829L4.16988,14.7014ZM17.4517,13.0829L13.0888,13.0829L13.0888,17.4374L14.7297,15.7996L18.8417,20L19.9228,18.8054L15.8301,14.7013L17.4517,13.0829Z"></path></svg>'), ch = /* @__PURE__ */ b('<svg viewBox="0 0 20 20"><path d="M2.93444,1.76899L7.57544,6.40999L6.38918,7.59626L1.76899,2.93444L0,4.70343L0,0L4.70343,0L2.93444,1.76899ZM6.40999,12.4037L1.76899,17.0447L0,15.2758L0,19.9792L4.70343,19.9792L2.93444,18.2102L7.57544,13.5692L6.40999,12.4037ZM15.2758,0L17.0447,1.76899L12.4037,6.40999L13.59,7.59626L18.231,2.95526L20,4.72425L20,0L15.2758,0ZM13.5692,12.4037L12.3829,13.59L17.0239,18.231L15.2549,20L19.9792,20L19.9792,15.2758L18.2102,17.0447L13.5692,12.4037Z"></path></svg>'), uh = /* @__PURE__ */ b('<svg viewBox="0 0 24 24"><path d="M3 20V7l4 3 5-7 5 4h4v13H3Zm5-3 4-5.5 7 5.45V9h-2.7l-3.9-3.1-4.95 6.95L5 10.4V14l3 3Z"></path></svg>'), dh = /* @__PURE__ */ b('<svg viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M9 4H7v2H5v12h2v2h2v-2h2V6H9zM19 8h-2V4h-2v4h-2v7h2v5h2v-5h2z"></path></svg>'), Pr = (e) => e.charAt(0).toUpperCase() + e.slice(1), hh = (e) => {
  let t, r, n;
  const [s, l] = T(window.innerWidth < 768), [h, d] = T(localStorage.getItem("klinechart_secondary_period") || ""), [p, x] = T(!1), [v, L] = T(!1), [D, M] = T(!1), [q, N] = T(!1), [F, I] = T(!1), [re, R] = T({
    top: 0,
    left: 0,
    minWidth: 220
  }), Y = () => {
    l(window.innerWidth < 768), requestAnimationFrame(oe), p() && $e();
  }, [V, me] = T(!1), U = () => document.fullscreenElement ?? document.body, Q = () => {
    me(!!document.fullscreenElement);
  }, [H, te] = T(!1), [se, Le] = T(!1), $e = () => {
    if (!r)
      return;
    const O = r.getBoundingClientRect(), E = Math.max(220, Math.ceil(O.width)), be = window.innerWidth, we = Math.min(Math.max(8, O.right - E), Math.max(8, be - E - 8));
    R({
      top: Math.ceil(O.bottom + 8),
      left: Math.ceil(we),
      minWidth: E
    });
  }, ie = () => {
    L(!1), M(!1), N(!1), I(!1);
  }, Ue = () => {
    x((O) => {
      const E = !O;
      return E ? queueMicrotask($e) : ie(), E;
    });
  }, ke = (O) => {
    if (!p())
      return;
    const E = O.target;
    E && (r != null && r.contains(E) || n != null && n.contains(E) || (ie(), x(!1)));
  }, ve = () => {
    p() && $e();
  }, oe = () => {
    if (!t) {
      te(!1), Le(!1);
      return;
    }
    const O = t, E = O.scrollWidth > O.clientWidth + 2;
    te(E && O.scrollLeft > 2), Le(E && O.scrollLeft + O.clientWidth < O.scrollWidth - 2);
  };
  In(() => {
    window.addEventListener("resize", Y), document.addEventListener("fullscreenchange", Q), document.addEventListener("mousedown", ke), window.addEventListener("scroll", ve, !0), document.addEventListener("mozfullscreenchange", Q), document.addEventListener("webkitfullscreenchange", Q), document.addEventListener("msfullscreenchange", Q), t && (t.addEventListener("scroll", oe), setTimeout(oe, 100));
  }), N1(() => {
    window.removeEventListener("resize", Y), document.removeEventListener("fullscreenchange", Q), document.removeEventListener("mousedown", ke), window.removeEventListener("scroll", ve, !0), document.removeEventListener("mozfullscreenchange", Q), document.removeEventListener("webkitfullscreenchange", Q), document.removeEventListener("msfullscreenchange", Q), t && t.removeEventListener("scroll", oe);
  });
  const ue = j(() => {
    const O = e.periods.filter((E) => {
      if (!s() || V())
        return !0;
      const be = e.period.text, we = h();
      if (E.text === be || we && E.text === we)
        return !0;
      if (!we || we === be) {
        const de = e.periods.find((Ae) => Ae.text !== be);
        return E.text === (de == null ? void 0 : de.text);
      }
      return !1;
    }).slice(0, s() && !V() ? 2 : e.periods.length);
    return setTimeout(oe, 50), O;
  });
  let Z = e.period.text;
  return Ke(() => {
    const O = e.period.text;
    O !== Z && (s() && (d(Z), localStorage.setItem("klinechart_secondary_period", Z)), Z = O), setTimeout(oe, 50);
  }), Ke(() => {
    V(), setTimeout(oe, 100);
  }), Ke(() => {
    if (!e.showOrderToolsMenu) {
      x(!1);
      return;
    }
    p() && queueMicrotask($e);
  }), (() => {
    const O = ih.cloneNode(!0), E = O.firstChild, be = E.firstChild, we = be.firstChild, de = be.nextSibling, Ae = de.firstChild;
    return O.style.setProperty("position", "relative"), O.style.setProperty("width", "100%"), O.style.setProperty("display", "flex"), O.style.setProperty("align-items", "center"), C(O, w(J, {
      get when() {
        return H();
      },
      get children() {
        const _ = Qd.cloneNode(!0);
        return _.$$click = () => t.scrollBy({
          left: -100,
          behavior: "smooth"
        }), _.style.setProperty("position", "absolute"), _.style.setProperty("left", "0"), _.style.setProperty("top", "0"), _.style.setProperty("bottom", "1px"), _.style.setProperty("width", "30px"), _.style.setProperty("display", "flex"), _.style.setProperty("align-items", "center"), _.style.setProperty("justify-content", "center"), _.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), _.style.setProperty("z-index", "10"), _.style.setProperty("cursor", "pointer"), _.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), _;
      }
    }), E), _1((_) => {
      t = _;
    }, E), E.style.setProperty("width", "100%"), E.style.setProperty("overflow", "auto"), r1(we, "click", e.onMenuClick, !0), C(E, w(J, {
      get when() {
        return e.symbol;
      },
      get children() {
        const _ = Vd.cloneNode(!0), le = _.firstChild;
        return r1(_, "click", e.onSymbolClick, !0), C(_, w(J, {
          get when() {
            return e.symbol.logo;
          },
          get children() {
            const Pe = Zd.cloneNode(!0);
            return B(() => Oe(Pe, "src", e.symbol.logo)), Pe;
          }
        }), le), C(le, () => e.symbol.shortName ?? e.symbol.name ?? e.symbol.ticker), _;
      }
    }), de), C(E, () => ue().map((_, le) => {
      const Pe = _.text === e.period.text;
      return (() => {
        const a1 = ah.cloneNode(!0);
        return a1.$$click = (ge) => {
          s() && Pe && !V() ? (e.onMobilePeriodClick ? e.onMobilePeriodClick(_) : e.onMenuClick(), ge.stopPropagation()) : e.onPeriodChange(_);
        }, ne(a1, `item period ${Pe ? "selected" : ""}`), C(a1, () => _.text), a1;
      })();
    }), de), C(E, w(J, {
      get when() {
        return j(() => !!(s() && !V()))() && ue().length > 1;
      },
      get children() {
        const _ = Hd.cloneNode(!0);
        return _.$$click = (le) => {
          le.stopPropagation(), e.onMobilePeriodClick ? e.onMobilePeriodClick(e.period) : e.onMenuClick();
        }, _.style.setProperty("margin-left", "4px"), _.style.setProperty("display", "inline-flex"), _.style.setProperty("align-items", "center"), _;
      }
    }), de), C(E, w(J, {
      get when() {
        return j(() => !!s())() && !V();
      },
      get children() {
        const _ = qd.cloneNode(!0);
        return _.$$click = (le) => {
          var Pe;
          le.stopPropagation(), (Pe = e.onMobileMoreClick) == null || Pe.call(e);
        }, _.style.setProperty("margin-left", "8px"), _.style.setProperty("display", "inline-flex"), _.style.setProperty("align-items", "center"), _.style.setProperty("cursor", "pointer"), _.style.setProperty("padding", "0 4px"), _;
      }
    }), de), C(E, w(J, {
      get when() {
        return !s();
      },
      get children() {
        const _ = Yd.cloneNode(!0);
        return r1(_, "click", e.onTimeToolsClick, !0), _;
      }
    }), de), C(E, w(J, {
      get when() {
        return !s();
      },
      get children() {
        const _ = Wd.cloneNode(!0), le = _.firstChild, Pe = le.nextSibling;
        return r1(_, "click", e.onIndicatorClick, !0), C(Pe, () => c("indicator", e.locale)), _;
      }
    }), de), de.style.setProperty("display", "flex"), de.style.setProperty("gap", "4px"), de.style.setProperty("margin-left", "auto"), de.style.setProperty("align-items", "center"), de.style.setProperty("flex", "0 0 auto"), C(de, w(J, {
      get when() {
        return e.showOrderToolsMenu;
      },
      get children() {
        const _ = Jd.cloneNode(!0), le = _.firstChild, Pe = le.firstChild, a1 = Pe.nextSibling;
        return _1((ge) => {
          r = ge;
        }, _), _.style.setProperty("display", "flex"), _.style.setProperty("align-items", "center"), le.$$click = (ge) => {
          ge.stopPropagation(), Ue();
        }, le.style.setProperty("gap", "6px"), a1.style.setProperty("transition", "transform 0.2s ease"), C(_, w(J, {
          get when() {
            return p();
          },
          get children() {
            return w(P5, {
              get mount() {
                return U();
              },
              get children() {
                const ge = Xd.cloneNode(!0), g1 = ge.firstChild, s1 = g1.firstChild, X1 = s1.firstChild, Ie = X1.firstChild, yt = Ie.firstChild, B1 = s1.nextSibling, L1 = B1.firstChild, w1 = L1.firstChild, e1 = w1.firstChild, vt = L1.nextSibling, Ve = vt.firstChild, J1 = Ve.firstChild, et = g1.nextSibling, y1 = et.firstChild, A1 = y1.firstChild, tt = A1.firstChild, pt = tt.firstChild, F1 = y1.nextSibling, nt = F1.firstChild, Ct = nt.firstChild, bt = Ct.nextSibling, rt = nt.nextSibling, Re = rt.firstChild, ze = Re.nextSibling, je = ze.firstChild, Qe = je.firstChild, $t = et.nextSibling, ot = $t.firstChild, U1 = ot.firstChild, _t = $t.nextSibling, xe = _t.nextSibling, Ee = xe.firstChild, kt = Ee.firstChild, Ye = xe.nextSibling, v1 = Ye.nextSibling, p1 = v1.firstChild, xt = p1.firstChild, l1 = v1.nextSibling, it = l1.firstChild, c1 = it.firstChild, M1 = c1.firstChild, Lt = M1.firstChild, at = it.nextSibling, T1 = at.firstChild, He = T1.firstChild, wt = He.firstChild, st = T1.nextSibling, C1 = st.firstChild, z1 = C1.firstChild, hn = st.nextSibling, fn = hn.firstChild, At = fn.firstChild, lt = l1.nextSibling, Mt = lt.firstChild, b1 = Mt.firstChild;
                return ge.$$mousedown = ($) => $.stopPropagation(), _1(($) => {
                  n = $;
                }, ge), ge.style.setProperty("position", "fixed"), ge.style.setProperty("z-index", "9999"), s1.$$click = ($) => {
                  $.preventDefault(), $.stopPropagation(), L((S) => !S);
                }, Ie.$$mousedown = ($) => $.stopPropagation(), Ie.$$click = ($) => $.stopPropagation(), yt.addEventListener("change", ($) => {
                  var S;
                  $.stopPropagation(), L(!0), (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    quickOrder: $.currentTarget.checked
                  });
                }), e1.addEventListener("change", ($) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    quickOrderFloatingWindow: $.currentTarget.checked
                  });
                }), J1.addEventListener("change", ($) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    quickOrderPlusButton: $.currentTarget.checked
                  });
                }), y1.$$click = ($) => {
                  $.preventDefault(), $.stopPropagation(), M((S) => !S), N(!1);
                }, tt.$$mousedown = ($) => $.stopPropagation(), tt.$$click = ($) => $.stopPropagation(), pt.addEventListener("change", ($) => {
                  var S;
                  $.stopPropagation(), M(!0), (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    openOrders: $.currentTarget.checked
                  });
                }), bt.$$click = ($) => {
                  var S, De;
                  $.preventDefault(), $.stopPropagation(), (De = e.onOrderToolsStateChange) == null || De.call(e, {
                    openOrdersExtendedPriceLine: !(((S = e.orderToolsState) == null ? void 0 : S.openOrdersExtendedPriceLine) ?? !0)
                  });
                }, je.$$click = ($) => {
                  $.preventDefault(), $.stopPropagation(), N((S) => !S);
                }, C(je, () => {
                  var $;
                  return Pr((($ = e.orderToolsState) == null ? void 0 : $.openOrdersDisplay) ?? "right");
                }, Qe), C(ze, w(J, {
                  get when() {
                    return q();
                  },
                  get children() {
                    const $ = Gd.cloneNode(!0);
                    return C($, () => ["left", "center", "right"].map((S) => (() => {
                      const De = sh.cloneNode(!0);
                      return De.$$click = (Be) => {
                        var t1;
                        Be.preventDefault(), Be.stopPropagation(), (t1 = e.onOrderToolsStateChange) == null || t1.call(e, {
                          openOrdersDisplay: S
                        }), N(!1);
                      }, C(De, () => Pr(S)), B(() => {
                        var Be;
                        return ne(De, (((Be = e.orderToolsState) == null ? void 0 : Be.openOrdersDisplay) ?? "right") === S ? "selected" : "");
                      }), De;
                    })())), $;
                  }
                }), null), U1.addEventListener("change", ($) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    positions: $.currentTarget.checked
                  });
                }), kt.addEventListener("change", ($) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    breakevenPrice: $.currentTarget.checked
                  });
                }), xt.addEventListener("change", ($) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    liquidationPrice: $.currentTarget.checked
                  });
                }), it.$$click = ($) => {
                  $.preventDefault(), $.stopPropagation(), I((S) => !S);
                }, M1.$$mousedown = ($) => $.stopPropagation(), M1.$$click = ($) => $.stopPropagation(), Lt.addEventListener("change", ($) => {
                  var S;
                  $.stopPropagation(), I(!0), (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    priceLine: $.currentTarget.checked
                  });
                }), wt.addEventListener("change", ($) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    marketPriceLine: $.currentTarget.checked
                  });
                }), z1.addEventListener("change", ($) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    countDown: $.currentTarget.checked
                  });
                }), At.addEventListener("change", ($) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    bidAskPrice: $.currentTarget.checked
                  });
                }), b1.addEventListener("change", ($) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    orderHistory: $.currentTarget.checked
                  });
                }), B(($) => {
                  var Dt;
                  const S = `${re().top}px`, De = `${re().left}px`, Be = `${re().minWidth}px`, t1 = `klinecharts-pro-order-tools-group${v() ? " klinecharts-pro-order-tools-group-open" : ""}`, u1 = `klinecharts-pro-order-tools-group${D() ? " klinecharts-pro-order-tools-group-open" : ""}`, Tt = `klinecharts-pro-order-tools-switch${((Dt = e.orderToolsState) == null ? void 0 : Dt.openOrdersExtendedPriceLine) ?? !0 ? " klinecharts-pro-order-tools-switch-on" : ""}`, St = `klinecharts-pro-order-tools-display-arrow${q() ? " klinecharts-pro-order-tools-display-arrow-open" : ""}`, Pt = `klinecharts-pro-order-tools-group${F() ? " klinecharts-pro-order-tools-group-open" : ""}`;
                  return S !== $._v$ && ge.style.setProperty("top", $._v$ = S), De !== $._v$2 && ge.style.setProperty("left", $._v$2 = De), Be !== $._v$3 && ge.style.setProperty("width", $._v$3 = Be), t1 !== $._v$4 && ne(g1, $._v$4 = t1), u1 !== $._v$5 && ne(et, $._v$5 = u1), Tt !== $._v$6 && ne(bt, $._v$6 = Tt), St !== $._v$7 && Oe(Qe, "class", $._v$7 = St), Pt !== $._v$8 && ne(l1, $._v$8 = Pt), $;
                }, {
                  _v$: void 0,
                  _v$2: void 0,
                  _v$3: void 0,
                  _v$4: void 0,
                  _v$5: void 0,
                  _v$6: void 0,
                  _v$7: void 0,
                  _v$8: void 0
                }), B(() => {
                  var $, S, De, Be;
                  return yt.checked = ((($ = e.orderToolsState) == null ? void 0 : $.quickOrderFloatingWindow) ?? ((S = e.orderToolsState) == null ? void 0 : S.quickOrder) ?? !0) || (((De = e.orderToolsState) == null ? void 0 : De.quickOrderPlusButton) ?? ((Be = e.orderToolsState) == null ? void 0 : Be.quickOrder) ?? !0);
                }), B(() => {
                  var $, S;
                  return e1.checked = (($ = e.orderToolsState) == null ? void 0 : $.quickOrderFloatingWindow) ?? ((S = e.orderToolsState) == null ? void 0 : S.quickOrder) ?? !0;
                }), B(() => {
                  var $, S;
                  return J1.checked = (($ = e.orderToolsState) == null ? void 0 : $.quickOrderPlusButton) ?? ((S = e.orderToolsState) == null ? void 0 : S.quickOrder) ?? !0;
                }), B(() => {
                  var $;
                  return pt.checked = (($ = e.orderToolsState) == null ? void 0 : $.openOrders) ?? !0;
                }), B(() => {
                  var $;
                  return U1.checked = (($ = e.orderToolsState) == null ? void 0 : $.positions) ?? !0;
                }), B(() => {
                  var $;
                  return kt.checked = (($ = e.orderToolsState) == null ? void 0 : $.breakevenPrice) ?? !0;
                }), B(() => {
                  var $;
                  return xt.checked = (($ = e.orderToolsState) == null ? void 0 : $.liquidationPrice) ?? !0;
                }), B(() => {
                  var $, S, De, Be, t1, u1;
                  return Lt.checked = ((($ = e.orderToolsState) == null ? void 0 : $.marketPriceLine) ?? ((S = e.orderToolsState) == null ? void 0 : S.priceLine) ?? !0) || (((De = e.orderToolsState) == null ? void 0 : De.countDown) ?? ((Be = e.orderToolsState) == null ? void 0 : Be.priceLine) ?? !0) || (((t1 = e.orderToolsState) == null ? void 0 : t1.bidAskPrice) ?? ((u1 = e.orderToolsState) == null ? void 0 : u1.priceLine) ?? !0);
                }), B(() => {
                  var $, S;
                  return wt.checked = (($ = e.orderToolsState) == null ? void 0 : $.marketPriceLine) ?? ((S = e.orderToolsState) == null ? void 0 : S.priceLine) ?? !0;
                }), B(() => {
                  var $, S;
                  return z1.checked = (($ = e.orderToolsState) == null ? void 0 : $.countDown) ?? ((S = e.orderToolsState) == null ? void 0 : S.priceLine) ?? !0;
                }), B(() => {
                  var $, S;
                  return At.checked = (($ = e.orderToolsState) == null ? void 0 : $.bidAskPrice) ?? ((S = e.orderToolsState) == null ? void 0 : S.priceLine) ?? !0;
                }), B(() => {
                  var $;
                  return b1.checked = (($ = e.orderToolsState) == null ? void 0 : $.orderHistory) ?? !0;
                }), ge;
              }
            });
          }
        }), null), B((ge) => {
          const g1 = s() ? "0 8px" : "0 10px", s1 = p() ? "rotate(180deg)" : "rotate(0deg)";
          return g1 !== ge._v$9 && le.style.setProperty("padding", ge._v$9 = g1), s1 !== ge._v$10 && a1.style.setProperty("transform", ge._v$10 = s1), ge;
        }, {
          _v$9: void 0,
          _v$10: void 0
        }), _;
      }
    }), Ae), C(de, w(J, {
      get when() {
        return !s();
      },
      get children() {
        return [(() => {
          const _ = eh.cloneNode(!0);
          return r1(_, "click", e.onTimezoneClick, !0), _;
        })(), (() => {
          const _ = th.cloneNode(!0);
          return r1(_, "click", e.onSettingClick, !0), _;
        })()];
      }
    }), Ae), C(de, w(J, {
      get when() {
        return !s();
      },
      get children() {
        const _ = nh.cloneNode(!0);
        return r1(_, "click", e.onScreenshotClick, !0), _;
      }
    }), Ae), Ae.$$click = () => {
      if (V())
        (document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen).call(document);
      else {
        const _ = t == null ? void 0 : t.closest(".klinecharts-pro");
        _ && ((_ == null ? void 0 : _.requestFullscreen) ?? (_ == null ? void 0 : _.webkitRequestFullscreen) ?? (_ == null ? void 0 : _.mozRequestFullScreen) ?? (_ == null ? void 0 : _.msRequestFullscreen)).call(_);
      }
    }, C(Ae, (() => {
      const _ = j(() => !!V());
      return () => _() ? lh.cloneNode(!0) : ch.cloneNode(!0);
    })()), C(de, w(J, {
      get when() {
        return j(() => !!e.chartViewToggle)() && !V();
      },
      get children() {
        const _ = rh.cloneNode(!0);
        return r1(_, "click", e.chartViewToggle.onToggle, !0), C(_, (() => {
          const le = j(() => e.chartViewToggle.view === "chart");
          return () => le() ? uh.cloneNode(!0) : dh.cloneNode(!0);
        })()), B(() => Oe(_, "title", e.chartViewToggle.view === "chart" ? "View Depth" : "View Chart")), _;
      }
    }), null), C(O, w(J, {
      get when() {
        return se();
      },
      get children() {
        const _ = oh.cloneNode(!0);
        return _.$$click = () => t.scrollBy({
          left: 100,
          behavior: "smooth"
        }), _.style.setProperty("position", "absolute"), _.style.setProperty("right", "0"), _.style.setProperty("top", "0"), _.style.setProperty("bottom", "1px"), _.style.setProperty("width", "30px"), _.style.setProperty("display", "flex"), _.style.setProperty("align-items", "center"), _.style.setProperty("justify-content", "center"), _.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), _.style.setProperty("z-index", "10"), _.style.setProperty("cursor", "pointer"), _.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), _;
      }
    }), null), B((_) => {
      const le = e.spread ? "" : "rotate", Pe = V() ? "0px" : "var(--klinecharts-pro-period-bar-padding-right)";
      return le !== _._v$11 && Oe(we, "class", _._v$11 = le), Pe !== _._v$12 && de.style.setProperty("padding-right", _._v$12 = Pe), _;
    }, {
      _v$11: void 0,
      _v$12: void 0
    }), O;
  })();
};
Ze(["click", "mousedown"]);
const fh = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M12.41465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L12.41465,12C12.20873,12.5826,11.65311,13,11,13C10.34689,13,9.79127,12.5826,9.58535,12L3.5,12C3.223857,12,3,11.77614,3,11.5C3,11.22386,3.223857,11,3.5,11L9.58535,11C9.79127,10.417404,10.34689,10,11,10C11.65311,10,12.20873,10.417404,12.41465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), mh = () => fh.cloneNode(!0), gh = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,11L11.08535,11C11.29127,10.417404,11.84689,10,12.5,10C13.15311,10,13.70873,10.417404,13.91465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L13.91465,12C13.70873,12.5826,13.15311,13,12.5,13C11.84689,13,11.29127,12.5826,11.08535,12L6.91465,12C6.70873,12.5826,6.15311,13,5.5,13C4.671573,13,4,12.32843,4,11.5C4,10.671573,4.671573,10,5.5,10C6.15311,10,6.70873,10.417404,6.91465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), yh = () => gh.cloneNode(!0), vh = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,12.5C6.70873,13.0826,6.15311,13.5,5.5,13.5C4.671573,13.5,4,12.82843,4,12C4,11.171573,4.671573,10.5,5.5,10.5C6.15311,10.5,6.70873,10.917404,6.91465,11.5L16.0853,11.5C16.2913,10.917404,16.846899999999998,10.5,17.5,10.5C18.328400000000002,10.5,19,11.171573,19,12C19,12.82843,18.328400000000002,13.5,17.5,13.5C16.846899999999998,13.5,16.2913,13.0826,16.0853,12.5L6.91465,12.5Z" stroke-opacity="0" stroke="none"></path></svg>'), ph = () => vh.cloneNode(!0), Ch = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,12.41465L11,18.5C11,18.7761,11.22386,19,11.5,19C11.77614,19,12,18.7761,12,18.5L12,12.41465C12.5826,12.20873,13,11.65311,13,11C13,10.34689,12.5826,9.79127,12,9.58535L12,3.5C12,3.223857,11.77614,3,11.5,3C11.22386,3,11,3.223857,11,3.5L11,9.58535C10.417404,9.79127,10,10.34689,10,11C10,11.65311,10.417404,12.20873,11,12.41465Z" stroke-opacity="0" stroke="none"></path></svg>'), bh = () => Ch.cloneNode(!0), $h = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.66558837890625,19C10.83716137890625,19,10.16558837890625,18.328400000000002,10.16558837890625,17.5C10.16558837890625,16.846899999999998,10.58298437890625,16.2913,11.16557337890625,16.0854L11.16557337890625,11.91464C10.58298437890625,11.70872,10.16558837890625,11.1531,10.16558837890625,10.5C10.16558837890625,9.8469,10.58298437890625,9.29128,11.16557337890625,9.08536L11.16557337890625,4.5C11.16557337890625,4.223857,11.38942837890625,4,11.66556837890625,4C11.94171837890625,4,12.16556837890625,4.223857,12.16556837890625,4.5L12.16556837890625,9.08535C12.74817837890625,9.291260000000001,13.16558837890625,9.846879999999999,13.16558837890625,10.5C13.16558837890625,11.153120000000001,12.74817837890625,11.708739999999999,12.16556837890625,11.91465L12.16556837890625,16.0854C12.74817837890625,16.2913,13.16558837890625,16.846899999999998,13.16558837890625,17.5C13.16558837890625,18.328400000000002,12.49401837890625,19,11.66558837890625,19Z" stroke-opacity="0" stroke="none"></path></svg>'), _h = () => $h.cloneNode(!0), kh = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.165603637695312,6.91465C11.748203637695312,6.70873,12.165603637695312,6.15311,12.165603637695312,5.5C12.165603637695312,4.671573,11.494033637695313,4,10.665603637695312,4C9.837176637695313,4,9.165603637695312,4.671573,9.165603637695312,5.5C9.165603637695312,6.15311,9.583007637695312,6.70873,10.165603637695312,6.91465L10.165603637695312,16.0854C9.583007637695312,16.2913,9.165603637695312,16.846899999999998,9.165603637695312,17.5C9.165603637695312,18.328400000000002,9.837176637695313,19,10.665603637695312,19C11.494033637695313,19,12.165603637695312,18.328400000000002,12.165603637695312,17.5C12.165603637695312,16.846899999999998,11.748203637695312,16.2913,11.165603637695312,16.0854L11.165603637695312,6.91465Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), xh = () => kh.cloneNode(!0), Lh = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.146447,15.753C4.9511845,15.9483,4.9511845,16.2649,5.146447,16.4602C5.341709,16.6554,5.658291,16.6554,5.853554,16.4602L8.156600000000001,14.15711C8.352409999999999,14.25082,8.57173,14.3033,8.8033,14.3033C9.631730000000001,14.3033,10.3033,13.63172,10.3033,12.80329C10.3033,12.57172,10.250820000000001,12.352409999999999,10.157119999999999,12.15659L12.156600000000001,10.15711C12.352409999999999,10.250820000000001,12.571729999999999,10.30329,12.8033,10.30329C13.63173,10.30329,14.3033,9.63172,14.3033,8.80329C14.3033,8.57172,14.25082,8.352409999999999,14.15712,8.15659L16.4602,5.853553C16.6554,5.658291,16.6554,5.341709,16.4602,5.146447C16.2649,4.9511843,15.9483,4.9511843,15.753,5.146447L13.45001,7.449479999999999C13.25419,7.35577,13.03487,7.3032900000000005,12.8033,7.3032900000000005C11.97487,7.3032900000000005,11.3033,7.97487,11.3033,8.80329C11.3033,9.03487,11.35578,9.254190000000001,11.44949,9.450009999999999L9.450009999999999,11.449480000000001C9.254190000000001,11.35577,9.03487,11.30329,8.8033,11.30329C7.97487,11.30329,7.3033,11.97487,7.3033,12.80329C7.3033,13.03487,7.35578,13.25419,7.44949,13.45001L5.146447,15.753Z" stroke-opacity="0" stroke="none"></path></svg>'), wh = () => Lh.cloneNode(!0), Ah = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M7.573332939453125,14.54567903564453C7.667042939453125,14.741499035644532,7.719512939453125,14.960809035644532,7.719512939453125,15.19239903564453C7.719512939453125,16.02079903564453,7.047942939453125,16.69239903564453,6.219512939453125,16.69239903564453C5.391085939453125,16.69239903564453,4.719512939453125,16.02079903564453,4.719512939453125,15.19239903564453C4.719512939453125,14.36394903564453,5.391085939453125,13.692379035644532,6.219512939453125,13.692379035644532C6.451092939453125,13.692379035644532,6.670412939453125,13.74485903564453,6.866232939453125,13.83856903564453L9.865702939453126,10.83909903564453C9.771992939453124,10.643279035644532,9.719512939453125,10.42395903564453,9.719512939453125,10.192379035644532C9.719512939453125,9.36394903564453,10.391082939453124,8.692379035644532,11.219512939453125,8.692379035644532C11.451092939453126,8.692379035644532,11.670412939453126,8.74485903564453,11.866232939453125,8.838569035644532L15.462112939453124,5.242645035644531C15.657412939453126,5.047383335644532,15.974012939453125,5.047383335644532,16.169212939453125,5.242645035644531C16.364512939453125,5.437907035644531,16.364512939453125,5.754489035644531,16.169212939453125,5.949752035644531L12.573332939453124,9.545679035644532C12.667042939453125,9.74149903564453,12.719512939453125,9.96080903564453,12.719512939453125,10.192379035644532C12.719512939453125,11.020809035644533,12.047942939453126,11.692379035644532,11.219512939453125,11.692379035644532C10.987942939453125,11.692379035644532,10.768632939453125,11.639909035644532,10.572812939453126,11.54619903564453L7.573332939453125,14.54567903564453Z" stroke-opacity="0" stroke="none"></path></svg>'), Mh = () => Ah.cloneNode(!0), Th = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M15.719512939453125,8.461776733398438C16.547912939453127,8.461776733398438,17.219512939453125,7.7902067333984375,17.219512939453125,6.9617767333984375C17.219512939453125,6.133349733398438,16.547912939453127,5.4617767333984375,15.719512939453125,5.4617767333984375C14.891082939453124,5.4617767333984375,14.219512939453125,6.133349733398438,14.219512939453125,6.9617767333984375C14.219512939453125,7.193346733398437,14.271992939453124,7.412666733398438,14.365692939453124,7.608486733398438L7.366222939453126,14.607956733398437C7.170402939453125,14.514256733398437,6.951082939453125,14.461776733398438,6.719512939453125,14.461776733398438C5.891085939453125,14.461776733398438,5.219512939453125,15.133346733398437,5.219512939453125,15.961776733398438C5.219512939453125,16.79017673339844,5.891085939453125,17.461776733398438,6.719512939453125,17.461776733398438C7.547942939453125,17.461776733398438,8.219512939453125,16.79017673339844,8.219512939453125,15.961776733398438C8.219512939453125,15.730176733398437,8.167032939453126,15.510876733398437,8.073322939453124,15.315066733398437L15.072802939453124,8.315586733398437C15.268612939453124,8.409296733398438,15.487912939453125,8.461776733398438,15.719512939453125,8.461776733398438Z" stroke-opacity="0" stroke="none"></path></svg>'), Sh = () => Th.cloneNode(!0), Ph = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17.0643,7.033864912109375L18,3.585784912109375L14.5078,4.509695912109375L15.3537,5.344934912109375L6.02026,14.560584912109375C5.87635,14.517484912109374,5.72366,14.494284912109375,5.5655,14.494284912109375C4.7009,14.494284912109375,4,15.186384912109375,4,16.040084912109375C4,16.893784912109375,4.7009,17.585784912109375,5.5655,17.585784912109375C6.43011,17.585784912109375,7.13101,16.893784912109375,7.13101,16.040084912109375C7.13101,15.722284912109375,7.03392,15.426984912109376,6.86744,15.181384912109374L16.0917,6.073604912109375L17.0643,7.033864912109375Z" stroke-opacity="0" stroke="none"></path></svg>'), Dh = () => Ph.cloneNode(!0), Oh = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,13.00505L18.5,13.00505C18.7761,13.00505,19,13.228909999999999,19,13.50505C19,13.781189999999999,18.7761,14.00505,18.5,14.00505L6.91465,14.00505C6.70873,14.58765,6.15311,15.00505,5.5,15.00505C4.671573,15.00505,4,14.33348,4,13.50505C4,12.67662,4.671573,12.00505,5.5,12.00505C6.15311,12.00505,6.70873,12.422450000000001,6.91465,13.00505ZM7.81404,11.625L10.48591,11.625L10.48591,10.90625L9.65193,10.90625L9.65193,7.125L8.997630000000001,7.125C8.71443,7.306641,8.415600000000001,7.419922,7.96443,7.498047L7.96443,8.05078L8.77497,8.05078L8.77497,10.90625L7.81404,10.90625L7.81404,11.625ZM11.081620000000001,11.625L14.0562,11.625L14.0562,10.88281L13.09724,10.88281C12.8863,10.88281,12.59333,10.90625,12.36482,10.93555C13.17537,10.11328,13.84724,9.2207,13.84724,8.39062C13.84724,7.541016,13.28865,7,12.4488,7C11.84333,7,11.446850000000001,7.234375,11.03279,7.679688L11.52497,8.16797C11.747630000000001,7.914062,12.0113,7.697266,12.33552,7.697266C12.7613,7.697266,13.00154,7.982422,13.00154,8.43359C13.00154,9.14648,12.29255,10.00781,11.081620000000001,11.11523L11.081620000000001,11.625ZM15.9605,11.75C16.8121,11.75,17.526899999999998,11.2832,17.526899999999998,10.4375C17.526899999999998,9.82031,17.142200000000003,9.43945,16.6441,9.30078L16.6441,9.27148C17.1129,9.08594,17.3824,8.7207,17.3824,8.21289C17.3824,7.421875,16.8004,7,15.9429,7C15.4215,7,14.9957,7.210938,14.6109,7.541016L15.066,8.11133C15.3258,7.849609,15.5836,7.697266,15.9019,7.697266C16.2789,7.697266,16.4957,7.914062,16.4957,8.28125C16.4957,8.70898,16.2301,9,15.4215,9L15.4215,9.63672C16.3804,9.63672,16.6383,9.91992,16.6383,10.38086C16.6383,10.79688,16.3336,11.03125,15.8824,11.03125C15.4742,11.03125,15.1578,10.82227,14.8922,10.55078L14.4781,11.13281C14.7906,11.486329999999999,15.2652,11.75,15.9605,11.75Z" stroke-opacity="0" stroke="none"></path></svg>'), Nh = () => Oh.cloneNode(!0), Ih = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.146447,14.178126025390625C2.9511847,13.982826025390626,2.9511847,13.666226025390625,3.146447,13.470926025390625L7.39146,9.225966025390626C7.35417,9.095106025390624,7.33421,8.956946025390625,7.33421,8.814116025390625C7.33421,7.985696025390625,8.00578,7.314116025390625,8.834209999999999,7.314116025390625C8.97703,7.314116025390625,9.11519,7.334086025390625,9.24605,7.371366025390625L13.753,2.864373025390625C13.9483,2.669110325390625,14.2649,2.669110325390625,14.4602,2.864373025390625C14.6554,3.059635025390625,14.6554,3.376217025390625,14.4602,3.571479025390625L10.06916,7.962476025390625C10.23631,8.204386025390626,10.334209999999999,8.497826025390625,10.334209999999999,8.814116025390625C10.334209999999999,9.642546025390626,9.66264,10.314116025390625,8.834209999999999,10.314116025390625C8.51791,10.314116025390625,8.22448,10.216226025390625,7.98256,10.049076025390626L3.853554,14.178126025390625C3.658291,14.373326025390625,3.341709,14.373326025390625,3.146447,14.178126025390625ZM7.67736,19.188526025390626C7.4821,18.993226025390626,7.4821,18.676626025390625,7.67736,18.481426025390626L9.9804,16.178326025390625C9.88669,15.982526025390625,9.834209999999999,15.763226025390624,9.834209999999999,15.531626025390626C9.834209999999999,14.703226025390626,10.50578,14.031626025390626,11.33421,14.031626025390626C11.56579,14.031626025390626,11.78511,14.084126025390624,11.98093,14.177826025390624L13.9804,12.178356025390626C13.8867,11.982536025390624,13.8342,11.763216025390625,13.8342,11.531636025390625C13.8342,10.703206025390624,14.5058,10.031636025390625,15.3342,10.031636025390625C15.5658,10.031636025390625,15.7851,10.084116025390625,15.9809,10.177826025390626L18.284,7.874796025390625C18.4792,7.679536025390625,18.7958,7.679536025390625,18.9911,7.874796025390625C19.1863,8.070056025390624,19.1863,8.386636025390626,18.9911,8.581906025390625L16.688000000000002,10.884936025390624C16.7817,11.080756025390626,16.8342,11.300066025390626,16.8342,11.531636025390625C16.8342,12.360066025390624,16.162599999999998,13.031626025390626,15.3342,13.031626025390626C15.1026,13.031626025390626,14.8833,12.979126025390626,14.6875,12.885426025390625L12.68803,14.884926025390625C12.78174,15.080726025390625,12.83421,15.300026025390626,12.83421,15.531626025390626C12.83421,16.360026025390624,12.16264,17.031626025390626,11.33421,17.031626025390626C11.10264,17.031626025390626,10.88333,16.979126025390627,10.68751,16.885426025390625L8.38446,19.188526025390626C8.1892,19.383726025390626,7.87262,19.383726025390626,7.67736,19.188526025390626Z" stroke-opacity="0" stroke="none"></path></svg>'), Eh = () => Ih.cloneNode(!0), Bh = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.3367688759765626,12.63173C3.5320318759765623,12.82699,3.8486138759765627,12.82699,4.043876875976562,12.63173L11.822052875976562,4.853553C12.017312875976563,4.658291,12.017312875976563,4.341708,11.822052875976562,4.146446C11.626792875976562,3.9511843,11.310202875976563,3.9511843,11.114942875976563,4.146446L3.3367688759765626,11.92462C3.1415071759765625,12.11988,3.1415071759765625,12.43647,3.3367688759765626,12.63173ZM5.001492875976562,17.0351C4.806232875976562,16.8399,4.806232875976562,16.5233,5.001492875976562,16.328L7.304532875976562,14.025C7.210822875976563,13.82916,7.158352875976563,13.60984,7.158352875976563,13.37827C7.158352875976563,12.54984,7.829922875976562,11.87827,8.658352875976561,11.87827C8.889922875976563,11.87827,9.109232875976563,11.93075,9.305052875976562,12.02446L11.304532875976562,10.02498C11.210822875976563,9.82916,11.158352875976561,9.60984,11.158352875976561,9.37827C11.158352875976561,8.54984,11.829922875976562,7.8782700000000006,12.658352875976563,7.8782700000000006C12.889922875976563,7.8782700000000006,13.109232875976563,7.93075,13.305022875976562,8.024460000000001L15.608122875976562,5.72142C15.803322875976562,5.5261499999999995,16.119922875976563,5.5261499999999995,16.315222875976563,5.72142C16.510422875976563,5.9166799999999995,16.510422875976563,6.23326,16.315222875976563,6.42852L14.012122875976562,8.73156C14.105822875976562,8.92738,14.158322875976562,9.1467,14.158322875976562,9.37827C14.158322875976562,10.2067,13.486822875976562,10.87827,12.658352875976563,10.87827C12.426772875976562,10.87827,12.207452875976562,10.82579,12.011642875976563,10.73209L10.012162875976562,12.73156C10.105872875976562,12.92738,10.158352875976561,13.1467,10.158352875976561,13.37827C10.158352875976561,14.2067,9.486772875976563,14.8783,8.658352875976561,14.8783C8.426772875976562,14.8783,8.207452875976562,14.8258,8.011642875976563,14.7321L5.708602875976562,17.0351C5.513342875976562,17.2304,5.196752875976562,17.2304,5.001492875976562,17.0351ZM10.415712875976563,18.328C10.220452875976562,18.5233,9.903862875976563,18.5233,9.708602875976563,18.328C9.513342875976562,18.1328,9.513342875976562,17.816200000000002,9.708602875976563,17.6209L12.304532875976562,15.025C12.210822875976563,14.8292,12.158352875976563,14.6098,12.158352875976563,14.3783C12.158352875976563,13.54984,12.829922875976562,12.87827,13.658322875976562,12.87827C13.889922875976563,12.87827,14.109222875976563,12.93075,14.305022875976562,13.02446L17.486822875976564,9.84274C17.682022875976564,9.64747,17.99862287597656,9.64747,18.19392287597656,9.84274C18.38912287597656,10.038,18.38912287597656,10.35458,18.19392287597656,10.54984L15.012122875976562,13.73156C15.105822875976562,13.92738,15.158322875976562,14.1467,15.158322875976562,14.3783C15.158322875976562,15.2067,14.486822875976562,15.8783,13.658322875976562,15.8783C13.426822875976562,15.8783,13.207422875976562,15.8258,13.011642875976563,15.7321L10.415712875976563,18.328Z" stroke-opacity="0" stroke="none"></path></svg>'), Fh = () => Bh.cloneNode(!0), Uh = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M13.1889,6C12.98303,6.582599999999999,12.42741,7,11.7743,7C11.12119,7,10.565570000000001,6.582599999999999,10.35965,6L3.5,6C3.223857,6,3,5.77614,3,5.5C3,5.22386,3.223857,5,3.5,5L10.35965,5C10.565570000000001,4.417404,11.12119,4,11.7743,4C12.42741,4,12.98303,4.417404,13.1889,5L18.5,5C18.7761,5,19,5.22386,19,5.5C19,5.77614,18.7761,6,18.5,6L13.1889,6ZM3,8.5C3,8.22386,3.223857,8,3.5,8L18.5,8C18.7761,8,19,8.22386,19,8.5C19,8.77614,18.7761,9,18.5,9L3.5,9C3.223857,9,3,8.77614,3,8.5ZM3.278549,11.5C3.278549,11.22386,3.502407,11,3.778549,11L18.7785,11C19.0547,11,19.2785,11.22386,19.2785,11.5C19.2785,11.77614,19.0547,12,18.7785,12L3.778549,12C3.502407,12,3.278549,11.77614,3.278549,11.5ZM3.139267,14.5C3.139267,14.2239,3.363124,14,3.6392670000000003,14L18.6393,14C18.915399999999998,14,19.1393,14.2239,19.1393,14.5C19.1393,14.7761,18.915399999999998,15,18.6393,15L3.6392670000000003,15C3.363124,15,3.139267,14.7761,3.139267,14.5ZM13.1889,18C12.98303,18.5826,12.42741,19,11.7743,19C11.12119,19,10.565570000000001,18.5826,10.35965,18L3.778549,18C3.502407,18,3.278549,17.7761,3.278549,17.5C3.278549,17.2239,3.502407,17,3.778549,17L10.35965,17C10.565570000000001,16.4174,11.12119,16,11.7743,16C12.42741,16,12.98303,16.4174,13.1889,17L18.7785,17C19.0547,17,19.2785,17.2239,19.2785,17.5C19.2785,17.7761,19.0547,18,18.7785,18L13.1889,18Z" stroke-opacity="0" stroke="none"></path></svg>'), zh = () => Uh.cloneNode(!0), Kh = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4.91465,6C4.70873,6.582599999999999,4.15311,7,3.5,7C2.671573,7,2,6.32843,2,5.5C2,4.671573,2.671573,4,3.5,4C4.15311,4,4.70873,4.417404,4.91465,5L18.2257,5C18.5018,5,18.7257,5.22386,18.7257,5.5C18.7257,5.77614,18.5018,6,18.2257,6L4.91465,6ZM2.7257,8.5C2.7257,8.22386,2.949558,8,3.2257,8L18.2257,8C18.5018,8,18.7257,8.22386,18.7257,8.5C18.7257,8.77614,18.5018,9,18.2257,9L3.2257,9C2.949558,9,2.7257,8.77614,2.7257,8.5ZM3.00425,11.5C3.00425,11.22386,3.22811,11,3.50425,11L18.5042,11C18.7804,11,19.0042,11.22386,19.0042,11.5C19.0042,11.77614,18.7804,12,18.5042,12L3.50425,12C3.22811,12,3.00425,11.77614,3.00425,11.5ZM2.864967,14.5C2.864967,14.2239,3.08882,14,3.36497,14L18.365,14C18.6411,14,18.865,14.2239,18.865,14.5C18.865,14.7761,18.6411,15,18.365,15L3.36497,15C3.08882,15,2.864967,14.7761,2.864967,14.5ZM20,17.5C20,18.328400000000002,19.3284,19,18.5,19C17.846899999999998,19,17.2913,18.5826,17.0854,18L3.50425,18C3.22811,18,3.00425,17.7761,3.00425,17.5C3.00425,17.2239,3.22811,17,3.50425,17L17.0854,17C17.2913,16.4174,17.846899999999998,16,18.5,16C19.3284,16,20,16.671599999999998,20,17.5Z" stroke-opacity="0" stroke="none"></path></svg>'), Rh = () => Kh.cloneNode(!0), jh = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="5" ry="5" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="3" ry="3" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse></svg>'), Qh = () => jh.cloneNode(!0), Zh = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3,7.32468C5.90649,3.3893050000000002,11.49833,2.81306,14.6674,6.31944C14.9056,6.1554199999999994,15.192,6.05979,15.5,6.05979C15.845,6.05979,16.1628,6.17974,16.4162,6.381349999999999L18.4509,4.23827L19,4.816615L16.8945,7.03429C16.962600000000002,7.21075,17,7.40319,17,7.60463C17,8.45782,16.328400000000002,9.14947,15.5,9.14947C14.6716,9.14947,14,8.45782,14,7.60463C14,7.36402,14.0534,7.13625,14.1487,6.93322C11.32695,3.748365,6.25159,4.253956,3.612785,7.82695L3,7.32468ZM14.09,15.4717C15.7427,13.78985,16.244500000000002,11.524740000000001,15.5633,9.30134L15.5618,9.30134L16.3012,9.0502C17.072400000000002,11.56646,16.497700000000002,14.158,14.6282,16.0599C12.28737,18.442,8.62386,18.6988,6.41348,16.4501C4.5526,14.5572,4.52076,11.19671,6.36766,9.3177C7.89069,7.76754,10.07544,7.706189999999999,11.56741,9.22363C11.95453,9.61742,12.24817,10.08363,12.43369,10.57677L14.1451,8.77421L14.6942,9.35256L12.64982,11.50582C12.65827,11.59712,12.66295,11.68839,12.66378,11.77936C12.87398,12.04523,13,12.38451,13,12.7541C13,13.60729,12.32843,14.2989,11.5,14.2989C10.67157,14.2989,10,13.60729,10,12.7541C10,11.90091,10.67157,11.20926,11.5,11.20926C11.60387,11.20926,11.70528,11.220130000000001,11.8032,11.240829999999999L11.81763,11.22564C11.69858,10.71874,11.42858,10.21929,11.0284,9.81179C9.844000000000001,8.60765,8.136890000000001,8.65592,6.90822,9.90586C5.37975,11.460930000000001,5.40693,14.288,6.95404,15.8619C8.84598,17.7867,12.03496,17.5626,14.09,15.4717Z" stroke-opacity="0" stroke="none"></path></svg>'), Vh = () => Zh.cloneNode(!0), Hh = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4,17.0854L4,3.5C4,3.223858,4.22386,3,4.5,3C4.77614,3,5,3.223858,5,3.5L5,10L7.57584,10L9.8127,4.46359C9.91614,4.20756,10.20756,4.08386,10.46359,4.1873000000000005C10.71963,4.29075,10.84333,4.58216,10.73988,4.8382000000000005L8.65438,10L11.08535,10C11.29127,9.4174,11.84689,9,12.5,9C12.65154,9,12.79784,9.02247,12.93573,9.06427L16.6464,5.35355C16.8417,5.15829,17.1583,5.15829,17.3536,5.35355C17.5488,5.54882,17.5488,5.8654,17.3536,6.06066L13.7475,9.66675C13.907,9.90508,14,10.19168,14,10.5C14,11.15311,13.5826,11.70873,13,11.91465L13,14.3638L18.3714,12.1936C18.6274,12.09015,18.918799999999997,12.21385,19.0222,12.46989C19.1257,12.72592,19.002,13.0173,18.746000000000002,13.1208L13,15.4423L13,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854ZM6.3729499999999994,17.0413L12,14.7678L12,11.91465C11.88136,11.87271,11.76956,11.81627,11.66675,11.74746L6.3729499999999994,17.0413ZM12,15.8463L6.6694700000000005,18L12,18L12,15.8463ZM6.38629,15.6137L8.250350000000001,11L11,11L6.38629,15.6137ZM5,11L7.17182,11L5,16.3754L5,11Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), qh = () => Hh.cloneNode(!0), Yh = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17,4.5C17,5.32843,16.328400000000002,6,15.5,6C15.0931,6,14.7241,5.83802,14.4539,5.57503L5.98992,8.32515C5.99658,8.38251,6,8.440850000000001,6,8.5C6,9.15311,5.582599999999999,9.70873,5,9.91465L5,11.08535C5.42621,11.236,5.763999999999999,11.57379,5.91465,12L19.5,12C19.7761,12,20,12.22386,20,12.5C20,12.77614,19.7761,13,19.5,13L5.91465,13C5.70873,13.5826,5.15311,14,4.5,14C3.671573,14,3,13.3284,3,12.5C3,11.84689,3.417404,11.29127,4,11.08535L4,9.91465C3.417404,9.70873,3,9.15311,3,8.5C3,7.67157,3.671573,7,4.5,7C4.90411,7,5.2709,7.15981,5.5406200000000005,7.41967L14.0093,4.66802C14.0032,4.6128599999999995,14,4.5568,14,4.5C14,3.671573,14.6716,3,15.5,3C16.328400000000002,3,17,3.671573,17,4.5ZM4,15.5C4,15.2239,4.22386,15,4.5,15L19.5,15C19.7761,15,20,15.2239,20,15.5C20,15.7761,19.7761,16,19.5,16L4.5,16C4.22386,16,4,15.7761,4,15.5ZM4,18.5C4,18.2239,4.22386,18,4.5,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L4.5,19C4.22386,19,4,18.7761,4,18.5Z" stroke-opacity="0" stroke="none"></path></svg>'), Wh = () => Yh.cloneNode(!0), Gh = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M20,3.5C20,4.15311,19.5826,4.70873,19,4.91465L19,18.5C19,18.7761,18.7761,19,18.5,19L4.91465,19C4.70873,19.5826,4.15311,20,3.5,20C2.671573,20,2,19.3284,2,18.5C2,17.846899999999998,2.417404,17.2913,3,17.0854L3,3.5C3,3.22386,3.22386,3,3.5,3L17.0854,3C17.2913,2.417404,17.846899999999998,2,18.5,2C19.3284,2,20,2.671573,20,3.5ZM17.0854,4C17.236,4.42621,17.5738,4.763999999999999,18,4.91465L18,8L14,8L14,4L17.0854,4ZM13,4L13,8L9,8L9,4L13,4ZM13,9L9,9L9,13L13,13L13,9ZM13,14L9,14L9,18L13,18L13,14ZM14,18L14,14L18,14L18,18L14,18ZM18,13L14,13L14,9L18,9L18,13ZM4.91465,18C4.763999999999999,17.5738,4.42621,17.236,4,17.0854L4,14L8,14L8,18L4.91465,18ZM4,8L4,4L8,4L8,8L4,8ZM8,9L8,13L4,13L4,9L8,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Xh = () => Gh.cloneNode(!0), Jh = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" fill="none" stroke-opacity="1" stroke-width="1"></ellipse></svg>'), ef = () => Jh.cloneNode(!0), tf = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.57625,6.9981C11.55099,6.999359999999999,11.52557,7,11.5,7C11.34,7,11.18584,6.97495,11.04125,6.9285499999999995L5.55401,16.4327C5.713760000000001,16.5905,5.83826,16.7839,5.91465,17L16.0854,17C16.2187,16.622700000000002,16.4987,16.314700000000002,16.8569,16.1445L11.57625,6.9981ZM12.50759,6.611219999999999C12.81005,6.336790000000001,13,5.94058,13,5.5C13,4.671573,12.32843,4,11.5,4C10.67157,4,10,4.671573,10,5.5C10,5.80059,10.08841,6.08052,10.24066,6.31522L4.64514,16.0069C4.59738,16.002299999999998,4.54896,16,4.5,16C3.671573,16,3,16.671599999999998,3,17.5C3,18.328400000000002,3.671573,19,4.5,19C5.15311,19,5.70873,18.5826,5.91465,18L16.0854,18C16.2913,18.5826,16.846899999999998,19,17.5,19C18.328400000000002,19,19,18.328400000000002,19,17.5C19,16.8365,18.5691,16.2735,17.971899999999998,16.075699999999998L12.50759,6.611219999999999Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), nf = () => tf.cloneNode(!0), rf = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19,4.5C19,5.15311,18.5826,5.70873,18,5.91465L18,18.5C18,18.7761,17.7761,19,17.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854L4,4.5C4,4.22386,4.22386,4,4.5,4L16.0854,4C16.2913,3.417404,16.846899999999998,3,17.5,3C18.328400000000002,3,19,3.671573,19,4.5ZM5,5L16.0854,5C16.236,5.42621,16.5738,5.763999999999999,17,5.91465L17,18L5.91465,18C5.763999999999999,17.5738,5.42621,17.236,5,17.0854L5,5Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), of = () => rf.cloneNode(!0), af = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19.6401,7.99355C20.4028,7.92291,21,7.2811900000000005,21,6.5C21,5.671573,20.3284,5,19.5,5C18.8469,5,18.2913,5.417404,18.0854,6L7.62067,6C7.34453,6,7.12067,6.22386,7.12067,6.5C7.12067,6.5479,7.12741,6.59423,7.13999,6.63809L3.2294099999999997,15.0243C2.530138,15.1517,2,15.764,2,16.5C2,17.328400000000002,2.671573,18,3.5,18C4.15311,18,4.70873,17.5826,4.91465,17L14.5963,17C14.6456,17.076,14.7162,17.1396,14.8044,17.1807C15.0546,17.2974,15.3521,17.1891,15.4688,16.9388L19.6401,7.99355ZM14.7896,16.0293L18.6551,7.739599999999999C18.3942,7.56144,18.1925,7.30307,18.0854,7L8.0746,7L4.25044,15.2009C4.55701,15.3784,4.79493,15.6613,4.91465,16L14.6207,16C14.68,16,14.7368,16.0103,14.7896,16.0293Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), sf = () => af.cloneNode(!0), lf = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.134443814697265,7.494615087890625L8.764323814697265,7.494615087890625L8.764323814697265,3.414215087890625L8.310223814697267,3.414215087890625L7.294603814697266,4.005035087890625L7.289713814697266,4.634915087890625L8.134443814697265,4.149892087890625L8.134443814697265,7.494615087890625ZM18.832003814697266,6.933095087890624Q19.004603814697266,6.635245087890625,19.004603814697266,6.2543850878906255Q19.004603814697266,5.884915087890625,18.845103814697264,5.593575087890625Q18.685503814697267,5.3006050878906255,18.399103814697266,5.136225087890625Q18.114303814697266,4.9702050878906245,17.754603814697266,4.9653250878906245L18.820603814697265,3.840647087890625L18.820603814697265,3.414215087890625L16.519203814697264,3.414215087890625L16.519203814697264,3.939931087890625L18.050803814697264,3.939931087890625L16.719403814697266,5.334785087890625L17.074203814697263,5.7205350878906245Q17.254903814697265,5.484525087890625,17.619503814697268,5.484525087890625Q17.980803814697268,5.484525087890625,18.187503814697266,5.689605087890625Q18.394203814697267,5.894685087890625,18.394203814697267,6.2543850878906255Q18.394203814697267,6.604315087890625,18.187503814697266,6.822415087890625Q17.980803814697268,7.0405150878906255,17.640603814697265,7.0405150878906255Q17.334603814697267,7.0405150878906255,17.124703814697266,6.890775087890625Q16.914703814697265,6.739415087890626,16.820303814697265,6.469225087890624L16.354803814697263,6.744295087890626Q16.480103814697266,7.125155087890625,16.821903814697265,7.341625087890625Q17.165403814697264,7.559725087890625,17.640603814697265,7.559725087890625Q18.039403814697266,7.559725087890625,18.348603814697267,7.393705087890625Q18.659503814697267,7.229315087890625,18.832003814697266,6.933095087890624ZM10.000003814697266,10.634915087890626C10.000003814697266,11.024655087890626,9.851363814697265,11.379685087890625,9.607683814697266,11.646395087890625L12.168903814697266,15.171615087890626C12.275403814697265,15.147615087890625,12.386203814697266,15.134915087890626,12.500003814697266,15.134915087890626C12.596503814697266,15.134915087890626,12.690803814697265,15.144015087890624,12.782303814697265,15.161415087890624L16.108803814697268,11.196955087890625C16.038703814697264,11.023375087890624,16.000003814697266,10.833655087890625,16.000003814697266,10.634915087890626C16.000003814697266,9.806495087890625,16.671603814697264,9.134915087890626,17.500003814697266,9.134915087890626C18.328403814697264,9.134915087890626,19.000003814697266,9.806495087890625,19.000003814697266,10.634915087890626C19.000003814697266,11.463345087890625,18.328403814697264,12.134915087890626,17.500003814697266,12.134915087890626C17.239503814697265,12.134915087890626,16.994503814697268,12.068495087890625,16.781003814697264,11.951675087890624L13.654703814697266,15.677415087890624C13.870303814697266,15.937215087890625,14.000003814697266,16.270915087890625,14.000003814697266,16.634915087890626C14.000003814697266,17.463315087890624,13.328403814697266,18.134915087890626,12.500003814697266,18.134915087890626C11.671573814697265,18.134915087890626,11.000003814697266,17.463315087890624,11.000003814697266,16.634915087890626C11.000003814697266,16.284415087890626,11.120193814697265,15.962015087890626,11.321603814697266,15.706715087890625L8.715393814697265,12.119565087890624C8.645053814697267,12.129685087890625,8.573143814697266,12.134915087890626,8.500003814697266,12.134915087890626C8.162103814697264,12.134915087890626,7.8503038146972655,12.023195087890626,7.599523814697266,11.834665087890626L4.505583814697266,15.521915087890624C4.809213814697266,15.796415087890624,5.000003814697266,16.193415087890624,5.000003814697266,16.634915087890626C5.000003814697266,17.463315087890624,4.328433814697266,18.134915087890626,3.5000038146972656,18.134915087890626C2.6715768146972656,18.134915087890626,2.0000038146972656,17.463315087890624,2.0000038146972656,16.634915087890626C2.0000038146972656,15.806515087890626,2.6715768146972656,15.134915087890626,3.5000038146972656,15.134915087890626C3.508253814697266,15.134915087890626,3.5164838146972657,15.135015087890626,3.524703814697266,15.135115087890625L7.033823814697266,10.953115087890625C7.011673814697265,10.850565087890626,7.000003814697266,10.744105087890624,7.000003814697266,10.634915087890626C7.000003814697266,9.806495087890625,7.671573814697266,9.134915087890626,8.500003814697266,9.134915087890626C9.328433814697267,9.134915087890626,10.000003814697266,9.806495087890625,10.000003814697266,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), cf = () => lf.cloneNode(!0), uf = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.13444,7.494615087890625L8.76432,7.494615087890625L8.76432,3.414215087890625L8.310220000000001,3.414215087890625L7.2946,4.005035087890625L7.28971,4.634915087890625L8.13444,4.149892087890625L8.13444,7.494615087890625ZM18.832,6.929835087890625Q19.0046,6.635245087890625,19.0046,6.2543850878906255Q19.0046,5.889805087890625,18.8451,5.5952050878906245Q18.6855,5.3006050878906255,18.3975,5.132965087890625Q18.1094,4.9653250878906245,17.7399,4.9653250878906245Q17.435499999999998,4.9653250878906245,17.1556,5.149245087890625L17.2793,3.939931087890625L18.8304,3.939931087890625L18.8304,3.414215087890625L16.7406,3.414215087890625L16.5094,5.665195087890625L17.0156,5.795405087890625Q17.095399999999998,5.655425087890626,17.2516,5.570795087890625Q17.4095,5.484525087890625,17.6357,5.484525087890625Q17.9694,5.484525087890625,18.1842,5.697745087890625Q18.4007,5.909335087890625,18.4007,6.2543850878906255Q18.4007,6.604315087890625,18.1842,6.822415087890625Q17.9694,7.0405150878906255,17.6292,7.0405150878906255Q17.3298,7.0405150878906255,17.119799999999998,6.890775087890625Q16.9098,6.739415087890626,16.825200000000002,6.474115087890625L16.3597,6.749175087890626Q16.470399999999998,7.110505087890624,16.807299999999998,7.335115087890625Q17.144199999999998,7.559725087890625,17.6292,7.559725087890625Q18.0296,7.559725087890625,18.3438,7.392075087890625Q18.6595,7.224435087890625,18.832,6.929835087890625ZM10,10.634915087890626C10,11.024655087890626,9.85136,11.379685087890625,9.60768,11.646395087890625L12.1689,15.171615087890626C12.2754,15.147615087890625,12.3862,15.134915087890626,12.5,15.134915087890626C12.5965,15.134915087890626,12.6908,15.144015087890624,12.7823,15.161415087890624L16.108800000000002,11.196955087890625C16.0387,11.023375087890624,16,10.833655087890625,16,10.634915087890626C16,9.806495087890625,16.671599999999998,9.134915087890626,17.5,9.134915087890626C18.3284,9.134915087890626,19,9.806495087890625,19,10.634915087890626C19,11.463345087890625,18.3284,12.134915087890626,17.5,12.134915087890626C17.2395,12.134915087890626,16.994500000000002,12.068505087890625,16.781,11.951675087890624L13.6547,15.677415087890624C13.8703,15.937215087890625,14,16.270915087890625,14,16.634915087890626C14,17.463315087890624,13.3284,18.134915087890626,12.5,18.134915087890626C11.67157,18.134915087890626,11,17.463315087890624,11,16.634915087890626C11,16.284415087890626,11.12019,15.962015087890626,11.3216,15.706715087890625L8.71539,12.119565087890624C8.645050000000001,12.129685087890625,8.57314,12.134915087890626,8.5,12.134915087890626C8.162099999999999,12.134915087890626,7.8503,12.023195087890626,7.59952,11.834665087890626L4.50558,15.521915087890624C4.80921,15.796415087890624,5,16.193415087890624,5,16.634915087890626C5,17.463315087890624,4.32843,18.134915087890626,3.5,18.134915087890626C2.671573,18.134915087890626,2,17.463315087890624,2,16.634915087890626C2,15.806515087890626,2.671573,15.134915087890626,3.5,15.134915087890626C3.5082500000000003,15.134915087890626,3.51648,15.135015087890626,3.5247,15.135115087890625L7.03382,10.953115087890625C7.01167,10.850565087890626,7,10.744105087890624,7,10.634915087890626C7,9.806495087890625,7.67157,9.134915087890626,8.5,9.134915087890626C9.32843,9.134915087890626,10,9.806495087890625,10,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), df = () => uf.cloneNode(!0), hf = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M18.8532,7.020985087890625Q19.0257,6.734525087890625,19.0257,6.369945087890625Q19.0257,6.020005087890625,18.8499,5.754705087890625Q18.6758,5.489415087890626,18.3649,5.339675087890625Q18.5944,5.209465087890625,18.7214,4.994615087890625Q18.8499,4.779775087890625,18.8499,4.5193550878906255Q18.8499,4.2003480878906245,18.7002,3.951324087890625Q18.5505,3.700673087890625,18.277,3.557444087890625Q18.0052,3.414215087890625,17.6455,3.414215087890625Q17.285800000000002,3.414215087890625,17.0107,3.557444087890625Q16.7357,3.700673087890625,16.5843,3.951324087890625Q16.4346,4.2003480878906245,16.4346,4.5193550878906255Q16.4346,4.779775087890625,16.561500000000002,4.994615087890625Q16.6901,5.209465087890625,16.919600000000003,5.339675087890625Q16.6055,5.489415087890626,16.4297,5.757965087890625Q16.255499999999998,6.024895087890625,16.255499999999998,6.369945087890625Q16.255499999999998,6.734525087890625,16.4297,7.020985087890625Q16.6055,7.305815087890625,16.919600000000003,7.465325087890625Q17.2354,7.624825087890625,17.6455,7.624825087890625Q18.0557,7.624825087890625,18.3682,7.465325087890625Q18.6807,7.305815087890625,18.8532,7.020985087890625ZM8.76432,7.559725087890625L8.13444,7.559725087890625L8.13444,4.214996087890625L7.28971,4.700025087890625L7.2946,4.070139087890625L8.310220000000001,3.479319087890625L8.76432,3.479319087890625L8.76432,7.559725087890625ZM17.1816,4.955555087890625Q17.0042,4.784655087890625,17.0042,4.5095950878906255Q17.0042,4.229645087890625,17.18,4.057119087890625Q17.355800000000002,3.884592087890625,17.6455,3.884592087890625Q17.935200000000002,3.884592087890625,18.1077,4.057119087890625Q18.2803,4.229645087890625,18.2803,4.5095950878906255Q18.2803,4.784655087890625,18.1045,4.955555087890625Q17.930300000000003,5.124825087890625,17.6455,5.124825087890625Q17.3607,5.124825087890625,17.1816,4.955555087890625ZM18.2217,5.7953950878906255Q18.4398,6.005365087890625,18.4398,6.3552950878906245Q18.4398,6.705235087890625,18.2217,6.915195087890625Q18.0052,7.125155087890625,17.6455,7.125155087890625Q17.285800000000002,7.125155087890625,17.067700000000002,6.915195087890625Q16.849600000000002,6.705235087890625,16.849600000000002,6.3552950878906245Q16.849600000000002,6.005365087890625,17.064500000000002,5.7953950878906255Q17.2793,5.585435087890625,17.6455,5.585435087890625Q18.0052,5.585435087890625,18.2217,5.7953950878906255ZM9.60768,11.711495087890626C9.85136,11.444785087890626,10,11.089765087890626,10,10.700025087890625C10,9.871595087890626,9.32843,9.200025087890625,8.5,9.200025087890625C7.67157,9.200025087890625,7,9.871595087890626,7,10.700025087890625C7,10.809205087890625,7.01167,10.915665087890625,7.03382,11.018215087890624L3.5247,15.200215087890625C3.51648,15.200115087890625,3.5082500000000003,15.200015087890625,3.5,15.200015087890625C2.671573,15.200015087890625,2,15.871615087890625,2,16.700015087890627C2,17.528415087890625,2.671573,18.200015087890627,3.5,18.200015087890627C4.32843,18.200015087890627,5,17.528415087890625,5,16.700015087890627C5,16.258515087890625,4.80921,15.861515087890625,4.50558,15.587015087890626L7.59952,11.899765087890625C7.8503,12.088295087890625,8.162099999999999,12.200025087890625,8.5,12.200025087890625C8.57314,12.200025087890625,8.645050000000001,12.194785087890626,8.71539,12.184675087890625L11.3216,15.771815087890625C11.12019,16.027215087890625,11,16.349515087890623,11,16.700015087890627C11,17.528415087890625,11.67157,18.200015087890627,12.5,18.200015087890627C13.3284,18.200015087890627,14,17.528415087890625,14,16.700015087890627C14,16.336015087890623,13.8703,16.002315087890626,13.6547,15.742515087890625L16.781,12.016775087890625C16.994500000000002,12.133605087890626,17.2395,12.200025087890625,17.5,12.200025087890625C18.3284,12.200025087890625,19,11.528445087890624,19,10.700025087890625C19,9.871595087890626,18.3284,9.200025087890625,17.5,9.200025087890625C16.671599999999998,9.200025087890625,16,9.871595087890626,16,10.700025087890625C16,10.898765087890624,16.0387,11.088475087890625,16.108800000000002,11.262055087890625L12.7823,15.226515087890625C12.6908,15.209115087890625,12.5965,15.200015087890625,12.5,15.200015087890625C12.3862,15.200015087890625,12.2754,15.212715087890626,12.1689,15.236715087890625L9.60768,11.711495087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), ff = () => hf.cloneNode(!0), mf = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M9.474616630859375,7.494615087890625L8.844736630859375,7.494615087890625L8.844736630859375,4.149892087890625L8.000006630859374,4.634915087890625L8.004896630859374,4.005035087890625L9.020516630859376,3.414215087890625L9.474616630859375,3.414215087890625L9.474616630859375,7.494615087890625ZM18.529296630859378,4.8318550878906255Q18.307996630859375,5.028795087890625,18.122396630859377,5.385245087890625Q17.868496630859376,5.019035087890625,17.629196630859376,4.8269750878906255Q17.389996630859375,4.634915087890625,17.168596630859376,4.634915087890625Q16.794296630859375,4.634915087890625,16.522496630859376,4.976715087890625Q16.252296630859377,5.3168850878906255,16.252296630859377,5.7856350878906255Q16.252296630859377,6.218575087890625,16.502896630859375,6.521315087890625Q16.755196630859373,6.822415087890625,17.114896630859377,6.822415087890625Q17.368796630859375,6.822415087890625,17.588596630859374,6.625475087890624Q17.809896630859377,6.428535087890625,17.998696630859374,6.0688350878906245Q18.249396630859373,6.439935087890625,18.488596630859377,6.631985087890625Q18.727896630859377,6.822415087890625,18.952496630859375,6.822415087890625Q19.326796630859373,6.822415087890625,19.596996630859376,6.482245087890625Q19.868796630859375,6.140455087890626,19.868796630859375,5.671705087890626Q19.868796630859375,5.238755087890625,19.618196630859376,4.937655087890625Q19.367496630859375,4.634915087890625,19.006196630859375,4.634915087890625Q18.750696630859377,4.634915087890625,18.529296630859378,4.8318550878906255ZM18.337296630859377,5.674955087890625L18.278696630859375,5.596835087890625Q18.449596630859375,5.272935087890625,18.622096630859374,5.1101750878906245Q18.794596630859374,4.947415087890625,18.967096630859373,4.947415087890625Q19.194996630859375,4.947415087890625,19.346396630859374,5.1345950878906255Q19.497696630859377,5.320135087890625,19.497696630859377,5.598455087890625Q19.497696630859377,5.8914250878906245,19.360996630859376,6.096505087890625Q19.224296630859374,6.301585087890626,19.027396630859375,6.301585087890626Q18.915096630859374,6.301585087890626,18.742496630859375,6.146965087890624Q18.569996630859375,5.992335087890625,18.337296630859377,5.674955087890625ZM17.785496630859377,5.779125087890625L17.842496630859372,5.857245087890625Q17.668296630859373,6.186025087890625,17.495796630859374,6.348785087890625Q17.324896630859374,6.509915087890625,17.153996630859375,6.509915087890625Q16.926096630859377,6.509915087890625,16.774796630859377,6.324375087890624Q16.623396630859375,6.137195087890625,16.623396630859375,5.858875087890625Q16.623396630859375,5.565905087890625,16.761696630859376,5.360825087890625Q16.900096630859373,5.1557550878906255,17.095396630859376,5.1557550878906255Q17.228896630859374,5.1557550878906255,17.365596630859375,5.2778250878906245Q17.502296630859377,5.399895087890625,17.785496630859377,5.779125087890625ZM10.710296630859375,10.634915087890626C10.710296630859375,11.024655087890626,10.561656630859375,11.379685087890625,10.317976630859375,11.646395087890625L12.879196630859376,15.171615087890626C12.985696630859374,15.147615087890625,13.096496630859376,15.134915087890626,13.210296630859375,15.134915087890626C13.306796630859376,15.134915087890626,13.401096630859374,15.144015087890624,13.492596630859374,15.161415087890624L16.819096630859377,11.196955087890625C16.748996630859374,11.023375087890624,16.710296630859375,10.833655087890625,16.710296630859375,10.634915087890626C16.710296630859375,9.806495087890625,17.381896630859373,9.134915087890626,18.210296630859375,9.134915087890626C19.038696630859373,9.134915087890626,19.710296630859375,9.806495087890625,19.710296630859375,10.634915087890626C19.710296630859375,11.463345087890625,19.038696630859373,12.134915087890626,18.210296630859375,12.134915087890626C17.949796630859375,12.134915087890626,17.704796630859377,12.068505087890625,17.491296630859374,11.951675087890624L14.364996630859375,15.677415087890624C14.580596630859375,15.937215087890625,14.710296630859375,16.270915087890625,14.710296630859375,16.634915087890626C14.710296630859375,17.463315087890624,14.038696630859375,18.134915087890626,13.210296630859375,18.134915087890626C12.381866630859374,18.134915087890626,11.710296630859375,17.463315087890624,11.710296630859375,16.634915087890626C11.710296630859375,16.284415087890626,11.830486630859374,15.962015087890626,12.031896630859375,15.706715087890625L9.425686630859374,12.119565087890624C9.355346630859376,12.129685087890625,9.283436630859375,12.134915087890626,9.210296630859375,12.134915087890626C8.872396630859374,12.134915087890626,8.560596630859376,12.023195087890626,8.309816630859375,11.834665087890626L5.215876630859375,15.521915087890624C5.519506630859375,15.796415087890624,5.710296630859375,16.193415087890624,5.710296630859375,16.634915087890626C5.710296630859375,17.463315087890624,5.038726630859375,18.134915087890626,4.210296630859375,18.134915087890626C3.381869630859375,18.134915087890626,2.710296630859375,17.463315087890624,2.710296630859375,16.634915087890626C2.710296630859375,15.806515087890626,3.381869630859375,15.134915087890626,4.210296630859375,15.134915087890626C4.218546630859375,15.134915087890626,4.226776630859375,15.135015087890626,4.234996630859375,15.135115087890625L7.744116630859375,10.953115087890625C7.721966630859375,10.850565087890626,7.710296630859375,10.744105087890624,7.710296630859375,10.634915087890626C7.710296630859375,9.806495087890625,8.381866630859374,9.134915087890626,9.210296630859375,9.134915087890626C10.038726630859376,9.134915087890626,10.710296630859375,9.806495087890625,10.710296630859375,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), gf = () => mf.cloneNode(!0), yf = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M21,5.5C21,6.32843,20.3284,7,19.5,7C19.4136,7,19.3289,6.99269,19.2465,6.97866L15.6257,15.5086C15.8587,15.7729,16,16.119999999999997,16,16.5C16,17.328400000000002,15.3284,18,14.5,18C13.8469,18,13.2913,17.5826,13.0854,17L3.91465,17C3.70873,17.5826,3.15311,18,2.5,18C1.671573,18,1,17.328400000000002,1,16.5C1,15.6716,1.671573,15,2.5,15C2.5840199999999998,15,2.66643,15.0069,2.74668,15.0202L6.36934,6.48574C6.13933,6.22213,6,5.87733,6,5.5C6,4.671573,6.67157,4,7.5,4C8.15311,4,8.70873,4.417404,8.91465,5L18.0854,5C18.2913,4.417404,18.8469,4,19.5,4C20.3284,4,21,4.671573,21,5.5ZM18.0854,6L8.91465,6C8.892579999999999,6.06243,8.8665,6.12296,8.83672,6.18128L13.9814,15.0921C14.143,15.0325,14.3177,15,14.5,15C14.584,15,14.6664,15.0069,14.7467,15.0202L18.3693,6.48574C18.2462,6.3446,18.149,6.1802,18.0854,6ZM13.2036,15.745L8.0861,6.8811800000000005C7.90605,6.95768,7.70797,7,7.5,7C7.41359,7,7.32888,6.99269,7.24647,6.97866L3.62571,15.5086C3.7512,15.651,3.8501,15.8174,3.91465,16L13.0854,16C13.1169,15.9108,13.1566,15.8255,13.2036,15.745Z" stroke-opacity="0" stroke="none"></path></svg>'), vf = () => yf.cloneNode(!0), pf = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.92159,5.93994C6.04014,5.90529,6.152620000000001,5.85639,6.25704,5.79523L9.12729,9.89437C9.045449999999999,10.07959,9,10.28449,9,10.5C9,10.79522,9.08529,11.07053,9.232569999999999,11.30262L4.97573,16.7511L5.92159,5.93994ZM4.92259,5.8848400000000005C4.38078,5.658659999999999,4,5.1238,4,4.5C4,3.671573,4.67157,3,5.5,3C6.2157,3,6.81433,3.50124,6.96399,4.17183L15.1309,4.88634C15.3654,4.36387,15.8902,4,16.5,4C17.328400000000002,4,18,4.67157,18,5.5C18,6.08983,17.659599999999998,6.60015,17.1645,6.84518L18.4264,14.0018C18.4508,14.0006,18.4753,14,18.5,14C19.3284,14,20,14.6716,20,15.5C20,16.328400000000002,19.3284,17,18.5,17C17.932499999999997,17,17.4386,16.6849,17.183799999999998,16.22L5.99686,18.5979C5.946429999999999,19.3807,5.29554,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.869300000000003,3.389292,17.3295,3.94071,17.1077L4.92259,5.8848400000000005ZM5.72452,17.6334C5.69799,17.596,5.6698,17.5599,5.64004,17.525100000000002L10.01843,11.92103C10.16958,11.97223,10.33155,12,10.5,12C10.80059,12,11.08052,11.91158,11.31522,11.75934L17.0606,15.0765C17.0457,15.1271,17.0335,15.1789,17.023899999999998,15.2317L5.72452,17.6334ZM11.92855,10.95875L17.4349,14.1379L16.1699,6.96356C15.9874,6.92257,15.8174,6.8483,15.6667,6.74746L11.99771,10.4165C11.99923,10.44414,12,10.47198,12,10.5C12,10.66,11.97495,10.814160000000001,11.92855,10.95875ZM10.5,9C10.259830000000001,9,10.03285,9.05644,9.83159,9.15679L7.04919,5.1831L15.0493,5.88302C15.054,5.90072,15.059,5.91829,15.0643,5.9357299999999995L11.56066,9.43934C11.28921,9.16789,10.91421,9,10.5,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Cf = () => pf.cloneNode(!0), bf = /* @__PURE__ */ b('<svg viewBox="0 0 22 22"><path d="M4.727219638671875,8.007996215820313L9.973849638671876,2.7629472158203123C10.167279638671875,2.5696791158203123,10.480729638671875,2.5696791158203123,10.674169638671875,2.7629472158203123L13.223329638671874,5.311756215820313C13.416929638671874,5.505236215820313,13.416929638671874,5.8189862158203125,13.223329638671874,6.012466215820313L7.977129638671875,11.257906215820313C7.379859638671875,11.855176215820313,7.407609638671875,12.909396215820312,8.033809638671876,13.535596215820313C8.660409638671876,14.162596215820313,9.713849638671874,14.189996215820312,10.311129638671876,13.591896215820313L15.556929638671875,8.346066215820311C15.750429638671875,8.152526215820313,16.064229638671875,8.152526215820313,16.257629638671872,8.346066215820311L18.806529638671876,10.895266215820312C19.000029638671876,11.088746215820313,19.000029638671876,11.402496215820312,18.806529638671876,11.595976215820313L13.560629638671875,16.841796215820313C11.165619638671876,19.237196215820312,7.197149638671875,19.19919621582031,4.783499638671875,16.785496215820313C2.3698426386718747,14.371896215820312,2.331397638671875,10.403416215820313,4.727219638671875,8.007996215820313ZM12.172299638671875,5.662106215820312L10.323809638671875,3.8136162158203124L5.4287196386718755,8.709096215820313C3.422893638671875,10.714536215820312,3.4549956386718748,14.055196215820313,5.484999638671875,16.08479621582031C7.514609638671875,18.114796215820313,10.855289638671875,18.146496215820314,12.860719638671876,16.141096215820312L15.465629638671874,13.535796215820312L14.090929638671875,12.160756215820312L14.791629638671875,11.460436215820312L16.166229638671876,12.834996215820313L17.755829638671877,11.245226215820313L15.907729638671874,9.396736215820312L11.011839638671875,14.292596215820312C10.042809638671875,15.262396215820312,8.418249638671874,15.243796215820312,7.406019638671875,14.306496215820312L7.333099638671875,14.236296215820312C6.327599638671876,13.230796215820313,6.284009638671876,11.550396215820312,7.276419638671875,10.557586215820312L9.882199638671874,7.952026215820313L8.501079638671875,6.570906215820313L9.201789638671876,5.870186215820313L10.582939638671874,7.251336215820312L12.172299638671875,5.662106215820312Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), $f = (e) => (() => {
  const t = bf.cloneNode(!0);
  return Oe(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), _f = /* @__PURE__ */ b('<svg viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_615"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_615)"><path d="M19.672,3.0673368C19.4417,2.9354008,19.1463,3.00292252,18.9994,3.2210900000000002L17.4588,5.50622L16.743299999999998,3.781253L13.9915,7.4662L13.9618,7.51108C13.8339,7.72862,13.8936,8.005659999999999,14.1004,8.15391L14.1462,8.183430000000001C14.3683,8.308720000000001,14.6511,8.25001,14.8022,8.047229999999999L16.4907,5.78571L17.246299999999998,7.60713L19.8374,3.7635389999999997L19.8651,3.717088C19.9871,3.484615,19.9023,3.199273,19.672,3.0673368ZM4.79974,8.462530000000001L10.117740000000001,3.252975C10.31381,3.0610145,10.63152,3.0610145,10.82759,3.252975L13.4115,5.78453C13.6076,5.976710000000001,13.6076,6.28833,13.4115,6.4805L8.093869999999999,11.69045C7.48847,12.28368,7.51659,13.3308,8.151309999999999,13.9528C8.786439999999999,14.5755,9.85421,14.6027,10.45961,14.0087L15.7768,8.79831C15.9729,8.60609,16.2909,8.60609,16.487099999999998,8.79831L19.0705,11.33026C19.2667,11.52244,19.2667,11.83406,19.0705,12.02623L13.7533,17.2366C11.32572,19.6158,7.30328,19.578,4.85679,17.1807C2.410298,14.7834,2.371331,10.84174,4.79974,8.462530000000001ZM12.3461,6.1325199999999995L10.47246,4.29654L5.51079,9.15889C3.477674,11.15076,3.510214,14.4688,5.56784,16.4847C7.62506,18.500999999999998,11.01117,18.5325,13.0439,16.540599999999998L15.6842,13.9529L14.2908,12.58718L15.0011,11.89161L16.394399999999997,13.2569L18.0056,11.67786L16.1323,9.84188L11.16985,14.7046C10.18764,15.6679,8.540980000000001,15.6494,7.51498,14.7184L7.44107,14.6487C6.4219,13.65,6.37771,11.98096,7.38362,10.994869999999999L10.02485,8.40693L8.624939999999999,7.03516L9.335180000000001,6.33919L10.73512,7.71099L12.3461,6.1325199999999995Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), kf = (e) => (() => {
  const t = _f.cloneNode(!0);
  return Oe(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), xf = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,17C5.80945,17,3.667717,12.85,3.113386,11.575C2.9622047,11.2,2.9622047,10.8,3.113386,10.425C3.667717,9.15,5.80945,5,11,5C16.165399999999998,5,18.3323,9.15,18.8866,10.425C19.0378,10.8,19.0378,11.2,18.8866,11.575C18.3323,12.85,16.165399999999998,17,11,17ZM4.04567,10.8C3.995276,10.925,3.995276,11.05,4.04567,11.175C4.52441,12.325,6.43937,16,11,16C15.5606,16,17.4756,12.325,17.9543,11.2C18.0047,11.075,18.0047,10.95,17.9543,10.825C17.4756,9.675,15.5606,6,11,6C6.43937,6,4.52441,9.675,4.04567,10.8ZM11,13.5C9.61417,13.5,8.480319999999999,12.375,8.480319999999999,11C8.480319999999999,9.625,9.61417,8.5,11,8.5C12.38583,8.5,13.5197,9.625,13.5197,11C13.5197,12.375,12.38583,13.5,11,13.5ZM11,9.5C10.1685,9.5,9.48819,10.175,9.48819,11C9.48819,11.825,10.1685,12.5,11,12.5C11.8315,12.5,12.51181,11.825,12.51181,11C12.51181,10.175,11.8315,9.5,11,9.5Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), Lf = () => xf.cloneNode(!0), wf = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.80417,14.9887L4.62563,16.167299999999997C4.43037,16.3625,4.43037,16.6791,4.62563,16.8744C4.82089,17.0696,5.13748,17.0696,5.332739999999999,16.8744L6.62638,15.5807C7.75595,16.290100000000002,9.19328,16.7929,11,16.7929C16.165399999999998,16.7929,18.3323,12.64289,18.8866,11.36789C19.0378,10.99289,19.0378,10.59289,18.8866,10.21789C18.5549,9.45486,17.6456,7.66212,15.8617,6.34545L17.3536,4.853553C17.5488,4.658291,17.5488,4.341709,17.3536,4.146447C17.1583,3.9511845,16.8417,3.9511845,16.6464,4.146447L15.0014,5.7915399999999995C13.9314,5.1969,12.61166,4.792893,11,4.792893C5.80945,4.792893,3.667717,8.94289,3.113386,10.21789C2.9622049,10.59289,2.9622049,10.99289,3.113386,11.36789C3.424435,12.08333,4.2353000000000005,13.70399,5.80417,14.9887ZM7.36012,14.847C8.32327,15.4074,9.52286,15.7929,11,15.7929C15.5606,15.7929,17.4756,12.11789,17.9543,10.99289C18.0047,10.86789,18.0047,10.74289,17.9543,10.61789C17.659,9.90846,16.8171,8.23812,15.1447,7.06241L12.96929,9.23782C13.3134,9.66543,13.5197,10.20642,13.5197,10.79289C13.5197,12.16789,12.38583,13.29289,11,13.29289C10.41596,13.29289,9.87667,13.09308,9.44815,12.75896L7.36012,14.847ZM8.794609999999999,11.99829L6.520099999999999,14.2728C5.06905,13.12119,4.32057,11.628250000000001,4.04567,10.96789C3.995275,10.84289,3.995275,10.71789,4.04567,10.59289C4.52441,9.46789,6.43937,5.79289,11,5.79289C12.28868,5.79289,13.3661,6.086320000000001,14.2596,6.53329L12.19759,8.5953C11.84086,8.40257,11.43271,8.29289,11,8.29289C9.61417,8.29289,8.480319999999999,9.41789,8.480319999999999,10.79289C8.480319999999999,11.22918,8.594470000000001,11.64029,8.794609999999999,11.99829ZM10.16528,12.04183C10.404869999999999,12.20032,10.692070000000001,12.29289,11,12.29289C11.8315,12.29289,12.51181,11.61789,12.51181,10.79289C12.51181,10.48318,12.41593,10.194600000000001,12.25216,9.95494L10.16528,12.04183ZM11.43602,9.35687L9.55616,11.236740000000001C9.512,11.09633,9.48819,10.94724,9.48819,10.79289C9.48819,9.96789,10.1685,9.29289,11,9.29289C11.15142,9.29289,11.29782,9.31528,11.43602,9.35687Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Af = () => wf.cloneNode(!0), Mf = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_625"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_625)"><path d="M14.5385,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807692,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.88462,4,14.5385,5.61538,14.5385,7.576919999999999L14.5385,9.76923ZM10.88461,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923L13.38462,9.76923L13.38462,7.576919999999999C13.38462,6.23077,12.26923,5.15385,10.88461,5.15385ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.038450000000001,12.07692,11.307680000000001,12.34615,11.307680000000001,12.65385L11.307680000000001,14.5769C11.307680000000001,14.8846,11.038450000000001,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), Tf = () => Mf.cloneNode(!0), Sf = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_620"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_620)"><path d="M8.38461,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807693,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.46154,4,13.84615,4.961539,14.3462,6.423080000000001C14.4615,6.73077,14.3077,7.038460000000001,14,7.15385C13.69231,7.26923,13.38461,7.11538,13.26923,6.80769C12.92308,5.80769,11.96154,5.15385,10.88462,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.03846,12.07692,11.307690000000001,12.34615,11.307690000000001,12.65385L11.307690000000001,14.5769C11.307690000000001,14.8846,11.03846,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), Pf = () => Sf.cloneNode(!0), Df = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M16.966900000000003,8.67144C16.6669,8.67144,16.4247,8.91558,16.4247,9.21802L16.4247,16.631500000000003C16.4247,17.322,16.007199999999997,17.9068,15.5139,17.9068L13.93072,17.9068L13.93072,9.2162C13.93072,8.91741,13.68675,8.67144,13.38855,8.67144C13.09036,8.67144,12.84639,8.91741,12.84639,9.21802L12.84639,17.9068L10.151810000000001,17.9068L10.151810000000001,9.21802C10.151810000000001,8.91741,9.90783,8.67144,9.609639999999999,8.67144C9.31145,8.67144,9.06747,8.91741,9.06747,9.219850000000001L9.06747,17.9068L7.48614,17.9068C6.99277,17.9068,6.5753,17.322,6.5753,16.631500000000003L6.5753,9.21802C6.5753,8.91558,6.333130000000001,8.67144,6.03313,8.67144C5.73313,8.67144,5.49096,8.91558,5.49096,9.21802L5.49096,16.631500000000003C5.49096,17.9378,6.385540000000001,19,7.48614,19L15.512,19C16.6127,19,17.509,17.9378,17.509,16.631500000000003L17.509,9.21802C17.509,8.91558,17.2669,8.67144,16.966900000000003,8.67144ZM18.4578,6.21183L4.542169,6.21183C4.243976,6.21183,4,6.45779,4,6.75841C4,7.05903,4.243976,7.30499,4.542169,7.30499L18.4578,7.30499C18.756,7.30499,19,7.05903,19,6.75841C19,6.45779,18.756,6.21183,18.4578,6.21183ZM8.68072,5.10045L14.3193,5.10045C14.6175,5.10045,14.8614,4.852666,14.8614,4.550225C14.8614,4.247783,14.6175,4,14.3193,4L8.68072,4C8.38253,4,8.13855,4.247783,8.13855,4.550225C8.13855,4.852666,8.38253,5.10045,8.68072,5.10045Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), Of = () => Df.cloneNode(!0), Nf = {
  horizontalStraightLine: mh,
  horizontalRayLine: yh,
  horizontalSegment: ph,
  verticalStraightLine: bh,
  verticalRayLine: _h,
  verticalSegment: xh,
  straightLine: wh,
  rayLine: Mh,
  segment: Sh,
  arrow: Dh,
  priceLine: Nh,
  priceChannelLine: Eh,
  parallelStraightLine: Fh,
  fibonacciLine: zh,
  fibonacciSegment: Rh,
  fibonacciCircle: Qh,
  fibonacciSpiral: Vh,
  fibonacciSpeedResistanceFan: qh,
  fibonacciExtension: Wh,
  gannBox: Xh,
  circle: ef,
  triangle: nf,
  rect: of,
  parallelogram: sf,
  threeWaves: cf,
  fiveWaves: df,
  eightWaves: ff,
  anyWaves: gf,
  abcd: vf,
  xabcd: Cf,
  weak_magnet: $f,
  strong_magnet: kf,
  lock: Tf,
  unlock: Pf,
  visible: Lf,
  invisible: Af,
  remove: Of
};
function If(e) {
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
function Ef(e) {
  return [
    { key: "priceChannelLine", text: c("price_channel_line", e) },
    { key: "parallelStraightLine", text: c("parallel_straight_line", e) }
  ];
}
function Bf(e) {
  return [
    { key: "circle", text: c("circle", e) },
    { key: "rect", text: c("rect", e) },
    { key: "parallelogram", text: c("parallelogram", e) },
    { key: "triangle", text: c("triangle", e) }
  ];
}
function Ff(e) {
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
function Uf(e) {
  return [
    { key: "xabcd", text: c("xabcd", e) },
    { key: "abcd", text: c("abcd", e) },
    { key: "threeWaves", text: c("three_waves", e) },
    { key: "fiveWaves", text: c("five_waves", e) },
    { key: "eightWaves", text: c("eight_waves", e) },
    { key: "anyWaves", text: c("any_waves", e) }
  ];
}
function zf(e) {
  return [
    { key: "weak_magnet", text: c("weak_magnet", e) },
    { key: "strong_magnet", text: c("strong_magnet", e) }
  ];
}
const qe = (e) => Nf[e.name](e.class), Kf = /* @__PURE__ */ b('<div class="klinecharts-pro-drawing-bar"><span class="split-line"></span><div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div><div class="item"><span style="width:32px;height:32px"></span></div><div class="item"><span style="width:32px;height:32px"></span></div><span class="split-line"></span><div class="item"><span style="width:32px;height:32px"></span></div></div>'), Rf = /* @__PURE__ */ b('<div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div>'), Dr = /* @__PURE__ */ b('<li><span style="padding-left:8px"></span></li>'), Or = "drawing_tools", jf = (e) => {
  const [t, r] = T("horizontalStraightLine"), [n, s] = T("priceChannelLine"), [l, h] = T("circle"), [d, p] = T("fibonacciLine"), [x, v] = T("xabcd"), [L, D] = T("weak_magnet"), [M, q] = T("normal"), [N, F] = T(!1), [I, re] = T(!0), [R, Y] = T(""), V = j(() => [{
    key: "singleLine",
    icon: t(),
    list: If(e.locale),
    setter: r
  }, {
    key: "moreLine",
    icon: n(),
    list: Ef(e.locale),
    setter: s
  }, {
    key: "polygon",
    icon: l(),
    list: Bf(e.locale),
    setter: h
  }, {
    key: "fibonacci",
    icon: d(),
    list: Ff(e.locale),
    setter: p
  }, {
    key: "wave",
    icon: x(),
    list: Uf(e.locale),
    setter: v
  }]), me = j(() => zf(e.locale));
  return (() => {
    const U = Kf.cloneNode(!0), Q = U.firstChild, H = Q.nextSibling, te = H.firstChild, se = te.nextSibling, Le = se.firstChild, $e = H.nextSibling, ie = $e.firstChild, Ue = $e.nextSibling, ke = Ue.firstChild, ve = Ue.nextSibling, oe = ve.nextSibling, ue = oe.firstChild;
    return C(U, () => V().map((Z) => (() => {
      const O = Rf.cloneNode(!0), E = O.firstChild, be = E.nextSibling, we = be.firstChild;
      return O.addEventListener("blur", () => {
        Y("");
      }), E.$$click = () => {
        e.onDrawingItemClick({
          groupId: Or,
          name: Z.icon,
          visible: I(),
          lock: N(),
          mode: M()
        });
      }, C(E, w(qe, {
        get name() {
          return Z.icon;
        }
      })), be.$$click = () => {
        Z.key === R() ? Y("") : Y(Z.key);
      }, C(O, (() => {
        const de = j(() => Z.key === R());
        return () => de() && w(nn, {
          class: "list",
          get children() {
            return Z.list.map((Ae) => (() => {
              const _ = Dr.cloneNode(!0), le = _.firstChild;
              return _.$$click = () => {
                Z.setter(Ae.key), e.onDrawingItemClick({
                  name: Ae.key,
                  lock: N(),
                  mode: M()
                }), Y("");
              }, C(_, w(qe, {
                get name() {
                  return Ae.key;
                }
              }), le), C(le, () => Ae.text), _;
            })());
          }
        });
      })(), null), B(() => Oe(we, "class", Z.key === R() ? "rotate" : "")), O;
    })()), Q), H.addEventListener("blur", () => {
      Y("");
    }), te.$$click = () => {
      let Z = L();
      M() !== "normal" && (Z = "normal"), q(Z), e.onModeChange(Z);
    }, C(te, (() => {
      const Z = j(() => L() === "weak_magnet");
      return () => Z() ? (() => {
        const O = j(() => M() === "weak_magnet");
        return () => O() ? w(qe, {
          name: "weak_magnet",
          class: "selected"
        }) : w(qe, {
          name: "weak_magnet"
        });
      })() : (() => {
        const O = j(() => M() === "strong_magnet");
        return () => O() ? w(qe, {
          name: "strong_magnet",
          class: "selected"
        }) : w(qe, {
          name: "strong_magnet"
        });
      })();
    })()), se.$$click = () => {
      R() === "mode" ? Y("") : Y("mode");
    }, C(H, (() => {
      const Z = j(() => R() === "mode");
      return () => Z() && w(nn, {
        class: "list",
        get children() {
          return me().map((O) => (() => {
            const E = Dr.cloneNode(!0), be = E.firstChild;
            return E.$$click = () => {
              D(O.key), q(O.key), e.onModeChange(O.key), Y("");
            }, C(E, w(qe, {
              get name() {
                return O.key;
              }
            }), be), C(be, () => O.text), E;
          })());
        }
      });
    })(), null), ie.$$click = () => {
      const Z = !N();
      F(Z), e.onLockChange(Z);
    }, C(ie, (() => {
      const Z = j(() => !!N());
      return () => Z() ? w(qe, {
        name: "lock"
      }) : w(qe, {
        name: "unlock"
      });
    })()), ke.$$click = () => {
      const Z = !I();
      re(Z), e.onVisibleChange(Z);
    }, C(ke, (() => {
      const Z = j(() => !!I());
      return () => Z() ? w(qe, {
        name: "visible"
      }) : w(qe, {
        name: "invisible"
      });
    })()), ue.$$click = () => {
      e.onRemoveClick(Or);
    }, C(ue, w(qe, {
      name: "remove"
    })), B(() => Oe(Le, "class", R() === "mode" ? "rotate" : "")), U;
  })();
};
Ze(["click"]);
const Nr = /* @__PURE__ */ b('<li class="title"></li>'), Ir = /* @__PURE__ */ b('<li class="row"></li>'), Qf = (e) => w(x1, {
  get title() {
    return c("indicator", e.locale);
  },
  width: 400,
  get onClose() {
    return e.onClose;
  },
  get children() {
    return w(nn, {
      class: "klinecharts-pro-indicator-modal-list",
      get children() {
        return [(() => {
          const t = Nr.cloneNode(!0);
          return C(t, () => c("main_indicator", e.locale)), t;
        })(), j(() => ["MA", "EMA", "SMA", "BOLL", "SAR", "BBI"].map((t) => {
          const r = e.mainIndicators.includes(t);
          return (() => {
            const n = Ir.cloneNode(!0);
            return n.$$click = (s) => {
              e.onMainIndicatorChange({
                name: t,
                paneId: "candle_pane",
                added: !r
              });
            }, C(n, w(Sr, {
              checked: r,
              get label() {
                return c(t.toLowerCase(), e.locale);
              }
            })), n;
          })();
        })), (() => {
          const t = Nr.cloneNode(!0);
          return C(t, () => c("sub_indicator", e.locale)), t;
        })(), j(() => ["MA", "EMA", "VOL", "MACD", "BOLL", "KDJ", "RSI", "BIAS", "BRAR", "CCI", "DMI", "CR", "PSY", "DMA", "TRIX", "OBV", "VR", "WR", "MTM", "EMV", "SAR", "SMA", "ROC", "PVT", "BBI", "AO"].map((t) => {
          const r = t in e.subIndicators;
          return (() => {
            const n = Ir.cloneNode(!0);
            return n.$$click = (s) => {
              e.onSubIndicatorChange({
                name: t,
                paneId: e.subIndicators[t] ?? "",
                added: !r
              });
            }, C(n, w(Sr, {
              checked: r,
              get label() {
                return c(t.toLowerCase(), e.locale);
              }
            })), n;
          })();
        }))];
      }
    });
  }
});
Ze(["click"]);
function Er(e, t) {
  switch (e) {
    case "Etc/UTC":
      return c("utc", t);
    case "Pacific/Midway":
      return c("midway", t);
    case "Pacific/Honolulu":
      return c("honolulu", t);
    case "America/Anchorage":
      return c("anchorage", t);
    case "America/Juneau":
      return c("juneau", t);
    case "America/Los_Angeles":
      return c("los_angeles", t);
    case "America/Vancouver":
      return c("vancouver", t);
    case "America/Tijuana":
      return c("tijuana", t);
    case "America/Phoenix":
      return c("phoenix", t);
    case "America/Denver":
      return c("denver", t);
    case "America/Chicago":
      return c("chicago", t);
    case "America/Mexico_City":
      return c("mexico_city", t);
    case "America/Guatemala":
      return c("guatemala", t);
    case "America/New_York":
      return c("new_york", t);
    case "America/Toronto":
      return c("toronto", t);
    case "America/Bogota":
      return c("bogota", t);
    case "America/Lima":
      return c("lima", t);
    case "America/Caracas":
      return c("caracas", t);
    case "America/Halifax":
      return c("halifax", t);
    case "America/Santiago":
      return c("santiago", t);
    case "America/La_Paz":
      return c("la_paz", t);
    case "America/Sao_Paulo":
      return c("sao_paulo", t);
    case "America/Buenos_Aires":
      return c("buenos_aires", t);
    case "America/Montevideo":
      return c("montevideo", t);
    case "America/Godthab":
      return c("godthab", t);
    case "Atlantic/Azores":
      return c("azores", t);
    case "Atlantic/Cape_Verde":
      return c("cape_verde", t);
    case "Europe/London":
      return c("london", t);
    case "Europe/Dublin":
      return c("dublin", t);
    case "Europe/Lisbon":
      return c("lisbon", t);
    case "Africa/Casablanca":
      return c("casablanca", t);
    case "Europe/Paris":
      return c("paris", t);
    case "Europe/Berlin":
      return c("berlin", t);
    case "Europe/Amsterdam":
      return c("amsterdam", t);
    case "Europe/Brussels":
      return c("brussels", t);
    case "Europe/Madrid":
      return c("madrid", t);
    case "Europe/Rome":
      return c("rome", t);
    case "Europe/Vienna":
      return c("vienna", t);
    case "Europe/Warsaw":
      return c("warsaw", t);
    case "Africa/Lagos":
      return c("lagos", t);
    case "Europe/Athens":
      return c("athens", t);
    case "Europe/Bucharest":
      return c("bucharest", t);
    case "Europe/Helsinki":
      return c("helsinki", t);
    case "Europe/Istanbul":
      return c("istanbul", t);
    case "Europe/Kiev":
      return c("kiev", t);
    case "Africa/Cairo":
      return c("cairo", t);
    case "Africa/Johannesburg":
      return c("johannesburg", t);
    case "Asia/Jerusalem":
      return c("jerusalem", t);
    case "Europe/Moscow":
      return c("moscow", t);
    case "Asia/Baghdad":
      return c("baghdad", t);
    case "Asia/Kuwait":
      return c("kuwait", t);
    case "Asia/Riyadh":
      return c("riyadh", t);
    case "Asia/Bahrain":
      return c("bahrain", t);
    case "Africa/Nairobi":
      return c("nairobi", t);
    case "Asia/Tehran":
      return c("tehran", t);
    case "Asia/Dubai":
      return c("dubai", t);
    case "Asia/Muscat":
      return c("muscat", t);
    case "Asia/Baku":
      return c("baku", t);
    case "Asia/Kabul":
      return c("kabul", t);
    case "Asia/Karachi":
      return c("karachi", t);
    case "Asia/Tashkent":
      return c("tashkent", t);
    case "Asia/Ashkhabad":
      return c("ashkhabad", t);
    case "Asia/Kolkata":
      return c("kolkata", t);
    case "Asia/Mumbai":
      return c("mumbai", t);
    case "Asia/Colombo":
      return c("colombo", t);
    case "Asia/Kathmandu":
      return c("kathmandu", t);
    case "Asia/Dhaka":
      return c("dhaka", t);
    case "Asia/Almaty":
      return c("almaty", t);
    case "Asia/Yangon":
      return c("yangon", t);
    case "Asia/Bangkok":
      return c("bangkok", t);
    case "Asia/Jakarta":
      return c("jakarta", t);
    case "Asia/Ho_Chi_Minh":
      return c("ho_chi_minh", t);
    case "Asia/Shanghai":
      return c("shanghai", t);
    case "Asia/Hong_Kong":
      return c("hong_kong", t);
    case "Asia/Singapore":
      return c("singapore", t);
    case "Asia/Taipei":
      return c("taipei", t);
    case "Asia/Manila":
      return c("manila", t);
    case "Asia/Kuala_Lumpur":
      return c("kuala_lumpur", t);
    case "Australia/Perth":
      return c("perth", t);
    case "Asia/Tokyo":
      return c("tokyo", t);
    case "Asia/Seoul":
      return c("seoul", t);
    case "Asia/Pyongyang":
      return c("pyongyang", t);
    case "Australia/Adelaide":
      return c("adelaide", t);
    case "Australia/Darwin":
      return c("darwin", t);
    case "Australia/Brisbane":
      return c("brisbane", t);
    case "Australia/Sydney":
      return c("sydney", t);
    case "Australia/Melbourne":
      return c("melbourne", t);
    case "Pacific/Guam":
      return c("guam", t);
    case "Pacific/Port_Moresby":
      return c("port_moresby", t);
    case "Pacific/Norfolk":
      return c("norfolk", t);
    case "Pacific/Guadalcanal":
      return c("guadalcanal", t);
    case "Pacific/Auckland":
      return c("auckland", t);
    case "Pacific/Fiji":
      return c("fiji", t);
    case "Pacific/Tongatapu":
      return c("tongatapu", t);
    case "Pacific/Apia":
      return c("apia", t);
    case "Asia/Karachi":
      return c("karachi", t);
  }
  return e;
}
function Zf(e) {
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
const Vf = (e) => {
  const [t, r] = T(e.timezone), n = j(() => Zf(e.locale));
  return w(x1, {
    get title() {
      return c("timezone", e.locale);
    },
    width: 320,
    get buttons() {
      return [{
        children: c("confirm", e.locale),
        onClick: () => {
          e.onConfirm(t()), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      return w(k9, {
        style: {
          width: "100%",
          "margin-top": "20px"
        },
        get value() {
          return t().text;
        },
        onSelected: (s) => {
          r(s);
        },
        get dataSource() {
          return n();
        },
        searchable: !0,
        get searchPlaceholder() {
          return c("Search Timezone", e.locale) || "Search timezone...";
        }
      });
    }
  });
};
function Br(e) {
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
const Hf = /* @__PURE__ */ b('<div class="klinecharts-pro-setting-modal-content"></div>'), qf = /* @__PURE__ */ b('<div class="setting-item"><span class="setting-label"></span><div class="setting-control"></div></div>'), Yf = (e) => {
  const [t, r] = T(e.currentStyles), [n, s] = T(Br(e.locale)), [l, h] = T(!1), d = () => {
    h(window.innerWidth <= 768);
  };
  In(() => {
    d(), window.addEventListener("resize", d);
  }), N1(() => {
    window.removeEventListener("resize", d);
  }), Ke(() => {
    s(Br(e.locale));
  });
  const p = (x, v) => {
    const L = {};
    An(L, x.key, v);
    const D = fe.clone(t());
    An(D, x.key, v), r(D), s(n().map((M) => ({
      ...M
    }))), e.onChange(L);
  };
  return w(x1, {
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
          e.onRestoreDefault(n()), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      const x = Hf.cloneNode(!0);
      return C(x, w(Ln, {
        get each() {
          return n();
        },
        children: (v) => {
          let L;
          const D = fe.formatValue(t(), v.key);
          switch (v.component) {
            case "select": {
              const M = v.key === "candle.type" ? "170px" : "120px";
              L = w(k9, {
                get style() {
                  return {
                    width: l() ? "100%" : M,
                    "min-width": l() ? "auto" : M
                  };
                },
                get value() {
                  return c(D, e.locale);
                },
                get dataSource() {
                  return v.dataSource;
                },
                onSelected: (q) => {
                  const N = q.key;
                  p(v, N);
                }
              });
              break;
            }
            case "switch": {
              const M = !!D;
              L = w(Al, {
                open: M,
                onChange: () => {
                  p(v, !M);
                }
              });
              break;
            }
          }
          return (() => {
            const M = qf.cloneNode(!0), q = M.firstChild, N = q.nextSibling;
            return C(q, () => v.text), C(N, L), B(() => M.classList.toggle("mobile-item", !!l())), M;
          })();
        }
      })), B(() => x.classList.toggle("mobile-layout", !!l())), x;
    }
  });
}, Wf = /* @__PURE__ */ b('<img style="width:500px;margin-top: 20px">'), Gf = (e) => w(x1, {
  get title() {
    return c("screenshot", e.locale);
  },
  width: 540,
  get buttons() {
    return [{
      type: "confirm",
      children: c("save", e.locale),
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
    const t = Wf.cloneNode(!0);
    return B(() => Oe(t, "src", e.url)), t;
  }
}), Xf = {
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
}, Jf = /* @__PURE__ */ b('<div class="klinecharts-pro-indicator-setting-modal-content"></div>'), em = /* @__PURE__ */ b("<span></span>"), tm = (e) => {
  const [t, r] = T(fe.clone(e.params.calcParams)), n = (s) => Xf[s];
  return w(x1, {
    get title() {
      return e.params.indicatorName;
    },
    width: 360,
    get buttons() {
      return [{
        type: "confirm",
        children: c("confirm", e.locale),
        onClick: () => {
          const s = n(e.params.indicatorName), l = [];
          fe.clone(t()).forEach((h, d) => {
            !fe.isValid(h) || h === "" ? "default" in s[d] && l.push(s[d].default) : l.push(h);
          }), e.onConfirm(l), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      const s = Jf.cloneNode(!0);
      return C(s, () => n(e.params.indicatorName).map((l, h) => [(() => {
        const d = em.cloneNode(!0);
        return C(d, () => c(l.paramNameKey, e.locale)), d;
      })(), w(x9, {
        style: {
          width: "200px"
        },
        get value() {
          return t()[h] ?? "";
        },
        get precision() {
          return l.precision;
        },
        get min() {
          return l.min;
        },
        onChange: (d) => {
          const p = fe.clone(t());
          p[h] = d, r(p);
        }
      })])), s;
    }
  });
}, nm = /* @__PURE__ */ b('<svg viewBox="0 0 1024 1024"><path d="M945.066667 898.133333l-189.866667-189.866666c55.466667-64 87.466667-149.333333 87.466667-241.066667 0-204.8-168.533333-373.333333-373.333334-373.333333S96 264.533333 96 469.333333 264.533333 842.666667 469.333333 842.666667c91.733333 0 174.933333-34.133333 241.066667-87.466667l189.866667 189.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c8.533333-12.8 8.533333-34.133333-2.133333-46.933334zM469.333333 778.666667C298.666667 778.666667 160 640 160 469.333333S298.666667 160 469.333333 160 778.666667 298.666667 778.666667 469.333333 640 778.666667 469.333333 778.666667z"></path></svg>'), rm = /* @__PURE__ */ b('<img alt="symbol">'), om = /* @__PURE__ */ b("<li><div><span></span></div></li>"), im = (e) => {
  const [t, r] = T(""), [n] = v5(t, e.datafeed.searchSymbols.bind(e.datafeed));
  return w(x1, {
    get title() {
      return c("symbol_search", e.locale);
    },
    width: 460,
    get onClose() {
      return e.onClose;
    },
    get children() {
      return [w(x9, {
        class: "klinecharts-pro-symbol-search-modal-input",
        get placeholder() {
          return c("symbol_code", e.locale);
        },
        get suffix() {
          return nm.cloneNode(!0);
        },
        get value() {
          return t();
        },
        onChange: (s) => {
          const l = `${s}`;
          r(l);
        }
      }), w(nn, {
        class: "klinecharts-pro-symbol-search-modal-list",
        get loading() {
          return n.loading;
        },
        get dataSource() {
          return n() ?? [];
        },
        renderItem: (s) => (() => {
          const l = om.cloneNode(!0), h = l.firstChild, d = h.firstChild;
          return l.$$click = () => {
            e.onSymbolSelected(s), e.onClose();
          }, C(h, w(J, {
            get when() {
              return s.logo;
            },
            get children() {
              const p = rm.cloneNode(!0);
              return B(() => Oe(p, "src", s.logo)), p;
            }
          }), d), C(d, () => s.shortName ?? s.ticker, null), C(d, () => `${s.name ? `(${s.name})` : ""}`, null), C(l, () => s.exchange ?? "", null), B(() => Oe(d, "title", s.name ?? "")), l;
        })()
      })];
    }
  });
};
Ze(["click"]);
const am = /* @__PURE__ */ b('<div class="klinecharts-pro-mobile-more-modal-content"><div class="item"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div><div class="item"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path></svg><span></span></div><div class="item"><svg viewBox="0 0 20 20"><rect x="3" y="4" width="14" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"></rect><path d="M6 2.5v4M14 2.5v4M3 8h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M10 11v3l2.2 1.3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg><span>Time Tools</span></div><div class="item"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg><span></span></div></div>'), sm = (e) => w(x1, {
  get title() {
    return c("more", e.locale);
  },
  isMobile: !0,
  get onClose() {
    return e.onClose;
  },
  get children() {
    const t = am.cloneNode(!0), r = t.firstChild, n = r.firstChild, s = n.nextSibling, l = r.nextSibling, h = l.firstChild, d = h.nextSibling, p = l.nextSibling, x = p.nextSibling, v = x.firstChild, L = v.nextSibling;
    return r.$$click = () => {
      e.onIndicatorClick(), e.onClose();
    }, C(s, () => c("indicator", e.locale)), l.$$click = () => {
      e.onTimezoneClick(), e.onClose();
    }, C(d, () => c("timezone", e.locale)), p.$$click = () => {
      e.onTimeToolsClick(), e.onClose();
    }, x.$$click = () => {
      e.onSettingClick(), e.onClose();
    }, C(L, () => c("setting", e.locale)), t;
  }
});
Ze(["click"]);
const lm = /* @__PURE__ */ b('<div class="klinecharts-pro-time-tools-picker"></div>'), cm = /* @__PURE__ */ b('<label class="klinecharts-pro-time-tools-field"><button type="button" class="klinecharts-pro-time-tools-input"><span></span><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M8 3v4M16 3v4M4 10h16"></path></svg></button></label>'), um = /* @__PURE__ */ b("<span></span>"), dm = /* @__PURE__ */ b('<div class="klinecharts-pro-time-tools-calendar"><div class="klinecharts-pro-time-tools-month"><button type="button">&lt;&lt;</button><button type="button">&lt;</button><button type="button" class="calendar-title"></button><button type="button">></button><button type="button">>></button></div></div>'), hm = /* @__PURE__ */ b('<div class="klinecharts-pro-time-tools-grid"></div>'), fm = /* @__PURE__ */ b('<span class="weekday"></span>'), D1 = /* @__PURE__ */ b('<button type="button"></button>'), mm = /* @__PURE__ */ b('<div class="klinecharts-pro-time-tools-month-grid"></div>'), gm = /* @__PURE__ */ b('<div class="klinecharts-pro-time-tools-month-grid year-grid"></div>'), ym = /* @__PURE__ */ b('<div class="klinecharts-pro-time-tools-spinners"><div class="spinner-column scrollable"></div><div class="spinner-column scrollable"></div><div class="spinner-column"></div></div>'), vm = /* @__PURE__ */ b('<div class="klinecharts-pro-time-tools-content"></div>'), pm = /* @__PURE__ */ b('<div class="klinecharts-pro-time-tools-tabs"></div>'), Cm = /* @__PURE__ */ b('<div class="klinecharts-pro-time-tools-range-panel"><div class="klinecharts-pro-time-tools-range-header"><button type="button"></button><span class="klinecharts-pro-time-tools-range-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg></span><button type="button"></button><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M8 3v4M16 3v4M4 10h16"></path></svg></div></div>'), bm = /* @__PURE__ */ b('<div class="klinecharts-pro-time-tools-panel"><div class="klinecharts-pro-time-tools-row"><div><strong>Time Anchor</strong><span>Anchor to a time on the chart when switching between intervals</span></div><button type="button"><span></span></button></div><div><div><strong>Anchor Point</strong></div><select><option value="date">Date</option><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option></select></div><div><div><strong>Anchor line</strong><span>Mark the anchored time on the chart with a vertical line</span></div><button type="button"><span></span></button></div><div><div><strong>Across Tokens</strong><span>Retain onscreen chart range when switching symbols</span></div><button type="button"><span></span></button></div></div>'), $m = /* @__PURE__ */ b('<div class="klinecharts-pro-time-tools-anchor-date"></div>'), _m = [{
  key: "goToDate",
  label: "Go to Date"
}, {
  key: "timeRange",
  label: "Time Range"
}, {
  key: "timeAnchor",
  label: "Time Anchor"
}], km = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], Fr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], R1 = (e) => String(e).padStart(2, "0"), Ur = (e, t, r) => Math.min(r, new Date(e, t + 1, 0).getDate()), $n = (e) => {
  const t = new Date(e);
  return {
    year: t.getFullYear(),
    month: t.getMonth(),
    day: t.getDate(),
    hour: t.getHours(),
    minute: t.getMinutes()
  };
}, jt = (e) => new Date(e.year, e.month, e.day, e.hour, e.minute, 0, 0).getTime(), _n = (e) => e.year * 1e4 + (e.month + 1) * 100 + e.day, On = (e) => {
  const t = e.hour >= 12 ? "PM" : "AM", r = e.hour % 12 || 12;
  return `${R1(e.month + 1)}/${R1(e.day)}/${e.year} ${R1(r)}:${R1(e.minute)} ${t}`;
}, xm = (e, t) => {
  const r = new Date(e, t, 1).getDay(), n = new Date(e, t + 1, 0).getDate(), s = new Date(e, t, 0).getDate(), l = [];
  for (let h = r - 1; h >= 0; h -= 1)
    l.push({
      date: new Date(e, t - 1, s - h),
      current: !1
    });
  for (let h = 1; h <= n; h += 1)
    l.push({
      date: new Date(e, t, h),
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
}, Qt = (e) => {
  const [t, r] = T(!0), [n, s] = T("date"), [l, h] = T(e.value.year), [d, p] = T(e.value.month), x = j(() => xm(l(), d())), v = j(() => Math.floor(l() / 10) * 10), L = j(() => Array.from({
    length: 12
  }, (U, Q) => v() - 1 + Q)), D = j(() => e.value.hour % 12 || 12), M = j(() => e.value.hour >= 12 ? "PM" : "AM"), q = Array.from({
    length: 12
  }, (U, Q) => Q + 1), N = Array.from({
    length: 60
  }, (U, Q) => Q), F = (U) => {
    const Q = new Date(l(), d() + U, 1);
    h(Q.getFullYear()), p(Q.getMonth());
  }, I = () => {
    n() === "date" ? s("month") : n() === "month" && s("year");
  }, re = (U) => {
    var Q;
    e.onChange({
      ...e.value,
      year: U.getFullYear(),
      month: U.getMonth(),
      day: U.getDate()
    }), (Q = e.onDateSelect) == null || Q.call(e), h(U.getFullYear()), p(U.getMonth());
  }, R = (U) => {
    p(U), e.onChange({
      ...e.value,
      year: l(),
      month: U,
      day: Ur(l(), U, e.value.day)
    }), s("date");
  }, Y = (U) => {
    h(U), e.onChange({
      ...e.value,
      year: U,
      day: Ur(U, e.value.month, e.value.day)
    }), s("month");
  }, V = (U) => {
    const Q = M() === "PM";
    e.onChange({
      ...e.value,
      hour: Q ? U === 12 ? 12 : U + 12 : U === 12 ? 0 : U
    });
  }, me = (U) => {
    const Q = D();
    e.onChange({
      ...e.value,
      hour: U === "PM" ? Q === 12 ? 12 : Q + 12 : Q === 12 ? 0 : Q
    });
  };
  return (() => {
    const U = lm.cloneNode(!0);
    return C(U, (() => {
      const Q = j(() => e.showInput !== !1);
      return () => Q() && (() => {
        const H = cm.cloneNode(!0), te = H.firstChild, se = te.firstChild;
        return C(H, (() => {
          const Le = j(() => !!e.label);
          return () => Le() && (() => {
            const $e = um.cloneNode(!0);
            return C($e, () => e.label), $e;
          })();
        })(), te), te.$$click = () => r(!t()), C(se, () => On(e.value)), H;
      })();
    })(), null), C(U, (() => {
      const Q = j(() => !!t());
      return () => Q() && (() => {
        const H = dm.cloneNode(!0), te = H.firstChild, se = te.firstChild, Le = se.nextSibling, $e = Le.nextSibling, ie = $e.nextSibling, Ue = ie.nextSibling;
        return se.$$click = () => {
          n() === "year" ? h(l() - 10) : n() === "month" ? h(l() - 1) : F(-12);
        }, Le.$$click = () => {
          n() === "year" ? h(l() - 10) : n() === "month" ? h(l() - 1) : F(-1);
        }, $e.$$click = I, C($e, (() => {
          const ke = j(() => n() === "year");
          return () => ke() ? `${v()}-${v() + 9}` : (() => {
            const ve = j(() => n() === "month");
            return () => ve() ? l() : `${Fr[d()]} ${l()}`;
          })();
        })()), ie.$$click = () => {
          n() === "year" ? h(l() + 10) : n() === "month" ? h(l() + 1) : F(1);
        }, Ue.$$click = () => {
          n() === "year" ? h(l() + 10) : n() === "month" ? h(l() + 1) : F(12);
        }, C(H, (() => {
          const ke = j(() => n() === "date");
          return () => ke() && (() => {
            const ve = hm.cloneNode(!0);
            return C(ve, () => km.map((oe) => (() => {
              const ue = fm.cloneNode(!0);
              return C(ue, oe), ue;
            })()), null), C(ve, () => x().map(({
              date: oe,
              current: ue
            }) => {
              const Z = _n({
                year: oe.getFullYear(),
                month: oe.getMonth(),
                day: oe.getDate()
              }), O = e.range ? _n(e.range.from) : NaN, E = e.range ? _n(e.range.to) : NaN, be = Math.min(O, E), we = Math.max(O, E), de = Number.isFinite(be) && Z >= be && Z <= we, Ae = Number.isFinite(be) && (Z === be || Z === we), _ = oe.getFullYear() === e.value.year && oe.getMonth() === e.value.month && oe.getDate() === e.value.day;
              return (() => {
                const le = D1.cloneNode(!0);
                return le.$$click = () => re(oe), ne(le, `${ue ? "" : "muted"} ${de ? "in-range" : ""} ${Ae || _ ? "selected" : ""}`), C(le, () => oe.getDate()), le;
              })();
            }), null), ve;
          })();
        })(), null), C(H, (() => {
          const ke = j(() => n() === "month");
          return () => ke() && (() => {
            const ve = mm.cloneNode(!0);
            return C(ve, () => Fr.map((oe, ue) => (() => {
              const Z = D1.cloneNode(!0);
              return Z.$$click = () => R(ue), C(Z, oe), B(() => ne(Z, ue === e.value.month && l() === e.value.year ? "selected" : "")), Z;
            })())), ve;
          })();
        })(), null), C(H, (() => {
          const ke = j(() => n() === "year");
          return () => ke() && (() => {
            const ve = gm.cloneNode(!0);
            return C(ve, () => L().map((oe) => (() => {
              const ue = D1.cloneNode(!0);
              return ue.$$click = () => Y(oe), C(ue, oe), B(() => ne(ue, `${oe < v() || oe > v() + 9 ? "muted" : ""} ${oe === e.value.year ? "selected" : ""}`)), ue;
            })())), ve;
          })();
        })(), null), C(H, (() => {
          const ke = j(() => n() === "date");
          return () => ke() && (() => {
            const ve = ym.cloneNode(!0), oe = ve.firstChild, ue = oe.nextSibling, Z = ue.nextSibling;
            return C(oe, () => q.map((O) => (() => {
              const E = D1.cloneNode(!0);
              return E.$$click = () => V(O), C(E, () => R1(O)), B(() => ne(E, O === D() ? "selected" : "")), E;
            })())), C(ue, () => N.map((O) => (() => {
              const E = D1.cloneNode(!0);
              return E.$$click = () => e.onChange({
                ...e.value,
                minute: O
              }), C(E, () => R1(O)), B(() => ne(E, O === e.value.minute ? "selected" : "")), E;
            })())), C(Z, () => ["AM", "PM"].map((O) => (() => {
              const E = D1.cloneNode(!0);
              return E.$$click = () => me(O), C(E, O), B(() => ne(E, O === M() ? "selected" : "")), E;
            })())), ve;
          })();
        })(), null), H;
      })();
    })(), null), U;
  })();
}, Lm = (e) => {
  const [t, r] = T(e.initialTab ?? "goToDate"), [n, s] = T($n(e.initialTimestamp)), [l, h] = T($n(e.initialRange.from)), [d, p] = T($n(e.initialRange.to)), [x, v] = T("from"), [L, D] = T({
    ...e.anchorSettings,
    anchorLine: e.anchorSettings.anchorLine ?? !0,
    acrossTokens: e.anchorSettings.acrossTokens ?? !0
  }), M = (N) => {
    D((F) => ({
      ...F,
      ...N
    }));
  }, q = () => {
    const N = t();
    if (N === "goToDate")
      e.onGoToDate(jt(n()));
    else if (N === "timeRange") {
      const F = jt(l()), I = jt(d());
      e.onTimeRange(F <= I ? {
        from: F,
        to: I
      } : {
        from: I,
        to: F
      });
    } else {
      const F = L();
      e.onTimeAnchorChange({
        ...F,
        timestamp: F.anchorPoint === "date" ? jt(n()) : F.timestamp
      });
    }
    e.onClose();
  };
  return w(x1, {
    width: 620,
    get title() {
      return (() => {
        const N = pm.cloneNode(!0);
        return C(N, () => _m.map((F) => (() => {
          const I = D1.cloneNode(!0);
          return I.$$click = () => r(F.key), C(I, () => F.label), B(() => ne(I, t() === F.key ? "active" : "")), I;
        })())), N;
      })();
    },
    get buttons() {
      return [{
        children: "Close",
        type: "cancel",
        onClick: e.onClose
      }, {
        children: "Confirm",
        onClick: q
      }];
    },
    get onClose() {
      return e.onClose;
    },
    minButtonWidth: 112,
    get children() {
      const N = vm.cloneNode(!0);
      return C(N, (() => {
        const F = j(() => t() === "goToDate");
        return () => F() && w(Qt, {
          label: "",
          get value() {
            return n();
          },
          onChange: s
        });
      })(), null), C(N, (() => {
        const F = j(() => t() === "timeRange");
        return () => F() && (() => {
          const I = Cm.cloneNode(!0), re = I.firstChild, R = re.firstChild, Y = R.nextSibling, V = Y.nextSibling;
          return R.$$click = () => v("from"), C(R, () => On(l())), V.$$click = () => v("to"), C(V, () => On(d())), C(I, (() => {
            const me = j(() => x() === "from");
            return () => me() ? w(Qt, {
              label: "Start",
              get value() {
                return l();
              },
              onChange: h,
              onDateSelect: () => v("to"),
              showInput: !1,
              get range() {
                return {
                  from: l(),
                  to: d()
                };
              }
            }) : w(Qt, {
              label: "End",
              get value() {
                return d();
              },
              onChange: p,
              showInput: !1,
              get range() {
                return {
                  from: l(),
                  to: d()
                };
              }
            });
          })(), null), B((me) => {
            const U = x() === "from" ? "active" : "", Q = x() === "to" ? "active" : "";
            return U !== me._v$ && ne(R, me._v$ = U), Q !== me._v$2 && ne(V, me._v$2 = Q), me;
          }, {
            _v$: void 0,
            _v$2: void 0
          }), I;
        })();
      })(), null), C(N, (() => {
        const F = j(() => t() === "timeAnchor");
        return () => F() && (() => {
          const I = bm.cloneNode(!0), re = I.firstChild, R = re.firstChild, Y = R.nextSibling, V = re.nextSibling, me = V.firstChild, U = me.nextSibling, Q = V.nextSibling, H = Q.firstChild, te = H.nextSibling, se = Q.nextSibling, Le = se.firstChild, $e = Le.nextSibling;
          return Y.$$click = () => M({
            enabled: !L().enabled
          }), U.addEventListener("change", (ie) => M({
            anchorPoint: ie.currentTarget.value
          })), C(I, (() => {
            const ie = j(() => !!(L().enabled && L().anchorPoint === "date"));
            return () => ie() && (() => {
              const Ue = $m.cloneNode(!0);
              return C(Ue, w(Qt, {
                label: "Anchor date",
                get value() {
                  return n();
                },
                onChange: s
              })), Ue;
            })();
          })(), Q), te.$$click = () => M({
            anchorLine: !L().anchorLine
          }), $e.$$click = () => M({
            acrossTokens: !L().acrossTokens
          }), B((ie) => {
            const Ue = `klinecharts-pro-time-tools-switch${L().enabled ? " on" : ""}`, ke = `klinecharts-pro-time-tools-row${L().enabled ? "" : " disabled"}`, ve = !L().enabled, oe = `klinecharts-pro-time-tools-row with-divider${L().enabled ? "" : " disabled"}`, ue = `klinecharts-pro-time-tools-switch${L().anchorLine ? " on" : ""}`, Z = !L().enabled, O = `klinecharts-pro-time-tools-row with-divider${L().enabled ? "" : " disabled"}`, E = `klinecharts-pro-time-tools-switch${L().acrossTokens ? " on" : ""}`, be = !L().enabled;
            return Ue !== ie._v$3 && ne(Y, ie._v$3 = Ue), ke !== ie._v$4 && ne(V, ie._v$4 = ke), ve !== ie._v$5 && (U.disabled = ie._v$5 = ve), oe !== ie._v$6 && ne(Q, ie._v$6 = oe), ue !== ie._v$7 && ne(te, ie._v$7 = ue), Z !== ie._v$8 && (te.disabled = ie._v$8 = Z), O !== ie._v$9 && ne(se, ie._v$9 = O), E !== ie._v$10 && ne($e, ie._v$10 = E), be !== ie._v$11 && ($e.disabled = ie._v$11 = be), ie;
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
          }), B(() => U.value = L().anchorPoint), I;
        })();
      })(), null), N;
    }
  });
};
Ze(["click"]);
const wm = /* @__PURE__ */ b('<i class="icon-close klinecharts-pro-load-icon"></i>'), Am = /* @__PURE__ */ b('<div class="klinecharts-pro-content"><div class="klinecharts-pro-widget"></div></div>'), Mm = /* @__PURE__ */ b('<div class="klinecharts-pro-time-anchor-line"></div>'), Tm = /* @__PURE__ */ b('<div class="klinecharts-pro-time-navigation-tooltip"></div>'), Sm = /* @__PURE__ */ b('<div class="klinecharts-pro-countdown-price-mark"><span class="klinecharts-pro-countdown-price-mark-price"></span><span class="klinecharts-pro-countdown-price-mark-timer"></span></div>'), Pm = /* @__PURE__ */ b('<div class="overlay-toolbar-color-popover"><div class="overlay-toolbar-color-grid"></div><div class="overlay-toolbar-color-footer"><button type="button" class="overlay-toolbar-add-color">+</button><div class="overlay-toolbar-color-slider"><span></span></div></div></div>'), Dm = /* @__PURE__ */ b('<div class="overlay-toolbar-dropdown width-menu"></div>'), Om = /* @__PURE__ */ b('<div class="overlay-toolbar-dropdown style-menu"><button type="button"><span class="overlay-toolbar-style-sample solid"></span></button><button type="button"><span class="overlay-toolbar-style-sample dashed"></span></button><button type="button"><span class="overlay-toolbar-style-sample dotted"></span></button></div>'), Nm = /* @__PURE__ */ b('<div class="klinecharts-pro-overlay-toolbar"><button type="button" class="overlay-toolbar-icon drag" title="Move"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="6" r="1.5"></circle><circle cx="15" cy="6" r="1.5"></circle><circle cx="9" cy="12" r="1.5"></circle><circle cx="15" cy="12" r="1.5"></circle><circle cx="9" cy="18" r="1.5"></circle><circle cx="15" cy="18" r="1.5"></circle></svg></button><button type="button" class="overlay-toolbar-icon refresh" title="Reset"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 15.4-6.36L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-15.4 6.36L3 16"></path><path d="M3 21v-5h5"></path></svg></button><div class="overlay-toolbar-picker"><button type="button" title="Color"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg></button></div><div class="overlay-toolbar-picker"><button type="button" title="Line width"><span class="overlay-toolbar-line-preview"></span><span>px</span></button></div><div class="overlay-toolbar-picker"><button type="button" title="Line style"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16"></path></svg></button></div><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2"></rect><path d="M20 4 4 20"></path></svg></button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg></button><button type="button" class="overlay-toolbar-icon delete" title="Delete"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6 18 20H6L5 6"></path><path d="M10 11v5"></path><path d="M14 11v5"></path></svg></button></div>'), Im = /* @__PURE__ */ b('<button type="button"></button>'), Em = /* @__PURE__ */ b('<button type="button"><span class="overlay-toolbar-width-sample"></span></button>'), Bm = /* @__PURE__ */ b('<div class="klinecharts-pro-quick-order-marker"><button type="button" class="klinecharts-pro-quick-order-plus"></button></div>'), Fm = /* @__PURE__ */ b('<span class="klinecharts-pro-quick-order-plus-icon"></span>'), Um = /* @__PURE__ */ b('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" aria-hidden="true"><path d="M460-300h40v-160h160v-40H500v-160h-40v160H300v40h160v160ZM224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h510.76q27.62 0 46.12 18.5Q800-763 800-735.38v510.76q0 27.62-18.5 46.12Q763-160 735.38-160H224.62Zm0-40h510.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-510.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69H224.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v510.76q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69ZM200-760v560-560Z"></path></svg>'), zm = /* @__PURE__ */ b('<div class="klinecharts-pro-quick-order-menu-anchor"><div class="klinecharts-pro-quick-order-menu"><button type="button">Trade <!> @ <!> Limit</button><button type="button">Trade <!> @ <!> Stop</button><button type="button">Create new order...</button><button type="button">Copy Price (<!>)</button><button type="button">Draw horizontal line on </button></div></div>');
function Zt(e, t, r, n) {
  t === "VOL" && (n = {
    gap: {
      bottom: 2
    },
    ...n
  });
  const s = (e == null ? void 0 : e.createIndicator({
    name: t,
    // @ts-expect-error
    createTooltipDataSource: ({
      indicator: l,
      defaultStyles: h
    }) => {
      const d = [];
      return l.visible ? (d.push(h.tooltip.icons[1]), d.push(h.tooltip.icons[2]), d.push(h.tooltip.icons[3])) : (d.push(h.tooltip.icons[0]), d.push(h.tooltip.icons[2]), d.push(h.tooltip.icons[3])), {
        icons: d
      };
    }
  }, r, n)) ?? null;
  if (s && t === "MA")
    try {
      e == null || e.overrideIndicator({
        name: "MA",
        calcParams: [7, 25, 99]
      }, s);
    } catch {
    }
  return s;
}
function Vt(e) {
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
function Km(e) {
  const t = Math.max(0, Math.ceil(e / 1e3)), r = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), s = t % 60, l = (h) => String(h).padStart(2, "0");
  return r > 0 ? `${l(r)}:${l(n)}:${l(s)}` : `${l(n)}:${l(s)}`;
}
const Rm = (e) => {
  var C0, b0, $0, _0, k0, x0, L0, w0, A0, M0, T0, S0, P0, D0, O0, N0, I0, E0, B0, F0, U0, z0, K0, R0, j0, Q0, Z0, V0;
  let t, r, n = null, s;
  const [l, h] = T(!1), [d, p] = T(e.theme), [x, v] = T(e.styles), [L, D] = T(e.locale), [M, q] = T(e.symbol), [N, F] = T(e.period), I = () => {
    var o, i, a, u;
    return {
      visibleMarginLeft: ((o = e.indicatorTooltipIconStyles) == null ? void 0 : o.visibleMarginLeft) ?? 7,
      secondaryMarginLeft: ((i = e.indicatorTooltipIconStyles) == null ? void 0 : i.secondaryMarginLeft) ?? 7,
      marginTop: ((a = e.indicatorTooltipIconStyles) == null ? void 0 : a.marginTop) ?? 1,
      size: ((u = e.indicatorTooltipIconStyles) == null ? void 0 : u.size) ?? 12
    };
  }, [re, R] = T(!1), [Y, V] = T([...e.mainIndicators]), [me, U] = T({}), [Q, H] = T(!1), [te, se] = T({
    key: e.timezone,
    text: Er(e.timezone, e.locale)
  }), [Le, $e] = T(!1), [ie, Ue] = T(), [ke, ve] = T(""), [oe, ue] = T(!1), [Z, O] = T(Date.now()), [E, be] = T({
    from: Date.now() - 30 * 24 * 60 * 60 * 1e3,
    to: Date.now()
  }), [we, de] = T({
    enabled: !1,
    timestamp: Date.now(),
    anchorPoint: "date",
    anchorLine: !0,
    acrossTokens: !0
  }), [Ae, _] = T(e.drawingBarVisible), [le, Pe] = T(!1), [a1, ge] = T(!1), [g1, s1] = T(!1), X1 = ((C0 = e.orderTools) == null ? void 0 : C0.quickOrder) ?? !0, [Ie, yt] = T({
    quickOrder: X1,
    quickOrderFloatingWindow: ((b0 = e.orderTools) == null ? void 0 : b0.quickOrderFloatingWindow) ?? X1,
    quickOrderPlusButton: (($0 = e.orderTools) == null ? void 0 : $0.quickOrderPlusButton) ?? X1,
    openOrders: ((_0 = e.orderTools) == null ? void 0 : _0.openOrders) ?? !0,
    openOrdersExtendedPriceLine: ((k0 = e.orderTools) == null ? void 0 : k0.openOrdersExtendedPriceLine) ?? !0,
    openOrdersDisplay: ((x0 = e.orderTools) == null ? void 0 : x0.openOrdersDisplay) ?? "right",
    positions: ((L0 = e.orderTools) == null ? void 0 : L0.positions) ?? !0,
    breakevenPrice: ((w0 = e.orderTools) == null ? void 0 : w0.breakevenPrice) ?? !0,
    liquidationPrice: ((A0 = e.orderTools) == null ? void 0 : A0.liquidationPrice) ?? !0,
    priceLine: ((M0 = e.orderTools) == null ? void 0 : M0.priceLine) ?? !0,
    marketPriceLine: ((T0 = e.orderTools) == null ? void 0 : T0.marketPriceLine) ?? !0,
    countDown: ((S0 = e.orderTools) == null ? void 0 : S0.countDown) ?? !0,
    bidAskPrice: ((P0 = e.orderTools) == null ? void 0 : P0.bidAskPrice) ?? !0,
    orderHistory: ((D0 = e.orderTools) == null ? void 0 : D0.orderHistory) ?? !0
  }), [B1, L1] = T(null), [w1, e1] = T(!1), [vt, Ve] = T(!1), [J1, et] = T(64), [y1, A1] = T(null), tt = 6, [pt, F1] = T(null), [nt, Ct] = T(null), [bt, rt] = T(null), [Re, ze] = T(null), [je, Qe] = T(null), $t = ["#000000", "#2b3342", "#3f4653", "#565d69", "#6f7580", "#8a9099", "#a7acb3", "#c4c8ce", "#ffffff", "#ff4d67", "#ffa629", "#f7ed4a", "#2fc58d", "#4ab09c", "#52c4d3", "#3157f6", "#6a36b8", "#a644b9", "#d83972", "#f2a3a6", "#f5c879", "#f7ee97", "#a6d29f", "#7fc9b9", "#91d7df", "#8fb2ee", "#b09ad2", "#c89ccf", "#d987ab", "#e8757a", "#efb34f", "#efe36e", "#86c17d", "#66b7a8", "#68c4d0", "#5f91e4", "#8059c9", "#aa62c2", "#d34d83", "#b9353d", "#ea8527", "#e8c245", "#4b8c43", "#2f6f60", "#47919b", "#2646c6", "#56309c", "#892f95", "#a82563", "#8e2528", "#de5c1f", "#dc8527", "#255a22", "#164b34", "#225b63", "#15309b", "#442180", "#6b1f74", "#86154e"];
  let ot = null;
  const [U1, _t] = T({
    visible: !1,
    indicatorName: "",
    paneId: "",
    calcParams: []
  });
  let xe = /* @__PURE__ */ new Map(), Ee = /* @__PURE__ */ new Map();
  const kt = (o, i, a) => {
    const u = n == null ? void 0 : n.getIndicatorByPaneId(i, o);
    return {
      name: o,
      shortName: (u == null ? void 0 : u.shortName) || o,
      paneId: i,
      type: a,
      calcParams: (u == null ? void 0 : u.calcParams) || [],
      precision: (u == null ? void 0 : u.precision) ?? 4,
      visible: (u == null ? void 0 : u.visible) ?? !0,
      styles: u == null ? void 0 : u.styles,
      figures: u == null ? void 0 : u.figures
    };
  }, Ye = (o, i, a, u) => {
    if (e.onIndicatorChange)
      if (u === "add" || u === "change")
        setTimeout(() => {
          const m = kt(o, i, a);
          e.onIndicatorChange({
            action: u,
            indicator: m
          });
        }, 50);
      else {
        const m = {
          name: o,
          shortName: o,
          paneId: i,
          type: a,
          calcParams: [],
          precision: 4,
          visible: !1,
          styles: void 0,
          figures: void 0
        };
        e.onIndicatorChange({
          action: u,
          indicator: m
        });
      }
  }, v1 = (o) => ({
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
      return o.map((u) => p1(u, i));
    const a = {};
    for (const u in o)
      if (!(u === "__proto__" || u === "constructor" || u === "prototype"))
        try {
          const m = o[u];
          if (typeof m == "function")
            continue;
          a[u] = p1(m, i);
        } catch (m) {
          a[u] = `[Error: ${m.message}]`;
        }
    return a;
  }, xt = (o) => {
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
        mode: o.mode || vn.Normal
      };
    } catch (i) {
      return console.error("Error extracting overlay data:", i), null;
    }
  }, l1 = (o) => {
    var i, a, u;
    try {
      const m = (i = n == null ? void 0 : n.getOverlayById) == null ? void 0 : i.call(n, o);
      if (!m)
        return;
      const g = xt(m);
      if (g) {
        const f = xe.get(o), y = ((a = f == null ? void 0 : f.points) == null ? void 0 : a.length) || 0, k = ((u = g.points) == null ? void 0 : u.length) || 0;
        xe.set(o, g);
        const A = v1(g.type);
        if (k >= A) {
          const P = Ee.get(o);
          P && !P.complete && (P.complete = !0, P.checkInterval && (clearInterval(P.checkInterval), P.checkInterval = void 0));
        }
      }
    } catch (m) {
      console.error(`Error updating overlay tracking for ${o}:`, m);
    }
  }, it = (o, i) => {
    if (Ee.has(o))
      return;
    const a = {
      monitoring: !0,
      complete: !1,
      lastPointCount: 0
    };
    Ee.set(o, a), l1(o);
    const u = () => {
      l1(o);
    };
    document.addEventListener("mouseup", u), document.addEventListener("touchend", u), setTimeout(() => {
      var g;
      const m = Ee.get(o);
      if (m && !m.complete) {
        m.checkInterval && clearInterval(m.checkInterval), m.mouseUpHandler && (document.removeEventListener("mouseup", m.mouseUpHandler), document.removeEventListener("touchend", m.mouseUpHandler)), l1(o);
        const f = xe.get(o);
        if (f) {
          const y = v1(f.type), k = ((g = f.points) == null ? void 0 : g.length) || 0;
          k < y && console.warn(`âš ï¸ ${f.type} ${o} has only ${k} point(s), should have ${y}`);
        }
      }
    }, 3e4);
  };
  let c1 = {
    saveDrawings: (o, i) => {
      try {
        const a = `kline_drawings_${o}`, m = {
          drawings: i.map((g) => {
            var A;
            const f = {
              ...g
            };
            f.extendData && (f.extendData = p1(f.extendData)), f.styles && (f.styles = p1(f.styles));
            const y = v1(g.type), k = ((A = g.points) == null ? void 0 : A.length) || 0;
            return k < y && console.warn(`âš ï¸ Saving ${g.type} with only ${k} point(s), needs ${y}`), f;
          }),
          timestamp: Date.now()
        };
        localStorage.setItem(a, JSON.stringify(m));
      } catch (a) {
        console.error("Library: Error saving drawings:", a);
      }
    },
    loadDrawings: (o) => {
      try {
        const i = `kline_drawings_${o}`, a = localStorage.getItem(i);
        if (a) {
          const u = JSON.parse(a), m = [];
          return Array.isArray(u.drawings) && u.drawings.forEach((g) => {
            var k;
            const f = v1(g.type);
            (((k = g.points) == null ? void 0 : k.length) || 0) >= f && m.push(g);
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
  const M1 = () => {
    const o = M();
    if (o != null && o.ticker) {
      const i = Array.from(xe.values());
      c1.saveDrawings(o.ticker, i);
    }
  }, Lt = (o) => {
    if (!o || !n)
      return;
    xe.forEach((a, u) => {
      var m;
      (m = n == null ? void 0 : n.removeOverlay) == null || m.call(n, {
        id: u
      });
    }), xe.clear(), Ee.clear(), ze(null), Qe(null), c1.loadDrawings(o).forEach((a) => {
      var u;
      try {
        const m = b1({
          name: a.type,
          points: a.points || [],
          extendData: a.extendData,
          styles: a.styles,
          visible: a.visible ?? !0,
          lock: a.lock ?? !1,
          mode: a.mode || vn.Normal
        }), g = n == null ? void 0 : n.createOverlay(m), f = typeof g == "string" ? g : null;
        f && (xe.set(f, {
          ...a,
          id: f
        }), Ee.set(f, {
          monitoring: !1,
          complete: !0,
          lastPointCount: ((u = a.points) == null ? void 0 : u.length) || 0
        }));
      } catch (m) {
        console.error("Library: Error restoring drawing:", m);
      }
    });
  }, at = (o) => {
    var a, u;
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
    yt(i), (u = (a = e.orderTools) == null ? void 0 : a.onChange) == null || u.call(a, i);
  }, T1 = (o) => {
    var a;
    const i = Math.min(Math.max(((a = M()) == null ? void 0 : a.pricePrecision) ?? 2, 0), 8);
    return o.toLocaleString(void 0, {
      minimumFractionDigits: i,
      maximumFractionDigits: i
    });
  }, He = (o = Date.now()) => {
    var Xe, Je, ut, H0, q0, Y0;
    if (!n || !t || !Ie().countDown) {
      F1(null);
      return;
    }
    n.setStyles({
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
    const i = ((Xe = n.getDataList) == null ? void 0 : Xe.call(n)) ?? [], a = i[i.length - 1], u = Number(a == null ? void 0 : a.close);
    if (!a || !Number.isFinite(u) || u <= 0) {
      F1(null);
      return;
    }
    const m = (Je = n.convertToPixel) == null ? void 0 : Je.call(n, [{
      value: u
    }], {
      paneId: "candle_pane",
      absolute: !0
    }), g = Number((ut = m == null ? void 0 : m[0]) == null ? void 0 : ut.y), f = (H0 = n.getSize) == null ? void 0 : H0.call(n, "candle_pane"), y = (f == null ? void 0 : f.height) ?? t.clientHeight;
    if (!Number.isFinite(g) || g < 0 || g > y) {
      F1(null);
      return;
    }
    const k = Math.min(Math.max(((q0 = M()) == null ? void 0 : q0.pricePrecision) ?? 2, 0), 8), A = u.toLocaleString(void 0, {
      minimumFractionDigits: k,
      maximumFractionDigits: k
    }), P = (Y0 = n.getSize) == null ? void 0 : Y0.call(n, "candle_pane", h1.YAxis), W = P != null && P.width && Number.isFinite(P.width) ? Math.max(74, Math.floor(P.width) - 2) : 96, X = Vt(N()), G = o % X, K = G === 0 ? X : X - G, ee = Number(a.close), he = Number(a.open), Me = n.getStyles().candle.priceMark.last, z = Me.text, ce = Number(z.size) || 12, ae = Number(z.paddingTop) || 2, _e = Number(z.paddingBottom) || 2, Te = Math.min(Number(z.paddingLeft) || 4, 3), We = Math.min(Number(z.paddingRight) || 4, 3), Ge = Math.max(34, ce * 2 + ae + _e + 6), n1 = Math.max(0, Math.min(g - Ge / 2, y - Ge));
    F1({
      top: n1,
      width: Math.min(W, Math.max(62, A.length * (ce * 0.56) + Te + We + 4)),
      priceText: A,
      text: Km(K),
      color: Number.isFinite(ee) && Number.isFinite(he) && ee < he ? Me.downColor : Me.upColor,
      textSize: ce,
      textFamily: z.family,
      textWeight: z.weight,
      paddingLeft: Te,
      paddingRight: We,
      paddingTop: ae,
      paddingBottom: _e,
      borderRadius: Number(z.borderRadius) || 2
    });
  }, wt = (o) => {
    var a, u;
    const i = Number(o == null ? void 0 : o.y);
    if (!Number.isFinite(i))
      return NaN;
    try {
      const m = n == null ? void 0 : n.convertFromPixel([{
        x: (o == null ? void 0 : o.x) ?? 0,
        y: i
      }], {
        paneId: "candle_pane"
      }), g = Number((a = m == null ? void 0 : m[0]) == null ? void 0 : a.value);
      if (Number.isFinite(g) && g > 0)
        return g;
    } catch {
    }
    try {
      const m = n == null ? void 0 : n.convertFromPixel([{
        x: (o == null ? void 0 : o.x) ?? 0,
        y: i
      }], {
        paneId: "candle_pane",
        absolute: !0
      }), g = Number((u = m == null ? void 0 : m[0]) == null ? void 0 : u.value);
      if (Number.isFinite(g) && g > 0)
        return g;
    } catch {
    }
    return NaN;
  }, st = (o) => {
    var g;
    if (!Ie().quickOrderPlusButton || (o == null ? void 0 : o.paneId) !== "candle_pane" || !t) {
      if (vt() || w1())
        return;
      L1(null), e1(!1);
      return;
    }
    const i = (g = n == null ? void 0 : n.getSize) == null ? void 0 : g.call(n, "candle_pane", h1.YAxis);
    i != null && i.width && Number.isFinite(i.width) && et(Math.max(44, Math.ceil(i.width)));
    const a = Number(o.y), u = wt(o), m = t.clientHeight;
    if (!Number.isFinite(a) || !Number.isFinite(u) || u <= 0 || a < 0 || a > m) {
      if (vt() || w1())
        return;
      L1(null), e1(!1);
      return;
    }
    ot = {
      ...o
    }, L1({
      y: a,
      price: u
    });
  }, C1 = () => {
    var o;
    if (ot)
      try {
        (o = n == null ? void 0 : n.executeAction) == null || o.call(n, S1.OnCrosshairChange, ot);
      } catch {
      }
  }, z1 = (o) => {
    var a, u;
    const i = y1() ?? B1();
    i && ((u = (a = e.orderTools) == null ? void 0 : a.onQuickOrderAction) == null || u.call(a, {
      action: o,
      price: i.price,
      symbol: M()
    }), e1(!1), A1(null), Ve(!1));
  }, hn = async () => {
    var i;
    const o = y1() ?? B1();
    if (o) {
      try {
        await ((i = navigator.clipboard) == null ? void 0 : i.writeText(String(o.price)));
      } catch {
      }
      e1(!1), A1(null), Ve(!1);
    }
  }, fn = () => {
    const o = y1() ?? B1();
    o && (n == null || n.createOverlay(b1({
      name: "horizontalStraightLine",
      points: [{
        value: o.price
      }],
      lock: !1
    })), e1(!1), A1(null), Ve(!1));
  }, At = (o) => {
    var y, k, A, P, W, X;
    const i = (k = (y = t == null ? void 0 : t.parentElement) == null ? void 0 : y.getBoundingClientRect) == null ? void 0 : k.call(y), a = (A = t == null ? void 0 : t.getBoundingClientRect) == null ? void 0 : A.call(t), u = o == null ? void 0 : o.overlay, m = (P = u == null ? void 0 : u.points) == null ? void 0 : P[0];
    let g = 72, f = 40;
    if (i) {
      if (Number.isFinite(o == null ? void 0 : o.pageX) ? g = o.pageX - i.left : Number.isFinite(o == null ? void 0 : o.x) && a && (g = a.left - i.left + o.x), Number.isFinite(o == null ? void 0 : o.pageY))
        f = o.pageY - i.top;
      else if (Number.isFinite(o == null ? void 0 : o.y) && a)
        f = a.top - i.top + o.y;
      else if (Number.isFinite(m == null ? void 0 : m.value))
        try {
          const G = (W = n == null ? void 0 : n.convertToPixel) == null ? void 0 : W.call(n, [{
            value: m.value
          }], {
            paneId: "candle_pane",
            absolute: !0
          }), K = Number((X = G == null ? void 0 : G[0]) == null ? void 0 : X.y);
          Number.isFinite(K) && (f = K - i.top);
        } catch {
        }
    }
    return {
      x: Math.max(12, Math.min(g - 28, ((i == null ? void 0 : i.width) ?? 360) - 320)),
      y: Math.max(8, f - 52)
    };
  }, lt = (o) => {
    var y, k, A, P, W, X, G, K;
    const i = o == null ? void 0 : o.overlay;
    if (!(i != null && i.id) || i.name !== "horizontalStraightLine")
      return !1;
    const a = At(o), u = Number((k = (y = i.styles) == null ? void 0 : y.line) == null ? void 0 : k.size) || 3, m = ((P = (A = i.styles) == null ? void 0 : A.line) == null ? void 0 : P.style) ?? d1.Solid, g = Array.isArray((X = (W = i.styles) == null ? void 0 : W.line) == null ? void 0 : X.dashedValue) ? i.styles.line.dashedValue : [], f = ((K = (G = i.styles) == null ? void 0 : G.line) == null ? void 0 : K.color) ?? "#2f6df6";
    return ze({
      id: i.id,
      x: a.x,
      y: a.y,
      lineSize: u,
      lineStyle: m,
      dashedValue: g,
      color: f,
      locked: i.lock ?? !1,
      visible: i.visible ?? !0
    }), !1;
  }, Mt = (o) => {
    var a, u;
    const i = (a = o == null ? void 0 : o.overlay) == null ? void 0 : a.id;
    return (!i || ((u = Re()) == null ? void 0 : u.id) === i) && (ze(null), Qe(null)), !1;
  }, b1 = (o) => {
    var f, y, k, A, P, W, X, G, K;
    if (o.name !== "horizontalStraightLine")
      return o;
    const i = o.onClick, a = o.onSelected, u = o.onDeselected, m = o.onRemoved, g = o.onPressedMoveEnd;
    return {
      ...o,
      styles: {
        ...o.styles,
        line: {
          ...(f = o.styles) == null ? void 0 : f.line,
          size: Number((k = (y = o.styles) == null ? void 0 : y.line) == null ? void 0 : k.size) || 3,
          style: ((P = (A = o.styles) == null ? void 0 : A.line) == null ? void 0 : P.style) ?? d1.Solid,
          dashedValue: ((X = (W = o.styles) == null ? void 0 : W.line) == null ? void 0 : X.dashedValue) ?? [6, 4],
          color: ((K = (G = o.styles) == null ? void 0 : G.line) == null ? void 0 : K.color) ?? "#2f6df6"
        }
      },
      onClick: (ee) => (lt(ee), (i == null ? void 0 : i(ee)) ?? !1),
      onSelected: (ee) => (lt(ee), (a == null ? void 0 : a(ee)) ?? !1),
      onPressedMoveEnd: (ee) => (lt(ee), (g == null ? void 0 : g(ee)) ?? !1),
      onDeselected: (ee) => (Mt(ee), (u == null ? void 0 : u(ee)) ?? !1),
      onRemoved: (ee) => (Mt(ee), (m == null ? void 0 : m(ee)) ?? !1)
    };
  }, $ = () => {
    var i;
    const o = Re();
    o && ((i = n == null ? void 0 : n.removeOverlay) == null || i.call(n, {
      id: o.id
    }), ze(null), Qe(null));
  }, S = (o) => {
    var a;
    const i = Re();
    i && ((a = n == null ? void 0 : n.overrideOverlay) == null || a.call(n, {
      id: i.id,
      ...o
    }), setTimeout(() => {
      l1(i.id), M1();
    }, 0));
  }, De = () => {
    const o = Re();
    if (!o)
      return;
    const i = !o.locked;
    S({
      lock: i
    }), ze({
      ...o,
      locked: i
    });
  }, Be = () => {
    const o = Re();
    if (!o)
      return;
    const i = !o.visible;
    S({
      visible: i
    }), ze({
      ...o,
      visible: i
    });
  }, t1 = (o) => {
    const i = Re();
    i && (S({
      styles: {
        line: {
          size: o
        }
      }
    }), ze({
      ...i,
      lineSize: o
    }), Qe(null));
  }, u1 = (o, i) => {
    const a = Re();
    a && (S({
      styles: {
        line: {
          style: o,
          dashedValue: i
        }
      }
    }), ze({
      ...a,
      lineStyle: o,
      dashedValue: i
    }), Qe(null));
  }, Tt = () => {
    const o = Re();
    if (!o)
      return;
    const i = 1, a = d1.Solid, u = [6, 4], m = "#2f6df6";
    S({
      styles: {
        line: {
          size: i,
          style: a,
          dashedValue: u,
          color: m
        }
      }
    }), ze({
      ...o,
      lineSize: i,
      lineStyle: a,
      dashedValue: u,
      color: m
    }), Qe(null);
  }, St = (o) => {
    const i = Re();
    i && (S({
      styles: {
        line: {
          color: o
        }
      }
    }), ze({
      ...i,
      color: o
    }));
  }, Pt = (o) => {
    var A, P;
    const i = Re();
    if (!i || !t)
      return;
    o.preventDefault(), o.stopPropagation(), Qe(null);
    const a = (P = (A = t.parentElement) == null ? void 0 : A.getBoundingClientRect) == null ? void 0 : P.call(A);
    if (!a)
      return;
    const u = o.clientX, m = o.clientY, g = i.x, f = i.y, y = (W) => {
      W.preventDefault();
      const X = g + W.clientX - u, G = f + W.clientY - m;
      ze({
        ...i,
        x: Math.max(8, Math.min(X, a.width - 320)),
        y: Math.max(8, Math.min(G, a.height - 48))
      });
    }, k = () => {
      document.removeEventListener("mousemove", y), document.removeEventListener("mouseup", k);
    };
    document.addEventListener("mousemove", y), document.addEventListener("mouseup", k);
  }, Dt = () => {
    e1(!1), A1(null), Ve(!1);
  }, qn = (o) => {
    var a, u;
    if (!w1())
      return;
    const i = o.target;
    (a = i == null ? void 0 : i.closest) != null && a.call(i, ".klinecharts-pro-quick-order-marker") || (u = i == null ? void 0 : i.closest) != null && u.call(i, ".klinecharts-pro-quick-order-menu-anchor") || Dt();
  };
  let Yn = (O0 = e.orderTools) == null ? void 0 : O0.quickOrder, Wn = (N0 = e.orderTools) == null ? void 0 : N0.quickOrderFloatingWindow, Gn = (I0 = e.orderTools) == null ? void 0 : I0.quickOrderPlusButton, Xn = (E0 = e.orderTools) == null ? void 0 : E0.openOrders, Jn = (B0 = e.orderTools) == null ? void 0 : B0.openOrdersExtendedPriceLine, e0 = (F0 = e.orderTools) == null ? void 0 : F0.openOrdersDisplay, t0 = (U0 = e.orderTools) == null ? void 0 : U0.positions, n0 = (z0 = e.orderTools) == null ? void 0 : z0.breakevenPrice, r0 = (K0 = e.orderTools) == null ? void 0 : K0.liquidationPrice, o0 = (R0 = e.orderTools) == null ? void 0 : R0.priceLine, i0 = (j0 = e.orderTools) == null ? void 0 : j0.marketPriceLine, a0 = (Q0 = e.orderTools) == null ? void 0 : Q0.countDown, s0 = (Z0 = e.orderTools) == null ? void 0 : Z0.bidAskPrice, l0 = (V0 = e.orderTools) == null ? void 0 : V0.orderHistory;
  Ke(() => {
    var ee, he, Me, z, ce, ae, _e, Te, We, Ge, n1, Xe, Je, ut;
    const o = (ee = e.orderTools) == null ? void 0 : ee.quickOrder, i = (he = e.orderTools) == null ? void 0 : he.quickOrderFloatingWindow, a = (Me = e.orderTools) == null ? void 0 : Me.quickOrderPlusButton, u = (z = e.orderTools) == null ? void 0 : z.openOrders, m = (ce = e.orderTools) == null ? void 0 : ce.openOrdersExtendedPriceLine, g = (ae = e.orderTools) == null ? void 0 : ae.openOrdersDisplay, f = (_e = e.orderTools) == null ? void 0 : _e.positions, y = (Te = e.orderTools) == null ? void 0 : Te.breakevenPrice, k = (We = e.orderTools) == null ? void 0 : We.liquidationPrice, A = (Ge = e.orderTools) == null ? void 0 : Ge.priceLine, P = (n1 = e.orderTools) == null ? void 0 : n1.marketPriceLine, W = (Xe = e.orderTools) == null ? void 0 : Xe.countDown, X = (Je = e.orderTools) == null ? void 0 : Je.bidAskPrice, G = (ut = e.orderTools) == null ? void 0 : ut.orderHistory, K = {};
    typeof o == "boolean" && o !== Yn && (Yn = o, K.quickOrder = o, typeof i != "boolean" && (K.quickOrderFloatingWindow = o), typeof a != "boolean" && (K.quickOrderPlusButton = o)), typeof i == "boolean" && i !== Wn && (Wn = i, K.quickOrderFloatingWindow = i), typeof a == "boolean" && a !== Gn && (Gn = a, K.quickOrderPlusButton = a), typeof u == "boolean" && u !== Xn && (Xn = u, K.openOrders = u), typeof m == "boolean" && m !== Jn && (Jn = m, K.openOrdersExtendedPriceLine = m), g !== void 0 && g !== e0 && (e0 = g, K.openOrdersDisplay = g), typeof f == "boolean" && f !== t0 && (t0 = f, K.positions = f), typeof y == "boolean" && y !== n0 && (n0 = y, K.breakevenPrice = y), typeof k == "boolean" && k !== r0 && (r0 = k, K.liquidationPrice = k), typeof A == "boolean" && A !== o0 && (o0 = A, K.priceLine = A, typeof P != "boolean" && (K.marketPriceLine = A), typeof W != "boolean" && (K.countDown = A), typeof X != "boolean" && (K.bidAskPrice = A)), typeof P == "boolean" && P !== i0 && (i0 = P, K.marketPriceLine = P), typeof W == "boolean" && W !== a0 && (a0 = W, K.countDown = W), typeof X == "boolean" && X !== s0 && (s0 = X, K.bidAskPrice = X), typeof G == "boolean" && G !== l0 && (l0 = G, K.orderHistory = G), Object.keys(K).length > 0 && at(K);
  }), Ke(() => {
    Ie().marketPriceLine, Ie().countDown, N(), M(), n == null || n.setStyles({
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
    }), He();
  }), e.ref({
    setTheme: p,
    getTheme: () => d(),
    setStyles: v,
    getStyles: () => n.getStyles(),
    setLocale: D,
    getLocale: () => L(),
    setTimezone: (o) => {
      se({
        key: o,
        text: Er(e.timezone, L())
      });
    },
    getTimezone: () => te().key,
    setSymbol: q,
    getSymbol: () => M(),
    setPeriod: F,
    getPeriod: () => N(),
    getMainIndicators: () => Y(),
    getSubIndicators: () => me(),
    setMainIndicators: V,
    setSubIndicators: U,
    overrideIndicator: (o, i) => {
      n == null || n.overrideIndicator(o, i);
    },
    createOverlay: (o) => {
      var a;
      const i = (a = n == null ? void 0 : n.createOverlay) == null ? void 0 : a.call(n, b1(o));
      return typeof i == "string" ? i : null;
    },
    removeOverlay: (o) => {
      var i;
      if ((i = n == null ? void 0 : n.removeOverlay) == null || i.call(n, o), o.id) {
        xe.delete(o.id);
        const a = Ee.get(o.id);
        a && (a.checkInterval && clearInterval(a.checkInterval), a.mouseUpHandler && (document.removeEventListener("mouseup", a.mouseUpHandler), document.removeEventListener("touchend", a.mouseUpHandler)), Ee.delete(o.id)), M1();
      }
    },
    removeAllOverlay: () => {
      xe.forEach((o, i) => {
        var u;
        (u = n == null ? void 0 : n.removeOverlay) == null || u.call(n, {
          id: i
        });
        const a = Ee.get(i);
        a && (a.checkInterval && clearInterval(a.checkInterval), a.mouseUpHandler && (document.removeEventListener("mouseup", a.mouseUpHandler), document.removeEventListener("touchend", a.mouseUpHandler)));
      }), xe.clear(), Ee.clear();
    },
    getAllOverlay: () => Array.from(xe.values()),
    getOverlay: (o) => xe.get(o) || null,
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
    setIndicatorModalVisible: R,
    setTimezoneModalVisible: H,
    setSettingModalVisible: $e,
    getOrderToolsState: () => Ie(),
    setOrderToolsState: (o) => {
      at(o);
    },
    dispose: () => {
      t && W0(t);
    },
    resize: () => {
      n && "resize" in n && typeof n.resize == "function" ? n.resize() : console.warn("resize method not available on widget");
    },
    getSettings: () => {
      var a, u, m, g, f, y, k, A, P, W, X, G, K, ee, he, Me;
      if (!n)
        return {};
      const o = n.getStyles(), i = (a = o.candle) == null ? void 0 : a.bar;
      return {
        // Candle settings
        candleType: (u = o.candle) == null ? void 0 : u.type,
        candleBarStyle: i == null ? void 0 : i.style,
        // bar.style might be LineType
        showLastPrice: (f = (g = (m = o.candle) == null ? void 0 : m.priceMark) == null ? void 0 : g.last) == null ? void 0 : f.show,
        showHighestPrice: (A = (k = (y = o.candle) == null ? void 0 : y.priceMark) == null ? void 0 : k.high) == null ? void 0 : A.show,
        showLowestPrice: (X = (W = (P = o.candle) == null ? void 0 : P.priceMark) == null ? void 0 : W.low) == null ? void 0 : X.show,
        // Indicator settings
        showIndicatorLastValue: (K = (G = o.indicator) == null ? void 0 : G.lastValueMark) == null ? void 0 : K.show,
        // Axis settings - yAxis.reverse is boolean according to YAxisStyle interface
        priceAxisType: (ee = o.yAxis) == null ? void 0 : ee.type,
        reverseCoordinate: (he = o.yAxis) == null ? void 0 : he.reverse,
        // Grid settings
        showGrids: (Me = o.grid) == null ? void 0 : Me.show,
        timestamp: Date.now()
      };
    },
    setSettings: (o) => {
      var a, u, m, g, f, y, k, A, P, W, X, G, K, ee;
      if (!n)
        return;
      const i = {};
      if (o.candleType !== void 0 && (i.candle = {
        ...i.candle,
        type: o.candleType
      }), o.candleBarStyle !== void 0) {
        const he = ((a = i.candle) == null ? void 0 : a.bar) || {};
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
          ...(u = i.candle) == null ? void 0 : u.priceMark,
          last: {
            ...(g = (m = i.candle) == null ? void 0 : m.priceMark) == null ? void 0 : g.last,
            show: o.showLastPrice,
            text: {
              ...(k = (y = (f = i.candle) == null ? void 0 : f.priceMark) == null ? void 0 : y.last) == null ? void 0 : k.text,
              show: o.showLastPrice && !Ie().countDown
            }
          }
        }
      }), o.showHighestPrice !== void 0 && (i.candle = {
        ...i.candle,
        priceMark: {
          ...(A = i.candle) == null ? void 0 : A.priceMark,
          high: {
            ...(W = (P = i.candle) == null ? void 0 : P.priceMark) == null ? void 0 : W.high,
            show: o.showHighestPrice
          }
        }
      }), o.showLowestPrice !== void 0 && (i.candle = {
        ...i.candle,
        priceMark: {
          ...(X = i.candle) == null ? void 0 : X.priceMark,
          low: {
            ...(K = (G = i.candle) == null ? void 0 : G.priceMark) == null ? void 0 : K.low,
            show: o.showLowestPrice
          }
        }
      }), o.showIndicatorLastValue !== void 0 && (i.indicator = {
        ...i.indicator,
        lastValueMark: {
          ...(ee = i.indicator) == null ? void 0 : ee.lastValueMark,
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
      }), n.setStyles(i);
    },
    resetSettings: () => {
      var a, u, m, g, f, y, k;
      if (!n)
        return;
      n.getStyles();
      const o = {
        candle: {
          type: H9.CandleSolid,
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
          type: q9.Normal,
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
      }, i = ie();
      if (i) {
        const A = {
          candle: {
            type: (a = i.candle) == null ? void 0 : a.type,
            bar: (u = i.candle) == null ? void 0 : u.bar,
            priceMark: (m = i.candle) == null ? void 0 : m.priceMark
          },
          indicator: {
            lastValueMark: (g = i.indicator) == null ? void 0 : g.lastValueMark
          },
          yAxis: {
            type: (f = i.yAxis) == null ? void 0 : f.type,
            reverse: (y = i.yAxis) == null ? void 0 : y.reverse
          },
          grid: {
            show: (k = i.grid) == null ? void 0 : k.show
          }
        };
        n.setStyles(A);
      } else
        n.setStyles(o);
    },
    // === Drawing Methods ===
    saveDrawings: (o) => {
      const i = Array.from(xe.values());
      i.forEach((a, u) => {
        var f;
        const m = v1(a.type), g = ((f = a.points) == null ? void 0 : f.length) || 0;
        g < m && console.warn(`âš ï¸ ${a.type} ${a.id} has only ${g} point(s), should have ${m}`);
      }), c1.saveDrawings(o, i);
    },
    loadDrawings: (o) => {
      c1.loadDrawings(o).forEach((a, u) => {
        var m;
        try {
          const g = {
            name: a.type,
            points: a.points || [],
            extendData: a.extendData,
            styles: a.styles,
            visible: a.visible ?? !0,
            lock: a.lock ?? !1,
            mode: a.mode ?? vn.Normal
          }, f = n == null ? void 0 : n.createOverlay(g), y = typeof f == "string" ? f : null;
          y && (xe.set(y, {
            ...a,
            id: y
          }), Ee.set(y, {
            monitoring: !1,
            complete: !0,
            lastPointCount: ((m = a.points) == null ? void 0 : m.length) || 0
          }));
        } catch (g) {
          console.error(`   âŒ Error restoring ${a.type}:`, g);
        }
      });
    },
    getDrawings: (o) => c1.loadDrawings(o),
    clearDrawings: (o) => {
      c1.clearDrawings(o);
    },
    // Auto-save on overlay events
    enableAutoSave: (o, i = !0) => {
    }
  });
  const c0 = () => {
    n == null || n.resize(), He(), m0(), $1();
  };
  let Ot, Nt, It, ct = !1, u0 = 0;
  const w9 = () => {
    if (ct || Date.now() < u0)
      return;
    const o = we();
    if (!o.enabled || o.anchorPoint === "date")
      return;
    const i = y0(o.anchorPoint, o.timestamp);
    Number.isFinite(i) && i !== o.timestamp && de({
      ...o,
      timestamp: i
    });
  }, A9 = () => {
    It && window.clearTimeout(It), It = window.setTimeout(() => {
      It = void 0, w9();
    }, 80);
  }, d0 = () => {
    He(), m0(), $1(), A9();
  }, h0 = [S1.OnVisibleRangeChange, S1.OnZoom, S1.OnScroll], M9 = (o) => {
    const i = new Date(o), a = i.getFullYear(), u = `${i.getMonth() + 1}`.padStart(2, "0"), m = `${i.getDate()}`.padStart(2, "0"), g = `${i.getHours()}`.padStart(2, "0"), f = `${i.getMinutes()}`.padStart(2, "0");
    return `${a}/${u}/${m} ${g}:${f}`;
  }, T9 = (o) => {
    var f;
    const i = ((f = n == null ? void 0 : n.getDataList) == null ? void 0 : f.call(n)) ?? [];
    if (i.length === 0)
      return null;
    let a = i[0], u = 0, m = Number(a == null ? void 0 : a.timestamp), g = Math.abs(m - o);
    for (let y = 1; y < i.length; y += 1) {
      const k = i[y], A = Number(k == null ? void 0 : k.timestamp);
      if (!Number.isFinite(A))
        continue;
      const P = Math.abs(A - o);
      P < g && (a = k, u = y, m = A, g = P);
    }
    return a && Number.isFinite(m) ? {
      candle: a,
      dataIndex: u
    } : null;
  }, S9 = (o) => {
    var a;
    const i = ((a = n == null ? void 0 : n.getDataList) == null ? void 0 : a.call(n)) ?? [];
    if (i.length === 0 || !Number.isFinite(o))
      return null;
    for (let u = 0; u < i.length; u += 1) {
      const m = i[u];
      if (Number(m == null ? void 0 : m.timestamp) === o)
        return {
          candle: m,
          dataIndex: u
        };
    }
    return null;
  }, Et = (o) => {
    var a;
    const i = ((a = n == null ? void 0 : n.getDataList) == null ? void 0 : a.call(n)) ?? [];
    return i.length === 0 || !Number.isFinite(o) || o < 0 ? -1 : Math.max(0, Math.min(i.length - 1, o + 1));
  }, f0 = (o) => {
    var X, G, K;
    if (!n || !t)
      return null;
    const i = T9(o), a = i == null ? void 0 : i.candle, u = Number((a == null ? void 0 : a.timestamp) ?? o), m = Number((a == null ? void 0 : a.high) ?? (a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.open)), g = i ? Et(i.dataIndex) : void 0, f = i && Number.isFinite(m) ? {
      dataIndex: g,
      value: m
    } : {
      timestamp: u
    }, y = (X = n.convertToPixel) == null ? void 0 : X.call(n, [f], {
      paneId: "candle_pane",
      absolute: !0
    }), k = Number((G = y == null ? void 0 : y[0]) == null ? void 0 : G.x), A = Number((K = y == null ? void 0 : y[0]) == null ? void 0 : K.y), P = t.clientWidth, W = t.clientHeight;
    return !Number.isFinite(k) || k < -80 || k > P + 80 ? null : {
      timestamp: u,
      text: M9(u),
      left: Math.max(58, Math.min(k, P - 58)),
      top: Number.isFinite(A) ? Math.max(8, Math.min(A - 42, W - 38)) : 10
    };
  }, m0 = () => {
    const o = nt();
    if (!o || !n || !t)
      return;
    const i = f0(o.timestamp);
    i && Ct(i);
  }, Bt = (o, i = 0) => {
    if (!n || !t)
      return;
    const a = f0(o);
    if (a) {
      Ct(a);
      return;
    }
    i < 6 && (Nt = window.setTimeout(() => Bt(o, i + 1), 80));
  }, mn = (o, i, a) => {
    let u = i, m = u;
    switch (o.timespan) {
      case "minute": {
        u = u - u % (60 * 1e3), m = u - a * o.multiplier * 60 * 1e3;
        break;
      }
      case "hour": {
        u = u - u % (60 * 60 * 1e3), m = u - a * o.multiplier * 60 * 60 * 1e3;
        break;
      }
      case "day": {
        u = u - u % (60 * 60 * 1e3), m = u - a * o.multiplier * 24 * 60 * 60 * 1e3;
        break;
      }
      case "week": {
        const f = new Date(u).getDay(), y = f === 0 ? 6 : f - 1;
        u = u - y * 60 * 60 * 24;
        const k = new Date(u);
        u = (/* @__PURE__ */ new Date(`${k.getFullYear()}-${k.getMonth() + 1}-${k.getDate()}`)).getTime(), m = a * o.multiplier * 7 * 24 * 60 * 60 * 1e3;
        break;
      }
      case "month": {
        const g = new Date(u), f = g.getFullYear(), y = g.getMonth() + 1;
        u = (/* @__PURE__ */ new Date(`${f}-${y}-01`)).getTime(), m = a * o.multiplier * 30 * 24 * 60 * 60 * 1e3;
        const k = new Date(m);
        m = (/* @__PURE__ */ new Date(`${k.getFullYear()}-${k.getMonth() + 1}-01`)).getTime();
        break;
      }
      case "year": {
        const f = new Date(u).getFullYear();
        u = (/* @__PURE__ */ new Date(`${f}-01-01`)).getTime(), m = a * o.multiplier * 365 * 24 * 60 * 60 * 1e3;
        const y = new Date(m);
        m = (/* @__PURE__ */ new Date(`${y.getFullYear()}-01-01`)).getTime();
        break;
      }
    }
    return [m, u];
  }, P9 = (o, i = 500) => {
    const a = Vt(N()), u = Math.max(1, Math.floor(i / 2)) * a;
    return {
      from: o - u,
      to: o + u
    };
  }, D9 = (o, i, a = 600) => {
    const u = Vt(i), m = Math.max(120, a);
    let g = 0.5;
    o.anchorPoint === "left" ? g = 0.12 : o.anchorPoint === "right" && (g = 0.88);
    const f = Math.max(20, Math.floor(m * g)), y = Math.max(20, m - f);
    return {
      from: o.timestamp - f * u,
      to: Math.min(Date.now(), o.timestamp + y * u)
    };
  }, O9 = (o) => {
    const i = new Date(o.from), a = new Date(o.to);
    return {
      from: new Date(i.getFullYear(), i.getMonth(), i.getDate(), 0, 0, 0, 0).getTime(),
      to: new Date(a.getFullYear(), a.getMonth(), a.getDate(), 23, 59, 59, 999).getTime()
    };
  }, N9 = (o, i) => {
    const a = Math.min(i.from, i.to), u = Math.max(i.from, i.to);
    return o.filter((m) => {
      const g = Number(m.timestamp);
      return g >= a && g <= u;
    });
  }, I9 = (o, i) => {
    var u;
    const a = Math.max(i.from, i.to);
    for (let m = o.length - 1; m >= 0; m -= 1) {
      const g = Number((u = o[m]) == null ? void 0 : u.timestamp);
      if (Number.isFinite(g) && g <= a)
        return g;
    }
    return a;
  }, E9 = (o, i) => {
    var u;
    const a = Math.max(i.from, i.to);
    for (let m = o.length - 1; m >= 0; m -= 1) {
      const g = Number((u = o[m]) == null ? void 0 : u.timestamp);
      if (Number.isFinite(g) && g <= a)
        return m;
    }
    return o.length - 1;
  }, B9 = (o, i) => {
    const a = Vt(i), u = Math.abs(o.to - o.from), m = Math.max(1, Math.ceil(u / a) + 1), g = Math.max(m, 120) * a;
    return {
      from: o.from,
      to: Math.max(o.to, Math.min(Date.now(), o.to + g))
    };
  }, F9 = (o) => {
    var g, f;
    if (!n || !t || o.length === 0)
      return;
    const i = ((g = n.getSize("candle_pane", h1.YAxis)) == null ? void 0 : g.width) ?? 0, a = ((f = n.getSize("candle_pane", h1.Main)) == null ? void 0 : f.width) ?? t.clientWidth - i, u = Math.max(1, a - 8), m = Math.max(2, u / Math.max(1, o.length));
    n.setOffsetRightDistance(0), n.setLeftMinVisibleBarCount(0), n.setRightMinVisibleBarCount(0), n.setBarSpace(m);
  }, gn = (o) => {
    var i;
    !n || !Number.isFinite(o) || ((i = n.scrollToTimestamp) == null || i.call(n, o, 250), requestAnimationFrame(() => Bt(o)), He());
  }, g0 = (o, i = "floor") => {
    var g, f, y;
    const a = ((g = n == null ? void 0 : n.getDataList) == null ? void 0 : g.call(n)) ?? [];
    if (a.length === 0 || !Number.isFinite(o))
      return -1;
    if (i === "floor")
      for (let k = a.length - 1; k >= 0; k -= 1) {
        const A = Number((f = a[k]) == null ? void 0 : f.timestamp);
        if (Number.isFinite(A) && A <= o)
          return k;
      }
    let u = 0, m = 1 / 0;
    for (let k = 0; k < a.length; k += 1) {
      const A = Number((y = a[k]) == null ? void 0 : y.timestamp);
      if (!Number.isFinite(A))
        continue;
      const P = Math.abs(A - o);
      (P < m || P === m && A > o) && (m = P, u = k);
    }
    return m === 1 / 0 ? -1 : u;
  }, yn = (o) => {
    var k, A, P;
    if (!n || !t)
      return null;
    const i = (k = n.getDom) == null ? void 0 : k.call(n, "candle_pane", h1.Main), a = (A = i == null ? void 0 : i.getBoundingClientRect) == null ? void 0 : A.call(i), u = (P = r == null ? void 0 : r.getBoundingClientRect) == null ? void 0 : P.call(r), m = t.getBoundingClientRect(), g = a && Number.isFinite(a.left) ? a.left - ((u == null ? void 0 : u.left) ?? m.left) : m.left - ((u == null ? void 0 : u.left) ?? m.left), f = n.getSize("candle_pane", h1.Main), y = (a == null ? void 0 : a.width) ?? (f == null ? void 0 : f.width) ?? t.clientWidth;
    return o === "left" ? Math.max(8, g) : o === "center" ? g + y / 2 : o === "right" ? g + y : null;
  }, y0 = (o, i) => {
    var A, P, W, X, G, K;
    const a = yn(o), u = ((A = n == null ? void 0 : n.getDataList) == null ? void 0 : A.call(n)) ?? [];
    if (!n || a === null || u.length === 0)
      return i;
    const m = (P = n.convertFromPixel) == null ? void 0 : P.call(n, [{
      x: a,
      y: 0
    }], {
      paneId: "candle_pane",
      absolute: !0
    }), g = Number((W = m == null ? void 0 : m[0]) == null ? void 0 : W.dataIndex), f = Math.max(0, Math.min(u.length - 1, Number.isFinite(g) ? Math.round(g) : -1)), y = S9(i);
    if (y) {
      const ee = Et(y.dataIndex), he = (X = n.convertToPixel) == null ? void 0 : X.call(n, [{
        dataIndex: ee
      }], {
        paneId: "candle_pane",
        absolute: !0
      }), Me = Number((G = he == null ? void 0 : he[0]) == null ? void 0 : G.x), z = n.getBarSpace, ce = typeof z == "function" ? z.call(n) : void 0, ae = Number(typeof ce == "object" ? ce == null ? void 0 : ce.bar : ce), _e = Number.isFinite(ae) ? Math.max(2, ae / 2) : 8;
      if (Number.isFinite(Me) && Math.abs(Me - a) <= _e)
        return i;
    }
    const k = Number((K = u[f]) == null ? void 0 : K.timestamp);
    return Number.isFinite(k) ? k : i;
  }, v0 = (o) => {
    if (!n || !Number.isFinite(o.timestamp))
      return;
    if (ct = !0, u0 = Date.now() + 1e3, o.anchorPoint === "date") {
      gn(o.timestamp), window.setTimeout(() => {
        ct = !1;
      }, 1e3);
      return;
    }
    const i = g0(o.timestamp, "nearest"), a = Et(i), u = yn(o.anchorPoint);
    if (a < 0 || u === null) {
      gn(o.timestamp), window.setTimeout(() => {
        ct = !1;
      }, 1e3);
      return;
    }
    n.scrollToDataIndex(a, 0), requestAnimationFrame(() => {
      var f, y;
      const m = (f = n == null ? void 0 : n.convertToPixel) == null ? void 0 : f.call(n, [{
        dataIndex: a
      }], {
        paneId: "candle_pane",
        absolute: !0
      }), g = Number((y = m == null ? void 0 : m[0]) == null ? void 0 : y.x);
      Number.isFinite(g) && (n == null || n.scrollByDistance(u - g, 0)), requestAnimationFrame(() => {
        $1(o), Bt(o.timestamp), window.setTimeout(() => {
          ct = !1;
        }, 1e3);
      });
    }), He();
  }, U9 = (o) => {
    var f, y;
    if (!n || !t)
      return null;
    const i = yn(o.anchorPoint);
    if (i !== null)
      return i;
    const a = Et(g0(o.timestamp, "nearest")), u = a >= 0 ? {
      dataIndex: a
    } : {
      timestamp: o.timestamp
    }, m = (f = n.convertToPixel) == null ? void 0 : f.call(n, [u], {
      paneId: "candle_pane",
      absolute: !0
    }), g = Number((y = m == null ? void 0 : m[0]) == null ? void 0 : y.x);
    return !Number.isFinite(g) || g < -2 || g > t.clientWidth + 2 ? null : g;
  }, $1 = (o) => {
    const i = o ?? we();
    if (!n || !i.enabled || !i.anchorLine) {
      rt(null);
      return;
    }
    const a = U9(i), u = n.getSize("candle_pane", h1.Main), m = Math.max(1, (t == null ? void 0 : t.clientHeight) ?? (u == null ? void 0 : u.height) ?? 0);
    if (a === null) {
      rt(null);
      return;
    }
    rt({
      left: a,
      top: 0,
      height: m
    });
  }, p0 = async (o, i) => {
    if (n) {
      h(!0), ge(!0);
      try {
        const a = N(), u = o.from <= o.to ? o : {
          from: o.to,
          to: o.from
        }, m = O9(u), g = i ? m : B9(m, a), f = await e.datafeed.getHistoryKLineData(M(), a, g.from, g.to), y = N9(f, m);
        n.applyNewData(f, f.length > 0), be(m), requestAnimationFrame(() => {
          const k = E9(f, m);
          i ? gn(i) : (F9(y), n == null || n.scrollToDataIndex(k, 0), Bt(I9(y, m))), $1();
        });
      } finally {
        h(!1), ge(!1);
      }
    }
  }, z9 = async (o) => {
    O(o), await p0(P9(o), o);
  }, K9 = (o) => {
    const a = {
      ...o,
      timestamp: (() => !n || o.anchorPoint === "date" ? o.timestamp : y0(o.anchorPoint, o.timestamp))()
    };
    de(a), a.enabled ? (O(a.timestamp), requestAnimationFrame(() => {
      v0(a), $1(a);
    })) : requestAnimationFrame(() => $1(a));
  };
  In(() => {
    if (window.addEventListener("resize", c0), n = V9(t, {
      customApi: {
        formatDate: (f, y, k, A) => {
          switch (N().timespan) {
            case "minute":
              return A === Ut.XAxis ? fe.formatDate(f, y, "HH:mm") : fe.formatDate(f, y, "YYYY-MM-DD HH:mm");
            case "hour":
              return A === Ut.XAxis ? fe.formatDate(f, y, "MM-DD HH:mm") : fe.formatDate(f, y, "YYYY-MM-DD HH:mm");
            case "day":
            case "week":
              return fe.formatDate(f, y, "YYYY-MM-DD");
            case "month":
              return A === Ut.XAxis ? fe.formatDate(f, y, "YYYY-MM") : fe.formatDate(f, y, "YYYY-MM-DD");
            case "year":
              return A === Ut.XAxis ? fe.formatDate(f, y, "YYYY") : fe.formatDate(f, y, "YYYY-MM-DD");
          }
          return fe.formatDate(f, y, "YYYY-MM-DD HH:mm");
        }
      }
    }), n) {
      const f = n.getDom("candle_pane", h1.Main);
      if (f) {
        let k = document.createElement("div");
        if (k.className = "klinecharts-pro-watermark", fe.isString(e.watermark)) {
          const A = e.watermark.replace(/(^\s*)|(\s*$)/g, "");
          k.innerHTML = A;
        } else
          k.appendChild(e.watermark);
        f.appendChild(k);
      }
      const y = n.getDom("candle_pane", h1.YAxis);
      s = document.createElement("span"), s.className = "klinecharts-pro-price-unit", y == null || y.appendChild(s);
    }
    let o = !1;
    const i = () => {
      const f = M();
      if (f != null && f.ticker)
        try {
          const y = Array.from(xe.values());
          c1.saveDrawings(f.ticker, y);
        } catch (y) {
          console.error("âŒ Error refreshing local storage:", y);
        }
    }, a = (f) => {
      o || (o = !0, f.preventDefault());
    };
    setTimeout(() => {
      t && t.addEventListener("contextmenu", a);
    }, 1e3), document.addEventListener("contextmenu", (f) => {
      t && t.contains(f.target) && a(f);
    });
    const u = n == null ? void 0 : n.removeOverlay;
    n && u && (n.removeOverlay = function(...f) {
      const y = u.apply(this, f), k = f[0];
      let A;
      if (typeof k == "string" ? A = k : k && typeof k == "object" && k.id && (A = k.id), A) {
        xe.delete(A);
        const P = Ee.get(A);
        P && (P.checkInterval && clearInterval(P.checkInterval), P.mouseUpHandler && (document.removeEventListener("mouseup", P.mouseUpHandler), document.removeEventListener("touchend", P.mouseUpHandler)), Ee.delete(A)), i();
      }
      return y;
    }), Y().forEach((f) => {
      Zt(n, f, !0, {
        id: "candle_pane"
      });
    });
    const m = {};
    e.subIndicators.forEach((f) => {
      const y = Zt(n, f, !0);
      y && (m[f] = y);
    }), U(m), n == null || n.loadMore((f) => {
      h(!0), (async () => {
        try {
          const k = N(), [A] = mn(k, f, 1), [P] = mn(k, A, 500), W = await e.datafeed.getHistoryKLineData(M(), k, P, A);
          n == null || n.applyMoreData(W, W.length > 0);
        } finally {
          h(!1);
        }
      })();
    }), n == null || n.subscribeAction(S1.OnTooltipIconClick, (f) => {
      if (f.indicatorName)
        switch (f.iconId) {
          case "visible": {
            n == null || n.overrideIndicator({
              name: f.indicatorName,
              visible: !0
            }, f.paneId);
            const y = f.paneId === "candle_pane" ? "main" : "sub";
            Ye(f.indicatorName, f.paneId, y, "change");
            break;
          }
          case "invisible": {
            n == null || n.overrideIndicator({
              name: f.indicatorName,
              visible: !1
            }, f.paneId);
            const y = f.paneId === "candle_pane" ? "main" : "sub";
            Ye(f.indicatorName, f.paneId, y, "change");
            break;
          }
          case "setting": {
            const y = n == null ? void 0 : n.getIndicatorByPaneId(f.paneId, f.indicatorName);
            _t({
              visible: !0,
              indicatorName: f.indicatorName,
              paneId: f.paneId,
              calcParams: y.calcParams
            });
            break;
          }
          case "close":
            if (f.paneId === "candle_pane") {
              const y = [...Y()];
              n == null || n.removeIndicator("candle_pane", f.indicatorName), y.splice(y.indexOf(f.indicatorName), 1), V(y), Ye(f.indicatorName, "candle_pane", "main", "remove");
            } else {
              const y = {
                ...me()
              };
              n == null || n.removeIndicator(f.paneId, f.indicatorName), delete y[f.indicatorName], U(y), Ye(f.indicatorName, f.paneId, "sub", "remove");
            }
        }
    }), n == null || n.subscribeAction(S1.OnCrosshairChange, st), h0.forEach((f) => {
      n == null || n.subscribeAction(f, d0);
    }), Ot = window.setInterval(() => He(), 1e3), He(), document.addEventListener("mousedown", qn);
    const g = n == null ? void 0 : n.createOverlay;
    n && g && (n.createOverlay = function(...f) {
      const y = b1(f[0]), k = g.apply(this, [y, ...f.slice(1)]), A = typeof k == "string" ? k : null;
      return A && (it(A, y.name || "unknown"), l1(A), M1()), k;
    });
  }), N1(() => {
    window.removeEventListener("resize", c0), n == null || n.unsubscribeAction(S1.OnCrosshairChange, st), h0.forEach((o) => {
      n == null || n.unsubscribeAction(o, d0);
    }), Ot && (window.clearInterval(Ot), Ot = void 0), Nt && (window.clearTimeout(Nt), Nt = void 0), document.removeEventListener("mousedown", qn), Ee.clear(), xe.clear(), W0(t);
  }), Ke(() => {
    const o = M();
    o != null && o.priceCurrency ? (s.innerHTML = o == null ? void 0 : o.priceCurrency.toLocaleUpperCase(), s.style.display = "flex") : s.style.display = "none", n == null || n.setPriceVolumePrecision((o == null ? void 0 : o.pricePrecision) ?? 2, (o == null ? void 0 : o.volumePrecision) ?? 0);
  });
  const R9 = (o) => {
    const i = new Date(o), a = i.getFullYear(), u = `${i.getMonth() + 1}`.padStart(2, "0"), m = `${i.getDate()}`.padStart(2, "0"), g = `${i.getHours()}`.padStart(2, "0"), f = `${i.getMinutes()}`.padStart(2, "0"), y = `${a}-${u}-${m}`;
    switch (N().timespan) {
      case "minute":
      case "hour":
        return `${y} ${g}:${f}`;
      case "day":
      case "week":
        return y;
      case "month":
        return y;
      case "year":
        return y;
    }
    return `${y} ${g}:${f}`;
  }, j9 = (o, i) => {
    var k, A;
    const {
      current: a
    } = o, u = i.tooltip.text.color, m = a.close > a.open ? i.bar.upColor : a.close < a.open ? i.bar.downColor : i.bar.noChangeColor, g = Math.min(Math.max(((k = M()) == null ? void 0 : k.pricePrecision) ?? 2, 0), 8), f = Math.min(Math.max(((A = M()) == null ? void 0 : A.volumePrecision) ?? 0, 0), 8), y = (P) => ({
      text: fe.formatPrecision(P, g),
      color: m
    });
    return [{
      title: "time",
      value: {
        text: R9(a.timestamp),
        color: u
      }
    }, {
      title: "open",
      value: y(a.open)
    }, {
      title: "high",
      value: y(a.high)
    }, {
      title: "low",
      value: y(a.low)
    }, {
      title: "close",
      value: y(a.close)
    }, {
      title: "volume",
      value: {
        text: fe.formatBigNumber(fe.formatPrecision(a.volume ?? i.tooltip.defaultValue, f)),
        color: m
      }
    }];
  }, Ft = () => {
    n == null || n.setStyles({
      candle: {
        tooltip: {
          custom: j9,
          rect: {
            offsetLeft: 0,
            paddingLeft: 0
          }
        }
      }
    });
  };
  return Ke((o) => {
    const i = M(), a = N();
    let u = !0;
    return N1(() => {
      u = !1;
    }), o && e.datafeed.unsubscribe(o.symbol, o.period), h(!0), ge(!0), (async () => {
      try {
        const g = o1(we), f = g.enabled && (!o || o.symbol.ticker === i.ticker || g.acrossTokens), y = f ? D9(g, a) : null, [k, A] = y ? [y.from, y.to] : mn(a, (/* @__PURE__ */ new Date()).getTime(), 500), P = await e.datafeed.getHistoryKLineData(i, a, k, A);
        if (!u)
          return;
        n == null || n.applyNewData(P, P.length > 0), f ? requestAnimationFrame(() => {
          v0(g), $1(g);
        }) : $1(), He(), setTimeout(() => {
          u && (Lt(i == null ? void 0 : i.ticker), He());
        }, 0), e.datafeed.subscribe(i, a, (W) => {
          n == null || n.updateData(W), He();
        });
      } finally {
        u && (h(!1), ge(!1));
      }
    })(), {
      symbol: i,
      period: a
    };
  }), Ke(() => {
    const o = d();
    n == null || n.setStyles(o);
    const i = o === "dark" ? "#929AA5" : "#76808F";
    Ft(), n == null || n.setStyles({
      indicator: {
        tooltip: {
          icons: [{
            id: "visible",
            position: zt.Middle,
            marginLeft: I().visibleMarginLeft,
            marginTop: I().marginTop,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: I().size,
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "invisible",
            position: zt.Middle,
            marginLeft: I().secondaryMarginLeft,
            marginTop: I().marginTop,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: I().size,
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "setting",
            position: zt.Middle,
            marginLeft: I().secondaryMarginLeft,
            marginTop: I().marginTop,
            marginBottom: 0,
            marginRight: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: I().size,
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "close",
            position: zt.Middle,
            marginLeft: I().secondaryMarginLeft,
            marginTop: I().marginTop,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: I().size,
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }]
        }
      }
    });
  }), Ke(() => {
    n == null || n.setLocale(L());
  }), Ke(() => {
    n == null || n.setTimezone(te().key);
  }), Ke(() => {
    x() && (n == null || n.setStyles(x()), Ft(), Ue(rl(n.getStyles())));
  }), [wm.cloneNode(!0), w(hh, {
    get locale() {
      return e.locale;
    },
    get symbol() {
      return M();
    },
    get spread() {
      return Ae();
    },
    get period() {
      return N();
    },
    get periods() {
      return e.periods;
    },
    onMenuClick: async () => {
      try {
        await p5(() => _(!Ae())), n == null || n.resize();
      } catch {
      }
    },
    onSymbolClick: () => {
      Pe(!le());
    },
    get onMobilePeriodClick() {
      return e.onMobilePeriodClick;
    },
    onMobileMoreClick: () => {
      e.onMobileMoreClick ? e.onMobileMoreClick() : s1(!0);
    },
    onPeriodChange: F,
    onTimeToolsClick: () => {
      O(Date.now()), ue(!0);
    },
    onIndicatorClick: () => {
      R((o) => !o);
    },
    onTimezoneClick: () => {
      H((o) => !o);
    },
    onSettingClick: () => {
      $e((o) => !o);
    },
    onScreenshotClick: () => {
      if (n) {
        const o = e.screenshotBackgroundColor || (e.theme === "dark" ? "#11131E" : "#ffffff"), i = n.getConvertPictureUrl(!0, "jpeg", o);
        ve(i);
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
    onOrderToolsStateChange: at
  }), (() => {
    const o = Am.cloneNode(!0), i = o.firstChild;
    return o.addEventListener("mouseleave", () => {
      L1(null), Ve(!1);
    }), _1((a) => r = a, o), C(o, w(J, {
      get when() {
        return a1();
      },
      get children() {
        return w(_9, {});
      }
    }), i), C(o, w(J, {
      get when() {
        return Ae();
      },
      get children() {
        return w(jf, {
          get locale() {
            return e.locale;
          },
          onDrawingItemClick: (a) => {
            n == null || n.createOverlay(b1(a));
          },
          onModeChange: (a) => {
            n == null || n.overrideOverlay({
              mode: a
            });
          },
          onLockChange: (a) => {
            n == null || n.overrideOverlay({
              lock: a
            });
          },
          onVisibleChange: (a) => {
            n == null || n.overrideOverlay({
              visible: a
            });
          },
          onRemoveClick: (a) => {
            n == null || n.removeOverlay({
              groupId: a
            });
          }
        });
      }
    }), i), _1((a) => t = a, i), C(o, w(J, {
      get when() {
        return bt();
      },
      keyed: !0,
      children: (a) => (() => {
        const u = Mm.cloneNode(!0);
        return B((m) => {
          const g = `${a.left}px`, f = `${a.top}px`, y = `${a.height}px`;
          return g !== m._v$ && u.style.setProperty("left", m._v$ = g), f !== m._v$2 && u.style.setProperty("top", m._v$2 = f), y !== m._v$3 && u.style.setProperty("height", m._v$3 = y), m;
        }, {
          _v$: void 0,
          _v$2: void 0,
          _v$3: void 0
        }), u;
      })()
    }), null), C(o, w(J, {
      get when() {
        return nt();
      },
      keyed: !0,
      children: (a) => (() => {
        const u = Tm.cloneNode(!0);
        return C(u, () => a.text), B((m) => {
          const g = `${a.left}px`, f = `${a.top}px`;
          return g !== m._v$4 && u.style.setProperty("left", m._v$4 = g), f !== m._v$5 && u.style.setProperty("top", m._v$5 = f), m;
        }, {
          _v$4: void 0,
          _v$5: void 0
        }), u;
      })()
    }), null), C(o, w(J, {
      get when() {
        return pt();
      },
      keyed: !0,
      children: (a) => (() => {
        const u = Sm.cloneNode(!0), m = u.firstChild, g = m.nextSibling;
        return u.style.setProperty("right", "0px"), C(m, () => a.priceText), C(g, () => a.text), B((f) => {
          const y = `${a.top}px`, k = `${a.width}px`, A = a.color, P = `${a.borderRadius}px`, W = a.textFamily, X = a.textWeight, G = `${a.paddingLeft}px`, K = `${a.paddingRight}px`, ee = `${a.paddingTop}px`, he = `${a.paddingBottom}px`, Me = `${a.textSize}px`, z = `${Math.max(10, a.textSize - 1)}px`;
          return y !== f._v$6 && u.style.setProperty("top", f._v$6 = y), k !== f._v$7 && u.style.setProperty("width", f._v$7 = k), A !== f._v$8 && u.style.setProperty("background", f._v$8 = A), P !== f._v$9 && u.style.setProperty("border-radius", f._v$9 = P), W !== f._v$10 && u.style.setProperty("font-family", f._v$10 = W), X !== f._v$11 && u.style.setProperty("font-weight", f._v$11 = X), G !== f._v$12 && u.style.setProperty("padding-left", f._v$12 = G), K !== f._v$13 && u.style.setProperty("padding-right", f._v$13 = K), ee !== f._v$14 && u.style.setProperty("padding-top", f._v$14 = ee), he !== f._v$15 && u.style.setProperty("padding-bottom", f._v$15 = he), Me !== f._v$16 && m.style.setProperty("font-size", f._v$16 = Me), z !== f._v$17 && g.style.setProperty("font-size", f._v$17 = z), f;
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
        }), u;
      })()
    }), null), C(o, w(J, {
      get when() {
        return Re();
      },
      keyed: !0,
      children: (a) => (() => {
        const u = Nm.cloneNode(!0), m = u.firstChild, g = m.nextSibling, f = g.nextSibling, y = f.firstChild, k = f.nextSibling, A = k.firstChild, P = A.firstChild, W = P.nextSibling, X = W.firstChild, G = k.nextSibling, K = G.firstChild, ee = G.nextSibling, he = ee.nextSibling, Me = he.nextSibling;
        return u.$$click = (z) => {
          z.stopPropagation();
        }, u.$$mousedown = (z) => {
          z.preventDefault(), z.stopPropagation();
        }, m.$$mousedown = Pt, g.$$click = Tt, y.$$click = () => Qe(je() === "color" ? null : "color"), C(f, w(J, {
          get when() {
            return je() === "color";
          },
          get children() {
            const z = Pm.cloneNode(!0), ce = z.firstChild;
            return C(ce, w(Ln, {
              each: $t,
              children: (ae) => (() => {
                const _e = Im.cloneNode(!0);
                return _e.$$click = () => St(ae), _e.style.setProperty("background", ae), B(() => ne(_e, `overlay-toolbar-color-swatch ${a.color.toLowerCase() === ae.toLowerCase() ? "selected" : ""}`)), _e;
              })()
            })), z;
          }
        }), null), A.$$click = () => Qe(je() === "width" ? null : "width"), C(W, () => a.lineSize, X), C(k, w(J, {
          get when() {
            return je() === "width";
          },
          get children() {
            const z = Dm.cloneNode(!0);
            return C(z, w(Ln, {
              each: [1, 2, 3, 4],
              children: (ce) => (() => {
                const ae = Em.cloneNode(!0), _e = ae.firstChild;
                return ae.$$click = () => t1(ce), _e.style.setProperty("height", `${ce}px`), B(() => ne(ae, a.lineSize === ce ? "selected" : "")), ae;
              })()
            })), z;
          }
        }), null), K.$$click = () => Qe(je() === "style" ? null : "style"), C(G, w(J, {
          get when() {
            return je() === "style";
          },
          get children() {
            const z = Om.cloneNode(!0), ce = z.firstChild, ae = ce.nextSibling, _e = ae.nextSibling;
            return ce.$$click = () => u1(d1.Solid, []), ae.$$click = () => u1(d1.Dashed, [6, 4]), _e.$$click = () => u1(d1.Dashed, [2, 4]), B((Te) => {
              var Xe, Je;
              const We = a.lineStyle === d1.Solid ? "selected" : "", Ge = a.lineStyle === d1.Dashed && ((Xe = a.dashedValue) == null ? void 0 : Xe[0]) === 6 ? "selected" : "", n1 = a.lineStyle === d1.Dashed && ((Je = a.dashedValue) == null ? void 0 : Je[0]) === 2 ? "selected" : "";
              return We !== Te._v$18 && ne(ce, Te._v$18 = We), Ge !== Te._v$19 && ne(ae, Te._v$19 = Ge), n1 !== Te._v$20 && ne(_e, Te._v$20 = n1), Te;
            }, {
              _v$18: void 0,
              _v$19: void 0,
              _v$20: void 0
            }), z;
          }
        }), null), ee.$$click = Be, he.$$click = De, Me.$$click = $, B((z) => {
          const ce = `${a.x}px`, ae = `${a.y}px`, _e = `overlay-toolbar-icon edit ${je() === "color" ? "active" : ""}`, Te = `overlay-toolbar-line-size ${je() === "width" ? "active" : ""}`, We = `overlay-toolbar-icon minus ${je() === "style" ? "active" : ""}`, Ge = `overlay-toolbar-icon visibility ${a.visible ? "" : "muted"}`, n1 = a.visible ? "Hide" : "Show", Xe = `overlay-toolbar-icon lock ${a.locked ? "active" : ""}`, Je = a.locked ? "Unlock" : "Lock";
          return ce !== z._v$21 && u.style.setProperty("left", z._v$21 = ce), ae !== z._v$22 && u.style.setProperty("top", z._v$22 = ae), _e !== z._v$23 && ne(y, z._v$23 = _e), Te !== z._v$24 && ne(A, z._v$24 = Te), We !== z._v$25 && ne(K, z._v$25 = We), Ge !== z._v$26 && ne(ee, z._v$26 = Ge), n1 !== z._v$27 && Oe(ee, "title", z._v$27 = n1), Xe !== z._v$28 && ne(he, z._v$28 = Xe), Je !== z._v$29 && Oe(he, "title", z._v$29 = Je), z;
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
        }), u;
      })()
    }), null), C(o, w(J, {
      get when() {
        return B1();
      },
      keyed: !0,
      children: (a) => (() => {
        const u = Bm.cloneNode(!0), m = u.firstChild;
        return u.addEventListener("mouseleave", () => {
          w1() || Ve(!1);
        }), u.$$mousemove = (g) => {
          g.stopPropagation(), C1();
        }, u.addEventListener("mouseenter", () => {
          Ve(!0), C1();
        }), m.$$click = (g) => {
          g.stopPropagation(), Ve(!0), A1({
            y: a.y,
            price: a.price,
            yAxisWidth: J1()
          }), e1(!0), C1();
        }, m.$$mousedown = (g) => {
          g.preventDefault(), g.stopPropagation(), C1();
        }, C(m, (() => {
          const g = j(() => {
            var f;
            return !!((f = e.orderTools) != null && f.quickOrderPlusIcon);
          });
          return () => g() ? (() => {
            const f = Fm.cloneNode(!0);
            return B(() => f.innerHTML = e.orderTools.quickOrderPlusIcon), f;
          })() : Um.cloneNode(!0);
        })()), B((g) => {
          const f = `${Math.max(0, a.y - 12)}px`, y = `${J1()}px`, k = Ie().quickOrderPlusButton ? "block" : "none";
          return f !== g._v$30 && u.style.setProperty("top", g._v$30 = f), y !== g._v$31 && u.style.setProperty("right", g._v$31 = y), k !== g._v$32 && u.style.setProperty("display", g._v$32 = k), g;
        }, {
          _v$30: void 0,
          _v$31: void 0,
          _v$32: void 0
        }), u;
      })()
    }), null), C(o, w(J, {
      get when() {
        return j(() => !!w1())() && y1();
      },
      keyed: !0,
      children: (a) => (() => {
        const u = zm.cloneNode(!0), m = u.firstChild, g = m.firstChild, f = g.firstChild, y = f.nextSibling, k = y.nextSibling, A = k.nextSibling;
        A.nextSibling;
        const P = g.nextSibling, W = P.firstChild, X = W.nextSibling, G = X.nextSibling, K = G.nextSibling;
        K.nextSibling;
        const ee = P.nextSibling, he = ee.nextSibling, Me = he.firstChild, z = Me.nextSibling;
        z.nextSibling;
        const ce = he.nextSibling;
        return ce.firstChild, u.addEventListener("mouseleave", () => Ve(!1)), u.addEventListener("mouseenter", () => Ve(!0)), m.$$mousemove = () => {
          C1();
        }, m.$$mousedown = (ae) => {
          ae.preventDefault(), ae.stopPropagation(), C1();
        }, g.$$click = () => z1("limit"), C(g, () => M().shortName ?? M().name ?? M().ticker, y), C(g, () => T1(a.price), A), P.$$click = () => z1("stop"), C(P, () => M().shortName ?? M().name ?? M().ticker, X), C(P, () => T1(a.price), K), ee.$$click = () => z1("create"), he.$$click = hn, C(he, () => T1(a.price), z), ce.$$click = fn, C(ce, () => T1(a.price), null), B((ae) => {
          const _e = `${Math.max(0, a.y + 24)}px`, Te = `${a.yAxisWidth + tt}px`;
          return _e !== ae._v$33 && u.style.setProperty("top", ae._v$33 = _e), Te !== ae._v$34 && u.style.setProperty("right", ae._v$34 = Te), ae;
        }, {
          _v$33: void 0,
          _v$34: void 0
        }), u;
      })()
    }), null), B(() => Oe(i, "data-drawing-bar-visible", Ae())), o;
  })(), w(J, {
    get when() {
      return le();
    },
    get children() {
      return w(im, {
        get locale() {
          return e.locale;
        },
        get datafeed() {
          return e.datafeed;
        },
        onSymbolSelected: (o) => {
          q(o);
        },
        onClose: () => {
          Pe(!1);
        }
      });
    }
  }), w(J, {
    get when() {
      return re();
    },
    get children() {
      return w(Qf, {
        get locale() {
          return e.locale;
        },
        get mainIndicators() {
          return Y();
        },
        get subIndicators() {
          return me();
        },
        onClose: () => {
          R(!1);
        },
        onMainIndicatorChange: (o) => {
          const i = [...Y()];
          o.added ? (Zt(n, o.name, !0, {
            id: "candle_pane"
          }), i.push(o.name), Ye(o.name, "candle_pane", "main", "add")) : (n == null || n.removeIndicator("candle_pane", o.name), i.splice(i.indexOf(o.name), 1), Ye(o.name, "candle_pane", "main", "remove")), V(i);
        },
        onSubIndicatorChange: (o) => {
          const i = {
            ...me()
          };
          if (o.added) {
            const a = Zt(n, o.name);
            a && (i[o.name] = a, Ye(o.name, a, "sub", "add"));
          } else
            o.paneId && (n == null || n.removeIndicator(o.paneId, o.name), delete i[o.name], Ye(o.name, o.paneId, "sub", "remove"));
          U(i);
        }
      });
    }
  }), w(J, {
    get when() {
      return Q();
    },
    get children() {
      return w(Vf, {
        get locale() {
          return e.locale;
        },
        get timezone() {
          return te();
        },
        onClose: () => {
          H(!1);
        },
        onConfirm: se
      });
    }
  }), w(J, {
    get when() {
      return Le();
    },
    get children() {
      return w(Yf, {
        get locale() {
          return e.locale;
        },
        get currentStyles() {
          return fe.clone(n.getStyles());
        },
        onClose: () => {
          $e(!1);
        },
        onChange: (o) => {
          n == null || n.setStyles(o), Ft();
        },
        onRestoreDefault: (o) => {
          const i = {};
          o.forEach((a) => {
            const u = a.key;
            An(i, u, fe.formatValue(ie(), u));
          }), n == null || n.setStyles(i), Ft();
        }
      });
    }
  }), w(J, {
    get when() {
      return ke().length > 0;
    },
    get children() {
      return w(Gf, {
        get locale() {
          return e.locale;
        },
        get url() {
          return ke();
        },
        onClose: () => {
          ve("");
        }
      });
    }
  }), w(J, {
    get when() {
      return oe();
    },
    get children() {
      return w(Lm, {
        get initialTimestamp() {
          return Z();
        },
        get initialRange() {
          return E();
        },
        get anchorSettings() {
          return we();
        },
        onClose: () => {
          ue(!1);
        },
        onGoToDate: z9,
        onTimeRange: (o) => {
          p0(o);
        },
        onTimeAnchorChange: K9
      });
    }
  }), w(J, {
    get when() {
      return U1().visible;
    },
    get children() {
      return w(tm, {
        get locale() {
          return e.locale;
        },
        get params() {
          return U1();
        },
        onClose: () => {
          _t({
            visible: !1,
            indicatorName: "",
            paneId: "",
            calcParams: []
          });
        },
        onConfirm: (o) => {
          const i = U1();
          n == null || n.overrideIndicator({
            name: i.indicatorName,
            calcParams: o
          }, i.paneId);
          const a = i.paneId === "candle_pane" ? "main" : "sub";
          Ye(i.indicatorName, i.paneId, a, "change");
        }
      });
    }
  }), w(J, {
    get when() {
      return g1();
    },
    get children() {
      return w(sm, {
        get locale() {
          return e.locale;
        },
        onIndicatorClick: () => {
          R(!0);
        },
        onTimezoneClick: () => {
          H(!0);
        },
        onSettingClick: () => {
          $e(!0);
        },
        onTimeToolsClick: () => {
          O(Date.now()), ue(!0);
        },
        onClose: () => {
          s1(!1);
        }
      });
    }
  })];
};
Ze(["mousedown", "click", "mousemove"]);
const jm = /* @__PURE__ */ b('<svg class="logo" viewBox="0 0 80 92"><path d="M28.148808359375,51.7280513671875L22.963588359375,51.7280513671875C21.572648359375002,51.7280513671875,20.445068359375,52.6220613671875,20.445068359375,53.7248813671875L20.445068359375,72.3979013671875C20.445068359375,73.5007013671875,21.572648359375002,74.39470136718751,22.963588359375,74.39470136718751L33.926568359375,74.39470136718751C35.317468359375,74.39470136718751,36.445068359375,73.5007013671875,36.445068359375,72.3979013671875L36.445068359375,53.7248813671875C36.445068359375,52.6220613671875,35.317468359375,51.7280513671875,33.926568359375,51.7280513671875L28.741398359374998,51.7280513671875L28.741398359374998,46.2963223671875C28.741398359374998,46.1665793671875,28.608748359375,46.0614013671875,28.445108359375,46.0614013671875C28.281468359375,46.0614013671875,28.148808359375,46.1665793671875,28.148808359375,46.2963223671875L28.148808359375,51.7280513671875ZM28.741398359374998,74.3948013671875L28.741398359374998,79.82650136718749C28.741398359374998,79.9563013671875,28.608748359375,80.0614013671875,28.445108359375,80.0614013671875C28.281468359375,80.0614013671875,28.148808359375,79.9563013671875,28.148808359375,79.82650136718749L28.148808359375,74.3948013671875L28.741398359374998,74.3948013671875Z"></path><path d="M51.148808359374996,44.7280513671875L45.963588359375,44.7280513671875C44.572648359375,44.7280513671875,43.445068359375,45.6220613671875,43.445068359375,46.7248813671875L43.445068359375,65.3979013671875C43.445068359375,66.5007013671875,44.572648359375,67.39470136718751,45.963588359375,67.39470136718751L56.926568359375,67.39470136718751C58.317468359375,67.39470136718751,59.445068359375,66.5007013671875,59.445068359375,65.3979013671875L59.445068359375,46.7248813671875C59.445068359375,45.6220613671875,58.317468359375,44.7280513671875,56.926568359375,44.7280513671875L51.741398359375,44.7280513671875L51.741398359375,39.2963223671875C51.741398359375,39.1665793671875,51.608748359375,39.0614013671875,51.445108359375,39.0614013671875C51.281468359375,39.0614013671875,51.148808359374996,39.1665793671875,51.148808359374996,39.2963223671875L51.148808359374996,44.7280513671875ZM51.741398359375,67.3948013671875L51.741398359375,72.82650136718749C51.741398359375,72.9563013671875,51.608748359375,73.0614013671875,51.445108359375,73.0614013671875C51.281468359375,73.0614013671875,51.148808359374996,72.9563013671875,51.148808359374996,72.82650136718749L51.148808359374996,67.3948013671875L51.741398359375,67.3948013671875Z"></path><path d="M17.7274,90.6541C17.5901,90.6541,17.4517,90.6436,17.3121,90.6225C9.93219,89.5095,4.80718,86.7136,2.07787,82.3084C-1.1223,77.1437,0.241766,71.6314,0.56829,70.5137C5.37624,46.647,15.0785,38.4945,21.5025,33.0957C22.9683,31.8633,24.2342,30.7995,25.1676,29.7672C25.4105,29.4984,25.6051,29.2154,25.7556,28.9202C24.7465,29.2231,24.1971,29.4326,24.1703,29.4429C22.908,29.9368,21.4777,29.3247,20.9761,28.076C20.4756,26.8272,21.0897,25.4146,22.352,24.9172C22.5042,24.8571,23.5312,24.4607,25.3073,23.9616C24.087,21.4425,21.7693,18.7949,19.7125,16.6431L19.2819,16.1902C16.2438,12.9776,14.6017,4.80159,14.3036,3.19471C14.1306,2.26212,14.4636,1.30796,15.1814,0.679657C15.8995,0.0512175,16.8976,-0.159672,17.8125,0.123747C22.7731,1.66274,24.2638,1.81255,27.2321,2.11098C28.7357,2.26195,29.83,3.59029,29.6762,5.07662C29.5236,6.56295,28.182,7.64786,26.6784,7.49454C24.4992,7.27569,22.9517,7.09896,20.724,6.56646C21.4493,9.09088,22.3803,11.5427,23.2771,12.4919L23.6876,12.9237C25.3757,14.69,28.9691,18.45,30.7016,22.7299C35.0392,21.9433,40.8791,21.3359,47.7817,21.7249C48.2004,20.7386,48.8054,19.7953,49.5907,18.9135C49.7137,18.7754,49.8498,18.6502,49.9988,18.539C53.6142,15.8508,57.5491,12.857,59.7803,11.0758C58.1028,11.2502,56.1034,11.0278,53.9124,9.70882C53.2439,9.30622,52.5992,8.89427,51.9662,8.48933C48.4668,6.25164,46.497,5.12109,43.4234,5.94853C41.9647,6.34058,40.4622,5.48975,40.0659,4.04789C39.6695,2.60604,40.5296,1.11853,41.9871,0.726471C47.5602,-0.773825,51.4796,1.73271,54.9364,3.9434L54.9364,3.9434C55.5284,4.32176,56.1318,4.70797,56.7564,5.08482C58.3843,6.06556,59.4858,5.76127,61.2899,5.13865C62.3511,4.77234,63.5567,4.35687,64.8675,4.53476C66.3321,4.73254,67.4406,5.56933,67.9103,6.83096C68.7444,9.07333,67.1035,11.5533,65.5797,13.2374C64.6729,14.2394,60.0845,17.7606,56.4519,20.4957C56.9477,20.3369,57.4767,20.2511,58.026,20.2511C59.4281,20.2511,60.6982,20.8102,61.621,21.7153C65.4948,20.6901,67.87,17.9563,67.9033,17.9175C68.78,16.8888,70.3322,16.7577,71.3721,17.6226C72.412,18.4886,72.5457,20.0253,71.6702,21.054C71.5221,21.2286,69.5063,23.5492,66.0787,25.233C69.5399,26.8822,72.9993,29.682,74.1841,34.4145C74.5106,35.7206,73.7062,37.0407,72.3859,37.3638C72.1871,37.4117,71.9884,37.4351,71.792,37.4351C70.687,37.4351,69.6826,36.6932,69.4046,35.5848C68.4378,31.7217,64.8144,29.7431,61.7619,28.7456C60.8298,29.7349,59.5009,30.3535,58.026,30.3535C55.8642,30.3535,54.0162,29.0245,53.2713,27.1474C53.2022,27.138,53.1331,27.1287,53.0642,27.1195C54.232,29.5936,57.0851,31.9259,58.1868,32.665C58.3157,32.7516,58.4423,32.8523,58.5547,32.9599C66.5865,40.6151,72.4887,48.8133,76.0971,57.3287C76.6815,58.7074,76.0249,60.2932,74.6313,60.8702C74.2976,61.01,73.9388,61.082,73.576,61.082C72.5065,61.082,71.4914,60.4582,71.0525,59.4213C67.7577,51.6455,62.331,44.1074,54.9203,37.0116C53.6073,36.1009,48.0984,31.9917,47.2065,26.583C40.9421,26.2679,35.6187,26.8278,31.6725,27.5336C31.6197,29.527,30.9225,31.5172,29.2456,33.3731C28.0614,34.6827,26.5968,35.915,25.0446,37.2188C21.9414,39.8269,18.2648,42.9169,14.8104,48.1192C11.356,53.3215,8.12389,60.6361,5.9098,71.6934C5.88732,71.8035,5.85893,71.9123,5.82344,72.0188C5.81634,72.041,4.57886,76.0413,6.77344,79.5289C8.6332,82.4828,12.4557,84.4139,18.1367,85.2705C19.6297,85.4953,20.6566,86.8762,20.4295,88.3532C20.2213,89.6944,19.0559,90.6541,17.7274,90.6541ZM35.1195,7.03101C33.3502,7.03101,31.9158,5.61208,31.9158,3.86173C31.9158,2.11139,33.3502,0.69245,35.1195,0.69245C36.8889,0.69245,38.3233,2.11139,38.3233,3.86173C38.3233,5.61208,36.8889,7.03101,35.1195,7.03101ZM57.6848,23.1892L58.414,24.4754C58.8984,24.3623,59.3923,24.3435,59.8644,24.4203C60.2191,24.5005,60.5087,24.7182,60.6663,25.0229C60.8636,25.3394,60.8993,25.7346,60.7646,26.1094C60.5988,26.5176,60.2972,26.8749,59.9085,27.1235L60.31,27.8316L59.7886,28.1294L59.3994,27.443C58.9257,27.7175,58.399,27.883,57.8664,27.9247L57.3744,27.0569C57.6378,27.0741,57.9071,27.048,58.1704,26.9797C58.4501,26.9251,58.7239,26.8323,58.9829,26.7044L58.2801,25.4647C57.8047,25.5877,57.3167,25.6065,56.8549,25.5197C56.4913,25.4263,56.196,25.1971,56.0328,24.8814C55.8433,24.5561,55.8127,24.1572,55.9484,23.7789C56.088,23.373,56.3763,23.0149,56.7584,22.7726L56.4166,22.1699L56.938,21.8721L57.2727,22.4625C57.6615,22.2376,58.0888,22.0901,58.5254,22.0301L59.0042,22.8746C58.5548,22.8828,58.103,22.9906,57.6848,23.1892ZM56.9319,24.2961Q57.1278,24.6417,57.7863,24.5856L57.1695,23.4978Q56.6982,23.884,56.9319,24.2961ZM58.9077,25.3462L59.4981,26.3875L59.499,26.3891Q59.9965,26.0045,59.7628,25.5923Q59.573,25.2576,58.9077,25.3462ZM73.2212,66.5065C73.2212,68.2569,74.6555,69.6758,76.4249,69.6758C78.1943,69.6758,79.6286,68.2569,79.6286,66.5065C79.6286,64.7562,78.1943,63.3372,76.4249,63.3372C74.6555,63.3372,73.2212,64.7562,73.2212,66.5065ZM35.9465,91.8045C35.0734,91.8045,34.2038,91.7987,33.3378,91.7858C31.827,91.7636,30.6203,90.5359,30.6428,89.0402C30.6653,87.5457,31.9158,86.3297,33.4183,86.3742C49.6344,86.6059,65.7512,84.6175,67.6134,84.037C72.1953,82.4184,74.5295,79.3603,74.5295,74.9575C74.5295,73.463,75.754,72.2517,77.2648,72.2517C78.7755,72.2517,80,73.463,80,74.9575C80,81.5992,76.148,86.7686,69.4317,89.142C67.0041,89.9999,51.0955,91.8046,35.9465,91.8045ZM25.2731,92C23.5037,92,22.0693,90.5811,22.0693,88.8307C22.0693,87.0804,23.5037,85.6615,25.2731,85.6615C27.0424,85.6615,28.4768,87.0804,28.4768,88.8307C28.4768,90.5811,27.0424,92,25.2731,92Z"></path></svg>'), Qm = jm.cloneNode(!0);
class Ym {
  constructor(t) {
    dt(this, "_chartApi", null);
    if (fe.isString(t.container)) {
      if (this._container = document.getElementById(t.container), !this._container)
        throw new Error("Container is null");
    } else
      this._container = t.container;
    this._container.classList.add("klinecharts-pro"), this._container.setAttribute("data-theme", t.theme ?? "light");
    const r = this;
    A5(() => w(Rm, {
      ref: (n) => {
        r._chartApi = n;
      },
      get styles() {
        return t.styles ?? {};
      },
      get watermark() {
        return t.watermark ?? Qm;
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
    var n, s;
    (s = (n = this._chartApi) == null ? void 0 : n.enableAutoSave) == null || s.call(n, t, r);
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
      orderHistory: !0
    };
  }
  setOrderToolsState(t) {
    var r, n;
    (n = (r = this._chartApi) == null ? void 0 : r.setOrderToolsState) == null || n.call(r, t);
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
    var n, s;
    return ((s = (n = this._chartApi) == null ? void 0 : n.getSize) == null ? void 0 : s.call(n, t, r)) ?? null;
  }
  getDom(t, r) {
    var n, s;
    return ((s = (n = this._chartApi) == null ? void 0 : n.getDom) == null ? void 0 : s.call(n, t, r)) ?? null;
  }
  subscribeAction(t, r) {
    var n, s;
    (s = (n = this._chartApi) == null ? void 0 : n.subscribeAction) == null || s.call(n, t, r);
  }
  unsubscribeAction(t, r) {
    var n, s;
    (s = (n = this._chartApi) == null ? void 0 : n.unsubscribeAction) == null || s.call(n, t, r);
  }
}
f5.forEach((e) => {
  Y9(e);
});
export {
  Hm as DefaultDatafeed,
  Ym as KLineChartPro,
  qm as loadLocales
};
//# sourceMappingURL=klinecharts-pro.js.map
