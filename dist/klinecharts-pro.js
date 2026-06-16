var ia = Object.defineProperty;
var aa = (e, t, r) => t in e ? ia(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var _1 = (e, t, r) => (aa(e, typeof t != "symbol" ? t + "" : t, r), r);
import { utils as N, registerFigure as sa, PolygonType as Wt, LineType as Re, OverlayMode as Qn, ActionType as Nt, init as la, FormatDateType as en, DomPosition as lt, dispose as Bo, TooltipIconPosition as tn, CandleType as ca, YAxisType as ua, registerOverlay as da } from "klinecharts";
function L1(e, t, r) {
  const n = (e.x - t.x) * Math.cos(r) - (e.y - t.y) * Math.sin(r) + t.x, a = (e.x - t.x) * Math.sin(r) + (e.y - t.y) * Math.cos(r) + t.y;
  return { x: n, y: a };
}
function nr(e, t) {
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
      y: N.getLinearYFromCoordinates(e[0], e[1], { x: 0, y: e[0].y })
    } : r = {
      x: t.width,
      y: N.getLinearYFromCoordinates(e[0], e[1], { x: t.width, y: e[0].y })
    }, { coordinates: [e[0], r] };
  }
  return [];
}
function P0(e, t) {
  const r = Math.abs(e.x - t.x), n = Math.abs(e.y - t.y);
  return Math.sqrt(r * r + n * n);
}
const ha = {
  name: "arrow",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = e[1].x > e[0].x ? 0 : 1, r = N.getLinearSlopeIntercept(e[0], e[1]);
      let n;
      r ? n = Math.atan(r[0]) + Math.PI * t : e[1].y > e[0].y ? n = Math.PI / 2 : n = Math.PI / 2 * 3;
      const a = L1({ x: e[1].x - 8, y: e[1].y + 4 }, e[1], n), c = L1({ x: e[1].x - 8, y: e[1].y - 4 }, e[1], n);
      return [
        {
          type: "line",
          attrs: { coordinates: e }
        },
        {
          type: "line",
          ignoreEvent: !0,
          attrs: { coordinates: [a, e[1], c] }
        }
      ];
    }
    return [];
  }
}, fa = {
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
      const t = P0(e[0], e[1]);
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
}, ma = {
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
}, ga = {
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
}, ya = {
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
}, Ca = {
  name: "fibonacciCircle",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = Math.abs(e[0].x - e[1].x), r = Math.abs(e[0].y - e[1].y), n = Math.sqrt(t * t + r * r), a = [0.236, 0.382, 0.5, 0.618, 0.786, 1], c = [], f = [];
      return a.forEach((h) => {
        const v = n * h;
        c.push(
          { ...e[0], r: v }
        ), f.push({
          x: e[0].x,
          y: e[0].y + v + 6,
          text: `${(h * 100).toFixed(1)}%`
        });
      }), [
        {
          type: "circle",
          attrs: c,
          styles: { style: "stroke" }
        },
        {
          type: "text",
          ignoreEvent: !0,
          attrs: f
        }
      ];
    }
    return [];
  }
}, pa = {
  name: "fibonacciSegment",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: r }) => {
    const n = [], a = [];
    if (e.length > 1) {
      const c = e[1].x > e[0].x ? e[0].x : e[1].x, f = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0], h = e[0].y - e[1].y, v = t.points, L = v[0].value - v[1].value;
      f.forEach((b) => {
        const w = e[1].y + h * b, E = (v[1].value + L * b).toFixed(r.price);
        n.push({ coordinates: [{ x: e[0].x, y: w }, { x: e[1].x, y: w }] }), a.push({
          x: c,
          y: w,
          text: `${E} (${(b * 100).toFixed(1)}%)`,
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
}, va = {
  name: "fibonacciSpiral",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, bounding: t }) => {
    if (e.length > 1) {
      const r = P0(e[0], e[1]) / Math.sqrt(24), n = e[1].x > e[0].x ? 0 : 1, a = N.getLinearSlopeIntercept(e[0], e[1]);
      let c;
      a ? c = Math.atan(a[0]) + Math.PI * n : e[1].y > e[0].y ? c = Math.PI / 2 : c = Math.PI / 2 * 3;
      const f = L1(
        { x: e[0].x - r, y: e[0].y },
        e[0],
        c
      ), h = L1(
        { x: e[0].x - r, y: e[0].y - r },
        e[0],
        c
      ), v = [{
        ...f,
        r,
        startAngle: c,
        endAngle: c + Math.PI / 2
      }, {
        ...h,
        r: r * 2,
        startAngle: c + Math.PI / 2,
        endAngle: c + Math.PI
      }];
      let L = e[0].x - r, b = e[0].y - r;
      for (let w = 2; w < 9; w++) {
        const E = v[w - 2].r + v[w - 1].r;
        let P = 0;
        switch (w % 4) {
          case 0: {
            P = c, L -= v[w - 2].r;
            break;
          }
          case 1: {
            P = c + Math.PI / 2, b -= v[w - 2].r;
            break;
          }
          case 2: {
            P = c + Math.PI, L += v[w - 2].r;
            break;
          }
          case 3: {
            P = c + Math.PI / 2 * 3, b += v[w - 2].r;
            break;
          }
        }
        const oe = P + Math.PI / 2, V = L1({ x: L, y: b }, e[0], c);
        v.push({
          ...V,
          r: E,
          startAngle: P,
          endAngle: oe
        });
      }
      return [
        {
          type: "arc",
          attrs: v
        },
        {
          type: "line",
          attrs: nr(e, t)
        }
      ];
    }
    return [];
  }
}, ba = {
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
      const c = e[1].x > e[0].x ? -38 : 4, f = e[1].y > e[0].y ? -2 : 20, h = e[1].x - e[0].x, v = e[1].y - e[0].y;
      [1, 0.75, 0.618, 0.5, 0.382, 0.25, 0].forEach((b) => {
        const w = e[1].x - h * b, E = e[1].y - v * b;
        r.push({ coordinates: [{ x: w, y: e[0].y }, { x: w, y: e[1].y }] }), r.push({ coordinates: [{ x: e[0].x, y: E }, { x: e[1].x, y: E }] }), n = n.concat(nr([e[0], { x: w, y: e[1].y }], t)), n = n.concat(nr([e[0], { x: e[1].x, y: E }], t)), a.unshift({
          x: e[0].x + c,
          y: E + 10,
          text: `${b.toFixed(3)}`
        }), a.unshift({
          x: w - 18,
          y: e[0].y + f,
          text: `${b.toFixed(3)}`
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
}, $a = {
  name: "fibonacciExtension",
  totalStep: 4,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: r }) => {
    const n = [], a = [];
    if (e.length > 2) {
      const c = t.points, f = c[1].value - c[0].value, h = e[1].y - e[0].y, v = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1], L = e[2].x > e[1].x ? e[1].x : e[2].x;
      v.forEach((b) => {
        const w = e[2].y + h * b, E = (c[2].value + f * b).toFixed(r.price);
        n.push({ coordinates: [{ x: e[1].x, y: w }, { x: e[2].x, y: w }] }), a.push({
          x: L,
          y: w,
          text: `${E} (${(b * 100).toFixed(1)}%)`,
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
}, _a = {
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
}, ka = {
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
}, xa = {
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
}, La = {
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
}, wa = {
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
}, Aa = {
  name: "abcd",
  totalStep: 5,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    let t = [], r = [];
    const n = ["A", "B", "C", "D"], a = e.map((c, f) => ({
      ...c,
      baseline: "bottom",
      text: `(${n[f]})`
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
}, Ta = {
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
    const r = [], n = [], a = ["X", "A", "B", "C", "D"], c = e.map((f, h) => ({
      ...f,
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
        attrs: c
      }
    ];
  }
}, Ma = [
  ha,
  fa,
  ma,
  ya,
  ga,
  Ca,
  pa,
  va,
  ba,
  $a,
  _a,
  ka,
  xa,
  La,
  wa,
  Aa,
  Ta
];
class Ky {
  constructor(t) {
    _1(this, "_apiKey");
    _1(this, "_prevSymbolMarket");
    _1(this, "_ws");
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
    var a, c;
    this._prevSymbolMarket !== t.market ? ((a = this._ws) == null || a.close(), this._ws = new WebSocket(`wss://delayed.polygon.io/${t.market}`), this._ws.onopen = () => {
      var f;
      (f = this._ws) == null || f.send(JSON.stringify({ action: "auth", params: this._apiKey }));
    }, this._ws.onmessage = (f) => {
      var v;
      const h = JSON.parse(f.data);
      h[0].ev === "status" ? h[0].status === "auth_success" && ((v = this._ws) == null || v.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` }))) : "sym" in h && n({
        timestamp: h.s,
        open: h.o,
        high: h.h,
        low: h.l,
        close: h.c,
        volume: h.v,
        turnover: h.vw
      });
    }) : (c = this._ws) == null || c.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` })), this._prevSymbolMarket = t.market;
  }
  unsubscribe(t, r) {
  }
}
const Ve = {};
function Sa(e) {
  Ve.context = e;
}
const Pa = (e, t) => e === t, rr = Symbol("solid-proxy"), Da = Symbol("solid-track"), hn = {
  equals: Pa
};
let D0 = E0;
const bt = 1, fn = 2, N0 = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, Zn = {};
var Ee = null;
let Et = null, we = null, Ke = null, vt = null, mr = 0;
function w1(e, t) {
  const r = we, n = Ee, a = e.length === 0, c = a ? N0 : {
    owned: null,
    cleanups: null,
    context: null,
    owner: t === void 0 ? n : t
  }, f = a ? e : () => e(() => ft(() => xn(c)));
  Ee = c, we = null;
  try {
    return wt(f, !0);
  } finally {
    we = r, Ee = n;
  }
}
function T(e, t) {
  t = t ? Object.assign({}, hn, t) : hn;
  const r = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, n = (a) => (typeof a == "function" && (a = a(r.value)), I0(r, a));
  return [O0.bind(r), n];
}
function Fo(e, t, r) {
  const n = kn(e, t, !0, bt);
  Xt(n);
}
function z(e, t, r) {
  const n = kn(e, t, !1, bt);
  Xt(n);
}
function He(e, t, r) {
  D0 = Fa;
  const n = kn(e, t, !1, bt);
  n.user = !0, vt ? vt.push(n) : Xt(n);
}
function Y(e, t, r) {
  r = r ? Object.assign({}, hn, r) : hn;
  const n = kn(e, t, !0, 0);
  return n.observers = null, n.observerSlots = null, n.comparator = r.equals || void 0, Xt(n), O0.bind(n);
}
function Na(e, t, r) {
  let n, a, c;
  arguments.length === 2 && typeof t == "object" || arguments.length === 1 ? (n = !0, a = e, c = t || {}) : (n = e, a = t, c = r || {});
  let f = null, h = Zn, v = null, L = !1, b = "initialValue" in c, w = typeof n == "function" && Y(n);
  const E = /* @__PURE__ */ new Set(), [P, oe] = (c.storage || T)(c.initialValue), [V, R] = T(void 0), [U, he] = T(void 0, {
    equals: !1
  }), [Z, re] = T(b ? "ready" : "unresolved");
  if (Ve.context) {
    v = `${Ve.context.id}${Ve.context.count++}`;
    let J;
    c.ssrLoadFrom === "initial" ? h = c.initialValue : Ve.load && (J = Ve.load(v)) && (h = J[0]);
  }
  function G(J, se, M, j) {
    return f === J && (f = null, b = !0, (J === h || se === h) && c.onHydrated && queueMicrotask(() => c.onHydrated(j, {
      value: se
    })), h = Zn, ve(se, M)), se;
  }
  function ve(J, se) {
    wt(() => {
      se === void 0 && oe(() => J), re(se !== void 0 ? "errored" : "ready"), R(se);
      for (const M of E.keys())
        M.decrement();
      E.clear();
    }, !1);
  }
  function W() {
    const J = Ia, se = P(), M = V();
    if (M !== void 0 && !f)
      throw M;
    return we && !we.user && J && Fo(() => {
      U(), f && (J.resolved || E.has(J) || (J.increment(), E.add(J)));
    }), se;
  }
  function K(J = !0) {
    if (J !== !1 && L)
      return;
    L = !1;
    const se = w ? w() : n;
    if (se == null || se === !1) {
      G(f, ft(P));
      return;
    }
    const M = h !== Zn ? h : ft(() => a(se, {
      value: P(),
      refetching: J
    }));
    return typeof M != "object" || !(M && "then" in M) ? (G(f, M, void 0, se), M) : (f = M, L = !0, queueMicrotask(() => L = !1), wt(() => {
      re(b ? "refreshing" : "pending"), he();
    }, !1), M.then((j) => G(M, j, void 0, se), (j) => G(M, void 0, F0(j), se)));
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
        const J = Z();
        return J === "pending" || J === "refreshing";
      }
    },
    latest: {
      get() {
        if (!b)
          return W();
        const J = V();
        if (J && !f)
          throw J;
        return P();
      }
    }
  }), w ? Fo(() => K(!1)) : K(!1), [W, {
    refetch: K,
    mutate: oe
  }];
}
function ft(e) {
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
function gr(e) {
  He(() => ft(e));
}
function Lt(e) {
  return Ee === null || (Ee.cleanups === null ? Ee.cleanups = [e] : Ee.cleanups.push(e)), e;
}
function Oa(e) {
  const t = we, r = Ee;
  return Promise.resolve().then(() => {
    we = t, Ee = r;
    let n;
    return wt(e, !1), we = Ee = null, n ? n.done : void 0;
  });
}
let Ia;
function O0() {
  const e = Et;
  if (this.sources && (this.state || e))
    if (this.state === bt || e)
      Xt(this);
    else {
      const t = Ke;
      Ke = null, wt(() => gn(this), !1), Ke = t;
    }
  if (we) {
    const t = this.observers ? this.observers.length : 0;
    we.sources ? (we.sources.push(this), we.sourceSlots.push(t)) : (we.sources = [this], we.sourceSlots = [t]), this.observers ? (this.observers.push(we), this.observerSlots.push(we.sources.length - 1)) : (this.observers = [we], this.observerSlots = [we.sources.length - 1]);
  }
  return this.value;
}
function I0(e, t, r) {
  let n = e.value;
  return (!e.comparator || !e.comparator(n, t)) && (e.value = t, e.observers && e.observers.length && wt(() => {
    for (let a = 0; a < e.observers.length; a += 1) {
      const c = e.observers[a], f = Et && Et.running;
      f && Et.disposed.has(c), (f && !c.tState || !f && !c.state) && (c.pure ? Ke.push(c) : vt.push(c), c.observers && B0(c)), f || (c.state = bt);
    }
    if (Ke.length > 1e6)
      throw Ke = [], new Error();
  }, !1)), t;
}
function Xt(e) {
  if (!e.fn)
    return;
  xn(e);
  const t = Ee, r = we, n = mr;
  we = Ee = e, Ea(e, e.value, n), we = r, Ee = t;
}
function Ea(e, t, r) {
  let n;
  try {
    n = e.fn(t);
  } catch (a) {
    e.pure && (e.state = bt, e.owned && e.owned.forEach(xn), e.owned = null), U0(a);
  }
  (!e.updatedAt || e.updatedAt <= r) && (e.updatedAt != null && "observers" in e ? I0(e, n) : e.value = n, e.updatedAt = r);
}
function kn(e, t, r, n = bt, a) {
  const c = {
    fn: e,
    state: n,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: Ee,
    context: null,
    pure: r
  };
  return Ee === null || Ee !== N0 && (Ee.owned ? Ee.owned.push(c) : Ee.owned = [c]), c;
}
function mn(e) {
  const t = Et;
  if (e.state === 0 || t)
    return;
  if (e.state === fn || t)
    return gn(e);
  if (e.suspense && ft(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const r = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < mr); )
    (e.state || t) && r.push(e);
  for (let n = r.length - 1; n >= 0; n--)
    if (e = r[n], e.state === bt || t)
      Xt(e);
    else if (e.state === fn || t) {
      const a = Ke;
      Ke = null, wt(() => gn(e, r[0]), !1), Ke = a;
    }
}
function wt(e, t) {
  if (Ke)
    return e();
  let r = !1;
  t || (Ke = []), vt ? r = !0 : vt = [], mr++;
  try {
    const n = e();
    return Ba(r), n;
  } catch (n) {
    r || (vt = null), Ke = null, U0(n);
  }
}
function Ba(e) {
  if (Ke && (E0(Ke), Ke = null), e)
    return;
  const t = vt;
  vt = null, t.length && wt(() => D0(t), !1);
}
function E0(e) {
  for (let t = 0; t < e.length; t++)
    mn(e[t]);
}
function Fa(e) {
  let t, r = 0;
  for (t = 0; t < e.length; t++) {
    const n = e[t];
    n.user ? e[r++] = n : mn(n);
  }
  for (Ve.context && Sa(), t = 0; t < r; t++)
    mn(e[t]);
}
function gn(e, t) {
  const r = Et;
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
    const a = e.sources[n];
    a.sources && (a.state === bt || r ? a !== t && mn(a) : (a.state === fn || r) && gn(a, t));
  }
}
function B0(e) {
  const t = Et;
  for (let r = 0; r < e.observers.length; r += 1) {
    const n = e.observers[r];
    (!n.state || t) && (n.state = fn, n.pure ? Ke.push(n) : vt.push(n), n.observers && B0(n));
  }
}
function xn(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const r = e.sources.pop(), n = e.sourceSlots.pop(), a = r.observers;
      if (a && a.length) {
        const c = a.pop(), f = r.observerSlots.pop();
        n < a.length && (c.sourceSlots[f] = n, a[n] = c, r.observerSlots[n] = f);
      }
    }
  if (e.owned) {
    for (t = 0; t < e.owned.length; t++)
      xn(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = 0; t < e.cleanups.length; t++)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function F0(e) {
  return e instanceof Error || typeof e == "string" ? e : new Error("Unknown error");
}
function U0(e) {
  throw e = F0(e), e;
}
const Ua = Symbol("fallback");
function Uo(e) {
  for (let t = 0; t < e.length; t++)
    e[t]();
}
function za(e, t, r = {}) {
  let n = [], a = [], c = [], f = 0, h = t.length > 1 ? [] : null;
  return Lt(() => Uo(c)), () => {
    let v = e() || [], L, b;
    return v[Da], ft(() => {
      let E = v.length, P, oe, V, R, U, he, Z, re, G;
      if (E === 0)
        f !== 0 && (Uo(c), c = [], n = [], a = [], f = 0, h && (h = [])), r.fallback && (n = [Ua], a[0] = w1((ve) => (c[0] = ve, r.fallback())), f = 1);
      else if (f === 0) {
        for (a = new Array(E), b = 0; b < E; b++)
          n[b] = v[b], a[b] = w1(w);
        f = E;
      } else {
        for (V = new Array(E), R = new Array(E), h && (U = new Array(E)), he = 0, Z = Math.min(f, E); he < Z && n[he] === v[he]; he++)
          ;
        for (Z = f - 1, re = E - 1; Z >= he && re >= he && n[Z] === v[re]; Z--, re--)
          V[re] = a[Z], R[re] = c[Z], h && (U[re] = h[Z]);
        for (P = /* @__PURE__ */ new Map(), oe = new Array(re + 1), b = re; b >= he; b--)
          G = v[b], L = P.get(G), oe[b] = L === void 0 ? -1 : L, P.set(G, b);
        for (L = he; L <= Z; L++)
          G = n[L], b = P.get(G), b !== void 0 && b !== -1 ? (V[b] = a[L], R[b] = c[L], h && (U[b] = h[L]), b = oe[b], P.set(G, b)) : c[L]();
        for (b = he; b < E; b++)
          b in V ? (a[b] = V[b], c[b] = R[b], h && (h[b] = U[b], h[b](b))) : a[b] = w1(w);
        a = a.slice(0, f = E), n = v.slice(0);
      }
      return a;
    });
    function w(E) {
      if (c[b] = E, h) {
        const [P, oe] = T(b);
        return h[b] = oe, t(v[b], P);
      }
      return t(v[b]);
    }
  };
}
function A(e, t) {
  return ft(() => e(t || {}));
}
function nn() {
  return !0;
}
const Va = {
  get(e, t, r) {
    return t === rr ? r : e.get(t);
  },
  has(e, t) {
    return t === rr ? !0 : e.has(t);
  },
  set: nn,
  deleteProperty: nn,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: nn,
      deleteProperty: nn
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function Hn(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function z0(...e) {
  let t = !1;
  for (let n = 0; n < e.length; n++) {
    const a = e[n];
    t = t || !!a && rr in a, e[n] = typeof a == "function" ? (t = !0, Y(a)) : a;
  }
  if (t)
    return new Proxy({
      get(n) {
        for (let a = e.length - 1; a >= 0; a--) {
          const c = Hn(e[a])[n];
          if (c !== void 0)
            return c;
        }
      },
      has(n) {
        for (let a = e.length - 1; a >= 0; a--)
          if (n in Hn(e[a]))
            return !0;
        return !1;
      },
      keys() {
        const n = [];
        for (let a = 0; a < e.length; a++)
          n.push(...Object.keys(Hn(e[a])));
        return [...new Set(n)];
      }
    }, Va);
  const r = {};
  for (let n = e.length - 1; n >= 0; n--)
    if (e[n]) {
      const a = Object.getOwnPropertyDescriptors(e[n]);
      for (const c in a)
        c in r || Object.defineProperty(r, c, {
          enumerable: !0,
          get() {
            for (let f = e.length - 1; f >= 0; f--) {
              const h = (e[f] || {})[c];
              if (h !== void 0)
                return h;
            }
          }
        });
    }
  return r;
}
function A1(e) {
  const t = "fallback" in e && {
    fallback: () => e.fallback
  };
  return Y(za(() => e.each, e.children, t || void 0));
}
function de(e) {
  let t = !1;
  const r = e.keyed, n = Y(() => e.when, void 0, {
    equals: (a, c) => t ? a === c : !a == !c
  });
  return Y(() => {
    const a = n();
    if (a) {
      const c = e.children, f = typeof c == "function" && c.length > 0;
      return t = r || f, f ? ft(() => c(a)) : c;
    }
    return e.fallback;
  }, void 0, void 0);
}
function Ra(e, t, r) {
  let n = r.length, a = t.length, c = n, f = 0, h = 0, v = t[a - 1].nextSibling, L = null;
  for (; f < a || h < c; ) {
    if (t[f] === r[h]) {
      f++, h++;
      continue;
    }
    for (; t[a - 1] === r[c - 1]; )
      a--, c--;
    if (a === f) {
      const b = c < n ? h ? r[h - 1].nextSibling : r[c - h] : v;
      for (; h < c; )
        e.insertBefore(r[h++], b);
    } else if (c === h)
      for (; f < a; )
        (!L || !L.has(t[f])) && t[f].remove(), f++;
    else if (t[f] === r[c - 1] && r[h] === t[a - 1]) {
      const b = t[--a].nextSibling;
      e.insertBefore(r[h++], t[f++].nextSibling), e.insertBefore(r[--c], b), t[a] = r[c];
    } else {
      if (!L) {
        L = /* @__PURE__ */ new Map();
        let w = h;
        for (; w < c; )
          L.set(r[w], w++);
      }
      const b = L.get(t[f]);
      if (b != null)
        if (h < b && b < c) {
          let w = f, E = 1, P;
          for (; ++w < a && w < c && !((P = L.get(t[w])) == null || P !== b + E); )
            E++;
          if (E > b - h) {
            const oe = t[f];
            for (; h < b; )
              e.insertBefore(r[h++], oe);
          } else
            e.replaceChild(r[h++], t[f++]);
        } else
          f++;
      else
        t[f++].remove();
    }
  }
}
const zo = "_$DX_DELEGATE";
function Ka(e, t, r, n = {}) {
  let a;
  return w1((c) => {
    a = c, t === document ? e() : C(t, e(), t.firstChild ? null : void 0, r);
  }, n.owner), () => {
    a(), t.textContent = "";
  };
}
function $(e, t, r) {
  const n = document.createElement("template");
  n.innerHTML = e;
  let a = n.content.firstChild;
  return r && (a = a.firstChild), a;
}
function Ye(e, t = window.document) {
  const r = t[zo] || (t[zo] = /* @__PURE__ */ new Set());
  for (let n = 0, a = e.length; n < a; n++) {
    const c = e[n];
    r.has(c) || (r.add(c), t.addEventListener(c, ja));
  }
}
function Ne(e, t, r) {
  r == null ? e.removeAttribute(t) : e.setAttribute(t, r);
}
function me(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function ht(e, t, r, n) {
  if (n)
    Array.isArray(r) ? (e[`$$${t}`] = r[0], e[`$$${t}Data`] = r[1]) : e[`$$${t}`] = r;
  else if (Array.isArray(r)) {
    const a = r[0];
    e.addEventListener(t, r[0] = (c) => a.call(e, r[1], c));
  } else
    e.addEventListener(t, r);
}
function Bt(e, t, r) {
  if (!t)
    return r ? Ne(e, "style") : t;
  const n = e.style;
  if (typeof t == "string")
    return n.cssText = t;
  typeof r == "string" && (n.cssText = r = void 0), r || (r = {}), t || (t = {});
  let a, c;
  for (c in r)
    t[c] == null && n.removeProperty(c), delete r[c];
  for (c in t)
    a = t[c], a !== r[c] && (n.setProperty(c, a), r[c] = a);
  return r;
}
function xt(e, t, r) {
  return ft(() => e(t, r));
}
function C(e, t, r, n) {
  if (r !== void 0 && !n && (n = []), typeof t != "function")
    return yn(e, t, n, r);
  z((a) => yn(e, t(), a, r), n);
}
function ja(e) {
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
  }), Ve.registry && !Ve.done && (Ve.done = !0, document.querySelectorAll("[id^=pl-]").forEach((n) => {
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
function yn(e, t, r, n, a) {
  for (Ve.context && !r && (r = [...e.childNodes]); typeof r == "function"; )
    r = r();
  if (t === r)
    return r;
  const c = typeof t, f = n !== void 0;
  if (e = f && r[0] && r[0].parentNode || e, c === "string" || c === "number") {
    if (Ve.context)
      return r;
    if (c === "number" && (t = t.toString()), f) {
      let h = r[0];
      h && h.nodeType === 3 ? h.data = t : h = document.createTextNode(t), r = qt(e, r, n, h);
    } else
      r !== "" && typeof r == "string" ? r = e.firstChild.data = t : r = e.textContent = t;
  } else if (t == null || c === "boolean") {
    if (Ve.context)
      return r;
    r = qt(e, r, n);
  } else {
    if (c === "function")
      return z(() => {
        let h = t();
        for (; typeof h == "function"; )
          h = h();
        r = yn(e, h, r, n);
      }), () => r;
    if (Array.isArray(t)) {
      const h = [], v = r && Array.isArray(r);
      if (or(h, t, r, a))
        return z(() => r = yn(e, h, r, n, !0)), () => r;
      if (Ve.context) {
        if (!h.length)
          return r;
        for (let L = 0; L < h.length; L++)
          if (h[L].parentNode)
            return r = h;
      }
      if (h.length === 0) {
        if (r = qt(e, r, n), f)
          return r;
      } else
        v ? r.length === 0 ? Vo(e, h, n) : Ra(e, r, h) : (r && qt(e), Vo(e, h));
      r = h;
    } else if (t instanceof Node) {
      if (Ve.context && t.parentNode)
        return r = f ? [t] : t;
      if (Array.isArray(r)) {
        if (f)
          return r = qt(e, r, n, t);
        qt(e, r, null, t);
      } else
        r == null || r === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      r = t;
    }
  }
  return r;
}
function or(e, t, r, n) {
  let a = !1;
  for (let c = 0, f = t.length; c < f; c++) {
    let h = t[c], v = r && r[c];
    if (h instanceof Node)
      e.push(h);
    else if (!(h == null || h === !0 || h === !1))
      if (Array.isArray(h))
        a = or(e, h, v) || a;
      else if (typeof h == "function")
        if (n) {
          for (; typeof h == "function"; )
            h = h();
          a = or(e, Array.isArray(h) ? h : [h], Array.isArray(v) ? v : [v]) || a;
        } else
          e.push(h), a = !0;
      else {
        const L = String(h);
        v && v.nodeType === 3 && v.data === L ? e.push(v) : e.push(document.createTextNode(L));
      }
  }
  return a;
}
function Vo(e, t, r = null) {
  for (let n = 0, a = t.length; n < a; n++)
    e.insertBefore(t[n], r);
}
function qt(e, t, r, n) {
  if (r === void 0)
    return e.textContent = "";
  const a = n || document.createTextNode("");
  if (t.length) {
    let c = !1;
    for (let f = t.length - 1; f >= 0; f--) {
      const h = t[f];
      if (a !== h) {
        const v = h.parentNode === e;
        !c && !f ? v ? e.replaceChild(a, h) : e.insertBefore(a, r) : v && h.remove();
      } else
        c = !0;
    }
  } else
    e.insertBefore(a, r);
  return [a];
}
const Qa = "http://www.w3.org/2000/svg";
function Za(e, t = !1) {
  return t ? document.createElementNS(Qa, e) : document.createElement(e);
}
function Ha(e) {
  const {
    useShadow: t
  } = e, r = document.createTextNode(""), n = e.mount || document.body;
  function a() {
    if (Ve.context) {
      const [c, f] = T(!1);
      return queueMicrotask(() => f(!0)), () => c() && e.children;
    } else
      return () => e.children;
  }
  if (n instanceof HTMLHeadElement) {
    const [c, f] = T(!1), h = () => f(!0);
    w1((v) => C(n, () => c() ? v() : a()(), null)), Lt(() => {
      Ve.context ? queueMicrotask(h) : h();
    });
  } else {
    const c = Za(e.isSVG ? "g" : "div", e.isSVG), f = t && c.attachShadow ? c.attachShadow({
      mode: "open"
    }) : c;
    Object.defineProperty(c, "_$host", {
      get() {
        return r.parentNode;
      },
      configurable: !0
    }), C(f, a()), n.appendChild(c), e.ref && e.ref(c), Lt(() => n.removeChild(c));
  }
  return r;
}
var rn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function V0(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ya = typeof rn == "object" && rn && rn.Object === Object && rn, R0 = Ya, Wa = R0, qa = typeof self == "object" && self && self.Object === Object && self, Ga = Wa || qa || Function("return this")(), mt = Ga, Xa = mt, Ja = Xa.Symbol, Ln = Ja, Ro = Ln, K0 = Object.prototype, e9 = K0.hasOwnProperty, t9 = K0.toString, k1 = Ro ? Ro.toStringTag : void 0;
function n9(e) {
  var t = e9.call(e, k1), r = e[k1];
  try {
    e[k1] = void 0;
    var n = !0;
  } catch {
  }
  var a = t9.call(e);
  return n && (t ? e[k1] = r : delete e[k1]), a;
}
var r9 = n9, o9 = Object.prototype, i9 = o9.toString;
function a9(e) {
  return i9.call(e);
}
var s9 = a9, Ko = Ln, l9 = r9, c9 = s9, u9 = "[object Null]", d9 = "[object Undefined]", jo = Ko ? Ko.toStringTag : void 0;
function h9(e) {
  return e == null ? e === void 0 ? d9 : u9 : jo && jo in Object(e) ? l9(e) : c9(e);
}
var M1 = h9;
function f9(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Jt = f9, m9 = M1, g9 = Jt, y9 = "[object AsyncFunction]", C9 = "[object Function]", p9 = "[object GeneratorFunction]", v9 = "[object Proxy]";
function b9(e) {
  if (!g9(e))
    return !1;
  var t = m9(e);
  return t == C9 || t == p9 || t == y9 || t == v9;
}
var j0 = b9, $9 = mt, _9 = $9["__core-js_shared__"], k9 = _9, Yn = k9, Qo = function() {
  var e = /[^.]+$/.exec(Yn && Yn.keys && Yn.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function x9(e) {
  return !!Qo && Qo in e;
}
var L9 = x9, w9 = Function.prototype, A9 = w9.toString;
function T9(e) {
  if (e != null) {
    try {
      return A9.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Q0 = T9, M9 = j0, S9 = L9, P9 = Jt, D9 = Q0, N9 = /[\\^$.*+?()[\]{}|]/g, O9 = /^\[object .+?Constructor\]$/, I9 = Function.prototype, E9 = Object.prototype, B9 = I9.toString, F9 = E9.hasOwnProperty, U9 = RegExp(
  "^" + B9.call(F9).replace(N9, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function z9(e) {
  if (!P9(e) || S9(e))
    return !1;
  var t = M9(e) ? U9 : O9;
  return t.test(D9(e));
}
var V9 = z9;
function R9(e, t) {
  return e == null ? void 0 : e[t];
}
var K9 = R9, j9 = V9, Q9 = K9;
function Z9(e, t) {
  var r = Q9(e, t);
  return j9(r) ? r : void 0;
}
var Ft = Z9, H9 = Ft, Y9 = function() {
  try {
    var e = H9(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), W9 = Y9, Zo = W9;
function q9(e, t, r) {
  t == "__proto__" && Zo ? Zo(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var Z0 = q9;
function G9(e, t) {
  return e === t || e !== e && t !== t;
}
var H0 = G9, X9 = Z0, J9 = H0, e5 = Object.prototype, t5 = e5.hasOwnProperty;
function n5(e, t, r) {
  var n = e[t];
  (!(t5.call(e, t) && J9(n, r)) || r === void 0 && !(t in e)) && X9(e, t, r);
}
var yr = n5, r5 = Array.isArray, e1 = r5;
function o5(e) {
  return e != null && typeof e == "object";
}
var t1 = o5, i5 = M1, a5 = t1, s5 = "[object Symbol]";
function l5(e) {
  return typeof e == "symbol" || a5(e) && i5(e) == s5;
}
var Cr = l5, c5 = e1, u5 = Cr, d5 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, h5 = /^\w*$/;
function f5(e, t) {
  if (c5(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || u5(e) ? !0 : h5.test(e) || !d5.test(e) || t != null && e in Object(t);
}
var m5 = f5, g5 = Ft, y5 = g5(Object, "create"), wn = y5, Ho = wn;
function C5() {
  this.__data__ = Ho ? Ho(null) : {}, this.size = 0;
}
var p5 = C5;
function v5(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var b5 = v5, $5 = wn, _5 = "__lodash_hash_undefined__", k5 = Object.prototype, x5 = k5.hasOwnProperty;
function L5(e) {
  var t = this.__data__;
  if ($5) {
    var r = t[e];
    return r === _5 ? void 0 : r;
  }
  return x5.call(t, e) ? t[e] : void 0;
}
var w5 = L5, A5 = wn, T5 = Object.prototype, M5 = T5.hasOwnProperty;
function S5(e) {
  var t = this.__data__;
  return A5 ? t[e] !== void 0 : M5.call(t, e);
}
var P5 = S5, D5 = wn, N5 = "__lodash_hash_undefined__";
function O5(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = D5 && t === void 0 ? N5 : t, this;
}
var I5 = O5, E5 = p5, B5 = b5, F5 = w5, U5 = P5, z5 = I5;
function n1(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
n1.prototype.clear = E5;
n1.prototype.delete = B5;
n1.prototype.get = F5;
n1.prototype.has = U5;
n1.prototype.set = z5;
var V5 = n1;
function R5() {
  this.__data__ = [], this.size = 0;
}
var K5 = R5, j5 = H0;
function Q5(e, t) {
  for (var r = e.length; r--; )
    if (j5(e[r][0], t))
      return r;
  return -1;
}
var An = Q5, Z5 = An, H5 = Array.prototype, Y5 = H5.splice;
function W5(e) {
  var t = this.__data__, r = Z5(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : Y5.call(t, r, 1), --this.size, !0;
}
var q5 = W5, G5 = An;
function X5(e) {
  var t = this.__data__, r = G5(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var J5 = X5, es = An;
function ts(e) {
  return es(this.__data__, e) > -1;
}
var ns = ts, rs = An;
function os(e, t) {
  var r = this.__data__, n = rs(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
var is = os, as = K5, ss = q5, ls = J5, cs = ns, us = is;
function r1(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
r1.prototype.clear = as;
r1.prototype.delete = ss;
r1.prototype.get = ls;
r1.prototype.has = cs;
r1.prototype.set = us;
var Tn = r1, ds = Ft, hs = mt, fs = ds(hs, "Map"), pr = fs, Yo = V5, ms = Tn, gs = pr;
function ys() {
  this.size = 0, this.__data__ = {
    hash: new Yo(),
    map: new (gs || ms)(),
    string: new Yo()
  };
}
var Cs = ys;
function ps(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var vs = ps, bs = vs;
function $s(e, t) {
  var r = e.__data__;
  return bs(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var Mn = $s, _s = Mn;
function ks(e) {
  var t = _s(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var xs = ks, Ls = Mn;
function ws(e) {
  return Ls(this, e).get(e);
}
var As = ws, Ts = Mn;
function Ms(e) {
  return Ts(this, e).has(e);
}
var Ss = Ms, Ps = Mn;
function Ds(e, t) {
  var r = Ps(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
var Ns = Ds, Os = Cs, Is = xs, Es = As, Bs = Ss, Fs = Ns;
function o1(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
o1.prototype.clear = Os;
o1.prototype.delete = Is;
o1.prototype.get = Es;
o1.prototype.has = Bs;
o1.prototype.set = Fs;
var Y0 = o1, W0 = Y0, Us = "Expected a function";
function vr(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Us);
  var r = function() {
    var n = arguments, a = t ? t.apply(this, n) : n[0], c = r.cache;
    if (c.has(a))
      return c.get(a);
    var f = e.apply(this, n);
    return r.cache = c.set(a, f) || c, f;
  };
  return r.cache = new (vr.Cache || W0)(), r;
}
vr.Cache = W0;
var zs = vr, Vs = zs, Rs = 500;
function Ks(e) {
  var t = Vs(e, function(n) {
    return r.size === Rs && r.clear(), n;
  }), r = t.cache;
  return t;
}
var js = Ks, Qs = js, Zs = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Hs = /\\(\\)?/g, Ys = Qs(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(Zs, function(r, n, a, c) {
    t.push(a ? c.replace(Hs, "$1") : n || r);
  }), t;
}), Ws = Ys;
function qs(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, a = Array(n); ++r < n; )
    a[r] = t(e[r], r, e);
  return a;
}
var Gs = qs, Wo = Ln, Xs = Gs, Js = e1, e6 = Cr, t6 = 1 / 0, qo = Wo ? Wo.prototype : void 0, Go = qo ? qo.toString : void 0;
function q0(e) {
  if (typeof e == "string")
    return e;
  if (Js(e))
    return Xs(e, q0) + "";
  if (e6(e))
    return Go ? Go.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -t6 ? "-0" : t;
}
var n6 = q0, r6 = n6;
function o6(e) {
  return e == null ? "" : r6(e);
}
var i6 = o6, a6 = e1, s6 = m5, l6 = Ws, c6 = i6;
function u6(e, t) {
  return a6(e) ? e : s6(e, t) ? [e] : l6(c6(e));
}
var d6 = u6, h6 = 9007199254740991, f6 = /^(?:0|[1-9]\d*)$/;
function m6(e, t) {
  var r = typeof e;
  return t = t ?? h6, !!t && (r == "number" || r != "symbol" && f6.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var G0 = m6, g6 = Cr, y6 = 1 / 0;
function C6(e) {
  if (typeof e == "string" || g6(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -y6 ? "-0" : t;
}
var p6 = C6, v6 = yr, b6 = d6, $6 = G0, Xo = Jt, _6 = p6;
function k6(e, t, r, n) {
  if (!Xo(e))
    return e;
  t = b6(t, e);
  for (var a = -1, c = t.length, f = c - 1, h = e; h != null && ++a < c; ) {
    var v = _6(t[a]), L = r;
    if (v === "__proto__" || v === "constructor" || v === "prototype")
      return e;
    if (a != f) {
      var b = h[v];
      L = n ? n(b, v, h) : void 0, L === void 0 && (L = Xo(b) ? b : $6(t[a + 1]) ? [] : {});
    }
    v6(h, v, L), h = h[v];
  }
  return e;
}
var x6 = k6, L6 = x6;
function w6(e, t, r) {
  return e == null ? e : L6(e, t, r);
}
var A6 = w6;
const Ie = /* @__PURE__ */ V0(A6);
var T6 = Tn;
function M6() {
  this.__data__ = new T6(), this.size = 0;
}
var S6 = M6;
function P6(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
var D6 = P6;
function N6(e) {
  return this.__data__.get(e);
}
var O6 = N6;
function I6(e) {
  return this.__data__.has(e);
}
var E6 = I6, B6 = Tn, F6 = pr, U6 = Y0, z6 = 200;
function V6(e, t) {
  var r = this.__data__;
  if (r instanceof B6) {
    var n = r.__data__;
    if (!F6 || n.length < z6 - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new U6(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
var R6 = V6, K6 = Tn, j6 = S6, Q6 = D6, Z6 = O6, H6 = E6, Y6 = R6;
function i1(e) {
  var t = this.__data__ = new K6(e);
  this.size = t.size;
}
i1.prototype.clear = j6;
i1.prototype.delete = Q6;
i1.prototype.get = Z6;
i1.prototype.has = H6;
i1.prototype.set = Y6;
var W6 = i1;
function q6(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var G6 = q6, X6 = yr, J6 = Z0;
function e2(e, t, r, n) {
  var a = !r;
  r || (r = {});
  for (var c = -1, f = t.length; ++c < f; ) {
    var h = t[c], v = n ? n(r[h], e[h], h, r, e) : void 0;
    v === void 0 && (v = e[h]), a ? J6(r, h, v) : X6(r, h, v);
  }
  return r;
}
var Sn = e2;
function t2(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var n2 = t2, r2 = M1, o2 = t1, i2 = "[object Arguments]";
function a2(e) {
  return o2(e) && r2(e) == i2;
}
var s2 = a2, Jo = s2, l2 = t1, X0 = Object.prototype, c2 = X0.hasOwnProperty, u2 = X0.propertyIsEnumerable, d2 = Jo(function() {
  return arguments;
}()) ? Jo : function(e) {
  return l2(e) && c2.call(e, "callee") && !u2.call(e, "callee");
}, h2 = d2, Cn = { exports: {} };
function f2() {
  return !1;
}
var m2 = f2;
Cn.exports;
(function(e, t) {
  var r = mt, n = m2, a = t && !t.nodeType && t, c = a && !0 && e && !e.nodeType && e, f = c && c.exports === a, h = f ? r.Buffer : void 0, v = h ? h.isBuffer : void 0, L = v || n;
  e.exports = L;
})(Cn, Cn.exports);
var J0 = Cn.exports, g2 = 9007199254740991;
function y2(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= g2;
}
var ei = y2, C2 = M1, p2 = ei, v2 = t1, b2 = "[object Arguments]", $2 = "[object Array]", _2 = "[object Boolean]", k2 = "[object Date]", x2 = "[object Error]", L2 = "[object Function]", w2 = "[object Map]", A2 = "[object Number]", T2 = "[object Object]", M2 = "[object RegExp]", S2 = "[object Set]", P2 = "[object String]", D2 = "[object WeakMap]", N2 = "[object ArrayBuffer]", O2 = "[object DataView]", I2 = "[object Float32Array]", E2 = "[object Float64Array]", B2 = "[object Int8Array]", F2 = "[object Int16Array]", U2 = "[object Int32Array]", z2 = "[object Uint8Array]", V2 = "[object Uint8ClampedArray]", R2 = "[object Uint16Array]", K2 = "[object Uint32Array]", Le = {};
Le[I2] = Le[E2] = Le[B2] = Le[F2] = Le[U2] = Le[z2] = Le[V2] = Le[R2] = Le[K2] = !0;
Le[b2] = Le[$2] = Le[N2] = Le[_2] = Le[O2] = Le[k2] = Le[x2] = Le[L2] = Le[w2] = Le[A2] = Le[T2] = Le[M2] = Le[S2] = Le[P2] = Le[D2] = !1;
function j2(e) {
  return v2(e) && p2(e.length) && !!Le[C2(e)];
}
var Q2 = j2;
function Z2(e) {
  return function(t) {
    return e(t);
  };
}
var br = Z2, pn = { exports: {} };
pn.exports;
(function(e, t) {
  var r = R0, n = t && !t.nodeType && t, a = n && !0 && e && !e.nodeType && e, c = a && a.exports === n, f = c && r.process, h = function() {
    try {
      var v = a && a.require && a.require("util").types;
      return v || f && f.binding && f.binding("util");
    } catch {
    }
  }();
  e.exports = h;
})(pn, pn.exports);
var $r = pn.exports, H2 = Q2, Y2 = br, e0 = $r, t0 = e0 && e0.isTypedArray, W2 = t0 ? Y2(t0) : H2, q2 = W2, G2 = n2, X2 = h2, J2 = e1, e3 = J0, t3 = G0, n3 = q2, r3 = Object.prototype, o3 = r3.hasOwnProperty;
function i3(e, t) {
  var r = J2(e), n = !r && X2(e), a = !r && !n && e3(e), c = !r && !n && !a && n3(e), f = r || n || a || c, h = f ? G2(e.length, String) : [], v = h.length;
  for (var L in e)
    (t || o3.call(e, L)) && !(f && // Safari 9 has enumerable `arguments.length` in strict mode.
    (L == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    a && (L == "offset" || L == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    c && (L == "buffer" || L == "byteLength" || L == "byteOffset") || // Skip index properties.
    t3(L, v))) && h.push(L);
  return h;
}
var ti = i3, a3 = Object.prototype;
function s3(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || a3;
  return e === r;
}
var _r = s3;
function l3(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var ni = l3, c3 = ni, u3 = c3(Object.keys, Object), d3 = u3, h3 = _r, f3 = d3, m3 = Object.prototype, g3 = m3.hasOwnProperty;
function y3(e) {
  if (!h3(e))
    return f3(e);
  var t = [];
  for (var r in Object(e))
    g3.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
var C3 = y3, p3 = j0, v3 = ei;
function b3(e) {
  return e != null && v3(e.length) && !p3(e);
}
var ri = b3, $3 = ti, _3 = C3, k3 = ri;
function x3(e) {
  return k3(e) ? $3(e) : _3(e);
}
var kr = x3, L3 = Sn, w3 = kr;
function A3(e, t) {
  return e && L3(t, w3(t), e);
}
var T3 = A3;
function M3(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var S3 = M3, P3 = Jt, D3 = _r, N3 = S3, O3 = Object.prototype, I3 = O3.hasOwnProperty;
function E3(e) {
  if (!P3(e))
    return N3(e);
  var t = D3(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !I3.call(e, n)) || r.push(n);
  return r;
}
var B3 = E3, F3 = ti, U3 = B3, z3 = ri;
function V3(e) {
  return z3(e) ? F3(e, !0) : U3(e);
}
var xr = V3, R3 = Sn, K3 = xr;
function j3(e, t) {
  return e && R3(t, K3(t), e);
}
var Q3 = j3, vn = { exports: {} };
vn.exports;
(function(e, t) {
  var r = mt, n = t && !t.nodeType && t, a = n && !0 && e && !e.nodeType && e, c = a && a.exports === n, f = c ? r.Buffer : void 0, h = f ? f.allocUnsafe : void 0;
  function v(L, b) {
    if (b)
      return L.slice();
    var w = L.length, E = h ? h(w) : new L.constructor(w);
    return L.copy(E), E;
  }
  e.exports = v;
})(vn, vn.exports);
var Z3 = vn.exports;
function H3(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
var Y3 = H3;
function W3(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, a = 0, c = []; ++r < n; ) {
    var f = e[r];
    t(f, r, e) && (c[a++] = f);
  }
  return c;
}
var q3 = W3;
function G3() {
  return [];
}
var oi = G3, X3 = q3, J3 = oi, el = Object.prototype, tl = el.propertyIsEnumerable, n0 = Object.getOwnPropertySymbols, nl = n0 ? function(e) {
  return e == null ? [] : (e = Object(e), X3(n0(e), function(t) {
    return tl.call(e, t);
  }));
} : J3, Lr = nl, rl = Sn, ol = Lr;
function il(e, t) {
  return rl(e, ol(e), t);
}
var al = il;
function sl(e, t) {
  for (var r = -1, n = t.length, a = e.length; ++r < n; )
    e[a + r] = t[r];
  return e;
}
var ii = sl, ll = ni, cl = ll(Object.getPrototypeOf, Object), ai = cl, ul = ii, dl = ai, hl = Lr, fl = oi, ml = Object.getOwnPropertySymbols, gl = ml ? function(e) {
  for (var t = []; e; )
    ul(t, hl(e)), e = dl(e);
  return t;
} : fl, si = gl, yl = Sn, Cl = si;
function pl(e, t) {
  return yl(e, Cl(e), t);
}
var vl = pl, bl = ii, $l = e1;
function _l(e, t, r) {
  var n = t(e);
  return $l(e) ? n : bl(n, r(e));
}
var li = _l, kl = li, xl = Lr, Ll = kr;
function wl(e) {
  return kl(e, Ll, xl);
}
var Al = wl, Tl = li, Ml = si, Sl = xr;
function Pl(e) {
  return Tl(e, Sl, Ml);
}
var Dl = Pl, Nl = Ft, Ol = mt, Il = Nl(Ol, "DataView"), El = Il, Bl = Ft, Fl = mt, Ul = Bl(Fl, "Promise"), zl = Ul, Vl = Ft, Rl = mt, Kl = Vl(Rl, "Set"), jl = Kl, Ql = Ft, Zl = mt, Hl = Ql(Zl, "WeakMap"), Yl = Hl, ir = El, ar = pr, sr = zl, lr = jl, cr = Yl, ci = M1, a1 = Q0, r0 = "[object Map]", Wl = "[object Object]", o0 = "[object Promise]", i0 = "[object Set]", a0 = "[object WeakMap]", s0 = "[object DataView]", ql = a1(ir), Gl = a1(ar), Xl = a1(sr), Jl = a1(lr), e8 = a1(cr), Ot = ci;
(ir && Ot(new ir(new ArrayBuffer(1))) != s0 || ar && Ot(new ar()) != r0 || sr && Ot(sr.resolve()) != o0 || lr && Ot(new lr()) != i0 || cr && Ot(new cr()) != a0) && (Ot = function(e) {
  var t = ci(e), r = t == Wl ? e.constructor : void 0, n = r ? a1(r) : "";
  if (n)
    switch (n) {
      case ql:
        return s0;
      case Gl:
        return r0;
      case Xl:
        return o0;
      case Jl:
        return i0;
      case e8:
        return a0;
    }
  return t;
});
var wr = Ot, t8 = Object.prototype, n8 = t8.hasOwnProperty;
function r8(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && n8.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
var o8 = r8, i8 = mt, a8 = i8.Uint8Array, s8 = a8, l0 = s8;
function l8(e) {
  var t = new e.constructor(e.byteLength);
  return new l0(t).set(new l0(e)), t;
}
var Ar = l8, c8 = Ar;
function u8(e, t) {
  var r = t ? c8(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var d8 = u8, h8 = /\w*$/;
function f8(e) {
  var t = new e.constructor(e.source, h8.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var m8 = f8, c0 = Ln, u0 = c0 ? c0.prototype : void 0, d0 = u0 ? u0.valueOf : void 0;
function g8(e) {
  return d0 ? Object(d0.call(e)) : {};
}
var y8 = g8, C8 = Ar;
function p8(e, t) {
  var r = t ? C8(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
var v8 = p8, b8 = Ar, $8 = d8, _8 = m8, k8 = y8, x8 = v8, L8 = "[object Boolean]", w8 = "[object Date]", A8 = "[object Map]", T8 = "[object Number]", M8 = "[object RegExp]", S8 = "[object Set]", P8 = "[object String]", D8 = "[object Symbol]", N8 = "[object ArrayBuffer]", O8 = "[object DataView]", I8 = "[object Float32Array]", E8 = "[object Float64Array]", B8 = "[object Int8Array]", F8 = "[object Int16Array]", U8 = "[object Int32Array]", z8 = "[object Uint8Array]", V8 = "[object Uint8ClampedArray]", R8 = "[object Uint16Array]", K8 = "[object Uint32Array]";
function j8(e, t, r) {
  var n = e.constructor;
  switch (t) {
    case N8:
      return b8(e);
    case L8:
    case w8:
      return new n(+e);
    case O8:
      return $8(e, r);
    case I8:
    case E8:
    case B8:
    case F8:
    case U8:
    case z8:
    case V8:
    case R8:
    case K8:
      return x8(e, r);
    case A8:
      return new n();
    case T8:
    case P8:
      return new n(e);
    case M8:
      return _8(e);
    case S8:
      return new n();
    case D8:
      return k8(e);
  }
}
var Q8 = j8, Z8 = Jt, h0 = Object.create, H8 = function() {
  function e() {
  }
  return function(t) {
    if (!Z8(t))
      return {};
    if (h0)
      return h0(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}(), Y8 = H8, W8 = Y8, q8 = ai, G8 = _r;
function X8(e) {
  return typeof e.constructor == "function" && !G8(e) ? W8(q8(e)) : {};
}
var J8 = X8, e7 = wr, t7 = t1, n7 = "[object Map]";
function r7(e) {
  return t7(e) && e7(e) == n7;
}
var o7 = r7, i7 = o7, a7 = br, f0 = $r, m0 = f0 && f0.isMap, s7 = m0 ? a7(m0) : i7, l7 = s7, c7 = wr, u7 = t1, d7 = "[object Set]";
function h7(e) {
  return u7(e) && c7(e) == d7;
}
var f7 = h7, m7 = f7, g7 = br, g0 = $r, y0 = g0 && g0.isSet, y7 = y0 ? g7(y0) : m7, C7 = y7, p7 = W6, v7 = G6, b7 = yr, $7 = T3, _7 = Q3, k7 = Z3, x7 = Y3, L7 = al, w7 = vl, A7 = Al, T7 = Dl, M7 = wr, S7 = o8, P7 = Q8, D7 = J8, N7 = e1, O7 = J0, I7 = l7, E7 = Jt, B7 = C7, F7 = kr, U7 = xr, z7 = 1, V7 = 2, R7 = 4, ui = "[object Arguments]", K7 = "[object Array]", j7 = "[object Boolean]", Q7 = "[object Date]", Z7 = "[object Error]", di = "[object Function]", H7 = "[object GeneratorFunction]", Y7 = "[object Map]", W7 = "[object Number]", hi = "[object Object]", q7 = "[object RegExp]", G7 = "[object Set]", X7 = "[object String]", J7 = "[object Symbol]", ec = "[object WeakMap]", tc = "[object ArrayBuffer]", nc = "[object DataView]", rc = "[object Float32Array]", oc = "[object Float64Array]", ic = "[object Int8Array]", ac = "[object Int16Array]", sc = "[object Int32Array]", lc = "[object Uint8Array]", cc = "[object Uint8ClampedArray]", uc = "[object Uint16Array]", dc = "[object Uint32Array]", be = {};
be[ui] = be[K7] = be[tc] = be[nc] = be[j7] = be[Q7] = be[rc] = be[oc] = be[ic] = be[ac] = be[sc] = be[Y7] = be[W7] = be[hi] = be[q7] = be[G7] = be[X7] = be[J7] = be[lc] = be[cc] = be[uc] = be[dc] = !0;
be[Z7] = be[di] = be[ec] = !1;
function un(e, t, r, n, a, c) {
  var f, h = t & z7, v = t & V7, L = t & R7;
  if (r && (f = a ? r(e, n, a, c) : r(e)), f !== void 0)
    return f;
  if (!E7(e))
    return e;
  var b = N7(e);
  if (b) {
    if (f = S7(e), !h)
      return x7(e, f);
  } else {
    var w = M7(e), E = w == di || w == H7;
    if (O7(e))
      return k7(e, h);
    if (w == hi || w == ui || E && !a) {
      if (f = v || E ? {} : D7(e), !h)
        return v ? w7(e, _7(f, e)) : L7(e, $7(f, e));
    } else {
      if (!be[w])
        return a ? e : {};
      f = P7(e, w, h);
    }
  }
  c || (c = new p7());
  var P = c.get(e);
  if (P)
    return P;
  c.set(e, f), B7(e) ? e.forEach(function(R) {
    f.add(un(R, t, r, R, e, c));
  }) : I7(e) && e.forEach(function(R, U) {
    f.set(U, un(R, t, r, U, e, c));
  });
  var oe = L ? v ? T7 : A7 : v ? U7 : F7, V = b ? void 0 : oe(e);
  return v7(V || e, function(R, U) {
    V && (U = R, R = e[U]), b7(f, U, un(R, t, r, U, e, c));
  }), f;
}
var hc = un, fc = hc, mc = 1, gc = 4;
function yc(e) {
  return fc(e, mc | gc);
}
var Cc = yc;
const pc = /* @__PURE__ */ V0(Cc), vc = /* @__PURE__ */ $("<button></button>"), bc = (e) => (() => {
  const t = vc.cloneNode(!0);
  return ht(t, "click", e.onClick, !0), C(t, () => e.children), z((r) => {
    const n = e.style, a = `klinecharts-pro-button ${e.type ?? "confirm"} ${e.class ?? ""}`;
    return r._v$ = Bt(t, n, r._v$), a !== r._v$2 && me(t, r._v$2 = a), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
Ye(["click"]);
const $c = /* @__PURE__ */ $('<svg viewBox="0 0 1024 1024" class="icon"><path d="M810.666667 128H213.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v597.333334c0 46.933333 38.4 85.333333 85.333333 85.333333h597.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V213.333333c0-46.933333-38.4-85.333333-85.333333-85.333333z m-353.706667 567.04a42.496 42.496 0 0 1-60.16 0L243.626667 541.866667c-8.106667-8.106667-12.373333-18.773333-12.373334-29.866667s4.693333-22.186667 12.373334-29.866667a42.496 42.496 0 0 1 60.16 0L426.666667 604.586667l293.546666-293.546667a42.496 42.496 0 1 1 60.16 60.16l-323.413333 323.84z"></path></svg>'), _c = /* @__PURE__ */ $('<svg viewBox="0 0 1024 1024" class="icon"><path d="M245.333333 128h533.333334A117.333333 117.333333 0 0 1 896 245.333333v533.333334A117.333333 117.333333 0 0 1 778.666667 896H245.333333A117.333333 117.333333 0 0 1 128 778.666667V245.333333A117.333333 117.333333 0 0 1 245.333333 128z m0 64c-29.44 0-53.333333 23.893333-53.333333 53.333333v533.333334c0 29.44 23.893333 53.333333 53.333333 53.333333h533.333334c29.44 0 53.333333-23.893333 53.333333-53.333333V245.333333c0-29.44-23.893333-53.333333-53.333333-53.333333H245.333333z"></path></svg>'), kc = /* @__PURE__ */ $("<div></div>"), xc = /* @__PURE__ */ $('<span class="label"></span>'), Lc = () => $c.cloneNode(!0), wc = () => _c.cloneNode(!0), C0 = (e) => {
  const [t, r] = T(e.checked ?? !1);
  return He(() => {
    "checked" in e && r(e.checked);
  }), (() => {
    const n = kc.cloneNode(!0);
    return n.$$click = (a) => {
      const c = !t();
      e.onChange && e.onChange(c), r(c);
    }, C(n, (() => {
      const a = Y(() => !!t());
      return () => a() ? A(Lc, {}) : A(wc, {});
    })(), null), C(n, (() => {
      const a = Y(() => !!e.label);
      return () => a() && (() => {
        const c = xc.cloneNode(!0);
        return C(c, () => e.label), c;
      })();
    })(), null), z((a) => {
      const c = e.style, f = `klinecharts-pro-checkbox ${t() && "checked" || ""} ${e.class || ""}`;
      return a._v$ = Bt(n, c, a._v$), f !== a._v$2 && me(n, a._v$2 = f), a;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), n;
  })();
};
Ye(["click"]);
const Ac = /* @__PURE__ */ $('<div class="klinecharts-pro-loading"><i class="circle1"></i><i class="circle2"></i><i class="circle3"></i></div>'), fi = () => Ac.cloneNode(!0), Tc = /* @__PURE__ */ $('<div class="klinecharts-pro-empty"><svg class="icon" viewBox="0 0 1024 1024"><path d="M855.6 427.2H168.5c-12.7 0-24.4 6.9-30.6 18L4.4 684.7C1.5 689.9 0 695.8 0 701.8v287.1c0 19.4 15.7 35.1 35.1 35.1H989c19.4 0 35.1-15.7 35.1-35.1V701.8c0-6-1.5-11.8-4.4-17.1L886.2 445.2c-6.2-11.1-17.9-18-30.6-18zM673.4 695.6c-16.5 0-30.8 11.5-34.3 27.7-12.7 58.5-64.8 102.3-127.2 102.3s-114.5-43.8-127.2-102.3c-3.5-16.1-17.8-27.7-34.3-27.7H119c-26.4 0-43.3-28-31.1-51.4l81.7-155.8c6.1-11.6 18-18.8 31.1-18.8h622.4c13 0 25 7.2 31.1 18.8l81.7 155.8c12.2 23.4-4.7 51.4-31.1 51.4H673.4zM819.9 209.5c-1-1.8-2.1-3.7-3.2-5.5-9.8-16.6-31.1-22.2-47.8-12.6L648.5 261c-17 9.8-22.7 31.6-12.6 48.4 0.9 1.4 1.7 2.9 2.5 4.4 9.5 17 31.2 22.8 48 13L807 257.3c16.7-9.7 22.4-31 12.9-47.8zM375.4 261.1L255 191.6c-16.7-9.6-38-4-47.8 12.6-1.1 1.8-2.1 3.6-3.2 5.5-9.5 16.8-3.8 38.1 12.9 47.8L337.3 327c16.9 9.7 38.6 4 48-13.1 0.8-1.5 1.7-2.9 2.5-4.4 10.2-16.8 4.5-38.6-12.4-48.4zM512 239.3h2.5c19.5 0.3 35.5-15.5 35.5-35.1v-139c0-19.3-15.6-34.9-34.8-35.1h-6.4C489.6 30.3 474 46 474 65.2v139c0 19.5 15.9 35.4 35.5 35.1h2.5z"></path></svg></div>'), Mc = () => Tc.cloneNode(!0), Sc = /* @__PURE__ */ $("<ul></ul>"), Pc = /* @__PURE__ */ $("<li></li>"), bn = (e) => (() => {
  const t = Sc.cloneNode(!0);
  return C(t, A(de, {
    get when() {
      return e.loading;
    },
    get children() {
      return A(fi, {});
    }
  }), null), C(t, A(de, {
    get when() {
      var r;
      return !e.loading && !e.children && !((r = e.dataSource) != null && r.length);
    },
    get children() {
      return A(Mc, {});
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
        return ((a = e.renderItem) == null ? void 0 : a.call(e, n)) ?? Pc.cloneNode(!0);
      });
    }
  }), null), z((r) => {
    const n = e.style, a = `klinecharts-pro-list ${e.class ?? ""}`;
    return r._v$ = Bt(t, n, r._v$), a !== r._v$2 && me(t, r._v$2 = a), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})(), Dc = /* @__PURE__ */ $('<div class="klinecharts-pro-modal"><div class="inner"><div class="title-container"><svg class="close-icon" viewBox="0 0 1024 1024"><path d="M934.184927 199.723787 622.457206 511.452531l311.727721 311.703161c14.334473 14.229073 23.069415 33.951253 23.069415 55.743582 0 43.430138-35.178197 78.660524-78.735226 78.660524-21.664416 0-41.361013-8.865925-55.642275-23.069415L511.149121 622.838388 199.420377 934.490384c-14.204513 14.20349-33.901111 23.069415-55.642275 23.069415-43.482327 0-78.737272-35.230386-78.737272-78.660524 0-21.792329 8.864902-41.513486 23.094998-55.743582l311.677579-311.703161L88.135828 199.723787c-14.230096-14.255679-23.094998-33.92567-23.094998-55.642275 0-43.430138 35.254945-78.762855 78.737272-78.762855 21.741163 0 41.437761 8.813736 55.642275 23.069415l311.727721 311.727721L822.876842 88.389096c14.281261-14.255679 33.977859-23.069415 55.642275-23.069415 43.557028 0 78.735226 35.332716 78.735226 78.762855C957.254342 165.798117 948.5194 185.468109 934.184927 199.723787"></path></svg></div><div class="content-container"></div></div></div>'), Nc = /* @__PURE__ */ $('<div class="button-container"></div>'), At = (e) => (() => {
  const t = Dc.cloneNode(!0), r = t.firstChild, n = r.firstChild, a = n.firstChild, c = n.nextSibling;
  return t.$$click = (f) => {
    f.target === f.currentTarget && e.onClose && e.onClose();
  }, C(n, () => e.title, a), ht(a, "click", e.onClose, !0), C(c, () => e.children), C(r, (() => {
    const f = Y(() => !!(e.buttons && e.buttons.length > 0));
    return () => f() && (() => {
      const h = Nc.cloneNode(!0);
      return C(h, () => e.buttons.map((v) => A(bc, z0(v, {
        get style() {
          return {
            ...e.minButtonWidth ? {
              "min-width": `${e.minButtonWidth}px`
            } : {},
            width: e.isMobile ? "100%" : "auto"
          };
        },
        get children() {
          return v.children;
        }
      })))), z((v) => {
        const L = e.btnParentStyle, b = !!e.isMobile;
        return v._v$8 = Bt(h, L, v._v$8), b !== v._v$9 && h.classList.toggle("mobile-buttons", v._v$9 = b), v;
      }, {
        _v$8: void 0,
        _v$9: void 0
      }), h;
    })();
  })(), null), z((f) => {
    const h = !!e.isMobile, v = e.isMobile ? "100%" : `${e.width ?? 400}px`, L = (e.isMobile, "auto"), b = e.isMobile ? "60vh" : "90vh", w = !!e.isMobile, E = !!e.isMobile, P = !!e.isMobile;
    return h !== f._v$ && t.classList.toggle("mobile-modal", f._v$ = h), v !== f._v$2 && r.style.setProperty("width", f._v$2 = v), L !== f._v$3 && r.style.setProperty("height", f._v$3 = L), b !== f._v$4 && r.style.setProperty("max-height", f._v$4 = b), w !== f._v$5 && r.classList.toggle("mobile-inner", f._v$5 = w), E !== f._v$6 && n.classList.toggle("mobile-title", f._v$6 = E), P !== f._v$7 && c.classList.toggle("mobile-content", f._v$7 = P), f;
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
Ye(["click"]);
const Oc = /* @__PURE__ */ $('<div tabindex="0"><div class="selector-container"><span class="value"></span><i class="arrow"></i></div></div>'), Ic = /* @__PURE__ */ $('<div class="drop-down-container"><ul></ul></div>'), Ec = /* @__PURE__ */ $('<div><input type="text"></div>'), Bc = /* @__PURE__ */ $("<li></li>"), ur = (e) => {
  const [t, r] = T(!1), [n, a] = T("");
  let c, f;
  const h = Y(() => {
    if (!e.dataSource || !e.searchable)
      return e.dataSource;
    const b = n().toLowerCase().trim();
    return b ? typeof e.dataSource[0] == "string" ? e.dataSource.filter((E) => E.toLowerCase().includes(b)) : e.dataSource.filter((E) => {
      var V, R;
      const P = ((V = E.text) == null ? void 0 : V.toString().toLowerCase()) || "", oe = ((R = E.key) == null ? void 0 : R.toLowerCase()) || "";
      return P.includes(b) || oe.includes(b);
    }) : e.dataSource;
  }), v = () => {
    const b = !t();
    r(b), a(""), b && e.searchable && setTimeout(() => c == null ? void 0 : c.focus(), 50);
  }, L = (b) => {
    const w = b.relatedTarget;
    f && w && f.contains(w) || setTimeout(() => {
      f && document.activeElement && f.contains(document.activeElement) || (r(!1), a(""));
    }, 0);
  };
  return (() => {
    const b = Oc.cloneNode(!0), w = b.firstChild, E = w.firstChild;
    b.addEventListener("blur", L), b.$$click = (oe) => {
      oe.stopPropagation(), !oe.target.closest(".drop-down-container") && v();
    };
    const P = f;
    return typeof P == "function" ? xt(P, b) : f = b, C(E, () => e.value), C(b, (() => {
      const oe = Y(() => !!(e.dataSource && e.dataSource.length > 0));
      return () => oe() && (() => {
        const V = Ic.cloneNode(!0), R = V.firstChild;
        return V.$$click = (U) => U.stopPropagation(), V.$$mousedown = (U) => {
          U.preventDefault(), U.stopPropagation();
        }, C(V, (() => {
          const U = Y(() => !!e.searchable);
          return () => U() && (() => {
            const he = Ec.cloneNode(!0), Z = he.firstChild;
            he.style.setProperty("padding", "8px"), he.style.setProperty("border-bottom", "1px solid #333"), Z.$$click = (G) => G.stopPropagation(), Z.$$input = (G) => a(G.currentTarget.value);
            const re = c;
            return typeof re == "function" ? xt(re, Z) : c = Z, Z.style.setProperty("width", "100%"), Z.style.setProperty("padding", "6px 10px"), Z.style.setProperty("border", "1px solid var(--klinecharts-pro-border-color)"), Z.style.setProperty("border-radius", "4px"), Z.style.setProperty("background-color", "var(--klinecharts-pro-popover-background-color)"), Z.style.setProperty("color", "#fff"), Z.style.setProperty("font-size", "13px"), Z.style.setProperty("outline", "none"), z(() => Ne(Z, "placeholder", e.searchPlaceholder || "Search...")), z(() => Z.value = n()), he;
          })();
        })(), R), C(R, () => {
          var U;
          return (U = h()) == null ? void 0 : U.map((he) => {
            const re = he[e.valueKey ?? "text"] ?? he;
            return (() => {
              const G = Bc.cloneNode(!0);
              return G.$$click = (ve) => {
                var W;
                ve.stopPropagation(), e.value !== re && ((W = e.onSelected) == null || W.call(e, he)), r(!1), a("");
              }, C(G, re), z(() => G.classList.toggle("selected", e.value === re)), G;
            })();
          });
        }), V;
      })();
    })(), null), z((oe) => {
      const V = e.style, R = `klinecharts-pro-select ${e.class ?? ""} ${t() ? "klinecharts-pro-select-show" : ""}`;
      return oe._v$ = Bt(b, V, oe._v$), R !== oe._v$2 && me(b, oe._v$2 = R), oe;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), b;
  })();
};
Ye(["click", "mousedown", "input"]);
const Fc = /* @__PURE__ */ $('<span class="prefix"></span>'), Uc = /* @__PURE__ */ $('<span class="suffix"></span>'), zc = /* @__PURE__ */ $('<div><input class="value"></div>'), mi = (e) => {
  const t = z0({
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER
  }, e);
  let r;
  const [n, a] = T("normal");
  return (() => {
    const c = zc.cloneNode(!0), f = c.firstChild;
    return c.$$click = () => {
      r == null || r.focus();
    }, C(c, A(de, {
      get when() {
        return t.prefix;
      },
      get children() {
        const h = Fc.cloneNode(!0);
        return C(h, () => t.prefix), h;
      }
    }), f), f.addEventListener("change", (h) => {
      var L, b;
      const v = h.target.value;
      if ("precision" in t) {
        let w;
        const E = Math.max(0, Math.floor(t.precision));
        E <= 0 ? w = new RegExp(/^[1-9]\d*$/) : w = new RegExp("^\\d+\\.?\\d{0," + E + "}$"), (v === "" || w.test(v) && +v >= t.min && +v <= t.max) && ((L = t.onChange) == null || L.call(t, v === "" ? v : +v));
      } else
        (b = t.onChange) == null || b.call(t, v);
    }), f.addEventListener("blur", () => {
      a("normal");
    }), f.addEventListener("focus", () => {
      a("focus");
    }), xt((h) => {
      r = h;
    }, f), C(c, A(de, {
      get when() {
        return t.suffix;
      },
      get children() {
        const h = Uc.cloneNode(!0);
        return C(h, () => t.suffix), h;
      }
    }), null), z((h) => {
      const v = t.style, L = `klinecharts-pro-input ${t.class ?? ""}`, b = n(), w = t.placeholder ?? "";
      return h._v$ = Bt(c, v, h._v$), L !== h._v$2 && me(c, h._v$2 = L), b !== h._v$3 && Ne(c, "data-status", h._v$3 = b), w !== h._v$4 && Ne(f, "placeholder", h._v$4 = w), h;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0
    }), z(() => f.value = t.value), c;
  })();
};
Ye(["click"]);
const Vc = /* @__PURE__ */ $('<div><i class="thumb"></i></div>'), gi = (e) => (() => {
  const t = Vc.cloneNode(!0);
  return t.$$click = (r) => {
    e.onChange && e.onChange();
  }, z((r) => {
    const n = e.style, a = `klinecharts-pro-switch ${e.open ? "turn-on" : "turn-off"} ${e.class ?? ""}`;
    return r._v$ = Bt(t, n, r._v$), a !== r._v$2 && me(t, r._v$2 = a), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
Ye(["click"]);
let ue = null, p0 = !1;
const x1 = /* @__PURE__ */ new Map(), Rc = 500, v0 = 3;
function on(e) {
  return e == null ? void 0 : e.trim().toLowerCase();
}
function Kc(e, t) {
  return e.x >= t.x && e.x <= t.x + t.width && e.y >= t.y && e.y <= t.y + t.height;
}
function dr(e) {
  const t = ue;
  if (!t || !e)
    return null;
  const r = on(e);
  return r === on(t.upColor) ? "up" : r === on(t.downColor) ? "down" : r === on(t.noChangeColor) ? "noChange" : null;
}
function Wn(e, t, r) {
  const n = ue;
  if (!n || !e)
    return e;
  const a = r ?? dr(e);
  return a === "up" ? t === "border" ? n.upBorderColor ?? n.borderUpColor ?? e : t === "wick" ? n.upWickColor ?? n.wickUpColor ?? e : n.upColor ?? e : a === "down" ? t === "border" ? n.downBorderColor ?? n.borderDownColor ?? e : t === "wick" ? n.downWickColor ?? n.wickDownColor ?? e : n.downColor ?? e : a === "noChange" ? t === "border" ? n.noChangeBorderColor ?? n.borderNoChangeColor ?? e : t === "wick" ? n.noChangeWickColor ?? n.wickNoChangeColor ?? e : n.noChangeColor ?? e : e;
}
function jc(e) {
  return Math.round((e.x + e.width / 2) * 1e3) / 1e3;
}
function Qc(e) {
  return Math.round(Math.abs(e.width) * 1e3) / 1e3;
}
function Zc(e, t) {
  if (t)
    return !1;
  const r = jc(e), n = Qc(e), a = x1.get(r) ?? 0;
  if (n > Math.max(v0, a)) {
    if (x1.set(r, n), x1.size > Rc) {
      const f = x1.keys().next().value;
      f !== void 0 && x1.delete(f);
    }
    return !1;
  }
  const c = Math.max(v0, a * 0.35);
  return n <= c;
}
function qn(e, t, r) {
  const { x: n, y: a, width: c, height: f } = t, h = Math.max(0, Math.min(r, Math.abs(c) / 2, Math.abs(f) / 2));
  e.beginPath(), e.moveTo(n + h, a), e.arcTo(n + c, a, n + c, a + f, h), e.arcTo(n + c, a + f, n, a + f, h), e.arcTo(n, a + f, n, a, h), e.arcTo(n, a, n + c, a, h), e.closePath();
}
function Hc(e, t, r) {
  const n = r.style ?? Wt.Fill, a = r.color ?? "currentColor", c = dr(r.color) ?? dr(r.borderColor), f = n === Wt.Stroke, h = c ? Zc(t, f) : !1, v = Wn(a, h ? "wick" : "body", c), L = r.borderSize ?? 1, b = Wn(r.borderColor ?? a, "border", c), w = r.borderStyle ?? Re.Solid, E = r.borderRadius ?? 0, P = r.borderDashedValue ?? [2, 2], oe = n === Wt.Fill || r.style === Wt.StrokeFill, V = n === Wt.Stroke || r.style === Wt.StrokeFill;
  if (oe) {
    e.fillStyle = v, qn(e, t, E), e.fill();
    const R = Wn(a, "border", c);
    !h && c && R && (e.strokeStyle = R, e.lineWidth = Math.max(1, L), e.setLineDash([]), qn(e, t, E), e.stroke());
  }
  V && (e.strokeStyle = b, e.lineWidth = L, e.setLineDash(w === Re.Dashed ? P : []), qn(e, t, E), e.stroke());
}
function Yc() {
  p0 || (p0 = !0, sa({
    name: "rect",
    checkEventOn: Kc,
    draw: Hc
  }));
}
function kt(e) {
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
const Wc = "指标", qc = "更多", Gc = "主图指标", Xc = "副图指标", Jc = "设置", e4 = "时区", t4 = "截屏", n4 = "全屏", r4 = "退出全屏", o4 = "保存", i4 = "确定", a4 = "取消", s4 = "MA(移动平均线)", l4 = "EMA(指数平滑移动平均线)", c4 = "SMA", u4 = "BOLL(布林线)", d4 = "BBI(多空指数)", h4 = "SAR(停损点指向指标)", f4 = "VOL(成交量)", m4 = "MACD(指数平滑异同移动平均线)", g4 = "KDJ(随机指标)", y4 = "RSI(相对强弱指标)", C4 = "BIAS(乖离率)", p4 = "BRAR(情绪指标)", v4 = "CCI(顺势指标)", b4 = "DMI(动向指标)", $4 = "CR(能量指标)", _4 = "PSY(心理线)", k4 = "DMA(平行线差指标)", x4 = "TRIX(三重指数平滑平均线)", L4 = "OBV(能量潮指标)", w4 = "VR(成交量变异率)", A4 = "WR(威廉指标)", T4 = "MTM(动量指标)", M4 = "EMV(简易波动指标)", S4 = "ROC(变动率指标)", P4 = "PVT(价量趋势指标)", D4 = "AO(动量震荡指标)", N4 = "世界统一时间", O4 = "(UTC-10) 檀香山", I4 = "(UTC-8) 朱诺", E4 = "(UTC-7) 洛杉矶", B4 = "(UTC-5) 芝加哥", F4 = "(UTC-4) 多伦多", U4 = "(UTC-3) 圣保罗", z4 = "(UTC+1) 伦敦", V4 = "(UTC+2) 柏林", R4 = "(UTC+3) 巴林", K4 = "(UTC+4) 迪拜", j4 = "(UTC+5) 阿什哈巴德", Q4 = "(UTC+6) 阿拉木图", Z4 = "(UTC+7) 曼谷", H4 = "(UTC+8) 上海", Y4 = "(UTC+9) 东京", W4 = "(UTC+10) 悉尼", q4 = "(UTC+12) 诺福克岛", G4 = "水平直线", X4 = "水平射线", J4 = "水平线段", eu = "垂直直线", tu = "垂直射线", nu = "垂直线段", ru = "直线", ou = "射线", iu = "线段", au = "箭头", su = "价格线", lu = "价格通道线", cu = "平行直线", uu = "斐波那契回调直线", du = "斐波那契回调线段", hu = "斐波那契圆环", fu = "斐波那契螺旋", mu = "斐波那契速度阻力扇", gu = "斐波那契趋势扩展", yu = "江恩箱", Cu = "矩形", pu = "平行四边形", vu = "圆", bu = "三角形", $u = "三浪", _u = "五浪", ku = "八浪", xu = "任意浪", Lu = "ABCD形态", wu = "XABCD形态", Au = "弱磁模式", Tu = "强磁模式", Mu = "商品搜索", Su = "商品代码", Pu = "参数1", Du = "参数2", Nu = "参数3", Ou = "参数4", Iu = "参数5", Eu = "周期", Bu = "标准差", Fu = "蜡烛图类型", Uu = "全实心", zu = "全空心", Vu = "涨空心", Ru = "跌空心", Ku = "OHLC", ju = "面积图", Qu = "最新价显示", Zu = "最高价显示", Hu = "最低价显示", Yu = "指标最新值显示", Wu = "价格轴类型", qu = "线性轴", Gu = "百分比轴", Xu = "对数轴", Ju = "倒置坐标", ed = "网格线显示", td = "恢复默认", nd = {
  indicator: Wc,
  more: qc,
  main_indicator: Gc,
  sub_indicator: Xc,
  setting: Jc,
  timezone: e4,
  screenshot: t4,
  full_screen: n4,
  exit_full_screen: r4,
  save: o4,
  confirm: i4,
  cancel: a4,
  ma: s4,
  ema: l4,
  sma: c4,
  boll: u4,
  bbi: d4,
  sar: h4,
  vol: f4,
  macd: m4,
  kdj: g4,
  rsi: y4,
  bias: C4,
  brar: p4,
  cci: v4,
  dmi: b4,
  cr: $4,
  psy: _4,
  dma: k4,
  trix: x4,
  obv: L4,
  vr: w4,
  wr: A4,
  mtm: T4,
  emv: M4,
  roc: S4,
  pvt: P4,
  ao: D4,
  utc: N4,
  honolulu: O4,
  juneau: I4,
  los_angeles: E4,
  chicago: B4,
  toronto: F4,
  sao_paulo: U4,
  london: z4,
  berlin: V4,
  bahrain: R4,
  dubai: K4,
  ashkhabad: j4,
  almaty: Q4,
  bangkok: Z4,
  shanghai: H4,
  tokyo: Y4,
  sydney: W4,
  norfolk: q4,
  horizontal_straight_line: G4,
  horizontal_ray_line: X4,
  horizontal_segment: J4,
  vertical_straight_line: eu,
  vertical_ray_line: tu,
  vertical_segment: nu,
  straight_line: ru,
  ray_line: ou,
  segment: iu,
  arrow: au,
  price_line: su,
  price_channel_line: lu,
  parallel_straight_line: cu,
  fibonacci_line: uu,
  fibonacci_segment: du,
  fibonacci_circle: hu,
  fibonacci_spiral: fu,
  fibonacci_speed_resistance_fan: mu,
  fibonacci_extension: gu,
  gann_box: yu,
  rect: Cu,
  parallelogram: pu,
  circle: vu,
  triangle: bu,
  three_waves: $u,
  five_waves: _u,
  eight_waves: ku,
  any_waves: xu,
  abcd: Lu,
  xabcd: wu,
  weak_magnet: Au,
  strong_magnet: Tu,
  symbol_search: Mu,
  symbol_code: Su,
  params_1: Pu,
  params_2: Du,
  params_3: Nu,
  params_4: Ou,
  params_5: Iu,
  period: Eu,
  standard_deviation: Bu,
  candle_type: Fu,
  candle_solid: Uu,
  candle_stroke: zu,
  candle_up_stroke: Vu,
  candle_down_stroke: Ru,
  ohlc: Ku,
  area: ju,
  last_price_show: Qu,
  high_price_show: Zu,
  low_price_show: Hu,
  indicator_last_value_show: Yu,
  price_axis_type: Wu,
  normal: qu,
  percentage: Gu,
  log: Xu,
  reverse_coordinate: Ju,
  grid_show: ed,
  restore_default: td
}, rd = "Indicator", od = "More", id = "Main Indicator", ad = "Sub Indicator", sd = "Setting", ld = "Timezone", cd = "Screenshot", ud = "Full Screen", dd = "Exit", hd = "Save", fd = "Confirm", md = "Cancel", gd = "MA(Moving Average)", yd = "EMA(Exponential Moving Average)", Cd = "SMA", pd = "BOLL(Bolinger Bands)", vd = "BBI(Bull And Bearlndex)", bd = "SAR(Stop and Reverse)", $d = "VOL(Volume)", _d = "MACD(Moving Average Convergence / Divergence)", kd = "KDJ(KDJ Index)", xd = "RSI(Relative Strength Index)", Ld = "BIAS(Bias Ratio)", wd = "BRAR(情绪指标)", Ad = "CCI(Commodity Channel Index)", Td = "DMI(Directional Movement Index)", Md = "CR(能量指标)", Sd = "PSY(Psychological Line)", Pd = "DMA(Different of Moving Average)", Dd = "TRIX(Triple Exponentially Smoothed Moving Average)", Nd = "OBV(On Balance Volume)", Od = "VR(Volatility Volume Ratio)", Id = "WR(Williams %R)", Ed = "MTM(Momentum Index)", Bd = "EMV(Ease of Movement Value)", Fd = "ROC(Price Rate of Change)", Ud = "PVT(Price and Volume Trend)", zd = "AO(Awesome Oscillator)", Vd = "UTC", Rd = "(UTC-10) Honolulu", Kd = "(UTC-8) Juneau", jd = "(UTC-7) Los Angeles", Qd = "(UTC-5) Chicago", Zd = "(UTC-4) Toronto", Hd = "(UTC-3) Sao Paulo", Yd = "(UTC+1) London", Wd = "(UTC+2) Berlin", qd = "(UTC+3) Bahrain", Gd = "(UTC+4) Dubai", Xd = "(UTC+5) Ashkhabad", Jd = "(UTC+6) Almaty", eh = "(UTC+7) Bangkok", th = "(UTC+8) Shanghai", nh = "(UTC+9) Tokyo", rh = "(UTC+10) Sydney", oh = "(UTC+12) Norfolk", ih = "Horizontal Line", ah = "Horizontal Ray", sh = "Horizontal Segment", lh = "Vertical Line", ch = "Vertical Ray", uh = "Vertical Segment", dh = "Trend Line", hh = "Ray", fh = "Segment", mh = "Arrow", gh = "Price Line", yh = "Price Channel Line", Ch = "Parallel Line", ph = "Fibonacci Line", vh = "Fibonacci Segment", bh = "Fibonacci Circle", $h = "Fibonacci Spiral", _h = "Fibonacci Sector", kh = "Fibonacci Extension", xh = "Gann Box", Lh = "Rect", wh = "Parallelogram", Ah = "Circle", Th = "Triangle", Mh = "Three Waves", Sh = "Five Waves", Ph = "Eight Waves", Dh = "Any Waves", Nh = "ABCD Pattern", Oh = "XABCD Pattern", Ih = "Weak Magnet", Eh = "Strong Magnet", Bh = "Symbol Search", Fh = "Symbol Code", Uh = "Parameter 1", zh = "Parameter 2", Vh = "Parameter 3", Rh = "Parameter 4", Kh = "Parameter 5", jh = "Period", Qh = "Standard Deviation", Zh = "Candle Type", Hh = "Candle Solid", Yh = "Candle Stroke", Wh = "Candle Up Stroke", qh = "Candle Down Stroke", Gh = "OHLC", Xh = "Area", Jh = "Show Last Price", ef = "Show Highest Price", tf = "Show Lowest Price", nf = "Show indicator's last value", rf = "Price Axis Type", of = "Normal", af = "Percentage", sf = "Log", lf = "Reverse Coordinate", cf = "Show Grids", uf = "Restore Defaults", df = {
  indicator: rd,
  more: od,
  main_indicator: id,
  sub_indicator: ad,
  setting: sd,
  timezone: ld,
  screenshot: cd,
  full_screen: ud,
  exit_full_screen: dd,
  save: hd,
  confirm: fd,
  cancel: md,
  ma: gd,
  ema: yd,
  sma: Cd,
  boll: pd,
  bbi: vd,
  sar: bd,
  vol: $d,
  macd: _d,
  kdj: kd,
  rsi: xd,
  bias: Ld,
  brar: wd,
  cci: Ad,
  dmi: Td,
  cr: Md,
  psy: Sd,
  dma: Pd,
  trix: Dd,
  obv: Nd,
  vr: Od,
  wr: Id,
  mtm: Ed,
  emv: Bd,
  roc: Fd,
  pvt: Ud,
  ao: zd,
  utc: Vd,
  honolulu: Rd,
  juneau: Kd,
  los_angeles: jd,
  chicago: Qd,
  toronto: Zd,
  sao_paulo: Hd,
  london: Yd,
  berlin: Wd,
  bahrain: qd,
  dubai: Gd,
  ashkhabad: Xd,
  almaty: Jd,
  bangkok: eh,
  shanghai: th,
  tokyo: nh,
  sydney: rh,
  norfolk: oh,
  horizontal_straight_line: ih,
  horizontal_ray_line: ah,
  horizontal_segment: sh,
  vertical_straight_line: lh,
  vertical_ray_line: ch,
  vertical_segment: uh,
  straight_line: dh,
  ray_line: hh,
  segment: fh,
  arrow: mh,
  price_line: gh,
  price_channel_line: yh,
  parallel_straight_line: Ch,
  fibonacci_line: ph,
  fibonacci_segment: vh,
  fibonacci_circle: bh,
  fibonacci_spiral: $h,
  fibonacci_speed_resistance_fan: _h,
  fibonacci_extension: kh,
  gann_box: xh,
  rect: Lh,
  parallelogram: wh,
  circle: Ah,
  triangle: Th,
  three_waves: Mh,
  five_waves: Sh,
  eight_waves: Ph,
  any_waves: Dh,
  abcd: Nh,
  xabcd: Oh,
  weak_magnet: Ih,
  strong_magnet: Eh,
  symbol_search: Bh,
  symbol_code: Fh,
  params_1: Uh,
  params_2: zh,
  params_3: Vh,
  params_4: Rh,
  params_5: Kh,
  period: jh,
  standard_deviation: Qh,
  candle_type: Zh,
  candle_solid: Hh,
  candle_stroke: Yh,
  candle_up_stroke: Wh,
  candle_down_stroke: qh,
  ohlc: Gh,
  area: Xh,
  last_price_show: Jh,
  high_price_show: ef,
  low_price_show: tf,
  indicator_last_value_show: nf,
  price_axis_type: rf,
  normal: of,
  percentage: af,
  log: sf,
  reverse_coordinate: lf,
  grid_show: cf,
  restore_default: uf
}, yi = {
  "zh-CN": nd,
  "en-US": df
};
function jy(e, t) {
  yi[e] = t;
}
const d = (e, t) => {
  var r;
  return ((r = yi[t]) == null ? void 0 : r[e]) ?? e;
}, hf = /* @__PURE__ */ $('<div class="scroll-indicator left"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg></div>'), ff = /* @__PURE__ */ $('<img alt="symbol">'), mf = /* @__PURE__ */ $('<div class="symbol"><span></span></div>'), gf = /* @__PURE__ */ $('<span class="down-arrow-icon mobile-separate-arrow"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></span>'), yf = /* @__PURE__ */ $('<span class="mobile-more-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg></span>'), Cf = /* @__PURE__ */ $('<div class="item tools" title="Time Tools"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M16 3v4"></path><path d="M8 3v4"></path><path d="M3 10h18"></path><path d="M12 14v4"></path><path d="M10 16h4"></path></svg></div>'), pf = /* @__PURE__ */ $('<div class="item tools"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div>'), vf = /* @__PURE__ */ $('<div class="klinecharts-pro-order-tools-display-menu"></div>'), bf = /* @__PURE__ */ $('<div class="klinecharts-pro-order-tools-popover"><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Quick Order</span></span><span class="klinecharts-pro-order-tools-chevron">›</span></button><div class="klinecharts-pro-order-tools-submenu"><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Floating Window</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Plus Button</span></label></div></div><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Open Orders</span></span><span class="klinecharts-pro-order-tools-chevron">&rsaquo;</span></button><div class="klinecharts-pro-order-tools-submenu"><div class="klinecharts-pro-order-tools-setting-row"><span class="klinecharts-pro-order-tools-label">Extended Price Line</span></div><div class="klinecharts-pro-order-tools-setting-row"><span class="klinecharts-pro-order-tools-label">Display</span><div class="klinecharts-pro-order-tools-display"><button type="button" class="klinecharts-pro-order-tools-display-button"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4"></path></svg></button></div></div></div></div><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Positions</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Breakeven Price</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Liquidation Price</span></label><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Price Line</span></span><span class="klinecharts-pro-order-tools-chevron">&rsaquo;</span></button><div class="klinecharts-pro-order-tools-submenu"><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Market Price Line</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Count Down</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Bid & Ask Price</span></label></div></div><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Order Preview Line</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Order History</span></label></div>'), $f = /* @__PURE__ */ $('<div><div class="item tools order-tools-trigger"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Orders"><path d="M4 7h10"></path><path d="M4 12h8"></path><path d="M4 17h6"></path><path d="M18 6v12"></path><path d="M15 15l3 3 3-3"></path></svg><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></div></div>'), _f = /* @__PURE__ */ $('<div class="item tools"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path><path d="M15.22299772857666,9.722223632261718C12.59389772857666,9.722223632261718,10.44600772857666,12.020201374511718,10.44600772857666,14.861111374511719C10.44600772857666,17.70202137451172,12.58215772857666,20.000021374511718,15.223007728576661,20.000021374511718C17.86384772857666,20.000021374511718,19.99999772857666,17.70202137451172,19.99999772857666,14.861111374511719C19.99999772857666,12.020201374511718,17.85211772857666,9.72222212709572,15.22299772857666,9.722223632261718ZM15.22299772857666,18.598491374511717C13.30985772857666,18.598491374511717,11.737087728576661,16.91919137451172,11.737087728576661,14.848481374511719C11.737087728576661,12.777781374511719,13.29811772857666,11.098491374511719,15.22299772857666,11.098491374511719C17.14787772857666,11.098491374511719,18.708917728576658,12.777781374511719,18.708917728576658,14.848481374511719C18.708917728576658,16.91919137451172,17.13614772857666,18.59848137451172,15.22299772857666,18.598491374511717Z"></path><path d="M15.692486288146974,15.050496970825195L15.692486288146974,12.676760970825196C15.692486288146974,12.297972970825196,15.399058288146973,11.982316970825195,15.046945288146972,11.982316970825195C14.694833288146972,11.982316970825195,14.401406288146973,12.297972970825196,14.401406288146973,12.676760970825196L14.401406288146973,15.340896970825195C14.401406288146973,15.530296970825194,14.471829288146973,15.694436970825196,14.589200288146973,15.833326970825196L15.751176288146972,17.095956970825195C15.868546288146973,17.222216970825194,16.032866288146973,17.297976970825196,16.208916288146973,17.297976970825196C16.384976288146973,17.297976970825196,16.537556288146973,17.222216970825194,16.666666288146974,17.095956970825195C16.78403628814697,16.969686970825194,16.854456288146974,16.792916970825196,16.854456288146974,16.603526970825193C16.854456288146974,16.414136970825197,16.78403628814697,16.237366970825196,16.666666288146974,16.111106970825197L15.692486288146974,15.050496970825195Z"></path></svg></div>'), kf = /* @__PURE__ */ $('<div class="item tools"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg></div>'), xf = /* @__PURE__ */ $('<div class="item tools"><svg viewBox="0 0 20 20"><path d="M6.50977,1L13.4902,1C13.6406,1,13.7695,1.1104910000000001,13.7969,1.2631700000000001L14.0273,2.52277C14.1387,3.13147,14.6543,3.57143,15.2559,3.57143L17.5,3.57143C18.8809,3.57143,20,4.72254,20,6.14286L20,16.4286C20,17.8489,18.8809,19,17.5,19L2.5,19C1.11914,19,0,17.8489,0,16.4286L0,6.14286C0,4.72254,1.11914,3.57143,2.5,3.57143L4.74414,3.57143C5.3457,3.57143,5.86133,3.13147,5.97266,2.52277L6.20312,1.2631700000000001C6.23047,1.1104910000000001,6.35937,1,6.50977,1ZM15.2559,4.857139999999999C14.0547,4.857139999999999,13.0215,3.97522,12.7988,2.75982L12.7129,2.28571L7.28711,2.28571L7.20117,2.75982C6.98047,3.97522,5.94727,4.857139999999999,4.74414,4.857139999999999L2.5,4.857139999999999C1.81055,4.857139999999999,1.25,5.43371,1.25,6.14286L1.25,16.4286C1.25,17.1377,1.81055,17.7143,2.5,17.7143L17.5,17.7143C18.1895,17.7143,18.75,17.1377,18.75,16.4286L18.75,6.14286C18.75,5.43371,18.1895,4.857139999999999,17.5,4.857139999999999L15.2559,4.857139999999999ZM4.375,6.78571L3.125,6.78571C2.7793,6.78571,2.5,6.49844,2.5,6.14286C2.5,5.78728,2.7793,5.5,3.125,5.5L4.375,5.5C4.7207,5.5,5,5.78728,5,6.14286C5,6.49844,4.7207,6.78571,4.375,6.78571ZM10,6.14286C7.06641,6.14286,4.6875,8.58973,4.6875,11.6071C4.6875,14.6246,7.06641,17.0714,10,17.0714C12.9336,17.0714,15.3125,14.6246,15.3125,11.6071C15.3125,8.58973,12.9336,6.14286,10,6.14286ZM10,7.42857C11.0859,7.42857,12.1055,7.8625,12.873,8.65201C13.6406,9.44152,14.0625,10.49018,14.0625,11.6071C14.0625,12.7241,13.6406,13.7728,12.873,14.5623C12.1055,15.3518,11.0859,15.7857,10,15.7857C8.91406,15.7857,7.89453,15.3518,7.12695,14.5623C6.35937,13.7728,5.9375,12.7241,5.9375,11.6071C5.9375,10.49018,6.35938,9.44152,7.12695,8.65201C7.89453,7.8625,8.91406,7.42857,10,7.42857ZM10,9.67857C8.96484,9.67857,8.125,10.54241,8.125,11.6071C8.125,12.6719,8.96484,13.5357,10,13.5357C11.0352,13.5357,11.875,12.6719,11.875,11.6071C11.875,10.54241,11.0352,9.67857,10,9.67857ZM10,10.96429C10.3438,10.96429,10.625,11.2536,10.625,11.6071C10.625,11.9607,10.3438,12.25,10,12.25C9.65625,12.25,9.375,11.9607,9.375,11.6071C9.375,11.2536,9.65625,10.96429,10,10.96429Z"></path></svg></div>'), Lf = /* @__PURE__ */ $('<div class="item tools chart-view-toggle"></div>'), wf = /* @__PURE__ */ $('<div class="scroll-indicator right"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"></path></svg></div>'), Af = /* @__PURE__ */ $('<div><div class="klinecharts-pro-period-bar"><div class="menu-container"><svg viewBox="0 0 1024 1024"><path d="M192.037 287.953h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 479.169H438.553c-17.673 0-32 14.327-32 32s14.327 32 32 32h393.608c17.673 0 32-14.327 32-32s-14.327-32-32-32zM832.161 735.802H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32zM319.028 351.594l-160 160 160 160z"></path></svg></div><div><div class="item tools fullscreen-toggle"></div></div></div></div>'), Tf = /* @__PURE__ */ $("<span></span>"), Mf = /* @__PURE__ */ $('<button type="button"></button>'), Sf = /* @__PURE__ */ $('<svg viewBox="0 0 20 20"><path d="M1.08108,0L0,1.079L4.18919,5.27938L2.54826,6.91715L6.9112,6.91715L6.9112,2.56262L5.28957,4.18112L1.08108,0ZM15.8108,5.27938L20,1.079L18.9189,0L14.7104,4.18112L13.0888,2.56262L13.0888,6.91715L17.4517,6.91715L15.8108,5.27938ZM4.16988,14.7014L0.07722,18.8054L1.1583,20L5.27027,15.7996L6.9112,17.4374L6.9112,13.0829L2.54826,13.0829L4.16988,14.7014ZM17.4517,13.0829L13.0888,13.0829L13.0888,17.4374L14.7297,15.7996L18.8417,20L19.9228,18.8054L15.8301,14.7013L17.4517,13.0829Z"></path></svg>'), Pf = /* @__PURE__ */ $('<svg viewBox="0 0 20 20"><path d="M2.93444,1.76899L7.57544,6.40999L6.38918,7.59626L1.76899,2.93444L0,4.70343L0,0L4.70343,0L2.93444,1.76899ZM6.40999,12.4037L1.76899,17.0447L0,15.2758L0,19.9792L4.70343,19.9792L2.93444,18.2102L7.57544,13.5692L6.40999,12.4037ZM15.2758,0L17.0447,1.76899L12.4037,6.40999L13.59,7.59626L18.231,2.95526L20,4.72425L20,0L15.2758,0ZM13.5692,12.4037L12.3829,13.59L17.0239,18.231L15.2549,20L19.9792,20L19.9792,15.2758L18.2102,17.0447L13.5692,12.4037Z"></path></svg>'), Df = /* @__PURE__ */ $('<svg viewBox="0 0 24 24"><path d="M3 20V7l4 3 5-7 5 4h4v13H3Zm5-3 4-5.5 7 5.45V9h-2.7l-3.9-3.1-4.95 6.95L5 10.4V14l3 3Z"></path></svg>'), Nf = /* @__PURE__ */ $('<svg viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M9 4H7v2H5v12h2v2h2v-2h2V6H9zM19 8h-2V4h-2v4h-2v7h2v5h2v-5h2z"></path></svg>'), b0 = (e) => e.charAt(0).toUpperCase() + e.slice(1), Of = (e) => {
  let t, r, n;
  const [a, c] = T(window.innerWidth < 768), [f, h] = T(localStorage.getItem("klinechart_secondary_period") || ""), [v, L] = T(!1), [b, w] = T(!1), [E, P] = T(!1), [oe, V] = T(!1), [R, U] = T(!1), [he, Z] = T({
    top: 0,
    left: 0,
    minWidth: 220
  }), re = () => {
    c(window.innerWidth < 768), requestAnimationFrame(B), v() && Q();
  }, [G, ve] = T(!1), W = () => document.fullscreenElement ?? document.body, K = () => {
    ve(!!document.fullscreenElement);
  }, [J, se] = T(!1), [M, j] = T(!1), Q = () => {
    if (!r)
      return;
    const O = r.getBoundingClientRect(), I = Math.max(220, Math.ceil(O.width)), ye = window.innerWidth, $e = Math.min(Math.max(8, O.right - I), Math.max(8, ye - I - 8));
    Z({
      top: Math.ceil(O.bottom + 8),
      left: Math.ceil($e),
      minWidth: I
    });
  }, F = () => {
    w(!1), P(!1), V(!1), U(!1);
  }, le = () => {
    L((O) => {
      const I = !O;
      return I ? queueMicrotask(Q) : F(), I;
    });
  }, ce = (O) => {
    if (!v())
      return;
    const I = O.target;
    I && (r != null && r.contains(I) || n != null && n.contains(I) || (F(), L(!1)));
  }, ee = () => {
    v() && Q();
  }, B = () => {
    if (!t) {
      se(!1), j(!1);
      return;
    }
    const O = t, I = O.scrollWidth > O.clientWidth + 2;
    se(I && O.scrollLeft > 2), j(I && O.scrollLeft + O.clientWidth < O.scrollWidth - 2);
  };
  gr(() => {
    window.addEventListener("resize", re), document.addEventListener("fullscreenchange", K), document.addEventListener("mousedown", ce), window.addEventListener("scroll", ee, !0), document.addEventListener("mozfullscreenchange", K), document.addEventListener("webkitfullscreenchange", K), document.addEventListener("msfullscreenchange", K), t && (t.addEventListener("scroll", B), setTimeout(B, 100));
  }), Lt(() => {
    window.removeEventListener("resize", re), document.removeEventListener("fullscreenchange", K), document.removeEventListener("mousedown", ce), window.removeEventListener("scroll", ee, !0), document.removeEventListener("mozfullscreenchange", K), document.removeEventListener("webkitfullscreenchange", K), document.removeEventListener("msfullscreenchange", K), t && t.removeEventListener("scroll", B);
  });
  const ne = Y(() => {
    const O = e.periods.filter((I) => {
      if (!a() || G())
        return !0;
      const ye = e.period.text, $e = f();
      if (I.text === ye || $e && I.text === $e)
        return !0;
      if (!$e || $e === ye) {
        const ge = e.periods.find((We) => We.text !== ye);
        return I.text === (ge == null ? void 0 : ge.text);
      }
      return !1;
    }).slice(0, a() && !G() ? 2 : e.periods.length);
    return setTimeout(B, 50), O;
  });
  let H = e.period.text;
  return He(() => {
    const O = e.period.text;
    O !== H && (a() && (h(H), localStorage.setItem("klinechart_secondary_period", H)), H = O), setTimeout(B, 50);
  }), He(() => {
    G(), setTimeout(B, 100);
  }), He(() => {
    if (!e.showOrderToolsMenu) {
      L(!1);
      return;
    }
    v() && queueMicrotask(Q);
  }), (() => {
    const O = Af.cloneNode(!0), I = O.firstChild, ye = I.firstChild, $e = ye.firstChild, ge = ye.nextSibling, We = ge.firstChild;
    return O.style.setProperty("position", "relative"), O.style.setProperty("width", "100%"), O.style.setProperty("display", "flex"), O.style.setProperty("align-items", "center"), C(O, A(de, {
      get when() {
        return J();
      },
      get children() {
        const k = hf.cloneNode(!0);
        return k.$$click = () => t.scrollBy({
          left: -100,
          behavior: "smooth"
        }), k.style.setProperty("position", "absolute"), k.style.setProperty("left", "0"), k.style.setProperty("top", "0"), k.style.setProperty("bottom", "1px"), k.style.setProperty("width", "30px"), k.style.setProperty("display", "flex"), k.style.setProperty("align-items", "center"), k.style.setProperty("justify-content", "center"), k.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), k.style.setProperty("z-index", "10"), k.style.setProperty("cursor", "pointer"), k.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), k;
      }
    }), I), xt((k) => {
      t = k;
    }, I), I.style.setProperty("width", "100%"), I.style.setProperty("overflow", "auto"), ht($e, "click", e.onMenuClick, !0), C(I, A(de, {
      get when() {
        return e.symbol;
      },
      get children() {
        const k = mf.cloneNode(!0), Ce = k.firstChild;
        return ht(k, "click", e.onSymbolClick, !0), C(k, A(de, {
          get when() {
            return e.symbol.logo;
          },
          get children() {
            const Ae = ff.cloneNode(!0);
            return z(() => Ne(Ae, "src", e.symbol.logo)), Ae;
          }
        }), Ce), C(Ce, () => e.symbol.shortName ?? e.symbol.name ?? e.symbol.ticker), k;
      }
    }), ge), C(I, () => ne().map((k, Ce) => {
      const Ae = k.text === e.period.text;
      return (() => {
        const Je = Tf.cloneNode(!0);
        return Je.$$click = (Me) => {
          a() && Ae && !G() ? (e.onMobilePeriodClick ? e.onMobilePeriodClick(k) : e.onMenuClick(), Me.stopPropagation()) : e.onPeriodChange(k);
        }, me(Je, `item period ${Ae ? "selected" : ""}`), C(Je, () => k.text), Je;
      })();
    }), ge), C(I, A(de, {
      get when() {
        return Y(() => !!(a() && !G()))() && ne().length > 1;
      },
      get children() {
        const k = gf.cloneNode(!0);
        return k.$$click = (Ce) => {
          Ce.stopPropagation(), e.onMobilePeriodClick ? e.onMobilePeriodClick(e.period) : e.onMenuClick();
        }, k.style.setProperty("margin-left", "4px"), k.style.setProperty("display", "inline-flex"), k.style.setProperty("align-items", "center"), k;
      }
    }), ge), C(I, A(de, {
      get when() {
        return Y(() => !!a())() && !G();
      },
      get children() {
        const k = yf.cloneNode(!0);
        return k.$$click = (Ce) => {
          var Ae;
          Ce.stopPropagation(), (Ae = e.onMobileMoreClick) == null || Ae.call(e);
        }, k.style.setProperty("margin-left", "8px"), k.style.setProperty("display", "inline-flex"), k.style.setProperty("align-items", "center"), k.style.setProperty("cursor", "pointer"), k.style.setProperty("padding", "0 4px"), k;
      }
    }), ge), C(I, A(de, {
      get when() {
        return !a();
      },
      get children() {
        const k = Cf.cloneNode(!0);
        return ht(k, "click", e.onTimeToolsClick, !0), k;
      }
    }), ge), C(I, A(de, {
      get when() {
        return !a();
      },
      get children() {
        const k = pf.cloneNode(!0), Ce = k.firstChild, Ae = Ce.nextSibling;
        return ht(k, "click", e.onIndicatorClick, !0), C(Ae, () => d("indicator", e.locale)), k;
      }
    }), ge), ge.style.setProperty("display", "flex"), ge.style.setProperty("gap", "4px"), ge.style.setProperty("height", "100%"), ge.style.setProperty("margin-left", "auto"), ge.style.setProperty("align-items", "center"), ge.style.setProperty("flex", "0 0 auto"), C(ge, A(de, {
      get when() {
        return e.showOrderToolsMenu;
      },
      get children() {
        const k = $f.cloneNode(!0), Ce = k.firstChild, Ae = Ce.firstChild, Je = Ae.nextSibling;
        return xt((Me) => {
          r = Me;
        }, k), k.style.setProperty("display", "flex"), k.style.setProperty("align-items", "center"), Ce.$$click = (Me) => {
          Me.stopPropagation(), le();
        }, Ce.style.setProperty("gap", "6px"), Je.style.setProperty("transition", "transform 0.2s ease"), C(k, A(de, {
          get when() {
            return v();
          },
          get children() {
            return A(Ha, {
              get mount() {
                return W();
              },
              get children() {
                const Me = bf.cloneNode(!0), et = Me.firstChild, gt = et.firstChild, Ut = gt.firstChild, s1 = Ut.firstChild, l1 = s1.firstChild, S1 = gt.nextSibling, P1 = S1.firstChild, zt = P1.firstChild, D1 = zt.firstChild, N1 = P1.nextSibling, c1 = N1.firstChild, Ue = c1.firstChild, u1 = et.nextSibling, $t = u1.firstChild, Vt = $t.firstChild, yt = Vt.firstChild, ct = yt.firstChild, O1 = $t.nextSibling, Qe = O1.firstChild;
                Qe.firstChild;
                const I1 = Qe.nextSibling, Pn = I1.firstChild, Tt = Pn.nextSibling, Ct = Tt.firstChild, Rt = Ct.firstChild, d1 = u1.nextSibling, Dn = d1.firstChild, E1 = Dn.firstChild, Nn = d1.nextSibling, B1 = Nn.nextSibling, Kt = B1.firstChild, h1 = Kt.firstChild, F1 = B1.nextSibling, U1 = F1.nextSibling, f1 = U1.firstChild, Ze = f1.firstChild, je = U1.nextSibling, qe = je.firstChild, Ge = qe.firstChild, m1 = Ge.firstChild, jt = m1.firstChild, g1 = qe.nextSibling, y1 = g1.firstChild, Se = y1.firstChild, Qt = Se.firstChild, ut = y1.nextSibling, pt = ut.firstChild, Mt = pt.firstChild, St = ut.nextSibling, tt = St.firstChild, C1 = tt.firstChild, z1 = je.nextSibling, V1 = z1.firstChild, R1 = V1.firstChild, On = z1.nextSibling, Be = On.firstChild, K1 = Be.firstChild;
                return Me.$$mousedown = (_) => _.stopPropagation(), xt((_) => {
                  n = _;
                }, Me), Me.style.setProperty("position", "fixed"), Me.style.setProperty("z-index", "9999"), gt.$$click = (_) => {
                  _.preventDefault(), _.stopPropagation(), w((D) => !D);
                }, s1.$$mousedown = (_) => _.stopPropagation(), s1.$$click = (_) => _.stopPropagation(), l1.addEventListener("change", (_) => {
                  var D;
                  _.stopPropagation(), w(!0), (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    quickOrder: _.currentTarget.checked
                  });
                }), D1.addEventListener("change", (_) => {
                  var D;
                  (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    quickOrderFloatingWindow: _.currentTarget.checked
                  });
                }), Ue.addEventListener("change", (_) => {
                  var D;
                  (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    quickOrderPlusButton: _.currentTarget.checked
                  });
                }), $t.$$click = (_) => {
                  _.preventDefault(), _.stopPropagation(), P((D) => !D), V(!1);
                }, yt.$$mousedown = (_) => _.stopPropagation(), yt.$$click = (_) => _.stopPropagation(), ct.addEventListener("change", (_) => {
                  var D;
                  _.stopPropagation(), P(!0), (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    openOrders: _.currentTarget.checked
                  });
                }), C(Qe, A(gi, {
                  get open() {
                    var _;
                    return ((_ = e.orderToolsState) == null ? void 0 : _.openOrdersExtendedPriceLine) ?? !0;
                  },
                  onChange: () => {
                    var _, D;
                    (D = e.onOrderToolsStateChange) == null || D.call(e, {
                      openOrdersExtendedPriceLine: !(((_ = e.orderToolsState) == null ? void 0 : _.openOrdersExtendedPriceLine) ?? !0)
                    });
                  }
                }), null), Ct.$$click = (_) => {
                  _.preventDefault(), _.stopPropagation(), V((D) => !D);
                }, C(Ct, () => {
                  var _;
                  return b0(((_ = e.orderToolsState) == null ? void 0 : _.openOrdersDisplay) ?? "right");
                }, Rt), C(Tt, A(de, {
                  get when() {
                    return oe();
                  },
                  get children() {
                    const _ = vf.cloneNode(!0);
                    return C(_, () => ["left", "center", "right"].map((D) => (() => {
                      const Fe = Mf.cloneNode(!0);
                      return Fe.$$click = (ze) => {
                        var nt;
                        ze.preventDefault(), ze.stopPropagation(), (nt = e.onOrderToolsStateChange) == null || nt.call(e, {
                          openOrdersDisplay: D
                        }), V(!1);
                      }, C(Fe, () => b0(D)), z(() => {
                        var ze;
                        return me(Fe, (((ze = e.orderToolsState) == null ? void 0 : ze.openOrdersDisplay) ?? "right") === D ? "selected" : "");
                      }), Fe;
                    })())), _;
                  }
                }), null), E1.addEventListener("change", (_) => {
                  var D;
                  (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    positions: _.currentTarget.checked
                  });
                }), h1.addEventListener("change", (_) => {
                  var D;
                  (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    breakevenPrice: _.currentTarget.checked
                  });
                }), Ze.addEventListener("change", (_) => {
                  var D;
                  (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    liquidationPrice: _.currentTarget.checked
                  });
                }), qe.$$click = (_) => {
                  _.preventDefault(), _.stopPropagation(), U((D) => !D);
                }, m1.$$mousedown = (_) => _.stopPropagation(), m1.$$click = (_) => _.stopPropagation(), jt.addEventListener("change", (_) => {
                  var D;
                  _.stopPropagation(), U(!0), (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    priceLine: _.currentTarget.checked
                  });
                }), Qt.addEventListener("change", (_) => {
                  var D;
                  (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    marketPriceLine: _.currentTarget.checked
                  });
                }), Mt.addEventListener("change", (_) => {
                  var D;
                  (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    countDown: _.currentTarget.checked
                  });
                }), C1.addEventListener("change", (_) => {
                  var D;
                  (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    bidAskPrice: _.currentTarget.checked
                  });
                }), R1.addEventListener("change", (_) => {
                  var D;
                  (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    orderPreviewLine: _.currentTarget.checked
                  });
                }), K1.addEventListener("change", (_) => {
                  var D;
                  (D = e.onOrderToolsStateChange) == null || D.call(e, {
                    orderHistory: _.currentTarget.checked
                  });
                }), z((_) => {
                  const D = `${he().top}px`, Fe = `${he().left}px`, ze = `${he().minWidth}px`, nt = `klinecharts-pro-order-tools-group${b() ? " klinecharts-pro-order-tools-group-open" : ""}`, Pt = `klinecharts-pro-order-tools-group${E() ? " klinecharts-pro-order-tools-group-open" : ""}`, j1 = `klinecharts-pro-order-tools-display-arrow${oe() ? " klinecharts-pro-order-tools-display-arrow-open" : ""}`, Q1 = `klinecharts-pro-order-tools-group${R() ? " klinecharts-pro-order-tools-group-open" : ""}`;
                  return D !== _._v$ && Me.style.setProperty("top", _._v$ = D), Fe !== _._v$2 && Me.style.setProperty("left", _._v$2 = Fe), ze !== _._v$3 && Me.style.setProperty("width", _._v$3 = ze), nt !== _._v$4 && me(et, _._v$4 = nt), Pt !== _._v$5 && me(u1, _._v$5 = Pt), j1 !== _._v$6 && Ne(Rt, "class", _._v$6 = j1), Q1 !== _._v$7 && me(je, _._v$7 = Q1), _;
                }, {
                  _v$: void 0,
                  _v$2: void 0,
                  _v$3: void 0,
                  _v$4: void 0,
                  _v$5: void 0,
                  _v$6: void 0,
                  _v$7: void 0
                }), z(() => {
                  var _, D, Fe, ze;
                  return l1.checked = (((_ = e.orderToolsState) == null ? void 0 : _.quickOrderFloatingWindow) ?? ((D = e.orderToolsState) == null ? void 0 : D.quickOrder) ?? !0) || (((Fe = e.orderToolsState) == null ? void 0 : Fe.quickOrderPlusButton) ?? ((ze = e.orderToolsState) == null ? void 0 : ze.quickOrder) ?? !0);
                }), z(() => {
                  var _, D;
                  return D1.checked = ((_ = e.orderToolsState) == null ? void 0 : _.quickOrderFloatingWindow) ?? ((D = e.orderToolsState) == null ? void 0 : D.quickOrder) ?? !0;
                }), z(() => {
                  var _, D;
                  return Ue.checked = ((_ = e.orderToolsState) == null ? void 0 : _.quickOrderPlusButton) ?? ((D = e.orderToolsState) == null ? void 0 : D.quickOrder) ?? !0;
                }), z(() => {
                  var _;
                  return ct.checked = ((_ = e.orderToolsState) == null ? void 0 : _.openOrders) ?? !0;
                }), z(() => {
                  var _;
                  return E1.checked = ((_ = e.orderToolsState) == null ? void 0 : _.positions) ?? !0;
                }), z(() => {
                  var _;
                  return h1.checked = ((_ = e.orderToolsState) == null ? void 0 : _.breakevenPrice) ?? !0;
                }), z(() => {
                  var _;
                  return Ze.checked = ((_ = e.orderToolsState) == null ? void 0 : _.liquidationPrice) ?? !0;
                }), z(() => {
                  var _, D, Fe, ze, nt, Pt;
                  return jt.checked = (((_ = e.orderToolsState) == null ? void 0 : _.marketPriceLine) ?? ((D = e.orderToolsState) == null ? void 0 : D.priceLine) ?? !0) || (((Fe = e.orderToolsState) == null ? void 0 : Fe.countDown) ?? ((ze = e.orderToolsState) == null ? void 0 : ze.priceLine) ?? !0) || (((nt = e.orderToolsState) == null ? void 0 : nt.bidAskPrice) ?? ((Pt = e.orderToolsState) == null ? void 0 : Pt.priceLine) ?? !0);
                }), z(() => {
                  var _, D;
                  return Qt.checked = ((_ = e.orderToolsState) == null ? void 0 : _.marketPriceLine) ?? ((D = e.orderToolsState) == null ? void 0 : D.priceLine) ?? !0;
                }), z(() => {
                  var _, D;
                  return Mt.checked = ((_ = e.orderToolsState) == null ? void 0 : _.countDown) ?? ((D = e.orderToolsState) == null ? void 0 : D.priceLine) ?? !0;
                }), z(() => {
                  var _, D;
                  return C1.checked = ((_ = e.orderToolsState) == null ? void 0 : _.bidAskPrice) ?? ((D = e.orderToolsState) == null ? void 0 : D.priceLine) ?? !0;
                }), z(() => {
                  var _;
                  return R1.checked = ((_ = e.orderToolsState) == null ? void 0 : _.orderPreviewLine) ?? !0;
                }), z(() => {
                  var _;
                  return K1.checked = ((_ = e.orderToolsState) == null ? void 0 : _.orderHistory) ?? !0;
                }), Me;
              }
            });
          }
        }), null), z((Me) => {
          const et = a() ? "0 8px" : "0 10px", gt = v() ? "rotate(180deg)" : "rotate(0deg)";
          return et !== Me._v$8 && Ce.style.setProperty("padding", Me._v$8 = et), gt !== Me._v$9 && Je.style.setProperty("transform", Me._v$9 = gt), Me;
        }, {
          _v$8: void 0,
          _v$9: void 0
        }), k;
      }
    }), We), C(ge, A(de, {
      get when() {
        return !a();
      },
      get children() {
        return [(() => {
          const k = _f.cloneNode(!0);
          return ht(k, "click", e.onTimezoneClick, !0), k;
        })(), (() => {
          const k = kf.cloneNode(!0);
          return ht(k, "click", e.onSettingClick, !0), k;
        })()];
      }
    }), We), C(ge, A(de, {
      get when() {
        return !a();
      },
      get children() {
        const k = xf.cloneNode(!0);
        return ht(k, "click", e.onScreenshotClick, !0), k;
      }
    }), We), We.$$click = () => {
      if (G())
        (document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen).call(document);
      else {
        const k = t == null ? void 0 : t.closest(".klinecharts-pro");
        k && ((k == null ? void 0 : k.requestFullscreen) ?? (k == null ? void 0 : k.webkitRequestFullscreen) ?? (k == null ? void 0 : k.mozRequestFullScreen) ?? (k == null ? void 0 : k.msRequestFullscreen)).call(k);
      }
    }, C(We, (() => {
      const k = Y(() => !!G());
      return () => k() ? Sf.cloneNode(!0) : Pf.cloneNode(!0);
    })()), C(ge, A(de, {
      get when() {
        return Y(() => !!e.chartViewToggle)() && !G();
      },
      get children() {
        const k = Lf.cloneNode(!0);
        return ht(k, "click", e.chartViewToggle.onToggle, !0), C(k, (() => {
          const Ce = Y(() => e.chartViewToggle.view === "chart");
          return () => Ce() ? Df.cloneNode(!0) : Nf.cloneNode(!0);
        })()), z(() => Ne(k, "title", e.chartViewToggle.view === "chart" ? "View Depth" : "View Chart")), k;
      }
    }), null), C(O, A(de, {
      get when() {
        return M();
      },
      get children() {
        const k = wf.cloneNode(!0);
        return k.$$click = () => t.scrollBy({
          left: 100,
          behavior: "smooth"
        }), k.style.setProperty("position", "absolute"), k.style.setProperty("right", "0"), k.style.setProperty("top", "0"), k.style.setProperty("bottom", "1px"), k.style.setProperty("width", "30px"), k.style.setProperty("display", "flex"), k.style.setProperty("align-items", "center"), k.style.setProperty("justify-content", "center"), k.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), k.style.setProperty("z-index", "10"), k.style.setProperty("cursor", "pointer"), k.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), k;
      }
    }), null), z((k) => {
      const Ce = e.spread ? "" : "rotate", Ae = G() ? "0px" : "var(--klinecharts-pro-period-bar-padding-right)";
      return Ce !== k._v$10 && Ne($e, "class", k._v$10 = Ce), Ae !== k._v$11 && ge.style.setProperty("padding-right", k._v$11 = Ae), k;
    }, {
      _v$10: void 0,
      _v$11: void 0
    }), O;
  })();
};
Ye(["click", "mousedown"]);
const If = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M12.41465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L12.41465,12C12.20873,12.5826,11.65311,13,11,13C10.34689,13,9.79127,12.5826,9.58535,12L3.5,12C3.223857,12,3,11.77614,3,11.5C3,11.22386,3.223857,11,3.5,11L9.58535,11C9.79127,10.417404,10.34689,10,11,10C11.65311,10,12.20873,10.417404,12.41465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), Ef = () => If.cloneNode(!0), Bf = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,11L11.08535,11C11.29127,10.417404,11.84689,10,12.5,10C13.15311,10,13.70873,10.417404,13.91465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L13.91465,12C13.70873,12.5826,13.15311,13,12.5,13C11.84689,13,11.29127,12.5826,11.08535,12L6.91465,12C6.70873,12.5826,6.15311,13,5.5,13C4.671573,13,4,12.32843,4,11.5C4,10.671573,4.671573,10,5.5,10C6.15311,10,6.70873,10.417404,6.91465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), Ff = () => Bf.cloneNode(!0), Uf = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,12.5C6.70873,13.0826,6.15311,13.5,5.5,13.5C4.671573,13.5,4,12.82843,4,12C4,11.171573,4.671573,10.5,5.5,10.5C6.15311,10.5,6.70873,10.917404,6.91465,11.5L16.0853,11.5C16.2913,10.917404,16.846899999999998,10.5,17.5,10.5C18.328400000000002,10.5,19,11.171573,19,12C19,12.82843,18.328400000000002,13.5,17.5,13.5C16.846899999999998,13.5,16.2913,13.0826,16.0853,12.5L6.91465,12.5Z" stroke-opacity="0" stroke="none"></path></svg>'), zf = () => Uf.cloneNode(!0), Vf = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,12.41465L11,18.5C11,18.7761,11.22386,19,11.5,19C11.77614,19,12,18.7761,12,18.5L12,12.41465C12.5826,12.20873,13,11.65311,13,11C13,10.34689,12.5826,9.79127,12,9.58535L12,3.5C12,3.223857,11.77614,3,11.5,3C11.22386,3,11,3.223857,11,3.5L11,9.58535C10.417404,9.79127,10,10.34689,10,11C10,11.65311,10.417404,12.20873,11,12.41465Z" stroke-opacity="0" stroke="none"></path></svg>'), Rf = () => Vf.cloneNode(!0), Kf = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.66558837890625,19C10.83716137890625,19,10.16558837890625,18.328400000000002,10.16558837890625,17.5C10.16558837890625,16.846899999999998,10.58298437890625,16.2913,11.16557337890625,16.0854L11.16557337890625,11.91464C10.58298437890625,11.70872,10.16558837890625,11.1531,10.16558837890625,10.5C10.16558837890625,9.8469,10.58298437890625,9.29128,11.16557337890625,9.08536L11.16557337890625,4.5C11.16557337890625,4.223857,11.38942837890625,4,11.66556837890625,4C11.94171837890625,4,12.16556837890625,4.223857,12.16556837890625,4.5L12.16556837890625,9.08535C12.74817837890625,9.291260000000001,13.16558837890625,9.846879999999999,13.16558837890625,10.5C13.16558837890625,11.153120000000001,12.74817837890625,11.708739999999999,12.16556837890625,11.91465L12.16556837890625,16.0854C12.74817837890625,16.2913,13.16558837890625,16.846899999999998,13.16558837890625,17.5C13.16558837890625,18.328400000000002,12.49401837890625,19,11.66558837890625,19Z" stroke-opacity="0" stroke="none"></path></svg>'), jf = () => Kf.cloneNode(!0), Qf = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.165603637695312,6.91465C11.748203637695312,6.70873,12.165603637695312,6.15311,12.165603637695312,5.5C12.165603637695312,4.671573,11.494033637695313,4,10.665603637695312,4C9.837176637695313,4,9.165603637695312,4.671573,9.165603637695312,5.5C9.165603637695312,6.15311,9.583007637695312,6.70873,10.165603637695312,6.91465L10.165603637695312,16.0854C9.583007637695312,16.2913,9.165603637695312,16.846899999999998,9.165603637695312,17.5C9.165603637695312,18.328400000000002,9.837176637695313,19,10.665603637695312,19C11.494033637695313,19,12.165603637695312,18.328400000000002,12.165603637695312,17.5C12.165603637695312,16.846899999999998,11.748203637695312,16.2913,11.165603637695312,16.0854L11.165603637695312,6.91465Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Zf = () => Qf.cloneNode(!0), Hf = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.146447,15.753C4.9511845,15.9483,4.9511845,16.2649,5.146447,16.4602C5.341709,16.6554,5.658291,16.6554,5.853554,16.4602L8.156600000000001,14.15711C8.352409999999999,14.25082,8.57173,14.3033,8.8033,14.3033C9.631730000000001,14.3033,10.3033,13.63172,10.3033,12.80329C10.3033,12.57172,10.250820000000001,12.352409999999999,10.157119999999999,12.15659L12.156600000000001,10.15711C12.352409999999999,10.250820000000001,12.571729999999999,10.30329,12.8033,10.30329C13.63173,10.30329,14.3033,9.63172,14.3033,8.80329C14.3033,8.57172,14.25082,8.352409999999999,14.15712,8.15659L16.4602,5.853553C16.6554,5.658291,16.6554,5.341709,16.4602,5.146447C16.2649,4.9511843,15.9483,4.9511843,15.753,5.146447L13.45001,7.449479999999999C13.25419,7.35577,13.03487,7.3032900000000005,12.8033,7.3032900000000005C11.97487,7.3032900000000005,11.3033,7.97487,11.3033,8.80329C11.3033,9.03487,11.35578,9.254190000000001,11.44949,9.450009999999999L9.450009999999999,11.449480000000001C9.254190000000001,11.35577,9.03487,11.30329,8.8033,11.30329C7.97487,11.30329,7.3033,11.97487,7.3033,12.80329C7.3033,13.03487,7.35578,13.25419,7.44949,13.45001L5.146447,15.753Z" stroke-opacity="0" stroke="none"></path></svg>'), Yf = () => Hf.cloneNode(!0), Wf = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M7.573332939453125,14.54567903564453C7.667042939453125,14.741499035644532,7.719512939453125,14.960809035644532,7.719512939453125,15.19239903564453C7.719512939453125,16.02079903564453,7.047942939453125,16.69239903564453,6.219512939453125,16.69239903564453C5.391085939453125,16.69239903564453,4.719512939453125,16.02079903564453,4.719512939453125,15.19239903564453C4.719512939453125,14.36394903564453,5.391085939453125,13.692379035644532,6.219512939453125,13.692379035644532C6.451092939453125,13.692379035644532,6.670412939453125,13.74485903564453,6.866232939453125,13.83856903564453L9.865702939453126,10.83909903564453C9.771992939453124,10.643279035644532,9.719512939453125,10.42395903564453,9.719512939453125,10.192379035644532C9.719512939453125,9.36394903564453,10.391082939453124,8.692379035644532,11.219512939453125,8.692379035644532C11.451092939453126,8.692379035644532,11.670412939453126,8.74485903564453,11.866232939453125,8.838569035644532L15.462112939453124,5.242645035644531C15.657412939453126,5.047383335644532,15.974012939453125,5.047383335644532,16.169212939453125,5.242645035644531C16.364512939453125,5.437907035644531,16.364512939453125,5.754489035644531,16.169212939453125,5.949752035644531L12.573332939453124,9.545679035644532C12.667042939453125,9.74149903564453,12.719512939453125,9.96080903564453,12.719512939453125,10.192379035644532C12.719512939453125,11.020809035644533,12.047942939453126,11.692379035644532,11.219512939453125,11.692379035644532C10.987942939453125,11.692379035644532,10.768632939453125,11.639909035644532,10.572812939453126,11.54619903564453L7.573332939453125,14.54567903564453Z" stroke-opacity="0" stroke="none"></path></svg>'), qf = () => Wf.cloneNode(!0), Gf = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M15.719512939453125,8.461776733398438C16.547912939453127,8.461776733398438,17.219512939453125,7.7902067333984375,17.219512939453125,6.9617767333984375C17.219512939453125,6.133349733398438,16.547912939453127,5.4617767333984375,15.719512939453125,5.4617767333984375C14.891082939453124,5.4617767333984375,14.219512939453125,6.133349733398438,14.219512939453125,6.9617767333984375C14.219512939453125,7.193346733398437,14.271992939453124,7.412666733398438,14.365692939453124,7.608486733398438L7.366222939453126,14.607956733398437C7.170402939453125,14.514256733398437,6.951082939453125,14.461776733398438,6.719512939453125,14.461776733398438C5.891085939453125,14.461776733398438,5.219512939453125,15.133346733398437,5.219512939453125,15.961776733398438C5.219512939453125,16.79017673339844,5.891085939453125,17.461776733398438,6.719512939453125,17.461776733398438C7.547942939453125,17.461776733398438,8.219512939453125,16.79017673339844,8.219512939453125,15.961776733398438C8.219512939453125,15.730176733398437,8.167032939453126,15.510876733398437,8.073322939453124,15.315066733398437L15.072802939453124,8.315586733398437C15.268612939453124,8.409296733398438,15.487912939453125,8.461776733398438,15.719512939453125,8.461776733398438Z" stroke-opacity="0" stroke="none"></path></svg>'), Xf = () => Gf.cloneNode(!0), Jf = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17.0643,7.033864912109375L18,3.585784912109375L14.5078,4.509695912109375L15.3537,5.344934912109375L6.02026,14.560584912109375C5.87635,14.517484912109374,5.72366,14.494284912109375,5.5655,14.494284912109375C4.7009,14.494284912109375,4,15.186384912109375,4,16.040084912109375C4,16.893784912109375,4.7009,17.585784912109375,5.5655,17.585784912109375C6.43011,17.585784912109375,7.13101,16.893784912109375,7.13101,16.040084912109375C7.13101,15.722284912109375,7.03392,15.426984912109376,6.86744,15.181384912109374L16.0917,6.073604912109375L17.0643,7.033864912109375Z" stroke-opacity="0" stroke="none"></path></svg>'), em = () => Jf.cloneNode(!0), tm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,13.00505L18.5,13.00505C18.7761,13.00505,19,13.228909999999999,19,13.50505C19,13.781189999999999,18.7761,14.00505,18.5,14.00505L6.91465,14.00505C6.70873,14.58765,6.15311,15.00505,5.5,15.00505C4.671573,15.00505,4,14.33348,4,13.50505C4,12.67662,4.671573,12.00505,5.5,12.00505C6.15311,12.00505,6.70873,12.422450000000001,6.91465,13.00505ZM7.81404,11.625L10.48591,11.625L10.48591,10.90625L9.65193,10.90625L9.65193,7.125L8.997630000000001,7.125C8.71443,7.306641,8.415600000000001,7.419922,7.96443,7.498047L7.96443,8.05078L8.77497,8.05078L8.77497,10.90625L7.81404,10.90625L7.81404,11.625ZM11.081620000000001,11.625L14.0562,11.625L14.0562,10.88281L13.09724,10.88281C12.8863,10.88281,12.59333,10.90625,12.36482,10.93555C13.17537,10.11328,13.84724,9.2207,13.84724,8.39062C13.84724,7.541016,13.28865,7,12.4488,7C11.84333,7,11.446850000000001,7.234375,11.03279,7.679688L11.52497,8.16797C11.747630000000001,7.914062,12.0113,7.697266,12.33552,7.697266C12.7613,7.697266,13.00154,7.982422,13.00154,8.43359C13.00154,9.14648,12.29255,10.00781,11.081620000000001,11.11523L11.081620000000001,11.625ZM15.9605,11.75C16.8121,11.75,17.526899999999998,11.2832,17.526899999999998,10.4375C17.526899999999998,9.82031,17.142200000000003,9.43945,16.6441,9.30078L16.6441,9.27148C17.1129,9.08594,17.3824,8.7207,17.3824,8.21289C17.3824,7.421875,16.8004,7,15.9429,7C15.4215,7,14.9957,7.210938,14.6109,7.541016L15.066,8.11133C15.3258,7.849609,15.5836,7.697266,15.9019,7.697266C16.2789,7.697266,16.4957,7.914062,16.4957,8.28125C16.4957,8.70898,16.2301,9,15.4215,9L15.4215,9.63672C16.3804,9.63672,16.6383,9.91992,16.6383,10.38086C16.6383,10.79688,16.3336,11.03125,15.8824,11.03125C15.4742,11.03125,15.1578,10.82227,14.8922,10.55078L14.4781,11.13281C14.7906,11.486329999999999,15.2652,11.75,15.9605,11.75Z" stroke-opacity="0" stroke="none"></path></svg>'), nm = () => tm.cloneNode(!0), rm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.146447,14.178126025390625C2.9511847,13.982826025390626,2.9511847,13.666226025390625,3.146447,13.470926025390625L7.39146,9.225966025390626C7.35417,9.095106025390624,7.33421,8.956946025390625,7.33421,8.814116025390625C7.33421,7.985696025390625,8.00578,7.314116025390625,8.834209999999999,7.314116025390625C8.97703,7.314116025390625,9.11519,7.334086025390625,9.24605,7.371366025390625L13.753,2.864373025390625C13.9483,2.669110325390625,14.2649,2.669110325390625,14.4602,2.864373025390625C14.6554,3.059635025390625,14.6554,3.376217025390625,14.4602,3.571479025390625L10.06916,7.962476025390625C10.23631,8.204386025390626,10.334209999999999,8.497826025390625,10.334209999999999,8.814116025390625C10.334209999999999,9.642546025390626,9.66264,10.314116025390625,8.834209999999999,10.314116025390625C8.51791,10.314116025390625,8.22448,10.216226025390625,7.98256,10.049076025390626L3.853554,14.178126025390625C3.658291,14.373326025390625,3.341709,14.373326025390625,3.146447,14.178126025390625ZM7.67736,19.188526025390626C7.4821,18.993226025390626,7.4821,18.676626025390625,7.67736,18.481426025390626L9.9804,16.178326025390625C9.88669,15.982526025390625,9.834209999999999,15.763226025390624,9.834209999999999,15.531626025390626C9.834209999999999,14.703226025390626,10.50578,14.031626025390626,11.33421,14.031626025390626C11.56579,14.031626025390626,11.78511,14.084126025390624,11.98093,14.177826025390624L13.9804,12.178356025390626C13.8867,11.982536025390624,13.8342,11.763216025390625,13.8342,11.531636025390625C13.8342,10.703206025390624,14.5058,10.031636025390625,15.3342,10.031636025390625C15.5658,10.031636025390625,15.7851,10.084116025390625,15.9809,10.177826025390626L18.284,7.874796025390625C18.4792,7.679536025390625,18.7958,7.679536025390625,18.9911,7.874796025390625C19.1863,8.070056025390624,19.1863,8.386636025390626,18.9911,8.581906025390625L16.688000000000002,10.884936025390624C16.7817,11.080756025390626,16.8342,11.300066025390626,16.8342,11.531636025390625C16.8342,12.360066025390624,16.162599999999998,13.031626025390626,15.3342,13.031626025390626C15.1026,13.031626025390626,14.8833,12.979126025390626,14.6875,12.885426025390625L12.68803,14.884926025390625C12.78174,15.080726025390625,12.83421,15.300026025390626,12.83421,15.531626025390626C12.83421,16.360026025390624,12.16264,17.031626025390626,11.33421,17.031626025390626C11.10264,17.031626025390626,10.88333,16.979126025390627,10.68751,16.885426025390625L8.38446,19.188526025390626C8.1892,19.383726025390626,7.87262,19.383726025390626,7.67736,19.188526025390626Z" stroke-opacity="0" stroke="none"></path></svg>'), om = () => rm.cloneNode(!0), im = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.3367688759765626,12.63173C3.5320318759765623,12.82699,3.8486138759765627,12.82699,4.043876875976562,12.63173L11.822052875976562,4.853553C12.017312875976563,4.658291,12.017312875976563,4.341708,11.822052875976562,4.146446C11.626792875976562,3.9511843,11.310202875976563,3.9511843,11.114942875976563,4.146446L3.3367688759765626,11.92462C3.1415071759765625,12.11988,3.1415071759765625,12.43647,3.3367688759765626,12.63173ZM5.001492875976562,17.0351C4.806232875976562,16.8399,4.806232875976562,16.5233,5.001492875976562,16.328L7.304532875976562,14.025C7.210822875976563,13.82916,7.158352875976563,13.60984,7.158352875976563,13.37827C7.158352875976563,12.54984,7.829922875976562,11.87827,8.658352875976561,11.87827C8.889922875976563,11.87827,9.109232875976563,11.93075,9.305052875976562,12.02446L11.304532875976562,10.02498C11.210822875976563,9.82916,11.158352875976561,9.60984,11.158352875976561,9.37827C11.158352875976561,8.54984,11.829922875976562,7.8782700000000006,12.658352875976563,7.8782700000000006C12.889922875976563,7.8782700000000006,13.109232875976563,7.93075,13.305022875976562,8.024460000000001L15.608122875976562,5.72142C15.803322875976562,5.5261499999999995,16.119922875976563,5.5261499999999995,16.315222875976563,5.72142C16.510422875976563,5.9166799999999995,16.510422875976563,6.23326,16.315222875976563,6.42852L14.012122875976562,8.73156C14.105822875976562,8.92738,14.158322875976562,9.1467,14.158322875976562,9.37827C14.158322875976562,10.2067,13.486822875976562,10.87827,12.658352875976563,10.87827C12.426772875976562,10.87827,12.207452875976562,10.82579,12.011642875976563,10.73209L10.012162875976562,12.73156C10.105872875976562,12.92738,10.158352875976561,13.1467,10.158352875976561,13.37827C10.158352875976561,14.2067,9.486772875976563,14.8783,8.658352875976561,14.8783C8.426772875976562,14.8783,8.207452875976562,14.8258,8.011642875976563,14.7321L5.708602875976562,17.0351C5.513342875976562,17.2304,5.196752875976562,17.2304,5.001492875976562,17.0351ZM10.415712875976563,18.328C10.220452875976562,18.5233,9.903862875976563,18.5233,9.708602875976563,18.328C9.513342875976562,18.1328,9.513342875976562,17.816200000000002,9.708602875976563,17.6209L12.304532875976562,15.025C12.210822875976563,14.8292,12.158352875976563,14.6098,12.158352875976563,14.3783C12.158352875976563,13.54984,12.829922875976562,12.87827,13.658322875976562,12.87827C13.889922875976563,12.87827,14.109222875976563,12.93075,14.305022875976562,13.02446L17.486822875976564,9.84274C17.682022875976564,9.64747,17.99862287597656,9.64747,18.19392287597656,9.84274C18.38912287597656,10.038,18.38912287597656,10.35458,18.19392287597656,10.54984L15.012122875976562,13.73156C15.105822875976562,13.92738,15.158322875976562,14.1467,15.158322875976562,14.3783C15.158322875976562,15.2067,14.486822875976562,15.8783,13.658322875976562,15.8783C13.426822875976562,15.8783,13.207422875976562,15.8258,13.011642875976563,15.7321L10.415712875976563,18.328Z" stroke-opacity="0" stroke="none"></path></svg>'), am = () => im.cloneNode(!0), sm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M13.1889,6C12.98303,6.582599999999999,12.42741,7,11.7743,7C11.12119,7,10.565570000000001,6.582599999999999,10.35965,6L3.5,6C3.223857,6,3,5.77614,3,5.5C3,5.22386,3.223857,5,3.5,5L10.35965,5C10.565570000000001,4.417404,11.12119,4,11.7743,4C12.42741,4,12.98303,4.417404,13.1889,5L18.5,5C18.7761,5,19,5.22386,19,5.5C19,5.77614,18.7761,6,18.5,6L13.1889,6ZM3,8.5C3,8.22386,3.223857,8,3.5,8L18.5,8C18.7761,8,19,8.22386,19,8.5C19,8.77614,18.7761,9,18.5,9L3.5,9C3.223857,9,3,8.77614,3,8.5ZM3.278549,11.5C3.278549,11.22386,3.502407,11,3.778549,11L18.7785,11C19.0547,11,19.2785,11.22386,19.2785,11.5C19.2785,11.77614,19.0547,12,18.7785,12L3.778549,12C3.502407,12,3.278549,11.77614,3.278549,11.5ZM3.139267,14.5C3.139267,14.2239,3.363124,14,3.6392670000000003,14L18.6393,14C18.915399999999998,14,19.1393,14.2239,19.1393,14.5C19.1393,14.7761,18.915399999999998,15,18.6393,15L3.6392670000000003,15C3.363124,15,3.139267,14.7761,3.139267,14.5ZM13.1889,18C12.98303,18.5826,12.42741,19,11.7743,19C11.12119,19,10.565570000000001,18.5826,10.35965,18L3.778549,18C3.502407,18,3.278549,17.7761,3.278549,17.5C3.278549,17.2239,3.502407,17,3.778549,17L10.35965,17C10.565570000000001,16.4174,11.12119,16,11.7743,16C12.42741,16,12.98303,16.4174,13.1889,17L18.7785,17C19.0547,17,19.2785,17.2239,19.2785,17.5C19.2785,17.7761,19.0547,18,18.7785,18L13.1889,18Z" stroke-opacity="0" stroke="none"></path></svg>'), lm = () => sm.cloneNode(!0), cm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4.91465,6C4.70873,6.582599999999999,4.15311,7,3.5,7C2.671573,7,2,6.32843,2,5.5C2,4.671573,2.671573,4,3.5,4C4.15311,4,4.70873,4.417404,4.91465,5L18.2257,5C18.5018,5,18.7257,5.22386,18.7257,5.5C18.7257,5.77614,18.5018,6,18.2257,6L4.91465,6ZM2.7257,8.5C2.7257,8.22386,2.949558,8,3.2257,8L18.2257,8C18.5018,8,18.7257,8.22386,18.7257,8.5C18.7257,8.77614,18.5018,9,18.2257,9L3.2257,9C2.949558,9,2.7257,8.77614,2.7257,8.5ZM3.00425,11.5C3.00425,11.22386,3.22811,11,3.50425,11L18.5042,11C18.7804,11,19.0042,11.22386,19.0042,11.5C19.0042,11.77614,18.7804,12,18.5042,12L3.50425,12C3.22811,12,3.00425,11.77614,3.00425,11.5ZM2.864967,14.5C2.864967,14.2239,3.08882,14,3.36497,14L18.365,14C18.6411,14,18.865,14.2239,18.865,14.5C18.865,14.7761,18.6411,15,18.365,15L3.36497,15C3.08882,15,2.864967,14.7761,2.864967,14.5ZM20,17.5C20,18.328400000000002,19.3284,19,18.5,19C17.846899999999998,19,17.2913,18.5826,17.0854,18L3.50425,18C3.22811,18,3.00425,17.7761,3.00425,17.5C3.00425,17.2239,3.22811,17,3.50425,17L17.0854,17C17.2913,16.4174,17.846899999999998,16,18.5,16C19.3284,16,20,16.671599999999998,20,17.5Z" stroke-opacity="0" stroke="none"></path></svg>'), um = () => cm.cloneNode(!0), dm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="5" ry="5" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="3" ry="3" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse></svg>'), hm = () => dm.cloneNode(!0), fm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3,7.32468C5.90649,3.3893050000000002,11.49833,2.81306,14.6674,6.31944C14.9056,6.1554199999999994,15.192,6.05979,15.5,6.05979C15.845,6.05979,16.1628,6.17974,16.4162,6.381349999999999L18.4509,4.23827L19,4.816615L16.8945,7.03429C16.962600000000002,7.21075,17,7.40319,17,7.60463C17,8.45782,16.328400000000002,9.14947,15.5,9.14947C14.6716,9.14947,14,8.45782,14,7.60463C14,7.36402,14.0534,7.13625,14.1487,6.93322C11.32695,3.748365,6.25159,4.253956,3.612785,7.82695L3,7.32468ZM14.09,15.4717C15.7427,13.78985,16.244500000000002,11.524740000000001,15.5633,9.30134L15.5618,9.30134L16.3012,9.0502C17.072400000000002,11.56646,16.497700000000002,14.158,14.6282,16.0599C12.28737,18.442,8.62386,18.6988,6.41348,16.4501C4.5526,14.5572,4.52076,11.19671,6.36766,9.3177C7.89069,7.76754,10.07544,7.706189999999999,11.56741,9.22363C11.95453,9.61742,12.24817,10.08363,12.43369,10.57677L14.1451,8.77421L14.6942,9.35256L12.64982,11.50582C12.65827,11.59712,12.66295,11.68839,12.66378,11.77936C12.87398,12.04523,13,12.38451,13,12.7541C13,13.60729,12.32843,14.2989,11.5,14.2989C10.67157,14.2989,10,13.60729,10,12.7541C10,11.90091,10.67157,11.20926,11.5,11.20926C11.60387,11.20926,11.70528,11.220130000000001,11.8032,11.240829999999999L11.81763,11.22564C11.69858,10.71874,11.42858,10.21929,11.0284,9.81179C9.844000000000001,8.60765,8.136890000000001,8.65592,6.90822,9.90586C5.37975,11.460930000000001,5.40693,14.288,6.95404,15.8619C8.84598,17.7867,12.03496,17.5626,14.09,15.4717Z" stroke-opacity="0" stroke="none"></path></svg>'), mm = () => fm.cloneNode(!0), gm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4,17.0854L4,3.5C4,3.223858,4.22386,3,4.5,3C4.77614,3,5,3.223858,5,3.5L5,10L7.57584,10L9.8127,4.46359C9.91614,4.20756,10.20756,4.08386,10.46359,4.1873000000000005C10.71963,4.29075,10.84333,4.58216,10.73988,4.8382000000000005L8.65438,10L11.08535,10C11.29127,9.4174,11.84689,9,12.5,9C12.65154,9,12.79784,9.02247,12.93573,9.06427L16.6464,5.35355C16.8417,5.15829,17.1583,5.15829,17.3536,5.35355C17.5488,5.54882,17.5488,5.8654,17.3536,6.06066L13.7475,9.66675C13.907,9.90508,14,10.19168,14,10.5C14,11.15311,13.5826,11.70873,13,11.91465L13,14.3638L18.3714,12.1936C18.6274,12.09015,18.918799999999997,12.21385,19.0222,12.46989C19.1257,12.72592,19.002,13.0173,18.746000000000002,13.1208L13,15.4423L13,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854ZM6.3729499999999994,17.0413L12,14.7678L12,11.91465C11.88136,11.87271,11.76956,11.81627,11.66675,11.74746L6.3729499999999994,17.0413ZM12,15.8463L6.6694700000000005,18L12,18L12,15.8463ZM6.38629,15.6137L8.250350000000001,11L11,11L6.38629,15.6137ZM5,11L7.17182,11L5,16.3754L5,11Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), ym = () => gm.cloneNode(!0), Cm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17,4.5C17,5.32843,16.328400000000002,6,15.5,6C15.0931,6,14.7241,5.83802,14.4539,5.57503L5.98992,8.32515C5.99658,8.38251,6,8.440850000000001,6,8.5C6,9.15311,5.582599999999999,9.70873,5,9.91465L5,11.08535C5.42621,11.236,5.763999999999999,11.57379,5.91465,12L19.5,12C19.7761,12,20,12.22386,20,12.5C20,12.77614,19.7761,13,19.5,13L5.91465,13C5.70873,13.5826,5.15311,14,4.5,14C3.671573,14,3,13.3284,3,12.5C3,11.84689,3.417404,11.29127,4,11.08535L4,9.91465C3.417404,9.70873,3,9.15311,3,8.5C3,7.67157,3.671573,7,4.5,7C4.90411,7,5.2709,7.15981,5.5406200000000005,7.41967L14.0093,4.66802C14.0032,4.6128599999999995,14,4.5568,14,4.5C14,3.671573,14.6716,3,15.5,3C16.328400000000002,3,17,3.671573,17,4.5ZM4,15.5C4,15.2239,4.22386,15,4.5,15L19.5,15C19.7761,15,20,15.2239,20,15.5C20,15.7761,19.7761,16,19.5,16L4.5,16C4.22386,16,4,15.7761,4,15.5ZM4,18.5C4,18.2239,4.22386,18,4.5,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L4.5,19C4.22386,19,4,18.7761,4,18.5Z" stroke-opacity="0" stroke="none"></path></svg>'), pm = () => Cm.cloneNode(!0), vm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M20,3.5C20,4.15311,19.5826,4.70873,19,4.91465L19,18.5C19,18.7761,18.7761,19,18.5,19L4.91465,19C4.70873,19.5826,4.15311,20,3.5,20C2.671573,20,2,19.3284,2,18.5C2,17.846899999999998,2.417404,17.2913,3,17.0854L3,3.5C3,3.22386,3.22386,3,3.5,3L17.0854,3C17.2913,2.417404,17.846899999999998,2,18.5,2C19.3284,2,20,2.671573,20,3.5ZM17.0854,4C17.236,4.42621,17.5738,4.763999999999999,18,4.91465L18,8L14,8L14,4L17.0854,4ZM13,4L13,8L9,8L9,4L13,4ZM13,9L9,9L9,13L13,13L13,9ZM13,14L9,14L9,18L13,18L13,14ZM14,18L14,14L18,14L18,18L14,18ZM18,13L14,13L14,9L18,9L18,13ZM4.91465,18C4.763999999999999,17.5738,4.42621,17.236,4,17.0854L4,14L8,14L8,18L4.91465,18ZM4,8L4,4L8,4L8,8L4,8ZM8,9L8,13L4,13L4,9L8,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), bm = () => vm.cloneNode(!0), $m = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" fill="none" stroke-opacity="1" stroke-width="1"></ellipse></svg>'), _m = () => $m.cloneNode(!0), km = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.57625,6.9981C11.55099,6.999359999999999,11.52557,7,11.5,7C11.34,7,11.18584,6.97495,11.04125,6.9285499999999995L5.55401,16.4327C5.713760000000001,16.5905,5.83826,16.7839,5.91465,17L16.0854,17C16.2187,16.622700000000002,16.4987,16.314700000000002,16.8569,16.1445L11.57625,6.9981ZM12.50759,6.611219999999999C12.81005,6.336790000000001,13,5.94058,13,5.5C13,4.671573,12.32843,4,11.5,4C10.67157,4,10,4.671573,10,5.5C10,5.80059,10.08841,6.08052,10.24066,6.31522L4.64514,16.0069C4.59738,16.002299999999998,4.54896,16,4.5,16C3.671573,16,3,16.671599999999998,3,17.5C3,18.328400000000002,3.671573,19,4.5,19C5.15311,19,5.70873,18.5826,5.91465,18L16.0854,18C16.2913,18.5826,16.846899999999998,19,17.5,19C18.328400000000002,19,19,18.328400000000002,19,17.5C19,16.8365,18.5691,16.2735,17.971899999999998,16.075699999999998L12.50759,6.611219999999999Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), xm = () => km.cloneNode(!0), Lm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19,4.5C19,5.15311,18.5826,5.70873,18,5.91465L18,18.5C18,18.7761,17.7761,19,17.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854L4,4.5C4,4.22386,4.22386,4,4.5,4L16.0854,4C16.2913,3.417404,16.846899999999998,3,17.5,3C18.328400000000002,3,19,3.671573,19,4.5ZM5,5L16.0854,5C16.236,5.42621,16.5738,5.763999999999999,17,5.91465L17,18L5.91465,18C5.763999999999999,17.5738,5.42621,17.236,5,17.0854L5,5Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), wm = () => Lm.cloneNode(!0), Am = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19.6401,7.99355C20.4028,7.92291,21,7.2811900000000005,21,6.5C21,5.671573,20.3284,5,19.5,5C18.8469,5,18.2913,5.417404,18.0854,6L7.62067,6C7.34453,6,7.12067,6.22386,7.12067,6.5C7.12067,6.5479,7.12741,6.59423,7.13999,6.63809L3.2294099999999997,15.0243C2.530138,15.1517,2,15.764,2,16.5C2,17.328400000000002,2.671573,18,3.5,18C4.15311,18,4.70873,17.5826,4.91465,17L14.5963,17C14.6456,17.076,14.7162,17.1396,14.8044,17.1807C15.0546,17.2974,15.3521,17.1891,15.4688,16.9388L19.6401,7.99355ZM14.7896,16.0293L18.6551,7.739599999999999C18.3942,7.56144,18.1925,7.30307,18.0854,7L8.0746,7L4.25044,15.2009C4.55701,15.3784,4.79493,15.6613,4.91465,16L14.6207,16C14.68,16,14.7368,16.0103,14.7896,16.0293Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Tm = () => Am.cloneNode(!0), Mm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.134443814697265,7.494615087890625L8.764323814697265,7.494615087890625L8.764323814697265,3.414215087890625L8.310223814697267,3.414215087890625L7.294603814697266,4.005035087890625L7.289713814697266,4.634915087890625L8.134443814697265,4.149892087890625L8.134443814697265,7.494615087890625ZM18.832003814697266,6.933095087890624Q19.004603814697266,6.635245087890625,19.004603814697266,6.2543850878906255Q19.004603814697266,5.884915087890625,18.845103814697264,5.593575087890625Q18.685503814697267,5.3006050878906255,18.399103814697266,5.136225087890625Q18.114303814697266,4.9702050878906245,17.754603814697266,4.9653250878906245L18.820603814697265,3.840647087890625L18.820603814697265,3.414215087890625L16.519203814697264,3.414215087890625L16.519203814697264,3.939931087890625L18.050803814697264,3.939931087890625L16.719403814697266,5.334785087890625L17.074203814697263,5.7205350878906245Q17.254903814697265,5.484525087890625,17.619503814697268,5.484525087890625Q17.980803814697268,5.484525087890625,18.187503814697266,5.689605087890625Q18.394203814697267,5.894685087890625,18.394203814697267,6.2543850878906255Q18.394203814697267,6.604315087890625,18.187503814697266,6.822415087890625Q17.980803814697268,7.0405150878906255,17.640603814697265,7.0405150878906255Q17.334603814697267,7.0405150878906255,17.124703814697266,6.890775087890625Q16.914703814697265,6.739415087890626,16.820303814697265,6.469225087890624L16.354803814697263,6.744295087890626Q16.480103814697266,7.125155087890625,16.821903814697265,7.341625087890625Q17.165403814697264,7.559725087890625,17.640603814697265,7.559725087890625Q18.039403814697266,7.559725087890625,18.348603814697267,7.393705087890625Q18.659503814697267,7.229315087890625,18.832003814697266,6.933095087890624ZM10.000003814697266,10.634915087890626C10.000003814697266,11.024655087890626,9.851363814697265,11.379685087890625,9.607683814697266,11.646395087890625L12.168903814697266,15.171615087890626C12.275403814697265,15.147615087890625,12.386203814697266,15.134915087890626,12.500003814697266,15.134915087890626C12.596503814697266,15.134915087890626,12.690803814697265,15.144015087890624,12.782303814697265,15.161415087890624L16.108803814697268,11.196955087890625C16.038703814697264,11.023375087890624,16.000003814697266,10.833655087890625,16.000003814697266,10.634915087890626C16.000003814697266,9.806495087890625,16.671603814697264,9.134915087890626,17.500003814697266,9.134915087890626C18.328403814697264,9.134915087890626,19.000003814697266,9.806495087890625,19.000003814697266,10.634915087890626C19.000003814697266,11.463345087890625,18.328403814697264,12.134915087890626,17.500003814697266,12.134915087890626C17.239503814697265,12.134915087890626,16.994503814697268,12.068495087890625,16.781003814697264,11.951675087890624L13.654703814697266,15.677415087890624C13.870303814697266,15.937215087890625,14.000003814697266,16.270915087890625,14.000003814697266,16.634915087890626C14.000003814697266,17.463315087890624,13.328403814697266,18.134915087890626,12.500003814697266,18.134915087890626C11.671573814697265,18.134915087890626,11.000003814697266,17.463315087890624,11.000003814697266,16.634915087890626C11.000003814697266,16.284415087890626,11.120193814697265,15.962015087890626,11.321603814697266,15.706715087890625L8.715393814697265,12.119565087890624C8.645053814697267,12.129685087890625,8.573143814697266,12.134915087890626,8.500003814697266,12.134915087890626C8.162103814697264,12.134915087890626,7.8503038146972655,12.023195087890626,7.599523814697266,11.834665087890626L4.505583814697266,15.521915087890624C4.809213814697266,15.796415087890624,5.000003814697266,16.193415087890624,5.000003814697266,16.634915087890626C5.000003814697266,17.463315087890624,4.328433814697266,18.134915087890626,3.5000038146972656,18.134915087890626C2.6715768146972656,18.134915087890626,2.0000038146972656,17.463315087890624,2.0000038146972656,16.634915087890626C2.0000038146972656,15.806515087890626,2.6715768146972656,15.134915087890626,3.5000038146972656,15.134915087890626C3.508253814697266,15.134915087890626,3.5164838146972657,15.135015087890626,3.524703814697266,15.135115087890625L7.033823814697266,10.953115087890625C7.011673814697265,10.850565087890626,7.000003814697266,10.744105087890624,7.000003814697266,10.634915087890626C7.000003814697266,9.806495087890625,7.671573814697266,9.134915087890626,8.500003814697266,9.134915087890626C9.328433814697267,9.134915087890626,10.000003814697266,9.806495087890625,10.000003814697266,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Sm = () => Mm.cloneNode(!0), Pm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.13444,7.494615087890625L8.76432,7.494615087890625L8.76432,3.414215087890625L8.310220000000001,3.414215087890625L7.2946,4.005035087890625L7.28971,4.634915087890625L8.13444,4.149892087890625L8.13444,7.494615087890625ZM18.832,6.929835087890625Q19.0046,6.635245087890625,19.0046,6.2543850878906255Q19.0046,5.889805087890625,18.8451,5.5952050878906245Q18.6855,5.3006050878906255,18.3975,5.132965087890625Q18.1094,4.9653250878906245,17.7399,4.9653250878906245Q17.435499999999998,4.9653250878906245,17.1556,5.149245087890625L17.2793,3.939931087890625L18.8304,3.939931087890625L18.8304,3.414215087890625L16.7406,3.414215087890625L16.5094,5.665195087890625L17.0156,5.795405087890625Q17.095399999999998,5.655425087890626,17.2516,5.570795087890625Q17.4095,5.484525087890625,17.6357,5.484525087890625Q17.9694,5.484525087890625,18.1842,5.697745087890625Q18.4007,5.909335087890625,18.4007,6.2543850878906255Q18.4007,6.604315087890625,18.1842,6.822415087890625Q17.9694,7.0405150878906255,17.6292,7.0405150878906255Q17.3298,7.0405150878906255,17.119799999999998,6.890775087890625Q16.9098,6.739415087890626,16.825200000000002,6.474115087890625L16.3597,6.749175087890626Q16.470399999999998,7.110505087890624,16.807299999999998,7.335115087890625Q17.144199999999998,7.559725087890625,17.6292,7.559725087890625Q18.0296,7.559725087890625,18.3438,7.392075087890625Q18.6595,7.224435087890625,18.832,6.929835087890625ZM10,10.634915087890626C10,11.024655087890626,9.85136,11.379685087890625,9.60768,11.646395087890625L12.1689,15.171615087890626C12.2754,15.147615087890625,12.3862,15.134915087890626,12.5,15.134915087890626C12.5965,15.134915087890626,12.6908,15.144015087890624,12.7823,15.161415087890624L16.108800000000002,11.196955087890625C16.0387,11.023375087890624,16,10.833655087890625,16,10.634915087890626C16,9.806495087890625,16.671599999999998,9.134915087890626,17.5,9.134915087890626C18.3284,9.134915087890626,19,9.806495087890625,19,10.634915087890626C19,11.463345087890625,18.3284,12.134915087890626,17.5,12.134915087890626C17.2395,12.134915087890626,16.994500000000002,12.068505087890625,16.781,11.951675087890624L13.6547,15.677415087890624C13.8703,15.937215087890625,14,16.270915087890625,14,16.634915087890626C14,17.463315087890624,13.3284,18.134915087890626,12.5,18.134915087890626C11.67157,18.134915087890626,11,17.463315087890624,11,16.634915087890626C11,16.284415087890626,11.12019,15.962015087890626,11.3216,15.706715087890625L8.71539,12.119565087890624C8.645050000000001,12.129685087890625,8.57314,12.134915087890626,8.5,12.134915087890626C8.162099999999999,12.134915087890626,7.8503,12.023195087890626,7.59952,11.834665087890626L4.50558,15.521915087890624C4.80921,15.796415087890624,5,16.193415087890624,5,16.634915087890626C5,17.463315087890624,4.32843,18.134915087890626,3.5,18.134915087890626C2.671573,18.134915087890626,2,17.463315087890624,2,16.634915087890626C2,15.806515087890626,2.671573,15.134915087890626,3.5,15.134915087890626C3.5082500000000003,15.134915087890626,3.51648,15.135015087890626,3.5247,15.135115087890625L7.03382,10.953115087890625C7.01167,10.850565087890626,7,10.744105087890624,7,10.634915087890626C7,9.806495087890625,7.67157,9.134915087890626,8.5,9.134915087890626C9.32843,9.134915087890626,10,9.806495087890625,10,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Dm = () => Pm.cloneNode(!0), Nm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M18.8532,7.020985087890625Q19.0257,6.734525087890625,19.0257,6.369945087890625Q19.0257,6.020005087890625,18.8499,5.754705087890625Q18.6758,5.489415087890626,18.3649,5.339675087890625Q18.5944,5.209465087890625,18.7214,4.994615087890625Q18.8499,4.779775087890625,18.8499,4.5193550878906255Q18.8499,4.2003480878906245,18.7002,3.951324087890625Q18.5505,3.700673087890625,18.277,3.557444087890625Q18.0052,3.414215087890625,17.6455,3.414215087890625Q17.285800000000002,3.414215087890625,17.0107,3.557444087890625Q16.7357,3.700673087890625,16.5843,3.951324087890625Q16.4346,4.2003480878906245,16.4346,4.5193550878906255Q16.4346,4.779775087890625,16.561500000000002,4.994615087890625Q16.6901,5.209465087890625,16.919600000000003,5.339675087890625Q16.6055,5.489415087890626,16.4297,5.757965087890625Q16.255499999999998,6.024895087890625,16.255499999999998,6.369945087890625Q16.255499999999998,6.734525087890625,16.4297,7.020985087890625Q16.6055,7.305815087890625,16.919600000000003,7.465325087890625Q17.2354,7.624825087890625,17.6455,7.624825087890625Q18.0557,7.624825087890625,18.3682,7.465325087890625Q18.6807,7.305815087890625,18.8532,7.020985087890625ZM8.76432,7.559725087890625L8.13444,7.559725087890625L8.13444,4.214996087890625L7.28971,4.700025087890625L7.2946,4.070139087890625L8.310220000000001,3.479319087890625L8.76432,3.479319087890625L8.76432,7.559725087890625ZM17.1816,4.955555087890625Q17.0042,4.784655087890625,17.0042,4.5095950878906255Q17.0042,4.229645087890625,17.18,4.057119087890625Q17.355800000000002,3.884592087890625,17.6455,3.884592087890625Q17.935200000000002,3.884592087890625,18.1077,4.057119087890625Q18.2803,4.229645087890625,18.2803,4.5095950878906255Q18.2803,4.784655087890625,18.1045,4.955555087890625Q17.930300000000003,5.124825087890625,17.6455,5.124825087890625Q17.3607,5.124825087890625,17.1816,4.955555087890625ZM18.2217,5.7953950878906255Q18.4398,6.005365087890625,18.4398,6.3552950878906245Q18.4398,6.705235087890625,18.2217,6.915195087890625Q18.0052,7.125155087890625,17.6455,7.125155087890625Q17.285800000000002,7.125155087890625,17.067700000000002,6.915195087890625Q16.849600000000002,6.705235087890625,16.849600000000002,6.3552950878906245Q16.849600000000002,6.005365087890625,17.064500000000002,5.7953950878906255Q17.2793,5.585435087890625,17.6455,5.585435087890625Q18.0052,5.585435087890625,18.2217,5.7953950878906255ZM9.60768,11.711495087890626C9.85136,11.444785087890626,10,11.089765087890626,10,10.700025087890625C10,9.871595087890626,9.32843,9.200025087890625,8.5,9.200025087890625C7.67157,9.200025087890625,7,9.871595087890626,7,10.700025087890625C7,10.809205087890625,7.01167,10.915665087890625,7.03382,11.018215087890624L3.5247,15.200215087890625C3.51648,15.200115087890625,3.5082500000000003,15.200015087890625,3.5,15.200015087890625C2.671573,15.200015087890625,2,15.871615087890625,2,16.700015087890627C2,17.528415087890625,2.671573,18.200015087890627,3.5,18.200015087890627C4.32843,18.200015087890627,5,17.528415087890625,5,16.700015087890627C5,16.258515087890625,4.80921,15.861515087890625,4.50558,15.587015087890626L7.59952,11.899765087890625C7.8503,12.088295087890625,8.162099999999999,12.200025087890625,8.5,12.200025087890625C8.57314,12.200025087890625,8.645050000000001,12.194785087890626,8.71539,12.184675087890625L11.3216,15.771815087890625C11.12019,16.027215087890625,11,16.349515087890623,11,16.700015087890627C11,17.528415087890625,11.67157,18.200015087890627,12.5,18.200015087890627C13.3284,18.200015087890627,14,17.528415087890625,14,16.700015087890627C14,16.336015087890623,13.8703,16.002315087890626,13.6547,15.742515087890625L16.781,12.016775087890625C16.994500000000002,12.133605087890626,17.2395,12.200025087890625,17.5,12.200025087890625C18.3284,12.200025087890625,19,11.528445087890624,19,10.700025087890625C19,9.871595087890626,18.3284,9.200025087890625,17.5,9.200025087890625C16.671599999999998,9.200025087890625,16,9.871595087890626,16,10.700025087890625C16,10.898765087890624,16.0387,11.088475087890625,16.108800000000002,11.262055087890625L12.7823,15.226515087890625C12.6908,15.209115087890625,12.5965,15.200015087890625,12.5,15.200015087890625C12.3862,15.200015087890625,12.2754,15.212715087890626,12.1689,15.236715087890625L9.60768,11.711495087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Om = () => Nm.cloneNode(!0), Im = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M9.474616630859375,7.494615087890625L8.844736630859375,7.494615087890625L8.844736630859375,4.149892087890625L8.000006630859374,4.634915087890625L8.004896630859374,4.005035087890625L9.020516630859376,3.414215087890625L9.474616630859375,3.414215087890625L9.474616630859375,7.494615087890625ZM18.529296630859378,4.8318550878906255Q18.307996630859375,5.028795087890625,18.122396630859377,5.385245087890625Q17.868496630859376,5.019035087890625,17.629196630859376,4.8269750878906255Q17.389996630859375,4.634915087890625,17.168596630859376,4.634915087890625Q16.794296630859375,4.634915087890625,16.522496630859376,4.976715087890625Q16.252296630859377,5.3168850878906255,16.252296630859377,5.7856350878906255Q16.252296630859377,6.218575087890625,16.502896630859375,6.521315087890625Q16.755196630859373,6.822415087890625,17.114896630859377,6.822415087890625Q17.368796630859375,6.822415087890625,17.588596630859374,6.625475087890624Q17.809896630859377,6.428535087890625,17.998696630859374,6.0688350878906245Q18.249396630859373,6.439935087890625,18.488596630859377,6.631985087890625Q18.727896630859377,6.822415087890625,18.952496630859375,6.822415087890625Q19.326796630859373,6.822415087890625,19.596996630859376,6.482245087890625Q19.868796630859375,6.140455087890626,19.868796630859375,5.671705087890626Q19.868796630859375,5.238755087890625,19.618196630859376,4.937655087890625Q19.367496630859375,4.634915087890625,19.006196630859375,4.634915087890625Q18.750696630859377,4.634915087890625,18.529296630859378,4.8318550878906255ZM18.337296630859377,5.674955087890625L18.278696630859375,5.596835087890625Q18.449596630859375,5.272935087890625,18.622096630859374,5.1101750878906245Q18.794596630859374,4.947415087890625,18.967096630859373,4.947415087890625Q19.194996630859375,4.947415087890625,19.346396630859374,5.1345950878906255Q19.497696630859377,5.320135087890625,19.497696630859377,5.598455087890625Q19.497696630859377,5.8914250878906245,19.360996630859376,6.096505087890625Q19.224296630859374,6.301585087890626,19.027396630859375,6.301585087890626Q18.915096630859374,6.301585087890626,18.742496630859375,6.146965087890624Q18.569996630859375,5.992335087890625,18.337296630859377,5.674955087890625ZM17.785496630859377,5.779125087890625L17.842496630859372,5.857245087890625Q17.668296630859373,6.186025087890625,17.495796630859374,6.348785087890625Q17.324896630859374,6.509915087890625,17.153996630859375,6.509915087890625Q16.926096630859377,6.509915087890625,16.774796630859377,6.324375087890624Q16.623396630859375,6.137195087890625,16.623396630859375,5.858875087890625Q16.623396630859375,5.565905087890625,16.761696630859376,5.360825087890625Q16.900096630859373,5.1557550878906255,17.095396630859376,5.1557550878906255Q17.228896630859374,5.1557550878906255,17.365596630859375,5.2778250878906245Q17.502296630859377,5.399895087890625,17.785496630859377,5.779125087890625ZM10.710296630859375,10.634915087890626C10.710296630859375,11.024655087890626,10.561656630859375,11.379685087890625,10.317976630859375,11.646395087890625L12.879196630859376,15.171615087890626C12.985696630859374,15.147615087890625,13.096496630859376,15.134915087890626,13.210296630859375,15.134915087890626C13.306796630859376,15.134915087890626,13.401096630859374,15.144015087890624,13.492596630859374,15.161415087890624L16.819096630859377,11.196955087890625C16.748996630859374,11.023375087890624,16.710296630859375,10.833655087890625,16.710296630859375,10.634915087890626C16.710296630859375,9.806495087890625,17.381896630859373,9.134915087890626,18.210296630859375,9.134915087890626C19.038696630859373,9.134915087890626,19.710296630859375,9.806495087890625,19.710296630859375,10.634915087890626C19.710296630859375,11.463345087890625,19.038696630859373,12.134915087890626,18.210296630859375,12.134915087890626C17.949796630859375,12.134915087890626,17.704796630859377,12.068505087890625,17.491296630859374,11.951675087890624L14.364996630859375,15.677415087890624C14.580596630859375,15.937215087890625,14.710296630859375,16.270915087890625,14.710296630859375,16.634915087890626C14.710296630859375,17.463315087890624,14.038696630859375,18.134915087890626,13.210296630859375,18.134915087890626C12.381866630859374,18.134915087890626,11.710296630859375,17.463315087890624,11.710296630859375,16.634915087890626C11.710296630859375,16.284415087890626,11.830486630859374,15.962015087890626,12.031896630859375,15.706715087890625L9.425686630859374,12.119565087890624C9.355346630859376,12.129685087890625,9.283436630859375,12.134915087890626,9.210296630859375,12.134915087890626C8.872396630859374,12.134915087890626,8.560596630859376,12.023195087890626,8.309816630859375,11.834665087890626L5.215876630859375,15.521915087890624C5.519506630859375,15.796415087890624,5.710296630859375,16.193415087890624,5.710296630859375,16.634915087890626C5.710296630859375,17.463315087890624,5.038726630859375,18.134915087890626,4.210296630859375,18.134915087890626C3.381869630859375,18.134915087890626,2.710296630859375,17.463315087890624,2.710296630859375,16.634915087890626C2.710296630859375,15.806515087890626,3.381869630859375,15.134915087890626,4.210296630859375,15.134915087890626C4.218546630859375,15.134915087890626,4.226776630859375,15.135015087890626,4.234996630859375,15.135115087890625L7.744116630859375,10.953115087890625C7.721966630859375,10.850565087890626,7.710296630859375,10.744105087890624,7.710296630859375,10.634915087890626C7.710296630859375,9.806495087890625,8.381866630859374,9.134915087890626,9.210296630859375,9.134915087890626C10.038726630859376,9.134915087890626,10.710296630859375,9.806495087890625,10.710296630859375,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Em = () => Im.cloneNode(!0), Bm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M21,5.5C21,6.32843,20.3284,7,19.5,7C19.4136,7,19.3289,6.99269,19.2465,6.97866L15.6257,15.5086C15.8587,15.7729,16,16.119999999999997,16,16.5C16,17.328400000000002,15.3284,18,14.5,18C13.8469,18,13.2913,17.5826,13.0854,17L3.91465,17C3.70873,17.5826,3.15311,18,2.5,18C1.671573,18,1,17.328400000000002,1,16.5C1,15.6716,1.671573,15,2.5,15C2.5840199999999998,15,2.66643,15.0069,2.74668,15.0202L6.36934,6.48574C6.13933,6.22213,6,5.87733,6,5.5C6,4.671573,6.67157,4,7.5,4C8.15311,4,8.70873,4.417404,8.91465,5L18.0854,5C18.2913,4.417404,18.8469,4,19.5,4C20.3284,4,21,4.671573,21,5.5ZM18.0854,6L8.91465,6C8.892579999999999,6.06243,8.8665,6.12296,8.83672,6.18128L13.9814,15.0921C14.143,15.0325,14.3177,15,14.5,15C14.584,15,14.6664,15.0069,14.7467,15.0202L18.3693,6.48574C18.2462,6.3446,18.149,6.1802,18.0854,6ZM13.2036,15.745L8.0861,6.8811800000000005C7.90605,6.95768,7.70797,7,7.5,7C7.41359,7,7.32888,6.99269,7.24647,6.97866L3.62571,15.5086C3.7512,15.651,3.8501,15.8174,3.91465,16L13.0854,16C13.1169,15.9108,13.1566,15.8255,13.2036,15.745Z" stroke-opacity="0" stroke="none"></path></svg>'), Fm = () => Bm.cloneNode(!0), Um = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.92159,5.93994C6.04014,5.90529,6.152620000000001,5.85639,6.25704,5.79523L9.12729,9.89437C9.045449999999999,10.07959,9,10.28449,9,10.5C9,10.79522,9.08529,11.07053,9.232569999999999,11.30262L4.97573,16.7511L5.92159,5.93994ZM4.92259,5.8848400000000005C4.38078,5.658659999999999,4,5.1238,4,4.5C4,3.671573,4.67157,3,5.5,3C6.2157,3,6.81433,3.50124,6.96399,4.17183L15.1309,4.88634C15.3654,4.36387,15.8902,4,16.5,4C17.328400000000002,4,18,4.67157,18,5.5C18,6.08983,17.659599999999998,6.60015,17.1645,6.84518L18.4264,14.0018C18.4508,14.0006,18.4753,14,18.5,14C19.3284,14,20,14.6716,20,15.5C20,16.328400000000002,19.3284,17,18.5,17C17.932499999999997,17,17.4386,16.6849,17.183799999999998,16.22L5.99686,18.5979C5.946429999999999,19.3807,5.29554,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.869300000000003,3.389292,17.3295,3.94071,17.1077L4.92259,5.8848400000000005ZM5.72452,17.6334C5.69799,17.596,5.6698,17.5599,5.64004,17.525100000000002L10.01843,11.92103C10.16958,11.97223,10.33155,12,10.5,12C10.80059,12,11.08052,11.91158,11.31522,11.75934L17.0606,15.0765C17.0457,15.1271,17.0335,15.1789,17.023899999999998,15.2317L5.72452,17.6334ZM11.92855,10.95875L17.4349,14.1379L16.1699,6.96356C15.9874,6.92257,15.8174,6.8483,15.6667,6.74746L11.99771,10.4165C11.99923,10.44414,12,10.47198,12,10.5C12,10.66,11.97495,10.814160000000001,11.92855,10.95875ZM10.5,9C10.259830000000001,9,10.03285,9.05644,9.83159,9.15679L7.04919,5.1831L15.0493,5.88302C15.054,5.90072,15.059,5.91829,15.0643,5.9357299999999995L11.56066,9.43934C11.28921,9.16789,10.91421,9,10.5,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), zm = () => Um.cloneNode(!0), Vm = /* @__PURE__ */ $('<svg viewBox="0 0 22 22"><path d="M4.727219638671875,8.007996215820313L9.973849638671876,2.7629472158203123C10.167279638671875,2.5696791158203123,10.480729638671875,2.5696791158203123,10.674169638671875,2.7629472158203123L13.223329638671874,5.311756215820313C13.416929638671874,5.505236215820313,13.416929638671874,5.8189862158203125,13.223329638671874,6.012466215820313L7.977129638671875,11.257906215820313C7.379859638671875,11.855176215820313,7.407609638671875,12.909396215820312,8.033809638671876,13.535596215820313C8.660409638671876,14.162596215820313,9.713849638671874,14.189996215820312,10.311129638671876,13.591896215820313L15.556929638671875,8.346066215820311C15.750429638671875,8.152526215820313,16.064229638671875,8.152526215820313,16.257629638671872,8.346066215820311L18.806529638671876,10.895266215820312C19.000029638671876,11.088746215820313,19.000029638671876,11.402496215820312,18.806529638671876,11.595976215820313L13.560629638671875,16.841796215820313C11.165619638671876,19.237196215820312,7.197149638671875,19.19919621582031,4.783499638671875,16.785496215820313C2.3698426386718747,14.371896215820312,2.331397638671875,10.403416215820313,4.727219638671875,8.007996215820313ZM12.172299638671875,5.662106215820312L10.323809638671875,3.8136162158203124L5.4287196386718755,8.709096215820313C3.422893638671875,10.714536215820312,3.4549956386718748,14.055196215820313,5.484999638671875,16.08479621582031C7.514609638671875,18.114796215820313,10.855289638671875,18.146496215820314,12.860719638671876,16.141096215820312L15.465629638671874,13.535796215820312L14.090929638671875,12.160756215820312L14.791629638671875,11.460436215820312L16.166229638671876,12.834996215820313L17.755829638671877,11.245226215820313L15.907729638671874,9.396736215820312L11.011839638671875,14.292596215820312C10.042809638671875,15.262396215820312,8.418249638671874,15.243796215820312,7.406019638671875,14.306496215820312L7.333099638671875,14.236296215820312C6.327599638671876,13.230796215820313,6.284009638671876,11.550396215820312,7.276419638671875,10.557586215820312L9.882199638671874,7.952026215820313L8.501079638671875,6.570906215820313L9.201789638671876,5.870186215820313L10.582939638671874,7.251336215820312L12.172299638671875,5.662106215820312Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Rm = (e) => (() => {
  const t = Vm.cloneNode(!0);
  return Ne(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), Km = /* @__PURE__ */ $('<svg viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_615"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_615)"><path d="M19.672,3.0673368C19.4417,2.9354008,19.1463,3.00292252,18.9994,3.2210900000000002L17.4588,5.50622L16.743299999999998,3.781253L13.9915,7.4662L13.9618,7.51108C13.8339,7.72862,13.8936,8.005659999999999,14.1004,8.15391L14.1462,8.183430000000001C14.3683,8.308720000000001,14.6511,8.25001,14.8022,8.047229999999999L16.4907,5.78571L17.246299999999998,7.60713L19.8374,3.7635389999999997L19.8651,3.717088C19.9871,3.484615,19.9023,3.199273,19.672,3.0673368ZM4.79974,8.462530000000001L10.117740000000001,3.252975C10.31381,3.0610145,10.63152,3.0610145,10.82759,3.252975L13.4115,5.78453C13.6076,5.976710000000001,13.6076,6.28833,13.4115,6.4805L8.093869999999999,11.69045C7.48847,12.28368,7.51659,13.3308,8.151309999999999,13.9528C8.786439999999999,14.5755,9.85421,14.6027,10.45961,14.0087L15.7768,8.79831C15.9729,8.60609,16.2909,8.60609,16.487099999999998,8.79831L19.0705,11.33026C19.2667,11.52244,19.2667,11.83406,19.0705,12.02623L13.7533,17.2366C11.32572,19.6158,7.30328,19.578,4.85679,17.1807C2.410298,14.7834,2.371331,10.84174,4.79974,8.462530000000001ZM12.3461,6.1325199999999995L10.47246,4.29654L5.51079,9.15889C3.477674,11.15076,3.510214,14.4688,5.56784,16.4847C7.62506,18.500999999999998,11.01117,18.5325,13.0439,16.540599999999998L15.6842,13.9529L14.2908,12.58718L15.0011,11.89161L16.394399999999997,13.2569L18.0056,11.67786L16.1323,9.84188L11.16985,14.7046C10.18764,15.6679,8.540980000000001,15.6494,7.51498,14.7184L7.44107,14.6487C6.4219,13.65,6.37771,11.98096,7.38362,10.994869999999999L10.02485,8.40693L8.624939999999999,7.03516L9.335180000000001,6.33919L10.73512,7.71099L12.3461,6.1325199999999995Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), jm = (e) => (() => {
  const t = Km.cloneNode(!0);
  return Ne(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), Qm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,17C5.80945,17,3.667717,12.85,3.113386,11.575C2.9622047,11.2,2.9622047,10.8,3.113386,10.425C3.667717,9.15,5.80945,5,11,5C16.165399999999998,5,18.3323,9.15,18.8866,10.425C19.0378,10.8,19.0378,11.2,18.8866,11.575C18.3323,12.85,16.165399999999998,17,11,17ZM4.04567,10.8C3.995276,10.925,3.995276,11.05,4.04567,11.175C4.52441,12.325,6.43937,16,11,16C15.5606,16,17.4756,12.325,17.9543,11.2C18.0047,11.075,18.0047,10.95,17.9543,10.825C17.4756,9.675,15.5606,6,11,6C6.43937,6,4.52441,9.675,4.04567,10.8ZM11,13.5C9.61417,13.5,8.480319999999999,12.375,8.480319999999999,11C8.480319999999999,9.625,9.61417,8.5,11,8.5C12.38583,8.5,13.5197,9.625,13.5197,11C13.5197,12.375,12.38583,13.5,11,13.5ZM11,9.5C10.1685,9.5,9.48819,10.175,9.48819,11C9.48819,11.825,10.1685,12.5,11,12.5C11.8315,12.5,12.51181,11.825,12.51181,11C12.51181,10.175,11.8315,9.5,11,9.5Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), Zm = () => Qm.cloneNode(!0), Hm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.80417,14.9887L4.62563,16.167299999999997C4.43037,16.3625,4.43037,16.6791,4.62563,16.8744C4.82089,17.0696,5.13748,17.0696,5.332739999999999,16.8744L6.62638,15.5807C7.75595,16.290100000000002,9.19328,16.7929,11,16.7929C16.165399999999998,16.7929,18.3323,12.64289,18.8866,11.36789C19.0378,10.99289,19.0378,10.59289,18.8866,10.21789C18.5549,9.45486,17.6456,7.66212,15.8617,6.34545L17.3536,4.853553C17.5488,4.658291,17.5488,4.341709,17.3536,4.146447C17.1583,3.9511845,16.8417,3.9511845,16.6464,4.146447L15.0014,5.7915399999999995C13.9314,5.1969,12.61166,4.792893,11,4.792893C5.80945,4.792893,3.667717,8.94289,3.113386,10.21789C2.9622049,10.59289,2.9622049,10.99289,3.113386,11.36789C3.424435,12.08333,4.2353000000000005,13.70399,5.80417,14.9887ZM7.36012,14.847C8.32327,15.4074,9.52286,15.7929,11,15.7929C15.5606,15.7929,17.4756,12.11789,17.9543,10.99289C18.0047,10.86789,18.0047,10.74289,17.9543,10.61789C17.659,9.90846,16.8171,8.23812,15.1447,7.06241L12.96929,9.23782C13.3134,9.66543,13.5197,10.20642,13.5197,10.79289C13.5197,12.16789,12.38583,13.29289,11,13.29289C10.41596,13.29289,9.87667,13.09308,9.44815,12.75896L7.36012,14.847ZM8.794609999999999,11.99829L6.520099999999999,14.2728C5.06905,13.12119,4.32057,11.628250000000001,4.04567,10.96789C3.995275,10.84289,3.995275,10.71789,4.04567,10.59289C4.52441,9.46789,6.43937,5.79289,11,5.79289C12.28868,5.79289,13.3661,6.086320000000001,14.2596,6.53329L12.19759,8.5953C11.84086,8.40257,11.43271,8.29289,11,8.29289C9.61417,8.29289,8.480319999999999,9.41789,8.480319999999999,10.79289C8.480319999999999,11.22918,8.594470000000001,11.64029,8.794609999999999,11.99829ZM10.16528,12.04183C10.404869999999999,12.20032,10.692070000000001,12.29289,11,12.29289C11.8315,12.29289,12.51181,11.61789,12.51181,10.79289C12.51181,10.48318,12.41593,10.194600000000001,12.25216,9.95494L10.16528,12.04183ZM11.43602,9.35687L9.55616,11.236740000000001C9.512,11.09633,9.48819,10.94724,9.48819,10.79289C9.48819,9.96789,10.1685,9.29289,11,9.29289C11.15142,9.29289,11.29782,9.31528,11.43602,9.35687Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Ym = () => Hm.cloneNode(!0), Wm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_625"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_625)"><path d="M14.5385,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807692,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.88462,4,14.5385,5.61538,14.5385,7.576919999999999L14.5385,9.76923ZM10.88461,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923L13.38462,9.76923L13.38462,7.576919999999999C13.38462,6.23077,12.26923,5.15385,10.88461,5.15385ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.038450000000001,12.07692,11.307680000000001,12.34615,11.307680000000001,12.65385L11.307680000000001,14.5769C11.307680000000001,14.8846,11.038450000000001,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), qm = () => Wm.cloneNode(!0), Gm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_620"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_620)"><path d="M8.38461,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807693,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.46154,4,13.84615,4.961539,14.3462,6.423080000000001C14.4615,6.73077,14.3077,7.038460000000001,14,7.15385C13.69231,7.26923,13.38461,7.11538,13.26923,6.80769C12.92308,5.80769,11.96154,5.15385,10.88462,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.03846,12.07692,11.307690000000001,12.34615,11.307690000000001,12.65385L11.307690000000001,14.5769C11.307690000000001,14.8846,11.03846,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), Xm = () => Gm.cloneNode(!0), Jm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M16.966900000000003,8.67144C16.6669,8.67144,16.4247,8.91558,16.4247,9.21802L16.4247,16.631500000000003C16.4247,17.322,16.007199999999997,17.9068,15.5139,17.9068L13.93072,17.9068L13.93072,9.2162C13.93072,8.91741,13.68675,8.67144,13.38855,8.67144C13.09036,8.67144,12.84639,8.91741,12.84639,9.21802L12.84639,17.9068L10.151810000000001,17.9068L10.151810000000001,9.21802C10.151810000000001,8.91741,9.90783,8.67144,9.609639999999999,8.67144C9.31145,8.67144,9.06747,8.91741,9.06747,9.219850000000001L9.06747,17.9068L7.48614,17.9068C6.99277,17.9068,6.5753,17.322,6.5753,16.631500000000003L6.5753,9.21802C6.5753,8.91558,6.333130000000001,8.67144,6.03313,8.67144C5.73313,8.67144,5.49096,8.91558,5.49096,9.21802L5.49096,16.631500000000003C5.49096,17.9378,6.385540000000001,19,7.48614,19L15.512,19C16.6127,19,17.509,17.9378,17.509,16.631500000000003L17.509,9.21802C17.509,8.91558,17.2669,8.67144,16.966900000000003,8.67144ZM18.4578,6.21183L4.542169,6.21183C4.243976,6.21183,4,6.45779,4,6.75841C4,7.05903,4.243976,7.30499,4.542169,7.30499L18.4578,7.30499C18.756,7.30499,19,7.05903,19,6.75841C19,6.45779,18.756,6.21183,18.4578,6.21183ZM8.68072,5.10045L14.3193,5.10045C14.6175,5.10045,14.8614,4.852666,14.8614,4.550225C14.8614,4.247783,14.6175,4,14.3193,4L8.68072,4C8.38253,4,8.13855,4.247783,8.13855,4.550225C8.13855,4.852666,8.38253,5.10045,8.68072,5.10045Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), eg = () => Jm.cloneNode(!0), tg = {
  horizontalStraightLine: Ef,
  horizontalRayLine: Ff,
  horizontalSegment: zf,
  verticalStraightLine: Rf,
  verticalRayLine: jf,
  verticalSegment: Zf,
  straightLine: Yf,
  rayLine: qf,
  segment: Xf,
  arrow: em,
  priceLine: nm,
  priceChannelLine: om,
  parallelStraightLine: am,
  fibonacciLine: lm,
  fibonacciSegment: um,
  fibonacciCircle: hm,
  fibonacciSpiral: mm,
  fibonacciSpeedResistanceFan: ym,
  fibonacciExtension: pm,
  gannBox: bm,
  circle: _m,
  triangle: xm,
  rect: wm,
  parallelogram: Tm,
  threeWaves: Sm,
  fiveWaves: Dm,
  eightWaves: Om,
  anyWaves: Em,
  abcd: Fm,
  xabcd: zm,
  weak_magnet: Rm,
  strong_magnet: jm,
  lock: qm,
  unlock: Xm,
  visible: Zm,
  invisible: Ym,
  remove: eg
};
function ng(e) {
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
function rg(e) {
  return [
    { key: "priceChannelLine", text: d("price_channel_line", e) },
    { key: "parallelStraightLine", text: d("parallel_straight_line", e) }
  ];
}
function og(e) {
  return [
    { key: "circle", text: d("circle", e) },
    { key: "rect", text: d("rect", e) },
    { key: "parallelogram", text: d("parallelogram", e) },
    { key: "triangle", text: d("triangle", e) }
  ];
}
function ig(e) {
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
function ag(e) {
  return [
    { key: "xabcd", text: d("xabcd", e) },
    { key: "abcd", text: d("abcd", e) },
    { key: "threeWaves", text: d("three_waves", e) },
    { key: "fiveWaves", text: d("five_waves", e) },
    { key: "eightWaves", text: d("eight_waves", e) },
    { key: "anyWaves", text: d("any_waves", e) }
  ];
}
function sg(e) {
  return [
    { key: "weak_magnet", text: d("weak_magnet", e) },
    { key: "strong_magnet", text: d("strong_magnet", e) }
  ];
}
const Xe = (e) => tg[e.name](e.class), lg = /* @__PURE__ */ $('<div class="klinecharts-pro-drawing-bar"><span class="split-line"></span><div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div><div class="item"><span style="width:32px;height:32px"></span></div><div class="item"><span style="width:32px;height:32px"></span></div><span class="split-line"></span><div class="item"><span style="width:32px;height:32px"></span></div></div>'), cg = /* @__PURE__ */ $('<div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div>'), $0 = /* @__PURE__ */ $('<li><span style="padding-left:8px"></span></li>'), ug = "drawing_tools", dg = (e) => {
  const [t, r] = T("horizontalStraightLine"), [n, a] = T("priceChannelLine"), [c, f] = T("circle"), [h, v] = T("fibonacciLine"), [L, b] = T("xabcd"), [w, E] = T("weak_magnet"), [P, oe] = T("normal"), [V, R] = T(!1), [U, he] = T(!0), [Z, re] = T(""), G = (K) => {
    re((J) => J === K ? "" : K);
  }, ve = Y(() => [{
    key: "singleLine",
    icon: t(),
    list: ng(e.locale),
    setter: r
  }, {
    key: "moreLine",
    icon: n(),
    list: rg(e.locale),
    setter: a
  }, {
    key: "polygon",
    icon: c(),
    list: og(e.locale),
    setter: f
  }, {
    key: "fibonacci",
    icon: h(),
    list: ig(e.locale),
    setter: v
  }, {
    key: "wave",
    icon: L(),
    list: ag(e.locale),
    setter: b
  }]), W = Y(() => sg(e.locale));
  return (() => {
    const K = lg.cloneNode(!0), J = K.firstChild, se = J.nextSibling, M = se.firstChild, j = M.nextSibling, Q = j.firstChild, F = se.nextSibling, le = F.firstChild, ce = F.nextSibling, ee = ce.firstChild, B = ce.nextSibling, ne = B.nextSibling, H = ne.firstChild;
    return C(K, () => ve().map((O) => (() => {
      const I = cg.cloneNode(!0), ye = I.firstChild, $e = ye.nextSibling, ge = $e.firstChild;
      return I.addEventListener("blur", () => {
        re("");
      }), I.$$click = () => {
        G(O.key);
      }, C(ye, A(Xe, {
        get name() {
          return O.icon;
        }
      })), C(I, (() => {
        const We = Y(() => O.key === Z());
        return () => We() && A(bn, {
          class: "list",
          get children() {
            return O.list.map((k) => (() => {
              const Ce = $0.cloneNode(!0), Ae = Ce.firstChild;
              return Ce.$$click = (Je) => {
                Je.stopPropagation(), O.setter(k.key), e.onDrawingItemClick({
                  name: k.key,
                  lock: V(),
                  mode: P()
                }), re("");
              }, C(Ce, A(Xe, {
                get name() {
                  return k.key;
                }
              }), Ae), C(Ae, () => k.text), Ce;
            })());
          }
        });
      })(), null), z(() => Ne(ge, "class", O.key === Z() ? "rotate" : "")), I;
    })()), J), se.addEventListener("blur", () => {
      re("");
    }), se.$$click = () => {
      G("mode");
    }, C(M, (() => {
      const O = Y(() => w() === "weak_magnet");
      return () => O() ? (() => {
        const I = Y(() => P() === "weak_magnet");
        return () => I() ? A(Xe, {
          name: "weak_magnet",
          class: "selected"
        }) : A(Xe, {
          name: "weak_magnet"
        });
      })() : (() => {
        const I = Y(() => P() === "strong_magnet");
        return () => I() ? A(Xe, {
          name: "strong_magnet",
          class: "selected"
        }) : A(Xe, {
          name: "strong_magnet"
        });
      })();
    })()), C(se, (() => {
      const O = Y(() => Z() === "mode");
      return () => O() && A(bn, {
        class: "list",
        get children() {
          return W().map((I) => (() => {
            const ye = $0.cloneNode(!0), $e = ye.firstChild;
            return ye.$$click = (ge) => {
              ge.stopPropagation(), E(I.key), oe(I.key), e.onModeChange(I.key), re("");
            }, C(ye, A(Xe, {
              get name() {
                return I.key;
              }
            }), $e), C($e, () => I.text), ye;
          })());
        }
      });
    })(), null), le.$$click = () => {
      const O = !V();
      R(O), e.onLockChange(O);
    }, C(le, (() => {
      const O = Y(() => !!V());
      return () => O() ? A(Xe, {
        name: "lock"
      }) : A(Xe, {
        name: "unlock"
      });
    })()), ee.$$click = () => {
      const O = !U();
      he(O), e.onVisibleChange(O);
    }, C(ee, (() => {
      const O = Y(() => !!U());
      return () => O() ? A(Xe, {
        name: "visible"
      }) : A(Xe, {
        name: "invisible"
      });
    })()), H.$$click = () => {
      e.onRemoveClick(ug);
    }, C(H, A(Xe, {
      name: "remove"
    })), z(() => Ne(Q, "class", Z() === "mode" ? "rotate" : "")), K;
  })();
};
Ye(["click"]);
const _0 = /* @__PURE__ */ $('<li class="title"></li>'), k0 = /* @__PURE__ */ $('<li class="row"></li>'), hg = (e) => A(At, {
  get title() {
    return d("indicator", e.locale);
  },
  width: 400,
  get onClose() {
    return e.onClose;
  },
  get children() {
    return A(bn, {
      class: "klinecharts-pro-indicator-modal-list",
      get children() {
        return [(() => {
          const t = _0.cloneNode(!0);
          return C(t, () => d("main_indicator", e.locale)), t;
        })(), Y(() => ["MA", "EMA", "SMA", "BOLL", "SAR", "BBI"].map((t) => {
          const r = e.mainIndicators.includes(t);
          return (() => {
            const n = k0.cloneNode(!0);
            return n.$$click = (a) => {
              e.onMainIndicatorChange({
                name: t,
                paneId: "candle_pane",
                added: !r
              });
            }, C(n, A(C0, {
              checked: r,
              get label() {
                return d(t.toLowerCase(), e.locale);
              }
            })), n;
          })();
        })), (() => {
          const t = _0.cloneNode(!0);
          return C(t, () => d("sub_indicator", e.locale)), t;
        })(), Y(() => ["MA", "EMA", "VOL", "MACD", "BOLL", "KDJ", "RSI", "BIAS", "BRAR", "CCI", "DMI", "CR", "PSY", "DMA", "TRIX", "OBV", "VR", "WR", "MTM", "EMV", "SAR", "SMA", "ROC", "PVT", "BBI", "AO"].map((t) => {
          const r = t in e.subIndicators;
          return (() => {
            const n = k0.cloneNode(!0);
            return n.$$click = (a) => {
              e.onSubIndicatorChange({
                name: t,
                paneId: e.subIndicators[t] ?? "",
                added: !r
              });
            }, C(n, A(C0, {
              checked: r,
              get label() {
                return d(t.toLowerCase(), e.locale);
              }
            })), n;
          })();
        }))];
      }
    });
  }
});
Ye(["click"]);
function x0(e, t) {
  switch (e) {
    case "Etc/UTC":
      return d("utc", t);
    case "Pacific/Midway":
      return d("midway", t);
    case "Pacific/Honolulu":
      return d("honolulu", t);
    case "America/Anchorage":
      return d("anchorage", t);
    case "America/Juneau":
      return d("juneau", t);
    case "America/Los_Angeles":
      return d("los_angeles", t);
    case "America/Vancouver":
      return d("vancouver", t);
    case "America/Tijuana":
      return d("tijuana", t);
    case "America/Phoenix":
      return d("phoenix", t);
    case "America/Denver":
      return d("denver", t);
    case "America/Chicago":
      return d("chicago", t);
    case "America/Mexico_City":
      return d("mexico_city", t);
    case "America/Guatemala":
      return d("guatemala", t);
    case "America/New_York":
      return d("new_york", t);
    case "America/Toronto":
      return d("toronto", t);
    case "America/Bogota":
      return d("bogota", t);
    case "America/Lima":
      return d("lima", t);
    case "America/Caracas":
      return d("caracas", t);
    case "America/Halifax":
      return d("halifax", t);
    case "America/Santiago":
      return d("santiago", t);
    case "America/La_Paz":
      return d("la_paz", t);
    case "America/Sao_Paulo":
      return d("sao_paulo", t);
    case "America/Buenos_Aires":
      return d("buenos_aires", t);
    case "America/Montevideo":
      return d("montevideo", t);
    case "America/Godthab":
      return d("godthab", t);
    case "Atlantic/Azores":
      return d("azores", t);
    case "Atlantic/Cape_Verde":
      return d("cape_verde", t);
    case "Europe/London":
      return d("london", t);
    case "Europe/Dublin":
      return d("dublin", t);
    case "Europe/Lisbon":
      return d("lisbon", t);
    case "Africa/Casablanca":
      return d("casablanca", t);
    case "Europe/Paris":
      return d("paris", t);
    case "Europe/Berlin":
      return d("berlin", t);
    case "Europe/Amsterdam":
      return d("amsterdam", t);
    case "Europe/Brussels":
      return d("brussels", t);
    case "Europe/Madrid":
      return d("madrid", t);
    case "Europe/Rome":
      return d("rome", t);
    case "Europe/Vienna":
      return d("vienna", t);
    case "Europe/Warsaw":
      return d("warsaw", t);
    case "Africa/Lagos":
      return d("lagos", t);
    case "Europe/Athens":
      return d("athens", t);
    case "Europe/Bucharest":
      return d("bucharest", t);
    case "Europe/Helsinki":
      return d("helsinki", t);
    case "Europe/Istanbul":
      return d("istanbul", t);
    case "Europe/Kiev":
      return d("kiev", t);
    case "Africa/Cairo":
      return d("cairo", t);
    case "Africa/Johannesburg":
      return d("johannesburg", t);
    case "Asia/Jerusalem":
      return d("jerusalem", t);
    case "Europe/Moscow":
      return d("moscow", t);
    case "Asia/Baghdad":
      return d("baghdad", t);
    case "Asia/Kuwait":
      return d("kuwait", t);
    case "Asia/Riyadh":
      return d("riyadh", t);
    case "Asia/Bahrain":
      return d("bahrain", t);
    case "Africa/Nairobi":
      return d("nairobi", t);
    case "Asia/Tehran":
      return d("tehran", t);
    case "Asia/Dubai":
      return d("dubai", t);
    case "Asia/Muscat":
      return d("muscat", t);
    case "Asia/Baku":
      return d("baku", t);
    case "Asia/Kabul":
      return d("kabul", t);
    case "Asia/Karachi":
      return d("karachi", t);
    case "Asia/Tashkent":
      return d("tashkent", t);
    case "Asia/Ashkhabad":
      return d("ashkhabad", t);
    case "Asia/Kolkata":
      return d("kolkata", t);
    case "Asia/Mumbai":
      return d("mumbai", t);
    case "Asia/Colombo":
      return d("colombo", t);
    case "Asia/Kathmandu":
      return d("kathmandu", t);
    case "Asia/Dhaka":
      return d("dhaka", t);
    case "Asia/Almaty":
      return d("almaty", t);
    case "Asia/Yangon":
      return d("yangon", t);
    case "Asia/Bangkok":
      return d("bangkok", t);
    case "Asia/Jakarta":
      return d("jakarta", t);
    case "Asia/Ho_Chi_Minh":
      return d("ho_chi_minh", t);
    case "Asia/Shanghai":
      return d("shanghai", t);
    case "Asia/Hong_Kong":
      return d("hong_kong", t);
    case "Asia/Singapore":
      return d("singapore", t);
    case "Asia/Taipei":
      return d("taipei", t);
    case "Asia/Manila":
      return d("manila", t);
    case "Asia/Kuala_Lumpur":
      return d("kuala_lumpur", t);
    case "Australia/Perth":
      return d("perth", t);
    case "Asia/Tokyo":
      return d("tokyo", t);
    case "Asia/Seoul":
      return d("seoul", t);
    case "Asia/Pyongyang":
      return d("pyongyang", t);
    case "Australia/Adelaide":
      return d("adelaide", t);
    case "Australia/Darwin":
      return d("darwin", t);
    case "Australia/Brisbane":
      return d("brisbane", t);
    case "Australia/Sydney":
      return d("sydney", t);
    case "Australia/Melbourne":
      return d("melbourne", t);
    case "Pacific/Guam":
      return d("guam", t);
    case "Pacific/Port_Moresby":
      return d("port_moresby", t);
    case "Pacific/Norfolk":
      return d("norfolk", t);
    case "Pacific/Guadalcanal":
      return d("guadalcanal", t);
    case "Pacific/Auckland":
      return d("auckland", t);
    case "Pacific/Fiji":
      return d("fiji", t);
    case "Pacific/Tongatapu":
      return d("tongatapu", t);
    case "Pacific/Apia":
      return d("apia", t);
    case "Asia/Karachi":
      return d("karachi", t);
  }
  return e;
}
function fg(e) {
  return [
    // UTC
    { key: "Etc/UTC", text: `(UTC+0:00) ${d("utc", e)}` },
    // Pacific (UTC-12 to UTC-8)
    { key: "Pacific/Midway", text: `(UTC-11:00) ${d("midway", e)}` },
    { key: "Pacific/Honolulu", text: `(UTC-10:00) ${d("honolulu", e)}` },
    { key: "America/Anchorage", text: `(UTC-9:00) ${d("anchorage", e)}` },
    { key: "America/Juneau", text: `(UTC-9:00) ${d("juneau", e)}` },
    // North America West (UTC-8 to UTC-7)
    { key: "America/Los_Angeles", text: `(UTC-8:00) ${d("los_angeles", e)}` },
    { key: "America/Vancouver", text: `(UTC-8:00) ${d("vancouver", e)}` },
    { key: "America/Tijuana", text: `(UTC-8:00) ${d("tijuana", e)}` },
    { key: "America/Phoenix", text: `(UTC-7:00) ${d("phoenix", e)}` },
    { key: "America/Denver", text: `(UTC-7:00) ${d("denver", e)}` },
    // North America Central (UTC-6)
    { key: "America/Chicago", text: `(UTC-6:00) ${d("chicago", e)}` },
    { key: "America/Mexico_City", text: `(UTC-6:00) ${d("mexico_city", e)}` },
    { key: "America/Guatemala", text: `(UTC-6:00) ${d("guatemala", e)}` },
    // North America East (UTC-5 to UTC-4)
    { key: "America/New_York", text: `(UTC-5:00) ${d("new_york", e)}` },
    { key: "America/Toronto", text: `(UTC-5:00) ${d("toronto", e)}` },
    { key: "America/Bogota", text: `(UTC-5:00) ${d("bogota", e)}` },
    { key: "America/Lima", text: `(UTC-5:00) ${d("lima", e)}` },
    { key: "America/Caracas", text: `(UTC-4:00) ${d("caracas", e)}` },
    { key: "America/Halifax", text: `(UTC-4:00) ${d("halifax", e)}` },
    // South America (UTC-4 to UTC-3)
    { key: "America/Santiago", text: `(UTC-4:00) ${d("santiago", e)}` },
    { key: "America/La_Paz", text: `(UTC-4:00) ${d("la_paz", e)}` },
    { key: "America/Sao_Paulo", text: `(UTC-3:00) ${d("sao_paulo", e)}` },
    { key: "America/Buenos_Aires", text: `(UTC-3:00) ${d("buenos_aires", e)}` },
    { key: "America/Montevideo", text: `(UTC-3:00) ${d("montevideo", e)}` },
    // Atlantic (UTC-3 to UTC-1)
    { key: "America/Godthab", text: `(UTC-3:00) ${d("godthab", e)}` },
    { key: "Atlantic/Azores", text: `(UTC-1:00) ${d("azores", e)}` },
    { key: "Atlantic/Cape_Verde", text: `(UTC-1:00) ${d("cape_verde", e)}` },
    // Western Europe (UTC+0 to UTC+1)
    { key: "Europe/London", text: `(UTC+0:00) ${d("london", e)}` },
    { key: "Europe/Dublin", text: `(UTC+0:00) ${d("dublin", e)}` },
    { key: "Europe/Lisbon", text: `(UTC+0:00) ${d("lisbon", e)}` },
    { key: "Africa/Casablanca", text: `(UTC+0:00) ${d("casablanca", e)}` },
    { key: "Europe/Paris", text: `(UTC+1:00) ${d("paris", e)}` },
    { key: "Europe/Berlin", text: `(UTC+1:00) ${d("berlin", e)}` },
    { key: "Europe/Amsterdam", text: `(UTC+1:00) ${d("amsterdam", e)}` },
    { key: "Europe/Brussels", text: `(UTC+1:00) ${d("brussels", e)}` },
    { key: "Europe/Madrid", text: `(UTC+1:00) ${d("madrid", e)}` },
    { key: "Europe/Rome", text: `(UTC+1:00) ${d("rome", e)}` },
    { key: "Europe/Vienna", text: `(UTC+1:00) ${d("vienna", e)}` },
    { key: "Europe/Warsaw", text: `(UTC+1:00) ${d("warsaw", e)}` },
    { key: "Africa/Lagos", text: `(UTC+1:00) ${d("lagos", e)}` },
    // Central Europe (UTC+2)
    { key: "Europe/Athens", text: `(UTC+2:00) ${d("athens", e)}` },
    { key: "Europe/Bucharest", text: `(UTC+2:00) ${d("bucharest", e)}` },
    { key: "Europe/Helsinki", text: `(UTC+2:00) ${d("helsinki", e)}` },
    { key: "Europe/Istanbul", text: `(UTC+2:00) ${d("istanbul", e)}` },
    { key: "Europe/Kiev", text: `(UTC+2:00) ${d("kiev", e)}` },
    { key: "Africa/Cairo", text: `(UTC+2:00) ${d("cairo", e)}` },
    { key: "Africa/Johannesburg", text: `(UTC+2:00) ${d("johannesburg", e)}` },
    { key: "Asia/Jerusalem", text: `(UTC+2:00) ${d("jerusalem", e)}` },
    // Eastern Europe / Middle East (UTC+3)
    { key: "Europe/Moscow", text: `(UTC+3:00) ${d("moscow", e)}` },
    { key: "Asia/Baghdad", text: `(UTC+3:00) ${d("baghdad", e)}` },
    { key: "Asia/Kuwait", text: `(UTC+3:00) ${d("kuwait", e)}` },
    { key: "Asia/Riyadh", text: `(UTC+3:00) ${d("riyadh", e)}` },
    { key: "Asia/Bahrain", text: `(UTC+3:00) ${d("bahrain", e)}` },
    { key: "Africa/Nairobi", text: `(UTC+3:00) ${d("nairobi", e)}` },
    // Middle East (UTC+3:30 to UTC+4)
    { key: "Asia/Tehran", text: `(UTC+3:30) ${d("tehran", e)}` },
    { key: "Asia/Dubai", text: `(UTC+4:00) ${d("dubai", e)}` },
    { key: "Asia/Muscat", text: `(UTC+4:00) ${d("muscat", e)}` },
    { key: "Asia/Baku", text: `(UTC+4:00) ${d("baku", e)}` },
    // Central Asia (UTC+4:30 to UTC+5)
    { key: "Asia/Kabul", text: `(UTC+4:30) ${d("kabul", e)}` },
    { key: "Asia/Karachi", text: `(UTC+5:00) ${d("karachi", e)}` },
    { key: "Asia/Tashkent", text: `(UTC+5:00) ${d("tashkent", e)}` },
    { key: "Asia/Ashkhabad", text: `(UTC+5:00) ${d("ashkhabad", e)}` },
    // South Asia (UTC+5:30 to UTC+6)
    { key: "Asia/Kolkata", text: `(UTC+5:30) ${d("kolkata", e)}` },
    { key: "Asia/Mumbai", text: `(UTC+5:30) ${d("mumbai", e)}` },
    { key: "Asia/Colombo", text: `(UTC+5:30) ${d("colombo", e)}` },
    { key: "Asia/Kathmandu", text: `(UTC+5:45) ${d("kathmandu", e)}` },
    { key: "Asia/Dhaka", text: `(UTC+6:00) ${d("dhaka", e)}` },
    { key: "Asia/Almaty", text: `(UTC+6:00) ${d("almaty", e)}` },
    // Southeast Asia (UTC+6:30 to UTC+7)
    { key: "Asia/Yangon", text: `(UTC+6:30) ${d("yangon", e)}` },
    { key: "Asia/Bangkok", text: `(UTC+7:00) ${d("bangkok", e)}` },
    { key: "Asia/Jakarta", text: `(UTC+7:00) ${d("jakarta", e)}` },
    { key: "Asia/Ho_Chi_Minh", text: `(UTC+7:00) ${d("ho_chi_minh", e)}` },
    // East Asia (UTC+8)
    { key: "Asia/Shanghai", text: `(UTC+8:00) ${d("shanghai", e)}` },
    { key: "Asia/Hong_Kong", text: `(UTC+8:00) ${d("hong_kong", e)}` },
    { key: "Asia/Singapore", text: `(UTC+8:00) ${d("singapore", e)}` },
    { key: "Asia/Taipei", text: `(UTC+8:00) ${d("taipei", e)}` },
    { key: "Asia/Manila", text: `(UTC+8:00) ${d("manila", e)}` },
    { key: "Asia/Kuala_Lumpur", text: `(UTC+8:00) ${d("kuala_lumpur", e)}` },
    { key: "Australia/Perth", text: `(UTC+8:00) ${d("perth", e)}` },
    // East Asia (UTC+9)
    { key: "Asia/Tokyo", text: `(UTC+9:00) ${d("tokyo", e)}` },
    { key: "Asia/Seoul", text: `(UTC+9:00) ${d("seoul", e)}` },
    { key: "Asia/Pyongyang", text: `(UTC+9:00) ${d("pyongyang", e)}` },
    // Australia (UTC+9:30 to UTC+10)
    { key: "Australia/Adelaide", text: `(UTC+9:30) ${d("adelaide", e)}` },
    { key: "Australia/Darwin", text: `(UTC+9:30) ${d("darwin", e)}` },
    { key: "Australia/Brisbane", text: `(UTC+10:00) ${d("brisbane", e)}` },
    { key: "Australia/Sydney", text: `(UTC+10:00) ${d("sydney", e)}` },
    { key: "Australia/Melbourne", text: `(UTC+10:00) ${d("melbourne", e)}` },
    { key: "Pacific/Guam", text: `(UTC+10:00) ${d("guam", e)}` },
    // Pacific (UTC+10 to UTC+13)
    { key: "Pacific/Port_Moresby", text: `(UTC+10:00) ${d("port_moresby", e)}` },
    { key: "Pacific/Norfolk", text: `(UTC+11:00) ${d("norfolk", e)}` },
    { key: "Pacific/Guadalcanal", text: `(UTC+11:00) ${d("guadalcanal", e)}` },
    { key: "Pacific/Auckland", text: `(UTC+12:00) ${d("auckland", e)}` },
    { key: "Pacific/Fiji", text: `(UTC+12:00) ${d("fiji", e)}` },
    { key: "Pacific/Tongatapu", text: `(UTC+13:00) ${d("tongatapu", e)}` },
    { key: "Pacific/Apia", text: `(UTC+13:00) ${d("apia", e)}` }
  ];
}
const mg = (e) => {
  const [t, r] = T(e.timezone), n = Y(() => fg(e.locale));
  return A(At, {
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
      return A(ur, {
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
          return d("Search Timezone", e.locale) || "Search timezone...";
        }
      });
    }
  });
};
function L0(e) {
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
const gg = /* @__PURE__ */ $('<div class="chart-style-color-picker"><button type="button" class="chart-style-color-swatch"></button></div>'), yg = /* @__PURE__ */ $('<div class="chart-style-color-popover"><div class="chart-style-color-grid"></div></div>'), Cg = /* @__PURE__ */ $('<button type="button" class="chart-style-palette-color"></button>'), pg = /* @__PURE__ */ $('<div class="chart-style-line-control"><div class="chart-style-width-picker"><button type="button" class="chart-style-size-button"><span></span></button></div></div>'), vg = /* @__PURE__ */ $('<div class="chart-style-width-popover"></div>'), bg = /* @__PURE__ */ $('<button type="button"><span></span></button>'), $g = /* @__PURE__ */ $('<div class="klinecharts-pro-setting-modal-title-tabs"><button type="button"></button><button type="button">Chart Style</button></div>'), _g = /* @__PURE__ */ $('<div class="klinecharts-pro-setting-modal-content"></div>'), kg = /* @__PURE__ */ $('<div class="setting-item"><span class="setting-label"></span><div class="setting-control"></div></div>'), xg = /* @__PURE__ */ $('<div class="klinecharts-pro-chart-style-content"><div class="chart-style-sidebar"><button type="button">Symbol</button><button type="button">Background</button></div><div class="chart-style-panel"><p class="chart-style-note">* Chart Style takes precedence over default chart settings. Click Reset to align with the default theme.</p></div></div>'), Lg = /* @__PURE__ */ $("<h3>Symbol</h3>"), wg = /* @__PURE__ */ $('<div class="chart-style-row"><span>Candle Stick</span><div class="chart-style-color-pair"></div></div>'), Ag = /* @__PURE__ */ $('<div class="chart-style-row"><span>Borders</span><div class="chart-style-color-pair"></div></div>'), Tg = /* @__PURE__ */ $('<div class="chart-style-row"><span>Wick</span><div class="chart-style-color-pair"></div></div>'), Mg = /* @__PURE__ */ $("<h3>Background</h3>"), Sg = /* @__PURE__ */ $('<div class="chart-style-row"><span>Color</span></div>'), Pg = /* @__PURE__ */ $('<div class="chart-style-row"><label class="chart-style-check-row"><input type="checkbox"><span class="chart-style-check-box" aria-hidden="true"></span><span>Vert Grid Lines</span></label></div>'), Dg = /* @__PURE__ */ $('<div class="chart-style-row"><label class="chart-style-check-row"><input type="checkbox"><span class="chart-style-check-box" aria-hidden="true"></span><span>Horz Grid Lines</span></label></div>'), T1 = "chart.backgroundColor", $n = "#171a27", Ng = ["#f6465d", "#f59e0b", "#fcd535", "#2ebd85", "#4098a8", "#22c1dc", "#3861fb", "#7b3fe4", "#ec8aa4", "#f7c56b", "#fff0a3", "#9ed4a4", "#83c7bb", "#8bdce6", "#8bb9f7", "#b7a1dc", "#c9343e", "#e76f20", "#f0b93a", "#3f8d3a", "#236e5a", "#237c88", "#1d3fbf", "#3a209f", "#ffffff", "#cbd5e1", "#9ca3af", "#6b7280", "#374151", "#111827", "#000000"], Og = [{
  key: Re.Solid,
  text: "Solid"
}, {
  key: Re.Dashed,
  text: "Dashed"
}], Ig = [1, 2, 3, 4], w0 = [{
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
  key: T1,
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
}], Ci = (e, t = $n) => {
  const r = N.clone(e), n = N.formatValue(r, "candle.bar.upColor"), a = N.formatValue(r, "candle.bar.downColor"), c = N.formatValue(r, "candle.bar.noChangeColor");
  return Ie(r, "candle.bar.upBorderColor", N.formatValue(r, "candle.bar.upBorderColor", n)), Ie(r, "candle.bar.downBorderColor", N.formatValue(r, "candle.bar.downBorderColor", a)), Ie(r, "candle.bar.noChangeBorderColor", N.formatValue(r, "candle.bar.noChangeBorderColor", c)), Ie(r, "candle.bar.upWickColor", N.formatValue(r, "candle.bar.upWickColor", n)), Ie(r, "candle.bar.downWickColor", N.formatValue(r, "candle.bar.downWickColor", a)), Ie(r, "candle.bar.noChangeWickColor", N.formatValue(r, "candle.bar.noChangeWickColor", c)), Ie(r, "candle.bar.borderUpColor", N.formatValue(r, "candle.bar.borderUpColor", N.formatValue(r, "candle.bar.upBorderColor"))), Ie(r, "candle.bar.borderDownColor", N.formatValue(r, "candle.bar.borderDownColor", N.formatValue(r, "candle.bar.downBorderColor"))), Ie(r, "candle.bar.borderNoChangeColor", N.formatValue(r, "candle.bar.borderNoChangeColor", N.formatValue(r, "candle.bar.noChangeBorderColor"))), Ie(r, "candle.bar.wickUpColor", N.formatValue(r, "candle.bar.wickUpColor", N.formatValue(r, "candle.bar.upWickColor"))), Ie(r, "candle.bar.wickDownColor", N.formatValue(r, "candle.bar.wickDownColor", N.formatValue(r, "candle.bar.downWickColor"))), Ie(r, "candle.bar.wickNoChangeColor", N.formatValue(r, "candle.bar.wickNoChangeColor", N.formatValue(r, "candle.bar.noChangeWickColor"))), Ie(r, T1, t), r;
}, Eg = (e, t, r) => {
  if (t === T1)
    return r ?? $n;
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
  return a ? N.formatValue(e, a) : N.formatValue(e, t, N.formatValue(Ci(e), t));
}, Bg = (e) => {
  const [t, r] = T(e.currentStyles), [n, a] = T(Ci(e.currentStyles, e.currentBackgroundColor ?? $n)), [c, f] = T(L0(e.locale)), [h, v] = T(!1), [L, b] = T("settings"), [w, E] = T("symbol"), [P, oe] = T(null), [V, R] = T(null), U = () => {
    v(window.innerWidth <= 768);
  };
  gr(() => {
    const M = (j) => {
      const Q = j.target;
      Q instanceof Element && (Q.closest(".chart-style-color-picker") || Q.closest(".chart-style-width-picker") || Q.closest(".klinecharts-pro-select") || (oe(null), R(null)));
    };
    U(), window.addEventListener("resize", U), document.addEventListener("mousedown", M), Lt(() => {
      document.removeEventListener("mousedown", M);
    });
  }), Lt(() => {
    window.removeEventListener("resize", U);
  }), He(() => {
    f(L0(e.locale));
  });
  const he = (M, j) => {
    const Q = {};
    Ie(Q, M.key, j);
    const F = N.clone(t());
    Ie(F, M.key, j), r(F), f(c().map((le) => ({
      ...le
    }))), e.onChange(Q);
  }, Z = (M, j) => N.formatValue(n(), M, j), re = (M, j) => {
    const Q = N.clone(n());
    Ie(Q, M, j), a(Q), e.onChange(G(Q));
  }, G = (M) => {
    const j = N.formatValue(M, "candle.bar.upColor"), Q = N.formatValue(M, "candle.bar.downColor"), F = N.formatValue(M, "candle.bar.noChangeColor"), le = N.formatValue(M, "candle.bar.upBorderColor", j), ce = N.formatValue(M, "candle.bar.downBorderColor", Q), ee = N.formatValue(M, "candle.bar.noChangeBorderColor", F), B = N.formatValue(M, "candle.bar.upWickColor", j), ne = N.formatValue(M, "candle.bar.downWickColor", Q), H = N.formatValue(M, "candle.bar.noChangeWickColor", F);
    return {
      chart: {
        backgroundColor: N.formatValue(M, T1, $n)
      },
      candle: {
        type: N.formatValue(M, "candle.type"),
        bar: {
          upColor: j,
          downColor: Q,
          noChangeColor: F,
          upBorderColor: le,
          downBorderColor: ce,
          noChangeBorderColor: ee,
          upWickColor: B,
          downWickColor: ne,
          noChangeWickColor: H,
          borderUpColor: le,
          borderDownColor: ce,
          borderNoChangeColor: ee,
          wickUpColor: B,
          wickDownColor: ne,
          wickNoChangeColor: H
        }
      },
      grid: {
        horizontal: {
          show: !!N.formatValue(M, "grid.horizontal.show"),
          color: N.formatValue(M, "grid.horizontal.color"),
          style: N.formatValue(M, "grid.horizontal.style"),
          size: Number(N.formatValue(M, "grid.horizontal.size", 1)),
          dashedValue: N.formatValue(M, "grid.horizontal.dashedValue", [2, 2])
        },
        vertical: {
          show: !!N.formatValue(M, "grid.vertical.show"),
          color: N.formatValue(M, "grid.vertical.color"),
          style: N.formatValue(M, "grid.vertical.style"),
          size: Number(N.formatValue(M, "grid.vertical.size", 1)),
          dashedValue: N.formatValue(M, "grid.vertical.dashedValue", [2, 2])
        }
      }
    };
  }, ve = () => {
    var j;
    const M = G(n());
    r(N.clone(n())), e.onChange(M), (j = e.onSaveChartStyle) == null || j.call(e, M), e.onClose();
  }, W = () => {
    var j;
    (j = e.onResetChartStyle) == null || j.call(e);
    const M = e.defaultStyles;
    if (M) {
      const Q = N.clone(n());
      w0.forEach((F) => {
        Ie(Q, F.key, Eg(M, F.key, e.defaultBackgroundColor));
      }), a(Q), r(N.clone(Q)), e.onChange(G(Q));
    } else
      e.onRestoreDefault(w0), a(N.clone(e.currentStyles));
  }, K = (M, j = M) => {
    const Q = Z(M, "#ffffff");
    return (() => {
      const F = gg.cloneNode(!0), le = F.firstChild;
      return le.$$click = () => {
        oe(P() === j ? null : j);
      }, le.style.setProperty("background", Q), C(F, (() => {
        const ce = Y(() => P() === j);
        return () => ce() && (() => {
          const ee = yg.cloneNode(!0), B = ee.firstChild;
          return C(B, A(A1, {
            each: Ng,
            children: (ne) => (() => {
              const H = Cg.cloneNode(!0);
              return H.$$click = () => {
                re(M, ne), oe(null);
              }, H.style.setProperty("background", ne), z(() => H.classList.toggle("selected", ne.toLowerCase() === Q.toLowerCase())), H;
            })()
          })), ee;
        })();
      })(), null), F;
    })();
  }, J = (M) => {
    const j = `${M}.style`, Q = `${M}.color`, F = `${M}.size`, le = Z(j, Re.Dashed), ce = Math.max(1, Number(Z(F, 1)));
    return (() => {
      const ee = pg.cloneNode(!0), B = ee.firstChild, ne = B.firstChild, H = ne.firstChild;
      return C(ee, A(ur, {
        get style() {
          return {
            width: h() ? "100%" : "134px"
          };
        },
        get value() {
          return le === Re.Solid ? "Solid" : "Dashed";
        },
        dataSource: Og,
        onSelected: (O) => {
          const I = O.key;
          re(j, I), re(`${M}.dashedValue`, I === Re.Solid ? [] : [2, 2]);
        }
      }), B), ne.$$click = () => {
        R(V() === F ? null : F);
      }, H.style.setProperty("height", `${ce}px`), C(B, (() => {
        const O = Y(() => V() === F);
        return () => O() && (() => {
          const I = vg.cloneNode(!0);
          return C(I, A(A1, {
            each: Ig,
            children: (ye) => (() => {
              const $e = bg.cloneNode(!0), ge = $e.firstChild;
              return $e.$$click = () => {
                re(F, ye), R(null);
              }, $e.classList.toggle("selected", ce === ye), ge.style.setProperty("height", `${ye}px`), $e;
            })()
          })), I;
        })();
      })(), null), C(ee, () => K(Q), null), ee;
    })();
  }, se = (() => {
    const M = $g.cloneNode(!0), j = M.firstChild, Q = j.nextSibling;
    return j.$$click = () => b("settings"), C(j, () => d("setting", e.locale)), Q.$$click = () => b("chartStyle"), z((F) => {
      const le = L() === "settings", ce = L() === "chartStyle";
      return le !== F._v$ && j.classList.toggle("active", F._v$ = le), ce !== F._v$2 && Q.classList.toggle("active", F._v$2 = ce), F;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), M;
  })();
  return A(At, {
    title: se,
    get width() {
      return L() === "chartStyle" ? 760 : 690;
    },
    get btnParentStyle() {
      return {
        display: "flex",
        "justify-content": L() === "chartStyle" ? "flex-end" : "center",
        ...L() === "chartStyle" ? {
          padding: "12px 20px 18px 20px"
        } : {}
      };
    },
    get minButtonWidth() {
      return L() === "chartStyle" ? 170 : 200;
    },
    get isMobile() {
      return h();
    },
    get buttons() {
      return Y(() => L() === "settings")() ? [{
        children: d("restore_default", e.locale),
        onClick: () => {
          e.onRestoreDefault(c()), e.onClose();
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
      return Y(() => L() === "settings")() ? (() => {
        const M = _g.cloneNode(!0);
        return C(M, A(A1, {
          get each() {
            return c();
          },
          children: (j) => {
            let Q;
            const F = N.formatValue(t(), j.key);
            switch (j.component) {
              case "select": {
                const le = j.key === "candle.type" ? "170px" : "120px";
                Q = A(ur, {
                  get style() {
                    return {
                      width: h() ? "100%" : le,
                      "min-width": h() ? "auto" : le
                    };
                  },
                  get value() {
                    return d(F, e.locale);
                  },
                  get dataSource() {
                    return j.dataSource;
                  },
                  onSelected: (ce) => {
                    const ee = ce.key;
                    he(j, ee);
                  }
                });
                break;
              }
              case "switch": {
                const le = !!F;
                Q = A(gi, {
                  open: le,
                  onChange: () => {
                    he(j, !le);
                  }
                });
                break;
              }
            }
            return (() => {
              const le = kg.cloneNode(!0), ce = le.firstChild, ee = ce.nextSibling;
              return C(ce, () => j.text), C(ee, Q), z(() => le.classList.toggle("mobile-item", !!h())), le;
            })();
          }
        })), z(() => M.classList.toggle("mobile-layout", !!h())), M;
      })() : (() => {
        const M = xg.cloneNode(!0), j = M.firstChild, Q = j.firstChild, F = Q.nextSibling, le = j.nextSibling, ce = le.firstChild;
        return Q.$$click = () => E("symbol"), F.$$click = () => E("background"), C(le, (() => {
          const ee = Y(() => w() === "symbol");
          return () => ee() ? [Lg.cloneNode(!0), (() => {
            const B = wg.cloneNode(!0), ne = B.firstChild, H = ne.nextSibling;
            return C(H, () => K("candle.bar.upColor", "candle-stick-up"), null), C(H, () => K("candle.bar.downColor", "candle-stick-down"), null), B;
          })(), (() => {
            const B = Ag.cloneNode(!0), ne = B.firstChild, H = ne.nextSibling;
            return C(H, () => K("candle.bar.upBorderColor", "border-up"), null), C(H, () => K("candle.bar.downBorderColor", "border-down"), null), B;
          })(), (() => {
            const B = Tg.cloneNode(!0), ne = B.firstChild, H = ne.nextSibling;
            return C(H, () => K("candle.bar.upWickColor", "wick-up"), null), C(H, () => K("candle.bar.downWickColor", "wick-down"), null), B;
          })()] : [Mg.cloneNode(!0), (() => {
            const B = Sg.cloneNode(!0);
            return B.firstChild, C(B, () => K(T1, "chart-background"), null), B;
          })(), (() => {
            const B = Pg.cloneNode(!0), ne = B.firstChild, H = ne.firstChild;
            return H.addEventListener("change", (O) => re("grid.vertical.show", O.currentTarget.checked)), C(B, () => J("grid.vertical"), null), z(() => H.checked = !!Z("grid.vertical.show")), B;
          })(), (() => {
            const B = Dg.cloneNode(!0), ne = B.firstChild, H = ne.firstChild;
            return H.addEventListener("change", (O) => re("grid.horizontal.show", O.currentTarget.checked)), C(B, () => J("grid.horizontal"), null), z(() => H.checked = !!Z("grid.horizontal.show")), B;
          })()];
        })(), ce), z((ee) => {
          const B = !!h(), ne = w() === "symbol", H = w() === "background";
          return B !== ee._v$3 && M.classList.toggle("mobile-layout", ee._v$3 = B), ne !== ee._v$4 && Q.classList.toggle("active", ee._v$4 = ne), H !== ee._v$5 && F.classList.toggle("active", ee._v$5 = H), ee;
        }, {
          _v$3: void 0,
          _v$4: void 0,
          _v$5: void 0
        }), M;
      })();
    }
  });
};
Ye(["click"]);
const Fg = /* @__PURE__ */ $('<img style="width:500px;margin-top: 20px">'), Ug = (e) => A(At, {
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
    const t = Fg.cloneNode(!0);
    return z(() => Ne(t, "src", e.url)), t;
  }
}), zg = {
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
}, Vg = /* @__PURE__ */ $('<div class="klinecharts-pro-indicator-setting-modal-content"></div>'), Rg = /* @__PURE__ */ $("<span></span>"), Kg = (e) => {
  const [t, r] = T(N.clone(e.params.calcParams)), n = (a) => zg[a];
  return A(At, {
    get title() {
      return e.params.indicatorName;
    },
    width: 360,
    get buttons() {
      return [{
        type: "confirm",
        children: d("confirm", e.locale),
        onClick: () => {
          const a = n(e.params.indicatorName), c = [];
          N.clone(t()).forEach((f, h) => {
            !N.isValid(f) || f === "" ? "default" in a[h] && c.push(a[h].default) : c.push(f);
          }), e.onConfirm(c), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      const a = Vg.cloneNode(!0);
      return C(a, () => n(e.params.indicatorName).map((c, f) => [(() => {
        const h = Rg.cloneNode(!0);
        return C(h, () => d(c.paramNameKey, e.locale)), h;
      })(), A(mi, {
        style: {
          width: "200px"
        },
        get value() {
          return t()[f] ?? "";
        },
        get precision() {
          return c.precision;
        },
        get min() {
          return c.min;
        },
        onChange: (h) => {
          const v = N.clone(t());
          v[f] = h, r(v);
        }
      })])), a;
    }
  });
}, jg = /* @__PURE__ */ $('<svg viewBox="0 0 1024 1024"><path d="M945.066667 898.133333l-189.866667-189.866666c55.466667-64 87.466667-149.333333 87.466667-241.066667 0-204.8-168.533333-373.333333-373.333334-373.333333S96 264.533333 96 469.333333 264.533333 842.666667 469.333333 842.666667c91.733333 0 174.933333-34.133333 241.066667-87.466667l189.866667 189.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c8.533333-12.8 8.533333-34.133333-2.133333-46.933334zM469.333333 778.666667C298.666667 778.666667 160 640 160 469.333333S298.666667 160 469.333333 160 778.666667 298.666667 778.666667 469.333333 640 778.666667 469.333333 778.666667z"></path></svg>'), Qg = /* @__PURE__ */ $('<img alt="symbol">'), Zg = /* @__PURE__ */ $("<li><div><span></span></div></li>"), Hg = (e) => {
  const [t, r] = T(""), [n] = Na(t, e.datafeed.searchSymbols.bind(e.datafeed));
  return A(At, {
    get title() {
      return d("symbol_search", e.locale);
    },
    width: 460,
    get onClose() {
      return e.onClose;
    },
    get children() {
      return [A(mi, {
        class: "klinecharts-pro-symbol-search-modal-input",
        get placeholder() {
          return d("symbol_code", e.locale);
        },
        get suffix() {
          return jg.cloneNode(!0);
        },
        get value() {
          return t();
        },
        onChange: (a) => {
          const c = `${a}`;
          r(c);
        }
      }), A(bn, {
        class: "klinecharts-pro-symbol-search-modal-list",
        get loading() {
          return n.loading;
        },
        get dataSource() {
          return n() ?? [];
        },
        renderItem: (a) => (() => {
          const c = Zg.cloneNode(!0), f = c.firstChild, h = f.firstChild;
          return c.$$click = () => {
            e.onSymbolSelected(a), e.onClose();
          }, C(f, A(de, {
            get when() {
              return a.logo;
            },
            get children() {
              const v = Qg.cloneNode(!0);
              return z(() => Ne(v, "src", a.logo)), v;
            }
          }), h), C(h, () => a.shortName ?? a.ticker, null), C(h, () => `${a.name ? `(${a.name})` : ""}`, null), C(c, () => a.exchange ?? "", null), z(() => Ne(h, "title", a.name ?? "")), c;
        })()
      })];
    }
  });
};
Ye(["click"]);
const Yg = /* @__PURE__ */ $('<div class="klinecharts-pro-mobile-more-modal-content"><div class="item"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div><div class="item"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path></svg><span></span></div><div class="item"><svg viewBox="0 0 20 20"><rect x="3" y="4" width="14" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"></rect><path d="M6 2.5v4M14 2.5v4M3 8h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M10 11v3l2.2 1.3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg><span>Time Tools</span></div><div class="item"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg><span></span></div></div>'), Wg = (e) => A(At, {
  get title() {
    return d("more", e.locale);
  },
  isMobile: !0,
  get onClose() {
    return e.onClose;
  },
  get children() {
    const t = Yg.cloneNode(!0), r = t.firstChild, n = r.firstChild, a = n.nextSibling, c = r.nextSibling, f = c.firstChild, h = f.nextSibling, v = c.nextSibling, L = v.nextSibling, b = L.firstChild, w = b.nextSibling;
    return r.$$click = () => {
      e.onIndicatorClick(), e.onClose();
    }, C(a, () => d("indicator", e.locale)), c.$$click = () => {
      e.onTimezoneClick(), e.onClose();
    }, C(h, () => d("timezone", e.locale)), v.$$click = () => {
      e.onTimeToolsClick(), e.onClose();
    }, L.$$click = () => {
      e.onSettingClick(), e.onClose();
    }, C(w, () => d("setting", e.locale)), t;
  }
});
Ye(["click"]);
const qg = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-picker"></div>'), Gg = /* @__PURE__ */ $('<label class="klinecharts-pro-time-tools-field"><button type="button" class="klinecharts-pro-time-tools-input"><span></span><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M8 3v4M16 3v4M4 10h16"></path></svg></button></label>'), Xg = /* @__PURE__ */ $("<span></span>"), Jg = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-calendar"><div class="klinecharts-pro-time-tools-month"><button type="button">&lt;&lt;</button><button type="button">&lt;</button><button type="button" class="calendar-title"></button><button type="button">></button><button type="button">>></button></div></div>'), ey = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-grid"></div>'), ty = /* @__PURE__ */ $('<span class="weekday"></span>'), It = /* @__PURE__ */ $('<button type="button"></button>'), ny = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-month-grid"></div>'), ry = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-month-grid year-grid"></div>'), oy = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-spinners"><div class="spinner-column scrollable"></div><div class="spinner-column scrollable"></div><div class="spinner-column"></div></div>'), iy = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-content"></div>'), ay = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-tabs"></div>'), sy = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-range-panel"><div class="klinecharts-pro-time-tools-range-header"><button type="button"></button><span class="klinecharts-pro-time-tools-range-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg></span><button type="button"></button><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M8 3v4M16 3v4M4 10h16"></path></svg></div></div>'), ly = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-panel"><div class="klinecharts-pro-time-tools-row"><div><strong>Time Anchor</strong><span>Anchor to a time on the chart when switching between intervals</span></div><button type="button"><span></span></button></div><div><div><strong>Anchor Point</strong></div><select><option value="date">Date</option><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option></select></div><div><div><strong>Anchor line</strong><span>Mark the anchored time on the chart with a vertical line</span></div><button type="button"><span></span></button></div><div><div><strong>Across Tokens</strong><span>Retain onscreen chart range when switching symbols</span></div><button type="button"><span></span></button></div></div>'), cy = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-anchor-date"></div>'), uy = [{
  key: "goToDate",
  label: "Go to Date"
}, {
  key: "timeRange",
  label: "Time Range"
}, {
  key: "timeAnchor",
  label: "Time Anchor"
}], dy = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], A0 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Gt = (e) => String(e).padStart(2, "0"), T0 = (e, t, r) => Math.min(r, new Date(e, t + 1, 0).getDate()), Gn = (e) => {
  const t = new Date(e);
  return {
    year: t.getFullYear(),
    month: t.getMonth(),
    day: t.getDate(),
    hour: t.getHours(),
    minute: t.getMinutes()
  };
}, an = (e) => new Date(e.year, e.month, e.day, e.hour, e.minute, 0, 0).getTime(), Xn = (e) => e.year * 1e4 + (e.month + 1) * 100 + e.day, hr = (e) => {
  const t = e.hour >= 12 ? "PM" : "AM", r = e.hour % 12 || 12;
  return `${Gt(e.month + 1)}/${Gt(e.day)}/${e.year} ${Gt(r)}:${Gt(e.minute)} ${t}`;
}, hy = (e, t) => {
  const r = new Date(e, t, 1).getDay(), n = new Date(e, t + 1, 0).getDate(), a = new Date(e, t, 0).getDate(), c = [];
  for (let f = r - 1; f >= 0; f -= 1)
    c.push({
      date: new Date(e, t - 1, a - f),
      current: !1
    });
  for (let f = 1; f <= n; f += 1)
    c.push({
      date: new Date(e, t, f),
      current: !0
    });
  for (; c.length < 42; ) {
    const f = c[c.length - 1].date;
    c.push({
      date: new Date(f.getFullYear(), f.getMonth(), f.getDate() + 1),
      current: !1
    });
  }
  return c;
}, sn = (e) => {
  const [t, r] = T(!0), [n, a] = T("date"), [c, f] = T(e.value.year), [h, v] = T(e.value.month), L = Y(() => hy(c(), h())), b = Y(() => Math.floor(c() / 10) * 10), w = Y(() => Array.from({
    length: 12
  }, (W, K) => b() - 1 + K)), E = Y(() => e.value.hour % 12 || 12), P = Y(() => e.value.hour >= 12 ? "PM" : "AM"), oe = Array.from({
    length: 12
  }, (W, K) => K + 1), V = Array.from({
    length: 60
  }, (W, K) => K), R = (W) => {
    const K = new Date(c(), h() + W, 1);
    f(K.getFullYear()), v(K.getMonth());
  }, U = () => {
    n() === "date" ? a("month") : n() === "month" && a("year");
  }, he = (W) => {
    var K;
    e.onChange({
      ...e.value,
      year: W.getFullYear(),
      month: W.getMonth(),
      day: W.getDate()
    }), (K = e.onDateSelect) == null || K.call(e), f(W.getFullYear()), v(W.getMonth());
  }, Z = (W) => {
    v(W), e.onChange({
      ...e.value,
      year: c(),
      month: W,
      day: T0(c(), W, e.value.day)
    }), a("date");
  }, re = (W) => {
    f(W), e.onChange({
      ...e.value,
      year: W,
      day: T0(W, e.value.month, e.value.day)
    }), a("month");
  }, G = (W) => {
    const K = P() === "PM";
    e.onChange({
      ...e.value,
      hour: K ? W === 12 ? 12 : W + 12 : W === 12 ? 0 : W
    });
  }, ve = (W) => {
    const K = E();
    e.onChange({
      ...e.value,
      hour: W === "PM" ? K === 12 ? 12 : K + 12 : K === 12 ? 0 : K
    });
  };
  return (() => {
    const W = qg.cloneNode(!0);
    return C(W, (() => {
      const K = Y(() => e.showInput !== !1);
      return () => K() && (() => {
        const J = Gg.cloneNode(!0), se = J.firstChild, M = se.firstChild;
        return C(J, (() => {
          const j = Y(() => !!e.label);
          return () => j() && (() => {
            const Q = Xg.cloneNode(!0);
            return C(Q, () => e.label), Q;
          })();
        })(), se), se.$$click = () => r(!t()), C(M, () => hr(e.value)), J;
      })();
    })(), null), C(W, (() => {
      const K = Y(() => !!t());
      return () => K() && (() => {
        const J = Jg.cloneNode(!0), se = J.firstChild, M = se.firstChild, j = M.nextSibling, Q = j.nextSibling, F = Q.nextSibling, le = F.nextSibling;
        return M.$$click = () => {
          n() === "year" ? f(c() - 10) : n() === "month" ? f(c() - 1) : R(-12);
        }, j.$$click = () => {
          n() === "year" ? f(c() - 10) : n() === "month" ? f(c() - 1) : R(-1);
        }, Q.$$click = U, C(Q, (() => {
          const ce = Y(() => n() === "year");
          return () => ce() ? `${b()}-${b() + 9}` : (() => {
            const ee = Y(() => n() === "month");
            return () => ee() ? c() : `${A0[h()]} ${c()}`;
          })();
        })()), F.$$click = () => {
          n() === "year" ? f(c() + 10) : n() === "month" ? f(c() + 1) : R(1);
        }, le.$$click = () => {
          n() === "year" ? f(c() + 10) : n() === "month" ? f(c() + 1) : R(12);
        }, C(J, (() => {
          const ce = Y(() => n() === "date");
          return () => ce() && (() => {
            const ee = ey.cloneNode(!0);
            return C(ee, () => dy.map((B) => (() => {
              const ne = ty.cloneNode(!0);
              return C(ne, B), ne;
            })()), null), C(ee, () => L().map(({
              date: B,
              current: ne
            }) => {
              const H = Xn({
                year: B.getFullYear(),
                month: B.getMonth(),
                day: B.getDate()
              }), O = e.range ? Xn(e.range.from) : NaN, I = e.range ? Xn(e.range.to) : NaN, ye = Math.min(O, I), $e = Math.max(O, I), ge = Number.isFinite(ye) && H >= ye && H <= $e, We = Number.isFinite(ye) && (H === ye || H === $e), k = B.getFullYear() === e.value.year && B.getMonth() === e.value.month && B.getDate() === e.value.day;
              return (() => {
                const Ce = It.cloneNode(!0);
                return Ce.$$click = () => he(B), me(Ce, `${ne ? "" : "muted"} ${ge ? "in-range" : ""} ${We || k ? "selected" : ""}`), C(Ce, () => B.getDate()), Ce;
              })();
            }), null), ee;
          })();
        })(), null), C(J, (() => {
          const ce = Y(() => n() === "month");
          return () => ce() && (() => {
            const ee = ny.cloneNode(!0);
            return C(ee, () => A0.map((B, ne) => (() => {
              const H = It.cloneNode(!0);
              return H.$$click = () => Z(ne), C(H, B), z(() => me(H, ne === e.value.month && c() === e.value.year ? "selected" : "")), H;
            })())), ee;
          })();
        })(), null), C(J, (() => {
          const ce = Y(() => n() === "year");
          return () => ce() && (() => {
            const ee = ry.cloneNode(!0);
            return C(ee, () => w().map((B) => (() => {
              const ne = It.cloneNode(!0);
              return ne.$$click = () => re(B), C(ne, B), z(() => me(ne, `${B < b() || B > b() + 9 ? "muted" : ""} ${B === e.value.year ? "selected" : ""}`)), ne;
            })())), ee;
          })();
        })(), null), C(J, (() => {
          const ce = Y(() => n() === "date");
          return () => ce() && (() => {
            const ee = oy.cloneNode(!0), B = ee.firstChild, ne = B.nextSibling, H = ne.nextSibling;
            return C(B, () => oe.map((O) => (() => {
              const I = It.cloneNode(!0);
              return I.$$click = () => G(O), C(I, () => Gt(O)), z(() => me(I, O === E() ? "selected" : "")), I;
            })())), C(ne, () => V.map((O) => (() => {
              const I = It.cloneNode(!0);
              return I.$$click = () => e.onChange({
                ...e.value,
                minute: O
              }), C(I, () => Gt(O)), z(() => me(I, O === e.value.minute ? "selected" : "")), I;
            })())), C(H, () => ["AM", "PM"].map((O) => (() => {
              const I = It.cloneNode(!0);
              return I.$$click = () => ve(O), C(I, O), z(() => me(I, O === P() ? "selected" : "")), I;
            })())), ee;
          })();
        })(), null), J;
      })();
    })(), null), W;
  })();
}, fy = (e) => {
  const [t, r] = T(e.initialTab ?? "goToDate"), [n, a] = T(Gn(e.initialTimestamp)), [c, f] = T(Gn(e.initialRange.from)), [h, v] = T(Gn(e.initialRange.to)), [L, b] = T("from"), [w, E] = T({
    ...e.anchorSettings,
    anchorLine: e.anchorSettings.anchorLine ?? !0,
    acrossTokens: e.anchorSettings.acrossTokens ?? !0
  }), P = (V) => {
    E((R) => ({
      ...R,
      ...V
    }));
  }, oe = () => {
    const V = t();
    if (V === "goToDate")
      e.onGoToDate(an(n()));
    else if (V === "timeRange") {
      const R = an(c()), U = an(h());
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
        timestamp: R.anchorPoint === "date" ? an(n()) : R.timestamp
      });
    }
    e.onClose();
  };
  return A(At, {
    width: 620,
    get title() {
      return (() => {
        const V = ay.cloneNode(!0);
        return C(V, () => uy.map((R) => (() => {
          const U = It.cloneNode(!0);
          return U.$$click = () => r(R.key), C(U, () => R.label), z(() => me(U, t() === R.key ? "active" : "")), U;
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
      const V = iy.cloneNode(!0);
      return C(V, (() => {
        const R = Y(() => t() === "goToDate");
        return () => R() && A(sn, {
          label: "",
          get value() {
            return n();
          },
          onChange: a
        });
      })(), null), C(V, (() => {
        const R = Y(() => t() === "timeRange");
        return () => R() && (() => {
          const U = sy.cloneNode(!0), he = U.firstChild, Z = he.firstChild, re = Z.nextSibling, G = re.nextSibling;
          return Z.$$click = () => b("from"), C(Z, () => hr(c())), G.$$click = () => b("to"), C(G, () => hr(h())), C(U, (() => {
            const ve = Y(() => L() === "from");
            return () => ve() ? A(sn, {
              label: "Start",
              get value() {
                return c();
              },
              onChange: f,
              onDateSelect: () => b("to"),
              showInput: !1,
              get range() {
                return {
                  from: c(),
                  to: h()
                };
              }
            }) : A(sn, {
              label: "End",
              get value() {
                return h();
              },
              onChange: v,
              showInput: !1,
              get range() {
                return {
                  from: c(),
                  to: h()
                };
              }
            });
          })(), null), z((ve) => {
            const W = L() === "from" ? "active" : "", K = L() === "to" ? "active" : "";
            return W !== ve._v$ && me(Z, ve._v$ = W), K !== ve._v$2 && me(G, ve._v$2 = K), ve;
          }, {
            _v$: void 0,
            _v$2: void 0
          }), U;
        })();
      })(), null), C(V, (() => {
        const R = Y(() => t() === "timeAnchor");
        return () => R() && (() => {
          const U = ly.cloneNode(!0), he = U.firstChild, Z = he.firstChild, re = Z.nextSibling, G = he.nextSibling, ve = G.firstChild, W = ve.nextSibling, K = G.nextSibling, J = K.firstChild, se = J.nextSibling, M = K.nextSibling, j = M.firstChild, Q = j.nextSibling;
          return re.$$click = () => P({
            enabled: !w().enabled
          }), W.addEventListener("change", (F) => P({
            anchorPoint: F.currentTarget.value
          })), C(U, (() => {
            const F = Y(() => !!(w().enabled && w().anchorPoint === "date"));
            return () => F() && (() => {
              const le = cy.cloneNode(!0);
              return C(le, A(sn, {
                label: "Anchor date",
                get value() {
                  return n();
                },
                onChange: a
              })), le;
            })();
          })(), K), se.$$click = () => P({
            anchorLine: !w().anchorLine
          }), Q.$$click = () => P({
            acrossTokens: !w().acrossTokens
          }), z((F) => {
            const le = `klinecharts-pro-time-tools-switch${w().enabled ? " on" : ""}`, ce = `klinecharts-pro-time-tools-row${w().enabled ? "" : " disabled"}`, ee = !w().enabled, B = `klinecharts-pro-time-tools-row with-divider${w().enabled ? "" : " disabled"}`, ne = `klinecharts-pro-time-tools-switch${w().anchorLine ? " on" : ""}`, H = !w().enabled, O = `klinecharts-pro-time-tools-row with-divider${w().enabled ? "" : " disabled"}`, I = `klinecharts-pro-time-tools-switch${w().acrossTokens ? " on" : ""}`, ye = !w().enabled;
            return le !== F._v$3 && me(re, F._v$3 = le), ce !== F._v$4 && me(G, F._v$4 = ce), ee !== F._v$5 && (W.disabled = F._v$5 = ee), B !== F._v$6 && me(K, F._v$6 = B), ne !== F._v$7 && me(se, F._v$7 = ne), H !== F._v$8 && (se.disabled = F._v$8 = H), O !== F._v$9 && me(M, F._v$9 = O), I !== F._v$10 && me(Q, F._v$10 = I), ye !== F._v$11 && (Q.disabled = F._v$11 = ye), F;
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
          }), z(() => W.value = w().anchorPoint), U;
        })();
      })(), null), V;
    }
  });
};
Ye(["click"]);
const my = 0.08, gy = 5e-3;
function dn(e) {
  if (typeof e == "number")
    return Number.isFinite(e) ? e : null;
  if (typeof e == "string" && e.trim() !== "") {
    const t = Number(e);
    return Number.isFinite(t) ? t : null;
  }
  return null;
}
function _n(e, t) {
  const r = dn(e);
  if (r != null) {
    t.push(r);
    return;
  }
  if (Array.isArray(e)) {
    e.forEach((n) => _n(n, t));
    return;
  }
  e && typeof e == "object" && Object.values(e).forEach((n) => {
    _n(n, t);
  });
}
function yy(e, t, r) {
  const n = t - e;
  if (Number.isFinite(n) && n > 0)
    return n * r;
  const a = Math.max(Math.abs(e), Math.abs(t), 1);
  return Math.max(a * gy, Number.EPSILON);
}
function Cy({
  visibleCandles: e = [],
  visibleIndicators: t = [],
  visiblePriceLines: r = [],
  latestPrice: n,
  paddingPercent: a = my
}) {
  const c = [];
  e.forEach((w) => {
    const E = dn(w.high), P = dn(w.low);
    E != null && c.push(E), P != null && c.push(P);
  }), t.forEach((w) => {
    _n(w, c);
  }), r.forEach((w) => {
    _n(w, c);
  });
  const f = dn(n);
  if (f != null && c.push(f), c.length === 0)
    return null;
  let h = Number.POSITIVE_INFINITY, v = Number.NEGATIVE_INFINITY;
  if (c.forEach((w) => {
    h = Math.min(h, w), v = Math.max(v, w);
  }), !Number.isFinite(h) || !Number.isFinite(v))
    return null;
  const L = Math.min(Math.max(a, 0), 0.25), b = yy(h, v, L);
  return {
    minPrice: h - b,
    maxPrice: v + b
  };
}
const py = /* @__PURE__ */ $('<i class="icon-close klinecharts-pro-load-icon"></i>'), vy = /* @__PURE__ */ $('<div class="klinecharts-pro-content"><button type="button">auto</button><div class="klinecharts-pro-widget"></div></div>'), by = /* @__PURE__ */ $('<div class="klinecharts-pro-time-anchor-line"></div>'), $y = /* @__PURE__ */ $('<div class="klinecharts-pro-time-navigation-tooltip"></div>'), _y = /* @__PURE__ */ $('<div class="klinecharts-pro-countdown-price-mark"><span class="klinecharts-pro-countdown-price-mark-price"></span><span class="klinecharts-pro-countdown-price-mark-timer"></span></div>'), ky = /* @__PURE__ */ $('<div class="overlay-toolbar-color-popover"><div class="overlay-toolbar-color-grid"></div><div class="overlay-toolbar-color-footer"><button type="button" class="overlay-toolbar-add-color">+</button><div class="overlay-toolbar-color-slider"><span></span></div></div></div>'), xy = /* @__PURE__ */ $('<div class="overlay-toolbar-dropdown width-menu"></div>'), Ly = /* @__PURE__ */ $('<div class="overlay-toolbar-dropdown style-menu"><button type="button"><span class="overlay-toolbar-style-sample solid"></span></button><button type="button"><span class="overlay-toolbar-style-sample dashed"></span></button><button type="button"><span class="overlay-toolbar-style-sample dotted"></span></button></div>'), wy = /* @__PURE__ */ $('<div class="klinecharts-pro-overlay-toolbar"><button type="button" class="overlay-toolbar-icon drag" title="Move"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="6" r="1.5"></circle><circle cx="15" cy="6" r="1.5"></circle><circle cx="9" cy="12" r="1.5"></circle><circle cx="15" cy="12" r="1.5"></circle><circle cx="9" cy="18" r="1.5"></circle><circle cx="15" cy="18" r="1.5"></circle></svg></button><button type="button" class="overlay-toolbar-icon refresh" title="Reset"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 15.4-6.36L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-15.4 6.36L3 16"></path><path d="M3 21v-5h5"></path></svg></button><div class="overlay-toolbar-picker"><button type="button" title="Color"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg></button></div><div class="overlay-toolbar-picker"><button type="button" title="Line width"><span class="overlay-toolbar-line-preview"></span><span>px</span></button></div><div class="overlay-toolbar-picker"><button type="button" title="Line style"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16"></path></svg></button></div><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2"></rect><path d="M20 4 4 20"></path></svg></button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg></button><button type="button" class="overlay-toolbar-icon delete" title="Delete"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6 18 20H6L5 6"></path><path d="M10 11v5"></path><path d="M14 11v5"></path></svg></button></div>'), Ay = /* @__PURE__ */ $('<button type="button"></button>'), Ty = /* @__PURE__ */ $('<button type="button"><span class="overlay-toolbar-width-sample"></span></button>'), My = /* @__PURE__ */ $('<div class="klinecharts-pro-quick-order-marker"><button type="button" class="klinecharts-pro-quick-order-plus"></button></div>'), Sy = /* @__PURE__ */ $('<span class="klinecharts-pro-quick-order-plus-icon"></span>'), Py = /* @__PURE__ */ $('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" aria-hidden="true"><path d="M460-300h40v-160h160v-40H500v-160h-40v160H300v40h160v160ZM224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h510.76q27.62 0 46.12 18.5Q800-763 800-735.38v510.76q0 27.62-18.5 46.12Q763-160 735.38-160H224.62Zm0-40h510.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-510.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69H224.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v510.76q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69ZM200-760v560-560Z"></path></svg>'), Dy = /* @__PURE__ */ $('<div class="klinecharts-pro-quick-order-menu-anchor"><div class="klinecharts-pro-quick-order-menu"><button type="button">Trade <!> @ <!> Limit</button><button type="button">Trade <!> @ <!> Stop</button><button type="button">Create new order...</button><button type="button">Copy Price (<!>)</button><button type="button">Draw horizontal line on </button></div></div>');
Yc();
const Jn = "klinecharts_pro_chart_style", er = "klinecharts_pro_chart_background_color", fr = "klinecharts_pro_time_anchor_settings", tr = "candle_pane", Ny = 0.08, Oy = 80, M0 = 2e-3, Iy = /* @__PURE__ */ new Set(["horizontalRayLine", "horizontalSegment", "horizontalStraightLine", "orderLine", "priceLine"]);
function pi() {
  return {
    enabled: !1,
    timestamp: Date.now(),
    anchorPoint: "date",
    anchorLine: !0,
    acrossTokens: !0
  };
}
function Ey() {
  try {
    const e = window.localStorage.getItem(fr);
    if (!e)
      return null;
    const t = JSON.parse(e);
    if (t.enabled !== !0 || t.acrossTokens !== !0 || !Number.isFinite(t.timestamp))
      return null;
    const r = pi();
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
function S0(e) {
  try {
    if (!e.enabled || !e.acrossTokens) {
      window.localStorage.removeItem(fr);
      return;
    }
    window.localStorage.setItem(fr, JSON.stringify(e));
  } catch {
  }
}
function ln(e, t, r, n) {
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
      indicator: c,
      defaultStyles: f
    }) => {
      const h = [];
      return c.visible ? (h.push(f.tooltip.icons[1]), h.push(f.tooltip.icons[2]), h.push(f.tooltip.icons[3])) : (h.push(f.tooltip.icons[0]), h.push(f.tooltip.icons[2]), h.push(f.tooltip.icons[3])), {
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
function cn(e) {
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
function By(e) {
  const t = Math.max(0, Math.ceil(e / 1e3)), r = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), a = t % 60, c = (f) => String(f).padStart(2, "0");
  return r > 0 ? `${c(r)}:${c(n)}:${c(a)}` : `${c(n)}:${c(a)}`;
}
const Fy = (e) => {
  var oo, io, ao, so, lo, co, uo, ho, fo, mo, go, yo, Co, po, vo, bo, $o, _o, ko, xo, Lo, wo, Ao, To, Mo, So, Po, Do, No;
  let t, r, n = null, a;
  const [c, f] = T(!1), [h, v] = T(e.theme), [L, b] = T(e.styles), [w, E] = T(e.locale), [P, oe] = T(e.symbol), [V, R] = T(e.period), U = () => {
    var o, i, s, l;
    return {
      visibleMarginLeft: ((o = e.indicatorTooltipIconStyles) == null ? void 0 : o.visibleMarginLeft) ?? 7,
      secondaryMarginLeft: ((i = e.indicatorTooltipIconStyles) == null ? void 0 : i.secondaryMarginLeft) ?? 7,
      marginTop: ((s = e.indicatorTooltipIconStyles) == null ? void 0 : s.marginTop) ?? 1,
      size: ((l = e.indicatorTooltipIconStyles) == null ? void 0 : l.size) ?? 12
    };
  }, [he, Z] = T(!1), [re, G] = T([...e.mainIndicators]), [ve, W] = T({}), [K, J] = T(!1), [se, M] = T({
    key: e.timezone,
    text: x0(e.timezone, e.locale)
  }), [j, Q] = T(!1), [F, le] = T(), ce = () => {
    try {
      const o = window.localStorage.getItem(Jn);
      if (!o)
        return;
      const i = JSON.parse(o);
      return i && typeof i == "object" ? i : void 0;
    } catch {
      return;
    }
  }, ee = (o) => {
    try {
      window.localStorage.setItem(Jn, JSON.stringify(o)), window.localStorage.removeItem(er);
    } catch {
    }
  }, B = () => {
    try {
      window.localStorage.removeItem(Jn), window.localStorage.removeItem(er);
    } catch {
    }
  }, ne = () => {
    var i;
    const o = ce();
    if ((i = o == null ? void 0 : o.chart) != null && i.backgroundColor)
      return o.chart.backgroundColor;
    try {
      return window.localStorage.getItem(er) ?? void 0;
    } catch {
      return;
    }
  }, H = () => {
    const o = r == null ? void 0 : r.closest(".klinecharts-pro");
    return o && getComputedStyle(o).backgroundColor || "#171a27";
  }, O = () => t ? getComputedStyle(t).getPropertyValue("--klinecharts-pro-chart-background-color").trim() || ne() || H() : ne() ?? H(), I = (o) => {
    var s;
    const i = (s = o.chart) == null ? void 0 : s.backgroundColor;
    if (!(!i || !t)) {
      if (i.toLowerCase() === H().toLowerCase()) {
        t.style.removeProperty("--klinecharts-pro-chart-background-color");
        return;
      }
      t.style.setProperty("--klinecharts-pro-chart-background-color", i);
    }
  }, ye = (o) => {
    const {
      chart: i,
      ...s
    } = o;
    return s;
  }, [$e, ge] = T(""), [We, k] = T(!1), [Ce, Ae] = T(Date.now()), [Je, Me] = T({
    from: Date.now() - 30 * 24 * 60 * 60 * 1e3,
    to: Date.now()
  }), [et, gt] = T(Ey() ?? pi()), [Ut, s1] = T(e.drawingBarVisible), [l1, S1] = T(!1), [P1, zt] = T(!1), [D1, N1] = T(!1), c1 = ((oo = e.orderTools) == null ? void 0 : oo.quickOrder) ?? !0, [Ue, u1] = T({
    quickOrder: c1,
    quickOrderFloatingWindow: ((io = e.orderTools) == null ? void 0 : io.quickOrderFloatingWindow) ?? c1,
    quickOrderPlusButton: ((ao = e.orderTools) == null ? void 0 : ao.quickOrderPlusButton) ?? c1,
    openOrders: ((so = e.orderTools) == null ? void 0 : so.openOrders) ?? !0,
    openOrdersExtendedPriceLine: ((lo = e.orderTools) == null ? void 0 : lo.openOrdersExtendedPriceLine) ?? !0,
    openOrdersDisplay: ((co = e.orderTools) == null ? void 0 : co.openOrdersDisplay) ?? "right",
    positions: ((uo = e.orderTools) == null ? void 0 : uo.positions) ?? !0,
    breakevenPrice: ((ho = e.orderTools) == null ? void 0 : ho.breakevenPrice) ?? !0,
    liquidationPrice: ((fo = e.orderTools) == null ? void 0 : fo.liquidationPrice) ?? !0,
    priceLine: ((mo = e.orderTools) == null ? void 0 : mo.priceLine) ?? !0,
    marketPriceLine: ((go = e.orderTools) == null ? void 0 : go.marketPriceLine) ?? !0,
    countDown: ((yo = e.orderTools) == null ? void 0 : yo.countDown) ?? !0,
    bidAskPrice: ((Co = e.orderTools) == null ? void 0 : Co.bidAskPrice) ?? !0,
    orderPreviewLine: ((po = e.orderTools) == null ? void 0 : po.orderPreviewLine) ?? !0,
    orderHistory: ((vo = e.orderTools) == null ? void 0 : vo.orderHistory) ?? !0
  }), [$t, Vt] = T(null), [yt, ct] = T(!1), [O1, Qe] = T(!1), [I1, Pn] = T(64), [Tt, Ct] = T(null), [Rt, d1] = T(null), [Dn, E1] = T("buy"), Nn = 6, [B1, Kt] = T(null), [h1, F1] = T(null), [U1, f1] = T(null), [Ze, je] = T(null), [qe, Ge] = T(null), m1 = ["#000000", "#2b3342", "#3f4653", "#565d69", "#6f7580", "#8a9099", "#a7acb3", "#c4c8ce", "#ffffff", "#ff4d67", "#ffa629", "#f7ed4a", "#2fc58d", "#4ab09c", "#52c4d3", "#3157f6", "#6a36b8", "#a644b9", "#d83972", "#f2a3a6", "#f5c879", "#f7ee97", "#a6d29f", "#7fc9b9", "#91d7df", "#8fb2ee", "#b09ad2", "#c89ccf", "#d987ab", "#e8757a", "#efb34f", "#efe36e", "#86c17d", "#66b7a8", "#68c4d0", "#5f91e4", "#8059c9", "#aa62c2", "#d34d83", "#b9353d", "#ea8527", "#e8c245", "#4b8c43", "#2f6f60", "#47919b", "#2646c6", "#56309c", "#892f95", "#a82563", "#8e2528", "#de5c1f", "#dc8527", "#255a22", "#164b34", "#225b63", "#15309b", "#442180", "#6b1f74", "#86154e"];
  let jt = null;
  const [g1, y1] = T({
    visible: !1,
    indicatorName: "",
    paneId: "",
    calcParams: []
  });
  let Se = /* @__PURE__ */ new Map(), Qt = /* @__PURE__ */ new Map(), ut, pt, Mt = null, St;
  const [tt, C1] = T(!0), [z1, V1] = T(null), [R1, On] = T(null);
  let Be = /* @__PURE__ */ new Map();
  const K1 = (o, i, s) => {
    const l = n == null ? void 0 : n.getIndicatorByPaneId(i, o);
    return {
      name: o,
      shortName: (l == null ? void 0 : l.shortName) || o,
      paneId: i,
      type: s,
      calcParams: (l == null ? void 0 : l.calcParams) || [],
      precision: (l == null ? void 0 : l.precision) ?? 4,
      visible: (l == null ? void 0 : l.visible) ?? !0,
      styles: l == null ? void 0 : l.styles,
      figures: l == null ? void 0 : l.figures
    };
  }, _ = (o, i, s, l) => {
    if (e.onIndicatorChange)
      if (l === "add" || l === "change")
        setTimeout(() => {
          const u = K1(o, i, s);
          e.onIndicatorChange({
            action: l,
            indicator: u
          });
        }, 50);
      else {
        const u = {
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
          action: l,
          indicator: u
        });
      }
  }, D = () => {
    var o;
    return (o = n == null ? void 0 : n.getPaneById) == null ? void 0 : o.call(n, tr);
  }, Fe = () => {
    var o, i;
    return (i = (o = D()) == null ? void 0 : o.getAxisComponent) == null ? void 0 : i.call(o);
  }, ze = () => {
    var l, u;
    const o = (u = (l = Fe()) == null ? void 0 : l.getExtremum) == null ? void 0 : u.call(l), i = Number(o == null ? void 0 : o.min), s = Number(o == null ? void 0 : o.max);
    return !Number.isFinite(i) || !Number.isFinite(s) ? null : {
      minPrice: i,
      maxPrice: s
    };
  }, nt = () => {
    var m, g;
    const o = ((m = n == null ? void 0 : n.getDataList) == null ? void 0 : m.call(n)) ?? [];
    if (o.length === 0)
      return null;
    const i = (g = n == null ? void 0 : n.getVisibleRange) == null ? void 0 : g.call(n), s = Number(i == null ? void 0 : i.from), l = Number(i == null ? void 0 : i.to);
    if (!Number.isFinite(s) || !Number.isFinite(l))
      return {
        from: 0,
        to: o.length - 1,
        dataList: o
      };
    const u = Math.min(s, l), y = Math.max(s, l);
    return {
      from: Math.max(0, Math.floor(u)),
      to: Math.min(o.length - 1, Math.ceil(y)),
      dataList: o
    };
  }, Pt = () => {
    const o = nt();
    return o ? o.dataList.slice(o.from, o.to + 1) : [];
  }, j1 = () => {
    const o = nt();
    if (!o || !(n != null && n.getIndicatorByPaneId))
      return [];
    const i = n.getIndicatorByPaneId(tr), s = i instanceof Map ? Array.from(i.values()) : i ? [i] : [], l = [];
    return s.forEach((u) => {
      if (!u || u.visible === !1 || u.name === "VOL" || u.series === "volume")
        return;
      const y = Array.isArray(u.figures) ? u.figures : [], m = Array.isArray(u.result) ? u.result : [];
      for (let g = o.from; g <= o.to; g += 1) {
        const p = m[g];
        p && y.forEach((x) => {
          (x == null ? void 0 : x.key) != null && l.push(p[x.key]);
        });
      }
    }), l;
  }, Q1 = () => {
    var l;
    const o = [], i = (u) => {
      var m;
      if (!u || u.visible === !1)
        return;
      const y = u.type || u.name || "";
      Iy.has(y) && ((m = u.points) == null || m.forEach((g) => {
        const p = Number(g.value);
        Number.isFinite(p) && p > 0 && o.push(p);
      }));
    };
    Se.forEach(i);
    const s = Rt();
    return s && i(Mr((l = n == null ? void 0 : n.getOverlayById) == null ? void 0 : l.call(n, s))), Qt.forEach((u) => {
      u.forEach((y) => {
        Number.isFinite(y) && y > 0 && o.push(y);
      });
    }), o;
  }, vi = () => {
    var u, y, m, g, p, x;
    const o = (g = (m = (y = (u = n == null ? void 0 : n.getStyles) == null ? void 0 : u.call(n)) == null ? void 0 : y.candle) == null ? void 0 : m.priceMark) == null ? void 0 : g.last;
    if (!(o != null && o.show) && !((p = o == null ? void 0 : o.line) != null && p.show) && !Ue().marketPriceLine)
      return;
    const i = ((x = n == null ? void 0 : n.getDataList) == null ? void 0 : x.call(n)) ?? [], s = i[i.length - 1], l = Number(s == null ? void 0 : s.close);
    return Number.isFinite(l) && l > 0 ? l : void 0;
  }, bi = () => Cy({
    visibleCandles: Pt(),
    visibleIndicators: j1(),
    visiblePriceLines: Q1(),
    latestPrice: vi(),
    paddingPercent: Ny
  }), $i = (o, i) => {
    const s = Math.max(Math.abs(i.maxPrice - i.minPrice), 1);
    return Math.abs(o.minPrice - i.minPrice) <= s * M0 && Math.abs(o.maxPrice - i.maxPrice) <= s * M0;
  }, Tr = (o, i) => {
    var g, p, x, S;
    const s = Fe();
    if (!n || !(s != null && s.setExtremum))
      return;
    const l = o.minPrice, u = o.maxPrice, y = ((g = s.convertToRealValue) == null ? void 0 : g.call(s, l)) ?? l, m = ((p = s.convertToRealValue) == null ? void 0 : p.call(s, u)) ?? u;
    s.setExtremum({
      min: l,
      max: u,
      range: u - l,
      realMin: y,
      realMax: m,
      realRange: m - y
    }), (x = n.adjustPaneViewport) == null || x.call(n, !1, !0, !0, !0), i && ((S = s.setAutoCalcTickFlag) == null || S.call(s, !0)), On(o);
  }, _i = (o = !1) => {
    var s, l, u;
    if (!n || !tt())
      return;
    const i = bi();
    if (!i) {
      (l = (s = Fe()) == null ? void 0 : s.setAutoCalcTickFlag) == null || l.call(s, !0), (u = n.resize) == null || u.call(n), Mt = null;
      return;
    }
    !o && Mt && $i(i, Mt) || (Tr(i, !0), Mt = i, rt());
  }, Te = (o = !1) => {
    !tt() || typeof window > "u" || (ut && window.clearTimeout(ut), ut = window.setTimeout(() => {
      ut = void 0, pt && window.cancelAnimationFrame(pt), pt = window.requestAnimationFrame(() => {
        pt = void 0, _i(o);
      });
    }, o ? 0 : Oy));
  }, Z1 = () => {
    var o, i;
    V1(null), C1(!0), (i = (o = Fe()) == null ? void 0 : o.setAutoCalcTickFlag) == null || i.call(o, !0), Te(!0);
  }, In = () => {
    const o = ze();
    o && (V1(o), Tr(o, !1)), C1(!1);
  }, ki = () => {
    tt() ? In() : Z1();
  }, xi = () => {
    var g;
    const o = (g = n == null ? void 0 : n.getDom) == null ? void 0 : g.call(n, tr, lt.YAxis);
    if (!o || typeof window > "u")
      return;
    let i = !1, s = 0;
    const l = () => {
      i = !1;
    }, u = (p) => {
      var x;
      i = !0, s = "touches" in p ? ((x = p.touches[0]) == null ? void 0 : x.clientY) ?? 0 : p.clientY;
    }, y = (p) => {
      var S;
      if (!i || !tt())
        return;
      const x = "touches" in p ? ((S = p.touches[0]) == null ? void 0 : S.clientY) ?? s : p.clientY;
      Math.abs(x - s) > 2 && In();
    }, m = () => {
      window.setTimeout(() => Z1(), 0);
    };
    return o.addEventListener("mousedown", u), o.addEventListener("touchstart", u, {
      passive: !0
    }), o.addEventListener("dblclick", m), document.addEventListener("mousemove", y), document.addEventListener("touchmove", y, {
      passive: !0
    }), document.addEventListener("mouseup", l), document.addEventListener("touchend", l), () => {
      o.removeEventListener("mousedown", u), o.removeEventListener("touchstart", u), o.removeEventListener("dblclick", m), document.removeEventListener("mousemove", y), document.removeEventListener("touchmove", y), document.removeEventListener("mouseup", l), document.removeEventListener("touchend", l);
    };
  }, p1 = (o) => ({
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
  })[o] || 1, Zt = (o, i = /* @__PURE__ */ new WeakSet()) => {
    if (o == null)
      return o;
    if (i.has(o))
      return "[Circular]";
    if (typeof o != "object")
      return o;
    if (i.add(o), Array.isArray(o))
      return o.map((l) => Zt(l, i));
    const s = {};
    for (const l in o)
      if (!(l === "__proto__" || l === "constructor" || l === "prototype"))
        try {
          const u = o[l];
          if (typeof u == "function")
            continue;
          s[l] = Zt(u, i);
        } catch (u) {
          s[l] = `[Error: ${u.message}]`;
        }
    return s;
  }, Mr = (o) => {
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
        extendData: Zt(o.extendData || {}),
        styles: Zt(o.styles || {}),
        visible: o.visible ?? !0,
        lock: o.lock ?? !1,
        mode: o.mode || Qn.Normal
      };
    } catch (i) {
      return console.error("Error extracting overlay data:", i), null;
    }
  }, v1 = (o) => {
    var i, s, l;
    try {
      const u = (i = n == null ? void 0 : n.getOverlayById) == null ? void 0 : i.call(n, o);
      if (!u)
        return;
      const y = Mr(u);
      if (y) {
        const m = Se.get(o), g = ((s = m == null ? void 0 : m.points) == null ? void 0 : s.length) || 0, p = ((l = y.points) == null ? void 0 : l.length) || 0;
        Se.set(o, y);
        const x = p1(y.type);
        if (p >= x) {
          const S = Be.get(o);
          S && !S.complete && (S.complete = !0, S.checkInterval && (clearInterval(S.checkInterval), S.checkInterval = void 0));
        }
      }
    } catch (u) {
      console.error(`Error updating overlay tracking for ${o}:`, u);
    }
  }, Li = (o, i) => {
    if (Be.has(o))
      return;
    const s = {
      monitoring: !0,
      complete: !1,
      lastPointCount: 0
    };
    Be.set(o, s), v1(o);
    const l = () => {
      v1(o);
    };
    document.addEventListener("mouseup", l), document.addEventListener("touchend", l), setTimeout(() => {
      var y;
      const u = Be.get(o);
      if (u && !u.complete) {
        u.checkInterval && clearInterval(u.checkInterval), u.mouseUpHandler && (document.removeEventListener("mouseup", u.mouseUpHandler), document.removeEventListener("touchend", u.mouseUpHandler)), v1(o);
        const m = Se.get(o);
        if (m) {
          const g = p1(m.type), p = ((y = m.points) == null ? void 0 : y.length) || 0;
          p < g && console.warn(`âš ï¸ ${m.type} ${o} has only ${p} point(s), should have ${g}`);
        }
      }
    }, 3e4);
  };
  let Dt = {
    saveDrawings: (o, i) => {
      try {
        const s = `kline_drawings_${o}`, u = {
          drawings: i.map((y) => {
            var x;
            const m = {
              ...y
            };
            m.extendData && (m.extendData = Zt(m.extendData)), m.styles && (m.styles = Zt(m.styles));
            const g = p1(y.type), p = ((x = y.points) == null ? void 0 : x.length) || 0;
            return p < g && console.warn(`âš ï¸ Saving ${y.type} with only ${p} point(s), needs ${g}`), m;
          }),
          timestamp: Date.now()
        };
        localStorage.setItem(s, JSON.stringify(u));
      } catch (s) {
        console.error("Library: Error saving drawings:", s);
      }
    },
    loadDrawings: (o) => {
      try {
        const i = `kline_drawings_${o}`, s = localStorage.getItem(i);
        if (s) {
          const l = JSON.parse(s), u = [];
          return Array.isArray(l.drawings) && l.drawings.forEach((y) => {
            var p;
            const m = p1(y.type);
            (((p = y.points) == null ? void 0 : p.length) || 0) >= m && u.push(y);
          }), u;
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
  const En = () => {
    const o = P();
    if (o != null && o.ticker) {
      const i = Array.from(Se.values());
      Dt.saveDrawings(o.ticker, i);
    }
  }, wi = (o) => {
    if (!o || !n)
      return;
    Se.forEach((s, l) => {
      var u;
      (u = n == null ? void 0 : n.removeOverlay) == null || u.call(n, {
        id: l
      });
    }), Se.clear(), Be.clear(), je(null), Ge(null), Dt.loadDrawings(o).forEach((s) => {
      var l;
      try {
        const u = b1({
          name: s.type,
          points: s.points || [],
          extendData: s.extendData,
          styles: s.styles,
          visible: s.visible ?? !0,
          lock: s.lock ?? !1,
          mode: s.mode || Qn.Normal
        }), y = n == null ? void 0 : n.createOverlay(u), m = typeof y == "string" ? y : null;
        m && (Se.set(m, {
          ...s,
          id: m
        }), Be.set(m, {
          monitoring: !1,
          complete: !0,
          lastPointCount: ((l = s.points) == null ? void 0 : l.length) || 0
        }));
      } catch (u) {
        console.error("Library: Error restoring drawing:", u);
      }
    });
  }, Bn = (o) => {
    var s, l;
    const i = {
      ...Ue(),
      ...o
    };
    if ("quickOrder" in o) {
      const u = o.quickOrder ?? !1;
      i.quickOrderFloatingWindow = u, i.quickOrderPlusButton = u;
    } else if ("priceLine" in o) {
      const u = o.priceLine ?? !1;
      i.marketPriceLine = u, i.countDown = u, i.bidAskPrice = u;
    } else
      "quickOrderFloatingWindow" in o || "quickOrderPlusButton" in o ? i.quickOrder = i.quickOrderFloatingWindow || i.quickOrderPlusButton : ("marketPriceLine" in o || "countDown" in o || "bidAskPrice" in o) && (i.priceLine = i.marketPriceLine || i.countDown || i.bidAskPrice);
    u1(i), o.orderPreviewLine === !1 && Fn(), (l = (s = e.orderTools) == null ? void 0 : s.onChange) == null || l.call(s, i);
  }, Sr = (o) => {
    var l, u, y, m, g, p;
    const i = Number((u = (l = o == null ? void 0 : o.points) == null ? void 0 : l[0]) == null ? void 0 : u.value);
    if (!Number.isFinite(i) || i <= 0)
      return;
    const s = ((y = o == null ? void 0 : o.extendData) == null ? void 0 : y.side) === "sell" || ((m = o == null ? void 0 : o.extendData) == null ? void 0 : m.side) === "buy" ? o.extendData.side : Dn();
    (p = (g = e.orderTools) == null ? void 0 : g.onOrderPreviewLineChange) == null || p.call(g, {
      price: i,
      side: s,
      symbol: P()
    });
  }, Fn = () => {
    var i;
    const o = Rt();
    o && ((i = n == null ? void 0 : n.removeOverlay) == null || i.call(n, {
      id: o
    }), Se.delete(o), Be.delete(o), d1(null));
  }, Ai = (o) => {
    var g, p;
    const i = Number(o.price);
    if (!n || !Number.isFinite(i) || i <= 0 || !Ue().orderPreviewLine) {
      Fn();
      return;
    }
    const s = o.side === "sell" ? "sell" : "buy";
    E1(s);
    const l = {
      side: s,
      label: o.label ?? "New Limit",
      showDragHint: !1,
      isOrderPreviewLine: !0
    }, u = Rt();
    if (u) {
      (g = n.overrideOverlay) == null || g.call(n, {
        id: u,
        points: [{
          value: i
        }],
        extendData: l
      });
      return;
    }
    const y = (p = n.createOverlay) == null ? void 0 : p.call(n, {
      name: "orderLine",
      points: [{
        value: i
      }],
      extendData: l,
      lock: !1,
      onPressedMoving: (x) => (Sr(x.overlay), !1),
      onPressedMoveEnd: (x) => (Sr(x.overlay), !1)
    }), m = typeof y == "string" ? y : null;
    m && (Se.delete(m), Be.delete(m), d1(m));
  }, H1 = (o) => {
    var s;
    const i = Math.min(Math.max(((s = P()) == null ? void 0 : s.pricePrecision) ?? 2, 0), 8);
    return o.toLocaleString(void 0, {
      minimumFractionDigits: i,
      maximumFractionDigits: i
    });
  }, Ti = () => {
    Z1();
  }, rt = (o = Date.now()) => {
    var it, at, st, Oo, Io, Eo;
    if (!n || !t || !Ue().countDown) {
      Kt(null);
      return;
    }
    n.setStyles({
      candle: {
        priceMark: {
          last: {
            show: !0,
            line: {
              show: Ue().marketPriceLine
            },
            text: {
              show: !1
            }
          }
        }
      }
    });
    const i = ((it = n.getDataList) == null ? void 0 : it.call(n)) ?? [], s = i[i.length - 1], l = Number(s == null ? void 0 : s.close);
    if (!s || !Number.isFinite(l) || l <= 0) {
      Kt(null);
      return;
    }
    const u = (at = n.convertToPixel) == null ? void 0 : at.call(n, [{
      value: l
    }], {
      paneId: "candle_pane",
      absolute: !0
    }), y = Number((st = u == null ? void 0 : u[0]) == null ? void 0 : st.y), m = (Oo = n.getSize) == null ? void 0 : Oo.call(n, "candle_pane"), g = (m == null ? void 0 : m.height) ?? t.clientHeight;
    if (!Number.isFinite(y) || y < 0 || y > g) {
      Kt(null);
      return;
    }
    const p = Math.min(Math.max(((Io = P()) == null ? void 0 : Io.pricePrecision) ?? 2, 0), 8), x = l.toLocaleString(void 0, {
      minimumFractionDigits: p,
      maximumFractionDigits: p
    }), S = (Eo = n.getSize) == null ? void 0 : Eo.call(n, "candle_pane", lt.YAxis), te = S != null && S.width && Number.isFinite(S.width) ? Math.max(74, Math.floor(S.width) - 2) : 96, ie = cn(V()), ae = o % ie, q = ae === 0 ? ie : ie - ae, fe = Number(s.close), _e = Number(s.open), ke = n.getStyles().candle.priceMark.last, Pe = ke.text, X = Number(Pe.size) || 12, xe = Number(Pe.paddingTop) || 2, pe = Number(Pe.paddingBottom) || 2, De = Math.min(Number(Pe.paddingLeft) || 4, 3), Oe = Math.min(Number(Pe.paddingRight) || 4, 3), ot = Math.max(34, X * 2 + xe + pe + 6), dt = Math.max(0, Math.min(y - ot / 2, g - ot));
    Kt({
      top: dt,
      width: Math.min(te, Math.max(62, x.length * (X * 0.56) + De + Oe + 4)),
      priceText: x,
      text: By(q),
      color: Number.isFinite(fe) && Number.isFinite(_e) && fe < _e ? ke.downColor : ke.upColor,
      textSize: X,
      textFamily: Pe.family,
      textWeight: Pe.weight,
      paddingLeft: De,
      paddingRight: Oe,
      paddingTop: xe,
      paddingBottom: pe,
      borderRadius: Number(Pe.borderRadius) || 2
    });
  }, Mi = (o) => {
    var s, l;
    const i = Number(o == null ? void 0 : o.y);
    if (!Number.isFinite(i))
      return NaN;
    try {
      const u = n == null ? void 0 : n.convertFromPixel([{
        x: (o == null ? void 0 : o.x) ?? 0,
        y: i
      }], {
        paneId: "candle_pane"
      }), y = Number((s = u == null ? void 0 : u[0]) == null ? void 0 : s.value);
      if (Number.isFinite(y) && y > 0)
        return y;
    } catch {
    }
    try {
      const u = n == null ? void 0 : n.convertFromPixel([{
        x: (o == null ? void 0 : o.x) ?? 0,
        y: i
      }], {
        paneId: "candle_pane",
        absolute: !0
      }), y = Number((l = u == null ? void 0 : u[0]) == null ? void 0 : l.value);
      if (Number.isFinite(y) && y > 0)
        return y;
    } catch {
    }
    return NaN;
  }, Pr = (o) => {
    var y;
    if (!Ue().quickOrderPlusButton || (o == null ? void 0 : o.paneId) !== "candle_pane" || !t) {
      if (O1() || yt())
        return;
      Vt(null), ct(!1);
      return;
    }
    const i = (y = n == null ? void 0 : n.getSize) == null ? void 0 : y.call(n, "candle_pane", lt.YAxis);
    i != null && i.width && Number.isFinite(i.width) && Pn(Math.max(44, Math.ceil(i.width)));
    const s = Number(o.y), l = Mi(o), u = t.clientHeight;
    if (!Number.isFinite(s) || !Number.isFinite(l) || l <= 0 || s < 0 || s > u) {
      if (O1() || yt())
        return;
      Vt(null), ct(!1);
      return;
    }
    jt = {
      ...o
    }, Vt({
      y: s,
      price: l
    });
  }, Ht = () => {
    var o;
    if (jt)
      try {
        (o = n == null ? void 0 : n.executeAction) == null || o.call(n, Nt.OnCrosshairChange, jt);
      } catch {
      }
  }, Un = (o) => {
    var s, l;
    const i = Tt() ?? $t();
    i && ((l = (s = e.orderTools) == null ? void 0 : s.onQuickOrderAction) == null || l.call(s, {
      action: o,
      price: i.price,
      symbol: P()
    }), ct(!1), Ct(null), Qe(!1));
  }, Si = async () => {
    var i;
    const o = Tt() ?? $t();
    if (o) {
      try {
        await ((i = navigator.clipboard) == null ? void 0 : i.writeText(String(o.price)));
      } catch {
      }
      ct(!1), Ct(null), Qe(!1);
    }
  }, Pi = () => {
    const o = Tt() ?? $t();
    o && (n == null || n.createOverlay(b1({
      name: "horizontalStraightLine",
      points: [{
        value: o.price
      }],
      lock: !1
    })), ct(!1), Ct(null), Qe(!1));
  }, Di = (o) => {
    var g, p, x, S, te, ie;
    const i = (p = (g = t == null ? void 0 : t.parentElement) == null ? void 0 : g.getBoundingClientRect) == null ? void 0 : p.call(g), s = (x = t == null ? void 0 : t.getBoundingClientRect) == null ? void 0 : x.call(t), l = o == null ? void 0 : o.overlay, u = (S = l == null ? void 0 : l.points) == null ? void 0 : S[0];
    let y = 72, m = 40;
    if (i) {
      if (Number.isFinite(o == null ? void 0 : o.pageX) ? y = o.pageX - i.left : Number.isFinite(o == null ? void 0 : o.x) && s && (y = s.left - i.left + o.x), Number.isFinite(o == null ? void 0 : o.pageY))
        m = o.pageY - i.top;
      else if (Number.isFinite(o == null ? void 0 : o.y) && s)
        m = s.top - i.top + o.y;
      else if (Number.isFinite(u == null ? void 0 : u.value))
        try {
          const ae = (te = n == null ? void 0 : n.convertToPixel) == null ? void 0 : te.call(n, [{
            value: u.value
          }], {
            paneId: "candle_pane",
            absolute: !0
          }), q = Number((ie = ae == null ? void 0 : ae[0]) == null ? void 0 : ie.y);
          Number.isFinite(q) && (m = q - i.top);
        } catch {
        }
    }
    return {
      x: Math.max(12, Math.min(y - 28, ((i == null ? void 0 : i.width) ?? 360) - 320)),
      y: Math.max(8, m - 52)
    };
  }, zn = (o) => {
    var g, p, x, S, te, ie, ae, q;
    const i = o == null ? void 0 : o.overlay;
    if (!(i != null && i.id) || i.name !== "horizontalStraightLine")
      return !1;
    const s = Di(o), l = Number((p = (g = i.styles) == null ? void 0 : g.line) == null ? void 0 : p.size) || 3, u = ((S = (x = i.styles) == null ? void 0 : x.line) == null ? void 0 : S.style) ?? Re.Solid, y = Array.isArray((ie = (te = i.styles) == null ? void 0 : te.line) == null ? void 0 : ie.dashedValue) ? i.styles.line.dashedValue : [], m = ((q = (ae = i.styles) == null ? void 0 : ae.line) == null ? void 0 : q.color) ?? "#2f6df6";
    return je({
      id: i.id,
      x: s.x,
      y: s.y,
      lineSize: l,
      lineStyle: u,
      dashedValue: y,
      color: m,
      locked: i.lock ?? !1,
      visible: i.visible ?? !0
    }), !1;
  }, Dr = (o) => {
    var s, l;
    const i = (s = o == null ? void 0 : o.overlay) == null ? void 0 : s.id;
    return (!i || ((l = Ze()) == null ? void 0 : l.id) === i) && (je(null), Ge(null)), !1;
  }, b1 = (o) => {
    var m, g, p, x, S, te, ie, ae, q;
    if (o.name !== "horizontalStraightLine")
      return o;
    const i = o.onClick, s = o.onSelected, l = o.onDeselected, u = o.onRemoved, y = o.onPressedMoveEnd;
    return {
      ...o,
      styles: {
        ...o.styles,
        line: {
          ...(m = o.styles) == null ? void 0 : m.line,
          size: Number((p = (g = o.styles) == null ? void 0 : g.line) == null ? void 0 : p.size) || 3,
          style: ((S = (x = o.styles) == null ? void 0 : x.line) == null ? void 0 : S.style) ?? Re.Solid,
          dashedValue: ((ie = (te = o.styles) == null ? void 0 : te.line) == null ? void 0 : ie.dashedValue) ?? [6, 4],
          color: ((q = (ae = o.styles) == null ? void 0 : ae.line) == null ? void 0 : q.color) ?? "#2f6df6"
        }
      },
      onClick: (fe) => (zn(fe), (i == null ? void 0 : i(fe)) ?? !1),
      onSelected: (fe) => (zn(fe), (s == null ? void 0 : s(fe)) ?? !1),
      onPressedMoveEnd: (fe) => (zn(fe), (y == null ? void 0 : y(fe)) ?? !1),
      onDeselected: (fe) => (Dr(fe), (l == null ? void 0 : l(fe)) ?? !1),
      onRemoved: (fe) => (Dr(fe), (u == null ? void 0 : u(fe)) ?? !1)
    };
  }, Ni = () => {
    var i;
    const o = Ze();
    o && ((i = n == null ? void 0 : n.removeOverlay) == null || i.call(n, {
      id: o.id
    }), je(null), Ge(null));
  }, Yt = (o) => {
    var s;
    const i = Ze();
    i && ((s = n == null ? void 0 : n.overrideOverlay) == null || s.call(n, {
      id: i.id,
      ...o
    }), setTimeout(() => {
      v1(i.id), En();
    }, 0));
  }, Oi = () => {
    const o = Ze();
    if (!o)
      return;
    const i = !o.locked;
    Yt({
      lock: i
    }), je({
      ...o,
      locked: i
    });
  }, Ii = () => {
    const o = Ze();
    if (!o)
      return;
    const i = !o.visible;
    Yt({
      visible: i
    }), je({
      ...o,
      visible: i
    });
  }, Ei = (o) => {
    const i = Ze();
    i && (Yt({
      styles: {
        line: {
          size: o
        }
      }
    }), je({
      ...i,
      lineSize: o
    }), Ge(null));
  }, Vn = (o, i) => {
    const s = Ze();
    s && (Yt({
      styles: {
        line: {
          style: o,
          dashedValue: i
        }
      }
    }), je({
      ...s,
      lineStyle: o,
      dashedValue: i
    }), Ge(null));
  }, Bi = () => {
    const o = Ze();
    if (!o)
      return;
    const i = 1, s = Re.Solid, l = [6, 4], u = "#2f6df6";
    Yt({
      styles: {
        line: {
          size: i,
          style: s,
          dashedValue: l,
          color: u
        }
      }
    }), je({
      ...o,
      lineSize: i,
      lineStyle: s,
      dashedValue: l,
      color: u
    }), Ge(null);
  }, Fi = (o) => {
    const i = Ze();
    i && (Yt({
      styles: {
        line: {
          color: o
        }
      }
    }), je({
      ...i,
      color: o
    }));
  }, Ui = (o) => {
    var x, S;
    const i = Ze();
    if (!i || !t)
      return;
    o.preventDefault(), o.stopPropagation(), Ge(null);
    const s = (S = (x = t.parentElement) == null ? void 0 : x.getBoundingClientRect) == null ? void 0 : S.call(x);
    if (!s)
      return;
    const l = o.clientX, u = o.clientY, y = i.x, m = i.y, g = (te) => {
      te.preventDefault();
      const ie = y + te.clientX - l, ae = m + te.clientY - u;
      je({
        ...i,
        x: Math.max(8, Math.min(ie, s.width - 320)),
        y: Math.max(8, Math.min(ae, s.height - 48))
      });
    }, p = () => {
      document.removeEventListener("mousemove", g), document.removeEventListener("mouseup", p);
    };
    document.addEventListener("mousemove", g), document.addEventListener("mouseup", p);
  }, zi = () => {
    ct(!1), Ct(null), Qe(!1);
  }, Nr = (o) => {
    var s, l;
    if (!yt())
      return;
    const i = o.target;
    (s = i == null ? void 0 : i.closest) != null && s.call(i, ".klinecharts-pro-quick-order-marker") || (l = i == null ? void 0 : i.closest) != null && l.call(i, ".klinecharts-pro-quick-order-menu-anchor") || zi();
  };
  let Or = (bo = e.orderTools) == null ? void 0 : bo.quickOrder, Ir = ($o = e.orderTools) == null ? void 0 : $o.quickOrderFloatingWindow, Er = (_o = e.orderTools) == null ? void 0 : _o.quickOrderPlusButton, Br = (ko = e.orderTools) == null ? void 0 : ko.openOrders, Fr = (xo = e.orderTools) == null ? void 0 : xo.openOrdersExtendedPriceLine, Ur = (Lo = e.orderTools) == null ? void 0 : Lo.openOrdersDisplay, zr = (wo = e.orderTools) == null ? void 0 : wo.positions, Vr = (Ao = e.orderTools) == null ? void 0 : Ao.breakevenPrice, Rr = (To = e.orderTools) == null ? void 0 : To.liquidationPrice, Kr = (Mo = e.orderTools) == null ? void 0 : Mo.priceLine, jr = (So = e.orderTools) == null ? void 0 : So.marketPriceLine, Qr = (Po = e.orderTools) == null ? void 0 : Po.countDown, Zr = (Do = e.orderTools) == null ? void 0 : Do.bidAskPrice, Hr = (No = e.orderTools) == null ? void 0 : No.orderHistory;
  He(() => {
    var fe, _e, ke, Pe, X, xe, pe, De, Oe, ot, dt, it, at, st;
    const o = (fe = e.orderTools) == null ? void 0 : fe.quickOrder, i = (_e = e.orderTools) == null ? void 0 : _e.quickOrderFloatingWindow, s = (ke = e.orderTools) == null ? void 0 : ke.quickOrderPlusButton, l = (Pe = e.orderTools) == null ? void 0 : Pe.openOrders, u = (X = e.orderTools) == null ? void 0 : X.openOrdersExtendedPriceLine, y = (xe = e.orderTools) == null ? void 0 : xe.openOrdersDisplay, m = (pe = e.orderTools) == null ? void 0 : pe.positions, g = (De = e.orderTools) == null ? void 0 : De.breakevenPrice, p = (Oe = e.orderTools) == null ? void 0 : Oe.liquidationPrice, x = (ot = e.orderTools) == null ? void 0 : ot.priceLine, S = (dt = e.orderTools) == null ? void 0 : dt.marketPriceLine, te = (it = e.orderTools) == null ? void 0 : it.countDown, ie = (at = e.orderTools) == null ? void 0 : at.bidAskPrice, ae = (st = e.orderTools) == null ? void 0 : st.orderHistory, q = {};
    typeof o == "boolean" && o !== Or && (Or = o, q.quickOrder = o, typeof i != "boolean" && (q.quickOrderFloatingWindow = o), typeof s != "boolean" && (q.quickOrderPlusButton = o)), typeof i == "boolean" && i !== Ir && (Ir = i, q.quickOrderFloatingWindow = i), typeof s == "boolean" && s !== Er && (Er = s, q.quickOrderPlusButton = s), typeof l == "boolean" && l !== Br && (Br = l, q.openOrders = l), typeof u == "boolean" && u !== Fr && (Fr = u, q.openOrdersExtendedPriceLine = u), y !== void 0 && y !== Ur && (Ur = y, q.openOrdersDisplay = y), typeof m == "boolean" && m !== zr && (zr = m, q.positions = m), typeof g == "boolean" && g !== Vr && (Vr = g, q.breakevenPrice = g), typeof p == "boolean" && p !== Rr && (Rr = p, q.liquidationPrice = p), typeof x == "boolean" && x !== Kr && (Kr = x, q.priceLine = x, typeof S != "boolean" && (q.marketPriceLine = x), typeof te != "boolean" && (q.countDown = x), typeof ie != "boolean" && (q.bidAskPrice = x)), typeof S == "boolean" && S !== jr && (jr = S, q.marketPriceLine = S), typeof te == "boolean" && te !== Qr && (Qr = te, q.countDown = te), typeof ie == "boolean" && ie !== Zr && (Zr = ie, q.bidAskPrice = ie), typeof ae == "boolean" && ae !== Hr && (Hr = ae, q.orderHistory = ae), Object.keys(q).length > 0 && Bn(q);
  }), He(() => {
    Ue().marketPriceLine, Ue().countDown, V(), P(), n == null || n.setStyles({
      candle: {
        priceMark: {
          last: {
            show: !0,
            line: {
              show: Ue().marketPriceLine
            },
            text: {
              show: !Ue().countDown
            }
          }
        }
      }
    }), Te(!0), rt();
  }), e.ref({
    setTheme: v,
    getTheme: () => h(),
    setStyles: b,
    getStyles: () => n.getStyles(),
    setLocale: E,
    getLocale: () => w(),
    setTimezone: (o) => {
      M({
        key: o,
        text: x0(e.timezone, w())
      });
    },
    getTimezone: () => se().key,
    setSymbol: oe,
    getSymbol: () => P(),
    setPeriod: R,
    getPeriod: () => V(),
    getMainIndicators: () => re(),
    getSubIndicators: () => ve(),
    setMainIndicators: G,
    setSubIndicators: W,
    overrideIndicator: (o, i) => {
      n == null || n.overrideIndicator(o, i), Te(!0);
    },
    createOverlay: (o) => {
      var s;
      const i = (s = n == null ? void 0 : n.createOverlay) == null ? void 0 : s.call(n, b1(o));
      return typeof i == "string" ? (Te(!0), i) : null;
    },
    removeOverlay: (o) => {
      var i;
      if ((i = n == null ? void 0 : n.removeOverlay) == null || i.call(n, o), o.id) {
        Se.delete(o.id);
        const s = Be.get(o.id);
        s && (s.checkInterval && clearInterval(s.checkInterval), s.mouseUpHandler && (document.removeEventListener("mouseup", s.mouseUpHandler), document.removeEventListener("touchend", s.mouseUpHandler)), Be.delete(o.id)), En();
      }
      Te(!0);
    },
    removeAllOverlay: () => {
      Se.forEach((o, i) => {
        var l;
        (l = n == null ? void 0 : n.removeOverlay) == null || l.call(n, {
          id: i
        });
        const s = Be.get(i);
        s && (s.checkInterval && clearInterval(s.checkInterval), s.mouseUpHandler && (document.removeEventListener("mouseup", s.mouseUpHandler), document.removeEventListener("touchend", s.mouseUpHandler)));
      }), Se.clear(), Be.clear(), Te(!0);
    },
    getAllOverlay: () => Array.from(Se.values()),
    getOverlay: (o) => Se.get(o) || null,
    overrideOverlay: (o) => {
      n && "overrideOverlay" in n && typeof n.overrideOverlay == "function" ? (n.overrideOverlay(o), Te(!0)) : console.warn("overrideOverlay method not available on widget");
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
    setTimezoneModalVisible: J,
    setSettingModalVisible: Q,
    setTimeToolsModalVisible: (o) => {
      o && Ae(Date.now()), k(o);
    },
    getOrderToolsState: () => Ue(),
    setOrderToolsState: (o) => {
      Bn(o);
    },
    setOrderPreviewLine: Ai,
    clearOrderPreviewLine: Fn,
    dispose: () => {
      t && Bo(t);
    },
    resize: () => {
      n && "resize" in n && typeof n.resize == "function" ? n.resize() : console.warn("resize method not available on widget");
    },
    getSettings: () => {
      var s, l, u, y, m, g, p, x, S, te, ie, ae, q, fe, _e, ke;
      if (!n)
        return {};
      const o = n.getStyles(), i = (s = o.candle) == null ? void 0 : s.bar;
      return {
        // Candle settings
        candleType: (l = o.candle) == null ? void 0 : l.type,
        candleBarStyle: i == null ? void 0 : i.style,
        // bar.style might be LineType
        showLastPrice: (m = (y = (u = o.candle) == null ? void 0 : u.priceMark) == null ? void 0 : y.last) == null ? void 0 : m.show,
        showHighestPrice: (x = (p = (g = o.candle) == null ? void 0 : g.priceMark) == null ? void 0 : p.high) == null ? void 0 : x.show,
        showLowestPrice: (ie = (te = (S = o.candle) == null ? void 0 : S.priceMark) == null ? void 0 : te.low) == null ? void 0 : ie.show,
        // Indicator settings
        showIndicatorLastValue: (q = (ae = o.indicator) == null ? void 0 : ae.lastValueMark) == null ? void 0 : q.show,
        // Axis settings - yAxis.reverse is boolean according to YAxisStyle interface
        priceAxisType: (fe = o.yAxis) == null ? void 0 : fe.type,
        reverseCoordinate: (_e = o.yAxis) == null ? void 0 : _e.reverse,
        // Grid settings
        showGrids: (ke = o.grid) == null ? void 0 : ke.show,
        timestamp: Date.now()
      };
    },
    setSettings: (o) => {
      var s, l, u, y, m, g, p, x, S, te, ie, ae, q, fe;
      if (!n)
        return;
      const i = {};
      if (o.candleType !== void 0 && (i.candle = {
        ...i.candle,
        type: o.candleType
      }), o.candleBarStyle !== void 0) {
        const _e = ((s = i.candle) == null ? void 0 : s.bar) || {};
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
          ...(l = i.candle) == null ? void 0 : l.priceMark,
          last: {
            ...(y = (u = i.candle) == null ? void 0 : u.priceMark) == null ? void 0 : y.last,
            show: o.showLastPrice,
            text: {
              ...(p = (g = (m = i.candle) == null ? void 0 : m.priceMark) == null ? void 0 : g.last) == null ? void 0 : p.text,
              show: o.showLastPrice && !Ue().countDown
            }
          }
        }
      }), o.showHighestPrice !== void 0 && (i.candle = {
        ...i.candle,
        priceMark: {
          ...(x = i.candle) == null ? void 0 : x.priceMark,
          high: {
            ...(te = (S = i.candle) == null ? void 0 : S.priceMark) == null ? void 0 : te.high,
            show: o.showHighestPrice
          }
        }
      }), o.showLowestPrice !== void 0 && (i.candle = {
        ...i.candle,
        priceMark: {
          ...(ie = i.candle) == null ? void 0 : ie.priceMark,
          low: {
            ...(q = (ae = i.candle) == null ? void 0 : ae.priceMark) == null ? void 0 : q.low,
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
      }), kt(i), n.setStyles(i);
    },
    resetSettings: () => {
      var s, l, u, y, m, g, p;
      if (!n)
        return;
      n.getStyles();
      const o = {
        candle: {
          type: ca.CandleSolid,
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
          type: ua.Normal,
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
      }, i = F();
      if (i) {
        const x = {
          candle: {
            type: (s = i.candle) == null ? void 0 : s.type,
            bar: (l = i.candle) == null ? void 0 : l.bar,
            priceMark: (u = i.candle) == null ? void 0 : u.priceMark
          },
          indicator: {
            lastValueMark: (y = i.indicator) == null ? void 0 : y.lastValueMark
          },
          yAxis: {
            type: (m = i.yAxis) == null ? void 0 : m.type,
            reverse: (g = i.yAxis) == null ? void 0 : g.reverse
          },
          grid: {
            show: (p = i.grid) == null ? void 0 : p.show
          }
        };
        kt(x), n.setStyles(x);
      } else
        kt(o), n.setStyles(o);
    },
    autoScalePriceAxis: () => {
      Ti();
    },
    setAutoScaleEnabled: (o) => {
      o ? Z1() : In();
    },
    getAutoScaleEnabled: () => tt(),
    getCurrentPriceRange: () => R1() ?? ze(),
    getManualPriceRange: () => z1(),
    setAutoScalePriceLines: (o, i = []) => {
      const s = `${o || "default"}`, l = i.filter((u) => Number.isFinite(u) && u > 0);
      l.length > 0 ? Qt.set(s, l) : Qt.delete(s), Te(!0);
    },
    // === Drawing Methods ===
    saveDrawings: (o) => {
      const i = Array.from(Se.values());
      i.forEach((s, l) => {
        var m;
        const u = p1(s.type), y = ((m = s.points) == null ? void 0 : m.length) || 0;
        y < u && console.warn(`âš ï¸ ${s.type} ${s.id} has only ${y} point(s), should have ${u}`);
      }), Dt.saveDrawings(o, i);
    },
    loadDrawings: (o) => {
      Dt.loadDrawings(o).forEach((s, l) => {
        var u;
        try {
          const y = {
            name: s.type,
            points: s.points || [],
            extendData: s.extendData,
            styles: s.styles,
            visible: s.visible ?? !0,
            lock: s.lock ?? !1,
            mode: s.mode ?? Qn.Normal
          }, m = n == null ? void 0 : n.createOverlay(y), g = typeof m == "string" ? m : null;
          g && (Se.set(g, {
            ...s,
            id: g
          }), Be.set(g, {
            monitoring: !1,
            complete: !0,
            lastPointCount: ((u = s.points) == null ? void 0 : u.length) || 0
          }));
        } catch (y) {
          console.error(`   âŒ Error restoring ${s.type}:`, y);
        }
      });
    },
    getDrawings: (o) => Dt.loadDrawings(o),
    clearDrawings: (o) => {
      Dt.clearDrawings(o);
    },
    // Auto-save on overlay events
    enableAutoSave: (o, i = !0) => {
    }
  });
  const Yr = () => {
    n == null || n.resize(), Te(!0), rt(), Jr(), _t();
  };
  let Y1, W1, q1, $1 = !1, Wr = 0;
  const Vi = () => {
    if ($1 || Date.now() < Wr)
      return;
    const o = et();
    if (!o.enabled || o.anchorPoint === "date")
      return;
    const i = to(o.anchorPoint, o.timestamp);
    if (Number.isFinite(i) && i !== o.timestamp) {
      const s = {
        ...o,
        timestamp: i
      };
      gt(s), S0(s);
    }
  }, Ri = () => {
    q1 && window.clearTimeout(q1), q1 = window.setTimeout(() => {
      q1 = void 0, Vi();
    }, 80);
  }, qr = () => {
    Te(), rt(), Jr(), _t(), Ri();
  }, Gr = [Nt.OnVisibleRangeChange, Nt.OnZoom, Nt.OnScroll], Ki = (o) => {
    const i = new Date(o), s = i.getFullYear(), l = `${i.getMonth() + 1}`.padStart(2, "0"), u = `${i.getDate()}`.padStart(2, "0"), y = `${i.getHours()}`.padStart(2, "0"), m = `${i.getMinutes()}`.padStart(2, "0");
    return `${s}/${l}/${u} ${y}:${m}`;
  }, ji = (o) => {
    var m;
    const i = ((m = n == null ? void 0 : n.getDataList) == null ? void 0 : m.call(n)) ?? [];
    if (i.length === 0)
      return null;
    let s = i[0], l = 0, u = Number(s == null ? void 0 : s.timestamp), y = Math.abs(u - o);
    for (let g = 1; g < i.length; g += 1) {
      const p = i[g], x = Number(p == null ? void 0 : p.timestamp);
      if (!Number.isFinite(x))
        continue;
      const S = Math.abs(x - o);
      S < y && (s = p, l = g, u = x, y = S);
    }
    return s && Number.isFinite(u) ? {
      candle: s,
      dataIndex: l
    } : null;
  }, Qi = (o) => {
    var s;
    const i = ((s = n == null ? void 0 : n.getDataList) == null ? void 0 : s.call(n)) ?? [];
    if (i.length === 0 || !Number.isFinite(o))
      return null;
    for (let l = 0; l < i.length; l += 1) {
      const u = i[l];
      if (Number(u == null ? void 0 : u.timestamp) === o)
        return {
          candle: u,
          dataIndex: l
        };
    }
    return null;
  }, G1 = (o) => {
    var s;
    const i = ((s = n == null ? void 0 : n.getDataList) == null ? void 0 : s.call(n)) ?? [];
    return i.length === 0 || !Number.isFinite(o) || o < 0 ? -1 : Math.max(0, Math.min(i.length - 1, o + 1));
  }, Xr = (o) => {
    var ie, ae, q;
    if (!n || !t)
      return null;
    const i = ji(o), s = i == null ? void 0 : i.candle, l = Number((s == null ? void 0 : s.timestamp) ?? o), u = Number((s == null ? void 0 : s.high) ?? (s == null ? void 0 : s.close) ?? (s == null ? void 0 : s.open)), y = i ? G1(i.dataIndex) : void 0, m = i && Number.isFinite(u) ? {
      dataIndex: y,
      value: u
    } : {
      timestamp: l
    }, g = (ie = n.convertToPixel) == null ? void 0 : ie.call(n, [m], {
      paneId: "candle_pane",
      absolute: !0
    }), p = Number((ae = g == null ? void 0 : g[0]) == null ? void 0 : ae.x), x = Number((q = g == null ? void 0 : g[0]) == null ? void 0 : q.y), S = t.clientWidth, te = t.clientHeight;
    return !Number.isFinite(p) || p < -80 || p > S + 80 ? null : {
      timestamp: l,
      text: Ki(l),
      left: Math.max(58, Math.min(p, S - 58)),
      top: Number.isFinite(x) ? Math.max(8, Math.min(x - 42, te - 38)) : 10
    };
  }, Jr = () => {
    const o = h1();
    if (!o || !n || !t)
      return;
    const i = Xr(o.timestamp);
    i && F1(i);
  }, X1 = (o, i = 0) => {
    if (!n || !t)
      return;
    const s = Xr(o);
    if (s) {
      F1(s);
      return;
    }
    i < 6 && (W1 = window.setTimeout(() => X1(o, i + 1), 80));
  }, Rn = (o, i, s) => {
    let l = i, u = l;
    switch (o.timespan) {
      case "minute": {
        l = l - l % (60 * 1e3), u = l - s * o.multiplier * 60 * 1e3;
        break;
      }
      case "hour": {
        l = l - l % (60 * 60 * 1e3), u = l - s * o.multiplier * 60 * 60 * 1e3;
        break;
      }
      case "day": {
        l = l - l % (60 * 60 * 1e3), u = l - s * o.multiplier * 24 * 60 * 60 * 1e3;
        break;
      }
      case "week": {
        const m = new Date(l).getDay(), g = m === 0 ? 6 : m - 1;
        l = l - g * 60 * 60 * 24;
        const p = new Date(l);
        l = (/* @__PURE__ */ new Date(`${p.getFullYear()}-${p.getMonth() + 1}-${p.getDate()}`)).getTime(), u = s * o.multiplier * 7 * 24 * 60 * 60 * 1e3;
        break;
      }
      case "month": {
        const y = new Date(l), m = y.getFullYear(), g = y.getMonth() + 1;
        l = (/* @__PURE__ */ new Date(`${m}-${g}-01`)).getTime(), u = s * o.multiplier * 30 * 24 * 60 * 60 * 1e3;
        const p = new Date(u);
        u = (/* @__PURE__ */ new Date(`${p.getFullYear()}-${p.getMonth() + 1}-01`)).getTime();
        break;
      }
      case "year": {
        const m = new Date(l).getFullYear();
        l = (/* @__PURE__ */ new Date(`${m}-01-01`)).getTime(), u = s * o.multiplier * 365 * 24 * 60 * 60 * 1e3;
        const g = new Date(u);
        u = (/* @__PURE__ */ new Date(`${g.getFullYear()}-01-01`)).getTime();
        break;
      }
    }
    return [u, l];
  }, Zi = (o, i = 500) => {
    const s = cn(V()), l = Math.max(1, Math.floor(i / 2)) * s;
    return {
      from: o - l,
      to: o + l
    };
  }, Hi = (o, i, s = 600) => {
    const l = cn(i), u = Math.max(120, s);
    let y = 0.5;
    o.anchorPoint === "left" ? y = 0.12 : o.anchorPoint === "right" && (y = 0.88);
    const m = Math.max(20, Math.floor(u * y)), g = Math.max(20, u - m);
    return {
      from: o.timestamp - m * l,
      to: Math.min(Date.now(), o.timestamp + g * l)
    };
  }, Yi = (o) => {
    const i = new Date(o.from), s = new Date(o.to);
    return {
      from: new Date(i.getFullYear(), i.getMonth(), i.getDate(), 0, 0, 0, 0).getTime(),
      to: new Date(s.getFullYear(), s.getMonth(), s.getDate(), 23, 59, 59, 999).getTime()
    };
  }, Wi = (o, i) => {
    const s = Math.min(i.from, i.to), l = Math.max(i.from, i.to);
    return o.filter((u) => {
      const y = Number(u.timestamp);
      return y >= s && y <= l;
    });
  }, qi = (o, i) => {
    var l;
    const s = Math.max(i.from, i.to);
    for (let u = o.length - 1; u >= 0; u -= 1) {
      const y = Number((l = o[u]) == null ? void 0 : l.timestamp);
      if (Number.isFinite(y) && y <= s)
        return y;
    }
    return s;
  }, Gi = (o, i) => {
    var l;
    const s = Math.max(i.from, i.to);
    for (let u = o.length - 1; u >= 0; u -= 1) {
      const y = Number((l = o[u]) == null ? void 0 : l.timestamp);
      if (Number.isFinite(y) && y <= s)
        return u;
    }
    return o.length - 1;
  }, Xi = (o, i) => {
    const s = cn(i), l = Math.abs(o.to - o.from), u = Math.max(1, Math.ceil(l / s) + 1), y = Math.max(u, 120) * s;
    return {
      from: o.from,
      to: Math.max(o.to, Math.min(Date.now(), o.to + y))
    };
  }, Ji = (o) => {
    var y, m;
    if (!n || !t || o.length === 0)
      return;
    const i = ((y = n.getSize("candle_pane", lt.YAxis)) == null ? void 0 : y.width) ?? 0, s = ((m = n.getSize("candle_pane", lt.Main)) == null ? void 0 : m.width) ?? t.clientWidth - i, l = Math.max(1, s - 8), u = Math.max(2, l / Math.max(1, o.length));
    n.setOffsetRightDistance(0), n.setLeftMinVisibleBarCount(0), n.setRightMinVisibleBarCount(0), n.setBarSpace(u);
  }, Kn = (o) => {
    var i;
    !n || !Number.isFinite(o) || ((i = n.scrollToTimestamp) == null || i.call(n, o, 250), requestAnimationFrame(() => X1(o)), rt());
  }, eo = (o, i = "floor") => {
    var y, m, g;
    const s = ((y = n == null ? void 0 : n.getDataList) == null ? void 0 : y.call(n)) ?? [];
    if (s.length === 0 || !Number.isFinite(o))
      return -1;
    if (i === "floor")
      for (let p = s.length - 1; p >= 0; p -= 1) {
        const x = Number((m = s[p]) == null ? void 0 : m.timestamp);
        if (Number.isFinite(x) && x <= o)
          return p;
      }
    let l = 0, u = 1 / 0;
    for (let p = 0; p < s.length; p += 1) {
      const x = Number((g = s[p]) == null ? void 0 : g.timestamp);
      if (!Number.isFinite(x))
        continue;
      const S = Math.abs(x - o);
      (S < u || S === u && x > o) && (u = S, l = p);
    }
    return u === 1 / 0 ? -1 : l;
  }, jn = (o) => {
    var p, x, S;
    if (!n || !t)
      return null;
    const i = (p = n.getDom) == null ? void 0 : p.call(n, "candle_pane", lt.Main), s = (x = i == null ? void 0 : i.getBoundingClientRect) == null ? void 0 : x.call(i), l = (S = r == null ? void 0 : r.getBoundingClientRect) == null ? void 0 : S.call(r), u = t.getBoundingClientRect(), y = s && Number.isFinite(s.left) ? s.left - ((l == null ? void 0 : l.left) ?? u.left) : u.left - ((l == null ? void 0 : l.left) ?? u.left), m = n.getSize("candle_pane", lt.Main), g = (s == null ? void 0 : s.width) ?? (m == null ? void 0 : m.width) ?? t.clientWidth;
    return o === "left" ? Math.max(8, y) : o === "center" ? y + g / 2 : o === "right" ? y + g : null;
  }, to = (o, i) => {
    var x, S, te, ie, ae, q;
    const s = jn(o), l = ((x = n == null ? void 0 : n.getDataList) == null ? void 0 : x.call(n)) ?? [];
    if (!n || s === null || l.length === 0)
      return i;
    const u = (S = n.convertFromPixel) == null ? void 0 : S.call(n, [{
      x: s,
      y: 0
    }], {
      paneId: "candle_pane",
      absolute: !0
    }), y = Number((te = u == null ? void 0 : u[0]) == null ? void 0 : te.dataIndex), m = Math.max(0, Math.min(l.length - 1, Number.isFinite(y) ? Math.round(y) : -1)), g = Qi(i);
    if (g) {
      const fe = G1(g.dataIndex), _e = (ie = n.convertToPixel) == null ? void 0 : ie.call(n, [{
        dataIndex: fe
      }], {
        paneId: "candle_pane",
        absolute: !0
      }), ke = Number((ae = _e == null ? void 0 : _e[0]) == null ? void 0 : ae.x), Pe = n.getBarSpace, X = typeof Pe == "function" ? Pe.call(n) : void 0, xe = Number(typeof X == "object" ? X == null ? void 0 : X.bar : X), pe = Number.isFinite(xe) ? Math.max(2, xe / 2) : 8;
      if (Number.isFinite(ke) && Math.abs(ke - s) <= pe)
        return i;
    }
    const p = Number((q = l[m]) == null ? void 0 : q.timestamp);
    return Number.isFinite(p) ? p : i;
  }, no = (o) => {
    if (!n || !Number.isFinite(o.timestamp))
      return;
    if ($1 = !0, Wr = Date.now() + 1e3, o.anchorPoint === "date") {
      Kn(o.timestamp), window.setTimeout(() => {
        $1 = !1;
      }, 1e3);
      return;
    }
    const i = eo(o.timestamp, "nearest"), s = G1(i), l = jn(o.anchorPoint);
    if (s < 0 || l === null) {
      Kn(o.timestamp), window.setTimeout(() => {
        $1 = !1;
      }, 1e3);
      return;
    }
    n.scrollToDataIndex(s, 0), requestAnimationFrame(() => {
      var m, g;
      const u = (m = n == null ? void 0 : n.convertToPixel) == null ? void 0 : m.call(n, [{
        dataIndex: s
      }], {
        paneId: "candle_pane",
        absolute: !0
      }), y = Number((g = u == null ? void 0 : u[0]) == null ? void 0 : g.x);
      Number.isFinite(y) && (n == null || n.scrollByDistance(l - y, 0)), requestAnimationFrame(() => {
        _t(o), X1(o.timestamp), window.setTimeout(() => {
          $1 = !1;
        }, 1e3);
      });
    }), rt();
  }, ea = (o) => {
    var m, g;
    if (!n || !t)
      return null;
    const i = jn(o.anchorPoint);
    if (i !== null)
      return i;
    const s = G1(eo(o.timestamp, "nearest")), l = s >= 0 ? {
      dataIndex: s
    } : {
      timestamp: o.timestamp
    }, u = (m = n.convertToPixel) == null ? void 0 : m.call(n, [l], {
      paneId: "candle_pane",
      absolute: !0
    }), y = Number((g = u == null ? void 0 : u[0]) == null ? void 0 : g.x);
    return !Number.isFinite(y) || y < -2 || y > t.clientWidth + 2 ? null : y;
  }, _t = (o) => {
    var S, te, ie, ae;
    const i = o ?? et();
    if (!n || !i.enabled || !i.anchorLine) {
      f1(null);
      return;
    }
    const s = ea(i), l = (S = n.getDom) == null ? void 0 : S.call(n, "candle_pane", lt.Main), u = (te = l == null ? void 0 : l.getBoundingClientRect) == null ? void 0 : te.call(l), y = (ie = r == null ? void 0 : r.getBoundingClientRect) == null ? void 0 : ie.call(r), m = (ae = t == null ? void 0 : t.getBoundingClientRect) == null ? void 0 : ae.call(t), g = n.getSize("candle_pane", lt.Main), p = u && Number.isFinite(u.top) ? u.top - ((y == null ? void 0 : y.top) ?? (m == null ? void 0 : m.top) ?? 0) : 0, x = Math.max(1, (u == null ? void 0 : u.height) ?? (g == null ? void 0 : g.height) ?? 0);
    if (s === null) {
      f1(null);
      return;
    }
    f1({
      left: s,
      top: p,
      height: x
    });
  }, ro = async (o, i) => {
    if (n) {
      f(!0), zt(!0);
      try {
        const s = V(), l = o.from <= o.to ? o : {
          from: o.to,
          to: o.from
        }, u = Yi(l), y = i ? u : Xi(u, s), m = await e.datafeed.getHistoryKLineData(P(), s, y.from, y.to), g = Wi(m, u);
        n.applyNewData(m, m.length > 0), Te(!0), Me(u), requestAnimationFrame(() => {
          const p = Gi(m, u);
          i ? Kn(i) : (Ji(g), n == null || n.scrollToDataIndex(p, 0), X1(qi(g, u))), _t();
        });
      } finally {
        f(!1), zt(!1);
      }
    }
  }, ta = async (o) => {
    Ae(o), await ro(Zi(o), o);
  }, na = (o) => {
    const s = {
      ...o,
      timestamp: (() => !n || o.anchorPoint === "date" ? o.timestamp : to(o.anchorPoint, o.timestamp))()
    };
    gt(s), S0(s), s.enabled ? (Ae(s.timestamp), requestAnimationFrame(() => {
      no(s), _t(s);
    })) : requestAnimationFrame(() => _t(s));
  };
  gr(() => {
    if (window.addEventListener("resize", Yr), n = la(t, {
      customApi: {
        formatDate: (m, g, p, x) => {
          switch (V().timespan) {
            case "minute":
              return x === en.XAxis ? N.formatDate(m, g, "HH:mm") : N.formatDate(m, g, "YYYY-MM-DD HH:mm");
            case "hour":
              return x === en.XAxis ? N.formatDate(m, g, "MM-DD HH:mm") : N.formatDate(m, g, "YYYY-MM-DD HH:mm");
            case "day":
            case "week":
              return N.formatDate(m, g, "YYYY-MM-DD");
            case "month":
              return x === en.XAxis ? N.formatDate(m, g, "YYYY-MM") : N.formatDate(m, g, "YYYY-MM-DD");
            case "year":
              return x === en.XAxis ? N.formatDate(m, g, "YYYY") : N.formatDate(m, g, "YYYY-MM-DD");
          }
          return N.formatDate(m, g, "YYYY-MM-DD HH:mm");
        }
      }
    }), n) {
      const m = n.getDom("candle_pane", lt.Main);
      if (m) {
        let p = document.createElement("div");
        if (p.className = "klinecharts-pro-watermark", N.isString(e.watermark)) {
          const x = e.watermark.replace(/(^\s*)|(\s*$)/g, "");
          p.innerHTML = x;
        } else
          p.appendChild(e.watermark);
        m.appendChild(p);
      }
      const g = n.getDom("candle_pane", lt.YAxis);
      a = document.createElement("span"), a.className = "klinecharts-pro-price-unit", g == null || g.appendChild(a), St = xi(), Te(!0);
    }
    let o = !1;
    const i = () => {
      const m = P();
      if (m != null && m.ticker)
        try {
          const g = Array.from(Se.values());
          Dt.saveDrawings(m.ticker, g);
        } catch (g) {
          console.error("âŒ Error refreshing local storage:", g);
        }
    }, s = (m) => {
      o || (o = !0, m.preventDefault());
    };
    setTimeout(() => {
      t && t.addEventListener("contextmenu", s);
    }, 1e3), document.addEventListener("contextmenu", (m) => {
      t && t.contains(m.target) && s(m);
    });
    const l = n == null ? void 0 : n.removeOverlay;
    n && l && (n.removeOverlay = function(...m) {
      const g = l.apply(this, m), p = m[0];
      let x;
      if (typeof p == "string" ? x = p : p && typeof p == "object" && p.id && (x = p.id), x) {
        Se.delete(x);
        const S = Be.get(x);
        S && (S.checkInterval && clearInterval(S.checkInterval), S.mouseUpHandler && (document.removeEventListener("mouseup", S.mouseUpHandler), document.removeEventListener("touchend", S.mouseUpHandler)), Be.delete(x)), i(), Te(!0);
      }
      return g;
    }), re().forEach((m) => {
      ln(n, m, !0, {
        id: "candle_pane"
      });
    });
    const u = {};
    e.subIndicators.forEach((m) => {
      const g = ln(n, m, !0);
      g && (u[m] = g);
    }), W(u), n == null || n.loadMore((m) => {
      f(!0), (async () => {
        try {
          const p = V(), [x] = Rn(p, m, 1), [S] = Rn(p, x, 500), te = await e.datafeed.getHistoryKLineData(P(), p, S, x);
          n == null || n.applyMoreData(te, te.length > 0), Te(!0);
        } finally {
          f(!1);
        }
      })();
    }), n == null || n.subscribeAction(Nt.OnTooltipIconClick, (m) => {
      if (m.indicatorName)
        switch (m.iconId) {
          case "visible": {
            n == null || n.overrideIndicator({
              name: m.indicatorName,
              visible: !0
            }, m.paneId), Te(!0);
            const g = m.paneId === "candle_pane" ? "main" : "sub";
            _(m.indicatorName, m.paneId, g, "change");
            break;
          }
          case "invisible": {
            n == null || n.overrideIndicator({
              name: m.indicatorName,
              visible: !1
            }, m.paneId), Te(!0);
            const g = m.paneId === "candle_pane" ? "main" : "sub";
            _(m.indicatorName, m.paneId, g, "change");
            break;
          }
          case "setting": {
            const g = n == null ? void 0 : n.getIndicatorByPaneId(m.paneId, m.indicatorName);
            y1({
              visible: !0,
              indicatorName: m.indicatorName,
              paneId: m.paneId,
              calcParams: g.calcParams
            });
            break;
          }
          case "close":
            if (m.paneId === "candle_pane") {
              const g = [...re()];
              n == null || n.removeIndicator("candle_pane", m.indicatorName), Te(!0), g.splice(g.indexOf(m.indicatorName), 1), G(g), _(m.indicatorName, "candle_pane", "main", "remove");
            } else {
              const g = {
                ...ve()
              };
              n == null || n.removeIndicator(m.paneId, m.indicatorName), Te(!0), delete g[m.indicatorName], W(g), _(m.indicatorName, m.paneId, "sub", "remove");
            }
        }
    }), n == null || n.subscribeAction(Nt.OnCrosshairChange, Pr), Gr.forEach((m) => {
      n == null || n.subscribeAction(m, qr);
    }), Y1 = window.setInterval(() => rt(), 1e3), rt(), document.addEventListener("mousedown", Nr);
    const y = n == null ? void 0 : n.createOverlay;
    n && y && (n.createOverlay = function(...m) {
      var S;
      const g = b1(m[0]), p = y.apply(this, [g, ...m.slice(1)]), x = typeof p == "string" ? p : null;
      return x && !((S = g.extendData) != null && S.isOrderPreviewLine) && (Li(x, g.name || "unknown"), v1(x), En(), Te(!0)), p;
    });
  }), Lt(() => {
    window.removeEventListener("resize", Yr), n == null || n.unsubscribeAction(Nt.OnCrosshairChange, Pr), Gr.forEach((o) => {
      n == null || n.unsubscribeAction(o, qr);
    }), Y1 && (window.clearInterval(Y1), Y1 = void 0), W1 && (window.clearTimeout(W1), W1 = void 0), ut && (window.clearTimeout(ut), ut = void 0), pt && (window.cancelAnimationFrame(pt), pt = void 0), St == null || St(), St = void 0, document.removeEventListener("mousedown", Nr), Be.clear(), Se.clear(), Bo(t);
  }), He(() => {
    const o = P();
    o != null && o.priceCurrency ? (a.innerHTML = o == null ? void 0 : o.priceCurrency.toLocaleUpperCase(), a.style.display = "flex") : a.style.display = "none", n == null || n.setPriceVolumePrecision((o == null ? void 0 : o.pricePrecision) ?? 2, (o == null ? void 0 : o.volumePrecision) ?? 0);
  });
  const ra = (o) => {
    const i = new Date(o), s = i.getFullYear(), l = `${i.getMonth() + 1}`.padStart(2, "0"), u = `${i.getDate()}`.padStart(2, "0"), y = `${i.getHours()}`.padStart(2, "0"), m = `${i.getMinutes()}`.padStart(2, "0"), g = `${s}-${l}-${u}`;
    switch (V().timespan) {
      case "minute":
      case "hour":
        return `${g} ${y}:${m}`;
      case "day":
      case "week":
        return g;
      case "month":
        return g;
      case "year":
        return g;
    }
    return `${g} ${y}:${m}`;
  }, oa = (o, i) => {
    var p, x;
    const {
      current: s
    } = o, l = i.tooltip.text.color, u = s.close > s.open ? i.bar.upColor : s.close < s.open ? i.bar.downColor : i.bar.noChangeColor, y = Math.min(Math.max(((p = P()) == null ? void 0 : p.pricePrecision) ?? 2, 0), 8), m = Math.min(Math.max(((x = P()) == null ? void 0 : x.volumePrecision) ?? 0, 0), 8), g = (S) => ({
      text: N.formatPrecision(S, y),
      color: u
    });
    return [{
      title: "time",
      value: {
        text: ra(s.timestamp),
        color: l
      }
    }, {
      title: "open",
      value: g(s.open)
    }, {
      title: "high",
      value: g(s.high)
    }, {
      title: "low",
      value: g(s.low)
    }, {
      title: "close",
      value: g(s.close)
    }, {
      title: "volume",
      value: {
        text: N.formatBigNumber(N.formatPrecision(s.volume ?? i.tooltip.defaultValue, m)),
        color: u
      }
    }];
  }, J1 = () => {
    n == null || n.setStyles({
      candle: {
        tooltip: {
          custom: oa,
          rect: {
            offsetLeft: 0,
            paddingLeft: 0
          }
        }
      }
    });
  };
  return He((o) => {
    const i = P(), s = V();
    let l = !0;
    return Lt(() => {
      l = !1;
    }), o && e.datafeed.unsubscribe(o.symbol, o.period), f(!0), zt(!0), (async () => {
      try {
        const y = ft(et), m = y.enabled && (!o || o.symbol.ticker === i.ticker || y.acrossTokens), g = m ? Hi(y, s) : null, [p, x] = g ? [g.from, g.to] : Rn(s, (/* @__PURE__ */ new Date()).getTime(), 500), S = await e.datafeed.getHistoryKLineData(i, s, p, x);
        if (!l)
          return;
        n == null || n.applyNewData(S, S.length > 0), Te(!0), m ? requestAnimationFrame(() => {
          no(y), _t(y);
        }) : _t(), rt(), setTimeout(() => {
          l && (wi(i == null ? void 0 : i.ticker), rt());
        }, 0), e.datafeed.subscribe(i, s, (te) => {
          n == null || n.updateData(te), Te(), rt();
        });
      } finally {
        l && (f(!1), zt(!1));
      }
    })(), {
      symbol: i,
      period: s
    };
  }), He(() => {
    const o = h();
    n == null || n.setStyles(o);
    const i = o === "dark" ? "#929AA5" : "#76808F";
    J1(), n == null || n.setStyles({
      indicator: {
        tooltip: {
          icons: [{
            id: "visible",
            position: tn.Middle,
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
            position: tn.Middle,
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
            position: tn.Middle,
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
            position: tn.Middle,
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
  }), He(() => {
    n == null || n.setLocale(w());
  }), He(() => {
    n == null || n.setTimezone(se().key);
  }), He(() => {
    if (L()) {
      kt(L()), n == null || n.setStyles(L()), le(pc(n.getStyles()));
      const o = ce();
      if (o) {
        I(o);
        const i = ye(o);
        kt(i), n == null || n.setStyles(i);
      }
      J1();
    }
  }), [py.cloneNode(!0), A(Of, {
    get locale() {
      return e.locale;
    },
    get symbol() {
      return P();
    },
    get spread() {
      return Ut();
    },
    get period() {
      return V();
    },
    get periods() {
      return e.periods;
    },
    onMenuClick: async () => {
      try {
        await Oa(() => s1(!Ut())), n == null || n.resize();
      } catch {
      }
    },
    onSymbolClick: () => {
      S1(!l1());
    },
    get onMobilePeriodClick() {
      return e.onMobilePeriodClick;
    },
    onMobileMoreClick: () => {
      e.onMobileMoreClick ? e.onMobileMoreClick() : N1(!0);
    },
    onPeriodChange: R,
    onTimeToolsClick: () => {
      Ae(Date.now()), k(!0);
    },
    onIndicatorClick: () => {
      Z((o) => !o);
    },
    onTimezoneClick: () => {
      J((o) => !o);
    },
    onSettingClick: () => {
      Q((o) => !o);
    },
    onScreenshotClick: () => {
      if (n) {
        const o = e.screenshotBackgroundColor || (e.theme === "dark" ? "#11131E" : "#ffffff"), i = n.getConvertPictureUrl(!0, "jpeg", o);
        ge(i);
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
      return Ue();
    },
    onOrderToolsStateChange: Bn
  }), (() => {
    const o = vy.cloneNode(!0), i = o.firstChild, s = i.nextSibling;
    return o.addEventListener("mouseleave", () => {
      Vt(null), Qe(!1);
    }), xt((l) => r = l, o), i.$$click = (l) => {
      l.preventDefault(), l.stopPropagation(), ki();
    }, i.$$mousedown = (l) => {
      l.preventDefault(), l.stopPropagation();
    }, C(o, A(de, {
      get when() {
        return P1();
      },
      get children() {
        return A(fi, {});
      }
    }), s), C(o, A(de, {
      get when() {
        return Ut();
      },
      get children() {
        return A(dg, {
          get locale() {
            return e.locale;
          },
          onDrawingItemClick: (l) => {
            n == null || n.createOverlay(b1(l));
          },
          onModeChange: (l) => {
            n == null || n.overrideOverlay({
              mode: l
            });
          },
          onLockChange: (l) => {
            n == null || n.overrideOverlay({
              lock: l
            });
          },
          onVisibleChange: (l) => {
            n == null || n.overrideOverlay({
              visible: l
            });
          },
          onRemoveClick: (l) => {
            n == null || n.removeOverlay({
              groupId: l
            });
          }
        });
      }
    }), s), xt((l) => t = l, s), C(o, A(de, {
      get when() {
        return U1();
      },
      keyed: !0,
      children: (l) => (() => {
        const u = by.cloneNode(!0);
        return z((y) => {
          const m = `${l.left}px`, g = `${l.top}px`, p = `${l.height}px`;
          return m !== y._v$6 && u.style.setProperty("left", y._v$6 = m), g !== y._v$7 && u.style.setProperty("top", y._v$7 = g), p !== y._v$8 && u.style.setProperty("height", y._v$8 = p), y;
        }, {
          _v$6: void 0,
          _v$7: void 0,
          _v$8: void 0
        }), u;
      })()
    }), null), C(o, A(de, {
      get when() {
        return h1();
      },
      keyed: !0,
      children: (l) => (() => {
        const u = $y.cloneNode(!0);
        return C(u, () => l.text), z((y) => {
          const m = `${l.left}px`, g = `${l.top}px`;
          return m !== y._v$9 && u.style.setProperty("left", y._v$9 = m), g !== y._v$10 && u.style.setProperty("top", y._v$10 = g), y;
        }, {
          _v$9: void 0,
          _v$10: void 0
        }), u;
      })()
    }), null), C(o, A(de, {
      get when() {
        return B1();
      },
      keyed: !0,
      children: (l) => (() => {
        const u = _y.cloneNode(!0), y = u.firstChild, m = y.nextSibling;
        return u.style.setProperty("right", "0px"), C(y, () => l.priceText), C(m, () => l.text), z((g) => {
          const p = `${l.top}px`, x = `${l.width}px`, S = l.color, te = `${l.borderRadius}px`, ie = l.textFamily, ae = l.textWeight, q = `${l.paddingLeft}px`, fe = `${l.paddingRight}px`, _e = `${l.paddingTop}px`, ke = `${l.paddingBottom}px`, Pe = `${l.textSize}px`, X = `${Math.max(10, l.textSize - 1)}px`;
          return p !== g._v$11 && u.style.setProperty("top", g._v$11 = p), x !== g._v$12 && u.style.setProperty("width", g._v$12 = x), S !== g._v$13 && u.style.setProperty("background", g._v$13 = S), te !== g._v$14 && u.style.setProperty("border-radius", g._v$14 = te), ie !== g._v$15 && u.style.setProperty("font-family", g._v$15 = ie), ae !== g._v$16 && u.style.setProperty("font-weight", g._v$16 = ae), q !== g._v$17 && u.style.setProperty("padding-left", g._v$17 = q), fe !== g._v$18 && u.style.setProperty("padding-right", g._v$18 = fe), _e !== g._v$19 && u.style.setProperty("padding-top", g._v$19 = _e), ke !== g._v$20 && u.style.setProperty("padding-bottom", g._v$20 = ke), Pe !== g._v$21 && y.style.setProperty("font-size", g._v$21 = Pe), X !== g._v$22 && m.style.setProperty("font-size", g._v$22 = X), g;
        }, {
          _v$11: void 0,
          _v$12: void 0,
          _v$13: void 0,
          _v$14: void 0,
          _v$15: void 0,
          _v$16: void 0,
          _v$17: void 0,
          _v$18: void 0,
          _v$19: void 0,
          _v$20: void 0,
          _v$21: void 0,
          _v$22: void 0
        }), u;
      })()
    }), null), C(o, A(de, {
      get when() {
        return Ze();
      },
      keyed: !0,
      children: (l) => (() => {
        const u = wy.cloneNode(!0), y = u.firstChild, m = y.nextSibling, g = m.nextSibling, p = g.firstChild, x = g.nextSibling, S = x.firstChild, te = S.firstChild, ie = te.nextSibling, ae = ie.firstChild, q = x.nextSibling, fe = q.firstChild, _e = q.nextSibling, ke = _e.nextSibling, Pe = ke.nextSibling;
        return u.$$click = (X) => {
          X.stopPropagation();
        }, u.$$mousedown = (X) => {
          X.preventDefault(), X.stopPropagation();
        }, y.$$mousedown = Ui, m.$$click = Bi, p.$$click = () => Ge(qe() === "color" ? null : "color"), C(g, A(de, {
          get when() {
            return qe() === "color";
          },
          get children() {
            const X = ky.cloneNode(!0), xe = X.firstChild;
            return C(xe, A(A1, {
              each: m1,
              children: (pe) => (() => {
                const De = Ay.cloneNode(!0);
                return De.$$click = () => Fi(pe), De.style.setProperty("background", pe), z(() => me(De, `overlay-toolbar-color-swatch ${l.color.toLowerCase() === pe.toLowerCase() ? "selected" : ""}`)), De;
              })()
            })), X;
          }
        }), null), S.$$click = () => Ge(qe() === "width" ? null : "width"), C(ie, () => l.lineSize, ae), C(x, A(de, {
          get when() {
            return qe() === "width";
          },
          get children() {
            const X = xy.cloneNode(!0);
            return C(X, A(A1, {
              each: [1, 2, 3, 4],
              children: (xe) => (() => {
                const pe = Ty.cloneNode(!0), De = pe.firstChild;
                return pe.$$click = () => Ei(xe), De.style.setProperty("height", `${xe}px`), z(() => me(pe, l.lineSize === xe ? "selected" : "")), pe;
              })()
            })), X;
          }
        }), null), fe.$$click = () => Ge(qe() === "style" ? null : "style"), C(q, A(de, {
          get when() {
            return qe() === "style";
          },
          get children() {
            const X = Ly.cloneNode(!0), xe = X.firstChild, pe = xe.nextSibling, De = pe.nextSibling;
            return xe.$$click = () => Vn(Re.Solid, []), pe.$$click = () => Vn(Re.Dashed, [6, 4]), De.$$click = () => Vn(Re.Dashed, [2, 4]), z((Oe) => {
              var at, st;
              const ot = l.lineStyle === Re.Solid ? "selected" : "", dt = l.lineStyle === Re.Dashed && ((at = l.dashedValue) == null ? void 0 : at[0]) === 6 ? "selected" : "", it = l.lineStyle === Re.Dashed && ((st = l.dashedValue) == null ? void 0 : st[0]) === 2 ? "selected" : "";
              return ot !== Oe._v$23 && me(xe, Oe._v$23 = ot), dt !== Oe._v$24 && me(pe, Oe._v$24 = dt), it !== Oe._v$25 && me(De, Oe._v$25 = it), Oe;
            }, {
              _v$23: void 0,
              _v$24: void 0,
              _v$25: void 0
            }), X;
          }
        }), null), _e.$$click = Ii, ke.$$click = Oi, Pe.$$click = Ni, z((X) => {
          const xe = `${l.x}px`, pe = `${l.y}px`, De = `overlay-toolbar-icon edit ${qe() === "color" ? "active" : ""}`, Oe = `overlay-toolbar-line-size ${qe() === "width" ? "active" : ""}`, ot = `overlay-toolbar-icon minus ${qe() === "style" ? "active" : ""}`, dt = `overlay-toolbar-icon visibility ${l.visible ? "" : "muted"}`, it = l.visible ? "Hide" : "Show", at = `overlay-toolbar-icon lock ${l.locked ? "active" : ""}`, st = l.locked ? "Unlock" : "Lock";
          return xe !== X._v$26 && u.style.setProperty("left", X._v$26 = xe), pe !== X._v$27 && u.style.setProperty("top", X._v$27 = pe), De !== X._v$28 && me(p, X._v$28 = De), Oe !== X._v$29 && me(S, X._v$29 = Oe), ot !== X._v$30 && me(fe, X._v$30 = ot), dt !== X._v$31 && me(_e, X._v$31 = dt), it !== X._v$32 && Ne(_e, "title", X._v$32 = it), at !== X._v$33 && me(ke, X._v$33 = at), st !== X._v$34 && Ne(ke, "title", X._v$34 = st), X;
        }, {
          _v$26: void 0,
          _v$27: void 0,
          _v$28: void 0,
          _v$29: void 0,
          _v$30: void 0,
          _v$31: void 0,
          _v$32: void 0,
          _v$33: void 0,
          _v$34: void 0
        }), u;
      })()
    }), null), C(o, A(de, {
      get when() {
        return $t();
      },
      keyed: !0,
      children: (l) => (() => {
        const u = My.cloneNode(!0), y = u.firstChild;
        return u.addEventListener("mouseleave", () => {
          yt() || Qe(!1);
        }), u.$$mousemove = (m) => {
          m.stopPropagation(), Ht();
        }, u.addEventListener("mouseenter", () => {
          Qe(!0), Ht();
        }), y.$$click = (m) => {
          m.stopPropagation(), Qe(!0), Ct({
            y: l.y,
            price: l.price,
            yAxisWidth: I1()
          }), ct(!0), Ht();
        }, y.$$mousedown = (m) => {
          m.preventDefault(), m.stopPropagation(), Ht();
        }, C(y, (() => {
          const m = Y(() => {
            var g;
            return !!((g = e.orderTools) != null && g.quickOrderPlusIcon);
          });
          return () => m() ? (() => {
            const g = Sy.cloneNode(!0);
            return z(() => g.innerHTML = e.orderTools.quickOrderPlusIcon), g;
          })() : Py.cloneNode(!0);
        })()), z((m) => {
          const g = `${Math.max(0, l.y - 12)}px`, p = `${I1()}px`, x = Ue().quickOrderPlusButton ? "block" : "none";
          return g !== m._v$35 && u.style.setProperty("top", m._v$35 = g), p !== m._v$36 && u.style.setProperty("right", m._v$36 = p), x !== m._v$37 && u.style.setProperty("display", m._v$37 = x), m;
        }, {
          _v$35: void 0,
          _v$36: void 0,
          _v$37: void 0
        }), u;
      })()
    }), null), C(o, A(de, {
      get when() {
        return Y(() => !!yt())() && Tt();
      },
      keyed: !0,
      children: (l) => (() => {
        const u = Dy.cloneNode(!0), y = u.firstChild, m = y.firstChild, g = m.firstChild, p = g.nextSibling, x = p.nextSibling, S = x.nextSibling;
        S.nextSibling;
        const te = m.nextSibling, ie = te.firstChild, ae = ie.nextSibling, q = ae.nextSibling, fe = q.nextSibling;
        fe.nextSibling;
        const _e = te.nextSibling, ke = _e.nextSibling, Pe = ke.firstChild, X = Pe.nextSibling;
        X.nextSibling;
        const xe = ke.nextSibling;
        return xe.firstChild, u.addEventListener("mouseleave", () => Qe(!1)), u.addEventListener("mouseenter", () => Qe(!0)), y.$$mousemove = () => {
          Ht();
        }, y.$$mousedown = (pe) => {
          pe.preventDefault(), pe.stopPropagation(), Ht();
        }, m.$$click = () => Un("limit"), C(m, () => P().shortName ?? P().name ?? P().ticker, p), C(m, () => H1(l.price), S), te.$$click = () => Un("stop"), C(te, () => P().shortName ?? P().name ?? P().ticker, ae), C(te, () => H1(l.price), fe), _e.$$click = () => Un("create"), ke.$$click = Si, C(ke, () => H1(l.price), X), xe.$$click = Pi, C(xe, () => H1(l.price), null), z((pe) => {
          const De = `${Math.max(0, l.y + 24)}px`, Oe = `${l.yAxisWidth + Nn}px`;
          return De !== pe._v$38 && u.style.setProperty("top", pe._v$38 = De), Oe !== pe._v$39 && u.style.setProperty("right", pe._v$39 = Oe), pe;
        }, {
          _v$38: void 0,
          _v$39: void 0
        }), u;
      })()
    }), null), z((l) => {
      const u = `klinecharts-pro-auto-scale-button${tt() ? " active" : ""}`, y = tt(), m = tt(), g = tt() ? "Auto scale on" : "Auto scale off", p = Ut();
      return u !== l._v$ && me(i, l._v$ = u), y !== l._v$2 && Ne(i, "data-active", l._v$2 = y), m !== l._v$3 && Ne(i, "aria-pressed", l._v$3 = m), g !== l._v$4 && Ne(i, "title", l._v$4 = g), p !== l._v$5 && Ne(s, "data-drawing-bar-visible", l._v$5 = p), l;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0,
      _v$5: void 0
    }), o;
  })(), A(de, {
    get when() {
      return l1();
    },
    get children() {
      return A(Hg, {
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
          S1(!1);
        }
      });
    }
  }), A(de, {
    get when() {
      return he();
    },
    get children() {
      return A(hg, {
        get locale() {
          return e.locale;
        },
        get mainIndicators() {
          return re();
        },
        get subIndicators() {
          return ve();
        },
        onClose: () => {
          Z(!1);
        },
        onMainIndicatorChange: (o) => {
          const i = [...re()];
          o.added ? (ln(n, o.name, !0, {
            id: "candle_pane"
          }), i.push(o.name), _(o.name, "candle_pane", "main", "add")) : (n == null || n.removeIndicator("candle_pane", o.name), i.splice(i.indexOf(o.name), 1), _(o.name, "candle_pane", "main", "remove")), G(i), Te(!0);
        },
        onSubIndicatorChange: (o) => {
          const i = {
            ...ve()
          };
          if (o.added) {
            const s = ln(n, o.name);
            s && (i[o.name] = s, _(o.name, s, "sub", "add"));
          } else
            o.paneId && (n == null || n.removeIndicator(o.paneId, o.name), delete i[o.name], _(o.name, o.paneId, "sub", "remove"));
          W(i), Te(!0);
        }
      });
    }
  }), A(de, {
    get when() {
      return K();
    },
    get children() {
      return A(mg, {
        get locale() {
          return e.locale;
        },
        get timezone() {
          return se();
        },
        onClose: () => {
          J(!1);
        },
        onConfirm: M
      });
    }
  }), A(de, {
    get when() {
      return j();
    },
    get children() {
      return A(Bg, {
        get locale() {
          return e.locale;
        },
        get currentStyles() {
          return N.clone(n.getStyles());
        },
        get defaultStyles() {
          return F();
        },
        get currentBackgroundColor() {
          return O();
        },
        get defaultBackgroundColor() {
          return H();
        },
        onClose: () => {
          Q(!1);
        },
        onChange: (o) => {
          const i = o;
          I(i);
          const s = ye(i);
          kt(s), n == null || n.setStyles(s), n == null || n.resize(), J1();
        },
        onSaveChartStyle: (o) => {
          ee(o);
        },
        onResetChartStyle: () => {
          B(), t == null || t.style.removeProperty("--klinecharts-pro-chart-background-color");
        },
        onRestoreDefault: (o) => {
          const i = {};
          o.forEach((l) => {
            const u = l.key;
            if (u === "chart.backgroundColor") {
              Ie(i, u, H());
              return;
            }
            Ie(i, u, N.formatValue(F(), u));
          }), I(i);
          const s = ye(i);
          kt(s), n == null || n.setStyles(s), n == null || n.resize(), J1();
        }
      });
    }
  }), A(de, {
    get when() {
      return $e().length > 0;
    },
    get children() {
      return A(Ug, {
        get locale() {
          return e.locale;
        },
        get url() {
          return $e();
        },
        onClose: () => {
          ge("");
        }
      });
    }
  }), A(de, {
    get when() {
      return We();
    },
    get children() {
      return A(fy, {
        get initialTimestamp() {
          return Ce();
        },
        get initialRange() {
          return Je();
        },
        get anchorSettings() {
          return et();
        },
        onClose: () => {
          k(!1);
        },
        onGoToDate: ta,
        onTimeRange: (o) => {
          ro(o);
        },
        onTimeAnchorChange: na
      });
    }
  }), A(de, {
    get when() {
      return g1().visible;
    },
    get children() {
      return A(Kg, {
        get locale() {
          return e.locale;
        },
        get params() {
          return g1();
        },
        onClose: () => {
          y1({
            visible: !1,
            indicatorName: "",
            paneId: "",
            calcParams: []
          });
        },
        onConfirm: (o) => {
          const i = g1();
          n == null || n.overrideIndicator({
            name: i.indicatorName,
            calcParams: o
          }, i.paneId), Te(!0);
          const s = i.paneId === "candle_pane" ? "main" : "sub";
          _(i.indicatorName, i.paneId, s, "change");
        }
      });
    }
  }), A(de, {
    get when() {
      return D1();
    },
    get children() {
      return A(Wg, {
        get locale() {
          return e.locale;
        },
        onIndicatorClick: () => {
          Z(!0);
        },
        onTimezoneClick: () => {
          J(!0);
        },
        onSettingClick: () => {
          Q(!0);
        },
        onTimeToolsClick: () => {
          Ae(Date.now()), k(!0);
        },
        onClose: () => {
          N1(!1);
        }
      });
    }
  })];
};
Ye(["mousedown", "click", "mousemove"]);
const Uy = /* @__PURE__ */ $('<svg class="logo" viewBox="0 0 80 92"><path d="M28.148808359375,51.7280513671875L22.963588359375,51.7280513671875C21.572648359375002,51.7280513671875,20.445068359375,52.6220613671875,20.445068359375,53.7248813671875L20.445068359375,72.3979013671875C20.445068359375,73.5007013671875,21.572648359375002,74.39470136718751,22.963588359375,74.39470136718751L33.926568359375,74.39470136718751C35.317468359375,74.39470136718751,36.445068359375,73.5007013671875,36.445068359375,72.3979013671875L36.445068359375,53.7248813671875C36.445068359375,52.6220613671875,35.317468359375,51.7280513671875,33.926568359375,51.7280513671875L28.741398359374998,51.7280513671875L28.741398359374998,46.2963223671875C28.741398359374998,46.1665793671875,28.608748359375,46.0614013671875,28.445108359375,46.0614013671875C28.281468359375,46.0614013671875,28.148808359375,46.1665793671875,28.148808359375,46.2963223671875L28.148808359375,51.7280513671875ZM28.741398359374998,74.3948013671875L28.741398359374998,79.82650136718749C28.741398359374998,79.9563013671875,28.608748359375,80.0614013671875,28.445108359375,80.0614013671875C28.281468359375,80.0614013671875,28.148808359375,79.9563013671875,28.148808359375,79.82650136718749L28.148808359375,74.3948013671875L28.741398359374998,74.3948013671875Z"></path><path d="M51.148808359374996,44.7280513671875L45.963588359375,44.7280513671875C44.572648359375,44.7280513671875,43.445068359375,45.6220613671875,43.445068359375,46.7248813671875L43.445068359375,65.3979013671875C43.445068359375,66.5007013671875,44.572648359375,67.39470136718751,45.963588359375,67.39470136718751L56.926568359375,67.39470136718751C58.317468359375,67.39470136718751,59.445068359375,66.5007013671875,59.445068359375,65.3979013671875L59.445068359375,46.7248813671875C59.445068359375,45.6220613671875,58.317468359375,44.7280513671875,56.926568359375,44.7280513671875L51.741398359375,44.7280513671875L51.741398359375,39.2963223671875C51.741398359375,39.1665793671875,51.608748359375,39.0614013671875,51.445108359375,39.0614013671875C51.281468359375,39.0614013671875,51.148808359374996,39.1665793671875,51.148808359374996,39.2963223671875L51.148808359374996,44.7280513671875ZM51.741398359375,67.3948013671875L51.741398359375,72.82650136718749C51.741398359375,72.9563013671875,51.608748359375,73.0614013671875,51.445108359375,73.0614013671875C51.281468359375,73.0614013671875,51.148808359374996,72.9563013671875,51.148808359374996,72.82650136718749L51.148808359374996,67.3948013671875L51.741398359375,67.3948013671875Z"></path><path d="M17.7274,90.6541C17.5901,90.6541,17.4517,90.6436,17.3121,90.6225C9.93219,89.5095,4.80718,86.7136,2.07787,82.3084C-1.1223,77.1437,0.241766,71.6314,0.56829,70.5137C5.37624,46.647,15.0785,38.4945,21.5025,33.0957C22.9683,31.8633,24.2342,30.7995,25.1676,29.7672C25.4105,29.4984,25.6051,29.2154,25.7556,28.9202C24.7465,29.2231,24.1971,29.4326,24.1703,29.4429C22.908,29.9368,21.4777,29.3247,20.9761,28.076C20.4756,26.8272,21.0897,25.4146,22.352,24.9172C22.5042,24.8571,23.5312,24.4607,25.3073,23.9616C24.087,21.4425,21.7693,18.7949,19.7125,16.6431L19.2819,16.1902C16.2438,12.9776,14.6017,4.80159,14.3036,3.19471C14.1306,2.26212,14.4636,1.30796,15.1814,0.679657C15.8995,0.0512175,16.8976,-0.159672,17.8125,0.123747C22.7731,1.66274,24.2638,1.81255,27.2321,2.11098C28.7357,2.26195,29.83,3.59029,29.6762,5.07662C29.5236,6.56295,28.182,7.64786,26.6784,7.49454C24.4992,7.27569,22.9517,7.09896,20.724,6.56646C21.4493,9.09088,22.3803,11.5427,23.2771,12.4919L23.6876,12.9237C25.3757,14.69,28.9691,18.45,30.7016,22.7299C35.0392,21.9433,40.8791,21.3359,47.7817,21.7249C48.2004,20.7386,48.8054,19.7953,49.5907,18.9135C49.7137,18.7754,49.8498,18.6502,49.9988,18.539C53.6142,15.8508,57.5491,12.857,59.7803,11.0758C58.1028,11.2502,56.1034,11.0278,53.9124,9.70882C53.2439,9.30622,52.5992,8.89427,51.9662,8.48933C48.4668,6.25164,46.497,5.12109,43.4234,5.94853C41.9647,6.34058,40.4622,5.48975,40.0659,4.04789C39.6695,2.60604,40.5296,1.11853,41.9871,0.726471C47.5602,-0.773825,51.4796,1.73271,54.9364,3.9434L54.9364,3.9434C55.5284,4.32176,56.1318,4.70797,56.7564,5.08482C58.3843,6.06556,59.4858,5.76127,61.2899,5.13865C62.3511,4.77234,63.5567,4.35687,64.8675,4.53476C66.3321,4.73254,67.4406,5.56933,67.9103,6.83096C68.7444,9.07333,67.1035,11.5533,65.5797,13.2374C64.6729,14.2394,60.0845,17.7606,56.4519,20.4957C56.9477,20.3369,57.4767,20.2511,58.026,20.2511C59.4281,20.2511,60.6982,20.8102,61.621,21.7153C65.4948,20.6901,67.87,17.9563,67.9033,17.9175C68.78,16.8888,70.3322,16.7577,71.3721,17.6226C72.412,18.4886,72.5457,20.0253,71.6702,21.054C71.5221,21.2286,69.5063,23.5492,66.0787,25.233C69.5399,26.8822,72.9993,29.682,74.1841,34.4145C74.5106,35.7206,73.7062,37.0407,72.3859,37.3638C72.1871,37.4117,71.9884,37.4351,71.792,37.4351C70.687,37.4351,69.6826,36.6932,69.4046,35.5848C68.4378,31.7217,64.8144,29.7431,61.7619,28.7456C60.8298,29.7349,59.5009,30.3535,58.026,30.3535C55.8642,30.3535,54.0162,29.0245,53.2713,27.1474C53.2022,27.138,53.1331,27.1287,53.0642,27.1195C54.232,29.5936,57.0851,31.9259,58.1868,32.665C58.3157,32.7516,58.4423,32.8523,58.5547,32.9599C66.5865,40.6151,72.4887,48.8133,76.0971,57.3287C76.6815,58.7074,76.0249,60.2932,74.6313,60.8702C74.2976,61.01,73.9388,61.082,73.576,61.082C72.5065,61.082,71.4914,60.4582,71.0525,59.4213C67.7577,51.6455,62.331,44.1074,54.9203,37.0116C53.6073,36.1009,48.0984,31.9917,47.2065,26.583C40.9421,26.2679,35.6187,26.8278,31.6725,27.5336C31.6197,29.527,30.9225,31.5172,29.2456,33.3731C28.0614,34.6827,26.5968,35.915,25.0446,37.2188C21.9414,39.8269,18.2648,42.9169,14.8104,48.1192C11.356,53.3215,8.12389,60.6361,5.9098,71.6934C5.88732,71.8035,5.85893,71.9123,5.82344,72.0188C5.81634,72.041,4.57886,76.0413,6.77344,79.5289C8.6332,82.4828,12.4557,84.4139,18.1367,85.2705C19.6297,85.4953,20.6566,86.8762,20.4295,88.3532C20.2213,89.6944,19.0559,90.6541,17.7274,90.6541ZM35.1195,7.03101C33.3502,7.03101,31.9158,5.61208,31.9158,3.86173C31.9158,2.11139,33.3502,0.69245,35.1195,0.69245C36.8889,0.69245,38.3233,2.11139,38.3233,3.86173C38.3233,5.61208,36.8889,7.03101,35.1195,7.03101ZM57.6848,23.1892L58.414,24.4754C58.8984,24.3623,59.3923,24.3435,59.8644,24.4203C60.2191,24.5005,60.5087,24.7182,60.6663,25.0229C60.8636,25.3394,60.8993,25.7346,60.7646,26.1094C60.5988,26.5176,60.2972,26.8749,59.9085,27.1235L60.31,27.8316L59.7886,28.1294L59.3994,27.443C58.9257,27.7175,58.399,27.883,57.8664,27.9247L57.3744,27.0569C57.6378,27.0741,57.9071,27.048,58.1704,26.9797C58.4501,26.9251,58.7239,26.8323,58.9829,26.7044L58.2801,25.4647C57.8047,25.5877,57.3167,25.6065,56.8549,25.5197C56.4913,25.4263,56.196,25.1971,56.0328,24.8814C55.8433,24.5561,55.8127,24.1572,55.9484,23.7789C56.088,23.373,56.3763,23.0149,56.7584,22.7726L56.4166,22.1699L56.938,21.8721L57.2727,22.4625C57.6615,22.2376,58.0888,22.0901,58.5254,22.0301L59.0042,22.8746C58.5548,22.8828,58.103,22.9906,57.6848,23.1892ZM56.9319,24.2961Q57.1278,24.6417,57.7863,24.5856L57.1695,23.4978Q56.6982,23.884,56.9319,24.2961ZM58.9077,25.3462L59.4981,26.3875L59.499,26.3891Q59.9965,26.0045,59.7628,25.5923Q59.573,25.2576,58.9077,25.3462ZM73.2212,66.5065C73.2212,68.2569,74.6555,69.6758,76.4249,69.6758C78.1943,69.6758,79.6286,68.2569,79.6286,66.5065C79.6286,64.7562,78.1943,63.3372,76.4249,63.3372C74.6555,63.3372,73.2212,64.7562,73.2212,66.5065ZM35.9465,91.8045C35.0734,91.8045,34.2038,91.7987,33.3378,91.7858C31.827,91.7636,30.6203,90.5359,30.6428,89.0402C30.6653,87.5457,31.9158,86.3297,33.4183,86.3742C49.6344,86.6059,65.7512,84.6175,67.6134,84.037C72.1953,82.4184,74.5295,79.3603,74.5295,74.9575C74.5295,73.463,75.754,72.2517,77.2648,72.2517C78.7755,72.2517,80,73.463,80,74.9575C80,81.5992,76.148,86.7686,69.4317,89.142C67.0041,89.9999,51.0955,91.8046,35.9465,91.8045ZM25.2731,92C23.5037,92,22.0693,90.5811,22.0693,88.8307C22.0693,87.0804,23.5037,85.6615,25.2731,85.6615C27.0424,85.6615,28.4768,87.0804,28.4768,88.8307C28.4768,90.5811,27.0424,92,25.2731,92Z"></path></svg>'), zy = Uy.cloneNode(!0);
class Qy {
  constructor(t) {
    _1(this, "_chartApi", null);
    if (N.isString(t.container)) {
      if (this._container = document.getElementById(t.container), !this._container)
        throw new Error("Container is null");
    } else
      this._container = t.container;
    this._container.classList.add("klinecharts-pro"), this._container.setAttribute("data-theme", t.theme ?? "light");
    const r = this;
    Ka(() => A(Fy, {
      ref: (n) => {
        r._chartApi = n;
      },
      get styles() {
        return t.styles ?? {};
      },
      get watermark() {
        return t.watermark ?? zy;
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
    kt(t), this._chartApi.setStyles(t), (n = (r = this._chartApi).resize) == null || n.call(r);
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
  setAutoScaleEnabled(t) {
    var r, n;
    (n = (r = this._chartApi) == null ? void 0 : r.setAutoScaleEnabled) == null || n.call(r, t);
  }
  getAutoScaleEnabled() {
    var t, r;
    return ((r = (t = this._chartApi) == null ? void 0 : t.getAutoScaleEnabled) == null ? void 0 : r.call(t)) ?? !0;
  }
  getCurrentPriceRange() {
    var t, r;
    return ((r = (t = this._chartApi) == null ? void 0 : t.getCurrentPriceRange) == null ? void 0 : r.call(t)) ?? null;
  }
  getManualPriceRange() {
    var t, r;
    return ((r = (t = this._chartApi) == null ? void 0 : t.getManualPriceRange) == null ? void 0 : r.call(t)) ?? null;
  }
  setAutoScalePriceLines(t, r = []) {
    var n, a;
    (a = (n = this._chartApi) == null ? void 0 : n.setAutoScalePriceLines) == null || a.call(n, t, r);
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
Ma.forEach((e) => {
  da(e);
});
export {
  Ky as DefaultDatafeed,
  Qy as KLineChartPro,
  Cy as calculateAutoPriceRange,
  jy as loadLocales
};
//# sourceMappingURL=klinecharts-pro.js.map
