var Qr = Object.defineProperty;
var Zr = (e, t, r) => t in e ? Qr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var ot = (e, t, r) => (Zr(e, typeof t != "symbol" ? t + "" : t, r), r);
import { utils as ne, OverlayMode as n0, ActionType as k1, LineType as i1, init as Rr, FormatDateType as At, DomPosition as wt, dispose as f9, TooltipIconPosition as Mt, CandleType as Vr, YAxisType as qr, registerOverlay as Hr } from "klinecharts";
function st(e, t, r) {
  const n = (e.x - t.x) * Math.cos(r) - (e.y - t.y) * Math.sin(r) + t.x, o = (e.x - t.x) * Math.sin(r) + (e.y - t.y) * Math.cos(r) + t.y;
  return { x: n, y: o };
}
function s0(e, t) {
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
      y: ne.getLinearYFromCoordinates(e[0], e[1], { x: 0, y: e[0].y })
    } : r = {
      x: t.width,
      y: ne.getLinearYFromCoordinates(e[0], e[1], { x: t.width, y: e[0].y })
    }, { coordinates: [e[0], r] };
  }
  return [];
}
function tr(e, t) {
  const r = Math.abs(e.x - t.x), n = Math.abs(e.y - t.y);
  return Math.sqrt(r * r + n * n);
}
const Yr = {
  name: "arrow",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = e[1].x > e[0].x ? 0 : 1, r = ne.getLinearSlopeIntercept(e[0], e[1]);
      let n;
      r ? n = Math.atan(r[0]) + Math.PI * t : e[1].y > e[0].y ? n = Math.PI / 2 : n = Math.PI / 2 * 3;
      const o = st({ x: e[1].x - 8, y: e[1].y + 4 }, e[1], n), l = st({ x: e[1].x - 8, y: e[1].y - 4 }, e[1], n);
      return [
        {
          type: "line",
          attrs: { coordinates: e }
        },
        {
          type: "line",
          ignoreEvent: !0,
          attrs: { coordinates: [o, e[1], l] }
        }
      ];
    }
    return [];
  }
}, Gr = {
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
      const t = tr(e[0], e[1]);
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
}, Wr = {
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
}, Xr = {
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
}, Jr = {
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
}, e5 = {
  name: "fibonacciCircle",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = Math.abs(e[0].x - e[1].x), r = Math.abs(e[0].y - e[1].y), n = Math.sqrt(t * t + r * r), o = [0.236, 0.382, 0.5, 0.618, 0.786, 1], l = [], d = [];
      return o.forEach((u) => {
        const g = n * u;
        l.push(
          { ...e[0], r: g }
        ), d.push({
          x: e[0].x,
          y: e[0].y + g + 6,
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
          attrs: d
        }
      ];
    }
    return [];
  }
}, t5 = {
  name: "fibonacciSegment",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: r }) => {
    const n = [], o = [];
    if (e.length > 1) {
      const l = e[1].x > e[0].x ? e[0].x : e[1].x, d = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0], u = e[0].y - e[1].y, g = t.points, _ = g[0].value - g[1].value;
      d.forEach((y) => {
        const w = e[1].y + u * y, A = (g[1].value + _ * y).toFixed(r.price);
        n.push({ coordinates: [{ x: e[0].x, y: w }, { x: e[1].x, y: w }] }), o.push({
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
        attrs: n
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: o
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
      const r = tr(e[0], e[1]) / Math.sqrt(24), n = e[1].x > e[0].x ? 0 : 1, o = ne.getLinearSlopeIntercept(e[0], e[1]);
      let l;
      o ? l = Math.atan(o[0]) + Math.PI * n : e[1].y > e[0].y ? l = Math.PI / 2 : l = Math.PI / 2 * 3;
      const d = st(
        { x: e[0].x - r, y: e[0].y },
        e[0],
        l
      ), u = st(
        { x: e[0].x - r, y: e[0].y - r },
        e[0],
        l
      ), g = [{
        ...d,
        r,
        startAngle: l,
        endAngle: l + Math.PI / 2
      }, {
        ...u,
        r: r * 2,
        startAngle: l + Math.PI / 2,
        endAngle: l + Math.PI
      }];
      let _ = e[0].x - r, y = e[0].y - r;
      for (let w = 2; w < 9; w++) {
        const A = g[w - 2].r + g[w - 1].r;
        let O = 0;
        switch (w % 4) {
          case 0: {
            O = l, _ -= g[w - 2].r;
            break;
          }
          case 1: {
            O = l + Math.PI / 2, y -= g[w - 2].r;
            break;
          }
          case 2: {
            O = l + Math.PI, _ += g[w - 2].r;
            break;
          }
          case 3: {
            O = l + Math.PI / 2 * 3, y += g[w - 2].r;
            break;
          }
        }
        const N = O + Math.PI / 2, F = st({ x: _, y }, e[0], l);
        g.push({
          ...F,
          r: A,
          startAngle: O,
          endAngle: N
        });
      }
      return [
        {
          type: "arc",
          attrs: g
        },
        {
          type: "line",
          attrs: s0(e, t)
        }
      ];
    }
    return [];
  }
}, n5 = {
  name: "fibonacciSpeedResistanceFan",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, bounding: t }) => {
    const r = [];
    let n = [];
    const o = [];
    if (e.length > 1) {
      const l = e[1].x > e[0].x ? -38 : 4, d = e[1].y > e[0].y ? -2 : 20, u = e[1].x - e[0].x, g = e[1].y - e[0].y;
      [1, 0.75, 0.618, 0.5, 0.382, 0.25, 0].forEach((y) => {
        const w = e[1].x - u * y, A = e[1].y - g * y;
        r.push({ coordinates: [{ x: w, y: e[0].y }, { x: w, y: e[1].y }] }), r.push({ coordinates: [{ x: e[0].x, y: A }, { x: e[1].x, y: A }] }), n = n.concat(s0([e[0], { x: w, y: e[1].y }], t)), n = n.concat(s0([e[0], { x: e[1].x, y: A }], t)), o.unshift({
          x: e[0].x + l,
          y: A + 10,
          text: `${y.toFixed(3)}`
        }), o.unshift({
          x: w - 18,
          y: e[0].y + d,
          text: `${y.toFixed(3)}`
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
        attrs: o
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
    const n = [], o = [];
    if (e.length > 2) {
      const l = t.points, d = l[1].value - l[0].value, u = e[1].y - e[0].y, g = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1], _ = e[2].x > e[1].x ? e[1].x : e[2].x;
      g.forEach((y) => {
        const w = e[2].y + u * y, A = (l[2].value + d * y).toFixed(r.price);
        n.push({ coordinates: [{ x: e[1].x, y: w }, { x: e[2].x, y: w }] }), o.push({
          x: _,
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
        attrs: n
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: o
      }
    ];
  }
}, o5 = {
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
      ], o = [
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
          attrs: o
        }
      ];
    }
    return [];
  }
}, a5 = {
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
}, s5 = {
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
}, l5 = {
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
}, c5 = {
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
}, u5 = {
  name: "abcd",
  totalStep: 5,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    let t = [], r = [];
    const n = ["A", "B", "C", "D"], o = e.map((l, d) => ({
      ...l,
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
        attrs: o
      }
    ];
  }
}, d5 = {
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
    const r = [], n = [], o = ["X", "A", "B", "C", "D"], l = e.map((d, u) => ({
      ...d,
      baseline: "bottom",
      text: `(${o[u]})`
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
}, h5 = [
  Yr,
  Gr,
  Wr,
  Jr,
  Xr,
  e5,
  t5,
  r5,
  n5,
  i5,
  o5,
  a5,
  s5,
  l5,
  c5,
  u5,
  d5
];
class Lf {
  constructor(t) {
    ot(this, "_apiKey");
    ot(this, "_prevSymbolMarket");
    ot(this, "_ws");
    this._apiKey = t;
  }
  async searchSymbols(t) {
    return await ((await (await fetch(`https://api.polygon.io/v3/reference/tickers?apiKey=${this._apiKey}&active=true&search=${t ?? ""}`)).json()).results || []).map((o) => ({
      ticker: o.ticker,
      name: o.name,
      shortName: o.ticker,
      market: o.market,
      exchange: o.primary_exchange,
      priceCurrency: o.currency_name,
      type: o.type,
      logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAA66SURBVHic7Z17cFTVGcB/527AiKGgRA0ShGhKoQjFMb4qUMCMPIrWqdbHSEdlHDGgI9V2aq2d1hmKtVbRsSTGEcQRp4pStaZQlNYUwYLiSKU0SCMBDRCmoQSJGGF3T/84d2VZk+w9d899hf3NMBnl3ns+5vtyHt/5HoIehpQIaijDYjiSciRlwCCgBCgG+gNFQCGCAvUScaADaAfagFagBdiFoAlBI0m2UkWTEMgA/lmeIYIWIFdkLQNJMBbBJUjOA8agFOwF7cAmBO8hWUeMtWIWezwayxciZwByGb1pZTyCaUguA0YGLNIWBK8jWUExa8Q1HA5YHi0iYQByGTH2UYnkBmA6cHLQMnXBfqAOwXMMYLW4hkTQAmUj1AYgqzkLuAXBTUgGBi2PFoI9SJYAT4nZbA9anK4IpQHIhUzE4i4k04OWxQiCOpI8IubwZtCiZBIqA5A1TEdyH3Bh0LJ4xAYE80QVdUELkiIUBiCf4FIk85FcELQsviB4B8G94jb+GrwoASKfZBgJHkUyNUg5AkOwkhhzxa1sC06EAJALKUJwL3A30DsIGULEYeBhJPPFHNr9Htx3A5A1TECyGCjze+yQ04Rgpqii3s9BfTMAWUsfksxD8iO/xowkggVY3Cdmccif4XxAPskw4rwCjPBjvB5AAwVc6cfewPJ6AFnNzcTZSF75OowgzkZZzc1eD+SZAUiJkNX8FlgM9PVqnB5MX2CxrOa3Uno3U3vyYVlLPxIshR7iyQueOmLMELM4YPrDxg1A1jKQJKuQjDL97eMawWYsJpu+fjZqAPL3DMFiNVBu8rt5vqSRJJXidnaa+qAxA5CPU0aMvwFDTX0zT6fsIMEkcQdNJj5mxADs3/x68sr3ix0kmWBiJsjZAOyQrDXkp32/aSTG+Fz3BDkZgKylH0neym/4AkJtDMflcjpw7QeQEkGCpXnlB4hkFAmW5uIncO8IquFB8uf8MDDd1oUrXFmO7aJc7HbQPJ4wU8zmad2XtA3AvtjZSN69GzYOUkCF7gWSlgHIWvqQyF/shJgGYlToXCXr7QGSzCOv/DAzwtaRYxzPAHYkT+jCmvN0gmCi08giRwZgx/B9QD6MKyo0IRntJMbQ2RKgAjjzyo8OZbbOspJ1BrB3/ZvJR+9GjcMUMCrbqSD7DJDgUfLKjyK9bd11S7czgHyCS0my2pxMIaHvUCgshl5FUFQKQtWJ4FALHGmHz5rhizY43BaomEawqOwuA6mg25cl840L5DexQiithNMvhNMvglMr4IT+zt5t3QS762H332FXfTQNQumwy1zLLmcAO1HzNU+E8oNTK+AbN8KwGc4V3h3JODS9Av98GPauz/17fiK4vKuE1K4NoJr1RDFLd+BY+PYCOK3CuzH2rof3fg07Q5Pkm40NYjYXdfYXnRqAXMhEBH/zVibDFBbDRQ/AiFv8G3PbUlhTpfYNYUcyqbP6BJ2fAizu8lwgkwwcC9c3+Kt8UMvLtZuhZKy/47qhC51+ZQawy7J85LlApjhjAkx7Te3ogyIZhz9PhebQH5jOzixX09kM4POvUQ6cdTVc/kawygewCmDKy2omCjdf0e0xM4BdjeuTSBRk6jtUTb9BKz+djlZ4eRy0bQ1aks4R7GEAg9Orlx07A6hSbOFXPsCkp8OlfFAb0UnaQTn+IRnIPirT/1dBxgM3+CqQW0beptZ+NyTj0LIW9m6A//0L2puP/l1RKXytHAZ9RzmNYoX63z/9IrU53LbUnXxeo3S8KvWfXy4BdgXOFsJbhFFhFcAPP4E+JXrvJeOw+TH44NFjld4VfUrg3Htg5Cx9QzjUAn8YEVbP4X6KKUlVND26BLQynrArH9TGT1f5h1pg+fnw9o+dKT/1zrq58MeL4UCj3nh9StQsFU5OtnUNpBuAYFog4ugy5Lt6z3/RBq9OVH59N7RuUu93tOq9N3KWu/H8IE3XRw1AFV4OP2dO0Xt+4/2578o/a1YePx36DoXiMbmN6xVpurbAzu8Lvup2dgqL1R+nHGmHLU+YGfujl/RnkUGV2Z8JhpG2zu0ZIEHoPRgA9NPMP21eDYkOc+M3LNJ7/rTzzI1tGlvnygAElwQqjFPc7MZNouvq1TVYP7F1rgxAddrIkw3dvYTOcuU3ts4L7B47Id2tZHBwh97zXvwGNr4AfU539uyhvebHN8cYKREiUrd/sUK49XPnzyfj8FyZ87P/8cfZFhbDg5bCMYkOdSRzilUAFz/knTxRx2K4hYxYaZcdmmFY5ddBxa88ESXySMotu69edNi+XP+d838Jlz4bvtvDoJGUWaimitFhz1p3a/qwGXBdg/qZJ8UgC9VRMzokOuDdX7h7t6hUzQTX2fGDbq57exYlQlbzb6KY83/1uyr2PxeOtKtY/w+fUQkgybgJyaJEg5DV7IaIRAGlc8o58P1/mFvXj7SrOP+df4aP/6J/+xdN9ghZzadEtd7PmVNg6mvquGeSZFzNCB8th8bnwxrYYYKDQlZzGOgVtCSuGXELjK8xbwQpEh3KCLbURi8lLDtHhKwhiYcNCXzhzClw2YveH/N218O796ufPQGB7BkGANB/OEx9Wf30mubV8NYd4Q3/dopAWkh6xta3bSssO1clbZqMAeiM0kq45n3lYfRq6fEDSTzam8Cu6FcOYx/XDx9zw+56eON687EH/nDQAv+7VXrOgUaVq/fyOHXO9/J8f8YE+N6b4Q7+6Jr26DqCdOhXDufcrgpGmCgW0RmHWuCVcfoh5MHSIGQ1a4BxQUviC7FCtSycdRUMmW7eGNq2wkvnR6NegOItIatZBvwgaEl8xypQ03f5tcooTio1892ddbDicjPf8p4XC4BdQUsRCMm4Os6lAj1PrYCzr1bLhG7mUTpDpsM3boIPl5iQ0mt2WQgz3aciz383wvp74NnBsOoH7jOJAC5ZAL092muYRNBkIYjUrsVzknHY/hK8eK77490J/WH0XPOymUbQaJEk4u4sD2l8Hl4YBZ+syv5sJqPmhN9JlGSrRRVN9ERfgCk6WmHlldCyTu+9wmL3NQz8oZ0qmiwhkEAOC95xQKIDVl2tf7wbPNkbecywSQikmqME7yFDnB/Yq0jVBXDK5y0qqMMkh1rgg8fgvJ87fyes2cGgdE6qRIxkHXBnkPJ0i27tnb3rzRsAKLeyjgGE2T2sdG7nBsZYG6gw2dD15Zty6mTy3416z+fiT/AaW+cWgN1/dkugAnXHZ816629RqXeJmTqZSeGNOt6S6jmcXiLm9cDEcYLuJcsQj5qanhji32qnpOk6vUTMikCEcYru9DvMg4p3/cr1zvY6s4WfpOn6qAEUswbYH4Q8jtB1xpRWmp8Fvq6ZVfTpDrPjm2G/rWsgzQDsunHhLYD/8V9UxS8dxj1ubiN2UimMuVvvnX2hdK/UpWoEQmapWMFzvovjlCPt+jV6+g5V0Tp9h+Y2dp8SuMJFUeqPXbiQvSZDx8cawABWI9TuMJS8/xv9jJ3+w1VR6dFz3fnmB09RGUi60cZftIWvfLwqFn2MUMcYgLiGBJIlvgqlQ0crvP0T/fd6Fakr2hv3qJ+Dp3R/TDzlHPjmbXDVuzB9pbsZpGGR99HJukiWpFcKh6g2jJhWp18xtDMOtSglpa58+5QcbSeXC+3N6hYxfCllX2kY0XnPoBpeQ+LRQdoAJ5Wq7OCwetpWXB6+hlKCOlHFV2LVOu8ZlOQRzwXKhc+aVf3eMMbiNywKn/KhS51Gu21c/+Fqlx+WmWD7cnjjujDWGeiybVzXvYMF8zwTxxRtW1Usfi7xe6b48JmwKr9bXXbfO7iGDUguMC+RYawCuGAefOtu/8OwjrSrjOF//s7fcZ0ieEdUdT2Td9893GEP+sBJxlVE7/Mj1J29XzS9qnb7YVU+ZNVh1rRwWcMKJFPNSeQDp5yjHD/l15qvGZDoUEbWsCh8jp5MBCtFVfeNQLIbwJMMI85moLcxwfwilQo2eLJq5uQ2ROuLNnUbuX05/CcyJWMOU8AocSvbunvIUWEIWc184GdGxAqSXkWqzWvxGCgcoJw+J2Y4flI3eAd3qq5i+zZFLeEzxQNidvYl3JkBLKQIwQcQsaqixy9NSEaLOdnD/bvfBNqIObQjmJm7XHl8QTDTifLBoQEAiCrqESxwL1UeXxAsEFXUO33csQHYT98HNGiKlMc/GmwdOUa7Oph9KthIT6srFH0OUkBFtl1/JnozAGAPEN4kkuOXO3WVDy4MAEDM5mkg34ojPDxk60Qb1wUi7WZTf4IQxw0cH9RRxRV2kq82rmYAACGQxJiBYLPbb+TJEcFmYsxwq3zIwQAAxCwOYDEZ8lVGAqARi8liFgdy+UhOBgB2XmGSSmBHrt/K45gdJKlM5fflQs4GACBuZycJJpE3Aj/YQYJJ4nZ2mviYEQMAEHfQRJIJ5JcDL2kkyQRxh7nKbsbLxMtaBpJkFZJRpr99XCPYbK/5RhN3jM0AKcQs9mAxjjDnGUaPOizGmVY+eDADpLD9BA8CLlJ58qTxEFX8NJejXnd43ilEVnMz8Bj5uwNdDgJ3uvXwOcWXVjH2BdIr9PSy9OZooIAr3fj2dTG+B+gMcSvbiFGRjydwgGABMf1bPffD+YysYQKSxeTDyzJpQjBTJ5jDBL7MAOmIKuqRjAYegKOVKo5jDgMPIBntt/IhgBkgHfkkw0jwaOTyDkwhWEmMuX5N952LEALkE1yKZH4k0tBMIHgHwb3iNv4avCghQtYwHcl9hD0r2T0bEMwTVeFxkoXKAFLIhUzE4q5QF6nQQVBHkkfEHN4MWpRMQmkAKexyNbcguAkZsRb3gj12vaWnMsuyhIlQG0AKuYwY+6hEcgMqBO3koGXqgv1AHYLnGMDqzIJMYSQSBpCOXEZvWhmPYBqSy4CRAYu0BcHrSFZQzJr0IoxRIHIGkImsZSAJxiK4BMl5wBjAqz7y7cAmu8HGOmKs9eKGzk8ibwCZ2LeQZVgMR1KOpAwYBJQAxUB/lIEUIr5smBEHOlAKbgNagRZgF4ImBI0k2UoVTV7dygXF/wF+fTz59Jc5ygAAAABJRU5ErkJggg=="
    }));
  }
  async getHistoryKLineData(t, r, n, o) {
    return await ((await (await fetch(`https://api.polygon.io/v2/aggs/ticker/${t.ticker}/range/${r.multiplier}/${r.timespan}/${n}/${o}?apiKey=${this._apiKey}`)).json()).results || []).map((u) => ({
      timestamp: u.t,
      open: u.o,
      high: u.h,
      low: u.l,
      close: u.c,
      volume: u.v,
      turnover: u.vw
    }));
  }
  subscribe(t, r, n) {
    var o, l;
    this._prevSymbolMarket !== t.market ? ((o = this._ws) == null || o.close(), this._ws = new WebSocket(`wss://delayed.polygon.io/${t.market}`), this._ws.onopen = () => {
      var d;
      (d = this._ws) == null || d.send(JSON.stringify({ action: "auth", params: this._apiKey }));
    }, this._ws.onmessage = (d) => {
      var g;
      const u = JSON.parse(d.data);
      u[0].ev === "status" ? u[0].status === "auth_success" && ((g = this._ws) == null || g.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` }))) : "sym" in u && n({
        timestamp: u.s,
        open: u.o,
        high: u.h,
        low: u.l,
        close: u.c,
        volume: u.v,
        turnover: u.vw
      });
    }) : (l = this._ws) == null || l.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` })), this._prevSymbolMarket = t.market;
  }
  unsubscribe(t, r) {
  }
}
const Le = {};
function f5(e) {
  Le.context = e;
}
const y5 = (e, t) => e === t, l0 = Symbol("solid-proxy"), g5 = Symbol("solid-track"), Dt = {
  equals: y5
};
let rr = ar;
const s1 = 1, It = 2, nr = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, i0 = {};
var be = null;
let x1 = null, le = null, Se = null, o1 = null, C0 = 0;
function lt(e, t) {
  const r = le, n = be, o = e.length === 0, l = o ? nr : {
    owned: null,
    cleanups: null,
    context: null,
    owner: t === void 0 ? n : t
  }, d = o ? e : () => e(() => a1(() => Qt(l)));
  be = l, le = null;
  try {
    return y1(d, !0);
  } finally {
    le = r, be = n;
  }
}
function T(e, t) {
  t = t ? Object.assign({}, Dt, t) : Dt;
  const r = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, n = (o) => (typeof o == "function" && (o = o(r.value)), or(r, o));
  return [ir.bind(r), n];
}
function y9(e, t, r) {
  const n = jt(e, t, !0, s1);
  D1(n);
}
function I(e, t, r) {
  const n = jt(e, t, !1, s1);
  D1(n);
}
function Ne(e, t, r) {
  rr = $5;
  const n = jt(e, t, !1, s1);
  n.user = !0, o1 ? o1.push(n) : D1(n);
}
function J(e, t, r) {
  r = r ? Object.assign({}, Dt, r) : Dt;
  const n = jt(e, t, !0, 0);
  return n.observers = null, n.observerSlots = null, n.comparator = r.equals || void 0, D1(n), ir.bind(n);
}
function p5(e, t, r) {
  let n, o, l;
  arguments.length === 2 && typeof t == "object" || arguments.length === 1 ? (n = !0, o = e, l = t || {}) : (n = e, o = t, l = r || {});
  let d = null, u = i0, g = null, _ = !1, y = "initialValue" in l, w = typeof n == "function" && J(n);
  const A = /* @__PURE__ */ new Set(), [O, N] = (l.storage || T)(l.initialValue), [F, K] = T(void 0), [X, W] = T(void 0, {
    equals: !1
  }), [B, R] = T(y ? "ready" : "unresolved");
  if (Le.context) {
    g = `${Le.context.id}${Le.context.count++}`;
    let G;
    l.ssrLoadFrom === "initial" ? u = l.initialValue : Le.load && (G = Le.load(g)) && (u = G[0]);
  }
  function z(G, re, ue, Te) {
    return d === G && (d = null, y = !0, (G === u || re === u) && l.onHydrated && queueMicrotask(() => l.onHydrated(Te, {
      value: re
    })), u = i0, Pe(re, ue)), re;
  }
  function Pe(G, re) {
    y1(() => {
      re === void 0 && N(() => G), R(re !== void 0 ? "errored" : "ready"), K(re);
      for (const ue of A.keys())
        ue.decrement();
      A.clear();
    }, !1);
  }
  function Oe() {
    const G = m5, re = O(), ue = F();
    if (ue !== void 0 && !d)
      throw ue;
    return le && !le.user && G && y9(() => {
      X(), d && (G.resolved || A.has(G) || (G.increment(), A.add(G)));
    }), re;
  }
  function ge(G = !0) {
    if (G !== !1 && _)
      return;
    _ = !1;
    const re = w ? w() : n;
    if (re == null || re === !1) {
      z(d, a1(O));
      return;
    }
    const ue = u !== i0 ? u : a1(() => o(re, {
      value: O(),
      refetching: G
    }));
    return typeof ue != "object" || !(ue && "then" in ue) ? (z(d, ue, void 0, re), ue) : (d = ue, _ = !0, queueMicrotask(() => _ = !1), y1(() => {
      R(y ? "refreshing" : "pending"), W();
    }, !1), ue.then((Te) => z(ue, Te, void 0, re), (Te) => z(ue, void 0, lr(Te), re)));
  }
  return Object.defineProperties(Oe, {
    state: {
      get: () => B()
    },
    error: {
      get: () => F()
    },
    loading: {
      get() {
        const G = B();
        return G === "pending" || G === "refreshing";
      }
    },
    latest: {
      get() {
        if (!y)
          return Oe();
        const G = F();
        if (G && !d)
          throw G;
        return O();
      }
    }
  }), w ? y9(() => ge(!1)) : ge(!1), [Oe, {
    refetch: ge,
    mutate: N
  }];
}
function a1(e) {
  if (le === null)
    return e();
  const t = le;
  le = null;
  try {
    return e();
  } finally {
    le = t;
  }
}
function m0(e) {
  Ne(() => a1(e));
}
function w1(e) {
  return be === null || (be.cleanups === null ? be.cleanups = [e] : be.cleanups.push(e)), e;
}
function C5(e) {
  const t = le, r = be;
  return Promise.resolve().then(() => {
    le = t, be = r;
    let n;
    return y1(e, !1), le = be = null, n ? n.done : void 0;
  });
}
let m5;
function ir() {
  const e = x1;
  if (this.sources && (this.state || e))
    if (this.state === s1 || e)
      D1(this);
    else {
      const t = Se;
      Se = null, y1(() => Et(this), !1), Se = t;
    }
  if (le) {
    const t = this.observers ? this.observers.length : 0;
    le.sources ? (le.sources.push(this), le.sourceSlots.push(t)) : (le.sources = [this], le.sourceSlots = [t]), this.observers ? (this.observers.push(le), this.observerSlots.push(le.sources.length - 1)) : (this.observers = [le], this.observerSlots = [le.sources.length - 1]);
  }
  return this.value;
}
function or(e, t, r) {
  let n = e.value;
  return (!e.comparator || !e.comparator(n, t)) && (e.value = t, e.observers && e.observers.length && y1(() => {
    for (let o = 0; o < e.observers.length; o += 1) {
      const l = e.observers[o], d = x1 && x1.running;
      d && x1.disposed.has(l), (d && !l.tState || !d && !l.state) && (l.pure ? Se.push(l) : o1.push(l), l.observers && sr(l)), d || (l.state = s1);
    }
    if (Se.length > 1e6)
      throw Se = [], new Error();
  }, !1)), t;
}
function D1(e) {
  if (!e.fn)
    return;
  Qt(e);
  const t = be, r = le, n = C0;
  le = be = e, v5(e, e.value, n), le = r, be = t;
}
function v5(e, t, r) {
  let n;
  try {
    n = e.fn(t);
  } catch (o) {
    e.pure && (e.state = s1, e.owned && e.owned.forEach(Qt), e.owned = null), cr(o);
  }
  (!e.updatedAt || e.updatedAt <= r) && (e.updatedAt != null && "observers" in e ? or(e, n) : e.value = n, e.updatedAt = r);
}
function jt(e, t, r, n = s1, o) {
  const l = {
    fn: e,
    state: n,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: be,
    context: null,
    pure: r
  };
  return be === null || be !== nr && (be.owned ? be.owned.push(l) : be.owned = [l]), l;
}
function Nt(e) {
  const t = x1;
  if (e.state === 0 || t)
    return;
  if (e.state === It || t)
    return Et(e);
  if (e.suspense && a1(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const r = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < C0); )
    (e.state || t) && r.push(e);
  for (let n = r.length - 1; n >= 0; n--)
    if (e = r[n], e.state === s1 || t)
      D1(e);
    else if (e.state === It || t) {
      const o = Se;
      Se = null, y1(() => Et(e, r[0]), !1), Se = o;
    }
}
function y1(e, t) {
  if (Se)
    return e();
  let r = !1;
  t || (Se = []), o1 ? r = !0 : o1 = [], C0++;
  try {
    const n = e();
    return b5(r), n;
  } catch (n) {
    r || (o1 = null), Se = null, cr(n);
  }
}
function b5(e) {
  if (Se && (ar(Se), Se = null), e)
    return;
  const t = o1;
  o1 = null, t.length && y1(() => rr(t), !1);
}
function ar(e) {
  for (let t = 0; t < e.length; t++)
    Nt(e[t]);
}
function $5(e) {
  let t, r = 0;
  for (t = 0; t < e.length; t++) {
    const n = e[t];
    n.user ? e[r++] = n : Nt(n);
  }
  for (Le.context && f5(), t = 0; t < r; t++)
    Nt(e[t]);
}
function Et(e, t) {
  const r = x1;
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
    const o = e.sources[n];
    o.sources && (o.state === s1 || r ? o !== t && Nt(o) : (o.state === It || r) && Et(o, t));
  }
}
function sr(e) {
  const t = x1;
  for (let r = 0; r < e.observers.length; r += 1) {
    const n = e.observers[r];
    (!n.state || t) && (n.state = It, n.pure ? Se.push(n) : o1.push(n), n.observers && sr(n));
  }
}
function Qt(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const r = e.sources.pop(), n = e.sourceSlots.pop(), o = r.observers;
      if (o && o.length) {
        const l = o.pop(), d = r.observerSlots.pop();
        n < o.length && (l.sourceSlots[d] = n, o[n] = l, r.observerSlots[n] = d);
      }
    }
  if (e.owned) {
    for (t = 0; t < e.owned.length; t++)
      Qt(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = 0; t < e.cleanups.length; t++)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function lr(e) {
  return e instanceof Error || typeof e == "string" ? e : new Error("Unknown error");
}
function cr(e) {
  throw e = lr(e), e;
}
const _5 = Symbol("fallback");
function g9(e) {
  for (let t = 0; t < e.length; t++)
    e[t]();
}
function k5(e, t, r = {}) {
  let n = [], o = [], l = [], d = 0, u = t.length > 1 ? [] : null;
  return w1(() => g9(l)), () => {
    let g = e() || [], _, y;
    return g[g5], a1(() => {
      let A = g.length, O, N, F, K, X, W, B, R, z;
      if (A === 0)
        d !== 0 && (g9(l), l = [], n = [], o = [], d = 0, u && (u = [])), r.fallback && (n = [_5], o[0] = lt((Pe) => (l[0] = Pe, r.fallback())), d = 1);
      else if (d === 0) {
        for (o = new Array(A), y = 0; y < A; y++)
          n[y] = g[y], o[y] = lt(w);
        d = A;
      } else {
        for (F = new Array(A), K = new Array(A), u && (X = new Array(A)), W = 0, B = Math.min(d, A); W < B && n[W] === g[W]; W++)
          ;
        for (B = d - 1, R = A - 1; B >= W && R >= W && n[B] === g[R]; B--, R--)
          F[R] = o[B], K[R] = l[B], u && (X[R] = u[B]);
        for (O = /* @__PURE__ */ new Map(), N = new Array(R + 1), y = R; y >= W; y--)
          z = g[y], _ = O.get(z), N[y] = _ === void 0 ? -1 : _, O.set(z, y);
        for (_ = W; _ <= B; _++)
          z = n[_], y = O.get(z), y !== void 0 && y !== -1 ? (F[y] = o[_], K[y] = l[_], u && (X[y] = u[_]), y = N[y], O.set(z, y)) : l[_]();
        for (y = W; y < A; y++)
          y in F ? (o[y] = F[y], l[y] = K[y], u && (u[y] = X[y], u[y](y))) : o[y] = lt(w);
        o = o.slice(0, d = A), n = g.slice(0);
      }
      return o;
    });
    function w(A) {
      if (l[y] = A, u) {
        const [O, N] = T(y);
        return u[y] = N, t(g[y], O);
      }
      return t(g[y]);
    }
  };
}
function L(e, t) {
  return a1(() => e(t || {}));
}
function St() {
  return !0;
}
const L5 = {
  get(e, t, r) {
    return t === l0 ? r : e.get(t);
  },
  has(e, t) {
    return t === l0 ? !0 : e.has(t);
  },
  set: St,
  deleteProperty: St,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: St,
      deleteProperty: St
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function o0(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function ur(...e) {
  let t = !1;
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    t = t || !!o && l0 in o, e[n] = typeof o == "function" ? (t = !0, J(o)) : o;
  }
  if (t)
    return new Proxy({
      get(n) {
        for (let o = e.length - 1; o >= 0; o--) {
          const l = o0(e[o])[n];
          if (l !== void 0)
            return l;
        }
      },
      has(n) {
        for (let o = e.length - 1; o >= 0; o--)
          if (n in o0(e[o]))
            return !0;
        return !1;
      },
      keys() {
        const n = [];
        for (let o = 0; o < e.length; o++)
          n.push(...Object.keys(o0(e[o])));
        return [...new Set(n)];
      }
    }, L5);
  const r = {};
  for (let n = e.length - 1; n >= 0; n--)
    if (e[n]) {
      const o = Object.getOwnPropertyDescriptors(e[n]);
      for (const l in o)
        l in r || Object.defineProperty(r, l, {
          enumerable: !0,
          get() {
            for (let d = e.length - 1; d >= 0; d--) {
              const u = (e[d] || {})[l];
              if (u !== void 0)
                return u;
            }
          }
        });
    }
  return r;
}
function c0(e) {
  const t = "fallback" in e && {
    fallback: () => e.fallback
  };
  return J(k5(() => e.each, e.children, t || void 0));
}
function q(e) {
  let t = !1;
  const r = e.keyed, n = J(() => e.when, void 0, {
    equals: (o, l) => t ? o === l : !o == !l
  });
  return J(() => {
    const o = n();
    if (o) {
      const l = e.children, d = typeof l == "function" && l.length > 0;
      return t = r || d, d ? a1(() => l(o)) : l;
    }
    return e.fallback;
  }, void 0, void 0);
}
function x5(e, t, r) {
  let n = r.length, o = t.length, l = n, d = 0, u = 0, g = t[o - 1].nextSibling, _ = null;
  for (; d < o || u < l; ) {
    if (t[d] === r[u]) {
      d++, u++;
      continue;
    }
    for (; t[o - 1] === r[l - 1]; )
      o--, l--;
    if (o === d) {
      const y = l < n ? u ? r[u - 1].nextSibling : r[l - u] : g;
      for (; u < l; )
        e.insertBefore(r[u++], y);
    } else if (l === u)
      for (; d < o; )
        (!_ || !_.has(t[d])) && t[d].remove(), d++;
    else if (t[d] === r[l - 1] && r[u] === t[o - 1]) {
      const y = t[--o].nextSibling;
      e.insertBefore(r[u++], t[d++].nextSibling), e.insertBefore(r[--l], y), t[o] = r[l];
    } else {
      if (!_) {
        _ = /* @__PURE__ */ new Map();
        let w = u;
        for (; w < l; )
          _.set(r[w], w++);
      }
      const y = _.get(t[d]);
      if (y != null)
        if (u < y && y < l) {
          let w = d, A = 1, O;
          for (; ++w < o && w < l && !((O = _.get(t[w])) == null || O !== y + A); )
            A++;
          if (A > y - u) {
            const N = t[d];
            for (; u < y; )
              e.insertBefore(r[u++], N);
          } else
            e.replaceChild(r[u++], t[d++]);
        } else
          d++;
      else
        t[d++].remove();
    }
  }
}
const p9 = "_$DX_DELEGATE";
function A5(e, t, r, n = {}) {
  let o;
  return lt((l) => {
    o = l, t === document ? e() : k(t, e(), t.firstChild ? null : void 0, r);
  }, n.owner), () => {
    o(), t.textContent = "";
  };
}
function $(e, t, r) {
  const n = document.createElement("template");
  n.innerHTML = e;
  let o = n.content.firstChild;
  return r && (o = o.firstChild), o;
}
function ze(e, t = window.document) {
  const r = t[p9] || (t[p9] = /* @__PURE__ */ new Set());
  for (let n = 0, o = e.length; n < o; n++) {
    const l = e[n];
    r.has(l) || (r.add(l), t.addEventListener(l, w5));
  }
}
function xe(e, t, r) {
  r == null ? e.removeAttribute(t) : e.setAttribute(t, r);
}
function fe(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function f1(e, t, r, n) {
  if (n)
    Array.isArray(r) ? (e[`$$${t}`] = r[0], e[`$$${t}Data`] = r[1]) : e[`$$${t}`] = r;
  else if (Array.isArray(r)) {
    const o = r[0];
    e.addEventListener(t, r[0] = (l) => o.call(e, r[1], l));
  } else
    e.addEventListener(t, r);
}
function M1(e, t, r) {
  if (!t)
    return r ? xe(e, "style") : t;
  const n = e.style;
  if (typeof t == "string")
    return n.cssText = t;
  typeof r == "string" && (n.cssText = r = void 0), r || (r = {}), t || (t = {});
  let o, l;
  for (l in r)
    t[l] == null && n.removeProperty(l), delete r[l];
  for (l in t)
    o = t[l], o !== r[l] && (n.setProperty(l, o), r[l] = o);
  return r;
}
function A1(e, t, r) {
  return a1(() => e(t, r));
}
function k(e, t, r, n) {
  if (r !== void 0 && !n && (n = []), typeof t != "function")
    return Bt(e, t, n, r);
  I((o) => Bt(e, t(), o, r), n);
}
function w5(e) {
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
  }), Le.registry && !Le.done && (Le.done = !0, document.querySelectorAll("[id^=pl-]").forEach((n) => {
    for (; n && n.nodeType !== 8 && n.nodeValue !== "pl-" + e; ) {
      let o = n.nextSibling;
      n.remove(), n = o;
    }
    n && n.remove();
  })); r; ) {
    const n = r[t];
    if (n && !r.disabled) {
      const o = r[`${t}Data`];
      if (o !== void 0 ? n.call(r, o, e) : n.call(r, e), e.cancelBubble)
        return;
    }
    r = r._$host || r.parentNode || r.host;
  }
}
function Bt(e, t, r, n, o) {
  for (Le.context && !r && (r = [...e.childNodes]); typeof r == "function"; )
    r = r();
  if (t === r)
    return r;
  const l = typeof t, d = n !== void 0;
  if (e = d && r[0] && r[0].parentNode || e, l === "string" || l === "number") {
    if (Le.context)
      return r;
    if (l === "number" && (t = t.toString()), d) {
      let u = r[0];
      u && u.nodeType === 3 ? u.data = t : u = document.createTextNode(t), r = O1(e, r, n, u);
    } else
      r !== "" && typeof r == "string" ? r = e.firstChild.data = t : r = e.textContent = t;
  } else if (t == null || l === "boolean") {
    if (Le.context)
      return r;
    r = O1(e, r, n);
  } else {
    if (l === "function")
      return I(() => {
        let u = t();
        for (; typeof u == "function"; )
          u = u();
        r = Bt(e, u, r, n);
      }), () => r;
    if (Array.isArray(t)) {
      const u = [], g = r && Array.isArray(r);
      if (u0(u, t, r, o))
        return I(() => r = Bt(e, u, r, n, !0)), () => r;
      if (Le.context) {
        if (!u.length)
          return r;
        for (let _ = 0; _ < u.length; _++)
          if (u[_].parentNode)
            return r = u;
      }
      if (u.length === 0) {
        if (r = O1(e, r, n), d)
          return r;
      } else
        g ? r.length === 0 ? C9(e, u, n) : x5(e, r, u) : (r && O1(e), C9(e, u));
      r = u;
    } else if (t instanceof Node) {
      if (Le.context && t.parentNode)
        return r = d ? [t] : t;
      if (Array.isArray(r)) {
        if (d)
          return r = O1(e, r, n, t);
        O1(e, r, null, t);
      } else
        r == null || r === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      r = t;
    }
  }
  return r;
}
function u0(e, t, r, n) {
  let o = !1;
  for (let l = 0, d = t.length; l < d; l++) {
    let u = t[l], g = r && r[l];
    if (u instanceof Node)
      e.push(u);
    else if (!(u == null || u === !0 || u === !1))
      if (Array.isArray(u))
        o = u0(e, u, g) || o;
      else if (typeof u == "function")
        if (n) {
          for (; typeof u == "function"; )
            u = u();
          o = u0(e, Array.isArray(u) ? u : [u], Array.isArray(g) ? g : [g]) || o;
        } else
          e.push(u), o = !0;
      else {
        const _ = String(u);
        g && g.nodeType === 3 && g.data === _ ? e.push(g) : e.push(document.createTextNode(_));
      }
  }
  return o;
}
function C9(e, t, r = null) {
  for (let n = 0, o = t.length; n < o; n++)
    e.insertBefore(t[n], r);
}
function O1(e, t, r, n) {
  if (r === void 0)
    return e.textContent = "";
  const o = n || document.createTextNode("");
  if (t.length) {
    let l = !1;
    for (let d = t.length - 1; d >= 0; d--) {
      const u = t[d];
      if (o !== u) {
        const g = u.parentNode === e;
        !l && !d ? g ? e.replaceChild(o, u) : e.insertBefore(o, r) : g && u.remove();
      } else
        l = !0;
    }
  } else
    e.insertBefore(o, r);
  return [o];
}
const M5 = "http://www.w3.org/2000/svg";
function S5(e, t = !1) {
  return t ? document.createElementNS(M5, e) : document.createElement(e);
}
function T5(e) {
  const {
    useShadow: t
  } = e, r = document.createTextNode(""), n = e.mount || document.body;
  function o() {
    if (Le.context) {
      const [l, d] = T(!1);
      return queueMicrotask(() => d(!0)), () => l() && e.children;
    } else
      return () => e.children;
  }
  if (n instanceof HTMLHeadElement) {
    const [l, d] = T(!1), u = () => d(!0);
    lt((g) => k(n, () => l() ? g() : o()(), null)), w1(() => {
      Le.context ? queueMicrotask(u) : u();
    });
  } else {
    const l = S5(e.isSVG ? "g" : "div", e.isSVG), d = t && l.attachShadow ? l.attachShadow({
      mode: "open"
    }) : l;
    Object.defineProperty(l, "_$host", {
      get() {
        return r.parentNode;
      },
      configurable: !0
    }), k(d, o()), n.appendChild(l), e.ref && e.ref(l), w1(() => n.removeChild(l));
  }
  return r;
}
var Tt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function dr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var P5 = typeof Tt == "object" && Tt && Tt.Object === Object && Tt, hr = P5, O5 = hr, D5 = typeof self == "object" && self && self.Object === Object && self, I5 = O5 || D5 || Function("return this")(), Xe = I5, N5 = Xe, E5 = N5.Symbol, Zt = E5, m9 = Zt, fr = Object.prototype, B5 = fr.hasOwnProperty, U5 = fr.toString, at = m9 ? m9.toStringTag : void 0;
function F5(e) {
  var t = B5.call(e, at), r = e[at];
  try {
    e[at] = void 0;
    var n = !0;
  } catch {
  }
  var o = U5.call(e);
  return n && (t ? e[at] = r : delete e[at]), o;
}
var K5 = F5, z5 = Object.prototype, j5 = z5.toString;
function Q5(e) {
  return j5.call(e);
}
var Z5 = Q5, v9 = Zt, R5 = K5, V5 = Z5, q5 = "[object Null]", H5 = "[object Undefined]", b9 = v9 ? v9.toStringTag : void 0;
function Y5(e) {
  return e == null ? e === void 0 ? H5 : q5 : b9 && b9 in Object(e) ? R5(e) : V5(e);
}
var ct = Y5;
function G5(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var I1 = G5, W5 = ct, X5 = I1, J5 = "[object AsyncFunction]", en = "[object Function]", tn = "[object GeneratorFunction]", rn = "[object Proxy]";
function nn(e) {
  if (!X5(e))
    return !1;
  var t = W5(e);
  return t == en || t == tn || t == J5 || t == rn;
}
var yr = nn, on = Xe, an = on["__core-js_shared__"], sn = an, a0 = sn, $9 = function() {
  var e = /[^.]+$/.exec(a0 && a0.keys && a0.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function ln(e) {
  return !!$9 && $9 in e;
}
var cn = ln, un = Function.prototype, dn = un.toString;
function hn(e) {
  if (e != null) {
    try {
      return dn.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var gr = hn, fn = yr, yn = cn, gn = I1, pn = gr, Cn = /[\\^$.*+?()[\]{}|]/g, mn = /^\[object .+?Constructor\]$/, vn = Function.prototype, bn = Object.prototype, $n = vn.toString, _n = bn.hasOwnProperty, kn = RegExp(
  "^" + $n.call(_n).replace(Cn, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Ln(e) {
  if (!gn(e) || yn(e))
    return !1;
  var t = fn(e) ? kn : mn;
  return t.test(pn(e));
}
var xn = Ln;
function An(e, t) {
  return e == null ? void 0 : e[t];
}
var wn = An, Mn = xn, Sn = wn;
function Tn(e, t) {
  var r = Sn(e, t);
  return Mn(r) ? r : void 0;
}
var S1 = Tn, Pn = S1, On = function() {
  try {
    var e = Pn(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), Dn = On, _9 = Dn;
function In(e, t, r) {
  t == "__proto__" && _9 ? _9(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var pr = In;
function Nn(e, t) {
  return e === t || e !== e && t !== t;
}
var Cr = Nn, En = pr, Bn = Cr, Un = Object.prototype, Fn = Un.hasOwnProperty;
function Kn(e, t, r) {
  var n = e[t];
  (!(Fn.call(e, t) && Bn(n, r)) || r === void 0 && !(t in e)) && En(e, t, r);
}
var v0 = Kn, zn = Array.isArray, N1 = zn;
function jn(e) {
  return e != null && typeof e == "object";
}
var E1 = jn, Qn = ct, Zn = E1, Rn = "[object Symbol]";
function Vn(e) {
  return typeof e == "symbol" || Zn(e) && Qn(e) == Rn;
}
var b0 = Vn, qn = N1, Hn = b0, Yn = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Gn = /^\w*$/;
function Wn(e, t) {
  if (qn(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || Hn(e) ? !0 : Gn.test(e) || !Yn.test(e) || t != null && e in Object(t);
}
var Xn = Wn, Jn = S1, e6 = Jn(Object, "create"), Rt = e6, k9 = Rt;
function t6() {
  this.__data__ = k9 ? k9(null) : {}, this.size = 0;
}
var r6 = t6;
function n6(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var i6 = n6, o6 = Rt, a6 = "__lodash_hash_undefined__", s6 = Object.prototype, l6 = s6.hasOwnProperty;
function c6(e) {
  var t = this.__data__;
  if (o6) {
    var r = t[e];
    return r === a6 ? void 0 : r;
  }
  return l6.call(t, e) ? t[e] : void 0;
}
var u6 = c6, d6 = Rt, h6 = Object.prototype, f6 = h6.hasOwnProperty;
function y6(e) {
  var t = this.__data__;
  return d6 ? t[e] !== void 0 : f6.call(t, e);
}
var g6 = y6, p6 = Rt, C6 = "__lodash_hash_undefined__";
function m6(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = p6 && t === void 0 ? C6 : t, this;
}
var v6 = m6, b6 = r6, $6 = i6, _6 = u6, k6 = g6, L6 = v6;
function B1(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
B1.prototype.clear = b6;
B1.prototype.delete = $6;
B1.prototype.get = _6;
B1.prototype.has = k6;
B1.prototype.set = L6;
var x6 = B1;
function A6() {
  this.__data__ = [], this.size = 0;
}
var w6 = A6, M6 = Cr;
function S6(e, t) {
  for (var r = e.length; r--; )
    if (M6(e[r][0], t))
      return r;
  return -1;
}
var Vt = S6, T6 = Vt, P6 = Array.prototype, O6 = P6.splice;
function D6(e) {
  var t = this.__data__, r = T6(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : O6.call(t, r, 1), --this.size, !0;
}
var I6 = D6, N6 = Vt;
function E6(e) {
  var t = this.__data__, r = N6(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var B6 = E6, U6 = Vt;
function F6(e) {
  return U6(this.__data__, e) > -1;
}
var K6 = F6, z6 = Vt;
function j6(e, t) {
  var r = this.__data__, n = z6(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
var Q6 = j6, Z6 = w6, R6 = I6, V6 = B6, q6 = K6, H6 = Q6;
function U1(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
U1.prototype.clear = Z6;
U1.prototype.delete = R6;
U1.prototype.get = V6;
U1.prototype.has = q6;
U1.prototype.set = H6;
var qt = U1, Y6 = S1, G6 = Xe, W6 = Y6(G6, "Map"), $0 = W6, L9 = x6, X6 = qt, J6 = $0;
function e2() {
  this.size = 0, this.__data__ = {
    hash: new L9(),
    map: new (J6 || X6)(),
    string: new L9()
  };
}
var t2 = e2;
function r2(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var n2 = r2, i2 = n2;
function o2(e, t) {
  var r = e.__data__;
  return i2(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var Ht = o2, a2 = Ht;
function s2(e) {
  var t = a2(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var l2 = s2, c2 = Ht;
function u2(e) {
  return c2(this, e).get(e);
}
var d2 = u2, h2 = Ht;
function f2(e) {
  return h2(this, e).has(e);
}
var y2 = f2, g2 = Ht;
function p2(e, t) {
  var r = g2(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
var C2 = p2, m2 = t2, v2 = l2, b2 = d2, $2 = y2, _2 = C2;
function F1(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
F1.prototype.clear = m2;
F1.prototype.delete = v2;
F1.prototype.get = b2;
F1.prototype.has = $2;
F1.prototype.set = _2;
var mr = F1, vr = mr, k2 = "Expected a function";
function _0(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(k2);
  var r = function() {
    var n = arguments, o = t ? t.apply(this, n) : n[0], l = r.cache;
    if (l.has(o))
      return l.get(o);
    var d = e.apply(this, n);
    return r.cache = l.set(o, d) || l, d;
  };
  return r.cache = new (_0.Cache || vr)(), r;
}
_0.Cache = vr;
var L2 = _0, x2 = L2, A2 = 500;
function w2(e) {
  var t = x2(e, function(n) {
    return r.size === A2 && r.clear(), n;
  }), r = t.cache;
  return t;
}
var M2 = w2, S2 = M2, T2 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, P2 = /\\(\\)?/g, O2 = S2(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(T2, function(r, n, o, l) {
    t.push(o ? l.replace(P2, "$1") : n || r);
  }), t;
}), D2 = O2;
function I2(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = Array(n); ++r < n; )
    o[r] = t(e[r], r, e);
  return o;
}
var N2 = I2, x9 = Zt, E2 = N2, B2 = N1, U2 = b0, F2 = 1 / 0, A9 = x9 ? x9.prototype : void 0, w9 = A9 ? A9.toString : void 0;
function br(e) {
  if (typeof e == "string")
    return e;
  if (B2(e))
    return E2(e, br) + "";
  if (U2(e))
    return w9 ? w9.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -F2 ? "-0" : t;
}
var K2 = br, z2 = K2;
function j2(e) {
  return e == null ? "" : z2(e);
}
var Q2 = j2, Z2 = N1, R2 = Xn, V2 = D2, q2 = Q2;
function H2(e, t) {
  return Z2(e) ? e : R2(e, t) ? [e] : V2(q2(e));
}
var Y2 = H2, G2 = 9007199254740991, W2 = /^(?:0|[1-9]\d*)$/;
function X2(e, t) {
  var r = typeof e;
  return t = t ?? G2, !!t && (r == "number" || r != "symbol" && W2.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var $r = X2, J2 = b0, e3 = 1 / 0;
function t3(e) {
  if (typeof e == "string" || J2(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -e3 ? "-0" : t;
}
var r3 = t3, n3 = v0, i3 = Y2, o3 = $r, M9 = I1, a3 = r3;
function s3(e, t, r, n) {
  if (!M9(e))
    return e;
  t = i3(t, e);
  for (var o = -1, l = t.length, d = l - 1, u = e; u != null && ++o < l; ) {
    var g = a3(t[o]), _ = r;
    if (g === "__proto__" || g === "constructor" || g === "prototype")
      return e;
    if (o != d) {
      var y = u[g];
      _ = n ? n(y, g, u) : void 0, _ === void 0 && (_ = M9(y) ? y : o3(t[o + 1]) ? [] : {});
    }
    n3(u, g, _), u = u[g];
  }
  return e;
}
var l3 = s3, c3 = l3;
function u3(e, t, r) {
  return e == null ? e : c3(e, t, r);
}
var d3 = u3;
const d0 = /* @__PURE__ */ dr(d3);
var h3 = qt;
function f3() {
  this.__data__ = new h3(), this.size = 0;
}
var y3 = f3;
function g3(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
var p3 = g3;
function C3(e) {
  return this.__data__.get(e);
}
var m3 = C3;
function v3(e) {
  return this.__data__.has(e);
}
var b3 = v3, $3 = qt, _3 = $0, k3 = mr, L3 = 200;
function x3(e, t) {
  var r = this.__data__;
  if (r instanceof $3) {
    var n = r.__data__;
    if (!_3 || n.length < L3 - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new k3(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
var A3 = x3, w3 = qt, M3 = y3, S3 = p3, T3 = m3, P3 = b3, O3 = A3;
function K1(e) {
  var t = this.__data__ = new w3(e);
  this.size = t.size;
}
K1.prototype.clear = M3;
K1.prototype.delete = S3;
K1.prototype.get = T3;
K1.prototype.has = P3;
K1.prototype.set = O3;
var D3 = K1;
function I3(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var N3 = I3, E3 = v0, B3 = pr;
function U3(e, t, r, n) {
  var o = !r;
  r || (r = {});
  for (var l = -1, d = t.length; ++l < d; ) {
    var u = t[l], g = n ? n(r[u], e[u], u, r, e) : void 0;
    g === void 0 && (g = e[u]), o ? B3(r, u, g) : E3(r, u, g);
  }
  return r;
}
var Yt = U3;
function F3(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var K3 = F3, z3 = ct, j3 = E1, Q3 = "[object Arguments]";
function Z3(e) {
  return j3(e) && z3(e) == Q3;
}
var R3 = Z3, S9 = R3, V3 = E1, _r = Object.prototype, q3 = _r.hasOwnProperty, H3 = _r.propertyIsEnumerable, Y3 = S9(function() {
  return arguments;
}()) ? S9 : function(e) {
  return V3(e) && q3.call(e, "callee") && !H3.call(e, "callee");
}, G3 = Y3, Ut = { exports: {} };
function W3() {
  return !1;
}
var X3 = W3;
Ut.exports;
(function(e, t) {
  var r = Xe, n = X3, o = t && !t.nodeType && t, l = o && !0 && e && !e.nodeType && e, d = l && l.exports === o, u = d ? r.Buffer : void 0, g = u ? u.isBuffer : void 0, _ = g || n;
  e.exports = _;
})(Ut, Ut.exports);
var kr = Ut.exports, J3 = 9007199254740991;
function e8(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= J3;
}
var Lr = e8, t8 = ct, r8 = Lr, n8 = E1, i8 = "[object Arguments]", o8 = "[object Array]", a8 = "[object Boolean]", s8 = "[object Date]", l8 = "[object Error]", c8 = "[object Function]", u8 = "[object Map]", d8 = "[object Number]", h8 = "[object Object]", f8 = "[object RegExp]", y8 = "[object Set]", g8 = "[object String]", p8 = "[object WeakMap]", C8 = "[object ArrayBuffer]", m8 = "[object DataView]", v8 = "[object Float32Array]", b8 = "[object Float64Array]", $8 = "[object Int8Array]", _8 = "[object Int16Array]", k8 = "[object Int32Array]", L8 = "[object Uint8Array]", x8 = "[object Uint8ClampedArray]", A8 = "[object Uint16Array]", w8 = "[object Uint32Array]", se = {};
se[v8] = se[b8] = se[$8] = se[_8] = se[k8] = se[L8] = se[x8] = se[A8] = se[w8] = !0;
se[i8] = se[o8] = se[C8] = se[a8] = se[m8] = se[s8] = se[l8] = se[c8] = se[u8] = se[d8] = se[h8] = se[f8] = se[y8] = se[g8] = se[p8] = !1;
function M8(e) {
  return n8(e) && r8(e.length) && !!se[t8(e)];
}
var S8 = M8;
function T8(e) {
  return function(t) {
    return e(t);
  };
}
var k0 = T8, Ft = { exports: {} };
Ft.exports;
(function(e, t) {
  var r = hr, n = t && !t.nodeType && t, o = n && !0 && e && !e.nodeType && e, l = o && o.exports === n, d = l && r.process, u = function() {
    try {
      var g = o && o.require && o.require("util").types;
      return g || d && d.binding && d.binding("util");
    } catch {
    }
  }();
  e.exports = u;
})(Ft, Ft.exports);
var L0 = Ft.exports, P8 = S8, O8 = k0, T9 = L0, P9 = T9 && T9.isTypedArray, D8 = P9 ? O8(P9) : P8, I8 = D8, N8 = K3, E8 = G3, B8 = N1, U8 = kr, F8 = $r, K8 = I8, z8 = Object.prototype, j8 = z8.hasOwnProperty;
function Q8(e, t) {
  var r = B8(e), n = !r && E8(e), o = !r && !n && U8(e), l = !r && !n && !o && K8(e), d = r || n || o || l, u = d ? N8(e.length, String) : [], g = u.length;
  for (var _ in e)
    (t || j8.call(e, _)) && !(d && // Safari 9 has enumerable `arguments.length` in strict mode.
    (_ == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    o && (_ == "offset" || _ == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    l && (_ == "buffer" || _ == "byteLength" || _ == "byteOffset") || // Skip index properties.
    F8(_, g))) && u.push(_);
  return u;
}
var xr = Q8, Z8 = Object.prototype;
function R8(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || Z8;
  return e === r;
}
var x0 = R8;
function V8(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var Ar = V8, q8 = Ar, H8 = q8(Object.keys, Object), Y8 = H8, G8 = x0, W8 = Y8, X8 = Object.prototype, J8 = X8.hasOwnProperty;
function e7(e) {
  if (!G8(e))
    return W8(e);
  var t = [];
  for (var r in Object(e))
    J8.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
var t7 = e7, r7 = yr, n7 = Lr;
function i7(e) {
  return e != null && n7(e.length) && !r7(e);
}
var wr = i7, o7 = xr, a7 = t7, s7 = wr;
function l7(e) {
  return s7(e) ? o7(e) : a7(e);
}
var A0 = l7, c7 = Yt, u7 = A0;
function d7(e, t) {
  return e && c7(t, u7(t), e);
}
var h7 = d7;
function f7(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var y7 = f7, g7 = I1, p7 = x0, C7 = y7, m7 = Object.prototype, v7 = m7.hasOwnProperty;
function b7(e) {
  if (!g7(e))
    return C7(e);
  var t = p7(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !v7.call(e, n)) || r.push(n);
  return r;
}
var $7 = b7, _7 = xr, k7 = $7, L7 = wr;
function x7(e) {
  return L7(e) ? _7(e, !0) : k7(e);
}
var w0 = x7, A7 = Yt, w7 = w0;
function M7(e, t) {
  return e && A7(t, w7(t), e);
}
var S7 = M7, Kt = { exports: {} };
Kt.exports;
(function(e, t) {
  var r = Xe, n = t && !t.nodeType && t, o = n && !0 && e && !e.nodeType && e, l = o && o.exports === n, d = l ? r.Buffer : void 0, u = d ? d.allocUnsafe : void 0;
  function g(_, y) {
    if (y)
      return _.slice();
    var w = _.length, A = u ? u(w) : new _.constructor(w);
    return _.copy(A), A;
  }
  e.exports = g;
})(Kt, Kt.exports);
var T7 = Kt.exports;
function P7(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
var O7 = P7;
function D7(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = 0, l = []; ++r < n; ) {
    var d = e[r];
    t(d, r, e) && (l[o++] = d);
  }
  return l;
}
var I7 = D7;
function N7() {
  return [];
}
var Mr = N7, E7 = I7, B7 = Mr, U7 = Object.prototype, F7 = U7.propertyIsEnumerable, O9 = Object.getOwnPropertySymbols, K7 = O9 ? function(e) {
  return e == null ? [] : (e = Object(e), E7(O9(e), function(t) {
    return F7.call(e, t);
  }));
} : B7, M0 = K7, z7 = Yt, j7 = M0;
function Q7(e, t) {
  return z7(e, j7(e), t);
}
var Z7 = Q7;
function R7(e, t) {
  for (var r = -1, n = t.length, o = e.length; ++r < n; )
    e[o + r] = t[r];
  return e;
}
var Sr = R7, V7 = Ar, q7 = V7(Object.getPrototypeOf, Object), Tr = q7, H7 = Sr, Y7 = Tr, G7 = M0, W7 = Mr, X7 = Object.getOwnPropertySymbols, J7 = X7 ? function(e) {
  for (var t = []; e; )
    H7(t, G7(e)), e = Y7(e);
  return t;
} : W7, Pr = J7, ei = Yt, ti = Pr;
function ri(e, t) {
  return ei(e, ti(e), t);
}
var ni = ri, ii = Sr, oi = N1;
function ai(e, t, r) {
  var n = t(e);
  return oi(e) ? n : ii(n, r(e));
}
var Or = ai, si = Or, li = M0, ci = A0;
function ui(e) {
  return si(e, ci, li);
}
var di = ui, hi = Or, fi = Pr, yi = w0;
function gi(e) {
  return hi(e, yi, fi);
}
var pi = gi, Ci = S1, mi = Xe, vi = Ci(mi, "DataView"), bi = vi, $i = S1, _i = Xe, ki = $i(_i, "Promise"), Li = ki, xi = S1, Ai = Xe, wi = xi(Ai, "Set"), Mi = wi, Si = S1, Ti = Xe, Pi = Si(Ti, "WeakMap"), Oi = Pi, h0 = bi, f0 = $0, y0 = Li, g0 = Mi, p0 = Oi, Dr = ct, z1 = gr, D9 = "[object Map]", Di = "[object Object]", I9 = "[object Promise]", N9 = "[object Set]", E9 = "[object WeakMap]", B9 = "[object DataView]", Ii = z1(h0), Ni = z1(f0), Ei = z1(y0), Bi = z1(g0), Ui = z1(p0), L1 = Dr;
(h0 && L1(new h0(new ArrayBuffer(1))) != B9 || f0 && L1(new f0()) != D9 || y0 && L1(y0.resolve()) != I9 || g0 && L1(new g0()) != N9 || p0 && L1(new p0()) != E9) && (L1 = function(e) {
  var t = Dr(e), r = t == Di ? e.constructor : void 0, n = r ? z1(r) : "";
  if (n)
    switch (n) {
      case Ii:
        return B9;
      case Ni:
        return D9;
      case Ei:
        return I9;
      case Bi:
        return N9;
      case Ui:
        return E9;
    }
  return t;
});
var S0 = L1, Fi = Object.prototype, Ki = Fi.hasOwnProperty;
function zi(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && Ki.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
var ji = zi, Qi = Xe, Zi = Qi.Uint8Array, Ri = Zi, U9 = Ri;
function Vi(e) {
  var t = new e.constructor(e.byteLength);
  return new U9(t).set(new U9(e)), t;
}
var T0 = Vi, qi = T0;
function Hi(e, t) {
  var r = t ? qi(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var Yi = Hi, Gi = /\w*$/;
function Wi(e) {
  var t = new e.constructor(e.source, Gi.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var Xi = Wi, F9 = Zt, K9 = F9 ? F9.prototype : void 0, z9 = K9 ? K9.valueOf : void 0;
function Ji(e) {
  return z9 ? Object(z9.call(e)) : {};
}
var eo = Ji, to = T0;
function ro(e, t) {
  var r = t ? to(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
var no = ro, io = T0, oo = Yi, ao = Xi, so = eo, lo = no, co = "[object Boolean]", uo = "[object Date]", ho = "[object Map]", fo = "[object Number]", yo = "[object RegExp]", go = "[object Set]", po = "[object String]", Co = "[object Symbol]", mo = "[object ArrayBuffer]", vo = "[object DataView]", bo = "[object Float32Array]", $o = "[object Float64Array]", _o = "[object Int8Array]", ko = "[object Int16Array]", Lo = "[object Int32Array]", xo = "[object Uint8Array]", Ao = "[object Uint8ClampedArray]", wo = "[object Uint16Array]", Mo = "[object Uint32Array]";
function So(e, t, r) {
  var n = e.constructor;
  switch (t) {
    case mo:
      return io(e);
    case co:
    case uo:
      return new n(+e);
    case vo:
      return oo(e, r);
    case bo:
    case $o:
    case _o:
    case ko:
    case Lo:
    case xo:
    case Ao:
    case wo:
    case Mo:
      return lo(e, r);
    case ho:
      return new n();
    case fo:
    case po:
      return new n(e);
    case yo:
      return ao(e);
    case go:
      return new n();
    case Co:
      return so(e);
  }
}
var To = So, Po = I1, j9 = Object.create, Oo = function() {
  function e() {
  }
  return function(t) {
    if (!Po(t))
      return {};
    if (j9)
      return j9(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}(), Do = Oo, Io = Do, No = Tr, Eo = x0;
function Bo(e) {
  return typeof e.constructor == "function" && !Eo(e) ? Io(No(e)) : {};
}
var Uo = Bo, Fo = S0, Ko = E1, zo = "[object Map]";
function jo(e) {
  return Ko(e) && Fo(e) == zo;
}
var Qo = jo, Zo = Qo, Ro = k0, Q9 = L0, Z9 = Q9 && Q9.isMap, Vo = Z9 ? Ro(Z9) : Zo, qo = Vo, Ho = S0, Yo = E1, Go = "[object Set]";
function Wo(e) {
  return Yo(e) && Ho(e) == Go;
}
var Xo = Wo, Jo = Xo, ea = k0, R9 = L0, V9 = R9 && R9.isSet, ta = V9 ? ea(V9) : Jo, ra = ta, na = D3, ia = N3, oa = v0, aa = h7, sa = S7, la = T7, ca = O7, ua = Z7, da = ni, ha = di, fa = pi, ya = S0, ga = ji, pa = To, Ca = Uo, ma = N1, va = kr, ba = qo, $a = I1, _a = ra, ka = A0, La = w0, xa = 1, Aa = 2, wa = 4, Ir = "[object Arguments]", Ma = "[object Array]", Sa = "[object Boolean]", Ta = "[object Date]", Pa = "[object Error]", Nr = "[object Function]", Oa = "[object GeneratorFunction]", Da = "[object Map]", Ia = "[object Number]", Er = "[object Object]", Na = "[object RegExp]", Ea = "[object Set]", Ba = "[object String]", Ua = "[object Symbol]", Fa = "[object WeakMap]", Ka = "[object ArrayBuffer]", za = "[object DataView]", ja = "[object Float32Array]", Qa = "[object Float64Array]", Za = "[object Int8Array]", Ra = "[object Int16Array]", Va = "[object Int32Array]", qa = "[object Uint8Array]", Ha = "[object Uint8ClampedArray]", Ya = "[object Uint16Array]", Ga = "[object Uint32Array]", oe = {};
oe[Ir] = oe[Ma] = oe[Ka] = oe[za] = oe[Sa] = oe[Ta] = oe[ja] = oe[Qa] = oe[Za] = oe[Ra] = oe[Va] = oe[Da] = oe[Ia] = oe[Er] = oe[Na] = oe[Ea] = oe[Ba] = oe[Ua] = oe[qa] = oe[Ha] = oe[Ya] = oe[Ga] = !0;
oe[Pa] = oe[Nr] = oe[Fa] = !1;
function Ot(e, t, r, n, o, l) {
  var d, u = t & xa, g = t & Aa, _ = t & wa;
  if (r && (d = o ? r(e, n, o, l) : r(e)), d !== void 0)
    return d;
  if (!$a(e))
    return e;
  var y = ma(e);
  if (y) {
    if (d = ga(e), !u)
      return ca(e, d);
  } else {
    var w = ya(e), A = w == Nr || w == Oa;
    if (va(e))
      return la(e, u);
    if (w == Er || w == Ir || A && !o) {
      if (d = g || A ? {} : Ca(e), !u)
        return g ? da(e, sa(d, e)) : ua(e, aa(d, e));
    } else {
      if (!oe[w])
        return o ? e : {};
      d = pa(e, w, u);
    }
  }
  l || (l = new na());
  var O = l.get(e);
  if (O)
    return O;
  l.set(e, d), _a(e) ? e.forEach(function(K) {
    d.add(Ot(K, t, r, K, e, l));
  }) : ba(e) && e.forEach(function(K, X) {
    d.set(X, Ot(K, t, r, X, e, l));
  });
  var N = _ ? g ? fa : ha : g ? La : ka, F = y ? void 0 : N(e);
  return ia(F || e, function(K, X) {
    F && (X = K, K = e[X]), oa(d, X, Ot(K, t, r, X, e, l));
  }), d;
}
var Wa = Ot, Xa = Wa, Ja = 1, es = 4;
function ts(e) {
  return Xa(e, Ja | es);
}
var rs = ts;
const ns = /* @__PURE__ */ dr(rs), is = /* @__PURE__ */ $("<button></button>"), os = (e) => (() => {
  const t = is.cloneNode(!0);
  return f1(t, "click", e.onClick, !0), k(t, () => e.children), I((r) => {
    const n = e.style, o = `klinecharts-pro-button ${e.type ?? "confirm"} ${e.class ?? ""}`;
    return r._v$ = M1(t, n, r._v$), o !== r._v$2 && fe(t, r._v$2 = o), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
ze(["click"]);
const as = /* @__PURE__ */ $('<svg viewBox="0 0 1024 1024" class="icon"><path d="M810.666667 128H213.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v597.333334c0 46.933333 38.4 85.333333 85.333333 85.333333h597.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V213.333333c0-46.933333-38.4-85.333333-85.333333-85.333333z m-353.706667 567.04a42.496 42.496 0 0 1-60.16 0L243.626667 541.866667c-8.106667-8.106667-12.373333-18.773333-12.373334-29.866667s4.693333-22.186667 12.373334-29.866667a42.496 42.496 0 0 1 60.16 0L426.666667 604.586667l293.546666-293.546667a42.496 42.496 0 1 1 60.16 60.16l-323.413333 323.84z"></path></svg>'), ss = /* @__PURE__ */ $('<svg viewBox="0 0 1024 1024" class="icon"><path d="M245.333333 128h533.333334A117.333333 117.333333 0 0 1 896 245.333333v533.333334A117.333333 117.333333 0 0 1 778.666667 896H245.333333A117.333333 117.333333 0 0 1 128 778.666667V245.333333A117.333333 117.333333 0 0 1 245.333333 128z m0 64c-29.44 0-53.333333 23.893333-53.333333 53.333333v533.333334c0 29.44 23.893333 53.333333 53.333333 53.333333h533.333334c29.44 0 53.333333-23.893333 53.333333-53.333333V245.333333c0-29.44-23.893333-53.333333-53.333333-53.333333H245.333333z"></path></svg>'), ls = /* @__PURE__ */ $("<div></div>"), cs = /* @__PURE__ */ $('<span class="label"></span>'), us = () => as.cloneNode(!0), ds = () => ss.cloneNode(!0), q9 = (e) => {
  const [t, r] = T(e.checked ?? !1);
  return Ne(() => {
    "checked" in e && r(e.checked);
  }), (() => {
    const n = ls.cloneNode(!0);
    return n.$$click = (o) => {
      const l = !t();
      e.onChange && e.onChange(l), r(l);
    }, k(n, (() => {
      const o = J(() => !!t());
      return () => o() ? L(us, {}) : L(ds, {});
    })(), null), k(n, (() => {
      const o = J(() => !!e.label);
      return () => o() && (() => {
        const l = cs.cloneNode(!0);
        return k(l, () => e.label), l;
      })();
    })(), null), I((o) => {
      const l = e.style, d = `klinecharts-pro-checkbox ${t() && "checked" || ""} ${e.class || ""}`;
      return o._v$ = M1(n, l, o._v$), d !== o._v$2 && fe(n, o._v$2 = d), o;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), n;
  })();
};
ze(["click"]);
const hs = /* @__PURE__ */ $('<div class="klinecharts-pro-loading"><i class="circle1"></i><i class="circle2"></i><i class="circle3"></i></div>'), Br = () => hs.cloneNode(!0), fs = /* @__PURE__ */ $('<div class="klinecharts-pro-empty"><svg class="icon" viewBox="0 0 1024 1024"><path d="M855.6 427.2H168.5c-12.7 0-24.4 6.9-30.6 18L4.4 684.7C1.5 689.9 0 695.8 0 701.8v287.1c0 19.4 15.7 35.1 35.1 35.1H989c19.4 0 35.1-15.7 35.1-35.1V701.8c0-6-1.5-11.8-4.4-17.1L886.2 445.2c-6.2-11.1-17.9-18-30.6-18zM673.4 695.6c-16.5 0-30.8 11.5-34.3 27.7-12.7 58.5-64.8 102.3-127.2 102.3s-114.5-43.8-127.2-102.3c-3.5-16.1-17.8-27.7-34.3-27.7H119c-26.4 0-43.3-28-31.1-51.4l81.7-155.8c6.1-11.6 18-18.8 31.1-18.8h622.4c13 0 25 7.2 31.1 18.8l81.7 155.8c12.2 23.4-4.7 51.4-31.1 51.4H673.4zM819.9 209.5c-1-1.8-2.1-3.7-3.2-5.5-9.8-16.6-31.1-22.2-47.8-12.6L648.5 261c-17 9.8-22.7 31.6-12.6 48.4 0.9 1.4 1.7 2.9 2.5 4.4 9.5 17 31.2 22.8 48 13L807 257.3c16.7-9.7 22.4-31 12.9-47.8zM375.4 261.1L255 191.6c-16.7-9.6-38-4-47.8 12.6-1.1 1.8-2.1 3.6-3.2 5.5-9.5 16.8-3.8 38.1 12.9 47.8L337.3 327c16.9 9.7 38.6 4 48-13.1 0.8-1.5 1.7-2.9 2.5-4.4 10.2-16.8 4.5-38.6-12.4-48.4zM512 239.3h2.5c19.5 0.3 35.5-15.5 35.5-35.1v-139c0-19.3-15.6-34.9-34.8-35.1h-6.4C489.6 30.3 474 46 474 65.2v139c0 19.5 15.9 35.4 35.5 35.1h2.5z"></path></svg></div>'), ys = () => fs.cloneNode(!0), gs = /* @__PURE__ */ $("<ul></ul>"), ps = /* @__PURE__ */ $("<li></li>"), zt = (e) => (() => {
  const t = gs.cloneNode(!0);
  return k(t, L(q, {
    get when() {
      return e.loading;
    },
    get children() {
      return L(Br, {});
    }
  }), null), k(t, L(q, {
    get when() {
      var r;
      return !e.loading && !e.children && !((r = e.dataSource) != null && r.length);
    },
    get children() {
      return L(ys, {});
    }
  }), null), k(t, L(q, {
    get when() {
      return e.children;
    },
    get children() {
      return e.children;
    }
  }), null), k(t, L(q, {
    get when() {
      return !e.children;
    },
    get children() {
      var r;
      return (r = e.dataSource) == null ? void 0 : r.map((n) => {
        var o;
        return ((o = e.renderItem) == null ? void 0 : o.call(e, n)) ?? ps.cloneNode(!0);
      });
    }
  }), null), I((r) => {
    const n = e.style, o = `klinecharts-pro-list ${e.class ?? ""}`;
    return r._v$ = M1(t, n, r._v$), o !== r._v$2 && fe(t, r._v$2 = o), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})(), Cs = /* @__PURE__ */ $('<div class="klinecharts-pro-modal"><div class="inner"><div class="title-container"><svg class="close-icon" viewBox="0 0 1024 1024"><path d="M934.184927 199.723787 622.457206 511.452531l311.727721 311.703161c14.334473 14.229073 23.069415 33.951253 23.069415 55.743582 0 43.430138-35.178197 78.660524-78.735226 78.660524-21.664416 0-41.361013-8.865925-55.642275-23.069415L511.149121 622.838388 199.420377 934.490384c-14.204513 14.20349-33.901111 23.069415-55.642275 23.069415-43.482327 0-78.737272-35.230386-78.737272-78.660524 0-21.792329 8.864902-41.513486 23.094998-55.743582l311.677579-311.703161L88.135828 199.723787c-14.230096-14.255679-23.094998-33.92567-23.094998-55.642275 0-43.430138 35.254945-78.762855 78.737272-78.762855 21.741163 0 41.437761 8.813736 55.642275 23.069415l311.727721 311.727721L822.876842 88.389096c14.281261-14.255679 33.977859-23.069415 55.642275-23.069415 43.557028 0 78.735226 35.332716 78.735226 78.762855C957.254342 165.798117 948.5194 185.468109 934.184927 199.723787"></path></svg></div><div class="content-container"></div></div></div>'), ms = /* @__PURE__ */ $('<div class="button-container"></div>'), T1 = (e) => (() => {
  const t = Cs.cloneNode(!0), r = t.firstChild, n = r.firstChild, o = n.firstChild, l = n.nextSibling;
  return t.$$click = (d) => {
    d.target === d.currentTarget && e.onClose && e.onClose();
  }, k(n, () => e.title, o), f1(o, "click", e.onClose, !0), k(l, () => e.children), k(r, (() => {
    const d = J(() => !!(e.buttons && e.buttons.length > 0));
    return () => d() && (() => {
      const u = ms.cloneNode(!0);
      return k(u, () => e.buttons.map((g) => L(os, ur(g, {
        get style() {
          return {
            ...e.minButtonWidth ? {
              "min-width": `${e.minButtonWidth}px`
            } : {},
            width: e.isMobile ? "100%" : "auto"
          };
        },
        get children() {
          return g.children;
        }
      })))), I((g) => {
        const _ = e.btnParentStyle, y = !!e.isMobile;
        return g._v$8 = M1(u, _, g._v$8), y !== g._v$9 && u.classList.toggle("mobile-buttons", g._v$9 = y), g;
      }, {
        _v$8: void 0,
        _v$9: void 0
      }), u;
    })();
  })(), null), I((d) => {
    const u = !!e.isMobile, g = e.isMobile ? "100%" : `${e.width ?? 400}px`, _ = (e.isMobile, "auto"), y = e.isMobile ? "60vh" : "90vh", w = !!e.isMobile, A = !!e.isMobile, O = !!e.isMobile;
    return u !== d._v$ && t.classList.toggle("mobile-modal", d._v$ = u), g !== d._v$2 && r.style.setProperty("width", d._v$2 = g), _ !== d._v$3 && r.style.setProperty("height", d._v$3 = _), y !== d._v$4 && r.style.setProperty("max-height", d._v$4 = y), w !== d._v$5 && r.classList.toggle("mobile-inner", d._v$5 = w), A !== d._v$6 && n.classList.toggle("mobile-title", d._v$6 = A), O !== d._v$7 && l.classList.toggle("mobile-content", d._v$7 = O), d;
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
ze(["click"]);
const vs = /* @__PURE__ */ $('<div tabindex="0"><div class="selector-container"><span class="value"></span><i class="arrow"></i></div></div>'), bs = /* @__PURE__ */ $('<div class="drop-down-container"><ul></ul></div>'), $s = /* @__PURE__ */ $('<div><input type="text"></div>'), _s = /* @__PURE__ */ $("<li></li>"), Ur = (e) => {
  const [t, r] = T(!1), [n, o] = T("");
  let l, d;
  const u = J(() => {
    if (!e.dataSource || !e.searchable)
      return e.dataSource;
    const y = n().toLowerCase().trim();
    return y ? typeof e.dataSource[0] == "string" ? e.dataSource.filter((A) => A.toLowerCase().includes(y)) : e.dataSource.filter((A) => {
      var F, K;
      const O = ((F = A.text) == null ? void 0 : F.toString().toLowerCase()) || "", N = ((K = A.key) == null ? void 0 : K.toLowerCase()) || "";
      return O.includes(y) || N.includes(y);
    }) : e.dataSource;
  }), g = () => {
    const y = !t();
    r(y), o(""), y && e.searchable && setTimeout(() => l == null ? void 0 : l.focus(), 50);
  }, _ = (y) => {
    const w = y.relatedTarget;
    d && w && d.contains(w) || (r(!1), o(""));
  };
  return (() => {
    const y = vs.cloneNode(!0), w = y.firstChild, A = w.firstChild;
    y.addEventListener("blur", _), y.$$click = (N) => {
      N.stopPropagation(), g();
    };
    const O = d;
    return typeof O == "function" ? A1(O, y) : d = y, k(A, () => e.value), k(y, (() => {
      const N = J(() => !!(e.dataSource && e.dataSource.length > 0));
      return () => N() && (() => {
        const F = bs.cloneNode(!0), K = F.firstChild;
        return F.$$mousedown = (X) => X.preventDefault(), k(F, (() => {
          const X = J(() => !!e.searchable);
          return () => X() && (() => {
            const W = $s.cloneNode(!0), B = W.firstChild;
            W.style.setProperty("padding", "8px"), W.style.setProperty("border-bottom", "1px solid #333"), B.$$click = (z) => z.stopPropagation(), B.$$input = (z) => o(z.currentTarget.value);
            const R = l;
            return typeof R == "function" ? A1(R, B) : l = B, B.style.setProperty("width", "100%"), B.style.setProperty("padding", "6px 10px"), B.style.setProperty("border", "1px solid var(--klinecharts-pro-border-color)"), B.style.setProperty("border-radius", "4px"), B.style.setProperty("background-color", "var(--klinecharts-pro-popover-background-color)"), B.style.setProperty("color", "#fff"), B.style.setProperty("font-size", "13px"), B.style.setProperty("outline", "none"), I(() => xe(B, "placeholder", e.searchPlaceholder || "Search...")), I(() => B.value = n()), W;
          })();
        })(), K), k(K, () => {
          var X;
          return (X = u()) == null ? void 0 : X.map((W) => {
            const R = W[e.valueKey ?? "text"] ?? W;
            return (() => {
              const z = _s.cloneNode(!0);
              return z.$$click = (Pe) => {
                var Oe;
                Pe.stopPropagation(), e.value !== R && ((Oe = e.onSelected) == null || Oe.call(e, W)), r(!1), o("");
              }, k(z, R), I(() => z.classList.toggle("selected", e.value === R)), z;
            })();
          });
        }), F;
      })();
    })(), null), I((N) => {
      const F = e.style, K = `klinecharts-pro-select ${e.class ?? ""} ${t() ? "klinecharts-pro-select-show" : ""}`;
      return N._v$ = M1(y, F, N._v$), K !== N._v$2 && fe(y, N._v$2 = K), N;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), y;
  })();
};
ze(["click", "mousedown", "input"]);
const ks = /* @__PURE__ */ $('<span class="prefix"></span>'), Ls = /* @__PURE__ */ $('<span class="suffix"></span>'), xs = /* @__PURE__ */ $('<div><input class="value"></div>'), Fr = (e) => {
  const t = ur({
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER
  }, e);
  let r;
  const [n, o] = T("normal");
  return (() => {
    const l = xs.cloneNode(!0), d = l.firstChild;
    return l.$$click = () => {
      r == null || r.focus();
    }, k(l, L(q, {
      get when() {
        return t.prefix;
      },
      get children() {
        const u = ks.cloneNode(!0);
        return k(u, () => t.prefix), u;
      }
    }), d), d.addEventListener("change", (u) => {
      var _, y;
      const g = u.target.value;
      if ("precision" in t) {
        let w;
        const A = Math.max(0, Math.floor(t.precision));
        A <= 0 ? w = new RegExp(/^[1-9]\d*$/) : w = new RegExp("^\\d+\\.?\\d{0," + A + "}$"), (g === "" || w.test(g) && +g >= t.min && +g <= t.max) && ((_ = t.onChange) == null || _.call(t, g === "" ? g : +g));
      } else
        (y = t.onChange) == null || y.call(t, g);
    }), d.addEventListener("blur", () => {
      o("normal");
    }), d.addEventListener("focus", () => {
      o("focus");
    }), A1((u) => {
      r = u;
    }, d), k(l, L(q, {
      get when() {
        return t.suffix;
      },
      get children() {
        const u = Ls.cloneNode(!0);
        return k(u, () => t.suffix), u;
      }
    }), null), I((u) => {
      const g = t.style, _ = `klinecharts-pro-input ${t.class ?? ""}`, y = n(), w = t.placeholder ?? "";
      return u._v$ = M1(l, g, u._v$), _ !== u._v$2 && fe(l, u._v$2 = _), y !== u._v$3 && xe(l, "data-status", u._v$3 = y), w !== u._v$4 && xe(d, "placeholder", u._v$4 = w), u;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0
    }), I(() => d.value = t.value), l;
  })();
};
ze(["click"]);
const As = /* @__PURE__ */ $('<div><i class="thumb"></i></div>'), ws = (e) => (() => {
  const t = As.cloneNode(!0);
  return t.$$click = (r) => {
    e.onChange && e.onChange();
  }, I((r) => {
    const n = e.style, o = `klinecharts-pro-switch ${e.open ? "turn-on" : "turn-off"} ${e.class ?? ""}`;
    return r._v$ = M1(t, n, r._v$), o !== r._v$2 && fe(t, r._v$2 = o), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
ze(["click"]);
const Ms = "指标", Ss = "更多", Ts = "主图指标", Ps = "副图指标", Os = "设置", Ds = "时区", Is = "截屏", Ns = "全屏", Es = "退出全屏", Bs = "保存", Us = "确定", Fs = "取消", Ks = "MA(移动平均线)", zs = "EMA(指数平滑移动平均线)", js = "SMA", Qs = "BOLL(布林线)", Zs = "BBI(多空指数)", Rs = "SAR(停损点指向指标)", Vs = "VOL(成交量)", qs = "MACD(指数平滑异同移动平均线)", Hs = "KDJ(随机指标)", Ys = "RSI(相对强弱指标)", Gs = "BIAS(乖离率)", Ws = "BRAR(情绪指标)", Xs = "CCI(顺势指标)", Js = "DMI(动向指标)", e4 = "CR(能量指标)", t4 = "PSY(心理线)", r4 = "DMA(平行线差指标)", n4 = "TRIX(三重指数平滑平均线)", i4 = "OBV(能量潮指标)", o4 = "VR(成交量变异率)", a4 = "WR(威廉指标)", s4 = "MTM(动量指标)", l4 = "EMV(简易波动指标)", c4 = "ROC(变动率指标)", u4 = "PVT(价量趋势指标)", d4 = "AO(动量震荡指标)", h4 = "世界统一时间", f4 = "(UTC-10) 檀香山", y4 = "(UTC-8) 朱诺", g4 = "(UTC-7) 洛杉矶", p4 = "(UTC-5) 芝加哥", C4 = "(UTC-4) 多伦多", m4 = "(UTC-3) 圣保罗", v4 = "(UTC+1) 伦敦", b4 = "(UTC+2) 柏林", $4 = "(UTC+3) 巴林", _4 = "(UTC+4) 迪拜", k4 = "(UTC+5) 阿什哈巴德", L4 = "(UTC+6) 阿拉木图", x4 = "(UTC+7) 曼谷", A4 = "(UTC+8) 上海", w4 = "(UTC+9) 东京", M4 = "(UTC+10) 悉尼", S4 = "(UTC+12) 诺福克岛", T4 = "水平直线", P4 = "水平射线", O4 = "水平线段", D4 = "垂直直线", I4 = "垂直射线", N4 = "垂直线段", E4 = "直线", B4 = "射线", U4 = "线段", F4 = "箭头", K4 = "价格线", z4 = "价格通道线", j4 = "平行直线", Q4 = "斐波那契回调直线", Z4 = "斐波那契回调线段", R4 = "斐波那契圆环", V4 = "斐波那契螺旋", q4 = "斐波那契速度阻力扇", H4 = "斐波那契趋势扩展", Y4 = "江恩箱", G4 = "矩形", W4 = "平行四边形", X4 = "圆", J4 = "三角形", el = "三浪", tl = "五浪", rl = "八浪", nl = "任意浪", il = "ABCD形态", ol = "XABCD形态", al = "弱磁模式", sl = "强磁模式", ll = "商品搜索", cl = "商品代码", ul = "参数1", dl = "参数2", hl = "参数3", fl = "参数4", yl = "参数5", gl = "周期", pl = "标准差", Cl = "蜡烛图类型", ml = "全实心", vl = "全空心", bl = "涨空心", $l = "跌空心", _l = "OHLC", kl = "面积图", Ll = "最新价显示", xl = "最高价显示", Al = "最低价显示", wl = "指标最新值显示", Ml = "价格轴类型", Sl = "线性轴", Tl = "百分比轴", Pl = "对数轴", Ol = "倒置坐标", Dl = "网格线显示", Il = "恢复默认", Nl = {
  indicator: Ms,
  more: Ss,
  main_indicator: Ts,
  sub_indicator: Ps,
  setting: Os,
  timezone: Ds,
  screenshot: Is,
  full_screen: Ns,
  exit_full_screen: Es,
  save: Bs,
  confirm: Us,
  cancel: Fs,
  ma: Ks,
  ema: zs,
  sma: js,
  boll: Qs,
  bbi: Zs,
  sar: Rs,
  vol: Vs,
  macd: qs,
  kdj: Hs,
  rsi: Ys,
  bias: Gs,
  brar: Ws,
  cci: Xs,
  dmi: Js,
  cr: e4,
  psy: t4,
  dma: r4,
  trix: n4,
  obv: i4,
  vr: o4,
  wr: a4,
  mtm: s4,
  emv: l4,
  roc: c4,
  pvt: u4,
  ao: d4,
  utc: h4,
  honolulu: f4,
  juneau: y4,
  los_angeles: g4,
  chicago: p4,
  toronto: C4,
  sao_paulo: m4,
  london: v4,
  berlin: b4,
  bahrain: $4,
  dubai: _4,
  ashkhabad: k4,
  almaty: L4,
  bangkok: x4,
  shanghai: A4,
  tokyo: w4,
  sydney: M4,
  norfolk: S4,
  horizontal_straight_line: T4,
  horizontal_ray_line: P4,
  horizontal_segment: O4,
  vertical_straight_line: D4,
  vertical_ray_line: I4,
  vertical_segment: N4,
  straight_line: E4,
  ray_line: B4,
  segment: U4,
  arrow: F4,
  price_line: K4,
  price_channel_line: z4,
  parallel_straight_line: j4,
  fibonacci_line: Q4,
  fibonacci_segment: Z4,
  fibonacci_circle: R4,
  fibonacci_spiral: V4,
  fibonacci_speed_resistance_fan: q4,
  fibonacci_extension: H4,
  gann_box: Y4,
  rect: G4,
  parallelogram: W4,
  circle: X4,
  triangle: J4,
  three_waves: el,
  five_waves: tl,
  eight_waves: rl,
  any_waves: nl,
  abcd: il,
  xabcd: ol,
  weak_magnet: al,
  strong_magnet: sl,
  symbol_search: ll,
  symbol_code: cl,
  params_1: ul,
  params_2: dl,
  params_3: hl,
  params_4: fl,
  params_5: yl,
  period: gl,
  standard_deviation: pl,
  candle_type: Cl,
  candle_solid: ml,
  candle_stroke: vl,
  candle_up_stroke: bl,
  candle_down_stroke: $l,
  ohlc: _l,
  area: kl,
  last_price_show: Ll,
  high_price_show: xl,
  low_price_show: Al,
  indicator_last_value_show: wl,
  price_axis_type: Ml,
  normal: Sl,
  percentage: Tl,
  log: Pl,
  reverse_coordinate: Ol,
  grid_show: Dl,
  restore_default: Il
}, El = "Indicator", Bl = "More", Ul = "Main Indicator", Fl = "Sub Indicator", Kl = "Setting", zl = "Timezone", jl = "Screenshot", Ql = "Full Screen", Zl = "Exit", Rl = "Save", Vl = "Confirm", ql = "Cancel", Hl = "MA(Moving Average)", Yl = "EMA(Exponential Moving Average)", Gl = "SMA", Wl = "BOLL(Bolinger Bands)", Xl = "BBI(Bull And Bearlndex)", Jl = "SAR(Stop and Reverse)", ec = "VOL(Volume)", tc = "MACD(Moving Average Convergence / Divergence)", rc = "KDJ(KDJ Index)", nc = "RSI(Relative Strength Index)", ic = "BIAS(Bias Ratio)", oc = "BRAR(情绪指标)", ac = "CCI(Commodity Channel Index)", sc = "DMI(Directional Movement Index)", lc = "CR(能量指标)", cc = "PSY(Psychological Line)", uc = "DMA(Different of Moving Average)", dc = "TRIX(Triple Exponentially Smoothed Moving Average)", hc = "OBV(On Balance Volume)", fc = "VR(Volatility Volume Ratio)", yc = "WR(Williams %R)", gc = "MTM(Momentum Index)", pc = "EMV(Ease of Movement Value)", Cc = "ROC(Price Rate of Change)", mc = "PVT(Price and Volume Trend)", vc = "AO(Awesome Oscillator)", bc = "UTC", $c = "(UTC-10) Honolulu", _c = "(UTC-8) Juneau", kc = "(UTC-7) Los Angeles", Lc = "(UTC-5) Chicago", xc = "(UTC-4) Toronto", Ac = "(UTC-3) Sao Paulo", wc = "(UTC+1) London", Mc = "(UTC+2) Berlin", Sc = "(UTC+3) Bahrain", Tc = "(UTC+4) Dubai", Pc = "(UTC+5) Ashkhabad", Oc = "(UTC+6) Almaty", Dc = "(UTC+7) Bangkok", Ic = "(UTC+8) Shanghai", Nc = "(UTC+9) Tokyo", Ec = "(UTC+10) Sydney", Bc = "(UTC+12) Norfolk", Uc = "Horizontal Line", Fc = "Horizontal Ray", Kc = "Horizontal Segment", zc = "Vertical Line", jc = "Vertical Ray", Qc = "Vertical Segment", Zc = "Trend Line", Rc = "Ray", Vc = "Segment", qc = "Arrow", Hc = "Price Line", Yc = "Price Channel Line", Gc = "Parallel Line", Wc = "Fibonacci Line", Xc = "Fibonacci Segment", Jc = "Fibonacci Circle", eu = "Fibonacci Spiral", tu = "Fibonacci Sector", ru = "Fibonacci Extension", nu = "Gann Box", iu = "Rect", ou = "Parallelogram", au = "Circle", su = "Triangle", lu = "Three Waves", cu = "Five Waves", uu = "Eight Waves", du = "Any Waves", hu = "ABCD Pattern", fu = "XABCD Pattern", yu = "Weak Magnet", gu = "Strong Magnet", pu = "Symbol Search", Cu = "Symbol Code", mu = "Parameter 1", vu = "Parameter 2", bu = "Parameter 3", $u = "Parameter 4", _u = "Parameter 5", ku = "Period", Lu = "Standard Deviation", xu = "Candle Type", Au = "Candle Solid", wu = "Candle Stroke", Mu = "Candle Up Stroke", Su = "Candle Down Stroke", Tu = "OHLC", Pu = "Area", Ou = "Show Last Price", Du = "Show Highest Price", Iu = "Show Lowest Price", Nu = "Show indicator's last value", Eu = "Price Axis Type", Bu = "Normal", Uu = "Percentage", Fu = "Log", Ku = "Reverse Coordinate", zu = "Show Grids", ju = "Restore Defaults", Qu = {
  indicator: El,
  more: Bl,
  main_indicator: Ul,
  sub_indicator: Fl,
  setting: Kl,
  timezone: zl,
  screenshot: jl,
  full_screen: Ql,
  exit_full_screen: Zl,
  save: Rl,
  confirm: Vl,
  cancel: ql,
  ma: Hl,
  ema: Yl,
  sma: Gl,
  boll: Wl,
  bbi: Xl,
  sar: Jl,
  vol: ec,
  macd: tc,
  kdj: rc,
  rsi: nc,
  bias: ic,
  brar: oc,
  cci: ac,
  dmi: sc,
  cr: lc,
  psy: cc,
  dma: uc,
  trix: dc,
  obv: hc,
  vr: fc,
  wr: yc,
  mtm: gc,
  emv: pc,
  roc: Cc,
  pvt: mc,
  ao: vc,
  utc: bc,
  honolulu: $c,
  juneau: _c,
  los_angeles: kc,
  chicago: Lc,
  toronto: xc,
  sao_paulo: Ac,
  london: wc,
  berlin: Mc,
  bahrain: Sc,
  dubai: Tc,
  ashkhabad: Pc,
  almaty: Oc,
  bangkok: Dc,
  shanghai: Ic,
  tokyo: Nc,
  sydney: Ec,
  norfolk: Bc,
  horizontal_straight_line: Uc,
  horizontal_ray_line: Fc,
  horizontal_segment: Kc,
  vertical_straight_line: zc,
  vertical_ray_line: jc,
  vertical_segment: Qc,
  straight_line: Zc,
  ray_line: Rc,
  segment: Vc,
  arrow: qc,
  price_line: Hc,
  price_channel_line: Yc,
  parallel_straight_line: Gc,
  fibonacci_line: Wc,
  fibonacci_segment: Xc,
  fibonacci_circle: Jc,
  fibonacci_spiral: eu,
  fibonacci_speed_resistance_fan: tu,
  fibonacci_extension: ru,
  gann_box: nu,
  rect: iu,
  parallelogram: ou,
  circle: au,
  triangle: su,
  three_waves: lu,
  five_waves: cu,
  eight_waves: uu,
  any_waves: du,
  abcd: hu,
  xabcd: fu,
  weak_magnet: yu,
  strong_magnet: gu,
  symbol_search: pu,
  symbol_code: Cu,
  params_1: mu,
  params_2: vu,
  params_3: bu,
  params_4: $u,
  params_5: _u,
  period: ku,
  standard_deviation: Lu,
  candle_type: xu,
  candle_solid: Au,
  candle_stroke: wu,
  candle_up_stroke: Mu,
  candle_down_stroke: Su,
  ohlc: Tu,
  area: Pu,
  last_price_show: Ou,
  high_price_show: Du,
  low_price_show: Iu,
  indicator_last_value_show: Nu,
  price_axis_type: Eu,
  normal: Bu,
  percentage: Uu,
  log: Fu,
  reverse_coordinate: Ku,
  grid_show: zu,
  restore_default: ju
}, Kr = {
  "zh-CN": Nl,
  "en-US": Qu
};
function xf(e, t) {
  Kr[e] = t;
}
const s = (e, t) => {
  var r;
  return ((r = Kr[t]) == null ? void 0 : r[e]) ?? e;
}, Zu = /* @__PURE__ */ $('<div class="scroll-indicator left"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg></div>'), Ru = /* @__PURE__ */ $('<img alt="symbol">'), Vu = /* @__PURE__ */ $('<div class="symbol"><span></span></div>'), qu = /* @__PURE__ */ $('<span class="down-arrow-icon mobile-separate-arrow"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></span>'), Hu = /* @__PURE__ */ $('<span class="mobile-more-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg></span>'), Yu = /* @__PURE__ */ $('<div class="item tools"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div>'), Gu = /* @__PURE__ */ $('<div class="klinecharts-pro-order-tools-display-menu"></div>'), Wu = /* @__PURE__ */ $('<div class="klinecharts-pro-order-tools-popover"><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Quick Order</span></span><span class="klinecharts-pro-order-tools-chevron">›</span></button><div class="klinecharts-pro-order-tools-submenu"><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Floating Window</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Plus Button</span></label></div></div><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Open Orders</span></span><span class="klinecharts-pro-order-tools-chevron">&rsaquo;</span></button><div class="klinecharts-pro-order-tools-submenu"><div class="klinecharts-pro-order-tools-setting-row"><span class="klinecharts-pro-order-tools-label">Extended Price Line</span><button type="button"><span></span></button></div><div class="klinecharts-pro-order-tools-setting-row"><span class="klinecharts-pro-order-tools-label">Display</span><div class="klinecharts-pro-order-tools-display"><button type="button" class="klinecharts-pro-order-tools-display-button"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4"></path></svg></button></div></div></div></div><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Positions</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Breakeven Price</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Liquidation Price</span></label><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Price Line</span></span><span class="klinecharts-pro-order-tools-chevron">&rsaquo;</span></button><div class="klinecharts-pro-order-tools-submenu"><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Market Price Line</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Count Down</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Bid & Ask Price</span></label></div></div><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Order History</span></label></div>'), Xu = /* @__PURE__ */ $('<div><div class="item tools order-tools-trigger"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Orders"><path d="M4 7h10"></path><path d="M4 12h8"></path><path d="M4 17h6"></path><path d="M18 6v12"></path><path d="M15 15l3 3 3-3"></path></svg><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></div></div>'), Ju = /* @__PURE__ */ $('<div class="item tools"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path><path d="M15.22299772857666,9.722223632261718C12.59389772857666,9.722223632261718,10.44600772857666,12.020201374511718,10.44600772857666,14.861111374511719C10.44600772857666,17.70202137451172,12.58215772857666,20.000021374511718,15.223007728576661,20.000021374511718C17.86384772857666,20.000021374511718,19.99999772857666,17.70202137451172,19.99999772857666,14.861111374511719C19.99999772857666,12.020201374511718,17.85211772857666,9.72222212709572,15.22299772857666,9.722223632261718ZM15.22299772857666,18.598491374511717C13.30985772857666,18.598491374511717,11.737087728576661,16.91919137451172,11.737087728576661,14.848481374511719C11.737087728576661,12.777781374511719,13.29811772857666,11.098491374511719,15.22299772857666,11.098491374511719C17.14787772857666,11.098491374511719,18.708917728576658,12.777781374511719,18.708917728576658,14.848481374511719C18.708917728576658,16.91919137451172,17.13614772857666,18.59848137451172,15.22299772857666,18.598491374511717Z"></path><path d="M15.692486288146974,15.050496970825195L15.692486288146974,12.676760970825196C15.692486288146974,12.297972970825196,15.399058288146973,11.982316970825195,15.046945288146972,11.982316970825195C14.694833288146972,11.982316970825195,14.401406288146973,12.297972970825196,14.401406288146973,12.676760970825196L14.401406288146973,15.340896970825195C14.401406288146973,15.530296970825194,14.471829288146973,15.694436970825196,14.589200288146973,15.833326970825196L15.751176288146972,17.095956970825195C15.868546288146973,17.222216970825194,16.032866288146973,17.297976970825196,16.208916288146973,17.297976970825196C16.384976288146973,17.297976970825196,16.537556288146973,17.222216970825194,16.666666288146974,17.095956970825195C16.78403628814697,16.969686970825194,16.854456288146974,16.792916970825196,16.854456288146974,16.603526970825193C16.854456288146974,16.414136970825197,16.78403628814697,16.237366970825196,16.666666288146974,16.111106970825197L15.692486288146974,15.050496970825195Z"></path></svg></div>'), ed = /* @__PURE__ */ $('<div class="item tools"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg></div>'), td = /* @__PURE__ */ $('<div class="item tools"><svg viewBox="0 0 20 20"><path d="M6.50977,1L13.4902,1C13.6406,1,13.7695,1.1104910000000001,13.7969,1.2631700000000001L14.0273,2.52277C14.1387,3.13147,14.6543,3.57143,15.2559,3.57143L17.5,3.57143C18.8809,3.57143,20,4.72254,20,6.14286L20,16.4286C20,17.8489,18.8809,19,17.5,19L2.5,19C1.11914,19,0,17.8489,0,16.4286L0,6.14286C0,4.72254,1.11914,3.57143,2.5,3.57143L4.74414,3.57143C5.3457,3.57143,5.86133,3.13147,5.97266,2.52277L6.20312,1.2631700000000001C6.23047,1.1104910000000001,6.35937,1,6.50977,1ZM15.2559,4.857139999999999C14.0547,4.857139999999999,13.0215,3.97522,12.7988,2.75982L12.7129,2.28571L7.28711,2.28571L7.20117,2.75982C6.98047,3.97522,5.94727,4.857139999999999,4.74414,4.857139999999999L2.5,4.857139999999999C1.81055,4.857139999999999,1.25,5.43371,1.25,6.14286L1.25,16.4286C1.25,17.1377,1.81055,17.7143,2.5,17.7143L17.5,17.7143C18.1895,17.7143,18.75,17.1377,18.75,16.4286L18.75,6.14286C18.75,5.43371,18.1895,4.857139999999999,17.5,4.857139999999999L15.2559,4.857139999999999ZM4.375,6.78571L3.125,6.78571C2.7793,6.78571,2.5,6.49844,2.5,6.14286C2.5,5.78728,2.7793,5.5,3.125,5.5L4.375,5.5C4.7207,5.5,5,5.78728,5,6.14286C5,6.49844,4.7207,6.78571,4.375,6.78571ZM10,6.14286C7.06641,6.14286,4.6875,8.58973,4.6875,11.6071C4.6875,14.6246,7.06641,17.0714,10,17.0714C12.9336,17.0714,15.3125,14.6246,15.3125,11.6071C15.3125,8.58973,12.9336,6.14286,10,6.14286ZM10,7.42857C11.0859,7.42857,12.1055,7.8625,12.873,8.65201C13.6406,9.44152,14.0625,10.49018,14.0625,11.6071C14.0625,12.7241,13.6406,13.7728,12.873,14.5623C12.1055,15.3518,11.0859,15.7857,10,15.7857C8.91406,15.7857,7.89453,15.3518,7.12695,14.5623C6.35937,13.7728,5.9375,12.7241,5.9375,11.6071C5.9375,10.49018,6.35938,9.44152,7.12695,8.65201C7.89453,7.8625,8.91406,7.42857,10,7.42857ZM10,9.67857C8.96484,9.67857,8.125,10.54241,8.125,11.6071C8.125,12.6719,8.96484,13.5357,10,13.5357C11.0352,13.5357,11.875,12.6719,11.875,11.6071C11.875,10.54241,11.0352,9.67857,10,9.67857ZM10,10.96429C10.3438,10.96429,10.625,11.2536,10.625,11.6071C10.625,11.9607,10.3438,12.25,10,12.25C9.65625,12.25,9.375,11.9607,9.375,11.6071C9.375,11.2536,9.65625,10.96429,10,10.96429Z"></path></svg></div>'), rd = /* @__PURE__ */ $('<div class="scroll-indicator right"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"></path></svg></div>'), nd = /* @__PURE__ */ $('<div><div class="klinecharts-pro-period-bar"><div class="menu-container"><svg viewBox="0 0 1024 1024"><path d="M192.037 287.953h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 479.169H438.553c-17.673 0-32 14.327-32 32s14.327 32 32 32h393.608c17.673 0 32-14.327 32-32s-14.327-32-32-32zM832.161 735.802H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32zM319.028 351.594l-160 160 160 160z"></path></svg></div><div><div class="item tools"></div></div></div></div>'), id = /* @__PURE__ */ $("<span></span>"), od = /* @__PURE__ */ $('<button type="button"></button>'), ad = /* @__PURE__ */ $('<svg viewBox="0 0 20 20"><path d="M1.08108,0L0,1.079L4.18919,5.27938L2.54826,6.91715L6.9112,6.91715L6.9112,2.56262L5.28957,4.18112L1.08108,0ZM15.8108,5.27938L20,1.079L18.9189,0L14.7104,4.18112L13.0888,2.56262L13.0888,6.91715L17.4517,6.91715L15.8108,5.27938ZM4.16988,14.7014L0.07722,18.8054L1.1583,20L5.27027,15.7996L6.9112,17.4374L6.9112,13.0829L2.54826,13.0829L4.16988,14.7014ZM17.4517,13.0829L13.0888,13.0829L13.0888,17.4374L14.7297,15.7996L18.8417,20L19.9228,18.8054L15.8301,14.7013L17.4517,13.0829Z"></path></svg>'), sd = /* @__PURE__ */ $('<svg viewBox="0 0 20 20"><path d="M2.93444,1.76899L7.57544,6.40999L6.38918,7.59626L1.76899,2.93444L0,4.70343L0,0L4.70343,0L2.93444,1.76899ZM6.40999,12.4037L1.76899,17.0447L0,15.2758L0,19.9792L4.70343,19.9792L2.93444,18.2102L7.57544,13.5692L6.40999,12.4037ZM15.2758,0L17.0447,1.76899L12.4037,6.40999L13.59,7.59626L18.231,2.95526L20,4.72425L20,0L15.2758,0ZM13.5692,12.4037L12.3829,13.59L17.0239,18.231L15.2549,20L19.9792,20L19.9792,15.2758L18.2102,17.0447L13.5692,12.4037Z"></path></svg>'), H9 = (e) => e.charAt(0).toUpperCase() + e.slice(1), ld = (e) => {
  let t, r, n;
  const [o, l] = T(window.innerWidth < 768), [d, u] = T(localStorage.getItem("klinechart_secondary_period") || ""), [g, _] = T(!1), [y, w] = T(!1), [A, O] = T(!1), [N, F] = T(!1), [K, X] = T(!1), [W, B] = T({
    top: 0,
    left: 0,
    minWidth: 220
  }), R = () => {
    l(window.innerWidth < 768), g() && qe();
  }, [z, Pe] = T(!1), Oe = () => document.fullscreenElement ?? document.body, ge = () => {
    Pe(!!document.fullscreenElement);
  }, [G, re] = T(!1), [ue, Te] = T(!1), qe = () => {
    if (!r)
      return;
    const U = r.getBoundingClientRect(), j = Math.max(220, Math.ceil(U.width)), Ae = window.innerWidth, De = Math.min(Math.max(8, U.right - j), Math.max(8, Ae - j - 8));
    B({
      top: Math.ceil(U.bottom + 8),
      left: Math.ceil(De),
      minWidth: j
    });
  }, g1 = () => {
    w(!1), O(!1), F(!1), X(!1);
  }, p1 = () => {
    _((U) => {
      const j = !U;
      return j ? queueMicrotask(qe) : g1(), j;
    });
  }, l1 = (U) => {
    if (!g())
      return;
    const j = U.target;
    j && (r != null && r.contains(j) || n != null && n.contains(j) || (g1(), _(!1)));
  }, Je = () => {
    g() && qe();
  }, He = () => {
    if (t && o()) {
      const U = t;
      re(U.scrollLeft > 10), Te(U.scrollLeft + U.clientWidth < U.scrollWidth - 10);
    } else
      re(!1), Te(!1);
  };
  m0(() => {
    window.addEventListener("resize", R), document.addEventListener("fullscreenchange", ge), document.addEventListener("mousedown", l1), window.addEventListener("scroll", Je, !0), document.addEventListener("mozfullscreenchange", ge), document.addEventListener("webkitfullscreenchange", ge), document.addEventListener("msfullscreenchange", ge), t && (t.addEventListener("scroll", He), setTimeout(He, 100));
  }), w1(() => {
    window.removeEventListener("resize", R), document.removeEventListener("fullscreenchange", ge), document.removeEventListener("mousedown", l1), window.removeEventListener("scroll", Je, !0), document.removeEventListener("mozfullscreenchange", ge), document.removeEventListener("webkitfullscreenchange", ge), document.removeEventListener("msfullscreenchange", ge), t && t.removeEventListener("scroll", He);
  });
  const c1 = J(() => {
    const U = e.periods.filter((j) => {
      if (!o() || z())
        return !0;
      const Ae = e.period.text, De = d();
      if (j.text === Ae || De && j.text === De)
        return !0;
      if (!De || De === Ae) {
        const ce = e.periods.find((ae) => ae.text !== Ae);
        return j.text === (ce == null ? void 0 : ce.text);
      }
      return !1;
    }).slice(0, o() && !z() ? 2 : e.periods.length);
    return setTimeout(He, 50), U;
  });
  let H = e.period.text;
  return Ne(() => {
    const U = e.period.text;
    U !== H && (o() && (u(H), localStorage.setItem("klinechart_secondary_period", H)), H = U), setTimeout(He, 50);
  }), Ne(() => {
    z(), setTimeout(He, 100);
  }), Ne(() => {
    if (!e.showOrderToolsMenu) {
      _(!1);
      return;
    }
    g() && queueMicrotask(qe);
  }), (() => {
    const U = nd.cloneNode(!0), j = U.firstChild, Ae = j.firstChild, De = Ae.firstChild, ce = Ae.nextSibling, ae = ce.firstChild;
    return U.style.setProperty("position", "relative"), U.style.setProperty("width", "100%"), U.style.setProperty("display", "flex"), U.style.setProperty("align-items", "center"), k(U, L(q, {
      get when() {
        return J(() => !!o())() && G();
      },
      get children() {
        const b = Zu.cloneNode(!0);
        return b.$$click = () => t.scrollBy({
          left: -100,
          behavior: "smooth"
        }), b.style.setProperty("position", "absolute"), b.style.setProperty("left", "0"), b.style.setProperty("top", "0"), b.style.setProperty("bottom", "1px"), b.style.setProperty("width", "30px"), b.style.setProperty("display", "flex"), b.style.setProperty("align-items", "center"), b.style.setProperty("justify-content", "center"), b.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), b.style.setProperty("z-index", "10"), b.style.setProperty("cursor", "pointer"), b.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), b;
      }
    }), j), A1((b) => {
      t = b;
    }, j), j.style.setProperty("width", "100%"), f1(De, "click", e.onMenuClick, !0), k(j, L(q, {
      get when() {
        return e.symbol;
      },
      get children() {
        const b = Vu.cloneNode(!0), ie = b.firstChild;
        return f1(b, "click", e.onSymbolClick, !0), k(b, L(q, {
          get when() {
            return e.symbol.logo;
          },
          get children() {
            const pe = Ru.cloneNode(!0);
            return I(() => xe(pe, "src", e.symbol.logo)), pe;
          }
        }), ie), k(ie, () => e.symbol.shortName ?? e.symbol.name ?? e.symbol.ticker), b;
      }
    }), ce), k(j, () => c1().map((b, ie) => {
      const pe = b.text === e.period.text;
      return (() => {
        const we = id.cloneNode(!0);
        return we.$$click = (te) => {
          o() && pe && !z() ? (e.onMobilePeriodClick ? e.onMobilePeriodClick(b) : e.onMenuClick(), te.stopPropagation()) : e.onPeriodChange(b);
        }, fe(we, `item period ${pe ? "selected" : ""}`), k(we, () => b.text), we;
      })();
    }), ce), k(j, L(q, {
      get when() {
        return J(() => !!(o() && !z()))() && c1().length > 1;
      },
      get children() {
        const b = qu.cloneNode(!0);
        return b.$$click = (ie) => {
          ie.stopPropagation(), e.onMobilePeriodClick ? e.onMobilePeriodClick(e.period) : e.onMenuClick();
        }, b.style.setProperty("margin-left", "4px"), b.style.setProperty("display", "inline-flex"), b.style.setProperty("align-items", "center"), b;
      }
    }), ce), k(j, L(q, {
      get when() {
        return J(() => !!o())() && !z();
      },
      get children() {
        const b = Hu.cloneNode(!0);
        return b.$$click = (ie) => {
          var pe;
          ie.stopPropagation(), (pe = e.onMobileMoreClick) == null || pe.call(e);
        }, b.style.setProperty("margin-left", "8px"), b.style.setProperty("display", "inline-flex"), b.style.setProperty("align-items", "center"), b.style.setProperty("cursor", "pointer"), b.style.setProperty("padding", "0 4px"), b;
      }
    }), ce), k(j, L(q, {
      get when() {
        return !o();
      },
      get children() {
        const b = Yu.cloneNode(!0), ie = b.firstChild, pe = ie.nextSibling;
        return f1(b, "click", e.onIndicatorClick, !0), k(pe, () => s("indicator", e.locale)), b;
      }
    }), ce), ce.style.setProperty("display", "flex"), ce.style.setProperty("gap", "4px"), ce.style.setProperty("margin-left", "auto"), ce.style.setProperty("align-items", "center"), k(ce, L(q, {
      get when() {
        return e.showOrderToolsMenu;
      },
      get children() {
        const b = Xu.cloneNode(!0), ie = b.firstChild, pe = ie.firstChild, we = pe.nextSibling;
        return A1((te) => {
          r = te;
        }, b), b.style.setProperty("display", "flex"), b.style.setProperty("align-items", "center"), ie.$$click = (te) => {
          te.stopPropagation(), p1();
        }, ie.style.setProperty("gap", "6px"), we.style.setProperty("transition", "transform 0.2s ease"), k(b, L(q, {
          get when() {
            return g();
          },
          get children() {
            return L(T5, {
              get mount() {
                return Oe();
              },
              get children() {
                const te = Wu.cloneNode(!0), e1 = te.firstChild, $e = e1.firstChild, ut = $e.firstChild, j1 = ut.firstChild, C1 = j1.firstChild, m1 = $e.nextSibling, dt = m1.firstChild, Gt = dt.firstChild, v1 = Gt.firstChild, Ee = dt.nextSibling, Be = Ee.firstChild, Ue = Be.firstChild, Ie = e1.nextSibling, Q1 = Ie.firstChild, Z1 = Q1.firstChild, b1 = Z1.firstChild, R1 = b1.firstChild, Ce = Q1.nextSibling, _e = Ce.firstChild, Wt = _e.firstChild, Fe = Wt.nextSibling, $1 = _e.nextSibling, u1 = $1.firstChild, ht = u1.nextSibling, t1 = ht.firstChild, ft = t1.firstChild, Ye = Ie.nextSibling, V1 = Ye.firstChild, yt = V1.firstChild, q1 = Ye.nextSibling, _1 = q1.nextSibling, Ge = _1.firstChild, gt = Ge.firstChild, pt = _1.nextSibling, r1 = pt.nextSibling, H1 = r1.firstChild, Ct = H1.firstChild, Y1 = r1.nextSibling, G1 = Y1.firstChild, W1 = G1.firstChild, P1 = W1.firstChild, d1 = P1.firstChild, Xt = G1.nextSibling, n1 = Xt.firstChild, Jt = n1.firstChild, mt = Jt.firstChild, vt = n1.nextSibling, X1 = vt.firstChild, bt = X1.firstChild, e0 = vt.nextSibling, t0 = e0.firstChild, $t = t0.firstChild, _t = Y1.nextSibling, kt = _t.firstChild, J1 = kt.firstChild;
                return te.$$mousedown = (C) => C.stopPropagation(), A1((C) => {
                  n = C;
                }, te), te.style.setProperty("position", "fixed"), te.style.setProperty("z-index", "9999"), $e.$$click = (C) => {
                  C.preventDefault(), C.stopPropagation(), w((M) => !M);
                }, j1.$$mousedown = (C) => C.stopPropagation(), j1.$$click = (C) => C.stopPropagation(), C1.addEventListener("change", (C) => {
                  var M;
                  C.stopPropagation(), w(!0), (M = e.onOrderToolsStateChange) == null || M.call(e, {
                    quickOrder: C.currentTarget.checked
                  });
                }), v1.addEventListener("change", (C) => {
                  var M;
                  (M = e.onOrderToolsStateChange) == null || M.call(e, {
                    quickOrderFloatingWindow: C.currentTarget.checked
                  });
                }), Ue.addEventListener("change", (C) => {
                  var M;
                  (M = e.onOrderToolsStateChange) == null || M.call(e, {
                    quickOrderPlusButton: C.currentTarget.checked
                  });
                }), Q1.$$click = (C) => {
                  C.preventDefault(), C.stopPropagation(), O((M) => !M), F(!1);
                }, b1.$$mousedown = (C) => C.stopPropagation(), b1.$$click = (C) => C.stopPropagation(), R1.addEventListener("change", (C) => {
                  var M;
                  C.stopPropagation(), O(!0), (M = e.onOrderToolsStateChange) == null || M.call(e, {
                    openOrders: C.currentTarget.checked
                  });
                }), Fe.$$click = (C) => {
                  var M, me;
                  C.preventDefault(), C.stopPropagation(), (me = e.onOrderToolsStateChange) == null || me.call(e, {
                    openOrdersExtendedPriceLine: !(((M = e.orderToolsState) == null ? void 0 : M.openOrdersExtendedPriceLine) ?? !0)
                  });
                }, t1.$$click = (C) => {
                  C.preventDefault(), C.stopPropagation(), F((M) => !M);
                }, k(t1, () => {
                  var C;
                  return H9(((C = e.orderToolsState) == null ? void 0 : C.openOrdersDisplay) ?? "right");
                }, ft), k(ht, L(q, {
                  get when() {
                    return N();
                  },
                  get children() {
                    const C = Gu.cloneNode(!0);
                    return k(C, () => ["left", "center", "right"].map((M) => (() => {
                      const me = od.cloneNode(!0);
                      return me.$$click = (ke) => {
                        var je;
                        ke.preventDefault(), ke.stopPropagation(), (je = e.onOrderToolsStateChange) == null || je.call(e, {
                          openOrdersDisplay: M
                        }), F(!1);
                      }, k(me, () => H9(M)), I(() => {
                        var ke;
                        return fe(me, (((ke = e.orderToolsState) == null ? void 0 : ke.openOrdersDisplay) ?? "right") === M ? "selected" : "");
                      }), me;
                    })())), C;
                  }
                }), null), yt.addEventListener("change", (C) => {
                  var M;
                  (M = e.onOrderToolsStateChange) == null || M.call(e, {
                    positions: C.currentTarget.checked
                  });
                }), gt.addEventListener("change", (C) => {
                  var M;
                  (M = e.onOrderToolsStateChange) == null || M.call(e, {
                    breakevenPrice: C.currentTarget.checked
                  });
                }), Ct.addEventListener("change", (C) => {
                  var M;
                  (M = e.onOrderToolsStateChange) == null || M.call(e, {
                    liquidationPrice: C.currentTarget.checked
                  });
                }), G1.$$click = (C) => {
                  C.preventDefault(), C.stopPropagation(), X((M) => !M);
                }, P1.$$mousedown = (C) => C.stopPropagation(), P1.$$click = (C) => C.stopPropagation(), d1.addEventListener("change", (C) => {
                  var M;
                  C.stopPropagation(), X(!0), (M = e.onOrderToolsStateChange) == null || M.call(e, {
                    priceLine: C.currentTarget.checked
                  });
                }), mt.addEventListener("change", (C) => {
                  var M;
                  (M = e.onOrderToolsStateChange) == null || M.call(e, {
                    marketPriceLine: C.currentTarget.checked
                  });
                }), bt.addEventListener("change", (C) => {
                  var M;
                  (M = e.onOrderToolsStateChange) == null || M.call(e, {
                    countDown: C.currentTarget.checked
                  });
                }), $t.addEventListener("change", (C) => {
                  var M;
                  (M = e.onOrderToolsStateChange) == null || M.call(e, {
                    bidAskPrice: C.currentTarget.checked
                  });
                }), J1.addEventListener("change", (C) => {
                  var M;
                  (M = e.onOrderToolsStateChange) == null || M.call(e, {
                    orderHistory: C.currentTarget.checked
                  });
                }), I((C) => {
                  var nt;
                  const M = `${W().top}px`, me = `${W().left}px`, ke = `${W().minWidth}px`, je = `klinecharts-pro-order-tools-group${y() ? " klinecharts-pro-order-tools-group-open" : ""}`, h1 = `klinecharts-pro-order-tools-group${A() ? " klinecharts-pro-order-tools-group-open" : ""}`, et = `klinecharts-pro-order-tools-switch${((nt = e.orderToolsState) == null ? void 0 : nt.openOrdersExtendedPriceLine) ?? !0 ? " klinecharts-pro-order-tools-switch-on" : ""}`, tt = `klinecharts-pro-order-tools-display-arrow${N() ? " klinecharts-pro-order-tools-display-arrow-open" : ""}`, rt = `klinecharts-pro-order-tools-group${K() ? " klinecharts-pro-order-tools-group-open" : ""}`;
                  return M !== C._v$ && te.style.setProperty("top", C._v$ = M), me !== C._v$2 && te.style.setProperty("left", C._v$2 = me), ke !== C._v$3 && te.style.setProperty("width", C._v$3 = ke), je !== C._v$4 && fe(e1, C._v$4 = je), h1 !== C._v$5 && fe(Ie, C._v$5 = h1), et !== C._v$6 && fe(Fe, C._v$6 = et), tt !== C._v$7 && xe(ft, "class", C._v$7 = tt), rt !== C._v$8 && fe(Y1, C._v$8 = rt), C;
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
                  var C, M, me, ke;
                  return C1.checked = (((C = e.orderToolsState) == null ? void 0 : C.quickOrderFloatingWindow) ?? ((M = e.orderToolsState) == null ? void 0 : M.quickOrder) ?? !0) || (((me = e.orderToolsState) == null ? void 0 : me.quickOrderPlusButton) ?? ((ke = e.orderToolsState) == null ? void 0 : ke.quickOrder) ?? !0);
                }), I(() => {
                  var C, M;
                  return v1.checked = ((C = e.orderToolsState) == null ? void 0 : C.quickOrderFloatingWindow) ?? ((M = e.orderToolsState) == null ? void 0 : M.quickOrder) ?? !0;
                }), I(() => {
                  var C, M;
                  return Ue.checked = ((C = e.orderToolsState) == null ? void 0 : C.quickOrderPlusButton) ?? ((M = e.orderToolsState) == null ? void 0 : M.quickOrder) ?? !0;
                }), I(() => {
                  var C;
                  return R1.checked = ((C = e.orderToolsState) == null ? void 0 : C.openOrders) ?? !0;
                }), I(() => {
                  var C;
                  return yt.checked = ((C = e.orderToolsState) == null ? void 0 : C.positions) ?? !0;
                }), I(() => {
                  var C;
                  return gt.checked = ((C = e.orderToolsState) == null ? void 0 : C.breakevenPrice) ?? !0;
                }), I(() => {
                  var C;
                  return Ct.checked = ((C = e.orderToolsState) == null ? void 0 : C.liquidationPrice) ?? !0;
                }), I(() => {
                  var C, M, me, ke, je, h1;
                  return d1.checked = (((C = e.orderToolsState) == null ? void 0 : C.marketPriceLine) ?? ((M = e.orderToolsState) == null ? void 0 : M.priceLine) ?? !0) || (((me = e.orderToolsState) == null ? void 0 : me.countDown) ?? ((ke = e.orderToolsState) == null ? void 0 : ke.priceLine) ?? !0) || (((je = e.orderToolsState) == null ? void 0 : je.bidAskPrice) ?? ((h1 = e.orderToolsState) == null ? void 0 : h1.priceLine) ?? !0);
                }), I(() => {
                  var C, M;
                  return mt.checked = ((C = e.orderToolsState) == null ? void 0 : C.marketPriceLine) ?? ((M = e.orderToolsState) == null ? void 0 : M.priceLine) ?? !0;
                }), I(() => {
                  var C, M;
                  return bt.checked = ((C = e.orderToolsState) == null ? void 0 : C.countDown) ?? ((M = e.orderToolsState) == null ? void 0 : M.priceLine) ?? !0;
                }), I(() => {
                  var C, M;
                  return $t.checked = ((C = e.orderToolsState) == null ? void 0 : C.bidAskPrice) ?? ((M = e.orderToolsState) == null ? void 0 : M.priceLine) ?? !0;
                }), I(() => {
                  var C;
                  return J1.checked = ((C = e.orderToolsState) == null ? void 0 : C.orderHistory) ?? !0;
                }), te;
              }
            });
          }
        }), null), I((te) => {
          const e1 = o() ? "0 8px" : "0 10px", $e = g() ? "rotate(180deg)" : "rotate(0deg)";
          return e1 !== te._v$9 && ie.style.setProperty("padding", te._v$9 = e1), $e !== te._v$10 && we.style.setProperty("transform", te._v$10 = $e), te;
        }, {
          _v$9: void 0,
          _v$10: void 0
        }), b;
      }
    }), ae), k(ce, L(q, {
      get when() {
        return !o();
      },
      get children() {
        return [(() => {
          const b = Ju.cloneNode(!0);
          return f1(b, "click", e.onTimezoneClick, !0), b;
        })(), (() => {
          const b = ed.cloneNode(!0);
          return f1(b, "click", e.onSettingClick, !0), b;
        })()];
      }
    }), ae), k(ce, L(q, {
      get when() {
        return !o();
      },
      get children() {
        const b = td.cloneNode(!0);
        return f1(b, "click", e.onScreenshotClick, !0), b;
      }
    }), ae), ae.$$click = () => {
      if (z())
        (document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen).call(document);
      else {
        const b = t == null ? void 0 : t.closest(".klinecharts-pro");
        b && ((b == null ? void 0 : b.requestFullscreen) ?? (b == null ? void 0 : b.webkitRequestFullscreen) ?? (b == null ? void 0 : b.mozRequestFullScreen) ?? (b == null ? void 0 : b.msRequestFullscreen)).call(b);
      }
    }, k(ae, (() => {
      const b = J(() => !!z());
      return () => b() ? ad.cloneNode(!0) : sd.cloneNode(!0);
    })()), k(U, L(q, {
      get when() {
        return J(() => !!o())() && ue();
      },
      get children() {
        const b = rd.cloneNode(!0);
        return b.$$click = () => t.scrollBy({
          left: 100,
          behavior: "smooth"
        }), b.style.setProperty("position", "absolute"), b.style.setProperty("right", "0"), b.style.setProperty("top", "0"), b.style.setProperty("bottom", "1px"), b.style.setProperty("width", "30px"), b.style.setProperty("display", "flex"), b.style.setProperty("align-items", "center"), b.style.setProperty("justify-content", "center"), b.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), b.style.setProperty("z-index", "10"), b.style.setProperty("cursor", "pointer"), b.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), b;
      }
    }), null), I((b) => {
      const ie = o() ? "auto" : "visible", pe = e.spread ? "" : "rotate", we = z() ? "0px" : "var(--klinecharts-pro-period-bar-padding-right)";
      return ie !== b._v$11 && j.style.setProperty("overflow", b._v$11 = ie), pe !== b._v$12 && xe(De, "class", b._v$12 = pe), we !== b._v$13 && ce.style.setProperty("padding-right", b._v$13 = we), b;
    }, {
      _v$11: void 0,
      _v$12: void 0,
      _v$13: void 0
    }), U;
  })();
};
ze(["click", "mousedown"]);
const cd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M12.41465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L12.41465,12C12.20873,12.5826,11.65311,13,11,13C10.34689,13,9.79127,12.5826,9.58535,12L3.5,12C3.223857,12,3,11.77614,3,11.5C3,11.22386,3.223857,11,3.5,11L9.58535,11C9.79127,10.417404,10.34689,10,11,10C11.65311,10,12.20873,10.417404,12.41465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), ud = () => cd.cloneNode(!0), dd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,11L11.08535,11C11.29127,10.417404,11.84689,10,12.5,10C13.15311,10,13.70873,10.417404,13.91465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L13.91465,12C13.70873,12.5826,13.15311,13,12.5,13C11.84689,13,11.29127,12.5826,11.08535,12L6.91465,12C6.70873,12.5826,6.15311,13,5.5,13C4.671573,13,4,12.32843,4,11.5C4,10.671573,4.671573,10,5.5,10C6.15311,10,6.70873,10.417404,6.91465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), hd = () => dd.cloneNode(!0), fd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,12.5C6.70873,13.0826,6.15311,13.5,5.5,13.5C4.671573,13.5,4,12.82843,4,12C4,11.171573,4.671573,10.5,5.5,10.5C6.15311,10.5,6.70873,10.917404,6.91465,11.5L16.0853,11.5C16.2913,10.917404,16.846899999999998,10.5,17.5,10.5C18.328400000000002,10.5,19,11.171573,19,12C19,12.82843,18.328400000000002,13.5,17.5,13.5C16.846899999999998,13.5,16.2913,13.0826,16.0853,12.5L6.91465,12.5Z" stroke-opacity="0" stroke="none"></path></svg>'), yd = () => fd.cloneNode(!0), gd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,12.41465L11,18.5C11,18.7761,11.22386,19,11.5,19C11.77614,19,12,18.7761,12,18.5L12,12.41465C12.5826,12.20873,13,11.65311,13,11C13,10.34689,12.5826,9.79127,12,9.58535L12,3.5C12,3.223857,11.77614,3,11.5,3C11.22386,3,11,3.223857,11,3.5L11,9.58535C10.417404,9.79127,10,10.34689,10,11C10,11.65311,10.417404,12.20873,11,12.41465Z" stroke-opacity="0" stroke="none"></path></svg>'), pd = () => gd.cloneNode(!0), Cd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.66558837890625,19C10.83716137890625,19,10.16558837890625,18.328400000000002,10.16558837890625,17.5C10.16558837890625,16.846899999999998,10.58298437890625,16.2913,11.16557337890625,16.0854L11.16557337890625,11.91464C10.58298437890625,11.70872,10.16558837890625,11.1531,10.16558837890625,10.5C10.16558837890625,9.8469,10.58298437890625,9.29128,11.16557337890625,9.08536L11.16557337890625,4.5C11.16557337890625,4.223857,11.38942837890625,4,11.66556837890625,4C11.94171837890625,4,12.16556837890625,4.223857,12.16556837890625,4.5L12.16556837890625,9.08535C12.74817837890625,9.291260000000001,13.16558837890625,9.846879999999999,13.16558837890625,10.5C13.16558837890625,11.153120000000001,12.74817837890625,11.708739999999999,12.16556837890625,11.91465L12.16556837890625,16.0854C12.74817837890625,16.2913,13.16558837890625,16.846899999999998,13.16558837890625,17.5C13.16558837890625,18.328400000000002,12.49401837890625,19,11.66558837890625,19Z" stroke-opacity="0" stroke="none"></path></svg>'), md = () => Cd.cloneNode(!0), vd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.165603637695312,6.91465C11.748203637695312,6.70873,12.165603637695312,6.15311,12.165603637695312,5.5C12.165603637695312,4.671573,11.494033637695313,4,10.665603637695312,4C9.837176637695313,4,9.165603637695312,4.671573,9.165603637695312,5.5C9.165603637695312,6.15311,9.583007637695312,6.70873,10.165603637695312,6.91465L10.165603637695312,16.0854C9.583007637695312,16.2913,9.165603637695312,16.846899999999998,9.165603637695312,17.5C9.165603637695312,18.328400000000002,9.837176637695313,19,10.665603637695312,19C11.494033637695313,19,12.165603637695312,18.328400000000002,12.165603637695312,17.5C12.165603637695312,16.846899999999998,11.748203637695312,16.2913,11.165603637695312,16.0854L11.165603637695312,6.91465Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), bd = () => vd.cloneNode(!0), $d = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.146447,15.753C4.9511845,15.9483,4.9511845,16.2649,5.146447,16.4602C5.341709,16.6554,5.658291,16.6554,5.853554,16.4602L8.156600000000001,14.15711C8.352409999999999,14.25082,8.57173,14.3033,8.8033,14.3033C9.631730000000001,14.3033,10.3033,13.63172,10.3033,12.80329C10.3033,12.57172,10.250820000000001,12.352409999999999,10.157119999999999,12.15659L12.156600000000001,10.15711C12.352409999999999,10.250820000000001,12.571729999999999,10.30329,12.8033,10.30329C13.63173,10.30329,14.3033,9.63172,14.3033,8.80329C14.3033,8.57172,14.25082,8.352409999999999,14.15712,8.15659L16.4602,5.853553C16.6554,5.658291,16.6554,5.341709,16.4602,5.146447C16.2649,4.9511843,15.9483,4.9511843,15.753,5.146447L13.45001,7.449479999999999C13.25419,7.35577,13.03487,7.3032900000000005,12.8033,7.3032900000000005C11.97487,7.3032900000000005,11.3033,7.97487,11.3033,8.80329C11.3033,9.03487,11.35578,9.254190000000001,11.44949,9.450009999999999L9.450009999999999,11.449480000000001C9.254190000000001,11.35577,9.03487,11.30329,8.8033,11.30329C7.97487,11.30329,7.3033,11.97487,7.3033,12.80329C7.3033,13.03487,7.35578,13.25419,7.44949,13.45001L5.146447,15.753Z" stroke-opacity="0" stroke="none"></path></svg>'), _d = () => $d.cloneNode(!0), kd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M7.573332939453125,14.54567903564453C7.667042939453125,14.741499035644532,7.719512939453125,14.960809035644532,7.719512939453125,15.19239903564453C7.719512939453125,16.02079903564453,7.047942939453125,16.69239903564453,6.219512939453125,16.69239903564453C5.391085939453125,16.69239903564453,4.719512939453125,16.02079903564453,4.719512939453125,15.19239903564453C4.719512939453125,14.36394903564453,5.391085939453125,13.692379035644532,6.219512939453125,13.692379035644532C6.451092939453125,13.692379035644532,6.670412939453125,13.74485903564453,6.866232939453125,13.83856903564453L9.865702939453126,10.83909903564453C9.771992939453124,10.643279035644532,9.719512939453125,10.42395903564453,9.719512939453125,10.192379035644532C9.719512939453125,9.36394903564453,10.391082939453124,8.692379035644532,11.219512939453125,8.692379035644532C11.451092939453126,8.692379035644532,11.670412939453126,8.74485903564453,11.866232939453125,8.838569035644532L15.462112939453124,5.242645035644531C15.657412939453126,5.047383335644532,15.974012939453125,5.047383335644532,16.169212939453125,5.242645035644531C16.364512939453125,5.437907035644531,16.364512939453125,5.754489035644531,16.169212939453125,5.949752035644531L12.573332939453124,9.545679035644532C12.667042939453125,9.74149903564453,12.719512939453125,9.96080903564453,12.719512939453125,10.192379035644532C12.719512939453125,11.020809035644533,12.047942939453126,11.692379035644532,11.219512939453125,11.692379035644532C10.987942939453125,11.692379035644532,10.768632939453125,11.639909035644532,10.572812939453126,11.54619903564453L7.573332939453125,14.54567903564453Z" stroke-opacity="0" stroke="none"></path></svg>'), Ld = () => kd.cloneNode(!0), xd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M15.719512939453125,8.461776733398438C16.547912939453127,8.461776733398438,17.219512939453125,7.7902067333984375,17.219512939453125,6.9617767333984375C17.219512939453125,6.133349733398438,16.547912939453127,5.4617767333984375,15.719512939453125,5.4617767333984375C14.891082939453124,5.4617767333984375,14.219512939453125,6.133349733398438,14.219512939453125,6.9617767333984375C14.219512939453125,7.193346733398437,14.271992939453124,7.412666733398438,14.365692939453124,7.608486733398438L7.366222939453126,14.607956733398437C7.170402939453125,14.514256733398437,6.951082939453125,14.461776733398438,6.719512939453125,14.461776733398438C5.891085939453125,14.461776733398438,5.219512939453125,15.133346733398437,5.219512939453125,15.961776733398438C5.219512939453125,16.79017673339844,5.891085939453125,17.461776733398438,6.719512939453125,17.461776733398438C7.547942939453125,17.461776733398438,8.219512939453125,16.79017673339844,8.219512939453125,15.961776733398438C8.219512939453125,15.730176733398437,8.167032939453126,15.510876733398437,8.073322939453124,15.315066733398437L15.072802939453124,8.315586733398437C15.268612939453124,8.409296733398438,15.487912939453125,8.461776733398438,15.719512939453125,8.461776733398438Z" stroke-opacity="0" stroke="none"></path></svg>'), Ad = () => xd.cloneNode(!0), wd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17.0643,7.033864912109375L18,3.585784912109375L14.5078,4.509695912109375L15.3537,5.344934912109375L6.02026,14.560584912109375C5.87635,14.517484912109374,5.72366,14.494284912109375,5.5655,14.494284912109375C4.7009,14.494284912109375,4,15.186384912109375,4,16.040084912109375C4,16.893784912109375,4.7009,17.585784912109375,5.5655,17.585784912109375C6.43011,17.585784912109375,7.13101,16.893784912109375,7.13101,16.040084912109375C7.13101,15.722284912109375,7.03392,15.426984912109376,6.86744,15.181384912109374L16.0917,6.073604912109375L17.0643,7.033864912109375Z" stroke-opacity="0" stroke="none"></path></svg>'), Md = () => wd.cloneNode(!0), Sd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,13.00505L18.5,13.00505C18.7761,13.00505,19,13.228909999999999,19,13.50505C19,13.781189999999999,18.7761,14.00505,18.5,14.00505L6.91465,14.00505C6.70873,14.58765,6.15311,15.00505,5.5,15.00505C4.671573,15.00505,4,14.33348,4,13.50505C4,12.67662,4.671573,12.00505,5.5,12.00505C6.15311,12.00505,6.70873,12.422450000000001,6.91465,13.00505ZM7.81404,11.625L10.48591,11.625L10.48591,10.90625L9.65193,10.90625L9.65193,7.125L8.997630000000001,7.125C8.71443,7.306641,8.415600000000001,7.419922,7.96443,7.498047L7.96443,8.05078L8.77497,8.05078L8.77497,10.90625L7.81404,10.90625L7.81404,11.625ZM11.081620000000001,11.625L14.0562,11.625L14.0562,10.88281L13.09724,10.88281C12.8863,10.88281,12.59333,10.90625,12.36482,10.93555C13.17537,10.11328,13.84724,9.2207,13.84724,8.39062C13.84724,7.541016,13.28865,7,12.4488,7C11.84333,7,11.446850000000001,7.234375,11.03279,7.679688L11.52497,8.16797C11.747630000000001,7.914062,12.0113,7.697266,12.33552,7.697266C12.7613,7.697266,13.00154,7.982422,13.00154,8.43359C13.00154,9.14648,12.29255,10.00781,11.081620000000001,11.11523L11.081620000000001,11.625ZM15.9605,11.75C16.8121,11.75,17.526899999999998,11.2832,17.526899999999998,10.4375C17.526899999999998,9.82031,17.142200000000003,9.43945,16.6441,9.30078L16.6441,9.27148C17.1129,9.08594,17.3824,8.7207,17.3824,8.21289C17.3824,7.421875,16.8004,7,15.9429,7C15.4215,7,14.9957,7.210938,14.6109,7.541016L15.066,8.11133C15.3258,7.849609,15.5836,7.697266,15.9019,7.697266C16.2789,7.697266,16.4957,7.914062,16.4957,8.28125C16.4957,8.70898,16.2301,9,15.4215,9L15.4215,9.63672C16.3804,9.63672,16.6383,9.91992,16.6383,10.38086C16.6383,10.79688,16.3336,11.03125,15.8824,11.03125C15.4742,11.03125,15.1578,10.82227,14.8922,10.55078L14.4781,11.13281C14.7906,11.486329999999999,15.2652,11.75,15.9605,11.75Z" stroke-opacity="0" stroke="none"></path></svg>'), Td = () => Sd.cloneNode(!0), Pd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.146447,14.178126025390625C2.9511847,13.982826025390626,2.9511847,13.666226025390625,3.146447,13.470926025390625L7.39146,9.225966025390626C7.35417,9.095106025390624,7.33421,8.956946025390625,7.33421,8.814116025390625C7.33421,7.985696025390625,8.00578,7.314116025390625,8.834209999999999,7.314116025390625C8.97703,7.314116025390625,9.11519,7.334086025390625,9.24605,7.371366025390625L13.753,2.864373025390625C13.9483,2.669110325390625,14.2649,2.669110325390625,14.4602,2.864373025390625C14.6554,3.059635025390625,14.6554,3.376217025390625,14.4602,3.571479025390625L10.06916,7.962476025390625C10.23631,8.204386025390626,10.334209999999999,8.497826025390625,10.334209999999999,8.814116025390625C10.334209999999999,9.642546025390626,9.66264,10.314116025390625,8.834209999999999,10.314116025390625C8.51791,10.314116025390625,8.22448,10.216226025390625,7.98256,10.049076025390626L3.853554,14.178126025390625C3.658291,14.373326025390625,3.341709,14.373326025390625,3.146447,14.178126025390625ZM7.67736,19.188526025390626C7.4821,18.993226025390626,7.4821,18.676626025390625,7.67736,18.481426025390626L9.9804,16.178326025390625C9.88669,15.982526025390625,9.834209999999999,15.763226025390624,9.834209999999999,15.531626025390626C9.834209999999999,14.703226025390626,10.50578,14.031626025390626,11.33421,14.031626025390626C11.56579,14.031626025390626,11.78511,14.084126025390624,11.98093,14.177826025390624L13.9804,12.178356025390626C13.8867,11.982536025390624,13.8342,11.763216025390625,13.8342,11.531636025390625C13.8342,10.703206025390624,14.5058,10.031636025390625,15.3342,10.031636025390625C15.5658,10.031636025390625,15.7851,10.084116025390625,15.9809,10.177826025390626L18.284,7.874796025390625C18.4792,7.679536025390625,18.7958,7.679536025390625,18.9911,7.874796025390625C19.1863,8.070056025390624,19.1863,8.386636025390626,18.9911,8.581906025390625L16.688000000000002,10.884936025390624C16.7817,11.080756025390626,16.8342,11.300066025390626,16.8342,11.531636025390625C16.8342,12.360066025390624,16.162599999999998,13.031626025390626,15.3342,13.031626025390626C15.1026,13.031626025390626,14.8833,12.979126025390626,14.6875,12.885426025390625L12.68803,14.884926025390625C12.78174,15.080726025390625,12.83421,15.300026025390626,12.83421,15.531626025390626C12.83421,16.360026025390624,12.16264,17.031626025390626,11.33421,17.031626025390626C11.10264,17.031626025390626,10.88333,16.979126025390627,10.68751,16.885426025390625L8.38446,19.188526025390626C8.1892,19.383726025390626,7.87262,19.383726025390626,7.67736,19.188526025390626Z" stroke-opacity="0" stroke="none"></path></svg>'), Od = () => Pd.cloneNode(!0), Dd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.3367688759765626,12.63173C3.5320318759765623,12.82699,3.8486138759765627,12.82699,4.043876875976562,12.63173L11.822052875976562,4.853553C12.017312875976563,4.658291,12.017312875976563,4.341708,11.822052875976562,4.146446C11.626792875976562,3.9511843,11.310202875976563,3.9511843,11.114942875976563,4.146446L3.3367688759765626,11.92462C3.1415071759765625,12.11988,3.1415071759765625,12.43647,3.3367688759765626,12.63173ZM5.001492875976562,17.0351C4.806232875976562,16.8399,4.806232875976562,16.5233,5.001492875976562,16.328L7.304532875976562,14.025C7.210822875976563,13.82916,7.158352875976563,13.60984,7.158352875976563,13.37827C7.158352875976563,12.54984,7.829922875976562,11.87827,8.658352875976561,11.87827C8.889922875976563,11.87827,9.109232875976563,11.93075,9.305052875976562,12.02446L11.304532875976562,10.02498C11.210822875976563,9.82916,11.158352875976561,9.60984,11.158352875976561,9.37827C11.158352875976561,8.54984,11.829922875976562,7.8782700000000006,12.658352875976563,7.8782700000000006C12.889922875976563,7.8782700000000006,13.109232875976563,7.93075,13.305022875976562,8.024460000000001L15.608122875976562,5.72142C15.803322875976562,5.5261499999999995,16.119922875976563,5.5261499999999995,16.315222875976563,5.72142C16.510422875976563,5.9166799999999995,16.510422875976563,6.23326,16.315222875976563,6.42852L14.012122875976562,8.73156C14.105822875976562,8.92738,14.158322875976562,9.1467,14.158322875976562,9.37827C14.158322875976562,10.2067,13.486822875976562,10.87827,12.658352875976563,10.87827C12.426772875976562,10.87827,12.207452875976562,10.82579,12.011642875976563,10.73209L10.012162875976562,12.73156C10.105872875976562,12.92738,10.158352875976561,13.1467,10.158352875976561,13.37827C10.158352875976561,14.2067,9.486772875976563,14.8783,8.658352875976561,14.8783C8.426772875976562,14.8783,8.207452875976562,14.8258,8.011642875976563,14.7321L5.708602875976562,17.0351C5.513342875976562,17.2304,5.196752875976562,17.2304,5.001492875976562,17.0351ZM10.415712875976563,18.328C10.220452875976562,18.5233,9.903862875976563,18.5233,9.708602875976563,18.328C9.513342875976562,18.1328,9.513342875976562,17.816200000000002,9.708602875976563,17.6209L12.304532875976562,15.025C12.210822875976563,14.8292,12.158352875976563,14.6098,12.158352875976563,14.3783C12.158352875976563,13.54984,12.829922875976562,12.87827,13.658322875976562,12.87827C13.889922875976563,12.87827,14.109222875976563,12.93075,14.305022875976562,13.02446L17.486822875976564,9.84274C17.682022875976564,9.64747,17.99862287597656,9.64747,18.19392287597656,9.84274C18.38912287597656,10.038,18.38912287597656,10.35458,18.19392287597656,10.54984L15.012122875976562,13.73156C15.105822875976562,13.92738,15.158322875976562,14.1467,15.158322875976562,14.3783C15.158322875976562,15.2067,14.486822875976562,15.8783,13.658322875976562,15.8783C13.426822875976562,15.8783,13.207422875976562,15.8258,13.011642875976563,15.7321L10.415712875976563,18.328Z" stroke-opacity="0" stroke="none"></path></svg>'), Id = () => Dd.cloneNode(!0), Nd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M13.1889,6C12.98303,6.582599999999999,12.42741,7,11.7743,7C11.12119,7,10.565570000000001,6.582599999999999,10.35965,6L3.5,6C3.223857,6,3,5.77614,3,5.5C3,5.22386,3.223857,5,3.5,5L10.35965,5C10.565570000000001,4.417404,11.12119,4,11.7743,4C12.42741,4,12.98303,4.417404,13.1889,5L18.5,5C18.7761,5,19,5.22386,19,5.5C19,5.77614,18.7761,6,18.5,6L13.1889,6ZM3,8.5C3,8.22386,3.223857,8,3.5,8L18.5,8C18.7761,8,19,8.22386,19,8.5C19,8.77614,18.7761,9,18.5,9L3.5,9C3.223857,9,3,8.77614,3,8.5ZM3.278549,11.5C3.278549,11.22386,3.502407,11,3.778549,11L18.7785,11C19.0547,11,19.2785,11.22386,19.2785,11.5C19.2785,11.77614,19.0547,12,18.7785,12L3.778549,12C3.502407,12,3.278549,11.77614,3.278549,11.5ZM3.139267,14.5C3.139267,14.2239,3.363124,14,3.6392670000000003,14L18.6393,14C18.915399999999998,14,19.1393,14.2239,19.1393,14.5C19.1393,14.7761,18.915399999999998,15,18.6393,15L3.6392670000000003,15C3.363124,15,3.139267,14.7761,3.139267,14.5ZM13.1889,18C12.98303,18.5826,12.42741,19,11.7743,19C11.12119,19,10.565570000000001,18.5826,10.35965,18L3.778549,18C3.502407,18,3.278549,17.7761,3.278549,17.5C3.278549,17.2239,3.502407,17,3.778549,17L10.35965,17C10.565570000000001,16.4174,11.12119,16,11.7743,16C12.42741,16,12.98303,16.4174,13.1889,17L18.7785,17C19.0547,17,19.2785,17.2239,19.2785,17.5C19.2785,17.7761,19.0547,18,18.7785,18L13.1889,18Z" stroke-opacity="0" stroke="none"></path></svg>'), Ed = () => Nd.cloneNode(!0), Bd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4.91465,6C4.70873,6.582599999999999,4.15311,7,3.5,7C2.671573,7,2,6.32843,2,5.5C2,4.671573,2.671573,4,3.5,4C4.15311,4,4.70873,4.417404,4.91465,5L18.2257,5C18.5018,5,18.7257,5.22386,18.7257,5.5C18.7257,5.77614,18.5018,6,18.2257,6L4.91465,6ZM2.7257,8.5C2.7257,8.22386,2.949558,8,3.2257,8L18.2257,8C18.5018,8,18.7257,8.22386,18.7257,8.5C18.7257,8.77614,18.5018,9,18.2257,9L3.2257,9C2.949558,9,2.7257,8.77614,2.7257,8.5ZM3.00425,11.5C3.00425,11.22386,3.22811,11,3.50425,11L18.5042,11C18.7804,11,19.0042,11.22386,19.0042,11.5C19.0042,11.77614,18.7804,12,18.5042,12L3.50425,12C3.22811,12,3.00425,11.77614,3.00425,11.5ZM2.864967,14.5C2.864967,14.2239,3.08882,14,3.36497,14L18.365,14C18.6411,14,18.865,14.2239,18.865,14.5C18.865,14.7761,18.6411,15,18.365,15L3.36497,15C3.08882,15,2.864967,14.7761,2.864967,14.5ZM20,17.5C20,18.328400000000002,19.3284,19,18.5,19C17.846899999999998,19,17.2913,18.5826,17.0854,18L3.50425,18C3.22811,18,3.00425,17.7761,3.00425,17.5C3.00425,17.2239,3.22811,17,3.50425,17L17.0854,17C17.2913,16.4174,17.846899999999998,16,18.5,16C19.3284,16,20,16.671599999999998,20,17.5Z" stroke-opacity="0" stroke="none"></path></svg>'), Ud = () => Bd.cloneNode(!0), Fd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="5" ry="5" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="3" ry="3" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse></svg>'), Kd = () => Fd.cloneNode(!0), zd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3,7.32468C5.90649,3.3893050000000002,11.49833,2.81306,14.6674,6.31944C14.9056,6.1554199999999994,15.192,6.05979,15.5,6.05979C15.845,6.05979,16.1628,6.17974,16.4162,6.381349999999999L18.4509,4.23827L19,4.816615L16.8945,7.03429C16.962600000000002,7.21075,17,7.40319,17,7.60463C17,8.45782,16.328400000000002,9.14947,15.5,9.14947C14.6716,9.14947,14,8.45782,14,7.60463C14,7.36402,14.0534,7.13625,14.1487,6.93322C11.32695,3.748365,6.25159,4.253956,3.612785,7.82695L3,7.32468ZM14.09,15.4717C15.7427,13.78985,16.244500000000002,11.524740000000001,15.5633,9.30134L15.5618,9.30134L16.3012,9.0502C17.072400000000002,11.56646,16.497700000000002,14.158,14.6282,16.0599C12.28737,18.442,8.62386,18.6988,6.41348,16.4501C4.5526,14.5572,4.52076,11.19671,6.36766,9.3177C7.89069,7.76754,10.07544,7.706189999999999,11.56741,9.22363C11.95453,9.61742,12.24817,10.08363,12.43369,10.57677L14.1451,8.77421L14.6942,9.35256L12.64982,11.50582C12.65827,11.59712,12.66295,11.68839,12.66378,11.77936C12.87398,12.04523,13,12.38451,13,12.7541C13,13.60729,12.32843,14.2989,11.5,14.2989C10.67157,14.2989,10,13.60729,10,12.7541C10,11.90091,10.67157,11.20926,11.5,11.20926C11.60387,11.20926,11.70528,11.220130000000001,11.8032,11.240829999999999L11.81763,11.22564C11.69858,10.71874,11.42858,10.21929,11.0284,9.81179C9.844000000000001,8.60765,8.136890000000001,8.65592,6.90822,9.90586C5.37975,11.460930000000001,5.40693,14.288,6.95404,15.8619C8.84598,17.7867,12.03496,17.5626,14.09,15.4717Z" stroke-opacity="0" stroke="none"></path></svg>'), jd = () => zd.cloneNode(!0), Qd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4,17.0854L4,3.5C4,3.223858,4.22386,3,4.5,3C4.77614,3,5,3.223858,5,3.5L5,10L7.57584,10L9.8127,4.46359C9.91614,4.20756,10.20756,4.08386,10.46359,4.1873000000000005C10.71963,4.29075,10.84333,4.58216,10.73988,4.8382000000000005L8.65438,10L11.08535,10C11.29127,9.4174,11.84689,9,12.5,9C12.65154,9,12.79784,9.02247,12.93573,9.06427L16.6464,5.35355C16.8417,5.15829,17.1583,5.15829,17.3536,5.35355C17.5488,5.54882,17.5488,5.8654,17.3536,6.06066L13.7475,9.66675C13.907,9.90508,14,10.19168,14,10.5C14,11.15311,13.5826,11.70873,13,11.91465L13,14.3638L18.3714,12.1936C18.6274,12.09015,18.918799999999997,12.21385,19.0222,12.46989C19.1257,12.72592,19.002,13.0173,18.746000000000002,13.1208L13,15.4423L13,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854ZM6.3729499999999994,17.0413L12,14.7678L12,11.91465C11.88136,11.87271,11.76956,11.81627,11.66675,11.74746L6.3729499999999994,17.0413ZM12,15.8463L6.6694700000000005,18L12,18L12,15.8463ZM6.38629,15.6137L8.250350000000001,11L11,11L6.38629,15.6137ZM5,11L7.17182,11L5,16.3754L5,11Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Zd = () => Qd.cloneNode(!0), Rd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17,4.5C17,5.32843,16.328400000000002,6,15.5,6C15.0931,6,14.7241,5.83802,14.4539,5.57503L5.98992,8.32515C5.99658,8.38251,6,8.440850000000001,6,8.5C6,9.15311,5.582599999999999,9.70873,5,9.91465L5,11.08535C5.42621,11.236,5.763999999999999,11.57379,5.91465,12L19.5,12C19.7761,12,20,12.22386,20,12.5C20,12.77614,19.7761,13,19.5,13L5.91465,13C5.70873,13.5826,5.15311,14,4.5,14C3.671573,14,3,13.3284,3,12.5C3,11.84689,3.417404,11.29127,4,11.08535L4,9.91465C3.417404,9.70873,3,9.15311,3,8.5C3,7.67157,3.671573,7,4.5,7C4.90411,7,5.2709,7.15981,5.5406200000000005,7.41967L14.0093,4.66802C14.0032,4.6128599999999995,14,4.5568,14,4.5C14,3.671573,14.6716,3,15.5,3C16.328400000000002,3,17,3.671573,17,4.5ZM4,15.5C4,15.2239,4.22386,15,4.5,15L19.5,15C19.7761,15,20,15.2239,20,15.5C20,15.7761,19.7761,16,19.5,16L4.5,16C4.22386,16,4,15.7761,4,15.5ZM4,18.5C4,18.2239,4.22386,18,4.5,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L4.5,19C4.22386,19,4,18.7761,4,18.5Z" stroke-opacity="0" stroke="none"></path></svg>'), Vd = () => Rd.cloneNode(!0), qd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M20,3.5C20,4.15311,19.5826,4.70873,19,4.91465L19,18.5C19,18.7761,18.7761,19,18.5,19L4.91465,19C4.70873,19.5826,4.15311,20,3.5,20C2.671573,20,2,19.3284,2,18.5C2,17.846899999999998,2.417404,17.2913,3,17.0854L3,3.5C3,3.22386,3.22386,3,3.5,3L17.0854,3C17.2913,2.417404,17.846899999999998,2,18.5,2C19.3284,2,20,2.671573,20,3.5ZM17.0854,4C17.236,4.42621,17.5738,4.763999999999999,18,4.91465L18,8L14,8L14,4L17.0854,4ZM13,4L13,8L9,8L9,4L13,4ZM13,9L9,9L9,13L13,13L13,9ZM13,14L9,14L9,18L13,18L13,14ZM14,18L14,14L18,14L18,18L14,18ZM18,13L14,13L14,9L18,9L18,13ZM4.91465,18C4.763999999999999,17.5738,4.42621,17.236,4,17.0854L4,14L8,14L8,18L4.91465,18ZM4,8L4,4L8,4L8,8L4,8ZM8,9L8,13L4,13L4,9L8,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Hd = () => qd.cloneNode(!0), Yd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" fill="none" stroke-opacity="1" stroke-width="1"></ellipse></svg>'), Gd = () => Yd.cloneNode(!0), Wd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.57625,6.9981C11.55099,6.999359999999999,11.52557,7,11.5,7C11.34,7,11.18584,6.97495,11.04125,6.9285499999999995L5.55401,16.4327C5.713760000000001,16.5905,5.83826,16.7839,5.91465,17L16.0854,17C16.2187,16.622700000000002,16.4987,16.314700000000002,16.8569,16.1445L11.57625,6.9981ZM12.50759,6.611219999999999C12.81005,6.336790000000001,13,5.94058,13,5.5C13,4.671573,12.32843,4,11.5,4C10.67157,4,10,4.671573,10,5.5C10,5.80059,10.08841,6.08052,10.24066,6.31522L4.64514,16.0069C4.59738,16.002299999999998,4.54896,16,4.5,16C3.671573,16,3,16.671599999999998,3,17.5C3,18.328400000000002,3.671573,19,4.5,19C5.15311,19,5.70873,18.5826,5.91465,18L16.0854,18C16.2913,18.5826,16.846899999999998,19,17.5,19C18.328400000000002,19,19,18.328400000000002,19,17.5C19,16.8365,18.5691,16.2735,17.971899999999998,16.075699999999998L12.50759,6.611219999999999Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Xd = () => Wd.cloneNode(!0), Jd = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19,4.5C19,5.15311,18.5826,5.70873,18,5.91465L18,18.5C18,18.7761,17.7761,19,17.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854L4,4.5C4,4.22386,4.22386,4,4.5,4L16.0854,4C16.2913,3.417404,16.846899999999998,3,17.5,3C18.328400000000002,3,19,3.671573,19,4.5ZM5,5L16.0854,5C16.236,5.42621,16.5738,5.763999999999999,17,5.91465L17,18L5.91465,18C5.763999999999999,17.5738,5.42621,17.236,5,17.0854L5,5Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), eh = () => Jd.cloneNode(!0), th = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19.6401,7.99355C20.4028,7.92291,21,7.2811900000000005,21,6.5C21,5.671573,20.3284,5,19.5,5C18.8469,5,18.2913,5.417404,18.0854,6L7.62067,6C7.34453,6,7.12067,6.22386,7.12067,6.5C7.12067,6.5479,7.12741,6.59423,7.13999,6.63809L3.2294099999999997,15.0243C2.530138,15.1517,2,15.764,2,16.5C2,17.328400000000002,2.671573,18,3.5,18C4.15311,18,4.70873,17.5826,4.91465,17L14.5963,17C14.6456,17.076,14.7162,17.1396,14.8044,17.1807C15.0546,17.2974,15.3521,17.1891,15.4688,16.9388L19.6401,7.99355ZM14.7896,16.0293L18.6551,7.739599999999999C18.3942,7.56144,18.1925,7.30307,18.0854,7L8.0746,7L4.25044,15.2009C4.55701,15.3784,4.79493,15.6613,4.91465,16L14.6207,16C14.68,16,14.7368,16.0103,14.7896,16.0293Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), rh = () => th.cloneNode(!0), nh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.134443814697265,7.494615087890625L8.764323814697265,7.494615087890625L8.764323814697265,3.414215087890625L8.310223814697267,3.414215087890625L7.294603814697266,4.005035087890625L7.289713814697266,4.634915087890625L8.134443814697265,4.149892087890625L8.134443814697265,7.494615087890625ZM18.832003814697266,6.933095087890624Q19.004603814697266,6.635245087890625,19.004603814697266,6.2543850878906255Q19.004603814697266,5.884915087890625,18.845103814697264,5.593575087890625Q18.685503814697267,5.3006050878906255,18.399103814697266,5.136225087890625Q18.114303814697266,4.9702050878906245,17.754603814697266,4.9653250878906245L18.820603814697265,3.840647087890625L18.820603814697265,3.414215087890625L16.519203814697264,3.414215087890625L16.519203814697264,3.939931087890625L18.050803814697264,3.939931087890625L16.719403814697266,5.334785087890625L17.074203814697263,5.7205350878906245Q17.254903814697265,5.484525087890625,17.619503814697268,5.484525087890625Q17.980803814697268,5.484525087890625,18.187503814697266,5.689605087890625Q18.394203814697267,5.894685087890625,18.394203814697267,6.2543850878906255Q18.394203814697267,6.604315087890625,18.187503814697266,6.822415087890625Q17.980803814697268,7.0405150878906255,17.640603814697265,7.0405150878906255Q17.334603814697267,7.0405150878906255,17.124703814697266,6.890775087890625Q16.914703814697265,6.739415087890626,16.820303814697265,6.469225087890624L16.354803814697263,6.744295087890626Q16.480103814697266,7.125155087890625,16.821903814697265,7.341625087890625Q17.165403814697264,7.559725087890625,17.640603814697265,7.559725087890625Q18.039403814697266,7.559725087890625,18.348603814697267,7.393705087890625Q18.659503814697267,7.229315087890625,18.832003814697266,6.933095087890624ZM10.000003814697266,10.634915087890626C10.000003814697266,11.024655087890626,9.851363814697265,11.379685087890625,9.607683814697266,11.646395087890625L12.168903814697266,15.171615087890626C12.275403814697265,15.147615087890625,12.386203814697266,15.134915087890626,12.500003814697266,15.134915087890626C12.596503814697266,15.134915087890626,12.690803814697265,15.144015087890624,12.782303814697265,15.161415087890624L16.108803814697268,11.196955087890625C16.038703814697264,11.023375087890624,16.000003814697266,10.833655087890625,16.000003814697266,10.634915087890626C16.000003814697266,9.806495087890625,16.671603814697264,9.134915087890626,17.500003814697266,9.134915087890626C18.328403814697264,9.134915087890626,19.000003814697266,9.806495087890625,19.000003814697266,10.634915087890626C19.000003814697266,11.463345087890625,18.328403814697264,12.134915087890626,17.500003814697266,12.134915087890626C17.239503814697265,12.134915087890626,16.994503814697268,12.068495087890625,16.781003814697264,11.951675087890624L13.654703814697266,15.677415087890624C13.870303814697266,15.937215087890625,14.000003814697266,16.270915087890625,14.000003814697266,16.634915087890626C14.000003814697266,17.463315087890624,13.328403814697266,18.134915087890626,12.500003814697266,18.134915087890626C11.671573814697265,18.134915087890626,11.000003814697266,17.463315087890624,11.000003814697266,16.634915087890626C11.000003814697266,16.284415087890626,11.120193814697265,15.962015087890626,11.321603814697266,15.706715087890625L8.715393814697265,12.119565087890624C8.645053814697267,12.129685087890625,8.573143814697266,12.134915087890626,8.500003814697266,12.134915087890626C8.162103814697264,12.134915087890626,7.8503038146972655,12.023195087890626,7.599523814697266,11.834665087890626L4.505583814697266,15.521915087890624C4.809213814697266,15.796415087890624,5.000003814697266,16.193415087890624,5.000003814697266,16.634915087890626C5.000003814697266,17.463315087890624,4.328433814697266,18.134915087890626,3.5000038146972656,18.134915087890626C2.6715768146972656,18.134915087890626,2.0000038146972656,17.463315087890624,2.0000038146972656,16.634915087890626C2.0000038146972656,15.806515087890626,2.6715768146972656,15.134915087890626,3.5000038146972656,15.134915087890626C3.508253814697266,15.134915087890626,3.5164838146972657,15.135015087890626,3.524703814697266,15.135115087890625L7.033823814697266,10.953115087890625C7.011673814697265,10.850565087890626,7.000003814697266,10.744105087890624,7.000003814697266,10.634915087890626C7.000003814697266,9.806495087890625,7.671573814697266,9.134915087890626,8.500003814697266,9.134915087890626C9.328433814697267,9.134915087890626,10.000003814697266,9.806495087890625,10.000003814697266,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), ih = () => nh.cloneNode(!0), oh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.13444,7.494615087890625L8.76432,7.494615087890625L8.76432,3.414215087890625L8.310220000000001,3.414215087890625L7.2946,4.005035087890625L7.28971,4.634915087890625L8.13444,4.149892087890625L8.13444,7.494615087890625ZM18.832,6.929835087890625Q19.0046,6.635245087890625,19.0046,6.2543850878906255Q19.0046,5.889805087890625,18.8451,5.5952050878906245Q18.6855,5.3006050878906255,18.3975,5.132965087890625Q18.1094,4.9653250878906245,17.7399,4.9653250878906245Q17.435499999999998,4.9653250878906245,17.1556,5.149245087890625L17.2793,3.939931087890625L18.8304,3.939931087890625L18.8304,3.414215087890625L16.7406,3.414215087890625L16.5094,5.665195087890625L17.0156,5.795405087890625Q17.095399999999998,5.655425087890626,17.2516,5.570795087890625Q17.4095,5.484525087890625,17.6357,5.484525087890625Q17.9694,5.484525087890625,18.1842,5.697745087890625Q18.4007,5.909335087890625,18.4007,6.2543850878906255Q18.4007,6.604315087890625,18.1842,6.822415087890625Q17.9694,7.0405150878906255,17.6292,7.0405150878906255Q17.3298,7.0405150878906255,17.119799999999998,6.890775087890625Q16.9098,6.739415087890626,16.825200000000002,6.474115087890625L16.3597,6.749175087890626Q16.470399999999998,7.110505087890624,16.807299999999998,7.335115087890625Q17.144199999999998,7.559725087890625,17.6292,7.559725087890625Q18.0296,7.559725087890625,18.3438,7.392075087890625Q18.6595,7.224435087890625,18.832,6.929835087890625ZM10,10.634915087890626C10,11.024655087890626,9.85136,11.379685087890625,9.60768,11.646395087890625L12.1689,15.171615087890626C12.2754,15.147615087890625,12.3862,15.134915087890626,12.5,15.134915087890626C12.5965,15.134915087890626,12.6908,15.144015087890624,12.7823,15.161415087890624L16.108800000000002,11.196955087890625C16.0387,11.023375087890624,16,10.833655087890625,16,10.634915087890626C16,9.806495087890625,16.671599999999998,9.134915087890626,17.5,9.134915087890626C18.3284,9.134915087890626,19,9.806495087890625,19,10.634915087890626C19,11.463345087890625,18.3284,12.134915087890626,17.5,12.134915087890626C17.2395,12.134915087890626,16.994500000000002,12.068505087890625,16.781,11.951675087890624L13.6547,15.677415087890624C13.8703,15.937215087890625,14,16.270915087890625,14,16.634915087890626C14,17.463315087890624,13.3284,18.134915087890626,12.5,18.134915087890626C11.67157,18.134915087890626,11,17.463315087890624,11,16.634915087890626C11,16.284415087890626,11.12019,15.962015087890626,11.3216,15.706715087890625L8.71539,12.119565087890624C8.645050000000001,12.129685087890625,8.57314,12.134915087890626,8.5,12.134915087890626C8.162099999999999,12.134915087890626,7.8503,12.023195087890626,7.59952,11.834665087890626L4.50558,15.521915087890624C4.80921,15.796415087890624,5,16.193415087890624,5,16.634915087890626C5,17.463315087890624,4.32843,18.134915087890626,3.5,18.134915087890626C2.671573,18.134915087890626,2,17.463315087890624,2,16.634915087890626C2,15.806515087890626,2.671573,15.134915087890626,3.5,15.134915087890626C3.5082500000000003,15.134915087890626,3.51648,15.135015087890626,3.5247,15.135115087890625L7.03382,10.953115087890625C7.01167,10.850565087890626,7,10.744105087890624,7,10.634915087890626C7,9.806495087890625,7.67157,9.134915087890626,8.5,9.134915087890626C9.32843,9.134915087890626,10,9.806495087890625,10,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), ah = () => oh.cloneNode(!0), sh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M18.8532,7.020985087890625Q19.0257,6.734525087890625,19.0257,6.369945087890625Q19.0257,6.020005087890625,18.8499,5.754705087890625Q18.6758,5.489415087890626,18.3649,5.339675087890625Q18.5944,5.209465087890625,18.7214,4.994615087890625Q18.8499,4.779775087890625,18.8499,4.5193550878906255Q18.8499,4.2003480878906245,18.7002,3.951324087890625Q18.5505,3.700673087890625,18.277,3.557444087890625Q18.0052,3.414215087890625,17.6455,3.414215087890625Q17.285800000000002,3.414215087890625,17.0107,3.557444087890625Q16.7357,3.700673087890625,16.5843,3.951324087890625Q16.4346,4.2003480878906245,16.4346,4.5193550878906255Q16.4346,4.779775087890625,16.561500000000002,4.994615087890625Q16.6901,5.209465087890625,16.919600000000003,5.339675087890625Q16.6055,5.489415087890626,16.4297,5.757965087890625Q16.255499999999998,6.024895087890625,16.255499999999998,6.369945087890625Q16.255499999999998,6.734525087890625,16.4297,7.020985087890625Q16.6055,7.305815087890625,16.919600000000003,7.465325087890625Q17.2354,7.624825087890625,17.6455,7.624825087890625Q18.0557,7.624825087890625,18.3682,7.465325087890625Q18.6807,7.305815087890625,18.8532,7.020985087890625ZM8.76432,7.559725087890625L8.13444,7.559725087890625L8.13444,4.214996087890625L7.28971,4.700025087890625L7.2946,4.070139087890625L8.310220000000001,3.479319087890625L8.76432,3.479319087890625L8.76432,7.559725087890625ZM17.1816,4.955555087890625Q17.0042,4.784655087890625,17.0042,4.5095950878906255Q17.0042,4.229645087890625,17.18,4.057119087890625Q17.355800000000002,3.884592087890625,17.6455,3.884592087890625Q17.935200000000002,3.884592087890625,18.1077,4.057119087890625Q18.2803,4.229645087890625,18.2803,4.5095950878906255Q18.2803,4.784655087890625,18.1045,4.955555087890625Q17.930300000000003,5.124825087890625,17.6455,5.124825087890625Q17.3607,5.124825087890625,17.1816,4.955555087890625ZM18.2217,5.7953950878906255Q18.4398,6.005365087890625,18.4398,6.3552950878906245Q18.4398,6.705235087890625,18.2217,6.915195087890625Q18.0052,7.125155087890625,17.6455,7.125155087890625Q17.285800000000002,7.125155087890625,17.067700000000002,6.915195087890625Q16.849600000000002,6.705235087890625,16.849600000000002,6.3552950878906245Q16.849600000000002,6.005365087890625,17.064500000000002,5.7953950878906255Q17.2793,5.585435087890625,17.6455,5.585435087890625Q18.0052,5.585435087890625,18.2217,5.7953950878906255ZM9.60768,11.711495087890626C9.85136,11.444785087890626,10,11.089765087890626,10,10.700025087890625C10,9.871595087890626,9.32843,9.200025087890625,8.5,9.200025087890625C7.67157,9.200025087890625,7,9.871595087890626,7,10.700025087890625C7,10.809205087890625,7.01167,10.915665087890625,7.03382,11.018215087890624L3.5247,15.200215087890625C3.51648,15.200115087890625,3.5082500000000003,15.200015087890625,3.5,15.200015087890625C2.671573,15.200015087890625,2,15.871615087890625,2,16.700015087890627C2,17.528415087890625,2.671573,18.200015087890627,3.5,18.200015087890627C4.32843,18.200015087890627,5,17.528415087890625,5,16.700015087890627C5,16.258515087890625,4.80921,15.861515087890625,4.50558,15.587015087890626L7.59952,11.899765087890625C7.8503,12.088295087890625,8.162099999999999,12.200025087890625,8.5,12.200025087890625C8.57314,12.200025087890625,8.645050000000001,12.194785087890626,8.71539,12.184675087890625L11.3216,15.771815087890625C11.12019,16.027215087890625,11,16.349515087890623,11,16.700015087890627C11,17.528415087890625,11.67157,18.200015087890627,12.5,18.200015087890627C13.3284,18.200015087890627,14,17.528415087890625,14,16.700015087890627C14,16.336015087890623,13.8703,16.002315087890626,13.6547,15.742515087890625L16.781,12.016775087890625C16.994500000000002,12.133605087890626,17.2395,12.200025087890625,17.5,12.200025087890625C18.3284,12.200025087890625,19,11.528445087890624,19,10.700025087890625C19,9.871595087890626,18.3284,9.200025087890625,17.5,9.200025087890625C16.671599999999998,9.200025087890625,16,9.871595087890626,16,10.700025087890625C16,10.898765087890624,16.0387,11.088475087890625,16.108800000000002,11.262055087890625L12.7823,15.226515087890625C12.6908,15.209115087890625,12.5965,15.200015087890625,12.5,15.200015087890625C12.3862,15.200015087890625,12.2754,15.212715087890626,12.1689,15.236715087890625L9.60768,11.711495087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), lh = () => sh.cloneNode(!0), ch = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M9.474616630859375,7.494615087890625L8.844736630859375,7.494615087890625L8.844736630859375,4.149892087890625L8.000006630859374,4.634915087890625L8.004896630859374,4.005035087890625L9.020516630859376,3.414215087890625L9.474616630859375,3.414215087890625L9.474616630859375,7.494615087890625ZM18.529296630859378,4.8318550878906255Q18.307996630859375,5.028795087890625,18.122396630859377,5.385245087890625Q17.868496630859376,5.019035087890625,17.629196630859376,4.8269750878906255Q17.389996630859375,4.634915087890625,17.168596630859376,4.634915087890625Q16.794296630859375,4.634915087890625,16.522496630859376,4.976715087890625Q16.252296630859377,5.3168850878906255,16.252296630859377,5.7856350878906255Q16.252296630859377,6.218575087890625,16.502896630859375,6.521315087890625Q16.755196630859373,6.822415087890625,17.114896630859377,6.822415087890625Q17.368796630859375,6.822415087890625,17.588596630859374,6.625475087890624Q17.809896630859377,6.428535087890625,17.998696630859374,6.0688350878906245Q18.249396630859373,6.439935087890625,18.488596630859377,6.631985087890625Q18.727896630859377,6.822415087890625,18.952496630859375,6.822415087890625Q19.326796630859373,6.822415087890625,19.596996630859376,6.482245087890625Q19.868796630859375,6.140455087890626,19.868796630859375,5.671705087890626Q19.868796630859375,5.238755087890625,19.618196630859376,4.937655087890625Q19.367496630859375,4.634915087890625,19.006196630859375,4.634915087890625Q18.750696630859377,4.634915087890625,18.529296630859378,4.8318550878906255ZM18.337296630859377,5.674955087890625L18.278696630859375,5.596835087890625Q18.449596630859375,5.272935087890625,18.622096630859374,5.1101750878906245Q18.794596630859374,4.947415087890625,18.967096630859373,4.947415087890625Q19.194996630859375,4.947415087890625,19.346396630859374,5.1345950878906255Q19.497696630859377,5.320135087890625,19.497696630859377,5.598455087890625Q19.497696630859377,5.8914250878906245,19.360996630859376,6.096505087890625Q19.224296630859374,6.301585087890626,19.027396630859375,6.301585087890626Q18.915096630859374,6.301585087890626,18.742496630859375,6.146965087890624Q18.569996630859375,5.992335087890625,18.337296630859377,5.674955087890625ZM17.785496630859377,5.779125087890625L17.842496630859372,5.857245087890625Q17.668296630859373,6.186025087890625,17.495796630859374,6.348785087890625Q17.324896630859374,6.509915087890625,17.153996630859375,6.509915087890625Q16.926096630859377,6.509915087890625,16.774796630859377,6.324375087890624Q16.623396630859375,6.137195087890625,16.623396630859375,5.858875087890625Q16.623396630859375,5.565905087890625,16.761696630859376,5.360825087890625Q16.900096630859373,5.1557550878906255,17.095396630859376,5.1557550878906255Q17.228896630859374,5.1557550878906255,17.365596630859375,5.2778250878906245Q17.502296630859377,5.399895087890625,17.785496630859377,5.779125087890625ZM10.710296630859375,10.634915087890626C10.710296630859375,11.024655087890626,10.561656630859375,11.379685087890625,10.317976630859375,11.646395087890625L12.879196630859376,15.171615087890626C12.985696630859374,15.147615087890625,13.096496630859376,15.134915087890626,13.210296630859375,15.134915087890626C13.306796630859376,15.134915087890626,13.401096630859374,15.144015087890624,13.492596630859374,15.161415087890624L16.819096630859377,11.196955087890625C16.748996630859374,11.023375087890624,16.710296630859375,10.833655087890625,16.710296630859375,10.634915087890626C16.710296630859375,9.806495087890625,17.381896630859373,9.134915087890626,18.210296630859375,9.134915087890626C19.038696630859373,9.134915087890626,19.710296630859375,9.806495087890625,19.710296630859375,10.634915087890626C19.710296630859375,11.463345087890625,19.038696630859373,12.134915087890626,18.210296630859375,12.134915087890626C17.949796630859375,12.134915087890626,17.704796630859377,12.068505087890625,17.491296630859374,11.951675087890624L14.364996630859375,15.677415087890624C14.580596630859375,15.937215087890625,14.710296630859375,16.270915087890625,14.710296630859375,16.634915087890626C14.710296630859375,17.463315087890624,14.038696630859375,18.134915087890626,13.210296630859375,18.134915087890626C12.381866630859374,18.134915087890626,11.710296630859375,17.463315087890624,11.710296630859375,16.634915087890626C11.710296630859375,16.284415087890626,11.830486630859374,15.962015087890626,12.031896630859375,15.706715087890625L9.425686630859374,12.119565087890624C9.355346630859376,12.129685087890625,9.283436630859375,12.134915087890626,9.210296630859375,12.134915087890626C8.872396630859374,12.134915087890626,8.560596630859376,12.023195087890626,8.309816630859375,11.834665087890626L5.215876630859375,15.521915087890624C5.519506630859375,15.796415087890624,5.710296630859375,16.193415087890624,5.710296630859375,16.634915087890626C5.710296630859375,17.463315087890624,5.038726630859375,18.134915087890626,4.210296630859375,18.134915087890626C3.381869630859375,18.134915087890626,2.710296630859375,17.463315087890624,2.710296630859375,16.634915087890626C2.710296630859375,15.806515087890626,3.381869630859375,15.134915087890626,4.210296630859375,15.134915087890626C4.218546630859375,15.134915087890626,4.226776630859375,15.135015087890626,4.234996630859375,15.135115087890625L7.744116630859375,10.953115087890625C7.721966630859375,10.850565087890626,7.710296630859375,10.744105087890624,7.710296630859375,10.634915087890626C7.710296630859375,9.806495087890625,8.381866630859374,9.134915087890626,9.210296630859375,9.134915087890626C10.038726630859376,9.134915087890626,10.710296630859375,9.806495087890625,10.710296630859375,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), uh = () => ch.cloneNode(!0), dh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M21,5.5C21,6.32843,20.3284,7,19.5,7C19.4136,7,19.3289,6.99269,19.2465,6.97866L15.6257,15.5086C15.8587,15.7729,16,16.119999999999997,16,16.5C16,17.328400000000002,15.3284,18,14.5,18C13.8469,18,13.2913,17.5826,13.0854,17L3.91465,17C3.70873,17.5826,3.15311,18,2.5,18C1.671573,18,1,17.328400000000002,1,16.5C1,15.6716,1.671573,15,2.5,15C2.5840199999999998,15,2.66643,15.0069,2.74668,15.0202L6.36934,6.48574C6.13933,6.22213,6,5.87733,6,5.5C6,4.671573,6.67157,4,7.5,4C8.15311,4,8.70873,4.417404,8.91465,5L18.0854,5C18.2913,4.417404,18.8469,4,19.5,4C20.3284,4,21,4.671573,21,5.5ZM18.0854,6L8.91465,6C8.892579999999999,6.06243,8.8665,6.12296,8.83672,6.18128L13.9814,15.0921C14.143,15.0325,14.3177,15,14.5,15C14.584,15,14.6664,15.0069,14.7467,15.0202L18.3693,6.48574C18.2462,6.3446,18.149,6.1802,18.0854,6ZM13.2036,15.745L8.0861,6.8811800000000005C7.90605,6.95768,7.70797,7,7.5,7C7.41359,7,7.32888,6.99269,7.24647,6.97866L3.62571,15.5086C3.7512,15.651,3.8501,15.8174,3.91465,16L13.0854,16C13.1169,15.9108,13.1566,15.8255,13.2036,15.745Z" stroke-opacity="0" stroke="none"></path></svg>'), hh = () => dh.cloneNode(!0), fh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.92159,5.93994C6.04014,5.90529,6.152620000000001,5.85639,6.25704,5.79523L9.12729,9.89437C9.045449999999999,10.07959,9,10.28449,9,10.5C9,10.79522,9.08529,11.07053,9.232569999999999,11.30262L4.97573,16.7511L5.92159,5.93994ZM4.92259,5.8848400000000005C4.38078,5.658659999999999,4,5.1238,4,4.5C4,3.671573,4.67157,3,5.5,3C6.2157,3,6.81433,3.50124,6.96399,4.17183L15.1309,4.88634C15.3654,4.36387,15.8902,4,16.5,4C17.328400000000002,4,18,4.67157,18,5.5C18,6.08983,17.659599999999998,6.60015,17.1645,6.84518L18.4264,14.0018C18.4508,14.0006,18.4753,14,18.5,14C19.3284,14,20,14.6716,20,15.5C20,16.328400000000002,19.3284,17,18.5,17C17.932499999999997,17,17.4386,16.6849,17.183799999999998,16.22L5.99686,18.5979C5.946429999999999,19.3807,5.29554,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.869300000000003,3.389292,17.3295,3.94071,17.1077L4.92259,5.8848400000000005ZM5.72452,17.6334C5.69799,17.596,5.6698,17.5599,5.64004,17.525100000000002L10.01843,11.92103C10.16958,11.97223,10.33155,12,10.5,12C10.80059,12,11.08052,11.91158,11.31522,11.75934L17.0606,15.0765C17.0457,15.1271,17.0335,15.1789,17.023899999999998,15.2317L5.72452,17.6334ZM11.92855,10.95875L17.4349,14.1379L16.1699,6.96356C15.9874,6.92257,15.8174,6.8483,15.6667,6.74746L11.99771,10.4165C11.99923,10.44414,12,10.47198,12,10.5C12,10.66,11.97495,10.814160000000001,11.92855,10.95875ZM10.5,9C10.259830000000001,9,10.03285,9.05644,9.83159,9.15679L7.04919,5.1831L15.0493,5.88302C15.054,5.90072,15.059,5.91829,15.0643,5.9357299999999995L11.56066,9.43934C11.28921,9.16789,10.91421,9,10.5,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), yh = () => fh.cloneNode(!0), gh = /* @__PURE__ */ $('<svg viewBox="0 0 22 22"><path d="M4.727219638671875,8.007996215820313L9.973849638671876,2.7629472158203123C10.167279638671875,2.5696791158203123,10.480729638671875,2.5696791158203123,10.674169638671875,2.7629472158203123L13.223329638671874,5.311756215820313C13.416929638671874,5.505236215820313,13.416929638671874,5.8189862158203125,13.223329638671874,6.012466215820313L7.977129638671875,11.257906215820313C7.379859638671875,11.855176215820313,7.407609638671875,12.909396215820312,8.033809638671876,13.535596215820313C8.660409638671876,14.162596215820313,9.713849638671874,14.189996215820312,10.311129638671876,13.591896215820313L15.556929638671875,8.346066215820311C15.750429638671875,8.152526215820313,16.064229638671875,8.152526215820313,16.257629638671872,8.346066215820311L18.806529638671876,10.895266215820312C19.000029638671876,11.088746215820313,19.000029638671876,11.402496215820312,18.806529638671876,11.595976215820313L13.560629638671875,16.841796215820313C11.165619638671876,19.237196215820312,7.197149638671875,19.19919621582031,4.783499638671875,16.785496215820313C2.3698426386718747,14.371896215820312,2.331397638671875,10.403416215820313,4.727219638671875,8.007996215820313ZM12.172299638671875,5.662106215820312L10.323809638671875,3.8136162158203124L5.4287196386718755,8.709096215820313C3.422893638671875,10.714536215820312,3.4549956386718748,14.055196215820313,5.484999638671875,16.08479621582031C7.514609638671875,18.114796215820313,10.855289638671875,18.146496215820314,12.860719638671876,16.141096215820312L15.465629638671874,13.535796215820312L14.090929638671875,12.160756215820312L14.791629638671875,11.460436215820312L16.166229638671876,12.834996215820313L17.755829638671877,11.245226215820313L15.907729638671874,9.396736215820312L11.011839638671875,14.292596215820312C10.042809638671875,15.262396215820312,8.418249638671874,15.243796215820312,7.406019638671875,14.306496215820312L7.333099638671875,14.236296215820312C6.327599638671876,13.230796215820313,6.284009638671876,11.550396215820312,7.276419638671875,10.557586215820312L9.882199638671874,7.952026215820313L8.501079638671875,6.570906215820313L9.201789638671876,5.870186215820313L10.582939638671874,7.251336215820312L12.172299638671875,5.662106215820312Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), ph = (e) => (() => {
  const t = gh.cloneNode(!0);
  return xe(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), Ch = /* @__PURE__ */ $('<svg viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_615"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_615)"><path d="M19.672,3.0673368C19.4417,2.9354008,19.1463,3.00292252,18.9994,3.2210900000000002L17.4588,5.50622L16.743299999999998,3.781253L13.9915,7.4662L13.9618,7.51108C13.8339,7.72862,13.8936,8.005659999999999,14.1004,8.15391L14.1462,8.183430000000001C14.3683,8.308720000000001,14.6511,8.25001,14.8022,8.047229999999999L16.4907,5.78571L17.246299999999998,7.60713L19.8374,3.7635389999999997L19.8651,3.717088C19.9871,3.484615,19.9023,3.199273,19.672,3.0673368ZM4.79974,8.462530000000001L10.117740000000001,3.252975C10.31381,3.0610145,10.63152,3.0610145,10.82759,3.252975L13.4115,5.78453C13.6076,5.976710000000001,13.6076,6.28833,13.4115,6.4805L8.093869999999999,11.69045C7.48847,12.28368,7.51659,13.3308,8.151309999999999,13.9528C8.786439999999999,14.5755,9.85421,14.6027,10.45961,14.0087L15.7768,8.79831C15.9729,8.60609,16.2909,8.60609,16.487099999999998,8.79831L19.0705,11.33026C19.2667,11.52244,19.2667,11.83406,19.0705,12.02623L13.7533,17.2366C11.32572,19.6158,7.30328,19.578,4.85679,17.1807C2.410298,14.7834,2.371331,10.84174,4.79974,8.462530000000001ZM12.3461,6.1325199999999995L10.47246,4.29654L5.51079,9.15889C3.477674,11.15076,3.510214,14.4688,5.56784,16.4847C7.62506,18.500999999999998,11.01117,18.5325,13.0439,16.540599999999998L15.6842,13.9529L14.2908,12.58718L15.0011,11.89161L16.394399999999997,13.2569L18.0056,11.67786L16.1323,9.84188L11.16985,14.7046C10.18764,15.6679,8.540980000000001,15.6494,7.51498,14.7184L7.44107,14.6487C6.4219,13.65,6.37771,11.98096,7.38362,10.994869999999999L10.02485,8.40693L8.624939999999999,7.03516L9.335180000000001,6.33919L10.73512,7.71099L12.3461,6.1325199999999995Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), mh = (e) => (() => {
  const t = Ch.cloneNode(!0);
  return xe(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), vh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,17C5.80945,17,3.667717,12.85,3.113386,11.575C2.9622047,11.2,2.9622047,10.8,3.113386,10.425C3.667717,9.15,5.80945,5,11,5C16.165399999999998,5,18.3323,9.15,18.8866,10.425C19.0378,10.8,19.0378,11.2,18.8866,11.575C18.3323,12.85,16.165399999999998,17,11,17ZM4.04567,10.8C3.995276,10.925,3.995276,11.05,4.04567,11.175C4.52441,12.325,6.43937,16,11,16C15.5606,16,17.4756,12.325,17.9543,11.2C18.0047,11.075,18.0047,10.95,17.9543,10.825C17.4756,9.675,15.5606,6,11,6C6.43937,6,4.52441,9.675,4.04567,10.8ZM11,13.5C9.61417,13.5,8.480319999999999,12.375,8.480319999999999,11C8.480319999999999,9.625,9.61417,8.5,11,8.5C12.38583,8.5,13.5197,9.625,13.5197,11C13.5197,12.375,12.38583,13.5,11,13.5ZM11,9.5C10.1685,9.5,9.48819,10.175,9.48819,11C9.48819,11.825,10.1685,12.5,11,12.5C11.8315,12.5,12.51181,11.825,12.51181,11C12.51181,10.175,11.8315,9.5,11,9.5Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), bh = () => vh.cloneNode(!0), $h = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.80417,14.9887L4.62563,16.167299999999997C4.43037,16.3625,4.43037,16.6791,4.62563,16.8744C4.82089,17.0696,5.13748,17.0696,5.332739999999999,16.8744L6.62638,15.5807C7.75595,16.290100000000002,9.19328,16.7929,11,16.7929C16.165399999999998,16.7929,18.3323,12.64289,18.8866,11.36789C19.0378,10.99289,19.0378,10.59289,18.8866,10.21789C18.5549,9.45486,17.6456,7.66212,15.8617,6.34545L17.3536,4.853553C17.5488,4.658291,17.5488,4.341709,17.3536,4.146447C17.1583,3.9511845,16.8417,3.9511845,16.6464,4.146447L15.0014,5.7915399999999995C13.9314,5.1969,12.61166,4.792893,11,4.792893C5.80945,4.792893,3.667717,8.94289,3.113386,10.21789C2.9622049,10.59289,2.9622049,10.99289,3.113386,11.36789C3.424435,12.08333,4.2353000000000005,13.70399,5.80417,14.9887ZM7.36012,14.847C8.32327,15.4074,9.52286,15.7929,11,15.7929C15.5606,15.7929,17.4756,12.11789,17.9543,10.99289C18.0047,10.86789,18.0047,10.74289,17.9543,10.61789C17.659,9.90846,16.8171,8.23812,15.1447,7.06241L12.96929,9.23782C13.3134,9.66543,13.5197,10.20642,13.5197,10.79289C13.5197,12.16789,12.38583,13.29289,11,13.29289C10.41596,13.29289,9.87667,13.09308,9.44815,12.75896L7.36012,14.847ZM8.794609999999999,11.99829L6.520099999999999,14.2728C5.06905,13.12119,4.32057,11.628250000000001,4.04567,10.96789C3.995275,10.84289,3.995275,10.71789,4.04567,10.59289C4.52441,9.46789,6.43937,5.79289,11,5.79289C12.28868,5.79289,13.3661,6.086320000000001,14.2596,6.53329L12.19759,8.5953C11.84086,8.40257,11.43271,8.29289,11,8.29289C9.61417,8.29289,8.480319999999999,9.41789,8.480319999999999,10.79289C8.480319999999999,11.22918,8.594470000000001,11.64029,8.794609999999999,11.99829ZM10.16528,12.04183C10.404869999999999,12.20032,10.692070000000001,12.29289,11,12.29289C11.8315,12.29289,12.51181,11.61789,12.51181,10.79289C12.51181,10.48318,12.41593,10.194600000000001,12.25216,9.95494L10.16528,12.04183ZM11.43602,9.35687L9.55616,11.236740000000001C9.512,11.09633,9.48819,10.94724,9.48819,10.79289C9.48819,9.96789,10.1685,9.29289,11,9.29289C11.15142,9.29289,11.29782,9.31528,11.43602,9.35687Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), _h = () => $h.cloneNode(!0), kh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_625"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_625)"><path d="M14.5385,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807692,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.88462,4,14.5385,5.61538,14.5385,7.576919999999999L14.5385,9.76923ZM10.88461,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923L13.38462,9.76923L13.38462,7.576919999999999C13.38462,6.23077,12.26923,5.15385,10.88461,5.15385ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.038450000000001,12.07692,11.307680000000001,12.34615,11.307680000000001,12.65385L11.307680000000001,14.5769C11.307680000000001,14.8846,11.038450000000001,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), Lh = () => kh.cloneNode(!0), xh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_620"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_620)"><path d="M8.38461,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807693,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.46154,4,13.84615,4.961539,14.3462,6.423080000000001C14.4615,6.73077,14.3077,7.038460000000001,14,7.15385C13.69231,7.26923,13.38461,7.11538,13.26923,6.80769C12.92308,5.80769,11.96154,5.15385,10.88462,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.03846,12.07692,11.307690000000001,12.34615,11.307690000000001,12.65385L11.307690000000001,14.5769C11.307690000000001,14.8846,11.03846,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), Ah = () => xh.cloneNode(!0), wh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M16.966900000000003,8.67144C16.6669,8.67144,16.4247,8.91558,16.4247,9.21802L16.4247,16.631500000000003C16.4247,17.322,16.007199999999997,17.9068,15.5139,17.9068L13.93072,17.9068L13.93072,9.2162C13.93072,8.91741,13.68675,8.67144,13.38855,8.67144C13.09036,8.67144,12.84639,8.91741,12.84639,9.21802L12.84639,17.9068L10.151810000000001,17.9068L10.151810000000001,9.21802C10.151810000000001,8.91741,9.90783,8.67144,9.609639999999999,8.67144C9.31145,8.67144,9.06747,8.91741,9.06747,9.219850000000001L9.06747,17.9068L7.48614,17.9068C6.99277,17.9068,6.5753,17.322,6.5753,16.631500000000003L6.5753,9.21802C6.5753,8.91558,6.333130000000001,8.67144,6.03313,8.67144C5.73313,8.67144,5.49096,8.91558,5.49096,9.21802L5.49096,16.631500000000003C5.49096,17.9378,6.385540000000001,19,7.48614,19L15.512,19C16.6127,19,17.509,17.9378,17.509,16.631500000000003L17.509,9.21802C17.509,8.91558,17.2669,8.67144,16.966900000000003,8.67144ZM18.4578,6.21183L4.542169,6.21183C4.243976,6.21183,4,6.45779,4,6.75841C4,7.05903,4.243976,7.30499,4.542169,7.30499L18.4578,7.30499C18.756,7.30499,19,7.05903,19,6.75841C19,6.45779,18.756,6.21183,18.4578,6.21183ZM8.68072,5.10045L14.3193,5.10045C14.6175,5.10045,14.8614,4.852666,14.8614,4.550225C14.8614,4.247783,14.6175,4,14.3193,4L8.68072,4C8.38253,4,8.13855,4.247783,8.13855,4.550225C8.13855,4.852666,8.38253,5.10045,8.68072,5.10045Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), Mh = () => wh.cloneNode(!0), Sh = {
  horizontalStraightLine: ud,
  horizontalRayLine: hd,
  horizontalSegment: yd,
  verticalStraightLine: pd,
  verticalRayLine: md,
  verticalSegment: bd,
  straightLine: _d,
  rayLine: Ld,
  segment: Ad,
  arrow: Md,
  priceLine: Td,
  priceChannelLine: Od,
  parallelStraightLine: Id,
  fibonacciLine: Ed,
  fibonacciSegment: Ud,
  fibonacciCircle: Kd,
  fibonacciSpiral: jd,
  fibonacciSpeedResistanceFan: Zd,
  fibonacciExtension: Vd,
  gannBox: Hd,
  circle: Gd,
  triangle: Xd,
  rect: eh,
  parallelogram: rh,
  threeWaves: ih,
  fiveWaves: ah,
  eightWaves: lh,
  anyWaves: uh,
  abcd: hh,
  xabcd: yh,
  weak_magnet: ph,
  strong_magnet: mh,
  lock: Lh,
  unlock: Ah,
  visible: bh,
  invisible: _h,
  remove: Mh
};
function Th(e) {
  return [
    { key: "horizontalStraightLine", text: s("horizontal_straight_line", e) },
    { key: "horizontalRayLine", text: s("horizontal_ray_line", e) },
    { key: "horizontalSegment", text: s("horizontal_segment", e) },
    { key: "verticalStraightLine", text: s("vertical_straight_line", e) },
    { key: "verticalRayLine", text: s("vertical_ray_line", e) },
    { key: "verticalSegment", text: s("vertical_segment", e) },
    { key: "straightLine", text: s("straight_line", e) },
    { key: "rayLine", text: s("ray_line", e) },
    { key: "segment", text: s("segment", e) },
    { key: "arrow", text: s("arrow", e) },
    { key: "priceLine", text: s("price_line", e) }
  ];
}
function Ph(e) {
  return [
    { key: "priceChannelLine", text: s("price_channel_line", e) },
    { key: "parallelStraightLine", text: s("parallel_straight_line", e) }
  ];
}
function Oh(e) {
  return [
    { key: "circle", text: s("circle", e) },
    { key: "rect", text: s("rect", e) },
    { key: "parallelogram", text: s("parallelogram", e) },
    { key: "triangle", text: s("triangle", e) }
  ];
}
function Dh(e) {
  return [
    { key: "fibonacciLine", text: s("fibonacci_line", e) },
    { key: "fibonacciSegment", text: s("fibonacci_segment", e) },
    { key: "fibonacciCircle", text: s("fibonacci_circle", e) },
    { key: "fibonacciSpiral", text: s("fibonacci_spiral", e) },
    { key: "fibonacciSpeedResistanceFan", text: s("fibonacci_speed_resistance_fan", e) },
    { key: "fibonacciExtension", text: s("fibonacci_extension", e) },
    { key: "gannBox", text: s("gann_box", e) }
  ];
}
function Ih(e) {
  return [
    { key: "xabcd", text: s("xabcd", e) },
    { key: "abcd", text: s("abcd", e) },
    { key: "threeWaves", text: s("three_waves", e) },
    { key: "fiveWaves", text: s("five_waves", e) },
    { key: "eightWaves", text: s("eight_waves", e) },
    { key: "anyWaves", text: s("any_waves", e) }
  ];
}
function Nh(e) {
  return [
    { key: "weak_magnet", text: s("weak_magnet", e) },
    { key: "strong_magnet", text: s("strong_magnet", e) }
  ];
}
const Ke = (e) => Sh[e.name](e.class), Eh = /* @__PURE__ */ $('<div class="klinecharts-pro-drawing-bar"><span class="split-line"></span><div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div><div class="item"><span style="width:32px;height:32px"></span></div><div class="item"><span style="width:32px;height:32px"></span></div><span class="split-line"></span><div class="item"><span style="width:32px;height:32px"></span></div></div>'), Bh = /* @__PURE__ */ $('<div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div>'), Y9 = /* @__PURE__ */ $('<li><span style="padding-left:8px"></span></li>'), G9 = "drawing_tools", Uh = (e) => {
  const [t, r] = T("horizontalStraightLine"), [n, o] = T("priceChannelLine"), [l, d] = T("circle"), [u, g] = T("fibonacciLine"), [_, y] = T("xabcd"), [w, A] = T("weak_magnet"), [O, N] = T("normal"), [F, K] = T(!1), [X, W] = T(!0), [B, R] = T(""), z = J(() => [{
    key: "singleLine",
    icon: t(),
    list: Th(e.locale),
    setter: r
  }, {
    key: "moreLine",
    icon: n(),
    list: Ph(e.locale),
    setter: o
  }, {
    key: "polygon",
    icon: l(),
    list: Oh(e.locale),
    setter: d
  }, {
    key: "fibonacci",
    icon: u(),
    list: Dh(e.locale),
    setter: g
  }, {
    key: "wave",
    icon: _(),
    list: Ih(e.locale),
    setter: y
  }]), Pe = J(() => Nh(e.locale));
  return (() => {
    const Oe = Eh.cloneNode(!0), ge = Oe.firstChild, G = ge.nextSibling, re = G.firstChild, ue = re.nextSibling, Te = ue.firstChild, qe = G.nextSibling, g1 = qe.firstChild, p1 = qe.nextSibling, l1 = p1.firstChild, Je = p1.nextSibling, He = Je.nextSibling, c1 = He.firstChild;
    return k(Oe, () => z().map((H) => (() => {
      const U = Bh.cloneNode(!0), j = U.firstChild, Ae = j.nextSibling, De = Ae.firstChild;
      return U.addEventListener("blur", () => {
        R("");
      }), j.$$click = () => {
        e.onDrawingItemClick({
          groupId: G9,
          name: H.icon,
          visible: X(),
          lock: F(),
          mode: O()
        });
      }, k(j, L(Ke, {
        get name() {
          return H.icon;
        }
      })), Ae.$$click = () => {
        H.key === B() ? R("") : R(H.key);
      }, k(U, (() => {
        const ce = J(() => H.key === B());
        return () => ce() && L(zt, {
          class: "list",
          get children() {
            return H.list.map((ae) => (() => {
              const b = Y9.cloneNode(!0), ie = b.firstChild;
              return b.$$click = () => {
                H.setter(ae.key), e.onDrawingItemClick({
                  name: ae.key,
                  lock: F(),
                  mode: O()
                }), R("");
              }, k(b, L(Ke, {
                get name() {
                  return ae.key;
                }
              }), ie), k(ie, () => ae.text), b;
            })());
          }
        });
      })(), null), I(() => xe(De, "class", H.key === B() ? "rotate" : "")), U;
    })()), ge), G.addEventListener("blur", () => {
      R("");
    }), re.$$click = () => {
      let H = w();
      O() !== "normal" && (H = "normal"), N(H), e.onModeChange(H);
    }, k(re, (() => {
      const H = J(() => w() === "weak_magnet");
      return () => H() ? (() => {
        const U = J(() => O() === "weak_magnet");
        return () => U() ? L(Ke, {
          name: "weak_magnet",
          class: "selected"
        }) : L(Ke, {
          name: "weak_magnet"
        });
      })() : (() => {
        const U = J(() => O() === "strong_magnet");
        return () => U() ? L(Ke, {
          name: "strong_magnet",
          class: "selected"
        }) : L(Ke, {
          name: "strong_magnet"
        });
      })();
    })()), ue.$$click = () => {
      B() === "mode" ? R("") : R("mode");
    }, k(G, (() => {
      const H = J(() => B() === "mode");
      return () => H() && L(zt, {
        class: "list",
        get children() {
          return Pe().map((U) => (() => {
            const j = Y9.cloneNode(!0), Ae = j.firstChild;
            return j.$$click = () => {
              A(U.key), N(U.key), e.onModeChange(U.key), R("");
            }, k(j, L(Ke, {
              get name() {
                return U.key;
              }
            }), Ae), k(Ae, () => U.text), j;
          })());
        }
      });
    })(), null), g1.$$click = () => {
      const H = !F();
      K(H), e.onLockChange(H);
    }, k(g1, (() => {
      const H = J(() => !!F());
      return () => H() ? L(Ke, {
        name: "lock"
      }) : L(Ke, {
        name: "unlock"
      });
    })()), l1.$$click = () => {
      const H = !X();
      W(H), e.onVisibleChange(H);
    }, k(l1, (() => {
      const H = J(() => !!X());
      return () => H() ? L(Ke, {
        name: "visible"
      }) : L(Ke, {
        name: "invisible"
      });
    })()), c1.$$click = () => {
      e.onRemoveClick(G9);
    }, k(c1, L(Ke, {
      name: "remove"
    })), I(() => xe(Te, "class", B() === "mode" ? "rotate" : "")), Oe;
  })();
};
ze(["click"]);
const W9 = /* @__PURE__ */ $('<li class="title"></li>'), X9 = /* @__PURE__ */ $('<li class="row"></li>'), Fh = (e) => L(T1, {
  get title() {
    return s("indicator", e.locale);
  },
  width: 400,
  get onClose() {
    return e.onClose;
  },
  get children() {
    return L(zt, {
      class: "klinecharts-pro-indicator-modal-list",
      get children() {
        return [(() => {
          const t = W9.cloneNode(!0);
          return k(t, () => s("main_indicator", e.locale)), t;
        })(), J(() => ["MA", "EMA", "SMA", "BOLL", "SAR", "BBI"].map((t) => {
          const r = e.mainIndicators.includes(t);
          return (() => {
            const n = X9.cloneNode(!0);
            return n.$$click = (o) => {
              e.onMainIndicatorChange({
                name: t,
                paneId: "candle_pane",
                added: !r
              });
            }, k(n, L(q9, {
              checked: r,
              get label() {
                return s(t.toLowerCase(), e.locale);
              }
            })), n;
          })();
        })), (() => {
          const t = W9.cloneNode(!0);
          return k(t, () => s("sub_indicator", e.locale)), t;
        })(), J(() => ["MA", "EMA", "VOL", "MACD", "BOLL", "KDJ", "RSI", "BIAS", "BRAR", "CCI", "DMI", "CR", "PSY", "DMA", "TRIX", "OBV", "VR", "WR", "MTM", "EMV", "SAR", "SMA", "ROC", "PVT", "BBI", "AO"].map((t) => {
          const r = t in e.subIndicators;
          return (() => {
            const n = X9.cloneNode(!0);
            return n.$$click = (o) => {
              e.onSubIndicatorChange({
                name: t,
                paneId: e.subIndicators[t] ?? "",
                added: !r
              });
            }, k(n, L(q9, {
              checked: r,
              get label() {
                return s(t.toLowerCase(), e.locale);
              }
            })), n;
          })();
        }))];
      }
    });
  }
});
ze(["click"]);
function J9(e, t) {
  switch (e) {
    case "Etc/UTC":
      return s("utc", t);
    case "Pacific/Midway":
      return s("midway", t);
    case "Pacific/Honolulu":
      return s("honolulu", t);
    case "America/Anchorage":
      return s("anchorage", t);
    case "America/Juneau":
      return s("juneau", t);
    case "America/Los_Angeles":
      return s("los_angeles", t);
    case "America/Vancouver":
      return s("vancouver", t);
    case "America/Tijuana":
      return s("tijuana", t);
    case "America/Phoenix":
      return s("phoenix", t);
    case "America/Denver":
      return s("denver", t);
    case "America/Chicago":
      return s("chicago", t);
    case "America/Mexico_City":
      return s("mexico_city", t);
    case "America/Guatemala":
      return s("guatemala", t);
    case "America/New_York":
      return s("new_york", t);
    case "America/Toronto":
      return s("toronto", t);
    case "America/Bogota":
      return s("bogota", t);
    case "America/Lima":
      return s("lima", t);
    case "America/Caracas":
      return s("caracas", t);
    case "America/Halifax":
      return s("halifax", t);
    case "America/Santiago":
      return s("santiago", t);
    case "America/La_Paz":
      return s("la_paz", t);
    case "America/Sao_Paulo":
      return s("sao_paulo", t);
    case "America/Buenos_Aires":
      return s("buenos_aires", t);
    case "America/Montevideo":
      return s("montevideo", t);
    case "America/Godthab":
      return s("godthab", t);
    case "Atlantic/Azores":
      return s("azores", t);
    case "Atlantic/Cape_Verde":
      return s("cape_verde", t);
    case "Europe/London":
      return s("london", t);
    case "Europe/Dublin":
      return s("dublin", t);
    case "Europe/Lisbon":
      return s("lisbon", t);
    case "Africa/Casablanca":
      return s("casablanca", t);
    case "Europe/Paris":
      return s("paris", t);
    case "Europe/Berlin":
      return s("berlin", t);
    case "Europe/Amsterdam":
      return s("amsterdam", t);
    case "Europe/Brussels":
      return s("brussels", t);
    case "Europe/Madrid":
      return s("madrid", t);
    case "Europe/Rome":
      return s("rome", t);
    case "Europe/Vienna":
      return s("vienna", t);
    case "Europe/Warsaw":
      return s("warsaw", t);
    case "Africa/Lagos":
      return s("lagos", t);
    case "Europe/Athens":
      return s("athens", t);
    case "Europe/Bucharest":
      return s("bucharest", t);
    case "Europe/Helsinki":
      return s("helsinki", t);
    case "Europe/Istanbul":
      return s("istanbul", t);
    case "Europe/Kiev":
      return s("kiev", t);
    case "Africa/Cairo":
      return s("cairo", t);
    case "Africa/Johannesburg":
      return s("johannesburg", t);
    case "Asia/Jerusalem":
      return s("jerusalem", t);
    case "Europe/Moscow":
      return s("moscow", t);
    case "Asia/Baghdad":
      return s("baghdad", t);
    case "Asia/Kuwait":
      return s("kuwait", t);
    case "Asia/Riyadh":
      return s("riyadh", t);
    case "Asia/Bahrain":
      return s("bahrain", t);
    case "Africa/Nairobi":
      return s("nairobi", t);
    case "Asia/Tehran":
      return s("tehran", t);
    case "Asia/Dubai":
      return s("dubai", t);
    case "Asia/Muscat":
      return s("muscat", t);
    case "Asia/Baku":
      return s("baku", t);
    case "Asia/Kabul":
      return s("kabul", t);
    case "Asia/Karachi":
      return s("karachi", t);
    case "Asia/Tashkent":
      return s("tashkent", t);
    case "Asia/Ashkhabad":
      return s("ashkhabad", t);
    case "Asia/Kolkata":
      return s("kolkata", t);
    case "Asia/Mumbai":
      return s("mumbai", t);
    case "Asia/Colombo":
      return s("colombo", t);
    case "Asia/Kathmandu":
      return s("kathmandu", t);
    case "Asia/Dhaka":
      return s("dhaka", t);
    case "Asia/Almaty":
      return s("almaty", t);
    case "Asia/Yangon":
      return s("yangon", t);
    case "Asia/Bangkok":
      return s("bangkok", t);
    case "Asia/Jakarta":
      return s("jakarta", t);
    case "Asia/Ho_Chi_Minh":
      return s("ho_chi_minh", t);
    case "Asia/Shanghai":
      return s("shanghai", t);
    case "Asia/Hong_Kong":
      return s("hong_kong", t);
    case "Asia/Singapore":
      return s("singapore", t);
    case "Asia/Taipei":
      return s("taipei", t);
    case "Asia/Manila":
      return s("manila", t);
    case "Asia/Kuala_Lumpur":
      return s("kuala_lumpur", t);
    case "Australia/Perth":
      return s("perth", t);
    case "Asia/Tokyo":
      return s("tokyo", t);
    case "Asia/Seoul":
      return s("seoul", t);
    case "Asia/Pyongyang":
      return s("pyongyang", t);
    case "Australia/Adelaide":
      return s("adelaide", t);
    case "Australia/Darwin":
      return s("darwin", t);
    case "Australia/Brisbane":
      return s("brisbane", t);
    case "Australia/Sydney":
      return s("sydney", t);
    case "Australia/Melbourne":
      return s("melbourne", t);
    case "Pacific/Guam":
      return s("guam", t);
    case "Pacific/Port_Moresby":
      return s("port_moresby", t);
    case "Pacific/Norfolk":
      return s("norfolk", t);
    case "Pacific/Guadalcanal":
      return s("guadalcanal", t);
    case "Pacific/Auckland":
      return s("auckland", t);
    case "Pacific/Fiji":
      return s("fiji", t);
    case "Pacific/Tongatapu":
      return s("tongatapu", t);
    case "Pacific/Apia":
      return s("apia", t);
    case "Asia/Karachi":
      return s("karachi", t);
  }
  return e;
}
function Kh(e) {
  return [
    // UTC
    { key: "Etc/UTC", text: `(UTC+0:00) ${s("utc", e)}` },
    // Pacific (UTC-12 to UTC-8)
    { key: "Pacific/Midway", text: `(UTC-11:00) ${s("midway", e)}` },
    { key: "Pacific/Honolulu", text: `(UTC-10:00) ${s("honolulu", e)}` },
    { key: "America/Anchorage", text: `(UTC-9:00) ${s("anchorage", e)}` },
    { key: "America/Juneau", text: `(UTC-9:00) ${s("juneau", e)}` },
    // North America West (UTC-8 to UTC-7)
    { key: "America/Los_Angeles", text: `(UTC-8:00) ${s("los_angeles", e)}` },
    { key: "America/Vancouver", text: `(UTC-8:00) ${s("vancouver", e)}` },
    { key: "America/Tijuana", text: `(UTC-8:00) ${s("tijuana", e)}` },
    { key: "America/Phoenix", text: `(UTC-7:00) ${s("phoenix", e)}` },
    { key: "America/Denver", text: `(UTC-7:00) ${s("denver", e)}` },
    // North America Central (UTC-6)
    { key: "America/Chicago", text: `(UTC-6:00) ${s("chicago", e)}` },
    { key: "America/Mexico_City", text: `(UTC-6:00) ${s("mexico_city", e)}` },
    { key: "America/Guatemala", text: `(UTC-6:00) ${s("guatemala", e)}` },
    // North America East (UTC-5 to UTC-4)
    { key: "America/New_York", text: `(UTC-5:00) ${s("new_york", e)}` },
    { key: "America/Toronto", text: `(UTC-5:00) ${s("toronto", e)}` },
    { key: "America/Bogota", text: `(UTC-5:00) ${s("bogota", e)}` },
    { key: "America/Lima", text: `(UTC-5:00) ${s("lima", e)}` },
    { key: "America/Caracas", text: `(UTC-4:00) ${s("caracas", e)}` },
    { key: "America/Halifax", text: `(UTC-4:00) ${s("halifax", e)}` },
    // South America (UTC-4 to UTC-3)
    { key: "America/Santiago", text: `(UTC-4:00) ${s("santiago", e)}` },
    { key: "America/La_Paz", text: `(UTC-4:00) ${s("la_paz", e)}` },
    { key: "America/Sao_Paulo", text: `(UTC-3:00) ${s("sao_paulo", e)}` },
    { key: "America/Buenos_Aires", text: `(UTC-3:00) ${s("buenos_aires", e)}` },
    { key: "America/Montevideo", text: `(UTC-3:00) ${s("montevideo", e)}` },
    // Atlantic (UTC-3 to UTC-1)
    { key: "America/Godthab", text: `(UTC-3:00) ${s("godthab", e)}` },
    { key: "Atlantic/Azores", text: `(UTC-1:00) ${s("azores", e)}` },
    { key: "Atlantic/Cape_Verde", text: `(UTC-1:00) ${s("cape_verde", e)}` },
    // Western Europe (UTC+0 to UTC+1)
    { key: "Europe/London", text: `(UTC+0:00) ${s("london", e)}` },
    { key: "Europe/Dublin", text: `(UTC+0:00) ${s("dublin", e)}` },
    { key: "Europe/Lisbon", text: `(UTC+0:00) ${s("lisbon", e)}` },
    { key: "Africa/Casablanca", text: `(UTC+0:00) ${s("casablanca", e)}` },
    { key: "Europe/Paris", text: `(UTC+1:00) ${s("paris", e)}` },
    { key: "Europe/Berlin", text: `(UTC+1:00) ${s("berlin", e)}` },
    { key: "Europe/Amsterdam", text: `(UTC+1:00) ${s("amsterdam", e)}` },
    { key: "Europe/Brussels", text: `(UTC+1:00) ${s("brussels", e)}` },
    { key: "Europe/Madrid", text: `(UTC+1:00) ${s("madrid", e)}` },
    { key: "Europe/Rome", text: `(UTC+1:00) ${s("rome", e)}` },
    { key: "Europe/Vienna", text: `(UTC+1:00) ${s("vienna", e)}` },
    { key: "Europe/Warsaw", text: `(UTC+1:00) ${s("warsaw", e)}` },
    { key: "Africa/Lagos", text: `(UTC+1:00) ${s("lagos", e)}` },
    // Central Europe (UTC+2)
    { key: "Europe/Athens", text: `(UTC+2:00) ${s("athens", e)}` },
    { key: "Europe/Bucharest", text: `(UTC+2:00) ${s("bucharest", e)}` },
    { key: "Europe/Helsinki", text: `(UTC+2:00) ${s("helsinki", e)}` },
    { key: "Europe/Istanbul", text: `(UTC+2:00) ${s("istanbul", e)}` },
    { key: "Europe/Kiev", text: `(UTC+2:00) ${s("kiev", e)}` },
    { key: "Africa/Cairo", text: `(UTC+2:00) ${s("cairo", e)}` },
    { key: "Africa/Johannesburg", text: `(UTC+2:00) ${s("johannesburg", e)}` },
    { key: "Asia/Jerusalem", text: `(UTC+2:00) ${s("jerusalem", e)}` },
    // Eastern Europe / Middle East (UTC+3)
    { key: "Europe/Moscow", text: `(UTC+3:00) ${s("moscow", e)}` },
    { key: "Asia/Baghdad", text: `(UTC+3:00) ${s("baghdad", e)}` },
    { key: "Asia/Kuwait", text: `(UTC+3:00) ${s("kuwait", e)}` },
    { key: "Asia/Riyadh", text: `(UTC+3:00) ${s("riyadh", e)}` },
    { key: "Asia/Bahrain", text: `(UTC+3:00) ${s("bahrain", e)}` },
    { key: "Africa/Nairobi", text: `(UTC+3:00) ${s("nairobi", e)}` },
    // Middle East (UTC+3:30 to UTC+4)
    { key: "Asia/Tehran", text: `(UTC+3:30) ${s("tehran", e)}` },
    { key: "Asia/Dubai", text: `(UTC+4:00) ${s("dubai", e)}` },
    { key: "Asia/Muscat", text: `(UTC+4:00) ${s("muscat", e)}` },
    { key: "Asia/Baku", text: `(UTC+4:00) ${s("baku", e)}` },
    // Central Asia (UTC+4:30 to UTC+5)
    { key: "Asia/Kabul", text: `(UTC+4:30) ${s("kabul", e)}` },
    { key: "Asia/Karachi", text: `(UTC+5:00) ${s("karachi", e)}` },
    { key: "Asia/Tashkent", text: `(UTC+5:00) ${s("tashkent", e)}` },
    { key: "Asia/Ashkhabad", text: `(UTC+5:00) ${s("ashkhabad", e)}` },
    // South Asia (UTC+5:30 to UTC+6)
    { key: "Asia/Kolkata", text: `(UTC+5:30) ${s("kolkata", e)}` },
    { key: "Asia/Mumbai", text: `(UTC+5:30) ${s("mumbai", e)}` },
    { key: "Asia/Colombo", text: `(UTC+5:30) ${s("colombo", e)}` },
    { key: "Asia/Kathmandu", text: `(UTC+5:45) ${s("kathmandu", e)}` },
    { key: "Asia/Dhaka", text: `(UTC+6:00) ${s("dhaka", e)}` },
    { key: "Asia/Almaty", text: `(UTC+6:00) ${s("almaty", e)}` },
    // Southeast Asia (UTC+6:30 to UTC+7)
    { key: "Asia/Yangon", text: `(UTC+6:30) ${s("yangon", e)}` },
    { key: "Asia/Bangkok", text: `(UTC+7:00) ${s("bangkok", e)}` },
    { key: "Asia/Jakarta", text: `(UTC+7:00) ${s("jakarta", e)}` },
    { key: "Asia/Ho_Chi_Minh", text: `(UTC+7:00) ${s("ho_chi_minh", e)}` },
    // East Asia (UTC+8)
    { key: "Asia/Shanghai", text: `(UTC+8:00) ${s("shanghai", e)}` },
    { key: "Asia/Hong_Kong", text: `(UTC+8:00) ${s("hong_kong", e)}` },
    { key: "Asia/Singapore", text: `(UTC+8:00) ${s("singapore", e)}` },
    { key: "Asia/Taipei", text: `(UTC+8:00) ${s("taipei", e)}` },
    { key: "Asia/Manila", text: `(UTC+8:00) ${s("manila", e)}` },
    { key: "Asia/Kuala_Lumpur", text: `(UTC+8:00) ${s("kuala_lumpur", e)}` },
    { key: "Australia/Perth", text: `(UTC+8:00) ${s("perth", e)}` },
    // East Asia (UTC+9)
    { key: "Asia/Tokyo", text: `(UTC+9:00) ${s("tokyo", e)}` },
    { key: "Asia/Seoul", text: `(UTC+9:00) ${s("seoul", e)}` },
    { key: "Asia/Pyongyang", text: `(UTC+9:00) ${s("pyongyang", e)}` },
    // Australia (UTC+9:30 to UTC+10)
    { key: "Australia/Adelaide", text: `(UTC+9:30) ${s("adelaide", e)}` },
    { key: "Australia/Darwin", text: `(UTC+9:30) ${s("darwin", e)}` },
    { key: "Australia/Brisbane", text: `(UTC+10:00) ${s("brisbane", e)}` },
    { key: "Australia/Sydney", text: `(UTC+10:00) ${s("sydney", e)}` },
    { key: "Australia/Melbourne", text: `(UTC+10:00) ${s("melbourne", e)}` },
    { key: "Pacific/Guam", text: `(UTC+10:00) ${s("guam", e)}` },
    // Pacific (UTC+10 to UTC+13)
    { key: "Pacific/Port_Moresby", text: `(UTC+10:00) ${s("port_moresby", e)}` },
    { key: "Pacific/Norfolk", text: `(UTC+11:00) ${s("norfolk", e)}` },
    { key: "Pacific/Guadalcanal", text: `(UTC+11:00) ${s("guadalcanal", e)}` },
    { key: "Pacific/Auckland", text: `(UTC+12:00) ${s("auckland", e)}` },
    { key: "Pacific/Fiji", text: `(UTC+12:00) ${s("fiji", e)}` },
    { key: "Pacific/Tongatapu", text: `(UTC+13:00) ${s("tongatapu", e)}` },
    { key: "Pacific/Apia", text: `(UTC+13:00) ${s("apia", e)}` }
  ];
}
const zh = (e) => {
  const [t, r] = T(e.timezone), n = J(() => Kh(e.locale));
  return L(T1, {
    get title() {
      return s("timezone", e.locale);
    },
    width: 320,
    get buttons() {
      return [{
        children: s("confirm", e.locale),
        onClick: () => {
          e.onConfirm(t()), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      return L(Ur, {
        style: {
          width: "100%",
          "margin-top": "20px"
        },
        get value() {
          return t().text;
        },
        onSelected: (o) => {
          r(o);
        },
        get dataSource() {
          return n();
        },
        searchable: !0,
        get searchPlaceholder() {
          return s("Search Timezone", e.locale) || "Search timezone...";
        }
      });
    }
  });
};
function er(e) {
  return [
    {
      key: "candle.type",
      text: s("candle_type", e),
      component: "select",
      dataSource: [
        { key: "candle_solid", text: s("candle_solid", e) },
        { key: "candle_stroke", text: s("candle_stroke", e) },
        { key: "candle_up_stroke", text: s("candle_up_stroke", e) },
        { key: "candle_down_stroke", text: s("candle_down_stroke", e) },
        { key: "ohlc", text: s("ohlc", e) },
        { key: "area", text: s("area", e) }
      ]
    },
    {
      key: "candle.priceMark.last.show",
      text: s("last_price_show", e),
      component: "switch"
    },
    {
      key: "candle.priceMark.high.show",
      text: s("high_price_show", e),
      component: "switch"
    },
    {
      key: "candle.priceMark.low.show",
      text: s("low_price_show", e),
      component: "switch"
    },
    {
      key: "indicator.lastValueMark.show",
      text: s("indicator_last_value_show", e),
      component: "switch"
    },
    {
      key: "yAxis.type",
      text: s("price_axis_type", e),
      component: "select",
      dataSource: [
        { key: "normal", text: s("normal", e) },
        { key: "percentage", text: s("percentage", e) },
        { key: "log", text: s("log", e) }
      ]
    },
    {
      key: "yAxis.reverse",
      text: s("reverse_coordinate", e),
      component: "switch"
    },
    {
      key: "grid.show",
      text: s("grid_show", e),
      component: "switch"
    }
  ];
}
const jh = /* @__PURE__ */ $('<div class="klinecharts-pro-setting-modal-content"></div>'), Qh = /* @__PURE__ */ $('<div class="setting-item"><span class="setting-label"></span><div class="setting-control"></div></div>'), Zh = (e) => {
  const [t, r] = T(e.currentStyles), [n, o] = T(er(e.locale)), [l, d] = T(!1), u = () => {
    d(window.innerWidth <= 768);
  };
  m0(() => {
    u(), window.addEventListener("resize", u);
  }), w1(() => {
    window.removeEventListener("resize", u);
  }), Ne(() => {
    o(er(e.locale));
  });
  const g = (_, y) => {
    const w = {};
    d0(w, _.key, y);
    const A = ne.clone(t());
    d0(A, _.key, y), r(A), o(n().map((O) => ({
      ...O
    }))), e.onChange(w);
  };
  return L(T1, {
    get title() {
      return s("setting", e.locale);
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
        children: s("restore_default", e.locale),
        onClick: () => {
          e.onRestoreDefault(n()), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      const _ = jh.cloneNode(!0);
      return k(_, L(c0, {
        get each() {
          return n();
        },
        children: (y) => {
          let w;
          const A = ne.formatValue(t(), y.key);
          switch (y.component) {
            case "select": {
              const O = y.key === "candle.type" ? "170px" : "120px";
              w = L(Ur, {
                get style() {
                  return {
                    width: l() ? "100%" : O,
                    "min-width": l() ? "auto" : O
                  };
                },
                get value() {
                  return s(A, e.locale);
                },
                get dataSource() {
                  return y.dataSource;
                },
                onSelected: (N) => {
                  const F = N.key;
                  g(y, F);
                }
              });
              break;
            }
            case "switch": {
              const O = !!A;
              w = L(ws, {
                open: O,
                onChange: () => {
                  g(y, !O);
                }
              });
              break;
            }
          }
          return (() => {
            const O = Qh.cloneNode(!0), N = O.firstChild, F = N.nextSibling;
            return k(N, () => y.text), k(F, w), I(() => O.classList.toggle("mobile-item", !!l())), O;
          })();
        }
      })), I(() => _.classList.toggle("mobile-layout", !!l())), _;
    }
  });
}, Rh = /* @__PURE__ */ $('<img style="width:500px;margin-top: 20px">'), Vh = (e) => L(T1, {
  get title() {
    return s("screenshot", e.locale);
  },
  width: 540,
  get buttons() {
    return [{
      type: "confirm",
      children: s("save", e.locale),
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
    const t = Rh.cloneNode(!0);
    return I(() => xe(t, "src", e.url)), t;
  }
}), qh = {
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
}, Hh = /* @__PURE__ */ $('<div class="klinecharts-pro-indicator-setting-modal-content"></div>'), Yh = /* @__PURE__ */ $("<span></span>"), Gh = (e) => {
  const [t, r] = T(ne.clone(e.params.calcParams)), n = (o) => qh[o];
  return L(T1, {
    get title() {
      return e.params.indicatorName;
    },
    width: 360,
    get buttons() {
      return [{
        type: "confirm",
        children: s("confirm", e.locale),
        onClick: () => {
          const o = n(e.params.indicatorName), l = [];
          ne.clone(t()).forEach((d, u) => {
            !ne.isValid(d) || d === "" ? "default" in o[u] && l.push(o[u].default) : l.push(d);
          }), e.onConfirm(l), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      const o = Hh.cloneNode(!0);
      return k(o, () => n(e.params.indicatorName).map((l, d) => [(() => {
        const u = Yh.cloneNode(!0);
        return k(u, () => s(l.paramNameKey, e.locale)), u;
      })(), L(Fr, {
        style: {
          width: "200px"
        },
        get value() {
          return t()[d] ?? "";
        },
        get precision() {
          return l.precision;
        },
        get min() {
          return l.min;
        },
        onChange: (u) => {
          const g = ne.clone(t());
          g[d] = u, r(g);
        }
      })])), o;
    }
  });
}, Wh = /* @__PURE__ */ $('<svg viewBox="0 0 1024 1024"><path d="M945.066667 898.133333l-189.866667-189.866666c55.466667-64 87.466667-149.333333 87.466667-241.066667 0-204.8-168.533333-373.333333-373.333334-373.333333S96 264.533333 96 469.333333 264.533333 842.666667 469.333333 842.666667c91.733333 0 174.933333-34.133333 241.066667-87.466667l189.866667 189.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c8.533333-12.8 8.533333-34.133333-2.133333-46.933334zM469.333333 778.666667C298.666667 778.666667 160 640 160 469.333333S298.666667 160 469.333333 160 778.666667 298.666667 778.666667 469.333333 640 778.666667 469.333333 778.666667z"></path></svg>'), Xh = /* @__PURE__ */ $('<img alt="symbol">'), Jh = /* @__PURE__ */ $("<li><div><span></span></div></li>"), ef = (e) => {
  const [t, r] = T(""), [n] = p5(t, e.datafeed.searchSymbols.bind(e.datafeed));
  return L(T1, {
    get title() {
      return s("symbol_search", e.locale);
    },
    width: 460,
    get onClose() {
      return e.onClose;
    },
    get children() {
      return [L(Fr, {
        class: "klinecharts-pro-symbol-search-modal-input",
        get placeholder() {
          return s("symbol_code", e.locale);
        },
        get suffix() {
          return Wh.cloneNode(!0);
        },
        get value() {
          return t();
        },
        onChange: (o) => {
          const l = `${o}`;
          r(l);
        }
      }), L(zt, {
        class: "klinecharts-pro-symbol-search-modal-list",
        get loading() {
          return n.loading;
        },
        get dataSource() {
          return n() ?? [];
        },
        renderItem: (o) => (() => {
          const l = Jh.cloneNode(!0), d = l.firstChild, u = d.firstChild;
          return l.$$click = () => {
            e.onSymbolSelected(o), e.onClose();
          }, k(d, L(q, {
            get when() {
              return o.logo;
            },
            get children() {
              const g = Xh.cloneNode(!0);
              return I(() => xe(g, "src", o.logo)), g;
            }
          }), u), k(u, () => o.shortName ?? o.ticker, null), k(u, () => `${o.name ? `(${o.name})` : ""}`, null), k(l, () => o.exchange ?? "", null), I(() => xe(u, "title", o.name ?? "")), l;
        })()
      })];
    }
  });
};
ze(["click"]);
const tf = /* @__PURE__ */ $('<div class="klinecharts-pro-mobile-more-modal-content"><div class="item"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div><div class="item"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path></svg><span></span></div><div class="item"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg><span></span></div></div>'), rf = (e) => L(T1, {
  get title() {
    return s("more", e.locale);
  },
  isMobile: !0,
  get onClose() {
    return e.onClose;
  },
  get children() {
    const t = tf.cloneNode(!0), r = t.firstChild, n = r.firstChild, o = n.nextSibling, l = r.nextSibling, d = l.firstChild, u = d.nextSibling, g = l.nextSibling, _ = g.firstChild, y = _.nextSibling;
    return r.$$click = () => {
      e.onIndicatorClick(), e.onClose();
    }, k(o, () => s("indicator", e.locale)), l.$$click = () => {
      e.onTimezoneClick(), e.onClose();
    }, k(u, () => s("timezone", e.locale)), g.$$click = () => {
      e.onSettingClick(), e.onClose();
    }, k(y, () => s("setting", e.locale)), t;
  }
});
ze(["click"]);
const nf = /* @__PURE__ */ $('<i class="icon-close klinecharts-pro-load-icon"></i>'), of = /* @__PURE__ */ $('<div class="klinecharts-pro-content"><div class="klinecharts-pro-widget"></div></div>'), af = /* @__PURE__ */ $('<div class="klinecharts-pro-countdown-price-mark"><span class="klinecharts-pro-countdown-price-mark-price"></span><span class="klinecharts-pro-countdown-price-mark-timer"></span></div>'), sf = /* @__PURE__ */ $('<div class="overlay-toolbar-color-popover"><div class="overlay-toolbar-color-grid"></div><div class="overlay-toolbar-color-footer"><button type="button" class="overlay-toolbar-add-color">+</button><div class="overlay-toolbar-color-slider"><span></span></div></div></div>'), lf = /* @__PURE__ */ $('<div class="overlay-toolbar-dropdown width-menu"></div>'), cf = /* @__PURE__ */ $('<div class="overlay-toolbar-dropdown style-menu"><button type="button"><span class="overlay-toolbar-style-sample solid"></span></button><button type="button"><span class="overlay-toolbar-style-sample dashed"></span></button><button type="button"><span class="overlay-toolbar-style-sample dotted"></span></button></div>'), uf = /* @__PURE__ */ $('<div class="klinecharts-pro-overlay-toolbar"><button type="button" class="overlay-toolbar-icon drag" title="Move"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="6" r="1.5"></circle><circle cx="15" cy="6" r="1.5"></circle><circle cx="9" cy="12" r="1.5"></circle><circle cx="15" cy="12" r="1.5"></circle><circle cx="9" cy="18" r="1.5"></circle><circle cx="15" cy="18" r="1.5"></circle></svg></button><button type="button" class="overlay-toolbar-icon refresh" title="Reset"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 15.4-6.36L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-15.4 6.36L3 16"></path><path d="M3 21v-5h5"></path></svg></button><div class="overlay-toolbar-picker"><button type="button" title="Color"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg></button></div><div class="overlay-toolbar-picker"><button type="button" title="Line width"><span class="overlay-toolbar-line-preview"></span><span>px</span></button></div><div class="overlay-toolbar-picker"><button type="button" title="Line style"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16"></path></svg></button></div><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2"></rect><path d="M20 4 4 20"></path></svg></button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg></button><button type="button" class="overlay-toolbar-icon delete" title="Delete"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6 18 20H6L5 6"></path><path d="M10 11v5"></path><path d="M14 11v5"></path></svg></button></div>'), df = /* @__PURE__ */ $('<button type="button"></button>'), hf = /* @__PURE__ */ $('<button type="button"><span class="overlay-toolbar-width-sample"></span></button>'), ff = /* @__PURE__ */ $('<div class="klinecharts-pro-quick-order-marker"><button type="button" class="klinecharts-pro-quick-order-plus"></button></div>'), yf = /* @__PURE__ */ $('<span class="klinecharts-pro-quick-order-plus-icon"></span>'), gf = /* @__PURE__ */ $('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" aria-hidden="true"><path d="M460-300h40v-160h160v-40H500v-160h-40v160H300v40h160v160ZM224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h510.76q27.62 0 46.12 18.5Q800-763 800-735.38v510.76q0 27.62-18.5 46.12Q763-160 735.38-160H224.62Zm0-40h510.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-510.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69H224.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v510.76q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69ZM200-760v560-560Z"></path></svg>'), pf = /* @__PURE__ */ $('<div class="klinecharts-pro-quick-order-menu-anchor"><div class="klinecharts-pro-quick-order-menu"><button type="button">Trade <!> @ <!> Limit</button><button type="button">Trade <!> @ <!> Stop</button><button type="button">Create new order...</button><button type="button">Copy Price (<!>)</button><button type="button">Draw horizontal line on </button></div></div>');
function Pt(e, t, r, n) {
  t === "VOL" && (n = {
    gap: {
      bottom: 2
    },
    ...n
  });
  const o = (e == null ? void 0 : e.createIndicator({
    name: t,
    // @ts-expect-error
    createTooltipDataSource: ({
      indicator: l,
      defaultStyles: d
    }) => {
      const u = [];
      return l.visible ? (u.push(d.tooltip.icons[1]), u.push(d.tooltip.icons[2]), u.push(d.tooltip.icons[3])) : (u.push(d.tooltip.icons[0]), u.push(d.tooltip.icons[2]), u.push(d.tooltip.icons[3])), {
        icons: u
      };
    }
  }, r, n)) ?? null;
  if (o && t === "MA")
    try {
      e == null || e.overrideIndicator({
        name: "MA",
        calcParams: [7, 25, 99]
      }, o);
    } catch {
    }
  return o;
}
function Cf(e) {
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
function mf(e) {
  const t = Math.max(0, Math.ceil(e / 1e3)), r = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), o = t % 60, l = (d) => String(d).padStart(2, "0");
  return r > 0 ? `${l(r)}:${l(n)}:${l(o)}` : `${l(n)}:${l(o)}`;
}
const vf = (e) => {
  var E0, B0, U0, F0, K0, z0, j0, Q0, Z0, R0, V0, q0, H0, Y0, G0, W0, X0, J0, e9, t9, r9, n9, i9, o9, a9, s9, l9, c9;
  let t, r = null, n;
  const [o, l] = T(!1), [d, u] = T(e.theme), [g, _] = T(e.styles), [y, w] = T(e.locale), [A, O] = T(e.symbol), [N, F] = T(e.period), K = () => {
    var i, a, c, h;
    return {
      visibleMarginLeft: ((i = e.indicatorTooltipIconStyles) == null ? void 0 : i.visibleMarginLeft) ?? 7,
      secondaryMarginLeft: ((a = e.indicatorTooltipIconStyles) == null ? void 0 : a.secondaryMarginLeft) ?? 7,
      marginTop: ((c = e.indicatorTooltipIconStyles) == null ? void 0 : c.marginTop) ?? 1,
      size: ((h = e.indicatorTooltipIconStyles) == null ? void 0 : h.size) ?? 12
    };
  }, [X, W] = T(!1), [B, R] = T([...e.mainIndicators]), [z, Pe] = T({}), [Oe, ge] = T(!1), [G, re] = T({
    key: e.timezone,
    text: J9(e.timezone, e.locale)
  }), [ue, Te] = T(!1), [qe, g1] = T(), [p1, l1] = T(""), [Je, He] = T(e.drawingBarVisible), [c1, H] = T(!1), [U, j] = T(!1), [Ae, De] = T(!1), ce = ((E0 = e.orderTools) == null ? void 0 : E0.quickOrder) ?? !0, [ae, b] = T({
    quickOrder: ce,
    quickOrderFloatingWindow: ((B0 = e.orderTools) == null ? void 0 : B0.quickOrderFloatingWindow) ?? ce,
    quickOrderPlusButton: ((U0 = e.orderTools) == null ? void 0 : U0.quickOrderPlusButton) ?? ce,
    openOrders: ((F0 = e.orderTools) == null ? void 0 : F0.openOrders) ?? !0,
    openOrdersExtendedPriceLine: ((K0 = e.orderTools) == null ? void 0 : K0.openOrdersExtendedPriceLine) ?? !0,
    openOrdersDisplay: ((z0 = e.orderTools) == null ? void 0 : z0.openOrdersDisplay) ?? "right",
    positions: ((j0 = e.orderTools) == null ? void 0 : j0.positions) ?? !0,
    breakevenPrice: ((Q0 = e.orderTools) == null ? void 0 : Q0.breakevenPrice) ?? !0,
    liquidationPrice: ((Z0 = e.orderTools) == null ? void 0 : Z0.liquidationPrice) ?? !0,
    priceLine: ((R0 = e.orderTools) == null ? void 0 : R0.priceLine) ?? !0,
    marketPriceLine: ((V0 = e.orderTools) == null ? void 0 : V0.marketPriceLine) ?? !0,
    countDown: ((q0 = e.orderTools) == null ? void 0 : q0.countDown) ?? !0,
    bidAskPrice: ((H0 = e.orderTools) == null ? void 0 : H0.bidAskPrice) ?? !0,
    orderHistory: ((Y0 = e.orderTools) == null ? void 0 : Y0.orderHistory) ?? !0
  }), [ie, pe] = T(null), [we, te] = T(!1), [e1, $e] = T(!1), [ut, j1] = T(64), [C1, m1] = T(null), dt = 6, [Gt, v1] = T(null), [Ee, Be] = T(null), [Ue, Ie] = T(null), Q1 = ["#000000", "#2b3342", "#3f4653", "#565d69", "#6f7580", "#8a9099", "#a7acb3", "#c4c8ce", "#ffffff", "#ff4d67", "#ffa629", "#f7ed4a", "#2fc58d", "#4ab09c", "#52c4d3", "#3157f6", "#6a36b8", "#a644b9", "#d83972", "#f2a3a6", "#f5c879", "#f7ee97", "#a6d29f", "#7fc9b9", "#91d7df", "#8fb2ee", "#b09ad2", "#c89ccf", "#d987ab", "#e8757a", "#efb34f", "#efe36e", "#86c17d", "#66b7a8", "#68c4d0", "#5f91e4", "#8059c9", "#aa62c2", "#d34d83", "#b9353d", "#ea8527", "#e8c245", "#4b8c43", "#2f6f60", "#47919b", "#2646c6", "#56309c", "#892f95", "#a82563", "#8e2528", "#de5c1f", "#dc8527", "#255a22", "#164b34", "#225b63", "#15309b", "#442180", "#6b1f74", "#86154e"];
  let Z1 = null;
  const [b1, R1] = T({
    visible: !1,
    indicatorName: "",
    paneId: "",
    calcParams: []
  });
  let Ce = /* @__PURE__ */ new Map(), _e = /* @__PURE__ */ new Map();
  const Wt = (i, a, c) => {
    const h = r == null ? void 0 : r.getIndicatorByPaneId(a, i);
    return {
      name: i,
      shortName: (h == null ? void 0 : h.shortName) || i,
      paneId: a,
      type: c,
      calcParams: (h == null ? void 0 : h.calcParams) || [],
      precision: (h == null ? void 0 : h.precision) ?? 4,
      visible: (h == null ? void 0 : h.visible) ?? !0,
      styles: h == null ? void 0 : h.styles,
      figures: h == null ? void 0 : h.figures
    };
  }, Fe = (i, a, c, h) => {
    if (e.onIndicatorChange)
      if (h === "add" || h === "change")
        setTimeout(() => {
          const p = Wt(i, a, c);
          e.onIndicatorChange({
            action: h,
            indicator: p
          });
        }, 50);
      else {
        const p = {
          name: i,
          shortName: i,
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
          indicator: p
        });
      }
  }, $1 = (i) => ({
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
  })[i] || 1, u1 = (i, a = /* @__PURE__ */ new WeakSet()) => {
    if (i == null)
      return i;
    if (a.has(i))
      return "[Circular]";
    if (typeof i != "object")
      return i;
    if (a.add(i), Array.isArray(i))
      return i.map((h) => u1(h, a));
    const c = {};
    for (const h in i)
      if (!(h === "__proto__" || h === "constructor" || h === "prototype"))
        try {
          const p = i[h];
          if (typeof p == "function")
            continue;
          c[h] = u1(p, a);
        } catch (p) {
          c[h] = `[Error: ${p.message}]`;
        }
    return c;
  }, ht = (i) => {
    if (!i)
      return null;
    try {
      return {
        id: i.id || "",
        type: i.name || "",
        name: i.name || "",
        points: (i.points || []).map((a) => ({
          timestamp: a.timestamp || 0,
          value: a.value || 0,
          dataIndex: a.dataIndex || 0
        })),
        extendData: u1(i.extendData || {}),
        styles: u1(i.styles || {}),
        visible: i.visible ?? !0,
        lock: i.lock ?? !1,
        mode: i.mode || n0.Normal
      };
    } catch (a) {
      return console.error("Error extracting overlay data:", a), null;
    }
  }, t1 = (i) => {
    var a, c, h;
    try {
      const p = (a = r == null ? void 0 : r.getOverlayById) == null ? void 0 : a.call(r, i);
      if (!p)
        return;
      const v = ht(p);
      if (v) {
        const f = Ce.get(i), m = ((c = f == null ? void 0 : f.points) == null ? void 0 : c.length) || 0, x = ((h = v.points) == null ? void 0 : h.length) || 0;
        Ce.set(i, v);
        const S = $1(v.type);
        if (x >= S) {
          const P = _e.get(i);
          P && !P.complete && (P.complete = !0, P.checkInterval && (clearInterval(P.checkInterval), P.checkInterval = void 0));
        }
      }
    } catch (p) {
      console.error(`Error updating overlay tracking for ${i}:`, p);
    }
  }, ft = (i, a) => {
    if (_e.has(i))
      return;
    const c = {
      monitoring: !0,
      complete: !1,
      lastPointCount: 0
    };
    _e.set(i, c), t1(i);
    const h = () => {
      t1(i);
    };
    document.addEventListener("mouseup", h), document.addEventListener("touchend", h), setTimeout(() => {
      var v;
      const p = _e.get(i);
      if (p && !p.complete) {
        p.checkInterval && clearInterval(p.checkInterval), p.mouseUpHandler && (document.removeEventListener("mouseup", p.mouseUpHandler), document.removeEventListener("touchend", p.mouseUpHandler)), t1(i);
        const f = Ce.get(i);
        if (f) {
          const m = $1(f.type), x = ((v = f.points) == null ? void 0 : v.length) || 0;
          x < m && console.warn(`âš ï¸ ${f.type} ${i} has only ${x} point(s), should have ${m}`);
        }
      }
    }, 3e4);
  };
  let Ye = {
    saveDrawings: (i, a) => {
      try {
        const c = `kline_drawings_${i}`, p = {
          drawings: a.map((v) => {
            var S;
            const f = {
              ...v
            };
            f.extendData && (f.extendData = u1(f.extendData)), f.styles && (f.styles = u1(f.styles));
            const m = $1(v.type), x = ((S = v.points) == null ? void 0 : S.length) || 0;
            return x < m && console.warn(`âš ï¸ Saving ${v.type} with only ${x} point(s), needs ${m}`), f;
          }),
          timestamp: Date.now()
        };
        localStorage.setItem(c, JSON.stringify(p));
      } catch (c) {
        console.error("Library: Error saving drawings:", c);
      }
    },
    loadDrawings: (i) => {
      try {
        const a = `kline_drawings_${i}`, c = localStorage.getItem(a);
        if (c) {
          const h = JSON.parse(c), p = [];
          return Array.isArray(h.drawings) && h.drawings.forEach((v) => {
            var x;
            const f = $1(v.type);
            (((x = v.points) == null ? void 0 : x.length) || 0) >= f && p.push(v);
          }), p;
        }
      } catch (a) {
        console.error("Library: Error loading drawings:", a);
      }
      return [];
    },
    clearDrawings: (i) => {
      try {
        const a = `kline_drawings_${i}`;
        localStorage.removeItem(a);
      } catch (a) {
        console.error("Library: Error clearing drawings:", a);
      }
    }
  };
  const V1 = () => {
    const i = A();
    if (i != null && i.ticker) {
      const a = Array.from(Ce.values());
      Ye.saveDrawings(i.ticker, a);
    }
  }, yt = (i) => {
    if (!i || !r)
      return;
    Ce.forEach((c, h) => {
      var p;
      (p = r == null ? void 0 : r.removeOverlay) == null || p.call(r, {
        id: h
      });
    }), Ce.clear(), _e.clear(), Be(null), Ie(null), Ye.loadDrawings(i).forEach((c) => {
      var h;
      try {
        const p = d1({
          name: c.type,
          points: c.points || [],
          extendData: c.extendData,
          styles: c.styles,
          visible: c.visible ?? !0,
          lock: c.lock ?? !1,
          mode: c.mode || n0.Normal
        }), v = r == null ? void 0 : r.createOverlay(p), f = typeof v == "string" ? v : null;
        f && (Ce.set(f, {
          ...c,
          id: f
        }), _e.set(f, {
          monitoring: !1,
          complete: !0,
          lastPointCount: ((h = c.points) == null ? void 0 : h.length) || 0
        }));
      } catch (p) {
        console.error("Library: Error restoring drawing:", p);
      }
    });
  }, q1 = (i) => {
    var c, h;
    const a = {
      ...ae(),
      ...i
    };
    if ("quickOrder" in i) {
      const p = i.quickOrder ?? !1;
      a.quickOrderFloatingWindow = p, a.quickOrderPlusButton = p;
    } else if ("priceLine" in i) {
      const p = i.priceLine ?? !1;
      a.marketPriceLine = p, a.countDown = p, a.bidAskPrice = p;
    } else
      "quickOrderFloatingWindow" in i || "quickOrderPlusButton" in i ? a.quickOrder = a.quickOrderFloatingWindow || a.quickOrderPlusButton : ("marketPriceLine" in i || "countDown" in i || "bidAskPrice" in i) && (a.priceLine = a.marketPriceLine || a.countDown || a.bidAskPrice);
    b(a), (h = (c = e.orderTools) == null ? void 0 : c.onChange) == null || h.call(c, a);
  }, _1 = (i) => {
    var c;
    const a = Math.min(Math.max(((c = A()) == null ? void 0 : c.pricePrecision) ?? 2, 0), 8);
    return i.toLocaleString(void 0, {
      minimumFractionDigits: a,
      maximumFractionDigits: a
    });
  }, Ge = (i = Date.now()) => {
    var Re, Ve, it, u9, d9, h9;
    if (!r || !t || !ae().countDown) {
      v1(null);
      return;
    }
    r.setStyles({
      candle: {
        priceMark: {
          last: {
            show: !0,
            line: {
              show: ae().marketPriceLine
            },
            text: {
              show: !1
            }
          }
        }
      }
    });
    const a = ((Re = r.getDataList) == null ? void 0 : Re.call(r)) ?? [], c = a[a.length - 1], h = Number(c == null ? void 0 : c.close);
    if (!c || !Number.isFinite(h) || h <= 0) {
      v1(null);
      return;
    }
    const p = (Ve = r.convertToPixel) == null ? void 0 : Ve.call(r, [{
      value: h
    }], {
      paneId: "candle_pane",
      absolute: !0
    }), v = Number((it = p == null ? void 0 : p[0]) == null ? void 0 : it.y), f = (u9 = r.getSize) == null ? void 0 : u9.call(r, "candle_pane"), m = (f == null ? void 0 : f.height) ?? t.clientHeight;
    if (!Number.isFinite(v) || v < 0 || v > m) {
      v1(null);
      return;
    }
    const x = Math.min(Math.max(((d9 = A()) == null ? void 0 : d9.pricePrecision) ?? 2, 0), 8), S = h.toLocaleString(void 0, {
      minimumFractionDigits: x,
      maximumFractionDigits: x
    }), P = (h9 = r.getSize) == null ? void 0 : h9.call(r, "candle_pane", wt.YAxis), Q = P != null && P.width && Number.isFinite(P.width) ? Math.max(74, Math.floor(P.width) - 2) : 96, Y = Cf(N()), V = i % Y, E = V === 0 ? Y : Y - V, Z = Number(c.close), de = Number(c.open), Me = r.getStyles().candle.priceMark.last, D = Me.text, he = Number(D.size) || 12, ee = Number(D.paddingTop) || 2, ye = Number(D.paddingBottom) || 2, ve = Math.min(Number(D.paddingLeft) || 4, 3), Qe = Math.min(Number(D.paddingRight) || 4, 3), Ze = Math.max(34, he * 2 + ee + ye + 6), We = Math.max(0, Math.min(v - Ze / 2, m - Ze));
    v1({
      top: We,
      width: Math.min(Q, Math.max(62, S.length * (he * 0.56) + ve + Qe + 4)),
      priceText: S,
      text: mf(E),
      color: Number.isFinite(Z) && Number.isFinite(de) && Z < de ? Me.downColor : Me.upColor,
      textSize: he,
      textFamily: D.family,
      textWeight: D.weight,
      paddingLeft: ve,
      paddingRight: Qe,
      paddingTop: ee,
      paddingBottom: ye,
      borderRadius: Number(D.borderRadius) || 2
    });
  }, gt = (i) => {
    var c, h;
    const a = Number(i == null ? void 0 : i.y);
    if (!Number.isFinite(a))
      return NaN;
    try {
      const p = r == null ? void 0 : r.convertFromPixel([{
        x: (i == null ? void 0 : i.x) ?? 0,
        y: a
      }], {
        paneId: "candle_pane"
      }), v = Number((c = p == null ? void 0 : p[0]) == null ? void 0 : c.value);
      if (Number.isFinite(v) && v > 0)
        return v;
    } catch {
    }
    try {
      const p = r == null ? void 0 : r.convertFromPixel([{
        x: (i == null ? void 0 : i.x) ?? 0,
        y: a
      }], {
        paneId: "candle_pane",
        absolute: !0
      }), v = Number((h = p == null ? void 0 : p[0]) == null ? void 0 : h.value);
      if (Number.isFinite(v) && v > 0)
        return v;
    } catch {
    }
    return NaN;
  }, pt = (i) => {
    var v;
    if (!ae().quickOrderPlusButton || (i == null ? void 0 : i.paneId) !== "candle_pane" || !t) {
      if (e1() || we())
        return;
      pe(null), te(!1);
      return;
    }
    const a = (v = r == null ? void 0 : r.getSize) == null ? void 0 : v.call(r, "candle_pane", wt.YAxis);
    a != null && a.width && Number.isFinite(a.width) && j1(Math.max(44, Math.ceil(a.width)));
    const c = Number(i.y), h = gt(i), p = t.clientHeight;
    if (!Number.isFinite(c) || !Number.isFinite(h) || h <= 0 || c < 0 || c > p) {
      if (e1() || we())
        return;
      pe(null), te(!1);
      return;
    }
    Z1 = {
      ...i
    }, pe({
      y: c,
      price: h
    });
  }, r1 = () => {
    var i;
    if (Z1)
      try {
        (i = r == null ? void 0 : r.executeAction) == null || i.call(r, k1.OnCrosshairChange, Z1);
      } catch {
      }
  }, H1 = (i) => {
    var c, h;
    const a = C1() ?? ie();
    a && ((h = (c = e.orderTools) == null ? void 0 : c.onQuickOrderAction) == null || h.call(c, {
      action: i,
      price: a.price,
      symbol: A()
    }), te(!1), m1(null), $e(!1));
  }, Ct = async () => {
    var a;
    const i = C1() ?? ie();
    if (i) {
      try {
        await ((a = navigator.clipboard) == null ? void 0 : a.writeText(String(i.price)));
      } catch {
      }
      te(!1), m1(null), $e(!1);
    }
  }, Y1 = () => {
    const i = C1() ?? ie();
    i && (r == null || r.createOverlay(d1({
      name: "horizontalStraightLine",
      points: [{
        value: i.price
      }],
      lock: !1
    })), te(!1), m1(null), $e(!1));
  }, G1 = (i) => {
    var m, x, S, P, Q, Y;
    const a = (x = (m = t == null ? void 0 : t.parentElement) == null ? void 0 : m.getBoundingClientRect) == null ? void 0 : x.call(m), c = (S = t == null ? void 0 : t.getBoundingClientRect) == null ? void 0 : S.call(t), h = i == null ? void 0 : i.overlay, p = (P = h == null ? void 0 : h.points) == null ? void 0 : P[0];
    let v = 72, f = 40;
    if (a) {
      if (Number.isFinite(i == null ? void 0 : i.pageX) ? v = i.pageX - a.left : Number.isFinite(i == null ? void 0 : i.x) && c && (v = c.left - a.left + i.x), Number.isFinite(i == null ? void 0 : i.pageY))
        f = i.pageY - a.top;
      else if (Number.isFinite(i == null ? void 0 : i.y) && c)
        f = c.top - a.top + i.y;
      else if (Number.isFinite(p == null ? void 0 : p.value))
        try {
          const V = (Q = r == null ? void 0 : r.convertToPixel) == null ? void 0 : Q.call(r, [{
            value: p.value
          }], {
            paneId: "candle_pane",
            absolute: !0
          }), E = Number((Y = V == null ? void 0 : V[0]) == null ? void 0 : Y.y);
          Number.isFinite(E) && (f = E - a.top);
        } catch {
        }
    }
    return {
      x: Math.max(12, Math.min(v - 28, ((a == null ? void 0 : a.width) ?? 360) - 320)),
      y: Math.max(8, f - 52)
    };
  }, W1 = (i) => {
    var m, x, S, P, Q, Y, V, E;
    const a = i == null ? void 0 : i.overlay;
    if (!(a != null && a.id) || a.name !== "horizontalStraightLine")
      return !1;
    const c = G1(i), h = Number((x = (m = a.styles) == null ? void 0 : m.line) == null ? void 0 : x.size) || 3, p = ((P = (S = a.styles) == null ? void 0 : S.line) == null ? void 0 : P.style) ?? i1.Solid, v = Array.isArray((Y = (Q = a.styles) == null ? void 0 : Q.line) == null ? void 0 : Y.dashedValue) ? a.styles.line.dashedValue : [], f = ((E = (V = a.styles) == null ? void 0 : V.line) == null ? void 0 : E.color) ?? "#2f6df6";
    return Be({
      id: a.id,
      x: c.x,
      y: c.y,
      lineSize: h,
      lineStyle: p,
      dashedValue: v,
      color: f,
      locked: a.lock ?? !1,
      visible: a.visible ?? !0
    }), !1;
  }, P1 = (i) => {
    var c, h;
    const a = (c = i == null ? void 0 : i.overlay) == null ? void 0 : c.id;
    return (!a || ((h = Ee()) == null ? void 0 : h.id) === a) && (Be(null), Ie(null)), !1;
  }, d1 = (i) => {
    var f, m, x, S, P, Q, Y, V, E;
    if (i.name !== "horizontalStraightLine")
      return i;
    const a = i.onClick, c = i.onSelected, h = i.onDeselected, p = i.onRemoved, v = i.onPressedMoveEnd;
    return {
      ...i,
      styles: {
        ...i.styles,
        line: {
          ...(f = i.styles) == null ? void 0 : f.line,
          size: Number((x = (m = i.styles) == null ? void 0 : m.line) == null ? void 0 : x.size) || 3,
          style: ((P = (S = i.styles) == null ? void 0 : S.line) == null ? void 0 : P.style) ?? i1.Solid,
          dashedValue: ((Y = (Q = i.styles) == null ? void 0 : Q.line) == null ? void 0 : Y.dashedValue) ?? [6, 4],
          color: ((E = (V = i.styles) == null ? void 0 : V.line) == null ? void 0 : E.color) ?? "#2f6df6"
        }
      },
      onClick: (Z) => (W1(Z), (a == null ? void 0 : a(Z)) ?? !1),
      onSelected: (Z) => (W1(Z), (c == null ? void 0 : c(Z)) ?? !1),
      onPressedMoveEnd: (Z) => (W1(Z), (v == null ? void 0 : v(Z)) ?? !1),
      onDeselected: (Z) => (P1(Z), (h == null ? void 0 : h(Z)) ?? !1),
      onRemoved: (Z) => (P1(Z), (p == null ? void 0 : p(Z)) ?? !1)
    };
  }, Xt = () => {
    var a;
    const i = Ee();
    i && ((a = r == null ? void 0 : r.removeOverlay) == null || a.call(r, {
      id: i.id
    }), Be(null), Ie(null));
  }, n1 = (i) => {
    var c;
    const a = Ee();
    a && ((c = r == null ? void 0 : r.overrideOverlay) == null || c.call(r, {
      id: a.id,
      ...i
    }), setTimeout(() => {
      t1(a.id), V1();
    }, 0));
  }, Jt = () => {
    const i = Ee();
    if (!i)
      return;
    const a = !i.locked;
    n1({
      lock: a
    }), Be({
      ...i,
      locked: a
    });
  }, mt = () => {
    const i = Ee();
    if (!i)
      return;
    const a = !i.visible;
    n1({
      visible: a
    }), Be({
      ...i,
      visible: a
    });
  }, vt = (i) => {
    const a = Ee();
    a && (n1({
      styles: {
        line: {
          size: i
        }
      }
    }), Be({
      ...a,
      lineSize: i
    }), Ie(null));
  }, X1 = (i, a) => {
    const c = Ee();
    c && (n1({
      styles: {
        line: {
          style: i,
          dashedValue: a
        }
      }
    }), Be({
      ...c,
      lineStyle: i,
      dashedValue: a
    }), Ie(null));
  }, bt = () => {
    const i = Ee();
    if (!i)
      return;
    const a = 1, c = i1.Solid, h = [6, 4], p = "#2f6df6";
    n1({
      styles: {
        line: {
          size: a,
          style: c,
          dashedValue: h,
          color: p
        }
      }
    }), Be({
      ...i,
      lineSize: a,
      lineStyle: c,
      dashedValue: h,
      color: p
    }), Ie(null);
  }, e0 = (i) => {
    const a = Ee();
    a && (n1({
      styles: {
        line: {
          color: i
        }
      }
    }), Be({
      ...a,
      color: i
    }));
  }, t0 = (i) => {
    var S, P;
    const a = Ee();
    if (!a || !t)
      return;
    i.preventDefault(), i.stopPropagation(), Ie(null);
    const c = (P = (S = t.parentElement) == null ? void 0 : S.getBoundingClientRect) == null ? void 0 : P.call(S);
    if (!c)
      return;
    const h = i.clientX, p = i.clientY, v = a.x, f = a.y, m = (Q) => {
      Q.preventDefault();
      const Y = v + Q.clientX - h, V = f + Q.clientY - p;
      Be({
        ...a,
        x: Math.max(8, Math.min(Y, c.width - 320)),
        y: Math.max(8, Math.min(V, c.height - 48))
      });
    }, x = () => {
      document.removeEventListener("mousemove", m), document.removeEventListener("mouseup", x);
    };
    document.addEventListener("mousemove", m), document.addEventListener("mouseup", x);
  }, $t = () => {
    te(!1), m1(null), $e(!1);
  }, _t = (i) => {
    var c, h;
    if (!we())
      return;
    const a = i.target;
    (c = a == null ? void 0 : a.closest) != null && c.call(a, ".klinecharts-pro-quick-order-marker") || (h = a == null ? void 0 : a.closest) != null && h.call(a, ".klinecharts-pro-quick-order-menu-anchor") || $t();
  };
  let kt = (G0 = e.orderTools) == null ? void 0 : G0.quickOrder, J1 = (W0 = e.orderTools) == null ? void 0 : W0.quickOrderFloatingWindow, C = (X0 = e.orderTools) == null ? void 0 : X0.quickOrderPlusButton, M = (J0 = e.orderTools) == null ? void 0 : J0.openOrders, me = (e9 = e.orderTools) == null ? void 0 : e9.openOrdersExtendedPriceLine, ke = (t9 = e.orderTools) == null ? void 0 : t9.openOrdersDisplay, je = (r9 = e.orderTools) == null ? void 0 : r9.positions, h1 = (n9 = e.orderTools) == null ? void 0 : n9.breakevenPrice, et = (i9 = e.orderTools) == null ? void 0 : i9.liquidationPrice, tt = (o9 = e.orderTools) == null ? void 0 : o9.priceLine, rt = (a9 = e.orderTools) == null ? void 0 : a9.marketPriceLine, nt = (s9 = e.orderTools) == null ? void 0 : s9.countDown, P0 = (l9 = e.orderTools) == null ? void 0 : l9.bidAskPrice, O0 = (c9 = e.orderTools) == null ? void 0 : c9.orderHistory;
  Ne(() => {
    var Z, de, Me, D, he, ee, ye, ve, Qe, Ze, We, Re, Ve, it;
    const i = (Z = e.orderTools) == null ? void 0 : Z.quickOrder, a = (de = e.orderTools) == null ? void 0 : de.quickOrderFloatingWindow, c = (Me = e.orderTools) == null ? void 0 : Me.quickOrderPlusButton, h = (D = e.orderTools) == null ? void 0 : D.openOrders, p = (he = e.orderTools) == null ? void 0 : he.openOrdersExtendedPriceLine, v = (ee = e.orderTools) == null ? void 0 : ee.openOrdersDisplay, f = (ye = e.orderTools) == null ? void 0 : ye.positions, m = (ve = e.orderTools) == null ? void 0 : ve.breakevenPrice, x = (Qe = e.orderTools) == null ? void 0 : Qe.liquidationPrice, S = (Ze = e.orderTools) == null ? void 0 : Ze.priceLine, P = (We = e.orderTools) == null ? void 0 : We.marketPriceLine, Q = (Re = e.orderTools) == null ? void 0 : Re.countDown, Y = (Ve = e.orderTools) == null ? void 0 : Ve.bidAskPrice, V = (it = e.orderTools) == null ? void 0 : it.orderHistory, E = {};
    typeof i == "boolean" && i !== kt && (kt = i, E.quickOrder = i, typeof a != "boolean" && (E.quickOrderFloatingWindow = i), typeof c != "boolean" && (E.quickOrderPlusButton = i)), typeof a == "boolean" && a !== J1 && (J1 = a, E.quickOrderFloatingWindow = a), typeof c == "boolean" && c !== C && (C = c, E.quickOrderPlusButton = c), typeof h == "boolean" && h !== M && (M = h, E.openOrders = h), typeof p == "boolean" && p !== me && (me = p, E.openOrdersExtendedPriceLine = p), v !== void 0 && v !== ke && (ke = v, E.openOrdersDisplay = v), typeof f == "boolean" && f !== je && (je = f, E.positions = f), typeof m == "boolean" && m !== h1 && (h1 = m, E.breakevenPrice = m), typeof x == "boolean" && x !== et && (et = x, E.liquidationPrice = x), typeof S == "boolean" && S !== tt && (tt = S, E.priceLine = S, typeof P != "boolean" && (E.marketPriceLine = S), typeof Q != "boolean" && (E.countDown = S), typeof Y != "boolean" && (E.bidAskPrice = S)), typeof P == "boolean" && P !== rt && (rt = P, E.marketPriceLine = P), typeof Q == "boolean" && Q !== nt && (nt = Q, E.countDown = Q), typeof Y == "boolean" && Y !== P0 && (P0 = Y, E.bidAskPrice = Y), typeof V == "boolean" && V !== O0 && (O0 = V, E.orderHistory = V), Object.keys(E).length > 0 && q1(E);
  }), Ne(() => {
    ae().marketPriceLine, ae().countDown, N(), A(), r == null || r.setStyles({
      candle: {
        priceMark: {
          last: {
            show: !0,
            line: {
              show: ae().marketPriceLine
            },
            text: {
              show: !ae().countDown
            }
          }
        }
      }
    }), Ge();
  }), e.ref({
    setTheme: u,
    getTheme: () => d(),
    setStyles: _,
    getStyles: () => r.getStyles(),
    setLocale: w,
    getLocale: () => y(),
    setTimezone: (i) => {
      re({
        key: i,
        text: J9(e.timezone, y())
      });
    },
    getTimezone: () => G().key,
    setSymbol: O,
    getSymbol: () => A(),
    setPeriod: F,
    getPeriod: () => N(),
    getMainIndicators: () => B(),
    getSubIndicators: () => z(),
    setMainIndicators: R,
    setSubIndicators: Pe,
    overrideIndicator: (i, a) => {
      r == null || r.overrideIndicator(i, a);
    },
    createOverlay: (i) => {
      var c;
      const a = (c = r == null ? void 0 : r.createOverlay) == null ? void 0 : c.call(r, d1(i));
      return typeof a == "string" ? a : null;
    },
    removeOverlay: (i) => {
      var a;
      if ((a = r == null ? void 0 : r.removeOverlay) == null || a.call(r, i), i.id) {
        Ce.delete(i.id);
        const c = _e.get(i.id);
        c && (c.checkInterval && clearInterval(c.checkInterval), c.mouseUpHandler && (document.removeEventListener("mouseup", c.mouseUpHandler), document.removeEventListener("touchend", c.mouseUpHandler)), _e.delete(i.id)), V1();
      }
    },
    removeAllOverlay: () => {
      Ce.forEach((i, a) => {
        var h;
        (h = r == null ? void 0 : r.removeOverlay) == null || h.call(r, {
          id: a
        });
        const c = _e.get(a);
        c && (c.checkInterval && clearInterval(c.checkInterval), c.mouseUpHandler && (document.removeEventListener("mouseup", c.mouseUpHandler), document.removeEventListener("touchend", c.mouseUpHandler)));
      }), Ce.clear(), _e.clear();
    },
    getAllOverlay: () => Array.from(Ce.values()),
    getOverlay: (i) => Ce.get(i) || null,
    overrideOverlay: (i) => {
      r && "overrideOverlay" in r && typeof r.overrideOverlay == "function" ? r.overrideOverlay(i) : console.warn("overrideOverlay method not available on widget");
    },
    convertToPixel: (i, a) => r ? r.convertToPixel(i, a) : Array.isArray(i) ? [] : {},
    convertFromPixel: (i, a) => r ? r.convertFromPixel(i, a) : [],
    getVisibleRange: () => r ? r.getVisibleRange() : {
      from: 0,
      to: 0
    },
    getDataList: () => r ? r.getDataList() : [],
    getSize: (i, a) => r ? r.getSize(i, a) : null,
    getDom: (i, a) => r ? r.getDom(i, a) : null,
    subscribeAction: (i, a) => {
      r && r.subscribeAction(i, a);
    },
    unsubscribeAction: (i, a) => {
      r && r.unsubscribeAction(i, a);
    },
    setIndicatorModalVisible: W,
    setTimezoneModalVisible: ge,
    setSettingModalVisible: Te,
    getOrderToolsState: () => ae(),
    setOrderToolsState: (i) => {
      q1(i);
    },
    dispose: () => {
      t && f9(t);
    },
    resize: () => {
      r && "resize" in r && typeof r.resize == "function" ? r.resize() : console.warn("resize method not available on widget");
    },
    getSettings: () => {
      var c, h, p, v, f, m, x, S, P, Q, Y, V, E, Z, de, Me;
      if (!r)
        return {};
      const i = r.getStyles(), a = (c = i.candle) == null ? void 0 : c.bar;
      return {
        // Candle settings
        candleType: (h = i.candle) == null ? void 0 : h.type,
        candleBarStyle: a == null ? void 0 : a.style,
        // bar.style might be LineType
        showLastPrice: (f = (v = (p = i.candle) == null ? void 0 : p.priceMark) == null ? void 0 : v.last) == null ? void 0 : f.show,
        showHighestPrice: (S = (x = (m = i.candle) == null ? void 0 : m.priceMark) == null ? void 0 : x.high) == null ? void 0 : S.show,
        showLowestPrice: (Y = (Q = (P = i.candle) == null ? void 0 : P.priceMark) == null ? void 0 : Q.low) == null ? void 0 : Y.show,
        // Indicator settings
        showIndicatorLastValue: (E = (V = i.indicator) == null ? void 0 : V.lastValueMark) == null ? void 0 : E.show,
        // Axis settings - yAxis.reverse is boolean according to YAxisStyle interface
        priceAxisType: (Z = i.yAxis) == null ? void 0 : Z.type,
        reverseCoordinate: (de = i.yAxis) == null ? void 0 : de.reverse,
        // Grid settings
        showGrids: (Me = i.grid) == null ? void 0 : Me.show,
        timestamp: Date.now()
      };
    },
    setSettings: (i) => {
      var c, h, p, v, f, m, x, S, P, Q, Y, V, E, Z;
      if (!r)
        return;
      const a = {};
      if (i.candleType !== void 0 && (a.candle = {
        ...a.candle,
        type: i.candleType
      }), i.candleBarStyle !== void 0) {
        const de = ((c = a.candle) == null ? void 0 : c.bar) || {};
        a.candle = {
          ...a.candle,
          bar: {
            ...de,
            style: i.candleBarStyle
          }
          // Use any since ChangeColor doesn't have style
        };
      }
      i.showLastPrice !== void 0 && (a.candle = {
        ...a.candle,
        priceMark: {
          ...(h = a.candle) == null ? void 0 : h.priceMark,
          last: {
            ...(v = (p = a.candle) == null ? void 0 : p.priceMark) == null ? void 0 : v.last,
            show: i.showLastPrice,
            text: {
              ...(x = (m = (f = a.candle) == null ? void 0 : f.priceMark) == null ? void 0 : m.last) == null ? void 0 : x.text,
              show: i.showLastPrice && !ae().countDown
            }
          }
        }
      }), i.showHighestPrice !== void 0 && (a.candle = {
        ...a.candle,
        priceMark: {
          ...(S = a.candle) == null ? void 0 : S.priceMark,
          high: {
            ...(Q = (P = a.candle) == null ? void 0 : P.priceMark) == null ? void 0 : Q.high,
            show: i.showHighestPrice
          }
        }
      }), i.showLowestPrice !== void 0 && (a.candle = {
        ...a.candle,
        priceMark: {
          ...(Y = a.candle) == null ? void 0 : Y.priceMark,
          low: {
            ...(E = (V = a.candle) == null ? void 0 : V.priceMark) == null ? void 0 : E.low,
            show: i.showLowestPrice
          }
        }
      }), i.showIndicatorLastValue !== void 0 && (a.indicator = {
        ...a.indicator,
        lastValueMark: {
          ...(Z = a.indicator) == null ? void 0 : Z.lastValueMark,
          show: i.showIndicatorLastValue
        }
      }), i.priceAxisType !== void 0 && (a.yAxis = {
        ...a.yAxis,
        type: i.priceAxisType
      }), i.reverseCoordinate !== void 0 && (a.yAxis = {
        ...a.yAxis,
        reverse: i.reverseCoordinate
      }), i.showGrids !== void 0 && (a.grid = {
        ...a.grid,
        show: i.showGrids
      }), r.setStyles(a);
    },
    resetSettings: () => {
      var c, h, p, v, f, m, x;
      if (!r)
        return;
      r.getStyles();
      const i = {
        candle: {
          type: Vr.CandleSolid,
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
          type: qr.Normal,
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
      }, a = qe();
      if (a) {
        const S = {
          candle: {
            type: (c = a.candle) == null ? void 0 : c.type,
            bar: (h = a.candle) == null ? void 0 : h.bar,
            priceMark: (p = a.candle) == null ? void 0 : p.priceMark
          },
          indicator: {
            lastValueMark: (v = a.indicator) == null ? void 0 : v.lastValueMark
          },
          yAxis: {
            type: (f = a.yAxis) == null ? void 0 : f.type,
            reverse: (m = a.yAxis) == null ? void 0 : m.reverse
          },
          grid: {
            show: (x = a.grid) == null ? void 0 : x.show
          }
        };
        r.setStyles(S);
      } else
        r.setStyles(i);
    },
    // === Drawing Methods ===
    saveDrawings: (i) => {
      const a = Array.from(Ce.values());
      a.forEach((c, h) => {
        var f;
        const p = $1(c.type), v = ((f = c.points) == null ? void 0 : f.length) || 0;
        v < p && console.warn(`âš ï¸ ${c.type} ${c.id} has only ${v} point(s), should have ${p}`);
      }), Ye.saveDrawings(i, a);
    },
    loadDrawings: (i) => {
      Ye.loadDrawings(i).forEach((c, h) => {
        var p;
        try {
          const v = {
            name: c.type,
            points: c.points || [],
            extendData: c.extendData,
            styles: c.styles,
            visible: c.visible ?? !0,
            lock: c.lock ?? !1,
            mode: c.mode ?? n0.Normal
          }, f = r == null ? void 0 : r.createOverlay(v), m = typeof f == "string" ? f : null;
          m && (Ce.set(m, {
            ...c,
            id: m
          }), _e.set(m, {
            monitoring: !1,
            complete: !0,
            lastPointCount: ((p = c.points) == null ? void 0 : p.length) || 0
          }));
        } catch (v) {
          console.error(`   âŒ Error restoring ${c.type}:`, v);
        }
      });
    },
    getDrawings: (i) => Ye.loadDrawings(i),
    clearDrawings: (i) => {
      Ye.clearDrawings(i);
    },
    // Auto-save on overlay events
    enableAutoSave: (i, a = !0) => {
    }
  });
  const D0 = () => {
    r == null || r.resize(), Ge();
  }, I0 = () => {
    Ge();
  }, N0 = [k1.OnVisibleRangeChange, k1.OnZoom, k1.OnScroll];
  let Lt;
  const r0 = (i, a, c) => {
    let h = a, p = h;
    switch (i.timespan) {
      case "minute": {
        h = h - h % (60 * 1e3), p = h - c * i.multiplier * 60 * 1e3;
        break;
      }
      case "hour": {
        h = h - h % (60 * 60 * 1e3), p = h - c * i.multiplier * 60 * 60 * 1e3;
        break;
      }
      case "day": {
        h = h - h % (60 * 60 * 1e3), p = h - c * i.multiplier * 24 * 60 * 60 * 1e3;
        break;
      }
      case "week": {
        const f = new Date(h).getDay(), m = f === 0 ? 6 : f - 1;
        h = h - m * 60 * 60 * 24;
        const x = new Date(h);
        h = (/* @__PURE__ */ new Date(`${x.getFullYear()}-${x.getMonth() + 1}-${x.getDate()}`)).getTime(), p = c * i.multiplier * 7 * 24 * 60 * 60 * 1e3;
        break;
      }
      case "month": {
        const v = new Date(h), f = v.getFullYear(), m = v.getMonth() + 1;
        h = (/* @__PURE__ */ new Date(`${f}-${m}-01`)).getTime(), p = c * i.multiplier * 30 * 24 * 60 * 60 * 1e3;
        const x = new Date(p);
        p = (/* @__PURE__ */ new Date(`${x.getFullYear()}-${x.getMonth() + 1}-01`)).getTime();
        break;
      }
      case "year": {
        const f = new Date(h).getFullYear();
        h = (/* @__PURE__ */ new Date(`${f}-01-01`)).getTime(), p = c * i.multiplier * 365 * 24 * 60 * 60 * 1e3;
        const m = new Date(p);
        p = (/* @__PURE__ */ new Date(`${m.getFullYear()}-01-01`)).getTime();
        break;
      }
    }
    return [p, h];
  };
  m0(() => {
    if (window.addEventListener("resize", D0), r = Rr(t, {
      customApi: {
        formatDate: (f, m, x, S) => {
          switch (N().timespan) {
            case "minute":
              return S === At.XAxis ? ne.formatDate(f, m, "HH:mm") : ne.formatDate(f, m, "YYYY-MM-DD HH:mm");
            case "hour":
              return S === At.XAxis ? ne.formatDate(f, m, "MM-DD HH:mm") : ne.formatDate(f, m, "YYYY-MM-DD HH:mm");
            case "day":
            case "week":
              return ne.formatDate(f, m, "YYYY-MM-DD");
            case "month":
              return S === At.XAxis ? ne.formatDate(f, m, "YYYY-MM") : ne.formatDate(f, m, "YYYY-MM-DD");
            case "year":
              return S === At.XAxis ? ne.formatDate(f, m, "YYYY") : ne.formatDate(f, m, "YYYY-MM-DD");
          }
          return ne.formatDate(f, m, "YYYY-MM-DD HH:mm");
        }
      }
    }), r) {
      const f = r.getDom("candle_pane", wt.Main);
      if (f) {
        let x = document.createElement("div");
        if (x.className = "klinecharts-pro-watermark", ne.isString(e.watermark)) {
          const S = e.watermark.replace(/(^\s*)|(\s*$)/g, "");
          x.innerHTML = S;
        } else
          x.appendChild(e.watermark);
        f.appendChild(x);
      }
      const m = r.getDom("candle_pane", wt.YAxis);
      n = document.createElement("span"), n.className = "klinecharts-pro-price-unit", m == null || m.appendChild(n);
    }
    let i = !1;
    const a = () => {
      const f = A();
      if (f != null && f.ticker)
        try {
          const m = Array.from(Ce.values());
          Ye.saveDrawings(f.ticker, m);
        } catch (m) {
          console.error("âŒ Error refreshing local storage:", m);
        }
    }, c = (f) => {
      i || (i = !0, f.preventDefault());
    };
    setTimeout(() => {
      t && t.addEventListener("contextmenu", c);
    }, 1e3), document.addEventListener("contextmenu", (f) => {
      t && t.contains(f.target) && c(f);
    });
    const h = r == null ? void 0 : r.removeOverlay;
    r && h && (r.removeOverlay = function(...f) {
      const m = h.apply(this, f), x = f[0];
      let S;
      if (typeof x == "string" ? S = x : x && typeof x == "object" && x.id && (S = x.id), S) {
        Ce.delete(S);
        const P = _e.get(S);
        P && (P.checkInterval && clearInterval(P.checkInterval), P.mouseUpHandler && (document.removeEventListener("mouseup", P.mouseUpHandler), document.removeEventListener("touchend", P.mouseUpHandler)), _e.delete(S)), a();
      }
      return m;
    }), B().forEach((f) => {
      Pt(r, f, !0, {
        id: "candle_pane"
      });
    });
    const p = {};
    e.subIndicators.forEach((f) => {
      const m = Pt(r, f, !0);
      m && (p[f] = m);
    }), Pe(p), r == null || r.loadMore((f) => {
      l(!0), (async () => {
        try {
          const x = N(), [S] = r0(x, f, 1), [P] = r0(x, S, 500), Q = await e.datafeed.getHistoryKLineData(A(), x, P, S);
          r == null || r.applyMoreData(Q, Q.length > 0);
        } finally {
          l(!1);
        }
      })();
    }), r == null || r.subscribeAction(k1.OnTooltipIconClick, (f) => {
      if (f.indicatorName)
        switch (f.iconId) {
          case "visible": {
            r == null || r.overrideIndicator({
              name: f.indicatorName,
              visible: !0
            }, f.paneId);
            const m = f.paneId === "candle_pane" ? "main" : "sub";
            Fe(f.indicatorName, f.paneId, m, "change");
            break;
          }
          case "invisible": {
            r == null || r.overrideIndicator({
              name: f.indicatorName,
              visible: !1
            }, f.paneId);
            const m = f.paneId === "candle_pane" ? "main" : "sub";
            Fe(f.indicatorName, f.paneId, m, "change");
            break;
          }
          case "setting": {
            const m = r == null ? void 0 : r.getIndicatorByPaneId(f.paneId, f.indicatorName);
            R1({
              visible: !0,
              indicatorName: f.indicatorName,
              paneId: f.paneId,
              calcParams: m.calcParams
            });
            break;
          }
          case "close":
            if (f.paneId === "candle_pane") {
              const m = [...B()];
              r == null || r.removeIndicator("candle_pane", f.indicatorName), m.splice(m.indexOf(f.indicatorName), 1), R(m), Fe(f.indicatorName, "candle_pane", "main", "remove");
            } else {
              const m = {
                ...z()
              };
              r == null || r.removeIndicator(f.paneId, f.indicatorName), delete m[f.indicatorName], Pe(m), Fe(f.indicatorName, f.paneId, "sub", "remove");
            }
        }
    }), r == null || r.subscribeAction(k1.OnCrosshairChange, pt), N0.forEach((f) => {
      r == null || r.subscribeAction(f, I0);
    }), Lt = window.setInterval(() => Ge(), 1e3), Ge(), document.addEventListener("mousedown", _t);
    const v = r == null ? void 0 : r.createOverlay;
    r && v && (r.createOverlay = function(...f) {
      const m = d1(f[0]), x = v.apply(this, [m, ...f.slice(1)]), S = typeof x == "string" ? x : null;
      return S && (ft(S, m.name || "unknown"), t1(S), V1()), x;
    });
  }), w1(() => {
    window.removeEventListener("resize", D0), r == null || r.unsubscribeAction(k1.OnCrosshairChange, pt), N0.forEach((i) => {
      r == null || r.unsubscribeAction(i, I0);
    }), Lt && (window.clearInterval(Lt), Lt = void 0), document.removeEventListener("mousedown", _t), _e.clear(), Ce.clear(), f9(t);
  }), Ne(() => {
    const i = A();
    i != null && i.priceCurrency ? (n.innerHTML = i == null ? void 0 : i.priceCurrency.toLocaleUpperCase(), n.style.display = "flex") : n.style.display = "none", r == null || r.setPriceVolumePrecision((i == null ? void 0 : i.pricePrecision) ?? 2, (i == null ? void 0 : i.volumePrecision) ?? 0);
  });
  const zr = (i) => {
    const a = new Date(i), c = a.getFullYear(), h = `${a.getMonth() + 1}`.padStart(2, "0"), p = `${a.getDate()}`.padStart(2, "0"), v = `${a.getHours()}`.padStart(2, "0"), f = `${a.getMinutes()}`.padStart(2, "0"), m = `${c}-${h}-${p}`;
    switch (N().timespan) {
      case "minute":
      case "hour":
        return `${m} ${v}:${f}`;
      case "day":
      case "week":
        return m;
      case "month":
        return m;
      case "year":
        return m;
    }
    return `${m} ${v}:${f}`;
  }, jr = (i, a) => {
    var x, S;
    const {
      current: c
    } = i, h = a.tooltip.text.color, p = c.close > c.open ? a.bar.upColor : c.close < c.open ? a.bar.downColor : a.bar.noChangeColor, v = Math.min(Math.max(((x = A()) == null ? void 0 : x.pricePrecision) ?? 2, 0), 8), f = Math.min(Math.max(((S = A()) == null ? void 0 : S.volumePrecision) ?? 0, 0), 8), m = (P) => ({
      text: ne.formatPrecision(P, v),
      color: p
    });
    return [{
      title: "time",
      value: {
        text: zr(c.timestamp),
        color: h
      }
    }, {
      title: "open",
      value: m(c.open)
    }, {
      title: "high",
      value: m(c.high)
    }, {
      title: "low",
      value: m(c.low)
    }, {
      title: "close",
      value: m(c.close)
    }, {
      title: "volume",
      value: {
        text: ne.formatBigNumber(ne.formatPrecision(c.volume ?? a.tooltip.defaultValue, f)),
        color: p
      }
    }];
  }, xt = () => {
    r == null || r.setStyles({
      candle: {
        tooltip: {
          custom: jr,
          rect: {
            offsetLeft: 0,
            paddingLeft: 0
          }
        }
      }
    });
  };
  return Ne((i) => {
    const a = A(), c = N();
    let h = !0;
    return w1(() => {
      h = !1;
    }), i && e.datafeed.unsubscribe(i.symbol, i.period), l(!0), j(!0), (async () => {
      try {
        const [v, f] = r0(c, (/* @__PURE__ */ new Date()).getTime(), 500), m = await e.datafeed.getHistoryKLineData(a, c, v, f);
        if (!h)
          return;
        r == null || r.applyNewData(m, m.length > 0), Ge(), setTimeout(() => {
          h && (yt(a == null ? void 0 : a.ticker), Ge());
        }, 0), e.datafeed.subscribe(a, c, (x) => {
          r == null || r.updateData(x), Ge();
        });
      } finally {
        h && (l(!1), j(!1));
      }
    })(), {
      symbol: a,
      period: c
    };
  }), Ne(() => {
    const i = d();
    r == null || r.setStyles(i);
    const a = i === "dark" ? "#929AA5" : "#76808F";
    xt(), r == null || r.setStyles({
      indicator: {
        tooltip: {
          icons: [{
            id: "visible",
            position: Mt.Middle,
            marginLeft: K().visibleMarginLeft,
            marginTop: K().marginTop,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: K().size,
            color: a,
            activeColor: a,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "invisible",
            position: Mt.Middle,
            marginLeft: K().secondaryMarginLeft,
            marginTop: K().marginTop,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: K().size,
            color: a,
            activeColor: a,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "setting",
            position: Mt.Middle,
            marginLeft: K().secondaryMarginLeft,
            marginTop: K().marginTop,
            marginBottom: 0,
            marginRight: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: K().size,
            color: a,
            activeColor: a,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "close",
            position: Mt.Middle,
            marginLeft: K().secondaryMarginLeft,
            marginTop: K().marginTop,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: K().size,
            color: a,
            activeColor: a,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }]
        }
      }
    });
  }), Ne(() => {
    r == null || r.setLocale(y());
  }), Ne(() => {
    r == null || r.setTimezone(G().key);
  }), Ne(() => {
    g() && (r == null || r.setStyles(g()), xt(), g1(ns(r.getStyles())));
  }), [nf.cloneNode(!0), L(ld, {
    get locale() {
      return e.locale;
    },
    get symbol() {
      return A();
    },
    get spread() {
      return Je();
    },
    get period() {
      return N();
    },
    get periods() {
      return e.periods;
    },
    onMenuClick: async () => {
      try {
        await C5(() => He(!Je())), r == null || r.resize();
      } catch {
      }
    },
    onSymbolClick: () => {
      H(!c1());
    },
    get onMobilePeriodClick() {
      return e.onMobilePeriodClick;
    },
    onMobileMoreClick: () => {
      e.onMobileMoreClick ? e.onMobileMoreClick() : De(!0);
    },
    onPeriodChange: F,
    onIndicatorClick: () => {
      W((i) => !i);
    },
    onTimezoneClick: () => {
      ge((i) => !i);
    },
    onSettingClick: () => {
      Te((i) => !i);
    },
    onScreenshotClick: () => {
      if (r) {
        const i = e.screenshotBackgroundColor || (e.theme === "dark" ? "#11131E" : "#ffffff"), a = r.getConvertPictureUrl(!0, "jpeg", i);
        l1(a);
      }
    },
    get showOrderToolsMenu() {
      var i;
      return ((i = e.orderTools) == null ? void 0 : i.visible) ?? !1;
    },
    get orderToolsState() {
      return ae();
    },
    onOrderToolsStateChange: q1
  }), (() => {
    const i = of.cloneNode(!0), a = i.firstChild;
    return i.addEventListener("mouseleave", () => {
      pe(null), $e(!1);
    }), k(i, L(q, {
      get when() {
        return U();
      },
      get children() {
        return L(Br, {});
      }
    }), a), k(i, L(q, {
      get when() {
        return Je();
      },
      get children() {
        return L(Uh, {
          get locale() {
            return e.locale;
          },
          onDrawingItemClick: (c) => {
            r == null || r.createOverlay(d1(c));
          },
          onModeChange: (c) => {
            r == null || r.overrideOverlay({
              mode: c
            });
          },
          onLockChange: (c) => {
            r == null || r.overrideOverlay({
              lock: c
            });
          },
          onVisibleChange: (c) => {
            r == null || r.overrideOverlay({
              visible: c
            });
          },
          onRemoveClick: (c) => {
            r == null || r.removeOverlay({
              groupId: c
            });
          }
        });
      }
    }), a), A1((c) => t = c, a), k(i, L(q, {
      get when() {
        return Gt();
      },
      keyed: !0,
      children: (c) => (() => {
        const h = af.cloneNode(!0), p = h.firstChild, v = p.nextSibling;
        return h.style.setProperty("right", "0px"), k(p, () => c.priceText), k(v, () => c.text), I((f) => {
          const m = `${c.top}px`, x = `${c.width}px`, S = c.color, P = `${c.borderRadius}px`, Q = c.textFamily, Y = c.textWeight, V = `${c.paddingLeft}px`, E = `${c.paddingRight}px`, Z = `${c.paddingTop}px`, de = `${c.paddingBottom}px`, Me = `${c.textSize}px`, D = `${Math.max(10, c.textSize - 1)}px`;
          return m !== f._v$ && h.style.setProperty("top", f._v$ = m), x !== f._v$2 && h.style.setProperty("width", f._v$2 = x), S !== f._v$3 && h.style.setProperty("background", f._v$3 = S), P !== f._v$4 && h.style.setProperty("border-radius", f._v$4 = P), Q !== f._v$5 && h.style.setProperty("font-family", f._v$5 = Q), Y !== f._v$6 && h.style.setProperty("font-weight", f._v$6 = Y), V !== f._v$7 && h.style.setProperty("padding-left", f._v$7 = V), E !== f._v$8 && h.style.setProperty("padding-right", f._v$8 = E), Z !== f._v$9 && h.style.setProperty("padding-top", f._v$9 = Z), de !== f._v$10 && h.style.setProperty("padding-bottom", f._v$10 = de), Me !== f._v$11 && p.style.setProperty("font-size", f._v$11 = Me), D !== f._v$12 && v.style.setProperty("font-size", f._v$12 = D), f;
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
    }), null), k(i, L(q, {
      get when() {
        return Ee();
      },
      keyed: !0,
      children: (c) => (() => {
        const h = uf.cloneNode(!0), p = h.firstChild, v = p.nextSibling, f = v.nextSibling, m = f.firstChild, x = f.nextSibling, S = x.firstChild, P = S.firstChild, Q = P.nextSibling, Y = Q.firstChild, V = x.nextSibling, E = V.firstChild, Z = V.nextSibling, de = Z.nextSibling, Me = de.nextSibling;
        return h.$$click = (D) => {
          D.stopPropagation();
        }, h.$$mousedown = (D) => {
          D.preventDefault(), D.stopPropagation();
        }, p.$$mousedown = t0, v.$$click = bt, m.$$click = () => Ie(Ue() === "color" ? null : "color"), k(f, L(q, {
          get when() {
            return Ue() === "color";
          },
          get children() {
            const D = sf.cloneNode(!0), he = D.firstChild;
            return k(he, L(c0, {
              each: Q1,
              children: (ee) => (() => {
                const ye = df.cloneNode(!0);
                return ye.$$click = () => e0(ee), ye.style.setProperty("background", ee), I(() => fe(ye, `overlay-toolbar-color-swatch ${c.color.toLowerCase() === ee.toLowerCase() ? "selected" : ""}`)), ye;
              })()
            })), D;
          }
        }), null), S.$$click = () => Ie(Ue() === "width" ? null : "width"), k(Q, () => c.lineSize, Y), k(x, L(q, {
          get when() {
            return Ue() === "width";
          },
          get children() {
            const D = lf.cloneNode(!0);
            return k(D, L(c0, {
              each: [1, 2, 3, 4],
              children: (he) => (() => {
                const ee = hf.cloneNode(!0), ye = ee.firstChild;
                return ee.$$click = () => vt(he), ye.style.setProperty("height", `${he}px`), I(() => fe(ee, c.lineSize === he ? "selected" : "")), ee;
              })()
            })), D;
          }
        }), null), E.$$click = () => Ie(Ue() === "style" ? null : "style"), k(V, L(q, {
          get when() {
            return Ue() === "style";
          },
          get children() {
            const D = cf.cloneNode(!0), he = D.firstChild, ee = he.nextSibling, ye = ee.nextSibling;
            return he.$$click = () => X1(i1.Solid, []), ee.$$click = () => X1(i1.Dashed, [6, 4]), ye.$$click = () => X1(i1.Dashed, [2, 4]), I((ve) => {
              var Re, Ve;
              const Qe = c.lineStyle === i1.Solid ? "selected" : "", Ze = c.lineStyle === i1.Dashed && ((Re = c.dashedValue) == null ? void 0 : Re[0]) === 6 ? "selected" : "", We = c.lineStyle === i1.Dashed && ((Ve = c.dashedValue) == null ? void 0 : Ve[0]) === 2 ? "selected" : "";
              return Qe !== ve._v$13 && fe(he, ve._v$13 = Qe), Ze !== ve._v$14 && fe(ee, ve._v$14 = Ze), We !== ve._v$15 && fe(ye, ve._v$15 = We), ve;
            }, {
              _v$13: void 0,
              _v$14: void 0,
              _v$15: void 0
            }), D;
          }
        }), null), Z.$$click = mt, de.$$click = Jt, Me.$$click = Xt, I((D) => {
          const he = `${c.x}px`, ee = `${c.y}px`, ye = `overlay-toolbar-icon edit ${Ue() === "color" ? "active" : ""}`, ve = `overlay-toolbar-line-size ${Ue() === "width" ? "active" : ""}`, Qe = `overlay-toolbar-icon minus ${Ue() === "style" ? "active" : ""}`, Ze = `overlay-toolbar-icon visibility ${c.visible ? "" : "muted"}`, We = c.visible ? "Hide" : "Show", Re = `overlay-toolbar-icon lock ${c.locked ? "active" : ""}`, Ve = c.locked ? "Unlock" : "Lock";
          return he !== D._v$16 && h.style.setProperty("left", D._v$16 = he), ee !== D._v$17 && h.style.setProperty("top", D._v$17 = ee), ye !== D._v$18 && fe(m, D._v$18 = ye), ve !== D._v$19 && fe(S, D._v$19 = ve), Qe !== D._v$20 && fe(E, D._v$20 = Qe), Ze !== D._v$21 && fe(Z, D._v$21 = Ze), We !== D._v$22 && xe(Z, "title", D._v$22 = We), Re !== D._v$23 && fe(de, D._v$23 = Re), Ve !== D._v$24 && xe(de, "title", D._v$24 = Ve), D;
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
    }), null), k(i, L(q, {
      get when() {
        return ie();
      },
      keyed: !0,
      children: (c) => (() => {
        const h = ff.cloneNode(!0), p = h.firstChild;
        return h.addEventListener("mouseleave", () => {
          we() || $e(!1);
        }), h.$$mousemove = (v) => {
          v.stopPropagation(), r1();
        }, h.addEventListener("mouseenter", () => {
          $e(!0), r1();
        }), p.$$click = (v) => {
          v.stopPropagation(), $e(!0), m1({
            y: c.y,
            price: c.price,
            yAxisWidth: ut()
          }), te(!0), r1();
        }, p.$$mousedown = (v) => {
          v.preventDefault(), v.stopPropagation(), r1();
        }, k(p, (() => {
          const v = J(() => {
            var f;
            return !!((f = e.orderTools) != null && f.quickOrderPlusIcon);
          });
          return () => v() ? (() => {
            const f = yf.cloneNode(!0);
            return I(() => f.innerHTML = e.orderTools.quickOrderPlusIcon), f;
          })() : gf.cloneNode(!0);
        })()), I((v) => {
          const f = `${Math.max(0, c.y - 12)}px`, m = `${ut()}px`, x = ae().quickOrderPlusButton ? "block" : "none";
          return f !== v._v$25 && h.style.setProperty("top", v._v$25 = f), m !== v._v$26 && h.style.setProperty("right", v._v$26 = m), x !== v._v$27 && h.style.setProperty("display", v._v$27 = x), v;
        }, {
          _v$25: void 0,
          _v$26: void 0,
          _v$27: void 0
        }), h;
      })()
    }), null), k(i, L(q, {
      get when() {
        return J(() => !!we())() && C1();
      },
      keyed: !0,
      children: (c) => (() => {
        const h = pf.cloneNode(!0), p = h.firstChild, v = p.firstChild, f = v.firstChild, m = f.nextSibling, x = m.nextSibling, S = x.nextSibling;
        S.nextSibling;
        const P = v.nextSibling, Q = P.firstChild, Y = Q.nextSibling, V = Y.nextSibling, E = V.nextSibling;
        E.nextSibling;
        const Z = P.nextSibling, de = Z.nextSibling, Me = de.firstChild, D = Me.nextSibling;
        D.nextSibling;
        const he = de.nextSibling;
        return he.firstChild, h.addEventListener("mouseleave", () => $e(!1)), h.addEventListener("mouseenter", () => $e(!0)), p.$$mousemove = () => {
          r1();
        }, p.$$mousedown = (ee) => {
          ee.preventDefault(), ee.stopPropagation(), r1();
        }, v.$$click = () => H1("limit"), k(v, () => A().shortName ?? A().name ?? A().ticker, m), k(v, () => _1(c.price), S), P.$$click = () => H1("stop"), k(P, () => A().shortName ?? A().name ?? A().ticker, Y), k(P, () => _1(c.price), E), Z.$$click = () => H1("create"), de.$$click = Ct, k(de, () => _1(c.price), D), he.$$click = Y1, k(he, () => _1(c.price), null), I((ee) => {
          const ye = `${Math.max(0, c.y + 24)}px`, ve = `${c.yAxisWidth + dt}px`;
          return ye !== ee._v$28 && h.style.setProperty("top", ee._v$28 = ye), ve !== ee._v$29 && h.style.setProperty("right", ee._v$29 = ve), ee;
        }, {
          _v$28: void 0,
          _v$29: void 0
        }), h;
      })()
    }), null), I(() => xe(a, "data-drawing-bar-visible", Je())), i;
  })(), L(q, {
    get when() {
      return c1();
    },
    get children() {
      return L(ef, {
        get locale() {
          return e.locale;
        },
        get datafeed() {
          return e.datafeed;
        },
        onSymbolSelected: (i) => {
          O(i);
        },
        onClose: () => {
          H(!1);
        }
      });
    }
  }), L(q, {
    get when() {
      return X();
    },
    get children() {
      return L(Fh, {
        get locale() {
          return e.locale;
        },
        get mainIndicators() {
          return B();
        },
        get subIndicators() {
          return z();
        },
        onClose: () => {
          W(!1);
        },
        onMainIndicatorChange: (i) => {
          const a = [...B()];
          i.added ? (Pt(r, i.name, !0, {
            id: "candle_pane"
          }), a.push(i.name), Fe(i.name, "candle_pane", "main", "add")) : (r == null || r.removeIndicator("candle_pane", i.name), a.splice(a.indexOf(i.name), 1), Fe(i.name, "candle_pane", "main", "remove")), R(a);
        },
        onSubIndicatorChange: (i) => {
          const a = {
            ...z()
          };
          if (i.added) {
            const c = Pt(r, i.name);
            c && (a[i.name] = c, Fe(i.name, c, "sub", "add"));
          } else
            i.paneId && (r == null || r.removeIndicator(i.paneId, i.name), delete a[i.name], Fe(i.name, i.paneId, "sub", "remove"));
          Pe(a);
        }
      });
    }
  }), L(q, {
    get when() {
      return Oe();
    },
    get children() {
      return L(zh, {
        get locale() {
          return e.locale;
        },
        get timezone() {
          return G();
        },
        onClose: () => {
          ge(!1);
        },
        onConfirm: re
      });
    }
  }), L(q, {
    get when() {
      return ue();
    },
    get children() {
      return L(Zh, {
        get locale() {
          return e.locale;
        },
        get currentStyles() {
          return ne.clone(r.getStyles());
        },
        onClose: () => {
          Te(!1);
        },
        onChange: (i) => {
          r == null || r.setStyles(i), xt();
        },
        onRestoreDefault: (i) => {
          const a = {};
          i.forEach((c) => {
            const h = c.key;
            d0(a, h, ne.formatValue(qe(), h));
          }), r == null || r.setStyles(a), xt();
        }
      });
    }
  }), L(q, {
    get when() {
      return p1().length > 0;
    },
    get children() {
      return L(Vh, {
        get locale() {
          return e.locale;
        },
        get url() {
          return p1();
        },
        onClose: () => {
          l1("");
        }
      });
    }
  }), L(q, {
    get when() {
      return b1().visible;
    },
    get children() {
      return L(Gh, {
        get locale() {
          return e.locale;
        },
        get params() {
          return b1();
        },
        onClose: () => {
          R1({
            visible: !1,
            indicatorName: "",
            paneId: "",
            calcParams: []
          });
        },
        onConfirm: (i) => {
          const a = b1();
          r == null || r.overrideIndicator({
            name: a.indicatorName,
            calcParams: i
          }, a.paneId);
          const c = a.paneId === "candle_pane" ? "main" : "sub";
          Fe(a.indicatorName, a.paneId, c, "change");
        }
      });
    }
  }), L(q, {
    get when() {
      return Ae();
    },
    get children() {
      return L(rf, {
        get locale() {
          return e.locale;
        },
        onIndicatorClick: () => {
          W(!0);
        },
        onTimezoneClick: () => {
          ge(!0);
        },
        onSettingClick: () => {
          Te(!0);
        },
        onClose: () => {
          De(!1);
        }
      });
    }
  })];
};
ze(["mousedown", "click", "mousemove"]);
const bf = /* @__PURE__ */ $('<svg class="logo" viewBox="0 0 80 92"><path d="M28.148808359375,51.7280513671875L22.963588359375,51.7280513671875C21.572648359375002,51.7280513671875,20.445068359375,52.6220613671875,20.445068359375,53.7248813671875L20.445068359375,72.3979013671875C20.445068359375,73.5007013671875,21.572648359375002,74.39470136718751,22.963588359375,74.39470136718751L33.926568359375,74.39470136718751C35.317468359375,74.39470136718751,36.445068359375,73.5007013671875,36.445068359375,72.3979013671875L36.445068359375,53.7248813671875C36.445068359375,52.6220613671875,35.317468359375,51.7280513671875,33.926568359375,51.7280513671875L28.741398359374998,51.7280513671875L28.741398359374998,46.2963223671875C28.741398359374998,46.1665793671875,28.608748359375,46.0614013671875,28.445108359375,46.0614013671875C28.281468359375,46.0614013671875,28.148808359375,46.1665793671875,28.148808359375,46.2963223671875L28.148808359375,51.7280513671875ZM28.741398359374998,74.3948013671875L28.741398359374998,79.82650136718749C28.741398359374998,79.9563013671875,28.608748359375,80.0614013671875,28.445108359375,80.0614013671875C28.281468359375,80.0614013671875,28.148808359375,79.9563013671875,28.148808359375,79.82650136718749L28.148808359375,74.3948013671875L28.741398359374998,74.3948013671875Z"></path><path d="M51.148808359374996,44.7280513671875L45.963588359375,44.7280513671875C44.572648359375,44.7280513671875,43.445068359375,45.6220613671875,43.445068359375,46.7248813671875L43.445068359375,65.3979013671875C43.445068359375,66.5007013671875,44.572648359375,67.39470136718751,45.963588359375,67.39470136718751L56.926568359375,67.39470136718751C58.317468359375,67.39470136718751,59.445068359375,66.5007013671875,59.445068359375,65.3979013671875L59.445068359375,46.7248813671875C59.445068359375,45.6220613671875,58.317468359375,44.7280513671875,56.926568359375,44.7280513671875L51.741398359375,44.7280513671875L51.741398359375,39.2963223671875C51.741398359375,39.1665793671875,51.608748359375,39.0614013671875,51.445108359375,39.0614013671875C51.281468359375,39.0614013671875,51.148808359374996,39.1665793671875,51.148808359374996,39.2963223671875L51.148808359374996,44.7280513671875ZM51.741398359375,67.3948013671875L51.741398359375,72.82650136718749C51.741398359375,72.9563013671875,51.608748359375,73.0614013671875,51.445108359375,73.0614013671875C51.281468359375,73.0614013671875,51.148808359374996,72.9563013671875,51.148808359374996,72.82650136718749L51.148808359374996,67.3948013671875L51.741398359375,67.3948013671875Z"></path><path d="M17.7274,90.6541C17.5901,90.6541,17.4517,90.6436,17.3121,90.6225C9.93219,89.5095,4.80718,86.7136,2.07787,82.3084C-1.1223,77.1437,0.241766,71.6314,0.56829,70.5137C5.37624,46.647,15.0785,38.4945,21.5025,33.0957C22.9683,31.8633,24.2342,30.7995,25.1676,29.7672C25.4105,29.4984,25.6051,29.2154,25.7556,28.9202C24.7465,29.2231,24.1971,29.4326,24.1703,29.4429C22.908,29.9368,21.4777,29.3247,20.9761,28.076C20.4756,26.8272,21.0897,25.4146,22.352,24.9172C22.5042,24.8571,23.5312,24.4607,25.3073,23.9616C24.087,21.4425,21.7693,18.7949,19.7125,16.6431L19.2819,16.1902C16.2438,12.9776,14.6017,4.80159,14.3036,3.19471C14.1306,2.26212,14.4636,1.30796,15.1814,0.679657C15.8995,0.0512175,16.8976,-0.159672,17.8125,0.123747C22.7731,1.66274,24.2638,1.81255,27.2321,2.11098C28.7357,2.26195,29.83,3.59029,29.6762,5.07662C29.5236,6.56295,28.182,7.64786,26.6784,7.49454C24.4992,7.27569,22.9517,7.09896,20.724,6.56646C21.4493,9.09088,22.3803,11.5427,23.2771,12.4919L23.6876,12.9237C25.3757,14.69,28.9691,18.45,30.7016,22.7299C35.0392,21.9433,40.8791,21.3359,47.7817,21.7249C48.2004,20.7386,48.8054,19.7953,49.5907,18.9135C49.7137,18.7754,49.8498,18.6502,49.9988,18.539C53.6142,15.8508,57.5491,12.857,59.7803,11.0758C58.1028,11.2502,56.1034,11.0278,53.9124,9.70882C53.2439,9.30622,52.5992,8.89427,51.9662,8.48933C48.4668,6.25164,46.497,5.12109,43.4234,5.94853C41.9647,6.34058,40.4622,5.48975,40.0659,4.04789C39.6695,2.60604,40.5296,1.11853,41.9871,0.726471C47.5602,-0.773825,51.4796,1.73271,54.9364,3.9434L54.9364,3.9434C55.5284,4.32176,56.1318,4.70797,56.7564,5.08482C58.3843,6.06556,59.4858,5.76127,61.2899,5.13865C62.3511,4.77234,63.5567,4.35687,64.8675,4.53476C66.3321,4.73254,67.4406,5.56933,67.9103,6.83096C68.7444,9.07333,67.1035,11.5533,65.5797,13.2374C64.6729,14.2394,60.0845,17.7606,56.4519,20.4957C56.9477,20.3369,57.4767,20.2511,58.026,20.2511C59.4281,20.2511,60.6982,20.8102,61.621,21.7153C65.4948,20.6901,67.87,17.9563,67.9033,17.9175C68.78,16.8888,70.3322,16.7577,71.3721,17.6226C72.412,18.4886,72.5457,20.0253,71.6702,21.054C71.5221,21.2286,69.5063,23.5492,66.0787,25.233C69.5399,26.8822,72.9993,29.682,74.1841,34.4145C74.5106,35.7206,73.7062,37.0407,72.3859,37.3638C72.1871,37.4117,71.9884,37.4351,71.792,37.4351C70.687,37.4351,69.6826,36.6932,69.4046,35.5848C68.4378,31.7217,64.8144,29.7431,61.7619,28.7456C60.8298,29.7349,59.5009,30.3535,58.026,30.3535C55.8642,30.3535,54.0162,29.0245,53.2713,27.1474C53.2022,27.138,53.1331,27.1287,53.0642,27.1195C54.232,29.5936,57.0851,31.9259,58.1868,32.665C58.3157,32.7516,58.4423,32.8523,58.5547,32.9599C66.5865,40.6151,72.4887,48.8133,76.0971,57.3287C76.6815,58.7074,76.0249,60.2932,74.6313,60.8702C74.2976,61.01,73.9388,61.082,73.576,61.082C72.5065,61.082,71.4914,60.4582,71.0525,59.4213C67.7577,51.6455,62.331,44.1074,54.9203,37.0116C53.6073,36.1009,48.0984,31.9917,47.2065,26.583C40.9421,26.2679,35.6187,26.8278,31.6725,27.5336C31.6197,29.527,30.9225,31.5172,29.2456,33.3731C28.0614,34.6827,26.5968,35.915,25.0446,37.2188C21.9414,39.8269,18.2648,42.9169,14.8104,48.1192C11.356,53.3215,8.12389,60.6361,5.9098,71.6934C5.88732,71.8035,5.85893,71.9123,5.82344,72.0188C5.81634,72.041,4.57886,76.0413,6.77344,79.5289C8.6332,82.4828,12.4557,84.4139,18.1367,85.2705C19.6297,85.4953,20.6566,86.8762,20.4295,88.3532C20.2213,89.6944,19.0559,90.6541,17.7274,90.6541ZM35.1195,7.03101C33.3502,7.03101,31.9158,5.61208,31.9158,3.86173C31.9158,2.11139,33.3502,0.69245,35.1195,0.69245C36.8889,0.69245,38.3233,2.11139,38.3233,3.86173C38.3233,5.61208,36.8889,7.03101,35.1195,7.03101ZM57.6848,23.1892L58.414,24.4754C58.8984,24.3623,59.3923,24.3435,59.8644,24.4203C60.2191,24.5005,60.5087,24.7182,60.6663,25.0229C60.8636,25.3394,60.8993,25.7346,60.7646,26.1094C60.5988,26.5176,60.2972,26.8749,59.9085,27.1235L60.31,27.8316L59.7886,28.1294L59.3994,27.443C58.9257,27.7175,58.399,27.883,57.8664,27.9247L57.3744,27.0569C57.6378,27.0741,57.9071,27.048,58.1704,26.9797C58.4501,26.9251,58.7239,26.8323,58.9829,26.7044L58.2801,25.4647C57.8047,25.5877,57.3167,25.6065,56.8549,25.5197C56.4913,25.4263,56.196,25.1971,56.0328,24.8814C55.8433,24.5561,55.8127,24.1572,55.9484,23.7789C56.088,23.373,56.3763,23.0149,56.7584,22.7726L56.4166,22.1699L56.938,21.8721L57.2727,22.4625C57.6615,22.2376,58.0888,22.0901,58.5254,22.0301L59.0042,22.8746C58.5548,22.8828,58.103,22.9906,57.6848,23.1892ZM56.9319,24.2961Q57.1278,24.6417,57.7863,24.5856L57.1695,23.4978Q56.6982,23.884,56.9319,24.2961ZM58.9077,25.3462L59.4981,26.3875L59.499,26.3891Q59.9965,26.0045,59.7628,25.5923Q59.573,25.2576,58.9077,25.3462ZM73.2212,66.5065C73.2212,68.2569,74.6555,69.6758,76.4249,69.6758C78.1943,69.6758,79.6286,68.2569,79.6286,66.5065C79.6286,64.7562,78.1943,63.3372,76.4249,63.3372C74.6555,63.3372,73.2212,64.7562,73.2212,66.5065ZM35.9465,91.8045C35.0734,91.8045,34.2038,91.7987,33.3378,91.7858C31.827,91.7636,30.6203,90.5359,30.6428,89.0402C30.6653,87.5457,31.9158,86.3297,33.4183,86.3742C49.6344,86.6059,65.7512,84.6175,67.6134,84.037C72.1953,82.4184,74.5295,79.3603,74.5295,74.9575C74.5295,73.463,75.754,72.2517,77.2648,72.2517C78.7755,72.2517,80,73.463,80,74.9575C80,81.5992,76.148,86.7686,69.4317,89.142C67.0041,89.9999,51.0955,91.8046,35.9465,91.8045ZM25.2731,92C23.5037,92,22.0693,90.5811,22.0693,88.8307C22.0693,87.0804,23.5037,85.6615,25.2731,85.6615C27.0424,85.6615,28.4768,87.0804,28.4768,88.8307C28.4768,90.5811,27.0424,92,25.2731,92Z"></path></svg>'), $f = bf.cloneNode(!0);
class Af {
  constructor(t) {
    ot(this, "_chartApi", null);
    if (ne.isString(t.container)) {
      if (this._container = document.getElementById(t.container), !this._container)
        throw new Error("Container is null");
    } else
      this._container = t.container;
    this._container.classList.add("klinecharts-pro"), this._container.setAttribute("data-theme", t.theme ?? "light");
    const r = this;
    A5(() => L(vf, {
      ref: (n) => {
        r._chartApi = n;
      },
      get styles() {
        return t.styles ?? {};
      },
      get watermark() {
        return t.watermark ?? $f;
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
    var n, o;
    (o = (n = this._chartApi) == null ? void 0 : n.enableAutoSave) == null || o.call(n, t, r);
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
    var n, o;
    return ((o = (n = this._chartApi) == null ? void 0 : n.getSize) == null ? void 0 : o.call(n, t, r)) ?? null;
  }
  getDom(t, r) {
    var n, o;
    return ((o = (n = this._chartApi) == null ? void 0 : n.getDom) == null ? void 0 : o.call(n, t, r)) ?? null;
  }
  subscribeAction(t, r) {
    var n, o;
    (o = (n = this._chartApi) == null ? void 0 : n.subscribeAction) == null || o.call(n, t, r);
  }
  unsubscribeAction(t, r) {
    var n, o;
    (o = (n = this._chartApi) == null ? void 0 : n.unsubscribeAction) == null || o.call(n, t, r);
  }
}
h5.forEach((e) => {
  Hr(e);
});
export {
  Lf as DefaultDatafeed,
  Af as KLineChartPro,
  xf as loadLocales
};
//# sourceMappingURL=klinecharts-pro.js.map
