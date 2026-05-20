var i5 = Object.defineProperty;
var a5 = (e, t, r) => t in e ? i5(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var Oe = (e, t, r) => (a5(e, typeof t != "symbol" ? t + "" : t, r), r);
import { utils as o1, OverlayMode as vt, LineType as Z1, init as o5, FormatDateType as je, DomPosition as bt, ActionType as ze, dispose as g0, TooltipIconPosition as Qe, CandleType as s5, YAxisType as l5, registerOverlay as c5 } from "klinecharts";
function De(e, t, r) {
  const n = (e.x - t.x) * Math.cos(r) - (e.y - t.y) * Math.sin(r) + t.x, a = (e.x - t.x) * Math.sin(r) + (e.y - t.y) * Math.cos(r) + t.y;
  return { x: n, y: a };
}
function kt(e, t) {
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
      y: o1.getLinearYFromCoordinates(e[0], e[1], { x: 0, y: e[0].y })
    } : r = {
      x: t.width,
      y: o1.getLinearYFromCoordinates(e[0], e[1], { x: t.width, y: e[0].y })
    }, { coordinates: [e[0], r] };
  }
  return [];
}
function n9(e, t) {
  const r = Math.abs(e.x - t.x), n = Math.abs(e.y - t.y);
  return Math.sqrt(r * r + n * n);
}
const u5 = {
  name: "arrow",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = e[1].x > e[0].x ? 0 : 1, r = o1.getLinearSlopeIntercept(e[0], e[1]);
      let n;
      r ? n = Math.atan(r[0]) + Math.PI * t : e[1].y > e[0].y ? n = Math.PI / 2 : n = Math.PI / 2 * 3;
      const a = De({ x: e[1].x - 8, y: e[1].y + 4 }, e[1], n), l = De({ x: e[1].x - 8, y: e[1].y - 4 }, e[1], n);
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
}, d5 = {
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
      const t = n9(e[0], e[1]);
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
}, h5 = {
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
}, y5 = {
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
}, f5 = {
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
}, C5 = {
  name: "fibonacciCircle",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = Math.abs(e[0].x - e[1].x), r = Math.abs(e[0].y - e[1].y), n = Math.sqrt(t * t + r * r), a = [0.236, 0.382, 0.5, 0.618, 0.786, 1], l = [], u = [];
      return a.forEach((c) => {
        const g = n * c;
        l.push(
          { ...e[0], r: g }
        ), u.push({
          x: e[0].x,
          y: e[0].y + g + 6,
          text: `${(c * 100).toFixed(1)}%`
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
          attrs: u
        }
      ];
    }
    return [];
  }
}, g5 = {
  name: "fibonacciSegment",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: r }) => {
    const n = [], a = [];
    if (e.length > 1) {
      const l = e[1].x > e[0].x ? e[0].x : e[1].x, u = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0], c = e[0].y - e[1].y, g = t.points, $ = g[0].value - g[1].value;
      u.forEach((f) => {
        const L = e[1].y + c * f, x = (g[1].value + $ * f).toFixed(r.price);
        n.push({ coordinates: [{ x: e[0].x, y: L }, { x: e[1].x, y: L }] }), a.push({
          x: l,
          y: L,
          text: `${x} (${(f * 100).toFixed(1)}%)`,
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
}, m5 = {
  name: "fibonacciSpiral",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, bounding: t }) => {
    if (e.length > 1) {
      const r = n9(e[0], e[1]) / Math.sqrt(24), n = e[1].x > e[0].x ? 0 : 1, a = o1.getLinearSlopeIntercept(e[0], e[1]);
      let l;
      a ? l = Math.atan(a[0]) + Math.PI * n : e[1].y > e[0].y ? l = Math.PI / 2 : l = Math.PI / 2 * 3;
      const u = De(
        { x: e[0].x - r, y: e[0].y },
        e[0],
        l
      ), c = De(
        { x: e[0].x - r, y: e[0].y - r },
        e[0],
        l
      ), g = [{
        ...u,
        r,
        startAngle: l,
        endAngle: l + Math.PI / 2
      }, {
        ...c,
        r: r * 2,
        startAngle: l + Math.PI / 2,
        endAngle: l + Math.PI
      }];
      let $ = e[0].x - r, f = e[0].y - r;
      for (let L = 2; L < 9; L++) {
        const x = g[L - 2].r + g[L - 1].r;
        let S = 0;
        switch (L % 4) {
          case 0: {
            S = l, $ -= g[L - 2].r;
            break;
          }
          case 1: {
            S = l + Math.PI / 2, f -= g[L - 2].r;
            break;
          }
          case 2: {
            S = l + Math.PI, $ += g[L - 2].r;
            break;
          }
          case 3: {
            S = l + Math.PI / 2 * 3, f += g[L - 2].r;
            break;
          }
        }
        const P = S + Math.PI / 2, O = De({ x: $, y: f }, e[0], l);
        g.push({
          ...O,
          r: x,
          startAngle: S,
          endAngle: P
        });
      }
      return [
        {
          type: "arc",
          attrs: g
        },
        {
          type: "line",
          attrs: kt(e, t)
        }
      ];
    }
    return [];
  }
}, p5 = {
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
      const l = e[1].x > e[0].x ? -38 : 4, u = e[1].y > e[0].y ? -2 : 20, c = e[1].x - e[0].x, g = e[1].y - e[0].y;
      [1, 0.75, 0.618, 0.5, 0.382, 0.25, 0].forEach((f) => {
        const L = e[1].x - c * f, x = e[1].y - g * f;
        r.push({ coordinates: [{ x: L, y: e[0].y }, { x: L, y: e[1].y }] }), r.push({ coordinates: [{ x: e[0].x, y: x }, { x: e[1].x, y: x }] }), n = n.concat(kt([e[0], { x: L, y: e[1].y }], t)), n = n.concat(kt([e[0], { x: e[1].x, y: x }], t)), a.unshift({
          x: e[0].x + l,
          y: x + 10,
          text: `${f.toFixed(3)}`
        }), a.unshift({
          x: L - 18,
          y: e[0].y + u,
          text: `${f.toFixed(3)}`
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
}, v5 = {
  name: "fibonacciExtension",
  totalStep: 4,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: r }) => {
    const n = [], a = [];
    if (e.length > 2) {
      const l = t.points, u = l[1].value - l[0].value, c = e[1].y - e[0].y, g = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1], $ = e[2].x > e[1].x ? e[1].x : e[2].x;
      g.forEach((f) => {
        const L = e[2].y + c * f, x = (l[2].value + u * f).toFixed(r.price);
        n.push({ coordinates: [{ x: e[1].x, y: L }, { x: e[2].x, y: L }] }), a.push({
          x: $,
          y: L,
          text: `${x} (${(f * 100).toFixed(1)}%)`,
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
}, b5 = {
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
}, $5 = {
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
}, _5 = {
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
}, L5 = {
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
}, k5 = {
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
}, x5 = {
  name: "abcd",
  totalStep: 5,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    let t = [], r = [];
    const n = ["A", "B", "C", "D"], a = e.map((l, u) => ({
      ...l,
      baseline: "bottom",
      text: `(${n[u]})`
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
}, A5 = {
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
    const r = [], n = [], a = ["X", "A", "B", "C", "D"], l = e.map((u, c) => ({
      ...u,
      baseline: "bottom",
      text: `(${a[c]})`
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
}, w5 = [
  u5,
  d5,
  h5,
  f5,
  y5,
  C5,
  g5,
  m5,
  p5,
  v5,
  b5,
  $5,
  _5,
  L5,
  k5,
  x5,
  A5
];
class Ph {
  constructor(t) {
    Oe(this, "_apiKey");
    Oe(this, "_prevSymbolMarket");
    Oe(this, "_ws");
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
    return await ((await (await fetch(`https://api.polygon.io/v2/aggs/ticker/${t.ticker}/range/${r.multiplier}/${r.timespan}/${n}/${a}?apiKey=${this._apiKey}`)).json()).results || []).map((c) => ({
      timestamp: c.t,
      open: c.o,
      high: c.h,
      low: c.l,
      close: c.c,
      volume: c.v,
      turnover: c.vw
    }));
  }
  subscribe(t, r, n) {
    var a, l;
    this._prevSymbolMarket !== t.market ? ((a = this._ws) == null || a.close(), this._ws = new WebSocket(`wss://delayed.polygon.io/${t.market}`), this._ws.onopen = () => {
      var u;
      (u = this._ws) == null || u.send(JSON.stringify({ action: "auth", params: this._apiKey }));
    }, this._ws.onmessage = (u) => {
      var g;
      const c = JSON.parse(u.data);
      c[0].ev === "status" ? c[0].status === "auth_success" && ((g = this._ws) == null || g.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` }))) : "sym" in c && n({
        timestamp: c.s,
        open: c.o,
        high: c.h,
        low: c.l,
        close: c.c,
        volume: c.v,
        turnover: c.vw
      });
    }) : (l = this._ws) == null || l.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` })), this._prevSymbolMarket = t.market;
  }
  unsubscribe(t, r) {
  }
}
const C1 = {};
function M5(e) {
  C1.context = e;
}
const S5 = (e, t) => e === t, xt = Symbol("solid-proxy"), T5 = Symbol("solid-track"), Ye = {
  equals: S5
};
let i9 = l9;
const H1 = 1, qe = 2, a9 = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, $t = {};
var d1 = null;
let ee = null, n1 = null, p1 = null, R1 = null, Dt = 0;
function Ne(e, t) {
  const r = n1, n = d1, a = e.length === 0, l = a ? a9 : {
    owned: null,
    cleanups: null,
    context: null,
    owner: t === void 0 ? n : t
  }, u = a ? e : () => e(() => V1(() => it(l)));
  d1 = l, n1 = null;
  try {
    return G1(u, !0);
  } finally {
    n1 = r, d1 = n;
  }
}
function w(e, t) {
  t = t ? Object.assign({}, Ye, t) : Ye;
  const r = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, n = (a) => (typeof a == "function" && (a = a(r.value)), s9(r, a));
  return [o9.bind(r), n];
}
function m0(e, t, r) {
  const n = nt(e, t, !0, H1);
  ye(n);
}
function B(e, t, r) {
  const n = nt(e, t, !1, H1);
  ye(n);
}
function S1(e, t, r) {
  i9 = E5;
  const n = nt(e, t, !1, H1);
  n.user = !0, R1 ? R1.push(n) : ye(n);
}
function Y(e, t, r) {
  r = r ? Object.assign({}, Ye, r) : Ye;
  const n = nt(e, t, !0, 0);
  return n.observers = null, n.observerSlots = null, n.comparator = r.equals || void 0, ye(n), o9.bind(n);
}
function P5(e, t, r) {
  let n, a, l;
  arguments.length === 2 && typeof t == "object" || arguments.length === 1 ? (n = !0, a = e, l = t || {}) : (n = e, a = t, l = r || {});
  let u = null, c = $t, g = null, $ = !1, f = "initialValue" in l, L = typeof n == "function" && Y(n);
  const x = /* @__PURE__ */ new Set(), [S, P] = (l.storage || w)(l.initialValue), [O, H] = w(void 0), [Q, E] = w(void 0, {
    equals: !1
  }), [N, K] = w(f ? "ready" : "unresolved");
  if (C1.context) {
    g = `${C1.context.id}${C1.context.count++}`;
    let j;
    l.ssrLoadFrom === "initial" ? c = l.initialValue : C1.load && (j = C1.load(g)) && (c = j[0]);
  }
  function G(j, X, R, L1) {
    return u === j && (u = null, f = !0, (j === c || X === c) && l.onHydrated && queueMicrotask(() => l.onHydrated(L1, {
      value: X
    })), c = $t, T1(X, R)), X;
  }
  function T1(j, X) {
    G1(() => {
      X === void 0 && P(() => j), K(X !== void 0 ? "errored" : "ready"), H(X);
      for (const R of x.keys())
        R.decrement();
      x.clear();
    }, !1);
  }
  function c1() {
    const j = I5, X = S(), R = O();
    if (R !== void 0 && !u)
      throw R;
    return n1 && !n1.user && j && m0(() => {
      Q(), u && (j.resolved || x.has(j) || (j.increment(), x.add(j)));
    }), X;
  }
  function P1(j = !0) {
    if (j !== !1 && $)
      return;
    $ = !1;
    const X = L ? L() : n;
    if (X == null || X === !1) {
      G(u, V1(S));
      return;
    }
    const R = c !== $t ? c : V1(() => a(X, {
      value: S(),
      refetching: j
    }));
    return typeof R != "object" || !(R && "then" in R) ? (G(u, R, void 0, X), R) : (u = R, $ = !0, queueMicrotask(() => $ = !1), G1(() => {
      K(f ? "refreshing" : "pending"), E();
    }, !1), R.then((L1) => G(R, L1, void 0, X), (L1) => G(R, void 0, u9(L1), X)));
  }
  return Object.defineProperties(c1, {
    state: {
      get: () => N()
    },
    error: {
      get: () => O()
    },
    loading: {
      get() {
        const j = N();
        return j === "pending" || j === "refreshing";
      }
    },
    latest: {
      get() {
        if (!f)
          return c1();
        const j = O();
        if (j && !u)
          throw j;
        return S();
      }
    }
  }), L ? m0(() => P1(!1)) : P1(!1), [c1, {
    refetch: P1,
    mutate: P
  }];
}
function V1(e) {
  if (n1 === null)
    return e();
  const t = n1;
  n1 = null;
  try {
    return e();
  } finally {
    n1 = t;
  }
}
function Nt(e) {
  S1(() => V1(e));
}
function re(e) {
  return d1 === null || (d1.cleanups === null ? d1.cleanups = [e] : d1.cleanups.push(e)), e;
}
function O5(e) {
  const t = n1, r = d1;
  return Promise.resolve().then(() => {
    n1 = t, d1 = r;
    let n;
    return G1(e, !1), n1 = d1 = null, n ? n.done : void 0;
  });
}
let I5;
function o9() {
  const e = ee;
  if (this.sources && (this.state || e))
    if (this.state === H1 || e)
      ye(this);
    else {
      const t = p1;
      p1 = null, G1(() => We(this), !1), p1 = t;
    }
  if (n1) {
    const t = this.observers ? this.observers.length : 0;
    n1.sources ? (n1.sources.push(this), n1.sourceSlots.push(t)) : (n1.sources = [this], n1.sourceSlots = [t]), this.observers ? (this.observers.push(n1), this.observerSlots.push(n1.sources.length - 1)) : (this.observers = [n1], this.observerSlots = [n1.sources.length - 1]);
  }
  return this.value;
}
function s9(e, t, r) {
  let n = e.value;
  return (!e.comparator || !e.comparator(n, t)) && (e.value = t, e.observers && e.observers.length && G1(() => {
    for (let a = 0; a < e.observers.length; a += 1) {
      const l = e.observers[a], u = ee && ee.running;
      u && ee.disposed.has(l), (u && !l.tState || !u && !l.state) && (l.pure ? p1.push(l) : R1.push(l), l.observers && c9(l)), u || (l.state = H1);
    }
    if (p1.length > 1e6)
      throw p1 = [], new Error();
  }, !1)), t;
}
function ye(e) {
  if (!e.fn)
    return;
  it(e);
  const t = d1, r = n1, n = Dt;
  n1 = d1 = e, D5(e, e.value, n), n1 = r, d1 = t;
}
function D5(e, t, r) {
  let n;
  try {
    n = e.fn(t);
  } catch (a) {
    e.pure && (e.state = H1, e.owned && e.owned.forEach(it), e.owned = null), d9(a);
  }
  (!e.updatedAt || e.updatedAt <= r) && (e.updatedAt != null && "observers" in e ? s9(e, n) : e.value = n, e.updatedAt = r);
}
function nt(e, t, r, n = H1, a) {
  const l = {
    fn: e,
    state: n,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: d1,
    context: null,
    pure: r
  };
  return d1 === null || d1 !== a9 && (d1.owned ? d1.owned.push(l) : d1.owned = [l]), l;
}
function Ge(e) {
  const t = ee;
  if (e.state === 0 || t)
    return;
  if (e.state === qe || t)
    return We(e);
  if (e.suspense && V1(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const r = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < Dt); )
    (e.state || t) && r.push(e);
  for (let n = r.length - 1; n >= 0; n--)
    if (e = r[n], e.state === H1 || t)
      ye(e);
    else if (e.state === qe || t) {
      const a = p1;
      p1 = null, G1(() => We(e, r[0]), !1), p1 = a;
    }
}
function G1(e, t) {
  if (p1)
    return e();
  let r = !1;
  t || (p1 = []), R1 ? r = !0 : R1 = [], Dt++;
  try {
    const n = e();
    return N5(r), n;
  } catch (n) {
    r || (R1 = null), p1 = null, d9(n);
  }
}
function N5(e) {
  if (p1 && (l9(p1), p1 = null), e)
    return;
  const t = R1;
  R1 = null, t.length && G1(() => i9(t), !1);
}
function l9(e) {
  for (let t = 0; t < e.length; t++)
    Ge(e[t]);
}
function E5(e) {
  let t, r = 0;
  for (t = 0; t < e.length; t++) {
    const n = e[t];
    n.user ? e[r++] = n : Ge(n);
  }
  for (C1.context && M5(), t = 0; t < r; t++)
    Ge(e[t]);
}
function We(e, t) {
  const r = ee;
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
    const a = e.sources[n];
    a.sources && (a.state === H1 || r ? a !== t && Ge(a) : (a.state === qe || r) && We(a, t));
  }
}
function c9(e) {
  const t = ee;
  for (let r = 0; r < e.observers.length; r += 1) {
    const n = e.observers[r];
    (!n.state || t) && (n.state = qe, n.pure ? p1.push(n) : R1.push(n), n.observers && c9(n));
  }
}
function it(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const r = e.sources.pop(), n = e.sourceSlots.pop(), a = r.observers;
      if (a && a.length) {
        const l = a.pop(), u = r.observerSlots.pop();
        n < a.length && (l.sourceSlots[u] = n, a[n] = l, r.observerSlots[n] = u);
      }
    }
  if (e.owned) {
    for (t = 0; t < e.owned.length; t++)
      it(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = 0; t < e.cleanups.length; t++)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function u9(e) {
  return e instanceof Error || typeof e == "string" ? e : new Error("Unknown error");
}
function d9(e) {
  throw e = u9(e), e;
}
const B5 = Symbol("fallback");
function p0(e) {
  for (let t = 0; t < e.length; t++)
    e[t]();
}
function U5(e, t, r = {}) {
  let n = [], a = [], l = [], u = 0, c = t.length > 1 ? [] : null;
  return re(() => p0(l)), () => {
    let g = e() || [], $, f;
    return g[T5], V1(() => {
      let x = g.length, S, P, O, H, Q, E, N, K, G;
      if (x === 0)
        u !== 0 && (p0(l), l = [], n = [], a = [], u = 0, c && (c = [])), r.fallback && (n = [B5], a[0] = Ne((T1) => (l[0] = T1, r.fallback())), u = 1);
      else if (u === 0) {
        for (a = new Array(x), f = 0; f < x; f++)
          n[f] = g[f], a[f] = Ne(L);
        u = x;
      } else {
        for (O = new Array(x), H = new Array(x), c && (Q = new Array(x)), E = 0, N = Math.min(u, x); E < N && n[E] === g[E]; E++)
          ;
        for (N = u - 1, K = x - 1; N >= E && K >= E && n[N] === g[K]; N--, K--)
          O[K] = a[N], H[K] = l[N], c && (Q[K] = c[N]);
        for (S = /* @__PURE__ */ new Map(), P = new Array(K + 1), f = K; f >= E; f--)
          G = g[f], $ = S.get(G), P[f] = $ === void 0 ? -1 : $, S.set(G, f);
        for ($ = E; $ <= N; $++)
          G = n[$], f = S.get(G), f !== void 0 && f !== -1 ? (O[f] = a[$], H[f] = l[$], c && (Q[f] = c[$]), f = P[f], S.set(G, f)) : l[$]();
        for (f = E; f < x; f++)
          f in O ? (a[f] = O[f], l[f] = H[f], c && (c[f] = Q[f], c[f](f))) : a[f] = Ne(L);
        a = a.slice(0, u = x), n = g.slice(0);
      }
      return a;
    });
    function L(x) {
      if (l[f] = x, c) {
        const [S, P] = w(f);
        return c[f] = P, t(g[f], S);
      }
      return t(g[f]);
    }
  };
}
function k(e, t) {
  return V1(() => e(t || {}));
}
function Ze() {
  return !0;
}
const F5 = {
  get(e, t, r) {
    return t === xt ? r : e.get(t);
  },
  has(e, t) {
    return t === xt ? !0 : e.has(t);
  },
  set: Ze,
  deleteProperty: Ze,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: Ze,
      deleteProperty: Ze
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function _t(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function h9(...e) {
  let t = !1;
  for (let n = 0; n < e.length; n++) {
    const a = e[n];
    t = t || !!a && xt in a, e[n] = typeof a == "function" ? (t = !0, Y(a)) : a;
  }
  if (t)
    return new Proxy({
      get(n) {
        for (let a = e.length - 1; a >= 0; a--) {
          const l = _t(e[a])[n];
          if (l !== void 0)
            return l;
        }
      },
      has(n) {
        for (let a = e.length - 1; a >= 0; a--)
          if (n in _t(e[a]))
            return !0;
        return !1;
      },
      keys() {
        const n = [];
        for (let a = 0; a < e.length; a++)
          n.push(...Object.keys(_t(e[a])));
        return [...new Set(n)];
      }
    }, F5);
  const r = {};
  for (let n = e.length - 1; n >= 0; n--)
    if (e[n]) {
      const a = Object.getOwnPropertyDescriptors(e[n]);
      for (const l in a)
        l in r || Object.defineProperty(r, l, {
          enumerable: !0,
          get() {
            for (let u = e.length - 1; u >= 0; u--) {
              const c = (e[u] || {})[l];
              if (c !== void 0)
                return c;
            }
          }
        });
    }
  return r;
}
function At(e) {
  const t = "fallback" in e && {
    fallback: () => e.fallback
  };
  return Y(U5(() => e.each, e.children, t || void 0));
}
function z(e) {
  let t = !1;
  const r = e.keyed, n = Y(() => e.when, void 0, {
    equals: (a, l) => t ? a === l : !a == !l
  });
  return Y(() => {
    const a = n();
    if (a) {
      const l = e.children, u = typeof l == "function" && l.length > 0;
      return t = r || u, u ? V1(() => l(a)) : l;
    }
    return e.fallback;
  }, void 0, void 0);
}
function K5(e, t, r) {
  let n = r.length, a = t.length, l = n, u = 0, c = 0, g = t[a - 1].nextSibling, $ = null;
  for (; u < a || c < l; ) {
    if (t[u] === r[c]) {
      u++, c++;
      continue;
    }
    for (; t[a - 1] === r[l - 1]; )
      a--, l--;
    if (a === u) {
      const f = l < n ? c ? r[c - 1].nextSibling : r[l - c] : g;
      for (; c < l; )
        e.insertBefore(r[c++], f);
    } else if (l === c)
      for (; u < a; )
        (!$ || !$.has(t[u])) && t[u].remove(), u++;
    else if (t[u] === r[l - 1] && r[c] === t[a - 1]) {
      const f = t[--a].nextSibling;
      e.insertBefore(r[c++], t[u++].nextSibling), e.insertBefore(r[--l], f), t[a] = r[l];
    } else {
      if (!$) {
        $ = /* @__PURE__ */ new Map();
        let L = c;
        for (; L < l; )
          $.set(r[L], L++);
      }
      const f = $.get(t[u]);
      if (f != null)
        if (c < f && f < l) {
          let L = u, x = 1, S;
          for (; ++L < a && L < l && !((S = $.get(t[L])) == null || S !== f + x); )
            x++;
          if (x > f - c) {
            const P = t[u];
            for (; c < f; )
              e.insertBefore(r[c++], P);
          } else
            e.replaceChild(r[c++], t[u++]);
        } else
          u++;
      else
        t[u++].remove();
    }
  }
}
const v0 = "_$DX_DELEGATE";
function j5(e, t, r, n = {}) {
  let a;
  return Ne((l) => {
    a = l, t === document ? e() : _(t, e(), t.firstChild ? null : void 0, r);
  }, n.owner), () => {
    a(), t.textContent = "";
  };
}
function b(e, t, r) {
  const n = document.createElement("template");
  n.innerHTML = e;
  let a = n.content.firstChild;
  return r && (a = a.firstChild), a;
}
function F1(e, t = window.document) {
  const r = t[v0] || (t[v0] = /* @__PURE__ */ new Set());
  for (let n = 0, a = e.length; n < a; n++) {
    const l = e[n];
    r.has(l) || (r.add(l), t.addEventListener(l, z5));
  }
}
function v1(e, t, r) {
  r == null ? e.removeAttribute(t) : e.setAttribute(t, r);
}
function h1(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function q1(e, t, r, n) {
  if (n)
    Array.isArray(r) ? (e[`$$${t}`] = r[0], e[`$$${t}Data`] = r[1]) : e[`$$${t}`] = r;
  else if (Array.isArray(r)) {
    const a = r[0];
    e.addEventListener(t, r[0] = (l) => a.call(e, r[1], l));
  } else
    e.addEventListener(t, r);
}
function ne(e, t, r) {
  if (!t)
    return r ? v1(e, "style") : t;
  const n = e.style;
  if (typeof t == "string")
    return n.cssText = t;
  typeof r == "string" && (n.cssText = r = void 0), r || (r = {}), t || (t = {});
  let a, l;
  for (l in r)
    t[l] == null && n.removeProperty(l), delete r[l];
  for (l in t)
    a = t[l], a !== r[l] && (n.setProperty(l, a), r[l] = a);
  return r;
}
function te(e, t, r) {
  return V1(() => e(t, r));
}
function _(e, t, r, n) {
  if (r !== void 0 && !n && (n = []), typeof t != "function")
    return Xe(e, t, n, r);
  B((a) => Xe(e, t(), a, r), n);
}
function z5(e) {
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
  }), C1.registry && !C1.done && (C1.done = !0, document.querySelectorAll("[id^=pl-]").forEach((n) => {
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
function Xe(e, t, r, n, a) {
  for (C1.context && !r && (r = [...e.childNodes]); typeof r == "function"; )
    r = r();
  if (t === r)
    return r;
  const l = typeof t, u = n !== void 0;
  if (e = u && r[0] && r[0].parentNode || e, l === "string" || l === "number") {
    if (C1.context)
      return r;
    if (l === "number" && (t = t.toString()), u) {
      let c = r[0];
      c && c.nodeType === 3 ? c.data = t : c = document.createTextNode(t), r = he(e, r, n, c);
    } else
      r !== "" && typeof r == "string" ? r = e.firstChild.data = t : r = e.textContent = t;
  } else if (t == null || l === "boolean") {
    if (C1.context)
      return r;
    r = he(e, r, n);
  } else {
    if (l === "function")
      return B(() => {
        let c = t();
        for (; typeof c == "function"; )
          c = c();
        r = Xe(e, c, r, n);
      }), () => r;
    if (Array.isArray(t)) {
      const c = [], g = r && Array.isArray(r);
      if (wt(c, t, r, a))
        return B(() => r = Xe(e, c, r, n, !0)), () => r;
      if (C1.context) {
        if (!c.length)
          return r;
        for (let $ = 0; $ < c.length; $++)
          if (c[$].parentNode)
            return r = c;
      }
      if (c.length === 0) {
        if (r = he(e, r, n), u)
          return r;
      } else
        g ? r.length === 0 ? b0(e, c, n) : K5(e, r, c) : (r && he(e), b0(e, c));
      r = c;
    } else if (t instanceof Node) {
      if (C1.context && t.parentNode)
        return r = u ? [t] : t;
      if (Array.isArray(r)) {
        if (u)
          return r = he(e, r, n, t);
        he(e, r, null, t);
      } else
        r == null || r === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      r = t;
    }
  }
  return r;
}
function wt(e, t, r, n) {
  let a = !1;
  for (let l = 0, u = t.length; l < u; l++) {
    let c = t[l], g = r && r[l];
    if (c instanceof Node)
      e.push(c);
    else if (!(c == null || c === !0 || c === !1))
      if (Array.isArray(c))
        a = wt(e, c, g) || a;
      else if (typeof c == "function")
        if (n) {
          for (; typeof c == "function"; )
            c = c();
          a = wt(e, Array.isArray(c) ? c : [c], Array.isArray(g) ? g : [g]) || a;
        } else
          e.push(c), a = !0;
      else {
        const $ = String(c);
        g && g.nodeType === 3 && g.data === $ ? e.push(g) : e.push(document.createTextNode($));
      }
  }
  return a;
}
function b0(e, t, r = null) {
  for (let n = 0, a = t.length; n < a; n++)
    e.insertBefore(t[n], r);
}
function he(e, t, r, n) {
  if (r === void 0)
    return e.textContent = "";
  const a = n || document.createTextNode("");
  if (t.length) {
    let l = !1;
    for (let u = t.length - 1; u >= 0; u--) {
      const c = t[u];
      if (a !== c) {
        const g = c.parentNode === e;
        !l && !u ? g ? e.replaceChild(a, c) : e.insertBefore(a, r) : g && c.remove();
      } else
        l = !0;
    }
  } else
    e.insertBefore(a, r);
  return [a];
}
const Q5 = "http://www.w3.org/2000/svg";
function Z5(e, t = !1) {
  return t ? document.createElementNS(Q5, e) : document.createElement(e);
}
function R5(e) {
  const {
    useShadow: t
  } = e, r = document.createTextNode(""), n = e.mount || document.body;
  function a() {
    if (C1.context) {
      const [l, u] = w(!1);
      return queueMicrotask(() => u(!0)), () => l() && e.children;
    } else
      return () => e.children;
  }
  if (n instanceof HTMLHeadElement) {
    const [l, u] = w(!1), c = () => u(!0);
    Ne((g) => _(n, () => l() ? g() : a()(), null)), re(() => {
      C1.context ? queueMicrotask(c) : c();
    });
  } else {
    const l = Z5(e.isSVG ? "g" : "div", e.isSVG), u = t && l.attachShadow ? l.attachShadow({
      mode: "open"
    }) : l;
    Object.defineProperty(l, "_$host", {
      get() {
        return r.parentNode;
      },
      configurable: !0
    }), _(u, a()), n.appendChild(l), e.ref && e.ref(l), re(() => n.removeChild(l));
  }
  return r;
}
var Re = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function y9(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var V5 = typeof Re == "object" && Re && Re.Object === Object && Re, f9 = V5, H5 = f9, Y5 = typeof self == "object" && self && self.Object === Object && self, q5 = H5 || Y5 || Function("return this")(), z1 = q5, G5 = z1, W5 = G5.Symbol, at = W5, $0 = at, C9 = Object.prototype, X5 = C9.hasOwnProperty, J5 = C9.toString, Ie = $0 ? $0.toStringTag : void 0;
function e6(e) {
  var t = X5.call(e, Ie), r = e[Ie];
  try {
    e[Ie] = void 0;
    var n = !0;
  } catch {
  }
  var a = J5.call(e);
  return n && (t ? e[Ie] = r : delete e[Ie]), a;
}
var t6 = e6, r6 = Object.prototype, n6 = r6.toString;
function i6(e) {
  return n6.call(e);
}
var a6 = i6, _0 = at, o6 = t6, s6 = a6, l6 = "[object Null]", c6 = "[object Undefined]", L0 = _0 ? _0.toStringTag : void 0;
function u6(e) {
  return e == null ? e === void 0 ? c6 : l6 : L0 && L0 in Object(e) ? o6(e) : s6(e);
}
var Ee = u6;
function d6(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var fe = d6, h6 = Ee, y6 = fe, f6 = "[object AsyncFunction]", C6 = "[object Function]", g6 = "[object GeneratorFunction]", m6 = "[object Proxy]";
function p6(e) {
  if (!y6(e))
    return !1;
  var t = h6(e);
  return t == C6 || t == g6 || t == f6 || t == m6;
}
var g9 = p6, v6 = z1, b6 = v6["__core-js_shared__"], $6 = b6, Lt = $6, k0 = function() {
  var e = /[^.]+$/.exec(Lt && Lt.keys && Lt.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function _6(e) {
  return !!k0 && k0 in e;
}
var L6 = _6, k6 = Function.prototype, x6 = k6.toString;
function A6(e) {
  if (e != null) {
    try {
      return x6.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var m9 = A6, w6 = g9, M6 = L6, S6 = fe, T6 = m9, P6 = /[\\^$.*+?()[\]{}|]/g, O6 = /^\[object .+?Constructor\]$/, I6 = Function.prototype, D6 = Object.prototype, N6 = I6.toString, E6 = D6.hasOwnProperty, B6 = RegExp(
  "^" + N6.call(E6).replace(P6, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function U6(e) {
  if (!S6(e) || M6(e))
    return !1;
  var t = w6(e) ? B6 : O6;
  return t.test(T6(e));
}
var F6 = U6;
function K6(e, t) {
  return e == null ? void 0 : e[t];
}
var j6 = K6, z6 = F6, Q6 = j6;
function Z6(e, t) {
  var r = Q6(e, t);
  return z6(r) ? r : void 0;
}
var ie = Z6, R6 = ie, V6 = function() {
  try {
    var e = R6(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), H6 = V6, x0 = H6;
function Y6(e, t, r) {
  t == "__proto__" && x0 ? x0(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var p9 = Y6;
function q6(e, t) {
  return e === t || e !== e && t !== t;
}
var v9 = q6, G6 = p9, W6 = v9, X6 = Object.prototype, J6 = X6.hasOwnProperty;
function e2(e, t, r) {
  var n = e[t];
  (!(J6.call(e, t) && W6(n, r)) || r === void 0 && !(t in e)) && G6(e, t, r);
}
var Et = e2, t2 = Array.isArray, Ce = t2;
function r2(e) {
  return e != null && typeof e == "object";
}
var ge = r2, n2 = Ee, i2 = ge, a2 = "[object Symbol]";
function o2(e) {
  return typeof e == "symbol" || i2(e) && n2(e) == a2;
}
var Bt = o2, s2 = Ce, l2 = Bt, c2 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, u2 = /^\w*$/;
function d2(e, t) {
  if (s2(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || l2(e) ? !0 : u2.test(e) || !c2.test(e) || t != null && e in Object(t);
}
var h2 = d2, y2 = ie, f2 = y2(Object, "create"), ot = f2, A0 = ot;
function C2() {
  this.__data__ = A0 ? A0(null) : {}, this.size = 0;
}
var g2 = C2;
function m2(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var p2 = m2, v2 = ot, b2 = "__lodash_hash_undefined__", $2 = Object.prototype, _2 = $2.hasOwnProperty;
function L2(e) {
  var t = this.__data__;
  if (v2) {
    var r = t[e];
    return r === b2 ? void 0 : r;
  }
  return _2.call(t, e) ? t[e] : void 0;
}
var k2 = L2, x2 = ot, A2 = Object.prototype, w2 = A2.hasOwnProperty;
function M2(e) {
  var t = this.__data__;
  return x2 ? t[e] !== void 0 : w2.call(t, e);
}
var S2 = M2, T2 = ot, P2 = "__lodash_hash_undefined__";
function O2(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = T2 && t === void 0 ? P2 : t, this;
}
var I2 = O2, D2 = g2, N2 = p2, E2 = k2, B2 = S2, U2 = I2;
function me(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
me.prototype.clear = D2;
me.prototype.delete = N2;
me.prototype.get = E2;
me.prototype.has = B2;
me.prototype.set = U2;
var F2 = me;
function K2() {
  this.__data__ = [], this.size = 0;
}
var j2 = K2, z2 = v9;
function Q2(e, t) {
  for (var r = e.length; r--; )
    if (z2(e[r][0], t))
      return r;
  return -1;
}
var st = Q2, Z2 = st, R2 = Array.prototype, V2 = R2.splice;
function H2(e) {
  var t = this.__data__, r = Z2(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : V2.call(t, r, 1), --this.size, !0;
}
var Y2 = H2, q2 = st;
function G2(e) {
  var t = this.__data__, r = q2(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var W2 = G2, X2 = st;
function J2(e) {
  return X2(this.__data__, e) > -1;
}
var e3 = J2, t3 = st;
function r3(e, t) {
  var r = this.__data__, n = t3(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
var n3 = r3, i3 = j2, a3 = Y2, o3 = W2, s3 = e3, l3 = n3;
function pe(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
pe.prototype.clear = i3;
pe.prototype.delete = a3;
pe.prototype.get = o3;
pe.prototype.has = s3;
pe.prototype.set = l3;
var lt = pe, c3 = ie, u3 = z1, d3 = c3(u3, "Map"), Ut = d3, w0 = F2, h3 = lt, y3 = Ut;
function f3() {
  this.size = 0, this.__data__ = {
    hash: new w0(),
    map: new (y3 || h3)(),
    string: new w0()
  };
}
var C3 = f3;
function g3(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var m3 = g3, p3 = m3;
function v3(e, t) {
  var r = e.__data__;
  return p3(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var ct = v3, b3 = ct;
function $3(e) {
  var t = b3(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var _3 = $3, L3 = ct;
function k3(e) {
  return L3(this, e).get(e);
}
var x3 = k3, A3 = ct;
function w3(e) {
  return A3(this, e).has(e);
}
var M3 = w3, S3 = ct;
function T3(e, t) {
  var r = S3(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
var P3 = T3, O3 = C3, I3 = _3, D3 = x3, N3 = M3, E3 = P3;
function ve(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
ve.prototype.clear = O3;
ve.prototype.delete = I3;
ve.prototype.get = D3;
ve.prototype.has = N3;
ve.prototype.set = E3;
var b9 = ve, $9 = b9, B3 = "Expected a function";
function Ft(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(B3);
  var r = function() {
    var n = arguments, a = t ? t.apply(this, n) : n[0], l = r.cache;
    if (l.has(a))
      return l.get(a);
    var u = e.apply(this, n);
    return r.cache = l.set(a, u) || l, u;
  };
  return r.cache = new (Ft.Cache || $9)(), r;
}
Ft.Cache = $9;
var U3 = Ft, F3 = U3, K3 = 500;
function j3(e) {
  var t = F3(e, function(n) {
    return r.size === K3 && r.clear(), n;
  }), r = t.cache;
  return t;
}
var z3 = j3, Q3 = z3, Z3 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, R3 = /\\(\\)?/g, V3 = Q3(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(Z3, function(r, n, a, l) {
    t.push(a ? l.replace(R3, "$1") : n || r);
  }), t;
}), H3 = V3;
function Y3(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, a = Array(n); ++r < n; )
    a[r] = t(e[r], r, e);
  return a;
}
var q3 = Y3, M0 = at, G3 = q3, W3 = Ce, X3 = Bt, J3 = 1 / 0, S0 = M0 ? M0.prototype : void 0, T0 = S0 ? S0.toString : void 0;
function _9(e) {
  if (typeof e == "string")
    return e;
  if (W3(e))
    return G3(e, _9) + "";
  if (X3(e))
    return T0 ? T0.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -J3 ? "-0" : t;
}
var er = _9, tr = er;
function rr(e) {
  return e == null ? "" : tr(e);
}
var nr = rr, ir = Ce, ar = h2, or = H3, sr = nr;
function lr(e, t) {
  return ir(e) ? e : ar(e, t) ? [e] : or(sr(e));
}
var cr = lr, ur = 9007199254740991, dr = /^(?:0|[1-9]\d*)$/;
function hr(e, t) {
  var r = typeof e;
  return t = t ?? ur, !!t && (r == "number" || r != "symbol" && dr.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var L9 = hr, yr = Bt, fr = 1 / 0;
function Cr(e) {
  if (typeof e == "string" || yr(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -fr ? "-0" : t;
}
var gr = Cr, mr = Et, pr = cr, vr = L9, P0 = fe, br = gr;
function $r(e, t, r, n) {
  if (!P0(e))
    return e;
  t = pr(t, e);
  for (var a = -1, l = t.length, u = l - 1, c = e; c != null && ++a < l; ) {
    var g = br(t[a]), $ = r;
    if (g === "__proto__" || g === "constructor" || g === "prototype")
      return e;
    if (a != u) {
      var f = c[g];
      $ = n ? n(f, g, c) : void 0, $ === void 0 && ($ = P0(f) ? f : vr(t[a + 1]) ? [] : {});
    }
    mr(c, g, $), c = c[g];
  }
  return e;
}
var _r = $r, Lr = _r;
function kr(e, t, r) {
  return e == null ? e : Lr(e, t, r);
}
var xr = kr;
const Mt = /* @__PURE__ */ y9(xr);
var Ar = lt;
function wr() {
  this.__data__ = new Ar(), this.size = 0;
}
var Mr = wr;
function Sr(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
var Tr = Sr;
function Pr(e) {
  return this.__data__.get(e);
}
var Or = Pr;
function Ir(e) {
  return this.__data__.has(e);
}
var Dr = Ir, Nr = lt, Er = Ut, Br = b9, Ur = 200;
function Fr(e, t) {
  var r = this.__data__;
  if (r instanceof Nr) {
    var n = r.__data__;
    if (!Er || n.length < Ur - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new Br(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
var Kr = Fr, jr = lt, zr = Mr, Qr = Tr, Zr = Or, Rr = Dr, Vr = Kr;
function be(e) {
  var t = this.__data__ = new jr(e);
  this.size = t.size;
}
be.prototype.clear = zr;
be.prototype.delete = Qr;
be.prototype.get = Zr;
be.prototype.has = Rr;
be.prototype.set = Vr;
var Hr = be;
function Yr(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var qr = Yr, Gr = Et, Wr = p9;
function Xr(e, t, r, n) {
  var a = !r;
  r || (r = {});
  for (var l = -1, u = t.length; ++l < u; ) {
    var c = t[l], g = n ? n(r[c], e[c], c, r, e) : void 0;
    g === void 0 && (g = e[c]), a ? Wr(r, c, g) : Gr(r, c, g);
  }
  return r;
}
var ut = Xr;
function Jr(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var en = Jr, tn = Ee, rn = ge, nn = "[object Arguments]";
function an(e) {
  return rn(e) && tn(e) == nn;
}
var on = an, O0 = on, sn = ge, k9 = Object.prototype, ln = k9.hasOwnProperty, cn = k9.propertyIsEnumerable, un = O0(function() {
  return arguments;
}()) ? O0 : function(e) {
  return sn(e) && ln.call(e, "callee") && !cn.call(e, "callee");
}, dn = un, Je = { exports: {} };
function hn() {
  return !1;
}
var yn = hn;
Je.exports;
(function(e, t) {
  var r = z1, n = yn, a = t && !t.nodeType && t, l = a && !0 && e && !e.nodeType && e, u = l && l.exports === a, c = u ? r.Buffer : void 0, g = c ? c.isBuffer : void 0, $ = g || n;
  e.exports = $;
})(Je, Je.exports);
var x9 = Je.exports, fn = 9007199254740991;
function Cn(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= fn;
}
var A9 = Cn, gn = Ee, mn = A9, pn = ge, vn = "[object Arguments]", bn = "[object Array]", $n = "[object Boolean]", _n = "[object Date]", Ln = "[object Error]", kn = "[object Function]", xn = "[object Map]", An = "[object Number]", wn = "[object Object]", Mn = "[object RegExp]", Sn = "[object Set]", Tn = "[object String]", Pn = "[object WeakMap]", On = "[object ArrayBuffer]", In = "[object DataView]", Dn = "[object Float32Array]", Nn = "[object Float64Array]", En = "[object Int8Array]", Bn = "[object Int16Array]", Un = "[object Int32Array]", Fn = "[object Uint8Array]", Kn = "[object Uint8ClampedArray]", jn = "[object Uint16Array]", zn = "[object Uint32Array]", r1 = {};
r1[Dn] = r1[Nn] = r1[En] = r1[Bn] = r1[Un] = r1[Fn] = r1[Kn] = r1[jn] = r1[zn] = !0;
r1[vn] = r1[bn] = r1[On] = r1[$n] = r1[In] = r1[_n] = r1[Ln] = r1[kn] = r1[xn] = r1[An] = r1[wn] = r1[Mn] = r1[Sn] = r1[Tn] = r1[Pn] = !1;
function Qn(e) {
  return pn(e) && mn(e.length) && !!r1[gn(e)];
}
var Zn = Qn;
function Rn(e) {
  return function(t) {
    return e(t);
  };
}
var Kt = Rn, et = { exports: {} };
et.exports;
(function(e, t) {
  var r = f9, n = t && !t.nodeType && t, a = n && !0 && e && !e.nodeType && e, l = a && a.exports === n, u = l && r.process, c = function() {
    try {
      var g = a && a.require && a.require("util").types;
      return g || u && u.binding && u.binding("util");
    } catch {
    }
  }();
  e.exports = c;
})(et, et.exports);
var jt = et.exports, Vn = Zn, Hn = Kt, I0 = jt, D0 = I0 && I0.isTypedArray, Yn = D0 ? Hn(D0) : Vn, qn = Yn, Gn = en, Wn = dn, Xn = Ce, Jn = x9, e8 = L9, t8 = qn, r8 = Object.prototype, n8 = r8.hasOwnProperty;
function i8(e, t) {
  var r = Xn(e), n = !r && Wn(e), a = !r && !n && Jn(e), l = !r && !n && !a && t8(e), u = r || n || a || l, c = u ? Gn(e.length, String) : [], g = c.length;
  for (var $ in e)
    (t || n8.call(e, $)) && !(u && // Safari 9 has enumerable `arguments.length` in strict mode.
    ($ == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    a && ($ == "offset" || $ == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    l && ($ == "buffer" || $ == "byteLength" || $ == "byteOffset") || // Skip index properties.
    e8($, g))) && c.push($);
  return c;
}
var w9 = i8, a8 = Object.prototype;
function o8(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || a8;
  return e === r;
}
var zt = o8;
function s8(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var M9 = s8, l8 = M9, c8 = l8(Object.keys, Object), u8 = c8, d8 = zt, h8 = u8, y8 = Object.prototype, f8 = y8.hasOwnProperty;
function C8(e) {
  if (!d8(e))
    return h8(e);
  var t = [];
  for (var r in Object(e))
    f8.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
var g8 = C8, m8 = g9, p8 = A9;
function v8(e) {
  return e != null && p8(e.length) && !m8(e);
}
var S9 = v8, b8 = w9, $8 = g8, _8 = S9;
function L8(e) {
  return _8(e) ? b8(e) : $8(e);
}
var Qt = L8, k8 = ut, x8 = Qt;
function A8(e, t) {
  return e && k8(t, x8(t), e);
}
var w8 = A8;
function M8(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var S8 = M8, T8 = fe, P8 = zt, O8 = S8, I8 = Object.prototype, D8 = I8.hasOwnProperty;
function N8(e) {
  if (!T8(e))
    return O8(e);
  var t = P8(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !D8.call(e, n)) || r.push(n);
  return r;
}
var E8 = N8, B8 = w9, U8 = E8, F8 = S9;
function K8(e) {
  return F8(e) ? B8(e, !0) : U8(e);
}
var Zt = K8, j8 = ut, z8 = Zt;
function Q8(e, t) {
  return e && j8(t, z8(t), e);
}
var Z8 = Q8, tt = { exports: {} };
tt.exports;
(function(e, t) {
  var r = z1, n = t && !t.nodeType && t, a = n && !0 && e && !e.nodeType && e, l = a && a.exports === n, u = l ? r.Buffer : void 0, c = u ? u.allocUnsafe : void 0;
  function g($, f) {
    if (f)
      return $.slice();
    var L = $.length, x = c ? c(L) : new $.constructor(L);
    return $.copy(x), x;
  }
  e.exports = g;
})(tt, tt.exports);
var R8 = tt.exports;
function V8(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
var H8 = V8;
function Y8(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, a = 0, l = []; ++r < n; ) {
    var u = e[r];
    t(u, r, e) && (l[a++] = u);
  }
  return l;
}
var q8 = Y8;
function G8() {
  return [];
}
var T9 = G8, W8 = q8, X8 = T9, J8 = Object.prototype, e7 = J8.propertyIsEnumerable, N0 = Object.getOwnPropertySymbols, t7 = N0 ? function(e) {
  return e == null ? [] : (e = Object(e), W8(N0(e), function(t) {
    return e7.call(e, t);
  }));
} : X8, Rt = t7, r7 = ut, n7 = Rt;
function i7(e, t) {
  return r7(e, n7(e), t);
}
var a7 = i7;
function o7(e, t) {
  for (var r = -1, n = t.length, a = e.length; ++r < n; )
    e[a + r] = t[r];
  return e;
}
var P9 = o7, s7 = M9, l7 = s7(Object.getPrototypeOf, Object), O9 = l7, c7 = P9, u7 = O9, d7 = Rt, h7 = T9, y7 = Object.getOwnPropertySymbols, f7 = y7 ? function(e) {
  for (var t = []; e; )
    c7(t, d7(e)), e = u7(e);
  return t;
} : h7, I9 = f7, C7 = ut, g7 = I9;
function m7(e, t) {
  return C7(e, g7(e), t);
}
var p7 = m7, v7 = P9, b7 = Ce;
function $7(e, t, r) {
  var n = t(e);
  return b7(e) ? n : v7(n, r(e));
}
var D9 = $7, _7 = D9, L7 = Rt, k7 = Qt;
function x7(e) {
  return _7(e, k7, L7);
}
var A7 = x7, w7 = D9, M7 = I9, S7 = Zt;
function T7(e) {
  return w7(e, S7, M7);
}
var P7 = T7, O7 = ie, I7 = z1, D7 = O7(I7, "DataView"), N7 = D7, E7 = ie, B7 = z1, U7 = E7(B7, "Promise"), F7 = U7, K7 = ie, j7 = z1, z7 = K7(j7, "Set"), Q7 = z7, Z7 = ie, R7 = z1, V7 = Z7(R7, "WeakMap"), H7 = V7, St = N7, Tt = Ut, Pt = F7, Ot = Q7, It = H7, N9 = Ee, $e = m9, E0 = "[object Map]", Y7 = "[object Object]", B0 = "[object Promise]", U0 = "[object Set]", F0 = "[object WeakMap]", K0 = "[object DataView]", q7 = $e(St), G7 = $e(Tt), W7 = $e(Pt), X7 = $e(Ot), J7 = $e(It), J1 = N9;
(St && J1(new St(new ArrayBuffer(1))) != K0 || Tt && J1(new Tt()) != E0 || Pt && J1(Pt.resolve()) != B0 || Ot && J1(new Ot()) != U0 || It && J1(new It()) != F0) && (J1 = function(e) {
  var t = N9(e), r = t == Y7 ? e.constructor : void 0, n = r ? $e(r) : "";
  if (n)
    switch (n) {
      case q7:
        return K0;
      case G7:
        return E0;
      case W7:
        return B0;
      case X7:
        return U0;
      case J7:
        return F0;
    }
  return t;
});
var Vt = J1, ei = Object.prototype, ti = ei.hasOwnProperty;
function ri(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && ti.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
var ni = ri, ii = z1, ai = ii.Uint8Array, oi = ai, j0 = oi;
function si(e) {
  var t = new e.constructor(e.byteLength);
  return new j0(t).set(new j0(e)), t;
}
var Ht = si, li = Ht;
function ci(e, t) {
  var r = t ? li(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var ui = ci, di = /\w*$/;
function hi(e) {
  var t = new e.constructor(e.source, di.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var yi = hi, z0 = at, Q0 = z0 ? z0.prototype : void 0, Z0 = Q0 ? Q0.valueOf : void 0;
function fi(e) {
  return Z0 ? Object(Z0.call(e)) : {};
}
var Ci = fi, gi = Ht;
function mi(e, t) {
  var r = t ? gi(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
var pi = mi, vi = Ht, bi = ui, $i = yi, _i = Ci, Li = pi, ki = "[object Boolean]", xi = "[object Date]", Ai = "[object Map]", wi = "[object Number]", Mi = "[object RegExp]", Si = "[object Set]", Ti = "[object String]", Pi = "[object Symbol]", Oi = "[object ArrayBuffer]", Ii = "[object DataView]", Di = "[object Float32Array]", Ni = "[object Float64Array]", Ei = "[object Int8Array]", Bi = "[object Int16Array]", Ui = "[object Int32Array]", Fi = "[object Uint8Array]", Ki = "[object Uint8ClampedArray]", ji = "[object Uint16Array]", zi = "[object Uint32Array]";
function Qi(e, t, r) {
  var n = e.constructor;
  switch (t) {
    case Oi:
      return vi(e);
    case ki:
    case xi:
      return new n(+e);
    case Ii:
      return bi(e, r);
    case Di:
    case Ni:
    case Ei:
    case Bi:
    case Ui:
    case Fi:
    case Ki:
    case ji:
    case zi:
      return Li(e, r);
    case Ai:
      return new n();
    case wi:
    case Ti:
      return new n(e);
    case Mi:
      return $i(e);
    case Si:
      return new n();
    case Pi:
      return _i(e);
  }
}
var Zi = Qi, Ri = fe, R0 = Object.create, Vi = function() {
  function e() {
  }
  return function(t) {
    if (!Ri(t))
      return {};
    if (R0)
      return R0(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}(), Hi = Vi, Yi = Hi, qi = O9, Gi = zt;
function Wi(e) {
  return typeof e.constructor == "function" && !Gi(e) ? Yi(qi(e)) : {};
}
var Xi = Wi, Ji = Vt, ea = ge, ta = "[object Map]";
function ra(e) {
  return ea(e) && Ji(e) == ta;
}
var na = ra, ia = na, aa = Kt, V0 = jt, H0 = V0 && V0.isMap, oa = H0 ? aa(H0) : ia, sa = oa, la = Vt, ca = ge, ua = "[object Set]";
function da(e) {
  return ca(e) && la(e) == ua;
}
var ha = da, ya = ha, fa = Kt, Y0 = jt, q0 = Y0 && Y0.isSet, Ca = q0 ? fa(q0) : ya, ga = Ca, ma = Hr, pa = qr, va = Et, ba = w8, $a = Z8, _a = R8, La = H8, ka = a7, xa = p7, Aa = A7, wa = P7, Ma = Vt, Sa = ni, Ta = Zi, Pa = Xi, Oa = Ce, Ia = x9, Da = sa, Na = fe, Ea = ga, Ba = Qt, Ua = Zt, Fa = 1, Ka = 2, ja = 4, E9 = "[object Arguments]", za = "[object Array]", Qa = "[object Boolean]", Za = "[object Date]", Ra = "[object Error]", B9 = "[object Function]", Va = "[object GeneratorFunction]", Ha = "[object Map]", Ya = "[object Number]", U9 = "[object Object]", qa = "[object RegExp]", Ga = "[object Set]", Wa = "[object String]", Xa = "[object Symbol]", Ja = "[object WeakMap]", e4 = "[object ArrayBuffer]", t4 = "[object DataView]", r4 = "[object Float32Array]", n4 = "[object Float64Array]", i4 = "[object Int8Array]", a4 = "[object Int16Array]", o4 = "[object Int32Array]", s4 = "[object Uint8Array]", l4 = "[object Uint8ClampedArray]", c4 = "[object Uint16Array]", u4 = "[object Uint32Array]", e1 = {};
e1[E9] = e1[za] = e1[e4] = e1[t4] = e1[Qa] = e1[Za] = e1[r4] = e1[n4] = e1[i4] = e1[a4] = e1[o4] = e1[Ha] = e1[Ya] = e1[U9] = e1[qa] = e1[Ga] = e1[Wa] = e1[Xa] = e1[s4] = e1[l4] = e1[c4] = e1[u4] = !0;
e1[Ra] = e1[B9] = e1[Ja] = !1;
function He(e, t, r, n, a, l) {
  var u, c = t & Fa, g = t & Ka, $ = t & ja;
  if (r && (u = a ? r(e, n, a, l) : r(e)), u !== void 0)
    return u;
  if (!Na(e))
    return e;
  var f = Oa(e);
  if (f) {
    if (u = Sa(e), !c)
      return La(e, u);
  } else {
    var L = Ma(e), x = L == B9 || L == Va;
    if (Ia(e))
      return _a(e, c);
    if (L == U9 || L == E9 || x && !a) {
      if (u = g || x ? {} : Pa(e), !c)
        return g ? xa(e, $a(u, e)) : ka(e, ba(u, e));
    } else {
      if (!e1[L])
        return a ? e : {};
      u = Ta(e, L, c);
    }
  }
  l || (l = new ma());
  var S = l.get(e);
  if (S)
    return S;
  l.set(e, u), Ea(e) ? e.forEach(function(H) {
    u.add(He(H, t, r, H, e, l));
  }) : Da(e) && e.forEach(function(H, Q) {
    u.set(Q, He(H, t, r, Q, e, l));
  });
  var P = $ ? g ? wa : Aa : g ? Ua : Ba, O = f ? void 0 : P(e);
  return pa(O || e, function(H, Q) {
    O && (Q = H, H = e[Q]), va(u, Q, He(H, t, r, Q, e, l));
  }), u;
}
var d4 = He, h4 = d4, y4 = 1, f4 = 4;
function C4(e) {
  return h4(e, y4 | f4);
}
var g4 = C4;
const m4 = /* @__PURE__ */ y9(g4), p4 = /* @__PURE__ */ b("<button></button>"), v4 = (e) => (() => {
  const t = p4.cloneNode(!0);
  return q1(t, "click", e.onClick, !0), _(t, () => e.children), B((r) => {
    const n = e.style, a = `klinecharts-pro-button ${e.type ?? "confirm"} ${e.class ?? ""}`;
    return r._v$ = ne(t, n, r._v$), a !== r._v$2 && h1(t, r._v$2 = a), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
F1(["click"]);
const b4 = /* @__PURE__ */ b('<svg viewBox="0 0 1024 1024" class="icon"><path d="M810.666667 128H213.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v597.333334c0 46.933333 38.4 85.333333 85.333333 85.333333h597.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V213.333333c0-46.933333-38.4-85.333333-85.333333-85.333333z m-353.706667 567.04a42.496 42.496 0 0 1-60.16 0L243.626667 541.866667c-8.106667-8.106667-12.373333-18.773333-12.373334-29.866667s4.693333-22.186667 12.373334-29.866667a42.496 42.496 0 0 1 60.16 0L426.666667 604.586667l293.546666-293.546667a42.496 42.496 0 1 1 60.16 60.16l-323.413333 323.84z"></path></svg>'), $4 = /* @__PURE__ */ b('<svg viewBox="0 0 1024 1024" class="icon"><path d="M245.333333 128h533.333334A117.333333 117.333333 0 0 1 896 245.333333v533.333334A117.333333 117.333333 0 0 1 778.666667 896H245.333333A117.333333 117.333333 0 0 1 128 778.666667V245.333333A117.333333 117.333333 0 0 1 245.333333 128z m0 64c-29.44 0-53.333333 23.893333-53.333333 53.333333v533.333334c0 29.44 23.893333 53.333333 53.333333 53.333333h533.333334c29.44 0 53.333333-23.893333 53.333333-53.333333V245.333333c0-29.44-23.893333-53.333333-53.333333-53.333333H245.333333z"></path></svg>'), _4 = /* @__PURE__ */ b("<div></div>"), L4 = /* @__PURE__ */ b('<span class="label"></span>'), k4 = () => b4.cloneNode(!0), x4 = () => $4.cloneNode(!0), G0 = (e) => {
  const [t, r] = w(e.checked ?? !1);
  return S1(() => {
    "checked" in e && r(e.checked);
  }), (() => {
    const n = _4.cloneNode(!0);
    return n.$$click = (a) => {
      const l = !t();
      e.onChange && e.onChange(l), r(l);
    }, _(n, (() => {
      const a = Y(() => !!t());
      return () => a() ? k(k4, {}) : k(x4, {});
    })(), null), _(n, (() => {
      const a = Y(() => !!e.label);
      return () => a() && (() => {
        const l = L4.cloneNode(!0);
        return _(l, () => e.label), l;
      })();
    })(), null), B((a) => {
      const l = e.style, u = `klinecharts-pro-checkbox ${t() && "checked" || ""} ${e.class || ""}`;
      return a._v$ = ne(n, l, a._v$), u !== a._v$2 && h1(n, a._v$2 = u), a;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), n;
  })();
};
F1(["click"]);
const A4 = /* @__PURE__ */ b('<div class="klinecharts-pro-loading"><i class="circle1"></i><i class="circle2"></i><i class="circle3"></i></div>'), F9 = () => A4.cloneNode(!0), w4 = /* @__PURE__ */ b('<div class="klinecharts-pro-empty"><svg class="icon" viewBox="0 0 1024 1024"><path d="M855.6 427.2H168.5c-12.7 0-24.4 6.9-30.6 18L4.4 684.7C1.5 689.9 0 695.8 0 701.8v287.1c0 19.4 15.7 35.1 35.1 35.1H989c19.4 0 35.1-15.7 35.1-35.1V701.8c0-6-1.5-11.8-4.4-17.1L886.2 445.2c-6.2-11.1-17.9-18-30.6-18zM673.4 695.6c-16.5 0-30.8 11.5-34.3 27.7-12.7 58.5-64.8 102.3-127.2 102.3s-114.5-43.8-127.2-102.3c-3.5-16.1-17.8-27.7-34.3-27.7H119c-26.4 0-43.3-28-31.1-51.4l81.7-155.8c6.1-11.6 18-18.8 31.1-18.8h622.4c13 0 25 7.2 31.1 18.8l81.7 155.8c12.2 23.4-4.7 51.4-31.1 51.4H673.4zM819.9 209.5c-1-1.8-2.1-3.7-3.2-5.5-9.8-16.6-31.1-22.2-47.8-12.6L648.5 261c-17 9.8-22.7 31.6-12.6 48.4 0.9 1.4 1.7 2.9 2.5 4.4 9.5 17 31.2 22.8 48 13L807 257.3c16.7-9.7 22.4-31 12.9-47.8zM375.4 261.1L255 191.6c-16.7-9.6-38-4-47.8 12.6-1.1 1.8-2.1 3.6-3.2 5.5-9.5 16.8-3.8 38.1 12.9 47.8L337.3 327c16.9 9.7 38.6 4 48-13.1 0.8-1.5 1.7-2.9 2.5-4.4 10.2-16.8 4.5-38.6-12.4-48.4zM512 239.3h2.5c19.5 0.3 35.5-15.5 35.5-35.1v-139c0-19.3-15.6-34.9-34.8-35.1h-6.4C489.6 30.3 474 46 474 65.2v139c0 19.5 15.9 35.4 35.5 35.1h2.5z"></path></svg></div>'), M4 = () => w4.cloneNode(!0), S4 = /* @__PURE__ */ b("<ul></ul>"), T4 = /* @__PURE__ */ b("<li></li>"), rt = (e) => (() => {
  const t = S4.cloneNode(!0);
  return _(t, k(z, {
    get when() {
      return e.loading;
    },
    get children() {
      return k(F9, {});
    }
  }), null), _(t, k(z, {
    get when() {
      var r;
      return !e.loading && !e.children && !((r = e.dataSource) != null && r.length);
    },
    get children() {
      return k(M4, {});
    }
  }), null), _(t, k(z, {
    get when() {
      return e.children;
    },
    get children() {
      return e.children;
    }
  }), null), _(t, k(z, {
    get when() {
      return !e.children;
    },
    get children() {
      var r;
      return (r = e.dataSource) == null ? void 0 : r.map((n) => {
        var a;
        return ((a = e.renderItem) == null ? void 0 : a.call(e, n)) ?? T4.cloneNode(!0);
      });
    }
  }), null), B((r) => {
    const n = e.style, a = `klinecharts-pro-list ${e.class ?? ""}`;
    return r._v$ = ne(t, n, r._v$), a !== r._v$2 && h1(t, r._v$2 = a), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})(), P4 = /* @__PURE__ */ b('<div class="klinecharts-pro-modal"><div class="inner"><div class="title-container"><svg class="close-icon" viewBox="0 0 1024 1024"><path d="M934.184927 199.723787 622.457206 511.452531l311.727721 311.703161c14.334473 14.229073 23.069415 33.951253 23.069415 55.743582 0 43.430138-35.178197 78.660524-78.735226 78.660524-21.664416 0-41.361013-8.865925-55.642275-23.069415L511.149121 622.838388 199.420377 934.490384c-14.204513 14.20349-33.901111 23.069415-55.642275 23.069415-43.482327 0-78.737272-35.230386-78.737272-78.660524 0-21.792329 8.864902-41.513486 23.094998-55.743582l311.677579-311.703161L88.135828 199.723787c-14.230096-14.255679-23.094998-33.92567-23.094998-55.642275 0-43.430138 35.254945-78.762855 78.737272-78.762855 21.741163 0 41.437761 8.813736 55.642275 23.069415l311.727721 311.727721L822.876842 88.389096c14.281261-14.255679 33.977859-23.069415 55.642275-23.069415 43.557028 0 78.735226 35.332716 78.735226 78.762855C957.254342 165.798117 948.5194 185.468109 934.184927 199.723787"></path></svg></div><div class="content-container"></div></div></div>'), O4 = /* @__PURE__ */ b('<div class="button-container"></div>'), ae = (e) => (() => {
  const t = P4.cloneNode(!0), r = t.firstChild, n = r.firstChild, a = n.firstChild, l = n.nextSibling;
  return t.$$click = (u) => {
    u.target === u.currentTarget && e.onClose && e.onClose();
  }, _(n, () => e.title, a), q1(a, "click", e.onClose, !0), _(l, () => e.children), _(r, (() => {
    const u = Y(() => !!(e.buttons && e.buttons.length > 0));
    return () => u() && (() => {
      const c = O4.cloneNode(!0);
      return _(c, () => e.buttons.map((g) => k(v4, h9(g, {
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
      })))), B((g) => {
        const $ = e.btnParentStyle, f = !!e.isMobile;
        return g._v$8 = ne(c, $, g._v$8), f !== g._v$9 && c.classList.toggle("mobile-buttons", g._v$9 = f), g;
      }, {
        _v$8: void 0,
        _v$9: void 0
      }), c;
    })();
  })(), null), B((u) => {
    const c = !!e.isMobile, g = e.isMobile ? "100%" : `${e.width ?? 400}px`, $ = (e.isMobile, "auto"), f = e.isMobile ? "60vh" : "90vh", L = !!e.isMobile, x = !!e.isMobile, S = !!e.isMobile;
    return c !== u._v$ && t.classList.toggle("mobile-modal", u._v$ = c), g !== u._v$2 && r.style.setProperty("width", u._v$2 = g), $ !== u._v$3 && r.style.setProperty("height", u._v$3 = $), f !== u._v$4 && r.style.setProperty("max-height", u._v$4 = f), L !== u._v$5 && r.classList.toggle("mobile-inner", u._v$5 = L), x !== u._v$6 && n.classList.toggle("mobile-title", u._v$6 = x), S !== u._v$7 && l.classList.toggle("mobile-content", u._v$7 = S), u;
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
F1(["click"]);
const I4 = /* @__PURE__ */ b('<div tabindex="0"><div class="selector-container"><span class="value"></span><i class="arrow"></i></div></div>'), D4 = /* @__PURE__ */ b('<div class="drop-down-container"><ul></ul></div>'), N4 = /* @__PURE__ */ b('<div><input type="text"></div>'), E4 = /* @__PURE__ */ b("<li></li>"), K9 = (e) => {
  const [t, r] = w(!1), [n, a] = w("");
  let l, u;
  const c = Y(() => {
    if (!e.dataSource || !e.searchable)
      return e.dataSource;
    const f = n().toLowerCase().trim();
    return f ? typeof e.dataSource[0] == "string" ? e.dataSource.filter((x) => x.toLowerCase().includes(f)) : e.dataSource.filter((x) => {
      var O, H;
      const S = ((O = x.text) == null ? void 0 : O.toString().toLowerCase()) || "", P = ((H = x.key) == null ? void 0 : H.toLowerCase()) || "";
      return S.includes(f) || P.includes(f);
    }) : e.dataSource;
  }), g = () => {
    const f = !t();
    r(f), a(""), f && e.searchable && setTimeout(() => l == null ? void 0 : l.focus(), 50);
  }, $ = (f) => {
    const L = f.relatedTarget;
    u && L && u.contains(L) || (r(!1), a(""));
  };
  return (() => {
    const f = I4.cloneNode(!0), L = f.firstChild, x = L.firstChild;
    f.addEventListener("blur", $), f.$$click = (P) => {
      P.stopPropagation(), g();
    };
    const S = u;
    return typeof S == "function" ? te(S, f) : u = f, _(x, () => e.value), _(f, (() => {
      const P = Y(() => !!(e.dataSource && e.dataSource.length > 0));
      return () => P() && (() => {
        const O = D4.cloneNode(!0), H = O.firstChild;
        return O.$$mousedown = (Q) => Q.preventDefault(), _(O, (() => {
          const Q = Y(() => !!e.searchable);
          return () => Q() && (() => {
            const E = N4.cloneNode(!0), N = E.firstChild;
            E.style.setProperty("padding", "8px"), E.style.setProperty("border-bottom", "1px solid #333"), N.$$click = (G) => G.stopPropagation(), N.$$input = (G) => a(G.currentTarget.value);
            const K = l;
            return typeof K == "function" ? te(K, N) : l = N, N.style.setProperty("width", "100%"), N.style.setProperty("padding", "6px 10px"), N.style.setProperty("border", "1px solid var(--klinecharts-pro-border-color)"), N.style.setProperty("border-radius", "4px"), N.style.setProperty("background-color", "var(--klinecharts-pro-popover-background-color)"), N.style.setProperty("color", "#fff"), N.style.setProperty("font-size", "13px"), N.style.setProperty("outline", "none"), B(() => v1(N, "placeholder", e.searchPlaceholder || "Search...")), B(() => N.value = n()), E;
          })();
        })(), H), _(H, () => {
          var Q;
          return (Q = c()) == null ? void 0 : Q.map((E) => {
            const K = E[e.valueKey ?? "text"] ?? E;
            return (() => {
              const G = E4.cloneNode(!0);
              return G.$$click = (T1) => {
                var c1;
                T1.stopPropagation(), e.value !== K && ((c1 = e.onSelected) == null || c1.call(e, E)), r(!1), a("");
              }, _(G, K), G;
            })();
          });
        }), O;
      })();
    })(), null), B((P) => {
      const O = e.style, H = `klinecharts-pro-select ${e.class ?? ""} ${t() ? "klinecharts-pro-select-show" : ""}`;
      return P._v$ = ne(f, O, P._v$), H !== P._v$2 && h1(f, P._v$2 = H), P;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), f;
  })();
};
F1(["click", "mousedown", "input"]);
const B4 = /* @__PURE__ */ b('<span class="prefix"></span>'), U4 = /* @__PURE__ */ b('<span class="suffix"></span>'), F4 = /* @__PURE__ */ b('<div><input class="value"></div>'), j9 = (e) => {
  const t = h9({
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER
  }, e);
  let r;
  const [n, a] = w("normal");
  return (() => {
    const l = F4.cloneNode(!0), u = l.firstChild;
    return l.$$click = () => {
      r == null || r.focus();
    }, _(l, k(z, {
      get when() {
        return t.prefix;
      },
      get children() {
        const c = B4.cloneNode(!0);
        return _(c, () => t.prefix), c;
      }
    }), u), u.addEventListener("change", (c) => {
      var $, f;
      const g = c.target.value;
      if ("precision" in t) {
        let L;
        const x = Math.max(0, Math.floor(t.precision));
        x <= 0 ? L = new RegExp(/^[1-9]\d*$/) : L = new RegExp("^\\d+\\.?\\d{0," + x + "}$"), (g === "" || L.test(g) && +g >= t.min && +g <= t.max) && (($ = t.onChange) == null || $.call(t, g === "" ? g : +g));
      } else
        (f = t.onChange) == null || f.call(t, g);
    }), u.addEventListener("blur", () => {
      a("normal");
    }), u.addEventListener("focus", () => {
      a("focus");
    }), te((c) => {
      r = c;
    }, u), _(l, k(z, {
      get when() {
        return t.suffix;
      },
      get children() {
        const c = U4.cloneNode(!0);
        return _(c, () => t.suffix), c;
      }
    }), null), B((c) => {
      const g = t.style, $ = `klinecharts-pro-input ${t.class ?? ""}`, f = n(), L = t.placeholder ?? "";
      return c._v$ = ne(l, g, c._v$), $ !== c._v$2 && h1(l, c._v$2 = $), f !== c._v$3 && v1(l, "data-status", c._v$3 = f), L !== c._v$4 && v1(u, "placeholder", c._v$4 = L), c;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0
    }), B(() => u.value = t.value), l;
  })();
};
F1(["click"]);
const K4 = /* @__PURE__ */ b('<div><i class="thumb"></i></div>'), j4 = (e) => (() => {
  const t = K4.cloneNode(!0);
  return t.$$click = (r) => {
    e.onChange && e.onChange();
  }, B((r) => {
    const n = e.style, a = `klinecharts-pro-switch ${e.open ? "turn-on" : "turn-off"} ${e.class ?? ""}`;
    return r._v$ = ne(t, n, r._v$), a !== r._v$2 && h1(t, r._v$2 = a), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
F1(["click"]);
const z4 = "指标", Q4 = "更多", Z4 = "主图指标", R4 = "副图指标", V4 = "设置", H4 = "时区", Y4 = "截屏", q4 = "全屏", G4 = "退出全屏", W4 = "保存", X4 = "确定", J4 = "取消", eo = "MA(移动平均线)", to = "EMA(指数平滑移动平均线)", ro = "SMA", no = "BOLL(布林线)", io = "BBI(多空指数)", ao = "SAR(停损点指向指标)", oo = "VOL(成交量)", so = "MACD(指数平滑异同移动平均线)", lo = "KDJ(随机指标)", co = "RSI(相对强弱指标)", uo = "BIAS(乖离率)", ho = "BRAR(情绪指标)", yo = "CCI(顺势指标)", fo = "DMI(动向指标)", Co = "CR(能量指标)", go = "PSY(心理线)", mo = "DMA(平行线差指标)", po = "TRIX(三重指数平滑平均线)", vo = "OBV(能量潮指标)", bo = "VR(成交量变异率)", $o = "WR(威廉指标)", _o = "MTM(动量指标)", Lo = "EMV(简易波动指标)", ko = "ROC(变动率指标)", xo = "PVT(价量趋势指标)", Ao = "AO(动量震荡指标)", wo = "世界统一时间", Mo = "(UTC-10) 檀香山", So = "(UTC-8) 朱诺", To = "(UTC-7) 洛杉矶", Po = "(UTC-5) 芝加哥", Oo = "(UTC-4) 多伦多", Io = "(UTC-3) 圣保罗", Do = "(UTC+1) 伦敦", No = "(UTC+2) 柏林", Eo = "(UTC+3) 巴林", Bo = "(UTC+4) 迪拜", Uo = "(UTC+5) 阿什哈巴德", Fo = "(UTC+6) 阿拉木图", Ko = "(UTC+7) 曼谷", jo = "(UTC+8) 上海", zo = "(UTC+9) 东京", Qo = "(UTC+10) 悉尼", Zo = "(UTC+12) 诺福克岛", Ro = "水平直线", Vo = "水平射线", Ho = "水平线段", Yo = "垂直直线", qo = "垂直射线", Go = "垂直线段", Wo = "直线", Xo = "射线", Jo = "线段", es = "箭头", ts = "价格线", rs = "价格通道线", ns = "平行直线", is = "斐波那契回调直线", as = "斐波那契回调线段", os = "斐波那契圆环", ss = "斐波那契螺旋", ls = "斐波那契速度阻力扇", cs = "斐波那契趋势扩展", us = "江恩箱", ds = "矩形", hs = "平行四边形", ys = "圆", fs = "三角形", Cs = "三浪", gs = "五浪", ms = "八浪", ps = "任意浪", vs = "ABCD形态", bs = "XABCD形态", $s = "弱磁模式", _s = "强磁模式", Ls = "商品搜索", ks = "商品代码", xs = "参数1", As = "参数2", ws = "参数3", Ms = "参数4", Ss = "参数5", Ts = "周期", Ps = "标准差", Os = "蜡烛图类型", Is = "全实心", Ds = "全空心", Ns = "涨空心", Es = "跌空心", Bs = "OHLC", Us = "面积图", Fs = "最新价显示", Ks = "最高价显示", js = "最低价显示", zs = "指标最新值显示", Qs = "价格轴类型", Zs = "线性轴", Rs = "百分比轴", Vs = "对数轴", Hs = "倒置坐标", Ys = "网格线显示", qs = "恢复默认", Gs = {
  indicator: z4,
  more: Q4,
  main_indicator: Z4,
  sub_indicator: R4,
  setting: V4,
  timezone: H4,
  screenshot: Y4,
  full_screen: q4,
  exit_full_screen: G4,
  save: W4,
  confirm: X4,
  cancel: J4,
  ma: eo,
  ema: to,
  sma: ro,
  boll: no,
  bbi: io,
  sar: ao,
  vol: oo,
  macd: so,
  kdj: lo,
  rsi: co,
  bias: uo,
  brar: ho,
  cci: yo,
  dmi: fo,
  cr: Co,
  psy: go,
  dma: mo,
  trix: po,
  obv: vo,
  vr: bo,
  wr: $o,
  mtm: _o,
  emv: Lo,
  roc: ko,
  pvt: xo,
  ao: Ao,
  utc: wo,
  honolulu: Mo,
  juneau: So,
  los_angeles: To,
  chicago: Po,
  toronto: Oo,
  sao_paulo: Io,
  london: Do,
  berlin: No,
  bahrain: Eo,
  dubai: Bo,
  ashkhabad: Uo,
  almaty: Fo,
  bangkok: Ko,
  shanghai: jo,
  tokyo: zo,
  sydney: Qo,
  norfolk: Zo,
  horizontal_straight_line: Ro,
  horizontal_ray_line: Vo,
  horizontal_segment: Ho,
  vertical_straight_line: Yo,
  vertical_ray_line: qo,
  vertical_segment: Go,
  straight_line: Wo,
  ray_line: Xo,
  segment: Jo,
  arrow: es,
  price_line: ts,
  price_channel_line: rs,
  parallel_straight_line: ns,
  fibonacci_line: is,
  fibonacci_segment: as,
  fibonacci_circle: os,
  fibonacci_spiral: ss,
  fibonacci_speed_resistance_fan: ls,
  fibonacci_extension: cs,
  gann_box: us,
  rect: ds,
  parallelogram: hs,
  circle: ys,
  triangle: fs,
  three_waves: Cs,
  five_waves: gs,
  eight_waves: ms,
  any_waves: ps,
  abcd: vs,
  xabcd: bs,
  weak_magnet: $s,
  strong_magnet: _s,
  symbol_search: Ls,
  symbol_code: ks,
  params_1: xs,
  params_2: As,
  params_3: ws,
  params_4: Ms,
  params_5: Ss,
  period: Ts,
  standard_deviation: Ps,
  candle_type: Os,
  candle_solid: Is,
  candle_stroke: Ds,
  candle_up_stroke: Ns,
  candle_down_stroke: Es,
  ohlc: Bs,
  area: Us,
  last_price_show: Fs,
  high_price_show: Ks,
  low_price_show: js,
  indicator_last_value_show: zs,
  price_axis_type: Qs,
  normal: Zs,
  percentage: Rs,
  log: Vs,
  reverse_coordinate: Hs,
  grid_show: Ys,
  restore_default: qs
}, Ws = "Indicator", Xs = "More", Js = "Main Indicator", el = "Sub Indicator", tl = "Setting", rl = "Timezone", nl = "Screenshot", il = "Full Screen", al = "Exit", ol = "Save", sl = "Confirm", ll = "Cancel", cl = "MA(Moving Average)", ul = "EMA(Exponential Moving Average)", dl = "SMA", hl = "BOLL(Bolinger Bands)", yl = "BBI(Bull And Bearlndex)", fl = "SAR(Stop and Reverse)", Cl = "VOL(Volume)", gl = "MACD(Moving Average Convergence / Divergence)", ml = "KDJ(KDJ Index)", pl = "RSI(Relative Strength Index)", vl = "BIAS(Bias Ratio)", bl = "BRAR(情绪指标)", $l = "CCI(Commodity Channel Index)", _l = "DMI(Directional Movement Index)", Ll = "CR(能量指标)", kl = "PSY(Psychological Line)", xl = "DMA(Different of Moving Average)", Al = "TRIX(Triple Exponentially Smoothed Moving Average)", wl = "OBV(On Balance Volume)", Ml = "VR(Volatility Volume Ratio)", Sl = "WR(Williams %R)", Tl = "MTM(Momentum Index)", Pl = "EMV(Ease of Movement Value)", Ol = "ROC(Price Rate of Change)", Il = "PVT(Price and Volume Trend)", Dl = "AO(Awesome Oscillator)", Nl = "UTC", El = "(UTC-10) Honolulu", Bl = "(UTC-8) Juneau", Ul = "(UTC-7) Los Angeles", Fl = "(UTC-5) Chicago", Kl = "(UTC-4) Toronto", jl = "(UTC-3) Sao Paulo", zl = "(UTC+1) London", Ql = "(UTC+2) Berlin", Zl = "(UTC+3) Bahrain", Rl = "(UTC+4) Dubai", Vl = "(UTC+5) Ashkhabad", Hl = "(UTC+6) Almaty", Yl = "(UTC+7) Bangkok", ql = "(UTC+8) Shanghai", Gl = "(UTC+9) Tokyo", Wl = "(UTC+10) Sydney", Xl = "(UTC+12) Norfolk", Jl = "Horizontal Line", ec = "Horizontal Ray", tc = "Horizontal Segment", rc = "Vertical Line", nc = "Vertical Ray", ic = "Vertical Segment", ac = "Trend Line", oc = "Ray", sc = "Segment", lc = "Arrow", cc = "Price Line", uc = "Price Channel Line", dc = "Parallel Line", hc = "Fibonacci Line", yc = "Fibonacci Segment", fc = "Fibonacci Circle", Cc = "Fibonacci Spiral", gc = "Fibonacci Sector", mc = "Fibonacci Extension", pc = "Gann Box", vc = "Rect", bc = "Parallelogram", $c = "Circle", _c = "Triangle", Lc = "Three Waves", kc = "Five Waves", xc = "Eight Waves", Ac = "Any Waves", wc = "ABCD Pattern", Mc = "XABCD Pattern", Sc = "Weak Magnet", Tc = "Strong Magnet", Pc = "Symbol Search", Oc = "Symbol Code", Ic = "Parameter 1", Dc = "Parameter 2", Nc = "Parameter 3", Ec = "Parameter 4", Bc = "Parameter 5", Uc = "Period", Fc = "Standard Deviation", Kc = "Candle Type", jc = "Candle Solid", zc = "Candle Stroke", Qc = "Candle Up Stroke", Zc = "Candle Down Stroke", Rc = "OHLC", Vc = "Area", Hc = "Show Last Price", Yc = "Show Highest Price", qc = "Show Lowest Price", Gc = "Show indicator's last value", Wc = "Price Axis Type", Xc = "Normal", Jc = "Percentage", eu = "Log", tu = "Reverse Coordinate", ru = "Show Grids", nu = "Restore Defaults", iu = {
  indicator: Ws,
  more: Xs,
  main_indicator: Js,
  sub_indicator: el,
  setting: tl,
  timezone: rl,
  screenshot: nl,
  full_screen: il,
  exit_full_screen: al,
  save: ol,
  confirm: sl,
  cancel: ll,
  ma: cl,
  ema: ul,
  sma: dl,
  boll: hl,
  bbi: yl,
  sar: fl,
  vol: Cl,
  macd: gl,
  kdj: ml,
  rsi: pl,
  bias: vl,
  brar: bl,
  cci: $l,
  dmi: _l,
  cr: Ll,
  psy: kl,
  dma: xl,
  trix: Al,
  obv: wl,
  vr: Ml,
  wr: Sl,
  mtm: Tl,
  emv: Pl,
  roc: Ol,
  pvt: Il,
  ao: Dl,
  utc: Nl,
  honolulu: El,
  juneau: Bl,
  los_angeles: Ul,
  chicago: Fl,
  toronto: Kl,
  sao_paulo: jl,
  london: zl,
  berlin: Ql,
  bahrain: Zl,
  dubai: Rl,
  ashkhabad: Vl,
  almaty: Hl,
  bangkok: Yl,
  shanghai: ql,
  tokyo: Gl,
  sydney: Wl,
  norfolk: Xl,
  horizontal_straight_line: Jl,
  horizontal_ray_line: ec,
  horizontal_segment: tc,
  vertical_straight_line: rc,
  vertical_ray_line: nc,
  vertical_segment: ic,
  straight_line: ac,
  ray_line: oc,
  segment: sc,
  arrow: lc,
  price_line: cc,
  price_channel_line: uc,
  parallel_straight_line: dc,
  fibonacci_line: hc,
  fibonacci_segment: yc,
  fibonacci_circle: fc,
  fibonacci_spiral: Cc,
  fibonacci_speed_resistance_fan: gc,
  fibonacci_extension: mc,
  gann_box: pc,
  rect: vc,
  parallelogram: bc,
  circle: $c,
  triangle: _c,
  three_waves: Lc,
  five_waves: kc,
  eight_waves: xc,
  any_waves: Ac,
  abcd: wc,
  xabcd: Mc,
  weak_magnet: Sc,
  strong_magnet: Tc,
  symbol_search: Pc,
  symbol_code: Oc,
  params_1: Ic,
  params_2: Dc,
  params_3: Nc,
  params_4: Ec,
  params_5: Bc,
  period: Uc,
  standard_deviation: Fc,
  candle_type: Kc,
  candle_solid: jc,
  candle_stroke: zc,
  candle_up_stroke: Qc,
  candle_down_stroke: Zc,
  ohlc: Rc,
  area: Vc,
  last_price_show: Hc,
  high_price_show: Yc,
  low_price_show: qc,
  indicator_last_value_show: Gc,
  price_axis_type: Wc,
  normal: Xc,
  percentage: Jc,
  log: eu,
  reverse_coordinate: tu,
  grid_show: ru,
  restore_default: nu
}, z9 = {
  "zh-CN": Gs,
  "en-US": iu
};
function Oh(e, t) {
  z9[e] = t;
}
const o = (e, t) => {
  var r;
  return ((r = z9[t]) == null ? void 0 : r[e]) ?? e;
}, au = /* @__PURE__ */ b('<div class="scroll-indicator left"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg></div>'), ou = /* @__PURE__ */ b('<img alt="symbol">'), su = /* @__PURE__ */ b('<div class="symbol"><span></span></div>'), lu = /* @__PURE__ */ b('<span class="down-arrow-icon mobile-separate-arrow"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></span>'), cu = /* @__PURE__ */ b('<span class="mobile-more-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg></span>'), uu = /* @__PURE__ */ b('<div class="item tools"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div>'), du = /* @__PURE__ */ b('<div class="klinecharts-pro-order-tools-popover"><div><button type="button" class="klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-label">Quick Order</span><span class="klinecharts-pro-order-tools-chevron">›</span></button><div class="klinecharts-pro-order-tools-submenu"><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Floating Window</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Plus Button</span></label></div></div><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Open Orders</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Positions</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Order History</span></label></div>'), hu = /* @__PURE__ */ b('<div><div class="item tools order-tools-trigger"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Orders"><path d="M4 7h10"></path><path d="M4 12h8"></path><path d="M4 17h6"></path><path d="M18 6v12"></path><path d="M15 15l3 3 3-3"></path></svg><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></div></div>'), yu = /* @__PURE__ */ b('<div class="item tools"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path><path d="M15.22299772857666,9.722223632261718C12.59389772857666,9.722223632261718,10.44600772857666,12.020201374511718,10.44600772857666,14.861111374511719C10.44600772857666,17.70202137451172,12.58215772857666,20.000021374511718,15.223007728576661,20.000021374511718C17.86384772857666,20.000021374511718,19.99999772857666,17.70202137451172,19.99999772857666,14.861111374511719C19.99999772857666,12.020201374511718,17.85211772857666,9.72222212709572,15.22299772857666,9.722223632261718ZM15.22299772857666,18.598491374511717C13.30985772857666,18.598491374511717,11.737087728576661,16.91919137451172,11.737087728576661,14.848481374511719C11.737087728576661,12.777781374511719,13.29811772857666,11.098491374511719,15.22299772857666,11.098491374511719C17.14787772857666,11.098491374511719,18.708917728576658,12.777781374511719,18.708917728576658,14.848481374511719C18.708917728576658,16.91919137451172,17.13614772857666,18.59848137451172,15.22299772857666,18.598491374511717Z"></path><path d="M15.692486288146974,15.050496970825195L15.692486288146974,12.676760970825196C15.692486288146974,12.297972970825196,15.399058288146973,11.982316970825195,15.046945288146972,11.982316970825195C14.694833288146972,11.982316970825195,14.401406288146973,12.297972970825196,14.401406288146973,12.676760970825196L14.401406288146973,15.340896970825195C14.401406288146973,15.530296970825194,14.471829288146973,15.694436970825196,14.589200288146973,15.833326970825196L15.751176288146972,17.095956970825195C15.868546288146973,17.222216970825194,16.032866288146973,17.297976970825196,16.208916288146973,17.297976970825196C16.384976288146973,17.297976970825196,16.537556288146973,17.222216970825194,16.666666288146974,17.095956970825195C16.78403628814697,16.969686970825194,16.854456288146974,16.792916970825196,16.854456288146974,16.603526970825193C16.854456288146974,16.414136970825197,16.78403628814697,16.237366970825196,16.666666288146974,16.111106970825197L15.692486288146974,15.050496970825195Z"></path></svg></div>'), fu = /* @__PURE__ */ b('<div class="item tools"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg></div>'), Cu = /* @__PURE__ */ b('<div class="item tools"><svg viewBox="0 0 20 20"><path d="M6.50977,1L13.4902,1C13.6406,1,13.7695,1.1104910000000001,13.7969,1.2631700000000001L14.0273,2.52277C14.1387,3.13147,14.6543,3.57143,15.2559,3.57143L17.5,3.57143C18.8809,3.57143,20,4.72254,20,6.14286L20,16.4286C20,17.8489,18.8809,19,17.5,19L2.5,19C1.11914,19,0,17.8489,0,16.4286L0,6.14286C0,4.72254,1.11914,3.57143,2.5,3.57143L4.74414,3.57143C5.3457,3.57143,5.86133,3.13147,5.97266,2.52277L6.20312,1.2631700000000001C6.23047,1.1104910000000001,6.35937,1,6.50977,1ZM15.2559,4.857139999999999C14.0547,4.857139999999999,13.0215,3.97522,12.7988,2.75982L12.7129,2.28571L7.28711,2.28571L7.20117,2.75982C6.98047,3.97522,5.94727,4.857139999999999,4.74414,4.857139999999999L2.5,4.857139999999999C1.81055,4.857139999999999,1.25,5.43371,1.25,6.14286L1.25,16.4286C1.25,17.1377,1.81055,17.7143,2.5,17.7143L17.5,17.7143C18.1895,17.7143,18.75,17.1377,18.75,16.4286L18.75,6.14286C18.75,5.43371,18.1895,4.857139999999999,17.5,4.857139999999999L15.2559,4.857139999999999ZM4.375,6.78571L3.125,6.78571C2.7793,6.78571,2.5,6.49844,2.5,6.14286C2.5,5.78728,2.7793,5.5,3.125,5.5L4.375,5.5C4.7207,5.5,5,5.78728,5,6.14286C5,6.49844,4.7207,6.78571,4.375,6.78571ZM10,6.14286C7.06641,6.14286,4.6875,8.58973,4.6875,11.6071C4.6875,14.6246,7.06641,17.0714,10,17.0714C12.9336,17.0714,15.3125,14.6246,15.3125,11.6071C15.3125,8.58973,12.9336,6.14286,10,6.14286ZM10,7.42857C11.0859,7.42857,12.1055,7.8625,12.873,8.65201C13.6406,9.44152,14.0625,10.49018,14.0625,11.6071C14.0625,12.7241,13.6406,13.7728,12.873,14.5623C12.1055,15.3518,11.0859,15.7857,10,15.7857C8.91406,15.7857,7.89453,15.3518,7.12695,14.5623C6.35937,13.7728,5.9375,12.7241,5.9375,11.6071C5.9375,10.49018,6.35938,9.44152,7.12695,8.65201C7.89453,7.8625,8.91406,7.42857,10,7.42857ZM10,9.67857C8.96484,9.67857,8.125,10.54241,8.125,11.6071C8.125,12.6719,8.96484,13.5357,10,13.5357C11.0352,13.5357,11.875,12.6719,11.875,11.6071C11.875,10.54241,11.0352,9.67857,10,9.67857ZM10,10.96429C10.3438,10.96429,10.625,11.2536,10.625,11.6071C10.625,11.9607,10.3438,12.25,10,12.25C9.65625,12.25,9.375,11.9607,9.375,11.6071C9.375,11.2536,9.65625,10.96429,10,10.96429Z"></path></svg></div>'), gu = /* @__PURE__ */ b('<div class="scroll-indicator right"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"></path></svg></div>'), mu = /* @__PURE__ */ b('<div><div class="klinecharts-pro-period-bar"><div class="menu-container"><svg viewBox="0 0 1024 1024"><path d="M192.037 287.953h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 479.169H438.553c-17.673 0-32 14.327-32 32s14.327 32 32 32h393.608c17.673 0 32-14.327 32-32s-14.327-32-32-32zM832.161 735.802H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32zM319.028 351.594l-160 160 160 160z"></path></svg></div><div><div class="item tools"></div></div></div></div>'), pu = /* @__PURE__ */ b("<span></span>"), vu = /* @__PURE__ */ b('<svg viewBox="0 0 20 20"><path d="M1.08108,0L0,1.079L4.18919,5.27938L2.54826,6.91715L6.9112,6.91715L6.9112,2.56262L5.28957,4.18112L1.08108,0ZM15.8108,5.27938L20,1.079L18.9189,0L14.7104,4.18112L13.0888,2.56262L13.0888,6.91715L17.4517,6.91715L15.8108,5.27938ZM4.16988,14.7014L0.07722,18.8054L1.1583,20L5.27027,15.7996L6.9112,17.4374L6.9112,13.0829L2.54826,13.0829L4.16988,14.7014ZM17.4517,13.0829L13.0888,13.0829L13.0888,17.4374L14.7297,15.7996L18.8417,20L19.9228,18.8054L15.8301,14.7013L17.4517,13.0829Z"></path></svg>'), bu = /* @__PURE__ */ b('<svg viewBox="0 0 20 20"><path d="M2.93444,1.76899L7.57544,6.40999L6.38918,7.59626L1.76899,2.93444L0,4.70343L0,0L4.70343,0L2.93444,1.76899ZM6.40999,12.4037L1.76899,17.0447L0,15.2758L0,19.9792L4.70343,19.9792L2.93444,18.2102L7.57544,13.5692L6.40999,12.4037ZM15.2758,0L17.0447,1.76899L12.4037,6.40999L13.59,7.59626L18.231,2.95526L20,4.72425L20,0L15.2758,0ZM13.5692,12.4037L12.3829,13.59L17.0239,18.231L15.2549,20L19.9792,20L19.9792,15.2758L18.2102,17.0447L13.5692,12.4037Z"></path></svg>'), $u = (e) => {
  let t, r, n;
  const [a, l] = w(window.innerWidth < 768), [u, c] = w(localStorage.getItem("klinechart_secondary_period") || ""), [g, $] = w(!1), [f, L] = w(!1), [x, S] = w({
    top: 0,
    left: 0,
    minWidth: 220
  }), P = () => {
    l(window.innerWidth < 768), g() && c1();
  }, [O, H] = w(!1), Q = () => document.fullscreenElement ?? document.body, E = () => {
    H(!!document.fullscreenElement);
  }, [N, K] = w(!1), [G, T1] = w(!1), c1 = () => {
    if (!r)
      return;
    const Z = r.getBoundingClientRect(), V = Math.max(220, Math.ceil(Z.width)), g1 = window.innerWidth, k1 = Math.min(Math.max(8, Z.right - V), Math.max(8, g1 - V - 8));
    S({
      top: Math.ceil(Z.bottom + 8),
      left: Math.ceil(k1),
      minWidth: V
    });
  }, P1 = () => {
    $((Z) => {
      const V = !Z;
      return V ? queueMicrotask(c1) : L(!1), V;
    });
  }, j = (Z) => {
    if (!g())
      return;
    const V = Z.target;
    V && (r != null && r.contains(V) || n != null && n.contains(V) || (L(!1), $(!1)));
  }, X = () => {
    g() && c1();
  }, R = () => {
    if (t && a()) {
      const Z = t;
      K(Z.scrollLeft > 10), T1(Z.scrollLeft + Z.clientWidth < Z.scrollWidth - 10);
    } else
      K(!1), T1(!1);
  };
  Nt(() => {
    window.addEventListener("resize", P), document.addEventListener("fullscreenchange", E), document.addEventListener("mousedown", j), window.addEventListener("scroll", X, !0), document.addEventListener("mozfullscreenchange", E), document.addEventListener("webkitfullscreenchange", E), document.addEventListener("msfullscreenchange", E), t && (t.addEventListener("scroll", R), setTimeout(R, 100));
  }), re(() => {
    window.removeEventListener("resize", P), document.removeEventListener("fullscreenchange", E), document.removeEventListener("mousedown", j), window.removeEventListener("scroll", X, !0), document.removeEventListener("mozfullscreenchange", E), document.removeEventListener("webkitfullscreenchange", E), document.removeEventListener("msfullscreenchange", E), t && t.removeEventListener("scroll", R);
  });
  const L1 = Y(() => {
    const Z = e.periods.filter((V) => {
      if (!a() || O())
        return !0;
      const g1 = e.period.text, k1 = u();
      if (V.text === g1 || k1 && V.text === k1)
        return !0;
      if (!k1 || k1 === g1) {
        const s1 = e.periods.find((x1) => x1.text !== g1);
        return V.text === (s1 == null ? void 0 : s1.text);
      }
      return !1;
    }).slice(0, a() && !O() ? 2 : e.periods.length);
    return setTimeout(R, 50), Z;
  });
  let Q1 = e.period.text;
  return S1(() => {
    const Z = e.period.text;
    Z !== Q1 && (a() && (c(Q1), localStorage.setItem("klinechart_secondary_period", Q1)), Q1 = Z), setTimeout(R, 50);
  }), S1(() => {
    O(), setTimeout(R, 100);
  }), S1(() => {
    if (!e.showOrderToolsMenu) {
      $(!1);
      return;
    }
    g() && queueMicrotask(c1);
  }), (() => {
    const Z = mu.cloneNode(!0), V = Z.firstChild, g1 = V.firstChild, k1 = g1.firstChild, s1 = g1.nextSibling, x1 = s1.firstChild;
    return Z.style.setProperty("position", "relative"), Z.style.setProperty("width", "100%"), Z.style.setProperty("display", "flex"), Z.style.setProperty("align-items", "center"), _(Z, k(z, {
      get when() {
        return Y(() => !!a())() && N();
      },
      get children() {
        const C = au.cloneNode(!0);
        return C.$$click = () => t.scrollBy({
          left: -100,
          behavior: "smooth"
        }), C.style.setProperty("position", "absolute"), C.style.setProperty("left", "0"), C.style.setProperty("top", "0"), C.style.setProperty("bottom", "1px"), C.style.setProperty("width", "30px"), C.style.setProperty("display", "flex"), C.style.setProperty("align-items", "center"), C.style.setProperty("justify-content", "center"), C.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), C.style.setProperty("z-index", "10"), C.style.setProperty("cursor", "pointer"), C.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), C;
      }
    }), V), te((C) => {
      t = C;
    }, V), V.style.setProperty("width", "100%"), q1(k1, "click", e.onMenuClick, !0), _(V, k(z, {
      get when() {
        return e.symbol;
      },
      get children() {
        const C = su.cloneNode(!0), U = C.firstChild;
        return q1(C, "click", e.onSymbolClick, !0), _(C, k(z, {
          get when() {
            return e.symbol.logo;
          },
          get children() {
            const J = ou.cloneNode(!0);
            return B(() => v1(J, "src", e.symbol.logo)), J;
          }
        }), U), _(U, () => e.symbol.shortName ?? e.symbol.name ?? e.symbol.ticker), C;
      }
    }), s1), _(V, () => L1().map((C, U) => {
      const J = C.text === e.period.text;
      return (() => {
        const u1 = pu.cloneNode(!0);
        return u1.$$click = (W) => {
          a() && J && !O() ? (e.onMobilePeriodClick ? e.onMobilePeriodClick(C) : e.onMenuClick(), W.stopPropagation()) : e.onPeriodChange(C);
        }, h1(u1, `item period ${J ? "selected" : ""}`), _(u1, () => C.text), u1;
      })();
    }), s1), _(V, k(z, {
      get when() {
        return Y(() => !!(a() && !O()))() && L1().length > 1;
      },
      get children() {
        const C = lu.cloneNode(!0);
        return C.$$click = (U) => {
          U.stopPropagation(), e.onMobilePeriodClick ? e.onMobilePeriodClick(e.period) : e.onMenuClick();
        }, C.style.setProperty("margin-left", "4px"), C.style.setProperty("display", "inline-flex"), C.style.setProperty("align-items", "center"), C;
      }
    }), s1), _(V, k(z, {
      get when() {
        return Y(() => !!a())() && !O();
      },
      get children() {
        const C = cu.cloneNode(!0);
        return C.$$click = (U) => {
          var J;
          U.stopPropagation(), (J = e.onMobileMoreClick) == null || J.call(e);
        }, C.style.setProperty("margin-left", "8px"), C.style.setProperty("display", "inline-flex"), C.style.setProperty("align-items", "center"), C.style.setProperty("cursor", "pointer"), C.style.setProperty("padding", "0 4px"), C;
      }
    }), s1), _(V, k(z, {
      get when() {
        return !a();
      },
      get children() {
        const C = uu.cloneNode(!0), U = C.firstChild, J = U.nextSibling;
        return q1(C, "click", e.onIndicatorClick, !0), _(J, () => o("indicator", e.locale)), C;
      }
    }), s1), s1.style.setProperty("display", "flex"), s1.style.setProperty("gap", "4px"), s1.style.setProperty("margin-left", "auto"), s1.style.setProperty("align-items", "center"), _(s1, k(z, {
      get when() {
        return e.showOrderToolsMenu;
      },
      get children() {
        const C = hu.cloneNode(!0), U = C.firstChild, J = U.firstChild, u1 = J.nextSibling;
        return te((W) => {
          r = W;
        }, C), C.style.setProperty("display", "flex"), C.style.setProperty("align-items", "center"), U.$$click = (W) => {
          W.stopPropagation(), P1();
        }, U.style.setProperty("gap", "6px"), u1.style.setProperty("transition", "transform 0.2s ease"), _(C, k(z, {
          get when() {
            return g();
          },
          get children() {
            return k(R5, {
              get mount() {
                return Q();
              },
              get children() {
                const W = du.cloneNode(!0), b1 = W.firstChild, A1 = b1.firstChild, O1 = A1.nextSibling, K1 = O1.firstChild, W1 = K1.firstChild, j1 = W1.firstChild, Be = K1.nextSibling, I1 = Be.firstChild, _e = I1.firstChild, Ue = b1.nextSibling, oe = Ue.firstChild, Y1 = oe.firstChild, dt = Ue.nextSibling, _1 = dt.nextSibling, w1 = _1.firstChild, D1 = w1.firstChild, N1 = _1.nextSibling, ht = N1.nextSibling, Le = ht.firstChild, se = Le.firstChild;
                return W.addEventListener("mouseleave", () => L(!1)), W.$$mousedown = (I) => I.stopPropagation(), te((I) => {
                  n = I;
                }, W), W.style.setProperty("position", "fixed"), W.style.setProperty("z-index", "9999"), b1.addEventListener("mouseleave", () => L(!1)), A1.$$click = (I) => {
                  I.preventDefault(), I.stopPropagation(), L((D) => !D);
                }, A1.addEventListener("mouseenter", () => L(!0)), O1.addEventListener("mouseenter", () => L(!0)), j1.addEventListener("change", (I) => {
                  var D;
                  (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    quickOrderFloatingWindow: I.currentTarget.checked
                  });
                }), _e.addEventListener("change", (I) => {
                  var D;
                  (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    quickOrderPlusButton: I.currentTarget.checked
                  });
                }), Y1.addEventListener("change", (I) => {
                  var D;
                  (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    openOrders: I.currentTarget.checked
                  });
                }), D1.addEventListener("change", (I) => {
                  var D;
                  (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    positions: I.currentTarget.checked
                  });
                }), se.addEventListener("change", (I) => {
                  var D;
                  (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    orderHistory: I.currentTarget.checked
                  });
                }), B((I) => {
                  const D = `${x().top}px`, y1 = `${x().left}px`, Fe = `${x().minWidth}px`, E1 = `klinecharts-pro-order-tools-group${f() ? " klinecharts-pro-order-tools-group-open" : ""}`;
                  return D !== I._v$ && W.style.setProperty("top", I._v$ = D), y1 !== I._v$2 && W.style.setProperty("left", I._v$2 = y1), Fe !== I._v$3 && W.style.setProperty("width", I._v$3 = Fe), E1 !== I._v$4 && h1(b1, I._v$4 = E1), I;
                }, {
                  _v$: void 0,
                  _v$2: void 0,
                  _v$3: void 0,
                  _v$4: void 0
                }), B(() => {
                  var I, D;
                  return j1.checked = ((I = e.orderToolsState) == null ? void 0 : I.quickOrderFloatingWindow) ?? ((D = e.orderToolsState) == null ? void 0 : D.quickOrder) ?? !0;
                }), B(() => {
                  var I, D;
                  return _e.checked = ((I = e.orderToolsState) == null ? void 0 : I.quickOrderPlusButton) ?? ((D = e.orderToolsState) == null ? void 0 : D.quickOrder) ?? !0;
                }), B(() => {
                  var I;
                  return Y1.checked = ((I = e.orderToolsState) == null ? void 0 : I.openOrders) ?? !0;
                }), B(() => {
                  var I;
                  return D1.checked = ((I = e.orderToolsState) == null ? void 0 : I.positions) ?? !0;
                }), B(() => {
                  var I;
                  return se.checked = ((I = e.orderToolsState) == null ? void 0 : I.orderHistory) ?? !0;
                }), W;
              }
            });
          }
        }), null), B((W) => {
          const b1 = a() ? "0 8px" : "0 10px", A1 = g() ? "rotate(180deg)" : "rotate(0deg)";
          return b1 !== W._v$5 && U.style.setProperty("padding", W._v$5 = b1), A1 !== W._v$6 && u1.style.setProperty("transform", W._v$6 = A1), W;
        }, {
          _v$5: void 0,
          _v$6: void 0
        }), C;
      }
    }), x1), _(s1, k(z, {
      get when() {
        return !a();
      },
      get children() {
        return [(() => {
          const C = yu.cloneNode(!0);
          return q1(C, "click", e.onTimezoneClick, !0), C;
        })(), (() => {
          const C = fu.cloneNode(!0);
          return q1(C, "click", e.onSettingClick, !0), C;
        })()];
      }
    }), x1), _(s1, k(z, {
      get when() {
        return !a();
      },
      get children() {
        const C = Cu.cloneNode(!0);
        return q1(C, "click", e.onScreenshotClick, !0), C;
      }
    }), x1), x1.$$click = () => {
      if (O())
        (document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen).call(document);
      else {
        const C = t == null ? void 0 : t.closest(".klinecharts-pro");
        C && ((C == null ? void 0 : C.requestFullscreen) ?? (C == null ? void 0 : C.webkitRequestFullscreen) ?? (C == null ? void 0 : C.mozRequestFullScreen) ?? (C == null ? void 0 : C.msRequestFullscreen)).call(C);
      }
    }, _(x1, (() => {
      const C = Y(() => !!O());
      return () => C() ? vu.cloneNode(!0) : bu.cloneNode(!0);
    })()), _(Z, k(z, {
      get when() {
        return Y(() => !!a())() && G();
      },
      get children() {
        const C = gu.cloneNode(!0);
        return C.$$click = () => t.scrollBy({
          left: 100,
          behavior: "smooth"
        }), C.style.setProperty("position", "absolute"), C.style.setProperty("right", "0"), C.style.setProperty("top", "0"), C.style.setProperty("bottom", "1px"), C.style.setProperty("width", "30px"), C.style.setProperty("display", "flex"), C.style.setProperty("align-items", "center"), C.style.setProperty("justify-content", "center"), C.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), C.style.setProperty("z-index", "10"), C.style.setProperty("cursor", "pointer"), C.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), C;
      }
    }), null), B((C) => {
      const U = a() ? "auto" : "visible", J = e.spread ? "" : "rotate", u1 = O() ? "0px" : "var(--klinecharts-pro-period-bar-padding-right)";
      return U !== C._v$7 && V.style.setProperty("overflow", C._v$7 = U), J !== C._v$8 && v1(k1, "class", C._v$8 = J), u1 !== C._v$9 && s1.style.setProperty("padding-right", C._v$9 = u1), C;
    }, {
      _v$7: void 0,
      _v$8: void 0,
      _v$9: void 0
    }), Z;
  })();
};
F1(["click", "mousedown"]);
const _u = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M12.41465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L12.41465,12C12.20873,12.5826,11.65311,13,11,13C10.34689,13,9.79127,12.5826,9.58535,12L3.5,12C3.223857,12,3,11.77614,3,11.5C3,11.22386,3.223857,11,3.5,11L9.58535,11C9.79127,10.417404,10.34689,10,11,10C11.65311,10,12.20873,10.417404,12.41465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), Lu = () => _u.cloneNode(!0), ku = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,11L11.08535,11C11.29127,10.417404,11.84689,10,12.5,10C13.15311,10,13.70873,10.417404,13.91465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L13.91465,12C13.70873,12.5826,13.15311,13,12.5,13C11.84689,13,11.29127,12.5826,11.08535,12L6.91465,12C6.70873,12.5826,6.15311,13,5.5,13C4.671573,13,4,12.32843,4,11.5C4,10.671573,4.671573,10,5.5,10C6.15311,10,6.70873,10.417404,6.91465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), xu = () => ku.cloneNode(!0), Au = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,12.5C6.70873,13.0826,6.15311,13.5,5.5,13.5C4.671573,13.5,4,12.82843,4,12C4,11.171573,4.671573,10.5,5.5,10.5C6.15311,10.5,6.70873,10.917404,6.91465,11.5L16.0853,11.5C16.2913,10.917404,16.846899999999998,10.5,17.5,10.5C18.328400000000002,10.5,19,11.171573,19,12C19,12.82843,18.328400000000002,13.5,17.5,13.5C16.846899999999998,13.5,16.2913,13.0826,16.0853,12.5L6.91465,12.5Z" stroke-opacity="0" stroke="none"></path></svg>'), wu = () => Au.cloneNode(!0), Mu = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,12.41465L11,18.5C11,18.7761,11.22386,19,11.5,19C11.77614,19,12,18.7761,12,18.5L12,12.41465C12.5826,12.20873,13,11.65311,13,11C13,10.34689,12.5826,9.79127,12,9.58535L12,3.5C12,3.223857,11.77614,3,11.5,3C11.22386,3,11,3.223857,11,3.5L11,9.58535C10.417404,9.79127,10,10.34689,10,11C10,11.65311,10.417404,12.20873,11,12.41465Z" stroke-opacity="0" stroke="none"></path></svg>'), Su = () => Mu.cloneNode(!0), Tu = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.66558837890625,19C10.83716137890625,19,10.16558837890625,18.328400000000002,10.16558837890625,17.5C10.16558837890625,16.846899999999998,10.58298437890625,16.2913,11.16557337890625,16.0854L11.16557337890625,11.91464C10.58298437890625,11.70872,10.16558837890625,11.1531,10.16558837890625,10.5C10.16558837890625,9.8469,10.58298437890625,9.29128,11.16557337890625,9.08536L11.16557337890625,4.5C11.16557337890625,4.223857,11.38942837890625,4,11.66556837890625,4C11.94171837890625,4,12.16556837890625,4.223857,12.16556837890625,4.5L12.16556837890625,9.08535C12.74817837890625,9.291260000000001,13.16558837890625,9.846879999999999,13.16558837890625,10.5C13.16558837890625,11.153120000000001,12.74817837890625,11.708739999999999,12.16556837890625,11.91465L12.16556837890625,16.0854C12.74817837890625,16.2913,13.16558837890625,16.846899999999998,13.16558837890625,17.5C13.16558837890625,18.328400000000002,12.49401837890625,19,11.66558837890625,19Z" stroke-opacity="0" stroke="none"></path></svg>'), Pu = () => Tu.cloneNode(!0), Ou = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.165603637695312,6.91465C11.748203637695312,6.70873,12.165603637695312,6.15311,12.165603637695312,5.5C12.165603637695312,4.671573,11.494033637695313,4,10.665603637695312,4C9.837176637695313,4,9.165603637695312,4.671573,9.165603637695312,5.5C9.165603637695312,6.15311,9.583007637695312,6.70873,10.165603637695312,6.91465L10.165603637695312,16.0854C9.583007637695312,16.2913,9.165603637695312,16.846899999999998,9.165603637695312,17.5C9.165603637695312,18.328400000000002,9.837176637695313,19,10.665603637695312,19C11.494033637695313,19,12.165603637695312,18.328400000000002,12.165603637695312,17.5C12.165603637695312,16.846899999999998,11.748203637695312,16.2913,11.165603637695312,16.0854L11.165603637695312,6.91465Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Iu = () => Ou.cloneNode(!0), Du = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.146447,15.753C4.9511845,15.9483,4.9511845,16.2649,5.146447,16.4602C5.341709,16.6554,5.658291,16.6554,5.853554,16.4602L8.156600000000001,14.15711C8.352409999999999,14.25082,8.57173,14.3033,8.8033,14.3033C9.631730000000001,14.3033,10.3033,13.63172,10.3033,12.80329C10.3033,12.57172,10.250820000000001,12.352409999999999,10.157119999999999,12.15659L12.156600000000001,10.15711C12.352409999999999,10.250820000000001,12.571729999999999,10.30329,12.8033,10.30329C13.63173,10.30329,14.3033,9.63172,14.3033,8.80329C14.3033,8.57172,14.25082,8.352409999999999,14.15712,8.15659L16.4602,5.853553C16.6554,5.658291,16.6554,5.341709,16.4602,5.146447C16.2649,4.9511843,15.9483,4.9511843,15.753,5.146447L13.45001,7.449479999999999C13.25419,7.35577,13.03487,7.3032900000000005,12.8033,7.3032900000000005C11.97487,7.3032900000000005,11.3033,7.97487,11.3033,8.80329C11.3033,9.03487,11.35578,9.254190000000001,11.44949,9.450009999999999L9.450009999999999,11.449480000000001C9.254190000000001,11.35577,9.03487,11.30329,8.8033,11.30329C7.97487,11.30329,7.3033,11.97487,7.3033,12.80329C7.3033,13.03487,7.35578,13.25419,7.44949,13.45001L5.146447,15.753Z" stroke-opacity="0" stroke="none"></path></svg>'), Nu = () => Du.cloneNode(!0), Eu = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M7.573332939453125,14.54567903564453C7.667042939453125,14.741499035644532,7.719512939453125,14.960809035644532,7.719512939453125,15.19239903564453C7.719512939453125,16.02079903564453,7.047942939453125,16.69239903564453,6.219512939453125,16.69239903564453C5.391085939453125,16.69239903564453,4.719512939453125,16.02079903564453,4.719512939453125,15.19239903564453C4.719512939453125,14.36394903564453,5.391085939453125,13.692379035644532,6.219512939453125,13.692379035644532C6.451092939453125,13.692379035644532,6.670412939453125,13.74485903564453,6.866232939453125,13.83856903564453L9.865702939453126,10.83909903564453C9.771992939453124,10.643279035644532,9.719512939453125,10.42395903564453,9.719512939453125,10.192379035644532C9.719512939453125,9.36394903564453,10.391082939453124,8.692379035644532,11.219512939453125,8.692379035644532C11.451092939453126,8.692379035644532,11.670412939453126,8.74485903564453,11.866232939453125,8.838569035644532L15.462112939453124,5.242645035644531C15.657412939453126,5.047383335644532,15.974012939453125,5.047383335644532,16.169212939453125,5.242645035644531C16.364512939453125,5.437907035644531,16.364512939453125,5.754489035644531,16.169212939453125,5.949752035644531L12.573332939453124,9.545679035644532C12.667042939453125,9.74149903564453,12.719512939453125,9.96080903564453,12.719512939453125,10.192379035644532C12.719512939453125,11.020809035644533,12.047942939453126,11.692379035644532,11.219512939453125,11.692379035644532C10.987942939453125,11.692379035644532,10.768632939453125,11.639909035644532,10.572812939453126,11.54619903564453L7.573332939453125,14.54567903564453Z" stroke-opacity="0" stroke="none"></path></svg>'), Bu = () => Eu.cloneNode(!0), Uu = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M15.719512939453125,8.461776733398438C16.547912939453127,8.461776733398438,17.219512939453125,7.7902067333984375,17.219512939453125,6.9617767333984375C17.219512939453125,6.133349733398438,16.547912939453127,5.4617767333984375,15.719512939453125,5.4617767333984375C14.891082939453124,5.4617767333984375,14.219512939453125,6.133349733398438,14.219512939453125,6.9617767333984375C14.219512939453125,7.193346733398437,14.271992939453124,7.412666733398438,14.365692939453124,7.608486733398438L7.366222939453126,14.607956733398437C7.170402939453125,14.514256733398437,6.951082939453125,14.461776733398438,6.719512939453125,14.461776733398438C5.891085939453125,14.461776733398438,5.219512939453125,15.133346733398437,5.219512939453125,15.961776733398438C5.219512939453125,16.79017673339844,5.891085939453125,17.461776733398438,6.719512939453125,17.461776733398438C7.547942939453125,17.461776733398438,8.219512939453125,16.79017673339844,8.219512939453125,15.961776733398438C8.219512939453125,15.730176733398437,8.167032939453126,15.510876733398437,8.073322939453124,15.315066733398437L15.072802939453124,8.315586733398437C15.268612939453124,8.409296733398438,15.487912939453125,8.461776733398438,15.719512939453125,8.461776733398438Z" stroke-opacity="0" stroke="none"></path></svg>'), Fu = () => Uu.cloneNode(!0), Ku = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17.0643,7.033864912109375L18,3.585784912109375L14.5078,4.509695912109375L15.3537,5.344934912109375L6.02026,14.560584912109375C5.87635,14.517484912109374,5.72366,14.494284912109375,5.5655,14.494284912109375C4.7009,14.494284912109375,4,15.186384912109375,4,16.040084912109375C4,16.893784912109375,4.7009,17.585784912109375,5.5655,17.585784912109375C6.43011,17.585784912109375,7.13101,16.893784912109375,7.13101,16.040084912109375C7.13101,15.722284912109375,7.03392,15.426984912109376,6.86744,15.181384912109374L16.0917,6.073604912109375L17.0643,7.033864912109375Z" stroke-opacity="0" stroke="none"></path></svg>'), ju = () => Ku.cloneNode(!0), zu = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,13.00505L18.5,13.00505C18.7761,13.00505,19,13.228909999999999,19,13.50505C19,13.781189999999999,18.7761,14.00505,18.5,14.00505L6.91465,14.00505C6.70873,14.58765,6.15311,15.00505,5.5,15.00505C4.671573,15.00505,4,14.33348,4,13.50505C4,12.67662,4.671573,12.00505,5.5,12.00505C6.15311,12.00505,6.70873,12.422450000000001,6.91465,13.00505ZM7.81404,11.625L10.48591,11.625L10.48591,10.90625L9.65193,10.90625L9.65193,7.125L8.997630000000001,7.125C8.71443,7.306641,8.415600000000001,7.419922,7.96443,7.498047L7.96443,8.05078L8.77497,8.05078L8.77497,10.90625L7.81404,10.90625L7.81404,11.625ZM11.081620000000001,11.625L14.0562,11.625L14.0562,10.88281L13.09724,10.88281C12.8863,10.88281,12.59333,10.90625,12.36482,10.93555C13.17537,10.11328,13.84724,9.2207,13.84724,8.39062C13.84724,7.541016,13.28865,7,12.4488,7C11.84333,7,11.446850000000001,7.234375,11.03279,7.679688L11.52497,8.16797C11.747630000000001,7.914062,12.0113,7.697266,12.33552,7.697266C12.7613,7.697266,13.00154,7.982422,13.00154,8.43359C13.00154,9.14648,12.29255,10.00781,11.081620000000001,11.11523L11.081620000000001,11.625ZM15.9605,11.75C16.8121,11.75,17.526899999999998,11.2832,17.526899999999998,10.4375C17.526899999999998,9.82031,17.142200000000003,9.43945,16.6441,9.30078L16.6441,9.27148C17.1129,9.08594,17.3824,8.7207,17.3824,8.21289C17.3824,7.421875,16.8004,7,15.9429,7C15.4215,7,14.9957,7.210938,14.6109,7.541016L15.066,8.11133C15.3258,7.849609,15.5836,7.697266,15.9019,7.697266C16.2789,7.697266,16.4957,7.914062,16.4957,8.28125C16.4957,8.70898,16.2301,9,15.4215,9L15.4215,9.63672C16.3804,9.63672,16.6383,9.91992,16.6383,10.38086C16.6383,10.79688,16.3336,11.03125,15.8824,11.03125C15.4742,11.03125,15.1578,10.82227,14.8922,10.55078L14.4781,11.13281C14.7906,11.486329999999999,15.2652,11.75,15.9605,11.75Z" stroke-opacity="0" stroke="none"></path></svg>'), Qu = () => zu.cloneNode(!0), Zu = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.146447,14.178126025390625C2.9511847,13.982826025390626,2.9511847,13.666226025390625,3.146447,13.470926025390625L7.39146,9.225966025390626C7.35417,9.095106025390624,7.33421,8.956946025390625,7.33421,8.814116025390625C7.33421,7.985696025390625,8.00578,7.314116025390625,8.834209999999999,7.314116025390625C8.97703,7.314116025390625,9.11519,7.334086025390625,9.24605,7.371366025390625L13.753,2.864373025390625C13.9483,2.669110325390625,14.2649,2.669110325390625,14.4602,2.864373025390625C14.6554,3.059635025390625,14.6554,3.376217025390625,14.4602,3.571479025390625L10.06916,7.962476025390625C10.23631,8.204386025390626,10.334209999999999,8.497826025390625,10.334209999999999,8.814116025390625C10.334209999999999,9.642546025390626,9.66264,10.314116025390625,8.834209999999999,10.314116025390625C8.51791,10.314116025390625,8.22448,10.216226025390625,7.98256,10.049076025390626L3.853554,14.178126025390625C3.658291,14.373326025390625,3.341709,14.373326025390625,3.146447,14.178126025390625ZM7.67736,19.188526025390626C7.4821,18.993226025390626,7.4821,18.676626025390625,7.67736,18.481426025390626L9.9804,16.178326025390625C9.88669,15.982526025390625,9.834209999999999,15.763226025390624,9.834209999999999,15.531626025390626C9.834209999999999,14.703226025390626,10.50578,14.031626025390626,11.33421,14.031626025390626C11.56579,14.031626025390626,11.78511,14.084126025390624,11.98093,14.177826025390624L13.9804,12.178356025390626C13.8867,11.982536025390624,13.8342,11.763216025390625,13.8342,11.531636025390625C13.8342,10.703206025390624,14.5058,10.031636025390625,15.3342,10.031636025390625C15.5658,10.031636025390625,15.7851,10.084116025390625,15.9809,10.177826025390626L18.284,7.874796025390625C18.4792,7.679536025390625,18.7958,7.679536025390625,18.9911,7.874796025390625C19.1863,8.070056025390624,19.1863,8.386636025390626,18.9911,8.581906025390625L16.688000000000002,10.884936025390624C16.7817,11.080756025390626,16.8342,11.300066025390626,16.8342,11.531636025390625C16.8342,12.360066025390624,16.162599999999998,13.031626025390626,15.3342,13.031626025390626C15.1026,13.031626025390626,14.8833,12.979126025390626,14.6875,12.885426025390625L12.68803,14.884926025390625C12.78174,15.080726025390625,12.83421,15.300026025390626,12.83421,15.531626025390626C12.83421,16.360026025390624,12.16264,17.031626025390626,11.33421,17.031626025390626C11.10264,17.031626025390626,10.88333,16.979126025390627,10.68751,16.885426025390625L8.38446,19.188526025390626C8.1892,19.383726025390626,7.87262,19.383726025390626,7.67736,19.188526025390626Z" stroke-opacity="0" stroke="none"></path></svg>'), Ru = () => Zu.cloneNode(!0), Vu = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.3367688759765626,12.63173C3.5320318759765623,12.82699,3.8486138759765627,12.82699,4.043876875976562,12.63173L11.822052875976562,4.853553C12.017312875976563,4.658291,12.017312875976563,4.341708,11.822052875976562,4.146446C11.626792875976562,3.9511843,11.310202875976563,3.9511843,11.114942875976563,4.146446L3.3367688759765626,11.92462C3.1415071759765625,12.11988,3.1415071759765625,12.43647,3.3367688759765626,12.63173ZM5.001492875976562,17.0351C4.806232875976562,16.8399,4.806232875976562,16.5233,5.001492875976562,16.328L7.304532875976562,14.025C7.210822875976563,13.82916,7.158352875976563,13.60984,7.158352875976563,13.37827C7.158352875976563,12.54984,7.829922875976562,11.87827,8.658352875976561,11.87827C8.889922875976563,11.87827,9.109232875976563,11.93075,9.305052875976562,12.02446L11.304532875976562,10.02498C11.210822875976563,9.82916,11.158352875976561,9.60984,11.158352875976561,9.37827C11.158352875976561,8.54984,11.829922875976562,7.8782700000000006,12.658352875976563,7.8782700000000006C12.889922875976563,7.8782700000000006,13.109232875976563,7.93075,13.305022875976562,8.024460000000001L15.608122875976562,5.72142C15.803322875976562,5.5261499999999995,16.119922875976563,5.5261499999999995,16.315222875976563,5.72142C16.510422875976563,5.9166799999999995,16.510422875976563,6.23326,16.315222875976563,6.42852L14.012122875976562,8.73156C14.105822875976562,8.92738,14.158322875976562,9.1467,14.158322875976562,9.37827C14.158322875976562,10.2067,13.486822875976562,10.87827,12.658352875976563,10.87827C12.426772875976562,10.87827,12.207452875976562,10.82579,12.011642875976563,10.73209L10.012162875976562,12.73156C10.105872875976562,12.92738,10.158352875976561,13.1467,10.158352875976561,13.37827C10.158352875976561,14.2067,9.486772875976563,14.8783,8.658352875976561,14.8783C8.426772875976562,14.8783,8.207452875976562,14.8258,8.011642875976563,14.7321L5.708602875976562,17.0351C5.513342875976562,17.2304,5.196752875976562,17.2304,5.001492875976562,17.0351ZM10.415712875976563,18.328C10.220452875976562,18.5233,9.903862875976563,18.5233,9.708602875976563,18.328C9.513342875976562,18.1328,9.513342875976562,17.816200000000002,9.708602875976563,17.6209L12.304532875976562,15.025C12.210822875976563,14.8292,12.158352875976563,14.6098,12.158352875976563,14.3783C12.158352875976563,13.54984,12.829922875976562,12.87827,13.658322875976562,12.87827C13.889922875976563,12.87827,14.109222875976563,12.93075,14.305022875976562,13.02446L17.486822875976564,9.84274C17.682022875976564,9.64747,17.99862287597656,9.64747,18.19392287597656,9.84274C18.38912287597656,10.038,18.38912287597656,10.35458,18.19392287597656,10.54984L15.012122875976562,13.73156C15.105822875976562,13.92738,15.158322875976562,14.1467,15.158322875976562,14.3783C15.158322875976562,15.2067,14.486822875976562,15.8783,13.658322875976562,15.8783C13.426822875976562,15.8783,13.207422875976562,15.8258,13.011642875976563,15.7321L10.415712875976563,18.328Z" stroke-opacity="0" stroke="none"></path></svg>'), Hu = () => Vu.cloneNode(!0), Yu = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M13.1889,6C12.98303,6.582599999999999,12.42741,7,11.7743,7C11.12119,7,10.565570000000001,6.582599999999999,10.35965,6L3.5,6C3.223857,6,3,5.77614,3,5.5C3,5.22386,3.223857,5,3.5,5L10.35965,5C10.565570000000001,4.417404,11.12119,4,11.7743,4C12.42741,4,12.98303,4.417404,13.1889,5L18.5,5C18.7761,5,19,5.22386,19,5.5C19,5.77614,18.7761,6,18.5,6L13.1889,6ZM3,8.5C3,8.22386,3.223857,8,3.5,8L18.5,8C18.7761,8,19,8.22386,19,8.5C19,8.77614,18.7761,9,18.5,9L3.5,9C3.223857,9,3,8.77614,3,8.5ZM3.278549,11.5C3.278549,11.22386,3.502407,11,3.778549,11L18.7785,11C19.0547,11,19.2785,11.22386,19.2785,11.5C19.2785,11.77614,19.0547,12,18.7785,12L3.778549,12C3.502407,12,3.278549,11.77614,3.278549,11.5ZM3.139267,14.5C3.139267,14.2239,3.363124,14,3.6392670000000003,14L18.6393,14C18.915399999999998,14,19.1393,14.2239,19.1393,14.5C19.1393,14.7761,18.915399999999998,15,18.6393,15L3.6392670000000003,15C3.363124,15,3.139267,14.7761,3.139267,14.5ZM13.1889,18C12.98303,18.5826,12.42741,19,11.7743,19C11.12119,19,10.565570000000001,18.5826,10.35965,18L3.778549,18C3.502407,18,3.278549,17.7761,3.278549,17.5C3.278549,17.2239,3.502407,17,3.778549,17L10.35965,17C10.565570000000001,16.4174,11.12119,16,11.7743,16C12.42741,16,12.98303,16.4174,13.1889,17L18.7785,17C19.0547,17,19.2785,17.2239,19.2785,17.5C19.2785,17.7761,19.0547,18,18.7785,18L13.1889,18Z" stroke-opacity="0" stroke="none"></path></svg>'), qu = () => Yu.cloneNode(!0), Gu = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4.91465,6C4.70873,6.582599999999999,4.15311,7,3.5,7C2.671573,7,2,6.32843,2,5.5C2,4.671573,2.671573,4,3.5,4C4.15311,4,4.70873,4.417404,4.91465,5L18.2257,5C18.5018,5,18.7257,5.22386,18.7257,5.5C18.7257,5.77614,18.5018,6,18.2257,6L4.91465,6ZM2.7257,8.5C2.7257,8.22386,2.949558,8,3.2257,8L18.2257,8C18.5018,8,18.7257,8.22386,18.7257,8.5C18.7257,8.77614,18.5018,9,18.2257,9L3.2257,9C2.949558,9,2.7257,8.77614,2.7257,8.5ZM3.00425,11.5C3.00425,11.22386,3.22811,11,3.50425,11L18.5042,11C18.7804,11,19.0042,11.22386,19.0042,11.5C19.0042,11.77614,18.7804,12,18.5042,12L3.50425,12C3.22811,12,3.00425,11.77614,3.00425,11.5ZM2.864967,14.5C2.864967,14.2239,3.08882,14,3.36497,14L18.365,14C18.6411,14,18.865,14.2239,18.865,14.5C18.865,14.7761,18.6411,15,18.365,15L3.36497,15C3.08882,15,2.864967,14.7761,2.864967,14.5ZM20,17.5C20,18.328400000000002,19.3284,19,18.5,19C17.846899999999998,19,17.2913,18.5826,17.0854,18L3.50425,18C3.22811,18,3.00425,17.7761,3.00425,17.5C3.00425,17.2239,3.22811,17,3.50425,17L17.0854,17C17.2913,16.4174,17.846899999999998,16,18.5,16C19.3284,16,20,16.671599999999998,20,17.5Z" stroke-opacity="0" stroke="none"></path></svg>'), Wu = () => Gu.cloneNode(!0), Xu = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="5" ry="5" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="3" ry="3" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse></svg>'), Ju = () => Xu.cloneNode(!0), ed = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3,7.32468C5.90649,3.3893050000000002,11.49833,2.81306,14.6674,6.31944C14.9056,6.1554199999999994,15.192,6.05979,15.5,6.05979C15.845,6.05979,16.1628,6.17974,16.4162,6.381349999999999L18.4509,4.23827L19,4.816615L16.8945,7.03429C16.962600000000002,7.21075,17,7.40319,17,7.60463C17,8.45782,16.328400000000002,9.14947,15.5,9.14947C14.6716,9.14947,14,8.45782,14,7.60463C14,7.36402,14.0534,7.13625,14.1487,6.93322C11.32695,3.748365,6.25159,4.253956,3.612785,7.82695L3,7.32468ZM14.09,15.4717C15.7427,13.78985,16.244500000000002,11.524740000000001,15.5633,9.30134L15.5618,9.30134L16.3012,9.0502C17.072400000000002,11.56646,16.497700000000002,14.158,14.6282,16.0599C12.28737,18.442,8.62386,18.6988,6.41348,16.4501C4.5526,14.5572,4.52076,11.19671,6.36766,9.3177C7.89069,7.76754,10.07544,7.706189999999999,11.56741,9.22363C11.95453,9.61742,12.24817,10.08363,12.43369,10.57677L14.1451,8.77421L14.6942,9.35256L12.64982,11.50582C12.65827,11.59712,12.66295,11.68839,12.66378,11.77936C12.87398,12.04523,13,12.38451,13,12.7541C13,13.60729,12.32843,14.2989,11.5,14.2989C10.67157,14.2989,10,13.60729,10,12.7541C10,11.90091,10.67157,11.20926,11.5,11.20926C11.60387,11.20926,11.70528,11.220130000000001,11.8032,11.240829999999999L11.81763,11.22564C11.69858,10.71874,11.42858,10.21929,11.0284,9.81179C9.844000000000001,8.60765,8.136890000000001,8.65592,6.90822,9.90586C5.37975,11.460930000000001,5.40693,14.288,6.95404,15.8619C8.84598,17.7867,12.03496,17.5626,14.09,15.4717Z" stroke-opacity="0" stroke="none"></path></svg>'), td = () => ed.cloneNode(!0), rd = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4,17.0854L4,3.5C4,3.223858,4.22386,3,4.5,3C4.77614,3,5,3.223858,5,3.5L5,10L7.57584,10L9.8127,4.46359C9.91614,4.20756,10.20756,4.08386,10.46359,4.1873000000000005C10.71963,4.29075,10.84333,4.58216,10.73988,4.8382000000000005L8.65438,10L11.08535,10C11.29127,9.4174,11.84689,9,12.5,9C12.65154,9,12.79784,9.02247,12.93573,9.06427L16.6464,5.35355C16.8417,5.15829,17.1583,5.15829,17.3536,5.35355C17.5488,5.54882,17.5488,5.8654,17.3536,6.06066L13.7475,9.66675C13.907,9.90508,14,10.19168,14,10.5C14,11.15311,13.5826,11.70873,13,11.91465L13,14.3638L18.3714,12.1936C18.6274,12.09015,18.918799999999997,12.21385,19.0222,12.46989C19.1257,12.72592,19.002,13.0173,18.746000000000002,13.1208L13,15.4423L13,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854ZM6.3729499999999994,17.0413L12,14.7678L12,11.91465C11.88136,11.87271,11.76956,11.81627,11.66675,11.74746L6.3729499999999994,17.0413ZM12,15.8463L6.6694700000000005,18L12,18L12,15.8463ZM6.38629,15.6137L8.250350000000001,11L11,11L6.38629,15.6137ZM5,11L7.17182,11L5,16.3754L5,11Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), nd = () => rd.cloneNode(!0), id = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17,4.5C17,5.32843,16.328400000000002,6,15.5,6C15.0931,6,14.7241,5.83802,14.4539,5.57503L5.98992,8.32515C5.99658,8.38251,6,8.440850000000001,6,8.5C6,9.15311,5.582599999999999,9.70873,5,9.91465L5,11.08535C5.42621,11.236,5.763999999999999,11.57379,5.91465,12L19.5,12C19.7761,12,20,12.22386,20,12.5C20,12.77614,19.7761,13,19.5,13L5.91465,13C5.70873,13.5826,5.15311,14,4.5,14C3.671573,14,3,13.3284,3,12.5C3,11.84689,3.417404,11.29127,4,11.08535L4,9.91465C3.417404,9.70873,3,9.15311,3,8.5C3,7.67157,3.671573,7,4.5,7C4.90411,7,5.2709,7.15981,5.5406200000000005,7.41967L14.0093,4.66802C14.0032,4.6128599999999995,14,4.5568,14,4.5C14,3.671573,14.6716,3,15.5,3C16.328400000000002,3,17,3.671573,17,4.5ZM4,15.5C4,15.2239,4.22386,15,4.5,15L19.5,15C19.7761,15,20,15.2239,20,15.5C20,15.7761,19.7761,16,19.5,16L4.5,16C4.22386,16,4,15.7761,4,15.5ZM4,18.5C4,18.2239,4.22386,18,4.5,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L4.5,19C4.22386,19,4,18.7761,4,18.5Z" stroke-opacity="0" stroke="none"></path></svg>'), ad = () => id.cloneNode(!0), od = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M20,3.5C20,4.15311,19.5826,4.70873,19,4.91465L19,18.5C19,18.7761,18.7761,19,18.5,19L4.91465,19C4.70873,19.5826,4.15311,20,3.5,20C2.671573,20,2,19.3284,2,18.5C2,17.846899999999998,2.417404,17.2913,3,17.0854L3,3.5C3,3.22386,3.22386,3,3.5,3L17.0854,3C17.2913,2.417404,17.846899999999998,2,18.5,2C19.3284,2,20,2.671573,20,3.5ZM17.0854,4C17.236,4.42621,17.5738,4.763999999999999,18,4.91465L18,8L14,8L14,4L17.0854,4ZM13,4L13,8L9,8L9,4L13,4ZM13,9L9,9L9,13L13,13L13,9ZM13,14L9,14L9,18L13,18L13,14ZM14,18L14,14L18,14L18,18L14,18ZM18,13L14,13L14,9L18,9L18,13ZM4.91465,18C4.763999999999999,17.5738,4.42621,17.236,4,17.0854L4,14L8,14L8,18L4.91465,18ZM4,8L4,4L8,4L8,8L4,8ZM8,9L8,13L4,13L4,9L8,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), sd = () => od.cloneNode(!0), ld = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" fill="none" stroke-opacity="1" stroke-width="1"></ellipse></svg>'), cd = () => ld.cloneNode(!0), ud = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.57625,6.9981C11.55099,6.999359999999999,11.52557,7,11.5,7C11.34,7,11.18584,6.97495,11.04125,6.9285499999999995L5.55401,16.4327C5.713760000000001,16.5905,5.83826,16.7839,5.91465,17L16.0854,17C16.2187,16.622700000000002,16.4987,16.314700000000002,16.8569,16.1445L11.57625,6.9981ZM12.50759,6.611219999999999C12.81005,6.336790000000001,13,5.94058,13,5.5C13,4.671573,12.32843,4,11.5,4C10.67157,4,10,4.671573,10,5.5C10,5.80059,10.08841,6.08052,10.24066,6.31522L4.64514,16.0069C4.59738,16.002299999999998,4.54896,16,4.5,16C3.671573,16,3,16.671599999999998,3,17.5C3,18.328400000000002,3.671573,19,4.5,19C5.15311,19,5.70873,18.5826,5.91465,18L16.0854,18C16.2913,18.5826,16.846899999999998,19,17.5,19C18.328400000000002,19,19,18.328400000000002,19,17.5C19,16.8365,18.5691,16.2735,17.971899999999998,16.075699999999998L12.50759,6.611219999999999Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), dd = () => ud.cloneNode(!0), hd = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19,4.5C19,5.15311,18.5826,5.70873,18,5.91465L18,18.5C18,18.7761,17.7761,19,17.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854L4,4.5C4,4.22386,4.22386,4,4.5,4L16.0854,4C16.2913,3.417404,16.846899999999998,3,17.5,3C18.328400000000002,3,19,3.671573,19,4.5ZM5,5L16.0854,5C16.236,5.42621,16.5738,5.763999999999999,17,5.91465L17,18L5.91465,18C5.763999999999999,17.5738,5.42621,17.236,5,17.0854L5,5Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), yd = () => hd.cloneNode(!0), fd = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19.6401,7.99355C20.4028,7.92291,21,7.2811900000000005,21,6.5C21,5.671573,20.3284,5,19.5,5C18.8469,5,18.2913,5.417404,18.0854,6L7.62067,6C7.34453,6,7.12067,6.22386,7.12067,6.5C7.12067,6.5479,7.12741,6.59423,7.13999,6.63809L3.2294099999999997,15.0243C2.530138,15.1517,2,15.764,2,16.5C2,17.328400000000002,2.671573,18,3.5,18C4.15311,18,4.70873,17.5826,4.91465,17L14.5963,17C14.6456,17.076,14.7162,17.1396,14.8044,17.1807C15.0546,17.2974,15.3521,17.1891,15.4688,16.9388L19.6401,7.99355ZM14.7896,16.0293L18.6551,7.739599999999999C18.3942,7.56144,18.1925,7.30307,18.0854,7L8.0746,7L4.25044,15.2009C4.55701,15.3784,4.79493,15.6613,4.91465,16L14.6207,16C14.68,16,14.7368,16.0103,14.7896,16.0293Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Cd = () => fd.cloneNode(!0), gd = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.134443814697265,7.494615087890625L8.764323814697265,7.494615087890625L8.764323814697265,3.414215087890625L8.310223814697267,3.414215087890625L7.294603814697266,4.005035087890625L7.289713814697266,4.634915087890625L8.134443814697265,4.149892087890625L8.134443814697265,7.494615087890625ZM18.832003814697266,6.933095087890624Q19.004603814697266,6.635245087890625,19.004603814697266,6.2543850878906255Q19.004603814697266,5.884915087890625,18.845103814697264,5.593575087890625Q18.685503814697267,5.3006050878906255,18.399103814697266,5.136225087890625Q18.114303814697266,4.9702050878906245,17.754603814697266,4.9653250878906245L18.820603814697265,3.840647087890625L18.820603814697265,3.414215087890625L16.519203814697264,3.414215087890625L16.519203814697264,3.939931087890625L18.050803814697264,3.939931087890625L16.719403814697266,5.334785087890625L17.074203814697263,5.7205350878906245Q17.254903814697265,5.484525087890625,17.619503814697268,5.484525087890625Q17.980803814697268,5.484525087890625,18.187503814697266,5.689605087890625Q18.394203814697267,5.894685087890625,18.394203814697267,6.2543850878906255Q18.394203814697267,6.604315087890625,18.187503814697266,6.822415087890625Q17.980803814697268,7.0405150878906255,17.640603814697265,7.0405150878906255Q17.334603814697267,7.0405150878906255,17.124703814697266,6.890775087890625Q16.914703814697265,6.739415087890626,16.820303814697265,6.469225087890624L16.354803814697263,6.744295087890626Q16.480103814697266,7.125155087890625,16.821903814697265,7.341625087890625Q17.165403814697264,7.559725087890625,17.640603814697265,7.559725087890625Q18.039403814697266,7.559725087890625,18.348603814697267,7.393705087890625Q18.659503814697267,7.229315087890625,18.832003814697266,6.933095087890624ZM10.000003814697266,10.634915087890626C10.000003814697266,11.024655087890626,9.851363814697265,11.379685087890625,9.607683814697266,11.646395087890625L12.168903814697266,15.171615087890626C12.275403814697265,15.147615087890625,12.386203814697266,15.134915087890626,12.500003814697266,15.134915087890626C12.596503814697266,15.134915087890626,12.690803814697265,15.144015087890624,12.782303814697265,15.161415087890624L16.108803814697268,11.196955087890625C16.038703814697264,11.023375087890624,16.000003814697266,10.833655087890625,16.000003814697266,10.634915087890626C16.000003814697266,9.806495087890625,16.671603814697264,9.134915087890626,17.500003814697266,9.134915087890626C18.328403814697264,9.134915087890626,19.000003814697266,9.806495087890625,19.000003814697266,10.634915087890626C19.000003814697266,11.463345087890625,18.328403814697264,12.134915087890626,17.500003814697266,12.134915087890626C17.239503814697265,12.134915087890626,16.994503814697268,12.068495087890625,16.781003814697264,11.951675087890624L13.654703814697266,15.677415087890624C13.870303814697266,15.937215087890625,14.000003814697266,16.270915087890625,14.000003814697266,16.634915087890626C14.000003814697266,17.463315087890624,13.328403814697266,18.134915087890626,12.500003814697266,18.134915087890626C11.671573814697265,18.134915087890626,11.000003814697266,17.463315087890624,11.000003814697266,16.634915087890626C11.000003814697266,16.284415087890626,11.120193814697265,15.962015087890626,11.321603814697266,15.706715087890625L8.715393814697265,12.119565087890624C8.645053814697267,12.129685087890625,8.573143814697266,12.134915087890626,8.500003814697266,12.134915087890626C8.162103814697264,12.134915087890626,7.8503038146972655,12.023195087890626,7.599523814697266,11.834665087890626L4.505583814697266,15.521915087890624C4.809213814697266,15.796415087890624,5.000003814697266,16.193415087890624,5.000003814697266,16.634915087890626C5.000003814697266,17.463315087890624,4.328433814697266,18.134915087890626,3.5000038146972656,18.134915087890626C2.6715768146972656,18.134915087890626,2.0000038146972656,17.463315087890624,2.0000038146972656,16.634915087890626C2.0000038146972656,15.806515087890626,2.6715768146972656,15.134915087890626,3.5000038146972656,15.134915087890626C3.508253814697266,15.134915087890626,3.5164838146972657,15.135015087890626,3.524703814697266,15.135115087890625L7.033823814697266,10.953115087890625C7.011673814697265,10.850565087890626,7.000003814697266,10.744105087890624,7.000003814697266,10.634915087890626C7.000003814697266,9.806495087890625,7.671573814697266,9.134915087890626,8.500003814697266,9.134915087890626C9.328433814697267,9.134915087890626,10.000003814697266,9.806495087890625,10.000003814697266,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), md = () => gd.cloneNode(!0), pd = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.13444,7.494615087890625L8.76432,7.494615087890625L8.76432,3.414215087890625L8.310220000000001,3.414215087890625L7.2946,4.005035087890625L7.28971,4.634915087890625L8.13444,4.149892087890625L8.13444,7.494615087890625ZM18.832,6.929835087890625Q19.0046,6.635245087890625,19.0046,6.2543850878906255Q19.0046,5.889805087890625,18.8451,5.5952050878906245Q18.6855,5.3006050878906255,18.3975,5.132965087890625Q18.1094,4.9653250878906245,17.7399,4.9653250878906245Q17.435499999999998,4.9653250878906245,17.1556,5.149245087890625L17.2793,3.939931087890625L18.8304,3.939931087890625L18.8304,3.414215087890625L16.7406,3.414215087890625L16.5094,5.665195087890625L17.0156,5.795405087890625Q17.095399999999998,5.655425087890626,17.2516,5.570795087890625Q17.4095,5.484525087890625,17.6357,5.484525087890625Q17.9694,5.484525087890625,18.1842,5.697745087890625Q18.4007,5.909335087890625,18.4007,6.2543850878906255Q18.4007,6.604315087890625,18.1842,6.822415087890625Q17.9694,7.0405150878906255,17.6292,7.0405150878906255Q17.3298,7.0405150878906255,17.119799999999998,6.890775087890625Q16.9098,6.739415087890626,16.825200000000002,6.474115087890625L16.3597,6.749175087890626Q16.470399999999998,7.110505087890624,16.807299999999998,7.335115087890625Q17.144199999999998,7.559725087890625,17.6292,7.559725087890625Q18.0296,7.559725087890625,18.3438,7.392075087890625Q18.6595,7.224435087890625,18.832,6.929835087890625ZM10,10.634915087890626C10,11.024655087890626,9.85136,11.379685087890625,9.60768,11.646395087890625L12.1689,15.171615087890626C12.2754,15.147615087890625,12.3862,15.134915087890626,12.5,15.134915087890626C12.5965,15.134915087890626,12.6908,15.144015087890624,12.7823,15.161415087890624L16.108800000000002,11.196955087890625C16.0387,11.023375087890624,16,10.833655087890625,16,10.634915087890626C16,9.806495087890625,16.671599999999998,9.134915087890626,17.5,9.134915087890626C18.3284,9.134915087890626,19,9.806495087890625,19,10.634915087890626C19,11.463345087890625,18.3284,12.134915087890626,17.5,12.134915087890626C17.2395,12.134915087890626,16.994500000000002,12.068505087890625,16.781,11.951675087890624L13.6547,15.677415087890624C13.8703,15.937215087890625,14,16.270915087890625,14,16.634915087890626C14,17.463315087890624,13.3284,18.134915087890626,12.5,18.134915087890626C11.67157,18.134915087890626,11,17.463315087890624,11,16.634915087890626C11,16.284415087890626,11.12019,15.962015087890626,11.3216,15.706715087890625L8.71539,12.119565087890624C8.645050000000001,12.129685087890625,8.57314,12.134915087890626,8.5,12.134915087890626C8.162099999999999,12.134915087890626,7.8503,12.023195087890626,7.59952,11.834665087890626L4.50558,15.521915087890624C4.80921,15.796415087890624,5,16.193415087890624,5,16.634915087890626C5,17.463315087890624,4.32843,18.134915087890626,3.5,18.134915087890626C2.671573,18.134915087890626,2,17.463315087890624,2,16.634915087890626C2,15.806515087890626,2.671573,15.134915087890626,3.5,15.134915087890626C3.5082500000000003,15.134915087890626,3.51648,15.135015087890626,3.5247,15.135115087890625L7.03382,10.953115087890625C7.01167,10.850565087890626,7,10.744105087890624,7,10.634915087890626C7,9.806495087890625,7.67157,9.134915087890626,8.5,9.134915087890626C9.32843,9.134915087890626,10,9.806495087890625,10,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), vd = () => pd.cloneNode(!0), bd = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M18.8532,7.020985087890625Q19.0257,6.734525087890625,19.0257,6.369945087890625Q19.0257,6.020005087890625,18.8499,5.754705087890625Q18.6758,5.489415087890626,18.3649,5.339675087890625Q18.5944,5.209465087890625,18.7214,4.994615087890625Q18.8499,4.779775087890625,18.8499,4.5193550878906255Q18.8499,4.2003480878906245,18.7002,3.951324087890625Q18.5505,3.700673087890625,18.277,3.557444087890625Q18.0052,3.414215087890625,17.6455,3.414215087890625Q17.285800000000002,3.414215087890625,17.0107,3.557444087890625Q16.7357,3.700673087890625,16.5843,3.951324087890625Q16.4346,4.2003480878906245,16.4346,4.5193550878906255Q16.4346,4.779775087890625,16.561500000000002,4.994615087890625Q16.6901,5.209465087890625,16.919600000000003,5.339675087890625Q16.6055,5.489415087890626,16.4297,5.757965087890625Q16.255499999999998,6.024895087890625,16.255499999999998,6.369945087890625Q16.255499999999998,6.734525087890625,16.4297,7.020985087890625Q16.6055,7.305815087890625,16.919600000000003,7.465325087890625Q17.2354,7.624825087890625,17.6455,7.624825087890625Q18.0557,7.624825087890625,18.3682,7.465325087890625Q18.6807,7.305815087890625,18.8532,7.020985087890625ZM8.76432,7.559725087890625L8.13444,7.559725087890625L8.13444,4.214996087890625L7.28971,4.700025087890625L7.2946,4.070139087890625L8.310220000000001,3.479319087890625L8.76432,3.479319087890625L8.76432,7.559725087890625ZM17.1816,4.955555087890625Q17.0042,4.784655087890625,17.0042,4.5095950878906255Q17.0042,4.229645087890625,17.18,4.057119087890625Q17.355800000000002,3.884592087890625,17.6455,3.884592087890625Q17.935200000000002,3.884592087890625,18.1077,4.057119087890625Q18.2803,4.229645087890625,18.2803,4.5095950878906255Q18.2803,4.784655087890625,18.1045,4.955555087890625Q17.930300000000003,5.124825087890625,17.6455,5.124825087890625Q17.3607,5.124825087890625,17.1816,4.955555087890625ZM18.2217,5.7953950878906255Q18.4398,6.005365087890625,18.4398,6.3552950878906245Q18.4398,6.705235087890625,18.2217,6.915195087890625Q18.0052,7.125155087890625,17.6455,7.125155087890625Q17.285800000000002,7.125155087890625,17.067700000000002,6.915195087890625Q16.849600000000002,6.705235087890625,16.849600000000002,6.3552950878906245Q16.849600000000002,6.005365087890625,17.064500000000002,5.7953950878906255Q17.2793,5.585435087890625,17.6455,5.585435087890625Q18.0052,5.585435087890625,18.2217,5.7953950878906255ZM9.60768,11.711495087890626C9.85136,11.444785087890626,10,11.089765087890626,10,10.700025087890625C10,9.871595087890626,9.32843,9.200025087890625,8.5,9.200025087890625C7.67157,9.200025087890625,7,9.871595087890626,7,10.700025087890625C7,10.809205087890625,7.01167,10.915665087890625,7.03382,11.018215087890624L3.5247,15.200215087890625C3.51648,15.200115087890625,3.5082500000000003,15.200015087890625,3.5,15.200015087890625C2.671573,15.200015087890625,2,15.871615087890625,2,16.700015087890627C2,17.528415087890625,2.671573,18.200015087890627,3.5,18.200015087890627C4.32843,18.200015087890627,5,17.528415087890625,5,16.700015087890627C5,16.258515087890625,4.80921,15.861515087890625,4.50558,15.587015087890626L7.59952,11.899765087890625C7.8503,12.088295087890625,8.162099999999999,12.200025087890625,8.5,12.200025087890625C8.57314,12.200025087890625,8.645050000000001,12.194785087890626,8.71539,12.184675087890625L11.3216,15.771815087890625C11.12019,16.027215087890625,11,16.349515087890623,11,16.700015087890627C11,17.528415087890625,11.67157,18.200015087890627,12.5,18.200015087890627C13.3284,18.200015087890627,14,17.528415087890625,14,16.700015087890627C14,16.336015087890623,13.8703,16.002315087890626,13.6547,15.742515087890625L16.781,12.016775087890625C16.994500000000002,12.133605087890626,17.2395,12.200025087890625,17.5,12.200025087890625C18.3284,12.200025087890625,19,11.528445087890624,19,10.700025087890625C19,9.871595087890626,18.3284,9.200025087890625,17.5,9.200025087890625C16.671599999999998,9.200025087890625,16,9.871595087890626,16,10.700025087890625C16,10.898765087890624,16.0387,11.088475087890625,16.108800000000002,11.262055087890625L12.7823,15.226515087890625C12.6908,15.209115087890625,12.5965,15.200015087890625,12.5,15.200015087890625C12.3862,15.200015087890625,12.2754,15.212715087890626,12.1689,15.236715087890625L9.60768,11.711495087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), $d = () => bd.cloneNode(!0), _d = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M9.474616630859375,7.494615087890625L8.844736630859375,7.494615087890625L8.844736630859375,4.149892087890625L8.000006630859374,4.634915087890625L8.004896630859374,4.005035087890625L9.020516630859376,3.414215087890625L9.474616630859375,3.414215087890625L9.474616630859375,7.494615087890625ZM18.529296630859378,4.8318550878906255Q18.307996630859375,5.028795087890625,18.122396630859377,5.385245087890625Q17.868496630859376,5.019035087890625,17.629196630859376,4.8269750878906255Q17.389996630859375,4.634915087890625,17.168596630859376,4.634915087890625Q16.794296630859375,4.634915087890625,16.522496630859376,4.976715087890625Q16.252296630859377,5.3168850878906255,16.252296630859377,5.7856350878906255Q16.252296630859377,6.218575087890625,16.502896630859375,6.521315087890625Q16.755196630859373,6.822415087890625,17.114896630859377,6.822415087890625Q17.368796630859375,6.822415087890625,17.588596630859374,6.625475087890624Q17.809896630859377,6.428535087890625,17.998696630859374,6.0688350878906245Q18.249396630859373,6.439935087890625,18.488596630859377,6.631985087890625Q18.727896630859377,6.822415087890625,18.952496630859375,6.822415087890625Q19.326796630859373,6.822415087890625,19.596996630859376,6.482245087890625Q19.868796630859375,6.140455087890626,19.868796630859375,5.671705087890626Q19.868796630859375,5.238755087890625,19.618196630859376,4.937655087890625Q19.367496630859375,4.634915087890625,19.006196630859375,4.634915087890625Q18.750696630859377,4.634915087890625,18.529296630859378,4.8318550878906255ZM18.337296630859377,5.674955087890625L18.278696630859375,5.596835087890625Q18.449596630859375,5.272935087890625,18.622096630859374,5.1101750878906245Q18.794596630859374,4.947415087890625,18.967096630859373,4.947415087890625Q19.194996630859375,4.947415087890625,19.346396630859374,5.1345950878906255Q19.497696630859377,5.320135087890625,19.497696630859377,5.598455087890625Q19.497696630859377,5.8914250878906245,19.360996630859376,6.096505087890625Q19.224296630859374,6.301585087890626,19.027396630859375,6.301585087890626Q18.915096630859374,6.301585087890626,18.742496630859375,6.146965087890624Q18.569996630859375,5.992335087890625,18.337296630859377,5.674955087890625ZM17.785496630859377,5.779125087890625L17.842496630859372,5.857245087890625Q17.668296630859373,6.186025087890625,17.495796630859374,6.348785087890625Q17.324896630859374,6.509915087890625,17.153996630859375,6.509915087890625Q16.926096630859377,6.509915087890625,16.774796630859377,6.324375087890624Q16.623396630859375,6.137195087890625,16.623396630859375,5.858875087890625Q16.623396630859375,5.565905087890625,16.761696630859376,5.360825087890625Q16.900096630859373,5.1557550878906255,17.095396630859376,5.1557550878906255Q17.228896630859374,5.1557550878906255,17.365596630859375,5.2778250878906245Q17.502296630859377,5.399895087890625,17.785496630859377,5.779125087890625ZM10.710296630859375,10.634915087890626C10.710296630859375,11.024655087890626,10.561656630859375,11.379685087890625,10.317976630859375,11.646395087890625L12.879196630859376,15.171615087890626C12.985696630859374,15.147615087890625,13.096496630859376,15.134915087890626,13.210296630859375,15.134915087890626C13.306796630859376,15.134915087890626,13.401096630859374,15.144015087890624,13.492596630859374,15.161415087890624L16.819096630859377,11.196955087890625C16.748996630859374,11.023375087890624,16.710296630859375,10.833655087890625,16.710296630859375,10.634915087890626C16.710296630859375,9.806495087890625,17.381896630859373,9.134915087890626,18.210296630859375,9.134915087890626C19.038696630859373,9.134915087890626,19.710296630859375,9.806495087890625,19.710296630859375,10.634915087890626C19.710296630859375,11.463345087890625,19.038696630859373,12.134915087890626,18.210296630859375,12.134915087890626C17.949796630859375,12.134915087890626,17.704796630859377,12.068505087890625,17.491296630859374,11.951675087890624L14.364996630859375,15.677415087890624C14.580596630859375,15.937215087890625,14.710296630859375,16.270915087890625,14.710296630859375,16.634915087890626C14.710296630859375,17.463315087890624,14.038696630859375,18.134915087890626,13.210296630859375,18.134915087890626C12.381866630859374,18.134915087890626,11.710296630859375,17.463315087890624,11.710296630859375,16.634915087890626C11.710296630859375,16.284415087890626,11.830486630859374,15.962015087890626,12.031896630859375,15.706715087890625L9.425686630859374,12.119565087890624C9.355346630859376,12.129685087890625,9.283436630859375,12.134915087890626,9.210296630859375,12.134915087890626C8.872396630859374,12.134915087890626,8.560596630859376,12.023195087890626,8.309816630859375,11.834665087890626L5.215876630859375,15.521915087890624C5.519506630859375,15.796415087890624,5.710296630859375,16.193415087890624,5.710296630859375,16.634915087890626C5.710296630859375,17.463315087890624,5.038726630859375,18.134915087890626,4.210296630859375,18.134915087890626C3.381869630859375,18.134915087890626,2.710296630859375,17.463315087890624,2.710296630859375,16.634915087890626C2.710296630859375,15.806515087890626,3.381869630859375,15.134915087890626,4.210296630859375,15.134915087890626C4.218546630859375,15.134915087890626,4.226776630859375,15.135015087890626,4.234996630859375,15.135115087890625L7.744116630859375,10.953115087890625C7.721966630859375,10.850565087890626,7.710296630859375,10.744105087890624,7.710296630859375,10.634915087890626C7.710296630859375,9.806495087890625,8.381866630859374,9.134915087890626,9.210296630859375,9.134915087890626C10.038726630859376,9.134915087890626,10.710296630859375,9.806495087890625,10.710296630859375,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Ld = () => _d.cloneNode(!0), kd = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M21,5.5C21,6.32843,20.3284,7,19.5,7C19.4136,7,19.3289,6.99269,19.2465,6.97866L15.6257,15.5086C15.8587,15.7729,16,16.119999999999997,16,16.5C16,17.328400000000002,15.3284,18,14.5,18C13.8469,18,13.2913,17.5826,13.0854,17L3.91465,17C3.70873,17.5826,3.15311,18,2.5,18C1.671573,18,1,17.328400000000002,1,16.5C1,15.6716,1.671573,15,2.5,15C2.5840199999999998,15,2.66643,15.0069,2.74668,15.0202L6.36934,6.48574C6.13933,6.22213,6,5.87733,6,5.5C6,4.671573,6.67157,4,7.5,4C8.15311,4,8.70873,4.417404,8.91465,5L18.0854,5C18.2913,4.417404,18.8469,4,19.5,4C20.3284,4,21,4.671573,21,5.5ZM18.0854,6L8.91465,6C8.892579999999999,6.06243,8.8665,6.12296,8.83672,6.18128L13.9814,15.0921C14.143,15.0325,14.3177,15,14.5,15C14.584,15,14.6664,15.0069,14.7467,15.0202L18.3693,6.48574C18.2462,6.3446,18.149,6.1802,18.0854,6ZM13.2036,15.745L8.0861,6.8811800000000005C7.90605,6.95768,7.70797,7,7.5,7C7.41359,7,7.32888,6.99269,7.24647,6.97866L3.62571,15.5086C3.7512,15.651,3.8501,15.8174,3.91465,16L13.0854,16C13.1169,15.9108,13.1566,15.8255,13.2036,15.745Z" stroke-opacity="0" stroke="none"></path></svg>'), xd = () => kd.cloneNode(!0), Ad = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.92159,5.93994C6.04014,5.90529,6.152620000000001,5.85639,6.25704,5.79523L9.12729,9.89437C9.045449999999999,10.07959,9,10.28449,9,10.5C9,10.79522,9.08529,11.07053,9.232569999999999,11.30262L4.97573,16.7511L5.92159,5.93994ZM4.92259,5.8848400000000005C4.38078,5.658659999999999,4,5.1238,4,4.5C4,3.671573,4.67157,3,5.5,3C6.2157,3,6.81433,3.50124,6.96399,4.17183L15.1309,4.88634C15.3654,4.36387,15.8902,4,16.5,4C17.328400000000002,4,18,4.67157,18,5.5C18,6.08983,17.659599999999998,6.60015,17.1645,6.84518L18.4264,14.0018C18.4508,14.0006,18.4753,14,18.5,14C19.3284,14,20,14.6716,20,15.5C20,16.328400000000002,19.3284,17,18.5,17C17.932499999999997,17,17.4386,16.6849,17.183799999999998,16.22L5.99686,18.5979C5.946429999999999,19.3807,5.29554,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.869300000000003,3.389292,17.3295,3.94071,17.1077L4.92259,5.8848400000000005ZM5.72452,17.6334C5.69799,17.596,5.6698,17.5599,5.64004,17.525100000000002L10.01843,11.92103C10.16958,11.97223,10.33155,12,10.5,12C10.80059,12,11.08052,11.91158,11.31522,11.75934L17.0606,15.0765C17.0457,15.1271,17.0335,15.1789,17.023899999999998,15.2317L5.72452,17.6334ZM11.92855,10.95875L17.4349,14.1379L16.1699,6.96356C15.9874,6.92257,15.8174,6.8483,15.6667,6.74746L11.99771,10.4165C11.99923,10.44414,12,10.47198,12,10.5C12,10.66,11.97495,10.814160000000001,11.92855,10.95875ZM10.5,9C10.259830000000001,9,10.03285,9.05644,9.83159,9.15679L7.04919,5.1831L15.0493,5.88302C15.054,5.90072,15.059,5.91829,15.0643,5.9357299999999995L11.56066,9.43934C11.28921,9.16789,10.91421,9,10.5,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), wd = () => Ad.cloneNode(!0), Md = /* @__PURE__ */ b('<svg viewBox="0 0 22 22"><path d="M4.727219638671875,8.007996215820313L9.973849638671876,2.7629472158203123C10.167279638671875,2.5696791158203123,10.480729638671875,2.5696791158203123,10.674169638671875,2.7629472158203123L13.223329638671874,5.311756215820313C13.416929638671874,5.505236215820313,13.416929638671874,5.8189862158203125,13.223329638671874,6.012466215820313L7.977129638671875,11.257906215820313C7.379859638671875,11.855176215820313,7.407609638671875,12.909396215820312,8.033809638671876,13.535596215820313C8.660409638671876,14.162596215820313,9.713849638671874,14.189996215820312,10.311129638671876,13.591896215820313L15.556929638671875,8.346066215820311C15.750429638671875,8.152526215820313,16.064229638671875,8.152526215820313,16.257629638671872,8.346066215820311L18.806529638671876,10.895266215820312C19.000029638671876,11.088746215820313,19.000029638671876,11.402496215820312,18.806529638671876,11.595976215820313L13.560629638671875,16.841796215820313C11.165619638671876,19.237196215820312,7.197149638671875,19.19919621582031,4.783499638671875,16.785496215820313C2.3698426386718747,14.371896215820312,2.331397638671875,10.403416215820313,4.727219638671875,8.007996215820313ZM12.172299638671875,5.662106215820312L10.323809638671875,3.8136162158203124L5.4287196386718755,8.709096215820313C3.422893638671875,10.714536215820312,3.4549956386718748,14.055196215820313,5.484999638671875,16.08479621582031C7.514609638671875,18.114796215820313,10.855289638671875,18.146496215820314,12.860719638671876,16.141096215820312L15.465629638671874,13.535796215820312L14.090929638671875,12.160756215820312L14.791629638671875,11.460436215820312L16.166229638671876,12.834996215820313L17.755829638671877,11.245226215820313L15.907729638671874,9.396736215820312L11.011839638671875,14.292596215820312C10.042809638671875,15.262396215820312,8.418249638671874,15.243796215820312,7.406019638671875,14.306496215820312L7.333099638671875,14.236296215820312C6.327599638671876,13.230796215820313,6.284009638671876,11.550396215820312,7.276419638671875,10.557586215820312L9.882199638671874,7.952026215820313L8.501079638671875,6.570906215820313L9.201789638671876,5.870186215820313L10.582939638671874,7.251336215820312L12.172299638671875,5.662106215820312Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Sd = (e) => (() => {
  const t = Md.cloneNode(!0);
  return v1(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), Td = /* @__PURE__ */ b('<svg viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_615"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_615)"><path d="M19.672,3.0673368C19.4417,2.9354008,19.1463,3.00292252,18.9994,3.2210900000000002L17.4588,5.50622L16.743299999999998,3.781253L13.9915,7.4662L13.9618,7.51108C13.8339,7.72862,13.8936,8.005659999999999,14.1004,8.15391L14.1462,8.183430000000001C14.3683,8.308720000000001,14.6511,8.25001,14.8022,8.047229999999999L16.4907,5.78571L17.246299999999998,7.60713L19.8374,3.7635389999999997L19.8651,3.717088C19.9871,3.484615,19.9023,3.199273,19.672,3.0673368ZM4.79974,8.462530000000001L10.117740000000001,3.252975C10.31381,3.0610145,10.63152,3.0610145,10.82759,3.252975L13.4115,5.78453C13.6076,5.976710000000001,13.6076,6.28833,13.4115,6.4805L8.093869999999999,11.69045C7.48847,12.28368,7.51659,13.3308,8.151309999999999,13.9528C8.786439999999999,14.5755,9.85421,14.6027,10.45961,14.0087L15.7768,8.79831C15.9729,8.60609,16.2909,8.60609,16.487099999999998,8.79831L19.0705,11.33026C19.2667,11.52244,19.2667,11.83406,19.0705,12.02623L13.7533,17.2366C11.32572,19.6158,7.30328,19.578,4.85679,17.1807C2.410298,14.7834,2.371331,10.84174,4.79974,8.462530000000001ZM12.3461,6.1325199999999995L10.47246,4.29654L5.51079,9.15889C3.477674,11.15076,3.510214,14.4688,5.56784,16.4847C7.62506,18.500999999999998,11.01117,18.5325,13.0439,16.540599999999998L15.6842,13.9529L14.2908,12.58718L15.0011,11.89161L16.394399999999997,13.2569L18.0056,11.67786L16.1323,9.84188L11.16985,14.7046C10.18764,15.6679,8.540980000000001,15.6494,7.51498,14.7184L7.44107,14.6487C6.4219,13.65,6.37771,11.98096,7.38362,10.994869999999999L10.02485,8.40693L8.624939999999999,7.03516L9.335180000000001,6.33919L10.73512,7.71099L12.3461,6.1325199999999995Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), Pd = (e) => (() => {
  const t = Td.cloneNode(!0);
  return v1(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), Od = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,17C5.80945,17,3.667717,12.85,3.113386,11.575C2.9622047,11.2,2.9622047,10.8,3.113386,10.425C3.667717,9.15,5.80945,5,11,5C16.165399999999998,5,18.3323,9.15,18.8866,10.425C19.0378,10.8,19.0378,11.2,18.8866,11.575C18.3323,12.85,16.165399999999998,17,11,17ZM4.04567,10.8C3.995276,10.925,3.995276,11.05,4.04567,11.175C4.52441,12.325,6.43937,16,11,16C15.5606,16,17.4756,12.325,17.9543,11.2C18.0047,11.075,18.0047,10.95,17.9543,10.825C17.4756,9.675,15.5606,6,11,6C6.43937,6,4.52441,9.675,4.04567,10.8ZM11,13.5C9.61417,13.5,8.480319999999999,12.375,8.480319999999999,11C8.480319999999999,9.625,9.61417,8.5,11,8.5C12.38583,8.5,13.5197,9.625,13.5197,11C13.5197,12.375,12.38583,13.5,11,13.5ZM11,9.5C10.1685,9.5,9.48819,10.175,9.48819,11C9.48819,11.825,10.1685,12.5,11,12.5C11.8315,12.5,12.51181,11.825,12.51181,11C12.51181,10.175,11.8315,9.5,11,9.5Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), Id = () => Od.cloneNode(!0), Dd = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.80417,14.9887L4.62563,16.167299999999997C4.43037,16.3625,4.43037,16.6791,4.62563,16.8744C4.82089,17.0696,5.13748,17.0696,5.332739999999999,16.8744L6.62638,15.5807C7.75595,16.290100000000002,9.19328,16.7929,11,16.7929C16.165399999999998,16.7929,18.3323,12.64289,18.8866,11.36789C19.0378,10.99289,19.0378,10.59289,18.8866,10.21789C18.5549,9.45486,17.6456,7.66212,15.8617,6.34545L17.3536,4.853553C17.5488,4.658291,17.5488,4.341709,17.3536,4.146447C17.1583,3.9511845,16.8417,3.9511845,16.6464,4.146447L15.0014,5.7915399999999995C13.9314,5.1969,12.61166,4.792893,11,4.792893C5.80945,4.792893,3.667717,8.94289,3.113386,10.21789C2.9622049,10.59289,2.9622049,10.99289,3.113386,11.36789C3.424435,12.08333,4.2353000000000005,13.70399,5.80417,14.9887ZM7.36012,14.847C8.32327,15.4074,9.52286,15.7929,11,15.7929C15.5606,15.7929,17.4756,12.11789,17.9543,10.99289C18.0047,10.86789,18.0047,10.74289,17.9543,10.61789C17.659,9.90846,16.8171,8.23812,15.1447,7.06241L12.96929,9.23782C13.3134,9.66543,13.5197,10.20642,13.5197,10.79289C13.5197,12.16789,12.38583,13.29289,11,13.29289C10.41596,13.29289,9.87667,13.09308,9.44815,12.75896L7.36012,14.847ZM8.794609999999999,11.99829L6.520099999999999,14.2728C5.06905,13.12119,4.32057,11.628250000000001,4.04567,10.96789C3.995275,10.84289,3.995275,10.71789,4.04567,10.59289C4.52441,9.46789,6.43937,5.79289,11,5.79289C12.28868,5.79289,13.3661,6.086320000000001,14.2596,6.53329L12.19759,8.5953C11.84086,8.40257,11.43271,8.29289,11,8.29289C9.61417,8.29289,8.480319999999999,9.41789,8.480319999999999,10.79289C8.480319999999999,11.22918,8.594470000000001,11.64029,8.794609999999999,11.99829ZM10.16528,12.04183C10.404869999999999,12.20032,10.692070000000001,12.29289,11,12.29289C11.8315,12.29289,12.51181,11.61789,12.51181,10.79289C12.51181,10.48318,12.41593,10.194600000000001,12.25216,9.95494L10.16528,12.04183ZM11.43602,9.35687L9.55616,11.236740000000001C9.512,11.09633,9.48819,10.94724,9.48819,10.79289C9.48819,9.96789,10.1685,9.29289,11,9.29289C11.15142,9.29289,11.29782,9.31528,11.43602,9.35687Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Nd = () => Dd.cloneNode(!0), Ed = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_625"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_625)"><path d="M14.5385,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807692,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.88462,4,14.5385,5.61538,14.5385,7.576919999999999L14.5385,9.76923ZM10.88461,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923L13.38462,9.76923L13.38462,7.576919999999999C13.38462,6.23077,12.26923,5.15385,10.88461,5.15385ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.038450000000001,12.07692,11.307680000000001,12.34615,11.307680000000001,12.65385L11.307680000000001,14.5769C11.307680000000001,14.8846,11.038450000000001,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), Bd = () => Ed.cloneNode(!0), Ud = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_620"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_620)"><path d="M8.38461,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807693,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.46154,4,13.84615,4.961539,14.3462,6.423080000000001C14.4615,6.73077,14.3077,7.038460000000001,14,7.15385C13.69231,7.26923,13.38461,7.11538,13.26923,6.80769C12.92308,5.80769,11.96154,5.15385,10.88462,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.03846,12.07692,11.307690000000001,12.34615,11.307690000000001,12.65385L11.307690000000001,14.5769C11.307690000000001,14.8846,11.03846,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), Fd = () => Ud.cloneNode(!0), Kd = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M16.966900000000003,8.67144C16.6669,8.67144,16.4247,8.91558,16.4247,9.21802L16.4247,16.631500000000003C16.4247,17.322,16.007199999999997,17.9068,15.5139,17.9068L13.93072,17.9068L13.93072,9.2162C13.93072,8.91741,13.68675,8.67144,13.38855,8.67144C13.09036,8.67144,12.84639,8.91741,12.84639,9.21802L12.84639,17.9068L10.151810000000001,17.9068L10.151810000000001,9.21802C10.151810000000001,8.91741,9.90783,8.67144,9.609639999999999,8.67144C9.31145,8.67144,9.06747,8.91741,9.06747,9.219850000000001L9.06747,17.9068L7.48614,17.9068C6.99277,17.9068,6.5753,17.322,6.5753,16.631500000000003L6.5753,9.21802C6.5753,8.91558,6.333130000000001,8.67144,6.03313,8.67144C5.73313,8.67144,5.49096,8.91558,5.49096,9.21802L5.49096,16.631500000000003C5.49096,17.9378,6.385540000000001,19,7.48614,19L15.512,19C16.6127,19,17.509,17.9378,17.509,16.631500000000003L17.509,9.21802C17.509,8.91558,17.2669,8.67144,16.966900000000003,8.67144ZM18.4578,6.21183L4.542169,6.21183C4.243976,6.21183,4,6.45779,4,6.75841C4,7.05903,4.243976,7.30499,4.542169,7.30499L18.4578,7.30499C18.756,7.30499,19,7.05903,19,6.75841C19,6.45779,18.756,6.21183,18.4578,6.21183ZM8.68072,5.10045L14.3193,5.10045C14.6175,5.10045,14.8614,4.852666,14.8614,4.550225C14.8614,4.247783,14.6175,4,14.3193,4L8.68072,4C8.38253,4,8.13855,4.247783,8.13855,4.550225C8.13855,4.852666,8.38253,5.10045,8.68072,5.10045Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), jd = () => Kd.cloneNode(!0), zd = {
  horizontalStraightLine: Lu,
  horizontalRayLine: xu,
  horizontalSegment: wu,
  verticalStraightLine: Su,
  verticalRayLine: Pu,
  verticalSegment: Iu,
  straightLine: Nu,
  rayLine: Bu,
  segment: Fu,
  arrow: ju,
  priceLine: Qu,
  priceChannelLine: Ru,
  parallelStraightLine: Hu,
  fibonacciLine: qu,
  fibonacciSegment: Wu,
  fibonacciCircle: Ju,
  fibonacciSpiral: td,
  fibonacciSpeedResistanceFan: nd,
  fibonacciExtension: ad,
  gannBox: sd,
  circle: cd,
  triangle: dd,
  rect: yd,
  parallelogram: Cd,
  threeWaves: md,
  fiveWaves: vd,
  eightWaves: $d,
  anyWaves: Ld,
  abcd: xd,
  xabcd: wd,
  weak_magnet: Sd,
  strong_magnet: Pd,
  lock: Bd,
  unlock: Fd,
  visible: Id,
  invisible: Nd,
  remove: jd
};
function Qd(e) {
  return [
    { key: "horizontalStraightLine", text: o("horizontal_straight_line", e) },
    { key: "horizontalRayLine", text: o("horizontal_ray_line", e) },
    { key: "horizontalSegment", text: o("horizontal_segment", e) },
    { key: "verticalStraightLine", text: o("vertical_straight_line", e) },
    { key: "verticalRayLine", text: o("vertical_ray_line", e) },
    { key: "verticalSegment", text: o("vertical_segment", e) },
    { key: "straightLine", text: o("straight_line", e) },
    { key: "rayLine", text: o("ray_line", e) },
    { key: "segment", text: o("segment", e) },
    { key: "arrow", text: o("arrow", e) },
    { key: "priceLine", text: o("price_line", e) }
  ];
}
function Zd(e) {
  return [
    { key: "priceChannelLine", text: o("price_channel_line", e) },
    { key: "parallelStraightLine", text: o("parallel_straight_line", e) }
  ];
}
function Rd(e) {
  return [
    { key: "circle", text: o("circle", e) },
    { key: "rect", text: o("rect", e) },
    { key: "parallelogram", text: o("parallelogram", e) },
    { key: "triangle", text: o("triangle", e) }
  ];
}
function Vd(e) {
  return [
    { key: "fibonacciLine", text: o("fibonacci_line", e) },
    { key: "fibonacciSegment", text: o("fibonacci_segment", e) },
    { key: "fibonacciCircle", text: o("fibonacci_circle", e) },
    { key: "fibonacciSpiral", text: o("fibonacci_spiral", e) },
    { key: "fibonacciSpeedResistanceFan", text: o("fibonacci_speed_resistance_fan", e) },
    { key: "fibonacciExtension", text: o("fibonacci_extension", e) },
    { key: "gannBox", text: o("gann_box", e) }
  ];
}
function Hd(e) {
  return [
    { key: "xabcd", text: o("xabcd", e) },
    { key: "abcd", text: o("abcd", e) },
    { key: "threeWaves", text: o("three_waves", e) },
    { key: "fiveWaves", text: o("five_waves", e) },
    { key: "eightWaves", text: o("eight_waves", e) },
    { key: "anyWaves", text: o("any_waves", e) }
  ];
}
function Yd(e) {
  return [
    { key: "weak_magnet", text: o("weak_magnet", e) },
    { key: "strong_magnet", text: o("strong_magnet", e) }
  ];
}
const U1 = (e) => zd[e.name](e.class), qd = /* @__PURE__ */ b('<div class="klinecharts-pro-drawing-bar"><span class="split-line"></span><div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div><div class="item"><span style="width:32px;height:32px"></span></div><div class="item"><span style="width:32px;height:32px"></span></div><span class="split-line"></span><div class="item"><span style="width:32px;height:32px"></span></div></div>'), Gd = /* @__PURE__ */ b('<div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div>'), W0 = /* @__PURE__ */ b('<li><span style="padding-left:8px"></span></li>'), X0 = "drawing_tools", Wd = (e) => {
  const [t, r] = w("horizontalStraightLine"), [n, a] = w("priceChannelLine"), [l, u] = w("circle"), [c, g] = w("fibonacciLine"), [$, f] = w("xabcd"), [L, x] = w("weak_magnet"), [S, P] = w("normal"), [O, H] = w(!1), [Q, E] = w(!0), [N, K] = w(""), G = Y(() => [{
    key: "singleLine",
    icon: t(),
    list: Qd(e.locale),
    setter: r
  }, {
    key: "moreLine",
    icon: n(),
    list: Zd(e.locale),
    setter: a
  }, {
    key: "polygon",
    icon: l(),
    list: Rd(e.locale),
    setter: u
  }, {
    key: "fibonacci",
    icon: c(),
    list: Vd(e.locale),
    setter: g
  }, {
    key: "wave",
    icon: $(),
    list: Hd(e.locale),
    setter: f
  }]), T1 = Y(() => Yd(e.locale));
  return (() => {
    const c1 = qd.cloneNode(!0), P1 = c1.firstChild, j = P1.nextSibling, X = j.firstChild, R = X.nextSibling, L1 = R.firstChild, Q1 = j.nextSibling, Z = Q1.firstChild, V = Q1.nextSibling, g1 = V.firstChild, k1 = V.nextSibling, s1 = k1.nextSibling, x1 = s1.firstChild;
    return _(c1, () => G().map((C) => (() => {
      const U = Gd.cloneNode(!0), J = U.firstChild, u1 = J.nextSibling, W = u1.firstChild;
      return U.addEventListener("blur", () => {
        K("");
      }), J.$$click = () => {
        e.onDrawingItemClick({
          groupId: X0,
          name: C.icon,
          visible: Q(),
          lock: O(),
          mode: S()
        });
      }, _(J, k(U1, {
        get name() {
          return C.icon;
        }
      })), u1.$$click = () => {
        C.key === N() ? K("") : K(C.key);
      }, _(U, (() => {
        const b1 = Y(() => C.key === N());
        return () => b1() && k(rt, {
          class: "list",
          get children() {
            return C.list.map((A1) => (() => {
              const O1 = W0.cloneNode(!0), K1 = O1.firstChild;
              return O1.$$click = () => {
                C.setter(A1.key), e.onDrawingItemClick({
                  name: A1.key,
                  lock: O(),
                  mode: S()
                }), K("");
              }, _(O1, k(U1, {
                get name() {
                  return A1.key;
                }
              }), K1), _(K1, () => A1.text), O1;
            })());
          }
        });
      })(), null), B(() => v1(W, "class", C.key === N() ? "rotate" : "")), U;
    })()), P1), j.addEventListener("blur", () => {
      K("");
    }), X.$$click = () => {
      let C = L();
      S() !== "normal" && (C = "normal"), P(C), e.onModeChange(C);
    }, _(X, (() => {
      const C = Y(() => L() === "weak_magnet");
      return () => C() ? (() => {
        const U = Y(() => S() === "weak_magnet");
        return () => U() ? k(U1, {
          name: "weak_magnet",
          class: "selected"
        }) : k(U1, {
          name: "weak_magnet"
        });
      })() : (() => {
        const U = Y(() => S() === "strong_magnet");
        return () => U() ? k(U1, {
          name: "strong_magnet",
          class: "selected"
        }) : k(U1, {
          name: "strong_magnet"
        });
      })();
    })()), R.$$click = () => {
      N() === "mode" ? K("") : K("mode");
    }, _(j, (() => {
      const C = Y(() => N() === "mode");
      return () => C() && k(rt, {
        class: "list",
        get children() {
          return T1().map((U) => (() => {
            const J = W0.cloneNode(!0), u1 = J.firstChild;
            return J.$$click = () => {
              x(U.key), P(U.key), e.onModeChange(U.key), K("");
            }, _(J, k(U1, {
              get name() {
                return U.key;
              }
            }), u1), _(u1, () => U.text), J;
          })());
        }
      });
    })(), null), Z.$$click = () => {
      const C = !O();
      H(C), e.onLockChange(C);
    }, _(Z, (() => {
      const C = Y(() => !!O());
      return () => C() ? k(U1, {
        name: "lock"
      }) : k(U1, {
        name: "unlock"
      });
    })()), g1.$$click = () => {
      const C = !Q();
      E(C), e.onVisibleChange(C);
    }, _(g1, (() => {
      const C = Y(() => !!Q());
      return () => C() ? k(U1, {
        name: "visible"
      }) : k(U1, {
        name: "invisible"
      });
    })()), x1.$$click = () => {
      e.onRemoveClick(X0);
    }, _(x1, k(U1, {
      name: "remove"
    })), B(() => v1(L1, "class", N() === "mode" ? "rotate" : "")), c1;
  })();
};
F1(["click"]);
const J0 = /* @__PURE__ */ b('<li class="title"></li>'), e9 = /* @__PURE__ */ b('<li class="row"></li>'), Xd = (e) => k(ae, {
  get title() {
    return o("indicator", e.locale);
  },
  width: 400,
  get onClose() {
    return e.onClose;
  },
  get children() {
    return k(rt, {
      class: "klinecharts-pro-indicator-modal-list",
      get children() {
        return [(() => {
          const t = J0.cloneNode(!0);
          return _(t, () => o("main_indicator", e.locale)), t;
        })(), Y(() => ["MA", "EMA", "SMA", "BOLL", "SAR", "BBI"].map((t) => {
          const r = e.mainIndicators.includes(t);
          return (() => {
            const n = e9.cloneNode(!0);
            return n.$$click = (a) => {
              e.onMainIndicatorChange({
                name: t,
                paneId: "candle_pane",
                added: !r
              });
            }, _(n, k(G0, {
              checked: r,
              get label() {
                return o(t.toLowerCase(), e.locale);
              }
            })), n;
          })();
        })), (() => {
          const t = J0.cloneNode(!0);
          return _(t, () => o("sub_indicator", e.locale)), t;
        })(), Y(() => ["MA", "EMA", "VOL", "MACD", "BOLL", "KDJ", "RSI", "BIAS", "BRAR", "CCI", "DMI", "CR", "PSY", "DMA", "TRIX", "OBV", "VR", "WR", "MTM", "EMV", "SAR", "SMA", "ROC", "PVT", "BBI", "AO"].map((t) => {
          const r = t in e.subIndicators;
          return (() => {
            const n = e9.cloneNode(!0);
            return n.$$click = (a) => {
              e.onSubIndicatorChange({
                name: t,
                paneId: e.subIndicators[t] ?? "",
                added: !r
              });
            }, _(n, k(G0, {
              checked: r,
              get label() {
                return o(t.toLowerCase(), e.locale);
              }
            })), n;
          })();
        }))];
      }
    });
  }
});
F1(["click"]);
function t9(e, t) {
  switch (e) {
    case "Etc/UTC":
      return o("utc", t);
    case "Pacific/Midway":
      return o("midway", t);
    case "Pacific/Honolulu":
      return o("honolulu", t);
    case "America/Anchorage":
      return o("anchorage", t);
    case "America/Juneau":
      return o("juneau", t);
    case "America/Los_Angeles":
      return o("los_angeles", t);
    case "America/Vancouver":
      return o("vancouver", t);
    case "America/Tijuana":
      return o("tijuana", t);
    case "America/Phoenix":
      return o("phoenix", t);
    case "America/Denver":
      return o("denver", t);
    case "America/Chicago":
      return o("chicago", t);
    case "America/Mexico_City":
      return o("mexico_city", t);
    case "America/Guatemala":
      return o("guatemala", t);
    case "America/New_York":
      return o("new_york", t);
    case "America/Toronto":
      return o("toronto", t);
    case "America/Bogota":
      return o("bogota", t);
    case "America/Lima":
      return o("lima", t);
    case "America/Caracas":
      return o("caracas", t);
    case "America/Halifax":
      return o("halifax", t);
    case "America/Santiago":
      return o("santiago", t);
    case "America/La_Paz":
      return o("la_paz", t);
    case "America/Sao_Paulo":
      return o("sao_paulo", t);
    case "America/Buenos_Aires":
      return o("buenos_aires", t);
    case "America/Montevideo":
      return o("montevideo", t);
    case "America/Godthab":
      return o("godthab", t);
    case "Atlantic/Azores":
      return o("azores", t);
    case "Atlantic/Cape_Verde":
      return o("cape_verde", t);
    case "Europe/London":
      return o("london", t);
    case "Europe/Dublin":
      return o("dublin", t);
    case "Europe/Lisbon":
      return o("lisbon", t);
    case "Africa/Casablanca":
      return o("casablanca", t);
    case "Europe/Paris":
      return o("paris", t);
    case "Europe/Berlin":
      return o("berlin", t);
    case "Europe/Amsterdam":
      return o("amsterdam", t);
    case "Europe/Brussels":
      return o("brussels", t);
    case "Europe/Madrid":
      return o("madrid", t);
    case "Europe/Rome":
      return o("rome", t);
    case "Europe/Vienna":
      return o("vienna", t);
    case "Europe/Warsaw":
      return o("warsaw", t);
    case "Africa/Lagos":
      return o("lagos", t);
    case "Europe/Athens":
      return o("athens", t);
    case "Europe/Bucharest":
      return o("bucharest", t);
    case "Europe/Helsinki":
      return o("helsinki", t);
    case "Europe/Istanbul":
      return o("istanbul", t);
    case "Europe/Kiev":
      return o("kiev", t);
    case "Africa/Cairo":
      return o("cairo", t);
    case "Africa/Johannesburg":
      return o("johannesburg", t);
    case "Asia/Jerusalem":
      return o("jerusalem", t);
    case "Europe/Moscow":
      return o("moscow", t);
    case "Asia/Baghdad":
      return o("baghdad", t);
    case "Asia/Kuwait":
      return o("kuwait", t);
    case "Asia/Riyadh":
      return o("riyadh", t);
    case "Asia/Bahrain":
      return o("bahrain", t);
    case "Africa/Nairobi":
      return o("nairobi", t);
    case "Asia/Tehran":
      return o("tehran", t);
    case "Asia/Dubai":
      return o("dubai", t);
    case "Asia/Muscat":
      return o("muscat", t);
    case "Asia/Baku":
      return o("baku", t);
    case "Asia/Kabul":
      return o("kabul", t);
    case "Asia/Karachi":
      return o("karachi", t);
    case "Asia/Tashkent":
      return o("tashkent", t);
    case "Asia/Ashkhabad":
      return o("ashkhabad", t);
    case "Asia/Kolkata":
      return o("kolkata", t);
    case "Asia/Mumbai":
      return o("mumbai", t);
    case "Asia/Colombo":
      return o("colombo", t);
    case "Asia/Kathmandu":
      return o("kathmandu", t);
    case "Asia/Dhaka":
      return o("dhaka", t);
    case "Asia/Almaty":
      return o("almaty", t);
    case "Asia/Yangon":
      return o("yangon", t);
    case "Asia/Bangkok":
      return o("bangkok", t);
    case "Asia/Jakarta":
      return o("jakarta", t);
    case "Asia/Ho_Chi_Minh":
      return o("ho_chi_minh", t);
    case "Asia/Shanghai":
      return o("shanghai", t);
    case "Asia/Hong_Kong":
      return o("hong_kong", t);
    case "Asia/Singapore":
      return o("singapore", t);
    case "Asia/Taipei":
      return o("taipei", t);
    case "Asia/Manila":
      return o("manila", t);
    case "Asia/Kuala_Lumpur":
      return o("kuala_lumpur", t);
    case "Australia/Perth":
      return o("perth", t);
    case "Asia/Tokyo":
      return o("tokyo", t);
    case "Asia/Seoul":
      return o("seoul", t);
    case "Asia/Pyongyang":
      return o("pyongyang", t);
    case "Australia/Adelaide":
      return o("adelaide", t);
    case "Australia/Darwin":
      return o("darwin", t);
    case "Australia/Brisbane":
      return o("brisbane", t);
    case "Australia/Sydney":
      return o("sydney", t);
    case "Australia/Melbourne":
      return o("melbourne", t);
    case "Pacific/Guam":
      return o("guam", t);
    case "Pacific/Port_Moresby":
      return o("port_moresby", t);
    case "Pacific/Norfolk":
      return o("norfolk", t);
    case "Pacific/Guadalcanal":
      return o("guadalcanal", t);
    case "Pacific/Auckland":
      return o("auckland", t);
    case "Pacific/Fiji":
      return o("fiji", t);
    case "Pacific/Tongatapu":
      return o("tongatapu", t);
    case "Pacific/Apia":
      return o("apia", t);
    case "Asia/Karachi":
      return o("karachi", t);
  }
  return e;
}
function Jd(e) {
  return [
    // UTC
    { key: "Etc/UTC", text: `(UTC+0:00) ${o("utc", e)}` },
    // Pacific (UTC-12 to UTC-8)
    { key: "Pacific/Midway", text: `(UTC-11:00) ${o("midway", e)}` },
    { key: "Pacific/Honolulu", text: `(UTC-10:00) ${o("honolulu", e)}` },
    { key: "America/Anchorage", text: `(UTC-9:00) ${o("anchorage", e)}` },
    { key: "America/Juneau", text: `(UTC-9:00) ${o("juneau", e)}` },
    // North America West (UTC-8 to UTC-7)
    { key: "America/Los_Angeles", text: `(UTC-8:00) ${o("los_angeles", e)}` },
    { key: "America/Vancouver", text: `(UTC-8:00) ${o("vancouver", e)}` },
    { key: "America/Tijuana", text: `(UTC-8:00) ${o("tijuana", e)}` },
    { key: "America/Phoenix", text: `(UTC-7:00) ${o("phoenix", e)}` },
    { key: "America/Denver", text: `(UTC-7:00) ${o("denver", e)}` },
    // North America Central (UTC-6)
    { key: "America/Chicago", text: `(UTC-6:00) ${o("chicago", e)}` },
    { key: "America/Mexico_City", text: `(UTC-6:00) ${o("mexico_city", e)}` },
    { key: "America/Guatemala", text: `(UTC-6:00) ${o("guatemala", e)}` },
    // North America East (UTC-5 to UTC-4)
    { key: "America/New_York", text: `(UTC-5:00) ${o("new_york", e)}` },
    { key: "America/Toronto", text: `(UTC-5:00) ${o("toronto", e)}` },
    { key: "America/Bogota", text: `(UTC-5:00) ${o("bogota", e)}` },
    { key: "America/Lima", text: `(UTC-5:00) ${o("lima", e)}` },
    { key: "America/Caracas", text: `(UTC-4:00) ${o("caracas", e)}` },
    { key: "America/Halifax", text: `(UTC-4:00) ${o("halifax", e)}` },
    // South America (UTC-4 to UTC-3)
    { key: "America/Santiago", text: `(UTC-4:00) ${o("santiago", e)}` },
    { key: "America/La_Paz", text: `(UTC-4:00) ${o("la_paz", e)}` },
    { key: "America/Sao_Paulo", text: `(UTC-3:00) ${o("sao_paulo", e)}` },
    { key: "America/Buenos_Aires", text: `(UTC-3:00) ${o("buenos_aires", e)}` },
    { key: "America/Montevideo", text: `(UTC-3:00) ${o("montevideo", e)}` },
    // Atlantic (UTC-3 to UTC-1)
    { key: "America/Godthab", text: `(UTC-3:00) ${o("godthab", e)}` },
    { key: "Atlantic/Azores", text: `(UTC-1:00) ${o("azores", e)}` },
    { key: "Atlantic/Cape_Verde", text: `(UTC-1:00) ${o("cape_verde", e)}` },
    // Western Europe (UTC+0 to UTC+1)
    { key: "Europe/London", text: `(UTC+0:00) ${o("london", e)}` },
    { key: "Europe/Dublin", text: `(UTC+0:00) ${o("dublin", e)}` },
    { key: "Europe/Lisbon", text: `(UTC+0:00) ${o("lisbon", e)}` },
    { key: "Africa/Casablanca", text: `(UTC+0:00) ${o("casablanca", e)}` },
    { key: "Europe/Paris", text: `(UTC+1:00) ${o("paris", e)}` },
    { key: "Europe/Berlin", text: `(UTC+1:00) ${o("berlin", e)}` },
    { key: "Europe/Amsterdam", text: `(UTC+1:00) ${o("amsterdam", e)}` },
    { key: "Europe/Brussels", text: `(UTC+1:00) ${o("brussels", e)}` },
    { key: "Europe/Madrid", text: `(UTC+1:00) ${o("madrid", e)}` },
    { key: "Europe/Rome", text: `(UTC+1:00) ${o("rome", e)}` },
    { key: "Europe/Vienna", text: `(UTC+1:00) ${o("vienna", e)}` },
    { key: "Europe/Warsaw", text: `(UTC+1:00) ${o("warsaw", e)}` },
    { key: "Africa/Lagos", text: `(UTC+1:00) ${o("lagos", e)}` },
    // Central Europe (UTC+2)
    { key: "Europe/Athens", text: `(UTC+2:00) ${o("athens", e)}` },
    { key: "Europe/Bucharest", text: `(UTC+2:00) ${o("bucharest", e)}` },
    { key: "Europe/Helsinki", text: `(UTC+2:00) ${o("helsinki", e)}` },
    { key: "Europe/Istanbul", text: `(UTC+2:00) ${o("istanbul", e)}` },
    { key: "Europe/Kiev", text: `(UTC+2:00) ${o("kiev", e)}` },
    { key: "Africa/Cairo", text: `(UTC+2:00) ${o("cairo", e)}` },
    { key: "Africa/Johannesburg", text: `(UTC+2:00) ${o("johannesburg", e)}` },
    { key: "Asia/Jerusalem", text: `(UTC+2:00) ${o("jerusalem", e)}` },
    // Eastern Europe / Middle East (UTC+3)
    { key: "Europe/Moscow", text: `(UTC+3:00) ${o("moscow", e)}` },
    { key: "Asia/Baghdad", text: `(UTC+3:00) ${o("baghdad", e)}` },
    { key: "Asia/Kuwait", text: `(UTC+3:00) ${o("kuwait", e)}` },
    { key: "Asia/Riyadh", text: `(UTC+3:00) ${o("riyadh", e)}` },
    { key: "Asia/Bahrain", text: `(UTC+3:00) ${o("bahrain", e)}` },
    { key: "Africa/Nairobi", text: `(UTC+3:00) ${o("nairobi", e)}` },
    // Middle East (UTC+3:30 to UTC+4)
    { key: "Asia/Tehran", text: `(UTC+3:30) ${o("tehran", e)}` },
    { key: "Asia/Dubai", text: `(UTC+4:00) ${o("dubai", e)}` },
    { key: "Asia/Muscat", text: `(UTC+4:00) ${o("muscat", e)}` },
    { key: "Asia/Baku", text: `(UTC+4:00) ${o("baku", e)}` },
    // Central Asia (UTC+4:30 to UTC+5)
    { key: "Asia/Kabul", text: `(UTC+4:30) ${o("kabul", e)}` },
    { key: "Asia/Karachi", text: `(UTC+5:00) ${o("karachi", e)}` },
    { key: "Asia/Tashkent", text: `(UTC+5:00) ${o("tashkent", e)}` },
    { key: "Asia/Ashkhabad", text: `(UTC+5:00) ${o("ashkhabad", e)}` },
    // South Asia (UTC+5:30 to UTC+6)
    { key: "Asia/Kolkata", text: `(UTC+5:30) ${o("kolkata", e)}` },
    { key: "Asia/Mumbai", text: `(UTC+5:30) ${o("mumbai", e)}` },
    { key: "Asia/Colombo", text: `(UTC+5:30) ${o("colombo", e)}` },
    { key: "Asia/Kathmandu", text: `(UTC+5:45) ${o("kathmandu", e)}` },
    { key: "Asia/Dhaka", text: `(UTC+6:00) ${o("dhaka", e)}` },
    { key: "Asia/Almaty", text: `(UTC+6:00) ${o("almaty", e)}` },
    // Southeast Asia (UTC+6:30 to UTC+7)
    { key: "Asia/Yangon", text: `(UTC+6:30) ${o("yangon", e)}` },
    { key: "Asia/Bangkok", text: `(UTC+7:00) ${o("bangkok", e)}` },
    { key: "Asia/Jakarta", text: `(UTC+7:00) ${o("jakarta", e)}` },
    { key: "Asia/Ho_Chi_Minh", text: `(UTC+7:00) ${o("ho_chi_minh", e)}` },
    // East Asia (UTC+8)
    { key: "Asia/Shanghai", text: `(UTC+8:00) ${o("shanghai", e)}` },
    { key: "Asia/Hong_Kong", text: `(UTC+8:00) ${o("hong_kong", e)}` },
    { key: "Asia/Singapore", text: `(UTC+8:00) ${o("singapore", e)}` },
    { key: "Asia/Taipei", text: `(UTC+8:00) ${o("taipei", e)}` },
    { key: "Asia/Manila", text: `(UTC+8:00) ${o("manila", e)}` },
    { key: "Asia/Kuala_Lumpur", text: `(UTC+8:00) ${o("kuala_lumpur", e)}` },
    { key: "Australia/Perth", text: `(UTC+8:00) ${o("perth", e)}` },
    // East Asia (UTC+9)
    { key: "Asia/Tokyo", text: `(UTC+9:00) ${o("tokyo", e)}` },
    { key: "Asia/Seoul", text: `(UTC+9:00) ${o("seoul", e)}` },
    { key: "Asia/Pyongyang", text: `(UTC+9:00) ${o("pyongyang", e)}` },
    // Australia (UTC+9:30 to UTC+10)
    { key: "Australia/Adelaide", text: `(UTC+9:30) ${o("adelaide", e)}` },
    { key: "Australia/Darwin", text: `(UTC+9:30) ${o("darwin", e)}` },
    { key: "Australia/Brisbane", text: `(UTC+10:00) ${o("brisbane", e)}` },
    { key: "Australia/Sydney", text: `(UTC+10:00) ${o("sydney", e)}` },
    { key: "Australia/Melbourne", text: `(UTC+10:00) ${o("melbourne", e)}` },
    { key: "Pacific/Guam", text: `(UTC+10:00) ${o("guam", e)}` },
    // Pacific (UTC+10 to UTC+13)
    { key: "Pacific/Port_Moresby", text: `(UTC+10:00) ${o("port_moresby", e)}` },
    { key: "Pacific/Norfolk", text: `(UTC+11:00) ${o("norfolk", e)}` },
    { key: "Pacific/Guadalcanal", text: `(UTC+11:00) ${o("guadalcanal", e)}` },
    { key: "Pacific/Auckland", text: `(UTC+12:00) ${o("auckland", e)}` },
    { key: "Pacific/Fiji", text: `(UTC+12:00) ${o("fiji", e)}` },
    { key: "Pacific/Tongatapu", text: `(UTC+13:00) ${o("tongatapu", e)}` },
    { key: "Pacific/Apia", text: `(UTC+13:00) ${o("apia", e)}` }
  ];
}
const eh = (e) => {
  const [t, r] = w(e.timezone), n = Y(() => Jd(e.locale));
  return k(ae, {
    get title() {
      return o("timezone", e.locale);
    },
    width: 320,
    get buttons() {
      return [{
        children: o("confirm", e.locale),
        onClick: () => {
          e.onConfirm(t()), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      return k(K9, {
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
          return o("Search Timezone", e.locale) || "Search timezone...";
        }
      });
    }
  });
};
function r9(e) {
  return [
    {
      key: "candle.type",
      text: o("candle_type", e),
      component: "select",
      dataSource: [
        { key: "candle_solid", text: o("candle_solid", e) },
        { key: "candle_stroke", text: o("candle_stroke", e) },
        { key: "candle_up_stroke", text: o("candle_up_stroke", e) },
        { key: "candle_down_stroke", text: o("candle_down_stroke", e) },
        { key: "ohlc", text: o("ohlc", e) },
        { key: "area", text: o("area", e) }
      ]
    },
    {
      key: "candle.priceMark.last.show",
      text: o("last_price_show", e),
      component: "switch"
    },
    {
      key: "candle.priceMark.high.show",
      text: o("high_price_show", e),
      component: "switch"
    },
    {
      key: "candle.priceMark.low.show",
      text: o("low_price_show", e),
      component: "switch"
    },
    {
      key: "indicator.lastValueMark.show",
      text: o("indicator_last_value_show", e),
      component: "switch"
    },
    {
      key: "yAxis.type",
      text: o("price_axis_type", e),
      component: "select",
      dataSource: [
        { key: "normal", text: o("normal", e) },
        { key: "percentage", text: o("percentage", e) },
        { key: "log", text: o("log", e) }
      ]
    },
    {
      key: "yAxis.reverse",
      text: o("reverse_coordinate", e),
      component: "switch"
    },
    {
      key: "grid.show",
      text: o("grid_show", e),
      component: "switch"
    }
  ];
}
const th = /* @__PURE__ */ b('<div class="klinecharts-pro-setting-modal-content"></div>'), rh = /* @__PURE__ */ b('<div class="setting-item"><span class="setting-label"></span><div class="setting-control"></div></div>'), nh = (e) => {
  const [t, r] = w(e.currentStyles), [n, a] = w(r9(e.locale)), [l, u] = w(!1), c = () => {
    u(window.innerWidth <= 768);
  };
  Nt(() => {
    c(), window.addEventListener("resize", c);
  }), re(() => {
    window.removeEventListener("resize", c);
  }), S1(() => {
    a(r9(e.locale));
  });
  const g = ($, f) => {
    const L = {};
    Mt(L, $.key, f);
    const x = o1.clone(t());
    Mt(x, $.key, f), r(x), a(n().map((S) => ({
      ...S
    }))), e.onChange(L);
  };
  return k(ae, {
    get title() {
      return o("setting", e.locale);
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
        children: o("restore_default", e.locale),
        onClick: () => {
          e.onRestoreDefault(n()), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      const $ = th.cloneNode(!0);
      return _($, k(At, {
        get each() {
          return n();
        },
        children: (f) => {
          let L;
          const x = o1.formatValue(t(), f.key);
          switch (f.component) {
            case "select": {
              L = k(K9, {
                get style() {
                  return {
                    width: l() ? "100%" : "120px",
                    "min-width": l() ? "auto" : "120px"
                  };
                },
                get value() {
                  return o(x, e.locale);
                },
                get dataSource() {
                  return f.dataSource;
                },
                onSelected: (S) => {
                  const P = S.key;
                  g(f, P);
                }
              });
              break;
            }
            case "switch": {
              const S = !!x;
              L = k(j4, {
                open: S,
                onChange: () => {
                  g(f, !S);
                }
              });
              break;
            }
          }
          return (() => {
            const S = rh.cloneNode(!0), P = S.firstChild, O = P.nextSibling;
            return _(P, () => f.text), _(O, L), B(() => S.classList.toggle("mobile-item", !!l())), S;
          })();
        }
      })), B(() => $.classList.toggle("mobile-layout", !!l())), $;
    }
  });
}, ih = /* @__PURE__ */ b('<img style="width:500px;margin-top: 20px">'), ah = (e) => k(ae, {
  get title() {
    return o("screenshot", e.locale);
  },
  width: 540,
  get buttons() {
    return [{
      type: "confirm",
      children: o("save", e.locale),
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
    const t = ih.cloneNode(!0);
    return B(() => v1(t, "src", e.url)), t;
  }
}), oh = {
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
}, sh = /* @__PURE__ */ b('<div class="klinecharts-pro-indicator-setting-modal-content"></div>'), lh = /* @__PURE__ */ b("<span></span>"), ch = (e) => {
  const [t, r] = w(o1.clone(e.params.calcParams)), n = (a) => oh[a];
  return k(ae, {
    get title() {
      return e.params.indicatorName;
    },
    width: 360,
    get buttons() {
      return [{
        type: "confirm",
        children: o("confirm", e.locale),
        onClick: () => {
          const a = n(e.params.indicatorName), l = [];
          o1.clone(t()).forEach((u, c) => {
            !o1.isValid(u) || u === "" ? "default" in a[c] && l.push(a[c].default) : l.push(u);
          }), e.onConfirm(l), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      const a = sh.cloneNode(!0);
      return _(a, () => n(e.params.indicatorName).map((l, u) => [(() => {
        const c = lh.cloneNode(!0);
        return _(c, () => o(l.paramNameKey, e.locale)), c;
      })(), k(j9, {
        style: {
          width: "200px"
        },
        get value() {
          return t()[u] ?? "";
        },
        get precision() {
          return l.precision;
        },
        get min() {
          return l.min;
        },
        onChange: (c) => {
          const g = o1.clone(t());
          g[u] = c, r(g);
        }
      })])), a;
    }
  });
}, uh = /* @__PURE__ */ b('<svg viewBox="0 0 1024 1024"><path d="M945.066667 898.133333l-189.866667-189.866666c55.466667-64 87.466667-149.333333 87.466667-241.066667 0-204.8-168.533333-373.333333-373.333334-373.333333S96 264.533333 96 469.333333 264.533333 842.666667 469.333333 842.666667c91.733333 0 174.933333-34.133333 241.066667-87.466667l189.866667 189.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c8.533333-12.8 8.533333-34.133333-2.133333-46.933334zM469.333333 778.666667C298.666667 778.666667 160 640 160 469.333333S298.666667 160 469.333333 160 778.666667 298.666667 778.666667 469.333333 640 778.666667 469.333333 778.666667z"></path></svg>'), dh = /* @__PURE__ */ b('<img alt="symbol">'), hh = /* @__PURE__ */ b("<li><div><span></span></div></li>"), yh = (e) => {
  const [t, r] = w(""), [n] = P5(t, e.datafeed.searchSymbols.bind(e.datafeed));
  return k(ae, {
    get title() {
      return o("symbol_search", e.locale);
    },
    width: 460,
    get onClose() {
      return e.onClose;
    },
    get children() {
      return [k(j9, {
        class: "klinecharts-pro-symbol-search-modal-input",
        get placeholder() {
          return o("symbol_code", e.locale);
        },
        get suffix() {
          return uh.cloneNode(!0);
        },
        get value() {
          return t();
        },
        onChange: (a) => {
          const l = `${a}`;
          r(l);
        }
      }), k(rt, {
        class: "klinecharts-pro-symbol-search-modal-list",
        get loading() {
          return n.loading;
        },
        get dataSource() {
          return n() ?? [];
        },
        renderItem: (a) => (() => {
          const l = hh.cloneNode(!0), u = l.firstChild, c = u.firstChild;
          return l.$$click = () => {
            e.onSymbolSelected(a), e.onClose();
          }, _(u, k(z, {
            get when() {
              return a.logo;
            },
            get children() {
              const g = dh.cloneNode(!0);
              return B(() => v1(g, "src", a.logo)), g;
            }
          }), c), _(c, () => a.shortName ?? a.ticker, null), _(c, () => `${a.name ? `(${a.name})` : ""}`, null), _(l, () => a.exchange ?? "", null), B(() => v1(c, "title", a.name ?? "")), l;
        })()
      })];
    }
  });
};
F1(["click"]);
const fh = /* @__PURE__ */ b('<div class="klinecharts-pro-mobile-more-modal-content"><div class="item"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div><div class="item"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path></svg><span></span></div><div class="item"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg><span></span></div></div>'), Ch = (e) => k(ae, {
  get title() {
    return o("more", e.locale);
  },
  isMobile: !0,
  get onClose() {
    return e.onClose;
  },
  get children() {
    const t = fh.cloneNode(!0), r = t.firstChild, n = r.firstChild, a = n.nextSibling, l = r.nextSibling, u = l.firstChild, c = u.nextSibling, g = l.nextSibling, $ = g.firstChild, f = $.nextSibling;
    return r.$$click = () => {
      e.onIndicatorClick(), e.onClose();
    }, _(a, () => o("indicator", e.locale)), l.$$click = () => {
      e.onTimezoneClick(), e.onClose();
    }, _(c, () => o("timezone", e.locale)), g.$$click = () => {
      e.onSettingClick(), e.onClose();
    }, _(f, () => o("setting", e.locale)), t;
  }
});
F1(["click"]);
const gh = /* @__PURE__ */ b('<i class="icon-close klinecharts-pro-load-icon"></i>'), mh = /* @__PURE__ */ b('<div class="klinecharts-pro-content"><div class="klinecharts-pro-widget"></div></div>'), ph = /* @__PURE__ */ b('<div class="overlay-toolbar-color-popover"><div class="overlay-toolbar-color-grid"></div><div class="overlay-toolbar-color-footer"><button type="button" class="overlay-toolbar-add-color">+</button><div class="overlay-toolbar-color-slider"><span></span></div></div></div>'), vh = /* @__PURE__ */ b('<div class="overlay-toolbar-dropdown width-menu"></div>'), bh = /* @__PURE__ */ b('<div class="overlay-toolbar-dropdown style-menu"><button type="button"><span class="overlay-toolbar-style-sample solid"></span></button><button type="button"><span class="overlay-toolbar-style-sample dashed"></span></button><button type="button"><span class="overlay-toolbar-style-sample dotted"></span></button></div>'), $h = /* @__PURE__ */ b('<div class="klinecharts-pro-overlay-toolbar"><button type="button" class="overlay-toolbar-icon drag" title="Move"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="6" r="1.5"></circle><circle cx="15" cy="6" r="1.5"></circle><circle cx="9" cy="12" r="1.5"></circle><circle cx="15" cy="12" r="1.5"></circle><circle cx="9" cy="18" r="1.5"></circle><circle cx="15" cy="18" r="1.5"></circle></svg></button><button type="button" class="overlay-toolbar-icon refresh" title="Reset"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 15.4-6.36L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-15.4 6.36L3 16"></path><path d="M3 21v-5h5"></path></svg></button><div class="overlay-toolbar-picker"><button type="button" title="Color"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg></button></div><div class="overlay-toolbar-picker"><button type="button" title="Line width"><span class="overlay-toolbar-line-preview"></span><span>px</span></button></div><div class="overlay-toolbar-picker"><button type="button" title="Line style"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16"></path></svg></button></div><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2"></rect><path d="M20 4 4 20"></path></svg></button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg></button><button type="button" class="overlay-toolbar-icon delete" title="Delete"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6 18 20H6L5 6"></path><path d="M10 11v5"></path><path d="M14 11v5"></path></svg></button></div>'), _h = /* @__PURE__ */ b('<button type="button"></button>'), Lh = /* @__PURE__ */ b('<button type="button"><span class="overlay-toolbar-width-sample"></span></button>'), kh = /* @__PURE__ */ b('<div class="klinecharts-pro-quick-order-marker"><button type="button" class="klinecharts-pro-quick-order-plus">+</button></div>'), xh = /* @__PURE__ */ b('<div class="klinecharts-pro-quick-order-menu-anchor"><div class="klinecharts-pro-quick-order-menu"><button type="button">Buy <!> @ <!> Limit</button><button type="button">Buy <!> @ <!> Stop</button><button type="button">Create new order...</button><button type="button">Copy Price (<!>)</button><button type="button">Draw horizontal line on </button></div></div>');
function Ve(e, t, r, n) {
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
      indicator: l,
      defaultStyles: u
    }) => {
      const c = [];
      return l.visible ? (c.push(u.tooltip.icons[1]), c.push(u.tooltip.icons[2]), c.push(u.tooltip.icons[3])) : (c.push(u.tooltip.icons[0]), c.push(u.tooltip.icons[2]), c.push(u.tooltip.icons[3])), {
        icons: c
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
const Ah = (e) => {
  var i0, a0, o0, s0, l0, c0, u0, d0, h0, y0, f0, C0;
  let t, r = null, n;
  const [a, l] = w(!1), [u, c] = w(e.theme), [g, $] = w(e.styles), [f, L] = w(e.locale), [x, S] = w(e.symbol), [P, O] = w(e.period), [H, Q] = w(!1), [E, N] = w([...e.mainIndicators]), [K, G] = w({}), [T1, c1] = w(!1), [P1, j] = w({
    key: e.timezone,
    text: t9(e.timezone, e.locale)
  }), [X, R] = w(!1), [L1, Q1] = w(), [Z, V] = w(""), [g1, k1] = w(e.drawingBarVisible), [s1, x1] = w(!1), [C, U] = w(!1), [J, u1] = w(!1), W = ((i0 = e.orderTools) == null ? void 0 : i0.quickOrder) ?? !0, [b1, A1] = w({
    quickOrder: W,
    quickOrderFloatingWindow: ((a0 = e.orderTools) == null ? void 0 : a0.quickOrderFloatingWindow) ?? W,
    quickOrderPlusButton: ((o0 = e.orderTools) == null ? void 0 : o0.quickOrderPlusButton) ?? W,
    openOrders: ((s0 = e.orderTools) == null ? void 0 : s0.openOrders) ?? !0,
    positions: ((l0 = e.orderTools) == null ? void 0 : l0.positions) ?? !0,
    orderHistory: ((c0 = e.orderTools) == null ? void 0 : c0.orderHistory) ?? !0
  }), [O1, K1] = w(null), [W1, j1] = w(!1), [Be, I1] = w(!1), [_e, Ue] = w(64), [oe, Y1] = w(null), dt = 6, [_1, w1] = w(null), [D1, N1] = w(null), ht = ["#000000", "#2b3342", "#3f4653", "#565d69", "#6f7580", "#8a9099", "#a7acb3", "#c4c8ce", "#ffffff", "#ff4d67", "#ffa629", "#f7ed4a", "#2fc58d", "#4ab09c", "#52c4d3", "#3157f6", "#6a36b8", "#a644b9", "#d83972", "#f2a3a6", "#f5c879", "#f7ee97", "#a6d29f", "#7fc9b9", "#91d7df", "#8fb2ee", "#b09ad2", "#c89ccf", "#d987ab", "#e8757a", "#efb34f", "#efe36e", "#86c17d", "#66b7a8", "#68c4d0", "#5f91e4", "#8059c9", "#aa62c2", "#d34d83", "#b9353d", "#ea8527", "#e8c245", "#4b8c43", "#2f6f60", "#47919b", "#2646c6", "#56309c", "#892f95", "#a82563", "#8e2528", "#de5c1f", "#dc8527", "#255a22", "#164b34", "#225b63", "#15309b", "#442180", "#6b1f74", "#86154e"];
  let Le = null;
  const [se, I] = w({
    visible: !1,
    indicatorName: "",
    paneId: "",
    calcParams: []
  });
  let D = /* @__PURE__ */ new Map(), y1 = /* @__PURE__ */ new Map();
  const Fe = (i, s, d) => {
    const h = r == null ? void 0 : r.getIndicatorByPaneId(s, i);
    return {
      name: i,
      shortName: (h == null ? void 0 : h.shortName) || i,
      paneId: s,
      type: d,
      calcParams: (h == null ? void 0 : h.calcParams) || [],
      precision: (h == null ? void 0 : h.precision) ?? 4,
      visible: (h == null ? void 0 : h.visible) ?? !0,
      styles: h == null ? void 0 : h.styles,
      figures: h == null ? void 0 : h.figures
    };
  }, E1 = (i, s, d, h) => {
    if (e.onIndicatorChange)
      if (h === "add" || h === "change")
        setTimeout(() => {
          const m = Fe(i, s, d);
          e.onIndicatorChange({
            action: h,
            indicator: m
          });
        }, 50);
      else {
        const m = {
          name: i,
          shortName: i,
          paneId: s,
          type: d,
          calcParams: [],
          precision: 4,
          visible: !1,
          styles: void 0,
          figures: void 0
        };
        e.onIndicatorChange({
          action: h,
          indicator: m
        });
      }
  }, ke = (i) => ({
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
  })[i] || 1, le = (i, s = /* @__PURE__ */ new WeakSet()) => {
    if (i == null)
      return i;
    if (s.has(i))
      return "[Circular]";
    if (typeof i != "object")
      return i;
    if (s.add(i), Array.isArray(i))
      return i.map((h) => le(h, s));
    const d = {};
    for (const h in i)
      if (!(h === "__proto__" || h === "constructor" || h === "prototype"))
        try {
          const m = i[h];
          if (typeof m == "function")
            continue;
          d[h] = le(m, s);
        } catch (m) {
          d[h] = `[Error: ${m.message}]`;
        }
    return d;
  }, Q9 = (i) => {
    if (!i)
      return null;
    try {
      return {
        id: i.id || "",
        type: i.name || "",
        name: i.name || "",
        points: (i.points || []).map((s) => ({
          timestamp: s.timestamp || 0,
          value: s.value || 0,
          dataIndex: s.dataIndex || 0
        })),
        extendData: le(i.extendData || {}),
        styles: le(i.styles || {}),
        visible: i.visible ?? !0,
        lock: i.lock ?? !1,
        mode: i.mode || vt.Normal
      };
    } catch (s) {
      return console.error("Error extracting overlay data:", s), null;
    }
  }, xe = (i) => {
    var s, d, h;
    try {
      const m = (s = r == null ? void 0 : r.getOverlayById) == null ? void 0 : s.call(r, i);
      if (!m)
        return;
      const p = Q9(m);
      if (p) {
        const y = D.get(i), v = ((d = y == null ? void 0 : y.points) == null ? void 0 : d.length) || 0, A = ((h = p.points) == null ? void 0 : h.length) || 0;
        D.set(i, p);
        const M = ke(p.type);
        if (A >= M) {
          const T = y1.get(i);
          T && !T.complete && (T.complete = !0, T.checkInterval && (clearInterval(T.checkInterval), T.checkInterval = void 0));
        }
      }
    } catch (m) {
      console.error(`Error updating overlay tracking for ${i}:`, m);
    }
  }, Z9 = (i, s) => {
    if (y1.has(i))
      return;
    const d = {
      monitoring: !0,
      complete: !1,
      lastPointCount: 0
    };
    y1.set(i, d), xe(i);
    const h = () => {
      xe(i);
    };
    document.addEventListener("mouseup", h), document.addEventListener("touchend", h), setTimeout(() => {
      var p;
      const m = y1.get(i);
      if (m && !m.complete) {
        m.checkInterval && clearInterval(m.checkInterval), m.mouseUpHandler && (document.removeEventListener("mouseup", m.mouseUpHandler), document.removeEventListener("touchend", m.mouseUpHandler)), xe(i);
        const y = D.get(i);
        if (y) {
          const v = ke(y.type), A = ((p = y.points) == null ? void 0 : p.length) || 0;
          A < v && console.warn(`âš ï¸ ${y.type} ${i} has only ${A} point(s), should have ${v}`);
        }
      }
    }, 3e4);
  };
  let X1 = {
    saveDrawings: (i, s) => {
      try {
        const d = `kline_drawings_${i}`, m = {
          drawings: s.map((p) => {
            var M;
            const y = {
              ...p
            };
            y.extendData && (y.extendData = le(y.extendData)), y.styles && (y.styles = le(y.styles));
            const v = ke(p.type), A = ((M = p.points) == null ? void 0 : M.length) || 0;
            return A < v && console.warn(`âš ï¸ Saving ${p.type} with only ${A} point(s), needs ${v}`), y;
          }),
          timestamp: Date.now()
        };
        localStorage.setItem(d, JSON.stringify(m));
      } catch (d) {
        console.error("Library: Error saving drawings:", d);
      }
    },
    loadDrawings: (i) => {
      try {
        const s = `kline_drawings_${i}`, d = localStorage.getItem(s);
        if (d) {
          const h = JSON.parse(d), m = [];
          return Array.isArray(h.drawings) && h.drawings.forEach((p) => {
            var A;
            const y = ke(p.type);
            (((A = p.points) == null ? void 0 : A.length) || 0) >= y && m.push(p);
          }), m;
        }
      } catch (s) {
        console.error("Library: Error loading drawings:", s);
      }
      return [];
    },
    clearDrawings: (i) => {
      try {
        const s = `kline_drawings_${i}`;
        localStorage.removeItem(s);
      } catch (s) {
        console.error("Library: Error clearing drawings:", s);
      }
    }
  };
  const yt = () => {
    const i = x();
    if (i != null && i.ticker) {
      const s = Array.from(D.values());
      X1.saveDrawings(i.ticker, s);
    }
  }, R9 = (i) => {
    if (!i || !r)
      return;
    D.forEach((d, h) => {
      var m;
      (m = r == null ? void 0 : r.removeOverlay) == null || m.call(r, {
        id: h
      });
    }), D.clear(), y1.clear(), w1(null), N1(null), X1.loadDrawings(i).forEach((d) => {
      var h;
      try {
        const m = Ae({
          name: d.type,
          points: d.points || [],
          extendData: d.extendData,
          styles: d.styles,
          visible: d.visible ?? !0,
          lock: d.lock ?? !1,
          mode: d.mode || vt.Normal
        }), p = r == null ? void 0 : r.createOverlay(m), y = typeof p == "string" ? p : null;
        y && (D.set(y, {
          ...d,
          id: y
        }), y1.set(y, {
          monitoring: !1,
          complete: !0,
          lastPointCount: ((h = d.points) == null ? void 0 : h.length) || 0
        }));
      } catch (m) {
        console.error("Library: Error restoring drawing:", m);
      }
    });
  }, ft = (i) => {
    var d, h;
    const s = {
      ...b1(),
      ...i
    };
    if ("quickOrder" in i) {
      const m = i.quickOrder ?? !1;
      s.quickOrderFloatingWindow = m, s.quickOrderPlusButton = m;
    } else
      ("quickOrderFloatingWindow" in i || "quickOrderPlusButton" in i) && (s.quickOrder = s.quickOrderFloatingWindow || s.quickOrderPlusButton);
    A1(s), (h = (d = e.orderTools) == null ? void 0 : d.onChange) == null || h.call(d, s);
  }, Ke = (i) => {
    var d;
    const s = Math.min(Math.max(((d = x()) == null ? void 0 : d.pricePrecision) ?? 2, 0), 8);
    return i.toLocaleString(void 0, {
      minimumFractionDigits: s,
      maximumFractionDigits: s
    });
  }, V9 = (i) => {
    var d, h;
    const s = Number(i == null ? void 0 : i.y);
    if (!Number.isFinite(s))
      return NaN;
    try {
      const m = r == null ? void 0 : r.convertFromPixel([{
        x: (i == null ? void 0 : i.x) ?? 0,
        y: s
      }], {
        paneId: "candle_pane"
      }), p = Number((d = m == null ? void 0 : m[0]) == null ? void 0 : d.value);
      if (Number.isFinite(p) && p > 0)
        return p;
    } catch {
    }
    try {
      const m = r == null ? void 0 : r.convertFromPixel([{
        x: (i == null ? void 0 : i.x) ?? 0,
        y: s
      }], {
        paneId: "candle_pane",
        absolute: !0
      }), p = Number((h = m == null ? void 0 : m[0]) == null ? void 0 : h.value);
      if (Number.isFinite(p) && p > 0)
        return p;
    } catch {
    }
    return NaN;
  }, Yt = (i) => {
    var p;
    if (!b1().quickOrderPlusButton || (i == null ? void 0 : i.paneId) !== "candle_pane" || !t) {
      if (Be() || W1())
        return;
      K1(null), j1(!1);
      return;
    }
    const s = (p = r == null ? void 0 : r.getSize) == null ? void 0 : p.call(r, "candle_pane", bt.YAxis);
    s != null && s.width && Number.isFinite(s.width) && Ue(Math.max(44, Math.ceil(s.width)));
    const d = Number(i.y), h = V9(i), m = t.clientHeight;
    if (!Number.isFinite(d) || !Number.isFinite(h) || h <= 0 || d < 0 || d > m) {
      if (Be() || W1())
        return;
      K1(null), j1(!1);
      return;
    }
    Le = {
      ...i
    }, K1({
      y: d,
      price: h
    });
  }, ce = () => {
    var i;
    if (Le)
      try {
        (i = r == null ? void 0 : r.executeAction) == null || i.call(r, ze.OnCrosshairChange, Le);
      } catch {
      }
  }, Ct = (i) => {
    var d, h;
    const s = oe() ?? O1();
    s && ((h = (d = e.orderTools) == null ? void 0 : d.onQuickOrderAction) == null || h.call(d, {
      action: i,
      price: s.price,
      symbol: x()
    }), j1(!1), Y1(null), I1(!1));
  }, H9 = async () => {
    var s;
    const i = oe() ?? O1();
    if (i) {
      try {
        await ((s = navigator.clipboard) == null ? void 0 : s.writeText(String(i.price)));
      } catch {
      }
      j1(!1), Y1(null), I1(!1);
    }
  }, Y9 = () => {
    const i = oe() ?? O1();
    i && (r == null || r.createOverlay(Ae({
      name: "horizontalStraightLine",
      points: [{
        value: i.price
      }],
      lock: !1
    })), j1(!1), Y1(null), I1(!1));
  }, q9 = (i) => {
    var v, A, M, T, q, i1;
    const s = (A = (v = t == null ? void 0 : t.parentElement) == null ? void 0 : v.getBoundingClientRect) == null ? void 0 : A.call(v), d = (M = t == null ? void 0 : t.getBoundingClientRect) == null ? void 0 : M.call(t), h = i == null ? void 0 : i.overlay, m = (T = h == null ? void 0 : h.points) == null ? void 0 : T[0];
    let p = 72, y = 40;
    if (s) {
      if (Number.isFinite(i == null ? void 0 : i.pageX) ? p = i.pageX - s.left : Number.isFinite(i == null ? void 0 : i.x) && d && (p = d.left - s.left + i.x), Number.isFinite(i == null ? void 0 : i.pageY))
        y = i.pageY - s.top;
      else if (Number.isFinite(i == null ? void 0 : i.y) && d)
        y = d.top - s.top + i.y;
      else if (Number.isFinite(m == null ? void 0 : m.value))
        try {
          const l1 = (q = r == null ? void 0 : r.convertToPixel) == null ? void 0 : q.call(r, [{
            value: m.value
          }], {
            paneId: "candle_pane",
            absolute: !0
          }), f1 = Number((i1 = l1 == null ? void 0 : l1[0]) == null ? void 0 : i1.y);
          Number.isFinite(f1) && (y = f1 - s.top);
        } catch {
        }
    }
    return {
      x: Math.max(12, Math.min(p - 28, ((s == null ? void 0 : s.width) ?? 360) - 320)),
      y: Math.max(8, y - 52)
    };
  }, gt = (i) => {
    var v, A, M, T, q, i1, l1, f1;
    const s = i == null ? void 0 : i.overlay;
    if (!(s != null && s.id) || s.name !== "horizontalStraightLine")
      return !1;
    const d = q9(i), h = Number((A = (v = s.styles) == null ? void 0 : v.line) == null ? void 0 : A.size) || 3, m = ((T = (M = s.styles) == null ? void 0 : M.line) == null ? void 0 : T.style) ?? Z1.Solid, p = Array.isArray((i1 = (q = s.styles) == null ? void 0 : q.line) == null ? void 0 : i1.dashedValue) ? s.styles.line.dashedValue : [], y = ((f1 = (l1 = s.styles) == null ? void 0 : l1.line) == null ? void 0 : f1.color) ?? "#2f6df6";
    return w1({
      id: s.id,
      x: d.x,
      y: d.y,
      lineSize: h,
      lineStyle: m,
      dashedValue: p,
      color: y,
      locked: s.lock ?? !1,
      visible: s.visible ?? !0
    }), !1;
  }, qt = (i) => {
    var d, h;
    const s = (d = i == null ? void 0 : i.overlay) == null ? void 0 : d.id;
    return (!s || ((h = _1()) == null ? void 0 : h.id) === s) && (w1(null), N1(null)), !1;
  }, Ae = (i) => {
    var y, v, A, M, T, q, i1, l1, f1;
    if (i.name !== "horizontalStraightLine")
      return i;
    const s = i.onClick, d = i.onSelected, h = i.onDeselected, m = i.onRemoved, p = i.onPressedMoveEnd;
    return {
      ...i,
      styles: {
        ...i.styles,
        line: {
          ...(y = i.styles) == null ? void 0 : y.line,
          size: Number((A = (v = i.styles) == null ? void 0 : v.line) == null ? void 0 : A.size) || 3,
          style: ((T = (M = i.styles) == null ? void 0 : M.line) == null ? void 0 : T.style) ?? Z1.Solid,
          dashedValue: ((i1 = (q = i.styles) == null ? void 0 : q.line) == null ? void 0 : i1.dashedValue) ?? [6, 4],
          color: ((f1 = (l1 = i.styles) == null ? void 0 : l1.line) == null ? void 0 : f1.color) ?? "#2f6df6"
        }
      },
      onClick: (t1) => (gt(t1), (s == null ? void 0 : s(t1)) ?? !1),
      onSelected: (t1) => (gt(t1), (d == null ? void 0 : d(t1)) ?? !1),
      onPressedMoveEnd: (t1) => (gt(t1), (p == null ? void 0 : p(t1)) ?? !1),
      onDeselected: (t1) => (qt(t1), (h == null ? void 0 : h(t1)) ?? !1),
      onRemoved: (t1) => (qt(t1), (m == null ? void 0 : m(t1)) ?? !1)
    };
  }, G9 = () => {
    var s;
    const i = _1();
    i && ((s = r == null ? void 0 : r.removeOverlay) == null || s.call(r, {
      id: i.id
    }), w1(null), N1(null));
  }, ue = (i) => {
    var d;
    const s = _1();
    s && ((d = r == null ? void 0 : r.overrideOverlay) == null || d.call(r, {
      id: s.id,
      ...i
    }), setTimeout(() => {
      xe(s.id), yt();
    }, 0));
  }, W9 = () => {
    const i = _1();
    if (!i)
      return;
    const s = !i.locked;
    ue({
      lock: s
    }), w1({
      ...i,
      locked: s
    });
  }, X9 = () => {
    const i = _1();
    if (!i)
      return;
    const s = !i.visible;
    ue({
      visible: s
    }), w1({
      ...i,
      visible: s
    });
  }, J9 = (i) => {
    const s = _1();
    s && (ue({
      styles: {
        line: {
          size: i
        }
      }
    }), w1({
      ...s,
      lineSize: i
    }), N1(null));
  }, mt = (i, s) => {
    const d = _1();
    d && (ue({
      styles: {
        line: {
          style: i,
          dashedValue: s
        }
      }
    }), w1({
      ...d,
      lineStyle: i,
      dashedValue: s
    }), N1(null));
  }, e5 = () => {
    const i = _1();
    if (!i)
      return;
    const s = 1, d = Z1.Solid, h = [6, 4], m = "#2f6df6";
    ue({
      styles: {
        line: {
          size: s,
          style: d,
          dashedValue: h,
          color: m
        }
      }
    }), w1({
      ...i,
      lineSize: s,
      lineStyle: d,
      dashedValue: h,
      color: m
    }), N1(null);
  }, t5 = (i) => {
    const s = _1();
    s && (ue({
      styles: {
        line: {
          color: i
        }
      }
    }), w1({
      ...s,
      color: i
    }));
  }, r5 = (i) => {
    var M, T;
    const s = _1();
    if (!s || !t)
      return;
    i.preventDefault(), i.stopPropagation(), N1(null);
    const d = (T = (M = t.parentElement) == null ? void 0 : M.getBoundingClientRect) == null ? void 0 : T.call(M);
    if (!d)
      return;
    const h = i.clientX, m = i.clientY, p = s.x, y = s.y, v = (q) => {
      q.preventDefault();
      const i1 = p + q.clientX - h, l1 = y + q.clientY - m;
      w1({
        ...s,
        x: Math.max(8, Math.min(i1, d.width - 320)),
        y: Math.max(8, Math.min(l1, d.height - 48))
      });
    }, A = () => {
      document.removeEventListener("mousemove", v), document.removeEventListener("mouseup", A);
    };
    document.addEventListener("mousemove", v), document.addEventListener("mouseup", A);
  }, n5 = () => {
    j1(!1), Y1(null), I1(!1);
  }, Gt = (i) => {
    var d, h;
    if (!W1())
      return;
    const s = i.target;
    (d = s == null ? void 0 : s.closest) != null && d.call(s, ".klinecharts-pro-quick-order-marker") || (h = s == null ? void 0 : s.closest) != null && h.call(s, ".klinecharts-pro-quick-order-menu-anchor") || n5();
  };
  let Wt = (u0 = e.orderTools) == null ? void 0 : u0.quickOrder, Xt = (d0 = e.orderTools) == null ? void 0 : d0.quickOrderFloatingWindow, Jt = (h0 = e.orderTools) == null ? void 0 : h0.quickOrderPlusButton, e0 = (y0 = e.orderTools) == null ? void 0 : y0.openOrders, t0 = (f0 = e.orderTools) == null ? void 0 : f0.positions, r0 = (C0 = e.orderTools) == null ? void 0 : C0.orderHistory;
  S1(() => {
    var v, A, M, T, q, i1;
    const i = (v = e.orderTools) == null ? void 0 : v.quickOrder, s = (A = e.orderTools) == null ? void 0 : A.quickOrderFloatingWindow, d = (M = e.orderTools) == null ? void 0 : M.quickOrderPlusButton, h = (T = e.orderTools) == null ? void 0 : T.openOrders, m = (q = e.orderTools) == null ? void 0 : q.positions, p = (i1 = e.orderTools) == null ? void 0 : i1.orderHistory, y = {};
    typeof i == "boolean" && i !== Wt && (Wt = i, y.quickOrder = i, typeof s != "boolean" && (y.quickOrderFloatingWindow = i), typeof d != "boolean" && (y.quickOrderPlusButton = i)), typeof s == "boolean" && s !== Xt && (Xt = s, y.quickOrderFloatingWindow = s), typeof d == "boolean" && d !== Jt && (Jt = d, y.quickOrderPlusButton = d), typeof h == "boolean" && h !== e0 && (e0 = h, y.openOrders = h), typeof m == "boolean" && m !== t0 && (t0 = m, y.positions = m), typeof p == "boolean" && p !== r0 && (r0 = p, y.orderHistory = p), Object.keys(y).length > 0 && ft(y);
  }), e.ref({
    setTheme: c,
    getTheme: () => u(),
    setStyles: $,
    getStyles: () => r.getStyles(),
    setLocale: L,
    getLocale: () => f(),
    setTimezone: (i) => {
      j({
        key: i,
        text: t9(e.timezone, f())
      });
    },
    getTimezone: () => P1().key,
    setSymbol: S,
    getSymbol: () => x(),
    setPeriod: O,
    getPeriod: () => P(),
    getMainIndicators: () => E(),
    getSubIndicators: () => K(),
    setMainIndicators: N,
    setSubIndicators: G,
    overrideIndicator: (i, s) => {
      r == null || r.overrideIndicator(i, s);
    },
    createOverlay: (i) => {
      var d;
      const s = (d = r == null ? void 0 : r.createOverlay) == null ? void 0 : d.call(r, Ae(i));
      return typeof s == "string" ? s : null;
    },
    removeOverlay: (i) => {
      var s;
      if ((s = r == null ? void 0 : r.removeOverlay) == null || s.call(r, i), i.id) {
        D.delete(i.id);
        const d = y1.get(i.id);
        d && (d.checkInterval && clearInterval(d.checkInterval), d.mouseUpHandler && (document.removeEventListener("mouseup", d.mouseUpHandler), document.removeEventListener("touchend", d.mouseUpHandler)), y1.delete(i.id)), yt();
      }
    },
    removeAllOverlay: () => {
      D.forEach((i, s) => {
        var h;
        (h = r == null ? void 0 : r.removeOverlay) == null || h.call(r, {
          id: s
        });
        const d = y1.get(s);
        d && (d.checkInterval && clearInterval(d.checkInterval), d.mouseUpHandler && (document.removeEventListener("mouseup", d.mouseUpHandler), document.removeEventListener("touchend", d.mouseUpHandler)));
      }), D.clear(), y1.clear();
    },
    getAllOverlay: () => Array.from(D.values()),
    getOverlay: (i) => D.get(i) || null,
    overrideOverlay: (i) => {
      r && "overrideOverlay" in r && typeof r.overrideOverlay == "function" ? r.overrideOverlay(i) : console.warn("overrideOverlay method not available on widget");
    },
    convertToPixel: (i, s) => r ? r.convertToPixel(i, s) : Array.isArray(i) ? [] : {},
    convertFromPixel: (i, s) => r ? r.convertFromPixel(i, s) : [],
    getVisibleRange: () => r ? r.getVisibleRange() : {
      from: 0,
      to: 0
    },
    getDataList: () => r ? r.getDataList() : [],
    getSize: (i, s) => r ? r.getSize(i, s) : null,
    subscribeAction: (i, s) => {
      r && r.subscribeAction(i, s);
    },
    unsubscribeAction: (i, s) => {
      r && r.unsubscribeAction(i, s);
    },
    setIndicatorModalVisible: Q,
    setTimezoneModalVisible: c1,
    setSettingModalVisible: R,
    getOrderToolsState: () => b1(),
    setOrderToolsState: (i) => {
      ft(i);
    },
    dispose: () => {
      t && g0(t);
    },
    resize: () => {
      r && "resize" in r && typeof r.resize == "function" ? r.resize() : console.warn("resize method not available on widget");
    },
    getSettings: () => {
      var d, h, m, p, y, v, A, M, T, q, i1, l1, f1, t1, B1, de;
      if (!r)
        return {};
      const i = r.getStyles(), s = (d = i.candle) == null ? void 0 : d.bar;
      return {
        // Candle settings
        candleType: (h = i.candle) == null ? void 0 : h.type,
        candleBarStyle: s == null ? void 0 : s.style,
        // bar.style might be LineType
        showLastPrice: (y = (p = (m = i.candle) == null ? void 0 : m.priceMark) == null ? void 0 : p.last) == null ? void 0 : y.show,
        showHighestPrice: (M = (A = (v = i.candle) == null ? void 0 : v.priceMark) == null ? void 0 : A.high) == null ? void 0 : M.show,
        showLowestPrice: (i1 = (q = (T = i.candle) == null ? void 0 : T.priceMark) == null ? void 0 : q.low) == null ? void 0 : i1.show,
        // Indicator settings
        showIndicatorLastValue: (f1 = (l1 = i.indicator) == null ? void 0 : l1.lastValueMark) == null ? void 0 : f1.show,
        // Axis settings - yAxis.reverse is boolean according to YAxisStyle interface
        priceAxisType: (t1 = i.yAxis) == null ? void 0 : t1.type,
        reverseCoordinate: (B1 = i.yAxis) == null ? void 0 : B1.reverse,
        // Grid settings
        showGrids: (de = i.grid) == null ? void 0 : de.show,
        timestamp: Date.now()
      };
    },
    setSettings: (i) => {
      var d, h, m, p, y, v, A, M, T, q, i1;
      if (!r)
        return;
      const s = {};
      if (i.candleType !== void 0 && (s.candle = {
        ...s.candle,
        type: i.candleType
      }), i.candleBarStyle !== void 0) {
        const l1 = ((d = s.candle) == null ? void 0 : d.bar) || {};
        s.candle = {
          ...s.candle,
          bar: {
            ...l1,
            style: i.candleBarStyle
          }
          // Use any since ChangeColor doesn't have style
        };
      }
      i.showLastPrice !== void 0 && (s.candle = {
        ...s.candle,
        priceMark: {
          ...(h = s.candle) == null ? void 0 : h.priceMark,
          last: {
            ...(p = (m = s.candle) == null ? void 0 : m.priceMark) == null ? void 0 : p.last,
            show: i.showLastPrice
          }
        }
      }), i.showHighestPrice !== void 0 && (s.candle = {
        ...s.candle,
        priceMark: {
          ...(y = s.candle) == null ? void 0 : y.priceMark,
          high: {
            ...(A = (v = s.candle) == null ? void 0 : v.priceMark) == null ? void 0 : A.high,
            show: i.showHighestPrice
          }
        }
      }), i.showLowestPrice !== void 0 && (s.candle = {
        ...s.candle,
        priceMark: {
          ...(M = s.candle) == null ? void 0 : M.priceMark,
          low: {
            ...(q = (T = s.candle) == null ? void 0 : T.priceMark) == null ? void 0 : q.low,
            show: i.showLowestPrice
          }
        }
      }), i.showIndicatorLastValue !== void 0 && (s.indicator = {
        ...s.indicator,
        lastValueMark: {
          ...(i1 = s.indicator) == null ? void 0 : i1.lastValueMark,
          show: i.showIndicatorLastValue
        }
      }), i.priceAxisType !== void 0 && (s.yAxis = {
        ...s.yAxis,
        type: i.priceAxisType
      }), i.reverseCoordinate !== void 0 && (s.yAxis = {
        ...s.yAxis,
        reverse: i.reverseCoordinate
      }), i.showGrids !== void 0 && (s.grid = {
        ...s.grid,
        show: i.showGrids
      }), r.setStyles(s);
    },
    resetSettings: () => {
      var d, h, m, p, y, v, A;
      if (!r)
        return;
      r.getStyles();
      const i = {
        candle: {
          type: s5.CandleSolid,
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
          type: l5.Normal,
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
      }, s = L1();
      if (s) {
        const M = {
          candle: {
            type: (d = s.candle) == null ? void 0 : d.type,
            bar: (h = s.candle) == null ? void 0 : h.bar,
            priceMark: (m = s.candle) == null ? void 0 : m.priceMark
          },
          indicator: {
            lastValueMark: (p = s.indicator) == null ? void 0 : p.lastValueMark
          },
          yAxis: {
            type: (y = s.yAxis) == null ? void 0 : y.type,
            reverse: (v = s.yAxis) == null ? void 0 : v.reverse
          },
          grid: {
            show: (A = s.grid) == null ? void 0 : A.show
          }
        };
        r.setStyles(M);
      } else
        r.setStyles(i);
    },
    // === Drawing Methods ===
    saveDrawings: (i) => {
      const s = Array.from(D.values());
      s.forEach((d, h) => {
        var y;
        const m = ke(d.type), p = ((y = d.points) == null ? void 0 : y.length) || 0;
        p < m && console.warn(`âš ï¸ ${d.type} ${d.id} has only ${p} point(s), should have ${m}`);
      }), X1.saveDrawings(i, s);
    },
    loadDrawings: (i) => {
      X1.loadDrawings(i).forEach((d, h) => {
        var m;
        try {
          const p = {
            name: d.type,
            points: d.points || [],
            extendData: d.extendData,
            styles: d.styles,
            visible: d.visible ?? !0,
            lock: d.lock ?? !1,
            mode: d.mode ?? vt.Normal
          }, y = r == null ? void 0 : r.createOverlay(p), v = typeof y == "string" ? y : null;
          v && (D.set(v, {
            ...d,
            id: v
          }), y1.set(v, {
            monitoring: !1,
            complete: !0,
            lastPointCount: ((m = d.points) == null ? void 0 : m.length) || 0
          }));
        } catch (p) {
          console.error(`   âŒ Error restoring ${d.type}:`, p);
        }
      });
    },
    getDrawings: (i) => X1.loadDrawings(i),
    clearDrawings: (i) => {
      X1.clearDrawings(i);
    },
    // Auto-save on overlay events
    enableAutoSave: (i, s = !0) => {
    }
  });
  const n0 = () => {
    r == null || r.resize();
  }, pt = (i, s, d) => {
    let h = s, m = h;
    switch (i.timespan) {
      case "minute": {
        h = h - h % (60 * 1e3), m = h - d * i.multiplier * 60 * 1e3;
        break;
      }
      case "hour": {
        h = h - h % (60 * 60 * 1e3), m = h - d * i.multiplier * 60 * 60 * 1e3;
        break;
      }
      case "day": {
        h = h - h % (60 * 60 * 1e3), m = h - d * i.multiplier * 24 * 60 * 60 * 1e3;
        break;
      }
      case "week": {
        const y = new Date(h).getDay(), v = y === 0 ? 6 : y - 1;
        h = h - v * 60 * 60 * 24;
        const A = new Date(h);
        h = (/* @__PURE__ */ new Date(`${A.getFullYear()}-${A.getMonth() + 1}-${A.getDate()}`)).getTime(), m = d * i.multiplier * 7 * 24 * 60 * 60 * 1e3;
        break;
      }
      case "month": {
        const p = new Date(h), y = p.getFullYear(), v = p.getMonth() + 1;
        h = (/* @__PURE__ */ new Date(`${y}-${v}-01`)).getTime(), m = d * i.multiplier * 30 * 24 * 60 * 60 * 1e3;
        const A = new Date(m);
        m = (/* @__PURE__ */ new Date(`${A.getFullYear()}-${A.getMonth() + 1}-01`)).getTime();
        break;
      }
      case "year": {
        const y = new Date(h).getFullYear();
        h = (/* @__PURE__ */ new Date(`${y}-01-01`)).getTime(), m = d * i.multiplier * 365 * 24 * 60 * 60 * 1e3;
        const v = new Date(m);
        m = (/* @__PURE__ */ new Date(`${v.getFullYear()}-01-01`)).getTime();
        break;
      }
    }
    return [m, h];
  };
  return Nt(() => {
    if (window.addEventListener("resize", n0), r = o5(t, {
      customApi: {
        formatDate: (y, v, A, M) => {
          switch (P().timespan) {
            case "minute":
              return M === je.XAxis ? o1.formatDate(y, v, "HH:mm") : o1.formatDate(y, v, "YYYY-MM-DD HH:mm");
            case "hour":
              return M === je.XAxis ? o1.formatDate(y, v, "MM-DD HH:mm") : o1.formatDate(y, v, "YYYY-MM-DD HH:mm");
            case "day":
            case "week":
              return o1.formatDate(y, v, "YYYY-MM-DD");
            case "month":
              return M === je.XAxis ? o1.formatDate(y, v, "YYYY-MM") : o1.formatDate(y, v, "YYYY-MM-DD");
            case "year":
              return M === je.XAxis ? o1.formatDate(y, v, "YYYY") : o1.formatDate(y, v, "YYYY-MM-DD");
          }
          return o1.formatDate(y, v, "YYYY-MM-DD HH:mm");
        }
      }
    }), r) {
      const y = r.getDom("candle_pane", bt.Main);
      if (y) {
        let A = document.createElement("div");
        if (A.className = "klinecharts-pro-watermark", o1.isString(e.watermark)) {
          const M = e.watermark.replace(/(^\s*)|(\s*$)/g, "");
          A.innerHTML = M;
        } else
          A.appendChild(e.watermark);
        y.appendChild(A);
      }
      const v = r.getDom("candle_pane", bt.YAxis);
      n = document.createElement("span"), n.className = "klinecharts-pro-price-unit", v == null || v.appendChild(n);
    }
    let i = !1;
    const s = () => {
      const y = x();
      if (y != null && y.ticker)
        try {
          const v = Array.from(D.values());
          X1.saveDrawings(y.ticker, v);
        } catch (v) {
          console.error("âŒ Error refreshing local storage:", v);
        }
    }, d = (y) => {
      i || (i = !0, y.preventDefault());
    };
    setTimeout(() => {
      t && t.addEventListener("contextmenu", d);
    }, 1e3), document.addEventListener("contextmenu", (y) => {
      t && t.contains(y.target) && d(y);
    });
    const h = r == null ? void 0 : r.removeOverlay;
    r && h && (r.removeOverlay = function(...y) {
      const v = h.apply(this, y), A = y[0];
      let M;
      if (typeof A == "string" ? M = A : A && typeof A == "object" && A.id && (M = A.id), M) {
        D.delete(M);
        const T = y1.get(M);
        T && (T.checkInterval && clearInterval(T.checkInterval), T.mouseUpHandler && (document.removeEventListener("mouseup", T.mouseUpHandler), document.removeEventListener("touchend", T.mouseUpHandler)), y1.delete(M)), s();
      }
      return v;
    }), E().forEach((y) => {
      Ve(r, y, !0, {
        id: "candle_pane"
      });
    });
    const m = {};
    e.subIndicators.forEach((y) => {
      const v = Ve(r, y, !0);
      v && (m[y] = v);
    }), G(m), r == null || r.loadMore((y) => {
      l(!0), (async () => {
        try {
          const A = P(), [M] = pt(A, y, 1), [T] = pt(A, M, 500), q = await e.datafeed.getHistoryKLineData(x(), A, T, M);
          r == null || r.applyMoreData(q, q.length > 0);
        } finally {
          l(!1);
        }
      })();
    }), r == null || r.subscribeAction(ze.OnTooltipIconClick, (y) => {
      if (y.indicatorName)
        switch (y.iconId) {
          case "visible": {
            r == null || r.overrideIndicator({
              name: y.indicatorName,
              visible: !0
            }, y.paneId);
            const v = y.paneId === "candle_pane" ? "main" : "sub";
            E1(y.indicatorName, y.paneId, v, "change");
            break;
          }
          case "invisible": {
            r == null || r.overrideIndicator({
              name: y.indicatorName,
              visible: !1
            }, y.paneId);
            const v = y.paneId === "candle_pane" ? "main" : "sub";
            E1(y.indicatorName, y.paneId, v, "change");
            break;
          }
          case "setting": {
            const v = r == null ? void 0 : r.getIndicatorByPaneId(y.paneId, y.indicatorName);
            I({
              visible: !0,
              indicatorName: y.indicatorName,
              paneId: y.paneId,
              calcParams: v.calcParams
            });
            break;
          }
          case "close":
            if (y.paneId === "candle_pane") {
              const v = [...E()];
              r == null || r.removeIndicator("candle_pane", y.indicatorName), v.splice(v.indexOf(y.indicatorName), 1), N(v), E1(y.indicatorName, "candle_pane", "main", "remove");
            } else {
              const v = {
                ...K()
              };
              r == null || r.removeIndicator(y.paneId, y.indicatorName), delete v[y.indicatorName], G(v), E1(y.indicatorName, y.paneId, "sub", "remove");
            }
        }
    }), r == null || r.subscribeAction(ze.OnCrosshairChange, Yt), document.addEventListener("mousedown", Gt);
    const p = r == null ? void 0 : r.createOverlay;
    r && p && (r.createOverlay = function(...y) {
      const v = Ae(y[0]), A = p.apply(this, [v, ...y.slice(1)]), M = typeof A == "string" ? A : null;
      return M && (Z9(M, v.name || "unknown"), xe(M), yt()), A;
    });
  }), re(() => {
    window.removeEventListener("resize", n0), r == null || r.unsubscribeAction(ze.OnCrosshairChange, Yt), document.removeEventListener("mousedown", Gt), y1.clear(), D.clear(), g0(t);
  }), S1(() => {
    const i = x();
    i != null && i.priceCurrency ? (n.innerHTML = i == null ? void 0 : i.priceCurrency.toLocaleUpperCase(), n.style.display = "flex") : n.style.display = "none", r == null || r.setPriceVolumePrecision((i == null ? void 0 : i.pricePrecision) ?? 2, (i == null ? void 0 : i.volumePrecision) ?? 0);
  }), S1((i) => {
    const s = x(), d = P();
    let h = !0;
    return re(() => {
      h = !1;
    }), i && e.datafeed.unsubscribe(i.symbol, i.period), l(!0), U(!0), (async () => {
      try {
        const [p, y] = pt(d, (/* @__PURE__ */ new Date()).getTime(), 500), v = await e.datafeed.getHistoryKLineData(s, d, p, y);
        if (!h)
          return;
        r == null || r.applyNewData(v, v.length > 0), setTimeout(() => {
          h && R9(s == null ? void 0 : s.ticker);
        }, 0), e.datafeed.subscribe(s, d, (A) => {
          r == null || r.updateData(A);
        });
      } finally {
        h && (l(!1), U(!1));
      }
    })(), {
      symbol: s,
      period: d
    };
  }), S1(() => {
    const i = u();
    r == null || r.setStyles(i);
    const s = i === "dark" ? "#929AA5" : "#76808F";
    r == null || r.setStyles({
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
            position: Qe.Middle,
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
            color: s,
            activeColor: s,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "invisible",
            position: Qe.Middle,
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
            color: s,
            activeColor: s,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "setting",
            position: Qe.Middle,
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
            color: s,
            activeColor: s,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "close",
            position: Qe.Middle,
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
            color: s,
            activeColor: s,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }]
        }
      }
    });
  }), S1(() => {
    r == null || r.setLocale(f());
  }), S1(() => {
    r == null || r.setTimezone(P1().key);
  }), S1(() => {
    g() && (r == null || r.setStyles(g()), Q1(m4(r.getStyles())));
  }), [gh.cloneNode(!0), k($u, {
    get locale() {
      return e.locale;
    },
    get symbol() {
      return x();
    },
    get spread() {
      return g1();
    },
    get period() {
      return P();
    },
    get periods() {
      return e.periods;
    },
    onMenuClick: async () => {
      try {
        await O5(() => k1(!g1())), r == null || r.resize();
      } catch {
      }
    },
    onSymbolClick: () => {
      x1(!s1());
    },
    get onMobilePeriodClick() {
      return e.onMobilePeriodClick;
    },
    onMobileMoreClick: () => {
      e.onMobileMoreClick ? e.onMobileMoreClick() : u1(!0);
    },
    onPeriodChange: O,
    onIndicatorClick: () => {
      Q((i) => !i);
    },
    onTimezoneClick: () => {
      c1((i) => !i);
    },
    onSettingClick: () => {
      R((i) => !i);
    },
    onScreenshotClick: () => {
      if (r) {
        const i = e.screenshotBackgroundColor || (e.theme === "dark" ? "#11131E" : "#ffffff"), s = r.getConvertPictureUrl(!0, "jpeg", i);
        V(s);
      }
    },
    get showOrderToolsMenu() {
      var i;
      return ((i = e.orderTools) == null ? void 0 : i.visible) ?? !1;
    },
    get orderToolsState() {
      return b1();
    },
    onOrderToolsStateChange: ft
  }), (() => {
    const i = mh.cloneNode(!0), s = i.firstChild;
    return i.addEventListener("mouseleave", () => {
      K1(null), I1(!1);
    }), _(i, k(z, {
      get when() {
        return C();
      },
      get children() {
        return k(F9, {});
      }
    }), s), _(i, k(z, {
      get when() {
        return g1();
      },
      get children() {
        return k(Wd, {
          get locale() {
            return e.locale;
          },
          onDrawingItemClick: (d) => {
            r == null || r.createOverlay(Ae(d));
          },
          onModeChange: (d) => {
            r == null || r.overrideOverlay({
              mode: d
            });
          },
          onLockChange: (d) => {
            r == null || r.overrideOverlay({
              lock: d
            });
          },
          onVisibleChange: (d) => {
            r == null || r.overrideOverlay({
              visible: d
            });
          },
          onRemoveClick: (d) => {
            r == null || r.removeOverlay({
              groupId: d
            });
          }
        });
      }
    }), s), te((d) => t = d, s), _(i, k(z, {
      get when() {
        return _1();
      },
      keyed: !0,
      children: (d) => (() => {
        const h = $h.cloneNode(!0), m = h.firstChild, p = m.nextSibling, y = p.nextSibling, v = y.firstChild, A = y.nextSibling, M = A.firstChild, T = M.firstChild, q = T.nextSibling, i1 = q.firstChild, l1 = A.nextSibling, f1 = l1.firstChild, t1 = l1.nextSibling, B1 = t1.nextSibling, de = B1.nextSibling;
        return h.$$click = (F) => {
          F.stopPropagation();
        }, h.$$mousedown = (F) => {
          F.preventDefault(), F.stopPropagation();
        }, m.$$mousedown = r5, p.$$click = e5, v.$$click = () => N1(D1() === "color" ? null : "color"), _(y, k(z, {
          get when() {
            return D1() === "color";
          },
          get children() {
            const F = ph.cloneNode(!0), m1 = F.firstChild;
            return _(m1, k(At, {
              each: ht,
              children: (a1) => (() => {
                const $1 = _h.cloneNode(!0);
                return $1.$$click = () => t5(a1), $1.style.setProperty("background", a1), B(() => h1($1, `overlay-toolbar-color-swatch ${d.color.toLowerCase() === a1.toLowerCase() ? "selected" : ""}`)), $1;
              })()
            })), F;
          }
        }), null), M.$$click = () => N1(D1() === "width" ? null : "width"), _(q, () => d.lineSize, i1), _(A, k(z, {
          get when() {
            return D1() === "width";
          },
          get children() {
            const F = vh.cloneNode(!0);
            return _(F, k(At, {
              each: [1, 2, 3, 4],
              children: (m1) => (() => {
                const a1 = Lh.cloneNode(!0), $1 = a1.firstChild;
                return a1.$$click = () => J9(m1), $1.style.setProperty("height", `${m1}px`), B(() => h1(a1, d.lineSize === m1 ? "selected" : "")), a1;
              })()
            })), F;
          }
        }), null), f1.$$click = () => N1(D1() === "style" ? null : "style"), _(l1, k(z, {
          get when() {
            return D1() === "style";
          },
          get children() {
            const F = bh.cloneNode(!0), m1 = F.firstChild, a1 = m1.nextSibling, $1 = a1.nextSibling;
            return m1.$$click = () => mt(Z1.Solid, []), a1.$$click = () => mt(Z1.Dashed, [6, 4]), $1.$$click = () => mt(Z1.Dashed, [2, 4]), B((M1) => {
              var Te, Pe;
              const we = d.lineStyle === Z1.Solid ? "selected" : "", Me = d.lineStyle === Z1.Dashed && ((Te = d.dashedValue) == null ? void 0 : Te[0]) === 6 ? "selected" : "", Se = d.lineStyle === Z1.Dashed && ((Pe = d.dashedValue) == null ? void 0 : Pe[0]) === 2 ? "selected" : "";
              return we !== M1._v$ && h1(m1, M1._v$ = we), Me !== M1._v$2 && h1(a1, M1._v$2 = Me), Se !== M1._v$3 && h1($1, M1._v$3 = Se), M1;
            }, {
              _v$: void 0,
              _v$2: void 0,
              _v$3: void 0
            }), F;
          }
        }), null), t1.$$click = X9, B1.$$click = W9, de.$$click = G9, B((F) => {
          const m1 = `${d.x}px`, a1 = `${d.y}px`, $1 = `overlay-toolbar-icon edit ${D1() === "color" ? "active" : ""}`, M1 = `overlay-toolbar-line-size ${D1() === "width" ? "active" : ""}`, we = `overlay-toolbar-icon minus ${D1() === "style" ? "active" : ""}`, Me = `overlay-toolbar-icon visibility ${d.visible ? "" : "muted"}`, Se = d.visible ? "Hide" : "Show", Te = `overlay-toolbar-icon lock ${d.locked ? "active" : ""}`, Pe = d.locked ? "Unlock" : "Lock";
          return m1 !== F._v$4 && h.style.setProperty("left", F._v$4 = m1), a1 !== F._v$5 && h.style.setProperty("top", F._v$5 = a1), $1 !== F._v$6 && h1(v, F._v$6 = $1), M1 !== F._v$7 && h1(M, F._v$7 = M1), we !== F._v$8 && h1(f1, F._v$8 = we), Me !== F._v$9 && h1(t1, F._v$9 = Me), Se !== F._v$10 && v1(t1, "title", F._v$10 = Se), Te !== F._v$11 && h1(B1, F._v$11 = Te), Pe !== F._v$12 && v1(B1, "title", F._v$12 = Pe), F;
        }, {
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
    }), null), _(i, k(z, {
      get when() {
        return O1();
      },
      keyed: !0,
      children: (d) => (() => {
        const h = kh.cloneNode(!0), m = h.firstChild;
        return h.addEventListener("mouseleave", () => {
          W1() || I1(!1);
        }), h.$$mousemove = (p) => {
          p.stopPropagation(), ce();
        }, h.addEventListener("mouseenter", () => {
          I1(!0), ce();
        }), m.$$click = (p) => {
          p.stopPropagation(), I1(!0), Y1({
            y: d.y,
            price: d.price,
            yAxisWidth: _e()
          }), j1(!0), ce();
        }, m.$$mousedown = (p) => {
          p.preventDefault(), p.stopPropagation(), ce();
        }, B((p) => {
          const y = `${Math.max(0, d.y - 12)}px`, v = `${_e()}px`, A = b1().quickOrderPlusButton ? "block" : "none";
          return y !== p._v$13 && h.style.setProperty("top", p._v$13 = y), v !== p._v$14 && h.style.setProperty("right", p._v$14 = v), A !== p._v$15 && h.style.setProperty("display", p._v$15 = A), p;
        }, {
          _v$13: void 0,
          _v$14: void 0,
          _v$15: void 0
        }), h;
      })()
    }), null), _(i, k(z, {
      get when() {
        return Y(() => !!W1())() && oe();
      },
      keyed: !0,
      children: (d) => (() => {
        const h = xh.cloneNode(!0), m = h.firstChild, p = m.firstChild, y = p.firstChild, v = y.nextSibling, A = v.nextSibling, M = A.nextSibling;
        M.nextSibling;
        const T = p.nextSibling, q = T.firstChild, i1 = q.nextSibling, l1 = i1.nextSibling, f1 = l1.nextSibling;
        f1.nextSibling;
        const t1 = T.nextSibling, B1 = t1.nextSibling, de = B1.firstChild, F = de.nextSibling;
        F.nextSibling;
        const m1 = B1.nextSibling;
        return m1.firstChild, h.addEventListener("mouseleave", () => I1(!1)), h.addEventListener("mouseenter", () => I1(!0)), m.$$mousemove = () => {
          ce();
        }, m.$$mousedown = (a1) => {
          a1.preventDefault(), a1.stopPropagation(), ce();
        }, p.$$click = () => Ct("limit"), _(p, () => x().shortName ?? x().name ?? x().ticker, v), _(p, () => Ke(d.price), M), T.$$click = () => Ct("stop"), _(T, () => x().shortName ?? x().name ?? x().ticker, i1), _(T, () => Ke(d.price), f1), t1.$$click = () => Ct("create"), B1.$$click = H9, _(B1, () => Ke(d.price), F), m1.$$click = Y9, _(m1, () => Ke(d.price), null), B((a1) => {
          const $1 = `${Math.max(0, d.y + 24)}px`, M1 = `${d.yAxisWidth + dt}px`;
          return $1 !== a1._v$16 && h.style.setProperty("top", a1._v$16 = $1), M1 !== a1._v$17 && h.style.setProperty("right", a1._v$17 = M1), a1;
        }, {
          _v$16: void 0,
          _v$17: void 0
        }), h;
      })()
    }), null), B(() => v1(s, "data-drawing-bar-visible", g1())), i;
  })(), k(z, {
    get when() {
      return s1();
    },
    get children() {
      return k(yh, {
        get locale() {
          return e.locale;
        },
        get datafeed() {
          return e.datafeed;
        },
        onSymbolSelected: (i) => {
          S(i);
        },
        onClose: () => {
          x1(!1);
        }
      });
    }
  }), k(z, {
    get when() {
      return H();
    },
    get children() {
      return k(Xd, {
        get locale() {
          return e.locale;
        },
        get mainIndicators() {
          return E();
        },
        get subIndicators() {
          return K();
        },
        onClose: () => {
          Q(!1);
        },
        onMainIndicatorChange: (i) => {
          const s = [...E()];
          i.added ? (Ve(r, i.name, !0, {
            id: "candle_pane"
          }), s.push(i.name), E1(i.name, "candle_pane", "main", "add")) : (r == null || r.removeIndicator("candle_pane", i.name), s.splice(s.indexOf(i.name), 1), E1(i.name, "candle_pane", "main", "remove")), N(s);
        },
        onSubIndicatorChange: (i) => {
          const s = {
            ...K()
          };
          if (i.added) {
            const d = Ve(r, i.name);
            d && (s[i.name] = d, E1(i.name, d, "sub", "add"));
          } else
            i.paneId && (r == null || r.removeIndicator(i.paneId, i.name), delete s[i.name], E1(i.name, i.paneId, "sub", "remove"));
          G(s);
        }
      });
    }
  }), k(z, {
    get when() {
      return T1();
    },
    get children() {
      return k(eh, {
        get locale() {
          return e.locale;
        },
        get timezone() {
          return P1();
        },
        onClose: () => {
          c1(!1);
        },
        onConfirm: j
      });
    }
  }), k(z, {
    get when() {
      return X();
    },
    get children() {
      return k(nh, {
        get locale() {
          return e.locale;
        },
        get currentStyles() {
          return o1.clone(r.getStyles());
        },
        onClose: () => {
          R(!1);
        },
        onChange: (i) => {
          r == null || r.setStyles(i);
        },
        onRestoreDefault: (i) => {
          const s = {};
          i.forEach((d) => {
            const h = d.key;
            Mt(s, h, o1.formatValue(L1(), h));
          }), r == null || r.setStyles(s);
        }
      });
    }
  }), k(z, {
    get when() {
      return Z().length > 0;
    },
    get children() {
      return k(ah, {
        get locale() {
          return e.locale;
        },
        get url() {
          return Z();
        },
        onClose: () => {
          V("");
        }
      });
    }
  }), k(z, {
    get when() {
      return se().visible;
    },
    get children() {
      return k(ch, {
        get locale() {
          return e.locale;
        },
        get params() {
          return se();
        },
        onClose: () => {
          I({
            visible: !1,
            indicatorName: "",
            paneId: "",
            calcParams: []
          });
        },
        onConfirm: (i) => {
          const s = se();
          r == null || r.overrideIndicator({
            name: s.indicatorName,
            calcParams: i
          }, s.paneId);
          const d = s.paneId === "candle_pane" ? "main" : "sub";
          E1(s.indicatorName, s.paneId, d, "change");
        }
      });
    }
  }), k(z, {
    get when() {
      return J();
    },
    get children() {
      return k(Ch, {
        get locale() {
          return e.locale;
        },
        onIndicatorClick: () => {
          Q(!0);
        },
        onTimezoneClick: () => {
          c1(!0);
        },
        onSettingClick: () => {
          R(!0);
        },
        onClose: () => {
          u1(!1);
        }
      });
    }
  })];
};
F1(["mousedown", "click", "mousemove"]);
const wh = /* @__PURE__ */ b('<svg class="logo" viewBox="0 0 80 92"><path d="M28.148808359375,51.7280513671875L22.963588359375,51.7280513671875C21.572648359375002,51.7280513671875,20.445068359375,52.6220613671875,20.445068359375,53.7248813671875L20.445068359375,72.3979013671875C20.445068359375,73.5007013671875,21.572648359375002,74.39470136718751,22.963588359375,74.39470136718751L33.926568359375,74.39470136718751C35.317468359375,74.39470136718751,36.445068359375,73.5007013671875,36.445068359375,72.3979013671875L36.445068359375,53.7248813671875C36.445068359375,52.6220613671875,35.317468359375,51.7280513671875,33.926568359375,51.7280513671875L28.741398359374998,51.7280513671875L28.741398359374998,46.2963223671875C28.741398359374998,46.1665793671875,28.608748359375,46.0614013671875,28.445108359375,46.0614013671875C28.281468359375,46.0614013671875,28.148808359375,46.1665793671875,28.148808359375,46.2963223671875L28.148808359375,51.7280513671875ZM28.741398359374998,74.3948013671875L28.741398359374998,79.82650136718749C28.741398359374998,79.9563013671875,28.608748359375,80.0614013671875,28.445108359375,80.0614013671875C28.281468359375,80.0614013671875,28.148808359375,79.9563013671875,28.148808359375,79.82650136718749L28.148808359375,74.3948013671875L28.741398359374998,74.3948013671875Z"></path><path d="M51.148808359374996,44.7280513671875L45.963588359375,44.7280513671875C44.572648359375,44.7280513671875,43.445068359375,45.6220613671875,43.445068359375,46.7248813671875L43.445068359375,65.3979013671875C43.445068359375,66.5007013671875,44.572648359375,67.39470136718751,45.963588359375,67.39470136718751L56.926568359375,67.39470136718751C58.317468359375,67.39470136718751,59.445068359375,66.5007013671875,59.445068359375,65.3979013671875L59.445068359375,46.7248813671875C59.445068359375,45.6220613671875,58.317468359375,44.7280513671875,56.926568359375,44.7280513671875L51.741398359375,44.7280513671875L51.741398359375,39.2963223671875C51.741398359375,39.1665793671875,51.608748359375,39.0614013671875,51.445108359375,39.0614013671875C51.281468359375,39.0614013671875,51.148808359374996,39.1665793671875,51.148808359374996,39.2963223671875L51.148808359374996,44.7280513671875ZM51.741398359375,67.3948013671875L51.741398359375,72.82650136718749C51.741398359375,72.9563013671875,51.608748359375,73.0614013671875,51.445108359375,73.0614013671875C51.281468359375,73.0614013671875,51.148808359374996,72.9563013671875,51.148808359374996,72.82650136718749L51.148808359374996,67.3948013671875L51.741398359375,67.3948013671875Z"></path><path d="M17.7274,90.6541C17.5901,90.6541,17.4517,90.6436,17.3121,90.6225C9.93219,89.5095,4.80718,86.7136,2.07787,82.3084C-1.1223,77.1437,0.241766,71.6314,0.56829,70.5137C5.37624,46.647,15.0785,38.4945,21.5025,33.0957C22.9683,31.8633,24.2342,30.7995,25.1676,29.7672C25.4105,29.4984,25.6051,29.2154,25.7556,28.9202C24.7465,29.2231,24.1971,29.4326,24.1703,29.4429C22.908,29.9368,21.4777,29.3247,20.9761,28.076C20.4756,26.8272,21.0897,25.4146,22.352,24.9172C22.5042,24.8571,23.5312,24.4607,25.3073,23.9616C24.087,21.4425,21.7693,18.7949,19.7125,16.6431L19.2819,16.1902C16.2438,12.9776,14.6017,4.80159,14.3036,3.19471C14.1306,2.26212,14.4636,1.30796,15.1814,0.679657C15.8995,0.0512175,16.8976,-0.159672,17.8125,0.123747C22.7731,1.66274,24.2638,1.81255,27.2321,2.11098C28.7357,2.26195,29.83,3.59029,29.6762,5.07662C29.5236,6.56295,28.182,7.64786,26.6784,7.49454C24.4992,7.27569,22.9517,7.09896,20.724,6.56646C21.4493,9.09088,22.3803,11.5427,23.2771,12.4919L23.6876,12.9237C25.3757,14.69,28.9691,18.45,30.7016,22.7299C35.0392,21.9433,40.8791,21.3359,47.7817,21.7249C48.2004,20.7386,48.8054,19.7953,49.5907,18.9135C49.7137,18.7754,49.8498,18.6502,49.9988,18.539C53.6142,15.8508,57.5491,12.857,59.7803,11.0758C58.1028,11.2502,56.1034,11.0278,53.9124,9.70882C53.2439,9.30622,52.5992,8.89427,51.9662,8.48933C48.4668,6.25164,46.497,5.12109,43.4234,5.94853C41.9647,6.34058,40.4622,5.48975,40.0659,4.04789C39.6695,2.60604,40.5296,1.11853,41.9871,0.726471C47.5602,-0.773825,51.4796,1.73271,54.9364,3.9434L54.9364,3.9434C55.5284,4.32176,56.1318,4.70797,56.7564,5.08482C58.3843,6.06556,59.4858,5.76127,61.2899,5.13865C62.3511,4.77234,63.5567,4.35687,64.8675,4.53476C66.3321,4.73254,67.4406,5.56933,67.9103,6.83096C68.7444,9.07333,67.1035,11.5533,65.5797,13.2374C64.6729,14.2394,60.0845,17.7606,56.4519,20.4957C56.9477,20.3369,57.4767,20.2511,58.026,20.2511C59.4281,20.2511,60.6982,20.8102,61.621,21.7153C65.4948,20.6901,67.87,17.9563,67.9033,17.9175C68.78,16.8888,70.3322,16.7577,71.3721,17.6226C72.412,18.4886,72.5457,20.0253,71.6702,21.054C71.5221,21.2286,69.5063,23.5492,66.0787,25.233C69.5399,26.8822,72.9993,29.682,74.1841,34.4145C74.5106,35.7206,73.7062,37.0407,72.3859,37.3638C72.1871,37.4117,71.9884,37.4351,71.792,37.4351C70.687,37.4351,69.6826,36.6932,69.4046,35.5848C68.4378,31.7217,64.8144,29.7431,61.7619,28.7456C60.8298,29.7349,59.5009,30.3535,58.026,30.3535C55.8642,30.3535,54.0162,29.0245,53.2713,27.1474C53.2022,27.138,53.1331,27.1287,53.0642,27.1195C54.232,29.5936,57.0851,31.9259,58.1868,32.665C58.3157,32.7516,58.4423,32.8523,58.5547,32.9599C66.5865,40.6151,72.4887,48.8133,76.0971,57.3287C76.6815,58.7074,76.0249,60.2932,74.6313,60.8702C74.2976,61.01,73.9388,61.082,73.576,61.082C72.5065,61.082,71.4914,60.4582,71.0525,59.4213C67.7577,51.6455,62.331,44.1074,54.9203,37.0116C53.6073,36.1009,48.0984,31.9917,47.2065,26.583C40.9421,26.2679,35.6187,26.8278,31.6725,27.5336C31.6197,29.527,30.9225,31.5172,29.2456,33.3731C28.0614,34.6827,26.5968,35.915,25.0446,37.2188C21.9414,39.8269,18.2648,42.9169,14.8104,48.1192C11.356,53.3215,8.12389,60.6361,5.9098,71.6934C5.88732,71.8035,5.85893,71.9123,5.82344,72.0188C5.81634,72.041,4.57886,76.0413,6.77344,79.5289C8.6332,82.4828,12.4557,84.4139,18.1367,85.2705C19.6297,85.4953,20.6566,86.8762,20.4295,88.3532C20.2213,89.6944,19.0559,90.6541,17.7274,90.6541ZM35.1195,7.03101C33.3502,7.03101,31.9158,5.61208,31.9158,3.86173C31.9158,2.11139,33.3502,0.69245,35.1195,0.69245C36.8889,0.69245,38.3233,2.11139,38.3233,3.86173C38.3233,5.61208,36.8889,7.03101,35.1195,7.03101ZM57.6848,23.1892L58.414,24.4754C58.8984,24.3623,59.3923,24.3435,59.8644,24.4203C60.2191,24.5005,60.5087,24.7182,60.6663,25.0229C60.8636,25.3394,60.8993,25.7346,60.7646,26.1094C60.5988,26.5176,60.2972,26.8749,59.9085,27.1235L60.31,27.8316L59.7886,28.1294L59.3994,27.443C58.9257,27.7175,58.399,27.883,57.8664,27.9247L57.3744,27.0569C57.6378,27.0741,57.9071,27.048,58.1704,26.9797C58.4501,26.9251,58.7239,26.8323,58.9829,26.7044L58.2801,25.4647C57.8047,25.5877,57.3167,25.6065,56.8549,25.5197C56.4913,25.4263,56.196,25.1971,56.0328,24.8814C55.8433,24.5561,55.8127,24.1572,55.9484,23.7789C56.088,23.373,56.3763,23.0149,56.7584,22.7726L56.4166,22.1699L56.938,21.8721L57.2727,22.4625C57.6615,22.2376,58.0888,22.0901,58.5254,22.0301L59.0042,22.8746C58.5548,22.8828,58.103,22.9906,57.6848,23.1892ZM56.9319,24.2961Q57.1278,24.6417,57.7863,24.5856L57.1695,23.4978Q56.6982,23.884,56.9319,24.2961ZM58.9077,25.3462L59.4981,26.3875L59.499,26.3891Q59.9965,26.0045,59.7628,25.5923Q59.573,25.2576,58.9077,25.3462ZM73.2212,66.5065C73.2212,68.2569,74.6555,69.6758,76.4249,69.6758C78.1943,69.6758,79.6286,68.2569,79.6286,66.5065C79.6286,64.7562,78.1943,63.3372,76.4249,63.3372C74.6555,63.3372,73.2212,64.7562,73.2212,66.5065ZM35.9465,91.8045C35.0734,91.8045,34.2038,91.7987,33.3378,91.7858C31.827,91.7636,30.6203,90.5359,30.6428,89.0402C30.6653,87.5457,31.9158,86.3297,33.4183,86.3742C49.6344,86.6059,65.7512,84.6175,67.6134,84.037C72.1953,82.4184,74.5295,79.3603,74.5295,74.9575C74.5295,73.463,75.754,72.2517,77.2648,72.2517C78.7755,72.2517,80,73.463,80,74.9575C80,81.5992,76.148,86.7686,69.4317,89.142C67.0041,89.9999,51.0955,91.8046,35.9465,91.8045ZM25.2731,92C23.5037,92,22.0693,90.5811,22.0693,88.8307C22.0693,87.0804,23.5037,85.6615,25.2731,85.6615C27.0424,85.6615,28.4768,87.0804,28.4768,88.8307C28.4768,90.5811,27.0424,92,25.2731,92Z"></path></svg>'), Mh = wh.cloneNode(!0);
class Ih {
  constructor(t) {
    Oe(this, "_chartApi", null);
    if (o1.isString(t.container)) {
      if (this._container = document.getElementById(t.container), !this._container)
        throw new Error("Container is null");
    } else
      this._container = t.container;
    this._container.classList.add("klinecharts-pro"), this._container.setAttribute("data-theme", t.theme ?? "light");
    const r = this;
    j5(() => k(Ah, {
      ref: (n) => {
        r._chartApi = n;
      },
      get styles() {
        return t.styles ?? {};
      },
      get watermark() {
        return t.watermark ?? Mh;
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
          quickOrderFloatingWindow: !0,
          quickOrderPlusButton: !0,
          openOrders: !0,
          positions: !0,
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
  getOrderToolsState() {
    var t, r;
    return ((r = (t = this._chartApi) == null ? void 0 : t.getOrderToolsState) == null ? void 0 : r.call(t)) ?? {
      quickOrder: !0,
      quickOrderFloatingWindow: !0,
      quickOrderPlusButton: !0,
      openOrders: !0,
      positions: !0,
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
    var n, a;
    return ((a = (n = this._chartApi) == null ? void 0 : n.getSize) == null ? void 0 : a.call(n, t, r)) ?? null;
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
w5.forEach((e) => {
  c5(e);
});
export {
  Ph as DefaultDatafeed,
  Ih as KLineChartPro,
  Oh as loadLocales
};
//# sourceMappingURL=klinecharts-pro.js.map
