var ga = Object.defineProperty;
var ya = (e, t, r) => t in e ? ga(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var x1 = (e, t, r) => (ya(e, typeof t != "symbol" ? t + "" : t, r), r);
import { utils as D, registerFigure as Ca, PolygonType as Xt, LineType as Ve, OverlayMode as Yn, ActionType as Et, init as pa, FormatDateType as J1, DomPosition as Je, dispose as zo, TooltipIconPosition as en, CandleType as va, YAxisType as ba, registerOverlay as $a } from "klinecharts";
function S1(e, t, r) {
  const n = (e.x - t.x) * Math.cos(r) - (e.y - t.y) * Math.sin(r) + t.x, s = (e.x - t.x) * Math.sin(r) + (e.y - t.y) * Math.cos(r) + t.y;
  return { x: n, y: s };
}
function or(e, t) {
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
      y: D.getLinearYFromCoordinates(e[0], e[1], { x: 0, y: e[0].y })
    } : r = {
      x: t.width,
      y: D.getLinearYFromCoordinates(e[0], e[1], { x: t.width, y: e[0].y })
    }, { coordinates: [e[0], r] };
  }
  return [];
}
function O0(e, t) {
  const r = Math.abs(e.x - t.x), n = Math.abs(e.y - t.y);
  return Math.sqrt(r * r + n * n);
}
const _a = {
  name: "arrow",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = e[1].x > e[0].x ? 0 : 1, r = D.getLinearSlopeIntercept(e[0], e[1]);
      let n;
      r ? n = Math.atan(r[0]) + Math.PI * t : e[1].y > e[0].y ? n = Math.PI / 2 : n = Math.PI / 2 * 3;
      const s = S1({ x: e[1].x - 8, y: e[1].y + 4 }, e[1], n), c = S1({ x: e[1].x - 8, y: e[1].y - 4 }, e[1], n);
      return [
        {
          type: "line",
          attrs: { coordinates: e }
        },
        {
          type: "line",
          ignoreEvent: !0,
          attrs: { coordinates: [s, e[1], c] }
        }
      ];
    }
    return [];
  }
}, ka = {
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
      const t = O0(e[0], e[1]);
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
}, xa = {
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
}, La = {
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
}, wa = {
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
}, Aa = {
  name: "fibonacciCircle",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = Math.abs(e[0].x - e[1].x), r = Math.abs(e[0].y - e[1].y), n = Math.sqrt(t * t + r * r), s = [0.236, 0.382, 0.5, 0.618, 0.786, 1], c = [], f = [];
      return s.forEach((m) => {
        const v = n * m;
        c.push(
          { ...e[0], r: v }
        ), f.push({
          x: e[0].x,
          y: e[0].y + v + 6,
          text: `${(m * 100).toFixed(1)}%`
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
}, Sa = {
  name: "fibonacciSegment",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: r }) => {
    const n = [], s = [];
    if (e.length > 1) {
      const c = e[1].x > e[0].x ? e[0].x : e[1].x, f = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0], m = e[0].y - e[1].y, v = t.points, L = v[0].value - v[1].value;
      f.forEach(($) => {
        const w = e[1].y + m * $, E = (v[1].value + L * $).toFixed(r.price);
        n.push({ coordinates: [{ x: e[0].x, y: w }, { x: e[1].x, y: w }] }), s.push({
          x: c,
          y: w,
          text: `${E} (${($ * 100).toFixed(1)}%)`,
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
}, Ta = {
  name: "fibonacciSpiral",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, bounding: t }) => {
    if (e.length > 1) {
      const r = O0(e[0], e[1]) / Math.sqrt(24), n = e[1].x > e[0].x ? 0 : 1, s = D.getLinearSlopeIntercept(e[0], e[1]);
      let c;
      s ? c = Math.atan(s[0]) + Math.PI * n : e[1].y > e[0].y ? c = Math.PI / 2 : c = Math.PI / 2 * 3;
      const f = S1(
        { x: e[0].x - r, y: e[0].y },
        e[0],
        c
      ), m = S1(
        { x: e[0].x - r, y: e[0].y - r },
        e[0],
        c
      ), v = [{
        ...f,
        r,
        startAngle: c,
        endAngle: c + Math.PI / 2
      }, {
        ...m,
        r: r * 2,
        startAngle: c + Math.PI / 2,
        endAngle: c + Math.PI
      }];
      let L = e[0].x - r, $ = e[0].y - r;
      for (let w = 2; w < 9; w++) {
        const E = v[w - 2].r + v[w - 1].r;
        let Q = 0;
        switch (w % 4) {
          case 0: {
            Q = c, L -= v[w - 2].r;
            break;
          }
          case 1: {
            Q = c + Math.PI / 2, $ -= v[w - 2].r;
            break;
          }
          case 2: {
            Q = c + Math.PI, L += v[w - 2].r;
            break;
          }
          case 3: {
            Q = c + Math.PI / 2 * 3, $ += v[w - 2].r;
            break;
          }
        }
        const re = Q + Math.PI / 2, I = S1({ x: L, y: $ }, e[0], c);
        v.push({
          ...I,
          r: E,
          startAngle: Q,
          endAngle: re
        });
      }
      return [
        {
          type: "arc",
          attrs: v
        },
        {
          type: "line",
          attrs: or(e, t)
        }
      ];
    }
    return [];
  }
}, Ma = {
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
      const c = e[1].x > e[0].x ? -38 : 4, f = e[1].y > e[0].y ? -2 : 20, m = e[1].x - e[0].x, v = e[1].y - e[0].y;
      [1, 0.75, 0.618, 0.5, 0.382, 0.25, 0].forEach(($) => {
        const w = e[1].x - m * $, E = e[1].y - v * $;
        r.push({ coordinates: [{ x: w, y: e[0].y }, { x: w, y: e[1].y }] }), r.push({ coordinates: [{ x: e[0].x, y: E }, { x: e[1].x, y: E }] }), n = n.concat(or([e[0], { x: w, y: e[1].y }], t)), n = n.concat(or([e[0], { x: e[1].x, y: E }], t)), s.unshift({
          x: e[0].x + c,
          y: E + 10,
          text: `${$.toFixed(3)}`
        }), s.unshift({
          x: w - 18,
          y: e[0].y + f,
          text: `${$.toFixed(3)}`
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
}, Pa = {
  name: "fibonacciExtension",
  totalStep: 4,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: r }) => {
    const n = [], s = [];
    if (e.length > 2) {
      const c = t.points, f = c[1].value - c[0].value, m = e[1].y - e[0].y, v = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1], L = e[2].x > e[1].x ? e[1].x : e[2].x;
      v.forEach(($) => {
        const w = e[2].y + m * $, E = (c[2].value + f * $).toFixed(r.price);
        n.push({ coordinates: [{ x: e[1].x, y: w }, { x: e[2].x, y: w }] }), s.push({
          x: L,
          y: w,
          text: `${E} (${($ * 100).toFixed(1)}%)`,
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
}, Da = {
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
}, Na = {
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
}, Oa = {
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
}, Ia = {
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
}, Ea = {
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
}, Ba = {
  name: "abcd",
  totalStep: 5,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    let t = [], r = [];
    const n = ["A", "B", "C", "D"], s = e.map((c, f) => ({
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
        attrs: s
      }
    ];
  }
}, Fa = {
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
    const r = [], n = [], s = ["X", "A", "B", "C", "D"], c = e.map((f, m) => ({
      ...f,
      baseline: "bottom",
      text: `(${s[m]})`
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
}, Ua = [
  _a,
  ka,
  xa,
  wa,
  La,
  Aa,
  Sa,
  Ta,
  Ma,
  Pa,
  Da,
  Na,
  Oa,
  Ia,
  Ea,
  Ba,
  Fa
];
class tC {
  constructor(t) {
    x1(this, "_apiKey");
    x1(this, "_prevSymbolMarket");
    x1(this, "_ws");
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
    return await ((await (await fetch(`https://api.polygon.io/v2/aggs/ticker/${t.ticker}/range/${r.multiplier}/${r.timespan}/${n}/${s}?apiKey=${this._apiKey}`)).json()).results || []).map((m) => ({
      timestamp: m.t,
      open: m.o,
      high: m.h,
      low: m.l,
      close: m.c,
      volume: m.v,
      turnover: m.vw
    }));
  }
  subscribe(t, r, n) {
    var s, c;
    this._prevSymbolMarket !== t.market ? ((s = this._ws) == null || s.close(), this._ws = new WebSocket(`wss://delayed.polygon.io/${t.market}`), this._ws.onopen = () => {
      var f;
      (f = this._ws) == null || f.send(JSON.stringify({ action: "auth", params: this._apiKey }));
    }, this._ws.onmessage = (f) => {
      var v;
      const m = JSON.parse(f.data);
      m[0].ev === "status" ? m[0].status === "auth_success" && ((v = this._ws) == null || v.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` }))) : "sym" in m && n({
        timestamp: m.s,
        open: m.o,
        high: m.h,
        low: m.l,
        close: m.c,
        volume: m.v,
        turnover: m.vw
      });
    }) : (c = this._ws) == null || c.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` })), this._prevSymbolMarket = t.market;
  }
  unsubscribe(t, r) {
  }
}
const Ue = {};
function za(e) {
  Ue.context = e;
}
const Va = (e, t) => e === t, ir = Symbol("solid-proxy"), Ra = Symbol("solid-track"), dn = {
  equals: Va
};
let I0 = U0;
const gt = 1, hn = 2, E0 = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, Wn = {};
var Be = null;
let Ut = null, Te = null, Re = null, mt = null, yr = 0;
function T1(e, t) {
  const r = Te, n = Be, s = e.length === 0, c = s ? E0 : {
    owned: null,
    cleanups: null,
    context: null,
    owner: t === void 0 ? n : t
  }, f = s ? e : () => e(() => dt(() => kn(c)));
  Be = c, Te = null;
  try {
    return wt(f, !0);
  } finally {
    Te = r, Be = n;
  }
}
function M(e, t) {
  t = t ? Object.assign({}, dn, t) : dn;
  const r = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, n = (s) => (typeof s == "function" && (s = s(r.value)), F0(r, s));
  return [B0.bind(r), n];
}
function Vo(e, t, r) {
  const n = _n(e, t, !0, gt);
  t1(n);
}
function U(e, t, r) {
  const n = _n(e, t, !1, gt);
  t1(n);
}
function He(e, t, r) {
  I0 = Ya;
  const n = _n(e, t, !1, gt);
  n.user = !0, mt ? mt.push(n) : t1(n);
}
function H(e, t, r) {
  r = r ? Object.assign({}, dn, r) : dn;
  const n = _n(e, t, !0, 0);
  return n.observers = null, n.observerSlots = null, n.comparator = r.equals || void 0, t1(n), B0.bind(n);
}
function Ka(e, t, r) {
  let n, s, c;
  arguments.length === 2 && typeof t == "object" || arguments.length === 1 ? (n = !0, s = e, c = t || {}) : (n = e, s = t, c = r || {});
  let f = null, m = Wn, v = null, L = !1, $ = "initialValue" in c, w = typeof n == "function" && H(n);
  const E = /* @__PURE__ */ new Set(), [Q, re] = (c.storage || M)(c.initialValue), [I, K] = M(void 0), [z, ce] = M(void 0, {
    equals: !1
  }), [V, oe] = M($ ? "ready" : "unresolved");
  if (Ue.context) {
    v = `${Ue.context.id}${Ue.context.count++}`;
    let J;
    c.ssrLoadFrom === "initial" ? m = c.initialValue : Ue.load && (J = Ue.load(v)) && (m = J[0]);
  }
  function Y(J, ue, S, j) {
    return f === J && (f = null, $ = !0, (J === m || ue === m) && c.onHydrated && queueMicrotask(() => c.onHydrated(j, {
      value: ue
    })), m = Wn, ve(ue, S)), ue;
  }
  function ve(J, ue) {
    wt(() => {
      ue === void 0 && re(() => J), oe(ue !== void 0 ? "errored" : "ready"), K(ue);
      for (const S of E.keys())
        S.decrement();
      E.clear();
    }, !1);
  }
  function W() {
    const J = Qa, ue = Q(), S = I();
    if (S !== void 0 && !f)
      throw S;
    return Te && !Te.user && J && Vo(() => {
      z(), f && (J.resolved || E.has(J) || (J.increment(), E.add(J)));
    }), ue;
  }
  function R(J = !0) {
    if (J !== !1 && L)
      return;
    L = !1;
    const ue = w ? w() : n;
    if (ue == null || ue === !1) {
      Y(f, dt(Q));
      return;
    }
    const S = m !== Wn ? m : dt(() => s(ue, {
      value: Q(),
      refetching: J
    }));
    return typeof S != "object" || !(S && "then" in S) ? (Y(f, S, void 0, ue), S) : (f = S, L = !0, queueMicrotask(() => L = !1), wt(() => {
      oe($ ? "refreshing" : "pending"), ce();
    }, !1), S.then((j) => Y(S, j, void 0, ue), (j) => Y(S, void 0, V0(j), ue)));
  }
  return Object.defineProperties(W, {
    state: {
      get: () => V()
    },
    error: {
      get: () => I()
    },
    loading: {
      get() {
        const J = V();
        return J === "pending" || J === "refreshing";
      }
    },
    latest: {
      get() {
        if (!$)
          return W();
        const J = I();
        if (J && !f)
          throw J;
        return Q();
      }
    }
  }), w ? Vo(() => R(!1)) : R(!1), [W, {
    refetch: R,
    mutate: re
  }];
}
function dt(e) {
  if (Te === null)
    return e();
  const t = Te;
  Te = null;
  try {
    return e();
  } finally {
    Te = t;
  }
}
function Cr(e) {
  He(() => dt(e));
}
function Lt(e) {
  return Be === null || (Be.cleanups === null ? Be.cleanups = [e] : Be.cleanups.push(e)), e;
}
function ja(e) {
  const t = Te, r = Be;
  return Promise.resolve().then(() => {
    Te = t, Be = r;
    let n;
    return wt(e, !1), Te = Be = null, n ? n.done : void 0;
  });
}
let Qa;
function B0() {
  const e = Ut;
  if (this.sources && (this.state || e))
    if (this.state === gt || e)
      t1(this);
    else {
      const t = Re;
      Re = null, wt(() => mn(this), !1), Re = t;
    }
  if (Te) {
    const t = this.observers ? this.observers.length : 0;
    Te.sources ? (Te.sources.push(this), Te.sourceSlots.push(t)) : (Te.sources = [this], Te.sourceSlots = [t]), this.observers ? (this.observers.push(Te), this.observerSlots.push(Te.sources.length - 1)) : (this.observers = [Te], this.observerSlots = [Te.sources.length - 1]);
  }
  return this.value;
}
function F0(e, t, r) {
  let n = e.value;
  return (!e.comparator || !e.comparator(n, t)) && (e.value = t, e.observers && e.observers.length && wt(() => {
    for (let s = 0; s < e.observers.length; s += 1) {
      const c = e.observers[s], f = Ut && Ut.running;
      f && Ut.disposed.has(c), (f && !c.tState || !f && !c.state) && (c.pure ? Re.push(c) : mt.push(c), c.observers && z0(c)), f || (c.state = gt);
    }
    if (Re.length > 1e6)
      throw Re = [], new Error();
  }, !1)), t;
}
function t1(e) {
  if (!e.fn)
    return;
  kn(e);
  const t = Be, r = Te, n = yr;
  Te = Be = e, Za(e, e.value, n), Te = r, Be = t;
}
function Za(e, t, r) {
  let n;
  try {
    n = e.fn(t);
  } catch (s) {
    e.pure && (e.state = gt, e.owned && e.owned.forEach(kn), e.owned = null), R0(s);
  }
  (!e.updatedAt || e.updatedAt <= r) && (e.updatedAt != null && "observers" in e ? F0(e, n) : e.value = n, e.updatedAt = r);
}
function _n(e, t, r, n = gt, s) {
  const c = {
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
  return Be === null || Be !== E0 && (Be.owned ? Be.owned.push(c) : Be.owned = [c]), c;
}
function fn(e) {
  const t = Ut;
  if (e.state === 0 || t)
    return;
  if (e.state === hn || t)
    return mn(e);
  if (e.suspense && dt(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const r = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < yr); )
    (e.state || t) && r.push(e);
  for (let n = r.length - 1; n >= 0; n--)
    if (e = r[n], e.state === gt || t)
      t1(e);
    else if (e.state === hn || t) {
      const s = Re;
      Re = null, wt(() => mn(e, r[0]), !1), Re = s;
    }
}
function wt(e, t) {
  if (Re)
    return e();
  let r = !1;
  t || (Re = []), mt ? r = !0 : mt = [], yr++;
  try {
    const n = e();
    return Ha(r), n;
  } catch (n) {
    r || (mt = null), Re = null, R0(n);
  }
}
function Ha(e) {
  if (Re && (U0(Re), Re = null), e)
    return;
  const t = mt;
  mt = null, t.length && wt(() => I0(t), !1);
}
function U0(e) {
  for (let t = 0; t < e.length; t++)
    fn(e[t]);
}
function Ya(e) {
  let t, r = 0;
  for (t = 0; t < e.length; t++) {
    const n = e[t];
    n.user ? e[r++] = n : fn(n);
  }
  for (Ue.context && za(), t = 0; t < r; t++)
    fn(e[t]);
}
function mn(e, t) {
  const r = Ut;
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
    const s = e.sources[n];
    s.sources && (s.state === gt || r ? s !== t && fn(s) : (s.state === hn || r) && mn(s, t));
  }
}
function z0(e) {
  const t = Ut;
  for (let r = 0; r < e.observers.length; r += 1) {
    const n = e.observers[r];
    (!n.state || t) && (n.state = hn, n.pure ? Re.push(n) : mt.push(n), n.observers && z0(n));
  }
}
function kn(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const r = e.sources.pop(), n = e.sourceSlots.pop(), s = r.observers;
      if (s && s.length) {
        const c = s.pop(), f = r.observerSlots.pop();
        n < s.length && (c.sourceSlots[f] = n, s[n] = c, r.observerSlots[n] = f);
      }
    }
  if (e.owned) {
    for (t = 0; t < e.owned.length; t++)
      kn(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = 0; t < e.cleanups.length; t++)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function V0(e) {
  return e instanceof Error || typeof e == "string" ? e : new Error("Unknown error");
}
function R0(e) {
  throw e = V0(e), e;
}
const Wa = Symbol("fallback");
function Ro(e) {
  for (let t = 0; t < e.length; t++)
    e[t]();
}
function qa(e, t, r = {}) {
  let n = [], s = [], c = [], f = 0, m = t.length > 1 ? [] : null;
  return Lt(() => Ro(c)), () => {
    let v = e() || [], L, $;
    return v[Ra], dt(() => {
      let E = v.length, Q, re, I, K, z, ce, V, oe, Y;
      if (E === 0)
        f !== 0 && (Ro(c), c = [], n = [], s = [], f = 0, m && (m = [])), r.fallback && (n = [Wa], s[0] = T1((ve) => (c[0] = ve, r.fallback())), f = 1);
      else if (f === 0) {
        for (s = new Array(E), $ = 0; $ < E; $++)
          n[$] = v[$], s[$] = T1(w);
        f = E;
      } else {
        for (I = new Array(E), K = new Array(E), m && (z = new Array(E)), ce = 0, V = Math.min(f, E); ce < V && n[ce] === v[ce]; ce++)
          ;
        for (V = f - 1, oe = E - 1; V >= ce && oe >= ce && n[V] === v[oe]; V--, oe--)
          I[oe] = s[V], K[oe] = c[V], m && (z[oe] = m[V]);
        for (Q = /* @__PURE__ */ new Map(), re = new Array(oe + 1), $ = oe; $ >= ce; $--)
          Y = v[$], L = Q.get(Y), re[$] = L === void 0 ? -1 : L, Q.set(Y, $);
        for (L = ce; L <= V; L++)
          Y = n[L], $ = Q.get(Y), $ !== void 0 && $ !== -1 ? (I[$] = s[L], K[$] = c[L], m && (z[$] = m[L]), $ = re[$], Q.set(Y, $)) : c[L]();
        for ($ = ce; $ < E; $++)
          $ in I ? (s[$] = I[$], c[$] = K[$], m && (m[$] = z[$], m[$]($))) : s[$] = T1(w);
        s = s.slice(0, f = E), n = v.slice(0);
      }
      return s;
    });
    function w(E) {
      if (c[$] = E, m) {
        const [Q, re] = M($);
        return m[$] = re, t(v[$], Q);
      }
      return t(v[$]);
    }
  };
}
function A(e, t) {
  return dt(() => e(t || {}));
}
function tn() {
  return !0;
}
const Ga = {
  get(e, t, r) {
    return t === ir ? r : e.get(t);
  },
  has(e, t) {
    return t === ir ? !0 : e.has(t);
  },
  set: tn,
  deleteProperty: tn,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: tn,
      deleteProperty: tn
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function qn(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function K0(...e) {
  let t = !1;
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    t = t || !!s && ir in s, e[n] = typeof s == "function" ? (t = !0, H(s)) : s;
  }
  if (t)
    return new Proxy({
      get(n) {
        for (let s = e.length - 1; s >= 0; s--) {
          const c = qn(e[s])[n];
          if (c !== void 0)
            return c;
        }
      },
      has(n) {
        for (let s = e.length - 1; s >= 0; s--)
          if (n in qn(e[s]))
            return !0;
        return !1;
      },
      keys() {
        const n = [];
        for (let s = 0; s < e.length; s++)
          n.push(...Object.keys(qn(e[s])));
        return [...new Set(n)];
      }
    }, Ga);
  const r = {};
  for (let n = e.length - 1; n >= 0; n--)
    if (e[n]) {
      const s = Object.getOwnPropertyDescriptors(e[n]);
      for (const c in s)
        c in r || Object.defineProperty(r, c, {
          enumerable: !0,
          get() {
            for (let f = e.length - 1; f >= 0; f--) {
              const m = (e[f] || {})[c];
              if (m !== void 0)
                return m;
            }
          }
        });
    }
  return r;
}
function M1(e) {
  const t = "fallback" in e && {
    fallback: () => e.fallback
  };
  return H(qa(() => e.each, e.children, t || void 0));
}
function he(e) {
  let t = !1;
  const r = e.keyed, n = H(() => e.when, void 0, {
    equals: (s, c) => t ? s === c : !s == !c
  });
  return H(() => {
    const s = n();
    if (s) {
      const c = e.children, f = typeof c == "function" && c.length > 0;
      return t = r || f, f ? dt(() => c(s)) : c;
    }
    return e.fallback;
  }, void 0, void 0);
}
function Xa(e, t, r) {
  let n = r.length, s = t.length, c = n, f = 0, m = 0, v = t[s - 1].nextSibling, L = null;
  for (; f < s || m < c; ) {
    if (t[f] === r[m]) {
      f++, m++;
      continue;
    }
    for (; t[s - 1] === r[c - 1]; )
      s--, c--;
    if (s === f) {
      const $ = c < n ? m ? r[m - 1].nextSibling : r[c - m] : v;
      for (; m < c; )
        e.insertBefore(r[m++], $);
    } else if (c === m)
      for (; f < s; )
        (!L || !L.has(t[f])) && t[f].remove(), f++;
    else if (t[f] === r[c - 1] && r[m] === t[s - 1]) {
      const $ = t[--s].nextSibling;
      e.insertBefore(r[m++], t[f++].nextSibling), e.insertBefore(r[--c], $), t[s] = r[c];
    } else {
      if (!L) {
        L = /* @__PURE__ */ new Map();
        let w = m;
        for (; w < c; )
          L.set(r[w], w++);
      }
      const $ = L.get(t[f]);
      if ($ != null)
        if (m < $ && $ < c) {
          let w = f, E = 1, Q;
          for (; ++w < s && w < c && !((Q = L.get(t[w])) == null || Q !== $ + E); )
            E++;
          if (E > $ - m) {
            const re = t[f];
            for (; m < $; )
              e.insertBefore(r[m++], re);
          } else
            e.replaceChild(r[m++], t[f++]);
        } else
          f++;
      else
        t[f++].remove();
    }
  }
}
const Ko = "_$DX_DELEGATE";
function Ja(e, t, r, n = {}) {
  let s;
  return T1((c) => {
    s = c, t === document ? e() : p(t, e(), t.firstChild ? null : void 0, r);
  }, n.owner), () => {
    s(), t.textContent = "";
  };
}
function _(e, t, r) {
  const n = document.createElement("template");
  n.innerHTML = e;
  let s = n.content.firstChild;
  return r && (s = s.firstChild), s;
}
function Ye(e, t = window.document) {
  const r = t[Ko] || (t[Ko] = /* @__PURE__ */ new Set());
  for (let n = 0, s = e.length; n < s; n++) {
    const c = e[n];
    r.has(c) || (r.add(c), t.addEventListener(c, e9));
  }
}
function Oe(e, t, r) {
  r == null ? e.removeAttribute(t) : e.setAttribute(t, r);
}
function me(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function ut(e, t, r, n) {
  if (n)
    Array.isArray(r) ? (e[`$$${t}`] = r[0], e[`$$${t}Data`] = r[1]) : e[`$$${t}`] = r;
  else if (Array.isArray(r)) {
    const s = r[0];
    e.addEventListener(t, r[0] = (c) => s.call(e, r[1], c));
  } else
    e.addEventListener(t, r);
}
function zt(e, t, r) {
  if (!t)
    return r ? Oe(e, "style") : t;
  const n = e.style;
  if (typeof t == "string")
    return n.cssText = t;
  typeof r == "string" && (n.cssText = r = void 0), r || (r = {}), t || (t = {});
  let s, c;
  for (c in r)
    t[c] == null && n.removeProperty(c), delete r[c];
  for (c in t)
    s = t[c], s !== r[c] && (n.setProperty(c, s), r[c] = s);
  return r;
}
function xt(e, t, r) {
  return dt(() => e(t, r));
}
function p(e, t, r, n) {
  if (r !== void 0 && !n && (n = []), typeof t != "function")
    return gn(e, t, n, r);
  U((s) => gn(e, t(), s, r), n);
}
function e9(e) {
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
  }), Ue.registry && !Ue.done && (Ue.done = !0, document.querySelectorAll("[id^=pl-]").forEach((n) => {
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
function gn(e, t, r, n, s) {
  for (Ue.context && !r && (r = [...e.childNodes]); typeof r == "function"; )
    r = r();
  if (t === r)
    return r;
  const c = typeof t, f = n !== void 0;
  if (e = f && r[0] && r[0].parentNode || e, c === "string" || c === "number") {
    if (Ue.context)
      return r;
    if (c === "number" && (t = t.toString()), f) {
      let m = r[0];
      m && m.nodeType === 3 ? m.data = t : m = document.createTextNode(t), r = Jt(e, r, n, m);
    } else
      r !== "" && typeof r == "string" ? r = e.firstChild.data = t : r = e.textContent = t;
  } else if (t == null || c === "boolean") {
    if (Ue.context)
      return r;
    r = Jt(e, r, n);
  } else {
    if (c === "function")
      return U(() => {
        let m = t();
        for (; typeof m == "function"; )
          m = m();
        r = gn(e, m, r, n);
      }), () => r;
    if (Array.isArray(t)) {
      const m = [], v = r && Array.isArray(r);
      if (ar(m, t, r, s))
        return U(() => r = gn(e, m, r, n, !0)), () => r;
      if (Ue.context) {
        if (!m.length)
          return r;
        for (let L = 0; L < m.length; L++)
          if (m[L].parentNode)
            return r = m;
      }
      if (m.length === 0) {
        if (r = Jt(e, r, n), f)
          return r;
      } else
        v ? r.length === 0 ? jo(e, m, n) : Xa(e, r, m) : (r && Jt(e), jo(e, m));
      r = m;
    } else if (t instanceof Node) {
      if (Ue.context && t.parentNode)
        return r = f ? [t] : t;
      if (Array.isArray(r)) {
        if (f)
          return r = Jt(e, r, n, t);
        Jt(e, r, null, t);
      } else
        r == null || r === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      r = t;
    }
  }
  return r;
}
function ar(e, t, r, n) {
  let s = !1;
  for (let c = 0, f = t.length; c < f; c++) {
    let m = t[c], v = r && r[c];
    if (m instanceof Node)
      e.push(m);
    else if (!(m == null || m === !0 || m === !1))
      if (Array.isArray(m))
        s = ar(e, m, v) || s;
      else if (typeof m == "function")
        if (n) {
          for (; typeof m == "function"; )
            m = m();
          s = ar(e, Array.isArray(m) ? m : [m], Array.isArray(v) ? v : [v]) || s;
        } else
          e.push(m), s = !0;
      else {
        const L = String(m);
        v && v.nodeType === 3 && v.data === L ? e.push(v) : e.push(document.createTextNode(L));
      }
  }
  return s;
}
function jo(e, t, r = null) {
  for (let n = 0, s = t.length; n < s; n++)
    e.insertBefore(t[n], r);
}
function Jt(e, t, r, n) {
  if (r === void 0)
    return e.textContent = "";
  const s = n || document.createTextNode("");
  if (t.length) {
    let c = !1;
    for (let f = t.length - 1; f >= 0; f--) {
      const m = t[f];
      if (s !== m) {
        const v = m.parentNode === e;
        !c && !f ? v ? e.replaceChild(s, m) : e.insertBefore(s, r) : v && m.remove();
      } else
        c = !0;
    }
  } else
    e.insertBefore(s, r);
  return [s];
}
const t9 = "http://www.w3.org/2000/svg";
function n9(e, t = !1) {
  return t ? document.createElementNS(t9, e) : document.createElement(e);
}
function r9(e) {
  const {
    useShadow: t
  } = e, r = document.createTextNode(""), n = e.mount || document.body;
  function s() {
    if (Ue.context) {
      const [c, f] = M(!1);
      return queueMicrotask(() => f(!0)), () => c() && e.children;
    } else
      return () => e.children;
  }
  if (n instanceof HTMLHeadElement) {
    const [c, f] = M(!1), m = () => f(!0);
    T1((v) => p(n, () => c() ? v() : s()(), null)), Lt(() => {
      Ue.context ? queueMicrotask(m) : m();
    });
  } else {
    const c = n9(e.isSVG ? "g" : "div", e.isSVG), f = t && c.attachShadow ? c.attachShadow({
      mode: "open"
    }) : c;
    Object.defineProperty(c, "_$host", {
      get() {
        return r.parentNode;
      },
      configurable: !0
    }), p(f, s()), n.appendChild(c), e.ref && e.ref(c), Lt(() => n.removeChild(c));
  }
  return r;
}
var nn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function j0(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var o9 = typeof nn == "object" && nn && nn.Object === Object && nn, Q0 = o9, i9 = Q0, a9 = typeof self == "object" && self && self.Object === Object && self, s9 = i9 || a9 || Function("return this")(), ht = s9, l9 = ht, c9 = l9.Symbol, xn = c9, Qo = xn, Z0 = Object.prototype, u9 = Z0.hasOwnProperty, d9 = Z0.toString, L1 = Qo ? Qo.toStringTag : void 0;
function h9(e) {
  var t = u9.call(e, L1), r = e[L1];
  try {
    e[L1] = void 0;
    var n = !0;
  } catch {
  }
  var s = d9.call(e);
  return n && (t ? e[L1] = r : delete e[L1]), s;
}
var f9 = h9, m9 = Object.prototype, g9 = m9.toString;
function y9(e) {
  return g9.call(e);
}
var C9 = y9, Zo = xn, p9 = f9, v9 = C9, b9 = "[object Null]", $9 = "[object Undefined]", Ho = Zo ? Zo.toStringTag : void 0;
function _9(e) {
  return e == null ? e === void 0 ? $9 : b9 : Ho && Ho in Object(e) ? p9(e) : v9(e);
}
var D1 = _9;
function k9(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var n1 = k9, x9 = D1, L9 = n1, w9 = "[object AsyncFunction]", A9 = "[object Function]", S9 = "[object GeneratorFunction]", T9 = "[object Proxy]";
function M9(e) {
  if (!L9(e))
    return !1;
  var t = x9(e);
  return t == A9 || t == S9 || t == w9 || t == T9;
}
var H0 = M9, P9 = ht, D9 = P9["__core-js_shared__"], N9 = D9, Gn = N9, Yo = function() {
  var e = /[^.]+$/.exec(Gn && Gn.keys && Gn.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function O9(e) {
  return !!Yo && Yo in e;
}
var I9 = O9, E9 = Function.prototype, B9 = E9.toString;
function F9(e) {
  if (e != null) {
    try {
      return B9.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Y0 = F9, U9 = H0, z9 = I9, V9 = n1, R9 = Y0, K9 = /[\\^$.*+?()[\]{}|]/g, j9 = /^\[object .+?Constructor\]$/, Q9 = Function.prototype, Z9 = Object.prototype, H9 = Q9.toString, Y9 = Z9.hasOwnProperty, W9 = RegExp(
  "^" + H9.call(Y9).replace(K9, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function q9(e) {
  if (!V9(e) || z9(e))
    return !1;
  var t = U9(e) ? W9 : j9;
  return t.test(R9(e));
}
var G9 = q9;
function X9(e, t) {
  return e == null ? void 0 : e[t];
}
var J9 = X9, e5 = G9, t5 = J9;
function n5(e, t) {
  var r = t5(e, t);
  return e5(r) ? r : void 0;
}
var Vt = n5, r5 = Vt, o5 = function() {
  try {
    var e = r5(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), i5 = o5, Wo = i5;
function a5(e, t, r) {
  t == "__proto__" && Wo ? Wo(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var W0 = a5;
function s5(e, t) {
  return e === t || e !== e && t !== t;
}
var q0 = s5, l5 = W0, c5 = q0, u5 = Object.prototype, d5 = u5.hasOwnProperty;
function h5(e, t, r) {
  var n = e[t];
  (!(d5.call(e, t) && c5(n, r)) || r === void 0 && !(t in e)) && l5(e, t, r);
}
var pr = h5, f5 = Array.isArray, r1 = f5;
function m5(e) {
  return e != null && typeof e == "object";
}
var o1 = m5, g5 = D1, y5 = o1, C5 = "[object Symbol]";
function p5(e) {
  return typeof e == "symbol" || y5(e) && g5(e) == C5;
}
var vr = p5, v5 = r1, b5 = vr, $5 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, _5 = /^\w*$/;
function k5(e, t) {
  if (v5(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || b5(e) ? !0 : _5.test(e) || !$5.test(e) || t != null && e in Object(t);
}
var x5 = k5, L5 = Vt, w5 = L5(Object, "create"), Ln = w5, qo = Ln;
function A5() {
  this.__data__ = qo ? qo(null) : {}, this.size = 0;
}
var S5 = A5;
function T5(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var M5 = T5, P5 = Ln, D5 = "__lodash_hash_undefined__", N5 = Object.prototype, O5 = N5.hasOwnProperty;
function I5(e) {
  var t = this.__data__;
  if (P5) {
    var r = t[e];
    return r === D5 ? void 0 : r;
  }
  return O5.call(t, e) ? t[e] : void 0;
}
var E5 = I5, B5 = Ln, F5 = Object.prototype, U5 = F5.hasOwnProperty;
function z5(e) {
  var t = this.__data__;
  return B5 ? t[e] !== void 0 : U5.call(t, e);
}
var V5 = z5, R5 = Ln, K5 = "__lodash_hash_undefined__";
function j5(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = R5 && t === void 0 ? K5 : t, this;
}
var Q5 = j5, Z5 = S5, H5 = M5, Y5 = E5, W5 = V5, q5 = Q5;
function i1(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
i1.prototype.clear = Z5;
i1.prototype.delete = H5;
i1.prototype.get = Y5;
i1.prototype.has = W5;
i1.prototype.set = q5;
var G5 = i1;
function X5() {
  this.__data__ = [], this.size = 0;
}
var J5 = X5, es = q0;
function ts(e, t) {
  for (var r = e.length; r--; )
    if (es(e[r][0], t))
      return r;
  return -1;
}
var wn = ts, ns = wn, rs = Array.prototype, os = rs.splice;
function is(e) {
  var t = this.__data__, r = ns(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : os.call(t, r, 1), --this.size, !0;
}
var as = is, ss = wn;
function ls(e) {
  var t = this.__data__, r = ss(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var cs = ls, us = wn;
function ds(e) {
  return us(this.__data__, e) > -1;
}
var hs = ds, fs = wn;
function ms(e, t) {
  var r = this.__data__, n = fs(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
var gs = ms, ys = J5, Cs = as, ps = cs, vs = hs, bs = gs;
function a1(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
a1.prototype.clear = ys;
a1.prototype.delete = Cs;
a1.prototype.get = ps;
a1.prototype.has = vs;
a1.prototype.set = bs;
var An = a1, $s = Vt, _s = ht, ks = $s(_s, "Map"), br = ks, Go = G5, xs = An, Ls = br;
function ws() {
  this.size = 0, this.__data__ = {
    hash: new Go(),
    map: new (Ls || xs)(),
    string: new Go()
  };
}
var As = ws;
function Ss(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var Ts = Ss, Ms = Ts;
function Ps(e, t) {
  var r = e.__data__;
  return Ms(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var Sn = Ps, Ds = Sn;
function Ns(e) {
  var t = Ds(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var Os = Ns, Is = Sn;
function Es(e) {
  return Is(this, e).get(e);
}
var Bs = Es, Fs = Sn;
function Us(e) {
  return Fs(this, e).has(e);
}
var zs = Us, Vs = Sn;
function Rs(e, t) {
  var r = Vs(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
var Ks = Rs, js = As, Qs = Os, Zs = Bs, Hs = zs, Ys = Ks;
function s1(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
s1.prototype.clear = js;
s1.prototype.delete = Qs;
s1.prototype.get = Zs;
s1.prototype.has = Hs;
s1.prototype.set = Ys;
var G0 = s1, X0 = G0, Ws = "Expected a function";
function $r(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Ws);
  var r = function() {
    var n = arguments, s = t ? t.apply(this, n) : n[0], c = r.cache;
    if (c.has(s))
      return c.get(s);
    var f = e.apply(this, n);
    return r.cache = c.set(s, f) || c, f;
  };
  return r.cache = new ($r.Cache || X0)(), r;
}
$r.Cache = X0;
var qs = $r, Gs = qs, Xs = 500;
function Js(e) {
  var t = Gs(e, function(n) {
    return r.size === Xs && r.clear(), n;
  }), r = t.cache;
  return t;
}
var e2 = Js, t2 = e2, n2 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, r2 = /\\(\\)?/g, o2 = t2(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(n2, function(r, n, s, c) {
    t.push(s ? c.replace(r2, "$1") : n || r);
  }), t;
}), i2 = o2;
function a2(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, s = Array(n); ++r < n; )
    s[r] = t(e[r], r, e);
  return s;
}
var s2 = a2, Xo = xn, l2 = s2, c2 = r1, u2 = vr, d2 = 1 / 0, Jo = Xo ? Xo.prototype : void 0, e0 = Jo ? Jo.toString : void 0;
function J0(e) {
  if (typeof e == "string")
    return e;
  if (c2(e))
    return l2(e, J0) + "";
  if (u2(e))
    return e0 ? e0.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -d2 ? "-0" : t;
}
var h2 = J0, f2 = h2;
function m2(e) {
  return e == null ? "" : f2(e);
}
var g2 = m2, y2 = r1, C2 = x5, p2 = i2, v2 = g2;
function b2(e, t) {
  return y2(e) ? e : C2(e, t) ? [e] : p2(v2(e));
}
var $2 = b2, _2 = 9007199254740991, k2 = /^(?:0|[1-9]\d*)$/;
function x2(e, t) {
  var r = typeof e;
  return t = t ?? _2, !!t && (r == "number" || r != "symbol" && k2.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var ei = x2, L2 = vr, w2 = 1 / 0;
function A2(e) {
  if (typeof e == "string" || L2(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -w2 ? "-0" : t;
}
var S2 = A2, T2 = pr, M2 = $2, P2 = ei, t0 = n1, D2 = S2;
function N2(e, t, r, n) {
  if (!t0(e))
    return e;
  t = M2(t, e);
  for (var s = -1, c = t.length, f = c - 1, m = e; m != null && ++s < c; ) {
    var v = D2(t[s]), L = r;
    if (v === "__proto__" || v === "constructor" || v === "prototype")
      return e;
    if (s != f) {
      var $ = m[v];
      L = n ? n($, v, m) : void 0, L === void 0 && (L = t0($) ? $ : P2(t[s + 1]) ? [] : {});
    }
    T2(m, v, L), m = m[v];
  }
  return e;
}
var O2 = N2, I2 = O2;
function E2(e, t, r) {
  return e == null ? e : I2(e, t, r);
}
var B2 = E2;
const Ee = /* @__PURE__ */ j0(B2);
var F2 = An;
function U2() {
  this.__data__ = new F2(), this.size = 0;
}
var z2 = U2;
function V2(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
var R2 = V2;
function K2(e) {
  return this.__data__.get(e);
}
var j2 = K2;
function Q2(e) {
  return this.__data__.has(e);
}
var Z2 = Q2, H2 = An, Y2 = br, W2 = G0, q2 = 200;
function G2(e, t) {
  var r = this.__data__;
  if (r instanceof H2) {
    var n = r.__data__;
    if (!Y2 || n.length < q2 - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new W2(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
var X2 = G2, J2 = An, e6 = z2, t6 = R2, n6 = j2, r6 = Z2, o6 = X2;
function l1(e) {
  var t = this.__data__ = new J2(e);
  this.size = t.size;
}
l1.prototype.clear = e6;
l1.prototype.delete = t6;
l1.prototype.get = n6;
l1.prototype.has = r6;
l1.prototype.set = o6;
var i6 = l1;
function a6(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var s6 = a6, l6 = pr, c6 = W0;
function u6(e, t, r, n) {
  var s = !r;
  r || (r = {});
  for (var c = -1, f = t.length; ++c < f; ) {
    var m = t[c], v = n ? n(r[m], e[m], m, r, e) : void 0;
    v === void 0 && (v = e[m]), s ? c6(r, m, v) : l6(r, m, v);
  }
  return r;
}
var Tn = u6;
function d6(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var h6 = d6, f6 = D1, m6 = o1, g6 = "[object Arguments]";
function y6(e) {
  return m6(e) && f6(e) == g6;
}
var C6 = y6, n0 = C6, p6 = o1, ti = Object.prototype, v6 = ti.hasOwnProperty, b6 = ti.propertyIsEnumerable, $6 = n0(function() {
  return arguments;
}()) ? n0 : function(e) {
  return p6(e) && v6.call(e, "callee") && !b6.call(e, "callee");
}, _6 = $6, yn = { exports: {} };
function k6() {
  return !1;
}
var x6 = k6;
yn.exports;
(function(e, t) {
  var r = ht, n = x6, s = t && !t.nodeType && t, c = s && !0 && e && !e.nodeType && e, f = c && c.exports === s, m = f ? r.Buffer : void 0, v = m ? m.isBuffer : void 0, L = v || n;
  e.exports = L;
})(yn, yn.exports);
var ni = yn.exports, L6 = 9007199254740991;
function w6(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= L6;
}
var ri = w6, A6 = D1, S6 = ri, T6 = o1, M6 = "[object Arguments]", P6 = "[object Array]", D6 = "[object Boolean]", N6 = "[object Date]", O6 = "[object Error]", I6 = "[object Function]", E6 = "[object Map]", B6 = "[object Number]", F6 = "[object Object]", U6 = "[object RegExp]", z6 = "[object Set]", V6 = "[object String]", R6 = "[object WeakMap]", K6 = "[object ArrayBuffer]", j6 = "[object DataView]", Q6 = "[object Float32Array]", Z6 = "[object Float64Array]", H6 = "[object Int8Array]", Y6 = "[object Int16Array]", W6 = "[object Int32Array]", q6 = "[object Uint8Array]", G6 = "[object Uint8ClampedArray]", X6 = "[object Uint16Array]", J6 = "[object Uint32Array]", Se = {};
Se[Q6] = Se[Z6] = Se[H6] = Se[Y6] = Se[W6] = Se[q6] = Se[G6] = Se[X6] = Se[J6] = !0;
Se[M6] = Se[P6] = Se[K6] = Se[D6] = Se[j6] = Se[N6] = Se[O6] = Se[I6] = Se[E6] = Se[B6] = Se[F6] = Se[U6] = Se[z6] = Se[V6] = Se[R6] = !1;
function e3(e) {
  return T6(e) && S6(e.length) && !!Se[A6(e)];
}
var t3 = e3;
function n3(e) {
  return function(t) {
    return e(t);
  };
}
var _r = n3, Cn = { exports: {} };
Cn.exports;
(function(e, t) {
  var r = Q0, n = t && !t.nodeType && t, s = n && !0 && e && !e.nodeType && e, c = s && s.exports === n, f = c && r.process, m = function() {
    try {
      var v = s && s.require && s.require("util").types;
      return v || f && f.binding && f.binding("util");
    } catch {
    }
  }();
  e.exports = m;
})(Cn, Cn.exports);
var kr = Cn.exports, r3 = t3, o3 = _r, r0 = kr, o0 = r0 && r0.isTypedArray, i3 = o0 ? o3(o0) : r3, a3 = i3, s3 = h6, l3 = _6, c3 = r1, u3 = ni, d3 = ei, h3 = a3, f3 = Object.prototype, m3 = f3.hasOwnProperty;
function g3(e, t) {
  var r = c3(e), n = !r && l3(e), s = !r && !n && u3(e), c = !r && !n && !s && h3(e), f = r || n || s || c, m = f ? s3(e.length, String) : [], v = m.length;
  for (var L in e)
    (t || m3.call(e, L)) && !(f && // Safari 9 has enumerable `arguments.length` in strict mode.
    (L == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    s && (L == "offset" || L == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    c && (L == "buffer" || L == "byteLength" || L == "byteOffset") || // Skip index properties.
    d3(L, v))) && m.push(L);
  return m;
}
var oi = g3, y3 = Object.prototype;
function C3(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || y3;
  return e === r;
}
var xr = C3;
function p3(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var ii = p3, v3 = ii, b3 = v3(Object.keys, Object), $3 = b3, _3 = xr, k3 = $3, x3 = Object.prototype, L3 = x3.hasOwnProperty;
function w3(e) {
  if (!_3(e))
    return k3(e);
  var t = [];
  for (var r in Object(e))
    L3.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
var A3 = w3, S3 = H0, T3 = ri;
function M3(e) {
  return e != null && T3(e.length) && !S3(e);
}
var ai = M3, P3 = oi, D3 = A3, N3 = ai;
function O3(e) {
  return N3(e) ? P3(e) : D3(e);
}
var Lr = O3, I3 = Tn, E3 = Lr;
function B3(e, t) {
  return e && I3(t, E3(t), e);
}
var F3 = B3;
function U3(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var z3 = U3, V3 = n1, R3 = xr, K3 = z3, j3 = Object.prototype, Q3 = j3.hasOwnProperty;
function Z3(e) {
  if (!V3(e))
    return K3(e);
  var t = R3(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !Q3.call(e, n)) || r.push(n);
  return r;
}
var H3 = Z3, Y3 = oi, W3 = H3, q3 = ai;
function G3(e) {
  return q3(e) ? Y3(e, !0) : W3(e);
}
var wr = G3, X3 = Tn, J3 = wr;
function el(e, t) {
  return e && X3(t, J3(t), e);
}
var tl = el, pn = { exports: {} };
pn.exports;
(function(e, t) {
  var r = ht, n = t && !t.nodeType && t, s = n && !0 && e && !e.nodeType && e, c = s && s.exports === n, f = c ? r.Buffer : void 0, m = f ? f.allocUnsafe : void 0;
  function v(L, $) {
    if ($)
      return L.slice();
    var w = L.length, E = m ? m(w) : new L.constructor(w);
    return L.copy(E), E;
  }
  e.exports = v;
})(pn, pn.exports);
var nl = pn.exports;
function rl(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
var ol = rl;
function il(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, s = 0, c = []; ++r < n; ) {
    var f = e[r];
    t(f, r, e) && (c[s++] = f);
  }
  return c;
}
var al = il;
function sl() {
  return [];
}
var si = sl, ll = al, cl = si, ul = Object.prototype, dl = ul.propertyIsEnumerable, i0 = Object.getOwnPropertySymbols, hl = i0 ? function(e) {
  return e == null ? [] : (e = Object(e), ll(i0(e), function(t) {
    return dl.call(e, t);
  }));
} : cl, Ar = hl, fl = Tn, ml = Ar;
function gl(e, t) {
  return fl(e, ml(e), t);
}
var yl = gl;
function Cl(e, t) {
  for (var r = -1, n = t.length, s = e.length; ++r < n; )
    e[s + r] = t[r];
  return e;
}
var li = Cl, pl = ii, vl = pl(Object.getPrototypeOf, Object), ci = vl, bl = li, $l = ci, _l = Ar, kl = si, xl = Object.getOwnPropertySymbols, Ll = xl ? function(e) {
  for (var t = []; e; )
    bl(t, _l(e)), e = $l(e);
  return t;
} : kl, ui = Ll, wl = Tn, Al = ui;
function Sl(e, t) {
  return wl(e, Al(e), t);
}
var Tl = Sl, Ml = li, Pl = r1;
function Dl(e, t, r) {
  var n = t(e);
  return Pl(e) ? n : Ml(n, r(e));
}
var di = Dl, Nl = di, Ol = Ar, Il = Lr;
function El(e) {
  return Nl(e, Il, Ol);
}
var Bl = El, Fl = di, Ul = ui, zl = wr;
function Vl(e) {
  return Fl(e, zl, Ul);
}
var Rl = Vl, Kl = Vt, jl = ht, Ql = Kl(jl, "DataView"), Zl = Ql, Hl = Vt, Yl = ht, Wl = Hl(Yl, "Promise"), ql = Wl, Gl = Vt, Xl = ht, Jl = Gl(Xl, "Set"), e8 = Jl, t8 = Vt, n8 = ht, r8 = t8(n8, "WeakMap"), o8 = r8, sr = Zl, lr = br, cr = ql, ur = e8, dr = o8, hi = D1, c1 = Y0, a0 = "[object Map]", i8 = "[object Object]", s0 = "[object Promise]", l0 = "[object Set]", c0 = "[object WeakMap]", u0 = "[object DataView]", a8 = c1(sr), s8 = c1(lr), l8 = c1(cr), c8 = c1(ur), u8 = c1(dr), Bt = hi;
(sr && Bt(new sr(new ArrayBuffer(1))) != u0 || lr && Bt(new lr()) != a0 || cr && Bt(cr.resolve()) != s0 || ur && Bt(new ur()) != l0 || dr && Bt(new dr()) != c0) && (Bt = function(e) {
  var t = hi(e), r = t == i8 ? e.constructor : void 0, n = r ? c1(r) : "";
  if (n)
    switch (n) {
      case a8:
        return u0;
      case s8:
        return a0;
      case l8:
        return s0;
      case c8:
        return l0;
      case u8:
        return c0;
    }
  return t;
});
var Sr = Bt, d8 = Object.prototype, h8 = d8.hasOwnProperty;
function f8(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && h8.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
var m8 = f8, g8 = ht, y8 = g8.Uint8Array, C8 = y8, d0 = C8;
function p8(e) {
  var t = new e.constructor(e.byteLength);
  return new d0(t).set(new d0(e)), t;
}
var Tr = p8, v8 = Tr;
function b8(e, t) {
  var r = t ? v8(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var $8 = b8, _8 = /\w*$/;
function k8(e) {
  var t = new e.constructor(e.source, _8.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var x8 = k8, h0 = xn, f0 = h0 ? h0.prototype : void 0, m0 = f0 ? f0.valueOf : void 0;
function L8(e) {
  return m0 ? Object(m0.call(e)) : {};
}
var w8 = L8, A8 = Tr;
function S8(e, t) {
  var r = t ? A8(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
var T8 = S8, M8 = Tr, P8 = $8, D8 = x8, N8 = w8, O8 = T8, I8 = "[object Boolean]", E8 = "[object Date]", B8 = "[object Map]", F8 = "[object Number]", U8 = "[object RegExp]", z8 = "[object Set]", V8 = "[object String]", R8 = "[object Symbol]", K8 = "[object ArrayBuffer]", j8 = "[object DataView]", Q8 = "[object Float32Array]", Z8 = "[object Float64Array]", H8 = "[object Int8Array]", Y8 = "[object Int16Array]", W8 = "[object Int32Array]", q8 = "[object Uint8Array]", G8 = "[object Uint8ClampedArray]", X8 = "[object Uint16Array]", J8 = "[object Uint32Array]";
function e7(e, t, r) {
  var n = e.constructor;
  switch (t) {
    case K8:
      return M8(e);
    case I8:
    case E8:
      return new n(+e);
    case j8:
      return P8(e, r);
    case Q8:
    case Z8:
    case H8:
    case Y8:
    case W8:
    case q8:
    case G8:
    case X8:
    case J8:
      return O8(e, r);
    case B8:
      return new n();
    case F8:
    case V8:
      return new n(e);
    case U8:
      return D8(e);
    case z8:
      return new n();
    case R8:
      return N8(e);
  }
}
var t7 = e7, n7 = n1, g0 = Object.create, r7 = function() {
  function e() {
  }
  return function(t) {
    if (!n7(t))
      return {};
    if (g0)
      return g0(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}(), o7 = r7, i7 = o7, a7 = ci, s7 = xr;
function l7(e) {
  return typeof e.constructor == "function" && !s7(e) ? i7(a7(e)) : {};
}
var c7 = l7, u7 = Sr, d7 = o1, h7 = "[object Map]";
function f7(e) {
  return d7(e) && u7(e) == h7;
}
var m7 = f7, g7 = m7, y7 = _r, y0 = kr, C0 = y0 && y0.isMap, C7 = C0 ? y7(C0) : g7, p7 = C7, v7 = Sr, b7 = o1, $7 = "[object Set]";
function _7(e) {
  return b7(e) && v7(e) == $7;
}
var k7 = _7, x7 = k7, L7 = _r, p0 = kr, v0 = p0 && p0.isSet, w7 = v0 ? L7(v0) : x7, A7 = w7, S7 = i6, T7 = s6, M7 = pr, P7 = F3, D7 = tl, N7 = nl, O7 = ol, I7 = yl, E7 = Tl, B7 = Bl, F7 = Rl, U7 = Sr, z7 = m8, V7 = t7, R7 = c7, K7 = r1, j7 = ni, Q7 = p7, Z7 = n1, H7 = A7, Y7 = Lr, W7 = wr, q7 = 1, G7 = 2, X7 = 4, fi = "[object Arguments]", J7 = "[object Array]", ec = "[object Boolean]", tc = "[object Date]", nc = "[object Error]", mi = "[object Function]", rc = "[object GeneratorFunction]", oc = "[object Map]", ic = "[object Number]", gi = "[object Object]", ac = "[object RegExp]", sc = "[object Set]", lc = "[object String]", cc = "[object Symbol]", uc = "[object WeakMap]", dc = "[object ArrayBuffer]", hc = "[object DataView]", fc = "[object Float32Array]", mc = "[object Float64Array]", gc = "[object Int8Array]", yc = "[object Int16Array]", Cc = "[object Int32Array]", pc = "[object Uint8Array]", vc = "[object Uint8ClampedArray]", bc = "[object Uint16Array]", $c = "[object Uint32Array]", xe = {};
xe[fi] = xe[J7] = xe[dc] = xe[hc] = xe[ec] = xe[tc] = xe[fc] = xe[mc] = xe[gc] = xe[yc] = xe[Cc] = xe[oc] = xe[ic] = xe[gi] = xe[ac] = xe[sc] = xe[lc] = xe[cc] = xe[pc] = xe[vc] = xe[bc] = xe[$c] = !0;
xe[nc] = xe[mi] = xe[uc] = !1;
function cn(e, t, r, n, s, c) {
  var f, m = t & q7, v = t & G7, L = t & X7;
  if (r && (f = s ? r(e, n, s, c) : r(e)), f !== void 0)
    return f;
  if (!Z7(e))
    return e;
  var $ = K7(e);
  if ($) {
    if (f = z7(e), !m)
      return O7(e, f);
  } else {
    var w = U7(e), E = w == mi || w == rc;
    if (j7(e))
      return N7(e, m);
    if (w == gi || w == fi || E && !s) {
      if (f = v || E ? {} : R7(e), !m)
        return v ? E7(e, D7(f, e)) : I7(e, P7(f, e));
    } else {
      if (!xe[w])
        return s ? e : {};
      f = V7(e, w, m);
    }
  }
  c || (c = new S7());
  var Q = c.get(e);
  if (Q)
    return Q;
  c.set(e, f), H7(e) ? e.forEach(function(K) {
    f.add(cn(K, t, r, K, e, c));
  }) : Q7(e) && e.forEach(function(K, z) {
    f.set(z, cn(K, t, r, z, e, c));
  });
  var re = L ? v ? F7 : B7 : v ? W7 : Y7, I = $ ? void 0 : re(e);
  return T7(I || e, function(K, z) {
    I && (z = K, K = e[z]), M7(f, z, cn(K, t, r, z, e, c));
  }), f;
}
var _c = cn, kc = _c, xc = 1, Lc = 4;
function wc(e) {
  return kc(e, xc | Lc);
}
var Ac = wc;
const Sc = /* @__PURE__ */ j0(Ac), Tc = /* @__PURE__ */ _("<button></button>"), Mc = (e) => (() => {
  const t = Tc.cloneNode(!0);
  return ut(t, "click", e.onClick, !0), p(t, () => e.children), U((r) => {
    const n = e.style, s = `klinecharts-pro-button ${e.type ?? "confirm"} ${e.class ?? ""}`;
    return r._v$ = zt(t, n, r._v$), s !== r._v$2 && me(t, r._v$2 = s), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
Ye(["click"]);
const Pc = /* @__PURE__ */ _('<svg viewBox="0 0 1024 1024" class="icon"><path d="M810.666667 128H213.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v597.333334c0 46.933333 38.4 85.333333 85.333333 85.333333h597.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V213.333333c0-46.933333-38.4-85.333333-85.333333-85.333333z m-353.706667 567.04a42.496 42.496 0 0 1-60.16 0L243.626667 541.866667c-8.106667-8.106667-12.373333-18.773333-12.373334-29.866667s4.693333-22.186667 12.373334-29.866667a42.496 42.496 0 0 1 60.16 0L426.666667 604.586667l293.546666-293.546667a42.496 42.496 0 1 1 60.16 60.16l-323.413333 323.84z"></path></svg>'), Dc = /* @__PURE__ */ _('<svg viewBox="0 0 1024 1024" class="icon"><path d="M245.333333 128h533.333334A117.333333 117.333333 0 0 1 896 245.333333v533.333334A117.333333 117.333333 0 0 1 778.666667 896H245.333333A117.333333 117.333333 0 0 1 128 778.666667V245.333333A117.333333 117.333333 0 0 1 245.333333 128z m0 64c-29.44 0-53.333333 23.893333-53.333333 53.333333v533.333334c0 29.44 23.893333 53.333333 53.333333 53.333333h533.333334c29.44 0 53.333333-23.893333 53.333333-53.333333V245.333333c0-29.44-23.893333-53.333333-53.333333-53.333333H245.333333z"></path></svg>'), Nc = /* @__PURE__ */ _("<div></div>"), Oc = /* @__PURE__ */ _('<span class="label"></span>'), Ic = () => Pc.cloneNode(!0), Ec = () => Dc.cloneNode(!0), b0 = (e) => {
  const [t, r] = M(e.checked ?? !1);
  return He(() => {
    "checked" in e && r(e.checked);
  }), (() => {
    const n = Nc.cloneNode(!0);
    return n.$$click = (s) => {
      const c = !t();
      e.onChange && e.onChange(c), r(c);
    }, p(n, (() => {
      const s = H(() => !!t());
      return () => s() ? A(Ic, {}) : A(Ec, {});
    })(), null), p(n, (() => {
      const s = H(() => !!e.label);
      return () => s() && (() => {
        const c = Oc.cloneNode(!0);
        return p(c, () => e.label), c;
      })();
    })(), null), U((s) => {
      const c = e.style, f = `klinecharts-pro-checkbox ${t() && "checked" || ""} ${e.class || ""}`;
      return s._v$ = zt(n, c, s._v$), f !== s._v$2 && me(n, s._v$2 = f), s;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), n;
  })();
};
Ye(["click"]);
const Bc = /* @__PURE__ */ _('<div class="klinecharts-pro-loading"><i class="circle1"></i><i class="circle2"></i><i class="circle3"></i></div>'), yi = () => Bc.cloneNode(!0), Fc = /* @__PURE__ */ _('<div class="klinecharts-pro-empty"><svg class="icon" viewBox="0 0 1024 1024"><path d="M855.6 427.2H168.5c-12.7 0-24.4 6.9-30.6 18L4.4 684.7C1.5 689.9 0 695.8 0 701.8v287.1c0 19.4 15.7 35.1 35.1 35.1H989c19.4 0 35.1-15.7 35.1-35.1V701.8c0-6-1.5-11.8-4.4-17.1L886.2 445.2c-6.2-11.1-17.9-18-30.6-18zM673.4 695.6c-16.5 0-30.8 11.5-34.3 27.7-12.7 58.5-64.8 102.3-127.2 102.3s-114.5-43.8-127.2-102.3c-3.5-16.1-17.8-27.7-34.3-27.7H119c-26.4 0-43.3-28-31.1-51.4l81.7-155.8c6.1-11.6 18-18.8 31.1-18.8h622.4c13 0 25 7.2 31.1 18.8l81.7 155.8c12.2 23.4-4.7 51.4-31.1 51.4H673.4zM819.9 209.5c-1-1.8-2.1-3.7-3.2-5.5-9.8-16.6-31.1-22.2-47.8-12.6L648.5 261c-17 9.8-22.7 31.6-12.6 48.4 0.9 1.4 1.7 2.9 2.5 4.4 9.5 17 31.2 22.8 48 13L807 257.3c16.7-9.7 22.4-31 12.9-47.8zM375.4 261.1L255 191.6c-16.7-9.6-38-4-47.8 12.6-1.1 1.8-2.1 3.6-3.2 5.5-9.5 16.8-3.8 38.1 12.9 47.8L337.3 327c16.9 9.7 38.6 4 48-13.1 0.8-1.5 1.7-2.9 2.5-4.4 10.2-16.8 4.5-38.6-12.4-48.4zM512 239.3h2.5c19.5 0.3 35.5-15.5 35.5-35.1v-139c0-19.3-15.6-34.9-34.8-35.1h-6.4C489.6 30.3 474 46 474 65.2v139c0 19.5 15.9 35.4 35.5 35.1h2.5z"></path></svg></div>'), Uc = () => Fc.cloneNode(!0), zc = /* @__PURE__ */ _("<ul></ul>"), Vc = /* @__PURE__ */ _("<li></li>"), vn = (e) => (() => {
  const t = zc.cloneNode(!0);
  return p(t, A(he, {
    get when() {
      return e.loading;
    },
    get children() {
      return A(yi, {});
    }
  }), null), p(t, A(he, {
    get when() {
      var r;
      return !e.loading && !e.children && !((r = e.dataSource) != null && r.length);
    },
    get children() {
      return A(Uc, {});
    }
  }), null), p(t, A(he, {
    get when() {
      return e.children;
    },
    get children() {
      return e.children;
    }
  }), null), p(t, A(he, {
    get when() {
      return !e.children;
    },
    get children() {
      var r;
      return (r = e.dataSource) == null ? void 0 : r.map((n) => {
        var s;
        return ((s = e.renderItem) == null ? void 0 : s.call(e, n)) ?? Vc.cloneNode(!0);
      });
    }
  }), null), U((r) => {
    const n = e.style, s = `klinecharts-pro-list ${e.class ?? ""}`;
    return r._v$ = zt(t, n, r._v$), s !== r._v$2 && me(t, r._v$2 = s), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})(), Rc = /* @__PURE__ */ _('<div class="klinecharts-pro-modal"><div class="inner"><div class="title-container"><svg class="close-icon" viewBox="0 0 1024 1024"><path d="M934.184927 199.723787 622.457206 511.452531l311.727721 311.703161c14.334473 14.229073 23.069415 33.951253 23.069415 55.743582 0 43.430138-35.178197 78.660524-78.735226 78.660524-21.664416 0-41.361013-8.865925-55.642275-23.069415L511.149121 622.838388 199.420377 934.490384c-14.204513 14.20349-33.901111 23.069415-55.642275 23.069415-43.482327 0-78.737272-35.230386-78.737272-78.660524 0-21.792329 8.864902-41.513486 23.094998-55.743582l311.677579-311.703161L88.135828 199.723787c-14.230096-14.255679-23.094998-33.92567-23.094998-55.642275 0-43.430138 35.254945-78.762855 78.737272-78.762855 21.741163 0 41.437761 8.813736 55.642275 23.069415l311.727721 311.727721L822.876842 88.389096c14.281261-14.255679 33.977859-23.069415 55.642275-23.069415 43.557028 0 78.735226 35.332716 78.735226 78.762855C957.254342 165.798117 948.5194 185.468109 934.184927 199.723787"></path></svg></div><div class="content-container"></div></div></div>'), Kc = /* @__PURE__ */ _('<div class="button-container"></div>'), At = (e) => (() => {
  const t = Rc.cloneNode(!0), r = t.firstChild, n = r.firstChild, s = n.firstChild, c = n.nextSibling;
  return t.$$click = (f) => {
    f.target === f.currentTarget && e.onClose && e.onClose();
  }, p(n, () => e.title, s), ut(s, "click", e.onClose, !0), p(c, () => e.children), p(r, (() => {
    const f = H(() => !!(e.buttons && e.buttons.length > 0));
    return () => f() && (() => {
      const m = Kc.cloneNode(!0);
      return p(m, () => e.buttons.map((v) => A(Mc, K0(v, {
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
      })))), U((v) => {
        const L = e.btnParentStyle, $ = !!e.isMobile;
        return v._v$8 = zt(m, L, v._v$8), $ !== v._v$9 && m.classList.toggle("mobile-buttons", v._v$9 = $), v;
      }, {
        _v$8: void 0,
        _v$9: void 0
      }), m;
    })();
  })(), null), U((f) => {
    const m = !!e.isMobile, v = e.isMobile ? "100%" : `${e.width ?? 400}px`, L = (e.isMobile, "auto"), $ = e.isMobile ? "60vh" : "90vh", w = !!e.isMobile, E = !!e.isMobile, Q = !!e.isMobile;
    return m !== f._v$ && t.classList.toggle("mobile-modal", f._v$ = m), v !== f._v$2 && r.style.setProperty("width", f._v$2 = v), L !== f._v$3 && r.style.setProperty("height", f._v$3 = L), $ !== f._v$4 && r.style.setProperty("max-height", f._v$4 = $), w !== f._v$5 && r.classList.toggle("mobile-inner", f._v$5 = w), E !== f._v$6 && n.classList.toggle("mobile-title", f._v$6 = E), Q !== f._v$7 && c.classList.toggle("mobile-content", f._v$7 = Q), f;
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
const jc = /* @__PURE__ */ _('<div tabindex="0"><div class="selector-container"><span class="value"></span><i class="arrow"></i></div></div>'), Qc = /* @__PURE__ */ _('<div class="drop-down-container"><ul></ul></div>'), Zc = /* @__PURE__ */ _('<div><input type="text"></div>'), Hc = /* @__PURE__ */ _("<li></li>"), hr = (e) => {
  const [t, r] = M(!1), [n, s] = M("");
  let c, f;
  const m = H(() => {
    if (!e.dataSource || !e.searchable)
      return e.dataSource;
    const $ = n().toLowerCase().trim();
    return $ ? typeof e.dataSource[0] == "string" ? e.dataSource.filter((E) => E.toLowerCase().includes($)) : e.dataSource.filter((E) => {
      var I, K;
      const Q = ((I = E.text) == null ? void 0 : I.toString().toLowerCase()) || "", re = ((K = E.key) == null ? void 0 : K.toLowerCase()) || "";
      return Q.includes($) || re.includes($);
    }) : e.dataSource;
  }), v = () => {
    const $ = !t();
    r($), s(""), $ && e.searchable && setTimeout(() => c == null ? void 0 : c.focus(), 50);
  }, L = ($) => {
    const w = $.relatedTarget;
    f && w && f.contains(w) || setTimeout(() => {
      f && document.activeElement && f.contains(document.activeElement) || (r(!1), s(""));
    }, 0);
  };
  return (() => {
    const $ = jc.cloneNode(!0), w = $.firstChild, E = w.firstChild;
    $.addEventListener("blur", L), $.$$click = (re) => {
      re.stopPropagation(), !re.target.closest(".drop-down-container") && v();
    };
    const Q = f;
    return typeof Q == "function" ? xt(Q, $) : f = $, p(E, () => e.value), p($, (() => {
      const re = H(() => !!(e.dataSource && e.dataSource.length > 0));
      return () => re() && (() => {
        const I = Qc.cloneNode(!0), K = I.firstChild;
        return I.$$click = (z) => z.stopPropagation(), I.$$mousedown = (z) => {
          z.preventDefault(), z.stopPropagation();
        }, p(I, (() => {
          const z = H(() => !!e.searchable);
          return () => z() && (() => {
            const ce = Zc.cloneNode(!0), V = ce.firstChild;
            ce.style.setProperty("padding", "8px"), ce.style.setProperty("border-bottom", "1px solid #333"), V.$$click = (Y) => Y.stopPropagation(), V.$$input = (Y) => s(Y.currentTarget.value);
            const oe = c;
            return typeof oe == "function" ? xt(oe, V) : c = V, V.style.setProperty("width", "100%"), V.style.setProperty("padding", "6px 10px"), V.style.setProperty("border", "1px solid var(--klinecharts-pro-border-color)"), V.style.setProperty("border-radius", "4px"), V.style.setProperty("background-color", "var(--klinecharts-pro-popover-background-color)"), V.style.setProperty("color", "#fff"), V.style.setProperty("font-size", "13px"), V.style.setProperty("outline", "none"), U(() => Oe(V, "placeholder", e.searchPlaceholder || "Search...")), U(() => V.value = n()), ce;
          })();
        })(), K), p(K, () => {
          var z;
          return (z = m()) == null ? void 0 : z.map((ce) => {
            const oe = ce[e.valueKey ?? "text"] ?? ce;
            return (() => {
              const Y = Hc.cloneNode(!0);
              return Y.$$click = (ve) => {
                var W;
                ve.stopPropagation(), e.value !== oe && ((W = e.onSelected) == null || W.call(e, ce)), r(!1), s("");
              }, p(Y, oe), U(() => Y.classList.toggle("selected", e.value === oe)), Y;
            })();
          });
        }), I;
      })();
    })(), null), U((re) => {
      const I = e.style, K = `klinecharts-pro-select ${e.class ?? ""} ${t() ? "klinecharts-pro-select-show" : ""}`;
      return re._v$ = zt($, I, re._v$), K !== re._v$2 && me($, re._v$2 = K), re;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), $;
  })();
};
Ye(["click", "mousedown", "input"]);
const Yc = /* @__PURE__ */ _('<span class="prefix"></span>'), Wc = /* @__PURE__ */ _('<span class="suffix"></span>'), qc = /* @__PURE__ */ _('<div><input class="value"></div>'), Ci = (e) => {
  const t = K0({
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER
  }, e);
  let r;
  const [n, s] = M("normal");
  return (() => {
    const c = qc.cloneNode(!0), f = c.firstChild;
    return c.$$click = () => {
      r == null || r.focus();
    }, p(c, A(he, {
      get when() {
        return t.prefix;
      },
      get children() {
        const m = Yc.cloneNode(!0);
        return p(m, () => t.prefix), m;
      }
    }), f), f.addEventListener("change", (m) => {
      var L, $;
      const v = m.target.value;
      if ("precision" in t) {
        let w;
        const E = Math.max(0, Math.floor(t.precision));
        E <= 0 ? w = new RegExp(/^[1-9]\d*$/) : w = new RegExp("^\\d+\\.?\\d{0," + E + "}$"), (v === "" || w.test(v) && +v >= t.min && +v <= t.max) && ((L = t.onChange) == null || L.call(t, v === "" ? v : +v));
      } else
        ($ = t.onChange) == null || $.call(t, v);
    }), f.addEventListener("blur", () => {
      s("normal");
    }), f.addEventListener("focus", () => {
      s("focus");
    }), xt((m) => {
      r = m;
    }, f), p(c, A(he, {
      get when() {
        return t.suffix;
      },
      get children() {
        const m = Wc.cloneNode(!0);
        return p(m, () => t.suffix), m;
      }
    }), null), U((m) => {
      const v = t.style, L = `klinecharts-pro-input ${t.class ?? ""}`, $ = n(), w = t.placeholder ?? "";
      return m._v$ = zt(c, v, m._v$), L !== m._v$2 && me(c, m._v$2 = L), $ !== m._v$3 && Oe(c, "data-status", m._v$3 = $), w !== m._v$4 && Oe(f, "placeholder", m._v$4 = w), m;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0
    }), U(() => f.value = t.value), c;
  })();
};
Ye(["click"]);
const Gc = /* @__PURE__ */ _('<div><i class="thumb"></i></div>'), pi = (e) => (() => {
  const t = Gc.cloneNode(!0);
  return t.$$click = (r) => {
    e.onChange && e.onChange();
  }, U((r) => {
    const n = e.style, s = `klinecharts-pro-switch ${e.open ? "turn-on" : "turn-off"} ${e.class ?? ""}`;
    return r._v$ = zt(t, n, r._v$), s !== r._v$2 && me(t, r._v$2 = s), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
Ye(["click"]);
let de = null, $0 = !1;
const w1 = /* @__PURE__ */ new Map(), Xc = 500, _0 = 3;
function rn(e) {
  return e == null ? void 0 : e.trim().toLowerCase();
}
function Jc(e, t) {
  return e.x >= t.x && e.x <= t.x + t.width && e.y >= t.y && e.y <= t.y + t.height;
}
function fr(e) {
  const t = de;
  if (!t || !e)
    return null;
  const r = rn(e);
  return r === rn(t.upColor) ? "up" : r === rn(t.downColor) ? "down" : r === rn(t.noChangeColor) ? "noChange" : null;
}
function Xn(e, t, r) {
  const n = de;
  if (!n || !e)
    return e;
  const s = r ?? fr(e);
  return s === "up" ? t === "border" ? n.upBorderColor ?? n.borderUpColor ?? e : t === "wick" ? n.upWickColor ?? n.wickUpColor ?? e : n.upColor ?? e : s === "down" ? t === "border" ? n.downBorderColor ?? n.borderDownColor ?? e : t === "wick" ? n.downWickColor ?? n.wickDownColor ?? e : n.downColor ?? e : s === "noChange" ? t === "border" ? n.noChangeBorderColor ?? n.borderNoChangeColor ?? e : t === "wick" ? n.noChangeWickColor ?? n.wickNoChangeColor ?? e : n.noChangeColor ?? e : e;
}
function e4(e) {
  return Math.round((e.x + e.width / 2) * 1e3) / 1e3;
}
function t4(e) {
  return Math.round(Math.abs(e.width) * 1e3) / 1e3;
}
function n4(e, t) {
  if (t)
    return !1;
  const r = e4(e), n = t4(e), s = w1.get(r) ?? 0;
  if (n > Math.max(_0, s)) {
    if (w1.set(r, n), w1.size > Xc) {
      const f = w1.keys().next().value;
      f !== void 0 && w1.delete(f);
    }
    return !1;
  }
  const c = Math.max(_0, s * 0.35);
  return n <= c;
}
function Jn(e, t, r) {
  const { x: n, y: s, width: c, height: f } = t, m = Math.max(0, Math.min(r, Math.abs(c) / 2, Math.abs(f) / 2));
  e.beginPath(), e.moveTo(n + m, s), e.arcTo(n + c, s, n + c, s + f, m), e.arcTo(n + c, s + f, n, s + f, m), e.arcTo(n, s + f, n, s, m), e.arcTo(n, s, n + c, s, m), e.closePath();
}
function r4(e, t, r) {
  const n = r.style ?? Xt.Fill, s = r.color ?? "currentColor", c = fr(r.color) ?? fr(r.borderColor), f = n === Xt.Stroke, m = c ? n4(t, f) : !1, v = Xn(s, m ? "wick" : "body", c), L = r.borderSize ?? 1, $ = Xn(r.borderColor ?? s, "border", c), w = r.borderStyle ?? Ve.Solid, E = r.borderRadius ?? 0, Q = r.borderDashedValue ?? [2, 2], re = n === Xt.Fill || r.style === Xt.StrokeFill, I = n === Xt.Stroke || r.style === Xt.StrokeFill;
  if (re) {
    e.fillStyle = v, Jn(e, t, E), e.fill();
    const K = Xn(s, "border", c);
    !m && c && K && (e.strokeStyle = K, e.lineWidth = Math.max(1, L), e.setLineDash([]), Jn(e, t, E), e.stroke());
  }
  I && (e.strokeStyle = $, e.lineWidth = L, e.setLineDash(w === Ve.Dashed ? Q : []), Jn(e, t, E), e.stroke());
}
function o4() {
  $0 || ($0 = !0, Ca({
    name: "rect",
    checkEventOn: Jc,
    draw: r4
  }));
}
function kt(e) {
  var r;
  const t = (r = e == null ? void 0 : e.candle) == null ? void 0 : r.bar;
  t && (de = {
    ...de ?? {},
    ...t,
    upBorderColor: t.upBorderColor ?? t.borderUpColor ?? t.upColor ?? (de == null ? void 0 : de.upBorderColor) ?? (de == null ? void 0 : de.borderUpColor),
    downBorderColor: t.downBorderColor ?? t.borderDownColor ?? t.downColor ?? (de == null ? void 0 : de.downBorderColor) ?? (de == null ? void 0 : de.borderDownColor),
    noChangeBorderColor: t.noChangeBorderColor ?? t.borderNoChangeColor ?? t.noChangeColor ?? (de == null ? void 0 : de.noChangeBorderColor) ?? (de == null ? void 0 : de.borderNoChangeColor),
    upWickColor: t.upWickColor ?? t.wickUpColor ?? t.upColor ?? (de == null ? void 0 : de.upWickColor) ?? (de == null ? void 0 : de.wickUpColor),
    downWickColor: t.downWickColor ?? t.wickDownColor ?? t.downColor ?? (de == null ? void 0 : de.downWickColor) ?? (de == null ? void 0 : de.wickDownColor),
    noChangeWickColor: t.noChangeWickColor ?? t.wickNoChangeColor ?? t.noChangeColor ?? (de == null ? void 0 : de.noChangeWickColor) ?? (de == null ? void 0 : de.wickNoChangeColor)
  });
}
const i4 = "指标", a4 = "更多", s4 = "主图指标", l4 = "副图指标", c4 = "设置", u4 = "时区", d4 = "截屏", h4 = "全屏", f4 = "退出全屏", m4 = "保存", g4 = "确定", y4 = "取消", C4 = "MA(移动平均线)", p4 = "EMA(指数平滑移动平均线)", v4 = "SMA", b4 = "BOLL(布林线)", $4 = "BBI(多空指数)", _4 = "SAR(停损点指向指标)", k4 = "VOL(成交量)", x4 = "MACD(指数平滑异同移动平均线)", L4 = "KDJ(随机指标)", w4 = "RSI(相对强弱指标)", A4 = "BIAS(乖离率)", S4 = "BRAR(情绪指标)", T4 = "CCI(顺势指标)", M4 = "DMI(动向指标)", P4 = "CR(能量指标)", D4 = "PSY(心理线)", N4 = "DMA(平行线差指标)", O4 = "TRIX(三重指数平滑平均线)", I4 = "OBV(能量潮指标)", E4 = "VR(成交量变异率)", B4 = "WR(威廉指标)", F4 = "MTM(动量指标)", U4 = "EMV(简易波动指标)", z4 = "ROC(变动率指标)", V4 = "PVT(价量趋势指标)", R4 = "AO(动量震荡指标)", K4 = "世界统一时间", j4 = "(UTC-10) 檀香山", Q4 = "(UTC-8) 朱诺", Z4 = "(UTC-7) 洛杉矶", H4 = "(UTC-5) 芝加哥", Y4 = "(UTC-4) 多伦多", W4 = "(UTC-3) 圣保罗", q4 = "(UTC+1) 伦敦", G4 = "(UTC+2) 柏林", X4 = "(UTC+3) 巴林", J4 = "(UTC+4) 迪拜", eu = "(UTC+5) 阿什哈巴德", tu = "(UTC+6) 阿拉木图", nu = "(UTC+7) 曼谷", ru = "(UTC+8) 上海", ou = "(UTC+9) 东京", iu = "(UTC+10) 悉尼", au = "(UTC+12) 诺福克岛", su = "水平直线", lu = "水平射线", cu = "水平线段", uu = "垂直直线", du = "垂直射线", hu = "垂直线段", fu = "直线", mu = "射线", gu = "线段", yu = "箭头", Cu = "价格线", pu = "价格通道线", vu = "平行直线", bu = "斐波那契回调直线", $u = "斐波那契回调线段", _u = "斐波那契圆环", ku = "斐波那契螺旋", xu = "斐波那契速度阻力扇", Lu = "斐波那契趋势扩展", wu = "江恩箱", Au = "矩形", Su = "平行四边形", Tu = "圆", Mu = "三角形", Pu = "三浪", Du = "五浪", Nu = "八浪", Ou = "任意浪", Iu = "ABCD形态", Eu = "XABCD形态", Bu = "弱磁模式", Fu = "强磁模式", Uu = "商品搜索", zu = "商品代码", Vu = "参数1", Ru = "参数2", Ku = "参数3", ju = "参数4", Qu = "参数5", Zu = "周期", Hu = "标准差", Yu = "蜡烛图类型", Wu = "全实心", qu = "全空心", Gu = "涨空心", Xu = "跌空心", Ju = "OHLC", ed = "面积图", td = "最新价显示", nd = "最高价显示", rd = "最低价显示", od = "指标最新值显示", id = "价格轴类型", ad = "线性轴", sd = "百分比轴", ld = "对数轴", cd = "倒置坐标", ud = "网格线显示", dd = "恢复默认", hd = {
  indicator: i4,
  more: a4,
  main_indicator: s4,
  sub_indicator: l4,
  setting: c4,
  timezone: u4,
  screenshot: d4,
  full_screen: h4,
  exit_full_screen: f4,
  save: m4,
  confirm: g4,
  cancel: y4,
  ma: C4,
  ema: p4,
  sma: v4,
  boll: b4,
  bbi: $4,
  sar: _4,
  vol: k4,
  macd: x4,
  kdj: L4,
  rsi: w4,
  bias: A4,
  brar: S4,
  cci: T4,
  dmi: M4,
  cr: P4,
  psy: D4,
  dma: N4,
  trix: O4,
  obv: I4,
  vr: E4,
  wr: B4,
  mtm: F4,
  emv: U4,
  roc: z4,
  pvt: V4,
  ao: R4,
  utc: K4,
  honolulu: j4,
  juneau: Q4,
  los_angeles: Z4,
  chicago: H4,
  toronto: Y4,
  sao_paulo: W4,
  london: q4,
  berlin: G4,
  bahrain: X4,
  dubai: J4,
  ashkhabad: eu,
  almaty: tu,
  bangkok: nu,
  shanghai: ru,
  tokyo: ou,
  sydney: iu,
  norfolk: au,
  horizontal_straight_line: su,
  horizontal_ray_line: lu,
  horizontal_segment: cu,
  vertical_straight_line: uu,
  vertical_ray_line: du,
  vertical_segment: hu,
  straight_line: fu,
  ray_line: mu,
  segment: gu,
  arrow: yu,
  price_line: Cu,
  price_channel_line: pu,
  parallel_straight_line: vu,
  fibonacci_line: bu,
  fibonacci_segment: $u,
  fibonacci_circle: _u,
  fibonacci_spiral: ku,
  fibonacci_speed_resistance_fan: xu,
  fibonacci_extension: Lu,
  gann_box: wu,
  rect: Au,
  parallelogram: Su,
  circle: Tu,
  triangle: Mu,
  three_waves: Pu,
  five_waves: Du,
  eight_waves: Nu,
  any_waves: Ou,
  abcd: Iu,
  xabcd: Eu,
  weak_magnet: Bu,
  strong_magnet: Fu,
  symbol_search: Uu,
  symbol_code: zu,
  params_1: Vu,
  params_2: Ru,
  params_3: Ku,
  params_4: ju,
  params_5: Qu,
  period: Zu,
  standard_deviation: Hu,
  candle_type: Yu,
  candle_solid: Wu,
  candle_stroke: qu,
  candle_up_stroke: Gu,
  candle_down_stroke: Xu,
  ohlc: Ju,
  area: ed,
  last_price_show: td,
  high_price_show: nd,
  low_price_show: rd,
  indicator_last_value_show: od,
  price_axis_type: id,
  normal: ad,
  percentage: sd,
  log: ld,
  reverse_coordinate: cd,
  grid_show: ud,
  restore_default: dd
}, fd = "Indicator", md = "More", gd = "Main Indicator", yd = "Sub Indicator", Cd = "Setting", pd = "Timezone", vd = "Screenshot", bd = "Full Screen", $d = "Exit", _d = "Save", kd = "Confirm", xd = "Cancel", Ld = "MA(Moving Average)", wd = "EMA(Exponential Moving Average)", Ad = "SMA", Sd = "BOLL(Bolinger Bands)", Td = "BBI(Bull And Bearlndex)", Md = "SAR(Stop and Reverse)", Pd = "VOL(Volume)", Dd = "MACD(Moving Average Convergence / Divergence)", Nd = "KDJ(KDJ Index)", Od = "RSI(Relative Strength Index)", Id = "BIAS(Bias Ratio)", Ed = "BRAR(情绪指标)", Bd = "CCI(Commodity Channel Index)", Fd = "DMI(Directional Movement Index)", Ud = "CR(能量指标)", zd = "PSY(Psychological Line)", Vd = "DMA(Different of Moving Average)", Rd = "TRIX(Triple Exponentially Smoothed Moving Average)", Kd = "OBV(On Balance Volume)", jd = "VR(Volatility Volume Ratio)", Qd = "WR(Williams %R)", Zd = "MTM(Momentum Index)", Hd = "EMV(Ease of Movement Value)", Yd = "ROC(Price Rate of Change)", Wd = "PVT(Price and Volume Trend)", qd = "AO(Awesome Oscillator)", Gd = "UTC", Xd = "(UTC-10) Honolulu", Jd = "(UTC-8) Juneau", eh = "(UTC-7) Los Angeles", th = "(UTC-5) Chicago", nh = "(UTC-4) Toronto", rh = "(UTC-3) Sao Paulo", oh = "(UTC+1) London", ih = "(UTC+2) Berlin", ah = "(UTC+3) Bahrain", sh = "(UTC+4) Dubai", lh = "(UTC+5) Ashkhabad", ch = "(UTC+6) Almaty", uh = "(UTC+7) Bangkok", dh = "(UTC+8) Shanghai", hh = "(UTC+9) Tokyo", fh = "(UTC+10) Sydney", mh = "(UTC+12) Norfolk", gh = "Horizontal Line", yh = "Horizontal Ray", Ch = "Horizontal Segment", ph = "Vertical Line", vh = "Vertical Ray", bh = "Vertical Segment", $h = "Trend Line", _h = "Ray", kh = "Segment", xh = "Arrow", Lh = "Price Line", wh = "Price Channel Line", Ah = "Parallel Line", Sh = "Fibonacci Line", Th = "Fibonacci Segment", Mh = "Fibonacci Circle", Ph = "Fibonacci Spiral", Dh = "Fibonacci Sector", Nh = "Fibonacci Extension", Oh = "Gann Box", Ih = "Rectangle", Eh = "Parallelogram", Bh = "Circle", Fh = "Triangle", Uh = "Three Waves", zh = "Five Waves", Vh = "Eight Waves", Rh = "Any Waves", Kh = "ABCD Pattern", jh = "XABCD Pattern", Qh = "Weak Magnet", Zh = "Strong Magnet", Hh = "Symbol Search", Yh = "Symbol Code", Wh = "Parameter 1", qh = "Parameter 2", Gh = "Parameter 3", Xh = "Parameter 4", Jh = "Parameter 5", ef = "Period", tf = "Standard Deviation", nf = "Candle Type", rf = "Candle Solid", of = "Candle Stroke", af = "Candle Up Stroke", sf = "Candle Down Stroke", lf = "OHLC", cf = "Area", uf = "Show Last Price", df = "Show Highest Price", hf = "Show Lowest Price", ff = "Show indicator's last value", mf = "Price Axis Type", gf = "Normal", yf = "Percentage", Cf = "Log", pf = "Reverse Coordinate", vf = "Show Grids", bf = "Restore Defaults", $f = {
  indicator: fd,
  more: md,
  main_indicator: gd,
  sub_indicator: yd,
  setting: Cd,
  timezone: pd,
  screenshot: vd,
  full_screen: bd,
  exit_full_screen: $d,
  save: _d,
  confirm: kd,
  cancel: xd,
  ma: Ld,
  ema: wd,
  sma: Ad,
  boll: Sd,
  bbi: Td,
  sar: Md,
  vol: Pd,
  macd: Dd,
  kdj: Nd,
  rsi: Od,
  bias: Id,
  brar: Ed,
  cci: Bd,
  dmi: Fd,
  cr: Ud,
  psy: zd,
  dma: Vd,
  trix: Rd,
  obv: Kd,
  vr: jd,
  wr: Qd,
  mtm: Zd,
  emv: Hd,
  roc: Yd,
  pvt: Wd,
  ao: qd,
  utc: Gd,
  honolulu: Xd,
  juneau: Jd,
  los_angeles: eh,
  chicago: th,
  toronto: nh,
  sao_paulo: rh,
  london: oh,
  berlin: ih,
  bahrain: ah,
  dubai: sh,
  ashkhabad: lh,
  almaty: ch,
  bangkok: uh,
  shanghai: dh,
  tokyo: hh,
  sydney: fh,
  norfolk: mh,
  horizontal_straight_line: gh,
  horizontal_ray_line: yh,
  horizontal_segment: Ch,
  vertical_straight_line: ph,
  vertical_ray_line: vh,
  vertical_segment: bh,
  straight_line: $h,
  ray_line: _h,
  segment: kh,
  arrow: xh,
  price_line: Lh,
  price_channel_line: wh,
  parallel_straight_line: Ah,
  fibonacci_line: Sh,
  fibonacci_segment: Th,
  fibonacci_circle: Mh,
  fibonacci_spiral: Ph,
  fibonacci_speed_resistance_fan: Dh,
  fibonacci_extension: Nh,
  gann_box: Oh,
  rect: Ih,
  parallelogram: Eh,
  circle: Bh,
  triangle: Fh,
  three_waves: Uh,
  five_waves: zh,
  eight_waves: Vh,
  any_waves: Rh,
  abcd: Kh,
  xabcd: jh,
  weak_magnet: Qh,
  strong_magnet: Zh,
  symbol_search: Hh,
  symbol_code: Yh,
  params_1: Wh,
  params_2: qh,
  params_3: Gh,
  params_4: Xh,
  params_5: Jh,
  period: ef,
  standard_deviation: tf,
  candle_type: nf,
  candle_solid: rf,
  candle_stroke: of,
  candle_up_stroke: af,
  candle_down_stroke: sf,
  ohlc: lf,
  area: cf,
  last_price_show: uf,
  high_price_show: df,
  low_price_show: hf,
  indicator_last_value_show: ff,
  price_axis_type: mf,
  normal: gf,
  percentage: yf,
  log: Cf,
  reverse_coordinate: pf,
  grid_show: vf,
  restore_default: bf
}, vi = {
  "zh-CN": hd,
  "en-US": $f
};
function nC(e, t) {
  vi[e] = t;
}
const d = (e, t) => {
  var r;
  return ((r = vi[t]) == null ? void 0 : r[e]) ?? e;
}, _f = /* @__PURE__ */ _('<div class="scroll-indicator left"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg></div>'), kf = /* @__PURE__ */ _('<img alt="symbol">'), xf = /* @__PURE__ */ _('<div class="symbol"><span></span></div>'), Lf = /* @__PURE__ */ _('<span class="down-arrow-icon mobile-separate-arrow"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></span>'), wf = /* @__PURE__ */ _('<span class="mobile-more-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg></span>'), Af = /* @__PURE__ */ _('<div class="item tools" title="Time Tools"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M16 3v4"></path><path d="M8 3v4"></path><path d="M3 10h18"></path><path d="M12 14v4"></path><path d="M10 16h4"></path></svg></div>'), Sf = /* @__PURE__ */ _('<div class="item tools"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div>'), Tf = /* @__PURE__ */ _('<div class="klinecharts-pro-order-tools-display-menu"></div>'), Mf = /* @__PURE__ */ _('<div class="klinecharts-pro-order-tools-popover"><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Quick Order</span></span><span class="klinecharts-pro-order-tools-chevron">›</span></button><div class="klinecharts-pro-order-tools-submenu"><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Floating Window</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Plus Button</span></label></div></div><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Open Orders</span></span><span class="klinecharts-pro-order-tools-chevron">&rsaquo;</span></button><div class="klinecharts-pro-order-tools-submenu"><div class="klinecharts-pro-order-tools-setting-row"><span class="klinecharts-pro-order-tools-label">Extended Price Line</span></div><div class="klinecharts-pro-order-tools-setting-row"><span class="klinecharts-pro-order-tools-label">Display</span><div class="klinecharts-pro-order-tools-display"><button type="button" class="klinecharts-pro-order-tools-display-button"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4"></path></svg></button></div></div></div></div><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Positions</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Breakeven Price</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Liquidation Price</span></label><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Price Line</span></span><span class="klinecharts-pro-order-tools-chevron">&rsaquo;</span></button><div class="klinecharts-pro-order-tools-submenu"><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Market Price Line</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Count Down</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Bid & Ask Price</span></label></div></div><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Order Preview Line</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Order History</span></label></div>'), Pf = /* @__PURE__ */ _('<div class="order-dropdown-main"><div class="item tools order-tools-trigger"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Orders"><path d="M4 7h10"></path><path d="M4 12h8"></path><path d="M4 17h6"></path><path d="M18 6v12"></path><path d="M15 15l3 3 3-3"></path></svg><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></div></div>'), Df = /* @__PURE__ */ _('<div class="item tools"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path><path d="M15.22299772857666,9.722223632261718C12.59389772857666,9.722223632261718,10.44600772857666,12.020201374511718,10.44600772857666,14.861111374511719C10.44600772857666,17.70202137451172,12.58215772857666,20.000021374511718,15.223007728576661,20.000021374511718C17.86384772857666,20.000021374511718,19.99999772857666,17.70202137451172,19.99999772857666,14.861111374511719C19.99999772857666,12.020201374511718,17.85211772857666,9.72222212709572,15.22299772857666,9.722223632261718ZM15.22299772857666,18.598491374511717C13.30985772857666,18.598491374511717,11.737087728576661,16.91919137451172,11.737087728576661,14.848481374511719C11.737087728576661,12.777781374511719,13.29811772857666,11.098491374511719,15.22299772857666,11.098491374511719C17.14787772857666,11.098491374511719,18.708917728576658,12.777781374511719,18.708917728576658,14.848481374511719C18.708917728576658,16.91919137451172,17.13614772857666,18.59848137451172,15.22299772857666,18.598491374511717Z"></path><path d="M15.692486288146974,15.050496970825195L15.692486288146974,12.676760970825196C15.692486288146974,12.297972970825196,15.399058288146973,11.982316970825195,15.046945288146972,11.982316970825195C14.694833288146972,11.982316970825195,14.401406288146973,12.297972970825196,14.401406288146973,12.676760970825196L14.401406288146973,15.340896970825195C14.401406288146973,15.530296970825194,14.471829288146973,15.694436970825196,14.589200288146973,15.833326970825196L15.751176288146972,17.095956970825195C15.868546288146973,17.222216970825194,16.032866288146973,17.297976970825196,16.208916288146973,17.297976970825196C16.384976288146973,17.297976970825196,16.537556288146973,17.222216970825194,16.666666288146974,17.095956970825195C16.78403628814697,16.969686970825194,16.854456288146974,16.792916970825196,16.854456288146974,16.603526970825193C16.854456288146974,16.414136970825197,16.78403628814697,16.237366970825196,16.666666288146974,16.111106970825197L15.692486288146974,15.050496970825195Z"></path></svg></div>'), Nf = /* @__PURE__ */ _('<div class="item tools"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg></div>'), Of = /* @__PURE__ */ _('<div class="item tools"><svg viewBox="0 0 20.5 20"><path d="M6.50977,1L13.4902,1C13.6406,1,13.7695,1.1104910000000001,13.7969,1.2631700000000001L14.0273,2.52277C14.1387,3.13147,14.6543,3.57143,15.2559,3.57143L17.5,3.57143C18.8809,3.57143,20,4.72254,20,6.14286L20,16.4286C20,17.8489,18.8809,19,17.5,19L2.5,19C1.11914,19,0,17.8489,0,16.4286L0,6.14286C0,4.72254,1.11914,3.57143,2.5,3.57143L4.74414,3.57143C5.3457,3.57143,5.86133,3.13147,5.97266,2.52277L6.20312,1.2631700000000001C6.23047,1.1104910000000001,6.35937,1,6.50977,1ZM15.2559,4.857139999999999C14.0547,4.857139999999999,13.0215,3.97522,12.7988,2.75982L12.7129,2.28571L7.28711,2.28571L7.20117,2.75982C6.98047,3.97522,5.94727,4.857139999999999,4.74414,4.857139999999999L2.5,4.857139999999999C1.81055,4.857139999999999,1.25,5.43371,1.25,6.14286L1.25,16.4286C1.25,17.1377,1.81055,17.7143,2.5,17.7143L17.5,17.7143C18.1895,17.7143,18.75,17.1377,18.75,16.4286L18.75,6.14286C18.75,5.43371,18.1895,4.857139999999999,17.5,4.857139999999999L15.2559,4.857139999999999ZM4.375,6.78571L3.125,6.78571C2.7793,6.78571,2.5,6.49844,2.5,6.14286C2.5,5.78728,2.7793,5.5,3.125,5.5L4.375,5.5C4.7207,5.5,5,5.78728,5,6.14286C5,6.49844,4.7207,6.78571,4.375,6.78571ZM10,6.14286C7.06641,6.14286,4.6875,8.58973,4.6875,11.6071C4.6875,14.6246,7.06641,17.0714,10,17.0714C12.9336,17.0714,15.3125,14.6246,15.3125,11.6071C15.3125,8.58973,12.9336,6.14286,10,6.14286ZM10,7.42857C11.0859,7.42857,12.1055,7.8625,12.873,8.65201C13.6406,9.44152,14.0625,10.49018,14.0625,11.6071C14.0625,12.7241,13.6406,13.7728,12.873,14.5623C12.1055,15.3518,11.0859,15.7857,10,15.7857C8.91406,15.7857,7.89453,15.3518,7.12695,14.5623C6.35937,13.7728,5.9375,12.7241,5.9375,11.6071C5.9375,10.49018,6.35938,9.44152,7.12695,8.65201C7.89453,7.8625,8.91406,7.42857,10,7.42857ZM10,9.67857C8.96484,9.67857,8.125,10.54241,8.125,11.6071C8.125,12.6719,8.96484,13.5357,10,13.5357C11.0352,13.5357,11.875,12.6719,11.875,11.6071C11.875,10.54241,11.0352,9.67857,10,9.67857ZM10,10.96429C10.3438,10.96429,10.625,11.2536,10.625,11.6071C10.625,11.9607,10.3438,12.25,10,12.25C9.65625,12.25,9.375,11.9607,9.375,11.6071C9.375,11.2536,9.65625,10.96429,10,10.96429Z"></path></svg></div>'), If = /* @__PURE__ */ _('<div class="item tools chart-view-toggle"></div>'), Ef = /* @__PURE__ */ _('<div class="scroll-indicator right"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"></path></svg></div>'), Bf = /* @__PURE__ */ _('<div><div class="klinecharts-pro-period-bar"><div class="menu-container"><svg viewBox="0 0 1024 1024"><path d="M192.037 287.953h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 479.169H438.553c-17.673 0-32 14.327-32 32s14.327 32 32 32h393.608c17.673 0 32-14.327 32-32s-14.327-32-32-32zM832.161 735.802H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32zM319.028 351.594l-160 160 160 160z"></path></svg></div><div><div class="item tools fullscreen-toggle"></div></div></div></div>'), Ff = /* @__PURE__ */ _("<span></span>"), Uf = /* @__PURE__ */ _('<button type="button"></button>'), zf = /* @__PURE__ */ _('<svg viewBox="0 0 20 20"><path d="M1.08108,0L0,1.079L4.18919,5.27938L2.54826,6.91715L6.9112,6.91715L6.9112,2.56262L5.28957,4.18112L1.08108,0ZM15.8108,5.27938L20,1.079L18.9189,0L14.7104,4.18112L13.0888,2.56262L13.0888,6.91715L17.4517,6.91715L15.8108,5.27938ZM4.16988,14.7014L0.07722,18.8054L1.1583,20L5.27027,15.7996L6.9112,17.4374L6.9112,13.0829L2.54826,13.0829L4.16988,14.7014ZM17.4517,13.0829L13.0888,13.0829L13.0888,17.4374L14.7297,15.7996L18.8417,20L19.9228,18.8054L15.8301,14.7013L17.4517,13.0829Z"></path></svg>'), Vf = /* @__PURE__ */ _('<svg viewBox="0 0 20 20"><path d="M2.93444,1.76899L7.57544,6.40999L6.38918,7.59626L1.76899,2.93444L0,4.70343L0,0L4.70343,0L2.93444,1.76899ZM6.40999,12.4037L1.76899,17.0447L0,15.2758L0,19.9792L4.70343,19.9792L2.93444,18.2102L7.57544,13.5692L6.40999,12.4037ZM15.2758,0L17.0447,1.76899L12.4037,6.40999L13.59,7.59626L18.231,2.95526L20,4.72425L20,0L15.2758,0ZM13.5692,12.4037L12.3829,13.59L17.0239,18.231L15.2549,20L19.9792,20L19.9792,15.2758L18.2102,17.0447L13.5692,12.4037Z"></path></svg>'), Rf = /* @__PURE__ */ _('<svg viewBox="0 0 24 24"><path d="M3 20V7l4 3 5-7 5 4h4v13H3Zm5-3 4-5.5 7 5.45V9h-2.7l-3.9-3.1-4.95 6.95L5 10.4V14l3 3Z"></path></svg>'), Kf = /* @__PURE__ */ _('<svg viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M9 4H7v2H5v12h2v2h2v-2h2V6H9zM19 8h-2V4h-2v4h-2v7h2v5h2v-5h2z"></path></svg>'), k0 = (e) => e.charAt(0).toUpperCase() + e.slice(1), jf = (e) => {
  let t, r, n;
  const [s, c] = M(window.innerWidth < 768), [f, m] = M(localStorage.getItem("klinechart_secondary_period") || ""), [v, L] = M(!1), [$, w] = M(!1), [E, Q] = M(!1), [re, I] = M(!1), [K, z] = M(!1), [ce, V] = M({
    top: 0,
    left: 0,
    minWidth: 220
  }), oe = () => {
    c(window.innerWidth < 768), requestAnimationFrame(B), v() && Z();
  }, [Y, ve] = M(!1), W = () => document.fullscreenElement ?? document.body, R = () => {
    ve(!!document.fullscreenElement);
  }, [J, ue] = M(!1), [S, j] = M(!1), Z = () => {
    if (!r)
      return;
    const N = r.getBoundingClientRect(), O = Math.max(220, Math.ceil(N.width)), pe = window.innerWidth, $e = Math.min(Math.max(8, N.right - O), Math.max(8, pe - O - 8));
    V({
      top: Math.ceil(N.bottom + 8),
      left: Math.ceil($e),
      minWidth: O
    });
  }, F = () => {
    w(!1), Q(!1), I(!1), z(!1);
  }, ie = () => {
    L((N) => {
      const O = !N;
      return O ? queueMicrotask(Z) : F(), O;
    });
  }, le = (N) => {
    if (!v())
      return;
    const O = N.target;
    O && (r != null && r.contains(O) || n != null && n.contains(O) || (F(), L(!1)));
  }, ee = () => {
    v() && Z();
  }, B = () => {
    if (!t) {
      ue(!1), j(!1);
      return;
    }
    const N = t, O = N.scrollWidth > N.clientWidth + 2;
    ue(O && N.scrollLeft > 2), j(O && N.scrollLeft + N.clientWidth < N.scrollWidth - 2);
  };
  Cr(() => {
    window.addEventListener("resize", oe), document.addEventListener("fullscreenchange", R), document.addEventListener("mousedown", le), window.addEventListener("scroll", ee, !0), document.addEventListener("mozfullscreenchange", R), document.addEventListener("webkitfullscreenchange", R), document.addEventListener("msfullscreenchange", R), t && (t.addEventListener("scroll", B), setTimeout(B, 100));
  }), Lt(() => {
    window.removeEventListener("resize", oe), document.removeEventListener("fullscreenchange", R), document.removeEventListener("mousedown", le), window.removeEventListener("scroll", ee, !0), document.removeEventListener("mozfullscreenchange", R), document.removeEventListener("webkitfullscreenchange", R), document.removeEventListener("msfullscreenchange", R), t && t.removeEventListener("scroll", B);
  });
  const ne = H(() => {
    const N = e.periods.filter((O) => {
      if (!s() || Y())
        return !0;
      const pe = e.period.text, $e = f();
      if (O.text === pe || $e && O.text === $e)
        return !0;
      if (!$e || $e === pe) {
        const ge = e.periods.find((je) => je.text !== pe);
        return O.text === (ge == null ? void 0 : ge.text);
      }
      return !1;
    }).slice(0, s() && !Y() ? 2 : e.periods.length);
    return setTimeout(B, 50), N;
  });
  let G = e.period.text;
  return He(() => {
    const N = e.period.text;
    N !== G && (s() && (m(G), localStorage.setItem("klinechart_secondary_period", G)), G = N), setTimeout(B, 50);
  }), He(() => {
    Y(), setTimeout(B, 100);
  }), He(() => {
    if (!e.showOrderToolsMenu) {
      L(!1);
      return;
    }
    v() && queueMicrotask(Z);
  }), (() => {
    const N = Bf.cloneNode(!0), O = N.firstChild, pe = O.firstChild, $e = pe.firstChild, ge = pe.nextSibling, je = ge.firstChild;
    return N.style.setProperty("position", "relative"), N.style.setProperty("width", "100%"), N.style.setProperty("display", "flex"), N.style.setProperty("align-items", "center"), p(N, A(he, {
      get when() {
        return J();
      },
      get children() {
        const x = _f.cloneNode(!0);
        return x.$$click = () => t.scrollBy({
          left: -100,
          behavior: "smooth"
        }), x.style.setProperty("position", "absolute"), x.style.setProperty("left", "0"), x.style.setProperty("top", "0"), x.style.setProperty("bottom", "1px"), x.style.setProperty("width", "30px"), x.style.setProperty("display", "flex"), x.style.setProperty("align-items", "center"), x.style.setProperty("justify-content", "center"), x.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), x.style.setProperty("z-index", "10"), x.style.setProperty("cursor", "pointer"), x.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), x;
      }
    }), O), xt((x) => {
      t = x;
    }, O), O.style.setProperty("width", "100%"), O.style.setProperty("overflow", "auto"), ut($e, "click", e.onMenuClick, !0), p(O, A(he, {
      get when() {
        return e.symbol;
      },
      get children() {
        const x = xf.cloneNode(!0), ye = x.firstChild;
        return ut(x, "click", e.onSymbolClick, !0), p(x, A(he, {
          get when() {
            return e.symbol.logo;
          },
          get children() {
            const Me = kf.cloneNode(!0);
            return U(() => Oe(Me, "src", e.symbol.logo)), Me;
          }
        }), ye), p(ye, () => e.symbol.shortName ?? e.symbol.name ?? e.symbol.ticker), x;
      }
    }), ge), p(O, () => ne().map((x, ye) => {
      const Me = x.text === e.period.text;
      return (() => {
        const tt = Ff.cloneNode(!0);
        return tt.$$click = (be) => {
          s() && Me && !Y() ? (e.onMobilePeriodClick ? e.onMobilePeriodClick(x) : e.onMenuClick(), be.stopPropagation()) : e.onPeriodChange(x);
        }, me(tt, `item period ${Me ? "selected" : ""}`), p(tt, () => x.text), tt;
      })();
    }), ge), p(O, A(he, {
      get when() {
        return H(() => !!(s() && !Y()))() && ne().length > 1;
      },
      get children() {
        const x = Lf.cloneNode(!0);
        return x.$$click = (ye) => {
          ye.stopPropagation(), e.onMobilePeriodClick ? e.onMobilePeriodClick(e.period) : e.onMenuClick();
        }, x.style.setProperty("margin-left", "4px"), x.style.setProperty("display", "inline-flex"), x.style.setProperty("align-items", "center"), x;
      }
    }), ge), p(O, A(he, {
      get when() {
        return H(() => !!s())() && !Y();
      },
      get children() {
        const x = wf.cloneNode(!0);
        return x.$$click = (ye) => {
          var Me;
          ye.stopPropagation(), (Me = e.onMobileMoreClick) == null || Me.call(e);
        }, x.style.setProperty("margin-left", "8px"), x.style.setProperty("display", "inline-flex"), x.style.setProperty("align-items", "center"), x.style.setProperty("cursor", "pointer"), x.style.setProperty("padding", "0 4px"), x;
      }
    }), ge), p(O, A(he, {
      get when() {
        return !s();
      },
      get children() {
        const x = Af.cloneNode(!0);
        return ut(x, "click", e.onTimeToolsClick, !0), x;
      }
    }), ge), p(O, A(he, {
      get when() {
        return !s();
      },
      get children() {
        const x = Sf.cloneNode(!0), ye = x.firstChild, Me = ye.nextSibling;
        return ut(x, "click", e.onIndicatorClick, !0), p(Me, () => d("indicator", e.locale)), x;
      }
    }), ge), ge.style.setProperty("display", "flex"), ge.style.setProperty("height", "100%"), ge.style.setProperty("margin-left", "auto"), ge.style.setProperty("align-items", "center"), ge.style.setProperty("flex", "0 0 auto"), p(ge, A(he, {
      get when() {
        return e.showOrderToolsMenu;
      },
      get children() {
        const x = Pf.cloneNode(!0), ye = x.firstChild, Me = ye.firstChild, tt = Me.nextSibling;
        return xt((be) => {
          r = be;
        }, x), x.style.setProperty("display", "flex"), x.style.setProperty("align-items", "center"), x.style.setProperty("height", "100%"), ye.$$click = (be) => {
          be.stopPropagation(), ie();
        }, ye.style.setProperty("gap", "6px"), tt.style.setProperty("transition", "transform 0.2s ease"), p(x, A(he, {
          get when() {
            return v();
          },
          get children() {
            return A(r9, {
              get mount() {
                return W();
              },
              get children() {
                const be = Mf.cloneNode(!0), yt = be.firstChild, Ct = yt.firstChild, Rt = Ct.firstChild, Kt = Rt.firstChild, St = Kt.firstChild, Mn = Ct.nextSibling, u1 = Mn.firstChild, N1 = u1.firstChild, O1 = N1.firstChild, jt = u1.nextSibling, Pn = jt.firstChild, d1 = Pn.firstChild, Tt = yt.nextSibling, Fe = Tt.firstChild, Dn = Fe.firstChild, pt = Dn.firstChild, Mt = pt.firstChild, Pt = Fe.nextSibling, nt = Pt.firstChild;
                nt.firstChild;
                const I1 = nt.nextSibling, Ge = I1.firstChild, h1 = Ge.nextSibling, f1 = h1.firstChild, Dt = f1.firstChild, vt = Tt.nextSibling, m1 = vt.firstChild, g1 = m1.firstChild, Nn = vt.nextSibling, E1 = Nn.nextSibling, On = E1.firstChild, B1 = On.firstChild, Qt = E1.nextSibling, y1 = Qt.nextSibling, F1 = y1.firstChild, U1 = F1.firstChild, Nt = y1.nextSibling, Ke = Nt.firstChild, Qe = Ke.firstChild, We = Qe.firstChild, Ze = We.firstChild, In = Ke.nextSibling, Zt = In.firstChild, C1 = Zt.firstChild, p1 = C1.firstChild, _e = Zt.nextSibling, v1 = _e.firstChild, lt = v1.firstChild, ft = _e.nextSibling, Ht = ft.firstChild, bt = Ht.firstChild, Xe = Nt.nextSibling, z1 = Xe.firstChild, V1 = z1.firstChild, R1 = Xe.nextSibling, En = R1.firstChild, K1 = En.firstChild;
                return be.$$mousedown = (b) => b.stopPropagation(), xt((b) => {
                  n = b;
                }, be), be.style.setProperty("position", "fixed"), be.style.setProperty("z-index", "9999"), Ct.$$click = (b) => {
                  b.preventDefault(), b.stopPropagation(), w((P) => !P);
                }, Kt.$$mousedown = (b) => b.stopPropagation(), Kt.$$click = (b) => b.stopPropagation(), St.addEventListener("change", (b) => {
                  var P;
                  b.stopPropagation(), w(!0), (P = e.onOrderToolsStateChange) == null || P.call(e, {
                    quickOrder: b.currentTarget.checked
                  });
                }), O1.addEventListener("change", (b) => {
                  var P;
                  (P = e.onOrderToolsStateChange) == null || P.call(e, {
                    quickOrderFloatingWindow: b.currentTarget.checked
                  });
                }), d1.addEventListener("change", (b) => {
                  var P;
                  (P = e.onOrderToolsStateChange) == null || P.call(e, {
                    quickOrderPlusButton: b.currentTarget.checked
                  });
                }), Fe.$$click = (b) => {
                  b.preventDefault(), b.stopPropagation(), Q((P) => !P), I(!1);
                }, pt.$$mousedown = (b) => b.stopPropagation(), pt.$$click = (b) => b.stopPropagation(), Mt.addEventListener("change", (b) => {
                  var P;
                  b.stopPropagation(), Q(!0), (P = e.onOrderToolsStateChange) == null || P.call(e, {
                    openOrders: b.currentTarget.checked
                  });
                }), p(nt, A(pi, {
                  get open() {
                    var b;
                    return ((b = e.orderToolsState) == null ? void 0 : b.openOrdersExtendedPriceLine) ?? !0;
                  },
                  onChange: () => {
                    var b, P;
                    (P = e.onOrderToolsStateChange) == null || P.call(e, {
                      openOrdersExtendedPriceLine: !(((b = e.orderToolsState) == null ? void 0 : b.openOrdersExtendedPriceLine) ?? !0)
                    });
                  }
                }), null), f1.$$click = (b) => {
                  b.preventDefault(), b.stopPropagation(), I((P) => !P);
                }, p(f1, () => {
                  var b;
                  return k0(((b = e.orderToolsState) == null ? void 0 : b.openOrdersDisplay) ?? "right");
                }, Dt), p(h1, A(he, {
                  get when() {
                    return re();
                  },
                  get children() {
                    const b = Tf.cloneNode(!0);
                    return p(b, () => ["left", "center", "right"].map((P) => (() => {
                      const Pe = Uf.cloneNode(!0);
                      return Pe.$$click = (ze) => {
                        var qe;
                        ze.preventDefault(), ze.stopPropagation(), (qe = e.onOrderToolsStateChange) == null || qe.call(e, {
                          openOrdersDisplay: P
                        }), I(!1);
                      }, p(Pe, () => k0(P)), U(() => {
                        var ze;
                        return me(Pe, (((ze = e.orderToolsState) == null ? void 0 : ze.openOrdersDisplay) ?? "right") === P ? "selected" : "");
                      }), Pe;
                    })())), b;
                  }
                }), null), g1.addEventListener("change", (b) => {
                  var P;
                  (P = e.onOrderToolsStateChange) == null || P.call(e, {
                    positions: b.currentTarget.checked
                  });
                }), B1.addEventListener("change", (b) => {
                  var P;
                  (P = e.onOrderToolsStateChange) == null || P.call(e, {
                    breakevenPrice: b.currentTarget.checked
                  });
                }), U1.addEventListener("change", (b) => {
                  var P;
                  (P = e.onOrderToolsStateChange) == null || P.call(e, {
                    liquidationPrice: b.currentTarget.checked
                  });
                }), Ke.$$click = (b) => {
                  b.preventDefault(), b.stopPropagation(), z((P) => !P);
                }, We.$$mousedown = (b) => b.stopPropagation(), We.$$click = (b) => b.stopPropagation(), Ze.addEventListener("change", (b) => {
                  var P;
                  b.stopPropagation(), z(!0), (P = e.onOrderToolsStateChange) == null || P.call(e, {
                    priceLine: b.currentTarget.checked
                  });
                }), p1.addEventListener("change", (b) => {
                  var P;
                  (P = e.onOrderToolsStateChange) == null || P.call(e, {
                    marketPriceLine: b.currentTarget.checked
                  });
                }), lt.addEventListener("change", (b) => {
                  var P;
                  (P = e.onOrderToolsStateChange) == null || P.call(e, {
                    countDown: b.currentTarget.checked
                  });
                }), bt.addEventListener("change", (b) => {
                  var P;
                  (P = e.onOrderToolsStateChange) == null || P.call(e, {
                    bidAskPrice: b.currentTarget.checked
                  });
                }), V1.addEventListener("change", (b) => {
                  var P;
                  (P = e.onOrderToolsStateChange) == null || P.call(e, {
                    orderPreviewLine: b.currentTarget.checked
                  });
                }), K1.addEventListener("change", (b) => {
                  var P;
                  (P = e.onOrderToolsStateChange) == null || P.call(e, {
                    orderHistory: b.currentTarget.checked
                  });
                }), U((b) => {
                  const P = `${ce().top}px`, Pe = `${ce().left}px`, ze = `${ce().minWidth}px`, qe = `klinecharts-pro-order-tools-group${$() ? " klinecharts-pro-order-tools-group-open" : ""}`, $t = `klinecharts-pro-order-tools-group${E() ? " klinecharts-pro-order-tools-group-open" : ""}`, b1 = `klinecharts-pro-order-tools-display-arrow${re() ? " klinecharts-pro-order-tools-display-arrow-open" : ""}`, j1 = `klinecharts-pro-order-tools-group${K() ? " klinecharts-pro-order-tools-group-open" : ""}`;
                  return P !== b._v$ && be.style.setProperty("top", b._v$ = P), Pe !== b._v$2 && be.style.setProperty("left", b._v$2 = Pe), ze !== b._v$3 && be.style.setProperty("width", b._v$3 = ze), qe !== b._v$4 && me(yt, b._v$4 = qe), $t !== b._v$5 && me(Tt, b._v$5 = $t), b1 !== b._v$6 && Oe(Dt, "class", b._v$6 = b1), j1 !== b._v$7 && me(Nt, b._v$7 = j1), b;
                }, {
                  _v$: void 0,
                  _v$2: void 0,
                  _v$3: void 0,
                  _v$4: void 0,
                  _v$5: void 0,
                  _v$6: void 0,
                  _v$7: void 0
                }), U(() => {
                  var b, P, Pe, ze;
                  return St.checked = (((b = e.orderToolsState) == null ? void 0 : b.quickOrderFloatingWindow) ?? ((P = e.orderToolsState) == null ? void 0 : P.quickOrder) ?? !0) || (((Pe = e.orderToolsState) == null ? void 0 : Pe.quickOrderPlusButton) ?? ((ze = e.orderToolsState) == null ? void 0 : ze.quickOrder) ?? !0);
                }), U(() => {
                  var b, P;
                  return O1.checked = ((b = e.orderToolsState) == null ? void 0 : b.quickOrderFloatingWindow) ?? ((P = e.orderToolsState) == null ? void 0 : P.quickOrder) ?? !0;
                }), U(() => {
                  var b, P;
                  return d1.checked = ((b = e.orderToolsState) == null ? void 0 : b.quickOrderPlusButton) ?? ((P = e.orderToolsState) == null ? void 0 : P.quickOrder) ?? !0;
                }), U(() => {
                  var b;
                  return Mt.checked = ((b = e.orderToolsState) == null ? void 0 : b.openOrders) ?? !0;
                }), U(() => {
                  var b;
                  return g1.checked = ((b = e.orderToolsState) == null ? void 0 : b.positions) ?? !0;
                }), U(() => {
                  var b;
                  return B1.checked = ((b = e.orderToolsState) == null ? void 0 : b.breakevenPrice) ?? !0;
                }), U(() => {
                  var b;
                  return U1.checked = ((b = e.orderToolsState) == null ? void 0 : b.liquidationPrice) ?? !0;
                }), U(() => {
                  var b, P, Pe, ze, qe, $t;
                  return Ze.checked = (((b = e.orderToolsState) == null ? void 0 : b.marketPriceLine) ?? ((P = e.orderToolsState) == null ? void 0 : P.priceLine) ?? !0) || (((Pe = e.orderToolsState) == null ? void 0 : Pe.countDown) ?? ((ze = e.orderToolsState) == null ? void 0 : ze.priceLine) ?? !0) || (((qe = e.orderToolsState) == null ? void 0 : qe.bidAskPrice) ?? (($t = e.orderToolsState) == null ? void 0 : $t.priceLine) ?? !0);
                }), U(() => {
                  var b, P;
                  return p1.checked = ((b = e.orderToolsState) == null ? void 0 : b.marketPriceLine) ?? ((P = e.orderToolsState) == null ? void 0 : P.priceLine) ?? !0;
                }), U(() => {
                  var b, P;
                  return lt.checked = ((b = e.orderToolsState) == null ? void 0 : b.countDown) ?? ((P = e.orderToolsState) == null ? void 0 : P.priceLine) ?? !0;
                }), U(() => {
                  var b, P;
                  return bt.checked = ((b = e.orderToolsState) == null ? void 0 : b.bidAskPrice) ?? ((P = e.orderToolsState) == null ? void 0 : P.priceLine) ?? !0;
                }), U(() => {
                  var b;
                  return V1.checked = ((b = e.orderToolsState) == null ? void 0 : b.orderPreviewLine) ?? !0;
                }), U(() => {
                  var b;
                  return K1.checked = ((b = e.orderToolsState) == null ? void 0 : b.orderHistory) ?? !0;
                }), be;
              }
            });
          }
        }), null), U((be) => {
          const yt = s() ? "0 8px" : "0 10px", Ct = v() ? "rotate(180deg)" : "rotate(0deg)";
          return yt !== be._v$8 && ye.style.setProperty("padding", be._v$8 = yt), Ct !== be._v$9 && tt.style.setProperty("transform", be._v$9 = Ct), be;
        }, {
          _v$8: void 0,
          _v$9: void 0
        }), x;
      }
    }), je), p(ge, A(he, {
      get when() {
        return !s();
      },
      get children() {
        return [(() => {
          const x = Df.cloneNode(!0);
          return ut(x, "click", e.onTimezoneClick, !0), x;
        })(), (() => {
          const x = Nf.cloneNode(!0);
          return ut(x, "click", e.onSettingClick, !0), x;
        })()];
      }
    }), je), p(ge, A(he, {
      get when() {
        return !s();
      },
      get children() {
        const x = Of.cloneNode(!0);
        return ut(x, "click", e.onScreenshotClick, !0), x;
      }
    }), je), je.$$click = () => {
      if (Y())
        (document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen).call(document);
      else {
        const x = t == null ? void 0 : t.closest(".klinecharts-pro");
        x && ((x == null ? void 0 : x.requestFullscreen) ?? (x == null ? void 0 : x.webkitRequestFullscreen) ?? (x == null ? void 0 : x.mozRequestFullScreen) ?? (x == null ? void 0 : x.msRequestFullscreen)).call(x);
      }
    }, p(je, (() => {
      const x = H(() => !!Y());
      return () => x() ? zf.cloneNode(!0) : Vf.cloneNode(!0);
    })()), p(ge, A(he, {
      get when() {
        return H(() => !!e.chartViewToggle)() && !Y();
      },
      get children() {
        const x = If.cloneNode(!0);
        return ut(x, "click", e.chartViewToggle.onToggle, !0), p(x, (() => {
          const ye = H(() => e.chartViewToggle.view === "chart");
          return () => ye() ? Rf.cloneNode(!0) : Kf.cloneNode(!0);
        })()), U(() => Oe(x, "title", e.chartViewToggle.view === "chart" ? "View Depth" : "View Chart")), x;
      }
    }), null), p(N, A(he, {
      get when() {
        return S();
      },
      get children() {
        const x = Ef.cloneNode(!0);
        return x.$$click = () => t.scrollBy({
          left: 100,
          behavior: "smooth"
        }), x.style.setProperty("position", "absolute"), x.style.setProperty("right", "0"), x.style.setProperty("top", "0"), x.style.setProperty("bottom", "1px"), x.style.setProperty("width", "30px"), x.style.setProperty("display", "flex"), x.style.setProperty("align-items", "center"), x.style.setProperty("justify-content", "center"), x.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), x.style.setProperty("z-index", "10"), x.style.setProperty("cursor", "pointer"), x.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), x;
      }
    }), null), U((x) => {
      const ye = e.spread ? "" : "rotate", Me = Y() ? "0px" : "var(--klinecharts-pro-period-bar-padding-right)";
      return ye !== x._v$10 && Oe($e, "class", x._v$10 = ye), Me !== x._v$11 && ge.style.setProperty("padding-right", x._v$11 = Me), x;
    }, {
      _v$10: void 0,
      _v$11: void 0
    }), N;
  })();
};
Ye(["click", "mousedown"]);
const Qf = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M12.41465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L12.41465,12C12.20873,12.5826,11.65311,13,11,13C10.34689,13,9.79127,12.5826,9.58535,12L3.5,12C3.223857,12,3,11.77614,3,11.5C3,11.22386,3.223857,11,3.5,11L9.58535,11C9.79127,10.417404,10.34689,10,11,10C11.65311,10,12.20873,10.417404,12.41465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), Zf = () => Qf.cloneNode(!0), Hf = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,11L11.08535,11C11.29127,10.417404,11.84689,10,12.5,10C13.15311,10,13.70873,10.417404,13.91465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L13.91465,12C13.70873,12.5826,13.15311,13,12.5,13C11.84689,13,11.29127,12.5826,11.08535,12L6.91465,12C6.70873,12.5826,6.15311,13,5.5,13C4.671573,13,4,12.32843,4,11.5C4,10.671573,4.671573,10,5.5,10C6.15311,10,6.70873,10.417404,6.91465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), Yf = () => Hf.cloneNode(!0), Wf = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,12.5C6.70873,13.0826,6.15311,13.5,5.5,13.5C4.671573,13.5,4,12.82843,4,12C4,11.171573,4.671573,10.5,5.5,10.5C6.15311,10.5,6.70873,10.917404,6.91465,11.5L16.0853,11.5C16.2913,10.917404,16.846899999999998,10.5,17.5,10.5C18.328400000000002,10.5,19,11.171573,19,12C19,12.82843,18.328400000000002,13.5,17.5,13.5C16.846899999999998,13.5,16.2913,13.0826,16.0853,12.5L6.91465,12.5Z" stroke-opacity="0" stroke="none"></path></svg>'), qf = () => Wf.cloneNode(!0), Gf = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,12.41465L11,18.5C11,18.7761,11.22386,19,11.5,19C11.77614,19,12,18.7761,12,18.5L12,12.41465C12.5826,12.20873,13,11.65311,13,11C13,10.34689,12.5826,9.79127,12,9.58535L12,3.5C12,3.223857,11.77614,3,11.5,3C11.22386,3,11,3.223857,11,3.5L11,9.58535C10.417404,9.79127,10,10.34689,10,11C10,11.65311,10.417404,12.20873,11,12.41465Z" stroke-opacity="0" stroke="none"></path></svg>'), Xf = () => Gf.cloneNode(!0), Jf = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.66558837890625,19C10.83716137890625,19,10.16558837890625,18.328400000000002,10.16558837890625,17.5C10.16558837890625,16.846899999999998,10.58298437890625,16.2913,11.16557337890625,16.0854L11.16557337890625,11.91464C10.58298437890625,11.70872,10.16558837890625,11.1531,10.16558837890625,10.5C10.16558837890625,9.8469,10.58298437890625,9.29128,11.16557337890625,9.08536L11.16557337890625,4.5C11.16557337890625,4.223857,11.38942837890625,4,11.66556837890625,4C11.94171837890625,4,12.16556837890625,4.223857,12.16556837890625,4.5L12.16556837890625,9.08535C12.74817837890625,9.291260000000001,13.16558837890625,9.846879999999999,13.16558837890625,10.5C13.16558837890625,11.153120000000001,12.74817837890625,11.708739999999999,12.16556837890625,11.91465L12.16556837890625,16.0854C12.74817837890625,16.2913,13.16558837890625,16.846899999999998,13.16558837890625,17.5C13.16558837890625,18.328400000000002,12.49401837890625,19,11.66558837890625,19Z" stroke-opacity="0" stroke="none"></path></svg>'), em = () => Jf.cloneNode(!0), tm = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.165603637695312,6.91465C11.748203637695312,6.70873,12.165603637695312,6.15311,12.165603637695312,5.5C12.165603637695312,4.671573,11.494033637695313,4,10.665603637695312,4C9.837176637695313,4,9.165603637695312,4.671573,9.165603637695312,5.5C9.165603637695312,6.15311,9.583007637695312,6.70873,10.165603637695312,6.91465L10.165603637695312,16.0854C9.583007637695312,16.2913,9.165603637695312,16.846899999999998,9.165603637695312,17.5C9.165603637695312,18.328400000000002,9.837176637695313,19,10.665603637695312,19C11.494033637695313,19,12.165603637695312,18.328400000000002,12.165603637695312,17.5C12.165603637695312,16.846899999999998,11.748203637695312,16.2913,11.165603637695312,16.0854L11.165603637695312,6.91465Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), nm = () => tm.cloneNode(!0), rm = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.146447,15.753C4.9511845,15.9483,4.9511845,16.2649,5.146447,16.4602C5.341709,16.6554,5.658291,16.6554,5.853554,16.4602L8.156600000000001,14.15711C8.352409999999999,14.25082,8.57173,14.3033,8.8033,14.3033C9.631730000000001,14.3033,10.3033,13.63172,10.3033,12.80329C10.3033,12.57172,10.250820000000001,12.352409999999999,10.157119999999999,12.15659L12.156600000000001,10.15711C12.352409999999999,10.250820000000001,12.571729999999999,10.30329,12.8033,10.30329C13.63173,10.30329,14.3033,9.63172,14.3033,8.80329C14.3033,8.57172,14.25082,8.352409999999999,14.15712,8.15659L16.4602,5.853553C16.6554,5.658291,16.6554,5.341709,16.4602,5.146447C16.2649,4.9511843,15.9483,4.9511843,15.753,5.146447L13.45001,7.449479999999999C13.25419,7.35577,13.03487,7.3032900000000005,12.8033,7.3032900000000005C11.97487,7.3032900000000005,11.3033,7.97487,11.3033,8.80329C11.3033,9.03487,11.35578,9.254190000000001,11.44949,9.450009999999999L9.450009999999999,11.449480000000001C9.254190000000001,11.35577,9.03487,11.30329,8.8033,11.30329C7.97487,11.30329,7.3033,11.97487,7.3033,12.80329C7.3033,13.03487,7.35578,13.25419,7.44949,13.45001L5.146447,15.753Z" stroke-opacity="0" stroke="none"></path></svg>'), om = () => rm.cloneNode(!0), im = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M7.573332939453125,14.54567903564453C7.667042939453125,14.741499035644532,7.719512939453125,14.960809035644532,7.719512939453125,15.19239903564453C7.719512939453125,16.02079903564453,7.047942939453125,16.69239903564453,6.219512939453125,16.69239903564453C5.391085939453125,16.69239903564453,4.719512939453125,16.02079903564453,4.719512939453125,15.19239903564453C4.719512939453125,14.36394903564453,5.391085939453125,13.692379035644532,6.219512939453125,13.692379035644532C6.451092939453125,13.692379035644532,6.670412939453125,13.74485903564453,6.866232939453125,13.83856903564453L9.865702939453126,10.83909903564453C9.771992939453124,10.643279035644532,9.719512939453125,10.42395903564453,9.719512939453125,10.192379035644532C9.719512939453125,9.36394903564453,10.391082939453124,8.692379035644532,11.219512939453125,8.692379035644532C11.451092939453126,8.692379035644532,11.670412939453126,8.74485903564453,11.866232939453125,8.838569035644532L15.462112939453124,5.242645035644531C15.657412939453126,5.047383335644532,15.974012939453125,5.047383335644532,16.169212939453125,5.242645035644531C16.364512939453125,5.437907035644531,16.364512939453125,5.754489035644531,16.169212939453125,5.949752035644531L12.573332939453124,9.545679035644532C12.667042939453125,9.74149903564453,12.719512939453125,9.96080903564453,12.719512939453125,10.192379035644532C12.719512939453125,11.020809035644533,12.047942939453126,11.692379035644532,11.219512939453125,11.692379035644532C10.987942939453125,11.692379035644532,10.768632939453125,11.639909035644532,10.572812939453126,11.54619903564453L7.573332939453125,14.54567903564453Z" stroke-opacity="0" stroke="none"></path></svg>'), am = () => im.cloneNode(!0), sm = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M15.719512939453125,8.461776733398438C16.547912939453127,8.461776733398438,17.219512939453125,7.7902067333984375,17.219512939453125,6.9617767333984375C17.219512939453125,6.133349733398438,16.547912939453127,5.4617767333984375,15.719512939453125,5.4617767333984375C14.891082939453124,5.4617767333984375,14.219512939453125,6.133349733398438,14.219512939453125,6.9617767333984375C14.219512939453125,7.193346733398437,14.271992939453124,7.412666733398438,14.365692939453124,7.608486733398438L7.366222939453126,14.607956733398437C7.170402939453125,14.514256733398437,6.951082939453125,14.461776733398438,6.719512939453125,14.461776733398438C5.891085939453125,14.461776733398438,5.219512939453125,15.133346733398437,5.219512939453125,15.961776733398438C5.219512939453125,16.79017673339844,5.891085939453125,17.461776733398438,6.719512939453125,17.461776733398438C7.547942939453125,17.461776733398438,8.219512939453125,16.79017673339844,8.219512939453125,15.961776733398438C8.219512939453125,15.730176733398437,8.167032939453126,15.510876733398437,8.073322939453124,15.315066733398437L15.072802939453124,8.315586733398437C15.268612939453124,8.409296733398438,15.487912939453125,8.461776733398438,15.719512939453125,8.461776733398438Z" stroke-opacity="0" stroke="none"></path></svg>'), lm = () => sm.cloneNode(!0), cm = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17.0643,7.033864912109375L18,3.585784912109375L14.5078,4.509695912109375L15.3537,5.344934912109375L6.02026,14.560584912109375C5.87635,14.517484912109374,5.72366,14.494284912109375,5.5655,14.494284912109375C4.7009,14.494284912109375,4,15.186384912109375,4,16.040084912109375C4,16.893784912109375,4.7009,17.585784912109375,5.5655,17.585784912109375C6.43011,17.585784912109375,7.13101,16.893784912109375,7.13101,16.040084912109375C7.13101,15.722284912109375,7.03392,15.426984912109376,6.86744,15.181384912109374L16.0917,6.073604912109375L17.0643,7.033864912109375Z" stroke-opacity="0" stroke="none"></path></svg>'), um = () => cm.cloneNode(!0), dm = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,13.00505L18.5,13.00505C18.7761,13.00505,19,13.228909999999999,19,13.50505C19,13.781189999999999,18.7761,14.00505,18.5,14.00505L6.91465,14.00505C6.70873,14.58765,6.15311,15.00505,5.5,15.00505C4.671573,15.00505,4,14.33348,4,13.50505C4,12.67662,4.671573,12.00505,5.5,12.00505C6.15311,12.00505,6.70873,12.422450000000001,6.91465,13.00505ZM7.81404,11.625L10.48591,11.625L10.48591,10.90625L9.65193,10.90625L9.65193,7.125L8.997630000000001,7.125C8.71443,7.306641,8.415600000000001,7.419922,7.96443,7.498047L7.96443,8.05078L8.77497,8.05078L8.77497,10.90625L7.81404,10.90625L7.81404,11.625ZM11.081620000000001,11.625L14.0562,11.625L14.0562,10.88281L13.09724,10.88281C12.8863,10.88281,12.59333,10.90625,12.36482,10.93555C13.17537,10.11328,13.84724,9.2207,13.84724,8.39062C13.84724,7.541016,13.28865,7,12.4488,7C11.84333,7,11.446850000000001,7.234375,11.03279,7.679688L11.52497,8.16797C11.747630000000001,7.914062,12.0113,7.697266,12.33552,7.697266C12.7613,7.697266,13.00154,7.982422,13.00154,8.43359C13.00154,9.14648,12.29255,10.00781,11.081620000000001,11.11523L11.081620000000001,11.625ZM15.9605,11.75C16.8121,11.75,17.526899999999998,11.2832,17.526899999999998,10.4375C17.526899999999998,9.82031,17.142200000000003,9.43945,16.6441,9.30078L16.6441,9.27148C17.1129,9.08594,17.3824,8.7207,17.3824,8.21289C17.3824,7.421875,16.8004,7,15.9429,7C15.4215,7,14.9957,7.210938,14.6109,7.541016L15.066,8.11133C15.3258,7.849609,15.5836,7.697266,15.9019,7.697266C16.2789,7.697266,16.4957,7.914062,16.4957,8.28125C16.4957,8.70898,16.2301,9,15.4215,9L15.4215,9.63672C16.3804,9.63672,16.6383,9.91992,16.6383,10.38086C16.6383,10.79688,16.3336,11.03125,15.8824,11.03125C15.4742,11.03125,15.1578,10.82227,14.8922,10.55078L14.4781,11.13281C14.7906,11.486329999999999,15.2652,11.75,15.9605,11.75Z" stroke-opacity="0" stroke="none"></path></svg>'), hm = () => dm.cloneNode(!0), fm = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.146447,14.178126025390625C2.9511847,13.982826025390626,2.9511847,13.666226025390625,3.146447,13.470926025390625L7.39146,9.225966025390626C7.35417,9.095106025390624,7.33421,8.956946025390625,7.33421,8.814116025390625C7.33421,7.985696025390625,8.00578,7.314116025390625,8.834209999999999,7.314116025390625C8.97703,7.314116025390625,9.11519,7.334086025390625,9.24605,7.371366025390625L13.753,2.864373025390625C13.9483,2.669110325390625,14.2649,2.669110325390625,14.4602,2.864373025390625C14.6554,3.059635025390625,14.6554,3.376217025390625,14.4602,3.571479025390625L10.06916,7.962476025390625C10.23631,8.204386025390626,10.334209999999999,8.497826025390625,10.334209999999999,8.814116025390625C10.334209999999999,9.642546025390626,9.66264,10.314116025390625,8.834209999999999,10.314116025390625C8.51791,10.314116025390625,8.22448,10.216226025390625,7.98256,10.049076025390626L3.853554,14.178126025390625C3.658291,14.373326025390625,3.341709,14.373326025390625,3.146447,14.178126025390625ZM7.67736,19.188526025390626C7.4821,18.993226025390626,7.4821,18.676626025390625,7.67736,18.481426025390626L9.9804,16.178326025390625C9.88669,15.982526025390625,9.834209999999999,15.763226025390624,9.834209999999999,15.531626025390626C9.834209999999999,14.703226025390626,10.50578,14.031626025390626,11.33421,14.031626025390626C11.56579,14.031626025390626,11.78511,14.084126025390624,11.98093,14.177826025390624L13.9804,12.178356025390626C13.8867,11.982536025390624,13.8342,11.763216025390625,13.8342,11.531636025390625C13.8342,10.703206025390624,14.5058,10.031636025390625,15.3342,10.031636025390625C15.5658,10.031636025390625,15.7851,10.084116025390625,15.9809,10.177826025390626L18.284,7.874796025390625C18.4792,7.679536025390625,18.7958,7.679536025390625,18.9911,7.874796025390625C19.1863,8.070056025390624,19.1863,8.386636025390626,18.9911,8.581906025390625L16.688000000000002,10.884936025390624C16.7817,11.080756025390626,16.8342,11.300066025390626,16.8342,11.531636025390625C16.8342,12.360066025390624,16.162599999999998,13.031626025390626,15.3342,13.031626025390626C15.1026,13.031626025390626,14.8833,12.979126025390626,14.6875,12.885426025390625L12.68803,14.884926025390625C12.78174,15.080726025390625,12.83421,15.300026025390626,12.83421,15.531626025390626C12.83421,16.360026025390624,12.16264,17.031626025390626,11.33421,17.031626025390626C11.10264,17.031626025390626,10.88333,16.979126025390627,10.68751,16.885426025390625L8.38446,19.188526025390626C8.1892,19.383726025390626,7.87262,19.383726025390626,7.67736,19.188526025390626Z" stroke-opacity="0" stroke="none"></path></svg>'), mm = () => fm.cloneNode(!0), gm = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.3367688759765626,12.63173C3.5320318759765623,12.82699,3.8486138759765627,12.82699,4.043876875976562,12.63173L11.822052875976562,4.853553C12.017312875976563,4.658291,12.017312875976563,4.341708,11.822052875976562,4.146446C11.626792875976562,3.9511843,11.310202875976563,3.9511843,11.114942875976563,4.146446L3.3367688759765626,11.92462C3.1415071759765625,12.11988,3.1415071759765625,12.43647,3.3367688759765626,12.63173ZM5.001492875976562,17.0351C4.806232875976562,16.8399,4.806232875976562,16.5233,5.001492875976562,16.328L7.304532875976562,14.025C7.210822875976563,13.82916,7.158352875976563,13.60984,7.158352875976563,13.37827C7.158352875976563,12.54984,7.829922875976562,11.87827,8.658352875976561,11.87827C8.889922875976563,11.87827,9.109232875976563,11.93075,9.305052875976562,12.02446L11.304532875976562,10.02498C11.210822875976563,9.82916,11.158352875976561,9.60984,11.158352875976561,9.37827C11.158352875976561,8.54984,11.829922875976562,7.8782700000000006,12.658352875976563,7.8782700000000006C12.889922875976563,7.8782700000000006,13.109232875976563,7.93075,13.305022875976562,8.024460000000001L15.608122875976562,5.72142C15.803322875976562,5.5261499999999995,16.119922875976563,5.5261499999999995,16.315222875976563,5.72142C16.510422875976563,5.9166799999999995,16.510422875976563,6.23326,16.315222875976563,6.42852L14.012122875976562,8.73156C14.105822875976562,8.92738,14.158322875976562,9.1467,14.158322875976562,9.37827C14.158322875976562,10.2067,13.486822875976562,10.87827,12.658352875976563,10.87827C12.426772875976562,10.87827,12.207452875976562,10.82579,12.011642875976563,10.73209L10.012162875976562,12.73156C10.105872875976562,12.92738,10.158352875976561,13.1467,10.158352875976561,13.37827C10.158352875976561,14.2067,9.486772875976563,14.8783,8.658352875976561,14.8783C8.426772875976562,14.8783,8.207452875976562,14.8258,8.011642875976563,14.7321L5.708602875976562,17.0351C5.513342875976562,17.2304,5.196752875976562,17.2304,5.001492875976562,17.0351ZM10.415712875976563,18.328C10.220452875976562,18.5233,9.903862875976563,18.5233,9.708602875976563,18.328C9.513342875976562,18.1328,9.513342875976562,17.816200000000002,9.708602875976563,17.6209L12.304532875976562,15.025C12.210822875976563,14.8292,12.158352875976563,14.6098,12.158352875976563,14.3783C12.158352875976563,13.54984,12.829922875976562,12.87827,13.658322875976562,12.87827C13.889922875976563,12.87827,14.109222875976563,12.93075,14.305022875976562,13.02446L17.486822875976564,9.84274C17.682022875976564,9.64747,17.99862287597656,9.64747,18.19392287597656,9.84274C18.38912287597656,10.038,18.38912287597656,10.35458,18.19392287597656,10.54984L15.012122875976562,13.73156C15.105822875976562,13.92738,15.158322875976562,14.1467,15.158322875976562,14.3783C15.158322875976562,15.2067,14.486822875976562,15.8783,13.658322875976562,15.8783C13.426822875976562,15.8783,13.207422875976562,15.8258,13.011642875976563,15.7321L10.415712875976563,18.328Z" stroke-opacity="0" stroke="none"></path></svg>'), ym = () => gm.cloneNode(!0), Cm = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M13.1889,6C12.98303,6.582599999999999,12.42741,7,11.7743,7C11.12119,7,10.565570000000001,6.582599999999999,10.35965,6L3.5,6C3.223857,6,3,5.77614,3,5.5C3,5.22386,3.223857,5,3.5,5L10.35965,5C10.565570000000001,4.417404,11.12119,4,11.7743,4C12.42741,4,12.98303,4.417404,13.1889,5L18.5,5C18.7761,5,19,5.22386,19,5.5C19,5.77614,18.7761,6,18.5,6L13.1889,6ZM3,8.5C3,8.22386,3.223857,8,3.5,8L18.5,8C18.7761,8,19,8.22386,19,8.5C19,8.77614,18.7761,9,18.5,9L3.5,9C3.223857,9,3,8.77614,3,8.5ZM3.278549,11.5C3.278549,11.22386,3.502407,11,3.778549,11L18.7785,11C19.0547,11,19.2785,11.22386,19.2785,11.5C19.2785,11.77614,19.0547,12,18.7785,12L3.778549,12C3.502407,12,3.278549,11.77614,3.278549,11.5ZM3.139267,14.5C3.139267,14.2239,3.363124,14,3.6392670000000003,14L18.6393,14C18.915399999999998,14,19.1393,14.2239,19.1393,14.5C19.1393,14.7761,18.915399999999998,15,18.6393,15L3.6392670000000003,15C3.363124,15,3.139267,14.7761,3.139267,14.5ZM13.1889,18C12.98303,18.5826,12.42741,19,11.7743,19C11.12119,19,10.565570000000001,18.5826,10.35965,18L3.778549,18C3.502407,18,3.278549,17.7761,3.278549,17.5C3.278549,17.2239,3.502407,17,3.778549,17L10.35965,17C10.565570000000001,16.4174,11.12119,16,11.7743,16C12.42741,16,12.98303,16.4174,13.1889,17L18.7785,17C19.0547,17,19.2785,17.2239,19.2785,17.5C19.2785,17.7761,19.0547,18,18.7785,18L13.1889,18Z" stroke-opacity="0" stroke="none"></path></svg>'), pm = () => Cm.cloneNode(!0), vm = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4.91465,6C4.70873,6.582599999999999,4.15311,7,3.5,7C2.671573,7,2,6.32843,2,5.5C2,4.671573,2.671573,4,3.5,4C4.15311,4,4.70873,4.417404,4.91465,5L18.2257,5C18.5018,5,18.7257,5.22386,18.7257,5.5C18.7257,5.77614,18.5018,6,18.2257,6L4.91465,6ZM2.7257,8.5C2.7257,8.22386,2.949558,8,3.2257,8L18.2257,8C18.5018,8,18.7257,8.22386,18.7257,8.5C18.7257,8.77614,18.5018,9,18.2257,9L3.2257,9C2.949558,9,2.7257,8.77614,2.7257,8.5ZM3.00425,11.5C3.00425,11.22386,3.22811,11,3.50425,11L18.5042,11C18.7804,11,19.0042,11.22386,19.0042,11.5C19.0042,11.77614,18.7804,12,18.5042,12L3.50425,12C3.22811,12,3.00425,11.77614,3.00425,11.5ZM2.864967,14.5C2.864967,14.2239,3.08882,14,3.36497,14L18.365,14C18.6411,14,18.865,14.2239,18.865,14.5C18.865,14.7761,18.6411,15,18.365,15L3.36497,15C3.08882,15,2.864967,14.7761,2.864967,14.5ZM20,17.5C20,18.328400000000002,19.3284,19,18.5,19C17.846899999999998,19,17.2913,18.5826,17.0854,18L3.50425,18C3.22811,18,3.00425,17.7761,3.00425,17.5C3.00425,17.2239,3.22811,17,3.50425,17L17.0854,17C17.2913,16.4174,17.846899999999998,16,18.5,16C19.3284,16,20,16.671599999999998,20,17.5Z" stroke-opacity="0" stroke="none"></path></svg>'), bm = () => vm.cloneNode(!0), $m = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="5" ry="5" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="3" ry="3" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse></svg>'), _m = () => $m.cloneNode(!0), km = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3,7.32468C5.90649,3.3893050000000002,11.49833,2.81306,14.6674,6.31944C14.9056,6.1554199999999994,15.192,6.05979,15.5,6.05979C15.845,6.05979,16.1628,6.17974,16.4162,6.381349999999999L18.4509,4.23827L19,4.816615L16.8945,7.03429C16.962600000000002,7.21075,17,7.40319,17,7.60463C17,8.45782,16.328400000000002,9.14947,15.5,9.14947C14.6716,9.14947,14,8.45782,14,7.60463C14,7.36402,14.0534,7.13625,14.1487,6.93322C11.32695,3.748365,6.25159,4.253956,3.612785,7.82695L3,7.32468ZM14.09,15.4717C15.7427,13.78985,16.244500000000002,11.524740000000001,15.5633,9.30134L15.5618,9.30134L16.3012,9.0502C17.072400000000002,11.56646,16.497700000000002,14.158,14.6282,16.0599C12.28737,18.442,8.62386,18.6988,6.41348,16.4501C4.5526,14.5572,4.52076,11.19671,6.36766,9.3177C7.89069,7.76754,10.07544,7.706189999999999,11.56741,9.22363C11.95453,9.61742,12.24817,10.08363,12.43369,10.57677L14.1451,8.77421L14.6942,9.35256L12.64982,11.50582C12.65827,11.59712,12.66295,11.68839,12.66378,11.77936C12.87398,12.04523,13,12.38451,13,12.7541C13,13.60729,12.32843,14.2989,11.5,14.2989C10.67157,14.2989,10,13.60729,10,12.7541C10,11.90091,10.67157,11.20926,11.5,11.20926C11.60387,11.20926,11.70528,11.220130000000001,11.8032,11.240829999999999L11.81763,11.22564C11.69858,10.71874,11.42858,10.21929,11.0284,9.81179C9.844000000000001,8.60765,8.136890000000001,8.65592,6.90822,9.90586C5.37975,11.460930000000001,5.40693,14.288,6.95404,15.8619C8.84598,17.7867,12.03496,17.5626,14.09,15.4717Z" stroke-opacity="0" stroke="none"></path></svg>'), xm = () => km.cloneNode(!0), Lm = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4,17.0854L4,3.5C4,3.223858,4.22386,3,4.5,3C4.77614,3,5,3.223858,5,3.5L5,10L7.57584,10L9.8127,4.46359C9.91614,4.20756,10.20756,4.08386,10.46359,4.1873000000000005C10.71963,4.29075,10.84333,4.58216,10.73988,4.8382000000000005L8.65438,10L11.08535,10C11.29127,9.4174,11.84689,9,12.5,9C12.65154,9,12.79784,9.02247,12.93573,9.06427L16.6464,5.35355C16.8417,5.15829,17.1583,5.15829,17.3536,5.35355C17.5488,5.54882,17.5488,5.8654,17.3536,6.06066L13.7475,9.66675C13.907,9.90508,14,10.19168,14,10.5C14,11.15311,13.5826,11.70873,13,11.91465L13,14.3638L18.3714,12.1936C18.6274,12.09015,18.918799999999997,12.21385,19.0222,12.46989C19.1257,12.72592,19.002,13.0173,18.746000000000002,13.1208L13,15.4423L13,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854ZM6.3729499999999994,17.0413L12,14.7678L12,11.91465C11.88136,11.87271,11.76956,11.81627,11.66675,11.74746L6.3729499999999994,17.0413ZM12,15.8463L6.6694700000000005,18L12,18L12,15.8463ZM6.38629,15.6137L8.250350000000001,11L11,11L6.38629,15.6137ZM5,11L7.17182,11L5,16.3754L5,11Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), wm = () => Lm.cloneNode(!0), Am = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17,4.5C17,5.32843,16.328400000000002,6,15.5,6C15.0931,6,14.7241,5.83802,14.4539,5.57503L5.98992,8.32515C5.99658,8.38251,6,8.440850000000001,6,8.5C6,9.15311,5.582599999999999,9.70873,5,9.91465L5,11.08535C5.42621,11.236,5.763999999999999,11.57379,5.91465,12L19.5,12C19.7761,12,20,12.22386,20,12.5C20,12.77614,19.7761,13,19.5,13L5.91465,13C5.70873,13.5826,5.15311,14,4.5,14C3.671573,14,3,13.3284,3,12.5C3,11.84689,3.417404,11.29127,4,11.08535L4,9.91465C3.417404,9.70873,3,9.15311,3,8.5C3,7.67157,3.671573,7,4.5,7C4.90411,7,5.2709,7.15981,5.5406200000000005,7.41967L14.0093,4.66802C14.0032,4.6128599999999995,14,4.5568,14,4.5C14,3.671573,14.6716,3,15.5,3C16.328400000000002,3,17,3.671573,17,4.5ZM4,15.5C4,15.2239,4.22386,15,4.5,15L19.5,15C19.7761,15,20,15.2239,20,15.5C20,15.7761,19.7761,16,19.5,16L4.5,16C4.22386,16,4,15.7761,4,15.5ZM4,18.5C4,18.2239,4.22386,18,4.5,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L4.5,19C4.22386,19,4,18.7761,4,18.5Z" stroke-opacity="0" stroke="none"></path></svg>'), Sm = () => Am.cloneNode(!0), Tm = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M20,3.5C20,4.15311,19.5826,4.70873,19,4.91465L19,18.5C19,18.7761,18.7761,19,18.5,19L4.91465,19C4.70873,19.5826,4.15311,20,3.5,20C2.671573,20,2,19.3284,2,18.5C2,17.846899999999998,2.417404,17.2913,3,17.0854L3,3.5C3,3.22386,3.22386,3,3.5,3L17.0854,3C17.2913,2.417404,17.846899999999998,2,18.5,2C19.3284,2,20,2.671573,20,3.5ZM17.0854,4C17.236,4.42621,17.5738,4.763999999999999,18,4.91465L18,8L14,8L14,4L17.0854,4ZM13,4L13,8L9,8L9,4L13,4ZM13,9L9,9L9,13L13,13L13,9ZM13,14L9,14L9,18L13,18L13,14ZM14,18L14,14L18,14L18,18L14,18ZM18,13L14,13L14,9L18,9L18,13ZM4.91465,18C4.763999999999999,17.5738,4.42621,17.236,4,17.0854L4,14L8,14L8,18L4.91465,18ZM4,8L4,4L8,4L8,8L4,8ZM8,9L8,13L4,13L4,9L8,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Mm = () => Tm.cloneNode(!0), Pm = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" fill="none" stroke-opacity="1" stroke-width="1"></ellipse></svg>'), Dm = () => Pm.cloneNode(!0), Nm = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.57625,6.9981C11.55099,6.999359999999999,11.52557,7,11.5,7C11.34,7,11.18584,6.97495,11.04125,6.9285499999999995L5.55401,16.4327C5.713760000000001,16.5905,5.83826,16.7839,5.91465,17L16.0854,17C16.2187,16.622700000000002,16.4987,16.314700000000002,16.8569,16.1445L11.57625,6.9981ZM12.50759,6.611219999999999C12.81005,6.336790000000001,13,5.94058,13,5.5C13,4.671573,12.32843,4,11.5,4C10.67157,4,10,4.671573,10,5.5C10,5.80059,10.08841,6.08052,10.24066,6.31522L4.64514,16.0069C4.59738,16.002299999999998,4.54896,16,4.5,16C3.671573,16,3,16.671599999999998,3,17.5C3,18.328400000000002,3.671573,19,4.5,19C5.15311,19,5.70873,18.5826,5.91465,18L16.0854,18C16.2913,18.5826,16.846899999999998,19,17.5,19C18.328400000000002,19,19,18.328400000000002,19,17.5C19,16.8365,18.5691,16.2735,17.971899999999998,16.075699999999998L12.50759,6.611219999999999Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Om = () => Nm.cloneNode(!0), Im = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19,4.5C19,5.15311,18.5826,5.70873,18,5.91465L18,18.5C18,18.7761,17.7761,19,17.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854L4,4.5C4,4.22386,4.22386,4,4.5,4L16.0854,4C16.2913,3.417404,16.846899999999998,3,17.5,3C18.328400000000002,3,19,3.671573,19,4.5ZM5,5L16.0854,5C16.236,5.42621,16.5738,5.763999999999999,17,5.91465L17,18L5.91465,18C5.763999999999999,17.5738,5.42621,17.236,5,17.0854L5,5Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Em = () => Im.cloneNode(!0), Bm = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19.6401,7.99355C20.4028,7.92291,21,7.2811900000000005,21,6.5C21,5.671573,20.3284,5,19.5,5C18.8469,5,18.2913,5.417404,18.0854,6L7.62067,6C7.34453,6,7.12067,6.22386,7.12067,6.5C7.12067,6.5479,7.12741,6.59423,7.13999,6.63809L3.2294099999999997,15.0243C2.530138,15.1517,2,15.764,2,16.5C2,17.328400000000002,2.671573,18,3.5,18C4.15311,18,4.70873,17.5826,4.91465,17L14.5963,17C14.6456,17.076,14.7162,17.1396,14.8044,17.1807C15.0546,17.2974,15.3521,17.1891,15.4688,16.9388L19.6401,7.99355ZM14.7896,16.0293L18.6551,7.739599999999999C18.3942,7.56144,18.1925,7.30307,18.0854,7L8.0746,7L4.25044,15.2009C4.55701,15.3784,4.79493,15.6613,4.91465,16L14.6207,16C14.68,16,14.7368,16.0103,14.7896,16.0293Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Fm = () => Bm.cloneNode(!0), Um = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.134443814697265,7.494615087890625L8.764323814697265,7.494615087890625L8.764323814697265,3.414215087890625L8.310223814697267,3.414215087890625L7.294603814697266,4.005035087890625L7.289713814697266,4.634915087890625L8.134443814697265,4.149892087890625L8.134443814697265,7.494615087890625ZM18.832003814697266,6.933095087890624Q19.004603814697266,6.635245087890625,19.004603814697266,6.2543850878906255Q19.004603814697266,5.884915087890625,18.845103814697264,5.593575087890625Q18.685503814697267,5.3006050878906255,18.399103814697266,5.136225087890625Q18.114303814697266,4.9702050878906245,17.754603814697266,4.9653250878906245L18.820603814697265,3.840647087890625L18.820603814697265,3.414215087890625L16.519203814697264,3.414215087890625L16.519203814697264,3.939931087890625L18.050803814697264,3.939931087890625L16.719403814697266,5.334785087890625L17.074203814697263,5.7205350878906245Q17.254903814697265,5.484525087890625,17.619503814697268,5.484525087890625Q17.980803814697268,5.484525087890625,18.187503814697266,5.689605087890625Q18.394203814697267,5.894685087890625,18.394203814697267,6.2543850878906255Q18.394203814697267,6.604315087890625,18.187503814697266,6.822415087890625Q17.980803814697268,7.0405150878906255,17.640603814697265,7.0405150878906255Q17.334603814697267,7.0405150878906255,17.124703814697266,6.890775087890625Q16.914703814697265,6.739415087890626,16.820303814697265,6.469225087890624L16.354803814697263,6.744295087890626Q16.480103814697266,7.125155087890625,16.821903814697265,7.341625087890625Q17.165403814697264,7.559725087890625,17.640603814697265,7.559725087890625Q18.039403814697266,7.559725087890625,18.348603814697267,7.393705087890625Q18.659503814697267,7.229315087890625,18.832003814697266,6.933095087890624ZM10.000003814697266,10.634915087890626C10.000003814697266,11.024655087890626,9.851363814697265,11.379685087890625,9.607683814697266,11.646395087890625L12.168903814697266,15.171615087890626C12.275403814697265,15.147615087890625,12.386203814697266,15.134915087890626,12.500003814697266,15.134915087890626C12.596503814697266,15.134915087890626,12.690803814697265,15.144015087890624,12.782303814697265,15.161415087890624L16.108803814697268,11.196955087890625C16.038703814697264,11.023375087890624,16.000003814697266,10.833655087890625,16.000003814697266,10.634915087890626C16.000003814697266,9.806495087890625,16.671603814697264,9.134915087890626,17.500003814697266,9.134915087890626C18.328403814697264,9.134915087890626,19.000003814697266,9.806495087890625,19.000003814697266,10.634915087890626C19.000003814697266,11.463345087890625,18.328403814697264,12.134915087890626,17.500003814697266,12.134915087890626C17.239503814697265,12.134915087890626,16.994503814697268,12.068495087890625,16.781003814697264,11.951675087890624L13.654703814697266,15.677415087890624C13.870303814697266,15.937215087890625,14.000003814697266,16.270915087890625,14.000003814697266,16.634915087890626C14.000003814697266,17.463315087890624,13.328403814697266,18.134915087890626,12.500003814697266,18.134915087890626C11.671573814697265,18.134915087890626,11.000003814697266,17.463315087890624,11.000003814697266,16.634915087890626C11.000003814697266,16.284415087890626,11.120193814697265,15.962015087890626,11.321603814697266,15.706715087890625L8.715393814697265,12.119565087890624C8.645053814697267,12.129685087890625,8.573143814697266,12.134915087890626,8.500003814697266,12.134915087890626C8.162103814697264,12.134915087890626,7.8503038146972655,12.023195087890626,7.599523814697266,11.834665087890626L4.505583814697266,15.521915087890624C4.809213814697266,15.796415087890624,5.000003814697266,16.193415087890624,5.000003814697266,16.634915087890626C5.000003814697266,17.463315087890624,4.328433814697266,18.134915087890626,3.5000038146972656,18.134915087890626C2.6715768146972656,18.134915087890626,2.0000038146972656,17.463315087890624,2.0000038146972656,16.634915087890626C2.0000038146972656,15.806515087890626,2.6715768146972656,15.134915087890626,3.5000038146972656,15.134915087890626C3.508253814697266,15.134915087890626,3.5164838146972657,15.135015087890626,3.524703814697266,15.135115087890625L7.033823814697266,10.953115087890625C7.011673814697265,10.850565087890626,7.000003814697266,10.744105087890624,7.000003814697266,10.634915087890626C7.000003814697266,9.806495087890625,7.671573814697266,9.134915087890626,8.500003814697266,9.134915087890626C9.328433814697267,9.134915087890626,10.000003814697266,9.806495087890625,10.000003814697266,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), zm = () => Um.cloneNode(!0), Vm = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.13444,7.494615087890625L8.76432,7.494615087890625L8.76432,3.414215087890625L8.310220000000001,3.414215087890625L7.2946,4.005035087890625L7.28971,4.634915087890625L8.13444,4.149892087890625L8.13444,7.494615087890625ZM18.832,6.929835087890625Q19.0046,6.635245087890625,19.0046,6.2543850878906255Q19.0046,5.889805087890625,18.8451,5.5952050878906245Q18.6855,5.3006050878906255,18.3975,5.132965087890625Q18.1094,4.9653250878906245,17.7399,4.9653250878906245Q17.435499999999998,4.9653250878906245,17.1556,5.149245087890625L17.2793,3.939931087890625L18.8304,3.939931087890625L18.8304,3.414215087890625L16.7406,3.414215087890625L16.5094,5.665195087890625L17.0156,5.795405087890625Q17.095399999999998,5.655425087890626,17.2516,5.570795087890625Q17.4095,5.484525087890625,17.6357,5.484525087890625Q17.9694,5.484525087890625,18.1842,5.697745087890625Q18.4007,5.909335087890625,18.4007,6.2543850878906255Q18.4007,6.604315087890625,18.1842,6.822415087890625Q17.9694,7.0405150878906255,17.6292,7.0405150878906255Q17.3298,7.0405150878906255,17.119799999999998,6.890775087890625Q16.9098,6.739415087890626,16.825200000000002,6.474115087890625L16.3597,6.749175087890626Q16.470399999999998,7.110505087890624,16.807299999999998,7.335115087890625Q17.144199999999998,7.559725087890625,17.6292,7.559725087890625Q18.0296,7.559725087890625,18.3438,7.392075087890625Q18.6595,7.224435087890625,18.832,6.929835087890625ZM10,10.634915087890626C10,11.024655087890626,9.85136,11.379685087890625,9.60768,11.646395087890625L12.1689,15.171615087890626C12.2754,15.147615087890625,12.3862,15.134915087890626,12.5,15.134915087890626C12.5965,15.134915087890626,12.6908,15.144015087890624,12.7823,15.161415087890624L16.108800000000002,11.196955087890625C16.0387,11.023375087890624,16,10.833655087890625,16,10.634915087890626C16,9.806495087890625,16.671599999999998,9.134915087890626,17.5,9.134915087890626C18.3284,9.134915087890626,19,9.806495087890625,19,10.634915087890626C19,11.463345087890625,18.3284,12.134915087890626,17.5,12.134915087890626C17.2395,12.134915087890626,16.994500000000002,12.068505087890625,16.781,11.951675087890624L13.6547,15.677415087890624C13.8703,15.937215087890625,14,16.270915087890625,14,16.634915087890626C14,17.463315087890624,13.3284,18.134915087890626,12.5,18.134915087890626C11.67157,18.134915087890626,11,17.463315087890624,11,16.634915087890626C11,16.284415087890626,11.12019,15.962015087890626,11.3216,15.706715087890625L8.71539,12.119565087890624C8.645050000000001,12.129685087890625,8.57314,12.134915087890626,8.5,12.134915087890626C8.162099999999999,12.134915087890626,7.8503,12.023195087890626,7.59952,11.834665087890626L4.50558,15.521915087890624C4.80921,15.796415087890624,5,16.193415087890624,5,16.634915087890626C5,17.463315087890624,4.32843,18.134915087890626,3.5,18.134915087890626C2.671573,18.134915087890626,2,17.463315087890624,2,16.634915087890626C2,15.806515087890626,2.671573,15.134915087890626,3.5,15.134915087890626C3.5082500000000003,15.134915087890626,3.51648,15.135015087890626,3.5247,15.135115087890625L7.03382,10.953115087890625C7.01167,10.850565087890626,7,10.744105087890624,7,10.634915087890626C7,9.806495087890625,7.67157,9.134915087890626,8.5,9.134915087890626C9.32843,9.134915087890626,10,9.806495087890625,10,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Rm = () => Vm.cloneNode(!0), Km = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M18.8532,7.020985087890625Q19.0257,6.734525087890625,19.0257,6.369945087890625Q19.0257,6.020005087890625,18.8499,5.754705087890625Q18.6758,5.489415087890626,18.3649,5.339675087890625Q18.5944,5.209465087890625,18.7214,4.994615087890625Q18.8499,4.779775087890625,18.8499,4.5193550878906255Q18.8499,4.2003480878906245,18.7002,3.951324087890625Q18.5505,3.700673087890625,18.277,3.557444087890625Q18.0052,3.414215087890625,17.6455,3.414215087890625Q17.285800000000002,3.414215087890625,17.0107,3.557444087890625Q16.7357,3.700673087890625,16.5843,3.951324087890625Q16.4346,4.2003480878906245,16.4346,4.5193550878906255Q16.4346,4.779775087890625,16.561500000000002,4.994615087890625Q16.6901,5.209465087890625,16.919600000000003,5.339675087890625Q16.6055,5.489415087890626,16.4297,5.757965087890625Q16.255499999999998,6.024895087890625,16.255499999999998,6.369945087890625Q16.255499999999998,6.734525087890625,16.4297,7.020985087890625Q16.6055,7.305815087890625,16.919600000000003,7.465325087890625Q17.2354,7.624825087890625,17.6455,7.624825087890625Q18.0557,7.624825087890625,18.3682,7.465325087890625Q18.6807,7.305815087890625,18.8532,7.020985087890625ZM8.76432,7.559725087890625L8.13444,7.559725087890625L8.13444,4.214996087890625L7.28971,4.700025087890625L7.2946,4.070139087890625L8.310220000000001,3.479319087890625L8.76432,3.479319087890625L8.76432,7.559725087890625ZM17.1816,4.955555087890625Q17.0042,4.784655087890625,17.0042,4.5095950878906255Q17.0042,4.229645087890625,17.18,4.057119087890625Q17.355800000000002,3.884592087890625,17.6455,3.884592087890625Q17.935200000000002,3.884592087890625,18.1077,4.057119087890625Q18.2803,4.229645087890625,18.2803,4.5095950878906255Q18.2803,4.784655087890625,18.1045,4.955555087890625Q17.930300000000003,5.124825087890625,17.6455,5.124825087890625Q17.3607,5.124825087890625,17.1816,4.955555087890625ZM18.2217,5.7953950878906255Q18.4398,6.005365087890625,18.4398,6.3552950878906245Q18.4398,6.705235087890625,18.2217,6.915195087890625Q18.0052,7.125155087890625,17.6455,7.125155087890625Q17.285800000000002,7.125155087890625,17.067700000000002,6.915195087890625Q16.849600000000002,6.705235087890625,16.849600000000002,6.3552950878906245Q16.849600000000002,6.005365087890625,17.064500000000002,5.7953950878906255Q17.2793,5.585435087890625,17.6455,5.585435087890625Q18.0052,5.585435087890625,18.2217,5.7953950878906255ZM9.60768,11.711495087890626C9.85136,11.444785087890626,10,11.089765087890626,10,10.700025087890625C10,9.871595087890626,9.32843,9.200025087890625,8.5,9.200025087890625C7.67157,9.200025087890625,7,9.871595087890626,7,10.700025087890625C7,10.809205087890625,7.01167,10.915665087890625,7.03382,11.018215087890624L3.5247,15.200215087890625C3.51648,15.200115087890625,3.5082500000000003,15.200015087890625,3.5,15.200015087890625C2.671573,15.200015087890625,2,15.871615087890625,2,16.700015087890627C2,17.528415087890625,2.671573,18.200015087890627,3.5,18.200015087890627C4.32843,18.200015087890627,5,17.528415087890625,5,16.700015087890627C5,16.258515087890625,4.80921,15.861515087890625,4.50558,15.587015087890626L7.59952,11.899765087890625C7.8503,12.088295087890625,8.162099999999999,12.200025087890625,8.5,12.200025087890625C8.57314,12.200025087890625,8.645050000000001,12.194785087890626,8.71539,12.184675087890625L11.3216,15.771815087890625C11.12019,16.027215087890625,11,16.349515087890623,11,16.700015087890627C11,17.528415087890625,11.67157,18.200015087890627,12.5,18.200015087890627C13.3284,18.200015087890627,14,17.528415087890625,14,16.700015087890627C14,16.336015087890623,13.8703,16.002315087890626,13.6547,15.742515087890625L16.781,12.016775087890625C16.994500000000002,12.133605087890626,17.2395,12.200025087890625,17.5,12.200025087890625C18.3284,12.200025087890625,19,11.528445087890624,19,10.700025087890625C19,9.871595087890626,18.3284,9.200025087890625,17.5,9.200025087890625C16.671599999999998,9.200025087890625,16,9.871595087890626,16,10.700025087890625C16,10.898765087890624,16.0387,11.088475087890625,16.108800000000002,11.262055087890625L12.7823,15.226515087890625C12.6908,15.209115087890625,12.5965,15.200015087890625,12.5,15.200015087890625C12.3862,15.200015087890625,12.2754,15.212715087890626,12.1689,15.236715087890625L9.60768,11.711495087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), jm = () => Km.cloneNode(!0), Qm = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M9.474616630859375,7.494615087890625L8.844736630859375,7.494615087890625L8.844736630859375,4.149892087890625L8.000006630859374,4.634915087890625L8.004896630859374,4.005035087890625L9.020516630859376,3.414215087890625L9.474616630859375,3.414215087890625L9.474616630859375,7.494615087890625ZM18.529296630859378,4.8318550878906255Q18.307996630859375,5.028795087890625,18.122396630859377,5.385245087890625Q17.868496630859376,5.019035087890625,17.629196630859376,4.8269750878906255Q17.389996630859375,4.634915087890625,17.168596630859376,4.634915087890625Q16.794296630859375,4.634915087890625,16.522496630859376,4.976715087890625Q16.252296630859377,5.3168850878906255,16.252296630859377,5.7856350878906255Q16.252296630859377,6.218575087890625,16.502896630859375,6.521315087890625Q16.755196630859373,6.822415087890625,17.114896630859377,6.822415087890625Q17.368796630859375,6.822415087890625,17.588596630859374,6.625475087890624Q17.809896630859377,6.428535087890625,17.998696630859374,6.0688350878906245Q18.249396630859373,6.439935087890625,18.488596630859377,6.631985087890625Q18.727896630859377,6.822415087890625,18.952496630859375,6.822415087890625Q19.326796630859373,6.822415087890625,19.596996630859376,6.482245087890625Q19.868796630859375,6.140455087890626,19.868796630859375,5.671705087890626Q19.868796630859375,5.238755087890625,19.618196630859376,4.937655087890625Q19.367496630859375,4.634915087890625,19.006196630859375,4.634915087890625Q18.750696630859377,4.634915087890625,18.529296630859378,4.8318550878906255ZM18.337296630859377,5.674955087890625L18.278696630859375,5.596835087890625Q18.449596630859375,5.272935087890625,18.622096630859374,5.1101750878906245Q18.794596630859374,4.947415087890625,18.967096630859373,4.947415087890625Q19.194996630859375,4.947415087890625,19.346396630859374,5.1345950878906255Q19.497696630859377,5.320135087890625,19.497696630859377,5.598455087890625Q19.497696630859377,5.8914250878906245,19.360996630859376,6.096505087890625Q19.224296630859374,6.301585087890626,19.027396630859375,6.301585087890626Q18.915096630859374,6.301585087890626,18.742496630859375,6.146965087890624Q18.569996630859375,5.992335087890625,18.337296630859377,5.674955087890625ZM17.785496630859377,5.779125087890625L17.842496630859372,5.857245087890625Q17.668296630859373,6.186025087890625,17.495796630859374,6.348785087890625Q17.324896630859374,6.509915087890625,17.153996630859375,6.509915087890625Q16.926096630859377,6.509915087890625,16.774796630859377,6.324375087890624Q16.623396630859375,6.137195087890625,16.623396630859375,5.858875087890625Q16.623396630859375,5.565905087890625,16.761696630859376,5.360825087890625Q16.900096630859373,5.1557550878906255,17.095396630859376,5.1557550878906255Q17.228896630859374,5.1557550878906255,17.365596630859375,5.2778250878906245Q17.502296630859377,5.399895087890625,17.785496630859377,5.779125087890625ZM10.710296630859375,10.634915087890626C10.710296630859375,11.024655087890626,10.561656630859375,11.379685087890625,10.317976630859375,11.646395087890625L12.879196630859376,15.171615087890626C12.985696630859374,15.147615087890625,13.096496630859376,15.134915087890626,13.210296630859375,15.134915087890626C13.306796630859376,15.134915087890626,13.401096630859374,15.144015087890624,13.492596630859374,15.161415087890624L16.819096630859377,11.196955087890625C16.748996630859374,11.023375087890624,16.710296630859375,10.833655087890625,16.710296630859375,10.634915087890626C16.710296630859375,9.806495087890625,17.381896630859373,9.134915087890626,18.210296630859375,9.134915087890626C19.038696630859373,9.134915087890626,19.710296630859375,9.806495087890625,19.710296630859375,10.634915087890626C19.710296630859375,11.463345087890625,19.038696630859373,12.134915087890626,18.210296630859375,12.134915087890626C17.949796630859375,12.134915087890626,17.704796630859377,12.068505087890625,17.491296630859374,11.951675087890624L14.364996630859375,15.677415087890624C14.580596630859375,15.937215087890625,14.710296630859375,16.270915087890625,14.710296630859375,16.634915087890626C14.710296630859375,17.463315087890624,14.038696630859375,18.134915087890626,13.210296630859375,18.134915087890626C12.381866630859374,18.134915087890626,11.710296630859375,17.463315087890624,11.710296630859375,16.634915087890626C11.710296630859375,16.284415087890626,11.830486630859374,15.962015087890626,12.031896630859375,15.706715087890625L9.425686630859374,12.119565087890624C9.355346630859376,12.129685087890625,9.283436630859375,12.134915087890626,9.210296630859375,12.134915087890626C8.872396630859374,12.134915087890626,8.560596630859376,12.023195087890626,8.309816630859375,11.834665087890626L5.215876630859375,15.521915087890624C5.519506630859375,15.796415087890624,5.710296630859375,16.193415087890624,5.710296630859375,16.634915087890626C5.710296630859375,17.463315087890624,5.038726630859375,18.134915087890626,4.210296630859375,18.134915087890626C3.381869630859375,18.134915087890626,2.710296630859375,17.463315087890624,2.710296630859375,16.634915087890626C2.710296630859375,15.806515087890626,3.381869630859375,15.134915087890626,4.210296630859375,15.134915087890626C4.218546630859375,15.134915087890626,4.226776630859375,15.135015087890626,4.234996630859375,15.135115087890625L7.744116630859375,10.953115087890625C7.721966630859375,10.850565087890626,7.710296630859375,10.744105087890624,7.710296630859375,10.634915087890626C7.710296630859375,9.806495087890625,8.381866630859374,9.134915087890626,9.210296630859375,9.134915087890626C10.038726630859376,9.134915087890626,10.710296630859375,9.806495087890625,10.710296630859375,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Zm = () => Qm.cloneNode(!0), Hm = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M21,5.5C21,6.32843,20.3284,7,19.5,7C19.4136,7,19.3289,6.99269,19.2465,6.97866L15.6257,15.5086C15.8587,15.7729,16,16.119999999999997,16,16.5C16,17.328400000000002,15.3284,18,14.5,18C13.8469,18,13.2913,17.5826,13.0854,17L3.91465,17C3.70873,17.5826,3.15311,18,2.5,18C1.671573,18,1,17.328400000000002,1,16.5C1,15.6716,1.671573,15,2.5,15C2.5840199999999998,15,2.66643,15.0069,2.74668,15.0202L6.36934,6.48574C6.13933,6.22213,6,5.87733,6,5.5C6,4.671573,6.67157,4,7.5,4C8.15311,4,8.70873,4.417404,8.91465,5L18.0854,5C18.2913,4.417404,18.8469,4,19.5,4C20.3284,4,21,4.671573,21,5.5ZM18.0854,6L8.91465,6C8.892579999999999,6.06243,8.8665,6.12296,8.83672,6.18128L13.9814,15.0921C14.143,15.0325,14.3177,15,14.5,15C14.584,15,14.6664,15.0069,14.7467,15.0202L18.3693,6.48574C18.2462,6.3446,18.149,6.1802,18.0854,6ZM13.2036,15.745L8.0861,6.8811800000000005C7.90605,6.95768,7.70797,7,7.5,7C7.41359,7,7.32888,6.99269,7.24647,6.97866L3.62571,15.5086C3.7512,15.651,3.8501,15.8174,3.91465,16L13.0854,16C13.1169,15.9108,13.1566,15.8255,13.2036,15.745Z" stroke-opacity="0" stroke="none"></path></svg>'), Ym = () => Hm.cloneNode(!0), Wm = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.92159,5.93994C6.04014,5.90529,6.152620000000001,5.85639,6.25704,5.79523L9.12729,9.89437C9.045449999999999,10.07959,9,10.28449,9,10.5C9,10.79522,9.08529,11.07053,9.232569999999999,11.30262L4.97573,16.7511L5.92159,5.93994ZM4.92259,5.8848400000000005C4.38078,5.658659999999999,4,5.1238,4,4.5C4,3.671573,4.67157,3,5.5,3C6.2157,3,6.81433,3.50124,6.96399,4.17183L15.1309,4.88634C15.3654,4.36387,15.8902,4,16.5,4C17.328400000000002,4,18,4.67157,18,5.5C18,6.08983,17.659599999999998,6.60015,17.1645,6.84518L18.4264,14.0018C18.4508,14.0006,18.4753,14,18.5,14C19.3284,14,20,14.6716,20,15.5C20,16.328400000000002,19.3284,17,18.5,17C17.932499999999997,17,17.4386,16.6849,17.183799999999998,16.22L5.99686,18.5979C5.946429999999999,19.3807,5.29554,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.869300000000003,3.389292,17.3295,3.94071,17.1077L4.92259,5.8848400000000005ZM5.72452,17.6334C5.69799,17.596,5.6698,17.5599,5.64004,17.525100000000002L10.01843,11.92103C10.16958,11.97223,10.33155,12,10.5,12C10.80059,12,11.08052,11.91158,11.31522,11.75934L17.0606,15.0765C17.0457,15.1271,17.0335,15.1789,17.023899999999998,15.2317L5.72452,17.6334ZM11.92855,10.95875L17.4349,14.1379L16.1699,6.96356C15.9874,6.92257,15.8174,6.8483,15.6667,6.74746L11.99771,10.4165C11.99923,10.44414,12,10.47198,12,10.5C12,10.66,11.97495,10.814160000000001,11.92855,10.95875ZM10.5,9C10.259830000000001,9,10.03285,9.05644,9.83159,9.15679L7.04919,5.1831L15.0493,5.88302C15.054,5.90072,15.059,5.91829,15.0643,5.9357299999999995L11.56066,9.43934C11.28921,9.16789,10.91421,9,10.5,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), qm = () => Wm.cloneNode(!0), Gm = /* @__PURE__ */ _('<svg viewBox="0 0 22 22"><path d="M4.727219638671875,8.007996215820313L9.973849638671876,2.7629472158203123C10.167279638671875,2.5696791158203123,10.480729638671875,2.5696791158203123,10.674169638671875,2.7629472158203123L13.223329638671874,5.311756215820313C13.416929638671874,5.505236215820313,13.416929638671874,5.8189862158203125,13.223329638671874,6.012466215820313L7.977129638671875,11.257906215820313C7.379859638671875,11.855176215820313,7.407609638671875,12.909396215820312,8.033809638671876,13.535596215820313C8.660409638671876,14.162596215820313,9.713849638671874,14.189996215820312,10.311129638671876,13.591896215820313L15.556929638671875,8.346066215820311C15.750429638671875,8.152526215820313,16.064229638671875,8.152526215820313,16.257629638671872,8.346066215820311L18.806529638671876,10.895266215820312C19.000029638671876,11.088746215820313,19.000029638671876,11.402496215820312,18.806529638671876,11.595976215820313L13.560629638671875,16.841796215820313C11.165619638671876,19.237196215820312,7.197149638671875,19.19919621582031,4.783499638671875,16.785496215820313C2.3698426386718747,14.371896215820312,2.331397638671875,10.403416215820313,4.727219638671875,8.007996215820313ZM12.172299638671875,5.662106215820312L10.323809638671875,3.8136162158203124L5.4287196386718755,8.709096215820313C3.422893638671875,10.714536215820312,3.4549956386718748,14.055196215820313,5.484999638671875,16.08479621582031C7.514609638671875,18.114796215820313,10.855289638671875,18.146496215820314,12.860719638671876,16.141096215820312L15.465629638671874,13.535796215820312L14.090929638671875,12.160756215820312L14.791629638671875,11.460436215820312L16.166229638671876,12.834996215820313L17.755829638671877,11.245226215820313L15.907729638671874,9.396736215820312L11.011839638671875,14.292596215820312C10.042809638671875,15.262396215820312,8.418249638671874,15.243796215820312,7.406019638671875,14.306496215820312L7.333099638671875,14.236296215820312C6.327599638671876,13.230796215820313,6.284009638671876,11.550396215820312,7.276419638671875,10.557586215820312L9.882199638671874,7.952026215820313L8.501079638671875,6.570906215820313L9.201789638671876,5.870186215820313L10.582939638671874,7.251336215820312L12.172299638671875,5.662106215820312Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Xm = (e) => (() => {
  const t = Gm.cloneNode(!0);
  return Oe(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), Jm = /* @__PURE__ */ _('<svg viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_615"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_615)"><path d="M19.672,3.0673368C19.4417,2.9354008,19.1463,3.00292252,18.9994,3.2210900000000002L17.4588,5.50622L16.743299999999998,3.781253L13.9915,7.4662L13.9618,7.51108C13.8339,7.72862,13.8936,8.005659999999999,14.1004,8.15391L14.1462,8.183430000000001C14.3683,8.308720000000001,14.6511,8.25001,14.8022,8.047229999999999L16.4907,5.78571L17.246299999999998,7.60713L19.8374,3.7635389999999997L19.8651,3.717088C19.9871,3.484615,19.9023,3.199273,19.672,3.0673368ZM4.79974,8.462530000000001L10.117740000000001,3.252975C10.31381,3.0610145,10.63152,3.0610145,10.82759,3.252975L13.4115,5.78453C13.6076,5.976710000000001,13.6076,6.28833,13.4115,6.4805L8.093869999999999,11.69045C7.48847,12.28368,7.51659,13.3308,8.151309999999999,13.9528C8.786439999999999,14.5755,9.85421,14.6027,10.45961,14.0087L15.7768,8.79831C15.9729,8.60609,16.2909,8.60609,16.487099999999998,8.79831L19.0705,11.33026C19.2667,11.52244,19.2667,11.83406,19.0705,12.02623L13.7533,17.2366C11.32572,19.6158,7.30328,19.578,4.85679,17.1807C2.410298,14.7834,2.371331,10.84174,4.79974,8.462530000000001ZM12.3461,6.1325199999999995L10.47246,4.29654L5.51079,9.15889C3.477674,11.15076,3.510214,14.4688,5.56784,16.4847C7.62506,18.500999999999998,11.01117,18.5325,13.0439,16.540599999999998L15.6842,13.9529L14.2908,12.58718L15.0011,11.89161L16.394399999999997,13.2569L18.0056,11.67786L16.1323,9.84188L11.16985,14.7046C10.18764,15.6679,8.540980000000001,15.6494,7.51498,14.7184L7.44107,14.6487C6.4219,13.65,6.37771,11.98096,7.38362,10.994869999999999L10.02485,8.40693L8.624939999999999,7.03516L9.335180000000001,6.33919L10.73512,7.71099L12.3461,6.1325199999999995Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), eg = (e) => (() => {
  const t = Jm.cloneNode(!0);
  return Oe(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), tg = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,17C5.80945,17,3.667717,12.85,3.113386,11.575C2.9622047,11.2,2.9622047,10.8,3.113386,10.425C3.667717,9.15,5.80945,5,11,5C16.165399999999998,5,18.3323,9.15,18.8866,10.425C19.0378,10.8,19.0378,11.2,18.8866,11.575C18.3323,12.85,16.165399999999998,17,11,17ZM4.04567,10.8C3.995276,10.925,3.995276,11.05,4.04567,11.175C4.52441,12.325,6.43937,16,11,16C15.5606,16,17.4756,12.325,17.9543,11.2C18.0047,11.075,18.0047,10.95,17.9543,10.825C17.4756,9.675,15.5606,6,11,6C6.43937,6,4.52441,9.675,4.04567,10.8ZM11,13.5C9.61417,13.5,8.480319999999999,12.375,8.480319999999999,11C8.480319999999999,9.625,9.61417,8.5,11,8.5C12.38583,8.5,13.5197,9.625,13.5197,11C13.5197,12.375,12.38583,13.5,11,13.5ZM11,9.5C10.1685,9.5,9.48819,10.175,9.48819,11C9.48819,11.825,10.1685,12.5,11,12.5C11.8315,12.5,12.51181,11.825,12.51181,11C12.51181,10.175,11.8315,9.5,11,9.5Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), ng = () => tg.cloneNode(!0), rg = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.80417,14.9887L4.62563,16.167299999999997C4.43037,16.3625,4.43037,16.6791,4.62563,16.8744C4.82089,17.0696,5.13748,17.0696,5.332739999999999,16.8744L6.62638,15.5807C7.75595,16.290100000000002,9.19328,16.7929,11,16.7929C16.165399999999998,16.7929,18.3323,12.64289,18.8866,11.36789C19.0378,10.99289,19.0378,10.59289,18.8866,10.21789C18.5549,9.45486,17.6456,7.66212,15.8617,6.34545L17.3536,4.853553C17.5488,4.658291,17.5488,4.341709,17.3536,4.146447C17.1583,3.9511845,16.8417,3.9511845,16.6464,4.146447L15.0014,5.7915399999999995C13.9314,5.1969,12.61166,4.792893,11,4.792893C5.80945,4.792893,3.667717,8.94289,3.113386,10.21789C2.9622049,10.59289,2.9622049,10.99289,3.113386,11.36789C3.424435,12.08333,4.2353000000000005,13.70399,5.80417,14.9887ZM7.36012,14.847C8.32327,15.4074,9.52286,15.7929,11,15.7929C15.5606,15.7929,17.4756,12.11789,17.9543,10.99289C18.0047,10.86789,18.0047,10.74289,17.9543,10.61789C17.659,9.90846,16.8171,8.23812,15.1447,7.06241L12.96929,9.23782C13.3134,9.66543,13.5197,10.20642,13.5197,10.79289C13.5197,12.16789,12.38583,13.29289,11,13.29289C10.41596,13.29289,9.87667,13.09308,9.44815,12.75896L7.36012,14.847ZM8.794609999999999,11.99829L6.520099999999999,14.2728C5.06905,13.12119,4.32057,11.628250000000001,4.04567,10.96789C3.995275,10.84289,3.995275,10.71789,4.04567,10.59289C4.52441,9.46789,6.43937,5.79289,11,5.79289C12.28868,5.79289,13.3661,6.086320000000001,14.2596,6.53329L12.19759,8.5953C11.84086,8.40257,11.43271,8.29289,11,8.29289C9.61417,8.29289,8.480319999999999,9.41789,8.480319999999999,10.79289C8.480319999999999,11.22918,8.594470000000001,11.64029,8.794609999999999,11.99829ZM10.16528,12.04183C10.404869999999999,12.20032,10.692070000000001,12.29289,11,12.29289C11.8315,12.29289,12.51181,11.61789,12.51181,10.79289C12.51181,10.48318,12.41593,10.194600000000001,12.25216,9.95494L10.16528,12.04183ZM11.43602,9.35687L9.55616,11.236740000000001C9.512,11.09633,9.48819,10.94724,9.48819,10.79289C9.48819,9.96789,10.1685,9.29289,11,9.29289C11.15142,9.29289,11.29782,9.31528,11.43602,9.35687Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), og = () => rg.cloneNode(!0), ig = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_625"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_625)"><path d="M14.5385,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807692,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.88462,4,14.5385,5.61538,14.5385,7.576919999999999L14.5385,9.76923ZM10.88461,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923L13.38462,9.76923L13.38462,7.576919999999999C13.38462,6.23077,12.26923,5.15385,10.88461,5.15385ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.038450000000001,12.07692,11.307680000000001,12.34615,11.307680000000001,12.65385L11.307680000000001,14.5769C11.307680000000001,14.8846,11.038450000000001,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), ag = () => ig.cloneNode(!0), sg = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_620"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_620)"><path d="M8.38461,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807693,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.46154,4,13.84615,4.961539,14.3462,6.423080000000001C14.4615,6.73077,14.3077,7.038460000000001,14,7.15385C13.69231,7.26923,13.38461,7.11538,13.26923,6.80769C12.92308,5.80769,11.96154,5.15385,10.88462,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.03846,12.07692,11.307690000000001,12.34615,11.307690000000001,12.65385L11.307690000000001,14.5769C11.307690000000001,14.8846,11.03846,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), lg = () => sg.cloneNode(!0), cg = /* @__PURE__ */ _('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M16.966900000000003,8.67144C16.6669,8.67144,16.4247,8.91558,16.4247,9.21802L16.4247,16.631500000000003C16.4247,17.322,16.007199999999997,17.9068,15.5139,17.9068L13.93072,17.9068L13.93072,9.2162C13.93072,8.91741,13.68675,8.67144,13.38855,8.67144C13.09036,8.67144,12.84639,8.91741,12.84639,9.21802L12.84639,17.9068L10.151810000000001,17.9068L10.151810000000001,9.21802C10.151810000000001,8.91741,9.90783,8.67144,9.609639999999999,8.67144C9.31145,8.67144,9.06747,8.91741,9.06747,9.219850000000001L9.06747,17.9068L7.48614,17.9068C6.99277,17.9068,6.5753,17.322,6.5753,16.631500000000003L6.5753,9.21802C6.5753,8.91558,6.333130000000001,8.67144,6.03313,8.67144C5.73313,8.67144,5.49096,8.91558,5.49096,9.21802L5.49096,16.631500000000003C5.49096,17.9378,6.385540000000001,19,7.48614,19L15.512,19C16.6127,19,17.509,17.9378,17.509,16.631500000000003L17.509,9.21802C17.509,8.91558,17.2669,8.67144,16.966900000000003,8.67144ZM18.4578,6.21183L4.542169,6.21183C4.243976,6.21183,4,6.45779,4,6.75841C4,7.05903,4.243976,7.30499,4.542169,7.30499L18.4578,7.30499C18.756,7.30499,19,7.05903,19,6.75841C19,6.45779,18.756,6.21183,18.4578,6.21183ZM8.68072,5.10045L14.3193,5.10045C14.6175,5.10045,14.8614,4.852666,14.8614,4.550225C14.8614,4.247783,14.6175,4,14.3193,4L8.68072,4C8.38253,4,8.13855,4.247783,8.13855,4.550225C8.13855,4.852666,8.38253,5.10045,8.68072,5.10045Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), ug = () => cg.cloneNode(!0), dg = {
  horizontalStraightLine: Zf,
  horizontalRayLine: Yf,
  horizontalSegment: qf,
  verticalStraightLine: Xf,
  verticalRayLine: em,
  verticalSegment: nm,
  straightLine: om,
  rayLine: am,
  segment: lm,
  arrow: um,
  priceLine: hm,
  priceChannelLine: mm,
  parallelStraightLine: ym,
  fibonacciLine: pm,
  fibonacciSegment: bm,
  fibonacciCircle: _m,
  fibonacciSpiral: xm,
  fibonacciSpeedResistanceFan: wm,
  fibonacciExtension: Sm,
  gannBox: Mm,
  circle: Dm,
  triangle: Om,
  rect: Em,
  parallelogram: Fm,
  threeWaves: zm,
  fiveWaves: Rm,
  eightWaves: jm,
  anyWaves: Zm,
  abcd: Ym,
  xabcd: qm,
  weak_magnet: Xm,
  strong_magnet: eg,
  lock: ag,
  unlock: lg,
  visible: ng,
  invisible: og,
  remove: ug
};
function hg(e) {
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
function fg(e) {
  return [
    { key: "priceChannelLine", text: d("price_channel_line", e) },
    { key: "parallelStraightLine", text: d("parallel_straight_line", e) }
  ];
}
function mg(e) {
  return [
    { key: "circle", text: d("circle", e) },
    { key: "rect", text: d("rect", e) },
    { key: "parallelogram", text: d("parallelogram", e) },
    { key: "triangle", text: d("triangle", e) }
  ];
}
function gg(e) {
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
function yg(e) {
  return [
    { key: "xabcd", text: d("xabcd", e) },
    { key: "abcd", text: d("abcd", e) },
    { key: "threeWaves", text: d("three_waves", e) },
    { key: "fiveWaves", text: d("five_waves", e) },
    { key: "eightWaves", text: d("eight_waves", e) },
    { key: "anyWaves", text: d("any_waves", e) }
  ];
}
function Cg(e) {
  return [
    { key: "weak_magnet", text: d("weak_magnet", e) },
    { key: "strong_magnet", text: d("strong_magnet", e) }
  ];
}
const et = (e) => dg[e.name](e.class), pg = /* @__PURE__ */ _('<div class="klinecharts-pro-drawing-bar"><span class="split-line"></span><div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div><div class="item"><span style="width:32px;height:32px"></span></div><div class="item"><span style="width:32px;height:32px"></span></div><span class="split-line"></span><div class="item"><span style="width:32px;height:32px"></span></div></div>'), vg = /* @__PURE__ */ _('<div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div>'), x0 = /* @__PURE__ */ _('<li><span style="padding-left:8px"></span></li>'), bg = "drawing_tools", $g = (e) => {
  const [t, r] = M("horizontalStraightLine"), [n, s] = M("priceChannelLine"), [c, f] = M("circle"), [m, v] = M("fibonacciLine"), [L, $] = M("xabcd"), [w, E] = M("weak_magnet"), [Q, re] = M("normal"), [I, K] = M(!1), [z, ce] = M(!0), [V, oe] = M(""), Y = (R) => {
    oe((J) => J === R ? "" : R);
  }, ve = H(() => [{
    key: "singleLine",
    icon: t(),
    list: hg(e.locale),
    setter: r
  }, {
    key: "moreLine",
    icon: n(),
    list: fg(e.locale),
    setter: s
  }, {
    key: "polygon",
    icon: c(),
    list: mg(e.locale),
    setter: f
  }, {
    key: "fibonacci",
    icon: m(),
    list: gg(e.locale),
    setter: v
  }, {
    key: "wave",
    icon: L(),
    list: yg(e.locale),
    setter: $
  }]), W = H(() => Cg(e.locale));
  return (() => {
    const R = pg.cloneNode(!0), J = R.firstChild, ue = J.nextSibling, S = ue.firstChild, j = S.nextSibling, Z = j.firstChild, F = ue.nextSibling, ie = F.firstChild, le = F.nextSibling, ee = le.firstChild, B = le.nextSibling, ne = B.nextSibling, G = ne.firstChild;
    return p(R, () => ve().map((N) => (() => {
      const O = vg.cloneNode(!0), pe = O.firstChild, $e = pe.nextSibling, ge = $e.firstChild;
      return O.addEventListener("blur", () => {
        oe("");
      }), O.$$click = () => {
        Y(N.key);
      }, p(pe, A(et, {
        get name() {
          return N.icon;
        }
      })), p(O, (() => {
        const je = H(() => N.key === V());
        return () => je() && A(vn, {
          class: "list",
          get children() {
            return N.list.map((x) => (() => {
              const ye = x0.cloneNode(!0), Me = ye.firstChild;
              return ye.$$click = (tt) => {
                tt.stopPropagation(), N.setter(x.key), e.onDrawingItemClick({
                  name: x.key,
                  lock: I(),
                  mode: Q()
                }), oe("");
              }, p(ye, A(et, {
                get name() {
                  return x.key;
                }
              }), Me), p(Me, () => x.text), ye;
            })());
          }
        });
      })(), null), U(() => Oe(ge, "class", N.key === V() ? "rotate" : "")), O;
    })()), J), ue.addEventListener("blur", () => {
      oe("");
    }), ue.$$click = () => {
      Y("mode");
    }, p(S, (() => {
      const N = H(() => w() === "weak_magnet");
      return () => N() ? (() => {
        const O = H(() => Q() === "weak_magnet");
        return () => O() ? A(et, {
          name: "weak_magnet",
          class: "selected"
        }) : A(et, {
          name: "weak_magnet"
        });
      })() : (() => {
        const O = H(() => Q() === "strong_magnet");
        return () => O() ? A(et, {
          name: "strong_magnet",
          class: "selected"
        }) : A(et, {
          name: "strong_magnet"
        });
      })();
    })()), p(ue, (() => {
      const N = H(() => V() === "mode");
      return () => N() && A(vn, {
        class: "list",
        get children() {
          return W().map((O) => (() => {
            const pe = x0.cloneNode(!0), $e = pe.firstChild;
            return pe.$$click = (ge) => {
              ge.stopPropagation(), E(O.key), re(O.key), e.onModeChange(O.key), oe("");
            }, p(pe, A(et, {
              get name() {
                return O.key;
              }
            }), $e), p($e, () => O.text), pe;
          })());
        }
      });
    })(), null), ie.$$click = () => {
      const N = !I();
      K(N), e.onLockChange(N);
    }, p(ie, (() => {
      const N = H(() => !!I());
      return () => N() ? A(et, {
        name: "lock"
      }) : A(et, {
        name: "unlock"
      });
    })()), ee.$$click = () => {
      const N = !z();
      ce(N), e.onVisibleChange(N);
    }, p(ee, (() => {
      const N = H(() => !!z());
      return () => N() ? A(et, {
        name: "visible"
      }) : A(et, {
        name: "invisible"
      });
    })()), G.$$click = () => {
      e.onRemoveClick(bg);
    }, p(G, A(et, {
      name: "remove"
    })), U(() => Oe(Z, "class", V() === "mode" ? "rotate" : "")), R;
  })();
};
Ye(["click"]);
const L0 = /* @__PURE__ */ _('<li class="title"></li>'), w0 = /* @__PURE__ */ _('<li class="row"></li>'), _g = (e) => A(At, {
  get title() {
    return d("indicator", e.locale);
  },
  width: 400,
  get onClose() {
    return e.onClose;
  },
  get children() {
    return A(vn, {
      class: "klinecharts-pro-indicator-modal-list",
      get children() {
        return [(() => {
          const t = L0.cloneNode(!0);
          return p(t, () => d("main_indicator", e.locale)), t;
        })(), H(() => ["MA", "EMA", "SMA", "BOLL", "SAR", "BBI"].map((t) => {
          const r = e.mainIndicators.includes(t);
          return (() => {
            const n = w0.cloneNode(!0);
            return n.$$click = (s) => {
              e.onMainIndicatorChange({
                name: t,
                paneId: "candle_pane",
                added: !r
              });
            }, p(n, A(b0, {
              checked: r,
              get label() {
                return d(t.toLowerCase(), e.locale);
              }
            })), n;
          })();
        })), (() => {
          const t = L0.cloneNode(!0);
          return p(t, () => d("sub_indicator", e.locale)), t;
        })(), H(() => ["MA", "EMA", "VOL", "MACD", "BOLL", "KDJ", "RSI", "BIAS", "BRAR", "CCI", "DMI", "CR", "PSY", "DMA", "TRIX", "OBV", "VR", "WR", "MTM", "EMV", "SAR", "SMA", "ROC", "PVT", "BBI", "AO"].map((t) => {
          const r = t in e.subIndicators;
          return (() => {
            const n = w0.cloneNode(!0);
            return n.$$click = (s) => {
              e.onSubIndicatorChange({
                name: t,
                paneId: e.subIndicators[t] ?? "",
                added: !r
              });
            }, p(n, A(b0, {
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
function A0(e, t) {
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
function kg(e) {
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
const xg = (e) => {
  const [t, r] = M(e.timezone), n = H(() => kg(e.locale));
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
      return A(hr, {
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
          return d("Search Timezone", e.locale) || "Search timezone...";
        }
      });
    }
  });
};
function S0(e) {
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
const Lg = /* @__PURE__ */ _('<div class="chart-style-color-picker"><button type="button" class="chart-style-color-swatch"></button></div>'), wg = /* @__PURE__ */ _('<div class="chart-style-color-popover"><div class="chart-style-color-grid"></div></div>'), Ag = /* @__PURE__ */ _('<button type="button" class="chart-style-palette-color"></button>'), Sg = /* @__PURE__ */ _('<div class="chart-style-line-control"><div class="chart-style-width-picker"><button type="button" class="chart-style-size-button"><span></span></button></div></div>'), Tg = /* @__PURE__ */ _('<div class="chart-style-width-popover"></div>'), Mg = /* @__PURE__ */ _('<button type="button"><span></span></button>'), Pg = /* @__PURE__ */ _('<div class="klinecharts-pro-setting-modal-title-tabs"><button type="button"></button><button type="button">Chart Style</button></div>'), Dg = /* @__PURE__ */ _('<div class="klinecharts-pro-setting-modal-content"></div>'), Ng = /* @__PURE__ */ _('<div class="setting-item"><span class="setting-label"></span><div class="setting-control"></div></div>'), Og = /* @__PURE__ */ _('<div class="klinecharts-pro-chart-style-content"><div class="chart-style-sidebar"><button type="button">Symbol</button><button type="button">Background</button></div><div class="chart-style-panel"><p class="chart-style-note">* Chart Style takes precedence over default chart settings. Click Reset to align with the default theme.</p></div></div>'), Ig = /* @__PURE__ */ _("<h3>Symbol</h3>"), Eg = /* @__PURE__ */ _('<div class="chart-style-row"><span>Candle Stick</span><div class="chart-style-color-pair"></div></div>'), Bg = /* @__PURE__ */ _('<div class="chart-style-row"><span>Borders</span><div class="chart-style-color-pair"></div></div>'), Fg = /* @__PURE__ */ _('<div class="chart-style-row"><span>Wick</span><div class="chart-style-color-pair"></div></div>'), Ug = /* @__PURE__ */ _("<h3>Background</h3>"), zg = /* @__PURE__ */ _('<div class="chart-style-row"><span>Color</span></div>'), Vg = /* @__PURE__ */ _('<div class="chart-style-row"><label class="chart-style-check-row"><input type="checkbox"><span class="chart-style-check-box" aria-hidden="true"></span><span>Vert Grid Lines</span></label></div>'), Rg = /* @__PURE__ */ _('<div class="chart-style-row"><label class="chart-style-check-row"><input type="checkbox"><span class="chart-style-check-box" aria-hidden="true"></span><span>Horz Grid Lines</span></label></div>'), P1 = "chart.backgroundColor", bn = "#171a27", Kg = ["#f6465d", "#f59e0b", "#fcd535", "#2ebd85", "#4098a8", "#22c1dc", "#3861fb", "#7b3fe4", "#ec8aa4", "#f7c56b", "#fff0a3", "#9ed4a4", "#83c7bb", "#8bdce6", "#8bb9f7", "#b7a1dc", "#c9343e", "#e76f20", "#f0b93a", "#3f8d3a", "#236e5a", "#237c88", "#1d3fbf", "#3a209f", "#ffffff", "#cbd5e1", "#9ca3af", "#6b7280", "#374151", "#111827", "#000000"], jg = [{
  key: Ve.Solid,
  text: "Solid"
}, {
  key: Ve.Dashed,
  text: "Dashed"
}], Qg = [1, 2, 3, 4], T0 = [{
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
  key: P1,
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
}], bi = (e, t = bn) => {
  const r = D.clone(e), n = D.formatValue(r, "candle.bar.upColor"), s = D.formatValue(r, "candle.bar.downColor"), c = D.formatValue(r, "candle.bar.noChangeColor");
  return Ee(r, "candle.bar.upBorderColor", D.formatValue(r, "candle.bar.upBorderColor", n)), Ee(r, "candle.bar.downBorderColor", D.formatValue(r, "candle.bar.downBorderColor", s)), Ee(r, "candle.bar.noChangeBorderColor", D.formatValue(r, "candle.bar.noChangeBorderColor", c)), Ee(r, "candle.bar.upWickColor", D.formatValue(r, "candle.bar.upWickColor", n)), Ee(r, "candle.bar.downWickColor", D.formatValue(r, "candle.bar.downWickColor", s)), Ee(r, "candle.bar.noChangeWickColor", D.formatValue(r, "candle.bar.noChangeWickColor", c)), Ee(r, "candle.bar.borderUpColor", D.formatValue(r, "candle.bar.borderUpColor", D.formatValue(r, "candle.bar.upBorderColor"))), Ee(r, "candle.bar.borderDownColor", D.formatValue(r, "candle.bar.borderDownColor", D.formatValue(r, "candle.bar.downBorderColor"))), Ee(r, "candle.bar.borderNoChangeColor", D.formatValue(r, "candle.bar.borderNoChangeColor", D.formatValue(r, "candle.bar.noChangeBorderColor"))), Ee(r, "candle.bar.wickUpColor", D.formatValue(r, "candle.bar.wickUpColor", D.formatValue(r, "candle.bar.upWickColor"))), Ee(r, "candle.bar.wickDownColor", D.formatValue(r, "candle.bar.wickDownColor", D.formatValue(r, "candle.bar.downWickColor"))), Ee(r, "candle.bar.wickNoChangeColor", D.formatValue(r, "candle.bar.wickNoChangeColor", D.formatValue(r, "candle.bar.noChangeWickColor"))), Ee(r, P1, t), r;
}, Zg = (e, t, r) => {
  if (t === P1)
    return r ?? bn;
  const s = {
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
  return s ? D.formatValue(e, s) : D.formatValue(e, t, D.formatValue(bi(e), t));
}, Hg = (e) => {
  const [t, r] = M(e.currentStyles), [n, s] = M(bi(e.currentStyles, e.currentBackgroundColor ?? bn)), [c, f] = M(S0(e.locale)), [m, v] = M(!1), [L, $] = M("settings"), [w, E] = M("symbol"), [Q, re] = M(null), [I, K] = M(null), z = () => {
    v(window.innerWidth <= 768);
  };
  Cr(() => {
    const S = (j) => {
      const Z = j.target;
      Z instanceof Element && (Z.closest(".chart-style-color-picker") || Z.closest(".chart-style-width-picker") || Z.closest(".klinecharts-pro-select") || (re(null), K(null)));
    };
    z(), window.addEventListener("resize", z), document.addEventListener("mousedown", S), Lt(() => {
      document.removeEventListener("mousedown", S);
    });
  }), Lt(() => {
    window.removeEventListener("resize", z);
  }), He(() => {
    f(S0(e.locale));
  });
  const ce = (S, j) => {
    const Z = {};
    Ee(Z, S.key, j);
    const F = D.clone(t());
    Ee(F, S.key, j), r(F), f(c().map((ie) => ({
      ...ie
    }))), e.onChange(Z);
  }, V = (S, j) => D.formatValue(n(), S, j), oe = (S, j) => {
    const Z = D.clone(n());
    Ee(Z, S, j), s(Z), e.onChange(Y(Z));
  }, Y = (S) => {
    const j = D.formatValue(S, "candle.bar.upColor"), Z = D.formatValue(S, "candle.bar.downColor"), F = D.formatValue(S, "candle.bar.noChangeColor"), ie = D.formatValue(S, "candle.bar.upBorderColor", j), le = D.formatValue(S, "candle.bar.downBorderColor", Z), ee = D.formatValue(S, "candle.bar.noChangeBorderColor", F), B = D.formatValue(S, "candle.bar.upWickColor", j), ne = D.formatValue(S, "candle.bar.downWickColor", Z), G = D.formatValue(S, "candle.bar.noChangeWickColor", F);
    return {
      chart: {
        backgroundColor: D.formatValue(S, P1, bn)
      },
      candle: {
        type: D.formatValue(S, "candle.type"),
        bar: {
          upColor: j,
          downColor: Z,
          noChangeColor: F,
          upBorderColor: ie,
          downBorderColor: le,
          noChangeBorderColor: ee,
          upWickColor: B,
          downWickColor: ne,
          noChangeWickColor: G,
          borderUpColor: ie,
          borderDownColor: le,
          borderNoChangeColor: ee,
          wickUpColor: B,
          wickDownColor: ne,
          wickNoChangeColor: G
        }
      },
      grid: {
        horizontal: {
          show: !!D.formatValue(S, "grid.horizontal.show"),
          color: D.formatValue(S, "grid.horizontal.color"),
          style: D.formatValue(S, "grid.horizontal.style"),
          size: Number(D.formatValue(S, "grid.horizontal.size", 1)),
          dashedValue: D.formatValue(S, "grid.horizontal.dashedValue", [2, 2])
        },
        vertical: {
          show: !!D.formatValue(S, "grid.vertical.show"),
          color: D.formatValue(S, "grid.vertical.color"),
          style: D.formatValue(S, "grid.vertical.style"),
          size: Number(D.formatValue(S, "grid.vertical.size", 1)),
          dashedValue: D.formatValue(S, "grid.vertical.dashedValue", [2, 2])
        }
      }
    };
  }, ve = () => {
    var j;
    const S = Y(n());
    r(D.clone(n())), e.onChange(S), (j = e.onSaveChartStyle) == null || j.call(e, S), e.onClose();
  }, W = () => {
    var j;
    (j = e.onResetChartStyle) == null || j.call(e);
    const S = e.defaultStyles;
    if (S) {
      const Z = D.clone(n());
      T0.forEach((F) => {
        Ee(Z, F.key, Zg(S, F.key, e.defaultBackgroundColor));
      }), s(Z), r(D.clone(Z)), e.onChange(Y(Z));
    } else
      e.onRestoreDefault(T0), s(D.clone(e.currentStyles));
  }, R = (S, j = S) => {
    const Z = V(S, "#ffffff");
    return (() => {
      const F = Lg.cloneNode(!0), ie = F.firstChild;
      return ie.$$click = () => {
        re(Q() === j ? null : j);
      }, ie.style.setProperty("background", Z), p(F, (() => {
        const le = H(() => Q() === j);
        return () => le() && (() => {
          const ee = wg.cloneNode(!0), B = ee.firstChild;
          return p(B, A(M1, {
            each: Kg,
            children: (ne) => (() => {
              const G = Ag.cloneNode(!0);
              return G.$$click = () => {
                oe(S, ne), re(null);
              }, G.style.setProperty("background", ne), U(() => G.classList.toggle("selected", ne.toLowerCase() === Z.toLowerCase())), G;
            })()
          })), ee;
        })();
      })(), null), F;
    })();
  }, J = (S) => {
    const j = `${S}.style`, Z = `${S}.color`, F = `${S}.size`, ie = V(j, Ve.Dashed), le = Math.max(1, Number(V(F, 1)));
    return (() => {
      const ee = Sg.cloneNode(!0), B = ee.firstChild, ne = B.firstChild, G = ne.firstChild;
      return p(ee, A(hr, {
        get style() {
          return {
            width: m() ? "100%" : "134px"
          };
        },
        get value() {
          return ie === Ve.Solid ? "Solid" : "Dashed";
        },
        dataSource: jg,
        onSelected: (N) => {
          const O = N.key;
          oe(j, O), oe(`${S}.dashedValue`, O === Ve.Solid ? [] : [2, 2]);
        }
      }), B), ne.$$click = () => {
        K(I() === F ? null : F);
      }, G.style.setProperty("height", `${le}px`), p(B, (() => {
        const N = H(() => I() === F);
        return () => N() && (() => {
          const O = Tg.cloneNode(!0);
          return p(O, A(M1, {
            each: Qg,
            children: (pe) => (() => {
              const $e = Mg.cloneNode(!0), ge = $e.firstChild;
              return $e.$$click = () => {
                oe(F, pe), K(null);
              }, $e.classList.toggle("selected", le === pe), ge.style.setProperty("height", `${pe}px`), $e;
            })()
          })), O;
        })();
      })(), null), p(ee, () => R(Z), null), ee;
    })();
  }, ue = (() => {
    const S = Pg.cloneNode(!0), j = S.firstChild, Z = j.nextSibling;
    return j.$$click = () => $("settings"), p(j, () => d("setting", e.locale)), Z.$$click = () => $("chartStyle"), U((F) => {
      const ie = L() === "settings", le = L() === "chartStyle";
      return ie !== F._v$ && j.classList.toggle("active", F._v$ = ie), le !== F._v$2 && Z.classList.toggle("active", F._v$2 = le), F;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), S;
  })();
  return A(At, {
    title: ue,
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
      return m();
    },
    get buttons() {
      return H(() => L() === "settings")() ? [{
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
      return H(() => L() === "settings")() ? (() => {
        const S = Dg.cloneNode(!0);
        return p(S, A(M1, {
          get each() {
            return c();
          },
          children: (j) => {
            let Z;
            const F = D.formatValue(t(), j.key);
            switch (j.component) {
              case "select": {
                const ie = j.key === "candle.type" ? "170px" : "120px";
                Z = A(hr, {
                  get style() {
                    return {
                      width: m() ? "100%" : ie,
                      "min-width": m() ? "auto" : ie
                    };
                  },
                  get value() {
                    return d(F, e.locale);
                  },
                  get dataSource() {
                    return j.dataSource;
                  },
                  onSelected: (le) => {
                    const ee = le.key;
                    ce(j, ee);
                  }
                });
                break;
              }
              case "switch": {
                const ie = !!F;
                Z = A(pi, {
                  open: ie,
                  onChange: () => {
                    ce(j, !ie);
                  }
                });
                break;
              }
            }
            return (() => {
              const ie = Ng.cloneNode(!0), le = ie.firstChild, ee = le.nextSibling;
              return p(le, () => j.text), p(ee, Z), U(() => ie.classList.toggle("mobile-item", !!m())), ie;
            })();
          }
        })), U(() => S.classList.toggle("mobile-layout", !!m())), S;
      })() : (() => {
        const S = Og.cloneNode(!0), j = S.firstChild, Z = j.firstChild, F = Z.nextSibling, ie = j.nextSibling, le = ie.firstChild;
        return Z.$$click = () => E("symbol"), F.$$click = () => E("background"), p(ie, (() => {
          const ee = H(() => w() === "symbol");
          return () => ee() ? [Ig.cloneNode(!0), (() => {
            const B = Eg.cloneNode(!0), ne = B.firstChild, G = ne.nextSibling;
            return p(G, () => R("candle.bar.upColor", "candle-stick-up"), null), p(G, () => R("candle.bar.downColor", "candle-stick-down"), null), B;
          })(), (() => {
            const B = Bg.cloneNode(!0), ne = B.firstChild, G = ne.nextSibling;
            return p(G, () => R("candle.bar.upBorderColor", "border-up"), null), p(G, () => R("candle.bar.downBorderColor", "border-down"), null), B;
          })(), (() => {
            const B = Fg.cloneNode(!0), ne = B.firstChild, G = ne.nextSibling;
            return p(G, () => R("candle.bar.upWickColor", "wick-up"), null), p(G, () => R("candle.bar.downWickColor", "wick-down"), null), B;
          })()] : [Ug.cloneNode(!0), (() => {
            const B = zg.cloneNode(!0);
            return B.firstChild, p(B, () => R(P1, "chart-background"), null), B;
          })(), (() => {
            const B = Vg.cloneNode(!0), ne = B.firstChild, G = ne.firstChild;
            return G.addEventListener("change", (N) => oe("grid.vertical.show", N.currentTarget.checked)), p(B, () => J("grid.vertical"), null), U(() => G.checked = !!V("grid.vertical.show")), B;
          })(), (() => {
            const B = Rg.cloneNode(!0), ne = B.firstChild, G = ne.firstChild;
            return G.addEventListener("change", (N) => oe("grid.horizontal.show", N.currentTarget.checked)), p(B, () => J("grid.horizontal"), null), U(() => G.checked = !!V("grid.horizontal.show")), B;
          })()];
        })(), le), U((ee) => {
          const B = !!m(), ne = w() === "symbol", G = w() === "background";
          return B !== ee._v$3 && S.classList.toggle("mobile-layout", ee._v$3 = B), ne !== ee._v$4 && Z.classList.toggle("active", ee._v$4 = ne), G !== ee._v$5 && F.classList.toggle("active", ee._v$5 = G), ee;
        }, {
          _v$3: void 0,
          _v$4: void 0,
          _v$5: void 0
        }), S;
      })();
    }
  });
};
Ye(["click"]);
const Yg = /* @__PURE__ */ _('<img style="width:500px;margin-top: 20px">'), Wg = (e) => A(At, {
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
    const t = Yg.cloneNode(!0);
    return U(() => Oe(t, "src", e.url)), t;
  }
}), qg = {
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
}, Gg = /* @__PURE__ */ _('<div class="klinecharts-pro-indicator-setting-modal-content"></div>'), Xg = /* @__PURE__ */ _("<span></span>"), Jg = (e) => {
  const [t, r] = M(D.clone(e.params.calcParams)), n = (s) => qg[s];
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
          const s = n(e.params.indicatorName), c = [];
          D.clone(t()).forEach((f, m) => {
            !D.isValid(f) || f === "" ? "default" in s[m] && c.push(s[m].default) : c.push(f);
          }), e.onConfirm(c), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      const s = Gg.cloneNode(!0);
      return p(s, () => n(e.params.indicatorName).map((c, f) => [(() => {
        const m = Xg.cloneNode(!0);
        return p(m, () => d(c.paramNameKey, e.locale)), m;
      })(), A(Ci, {
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
        onChange: (m) => {
          const v = D.clone(t());
          v[f] = m, r(v);
        }
      })])), s;
    }
  });
}, ey = /* @__PURE__ */ _('<svg viewBox="0 0 1024 1024"><path d="M945.066667 898.133333l-189.866667-189.866666c55.466667-64 87.466667-149.333333 87.466667-241.066667 0-204.8-168.533333-373.333333-373.333334-373.333333S96 264.533333 96 469.333333 264.533333 842.666667 469.333333 842.666667c91.733333 0 174.933333-34.133333 241.066667-87.466667l189.866667 189.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c8.533333-12.8 8.533333-34.133333-2.133333-46.933334zM469.333333 778.666667C298.666667 778.666667 160 640 160 469.333333S298.666667 160 469.333333 160 778.666667 298.666667 778.666667 469.333333 640 778.666667 469.333333 778.666667z"></path></svg>'), ty = /* @__PURE__ */ _('<img alt="symbol">'), ny = /* @__PURE__ */ _("<li><div><span></span></div></li>"), ry = (e) => {
  const [t, r] = M(""), [n] = Ka(t, e.datafeed.searchSymbols.bind(e.datafeed));
  return A(At, {
    get title() {
      return d("symbol_search", e.locale);
    },
    width: 460,
    get onClose() {
      return e.onClose;
    },
    get children() {
      return [A(Ci, {
        class: "klinecharts-pro-symbol-search-modal-input",
        get placeholder() {
          return d("symbol_code", e.locale);
        },
        get suffix() {
          return ey.cloneNode(!0);
        },
        get value() {
          return t();
        },
        onChange: (s) => {
          const c = `${s}`;
          r(c);
        }
      }), A(vn, {
        class: "klinecharts-pro-symbol-search-modal-list",
        get loading() {
          return n.loading;
        },
        get dataSource() {
          return n() ?? [];
        },
        renderItem: (s) => (() => {
          const c = ny.cloneNode(!0), f = c.firstChild, m = f.firstChild;
          return c.$$click = () => {
            e.onSymbolSelected(s), e.onClose();
          }, p(f, A(he, {
            get when() {
              return s.logo;
            },
            get children() {
              const v = ty.cloneNode(!0);
              return U(() => Oe(v, "src", s.logo)), v;
            }
          }), m), p(m, () => s.shortName ?? s.ticker, null), p(m, () => `${s.name ? `(${s.name})` : ""}`, null), p(c, () => s.exchange ?? "", null), U(() => Oe(m, "title", s.name ?? "")), c;
        })()
      })];
    }
  });
};
Ye(["click"]);
const oy = /* @__PURE__ */ _('<div class="klinecharts-pro-mobile-more-modal-content"><div class="item"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div><div class="item"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path></svg><span></span></div><div class="item"><svg viewBox="0 0 20 20"><rect x="3" y="4" width="14" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"></rect><path d="M6 2.5v4M14 2.5v4M3 8h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M10 11v3l2.2 1.3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg><span>Time Tools</span></div><div class="item"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg><span></span></div></div>'), iy = (e) => A(At, {
  get title() {
    return d("more", e.locale);
  },
  isMobile: !0,
  get onClose() {
    return e.onClose;
  },
  get children() {
    const t = oy.cloneNode(!0), r = t.firstChild, n = r.firstChild, s = n.nextSibling, c = r.nextSibling, f = c.firstChild, m = f.nextSibling, v = c.nextSibling, L = v.nextSibling, $ = L.firstChild, w = $.nextSibling;
    return r.$$click = () => {
      e.onIndicatorClick(), e.onClose();
    }, p(s, () => d("indicator", e.locale)), c.$$click = () => {
      e.onTimezoneClick(), e.onClose();
    }, p(m, () => d("timezone", e.locale)), v.$$click = () => {
      e.onTimeToolsClick(), e.onClose();
    }, L.$$click = () => {
      e.onSettingClick(), e.onClose();
    }, p(w, () => d("setting", e.locale)), t;
  }
});
Ye(["click"]);
const ay = /* @__PURE__ */ _('<div class="klinecharts-pro-time-tools-picker"></div>'), sy = /* @__PURE__ */ _('<label class="klinecharts-pro-time-tools-field"><button type="button" class="klinecharts-pro-time-tools-input"><span></span><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M8 3v4M16 3v4M4 10h16"></path></svg></button></label>'), ly = /* @__PURE__ */ _("<span></span>"), cy = /* @__PURE__ */ _('<div class="klinecharts-pro-time-tools-calendar"><div class="klinecharts-pro-time-tools-month"><button type="button">&lt;&lt;</button><button type="button">&lt;</button><button type="button" class="calendar-title"></button><button type="button">></button><button type="button">>></button></div></div>'), uy = /* @__PURE__ */ _('<div class="klinecharts-pro-time-tools-grid"></div>'), dy = /* @__PURE__ */ _('<span class="weekday"></span>'), Ft = /* @__PURE__ */ _('<button type="button"></button>'), hy = /* @__PURE__ */ _('<div class="klinecharts-pro-time-tools-month-grid"></div>'), fy = /* @__PURE__ */ _('<div class="klinecharts-pro-time-tools-month-grid year-grid"></div>'), my = /* @__PURE__ */ _('<div class="klinecharts-pro-time-tools-spinners"><div class="spinner-column scrollable"></div><div class="spinner-column scrollable"></div><div class="spinner-column"></div></div>'), gy = /* @__PURE__ */ _('<div class="klinecharts-pro-time-tools-content"></div>'), yy = /* @__PURE__ */ _('<div class="klinecharts-pro-time-tools-tabs"></div>'), Cy = /* @__PURE__ */ _('<div class="klinecharts-pro-time-tools-range-panel"><div class="klinecharts-pro-time-tools-range-header"><button type="button"></button><span class="klinecharts-pro-time-tools-range-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg></span><button type="button"></button><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M8 3v4M16 3v4M4 10h16"></path></svg></div></div>'), py = /* @__PURE__ */ _('<div class="klinecharts-pro-time-tools-panel"><div class="klinecharts-pro-time-tools-row"><div><strong>Time Anchor</strong><span>Anchor to a time on the chart when switching between intervals</span></div><button type="button"><span></span></button></div><div><div><strong>Anchor Point</strong></div><select><option value="date">Date</option><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option></select></div><div><div><strong>Anchor line</strong><span>Mark the anchored time on the chart with a vertical line</span></div><button type="button"><span></span></button></div><div><div><strong>Across Tokens</strong><span>Retain onscreen chart range when switching symbols</span></div><button type="button"><span></span></button></div></div>'), vy = /* @__PURE__ */ _('<div class="klinecharts-pro-time-tools-anchor-date"></div>'), by = [{
  key: "goToDate",
  label: "Go to Date"
}, {
  key: "timeRange",
  label: "Time Range"
}, {
  key: "timeAnchor",
  label: "Time Anchor"
}], $y = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], M0 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], e1 = (e) => String(e).padStart(2, "0"), P0 = (e, t, r) => Math.min(r, new Date(e, t + 1, 0).getDate()), er = (e) => {
  const t = new Date(e);
  return {
    year: t.getFullYear(),
    month: t.getMonth(),
    day: t.getDate(),
    hour: t.getHours(),
    minute: t.getMinutes()
  };
}, on = (e) => new Date(e.year, e.month, e.day, e.hour, e.minute, 0, 0).getTime(), tr = (e) => e.year * 1e4 + (e.month + 1) * 100 + e.day, mr = (e) => {
  const t = e.hour >= 12 ? "PM" : "AM", r = e.hour % 12 || 12;
  return `${e1(e.month + 1)}/${e1(e.day)}/${e.year} ${e1(r)}:${e1(e.minute)} ${t}`;
}, _y = (e, t) => {
  const r = new Date(e, t, 1).getDay(), n = new Date(e, t + 1, 0).getDate(), s = new Date(e, t, 0).getDate(), c = [];
  for (let f = r - 1; f >= 0; f -= 1)
    c.push({
      date: new Date(e, t - 1, s - f),
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
}, an = (e) => {
  const [t, r] = M(!0), [n, s] = M("date"), [c, f] = M(e.value.year), [m, v] = M(e.value.month), L = H(() => _y(c(), m())), $ = H(() => Math.floor(c() / 10) * 10), w = H(() => Array.from({
    length: 12
  }, (W, R) => $() - 1 + R)), E = H(() => e.value.hour % 12 || 12), Q = H(() => e.value.hour >= 12 ? "PM" : "AM"), re = Array.from({
    length: 12
  }, (W, R) => R + 1), I = Array.from({
    length: 60
  }, (W, R) => R), K = (W) => {
    const R = new Date(c(), m() + W, 1);
    f(R.getFullYear()), v(R.getMonth());
  }, z = () => {
    n() === "date" ? s("month") : n() === "month" && s("year");
  }, ce = (W) => {
    var R;
    e.onChange({
      ...e.value,
      year: W.getFullYear(),
      month: W.getMonth(),
      day: W.getDate()
    }), (R = e.onDateSelect) == null || R.call(e), f(W.getFullYear()), v(W.getMonth());
  }, V = (W) => {
    v(W), e.onChange({
      ...e.value,
      year: c(),
      month: W,
      day: P0(c(), W, e.value.day)
    }), s("date");
  }, oe = (W) => {
    f(W), e.onChange({
      ...e.value,
      year: W,
      day: P0(W, e.value.month, e.value.day)
    }), s("month");
  }, Y = (W) => {
    const R = Q() === "PM";
    e.onChange({
      ...e.value,
      hour: R ? W === 12 ? 12 : W + 12 : W === 12 ? 0 : W
    });
  }, ve = (W) => {
    const R = E();
    e.onChange({
      ...e.value,
      hour: W === "PM" ? R === 12 ? 12 : R + 12 : R === 12 ? 0 : R
    });
  };
  return (() => {
    const W = ay.cloneNode(!0);
    return p(W, (() => {
      const R = H(() => e.showInput !== !1);
      return () => R() && (() => {
        const J = sy.cloneNode(!0), ue = J.firstChild, S = ue.firstChild;
        return p(J, (() => {
          const j = H(() => !!e.label);
          return () => j() && (() => {
            const Z = ly.cloneNode(!0);
            return p(Z, () => e.label), Z;
          })();
        })(), ue), ue.$$click = () => r(!t()), p(S, () => mr(e.value)), J;
      })();
    })(), null), p(W, (() => {
      const R = H(() => !!t());
      return () => R() && (() => {
        const J = cy.cloneNode(!0), ue = J.firstChild, S = ue.firstChild, j = S.nextSibling, Z = j.nextSibling, F = Z.nextSibling, ie = F.nextSibling;
        return S.$$click = () => {
          n() === "year" ? f(c() - 10) : n() === "month" ? f(c() - 1) : K(-12);
        }, j.$$click = () => {
          n() === "year" ? f(c() - 10) : n() === "month" ? f(c() - 1) : K(-1);
        }, Z.$$click = z, p(Z, (() => {
          const le = H(() => n() === "year");
          return () => le() ? `${$()}-${$() + 9}` : (() => {
            const ee = H(() => n() === "month");
            return () => ee() ? c() : `${M0[m()]} ${c()}`;
          })();
        })()), F.$$click = () => {
          n() === "year" ? f(c() + 10) : n() === "month" ? f(c() + 1) : K(1);
        }, ie.$$click = () => {
          n() === "year" ? f(c() + 10) : n() === "month" ? f(c() + 1) : K(12);
        }, p(J, (() => {
          const le = H(() => n() === "date");
          return () => le() && (() => {
            const ee = uy.cloneNode(!0);
            return p(ee, () => $y.map((B) => (() => {
              const ne = dy.cloneNode(!0);
              return p(ne, B), ne;
            })()), null), p(ee, () => L().map(({
              date: B,
              current: ne
            }) => {
              const G = tr({
                year: B.getFullYear(),
                month: B.getMonth(),
                day: B.getDate()
              }), N = e.range ? tr(e.range.from) : NaN, O = e.range ? tr(e.range.to) : NaN, pe = Math.min(N, O), $e = Math.max(N, O), ge = Number.isFinite(pe) && G >= pe && G <= $e, je = Number.isFinite(pe) && (G === pe || G === $e), x = B.getFullYear() === e.value.year && B.getMonth() === e.value.month && B.getDate() === e.value.day;
              return (() => {
                const ye = Ft.cloneNode(!0);
                return ye.$$click = () => ce(B), me(ye, `${ne ? "" : "muted"} ${ge ? "in-range" : ""} ${je || x ? "selected" : ""}`), p(ye, () => B.getDate()), ye;
              })();
            }), null), ee;
          })();
        })(), null), p(J, (() => {
          const le = H(() => n() === "month");
          return () => le() && (() => {
            const ee = hy.cloneNode(!0);
            return p(ee, () => M0.map((B, ne) => (() => {
              const G = Ft.cloneNode(!0);
              return G.$$click = () => V(ne), p(G, B), U(() => me(G, ne === e.value.month && c() === e.value.year ? "selected" : "")), G;
            })())), ee;
          })();
        })(), null), p(J, (() => {
          const le = H(() => n() === "year");
          return () => le() && (() => {
            const ee = fy.cloneNode(!0);
            return p(ee, () => w().map((B) => (() => {
              const ne = Ft.cloneNode(!0);
              return ne.$$click = () => oe(B), p(ne, B), U(() => me(ne, `${B < $() || B > $() + 9 ? "muted" : ""} ${B === e.value.year ? "selected" : ""}`)), ne;
            })())), ee;
          })();
        })(), null), p(J, (() => {
          const le = H(() => n() === "date");
          return () => le() && (() => {
            const ee = my.cloneNode(!0), B = ee.firstChild, ne = B.nextSibling, G = ne.nextSibling;
            return p(B, () => re.map((N) => (() => {
              const O = Ft.cloneNode(!0);
              return O.$$click = () => Y(N), p(O, () => e1(N)), U(() => me(O, N === E() ? "selected" : "")), O;
            })())), p(ne, () => I.map((N) => (() => {
              const O = Ft.cloneNode(!0);
              return O.$$click = () => e.onChange({
                ...e.value,
                minute: N
              }), p(O, () => e1(N)), U(() => me(O, N === e.value.minute ? "selected" : "")), O;
            })())), p(G, () => ["AM", "PM"].map((N) => (() => {
              const O = Ft.cloneNode(!0);
              return O.$$click = () => ve(N), p(O, N), U(() => me(O, N === Q() ? "selected" : "")), O;
            })())), ee;
          })();
        })(), null), J;
      })();
    })(), null), W;
  })();
}, ky = (e) => {
  const [t, r] = M(e.initialTab ?? "goToDate"), [n, s] = M(er(e.initialTimestamp)), [c, f] = M(er(e.initialRange.from)), [m, v] = M(er(e.initialRange.to)), [L, $] = M("from"), [w, E] = M({
    ...e.anchorSettings,
    anchorLine: e.anchorSettings.anchorLine ?? !0,
    acrossTokens: e.anchorSettings.acrossTokens ?? !0
  }), Q = (I) => {
    E((K) => ({
      ...K,
      ...I
    }));
  }, re = () => {
    const I = t();
    if (I === "goToDate")
      e.onGoToDate(on(n()));
    else if (I === "timeRange") {
      const K = on(c()), z = on(m());
      e.onTimeRange(K <= z ? {
        from: K,
        to: z
      } : {
        from: z,
        to: K
      });
    } else {
      const K = w();
      e.onTimeAnchorChange({
        ...K,
        timestamp: K.anchorPoint === "date" ? on(n()) : K.timestamp
      });
    }
    e.onClose();
  };
  return A(At, {
    width: 520,
    get title() {
      return (() => {
        const I = yy.cloneNode(!0);
        return p(I, () => by.map((K) => (() => {
          const z = Ft.cloneNode(!0);
          return z.$$click = () => r(K.key), p(z, () => K.label), U(() => me(z, t() === K.key ? "active" : "")), z;
        })())), I;
      })();
    },
    get buttons() {
      return [{
        children: "Close",
        type: "cancel",
        onClick: e.onClose
      }, {
        children: "Confirm",
        onClick: re
      }];
    },
    get onClose() {
      return e.onClose;
    },
    minButtonWidth: 112,
    get children() {
      const I = gy.cloneNode(!0);
      return p(I, (() => {
        const K = H(() => t() === "goToDate");
        return () => K() && A(an, {
          label: "",
          get value() {
            return n();
          },
          onChange: s
        });
      })(), null), p(I, (() => {
        const K = H(() => t() === "timeRange");
        return () => K() && (() => {
          const z = Cy.cloneNode(!0), ce = z.firstChild, V = ce.firstChild, oe = V.nextSibling, Y = oe.nextSibling;
          return V.$$click = () => $("from"), p(V, () => mr(c())), Y.$$click = () => $("to"), p(Y, () => mr(m())), p(z, (() => {
            const ve = H(() => L() === "from");
            return () => ve() ? A(an, {
              label: "Start",
              get value() {
                return c();
              },
              onChange: f,
              onDateSelect: () => $("to"),
              showInput: !1,
              get range() {
                return {
                  from: c(),
                  to: m()
                };
              }
            }) : A(an, {
              label: "End",
              get value() {
                return m();
              },
              onChange: v,
              showInput: !1,
              get range() {
                return {
                  from: c(),
                  to: m()
                };
              }
            });
          })(), null), U((ve) => {
            const W = L() === "from" ? "active" : "", R = L() === "to" ? "active" : "";
            return W !== ve._v$ && me(V, ve._v$ = W), R !== ve._v$2 && me(Y, ve._v$2 = R), ve;
          }, {
            _v$: void 0,
            _v$2: void 0
          }), z;
        })();
      })(), null), p(I, (() => {
        const K = H(() => t() === "timeAnchor");
        return () => K() && (() => {
          const z = py.cloneNode(!0), ce = z.firstChild, V = ce.firstChild, oe = V.nextSibling, Y = ce.nextSibling, ve = Y.firstChild, W = ve.nextSibling, R = Y.nextSibling, J = R.firstChild, ue = J.nextSibling, S = R.nextSibling, j = S.firstChild, Z = j.nextSibling;
          return oe.$$click = () => Q({
            enabled: !w().enabled
          }), W.addEventListener("change", (F) => Q({
            anchorPoint: F.currentTarget.value
          })), p(z, (() => {
            const F = H(() => !!(w().enabled && w().anchorPoint === "date"));
            return () => F() && (() => {
              const ie = vy.cloneNode(!0);
              return p(ie, A(an, {
                label: "Anchor date",
                get value() {
                  return n();
                },
                onChange: s
              })), ie;
            })();
          })(), R), ue.$$click = () => Q({
            anchorLine: !w().anchorLine
          }), Z.$$click = () => Q({
            acrossTokens: !w().acrossTokens
          }), U((F) => {
            const ie = `klinecharts-pro-time-tools-switch${w().enabled ? " on" : ""}`, le = `klinecharts-pro-time-tools-row${w().enabled ? "" : " disabled"}`, ee = !w().enabled, B = `klinecharts-pro-time-tools-row with-divider${w().enabled ? "" : " disabled"}`, ne = `klinecharts-pro-time-tools-switch${w().anchorLine ? " on" : ""}`, G = !w().enabled, N = `klinecharts-pro-time-tools-row with-divider${w().enabled ? "" : " disabled"}`, O = `klinecharts-pro-time-tools-switch${w().acrossTokens ? " on" : ""}`, pe = !w().enabled;
            return ie !== F._v$3 && me(oe, F._v$3 = ie), le !== F._v$4 && me(Y, F._v$4 = le), ee !== F._v$5 && (W.disabled = F._v$5 = ee), B !== F._v$6 && me(R, F._v$6 = B), ne !== F._v$7 && me(ue, F._v$7 = ne), G !== F._v$8 && (ue.disabled = F._v$8 = G), N !== F._v$9 && me(S, F._v$9 = N), O !== F._v$10 && me(Z, F._v$10 = O), pe !== F._v$11 && (Z.disabled = F._v$11 = pe), F;
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
          }), U(() => W.value = w().anchorPoint), z;
        })();
      })(), null), I;
    }
  });
};
Ye(["click"]);
const xy = 0.08, Ly = 5e-3;
function un(e) {
  if (typeof e == "number")
    return Number.isFinite(e) ? e : null;
  if (typeof e == "string" && e.trim() !== "") {
    const t = Number(e);
    return Number.isFinite(t) ? t : null;
  }
  return null;
}
function $n(e, t) {
  const r = un(e);
  if (r != null) {
    t.push(r);
    return;
  }
  if (Array.isArray(e)) {
    e.forEach((n) => $n(n, t));
    return;
  }
  e && typeof e == "object" && Object.values(e).forEach((n) => {
    $n(n, t);
  });
}
function wy(e, t, r) {
  const n = t - e;
  if (Number.isFinite(n) && n > 0)
    return n * r;
  const s = Math.max(Math.abs(e), Math.abs(t), 1);
  return Math.max(s * Ly, Number.EPSILON);
}
function Ay({
  visibleCandles: e = [],
  visibleIndicators: t = [],
  visiblePriceLines: r = [],
  latestPrice: n,
  paddingPercent: s = xy
}) {
  const c = [];
  e.forEach((w) => {
    const E = un(w.high), Q = un(w.low);
    E != null && c.push(E), Q != null && c.push(Q);
  }), t.forEach((w) => {
    $n(w, c);
  }), r.forEach((w) => {
    $n(w, c);
  });
  const f = un(n);
  if (f != null && c.push(f), c.length === 0)
    return null;
  let m = Number.POSITIVE_INFINITY, v = Number.NEGATIVE_INFINITY;
  if (c.forEach((w) => {
    m = Math.min(m, w), v = Math.max(v, w);
  }), !Number.isFinite(m) || !Number.isFinite(v))
    return null;
  const L = Math.min(Math.max(s, 0), 0.25), $ = wy(m, v, L);
  return {
    minPrice: m - $,
    maxPrice: v + $
  };
}
const Sy = /* @__PURE__ */ _('<i class="icon-close klinecharts-pro-load-icon"></i>'), Ty = /* @__PURE__ */ _('<div class="klinecharts-pro-content"><button type="button">auto</button><div class="klinecharts-pro-widget"></div></div>'), My = /* @__PURE__ */ _('<div class="klinecharts-pro-time-anchor-line"></div>'), Py = /* @__PURE__ */ _('<div class="klinecharts-pro-time-navigation-tooltip"></div>'), Dy = /* @__PURE__ */ _('<div class="klinecharts-pro-countdown-price-mark"><span class="klinecharts-pro-countdown-price-mark-price"></span><span class="klinecharts-pro-countdown-price-mark-timer"></span></div>'), Ny = /* @__PURE__ */ _('<div class="overlay-toolbar-color-popover"><div class="overlay-toolbar-color-grid"></div><div class="overlay-toolbar-color-footer"><button type="button" class="overlay-toolbar-add-color">+</button><div class="overlay-toolbar-color-slider"><span></span></div></div></div>'), Oy = /* @__PURE__ */ _('<div class="overlay-toolbar-dropdown width-menu"></div>'), Iy = /* @__PURE__ */ _('<div class="overlay-toolbar-dropdown style-menu"><button type="button"><span class="overlay-toolbar-style-sample solid"></span></button><button type="button"><span class="overlay-toolbar-style-sample dashed"></span></button><button type="button"><span class="overlay-toolbar-style-sample dotted"></span></button></div>'), Ey = /* @__PURE__ */ _('<div class="klinecharts-pro-overlay-toolbar"><button type="button" class="overlay-toolbar-icon drag" title="Move"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="6" r="1.5"></circle><circle cx="15" cy="6" r="1.5"></circle><circle cx="9" cy="12" r="1.5"></circle><circle cx="15" cy="12" r="1.5"></circle><circle cx="9" cy="18" r="1.5"></circle><circle cx="15" cy="18" r="1.5"></circle></svg></button><button type="button" class="overlay-toolbar-icon refresh" title="Reset"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 15.4-6.36L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-15.4 6.36L3 16"></path><path d="M3 21v-5h5"></path></svg></button><div class="overlay-toolbar-picker"><button type="button" title="Color"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg></button></div><div class="overlay-toolbar-picker"><button type="button" title="Line width"><span class="overlay-toolbar-line-preview"></span><span>px</span></button></div><div class="overlay-toolbar-picker"><button type="button" title="Line style"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16"></path></svg></button></div><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2"></rect><path d="M20 4 4 20"></path></svg></button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg></button><button type="button" class="overlay-toolbar-icon delete" title="Delete"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6 18 20H6L5 6"></path><path d="M10 11v5"></path><path d="M14 11v5"></path></svg></button></div>'), By = /* @__PURE__ */ _('<button type="button"></button>'), Fy = /* @__PURE__ */ _('<button type="button"><span class="overlay-toolbar-width-sample"></span></button>'), Uy = /* @__PURE__ */ _('<div class="klinecharts-pro-quick-order-marker"><button type="button" class="klinecharts-pro-quick-order-plus"></button></div>'), zy = /* @__PURE__ */ _('<span class="klinecharts-pro-quick-order-plus-icon"></span>'), Vy = /* @__PURE__ */ _('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" aria-hidden="true"><path d="M460-300h40v-160h160v-40H500v-160h-40v160H300v40h160v160ZM224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h510.76q27.62 0 46.12 18.5Q800-763 800-735.38v510.76q0 27.62-18.5 46.12Q763-160 735.38-160H224.62Zm0-40h510.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-510.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69H224.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v510.76q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69ZM200-760v560-560Z"></path></svg>'), Ry = /* @__PURE__ */ _('<div class="klinecharts-pro-quick-order-menu-anchor"><div class="klinecharts-pro-quick-order-menu"><button type="button">Trade <!> @ <!> Limit</button><button type="button">Trade <!> @ <!> Stop</button><button type="button">Create new order...</button><button type="button">Copy Price (<!>)</button><button type="button">Draw horizontal line on </button></div></div>');
o4();
const nr = "klinecharts_pro_chart_style", rr = "klinecharts_pro_chart_background_color", gr = "klinecharts_pro_time_anchor_settings", A1 = "candle_pane", Ky = 4, jy = /* @__PURE__ */ new Set(["rect", "circle", "straightLine", "rayLine", "segment", "arrow", "priceLine", "priceChannelLine", "parallelStraightLine", "horizontalRayLine", "horizontalSegment", "verticalRayLine", "verticalSegment"]), Qy = 0.08, Zy = 80, D0 = 2e-3, Hy = /* @__PURE__ */ new Set(["horizontalRayLine", "horizontalSegment", "horizontalStraightLine", "orderLine", "priceLine"]);
function $i() {
  return {
    enabled: !1,
    timestamp: Date.now(),
    anchorPoint: "date",
    anchorLine: !0,
    acrossTokens: !0
  };
}
function Yy() {
  try {
    const e = window.localStorage.getItem(gr);
    if (!e)
      return null;
    const t = JSON.parse(e);
    if (t.enabled !== !0 || t.acrossTokens !== !0 || !Number.isFinite(t.timestamp))
      return null;
    const r = $i();
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
function N0(e) {
  try {
    if (!e.enabled || !e.acrossTokens) {
      window.localStorage.removeItem(gr);
      return;
    }
    window.localStorage.setItem(gr, JSON.stringify(e));
  } catch {
  }
}
function sn(e, t, r, n) {
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
      indicator: c,
      defaultStyles: f
    }) => {
      const m = [];
      return c.visible ? (m.push(f.tooltip.icons[1]), m.push(f.tooltip.icons[2]), m.push(f.tooltip.icons[3])) : (m.push(f.tooltip.icons[0]), m.push(f.tooltip.icons[2]), m.push(f.tooltip.icons[3])), {
        icons: m
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
function ln(e) {
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
function Wy(e) {
  const t = Math.max(0, Math.ceil(e / 1e3)), r = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), s = t % 60, c = (f) => String(f).padStart(2, "0");
  return r > 0 ? `${c(r)}:${c(n)}:${c(s)}` : `${c(n)}:${c(s)}`;
}
const qy = (e) => {
  var so, lo, co, uo, ho, fo, mo, go, yo, Co, po, vo, bo, $o, _o, ko, xo, Lo, wo, Ao, So, To, Mo, Po, Do, No, Oo, Io, Eo;
  let t, r, n = null, s, c = null, f = null;
  const [m, v] = M(!1), [L, $] = M(e.theme), [w, E] = M(e.styles), [Q, re] = M(e.locale), [I, K] = M(e.symbol), [z, ce] = M(e.period), V = () => {
    var o, i, a, l;
    return {
      visibleMarginLeft: ((o = e.indicatorTooltipIconStyles) == null ? void 0 : o.visibleMarginLeft) ?? 7,
      secondaryMarginLeft: ((i = e.indicatorTooltipIconStyles) == null ? void 0 : i.secondaryMarginLeft) ?? 7,
      marginTop: ((a = e.indicatorTooltipIconStyles) == null ? void 0 : a.marginTop) ?? 1,
      size: ((l = e.indicatorTooltipIconStyles) == null ? void 0 : l.size) ?? 12
    };
  }, [oe, Y] = M(!1), [ve, W] = M([...e.mainIndicators]), [R, J] = M({}), [ue, S] = M(!1), [j, Z] = M({
    key: e.timezone,
    text: A0(e.timezone, e.locale)
  }), [F, ie] = M(!1), [le, ee] = M(), B = () => {
    try {
      const o = window.localStorage.getItem(nr);
      if (!o)
        return;
      const i = JSON.parse(o);
      return i && typeof i == "object" ? i : void 0;
    } catch {
      return;
    }
  }, ne = (o) => {
    try {
      window.localStorage.setItem(nr, JSON.stringify(o)), window.localStorage.removeItem(rr);
    } catch {
    }
  }, G = () => {
    try {
      window.localStorage.removeItem(nr), window.localStorage.removeItem(rr);
    } catch {
    }
  }, N = () => {
    var i;
    const o = B();
    if ((i = o == null ? void 0 : o.chart) != null && i.backgroundColor)
      return o.chart.backgroundColor;
    try {
      return window.localStorage.getItem(rr) ?? void 0;
    } catch {
      return;
    }
  }, O = () => {
    const o = r == null ? void 0 : r.closest(".klinecharts-pro");
    return o && getComputedStyle(o).backgroundColor || "#171a27";
  }, pe = () => t ? getComputedStyle(t).getPropertyValue("--klinecharts-pro-chart-background-color").trim() || N() || O() : N() ?? O(), $e = (o) => {
    var a;
    const i = (a = o.chart) == null ? void 0 : a.backgroundColor;
    if (!(!i || !t)) {
      if (i.toLowerCase() === O().toLowerCase()) {
        t.style.removeProperty("--klinecharts-pro-chart-background-color");
        return;
      }
      t.style.setProperty("--klinecharts-pro-chart-background-color", i);
    }
  }, ge = (o) => {
    const {
      chart: i,
      ...a
    } = o;
    return a;
  }, [je, x] = M(""), [ye, Me] = M(!1), [tt, be] = M(Date.now()), [yt, Ct] = M({
    from: Date.now() - 30 * 24 * 60 * 60 * 1e3,
    to: Date.now()
  }), [Rt, Kt] = M(Yy() ?? $i()), [St, Mn] = M(e.drawingBarVisible), [u1, N1] = M(!1), [O1, jt] = M(!1), [Pn, d1] = M(!1), Tt = ((so = e.orderTools) == null ? void 0 : so.quickOrder) ?? !0, [Fe, Dn] = M({
    quickOrder: Tt,
    quickOrderFloatingWindow: ((lo = e.orderTools) == null ? void 0 : lo.quickOrderFloatingWindow) ?? Tt,
    quickOrderPlusButton: ((co = e.orderTools) == null ? void 0 : co.quickOrderPlusButton) ?? Tt,
    openOrders: ((uo = e.orderTools) == null ? void 0 : uo.openOrders) ?? !0,
    openOrdersExtendedPriceLine: ((ho = e.orderTools) == null ? void 0 : ho.openOrdersExtendedPriceLine) ?? !0,
    openOrdersDisplay: ((fo = e.orderTools) == null ? void 0 : fo.openOrdersDisplay) ?? "right",
    positions: ((mo = e.orderTools) == null ? void 0 : mo.positions) ?? !0,
    breakevenPrice: ((go = e.orderTools) == null ? void 0 : go.breakevenPrice) ?? !0,
    liquidationPrice: ((yo = e.orderTools) == null ? void 0 : yo.liquidationPrice) ?? !0,
    priceLine: ((Co = e.orderTools) == null ? void 0 : Co.priceLine) ?? !0,
    marketPriceLine: ((po = e.orderTools) == null ? void 0 : po.marketPriceLine) ?? !0,
    countDown: ((vo = e.orderTools) == null ? void 0 : vo.countDown) ?? !0,
    bidAskPrice: ((bo = e.orderTools) == null ? void 0 : bo.bidAskPrice) ?? !0,
    orderPreviewLine: (($o = e.orderTools) == null ? void 0 : $o.orderPreviewLine) ?? !0,
    orderHistory: ((_o = e.orderTools) == null ? void 0 : _o.orderHistory) ?? !0
  }), [pt, Mt] = M(null), [Pt, nt] = M(!1), [I1, Ge] = M(!1), [h1, f1] = M(64), [Dt, vt] = M(null), [m1, g1] = M(null), [Nn, E1] = M("buy"), On = 6, [B1, Qt] = M(null), [y1, F1] = M(null), [U1, Nt] = M(null), [Ke, Qe] = M(null), [We, Ze] = M(null), In = ["#000000", "#2b3342", "#3f4653", "#565d69", "#6f7580", "#8a9099", "#a7acb3", "#c4c8ce", "#ffffff", "#ff4d67", "#ffa629", "#f7ed4a", "#2fc58d", "#4ab09c", "#52c4d3", "#3157f6", "#6a36b8", "#a644b9", "#d83972", "#f2a3a6", "#f5c879", "#f7ee97", "#a6d29f", "#7fc9b9", "#91d7df", "#8fb2ee", "#b09ad2", "#c89ccf", "#d987ab", "#e8757a", "#efb34f", "#efe36e", "#86c17d", "#66b7a8", "#68c4d0", "#5f91e4", "#8059c9", "#aa62c2", "#d34d83", "#b9353d", "#ea8527", "#e8c245", "#4b8c43", "#2f6f60", "#47919b", "#2646c6", "#56309c", "#892f95", "#a82563", "#8e2528", "#de5c1f", "#dc8527", "#255a22", "#164b34", "#225b63", "#15309b", "#442180", "#6b1f74", "#86154e"];
  let Zt = null;
  const [C1, p1] = M({
    visible: !1,
    indicatorName: "",
    paneId: "",
    calcParams: []
  });
  let _e = /* @__PURE__ */ new Map(), v1 = /* @__PURE__ */ new Map(), lt, ft, Ht = null, bt;
  const [Xe, z1] = M(!0), [V1, R1] = M(null), [En, K1] = M(null);
  let b = /* @__PURE__ */ new Map();
  const P = (o, i, a) => {
    const l = n == null ? void 0 : n.getIndicatorByPaneId(i, o);
    return {
      name: o,
      shortName: (l == null ? void 0 : l.shortName) || o,
      paneId: i,
      type: a,
      calcParams: (l == null ? void 0 : l.calcParams) || [],
      precision: (l == null ? void 0 : l.precision) ?? 4,
      visible: (l == null ? void 0 : l.visible) ?? !0,
      styles: l == null ? void 0 : l.styles,
      figures: l == null ? void 0 : l.figures
    };
  }, Pe = (o, i, a, l) => {
    if (e.onIndicatorChange)
      if (l === "add" || l === "change")
        setTimeout(() => {
          const u = P(o, i, a);
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
          type: a,
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
  }, ze = () => {
    var o;
    return (o = n == null ? void 0 : n.getPaneById) == null ? void 0 : o.call(n, A1);
  }, qe = () => {
    var o, i;
    return (i = (o = ze()) == null ? void 0 : o.getAxisComponent) == null ? void 0 : i.call(o);
  }, $t = () => {
    var l, u;
    const o = (u = (l = qe()) == null ? void 0 : l.getExtremum) == null ? void 0 : u.call(l), i = Number(o == null ? void 0 : o.min), a = Number(o == null ? void 0 : o.max);
    return !Number.isFinite(i) || !Number.isFinite(a) ? null : {
      minPrice: i,
      maxPrice: a
    };
  }, b1 = () => {
    var h, g;
    const o = ((h = n == null ? void 0 : n.getDataList) == null ? void 0 : h.call(n)) ?? [];
    if (o.length === 0)
      return null;
    const i = (g = n == null ? void 0 : n.getVisibleRange) == null ? void 0 : g.call(n), a = Number(i == null ? void 0 : i.from), l = Number(i == null ? void 0 : i.to);
    if (!Number.isFinite(a) || !Number.isFinite(l))
      return {
        from: 0,
        to: o.length - 1,
        dataList: o
      };
    const u = Math.min(a, l), y = Math.max(a, l);
    return {
      from: Math.max(0, Math.floor(u)),
      to: Math.min(o.length - 1, Math.ceil(y)),
      dataList: o
    };
  }, j1 = () => {
    const o = b1();
    return o ? o.dataList.slice(o.from, o.to + 1) : [];
  }, _i = () => {
    const o = b1();
    if (!o || !(n != null && n.getIndicatorByPaneId))
      return [];
    const i = n.getIndicatorByPaneId(A1), a = i instanceof Map ? Array.from(i.values()) : i ? [i] : [], l = [];
    return a.forEach((u) => {
      if (!u || u.visible === !1 || u.name === "VOL" || u.series === "volume")
        return;
      const y = Array.isArray(u.figures) ? u.figures : [], h = Array.isArray(u.result) ? u.result : [];
      for (let g = o.from; g <= o.to; g += 1) {
        const C = h[g];
        C && y.forEach((k) => {
          (k == null ? void 0 : k.key) != null && l.push(C[k.key]);
        });
      }
    }), l;
  }, ki = () => {
    var l;
    const o = [], i = (u) => {
      var h;
      if (!u || u.visible === !1)
        return;
      const y = u.type || u.name || "";
      Hy.has(y) && ((h = u.points) == null || h.forEach((g) => {
        const C = Number(g.value);
        Number.isFinite(C) && C > 0 && o.push(C);
      }));
    };
    _e.forEach(i);
    const a = m1();
    return a && i(Pr((l = n == null ? void 0 : n.getOverlayById) == null ? void 0 : l.call(n, a))), v1.forEach((u) => {
      u.forEach((y) => {
        Number.isFinite(y) && y > 0 && o.push(y);
      });
    }), o;
  }, xi = () => {
    var u, y, h, g, C, k;
    const o = (g = (h = (y = (u = n == null ? void 0 : n.getStyles) == null ? void 0 : u.call(n)) == null ? void 0 : y.candle) == null ? void 0 : h.priceMark) == null ? void 0 : g.last;
    if (!(o != null && o.show) && !((C = o == null ? void 0 : o.line) != null && C.show) && !Fe().marketPriceLine)
      return;
    const i = ((k = n == null ? void 0 : n.getDataList) == null ? void 0 : k.call(n)) ?? [], a = i[i.length - 1], l = Number(a == null ? void 0 : a.close);
    return Number.isFinite(l) && l > 0 ? l : void 0;
  }, Li = () => Ay({
    visibleCandles: j1(),
    visibleIndicators: _i(),
    visiblePriceLines: ki(),
    latestPrice: xi(),
    paddingPercent: Qy
  }), wi = (o, i) => {
    const a = Math.max(Math.abs(i.maxPrice - i.minPrice), 1);
    return Math.abs(o.minPrice - i.minPrice) <= a * D0 && Math.abs(o.maxPrice - i.maxPrice) <= a * D0;
  }, Mr = (o, i) => {
    var g, C, k, T;
    const a = qe();
    if (!n || !(a != null && a.setExtremum))
      return;
    const l = o.minPrice, u = o.maxPrice, y = ((g = a.convertToRealValue) == null ? void 0 : g.call(a, l)) ?? l, h = ((C = a.convertToRealValue) == null ? void 0 : C.call(a, u)) ?? u;
    a.setExtremum({
      min: l,
      max: u,
      range: u - l,
      realMin: y,
      realMax: h,
      realRange: h - y
    }), (k = n.adjustPaneViewport) == null || k.call(n, !1, !0, !0, !0), i && ((T = a.setAutoCalcTickFlag) == null || T.call(a, !0)), K1(o);
  }, Ai = (o = !1) => {
    var a, l, u;
    if (!n || !Xe())
      return;
    const i = Li();
    if (!i) {
      (l = (a = qe()) == null ? void 0 : a.setAutoCalcTickFlag) == null || l.call(a, !0), (u = n.resize) == null || u.call(n), Ht = null;
      return;
    }
    !o && Ht && wi(i, Ht) || (Mr(i, !0), Ht = i, rt());
  }, ke = (o = !1) => {
    !Xe() || typeof window > "u" || (lt && window.clearTimeout(lt), lt = window.setTimeout(() => {
      lt = void 0, ft && window.cancelAnimationFrame(ft), ft = window.requestAnimationFrame(() => {
        ft = void 0, Ai(o);
      });
    }, o ? 0 : Zy));
  }, Q1 = () => {
    var o, i;
    R1(null), z1(!0), (i = (o = qe()) == null ? void 0 : o.setAutoCalcTickFlag) == null || i.call(o, !0), ke(!0);
  }, Bn = () => {
    const o = $t();
    o && (R1(o), Mr(o, !1)), z1(!1);
  }, Si = () => {
    Xe() ? Bn() : Q1();
  }, Ti = () => {
    var g;
    const o = (g = n == null ? void 0 : n.getDom) == null ? void 0 : g.call(n, A1, Je.YAxis);
    if (!o || typeof window > "u")
      return;
    let i = !1, a = 0;
    const l = () => {
      i = !1;
    }, u = (C) => {
      var k;
      i = !0, a = "touches" in C ? ((k = C.touches[0]) == null ? void 0 : k.clientY) ?? 0 : C.clientY;
    }, y = (C) => {
      var T;
      if (!i || !Xe())
        return;
      const k = "touches" in C ? ((T = C.touches[0]) == null ? void 0 : T.clientY) ?? a : C.clientY;
      Math.abs(k - a) > 2 && Bn();
    }, h = () => {
      window.setTimeout(() => Q1(), 0);
    };
    return o.addEventListener("mousedown", u), o.addEventListener("touchstart", u, {
      passive: !0
    }), o.addEventListener("dblclick", h), document.addEventListener("mousemove", y), document.addEventListener("touchmove", y, {
      passive: !0
    }), document.addEventListener("mouseup", l), document.addEventListener("touchend", l), () => {
      o.removeEventListener("mousedown", u), o.removeEventListener("touchstart", u), o.removeEventListener("dblclick", h), document.removeEventListener("mousemove", y), document.removeEventListener("touchmove", y), document.removeEventListener("mouseup", l), document.removeEventListener("touchend", l);
    };
  }, $1 = (o) => ({
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
  })[o] || 1, Yt = (o, i = /* @__PURE__ */ new WeakSet()) => {
    if (o == null)
      return o;
    if (i.has(o))
      return "[Circular]";
    if (typeof o != "object")
      return o;
    if (i.add(o), Array.isArray(o))
      return o.map((l) => Yt(l, i));
    const a = {};
    for (const l in o)
      if (!(l === "__proto__" || l === "constructor" || l === "prototype"))
        try {
          const u = o[l];
          if (typeof u == "function")
            continue;
          a[l] = Yt(u, i);
        } catch (u) {
          a[l] = `[Error: ${u.message}]`;
        }
    return a;
  }, Pr = (o) => {
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
        extendData: Yt(o.extendData || {}),
        styles: Yt(o.styles || {}),
        visible: o.visible ?? !0,
        lock: o.lock ?? !1,
        mode: o.mode || Yn.Normal
      };
    } catch (i) {
      return console.error("Error extracting overlay data:", i), null;
    }
  }, Ot = (o) => {
    var i, a, l;
    try {
      const u = (i = n == null ? void 0 : n.getOverlayById) == null ? void 0 : i.call(n, o);
      if (!u)
        return;
      const y = Pr(u);
      if (y) {
        const h = _e.get(o), g = ((a = h == null ? void 0 : h.points) == null ? void 0 : a.length) || 0, C = ((l = y.points) == null ? void 0 : l.length) || 0;
        _e.set(o, y);
        const k = $1(y.type);
        if (C >= k) {
          const T = b.get(o);
          T && !T.complete && (T.complete = !0, T.checkInterval && (clearInterval(T.checkInterval), T.checkInterval = void 0));
        }
      }
    } catch (u) {
      console.error(`Error updating overlay tracking for ${o}:`, u);
    }
  }, Mi = (o, i) => {
    if (b.has(o))
      return;
    const a = {
      monitoring: !0,
      complete: !1,
      lastPointCount: 0
    };
    b.set(o, a), Ot(o);
    const l = () => {
      Ot(o);
    };
    document.addEventListener("mouseup", l), document.addEventListener("touchend", l), setTimeout(() => {
      var y;
      const u = b.get(o);
      if (u && !u.complete) {
        u.checkInterval && clearInterval(u.checkInterval), u.mouseUpHandler && (document.removeEventListener("mouseup", u.mouseUpHandler), document.removeEventListener("touchend", u.mouseUpHandler)), Ot(o);
        const h = _e.get(o);
        if (h) {
          const g = $1(h.type), C = ((y = h.points) == null ? void 0 : y.length) || 0;
          C < g && console.warn(`âš ï¸ ${h.type} ${o} has only ${C} point(s), should have ${g}`);
        }
      }
    }, 3e4);
  };
  let It = {
    saveDrawings: (o, i) => {
      try {
        const a = `kline_drawings_${o}`, u = {
          drawings: i.map((y) => {
            var k;
            const h = {
              ...y
            };
            h.extendData && (h.extendData = Yt(h.extendData)), h.styles && (h.styles = Yt(h.styles));
            const g = $1(y.type), C = ((k = y.points) == null ? void 0 : k.length) || 0;
            return C < g && console.warn(`âš ï¸ Saving ${y.type} with only ${C} point(s), needs ${g}`), h;
          }),
          timestamp: Date.now()
        };
        localStorage.setItem(a, JSON.stringify(u));
      } catch (a) {
        console.error("Library: Error saving drawings:", a);
      }
    },
    loadDrawings: (o) => {
      try {
        const i = `kline_drawings_${o}`, a = localStorage.getItem(i);
        if (a) {
          const l = JSON.parse(a), u = [];
          return Array.isArray(l.drawings) && l.drawings.forEach((y) => {
            var C;
            const h = $1(y.type);
            (((C = y.points) == null ? void 0 : C.length) || 0) >= h && u.push(y);
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
  const _1 = () => {
    const o = I();
    if (o != null && o.ticker) {
      const i = Array.from(_e.values());
      It.saveDrawings(o.ticker, i);
    }
  }, Dr = (o) => {
    const i = b.get(o);
    i && (i.checkInterval && clearInterval(i.checkInterval), i.mouseUpHandler && (document.removeEventListener("mouseup", i.mouseUpHandler), document.removeEventListener("touchend", i.mouseUpHandler)), b.delete(o));
  }, Pi = () => {
    _e.forEach((o, i) => {
      var a;
      (a = n == null ? void 0 : n.removeOverlay) == null || a.call(n, {
        id: i
      }), Dr(i);
    }), _e.clear(), b.clear(), Qe(null), Ze(null), _1(), ke(!0);
  }, Di = (o) => typeof o.name == "string" && jy.has(o.name), Fn = (o, i = !1) => {
    var C, k, T;
    if (!n)
      return null;
    const a = (C = n.getDom) == null ? void 0 : C.call(n, A1, Je.Main), l = (k = a == null ? void 0 : a.getBoundingClientRect) == null ? void 0 : k.call(a);
    if (!a || !l || i && !a.contains(o.target))
      return null;
    const u = o.clientX - l.left, y = o.clientY - l.top;
    if (u < 0 || y < 0 || u > l.width || y > l.height)
      return null;
    const h = (T = n.convertFromPixel) == null ? void 0 : T.call(n, [{
      x: u,
      y
    }], {
      paneId: A1
    }), g = Array.isArray(h) ? h[0] : h;
    return !g || !Number.isFinite(Number(g.dataIndex)) || !Number.isFinite(Number(g.value)) ? null : {
      dataIndex: Number(g.dataIndex),
      timestamp: Number(g.timestamp),
      value: Number(g.value)
    };
  }, Ni = (o) => {
    var i, a;
    (i = n == null ? void 0 : n.setScrollEnabled) == null || i.call(n, o), (a = n == null ? void 0 : n.setZoomEnabled) == null || a.call(n, o);
  }, Oi = (o) => {
    var a, l, u;
    if (o.button !== 0 || !c || f || !n || !t)
      return;
    const i = Fn(o, !0);
    i && (f = {
      overlay: c,
      startPoint: i,
      startClientX: o.clientX,
      startClientY: o.clientY,
      overlayId: null,
      pointerId: o.pointerId,
      previousScrollEnabled: (a = n.isScrollEnabled) == null ? void 0 : a.call(n),
      previousZoomEnabled: (l = n.isZoomEnabled) == null ? void 0 : l.call(n)
    }, (u = t.setPointerCapture) == null || u.call(t, o.pointerId));
  }, Ii = (o) => {
    var u, y;
    const i = f;
    if (!i || i.pointerId !== o.pointerId || !n)
      return;
    const a = Fn(o);
    if (!a)
      return;
    const l = Math.hypot(o.clientX - i.startClientX, o.clientY - i.startClientY);
    if (!(!i.overlayId && l < Ky)) {
      if (o.preventDefault(), o.stopPropagation(), !i.overlayId) {
        Ni(!1);
        const h = (u = n.createOverlay) == null ? void 0 : u.call(n, qt({
          ...i.overlay,
          points: [i.startPoint, a]
        }));
        i.overlayId = typeof h == "string" ? h : null;
        return;
      }
      (y = n.overrideOverlay) == null || y.call(n, {
        id: i.overlayId,
        points: [i.startPoint, a]
      }), Ot(i.overlayId);
    }
  }, Un = (o, i = !1) => {
    var l, u, y, h, g;
    const a = f;
    if (!(!a || a.pointerId !== o.pointerId)) {
      if ((l = t == null ? void 0 : t.releasePointerCapture) == null || l.call(t, o.pointerId), a.overlayId && i)
        (u = n == null ? void 0 : n.removeOverlay) == null || u.call(n, {
          id: a.overlayId
        }), Dr(a.overlayId), _e.delete(a.overlayId);
      else if (a.overlayId) {
        const C = Fn(o);
        C && ((y = n == null ? void 0 : n.overrideOverlay) == null || y.call(n, {
          id: a.overlayId,
          points: [a.startPoint, C]
        })), Ot(a.overlayId), _1(), ke(!0);
      }
      a.previousScrollEnabled !== void 0 && ((h = n == null ? void 0 : n.setScrollEnabled) == null || h.call(n, a.previousScrollEnabled)), a.previousZoomEnabled !== void 0 && ((g = n == null ? void 0 : n.setZoomEnabled) == null || g.call(n, a.previousZoomEnabled)), f = null;
    }
  }, Ei = (o) => {
    if (!o || !n)
      return;
    _e.forEach((a, l) => {
      var u;
      (u = n == null ? void 0 : n.removeOverlay) == null || u.call(n, {
        id: l
      });
    }), _e.clear(), b.clear(), Qe(null), Ze(null), It.loadDrawings(o).forEach((a) => {
      var l;
      try {
        const u = qt({
          name: a.type,
          points: a.points || [],
          extendData: a.extendData,
          styles: a.styles,
          visible: a.visible ?? !0,
          lock: a.lock ?? !1,
          mode: a.mode || Yn.Normal
        }), y = n == null ? void 0 : n.createOverlay(u), h = typeof y == "string" ? y : null;
        h && (_e.set(h, {
          ...a,
          id: h
        }), b.set(h, {
          monitoring: !1,
          complete: !0,
          lastPointCount: ((l = a.points) == null ? void 0 : l.length) || 0
        }));
      } catch (u) {
        console.error("Library: Error restoring drawing:", u);
      }
    });
  }, zn = (o) => {
    var a, l;
    const i = {
      ...Fe(),
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
    Dn(i), o.orderPreviewLine === !1 && Vn(), (l = (a = e.orderTools) == null ? void 0 : a.onChange) == null || l.call(a, i);
  }, Nr = (o) => {
    var l, u, y, h, g, C;
    const i = Number((u = (l = o == null ? void 0 : o.points) == null ? void 0 : l[0]) == null ? void 0 : u.value);
    if (!Number.isFinite(i) || i <= 0)
      return;
    const a = ((y = o == null ? void 0 : o.extendData) == null ? void 0 : y.side) === "sell" || ((h = o == null ? void 0 : o.extendData) == null ? void 0 : h.side) === "buy" ? o.extendData.side : Nn();
    (C = (g = e.orderTools) == null ? void 0 : g.onOrderPreviewLineChange) == null || C.call(g, {
      price: i,
      side: a,
      symbol: I()
    });
  }, Vn = () => {
    var i;
    const o = m1();
    o && ((i = n == null ? void 0 : n.removeOverlay) == null || i.call(n, {
      id: o
    }), _e.delete(o), b.delete(o), g1(null));
  }, Bi = (o) => {
    var g, C;
    const i = Number(o.price);
    if (!n || !Number.isFinite(i) || i <= 0 || !Fe().orderPreviewLine) {
      Vn();
      return;
    }
    const a = o.side === "sell" ? "sell" : "buy";
    E1(a);
    const l = {
      side: a,
      label: o.label ?? "New Limit",
      showDragHint: !1,
      isOrderPreviewLine: !0
    }, u = m1();
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
    const y = (C = n.createOverlay) == null ? void 0 : C.call(n, {
      name: "orderLine",
      points: [{
        value: i
      }],
      extendData: l,
      lock: !1,
      onPressedMoving: (k) => (Nr(k.overlay), !1),
      onPressedMoveEnd: (k) => (Nr(k.overlay), !1)
    }), h = typeof y == "string" ? y : null;
    h && (_e.delete(h), b.delete(h), g1(h));
  }, Z1 = (o) => {
    var a;
    const i = Math.min(Math.max(((a = I()) == null ? void 0 : a.pricePrecision) ?? 2, 0), 8);
    return o.toLocaleString(void 0, {
      minimumFractionDigits: i,
      maximumFractionDigits: i
    });
  }, Fi = () => {
    Q1();
  }, rt = (o = Date.now()) => {
    var it, at, st, Bo, Fo, Uo;
    if (!n || !t || !Fe().countDown) {
      Qt(null);
      return;
    }
    n.setStyles({
      candle: {
        priceMark: {
          last: {
            show: !0,
            line: {
              show: Fe().marketPriceLine
            },
            text: {
              show: !1
            }
          }
        }
      }
    });
    const i = ((it = n.getDataList) == null ? void 0 : it.call(n)) ?? [], a = i[i.length - 1], l = Number(a == null ? void 0 : a.close);
    if (!a || !Number.isFinite(l) || l <= 0) {
      Qt(null);
      return;
    }
    const u = (at = n.convertToPixel) == null ? void 0 : at.call(n, [{
      value: l
    }], {
      paneId: "candle_pane",
      absolute: !0
    }), y = Number((st = u == null ? void 0 : u[0]) == null ? void 0 : st.y), h = (Bo = n.getSize) == null ? void 0 : Bo.call(n, "candle_pane"), g = (h == null ? void 0 : h.height) ?? t.clientHeight;
    if (!Number.isFinite(y) || y < 0 || y > g) {
      Qt(null);
      return;
    }
    const C = Math.min(Math.max(((Fo = I()) == null ? void 0 : Fo.pricePrecision) ?? 2, 0), 8), k = l.toLocaleString(void 0, {
      minimumFractionDigits: C,
      maximumFractionDigits: C
    }), T = (Uo = n.getSize) == null ? void 0 : Uo.call(n, "candle_pane", Je.YAxis), te = T != null && T.width && Number.isFinite(T.width) ? Math.max(74, Math.floor(T.width) - 2) : 96, ae = ln(z()), se = o % ae, q = se === 0 ? ae : ae - se, fe = Number(a.close), Le = Number(a.open), we = n.getStyles().candle.priceMark.last, De = we.text, X = Number(De.size) || 12, Ae = Number(De.paddingTop) || 2, Ce = Number(De.paddingBottom) || 2, Ne = Math.min(Number(De.paddingLeft) || 4, 3), Ie = Math.min(Number(De.paddingRight) || 4, 3), ot = Math.max(34, X * 2 + Ae + Ce + 6), ct = Math.max(0, Math.min(y - ot / 2, g - ot));
    Qt({
      top: ct,
      width: Math.min(te, Math.max(62, k.length * (X * 0.56) + Ne + Ie + 4)),
      priceText: k,
      text: Wy(q),
      color: Number.isFinite(fe) && Number.isFinite(Le) && fe < Le ? we.downColor : we.upColor,
      textSize: X,
      textFamily: De.family,
      textWeight: De.weight,
      paddingLeft: Ne,
      paddingRight: Ie,
      paddingTop: Ae,
      paddingBottom: Ce,
      borderRadius: Number(De.borderRadius) || 2
    });
  }, Ui = (o) => {
    var a, l;
    const i = Number(o == null ? void 0 : o.y);
    if (!Number.isFinite(i))
      return NaN;
    try {
      const u = n == null ? void 0 : n.convertFromPixel([{
        x: (o == null ? void 0 : o.x) ?? 0,
        y: i
      }], {
        paneId: "candle_pane"
      }), y = Number((a = u == null ? void 0 : u[0]) == null ? void 0 : a.value);
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
  }, Or = (o) => {
    var y;
    if (!Fe().quickOrderPlusButton || (o == null ? void 0 : o.paneId) !== "candle_pane" || !t) {
      if (I1() || Pt())
        return;
      Mt(null), nt(!1);
      return;
    }
    const i = (y = n == null ? void 0 : n.getSize) == null ? void 0 : y.call(n, "candle_pane", Je.YAxis);
    i != null && i.width && Number.isFinite(i.width) && f1(Math.max(44, Math.ceil(i.width)));
    const a = Number(o.y), l = Ui(o), u = t.clientHeight;
    if (!Number.isFinite(a) || !Number.isFinite(l) || l <= 0 || a < 0 || a > u) {
      if (I1() || Pt())
        return;
      Mt(null), nt(!1);
      return;
    }
    Zt = {
      ...o
    }, Mt({
      y: a,
      price: l
    });
  }, Wt = () => {
    var o;
    if (Zt)
      try {
        (o = n == null ? void 0 : n.executeAction) == null || o.call(n, Et.OnCrosshairChange, Zt);
      } catch {
      }
  }, Rn = (o) => {
    var a, l;
    const i = Dt() ?? pt();
    i && ((l = (a = e.orderTools) == null ? void 0 : a.onQuickOrderAction) == null || l.call(a, {
      action: o,
      price: i.price,
      symbol: I()
    }), nt(!1), vt(null), Ge(!1));
  }, zi = async () => {
    var i;
    const o = Dt() ?? pt();
    if (o) {
      try {
        await ((i = navigator.clipboard) == null ? void 0 : i.writeText(String(o.price)));
      } catch {
      }
      nt(!1), vt(null), Ge(!1);
    }
  }, Vi = () => {
    const o = Dt() ?? pt();
    o && (n == null || n.createOverlay(qt({
      name: "horizontalStraightLine",
      points: [{
        value: o.price
      }],
      lock: !1
    })), nt(!1), vt(null), Ge(!1));
  }, Ri = (o) => {
    var g, C, k, T, te, ae;
    const i = (C = (g = t == null ? void 0 : t.parentElement) == null ? void 0 : g.getBoundingClientRect) == null ? void 0 : C.call(g), a = (k = t == null ? void 0 : t.getBoundingClientRect) == null ? void 0 : k.call(t), l = o == null ? void 0 : o.overlay, u = (T = l == null ? void 0 : l.points) == null ? void 0 : T[0];
    let y = 72, h = 40;
    if (i) {
      if (Number.isFinite(o == null ? void 0 : o.pageX) ? y = o.pageX - i.left : Number.isFinite(o == null ? void 0 : o.x) && a && (y = a.left - i.left + o.x), Number.isFinite(o == null ? void 0 : o.pageY))
        h = o.pageY - i.top;
      else if (Number.isFinite(o == null ? void 0 : o.y) && a)
        h = a.top - i.top + o.y;
      else if (Number.isFinite(u == null ? void 0 : u.value))
        try {
          const se = (te = n == null ? void 0 : n.convertToPixel) == null ? void 0 : te.call(n, [{
            value: u.value
          }], {
            paneId: "candle_pane",
            absolute: !0
          }), q = Number((ae = se == null ? void 0 : se[0]) == null ? void 0 : ae.y);
          Number.isFinite(q) && (h = q - i.top);
        } catch {
        }
    }
    return {
      x: Math.max(12, Math.min(y - 28, ((i == null ? void 0 : i.width) ?? 360) - 320)),
      y: Math.max(8, h - 52)
    };
  }, Kn = (o) => {
    var g, C, k, T, te, ae, se, q;
    const i = o == null ? void 0 : o.overlay;
    if (!(i != null && i.id) || i.name !== "horizontalStraightLine")
      return !1;
    const a = Ri(o), l = Number((C = (g = i.styles) == null ? void 0 : g.line) == null ? void 0 : C.size) || 2, u = ((T = (k = i.styles) == null ? void 0 : k.line) == null ? void 0 : T.style) ?? Ve.Solid, y = Array.isArray((ae = (te = i.styles) == null ? void 0 : te.line) == null ? void 0 : ae.dashedValue) ? i.styles.line.dashedValue : [], h = ((q = (se = i.styles) == null ? void 0 : se.line) == null ? void 0 : q.color) ?? "#2f6df6";
    return Qe({
      id: i.id,
      x: a.x,
      y: a.y,
      lineSize: l,
      lineStyle: u,
      dashedValue: y,
      color: h,
      locked: i.lock ?? !1,
      visible: i.visible ?? !0
    }), !1;
  }, Ir = (o) => {
    var a, l;
    const i = (a = o == null ? void 0 : o.overlay) == null ? void 0 : a.id;
    return (!i || ((l = Ke()) == null ? void 0 : l.id) === i) && (Qe(null), Ze(null)), !1;
  }, qt = (o) => {
    var h, g, C, k, T, te, ae, se, q;
    if (o.name !== "horizontalStraightLine")
      return o;
    const i = o.onClick, a = o.onSelected, l = o.onDeselected, u = o.onRemoved, y = o.onPressedMoveEnd;
    return {
      ...o,
      styles: {
        ...o.styles,
        line: {
          ...(h = o.styles) == null ? void 0 : h.line,
          size: Number((C = (g = o.styles) == null ? void 0 : g.line) == null ? void 0 : C.size) || 2,
          style: ((T = (k = o.styles) == null ? void 0 : k.line) == null ? void 0 : T.style) ?? Ve.Solid,
          dashedValue: ((ae = (te = o.styles) == null ? void 0 : te.line) == null ? void 0 : ae.dashedValue) ?? [6, 4],
          color: ((q = (se = o.styles) == null ? void 0 : se.line) == null ? void 0 : q.color) ?? "#2f6df6"
        }
      },
      onClick: (fe) => (Kn(fe), (i == null ? void 0 : i(fe)) ?? !1),
      onSelected: (fe) => (Kn(fe), (a == null ? void 0 : a(fe)) ?? !1),
      onPressedMoveEnd: (fe) => (Kn(fe), (y == null ? void 0 : y(fe)) ?? !1),
      onDeselected: (fe) => (Ir(fe), (l == null ? void 0 : l(fe)) ?? !1),
      onRemoved: (fe) => (Ir(fe), (u == null ? void 0 : u(fe)) ?? !1)
    };
  }, Ki = () => {
    var i;
    const o = Ke();
    o && ((i = n == null ? void 0 : n.removeOverlay) == null || i.call(n, {
      id: o.id
    }), Qe(null), Ze(null));
  }, Gt = (o) => {
    var a;
    const i = Ke();
    i && ((a = n == null ? void 0 : n.overrideOverlay) == null || a.call(n, {
      id: i.id,
      ...o
    }), setTimeout(() => {
      Ot(i.id), _1();
    }, 0));
  }, ji = () => {
    const o = Ke();
    if (!o)
      return;
    const i = !o.locked;
    Gt({
      lock: i
    }), Qe({
      ...o,
      locked: i
    });
  }, Qi = () => {
    const o = Ke();
    if (!o)
      return;
    const i = !o.visible;
    Gt({
      visible: i
    }), Qe({
      ...o,
      visible: i
    });
  }, Zi = (o) => {
    const i = Ke();
    i && (Gt({
      styles: {
        line: {
          size: o
        }
      }
    }), Qe({
      ...i,
      lineSize: o
    }), Ze(null));
  }, jn = (o, i) => {
    const a = Ke();
    a && (Gt({
      styles: {
        line: {
          style: o,
          dashedValue: i
        }
      }
    }), Qe({
      ...a,
      lineStyle: o,
      dashedValue: i
    }), Ze(null));
  }, Hi = () => {
    const o = Ke();
    if (!o)
      return;
    const i = 1, a = Ve.Solid, l = [6, 4], u = "#2f6df6";
    Gt({
      styles: {
        line: {
          size: i,
          style: a,
          dashedValue: l,
          color: u
        }
      }
    }), Qe({
      ...o,
      lineSize: i,
      lineStyle: a,
      dashedValue: l,
      color: u
    }), Ze(null);
  }, Yi = (o) => {
    const i = Ke();
    i && (Gt({
      styles: {
        line: {
          color: o
        }
      }
    }), Qe({
      ...i,
      color: o
    }));
  }, Wi = (o) => {
    var k, T;
    const i = Ke();
    if (!i || !t)
      return;
    o.preventDefault(), o.stopPropagation(), Ze(null);
    const a = (T = (k = t.parentElement) == null ? void 0 : k.getBoundingClientRect) == null ? void 0 : T.call(k);
    if (!a)
      return;
    const l = o.clientX, u = o.clientY, y = i.x, h = i.y, g = (te) => {
      te.preventDefault();
      const ae = y + te.clientX - l, se = h + te.clientY - u;
      Qe({
        ...i,
        x: Math.max(8, Math.min(ae, a.width - 320)),
        y: Math.max(8, Math.min(se, a.height - 48))
      });
    }, C = () => {
      document.removeEventListener("mousemove", g), document.removeEventListener("mouseup", C);
    };
    document.addEventListener("mousemove", g), document.addEventListener("mouseup", C);
  }, qi = () => {
    nt(!1), vt(null), Ge(!1);
  }, Er = (o) => {
    var a, l;
    if (!Pt())
      return;
    const i = o.target;
    (a = i == null ? void 0 : i.closest) != null && a.call(i, ".klinecharts-pro-quick-order-marker") || (l = i == null ? void 0 : i.closest) != null && l.call(i, ".klinecharts-pro-quick-order-menu-anchor") || qi();
  };
  let Br = (ko = e.orderTools) == null ? void 0 : ko.quickOrder, Fr = (xo = e.orderTools) == null ? void 0 : xo.quickOrderFloatingWindow, Ur = (Lo = e.orderTools) == null ? void 0 : Lo.quickOrderPlusButton, zr = (wo = e.orderTools) == null ? void 0 : wo.openOrders, Vr = (Ao = e.orderTools) == null ? void 0 : Ao.openOrdersExtendedPriceLine, Rr = (So = e.orderTools) == null ? void 0 : So.openOrdersDisplay, Kr = (To = e.orderTools) == null ? void 0 : To.positions, jr = (Mo = e.orderTools) == null ? void 0 : Mo.breakevenPrice, Qr = (Po = e.orderTools) == null ? void 0 : Po.liquidationPrice, Zr = (Do = e.orderTools) == null ? void 0 : Do.priceLine, Hr = (No = e.orderTools) == null ? void 0 : No.marketPriceLine, Yr = (Oo = e.orderTools) == null ? void 0 : Oo.countDown, Wr = (Io = e.orderTools) == null ? void 0 : Io.bidAskPrice, qr = (Eo = e.orderTools) == null ? void 0 : Eo.orderHistory;
  He(() => {
    var fe, Le, we, De, X, Ae, Ce, Ne, Ie, ot, ct, it, at, st;
    const o = (fe = e.orderTools) == null ? void 0 : fe.quickOrder, i = (Le = e.orderTools) == null ? void 0 : Le.quickOrderFloatingWindow, a = (we = e.orderTools) == null ? void 0 : we.quickOrderPlusButton, l = (De = e.orderTools) == null ? void 0 : De.openOrders, u = (X = e.orderTools) == null ? void 0 : X.openOrdersExtendedPriceLine, y = (Ae = e.orderTools) == null ? void 0 : Ae.openOrdersDisplay, h = (Ce = e.orderTools) == null ? void 0 : Ce.positions, g = (Ne = e.orderTools) == null ? void 0 : Ne.breakevenPrice, C = (Ie = e.orderTools) == null ? void 0 : Ie.liquidationPrice, k = (ot = e.orderTools) == null ? void 0 : ot.priceLine, T = (ct = e.orderTools) == null ? void 0 : ct.marketPriceLine, te = (it = e.orderTools) == null ? void 0 : it.countDown, ae = (at = e.orderTools) == null ? void 0 : at.bidAskPrice, se = (st = e.orderTools) == null ? void 0 : st.orderHistory, q = {};
    typeof o == "boolean" && o !== Br && (Br = o, q.quickOrder = o, typeof i != "boolean" && (q.quickOrderFloatingWindow = o), typeof a != "boolean" && (q.quickOrderPlusButton = o)), typeof i == "boolean" && i !== Fr && (Fr = i, q.quickOrderFloatingWindow = i), typeof a == "boolean" && a !== Ur && (Ur = a, q.quickOrderPlusButton = a), typeof l == "boolean" && l !== zr && (zr = l, q.openOrders = l), typeof u == "boolean" && u !== Vr && (Vr = u, q.openOrdersExtendedPriceLine = u), y !== void 0 && y !== Rr && (Rr = y, q.openOrdersDisplay = y), typeof h == "boolean" && h !== Kr && (Kr = h, q.positions = h), typeof g == "boolean" && g !== jr && (jr = g, q.breakevenPrice = g), typeof C == "boolean" && C !== Qr && (Qr = C, q.liquidationPrice = C), typeof k == "boolean" && k !== Zr && (Zr = k, q.priceLine = k, typeof T != "boolean" && (q.marketPriceLine = k), typeof te != "boolean" && (q.countDown = k), typeof ae != "boolean" && (q.bidAskPrice = k)), typeof T == "boolean" && T !== Hr && (Hr = T, q.marketPriceLine = T), typeof te == "boolean" && te !== Yr && (Yr = te, q.countDown = te), typeof ae == "boolean" && ae !== Wr && (Wr = ae, q.bidAskPrice = ae), typeof se == "boolean" && se !== qr && (qr = se, q.orderHistory = se), Object.keys(q).length > 0 && zn(q);
  }), He(() => {
    Fe().marketPriceLine, Fe().countDown, z(), I(), n == null || n.setStyles({
      candle: {
        priceMark: {
          last: {
            show: !0,
            line: {
              show: Fe().marketPriceLine
            },
            text: {
              show: !Fe().countDown
            }
          }
        }
      }
    }), ke(!0), rt();
  }), e.ref({
    setTheme: $,
    getTheme: () => L(),
    setStyles: E,
    getStyles: () => n.getStyles(),
    setLocale: re,
    getLocale: () => Q(),
    setTimezone: (o) => {
      Z({
        key: o,
        text: A0(e.timezone, Q())
      });
    },
    getTimezone: () => j().key,
    setSymbol: K,
    getSymbol: () => I(),
    setPeriod: ce,
    getPeriod: () => z(),
    getMainIndicators: () => ve(),
    getSubIndicators: () => R(),
    setMainIndicators: W,
    setSubIndicators: J,
    overrideIndicator: (o, i) => {
      n == null || n.overrideIndicator(o, i), ke(!0);
    },
    createOverlay: (o) => {
      var a;
      const i = (a = n == null ? void 0 : n.createOverlay) == null ? void 0 : a.call(n, qt(o));
      return typeof i == "string" ? (ke(!0), i) : null;
    },
    removeOverlay: (o) => {
      var i;
      if ((i = n == null ? void 0 : n.removeOverlay) == null || i.call(n, o), o.id) {
        _e.delete(o.id);
        const a = b.get(o.id);
        a && (a.checkInterval && clearInterval(a.checkInterval), a.mouseUpHandler && (document.removeEventListener("mouseup", a.mouseUpHandler), document.removeEventListener("touchend", a.mouseUpHandler)), b.delete(o.id)), _1();
      }
      ke(!0);
    },
    removeAllOverlay: () => {
      _e.forEach((o, i) => {
        var l;
        (l = n == null ? void 0 : n.removeOverlay) == null || l.call(n, {
          id: i
        });
        const a = b.get(i);
        a && (a.checkInterval && clearInterval(a.checkInterval), a.mouseUpHandler && (document.removeEventListener("mouseup", a.mouseUpHandler), document.removeEventListener("touchend", a.mouseUpHandler)));
      }), _e.clear(), b.clear(), ke(!0);
    },
    getAllOverlay: () => Array.from(_e.values()),
    getOverlay: (o) => _e.get(o) || null,
    overrideOverlay: (o) => {
      n && "overrideOverlay" in n && typeof n.overrideOverlay == "function" ? (n.overrideOverlay(o), ke(!0)) : console.warn("overrideOverlay method not available on widget");
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
    setIndicatorModalVisible: Y,
    setTimezoneModalVisible: S,
    setSettingModalVisible: ie,
    setTimeToolsModalVisible: (o) => {
      o && be(Date.now()), Me(o);
    },
    getOrderToolsState: () => Fe(),
    setOrderToolsState: (o) => {
      zn(o);
    },
    setOrderPreviewLine: Bi,
    clearOrderPreviewLine: Vn,
    dispose: () => {
      t && zo(t);
    },
    resize: () => {
      n && "resize" in n && typeof n.resize == "function" ? n.resize() : console.warn("resize method not available on widget");
    },
    getSettings: () => {
      var a, l, u, y, h, g, C, k, T, te, ae, se, q, fe, Le, we;
      if (!n)
        return {};
      const o = n.getStyles(), i = (a = o.candle) == null ? void 0 : a.bar;
      return {
        // Candle settings
        candleType: (l = o.candle) == null ? void 0 : l.type,
        candleBarStyle: i == null ? void 0 : i.style,
        // bar.style might be LineType
        showLastPrice: (h = (y = (u = o.candle) == null ? void 0 : u.priceMark) == null ? void 0 : y.last) == null ? void 0 : h.show,
        showHighestPrice: (k = (C = (g = o.candle) == null ? void 0 : g.priceMark) == null ? void 0 : C.high) == null ? void 0 : k.show,
        showLowestPrice: (ae = (te = (T = o.candle) == null ? void 0 : T.priceMark) == null ? void 0 : te.low) == null ? void 0 : ae.show,
        // Indicator settings
        showIndicatorLastValue: (q = (se = o.indicator) == null ? void 0 : se.lastValueMark) == null ? void 0 : q.show,
        // Axis settings - yAxis.reverse is boolean according to YAxisStyle interface
        priceAxisType: (fe = o.yAxis) == null ? void 0 : fe.type,
        reverseCoordinate: (Le = o.yAxis) == null ? void 0 : Le.reverse,
        // Grid settings
        showGrids: (we = o.grid) == null ? void 0 : we.show,
        timestamp: Date.now()
      };
    },
    setSettings: (o) => {
      var a, l, u, y, h, g, C, k, T, te, ae, se, q, fe;
      if (!n)
        return;
      const i = {};
      if (o.candleType !== void 0 && (i.candle = {
        ...i.candle,
        type: o.candleType
      }), o.candleBarStyle !== void 0) {
        const Le = ((a = i.candle) == null ? void 0 : a.bar) || {};
        i.candle = {
          ...i.candle,
          bar: {
            ...Le,
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
              ...(C = (g = (h = i.candle) == null ? void 0 : h.priceMark) == null ? void 0 : g.last) == null ? void 0 : C.text,
              show: o.showLastPrice && !Fe().countDown
            }
          }
        }
      }), o.showHighestPrice !== void 0 && (i.candle = {
        ...i.candle,
        priceMark: {
          ...(k = i.candle) == null ? void 0 : k.priceMark,
          high: {
            ...(te = (T = i.candle) == null ? void 0 : T.priceMark) == null ? void 0 : te.high,
            show: o.showHighestPrice
          }
        }
      }), o.showLowestPrice !== void 0 && (i.candle = {
        ...i.candle,
        priceMark: {
          ...(ae = i.candle) == null ? void 0 : ae.priceMark,
          low: {
            ...(q = (se = i.candle) == null ? void 0 : se.priceMark) == null ? void 0 : q.low,
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
      var a, l, u, y, h, g, C;
      if (!n)
        return;
      n.getStyles();
      const o = {
        candle: {
          type: va.CandleSolid,
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
          type: ba.Normal,
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
      }, i = le();
      if (i) {
        const k = {
          candle: {
            type: (a = i.candle) == null ? void 0 : a.type,
            bar: (l = i.candle) == null ? void 0 : l.bar,
            priceMark: (u = i.candle) == null ? void 0 : u.priceMark
          },
          indicator: {
            lastValueMark: (y = i.indicator) == null ? void 0 : y.lastValueMark
          },
          yAxis: {
            type: (h = i.yAxis) == null ? void 0 : h.type,
            reverse: (g = i.yAxis) == null ? void 0 : g.reverse
          },
          grid: {
            show: (C = i.grid) == null ? void 0 : C.show
          }
        };
        kt(k), n.setStyles(k);
      } else
        kt(o), n.setStyles(o);
    },
    autoScalePriceAxis: () => {
      Fi();
    },
    setAutoScaleEnabled: (o) => {
      o ? Q1() : Bn();
    },
    getAutoScaleEnabled: () => Xe(),
    getCurrentPriceRange: () => En() ?? $t(),
    getManualPriceRange: () => V1(),
    setAutoScalePriceLines: (o, i = []) => {
      const a = `${o || "default"}`, l = i.filter((u) => Number.isFinite(u) && u > 0);
      l.length > 0 ? v1.set(a, l) : v1.delete(a), ke(!0);
    },
    // === Drawing Methods ===
    saveDrawings: (o) => {
      const i = Array.from(_e.values());
      i.forEach((a, l) => {
        var h;
        const u = $1(a.type), y = ((h = a.points) == null ? void 0 : h.length) || 0;
        y < u && console.warn(`âš ï¸ ${a.type} ${a.id} has only ${y} point(s), should have ${u}`);
      }), It.saveDrawings(o, i);
    },
    loadDrawings: (o) => {
      It.loadDrawings(o).forEach((a, l) => {
        var u;
        try {
          const y = {
            name: a.type,
            points: a.points || [],
            extendData: a.extendData,
            styles: a.styles,
            visible: a.visible ?? !0,
            lock: a.lock ?? !1,
            mode: a.mode ?? Yn.Normal
          }, h = n == null ? void 0 : n.createOverlay(y), g = typeof h == "string" ? h : null;
          g && (_e.set(g, {
            ...a,
            id: g
          }), b.set(g, {
            monitoring: !1,
            complete: !0,
            lastPointCount: ((u = a.points) == null ? void 0 : u.length) || 0
          }));
        } catch (y) {
          console.error(`   âŒ Error restoring ${a.type}:`, y);
        }
      });
    },
    getDrawings: (o) => It.loadDrawings(o),
    clearDrawings: (o) => {
      It.clearDrawings(o);
    },
    // Auto-save on overlay events
    enableAutoSave: (o, i = !0) => {
    }
  });
  const Gr = () => {
    n == null || n.resize(), ke(!0), rt(), no(), _t();
  };
  let H1, Y1, W1, k1 = !1, Xr = 0;
  const Gi = () => {
    if (k1 || Date.now() < Xr)
      return;
    const o = Rt();
    if (!o.enabled || o.anchorPoint === "date")
      return;
    const i = oo(o.anchorPoint, o.timestamp);
    if (Number.isFinite(i) && i !== o.timestamp) {
      const a = {
        ...o,
        timestamp: i
      };
      Kt(a), N0(a);
    }
  }, Xi = () => {
    W1 && window.clearTimeout(W1), W1 = window.setTimeout(() => {
      W1 = void 0, Gi();
    }, 80);
  }, Jr = () => {
    ke(), rt(), no(), _t(), Xi();
  }, eo = [Et.OnVisibleRangeChange, Et.OnZoom, Et.OnScroll], Ji = (o) => {
    const i = new Date(o), a = i.getFullYear(), l = `${i.getMonth() + 1}`.padStart(2, "0"), u = `${i.getDate()}`.padStart(2, "0"), y = `${i.getHours()}`.padStart(2, "0"), h = `${i.getMinutes()}`.padStart(2, "0");
    return `${a}/${l}/${u} ${y}:${h}`;
  }, ea = (o) => {
    var h;
    const i = ((h = n == null ? void 0 : n.getDataList) == null ? void 0 : h.call(n)) ?? [];
    if (i.length === 0)
      return null;
    let a = i[0], l = 0, u = Number(a == null ? void 0 : a.timestamp), y = Math.abs(u - o);
    for (let g = 1; g < i.length; g += 1) {
      const C = i[g], k = Number(C == null ? void 0 : C.timestamp);
      if (!Number.isFinite(k))
        continue;
      const T = Math.abs(k - o);
      T < y && (a = C, l = g, u = k, y = T);
    }
    return a && Number.isFinite(u) ? {
      candle: a,
      dataIndex: l
    } : null;
  }, ta = (o) => {
    var a;
    const i = ((a = n == null ? void 0 : n.getDataList) == null ? void 0 : a.call(n)) ?? [];
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
  }, q1 = (o) => {
    var a;
    const i = ((a = n == null ? void 0 : n.getDataList) == null ? void 0 : a.call(n)) ?? [];
    return i.length === 0 || !Number.isFinite(o) || o < 0 ? -1 : Math.max(0, Math.min(i.length - 1, o + 1));
  }, to = (o) => {
    var ae, se, q;
    if (!n || !t)
      return null;
    const i = ea(o), a = i == null ? void 0 : i.candle, l = Number((a == null ? void 0 : a.timestamp) ?? o), u = Number((a == null ? void 0 : a.high) ?? (a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.open)), y = i ? q1(i.dataIndex) : void 0, h = i && Number.isFinite(u) ? {
      dataIndex: y,
      value: u
    } : {
      timestamp: l
    }, g = (ae = n.convertToPixel) == null ? void 0 : ae.call(n, [h], {
      paneId: "candle_pane",
      absolute: !0
    }), C = Number((se = g == null ? void 0 : g[0]) == null ? void 0 : se.x), k = Number((q = g == null ? void 0 : g[0]) == null ? void 0 : q.y), T = t.clientWidth, te = t.clientHeight;
    return !Number.isFinite(C) || C < -80 || C > T + 80 ? null : {
      timestamp: l,
      text: Ji(l),
      left: Math.max(58, Math.min(C, T - 58)),
      top: Number.isFinite(k) ? Math.max(8, Math.min(k - 42, te - 38)) : 10
    };
  }, no = () => {
    const o = y1();
    if (!o || !n || !t)
      return;
    const i = to(o.timestamp);
    i && F1(i);
  }, G1 = (o, i = 0) => {
    if (!n || !t)
      return;
    const a = to(o);
    if (a) {
      F1(a);
      return;
    }
    i < 6 && (Y1 = window.setTimeout(() => G1(o, i + 1), 80));
  }, Qn = (o, i, a) => {
    let l = i, u = l;
    switch (o.timespan) {
      case "minute": {
        l = l - l % (60 * 1e3), u = l - a * o.multiplier * 60 * 1e3;
        break;
      }
      case "hour": {
        l = l - l % (60 * 60 * 1e3), u = l - a * o.multiplier * 60 * 60 * 1e3;
        break;
      }
      case "day": {
        l = l - l % (60 * 60 * 1e3), u = l - a * o.multiplier * 24 * 60 * 60 * 1e3;
        break;
      }
      case "week": {
        const h = new Date(l).getDay(), g = h === 0 ? 6 : h - 1;
        l = l - g * 60 * 60 * 24;
        const C = new Date(l);
        l = (/* @__PURE__ */ new Date(`${C.getFullYear()}-${C.getMonth() + 1}-${C.getDate()}`)).getTime(), u = a * o.multiplier * 7 * 24 * 60 * 60 * 1e3;
        break;
      }
      case "month": {
        const y = new Date(l), h = y.getFullYear(), g = y.getMonth() + 1;
        l = (/* @__PURE__ */ new Date(`${h}-${g}-01`)).getTime(), u = a * o.multiplier * 30 * 24 * 60 * 60 * 1e3;
        const C = new Date(u);
        u = (/* @__PURE__ */ new Date(`${C.getFullYear()}-${C.getMonth() + 1}-01`)).getTime();
        break;
      }
      case "year": {
        const h = new Date(l).getFullYear();
        l = (/* @__PURE__ */ new Date(`${h}-01-01`)).getTime(), u = a * o.multiplier * 365 * 24 * 60 * 60 * 1e3;
        const g = new Date(u);
        u = (/* @__PURE__ */ new Date(`${g.getFullYear()}-01-01`)).getTime();
        break;
      }
    }
    return [u, l];
  }, na = (o, i = 500) => {
    const a = ln(z()), l = Math.max(1, Math.floor(i / 2)) * a;
    return {
      from: o - l,
      to: o + l
    };
  }, ra = (o, i, a = 600) => {
    const l = ln(i), u = Math.max(120, a);
    let y = 0.5;
    o.anchorPoint === "left" ? y = 0.12 : o.anchorPoint === "right" && (y = 0.88);
    const h = Math.max(20, Math.floor(u * y)), g = Math.max(20, u - h);
    return {
      from: o.timestamp - h * l,
      to: Math.min(Date.now(), o.timestamp + g * l)
    };
  }, oa = (o) => {
    const i = new Date(o.from), a = new Date(o.to);
    return {
      from: new Date(i.getFullYear(), i.getMonth(), i.getDate(), 0, 0, 0, 0).getTime(),
      to: new Date(a.getFullYear(), a.getMonth(), a.getDate(), 23, 59, 59, 999).getTime()
    };
  }, ia = (o, i) => {
    const a = Math.min(i.from, i.to), l = Math.max(i.from, i.to);
    return o.filter((u) => {
      const y = Number(u.timestamp);
      return y >= a && y <= l;
    });
  }, aa = (o, i) => {
    var l;
    const a = Math.max(i.from, i.to);
    for (let u = o.length - 1; u >= 0; u -= 1) {
      const y = Number((l = o[u]) == null ? void 0 : l.timestamp);
      if (Number.isFinite(y) && y <= a)
        return y;
    }
    return a;
  }, sa = (o, i) => {
    var l;
    const a = Math.max(i.from, i.to);
    for (let u = o.length - 1; u >= 0; u -= 1) {
      const y = Number((l = o[u]) == null ? void 0 : l.timestamp);
      if (Number.isFinite(y) && y <= a)
        return u;
    }
    return o.length - 1;
  }, la = (o, i) => {
    const a = ln(i), l = Math.abs(o.to - o.from), u = Math.max(1, Math.ceil(l / a) + 1), y = Math.max(u, 120) * a;
    return {
      from: o.from,
      to: Math.max(o.to, Math.min(Date.now(), o.to + y))
    };
  }, ca = (o) => {
    var y, h;
    if (!n || !t || o.length === 0)
      return;
    const i = ((y = n.getSize("candle_pane", Je.YAxis)) == null ? void 0 : y.width) ?? 0, a = ((h = n.getSize("candle_pane", Je.Main)) == null ? void 0 : h.width) ?? t.clientWidth - i, l = Math.max(1, a - 8), u = Math.max(2, l / Math.max(1, o.length));
    n.setOffsetRightDistance(0), n.setLeftMinVisibleBarCount(0), n.setRightMinVisibleBarCount(0), n.setBarSpace(u);
  }, Zn = (o) => {
    var i;
    !n || !Number.isFinite(o) || ((i = n.scrollToTimestamp) == null || i.call(n, o, 250), requestAnimationFrame(() => G1(o)), rt());
  }, ro = (o, i = "floor") => {
    var y, h, g;
    const a = ((y = n == null ? void 0 : n.getDataList) == null ? void 0 : y.call(n)) ?? [];
    if (a.length === 0 || !Number.isFinite(o))
      return -1;
    if (i === "floor")
      for (let C = a.length - 1; C >= 0; C -= 1) {
        const k = Number((h = a[C]) == null ? void 0 : h.timestamp);
        if (Number.isFinite(k) && k <= o)
          return C;
      }
    let l = 0, u = 1 / 0;
    for (let C = 0; C < a.length; C += 1) {
      const k = Number((g = a[C]) == null ? void 0 : g.timestamp);
      if (!Number.isFinite(k))
        continue;
      const T = Math.abs(k - o);
      (T < u || T === u && k > o) && (u = T, l = C);
    }
    return u === 1 / 0 ? -1 : l;
  }, Hn = (o) => {
    var C, k, T;
    if (!n || !t)
      return null;
    const i = (C = n.getDom) == null ? void 0 : C.call(n, "candle_pane", Je.Main), a = (k = i == null ? void 0 : i.getBoundingClientRect) == null ? void 0 : k.call(i), l = (T = r == null ? void 0 : r.getBoundingClientRect) == null ? void 0 : T.call(r), u = t.getBoundingClientRect(), y = a && Number.isFinite(a.left) ? a.left - ((l == null ? void 0 : l.left) ?? u.left) : u.left - ((l == null ? void 0 : l.left) ?? u.left), h = n.getSize("candle_pane", Je.Main), g = (a == null ? void 0 : a.width) ?? (h == null ? void 0 : h.width) ?? t.clientWidth;
    return o === "left" ? Math.max(8, y) : o === "center" ? y + g / 2 : o === "right" ? y + g : null;
  }, oo = (o, i) => {
    var k, T, te, ae, se, q;
    const a = Hn(o), l = ((k = n == null ? void 0 : n.getDataList) == null ? void 0 : k.call(n)) ?? [];
    if (!n || a === null || l.length === 0)
      return i;
    const u = (T = n.convertFromPixel) == null ? void 0 : T.call(n, [{
      x: a,
      y: 0
    }], {
      paneId: "candle_pane",
      absolute: !0
    }), y = Number((te = u == null ? void 0 : u[0]) == null ? void 0 : te.dataIndex), h = Math.max(0, Math.min(l.length - 1, Number.isFinite(y) ? Math.round(y) : -1)), g = ta(i);
    if (g) {
      const fe = q1(g.dataIndex), Le = (ae = n.convertToPixel) == null ? void 0 : ae.call(n, [{
        dataIndex: fe
      }], {
        paneId: "candle_pane",
        absolute: !0
      }), we = Number((se = Le == null ? void 0 : Le[0]) == null ? void 0 : se.x), De = n.getBarSpace, X = typeof De == "function" ? De.call(n) : void 0, Ae = Number(typeof X == "object" ? X == null ? void 0 : X.bar : X), Ce = Number.isFinite(Ae) ? Math.max(2, Ae / 2) : 8;
      if (Number.isFinite(we) && Math.abs(we - a) <= Ce)
        return i;
    }
    const C = Number((q = l[h]) == null ? void 0 : q.timestamp);
    return Number.isFinite(C) ? C : i;
  }, io = (o) => {
    if (!n || !Number.isFinite(o.timestamp))
      return;
    if (k1 = !0, Xr = Date.now() + 1e3, o.anchorPoint === "date") {
      Zn(o.timestamp), window.setTimeout(() => {
        k1 = !1;
      }, 1e3);
      return;
    }
    const i = ro(o.timestamp, "nearest"), a = q1(i), l = Hn(o.anchorPoint);
    if (a < 0 || l === null) {
      Zn(o.timestamp), window.setTimeout(() => {
        k1 = !1;
      }, 1e3);
      return;
    }
    n.scrollToDataIndex(a, 0), requestAnimationFrame(() => {
      var h, g;
      const u = (h = n == null ? void 0 : n.convertToPixel) == null ? void 0 : h.call(n, [{
        dataIndex: a
      }], {
        paneId: "candle_pane",
        absolute: !0
      }), y = Number((g = u == null ? void 0 : u[0]) == null ? void 0 : g.x);
      Number.isFinite(y) && (n == null || n.scrollByDistance(l - y, 0)), requestAnimationFrame(() => {
        _t(o), G1(o.timestamp), window.setTimeout(() => {
          k1 = !1;
        }, 1e3);
      });
    }), rt();
  }, ua = (o) => {
    var h, g;
    if (!n || !t)
      return null;
    const i = Hn(o.anchorPoint);
    if (i !== null)
      return i;
    const a = q1(ro(o.timestamp, "nearest")), l = a >= 0 ? {
      dataIndex: a
    } : {
      timestamp: o.timestamp
    }, u = (h = n.convertToPixel) == null ? void 0 : h.call(n, [l], {
      paneId: "candle_pane",
      absolute: !0
    }), y = Number((g = u == null ? void 0 : u[0]) == null ? void 0 : g.x);
    return !Number.isFinite(y) || y < -2 || y > t.clientWidth + 2 ? null : y;
  }, _t = (o) => {
    var T, te, ae, se;
    const i = o ?? Rt();
    if (!n || !i.enabled || !i.anchorLine) {
      Nt(null);
      return;
    }
    const a = ua(i), l = (T = n.getDom) == null ? void 0 : T.call(n, "candle_pane", Je.Main), u = (te = l == null ? void 0 : l.getBoundingClientRect) == null ? void 0 : te.call(l), y = (ae = r == null ? void 0 : r.getBoundingClientRect) == null ? void 0 : ae.call(r), h = (se = t == null ? void 0 : t.getBoundingClientRect) == null ? void 0 : se.call(t), g = n.getSize("candle_pane", Je.Main), C = u && Number.isFinite(u.top) ? u.top - ((y == null ? void 0 : y.top) ?? (h == null ? void 0 : h.top) ?? 0) : 0, k = Math.max(1, (u == null ? void 0 : u.height) ?? (g == null ? void 0 : g.height) ?? 0);
    if (a === null) {
      Nt(null);
      return;
    }
    Nt({
      left: a,
      top: C,
      height: k
    });
  }, ao = async (o, i) => {
    if (n) {
      v(!0), jt(!0);
      try {
        const a = z(), l = o.from <= o.to ? o : {
          from: o.to,
          to: o.from
        }, u = oa(l), y = i ? u : la(u, a), h = await e.datafeed.getHistoryKLineData(I(), a, y.from, y.to), g = ia(h, u);
        n.applyNewData(h, h.length > 0), ke(!0), Ct(u), requestAnimationFrame(() => {
          const C = sa(h, u);
          i ? Zn(i) : (ca(g), n == null || n.scrollToDataIndex(C, 0), G1(aa(g, u))), _t();
        });
      } finally {
        v(!1), jt(!1);
      }
    }
  }, da = async (o) => {
    be(o), await ao(na(o), o);
  }, ha = (o) => {
    const a = {
      ...o,
      timestamp: (() => !n || o.anchorPoint === "date" ? o.timestamp : oo(o.anchorPoint, o.timestamp))()
    };
    Kt(a), N0(a), a.enabled ? (be(a.timestamp), requestAnimationFrame(() => {
      io(a), _t(a);
    })) : requestAnimationFrame(() => _t(a));
  };
  Cr(() => {
    if (window.addEventListener("resize", Gr), n = pa(t, {
      customApi: {
        formatDate: (h, g, C, k) => {
          switch (z().timespan) {
            case "minute":
              return k === J1.XAxis ? D.formatDate(h, g, "HH:mm") : D.formatDate(h, g, "YYYY-MM-DD HH:mm");
            case "hour":
              return k === J1.XAxis ? D.formatDate(h, g, "MM-DD HH:mm") : D.formatDate(h, g, "YYYY-MM-DD HH:mm");
            case "day":
            case "week":
              return D.formatDate(h, g, "YYYY-MM-DD");
            case "month":
              return k === J1.XAxis ? D.formatDate(h, g, "YYYY-MM") : D.formatDate(h, g, "YYYY-MM-DD");
            case "year":
              return k === J1.XAxis ? D.formatDate(h, g, "YYYY") : D.formatDate(h, g, "YYYY-MM-DD");
          }
          return D.formatDate(h, g, "YYYY-MM-DD HH:mm");
        }
      }
    }), n) {
      const h = n.getDom("candle_pane", Je.Main);
      if (h) {
        let C = document.createElement("div");
        if (C.className = "klinecharts-pro-watermark", D.isString(e.watermark)) {
          const k = e.watermark.replace(/(^\s*)|(\s*$)/g, "");
          C.innerHTML = k;
        } else
          C.appendChild(e.watermark);
        h.appendChild(C);
      }
      const g = n.getDom("candle_pane", Je.YAxis);
      s = document.createElement("span"), s.className = "klinecharts-pro-price-unit", g == null || g.appendChild(s), bt = Ti(), ke(!0);
    }
    let o = !1;
    const i = () => {
      const h = I();
      if (h != null && h.ticker)
        try {
          const g = Array.from(_e.values());
          It.saveDrawings(h.ticker, g);
        } catch (g) {
          console.error("âŒ Error refreshing local storage:", g);
        }
    }, a = (h) => {
      o || (o = !0, h.preventDefault());
    };
    setTimeout(() => {
      t && t.addEventListener("contextmenu", a);
    }, 1e3), document.addEventListener("contextmenu", (h) => {
      t && t.contains(h.target) && a(h);
    });
    const l = n == null ? void 0 : n.removeOverlay;
    n && l && (n.removeOverlay = function(...h) {
      const g = l.apply(this, h), C = h[0];
      let k;
      if (typeof C == "string" ? k = C : C && typeof C == "object" && C.id && (k = C.id), k) {
        _e.delete(k);
        const T = b.get(k);
        T && (T.checkInterval && clearInterval(T.checkInterval), T.mouseUpHandler && (document.removeEventListener("mouseup", T.mouseUpHandler), document.removeEventListener("touchend", T.mouseUpHandler)), b.delete(k)), i(), ke(!0);
      }
      return g;
    }), ve().forEach((h) => {
      sn(n, h, !0, {
        id: "candle_pane"
      });
    });
    const u = {};
    e.subIndicators.forEach((h) => {
      const g = sn(n, h, !0);
      g && (u[h] = g);
    }), J(u), n == null || n.loadMore((h) => {
      v(!0), (async () => {
        try {
          const C = z(), [k] = Qn(C, h, 1), [T] = Qn(C, k, 500), te = await e.datafeed.getHistoryKLineData(I(), C, T, k);
          n == null || n.applyMoreData(te, te.length > 0), ke(!0);
        } finally {
          v(!1);
        }
      })();
    }), n == null || n.subscribeAction(Et.OnTooltipIconClick, (h) => {
      if (h.indicatorName)
        switch (h.iconId) {
          case "visible": {
            n == null || n.overrideIndicator({
              name: h.indicatorName,
              visible: !0
            }, h.paneId), ke(!0);
            const g = h.paneId === "candle_pane" ? "main" : "sub";
            Pe(h.indicatorName, h.paneId, g, "change");
            break;
          }
          case "invisible": {
            n == null || n.overrideIndicator({
              name: h.indicatorName,
              visible: !1
            }, h.paneId), ke(!0);
            const g = h.paneId === "candle_pane" ? "main" : "sub";
            Pe(h.indicatorName, h.paneId, g, "change");
            break;
          }
          case "setting": {
            const g = n == null ? void 0 : n.getIndicatorByPaneId(h.paneId, h.indicatorName);
            p1({
              visible: !0,
              indicatorName: h.indicatorName,
              paneId: h.paneId,
              calcParams: g.calcParams
            });
            break;
          }
          case "close":
            if (h.paneId === "candle_pane") {
              const g = [...ve()];
              n == null || n.removeIndicator("candle_pane", h.indicatorName), ke(!0), g.splice(g.indexOf(h.indicatorName), 1), W(g), Pe(h.indicatorName, "candle_pane", "main", "remove");
            } else {
              const g = {
                ...R()
              };
              n == null || n.removeIndicator(h.paneId, h.indicatorName), ke(!0), delete g[h.indicatorName], J(g), Pe(h.indicatorName, h.paneId, "sub", "remove");
            }
        }
    }), n == null || n.subscribeAction(Et.OnCrosshairChange, Or), eo.forEach((h) => {
      n == null || n.subscribeAction(h, Jr);
    }), H1 = window.setInterval(() => rt(), 1e3), rt(), document.addEventListener("mousedown", Er);
    const y = n == null ? void 0 : n.createOverlay;
    n && y && (n.createOverlay = function(...h) {
      var T;
      const g = qt(h[0]), C = y.apply(this, [g, ...h.slice(1)]), k = typeof C == "string" ? C : null;
      return k && !((T = g.extendData) != null && T.isOrderPreviewLine) && (Mi(k, g.name || "unknown"), Ot(k), _1(), ke(!0)), C;
    });
  }), Lt(() => {
    var o, i, a;
    if (window.removeEventListener("resize", Gr), n == null || n.unsubscribeAction(Et.OnCrosshairChange, Or), eo.forEach((l) => {
      n == null || n.unsubscribeAction(l, Jr);
    }), H1 && (window.clearInterval(H1), H1 = void 0), Y1 && (window.clearTimeout(Y1), Y1 = void 0), lt && (window.clearTimeout(lt), lt = void 0), ft && (window.cancelAnimationFrame(ft), ft = void 0), bt == null || bt(), bt = void 0, document.removeEventListener("mousedown", Er), f) {
      const l = f;
      l.overlayId && ((o = n == null ? void 0 : n.removeOverlay) == null || o.call(n, {
        id: l.overlayId
      })), l.previousScrollEnabled !== void 0 && ((i = n == null ? void 0 : n.setScrollEnabled) == null || i.call(n, l.previousScrollEnabled)), l.previousZoomEnabled !== void 0 && ((a = n == null ? void 0 : n.setZoomEnabled) == null || a.call(n, l.previousZoomEnabled)), f = null;
    }
    c = null, b.clear(), _e.clear(), zo(t);
  }), He(() => {
    const o = I();
    o != null && o.priceCurrency ? (s.innerHTML = o == null ? void 0 : o.priceCurrency.toLocaleUpperCase(), s.style.display = "flex") : s.style.display = "none", n == null || n.setPriceVolumePrecision((o == null ? void 0 : o.pricePrecision) ?? 2, (o == null ? void 0 : o.volumePrecision) ?? 0);
  });
  const fa = (o) => {
    const i = new Date(o), a = i.getFullYear(), l = `${i.getMonth() + 1}`.padStart(2, "0"), u = `${i.getDate()}`.padStart(2, "0"), y = `${i.getHours()}`.padStart(2, "0"), h = `${i.getMinutes()}`.padStart(2, "0"), g = `${a}-${l}-${u}`;
    switch (z().timespan) {
      case "minute":
      case "hour":
        return `${g} ${y}:${h}`;
      case "day":
      case "week":
        return g;
      case "month":
        return g;
      case "year":
        return g;
    }
    return `${g} ${y}:${h}`;
  }, ma = (o, i) => {
    var C, k;
    const {
      current: a
    } = o, l = i.tooltip.text.color, u = a.close > a.open ? i.bar.upColor : a.close < a.open ? i.bar.downColor : i.bar.noChangeColor, y = Math.min(Math.max(((C = I()) == null ? void 0 : C.pricePrecision) ?? 2, 0), 8), h = Math.min(Math.max(((k = I()) == null ? void 0 : k.volumePrecision) ?? 0, 0), 8), g = (T) => ({
      text: D.formatPrecision(T, y),
      color: u
    });
    return [{
      title: "time",
      value: {
        text: fa(a.timestamp),
        color: l
      }
    }, {
      title: "open",
      value: g(a.open)
    }, {
      title: "high",
      value: g(a.high)
    }, {
      title: "low",
      value: g(a.low)
    }, {
      title: "close",
      value: g(a.close)
    }, {
      title: "volume",
      value: {
        text: D.formatBigNumber(D.formatPrecision(a.volume ?? i.tooltip.defaultValue, h)),
        color: u
      }
    }];
  }, X1 = () => {
    n == null || n.setStyles({
      candle: {
        tooltip: {
          custom: ma,
          rect: {
            offsetLeft: 0,
            paddingLeft: 0
          }
        }
      }
    });
  };
  return He((o) => {
    const i = I(), a = z();
    let l = !0;
    return Lt(() => {
      l = !1;
    }), o && e.datafeed.unsubscribe(o.symbol, o.period), v(!0), jt(!0), (async () => {
      try {
        const y = dt(Rt), h = y.enabled && (!o || o.symbol.ticker === i.ticker || y.acrossTokens), g = h ? ra(y, a) : null, [C, k] = g ? [g.from, g.to] : Qn(a, (/* @__PURE__ */ new Date()).getTime(), 500), T = await e.datafeed.getHistoryKLineData(i, a, C, k);
        if (!l)
          return;
        n == null || n.applyNewData(T, T.length > 0), ke(!0), h ? requestAnimationFrame(() => {
          io(y), _t(y);
        }) : _t(), rt(), setTimeout(() => {
          l && (Ei(i == null ? void 0 : i.ticker), rt());
        }, 0), e.datafeed.subscribe(i, a, (te) => {
          n == null || n.updateData(te), ke(), rt();
        });
      } finally {
        l && (v(!1), jt(!1));
      }
    })(), {
      symbol: i,
      period: a
    };
  }), He(() => {
    const o = L();
    n == null || n.setStyles(o);
    const i = o === "dark" ? "#929AA5" : "#76808F";
    X1(), n == null || n.setStyles({
      indicator: {
        tooltip: {
          icons: [{
            id: "visible",
            position: en.Middle,
            marginLeft: V().visibleMarginLeft,
            marginTop: V().marginTop,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: V().size,
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "invisible",
            position: en.Middle,
            marginLeft: V().secondaryMarginLeft,
            marginTop: V().marginTop,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: V().size,
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "setting",
            position: en.Middle,
            marginLeft: V().secondaryMarginLeft,
            marginTop: V().marginTop,
            marginBottom: 0,
            marginRight: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: V().size,
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "close",
            position: en.Middle,
            marginLeft: V().secondaryMarginLeft,
            marginTop: V().marginTop,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: V().size,
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }]
        }
      }
    });
  }), He(() => {
    n == null || n.setLocale(Q());
  }), He(() => {
    n == null || n.setTimezone(j().key);
  }), He(() => {
    if (w()) {
      kt(w()), n == null || n.setStyles(w()), ee(Sc(n.getStyles()));
      const o = B();
      if (o) {
        $e(o);
        const i = ge(o);
        kt(i), n == null || n.setStyles(i);
      }
      X1();
    }
  }), [Sy.cloneNode(!0), A(jf, {
    get locale() {
      return e.locale;
    },
    get symbol() {
      return I();
    },
    get spread() {
      return St();
    },
    get period() {
      return z();
    },
    get periods() {
      return e.periods;
    },
    onMenuClick: async () => {
      try {
        await ja(() => Mn(!St())), n == null || n.resize();
      } catch {
      }
    },
    onSymbolClick: () => {
      N1(!u1());
    },
    get onMobilePeriodClick() {
      return e.onMobilePeriodClick;
    },
    onMobileMoreClick: () => {
      e.onMobileMoreClick ? e.onMobileMoreClick() : d1(!0);
    },
    onPeriodChange: ce,
    onTimeToolsClick: () => {
      be(Date.now()), Me(!0);
    },
    onIndicatorClick: () => {
      Y((o) => !o);
    },
    onTimezoneClick: () => {
      S((o) => !o);
    },
    onSettingClick: () => {
      ie((o) => !o);
    },
    onScreenshotClick: () => {
      if (n) {
        const o = e.screenshotBackgroundColor || (e.theme === "dark" ? "#11131E" : "#ffffff"), i = n.getConvertPictureUrl(!0, "jpeg", o);
        x(i);
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
      return Fe();
    },
    onOrderToolsStateChange: zn
  }), (() => {
    const o = Ty.cloneNode(!0), i = o.firstChild, a = i.nextSibling;
    return o.addEventListener("mouseleave", () => {
      Mt(null), Ge(!1);
    }), xt((l) => r = l, o), i.$$click = (l) => {
      l.preventDefault(), l.stopPropagation(), Si();
    }, i.$$mousedown = (l) => {
      l.preventDefault(), l.stopPropagation();
    }, p(o, A(he, {
      get when() {
        return O1();
      },
      get children() {
        return A(yi, {});
      }
    }), a), p(o, A(he, {
      get when() {
        return St();
      },
      get children() {
        return A($g, {
          get locale() {
            return e.locale;
          },
          onDrawingItemClick: (l) => {
            if (Di(l)) {
              c = l;
              return;
            }
            c = null, n == null || n.createOverlay(qt(l));
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
          onRemoveClick: () => {
            Pi();
          }
        });
      }
    }), a), a.addEventListener("lostpointercapture", (l) => Un(l)), a.addEventListener("pointercancel", (l) => Un(l, !0)), a.$$pointerup = (l) => Un(l), a.$$pointermove = Ii, a.$$pointerdown = Oi, xt((l) => t = l, a), p(o, A(he, {
      get when() {
        return U1();
      },
      keyed: !0,
      children: (l) => (() => {
        const u = My.cloneNode(!0);
        return U((y) => {
          const h = `${l.left}px`, g = `${l.top}px`, C = `${l.height}px`;
          return h !== y._v$6 && u.style.setProperty("left", y._v$6 = h), g !== y._v$7 && u.style.setProperty("top", y._v$7 = g), C !== y._v$8 && u.style.setProperty("height", y._v$8 = C), y;
        }, {
          _v$6: void 0,
          _v$7: void 0,
          _v$8: void 0
        }), u;
      })()
    }), null), p(o, A(he, {
      get when() {
        return y1();
      },
      keyed: !0,
      children: (l) => (() => {
        const u = Py.cloneNode(!0);
        return p(u, () => l.text), U((y) => {
          const h = `${l.left}px`, g = `${l.top}px`;
          return h !== y._v$9 && u.style.setProperty("left", y._v$9 = h), g !== y._v$10 && u.style.setProperty("top", y._v$10 = g), y;
        }, {
          _v$9: void 0,
          _v$10: void 0
        }), u;
      })()
    }), null), p(o, A(he, {
      get when() {
        return B1();
      },
      keyed: !0,
      children: (l) => (() => {
        const u = Dy.cloneNode(!0), y = u.firstChild, h = y.nextSibling;
        return u.style.setProperty("right", "0px"), p(y, () => l.priceText), p(h, () => l.text), U((g) => {
          const C = `${l.top}px`, k = `${l.width}px`, T = l.color, te = `${l.borderRadius}px`, ae = l.textFamily, se = l.textWeight, q = `${l.paddingLeft}px`, fe = `${l.paddingRight}px`, Le = `${l.paddingTop}px`, we = `${l.paddingBottom}px`, De = `${l.textSize}px`, X = `${Math.max(10, l.textSize - 1)}px`;
          return C !== g._v$11 && u.style.setProperty("top", g._v$11 = C), k !== g._v$12 && u.style.setProperty("width", g._v$12 = k), T !== g._v$13 && u.style.setProperty("background", g._v$13 = T), te !== g._v$14 && u.style.setProperty("border-radius", g._v$14 = te), ae !== g._v$15 && u.style.setProperty("font-family", g._v$15 = ae), se !== g._v$16 && u.style.setProperty("font-weight", g._v$16 = se), q !== g._v$17 && u.style.setProperty("padding-left", g._v$17 = q), fe !== g._v$18 && u.style.setProperty("padding-right", g._v$18 = fe), Le !== g._v$19 && u.style.setProperty("padding-top", g._v$19 = Le), we !== g._v$20 && u.style.setProperty("padding-bottom", g._v$20 = we), De !== g._v$21 && y.style.setProperty("font-size", g._v$21 = De), X !== g._v$22 && h.style.setProperty("font-size", g._v$22 = X), g;
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
    }), null), p(o, A(he, {
      get when() {
        return Ke();
      },
      keyed: !0,
      children: (l) => (() => {
        const u = Ey.cloneNode(!0), y = u.firstChild, h = y.nextSibling, g = h.nextSibling, C = g.firstChild, k = g.nextSibling, T = k.firstChild, te = T.firstChild, ae = te.nextSibling, se = ae.firstChild, q = k.nextSibling, fe = q.firstChild, Le = q.nextSibling, we = Le.nextSibling, De = we.nextSibling;
        return u.$$click = (X) => {
          X.stopPropagation();
        }, u.$$mousedown = (X) => {
          X.preventDefault(), X.stopPropagation();
        }, y.$$mousedown = Wi, h.$$click = Hi, C.$$click = () => Ze(We() === "color" ? null : "color"), p(g, A(he, {
          get when() {
            return We() === "color";
          },
          get children() {
            const X = Ny.cloneNode(!0), Ae = X.firstChild;
            return p(Ae, A(M1, {
              each: In,
              children: (Ce) => (() => {
                const Ne = By.cloneNode(!0);
                return Ne.$$click = () => Yi(Ce), Ne.style.setProperty("background", Ce), U(() => me(Ne, `overlay-toolbar-color-swatch ${l.color.toLowerCase() === Ce.toLowerCase() ? "selected" : ""}`)), Ne;
              })()
            })), X;
          }
        }), null), T.$$click = () => Ze(We() === "width" ? null : "width"), p(ae, () => l.lineSize, se), p(k, A(he, {
          get when() {
            return We() === "width";
          },
          get children() {
            const X = Oy.cloneNode(!0);
            return p(X, A(M1, {
              each: [1, 2, 3, 4],
              children: (Ae) => (() => {
                const Ce = Fy.cloneNode(!0), Ne = Ce.firstChild;
                return Ce.$$click = () => Zi(Ae), Ne.style.setProperty("height", `${Ae}px`), U(() => me(Ce, l.lineSize === Ae ? "selected" : "")), Ce;
              })()
            })), X;
          }
        }), null), fe.$$click = () => Ze(We() === "style" ? null : "style"), p(q, A(he, {
          get when() {
            return We() === "style";
          },
          get children() {
            const X = Iy.cloneNode(!0), Ae = X.firstChild, Ce = Ae.nextSibling, Ne = Ce.nextSibling;
            return Ae.$$click = () => jn(Ve.Solid, []), Ce.$$click = () => jn(Ve.Dashed, [6, 4]), Ne.$$click = () => jn(Ve.Dashed, [2, 4]), U((Ie) => {
              var at, st;
              const ot = l.lineStyle === Ve.Solid ? "selected" : "", ct = l.lineStyle === Ve.Dashed && ((at = l.dashedValue) == null ? void 0 : at[0]) === 6 ? "selected" : "", it = l.lineStyle === Ve.Dashed && ((st = l.dashedValue) == null ? void 0 : st[0]) === 2 ? "selected" : "";
              return ot !== Ie._v$23 && me(Ae, Ie._v$23 = ot), ct !== Ie._v$24 && me(Ce, Ie._v$24 = ct), it !== Ie._v$25 && me(Ne, Ie._v$25 = it), Ie;
            }, {
              _v$23: void 0,
              _v$24: void 0,
              _v$25: void 0
            }), X;
          }
        }), null), Le.$$click = Qi, we.$$click = ji, De.$$click = Ki, U((X) => {
          const Ae = `${l.x}px`, Ce = `${l.y}px`, Ne = `overlay-toolbar-icon edit ${We() === "color" ? "active" : ""}`, Ie = `overlay-toolbar-line-size ${We() === "width" ? "active" : ""}`, ot = `overlay-toolbar-icon minus ${We() === "style" ? "active" : ""}`, ct = `overlay-toolbar-icon visibility ${l.visible ? "" : "muted"}`, it = l.visible ? "Hide" : "Show", at = `overlay-toolbar-icon lock ${l.locked ? "active" : ""}`, st = l.locked ? "Unlock" : "Lock";
          return Ae !== X._v$26 && u.style.setProperty("left", X._v$26 = Ae), Ce !== X._v$27 && u.style.setProperty("top", X._v$27 = Ce), Ne !== X._v$28 && me(C, X._v$28 = Ne), Ie !== X._v$29 && me(T, X._v$29 = Ie), ot !== X._v$30 && me(fe, X._v$30 = ot), ct !== X._v$31 && me(Le, X._v$31 = ct), it !== X._v$32 && Oe(Le, "title", X._v$32 = it), at !== X._v$33 && me(we, X._v$33 = at), st !== X._v$34 && Oe(we, "title", X._v$34 = st), X;
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
    }), null), p(o, A(he, {
      get when() {
        return pt();
      },
      keyed: !0,
      children: (l) => (() => {
        const u = Uy.cloneNode(!0), y = u.firstChild;
        return u.addEventListener("mouseleave", () => {
          Pt() || Ge(!1);
        }), u.$$mousemove = (h) => {
          h.stopPropagation(), Wt();
        }, u.addEventListener("mouseenter", () => {
          Ge(!0), Wt();
        }), y.$$click = (h) => {
          h.stopPropagation(), Ge(!0), vt({
            y: l.y,
            price: l.price,
            yAxisWidth: h1()
          }), nt(!0), Wt();
        }, y.$$mousedown = (h) => {
          h.preventDefault(), h.stopPropagation(), Wt();
        }, p(y, (() => {
          const h = H(() => {
            var g;
            return !!((g = e.orderTools) != null && g.quickOrderPlusIcon);
          });
          return () => h() ? (() => {
            const g = zy.cloneNode(!0);
            return U(() => g.innerHTML = e.orderTools.quickOrderPlusIcon), g;
          })() : Vy.cloneNode(!0);
        })()), U((h) => {
          const g = `${Math.max(0, l.y - 12)}px`, C = `${h1()}px`, k = Fe().quickOrderPlusButton ? "block" : "none";
          return g !== h._v$35 && u.style.setProperty("top", h._v$35 = g), C !== h._v$36 && u.style.setProperty("right", h._v$36 = C), k !== h._v$37 && u.style.setProperty("display", h._v$37 = k), h;
        }, {
          _v$35: void 0,
          _v$36: void 0,
          _v$37: void 0
        }), u;
      })()
    }), null), p(o, A(he, {
      get when() {
        return H(() => !!Pt())() && Dt();
      },
      keyed: !0,
      children: (l) => (() => {
        const u = Ry.cloneNode(!0), y = u.firstChild, h = y.firstChild, g = h.firstChild, C = g.nextSibling, k = C.nextSibling, T = k.nextSibling;
        T.nextSibling;
        const te = h.nextSibling, ae = te.firstChild, se = ae.nextSibling, q = se.nextSibling, fe = q.nextSibling;
        fe.nextSibling;
        const Le = te.nextSibling, we = Le.nextSibling, De = we.firstChild, X = De.nextSibling;
        X.nextSibling;
        const Ae = we.nextSibling;
        return Ae.firstChild, u.addEventListener("mouseleave", () => Ge(!1)), u.addEventListener("mouseenter", () => Ge(!0)), y.$$mousemove = () => {
          Wt();
        }, y.$$mousedown = (Ce) => {
          Ce.preventDefault(), Ce.stopPropagation(), Wt();
        }, h.$$click = () => Rn("limit"), p(h, () => I().shortName ?? I().name ?? I().ticker, C), p(h, () => Z1(l.price), T), te.$$click = () => Rn("stop"), p(te, () => I().shortName ?? I().name ?? I().ticker, se), p(te, () => Z1(l.price), fe), Le.$$click = () => Rn("create"), we.$$click = zi, p(we, () => Z1(l.price), X), Ae.$$click = Vi, p(Ae, () => Z1(l.price), null), U((Ce) => {
          const Ne = `${Math.max(0, l.y + 24)}px`, Ie = `${l.yAxisWidth + On}px`;
          return Ne !== Ce._v$38 && u.style.setProperty("top", Ce._v$38 = Ne), Ie !== Ce._v$39 && u.style.setProperty("right", Ce._v$39 = Ie), Ce;
        }, {
          _v$38: void 0,
          _v$39: void 0
        }), u;
      })()
    }), null), U((l) => {
      const u = `klinecharts-pro-auto-scale-button${Xe() ? " active" : ""}`, y = Xe(), h = Xe(), g = Xe() ? "Auto scale on" : "Auto scale off", C = St();
      return u !== l._v$ && me(i, l._v$ = u), y !== l._v$2 && Oe(i, "data-active", l._v$2 = y), h !== l._v$3 && Oe(i, "aria-pressed", l._v$3 = h), g !== l._v$4 && Oe(i, "title", l._v$4 = g), C !== l._v$5 && Oe(a, "data-drawing-bar-visible", l._v$5 = C), l;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0,
      _v$5: void 0
    }), o;
  })(), A(he, {
    get when() {
      return u1();
    },
    get children() {
      return A(ry, {
        get locale() {
          return e.locale;
        },
        get datafeed() {
          return e.datafeed;
        },
        onSymbolSelected: (o) => {
          K(o);
        },
        onClose: () => {
          N1(!1);
        }
      });
    }
  }), A(he, {
    get when() {
      return oe();
    },
    get children() {
      return A(_g, {
        get locale() {
          return e.locale;
        },
        get mainIndicators() {
          return ve();
        },
        get subIndicators() {
          return R();
        },
        onClose: () => {
          Y(!1);
        },
        onMainIndicatorChange: (o) => {
          const i = [...ve()];
          o.added ? (sn(n, o.name, !0, {
            id: "candle_pane"
          }), i.push(o.name), Pe(o.name, "candle_pane", "main", "add")) : (n == null || n.removeIndicator("candle_pane", o.name), i.splice(i.indexOf(o.name), 1), Pe(o.name, "candle_pane", "main", "remove")), W(i), ke(!0);
        },
        onSubIndicatorChange: (o) => {
          const i = {
            ...R()
          };
          if (o.added) {
            const a = sn(n, o.name);
            a && (i[o.name] = a, Pe(o.name, a, "sub", "add"));
          } else
            o.paneId && (n == null || n.removeIndicator(o.paneId, o.name), delete i[o.name], Pe(o.name, o.paneId, "sub", "remove"));
          J(i), ke(!0);
        }
      });
    }
  }), A(he, {
    get when() {
      return ue();
    },
    get children() {
      return A(xg, {
        get locale() {
          return e.locale;
        },
        get timezone() {
          return j();
        },
        onClose: () => {
          S(!1);
        },
        onConfirm: Z
      });
    }
  }), A(he, {
    get when() {
      return F();
    },
    get children() {
      return A(Hg, {
        get locale() {
          return e.locale;
        },
        get currentStyles() {
          return D.clone(n.getStyles());
        },
        get defaultStyles() {
          return le();
        },
        get currentBackgroundColor() {
          return pe();
        },
        get defaultBackgroundColor() {
          return O();
        },
        onClose: () => {
          ie(!1);
        },
        onChange: (o) => {
          const i = o;
          $e(i);
          const a = ge(i);
          kt(a), n == null || n.setStyles(a), n == null || n.resize(), X1();
        },
        onSaveChartStyle: (o) => {
          ne(o);
        },
        onResetChartStyle: () => {
          G(), t == null || t.style.removeProperty("--klinecharts-pro-chart-background-color");
        },
        onRestoreDefault: (o) => {
          const i = {};
          o.forEach((l) => {
            const u = l.key;
            if (u === "chart.backgroundColor") {
              Ee(i, u, O());
              return;
            }
            Ee(i, u, D.formatValue(le(), u));
          }), $e(i);
          const a = ge(i);
          kt(a), n == null || n.setStyles(a), n == null || n.resize(), X1();
        }
      });
    }
  }), A(he, {
    get when() {
      return je().length > 0;
    },
    get children() {
      return A(Wg, {
        get locale() {
          return e.locale;
        },
        get url() {
          return je();
        },
        onClose: () => {
          x("");
        }
      });
    }
  }), A(he, {
    get when() {
      return ye();
    },
    get children() {
      return A(ky, {
        get initialTimestamp() {
          return tt();
        },
        get initialRange() {
          return yt();
        },
        get anchorSettings() {
          return Rt();
        },
        onClose: () => {
          Me(!1);
        },
        onGoToDate: da,
        onTimeRange: (o) => {
          ao(o);
        },
        onTimeAnchorChange: ha
      });
    }
  }), A(he, {
    get when() {
      return C1().visible;
    },
    get children() {
      return A(Jg, {
        get locale() {
          return e.locale;
        },
        get params() {
          return C1();
        },
        onClose: () => {
          p1({
            visible: !1,
            indicatorName: "",
            paneId: "",
            calcParams: []
          });
        },
        onConfirm: (o) => {
          const i = C1();
          n == null || n.overrideIndicator({
            name: i.indicatorName,
            calcParams: o
          }, i.paneId), ke(!0);
          const a = i.paneId === "candle_pane" ? "main" : "sub";
          Pe(i.indicatorName, i.paneId, a, "change");
        }
      });
    }
  }), A(he, {
    get when() {
      return Pn();
    },
    get children() {
      return A(iy, {
        get locale() {
          return e.locale;
        },
        onIndicatorClick: () => {
          Y(!0);
        },
        onTimezoneClick: () => {
          S(!0);
        },
        onSettingClick: () => {
          ie(!0);
        },
        onTimeToolsClick: () => {
          be(Date.now()), Me(!0);
        },
        onClose: () => {
          d1(!1);
        }
      });
    }
  })];
};
Ye(["mousedown", "click", "pointerdown", "pointermove", "pointerup", "mousemove"]);
const Gy = /* @__PURE__ */ _('<svg class="logo" viewBox="0 0 80 92"><path d="M28.148808359375,51.7280513671875L22.963588359375,51.7280513671875C21.572648359375002,51.7280513671875,20.445068359375,52.6220613671875,20.445068359375,53.7248813671875L20.445068359375,72.3979013671875C20.445068359375,73.5007013671875,21.572648359375002,74.39470136718751,22.963588359375,74.39470136718751L33.926568359375,74.39470136718751C35.317468359375,74.39470136718751,36.445068359375,73.5007013671875,36.445068359375,72.3979013671875L36.445068359375,53.7248813671875C36.445068359375,52.6220613671875,35.317468359375,51.7280513671875,33.926568359375,51.7280513671875L28.741398359374998,51.7280513671875L28.741398359374998,46.2963223671875C28.741398359374998,46.1665793671875,28.608748359375,46.0614013671875,28.445108359375,46.0614013671875C28.281468359375,46.0614013671875,28.148808359375,46.1665793671875,28.148808359375,46.2963223671875L28.148808359375,51.7280513671875ZM28.741398359374998,74.3948013671875L28.741398359374998,79.82650136718749C28.741398359374998,79.9563013671875,28.608748359375,80.0614013671875,28.445108359375,80.0614013671875C28.281468359375,80.0614013671875,28.148808359375,79.9563013671875,28.148808359375,79.82650136718749L28.148808359375,74.3948013671875L28.741398359374998,74.3948013671875Z"></path><path d="M51.148808359374996,44.7280513671875L45.963588359375,44.7280513671875C44.572648359375,44.7280513671875,43.445068359375,45.6220613671875,43.445068359375,46.7248813671875L43.445068359375,65.3979013671875C43.445068359375,66.5007013671875,44.572648359375,67.39470136718751,45.963588359375,67.39470136718751L56.926568359375,67.39470136718751C58.317468359375,67.39470136718751,59.445068359375,66.5007013671875,59.445068359375,65.3979013671875L59.445068359375,46.7248813671875C59.445068359375,45.6220613671875,58.317468359375,44.7280513671875,56.926568359375,44.7280513671875L51.741398359375,44.7280513671875L51.741398359375,39.2963223671875C51.741398359375,39.1665793671875,51.608748359375,39.0614013671875,51.445108359375,39.0614013671875C51.281468359375,39.0614013671875,51.148808359374996,39.1665793671875,51.148808359374996,39.2963223671875L51.148808359374996,44.7280513671875ZM51.741398359375,67.3948013671875L51.741398359375,72.82650136718749C51.741398359375,72.9563013671875,51.608748359375,73.0614013671875,51.445108359375,73.0614013671875C51.281468359375,73.0614013671875,51.148808359374996,72.9563013671875,51.148808359374996,72.82650136718749L51.148808359374996,67.3948013671875L51.741398359375,67.3948013671875Z"></path><path d="M17.7274,90.6541C17.5901,90.6541,17.4517,90.6436,17.3121,90.6225C9.93219,89.5095,4.80718,86.7136,2.07787,82.3084C-1.1223,77.1437,0.241766,71.6314,0.56829,70.5137C5.37624,46.647,15.0785,38.4945,21.5025,33.0957C22.9683,31.8633,24.2342,30.7995,25.1676,29.7672C25.4105,29.4984,25.6051,29.2154,25.7556,28.9202C24.7465,29.2231,24.1971,29.4326,24.1703,29.4429C22.908,29.9368,21.4777,29.3247,20.9761,28.076C20.4756,26.8272,21.0897,25.4146,22.352,24.9172C22.5042,24.8571,23.5312,24.4607,25.3073,23.9616C24.087,21.4425,21.7693,18.7949,19.7125,16.6431L19.2819,16.1902C16.2438,12.9776,14.6017,4.80159,14.3036,3.19471C14.1306,2.26212,14.4636,1.30796,15.1814,0.679657C15.8995,0.0512175,16.8976,-0.159672,17.8125,0.123747C22.7731,1.66274,24.2638,1.81255,27.2321,2.11098C28.7357,2.26195,29.83,3.59029,29.6762,5.07662C29.5236,6.56295,28.182,7.64786,26.6784,7.49454C24.4992,7.27569,22.9517,7.09896,20.724,6.56646C21.4493,9.09088,22.3803,11.5427,23.2771,12.4919L23.6876,12.9237C25.3757,14.69,28.9691,18.45,30.7016,22.7299C35.0392,21.9433,40.8791,21.3359,47.7817,21.7249C48.2004,20.7386,48.8054,19.7953,49.5907,18.9135C49.7137,18.7754,49.8498,18.6502,49.9988,18.539C53.6142,15.8508,57.5491,12.857,59.7803,11.0758C58.1028,11.2502,56.1034,11.0278,53.9124,9.70882C53.2439,9.30622,52.5992,8.89427,51.9662,8.48933C48.4668,6.25164,46.497,5.12109,43.4234,5.94853C41.9647,6.34058,40.4622,5.48975,40.0659,4.04789C39.6695,2.60604,40.5296,1.11853,41.9871,0.726471C47.5602,-0.773825,51.4796,1.73271,54.9364,3.9434L54.9364,3.9434C55.5284,4.32176,56.1318,4.70797,56.7564,5.08482C58.3843,6.06556,59.4858,5.76127,61.2899,5.13865C62.3511,4.77234,63.5567,4.35687,64.8675,4.53476C66.3321,4.73254,67.4406,5.56933,67.9103,6.83096C68.7444,9.07333,67.1035,11.5533,65.5797,13.2374C64.6729,14.2394,60.0845,17.7606,56.4519,20.4957C56.9477,20.3369,57.4767,20.2511,58.026,20.2511C59.4281,20.2511,60.6982,20.8102,61.621,21.7153C65.4948,20.6901,67.87,17.9563,67.9033,17.9175C68.78,16.8888,70.3322,16.7577,71.3721,17.6226C72.412,18.4886,72.5457,20.0253,71.6702,21.054C71.5221,21.2286,69.5063,23.5492,66.0787,25.233C69.5399,26.8822,72.9993,29.682,74.1841,34.4145C74.5106,35.7206,73.7062,37.0407,72.3859,37.3638C72.1871,37.4117,71.9884,37.4351,71.792,37.4351C70.687,37.4351,69.6826,36.6932,69.4046,35.5848C68.4378,31.7217,64.8144,29.7431,61.7619,28.7456C60.8298,29.7349,59.5009,30.3535,58.026,30.3535C55.8642,30.3535,54.0162,29.0245,53.2713,27.1474C53.2022,27.138,53.1331,27.1287,53.0642,27.1195C54.232,29.5936,57.0851,31.9259,58.1868,32.665C58.3157,32.7516,58.4423,32.8523,58.5547,32.9599C66.5865,40.6151,72.4887,48.8133,76.0971,57.3287C76.6815,58.7074,76.0249,60.2932,74.6313,60.8702C74.2976,61.01,73.9388,61.082,73.576,61.082C72.5065,61.082,71.4914,60.4582,71.0525,59.4213C67.7577,51.6455,62.331,44.1074,54.9203,37.0116C53.6073,36.1009,48.0984,31.9917,47.2065,26.583C40.9421,26.2679,35.6187,26.8278,31.6725,27.5336C31.6197,29.527,30.9225,31.5172,29.2456,33.3731C28.0614,34.6827,26.5968,35.915,25.0446,37.2188C21.9414,39.8269,18.2648,42.9169,14.8104,48.1192C11.356,53.3215,8.12389,60.6361,5.9098,71.6934C5.88732,71.8035,5.85893,71.9123,5.82344,72.0188C5.81634,72.041,4.57886,76.0413,6.77344,79.5289C8.6332,82.4828,12.4557,84.4139,18.1367,85.2705C19.6297,85.4953,20.6566,86.8762,20.4295,88.3532C20.2213,89.6944,19.0559,90.6541,17.7274,90.6541ZM35.1195,7.03101C33.3502,7.03101,31.9158,5.61208,31.9158,3.86173C31.9158,2.11139,33.3502,0.69245,35.1195,0.69245C36.8889,0.69245,38.3233,2.11139,38.3233,3.86173C38.3233,5.61208,36.8889,7.03101,35.1195,7.03101ZM57.6848,23.1892L58.414,24.4754C58.8984,24.3623,59.3923,24.3435,59.8644,24.4203C60.2191,24.5005,60.5087,24.7182,60.6663,25.0229C60.8636,25.3394,60.8993,25.7346,60.7646,26.1094C60.5988,26.5176,60.2972,26.8749,59.9085,27.1235L60.31,27.8316L59.7886,28.1294L59.3994,27.443C58.9257,27.7175,58.399,27.883,57.8664,27.9247L57.3744,27.0569C57.6378,27.0741,57.9071,27.048,58.1704,26.9797C58.4501,26.9251,58.7239,26.8323,58.9829,26.7044L58.2801,25.4647C57.8047,25.5877,57.3167,25.6065,56.8549,25.5197C56.4913,25.4263,56.196,25.1971,56.0328,24.8814C55.8433,24.5561,55.8127,24.1572,55.9484,23.7789C56.088,23.373,56.3763,23.0149,56.7584,22.7726L56.4166,22.1699L56.938,21.8721L57.2727,22.4625C57.6615,22.2376,58.0888,22.0901,58.5254,22.0301L59.0042,22.8746C58.5548,22.8828,58.103,22.9906,57.6848,23.1892ZM56.9319,24.2961Q57.1278,24.6417,57.7863,24.5856L57.1695,23.4978Q56.6982,23.884,56.9319,24.2961ZM58.9077,25.3462L59.4981,26.3875L59.499,26.3891Q59.9965,26.0045,59.7628,25.5923Q59.573,25.2576,58.9077,25.3462ZM73.2212,66.5065C73.2212,68.2569,74.6555,69.6758,76.4249,69.6758C78.1943,69.6758,79.6286,68.2569,79.6286,66.5065C79.6286,64.7562,78.1943,63.3372,76.4249,63.3372C74.6555,63.3372,73.2212,64.7562,73.2212,66.5065ZM35.9465,91.8045C35.0734,91.8045,34.2038,91.7987,33.3378,91.7858C31.827,91.7636,30.6203,90.5359,30.6428,89.0402C30.6653,87.5457,31.9158,86.3297,33.4183,86.3742C49.6344,86.6059,65.7512,84.6175,67.6134,84.037C72.1953,82.4184,74.5295,79.3603,74.5295,74.9575C74.5295,73.463,75.754,72.2517,77.2648,72.2517C78.7755,72.2517,80,73.463,80,74.9575C80,81.5992,76.148,86.7686,69.4317,89.142C67.0041,89.9999,51.0955,91.8046,35.9465,91.8045ZM25.2731,92C23.5037,92,22.0693,90.5811,22.0693,88.8307C22.0693,87.0804,23.5037,85.6615,25.2731,85.6615C27.0424,85.6615,28.4768,87.0804,28.4768,88.8307C28.4768,90.5811,27.0424,92,25.2731,92Z"></path></svg>'), Xy = Gy.cloneNode(!0);
class rC {
  constructor(t) {
    x1(this, "_chartApi", null);
    if (D.isString(t.container)) {
      if (this._container = document.getElementById(t.container), !this._container)
        throw new Error("Container is null");
    } else
      this._container = t.container;
    this._container.classList.add("klinecharts-pro"), this._container.setAttribute("data-theme", t.theme ?? "light");
    const r = this;
    Ja(() => A(qy, {
      ref: (n) => {
        r._chartApi = n;
      },
      get styles() {
        return t.styles ?? {};
      },
      get watermark() {
        return t.watermark ?? Xy;
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
    var n, s;
    (s = (n = this._chartApi) == null ? void 0 : n.setAutoScalePriceLines) == null || s.call(n, t, r);
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
Ua.forEach((e) => {
  $a(e);
});
export {
  tC as DefaultDatafeed,
  rC as KLineChartPro,
  Ay as calculateAutoPriceRange,
  nC as loadLocales
};
//# sourceMappingURL=klinecharts-pro.js.map
