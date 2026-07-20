var za = Object.defineProperty;
var Ua = (e, t, r) => t in e ? za(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var N1 = (e, t, r) => (Ua(e, typeof t != "symbol" ? t + "" : t, r), r);
import { utils as B, registerFigure as Ra, PolygonType as e1, LineType as Ve, OverlayMode as ir, ActionType as bt, init as Va, FormatDateType as cn, DomPosition as tt, dispose as ii, TooltipIconPosition as un, CandleType as Ka, YAxisType as ja, TooltipShowRule as ai, registerOverlay as Qa } from "klinecharts";
function E1(e, t, r) {
  const n = (e.x - t.x) * Math.cos(r) - (e.y - t.y) * Math.sin(r) + t.x, l = (e.x - t.x) * Math.sin(r) + (e.y - t.y) * Math.cos(r) + t.y;
  return { x: n, y: l };
}
function gr(e, t) {
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
      y: B.getLinearYFromCoordinates(e[0], e[1], { x: 0, y: e[0].y })
    } : r = {
      x: t.width,
      y: B.getLinearYFromCoordinates(e[0], e[1], { x: t.width, y: e[0].y })
    }, { coordinates: [e[0], r] };
  }
  return [];
}
function t0(e, t) {
  const r = Math.abs(e.x - t.x), n = Math.abs(e.y - t.y);
  return Math.sqrt(r * r + n * n);
}
const Za = {
  name: "arrow",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = e[1].x > e[0].x ? 0 : 1, r = B.getLinearSlopeIntercept(e[0], e[1]);
      let n;
      r ? n = Math.atan(r[0]) + Math.PI * t : e[1].y > e[0].y ? n = Math.PI / 2 : n = Math.PI / 2 * 3;
      const l = E1({ x: e[1].x - 8, y: e[1].y + 4 }, e[1], n), u = E1({ x: e[1].x - 8, y: e[1].y - 4 }, e[1], n);
      return [
        {
          type: "line",
          attrs: { coordinates: e }
        },
        {
          type: "line",
          ignoreEvent: !0,
          attrs: { coordinates: [l, e[1], u] }
        }
      ];
    }
    return [];
  }
}, Ha = {
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
      const t = t0(e[0], e[1]);
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
}, Wa = {
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
}, Ya = {
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
}, qa = {
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
}, Ga = {
  name: "fibonacciCircle",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = Math.abs(e[0].x - e[1].x), r = Math.abs(e[0].y - e[1].y), n = Math.sqrt(t * t + r * r), l = [0.236, 0.382, 0.5, 0.618, 0.786, 1], u = [], f = [];
      return l.forEach((m) => {
        const p = n * m;
        u.push(
          { ...e[0], r: p }
        ), f.push({
          x: e[0].x,
          y: e[0].y + p + 6,
          text: `${(m * 100).toFixed(1)}%`
        });
      }), [
        {
          type: "circle",
          attrs: u,
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
}, Xa = {
  name: "fibonacciSegment",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: r }) => {
    const n = [], l = [];
    if (e.length > 1) {
      const u = e[1].x > e[0].x ? e[0].x : e[1].x, f = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0], m = e[0].y - e[1].y, p = t.points, L = p[0].value - p[1].value;
      f.forEach((x) => {
        const w = e[1].y + m * x, K = (p[1].value + L * x).toFixed(r.price);
        n.push({ coordinates: [{ x: e[0].x, y: w }, { x: e[1].x, y: w }] }), l.push({
          x: u,
          y: w,
          text: `${K} (${(x * 100).toFixed(1)}%)`,
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
}, Ja = {
  name: "fibonacciSpiral",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, bounding: t }) => {
    if (e.length > 1) {
      const r = t0(e[0], e[1]) / Math.sqrt(24), n = e[1].x > e[0].x ? 0 : 1, l = B.getLinearSlopeIntercept(e[0], e[1]);
      let u;
      l ? u = Math.atan(l[0]) + Math.PI * n : e[1].y > e[0].y ? u = Math.PI / 2 : u = Math.PI / 2 * 3;
      const f = E1(
        { x: e[0].x - r, y: e[0].y },
        e[0],
        u
      ), m = E1(
        { x: e[0].x - r, y: e[0].y - r },
        e[0],
        u
      ), p = [{
        ...f,
        r,
        startAngle: u,
        endAngle: u + Math.PI / 2
      }, {
        ...m,
        r: r * 2,
        startAngle: u + Math.PI / 2,
        endAngle: u + Math.PI
      }];
      let L = e[0].x - r, x = e[0].y - r;
      for (let w = 2; w < 9; w++) {
        const K = p[w - 2].r + p[w - 1].r;
        let W = 0;
        switch (w % 4) {
          case 0: {
            W = u, L -= p[w - 2].r;
            break;
          }
          case 1: {
            W = u + Math.PI / 2, x -= p[w - 2].r;
            break;
          }
          case 2: {
            W = u + Math.PI, L += p[w - 2].r;
            break;
          }
          case 3: {
            W = u + Math.PI / 2 * 3, x += p[w - 2].r;
            break;
          }
        }
        const ye = W + Math.PI / 2, R = E1({ x: L, y: x }, e[0], u);
        p.push({
          ...R,
          r: K,
          startAngle: W,
          endAngle: ye
        });
      }
      return [
        {
          type: "arc",
          attrs: p
        },
        {
          type: "line",
          attrs: gr(e, t)
        }
      ];
    }
    return [];
  }
}, es = {
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
      const u = e[1].x > e[0].x ? -38 : 4, f = e[1].y > e[0].y ? -2 : 20, m = e[1].x - e[0].x, p = e[1].y - e[0].y;
      [1, 0.75, 0.618, 0.5, 0.382, 0.25, 0].forEach((x) => {
        const w = e[1].x - m * x, K = e[1].y - p * x;
        r.push({ coordinates: [{ x: w, y: e[0].y }, { x: w, y: e[1].y }] }), r.push({ coordinates: [{ x: e[0].x, y: K }, { x: e[1].x, y: K }] }), n = n.concat(gr([e[0], { x: w, y: e[1].y }], t)), n = n.concat(gr([e[0], { x: e[1].x, y: K }], t)), l.unshift({
          x: e[0].x + u,
          y: K + 10,
          text: `${x.toFixed(3)}`
        }), l.unshift({
          x: w - 18,
          y: e[0].y + f,
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
}, ts = {
  name: "fibonacciExtension",
  totalStep: 4,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: r }) => {
    const n = [], l = [];
    if (e.length > 2) {
      const u = t.points, f = u[1].value - u[0].value, m = e[1].y - e[0].y, p = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1], L = e[2].x > e[1].x ? e[1].x : e[2].x;
      p.forEach((x) => {
        const w = e[2].y + m * x, K = (u[2].value + f * x).toFixed(r.price);
        n.push({ coordinates: [{ x: e[1].x, y: w }, { x: e[2].x, y: w }] }), l.push({
          x: L,
          y: w,
          text: `${K} (${(x * 100).toFixed(1)}%)`,
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
}, ns = {
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
}, rs = {
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
}, os = {
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
}, is = {
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
}, as = {
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
}, ss = {
  name: "abcd",
  totalStep: 5,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    let t = [], r = [];
    const n = ["A", "B", "C", "D"], l = e.map((u, f) => ({
      ...u,
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
        attrs: l
      }
    ];
  }
}, ls = {
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
    const r = [], n = [], l = ["X", "A", "B", "C", "D"], u = e.map((f, m) => ({
      ...f,
      baseline: "bottom",
      text: `(${l[m]})`
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
        attrs: u
      }
    ];
  }
}, cs = [
  Za,
  Ha,
  Wa,
  qa,
  Ya,
  Ga,
  Xa,
  Ja,
  es,
  ts,
  ns,
  rs,
  os,
  is,
  as,
  ss,
  ls
];
class xp {
  constructor(t) {
    N1(this, "_apiKey");
    N1(this, "_prevSymbolMarket");
    N1(this, "_ws");
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
    return await ((await (await fetch(`https://api.polygon.io/v2/aggs/ticker/${t.ticker}/range/${r.multiplier}/${r.timespan}/${n}/${l}?apiKey=${this._apiKey}`)).json()).results || []).map((m) => ({
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
    var l, u;
    this._prevSymbolMarket !== t.market ? ((l = this._ws) == null || l.close(), this._ws = new WebSocket(`wss://delayed.polygon.io/${t.market}`), this._ws.onopen = () => {
      var f;
      (f = this._ws) == null || f.send(JSON.stringify({ action: "auth", params: this._apiKey }));
    }, this._ws.onmessage = (f) => {
      var p;
      const m = JSON.parse(f.data);
      m[0].ev === "status" ? m[0].status === "auth_success" && ((p = this._ws) == null || p.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` }))) : "sym" in m && n({
        timestamp: m.s,
        open: m.o,
        high: m.h,
        low: m.l,
        close: m.c,
        volume: m.v,
        turnover: m.vw
      });
    }) : (u = this._ws) == null || u.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` })), this._prevSymbolMarket = t.market;
  }
  unsubscribe(t, r) {
  }
}
const Re = {};
function us(e) {
  Re.context = e;
}
const ds = (e, t) => e === t, yr = Symbol("solid-proxy"), hs = Symbol("solid-track"), $n = {
  equals: ds
};
let n0 = a0;
const xt = 1, _n = 2, r0 = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, ar = {};
var ze = null;
let jt = null, Pe = null, je = null, $t = null, Tr = 0;
function B1(e, t) {
  const r = Pe, n = ze, l = e.length === 0, u = l ? r0 : {
    owned: null,
    cleanups: null,
    context: null,
    owner: t === void 0 ? n : t
  }, f = l ? e : () => e(() => mt(() => Nn(u)));
  ze = u, Pe = null;
  try {
    return Pt(f, !0);
  } finally {
    Pe = r, ze = n;
  }
}
function D(e, t) {
  t = t ? Object.assign({}, $n, t) : $n;
  const r = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, n = (l) => (typeof l == "function" && (l = l(r.value)), i0(r, l));
  return [o0.bind(r), n];
}
function si(e, t, r) {
  const n = Dn(e, t, !0, xt);
  o1(n);
}
function z(e, t, r) {
  const n = Dn(e, t, !1, xt);
  o1(n);
}
function Ke(e, t, r) {
  n0 = Cs;
  const n = Dn(e, t, !1, xt);
  n.user = !0, $t ? $t.push(n) : o1(n);
}
function ee(e, t, r) {
  r = r ? Object.assign({}, $n, r) : $n;
  const n = Dn(e, t, !0, 0);
  return n.observers = null, n.observerSlots = null, n.comparator = r.equals || void 0, o1(n), o0.bind(n);
}
function fs(e, t, r) {
  let n, l, u;
  arguments.length === 2 && typeof t == "object" || arguments.length === 1 ? (n = !0, l = e, u = t || {}) : (n = e, l = t, u = r || {});
  let f = null, m = ar, p = null, L = !1, x = "initialValue" in u, w = typeof n == "function" && ee(n);
  const K = /* @__PURE__ */ new Set(), [W, ye] = (u.storage || D)(u.initialValue), [R, T] = D(void 0), [E, ne] = D(void 0, {
    equals: !1
  }), [F, U] = D(x ? "ready" : "unresolved");
  if (Re.context) {
    p = `${Re.context.id}${Re.context.count++}`;
    let X;
    u.ssrLoadFrom === "initial" ? m = u.initialValue : Re.load && (X = Re.load(p)) && (m = X[0]);
  }
  function j(X, ae, he, $e) {
    return f === X && (f = null, x = !0, (X === m || ae === m) && u.onHydrated && queueMicrotask(() => u.onHydrated($e, {
      value: ae
    })), m = ar, ce(ae, he)), ae;
  }
  function ce(X, ae) {
    Pt(() => {
      ae === void 0 && ye(() => X), U(ae !== void 0 ? "errored" : "ready"), T(ae);
      for (const he of K.keys())
        he.decrement();
      K.clear();
    }, !1);
  }
  function G() {
    const X = gs, ae = W(), he = R();
    if (he !== void 0 && !f)
      throw he;
    return Pe && !Pe.user && X && si(() => {
      E(), f && (X.resolved || K.has(X) || (X.increment(), K.add(X)));
    }), ae;
  }
  function Z(X = !0) {
    if (X !== !1 && L)
      return;
    L = !1;
    const ae = w ? w() : n;
    if (ae == null || ae === !1) {
      j(f, mt(W));
      return;
    }
    const he = m !== ar ? m : mt(() => l(ae, {
      value: W(),
      refetching: X
    }));
    return typeof he != "object" || !(he && "then" in he) ? (j(f, he, void 0, ae), he) : (f = he, L = !0, queueMicrotask(() => L = !1), Pt(() => {
      U(x ? "refreshing" : "pending"), ne();
    }, !1), he.then(($e) => j(he, $e, void 0, ae), ($e) => j(he, void 0, l0($e), ae)));
  }
  return Object.defineProperties(G, {
    state: {
      get: () => F()
    },
    error: {
      get: () => R()
    },
    loading: {
      get() {
        const X = F();
        return X === "pending" || X === "refreshing";
      }
    },
    latest: {
      get() {
        if (!x)
          return G();
        const X = R();
        if (X && !f)
          throw X;
        return W();
      }
    }
  }), w ? si(() => Z(!1)) : Z(!1), [G, {
    refetch: Z,
    mutate: ye
  }];
}
function mt(e) {
  if (Pe === null)
    return e();
  const t = Pe;
  Pe = null;
  try {
    return e();
  } finally {
    Pe = t;
  }
}
function Sr(e) {
  Ke(() => mt(e));
}
function kt(e) {
  return ze === null || (ze.cleanups === null ? ze.cleanups = [e] : ze.cleanups.push(e)), e;
}
function ms(e) {
  const t = Pe, r = ze;
  return Promise.resolve().then(() => {
    Pe = t, ze = r;
    let n;
    return Pt(e, !1), Pe = ze = null, n ? n.done : void 0;
  });
}
let gs;
function o0() {
  const e = jt;
  if (this.sources && (this.state || e))
    if (this.state === xt || e)
      o1(this);
    else {
      const t = je;
      je = null, Pt(() => xn(this), !1), je = t;
    }
  if (Pe) {
    const t = this.observers ? this.observers.length : 0;
    Pe.sources ? (Pe.sources.push(this), Pe.sourceSlots.push(t)) : (Pe.sources = [this], Pe.sourceSlots = [t]), this.observers ? (this.observers.push(Pe), this.observerSlots.push(Pe.sources.length - 1)) : (this.observers = [Pe], this.observerSlots = [Pe.sources.length - 1]);
  }
  return this.value;
}
function i0(e, t, r) {
  let n = e.value;
  return (!e.comparator || !e.comparator(n, t)) && (e.value = t, e.observers && e.observers.length && Pt(() => {
    for (let l = 0; l < e.observers.length; l += 1) {
      const u = e.observers[l], f = jt && jt.running;
      f && jt.disposed.has(u), (f && !u.tState || !f && !u.state) && (u.pure ? je.push(u) : $t.push(u), u.observers && s0(u)), f || (u.state = xt);
    }
    if (je.length > 1e6)
      throw je = [], new Error();
  }, !1)), t;
}
function o1(e) {
  if (!e.fn)
    return;
  Nn(e);
  const t = ze, r = Pe, n = Tr;
  Pe = ze = e, ys(e, e.value, n), Pe = r, ze = t;
}
function ys(e, t, r) {
  let n;
  try {
    n = e.fn(t);
  } catch (l) {
    e.pure && (e.state = xt, e.owned && e.owned.forEach(Nn), e.owned = null), c0(l);
  }
  (!e.updatedAt || e.updatedAt <= r) && (e.updatedAt != null && "observers" in e ? i0(e, n) : e.value = n, e.updatedAt = r);
}
function Dn(e, t, r, n = xt, l) {
  const u = {
    fn: e,
    state: n,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: ze,
    context: null,
    pure: r
  };
  return ze === null || ze !== r0 && (ze.owned ? ze.owned.push(u) : ze.owned = [u]), u;
}
function kn(e) {
  const t = jt;
  if (e.state === 0 || t)
    return;
  if (e.state === _n || t)
    return xn(e);
  if (e.suspense && mt(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const r = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < Tr); )
    (e.state || t) && r.push(e);
  for (let n = r.length - 1; n >= 0; n--)
    if (e = r[n], e.state === xt || t)
      o1(e);
    else if (e.state === _n || t) {
      const l = je;
      je = null, Pt(() => xn(e, r[0]), !1), je = l;
    }
}
function Pt(e, t) {
  if (je)
    return e();
  let r = !1;
  t || (je = []), $t ? r = !0 : $t = [], Tr++;
  try {
    const n = e();
    return ps(r), n;
  } catch (n) {
    r || ($t = null), je = null, c0(n);
  }
}
function ps(e) {
  if (je && (a0(je), je = null), e)
    return;
  const t = $t;
  $t = null, t.length && Pt(() => n0(t), !1);
}
function a0(e) {
  for (let t = 0; t < e.length; t++)
    kn(e[t]);
}
function Cs(e) {
  let t, r = 0;
  for (t = 0; t < e.length; t++) {
    const n = e[t];
    n.user ? e[r++] = n : kn(n);
  }
  for (Re.context && us(), t = 0; t < r; t++)
    kn(e[t]);
}
function xn(e, t) {
  const r = jt;
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
    const l = e.sources[n];
    l.sources && (l.state === xt || r ? l !== t && kn(l) : (l.state === _n || r) && xn(l, t));
  }
}
function s0(e) {
  const t = jt;
  for (let r = 0; r < e.observers.length; r += 1) {
    const n = e.observers[r];
    (!n.state || t) && (n.state = _n, n.pure ? je.push(n) : $t.push(n), n.observers && s0(n));
  }
}
function Nn(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const r = e.sources.pop(), n = e.sourceSlots.pop(), l = r.observers;
      if (l && l.length) {
        const u = l.pop(), f = r.observerSlots.pop();
        n < l.length && (u.sourceSlots[f] = n, l[n] = u, r.observerSlots[n] = f);
      }
    }
  if (e.owned) {
    for (t = 0; t < e.owned.length; t++)
      Nn(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = 0; t < e.cleanups.length; t++)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function l0(e) {
  return e instanceof Error || typeof e == "string" ? e : new Error("Unknown error");
}
function c0(e) {
  throw e = l0(e), e;
}
const vs = Symbol("fallback");
function li(e) {
  for (let t = 0; t < e.length; t++)
    e[t]();
}
function bs(e, t, r = {}) {
  let n = [], l = [], u = [], f = 0, m = t.length > 1 ? [] : null;
  return kt(() => li(u)), () => {
    let p = e() || [], L, x;
    return p[hs], mt(() => {
      let K = p.length, W, ye, R, T, E, ne, F, U, j;
      if (K === 0)
        f !== 0 && (li(u), u = [], n = [], l = [], f = 0, m && (m = [])), r.fallback && (n = [vs], l[0] = B1((ce) => (u[0] = ce, r.fallback())), f = 1);
      else if (f === 0) {
        for (l = new Array(K), x = 0; x < K; x++)
          n[x] = p[x], l[x] = B1(w);
        f = K;
      } else {
        for (R = new Array(K), T = new Array(K), m && (E = new Array(K)), ne = 0, F = Math.min(f, K); ne < F && n[ne] === p[ne]; ne++)
          ;
        for (F = f - 1, U = K - 1; F >= ne && U >= ne && n[F] === p[U]; F--, U--)
          R[U] = l[F], T[U] = u[F], m && (E[U] = m[F]);
        for (W = /* @__PURE__ */ new Map(), ye = new Array(U + 1), x = U; x >= ne; x--)
          j = p[x], L = W.get(j), ye[x] = L === void 0 ? -1 : L, W.set(j, x);
        for (L = ne; L <= F; L++)
          j = n[L], x = W.get(j), x !== void 0 && x !== -1 ? (R[x] = l[L], T[x] = u[L], m && (E[x] = m[L]), x = ye[x], W.set(j, x)) : u[L]();
        for (x = ne; x < K; x++)
          x in R ? (l[x] = R[x], u[x] = T[x], m && (m[x] = E[x], m[x](x))) : l[x] = B1(w);
        l = l.slice(0, f = K), n = p.slice(0);
      }
      return l;
    });
    function w(K) {
      if (u[x] = K, m) {
        const [W, ye] = D(x);
        return m[x] = ye, t(p[x], W);
      }
      return t(p[x]);
    }
  };
}
function A(e, t) {
  return mt(() => e(t || {}));
}
function dn() {
  return !0;
}
const $s = {
  get(e, t, r) {
    return t === yr ? r : e.get(t);
  },
  has(e, t) {
    return t === yr ? !0 : e.has(t);
  },
  set: dn,
  deleteProperty: dn,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: dn,
      deleteProperty: dn
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function sr(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function u0(...e) {
  let t = !1;
  for (let n = 0; n < e.length; n++) {
    const l = e[n];
    t = t || !!l && yr in l, e[n] = typeof l == "function" ? (t = !0, ee(l)) : l;
  }
  if (t)
    return new Proxy({
      get(n) {
        for (let l = e.length - 1; l >= 0; l--) {
          const u = sr(e[l])[n];
          if (u !== void 0)
            return u;
        }
      },
      has(n) {
        for (let l = e.length - 1; l >= 0; l--)
          if (n in sr(e[l]))
            return !0;
        return !1;
      },
      keys() {
        const n = [];
        for (let l = 0; l < e.length; l++)
          n.push(...Object.keys(sr(e[l])));
        return [...new Set(n)];
      }
    }, $s);
  const r = {};
  for (let n = e.length - 1; n >= 0; n--)
    if (e[n]) {
      const l = Object.getOwnPropertyDescriptors(e[n]);
      for (const u in l)
        u in r || Object.defineProperty(r, u, {
          enumerable: !0,
          get() {
            for (let f = e.length - 1; f >= 0; f--) {
              const m = (e[f] || {})[u];
              if (m !== void 0)
                return m;
            }
          }
        });
    }
  return r;
}
function r1(e) {
  const t = "fallback" in e && {
    fallback: () => e.fallback
  };
  return ee(bs(() => e.each, e.children, t || void 0));
}
function fe(e) {
  let t = !1;
  const r = e.keyed, n = ee(() => e.when, void 0, {
    equals: (l, u) => t ? l === u : !l == !u
  });
  return ee(() => {
    const l = n();
    if (l) {
      const u = e.children, f = typeof u == "function" && u.length > 0;
      return t = r || f, f ? mt(() => u(l)) : u;
    }
    return e.fallback;
  }, void 0, void 0);
}
function _s(e, t, r) {
  let n = r.length, l = t.length, u = n, f = 0, m = 0, p = t[l - 1].nextSibling, L = null;
  for (; f < l || m < u; ) {
    if (t[f] === r[m]) {
      f++, m++;
      continue;
    }
    for (; t[l - 1] === r[u - 1]; )
      l--, u--;
    if (l === f) {
      const x = u < n ? m ? r[m - 1].nextSibling : r[u - m] : p;
      for (; m < u; )
        e.insertBefore(r[m++], x);
    } else if (u === m)
      for (; f < l; )
        (!L || !L.has(t[f])) && t[f].remove(), f++;
    else if (t[f] === r[u - 1] && r[m] === t[l - 1]) {
      const x = t[--l].nextSibling;
      e.insertBefore(r[m++], t[f++].nextSibling), e.insertBefore(r[--u], x), t[l] = r[u];
    } else {
      if (!L) {
        L = /* @__PURE__ */ new Map();
        let w = m;
        for (; w < u; )
          L.set(r[w], w++);
      }
      const x = L.get(t[f]);
      if (x != null)
        if (m < x && x < u) {
          let w = f, K = 1, W;
          for (; ++w < l && w < u && !((W = L.get(t[w])) == null || W !== x + K); )
            K++;
          if (K > x - m) {
            const ye = t[f];
            for (; m < x; )
              e.insertBefore(r[m++], ye);
          } else
            e.replaceChild(r[m++], t[f++]);
        } else
          f++;
      else
        t[f++].remove();
    }
  }
}
const ci = "_$DX_DELEGATE";
function ks(e, t, r, n = {}) {
  let l;
  return B1((u) => {
    l = u, t === document ? e() : C(t, e(), t.firstChild ? null : void 0, r);
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
  const r = t[ci] || (t[ci] = /* @__PURE__ */ new Set());
  for (let n = 0, l = e.length; n < l; n++) {
    const u = e[n];
    r.has(u) || (r.add(u), t.addEventListener(u, xs));
  }
}
function Ne(e, t, r) {
  r == null ? e.removeAttribute(t) : e.setAttribute(t, r);
}
function le(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function dt(e, t, r, n) {
  if (n)
    Array.isArray(r) ? (e[`$$${t}`] = r[0], e[`$$${t}Data`] = r[1]) : e[`$$${t}`] = r;
  else if (Array.isArray(r)) {
    const l = r[0];
    e.addEventListener(t, r[0] = (u) => l.call(e, r[1], u));
  } else
    e.addEventListener(t, r);
}
function gt(e, t, r) {
  if (!t)
    return r ? Ne(e, "style") : t;
  const n = e.style;
  if (typeof t == "string")
    return n.cssText = t;
  typeof r == "string" && (n.cssText = r = void 0), r || (r = {}), t || (t = {});
  let l, u;
  for (u in r)
    t[u] == null && n.removeProperty(u), delete r[u];
  for (u in t)
    l = t[u], l !== r[u] && (n.setProperty(u, l), r[u] = l);
  return r;
}
function _t(e, t, r) {
  return mt(() => e(t, r));
}
function C(e, t, r, n) {
  if (r !== void 0 && !n && (n = []), typeof t != "function")
    return Ln(e, t, n, r);
  z((l) => Ln(e, t(), l, r), n);
}
function xs(e) {
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
  }), Re.registry && !Re.done && (Re.done = !0, document.querySelectorAll("[id^=pl-]").forEach((n) => {
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
function Ln(e, t, r, n, l) {
  for (Re.context && !r && (r = [...e.childNodes]); typeof r == "function"; )
    r = r();
  if (t === r)
    return r;
  const u = typeof t, f = n !== void 0;
  if (e = f && r[0] && r[0].parentNode || e, u === "string" || u === "number") {
    if (Re.context)
      return r;
    if (u === "number" && (t = t.toString()), f) {
      let m = r[0];
      m && m.nodeType === 3 ? m.data = t : m = document.createTextNode(t), r = t1(e, r, n, m);
    } else
      r !== "" && typeof r == "string" ? r = e.firstChild.data = t : r = e.textContent = t;
  } else if (t == null || u === "boolean") {
    if (Re.context)
      return r;
    r = t1(e, r, n);
  } else {
    if (u === "function")
      return z(() => {
        let m = t();
        for (; typeof m == "function"; )
          m = m();
        r = Ln(e, m, r, n);
      }), () => r;
    if (Array.isArray(t)) {
      const m = [], p = r && Array.isArray(r);
      if (pr(m, t, r, l))
        return z(() => r = Ln(e, m, r, n, !0)), () => r;
      if (Re.context) {
        if (!m.length)
          return r;
        for (let L = 0; L < m.length; L++)
          if (m[L].parentNode)
            return r = m;
      }
      if (m.length === 0) {
        if (r = t1(e, r, n), f)
          return r;
      } else
        p ? r.length === 0 ? ui(e, m, n) : _s(e, r, m) : (r && t1(e), ui(e, m));
      r = m;
    } else if (t instanceof Node) {
      if (Re.context && t.parentNode)
        return r = f ? [t] : t;
      if (Array.isArray(r)) {
        if (f)
          return r = t1(e, r, n, t);
        t1(e, r, null, t);
      } else
        r == null || r === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      r = t;
    }
  }
  return r;
}
function pr(e, t, r, n) {
  let l = !1;
  for (let u = 0, f = t.length; u < f; u++) {
    let m = t[u], p = r && r[u];
    if (m instanceof Node)
      e.push(m);
    else if (!(m == null || m === !0 || m === !1))
      if (Array.isArray(m))
        l = pr(e, m, p) || l;
      else if (typeof m == "function")
        if (n) {
          for (; typeof m == "function"; )
            m = m();
          l = pr(e, Array.isArray(m) ? m : [m], Array.isArray(p) ? p : [p]) || l;
        } else
          e.push(m), l = !0;
      else {
        const L = String(m);
        p && p.nodeType === 3 && p.data === L ? e.push(p) : e.push(document.createTextNode(L));
      }
  }
  return l;
}
function ui(e, t, r = null) {
  for (let n = 0, l = t.length; n < l; n++)
    e.insertBefore(t[n], r);
}
function t1(e, t, r, n) {
  if (r === void 0)
    return e.textContent = "";
  const l = n || document.createTextNode("");
  if (t.length) {
    let u = !1;
    for (let f = t.length - 1; f >= 0; f--) {
      const m = t[f];
      if (l !== m) {
        const p = m.parentNode === e;
        !u && !f ? p ? e.replaceChild(l, m) : e.insertBefore(l, r) : p && m.remove();
      } else
        u = !0;
    }
  } else
    e.insertBefore(l, r);
  return [l];
}
const Ls = "http://www.w3.org/2000/svg";
function ws(e, t = !1) {
  return t ? document.createElementNS(Ls, e) : document.createElement(e);
}
function d0(e) {
  const {
    useShadow: t
  } = e, r = document.createTextNode(""), n = e.mount || document.body;
  function l() {
    if (Re.context) {
      const [u, f] = D(!1);
      return queueMicrotask(() => f(!0)), () => u() && e.children;
    } else
      return () => e.children;
  }
  if (n instanceof HTMLHeadElement) {
    const [u, f] = D(!1), m = () => f(!0);
    B1((p) => C(n, () => u() ? p() : l()(), null)), kt(() => {
      Re.context ? queueMicrotask(m) : m();
    });
  } else {
    const u = ws(e.isSVG ? "g" : "div", e.isSVG), f = t && u.attachShadow ? u.attachShadow({
      mode: "open"
    }) : u;
    Object.defineProperty(u, "_$host", {
      get() {
        return r.parentNode;
      },
      configurable: !0
    }), C(f, l()), n.appendChild(u), e.ref && e.ref(u), kt(() => n.removeChild(u));
  }
  return r;
}
var hn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function h0(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var As = typeof hn == "object" && hn && hn.Object === Object && hn, f0 = As, Ts = f0, Ss = typeof self == "object" && self && self.Object === Object && self, Ms = Ts || Ss || Function("return this")(), yt = Ms, Ps = yt, Ds = Ps.Symbol, On = Ds, di = On, m0 = Object.prototype, Ns = m0.hasOwnProperty, Os = m0.toString, O1 = di ? di.toStringTag : void 0;
function Is(e) {
  var t = Ns.call(e, O1), r = e[O1];
  try {
    e[O1] = void 0;
    var n = !0;
  } catch {
  }
  var l = Os.call(e);
  return n && (t ? e[O1] = r : delete e[O1]), l;
}
var Es = Is, Bs = Object.prototype, Fs = Bs.toString;
function zs(e) {
  return Fs.call(e);
}
var Us = zs, hi = On, Rs = Es, Vs = Us, Ks = "[object Null]", js = "[object Undefined]", fi = hi ? hi.toStringTag : void 0;
function Qs(e) {
  return e == null ? e === void 0 ? js : Ks : fi && fi in Object(e) ? Rs(e) : Vs(e);
}
var z1 = Qs;
function Zs(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var i1 = Zs, Hs = z1, Ws = i1, Ys = "[object AsyncFunction]", qs = "[object Function]", Gs = "[object GeneratorFunction]", Xs = "[object Proxy]";
function Js(e) {
  if (!Ws(e))
    return !1;
  var t = Hs(e);
  return t == qs || t == Gs || t == Ys || t == Xs;
}
var g0 = Js, e9 = yt, t9 = e9["__core-js_shared__"], n9 = t9, lr = n9, mi = function() {
  var e = /[^.]+$/.exec(lr && lr.keys && lr.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function r9(e) {
  return !!mi && mi in e;
}
var o9 = r9, i9 = Function.prototype, a9 = i9.toString;
function s9(e) {
  if (e != null) {
    try {
      return a9.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var y0 = s9, l9 = g0, c9 = o9, u9 = i1, d9 = y0, h9 = /[\\^$.*+?()[\]{}|]/g, f9 = /^\[object .+?Constructor\]$/, m9 = Function.prototype, g9 = Object.prototype, y9 = m9.toString, p9 = g9.hasOwnProperty, C9 = RegExp(
  "^" + y9.call(p9).replace(h9, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function v9(e) {
  if (!u9(e) || c9(e))
    return !1;
  var t = l9(e) ? C9 : f9;
  return t.test(d9(e));
}
var b9 = v9;
function $9(e, t) {
  return e == null ? void 0 : e[t];
}
var _9 = $9, k9 = b9, x9 = _9;
function L9(e, t) {
  var r = x9(e, t);
  return k9(r) ? r : void 0;
}
var Qt = L9, w9 = Qt, A9 = function() {
  try {
    var e = w9(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), T9 = A9, gi = T9;
function S9(e, t, r) {
  t == "__proto__" && gi ? gi(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var p0 = S9;
function M9(e, t) {
  return e === t || e !== e && t !== t;
}
var C0 = M9, P9 = p0, D9 = C0, N9 = Object.prototype, O9 = N9.hasOwnProperty;
function I9(e, t, r) {
  var n = e[t];
  (!(O9.call(e, t) && D9(n, r)) || r === void 0 && !(t in e)) && P9(e, t, r);
}
var Mr = I9, E9 = Array.isArray, a1 = E9;
function B9(e) {
  return e != null && typeof e == "object";
}
var s1 = B9, F9 = z1, z9 = s1, U9 = "[object Symbol]";
function R9(e) {
  return typeof e == "symbol" || z9(e) && F9(e) == U9;
}
var Pr = R9, V9 = a1, K9 = Pr, j9 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Q9 = /^\w*$/;
function Z9(e, t) {
  if (V9(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || K9(e) ? !0 : Q9.test(e) || !j9.test(e) || t != null && e in Object(t);
}
var H9 = Z9, W9 = Qt, Y9 = W9(Object, "create"), In = Y9, yi = In;
function q9() {
  this.__data__ = yi ? yi(null) : {}, this.size = 0;
}
var G9 = q9;
function X9(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var J9 = X9, e5 = In, t5 = "__lodash_hash_undefined__", n5 = Object.prototype, r5 = n5.hasOwnProperty;
function o5(e) {
  var t = this.__data__;
  if (e5) {
    var r = t[e];
    return r === t5 ? void 0 : r;
  }
  return r5.call(t, e) ? t[e] : void 0;
}
var i5 = o5, a5 = In, s5 = Object.prototype, l5 = s5.hasOwnProperty;
function c5(e) {
  var t = this.__data__;
  return a5 ? t[e] !== void 0 : l5.call(t, e);
}
var u5 = c5, d5 = In, h5 = "__lodash_hash_undefined__";
function f5(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = d5 && t === void 0 ? h5 : t, this;
}
var m5 = f5, g5 = G9, y5 = J9, p5 = i5, C5 = u5, v5 = m5;
function l1(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
l1.prototype.clear = g5;
l1.prototype.delete = y5;
l1.prototype.get = p5;
l1.prototype.has = C5;
l1.prototype.set = v5;
var b5 = l1;
function $5() {
  this.__data__ = [], this.size = 0;
}
var _5 = $5, k5 = C0;
function x5(e, t) {
  for (var r = e.length; r--; )
    if (k5(e[r][0], t))
      return r;
  return -1;
}
var En = x5, L5 = En, w5 = Array.prototype, A5 = w5.splice;
function T5(e) {
  var t = this.__data__, r = L5(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : A5.call(t, r, 1), --this.size, !0;
}
var S5 = T5, M5 = En;
function P5(e) {
  var t = this.__data__, r = M5(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var D5 = P5, N5 = En;
function O5(e) {
  return N5(this.__data__, e) > -1;
}
var I5 = O5, E5 = En;
function B5(e, t) {
  var r = this.__data__, n = E5(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
var F5 = B5, z5 = _5, U5 = S5, R5 = D5, V5 = I5, K5 = F5;
function c1(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
c1.prototype.clear = z5;
c1.prototype.delete = U5;
c1.prototype.get = R5;
c1.prototype.has = V5;
c1.prototype.set = K5;
var Bn = c1, j5 = Qt, Q5 = yt, Z5 = j5(Q5, "Map"), Dr = Z5, pi = b5, H5 = Bn, W5 = Dr;
function Y5() {
  this.size = 0, this.__data__ = {
    hash: new pi(),
    map: new (W5 || H5)(),
    string: new pi()
  };
}
var q5 = Y5;
function G5(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var X5 = G5, J5 = X5;
function el(e, t) {
  var r = e.__data__;
  return J5(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var Fn = el, tl = Fn;
function nl(e) {
  var t = tl(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var rl = nl, ol = Fn;
function il(e) {
  return ol(this, e).get(e);
}
var al = il, sl = Fn;
function ll(e) {
  return sl(this, e).has(e);
}
var cl = ll, ul = Fn;
function dl(e, t) {
  var r = ul(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
var hl = dl, fl = q5, ml = rl, gl = al, yl = cl, pl = hl;
function u1(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
u1.prototype.clear = fl;
u1.prototype.delete = ml;
u1.prototype.get = gl;
u1.prototype.has = yl;
u1.prototype.set = pl;
var v0 = u1, b0 = v0, Cl = "Expected a function";
function Nr(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Cl);
  var r = function() {
    var n = arguments, l = t ? t.apply(this, n) : n[0], u = r.cache;
    if (u.has(l))
      return u.get(l);
    var f = e.apply(this, n);
    return r.cache = u.set(l, f) || u, f;
  };
  return r.cache = new (Nr.Cache || b0)(), r;
}
Nr.Cache = b0;
var vl = Nr, bl = vl, $l = 500;
function _l(e) {
  var t = bl(e, function(n) {
    return r.size === $l && r.clear(), n;
  }), r = t.cache;
  return t;
}
var kl = _l, xl = kl, Ll = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, wl = /\\(\\)?/g, Al = xl(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(Ll, function(r, n, l, u) {
    t.push(l ? u.replace(wl, "$1") : n || r);
  }), t;
}), Tl = Al;
function Sl(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, l = Array(n); ++r < n; )
    l[r] = t(e[r], r, e);
  return l;
}
var Ml = Sl, Ci = On, Pl = Ml, Dl = a1, Nl = Pr, Ol = 1 / 0, vi = Ci ? Ci.prototype : void 0, bi = vi ? vi.toString : void 0;
function $0(e) {
  if (typeof e == "string")
    return e;
  if (Dl(e))
    return Pl(e, $0) + "";
  if (Nl(e))
    return bi ? bi.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -Ol ? "-0" : t;
}
var Il = $0, El = Il;
function Bl(e) {
  return e == null ? "" : El(e);
}
var Fl = Bl, zl = a1, Ul = H9, Rl = Tl, Vl = Fl;
function Kl(e, t) {
  return zl(e) ? e : Ul(e, t) ? [e] : Rl(Vl(e));
}
var jl = Kl, Ql = 9007199254740991, Zl = /^(?:0|[1-9]\d*)$/;
function Hl(e, t) {
  var r = typeof e;
  return t = t ?? Ql, !!t && (r == "number" || r != "symbol" && Zl.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var _0 = Hl, Wl = Pr, Yl = 1 / 0;
function ql(e) {
  if (typeof e == "string" || Wl(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -Yl ? "-0" : t;
}
var Gl = ql, Xl = Mr, Jl = jl, e2 = _0, $i = i1, t2 = Gl;
function n2(e, t, r, n) {
  if (!$i(e))
    return e;
  t = Jl(t, e);
  for (var l = -1, u = t.length, f = u - 1, m = e; m != null && ++l < u; ) {
    var p = t2(t[l]), L = r;
    if (p === "__proto__" || p === "constructor" || p === "prototype")
      return e;
    if (l != f) {
      var x = m[p];
      L = n ? n(x, p, m) : void 0, L === void 0 && (L = $i(x) ? x : e2(t[l + 1]) ? [] : {});
    }
    Xl(m, p, L), m = m[p];
  }
  return e;
}
var r2 = n2, o2 = r2;
function i2(e, t, r) {
  return e == null ? e : o2(e, t, r);
}
var a2 = i2;
const Fe = /* @__PURE__ */ h0(a2);
var s2 = Bn;
function l2() {
  this.__data__ = new s2(), this.size = 0;
}
var c2 = l2;
function u2(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
var d2 = u2;
function h2(e) {
  return this.__data__.get(e);
}
var f2 = h2;
function m2(e) {
  return this.__data__.has(e);
}
var g2 = m2, y2 = Bn, p2 = Dr, C2 = v0, v2 = 200;
function b2(e, t) {
  var r = this.__data__;
  if (r instanceof y2) {
    var n = r.__data__;
    if (!p2 || n.length < v2 - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new C2(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
var $2 = b2, _2 = Bn, k2 = c2, x2 = d2, L2 = f2, w2 = g2, A2 = $2;
function d1(e) {
  var t = this.__data__ = new _2(e);
  this.size = t.size;
}
d1.prototype.clear = k2;
d1.prototype.delete = x2;
d1.prototype.get = L2;
d1.prototype.has = w2;
d1.prototype.set = A2;
var T2 = d1;
function S2(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var M2 = S2, P2 = Mr, D2 = p0;
function N2(e, t, r, n) {
  var l = !r;
  r || (r = {});
  for (var u = -1, f = t.length; ++u < f; ) {
    var m = t[u], p = n ? n(r[m], e[m], m, r, e) : void 0;
    p === void 0 && (p = e[m]), l ? D2(r, m, p) : P2(r, m, p);
  }
  return r;
}
var zn = N2;
function O2(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var I2 = O2, E2 = z1, B2 = s1, F2 = "[object Arguments]";
function z2(e) {
  return B2(e) && E2(e) == F2;
}
var U2 = z2, _i = U2, R2 = s1, k0 = Object.prototype, V2 = k0.hasOwnProperty, K2 = k0.propertyIsEnumerable, j2 = _i(function() {
  return arguments;
}()) ? _i : function(e) {
  return R2(e) && V2.call(e, "callee") && !K2.call(e, "callee");
}, Q2 = j2, wn = { exports: {} };
function Z2() {
  return !1;
}
var H2 = Z2;
wn.exports;
(function(e, t) {
  var r = yt, n = H2, l = t && !t.nodeType && t, u = l && !0 && e && !e.nodeType && e, f = u && u.exports === l, m = f ? r.Buffer : void 0, p = m ? m.isBuffer : void 0, L = p || n;
  e.exports = L;
})(wn, wn.exports);
var x0 = wn.exports, W2 = 9007199254740991;
function Y2(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= W2;
}
var L0 = Y2, q2 = z1, G2 = L0, X2 = s1, J2 = "[object Arguments]", e6 = "[object Array]", t6 = "[object Boolean]", n6 = "[object Date]", r6 = "[object Error]", o6 = "[object Function]", i6 = "[object Map]", a6 = "[object Number]", s6 = "[object Object]", l6 = "[object RegExp]", c6 = "[object Set]", u6 = "[object String]", d6 = "[object WeakMap]", h6 = "[object ArrayBuffer]", f6 = "[object DataView]", m6 = "[object Float32Array]", g6 = "[object Float64Array]", y6 = "[object Int8Array]", p6 = "[object Int16Array]", C6 = "[object Int32Array]", v6 = "[object Uint8Array]", b6 = "[object Uint8ClampedArray]", $6 = "[object Uint16Array]", _6 = "[object Uint32Array]", Me = {};
Me[m6] = Me[g6] = Me[y6] = Me[p6] = Me[C6] = Me[v6] = Me[b6] = Me[$6] = Me[_6] = !0;
Me[J2] = Me[e6] = Me[h6] = Me[t6] = Me[f6] = Me[n6] = Me[r6] = Me[o6] = Me[i6] = Me[a6] = Me[s6] = Me[l6] = Me[c6] = Me[u6] = Me[d6] = !1;
function k6(e) {
  return X2(e) && G2(e.length) && !!Me[q2(e)];
}
var x6 = k6;
function L6(e) {
  return function(t) {
    return e(t);
  };
}
var Or = L6, An = { exports: {} };
An.exports;
(function(e, t) {
  var r = f0, n = t && !t.nodeType && t, l = n && !0 && e && !e.nodeType && e, u = l && l.exports === n, f = u && r.process, m = function() {
    try {
      var p = l && l.require && l.require("util").types;
      return p || f && f.binding && f.binding("util");
    } catch {
    }
  }();
  e.exports = m;
})(An, An.exports);
var Ir = An.exports, w6 = x6, A6 = Or, ki = Ir, xi = ki && ki.isTypedArray, T6 = xi ? A6(xi) : w6, S6 = T6, M6 = I2, P6 = Q2, D6 = a1, N6 = x0, O6 = _0, I6 = S6, E6 = Object.prototype, B6 = E6.hasOwnProperty;
function F6(e, t) {
  var r = D6(e), n = !r && P6(e), l = !r && !n && N6(e), u = !r && !n && !l && I6(e), f = r || n || l || u, m = f ? M6(e.length, String) : [], p = m.length;
  for (var L in e)
    (t || B6.call(e, L)) && !(f && // Safari 9 has enumerable `arguments.length` in strict mode.
    (L == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    l && (L == "offset" || L == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    u && (L == "buffer" || L == "byteLength" || L == "byteOffset") || // Skip index properties.
    O6(L, p))) && m.push(L);
  return m;
}
var w0 = F6, z6 = Object.prototype;
function U6(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || z6;
  return e === r;
}
var Er = U6;
function R6(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var A0 = R6, V6 = A0, K6 = V6(Object.keys, Object), j6 = K6, Q6 = Er, Z6 = j6, H6 = Object.prototype, W6 = H6.hasOwnProperty;
function Y6(e) {
  if (!Q6(e))
    return Z6(e);
  var t = [];
  for (var r in Object(e))
    W6.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
var q6 = Y6, G6 = g0, X6 = L0;
function J6(e) {
  return e != null && X6(e.length) && !G6(e);
}
var T0 = J6, e3 = w0, t3 = q6, n3 = T0;
function r3(e) {
  return n3(e) ? e3(e) : t3(e);
}
var Br = r3, o3 = zn, i3 = Br;
function a3(e, t) {
  return e && o3(t, i3(t), e);
}
var s3 = a3;
function l3(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var c3 = l3, u3 = i1, d3 = Er, h3 = c3, f3 = Object.prototype, m3 = f3.hasOwnProperty;
function g3(e) {
  if (!u3(e))
    return h3(e);
  var t = d3(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !m3.call(e, n)) || r.push(n);
  return r;
}
var y3 = g3, p3 = w0, C3 = y3, v3 = T0;
function b3(e) {
  return v3(e) ? p3(e, !0) : C3(e);
}
var Fr = b3, $3 = zn, _3 = Fr;
function k3(e, t) {
  return e && $3(t, _3(t), e);
}
var x3 = k3, Tn = { exports: {} };
Tn.exports;
(function(e, t) {
  var r = yt, n = t && !t.nodeType && t, l = n && !0 && e && !e.nodeType && e, u = l && l.exports === n, f = u ? r.Buffer : void 0, m = f ? f.allocUnsafe : void 0;
  function p(L, x) {
    if (x)
      return L.slice();
    var w = L.length, K = m ? m(w) : new L.constructor(w);
    return L.copy(K), K;
  }
  e.exports = p;
})(Tn, Tn.exports);
var L3 = Tn.exports;
function w3(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
var A3 = w3;
function T3(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, l = 0, u = []; ++r < n; ) {
    var f = e[r];
    t(f, r, e) && (u[l++] = f);
  }
  return u;
}
var S3 = T3;
function M3() {
  return [];
}
var S0 = M3, P3 = S3, D3 = S0, N3 = Object.prototype, O3 = N3.propertyIsEnumerable, Li = Object.getOwnPropertySymbols, I3 = Li ? function(e) {
  return e == null ? [] : (e = Object(e), P3(Li(e), function(t) {
    return O3.call(e, t);
  }));
} : D3, zr = I3, E3 = zn, B3 = zr;
function F3(e, t) {
  return E3(e, B3(e), t);
}
var z3 = F3;
function U3(e, t) {
  for (var r = -1, n = t.length, l = e.length; ++r < n; )
    e[l + r] = t[r];
  return e;
}
var M0 = U3, R3 = A0, V3 = R3(Object.getPrototypeOf, Object), P0 = V3, K3 = M0, j3 = P0, Q3 = zr, Z3 = S0, H3 = Object.getOwnPropertySymbols, W3 = H3 ? function(e) {
  for (var t = []; e; )
    K3(t, Q3(e)), e = j3(e);
  return t;
} : Z3, D0 = W3, Y3 = zn, q3 = D0;
function G3(e, t) {
  return Y3(e, q3(e), t);
}
var X3 = G3, J3 = M0, ec = a1;
function tc(e, t, r) {
  var n = t(e);
  return ec(e) ? n : J3(n, r(e));
}
var N0 = tc, nc = N0, rc = zr, oc = Br;
function ic(e) {
  return nc(e, oc, rc);
}
var ac = ic, sc = N0, lc = D0, cc = Fr;
function uc(e) {
  return sc(e, cc, lc);
}
var dc = uc, hc = Qt, fc = yt, mc = hc(fc, "DataView"), gc = mc, yc = Qt, pc = yt, Cc = yc(pc, "Promise"), vc = Cc, bc = Qt, $c = yt, _c = bc($c, "Set"), kc = _c, xc = Qt, Lc = yt, wc = xc(Lc, "WeakMap"), Ac = wc, Cr = gc, vr = Dr, br = vc, $r = kc, _r = Ac, O0 = z1, h1 = y0, wi = "[object Map]", Tc = "[object Object]", Ai = "[object Promise]", Ti = "[object Set]", Si = "[object WeakMap]", Mi = "[object DataView]", Sc = h1(Cr), Mc = h1(vr), Pc = h1(br), Dc = h1($r), Nc = h1(_r), Vt = O0;
(Cr && Vt(new Cr(new ArrayBuffer(1))) != Mi || vr && Vt(new vr()) != wi || br && Vt(br.resolve()) != Ai || $r && Vt(new $r()) != Ti || _r && Vt(new _r()) != Si) && (Vt = function(e) {
  var t = O0(e), r = t == Tc ? e.constructor : void 0, n = r ? h1(r) : "";
  if (n)
    switch (n) {
      case Sc:
        return Mi;
      case Mc:
        return wi;
      case Pc:
        return Ai;
      case Dc:
        return Ti;
      case Nc:
        return Si;
    }
  return t;
});
var Ur = Vt, Oc = Object.prototype, Ic = Oc.hasOwnProperty;
function Ec(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && Ic.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
var Bc = Ec, Fc = yt, zc = Fc.Uint8Array, Uc = zc, Pi = Uc;
function Rc(e) {
  var t = new e.constructor(e.byteLength);
  return new Pi(t).set(new Pi(e)), t;
}
var Rr = Rc, Vc = Rr;
function Kc(e, t) {
  var r = t ? Vc(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var jc = Kc, Qc = /\w*$/;
function Zc(e) {
  var t = new e.constructor(e.source, Qc.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var Hc = Zc, Di = On, Ni = Di ? Di.prototype : void 0, Oi = Ni ? Ni.valueOf : void 0;
function Wc(e) {
  return Oi ? Object(Oi.call(e)) : {};
}
var Yc = Wc, qc = Rr;
function Gc(e, t) {
  var r = t ? qc(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
var Xc = Gc, Jc = Rr, e8 = jc, t8 = Hc, n8 = Yc, r8 = Xc, o8 = "[object Boolean]", i8 = "[object Date]", a8 = "[object Map]", s8 = "[object Number]", l8 = "[object RegExp]", c8 = "[object Set]", u8 = "[object String]", d8 = "[object Symbol]", h8 = "[object ArrayBuffer]", f8 = "[object DataView]", m8 = "[object Float32Array]", g8 = "[object Float64Array]", y8 = "[object Int8Array]", p8 = "[object Int16Array]", C8 = "[object Int32Array]", v8 = "[object Uint8Array]", b8 = "[object Uint8ClampedArray]", $8 = "[object Uint16Array]", _8 = "[object Uint32Array]";
function k8(e, t, r) {
  var n = e.constructor;
  switch (t) {
    case h8:
      return Jc(e);
    case o8:
    case i8:
      return new n(+e);
    case f8:
      return e8(e, r);
    case m8:
    case g8:
    case y8:
    case p8:
    case C8:
    case v8:
    case b8:
    case $8:
    case _8:
      return r8(e, r);
    case a8:
      return new n();
    case s8:
    case u8:
      return new n(e);
    case l8:
      return t8(e);
    case c8:
      return new n();
    case d8:
      return n8(e);
  }
}
var x8 = k8, L8 = i1, Ii = Object.create, w8 = function() {
  function e() {
  }
  return function(t) {
    if (!L8(t))
      return {};
    if (Ii)
      return Ii(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}(), A8 = w8, T8 = A8, S8 = P0, M8 = Er;
function P8(e) {
  return typeof e.constructor == "function" && !M8(e) ? T8(S8(e)) : {};
}
var D8 = P8, N8 = Ur, O8 = s1, I8 = "[object Map]";
function E8(e) {
  return O8(e) && N8(e) == I8;
}
var B8 = E8, F8 = B8, z8 = Or, Ei = Ir, Bi = Ei && Ei.isMap, U8 = Bi ? z8(Bi) : F8, R8 = U8, V8 = Ur, K8 = s1, j8 = "[object Set]";
function Q8(e) {
  return K8(e) && V8(e) == j8;
}
var Z8 = Q8, H8 = Z8, W8 = Or, Fi = Ir, zi = Fi && Fi.isSet, Y8 = zi ? W8(zi) : H8, q8 = Y8, G8 = T2, X8 = M2, J8 = Mr, e7 = s3, t7 = x3, n7 = L3, r7 = A3, o7 = z3, i7 = X3, a7 = ac, s7 = dc, l7 = Ur, c7 = Bc, u7 = x8, d7 = D8, h7 = a1, f7 = x0, m7 = R8, g7 = i1, y7 = q8, p7 = Br, C7 = Fr, v7 = 1, b7 = 2, $7 = 4, I0 = "[object Arguments]", _7 = "[object Array]", k7 = "[object Boolean]", x7 = "[object Date]", L7 = "[object Error]", E0 = "[object Function]", w7 = "[object GeneratorFunction]", A7 = "[object Map]", T7 = "[object Number]", B0 = "[object Object]", S7 = "[object RegExp]", M7 = "[object Set]", P7 = "[object String]", D7 = "[object Symbol]", N7 = "[object WeakMap]", O7 = "[object ArrayBuffer]", I7 = "[object DataView]", E7 = "[object Float32Array]", B7 = "[object Float64Array]", F7 = "[object Int8Array]", z7 = "[object Int16Array]", U7 = "[object Int32Array]", R7 = "[object Uint8Array]", V7 = "[object Uint8ClampedArray]", K7 = "[object Uint16Array]", j7 = "[object Uint32Array]", Le = {};
Le[I0] = Le[_7] = Le[O7] = Le[I7] = Le[k7] = Le[x7] = Le[E7] = Le[B7] = Le[F7] = Le[z7] = Le[U7] = Le[A7] = Le[T7] = Le[B0] = Le[S7] = Le[M7] = Le[P7] = Le[D7] = Le[R7] = Le[V7] = Le[K7] = Le[j7] = !0;
Le[L7] = Le[E0] = Le[N7] = !1;
function Cn(e, t, r, n, l, u) {
  var f, m = t & v7, p = t & b7, L = t & $7;
  if (r && (f = l ? r(e, n, l, u) : r(e)), f !== void 0)
    return f;
  if (!g7(e))
    return e;
  var x = h7(e);
  if (x) {
    if (f = c7(e), !m)
      return r7(e, f);
  } else {
    var w = l7(e), K = w == E0 || w == w7;
    if (f7(e))
      return n7(e, m);
    if (w == B0 || w == I0 || K && !l) {
      if (f = p || K ? {} : d7(e), !m)
        return p ? i7(e, t7(f, e)) : o7(e, e7(f, e));
    } else {
      if (!Le[w])
        return l ? e : {};
      f = u7(e, w, m);
    }
  }
  u || (u = new G8());
  var W = u.get(e);
  if (W)
    return W;
  u.set(e, f), y7(e) ? e.forEach(function(T) {
    f.add(Cn(T, t, r, T, e, u));
  }) : m7(e) && e.forEach(function(T, E) {
    f.set(E, Cn(T, t, r, E, e, u));
  });
  var ye = L ? p ? s7 : a7 : p ? C7 : p7, R = x ? void 0 : ye(e);
  return X8(R || e, function(T, E) {
    R && (E = T, T = e[E]), J8(f, E, Cn(T, t, r, E, e, u));
  }), f;
}
var Q7 = Cn, Z7 = Q7, H7 = 1, W7 = 4;
function Y7(e) {
  return Z7(e, H7 | W7);
}
var q7 = Y7;
const G7 = /* @__PURE__ */ h0(q7), X7 = /* @__PURE__ */ $("<button></button>"), J7 = (e) => (() => {
  const t = X7.cloneNode(!0);
  return dt(t, "click", e.onClick, !0), C(t, () => e.children), z((r) => {
    const n = e.style, l = `klinecharts-pro-button ${e.type ?? "confirm"} ${e.class ?? ""}`;
    return r._v$ = gt(t, n, r._v$), l !== r._v$2 && le(t, r._v$2 = l), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
Ye(["click"]);
const e4 = /* @__PURE__ */ $('<svg viewBox="0 0 1024 1024" class="icon"><path d="M810.666667 128H213.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v597.333334c0 46.933333 38.4 85.333333 85.333333 85.333333h597.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V213.333333c0-46.933333-38.4-85.333333-85.333333-85.333333z m-353.706667 567.04a42.496 42.496 0 0 1-60.16 0L243.626667 541.866667c-8.106667-8.106667-12.373333-18.773333-12.373334-29.866667s4.693333-22.186667 12.373334-29.866667a42.496 42.496 0 0 1 60.16 0L426.666667 604.586667l293.546666-293.546667a42.496 42.496 0 1 1 60.16 60.16l-323.413333 323.84z"></path></svg>'), t4 = /* @__PURE__ */ $('<svg viewBox="0 0 1024 1024" class="icon"><path d="M245.333333 128h533.333334A117.333333 117.333333 0 0 1 896 245.333333v533.333334A117.333333 117.333333 0 0 1 778.666667 896H245.333333A117.333333 117.333333 0 0 1 128 778.666667V245.333333A117.333333 117.333333 0 0 1 245.333333 128z m0 64c-29.44 0-53.333333 23.893333-53.333333 53.333333v533.333334c0 29.44 23.893333 53.333333 53.333333 53.333333h533.333334c29.44 0 53.333333-23.893333 53.333333-53.333333V245.333333c0-29.44-23.893333-53.333333-53.333333-53.333333H245.333333z"></path></svg>'), n4 = /* @__PURE__ */ $("<div></div>"), r4 = /* @__PURE__ */ $('<span class="label"></span>'), o4 = () => e4.cloneNode(!0), i4 = () => t4.cloneNode(!0), Ui = (e) => {
  const [t, r] = D(e.checked ?? !1);
  return Ke(() => {
    "checked" in e && r(e.checked);
  }), (() => {
    const n = n4.cloneNode(!0);
    return n.$$click = (l) => {
      const u = !t();
      e.onChange && e.onChange(u), r(u);
    }, C(n, (() => {
      const l = ee(() => !!t());
      return () => l() ? A(o4, {}) : A(i4, {});
    })(), null), C(n, (() => {
      const l = ee(() => !!e.label);
      return () => l() && (() => {
        const u = r4.cloneNode(!0);
        return C(u, () => e.label), u;
      })();
    })(), null), z((l) => {
      const u = e.style, f = `klinecharts-pro-checkbox ${t() && "checked" || ""} ${e.class || ""}`;
      return l._v$ = gt(n, u, l._v$), f !== l._v$2 && le(n, l._v$2 = f), l;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), n;
  })();
};
Ye(["click"]);
const a4 = /* @__PURE__ */ $('<div class="klinecharts-pro-loading"><i class="circle1"></i><i class="circle2"></i><i class="circle3"></i></div>'), F0 = () => a4.cloneNode(!0), s4 = /* @__PURE__ */ $('<div class="klinecharts-pro-empty"><svg class="icon" viewBox="0 0 1024 1024"><path d="M855.6 427.2H168.5c-12.7 0-24.4 6.9-30.6 18L4.4 684.7C1.5 689.9 0 695.8 0 701.8v287.1c0 19.4 15.7 35.1 35.1 35.1H989c19.4 0 35.1-15.7 35.1-35.1V701.8c0-6-1.5-11.8-4.4-17.1L886.2 445.2c-6.2-11.1-17.9-18-30.6-18zM673.4 695.6c-16.5 0-30.8 11.5-34.3 27.7-12.7 58.5-64.8 102.3-127.2 102.3s-114.5-43.8-127.2-102.3c-3.5-16.1-17.8-27.7-34.3-27.7H119c-26.4 0-43.3-28-31.1-51.4l81.7-155.8c6.1-11.6 18-18.8 31.1-18.8h622.4c13 0 25 7.2 31.1 18.8l81.7 155.8c12.2 23.4-4.7 51.4-31.1 51.4H673.4zM819.9 209.5c-1-1.8-2.1-3.7-3.2-5.5-9.8-16.6-31.1-22.2-47.8-12.6L648.5 261c-17 9.8-22.7 31.6-12.6 48.4 0.9 1.4 1.7 2.9 2.5 4.4 9.5 17 31.2 22.8 48 13L807 257.3c16.7-9.7 22.4-31 12.9-47.8zM375.4 261.1L255 191.6c-16.7-9.6-38-4-47.8 12.6-1.1 1.8-2.1 3.6-3.2 5.5-9.5 16.8-3.8 38.1 12.9 47.8L337.3 327c16.9 9.7 38.6 4 48-13.1 0.8-1.5 1.7-2.9 2.5-4.4 10.2-16.8 4.5-38.6-12.4-48.4zM512 239.3h2.5c19.5 0.3 35.5-15.5 35.5-35.1v-139c0-19.3-15.6-34.9-34.8-35.1h-6.4C489.6 30.3 474 46 474 65.2v139c0 19.5 15.9 35.4 35.5 35.1h2.5z"></path></svg></div>'), l4 = () => s4.cloneNode(!0), c4 = /* @__PURE__ */ $("<ul></ul>"), u4 = /* @__PURE__ */ $("<li></li>"), Sn = (e) => (() => {
  const t = c4.cloneNode(!0);
  return C(t, A(fe, {
    get when() {
      return e.loading;
    },
    get children() {
      return A(F0, {});
    }
  }), null), C(t, A(fe, {
    get when() {
      var r;
      return !e.loading && !e.children && !((r = e.dataSource) != null && r.length);
    },
    get children() {
      return A(l4, {});
    }
  }), null), C(t, A(fe, {
    get when() {
      return e.children;
    },
    get children() {
      return e.children;
    }
  }), null), C(t, A(fe, {
    get when() {
      return !e.children;
    },
    get children() {
      var r;
      return (r = e.dataSource) == null ? void 0 : r.map((n) => {
        var l;
        return ((l = e.renderItem) == null ? void 0 : l.call(e, n)) ?? u4.cloneNode(!0);
      });
    }
  }), null), z((r) => {
    const n = e.style, l = `klinecharts-pro-list ${e.class ?? ""}`;
    return r._v$ = gt(t, n, r._v$), l !== r._v$2 && le(t, r._v$2 = l), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})(), d4 = /* @__PURE__ */ $('<div><div><div class="title-container"><button type="button" class="close-button chart-model-close-btn"><svg class="close-icon" viewBox="0 0 1024 1024"><path d="M934.184927 199.723787 622.457206 511.452531l311.727721 311.703161c14.334473 14.229073 23.069415 33.951253 23.069415 55.743582 0 43.430138-35.178197 78.660524-78.735226 78.660524-21.664416 0-41.361013-8.865925-55.642275-23.069415L511.149121 622.838388 199.420377 934.490384c-14.204513 14.20349-33.901111 23.069415-55.642275 23.069415-43.482327 0-78.737272-35.230386-78.737272-78.660524 0-21.792329 8.864902-41.513486 23.094998-55.743582l311.677579-311.703161L88.135828 199.723787c-14.230096-14.255679-23.094998-33.92567-23.094998-55.642275 0-43.430138 35.254945-78.762855 78.737272-78.762855 21.741163 0 41.437761 8.813736 55.642275 23.069415l311.727721 311.727721L822.876842 88.389096c14.281261-14.255679 33.977859-23.069415 55.642275-23.069415 43.557028 0 78.735226 35.332716 78.735226 78.762855C957.254342 165.798117 948.5194 185.468109 934.184927 199.723787"></path></svg></button></div><div></div></div></div>'), h4 = /* @__PURE__ */ $("<div></div>"), Dt = (e) => (() => {
  const t = d4.cloneNode(!0), r = t.firstChild, n = r.firstChild, l = n.firstChild, u = n.nextSibling;
  return t.$$click = (f) => {
    f.target === f.currentTarget && e.onClose && e.onClose();
  }, C(n, () => e.title, l), dt(l, "click", e.onClose, !0), C(u, () => e.children), C(r, (() => {
    const f = ee(() => !!(e.buttons && e.buttons.length > 0));
    return () => f() && (() => {
      const m = h4.cloneNode(!0);
      return C(m, () => e.buttons.map((p) => A(J7, u0(p, {
        get style() {
          return {
            ...e.minButtonWidth ? {
              "min-width": `${e.minButtonWidth}px`
            } : {},
            width: "auto"
          };
        },
        get children() {
          return p.children;
        }
      })))), z((p) => {
        const L = `button-container ${e.buttonContainerClass ?? ""}`, x = e.btnParentStyle, w = !!e.isMobile;
        return L !== p._v$11 && le(m, p._v$11 = L), p._v$12 = gt(m, x, p._v$12), w !== p._v$13 && m.classList.toggle("mobile-buttons", p._v$13 = w), p;
      }, {
        _v$11: void 0,
        _v$12: void 0,
        _v$13: void 0
      }), m;
    })();
  })(), null), z((f) => {
    const m = `klinecharts-pro-modal ${e.class ?? ""}`, p = !!e.isMobile, L = e.isMobile ? "100%" : `${e.width ?? 400}px`, x = (e.isMobile, "auto"), w = e.isMobile ? "60vh" : "90vh", K = `inner ${e.innerClass ?? ""}`, W = !!e.isMobile, ye = !!e.isMobile, R = `content-container ${e.contentClass ?? ""}`, T = !!e.isMobile;
    return m !== f._v$ && le(t, f._v$ = m), p !== f._v$2 && t.classList.toggle("mobile-modal", f._v$2 = p), L !== f._v$3 && r.style.setProperty("width", f._v$3 = L), x !== f._v$4 && r.style.setProperty("height", f._v$4 = x), w !== f._v$5 && r.style.setProperty("max-height", f._v$5 = w), K !== f._v$6 && le(r, f._v$6 = K), W !== f._v$7 && r.classList.toggle("mobile-inner", f._v$7 = W), ye !== f._v$8 && n.classList.toggle("mobile-title", f._v$8 = ye), R !== f._v$9 && le(u, f._v$9 = R), T !== f._v$10 && u.classList.toggle("mobile-content", f._v$10 = T), f;
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
    _v$10: void 0
  }), t;
})();
Ye(["click"]);
const f4 = /* @__PURE__ */ $("<div><ul></ul></div>"), m4 = /* @__PURE__ */ $('<div><input type="text"></div>'), g4 = /* @__PURE__ */ $("<li></li>"), y4 = /* @__PURE__ */ $('<div tabindex="0"><div class="selector-container"><span class="value"></span><i class="arrow"></i></div></div>'), vn = (e) => {
  const [t, r] = D(!1), [n, l] = D(""), [u, f] = D({});
  let m, p, L;
  const x = (T, E, ne) => {
    const F = parseFloat(T.getPropertyValue(E));
    return Number.isFinite(F) ? F : ne;
  }, w = () => {
    var pe;
    if (!p)
      return;
    const T = p.getBoundingClientRect(), E = window.getComputedStyle(p), ne = x(E, "--klinecharts-pro-select-dropdown-gap", 4), F = p.closest(".klinecharts-pro-modal .inner"), U = F == null ? void 0 : F.getBoundingClientRect(), j = (U == null ? void 0 : U.left) ?? 0, ce = (U == null ? void 0 : U.right) ?? window.innerWidth, G = (U == null ? void 0 : U.top) ?? 0, Z = (U == null ? void 0 : U.bottom) ?? window.innerHeight, ae = !!p.closest(".klinecharts-pro-setting-modal") || ((pe = e.dropdownClass) == null ? void 0 : pe.includes("klinecharts-pro-timezone-dropdown")), he = x(E, ae ? "--klinecharts-pro-setting-dropdown-boundary-padding" : "--klinecharts-pro-select-dropdown-boundary-padding", ae ? 16 : 12), $e = x(E, "--klinecharts-pro-setting-dropdown-mobile-breakpoint", 768), we = window.innerWidth <= $e, de = E.getPropertyValue("--klinecharts-pro-setting-dropdown-mobile-width-mode").trim() || "trigger", De = Math.max(T.width, ce - j - he * 2), _e = x(E, "--klinecharts-pro-setting-dropdown-max-width", 280), O = x(E, "--klinecharts-pro-select-dropdown-width", Number.NaN), N = ae ? Number.isFinite(O) ? Math.max(T.width, Math.min(O, De)) : we && de !== "expanded" ? T.width : Math.max(T.width, Math.min(_e, De)) : T.width, V = Math.min(Math.max(T.left, j + he), ce - N - he), Y = x(E, "--klinecharts-pro-select-dropdown-min-height", 140), M = x(E, "--klinecharts-pro-select-dropdown-max-height", 260), S = x(E, "--klinecharts-pro-select-dropdown-viewport-padding-y", 32), q = x(E, "--klinecharts-pro-select-dropdown-open-up-threshold", 180), H = x(E, "--klinecharts-pro-select-dropdown-z-index", 1e4), Q = Math.min(M, Math.max(Y, Z - G - S)), ie = Z - T.bottom - ne, _ = T.top - G - ne, oe = ie < q && _ > ie, be = Math.max(Y, Math.min(Q, oe ? _ - ne : ie - ne));
    f({
      position: "fixed",
      left: `${V}px`,
      top: oe ? "auto" : `${T.bottom + ne}px`,
      bottom: oe ? `${window.innerHeight - T.top + ne}px` : "auto",
      width: `${N}px`,
      "max-height": `${be}px`,
      "transform-origin": oe ? "bottom" : "top",
      opacity: 1,
      transform: "scaleY(1)",
      "z-index": H
    });
  }, K = ee(() => {
    if (!e.dataSource || !e.searchable)
      return e.dataSource;
    const T = n().toLowerCase().trim();
    return T ? typeof e.dataSource[0] == "string" ? e.dataSource.filter((ne) => ne.toLowerCase().includes(T)) : e.dataSource.filter((ne) => {
      var j, ce;
      const F = ((j = ne.text) == null ? void 0 : j.toString().toLowerCase()) || "", U = ((ce = ne.key) == null ? void 0 : ce.toLowerCase()) || "";
      return F.includes(T) || U.includes(T);
    }) : e.dataSource;
  }), W = () => {
    const T = !t();
    r(T), l(""), T && e.searchable && setTimeout(() => m == null ? void 0 : m.focus(), 50);
  }, ye = (T) => {
    const E = T.relatedTarget;
    E && (p && p.contains(E) || L && L.contains(E)) || setTimeout(() => {
      document.activeElement && (p && p.contains(document.activeElement) || L && L.contains(document.activeElement)) || (r(!1), l(""));
    }, 0);
  };
  Ke(() => {
    if (!t())
      return;
    w();
    const T = (ne) => {
      const F = ne.target;
      p && p.contains(F) || L && L.contains(F) || (r(!1), l(""));
    }, E = () => w();
    document.addEventListener("mousedown", T), window.addEventListener("resize", E), window.addEventListener("scroll", E, !0), kt(() => {
      document.removeEventListener("mousedown", T), window.removeEventListener("resize", E), window.removeEventListener("scroll", E, !0);
    });
  });
  const R = () => (() => {
    const T = f4.cloneNode(!0), E = T.firstChild;
    T.$$click = (F) => F.stopPropagation(), T.$$mousedown = (F) => {
      F.preventDefault(), F.stopPropagation();
    };
    const ne = L;
    return typeof ne == "function" ? _t(ne, T) : L = T, C(T, (() => {
      const F = ee(() => !!e.searchable);
      return () => F() && (() => {
        const U = m4.cloneNode(!0), j = U.firstChild;
        U.style.setProperty("padding", "8px"), U.style.setProperty("border-bottom", "1px solid #333"), j.$$click = (G) => G.stopPropagation(), j.$$input = (G) => l(G.currentTarget.value);
        const ce = m;
        return typeof ce == "function" ? _t(ce, j) : m = j, j.style.setProperty("width", "100%"), j.style.setProperty("padding", "6px 10px"), j.style.setProperty("border", "1px solid var(--klinecharts-pro-border-color)"), j.style.setProperty("border-radius", "4px"), j.style.setProperty("background-color", "var(--klinecharts-pro-popover-background-color)"), j.style.setProperty("color", "#fff"), j.style.setProperty("font-size", "13px"), j.style.setProperty("outline", "none"), z(() => Ne(j, "placeholder", e.searchPlaceholder || "Search...")), z(() => j.value = n()), U;
      })();
    })(), E), C(E, () => {
      var F;
      return (F = K()) == null ? void 0 : F.map((U) => {
        const ce = U[e.valueKey ?? "text"] ?? U;
        return (() => {
          const G = g4.cloneNode(!0);
          return G.$$click = (Z) => {
            var X;
            Z.stopPropagation(), e.value !== ce && ((X = e.onSelected) == null || X.call(e, U)), r(!1), l("");
          }, C(G, ce), z(() => G.classList.toggle("selected", e.value === ce)), G;
        })();
      });
    }), z((F) => {
      const U = `drop-down-container klinecharts-pro-select-dropdown-portal ${e.dropdownClass ?? ""}`, j = u();
      return U !== F._v$ && le(T, F._v$ = U), F._v$2 = gt(T, j, F._v$2), F;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), T;
  })();
  return (() => {
    const T = y4.cloneNode(!0), E = T.firstChild, ne = E.firstChild;
    T.addEventListener("blur", ye), T.$$click = (U) => {
      U.stopPropagation(), !U.target.closest(".drop-down-container") && W();
    };
    const F = p;
    return typeof F == "function" ? _t(F, T) : p = T, C(ne, () => e.value), C(T, (() => {
      const U = ee(() => !!(e.dataSource && e.dataSource.length > 0 && t()));
      return () => U() && A(d0, {
        get children() {
          return R();
        }
      });
    })(), null), z((U) => {
      const j = e.style, ce = `klinecharts-pro-select ${e.class ?? ""} ${t() ? "klinecharts-pro-select-show" : ""}`;
      return U._v$3 = gt(T, j, U._v$3), ce !== U._v$4 && le(T, U._v$4 = ce), U;
    }, {
      _v$3: void 0,
      _v$4: void 0
    }), T;
  })();
};
Ye(["mousedown", "click", "input"]);
const p4 = /* @__PURE__ */ $('<span class="prefix"></span>'), C4 = /* @__PURE__ */ $('<span class="suffix"></span>'), v4 = /* @__PURE__ */ $('<div><input class="value"></div>'), z0 = (e) => {
  const t = u0({
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER
  }, e);
  let r;
  const [n, l] = D("normal");
  return (() => {
    const u = v4.cloneNode(!0), f = u.firstChild;
    return u.$$click = () => {
      r == null || r.focus();
    }, C(u, A(fe, {
      get when() {
        return t.prefix;
      },
      get children() {
        const m = p4.cloneNode(!0);
        return C(m, () => t.prefix), m;
      }
    }), f), f.addEventListener("change", (m) => {
      var L, x;
      const p = m.target.value;
      if ("precision" in t) {
        let w;
        const K = Math.max(0, Math.floor(t.precision));
        K <= 0 ? w = new RegExp(/^[1-9]\d*$/) : w = new RegExp("^\\d+\\.?\\d{0," + K + "}$"), (p === "" || w.test(p) && +p >= t.min && +p <= t.max) && ((L = t.onChange) == null || L.call(t, p === "" ? p : +p));
      } else
        (x = t.onChange) == null || x.call(t, p);
    }), f.addEventListener("blur", () => {
      l("normal");
    }), f.addEventListener("focus", () => {
      l("focus");
    }), _t((m) => {
      r = m;
    }, f), C(u, A(fe, {
      get when() {
        return t.suffix;
      },
      get children() {
        const m = C4.cloneNode(!0);
        return C(m, () => t.suffix), m;
      }
    }), null), z((m) => {
      const p = t.style, L = `klinecharts-pro-input ${t.class ?? ""}`, x = n(), w = t.placeholder ?? "";
      return m._v$ = gt(u, p, m._v$), L !== m._v$2 && le(u, m._v$2 = L), x !== m._v$3 && Ne(u, "data-status", m._v$3 = x), w !== m._v$4 && Ne(f, "placeholder", m._v$4 = w), m;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0
    }), z(() => f.value = t.value), u;
  })();
};
Ye(["click"]);
const b4 = /* @__PURE__ */ $('<div><i class="thumb"></i></div>'), kr = (e) => (() => {
  const t = b4.cloneNode(!0);
  return t.$$click = (r) => {
    e.onChange && e.onChange();
  }, z((r) => {
    const n = e.style, l = `klinecharts-pro-switch ${e.open ? "turn-on" : "turn-off"} ${e.class ?? ""}`;
    return r._v$ = gt(t, n, r._v$), l !== r._v$2 && le(t, r._v$2 = l), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
Ye(["click"]);
let me = null, Ri = !1;
const I1 = /* @__PURE__ */ new Map(), $4 = 500, Vi = 3;
function fn(e) {
  return e == null ? void 0 : e.trim().toLowerCase();
}
function _4(e, t) {
  return e.x >= t.x && e.x <= t.x + t.width && e.y >= t.y && e.y <= t.y + t.height;
}
function xr(e) {
  const t = me;
  if (!t || !e)
    return null;
  const r = fn(e);
  return r === fn(t.upColor) ? "up" : r === fn(t.downColor) ? "down" : r === fn(t.noChangeColor) ? "noChange" : null;
}
function cr(e, t, r) {
  const n = me;
  if (!n || !e)
    return e;
  const l = r ?? xr(e);
  return l === "up" ? t === "border" ? n.upBorderColor ?? n.borderUpColor ?? e : t === "wick" ? n.upWickColor ?? n.wickUpColor ?? e : n.upColor ?? e : l === "down" ? t === "border" ? n.downBorderColor ?? n.borderDownColor ?? e : t === "wick" ? n.downWickColor ?? n.wickDownColor ?? e : n.downColor ?? e : l === "noChange" ? t === "border" ? n.noChangeBorderColor ?? n.borderNoChangeColor ?? e : t === "wick" ? n.noChangeWickColor ?? n.wickNoChangeColor ?? e : n.noChangeColor ?? e : e;
}
function k4(e) {
  return Math.round((e.x + e.width / 2) * 1e3) / 1e3;
}
function x4(e) {
  return Math.round(Math.abs(e.width) * 1e3) / 1e3;
}
function L4(e, t) {
  if (t)
    return !1;
  const r = k4(e), n = x4(e), l = I1.get(r) ?? 0;
  if (n > Math.max(Vi, l)) {
    if (I1.set(r, n), I1.size > $4) {
      const f = I1.keys().next().value;
      f !== void 0 && I1.delete(f);
    }
    return !1;
  }
  const u = Math.max(Vi, l * 0.35);
  return n <= u;
}
function ur(e, t, r) {
  const { x: n, y: l, width: u, height: f } = t, m = Math.max(0, Math.min(r, Math.abs(u) / 2, Math.abs(f) / 2));
  e.beginPath(), e.moveTo(n + m, l), e.arcTo(n + u, l, n + u, l + f, m), e.arcTo(n + u, l + f, n, l + f, m), e.arcTo(n, l + f, n, l, m), e.arcTo(n, l, n + u, l, m), e.closePath();
}
function w4(e, t, r) {
  const n = r.style ?? e1.Fill, l = r.color ?? "currentColor", u = xr(r.color) ?? xr(r.borderColor), f = n === e1.Stroke, m = u ? L4(t, f) : !1, p = cr(l, m ? "wick" : "body", u), L = r.borderSize ?? 1, x = cr(r.borderColor ?? l, "border", u), w = r.borderStyle ?? Ve.Solid, K = r.borderRadius ?? 0, W = r.borderDashedValue ?? [2, 2], ye = n === e1.Fill || r.style === e1.StrokeFill, R = n === e1.Stroke || r.style === e1.StrokeFill;
  if (ye) {
    e.fillStyle = p, ur(e, t, K), e.fill();
    const T = cr(l, "border", u);
    !m && u && T && (e.strokeStyle = T, e.lineWidth = Math.max(1, L), e.setLineDash([]), ur(e, t, K), e.stroke());
  }
  R && (e.strokeStyle = x, e.lineWidth = L, e.setLineDash(w === Ve.Dashed ? W : []), ur(e, t, K), e.stroke());
}
function A4() {
  Ri || (Ri = !0, Ra({
    name: "rect",
    checkEventOn: _4,
    draw: w4
  }));
}
function Mt(e) {
  var r;
  const t = (r = e == null ? void 0 : e.candle) == null ? void 0 : r.bar;
  t && (me = {
    ...me ?? {},
    ...t,
    upBorderColor: t.upBorderColor ?? t.borderUpColor ?? t.upColor ?? (me == null ? void 0 : me.upBorderColor) ?? (me == null ? void 0 : me.borderUpColor),
    downBorderColor: t.downBorderColor ?? t.borderDownColor ?? t.downColor ?? (me == null ? void 0 : me.downBorderColor) ?? (me == null ? void 0 : me.borderDownColor),
    noChangeBorderColor: t.noChangeBorderColor ?? t.borderNoChangeColor ?? t.noChangeColor ?? (me == null ? void 0 : me.noChangeBorderColor) ?? (me == null ? void 0 : me.borderNoChangeColor),
    upWickColor: t.upWickColor ?? t.wickUpColor ?? t.upColor ?? (me == null ? void 0 : me.upWickColor) ?? (me == null ? void 0 : me.wickUpColor),
    downWickColor: t.downWickColor ?? t.wickDownColor ?? t.downColor ?? (me == null ? void 0 : me.downWickColor) ?? (me == null ? void 0 : me.wickDownColor),
    noChangeWickColor: t.noChangeWickColor ?? t.wickNoChangeColor ?? t.noChangeColor ?? (me == null ? void 0 : me.noChangeWickColor) ?? (me == null ? void 0 : me.wickNoChangeColor)
  });
}
const T4 = "指标", S4 = "更多", M4 = "主图指标", P4 = "副图指标", D4 = "设置", N4 = "时区", O4 = "截屏", I4 = "全屏", E4 = "退出全屏", B4 = "保存", F4 = "确定", z4 = "取消", U4 = "MA(移动平均线)", R4 = "EMA(指数平滑移动平均线)", V4 = "SMA", K4 = "BOLL(布林线)", j4 = "BBI(多空指数)", Q4 = "SAR(停损点指向指标)", Z4 = "VOL(成交量)", H4 = "MACD(指数平滑异同移动平均线)", W4 = "KDJ(随机指标)", Y4 = "RSI(相对强弱指标)", q4 = "BIAS(乖离率)", G4 = "BRAR(情绪指标)", X4 = "CCI(顺势指标)", J4 = "DMI(动向指标)", eu = "CR(能量指标)", tu = "PSY(心理线)", nu = "DMA(平行线差指标)", ru = "TRIX(三重指数平滑平均线)", ou = "OBV(能量潮指标)", iu = "VR(成交量变异率)", au = "WR(威廉指标)", su = "MTM(动量指标)", lu = "EMV(简易波动指标)", cu = "ROC(变动率指标)", uu = "PVT(价量趋势指标)", du = "AO(动量震荡指标)", hu = "世界统一时间", fu = "(UTC-10) 檀香山", mu = "(UTC-8) 朱诺", gu = "(UTC-7) 洛杉矶", yu = "(UTC-5) 芝加哥", pu = "(UTC-4) 多伦多", Cu = "(UTC-3) 圣保罗", vu = "(UTC+1) 伦敦", bu = "(UTC+2) 柏林", $u = "(UTC+3) 巴林", _u = "(UTC+4) 迪拜", ku = "(UTC+5) 阿什哈巴德", xu = "(UTC+6) 阿拉木图", Lu = "(UTC+7) 曼谷", wu = "(UTC+8) 上海", Au = "(UTC+9) 东京", Tu = "(UTC+10) 悉尼", Su = "(UTC+12) 诺福克岛", Mu = "水平直线", Pu = "水平射线", Du = "水平线段", Nu = "垂直直线", Ou = "垂直射线", Iu = "垂直线段", Eu = "直线", Bu = "射线", Fu = "线段", zu = "箭头", Uu = "价格线", Ru = "价格通道线", Vu = "平行直线", Ku = "斐波那契回调直线", ju = "斐波那契回调线段", Qu = "斐波那契圆环", Zu = "斐波那契螺旋", Hu = "斐波那契速度阻力扇", Wu = "斐波那契趋势扩展", Yu = "江恩箱", qu = "矩形", Gu = "平行四边形", Xu = "圆", Ju = "三角形", ed = "三浪", td = "五浪", nd = "八浪", rd = "任意浪", od = "ABCD形态", id = "XABCD形态", ad = "弱磁模式", sd = "强磁模式", ld = "商品搜索", cd = "商品代码", ud = "参数1", dd = "参数2", hd = "参数3", fd = "参数4", md = "参数5", gd = "周期", yd = "标准差", pd = "蜡烛图类型", Cd = "全实心", vd = "全空心", bd = "涨空心", $d = "跌空心", _d = "OHLC", kd = "面积图", xd = "最新价显示", Ld = "最高价显示", wd = "最低价显示", Ad = "指标最新值显示", Td = "价格轴类型", Sd = "线性轴", Md = "百分比轴", Pd = "对数轴", Dd = "倒置坐标", Nd = "网格线显示", Od = "恢复默认", Id = {
  indicator: T4,
  more: S4,
  main_indicator: M4,
  sub_indicator: P4,
  setting: D4,
  timezone: N4,
  screenshot: O4,
  full_screen: I4,
  exit_full_screen: E4,
  save: B4,
  confirm: F4,
  cancel: z4,
  ma: U4,
  ema: R4,
  sma: V4,
  boll: K4,
  bbi: j4,
  sar: Q4,
  vol: Z4,
  macd: H4,
  kdj: W4,
  rsi: Y4,
  bias: q4,
  brar: G4,
  cci: X4,
  dmi: J4,
  cr: eu,
  psy: tu,
  dma: nu,
  trix: ru,
  obv: ou,
  vr: iu,
  wr: au,
  mtm: su,
  emv: lu,
  roc: cu,
  pvt: uu,
  ao: du,
  utc: hu,
  honolulu: fu,
  juneau: mu,
  los_angeles: gu,
  chicago: yu,
  toronto: pu,
  sao_paulo: Cu,
  london: vu,
  berlin: bu,
  bahrain: $u,
  dubai: _u,
  ashkhabad: ku,
  almaty: xu,
  bangkok: Lu,
  shanghai: wu,
  tokyo: Au,
  sydney: Tu,
  norfolk: Su,
  horizontal_straight_line: Mu,
  horizontal_ray_line: Pu,
  horizontal_segment: Du,
  vertical_straight_line: Nu,
  vertical_ray_line: Ou,
  vertical_segment: Iu,
  straight_line: Eu,
  ray_line: Bu,
  segment: Fu,
  arrow: zu,
  price_line: Uu,
  price_channel_line: Ru,
  parallel_straight_line: Vu,
  fibonacci_line: Ku,
  fibonacci_segment: ju,
  fibonacci_circle: Qu,
  fibonacci_spiral: Zu,
  fibonacci_speed_resistance_fan: Hu,
  fibonacci_extension: Wu,
  gann_box: Yu,
  rect: qu,
  parallelogram: Gu,
  circle: Xu,
  triangle: Ju,
  three_waves: ed,
  five_waves: td,
  eight_waves: nd,
  any_waves: rd,
  abcd: od,
  xabcd: id,
  weak_magnet: ad,
  strong_magnet: sd,
  symbol_search: ld,
  symbol_code: cd,
  params_1: ud,
  params_2: dd,
  params_3: hd,
  params_4: fd,
  params_5: md,
  period: gd,
  standard_deviation: yd,
  candle_type: pd,
  candle_solid: Cd,
  candle_stroke: vd,
  candle_up_stroke: bd,
  candle_down_stroke: $d,
  ohlc: _d,
  area: kd,
  last_price_show: xd,
  high_price_show: Ld,
  low_price_show: wd,
  indicator_last_value_show: Ad,
  price_axis_type: Td,
  normal: Sd,
  percentage: Md,
  log: Pd,
  reverse_coordinate: Dd,
  grid_show: Nd,
  restore_default: Od
}, Ed = "Indicator", Bd = "More", Fd = "Main Indicator", zd = "Sub Indicator", Ud = "Setting", Rd = "Timezone", Vd = "Screenshot", Kd = "Full Screen", jd = "Exit", Qd = "Save", Zd = "Confirm", Hd = "Cancel", Wd = "MA(Moving Average)", Yd = "EMA(Exponential Moving Average)", qd = "SMA", Gd = "BOLL(Bolinger Bands)", Xd = "BBI(Bull And Bearlndex)", Jd = "SAR(Stop and Reverse)", eh = "VOL(Volume)", th = "MACD(Moving Average Convergence / Divergence)", nh = "KDJ(KDJ Index)", rh = "RSI(Relative Strength Index)", oh = "BIAS(Bias Ratio)", ih = "BRAR(情绪指标)", ah = "CCI(Commodity Channel Index)", sh = "DMI(Directional Movement Index)", lh = "CR(能量指标)", ch = "PSY(Psychological Line)", uh = "DMA(Different of Moving Average)", dh = "TRIX(Triple Exponentially Smoothed Moving Average)", hh = "OBV(On Balance Volume)", fh = "VR(Volatility Volume Ratio)", mh = "WR(Williams %R)", gh = "MTM(Momentum Index)", yh = "EMV(Ease of Movement Value)", ph = "ROC(Price Rate of Change)", Ch = "PVT(Price and Volume Trend)", vh = "AO(Awesome Oscillator)", bh = "UTC", $h = "(UTC-10) Honolulu", _h = "(UTC-8) Juneau", kh = "(UTC-7) Los Angeles", xh = "(UTC-5) Chicago", Lh = "(UTC-4) Toronto", wh = "(UTC-3) Sao Paulo", Ah = "(UTC+1) London", Th = "(UTC+2) Berlin", Sh = "(UTC+3) Bahrain", Mh = "(UTC+4) Dubai", Ph = "(UTC+5) Ashkhabad", Dh = "(UTC+6) Almaty", Nh = "(UTC+7) Bangkok", Oh = "(UTC+8) Shanghai", Ih = "(UTC+9) Tokyo", Eh = "(UTC+10) Sydney", Bh = "(UTC+12) Norfolk", Fh = "Horizontal Line", zh = "Horizontal Ray", Uh = "Horizontal Segment", Rh = "Vertical Line", Vh = "Vertical Ray", Kh = "Vertical Segment", jh = "Trend Line", Qh = "Ray", Zh = "Segment", Hh = "Arrow", Wh = "Price Line", Yh = "Price Channel Line", qh = "Parallel Line", Gh = "Fibonacci Line", Xh = "Fibonacci Segment", Jh = "Fibonacci Circle", ef = "Fibonacci Spiral", tf = "Fibonacci Sector", nf = "Fibonacci Extension", rf = "Gann Box", of = "Rectangle", af = "Parallelogram", sf = "Circle", lf = "Triangle", cf = "Three Waves", uf = "Five Waves", df = "Eight Waves", hf = "Any Waves", ff = "ABCD Pattern", mf = "XABCD Pattern", gf = "Weak Magnet", yf = "Strong Magnet", pf = "Symbol Search", Cf = "Symbol Code", vf = "Parameter 1", bf = "Parameter 2", $f = "Parameter 3", _f = "Parameter 4", kf = "Parameter 5", xf = "Period", Lf = "Standard Deviation", wf = "Candle Type", Af = "Candle Solid", Tf = "Candle Stroke", Sf = "Candle Up Stroke", Mf = "Candle Down Stroke", Pf = "OHLC", Df = "Area", Nf = "Show Last Price", Of = "Show Highest Price", If = "Show Lowest Price", Ef = "Show indicator's last value", Bf = "Price Axis Type", Ff = "Normal", zf = "Percentage", Uf = "Log", Rf = "Reverse Coordinate", Vf = "Show Grids", Kf = "Restore Defaults", jf = {
  indicator: Ed,
  more: Bd,
  main_indicator: Fd,
  sub_indicator: zd,
  setting: Ud,
  timezone: Rd,
  screenshot: Vd,
  full_screen: Kd,
  exit_full_screen: jd,
  save: Qd,
  confirm: Zd,
  cancel: Hd,
  ma: Wd,
  ema: Yd,
  sma: qd,
  boll: Gd,
  bbi: Xd,
  sar: Jd,
  vol: eh,
  macd: th,
  kdj: nh,
  rsi: rh,
  bias: oh,
  brar: ih,
  cci: ah,
  dmi: sh,
  cr: lh,
  psy: ch,
  dma: uh,
  trix: dh,
  obv: hh,
  vr: fh,
  wr: mh,
  mtm: gh,
  emv: yh,
  roc: ph,
  pvt: Ch,
  ao: vh,
  utc: bh,
  honolulu: $h,
  juneau: _h,
  los_angeles: kh,
  chicago: xh,
  toronto: Lh,
  sao_paulo: wh,
  london: Ah,
  berlin: Th,
  bahrain: Sh,
  dubai: Mh,
  ashkhabad: Ph,
  almaty: Dh,
  bangkok: Nh,
  shanghai: Oh,
  tokyo: Ih,
  sydney: Eh,
  norfolk: Bh,
  horizontal_straight_line: Fh,
  horizontal_ray_line: zh,
  horizontal_segment: Uh,
  vertical_straight_line: Rh,
  vertical_ray_line: Vh,
  vertical_segment: Kh,
  straight_line: jh,
  ray_line: Qh,
  segment: Zh,
  arrow: Hh,
  price_line: Wh,
  price_channel_line: Yh,
  parallel_straight_line: qh,
  fibonacci_line: Gh,
  fibonacci_segment: Xh,
  fibonacci_circle: Jh,
  fibonacci_spiral: ef,
  fibonacci_speed_resistance_fan: tf,
  fibonacci_extension: nf,
  gann_box: rf,
  rect: of,
  parallelogram: af,
  circle: sf,
  triangle: lf,
  three_waves: cf,
  five_waves: uf,
  eight_waves: df,
  any_waves: hf,
  abcd: ff,
  xabcd: mf,
  weak_magnet: gf,
  strong_magnet: yf,
  symbol_search: pf,
  symbol_code: Cf,
  params_1: vf,
  params_2: bf,
  params_3: $f,
  params_4: _f,
  params_5: kf,
  period: xf,
  standard_deviation: Lf,
  candle_type: wf,
  candle_solid: Af,
  candle_stroke: Tf,
  candle_up_stroke: Sf,
  candle_down_stroke: Mf,
  ohlc: Pf,
  area: Df,
  last_price_show: Nf,
  high_price_show: Of,
  low_price_show: If,
  indicator_last_value_show: Ef,
  price_axis_type: Bf,
  normal: Ff,
  percentage: zf,
  log: Uf,
  reverse_coordinate: Rf,
  grid_show: Vf,
  restore_default: Kf
}, U0 = {
  "zh-CN": Id,
  "en-US": jf
};
function Lp(e, t) {
  U0[e] = t;
}
const d = (e, t) => {
  var r;
  return ((r = U0[t]) == null ? void 0 : r[e]) ?? e;
}, Qf = /* @__PURE__ */ $('<div class="scroll-indicator left"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg></div>'), Zf = /* @__PURE__ */ $('<img alt="symbol">'), Hf = /* @__PURE__ */ $('<div class="symbol"><span></span></div>'), Wf = /* @__PURE__ */ $('<span class="down-arrow-icon mobile-separate-arrow"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></span>'), Yf = /* @__PURE__ */ $('<span class="mobile-more-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg></span>'), qf = /* @__PURE__ */ $('<div class="item tools" title="Time Tools"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M16 3v4"></path><path d="M8 3v4"></path><path d="M3 10h18"></path><path d="M12 14v4"></path><path d="M10 16h4"></path></svg></div>'), Gf = /* @__PURE__ */ $('<div class="item tools"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div>'), Xf = /* @__PURE__ */ $('<div class="klinecharts-pro-order-tools-display-menu"></div>'), Jf = /* @__PURE__ */ $('<div class="klinecharts-pro-order-tools-popover"><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Quick Order</span></span><span class="klinecharts-pro-order-tools-chevron">›</span></button><div class="klinecharts-pro-order-tools-submenu"><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Floating Window</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Plus Button</span></label></div></div><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Open Orders</span></span><span class="klinecharts-pro-order-tools-chevron">&rsaquo;</span></button><div class="klinecharts-pro-order-tools-submenu"><div class="klinecharts-pro-order-tools-setting-row"><span class="klinecharts-pro-order-tools-label">Extended Price Line</span></div><div class="klinecharts-pro-order-tools-setting-row"><span class="klinecharts-pro-order-tools-label">Display</span><div class="klinecharts-pro-order-tools-display"><button type="button" class="klinecharts-pro-order-tools-display-button"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4"></path></svg></button></div></div><div class="klinecharts-pro-order-tools-setting-row"><span class="klinecharts-pro-order-tools-label"></span></div></div></div><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Positions</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Breakeven Price</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Liquidation Price</span></label><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Price Line</span></span><span class="klinecharts-pro-order-tools-chevron">&rsaquo;</span></button><div class="klinecharts-pro-order-tools-submenu"><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Market Price Line</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Count Down</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Bid & Ask Price</span></label></div></div><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Order Preview Line</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Order History</span></label></div>'), em = /* @__PURE__ */ $('<div class="order-dropdown-main"><div class="item tools order-tools-trigger"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Orders"><path d="M4 7h10"></path><path d="M4 12h8"></path><path d="M4 17h6"></path><path d="M18 6v12"></path><path d="M15 15l3 3 3-3"></path></svg><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></div></div>'), tm = /* @__PURE__ */ $('<div class="item tools klinecharts-pro-timezone-tool"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path><path d="M15.22299772857666,9.722223632261718C12.59389772857666,9.722223632261718,10.44600772857666,12.020201374511718,10.44600772857666,14.861111374511719C10.44600772857666,17.70202137451172,12.58215772857666,20.000021374511718,15.223007728576661,20.000021374511718C17.86384772857666,20.000021374511718,19.99999772857666,17.70202137451172,19.99999772857666,14.861111374511719C19.99999772857666,12.020201374511718,17.85211772857666,9.72222212709572,15.22299772857666,9.722223632261718ZM15.22299772857666,18.598491374511717C13.30985772857666,18.598491374511717,11.737087728576661,16.91919137451172,11.737087728576661,14.848481374511719C11.737087728576661,12.777781374511719,13.29811772857666,11.098491374511719,15.22299772857666,11.098491374511719C17.14787772857666,11.098491374511719,18.708917728576658,12.777781374511719,18.708917728576658,14.848481374511719C18.708917728576658,16.91919137451172,17.13614772857666,18.59848137451172,15.22299772857666,18.598491374511717Z"></path><path d="M15.692486288146974,15.050496970825195L15.692486288146974,12.676760970825196C15.692486288146974,12.297972970825196,15.399058288146973,11.982316970825195,15.046945288146972,11.982316970825195C14.694833288146972,11.982316970825195,14.401406288146973,12.297972970825196,14.401406288146973,12.676760970825196L14.401406288146973,15.340896970825195C14.401406288146973,15.530296970825194,14.471829288146973,15.694436970825196,14.589200288146973,15.833326970825196L15.751176288146972,17.095956970825195C15.868546288146973,17.222216970825194,16.032866288146973,17.297976970825196,16.208916288146973,17.297976970825196C16.384976288146973,17.297976970825196,16.537556288146973,17.222216970825194,16.666666288146974,17.095956970825195C16.78403628814697,16.969686970825194,16.854456288146974,16.792916970825196,16.854456288146974,16.603526970825193C16.854456288146974,16.414136970825197,16.78403628814697,16.237366970825196,16.666666288146974,16.111106970825197L15.692486288146974,15.050496970825195Z"></path></svg></div>'), nm = /* @__PURE__ */ $('<div class="item tools"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg></div>'), rm = /* @__PURE__ */ $('<div class="item tools"><svg viewBox="0 0 20.5 20"><path d="M6.50977,1L13.4902,1C13.6406,1,13.7695,1.1104910000000001,13.7969,1.2631700000000001L14.0273,2.52277C14.1387,3.13147,14.6543,3.57143,15.2559,3.57143L17.5,3.57143C18.8809,3.57143,20,4.72254,20,6.14286L20,16.4286C20,17.8489,18.8809,19,17.5,19L2.5,19C1.11914,19,0,17.8489,0,16.4286L0,6.14286C0,4.72254,1.11914,3.57143,2.5,3.57143L4.74414,3.57143C5.3457,3.57143,5.86133,3.13147,5.97266,2.52277L6.20312,1.2631700000000001C6.23047,1.1104910000000001,6.35937,1,6.50977,1ZM15.2559,4.857139999999999C14.0547,4.857139999999999,13.0215,3.97522,12.7988,2.75982L12.7129,2.28571L7.28711,2.28571L7.20117,2.75982C6.98047,3.97522,5.94727,4.857139999999999,4.74414,4.857139999999999L2.5,4.857139999999999C1.81055,4.857139999999999,1.25,5.43371,1.25,6.14286L1.25,16.4286C1.25,17.1377,1.81055,17.7143,2.5,17.7143L17.5,17.7143C18.1895,17.7143,18.75,17.1377,18.75,16.4286L18.75,6.14286C18.75,5.43371,18.1895,4.857139999999999,17.5,4.857139999999999L15.2559,4.857139999999999ZM4.375,6.78571L3.125,6.78571C2.7793,6.78571,2.5,6.49844,2.5,6.14286C2.5,5.78728,2.7793,5.5,3.125,5.5L4.375,5.5C4.7207,5.5,5,5.78728,5,6.14286C5,6.49844,4.7207,6.78571,4.375,6.78571ZM10,6.14286C7.06641,6.14286,4.6875,8.58973,4.6875,11.6071C4.6875,14.6246,7.06641,17.0714,10,17.0714C12.9336,17.0714,15.3125,14.6246,15.3125,11.6071C15.3125,8.58973,12.9336,6.14286,10,6.14286ZM10,7.42857C11.0859,7.42857,12.1055,7.8625,12.873,8.65201C13.6406,9.44152,14.0625,10.49018,14.0625,11.6071C14.0625,12.7241,13.6406,13.7728,12.873,14.5623C12.1055,15.3518,11.0859,15.7857,10,15.7857C8.91406,15.7857,7.89453,15.3518,7.12695,14.5623C6.35937,13.7728,5.9375,12.7241,5.9375,11.6071C5.9375,10.49018,6.35938,9.44152,7.12695,8.65201C7.89453,7.8625,8.91406,7.42857,10,7.42857ZM10,9.67857C8.96484,9.67857,8.125,10.54241,8.125,11.6071C8.125,12.6719,8.96484,13.5357,10,13.5357C11.0352,13.5357,11.875,12.6719,11.875,11.6071C11.875,10.54241,11.0352,9.67857,10,9.67857ZM10,10.96429C10.3438,10.96429,10.625,11.2536,10.625,11.6071C10.625,11.9607,10.3438,12.25,10,12.25C9.65625,12.25,9.375,11.9607,9.375,11.6071C9.375,11.2536,9.65625,10.96429,10,10.96429Z"></path></svg></div>'), om = /* @__PURE__ */ $('<div class="item tools chart-view-toggle"></div>'), im = /* @__PURE__ */ $('<div class="scroll-indicator right"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"></path></svg></div>'), am = /* @__PURE__ */ $('<div><div class="klinecharts-pro-period-bar"><button class="menu-container" type="button" aria-label="Toggle drawing sidebar"><svg viewBox="0 0 1024 1024"><path d="M192.037 287.953h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 479.169H438.553c-17.673 0-32 14.327-32 32s14.327 32 32 32h393.608c17.673 0 32-14.327 32-32s-14.327-32-32-32zM832.161 735.802H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32zM319.028 351.594l-160 160 160 160z"></path></svg></button><div><div class="item tools fullscreen-toggle"></div></div></div></div>'), sm = /* @__PURE__ */ $("<span></span>"), lm = /* @__PURE__ */ $('<button type="button"></button>'), cm = /* @__PURE__ */ $('<button type="button"><span></span></button>'), Ki = /* @__PURE__ */ $('<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="style=linear"> <g id="fullscreen"> <path id="vector" d="M8 2H4C2.89543 2 2 2.89543 2 4V8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> <path id="vector_2" d="M22 8L22 4C22 2.89543 21.1046 2 20 2H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> <path id="vector_3" d="M16 22L20 22C21.1046 22 22 21.1046 22 20L22 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> <path id="vector_4" d="M8 22L4 22C2.89543 22 2 21.1046 2 20V16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> </g> </g> </g></svg>'), um = /* @__PURE__ */ $('<svg viewBox="0 0 24 24"><path d="M3 20V7l4 3 5-7 5 4h4v13H3Zm5-3 4-5.5 7 5.45V9h-2.7l-3.9-3.1-4.95 6.95L5 10.4V14l3 3Z"></path></svg>'), dm = /* @__PURE__ */ $('<svg viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M9 4H7v2H5v12h2v2h2v-2h2V6H9zM19 8h-2V4h-2v4h-2v7h2v5h2v-5h2z"></path></svg>'), ji = (e) => e.charAt(0).toUpperCase() + e.slice(1), hm = (e) => {
  let t, r, n;
  const [l, u] = D(window.innerWidth < 768), [f, m] = D(localStorage.getItem("klinechart_secondary_period") || ""), [p, L] = D(!1), [x, w] = D(!1), [K, W] = D(!1), [ye, R] = D(!1), [T, E] = D(!1), [ne, F] = D({
    top: 0,
    left: 0,
    minWidth: 220
  }), U = () => {
    u(window.innerWidth < 768), requestAnimationFrame(N), p() && we();
  }, [j, ce] = D(!1), G = () => document.fullscreenElement ?? document.body, Z = () => {
    ce(!!document.fullscreenElement);
  }, [X, ae] = D(!1), [he, $e] = D(!1), we = () => {
    if (!r)
      return;
    const M = r.getBoundingClientRect(), S = Math.max(220, Math.ceil(M.width)), q = window.innerWidth, H = Math.min(Math.max(8, M.right - S), Math.max(8, q - S - 8));
    F({
      top: Math.ceil(M.bottom + 8),
      left: Math.ceil(H),
      minWidth: S
    });
  }, de = () => {
    w(!1), W(!1), R(!1), E(!1);
  }, De = () => {
    L((M) => {
      const S = !M;
      return S ? queueMicrotask(we) : de(), S;
    });
  }, _e = (M) => {
    if (!p())
      return;
    const S = M.target;
    S && (r != null && r.contains(S) || n != null && n.contains(S) || (de(), L(!1)));
  }, O = () => {
    p() && we();
  }, N = () => {
    if (!t) {
      ae(!1), $e(!1);
      return;
    }
    const M = t, S = M.scrollWidth > M.clientWidth + 2;
    ae(S && M.scrollLeft > 2), $e(S && M.scrollLeft + M.clientWidth < M.scrollWidth - 2);
  };
  Sr(() => {
    window.addEventListener("resize", U), document.addEventListener("fullscreenchange", Z), document.addEventListener("pointerdown", _e, !0), document.addEventListener("mousedown", _e), window.addEventListener("scroll", O, !0), document.addEventListener("mozfullscreenchange", Z), document.addEventListener("webkitfullscreenchange", Z), document.addEventListener("msfullscreenchange", Z), t && (t.addEventListener("scroll", N), setTimeout(N, 100));
  }), kt(() => {
    window.removeEventListener("resize", U), document.removeEventListener("fullscreenchange", Z), document.removeEventListener("pointerdown", _e, !0), document.removeEventListener("mousedown", _e), window.removeEventListener("scroll", O, !0), document.removeEventListener("mozfullscreenchange", Z), document.removeEventListener("webkitfullscreenchange", Z), document.removeEventListener("msfullscreenchange", Z), t && t.removeEventListener("scroll", N);
  });
  const V = ee(() => {
    const M = e.periods.filter((S) => {
      if (!l() || j())
        return !0;
      const q = e.period.text, H = f();
      if (S.text === q || H && S.text === H)
        return !0;
      if (!H || H === q) {
        const Q = e.periods.find((ie) => ie.text !== q);
        return S.text === (Q == null ? void 0 : Q.text);
      }
      return !1;
    }).slice(0, l() && !j() ? 2 : e.periods.length);
    return setTimeout(N, 50), M;
  });
  let Y = e.period.text;
  return Ke(() => {
    const M = e.period.text;
    M !== Y && (l() && (m(Y), localStorage.setItem("klinechart_secondary_period", Y)), Y = M), setTimeout(N, 50);
  }), Ke(() => {
    j(), setTimeout(N, 100);
  }), Ke(() => {
    if (!e.showOrderToolsMenu) {
      L(!1);
      return;
    }
    p() && queueMicrotask(we);
  }), (() => {
    const M = am.cloneNode(!0), S = M.firstChild, q = S.firstChild, H = q.firstChild, Q = q.nextSibling, ie = Q.firstChild;
    return M.style.setProperty("position", "relative"), M.style.setProperty("width", "100%"), M.style.setProperty("display", "flex"), M.style.setProperty("align-items", "center"), C(M, A(fe, {
      get when() {
        return X();
      },
      get children() {
        const _ = Qf.cloneNode(!0);
        return _.$$click = () => t.scrollBy({
          left: -100,
          behavior: "smooth"
        }), _.style.setProperty("position", "absolute"), _.style.setProperty("left", "0"), _.style.setProperty("top", "0"), _.style.setProperty("bottom", "1px"), _.style.setProperty("width", "30px"), _.style.setProperty("display", "flex"), _.style.setProperty("align-items", "center"), _.style.setProperty("justify-content", "center"), _.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), _.style.setProperty("z-index", "10"), _.style.setProperty("cursor", "pointer"), _.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), _;
      }
    }), S), _t((_) => {
      t = _;
    }, S), S.style.setProperty("width", "100%"), S.style.setProperty("overflow", "auto"), dt(q, "click", e.onMenuClick, !0), C(S, A(fe, {
      get when() {
        return e.symbol;
      },
      get children() {
        const _ = Hf.cloneNode(!0), oe = _.firstChild;
        return dt(_, "click", e.onSymbolClick, !0), C(_, A(fe, {
          get when() {
            return e.symbol.logo;
          },
          get children() {
            const be = Zf.cloneNode(!0);
            return z(() => Ne(be, "src", e.symbol.logo)), be;
          }
        }), oe), C(oe, () => e.symbol.shortName ?? e.symbol.name ?? e.symbol.ticker), _;
      }
    }), Q), C(S, () => V().map((_, oe) => {
      const be = _.text === e.period.text;
      return (() => {
        const pe = sm.cloneNode(!0);
        return pe.$$click = (Ce) => {
          l() && be && !j() ? (e.onMobilePeriodClick ? e.onMobilePeriodClick(_) : e.onMenuClick(), Ce.stopPropagation()) : e.onPeriodChange(_);
        }, le(pe, `item period ${be ? "selected" : ""}`), C(pe, () => _.text), pe;
      })();
    }), Q), C(S, A(fe, {
      get when() {
        return ee(() => !!(l() && !j()))() && V().length > 1;
      },
      get children() {
        const _ = Wf.cloneNode(!0);
        return _.$$click = (oe) => {
          oe.stopPropagation(), e.onMobilePeriodClick ? e.onMobilePeriodClick(e.period) : e.onMenuClick();
        }, _.style.setProperty("margin-left", "4px"), _.style.setProperty("display", "inline-flex"), _.style.setProperty("align-items", "center"), _;
      }
    }), Q), C(S, A(fe, {
      get when() {
        return ee(() => !!l())() && !j();
      },
      get children() {
        const _ = Yf.cloneNode(!0);
        return _.$$click = (oe) => {
          var be;
          oe.stopPropagation(), (be = e.onMobileMoreClick) == null || be.call(e);
        }, _.style.setProperty("margin-left", "8px"), _.style.setProperty("display", "inline-flex"), _.style.setProperty("align-items", "center"), _.style.setProperty("cursor", "pointer"), _.style.setProperty("padding", "0 4px"), _;
      }
    }), Q), C(S, A(fe, {
      get when() {
        return !l();
      },
      get children() {
        const _ = qf.cloneNode(!0);
        return dt(_, "click", e.onTimeToolsClick, !0), _;
      }
    }), Q), C(S, A(fe, {
      get when() {
        return !l();
      },
      get children() {
        const _ = Gf.cloneNode(!0), oe = _.firstChild, be = oe.nextSibling;
        return dt(_, "click", e.onIndicatorClick, !0), C(be, () => d("indicator", e.locale)), _;
      }
    }), Q), Q.style.setProperty("display", "flex"), Q.style.setProperty("height", "100%"), Q.style.setProperty("margin-left", "auto"), Q.style.setProperty("align-items", "center"), Q.style.setProperty("flex", "0 0 auto"), C(Q, A(fe, {
      get when() {
        return e.showOrderToolsMenu;
      },
      get children() {
        const _ = em.cloneNode(!0), oe = _.firstChild, be = oe.firstChild, pe = be.nextSibling;
        return _t((Ce) => {
          r = Ce;
        }, _), _.style.setProperty("display", "flex"), _.style.setProperty("align-items", "center"), _.style.setProperty("height", "100%"), oe.$$click = (Ce) => {
          Ce.stopPropagation(), De();
        }, oe.style.setProperty("gap", "6px"), pe.style.setProperty("transition", "transform 0.2s ease"), C(_, A(fe, {
          get when() {
            return p();
          },
          get children() {
            return A(d0, {
              get mount() {
                return G();
              },
              get children() {
                const Ce = Jf.cloneNode(!0), Xe = Ce.firstChild, rt = Xe.firstChild, pt = rt.firstChild, Ct = pt.firstChild, Lt = Ct.firstChild, Un = rt.nextSibling, f1 = Un.firstChild, U1 = f1.firstChild, R1 = U1.firstChild, Zt = f1.nextSibling, Rn = Zt.firstChild, m1 = Rn.firstChild, Nt = Xe.nextSibling, Ee = Nt.firstChild, Vn = Ee.firstChild, wt = Vn.firstChild, Ot = wt.firstChild, It = Ee.nextSibling, ot = It.firstChild;
                ot.firstChild;
                const g1 = ot.nextSibling, Je = g1.firstChild, y1 = Je.nextSibling, p1 = y1.firstChild, Et = p1.firstChild, At = g1.nextSibling, C1 = At.firstChild, v1 = Nt.nextSibling, Kn = v1.firstChild, V1 = Kn.firstChild, jn = v1.nextSibling, K1 = jn.nextSibling, Ht = K1.firstChild, b1 = Ht.firstChild, j1 = K1.nextSibling, $1 = j1.nextSibling, Q1 = $1.firstChild, Z1 = Q1.firstChild, Bt = $1.nextSibling, Qe = Bt.firstChild, He = Qe.firstChild, qe = He.firstChild, We = qe.firstChild, Qn = Qe.nextSibling, Wt = Qn.firstChild, _1 = Wt.firstChild, k1 = _1.firstChild, ke = Wt.nextSibling, x1 = ke.firstChild, ht = x1.firstChild, vt = ke.nextSibling, Yt = vt.firstChild, Tt = Yt.firstChild, Ge = Bt.nextSibling, H1 = Ge.firstChild, L1 = H1.firstChild, W1 = Ge.nextSibling, Y1 = W1.firstChild, q1 = Y1.firstChild;
                return Ce.$$mousedown = (b) => b.stopPropagation(), _t((b) => {
                  n = b;
                }, Ce), Ce.style.setProperty("position", "fixed"), Ce.style.setProperty("z-index", "9999"), rt.$$click = (b) => {
                  b.preventDefault(), b.stopPropagation(), w((I) => !I);
                }, Ct.$$mousedown = (b) => b.stopPropagation(), Ct.$$click = (b) => b.stopPropagation(), Lt.addEventListener("change", (b) => {
                  var I;
                  b.stopPropagation(), w(!0), (I = e.onOrderToolsStateChange) == null || I.call(e, {
                    quickOrder: b.currentTarget.checked
                  });
                }), R1.addEventListener("change", (b) => {
                  var I;
                  (I = e.onOrderToolsStateChange) == null || I.call(e, {
                    quickOrderFloatingWindow: b.currentTarget.checked
                  });
                }), m1.addEventListener("change", (b) => {
                  var I;
                  (I = e.onOrderToolsStateChange) == null || I.call(e, {
                    quickOrderPlusButton: b.currentTarget.checked
                  });
                }), Ee.$$click = (b) => {
                  b.preventDefault(), b.stopPropagation(), W((I) => !I), R(!1);
                }, wt.$$mousedown = (b) => b.stopPropagation(), wt.$$click = (b) => b.stopPropagation(), Ot.addEventListener("change", (b) => {
                  var I;
                  b.stopPropagation(), W(!0), (I = e.onOrderToolsStateChange) == null || I.call(e, {
                    openOrders: b.currentTarget.checked
                  });
                }), C(ot, A(kr, {
                  get open() {
                    var b;
                    return ((b = e.orderToolsState) == null ? void 0 : b.openOrdersExtendedPriceLine) ?? !0;
                  },
                  onChange: () => {
                    var b, I;
                    (I = e.onOrderToolsStateChange) == null || I.call(e, {
                      openOrdersExtendedPriceLine: !(((b = e.orderToolsState) == null ? void 0 : b.openOrdersExtendedPriceLine) ?? !0)
                    });
                  }
                }), null), p1.$$click = (b) => {
                  b.preventDefault(), b.stopPropagation(), R((I) => !I);
                }, C(p1, () => {
                  var b;
                  return ji(((b = e.orderToolsState) == null ? void 0 : b.openOrdersDisplay) ?? "right");
                }, Et), C(y1, A(fe, {
                  get when() {
                    return ye();
                  },
                  get children() {
                    const b = Xf.cloneNode(!0);
                    return C(b, () => ["left", "center", "right"].map((I) => (() => {
                      const Ze = lm.cloneNode(!0);
                      return Ze.$$click = (Ue) => {
                        var it;
                        Ue.preventDefault(), Ue.stopPropagation(), (it = e.onOrderToolsStateChange) == null || it.call(e, {
                          openOrdersDisplay: I
                        }), R(!1);
                      }, C(Ze, () => ji(I)), z(() => {
                        var Ue;
                        return le(Ze, (((Ue = e.orderToolsState) == null ? void 0 : Ue.openOrdersDisplay) ?? "right") === I ? "selected" : "");
                      }), Ze;
                    })())), b;
                  }
                }), null), C(C1, () => e.orderToolsConfirmAfterDragLabel ?? "Confirm After Drag"), C(At, A(kr, {
                  get open() {
                    var b;
                    return ((b = e.orderToolsState) == null ? void 0 : b.confirmAfterDrag) ?? !0;
                  },
                  onChange: () => {
                    var b, I;
                    (I = e.onOrderToolsStateChange) == null || I.call(e, {
                      confirmAfterDrag: !(((b = e.orderToolsState) == null ? void 0 : b.confirmAfterDrag) ?? !0)
                    });
                  }
                }), null), V1.addEventListener("change", (b) => {
                  var I;
                  (I = e.onOrderToolsStateChange) == null || I.call(e, {
                    positions: b.currentTarget.checked
                  });
                }), b1.addEventListener("change", (b) => {
                  var I;
                  (I = e.onOrderToolsStateChange) == null || I.call(e, {
                    breakevenPrice: b.currentTarget.checked
                  });
                }), Z1.addEventListener("change", (b) => {
                  var I;
                  (I = e.onOrderToolsStateChange) == null || I.call(e, {
                    liquidationPrice: b.currentTarget.checked
                  });
                }), Qe.$$click = (b) => {
                  b.preventDefault(), b.stopPropagation(), E((I) => !I);
                }, qe.$$mousedown = (b) => b.stopPropagation(), qe.$$click = (b) => b.stopPropagation(), We.addEventListener("change", (b) => {
                  var I;
                  b.stopPropagation(), E(!0), (I = e.onOrderToolsStateChange) == null || I.call(e, {
                    priceLine: b.currentTarget.checked
                  });
                }), k1.addEventListener("change", (b) => {
                  var I;
                  (I = e.onOrderToolsStateChange) == null || I.call(e, {
                    marketPriceLine: b.currentTarget.checked
                  });
                }), ht.addEventListener("change", (b) => {
                  var I;
                  (I = e.onOrderToolsStateChange) == null || I.call(e, {
                    countDown: b.currentTarget.checked
                  });
                }), Tt.addEventListener("change", (b) => {
                  var I;
                  (I = e.onOrderToolsStateChange) == null || I.call(e, {
                    bidAskPrice: b.currentTarget.checked
                  });
                }), L1.addEventListener("change", (b) => {
                  var I;
                  (I = e.onOrderToolsStateChange) == null || I.call(e, {
                    orderPreviewLine: b.currentTarget.checked
                  });
                }), q1.addEventListener("change", (b) => {
                  var I;
                  (I = e.onOrderToolsStateChange) == null || I.call(e, {
                    orderHistory: b.currentTarget.checked
                  });
                }), z((b) => {
                  const I = `${ne().top}px`, Ze = `${ne().left}px`, Ue = `${ne().minWidth}px`, it = `klinecharts-pro-order-tools-group${x() ? " klinecharts-pro-order-tools-group-open" : ""}`, Ft = `klinecharts-pro-order-tools-group${K() ? " klinecharts-pro-order-tools-group-open" : ""}`, et = `klinecharts-pro-order-tools-display-arrow${ye() ? " klinecharts-pro-order-tools-display-arrow-open" : ""}`, G1 = `klinecharts-pro-order-tools-group${T() ? " klinecharts-pro-order-tools-group-open" : ""}`;
                  return I !== b._v$ && Ce.style.setProperty("top", b._v$ = I), Ze !== b._v$2 && Ce.style.setProperty("left", b._v$2 = Ze), Ue !== b._v$3 && Ce.style.setProperty("width", b._v$3 = Ue), it !== b._v$4 && le(Xe, b._v$4 = it), Ft !== b._v$5 && le(Nt, b._v$5 = Ft), et !== b._v$6 && Ne(Et, "class", b._v$6 = et), G1 !== b._v$7 && le(Bt, b._v$7 = G1), b;
                }, {
                  _v$: void 0,
                  _v$2: void 0,
                  _v$3: void 0,
                  _v$4: void 0,
                  _v$5: void 0,
                  _v$6: void 0,
                  _v$7: void 0
                }), z(() => {
                  var b, I, Ze, Ue;
                  return Lt.checked = (((b = e.orderToolsState) == null ? void 0 : b.quickOrderFloatingWindow) ?? ((I = e.orderToolsState) == null ? void 0 : I.quickOrder) ?? !0) || (((Ze = e.orderToolsState) == null ? void 0 : Ze.quickOrderPlusButton) ?? ((Ue = e.orderToolsState) == null ? void 0 : Ue.quickOrder) ?? !0);
                }), z(() => {
                  var b, I;
                  return R1.checked = ((b = e.orderToolsState) == null ? void 0 : b.quickOrderFloatingWindow) ?? ((I = e.orderToolsState) == null ? void 0 : I.quickOrder) ?? !0;
                }), z(() => {
                  var b, I;
                  return m1.checked = ((b = e.orderToolsState) == null ? void 0 : b.quickOrderPlusButton) ?? ((I = e.orderToolsState) == null ? void 0 : I.quickOrder) ?? !0;
                }), z(() => {
                  var b;
                  return Ot.checked = ((b = e.orderToolsState) == null ? void 0 : b.openOrders) ?? !0;
                }), z(() => {
                  var b;
                  return V1.checked = ((b = e.orderToolsState) == null ? void 0 : b.positions) ?? !0;
                }), z(() => {
                  var b;
                  return b1.checked = ((b = e.orderToolsState) == null ? void 0 : b.breakevenPrice) ?? !0;
                }), z(() => {
                  var b;
                  return Z1.checked = ((b = e.orderToolsState) == null ? void 0 : b.liquidationPrice) ?? !0;
                }), z(() => {
                  var b, I, Ze, Ue, it, Ft;
                  return We.checked = (((b = e.orderToolsState) == null ? void 0 : b.marketPriceLine) ?? ((I = e.orderToolsState) == null ? void 0 : I.priceLine) ?? !0) || (((Ze = e.orderToolsState) == null ? void 0 : Ze.countDown) ?? ((Ue = e.orderToolsState) == null ? void 0 : Ue.priceLine) ?? !0) || (((it = e.orderToolsState) == null ? void 0 : it.bidAskPrice) ?? ((Ft = e.orderToolsState) == null ? void 0 : Ft.priceLine) ?? !0);
                }), z(() => {
                  var b, I;
                  return k1.checked = ((b = e.orderToolsState) == null ? void 0 : b.marketPriceLine) ?? ((I = e.orderToolsState) == null ? void 0 : I.priceLine) ?? !0;
                }), z(() => {
                  var b, I;
                  return ht.checked = ((b = e.orderToolsState) == null ? void 0 : b.countDown) ?? ((I = e.orderToolsState) == null ? void 0 : I.priceLine) ?? !0;
                }), z(() => {
                  var b, I;
                  return Tt.checked = ((b = e.orderToolsState) == null ? void 0 : b.bidAskPrice) ?? ((I = e.orderToolsState) == null ? void 0 : I.priceLine) ?? !0;
                }), z(() => {
                  var b;
                  return L1.checked = ((b = e.orderToolsState) == null ? void 0 : b.orderPreviewLine) ?? !0;
                }), z(() => {
                  var b;
                  return q1.checked = ((b = e.orderToolsState) == null ? void 0 : b.orderHistory) ?? !0;
                }), Ce;
              }
            });
          }
        }), null), z((Ce) => {
          const Xe = l() ? "0 8px" : "0 10px", rt = p() ? "rotate(180deg)" : "rotate(0deg)";
          return Xe !== Ce._v$8 && oe.style.setProperty("padding", Ce._v$8 = Xe), rt !== Ce._v$9 && pe.style.setProperty("transform", Ce._v$9 = rt), Ce;
        }, {
          _v$8: void 0,
          _v$9: void 0
        }), _;
      }
    }), ie), C(Q, A(fe, {
      get when() {
        return !l();
      },
      get children() {
        return [(() => {
          const _ = tm.cloneNode(!0);
          return dt(_, "click", e.onTimezoneClick, !0), _;
        })(), (() => {
          const _ = nm.cloneNode(!0);
          return dt(_, "click", e.onSettingClick, !0), _;
        })()];
      }
    }), ie), C(Q, A(fe, {
      get when() {
        return !l();
      },
      get children() {
        return [A(fe, {
          get when() {
            return e.chartToolbarAction;
          },
          keyed: !0,
          children: (_) => (() => {
            const oe = cm.cloneNode(!0), be = oe.firstChild;
            return dt(oe, "click", _.onClick, !0), z((pe) => {
              const Ce = `item tools klinecharts-pro-chart-toolbar-action ${_.className ?? ""}`, Xe = _.title, rt = _.ariaLabel ?? _.title, pt = _.style, Ct = _.iconSvg;
              return Ce !== pe._v$12 && le(oe, pe._v$12 = Ce), Xe !== pe._v$13 && Ne(oe, "title", pe._v$13 = Xe), rt !== pe._v$14 && Ne(oe, "aria-label", pe._v$14 = rt), pe._v$15 = gt(oe, pt, pe._v$15), Ct !== pe._v$16 && (be.innerHTML = pe._v$16 = Ct), pe;
            }, {
              _v$12: void 0,
              _v$13: void 0,
              _v$14: void 0,
              _v$15: void 0,
              _v$16: void 0
            }), oe;
          })()
        }), (() => {
          const _ = rm.cloneNode(!0);
          return dt(_, "click", e.onScreenshotClick, !0), _;
        })()];
      }
    }), ie), ie.$$click = () => {
      if (j())
        (document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen).call(document);
      else {
        const _ = t == null ? void 0 : t.closest(".klinecharts-pro");
        _ && ((_ == null ? void 0 : _.requestFullscreen) ?? (_ == null ? void 0 : _.webkitRequestFullscreen) ?? (_ == null ? void 0 : _.mozRequestFullScreen) ?? (_ == null ? void 0 : _.msRequestFullscreen)).call(_);
      }
    }, C(ie, (() => {
      const _ = ee(() => !!j());
      return () => (_(), Ki.cloneNode(!0));
    })()), C(Q, A(fe, {
      get when() {
        return ee(() => !!e.chartViewToggle)() && !j();
      },
      get children() {
        const _ = om.cloneNode(!0);
        return dt(_, "click", e.chartViewToggle.onToggle, !0), C(_, (() => {
          const oe = ee(() => e.chartViewToggle.view === "chart");
          return () => oe() ? um.cloneNode(!0) : dm.cloneNode(!0);
        })()), z(() => Ne(_, "title", e.chartViewToggle.view === "chart" ? "View Depth" : "View Chart")), _;
      }
    }), null), C(M, A(fe, {
      get when() {
        return he();
      },
      get children() {
        const _ = im.cloneNode(!0);
        return _.$$click = () => t.scrollBy({
          left: 100,
          behavior: "smooth"
        }), _.style.setProperty("position", "absolute"), _.style.setProperty("right", "0"), _.style.setProperty("top", "0"), _.style.setProperty("bottom", "1px"), _.style.setProperty("width", "30px"), _.style.setProperty("display", "flex"), _.style.setProperty("align-items", "center"), _.style.setProperty("justify-content", "center"), _.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), _.style.setProperty("z-index", "10"), _.style.setProperty("cursor", "pointer"), _.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), _;
      }
    }), null), z((_) => {
      const oe = e.spread ? "" : "rotate", be = j() ? "0px" : "var(--klinecharts-pro-period-bar-padding-right)";
      return oe !== _._v$10 && Ne(H, "class", _._v$10 = oe), be !== _._v$11 && Q.style.setProperty("padding-right", _._v$11 = be), _;
    }, {
      _v$10: void 0,
      _v$11: void 0
    }), M;
  })();
};
Ye(["click", "mousedown"]);
const fm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M12.41465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L12.41465,12C12.20873,12.5826,11.65311,13,11,13C10.34689,13,9.79127,12.5826,9.58535,12L3.5,12C3.223857,12,3,11.77614,3,11.5C3,11.22386,3.223857,11,3.5,11L9.58535,11C9.79127,10.417404,10.34689,10,11,10C11.65311,10,12.20873,10.417404,12.41465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), mm = () => fm.cloneNode(!0), gm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,11L11.08535,11C11.29127,10.417404,11.84689,10,12.5,10C13.15311,10,13.70873,10.417404,13.91465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L13.91465,12C13.70873,12.5826,13.15311,13,12.5,13C11.84689,13,11.29127,12.5826,11.08535,12L6.91465,12C6.70873,12.5826,6.15311,13,5.5,13C4.671573,13,4,12.32843,4,11.5C4,10.671573,4.671573,10,5.5,10C6.15311,10,6.70873,10.417404,6.91465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), ym = () => gm.cloneNode(!0), pm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,12.5C6.70873,13.0826,6.15311,13.5,5.5,13.5C4.671573,13.5,4,12.82843,4,12C4,11.171573,4.671573,10.5,5.5,10.5C6.15311,10.5,6.70873,10.917404,6.91465,11.5L16.0853,11.5C16.2913,10.917404,16.846899999999998,10.5,17.5,10.5C18.328400000000002,10.5,19,11.171573,19,12C19,12.82843,18.328400000000002,13.5,17.5,13.5C16.846899999999998,13.5,16.2913,13.0826,16.0853,12.5L6.91465,12.5Z" stroke-opacity="0" stroke="none"></path></svg>'), Cm = () => pm.cloneNode(!0), vm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,12.41465L11,18.5C11,18.7761,11.22386,19,11.5,19C11.77614,19,12,18.7761,12,18.5L12,12.41465C12.5826,12.20873,13,11.65311,13,11C13,10.34689,12.5826,9.79127,12,9.58535L12,3.5C12,3.223857,11.77614,3,11.5,3C11.22386,3,11,3.223857,11,3.5L11,9.58535C10.417404,9.79127,10,10.34689,10,11C10,11.65311,10.417404,12.20873,11,12.41465Z" stroke-opacity="0" stroke="none"></path></svg>'), bm = () => vm.cloneNode(!0), $m = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.66558837890625,19C10.83716137890625,19,10.16558837890625,18.328400000000002,10.16558837890625,17.5C10.16558837890625,16.846899999999998,10.58298437890625,16.2913,11.16557337890625,16.0854L11.16557337890625,11.91464C10.58298437890625,11.70872,10.16558837890625,11.1531,10.16558837890625,10.5C10.16558837890625,9.8469,10.58298437890625,9.29128,11.16557337890625,9.08536L11.16557337890625,4.5C11.16557337890625,4.223857,11.38942837890625,4,11.66556837890625,4C11.94171837890625,4,12.16556837890625,4.223857,12.16556837890625,4.5L12.16556837890625,9.08535C12.74817837890625,9.291260000000001,13.16558837890625,9.846879999999999,13.16558837890625,10.5C13.16558837890625,11.153120000000001,12.74817837890625,11.708739999999999,12.16556837890625,11.91465L12.16556837890625,16.0854C12.74817837890625,16.2913,13.16558837890625,16.846899999999998,13.16558837890625,17.5C13.16558837890625,18.328400000000002,12.49401837890625,19,11.66558837890625,19Z" stroke-opacity="0" stroke="none"></path></svg>'), _m = () => $m.cloneNode(!0), km = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.165603637695312,6.91465C11.748203637695312,6.70873,12.165603637695312,6.15311,12.165603637695312,5.5C12.165603637695312,4.671573,11.494033637695313,4,10.665603637695312,4C9.837176637695313,4,9.165603637695312,4.671573,9.165603637695312,5.5C9.165603637695312,6.15311,9.583007637695312,6.70873,10.165603637695312,6.91465L10.165603637695312,16.0854C9.583007637695312,16.2913,9.165603637695312,16.846899999999998,9.165603637695312,17.5C9.165603637695312,18.328400000000002,9.837176637695313,19,10.665603637695312,19C11.494033637695313,19,12.165603637695312,18.328400000000002,12.165603637695312,17.5C12.165603637695312,16.846899999999998,11.748203637695312,16.2913,11.165603637695312,16.0854L11.165603637695312,6.91465Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), xm = () => km.cloneNode(!0), Lm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.146447,15.753C4.9511845,15.9483,4.9511845,16.2649,5.146447,16.4602C5.341709,16.6554,5.658291,16.6554,5.853554,16.4602L8.156600000000001,14.15711C8.352409999999999,14.25082,8.57173,14.3033,8.8033,14.3033C9.631730000000001,14.3033,10.3033,13.63172,10.3033,12.80329C10.3033,12.57172,10.250820000000001,12.352409999999999,10.157119999999999,12.15659L12.156600000000001,10.15711C12.352409999999999,10.250820000000001,12.571729999999999,10.30329,12.8033,10.30329C13.63173,10.30329,14.3033,9.63172,14.3033,8.80329C14.3033,8.57172,14.25082,8.352409999999999,14.15712,8.15659L16.4602,5.853553C16.6554,5.658291,16.6554,5.341709,16.4602,5.146447C16.2649,4.9511843,15.9483,4.9511843,15.753,5.146447L13.45001,7.449479999999999C13.25419,7.35577,13.03487,7.3032900000000005,12.8033,7.3032900000000005C11.97487,7.3032900000000005,11.3033,7.97487,11.3033,8.80329C11.3033,9.03487,11.35578,9.254190000000001,11.44949,9.450009999999999L9.450009999999999,11.449480000000001C9.254190000000001,11.35577,9.03487,11.30329,8.8033,11.30329C7.97487,11.30329,7.3033,11.97487,7.3033,12.80329C7.3033,13.03487,7.35578,13.25419,7.44949,13.45001L5.146447,15.753Z" stroke-opacity="0" stroke="none"></path></svg>'), wm = () => Lm.cloneNode(!0), Am = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M7.573332939453125,14.54567903564453C7.667042939453125,14.741499035644532,7.719512939453125,14.960809035644532,7.719512939453125,15.19239903564453C7.719512939453125,16.02079903564453,7.047942939453125,16.69239903564453,6.219512939453125,16.69239903564453C5.391085939453125,16.69239903564453,4.719512939453125,16.02079903564453,4.719512939453125,15.19239903564453C4.719512939453125,14.36394903564453,5.391085939453125,13.692379035644532,6.219512939453125,13.692379035644532C6.451092939453125,13.692379035644532,6.670412939453125,13.74485903564453,6.866232939453125,13.83856903564453L9.865702939453126,10.83909903564453C9.771992939453124,10.643279035644532,9.719512939453125,10.42395903564453,9.719512939453125,10.192379035644532C9.719512939453125,9.36394903564453,10.391082939453124,8.692379035644532,11.219512939453125,8.692379035644532C11.451092939453126,8.692379035644532,11.670412939453126,8.74485903564453,11.866232939453125,8.838569035644532L15.462112939453124,5.242645035644531C15.657412939453126,5.047383335644532,15.974012939453125,5.047383335644532,16.169212939453125,5.242645035644531C16.364512939453125,5.437907035644531,16.364512939453125,5.754489035644531,16.169212939453125,5.949752035644531L12.573332939453124,9.545679035644532C12.667042939453125,9.74149903564453,12.719512939453125,9.96080903564453,12.719512939453125,10.192379035644532C12.719512939453125,11.020809035644533,12.047942939453126,11.692379035644532,11.219512939453125,11.692379035644532C10.987942939453125,11.692379035644532,10.768632939453125,11.639909035644532,10.572812939453126,11.54619903564453L7.573332939453125,14.54567903564453Z" stroke-opacity="0" stroke="none"></path></svg>'), Tm = () => Am.cloneNode(!0), Sm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M15.719512939453125,8.461776733398438C16.547912939453127,8.461776733398438,17.219512939453125,7.7902067333984375,17.219512939453125,6.9617767333984375C17.219512939453125,6.133349733398438,16.547912939453127,5.4617767333984375,15.719512939453125,5.4617767333984375C14.891082939453124,5.4617767333984375,14.219512939453125,6.133349733398438,14.219512939453125,6.9617767333984375C14.219512939453125,7.193346733398437,14.271992939453124,7.412666733398438,14.365692939453124,7.608486733398438L7.366222939453126,14.607956733398437C7.170402939453125,14.514256733398437,6.951082939453125,14.461776733398438,6.719512939453125,14.461776733398438C5.891085939453125,14.461776733398438,5.219512939453125,15.133346733398437,5.219512939453125,15.961776733398438C5.219512939453125,16.79017673339844,5.891085939453125,17.461776733398438,6.719512939453125,17.461776733398438C7.547942939453125,17.461776733398438,8.219512939453125,16.79017673339844,8.219512939453125,15.961776733398438C8.219512939453125,15.730176733398437,8.167032939453126,15.510876733398437,8.073322939453124,15.315066733398437L15.072802939453124,8.315586733398437C15.268612939453124,8.409296733398438,15.487912939453125,8.461776733398438,15.719512939453125,8.461776733398438Z" stroke-opacity="0" stroke="none"></path></svg>'), Mm = () => Sm.cloneNode(!0), Pm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17.0643,7.033864912109375L18,3.585784912109375L14.5078,4.509695912109375L15.3537,5.344934912109375L6.02026,14.560584912109375C5.87635,14.517484912109374,5.72366,14.494284912109375,5.5655,14.494284912109375C4.7009,14.494284912109375,4,15.186384912109375,4,16.040084912109375C4,16.893784912109375,4.7009,17.585784912109375,5.5655,17.585784912109375C6.43011,17.585784912109375,7.13101,16.893784912109375,7.13101,16.040084912109375C7.13101,15.722284912109375,7.03392,15.426984912109376,6.86744,15.181384912109374L16.0917,6.073604912109375L17.0643,7.033864912109375Z" stroke-opacity="0" stroke="none"></path></svg>'), Dm = () => Pm.cloneNode(!0), Nm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,13.00505L18.5,13.00505C18.7761,13.00505,19,13.228909999999999,19,13.50505C19,13.781189999999999,18.7761,14.00505,18.5,14.00505L6.91465,14.00505C6.70873,14.58765,6.15311,15.00505,5.5,15.00505C4.671573,15.00505,4,14.33348,4,13.50505C4,12.67662,4.671573,12.00505,5.5,12.00505C6.15311,12.00505,6.70873,12.422450000000001,6.91465,13.00505ZM7.81404,11.625L10.48591,11.625L10.48591,10.90625L9.65193,10.90625L9.65193,7.125L8.997630000000001,7.125C8.71443,7.306641,8.415600000000001,7.419922,7.96443,7.498047L7.96443,8.05078L8.77497,8.05078L8.77497,10.90625L7.81404,10.90625L7.81404,11.625ZM11.081620000000001,11.625L14.0562,11.625L14.0562,10.88281L13.09724,10.88281C12.8863,10.88281,12.59333,10.90625,12.36482,10.93555C13.17537,10.11328,13.84724,9.2207,13.84724,8.39062C13.84724,7.541016,13.28865,7,12.4488,7C11.84333,7,11.446850000000001,7.234375,11.03279,7.679688L11.52497,8.16797C11.747630000000001,7.914062,12.0113,7.697266,12.33552,7.697266C12.7613,7.697266,13.00154,7.982422,13.00154,8.43359C13.00154,9.14648,12.29255,10.00781,11.081620000000001,11.11523L11.081620000000001,11.625ZM15.9605,11.75C16.8121,11.75,17.526899999999998,11.2832,17.526899999999998,10.4375C17.526899999999998,9.82031,17.142200000000003,9.43945,16.6441,9.30078L16.6441,9.27148C17.1129,9.08594,17.3824,8.7207,17.3824,8.21289C17.3824,7.421875,16.8004,7,15.9429,7C15.4215,7,14.9957,7.210938,14.6109,7.541016L15.066,8.11133C15.3258,7.849609,15.5836,7.697266,15.9019,7.697266C16.2789,7.697266,16.4957,7.914062,16.4957,8.28125C16.4957,8.70898,16.2301,9,15.4215,9L15.4215,9.63672C16.3804,9.63672,16.6383,9.91992,16.6383,10.38086C16.6383,10.79688,16.3336,11.03125,15.8824,11.03125C15.4742,11.03125,15.1578,10.82227,14.8922,10.55078L14.4781,11.13281C14.7906,11.486329999999999,15.2652,11.75,15.9605,11.75Z" stroke-opacity="0" stroke="none"></path></svg>'), Om = () => Nm.cloneNode(!0), Im = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.146447,14.178126025390625C2.9511847,13.982826025390626,2.9511847,13.666226025390625,3.146447,13.470926025390625L7.39146,9.225966025390626C7.35417,9.095106025390624,7.33421,8.956946025390625,7.33421,8.814116025390625C7.33421,7.985696025390625,8.00578,7.314116025390625,8.834209999999999,7.314116025390625C8.97703,7.314116025390625,9.11519,7.334086025390625,9.24605,7.371366025390625L13.753,2.864373025390625C13.9483,2.669110325390625,14.2649,2.669110325390625,14.4602,2.864373025390625C14.6554,3.059635025390625,14.6554,3.376217025390625,14.4602,3.571479025390625L10.06916,7.962476025390625C10.23631,8.204386025390626,10.334209999999999,8.497826025390625,10.334209999999999,8.814116025390625C10.334209999999999,9.642546025390626,9.66264,10.314116025390625,8.834209999999999,10.314116025390625C8.51791,10.314116025390625,8.22448,10.216226025390625,7.98256,10.049076025390626L3.853554,14.178126025390625C3.658291,14.373326025390625,3.341709,14.373326025390625,3.146447,14.178126025390625ZM7.67736,19.188526025390626C7.4821,18.993226025390626,7.4821,18.676626025390625,7.67736,18.481426025390626L9.9804,16.178326025390625C9.88669,15.982526025390625,9.834209999999999,15.763226025390624,9.834209999999999,15.531626025390626C9.834209999999999,14.703226025390626,10.50578,14.031626025390626,11.33421,14.031626025390626C11.56579,14.031626025390626,11.78511,14.084126025390624,11.98093,14.177826025390624L13.9804,12.178356025390626C13.8867,11.982536025390624,13.8342,11.763216025390625,13.8342,11.531636025390625C13.8342,10.703206025390624,14.5058,10.031636025390625,15.3342,10.031636025390625C15.5658,10.031636025390625,15.7851,10.084116025390625,15.9809,10.177826025390626L18.284,7.874796025390625C18.4792,7.679536025390625,18.7958,7.679536025390625,18.9911,7.874796025390625C19.1863,8.070056025390624,19.1863,8.386636025390626,18.9911,8.581906025390625L16.688000000000002,10.884936025390624C16.7817,11.080756025390626,16.8342,11.300066025390626,16.8342,11.531636025390625C16.8342,12.360066025390624,16.162599999999998,13.031626025390626,15.3342,13.031626025390626C15.1026,13.031626025390626,14.8833,12.979126025390626,14.6875,12.885426025390625L12.68803,14.884926025390625C12.78174,15.080726025390625,12.83421,15.300026025390626,12.83421,15.531626025390626C12.83421,16.360026025390624,12.16264,17.031626025390626,11.33421,17.031626025390626C11.10264,17.031626025390626,10.88333,16.979126025390627,10.68751,16.885426025390625L8.38446,19.188526025390626C8.1892,19.383726025390626,7.87262,19.383726025390626,7.67736,19.188526025390626Z" stroke-opacity="0" stroke="none"></path></svg>'), Em = () => Im.cloneNode(!0), Bm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.3367688759765626,12.63173C3.5320318759765623,12.82699,3.8486138759765627,12.82699,4.043876875976562,12.63173L11.822052875976562,4.853553C12.017312875976563,4.658291,12.017312875976563,4.341708,11.822052875976562,4.146446C11.626792875976562,3.9511843,11.310202875976563,3.9511843,11.114942875976563,4.146446L3.3367688759765626,11.92462C3.1415071759765625,12.11988,3.1415071759765625,12.43647,3.3367688759765626,12.63173ZM5.001492875976562,17.0351C4.806232875976562,16.8399,4.806232875976562,16.5233,5.001492875976562,16.328L7.304532875976562,14.025C7.210822875976563,13.82916,7.158352875976563,13.60984,7.158352875976563,13.37827C7.158352875976563,12.54984,7.829922875976562,11.87827,8.658352875976561,11.87827C8.889922875976563,11.87827,9.109232875976563,11.93075,9.305052875976562,12.02446L11.304532875976562,10.02498C11.210822875976563,9.82916,11.158352875976561,9.60984,11.158352875976561,9.37827C11.158352875976561,8.54984,11.829922875976562,7.8782700000000006,12.658352875976563,7.8782700000000006C12.889922875976563,7.8782700000000006,13.109232875976563,7.93075,13.305022875976562,8.024460000000001L15.608122875976562,5.72142C15.803322875976562,5.5261499999999995,16.119922875976563,5.5261499999999995,16.315222875976563,5.72142C16.510422875976563,5.9166799999999995,16.510422875976563,6.23326,16.315222875976563,6.42852L14.012122875976562,8.73156C14.105822875976562,8.92738,14.158322875976562,9.1467,14.158322875976562,9.37827C14.158322875976562,10.2067,13.486822875976562,10.87827,12.658352875976563,10.87827C12.426772875976562,10.87827,12.207452875976562,10.82579,12.011642875976563,10.73209L10.012162875976562,12.73156C10.105872875976562,12.92738,10.158352875976561,13.1467,10.158352875976561,13.37827C10.158352875976561,14.2067,9.486772875976563,14.8783,8.658352875976561,14.8783C8.426772875976562,14.8783,8.207452875976562,14.8258,8.011642875976563,14.7321L5.708602875976562,17.0351C5.513342875976562,17.2304,5.196752875976562,17.2304,5.001492875976562,17.0351ZM10.415712875976563,18.328C10.220452875976562,18.5233,9.903862875976563,18.5233,9.708602875976563,18.328C9.513342875976562,18.1328,9.513342875976562,17.816200000000002,9.708602875976563,17.6209L12.304532875976562,15.025C12.210822875976563,14.8292,12.158352875976563,14.6098,12.158352875976563,14.3783C12.158352875976563,13.54984,12.829922875976562,12.87827,13.658322875976562,12.87827C13.889922875976563,12.87827,14.109222875976563,12.93075,14.305022875976562,13.02446L17.486822875976564,9.84274C17.682022875976564,9.64747,17.99862287597656,9.64747,18.19392287597656,9.84274C18.38912287597656,10.038,18.38912287597656,10.35458,18.19392287597656,10.54984L15.012122875976562,13.73156C15.105822875976562,13.92738,15.158322875976562,14.1467,15.158322875976562,14.3783C15.158322875976562,15.2067,14.486822875976562,15.8783,13.658322875976562,15.8783C13.426822875976562,15.8783,13.207422875976562,15.8258,13.011642875976563,15.7321L10.415712875976563,18.328Z" stroke-opacity="0" stroke="none"></path></svg>'), Fm = () => Bm.cloneNode(!0), zm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M13.1889,6C12.98303,6.582599999999999,12.42741,7,11.7743,7C11.12119,7,10.565570000000001,6.582599999999999,10.35965,6L3.5,6C3.223857,6,3,5.77614,3,5.5C3,5.22386,3.223857,5,3.5,5L10.35965,5C10.565570000000001,4.417404,11.12119,4,11.7743,4C12.42741,4,12.98303,4.417404,13.1889,5L18.5,5C18.7761,5,19,5.22386,19,5.5C19,5.77614,18.7761,6,18.5,6L13.1889,6ZM3,8.5C3,8.22386,3.223857,8,3.5,8L18.5,8C18.7761,8,19,8.22386,19,8.5C19,8.77614,18.7761,9,18.5,9L3.5,9C3.223857,9,3,8.77614,3,8.5ZM3.278549,11.5C3.278549,11.22386,3.502407,11,3.778549,11L18.7785,11C19.0547,11,19.2785,11.22386,19.2785,11.5C19.2785,11.77614,19.0547,12,18.7785,12L3.778549,12C3.502407,12,3.278549,11.77614,3.278549,11.5ZM3.139267,14.5C3.139267,14.2239,3.363124,14,3.6392670000000003,14L18.6393,14C18.915399999999998,14,19.1393,14.2239,19.1393,14.5C19.1393,14.7761,18.915399999999998,15,18.6393,15L3.6392670000000003,15C3.363124,15,3.139267,14.7761,3.139267,14.5ZM13.1889,18C12.98303,18.5826,12.42741,19,11.7743,19C11.12119,19,10.565570000000001,18.5826,10.35965,18L3.778549,18C3.502407,18,3.278549,17.7761,3.278549,17.5C3.278549,17.2239,3.502407,17,3.778549,17L10.35965,17C10.565570000000001,16.4174,11.12119,16,11.7743,16C12.42741,16,12.98303,16.4174,13.1889,17L18.7785,17C19.0547,17,19.2785,17.2239,19.2785,17.5C19.2785,17.7761,19.0547,18,18.7785,18L13.1889,18Z" stroke-opacity="0" stroke="none"></path></svg>'), Um = () => zm.cloneNode(!0), Rm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4.91465,6C4.70873,6.582599999999999,4.15311,7,3.5,7C2.671573,7,2,6.32843,2,5.5C2,4.671573,2.671573,4,3.5,4C4.15311,4,4.70873,4.417404,4.91465,5L18.2257,5C18.5018,5,18.7257,5.22386,18.7257,5.5C18.7257,5.77614,18.5018,6,18.2257,6L4.91465,6ZM2.7257,8.5C2.7257,8.22386,2.949558,8,3.2257,8L18.2257,8C18.5018,8,18.7257,8.22386,18.7257,8.5C18.7257,8.77614,18.5018,9,18.2257,9L3.2257,9C2.949558,9,2.7257,8.77614,2.7257,8.5ZM3.00425,11.5C3.00425,11.22386,3.22811,11,3.50425,11L18.5042,11C18.7804,11,19.0042,11.22386,19.0042,11.5C19.0042,11.77614,18.7804,12,18.5042,12L3.50425,12C3.22811,12,3.00425,11.77614,3.00425,11.5ZM2.864967,14.5C2.864967,14.2239,3.08882,14,3.36497,14L18.365,14C18.6411,14,18.865,14.2239,18.865,14.5C18.865,14.7761,18.6411,15,18.365,15L3.36497,15C3.08882,15,2.864967,14.7761,2.864967,14.5ZM20,17.5C20,18.328400000000002,19.3284,19,18.5,19C17.846899999999998,19,17.2913,18.5826,17.0854,18L3.50425,18C3.22811,18,3.00425,17.7761,3.00425,17.5C3.00425,17.2239,3.22811,17,3.50425,17L17.0854,17C17.2913,16.4174,17.846899999999998,16,18.5,16C19.3284,16,20,16.671599999999998,20,17.5Z" stroke-opacity="0" stroke="none"></path></svg>'), Vm = () => Rm.cloneNode(!0), Km = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="5" ry="5" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="3" ry="3" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse></svg>'), jm = () => Km.cloneNode(!0), Qm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3,7.32468C5.90649,3.3893050000000002,11.49833,2.81306,14.6674,6.31944C14.9056,6.1554199999999994,15.192,6.05979,15.5,6.05979C15.845,6.05979,16.1628,6.17974,16.4162,6.381349999999999L18.4509,4.23827L19,4.816615L16.8945,7.03429C16.962600000000002,7.21075,17,7.40319,17,7.60463C17,8.45782,16.328400000000002,9.14947,15.5,9.14947C14.6716,9.14947,14,8.45782,14,7.60463C14,7.36402,14.0534,7.13625,14.1487,6.93322C11.32695,3.748365,6.25159,4.253956,3.612785,7.82695L3,7.32468ZM14.09,15.4717C15.7427,13.78985,16.244500000000002,11.524740000000001,15.5633,9.30134L15.5618,9.30134L16.3012,9.0502C17.072400000000002,11.56646,16.497700000000002,14.158,14.6282,16.0599C12.28737,18.442,8.62386,18.6988,6.41348,16.4501C4.5526,14.5572,4.52076,11.19671,6.36766,9.3177C7.89069,7.76754,10.07544,7.706189999999999,11.56741,9.22363C11.95453,9.61742,12.24817,10.08363,12.43369,10.57677L14.1451,8.77421L14.6942,9.35256L12.64982,11.50582C12.65827,11.59712,12.66295,11.68839,12.66378,11.77936C12.87398,12.04523,13,12.38451,13,12.7541C13,13.60729,12.32843,14.2989,11.5,14.2989C10.67157,14.2989,10,13.60729,10,12.7541C10,11.90091,10.67157,11.20926,11.5,11.20926C11.60387,11.20926,11.70528,11.220130000000001,11.8032,11.240829999999999L11.81763,11.22564C11.69858,10.71874,11.42858,10.21929,11.0284,9.81179C9.844000000000001,8.60765,8.136890000000001,8.65592,6.90822,9.90586C5.37975,11.460930000000001,5.40693,14.288,6.95404,15.8619C8.84598,17.7867,12.03496,17.5626,14.09,15.4717Z" stroke-opacity="0" stroke="none"></path></svg>'), Zm = () => Qm.cloneNode(!0), Hm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4,17.0854L4,3.5C4,3.223858,4.22386,3,4.5,3C4.77614,3,5,3.223858,5,3.5L5,10L7.57584,10L9.8127,4.46359C9.91614,4.20756,10.20756,4.08386,10.46359,4.1873000000000005C10.71963,4.29075,10.84333,4.58216,10.73988,4.8382000000000005L8.65438,10L11.08535,10C11.29127,9.4174,11.84689,9,12.5,9C12.65154,9,12.79784,9.02247,12.93573,9.06427L16.6464,5.35355C16.8417,5.15829,17.1583,5.15829,17.3536,5.35355C17.5488,5.54882,17.5488,5.8654,17.3536,6.06066L13.7475,9.66675C13.907,9.90508,14,10.19168,14,10.5C14,11.15311,13.5826,11.70873,13,11.91465L13,14.3638L18.3714,12.1936C18.6274,12.09015,18.918799999999997,12.21385,19.0222,12.46989C19.1257,12.72592,19.002,13.0173,18.746000000000002,13.1208L13,15.4423L13,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854ZM6.3729499999999994,17.0413L12,14.7678L12,11.91465C11.88136,11.87271,11.76956,11.81627,11.66675,11.74746L6.3729499999999994,17.0413ZM12,15.8463L6.6694700000000005,18L12,18L12,15.8463ZM6.38629,15.6137L8.250350000000001,11L11,11L6.38629,15.6137ZM5,11L7.17182,11L5,16.3754L5,11Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Wm = () => Hm.cloneNode(!0), Ym = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17,4.5C17,5.32843,16.328400000000002,6,15.5,6C15.0931,6,14.7241,5.83802,14.4539,5.57503L5.98992,8.32515C5.99658,8.38251,6,8.440850000000001,6,8.5C6,9.15311,5.582599999999999,9.70873,5,9.91465L5,11.08535C5.42621,11.236,5.763999999999999,11.57379,5.91465,12L19.5,12C19.7761,12,20,12.22386,20,12.5C20,12.77614,19.7761,13,19.5,13L5.91465,13C5.70873,13.5826,5.15311,14,4.5,14C3.671573,14,3,13.3284,3,12.5C3,11.84689,3.417404,11.29127,4,11.08535L4,9.91465C3.417404,9.70873,3,9.15311,3,8.5C3,7.67157,3.671573,7,4.5,7C4.90411,7,5.2709,7.15981,5.5406200000000005,7.41967L14.0093,4.66802C14.0032,4.6128599999999995,14,4.5568,14,4.5C14,3.671573,14.6716,3,15.5,3C16.328400000000002,3,17,3.671573,17,4.5ZM4,15.5C4,15.2239,4.22386,15,4.5,15L19.5,15C19.7761,15,20,15.2239,20,15.5C20,15.7761,19.7761,16,19.5,16L4.5,16C4.22386,16,4,15.7761,4,15.5ZM4,18.5C4,18.2239,4.22386,18,4.5,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L4.5,19C4.22386,19,4,18.7761,4,18.5Z" stroke-opacity="0" stroke="none"></path></svg>'), qm = () => Ym.cloneNode(!0), Gm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M20,3.5C20,4.15311,19.5826,4.70873,19,4.91465L19,18.5C19,18.7761,18.7761,19,18.5,19L4.91465,19C4.70873,19.5826,4.15311,20,3.5,20C2.671573,20,2,19.3284,2,18.5C2,17.846899999999998,2.417404,17.2913,3,17.0854L3,3.5C3,3.22386,3.22386,3,3.5,3L17.0854,3C17.2913,2.417404,17.846899999999998,2,18.5,2C19.3284,2,20,2.671573,20,3.5ZM17.0854,4C17.236,4.42621,17.5738,4.763999999999999,18,4.91465L18,8L14,8L14,4L17.0854,4ZM13,4L13,8L9,8L9,4L13,4ZM13,9L9,9L9,13L13,13L13,9ZM13,14L9,14L9,18L13,18L13,14ZM14,18L14,14L18,14L18,18L14,18ZM18,13L14,13L14,9L18,9L18,13ZM4.91465,18C4.763999999999999,17.5738,4.42621,17.236,4,17.0854L4,14L8,14L8,18L4.91465,18ZM4,8L4,4L8,4L8,8L4,8ZM8,9L8,13L4,13L4,9L8,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Xm = () => Gm.cloneNode(!0), Jm = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" fill="none" stroke-opacity="1" stroke-width="1"></ellipse></svg>'), eg = () => Jm.cloneNode(!0), tg = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.57625,6.9981C11.55099,6.999359999999999,11.52557,7,11.5,7C11.34,7,11.18584,6.97495,11.04125,6.9285499999999995L5.55401,16.4327C5.713760000000001,16.5905,5.83826,16.7839,5.91465,17L16.0854,17C16.2187,16.622700000000002,16.4987,16.314700000000002,16.8569,16.1445L11.57625,6.9981ZM12.50759,6.611219999999999C12.81005,6.336790000000001,13,5.94058,13,5.5C13,4.671573,12.32843,4,11.5,4C10.67157,4,10,4.671573,10,5.5C10,5.80059,10.08841,6.08052,10.24066,6.31522L4.64514,16.0069C4.59738,16.002299999999998,4.54896,16,4.5,16C3.671573,16,3,16.671599999999998,3,17.5C3,18.328400000000002,3.671573,19,4.5,19C5.15311,19,5.70873,18.5826,5.91465,18L16.0854,18C16.2913,18.5826,16.846899999999998,19,17.5,19C18.328400000000002,19,19,18.328400000000002,19,17.5C19,16.8365,18.5691,16.2735,17.971899999999998,16.075699999999998L12.50759,6.611219999999999Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), ng = () => tg.cloneNode(!0), rg = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19,4.5C19,5.15311,18.5826,5.70873,18,5.91465L18,18.5C18,18.7761,17.7761,19,17.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854L4,4.5C4,4.22386,4.22386,4,4.5,4L16.0854,4C16.2913,3.417404,16.846899999999998,3,17.5,3C18.328400000000002,3,19,3.671573,19,4.5ZM5,5L16.0854,5C16.236,5.42621,16.5738,5.763999999999999,17,5.91465L17,18L5.91465,18C5.763999999999999,17.5738,5.42621,17.236,5,17.0854L5,5Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), og = () => rg.cloneNode(!0), ig = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19.6401,7.99355C20.4028,7.92291,21,7.2811900000000005,21,6.5C21,5.671573,20.3284,5,19.5,5C18.8469,5,18.2913,5.417404,18.0854,6L7.62067,6C7.34453,6,7.12067,6.22386,7.12067,6.5C7.12067,6.5479,7.12741,6.59423,7.13999,6.63809L3.2294099999999997,15.0243C2.530138,15.1517,2,15.764,2,16.5C2,17.328400000000002,2.671573,18,3.5,18C4.15311,18,4.70873,17.5826,4.91465,17L14.5963,17C14.6456,17.076,14.7162,17.1396,14.8044,17.1807C15.0546,17.2974,15.3521,17.1891,15.4688,16.9388L19.6401,7.99355ZM14.7896,16.0293L18.6551,7.739599999999999C18.3942,7.56144,18.1925,7.30307,18.0854,7L8.0746,7L4.25044,15.2009C4.55701,15.3784,4.79493,15.6613,4.91465,16L14.6207,16C14.68,16,14.7368,16.0103,14.7896,16.0293Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), ag = () => ig.cloneNode(!0), sg = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.134443814697265,7.494615087890625L8.764323814697265,7.494615087890625L8.764323814697265,3.414215087890625L8.310223814697267,3.414215087890625L7.294603814697266,4.005035087890625L7.289713814697266,4.634915087890625L8.134443814697265,4.149892087890625L8.134443814697265,7.494615087890625ZM18.832003814697266,6.933095087890624Q19.004603814697266,6.635245087890625,19.004603814697266,6.2543850878906255Q19.004603814697266,5.884915087890625,18.845103814697264,5.593575087890625Q18.685503814697267,5.3006050878906255,18.399103814697266,5.136225087890625Q18.114303814697266,4.9702050878906245,17.754603814697266,4.9653250878906245L18.820603814697265,3.840647087890625L18.820603814697265,3.414215087890625L16.519203814697264,3.414215087890625L16.519203814697264,3.939931087890625L18.050803814697264,3.939931087890625L16.719403814697266,5.334785087890625L17.074203814697263,5.7205350878906245Q17.254903814697265,5.484525087890625,17.619503814697268,5.484525087890625Q17.980803814697268,5.484525087890625,18.187503814697266,5.689605087890625Q18.394203814697267,5.894685087890625,18.394203814697267,6.2543850878906255Q18.394203814697267,6.604315087890625,18.187503814697266,6.822415087890625Q17.980803814697268,7.0405150878906255,17.640603814697265,7.0405150878906255Q17.334603814697267,7.0405150878906255,17.124703814697266,6.890775087890625Q16.914703814697265,6.739415087890626,16.820303814697265,6.469225087890624L16.354803814697263,6.744295087890626Q16.480103814697266,7.125155087890625,16.821903814697265,7.341625087890625Q17.165403814697264,7.559725087890625,17.640603814697265,7.559725087890625Q18.039403814697266,7.559725087890625,18.348603814697267,7.393705087890625Q18.659503814697267,7.229315087890625,18.832003814697266,6.933095087890624ZM10.000003814697266,10.634915087890626C10.000003814697266,11.024655087890626,9.851363814697265,11.379685087890625,9.607683814697266,11.646395087890625L12.168903814697266,15.171615087890626C12.275403814697265,15.147615087890625,12.386203814697266,15.134915087890626,12.500003814697266,15.134915087890626C12.596503814697266,15.134915087890626,12.690803814697265,15.144015087890624,12.782303814697265,15.161415087890624L16.108803814697268,11.196955087890625C16.038703814697264,11.023375087890624,16.000003814697266,10.833655087890625,16.000003814697266,10.634915087890626C16.000003814697266,9.806495087890625,16.671603814697264,9.134915087890626,17.500003814697266,9.134915087890626C18.328403814697264,9.134915087890626,19.000003814697266,9.806495087890625,19.000003814697266,10.634915087890626C19.000003814697266,11.463345087890625,18.328403814697264,12.134915087890626,17.500003814697266,12.134915087890626C17.239503814697265,12.134915087890626,16.994503814697268,12.068495087890625,16.781003814697264,11.951675087890624L13.654703814697266,15.677415087890624C13.870303814697266,15.937215087890625,14.000003814697266,16.270915087890625,14.000003814697266,16.634915087890626C14.000003814697266,17.463315087890624,13.328403814697266,18.134915087890626,12.500003814697266,18.134915087890626C11.671573814697265,18.134915087890626,11.000003814697266,17.463315087890624,11.000003814697266,16.634915087890626C11.000003814697266,16.284415087890626,11.120193814697265,15.962015087890626,11.321603814697266,15.706715087890625L8.715393814697265,12.119565087890624C8.645053814697267,12.129685087890625,8.573143814697266,12.134915087890626,8.500003814697266,12.134915087890626C8.162103814697264,12.134915087890626,7.8503038146972655,12.023195087890626,7.599523814697266,11.834665087890626L4.505583814697266,15.521915087890624C4.809213814697266,15.796415087890624,5.000003814697266,16.193415087890624,5.000003814697266,16.634915087890626C5.000003814697266,17.463315087890624,4.328433814697266,18.134915087890626,3.5000038146972656,18.134915087890626C2.6715768146972656,18.134915087890626,2.0000038146972656,17.463315087890624,2.0000038146972656,16.634915087890626C2.0000038146972656,15.806515087890626,2.6715768146972656,15.134915087890626,3.5000038146972656,15.134915087890626C3.508253814697266,15.134915087890626,3.5164838146972657,15.135015087890626,3.524703814697266,15.135115087890625L7.033823814697266,10.953115087890625C7.011673814697265,10.850565087890626,7.000003814697266,10.744105087890624,7.000003814697266,10.634915087890626C7.000003814697266,9.806495087890625,7.671573814697266,9.134915087890626,8.500003814697266,9.134915087890626C9.328433814697267,9.134915087890626,10.000003814697266,9.806495087890625,10.000003814697266,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), lg = () => sg.cloneNode(!0), cg = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.13444,7.494615087890625L8.76432,7.494615087890625L8.76432,3.414215087890625L8.310220000000001,3.414215087890625L7.2946,4.005035087890625L7.28971,4.634915087890625L8.13444,4.149892087890625L8.13444,7.494615087890625ZM18.832,6.929835087890625Q19.0046,6.635245087890625,19.0046,6.2543850878906255Q19.0046,5.889805087890625,18.8451,5.5952050878906245Q18.6855,5.3006050878906255,18.3975,5.132965087890625Q18.1094,4.9653250878906245,17.7399,4.9653250878906245Q17.435499999999998,4.9653250878906245,17.1556,5.149245087890625L17.2793,3.939931087890625L18.8304,3.939931087890625L18.8304,3.414215087890625L16.7406,3.414215087890625L16.5094,5.665195087890625L17.0156,5.795405087890625Q17.095399999999998,5.655425087890626,17.2516,5.570795087890625Q17.4095,5.484525087890625,17.6357,5.484525087890625Q17.9694,5.484525087890625,18.1842,5.697745087890625Q18.4007,5.909335087890625,18.4007,6.2543850878906255Q18.4007,6.604315087890625,18.1842,6.822415087890625Q17.9694,7.0405150878906255,17.6292,7.0405150878906255Q17.3298,7.0405150878906255,17.119799999999998,6.890775087890625Q16.9098,6.739415087890626,16.825200000000002,6.474115087890625L16.3597,6.749175087890626Q16.470399999999998,7.110505087890624,16.807299999999998,7.335115087890625Q17.144199999999998,7.559725087890625,17.6292,7.559725087890625Q18.0296,7.559725087890625,18.3438,7.392075087890625Q18.6595,7.224435087890625,18.832,6.929835087890625ZM10,10.634915087890626C10,11.024655087890626,9.85136,11.379685087890625,9.60768,11.646395087890625L12.1689,15.171615087890626C12.2754,15.147615087890625,12.3862,15.134915087890626,12.5,15.134915087890626C12.5965,15.134915087890626,12.6908,15.144015087890624,12.7823,15.161415087890624L16.108800000000002,11.196955087890625C16.0387,11.023375087890624,16,10.833655087890625,16,10.634915087890626C16,9.806495087890625,16.671599999999998,9.134915087890626,17.5,9.134915087890626C18.3284,9.134915087890626,19,9.806495087890625,19,10.634915087890626C19,11.463345087890625,18.3284,12.134915087890626,17.5,12.134915087890626C17.2395,12.134915087890626,16.994500000000002,12.068505087890625,16.781,11.951675087890624L13.6547,15.677415087890624C13.8703,15.937215087890625,14,16.270915087890625,14,16.634915087890626C14,17.463315087890624,13.3284,18.134915087890626,12.5,18.134915087890626C11.67157,18.134915087890626,11,17.463315087890624,11,16.634915087890626C11,16.284415087890626,11.12019,15.962015087890626,11.3216,15.706715087890625L8.71539,12.119565087890624C8.645050000000001,12.129685087890625,8.57314,12.134915087890626,8.5,12.134915087890626C8.162099999999999,12.134915087890626,7.8503,12.023195087890626,7.59952,11.834665087890626L4.50558,15.521915087890624C4.80921,15.796415087890624,5,16.193415087890624,5,16.634915087890626C5,17.463315087890624,4.32843,18.134915087890626,3.5,18.134915087890626C2.671573,18.134915087890626,2,17.463315087890624,2,16.634915087890626C2,15.806515087890626,2.671573,15.134915087890626,3.5,15.134915087890626C3.5082500000000003,15.134915087890626,3.51648,15.135015087890626,3.5247,15.135115087890625L7.03382,10.953115087890625C7.01167,10.850565087890626,7,10.744105087890624,7,10.634915087890626C7,9.806495087890625,7.67157,9.134915087890626,8.5,9.134915087890626C9.32843,9.134915087890626,10,9.806495087890625,10,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), ug = () => cg.cloneNode(!0), dg = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M18.8532,7.020985087890625Q19.0257,6.734525087890625,19.0257,6.369945087890625Q19.0257,6.020005087890625,18.8499,5.754705087890625Q18.6758,5.489415087890626,18.3649,5.339675087890625Q18.5944,5.209465087890625,18.7214,4.994615087890625Q18.8499,4.779775087890625,18.8499,4.5193550878906255Q18.8499,4.2003480878906245,18.7002,3.951324087890625Q18.5505,3.700673087890625,18.277,3.557444087890625Q18.0052,3.414215087890625,17.6455,3.414215087890625Q17.285800000000002,3.414215087890625,17.0107,3.557444087890625Q16.7357,3.700673087890625,16.5843,3.951324087890625Q16.4346,4.2003480878906245,16.4346,4.5193550878906255Q16.4346,4.779775087890625,16.561500000000002,4.994615087890625Q16.6901,5.209465087890625,16.919600000000003,5.339675087890625Q16.6055,5.489415087890626,16.4297,5.757965087890625Q16.255499999999998,6.024895087890625,16.255499999999998,6.369945087890625Q16.255499999999998,6.734525087890625,16.4297,7.020985087890625Q16.6055,7.305815087890625,16.919600000000003,7.465325087890625Q17.2354,7.624825087890625,17.6455,7.624825087890625Q18.0557,7.624825087890625,18.3682,7.465325087890625Q18.6807,7.305815087890625,18.8532,7.020985087890625ZM8.76432,7.559725087890625L8.13444,7.559725087890625L8.13444,4.214996087890625L7.28971,4.700025087890625L7.2946,4.070139087890625L8.310220000000001,3.479319087890625L8.76432,3.479319087890625L8.76432,7.559725087890625ZM17.1816,4.955555087890625Q17.0042,4.784655087890625,17.0042,4.5095950878906255Q17.0042,4.229645087890625,17.18,4.057119087890625Q17.355800000000002,3.884592087890625,17.6455,3.884592087890625Q17.935200000000002,3.884592087890625,18.1077,4.057119087890625Q18.2803,4.229645087890625,18.2803,4.5095950878906255Q18.2803,4.784655087890625,18.1045,4.955555087890625Q17.930300000000003,5.124825087890625,17.6455,5.124825087890625Q17.3607,5.124825087890625,17.1816,4.955555087890625ZM18.2217,5.7953950878906255Q18.4398,6.005365087890625,18.4398,6.3552950878906245Q18.4398,6.705235087890625,18.2217,6.915195087890625Q18.0052,7.125155087890625,17.6455,7.125155087890625Q17.285800000000002,7.125155087890625,17.067700000000002,6.915195087890625Q16.849600000000002,6.705235087890625,16.849600000000002,6.3552950878906245Q16.849600000000002,6.005365087890625,17.064500000000002,5.7953950878906255Q17.2793,5.585435087890625,17.6455,5.585435087890625Q18.0052,5.585435087890625,18.2217,5.7953950878906255ZM9.60768,11.711495087890626C9.85136,11.444785087890626,10,11.089765087890626,10,10.700025087890625C10,9.871595087890626,9.32843,9.200025087890625,8.5,9.200025087890625C7.67157,9.200025087890625,7,9.871595087890626,7,10.700025087890625C7,10.809205087890625,7.01167,10.915665087890625,7.03382,11.018215087890624L3.5247,15.200215087890625C3.51648,15.200115087890625,3.5082500000000003,15.200015087890625,3.5,15.200015087890625C2.671573,15.200015087890625,2,15.871615087890625,2,16.700015087890627C2,17.528415087890625,2.671573,18.200015087890627,3.5,18.200015087890627C4.32843,18.200015087890627,5,17.528415087890625,5,16.700015087890627C5,16.258515087890625,4.80921,15.861515087890625,4.50558,15.587015087890626L7.59952,11.899765087890625C7.8503,12.088295087890625,8.162099999999999,12.200025087890625,8.5,12.200025087890625C8.57314,12.200025087890625,8.645050000000001,12.194785087890626,8.71539,12.184675087890625L11.3216,15.771815087890625C11.12019,16.027215087890625,11,16.349515087890623,11,16.700015087890627C11,17.528415087890625,11.67157,18.200015087890627,12.5,18.200015087890627C13.3284,18.200015087890627,14,17.528415087890625,14,16.700015087890627C14,16.336015087890623,13.8703,16.002315087890626,13.6547,15.742515087890625L16.781,12.016775087890625C16.994500000000002,12.133605087890626,17.2395,12.200025087890625,17.5,12.200025087890625C18.3284,12.200025087890625,19,11.528445087890624,19,10.700025087890625C19,9.871595087890626,18.3284,9.200025087890625,17.5,9.200025087890625C16.671599999999998,9.200025087890625,16,9.871595087890626,16,10.700025087890625C16,10.898765087890624,16.0387,11.088475087890625,16.108800000000002,11.262055087890625L12.7823,15.226515087890625C12.6908,15.209115087890625,12.5965,15.200015087890625,12.5,15.200015087890625C12.3862,15.200015087890625,12.2754,15.212715087890626,12.1689,15.236715087890625L9.60768,11.711495087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), hg = () => dg.cloneNode(!0), fg = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M9.474616630859375,7.494615087890625L8.844736630859375,7.494615087890625L8.844736630859375,4.149892087890625L8.000006630859374,4.634915087890625L8.004896630859374,4.005035087890625L9.020516630859376,3.414215087890625L9.474616630859375,3.414215087890625L9.474616630859375,7.494615087890625ZM18.529296630859378,4.8318550878906255Q18.307996630859375,5.028795087890625,18.122396630859377,5.385245087890625Q17.868496630859376,5.019035087890625,17.629196630859376,4.8269750878906255Q17.389996630859375,4.634915087890625,17.168596630859376,4.634915087890625Q16.794296630859375,4.634915087890625,16.522496630859376,4.976715087890625Q16.252296630859377,5.3168850878906255,16.252296630859377,5.7856350878906255Q16.252296630859377,6.218575087890625,16.502896630859375,6.521315087890625Q16.755196630859373,6.822415087890625,17.114896630859377,6.822415087890625Q17.368796630859375,6.822415087890625,17.588596630859374,6.625475087890624Q17.809896630859377,6.428535087890625,17.998696630859374,6.0688350878906245Q18.249396630859373,6.439935087890625,18.488596630859377,6.631985087890625Q18.727896630859377,6.822415087890625,18.952496630859375,6.822415087890625Q19.326796630859373,6.822415087890625,19.596996630859376,6.482245087890625Q19.868796630859375,6.140455087890626,19.868796630859375,5.671705087890626Q19.868796630859375,5.238755087890625,19.618196630859376,4.937655087890625Q19.367496630859375,4.634915087890625,19.006196630859375,4.634915087890625Q18.750696630859377,4.634915087890625,18.529296630859378,4.8318550878906255ZM18.337296630859377,5.674955087890625L18.278696630859375,5.596835087890625Q18.449596630859375,5.272935087890625,18.622096630859374,5.1101750878906245Q18.794596630859374,4.947415087890625,18.967096630859373,4.947415087890625Q19.194996630859375,4.947415087890625,19.346396630859374,5.1345950878906255Q19.497696630859377,5.320135087890625,19.497696630859377,5.598455087890625Q19.497696630859377,5.8914250878906245,19.360996630859376,6.096505087890625Q19.224296630859374,6.301585087890626,19.027396630859375,6.301585087890626Q18.915096630859374,6.301585087890626,18.742496630859375,6.146965087890624Q18.569996630859375,5.992335087890625,18.337296630859377,5.674955087890625ZM17.785496630859377,5.779125087890625L17.842496630859372,5.857245087890625Q17.668296630859373,6.186025087890625,17.495796630859374,6.348785087890625Q17.324896630859374,6.509915087890625,17.153996630859375,6.509915087890625Q16.926096630859377,6.509915087890625,16.774796630859377,6.324375087890624Q16.623396630859375,6.137195087890625,16.623396630859375,5.858875087890625Q16.623396630859375,5.565905087890625,16.761696630859376,5.360825087890625Q16.900096630859373,5.1557550878906255,17.095396630859376,5.1557550878906255Q17.228896630859374,5.1557550878906255,17.365596630859375,5.2778250878906245Q17.502296630859377,5.399895087890625,17.785496630859377,5.779125087890625ZM10.710296630859375,10.634915087890626C10.710296630859375,11.024655087890626,10.561656630859375,11.379685087890625,10.317976630859375,11.646395087890625L12.879196630859376,15.171615087890626C12.985696630859374,15.147615087890625,13.096496630859376,15.134915087890626,13.210296630859375,15.134915087890626C13.306796630859376,15.134915087890626,13.401096630859374,15.144015087890624,13.492596630859374,15.161415087890624L16.819096630859377,11.196955087890625C16.748996630859374,11.023375087890624,16.710296630859375,10.833655087890625,16.710296630859375,10.634915087890626C16.710296630859375,9.806495087890625,17.381896630859373,9.134915087890626,18.210296630859375,9.134915087890626C19.038696630859373,9.134915087890626,19.710296630859375,9.806495087890625,19.710296630859375,10.634915087890626C19.710296630859375,11.463345087890625,19.038696630859373,12.134915087890626,18.210296630859375,12.134915087890626C17.949796630859375,12.134915087890626,17.704796630859377,12.068505087890625,17.491296630859374,11.951675087890624L14.364996630859375,15.677415087890624C14.580596630859375,15.937215087890625,14.710296630859375,16.270915087890625,14.710296630859375,16.634915087890626C14.710296630859375,17.463315087890624,14.038696630859375,18.134915087890626,13.210296630859375,18.134915087890626C12.381866630859374,18.134915087890626,11.710296630859375,17.463315087890624,11.710296630859375,16.634915087890626C11.710296630859375,16.284415087890626,11.830486630859374,15.962015087890626,12.031896630859375,15.706715087890625L9.425686630859374,12.119565087890624C9.355346630859376,12.129685087890625,9.283436630859375,12.134915087890626,9.210296630859375,12.134915087890626C8.872396630859374,12.134915087890626,8.560596630859376,12.023195087890626,8.309816630859375,11.834665087890626L5.215876630859375,15.521915087890624C5.519506630859375,15.796415087890624,5.710296630859375,16.193415087890624,5.710296630859375,16.634915087890626C5.710296630859375,17.463315087890624,5.038726630859375,18.134915087890626,4.210296630859375,18.134915087890626C3.381869630859375,18.134915087890626,2.710296630859375,17.463315087890624,2.710296630859375,16.634915087890626C2.710296630859375,15.806515087890626,3.381869630859375,15.134915087890626,4.210296630859375,15.134915087890626C4.218546630859375,15.134915087890626,4.226776630859375,15.135015087890626,4.234996630859375,15.135115087890625L7.744116630859375,10.953115087890625C7.721966630859375,10.850565087890626,7.710296630859375,10.744105087890624,7.710296630859375,10.634915087890626C7.710296630859375,9.806495087890625,8.381866630859374,9.134915087890626,9.210296630859375,9.134915087890626C10.038726630859376,9.134915087890626,10.710296630859375,9.806495087890625,10.710296630859375,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), mg = () => fg.cloneNode(!0), gg = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M21,5.5C21,6.32843,20.3284,7,19.5,7C19.4136,7,19.3289,6.99269,19.2465,6.97866L15.6257,15.5086C15.8587,15.7729,16,16.119999999999997,16,16.5C16,17.328400000000002,15.3284,18,14.5,18C13.8469,18,13.2913,17.5826,13.0854,17L3.91465,17C3.70873,17.5826,3.15311,18,2.5,18C1.671573,18,1,17.328400000000002,1,16.5C1,15.6716,1.671573,15,2.5,15C2.5840199999999998,15,2.66643,15.0069,2.74668,15.0202L6.36934,6.48574C6.13933,6.22213,6,5.87733,6,5.5C6,4.671573,6.67157,4,7.5,4C8.15311,4,8.70873,4.417404,8.91465,5L18.0854,5C18.2913,4.417404,18.8469,4,19.5,4C20.3284,4,21,4.671573,21,5.5ZM18.0854,6L8.91465,6C8.892579999999999,6.06243,8.8665,6.12296,8.83672,6.18128L13.9814,15.0921C14.143,15.0325,14.3177,15,14.5,15C14.584,15,14.6664,15.0069,14.7467,15.0202L18.3693,6.48574C18.2462,6.3446,18.149,6.1802,18.0854,6ZM13.2036,15.745L8.0861,6.8811800000000005C7.90605,6.95768,7.70797,7,7.5,7C7.41359,7,7.32888,6.99269,7.24647,6.97866L3.62571,15.5086C3.7512,15.651,3.8501,15.8174,3.91465,16L13.0854,16C13.1169,15.9108,13.1566,15.8255,13.2036,15.745Z" stroke-opacity="0" stroke="none"></path></svg>'), yg = () => gg.cloneNode(!0), pg = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.92159,5.93994C6.04014,5.90529,6.152620000000001,5.85639,6.25704,5.79523L9.12729,9.89437C9.045449999999999,10.07959,9,10.28449,9,10.5C9,10.79522,9.08529,11.07053,9.232569999999999,11.30262L4.97573,16.7511L5.92159,5.93994ZM4.92259,5.8848400000000005C4.38078,5.658659999999999,4,5.1238,4,4.5C4,3.671573,4.67157,3,5.5,3C6.2157,3,6.81433,3.50124,6.96399,4.17183L15.1309,4.88634C15.3654,4.36387,15.8902,4,16.5,4C17.328400000000002,4,18,4.67157,18,5.5C18,6.08983,17.659599999999998,6.60015,17.1645,6.84518L18.4264,14.0018C18.4508,14.0006,18.4753,14,18.5,14C19.3284,14,20,14.6716,20,15.5C20,16.328400000000002,19.3284,17,18.5,17C17.932499999999997,17,17.4386,16.6849,17.183799999999998,16.22L5.99686,18.5979C5.946429999999999,19.3807,5.29554,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.869300000000003,3.389292,17.3295,3.94071,17.1077L4.92259,5.8848400000000005ZM5.72452,17.6334C5.69799,17.596,5.6698,17.5599,5.64004,17.525100000000002L10.01843,11.92103C10.16958,11.97223,10.33155,12,10.5,12C10.80059,12,11.08052,11.91158,11.31522,11.75934L17.0606,15.0765C17.0457,15.1271,17.0335,15.1789,17.023899999999998,15.2317L5.72452,17.6334ZM11.92855,10.95875L17.4349,14.1379L16.1699,6.96356C15.9874,6.92257,15.8174,6.8483,15.6667,6.74746L11.99771,10.4165C11.99923,10.44414,12,10.47198,12,10.5C12,10.66,11.97495,10.814160000000001,11.92855,10.95875ZM10.5,9C10.259830000000001,9,10.03285,9.05644,9.83159,9.15679L7.04919,5.1831L15.0493,5.88302C15.054,5.90072,15.059,5.91829,15.0643,5.9357299999999995L11.56066,9.43934C11.28921,9.16789,10.91421,9,10.5,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Cg = () => pg.cloneNode(!0), vg = /* @__PURE__ */ $('<svg viewBox="0 0 22 22"><path d="M4.727219638671875,8.007996215820313L9.973849638671876,2.7629472158203123C10.167279638671875,2.5696791158203123,10.480729638671875,2.5696791158203123,10.674169638671875,2.7629472158203123L13.223329638671874,5.311756215820313C13.416929638671874,5.505236215820313,13.416929638671874,5.8189862158203125,13.223329638671874,6.012466215820313L7.977129638671875,11.257906215820313C7.379859638671875,11.855176215820313,7.407609638671875,12.909396215820312,8.033809638671876,13.535596215820313C8.660409638671876,14.162596215820313,9.713849638671874,14.189996215820312,10.311129638671876,13.591896215820313L15.556929638671875,8.346066215820311C15.750429638671875,8.152526215820313,16.064229638671875,8.152526215820313,16.257629638671872,8.346066215820311L18.806529638671876,10.895266215820312C19.000029638671876,11.088746215820313,19.000029638671876,11.402496215820312,18.806529638671876,11.595976215820313L13.560629638671875,16.841796215820313C11.165619638671876,19.237196215820312,7.197149638671875,19.19919621582031,4.783499638671875,16.785496215820313C2.3698426386718747,14.371896215820312,2.331397638671875,10.403416215820313,4.727219638671875,8.007996215820313ZM12.172299638671875,5.662106215820312L10.323809638671875,3.8136162158203124L5.4287196386718755,8.709096215820313C3.422893638671875,10.714536215820312,3.4549956386718748,14.055196215820313,5.484999638671875,16.08479621582031C7.514609638671875,18.114796215820313,10.855289638671875,18.146496215820314,12.860719638671876,16.141096215820312L15.465629638671874,13.535796215820312L14.090929638671875,12.160756215820312L14.791629638671875,11.460436215820312L16.166229638671876,12.834996215820313L17.755829638671877,11.245226215820313L15.907729638671874,9.396736215820312L11.011839638671875,14.292596215820312C10.042809638671875,15.262396215820312,8.418249638671874,15.243796215820312,7.406019638671875,14.306496215820312L7.333099638671875,14.236296215820312C6.327599638671876,13.230796215820313,6.284009638671876,11.550396215820312,7.276419638671875,10.557586215820312L9.882199638671874,7.952026215820313L8.501079638671875,6.570906215820313L9.201789638671876,5.870186215820313L10.582939638671874,7.251336215820312L12.172299638671875,5.662106215820312Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), bg = (e) => (() => {
  const t = vg.cloneNode(!0);
  return Ne(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), $g = /* @__PURE__ */ $('<svg viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_615"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_615)"><path d="M19.672,3.0673368C19.4417,2.9354008,19.1463,3.00292252,18.9994,3.2210900000000002L17.4588,5.50622L16.743299999999998,3.781253L13.9915,7.4662L13.9618,7.51108C13.8339,7.72862,13.8936,8.005659999999999,14.1004,8.15391L14.1462,8.183430000000001C14.3683,8.308720000000001,14.6511,8.25001,14.8022,8.047229999999999L16.4907,5.78571L17.246299999999998,7.60713L19.8374,3.7635389999999997L19.8651,3.717088C19.9871,3.484615,19.9023,3.199273,19.672,3.0673368ZM4.79974,8.462530000000001L10.117740000000001,3.252975C10.31381,3.0610145,10.63152,3.0610145,10.82759,3.252975L13.4115,5.78453C13.6076,5.976710000000001,13.6076,6.28833,13.4115,6.4805L8.093869999999999,11.69045C7.48847,12.28368,7.51659,13.3308,8.151309999999999,13.9528C8.786439999999999,14.5755,9.85421,14.6027,10.45961,14.0087L15.7768,8.79831C15.9729,8.60609,16.2909,8.60609,16.487099999999998,8.79831L19.0705,11.33026C19.2667,11.52244,19.2667,11.83406,19.0705,12.02623L13.7533,17.2366C11.32572,19.6158,7.30328,19.578,4.85679,17.1807C2.410298,14.7834,2.371331,10.84174,4.79974,8.462530000000001ZM12.3461,6.1325199999999995L10.47246,4.29654L5.51079,9.15889C3.477674,11.15076,3.510214,14.4688,5.56784,16.4847C7.62506,18.500999999999998,11.01117,18.5325,13.0439,16.540599999999998L15.6842,13.9529L14.2908,12.58718L15.0011,11.89161L16.394399999999997,13.2569L18.0056,11.67786L16.1323,9.84188L11.16985,14.7046C10.18764,15.6679,8.540980000000001,15.6494,7.51498,14.7184L7.44107,14.6487C6.4219,13.65,6.37771,11.98096,7.38362,10.994869999999999L10.02485,8.40693L8.624939999999999,7.03516L9.335180000000001,6.33919L10.73512,7.71099L12.3461,6.1325199999999995Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), _g = (e) => (() => {
  const t = $g.cloneNode(!0);
  return Ne(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), kg = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,17C5.80945,17,3.667717,12.85,3.113386,11.575C2.9622047,11.2,2.9622047,10.8,3.113386,10.425C3.667717,9.15,5.80945,5,11,5C16.165399999999998,5,18.3323,9.15,18.8866,10.425C19.0378,10.8,19.0378,11.2,18.8866,11.575C18.3323,12.85,16.165399999999998,17,11,17ZM4.04567,10.8C3.995276,10.925,3.995276,11.05,4.04567,11.175C4.52441,12.325,6.43937,16,11,16C15.5606,16,17.4756,12.325,17.9543,11.2C18.0047,11.075,18.0047,10.95,17.9543,10.825C17.4756,9.675,15.5606,6,11,6C6.43937,6,4.52441,9.675,4.04567,10.8ZM11,13.5C9.61417,13.5,8.480319999999999,12.375,8.480319999999999,11C8.480319999999999,9.625,9.61417,8.5,11,8.5C12.38583,8.5,13.5197,9.625,13.5197,11C13.5197,12.375,12.38583,13.5,11,13.5ZM11,9.5C10.1685,9.5,9.48819,10.175,9.48819,11C9.48819,11.825,10.1685,12.5,11,12.5C11.8315,12.5,12.51181,11.825,12.51181,11C12.51181,10.175,11.8315,9.5,11,9.5Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), xg = () => kg.cloneNode(!0), Lg = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.80417,14.9887L4.62563,16.167299999999997C4.43037,16.3625,4.43037,16.6791,4.62563,16.8744C4.82089,17.0696,5.13748,17.0696,5.332739999999999,16.8744L6.62638,15.5807C7.75595,16.290100000000002,9.19328,16.7929,11,16.7929C16.165399999999998,16.7929,18.3323,12.64289,18.8866,11.36789C19.0378,10.99289,19.0378,10.59289,18.8866,10.21789C18.5549,9.45486,17.6456,7.66212,15.8617,6.34545L17.3536,4.853553C17.5488,4.658291,17.5488,4.341709,17.3536,4.146447C17.1583,3.9511845,16.8417,3.9511845,16.6464,4.146447L15.0014,5.7915399999999995C13.9314,5.1969,12.61166,4.792893,11,4.792893C5.80945,4.792893,3.667717,8.94289,3.113386,10.21789C2.9622049,10.59289,2.9622049,10.99289,3.113386,11.36789C3.424435,12.08333,4.2353000000000005,13.70399,5.80417,14.9887ZM7.36012,14.847C8.32327,15.4074,9.52286,15.7929,11,15.7929C15.5606,15.7929,17.4756,12.11789,17.9543,10.99289C18.0047,10.86789,18.0047,10.74289,17.9543,10.61789C17.659,9.90846,16.8171,8.23812,15.1447,7.06241L12.96929,9.23782C13.3134,9.66543,13.5197,10.20642,13.5197,10.79289C13.5197,12.16789,12.38583,13.29289,11,13.29289C10.41596,13.29289,9.87667,13.09308,9.44815,12.75896L7.36012,14.847ZM8.794609999999999,11.99829L6.520099999999999,14.2728C5.06905,13.12119,4.32057,11.628250000000001,4.04567,10.96789C3.995275,10.84289,3.995275,10.71789,4.04567,10.59289C4.52441,9.46789,6.43937,5.79289,11,5.79289C12.28868,5.79289,13.3661,6.086320000000001,14.2596,6.53329L12.19759,8.5953C11.84086,8.40257,11.43271,8.29289,11,8.29289C9.61417,8.29289,8.480319999999999,9.41789,8.480319999999999,10.79289C8.480319999999999,11.22918,8.594470000000001,11.64029,8.794609999999999,11.99829ZM10.16528,12.04183C10.404869999999999,12.20032,10.692070000000001,12.29289,11,12.29289C11.8315,12.29289,12.51181,11.61789,12.51181,10.79289C12.51181,10.48318,12.41593,10.194600000000001,12.25216,9.95494L10.16528,12.04183ZM11.43602,9.35687L9.55616,11.236740000000001C9.512,11.09633,9.48819,10.94724,9.48819,10.79289C9.48819,9.96789,10.1685,9.29289,11,9.29289C11.15142,9.29289,11.29782,9.31528,11.43602,9.35687Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), wg = () => Lg.cloneNode(!0), Ag = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_625"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_625)"><path d="M14.5385,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807692,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.88462,4,14.5385,5.61538,14.5385,7.576919999999999L14.5385,9.76923ZM10.88461,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923L13.38462,9.76923L13.38462,7.576919999999999C13.38462,6.23077,12.26923,5.15385,10.88461,5.15385ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.038450000000001,12.07692,11.307680000000001,12.34615,11.307680000000001,12.65385L11.307680000000001,14.5769C11.307680000000001,14.8846,11.038450000000001,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), Tg = () => Ag.cloneNode(!0), Sg = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_620"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_620)"><path d="M8.38461,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807693,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.46154,4,13.84615,4.961539,14.3462,6.423080000000001C14.4615,6.73077,14.3077,7.038460000000001,14,7.15385C13.69231,7.26923,13.38461,7.11538,13.26923,6.80769C12.92308,5.80769,11.96154,5.15385,10.88462,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.03846,12.07692,11.307690000000001,12.34615,11.307690000000001,12.65385L11.307690000000001,14.5769C11.307690000000001,14.8846,11.03846,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), Mg = () => Sg.cloneNode(!0), Pg = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M16.966900000000003,8.67144C16.6669,8.67144,16.4247,8.91558,16.4247,9.21802L16.4247,16.631500000000003C16.4247,17.322,16.007199999999997,17.9068,15.5139,17.9068L13.93072,17.9068L13.93072,9.2162C13.93072,8.91741,13.68675,8.67144,13.38855,8.67144C13.09036,8.67144,12.84639,8.91741,12.84639,9.21802L12.84639,17.9068L10.151810000000001,17.9068L10.151810000000001,9.21802C10.151810000000001,8.91741,9.90783,8.67144,9.609639999999999,8.67144C9.31145,8.67144,9.06747,8.91741,9.06747,9.219850000000001L9.06747,17.9068L7.48614,17.9068C6.99277,17.9068,6.5753,17.322,6.5753,16.631500000000003L6.5753,9.21802C6.5753,8.91558,6.333130000000001,8.67144,6.03313,8.67144C5.73313,8.67144,5.49096,8.91558,5.49096,9.21802L5.49096,16.631500000000003C5.49096,17.9378,6.385540000000001,19,7.48614,19L15.512,19C16.6127,19,17.509,17.9378,17.509,16.631500000000003L17.509,9.21802C17.509,8.91558,17.2669,8.67144,16.966900000000003,8.67144ZM18.4578,6.21183L4.542169,6.21183C4.243976,6.21183,4,6.45779,4,6.75841C4,7.05903,4.243976,7.30499,4.542169,7.30499L18.4578,7.30499C18.756,7.30499,19,7.05903,19,6.75841C19,6.45779,18.756,6.21183,18.4578,6.21183ZM8.68072,5.10045L14.3193,5.10045C14.6175,5.10045,14.8614,4.852666,14.8614,4.550225C14.8614,4.247783,14.6175,4,14.3193,4L8.68072,4C8.38253,4,8.13855,4.247783,8.13855,4.550225C8.13855,4.852666,8.38253,5.10045,8.68072,5.10045Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), Dg = () => Pg.cloneNode(!0), Ng = {
  horizontalStraightLine: mm,
  horizontalRayLine: ym,
  horizontalSegment: Cm,
  verticalStraightLine: bm,
  verticalRayLine: _m,
  verticalSegment: xm,
  straightLine: wm,
  rayLine: Tm,
  segment: Mm,
  arrow: Dm,
  priceLine: Om,
  priceChannelLine: Em,
  parallelStraightLine: Fm,
  fibonacciLine: Um,
  fibonacciSegment: Vm,
  fibonacciCircle: jm,
  fibonacciSpiral: Zm,
  fibonacciSpeedResistanceFan: Wm,
  fibonacciExtension: qm,
  gannBox: Xm,
  circle: eg,
  triangle: ng,
  rect: og,
  parallelogram: ag,
  threeWaves: lg,
  fiveWaves: ug,
  eightWaves: hg,
  anyWaves: mg,
  abcd: yg,
  xabcd: Cg,
  weak_magnet: bg,
  strong_magnet: _g,
  lock: Tg,
  unlock: Mg,
  visible: xg,
  invisible: wg,
  remove: Dg
};
function Og(e) {
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
function Ig(e) {
  return [
    { key: "priceChannelLine", text: d("price_channel_line", e) },
    { key: "parallelStraightLine", text: d("parallel_straight_line", e) }
  ];
}
function Eg(e) {
  return [
    { key: "circle", text: d("circle", e) },
    { key: "rect", text: d("rect", e) },
    { key: "parallelogram", text: d("parallelogram", e) },
    { key: "triangle", text: d("triangle", e) }
  ];
}
function Bg(e) {
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
function Fg(e) {
  return [
    { key: "xabcd", text: d("xabcd", e) },
    { key: "abcd", text: d("abcd", e) },
    { key: "threeWaves", text: d("three_waves", e) },
    { key: "fiveWaves", text: d("five_waves", e) },
    { key: "eightWaves", text: d("eight_waves", e) },
    { key: "anyWaves", text: d("any_waves", e) }
  ];
}
function zg(e) {
  return [
    { key: "weak_magnet", text: d("weak_magnet", e) },
    { key: "strong_magnet", text: d("strong_magnet", e) }
  ];
}
const nt = (e) => Ng[e.name](e.class), Ug = /* @__PURE__ */ $('<div class="klinecharts-pro-drawing-bar"><span class="split-line"></span><div class="item magnet-mode" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div><div class="item"><span style="width:32px;height:32px"></span></div><div class="item"><span style="width:32px;height:32px"></span></div><span class="split-line"></span><div class="item"><span style="width:32px;height:32px"></span></div></div>'), Rg = /* @__PURE__ */ $('<div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div>'), Qi = /* @__PURE__ */ $('<li><span style="padding-left:8px"></span></li>'), Vg = "drawing_tools", Kg = (e) => {
  const [t, r] = D("horizontalStraightLine"), [n, l] = D("priceChannelLine"), [u, f] = D("circle"), [m, p] = D("fibonacciLine"), [L, x] = D("xabcd"), [w, K] = D("weak_magnet"), [W, ye] = D("normal"), [R, T] = D(!1), [E, ne] = D(!0), [F, U] = D(""), j = (Z) => {
    U((X) => X === Z ? "" : Z);
  }, ce = ee(() => [{
    key: "singleLine",
    icon: t(),
    list: Og(e.locale),
    setter: r
  }, {
    key: "moreLine",
    icon: n(),
    list: Ig(e.locale),
    setter: l
  }, {
    key: "polygon",
    icon: u(),
    list: Eg(e.locale),
    setter: f
  }, {
    key: "fibonacci",
    icon: m(),
    list: Bg(e.locale),
    setter: p
  }, {
    key: "wave",
    icon: L(),
    list: Fg(e.locale),
    setter: x
  }]), G = ee(() => zg(e.locale));
  return (() => {
    const Z = Ug.cloneNode(!0), X = Z.firstChild, ae = X.nextSibling, he = ae.firstChild, $e = he.nextSibling, we = $e.firstChild, de = ae.nextSibling, De = de.firstChild, _e = de.nextSibling, O = _e.firstChild, N = _e.nextSibling, V = N.nextSibling, Y = V.firstChild;
    return C(Z, () => ce().map((M) => (() => {
      const S = Rg.cloneNode(!0), q = S.firstChild, H = q.nextSibling, Q = H.firstChild;
      return S.addEventListener("blur", () => {
        U("");
      }), S.$$click = () => {
        j(M.key);
      }, C(q, A(nt, {
        get name() {
          return M.icon;
        }
      })), C(S, (() => {
        const ie = ee(() => M.key === F());
        return () => ie() && A(Sn, {
          class: "list",
          get children() {
            return M.list.map((_) => (() => {
              const oe = Qi.cloneNode(!0), be = oe.firstChild;
              return oe.$$click = (pe) => {
                pe.stopPropagation(), M.setter(_.key), e.onDrawingItemClick({
                  name: _.key,
                  lock: R(),
                  mode: W()
                }), U("");
              }, C(oe, A(nt, {
                get name() {
                  return _.key;
                }
              }), be), C(be, () => _.text), oe;
            })());
          }
        });
      })(), null), z(() => Ne(Q, "class", M.key === F() ? "rotate" : "")), S;
    })()), X), ae.addEventListener("blur", () => {
      U("");
    }), ae.$$click = () => {
      j("mode");
    }, C(he, (() => {
      const M = ee(() => w() === "weak_magnet");
      return () => M() ? (() => {
        const S = ee(() => W() === "weak_magnet");
        return () => S() ? A(nt, {
          name: "weak_magnet",
          class: "selected"
        }) : A(nt, {
          name: "weak_magnet"
        });
      })() : (() => {
        const S = ee(() => W() === "strong_magnet");
        return () => S() ? A(nt, {
          name: "strong_magnet",
          class: "selected"
        }) : A(nt, {
          name: "strong_magnet"
        });
      })();
    })()), C(ae, (() => {
      const M = ee(() => F() === "mode");
      return () => M() && A(Sn, {
        class: "list",
        get children() {
          return G().map((S) => (() => {
            const q = Qi.cloneNode(!0), H = q.firstChild;
            return q.$$click = (Q) => {
              Q.stopPropagation();
              const ie = W() === S.key ? "normal" : S.key;
              K(S.key), ye(ie), e.onModeChange(ie), U("");
            }, C(q, A(nt, {
              get name() {
                return S.key;
              },
              get class() {
                return W() === S.key ? "selected" : "";
              }
            }), H), C(H, () => S.text), z(() => le(q, W() === S.key ? "selected" : "")), q;
          })());
        }
      });
    })(), null), De.$$click = () => {
      const M = !R();
      T(M), e.onLockChange(M);
    }, C(De, (() => {
      const M = ee(() => !!R());
      return () => M() ? A(nt, {
        name: "lock"
      }) : A(nt, {
        name: "unlock"
      });
    })()), O.$$click = () => {
      const M = !E();
      ne(M), e.onVisibleChange(M);
    }, C(O, (() => {
      const M = ee(() => !!E());
      return () => M() ? A(nt, {
        name: "visible"
      }) : A(nt, {
        name: "invisible"
      });
    })()), Y.$$click = () => {
      e.onRemoveClick(Vg);
    }, C(Y, A(nt, {
      name: "remove"
    })), z(() => Ne(we, "class", F() === "mode" ? "rotate" : "")), Z;
  })();
};
Ye(["click"]);
const Zi = /* @__PURE__ */ $('<li class="title"></li>'), Hi = /* @__PURE__ */ $('<li class="row"></li>'), jg = (e) => A(Dt, {
  get title() {
    return d("indicator", e.locale);
  },
  width: 400,
  get onClose() {
    return e.onClose;
  },
  get children() {
    return A(Sn, {
      class: "klinecharts-pro-indicator-modal-list",
      get children() {
        return [(() => {
          const t = Zi.cloneNode(!0);
          return C(t, () => d("main_indicator", e.locale)), t;
        })(), ee(() => ["MA", "EMA", "SMA", "BOLL", "SAR", "BBI"].map((t) => {
          const r = e.mainIndicators.includes(t);
          return (() => {
            const n = Hi.cloneNode(!0);
            return n.$$click = (l) => {
              e.onMainIndicatorChange({
                name: t,
                paneId: "candle_pane",
                added: !r
              });
            }, C(n, A(Ui, {
              checked: r,
              get label() {
                return d(t.toLowerCase(), e.locale);
              }
            })), n;
          })();
        })), (() => {
          const t = Zi.cloneNode(!0);
          return C(t, () => d("sub_indicator", e.locale)), t;
        })(), ee(() => ["MA", "EMA", "VOL", "MACD", "BOLL", "KDJ", "RSI", "BIAS", "BRAR", "CCI", "DMI", "CR", "PSY", "DMA", "TRIX", "OBV", "VR", "WR", "MTM", "EMV", "SAR", "SMA", "ROC", "PVT", "BBI", "AO"].map((t) => {
          const r = t in e.subIndicators;
          return (() => {
            const n = Hi.cloneNode(!0);
            return n.$$click = (l) => {
              e.onSubIndicatorChange({
                name: t,
                paneId: e.subIndicators[t] ?? "",
                added: !r
              });
            }, C(n, A(Ui, {
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
function Lr(e, t) {
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
function R0(e) {
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
const Qg = (e) => {
  const [t, r] = D(e.timezone), n = ee(() => R0(e.locale));
  return A(Dt, {
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
      return A(vn, {
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
function Wi(e) {
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
const Zg = /* @__PURE__ */ $('<div><button type="button"></button></div>'), Hg = /* @__PURE__ */ $('<div><div class="chart-style-color-grid"></div></div>'), Wg = /* @__PURE__ */ $('<button type="button" class="chart-style-palette-color"></button>'), Yg = /* @__PURE__ */ $('<div class="chart-style-line-control"><div class="chart-style-width-picker"><button type="button" class="chart-style-size-button"><span></span></button></div></div>'), qg = /* @__PURE__ */ $('<div class="chart-style-width-popover"></div>'), Gg = /* @__PURE__ */ $('<button type="button"><span></span></button>'), Xg = /* @__PURE__ */ $('<div class="klinecharts-pro-setting-modal-title-tabs"><button type="button"></button><button type="button">Chart Style</button></div>'), Jg = /* @__PURE__ */ $('<div class="klinecharts-pro-setting-modal-content"></div>'), Yi = /* @__PURE__ */ $('<div class="setting-item"><span class="setting-label"></span><div class="setting-control"></div></div>'), ey = /* @__PURE__ */ $('<div class="klinecharts-pro-chart-style-content"><div class="chart-style-sidebar"><button type="button">Symbol</button><button type="button">Background</button></div><div class="chart-style-panel"><p class="chart-style-note">* Chart Style takes precedence over default chart settings. Click Reset to align with the default theme.</p></div></div>'), ty = /* @__PURE__ */ $("<h3>Symbol</h3>"), ny = /* @__PURE__ */ $('<div class="chart-style-row"><span>Candle Stick</span><div class="chart-style-color-pair"></div></div>'), ry = /* @__PURE__ */ $('<div class="chart-style-row"><span>Borders</span><div class="chart-style-color-pair"></div></div>'), oy = /* @__PURE__ */ $('<div class="chart-style-row"><span>Wick</span><div class="chart-style-color-pair"></div></div>'), iy = /* @__PURE__ */ $("<h3>Background</h3>"), ay = /* @__PURE__ */ $('<div class="chart-style-row"><span>Color</span></div>'), sy = /* @__PURE__ */ $('<div class="chart-style-row"><label class="chart-style-check-row"><input type="checkbox"><span class="chart-style-check-box" aria-hidden="true"></span><span>Vert Grid Lines</span></label></div>'), ly = /* @__PURE__ */ $('<div class="chart-style-row"><label class="chart-style-check-row"><input type="checkbox"><span class="chart-style-check-box" aria-hidden="true"></span><span>Horz Grid Lines</span></label></div>'), F1 = "chart.backgroundColor", Mn = "#171a27", cy = ["#f6465d", "#f59e0b", "#fcd535", "#2ebd85", "#4098a8", "#22c1dc", "#3861fb", "#7b3fe4", "#ec8aa4", "#f7c56b", "#fff0a3", "#9ed4a4", "#83c7bb", "#8bdce6", "#8bb9f7", "#b7a1dc", "#c9343e", "#e76f20", "#f0b93a", "#3f8d3a", "#236e5a", "#237c88", "#1d3fbf", "#3a209f", "#ffffff", "#cbd5e1", "#9ca3af", "#6b7280", "#374151", "#111827", "#000000"], uy = [{
  key: Ve.Solid,
  text: "Solid"
}, {
  key: Ve.Dashed,
  text: "Dashed"
}], dy = [1, 2, 3, 4], qi = [{
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
  key: F1,
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
}], V0 = (e, t = Mn) => {
  const r = B.clone(e), n = B.formatValue(r, "candle.bar.upColor"), l = B.formatValue(r, "candle.bar.downColor"), u = B.formatValue(r, "candle.bar.noChangeColor");
  return Fe(r, "candle.bar.upBorderColor", B.formatValue(r, "candle.bar.upBorderColor", n)), Fe(r, "candle.bar.downBorderColor", B.formatValue(r, "candle.bar.downBorderColor", l)), Fe(r, "candle.bar.noChangeBorderColor", B.formatValue(r, "candle.bar.noChangeBorderColor", u)), Fe(r, "candle.bar.upWickColor", B.formatValue(r, "candle.bar.upWickColor", n)), Fe(r, "candle.bar.downWickColor", B.formatValue(r, "candle.bar.downWickColor", l)), Fe(r, "candle.bar.noChangeWickColor", B.formatValue(r, "candle.bar.noChangeWickColor", u)), Fe(r, "candle.bar.borderUpColor", B.formatValue(r, "candle.bar.borderUpColor", B.formatValue(r, "candle.bar.upBorderColor"))), Fe(r, "candle.bar.borderDownColor", B.formatValue(r, "candle.bar.borderDownColor", B.formatValue(r, "candle.bar.downBorderColor"))), Fe(r, "candle.bar.borderNoChangeColor", B.formatValue(r, "candle.bar.borderNoChangeColor", B.formatValue(r, "candle.bar.noChangeBorderColor"))), Fe(r, "candle.bar.wickUpColor", B.formatValue(r, "candle.bar.wickUpColor", B.formatValue(r, "candle.bar.upWickColor"))), Fe(r, "candle.bar.wickDownColor", B.formatValue(r, "candle.bar.wickDownColor", B.formatValue(r, "candle.bar.downWickColor"))), Fe(r, "candle.bar.wickNoChangeColor", B.formatValue(r, "candle.bar.wickNoChangeColor", B.formatValue(r, "candle.bar.noChangeWickColor"))), Fe(r, F1, t), r;
}, hy = (e, t, r) => {
  if (t === F1)
    return r ?? Mn;
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
  return l ? B.formatValue(e, l) : B.formatValue(e, t, B.formatValue(V0(e), t));
}, fy = (e) => {
  const [t, r] = D(e.currentStyles), [n, l] = D(V0(e.currentStyles, e.currentBackgroundColor ?? Mn)), [u, f] = D(Wi(e.locale)), [m, p] = D(e.timezone), [L, x] = D(!1), [w, K] = D("settings"), [W, ye] = D("symbol"), [R, T] = D(null), [E, ne] = D({}), [F, U] = D(null), j = () => Intl.DateTimeFormat().resolvedOptions().timeZone, ce = () => {
    x(window.innerWidth <= 768);
  };
  Sr(() => {
    const O = (N) => {
      const V = N.target;
      V instanceof Element && (V.closest(".chart-style-color-picker") || V.closest(".chart-style-width-picker") || V.closest(".klinecharts-pro-select") || (T(null), U(null)));
    };
    ce(), window.addEventListener("resize", ce), document.addEventListener("mousedown", O), kt(() => {
      document.removeEventListener("mousedown", O);
    });
  }), kt(() => {
    window.removeEventListener("resize", ce);
  }), Ke(() => {
    f(Wi(e.locale));
  }), Ke(() => {
    p(e.timezone);
  });
  const G = () => R0(e.locale), Z = (O, N) => {
    const V = {};
    Fe(V, O.key, N);
    const Y = B.clone(t());
    Fe(Y, O.key, N), r(Y), f(u().map((M) => ({
      ...M
    }))), e.onChange(V);
  }, X = (O, N) => B.formatValue(n(), O, N), ae = (O, N) => {
    const V = B.clone(n());
    Fe(V, O, N), l(V), e.onChange(he(V));
  }, he = (O) => {
    const N = B.formatValue(O, "candle.bar.upColor"), V = B.formatValue(O, "candle.bar.downColor"), Y = B.formatValue(O, "candle.bar.noChangeColor"), M = B.formatValue(O, "candle.bar.upBorderColor", N), S = B.formatValue(O, "candle.bar.downBorderColor", V), q = B.formatValue(O, "candle.bar.noChangeBorderColor", Y), H = B.formatValue(O, "candle.bar.upWickColor", N), Q = B.formatValue(O, "candle.bar.downWickColor", V), ie = B.formatValue(O, "candle.bar.noChangeWickColor", Y);
    return {
      chart: {
        backgroundColor: B.formatValue(O, F1, Mn)
      },
      candle: {
        type: B.formatValue(O, "candle.type"),
        bar: {
          upColor: N,
          downColor: V,
          noChangeColor: Y,
          upBorderColor: M,
          downBorderColor: S,
          noChangeBorderColor: q,
          upWickColor: H,
          downWickColor: Q,
          noChangeWickColor: ie,
          borderUpColor: M,
          borderDownColor: S,
          borderNoChangeColor: q,
          wickUpColor: H,
          wickDownColor: Q,
          wickNoChangeColor: ie
        }
      },
      grid: {
        horizontal: {
          show: !!B.formatValue(O, "grid.horizontal.show"),
          color: B.formatValue(O, "grid.horizontal.color"),
          style: B.formatValue(O, "grid.horizontal.style"),
          size: Number(B.formatValue(O, "grid.horizontal.size", 1)),
          dashedValue: B.formatValue(O, "grid.horizontal.dashedValue", [2, 2])
        },
        vertical: {
          show: !!B.formatValue(O, "grid.vertical.show"),
          color: B.formatValue(O, "grid.vertical.color"),
          style: B.formatValue(O, "grid.vertical.style"),
          size: Number(B.formatValue(O, "grid.vertical.size", 1)),
          dashedValue: B.formatValue(O, "grid.vertical.dashedValue", [2, 2])
        }
      }
    };
  }, $e = () => {
    var N;
    const O = he(n());
    r(B.clone(n())), e.onChange(O), (N = e.onSaveChartStyle) == null || N.call(e, O), e.onClose();
  }, we = () => {
    var N;
    (N = e.onResetChartStyle) == null || N.call(e);
    const O = e.defaultStyles;
    if (O) {
      const V = B.clone(n());
      qi.forEach((Y) => {
        Fe(V, Y.key, hy(O, Y.key, e.defaultBackgroundColor));
      }), l(V), r(B.clone(V)), e.onChange(he(V));
    } else
      e.onRestoreDefault(qi), l(B.clone(e.currentStyles));
  }, de = (O, N = O) => {
    const V = X(O, "#ffffff");
    return (() => {
      const Y = Zg.cloneNode(!0), M = Y.firstChild;
      return le(Y, `chart-style-color-picker chart-style-color-picker-${N}`), M.$$click = (S) => {
        const q = R() === N ? null : N;
        if (q && L()) {
          const H = S.currentTarget.closest(".klinecharts-pro-modal .inner"), Q = H == null ? void 0 : H.getBoundingClientRect();
          if (Q) {
            const _ = S.currentTarget.getBoundingClientRect().bottom + 10;
            ne({
              position: "fixed",
              left: `${Q.left + 16}px`,
              right: `${window.innerWidth - Q.right + 16}px`,
              top: `${_}px`,
              width: "auto",
              "max-width": `${Q.width - 16 * 2}px`,
              "max-height": `${Math.max(150, window.innerHeight - _ - 96)}px`,
              "overflow-y": "auto"
            });
          }
        } else
          ne({});
        T(q);
      }, le(M, `chart-style-color-swatch chart-style-color-swatch-${N}`), M.style.setProperty("background", V), C(Y, (() => {
        const S = ee(() => R() === N);
        return () => S() && (() => {
          const q = Hg.cloneNode(!0), H = q.firstChild;
          return le(q, `chart-style-color-popover chart-style-color-popover-${N}`), C(H, A(r1, {
            each: cy,
            children: (Q) => (() => {
              const ie = Wg.cloneNode(!0);
              return ie.$$click = () => {
                ae(O, Q), T(null);
              }, ie.style.setProperty("background", Q), z(() => ie.classList.toggle("selected", Q.toLowerCase() === V.toLowerCase())), ie;
            })()
          })), z((Q) => gt(q, E(), Q)), q;
        })();
      })(), null), Y;
    })();
  }, De = (O) => {
    const N = `${O}.style`, V = `${O}.color`, Y = `${O}.size`, M = X(N, Ve.Dashed), S = Math.max(1, Number(X(Y, 1)));
    return (() => {
      const q = Yg.cloneNode(!0), H = q.firstChild, Q = H.firstChild, ie = Q.firstChild;
      return C(q, A(vn, {
        get style() {
          return {
            width: L() ? "100%" : "134px"
          };
        },
        get value() {
          return M === Ve.Solid ? "Solid" : "Dashed";
        },
        dataSource: uy,
        onSelected: (_) => {
          const oe = _.key;
          ae(N, oe), ae(`${O}.dashedValue`, oe === Ve.Solid ? [] : [2, 2]);
        }
      }), H), Q.$$click = () => {
        U(F() === Y ? null : Y);
      }, ie.style.setProperty("height", `${S}px`), C(H, (() => {
        const _ = ee(() => F() === Y);
        return () => _() && (() => {
          const oe = qg.cloneNode(!0);
          return C(oe, A(r1, {
            each: dy,
            children: (be) => (() => {
              const pe = Gg.cloneNode(!0), Ce = pe.firstChild;
              return pe.$$click = () => {
                ae(Y, be), U(null);
              }, pe.classList.toggle("selected", S === be), Ce.style.setProperty("height", `${be}px`), pe;
            })()
          })), oe;
        })();
      })(), null), C(q, () => de(V), null), q;
    })();
  }, _e = (() => {
    const O = Xg.cloneNode(!0), N = O.firstChild, V = N.nextSibling;
    return N.$$click = () => K("settings"), C(N, () => d("setting", e.locale)), V.$$click = () => K("chartStyle"), z((Y) => {
      const M = w() === "settings", S = w() === "chartStyle";
      return M !== Y._v$ && N.classList.toggle("active", Y._v$ = M), S !== Y._v$2 && V.classList.toggle("active", Y._v$2 = S), Y;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), O;
  })();
  return A(Dt, {
    title: _e,
    class: "klinecharts-pro-setting-modal",
    innerClass: "klinecharts-pro-setting-modal-inner",
    contentClass: "klinecharts-pro-setting-modal-body",
    get buttonContainerClass() {
      return `klinecharts-pro-setting-modal-footer ${w() === "chartStyle" ? "chart-style-footer" : "settings-footer"}`;
    },
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
      return ee(() => !!L())() ? void 0 : w() === "chartStyle" ? 170 : 200;
    },
    get isMobile() {
      return L();
    },
    get buttons() {
      return ee(() => w() === "settings")() ? [{
        children: d("restore_default", e.locale),
        onClick: () => {
          var V;
          e.onRestoreDefault(u());
          const O = j(), N = {
            key: O,
            text: Lr(O, e.locale)
          };
          p(N), (V = e.onTimezoneChange) == null || V.call(e, N), e.onClose();
        }
      }] : [{
        type: "cancel",
        class: "chart-style-action-button",
        children: "Reset",
        onClick: we
      }, {
        class: "chart-style-action-button",
        children: "Save",
        onClick: $e
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      return ee(() => w() === "settings")() ? (() => {
        const O = Jg.cloneNode(!0);
        return C(O, A(r1, {
          get each() {
            return u();
          },
          children: (N) => {
            let V;
            const Y = B.formatValue(t(), N.key);
            switch (N.component) {
              case "select": {
                const M = N.key === "candle.type" ? "170px" : "120px", S = `klinecharts-pro-setting-select klinecharts-pro-setting-select-${N.key.replace(/[^a-zA-Z0-9_-]/g, "-")}`, q = `klinecharts-pro-setting-dropdown klinecharts-pro-setting-dropdown-${N.key.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
                V = A(vn, {
                  class: S,
                  dropdownClass: q,
                  get style() {
                    return {
                      width: L() ? "100%" : M,
                      "min-width": L() ? "auto" : M
                    };
                  },
                  get value() {
                    return d(Y, e.locale);
                  },
                  get dataSource() {
                    return N.dataSource;
                  },
                  onSelected: (H) => {
                    const Q = H.key;
                    Z(N, Q);
                  }
                });
                break;
              }
              case "switch": {
                const M = !!Y;
                V = A(kr, {
                  open: M,
                  onChange: () => {
                    Z(N, !M);
                  }
                });
                break;
              }
            }
            return (() => {
              const M = Yi.cloneNode(!0), S = M.firstChild, q = S.nextSibling;
              return C(S, () => N.text), C(q, V), z(() => M.classList.toggle("mobile-item", !!L())), M;
            })();
          }
        }), null), C(O, (() => {
          const N = ee(() => !!e.timezone);
          return () => N() && (() => {
            const V = Yi.cloneNode(!0), Y = V.firstChild, M = Y.nextSibling;
            return C(Y, () => d("timezone", e.locale)), C(M, A(vn, {
              class: "klinecharts-pro-timezone-select",
              get style() {
                return {
                  width: L() ? "100%" : "170px",
                  "min-width": L() ? "auto" : "170px"
                };
              },
              dropdownClass: "klinecharts-pro-timezone-dropdown",
              get value() {
                var S;
                return ((S = m()) == null ? void 0 : S.text) ?? e.timezone.text;
              },
              get dataSource() {
                return G();
              },
              searchable: !0,
              get searchPlaceholder() {
                return d("Search Timezone", e.locale) || "Search timezone...";
              },
              onSelected: (S) => {
                var H;
                const q = S;
                p(q), (H = e.onTimezoneChange) == null || H.call(e, q);
              }
            })), z(() => V.classList.toggle("mobile-item", !!L())), V;
          })();
        })(), null), z(() => O.classList.toggle("mobile-layout", !!L())), O;
      })() : (() => {
        const O = ey.cloneNode(!0), N = O.firstChild, V = N.firstChild, Y = V.nextSibling, M = N.nextSibling, S = M.firstChild;
        return V.$$click = () => ye("symbol"), Y.$$click = () => ye("background"), C(M, (() => {
          const q = ee(() => W() === "symbol");
          return () => q() ? [ty.cloneNode(!0), (() => {
            const H = ny.cloneNode(!0), Q = H.firstChild, ie = Q.nextSibling;
            return C(ie, () => de("candle.bar.upColor", "candle-stick-up"), null), C(ie, () => de("candle.bar.downColor", "candle-stick-down"), null), H;
          })(), (() => {
            const H = ry.cloneNode(!0), Q = H.firstChild, ie = Q.nextSibling;
            return C(ie, () => de("candle.bar.upBorderColor", "border-up"), null), C(ie, () => de("candle.bar.downBorderColor", "border-down"), null), H;
          })(), (() => {
            const H = oy.cloneNode(!0), Q = H.firstChild, ie = Q.nextSibling;
            return C(ie, () => de("candle.bar.upWickColor", "wick-up"), null), C(ie, () => de("candle.bar.downWickColor", "wick-down"), null), H;
          })()] : [iy.cloneNode(!0), (() => {
            const H = ay.cloneNode(!0);
            return H.firstChild, C(H, () => de(F1, "chart-background"), null), H;
          })(), (() => {
            const H = sy.cloneNode(!0), Q = H.firstChild, ie = Q.firstChild;
            return ie.addEventListener("change", (_) => ae("grid.vertical.show", _.currentTarget.checked)), C(H, () => De("grid.vertical"), null), z(() => ie.checked = !!X("grid.vertical.show")), H;
          })(), (() => {
            const H = ly.cloneNode(!0), Q = H.firstChild, ie = Q.firstChild;
            return ie.addEventListener("change", (_) => ae("grid.horizontal.show", _.currentTarget.checked)), C(H, () => De("grid.horizontal"), null), z(() => ie.checked = !!X("grid.horizontal.show")), H;
          })()];
        })(), S), z((q) => {
          const H = !!L(), Q = W() === "symbol", ie = W() === "background";
          return H !== q._v$3 && O.classList.toggle("mobile-layout", q._v$3 = H), Q !== q._v$4 && V.classList.toggle("active", q._v$4 = Q), ie !== q._v$5 && Y.classList.toggle("active", q._v$5 = ie), q;
        }, {
          _v$3: void 0,
          _v$4: void 0,
          _v$5: void 0
        }), O;
      })();
    }
  });
};
Ye(["click"]);
const my = /* @__PURE__ */ $('<img style="width:500px;margin-top: 20px">'), gy = (e) => A(Dt, {
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
    const t = my.cloneNode(!0);
    return z(() => Ne(t, "src", e.url)), t;
  }
}), yy = {
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
}, py = /* @__PURE__ */ $('<div class="klinecharts-pro-indicator-setting-modal-content"></div>'), Cy = /* @__PURE__ */ $("<span></span>"), vy = (e) => {
  const [t, r] = D(B.clone(e.params.calcParams)), n = (l) => yy[l];
  return A(Dt, {
    get title() {
      return e.params.indicatorName;
    },
    width: 360,
    get buttons() {
      return [{
        type: "confirm",
        children: d("confirm", e.locale),
        onClick: () => {
          const l = n(e.params.indicatorName), u = [];
          B.clone(t()).forEach((f, m) => {
            !B.isValid(f) || f === "" ? "default" in l[m] && u.push(l[m].default) : u.push(f);
          }), e.onConfirm(u), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      const l = py.cloneNode(!0);
      return C(l, () => n(e.params.indicatorName).map((u, f) => [(() => {
        const m = Cy.cloneNode(!0);
        return C(m, () => d(u.paramNameKey, e.locale)), m;
      })(), A(z0, {
        style: {
          width: "200px"
        },
        get value() {
          return t()[f] ?? "";
        },
        get precision() {
          return u.precision;
        },
        get min() {
          return u.min;
        },
        onChange: (m) => {
          const p = B.clone(t());
          p[f] = m, r(p);
        }
      })])), l;
    }
  });
}, by = /* @__PURE__ */ $('<svg viewBox="0 0 1024 1024"><path d="M945.066667 898.133333l-189.866667-189.866666c55.466667-64 87.466667-149.333333 87.466667-241.066667 0-204.8-168.533333-373.333333-373.333334-373.333333S96 264.533333 96 469.333333 264.533333 842.666667 469.333333 842.666667c91.733333 0 174.933333-34.133333 241.066667-87.466667l189.866667 189.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c8.533333-12.8 8.533333-34.133333-2.133333-46.933334zM469.333333 778.666667C298.666667 778.666667 160 640 160 469.333333S298.666667 160 469.333333 160 778.666667 298.666667 778.666667 469.333333 640 778.666667 469.333333 778.666667z"></path></svg>'), $y = /* @__PURE__ */ $('<img alt="symbol">'), _y = /* @__PURE__ */ $("<li><div><span></span></div></li>"), ky = (e) => {
  const [t, r] = D(""), [n] = fs(t, e.datafeed.searchSymbols.bind(e.datafeed));
  return A(Dt, {
    get title() {
      return d("symbol_search", e.locale);
    },
    width: 460,
    get onClose() {
      return e.onClose;
    },
    get children() {
      return [A(z0, {
        class: "klinecharts-pro-symbol-search-modal-input",
        get placeholder() {
          return d("symbol_code", e.locale);
        },
        get suffix() {
          return by.cloneNode(!0);
        },
        get value() {
          return t();
        },
        onChange: (l) => {
          const u = `${l}`;
          r(u);
        }
      }), A(Sn, {
        class: "klinecharts-pro-symbol-search-modal-list",
        get loading() {
          return n.loading;
        },
        get dataSource() {
          return n() ?? [];
        },
        renderItem: (l) => (() => {
          const u = _y.cloneNode(!0), f = u.firstChild, m = f.firstChild;
          return u.$$click = () => {
            e.onSymbolSelected(l), e.onClose();
          }, C(f, A(fe, {
            get when() {
              return l.logo;
            },
            get children() {
              const p = $y.cloneNode(!0);
              return z(() => Ne(p, "src", l.logo)), p;
            }
          }), m), C(m, () => l.shortName ?? l.ticker, null), C(m, () => `${l.name ? `(${l.name})` : ""}`, null), C(u, () => l.exchange ?? "", null), z(() => Ne(m, "title", l.name ?? "")), u;
        })()
      })];
    }
  });
};
Ye(["click"]);
const xy = /* @__PURE__ */ $('<div class="klinecharts-pro-mobile-more-modal-content"><div class="item"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div><div class="item"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path></svg><span></span></div><div class="item"><svg viewBox="0 0 20 20"><rect x="3" y="4" width="14" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"></rect><path d="M6 2.5v4M14 2.5v4M3 8h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M10 11v3l2.2 1.3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg><span>Time Tools</span></div><div class="item"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg><span></span></div></div>'), Ly = (e) => A(Dt, {
  get title() {
    return d("more", e.locale);
  },
  isMobile: !0,
  get onClose() {
    return e.onClose;
  },
  get children() {
    const t = xy.cloneNode(!0), r = t.firstChild, n = r.firstChild, l = n.nextSibling, u = r.nextSibling, f = u.firstChild, m = f.nextSibling, p = u.nextSibling, L = p.nextSibling, x = L.firstChild, w = x.nextSibling;
    return r.$$click = () => {
      e.onIndicatorClick(), e.onClose();
    }, C(l, () => d("indicator", e.locale)), u.$$click = () => {
      e.onTimezoneClick(), e.onClose();
    }, C(m, () => d("timezone", e.locale)), p.$$click = () => {
      e.onTimeToolsClick(), e.onClose();
    }, L.$$click = () => {
      e.onSettingClick(), e.onClose();
    }, C(w, () => d("setting", e.locale)), t;
  }
});
Ye(["click"]);
const wy = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-picker"></div>'), Ay = /* @__PURE__ */ $('<label class="klinecharts-pro-time-tools-field"><button type="button" class="klinecharts-pro-time-tools-input"><span></span><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M8 3v4M16 3v4M4 10h16"></path></svg></button></label>'), Ty = /* @__PURE__ */ $("<span></span>"), Sy = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-calendar"><div class="klinecharts-pro-time-tools-month"><button type="button">&lt;&lt;</button><button type="button">&lt;</button><button type="button" class="calendar-title"></button><button type="button">></button><button type="button">>></button></div></div>'), My = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-grid"></div>'), Py = /* @__PURE__ */ $('<span class="weekday"></span>'), Kt = /* @__PURE__ */ $('<button type="button"></button>'), Dy = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-month-grid"></div>'), Ny = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-month-grid year-grid"></div>'), Oy = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-spinners"><div class="spinner-column scrollable"></div><div class="spinner-column scrollable"></div><div class="spinner-column"></div></div>'), Iy = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-content"></div>'), Ey = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-tabs"></div>'), By = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-range-panel"><div class="klinecharts-pro-time-tools-range-header"><button type="button"></button><span class="klinecharts-pro-time-tools-range-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg></span><button type="button"></button><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M8 3v4M16 3v4M4 10h16"></path></svg></div></div>'), Fy = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-panel"><div class="klinecharts-pro-time-tools-row"><div><strong>Time Anchor</strong><span>Anchor to a time on the chart when switching between intervals</span></div><button type="button"><span></span></button></div><div><div><strong>Anchor Point</strong></div><select><option value="date">Date</option><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option></select></div><div><div><strong>Anchor line</strong><span>Mark the anchored time on the chart with a vertical line</span></div><button type="button"><span></span></button></div><div><div><strong>Across Tokens</strong><span>Retain onscreen chart range when switching symbols</span></div><button type="button"><span></span></button></div></div>'), zy = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-anchor-date"></div>'), Uy = [{
  key: "goToDate",
  label: "Go to Date"
}, {
  key: "timeRange",
  label: "Time Range"
}, {
  key: "timeAnchor",
  label: "Time Anchor"
}], Ry = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], Gi = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], n1 = (e) => String(e).padStart(2, "0"), Xi = (e, t, r) => Math.min(r, new Date(e, t + 1, 0).getDate()), dr = (e) => {
  const t = new Date(e);
  return {
    year: t.getFullYear(),
    month: t.getMonth(),
    day: t.getDate(),
    hour: t.getHours(),
    minute: t.getMinutes()
  };
}, mn = (e) => new Date(e.year, e.month, e.day, e.hour, e.minute, 0, 0).getTime(), hr = (e) => e.year * 1e4 + (e.month + 1) * 100 + e.day, wr = (e) => {
  const t = e.hour >= 12 ? "PM" : "AM", r = e.hour % 12 || 12;
  return `${n1(e.month + 1)}/${n1(e.day)}/${e.year} ${n1(r)}:${n1(e.minute)} ${t}`;
}, Vy = (e, t) => {
  const r = new Date(e, t, 1).getDay(), n = new Date(e, t + 1, 0).getDate(), l = new Date(e, t, 0).getDate(), u = [];
  for (let f = r - 1; f >= 0; f -= 1)
    u.push({
      date: new Date(e, t - 1, l - f),
      current: !1
    });
  for (let f = 1; f <= n; f += 1)
    u.push({
      date: new Date(e, t, f),
      current: !0
    });
  for (; u.length < 42; ) {
    const f = u[u.length - 1].date;
    u.push({
      date: new Date(f.getFullYear(), f.getMonth(), f.getDate() + 1),
      current: !1
    });
  }
  return u;
}, gn = (e) => {
  const [t, r] = D(!0), [n, l] = D("date"), [u, f] = D(e.value.year), [m, p] = D(e.value.month), L = ee(() => Vy(u(), m())), x = ee(() => Math.floor(u() / 10) * 10), w = ee(() => Array.from({
    length: 12
  }, (G, Z) => x() - 1 + Z)), K = ee(() => e.value.hour % 12 || 12), W = ee(() => e.value.hour >= 12 ? "PM" : "AM"), ye = Array.from({
    length: 12
  }, (G, Z) => Z + 1), R = Array.from({
    length: 60
  }, (G, Z) => Z), T = (G) => {
    const Z = new Date(u(), m() + G, 1);
    f(Z.getFullYear()), p(Z.getMonth());
  }, E = () => {
    n() === "date" ? l("month") : n() === "month" && l("year");
  }, ne = (G) => {
    var Z;
    e.onChange({
      ...e.value,
      year: G.getFullYear(),
      month: G.getMonth(),
      day: G.getDate()
    }), (Z = e.onDateSelect) == null || Z.call(e), f(G.getFullYear()), p(G.getMonth());
  }, F = (G) => {
    p(G), e.onChange({
      ...e.value,
      year: u(),
      month: G,
      day: Xi(u(), G, e.value.day)
    }), l("date");
  }, U = (G) => {
    f(G), e.onChange({
      ...e.value,
      year: G,
      day: Xi(G, e.value.month, e.value.day)
    }), l("month");
  }, j = (G) => {
    const Z = W() === "PM";
    e.onChange({
      ...e.value,
      hour: Z ? G === 12 ? 12 : G + 12 : G === 12 ? 0 : G
    });
  }, ce = (G) => {
    const Z = K();
    e.onChange({
      ...e.value,
      hour: G === "PM" ? Z === 12 ? 12 : Z + 12 : Z === 12 ? 0 : Z
    });
  };
  return (() => {
    const G = wy.cloneNode(!0);
    return C(G, (() => {
      const Z = ee(() => e.showInput !== !1);
      return () => Z() && (() => {
        const X = Ay.cloneNode(!0), ae = X.firstChild, he = ae.firstChild;
        return C(X, (() => {
          const $e = ee(() => !!e.label);
          return () => $e() && (() => {
            const we = Ty.cloneNode(!0);
            return C(we, () => e.label), we;
          })();
        })(), ae), ae.$$click = () => r(!t()), C(he, () => wr(e.value)), X;
      })();
    })(), null), C(G, (() => {
      const Z = ee(() => !!t());
      return () => Z() && (() => {
        const X = Sy.cloneNode(!0), ae = X.firstChild, he = ae.firstChild, $e = he.nextSibling, we = $e.nextSibling, de = we.nextSibling, De = de.nextSibling;
        return he.$$click = () => {
          n() === "year" ? f(u() - 10) : n() === "month" ? f(u() - 1) : T(-12);
        }, $e.$$click = () => {
          n() === "year" ? f(u() - 10) : n() === "month" ? f(u() - 1) : T(-1);
        }, we.$$click = E, C(we, (() => {
          const _e = ee(() => n() === "year");
          return () => _e() ? `${x()}-${x() + 9}` : (() => {
            const O = ee(() => n() === "month");
            return () => O() ? u() : `${Gi[m()]} ${u()}`;
          })();
        })()), de.$$click = () => {
          n() === "year" ? f(u() + 10) : n() === "month" ? f(u() + 1) : T(1);
        }, De.$$click = () => {
          n() === "year" ? f(u() + 10) : n() === "month" ? f(u() + 1) : T(12);
        }, C(X, (() => {
          const _e = ee(() => n() === "date");
          return () => _e() && (() => {
            const O = My.cloneNode(!0);
            return C(O, () => Ry.map((N) => (() => {
              const V = Py.cloneNode(!0);
              return C(V, N), V;
            })()), null), C(O, () => L().map(({
              date: N,
              current: V
            }) => {
              const Y = hr({
                year: N.getFullYear(),
                month: N.getMonth(),
                day: N.getDate()
              }), M = e.range ? hr(e.range.from) : NaN, S = e.range ? hr(e.range.to) : NaN, q = Math.min(M, S), H = Math.max(M, S), Q = Number.isFinite(q) && Y >= q && Y <= H, ie = Number.isFinite(q) && (Y === q || Y === H), _ = N.getFullYear() === e.value.year && N.getMonth() === e.value.month && N.getDate() === e.value.day;
              return (() => {
                const oe = Kt.cloneNode(!0);
                return oe.$$click = () => ne(N), le(oe, `${V ? "" : "muted"} ${Q ? "in-range" : ""} ${ie || _ ? "selected" : ""}`), C(oe, () => N.getDate()), oe;
              })();
            }), null), O;
          })();
        })(), null), C(X, (() => {
          const _e = ee(() => n() === "month");
          return () => _e() && (() => {
            const O = Dy.cloneNode(!0);
            return C(O, () => Gi.map((N, V) => (() => {
              const Y = Kt.cloneNode(!0);
              return Y.$$click = () => F(V), C(Y, N), z(() => le(Y, V === e.value.month && u() === e.value.year ? "selected" : "")), Y;
            })())), O;
          })();
        })(), null), C(X, (() => {
          const _e = ee(() => n() === "year");
          return () => _e() && (() => {
            const O = Ny.cloneNode(!0);
            return C(O, () => w().map((N) => (() => {
              const V = Kt.cloneNode(!0);
              return V.$$click = () => U(N), C(V, N), z(() => le(V, `${N < x() || N > x() + 9 ? "muted" : ""} ${N === e.value.year ? "selected" : ""}`)), V;
            })())), O;
          })();
        })(), null), C(X, (() => {
          const _e = ee(() => n() === "date");
          return () => _e() && (() => {
            const O = Oy.cloneNode(!0), N = O.firstChild, V = N.nextSibling, Y = V.nextSibling;
            return C(N, () => ye.map((M) => (() => {
              const S = Kt.cloneNode(!0);
              return S.$$click = () => j(M), C(S, () => n1(M)), z(() => le(S, M === K() ? "selected" : "")), S;
            })())), C(V, () => R.map((M) => (() => {
              const S = Kt.cloneNode(!0);
              return S.$$click = () => e.onChange({
                ...e.value,
                minute: M
              }), C(S, () => n1(M)), z(() => le(S, M === e.value.minute ? "selected" : "")), S;
            })())), C(Y, () => ["AM", "PM"].map((M) => (() => {
              const S = Kt.cloneNode(!0);
              return S.$$click = () => ce(M), C(S, M), z(() => le(S, M === W() ? "selected" : "")), S;
            })())), O;
          })();
        })(), null), X;
      })();
    })(), null), G;
  })();
}, Ky = (e) => {
  const [t, r] = D(e.initialTab ?? "goToDate"), [n, l] = D(dr(e.initialTimestamp)), [u, f] = D(dr(e.initialRange.from)), [m, p] = D(dr(e.initialRange.to)), [L, x] = D("from"), [w, K] = D({
    ...e.anchorSettings,
    anchorLine: e.anchorSettings.anchorLine ?? !0,
    acrossTokens: e.anchorSettings.acrossTokens ?? !0
  }), W = (R) => {
    K((T) => ({
      ...T,
      ...R
    }));
  }, ye = () => {
    const R = t();
    if (R === "goToDate")
      e.onGoToDate(mn(n()));
    else if (R === "timeRange") {
      const T = mn(u()), E = mn(m());
      e.onTimeRange(T <= E ? {
        from: T,
        to: E
      } : {
        from: E,
        to: T
      });
    } else {
      const T = w();
      e.onTimeAnchorChange({
        ...T,
        timestamp: T.anchorPoint === "date" ? mn(n()) : T.timestamp
      });
    }
    e.onClose();
  };
  return A(Dt, {
    width: 520,
    get title() {
      return (() => {
        const R = Ey.cloneNode(!0);
        return C(R, () => Uy.map((T) => (() => {
          const E = Kt.cloneNode(!0);
          return E.$$click = () => r(T.key), C(E, () => T.label), z(() => le(E, t() === T.key ? "active" : "")), E;
        })())), R;
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
      const R = Iy.cloneNode(!0);
      return C(R, (() => {
        const T = ee(() => t() === "goToDate");
        return () => T() && A(gn, {
          label: "",
          get value() {
            return n();
          },
          onChange: l
        });
      })(), null), C(R, (() => {
        const T = ee(() => t() === "timeRange");
        return () => T() && (() => {
          const E = By.cloneNode(!0), ne = E.firstChild, F = ne.firstChild, U = F.nextSibling, j = U.nextSibling;
          return F.$$click = () => x("from"), C(F, () => wr(u())), j.$$click = () => x("to"), C(j, () => wr(m())), C(E, (() => {
            const ce = ee(() => L() === "from");
            return () => ce() ? A(gn, {
              label: "Start",
              get value() {
                return u();
              },
              onChange: f,
              onDateSelect: () => x("to"),
              showInput: !1,
              get range() {
                return {
                  from: u(),
                  to: m()
                };
              }
            }) : A(gn, {
              label: "End",
              get value() {
                return m();
              },
              onChange: p,
              showInput: !1,
              get range() {
                return {
                  from: u(),
                  to: m()
                };
              }
            });
          })(), null), z((ce) => {
            const G = L() === "from" ? "active" : "", Z = L() === "to" ? "active" : "";
            return G !== ce._v$ && le(F, ce._v$ = G), Z !== ce._v$2 && le(j, ce._v$2 = Z), ce;
          }, {
            _v$: void 0,
            _v$2: void 0
          }), E;
        })();
      })(), null), C(R, (() => {
        const T = ee(() => t() === "timeAnchor");
        return () => T() && (() => {
          const E = Fy.cloneNode(!0), ne = E.firstChild, F = ne.firstChild, U = F.nextSibling, j = ne.nextSibling, ce = j.firstChild, G = ce.nextSibling, Z = j.nextSibling, X = Z.firstChild, ae = X.nextSibling, he = Z.nextSibling, $e = he.firstChild, we = $e.nextSibling;
          return U.$$click = () => W({
            enabled: !w().enabled
          }), G.addEventListener("change", (de) => W({
            anchorPoint: de.currentTarget.value
          })), C(E, (() => {
            const de = ee(() => !!(w().enabled && w().anchorPoint === "date"));
            return () => de() && (() => {
              const De = zy.cloneNode(!0);
              return C(De, A(gn, {
                label: "Anchor date",
                get value() {
                  return n();
                },
                onChange: l
              })), De;
            })();
          })(), Z), ae.$$click = () => W({
            anchorLine: !w().anchorLine
          }), we.$$click = () => W({
            acrossTokens: !w().acrossTokens
          }), z((de) => {
            const De = `klinecharts-pro-time-tools-switch${w().enabled ? " on" : ""}`, _e = `klinecharts-pro-time-tools-row${w().enabled ? "" : " disabled"}`, O = !w().enabled, N = `klinecharts-pro-time-tools-row with-divider${w().enabled ? "" : " disabled"}`, V = `klinecharts-pro-time-tools-switch${w().anchorLine ? " on" : ""}`, Y = !w().enabled, M = `klinecharts-pro-time-tools-row with-divider${w().enabled ? "" : " disabled"}`, S = `klinecharts-pro-time-tools-switch${w().acrossTokens ? " on" : ""}`, q = !w().enabled;
            return De !== de._v$3 && le(U, de._v$3 = De), _e !== de._v$4 && le(j, de._v$4 = _e), O !== de._v$5 && (G.disabled = de._v$5 = O), N !== de._v$6 && le(Z, de._v$6 = N), V !== de._v$7 && le(ae, de._v$7 = V), Y !== de._v$8 && (ae.disabled = de._v$8 = Y), M !== de._v$9 && le(he, de._v$9 = M), S !== de._v$10 && le(we, de._v$10 = S), q !== de._v$11 && (we.disabled = de._v$11 = q), de;
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
          }), z(() => G.value = w().anchorPoint), E;
        })();
      })(), null), R;
    }
  });
};
Ye(["click"]);
const jy = 0.08, Qy = 5e-3;
function bn(e) {
  if (typeof e == "number")
    return Number.isFinite(e) ? e : null;
  if (typeof e == "string" && e.trim() !== "") {
    const t = Number(e);
    return Number.isFinite(t) ? t : null;
  }
  return null;
}
function Pn(e, t) {
  const r = bn(e);
  if (r != null) {
    t.push(r);
    return;
  }
  if (Array.isArray(e)) {
    e.forEach((n) => Pn(n, t));
    return;
  }
  e && typeof e == "object" && Object.values(e).forEach((n) => {
    Pn(n, t);
  });
}
function Zy(e, t, r) {
  const n = t - e;
  if (Number.isFinite(n) && n > 0)
    return n * r;
  const l = Math.max(Math.abs(e), Math.abs(t), 1);
  return Math.max(l * Qy, Number.EPSILON);
}
function Hy({
  visibleCandles: e = [],
  visibleIndicators: t = [],
  visiblePriceLines: r = [],
  latestPrice: n,
  paddingPercent: l = jy
}) {
  const u = [];
  e.forEach((w) => {
    const K = bn(w.high), W = bn(w.low);
    K != null && u.push(K), W != null && u.push(W);
  }), t.forEach((w) => {
    Pn(w, u);
  }), r.forEach((w) => {
    Pn(w, u);
  });
  const f = bn(n);
  if (f != null && u.push(f), u.length === 0)
    return null;
  let m = Number.POSITIVE_INFINITY, p = Number.NEGATIVE_INFINITY;
  if (u.forEach((w) => {
    m = Math.min(m, w), p = Math.max(p, w);
  }), !Number.isFinite(m) || !Number.isFinite(p))
    return null;
  const L = Math.min(Math.max(l, 0), 0.25), x = Zy(m, p, L);
  return {
    minPrice: m - x,
    maxPrice: p + x
  };
}
const Wy = (e = !0) => e !== !1, Yy = /* @__PURE__ */ $('<i class="icon-close klinecharts-pro-load-icon"></i>'), qy = /* @__PURE__ */ $('<div class="klinecharts-pro-content"><button type="button">auto</button><div class="klinecharts-pro-widget"></div></div>'), Gy = /* @__PURE__ */ $('<div class="klinecharts-pro-time-anchor-line"></div>'), Xy = /* @__PURE__ */ $('<div class="klinecharts-pro-time-navigation-tooltip"></div>'), Jy = /* @__PURE__ */ $('<div class="klinecharts-pro-mobile-candle-tooltip"></div>'), ep = /* @__PURE__ */ $('<div class="klinecharts-pro-mobile-candle-tooltip-row"><span class="label"></span><span class="value"></span></div>'), tp = /* @__PURE__ */ $('<div class="klinecharts-pro-countdown-price-mark"><span class="klinecharts-pro-countdown-price-mark-price"></span><span class="klinecharts-pro-countdown-price-mark-timer"></span></div>'), np = /* @__PURE__ */ $('<div class="overlay-toolbar-color-popover"><div class="overlay-toolbar-color-grid"></div><div class="overlay-toolbar-color-footer"><button type="button" class="overlay-toolbar-add-color">+</button><div class="overlay-toolbar-color-slider"><span></span></div></div></div>'), rp = /* @__PURE__ */ $('<div class="overlay-toolbar-dropdown width-menu"></div>'), op = /* @__PURE__ */ $('<div class="overlay-toolbar-dropdown style-menu"><button type="button"><span class="overlay-toolbar-style-sample solid"></span></button><button type="button"><span class="overlay-toolbar-style-sample dashed"></span></button><button type="button"><span class="overlay-toolbar-style-sample dotted"></span></button></div>'), ip = /* @__PURE__ */ $('<div class="klinecharts-pro-overlay-toolbar"><button type="button" class="overlay-toolbar-icon drag" title="Move"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="6" r="1.5"></circle><circle cx="15" cy="6" r="1.5"></circle><circle cx="9" cy="12" r="1.5"></circle><circle cx="15" cy="12" r="1.5"></circle><circle cx="9" cy="18" r="1.5"></circle><circle cx="15" cy="18" r="1.5"></circle></svg></button><button type="button" class="overlay-toolbar-icon refresh" title="Reset"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 15.4-6.36L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-15.4 6.36L3 16"></path><path d="M3 21v-5h5"></path></svg></button><div class="overlay-toolbar-picker"><button type="button" title="Color"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg></button></div><div class="overlay-toolbar-picker"><button type="button" title="Line width"><span class="overlay-toolbar-line-preview"></span><span>px</span></button></div><div class="overlay-toolbar-picker"><button type="button" title="Line style"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16"></path></svg></button></div><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2"></rect><path d="M20 4 4 20"></path></svg></button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg></button><button type="button" class="overlay-toolbar-icon delete" title="Delete"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6 18 20H6L5 6"></path><path d="M10 11v5"></path><path d="M14 11v5"></path></svg></button></div>'), ap = /* @__PURE__ */ $('<button type="button"></button>'), sp = /* @__PURE__ */ $('<button type="button"><span class="overlay-toolbar-width-sample"></span></button>'), lp = /* @__PURE__ */ $('<div class="klinecharts-pro-quick-order-marker"><button type="button" class="klinecharts-pro-quick-order-plus"></button></div>'), cp = /* @__PURE__ */ $('<span class="klinecharts-pro-quick-order-plus-icon"></span>'), up = /* @__PURE__ */ $('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" aria-hidden="true"><path d="M460-300h40v-160h160v-40H500v-160h-40v160H300v40h160v160ZM224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h510.76q27.62 0 46.12 18.5Q800-763 800-735.38v510.76q0 27.62-18.5 46.12Q763-160 735.38-160H224.62Zm0-40h510.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-510.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69H224.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v510.76q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69ZM200-760v560-560Z"></path></svg>'), dp = /* @__PURE__ */ $('<div class="klinecharts-pro-quick-order-menu-anchor"><div class="klinecharts-pro-quick-order-menu"><button type="button">Trade <!> @ <!> Limit</button><button type="button">Trade <!> @ <!> Stop</button><button type="button">Create new order...</button><button type="button">Copy Price (<!>)</button><button type="button">Draw horizontal line on </button></div></div>');
A4();
const fr = "klinecharts_pro_chart_style", mr = "klinecharts_pro_chart_background_color", Ar = "klinecharts_pro_time_anchor_settings", Rt = "candle_pane", hp = 4, fp = /* @__PURE__ */ new Set(["rect", "circle", "straightLine", "rayLine", "segment", "arrow", "fibonacciLine", "fibonacciSegment", "fibonacciCircle", "fibonacciSpiral", "fibonacciSpeedResistanceFan", "gannBox", "priceLine", "horizontalRayLine", "horizontalSegment", "verticalRayLine", "verticalSegment"]), mp = 0.08, gp = 80, Ji = 2e-3, yp = /* @__PURE__ */ new Set(["horizontalRayLine", "horizontalSegment", "horizontalStraightLine", "orderLine", "priceLine"]);
function K0() {
  return {
    enabled: !1,
    timestamp: Date.now(),
    anchorPoint: "date",
    anchorLine: !0,
    acrossTokens: !0
  };
}
function pp() {
  try {
    const e = window.localStorage.getItem(Ar);
    if (!e)
      return null;
    const t = JSON.parse(e);
    if (t.enabled !== !0 || t.acrossTokens !== !0 || !Number.isFinite(t.timestamp))
      return null;
    const r = K0();
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
function e0(e) {
  try {
    if (!e.enabled || !e.acrossTokens) {
      window.localStorage.removeItem(Ar);
      return;
    }
    window.localStorage.setItem(Ar, JSON.stringify(e));
  } catch {
  }
}
function yn(e, t, r, n) {
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
      indicator: u,
      defaultStyles: f
    }) => {
      const m = [];
      return u.visible ? (m.push(f.tooltip.icons[1]), m.push(f.tooltip.icons[2]), m.push(f.tooltip.icons[3])) : (m.push(f.tooltip.icons[0]), m.push(f.tooltip.icons[2]), m.push(f.tooltip.icons[3])), {
        icons: m
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
function pn(e) {
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
function Cp(e) {
  const t = Math.max(0, Math.ceil(e / 1e3)), r = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), l = t % 60, u = (f) => String(f).padStart(2, "0");
  return r > 0 ? `${u(r)}:${u(n)}:${u(l)}` : `${u(n)}:${u(l)}`;
}
const vp = (e) => {
  var Ao, To, So, Mo, Po, Do, No, Oo, Io, Eo, Bo, Fo, zo, Uo, Ro, Vo, Ko, jo, Qo, Zo, Ho, Wo, Yo, qo, Go, Xo, Jo, ei, ti, ni, ri;
  let t, r, n = null, l, u = null, f = null;
  const [m, p] = D(!1), [L, x] = D(e.theme), [w, K] = D(e.styles), [W, ye] = D(e.locale), [R, T] = D(e.symbol), [E, ne] = D(e.period), F = () => {
    var o, i, a, s;
    return {
      visibleMarginLeft: ((o = e.indicatorTooltipIconStyles) == null ? void 0 : o.visibleMarginLeft) ?? 7,
      secondaryMarginLeft: ((i = e.indicatorTooltipIconStyles) == null ? void 0 : i.secondaryMarginLeft) ?? 7,
      marginTop: ((a = e.indicatorTooltipIconStyles) == null ? void 0 : a.marginTop) ?? 1,
      size: ((s = e.indicatorTooltipIconStyles) == null ? void 0 : s.size) ?? 12
    };
  }, [U, j] = D(!1), [ce, G] = D([...e.mainIndicators]), [Z, X] = D({}), [ae, he] = D(!1), [$e, we] = D({
    key: e.timezone,
    text: Lr(e.timezone, e.locale)
  }), [de, De] = D(!1), [_e, O] = D(), N = () => {
    try {
      const o = window.localStorage.getItem(fr);
      if (!o)
        return;
      const i = JSON.parse(o);
      return i && typeof i == "object" ? i : void 0;
    } catch {
      return;
    }
  }, V = (o) => {
    try {
      window.localStorage.setItem(fr, JSON.stringify(o)), window.localStorage.removeItem(mr);
    } catch {
    }
  }, Y = () => {
    try {
      window.localStorage.removeItem(fr), window.localStorage.removeItem(mr);
    } catch {
    }
  }, M = () => {
    var i;
    const o = N();
    if ((i = o == null ? void 0 : o.chart) != null && i.backgroundColor)
      return o.chart.backgroundColor;
    try {
      return window.localStorage.getItem(mr) ?? void 0;
    } catch {
      return;
    }
  }, S = () => {
    const o = r == null ? void 0 : r.closest(".klinecharts-pro");
    return o && getComputedStyle(o).backgroundColor || "#171a27";
  }, q = () => t ? getComputedStyle(t).getPropertyValue("--klinecharts-pro-chart-background-color").trim() || M() || S() : M() ?? S(), H = (o) => {
    var a;
    const i = (a = o.chart) == null ? void 0 : a.backgroundColor;
    if (!(!i || !t)) {
      if (i.toLowerCase() === S().toLowerCase()) {
        t.style.removeProperty("--klinecharts-pro-chart-background-color");
        return;
      }
      t.style.setProperty("--klinecharts-pro-chart-background-color", i);
    }
  }, Q = (o) => {
    const {
      chart: i,
      ...a
    } = o;
    return a;
  }, [ie, _] = D(""), [oe, be] = D(!1), [pe, Ce] = D(Date.now()), [Xe, rt] = D({
    from: Date.now() - 30 * 24 * 60 * 60 * 1e3,
    to: Date.now()
  }), [pt, Ct] = D(pp() ?? K0()), [Lt, Un] = D(e.drawingBarVisible), [f1, U1] = D(!1), [R1, Zt] = D(!1), [Rn, m1] = D(!1), Nt = ((Ao = e.orderTools) == null ? void 0 : Ao.quickOrder) ?? !0, [Ee, Vn] = D({
    quickOrder: Nt,
    quickOrderFloatingWindow: ((To = e.orderTools) == null ? void 0 : To.quickOrderFloatingWindow) ?? Nt,
    quickOrderPlusButton: ((So = e.orderTools) == null ? void 0 : So.quickOrderPlusButton) ?? Nt,
    openOrders: ((Mo = e.orderTools) == null ? void 0 : Mo.openOrders) ?? !0,
    openOrdersExtendedPriceLine: ((Po = e.orderTools) == null ? void 0 : Po.openOrdersExtendedPriceLine) ?? !0,
    openOrdersDisplay: ((Do = e.orderTools) == null ? void 0 : Do.openOrdersDisplay) ?? "right",
    confirmAfterDrag: ((No = e.orderTools) == null ? void 0 : No.confirmAfterDrag) ?? !0,
    positions: ((Oo = e.orderTools) == null ? void 0 : Oo.positions) ?? !0,
    breakevenPrice: ((Io = e.orderTools) == null ? void 0 : Io.breakevenPrice) ?? !0,
    liquidationPrice: ((Eo = e.orderTools) == null ? void 0 : Eo.liquidationPrice) ?? !0,
    priceLine: ((Bo = e.orderTools) == null ? void 0 : Bo.priceLine) ?? !0,
    marketPriceLine: ((Fo = e.orderTools) == null ? void 0 : Fo.marketPriceLine) ?? !0,
    countDown: ((zo = e.orderTools) == null ? void 0 : zo.countDown) ?? !0,
    bidAskPrice: ((Uo = e.orderTools) == null ? void 0 : Uo.bidAskPrice) ?? !0,
    orderPreviewLine: ((Ro = e.orderTools) == null ? void 0 : Ro.orderPreviewLine) ?? !0,
    orderHistory: ((Vo = e.orderTools) == null ? void 0 : Vo.orderHistory) ?? !0
  }), [wt, Ot] = D(null), [It, ot] = D(!1), [g1, Je] = D(!1), [y1, p1] = D(64), [Et, At] = D(null), [C1, v1] = D(null), [Kn, V1] = D("buy"), jn = 6, [K1, Ht] = D(null), [b1, j1] = D(null), [$1, Q1] = D(null), [Z1, Bt] = D(null), [Qe, He] = D(null), [qe, We] = D(null), Qn = ["#000000", "#2b3342", "#3f4653", "#565d69", "#6f7580", "#8a9099", "#a7acb3", "#c4c8ce", "#ffffff", "#ff4d67", "#ffa629", "#f7ed4a", "#2fc58d", "#4ab09c", "#52c4d3", "#3157f6", "#6a36b8", "#a644b9", "#d83972", "#f2a3a6", "#f5c879", "#f7ee97", "#a6d29f", "#7fc9b9", "#91d7df", "#8fb2ee", "#b09ad2", "#c89ccf", "#d987ab", "#e8757a", "#efb34f", "#efe36e", "#86c17d", "#66b7a8", "#68c4d0", "#5f91e4", "#8059c9", "#aa62c2", "#d34d83", "#b9353d", "#ea8527", "#e8c245", "#4b8c43", "#2f6f60", "#47919b", "#2646c6", "#56309c", "#892f95", "#a82563", "#8e2528", "#de5c1f", "#dc8527", "#255a22", "#164b34", "#225b63", "#15309b", "#442180", "#6b1f74", "#86154e"];
  let Wt = null;
  const [_1, k1] = D({
    visible: !1,
    indicatorName: "",
    paneId: "",
    calcParams: []
  });
  let ke = /* @__PURE__ */ new Map(), x1 = /* @__PURE__ */ new Map(), ht, vt, Yt = null, Tt;
  const [Ge, H1] = D(!0), [L1, W1] = D(null), [Y1, q1] = D(null);
  let b = /* @__PURE__ */ new Map();
  const I = (o, i, a) => {
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
  }, Ze = () => {
    const o = ce().map((a) => I(a, Rt, "main")), i = Object.entries(Z()).map(([a, s]) => I(a, s, "sub"));
    return {
      main: o,
      sub: i
    };
  }, Ue = () => {
    var a, s, c, y, h, g, v, k, P, te, se, ue, ge, J, Ae, Te;
    if (!n)
      return {};
    const o = n.getStyles(), i = (a = o.candle) == null ? void 0 : a.bar;
    return {
      candleType: (s = o.candle) == null ? void 0 : s.type,
      candleBarStyle: i == null ? void 0 : i.style,
      showLastPrice: (h = (y = (c = o.candle) == null ? void 0 : c.priceMark) == null ? void 0 : y.last) == null ? void 0 : h.show,
      showHighestPrice: (k = (v = (g = o.candle) == null ? void 0 : g.priceMark) == null ? void 0 : v.high) == null ? void 0 : k.show,
      showLowestPrice: (se = (te = (P = o.candle) == null ? void 0 : P.priceMark) == null ? void 0 : te.low) == null ? void 0 : se.show,
      showIndicatorLastValue: (ge = (ue = o.indicator) == null ? void 0 : ue.lastValueMark) == null ? void 0 : ge.show,
      priceAxisType: (J = o.yAxis) == null ? void 0 : J.type,
      reverseCoordinate: (Ae = o.yAxis) == null ? void 0 : Ae.reverse,
      showGrids: (Te = o.grid) == null ? void 0 : Te.show,
      timezone: $e().key,
      timestamp: Date.now()
    };
  }, it = () => {
    var s, c;
    const o = ((s = n == null ? void 0 : n.getDataList) == null ? void 0 : s.call(n)) ?? [], i = o[0], a = o[o.length - 1];
    return {
      schemaVersion: 1,
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      theme: L(),
      locale: W(),
      symbol: R(),
      period: E(),
      timezone: $e().key,
      styles: ((c = n == null ? void 0 : n.getStyles) == null ? void 0 : c.call(n)) ?? {},
      settings: Ue(),
      indicators: Ze(),
      drawings: Array.from(ke.values()),
      dataRange: {
        from: (i == null ? void 0 : i.timestamp) ?? null,
        to: (a == null ? void 0 : a.timestamp) ?? null,
        count: o.length
      },
      orderTools: Ee(),
      drawingBarVisible: Lt(),
      autoScale: {
        enabled: Ge(),
        currentPriceRange: Y1(),
        manualPriceRange: L1()
      },
      timeTools: {
        timestamp: pe(),
        range: Xe(),
        anchor: pt()
      }
    };
  }, Ft = (o) => {
    const i = it(), a = `chart-configuration-${i.symbol.ticker.replace(/[^a-z0-9_-]/gi, "_")}-${Date.now()}.json`, s = new Blob([JSON.stringify(i, null, 2)], {
      type: "application/json"
    }), c = URL.createObjectURL(s), y = document.createElement("a");
    y.href = c, y.download = o || a, y.click(), URL.revokeObjectURL(c);
  }, et = (o, i, a, s) => {
    if (e.onIndicatorChange)
      if (s === "add" || s === "change")
        setTimeout(() => {
          const c = I(o, i, a);
          e.onIndicatorChange({
            action: s,
            indicator: c
          });
        }, 50);
      else {
        const c = {
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
          indicator: c
        });
      }
  }, G1 = () => {
    var o;
    return (o = n == null ? void 0 : n.getPaneById) == null ? void 0 : o.call(n, Rt);
  }, X1 = () => {
    var o, i;
    return (i = (o = G1()) == null ? void 0 : o.getAxisComponent) == null ? void 0 : i.call(o);
  }, Vr = () => {
    var s, c;
    const o = (c = (s = X1()) == null ? void 0 : s.getExtremum) == null ? void 0 : c.call(s), i = Number(o == null ? void 0 : o.min), a = Number(o == null ? void 0 : o.max);
    return !Number.isFinite(i) || !Number.isFinite(a) ? null : {
      minPrice: i,
      maxPrice: a
    };
  }, Kr = () => {
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
    const c = Math.min(a, s), y = Math.max(a, s);
    return {
      from: Math.max(0, Math.floor(c)),
      to: Math.min(o.length - 1, Math.ceil(y)),
      dataList: o
    };
  }, j0 = () => {
    const o = Kr();
    return o ? o.dataList.slice(o.from, o.to + 1) : [];
  }, Q0 = () => {
    const o = Kr();
    if (!o || !(n != null && n.getIndicatorByPaneId))
      return [];
    const i = n.getIndicatorByPaneId(Rt), a = i instanceof Map ? Array.from(i.values()) : i ? [i] : [], s = [];
    return a.forEach((c) => {
      if (!c || c.visible === !1 || c.name === "VOL" || c.series === "volume")
        return;
      const y = Array.isArray(c.figures) ? c.figures : [], h = Array.isArray(c.result) ? c.result : [];
      for (let g = o.from; g <= o.to; g += 1) {
        const v = h[g];
        v && y.forEach((k) => {
          (k == null ? void 0 : k.key) != null && s.push(v[k.key]);
        });
      }
    }), s;
  }, Z0 = () => {
    var s;
    const o = [], i = (c) => {
      var h;
      if (!c || c.visible === !1)
        return;
      const y = c.type || c.name || "";
      yp.has(y) && ((h = c.points) == null || h.forEach((g) => {
        const v = Number(g.value);
        Number.isFinite(v) && v > 0 && o.push(v);
      }));
    };
    ke.forEach(i);
    const a = C1();
    return a && i(Qr((s = n == null ? void 0 : n.getOverlayById) == null ? void 0 : s.call(n, a))), x1.forEach((c) => {
      c.forEach((y) => {
        Number.isFinite(y) && y > 0 && o.push(y);
      });
    }), o;
  }, H0 = () => {
    var c, y, h, g, v, k;
    const o = (g = (h = (y = (c = n == null ? void 0 : n.getStyles) == null ? void 0 : c.call(n)) == null ? void 0 : y.candle) == null ? void 0 : h.priceMark) == null ? void 0 : g.last;
    if (!(o != null && o.show) && !((v = o == null ? void 0 : o.line) != null && v.show) && !Ee().marketPriceLine)
      return;
    const i = ((k = n == null ? void 0 : n.getDataList) == null ? void 0 : k.call(n)) ?? [], a = i[i.length - 1], s = Number(a == null ? void 0 : a.close);
    return Number.isFinite(s) && s > 0 ? s : void 0;
  }, W0 = () => Hy({
    visibleCandles: j0(),
    visibleIndicators: Q0(),
    visiblePriceLines: Z0(),
    latestPrice: H0(),
    paddingPercent: mp
  }), Y0 = (o, i) => {
    const a = Math.max(Math.abs(i.maxPrice - i.minPrice), 1);
    return Math.abs(o.minPrice - i.minPrice) <= a * Ji && Math.abs(o.maxPrice - i.maxPrice) <= a * Ji;
  }, jr = (o, i) => {
    var g, v, k, P;
    const a = X1();
    if (!n || !(a != null && a.setExtremum))
      return;
    const s = o.minPrice, c = o.maxPrice, y = ((g = a.convertToRealValue) == null ? void 0 : g.call(a, s)) ?? s, h = ((v = a.convertToRealValue) == null ? void 0 : v.call(a, c)) ?? c;
    a.setExtremum({
      min: s,
      max: c,
      range: c - s,
      realMin: y,
      realMax: h,
      realRange: h - y
    }), (k = n.adjustPaneViewport) == null || k.call(n, !1, !0, !0, !0), i && ((P = a.setAutoCalcTickFlag) == null || P.call(a, !0)), q1(o);
  }, q0 = (o = !1) => {
    var a, s, c;
    if (!n || !Ge())
      return;
    const i = W0();
    if (!i) {
      (s = (a = X1()) == null ? void 0 : a.setAutoCalcTickFlag) == null || s.call(a, !0), (c = n.resize) == null || c.call(n), Yt = null;
      return;
    }
    !o && Yt && Y0(i, Yt) || (jr(i, !0), Yt = i, at());
  }, xe = (o = !1) => {
    !Ge() || typeof window > "u" || (ht && window.clearTimeout(ht), ht = window.setTimeout(() => {
      ht = void 0, vt && window.cancelAnimationFrame(vt), vt = window.requestAnimationFrame(() => {
        vt = void 0, q0(o);
      });
    }, o ? 0 : gp));
  }, J1 = () => {
    var o, i;
    W1(null), H1(!0), (i = (o = X1()) == null ? void 0 : o.setAutoCalcTickFlag) == null || i.call(o, !0), xe(!0);
  }, Zn = () => {
    const o = Vr();
    o && (W1(o), jr(o, !1)), H1(!1);
  }, G0 = () => {
    Ge() ? Zn() : J1();
  }, X0 = () => {
    var g;
    const o = (g = n == null ? void 0 : n.getDom) == null ? void 0 : g.call(n, Rt, tt.YAxis);
    if (!o || typeof window > "u")
      return;
    let i = !1, a = 0;
    const s = () => {
      i = !1;
    }, c = (v) => {
      var k;
      i = !0, a = "touches" in v ? ((k = v.touches[0]) == null ? void 0 : k.clientY) ?? 0 : v.clientY;
    }, y = (v) => {
      var P;
      if (!i || !Ge())
        return;
      const k = "touches" in v ? ((P = v.touches[0]) == null ? void 0 : P.clientY) ?? a : v.clientY;
      Math.abs(k - a) > 2 && Zn();
    }, h = () => {
      window.setTimeout(() => J1(), 0);
    };
    return o.addEventListener("mousedown", c), o.addEventListener("touchstart", c, {
      passive: !0
    }), o.addEventListener("dblclick", h), document.addEventListener("mousemove", y), document.addEventListener("touchmove", y, {
      passive: !0
    }), document.addEventListener("mouseup", s), document.addEventListener("touchend", s), () => {
      o.removeEventListener("mousedown", c), o.removeEventListener("touchstart", c), o.removeEventListener("dblclick", h), document.removeEventListener("mousemove", y), document.removeEventListener("touchmove", y), document.removeEventListener("mouseup", s), document.removeEventListener("touchend", s);
    };
  }, w1 = (o) => ({
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
  })[o] || 1, qt = (o, i = /* @__PURE__ */ new WeakSet()) => {
    if (o == null)
      return o;
    if (i.has(o))
      return "[Circular]";
    if (typeof o != "object")
      return o;
    if (i.add(o), Array.isArray(o))
      return o.map((s) => qt(s, i));
    const a = {};
    for (const s in o)
      if (!(s === "__proto__" || s === "constructor" || s === "prototype"))
        try {
          const c = o[s];
          if (typeof c == "function")
            continue;
          a[s] = qt(c, i);
        } catch (c) {
          a[s] = `[Error: ${c.message}]`;
        }
    return a;
  }, Qr = (o) => {
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
        extendData: qt(o.extendData || {}),
        styles: qt(o.styles || {}),
        visible: o.visible ?? !0,
        lock: o.lock ?? !1,
        mode: o.mode || ir.Normal
      };
    } catch (i) {
      return console.error("Error extracting overlay data:", i), null;
    }
  }, zt = (o) => {
    var i, a, s;
    try {
      const c = (i = n == null ? void 0 : n.getOverlayById) == null ? void 0 : i.call(n, o);
      if (!c)
        return;
      const y = Qr(c);
      if (y) {
        const h = ke.get(o), g = ((a = h == null ? void 0 : h.points) == null ? void 0 : a.length) || 0, v = ((s = y.points) == null ? void 0 : s.length) || 0;
        ke.set(o, y);
        const k = w1(y.type);
        if (v >= k) {
          const P = b.get(o);
          P && !P.complete && (P.complete = !0, P.checkInterval && (clearInterval(P.checkInterval), P.checkInterval = void 0));
        }
      }
    } catch (c) {
      console.error(`Error updating overlay tracking for ${o}:`, c);
    }
  }, J0 = (o, i) => {
    if (b.has(o))
      return;
    const a = {
      monitoring: !0,
      complete: !1,
      lastPointCount: 0
    };
    b.set(o, a), zt(o);
    const s = () => {
      zt(o);
    };
    document.addEventListener("mouseup", s), document.addEventListener("touchend", s), setTimeout(() => {
      var y;
      const c = b.get(o);
      if (c && !c.complete) {
        c.checkInterval && clearInterval(c.checkInterval), c.mouseUpHandler && (document.removeEventListener("mouseup", c.mouseUpHandler), document.removeEventListener("touchend", c.mouseUpHandler)), zt(o);
        const h = ke.get(o);
        if (h) {
          const g = w1(h.type), v = ((y = h.points) == null ? void 0 : y.length) || 0;
          v < g && console.warn(`âš ï¸ ${h.type} ${o} has only ${v} point(s), should have ${g}`);
        }
      }
    }, 3e4);
  };
  let Ut = {
    saveDrawings: (o, i) => {
      try {
        const a = `kline_drawings_${o}`, c = {
          drawings: i.map((y) => {
            var k;
            const h = {
              ...y
            };
            h.extendData && (h.extendData = qt(h.extendData)), h.styles && (h.styles = qt(h.styles));
            const g = w1(y.type), v = ((k = y.points) == null ? void 0 : k.length) || 0;
            return v < g && console.warn(`âš ï¸ Saving ${y.type} with only ${v} point(s), needs ${g}`), h;
          }),
          timestamp: Date.now()
        };
        localStorage.setItem(a, JSON.stringify(c));
      } catch (a) {
        console.error("Library: Error saving drawings:", a);
      }
    },
    loadDrawings: (o) => {
      try {
        const i = `kline_drawings_${o}`, a = localStorage.getItem(i);
        if (a) {
          const s = JSON.parse(a), c = [];
          return Array.isArray(s.drawings) && s.drawings.forEach((y) => {
            var v;
            const h = w1(y.type);
            (((v = y.points) == null ? void 0 : v.length) || 0) >= h && c.push(y);
          }), c;
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
  const A1 = () => {
    const o = R();
    if (o != null && o.ticker) {
      const i = Array.from(ke.values());
      Ut.saveDrawings(o.ticker, i);
    }
  }, Zr = (o) => {
    const i = b.get(o);
    i && (i.checkInterval && clearInterval(i.checkInterval), i.mouseUpHandler && (document.removeEventListener("mouseup", i.mouseUpHandler), document.removeEventListener("touchend", i.mouseUpHandler)), b.delete(o));
  }, ea = () => {
    ke.forEach((o, i) => {
      var a;
      (a = n == null ? void 0 : n.removeOverlay) == null || a.call(n, {
        id: i
      }), Zr(i);
    }), ke.clear(), b.clear(), He(null), We(null), A1(), xe(!0);
  }, ta = (o) => typeof o.name == "string" && fp.has(o.name), Hn = (o, i = !1) => {
    var v, k, P;
    if (!n)
      return null;
    const a = (v = n.getDom) == null ? void 0 : v.call(n, Rt, tt.Main), s = (k = a == null ? void 0 : a.getBoundingClientRect) == null ? void 0 : k.call(a);
    if (!a || !s || i && !a.contains(o.target))
      return null;
    const c = o.clientX - s.left, y = o.clientY - s.top;
    if (c < 0 || y < 0 || c > s.width || y > s.height)
      return null;
    const h = (P = n.convertFromPixel) == null ? void 0 : P.call(n, [{
      x: c,
      y
    }], {
      paneId: Rt
    }), g = Array.isArray(h) ? h[0] : h;
    return !g || !Number.isFinite(Number(g.dataIndex)) || !Number.isFinite(Number(g.value)) ? null : {
      dataIndex: Number(g.dataIndex),
      timestamp: Number(g.timestamp),
      value: Number(g.value)
    };
  }, na = (o) => {
    var i, a;
    (i = n == null ? void 0 : n.setScrollEnabled) == null || i.call(n, o), (a = n == null ? void 0 : n.setZoomEnabled) == null || a.call(n, o);
  }, ra = (o) => {
    var a, s, c;
    if (o.button !== 0 || !u || f || !n || !t)
      return;
    const i = Hn(o, !0);
    i && (f = {
      overlay: u,
      startPoint: i,
      startClientX: o.clientX,
      startClientY: o.clientY,
      overlayId: null,
      pointerId: o.pointerId,
      previousScrollEnabled: (a = n.isScrollEnabled) == null ? void 0 : a.call(n),
      previousZoomEnabled: (s = n.isZoomEnabled) == null ? void 0 : s.call(n)
    }, (c = t.setPointerCapture) == null || c.call(t, o.pointerId));
  }, oa = (o) => {
    var c, y;
    const i = f;
    if (!i || i.pointerId !== o.pointerId || !n)
      return;
    const a = Hn(o);
    if (!a)
      return;
    const s = Math.hypot(o.clientX - i.startClientX, o.clientY - i.startClientY);
    if (!(!i.overlayId && s < hp)) {
      if (o.preventDefault(), o.stopPropagation(), !i.overlayId) {
        na(!1);
        const h = (c = n.createOverlay) == null ? void 0 : c.call(n, Xt({
          ...i.overlay,
          points: [i.startPoint, a]
        }));
        i.overlayId = typeof h == "string" ? h : null;
        return;
      }
      (y = n.overrideOverlay) == null || y.call(n, {
        id: i.overlayId,
        points: [i.startPoint, a]
      }), zt(i.overlayId);
    }
  }, Wn = (o, i = !1) => {
    var s, c, y, h, g;
    const a = f;
    if (!(!a || a.pointerId !== o.pointerId)) {
      if ((s = t == null ? void 0 : t.releasePointerCapture) == null || s.call(t, o.pointerId), a.overlayId && i)
        (c = n == null ? void 0 : n.removeOverlay) == null || c.call(n, {
          id: a.overlayId
        }), Zr(a.overlayId), ke.delete(a.overlayId);
      else if (a.overlayId) {
        const v = Hn(o);
        v && ((y = n == null ? void 0 : n.overrideOverlay) == null || y.call(n, {
          id: a.overlayId,
          points: [a.startPoint, v]
        })), zt(a.overlayId), A1(), xe(!0), u = null;
      }
      a.previousScrollEnabled !== void 0 && ((h = n == null ? void 0 : n.setScrollEnabled) == null || h.call(n, a.previousScrollEnabled)), a.previousZoomEnabled !== void 0 && ((g = n == null ? void 0 : n.setZoomEnabled) == null || g.call(n, a.previousZoomEnabled)), f = null;
    }
  }, ia = (o) => {
    if (!o || !n)
      return;
    ke.forEach((a, s) => {
      var c;
      (c = n == null ? void 0 : n.removeOverlay) == null || c.call(n, {
        id: s
      });
    }), ke.clear(), b.clear(), He(null), We(null), Ut.loadDrawings(o).forEach((a) => {
      var s;
      try {
        const c = Xt({
          name: a.type,
          points: a.points || [],
          extendData: a.extendData,
          styles: a.styles,
          visible: a.visible ?? !0,
          lock: a.lock ?? !1,
          mode: a.mode || ir.Normal
        }), y = n == null ? void 0 : n.createOverlay(c), h = typeof y == "string" ? y : null;
        h && (ke.set(h, {
          ...a,
          id: h
        }), b.set(h, {
          monitoring: !1,
          complete: !0,
          lastPointCount: ((s = a.points) == null ? void 0 : s.length) || 0
        }));
      } catch (c) {
        console.error("Library: Error restoring drawing:", c);
      }
    });
  }, Yn = (o) => {
    var a, s;
    const i = {
      ...Ee(),
      ...o
    };
    if ("quickOrder" in o) {
      const c = o.quickOrder ?? !1;
      i.quickOrderFloatingWindow = c, i.quickOrderPlusButton = c;
    } else if ("priceLine" in o) {
      const c = o.priceLine ?? !1;
      i.marketPriceLine = c, i.countDown = c, i.bidAskPrice = c;
    } else
      "quickOrderFloatingWindow" in o || "quickOrderPlusButton" in o ? i.quickOrder = i.quickOrderFloatingWindow || i.quickOrderPlusButton : ("marketPriceLine" in o || "countDown" in o || "bidAskPrice" in o) && (i.priceLine = i.marketPriceLine || i.countDown || i.bidAskPrice);
    Vn(i), o.orderPreviewLine === !1 && qn(), (s = (a = e.orderTools) == null ? void 0 : a.onChange) == null || s.call(a, i);
  }, Hr = (o) => {
    var s, c, y, h, g, v;
    if (!Wy(Ee().confirmAfterDrag))
      return;
    const i = Number((c = (s = o == null ? void 0 : o.points) == null ? void 0 : s[0]) == null ? void 0 : c.value);
    if (!Number.isFinite(i) || i <= 0)
      return;
    const a = ((y = o == null ? void 0 : o.extendData) == null ? void 0 : y.side) === "sell" || ((h = o == null ? void 0 : o.extendData) == null ? void 0 : h.side) === "buy" ? o.extendData.side : Kn();
    (v = (g = e.orderTools) == null ? void 0 : g.onOrderPreviewLineChange) == null || v.call(g, {
      price: i,
      side: a,
      symbol: R()
    });
  }, qn = () => {
    var i;
    const o = C1();
    o && ((i = n == null ? void 0 : n.removeOverlay) == null || i.call(n, {
      id: o
    }), ke.delete(o), b.delete(o), v1(null));
  }, aa = (o) => {
    var g, v;
    const i = Number(o.price);
    if (!n || !Number.isFinite(i) || i <= 0 || !Ee().orderPreviewLine) {
      qn();
      return;
    }
    const a = o.side === "sell" ? "sell" : "buy";
    V1(a);
    const s = {
      side: a,
      label: o.label ?? "New Limit",
      showDragHint: !1,
      isOrderPreviewLine: !0
    }, c = C1();
    if (c) {
      (g = n.overrideOverlay) == null || g.call(n, {
        id: c,
        points: [{
          value: i
        }],
        extendData: s
      });
      return;
    }
    const y = (v = n.createOverlay) == null ? void 0 : v.call(n, {
      name: "orderLine",
      points: [{
        value: i
      }],
      extendData: s,
      lock: !1,
      onPressedMoving: (k) => (Hr(k.overlay), !1),
      onPressedMoveEnd: (k) => (Hr(k.overlay), !1)
    }), h = typeof y == "string" ? y : null;
    h && (ke.delete(h), b.delete(h), v1(h));
  }, en = (o) => {
    var a;
    const i = Math.min(Math.max(((a = R()) == null ? void 0 : a.pricePrecision) ?? 2, 0), 8);
    return o.toLocaleString(void 0, {
      minimumFractionDigits: i,
      maximumFractionDigits: i
    });
  }, sa = () => {
    J1();
  }, at = (o = Date.now()) => {
    var lt, ct, ut, P1, D1, oi;
    if (!n || !t || !Ee().countDown) {
      Ht(null);
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
    const i = ((lt = n.getDataList) == null ? void 0 : lt.call(n)) ?? [], a = i[i.length - 1], s = Number(a == null ? void 0 : a.close);
    if (!a || !Number.isFinite(s) || s <= 0) {
      Ht(null);
      return;
    }
    const c = (ct = n.convertToPixel) == null ? void 0 : ct.call(n, [{
      value: s
    }], {
      paneId: "candle_pane",
      absolute: !0
    }), y = Number((ut = c == null ? void 0 : c[0]) == null ? void 0 : ut.y), h = (P1 = n.getSize) == null ? void 0 : P1.call(n, "candle_pane"), g = (h == null ? void 0 : h.height) ?? t.clientHeight;
    if (!Number.isFinite(y) || y < 0 || y > g) {
      Ht(null);
      return;
    }
    const v = Math.min(Math.max(((D1 = R()) == null ? void 0 : D1.pricePrecision) ?? 2, 0), 8), k = s.toLocaleString(void 0, {
      minimumFractionDigits: v,
      maximumFractionDigits: v
    }), P = (oi = n.getSize) == null ? void 0 : oi.call(n, "candle_pane", tt.YAxis), te = P != null && P.width && Number.isFinite(P.width) ? Math.max(74, Math.floor(P.width) - 2) : 96, se = pn(E()), ue = o % se, ge = ue === 0 ? se : se - ue, J = Number(a.close), Ae = Number(a.open), Te = n.getStyles().candle.priceMark.last, Oe = Te.text, re = Number(Oe.size) || 12, Se = Number(Oe.paddingTop) || 2, ve = Number(Oe.paddingBottom) || 2, Ie = Math.min(Number(Oe.paddingLeft) || 4, 3), Be = Math.min(Number(Oe.paddingRight) || 4, 3), st = Math.max(34, re * 2 + Se + ve + 6), ft = Math.max(0, Math.min(y - st / 2, g - st));
    Ht({
      top: ft,
      width: Math.min(te, Math.max(62, k.length * (re * 0.56) + Ie + Be + 4)),
      priceText: k,
      text: Cp(ge),
      color: Number.isFinite(J) && Number.isFinite(Ae) && J < Ae ? Te.downColor : Te.upColor,
      textSize: re,
      textFamily: Oe.family,
      textWeight: Oe.weight,
      paddingLeft: Ie,
      paddingRight: Be,
      paddingTop: Se,
      paddingBottom: ve,
      borderRadius: Number(Oe.borderRadius) || 2
    });
  }, la = (o) => {
    var a, s;
    const i = Number(o == null ? void 0 : o.y);
    if (!Number.isFinite(i))
      return NaN;
    try {
      const c = n == null ? void 0 : n.convertFromPixel([{
        x: (o == null ? void 0 : o.x) ?? 0,
        y: i
      }], {
        paneId: "candle_pane"
      }), y = Number((a = c == null ? void 0 : c[0]) == null ? void 0 : a.value);
      if (Number.isFinite(y) && y > 0)
        return y;
    } catch {
    }
    try {
      const c = n == null ? void 0 : n.convertFromPixel([{
        x: (o == null ? void 0 : o.x) ?? 0,
        y: i
      }], {
        paneId: "candle_pane",
        absolute: !0
      }), y = Number((s = c == null ? void 0 : c[0]) == null ? void 0 : s.value);
      if (Number.isFinite(y) && y > 0)
        return y;
    } catch {
    }
    return NaN;
  }, Wr = (o) => {
    var y;
    if (!Ee().quickOrderPlusButton || (o == null ? void 0 : o.paneId) !== "candle_pane" || !t) {
      if (g1() || It())
        return;
      Ot(null), ot(!1);
      return;
    }
    const i = (y = n == null ? void 0 : n.getSize) == null ? void 0 : y.call(n, "candle_pane", tt.YAxis);
    i != null && i.width && Number.isFinite(i.width) && p1(Math.max(44, Math.ceil(i.width)));
    const a = Number(o.y), s = la(o), c = t.clientHeight;
    if (!Number.isFinite(a) || !Number.isFinite(s) || s <= 0 || a < 0 || a > c) {
      if (g1() || It())
        return;
      Ot(null), ot(!1);
      return;
    }
    Wt = {
      ...o
    }, Ot({
      y: a,
      price: s
    });
  }, Gt = () => {
    var o;
    if (Wt)
      try {
        (o = n == null ? void 0 : n.executeAction) == null || o.call(n, bt.OnCrosshairChange, Wt);
      } catch {
      }
  }, Gn = (o) => {
    var a, s;
    const i = Et() ?? wt();
    i && ((s = (a = e.orderTools) == null ? void 0 : a.onQuickOrderAction) == null || s.call(a, {
      action: o,
      price: i.price,
      symbol: R()
    }), ot(!1), At(null), Je(!1));
  }, ca = async () => {
    var i;
    const o = Et() ?? wt();
    if (o) {
      try {
        await ((i = navigator.clipboard) == null ? void 0 : i.writeText(String(o.price)));
      } catch {
      }
      ot(!1), At(null), Je(!1);
    }
  }, ua = () => {
    const o = Et() ?? wt();
    o && (n == null || n.createOverlay(Xt({
      name: "horizontalStraightLine",
      points: [{
        value: o.price
      }],
      lock: !1
    })), ot(!1), At(null), Je(!1));
  }, da = (o) => {
    var g, v, k, P, te, se;
    const i = (v = (g = t == null ? void 0 : t.parentElement) == null ? void 0 : g.getBoundingClientRect) == null ? void 0 : v.call(g), a = (k = t == null ? void 0 : t.getBoundingClientRect) == null ? void 0 : k.call(t), s = o == null ? void 0 : o.overlay, c = (P = s == null ? void 0 : s.points) == null ? void 0 : P[0];
    let y = 72, h = 40;
    if (i) {
      if (Number.isFinite(o == null ? void 0 : o.pageX) ? y = o.pageX - i.left : Number.isFinite(o == null ? void 0 : o.x) && a && (y = a.left - i.left + o.x), Number.isFinite(o == null ? void 0 : o.pageY))
        h = o.pageY - i.top;
      else if (Number.isFinite(o == null ? void 0 : o.y) && a)
        h = a.top - i.top + o.y;
      else if (Number.isFinite(c == null ? void 0 : c.value))
        try {
          const ue = (te = n == null ? void 0 : n.convertToPixel) == null ? void 0 : te.call(n, [{
            value: c.value
          }], {
            paneId: "candle_pane",
            absolute: !0
          }), ge = Number((se = ue == null ? void 0 : ue[0]) == null ? void 0 : se.y);
          Number.isFinite(ge) && (h = ge - i.top);
        } catch {
        }
    }
    return {
      x: Math.max(12, Math.min(y - 28, ((i == null ? void 0 : i.width) ?? 360) - 320)),
      y: Math.max(8, h - 52)
    };
  }, Xn = (o) => {
    var g, v, k, P, te, se, ue, ge;
    const i = o == null ? void 0 : o.overlay;
    if (!(i != null && i.id) || i.name !== "horizontalStraightLine")
      return !1;
    const a = da(o), s = Number((v = (g = i.styles) == null ? void 0 : g.line) == null ? void 0 : v.size) || 2, c = ((P = (k = i.styles) == null ? void 0 : k.line) == null ? void 0 : P.style) ?? Ve.Solid, y = Array.isArray((se = (te = i.styles) == null ? void 0 : te.line) == null ? void 0 : se.dashedValue) ? i.styles.line.dashedValue : [], h = ((ge = (ue = i.styles) == null ? void 0 : ue.line) == null ? void 0 : ge.color) ?? "#2f6df6";
    return He({
      id: i.id,
      x: a.x,
      y: a.y,
      lineSize: s,
      lineStyle: c,
      dashedValue: y,
      color: h,
      locked: i.lock ?? !1,
      visible: i.visible ?? !0
    }), !1;
  }, Yr = (o) => {
    var a, s;
    const i = (a = o == null ? void 0 : o.overlay) == null ? void 0 : a.id;
    return (!i || ((s = Qe()) == null ? void 0 : s.id) === i) && (He(null), We(null)), !1;
  }, Xt = (o) => {
    var h, g, v, k, P, te, se, ue, ge;
    if (o.name !== "horizontalStraightLine")
      return o;
    const i = o.onClick, a = o.onSelected, s = o.onDeselected, c = o.onRemoved, y = o.onPressedMoveEnd;
    return {
      ...o,
      styles: {
        ...o.styles,
        line: {
          ...(h = o.styles) == null ? void 0 : h.line,
          size: Number((v = (g = o.styles) == null ? void 0 : g.line) == null ? void 0 : v.size) || 2,
          style: ((P = (k = o.styles) == null ? void 0 : k.line) == null ? void 0 : P.style) ?? Ve.Solid,
          dashedValue: ((se = (te = o.styles) == null ? void 0 : te.line) == null ? void 0 : se.dashedValue) ?? [6, 4],
          color: ((ge = (ue = o.styles) == null ? void 0 : ue.line) == null ? void 0 : ge.color) ?? "#2f6df6"
        }
      },
      onClick: (J) => (Xn(J), (i == null ? void 0 : i(J)) ?? !1),
      onSelected: (J) => (Xn(J), (a == null ? void 0 : a(J)) ?? !1),
      onPressedMoveEnd: (J) => (Xn(J), (y == null ? void 0 : y(J)) ?? !1),
      onDeselected: (J) => (Yr(J), (s == null ? void 0 : s(J)) ?? !1),
      onRemoved: (J) => (Yr(J), (c == null ? void 0 : c(J)) ?? !1)
    };
  }, ha = () => {
    var i;
    const o = Qe();
    o && ((i = n == null ? void 0 : n.removeOverlay) == null || i.call(n, {
      id: o.id
    }), He(null), We(null));
  }, Jt = (o) => {
    var a;
    const i = Qe();
    i && ((a = n == null ? void 0 : n.overrideOverlay) == null || a.call(n, {
      id: i.id,
      ...o
    }), setTimeout(() => {
      zt(i.id), A1();
    }, 0));
  }, fa = () => {
    const o = Qe();
    if (!o)
      return;
    const i = !o.locked;
    Jt({
      lock: i
    }), He({
      ...o,
      locked: i
    });
  }, ma = () => {
    const o = Qe();
    if (!o)
      return;
    const i = !o.visible;
    Jt({
      visible: i
    }), He({
      ...o,
      visible: i
    });
  }, ga = (o) => {
    const i = Qe();
    i && (Jt({
      styles: {
        line: {
          size: o
        }
      }
    }), He({
      ...i,
      lineSize: o
    }), We(null));
  }, Jn = (o, i) => {
    const a = Qe();
    a && (Jt({
      styles: {
        line: {
          style: o,
          dashedValue: i
        }
      }
    }), He({
      ...a,
      lineStyle: o,
      dashedValue: i
    }), We(null));
  }, ya = () => {
    const o = Qe();
    if (!o)
      return;
    const i = 1, a = Ve.Solid, s = [6, 4], c = "#2f6df6";
    Jt({
      styles: {
        line: {
          size: i,
          style: a,
          dashedValue: s,
          color: c
        }
      }
    }), He({
      ...o,
      lineSize: i,
      lineStyle: a,
      dashedValue: s,
      color: c
    }), We(null);
  }, pa = (o) => {
    const i = Qe();
    i && (Jt({
      styles: {
        line: {
          color: o
        }
      }
    }), He({
      ...i,
      color: o
    }));
  }, Ca = (o) => {
    var k, P;
    const i = Qe();
    if (!i || !t)
      return;
    o.preventDefault(), o.stopPropagation(), We(null);
    const a = (P = (k = t.parentElement) == null ? void 0 : k.getBoundingClientRect) == null ? void 0 : P.call(k);
    if (!a)
      return;
    const s = o.clientX, c = o.clientY, y = i.x, h = i.y, g = (te) => {
      te.preventDefault();
      const se = y + te.clientX - s, ue = h + te.clientY - c;
      He({
        ...i,
        x: Math.max(8, Math.min(se, a.width - 320)),
        y: Math.max(8, Math.min(ue, a.height - 48))
      });
    }, v = () => {
      document.removeEventListener("mousemove", g), document.removeEventListener("mouseup", v);
    };
    document.addEventListener("mousemove", g), document.addEventListener("mouseup", v);
  }, va = () => {
    ot(!1), At(null), Je(!1);
  }, qr = (o) => {
    var a, s;
    if (!It())
      return;
    const i = o.target;
    (a = i == null ? void 0 : i.closest) != null && a.call(i, ".klinecharts-pro-quick-order-marker") || (s = i == null ? void 0 : i.closest) != null && s.call(i, ".klinecharts-pro-quick-order-menu-anchor") || va();
  };
  let Gr = (Ko = e.orderTools) == null ? void 0 : Ko.quickOrder, Xr = (jo = e.orderTools) == null ? void 0 : jo.quickOrderFloatingWindow, Jr = (Qo = e.orderTools) == null ? void 0 : Qo.quickOrderPlusButton, eo = (Zo = e.orderTools) == null ? void 0 : Zo.openOrders, to = (Ho = e.orderTools) == null ? void 0 : Ho.openOrdersExtendedPriceLine, no = (Wo = e.orderTools) == null ? void 0 : Wo.openOrdersDisplay, ro = (Yo = e.orderTools) == null ? void 0 : Yo.confirmAfterDrag, oo = (qo = e.orderTools) == null ? void 0 : qo.positions, io = (Go = e.orderTools) == null ? void 0 : Go.breakevenPrice, ao = (Xo = e.orderTools) == null ? void 0 : Xo.liquidationPrice, so = (Jo = e.orderTools) == null ? void 0 : Jo.priceLine, lo = (ei = e.orderTools) == null ? void 0 : ei.marketPriceLine, co = (ti = e.orderTools) == null ? void 0 : ti.countDown, uo = (ni = e.orderTools) == null ? void 0 : ni.bidAskPrice, ho = (ri = e.orderTools) == null ? void 0 : ri.orderHistory;
  Ke(() => {
    var Ae, Te, Oe, re, Se, ve, Ie, Be, st, ft, lt, ct, ut, P1, D1;
    const o = (Ae = e.orderTools) == null ? void 0 : Ae.quickOrder, i = (Te = e.orderTools) == null ? void 0 : Te.quickOrderFloatingWindow, a = (Oe = e.orderTools) == null ? void 0 : Oe.quickOrderPlusButton, s = (re = e.orderTools) == null ? void 0 : re.openOrders, c = (Se = e.orderTools) == null ? void 0 : Se.openOrdersExtendedPriceLine, y = (ve = e.orderTools) == null ? void 0 : ve.openOrdersDisplay, h = (Ie = e.orderTools) == null ? void 0 : Ie.confirmAfterDrag, g = (Be = e.orderTools) == null ? void 0 : Be.positions, v = (st = e.orderTools) == null ? void 0 : st.breakevenPrice, k = (ft = e.orderTools) == null ? void 0 : ft.liquidationPrice, P = (lt = e.orderTools) == null ? void 0 : lt.priceLine, te = (ct = e.orderTools) == null ? void 0 : ct.marketPriceLine, se = (ut = e.orderTools) == null ? void 0 : ut.countDown, ue = (P1 = e.orderTools) == null ? void 0 : P1.bidAskPrice, ge = (D1 = e.orderTools) == null ? void 0 : D1.orderHistory, J = {};
    typeof o == "boolean" && o !== Gr && (Gr = o, J.quickOrder = o, typeof i != "boolean" && (J.quickOrderFloatingWindow = o), typeof a != "boolean" && (J.quickOrderPlusButton = o)), typeof i == "boolean" && i !== Xr && (Xr = i, J.quickOrderFloatingWindow = i), typeof a == "boolean" && a !== Jr && (Jr = a, J.quickOrderPlusButton = a), typeof s == "boolean" && s !== eo && (eo = s, J.openOrders = s), typeof c == "boolean" && c !== to && (to = c, J.openOrdersExtendedPriceLine = c), y !== void 0 && y !== no && (no = y, J.openOrdersDisplay = y), typeof h == "boolean" && h !== ro && (ro = h, J.confirmAfterDrag = h), typeof g == "boolean" && g !== oo && (oo = g, J.positions = g), typeof v == "boolean" && v !== io && (io = v, J.breakevenPrice = v), typeof k == "boolean" && k !== ao && (ao = k, J.liquidationPrice = k), typeof P == "boolean" && P !== so && (so = P, J.priceLine = P, typeof te != "boolean" && (J.marketPriceLine = P), typeof se != "boolean" && (J.countDown = P), typeof ue != "boolean" && (J.bidAskPrice = P)), typeof te == "boolean" && te !== lo && (lo = te, J.marketPriceLine = te), typeof se == "boolean" && se !== co && (co = se, J.countDown = se), typeof ue == "boolean" && ue !== uo && (uo = ue, J.bidAskPrice = ue), typeof ge == "boolean" && ge !== ho && (ho = ge, J.orderHistory = ge), Object.keys(J).length > 0 && Yn(J);
  }), Ke(() => {
    Ee().marketPriceLine, Ee().countDown, E(), R(), n == null || n.setStyles({
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
    }), xe(!0), at();
  }), e.ref({
    setTheme: x,
    getTheme: () => L(),
    setStyles: K,
    getStyles: () => n.getStyles(),
    setLocale: ye,
    getLocale: () => W(),
    setTimezone: (o) => {
      we({
        key: o,
        text: Lr(o, W())
      });
    },
    getTimezone: () => $e().key,
    setSymbol: T,
    getSymbol: () => R(),
    setPeriod: ne,
    getPeriod: () => E(),
    getMainIndicators: () => ce(),
    getSubIndicators: () => Z(),
    setMainIndicators: G,
    setSubIndicators: X,
    overrideIndicator: (o, i) => {
      n == null || n.overrideIndicator(o, i), xe(!0);
    },
    createOverlay: (o) => {
      var a;
      const i = (a = n == null ? void 0 : n.createOverlay) == null ? void 0 : a.call(n, Xt(o));
      return typeof i == "string" ? (xe(!0), i) : null;
    },
    removeOverlay: (o) => {
      var i;
      if ((i = n == null ? void 0 : n.removeOverlay) == null || i.call(n, o), o.id) {
        ke.delete(o.id);
        const a = b.get(o.id);
        a && (a.checkInterval && clearInterval(a.checkInterval), a.mouseUpHandler && (document.removeEventListener("mouseup", a.mouseUpHandler), document.removeEventListener("touchend", a.mouseUpHandler)), b.delete(o.id)), A1();
      }
      xe(!0);
    },
    removeAllOverlay: () => {
      ke.forEach((o, i) => {
        var s;
        (s = n == null ? void 0 : n.removeOverlay) == null || s.call(n, {
          id: i
        });
        const a = b.get(i);
        a && (a.checkInterval && clearInterval(a.checkInterval), a.mouseUpHandler && (document.removeEventListener("mouseup", a.mouseUpHandler), document.removeEventListener("touchend", a.mouseUpHandler)));
      }), ke.clear(), b.clear(), xe(!0);
    },
    getAllOverlay: () => Array.from(ke.values()),
    getOverlay: (o) => ke.get(o) || null,
    overrideOverlay: (o) => {
      n && "overrideOverlay" in n && typeof n.overrideOverlay == "function" ? (n.overrideOverlay(o), xe(!0)) : console.warn("overrideOverlay method not available on widget");
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
    setIndicatorModalVisible: j,
    setTimezoneModalVisible: he,
    setSettingModalVisible: De,
    setTimeToolsModalVisible: (o) => {
      o && Ce(Date.now()), be(o);
    },
    getOrderToolsState: () => Ee(),
    setOrderToolsState: (o) => {
      Yn(o);
    },
    getConfiguration: it,
    downloadConfiguration: Ft,
    setOrderPreviewLine: aa,
    clearOrderPreviewLine: qn,
    dispose: () => {
      t && ii(t);
    },
    resize: () => {
      n && "resize" in n && typeof n.resize == "function" ? n.resize() : console.warn("resize method not available on widget");
    },
    getSettings: Ue,
    setSettings: (o) => {
      var a, s, c, y, h, g, v, k, P, te, se, ue, ge, J;
      if (!n)
        return;
      const i = {};
      if (o.candleType !== void 0 && (i.candle = {
        ...i.candle,
        type: o.candleType
      }), o.candleBarStyle !== void 0) {
        const Ae = ((a = i.candle) == null ? void 0 : a.bar) || {};
        i.candle = {
          ...i.candle,
          bar: {
            ...Ae,
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
            ...(y = (c = i.candle) == null ? void 0 : c.priceMark) == null ? void 0 : y.last,
            show: o.showLastPrice,
            text: {
              ...(v = (g = (h = i.candle) == null ? void 0 : h.priceMark) == null ? void 0 : g.last) == null ? void 0 : v.text,
              show: o.showLastPrice && !Ee().countDown
            }
          }
        }
      }), o.showHighestPrice !== void 0 && (i.candle = {
        ...i.candle,
        priceMark: {
          ...(k = i.candle) == null ? void 0 : k.priceMark,
          high: {
            ...(te = (P = i.candle) == null ? void 0 : P.priceMark) == null ? void 0 : te.high,
            show: o.showHighestPrice
          }
        }
      }), o.showLowestPrice !== void 0 && (i.candle = {
        ...i.candle,
        priceMark: {
          ...(se = i.candle) == null ? void 0 : se.priceMark,
          low: {
            ...(ge = (ue = i.candle) == null ? void 0 : ue.priceMark) == null ? void 0 : ge.low,
            show: o.showLowestPrice
          }
        }
      }), o.showIndicatorLastValue !== void 0 && (i.indicator = {
        ...i.indicator,
        lastValueMark: {
          ...(J = i.indicator) == null ? void 0 : J.lastValueMark,
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
      }), Mt(i), n.setStyles(i);
    },
    resetSettings: () => {
      var a, s, c, y, h, g, v;
      if (!n)
        return;
      n.getStyles();
      const o = {
        candle: {
          type: Ka.CandleSolid,
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
          type: ja.Normal,
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
      }, i = _e();
      if (i) {
        const k = {
          candle: {
            type: (a = i.candle) == null ? void 0 : a.type,
            bar: (s = i.candle) == null ? void 0 : s.bar,
            priceMark: (c = i.candle) == null ? void 0 : c.priceMark
          },
          indicator: {
            lastValueMark: (y = i.indicator) == null ? void 0 : y.lastValueMark
          },
          yAxis: {
            type: (h = i.yAxis) == null ? void 0 : h.type,
            reverse: (g = i.yAxis) == null ? void 0 : g.reverse
          },
          grid: {
            show: (v = i.grid) == null ? void 0 : v.show
          }
        };
        Mt(k), n.setStyles(k);
      } else
        Mt(o), n.setStyles(o);
    },
    autoScalePriceAxis: () => {
      sa();
    },
    setAutoScaleEnabled: (o) => {
      o ? J1() : Zn();
    },
    getAutoScaleEnabled: () => Ge(),
    getCurrentPriceRange: () => Y1() ?? Vr(),
    getManualPriceRange: () => L1(),
    setAutoScalePriceLines: (o, i = []) => {
      const a = `${o || "default"}`, s = i.filter((c) => Number.isFinite(c) && c > 0);
      s.length > 0 ? x1.set(a, s) : x1.delete(a), xe(!0);
    },
    // === Drawing Methods ===
    saveDrawings: (o) => {
      const i = Array.from(ke.values());
      i.forEach((a, s) => {
        var h;
        const c = w1(a.type), y = ((h = a.points) == null ? void 0 : h.length) || 0;
        y < c && console.warn(`âš ï¸ ${a.type} ${a.id} has only ${y} point(s), should have ${c}`);
      }), Ut.saveDrawings(o, i);
    },
    loadDrawings: (o) => {
      Ut.loadDrawings(o).forEach((a, s) => {
        var c;
        try {
          const y = {
            name: a.type,
            points: a.points || [],
            extendData: a.extendData,
            styles: a.styles,
            visible: a.visible ?? !0,
            lock: a.lock ?? !1,
            mode: a.mode ?? ir.Normal
          }, h = n == null ? void 0 : n.createOverlay(y), g = typeof h == "string" ? h : null;
          g && (ke.set(g, {
            ...a,
            id: g
          }), b.set(g, {
            monitoring: !1,
            complete: !0,
            lastPointCount: ((c = a.points) == null ? void 0 : c.length) || 0
          }));
        } catch (y) {
          console.error(`   âŒ Error restoring ${a.type}:`, y);
        }
      });
    },
    getDrawings: (o) => Ut.loadDrawings(o),
    clearDrawings: (o) => {
      Ut.clearDrawings(o);
    },
    // Auto-save on overlay events
    enableAutoSave: (o, i = !0) => {
    }
  });
  const fo = () => {
    n == null || n.resize(), M1(), sn() || S1(), xe(!0), at(), Co(), St();
  };
  let tn, er = !1, nn, rn, T1 = !1, mo = 0;
  const ba = () => {
    if (T1 || Date.now() < mo)
      return;
    const o = pt();
    if (!o.enabled || o.anchorPoint === "date")
      return;
    const i = bo(o.anchorPoint, o.timestamp);
    if (Number.isFinite(i) && i !== o.timestamp) {
      const a = {
        ...o,
        timestamp: i
      };
      Ct(a), e0(a);
    }
  }, $a = () => {
    rn && window.clearTimeout(rn), rn = window.setTimeout(() => {
      rn = void 0, ba();
    }, 80);
  }, go = () => {
    xe(), at(), Co(), St(), $a();
  }, yo = [bt.OnVisibleRangeChange, bt.OnZoom, bt.OnScroll], _a = (o) => {
    const i = new Date(o), a = i.getFullYear(), s = `${i.getMonth() + 1}`.padStart(2, "0"), c = `${i.getDate()}`.padStart(2, "0"), y = `${i.getHours()}`.padStart(2, "0"), h = `${i.getMinutes()}`.padStart(2, "0");
    return `${a}/${s}/${c} ${y}:${h}`;
  }, ka = (o) => {
    var h;
    const i = ((h = n == null ? void 0 : n.getDataList) == null ? void 0 : h.call(n)) ?? [];
    if (i.length === 0)
      return null;
    let a = i[0], s = 0, c = Number(a == null ? void 0 : a.timestamp), y = Math.abs(c - o);
    for (let g = 1; g < i.length; g += 1) {
      const v = i[g], k = Number(v == null ? void 0 : v.timestamp);
      if (!Number.isFinite(k))
        continue;
      const P = Math.abs(k - o);
      P < y && (a = v, s = g, c = k, y = P);
    }
    return a && Number.isFinite(c) ? {
      candle: a,
      dataIndex: s
    } : null;
  }, xa = (o) => {
    var a;
    const i = ((a = n == null ? void 0 : n.getDataList) == null ? void 0 : a.call(n)) ?? [];
    if (i.length === 0 || !Number.isFinite(o))
      return null;
    for (let s = 0; s < i.length; s += 1) {
      const c = i[s];
      if (Number(c == null ? void 0 : c.timestamp) === o)
        return {
          candle: c,
          dataIndex: s
        };
    }
    return null;
  }, on = (o) => {
    var a;
    const i = ((a = n == null ? void 0 : n.getDataList) == null ? void 0 : a.call(n)) ?? [];
    return i.length === 0 || !Number.isFinite(o) || o < 0 ? -1 : Math.max(0, Math.min(i.length - 1, o + 1));
  }, po = (o) => {
    var se, ue, ge;
    if (!n || !t)
      return null;
    const i = ka(o), a = i == null ? void 0 : i.candle, s = Number((a == null ? void 0 : a.timestamp) ?? o), c = Number((a == null ? void 0 : a.high) ?? (a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.open)), y = i ? on(i.dataIndex) : void 0, h = i && Number.isFinite(c) ? {
      dataIndex: y,
      value: c
    } : {
      timestamp: s
    }, g = (se = n.convertToPixel) == null ? void 0 : se.call(n, [h], {
      paneId: "candle_pane",
      absolute: !0
    }), v = Number((ue = g == null ? void 0 : g[0]) == null ? void 0 : ue.x), k = Number((ge = g == null ? void 0 : g[0]) == null ? void 0 : ge.y), P = t.clientWidth, te = t.clientHeight;
    return !Number.isFinite(v) || v < -80 || v > P + 80 ? null : {
      timestamp: s,
      text: _a(s),
      left: Math.max(58, Math.min(v, P - 58)),
      top: Number.isFinite(k) ? Math.max(8, Math.min(k - 42, te - 38)) : 10
    };
  }, Co = () => {
    const o = b1();
    if (!o || !n || !t)
      return;
    const i = po(o.timestamp);
    i && j1(i);
  }, an = (o, i = 0) => {
    if (!n || !t)
      return;
    const a = po(o);
    if (a) {
      j1(a);
      return;
    }
    i < 6 && (nn = window.setTimeout(() => an(o, i + 1), 80));
  }, tr = (o, i, a) => {
    let s = i, c = s;
    switch (o.timespan) {
      case "minute": {
        s = s - s % (60 * 1e3), c = s - a * o.multiplier * 60 * 1e3;
        break;
      }
      case "hour": {
        s = s - s % (60 * 60 * 1e3), c = s - a * o.multiplier * 60 * 60 * 1e3;
        break;
      }
      case "day": {
        s = s - s % (60 * 60 * 1e3), c = s - a * o.multiplier * 24 * 60 * 60 * 1e3;
        break;
      }
      case "week": {
        const h = new Date(s).getDay(), g = h === 0 ? 6 : h - 1;
        s = s - g * 60 * 60 * 24;
        const v = new Date(s);
        s = (/* @__PURE__ */ new Date(`${v.getFullYear()}-${v.getMonth() + 1}-${v.getDate()}`)).getTime(), c = a * o.multiplier * 7 * 24 * 60 * 60 * 1e3;
        break;
      }
      case "month": {
        const y = new Date(s), h = y.getFullYear(), g = y.getMonth() + 1;
        s = (/* @__PURE__ */ new Date(`${h}-${g}-01`)).getTime(), c = a * o.multiplier * 30 * 24 * 60 * 60 * 1e3;
        const v = new Date(c);
        c = (/* @__PURE__ */ new Date(`${v.getFullYear()}-${v.getMonth() + 1}-01`)).getTime();
        break;
      }
      case "year": {
        const h = new Date(s).getFullYear();
        s = (/* @__PURE__ */ new Date(`${h}-01-01`)).getTime(), c = a * o.multiplier * 365 * 24 * 60 * 60 * 1e3;
        const g = new Date(c);
        c = (/* @__PURE__ */ new Date(`${g.getFullYear()}-01-01`)).getTime();
        break;
      }
    }
    return [c, s];
  }, La = (o, i = 500) => {
    const a = pn(E()), s = Math.max(1, Math.floor(i / 2)) * a;
    return {
      from: o - s,
      to: o + s
    };
  }, wa = (o, i, a = 600) => {
    const s = pn(i), c = Math.max(120, a);
    let y = 0.5;
    o.anchorPoint === "left" ? y = 0.12 : o.anchorPoint === "right" && (y = 0.88);
    const h = Math.max(20, Math.floor(c * y)), g = Math.max(20, c - h);
    return {
      from: o.timestamp - h * s,
      to: Math.min(Date.now(), o.timestamp + g * s)
    };
  }, Aa = (o) => {
    const i = new Date(o.from), a = new Date(o.to);
    return {
      from: new Date(i.getFullYear(), i.getMonth(), i.getDate(), 0, 0, 0, 0).getTime(),
      to: new Date(a.getFullYear(), a.getMonth(), a.getDate(), 23, 59, 59, 999).getTime()
    };
  }, Ta = (o, i) => {
    const a = Math.min(i.from, i.to), s = Math.max(i.from, i.to);
    return o.filter((c) => {
      const y = Number(c.timestamp);
      return y >= a && y <= s;
    });
  }, Sa = (o, i) => {
    var s;
    const a = Math.max(i.from, i.to);
    for (let c = o.length - 1; c >= 0; c -= 1) {
      const y = Number((s = o[c]) == null ? void 0 : s.timestamp);
      if (Number.isFinite(y) && y <= a)
        return y;
    }
    return a;
  }, Ma = (o, i) => {
    var s;
    const a = Math.max(i.from, i.to);
    for (let c = o.length - 1; c >= 0; c -= 1) {
      const y = Number((s = o[c]) == null ? void 0 : s.timestamp);
      if (Number.isFinite(y) && y <= a)
        return c;
    }
    return o.length - 1;
  }, Pa = (o, i) => {
    const a = pn(i), s = Math.abs(o.to - o.from), c = Math.max(1, Math.ceil(s / a) + 1), y = Math.max(c, 120) * a;
    return {
      from: o.from,
      to: Math.max(o.to, Math.min(Date.now(), o.to + y))
    };
  }, Da = (o) => {
    var y, h;
    if (!n || !t || o.length === 0)
      return;
    const i = ((y = n.getSize("candle_pane", tt.YAxis)) == null ? void 0 : y.width) ?? 0, a = ((h = n.getSize("candle_pane", tt.Main)) == null ? void 0 : h.width) ?? t.clientWidth - i, s = Math.max(1, a - 8), c = Math.max(2, s / Math.max(1, o.length));
    n.setOffsetRightDistance(0), n.setLeftMinVisibleBarCount(0), n.setRightMinVisibleBarCount(0), n.setBarSpace(c);
  }, nr = (o) => {
    var i;
    !n || !Number.isFinite(o) || ((i = n.scrollToTimestamp) == null || i.call(n, o, 250), requestAnimationFrame(() => an(o)), at());
  }, vo = (o, i = "floor") => {
    var y, h, g;
    const a = ((y = n == null ? void 0 : n.getDataList) == null ? void 0 : y.call(n)) ?? [];
    if (a.length === 0 || !Number.isFinite(o))
      return -1;
    if (i === "floor")
      for (let v = a.length - 1; v >= 0; v -= 1) {
        const k = Number((h = a[v]) == null ? void 0 : h.timestamp);
        if (Number.isFinite(k) && k <= o)
          return v;
      }
    let s = 0, c = 1 / 0;
    for (let v = 0; v < a.length; v += 1) {
      const k = Number((g = a[v]) == null ? void 0 : g.timestamp);
      if (!Number.isFinite(k))
        continue;
      const P = Math.abs(k - o);
      (P < c || P === c && k > o) && (c = P, s = v);
    }
    return c === 1 / 0 ? -1 : s;
  }, rr = (o) => {
    var v, k, P;
    if (!n || !t)
      return null;
    const i = (v = n.getDom) == null ? void 0 : v.call(n, "candle_pane", tt.Main), a = (k = i == null ? void 0 : i.getBoundingClientRect) == null ? void 0 : k.call(i), s = (P = r == null ? void 0 : r.getBoundingClientRect) == null ? void 0 : P.call(r), c = t.getBoundingClientRect(), y = a && Number.isFinite(a.left) ? a.left - ((s == null ? void 0 : s.left) ?? c.left) : c.left - ((s == null ? void 0 : s.left) ?? c.left), h = n.getSize("candle_pane", tt.Main), g = (a == null ? void 0 : a.width) ?? (h == null ? void 0 : h.width) ?? t.clientWidth;
    return o === "left" ? Math.max(8, y) : o === "center" ? y + g / 2 : o === "right" ? y + g : null;
  }, bo = (o, i) => {
    var k, P, te, se, ue, ge;
    const a = rr(o), s = ((k = n == null ? void 0 : n.getDataList) == null ? void 0 : k.call(n)) ?? [];
    if (!n || a === null || s.length === 0)
      return i;
    const c = (P = n.convertFromPixel) == null ? void 0 : P.call(n, [{
      x: a,
      y: 0
    }], {
      paneId: "candle_pane",
      absolute: !0
    }), y = Number((te = c == null ? void 0 : c[0]) == null ? void 0 : te.dataIndex), h = Math.max(0, Math.min(s.length - 1, Number.isFinite(y) ? Math.round(y) : -1)), g = xa(i);
    if (g) {
      const J = on(g.dataIndex), Ae = (se = n.convertToPixel) == null ? void 0 : se.call(n, [{
        dataIndex: J
      }], {
        paneId: "candle_pane",
        absolute: !0
      }), Te = Number((ue = Ae == null ? void 0 : Ae[0]) == null ? void 0 : ue.x), Oe = n.getBarSpace, re = typeof Oe == "function" ? Oe.call(n) : void 0, Se = Number(typeof re == "object" ? re == null ? void 0 : re.bar : re), ve = Number.isFinite(Se) ? Math.max(2, Se / 2) : 8;
      if (Number.isFinite(Te) && Math.abs(Te - a) <= ve)
        return i;
    }
    const v = Number((ge = s[h]) == null ? void 0 : ge.timestamp);
    return Number.isFinite(v) ? v : i;
  }, $o = (o) => {
    if (!n || !Number.isFinite(o.timestamp))
      return;
    if (T1 = !0, mo = Date.now() + 1e3, o.anchorPoint === "date") {
      nr(o.timestamp), window.setTimeout(() => {
        T1 = !1;
      }, 1e3);
      return;
    }
    const i = vo(o.timestamp, "nearest"), a = on(i), s = rr(o.anchorPoint);
    if (a < 0 || s === null) {
      nr(o.timestamp), window.setTimeout(() => {
        T1 = !1;
      }, 1e3);
      return;
    }
    n.scrollToDataIndex(a, 0), requestAnimationFrame(() => {
      var h, g;
      const c = (h = n == null ? void 0 : n.convertToPixel) == null ? void 0 : h.call(n, [{
        dataIndex: a
      }], {
        paneId: "candle_pane",
        absolute: !0
      }), y = Number((g = c == null ? void 0 : c[0]) == null ? void 0 : g.x);
      Number.isFinite(y) && (n == null || n.scrollByDistance(s - y, 0)), requestAnimationFrame(() => {
        St(o), an(o.timestamp), window.setTimeout(() => {
          T1 = !1;
        }, 1e3);
      });
    }), at();
  }, Na = (o) => {
    var h, g;
    if (!n || !t)
      return null;
    const i = rr(o.anchorPoint);
    if (i !== null)
      return i;
    const a = on(vo(o.timestamp, "nearest")), s = a >= 0 ? {
      dataIndex: a
    } : {
      timestamp: o.timestamp
    }, c = (h = n.convertToPixel) == null ? void 0 : h.call(n, [s], {
      paneId: "candle_pane",
      absolute: !0
    }), y = Number((g = c == null ? void 0 : c[0]) == null ? void 0 : g.x);
    return !Number.isFinite(y) || y < -2 || y > t.clientWidth + 2 ? null : y;
  }, St = (o) => {
    var P, te, se, ue;
    const i = o ?? pt();
    if (!n || !i.enabled || !i.anchorLine) {
      Bt(null);
      return;
    }
    const a = Na(i), s = (P = n.getDom) == null ? void 0 : P.call(n, "candle_pane", tt.Main), c = (te = s == null ? void 0 : s.getBoundingClientRect) == null ? void 0 : te.call(s), y = (se = r == null ? void 0 : r.getBoundingClientRect) == null ? void 0 : se.call(r), h = (ue = t == null ? void 0 : t.getBoundingClientRect) == null ? void 0 : ue.call(t), g = n.getSize("candle_pane", tt.Main), v = c && Number.isFinite(c.top) ? c.top - ((y == null ? void 0 : y.top) ?? (h == null ? void 0 : h.top) ?? 0) : 0, k = Math.max(1, (c == null ? void 0 : c.height) ?? (g == null ? void 0 : g.height) ?? 0);
    if (a === null) {
      Bt(null);
      return;
    }
    Bt({
      left: a,
      top: v,
      height: k
    });
  }, _o = async (o, i) => {
    if (n) {
      p(!0), Zt(!0);
      try {
        const a = E(), s = o.from <= o.to ? o : {
          from: o.to,
          to: o.from
        }, c = Aa(s), y = i ? c : Pa(c, a), h = await e.datafeed.getHistoryKLineData(R(), a, y.from, y.to), g = Ta(h, c);
        n.applyNewData(h, h.length > 0), xe(!0), rt(c), requestAnimationFrame(() => {
          const v = Ma(h, c);
          i ? nr(i) : (Da(g), n == null || n.scrollToDataIndex(v, 0), an(Sa(g, c))), St();
        });
      } finally {
        p(!1), Zt(!1);
      }
    }
  }, Oa = async (o) => {
    Ce(o), await _o(La(o), o);
  }, Ia = (o) => {
    const a = {
      ...o,
      timestamp: (() => !n || o.anchorPoint === "date" ? o.timestamp : bo(o.anchorPoint, o.timestamp))()
    };
    Ct(a), e0(a), a.enabled ? (Ce(a.timestamp), requestAnimationFrame(() => {
      $o(a), St(a);
    })) : requestAnimationFrame(() => St(a));
  };
  Sr(() => {
    if (window.addEventListener("resize", fo), n = Va(t, {
      customApi: {
        formatDate: (h, g, v, k) => {
          switch (E().timespan) {
            case "minute":
              return k === cn.XAxis ? B.formatDate(h, g, "HH:mm") : B.formatDate(h, g, "YYYY-MM-DD HH:mm");
            case "hour":
              return k === cn.XAxis ? B.formatDate(h, g, "MM-DD HH:mm") : B.formatDate(h, g, "YYYY-MM-DD HH:mm");
            case "day":
            case "week":
              return B.formatDate(h, g, "YYYY-MM-DD");
            case "month":
              return k === cn.XAxis ? B.formatDate(h, g, "YYYY-MM") : B.formatDate(h, g, "YYYY-MM-DD");
            case "year":
              return k === cn.XAxis ? B.formatDate(h, g, "YYYY") : B.formatDate(h, g, "YYYY-MM-DD");
          }
          return B.formatDate(h, g, "YYYY-MM-DD HH:mm");
        }
      }
    }), n) {
      const h = n.getDom("candle_pane", tt.Main);
      if (h) {
        let v = document.createElement("div");
        if (v.className = "klinecharts-pro-watermark", B.isString(e.watermark)) {
          const k = e.watermark.replace(/(^\s*)|(\s*$)/g, "");
          v.innerHTML = k;
        } else
          v.appendChild(e.watermark);
        h.appendChild(v);
      }
      const g = n.getDom("candle_pane", tt.YAxis);
      l = document.createElement("span"), l.className = "klinecharts-pro-price-unit", g == null || g.appendChild(l), Tt = X0(), xe(!0);
    }
    let o = !1;
    const i = () => {
      const h = R();
      if (h != null && h.ticker)
        try {
          const g = Array.from(ke.values());
          Ut.saveDrawings(h.ticker, g);
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
      const g = s.apply(this, h), v = h[0];
      let k;
      if (typeof v == "string" ? k = v : v && typeof v == "object" && v.id && (k = v.id), k) {
        ke.delete(k);
        const P = b.get(k);
        P && (P.checkInterval && clearInterval(P.checkInterval), P.mouseUpHandler && (document.removeEventListener("mouseup", P.mouseUpHandler), document.removeEventListener("touchend", P.mouseUpHandler)), b.delete(k)), i(), xe(!0);
      }
      return g;
    }), ce().forEach((h) => {
      yn(n, h, !0, {
        id: "candle_pane"
      });
    });
    const c = {};
    e.subIndicators.forEach((h) => {
      const g = yn(n, h, !0);
      g && (c[h] = g);
    }), X(c), n == null || n.loadMore((h) => {
      p(!0), (async () => {
        try {
          const v = E(), [k] = tr(v, h, 1), [P] = tr(v, k, 500), te = await e.datafeed.getHistoryKLineData(R(), v, P, k);
          n == null || n.applyMoreData(te, te.length > 0), xe(!0);
        } finally {
          p(!1);
        }
      })();
    }), n == null || n.subscribeAction(bt.OnTooltipIconClick, (h) => {
      if (h.indicatorName)
        switch (h.iconId) {
          case "visible": {
            n == null || n.overrideIndicator({
              name: h.indicatorName,
              visible: !0
            }, h.paneId), xe(!0);
            const g = h.paneId === "candle_pane" ? "main" : "sub";
            et(h.indicatorName, h.paneId, g, "change");
            break;
          }
          case "invisible": {
            n == null || n.overrideIndicator({
              name: h.indicatorName,
              visible: !1
            }, h.paneId), xe(!0);
            const g = h.paneId === "candle_pane" ? "main" : "sub";
            et(h.indicatorName, h.paneId, g, "change");
            break;
          }
          case "setting": {
            const g = n == null ? void 0 : n.getIndicatorByPaneId(h.paneId, h.indicatorName);
            k1({
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
              n == null || n.removeIndicator("candle_pane", h.indicatorName), xe(!0), g.splice(g.indexOf(h.indicatorName), 1), G(g), et(h.indicatorName, "candle_pane", "main", "remove");
            } else {
              const g = {
                ...Z()
              };
              n == null || n.removeIndicator(h.paneId, h.indicatorName), xe(!0), delete g[h.indicatorName], X(g), et(h.indicatorName, h.paneId, "sub", "remove");
            }
        }
    }), n == null || n.subscribeAction(bt.OnCrosshairChange, Wr), n == null || n.subscribeAction(bt.OnCrosshairChange, wo), yo.forEach((h) => {
      n == null || n.subscribeAction(h, go);
    }), tn = window.setInterval(() => at(), 1e3), at(), document.addEventListener("mousedown", qr);
    const y = n == null ? void 0 : n.createOverlay;
    n && y && (n.createOverlay = function(...h) {
      var P;
      const g = Xt(h[0]), v = y.apply(this, [g, ...h.slice(1)]), k = typeof v == "string" ? v : null;
      return k && !((P = g.extendData) != null && P.isOrderPreviewLine) && (J0(k, g.name || "unknown"), zt(k), A1(), xe(!0)), v;
    });
  }), kt(() => {
    var o, i, a;
    if (window.removeEventListener("resize", fo), n == null || n.unsubscribeAction(bt.OnCrosshairChange, Wr), n == null || n.unsubscribeAction(bt.OnCrosshairChange, wo), S1(), yo.forEach((s) => {
      n == null || n.unsubscribeAction(s, go);
    }), tn && (window.clearInterval(tn), tn = void 0), nn && (window.clearTimeout(nn), nn = void 0), ht && (window.clearTimeout(ht), ht = void 0), vt && (window.cancelAnimationFrame(vt), vt = void 0), Tt == null || Tt(), Tt = void 0, document.removeEventListener("mousedown", qr), f) {
      const s = f;
      s.overlayId && ((o = n == null ? void 0 : n.removeOverlay) == null || o.call(n, {
        id: s.overlayId
      })), s.previousScrollEnabled !== void 0 && ((i = n == null ? void 0 : n.setScrollEnabled) == null || i.call(n, s.previousScrollEnabled)), s.previousZoomEnabled !== void 0 && ((a = n == null ? void 0 : n.setZoomEnabled) == null || a.call(n, s.previousZoomEnabled)), f = null;
    }
    u = null, b.clear(), ke.clear(), ii(t);
  }), Ke(() => {
    const o = R();
    o != null && o.priceCurrency ? (l.innerHTML = o == null ? void 0 : o.priceCurrency.toLocaleUpperCase(), l.style.display = "flex") : l.style.display = "none", n == null || n.setPriceVolumePrecision((o == null ? void 0 : o.pricePrecision) ?? 2, (o == null ? void 0 : o.volumePrecision) ?? 0);
  });
  const Ea = (o) => {
    const i = new Date(o), a = i.getFullYear(), s = `${i.getMonth() + 1}`.padStart(2, "0"), c = `${i.getDate()}`.padStart(2, "0"), y = `${i.getHours()}`.padStart(2, "0"), h = `${i.getMinutes()}`.padStart(2, "0"), g = `${a}-${s}-${c}`;
    switch (E().timespan) {
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
  }, ko = (o, i) => {
    var v, k;
    const {
      current: a
    } = o, s = i.tooltip.text.color, c = a.close > a.open ? i.bar.upColor : a.close < a.open ? i.bar.downColor : i.bar.noChangeColor, y = Math.min(Math.max(((v = R()) == null ? void 0 : v.pricePrecision) ?? 2, 0), 8), h = Math.min(Math.max(((k = R()) == null ? void 0 : k.volumePrecision) ?? 0, 0), 8), g = (P) => ({
      text: B.formatPrecision(P, y),
      color: c
    });
    return [{
      title: "time",
      value: {
        text: Ea(a.timestamp),
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
        text: B.formatBigNumber(B.formatPrecision(a.volume ?? i.tooltip.defaultValue, h)),
        color: c
      }
    }];
  }, sn = () => typeof window < "u" && window.innerWidth < 768, xo = (o) => typeof o == "string" ? o : o.text, Lo = (o) => typeof o == "string" ? void 0 : o.color, Ba = (o) => o.map((i) => ({
    title: xo(i.title).replace(/:$/, "").replace(/^\w/, (a) => a.toUpperCase()),
    value: xo(i.value),
    titleColor: Lo(i.title),
    valueColor: Lo(i.value)
  })), S1 = () => {
    Q1(null);
  }, Fa = () => {
    !sn() || !$1() || (er = !0, S1());
  }, or = () => {
    er = !1;
  }, ln = (o, i) => {
    if (!t || typeof window > "u")
      return i;
    const a = window.getComputedStyle(t).getPropertyValue(o).trim(), s = Number.parseFloat(a);
    return Number.isFinite(s) ? s : i;
  }, wo = (o) => {
    if (er)
      return;
    if (!sn() || (o == null ? void 0 : o.paneId) !== Rt || !(o != null && o.kLineData) || !t || !n) {
      S1();
      return;
    }
    const i = Number(o.x), a = Number(o.y), s = t.clientWidth, c = t.clientHeight;
    if (!Number.isFinite(i) || !Number.isFinite(a) || s <= 0 || c <= 0) {
      S1();
      return;
    }
    const y = ln("--klinecharts-pro-mobile-candle-tooltip-width", 132), h = ln("--klinecharts-pro-mobile-candle-tooltip-height", 124), g = ln("--klinecharts-pro-mobile-candle-tooltip-offset-x", 10), v = ln("--klinecharts-pro-mobile-candle-tooltip-offset-y", 10), k = 8, P = Math.min(Math.max(i + g, k), Math.max(k, s - y - k)), te = Math.min(Math.max(a - h - v, k), Math.max(k, c - h - k)), se = n.getStyles().candle, ue = Ba(ko({
      current: o.kLineData
    }, se));
    Q1({
      left: P,
      top: te,
      rows: ue
    });
  }, M1 = () => {
    n == null || n.setStyles({
      candle: {
        tooltip: {
          showRule: sn() ? ai.None : ai.Always,
          custom: ko,
          rect: {
            offsetLeft: 0,
            paddingLeft: 0
          }
        }
      }
    });
  };
  return Ke((o) => {
    const i = R(), a = E();
    let s = !0;
    return kt(() => {
      s = !1;
    }), o && e.datafeed.unsubscribe(o.symbol, o.period), p(!0), Zt(!0), (async () => {
      try {
        const y = mt(pt), h = y.enabled && (!o || o.symbol.ticker === i.ticker || y.acrossTokens), g = h ? wa(y, a) : null, [v, k] = g ? [g.from, g.to] : tr(a, (/* @__PURE__ */ new Date()).getTime(), 500), P = await e.datafeed.getHistoryKLineData(i, a, v, k);
        if (!s)
          return;
        n == null || n.applyNewData(P, P.length > 0), xe(!0), h ? requestAnimationFrame(() => {
          $o(y), St(y);
        }) : St(), at(), setTimeout(() => {
          s && (ia(i == null ? void 0 : i.ticker), at());
        }, 0), e.datafeed.subscribe(i, a, (te) => {
          n == null || n.updateData(te), xe(), at();
        });
      } finally {
        s && (p(!1), Zt(!1));
      }
    })(), {
      symbol: i,
      period: a
    };
  }), Ke(() => {
    const o = L();
    n == null || n.setStyles(o);
    const i = o === "dark" ? "#929AA5" : "#76808F";
    M1(), n == null || n.setStyles({
      indicator: {
        tooltip: {
          icons: [{
            id: "visible",
            position: un.Middle,
            marginLeft: F().visibleMarginLeft,
            marginTop: F().marginTop,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: F().size,
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "invisible",
            position: un.Middle,
            marginLeft: F().secondaryMarginLeft,
            marginTop: F().marginTop,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: F().size,
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "setting",
            position: un.Middle,
            marginLeft: F().secondaryMarginLeft,
            marginTop: F().marginTop,
            marginBottom: 0,
            marginRight: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: F().size,
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "close",
            position: un.Middle,
            marginLeft: F().secondaryMarginLeft,
            marginTop: F().marginTop,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: F().size,
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }]
        }
      }
    });
  }), Ke(() => {
    n == null || n.setLocale(W());
  }), Ke(() => {
    n == null || n.setTimezone($e().key);
  }), Ke(() => {
    if (w()) {
      Mt(w()), n == null || n.setStyles(w()), O(G7(n.getStyles()));
      const o = N();
      if (o) {
        H(o);
        const i = Q(o);
        Mt(i), n == null || n.setStyles(i);
      }
      M1();
    }
  }), [Yy.cloneNode(!0), A(hm, {
    get locale() {
      return e.locale;
    },
    get symbol() {
      return R();
    },
    get spread() {
      return Lt();
    },
    get period() {
      return E();
    },
    get periods() {
      return e.periods;
    },
    onMenuClick: async () => {
      try {
        await ms(() => Un(!Lt())), n == null || n.resize();
      } catch {
      }
    },
    onSymbolClick: () => {
      U1(!f1());
    },
    get onMobilePeriodClick() {
      return e.onMobilePeriodClick;
    },
    onMobileMoreClick: () => {
      e.onMobileMoreClick ? e.onMobileMoreClick() : m1(!0);
    },
    onPeriodChange: ne,
    onTimeToolsClick: () => {
      Ce(Date.now()), be(!0);
    },
    onIndicatorClick: () => {
      j((o) => !o);
    },
    onTimezoneClick: () => {
      he((o) => !o);
    },
    onSettingClick: () => {
      De((o) => !o);
    },
    onScreenshotClick: () => {
      if (n) {
        const o = e.screenshotBackgroundColor || (e.theme === "dark" ? "#11131E" : "#ffffff"), i = n.getConvertPictureUrl(!0, "jpeg", o);
        _(i);
      }
    },
    get chartToolbarAction() {
      return e.chartToolbarAction;
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
    const o = qy.cloneNode(!0), i = o.firstChild, a = i.nextSibling;
    return o.addEventListener("mouseleave", () => {
      Ot(null), Je(!1);
    }), _t((s) => r = s, o), i.$$click = (s) => {
      s.preventDefault(), s.stopPropagation(), G0();
    }, i.$$mousedown = (s) => {
      s.preventDefault(), s.stopPropagation();
    }, C(o, A(fe, {
      get when() {
        return R1();
      },
      get children() {
        return A(F0, {});
      }
    }), a), C(o, A(fe, {
      get when() {
        return Lt();
      },
      get children() {
        return A(Kg, {
          get locale() {
            return e.locale;
          },
          onDrawingItemClick: (s) => {
            if (ta(s)) {
              u = s;
              return;
            }
            u = null, n == null || n.createOverlay(Xt(s));
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
            ea();
          }
        });
      }
    }), a), a.addEventListener("lostpointercapture", (s) => {
      Wn(s), or();
    }), a.addEventListener("pointercancel", (s) => {
      Wn(s, !0), or();
    }), a.$$pointerup = (s) => {
      Wn(s), or();
    }, a.$$pointermove = oa, a.$$pointerdown = (s) => {
      Fa(), ra(s);
    }, _t((s) => t = s, a), C(o, A(fe, {
      get when() {
        return Z1();
      },
      keyed: !0,
      children: (s) => (() => {
        const c = Gy.cloneNode(!0);
        return z((y) => {
          const h = `${s.left}px`, g = `${s.top}px`, v = `${s.height}px`;
          return h !== y._v$6 && c.style.setProperty("left", y._v$6 = h), g !== y._v$7 && c.style.setProperty("top", y._v$7 = g), v !== y._v$8 && c.style.setProperty("height", y._v$8 = v), y;
        }, {
          _v$6: void 0,
          _v$7: void 0,
          _v$8: void 0
        }), c;
      })()
    }), null), C(o, A(fe, {
      get when() {
        return b1();
      },
      keyed: !0,
      children: (s) => (() => {
        const c = Xy.cloneNode(!0);
        return C(c, () => s.text), z((y) => {
          const h = `${s.left}px`, g = `${s.top}px`;
          return h !== y._v$9 && c.style.setProperty("left", y._v$9 = h), g !== y._v$10 && c.style.setProperty("top", y._v$10 = g), y;
        }, {
          _v$9: void 0,
          _v$10: void 0
        }), c;
      })()
    }), null), C(o, A(fe, {
      get when() {
        return $1();
      },
      keyed: !0,
      children: (s) => (() => {
        const c = Jy.cloneNode(!0);
        return C(c, A(r1, {
          get each() {
            return s.rows;
          },
          children: (y) => (() => {
            const h = ep.cloneNode(!0), g = h.firstChild, v = g.nextSibling;
            return C(g, () => y.title), C(v, () => y.value), z((k) => {
              const P = y.title.toLowerCase() === "time", te = y.titleColor ?? "var(--klinecharts-pro-text-second-color)", se = y.valueColor ?? "var(--klinecharts-pro-text-color)";
              return P !== k._v$13 && h.classList.toggle("time", k._v$13 = P), te !== k._v$14 && g.style.setProperty("color", k._v$14 = te), se !== k._v$15 && v.style.setProperty("color", k._v$15 = se), k;
            }, {
              _v$13: void 0,
              _v$14: void 0,
              _v$15: void 0
            }), h;
          })()
        })), z((y) => {
          const h = `${s.left}px`, g = `${s.top}px`;
          return h !== y._v$11 && c.style.setProperty("left", y._v$11 = h), g !== y._v$12 && c.style.setProperty("top", y._v$12 = g), y;
        }, {
          _v$11: void 0,
          _v$12: void 0
        }), c;
      })()
    }), null), C(o, A(fe, {
      get when() {
        return K1();
      },
      keyed: !0,
      children: (s) => (() => {
        const c = tp.cloneNode(!0), y = c.firstChild, h = y.nextSibling;
        return c.style.setProperty("right", "0px"), C(y, () => s.priceText), C(h, () => s.text), z((g) => {
          const v = `${s.top}px`, k = `${s.width}px`, P = s.color, te = `${s.borderRadius}px`, se = s.textFamily, ue = s.textWeight, ge = `${s.paddingLeft}px`, J = `${s.paddingRight}px`, Ae = `${s.paddingTop}px`, Te = `${s.paddingBottom}px`, Oe = `${s.textSize}px`, re = `${Math.max(10, s.textSize - 1)}px`;
          return v !== g._v$16 && c.style.setProperty("top", g._v$16 = v), k !== g._v$17 && c.style.setProperty("width", g._v$17 = k), P !== g._v$18 && c.style.setProperty("background", g._v$18 = P), te !== g._v$19 && c.style.setProperty("border-radius", g._v$19 = te), se !== g._v$20 && c.style.setProperty("font-family", g._v$20 = se), ue !== g._v$21 && c.style.setProperty("font-weight", g._v$21 = ue), ge !== g._v$22 && c.style.setProperty("padding-left", g._v$22 = ge), J !== g._v$23 && c.style.setProperty("padding-right", g._v$23 = J), Ae !== g._v$24 && c.style.setProperty("padding-top", g._v$24 = Ae), Te !== g._v$25 && c.style.setProperty("padding-bottom", g._v$25 = Te), Oe !== g._v$26 && y.style.setProperty("font-size", g._v$26 = Oe), re !== g._v$27 && h.style.setProperty("font-size", g._v$27 = re), g;
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
        }), c;
      })()
    }), null), C(o, A(fe, {
      get when() {
        return Qe();
      },
      keyed: !0,
      children: (s) => (() => {
        const c = ip.cloneNode(!0), y = c.firstChild, h = y.nextSibling, g = h.nextSibling, v = g.firstChild, k = g.nextSibling, P = k.firstChild, te = P.firstChild, se = te.nextSibling, ue = se.firstChild, ge = k.nextSibling, J = ge.firstChild, Ae = ge.nextSibling, Te = Ae.nextSibling, Oe = Te.nextSibling;
        return c.$$click = (re) => {
          re.stopPropagation();
        }, c.$$mousedown = (re) => {
          re.preventDefault(), re.stopPropagation();
        }, y.$$mousedown = Ca, h.$$click = ya, v.$$click = () => We(qe() === "color" ? null : "color"), C(g, A(fe, {
          get when() {
            return qe() === "color";
          },
          get children() {
            const re = np.cloneNode(!0), Se = re.firstChild;
            return C(Se, A(r1, {
              each: Qn,
              children: (ve) => (() => {
                const Ie = ap.cloneNode(!0);
                return Ie.$$click = () => pa(ve), Ie.style.setProperty("background", ve), z(() => le(Ie, `overlay-toolbar-color-swatch ${s.color.toLowerCase() === ve.toLowerCase() ? "selected" : ""}`)), Ie;
              })()
            })), re;
          }
        }), null), P.$$click = () => We(qe() === "width" ? null : "width"), C(se, () => s.lineSize, ue), C(k, A(fe, {
          get when() {
            return qe() === "width";
          },
          get children() {
            const re = rp.cloneNode(!0);
            return C(re, A(r1, {
              each: [1, 2, 3, 4],
              children: (Se) => (() => {
                const ve = sp.cloneNode(!0), Ie = ve.firstChild;
                return ve.$$click = () => ga(Se), Ie.style.setProperty("height", `${Se}px`), z(() => le(ve, s.lineSize === Se ? "selected" : "")), ve;
              })()
            })), re;
          }
        }), null), J.$$click = () => We(qe() === "style" ? null : "style"), C(ge, A(fe, {
          get when() {
            return qe() === "style";
          },
          get children() {
            const re = op.cloneNode(!0), Se = re.firstChild, ve = Se.nextSibling, Ie = ve.nextSibling;
            return Se.$$click = () => Jn(Ve.Solid, []), ve.$$click = () => Jn(Ve.Dashed, [6, 4]), Ie.$$click = () => Jn(Ve.Dashed, [2, 4]), z((Be) => {
              var ct, ut;
              const st = s.lineStyle === Ve.Solid ? "selected" : "", ft = s.lineStyle === Ve.Dashed && ((ct = s.dashedValue) == null ? void 0 : ct[0]) === 6 ? "selected" : "", lt = s.lineStyle === Ve.Dashed && ((ut = s.dashedValue) == null ? void 0 : ut[0]) === 2 ? "selected" : "";
              return st !== Be._v$28 && le(Se, Be._v$28 = st), ft !== Be._v$29 && le(ve, Be._v$29 = ft), lt !== Be._v$30 && le(Ie, Be._v$30 = lt), Be;
            }, {
              _v$28: void 0,
              _v$29: void 0,
              _v$30: void 0
            }), re;
          }
        }), null), Ae.$$click = ma, Te.$$click = fa, Oe.$$click = ha, z((re) => {
          const Se = `${s.x}px`, ve = `${s.y}px`, Ie = `overlay-toolbar-icon edit ${qe() === "color" ? "active" : ""}`, Be = `overlay-toolbar-line-size ${qe() === "width" ? "active" : ""}`, st = `overlay-toolbar-icon minus ${qe() === "style" ? "active" : ""}`, ft = `overlay-toolbar-icon visibility ${s.visible ? "" : "muted"}`, lt = s.visible ? "Hide" : "Show", ct = `overlay-toolbar-icon lock ${s.locked ? "active" : ""}`, ut = s.locked ? "Unlock" : "Lock";
          return Se !== re._v$31 && c.style.setProperty("left", re._v$31 = Se), ve !== re._v$32 && c.style.setProperty("top", re._v$32 = ve), Ie !== re._v$33 && le(v, re._v$33 = Ie), Be !== re._v$34 && le(P, re._v$34 = Be), st !== re._v$35 && le(J, re._v$35 = st), ft !== re._v$36 && le(Ae, re._v$36 = ft), lt !== re._v$37 && Ne(Ae, "title", re._v$37 = lt), ct !== re._v$38 && le(Te, re._v$38 = ct), ut !== re._v$39 && Ne(Te, "title", re._v$39 = ut), re;
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
        }), c;
      })()
    }), null), C(o, A(fe, {
      get when() {
        return wt();
      },
      keyed: !0,
      children: (s) => (() => {
        const c = lp.cloneNode(!0), y = c.firstChild;
        return c.addEventListener("mouseleave", () => {
          It() || Je(!1);
        }), c.$$mousemove = (h) => {
          h.stopPropagation(), Gt();
        }, c.addEventListener("mouseenter", () => {
          Je(!0), Gt();
        }), y.$$click = (h) => {
          h.stopPropagation(), Je(!0), At({
            y: s.y,
            price: s.price,
            yAxisWidth: y1()
          }), ot(!0), Gt();
        }, y.$$mousedown = (h) => {
          h.preventDefault(), h.stopPropagation(), Gt();
        }, C(y, (() => {
          const h = ee(() => {
            var g;
            return !!((g = e.orderTools) != null && g.quickOrderPlusIcon);
          });
          return () => h() ? (() => {
            const g = cp.cloneNode(!0);
            return z(() => g.innerHTML = e.orderTools.quickOrderPlusIcon), g;
          })() : up.cloneNode(!0);
        })()), z((h) => {
          const g = `${Math.max(0, s.y - 12)}px`, v = `${y1()}px`, k = Ee().quickOrderPlusButton ? "block" : "none";
          return g !== h._v$40 && c.style.setProperty("top", h._v$40 = g), v !== h._v$41 && c.style.setProperty("right", h._v$41 = v), k !== h._v$42 && c.style.setProperty("display", h._v$42 = k), h;
        }, {
          _v$40: void 0,
          _v$41: void 0,
          _v$42: void 0
        }), c;
      })()
    }), null), C(o, A(fe, {
      get when() {
        return ee(() => !!It())() && Et();
      },
      keyed: !0,
      children: (s) => (() => {
        const c = dp.cloneNode(!0), y = c.firstChild, h = y.firstChild, g = h.firstChild, v = g.nextSibling, k = v.nextSibling, P = k.nextSibling;
        P.nextSibling;
        const te = h.nextSibling, se = te.firstChild, ue = se.nextSibling, ge = ue.nextSibling, J = ge.nextSibling;
        J.nextSibling;
        const Ae = te.nextSibling, Te = Ae.nextSibling, Oe = Te.firstChild, re = Oe.nextSibling;
        re.nextSibling;
        const Se = Te.nextSibling;
        return Se.firstChild, c.addEventListener("mouseleave", () => Je(!1)), c.addEventListener("mouseenter", () => Je(!0)), y.$$mousemove = () => {
          Gt();
        }, y.$$mousedown = (ve) => {
          ve.preventDefault(), ve.stopPropagation(), Gt();
        }, h.$$click = () => Gn("limit"), C(h, () => R().shortName ?? R().name ?? R().ticker, v), C(h, () => en(s.price), P), te.$$click = () => Gn("stop"), C(te, () => R().shortName ?? R().name ?? R().ticker, ue), C(te, () => en(s.price), J), Ae.$$click = () => Gn("create"), Te.$$click = ca, C(Te, () => en(s.price), re), Se.$$click = ua, C(Se, () => en(s.price), null), z((ve) => {
          const Ie = `${Math.max(0, s.y + 24)}px`, Be = `${s.yAxisWidth + jn}px`;
          return Ie !== ve._v$43 && c.style.setProperty("top", ve._v$43 = Ie), Be !== ve._v$44 && c.style.setProperty("right", ve._v$44 = Be), ve;
        }, {
          _v$43: void 0,
          _v$44: void 0
        }), c;
      })()
    }), null), z((s) => {
      const c = `klinecharts-pro-auto-scale-button${Ge() ? " active" : ""}`, y = Ge(), h = Ge(), g = Ge() ? "Auto scale on" : "Auto scale off", v = Lt();
      return c !== s._v$ && le(i, s._v$ = c), y !== s._v$2 && Ne(i, "data-active", s._v$2 = y), h !== s._v$3 && Ne(i, "aria-pressed", s._v$3 = h), g !== s._v$4 && Ne(i, "title", s._v$4 = g), v !== s._v$5 && Ne(a, "data-drawing-bar-visible", s._v$5 = v), s;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0,
      _v$5: void 0
    }), o;
  })(), A(fe, {
    get when() {
      return f1();
    },
    get children() {
      return A(ky, {
        get locale() {
          return e.locale;
        },
        get datafeed() {
          return e.datafeed;
        },
        onSymbolSelected: (o) => {
          T(o);
        },
        onClose: () => {
          U1(!1);
        }
      });
    }
  }), A(fe, {
    get when() {
      return U();
    },
    get children() {
      return A(jg, {
        get locale() {
          return e.locale;
        },
        get mainIndicators() {
          return ce();
        },
        get subIndicators() {
          return Z();
        },
        onClose: () => {
          j(!1);
        },
        onMainIndicatorChange: (o) => {
          const i = [...ce()];
          o.added ? (yn(n, o.name, !0, {
            id: "candle_pane"
          }), i.push(o.name), et(o.name, "candle_pane", "main", "add")) : (n == null || n.removeIndicator("candle_pane", o.name), i.splice(i.indexOf(o.name), 1), et(o.name, "candle_pane", "main", "remove")), G(i), xe(!0);
        },
        onSubIndicatorChange: (o) => {
          const i = {
            ...Z()
          };
          if (o.added) {
            const a = yn(n, o.name);
            a && (i[o.name] = a, et(o.name, a, "sub", "add"));
          } else
            o.paneId && (n == null || n.removeIndicator(o.paneId, o.name), delete i[o.name], et(o.name, o.paneId, "sub", "remove"));
          X(i), xe(!0);
        }
      });
    }
  }), A(fe, {
    get when() {
      return ae();
    },
    get children() {
      return A(Qg, {
        get locale() {
          return e.locale;
        },
        get timezone() {
          return $e();
        },
        onClose: () => {
          he(!1);
        },
        onConfirm: we
      });
    }
  }), A(fe, {
    get when() {
      return de();
    },
    get children() {
      return A(fy, {
        get locale() {
          return e.locale;
        },
        get currentStyles() {
          return B.clone(n.getStyles());
        },
        get defaultStyles() {
          return _e();
        },
        get currentBackgroundColor() {
          return q();
        },
        get defaultBackgroundColor() {
          return S();
        },
        get timezone() {
          return $e();
        },
        onClose: () => {
          De(!1);
        },
        onTimezoneChange: (o) => {
          we(o), window.dispatchEvent(new CustomEvent("klinecharts-pro-timezone-change", {
            detail: {
              timezone: o.key
            }
          }));
        },
        onChange: (o) => {
          const i = o;
          H(i);
          const a = Q(i);
          Mt(a), n == null || n.setStyles(a), n == null || n.resize(), M1();
        },
        onSaveChartStyle: (o) => {
          V(o);
        },
        onResetChartStyle: () => {
          Y(), t == null || t.style.removeProperty("--klinecharts-pro-chart-background-color");
        },
        onRestoreDefault: (o) => {
          const i = {};
          o.forEach((s) => {
            const c = s.key;
            if (c === "chart.backgroundColor") {
              Fe(i, c, S());
              return;
            }
            Fe(i, c, B.formatValue(_e(), c));
          }), H(i);
          const a = Q(i);
          Mt(a), n == null || n.setStyles(a), n == null || n.resize(), M1();
        }
      });
    }
  }), A(fe, {
    get when() {
      return ie().length > 0;
    },
    get children() {
      return A(gy, {
        get locale() {
          return e.locale;
        },
        get url() {
          return ie();
        },
        onClose: () => {
          _("");
        }
      });
    }
  }), A(fe, {
    get when() {
      return oe();
    },
    get children() {
      return A(Ky, {
        get initialTimestamp() {
          return pe();
        },
        get initialRange() {
          return Xe();
        },
        get anchorSettings() {
          return pt();
        },
        onClose: () => {
          be(!1);
        },
        onGoToDate: Oa,
        onTimeRange: (o) => {
          _o(o);
        },
        onTimeAnchorChange: Ia
      });
    }
  }), A(fe, {
    get when() {
      return _1().visible;
    },
    get children() {
      return A(vy, {
        get locale() {
          return e.locale;
        },
        get params() {
          return _1();
        },
        onClose: () => {
          k1({
            visible: !1,
            indicatorName: "",
            paneId: "",
            calcParams: []
          });
        },
        onConfirm: (o) => {
          const i = _1();
          n == null || n.overrideIndicator({
            name: i.indicatorName,
            calcParams: o
          }, i.paneId), xe(!0);
          const a = i.paneId === "candle_pane" ? "main" : "sub";
          et(i.indicatorName, i.paneId, a, "change");
        }
      });
    }
  }), A(fe, {
    get when() {
      return Rn();
    },
    get children() {
      return A(Ly, {
        get locale() {
          return e.locale;
        },
        onIndicatorClick: () => {
          j(!0);
        },
        onTimezoneClick: () => {
          he(!0);
        },
        onSettingClick: () => {
          De(!0);
        },
        onTimeToolsClick: () => {
          Ce(Date.now()), be(!0);
        },
        onClose: () => {
          m1(!1);
        }
      });
    }
  })];
};
Ye(["mousedown", "click", "pointerdown", "pointermove", "pointerup", "mousemove"]);
const bp = /* @__PURE__ */ $('<svg class="logo" viewBox="0 0 80 92"><path d="M28.148808359375,51.7280513671875L22.963588359375,51.7280513671875C21.572648359375002,51.7280513671875,20.445068359375,52.6220613671875,20.445068359375,53.7248813671875L20.445068359375,72.3979013671875C20.445068359375,73.5007013671875,21.572648359375002,74.39470136718751,22.963588359375,74.39470136718751L33.926568359375,74.39470136718751C35.317468359375,74.39470136718751,36.445068359375,73.5007013671875,36.445068359375,72.3979013671875L36.445068359375,53.7248813671875C36.445068359375,52.6220613671875,35.317468359375,51.7280513671875,33.926568359375,51.7280513671875L28.741398359374998,51.7280513671875L28.741398359374998,46.2963223671875C28.741398359374998,46.1665793671875,28.608748359375,46.0614013671875,28.445108359375,46.0614013671875C28.281468359375,46.0614013671875,28.148808359375,46.1665793671875,28.148808359375,46.2963223671875L28.148808359375,51.7280513671875ZM28.741398359374998,74.3948013671875L28.741398359374998,79.82650136718749C28.741398359374998,79.9563013671875,28.608748359375,80.0614013671875,28.445108359375,80.0614013671875C28.281468359375,80.0614013671875,28.148808359375,79.9563013671875,28.148808359375,79.82650136718749L28.148808359375,74.3948013671875L28.741398359374998,74.3948013671875Z"></path><path d="M51.148808359374996,44.7280513671875L45.963588359375,44.7280513671875C44.572648359375,44.7280513671875,43.445068359375,45.6220613671875,43.445068359375,46.7248813671875L43.445068359375,65.3979013671875C43.445068359375,66.5007013671875,44.572648359375,67.39470136718751,45.963588359375,67.39470136718751L56.926568359375,67.39470136718751C58.317468359375,67.39470136718751,59.445068359375,66.5007013671875,59.445068359375,65.3979013671875L59.445068359375,46.7248813671875C59.445068359375,45.6220613671875,58.317468359375,44.7280513671875,56.926568359375,44.7280513671875L51.741398359375,44.7280513671875L51.741398359375,39.2963223671875C51.741398359375,39.1665793671875,51.608748359375,39.0614013671875,51.445108359375,39.0614013671875C51.281468359375,39.0614013671875,51.148808359374996,39.1665793671875,51.148808359374996,39.2963223671875L51.148808359374996,44.7280513671875ZM51.741398359375,67.3948013671875L51.741398359375,72.82650136718749C51.741398359375,72.9563013671875,51.608748359375,73.0614013671875,51.445108359375,73.0614013671875C51.281468359375,73.0614013671875,51.148808359374996,72.9563013671875,51.148808359374996,72.82650136718749L51.148808359374996,67.3948013671875L51.741398359375,67.3948013671875Z"></path><path d="M17.7274,90.6541C17.5901,90.6541,17.4517,90.6436,17.3121,90.6225C9.93219,89.5095,4.80718,86.7136,2.07787,82.3084C-1.1223,77.1437,0.241766,71.6314,0.56829,70.5137C5.37624,46.647,15.0785,38.4945,21.5025,33.0957C22.9683,31.8633,24.2342,30.7995,25.1676,29.7672C25.4105,29.4984,25.6051,29.2154,25.7556,28.9202C24.7465,29.2231,24.1971,29.4326,24.1703,29.4429C22.908,29.9368,21.4777,29.3247,20.9761,28.076C20.4756,26.8272,21.0897,25.4146,22.352,24.9172C22.5042,24.8571,23.5312,24.4607,25.3073,23.9616C24.087,21.4425,21.7693,18.7949,19.7125,16.6431L19.2819,16.1902C16.2438,12.9776,14.6017,4.80159,14.3036,3.19471C14.1306,2.26212,14.4636,1.30796,15.1814,0.679657C15.8995,0.0512175,16.8976,-0.159672,17.8125,0.123747C22.7731,1.66274,24.2638,1.81255,27.2321,2.11098C28.7357,2.26195,29.83,3.59029,29.6762,5.07662C29.5236,6.56295,28.182,7.64786,26.6784,7.49454C24.4992,7.27569,22.9517,7.09896,20.724,6.56646C21.4493,9.09088,22.3803,11.5427,23.2771,12.4919L23.6876,12.9237C25.3757,14.69,28.9691,18.45,30.7016,22.7299C35.0392,21.9433,40.8791,21.3359,47.7817,21.7249C48.2004,20.7386,48.8054,19.7953,49.5907,18.9135C49.7137,18.7754,49.8498,18.6502,49.9988,18.539C53.6142,15.8508,57.5491,12.857,59.7803,11.0758C58.1028,11.2502,56.1034,11.0278,53.9124,9.70882C53.2439,9.30622,52.5992,8.89427,51.9662,8.48933C48.4668,6.25164,46.497,5.12109,43.4234,5.94853C41.9647,6.34058,40.4622,5.48975,40.0659,4.04789C39.6695,2.60604,40.5296,1.11853,41.9871,0.726471C47.5602,-0.773825,51.4796,1.73271,54.9364,3.9434L54.9364,3.9434C55.5284,4.32176,56.1318,4.70797,56.7564,5.08482C58.3843,6.06556,59.4858,5.76127,61.2899,5.13865C62.3511,4.77234,63.5567,4.35687,64.8675,4.53476C66.3321,4.73254,67.4406,5.56933,67.9103,6.83096C68.7444,9.07333,67.1035,11.5533,65.5797,13.2374C64.6729,14.2394,60.0845,17.7606,56.4519,20.4957C56.9477,20.3369,57.4767,20.2511,58.026,20.2511C59.4281,20.2511,60.6982,20.8102,61.621,21.7153C65.4948,20.6901,67.87,17.9563,67.9033,17.9175C68.78,16.8888,70.3322,16.7577,71.3721,17.6226C72.412,18.4886,72.5457,20.0253,71.6702,21.054C71.5221,21.2286,69.5063,23.5492,66.0787,25.233C69.5399,26.8822,72.9993,29.682,74.1841,34.4145C74.5106,35.7206,73.7062,37.0407,72.3859,37.3638C72.1871,37.4117,71.9884,37.4351,71.792,37.4351C70.687,37.4351,69.6826,36.6932,69.4046,35.5848C68.4378,31.7217,64.8144,29.7431,61.7619,28.7456C60.8298,29.7349,59.5009,30.3535,58.026,30.3535C55.8642,30.3535,54.0162,29.0245,53.2713,27.1474C53.2022,27.138,53.1331,27.1287,53.0642,27.1195C54.232,29.5936,57.0851,31.9259,58.1868,32.665C58.3157,32.7516,58.4423,32.8523,58.5547,32.9599C66.5865,40.6151,72.4887,48.8133,76.0971,57.3287C76.6815,58.7074,76.0249,60.2932,74.6313,60.8702C74.2976,61.01,73.9388,61.082,73.576,61.082C72.5065,61.082,71.4914,60.4582,71.0525,59.4213C67.7577,51.6455,62.331,44.1074,54.9203,37.0116C53.6073,36.1009,48.0984,31.9917,47.2065,26.583C40.9421,26.2679,35.6187,26.8278,31.6725,27.5336C31.6197,29.527,30.9225,31.5172,29.2456,33.3731C28.0614,34.6827,26.5968,35.915,25.0446,37.2188C21.9414,39.8269,18.2648,42.9169,14.8104,48.1192C11.356,53.3215,8.12389,60.6361,5.9098,71.6934C5.88732,71.8035,5.85893,71.9123,5.82344,72.0188C5.81634,72.041,4.57886,76.0413,6.77344,79.5289C8.6332,82.4828,12.4557,84.4139,18.1367,85.2705C19.6297,85.4953,20.6566,86.8762,20.4295,88.3532C20.2213,89.6944,19.0559,90.6541,17.7274,90.6541ZM35.1195,7.03101C33.3502,7.03101,31.9158,5.61208,31.9158,3.86173C31.9158,2.11139,33.3502,0.69245,35.1195,0.69245C36.8889,0.69245,38.3233,2.11139,38.3233,3.86173C38.3233,5.61208,36.8889,7.03101,35.1195,7.03101ZM57.6848,23.1892L58.414,24.4754C58.8984,24.3623,59.3923,24.3435,59.8644,24.4203C60.2191,24.5005,60.5087,24.7182,60.6663,25.0229C60.8636,25.3394,60.8993,25.7346,60.7646,26.1094C60.5988,26.5176,60.2972,26.8749,59.9085,27.1235L60.31,27.8316L59.7886,28.1294L59.3994,27.443C58.9257,27.7175,58.399,27.883,57.8664,27.9247L57.3744,27.0569C57.6378,27.0741,57.9071,27.048,58.1704,26.9797C58.4501,26.9251,58.7239,26.8323,58.9829,26.7044L58.2801,25.4647C57.8047,25.5877,57.3167,25.6065,56.8549,25.5197C56.4913,25.4263,56.196,25.1971,56.0328,24.8814C55.8433,24.5561,55.8127,24.1572,55.9484,23.7789C56.088,23.373,56.3763,23.0149,56.7584,22.7726L56.4166,22.1699L56.938,21.8721L57.2727,22.4625C57.6615,22.2376,58.0888,22.0901,58.5254,22.0301L59.0042,22.8746C58.5548,22.8828,58.103,22.9906,57.6848,23.1892ZM56.9319,24.2961Q57.1278,24.6417,57.7863,24.5856L57.1695,23.4978Q56.6982,23.884,56.9319,24.2961ZM58.9077,25.3462L59.4981,26.3875L59.499,26.3891Q59.9965,26.0045,59.7628,25.5923Q59.573,25.2576,58.9077,25.3462ZM73.2212,66.5065C73.2212,68.2569,74.6555,69.6758,76.4249,69.6758C78.1943,69.6758,79.6286,68.2569,79.6286,66.5065C79.6286,64.7562,78.1943,63.3372,76.4249,63.3372C74.6555,63.3372,73.2212,64.7562,73.2212,66.5065ZM35.9465,91.8045C35.0734,91.8045,34.2038,91.7987,33.3378,91.7858C31.827,91.7636,30.6203,90.5359,30.6428,89.0402C30.6653,87.5457,31.9158,86.3297,33.4183,86.3742C49.6344,86.6059,65.7512,84.6175,67.6134,84.037C72.1953,82.4184,74.5295,79.3603,74.5295,74.9575C74.5295,73.463,75.754,72.2517,77.2648,72.2517C78.7755,72.2517,80,73.463,80,74.9575C80,81.5992,76.148,86.7686,69.4317,89.142C67.0041,89.9999,51.0955,91.8046,35.9465,91.8045ZM25.2731,92C23.5037,92,22.0693,90.5811,22.0693,88.8307C22.0693,87.0804,23.5037,85.6615,25.2731,85.6615C27.0424,85.6615,28.4768,87.0804,28.4768,88.8307C28.4768,90.5811,27.0424,92,25.2731,92Z"></path></svg>'), $p = bp.cloneNode(!0);
class wp {
  constructor(t) {
    N1(this, "_chartApi", null);
    if (B.isString(t.container)) {
      if (this._container = document.getElementById(t.container), !this._container)
        throw new Error("Container is null");
    } else
      this._container = t.container;
    this._container.classList.add("klinecharts-pro"), this._container.setAttribute("data-theme", t.theme ?? "light");
    const r = this;
    ks(() => A(vp, {
      ref: (n) => {
        r._chartApi = n;
      },
      get styles() {
        return t.styles ?? {};
      },
      get watermark() {
        return t.watermark ?? $p;
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
      get chartToolbarAction() {
        return t.chartToolbarAction;
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
    Mt(t), this._chartApi.setStyles(t), (n = (r = this._chartApi).resize) == null || n.call(r);
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
  getConfiguration() {
    return this._chartApi.getConfiguration();
  }
  downloadConfiguration(t) {
    var r, n;
    (n = (r = this._chartApi) == null ? void 0 : r.downloadConfiguration) == null || n.call(r, t);
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
cs.forEach((e) => {
  Qa(e);
});
export {
  xp as DefaultDatafeed,
  wp as KLineChartPro,
  Hy as calculateAutoPriceRange,
  Lp as loadLocales
};
//# sourceMappingURL=klinecharts-pro.js.map
