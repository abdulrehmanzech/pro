var Ia = Object.defineProperty;
var Ea = (e, t, r) => t in e ? Ia(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var D1 = (e, t, r) => (Ea(e, typeof t != "symbol" ? t + "" : t, r), r);
import { utils as I, registerFigure as Ba, PolygonType as Xt, LineType as Re, OverlayMode as or, ActionType as mt, init as Fa, FormatDateType as sn, DomPosition as Je, dispose as t0, TooltipIconPosition as ln, CandleType as Ua, YAxisType as za, TooltipShowRule as n0, registerOverlay as Va } from "klinecharts";
function I1(e, t, r) {
  const n = (e.x - t.x) * Math.cos(r) - (e.y - t.y) * Math.sin(r) + t.x, l = (e.x - t.x) * Math.sin(r) + (e.y - t.y) * Math.cos(r) + t.y;
  return { x: n, y: l };
}
function mr(e, t) {
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
      y: I.getLinearYFromCoordinates(e[0], e[1], { x: 0, y: e[0].y })
    } : r = {
      x: t.width,
      y: I.getLinearYFromCoordinates(e[0], e[1], { x: t.width, y: e[0].y })
    }, { coordinates: [e[0], r] };
  }
  return [];
}
function X0(e, t) {
  const r = Math.abs(e.x - t.x), n = Math.abs(e.y - t.y);
  return Math.sqrt(r * r + n * n);
}
const Ra = {
  name: "arrow",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = e[1].x > e[0].x ? 0 : 1, r = I.getLinearSlopeIntercept(e[0], e[1]);
      let n;
      r ? n = Math.atan(r[0]) + Math.PI * t : e[1].y > e[0].y ? n = Math.PI / 2 : n = Math.PI / 2 * 3;
      const l = I1({ x: e[1].x - 8, y: e[1].y + 4 }, e[1], n), c = I1({ x: e[1].x - 8, y: e[1].y - 4 }, e[1], n);
      return [
        {
          type: "line",
          attrs: { coordinates: e }
        },
        {
          type: "line",
          ignoreEvent: !0,
          attrs: { coordinates: [l, e[1], c] }
        }
      ];
    }
    return [];
  }
}, Ka = {
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
      const t = X0(e[0], e[1]);
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
}, ja = {
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
}, Qa = {
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
}, Za = {
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
}, Ha = {
  name: "fibonacciCircle",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = Math.abs(e[0].x - e[1].x), r = Math.abs(e[0].y - e[1].y), n = Math.sqrt(t * t + r * r), l = [0.236, 0.382, 0.5, 0.618, 0.786, 1], c = [], m = [];
      return l.forEach((f) => {
        const v = n * f;
        c.push(
          { ...e[0], r: v }
        ), m.push({
          x: e[0].x,
          y: e[0].y + v + 6,
          text: `${(f * 100).toFixed(1)}%`
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
          attrs: m
        }
      ];
    }
    return [];
  }
}, Ya = {
  name: "fibonacciSegment",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: r }) => {
    const n = [], l = [];
    if (e.length > 1) {
      const c = e[1].x > e[0].x ? e[0].x : e[1].x, m = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0], f = e[0].y - e[1].y, v = t.points, L = v[0].value - v[1].value;
      m.forEach((x) => {
        const w = e[1].y + f * x, U = (v[1].value + L * x).toFixed(r.price);
        n.push({ coordinates: [{ x: e[0].x, y: w }, { x: e[1].x, y: w }] }), l.push({
          x: c,
          y: w,
          text: `${U} (${(x * 100).toFixed(1)}%)`,
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
        attrs: l
      }
    ];
  }
}, Wa = {
  name: "fibonacciSpiral",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, bounding: t }) => {
    if (e.length > 1) {
      const r = X0(e[0], e[1]) / Math.sqrt(24), n = e[1].x > e[0].x ? 0 : 1, l = I.getLinearSlopeIntercept(e[0], e[1]);
      let c;
      l ? c = Math.atan(l[0]) + Math.PI * n : e[1].y > e[0].y ? c = Math.PI / 2 : c = Math.PI / 2 * 3;
      const m = I1(
        { x: e[0].x - r, y: e[0].y },
        e[0],
        c
      ), f = I1(
        { x: e[0].x - r, y: e[0].y - r },
        e[0],
        c
      ), v = [{
        ...m,
        r,
        startAngle: c,
        endAngle: c + Math.PI / 2
      }, {
        ...f,
        r: r * 2,
        startAngle: c + Math.PI / 2,
        endAngle: c + Math.PI
      }];
      let L = e[0].x - r, x = e[0].y - r;
      for (let w = 2; w < 9; w++) {
        const U = v[w - 2].r + v[w - 1].r;
        let K = 0;
        switch (w % 4) {
          case 0: {
            K = c, L -= v[w - 2].r;
            break;
          }
          case 1: {
            K = c + Math.PI / 2, x -= v[w - 2].r;
            break;
          }
          case 2: {
            K = c + Math.PI, L += v[w - 2].r;
            break;
          }
          case 3: {
            K = c + Math.PI / 2 * 3, x += v[w - 2].r;
            break;
          }
        }
        const ye = K + Math.PI / 2, S = I1({ x: L, y: x }, e[0], c);
        v.push({
          ...S,
          r: U,
          startAngle: K,
          endAngle: ye
        });
      }
      return [
        {
          type: "arc",
          attrs: v
        },
        {
          type: "line",
          attrs: mr(e, t)
        }
      ];
    }
    return [];
  }
}, qa = {
  name: "fibonacciSpeedResistanceFan",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, bounding: t }) => {
    const r = [];
    let n = [];
    const l = [];
    if (e.length > 1) {
      const c = e[1].x > e[0].x ? -38 : 4, m = e[1].y > e[0].y ? -2 : 20, f = e[1].x - e[0].x, v = e[1].y - e[0].y;
      [1, 0.75, 0.618, 0.5, 0.382, 0.25, 0].forEach((x) => {
        const w = e[1].x - f * x, U = e[1].y - v * x;
        r.push({ coordinates: [{ x: w, y: e[0].y }, { x: w, y: e[1].y }] }), r.push({ coordinates: [{ x: e[0].x, y: U }, { x: e[1].x, y: U }] }), n = n.concat(mr([e[0], { x: w, y: e[1].y }], t)), n = n.concat(mr([e[0], { x: e[1].x, y: U }], t)), l.unshift({
          x: e[0].x + c,
          y: U + 10,
          text: `${x.toFixed(3)}`
        }), l.unshift({
          x: w - 18,
          y: e[0].y + m,
          text: `${x.toFixed(3)}`
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
        attrs: l
      }
    ];
  }
}, Ga = {
  name: "fibonacciExtension",
  totalStep: 4,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: r }) => {
    const n = [], l = [];
    if (e.length > 2) {
      const c = t.points, m = c[1].value - c[0].value, f = e[1].y - e[0].y, v = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1], L = e[2].x > e[1].x ? e[1].x : e[2].x;
      v.forEach((x) => {
        const w = e[2].y + f * x, U = (c[2].value + m * x).toFixed(r.price);
        n.push({ coordinates: [{ x: e[1].x, y: w }, { x: e[2].x, y: w }] }), l.push({
          x: L,
          y: w,
          text: `${U} (${(x * 100).toFixed(1)}%)`,
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
        attrs: l
      }
    ];
  }
}, Xa = {
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
      ], l = [
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
          attrs: l
        }
      ];
    }
    return [];
  }
}, Ja = {
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
}, e9 = {
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
}, t9 = {
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
}, n9 = {
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
}, r9 = {
  name: "abcd",
  totalStep: 5,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    let t = [], r = [];
    const n = ["A", "B", "C", "D"], l = e.map((c, m) => ({
      ...c,
      baseline: "bottom",
      text: `(${n[m]})`
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
        attrs: l
      }
    ];
  }
}, o9 = {
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
    const r = [], n = [], l = ["X", "A", "B", "C", "D"], c = e.map((m, f) => ({
      ...m,
      baseline: "bottom",
      text: `(${l[f]})`
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
}, i9 = [
  Ra,
  Ka,
  ja,
  Za,
  Qa,
  Ha,
  Ya,
  Wa,
  qa,
  Ga,
  Xa,
  Ja,
  e9,
  t9,
  n9,
  r9,
  o9
];
class vC {
  constructor(t) {
    D1(this, "_apiKey");
    D1(this, "_prevSymbolMarket");
    D1(this, "_ws");
    this._apiKey = t;
  }
  async searchSymbols(t) {
    return await ((await (await fetch(`https://api.polygon.io/v3/reference/tickers?apiKey=${this._apiKey}&active=true&search=${t ?? ""}`)).json()).results || []).map((l) => ({
      ticker: l.ticker,
      name: l.name,
      shortName: l.ticker,
      market: l.market,
      exchange: l.primary_exchange,
      priceCurrency: l.currency_name,
      type: l.type,
      logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAA66SURBVHic7Z17cFTVGcB/527AiKGgRA0ShGhKoQjFMb4qUMCMPIrWqdbHSEdlHDGgI9V2aq2d1hmKtVbRsSTGEcQRp4pStaZQlNYUwYLiSKU0SCMBDRCmoQSJGGF3T/84d2VZk+w9d899hf3NMBnl3ns+5vtyHt/5HoIehpQIaijDYjiSciRlwCCgBCgG+gNFQCGCAvUScaADaAfagFagBdiFoAlBI0m2UkWTEMgA/lmeIYIWIFdkLQNJMBbBJUjOA8agFOwF7cAmBO8hWUeMtWIWezwayxciZwByGb1pZTyCaUguA0YGLNIWBK8jWUExa8Q1HA5YHi0iYQByGTH2UYnkBmA6cHLQMnXBfqAOwXMMYLW4hkTQAmUj1AYgqzkLuAXBTUgGBi2PFoI9SJYAT4nZbA9anK4IpQHIhUzE4i4k04OWxQiCOpI8IubwZtCiZBIqA5A1TEdyH3Bh0LJ4xAYE80QVdUELkiIUBiCf4FIk85FcELQsviB4B8G94jb+GrwoASKfZBgJHkUyNUg5AkOwkhhzxa1sC06EAJALKUJwL3A30DsIGULEYeBhJPPFHNr9Htx3A5A1TECyGCjze+yQ04Rgpqii3s9BfTMAWUsfksxD8iO/xowkggVY3Cdmccif4XxAPskw4rwCjPBjvB5AAwVc6cfewPJ6AFnNzcTZSF75OowgzkZZzc1eD+SZAUiJkNX8FlgM9PVqnB5MX2CxrOa3Uno3U3vyYVlLPxIshR7iyQueOmLMELM4YPrDxg1A1jKQJKuQjDL97eMawWYsJpu+fjZqAPL3DMFiNVBu8rt5vqSRJJXidnaa+qAxA5CPU0aMvwFDTX0zT6fsIMEkcQdNJj5mxADs3/x68sr3ix0kmWBiJsjZAOyQrDXkp32/aSTG+Fz3BDkZgKylH0neym/4AkJtDMflcjpw7QeQEkGCpXnlB4hkFAmW5uIncO8IquFB8uf8MDDd1oUrXFmO7aJc7HbQPJ4wU8zmad2XtA3AvtjZSN69GzYOUkCF7gWSlgHIWvqQyF/shJgGYlToXCXr7QGSzCOv/DAzwtaRYxzPAHYkT+jCmvN0gmCi08giRwZgx/B9QD6MKyo0IRntJMbQ2RKgAjjzyo8OZbbOspJ1BrB3/ZvJR+9GjcMUMCrbqSD7DJDgUfLKjyK9bd11S7czgHyCS0my2pxMIaHvUCgshl5FUFQKQtWJ4FALHGmHz5rhizY43BaomEawqOwuA6mg25cl840L5DexQiithNMvhNMvglMr4IT+zt5t3QS762H332FXfTQNQumwy1zLLmcAO1HzNU+E8oNTK+AbN8KwGc4V3h3JODS9Av98GPauz/17fiK4vKuE1K4NoJr1RDFLd+BY+PYCOK3CuzH2rof3fg07Q5Pkm40NYjYXdfYXnRqAXMhEBH/zVibDFBbDRQ/AiFv8G3PbUlhTpfYNYUcyqbP6BJ2fAizu8lwgkwwcC9c3+Kt8UMvLtZuhZKy/47qhC51+ZQawy7J85LlApjhjAkx7Te3ogyIZhz9PhebQH5jOzixX09kM4POvUQ6cdTVc/kawygewCmDKy2omCjdf0e0xM4BdjeuTSBRk6jtUTb9BKz+djlZ4eRy0bQ1aks4R7GEAg9Orlx07A6hSbOFXPsCkp8OlfFAb0UnaQTn+IRnIPirT/1dBxgM3+CqQW0beptZ+NyTj0LIW9m6A//0L2puP/l1RKXytHAZ9RzmNYoX63z/9IrU53LbUnXxeo3S8KvWfXy4BdgXOFsJbhFFhFcAPP4E+JXrvJeOw+TH44NFjld4VfUrg3Htg5Cx9QzjUAn8YEVbP4X6KKUlVND26BLQynrArH9TGT1f5h1pg+fnw9o+dKT/1zrq58MeL4UCj3nh9StQsFU5OtnUNpBuAYFog4ugy5Lt6z3/RBq9OVH59N7RuUu93tOq9N3KWu/H8IE3XRw1AFV4OP2dO0Xt+4/2578o/a1YePx36DoXiMbmN6xVpurbAzu8Lvup2dgqL1R+nHGmHLU+YGfujl/RnkUGV2Z8JhpG2zu0ZIEHoPRgA9NPMP21eDYkOc+M3LNJ7/rTzzI1tGlvnygAElwQqjFPc7MZNouvq1TVYP7F1rgxAddrIkw3dvYTOcuU3ts4L7B47Id2tZHBwh97zXvwGNr4AfU539uyhvebHN8cYKREiUrd/sUK49XPnzyfj8FyZ87P/8cfZFhbDg5bCMYkOdSRzilUAFz/knTxRx2K4hYxYaZcdmmFY5ddBxa88ESXySMotu69edNi+XP+d838Jlz4bvtvDoJGUWaimitFhz1p3a/qwGXBdg/qZJ8UgC9VRMzokOuDdX7h7t6hUzQTX2fGDbq57exYlQlbzb6KY83/1uyr2PxeOtKtY/w+fUQkgybgJyaJEg5DV7IaIRAGlc8o58P1/mFvXj7SrOP+df4aP/6J/+xdN9ghZzadEtd7PmVNg6mvquGeSZFzNCB8th8bnwxrYYYKDQlZzGOgVtCSuGXELjK8xbwQpEh3KCLbURi8lLDtHhKwhiYcNCXzhzClw2YveH/N218O796ufPQGB7BkGANB/OEx9Wf30mubV8NYd4Q3/dopAWkh6xta3bSssO1clbZqMAeiM0kq45n3lYfRq6fEDSTzam8Cu6FcOYx/XDx9zw+56eON687EH/nDQAv+7VXrOgUaVq/fyOHXO9/J8f8YE+N6b4Q7+6Jr26DqCdOhXDufcrgpGmCgW0RmHWuCVcfoh5MHSIGQ1a4BxQUviC7FCtSycdRUMmW7eGNq2wkvnR6NegOItIatZBvwgaEl8xypQ03f5tcooTio1892ddbDicjPf8p4XC4BdQUsRCMm4Os6lAj1PrYCzr1bLhG7mUTpDpsM3boIPl5iQ0mt2WQgz3aciz383wvp74NnBsOoH7jOJAC5ZAL092muYRNBkIYjUrsVzknHY/hK8eK77490J/WH0XPOymUbQaJEk4u4sD2l8Hl4YBZ+syv5sJqPmhN9JlGSrRRVN9ERfgCk6WmHlldCyTu+9wmL3NQz8oZ0qmiwhkEAOC95xQKIDVl2tf7wbPNkbecywSQikmqME7yFDnB/Yq0jVBXDK5y0qqMMkh1rgg8fgvJ87fyes2cGgdE6qRIxkHXBnkPJ0i27tnb3rzRsAKLeyjgGE2T2sdG7nBsZYG6gw2dD15Zty6mTy3416z+fiT/AaW+cWgN1/dkugAnXHZ816629RqXeJmTqZSeGNOt6S6jmcXiLm9cDEcYLuJcsQj5qanhji32qnpOk6vUTMikCEcYru9DvMg4p3/cr1zvY6s4WfpOn6qAEUswbYH4Q8jtB1xpRWmp8Fvq6ZVfTpDrPjm2G/rWsgzQDsunHhLYD/8V9UxS8dxj1ubiN2UimMuVvvnX2hdK/UpWoEQmapWMFzvovjlCPt+jV6+g5V0Tp9h+Y2dp8SuMJFUeqPXbiQvSZDx8cawABWI9TuMJS8/xv9jJ3+w1VR6dFz3fnmB09RGUi60cZftIWvfLwqFn2MUMcYgLiGBJIlvgqlQ0crvP0T/fd6Fakr2hv3qJ+Dp3R/TDzlHPjmbXDVuzB9pbsZpGGR99HJukiWpFcKh6g2jJhWp18xtDMOtSglpa58+5QcbSeXC+3N6hYxfCllX2kY0XnPoBpeQ+LRQdoAJ5Wq7OCwetpWXB6+hlKCOlHFV2LVOu8ZlOQRzwXKhc+aVf3eMMbiNywKn/KhS51Gu21c/+Fqlx+WmWD7cnjjujDWGeiybVzXvYMF8zwTxxRtW1Usfi7xe6b48JmwKr9bXXbfO7iGDUguMC+RYawCuGAefOtu/8OwjrSrjOF//s7fcZ0ieEdUdT2Td9893GEP+sBJxlVE7/Mj1J29XzS9qnb7YVU+ZNVh1rRwWcMKJFPNSeQDp5yjHD/l15qvGZDoUEbWsCh8jp5MBCtFVfeNQLIbwJMMI85moLcxwfwilQo2eLJq5uQ2ROuLNnUbuX05/CcyJWMOU8AocSvbunvIUWEIWc184GdGxAqSXkWqzWvxGCgcoJw+J2Y4flI3eAd3qq5i+zZFLeEzxQNidvYl3JkBLKQIwQcQsaqixy9NSEaLOdnD/bvfBNqIObQjmJm7XHl8QTDTifLBoQEAiCrqESxwL1UeXxAsEFXUO33csQHYT98HNGiKlMc/GmwdOUa7Oph9KthIT6srFH0OUkBFtl1/JnozAGAPEN4kkuOXO3WVDy4MAEDM5mkg34ojPDxk60Qb1wUi7WZTf4IQxw0cH9RRxRV2kq82rmYAACGQxJiBYLPbb+TJEcFmYsxwq3zIwQAAxCwOYDEZ8lVGAqARi8liFgdy+UhOBgB2XmGSSmBHrt/K45gdJKlM5fflQs4GACBuZycJJpE3Aj/YQYJJ4nZ2mviYEQMAEHfQRJIJ5JcDL2kkyQRxh7nKbsbLxMtaBpJkFZJRpr99XCPYbK/5RhN3jM0AKcQs9mAxjjDnGUaPOizGmVY+eDADpLD9BA8CLlJ58qTxEFX8NJejXnd43ilEVnMz8Bj5uwNdDgJ3uvXwOcWXVjH2BdIr9PSy9OZooIAr3fj2dTG+B+gMcSvbiFGRjydwgGABMf1bPffD+YysYQKSxeTDyzJpQjBTJ5jDBL7MAOmIKuqRjAYegKOVKo5jDgMPIBntt/IhgBkgHfkkw0jwaOTyDkwhWEmMuX5N952LEALkE1yKZH4k0tBMIHgHwb3iNv4avCghQtYwHcl9hD0r2T0bEMwTVeFxkoXKAFLIhUzE4q5QF6nQQVBHkkfEHN4MWpRMQmkAKexyNbcguAkZsRb3gj12vaWnMsuyhIlQG0AKuYwY+6hEcgMqBO3koGXqgv1AHYLnGMDqzIJMYSQSBpCOXEZvWhmPYBqSy4CRAYu0BcHrSFZQzJr0IoxRIHIGkImsZSAJxiK4BMl5wBjAqz7y7cAmu8HGOmKs9eKGzk8ibwCZ2LeQZVgMR1KOpAwYBJQAxUB/lIEUIr5smBEHOlAKbgNagRZgF4ImBI0k2UoVTV7dygXF/wF+fTz59Jc5ygAAAABJRU5ErkJggg=="
    }));
  }
  async getHistoryKLineData(t, r, n, l) {
    return await ((await (await fetch(`https://api.polygon.io/v2/aggs/ticker/${t.ticker}/range/${r.multiplier}/${r.timespan}/${n}/${l}?apiKey=${this._apiKey}`)).json()).results || []).map((f) => ({
      timestamp: f.t,
      open: f.o,
      high: f.h,
      low: f.l,
      close: f.c,
      volume: f.v,
      turnover: f.vw
    }));
  }
  subscribe(t, r, n) {
    var l, c;
    this._prevSymbolMarket !== t.market ? ((l = this._ws) == null || l.close(), this._ws = new WebSocket(`wss://delayed.polygon.io/${t.market}`), this._ws.onopen = () => {
      var m;
      (m = this._ws) == null || m.send(JSON.stringify({ action: "auth", params: this._apiKey }));
    }, this._ws.onmessage = (m) => {
      var v;
      const f = JSON.parse(m.data);
      f[0].ev === "status" ? f[0].status === "auth_success" && ((v = this._ws) == null || v.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` }))) : "sym" in f && n({
        timestamp: f.s,
        open: f.o,
        high: f.h,
        low: f.l,
        close: f.c,
        volume: f.v,
        turnover: f.vw
      });
    }) : (c = this._ws) == null || c.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` })), this._prevSymbolMarket = t.market;
  }
  unsubscribe(t, r) {
  }
}
const ze = {};
function a9(e) {
  ze.context = e;
}
const s9 = (e, t) => e === t, gr = Symbol("solid-proxy"), l9 = Symbol("solid-track"), vn = {
  equals: s9
};
let J0 = ri;
const pt = 1, bn = 2, ei = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, ir = {};
var Ue = null;
let zt = null, Te = null, je = null, gt = null, wr = 0;
function E1(e, t) {
  const r = Te, n = Ue, l = e.length === 0, c = l ? ei : {
    owned: null,
    cleanups: null,
    context: null,
    owner: t === void 0 ? n : t
  }, m = l ? e : () => e(() => dt(() => Pn(c)));
  Ue = c, Te = null;
  try {
    return At(m, !0);
  } finally {
    Te = r, Ue = n;
  }
}
function D(e, t) {
  t = t ? Object.assign({}, vn, t) : vn;
  const r = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, n = (l) => (typeof l == "function" && (l = l(r.value)), ni(r, l));
  return [ti.bind(r), n];
}
function r0(e, t, r) {
  const n = Mn(e, t, !0, pt);
  r1(n);
}
function F(e, t, r) {
  const n = Mn(e, t, !1, pt);
  r1(n);
}
function Ke(e, t, r) {
  J0 = m9;
  const n = Mn(e, t, !1, pt);
  n.user = !0, gt ? gt.push(n) : r1(n);
}
function X(e, t, r) {
  r = r ? Object.assign({}, vn, r) : vn;
  const n = Mn(e, t, !0, 0);
  return n.observers = null, n.observerSlots = null, n.comparator = r.equals || void 0, r1(n), ti.bind(n);
}
function c9(e, t, r) {
  let n, l, c;
  arguments.length === 2 && typeof t == "object" || arguments.length === 1 ? (n = !0, l = e, c = t || {}) : (n = e, l = t, c = r || {});
  let m = null, f = ir, v = null, L = !1, x = "initialValue" in c, w = typeof n == "function" && X(n);
  const U = /* @__PURE__ */ new Set(), [K, ye] = (c.storage || D)(c.initialValue), [S, E] = D(void 0), [z, G] = D(void 0, {
    equals: !1
  }), [B, H] = D(x ? "ready" : "unresolved");
  if (ze.context) {
    v = `${ze.context.id}${ze.context.count++}`;
    let re;
    c.ssrLoadFrom === "initial" ? f = c.initialValue : ze.load && (re = ze.load(v)) && (f = re[0]);
  }
  function Y(re, ue, se, be) {
    return m === re && (m = null, x = !0, (re === f || ue === f) && c.onHydrated && queueMicrotask(() => c.onHydrated(be, {
      value: ue
    })), f = ir, ce(ue, se)), ue;
  }
  function ce(re, ue) {
    At(() => {
      ue === void 0 && ye(() => re), H(ue !== void 0 ? "errored" : "ready"), E(ue);
      for (const se of U.keys())
        se.decrement();
      U.clear();
    }, !1);
  }
  function W() {
    const re = d9, ue = K(), se = S();
    if (se !== void 0 && !m)
      throw se;
    return Te && !Te.user && re && r0(() => {
      z(), m && (re.resolved || U.has(re) || (re.increment(), U.add(re)));
    }), ue;
  }
  function j(re = !0) {
    if (re !== !1 && L)
      return;
    L = !1;
    const ue = w ? w() : n;
    if (ue == null || ue === !1) {
      Y(m, dt(K));
      return;
    }
    const se = f !== ir ? f : dt(() => l(ue, {
      value: K(),
      refetching: re
    }));
    return typeof se != "object" || !(se && "then" in se) ? (Y(m, se, void 0, ue), se) : (m = se, L = !0, queueMicrotask(() => L = !1), At(() => {
      H(x ? "refreshing" : "pending"), G();
    }, !1), se.then((be) => Y(se, be, void 0, ue), (be) => Y(se, void 0, ii(be), ue)));
  }
  return Object.defineProperties(W, {
    state: {
      get: () => B()
    },
    error: {
      get: () => S()
    },
    loading: {
      get() {
        const re = B();
        return re === "pending" || re === "refreshing";
      }
    },
    latest: {
      get() {
        if (!x)
          return W();
        const re = S();
        if (re && !m)
          throw re;
        return K();
      }
    }
  }), w ? r0(() => j(!1)) : j(!1), [W, {
    refetch: j,
    mutate: ye
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
function Ar(e) {
  Ke(() => dt(e));
}
function Ct(e) {
  return Ue === null || (Ue.cleanups === null ? Ue.cleanups = [e] : Ue.cleanups.push(e)), e;
}
function u9(e) {
  const t = Te, r = Ue;
  return Promise.resolve().then(() => {
    Te = t, Ue = r;
    let n;
    return At(e, !1), Te = Ue = null, n ? n.done : void 0;
  });
}
let d9;
function ti() {
  const e = zt;
  if (this.sources && (this.state || e))
    if (this.state === pt || e)
      r1(this);
    else {
      const t = je;
      je = null, At(() => _n(this), !1), je = t;
    }
  if (Te) {
    const t = this.observers ? this.observers.length : 0;
    Te.sources ? (Te.sources.push(this), Te.sourceSlots.push(t)) : (Te.sources = [this], Te.sourceSlots = [t]), this.observers ? (this.observers.push(Te), this.observerSlots.push(Te.sources.length - 1)) : (this.observers = [Te], this.observerSlots = [Te.sources.length - 1]);
  }
  return this.value;
}
function ni(e, t, r) {
  let n = e.value;
  return (!e.comparator || !e.comparator(n, t)) && (e.value = t, e.observers && e.observers.length && At(() => {
    for (let l = 0; l < e.observers.length; l += 1) {
      const c = e.observers[l], m = zt && zt.running;
      m && zt.disposed.has(c), (m && !c.tState || !m && !c.state) && (c.pure ? je.push(c) : gt.push(c), c.observers && oi(c)), m || (c.state = pt);
    }
    if (je.length > 1e6)
      throw je = [], new Error();
  }, !1)), t;
}
function r1(e) {
  if (!e.fn)
    return;
  Pn(e);
  const t = Ue, r = Te, n = wr;
  Te = Ue = e, h9(e, e.value, n), Te = r, Ue = t;
}
function h9(e, t, r) {
  let n;
  try {
    n = e.fn(t);
  } catch (l) {
    e.pure && (e.state = pt, e.owned && e.owned.forEach(Pn), e.owned = null), ai(l);
  }
  (!e.updatedAt || e.updatedAt <= r) && (e.updatedAt != null && "observers" in e ? ni(e, n) : e.value = n, e.updatedAt = r);
}
function Mn(e, t, r, n = pt, l) {
  const c = {
    fn: e,
    state: n,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: Ue,
    context: null,
    pure: r
  };
  return Ue === null || Ue !== ei && (Ue.owned ? Ue.owned.push(c) : Ue.owned = [c]), c;
}
function $n(e) {
  const t = zt;
  if (e.state === 0 || t)
    return;
  if (e.state === bn || t)
    return _n(e);
  if (e.suspense && dt(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const r = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < wr); )
    (e.state || t) && r.push(e);
  for (let n = r.length - 1; n >= 0; n--)
    if (e = r[n], e.state === pt || t)
      r1(e);
    else if (e.state === bn || t) {
      const l = je;
      je = null, At(() => _n(e, r[0]), !1), je = l;
    }
}
function At(e, t) {
  if (je)
    return e();
  let r = !1;
  t || (je = []), gt ? r = !0 : gt = [], wr++;
  try {
    const n = e();
    return f9(r), n;
  } catch (n) {
    r || (gt = null), je = null, ai(n);
  }
}
function f9(e) {
  if (je && (ri(je), je = null), e)
    return;
  const t = gt;
  gt = null, t.length && At(() => J0(t), !1);
}
function ri(e) {
  for (let t = 0; t < e.length; t++)
    $n(e[t]);
}
function m9(e) {
  let t, r = 0;
  for (t = 0; t < e.length; t++) {
    const n = e[t];
    n.user ? e[r++] = n : $n(n);
  }
  for (ze.context && a9(), t = 0; t < r; t++)
    $n(e[t]);
}
function _n(e, t) {
  const r = zt;
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
    const l = e.sources[n];
    l.sources && (l.state === pt || r ? l !== t && $n(l) : (l.state === bn || r) && _n(l, t));
  }
}
function oi(e) {
  const t = zt;
  for (let r = 0; r < e.observers.length; r += 1) {
    const n = e.observers[r];
    (!n.state || t) && (n.state = bn, n.pure ? je.push(n) : gt.push(n), n.observers && oi(n));
  }
}
function Pn(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const r = e.sources.pop(), n = e.sourceSlots.pop(), l = r.observers;
      if (l && l.length) {
        const c = l.pop(), m = r.observerSlots.pop();
        n < l.length && (c.sourceSlots[m] = n, l[n] = c, r.observerSlots[n] = m);
      }
    }
  if (e.owned) {
    for (t = 0; t < e.owned.length; t++)
      Pn(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = 0; t < e.cleanups.length; t++)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function ii(e) {
  return e instanceof Error || typeof e == "string" ? e : new Error("Unknown error");
}
function ai(e) {
  throw e = ii(e), e;
}
const g9 = Symbol("fallback");
function o0(e) {
  for (let t = 0; t < e.length; t++)
    e[t]();
}
function y9(e, t, r = {}) {
  let n = [], l = [], c = [], m = 0, f = t.length > 1 ? [] : null;
  return Ct(() => o0(c)), () => {
    let v = e() || [], L, x;
    return v[l9], dt(() => {
      let U = v.length, K, ye, S, E, z, G, B, H, Y;
      if (U === 0)
        m !== 0 && (o0(c), c = [], n = [], l = [], m = 0, f && (f = [])), r.fallback && (n = [g9], l[0] = E1((ce) => (c[0] = ce, r.fallback())), m = 1);
      else if (m === 0) {
        for (l = new Array(U), x = 0; x < U; x++)
          n[x] = v[x], l[x] = E1(w);
        m = U;
      } else {
        for (S = new Array(U), E = new Array(U), f && (z = new Array(U)), G = 0, B = Math.min(m, U); G < B && n[G] === v[G]; G++)
          ;
        for (B = m - 1, H = U - 1; B >= G && H >= G && n[B] === v[H]; B--, H--)
          S[H] = l[B], E[H] = c[B], f && (z[H] = f[B]);
        for (K = /* @__PURE__ */ new Map(), ye = new Array(H + 1), x = H; x >= G; x--)
          Y = v[x], L = K.get(Y), ye[x] = L === void 0 ? -1 : L, K.set(Y, x);
        for (L = G; L <= B; L++)
          Y = n[L], x = K.get(Y), x !== void 0 && x !== -1 ? (S[x] = l[L], E[x] = c[L], f && (z[x] = f[L]), x = ye[x], K.set(Y, x)) : c[L]();
        for (x = G; x < U; x++)
          x in S ? (l[x] = S[x], c[x] = E[x], f && (f[x] = z[x], f[x](x))) : l[x] = E1(w);
        l = l.slice(0, m = U), n = v.slice(0);
      }
      return l;
    });
    function w(U) {
      if (c[x] = U, f) {
        const [K, ye] = D(x);
        return f[x] = ye, t(v[x], K);
      }
      return t(v[x]);
    }
  };
}
function T(e, t) {
  return dt(() => e(t || {}));
}
function cn() {
  return !0;
}
const C9 = {
  get(e, t, r) {
    return t === gr ? r : e.get(t);
  },
  has(e, t) {
    return t === gr ? !0 : e.has(t);
  },
  set: cn,
  deleteProperty: cn,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: cn,
      deleteProperty: cn
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function ar(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function si(...e) {
  let t = !1;
  for (let n = 0; n < e.length; n++) {
    const l = e[n];
    t = t || !!l && gr in l, e[n] = typeof l == "function" ? (t = !0, X(l)) : l;
  }
  if (t)
    return new Proxy({
      get(n) {
        for (let l = e.length - 1; l >= 0; l--) {
          const c = ar(e[l])[n];
          if (c !== void 0)
            return c;
        }
      },
      has(n) {
        for (let l = e.length - 1; l >= 0; l--)
          if (n in ar(e[l]))
            return !0;
        return !1;
      },
      keys() {
        const n = [];
        for (let l = 0; l < e.length; l++)
          n.push(...Object.keys(ar(e[l])));
        return [...new Set(n)];
      }
    }, C9);
  const r = {};
  for (let n = e.length - 1; n >= 0; n--)
    if (e[n]) {
      const l = Object.getOwnPropertyDescriptors(e[n]);
      for (const c in l)
        c in r || Object.defineProperty(r, c, {
          enumerable: !0,
          get() {
            for (let m = e.length - 1; m >= 0; m--) {
              const f = (e[m] || {})[c];
              if (f !== void 0)
                return f;
            }
          }
        });
    }
  return r;
}
function n1(e) {
  const t = "fallback" in e && {
    fallback: () => e.fallback
  };
  return X(y9(() => e.each, e.children, t || void 0));
}
function le(e) {
  let t = !1;
  const r = e.keyed, n = X(() => e.when, void 0, {
    equals: (l, c) => t ? l === c : !l == !c
  });
  return X(() => {
    const l = n();
    if (l) {
      const c = e.children, m = typeof c == "function" && c.length > 0;
      return t = r || m, m ? dt(() => c(l)) : c;
    }
    return e.fallback;
  }, void 0, void 0);
}
function p9(e, t, r) {
  let n = r.length, l = t.length, c = n, m = 0, f = 0, v = t[l - 1].nextSibling, L = null;
  for (; m < l || f < c; ) {
    if (t[m] === r[f]) {
      m++, f++;
      continue;
    }
    for (; t[l - 1] === r[c - 1]; )
      l--, c--;
    if (l === m) {
      const x = c < n ? f ? r[f - 1].nextSibling : r[c - f] : v;
      for (; f < c; )
        e.insertBefore(r[f++], x);
    } else if (c === f)
      for (; m < l; )
        (!L || !L.has(t[m])) && t[m].remove(), m++;
    else if (t[m] === r[c - 1] && r[f] === t[l - 1]) {
      const x = t[--l].nextSibling;
      e.insertBefore(r[f++], t[m++].nextSibling), e.insertBefore(r[--c], x), t[l] = r[c];
    } else {
      if (!L) {
        L = /* @__PURE__ */ new Map();
        let w = f;
        for (; w < c; )
          L.set(r[w], w++);
      }
      const x = L.get(t[m]);
      if (x != null)
        if (f < x && x < c) {
          let w = m, U = 1, K;
          for (; ++w < l && w < c && !((K = L.get(t[w])) == null || K !== x + U); )
            U++;
          if (U > x - f) {
            const ye = t[m];
            for (; f < x; )
              e.insertBefore(r[f++], ye);
          } else
            e.replaceChild(r[f++], t[m++]);
        } else
          m++;
      else
        t[m++].remove();
    }
  }
}
const i0 = "_$DX_DELEGATE";
function v9(e, t, r, n = {}) {
  let l;
  return E1((c) => {
    l = c, t === document ? e() : C(t, e(), t.firstChild ? null : void 0, r);
  }, n.owner), () => {
    l(), t.textContent = "";
  };
}
function $(e, t, r) {
  const n = document.createElement("template");
  n.innerHTML = e;
  let l = n.content.firstChild;
  return r && (l = l.firstChild), l;
}
function Ye(e, t = window.document) {
  const r = t[i0] || (t[i0] = /* @__PURE__ */ new Set());
  for (let n = 0, l = e.length; n < l; n++) {
    const c = e[n];
    r.has(c) || (r.add(c), t.addEventListener(c, b9));
  }
}
function Ie(e, t, r) {
  r == null ? e.removeAttribute(t) : e.setAttribute(t, r);
}
function he(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function ut(e, t, r, n) {
  if (n)
    Array.isArray(r) ? (e[`$$${t}`] = r[0], e[`$$${t}Data`] = r[1]) : e[`$$${t}`] = r;
  else if (Array.isArray(r)) {
    const l = r[0];
    e.addEventListener(t, r[0] = (c) => l.call(e, r[1], c));
  } else
    e.addEventListener(t, r);
}
function Tt(e, t, r) {
  if (!t)
    return r ? Ie(e, "style") : t;
  const n = e.style;
  if (typeof t == "string")
    return n.cssText = t;
  typeof r == "string" && (n.cssText = r = void 0), r || (r = {}), t || (t = {});
  let l, c;
  for (c in r)
    t[c] == null && n.removeProperty(c), delete r[c];
  for (c in t)
    l = t[c], l !== r[c] && (n.setProperty(c, l), r[c] = l);
  return r;
}
function yt(e, t, r) {
  return dt(() => e(t, r));
}
function C(e, t, r, n) {
  if (r !== void 0 && !n && (n = []), typeof t != "function")
    return kn(e, t, n, r);
  F((l) => kn(e, t(), l, r), n);
}
function b9(e) {
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
  }), ze.registry && !ze.done && (ze.done = !0, document.querySelectorAll("[id^=pl-]").forEach((n) => {
    for (; n && n.nodeType !== 8 && n.nodeValue !== "pl-" + e; ) {
      let l = n.nextSibling;
      n.remove(), n = l;
    }
    n && n.remove();
  })); r; ) {
    const n = r[t];
    if (n && !r.disabled) {
      const l = r[`${t}Data`];
      if (l !== void 0 ? n.call(r, l, e) : n.call(r, e), e.cancelBubble)
        return;
    }
    r = r._$host || r.parentNode || r.host;
  }
}
function kn(e, t, r, n, l) {
  for (ze.context && !r && (r = [...e.childNodes]); typeof r == "function"; )
    r = r();
  if (t === r)
    return r;
  const c = typeof t, m = n !== void 0;
  if (e = m && r[0] && r[0].parentNode || e, c === "string" || c === "number") {
    if (ze.context)
      return r;
    if (c === "number" && (t = t.toString()), m) {
      let f = r[0];
      f && f.nodeType === 3 ? f.data = t : f = document.createTextNode(t), r = Jt(e, r, n, f);
    } else
      r !== "" && typeof r == "string" ? r = e.firstChild.data = t : r = e.textContent = t;
  } else if (t == null || c === "boolean") {
    if (ze.context)
      return r;
    r = Jt(e, r, n);
  } else {
    if (c === "function")
      return F(() => {
        let f = t();
        for (; typeof f == "function"; )
          f = f();
        r = kn(e, f, r, n);
      }), () => r;
    if (Array.isArray(t)) {
      const f = [], v = r && Array.isArray(r);
      if (yr(f, t, r, l))
        return F(() => r = kn(e, f, r, n, !0)), () => r;
      if (ze.context) {
        if (!f.length)
          return r;
        for (let L = 0; L < f.length; L++)
          if (f[L].parentNode)
            return r = f;
      }
      if (f.length === 0) {
        if (r = Jt(e, r, n), m)
          return r;
      } else
        v ? r.length === 0 ? a0(e, f, n) : p9(e, r, f) : (r && Jt(e), a0(e, f));
      r = f;
    } else if (t instanceof Node) {
      if (ze.context && t.parentNode)
        return r = m ? [t] : t;
      if (Array.isArray(r)) {
        if (m)
          return r = Jt(e, r, n, t);
        Jt(e, r, null, t);
      } else
        r == null || r === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      r = t;
    }
  }
  return r;
}
function yr(e, t, r, n) {
  let l = !1;
  for (let c = 0, m = t.length; c < m; c++) {
    let f = t[c], v = r && r[c];
    if (f instanceof Node)
      e.push(f);
    else if (!(f == null || f === !0 || f === !1))
      if (Array.isArray(f))
        l = yr(e, f, v) || l;
      else if (typeof f == "function")
        if (n) {
          for (; typeof f == "function"; )
            f = f();
          l = yr(e, Array.isArray(f) ? f : [f], Array.isArray(v) ? v : [v]) || l;
        } else
          e.push(f), l = !0;
      else {
        const L = String(f);
        v && v.nodeType === 3 && v.data === L ? e.push(v) : e.push(document.createTextNode(L));
      }
  }
  return l;
}
function a0(e, t, r = null) {
  for (let n = 0, l = t.length; n < l; n++)
    e.insertBefore(t[n], r);
}
function Jt(e, t, r, n) {
  if (r === void 0)
    return e.textContent = "";
  const l = n || document.createTextNode("");
  if (t.length) {
    let c = !1;
    for (let m = t.length - 1; m >= 0; m--) {
      const f = t[m];
      if (l !== f) {
        const v = f.parentNode === e;
        !c && !m ? v ? e.replaceChild(l, f) : e.insertBefore(l, r) : v && f.remove();
      } else
        c = !0;
    }
  } else
    e.insertBefore(l, r);
  return [l];
}
const $9 = "http://www.w3.org/2000/svg";
function _9(e, t = !1) {
  return t ? document.createElementNS($9, e) : document.createElement(e);
}
function li(e) {
  const {
    useShadow: t
  } = e, r = document.createTextNode(""), n = e.mount || document.body;
  function l() {
    if (ze.context) {
      const [c, m] = D(!1);
      return queueMicrotask(() => m(!0)), () => c() && e.children;
    } else
      return () => e.children;
  }
  if (n instanceof HTMLHeadElement) {
    const [c, m] = D(!1), f = () => m(!0);
    E1((v) => C(n, () => c() ? v() : l()(), null)), Ct(() => {
      ze.context ? queueMicrotask(f) : f();
    });
  } else {
    const c = _9(e.isSVG ? "g" : "div", e.isSVG), m = t && c.attachShadow ? c.attachShadow({
      mode: "open"
    }) : c;
    Object.defineProperty(c, "_$host", {
      get() {
        return r.parentNode;
      },
      configurable: !0
    }), C(m, l()), n.appendChild(c), e.ref && e.ref(c), Ct(() => n.removeChild(c));
  }
  return r;
}
var un = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ci(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var k9 = typeof un == "object" && un && un.Object === Object && un, ui = k9, x9 = ui, L9 = typeof self == "object" && self && self.Object === Object && self, w9 = x9 || L9 || Function("return this")(), ht = w9, A9 = ht, T9 = A9.Symbol, Dn = T9, s0 = Dn, di = Object.prototype, S9 = di.hasOwnProperty, M9 = di.toString, N1 = s0 ? s0.toStringTag : void 0;
function P9(e) {
  var t = S9.call(e, N1), r = e[N1];
  try {
    e[N1] = void 0;
    var n = !0;
  } catch {
  }
  var l = M9.call(e);
  return n && (t ? e[N1] = r : delete e[N1]), l;
}
var D9 = P9, N9 = Object.prototype, O9 = N9.toString;
function I9(e) {
  return O9.call(e);
}
var E9 = I9, l0 = Dn, B9 = D9, F9 = E9, U9 = "[object Null]", z9 = "[object Undefined]", c0 = l0 ? l0.toStringTag : void 0;
function V9(e) {
  return e == null ? e === void 0 ? z9 : U9 : c0 && c0 in Object(e) ? B9(e) : F9(e);
}
var F1 = V9;
function R9(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var o1 = R9, K9 = F1, j9 = o1, Q9 = "[object AsyncFunction]", Z9 = "[object Function]", H9 = "[object GeneratorFunction]", Y9 = "[object Proxy]";
function W9(e) {
  if (!j9(e))
    return !1;
  var t = K9(e);
  return t == Z9 || t == H9 || t == Q9 || t == Y9;
}
var hi = W9, q9 = ht, G9 = q9["__core-js_shared__"], X9 = G9, sr = X9, u0 = function() {
  var e = /[^.]+$/.exec(sr && sr.keys && sr.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function J9(e) {
  return !!u0 && u0 in e;
}
var es = J9, ts = Function.prototype, ns = ts.toString;
function rs(e) {
  if (e != null) {
    try {
      return ns.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var fi = rs, os = hi, is = es, as = o1, ss = fi, ls = /[\\^$.*+?()[\]{}|]/g, cs = /^\[object .+?Constructor\]$/, us = Function.prototype, ds = Object.prototype, hs = us.toString, fs = ds.hasOwnProperty, ms = RegExp(
  "^" + hs.call(fs).replace(ls, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function gs(e) {
  if (!as(e) || is(e))
    return !1;
  var t = os(e) ? ms : cs;
  return t.test(ss(e));
}
var ys = gs;
function Cs(e, t) {
  return e == null ? void 0 : e[t];
}
var ps = Cs, vs = ys, bs = ps;
function $s(e, t) {
  var r = bs(e, t);
  return vs(r) ? r : void 0;
}
var Vt = $s, _s = Vt, ks = function() {
  try {
    var e = _s(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), xs = ks, d0 = xs;
function Ls(e, t, r) {
  t == "__proto__" && d0 ? d0(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var mi = Ls;
function ws(e, t) {
  return e === t || e !== e && t !== t;
}
var gi = ws, As = mi, Ts = gi, Ss = Object.prototype, Ms = Ss.hasOwnProperty;
function Ps(e, t, r) {
  var n = e[t];
  (!(Ms.call(e, t) && Ts(n, r)) || r === void 0 && !(t in e)) && As(e, t, r);
}
var Tr = Ps, Ds = Array.isArray, i1 = Ds;
function Ns(e) {
  return e != null && typeof e == "object";
}
var a1 = Ns, Os = F1, Is = a1, Es = "[object Symbol]";
function Bs(e) {
  return typeof e == "symbol" || Is(e) && Os(e) == Es;
}
var Sr = Bs, Fs = i1, Us = Sr, zs = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Vs = /^\w*$/;
function Rs(e, t) {
  if (Fs(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || Us(e) ? !0 : Vs.test(e) || !zs.test(e) || t != null && e in Object(t);
}
var Ks = Rs, js = Vt, Qs = js(Object, "create"), Nn = Qs, h0 = Nn;
function Zs() {
  this.__data__ = h0 ? h0(null) : {}, this.size = 0;
}
var Hs = Zs;
function Ys(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var Ws = Ys, qs = Nn, Gs = "__lodash_hash_undefined__", Xs = Object.prototype, Js = Xs.hasOwnProperty;
function e5(e) {
  var t = this.__data__;
  if (qs) {
    var r = t[e];
    return r === Gs ? void 0 : r;
  }
  return Js.call(t, e) ? t[e] : void 0;
}
var t5 = e5, n5 = Nn, r5 = Object.prototype, o5 = r5.hasOwnProperty;
function i5(e) {
  var t = this.__data__;
  return n5 ? t[e] !== void 0 : o5.call(t, e);
}
var a5 = i5, s5 = Nn, l5 = "__lodash_hash_undefined__";
function c5(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = s5 && t === void 0 ? l5 : t, this;
}
var u5 = c5, d5 = Hs, h5 = Ws, f5 = t5, m5 = a5, g5 = u5;
function s1(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
s1.prototype.clear = d5;
s1.prototype.delete = h5;
s1.prototype.get = f5;
s1.prototype.has = m5;
s1.prototype.set = g5;
var y5 = s1;
function C5() {
  this.__data__ = [], this.size = 0;
}
var p5 = C5, v5 = gi;
function b5(e, t) {
  for (var r = e.length; r--; )
    if (v5(e[r][0], t))
      return r;
  return -1;
}
var On = b5, $5 = On, _5 = Array.prototype, k5 = _5.splice;
function x5(e) {
  var t = this.__data__, r = $5(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : k5.call(t, r, 1), --this.size, !0;
}
var L5 = x5, w5 = On;
function A5(e) {
  var t = this.__data__, r = w5(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var T5 = A5, S5 = On;
function M5(e) {
  return S5(this.__data__, e) > -1;
}
var P5 = M5, D5 = On;
function N5(e, t) {
  var r = this.__data__, n = D5(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
var O5 = N5, I5 = p5, E5 = L5, B5 = T5, F5 = P5, U5 = O5;
function l1(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
l1.prototype.clear = I5;
l1.prototype.delete = E5;
l1.prototype.get = B5;
l1.prototype.has = F5;
l1.prototype.set = U5;
var In = l1, z5 = Vt, V5 = ht, R5 = z5(V5, "Map"), Mr = R5, f0 = y5, K5 = In, j5 = Mr;
function Q5() {
  this.size = 0, this.__data__ = {
    hash: new f0(),
    map: new (j5 || K5)(),
    string: new f0()
  };
}
var Z5 = Q5;
function H5(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var Y5 = H5, W5 = Y5;
function q5(e, t) {
  var r = e.__data__;
  return W5(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var En = q5, G5 = En;
function X5(e) {
  var t = G5(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var J5 = X5, e6 = En;
function t6(e) {
  return e6(this, e).get(e);
}
var n6 = t6, r6 = En;
function o6(e) {
  return r6(this, e).has(e);
}
var i6 = o6, a6 = En;
function s6(e, t) {
  var r = a6(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
var l6 = s6, c6 = Z5, u6 = J5, d6 = n6, h6 = i6, f6 = l6;
function c1(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
c1.prototype.clear = c6;
c1.prototype.delete = u6;
c1.prototype.get = d6;
c1.prototype.has = h6;
c1.prototype.set = f6;
var yi = c1, Ci = yi, m6 = "Expected a function";
function Pr(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(m6);
  var r = function() {
    var n = arguments, l = t ? t.apply(this, n) : n[0], c = r.cache;
    if (c.has(l))
      return c.get(l);
    var m = e.apply(this, n);
    return r.cache = c.set(l, m) || c, m;
  };
  return r.cache = new (Pr.Cache || Ci)(), r;
}
Pr.Cache = Ci;
var g6 = Pr, y6 = g6, C6 = 500;
function p6(e) {
  var t = y6(e, function(n) {
    return r.size === C6 && r.clear(), n;
  }), r = t.cache;
  return t;
}
var v6 = p6, b6 = v6, $6 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, _6 = /\\(\\)?/g, k6 = b6(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace($6, function(r, n, l, c) {
    t.push(l ? c.replace(_6, "$1") : n || r);
  }), t;
}), x6 = k6;
function L6(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, l = Array(n); ++r < n; )
    l[r] = t(e[r], r, e);
  return l;
}
var w6 = L6, m0 = Dn, A6 = w6, T6 = i1, S6 = Sr, M6 = 1 / 0, g0 = m0 ? m0.prototype : void 0, y0 = g0 ? g0.toString : void 0;
function pi(e) {
  if (typeof e == "string")
    return e;
  if (T6(e))
    return A6(e, pi) + "";
  if (S6(e))
    return y0 ? y0.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -M6 ? "-0" : t;
}
var P6 = pi, D6 = P6;
function N6(e) {
  return e == null ? "" : D6(e);
}
var O6 = N6, I6 = i1, E6 = Ks, B6 = x6, F6 = O6;
function U6(e, t) {
  return I6(e) ? e : E6(e, t) ? [e] : B6(F6(e));
}
var z6 = U6, V6 = 9007199254740991, R6 = /^(?:0|[1-9]\d*)$/;
function K6(e, t) {
  var r = typeof e;
  return t = t ?? V6, !!t && (r == "number" || r != "symbol" && R6.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var vi = K6, j6 = Sr, Q6 = 1 / 0;
function Z6(e) {
  if (typeof e == "string" || j6(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -Q6 ? "-0" : t;
}
var H6 = Z6, Y6 = Tr, W6 = z6, q6 = vi, C0 = o1, G6 = H6;
function X6(e, t, r, n) {
  if (!C0(e))
    return e;
  t = W6(t, e);
  for (var l = -1, c = t.length, m = c - 1, f = e; f != null && ++l < c; ) {
    var v = G6(t[l]), L = r;
    if (v === "__proto__" || v === "constructor" || v === "prototype")
      return e;
    if (l != m) {
      var x = f[v];
      L = n ? n(x, v, f) : void 0, L === void 0 && (L = C0(x) ? x : q6(t[l + 1]) ? [] : {});
    }
    Y6(f, v, L), f = f[v];
  }
  return e;
}
var J6 = X6, e2 = J6;
function t2(e, t, r) {
  return e == null ? e : e2(e, t, r);
}
var n2 = t2;
const Fe = /* @__PURE__ */ ci(n2);
var r2 = In;
function o2() {
  this.__data__ = new r2(), this.size = 0;
}
var i2 = o2;
function a2(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
var s2 = a2;
function l2(e) {
  return this.__data__.get(e);
}
var c2 = l2;
function u2(e) {
  return this.__data__.has(e);
}
var d2 = u2, h2 = In, f2 = Mr, m2 = yi, g2 = 200;
function y2(e, t) {
  var r = this.__data__;
  if (r instanceof h2) {
    var n = r.__data__;
    if (!f2 || n.length < g2 - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new m2(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
var C2 = y2, p2 = In, v2 = i2, b2 = s2, $2 = c2, _2 = d2, k2 = C2;
function u1(e) {
  var t = this.__data__ = new p2(e);
  this.size = t.size;
}
u1.prototype.clear = v2;
u1.prototype.delete = b2;
u1.prototype.get = $2;
u1.prototype.has = _2;
u1.prototype.set = k2;
var x2 = u1;
function L2(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var w2 = L2, A2 = Tr, T2 = mi;
function S2(e, t, r, n) {
  var l = !r;
  r || (r = {});
  for (var c = -1, m = t.length; ++c < m; ) {
    var f = t[c], v = n ? n(r[f], e[f], f, r, e) : void 0;
    v === void 0 && (v = e[f]), l ? T2(r, f, v) : A2(r, f, v);
  }
  return r;
}
var Bn = S2;
function M2(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var P2 = M2, D2 = F1, N2 = a1, O2 = "[object Arguments]";
function I2(e) {
  return N2(e) && D2(e) == O2;
}
var E2 = I2, p0 = E2, B2 = a1, bi = Object.prototype, F2 = bi.hasOwnProperty, U2 = bi.propertyIsEnumerable, z2 = p0(function() {
  return arguments;
}()) ? p0 : function(e) {
  return B2(e) && F2.call(e, "callee") && !U2.call(e, "callee");
}, V2 = z2, xn = { exports: {} };
function R2() {
  return !1;
}
var K2 = R2;
xn.exports;
(function(e, t) {
  var r = ht, n = K2, l = t && !t.nodeType && t, c = l && !0 && e && !e.nodeType && e, m = c && c.exports === l, f = m ? r.Buffer : void 0, v = f ? f.isBuffer : void 0, L = v || n;
  e.exports = L;
})(xn, xn.exports);
var $i = xn.exports, j2 = 9007199254740991;
function Q2(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= j2;
}
var _i = Q2, Z2 = F1, H2 = _i, Y2 = a1, W2 = "[object Arguments]", q2 = "[object Array]", G2 = "[object Boolean]", X2 = "[object Date]", J2 = "[object Error]", el = "[object Function]", tl = "[object Map]", nl = "[object Number]", rl = "[object Object]", ol = "[object RegExp]", il = "[object Set]", al = "[object String]", sl = "[object WeakMap]", ll = "[object ArrayBuffer]", cl = "[object DataView]", ul = "[object Float32Array]", dl = "[object Float64Array]", hl = "[object Int8Array]", fl = "[object Int16Array]", ml = "[object Int32Array]", gl = "[object Uint8Array]", yl = "[object Uint8ClampedArray]", Cl = "[object Uint16Array]", pl = "[object Uint32Array]", Ae = {};
Ae[ul] = Ae[dl] = Ae[hl] = Ae[fl] = Ae[ml] = Ae[gl] = Ae[yl] = Ae[Cl] = Ae[pl] = !0;
Ae[W2] = Ae[q2] = Ae[ll] = Ae[G2] = Ae[cl] = Ae[X2] = Ae[J2] = Ae[el] = Ae[tl] = Ae[nl] = Ae[rl] = Ae[ol] = Ae[il] = Ae[al] = Ae[sl] = !1;
function vl(e) {
  return Y2(e) && H2(e.length) && !!Ae[Z2(e)];
}
var bl = vl;
function $l(e) {
  return function(t) {
    return e(t);
  };
}
var Dr = $l, Ln = { exports: {} };
Ln.exports;
(function(e, t) {
  var r = ui, n = t && !t.nodeType && t, l = n && !0 && e && !e.nodeType && e, c = l && l.exports === n, m = c && r.process, f = function() {
    try {
      var v = l && l.require && l.require("util").types;
      return v || m && m.binding && m.binding("util");
    } catch {
    }
  }();
  e.exports = f;
})(Ln, Ln.exports);
var Nr = Ln.exports, _l = bl, kl = Dr, v0 = Nr, b0 = v0 && v0.isTypedArray, xl = b0 ? kl(b0) : _l, Ll = xl, wl = P2, Al = V2, Tl = i1, Sl = $i, Ml = vi, Pl = Ll, Dl = Object.prototype, Nl = Dl.hasOwnProperty;
function Ol(e, t) {
  var r = Tl(e), n = !r && Al(e), l = !r && !n && Sl(e), c = !r && !n && !l && Pl(e), m = r || n || l || c, f = m ? wl(e.length, String) : [], v = f.length;
  for (var L in e)
    (t || Nl.call(e, L)) && !(m && // Safari 9 has enumerable `arguments.length` in strict mode.
    (L == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    l && (L == "offset" || L == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    c && (L == "buffer" || L == "byteLength" || L == "byteOffset") || // Skip index properties.
    Ml(L, v))) && f.push(L);
  return f;
}
var ki = Ol, Il = Object.prototype;
function El(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || Il;
  return e === r;
}
var Or = El;
function Bl(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var xi = Bl, Fl = xi, Ul = Fl(Object.keys, Object), zl = Ul, Vl = Or, Rl = zl, Kl = Object.prototype, jl = Kl.hasOwnProperty;
function Ql(e) {
  if (!Vl(e))
    return Rl(e);
  var t = [];
  for (var r in Object(e))
    jl.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
var Zl = Ql, Hl = hi, Yl = _i;
function Wl(e) {
  return e != null && Yl(e.length) && !Hl(e);
}
var Li = Wl, ql = ki, Gl = Zl, Xl = Li;
function Jl(e) {
  return Xl(e) ? ql(e) : Gl(e);
}
var Ir = Jl, e3 = Bn, t3 = Ir;
function n3(e, t) {
  return e && e3(t, t3(t), e);
}
var r3 = n3;
function o3(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var i3 = o3, a3 = o1, s3 = Or, l3 = i3, c3 = Object.prototype, u3 = c3.hasOwnProperty;
function d3(e) {
  if (!a3(e))
    return l3(e);
  var t = s3(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !u3.call(e, n)) || r.push(n);
  return r;
}
var h3 = d3, f3 = ki, m3 = h3, g3 = Li;
function y3(e) {
  return g3(e) ? f3(e, !0) : m3(e);
}
var Er = y3, C3 = Bn, p3 = Er;
function v3(e, t) {
  return e && C3(t, p3(t), e);
}
var b3 = v3, wn = { exports: {} };
wn.exports;
(function(e, t) {
  var r = ht, n = t && !t.nodeType && t, l = n && !0 && e && !e.nodeType && e, c = l && l.exports === n, m = c ? r.Buffer : void 0, f = m ? m.allocUnsafe : void 0;
  function v(L, x) {
    if (x)
      return L.slice();
    var w = L.length, U = f ? f(w) : new L.constructor(w);
    return L.copy(U), U;
  }
  e.exports = v;
})(wn, wn.exports);
var $3 = wn.exports;
function _3(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
var k3 = _3;
function x3(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, l = 0, c = []; ++r < n; ) {
    var m = e[r];
    t(m, r, e) && (c[l++] = m);
  }
  return c;
}
var L3 = x3;
function w3() {
  return [];
}
var wi = w3, A3 = L3, T3 = wi, S3 = Object.prototype, M3 = S3.propertyIsEnumerable, $0 = Object.getOwnPropertySymbols, P3 = $0 ? function(e) {
  return e == null ? [] : (e = Object(e), A3($0(e), function(t) {
    return M3.call(e, t);
  }));
} : T3, Br = P3, D3 = Bn, N3 = Br;
function O3(e, t) {
  return D3(e, N3(e), t);
}
var I3 = O3;
function E3(e, t) {
  for (var r = -1, n = t.length, l = e.length; ++r < n; )
    e[l + r] = t[r];
  return e;
}
var Ai = E3, B3 = xi, F3 = B3(Object.getPrototypeOf, Object), Ti = F3, U3 = Ai, z3 = Ti, V3 = Br, R3 = wi, K3 = Object.getOwnPropertySymbols, j3 = K3 ? function(e) {
  for (var t = []; e; )
    U3(t, V3(e)), e = z3(e);
  return t;
} : R3, Si = j3, Q3 = Bn, Z3 = Si;
function H3(e, t) {
  return Q3(e, Z3(e), t);
}
var Y3 = H3, W3 = Ai, q3 = i1;
function G3(e, t, r) {
  var n = t(e);
  return q3(e) ? n : W3(n, r(e));
}
var Mi = G3, X3 = Mi, J3 = Br, e8 = Ir;
function t8(e) {
  return X3(e, e8, J3);
}
var n8 = t8, r8 = Mi, o8 = Si, i8 = Er;
function a8(e) {
  return r8(e, i8, o8);
}
var s8 = a8, l8 = Vt, c8 = ht, u8 = l8(c8, "DataView"), d8 = u8, h8 = Vt, f8 = ht, m8 = h8(f8, "Promise"), g8 = m8, y8 = Vt, C8 = ht, p8 = y8(C8, "Set"), v8 = p8, b8 = Vt, $8 = ht, _8 = b8($8, "WeakMap"), k8 = _8, Cr = d8, pr = Mr, vr = g8, br = v8, $r = k8, Pi = F1, d1 = fi, _0 = "[object Map]", x8 = "[object Object]", k0 = "[object Promise]", x0 = "[object Set]", L0 = "[object WeakMap]", w0 = "[object DataView]", L8 = d1(Cr), w8 = d1(pr), A8 = d1(vr), T8 = d1(br), S8 = d1($r), Ft = Pi;
(Cr && Ft(new Cr(new ArrayBuffer(1))) != w0 || pr && Ft(new pr()) != _0 || vr && Ft(vr.resolve()) != k0 || br && Ft(new br()) != x0 || $r && Ft(new $r()) != L0) && (Ft = function(e) {
  var t = Pi(e), r = t == x8 ? e.constructor : void 0, n = r ? d1(r) : "";
  if (n)
    switch (n) {
      case L8:
        return w0;
      case w8:
        return _0;
      case A8:
        return k0;
      case T8:
        return x0;
      case S8:
        return L0;
    }
  return t;
});
var Fr = Ft, M8 = Object.prototype, P8 = M8.hasOwnProperty;
function D8(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && P8.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
var N8 = D8, O8 = ht, I8 = O8.Uint8Array, E8 = I8, A0 = E8;
function B8(e) {
  var t = new e.constructor(e.byteLength);
  return new A0(t).set(new A0(e)), t;
}
var Ur = B8, F8 = Ur;
function U8(e, t) {
  var r = t ? F8(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var z8 = U8, V8 = /\w*$/;
function R8(e) {
  var t = new e.constructor(e.source, V8.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var K8 = R8, T0 = Dn, S0 = T0 ? T0.prototype : void 0, M0 = S0 ? S0.valueOf : void 0;
function j8(e) {
  return M0 ? Object(M0.call(e)) : {};
}
var Q8 = j8, Z8 = Ur;
function H8(e, t) {
  var r = t ? Z8(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
var Y8 = H8, W8 = Ur, q8 = z8, G8 = K8, X8 = Q8, J8 = Y8, ec = "[object Boolean]", tc = "[object Date]", nc = "[object Map]", rc = "[object Number]", oc = "[object RegExp]", ic = "[object Set]", ac = "[object String]", sc = "[object Symbol]", lc = "[object ArrayBuffer]", cc = "[object DataView]", uc = "[object Float32Array]", dc = "[object Float64Array]", hc = "[object Int8Array]", fc = "[object Int16Array]", mc = "[object Int32Array]", gc = "[object Uint8Array]", yc = "[object Uint8ClampedArray]", Cc = "[object Uint16Array]", pc = "[object Uint32Array]";
function vc(e, t, r) {
  var n = e.constructor;
  switch (t) {
    case lc:
      return W8(e);
    case ec:
    case tc:
      return new n(+e);
    case cc:
      return q8(e, r);
    case uc:
    case dc:
    case hc:
    case fc:
    case mc:
    case gc:
    case yc:
    case Cc:
    case pc:
      return J8(e, r);
    case nc:
      return new n();
    case rc:
    case ac:
      return new n(e);
    case oc:
      return G8(e);
    case ic:
      return new n();
    case sc:
      return X8(e);
  }
}
var bc = vc, $c = o1, P0 = Object.create, _c = function() {
  function e() {
  }
  return function(t) {
    if (!$c(t))
      return {};
    if (P0)
      return P0(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}(), kc = _c, xc = kc, Lc = Ti, wc = Or;
function Ac(e) {
  return typeof e.constructor == "function" && !wc(e) ? xc(Lc(e)) : {};
}
var Tc = Ac, Sc = Fr, Mc = a1, Pc = "[object Map]";
function Dc(e) {
  return Mc(e) && Sc(e) == Pc;
}
var Nc = Dc, Oc = Nc, Ic = Dr, D0 = Nr, N0 = D0 && D0.isMap, Ec = N0 ? Ic(N0) : Oc, Bc = Ec, Fc = Fr, Uc = a1, zc = "[object Set]";
function Vc(e) {
  return Uc(e) && Fc(e) == zc;
}
var Rc = Vc, Kc = Rc, jc = Dr, O0 = Nr, I0 = O0 && O0.isSet, Qc = I0 ? jc(I0) : Kc, Zc = Qc, Hc = x2, Yc = w2, Wc = Tr, qc = r3, Gc = b3, Xc = $3, Jc = k3, e7 = I3, t7 = Y3, n7 = n8, r7 = s8, o7 = Fr, i7 = N8, a7 = bc, s7 = Tc, l7 = i1, c7 = $i, u7 = Bc, d7 = o1, h7 = Zc, f7 = Ir, m7 = Er, g7 = 1, y7 = 2, C7 = 4, Di = "[object Arguments]", p7 = "[object Array]", v7 = "[object Boolean]", b7 = "[object Date]", $7 = "[object Error]", Ni = "[object Function]", _7 = "[object GeneratorFunction]", k7 = "[object Map]", x7 = "[object Number]", Oi = "[object Object]", L7 = "[object RegExp]", w7 = "[object Set]", A7 = "[object String]", T7 = "[object Symbol]", S7 = "[object WeakMap]", M7 = "[object ArrayBuffer]", P7 = "[object DataView]", D7 = "[object Float32Array]", N7 = "[object Float64Array]", O7 = "[object Int8Array]", I7 = "[object Int16Array]", E7 = "[object Int32Array]", B7 = "[object Uint8Array]", F7 = "[object Uint8ClampedArray]", U7 = "[object Uint16Array]", z7 = "[object Uint32Array]", ke = {};
ke[Di] = ke[p7] = ke[M7] = ke[P7] = ke[v7] = ke[b7] = ke[D7] = ke[N7] = ke[O7] = ke[I7] = ke[E7] = ke[k7] = ke[x7] = ke[Oi] = ke[L7] = ke[w7] = ke[A7] = ke[T7] = ke[B7] = ke[F7] = ke[U7] = ke[z7] = !0;
ke[$7] = ke[Ni] = ke[S7] = !1;
function yn(e, t, r, n, l, c) {
  var m, f = t & g7, v = t & y7, L = t & C7;
  if (r && (m = l ? r(e, n, l, c) : r(e)), m !== void 0)
    return m;
  if (!d7(e))
    return e;
  var x = l7(e);
  if (x) {
    if (m = i7(e), !f)
      return Jc(e, m);
  } else {
    var w = o7(e), U = w == Ni || w == _7;
    if (c7(e))
      return Xc(e, f);
    if (w == Oi || w == Di || U && !l) {
      if (m = v || U ? {} : s7(e), !f)
        return v ? t7(e, Gc(m, e)) : e7(e, qc(m, e));
    } else {
      if (!ke[w])
        return l ? e : {};
      m = a7(e, w, f);
    }
  }
  c || (c = new Hc());
  var K = c.get(e);
  if (K)
    return K;
  c.set(e, m), h7(e) ? e.forEach(function(E) {
    m.add(yn(E, t, r, E, e, c));
  }) : u7(e) && e.forEach(function(E, z) {
    m.set(z, yn(E, t, r, z, e, c));
  });
  var ye = L ? v ? r7 : n7 : v ? m7 : f7, S = x ? void 0 : ye(e);
  return Yc(S || e, function(E, z) {
    S && (z = E, E = e[z]), Wc(m, z, yn(E, t, r, z, e, c));
  }), m;
}
var V7 = yn, R7 = V7, K7 = 1, j7 = 4;
function Q7(e) {
  return R7(e, K7 | j7);
}
var Z7 = Q7;
const H7 = /* @__PURE__ */ ci(Z7), Y7 = /* @__PURE__ */ $("<button></button>"), W7 = (e) => (() => {
  const t = Y7.cloneNode(!0);
  return ut(t, "click", e.onClick, !0), C(t, () => e.children), F((r) => {
    const n = e.style, l = `klinecharts-pro-button ${e.type ?? "confirm"} ${e.class ?? ""}`;
    return r._v$ = Tt(t, n, r._v$), l !== r._v$2 && he(t, r._v$2 = l), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
Ye(["click"]);
const q7 = /* @__PURE__ */ $('<svg viewBox="0 0 1024 1024" class="icon"><path d="M810.666667 128H213.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v597.333334c0 46.933333 38.4 85.333333 85.333333 85.333333h597.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V213.333333c0-46.933333-38.4-85.333333-85.333333-85.333333z m-353.706667 567.04a42.496 42.496 0 0 1-60.16 0L243.626667 541.866667c-8.106667-8.106667-12.373333-18.773333-12.373334-29.866667s4.693333-22.186667 12.373334-29.866667a42.496 42.496 0 0 1 60.16 0L426.666667 604.586667l293.546666-293.546667a42.496 42.496 0 1 1 60.16 60.16l-323.413333 323.84z"></path></svg>'), G7 = /* @__PURE__ */ $('<svg viewBox="0 0 1024 1024" class="icon"><path d="M245.333333 128h533.333334A117.333333 117.333333 0 0 1 896 245.333333v533.333334A117.333333 117.333333 0 0 1 778.666667 896H245.333333A117.333333 117.333333 0 0 1 128 778.666667V245.333333A117.333333 117.333333 0 0 1 245.333333 128z m0 64c-29.44 0-53.333333 23.893333-53.333333 53.333333v533.333334c0 29.44 23.893333 53.333333 53.333333 53.333333h533.333334c29.44 0 53.333333-23.893333 53.333333-53.333333V245.333333c0-29.44-23.893333-53.333333-53.333333-53.333333H245.333333z"></path></svg>'), X7 = /* @__PURE__ */ $("<div></div>"), J7 = /* @__PURE__ */ $('<span class="label"></span>'), e4 = () => q7.cloneNode(!0), t4 = () => G7.cloneNode(!0), E0 = (e) => {
  const [t, r] = D(e.checked ?? !1);
  return Ke(() => {
    "checked" in e && r(e.checked);
  }), (() => {
    const n = X7.cloneNode(!0);
    return n.$$click = (l) => {
      const c = !t();
      e.onChange && e.onChange(c), r(c);
    }, C(n, (() => {
      const l = X(() => !!t());
      return () => l() ? T(e4, {}) : T(t4, {});
    })(), null), C(n, (() => {
      const l = X(() => !!e.label);
      return () => l() && (() => {
        const c = J7.cloneNode(!0);
        return C(c, () => e.label), c;
      })();
    })(), null), F((l) => {
      const c = e.style, m = `klinecharts-pro-checkbox ${t() && "checked" || ""} ${e.class || ""}`;
      return l._v$ = Tt(n, c, l._v$), m !== l._v$2 && he(n, l._v$2 = m), l;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), n;
  })();
};
Ye(["click"]);
const n4 = /* @__PURE__ */ $('<div class="klinecharts-pro-loading"><i class="circle1"></i><i class="circle2"></i><i class="circle3"></i></div>'), Ii = () => n4.cloneNode(!0), r4 = /* @__PURE__ */ $('<div class="klinecharts-pro-empty"><svg class="icon" viewBox="0 0 1024 1024"><path d="M855.6 427.2H168.5c-12.7 0-24.4 6.9-30.6 18L4.4 684.7C1.5 689.9 0 695.8 0 701.8v287.1c0 19.4 15.7 35.1 35.1 35.1H989c19.4 0 35.1-15.7 35.1-35.1V701.8c0-6-1.5-11.8-4.4-17.1L886.2 445.2c-6.2-11.1-17.9-18-30.6-18zM673.4 695.6c-16.5 0-30.8 11.5-34.3 27.7-12.7 58.5-64.8 102.3-127.2 102.3s-114.5-43.8-127.2-102.3c-3.5-16.1-17.8-27.7-34.3-27.7H119c-26.4 0-43.3-28-31.1-51.4l81.7-155.8c6.1-11.6 18-18.8 31.1-18.8h622.4c13 0 25 7.2 31.1 18.8l81.7 155.8c12.2 23.4-4.7 51.4-31.1 51.4H673.4zM819.9 209.5c-1-1.8-2.1-3.7-3.2-5.5-9.8-16.6-31.1-22.2-47.8-12.6L648.5 261c-17 9.8-22.7 31.6-12.6 48.4 0.9 1.4 1.7 2.9 2.5 4.4 9.5 17 31.2 22.8 48 13L807 257.3c16.7-9.7 22.4-31 12.9-47.8zM375.4 261.1L255 191.6c-16.7-9.6-38-4-47.8 12.6-1.1 1.8-2.1 3.6-3.2 5.5-9.5 16.8-3.8 38.1 12.9 47.8L337.3 327c16.9 9.7 38.6 4 48-13.1 0.8-1.5 1.7-2.9 2.5-4.4 10.2-16.8 4.5-38.6-12.4-48.4zM512 239.3h2.5c19.5 0.3 35.5-15.5 35.5-35.1v-139c0-19.3-15.6-34.9-34.8-35.1h-6.4C489.6 30.3 474 46 474 65.2v139c0 19.5 15.9 35.4 35.5 35.1h2.5z"></path></svg></div>'), o4 = () => r4.cloneNode(!0), i4 = /* @__PURE__ */ $("<ul></ul>"), a4 = /* @__PURE__ */ $("<li></li>"), An = (e) => (() => {
  const t = i4.cloneNode(!0);
  return C(t, T(le, {
    get when() {
      return e.loading;
    },
    get children() {
      return T(Ii, {});
    }
  }), null), C(t, T(le, {
    get when() {
      var r;
      return !e.loading && !e.children && !((r = e.dataSource) != null && r.length);
    },
    get children() {
      return T(o4, {});
    }
  }), null), C(t, T(le, {
    get when() {
      return e.children;
    },
    get children() {
      return e.children;
    }
  }), null), C(t, T(le, {
    get when() {
      return !e.children;
    },
    get children() {
      var r;
      return (r = e.dataSource) == null ? void 0 : r.map((n) => {
        var l;
        return ((l = e.renderItem) == null ? void 0 : l.call(e, n)) ?? a4.cloneNode(!0);
      });
    }
  }), null), F((r) => {
    const n = e.style, l = `klinecharts-pro-list ${e.class ?? ""}`;
    return r._v$ = Tt(t, n, r._v$), l !== r._v$2 && he(t, r._v$2 = l), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})(), s4 = /* @__PURE__ */ $('<div class="klinecharts-pro-modal"><div class="inner"><div class="title-container"><svg class="close-icon" viewBox="0 0 1024 1024"><path d="M934.184927 199.723787 622.457206 511.452531l311.727721 311.703161c14.334473 14.229073 23.069415 33.951253 23.069415 55.743582 0 43.430138-35.178197 78.660524-78.735226 78.660524-21.664416 0-41.361013-8.865925-55.642275-23.069415L511.149121 622.838388 199.420377 934.490384c-14.204513 14.20349-33.901111 23.069415-55.642275 23.069415-43.482327 0-78.737272-35.230386-78.737272-78.660524 0-21.792329 8.864902-41.513486 23.094998-55.743582l311.677579-311.703161L88.135828 199.723787c-14.230096-14.255679-23.094998-33.92567-23.094998-55.642275 0-43.430138 35.254945-78.762855 78.737272-78.762855 21.741163 0 41.437761 8.813736 55.642275 23.069415l311.727721 311.727721L822.876842 88.389096c14.281261-14.255679 33.977859-23.069415 55.642275-23.069415 43.557028 0 78.735226 35.332716 78.735226 78.762855C957.254342 165.798117 948.5194 185.468109 934.184927 199.723787"></path></svg></div><div class="content-container"></div></div></div>'), l4 = /* @__PURE__ */ $('<div class="button-container"></div>'), St = (e) => (() => {
  const t = s4.cloneNode(!0), r = t.firstChild, n = r.firstChild, l = n.firstChild, c = n.nextSibling;
  return t.$$click = (m) => {
    m.target === m.currentTarget && e.onClose && e.onClose();
  }, C(n, () => e.title, l), ut(l, "click", e.onClose, !0), C(c, () => e.children), C(r, (() => {
    const m = X(() => !!(e.buttons && e.buttons.length > 0));
    return () => m() && (() => {
      const f = l4.cloneNode(!0);
      return C(f, () => e.buttons.map((v) => T(W7, si(v, {
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
      })))), F((v) => {
        const L = e.btnParentStyle, x = !!e.isMobile;
        return v._v$8 = Tt(f, L, v._v$8), x !== v._v$9 && f.classList.toggle("mobile-buttons", v._v$9 = x), v;
      }, {
        _v$8: void 0,
        _v$9: void 0
      }), f;
    })();
  })(), null), F((m) => {
    const f = !!e.isMobile, v = e.isMobile ? "100%" : `${e.width ?? 400}px`, L = (e.isMobile, "auto"), x = e.isMobile ? "60vh" : "90vh", w = !!e.isMobile, U = !!e.isMobile, K = !!e.isMobile;
    return f !== m._v$ && t.classList.toggle("mobile-modal", m._v$ = f), v !== m._v$2 && r.style.setProperty("width", m._v$2 = v), L !== m._v$3 && r.style.setProperty("height", m._v$3 = L), x !== m._v$4 && r.style.setProperty("max-height", m._v$4 = x), w !== m._v$5 && r.classList.toggle("mobile-inner", m._v$5 = w), U !== m._v$6 && n.classList.toggle("mobile-title", m._v$6 = U), K !== m._v$7 && c.classList.toggle("mobile-content", m._v$7 = K), m;
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
const c4 = /* @__PURE__ */ $('<div class="drop-down-container klinecharts-pro-select-dropdown-portal"><ul></ul></div>'), u4 = /* @__PURE__ */ $('<div><input type="text"></div>'), d4 = /* @__PURE__ */ $("<li></li>"), h4 = /* @__PURE__ */ $('<div tabindex="0"><div class="selector-container"><span class="value"></span><i class="arrow"></i></div></div>'), Cn = (e) => {
  const [t, r] = D(!1), [n, l] = D(""), [c, m] = D({});
  let f, v, L;
  const x = () => {
    if (!v)
      return;
    const S = v.getBoundingClientRect(), E = 4, z = Math.min(260, Math.max(140, window.innerHeight - 32)), G = window.innerHeight - S.bottom - E, B = S.top - E, H = G < 180 && B > G, Y = Math.max(140, Math.min(z, H ? B - E : G - E));
    m({
      position: "fixed",
      left: `${S.left}px`,
      top: H ? "auto" : `${S.bottom + E}px`,
      bottom: H ? `${window.innerHeight - S.top + E}px` : "auto",
      width: `${S.width}px`,
      "max-height": `${Y}px`,
      "transform-origin": H ? "bottom" : "top",
      opacity: 1,
      transform: "scaleY(1)",
      "z-index": 1e4
    });
  }, w = X(() => {
    if (!e.dataSource || !e.searchable)
      return e.dataSource;
    const S = n().toLowerCase().trim();
    return S ? typeof e.dataSource[0] == "string" ? e.dataSource.filter((z) => z.toLowerCase().includes(S)) : e.dataSource.filter((z) => {
      var H, Y;
      const G = ((H = z.text) == null ? void 0 : H.toString().toLowerCase()) || "", B = ((Y = z.key) == null ? void 0 : Y.toLowerCase()) || "";
      return G.includes(S) || B.includes(S);
    }) : e.dataSource;
  }), U = () => {
    const S = !t();
    r(S), l(""), S && e.searchable && setTimeout(() => f == null ? void 0 : f.focus(), 50);
  }, K = (S) => {
    const E = S.relatedTarget;
    E && (v && v.contains(E) || L && L.contains(E)) || setTimeout(() => {
      document.activeElement && (v && v.contains(document.activeElement) || L && L.contains(document.activeElement)) || (r(!1), l(""));
    }, 0);
  };
  Ke(() => {
    if (!t())
      return;
    x();
    const S = (z) => {
      const G = z.target;
      v && v.contains(G) || L && L.contains(G) || (r(!1), l(""));
    }, E = () => x();
    document.addEventListener("mousedown", S), window.addEventListener("resize", E), window.addEventListener("scroll", E, !0), Ct(() => {
      document.removeEventListener("mousedown", S), window.removeEventListener("resize", E), window.removeEventListener("scroll", E, !0);
    });
  });
  const ye = () => (() => {
    const S = c4.cloneNode(!0), E = S.firstChild;
    S.$$click = (G) => G.stopPropagation(), S.$$mousedown = (G) => {
      G.preventDefault(), G.stopPropagation();
    };
    const z = L;
    return typeof z == "function" ? yt(z, S) : L = S, C(S, (() => {
      const G = X(() => !!e.searchable);
      return () => G() && (() => {
        const B = u4.cloneNode(!0), H = B.firstChild;
        B.style.setProperty("padding", "8px"), B.style.setProperty("border-bottom", "1px solid #333"), H.$$click = (ce) => ce.stopPropagation(), H.$$input = (ce) => l(ce.currentTarget.value);
        const Y = f;
        return typeof Y == "function" ? yt(Y, H) : f = H, H.style.setProperty("width", "100%"), H.style.setProperty("padding", "6px 10px"), H.style.setProperty("border", "1px solid var(--klinecharts-pro-border-color)"), H.style.setProperty("border-radius", "4px"), H.style.setProperty("background-color", "var(--klinecharts-pro-popover-background-color)"), H.style.setProperty("color", "#fff"), H.style.setProperty("font-size", "13px"), H.style.setProperty("outline", "none"), F(() => Ie(H, "placeholder", e.searchPlaceholder || "Search...")), F(() => H.value = n()), B;
      })();
    })(), E), C(E, () => {
      var G;
      return (G = w()) == null ? void 0 : G.map((B) => {
        const Y = B[e.valueKey ?? "text"] ?? B;
        return (() => {
          const ce = d4.cloneNode(!0);
          return ce.$$click = (W) => {
            var j;
            W.stopPropagation(), e.value !== Y && ((j = e.onSelected) == null || j.call(e, B)), r(!1), l("");
          }, C(ce, Y), F(() => ce.classList.toggle("selected", e.value === Y)), ce;
        })();
      });
    }), F((G) => Tt(S, c(), G)), S;
  })();
  return (() => {
    const S = h4.cloneNode(!0), E = S.firstChild, z = E.firstChild;
    S.addEventListener("blur", K), S.$$click = (B) => {
      B.stopPropagation(), !B.target.closest(".drop-down-container") && U();
    };
    const G = v;
    return typeof G == "function" ? yt(G, S) : v = S, C(z, () => e.value), C(S, (() => {
      const B = X(() => !!(e.dataSource && e.dataSource.length > 0 && t()));
      return () => B() && T(li, {
        get children() {
          return ye();
        }
      });
    })(), null), F((B) => {
      const H = e.style, Y = `klinecharts-pro-select ${e.class ?? ""} ${t() ? "klinecharts-pro-select-show" : ""}`;
      return B._v$ = Tt(S, H, B._v$), Y !== B._v$2 && he(S, B._v$2 = Y), B;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), S;
  })();
};
Ye(["mousedown", "click", "input"]);
const f4 = /* @__PURE__ */ $('<span class="prefix"></span>'), m4 = /* @__PURE__ */ $('<span class="suffix"></span>'), g4 = /* @__PURE__ */ $('<div><input class="value"></div>'), Ei = (e) => {
  const t = si({
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER
  }, e);
  let r;
  const [n, l] = D("normal");
  return (() => {
    const c = g4.cloneNode(!0), m = c.firstChild;
    return c.$$click = () => {
      r == null || r.focus();
    }, C(c, T(le, {
      get when() {
        return t.prefix;
      },
      get children() {
        const f = f4.cloneNode(!0);
        return C(f, () => t.prefix), f;
      }
    }), m), m.addEventListener("change", (f) => {
      var L, x;
      const v = f.target.value;
      if ("precision" in t) {
        let w;
        const U = Math.max(0, Math.floor(t.precision));
        U <= 0 ? w = new RegExp(/^[1-9]\d*$/) : w = new RegExp("^\\d+\\.?\\d{0," + U + "}$"), (v === "" || w.test(v) && +v >= t.min && +v <= t.max) && ((L = t.onChange) == null || L.call(t, v === "" ? v : +v));
      } else
        (x = t.onChange) == null || x.call(t, v);
    }), m.addEventListener("blur", () => {
      l("normal");
    }), m.addEventListener("focus", () => {
      l("focus");
    }), yt((f) => {
      r = f;
    }, m), C(c, T(le, {
      get when() {
        return t.suffix;
      },
      get children() {
        const f = m4.cloneNode(!0);
        return C(f, () => t.suffix), f;
      }
    }), null), F((f) => {
      const v = t.style, L = `klinecharts-pro-input ${t.class ?? ""}`, x = n(), w = t.placeholder ?? "";
      return f._v$ = Tt(c, v, f._v$), L !== f._v$2 && he(c, f._v$2 = L), x !== f._v$3 && Ie(c, "data-status", f._v$3 = x), w !== f._v$4 && Ie(m, "placeholder", f._v$4 = w), f;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0
    }), F(() => m.value = t.value), c;
  })();
};
Ye(["click"]);
const y4 = /* @__PURE__ */ $('<div><i class="thumb"></i></div>'), _r = (e) => (() => {
  const t = y4.cloneNode(!0);
  return t.$$click = (r) => {
    e.onChange && e.onChange();
  }, F((r) => {
    const n = e.style, l = `klinecharts-pro-switch ${e.open ? "turn-on" : "turn-off"} ${e.class ?? ""}`;
    return r._v$ = Tt(t, n, r._v$), l !== r._v$2 && he(t, r._v$2 = l), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
Ye(["click"]);
let de = null, B0 = !1;
const O1 = /* @__PURE__ */ new Map(), C4 = 500, F0 = 3;
function dn(e) {
  return e == null ? void 0 : e.trim().toLowerCase();
}
function p4(e, t) {
  return e.x >= t.x && e.x <= t.x + t.width && e.y >= t.y && e.y <= t.y + t.height;
}
function kr(e) {
  const t = de;
  if (!t || !e)
    return null;
  const r = dn(e);
  return r === dn(t.upColor) ? "up" : r === dn(t.downColor) ? "down" : r === dn(t.noChangeColor) ? "noChange" : null;
}
function lr(e, t, r) {
  const n = de;
  if (!n || !e)
    return e;
  const l = r ?? kr(e);
  return l === "up" ? t === "border" ? n.upBorderColor ?? n.borderUpColor ?? e : t === "wick" ? n.upWickColor ?? n.wickUpColor ?? e : n.upColor ?? e : l === "down" ? t === "border" ? n.downBorderColor ?? n.borderDownColor ?? e : t === "wick" ? n.downWickColor ?? n.wickDownColor ?? e : n.downColor ?? e : l === "noChange" ? t === "border" ? n.noChangeBorderColor ?? n.borderNoChangeColor ?? e : t === "wick" ? n.noChangeWickColor ?? n.wickNoChangeColor ?? e : n.noChangeColor ?? e : e;
}
function v4(e) {
  return Math.round((e.x + e.width / 2) * 1e3) / 1e3;
}
function b4(e) {
  return Math.round(Math.abs(e.width) * 1e3) / 1e3;
}
function $4(e, t) {
  if (t)
    return !1;
  const r = v4(e), n = b4(e), l = O1.get(r) ?? 0;
  if (n > Math.max(F0, l)) {
    if (O1.set(r, n), O1.size > C4) {
      const m = O1.keys().next().value;
      m !== void 0 && O1.delete(m);
    }
    return !1;
  }
  const c = Math.max(F0, l * 0.35);
  return n <= c;
}
function cr(e, t, r) {
  const { x: n, y: l, width: c, height: m } = t, f = Math.max(0, Math.min(r, Math.abs(c) / 2, Math.abs(m) / 2));
  e.beginPath(), e.moveTo(n + f, l), e.arcTo(n + c, l, n + c, l + m, f), e.arcTo(n + c, l + m, n, l + m, f), e.arcTo(n, l + m, n, l, f), e.arcTo(n, l, n + c, l, f), e.closePath();
}
function _4(e, t, r) {
  const n = r.style ?? Xt.Fill, l = r.color ?? "currentColor", c = kr(r.color) ?? kr(r.borderColor), m = n === Xt.Stroke, f = c ? $4(t, m) : !1, v = lr(l, f ? "wick" : "body", c), L = r.borderSize ?? 1, x = lr(r.borderColor ?? l, "border", c), w = r.borderStyle ?? Re.Solid, U = r.borderRadius ?? 0, K = r.borderDashedValue ?? [2, 2], ye = n === Xt.Fill || r.style === Xt.StrokeFill, S = n === Xt.Stroke || r.style === Xt.StrokeFill;
  if (ye) {
    e.fillStyle = v, cr(e, t, U), e.fill();
    const E = lr(l, "border", c);
    !f && c && E && (e.strokeStyle = E, e.lineWidth = Math.max(1, L), e.setLineDash([]), cr(e, t, U), e.stroke());
  }
  S && (e.strokeStyle = x, e.lineWidth = L, e.setLineDash(w === Re.Dashed ? K : []), cr(e, t, U), e.stroke());
}
function k4() {
  B0 || (B0 = !0, Ba({
    name: "rect",
    checkEventOn: p4,
    draw: _4
  }));
}
function wt(e) {
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
const x4 = "指标", L4 = "更多", w4 = "主图指标", A4 = "副图指标", T4 = "设置", S4 = "时区", M4 = "截屏", P4 = "全屏", D4 = "退出全屏", N4 = "保存", O4 = "确定", I4 = "取消", E4 = "MA(移动平均线)", B4 = "EMA(指数平滑移动平均线)", F4 = "SMA", U4 = "BOLL(布林线)", z4 = "BBI(多空指数)", V4 = "SAR(停损点指向指标)", R4 = "VOL(成交量)", K4 = "MACD(指数平滑异同移动平均线)", j4 = "KDJ(随机指标)", Q4 = "RSI(相对强弱指标)", Z4 = "BIAS(乖离率)", H4 = "BRAR(情绪指标)", Y4 = "CCI(顺势指标)", W4 = "DMI(动向指标)", q4 = "CR(能量指标)", G4 = "PSY(心理线)", X4 = "DMA(平行线差指标)", J4 = "TRIX(三重指数平滑平均线)", eu = "OBV(能量潮指标)", tu = "VR(成交量变异率)", nu = "WR(威廉指标)", ru = "MTM(动量指标)", ou = "EMV(简易波动指标)", iu = "ROC(变动率指标)", au = "PVT(价量趋势指标)", su = "AO(动量震荡指标)", lu = "世界统一时间", cu = "(UTC-10) 檀香山", uu = "(UTC-8) 朱诺", du = "(UTC-7) 洛杉矶", hu = "(UTC-5) 芝加哥", fu = "(UTC-4) 多伦多", mu = "(UTC-3) 圣保罗", gu = "(UTC+1) 伦敦", yu = "(UTC+2) 柏林", Cu = "(UTC+3) 巴林", pu = "(UTC+4) 迪拜", vu = "(UTC+5) 阿什哈巴德", bu = "(UTC+6) 阿拉木图", $u = "(UTC+7) 曼谷", _u = "(UTC+8) 上海", ku = "(UTC+9) 东京", xu = "(UTC+10) 悉尼", Lu = "(UTC+12) 诺福克岛", wu = "水平直线", Au = "水平射线", Tu = "水平线段", Su = "垂直直线", Mu = "垂直射线", Pu = "垂直线段", Du = "直线", Nu = "射线", Ou = "线段", Iu = "箭头", Eu = "价格线", Bu = "价格通道线", Fu = "平行直线", Uu = "斐波那契回调直线", zu = "斐波那契回调线段", Vu = "斐波那契圆环", Ru = "斐波那契螺旋", Ku = "斐波那契速度阻力扇", ju = "斐波那契趋势扩展", Qu = "江恩箱", Zu = "矩形", Hu = "平行四边形", Yu = "圆", Wu = "三角形", qu = "三浪", Gu = "五浪", Xu = "八浪", Ju = "任意浪", ed = "ABCD形态", td = "XABCD形态", nd = "弱磁模式", rd = "强磁模式", od = "商品搜索", id = "商品代码", ad = "参数1", sd = "参数2", ld = "参数3", cd = "参数4", ud = "参数5", dd = "周期", hd = "标准差", fd = "蜡烛图类型", md = "全实心", gd = "全空心", yd = "涨空心", Cd = "跌空心", pd = "OHLC", vd = "面积图", bd = "最新价显示", $d = "最高价显示", _d = "最低价显示", kd = "指标最新值显示", xd = "价格轴类型", Ld = "线性轴", wd = "百分比轴", Ad = "对数轴", Td = "倒置坐标", Sd = "网格线显示", Md = "恢复默认", Pd = {
  indicator: x4,
  more: L4,
  main_indicator: w4,
  sub_indicator: A4,
  setting: T4,
  timezone: S4,
  screenshot: M4,
  full_screen: P4,
  exit_full_screen: D4,
  save: N4,
  confirm: O4,
  cancel: I4,
  ma: E4,
  ema: B4,
  sma: F4,
  boll: U4,
  bbi: z4,
  sar: V4,
  vol: R4,
  macd: K4,
  kdj: j4,
  rsi: Q4,
  bias: Z4,
  brar: H4,
  cci: Y4,
  dmi: W4,
  cr: q4,
  psy: G4,
  dma: X4,
  trix: J4,
  obv: eu,
  vr: tu,
  wr: nu,
  mtm: ru,
  emv: ou,
  roc: iu,
  pvt: au,
  ao: su,
  utc: lu,
  honolulu: cu,
  juneau: uu,
  los_angeles: du,
  chicago: hu,
  toronto: fu,
  sao_paulo: mu,
  london: gu,
  berlin: yu,
  bahrain: Cu,
  dubai: pu,
  ashkhabad: vu,
  almaty: bu,
  bangkok: $u,
  shanghai: _u,
  tokyo: ku,
  sydney: xu,
  norfolk: Lu,
  horizontal_straight_line: wu,
  horizontal_ray_line: Au,
  horizontal_segment: Tu,
  vertical_straight_line: Su,
  vertical_ray_line: Mu,
  vertical_segment: Pu,
  straight_line: Du,
  ray_line: Nu,
  segment: Ou,
  arrow: Iu,
  price_line: Eu,
  price_channel_line: Bu,
  parallel_straight_line: Fu,
  fibonacci_line: Uu,
  fibonacci_segment: zu,
  fibonacci_circle: Vu,
  fibonacci_spiral: Ru,
  fibonacci_speed_resistance_fan: Ku,
  fibonacci_extension: ju,
  gann_box: Qu,
  rect: Zu,
  parallelogram: Hu,
  circle: Yu,
  triangle: Wu,
  three_waves: qu,
  five_waves: Gu,
  eight_waves: Xu,
  any_waves: Ju,
  abcd: ed,
  xabcd: td,
  weak_magnet: nd,
  strong_magnet: rd,
  symbol_search: od,
  symbol_code: id,
  params_1: ad,
  params_2: sd,
  params_3: ld,
  params_4: cd,
  params_5: ud,
  period: dd,
  standard_deviation: hd,
  candle_type: fd,
  candle_solid: md,
  candle_stroke: gd,
  candle_up_stroke: yd,
  candle_down_stroke: Cd,
  ohlc: pd,
  area: vd,
  last_price_show: bd,
  high_price_show: $d,
  low_price_show: _d,
  indicator_last_value_show: kd,
  price_axis_type: xd,
  normal: Ld,
  percentage: wd,
  log: Ad,
  reverse_coordinate: Td,
  grid_show: Sd,
  restore_default: Md
}, Dd = "Indicator", Nd = "More", Od = "Main Indicator", Id = "Sub Indicator", Ed = "Setting", Bd = "Timezone", Fd = "Screenshot", Ud = "Full Screen", zd = "Exit", Vd = "Save", Rd = "Confirm", Kd = "Cancel", jd = "MA(Moving Average)", Qd = "EMA(Exponential Moving Average)", Zd = "SMA", Hd = "BOLL(Bolinger Bands)", Yd = "BBI(Bull And Bearlndex)", Wd = "SAR(Stop and Reverse)", qd = "VOL(Volume)", Gd = "MACD(Moving Average Convergence / Divergence)", Xd = "KDJ(KDJ Index)", Jd = "RSI(Relative Strength Index)", eh = "BIAS(Bias Ratio)", th = "BRAR(情绪指标)", nh = "CCI(Commodity Channel Index)", rh = "DMI(Directional Movement Index)", oh = "CR(能量指标)", ih = "PSY(Psychological Line)", ah = "DMA(Different of Moving Average)", sh = "TRIX(Triple Exponentially Smoothed Moving Average)", lh = "OBV(On Balance Volume)", ch = "VR(Volatility Volume Ratio)", uh = "WR(Williams %R)", dh = "MTM(Momentum Index)", hh = "EMV(Ease of Movement Value)", fh = "ROC(Price Rate of Change)", mh = "PVT(Price and Volume Trend)", gh = "AO(Awesome Oscillator)", yh = "UTC", Ch = "(UTC-10) Honolulu", ph = "(UTC-8) Juneau", vh = "(UTC-7) Los Angeles", bh = "(UTC-5) Chicago", $h = "(UTC-4) Toronto", _h = "(UTC-3) Sao Paulo", kh = "(UTC+1) London", xh = "(UTC+2) Berlin", Lh = "(UTC+3) Bahrain", wh = "(UTC+4) Dubai", Ah = "(UTC+5) Ashkhabad", Th = "(UTC+6) Almaty", Sh = "(UTC+7) Bangkok", Mh = "(UTC+8) Shanghai", Ph = "(UTC+9) Tokyo", Dh = "(UTC+10) Sydney", Nh = "(UTC+12) Norfolk", Oh = "Horizontal Line", Ih = "Horizontal Ray", Eh = "Horizontal Segment", Bh = "Vertical Line", Fh = "Vertical Ray", Uh = "Vertical Segment", zh = "Trend Line", Vh = "Ray", Rh = "Segment", Kh = "Arrow", jh = "Price Line", Qh = "Price Channel Line", Zh = "Parallel Line", Hh = "Fibonacci Line", Yh = "Fibonacci Segment", Wh = "Fibonacci Circle", qh = "Fibonacci Spiral", Gh = "Fibonacci Sector", Xh = "Fibonacci Extension", Jh = "Gann Box", ef = "Rectangle", tf = "Parallelogram", nf = "Circle", rf = "Triangle", of = "Three Waves", af = "Five Waves", sf = "Eight Waves", lf = "Any Waves", cf = "ABCD Pattern", uf = "XABCD Pattern", df = "Weak Magnet", hf = "Strong Magnet", ff = "Symbol Search", mf = "Symbol Code", gf = "Parameter 1", yf = "Parameter 2", Cf = "Parameter 3", pf = "Parameter 4", vf = "Parameter 5", bf = "Period", $f = "Standard Deviation", _f = "Candle Type", kf = "Candle Solid", xf = "Candle Stroke", Lf = "Candle Up Stroke", wf = "Candle Down Stroke", Af = "OHLC", Tf = "Area", Sf = "Show Last Price", Mf = "Show Highest Price", Pf = "Show Lowest Price", Df = "Show indicator's last value", Nf = "Price Axis Type", Of = "Normal", If = "Percentage", Ef = "Log", Bf = "Reverse Coordinate", Ff = "Show Grids", Uf = "Restore Defaults", zf = {
  indicator: Dd,
  more: Nd,
  main_indicator: Od,
  sub_indicator: Id,
  setting: Ed,
  timezone: Bd,
  screenshot: Fd,
  full_screen: Ud,
  exit_full_screen: zd,
  save: Vd,
  confirm: Rd,
  cancel: Kd,
  ma: jd,
  ema: Qd,
  sma: Zd,
  boll: Hd,
  bbi: Yd,
  sar: Wd,
  vol: qd,
  macd: Gd,
  kdj: Xd,
  rsi: Jd,
  bias: eh,
  brar: th,
  cci: nh,
  dmi: rh,
  cr: oh,
  psy: ih,
  dma: ah,
  trix: sh,
  obv: lh,
  vr: ch,
  wr: uh,
  mtm: dh,
  emv: hh,
  roc: fh,
  pvt: mh,
  ao: gh,
  utc: yh,
  honolulu: Ch,
  juneau: ph,
  los_angeles: vh,
  chicago: bh,
  toronto: $h,
  sao_paulo: _h,
  london: kh,
  berlin: xh,
  bahrain: Lh,
  dubai: wh,
  ashkhabad: Ah,
  almaty: Th,
  bangkok: Sh,
  shanghai: Mh,
  tokyo: Ph,
  sydney: Dh,
  norfolk: Nh,
  horizontal_straight_line: Oh,
  horizontal_ray_line: Ih,
  horizontal_segment: Eh,
  vertical_straight_line: Bh,
  vertical_ray_line: Fh,
  vertical_segment: Uh,
  straight_line: zh,
  ray_line: Vh,
  segment: Rh,
  arrow: Kh,
  price_line: jh,
  price_channel_line: Qh,
  parallel_straight_line: Zh,
  fibonacci_line: Hh,
  fibonacci_segment: Yh,
  fibonacci_circle: Wh,
  fibonacci_spiral: qh,
  fibonacci_speed_resistance_fan: Gh,
  fibonacci_extension: Xh,
  gann_box: Jh,
  rect: ef,
  parallelogram: tf,
  circle: nf,
  triangle: rf,
  three_waves: of,
  five_waves: af,
  eight_waves: sf,
  any_waves: lf,
  abcd: cf,
  xabcd: uf,
  weak_magnet: df,
  strong_magnet: hf,
  symbol_search: ff,
  symbol_code: mf,
  params_1: gf,
  params_2: yf,
  params_3: Cf,
  params_4: pf,
  params_5: vf,
  period: bf,
  standard_deviation: $f,
  candle_type: _f,
  candle_solid: kf,
  candle_stroke: xf,
  candle_up_stroke: Lf,
  candle_down_stroke: wf,
  ohlc: Af,
  area: Tf,
  last_price_show: Sf,
  high_price_show: Mf,
  low_price_show: Pf,
  indicator_last_value_show: Df,
  price_axis_type: Nf,
  normal: Of,
  percentage: If,
  log: Ef,
  reverse_coordinate: Bf,
  grid_show: Ff,
  restore_default: Uf
}, Bi = {
  "zh-CN": Pd,
  "en-US": zf
};
function bC(e, t) {
  Bi[e] = t;
}
const d = (e, t) => {
  var r;
  return ((r = Bi[t]) == null ? void 0 : r[e]) ?? e;
}, Vf = /* @__PURE__ */ $('<div class="scroll-indicator left"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg></div>'), Rf = /* @__PURE__ */ $('<img alt="symbol">'), Kf = /* @__PURE__ */ $('<div class="symbol"><span></span></div>'), jf = /* @__PURE__ */ $('<span class="down-arrow-icon mobile-separate-arrow"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></span>'), Qf = /* @__PURE__ */ $('<span class="mobile-more-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg></span>'), Zf = /* @__PURE__ */ $('<div class="item tools" title="Time Tools"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M16 3v4"></path><path d="M8 3v4"></path><path d="M3 10h18"></path><path d="M12 14v4"></path><path d="M10 16h4"></path></svg></div>'), Hf = /* @__PURE__ */ $('<div class="item tools"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div>'), Yf = /* @__PURE__ */ $('<div class="klinecharts-pro-order-tools-display-menu"></div>'), Wf = /* @__PURE__ */ $('<div class="klinecharts-pro-order-tools-popover"><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Quick Order</span></span><span class="klinecharts-pro-order-tools-chevron">›</span></button><div class="klinecharts-pro-order-tools-submenu"><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Floating Window</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Plus Button</span></label></div></div><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Open Orders</span></span><span class="klinecharts-pro-order-tools-chevron">&rsaquo;</span></button><div class="klinecharts-pro-order-tools-submenu"><div class="klinecharts-pro-order-tools-setting-row"><span class="klinecharts-pro-order-tools-label">Extended Price Line</span></div><div class="klinecharts-pro-order-tools-setting-row"><span class="klinecharts-pro-order-tools-label">Display</span><div class="klinecharts-pro-order-tools-display"><button type="button" class="klinecharts-pro-order-tools-display-button"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4"></path></svg></button></div></div><div class="klinecharts-pro-order-tools-setting-row"><span class="klinecharts-pro-order-tools-label"></span></div></div></div><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Positions</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Breakeven Price</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Liquidation Price</span></label><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Price Line</span></span><span class="klinecharts-pro-order-tools-chevron">&rsaquo;</span></button><div class="klinecharts-pro-order-tools-submenu"><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Market Price Line</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Count Down</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Bid & Ask Price</span></label></div></div><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Order Preview Line</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Order History</span></label></div>'), qf = /* @__PURE__ */ $('<div class="order-dropdown-main"><div class="item tools order-tools-trigger"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Orders"><path d="M4 7h10"></path><path d="M4 12h8"></path><path d="M4 17h6"></path><path d="M18 6v12"></path><path d="M15 15l3 3 3-3"></path></svg><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></div></div>'), Gf = /* @__PURE__ */ $('<div class="item tools"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path><path d="M15.22299772857666,9.722223632261718C12.59389772857666,9.722223632261718,10.44600772857666,12.020201374511718,10.44600772857666,14.861111374511719C10.44600772857666,17.70202137451172,12.58215772857666,20.000021374511718,15.223007728576661,20.000021374511718C17.86384772857666,20.000021374511718,19.99999772857666,17.70202137451172,19.99999772857666,14.861111374511719C19.99999772857666,12.020201374511718,17.85211772857666,9.72222212709572,15.22299772857666,9.722223632261718ZM15.22299772857666,18.598491374511717C13.30985772857666,18.598491374511717,11.737087728576661,16.91919137451172,11.737087728576661,14.848481374511719C11.737087728576661,12.777781374511719,13.29811772857666,11.098491374511719,15.22299772857666,11.098491374511719C17.14787772857666,11.098491374511719,18.708917728576658,12.777781374511719,18.708917728576658,14.848481374511719C18.708917728576658,16.91919137451172,17.13614772857666,18.59848137451172,15.22299772857666,18.598491374511717Z"></path><path d="M15.692486288146974,15.050496970825195L15.692486288146974,12.676760970825196C15.692486288146974,12.297972970825196,15.399058288146973,11.982316970825195,15.046945288146972,11.982316970825195C14.694833288146972,11.982316970825195,14.401406288146973,12.297972970825196,14.401406288146973,12.676760970825196L14.401406288146973,15.340896970825195C14.401406288146973,15.530296970825194,14.471829288146973,15.694436970825196,14.589200288146973,15.833326970825196L15.751176288146972,17.095956970825195C15.868546288146973,17.222216970825194,16.032866288146973,17.297976970825196,16.208916288146973,17.297976970825196C16.384976288146973,17.297976970825196,16.537556288146973,17.222216970825194,16.666666288146974,17.095956970825195C16.78403628814697,16.969686970825194,16.854456288146974,16.792916970825196,16.854456288146974,16.603526970825193C16.854456288146974,16.414136970825197,16.78403628814697,16.237366970825196,16.666666288146974,16.111106970825197L15.692486288146974,15.050496970825195Z"></path></svg></div>'), Xf = /* @__PURE__ */ $('<div class="item tools"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg></div>'), Jf = /* @__PURE__ */ $('<div class="item tools"><svg viewBox="0 0 20.5 20"><path d="M6.50977,1L13.4902,1C13.6406,1,13.7695,1.1104910000000001,13.7969,1.2631700000000001L14.0273,2.52277C14.1387,3.13147,14.6543,3.57143,15.2559,3.57143L17.5,3.57143C18.8809,3.57143,20,4.72254,20,6.14286L20,16.4286C20,17.8489,18.8809,19,17.5,19L2.5,19C1.11914,19,0,17.8489,0,16.4286L0,6.14286C0,4.72254,1.11914,3.57143,2.5,3.57143L4.74414,3.57143C5.3457,3.57143,5.86133,3.13147,5.97266,2.52277L6.20312,1.2631700000000001C6.23047,1.1104910000000001,6.35937,1,6.50977,1ZM15.2559,4.857139999999999C14.0547,4.857139999999999,13.0215,3.97522,12.7988,2.75982L12.7129,2.28571L7.28711,2.28571L7.20117,2.75982C6.98047,3.97522,5.94727,4.857139999999999,4.74414,4.857139999999999L2.5,4.857139999999999C1.81055,4.857139999999999,1.25,5.43371,1.25,6.14286L1.25,16.4286C1.25,17.1377,1.81055,17.7143,2.5,17.7143L17.5,17.7143C18.1895,17.7143,18.75,17.1377,18.75,16.4286L18.75,6.14286C18.75,5.43371,18.1895,4.857139999999999,17.5,4.857139999999999L15.2559,4.857139999999999ZM4.375,6.78571L3.125,6.78571C2.7793,6.78571,2.5,6.49844,2.5,6.14286C2.5,5.78728,2.7793,5.5,3.125,5.5L4.375,5.5C4.7207,5.5,5,5.78728,5,6.14286C5,6.49844,4.7207,6.78571,4.375,6.78571ZM10,6.14286C7.06641,6.14286,4.6875,8.58973,4.6875,11.6071C4.6875,14.6246,7.06641,17.0714,10,17.0714C12.9336,17.0714,15.3125,14.6246,15.3125,11.6071C15.3125,8.58973,12.9336,6.14286,10,6.14286ZM10,7.42857C11.0859,7.42857,12.1055,7.8625,12.873,8.65201C13.6406,9.44152,14.0625,10.49018,14.0625,11.6071C14.0625,12.7241,13.6406,13.7728,12.873,14.5623C12.1055,15.3518,11.0859,15.7857,10,15.7857C8.91406,15.7857,7.89453,15.3518,7.12695,14.5623C6.35937,13.7728,5.9375,12.7241,5.9375,11.6071C5.9375,10.49018,6.35938,9.44152,7.12695,8.65201C7.89453,7.8625,8.91406,7.42857,10,7.42857ZM10,9.67857C8.96484,9.67857,8.125,10.54241,8.125,11.6071C8.125,12.6719,8.96484,13.5357,10,13.5357C11.0352,13.5357,11.875,12.6719,11.875,11.6071C11.875,10.54241,11.0352,9.67857,10,9.67857ZM10,10.96429C10.3438,10.96429,10.625,11.2536,10.625,11.6071C10.625,11.9607,10.3438,12.25,10,12.25C9.65625,12.25,9.375,11.9607,9.375,11.6071C9.375,11.2536,9.65625,10.96429,10,10.96429Z"></path></svg></div>'), em = /* @__PURE__ */ $('<div class="item tools chart-view-toggle"></div>'), tm = /* @__PURE__ */ $('<div class="scroll-indicator right"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"></path></svg></div>'), nm = /* @__PURE__ */ $('<div><div class="klinecharts-pro-period-bar"><div class="menu-container"><svg viewBox="0 0 1024 1024"><path d="M192.037 287.953h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 479.169H438.553c-17.673 0-32 14.327-32 32s14.327 32 32 32h393.608c17.673 0 32-14.327 32-32s-14.327-32-32-32zM832.161 735.802H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32zM319.028 351.594l-160 160 160 160z"></path></svg></div><div><div class="item tools fullscreen-toggle"></div></div></div></div>'), rm = /* @__PURE__ */ $("<span></span>"), om = /* @__PURE__ */ $('<button type="button"></button>'), U0 = /* @__PURE__ */ $('<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="style=linear"> <g id="fullscreen"> <path id="vector" d="M8 2H4C2.89543 2 2 2.89543 2 4V8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> <path id="vector_2" d="M22 8L22 4C22 2.89543 21.1046 2 20 2H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> <path id="vector_3" d="M16 22L20 22C21.1046 22 22 21.1046 22 20L22 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> <path id="vector_4" d="M8 22L4 22C2.89543 22 2 21.1046 2 20V16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> </g> </g> </g></svg>'), im = /* @__PURE__ */ $('<svg viewBox="0 0 24 24"><path d="M3 20V7l4 3 5-7 5 4h4v13H3Zm5-3 4-5.5 7 5.45V9h-2.7l-3.9-3.1-4.95 6.95L5 10.4V14l3 3Z"></path></svg>'), am = /* @__PURE__ */ $('<svg viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M9 4H7v2H5v12h2v2h2v-2h2V6H9zM19 8h-2V4h-2v4h-2v7h2v5h2v-5h2z"></path></svg>'), z0 = (e) => e.charAt(0).toUpperCase() + e.slice(1), sm = (e) => {
  let t, r, n;
  const [l, c] = D(window.innerWidth < 768), [m, f] = D(localStorage.getItem("klinechart_secondary_period") || ""), [v, L] = D(!1), [x, w] = D(!1), [U, K] = D(!1), [ye, S] = D(!1), [E, z] = D(!1), [G, B] = D({
    top: 0,
    left: 0,
    minWidth: 220
  }), H = () => {
    c(window.innerWidth < 768), requestAnimationFrame(R), v() && Se();
  }, [Y, ce] = D(!1), W = () => document.fullscreenElement ?? document.body, j = () => {
    ce(!!document.fullscreenElement);
  }, [re, ue] = D(!1), [se, be] = D(!1), Se = () => {
    if (!r)
      return;
    const A = r.getBoundingClientRect(), P = Math.max(220, Math.ceil(A.width)), J = window.innerWidth, pe = Math.min(Math.max(8, A.right - P), Math.max(8, J - P - 8));
    B({
      top: Math.ceil(A.bottom + 8),
      left: Math.ceil(pe),
      minWidth: P
    });
  }, N = () => {
    w(!1), K(!1), S(!1), z(!1);
  }, Q = () => {
    L((A) => {
      const P = !A;
      return P ? queueMicrotask(Se) : N(), P;
    });
  }, V = (A) => {
    if (!v())
      return;
    const P = A.target;
    P && (r != null && r.contains(P) || n != null && n.contains(P) || (N(), L(!1)));
  }, Z = () => {
    v() && Se();
  }, R = () => {
    if (!t) {
      ue(!1), be(!1);
      return;
    }
    const A = t, P = A.scrollWidth > A.clientWidth + 2;
    ue(P && A.scrollLeft > 2), be(P && A.scrollLeft + A.clientWidth < A.scrollWidth - 2);
  };
  Ar(() => {
    window.addEventListener("resize", H), document.addEventListener("fullscreenchange", j), document.addEventListener("pointerdown", V, !0), document.addEventListener("mousedown", V), window.addEventListener("scroll", Z, !0), document.addEventListener("mozfullscreenchange", j), document.addEventListener("webkitfullscreenchange", j), document.addEventListener("msfullscreenchange", j), t && (t.addEventListener("scroll", R), setTimeout(R, 100));
  }), Ct(() => {
    window.removeEventListener("resize", H), document.removeEventListener("fullscreenchange", j), document.removeEventListener("pointerdown", V, !0), document.removeEventListener("mousedown", V), window.removeEventListener("scroll", Z, !0), document.removeEventListener("mozfullscreenchange", j), document.removeEventListener("webkitfullscreenchange", j), document.removeEventListener("msfullscreenchange", j), t && t.removeEventListener("scroll", R);
  });
  const oe = X(() => {
    const A = e.periods.filter((P) => {
      if (!l() || Y())
        return !0;
      const J = e.period.text, pe = m();
      if (P.text === J || pe && P.text === pe)
        return !0;
      if (!pe || pe === J) {
        const fe = e.periods.find((De) => De.text !== J);
        return P.text === (fe == null ? void 0 : fe.text);
      }
      return !1;
    }).slice(0, l() && !Y() ? 2 : e.periods.length);
    return setTimeout(R, 50), A;
  });
  let te = e.period.text;
  return Ke(() => {
    const A = e.period.text;
    A !== te && (l() && (f(te), localStorage.setItem("klinechart_secondary_period", te)), te = A), setTimeout(R, 50);
  }), Ke(() => {
    Y(), setTimeout(R, 100);
  }), Ke(() => {
    if (!e.showOrderToolsMenu) {
      L(!1);
      return;
    }
    v() && queueMicrotask(Se);
  }), (() => {
    const A = nm.cloneNode(!0), P = A.firstChild, J = P.firstChild, pe = J.firstChild, fe = J.nextSibling, De = fe.firstChild;
    return A.style.setProperty("position", "relative"), A.style.setProperty("width", "100%"), A.style.setProperty("display", "flex"), A.style.setProperty("align-items", "center"), C(A, T(le, {
      get when() {
        return re();
      },
      get children() {
        const k = Vf.cloneNode(!0);
        return k.$$click = () => t.scrollBy({
          left: -100,
          behavior: "smooth"
        }), k.style.setProperty("position", "absolute"), k.style.setProperty("left", "0"), k.style.setProperty("top", "0"), k.style.setProperty("bottom", "1px"), k.style.setProperty("width", "30px"), k.style.setProperty("display", "flex"), k.style.setProperty("align-items", "center"), k.style.setProperty("justify-content", "center"), k.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), k.style.setProperty("z-index", "10"), k.style.setProperty("cursor", "pointer"), k.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), k;
      }
    }), P), yt((k) => {
      t = k;
    }, P), P.style.setProperty("width", "100%"), P.style.setProperty("overflow", "auto"), ut(pe, "click", e.onMenuClick, !0), C(P, T(le, {
      get when() {
        return e.symbol;
      },
      get children() {
        const k = Kf.cloneNode(!0), ge = k.firstChild;
        return ut(k, "click", e.onSymbolClick, !0), C(k, T(le, {
          get when() {
            return e.symbol.logo;
          },
          get children() {
            const Me = Rf.cloneNode(!0);
            return F(() => Ie(Me, "src", e.symbol.logo)), Me;
          }
        }), ge), C(ge, () => e.symbol.shortName ?? e.symbol.name ?? e.symbol.ticker), k;
      }
    }), fe), C(P, () => oe().map((k, ge) => {
      const Me = k.text === e.period.text;
      return (() => {
        const tt = rm.cloneNode(!0);
        return tt.$$click = (ve) => {
          l() && Me && !Y() ? (e.onMobilePeriodClick ? e.onMobilePeriodClick(k) : e.onMenuClick(), ve.stopPropagation()) : e.onPeriodChange(k);
        }, he(tt, `item period ${Me ? "selected" : ""}`), C(tt, () => k.text), tt;
      })();
    }), fe), C(P, T(le, {
      get when() {
        return X(() => !!(l() && !Y()))() && oe().length > 1;
      },
      get children() {
        const k = jf.cloneNode(!0);
        return k.$$click = (ge) => {
          ge.stopPropagation(), e.onMobilePeriodClick ? e.onMobilePeriodClick(e.period) : e.onMenuClick();
        }, k.style.setProperty("margin-left", "4px"), k.style.setProperty("display", "inline-flex"), k.style.setProperty("align-items", "center"), k;
      }
    }), fe), C(P, T(le, {
      get when() {
        return X(() => !!l())() && !Y();
      },
      get children() {
        const k = Qf.cloneNode(!0);
        return k.$$click = (ge) => {
          var Me;
          ge.stopPropagation(), (Me = e.onMobileMoreClick) == null || Me.call(e);
        }, k.style.setProperty("margin-left", "8px"), k.style.setProperty("display", "inline-flex"), k.style.setProperty("align-items", "center"), k.style.setProperty("cursor", "pointer"), k.style.setProperty("padding", "0 4px"), k;
      }
    }), fe), C(P, T(le, {
      get when() {
        return !l();
      },
      get children() {
        const k = Zf.cloneNode(!0);
        return ut(k, "click", e.onTimeToolsClick, !0), k;
      }
    }), fe), C(P, T(le, {
      get when() {
        return !l();
      },
      get children() {
        const k = Hf.cloneNode(!0), ge = k.firstChild, Me = ge.nextSibling;
        return ut(k, "click", e.onIndicatorClick, !0), C(Me, () => d("indicator", e.locale)), k;
      }
    }), fe), fe.style.setProperty("display", "flex"), fe.style.setProperty("height", "100%"), fe.style.setProperty("margin-left", "auto"), fe.style.setProperty("align-items", "center"), fe.style.setProperty("flex", "0 0 auto"), C(fe, T(le, {
      get when() {
        return e.showOrderToolsMenu;
      },
      get children() {
        const k = qf.cloneNode(!0), ge = k.firstChild, Me = ge.firstChild, tt = Me.nextSibling;
        return yt((ve) => {
          r = ve;
        }, k), k.style.setProperty("display", "flex"), k.style.setProperty("align-items", "center"), k.style.setProperty("height", "100%"), ge.$$click = (ve) => {
          ve.stopPropagation(), Q();
        }, ge.style.setProperty("gap", "6px"), tt.style.setProperty("transition", "transform 0.2s ease"), C(k, T(le, {
          get when() {
            return v();
          },
          get children() {
            return T(li, {
              get mount() {
                return W();
              },
              get children() {
                const ve = Wf.cloneNode(!0), vt = ve.firstChild, bt = vt.firstChild, Rt = bt.firstChild, Kt = Rt.firstChild, Mt = Kt.firstChild, Fn = bt.nextSibling, h1 = Fn.firstChild, U1 = h1.firstChild, z1 = U1.firstChild, jt = h1.nextSibling, Un = jt.firstChild, f1 = Un.firstChild, Pt = vt.nextSibling, Ee = Pt.firstChild, zn = Ee.firstChild, $t = zn.firstChild, Dt = $t.firstChild, Nt = Ee.nextSibling, nt = Nt.firstChild;
                nt.firstChild;
                const m1 = nt.nextSibling, Ge = m1.firstChild, g1 = Ge.nextSibling, y1 = g1.firstChild, Ot = y1.firstChild, _t = m1.nextSibling, C1 = _t.firstChild, p1 = Pt.nextSibling, Vn = p1.firstChild, V1 = Vn.firstChild, Rn = p1.nextSibling, R1 = Rn.nextSibling, Qt = R1.firstChild, v1 = Qt.firstChild, K1 = R1.nextSibling, b1 = K1.nextSibling, j1 = b1.firstChild, Q1 = j1.firstChild, It = b1.nextSibling, Qe = It.firstChild, Ze = Qe.firstChild, We = Ze.firstChild, He = We.firstChild, Kn = Qe.nextSibling, Zt = Kn.firstChild, $1 = Zt.firstChild, _1 = $1.firstChild, $e = Zt.nextSibling, k1 = $e.firstChild, lt = k1.firstChild, ft = $e.nextSibling, Ht = ft.firstChild, kt = Ht.firstChild, Xe = It.nextSibling, Z1 = Xe.firstChild, H1 = Z1.firstChild, Y1 = Xe.nextSibling, jn = Y1.firstChild, W1 = jn.firstChild;
                return ve.$$mousedown = (b) => b.stopPropagation(), yt((b) => {
                  n = b;
                }, ve), ve.style.setProperty("position", "fixed"), ve.style.setProperty("z-index", "9999"), bt.$$click = (b) => {
                  b.preventDefault(), b.stopPropagation(), w((O) => !O);
                }, Kt.$$mousedown = (b) => b.stopPropagation(), Kt.$$click = (b) => b.stopPropagation(), Mt.addEventListener("change", (b) => {
                  var O;
                  b.stopPropagation(), w(!0), (O = e.onOrderToolsStateChange) == null || O.call(e, {
                    quickOrder: b.currentTarget.checked
                  });
                }), z1.addEventListener("change", (b) => {
                  var O;
                  (O = e.onOrderToolsStateChange) == null || O.call(e, {
                    quickOrderFloatingWindow: b.currentTarget.checked
                  });
                }), f1.addEventListener("change", (b) => {
                  var O;
                  (O = e.onOrderToolsStateChange) == null || O.call(e, {
                    quickOrderPlusButton: b.currentTarget.checked
                  });
                }), Ee.$$click = (b) => {
                  b.preventDefault(), b.stopPropagation(), K((O) => !O), S(!1);
                }, $t.$$mousedown = (b) => b.stopPropagation(), $t.$$click = (b) => b.stopPropagation(), Dt.addEventListener("change", (b) => {
                  var O;
                  b.stopPropagation(), K(!0), (O = e.onOrderToolsStateChange) == null || O.call(e, {
                    openOrders: b.currentTarget.checked
                  });
                }), C(nt, T(_r, {
                  get open() {
                    var b;
                    return ((b = e.orderToolsState) == null ? void 0 : b.openOrdersExtendedPriceLine) ?? !0;
                  },
                  onChange: () => {
                    var b, O;
                    (O = e.onOrderToolsStateChange) == null || O.call(e, {
                      openOrdersExtendedPriceLine: !(((b = e.orderToolsState) == null ? void 0 : b.openOrdersExtendedPriceLine) ?? !0)
                    });
                  }
                }), null), y1.$$click = (b) => {
                  b.preventDefault(), b.stopPropagation(), S((O) => !O);
                }, C(y1, () => {
                  var b;
                  return z0(((b = e.orderToolsState) == null ? void 0 : b.openOrdersDisplay) ?? "right");
                }, Ot), C(g1, T(le, {
                  get when() {
                    return ye();
                  },
                  get children() {
                    const b = Yf.cloneNode(!0);
                    return C(b, () => ["left", "center", "right"].map((O) => (() => {
                      const Pe = om.cloneNode(!0);
                      return Pe.$$click = (Ve) => {
                        var qe;
                        Ve.preventDefault(), Ve.stopPropagation(), (qe = e.onOrderToolsStateChange) == null || qe.call(e, {
                          openOrdersDisplay: O
                        }), S(!1);
                      }, C(Pe, () => z0(O)), F(() => {
                        var Ve;
                        return he(Pe, (((Ve = e.orderToolsState) == null ? void 0 : Ve.openOrdersDisplay) ?? "right") === O ? "selected" : "");
                      }), Pe;
                    })())), b;
                  }
                }), null), C(C1, () => e.orderToolsConfirmAfterDragLabel ?? "Confirm After Drag"), C(_t, T(_r, {
                  get open() {
                    var b;
                    return ((b = e.orderToolsState) == null ? void 0 : b.confirmAfterDrag) ?? !0;
                  },
                  onChange: () => {
                    var b, O;
                    (O = e.onOrderToolsStateChange) == null || O.call(e, {
                      confirmAfterDrag: !(((b = e.orderToolsState) == null ? void 0 : b.confirmAfterDrag) ?? !0)
                    });
                  }
                }), null), V1.addEventListener("change", (b) => {
                  var O;
                  (O = e.onOrderToolsStateChange) == null || O.call(e, {
                    positions: b.currentTarget.checked
                  });
                }), v1.addEventListener("change", (b) => {
                  var O;
                  (O = e.onOrderToolsStateChange) == null || O.call(e, {
                    breakevenPrice: b.currentTarget.checked
                  });
                }), Q1.addEventListener("change", (b) => {
                  var O;
                  (O = e.onOrderToolsStateChange) == null || O.call(e, {
                    liquidationPrice: b.currentTarget.checked
                  });
                }), Qe.$$click = (b) => {
                  b.preventDefault(), b.stopPropagation(), z((O) => !O);
                }, We.$$mousedown = (b) => b.stopPropagation(), We.$$click = (b) => b.stopPropagation(), He.addEventListener("change", (b) => {
                  var O;
                  b.stopPropagation(), z(!0), (O = e.onOrderToolsStateChange) == null || O.call(e, {
                    priceLine: b.currentTarget.checked
                  });
                }), _1.addEventListener("change", (b) => {
                  var O;
                  (O = e.onOrderToolsStateChange) == null || O.call(e, {
                    marketPriceLine: b.currentTarget.checked
                  });
                }), lt.addEventListener("change", (b) => {
                  var O;
                  (O = e.onOrderToolsStateChange) == null || O.call(e, {
                    countDown: b.currentTarget.checked
                  });
                }), kt.addEventListener("change", (b) => {
                  var O;
                  (O = e.onOrderToolsStateChange) == null || O.call(e, {
                    bidAskPrice: b.currentTarget.checked
                  });
                }), H1.addEventListener("change", (b) => {
                  var O;
                  (O = e.onOrderToolsStateChange) == null || O.call(e, {
                    orderPreviewLine: b.currentTarget.checked
                  });
                }), W1.addEventListener("change", (b) => {
                  var O;
                  (O = e.onOrderToolsStateChange) == null || O.call(e, {
                    orderHistory: b.currentTarget.checked
                  });
                }), F((b) => {
                  const O = `${G().top}px`, Pe = `${G().left}px`, Ve = `${G().minWidth}px`, qe = `klinecharts-pro-order-tools-group${x() ? " klinecharts-pro-order-tools-group-open" : ""}`, xt = `klinecharts-pro-order-tools-group${U() ? " klinecharts-pro-order-tools-group-open" : ""}`, x1 = `klinecharts-pro-order-tools-display-arrow${ye() ? " klinecharts-pro-order-tools-display-arrow-open" : ""}`, q1 = `klinecharts-pro-order-tools-group${E() ? " klinecharts-pro-order-tools-group-open" : ""}`;
                  return O !== b._v$ && ve.style.setProperty("top", b._v$ = O), Pe !== b._v$2 && ve.style.setProperty("left", b._v$2 = Pe), Ve !== b._v$3 && ve.style.setProperty("width", b._v$3 = Ve), qe !== b._v$4 && he(vt, b._v$4 = qe), xt !== b._v$5 && he(Pt, b._v$5 = xt), x1 !== b._v$6 && Ie(Ot, "class", b._v$6 = x1), q1 !== b._v$7 && he(It, b._v$7 = q1), b;
                }, {
                  _v$: void 0,
                  _v$2: void 0,
                  _v$3: void 0,
                  _v$4: void 0,
                  _v$5: void 0,
                  _v$6: void 0,
                  _v$7: void 0
                }), F(() => {
                  var b, O, Pe, Ve;
                  return Mt.checked = (((b = e.orderToolsState) == null ? void 0 : b.quickOrderFloatingWindow) ?? ((O = e.orderToolsState) == null ? void 0 : O.quickOrder) ?? !0) || (((Pe = e.orderToolsState) == null ? void 0 : Pe.quickOrderPlusButton) ?? ((Ve = e.orderToolsState) == null ? void 0 : Ve.quickOrder) ?? !0);
                }), F(() => {
                  var b, O;
                  return z1.checked = ((b = e.orderToolsState) == null ? void 0 : b.quickOrderFloatingWindow) ?? ((O = e.orderToolsState) == null ? void 0 : O.quickOrder) ?? !0;
                }), F(() => {
                  var b, O;
                  return f1.checked = ((b = e.orderToolsState) == null ? void 0 : b.quickOrderPlusButton) ?? ((O = e.orderToolsState) == null ? void 0 : O.quickOrder) ?? !0;
                }), F(() => {
                  var b;
                  return Dt.checked = ((b = e.orderToolsState) == null ? void 0 : b.openOrders) ?? !0;
                }), F(() => {
                  var b;
                  return V1.checked = ((b = e.orderToolsState) == null ? void 0 : b.positions) ?? !0;
                }), F(() => {
                  var b;
                  return v1.checked = ((b = e.orderToolsState) == null ? void 0 : b.breakevenPrice) ?? !0;
                }), F(() => {
                  var b;
                  return Q1.checked = ((b = e.orderToolsState) == null ? void 0 : b.liquidationPrice) ?? !0;
                }), F(() => {
                  var b, O, Pe, Ve, qe, xt;
                  return He.checked = (((b = e.orderToolsState) == null ? void 0 : b.marketPriceLine) ?? ((O = e.orderToolsState) == null ? void 0 : O.priceLine) ?? !0) || (((Pe = e.orderToolsState) == null ? void 0 : Pe.countDown) ?? ((Ve = e.orderToolsState) == null ? void 0 : Ve.priceLine) ?? !0) || (((qe = e.orderToolsState) == null ? void 0 : qe.bidAskPrice) ?? ((xt = e.orderToolsState) == null ? void 0 : xt.priceLine) ?? !0);
                }), F(() => {
                  var b, O;
                  return _1.checked = ((b = e.orderToolsState) == null ? void 0 : b.marketPriceLine) ?? ((O = e.orderToolsState) == null ? void 0 : O.priceLine) ?? !0;
                }), F(() => {
                  var b, O;
                  return lt.checked = ((b = e.orderToolsState) == null ? void 0 : b.countDown) ?? ((O = e.orderToolsState) == null ? void 0 : O.priceLine) ?? !0;
                }), F(() => {
                  var b, O;
                  return kt.checked = ((b = e.orderToolsState) == null ? void 0 : b.bidAskPrice) ?? ((O = e.orderToolsState) == null ? void 0 : O.priceLine) ?? !0;
                }), F(() => {
                  var b;
                  return H1.checked = ((b = e.orderToolsState) == null ? void 0 : b.orderPreviewLine) ?? !0;
                }), F(() => {
                  var b;
                  return W1.checked = ((b = e.orderToolsState) == null ? void 0 : b.orderHistory) ?? !0;
                }), ve;
              }
            });
          }
        }), null), F((ve) => {
          const vt = l() ? "0 8px" : "0 10px", bt = v() ? "rotate(180deg)" : "rotate(0deg)";
          return vt !== ve._v$8 && ge.style.setProperty("padding", ve._v$8 = vt), bt !== ve._v$9 && tt.style.setProperty("transform", ve._v$9 = bt), ve;
        }, {
          _v$8: void 0,
          _v$9: void 0
        }), k;
      }
    }), De), C(fe, T(le, {
      get when() {
        return !l();
      },
      get children() {
        return [(() => {
          const k = Gf.cloneNode(!0);
          return ut(k, "click", e.onTimezoneClick, !0), k;
        })(), (() => {
          const k = Xf.cloneNode(!0);
          return ut(k, "click", e.onSettingClick, !0), k;
        })()];
      }
    }), De), C(fe, T(le, {
      get when() {
        return !l();
      },
      get children() {
        const k = Jf.cloneNode(!0);
        return ut(k, "click", e.onScreenshotClick, !0), k;
      }
    }), De), De.$$click = () => {
      if (Y())
        (document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen).call(document);
      else {
        const k = t == null ? void 0 : t.closest(".klinecharts-pro");
        k && ((k == null ? void 0 : k.requestFullscreen) ?? (k == null ? void 0 : k.webkitRequestFullscreen) ?? (k == null ? void 0 : k.mozRequestFullScreen) ?? (k == null ? void 0 : k.msRequestFullscreen)).call(k);
      }
    }, C(De, (() => {
      const k = X(() => !!Y());
      return () => (k(), U0.cloneNode(!0));
    })()), C(fe, T(le, {
      get when() {
        return X(() => !!e.chartViewToggle)() && !Y();
      },
      get children() {
        const k = em.cloneNode(!0);
        return ut(k, "click", e.chartViewToggle.onToggle, !0), C(k, (() => {
          const ge = X(() => e.chartViewToggle.view === "chart");
          return () => ge() ? im.cloneNode(!0) : am.cloneNode(!0);
        })()), F(() => Ie(k, "title", e.chartViewToggle.view === "chart" ? "View Depth" : "View Chart")), k;
      }
    }), null), C(A, T(le, {
      get when() {
        return se();
      },
      get children() {
        const k = tm.cloneNode(!0);
        return k.$$click = () => t.scrollBy({
          left: 100,
          behavior: "smooth"
        }), k.style.setProperty("position", "absolute"), k.style.setProperty("right", "0"), k.style.setProperty("top", "0"), k.style.setProperty("bottom", "1px"), k.style.setProperty("width", "30px"), k.style.setProperty("display", "flex"), k.style.setProperty("align-items", "center"), k.style.setProperty("justify-content", "center"), k.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), k.style.setProperty("z-index", "10"), k.style.setProperty("cursor", "pointer"), k.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), k;
      }
    }), null), F((k) => {
      const ge = e.spread ? "" : "rotate", Me = Y() ? "0px" : "var(--klinecharts-pro-period-bar-padding-right)";
      return ge !== k._v$10 && Ie(pe, "class", k._v$10 = ge), Me !== k._v$11 && fe.style.setProperty("padding-right", k._v$11 = Me), k;
    }, {
      _v$10: void 0,
      _v$11: void 0
    }), A;
  })();
};
Ye(["click", "mousedown"]);
const lm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M12.41465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L12.41465,12C12.20873,12.5826,11.65311,13,11,13C10.34689,13,9.79127,12.5826,9.58535,12L3.5,12C3.223857,12,3,11.77614,3,11.5C3,11.22386,3.223857,11,3.5,11L9.58535,11C9.79127,10.417404,10.34689,10,11,10C11.65311,10,12.20873,10.417404,12.41465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), cm = () => lm.cloneNode(!0), um = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,11L11.08535,11C11.29127,10.417404,11.84689,10,12.5,10C13.15311,10,13.70873,10.417404,13.91465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L13.91465,12C13.70873,12.5826,13.15311,13,12.5,13C11.84689,13,11.29127,12.5826,11.08535,12L6.91465,12C6.70873,12.5826,6.15311,13,5.5,13C4.671573,13,4,12.32843,4,11.5C4,10.671573,4.671573,10,5.5,10C6.15311,10,6.70873,10.417404,6.91465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), dm = () => um.cloneNode(!0), hm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,12.5C6.70873,13.0826,6.15311,13.5,5.5,13.5C4.671573,13.5,4,12.82843,4,12C4,11.171573,4.671573,10.5,5.5,10.5C6.15311,10.5,6.70873,10.917404,6.91465,11.5L16.0853,11.5C16.2913,10.917404,16.846899999999998,10.5,17.5,10.5C18.328400000000002,10.5,19,11.171573,19,12C19,12.82843,18.328400000000002,13.5,17.5,13.5C16.846899999999998,13.5,16.2913,13.0826,16.0853,12.5L6.91465,12.5Z" stroke-opacity="0" stroke="none"></path></svg>'), fm = () => hm.cloneNode(!0), mm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,12.41465L11,18.5C11,18.7761,11.22386,19,11.5,19C11.77614,19,12,18.7761,12,18.5L12,12.41465C12.5826,12.20873,13,11.65311,13,11C13,10.34689,12.5826,9.79127,12,9.58535L12,3.5C12,3.223857,11.77614,3,11.5,3C11.22386,3,11,3.223857,11,3.5L11,9.58535C10.417404,9.79127,10,10.34689,10,11C10,11.65311,10.417404,12.20873,11,12.41465Z" stroke-opacity="0" stroke="none"></path></svg>'), gm = () => mm.cloneNode(!0), ym = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.66558837890625,19C10.83716137890625,19,10.16558837890625,18.328400000000002,10.16558837890625,17.5C10.16558837890625,16.846899999999998,10.58298437890625,16.2913,11.16557337890625,16.0854L11.16557337890625,11.91464C10.58298437890625,11.70872,10.16558837890625,11.1531,10.16558837890625,10.5C10.16558837890625,9.8469,10.58298437890625,9.29128,11.16557337890625,9.08536L11.16557337890625,4.5C11.16557337890625,4.223857,11.38942837890625,4,11.66556837890625,4C11.94171837890625,4,12.16556837890625,4.223857,12.16556837890625,4.5L12.16556837890625,9.08535C12.74817837890625,9.291260000000001,13.16558837890625,9.846879999999999,13.16558837890625,10.5C13.16558837890625,11.153120000000001,12.74817837890625,11.708739999999999,12.16556837890625,11.91465L12.16556837890625,16.0854C12.74817837890625,16.2913,13.16558837890625,16.846899999999998,13.16558837890625,17.5C13.16558837890625,18.328400000000002,12.49401837890625,19,11.66558837890625,19Z" stroke-opacity="0" stroke="none"></path></svg>'), Cm = () => ym.cloneNode(!0), pm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.165603637695312,6.91465C11.748203637695312,6.70873,12.165603637695312,6.15311,12.165603637695312,5.5C12.165603637695312,4.671573,11.494033637695313,4,10.665603637695312,4C9.837176637695313,4,9.165603637695312,4.671573,9.165603637695312,5.5C9.165603637695312,6.15311,9.583007637695312,6.70873,10.165603637695312,6.91465L10.165603637695312,16.0854C9.583007637695312,16.2913,9.165603637695312,16.846899999999998,9.165603637695312,17.5C9.165603637695312,18.328400000000002,9.837176637695313,19,10.665603637695312,19C11.494033637695313,19,12.165603637695312,18.328400000000002,12.165603637695312,17.5C12.165603637695312,16.846899999999998,11.748203637695312,16.2913,11.165603637695312,16.0854L11.165603637695312,6.91465Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), vm = () => pm.cloneNode(!0), bm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.146447,15.753C4.9511845,15.9483,4.9511845,16.2649,5.146447,16.4602C5.341709,16.6554,5.658291,16.6554,5.853554,16.4602L8.156600000000001,14.15711C8.352409999999999,14.25082,8.57173,14.3033,8.8033,14.3033C9.631730000000001,14.3033,10.3033,13.63172,10.3033,12.80329C10.3033,12.57172,10.250820000000001,12.352409999999999,10.157119999999999,12.15659L12.156600000000001,10.15711C12.352409999999999,10.250820000000001,12.571729999999999,10.30329,12.8033,10.30329C13.63173,10.30329,14.3033,9.63172,14.3033,8.80329C14.3033,8.57172,14.25082,8.352409999999999,14.15712,8.15659L16.4602,5.853553C16.6554,5.658291,16.6554,5.341709,16.4602,5.146447C16.2649,4.9511843,15.9483,4.9511843,15.753,5.146447L13.45001,7.449479999999999C13.25419,7.35577,13.03487,7.3032900000000005,12.8033,7.3032900000000005C11.97487,7.3032900000000005,11.3033,7.97487,11.3033,8.80329C11.3033,9.03487,11.35578,9.254190000000001,11.44949,9.450009999999999L9.450009999999999,11.449480000000001C9.254190000000001,11.35577,9.03487,11.30329,8.8033,11.30329C7.97487,11.30329,7.3033,11.97487,7.3033,12.80329C7.3033,13.03487,7.35578,13.25419,7.44949,13.45001L5.146447,15.753Z" stroke-opacity="0" stroke="none"></path></svg>'), $m = () => bm.cloneNode(!0), _m = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M7.573332939453125,14.54567903564453C7.667042939453125,14.741499035644532,7.719512939453125,14.960809035644532,7.719512939453125,15.19239903564453C7.719512939453125,16.02079903564453,7.047942939453125,16.69239903564453,6.219512939453125,16.69239903564453C5.391085939453125,16.69239903564453,4.719512939453125,16.02079903564453,4.719512939453125,15.19239903564453C4.719512939453125,14.36394903564453,5.391085939453125,13.692379035644532,6.219512939453125,13.692379035644532C6.451092939453125,13.692379035644532,6.670412939453125,13.74485903564453,6.866232939453125,13.83856903564453L9.865702939453126,10.83909903564453C9.771992939453124,10.643279035644532,9.719512939453125,10.42395903564453,9.719512939453125,10.192379035644532C9.719512939453125,9.36394903564453,10.391082939453124,8.692379035644532,11.219512939453125,8.692379035644532C11.451092939453126,8.692379035644532,11.670412939453126,8.74485903564453,11.866232939453125,8.838569035644532L15.462112939453124,5.242645035644531C15.657412939453126,5.047383335644532,15.974012939453125,5.047383335644532,16.169212939453125,5.242645035644531C16.364512939453125,5.437907035644531,16.364512939453125,5.754489035644531,16.169212939453125,5.949752035644531L12.573332939453124,9.545679035644532C12.667042939453125,9.74149903564453,12.719512939453125,9.96080903564453,12.719512939453125,10.192379035644532C12.719512939453125,11.020809035644533,12.047942939453126,11.692379035644532,11.219512939453125,11.692379035644532C10.987942939453125,11.692379035644532,10.768632939453125,11.639909035644532,10.572812939453126,11.54619903564453L7.573332939453125,14.54567903564453Z" stroke-opacity="0" stroke="none"></path></svg>'), km = () => _m.cloneNode(!0), xm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M15.719512939453125,8.461776733398438C16.547912939453127,8.461776733398438,17.219512939453125,7.7902067333984375,17.219512939453125,6.9617767333984375C17.219512939453125,6.133349733398438,16.547912939453127,5.4617767333984375,15.719512939453125,5.4617767333984375C14.891082939453124,5.4617767333984375,14.219512939453125,6.133349733398438,14.219512939453125,6.9617767333984375C14.219512939453125,7.193346733398437,14.271992939453124,7.412666733398438,14.365692939453124,7.608486733398438L7.366222939453126,14.607956733398437C7.170402939453125,14.514256733398437,6.951082939453125,14.461776733398438,6.719512939453125,14.461776733398438C5.891085939453125,14.461776733398438,5.219512939453125,15.133346733398437,5.219512939453125,15.961776733398438C5.219512939453125,16.79017673339844,5.891085939453125,17.461776733398438,6.719512939453125,17.461776733398438C7.547942939453125,17.461776733398438,8.219512939453125,16.79017673339844,8.219512939453125,15.961776733398438C8.219512939453125,15.730176733398437,8.167032939453126,15.510876733398437,8.073322939453124,15.315066733398437L15.072802939453124,8.315586733398437C15.268612939453124,8.409296733398438,15.487912939453125,8.461776733398438,15.719512939453125,8.461776733398438Z" stroke-opacity="0" stroke="none"></path></svg>'), Lm = () => xm.cloneNode(!0), wm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17.0643,7.033864912109375L18,3.585784912109375L14.5078,4.509695912109375L15.3537,5.344934912109375L6.02026,14.560584912109375C5.87635,14.517484912109374,5.72366,14.494284912109375,5.5655,14.494284912109375C4.7009,14.494284912109375,4,15.186384912109375,4,16.040084912109375C4,16.893784912109375,4.7009,17.585784912109375,5.5655,17.585784912109375C6.43011,17.585784912109375,7.13101,16.893784912109375,7.13101,16.040084912109375C7.13101,15.722284912109375,7.03392,15.426984912109376,6.86744,15.181384912109374L16.0917,6.073604912109375L17.0643,7.033864912109375Z" stroke-opacity="0" stroke="none"></path></svg>'), Am = () => wm.cloneNode(!0), Tm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,13.00505L18.5,13.00505C18.7761,13.00505,19,13.228909999999999,19,13.50505C19,13.781189999999999,18.7761,14.00505,18.5,14.00505L6.91465,14.00505C6.70873,14.58765,6.15311,15.00505,5.5,15.00505C4.671573,15.00505,4,14.33348,4,13.50505C4,12.67662,4.671573,12.00505,5.5,12.00505C6.15311,12.00505,6.70873,12.422450000000001,6.91465,13.00505ZM7.81404,11.625L10.48591,11.625L10.48591,10.90625L9.65193,10.90625L9.65193,7.125L8.997630000000001,7.125C8.71443,7.306641,8.415600000000001,7.419922,7.96443,7.498047L7.96443,8.05078L8.77497,8.05078L8.77497,10.90625L7.81404,10.90625L7.81404,11.625ZM11.081620000000001,11.625L14.0562,11.625L14.0562,10.88281L13.09724,10.88281C12.8863,10.88281,12.59333,10.90625,12.36482,10.93555C13.17537,10.11328,13.84724,9.2207,13.84724,8.39062C13.84724,7.541016,13.28865,7,12.4488,7C11.84333,7,11.446850000000001,7.234375,11.03279,7.679688L11.52497,8.16797C11.747630000000001,7.914062,12.0113,7.697266,12.33552,7.697266C12.7613,7.697266,13.00154,7.982422,13.00154,8.43359C13.00154,9.14648,12.29255,10.00781,11.081620000000001,11.11523L11.081620000000001,11.625ZM15.9605,11.75C16.8121,11.75,17.526899999999998,11.2832,17.526899999999998,10.4375C17.526899999999998,9.82031,17.142200000000003,9.43945,16.6441,9.30078L16.6441,9.27148C17.1129,9.08594,17.3824,8.7207,17.3824,8.21289C17.3824,7.421875,16.8004,7,15.9429,7C15.4215,7,14.9957,7.210938,14.6109,7.541016L15.066,8.11133C15.3258,7.849609,15.5836,7.697266,15.9019,7.697266C16.2789,7.697266,16.4957,7.914062,16.4957,8.28125C16.4957,8.70898,16.2301,9,15.4215,9L15.4215,9.63672C16.3804,9.63672,16.6383,9.91992,16.6383,10.38086C16.6383,10.79688,16.3336,11.03125,15.8824,11.03125C15.4742,11.03125,15.1578,10.82227,14.8922,10.55078L14.4781,11.13281C14.7906,11.486329999999999,15.2652,11.75,15.9605,11.75Z" stroke-opacity="0" stroke="none"></path></svg>'), Sm = () => Tm.cloneNode(!0), Mm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.146447,14.178126025390625C2.9511847,13.982826025390626,2.9511847,13.666226025390625,3.146447,13.470926025390625L7.39146,9.225966025390626C7.35417,9.095106025390624,7.33421,8.956946025390625,7.33421,8.814116025390625C7.33421,7.985696025390625,8.00578,7.314116025390625,8.834209999999999,7.314116025390625C8.97703,7.314116025390625,9.11519,7.334086025390625,9.24605,7.371366025390625L13.753,2.864373025390625C13.9483,2.669110325390625,14.2649,2.669110325390625,14.4602,2.864373025390625C14.6554,3.059635025390625,14.6554,3.376217025390625,14.4602,3.571479025390625L10.06916,7.962476025390625C10.23631,8.204386025390626,10.334209999999999,8.497826025390625,10.334209999999999,8.814116025390625C10.334209999999999,9.642546025390626,9.66264,10.314116025390625,8.834209999999999,10.314116025390625C8.51791,10.314116025390625,8.22448,10.216226025390625,7.98256,10.049076025390626L3.853554,14.178126025390625C3.658291,14.373326025390625,3.341709,14.373326025390625,3.146447,14.178126025390625ZM7.67736,19.188526025390626C7.4821,18.993226025390626,7.4821,18.676626025390625,7.67736,18.481426025390626L9.9804,16.178326025390625C9.88669,15.982526025390625,9.834209999999999,15.763226025390624,9.834209999999999,15.531626025390626C9.834209999999999,14.703226025390626,10.50578,14.031626025390626,11.33421,14.031626025390626C11.56579,14.031626025390626,11.78511,14.084126025390624,11.98093,14.177826025390624L13.9804,12.178356025390626C13.8867,11.982536025390624,13.8342,11.763216025390625,13.8342,11.531636025390625C13.8342,10.703206025390624,14.5058,10.031636025390625,15.3342,10.031636025390625C15.5658,10.031636025390625,15.7851,10.084116025390625,15.9809,10.177826025390626L18.284,7.874796025390625C18.4792,7.679536025390625,18.7958,7.679536025390625,18.9911,7.874796025390625C19.1863,8.070056025390624,19.1863,8.386636025390626,18.9911,8.581906025390625L16.688000000000002,10.884936025390624C16.7817,11.080756025390626,16.8342,11.300066025390626,16.8342,11.531636025390625C16.8342,12.360066025390624,16.162599999999998,13.031626025390626,15.3342,13.031626025390626C15.1026,13.031626025390626,14.8833,12.979126025390626,14.6875,12.885426025390625L12.68803,14.884926025390625C12.78174,15.080726025390625,12.83421,15.300026025390626,12.83421,15.531626025390626C12.83421,16.360026025390624,12.16264,17.031626025390626,11.33421,17.031626025390626C11.10264,17.031626025390626,10.88333,16.979126025390627,10.68751,16.885426025390625L8.38446,19.188526025390626C8.1892,19.383726025390626,7.87262,19.383726025390626,7.67736,19.188526025390626Z" stroke-opacity="0" stroke="none"></path></svg>'), Pm = () => Mm.cloneNode(!0), Dm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.3367688759765626,12.63173C3.5320318759765623,12.82699,3.8486138759765627,12.82699,4.043876875976562,12.63173L11.822052875976562,4.853553C12.017312875976563,4.658291,12.017312875976563,4.341708,11.822052875976562,4.146446C11.626792875976562,3.9511843,11.310202875976563,3.9511843,11.114942875976563,4.146446L3.3367688759765626,11.92462C3.1415071759765625,12.11988,3.1415071759765625,12.43647,3.3367688759765626,12.63173ZM5.001492875976562,17.0351C4.806232875976562,16.8399,4.806232875976562,16.5233,5.001492875976562,16.328L7.304532875976562,14.025C7.210822875976563,13.82916,7.158352875976563,13.60984,7.158352875976563,13.37827C7.158352875976563,12.54984,7.829922875976562,11.87827,8.658352875976561,11.87827C8.889922875976563,11.87827,9.109232875976563,11.93075,9.305052875976562,12.02446L11.304532875976562,10.02498C11.210822875976563,9.82916,11.158352875976561,9.60984,11.158352875976561,9.37827C11.158352875976561,8.54984,11.829922875976562,7.8782700000000006,12.658352875976563,7.8782700000000006C12.889922875976563,7.8782700000000006,13.109232875976563,7.93075,13.305022875976562,8.024460000000001L15.608122875976562,5.72142C15.803322875976562,5.5261499999999995,16.119922875976563,5.5261499999999995,16.315222875976563,5.72142C16.510422875976563,5.9166799999999995,16.510422875976563,6.23326,16.315222875976563,6.42852L14.012122875976562,8.73156C14.105822875976562,8.92738,14.158322875976562,9.1467,14.158322875976562,9.37827C14.158322875976562,10.2067,13.486822875976562,10.87827,12.658352875976563,10.87827C12.426772875976562,10.87827,12.207452875976562,10.82579,12.011642875976563,10.73209L10.012162875976562,12.73156C10.105872875976562,12.92738,10.158352875976561,13.1467,10.158352875976561,13.37827C10.158352875976561,14.2067,9.486772875976563,14.8783,8.658352875976561,14.8783C8.426772875976562,14.8783,8.207452875976562,14.8258,8.011642875976563,14.7321L5.708602875976562,17.0351C5.513342875976562,17.2304,5.196752875976562,17.2304,5.001492875976562,17.0351ZM10.415712875976563,18.328C10.220452875976562,18.5233,9.903862875976563,18.5233,9.708602875976563,18.328C9.513342875976562,18.1328,9.513342875976562,17.816200000000002,9.708602875976563,17.6209L12.304532875976562,15.025C12.210822875976563,14.8292,12.158352875976563,14.6098,12.158352875976563,14.3783C12.158352875976563,13.54984,12.829922875976562,12.87827,13.658322875976562,12.87827C13.889922875976563,12.87827,14.109222875976563,12.93075,14.305022875976562,13.02446L17.486822875976564,9.84274C17.682022875976564,9.64747,17.99862287597656,9.64747,18.19392287597656,9.84274C18.38912287597656,10.038,18.38912287597656,10.35458,18.19392287597656,10.54984L15.012122875976562,13.73156C15.105822875976562,13.92738,15.158322875976562,14.1467,15.158322875976562,14.3783C15.158322875976562,15.2067,14.486822875976562,15.8783,13.658322875976562,15.8783C13.426822875976562,15.8783,13.207422875976562,15.8258,13.011642875976563,15.7321L10.415712875976563,18.328Z" stroke-opacity="0" stroke="none"></path></svg>'), Nm = () => Dm.cloneNode(!0), Om = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M13.1889,6C12.98303,6.582599999999999,12.42741,7,11.7743,7C11.12119,7,10.565570000000001,6.582599999999999,10.35965,6L3.5,6C3.223857,6,3,5.77614,3,5.5C3,5.22386,3.223857,5,3.5,5L10.35965,5C10.565570000000001,4.417404,11.12119,4,11.7743,4C12.42741,4,12.98303,4.417404,13.1889,5L18.5,5C18.7761,5,19,5.22386,19,5.5C19,5.77614,18.7761,6,18.5,6L13.1889,6ZM3,8.5C3,8.22386,3.223857,8,3.5,8L18.5,8C18.7761,8,19,8.22386,19,8.5C19,8.77614,18.7761,9,18.5,9L3.5,9C3.223857,9,3,8.77614,3,8.5ZM3.278549,11.5C3.278549,11.22386,3.502407,11,3.778549,11L18.7785,11C19.0547,11,19.2785,11.22386,19.2785,11.5C19.2785,11.77614,19.0547,12,18.7785,12L3.778549,12C3.502407,12,3.278549,11.77614,3.278549,11.5ZM3.139267,14.5C3.139267,14.2239,3.363124,14,3.6392670000000003,14L18.6393,14C18.915399999999998,14,19.1393,14.2239,19.1393,14.5C19.1393,14.7761,18.915399999999998,15,18.6393,15L3.6392670000000003,15C3.363124,15,3.139267,14.7761,3.139267,14.5ZM13.1889,18C12.98303,18.5826,12.42741,19,11.7743,19C11.12119,19,10.565570000000001,18.5826,10.35965,18L3.778549,18C3.502407,18,3.278549,17.7761,3.278549,17.5C3.278549,17.2239,3.502407,17,3.778549,17L10.35965,17C10.565570000000001,16.4174,11.12119,16,11.7743,16C12.42741,16,12.98303,16.4174,13.1889,17L18.7785,17C19.0547,17,19.2785,17.2239,19.2785,17.5C19.2785,17.7761,19.0547,18,18.7785,18L13.1889,18Z" stroke-opacity="0" stroke="none"></path></svg>'), Im = () => Om.cloneNode(!0), Em = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4.91465,6C4.70873,6.582599999999999,4.15311,7,3.5,7C2.671573,7,2,6.32843,2,5.5C2,4.671573,2.671573,4,3.5,4C4.15311,4,4.70873,4.417404,4.91465,5L18.2257,5C18.5018,5,18.7257,5.22386,18.7257,5.5C18.7257,5.77614,18.5018,6,18.2257,6L4.91465,6ZM2.7257,8.5C2.7257,8.22386,2.949558,8,3.2257,8L18.2257,8C18.5018,8,18.7257,8.22386,18.7257,8.5C18.7257,8.77614,18.5018,9,18.2257,9L3.2257,9C2.949558,9,2.7257,8.77614,2.7257,8.5ZM3.00425,11.5C3.00425,11.22386,3.22811,11,3.50425,11L18.5042,11C18.7804,11,19.0042,11.22386,19.0042,11.5C19.0042,11.77614,18.7804,12,18.5042,12L3.50425,12C3.22811,12,3.00425,11.77614,3.00425,11.5ZM2.864967,14.5C2.864967,14.2239,3.08882,14,3.36497,14L18.365,14C18.6411,14,18.865,14.2239,18.865,14.5C18.865,14.7761,18.6411,15,18.365,15L3.36497,15C3.08882,15,2.864967,14.7761,2.864967,14.5ZM20,17.5C20,18.328400000000002,19.3284,19,18.5,19C17.846899999999998,19,17.2913,18.5826,17.0854,18L3.50425,18C3.22811,18,3.00425,17.7761,3.00425,17.5C3.00425,17.2239,3.22811,17,3.50425,17L17.0854,17C17.2913,16.4174,17.846899999999998,16,18.5,16C19.3284,16,20,16.671599999999998,20,17.5Z" stroke-opacity="0" stroke="none"></path></svg>'), Bm = () => Em.cloneNode(!0), Fm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="5" ry="5" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="3" ry="3" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse></svg>'), Um = () => Fm.cloneNode(!0), zm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3,7.32468C5.90649,3.3893050000000002,11.49833,2.81306,14.6674,6.31944C14.9056,6.1554199999999994,15.192,6.05979,15.5,6.05979C15.845,6.05979,16.1628,6.17974,16.4162,6.381349999999999L18.4509,4.23827L19,4.816615L16.8945,7.03429C16.962600000000002,7.21075,17,7.40319,17,7.60463C17,8.45782,16.328400000000002,9.14947,15.5,9.14947C14.6716,9.14947,14,8.45782,14,7.60463C14,7.36402,14.0534,7.13625,14.1487,6.93322C11.32695,3.748365,6.25159,4.253956,3.612785,7.82695L3,7.32468ZM14.09,15.4717C15.7427,13.78985,16.244500000000002,11.524740000000001,15.5633,9.30134L15.5618,9.30134L16.3012,9.0502C17.072400000000002,11.56646,16.497700000000002,14.158,14.6282,16.0599C12.28737,18.442,8.62386,18.6988,6.41348,16.4501C4.5526,14.5572,4.52076,11.19671,6.36766,9.3177C7.89069,7.76754,10.07544,7.706189999999999,11.56741,9.22363C11.95453,9.61742,12.24817,10.08363,12.43369,10.57677L14.1451,8.77421L14.6942,9.35256L12.64982,11.50582C12.65827,11.59712,12.66295,11.68839,12.66378,11.77936C12.87398,12.04523,13,12.38451,13,12.7541C13,13.60729,12.32843,14.2989,11.5,14.2989C10.67157,14.2989,10,13.60729,10,12.7541C10,11.90091,10.67157,11.20926,11.5,11.20926C11.60387,11.20926,11.70528,11.220130000000001,11.8032,11.240829999999999L11.81763,11.22564C11.69858,10.71874,11.42858,10.21929,11.0284,9.81179C9.844000000000001,8.60765,8.136890000000001,8.65592,6.90822,9.90586C5.37975,11.460930000000001,5.40693,14.288,6.95404,15.8619C8.84598,17.7867,12.03496,17.5626,14.09,15.4717Z" stroke-opacity="0" stroke="none"></path></svg>'), Vm = () => zm.cloneNode(!0), Rm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4,17.0854L4,3.5C4,3.223858,4.22386,3,4.5,3C4.77614,3,5,3.223858,5,3.5L5,10L7.57584,10L9.8127,4.46359C9.91614,4.20756,10.20756,4.08386,10.46359,4.1873000000000005C10.71963,4.29075,10.84333,4.58216,10.73988,4.8382000000000005L8.65438,10L11.08535,10C11.29127,9.4174,11.84689,9,12.5,9C12.65154,9,12.79784,9.02247,12.93573,9.06427L16.6464,5.35355C16.8417,5.15829,17.1583,5.15829,17.3536,5.35355C17.5488,5.54882,17.5488,5.8654,17.3536,6.06066L13.7475,9.66675C13.907,9.90508,14,10.19168,14,10.5C14,11.15311,13.5826,11.70873,13,11.91465L13,14.3638L18.3714,12.1936C18.6274,12.09015,18.918799999999997,12.21385,19.0222,12.46989C19.1257,12.72592,19.002,13.0173,18.746000000000002,13.1208L13,15.4423L13,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854ZM6.3729499999999994,17.0413L12,14.7678L12,11.91465C11.88136,11.87271,11.76956,11.81627,11.66675,11.74746L6.3729499999999994,17.0413ZM12,15.8463L6.6694700000000005,18L12,18L12,15.8463ZM6.38629,15.6137L8.250350000000001,11L11,11L6.38629,15.6137ZM5,11L7.17182,11L5,16.3754L5,11Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Km = () => Rm.cloneNode(!0), jm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17,4.5C17,5.32843,16.328400000000002,6,15.5,6C15.0931,6,14.7241,5.83802,14.4539,5.57503L5.98992,8.32515C5.99658,8.38251,6,8.440850000000001,6,8.5C6,9.15311,5.582599999999999,9.70873,5,9.91465L5,11.08535C5.42621,11.236,5.763999999999999,11.57379,5.91465,12L19.5,12C19.7761,12,20,12.22386,20,12.5C20,12.77614,19.7761,13,19.5,13L5.91465,13C5.70873,13.5826,5.15311,14,4.5,14C3.671573,14,3,13.3284,3,12.5C3,11.84689,3.417404,11.29127,4,11.08535L4,9.91465C3.417404,9.70873,3,9.15311,3,8.5C3,7.67157,3.671573,7,4.5,7C4.90411,7,5.2709,7.15981,5.5406200000000005,7.41967L14.0093,4.66802C14.0032,4.6128599999999995,14,4.5568,14,4.5C14,3.671573,14.6716,3,15.5,3C16.328400000000002,3,17,3.671573,17,4.5ZM4,15.5C4,15.2239,4.22386,15,4.5,15L19.5,15C19.7761,15,20,15.2239,20,15.5C20,15.7761,19.7761,16,19.5,16L4.5,16C4.22386,16,4,15.7761,4,15.5ZM4,18.5C4,18.2239,4.22386,18,4.5,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L4.5,19C4.22386,19,4,18.7761,4,18.5Z" stroke-opacity="0" stroke="none"></path></svg>'), Qm = () => jm.cloneNode(!0), Zm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M20,3.5C20,4.15311,19.5826,4.70873,19,4.91465L19,18.5C19,18.7761,18.7761,19,18.5,19L4.91465,19C4.70873,19.5826,4.15311,20,3.5,20C2.671573,20,2,19.3284,2,18.5C2,17.846899999999998,2.417404,17.2913,3,17.0854L3,3.5C3,3.22386,3.22386,3,3.5,3L17.0854,3C17.2913,2.417404,17.846899999999998,2,18.5,2C19.3284,2,20,2.671573,20,3.5ZM17.0854,4C17.236,4.42621,17.5738,4.763999999999999,18,4.91465L18,8L14,8L14,4L17.0854,4ZM13,4L13,8L9,8L9,4L13,4ZM13,9L9,9L9,13L13,13L13,9ZM13,14L9,14L9,18L13,18L13,14ZM14,18L14,14L18,14L18,18L14,18ZM18,13L14,13L14,9L18,9L18,13ZM4.91465,18C4.763999999999999,17.5738,4.42621,17.236,4,17.0854L4,14L8,14L8,18L4.91465,18ZM4,8L4,4L8,4L8,8L4,8ZM8,9L8,13L4,13L4,9L8,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Hm = () => Zm.cloneNode(!0), Ym = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" fill="none" stroke-opacity="1" stroke-width="1"></ellipse></svg>'), Wm = () => Ym.cloneNode(!0), qm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.57625,6.9981C11.55099,6.999359999999999,11.52557,7,11.5,7C11.34,7,11.18584,6.97495,11.04125,6.9285499999999995L5.55401,16.4327C5.713760000000001,16.5905,5.83826,16.7839,5.91465,17L16.0854,17C16.2187,16.622700000000002,16.4987,16.314700000000002,16.8569,16.1445L11.57625,6.9981ZM12.50759,6.611219999999999C12.81005,6.336790000000001,13,5.94058,13,5.5C13,4.671573,12.32843,4,11.5,4C10.67157,4,10,4.671573,10,5.5C10,5.80059,10.08841,6.08052,10.24066,6.31522L4.64514,16.0069C4.59738,16.002299999999998,4.54896,16,4.5,16C3.671573,16,3,16.671599999999998,3,17.5C3,18.328400000000002,3.671573,19,4.5,19C5.15311,19,5.70873,18.5826,5.91465,18L16.0854,18C16.2913,18.5826,16.846899999999998,19,17.5,19C18.328400000000002,19,19,18.328400000000002,19,17.5C19,16.8365,18.5691,16.2735,17.971899999999998,16.075699999999998L12.50759,6.611219999999999Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Gm = () => qm.cloneNode(!0), Xm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19,4.5C19,5.15311,18.5826,5.70873,18,5.91465L18,18.5C18,18.7761,17.7761,19,17.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854L4,4.5C4,4.22386,4.22386,4,4.5,4L16.0854,4C16.2913,3.417404,16.846899999999998,3,17.5,3C18.328400000000002,3,19,3.671573,19,4.5ZM5,5L16.0854,5C16.236,5.42621,16.5738,5.763999999999999,17,5.91465L17,18L5.91465,18C5.763999999999999,17.5738,5.42621,17.236,5,17.0854L5,5Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Jm = () => Xm.cloneNode(!0), eg = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19.6401,7.99355C20.4028,7.92291,21,7.2811900000000005,21,6.5C21,5.671573,20.3284,5,19.5,5C18.8469,5,18.2913,5.417404,18.0854,6L7.62067,6C7.34453,6,7.12067,6.22386,7.12067,6.5C7.12067,6.5479,7.12741,6.59423,7.13999,6.63809L3.2294099999999997,15.0243C2.530138,15.1517,2,15.764,2,16.5C2,17.328400000000002,2.671573,18,3.5,18C4.15311,18,4.70873,17.5826,4.91465,17L14.5963,17C14.6456,17.076,14.7162,17.1396,14.8044,17.1807C15.0546,17.2974,15.3521,17.1891,15.4688,16.9388L19.6401,7.99355ZM14.7896,16.0293L18.6551,7.739599999999999C18.3942,7.56144,18.1925,7.30307,18.0854,7L8.0746,7L4.25044,15.2009C4.55701,15.3784,4.79493,15.6613,4.91465,16L14.6207,16C14.68,16,14.7368,16.0103,14.7896,16.0293Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), tg = () => eg.cloneNode(!0), ng = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.134443814697265,7.494615087890625L8.764323814697265,7.494615087890625L8.764323814697265,3.414215087890625L8.310223814697267,3.414215087890625L7.294603814697266,4.005035087890625L7.289713814697266,4.634915087890625L8.134443814697265,4.149892087890625L8.134443814697265,7.494615087890625ZM18.832003814697266,6.933095087890624Q19.004603814697266,6.635245087890625,19.004603814697266,6.2543850878906255Q19.004603814697266,5.884915087890625,18.845103814697264,5.593575087890625Q18.685503814697267,5.3006050878906255,18.399103814697266,5.136225087890625Q18.114303814697266,4.9702050878906245,17.754603814697266,4.9653250878906245L18.820603814697265,3.840647087890625L18.820603814697265,3.414215087890625L16.519203814697264,3.414215087890625L16.519203814697264,3.939931087890625L18.050803814697264,3.939931087890625L16.719403814697266,5.334785087890625L17.074203814697263,5.7205350878906245Q17.254903814697265,5.484525087890625,17.619503814697268,5.484525087890625Q17.980803814697268,5.484525087890625,18.187503814697266,5.689605087890625Q18.394203814697267,5.894685087890625,18.394203814697267,6.2543850878906255Q18.394203814697267,6.604315087890625,18.187503814697266,6.822415087890625Q17.980803814697268,7.0405150878906255,17.640603814697265,7.0405150878906255Q17.334603814697267,7.0405150878906255,17.124703814697266,6.890775087890625Q16.914703814697265,6.739415087890626,16.820303814697265,6.469225087890624L16.354803814697263,6.744295087890626Q16.480103814697266,7.125155087890625,16.821903814697265,7.341625087890625Q17.165403814697264,7.559725087890625,17.640603814697265,7.559725087890625Q18.039403814697266,7.559725087890625,18.348603814697267,7.393705087890625Q18.659503814697267,7.229315087890625,18.832003814697266,6.933095087890624ZM10.000003814697266,10.634915087890626C10.000003814697266,11.024655087890626,9.851363814697265,11.379685087890625,9.607683814697266,11.646395087890625L12.168903814697266,15.171615087890626C12.275403814697265,15.147615087890625,12.386203814697266,15.134915087890626,12.500003814697266,15.134915087890626C12.596503814697266,15.134915087890626,12.690803814697265,15.144015087890624,12.782303814697265,15.161415087890624L16.108803814697268,11.196955087890625C16.038703814697264,11.023375087890624,16.000003814697266,10.833655087890625,16.000003814697266,10.634915087890626C16.000003814697266,9.806495087890625,16.671603814697264,9.134915087890626,17.500003814697266,9.134915087890626C18.328403814697264,9.134915087890626,19.000003814697266,9.806495087890625,19.000003814697266,10.634915087890626C19.000003814697266,11.463345087890625,18.328403814697264,12.134915087890626,17.500003814697266,12.134915087890626C17.239503814697265,12.134915087890626,16.994503814697268,12.068495087890625,16.781003814697264,11.951675087890624L13.654703814697266,15.677415087890624C13.870303814697266,15.937215087890625,14.000003814697266,16.270915087890625,14.000003814697266,16.634915087890626C14.000003814697266,17.463315087890624,13.328403814697266,18.134915087890626,12.500003814697266,18.134915087890626C11.671573814697265,18.134915087890626,11.000003814697266,17.463315087890624,11.000003814697266,16.634915087890626C11.000003814697266,16.284415087890626,11.120193814697265,15.962015087890626,11.321603814697266,15.706715087890625L8.715393814697265,12.119565087890624C8.645053814697267,12.129685087890625,8.573143814697266,12.134915087890626,8.500003814697266,12.134915087890626C8.162103814697264,12.134915087890626,7.8503038146972655,12.023195087890626,7.599523814697266,11.834665087890626L4.505583814697266,15.521915087890624C4.809213814697266,15.796415087890624,5.000003814697266,16.193415087890624,5.000003814697266,16.634915087890626C5.000003814697266,17.463315087890624,4.328433814697266,18.134915087890626,3.5000038146972656,18.134915087890626C2.6715768146972656,18.134915087890626,2.0000038146972656,17.463315087890624,2.0000038146972656,16.634915087890626C2.0000038146972656,15.806515087890626,2.6715768146972656,15.134915087890626,3.5000038146972656,15.134915087890626C3.508253814697266,15.134915087890626,3.5164838146972657,15.135015087890626,3.524703814697266,15.135115087890625L7.033823814697266,10.953115087890625C7.011673814697265,10.850565087890626,7.000003814697266,10.744105087890624,7.000003814697266,10.634915087890626C7.000003814697266,9.806495087890625,7.671573814697266,9.134915087890626,8.500003814697266,9.134915087890626C9.328433814697267,9.134915087890626,10.000003814697266,9.806495087890625,10.000003814697266,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), rg = () => ng.cloneNode(!0), og = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.13444,7.494615087890625L8.76432,7.494615087890625L8.76432,3.414215087890625L8.310220000000001,3.414215087890625L7.2946,4.005035087890625L7.28971,4.634915087890625L8.13444,4.149892087890625L8.13444,7.494615087890625ZM18.832,6.929835087890625Q19.0046,6.635245087890625,19.0046,6.2543850878906255Q19.0046,5.889805087890625,18.8451,5.5952050878906245Q18.6855,5.3006050878906255,18.3975,5.132965087890625Q18.1094,4.9653250878906245,17.7399,4.9653250878906245Q17.435499999999998,4.9653250878906245,17.1556,5.149245087890625L17.2793,3.939931087890625L18.8304,3.939931087890625L18.8304,3.414215087890625L16.7406,3.414215087890625L16.5094,5.665195087890625L17.0156,5.795405087890625Q17.095399999999998,5.655425087890626,17.2516,5.570795087890625Q17.4095,5.484525087890625,17.6357,5.484525087890625Q17.9694,5.484525087890625,18.1842,5.697745087890625Q18.4007,5.909335087890625,18.4007,6.2543850878906255Q18.4007,6.604315087890625,18.1842,6.822415087890625Q17.9694,7.0405150878906255,17.6292,7.0405150878906255Q17.3298,7.0405150878906255,17.119799999999998,6.890775087890625Q16.9098,6.739415087890626,16.825200000000002,6.474115087890625L16.3597,6.749175087890626Q16.470399999999998,7.110505087890624,16.807299999999998,7.335115087890625Q17.144199999999998,7.559725087890625,17.6292,7.559725087890625Q18.0296,7.559725087890625,18.3438,7.392075087890625Q18.6595,7.224435087890625,18.832,6.929835087890625ZM10,10.634915087890626C10,11.024655087890626,9.85136,11.379685087890625,9.60768,11.646395087890625L12.1689,15.171615087890626C12.2754,15.147615087890625,12.3862,15.134915087890626,12.5,15.134915087890626C12.5965,15.134915087890626,12.6908,15.144015087890624,12.7823,15.161415087890624L16.108800000000002,11.196955087890625C16.0387,11.023375087890624,16,10.833655087890625,16,10.634915087890626C16,9.806495087890625,16.671599999999998,9.134915087890626,17.5,9.134915087890626C18.3284,9.134915087890626,19,9.806495087890625,19,10.634915087890626C19,11.463345087890625,18.3284,12.134915087890626,17.5,12.134915087890626C17.2395,12.134915087890626,16.994500000000002,12.068505087890625,16.781,11.951675087890624L13.6547,15.677415087890624C13.8703,15.937215087890625,14,16.270915087890625,14,16.634915087890626C14,17.463315087890624,13.3284,18.134915087890626,12.5,18.134915087890626C11.67157,18.134915087890626,11,17.463315087890624,11,16.634915087890626C11,16.284415087890626,11.12019,15.962015087890626,11.3216,15.706715087890625L8.71539,12.119565087890624C8.645050000000001,12.129685087890625,8.57314,12.134915087890626,8.5,12.134915087890626C8.162099999999999,12.134915087890626,7.8503,12.023195087890626,7.59952,11.834665087890626L4.50558,15.521915087890624C4.80921,15.796415087890624,5,16.193415087890624,5,16.634915087890626C5,17.463315087890624,4.32843,18.134915087890626,3.5,18.134915087890626C2.671573,18.134915087890626,2,17.463315087890624,2,16.634915087890626C2,15.806515087890626,2.671573,15.134915087890626,3.5,15.134915087890626C3.5082500000000003,15.134915087890626,3.51648,15.135015087890626,3.5247,15.135115087890625L7.03382,10.953115087890625C7.01167,10.850565087890626,7,10.744105087890624,7,10.634915087890626C7,9.806495087890625,7.67157,9.134915087890626,8.5,9.134915087890626C9.32843,9.134915087890626,10,9.806495087890625,10,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), ig = () => og.cloneNode(!0), ag = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M18.8532,7.020985087890625Q19.0257,6.734525087890625,19.0257,6.369945087890625Q19.0257,6.020005087890625,18.8499,5.754705087890625Q18.6758,5.489415087890626,18.3649,5.339675087890625Q18.5944,5.209465087890625,18.7214,4.994615087890625Q18.8499,4.779775087890625,18.8499,4.5193550878906255Q18.8499,4.2003480878906245,18.7002,3.951324087890625Q18.5505,3.700673087890625,18.277,3.557444087890625Q18.0052,3.414215087890625,17.6455,3.414215087890625Q17.285800000000002,3.414215087890625,17.0107,3.557444087890625Q16.7357,3.700673087890625,16.5843,3.951324087890625Q16.4346,4.2003480878906245,16.4346,4.5193550878906255Q16.4346,4.779775087890625,16.561500000000002,4.994615087890625Q16.6901,5.209465087890625,16.919600000000003,5.339675087890625Q16.6055,5.489415087890626,16.4297,5.757965087890625Q16.255499999999998,6.024895087890625,16.255499999999998,6.369945087890625Q16.255499999999998,6.734525087890625,16.4297,7.020985087890625Q16.6055,7.305815087890625,16.919600000000003,7.465325087890625Q17.2354,7.624825087890625,17.6455,7.624825087890625Q18.0557,7.624825087890625,18.3682,7.465325087890625Q18.6807,7.305815087890625,18.8532,7.020985087890625ZM8.76432,7.559725087890625L8.13444,7.559725087890625L8.13444,4.214996087890625L7.28971,4.700025087890625L7.2946,4.070139087890625L8.310220000000001,3.479319087890625L8.76432,3.479319087890625L8.76432,7.559725087890625ZM17.1816,4.955555087890625Q17.0042,4.784655087890625,17.0042,4.5095950878906255Q17.0042,4.229645087890625,17.18,4.057119087890625Q17.355800000000002,3.884592087890625,17.6455,3.884592087890625Q17.935200000000002,3.884592087890625,18.1077,4.057119087890625Q18.2803,4.229645087890625,18.2803,4.5095950878906255Q18.2803,4.784655087890625,18.1045,4.955555087890625Q17.930300000000003,5.124825087890625,17.6455,5.124825087890625Q17.3607,5.124825087890625,17.1816,4.955555087890625ZM18.2217,5.7953950878906255Q18.4398,6.005365087890625,18.4398,6.3552950878906245Q18.4398,6.705235087890625,18.2217,6.915195087890625Q18.0052,7.125155087890625,17.6455,7.125155087890625Q17.285800000000002,7.125155087890625,17.067700000000002,6.915195087890625Q16.849600000000002,6.705235087890625,16.849600000000002,6.3552950878906245Q16.849600000000002,6.005365087890625,17.064500000000002,5.7953950878906255Q17.2793,5.585435087890625,17.6455,5.585435087890625Q18.0052,5.585435087890625,18.2217,5.7953950878906255ZM9.60768,11.711495087890626C9.85136,11.444785087890626,10,11.089765087890626,10,10.700025087890625C10,9.871595087890626,9.32843,9.200025087890625,8.5,9.200025087890625C7.67157,9.200025087890625,7,9.871595087890626,7,10.700025087890625C7,10.809205087890625,7.01167,10.915665087890625,7.03382,11.018215087890624L3.5247,15.200215087890625C3.51648,15.200115087890625,3.5082500000000003,15.200015087890625,3.5,15.200015087890625C2.671573,15.200015087890625,2,15.871615087890625,2,16.700015087890627C2,17.528415087890625,2.671573,18.200015087890627,3.5,18.200015087890627C4.32843,18.200015087890627,5,17.528415087890625,5,16.700015087890627C5,16.258515087890625,4.80921,15.861515087890625,4.50558,15.587015087890626L7.59952,11.899765087890625C7.8503,12.088295087890625,8.162099999999999,12.200025087890625,8.5,12.200025087890625C8.57314,12.200025087890625,8.645050000000001,12.194785087890626,8.71539,12.184675087890625L11.3216,15.771815087890625C11.12019,16.027215087890625,11,16.349515087890623,11,16.700015087890627C11,17.528415087890625,11.67157,18.200015087890627,12.5,18.200015087890627C13.3284,18.200015087890627,14,17.528415087890625,14,16.700015087890627C14,16.336015087890623,13.8703,16.002315087890626,13.6547,15.742515087890625L16.781,12.016775087890625C16.994500000000002,12.133605087890626,17.2395,12.200025087890625,17.5,12.200025087890625C18.3284,12.200025087890625,19,11.528445087890624,19,10.700025087890625C19,9.871595087890626,18.3284,9.200025087890625,17.5,9.200025087890625C16.671599999999998,9.200025087890625,16,9.871595087890626,16,10.700025087890625C16,10.898765087890624,16.0387,11.088475087890625,16.108800000000002,11.262055087890625L12.7823,15.226515087890625C12.6908,15.209115087890625,12.5965,15.200015087890625,12.5,15.200015087890625C12.3862,15.200015087890625,12.2754,15.212715087890626,12.1689,15.236715087890625L9.60768,11.711495087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), sg = () => ag.cloneNode(!0), lg = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M9.474616630859375,7.494615087890625L8.844736630859375,7.494615087890625L8.844736630859375,4.149892087890625L8.000006630859374,4.634915087890625L8.004896630859374,4.005035087890625L9.020516630859376,3.414215087890625L9.474616630859375,3.414215087890625L9.474616630859375,7.494615087890625ZM18.529296630859378,4.8318550878906255Q18.307996630859375,5.028795087890625,18.122396630859377,5.385245087890625Q17.868496630859376,5.019035087890625,17.629196630859376,4.8269750878906255Q17.389996630859375,4.634915087890625,17.168596630859376,4.634915087890625Q16.794296630859375,4.634915087890625,16.522496630859376,4.976715087890625Q16.252296630859377,5.3168850878906255,16.252296630859377,5.7856350878906255Q16.252296630859377,6.218575087890625,16.502896630859375,6.521315087890625Q16.755196630859373,6.822415087890625,17.114896630859377,6.822415087890625Q17.368796630859375,6.822415087890625,17.588596630859374,6.625475087890624Q17.809896630859377,6.428535087890625,17.998696630859374,6.0688350878906245Q18.249396630859373,6.439935087890625,18.488596630859377,6.631985087890625Q18.727896630859377,6.822415087890625,18.952496630859375,6.822415087890625Q19.326796630859373,6.822415087890625,19.596996630859376,6.482245087890625Q19.868796630859375,6.140455087890626,19.868796630859375,5.671705087890626Q19.868796630859375,5.238755087890625,19.618196630859376,4.937655087890625Q19.367496630859375,4.634915087890625,19.006196630859375,4.634915087890625Q18.750696630859377,4.634915087890625,18.529296630859378,4.8318550878906255ZM18.337296630859377,5.674955087890625L18.278696630859375,5.596835087890625Q18.449596630859375,5.272935087890625,18.622096630859374,5.1101750878906245Q18.794596630859374,4.947415087890625,18.967096630859373,4.947415087890625Q19.194996630859375,4.947415087890625,19.346396630859374,5.1345950878906255Q19.497696630859377,5.320135087890625,19.497696630859377,5.598455087890625Q19.497696630859377,5.8914250878906245,19.360996630859376,6.096505087890625Q19.224296630859374,6.301585087890626,19.027396630859375,6.301585087890626Q18.915096630859374,6.301585087890626,18.742496630859375,6.146965087890624Q18.569996630859375,5.992335087890625,18.337296630859377,5.674955087890625ZM17.785496630859377,5.779125087890625L17.842496630859372,5.857245087890625Q17.668296630859373,6.186025087890625,17.495796630859374,6.348785087890625Q17.324896630859374,6.509915087890625,17.153996630859375,6.509915087890625Q16.926096630859377,6.509915087890625,16.774796630859377,6.324375087890624Q16.623396630859375,6.137195087890625,16.623396630859375,5.858875087890625Q16.623396630859375,5.565905087890625,16.761696630859376,5.360825087890625Q16.900096630859373,5.1557550878906255,17.095396630859376,5.1557550878906255Q17.228896630859374,5.1557550878906255,17.365596630859375,5.2778250878906245Q17.502296630859377,5.399895087890625,17.785496630859377,5.779125087890625ZM10.710296630859375,10.634915087890626C10.710296630859375,11.024655087890626,10.561656630859375,11.379685087890625,10.317976630859375,11.646395087890625L12.879196630859376,15.171615087890626C12.985696630859374,15.147615087890625,13.096496630859376,15.134915087890626,13.210296630859375,15.134915087890626C13.306796630859376,15.134915087890626,13.401096630859374,15.144015087890624,13.492596630859374,15.161415087890624L16.819096630859377,11.196955087890625C16.748996630859374,11.023375087890624,16.710296630859375,10.833655087890625,16.710296630859375,10.634915087890626C16.710296630859375,9.806495087890625,17.381896630859373,9.134915087890626,18.210296630859375,9.134915087890626C19.038696630859373,9.134915087890626,19.710296630859375,9.806495087890625,19.710296630859375,10.634915087890626C19.710296630859375,11.463345087890625,19.038696630859373,12.134915087890626,18.210296630859375,12.134915087890626C17.949796630859375,12.134915087890626,17.704796630859377,12.068505087890625,17.491296630859374,11.951675087890624L14.364996630859375,15.677415087890624C14.580596630859375,15.937215087890625,14.710296630859375,16.270915087890625,14.710296630859375,16.634915087890626C14.710296630859375,17.463315087890624,14.038696630859375,18.134915087890626,13.210296630859375,18.134915087890626C12.381866630859374,18.134915087890626,11.710296630859375,17.463315087890624,11.710296630859375,16.634915087890626C11.710296630859375,16.284415087890626,11.830486630859374,15.962015087890626,12.031896630859375,15.706715087890625L9.425686630859374,12.119565087890624C9.355346630859376,12.129685087890625,9.283436630859375,12.134915087890626,9.210296630859375,12.134915087890626C8.872396630859374,12.134915087890626,8.560596630859376,12.023195087890626,8.309816630859375,11.834665087890626L5.215876630859375,15.521915087890624C5.519506630859375,15.796415087890624,5.710296630859375,16.193415087890624,5.710296630859375,16.634915087890626C5.710296630859375,17.463315087890624,5.038726630859375,18.134915087890626,4.210296630859375,18.134915087890626C3.381869630859375,18.134915087890626,2.710296630859375,17.463315087890624,2.710296630859375,16.634915087890626C2.710296630859375,15.806515087890626,3.381869630859375,15.134915087890626,4.210296630859375,15.134915087890626C4.218546630859375,15.134915087890626,4.226776630859375,15.135015087890626,4.234996630859375,15.135115087890625L7.744116630859375,10.953115087890625C7.721966630859375,10.850565087890626,7.710296630859375,10.744105087890624,7.710296630859375,10.634915087890626C7.710296630859375,9.806495087890625,8.381866630859374,9.134915087890626,9.210296630859375,9.134915087890626C10.038726630859376,9.134915087890626,10.710296630859375,9.806495087890625,10.710296630859375,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), cg = () => lg.cloneNode(!0), ug = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M21,5.5C21,6.32843,20.3284,7,19.5,7C19.4136,7,19.3289,6.99269,19.2465,6.97866L15.6257,15.5086C15.8587,15.7729,16,16.119999999999997,16,16.5C16,17.328400000000002,15.3284,18,14.5,18C13.8469,18,13.2913,17.5826,13.0854,17L3.91465,17C3.70873,17.5826,3.15311,18,2.5,18C1.671573,18,1,17.328400000000002,1,16.5C1,15.6716,1.671573,15,2.5,15C2.5840199999999998,15,2.66643,15.0069,2.74668,15.0202L6.36934,6.48574C6.13933,6.22213,6,5.87733,6,5.5C6,4.671573,6.67157,4,7.5,4C8.15311,4,8.70873,4.417404,8.91465,5L18.0854,5C18.2913,4.417404,18.8469,4,19.5,4C20.3284,4,21,4.671573,21,5.5ZM18.0854,6L8.91465,6C8.892579999999999,6.06243,8.8665,6.12296,8.83672,6.18128L13.9814,15.0921C14.143,15.0325,14.3177,15,14.5,15C14.584,15,14.6664,15.0069,14.7467,15.0202L18.3693,6.48574C18.2462,6.3446,18.149,6.1802,18.0854,6ZM13.2036,15.745L8.0861,6.8811800000000005C7.90605,6.95768,7.70797,7,7.5,7C7.41359,7,7.32888,6.99269,7.24647,6.97866L3.62571,15.5086C3.7512,15.651,3.8501,15.8174,3.91465,16L13.0854,16C13.1169,15.9108,13.1566,15.8255,13.2036,15.745Z" stroke-opacity="0" stroke="none"></path></svg>'), dg = () => ug.cloneNode(!0), hg = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.92159,5.93994C6.04014,5.90529,6.152620000000001,5.85639,6.25704,5.79523L9.12729,9.89437C9.045449999999999,10.07959,9,10.28449,9,10.5C9,10.79522,9.08529,11.07053,9.232569999999999,11.30262L4.97573,16.7511L5.92159,5.93994ZM4.92259,5.8848400000000005C4.38078,5.658659999999999,4,5.1238,4,4.5C4,3.671573,4.67157,3,5.5,3C6.2157,3,6.81433,3.50124,6.96399,4.17183L15.1309,4.88634C15.3654,4.36387,15.8902,4,16.5,4C17.328400000000002,4,18,4.67157,18,5.5C18,6.08983,17.659599999999998,6.60015,17.1645,6.84518L18.4264,14.0018C18.4508,14.0006,18.4753,14,18.5,14C19.3284,14,20,14.6716,20,15.5C20,16.328400000000002,19.3284,17,18.5,17C17.932499999999997,17,17.4386,16.6849,17.183799999999998,16.22L5.99686,18.5979C5.946429999999999,19.3807,5.29554,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.869300000000003,3.389292,17.3295,3.94071,17.1077L4.92259,5.8848400000000005ZM5.72452,17.6334C5.69799,17.596,5.6698,17.5599,5.64004,17.525100000000002L10.01843,11.92103C10.16958,11.97223,10.33155,12,10.5,12C10.80059,12,11.08052,11.91158,11.31522,11.75934L17.0606,15.0765C17.0457,15.1271,17.0335,15.1789,17.023899999999998,15.2317L5.72452,17.6334ZM11.92855,10.95875L17.4349,14.1379L16.1699,6.96356C15.9874,6.92257,15.8174,6.8483,15.6667,6.74746L11.99771,10.4165C11.99923,10.44414,12,10.47198,12,10.5C12,10.66,11.97495,10.814160000000001,11.92855,10.95875ZM10.5,9C10.259830000000001,9,10.03285,9.05644,9.83159,9.15679L7.04919,5.1831L15.0493,5.88302C15.054,5.90072,15.059,5.91829,15.0643,5.9357299999999995L11.56066,9.43934C11.28921,9.16789,10.91421,9,10.5,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), fg = () => hg.cloneNode(!0), mg = /* @__PURE__ */ $('<svg viewBox="0 0 22 22"><path d="M4.727219638671875,8.007996215820313L9.973849638671876,2.7629472158203123C10.167279638671875,2.5696791158203123,10.480729638671875,2.5696791158203123,10.674169638671875,2.7629472158203123L13.223329638671874,5.311756215820313C13.416929638671874,5.505236215820313,13.416929638671874,5.8189862158203125,13.223329638671874,6.012466215820313L7.977129638671875,11.257906215820313C7.379859638671875,11.855176215820313,7.407609638671875,12.909396215820312,8.033809638671876,13.535596215820313C8.660409638671876,14.162596215820313,9.713849638671874,14.189996215820312,10.311129638671876,13.591896215820313L15.556929638671875,8.346066215820311C15.750429638671875,8.152526215820313,16.064229638671875,8.152526215820313,16.257629638671872,8.346066215820311L18.806529638671876,10.895266215820312C19.000029638671876,11.088746215820313,19.000029638671876,11.402496215820312,18.806529638671876,11.595976215820313L13.560629638671875,16.841796215820313C11.165619638671876,19.237196215820312,7.197149638671875,19.19919621582031,4.783499638671875,16.785496215820313C2.3698426386718747,14.371896215820312,2.331397638671875,10.403416215820313,4.727219638671875,8.007996215820313ZM12.172299638671875,5.662106215820312L10.323809638671875,3.8136162158203124L5.4287196386718755,8.709096215820313C3.422893638671875,10.714536215820312,3.4549956386718748,14.055196215820313,5.484999638671875,16.08479621582031C7.514609638671875,18.114796215820313,10.855289638671875,18.146496215820314,12.860719638671876,16.141096215820312L15.465629638671874,13.535796215820312L14.090929638671875,12.160756215820312L14.791629638671875,11.460436215820312L16.166229638671876,12.834996215820313L17.755829638671877,11.245226215820313L15.907729638671874,9.396736215820312L11.011839638671875,14.292596215820312C10.042809638671875,15.262396215820312,8.418249638671874,15.243796215820312,7.406019638671875,14.306496215820312L7.333099638671875,14.236296215820312C6.327599638671876,13.230796215820313,6.284009638671876,11.550396215820312,7.276419638671875,10.557586215820312L9.882199638671874,7.952026215820313L8.501079638671875,6.570906215820313L9.201789638671876,5.870186215820313L10.582939638671874,7.251336215820312L12.172299638671875,5.662106215820312Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), gg = (e) => (() => {
  const t = mg.cloneNode(!0);
  return Ie(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), yg = /* @__PURE__ */ $('<svg viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_615"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_615)"><path d="M19.672,3.0673368C19.4417,2.9354008,19.1463,3.00292252,18.9994,3.2210900000000002L17.4588,5.50622L16.743299999999998,3.781253L13.9915,7.4662L13.9618,7.51108C13.8339,7.72862,13.8936,8.005659999999999,14.1004,8.15391L14.1462,8.183430000000001C14.3683,8.308720000000001,14.6511,8.25001,14.8022,8.047229999999999L16.4907,5.78571L17.246299999999998,7.60713L19.8374,3.7635389999999997L19.8651,3.717088C19.9871,3.484615,19.9023,3.199273,19.672,3.0673368ZM4.79974,8.462530000000001L10.117740000000001,3.252975C10.31381,3.0610145,10.63152,3.0610145,10.82759,3.252975L13.4115,5.78453C13.6076,5.976710000000001,13.6076,6.28833,13.4115,6.4805L8.093869999999999,11.69045C7.48847,12.28368,7.51659,13.3308,8.151309999999999,13.9528C8.786439999999999,14.5755,9.85421,14.6027,10.45961,14.0087L15.7768,8.79831C15.9729,8.60609,16.2909,8.60609,16.487099999999998,8.79831L19.0705,11.33026C19.2667,11.52244,19.2667,11.83406,19.0705,12.02623L13.7533,17.2366C11.32572,19.6158,7.30328,19.578,4.85679,17.1807C2.410298,14.7834,2.371331,10.84174,4.79974,8.462530000000001ZM12.3461,6.1325199999999995L10.47246,4.29654L5.51079,9.15889C3.477674,11.15076,3.510214,14.4688,5.56784,16.4847C7.62506,18.500999999999998,11.01117,18.5325,13.0439,16.540599999999998L15.6842,13.9529L14.2908,12.58718L15.0011,11.89161L16.394399999999997,13.2569L18.0056,11.67786L16.1323,9.84188L11.16985,14.7046C10.18764,15.6679,8.540980000000001,15.6494,7.51498,14.7184L7.44107,14.6487C6.4219,13.65,6.37771,11.98096,7.38362,10.994869999999999L10.02485,8.40693L8.624939999999999,7.03516L9.335180000000001,6.33919L10.73512,7.71099L12.3461,6.1325199999999995Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), Cg = (e) => (() => {
  const t = yg.cloneNode(!0);
  return Ie(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), pg = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,17C5.80945,17,3.667717,12.85,3.113386,11.575C2.9622047,11.2,2.9622047,10.8,3.113386,10.425C3.667717,9.15,5.80945,5,11,5C16.165399999999998,5,18.3323,9.15,18.8866,10.425C19.0378,10.8,19.0378,11.2,18.8866,11.575C18.3323,12.85,16.165399999999998,17,11,17ZM4.04567,10.8C3.995276,10.925,3.995276,11.05,4.04567,11.175C4.52441,12.325,6.43937,16,11,16C15.5606,16,17.4756,12.325,17.9543,11.2C18.0047,11.075,18.0047,10.95,17.9543,10.825C17.4756,9.675,15.5606,6,11,6C6.43937,6,4.52441,9.675,4.04567,10.8ZM11,13.5C9.61417,13.5,8.480319999999999,12.375,8.480319999999999,11C8.480319999999999,9.625,9.61417,8.5,11,8.5C12.38583,8.5,13.5197,9.625,13.5197,11C13.5197,12.375,12.38583,13.5,11,13.5ZM11,9.5C10.1685,9.5,9.48819,10.175,9.48819,11C9.48819,11.825,10.1685,12.5,11,12.5C11.8315,12.5,12.51181,11.825,12.51181,11C12.51181,10.175,11.8315,9.5,11,9.5Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), vg = () => pg.cloneNode(!0), bg = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.80417,14.9887L4.62563,16.167299999999997C4.43037,16.3625,4.43037,16.6791,4.62563,16.8744C4.82089,17.0696,5.13748,17.0696,5.332739999999999,16.8744L6.62638,15.5807C7.75595,16.290100000000002,9.19328,16.7929,11,16.7929C16.165399999999998,16.7929,18.3323,12.64289,18.8866,11.36789C19.0378,10.99289,19.0378,10.59289,18.8866,10.21789C18.5549,9.45486,17.6456,7.66212,15.8617,6.34545L17.3536,4.853553C17.5488,4.658291,17.5488,4.341709,17.3536,4.146447C17.1583,3.9511845,16.8417,3.9511845,16.6464,4.146447L15.0014,5.7915399999999995C13.9314,5.1969,12.61166,4.792893,11,4.792893C5.80945,4.792893,3.667717,8.94289,3.113386,10.21789C2.9622049,10.59289,2.9622049,10.99289,3.113386,11.36789C3.424435,12.08333,4.2353000000000005,13.70399,5.80417,14.9887ZM7.36012,14.847C8.32327,15.4074,9.52286,15.7929,11,15.7929C15.5606,15.7929,17.4756,12.11789,17.9543,10.99289C18.0047,10.86789,18.0047,10.74289,17.9543,10.61789C17.659,9.90846,16.8171,8.23812,15.1447,7.06241L12.96929,9.23782C13.3134,9.66543,13.5197,10.20642,13.5197,10.79289C13.5197,12.16789,12.38583,13.29289,11,13.29289C10.41596,13.29289,9.87667,13.09308,9.44815,12.75896L7.36012,14.847ZM8.794609999999999,11.99829L6.520099999999999,14.2728C5.06905,13.12119,4.32057,11.628250000000001,4.04567,10.96789C3.995275,10.84289,3.995275,10.71789,4.04567,10.59289C4.52441,9.46789,6.43937,5.79289,11,5.79289C12.28868,5.79289,13.3661,6.086320000000001,14.2596,6.53329L12.19759,8.5953C11.84086,8.40257,11.43271,8.29289,11,8.29289C9.61417,8.29289,8.480319999999999,9.41789,8.480319999999999,10.79289C8.480319999999999,11.22918,8.594470000000001,11.64029,8.794609999999999,11.99829ZM10.16528,12.04183C10.404869999999999,12.20032,10.692070000000001,12.29289,11,12.29289C11.8315,12.29289,12.51181,11.61789,12.51181,10.79289C12.51181,10.48318,12.41593,10.194600000000001,12.25216,9.95494L10.16528,12.04183ZM11.43602,9.35687L9.55616,11.236740000000001C9.512,11.09633,9.48819,10.94724,9.48819,10.79289C9.48819,9.96789,10.1685,9.29289,11,9.29289C11.15142,9.29289,11.29782,9.31528,11.43602,9.35687Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), $g = () => bg.cloneNode(!0), _g = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_625"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_625)"><path d="M14.5385,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807692,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.88462,4,14.5385,5.61538,14.5385,7.576919999999999L14.5385,9.76923ZM10.88461,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923L13.38462,9.76923L13.38462,7.576919999999999C13.38462,6.23077,12.26923,5.15385,10.88461,5.15385ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.038450000000001,12.07692,11.307680000000001,12.34615,11.307680000000001,12.65385L11.307680000000001,14.5769C11.307680000000001,14.8846,11.038450000000001,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), kg = () => _g.cloneNode(!0), xg = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_620"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_620)"><path d="M8.38461,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807693,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.46154,4,13.84615,4.961539,14.3462,6.423080000000001C14.4615,6.73077,14.3077,7.038460000000001,14,7.15385C13.69231,7.26923,13.38461,7.11538,13.26923,6.80769C12.92308,5.80769,11.96154,5.15385,10.88462,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.03846,12.07692,11.307690000000001,12.34615,11.307690000000001,12.65385L11.307690000000001,14.5769C11.307690000000001,14.8846,11.03846,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), Lg = () => xg.cloneNode(!0), wg = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M16.966900000000003,8.67144C16.6669,8.67144,16.4247,8.91558,16.4247,9.21802L16.4247,16.631500000000003C16.4247,17.322,16.007199999999997,17.9068,15.5139,17.9068L13.93072,17.9068L13.93072,9.2162C13.93072,8.91741,13.68675,8.67144,13.38855,8.67144C13.09036,8.67144,12.84639,8.91741,12.84639,9.21802L12.84639,17.9068L10.151810000000001,17.9068L10.151810000000001,9.21802C10.151810000000001,8.91741,9.90783,8.67144,9.609639999999999,8.67144C9.31145,8.67144,9.06747,8.91741,9.06747,9.219850000000001L9.06747,17.9068L7.48614,17.9068C6.99277,17.9068,6.5753,17.322,6.5753,16.631500000000003L6.5753,9.21802C6.5753,8.91558,6.333130000000001,8.67144,6.03313,8.67144C5.73313,8.67144,5.49096,8.91558,5.49096,9.21802L5.49096,16.631500000000003C5.49096,17.9378,6.385540000000001,19,7.48614,19L15.512,19C16.6127,19,17.509,17.9378,17.509,16.631500000000003L17.509,9.21802C17.509,8.91558,17.2669,8.67144,16.966900000000003,8.67144ZM18.4578,6.21183L4.542169,6.21183C4.243976,6.21183,4,6.45779,4,6.75841C4,7.05903,4.243976,7.30499,4.542169,7.30499L18.4578,7.30499C18.756,7.30499,19,7.05903,19,6.75841C19,6.45779,18.756,6.21183,18.4578,6.21183ZM8.68072,5.10045L14.3193,5.10045C14.6175,5.10045,14.8614,4.852666,14.8614,4.550225C14.8614,4.247783,14.6175,4,14.3193,4L8.68072,4C8.38253,4,8.13855,4.247783,8.13855,4.550225C8.13855,4.852666,8.38253,5.10045,8.68072,5.10045Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), Ag = () => wg.cloneNode(!0), Tg = {
  horizontalStraightLine: cm,
  horizontalRayLine: dm,
  horizontalSegment: fm,
  verticalStraightLine: gm,
  verticalRayLine: Cm,
  verticalSegment: vm,
  straightLine: $m,
  rayLine: km,
  segment: Lm,
  arrow: Am,
  priceLine: Sm,
  priceChannelLine: Pm,
  parallelStraightLine: Nm,
  fibonacciLine: Im,
  fibonacciSegment: Bm,
  fibonacciCircle: Um,
  fibonacciSpiral: Vm,
  fibonacciSpeedResistanceFan: Km,
  fibonacciExtension: Qm,
  gannBox: Hm,
  circle: Wm,
  triangle: Gm,
  rect: Jm,
  parallelogram: tg,
  threeWaves: rg,
  fiveWaves: ig,
  eightWaves: sg,
  anyWaves: cg,
  abcd: dg,
  xabcd: fg,
  weak_magnet: gg,
  strong_magnet: Cg,
  lock: kg,
  unlock: Lg,
  visible: vg,
  invisible: $g,
  remove: Ag
};
function Sg(e) {
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
function Mg(e) {
  return [
    { key: "priceChannelLine", text: d("price_channel_line", e) },
    { key: "parallelStraightLine", text: d("parallel_straight_line", e) }
  ];
}
function Pg(e) {
  return [
    { key: "circle", text: d("circle", e) },
    { key: "rect", text: d("rect", e) },
    { key: "parallelogram", text: d("parallelogram", e) },
    { key: "triangle", text: d("triangle", e) }
  ];
}
function Dg(e) {
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
function Ng(e) {
  return [
    { key: "xabcd", text: d("xabcd", e) },
    { key: "abcd", text: d("abcd", e) },
    { key: "threeWaves", text: d("three_waves", e) },
    { key: "fiveWaves", text: d("five_waves", e) },
    { key: "eightWaves", text: d("eight_waves", e) },
    { key: "anyWaves", text: d("any_waves", e) }
  ];
}
function Og(e) {
  return [
    { key: "weak_magnet", text: d("weak_magnet", e) },
    { key: "strong_magnet", text: d("strong_magnet", e) }
  ];
}
const et = (e) => Tg[e.name](e.class), Ig = /* @__PURE__ */ $('<div class="klinecharts-pro-drawing-bar"><span class="split-line"></span><div class="item magnet-mode" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div><div class="item"><span style="width:32px;height:32px"></span></div><div class="item"><span style="width:32px;height:32px"></span></div><span class="split-line"></span><div class="item"><span style="width:32px;height:32px"></span></div></div>'), Eg = /* @__PURE__ */ $('<div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div>'), V0 = /* @__PURE__ */ $('<li><span style="padding-left:8px"></span></li>'), Bg = "drawing_tools", Fg = (e) => {
  const [t, r] = D("horizontalStraightLine"), [n, l] = D("priceChannelLine"), [c, m] = D("circle"), [f, v] = D("fibonacciLine"), [L, x] = D("xabcd"), [w, U] = D("weak_magnet"), [K, ye] = D("normal"), [S, E] = D(!1), [z, G] = D(!0), [B, H] = D(""), Y = (j) => {
    H((re) => re === j ? "" : j);
  }, ce = X(() => [{
    key: "singleLine",
    icon: t(),
    list: Sg(e.locale),
    setter: r
  }, {
    key: "moreLine",
    icon: n(),
    list: Mg(e.locale),
    setter: l
  }, {
    key: "polygon",
    icon: c(),
    list: Pg(e.locale),
    setter: m
  }, {
    key: "fibonacci",
    icon: f(),
    list: Dg(e.locale),
    setter: v
  }, {
    key: "wave",
    icon: L(),
    list: Ng(e.locale),
    setter: x
  }]), W = X(() => Og(e.locale));
  return (() => {
    const j = Ig.cloneNode(!0), re = j.firstChild, ue = re.nextSibling, se = ue.firstChild, be = se.nextSibling, Se = be.firstChild, N = ue.nextSibling, Q = N.firstChild, V = N.nextSibling, Z = V.firstChild, R = V.nextSibling, oe = R.nextSibling, te = oe.firstChild;
    return C(j, () => ce().map((A) => (() => {
      const P = Eg.cloneNode(!0), J = P.firstChild, pe = J.nextSibling, fe = pe.firstChild;
      return P.addEventListener("blur", () => {
        H("");
      }), P.$$click = () => {
        Y(A.key);
      }, C(J, T(et, {
        get name() {
          return A.icon;
        }
      })), C(P, (() => {
        const De = X(() => A.key === B());
        return () => De() && T(An, {
          class: "list",
          get children() {
            return A.list.map((k) => (() => {
              const ge = V0.cloneNode(!0), Me = ge.firstChild;
              return ge.$$click = (tt) => {
                tt.stopPropagation(), A.setter(k.key), e.onDrawingItemClick({
                  name: k.key,
                  lock: S(),
                  mode: K()
                }), H("");
              }, C(ge, T(et, {
                get name() {
                  return k.key;
                }
              }), Me), C(Me, () => k.text), ge;
            })());
          }
        });
      })(), null), F(() => Ie(fe, "class", A.key === B() ? "rotate" : "")), P;
    })()), re), ue.addEventListener("blur", () => {
      H("");
    }), ue.$$click = () => {
      Y("mode");
    }, C(se, (() => {
      const A = X(() => w() === "weak_magnet");
      return () => A() ? (() => {
        const P = X(() => K() === "weak_magnet");
        return () => P() ? T(et, {
          name: "weak_magnet",
          class: "selected"
        }) : T(et, {
          name: "weak_magnet"
        });
      })() : (() => {
        const P = X(() => K() === "strong_magnet");
        return () => P() ? T(et, {
          name: "strong_magnet",
          class: "selected"
        }) : T(et, {
          name: "strong_magnet"
        });
      })();
    })()), C(ue, (() => {
      const A = X(() => B() === "mode");
      return () => A() && T(An, {
        class: "list",
        get children() {
          return W().map((P) => (() => {
            const J = V0.cloneNode(!0), pe = J.firstChild;
            return J.$$click = (fe) => {
              fe.stopPropagation();
              const De = K() === P.key ? "normal" : P.key;
              U(P.key), ye(De), e.onModeChange(De), H("");
            }, C(J, T(et, {
              get name() {
                return P.key;
              },
              get class() {
                return K() === P.key ? "selected" : "";
              }
            }), pe), C(pe, () => P.text), F(() => he(J, K() === P.key ? "selected" : "")), J;
          })());
        }
      });
    })(), null), Q.$$click = () => {
      const A = !S();
      E(A), e.onLockChange(A);
    }, C(Q, (() => {
      const A = X(() => !!S());
      return () => A() ? T(et, {
        name: "lock"
      }) : T(et, {
        name: "unlock"
      });
    })()), Z.$$click = () => {
      const A = !z();
      G(A), e.onVisibleChange(A);
    }, C(Z, (() => {
      const A = X(() => !!z());
      return () => A() ? T(et, {
        name: "visible"
      }) : T(et, {
        name: "invisible"
      });
    })()), te.$$click = () => {
      e.onRemoveClick(Bg);
    }, C(te, T(et, {
      name: "remove"
    })), F(() => Ie(Se, "class", B() === "mode" ? "rotate" : "")), j;
  })();
};
Ye(["click"]);
const R0 = /* @__PURE__ */ $('<li class="title"></li>'), K0 = /* @__PURE__ */ $('<li class="row"></li>'), Ug = (e) => T(St, {
  get title() {
    return d("indicator", e.locale);
  },
  width: 400,
  get onClose() {
    return e.onClose;
  },
  get children() {
    return T(An, {
      class: "klinecharts-pro-indicator-modal-list",
      get children() {
        return [(() => {
          const t = R0.cloneNode(!0);
          return C(t, () => d("main_indicator", e.locale)), t;
        })(), X(() => ["MA", "EMA", "SMA", "BOLL", "SAR", "BBI"].map((t) => {
          const r = e.mainIndicators.includes(t);
          return (() => {
            const n = K0.cloneNode(!0);
            return n.$$click = (l) => {
              e.onMainIndicatorChange({
                name: t,
                paneId: "candle_pane",
                added: !r
              });
            }, C(n, T(E0, {
              checked: r,
              get label() {
                return d(t.toLowerCase(), e.locale);
              }
            })), n;
          })();
        })), (() => {
          const t = R0.cloneNode(!0);
          return C(t, () => d("sub_indicator", e.locale)), t;
        })(), X(() => ["MA", "EMA", "VOL", "MACD", "BOLL", "KDJ", "RSI", "BIAS", "BRAR", "CCI", "DMI", "CR", "PSY", "DMA", "TRIX", "OBV", "VR", "WR", "MTM", "EMV", "SAR", "SMA", "ROC", "PVT", "BBI", "AO"].map((t) => {
          const r = t in e.subIndicators;
          return (() => {
            const n = K0.cloneNode(!0);
            return n.$$click = (l) => {
              e.onSubIndicatorChange({
                name: t,
                paneId: e.subIndicators[t] ?? "",
                added: !r
              });
            }, C(n, T(E0, {
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
function j0(e, t) {
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
function Fi(e) {
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
const zg = (e) => {
  const [t, r] = D(e.timezone), n = X(() => Fi(e.locale));
  return T(St, {
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
      return T(Cn, {
        style: {
          width: "100%",
          "margin-top": "20px"
        },
        get value() {
          return t().text;
        },
        onSelected: (l) => {
          r(l);
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
function Q0(e) {
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
const Vg = /* @__PURE__ */ $('<div class="chart-style-color-picker"><button type="button" class="chart-style-color-swatch"></button></div>'), Rg = /* @__PURE__ */ $('<div class="chart-style-color-popover"><div class="chart-style-color-grid"></div></div>'), Kg = /* @__PURE__ */ $('<button type="button" class="chart-style-palette-color"></button>'), jg = /* @__PURE__ */ $('<div class="chart-style-line-control"><div class="chart-style-width-picker"><button type="button" class="chart-style-size-button"><span></span></button></div></div>'), Qg = /* @__PURE__ */ $('<div class="chart-style-width-popover"></div>'), Zg = /* @__PURE__ */ $('<button type="button"><span></span></button>'), Hg = /* @__PURE__ */ $('<div class="klinecharts-pro-setting-modal-title-tabs"><button type="button"></button><button type="button">Chart Style</button></div>'), Yg = /* @__PURE__ */ $('<div class="klinecharts-pro-setting-modal-content"></div>'), Z0 = /* @__PURE__ */ $('<div class="setting-item"><span class="setting-label"></span><div class="setting-control"></div></div>'), Wg = /* @__PURE__ */ $('<div class="klinecharts-pro-chart-style-content"><div class="chart-style-sidebar"><button type="button">Symbol</button><button type="button">Background</button></div><div class="chart-style-panel"><p class="chart-style-note">* Chart Style takes precedence over default chart settings. Click Reset to align with the default theme.</p></div></div>'), qg = /* @__PURE__ */ $("<h3>Symbol</h3>"), Gg = /* @__PURE__ */ $('<div class="chart-style-row"><span>Candle Stick</span><div class="chart-style-color-pair"></div></div>'), Xg = /* @__PURE__ */ $('<div class="chart-style-row"><span>Borders</span><div class="chart-style-color-pair"></div></div>'), Jg = /* @__PURE__ */ $('<div class="chart-style-row"><span>Wick</span><div class="chart-style-color-pair"></div></div>'), ey = /* @__PURE__ */ $("<h3>Background</h3>"), ty = /* @__PURE__ */ $('<div class="chart-style-row"><span>Color</span></div>'), ny = /* @__PURE__ */ $('<div class="chart-style-row"><label class="chart-style-check-row"><input type="checkbox"><span class="chart-style-check-box" aria-hidden="true"></span><span>Vert Grid Lines</span></label></div>'), ry = /* @__PURE__ */ $('<div class="chart-style-row"><label class="chart-style-check-row"><input type="checkbox"><span class="chart-style-check-box" aria-hidden="true"></span><span>Horz Grid Lines</span></label></div>'), B1 = "chart.backgroundColor", Tn = "#171a27", oy = ["#f6465d", "#f59e0b", "#fcd535", "#2ebd85", "#4098a8", "#22c1dc", "#3861fb", "#7b3fe4", "#ec8aa4", "#f7c56b", "#fff0a3", "#9ed4a4", "#83c7bb", "#8bdce6", "#8bb9f7", "#b7a1dc", "#c9343e", "#e76f20", "#f0b93a", "#3f8d3a", "#236e5a", "#237c88", "#1d3fbf", "#3a209f", "#ffffff", "#cbd5e1", "#9ca3af", "#6b7280", "#374151", "#111827", "#000000"], iy = [{
  key: Re.Solid,
  text: "Solid"
}, {
  key: Re.Dashed,
  text: "Dashed"
}], ay = [1, 2, 3, 4], H0 = [{
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
  key: B1,
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
}], Ui = (e, t = Tn) => {
  const r = I.clone(e), n = I.formatValue(r, "candle.bar.upColor"), l = I.formatValue(r, "candle.bar.downColor"), c = I.formatValue(r, "candle.bar.noChangeColor");
  return Fe(r, "candle.bar.upBorderColor", I.formatValue(r, "candle.bar.upBorderColor", n)), Fe(r, "candle.bar.downBorderColor", I.formatValue(r, "candle.bar.downBorderColor", l)), Fe(r, "candle.bar.noChangeBorderColor", I.formatValue(r, "candle.bar.noChangeBorderColor", c)), Fe(r, "candle.bar.upWickColor", I.formatValue(r, "candle.bar.upWickColor", n)), Fe(r, "candle.bar.downWickColor", I.formatValue(r, "candle.bar.downWickColor", l)), Fe(r, "candle.bar.noChangeWickColor", I.formatValue(r, "candle.bar.noChangeWickColor", c)), Fe(r, "candle.bar.borderUpColor", I.formatValue(r, "candle.bar.borderUpColor", I.formatValue(r, "candle.bar.upBorderColor"))), Fe(r, "candle.bar.borderDownColor", I.formatValue(r, "candle.bar.borderDownColor", I.formatValue(r, "candle.bar.downBorderColor"))), Fe(r, "candle.bar.borderNoChangeColor", I.formatValue(r, "candle.bar.borderNoChangeColor", I.formatValue(r, "candle.bar.noChangeBorderColor"))), Fe(r, "candle.bar.wickUpColor", I.formatValue(r, "candle.bar.wickUpColor", I.formatValue(r, "candle.bar.upWickColor"))), Fe(r, "candle.bar.wickDownColor", I.formatValue(r, "candle.bar.wickDownColor", I.formatValue(r, "candle.bar.downWickColor"))), Fe(r, "candle.bar.wickNoChangeColor", I.formatValue(r, "candle.bar.wickNoChangeColor", I.formatValue(r, "candle.bar.noChangeWickColor"))), Fe(r, B1, t), r;
}, sy = (e, t, r) => {
  if (t === B1)
    return r ?? Tn;
  const l = {
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
  return l ? I.formatValue(e, l) : I.formatValue(e, t, I.formatValue(Ui(e), t));
}, ly = (e) => {
  const [t, r] = D(e.currentStyles), [n, l] = D(Ui(e.currentStyles, e.currentBackgroundColor ?? Tn)), [c, m] = D(Q0(e.locale)), [f, v] = D(e.timezone), [L, x] = D(!1), [w, U] = D("settings"), [K, ye] = D("symbol"), [S, E] = D(null), [z, G] = D(null), B = () => {
    x(window.innerWidth <= 768);
  };
  Ar(() => {
    const N = (Q) => {
      const V = Q.target;
      V instanceof Element && (V.closest(".chart-style-color-picker") || V.closest(".chart-style-width-picker") || V.closest(".klinecharts-pro-select") || (E(null), G(null)));
    };
    B(), window.addEventListener("resize", B), document.addEventListener("mousedown", N), Ct(() => {
      document.removeEventListener("mousedown", N);
    });
  }), Ct(() => {
    window.removeEventListener("resize", B);
  }), Ke(() => {
    m(Q0(e.locale));
  }), Ke(() => {
    v(e.timezone);
  });
  const H = () => Fi(e.locale), Y = (N, Q) => {
    const V = {};
    Fe(V, N.key, Q);
    const Z = I.clone(t());
    Fe(Z, N.key, Q), r(Z), m(c().map((R) => ({
      ...R
    }))), e.onChange(V);
  }, ce = (N, Q) => I.formatValue(n(), N, Q), W = (N, Q) => {
    const V = I.clone(n());
    Fe(V, N, Q), l(V), e.onChange(j(V));
  }, j = (N) => {
    const Q = I.formatValue(N, "candle.bar.upColor"), V = I.formatValue(N, "candle.bar.downColor"), Z = I.formatValue(N, "candle.bar.noChangeColor"), R = I.formatValue(N, "candle.bar.upBorderColor", Q), oe = I.formatValue(N, "candle.bar.downBorderColor", V), te = I.formatValue(N, "candle.bar.noChangeBorderColor", Z), A = I.formatValue(N, "candle.bar.upWickColor", Q), P = I.formatValue(N, "candle.bar.downWickColor", V), J = I.formatValue(N, "candle.bar.noChangeWickColor", Z);
    return {
      chart: {
        backgroundColor: I.formatValue(N, B1, Tn)
      },
      candle: {
        type: I.formatValue(N, "candle.type"),
        bar: {
          upColor: Q,
          downColor: V,
          noChangeColor: Z,
          upBorderColor: R,
          downBorderColor: oe,
          noChangeBorderColor: te,
          upWickColor: A,
          downWickColor: P,
          noChangeWickColor: J,
          borderUpColor: R,
          borderDownColor: oe,
          borderNoChangeColor: te,
          wickUpColor: A,
          wickDownColor: P,
          wickNoChangeColor: J
        }
      },
      grid: {
        horizontal: {
          show: !!I.formatValue(N, "grid.horizontal.show"),
          color: I.formatValue(N, "grid.horizontal.color"),
          style: I.formatValue(N, "grid.horizontal.style"),
          size: Number(I.formatValue(N, "grid.horizontal.size", 1)),
          dashedValue: I.formatValue(N, "grid.horizontal.dashedValue", [2, 2])
        },
        vertical: {
          show: !!I.formatValue(N, "grid.vertical.show"),
          color: I.formatValue(N, "grid.vertical.color"),
          style: I.formatValue(N, "grid.vertical.style"),
          size: Number(I.formatValue(N, "grid.vertical.size", 1)),
          dashedValue: I.formatValue(N, "grid.vertical.dashedValue", [2, 2])
        }
      }
    };
  }, re = () => {
    var Q;
    const N = j(n());
    r(I.clone(n())), e.onChange(N), (Q = e.onSaveChartStyle) == null || Q.call(e, N), e.onClose();
  }, ue = () => {
    var Q;
    (Q = e.onResetChartStyle) == null || Q.call(e);
    const N = e.defaultStyles;
    if (N) {
      const V = I.clone(n());
      H0.forEach((Z) => {
        Fe(V, Z.key, sy(N, Z.key, e.defaultBackgroundColor));
      }), l(V), r(I.clone(V)), e.onChange(j(V));
    } else
      e.onRestoreDefault(H0), l(I.clone(e.currentStyles));
  }, se = (N, Q = N) => {
    const V = ce(N, "#ffffff");
    return (() => {
      const Z = Vg.cloneNode(!0), R = Z.firstChild;
      return R.$$click = () => {
        E(S() === Q ? null : Q);
      }, R.style.setProperty("background", V), C(Z, (() => {
        const oe = X(() => S() === Q);
        return () => oe() && (() => {
          const te = Rg.cloneNode(!0), A = te.firstChild;
          return C(A, T(n1, {
            each: oy,
            children: (P) => (() => {
              const J = Kg.cloneNode(!0);
              return J.$$click = () => {
                W(N, P), E(null);
              }, J.style.setProperty("background", P), F(() => J.classList.toggle("selected", P.toLowerCase() === V.toLowerCase())), J;
            })()
          })), te;
        })();
      })(), null), Z;
    })();
  }, be = (N) => {
    const Q = `${N}.style`, V = `${N}.color`, Z = `${N}.size`, R = ce(Q, Re.Dashed), oe = Math.max(1, Number(ce(Z, 1)));
    return (() => {
      const te = jg.cloneNode(!0), A = te.firstChild, P = A.firstChild, J = P.firstChild;
      return C(te, T(Cn, {
        get style() {
          return {
            width: L() ? "100%" : "134px"
          };
        },
        get value() {
          return R === Re.Solid ? "Solid" : "Dashed";
        },
        dataSource: iy,
        onSelected: (pe) => {
          const fe = pe.key;
          W(Q, fe), W(`${N}.dashedValue`, fe === Re.Solid ? [] : [2, 2]);
        }
      }), A), P.$$click = () => {
        G(z() === Z ? null : Z);
      }, J.style.setProperty("height", `${oe}px`), C(A, (() => {
        const pe = X(() => z() === Z);
        return () => pe() && (() => {
          const fe = Qg.cloneNode(!0);
          return C(fe, T(n1, {
            each: ay,
            children: (De) => (() => {
              const k = Zg.cloneNode(!0), ge = k.firstChild;
              return k.$$click = () => {
                W(Z, De), G(null);
              }, k.classList.toggle("selected", oe === De), ge.style.setProperty("height", `${De}px`), k;
            })()
          })), fe;
        })();
      })(), null), C(te, () => se(V), null), te;
    })();
  }, Se = (() => {
    const N = Hg.cloneNode(!0), Q = N.firstChild, V = Q.nextSibling;
    return Q.$$click = () => U("settings"), C(Q, () => d("setting", e.locale)), V.$$click = () => U("chartStyle"), F((Z) => {
      const R = w() === "settings", oe = w() === "chartStyle";
      return R !== Z._v$ && Q.classList.toggle("active", Z._v$ = R), oe !== Z._v$2 && V.classList.toggle("active", Z._v$2 = oe), Z;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), N;
  })();
  return T(St, {
    title: Se,
    get width() {
      return w() === "chartStyle" ? 760 : 690;
    },
    get btnParentStyle() {
      return {
        display: "flex",
        "justify-content": w() === "chartStyle" ? "flex-end" : "center",
        ...w() === "chartStyle" ? {
          padding: "12px 20px 18px 20px"
        } : {}
      };
    },
    get minButtonWidth() {
      return w() === "chartStyle" ? 170 : 200;
    },
    get isMobile() {
      return L();
    },
    get buttons() {
      return X(() => w() === "settings")() ? [{
        children: d("restore_default", e.locale),
        onClick: () => {
          e.onRestoreDefault(c()), e.onClose();
        }
      }] : [{
        type: "cancel",
        class: "chart-style-action-button",
        children: "Reset",
        onClick: ue
      }, {
        class: "chart-style-action-button",
        children: "Save",
        onClick: re
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      return X(() => w() === "settings")() ? (() => {
        const N = Yg.cloneNode(!0);
        return C(N, T(n1, {
          get each() {
            return c();
          },
          children: (Q) => {
            let V;
            const Z = I.formatValue(t(), Q.key);
            switch (Q.component) {
              case "select": {
                const R = Q.key === "candle.type" ? "170px" : "120px";
                V = T(Cn, {
                  get style() {
                    return {
                      width: L() ? "100%" : R,
                      "min-width": L() ? "auto" : R
                    };
                  },
                  get value() {
                    return d(Z, e.locale);
                  },
                  get dataSource() {
                    return Q.dataSource;
                  },
                  onSelected: (oe) => {
                    const te = oe.key;
                    Y(Q, te);
                  }
                });
                break;
              }
              case "switch": {
                const R = !!Z;
                V = T(_r, {
                  open: R,
                  onChange: () => {
                    Y(Q, !R);
                  }
                });
                break;
              }
            }
            return (() => {
              const R = Z0.cloneNode(!0), oe = R.firstChild, te = oe.nextSibling;
              return C(oe, () => Q.text), C(te, V), F(() => R.classList.toggle("mobile-item", !!L())), R;
            })();
          }
        }), null), C(N, (() => {
          const Q = X(() => !!e.timezone);
          return () => Q() && (() => {
            const V = Z0.cloneNode(!0), Z = V.firstChild, R = Z.nextSibling;
            return C(Z, () => d("timezone", e.locale)), C(R, T(Cn, {
              get style() {
                return {
                  width: L() ? "100%" : "170px",
                  "min-width": L() ? "auto" : "170px"
                };
              },
              get value() {
                var oe;
                return ((oe = f()) == null ? void 0 : oe.text) ?? e.timezone.text;
              },
              get dataSource() {
                return H();
              },
              searchable: !0,
              get searchPlaceholder() {
                return d("Search Timezone", e.locale) || "Search timezone...";
              },
              onSelected: (oe) => {
                var A;
                const te = oe;
                v(te), (A = e.onTimezoneChange) == null || A.call(e, te);
              }
            })), F(() => V.classList.toggle("mobile-item", !!L())), V;
          })();
        })(), null), F(() => N.classList.toggle("mobile-layout", !!L())), N;
      })() : (() => {
        const N = Wg.cloneNode(!0), Q = N.firstChild, V = Q.firstChild, Z = V.nextSibling, R = Q.nextSibling, oe = R.firstChild;
        return V.$$click = () => ye("symbol"), Z.$$click = () => ye("background"), C(R, (() => {
          const te = X(() => K() === "symbol");
          return () => te() ? [qg.cloneNode(!0), (() => {
            const A = Gg.cloneNode(!0), P = A.firstChild, J = P.nextSibling;
            return C(J, () => se("candle.bar.upColor", "candle-stick-up"), null), C(J, () => se("candle.bar.downColor", "candle-stick-down"), null), A;
          })(), (() => {
            const A = Xg.cloneNode(!0), P = A.firstChild, J = P.nextSibling;
            return C(J, () => se("candle.bar.upBorderColor", "border-up"), null), C(J, () => se("candle.bar.downBorderColor", "border-down"), null), A;
          })(), (() => {
            const A = Jg.cloneNode(!0), P = A.firstChild, J = P.nextSibling;
            return C(J, () => se("candle.bar.upWickColor", "wick-up"), null), C(J, () => se("candle.bar.downWickColor", "wick-down"), null), A;
          })()] : [ey.cloneNode(!0), (() => {
            const A = ty.cloneNode(!0);
            return A.firstChild, C(A, () => se(B1, "chart-background"), null), A;
          })(), (() => {
            const A = ny.cloneNode(!0), P = A.firstChild, J = P.firstChild;
            return J.addEventListener("change", (pe) => W("grid.vertical.show", pe.currentTarget.checked)), C(A, () => be("grid.vertical"), null), F(() => J.checked = !!ce("grid.vertical.show")), A;
          })(), (() => {
            const A = ry.cloneNode(!0), P = A.firstChild, J = P.firstChild;
            return J.addEventListener("change", (pe) => W("grid.horizontal.show", pe.currentTarget.checked)), C(A, () => be("grid.horizontal"), null), F(() => J.checked = !!ce("grid.horizontal.show")), A;
          })()];
        })(), oe), F((te) => {
          const A = !!L(), P = K() === "symbol", J = K() === "background";
          return A !== te._v$3 && N.classList.toggle("mobile-layout", te._v$3 = A), P !== te._v$4 && V.classList.toggle("active", te._v$4 = P), J !== te._v$5 && Z.classList.toggle("active", te._v$5 = J), te;
        }, {
          _v$3: void 0,
          _v$4: void 0,
          _v$5: void 0
        }), N;
      })();
    }
  });
};
Ye(["click"]);
const cy = /* @__PURE__ */ $('<img style="width:500px;margin-top: 20px">'), uy = (e) => T(St, {
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
    const t = cy.cloneNode(!0);
    return F(() => Ie(t, "src", e.url)), t;
  }
}), dy = {
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
}, hy = /* @__PURE__ */ $('<div class="klinecharts-pro-indicator-setting-modal-content"></div>'), fy = /* @__PURE__ */ $("<span></span>"), my = (e) => {
  const [t, r] = D(I.clone(e.params.calcParams)), n = (l) => dy[l];
  return T(St, {
    get title() {
      return e.params.indicatorName;
    },
    width: 360,
    get buttons() {
      return [{
        type: "confirm",
        children: d("confirm", e.locale),
        onClick: () => {
          const l = n(e.params.indicatorName), c = [];
          I.clone(t()).forEach((m, f) => {
            !I.isValid(m) || m === "" ? "default" in l[f] && c.push(l[f].default) : c.push(m);
          }), e.onConfirm(c), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      const l = hy.cloneNode(!0);
      return C(l, () => n(e.params.indicatorName).map((c, m) => [(() => {
        const f = fy.cloneNode(!0);
        return C(f, () => d(c.paramNameKey, e.locale)), f;
      })(), T(Ei, {
        style: {
          width: "200px"
        },
        get value() {
          return t()[m] ?? "";
        },
        get precision() {
          return c.precision;
        },
        get min() {
          return c.min;
        },
        onChange: (f) => {
          const v = I.clone(t());
          v[m] = f, r(v);
        }
      })])), l;
    }
  });
}, gy = /* @__PURE__ */ $('<svg viewBox="0 0 1024 1024"><path d="M945.066667 898.133333l-189.866667-189.866666c55.466667-64 87.466667-149.333333 87.466667-241.066667 0-204.8-168.533333-373.333333-373.333334-373.333333S96 264.533333 96 469.333333 264.533333 842.666667 469.333333 842.666667c91.733333 0 174.933333-34.133333 241.066667-87.466667l189.866667 189.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c8.533333-12.8 8.533333-34.133333-2.133333-46.933334zM469.333333 778.666667C298.666667 778.666667 160 640 160 469.333333S298.666667 160 469.333333 160 778.666667 298.666667 778.666667 469.333333 640 778.666667 469.333333 778.666667z"></path></svg>'), yy = /* @__PURE__ */ $('<img alt="symbol">'), Cy = /* @__PURE__ */ $("<li><div><span></span></div></li>"), py = (e) => {
  const [t, r] = D(""), [n] = c9(t, e.datafeed.searchSymbols.bind(e.datafeed));
  return T(St, {
    get title() {
      return d("symbol_search", e.locale);
    },
    width: 460,
    get onClose() {
      return e.onClose;
    },
    get children() {
      return [T(Ei, {
        class: "klinecharts-pro-symbol-search-modal-input",
        get placeholder() {
          return d("symbol_code", e.locale);
        },
        get suffix() {
          return gy.cloneNode(!0);
        },
        get value() {
          return t();
        },
        onChange: (l) => {
          const c = `${l}`;
          r(c);
        }
      }), T(An, {
        class: "klinecharts-pro-symbol-search-modal-list",
        get loading() {
          return n.loading;
        },
        get dataSource() {
          return n() ?? [];
        },
        renderItem: (l) => (() => {
          const c = Cy.cloneNode(!0), m = c.firstChild, f = m.firstChild;
          return c.$$click = () => {
            e.onSymbolSelected(l), e.onClose();
          }, C(m, T(le, {
            get when() {
              return l.logo;
            },
            get children() {
              const v = yy.cloneNode(!0);
              return F(() => Ie(v, "src", l.logo)), v;
            }
          }), f), C(f, () => l.shortName ?? l.ticker, null), C(f, () => `${l.name ? `(${l.name})` : ""}`, null), C(c, () => l.exchange ?? "", null), F(() => Ie(f, "title", l.name ?? "")), c;
        })()
      })];
    }
  });
};
Ye(["click"]);
const vy = /* @__PURE__ */ $('<div class="klinecharts-pro-mobile-more-modal-content"><div class="item"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div><div class="item"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path></svg><span></span></div><div class="item"><svg viewBox="0 0 20 20"><rect x="3" y="4" width="14" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"></rect><path d="M6 2.5v4M14 2.5v4M3 8h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M10 11v3l2.2 1.3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg><span>Time Tools</span></div><div class="item"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg><span></span></div></div>'), by = (e) => T(St, {
  get title() {
    return d("more", e.locale);
  },
  isMobile: !0,
  get onClose() {
    return e.onClose;
  },
  get children() {
    const t = vy.cloneNode(!0), r = t.firstChild, n = r.firstChild, l = n.nextSibling, c = r.nextSibling, m = c.firstChild, f = m.nextSibling, v = c.nextSibling, L = v.nextSibling, x = L.firstChild, w = x.nextSibling;
    return r.$$click = () => {
      e.onIndicatorClick(), e.onClose();
    }, C(l, () => d("indicator", e.locale)), c.$$click = () => {
      e.onTimezoneClick(), e.onClose();
    }, C(f, () => d("timezone", e.locale)), v.$$click = () => {
      e.onTimeToolsClick(), e.onClose();
    }, L.$$click = () => {
      e.onSettingClick(), e.onClose();
    }, C(w, () => d("setting", e.locale)), t;
  }
});
Ye(["click"]);
const $y = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-picker"></div>'), _y = /* @__PURE__ */ $('<label class="klinecharts-pro-time-tools-field"><button type="button" class="klinecharts-pro-time-tools-input"><span></span><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M8 3v4M16 3v4M4 10h16"></path></svg></button></label>'), ky = /* @__PURE__ */ $("<span></span>"), xy = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-calendar"><div class="klinecharts-pro-time-tools-month"><button type="button">&lt;&lt;</button><button type="button">&lt;</button><button type="button" class="calendar-title"></button><button type="button">></button><button type="button">>></button></div></div>'), Ly = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-grid"></div>'), wy = /* @__PURE__ */ $('<span class="weekday"></span>'), Ut = /* @__PURE__ */ $('<button type="button"></button>'), Ay = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-month-grid"></div>'), Ty = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-month-grid year-grid"></div>'), Sy = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-spinners"><div class="spinner-column scrollable"></div><div class="spinner-column scrollable"></div><div class="spinner-column"></div></div>'), My = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-content"></div>'), Py = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-tabs"></div>'), Dy = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-range-panel"><div class="klinecharts-pro-time-tools-range-header"><button type="button"></button><span class="klinecharts-pro-time-tools-range-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg></span><button type="button"></button><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M8 3v4M16 3v4M4 10h16"></path></svg></div></div>'), Ny = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-panel"><div class="klinecharts-pro-time-tools-row"><div><strong>Time Anchor</strong><span>Anchor to a time on the chart when switching between intervals</span></div><button type="button"><span></span></button></div><div><div><strong>Anchor Point</strong></div><select><option value="date">Date</option><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option></select></div><div><div><strong>Anchor line</strong><span>Mark the anchored time on the chart with a vertical line</span></div><button type="button"><span></span></button></div><div><div><strong>Across Tokens</strong><span>Retain onscreen chart range when switching symbols</span></div><button type="button"><span></span></button></div></div>'), Oy = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-anchor-date"></div>'), Iy = [{
  key: "goToDate",
  label: "Go to Date"
}, {
  key: "timeRange",
  label: "Time Range"
}, {
  key: "timeAnchor",
  label: "Time Anchor"
}], Ey = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], Y0 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], t1 = (e) => String(e).padStart(2, "0"), W0 = (e, t, r) => Math.min(r, new Date(e, t + 1, 0).getDate()), ur = (e) => {
  const t = new Date(e);
  return {
    year: t.getFullYear(),
    month: t.getMonth(),
    day: t.getDate(),
    hour: t.getHours(),
    minute: t.getMinutes()
  };
}, hn = (e) => new Date(e.year, e.month, e.day, e.hour, e.minute, 0, 0).getTime(), dr = (e) => e.year * 1e4 + (e.month + 1) * 100 + e.day, xr = (e) => {
  const t = e.hour >= 12 ? "PM" : "AM", r = e.hour % 12 || 12;
  return `${t1(e.month + 1)}/${t1(e.day)}/${e.year} ${t1(r)}:${t1(e.minute)} ${t}`;
}, By = (e, t) => {
  const r = new Date(e, t, 1).getDay(), n = new Date(e, t + 1, 0).getDate(), l = new Date(e, t, 0).getDate(), c = [];
  for (let m = r - 1; m >= 0; m -= 1)
    c.push({
      date: new Date(e, t - 1, l - m),
      current: !1
    });
  for (let m = 1; m <= n; m += 1)
    c.push({
      date: new Date(e, t, m),
      current: !0
    });
  for (; c.length < 42; ) {
    const m = c[c.length - 1].date;
    c.push({
      date: new Date(m.getFullYear(), m.getMonth(), m.getDate() + 1),
      current: !1
    });
  }
  return c;
}, fn = (e) => {
  const [t, r] = D(!0), [n, l] = D("date"), [c, m] = D(e.value.year), [f, v] = D(e.value.month), L = X(() => By(c(), f())), x = X(() => Math.floor(c() / 10) * 10), w = X(() => Array.from({
    length: 12
  }, (W, j) => x() - 1 + j)), U = X(() => e.value.hour % 12 || 12), K = X(() => e.value.hour >= 12 ? "PM" : "AM"), ye = Array.from({
    length: 12
  }, (W, j) => j + 1), S = Array.from({
    length: 60
  }, (W, j) => j), E = (W) => {
    const j = new Date(c(), f() + W, 1);
    m(j.getFullYear()), v(j.getMonth());
  }, z = () => {
    n() === "date" ? l("month") : n() === "month" && l("year");
  }, G = (W) => {
    var j;
    e.onChange({
      ...e.value,
      year: W.getFullYear(),
      month: W.getMonth(),
      day: W.getDate()
    }), (j = e.onDateSelect) == null || j.call(e), m(W.getFullYear()), v(W.getMonth());
  }, B = (W) => {
    v(W), e.onChange({
      ...e.value,
      year: c(),
      month: W,
      day: W0(c(), W, e.value.day)
    }), l("date");
  }, H = (W) => {
    m(W), e.onChange({
      ...e.value,
      year: W,
      day: W0(W, e.value.month, e.value.day)
    }), l("month");
  }, Y = (W) => {
    const j = K() === "PM";
    e.onChange({
      ...e.value,
      hour: j ? W === 12 ? 12 : W + 12 : W === 12 ? 0 : W
    });
  }, ce = (W) => {
    const j = U();
    e.onChange({
      ...e.value,
      hour: W === "PM" ? j === 12 ? 12 : j + 12 : j === 12 ? 0 : j
    });
  };
  return (() => {
    const W = $y.cloneNode(!0);
    return C(W, (() => {
      const j = X(() => e.showInput !== !1);
      return () => j() && (() => {
        const re = _y.cloneNode(!0), ue = re.firstChild, se = ue.firstChild;
        return C(re, (() => {
          const be = X(() => !!e.label);
          return () => be() && (() => {
            const Se = ky.cloneNode(!0);
            return C(Se, () => e.label), Se;
          })();
        })(), ue), ue.$$click = () => r(!t()), C(se, () => xr(e.value)), re;
      })();
    })(), null), C(W, (() => {
      const j = X(() => !!t());
      return () => j() && (() => {
        const re = xy.cloneNode(!0), ue = re.firstChild, se = ue.firstChild, be = se.nextSibling, Se = be.nextSibling, N = Se.nextSibling, Q = N.nextSibling;
        return se.$$click = () => {
          n() === "year" ? m(c() - 10) : n() === "month" ? m(c() - 1) : E(-12);
        }, be.$$click = () => {
          n() === "year" ? m(c() - 10) : n() === "month" ? m(c() - 1) : E(-1);
        }, Se.$$click = z, C(Se, (() => {
          const V = X(() => n() === "year");
          return () => V() ? `${x()}-${x() + 9}` : (() => {
            const Z = X(() => n() === "month");
            return () => Z() ? c() : `${Y0[f()]} ${c()}`;
          })();
        })()), N.$$click = () => {
          n() === "year" ? m(c() + 10) : n() === "month" ? m(c() + 1) : E(1);
        }, Q.$$click = () => {
          n() === "year" ? m(c() + 10) : n() === "month" ? m(c() + 1) : E(12);
        }, C(re, (() => {
          const V = X(() => n() === "date");
          return () => V() && (() => {
            const Z = Ly.cloneNode(!0);
            return C(Z, () => Ey.map((R) => (() => {
              const oe = wy.cloneNode(!0);
              return C(oe, R), oe;
            })()), null), C(Z, () => L().map(({
              date: R,
              current: oe
            }) => {
              const te = dr({
                year: R.getFullYear(),
                month: R.getMonth(),
                day: R.getDate()
              }), A = e.range ? dr(e.range.from) : NaN, P = e.range ? dr(e.range.to) : NaN, J = Math.min(A, P), pe = Math.max(A, P), fe = Number.isFinite(J) && te >= J && te <= pe, De = Number.isFinite(J) && (te === J || te === pe), k = R.getFullYear() === e.value.year && R.getMonth() === e.value.month && R.getDate() === e.value.day;
              return (() => {
                const ge = Ut.cloneNode(!0);
                return ge.$$click = () => G(R), he(ge, `${oe ? "" : "muted"} ${fe ? "in-range" : ""} ${De || k ? "selected" : ""}`), C(ge, () => R.getDate()), ge;
              })();
            }), null), Z;
          })();
        })(), null), C(re, (() => {
          const V = X(() => n() === "month");
          return () => V() && (() => {
            const Z = Ay.cloneNode(!0);
            return C(Z, () => Y0.map((R, oe) => (() => {
              const te = Ut.cloneNode(!0);
              return te.$$click = () => B(oe), C(te, R), F(() => he(te, oe === e.value.month && c() === e.value.year ? "selected" : "")), te;
            })())), Z;
          })();
        })(), null), C(re, (() => {
          const V = X(() => n() === "year");
          return () => V() && (() => {
            const Z = Ty.cloneNode(!0);
            return C(Z, () => w().map((R) => (() => {
              const oe = Ut.cloneNode(!0);
              return oe.$$click = () => H(R), C(oe, R), F(() => he(oe, `${R < x() || R > x() + 9 ? "muted" : ""} ${R === e.value.year ? "selected" : ""}`)), oe;
            })())), Z;
          })();
        })(), null), C(re, (() => {
          const V = X(() => n() === "date");
          return () => V() && (() => {
            const Z = Sy.cloneNode(!0), R = Z.firstChild, oe = R.nextSibling, te = oe.nextSibling;
            return C(R, () => ye.map((A) => (() => {
              const P = Ut.cloneNode(!0);
              return P.$$click = () => Y(A), C(P, () => t1(A)), F(() => he(P, A === U() ? "selected" : "")), P;
            })())), C(oe, () => S.map((A) => (() => {
              const P = Ut.cloneNode(!0);
              return P.$$click = () => e.onChange({
                ...e.value,
                minute: A
              }), C(P, () => t1(A)), F(() => he(P, A === e.value.minute ? "selected" : "")), P;
            })())), C(te, () => ["AM", "PM"].map((A) => (() => {
              const P = Ut.cloneNode(!0);
              return P.$$click = () => ce(A), C(P, A), F(() => he(P, A === K() ? "selected" : "")), P;
            })())), Z;
          })();
        })(), null), re;
      })();
    })(), null), W;
  })();
}, Fy = (e) => {
  const [t, r] = D(e.initialTab ?? "goToDate"), [n, l] = D(ur(e.initialTimestamp)), [c, m] = D(ur(e.initialRange.from)), [f, v] = D(ur(e.initialRange.to)), [L, x] = D("from"), [w, U] = D({
    ...e.anchorSettings,
    anchorLine: e.anchorSettings.anchorLine ?? !0,
    acrossTokens: e.anchorSettings.acrossTokens ?? !0
  }), K = (S) => {
    U((E) => ({
      ...E,
      ...S
    }));
  }, ye = () => {
    const S = t();
    if (S === "goToDate")
      e.onGoToDate(hn(n()));
    else if (S === "timeRange") {
      const E = hn(c()), z = hn(f());
      e.onTimeRange(E <= z ? {
        from: E,
        to: z
      } : {
        from: z,
        to: E
      });
    } else {
      const E = w();
      e.onTimeAnchorChange({
        ...E,
        timestamp: E.anchorPoint === "date" ? hn(n()) : E.timestamp
      });
    }
    e.onClose();
  };
  return T(St, {
    width: 520,
    get title() {
      return (() => {
        const S = Py.cloneNode(!0);
        return C(S, () => Iy.map((E) => (() => {
          const z = Ut.cloneNode(!0);
          return z.$$click = () => r(E.key), C(z, () => E.label), F(() => he(z, t() === E.key ? "active" : "")), z;
        })())), S;
      })();
    },
    get buttons() {
      return [{
        children: "Close",
        type: "cancel",
        onClick: e.onClose
      }, {
        children: "Confirm",
        onClick: ye
      }];
    },
    get onClose() {
      return e.onClose;
    },
    minButtonWidth: 112,
    get children() {
      const S = My.cloneNode(!0);
      return C(S, (() => {
        const E = X(() => t() === "goToDate");
        return () => E() && T(fn, {
          label: "",
          get value() {
            return n();
          },
          onChange: l
        });
      })(), null), C(S, (() => {
        const E = X(() => t() === "timeRange");
        return () => E() && (() => {
          const z = Dy.cloneNode(!0), G = z.firstChild, B = G.firstChild, H = B.nextSibling, Y = H.nextSibling;
          return B.$$click = () => x("from"), C(B, () => xr(c())), Y.$$click = () => x("to"), C(Y, () => xr(f())), C(z, (() => {
            const ce = X(() => L() === "from");
            return () => ce() ? T(fn, {
              label: "Start",
              get value() {
                return c();
              },
              onChange: m,
              onDateSelect: () => x("to"),
              showInput: !1,
              get range() {
                return {
                  from: c(),
                  to: f()
                };
              }
            }) : T(fn, {
              label: "End",
              get value() {
                return f();
              },
              onChange: v,
              showInput: !1,
              get range() {
                return {
                  from: c(),
                  to: f()
                };
              }
            });
          })(), null), F((ce) => {
            const W = L() === "from" ? "active" : "", j = L() === "to" ? "active" : "";
            return W !== ce._v$ && he(B, ce._v$ = W), j !== ce._v$2 && he(Y, ce._v$2 = j), ce;
          }, {
            _v$: void 0,
            _v$2: void 0
          }), z;
        })();
      })(), null), C(S, (() => {
        const E = X(() => t() === "timeAnchor");
        return () => E() && (() => {
          const z = Ny.cloneNode(!0), G = z.firstChild, B = G.firstChild, H = B.nextSibling, Y = G.nextSibling, ce = Y.firstChild, W = ce.nextSibling, j = Y.nextSibling, re = j.firstChild, ue = re.nextSibling, se = j.nextSibling, be = se.firstChild, Se = be.nextSibling;
          return H.$$click = () => K({
            enabled: !w().enabled
          }), W.addEventListener("change", (N) => K({
            anchorPoint: N.currentTarget.value
          })), C(z, (() => {
            const N = X(() => !!(w().enabled && w().anchorPoint === "date"));
            return () => N() && (() => {
              const Q = Oy.cloneNode(!0);
              return C(Q, T(fn, {
                label: "Anchor date",
                get value() {
                  return n();
                },
                onChange: l
              })), Q;
            })();
          })(), j), ue.$$click = () => K({
            anchorLine: !w().anchorLine
          }), Se.$$click = () => K({
            acrossTokens: !w().acrossTokens
          }), F((N) => {
            const Q = `klinecharts-pro-time-tools-switch${w().enabled ? " on" : ""}`, V = `klinecharts-pro-time-tools-row${w().enabled ? "" : " disabled"}`, Z = !w().enabled, R = `klinecharts-pro-time-tools-row with-divider${w().enabled ? "" : " disabled"}`, oe = `klinecharts-pro-time-tools-switch${w().anchorLine ? " on" : ""}`, te = !w().enabled, A = `klinecharts-pro-time-tools-row with-divider${w().enabled ? "" : " disabled"}`, P = `klinecharts-pro-time-tools-switch${w().acrossTokens ? " on" : ""}`, J = !w().enabled;
            return Q !== N._v$3 && he(H, N._v$3 = Q), V !== N._v$4 && he(Y, N._v$4 = V), Z !== N._v$5 && (W.disabled = N._v$5 = Z), R !== N._v$6 && he(j, N._v$6 = R), oe !== N._v$7 && he(ue, N._v$7 = oe), te !== N._v$8 && (ue.disabled = N._v$8 = te), A !== N._v$9 && he(se, N._v$9 = A), P !== N._v$10 && he(Se, N._v$10 = P), J !== N._v$11 && (Se.disabled = N._v$11 = J), N;
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
          }), F(() => W.value = w().anchorPoint), z;
        })();
      })(), null), S;
    }
  });
};
Ye(["click"]);
const Uy = 0.08, zy = 5e-3;
function pn(e) {
  if (typeof e == "number")
    return Number.isFinite(e) ? e : null;
  if (typeof e == "string" && e.trim() !== "") {
    const t = Number(e);
    return Number.isFinite(t) ? t : null;
  }
  return null;
}
function Sn(e, t) {
  const r = pn(e);
  if (r != null) {
    t.push(r);
    return;
  }
  if (Array.isArray(e)) {
    e.forEach((n) => Sn(n, t));
    return;
  }
  e && typeof e == "object" && Object.values(e).forEach((n) => {
    Sn(n, t);
  });
}
function Vy(e, t, r) {
  const n = t - e;
  if (Number.isFinite(n) && n > 0)
    return n * r;
  const l = Math.max(Math.abs(e), Math.abs(t), 1);
  return Math.max(l * zy, Number.EPSILON);
}
function Ry({
  visibleCandles: e = [],
  visibleIndicators: t = [],
  visiblePriceLines: r = [],
  latestPrice: n,
  paddingPercent: l = Uy
}) {
  const c = [];
  e.forEach((w) => {
    const U = pn(w.high), K = pn(w.low);
    U != null && c.push(U), K != null && c.push(K);
  }), t.forEach((w) => {
    Sn(w, c);
  }), r.forEach((w) => {
    Sn(w, c);
  });
  const m = pn(n);
  if (m != null && c.push(m), c.length === 0)
    return null;
  let f = Number.POSITIVE_INFINITY, v = Number.NEGATIVE_INFINITY;
  if (c.forEach((w) => {
    f = Math.min(f, w), v = Math.max(v, w);
  }), !Number.isFinite(f) || !Number.isFinite(v))
    return null;
  const L = Math.min(Math.max(l, 0), 0.25), x = Vy(f, v, L);
  return {
    minPrice: f - x,
    maxPrice: v + x
  };
}
const Ky = (e = !0) => e !== !1, jy = /* @__PURE__ */ $('<i class="icon-close klinecharts-pro-load-icon"></i>'), Qy = /* @__PURE__ */ $('<div class="klinecharts-pro-content"><button type="button">auto</button><div class="klinecharts-pro-widget"></div></div>'), Zy = /* @__PURE__ */ $('<div class="klinecharts-pro-time-anchor-line"></div>'), Hy = /* @__PURE__ */ $('<div class="klinecharts-pro-time-navigation-tooltip"></div>'), Yy = /* @__PURE__ */ $('<div class="klinecharts-pro-mobile-candle-tooltip"></div>'), Wy = /* @__PURE__ */ $('<div class="klinecharts-pro-mobile-candle-tooltip-row"><span class="label"></span><span class="value"></span></div>'), qy = /* @__PURE__ */ $('<div class="klinecharts-pro-countdown-price-mark"><span class="klinecharts-pro-countdown-price-mark-price"></span><span class="klinecharts-pro-countdown-price-mark-timer"></span></div>'), Gy = /* @__PURE__ */ $('<div class="overlay-toolbar-color-popover"><div class="overlay-toolbar-color-grid"></div><div class="overlay-toolbar-color-footer"><button type="button" class="overlay-toolbar-add-color">+</button><div class="overlay-toolbar-color-slider"><span></span></div></div></div>'), Xy = /* @__PURE__ */ $('<div class="overlay-toolbar-dropdown width-menu"></div>'), Jy = /* @__PURE__ */ $('<div class="overlay-toolbar-dropdown style-menu"><button type="button"><span class="overlay-toolbar-style-sample solid"></span></button><button type="button"><span class="overlay-toolbar-style-sample dashed"></span></button><button type="button"><span class="overlay-toolbar-style-sample dotted"></span></button></div>'), eC = /* @__PURE__ */ $('<div class="klinecharts-pro-overlay-toolbar"><button type="button" class="overlay-toolbar-icon drag" title="Move"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="6" r="1.5"></circle><circle cx="15" cy="6" r="1.5"></circle><circle cx="9" cy="12" r="1.5"></circle><circle cx="15" cy="12" r="1.5"></circle><circle cx="9" cy="18" r="1.5"></circle><circle cx="15" cy="18" r="1.5"></circle></svg></button><button type="button" class="overlay-toolbar-icon refresh" title="Reset"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 15.4-6.36L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-15.4 6.36L3 16"></path><path d="M3 21v-5h5"></path></svg></button><div class="overlay-toolbar-picker"><button type="button" title="Color"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg></button></div><div class="overlay-toolbar-picker"><button type="button" title="Line width"><span class="overlay-toolbar-line-preview"></span><span>px</span></button></div><div class="overlay-toolbar-picker"><button type="button" title="Line style"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16"></path></svg></button></div><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2"></rect><path d="M20 4 4 20"></path></svg></button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg></button><button type="button" class="overlay-toolbar-icon delete" title="Delete"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6 18 20H6L5 6"></path><path d="M10 11v5"></path><path d="M14 11v5"></path></svg></button></div>'), tC = /* @__PURE__ */ $('<button type="button"></button>'), nC = /* @__PURE__ */ $('<button type="button"><span class="overlay-toolbar-width-sample"></span></button>'), rC = /* @__PURE__ */ $('<div class="klinecharts-pro-quick-order-marker"><button type="button" class="klinecharts-pro-quick-order-plus"></button></div>'), oC = /* @__PURE__ */ $('<span class="klinecharts-pro-quick-order-plus-icon"></span>'), iC = /* @__PURE__ */ $('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" aria-hidden="true"><path d="M460-300h40v-160h160v-40H500v-160h-40v160H300v40h160v160ZM224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h510.76q27.62 0 46.12 18.5Q800-763 800-735.38v510.76q0 27.62-18.5 46.12Q763-160 735.38-160H224.62Zm0-40h510.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-510.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69H224.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v510.76q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69ZM200-760v560-560Z"></path></svg>'), aC = /* @__PURE__ */ $('<div class="klinecharts-pro-quick-order-menu-anchor"><div class="klinecharts-pro-quick-order-menu"><button type="button">Trade <!> @ <!> Limit</button><button type="button">Trade <!> @ <!> Stop</button><button type="button">Create new order...</button><button type="button">Copy Price (<!>)</button><button type="button">Draw horizontal line on </button></div></div>');
k4();
const hr = "klinecharts_pro_chart_style", fr = "klinecharts_pro_chart_background_color", Lr = "klinecharts_pro_time_anchor_settings", e1 = "candle_pane", sC = 4, lC = /* @__PURE__ */ new Set(["rect", "circle", "straightLine", "rayLine", "segment", "arrow", "fibonacciLine", "fibonacciSegment", "fibonacciCircle", "fibonacciSpiral", "fibonacciSpeedResistanceFan", "gannBox", "priceLine", "horizontalRayLine", "horizontalSegment", "verticalRayLine", "verticalSegment"]), cC = 0.08, uC = 80, q0 = 2e-3, dC = /* @__PURE__ */ new Set(["horizontalRayLine", "horizontalSegment", "horizontalStraightLine", "orderLine", "priceLine"]);
function zi() {
  return {
    enabled: !1,
    timestamp: Date.now(),
    anchorPoint: "date",
    anchorLine: !0,
    acrossTokens: !0
  };
}
function hC() {
  try {
    const e = window.localStorage.getItem(Lr);
    if (!e)
      return null;
    const t = JSON.parse(e);
    if (t.enabled !== !0 || t.acrossTokens !== !0 || !Number.isFinite(t.timestamp))
      return null;
    const r = zi();
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
function G0(e) {
  try {
    if (!e.enabled || !e.acrossTokens) {
      window.localStorage.removeItem(Lr);
      return;
    }
    window.localStorage.setItem(Lr, JSON.stringify(e));
  } catch {
  }
}
function mn(e, t, r, n) {
  t === "VOL" && (n = {
    gap: {
      bottom: 2
    },
    ...n
  });
  const l = (e == null ? void 0 : e.createIndicator({
    name: t,
    // @ts-expect-error
    createTooltipDataSource: ({
      indicator: c,
      defaultStyles: m
    }) => {
      const f = [];
      return c.visible ? (f.push(m.tooltip.icons[1]), f.push(m.tooltip.icons[2]), f.push(m.tooltip.icons[3])) : (f.push(m.tooltip.icons[0]), f.push(m.tooltip.icons[2]), f.push(m.tooltip.icons[3])), {
        icons: f
      };
    }
  }, r, n)) ?? null;
  if (l && t === "MA")
    try {
      e == null || e.overrideIndicator({
        name: "MA",
        calcParams: [7, 25, 99]
      }, l);
    } catch {
    }
  return l;
}
function gn(e) {
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
function fC(e) {
  const t = Math.max(0, Math.ceil(e / 1e3)), r = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), l = t % 60, c = (m) => String(m).padStart(2, "0");
  return r > 0 ? `${c(r)}:${c(n)}:${c(l)}` : `${c(n)}:${c(l)}`;
}
const mC = (e) => {
  var ko, xo, Lo, wo, Ao, To, So, Mo, Po, Do, No, Oo, Io, Eo, Bo, Fo, Uo, zo, Vo, Ro, Ko, jo, Qo, Zo, Ho, Yo, Wo, qo, Go, Xo, Jo;
  let t, r, n = null, l, c = null, m = null;
  const [f, v] = D(!1), [L, x] = D(e.theme), [w, U] = D(e.styles), [K, ye] = D(e.locale), [S, E] = D(e.symbol), [z, G] = D(e.period), B = () => {
    var o, i, a, s;
    return {
      visibleMarginLeft: ((o = e.indicatorTooltipIconStyles) == null ? void 0 : o.visibleMarginLeft) ?? 7,
      secondaryMarginLeft: ((i = e.indicatorTooltipIconStyles) == null ? void 0 : i.secondaryMarginLeft) ?? 7,
      marginTop: ((a = e.indicatorTooltipIconStyles) == null ? void 0 : a.marginTop) ?? 1,
      size: ((s = e.indicatorTooltipIconStyles) == null ? void 0 : s.size) ?? 12
    };
  }, [H, Y] = D(!1), [ce, W] = D([...e.mainIndicators]), [j, re] = D({}), [ue, se] = D(!1), [be, Se] = D({
    key: e.timezone,
    text: j0(e.timezone, e.locale)
  }), [N, Q] = D(!1), [V, Z] = D(), R = () => {
    try {
      const o = window.localStorage.getItem(hr);
      if (!o)
        return;
      const i = JSON.parse(o);
      return i && typeof i == "object" ? i : void 0;
    } catch {
      return;
    }
  }, oe = (o) => {
    try {
      window.localStorage.setItem(hr, JSON.stringify(o)), window.localStorage.removeItem(fr);
    } catch {
    }
  }, te = () => {
    try {
      window.localStorage.removeItem(hr), window.localStorage.removeItem(fr);
    } catch {
    }
  }, A = () => {
    var i;
    const o = R();
    if ((i = o == null ? void 0 : o.chart) != null && i.backgroundColor)
      return o.chart.backgroundColor;
    try {
      return window.localStorage.getItem(fr) ?? void 0;
    } catch {
      return;
    }
  }, P = () => {
    const o = r == null ? void 0 : r.closest(".klinecharts-pro");
    return o && getComputedStyle(o).backgroundColor || "#171a27";
  }, J = () => t ? getComputedStyle(t).getPropertyValue("--klinecharts-pro-chart-background-color").trim() || A() || P() : A() ?? P(), pe = (o) => {
    var a;
    const i = (a = o.chart) == null ? void 0 : a.backgroundColor;
    if (!(!i || !t)) {
      if (i.toLowerCase() === P().toLowerCase()) {
        t.style.removeProperty("--klinecharts-pro-chart-background-color");
        return;
      }
      t.style.setProperty("--klinecharts-pro-chart-background-color", i);
    }
  }, fe = (o) => {
    const {
      chart: i,
      ...a
    } = o;
    return a;
  }, [De, k] = D(""), [ge, Me] = D(!1), [tt, ve] = D(Date.now()), [vt, bt] = D({
    from: Date.now() - 30 * 24 * 60 * 60 * 1e3,
    to: Date.now()
  }), [Rt, Kt] = D(hC() ?? zi()), [Mt, Fn] = D(e.drawingBarVisible), [h1, U1] = D(!1), [z1, jt] = D(!1), [Un, f1] = D(!1), Pt = ((ko = e.orderTools) == null ? void 0 : ko.quickOrder) ?? !0, [Ee, zn] = D({
    quickOrder: Pt,
    quickOrderFloatingWindow: ((xo = e.orderTools) == null ? void 0 : xo.quickOrderFloatingWindow) ?? Pt,
    quickOrderPlusButton: ((Lo = e.orderTools) == null ? void 0 : Lo.quickOrderPlusButton) ?? Pt,
    openOrders: ((wo = e.orderTools) == null ? void 0 : wo.openOrders) ?? !0,
    openOrdersExtendedPriceLine: ((Ao = e.orderTools) == null ? void 0 : Ao.openOrdersExtendedPriceLine) ?? !0,
    openOrdersDisplay: ((To = e.orderTools) == null ? void 0 : To.openOrdersDisplay) ?? "right",
    confirmAfterDrag: ((So = e.orderTools) == null ? void 0 : So.confirmAfterDrag) ?? !0,
    positions: ((Mo = e.orderTools) == null ? void 0 : Mo.positions) ?? !0,
    breakevenPrice: ((Po = e.orderTools) == null ? void 0 : Po.breakevenPrice) ?? !0,
    liquidationPrice: ((Do = e.orderTools) == null ? void 0 : Do.liquidationPrice) ?? !0,
    priceLine: ((No = e.orderTools) == null ? void 0 : No.priceLine) ?? !0,
    marketPriceLine: ((Oo = e.orderTools) == null ? void 0 : Oo.marketPriceLine) ?? !0,
    countDown: ((Io = e.orderTools) == null ? void 0 : Io.countDown) ?? !0,
    bidAskPrice: ((Eo = e.orderTools) == null ? void 0 : Eo.bidAskPrice) ?? !0,
    orderPreviewLine: ((Bo = e.orderTools) == null ? void 0 : Bo.orderPreviewLine) ?? !0,
    orderHistory: ((Fo = e.orderTools) == null ? void 0 : Fo.orderHistory) ?? !0
  }), [$t, Dt] = D(null), [Nt, nt] = D(!1), [m1, Ge] = D(!1), [g1, y1] = D(64), [Ot, _t] = D(null), [C1, p1] = D(null), [Vn, V1] = D("buy"), Rn = 6, [R1, Qt] = D(null), [v1, K1] = D(null), [b1, j1] = D(null), [Q1, It] = D(null), [Qe, Ze] = D(null), [We, He] = D(null), Kn = ["#000000", "#2b3342", "#3f4653", "#565d69", "#6f7580", "#8a9099", "#a7acb3", "#c4c8ce", "#ffffff", "#ff4d67", "#ffa629", "#f7ed4a", "#2fc58d", "#4ab09c", "#52c4d3", "#3157f6", "#6a36b8", "#a644b9", "#d83972", "#f2a3a6", "#f5c879", "#f7ee97", "#a6d29f", "#7fc9b9", "#91d7df", "#8fb2ee", "#b09ad2", "#c89ccf", "#d987ab", "#e8757a", "#efb34f", "#efe36e", "#86c17d", "#66b7a8", "#68c4d0", "#5f91e4", "#8059c9", "#aa62c2", "#d34d83", "#b9353d", "#ea8527", "#e8c245", "#4b8c43", "#2f6f60", "#47919b", "#2646c6", "#56309c", "#892f95", "#a82563", "#8e2528", "#de5c1f", "#dc8527", "#255a22", "#164b34", "#225b63", "#15309b", "#442180", "#6b1f74", "#86154e"];
  let Zt = null;
  const [$1, _1] = D({
    visible: !1,
    indicatorName: "",
    paneId: "",
    calcParams: []
  });
  let $e = /* @__PURE__ */ new Map(), k1 = /* @__PURE__ */ new Map(), lt, ft, Ht = null, kt;
  const [Xe, Z1] = D(!0), [H1, Y1] = D(null), [jn, W1] = D(null);
  let b = /* @__PURE__ */ new Map();
  const O = (o, i, a) => {
    const s = n == null ? void 0 : n.getIndicatorByPaneId(i, o);
    return {
      name: o,
      shortName: (s == null ? void 0 : s.shortName) || o,
      paneId: i,
      type: a,
      calcParams: (s == null ? void 0 : s.calcParams) || [],
      precision: (s == null ? void 0 : s.precision) ?? 4,
      visible: (s == null ? void 0 : s.visible) ?? !0,
      styles: s == null ? void 0 : s.styles,
      figures: s == null ? void 0 : s.figures
    };
  }, Pe = (o, i, a, s) => {
    if (e.onIndicatorChange)
      if (s === "add" || s === "change")
        setTimeout(() => {
          const u = O(o, i, a);
          e.onIndicatorChange({
            action: s,
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
          action: s,
          indicator: u
        });
      }
  }, Ve = () => {
    var o;
    return (o = n == null ? void 0 : n.getPaneById) == null ? void 0 : o.call(n, e1);
  }, qe = () => {
    var o, i;
    return (i = (o = Ve()) == null ? void 0 : o.getAxisComponent) == null ? void 0 : i.call(o);
  }, xt = () => {
    var s, u;
    const o = (u = (s = qe()) == null ? void 0 : s.getExtremum) == null ? void 0 : u.call(s), i = Number(o == null ? void 0 : o.min), a = Number(o == null ? void 0 : o.max);
    return !Number.isFinite(i) || !Number.isFinite(a) ? null : {
      minPrice: i,
      maxPrice: a
    };
  }, x1 = () => {
    var h, g;
    const o = ((h = n == null ? void 0 : n.getDataList) == null ? void 0 : h.call(n)) ?? [];
    if (o.length === 0)
      return null;
    const i = (g = n == null ? void 0 : n.getVisibleRange) == null ? void 0 : g.call(n), a = Number(i == null ? void 0 : i.from), s = Number(i == null ? void 0 : i.to);
    if (!Number.isFinite(a) || !Number.isFinite(s))
      return {
        from: 0,
        to: o.length - 1,
        dataList: o
      };
    const u = Math.min(a, s), y = Math.max(a, s);
    return {
      from: Math.max(0, Math.floor(u)),
      to: Math.min(o.length - 1, Math.ceil(y)),
      dataList: o
    };
  }, q1 = () => {
    const o = x1();
    return o ? o.dataList.slice(o.from, o.to + 1) : [];
  }, Vi = () => {
    const o = x1();
    if (!o || !(n != null && n.getIndicatorByPaneId))
      return [];
    const i = n.getIndicatorByPaneId(e1), a = i instanceof Map ? Array.from(i.values()) : i ? [i] : [], s = [];
    return a.forEach((u) => {
      if (!u || u.visible === !1 || u.name === "VOL" || u.series === "volume")
        return;
      const y = Array.isArray(u.figures) ? u.figures : [], h = Array.isArray(u.result) ? u.result : [];
      for (let g = o.from; g <= o.to; g += 1) {
        const p = h[g];
        p && y.forEach((_) => {
          (_ == null ? void 0 : _.key) != null && s.push(p[_.key]);
        });
      }
    }), s;
  }, Ri = () => {
    var s;
    const o = [], i = (u) => {
      var h;
      if (!u || u.visible === !1)
        return;
      const y = u.type || u.name || "";
      dC.has(y) && ((h = u.points) == null || h.forEach((g) => {
        const p = Number(g.value);
        Number.isFinite(p) && p > 0 && o.push(p);
      }));
    };
    $e.forEach(i);
    const a = C1();
    return a && i(Vr((s = n == null ? void 0 : n.getOverlayById) == null ? void 0 : s.call(n, a))), k1.forEach((u) => {
      u.forEach((y) => {
        Number.isFinite(y) && y > 0 && o.push(y);
      });
    }), o;
  }, Ki = () => {
    var u, y, h, g, p, _;
    const o = (g = (h = (y = (u = n == null ? void 0 : n.getStyles) == null ? void 0 : u.call(n)) == null ? void 0 : y.candle) == null ? void 0 : h.priceMark) == null ? void 0 : g.last;
    if (!(o != null && o.show) && !((p = o == null ? void 0 : o.line) != null && p.show) && !Ee().marketPriceLine)
      return;
    const i = ((_ = n == null ? void 0 : n.getDataList) == null ? void 0 : _.call(n)) ?? [], a = i[i.length - 1], s = Number(a == null ? void 0 : a.close);
    return Number.isFinite(s) && s > 0 ? s : void 0;
  }, ji = () => Ry({
    visibleCandles: q1(),
    visibleIndicators: Vi(),
    visiblePriceLines: Ri(),
    latestPrice: Ki(),
    paddingPercent: cC
  }), Qi = (o, i) => {
    const a = Math.max(Math.abs(i.maxPrice - i.minPrice), 1);
    return Math.abs(o.minPrice - i.minPrice) <= a * q0 && Math.abs(o.maxPrice - i.maxPrice) <= a * q0;
  }, zr = (o, i) => {
    var g, p, _, M;
    const a = qe();
    if (!n || !(a != null && a.setExtremum))
      return;
    const s = o.minPrice, u = o.maxPrice, y = ((g = a.convertToRealValue) == null ? void 0 : g.call(a, s)) ?? s, h = ((p = a.convertToRealValue) == null ? void 0 : p.call(a, u)) ?? u;
    a.setExtremum({
      min: s,
      max: u,
      range: u - s,
      realMin: y,
      realMax: h,
      realRange: h - y
    }), (_ = n.adjustPaneViewport) == null || _.call(n, !1, !0, !0, !0), i && ((M = a.setAutoCalcTickFlag) == null || M.call(a, !0)), W1(o);
  }, Zi = (o = !1) => {
    var a, s, u;
    if (!n || !Xe())
      return;
    const i = ji();
    if (!i) {
      (s = (a = qe()) == null ? void 0 : a.setAutoCalcTickFlag) == null || s.call(a, !0), (u = n.resize) == null || u.call(n), Ht = null;
      return;
    }
    !o && Ht && Qi(i, Ht) || (zr(i, !0), Ht = i, rt());
  }, _e = (o = !1) => {
    !Xe() || typeof window > "u" || (lt && window.clearTimeout(lt), lt = window.setTimeout(() => {
      lt = void 0, ft && window.cancelAnimationFrame(ft), ft = window.requestAnimationFrame(() => {
        ft = void 0, Zi(o);
      });
    }, o ? 0 : uC));
  }, G1 = () => {
    var o, i;
    Y1(null), Z1(!0), (i = (o = qe()) == null ? void 0 : o.setAutoCalcTickFlag) == null || i.call(o, !0), _e(!0);
  }, Qn = () => {
    const o = xt();
    o && (Y1(o), zr(o, !1)), Z1(!1);
  }, Hi = () => {
    Xe() ? Qn() : G1();
  }, Yi = () => {
    var g;
    const o = (g = n == null ? void 0 : n.getDom) == null ? void 0 : g.call(n, e1, Je.YAxis);
    if (!o || typeof window > "u")
      return;
    let i = !1, a = 0;
    const s = () => {
      i = !1;
    }, u = (p) => {
      var _;
      i = !0, a = "touches" in p ? ((_ = p.touches[0]) == null ? void 0 : _.clientY) ?? 0 : p.clientY;
    }, y = (p) => {
      var M;
      if (!i || !Xe())
        return;
      const _ = "touches" in p ? ((M = p.touches[0]) == null ? void 0 : M.clientY) ?? a : p.clientY;
      Math.abs(_ - a) > 2 && Qn();
    }, h = () => {
      window.setTimeout(() => G1(), 0);
    };
    return o.addEventListener("mousedown", u), o.addEventListener("touchstart", u, {
      passive: !0
    }), o.addEventListener("dblclick", h), document.addEventListener("mousemove", y), document.addEventListener("touchmove", y, {
      passive: !0
    }), document.addEventListener("mouseup", s), document.addEventListener("touchend", s), () => {
      o.removeEventListener("mousedown", u), o.removeEventListener("touchstart", u), o.removeEventListener("dblclick", h), document.removeEventListener("mousemove", y), document.removeEventListener("touchmove", y), document.removeEventListener("mouseup", s), document.removeEventListener("touchend", s);
    };
  }, L1 = (o) => ({
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
      return o.map((s) => Yt(s, i));
    const a = {};
    for (const s in o)
      if (!(s === "__proto__" || s === "constructor" || s === "prototype"))
        try {
          const u = o[s];
          if (typeof u == "function")
            continue;
          a[s] = Yt(u, i);
        } catch (u) {
          a[s] = `[Error: ${u.message}]`;
        }
    return a;
  }, Vr = (o) => {
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
        mode: o.mode || or.Normal
      };
    } catch (i) {
      return console.error("Error extracting overlay data:", i), null;
    }
  }, Et = (o) => {
    var i, a, s;
    try {
      const u = (i = n == null ? void 0 : n.getOverlayById) == null ? void 0 : i.call(n, o);
      if (!u)
        return;
      const y = Vr(u);
      if (y) {
        const h = $e.get(o), g = ((a = h == null ? void 0 : h.points) == null ? void 0 : a.length) || 0, p = ((s = y.points) == null ? void 0 : s.length) || 0;
        $e.set(o, y);
        const _ = L1(y.type);
        if (p >= _) {
          const M = b.get(o);
          M && !M.complete && (M.complete = !0, M.checkInterval && (clearInterval(M.checkInterval), M.checkInterval = void 0));
        }
      }
    } catch (u) {
      console.error(`Error updating overlay tracking for ${o}:`, u);
    }
  }, Wi = (o, i) => {
    if (b.has(o))
      return;
    const a = {
      monitoring: !0,
      complete: !1,
      lastPointCount: 0
    };
    b.set(o, a), Et(o);
    const s = () => {
      Et(o);
    };
    document.addEventListener("mouseup", s), document.addEventListener("touchend", s), setTimeout(() => {
      var y;
      const u = b.get(o);
      if (u && !u.complete) {
        u.checkInterval && clearInterval(u.checkInterval), u.mouseUpHandler && (document.removeEventListener("mouseup", u.mouseUpHandler), document.removeEventListener("touchend", u.mouseUpHandler)), Et(o);
        const h = $e.get(o);
        if (h) {
          const g = L1(h.type), p = ((y = h.points) == null ? void 0 : y.length) || 0;
          p < g && console.warn(`âš ï¸ ${h.type} ${o} has only ${p} point(s), should have ${g}`);
        }
      }
    }, 3e4);
  };
  let Bt = {
    saveDrawings: (o, i) => {
      try {
        const a = `kline_drawings_${o}`, u = {
          drawings: i.map((y) => {
            var _;
            const h = {
              ...y
            };
            h.extendData && (h.extendData = Yt(h.extendData)), h.styles && (h.styles = Yt(h.styles));
            const g = L1(y.type), p = ((_ = y.points) == null ? void 0 : _.length) || 0;
            return p < g && console.warn(`âš ï¸ Saving ${y.type} with only ${p} point(s), needs ${g}`), h;
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
          const s = JSON.parse(a), u = [];
          return Array.isArray(s.drawings) && s.drawings.forEach((y) => {
            var p;
            const h = L1(y.type);
            (((p = y.points) == null ? void 0 : p.length) || 0) >= h && u.push(y);
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
  const w1 = () => {
    const o = S();
    if (o != null && o.ticker) {
      const i = Array.from($e.values());
      Bt.saveDrawings(o.ticker, i);
    }
  }, Rr = (o) => {
    const i = b.get(o);
    i && (i.checkInterval && clearInterval(i.checkInterval), i.mouseUpHandler && (document.removeEventListener("mouseup", i.mouseUpHandler), document.removeEventListener("touchend", i.mouseUpHandler)), b.delete(o));
  }, qi = () => {
    $e.forEach((o, i) => {
      var a;
      (a = n == null ? void 0 : n.removeOverlay) == null || a.call(n, {
        id: i
      }), Rr(i);
    }), $e.clear(), b.clear(), Ze(null), He(null), w1(), _e(!0);
  }, Gi = (o) => typeof o.name == "string" && lC.has(o.name), Zn = (o, i = !1) => {
    var p, _, M;
    if (!n)
      return null;
    const a = (p = n.getDom) == null ? void 0 : p.call(n, e1, Je.Main), s = (_ = a == null ? void 0 : a.getBoundingClientRect) == null ? void 0 : _.call(a);
    if (!a || !s || i && !a.contains(o.target))
      return null;
    const u = o.clientX - s.left, y = o.clientY - s.top;
    if (u < 0 || y < 0 || u > s.width || y > s.height)
      return null;
    const h = (M = n.convertFromPixel) == null ? void 0 : M.call(n, [{
      x: u,
      y
    }], {
      paneId: e1
    }), g = Array.isArray(h) ? h[0] : h;
    return !g || !Number.isFinite(Number(g.dataIndex)) || !Number.isFinite(Number(g.value)) ? null : {
      dataIndex: Number(g.dataIndex),
      timestamp: Number(g.timestamp),
      value: Number(g.value)
    };
  }, Xi = (o) => {
    var i, a;
    (i = n == null ? void 0 : n.setScrollEnabled) == null || i.call(n, o), (a = n == null ? void 0 : n.setZoomEnabled) == null || a.call(n, o);
  }, Ji = (o) => {
    var a, s, u;
    if (o.button !== 0 || !c || m || !n || !t)
      return;
    const i = Zn(o, !0);
    i && (m = {
      overlay: c,
      startPoint: i,
      startClientX: o.clientX,
      startClientY: o.clientY,
      overlayId: null,
      pointerId: o.pointerId,
      previousScrollEnabled: (a = n.isScrollEnabled) == null ? void 0 : a.call(n),
      previousZoomEnabled: (s = n.isZoomEnabled) == null ? void 0 : s.call(n)
    }, (u = t.setPointerCapture) == null || u.call(t, o.pointerId));
  }, ea = (o) => {
    var u, y;
    const i = m;
    if (!i || i.pointerId !== o.pointerId || !n)
      return;
    const a = Zn(o);
    if (!a)
      return;
    const s = Math.hypot(o.clientX - i.startClientX, o.clientY - i.startClientY);
    if (!(!i.overlayId && s < sC)) {
      if (o.preventDefault(), o.stopPropagation(), !i.overlayId) {
        Xi(!1);
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
      }), Et(i.overlayId);
    }
  }, Hn = (o, i = !1) => {
    var s, u, y, h, g;
    const a = m;
    if (!(!a || a.pointerId !== o.pointerId)) {
      if ((s = t == null ? void 0 : t.releasePointerCapture) == null || s.call(t, o.pointerId), a.overlayId && i)
        (u = n == null ? void 0 : n.removeOverlay) == null || u.call(n, {
          id: a.overlayId
        }), Rr(a.overlayId), $e.delete(a.overlayId);
      else if (a.overlayId) {
        const p = Zn(o);
        p && ((y = n == null ? void 0 : n.overrideOverlay) == null || y.call(n, {
          id: a.overlayId,
          points: [a.startPoint, p]
        })), Et(a.overlayId), w1(), _e(!0), c = null;
      }
      a.previousScrollEnabled !== void 0 && ((h = n == null ? void 0 : n.setScrollEnabled) == null || h.call(n, a.previousScrollEnabled)), a.previousZoomEnabled !== void 0 && ((g = n == null ? void 0 : n.setZoomEnabled) == null || g.call(n, a.previousZoomEnabled)), m = null;
    }
  }, ta = (o) => {
    if (!o || !n)
      return;
    $e.forEach((a, s) => {
      var u;
      (u = n == null ? void 0 : n.removeOverlay) == null || u.call(n, {
        id: s
      });
    }), $e.clear(), b.clear(), Ze(null), He(null), Bt.loadDrawings(o).forEach((a) => {
      var s;
      try {
        const u = qt({
          name: a.type,
          points: a.points || [],
          extendData: a.extendData,
          styles: a.styles,
          visible: a.visible ?? !0,
          lock: a.lock ?? !1,
          mode: a.mode || or.Normal
        }), y = n == null ? void 0 : n.createOverlay(u), h = typeof y == "string" ? y : null;
        h && ($e.set(h, {
          ...a,
          id: h
        }), b.set(h, {
          monitoring: !1,
          complete: !0,
          lastPointCount: ((s = a.points) == null ? void 0 : s.length) || 0
        }));
      } catch (u) {
        console.error("Library: Error restoring drawing:", u);
      }
    });
  }, Yn = (o) => {
    var a, s;
    const i = {
      ...Ee(),
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
    zn(i), o.orderPreviewLine === !1 && Wn(), (s = (a = e.orderTools) == null ? void 0 : a.onChange) == null || s.call(a, i);
  }, Kr = (o) => {
    var s, u, y, h, g, p;
    if (!Ky(Ee().confirmAfterDrag))
      return;
    const i = Number((u = (s = o == null ? void 0 : o.points) == null ? void 0 : s[0]) == null ? void 0 : u.value);
    if (!Number.isFinite(i) || i <= 0)
      return;
    const a = ((y = o == null ? void 0 : o.extendData) == null ? void 0 : y.side) === "sell" || ((h = o == null ? void 0 : o.extendData) == null ? void 0 : h.side) === "buy" ? o.extendData.side : Vn();
    (p = (g = e.orderTools) == null ? void 0 : g.onOrderPreviewLineChange) == null || p.call(g, {
      price: i,
      side: a,
      symbol: S()
    });
  }, Wn = () => {
    var i;
    const o = C1();
    o && ((i = n == null ? void 0 : n.removeOverlay) == null || i.call(n, {
      id: o
    }), $e.delete(o), b.delete(o), p1(null));
  }, na = (o) => {
    var g, p;
    const i = Number(o.price);
    if (!n || !Number.isFinite(i) || i <= 0 || !Ee().orderPreviewLine) {
      Wn();
      return;
    }
    const a = o.side === "sell" ? "sell" : "buy";
    V1(a);
    const s = {
      side: a,
      label: o.label ?? "New Limit",
      showDragHint: !1,
      isOrderPreviewLine: !0
    }, u = C1();
    if (u) {
      (g = n.overrideOverlay) == null || g.call(n, {
        id: u,
        points: [{
          value: i
        }],
        extendData: s
      });
      return;
    }
    const y = (p = n.createOverlay) == null ? void 0 : p.call(n, {
      name: "orderLine",
      points: [{
        value: i
      }],
      extendData: s,
      lock: !1,
      onPressedMoving: (_) => (Kr(_.overlay), !1),
      onPressedMoveEnd: (_) => (Kr(_.overlay), !1)
    }), h = typeof y == "string" ? y : null;
    h && ($e.delete(h), b.delete(h), p1(h));
  }, X1 = (o) => {
    var a;
    const i = Math.min(Math.max(((a = S()) == null ? void 0 : a.pricePrecision) ?? 2, 0), 8);
    return o.toLocaleString(void 0, {
      minimumFractionDigits: i,
      maximumFractionDigits: i
    });
  }, ra = () => {
    G1();
  }, rt = (o = Date.now()) => {
    var it, at, st, M1, P1, e0;
    if (!n || !t || !Ee().countDown) {
      Qt(null);
      return;
    }
    n.setStyles({
      candle: {
        priceMark: {
          last: {
            show: !0,
            line: {
              show: Ee().marketPriceLine
            },
            text: {
              show: !1
            }
          }
        }
      }
    });
    const i = ((it = n.getDataList) == null ? void 0 : it.call(n)) ?? [], a = i[i.length - 1], s = Number(a == null ? void 0 : a.close);
    if (!a || !Number.isFinite(s) || s <= 0) {
      Qt(null);
      return;
    }
    const u = (at = n.convertToPixel) == null ? void 0 : at.call(n, [{
      value: s
    }], {
      paneId: "candle_pane",
      absolute: !0
    }), y = Number((st = u == null ? void 0 : u[0]) == null ? void 0 : st.y), h = (M1 = n.getSize) == null ? void 0 : M1.call(n, "candle_pane"), g = (h == null ? void 0 : h.height) ?? t.clientHeight;
    if (!Number.isFinite(y) || y < 0 || y > g) {
      Qt(null);
      return;
    }
    const p = Math.min(Math.max(((P1 = S()) == null ? void 0 : P1.pricePrecision) ?? 2, 0), 8), _ = s.toLocaleString(void 0, {
      minimumFractionDigits: p,
      maximumFractionDigits: p
    }), M = (e0 = n.getSize) == null ? void 0 : e0.call(n, "candle_pane", Je.YAxis), ee = M != null && M.width && Number.isFinite(M.width) ? Math.max(74, Math.floor(M.width) - 2) : 96, ie = gn(z()), ae = o % ie, me = ae === 0 ? ie : ie - ae, q = Number(a.close), xe = Number(a.open), Le = n.getStyles().candle.priceMark.last, Ne = Le.text, ne = Number(Ne.size) || 12, we = Number(Ne.paddingTop) || 2, Ce = Number(Ne.paddingBottom) || 2, Oe = Math.min(Number(Ne.paddingLeft) || 4, 3), Be = Math.min(Number(Ne.paddingRight) || 4, 3), ot = Math.max(34, ne * 2 + we + Ce + 6), ct = Math.max(0, Math.min(y - ot / 2, g - ot));
    Qt({
      top: ct,
      width: Math.min(ee, Math.max(62, _.length * (ne * 0.56) + Oe + Be + 4)),
      priceText: _,
      text: fC(me),
      color: Number.isFinite(q) && Number.isFinite(xe) && q < xe ? Le.downColor : Le.upColor,
      textSize: ne,
      textFamily: Ne.family,
      textWeight: Ne.weight,
      paddingLeft: Oe,
      paddingRight: Be,
      paddingTop: we,
      paddingBottom: Ce,
      borderRadius: Number(Ne.borderRadius) || 2
    });
  }, oa = (o) => {
    var a, s;
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
      }), y = Number((s = u == null ? void 0 : u[0]) == null ? void 0 : s.value);
      if (Number.isFinite(y) && y > 0)
        return y;
    } catch {
    }
    return NaN;
  }, jr = (o) => {
    var y;
    if (!Ee().quickOrderPlusButton || (o == null ? void 0 : o.paneId) !== "candle_pane" || !t) {
      if (m1() || Nt())
        return;
      Dt(null), nt(!1);
      return;
    }
    const i = (y = n == null ? void 0 : n.getSize) == null ? void 0 : y.call(n, "candle_pane", Je.YAxis);
    i != null && i.width && Number.isFinite(i.width) && y1(Math.max(44, Math.ceil(i.width)));
    const a = Number(o.y), s = oa(o), u = t.clientHeight;
    if (!Number.isFinite(a) || !Number.isFinite(s) || s <= 0 || a < 0 || a > u) {
      if (m1() || Nt())
        return;
      Dt(null), nt(!1);
      return;
    }
    Zt = {
      ...o
    }, Dt({
      y: a,
      price: s
    });
  }, Wt = () => {
    var o;
    if (Zt)
      try {
        (o = n == null ? void 0 : n.executeAction) == null || o.call(n, mt.OnCrosshairChange, Zt);
      } catch {
      }
  }, qn = (o) => {
    var a, s;
    const i = Ot() ?? $t();
    i && ((s = (a = e.orderTools) == null ? void 0 : a.onQuickOrderAction) == null || s.call(a, {
      action: o,
      price: i.price,
      symbol: S()
    }), nt(!1), _t(null), Ge(!1));
  }, ia = async () => {
    var i;
    const o = Ot() ?? $t();
    if (o) {
      try {
        await ((i = navigator.clipboard) == null ? void 0 : i.writeText(String(o.price)));
      } catch {
      }
      nt(!1), _t(null), Ge(!1);
    }
  }, aa = () => {
    const o = Ot() ?? $t();
    o && (n == null || n.createOverlay(qt({
      name: "horizontalStraightLine",
      points: [{
        value: o.price
      }],
      lock: !1
    })), nt(!1), _t(null), Ge(!1));
  }, sa = (o) => {
    var g, p, _, M, ee, ie;
    const i = (p = (g = t == null ? void 0 : t.parentElement) == null ? void 0 : g.getBoundingClientRect) == null ? void 0 : p.call(g), a = (_ = t == null ? void 0 : t.getBoundingClientRect) == null ? void 0 : _.call(t), s = o == null ? void 0 : o.overlay, u = (M = s == null ? void 0 : s.points) == null ? void 0 : M[0];
    let y = 72, h = 40;
    if (i) {
      if (Number.isFinite(o == null ? void 0 : o.pageX) ? y = o.pageX - i.left : Number.isFinite(o == null ? void 0 : o.x) && a && (y = a.left - i.left + o.x), Number.isFinite(o == null ? void 0 : o.pageY))
        h = o.pageY - i.top;
      else if (Number.isFinite(o == null ? void 0 : o.y) && a)
        h = a.top - i.top + o.y;
      else if (Number.isFinite(u == null ? void 0 : u.value))
        try {
          const ae = (ee = n == null ? void 0 : n.convertToPixel) == null ? void 0 : ee.call(n, [{
            value: u.value
          }], {
            paneId: "candle_pane",
            absolute: !0
          }), me = Number((ie = ae == null ? void 0 : ae[0]) == null ? void 0 : ie.y);
          Number.isFinite(me) && (h = me - i.top);
        } catch {
        }
    }
    return {
      x: Math.max(12, Math.min(y - 28, ((i == null ? void 0 : i.width) ?? 360) - 320)),
      y: Math.max(8, h - 52)
    };
  }, Gn = (o) => {
    var g, p, _, M, ee, ie, ae, me;
    const i = o == null ? void 0 : o.overlay;
    if (!(i != null && i.id) || i.name !== "horizontalStraightLine")
      return !1;
    const a = sa(o), s = Number((p = (g = i.styles) == null ? void 0 : g.line) == null ? void 0 : p.size) || 2, u = ((M = (_ = i.styles) == null ? void 0 : _.line) == null ? void 0 : M.style) ?? Re.Solid, y = Array.isArray((ie = (ee = i.styles) == null ? void 0 : ee.line) == null ? void 0 : ie.dashedValue) ? i.styles.line.dashedValue : [], h = ((me = (ae = i.styles) == null ? void 0 : ae.line) == null ? void 0 : me.color) ?? "#2f6df6";
    return Ze({
      id: i.id,
      x: a.x,
      y: a.y,
      lineSize: s,
      lineStyle: u,
      dashedValue: y,
      color: h,
      locked: i.lock ?? !1,
      visible: i.visible ?? !0
    }), !1;
  }, Qr = (o) => {
    var a, s;
    const i = (a = o == null ? void 0 : o.overlay) == null ? void 0 : a.id;
    return (!i || ((s = Qe()) == null ? void 0 : s.id) === i) && (Ze(null), He(null)), !1;
  }, qt = (o) => {
    var h, g, p, _, M, ee, ie, ae, me;
    if (o.name !== "horizontalStraightLine")
      return o;
    const i = o.onClick, a = o.onSelected, s = o.onDeselected, u = o.onRemoved, y = o.onPressedMoveEnd;
    return {
      ...o,
      styles: {
        ...o.styles,
        line: {
          ...(h = o.styles) == null ? void 0 : h.line,
          size: Number((p = (g = o.styles) == null ? void 0 : g.line) == null ? void 0 : p.size) || 2,
          style: ((M = (_ = o.styles) == null ? void 0 : _.line) == null ? void 0 : M.style) ?? Re.Solid,
          dashedValue: ((ie = (ee = o.styles) == null ? void 0 : ee.line) == null ? void 0 : ie.dashedValue) ?? [6, 4],
          color: ((me = (ae = o.styles) == null ? void 0 : ae.line) == null ? void 0 : me.color) ?? "#2f6df6"
        }
      },
      onClick: (q) => (Gn(q), (i == null ? void 0 : i(q)) ?? !1),
      onSelected: (q) => (Gn(q), (a == null ? void 0 : a(q)) ?? !1),
      onPressedMoveEnd: (q) => (Gn(q), (y == null ? void 0 : y(q)) ?? !1),
      onDeselected: (q) => (Qr(q), (s == null ? void 0 : s(q)) ?? !1),
      onRemoved: (q) => (Qr(q), (u == null ? void 0 : u(q)) ?? !1)
    };
  }, la = () => {
    var i;
    const o = Qe();
    o && ((i = n == null ? void 0 : n.removeOverlay) == null || i.call(n, {
      id: o.id
    }), Ze(null), He(null));
  }, Gt = (o) => {
    var a;
    const i = Qe();
    i && ((a = n == null ? void 0 : n.overrideOverlay) == null || a.call(n, {
      id: i.id,
      ...o
    }), setTimeout(() => {
      Et(i.id), w1();
    }, 0));
  }, ca = () => {
    const o = Qe();
    if (!o)
      return;
    const i = !o.locked;
    Gt({
      lock: i
    }), Ze({
      ...o,
      locked: i
    });
  }, ua = () => {
    const o = Qe();
    if (!o)
      return;
    const i = !o.visible;
    Gt({
      visible: i
    }), Ze({
      ...o,
      visible: i
    });
  }, da = (o) => {
    const i = Qe();
    i && (Gt({
      styles: {
        line: {
          size: o
        }
      }
    }), Ze({
      ...i,
      lineSize: o
    }), He(null));
  }, Xn = (o, i) => {
    const a = Qe();
    a && (Gt({
      styles: {
        line: {
          style: o,
          dashedValue: i
        }
      }
    }), Ze({
      ...a,
      lineStyle: o,
      dashedValue: i
    }), He(null));
  }, ha = () => {
    const o = Qe();
    if (!o)
      return;
    const i = 1, a = Re.Solid, s = [6, 4], u = "#2f6df6";
    Gt({
      styles: {
        line: {
          size: i,
          style: a,
          dashedValue: s,
          color: u
        }
      }
    }), Ze({
      ...o,
      lineSize: i,
      lineStyle: a,
      dashedValue: s,
      color: u
    }), He(null);
  }, fa = (o) => {
    const i = Qe();
    i && (Gt({
      styles: {
        line: {
          color: o
        }
      }
    }), Ze({
      ...i,
      color: o
    }));
  }, ma = (o) => {
    var _, M;
    const i = Qe();
    if (!i || !t)
      return;
    o.preventDefault(), o.stopPropagation(), He(null);
    const a = (M = (_ = t.parentElement) == null ? void 0 : _.getBoundingClientRect) == null ? void 0 : M.call(_);
    if (!a)
      return;
    const s = o.clientX, u = o.clientY, y = i.x, h = i.y, g = (ee) => {
      ee.preventDefault();
      const ie = y + ee.clientX - s, ae = h + ee.clientY - u;
      Ze({
        ...i,
        x: Math.max(8, Math.min(ie, a.width - 320)),
        y: Math.max(8, Math.min(ae, a.height - 48))
      });
    }, p = () => {
      document.removeEventListener("mousemove", g), document.removeEventListener("mouseup", p);
    };
    document.addEventListener("mousemove", g), document.addEventListener("mouseup", p);
  }, ga = () => {
    nt(!1), _t(null), Ge(!1);
  }, Zr = (o) => {
    var a, s;
    if (!Nt())
      return;
    const i = o.target;
    (a = i == null ? void 0 : i.closest) != null && a.call(i, ".klinecharts-pro-quick-order-marker") || (s = i == null ? void 0 : i.closest) != null && s.call(i, ".klinecharts-pro-quick-order-menu-anchor") || ga();
  };
  let Hr = (Uo = e.orderTools) == null ? void 0 : Uo.quickOrder, Yr = (zo = e.orderTools) == null ? void 0 : zo.quickOrderFloatingWindow, Wr = (Vo = e.orderTools) == null ? void 0 : Vo.quickOrderPlusButton, qr = (Ro = e.orderTools) == null ? void 0 : Ro.openOrders, Gr = (Ko = e.orderTools) == null ? void 0 : Ko.openOrdersExtendedPriceLine, Xr = (jo = e.orderTools) == null ? void 0 : jo.openOrdersDisplay, Jr = (Qo = e.orderTools) == null ? void 0 : Qo.confirmAfterDrag, eo = (Zo = e.orderTools) == null ? void 0 : Zo.positions, to = (Ho = e.orderTools) == null ? void 0 : Ho.breakevenPrice, no = (Yo = e.orderTools) == null ? void 0 : Yo.liquidationPrice, ro = (Wo = e.orderTools) == null ? void 0 : Wo.priceLine, oo = (qo = e.orderTools) == null ? void 0 : qo.marketPriceLine, io = (Go = e.orderTools) == null ? void 0 : Go.countDown, ao = (Xo = e.orderTools) == null ? void 0 : Xo.bidAskPrice, so = (Jo = e.orderTools) == null ? void 0 : Jo.orderHistory;
  Ke(() => {
    var xe, Le, Ne, ne, we, Ce, Oe, Be, ot, ct, it, at, st, M1, P1;
    const o = (xe = e.orderTools) == null ? void 0 : xe.quickOrder, i = (Le = e.orderTools) == null ? void 0 : Le.quickOrderFloatingWindow, a = (Ne = e.orderTools) == null ? void 0 : Ne.quickOrderPlusButton, s = (ne = e.orderTools) == null ? void 0 : ne.openOrders, u = (we = e.orderTools) == null ? void 0 : we.openOrdersExtendedPriceLine, y = (Ce = e.orderTools) == null ? void 0 : Ce.openOrdersDisplay, h = (Oe = e.orderTools) == null ? void 0 : Oe.confirmAfterDrag, g = (Be = e.orderTools) == null ? void 0 : Be.positions, p = (ot = e.orderTools) == null ? void 0 : ot.breakevenPrice, _ = (ct = e.orderTools) == null ? void 0 : ct.liquidationPrice, M = (it = e.orderTools) == null ? void 0 : it.priceLine, ee = (at = e.orderTools) == null ? void 0 : at.marketPriceLine, ie = (st = e.orderTools) == null ? void 0 : st.countDown, ae = (M1 = e.orderTools) == null ? void 0 : M1.bidAskPrice, me = (P1 = e.orderTools) == null ? void 0 : P1.orderHistory, q = {};
    typeof o == "boolean" && o !== Hr && (Hr = o, q.quickOrder = o, typeof i != "boolean" && (q.quickOrderFloatingWindow = o), typeof a != "boolean" && (q.quickOrderPlusButton = o)), typeof i == "boolean" && i !== Yr && (Yr = i, q.quickOrderFloatingWindow = i), typeof a == "boolean" && a !== Wr && (Wr = a, q.quickOrderPlusButton = a), typeof s == "boolean" && s !== qr && (qr = s, q.openOrders = s), typeof u == "boolean" && u !== Gr && (Gr = u, q.openOrdersExtendedPriceLine = u), y !== void 0 && y !== Xr && (Xr = y, q.openOrdersDisplay = y), typeof h == "boolean" && h !== Jr && (Jr = h, q.confirmAfterDrag = h), typeof g == "boolean" && g !== eo && (eo = g, q.positions = g), typeof p == "boolean" && p !== to && (to = p, q.breakevenPrice = p), typeof _ == "boolean" && _ !== no && (no = _, q.liquidationPrice = _), typeof M == "boolean" && M !== ro && (ro = M, q.priceLine = M, typeof ee != "boolean" && (q.marketPriceLine = M), typeof ie != "boolean" && (q.countDown = M), typeof ae != "boolean" && (q.bidAskPrice = M)), typeof ee == "boolean" && ee !== oo && (oo = ee, q.marketPriceLine = ee), typeof ie == "boolean" && ie !== io && (io = ie, q.countDown = ie), typeof ae == "boolean" && ae !== ao && (ao = ae, q.bidAskPrice = ae), typeof me == "boolean" && me !== so && (so = me, q.orderHistory = me), Object.keys(q).length > 0 && Yn(q);
  }), Ke(() => {
    Ee().marketPriceLine, Ee().countDown, z(), S(), n == null || n.setStyles({
      candle: {
        priceMark: {
          last: {
            show: !0,
            line: {
              show: Ee().marketPriceLine
            },
            text: {
              show: !Ee().countDown
            }
          }
        }
      }
    }), _e(!0), rt();
  }), e.ref({
    setTheme: x,
    getTheme: () => L(),
    setStyles: U,
    getStyles: () => n.getStyles(),
    setLocale: ye,
    getLocale: () => K(),
    setTimezone: (o) => {
      Se({
        key: o,
        text: j0(o, K())
      });
    },
    getTimezone: () => be().key,
    setSymbol: E,
    getSymbol: () => S(),
    setPeriod: G,
    getPeriod: () => z(),
    getMainIndicators: () => ce(),
    getSubIndicators: () => j(),
    setMainIndicators: W,
    setSubIndicators: re,
    overrideIndicator: (o, i) => {
      n == null || n.overrideIndicator(o, i), _e(!0);
    },
    createOverlay: (o) => {
      var a;
      const i = (a = n == null ? void 0 : n.createOverlay) == null ? void 0 : a.call(n, qt(o));
      return typeof i == "string" ? (_e(!0), i) : null;
    },
    removeOverlay: (o) => {
      var i;
      if ((i = n == null ? void 0 : n.removeOverlay) == null || i.call(n, o), o.id) {
        $e.delete(o.id);
        const a = b.get(o.id);
        a && (a.checkInterval && clearInterval(a.checkInterval), a.mouseUpHandler && (document.removeEventListener("mouseup", a.mouseUpHandler), document.removeEventListener("touchend", a.mouseUpHandler)), b.delete(o.id)), w1();
      }
      _e(!0);
    },
    removeAllOverlay: () => {
      $e.forEach((o, i) => {
        var s;
        (s = n == null ? void 0 : n.removeOverlay) == null || s.call(n, {
          id: i
        });
        const a = b.get(i);
        a && (a.checkInterval && clearInterval(a.checkInterval), a.mouseUpHandler && (document.removeEventListener("mouseup", a.mouseUpHandler), document.removeEventListener("touchend", a.mouseUpHandler)));
      }), $e.clear(), b.clear(), _e(!0);
    },
    getAllOverlay: () => Array.from($e.values()),
    getOverlay: (o) => $e.get(o) || null,
    overrideOverlay: (o) => {
      n && "overrideOverlay" in n && typeof n.overrideOverlay == "function" ? (n.overrideOverlay(o), _e(!0)) : console.warn("overrideOverlay method not available on widget");
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
    setTimezoneModalVisible: se,
    setSettingModalVisible: Q,
    setTimeToolsModalVisible: (o) => {
      o && ve(Date.now()), Me(o);
    },
    getOrderToolsState: () => Ee(),
    setOrderToolsState: (o) => {
      Yn(o);
    },
    setOrderPreviewLine: na,
    clearOrderPreviewLine: Wn,
    dispose: () => {
      t && t0(t);
    },
    resize: () => {
      n && "resize" in n && typeof n.resize == "function" ? n.resize() : console.warn("resize method not available on widget");
    },
    getSettings: () => {
      var a, s, u, y, h, g, p, _, M, ee, ie, ae, me, q, xe, Le;
      if (!n)
        return {};
      const o = n.getStyles(), i = (a = o.candle) == null ? void 0 : a.bar;
      return {
        // Candle settings
        candleType: (s = o.candle) == null ? void 0 : s.type,
        candleBarStyle: i == null ? void 0 : i.style,
        // bar.style might be LineType
        showLastPrice: (h = (y = (u = o.candle) == null ? void 0 : u.priceMark) == null ? void 0 : y.last) == null ? void 0 : h.show,
        showHighestPrice: (_ = (p = (g = o.candle) == null ? void 0 : g.priceMark) == null ? void 0 : p.high) == null ? void 0 : _.show,
        showLowestPrice: (ie = (ee = (M = o.candle) == null ? void 0 : M.priceMark) == null ? void 0 : ee.low) == null ? void 0 : ie.show,
        // Indicator settings
        showIndicatorLastValue: (me = (ae = o.indicator) == null ? void 0 : ae.lastValueMark) == null ? void 0 : me.show,
        // Axis settings - yAxis.reverse is boolean according to YAxisStyle interface
        priceAxisType: (q = o.yAxis) == null ? void 0 : q.type,
        reverseCoordinate: (xe = o.yAxis) == null ? void 0 : xe.reverse,
        // Grid settings
        showGrids: (Le = o.grid) == null ? void 0 : Le.show,
        timezone: be().key,
        timestamp: Date.now()
      };
    },
    setSettings: (o) => {
      var a, s, u, y, h, g, p, _, M, ee, ie, ae, me, q;
      if (!n)
        return;
      const i = {};
      if (o.candleType !== void 0 && (i.candle = {
        ...i.candle,
        type: o.candleType
      }), o.candleBarStyle !== void 0) {
        const xe = ((a = i.candle) == null ? void 0 : a.bar) || {};
        i.candle = {
          ...i.candle,
          bar: {
            ...xe,
            style: o.candleBarStyle
          }
          // Use any since ChangeColor doesn't have style
        };
      }
      o.showLastPrice !== void 0 && (i.candle = {
        ...i.candle,
        priceMark: {
          ...(s = i.candle) == null ? void 0 : s.priceMark,
          last: {
            ...(y = (u = i.candle) == null ? void 0 : u.priceMark) == null ? void 0 : y.last,
            show: o.showLastPrice,
            text: {
              ...(p = (g = (h = i.candle) == null ? void 0 : h.priceMark) == null ? void 0 : g.last) == null ? void 0 : p.text,
              show: o.showLastPrice && !Ee().countDown
            }
          }
        }
      }), o.showHighestPrice !== void 0 && (i.candle = {
        ...i.candle,
        priceMark: {
          ...(_ = i.candle) == null ? void 0 : _.priceMark,
          high: {
            ...(ee = (M = i.candle) == null ? void 0 : M.priceMark) == null ? void 0 : ee.high,
            show: o.showHighestPrice
          }
        }
      }), o.showLowestPrice !== void 0 && (i.candle = {
        ...i.candle,
        priceMark: {
          ...(ie = i.candle) == null ? void 0 : ie.priceMark,
          low: {
            ...(me = (ae = i.candle) == null ? void 0 : ae.priceMark) == null ? void 0 : me.low,
            show: o.showLowestPrice
          }
        }
      }), o.showIndicatorLastValue !== void 0 && (i.indicator = {
        ...i.indicator,
        lastValueMark: {
          ...(q = i.indicator) == null ? void 0 : q.lastValueMark,
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
      }), wt(i), n.setStyles(i);
    },
    resetSettings: () => {
      var a, s, u, y, h, g, p;
      if (!n)
        return;
      n.getStyles();
      const o = {
        candle: {
          type: Ua.CandleSolid,
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
          type: za.Normal,
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
      }, i = V();
      if (i) {
        const _ = {
          candle: {
            type: (a = i.candle) == null ? void 0 : a.type,
            bar: (s = i.candle) == null ? void 0 : s.bar,
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
            show: (p = i.grid) == null ? void 0 : p.show
          }
        };
        wt(_), n.setStyles(_);
      } else
        wt(o), n.setStyles(o);
    },
    autoScalePriceAxis: () => {
      ra();
    },
    setAutoScaleEnabled: (o) => {
      o ? G1() : Qn();
    },
    getAutoScaleEnabled: () => Xe(),
    getCurrentPriceRange: () => jn() ?? xt(),
    getManualPriceRange: () => H1(),
    setAutoScalePriceLines: (o, i = []) => {
      const a = `${o || "default"}`, s = i.filter((u) => Number.isFinite(u) && u > 0);
      s.length > 0 ? k1.set(a, s) : k1.delete(a), _e(!0);
    },
    // === Drawing Methods ===
    saveDrawings: (o) => {
      const i = Array.from($e.values());
      i.forEach((a, s) => {
        var h;
        const u = L1(a.type), y = ((h = a.points) == null ? void 0 : h.length) || 0;
        y < u && console.warn(`âš ï¸ ${a.type} ${a.id} has only ${y} point(s), should have ${u}`);
      }), Bt.saveDrawings(o, i);
    },
    loadDrawings: (o) => {
      Bt.loadDrawings(o).forEach((a, s) => {
        var u;
        try {
          const y = {
            name: a.type,
            points: a.points || [],
            extendData: a.extendData,
            styles: a.styles,
            visible: a.visible ?? !0,
            lock: a.lock ?? !1,
            mode: a.mode ?? or.Normal
          }, h = n == null ? void 0 : n.createOverlay(y), g = typeof h == "string" ? h : null;
          g && ($e.set(g, {
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
    getDrawings: (o) => Bt.loadDrawings(o),
    clearDrawings: (o) => {
      Bt.clearDrawings(o);
    },
    // Auto-save on overlay events
    enableAutoSave: (o, i = !0) => {
    }
  });
  const lo = () => {
    n == null || n.resize(), S1(), on() || T1(), _e(!0), rt(), mo(), Lt();
  };
  let J1, Jn = !1, en, tn, A1 = !1, co = 0;
  const ya = () => {
    if (A1 || Date.now() < co)
      return;
    const o = Rt();
    if (!o.enabled || o.anchorPoint === "date")
      return;
    const i = yo(o.anchorPoint, o.timestamp);
    if (Number.isFinite(i) && i !== o.timestamp) {
      const a = {
        ...o,
        timestamp: i
      };
      Kt(a), G0(a);
    }
  }, Ca = () => {
    tn && window.clearTimeout(tn), tn = window.setTimeout(() => {
      tn = void 0, ya();
    }, 80);
  }, uo = () => {
    _e(), rt(), mo(), Lt(), Ca();
  }, ho = [mt.OnVisibleRangeChange, mt.OnZoom, mt.OnScroll], pa = (o) => {
    const i = new Date(o), a = i.getFullYear(), s = `${i.getMonth() + 1}`.padStart(2, "0"), u = `${i.getDate()}`.padStart(2, "0"), y = `${i.getHours()}`.padStart(2, "0"), h = `${i.getMinutes()}`.padStart(2, "0");
    return `${a}/${s}/${u} ${y}:${h}`;
  }, va = (o) => {
    var h;
    const i = ((h = n == null ? void 0 : n.getDataList) == null ? void 0 : h.call(n)) ?? [];
    if (i.length === 0)
      return null;
    let a = i[0], s = 0, u = Number(a == null ? void 0 : a.timestamp), y = Math.abs(u - o);
    for (let g = 1; g < i.length; g += 1) {
      const p = i[g], _ = Number(p == null ? void 0 : p.timestamp);
      if (!Number.isFinite(_))
        continue;
      const M = Math.abs(_ - o);
      M < y && (a = p, s = g, u = _, y = M);
    }
    return a && Number.isFinite(u) ? {
      candle: a,
      dataIndex: s
    } : null;
  }, ba = (o) => {
    var a;
    const i = ((a = n == null ? void 0 : n.getDataList) == null ? void 0 : a.call(n)) ?? [];
    if (i.length === 0 || !Number.isFinite(o))
      return null;
    for (let s = 0; s < i.length; s += 1) {
      const u = i[s];
      if (Number(u == null ? void 0 : u.timestamp) === o)
        return {
          candle: u,
          dataIndex: s
        };
    }
    return null;
  }, nn = (o) => {
    var a;
    const i = ((a = n == null ? void 0 : n.getDataList) == null ? void 0 : a.call(n)) ?? [];
    return i.length === 0 || !Number.isFinite(o) || o < 0 ? -1 : Math.max(0, Math.min(i.length - 1, o + 1));
  }, fo = (o) => {
    var ie, ae, me;
    if (!n || !t)
      return null;
    const i = va(o), a = i == null ? void 0 : i.candle, s = Number((a == null ? void 0 : a.timestamp) ?? o), u = Number((a == null ? void 0 : a.high) ?? (a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.open)), y = i ? nn(i.dataIndex) : void 0, h = i && Number.isFinite(u) ? {
      dataIndex: y,
      value: u
    } : {
      timestamp: s
    }, g = (ie = n.convertToPixel) == null ? void 0 : ie.call(n, [h], {
      paneId: "candle_pane",
      absolute: !0
    }), p = Number((ae = g == null ? void 0 : g[0]) == null ? void 0 : ae.x), _ = Number((me = g == null ? void 0 : g[0]) == null ? void 0 : me.y), M = t.clientWidth, ee = t.clientHeight;
    return !Number.isFinite(p) || p < -80 || p > M + 80 ? null : {
      timestamp: s,
      text: pa(s),
      left: Math.max(58, Math.min(p, M - 58)),
      top: Number.isFinite(_) ? Math.max(8, Math.min(_ - 42, ee - 38)) : 10
    };
  }, mo = () => {
    const o = v1();
    if (!o || !n || !t)
      return;
    const i = fo(o.timestamp);
    i && K1(i);
  }, rn = (o, i = 0) => {
    if (!n || !t)
      return;
    const a = fo(o);
    if (a) {
      K1(a);
      return;
    }
    i < 6 && (en = window.setTimeout(() => rn(o, i + 1), 80));
  }, er = (o, i, a) => {
    let s = i, u = s;
    switch (o.timespan) {
      case "minute": {
        s = s - s % (60 * 1e3), u = s - a * o.multiplier * 60 * 1e3;
        break;
      }
      case "hour": {
        s = s - s % (60 * 60 * 1e3), u = s - a * o.multiplier * 60 * 60 * 1e3;
        break;
      }
      case "day": {
        s = s - s % (60 * 60 * 1e3), u = s - a * o.multiplier * 24 * 60 * 60 * 1e3;
        break;
      }
      case "week": {
        const h = new Date(s).getDay(), g = h === 0 ? 6 : h - 1;
        s = s - g * 60 * 60 * 24;
        const p = new Date(s);
        s = (/* @__PURE__ */ new Date(`${p.getFullYear()}-${p.getMonth() + 1}-${p.getDate()}`)).getTime(), u = a * o.multiplier * 7 * 24 * 60 * 60 * 1e3;
        break;
      }
      case "month": {
        const y = new Date(s), h = y.getFullYear(), g = y.getMonth() + 1;
        s = (/* @__PURE__ */ new Date(`${h}-${g}-01`)).getTime(), u = a * o.multiplier * 30 * 24 * 60 * 60 * 1e3;
        const p = new Date(u);
        u = (/* @__PURE__ */ new Date(`${p.getFullYear()}-${p.getMonth() + 1}-01`)).getTime();
        break;
      }
      case "year": {
        const h = new Date(s).getFullYear();
        s = (/* @__PURE__ */ new Date(`${h}-01-01`)).getTime(), u = a * o.multiplier * 365 * 24 * 60 * 60 * 1e3;
        const g = new Date(u);
        u = (/* @__PURE__ */ new Date(`${g.getFullYear()}-01-01`)).getTime();
        break;
      }
    }
    return [u, s];
  }, $a = (o, i = 500) => {
    const a = gn(z()), s = Math.max(1, Math.floor(i / 2)) * a;
    return {
      from: o - s,
      to: o + s
    };
  }, _a = (o, i, a = 600) => {
    const s = gn(i), u = Math.max(120, a);
    let y = 0.5;
    o.anchorPoint === "left" ? y = 0.12 : o.anchorPoint === "right" && (y = 0.88);
    const h = Math.max(20, Math.floor(u * y)), g = Math.max(20, u - h);
    return {
      from: o.timestamp - h * s,
      to: Math.min(Date.now(), o.timestamp + g * s)
    };
  }, ka = (o) => {
    const i = new Date(o.from), a = new Date(o.to);
    return {
      from: new Date(i.getFullYear(), i.getMonth(), i.getDate(), 0, 0, 0, 0).getTime(),
      to: new Date(a.getFullYear(), a.getMonth(), a.getDate(), 23, 59, 59, 999).getTime()
    };
  }, xa = (o, i) => {
    const a = Math.min(i.from, i.to), s = Math.max(i.from, i.to);
    return o.filter((u) => {
      const y = Number(u.timestamp);
      return y >= a && y <= s;
    });
  }, La = (o, i) => {
    var s;
    const a = Math.max(i.from, i.to);
    for (let u = o.length - 1; u >= 0; u -= 1) {
      const y = Number((s = o[u]) == null ? void 0 : s.timestamp);
      if (Number.isFinite(y) && y <= a)
        return y;
    }
    return a;
  }, wa = (o, i) => {
    var s;
    const a = Math.max(i.from, i.to);
    for (let u = o.length - 1; u >= 0; u -= 1) {
      const y = Number((s = o[u]) == null ? void 0 : s.timestamp);
      if (Number.isFinite(y) && y <= a)
        return u;
    }
    return o.length - 1;
  }, Aa = (o, i) => {
    const a = gn(i), s = Math.abs(o.to - o.from), u = Math.max(1, Math.ceil(s / a) + 1), y = Math.max(u, 120) * a;
    return {
      from: o.from,
      to: Math.max(o.to, Math.min(Date.now(), o.to + y))
    };
  }, Ta = (o) => {
    var y, h;
    if (!n || !t || o.length === 0)
      return;
    const i = ((y = n.getSize("candle_pane", Je.YAxis)) == null ? void 0 : y.width) ?? 0, a = ((h = n.getSize("candle_pane", Je.Main)) == null ? void 0 : h.width) ?? t.clientWidth - i, s = Math.max(1, a - 8), u = Math.max(2, s / Math.max(1, o.length));
    n.setOffsetRightDistance(0), n.setLeftMinVisibleBarCount(0), n.setRightMinVisibleBarCount(0), n.setBarSpace(u);
  }, tr = (o) => {
    var i;
    !n || !Number.isFinite(o) || ((i = n.scrollToTimestamp) == null || i.call(n, o, 250), requestAnimationFrame(() => rn(o)), rt());
  }, go = (o, i = "floor") => {
    var y, h, g;
    const a = ((y = n == null ? void 0 : n.getDataList) == null ? void 0 : y.call(n)) ?? [];
    if (a.length === 0 || !Number.isFinite(o))
      return -1;
    if (i === "floor")
      for (let p = a.length - 1; p >= 0; p -= 1) {
        const _ = Number((h = a[p]) == null ? void 0 : h.timestamp);
        if (Number.isFinite(_) && _ <= o)
          return p;
      }
    let s = 0, u = 1 / 0;
    for (let p = 0; p < a.length; p += 1) {
      const _ = Number((g = a[p]) == null ? void 0 : g.timestamp);
      if (!Number.isFinite(_))
        continue;
      const M = Math.abs(_ - o);
      (M < u || M === u && _ > o) && (u = M, s = p);
    }
    return u === 1 / 0 ? -1 : s;
  }, nr = (o) => {
    var p, _, M;
    if (!n || !t)
      return null;
    const i = (p = n.getDom) == null ? void 0 : p.call(n, "candle_pane", Je.Main), a = (_ = i == null ? void 0 : i.getBoundingClientRect) == null ? void 0 : _.call(i), s = (M = r == null ? void 0 : r.getBoundingClientRect) == null ? void 0 : M.call(r), u = t.getBoundingClientRect(), y = a && Number.isFinite(a.left) ? a.left - ((s == null ? void 0 : s.left) ?? u.left) : u.left - ((s == null ? void 0 : s.left) ?? u.left), h = n.getSize("candle_pane", Je.Main), g = (a == null ? void 0 : a.width) ?? (h == null ? void 0 : h.width) ?? t.clientWidth;
    return o === "left" ? Math.max(8, y) : o === "center" ? y + g / 2 : o === "right" ? y + g : null;
  }, yo = (o, i) => {
    var _, M, ee, ie, ae, me;
    const a = nr(o), s = ((_ = n == null ? void 0 : n.getDataList) == null ? void 0 : _.call(n)) ?? [];
    if (!n || a === null || s.length === 0)
      return i;
    const u = (M = n.convertFromPixel) == null ? void 0 : M.call(n, [{
      x: a,
      y: 0
    }], {
      paneId: "candle_pane",
      absolute: !0
    }), y = Number((ee = u == null ? void 0 : u[0]) == null ? void 0 : ee.dataIndex), h = Math.max(0, Math.min(s.length - 1, Number.isFinite(y) ? Math.round(y) : -1)), g = ba(i);
    if (g) {
      const q = nn(g.dataIndex), xe = (ie = n.convertToPixel) == null ? void 0 : ie.call(n, [{
        dataIndex: q
      }], {
        paneId: "candle_pane",
        absolute: !0
      }), Le = Number((ae = xe == null ? void 0 : xe[0]) == null ? void 0 : ae.x), Ne = n.getBarSpace, ne = typeof Ne == "function" ? Ne.call(n) : void 0, we = Number(typeof ne == "object" ? ne == null ? void 0 : ne.bar : ne), Ce = Number.isFinite(we) ? Math.max(2, we / 2) : 8;
      if (Number.isFinite(Le) && Math.abs(Le - a) <= Ce)
        return i;
    }
    const p = Number((me = s[h]) == null ? void 0 : me.timestamp);
    return Number.isFinite(p) ? p : i;
  }, Co = (o) => {
    if (!n || !Number.isFinite(o.timestamp))
      return;
    if (A1 = !0, co = Date.now() + 1e3, o.anchorPoint === "date") {
      tr(o.timestamp), window.setTimeout(() => {
        A1 = !1;
      }, 1e3);
      return;
    }
    const i = go(o.timestamp, "nearest"), a = nn(i), s = nr(o.anchorPoint);
    if (a < 0 || s === null) {
      tr(o.timestamp), window.setTimeout(() => {
        A1 = !1;
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
      Number.isFinite(y) && (n == null || n.scrollByDistance(s - y, 0)), requestAnimationFrame(() => {
        Lt(o), rn(o.timestamp), window.setTimeout(() => {
          A1 = !1;
        }, 1e3);
      });
    }), rt();
  }, Sa = (o) => {
    var h, g;
    if (!n || !t)
      return null;
    const i = nr(o.anchorPoint);
    if (i !== null)
      return i;
    const a = nn(go(o.timestamp, "nearest")), s = a >= 0 ? {
      dataIndex: a
    } : {
      timestamp: o.timestamp
    }, u = (h = n.convertToPixel) == null ? void 0 : h.call(n, [s], {
      paneId: "candle_pane",
      absolute: !0
    }), y = Number((g = u == null ? void 0 : u[0]) == null ? void 0 : g.x);
    return !Number.isFinite(y) || y < -2 || y > t.clientWidth + 2 ? null : y;
  }, Lt = (o) => {
    var M, ee, ie, ae;
    const i = o ?? Rt();
    if (!n || !i.enabled || !i.anchorLine) {
      It(null);
      return;
    }
    const a = Sa(i), s = (M = n.getDom) == null ? void 0 : M.call(n, "candle_pane", Je.Main), u = (ee = s == null ? void 0 : s.getBoundingClientRect) == null ? void 0 : ee.call(s), y = (ie = r == null ? void 0 : r.getBoundingClientRect) == null ? void 0 : ie.call(r), h = (ae = t == null ? void 0 : t.getBoundingClientRect) == null ? void 0 : ae.call(t), g = n.getSize("candle_pane", Je.Main), p = u && Number.isFinite(u.top) ? u.top - ((y == null ? void 0 : y.top) ?? (h == null ? void 0 : h.top) ?? 0) : 0, _ = Math.max(1, (u == null ? void 0 : u.height) ?? (g == null ? void 0 : g.height) ?? 0);
    if (a === null) {
      It(null);
      return;
    }
    It({
      left: a,
      top: p,
      height: _
    });
  }, po = async (o, i) => {
    if (n) {
      v(!0), jt(!0);
      try {
        const a = z(), s = o.from <= o.to ? o : {
          from: o.to,
          to: o.from
        }, u = ka(s), y = i ? u : Aa(u, a), h = await e.datafeed.getHistoryKLineData(S(), a, y.from, y.to), g = xa(h, u);
        n.applyNewData(h, h.length > 0), _e(!0), bt(u), requestAnimationFrame(() => {
          const p = wa(h, u);
          i ? tr(i) : (Ta(g), n == null || n.scrollToDataIndex(p, 0), rn(La(g, u))), Lt();
        });
      } finally {
        v(!1), jt(!1);
      }
    }
  }, Ma = async (o) => {
    ve(o), await po($a(o), o);
  }, Pa = (o) => {
    const a = {
      ...o,
      timestamp: (() => !n || o.anchorPoint === "date" ? o.timestamp : yo(o.anchorPoint, o.timestamp))()
    };
    Kt(a), G0(a), a.enabled ? (ve(a.timestamp), requestAnimationFrame(() => {
      Co(a), Lt(a);
    })) : requestAnimationFrame(() => Lt(a));
  };
  Ar(() => {
    if (window.addEventListener("resize", lo), n = Fa(t, {
      customApi: {
        formatDate: (h, g, p, _) => {
          switch (z().timespan) {
            case "minute":
              return _ === sn.XAxis ? I.formatDate(h, g, "HH:mm") : I.formatDate(h, g, "YYYY-MM-DD HH:mm");
            case "hour":
              return _ === sn.XAxis ? I.formatDate(h, g, "MM-DD HH:mm") : I.formatDate(h, g, "YYYY-MM-DD HH:mm");
            case "day":
            case "week":
              return I.formatDate(h, g, "YYYY-MM-DD");
            case "month":
              return _ === sn.XAxis ? I.formatDate(h, g, "YYYY-MM") : I.formatDate(h, g, "YYYY-MM-DD");
            case "year":
              return _ === sn.XAxis ? I.formatDate(h, g, "YYYY") : I.formatDate(h, g, "YYYY-MM-DD");
          }
          return I.formatDate(h, g, "YYYY-MM-DD HH:mm");
        }
      }
    }), n) {
      const h = n.getDom("candle_pane", Je.Main);
      if (h) {
        let p = document.createElement("div");
        if (p.className = "klinecharts-pro-watermark", I.isString(e.watermark)) {
          const _ = e.watermark.replace(/(^\s*)|(\s*$)/g, "");
          p.innerHTML = _;
        } else
          p.appendChild(e.watermark);
        h.appendChild(p);
      }
      const g = n.getDom("candle_pane", Je.YAxis);
      l = document.createElement("span"), l.className = "klinecharts-pro-price-unit", g == null || g.appendChild(l), kt = Yi(), _e(!0);
    }
    let o = !1;
    const i = () => {
      const h = S();
      if (h != null && h.ticker)
        try {
          const g = Array.from($e.values());
          Bt.saveDrawings(h.ticker, g);
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
    const s = n == null ? void 0 : n.removeOverlay;
    n && s && (n.removeOverlay = function(...h) {
      const g = s.apply(this, h), p = h[0];
      let _;
      if (typeof p == "string" ? _ = p : p && typeof p == "object" && p.id && (_ = p.id), _) {
        $e.delete(_);
        const M = b.get(_);
        M && (M.checkInterval && clearInterval(M.checkInterval), M.mouseUpHandler && (document.removeEventListener("mouseup", M.mouseUpHandler), document.removeEventListener("touchend", M.mouseUpHandler)), b.delete(_)), i(), _e(!0);
      }
      return g;
    }), ce().forEach((h) => {
      mn(n, h, !0, {
        id: "candle_pane"
      });
    });
    const u = {};
    e.subIndicators.forEach((h) => {
      const g = mn(n, h, !0);
      g && (u[h] = g);
    }), re(u), n == null || n.loadMore((h) => {
      v(!0), (async () => {
        try {
          const p = z(), [_] = er(p, h, 1), [M] = er(p, _, 500), ee = await e.datafeed.getHistoryKLineData(S(), p, M, _);
          n == null || n.applyMoreData(ee, ee.length > 0), _e(!0);
        } finally {
          v(!1);
        }
      })();
    }), n == null || n.subscribeAction(mt.OnTooltipIconClick, (h) => {
      if (h.indicatorName)
        switch (h.iconId) {
          case "visible": {
            n == null || n.overrideIndicator({
              name: h.indicatorName,
              visible: !0
            }, h.paneId), _e(!0);
            const g = h.paneId === "candle_pane" ? "main" : "sub";
            Pe(h.indicatorName, h.paneId, g, "change");
            break;
          }
          case "invisible": {
            n == null || n.overrideIndicator({
              name: h.indicatorName,
              visible: !1
            }, h.paneId), _e(!0);
            const g = h.paneId === "candle_pane" ? "main" : "sub";
            Pe(h.indicatorName, h.paneId, g, "change");
            break;
          }
          case "setting": {
            const g = n == null ? void 0 : n.getIndicatorByPaneId(h.paneId, h.indicatorName);
            _1({
              visible: !0,
              indicatorName: h.indicatorName,
              paneId: h.paneId,
              calcParams: g.calcParams
            });
            break;
          }
          case "close":
            if (h.paneId === "candle_pane") {
              const g = [...ce()];
              n == null || n.removeIndicator("candle_pane", h.indicatorName), _e(!0), g.splice(g.indexOf(h.indicatorName), 1), W(g), Pe(h.indicatorName, "candle_pane", "main", "remove");
            } else {
              const g = {
                ...j()
              };
              n == null || n.removeIndicator(h.paneId, h.indicatorName), _e(!0), delete g[h.indicatorName], re(g), Pe(h.indicatorName, h.paneId, "sub", "remove");
            }
        }
    }), n == null || n.subscribeAction(mt.OnCrosshairChange, jr), n == null || n.subscribeAction(mt.OnCrosshairChange, _o), ho.forEach((h) => {
      n == null || n.subscribeAction(h, uo);
    }), J1 = window.setInterval(() => rt(), 1e3), rt(), document.addEventListener("mousedown", Zr);
    const y = n == null ? void 0 : n.createOverlay;
    n && y && (n.createOverlay = function(...h) {
      var M;
      const g = qt(h[0]), p = y.apply(this, [g, ...h.slice(1)]), _ = typeof p == "string" ? p : null;
      return _ && !((M = g.extendData) != null && M.isOrderPreviewLine) && (Wi(_, g.name || "unknown"), Et(_), w1(), _e(!0)), p;
    });
  }), Ct(() => {
    var o, i, a;
    if (window.removeEventListener("resize", lo), n == null || n.unsubscribeAction(mt.OnCrosshairChange, jr), n == null || n.unsubscribeAction(mt.OnCrosshairChange, _o), T1(), ho.forEach((s) => {
      n == null || n.unsubscribeAction(s, uo);
    }), J1 && (window.clearInterval(J1), J1 = void 0), en && (window.clearTimeout(en), en = void 0), lt && (window.clearTimeout(lt), lt = void 0), ft && (window.cancelAnimationFrame(ft), ft = void 0), kt == null || kt(), kt = void 0, document.removeEventListener("mousedown", Zr), m) {
      const s = m;
      s.overlayId && ((o = n == null ? void 0 : n.removeOverlay) == null || o.call(n, {
        id: s.overlayId
      })), s.previousScrollEnabled !== void 0 && ((i = n == null ? void 0 : n.setScrollEnabled) == null || i.call(n, s.previousScrollEnabled)), s.previousZoomEnabled !== void 0 && ((a = n == null ? void 0 : n.setZoomEnabled) == null || a.call(n, s.previousZoomEnabled)), m = null;
    }
    c = null, b.clear(), $e.clear(), t0(t);
  }), Ke(() => {
    const o = S();
    o != null && o.priceCurrency ? (l.innerHTML = o == null ? void 0 : o.priceCurrency.toLocaleUpperCase(), l.style.display = "flex") : l.style.display = "none", n == null || n.setPriceVolumePrecision((o == null ? void 0 : o.pricePrecision) ?? 2, (o == null ? void 0 : o.volumePrecision) ?? 0);
  });
  const Da = (o) => {
    const i = new Date(o), a = i.getFullYear(), s = `${i.getMonth() + 1}`.padStart(2, "0"), u = `${i.getDate()}`.padStart(2, "0"), y = `${i.getHours()}`.padStart(2, "0"), h = `${i.getMinutes()}`.padStart(2, "0"), g = `${a}-${s}-${u}`;
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
  }, vo = (o, i) => {
    var p, _;
    const {
      current: a
    } = o, s = i.tooltip.text.color, u = a.close > a.open ? i.bar.upColor : a.close < a.open ? i.bar.downColor : i.bar.noChangeColor, y = Math.min(Math.max(((p = S()) == null ? void 0 : p.pricePrecision) ?? 2, 0), 8), h = Math.min(Math.max(((_ = S()) == null ? void 0 : _.volumePrecision) ?? 0, 0), 8), g = (M) => ({
      text: I.formatPrecision(M, y),
      color: u
    });
    return [{
      title: "time",
      value: {
        text: Da(a.timestamp),
        color: s
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
        text: I.formatBigNumber(I.formatPrecision(a.volume ?? i.tooltip.defaultValue, h)),
        color: u
      }
    }];
  }, on = () => typeof window < "u" && window.innerWidth < 768, bo = (o) => typeof o == "string" ? o : o.text, $o = (o) => typeof o == "string" ? void 0 : o.color, Na = (o) => o.map((i) => ({
    title: bo(i.title).replace(/:$/, "").replace(/^\w/, (a) => a.toUpperCase()),
    value: bo(i.value),
    titleColor: $o(i.title),
    valueColor: $o(i.value)
  })), T1 = () => {
    j1(null);
  }, Oa = () => {
    !on() || !b1() || (Jn = !0, T1());
  }, rr = () => {
    Jn = !1;
  }, an = (o, i) => {
    if (!t || typeof window > "u")
      return i;
    const a = window.getComputedStyle(t).getPropertyValue(o).trim(), s = Number.parseFloat(a);
    return Number.isFinite(s) ? s : i;
  }, _o = (o) => {
    if (Jn)
      return;
    if (!on() || (o == null ? void 0 : o.paneId) !== e1 || !(o != null && o.kLineData) || !t || !n) {
      T1();
      return;
    }
    const i = Number(o.x), a = Number(o.y), s = t.clientWidth, u = t.clientHeight;
    if (!Number.isFinite(i) || !Number.isFinite(a) || s <= 0 || u <= 0) {
      T1();
      return;
    }
    const y = an("--klinecharts-pro-mobile-candle-tooltip-width", 132), h = an("--klinecharts-pro-mobile-candle-tooltip-height", 124), g = an("--klinecharts-pro-mobile-candle-tooltip-offset-x", 10), p = an("--klinecharts-pro-mobile-candle-tooltip-offset-y", 10), _ = 8, M = Math.min(Math.max(i + g, _), Math.max(_, s - y - _)), ee = Math.min(Math.max(a - h - p, _), Math.max(_, u - h - _)), ie = n.getStyles().candle, ae = Na(vo({
      current: o.kLineData
    }, ie));
    j1({
      left: M,
      top: ee,
      rows: ae
    });
  }, S1 = () => {
    n == null || n.setStyles({
      candle: {
        tooltip: {
          showRule: on() ? n0.None : n0.Always,
          custom: vo,
          rect: {
            offsetLeft: 0,
            paddingLeft: 0
          }
        }
      }
    });
  };
  return Ke((o) => {
    const i = S(), a = z();
    let s = !0;
    return Ct(() => {
      s = !1;
    }), o && e.datafeed.unsubscribe(o.symbol, o.period), v(!0), jt(!0), (async () => {
      try {
        const y = dt(Rt), h = y.enabled && (!o || o.symbol.ticker === i.ticker || y.acrossTokens), g = h ? _a(y, a) : null, [p, _] = g ? [g.from, g.to] : er(a, (/* @__PURE__ */ new Date()).getTime(), 500), M = await e.datafeed.getHistoryKLineData(i, a, p, _);
        if (!s)
          return;
        n == null || n.applyNewData(M, M.length > 0), _e(!0), h ? requestAnimationFrame(() => {
          Co(y), Lt(y);
        }) : Lt(), rt(), setTimeout(() => {
          s && (ta(i == null ? void 0 : i.ticker), rt());
        }, 0), e.datafeed.subscribe(i, a, (ee) => {
          n == null || n.updateData(ee), _e(), rt();
        });
      } finally {
        s && (v(!1), jt(!1));
      }
    })(), {
      symbol: i,
      period: a
    };
  }), Ke(() => {
    const o = L();
    n == null || n.setStyles(o);
    const i = o === "dark" ? "#929AA5" : "#76808F";
    S1(), n == null || n.setStyles({
      indicator: {
        tooltip: {
          icons: [{
            id: "visible",
            position: ln.Middle,
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
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "invisible",
            position: ln.Middle,
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
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "setting",
            position: ln.Middle,
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
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "close",
            position: ln.Middle,
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
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }]
        }
      }
    });
  }), Ke(() => {
    n == null || n.setLocale(K());
  }), Ke(() => {
    n == null || n.setTimezone(be().key);
  }), Ke(() => {
    if (w()) {
      wt(w()), n == null || n.setStyles(w()), Z(H7(n.getStyles()));
      const o = R();
      if (o) {
        pe(o);
        const i = fe(o);
        wt(i), n == null || n.setStyles(i);
      }
      S1();
    }
  }), [jy.cloneNode(!0), T(sm, {
    get locale() {
      return e.locale;
    },
    get symbol() {
      return S();
    },
    get spread() {
      return Mt();
    },
    get period() {
      return z();
    },
    get periods() {
      return e.periods;
    },
    onMenuClick: async () => {
      try {
        await u9(() => Fn(!Mt())), n == null || n.resize();
      } catch {
      }
    },
    onSymbolClick: () => {
      U1(!h1());
    },
    get onMobilePeriodClick() {
      return e.onMobilePeriodClick;
    },
    onMobileMoreClick: () => {
      e.onMobileMoreClick ? e.onMobileMoreClick() : f1(!0);
    },
    onPeriodChange: G,
    onTimeToolsClick: () => {
      ve(Date.now()), Me(!0);
    },
    onIndicatorClick: () => {
      Y((o) => !o);
    },
    onTimezoneClick: () => {
      se((o) => !o);
    },
    onSettingClick: () => {
      Q((o) => !o);
    },
    onScreenshotClick: () => {
      if (n) {
        const o = e.screenshotBackgroundColor || (e.theme === "dark" ? "#11131E" : "#ffffff"), i = n.getConvertPictureUrl(!0, "jpeg", o);
        k(i);
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
      return Ee();
    },
    get orderToolsConfirmAfterDragLabel() {
      var o;
      return (o = e.orderTools) == null ? void 0 : o.confirmAfterDragLabel;
    },
    onOrderToolsStateChange: Yn
  }), (() => {
    const o = Qy.cloneNode(!0), i = o.firstChild, a = i.nextSibling;
    return o.addEventListener("mouseleave", () => {
      Dt(null), Ge(!1);
    }), yt((s) => r = s, o), i.$$click = (s) => {
      s.preventDefault(), s.stopPropagation(), Hi();
    }, i.$$mousedown = (s) => {
      s.preventDefault(), s.stopPropagation();
    }, C(o, T(le, {
      get when() {
        return z1();
      },
      get children() {
        return T(Ii, {});
      }
    }), a), C(o, T(le, {
      get when() {
        return Mt();
      },
      get children() {
        return T(Fg, {
          get locale() {
            return e.locale;
          },
          onDrawingItemClick: (s) => {
            if (Gi(s)) {
              c = s;
              return;
            }
            c = null, n == null || n.createOverlay(qt(s));
          },
          onModeChange: (s) => {
            n == null || n.overrideOverlay({
              mode: s
            });
          },
          onLockChange: (s) => {
            n == null || n.overrideOverlay({
              lock: s
            });
          },
          onVisibleChange: (s) => {
            n == null || n.overrideOverlay({
              visible: s
            });
          },
          onRemoveClick: () => {
            qi();
          }
        });
      }
    }), a), a.addEventListener("lostpointercapture", (s) => {
      Hn(s), rr();
    }), a.addEventListener("pointercancel", (s) => {
      Hn(s, !0), rr();
    }), a.$$pointerup = (s) => {
      Hn(s), rr();
    }, a.$$pointermove = ea, a.$$pointerdown = (s) => {
      Oa(), Ji(s);
    }, yt((s) => t = s, a), C(o, T(le, {
      get when() {
        return Q1();
      },
      keyed: !0,
      children: (s) => (() => {
        const u = Zy.cloneNode(!0);
        return F((y) => {
          const h = `${s.left}px`, g = `${s.top}px`, p = `${s.height}px`;
          return h !== y._v$6 && u.style.setProperty("left", y._v$6 = h), g !== y._v$7 && u.style.setProperty("top", y._v$7 = g), p !== y._v$8 && u.style.setProperty("height", y._v$8 = p), y;
        }, {
          _v$6: void 0,
          _v$7: void 0,
          _v$8: void 0
        }), u;
      })()
    }), null), C(o, T(le, {
      get when() {
        return v1();
      },
      keyed: !0,
      children: (s) => (() => {
        const u = Hy.cloneNode(!0);
        return C(u, () => s.text), F((y) => {
          const h = `${s.left}px`, g = `${s.top}px`;
          return h !== y._v$9 && u.style.setProperty("left", y._v$9 = h), g !== y._v$10 && u.style.setProperty("top", y._v$10 = g), y;
        }, {
          _v$9: void 0,
          _v$10: void 0
        }), u;
      })()
    }), null), C(o, T(le, {
      get when() {
        return b1();
      },
      keyed: !0,
      children: (s) => (() => {
        const u = Yy.cloneNode(!0);
        return C(u, T(n1, {
          get each() {
            return s.rows;
          },
          children: (y) => (() => {
            const h = Wy.cloneNode(!0), g = h.firstChild, p = g.nextSibling;
            return C(g, () => y.title), C(p, () => y.value), F((_) => {
              const M = y.title.toLowerCase() === "time", ee = y.titleColor ?? "var(--klinecharts-pro-text-second-color)", ie = y.valueColor ?? "var(--klinecharts-pro-text-color)";
              return M !== _._v$13 && h.classList.toggle("time", _._v$13 = M), ee !== _._v$14 && g.style.setProperty("color", _._v$14 = ee), ie !== _._v$15 && p.style.setProperty("color", _._v$15 = ie), _;
            }, {
              _v$13: void 0,
              _v$14: void 0,
              _v$15: void 0
            }), h;
          })()
        })), F((y) => {
          const h = `${s.left}px`, g = `${s.top}px`;
          return h !== y._v$11 && u.style.setProperty("left", y._v$11 = h), g !== y._v$12 && u.style.setProperty("top", y._v$12 = g), y;
        }, {
          _v$11: void 0,
          _v$12: void 0
        }), u;
      })()
    }), null), C(o, T(le, {
      get when() {
        return R1();
      },
      keyed: !0,
      children: (s) => (() => {
        const u = qy.cloneNode(!0), y = u.firstChild, h = y.nextSibling;
        return u.style.setProperty("right", "0px"), C(y, () => s.priceText), C(h, () => s.text), F((g) => {
          const p = `${s.top}px`, _ = `${s.width}px`, M = s.color, ee = `${s.borderRadius}px`, ie = s.textFamily, ae = s.textWeight, me = `${s.paddingLeft}px`, q = `${s.paddingRight}px`, xe = `${s.paddingTop}px`, Le = `${s.paddingBottom}px`, Ne = `${s.textSize}px`, ne = `${Math.max(10, s.textSize - 1)}px`;
          return p !== g._v$16 && u.style.setProperty("top", g._v$16 = p), _ !== g._v$17 && u.style.setProperty("width", g._v$17 = _), M !== g._v$18 && u.style.setProperty("background", g._v$18 = M), ee !== g._v$19 && u.style.setProperty("border-radius", g._v$19 = ee), ie !== g._v$20 && u.style.setProperty("font-family", g._v$20 = ie), ae !== g._v$21 && u.style.setProperty("font-weight", g._v$21 = ae), me !== g._v$22 && u.style.setProperty("padding-left", g._v$22 = me), q !== g._v$23 && u.style.setProperty("padding-right", g._v$23 = q), xe !== g._v$24 && u.style.setProperty("padding-top", g._v$24 = xe), Le !== g._v$25 && u.style.setProperty("padding-bottom", g._v$25 = Le), Ne !== g._v$26 && y.style.setProperty("font-size", g._v$26 = Ne), ne !== g._v$27 && h.style.setProperty("font-size", g._v$27 = ne), g;
        }, {
          _v$16: void 0,
          _v$17: void 0,
          _v$18: void 0,
          _v$19: void 0,
          _v$20: void 0,
          _v$21: void 0,
          _v$22: void 0,
          _v$23: void 0,
          _v$24: void 0,
          _v$25: void 0,
          _v$26: void 0,
          _v$27: void 0
        }), u;
      })()
    }), null), C(o, T(le, {
      get when() {
        return Qe();
      },
      keyed: !0,
      children: (s) => (() => {
        const u = eC.cloneNode(!0), y = u.firstChild, h = y.nextSibling, g = h.nextSibling, p = g.firstChild, _ = g.nextSibling, M = _.firstChild, ee = M.firstChild, ie = ee.nextSibling, ae = ie.firstChild, me = _.nextSibling, q = me.firstChild, xe = me.nextSibling, Le = xe.nextSibling, Ne = Le.nextSibling;
        return u.$$click = (ne) => {
          ne.stopPropagation();
        }, u.$$mousedown = (ne) => {
          ne.preventDefault(), ne.stopPropagation();
        }, y.$$mousedown = ma, h.$$click = ha, p.$$click = () => He(We() === "color" ? null : "color"), C(g, T(le, {
          get when() {
            return We() === "color";
          },
          get children() {
            const ne = Gy.cloneNode(!0), we = ne.firstChild;
            return C(we, T(n1, {
              each: Kn,
              children: (Ce) => (() => {
                const Oe = tC.cloneNode(!0);
                return Oe.$$click = () => fa(Ce), Oe.style.setProperty("background", Ce), F(() => he(Oe, `overlay-toolbar-color-swatch ${s.color.toLowerCase() === Ce.toLowerCase() ? "selected" : ""}`)), Oe;
              })()
            })), ne;
          }
        }), null), M.$$click = () => He(We() === "width" ? null : "width"), C(ie, () => s.lineSize, ae), C(_, T(le, {
          get when() {
            return We() === "width";
          },
          get children() {
            const ne = Xy.cloneNode(!0);
            return C(ne, T(n1, {
              each: [1, 2, 3, 4],
              children: (we) => (() => {
                const Ce = nC.cloneNode(!0), Oe = Ce.firstChild;
                return Ce.$$click = () => da(we), Oe.style.setProperty("height", `${we}px`), F(() => he(Ce, s.lineSize === we ? "selected" : "")), Ce;
              })()
            })), ne;
          }
        }), null), q.$$click = () => He(We() === "style" ? null : "style"), C(me, T(le, {
          get when() {
            return We() === "style";
          },
          get children() {
            const ne = Jy.cloneNode(!0), we = ne.firstChild, Ce = we.nextSibling, Oe = Ce.nextSibling;
            return we.$$click = () => Xn(Re.Solid, []), Ce.$$click = () => Xn(Re.Dashed, [6, 4]), Oe.$$click = () => Xn(Re.Dashed, [2, 4]), F((Be) => {
              var at, st;
              const ot = s.lineStyle === Re.Solid ? "selected" : "", ct = s.lineStyle === Re.Dashed && ((at = s.dashedValue) == null ? void 0 : at[0]) === 6 ? "selected" : "", it = s.lineStyle === Re.Dashed && ((st = s.dashedValue) == null ? void 0 : st[0]) === 2 ? "selected" : "";
              return ot !== Be._v$28 && he(we, Be._v$28 = ot), ct !== Be._v$29 && he(Ce, Be._v$29 = ct), it !== Be._v$30 && he(Oe, Be._v$30 = it), Be;
            }, {
              _v$28: void 0,
              _v$29: void 0,
              _v$30: void 0
            }), ne;
          }
        }), null), xe.$$click = ua, Le.$$click = ca, Ne.$$click = la, F((ne) => {
          const we = `${s.x}px`, Ce = `${s.y}px`, Oe = `overlay-toolbar-icon edit ${We() === "color" ? "active" : ""}`, Be = `overlay-toolbar-line-size ${We() === "width" ? "active" : ""}`, ot = `overlay-toolbar-icon minus ${We() === "style" ? "active" : ""}`, ct = `overlay-toolbar-icon visibility ${s.visible ? "" : "muted"}`, it = s.visible ? "Hide" : "Show", at = `overlay-toolbar-icon lock ${s.locked ? "active" : ""}`, st = s.locked ? "Unlock" : "Lock";
          return we !== ne._v$31 && u.style.setProperty("left", ne._v$31 = we), Ce !== ne._v$32 && u.style.setProperty("top", ne._v$32 = Ce), Oe !== ne._v$33 && he(p, ne._v$33 = Oe), Be !== ne._v$34 && he(M, ne._v$34 = Be), ot !== ne._v$35 && he(q, ne._v$35 = ot), ct !== ne._v$36 && he(xe, ne._v$36 = ct), it !== ne._v$37 && Ie(xe, "title", ne._v$37 = it), at !== ne._v$38 && he(Le, ne._v$38 = at), st !== ne._v$39 && Ie(Le, "title", ne._v$39 = st), ne;
        }, {
          _v$31: void 0,
          _v$32: void 0,
          _v$33: void 0,
          _v$34: void 0,
          _v$35: void 0,
          _v$36: void 0,
          _v$37: void 0,
          _v$38: void 0,
          _v$39: void 0
        }), u;
      })()
    }), null), C(o, T(le, {
      get when() {
        return $t();
      },
      keyed: !0,
      children: (s) => (() => {
        const u = rC.cloneNode(!0), y = u.firstChild;
        return u.addEventListener("mouseleave", () => {
          Nt() || Ge(!1);
        }), u.$$mousemove = (h) => {
          h.stopPropagation(), Wt();
        }, u.addEventListener("mouseenter", () => {
          Ge(!0), Wt();
        }), y.$$click = (h) => {
          h.stopPropagation(), Ge(!0), _t({
            y: s.y,
            price: s.price,
            yAxisWidth: g1()
          }), nt(!0), Wt();
        }, y.$$mousedown = (h) => {
          h.preventDefault(), h.stopPropagation(), Wt();
        }, C(y, (() => {
          const h = X(() => {
            var g;
            return !!((g = e.orderTools) != null && g.quickOrderPlusIcon);
          });
          return () => h() ? (() => {
            const g = oC.cloneNode(!0);
            return F(() => g.innerHTML = e.orderTools.quickOrderPlusIcon), g;
          })() : iC.cloneNode(!0);
        })()), F((h) => {
          const g = `${Math.max(0, s.y - 12)}px`, p = `${g1()}px`, _ = Ee().quickOrderPlusButton ? "block" : "none";
          return g !== h._v$40 && u.style.setProperty("top", h._v$40 = g), p !== h._v$41 && u.style.setProperty("right", h._v$41 = p), _ !== h._v$42 && u.style.setProperty("display", h._v$42 = _), h;
        }, {
          _v$40: void 0,
          _v$41: void 0,
          _v$42: void 0
        }), u;
      })()
    }), null), C(o, T(le, {
      get when() {
        return X(() => !!Nt())() && Ot();
      },
      keyed: !0,
      children: (s) => (() => {
        const u = aC.cloneNode(!0), y = u.firstChild, h = y.firstChild, g = h.firstChild, p = g.nextSibling, _ = p.nextSibling, M = _.nextSibling;
        M.nextSibling;
        const ee = h.nextSibling, ie = ee.firstChild, ae = ie.nextSibling, me = ae.nextSibling, q = me.nextSibling;
        q.nextSibling;
        const xe = ee.nextSibling, Le = xe.nextSibling, Ne = Le.firstChild, ne = Ne.nextSibling;
        ne.nextSibling;
        const we = Le.nextSibling;
        return we.firstChild, u.addEventListener("mouseleave", () => Ge(!1)), u.addEventListener("mouseenter", () => Ge(!0)), y.$$mousemove = () => {
          Wt();
        }, y.$$mousedown = (Ce) => {
          Ce.preventDefault(), Ce.stopPropagation(), Wt();
        }, h.$$click = () => qn("limit"), C(h, () => S().shortName ?? S().name ?? S().ticker, p), C(h, () => X1(s.price), M), ee.$$click = () => qn("stop"), C(ee, () => S().shortName ?? S().name ?? S().ticker, ae), C(ee, () => X1(s.price), q), xe.$$click = () => qn("create"), Le.$$click = ia, C(Le, () => X1(s.price), ne), we.$$click = aa, C(we, () => X1(s.price), null), F((Ce) => {
          const Oe = `${Math.max(0, s.y + 24)}px`, Be = `${s.yAxisWidth + Rn}px`;
          return Oe !== Ce._v$43 && u.style.setProperty("top", Ce._v$43 = Oe), Be !== Ce._v$44 && u.style.setProperty("right", Ce._v$44 = Be), Ce;
        }, {
          _v$43: void 0,
          _v$44: void 0
        }), u;
      })()
    }), null), F((s) => {
      const u = `klinecharts-pro-auto-scale-button${Xe() ? " active" : ""}`, y = Xe(), h = Xe(), g = Xe() ? "Auto scale on" : "Auto scale off", p = Mt();
      return u !== s._v$ && he(i, s._v$ = u), y !== s._v$2 && Ie(i, "data-active", s._v$2 = y), h !== s._v$3 && Ie(i, "aria-pressed", s._v$3 = h), g !== s._v$4 && Ie(i, "title", s._v$4 = g), p !== s._v$5 && Ie(a, "data-drawing-bar-visible", s._v$5 = p), s;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0,
      _v$5: void 0
    }), o;
  })(), T(le, {
    get when() {
      return h1();
    },
    get children() {
      return T(py, {
        get locale() {
          return e.locale;
        },
        get datafeed() {
          return e.datafeed;
        },
        onSymbolSelected: (o) => {
          E(o);
        },
        onClose: () => {
          U1(!1);
        }
      });
    }
  }), T(le, {
    get when() {
      return H();
    },
    get children() {
      return T(Ug, {
        get locale() {
          return e.locale;
        },
        get mainIndicators() {
          return ce();
        },
        get subIndicators() {
          return j();
        },
        onClose: () => {
          Y(!1);
        },
        onMainIndicatorChange: (o) => {
          const i = [...ce()];
          o.added ? (mn(n, o.name, !0, {
            id: "candle_pane"
          }), i.push(o.name), Pe(o.name, "candle_pane", "main", "add")) : (n == null || n.removeIndicator("candle_pane", o.name), i.splice(i.indexOf(o.name), 1), Pe(o.name, "candle_pane", "main", "remove")), W(i), _e(!0);
        },
        onSubIndicatorChange: (o) => {
          const i = {
            ...j()
          };
          if (o.added) {
            const a = mn(n, o.name);
            a && (i[o.name] = a, Pe(o.name, a, "sub", "add"));
          } else
            o.paneId && (n == null || n.removeIndicator(o.paneId, o.name), delete i[o.name], Pe(o.name, o.paneId, "sub", "remove"));
          re(i), _e(!0);
        }
      });
    }
  }), T(le, {
    get when() {
      return ue();
    },
    get children() {
      return T(zg, {
        get locale() {
          return e.locale;
        },
        get timezone() {
          return be();
        },
        onClose: () => {
          se(!1);
        },
        onConfirm: Se
      });
    }
  }), T(le, {
    get when() {
      return N();
    },
    get children() {
      return T(ly, {
        get locale() {
          return e.locale;
        },
        get currentStyles() {
          return I.clone(n.getStyles());
        },
        get defaultStyles() {
          return V();
        },
        get currentBackgroundColor() {
          return J();
        },
        get defaultBackgroundColor() {
          return P();
        },
        get timezone() {
          return be();
        },
        onClose: () => {
          Q(!1);
        },
        onTimezoneChange: Se,
        onChange: (o) => {
          const i = o;
          pe(i);
          const a = fe(i);
          wt(a), n == null || n.setStyles(a), n == null || n.resize(), S1();
        },
        onSaveChartStyle: (o) => {
          oe(o);
        },
        onResetChartStyle: () => {
          te(), t == null || t.style.removeProperty("--klinecharts-pro-chart-background-color");
        },
        onRestoreDefault: (o) => {
          const i = {};
          o.forEach((s) => {
            const u = s.key;
            if (u === "chart.backgroundColor") {
              Fe(i, u, P());
              return;
            }
            Fe(i, u, I.formatValue(V(), u));
          }), pe(i);
          const a = fe(i);
          wt(a), n == null || n.setStyles(a), n == null || n.resize(), S1();
        }
      });
    }
  }), T(le, {
    get when() {
      return De().length > 0;
    },
    get children() {
      return T(uy, {
        get locale() {
          return e.locale;
        },
        get url() {
          return De();
        },
        onClose: () => {
          k("");
        }
      });
    }
  }), T(le, {
    get when() {
      return ge();
    },
    get children() {
      return T(Fy, {
        get initialTimestamp() {
          return tt();
        },
        get initialRange() {
          return vt();
        },
        get anchorSettings() {
          return Rt();
        },
        onClose: () => {
          Me(!1);
        },
        onGoToDate: Ma,
        onTimeRange: (o) => {
          po(o);
        },
        onTimeAnchorChange: Pa
      });
    }
  }), T(le, {
    get when() {
      return $1().visible;
    },
    get children() {
      return T(my, {
        get locale() {
          return e.locale;
        },
        get params() {
          return $1();
        },
        onClose: () => {
          _1({
            visible: !1,
            indicatorName: "",
            paneId: "",
            calcParams: []
          });
        },
        onConfirm: (o) => {
          const i = $1();
          n == null || n.overrideIndicator({
            name: i.indicatorName,
            calcParams: o
          }, i.paneId), _e(!0);
          const a = i.paneId === "candle_pane" ? "main" : "sub";
          Pe(i.indicatorName, i.paneId, a, "change");
        }
      });
    }
  }), T(le, {
    get when() {
      return Un();
    },
    get children() {
      return T(by, {
        get locale() {
          return e.locale;
        },
        onIndicatorClick: () => {
          Y(!0);
        },
        onTimezoneClick: () => {
          se(!0);
        },
        onSettingClick: () => {
          Q(!0);
        },
        onTimeToolsClick: () => {
          ve(Date.now()), Me(!0);
        },
        onClose: () => {
          f1(!1);
        }
      });
    }
  })];
};
Ye(["mousedown", "click", "pointerdown", "pointermove", "pointerup", "mousemove"]);
const gC = /* @__PURE__ */ $('<svg class="logo" viewBox="0 0 80 92"><path d="M28.148808359375,51.7280513671875L22.963588359375,51.7280513671875C21.572648359375002,51.7280513671875,20.445068359375,52.6220613671875,20.445068359375,53.7248813671875L20.445068359375,72.3979013671875C20.445068359375,73.5007013671875,21.572648359375002,74.39470136718751,22.963588359375,74.39470136718751L33.926568359375,74.39470136718751C35.317468359375,74.39470136718751,36.445068359375,73.5007013671875,36.445068359375,72.3979013671875L36.445068359375,53.7248813671875C36.445068359375,52.6220613671875,35.317468359375,51.7280513671875,33.926568359375,51.7280513671875L28.741398359374998,51.7280513671875L28.741398359374998,46.2963223671875C28.741398359374998,46.1665793671875,28.608748359375,46.0614013671875,28.445108359375,46.0614013671875C28.281468359375,46.0614013671875,28.148808359375,46.1665793671875,28.148808359375,46.2963223671875L28.148808359375,51.7280513671875ZM28.741398359374998,74.3948013671875L28.741398359374998,79.82650136718749C28.741398359374998,79.9563013671875,28.608748359375,80.0614013671875,28.445108359375,80.0614013671875C28.281468359375,80.0614013671875,28.148808359375,79.9563013671875,28.148808359375,79.82650136718749L28.148808359375,74.3948013671875L28.741398359374998,74.3948013671875Z"></path><path d="M51.148808359374996,44.7280513671875L45.963588359375,44.7280513671875C44.572648359375,44.7280513671875,43.445068359375,45.6220613671875,43.445068359375,46.7248813671875L43.445068359375,65.3979013671875C43.445068359375,66.5007013671875,44.572648359375,67.39470136718751,45.963588359375,67.39470136718751L56.926568359375,67.39470136718751C58.317468359375,67.39470136718751,59.445068359375,66.5007013671875,59.445068359375,65.3979013671875L59.445068359375,46.7248813671875C59.445068359375,45.6220613671875,58.317468359375,44.7280513671875,56.926568359375,44.7280513671875L51.741398359375,44.7280513671875L51.741398359375,39.2963223671875C51.741398359375,39.1665793671875,51.608748359375,39.0614013671875,51.445108359375,39.0614013671875C51.281468359375,39.0614013671875,51.148808359374996,39.1665793671875,51.148808359374996,39.2963223671875L51.148808359374996,44.7280513671875ZM51.741398359375,67.3948013671875L51.741398359375,72.82650136718749C51.741398359375,72.9563013671875,51.608748359375,73.0614013671875,51.445108359375,73.0614013671875C51.281468359375,73.0614013671875,51.148808359374996,72.9563013671875,51.148808359374996,72.82650136718749L51.148808359374996,67.3948013671875L51.741398359375,67.3948013671875Z"></path><path d="M17.7274,90.6541C17.5901,90.6541,17.4517,90.6436,17.3121,90.6225C9.93219,89.5095,4.80718,86.7136,2.07787,82.3084C-1.1223,77.1437,0.241766,71.6314,0.56829,70.5137C5.37624,46.647,15.0785,38.4945,21.5025,33.0957C22.9683,31.8633,24.2342,30.7995,25.1676,29.7672C25.4105,29.4984,25.6051,29.2154,25.7556,28.9202C24.7465,29.2231,24.1971,29.4326,24.1703,29.4429C22.908,29.9368,21.4777,29.3247,20.9761,28.076C20.4756,26.8272,21.0897,25.4146,22.352,24.9172C22.5042,24.8571,23.5312,24.4607,25.3073,23.9616C24.087,21.4425,21.7693,18.7949,19.7125,16.6431L19.2819,16.1902C16.2438,12.9776,14.6017,4.80159,14.3036,3.19471C14.1306,2.26212,14.4636,1.30796,15.1814,0.679657C15.8995,0.0512175,16.8976,-0.159672,17.8125,0.123747C22.7731,1.66274,24.2638,1.81255,27.2321,2.11098C28.7357,2.26195,29.83,3.59029,29.6762,5.07662C29.5236,6.56295,28.182,7.64786,26.6784,7.49454C24.4992,7.27569,22.9517,7.09896,20.724,6.56646C21.4493,9.09088,22.3803,11.5427,23.2771,12.4919L23.6876,12.9237C25.3757,14.69,28.9691,18.45,30.7016,22.7299C35.0392,21.9433,40.8791,21.3359,47.7817,21.7249C48.2004,20.7386,48.8054,19.7953,49.5907,18.9135C49.7137,18.7754,49.8498,18.6502,49.9988,18.539C53.6142,15.8508,57.5491,12.857,59.7803,11.0758C58.1028,11.2502,56.1034,11.0278,53.9124,9.70882C53.2439,9.30622,52.5992,8.89427,51.9662,8.48933C48.4668,6.25164,46.497,5.12109,43.4234,5.94853C41.9647,6.34058,40.4622,5.48975,40.0659,4.04789C39.6695,2.60604,40.5296,1.11853,41.9871,0.726471C47.5602,-0.773825,51.4796,1.73271,54.9364,3.9434L54.9364,3.9434C55.5284,4.32176,56.1318,4.70797,56.7564,5.08482C58.3843,6.06556,59.4858,5.76127,61.2899,5.13865C62.3511,4.77234,63.5567,4.35687,64.8675,4.53476C66.3321,4.73254,67.4406,5.56933,67.9103,6.83096C68.7444,9.07333,67.1035,11.5533,65.5797,13.2374C64.6729,14.2394,60.0845,17.7606,56.4519,20.4957C56.9477,20.3369,57.4767,20.2511,58.026,20.2511C59.4281,20.2511,60.6982,20.8102,61.621,21.7153C65.4948,20.6901,67.87,17.9563,67.9033,17.9175C68.78,16.8888,70.3322,16.7577,71.3721,17.6226C72.412,18.4886,72.5457,20.0253,71.6702,21.054C71.5221,21.2286,69.5063,23.5492,66.0787,25.233C69.5399,26.8822,72.9993,29.682,74.1841,34.4145C74.5106,35.7206,73.7062,37.0407,72.3859,37.3638C72.1871,37.4117,71.9884,37.4351,71.792,37.4351C70.687,37.4351,69.6826,36.6932,69.4046,35.5848C68.4378,31.7217,64.8144,29.7431,61.7619,28.7456C60.8298,29.7349,59.5009,30.3535,58.026,30.3535C55.8642,30.3535,54.0162,29.0245,53.2713,27.1474C53.2022,27.138,53.1331,27.1287,53.0642,27.1195C54.232,29.5936,57.0851,31.9259,58.1868,32.665C58.3157,32.7516,58.4423,32.8523,58.5547,32.9599C66.5865,40.6151,72.4887,48.8133,76.0971,57.3287C76.6815,58.7074,76.0249,60.2932,74.6313,60.8702C74.2976,61.01,73.9388,61.082,73.576,61.082C72.5065,61.082,71.4914,60.4582,71.0525,59.4213C67.7577,51.6455,62.331,44.1074,54.9203,37.0116C53.6073,36.1009,48.0984,31.9917,47.2065,26.583C40.9421,26.2679,35.6187,26.8278,31.6725,27.5336C31.6197,29.527,30.9225,31.5172,29.2456,33.3731C28.0614,34.6827,26.5968,35.915,25.0446,37.2188C21.9414,39.8269,18.2648,42.9169,14.8104,48.1192C11.356,53.3215,8.12389,60.6361,5.9098,71.6934C5.88732,71.8035,5.85893,71.9123,5.82344,72.0188C5.81634,72.041,4.57886,76.0413,6.77344,79.5289C8.6332,82.4828,12.4557,84.4139,18.1367,85.2705C19.6297,85.4953,20.6566,86.8762,20.4295,88.3532C20.2213,89.6944,19.0559,90.6541,17.7274,90.6541ZM35.1195,7.03101C33.3502,7.03101,31.9158,5.61208,31.9158,3.86173C31.9158,2.11139,33.3502,0.69245,35.1195,0.69245C36.8889,0.69245,38.3233,2.11139,38.3233,3.86173C38.3233,5.61208,36.8889,7.03101,35.1195,7.03101ZM57.6848,23.1892L58.414,24.4754C58.8984,24.3623,59.3923,24.3435,59.8644,24.4203C60.2191,24.5005,60.5087,24.7182,60.6663,25.0229C60.8636,25.3394,60.8993,25.7346,60.7646,26.1094C60.5988,26.5176,60.2972,26.8749,59.9085,27.1235L60.31,27.8316L59.7886,28.1294L59.3994,27.443C58.9257,27.7175,58.399,27.883,57.8664,27.9247L57.3744,27.0569C57.6378,27.0741,57.9071,27.048,58.1704,26.9797C58.4501,26.9251,58.7239,26.8323,58.9829,26.7044L58.2801,25.4647C57.8047,25.5877,57.3167,25.6065,56.8549,25.5197C56.4913,25.4263,56.196,25.1971,56.0328,24.8814C55.8433,24.5561,55.8127,24.1572,55.9484,23.7789C56.088,23.373,56.3763,23.0149,56.7584,22.7726L56.4166,22.1699L56.938,21.8721L57.2727,22.4625C57.6615,22.2376,58.0888,22.0901,58.5254,22.0301L59.0042,22.8746C58.5548,22.8828,58.103,22.9906,57.6848,23.1892ZM56.9319,24.2961Q57.1278,24.6417,57.7863,24.5856L57.1695,23.4978Q56.6982,23.884,56.9319,24.2961ZM58.9077,25.3462L59.4981,26.3875L59.499,26.3891Q59.9965,26.0045,59.7628,25.5923Q59.573,25.2576,58.9077,25.3462ZM73.2212,66.5065C73.2212,68.2569,74.6555,69.6758,76.4249,69.6758C78.1943,69.6758,79.6286,68.2569,79.6286,66.5065C79.6286,64.7562,78.1943,63.3372,76.4249,63.3372C74.6555,63.3372,73.2212,64.7562,73.2212,66.5065ZM35.9465,91.8045C35.0734,91.8045,34.2038,91.7987,33.3378,91.7858C31.827,91.7636,30.6203,90.5359,30.6428,89.0402C30.6653,87.5457,31.9158,86.3297,33.4183,86.3742C49.6344,86.6059,65.7512,84.6175,67.6134,84.037C72.1953,82.4184,74.5295,79.3603,74.5295,74.9575C74.5295,73.463,75.754,72.2517,77.2648,72.2517C78.7755,72.2517,80,73.463,80,74.9575C80,81.5992,76.148,86.7686,69.4317,89.142C67.0041,89.9999,51.0955,91.8046,35.9465,91.8045ZM25.2731,92C23.5037,92,22.0693,90.5811,22.0693,88.8307C22.0693,87.0804,23.5037,85.6615,25.2731,85.6615C27.0424,85.6615,28.4768,87.0804,28.4768,88.8307C28.4768,90.5811,27.0424,92,25.2731,92Z"></path></svg>'), yC = gC.cloneNode(!0);
class $C {
  constructor(t) {
    D1(this, "_chartApi", null);
    if (I.isString(t.container)) {
      if (this._container = document.getElementById(t.container), !this._container)
        throw new Error("Container is null");
    } else
      this._container = t.container;
    this._container.classList.add("klinecharts-pro"), this._container.setAttribute("data-theme", t.theme ?? "light");
    const r = this;
    v9(() => T(mC, {
      ref: (n) => {
        r._chartApi = n;
      },
      get styles() {
        return t.styles ?? {};
      },
      get watermark() {
        return t.watermark ?? yC;
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
          confirmAfterDrag: !0,
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
    wt(t), this._chartApi.setStyles(t), (n = (r = this._chartApi).resize) == null || n.call(r);
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
    var n, l;
    (l = (n = this._chartApi) == null ? void 0 : n.setAutoScalePriceLines) == null || l.call(n, t, r);
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
    var n, l;
    (l = (n = this._chartApi) == null ? void 0 : n.enableAutoSave) == null || l.call(n, t, r);
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
      confirmAfterDrag: !0,
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
    var n, l;
    return ((l = (n = this._chartApi) == null ? void 0 : n.getSize) == null ? void 0 : l.call(n, t, r)) ?? null;
  }
  getDom(t, r) {
    var n, l;
    return ((l = (n = this._chartApi) == null ? void 0 : n.getDom) == null ? void 0 : l.call(n, t, r)) ?? null;
  }
  subscribeAction(t, r) {
    var n, l;
    (l = (n = this._chartApi) == null ? void 0 : n.subscribeAction) == null || l.call(n, t, r);
  }
  unsubscribeAction(t, r) {
    var n, l;
    (l = (n = this._chartApi) == null ? void 0 : n.unsubscribeAction) == null || l.call(n, t, r);
  }
}
i9.forEach((e) => {
  Va(e);
});
export {
  vC as DefaultDatafeed,
  $C as KLineChartPro,
  Ry as calculateAutoPriceRange,
  bC as loadLocales
};
//# sourceMappingURL=klinecharts-pro.js.map
