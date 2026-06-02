var n9 = Object.defineProperty;
var r9 = (e, t, r) => t in e ? n9(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var g1 = (e, t, r) => (r9(e, typeof t != "symbol" ? t + "" : t, r), r);
import { utils as E, registerFigure as o9, PolygonType as m1, LineType as ze, OverlayMode as kn, ActionType as Dt, init as i9, FormatDateType as Q1, DomPosition as at, dispose as n0, TooltipIconPosition as Z1, CandleType as a9, YAxisType as s9, registerOverlay as l9 } from "klinecharts";
function p1(e, t, r) {
  const n = (e.x - t.x) * Math.cos(r) - (e.y - t.y) * Math.sin(r) + t.x, a = (e.x - t.x) * Math.sin(r) + (e.y - t.y) * Math.cos(r) + t.y;
  return { x: n, y: a };
}
function Sn(e, t) {
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
      y: E.getLinearYFromCoordinates(e[0], e[1], { x: 0, y: e[0].y })
    } : r = {
      x: t.width,
      y: E.getLinearYFromCoordinates(e[0], e[1], { x: t.width, y: e[0].y })
    }, { coordinates: [e[0], r] };
  }
  return [];
}
function G0(e, t) {
  const r = Math.abs(e.x - t.x), n = Math.abs(e.y - t.y);
  return Math.sqrt(r * r + n * n);
}
const c9 = {
  name: "arrow",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = e[1].x > e[0].x ? 0 : 1, r = E.getLinearSlopeIntercept(e[0], e[1]);
      let n;
      r ? n = Math.atan(r[0]) + Math.PI * t : e[1].y > e[0].y ? n = Math.PI / 2 : n = Math.PI / 2 * 3;
      const a = p1({ x: e[1].x - 8, y: e[1].y + 4 }, e[1], n), l = p1({ x: e[1].x - 8, y: e[1].y - 4 }, e[1], n);
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
}, u9 = {
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
      const t = G0(e[0], e[1]);
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
}, d9 = {
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
}, h9 = {
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
}, f9 = {
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
}, g9 = {
  name: "fibonacciCircle",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = Math.abs(e[0].x - e[1].x), r = Math.abs(e[0].y - e[1].y), n = Math.sqrt(t * t + r * r), a = [0.236, 0.382, 0.5, 0.618, 0.786, 1], l = [], d = [];
      return a.forEach((h) => {
        const v = n * h;
        l.push(
          { ...e[0], r: v }
        ), d.push({
          x: e[0].x,
          y: e[0].y + v + 6,
          text: `${(h * 100).toFixed(1)}%`
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
}, m9 = {
  name: "fibonacciSegment",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: r }) => {
    const n = [], a = [];
    if (e.length > 1) {
      const l = e[1].x > e[0].x ? e[0].x : e[1].x, d = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0], h = e[0].y - e[1].y, v = t.points, x = v[0].value - v[1].value;
      d.forEach((b) => {
        const L = e[1].y + h * b, B = (v[1].value + x * b).toFixed(r.price);
        n.push({ coordinates: [{ x: e[0].x, y: L }, { x: e[1].x, y: L }] }), a.push({
          x: l,
          y: L,
          text: `${B} (${(b * 100).toFixed(1)}%)`,
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
}, y9 = {
  name: "fibonacciSpiral",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, bounding: t }) => {
    if (e.length > 1) {
      const r = G0(e[0], e[1]) / Math.sqrt(24), n = e[1].x > e[0].x ? 0 : 1, a = E.getLinearSlopeIntercept(e[0], e[1]);
      let l;
      a ? l = Math.atan(a[0]) + Math.PI * n : e[1].y > e[0].y ? l = Math.PI / 2 : l = Math.PI / 2 * 3;
      const d = p1(
        { x: e[0].x - r, y: e[0].y },
        e[0],
        l
      ), h = p1(
        { x: e[0].x - r, y: e[0].y - r },
        e[0],
        l
      ), v = [{
        ...d,
        r,
        startAngle: l,
        endAngle: l + Math.PI / 2
      }, {
        ...h,
        r: r * 2,
        startAngle: l + Math.PI / 2,
        endAngle: l + Math.PI
      }];
      let x = e[0].x - r, b = e[0].y - r;
      for (let L = 2; L < 9; L++) {
        const B = v[L - 2].r + v[L - 1].r;
        let N = 0;
        switch (L % 4) {
          case 0: {
            N = l, x -= v[L - 2].r;
            break;
          }
          case 1: {
            N = l + Math.PI / 2, b -= v[L - 2].r;
            break;
          }
          case 2: {
            N = l + Math.PI, x += v[L - 2].r;
            break;
          }
          case 3: {
            N = l + Math.PI / 2 * 3, b += v[L - 2].r;
            break;
          }
        }
        const Z = N + Math.PI / 2, U = p1({ x, y: b }, e[0], l);
        v.push({
          ...U,
          r: B,
          startAngle: N,
          endAngle: Z
        });
      }
      return [
        {
          type: "arc",
          attrs: v
        },
        {
          type: "line",
          attrs: Sn(e, t)
        }
      ];
    }
    return [];
  }
}, C9 = {
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
      const l = e[1].x > e[0].x ? -38 : 4, d = e[1].y > e[0].y ? -2 : 20, h = e[1].x - e[0].x, v = e[1].y - e[0].y;
      [1, 0.75, 0.618, 0.5, 0.382, 0.25, 0].forEach((b) => {
        const L = e[1].x - h * b, B = e[1].y - v * b;
        r.push({ coordinates: [{ x: L, y: e[0].y }, { x: L, y: e[1].y }] }), r.push({ coordinates: [{ x: e[0].x, y: B }, { x: e[1].x, y: B }] }), n = n.concat(Sn([e[0], { x: L, y: e[1].y }], t)), n = n.concat(Sn([e[0], { x: e[1].x, y: B }], t)), a.unshift({
          x: e[0].x + l,
          y: B + 10,
          text: `${b.toFixed(3)}`
        }), a.unshift({
          x: L - 18,
          y: e[0].y + d,
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
}, p9 = {
  name: "fibonacciExtension",
  totalStep: 4,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: r }) => {
    const n = [], a = [];
    if (e.length > 2) {
      const l = t.points, d = l[1].value - l[0].value, h = e[1].y - e[0].y, v = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1], x = e[2].x > e[1].x ? e[1].x : e[2].x;
      v.forEach((b) => {
        const L = e[2].y + h * b, B = (l[2].value + d * b).toFixed(r.price);
        n.push({ coordinates: [{ x: e[1].x, y: L }, { x: e[2].x, y: L }] }), a.push({
          x,
          y: L,
          text: `${B} (${(b * 100).toFixed(1)}%)`,
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
}, v9 = {
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
}, b9 = {
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
}, $9 = {
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
}, _9 = {
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
}, k9 = {
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
}, x9 = {
  name: "abcd",
  totalStep: 5,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    let t = [], r = [];
    const n = ["A", "B", "C", "D"], a = e.map((l, d) => ({
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
        attrs: a
      }
    ];
  }
}, L9 = {
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
    const r = [], n = [], a = ["X", "A", "B", "C", "D"], l = e.map((d, h) => ({
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
        attrs: l
      }
    ];
  }
}, w9 = [
  c9,
  u9,
  d9,
  f9,
  h9,
  g9,
  m9,
  y9,
  C9,
  p9,
  v9,
  b9,
  $9,
  _9,
  k9,
  x9,
  L9
];
class Dm {
  constructor(t) {
    g1(this, "_apiKey");
    g1(this, "_prevSymbolMarket");
    g1(this, "_ws");
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
    var a, l;
    this._prevSymbolMarket !== t.market ? ((a = this._ws) == null || a.close(), this._ws = new WebSocket(`wss://delayed.polygon.io/${t.market}`), this._ws.onopen = () => {
      var d;
      (d = this._ws) == null || d.send(JSON.stringify({ action: "auth", params: this._apiKey }));
    }, this._ws.onmessage = (d) => {
      var v;
      const h = JSON.parse(d.data);
      h[0].ev === "status" ? h[0].status === "auth_success" && ((v = this._ws) == null || v.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` }))) : "sym" in h && n({
        timestamp: h.s,
        open: h.o,
        high: h.h,
        low: h.l,
        close: h.c,
        volume: h.v,
        turnover: h.vw
      });
    }) : (l = this._ws) == null || l.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` })), this._prevSymbolMarket = t.market;
  }
  unsubscribe(t, r) {
  }
}
const Ee = {};
function T9(e) {
  Ee.context = e;
}
const A9 = (e, t) => e === t, Pn = Symbol("solid-proxy"), M9 = Symbol("solid-track"), en = {
  equals: A9
};
let X0 = no;
const yt = 1, tn = 2, J0 = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, xn = {};
var De = null;
let It = null, xe = null, Ve = null, mt = null, zn = 0;
function v1(e, t) {
  const r = xe, n = De, a = e.length === 0, l = a ? J0 : {
    owned: null,
    cleanups: null,
    context: null,
    owner: t === void 0 ? n : t
  }, d = a ? e : () => e(() => lt(() => dn(l)));
  De = l, xe = null;
  try {
    return Lt(d, !0);
  } finally {
    xe = r, De = n;
  }
}
function M(e, t) {
  t = t ? Object.assign({}, en, t) : en;
  const r = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, n = (a) => (typeof a == "function" && (a = a(r.value)), to(r, a));
  return [eo.bind(r), n];
}
function r0(e, t, r) {
  const n = un(e, t, !0, yt);
  Zt(n);
}
function V(e, t, r) {
  const n = un(e, t, !1, yt);
  Zt(n);
}
function Re(e, t, r) {
  X0 = I9;
  const n = un(e, t, !1, yt);
  n.user = !0, mt ? mt.push(n) : Zt(n);
}
function Y(e, t, r) {
  r = r ? Object.assign({}, en, r) : en;
  const n = un(e, t, !0, 0);
  return n.observers = null, n.observerSlots = null, n.comparator = r.equals || void 0, Zt(n), eo.bind(n);
}
function S9(e, t, r) {
  let n, a, l;
  arguments.length === 2 && typeof t == "object" || arguments.length === 1 ? (n = !0, a = e, l = t || {}) : (n = e, a = t, l = r || {});
  let d = null, h = xn, v = null, x = !1, b = "initialValue" in l, L = typeof n == "function" && Y(n);
  const B = /* @__PURE__ */ new Set(), [N, Z] = (l.storage || M)(l.initialValue), [U, K] = M(void 0), [z, ce] = M(void 0, {
    equals: !1
  }), [j, X] = M(b ? "ready" : "unresolved");
  if (Ee.context) {
    v = `${Ee.context.id}${Ee.context.count++}`;
    let ne;
    l.ssrLoadFrom === "initial" ? h = l.initialValue : Ee.load && (ne = Ee.load(v)) && (h = ne[0]);
  }
  function ee(ne, se, A, W) {
    return d === ne && (d = null, b = !0, (ne === h || se === h) && l.onHydrated && queueMicrotask(() => l.onHydrated(W, {
      value: se
    })), h = xn, pe(se, A)), se;
  }
  function pe(ne, se) {
    Lt(() => {
      se === void 0 && Z(() => ne), X(se !== void 0 ? "errored" : "ready"), K(se);
      for (const A of B.keys())
        A.decrement();
      B.clear();
    }, !1);
  }
  function H() {
    const ne = D9, se = N(), A = U();
    if (A !== void 0 && !d)
      throw A;
    return xe && !xe.user && ne && r0(() => {
      z(), d && (ne.resolved || B.has(ne) || (ne.increment(), B.add(ne)));
    }), se;
  }
  function q(ne = !0) {
    if (ne !== !1 && x)
      return;
    x = !1;
    const se = L ? L() : n;
    if (se == null || se === !1) {
      ee(d, lt(N));
      return;
    }
    const A = h !== xn ? h : lt(() => a(se, {
      value: N(),
      refetching: ne
    }));
    return typeof A != "object" || !(A && "then" in A) ? (ee(d, A, void 0, se), A) : (d = A, x = !0, queueMicrotask(() => x = !1), Lt(() => {
      X(b ? "refreshing" : "pending"), ce();
    }, !1), A.then((W) => ee(A, W, void 0, se), (W) => ee(A, void 0, oo(W), se)));
  }
  return Object.defineProperties(H, {
    state: {
      get: () => j()
    },
    error: {
      get: () => U()
    },
    loading: {
      get() {
        const ne = j();
        return ne === "pending" || ne === "refreshing";
      }
    },
    latest: {
      get() {
        if (!b)
          return H();
        const ne = U();
        if (ne && !d)
          throw ne;
        return N();
      }
    }
  }), L ? r0(() => q(!1)) : q(!1), [H, {
    refetch: q,
    mutate: Z
  }];
}
function lt(e) {
  if (xe === null)
    return e();
  const t = xe;
  xe = null;
  try {
    return e();
  } finally {
    xe = t;
  }
}
function Vn(e) {
  Re(() => lt(e));
}
function Et(e) {
  return De === null || (De.cleanups === null ? De.cleanups = [e] : De.cleanups.push(e)), e;
}
function P9(e) {
  const t = xe, r = De;
  return Promise.resolve().then(() => {
    xe = t, De = r;
    let n;
    return Lt(e, !1), xe = De = null, n ? n.done : void 0;
  });
}
let D9;
function eo() {
  const e = It;
  if (this.sources && (this.state || e))
    if (this.state === yt || e)
      Zt(this);
    else {
      const t = Ve;
      Ve = null, Lt(() => rn(this), !1), Ve = t;
    }
  if (xe) {
    const t = this.observers ? this.observers.length : 0;
    xe.sources ? (xe.sources.push(this), xe.sourceSlots.push(t)) : (xe.sources = [this], xe.sourceSlots = [t]), this.observers ? (this.observers.push(xe), this.observerSlots.push(xe.sources.length - 1)) : (this.observers = [xe], this.observerSlots = [xe.sources.length - 1]);
  }
  return this.value;
}
function to(e, t, r) {
  let n = e.value;
  return (!e.comparator || !e.comparator(n, t)) && (e.value = t, e.observers && e.observers.length && Lt(() => {
    for (let a = 0; a < e.observers.length; a += 1) {
      const l = e.observers[a], d = It && It.running;
      d && It.disposed.has(l), (d && !l.tState || !d && !l.state) && (l.pure ? Ve.push(l) : mt.push(l), l.observers && ro(l)), d || (l.state = yt);
    }
    if (Ve.length > 1e6)
      throw Ve = [], new Error();
  }, !1)), t;
}
function Zt(e) {
  if (!e.fn)
    return;
  dn(e);
  const t = De, r = xe, n = zn;
  xe = De = e, N9(e, e.value, n), xe = r, De = t;
}
function N9(e, t, r) {
  let n;
  try {
    n = e.fn(t);
  } catch (a) {
    e.pure && (e.state = yt, e.owned && e.owned.forEach(dn), e.owned = null), io(a);
  }
  (!e.updatedAt || e.updatedAt <= r) && (e.updatedAt != null && "observers" in e ? to(e, n) : e.value = n, e.updatedAt = r);
}
function un(e, t, r, n = yt, a) {
  const l = {
    fn: e,
    state: n,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: De,
    context: null,
    pure: r
  };
  return De === null || De !== J0 && (De.owned ? De.owned.push(l) : De.owned = [l]), l;
}
function nn(e) {
  const t = It;
  if (e.state === 0 || t)
    return;
  if (e.state === tn || t)
    return rn(e);
  if (e.suspense && lt(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const r = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < zn); )
    (e.state || t) && r.push(e);
  for (let n = r.length - 1; n >= 0; n--)
    if (e = r[n], e.state === yt || t)
      Zt(e);
    else if (e.state === tn || t) {
      const a = Ve;
      Ve = null, Lt(() => rn(e, r[0]), !1), Ve = a;
    }
}
function Lt(e, t) {
  if (Ve)
    return e();
  let r = !1;
  t || (Ve = []), mt ? r = !0 : mt = [], zn++;
  try {
    const n = e();
    return O9(r), n;
  } catch (n) {
    r || (mt = null), Ve = null, io(n);
  }
}
function O9(e) {
  if (Ve && (no(Ve), Ve = null), e)
    return;
  const t = mt;
  mt = null, t.length && Lt(() => X0(t), !1);
}
function no(e) {
  for (let t = 0; t < e.length; t++)
    nn(e[t]);
}
function I9(e) {
  let t, r = 0;
  for (t = 0; t < e.length; t++) {
    const n = e[t];
    n.user ? e[r++] = n : nn(n);
  }
  for (Ee.context && T9(), t = 0; t < r; t++)
    nn(e[t]);
}
function rn(e, t) {
  const r = It;
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
    const a = e.sources[n];
    a.sources && (a.state === yt || r ? a !== t && nn(a) : (a.state === tn || r) && rn(a, t));
  }
}
function ro(e) {
  const t = It;
  for (let r = 0; r < e.observers.length; r += 1) {
    const n = e.observers[r];
    (!n.state || t) && (n.state = tn, n.pure ? Ve.push(n) : mt.push(n), n.observers && ro(n));
  }
}
function dn(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const r = e.sources.pop(), n = e.sourceSlots.pop(), a = r.observers;
      if (a && a.length) {
        const l = a.pop(), d = r.observerSlots.pop();
        n < a.length && (l.sourceSlots[d] = n, a[n] = l, r.observerSlots[n] = d);
      }
    }
  if (e.owned) {
    for (t = 0; t < e.owned.length; t++)
      dn(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = 0; t < e.cleanups.length; t++)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function oo(e) {
  return e instanceof Error || typeof e == "string" ? e : new Error("Unknown error");
}
function io(e) {
  throw e = oo(e), e;
}
const E9 = Symbol("fallback");
function o0(e) {
  for (let t = 0; t < e.length; t++)
    e[t]();
}
function B9(e, t, r = {}) {
  let n = [], a = [], l = [], d = 0, h = t.length > 1 ? [] : null;
  return Et(() => o0(l)), () => {
    let v = e() || [], x, b;
    return v[M9], lt(() => {
      let B = v.length, N, Z, U, K, z, ce, j, X, ee;
      if (B === 0)
        d !== 0 && (o0(l), l = [], n = [], a = [], d = 0, h && (h = [])), r.fallback && (n = [E9], a[0] = v1((pe) => (l[0] = pe, r.fallback())), d = 1);
      else if (d === 0) {
        for (a = new Array(B), b = 0; b < B; b++)
          n[b] = v[b], a[b] = v1(L);
        d = B;
      } else {
        for (U = new Array(B), K = new Array(B), h && (z = new Array(B)), ce = 0, j = Math.min(d, B); ce < j && n[ce] === v[ce]; ce++)
          ;
        for (j = d - 1, X = B - 1; j >= ce && X >= ce && n[j] === v[X]; j--, X--)
          U[X] = a[j], K[X] = l[j], h && (z[X] = h[j]);
        for (N = /* @__PURE__ */ new Map(), Z = new Array(X + 1), b = X; b >= ce; b--)
          ee = v[b], x = N.get(ee), Z[b] = x === void 0 ? -1 : x, N.set(ee, b);
        for (x = ce; x <= j; x++)
          ee = n[x], b = N.get(ee), b !== void 0 && b !== -1 ? (U[b] = a[x], K[b] = l[x], h && (z[b] = h[x]), b = Z[b], N.set(ee, b)) : l[x]();
        for (b = ce; b < B; b++)
          b in U ? (a[b] = U[b], l[b] = K[b], h && (h[b] = z[b], h[b](b))) : a[b] = v1(L);
        a = a.slice(0, d = B), n = v.slice(0);
      }
      return a;
    });
    function L(B) {
      if (l[b] = B, h) {
        const [N, Z] = M(b);
        return h[b] = Z, t(v[b], N);
      }
      return t(v[b]);
    }
  };
}
function w(e, t) {
  return lt(() => e(t || {}));
}
function H1() {
  return !0;
}
const F9 = {
  get(e, t, r) {
    return t === Pn ? r : e.get(t);
  },
  has(e, t) {
    return t === Pn ? !0 : e.has(t);
  },
  set: H1,
  deleteProperty: H1,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: H1,
      deleteProperty: H1
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function Ln(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function ao(...e) {
  let t = !1;
  for (let n = 0; n < e.length; n++) {
    const a = e[n];
    t = t || !!a && Pn in a, e[n] = typeof a == "function" ? (t = !0, Y(a)) : a;
  }
  if (t)
    return new Proxy({
      get(n) {
        for (let a = e.length - 1; a >= 0; a--) {
          const l = Ln(e[a])[n];
          if (l !== void 0)
            return l;
        }
      },
      has(n) {
        for (let a = e.length - 1; a >= 0; a--)
          if (n in Ln(e[a]))
            return !0;
        return !1;
      },
      keys() {
        const n = [];
        for (let a = 0; a < e.length; a++)
          n.push(...Object.keys(Ln(e[a])));
        return [...new Set(n)];
      }
    }, F9);
  const r = {};
  for (let n = e.length - 1; n >= 0; n--)
    if (e[n]) {
      const a = Object.getOwnPropertyDescriptors(e[n]);
      for (const l in a)
        l in r || Object.defineProperty(r, l, {
          enumerable: !0,
          get() {
            for (let d = e.length - 1; d >= 0; d--) {
              const h = (e[d] || {})[l];
              if (h !== void 0)
                return h;
            }
          }
        });
    }
  return r;
}
function b1(e) {
  const t = "fallback" in e && {
    fallback: () => e.fallback
  };
  return Y(B9(() => e.each, e.children, t || void 0));
}
function le(e) {
  let t = !1;
  const r = e.keyed, n = Y(() => e.when, void 0, {
    equals: (a, l) => t ? a === l : !a == !l
  });
  return Y(() => {
    const a = n();
    if (a) {
      const l = e.children, d = typeof l == "function" && l.length > 0;
      return t = r || d, d ? lt(() => l(a)) : l;
    }
    return e.fallback;
  }, void 0, void 0);
}
function U9(e, t, r) {
  let n = r.length, a = t.length, l = n, d = 0, h = 0, v = t[a - 1].nextSibling, x = null;
  for (; d < a || h < l; ) {
    if (t[d] === r[h]) {
      d++, h++;
      continue;
    }
    for (; t[a - 1] === r[l - 1]; )
      a--, l--;
    if (a === d) {
      const b = l < n ? h ? r[h - 1].nextSibling : r[l - h] : v;
      for (; h < l; )
        e.insertBefore(r[h++], b);
    } else if (l === h)
      for (; d < a; )
        (!x || !x.has(t[d])) && t[d].remove(), d++;
    else if (t[d] === r[l - 1] && r[h] === t[a - 1]) {
      const b = t[--a].nextSibling;
      e.insertBefore(r[h++], t[d++].nextSibling), e.insertBefore(r[--l], b), t[a] = r[l];
    } else {
      if (!x) {
        x = /* @__PURE__ */ new Map();
        let L = h;
        for (; L < l; )
          x.set(r[L], L++);
      }
      const b = x.get(t[d]);
      if (b != null)
        if (h < b && b < l) {
          let L = d, B = 1, N;
          for (; ++L < a && L < l && !((N = x.get(t[L])) == null || N !== b + B); )
            B++;
          if (B > b - h) {
            const Z = t[d];
            for (; h < b; )
              e.insertBefore(r[h++], Z);
          } else
            e.replaceChild(r[h++], t[d++]);
        } else
          d++;
      else
        t[d++].remove();
    }
  }
}
const i0 = "_$DX_DELEGATE";
function z9(e, t, r, n = {}) {
  let a;
  return v1((l) => {
    a = l, t === document ? e() : C(t, e(), t.firstChild ? null : void 0, r);
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
function je(e, t = window.document) {
  const r = t[i0] || (t[i0] = /* @__PURE__ */ new Set());
  for (let n = 0, a = e.length; n < a; n++) {
    const l = e[n];
    r.has(l) || (r.add(l), t.addEventListener(l, V9));
  }
}
function Ie(e, t, r) {
  r == null ? e.removeAttribute(t) : e.setAttribute(t, r);
}
function fe(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function st(e, t, r, n) {
  if (n)
    Array.isArray(r) ? (e[`$$${t}`] = r[0], e[`$$${t}Data`] = r[1]) : e[`$$${t}`] = r;
  else if (Array.isArray(r)) {
    const a = r[0];
    e.addEventListener(t, r[0] = (l) => a.call(e, r[1], l));
  } else
    e.addEventListener(t, r);
}
function Bt(e, t, r) {
  if (!t)
    return r ? Ie(e, "style") : t;
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
function xt(e, t, r) {
  return lt(() => e(t, r));
}
function C(e, t, r, n) {
  if (r !== void 0 && !n && (n = []), typeof t != "function")
    return on(e, t, n, r);
  V((a) => on(e, t(), a, r), n);
}
function V9(e) {
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
  }), Ee.registry && !Ee.done && (Ee.done = !0, document.querySelectorAll("[id^=pl-]").forEach((n) => {
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
function on(e, t, r, n, a) {
  for (Ee.context && !r && (r = [...e.childNodes]); typeof r == "function"; )
    r = r();
  if (t === r)
    return r;
  const l = typeof t, d = n !== void 0;
  if (e = d && r[0] && r[0].parentNode || e, l === "string" || l === "number") {
    if (Ee.context)
      return r;
    if (l === "number" && (t = t.toString()), d) {
      let h = r[0];
      h && h.nodeType === 3 ? h.data = t : h = document.createTextNode(t), r = Rt(e, r, n, h);
    } else
      r !== "" && typeof r == "string" ? r = e.firstChild.data = t : r = e.textContent = t;
  } else if (t == null || l === "boolean") {
    if (Ee.context)
      return r;
    r = Rt(e, r, n);
  } else {
    if (l === "function")
      return V(() => {
        let h = t();
        for (; typeof h == "function"; )
          h = h();
        r = on(e, h, r, n);
      }), () => r;
    if (Array.isArray(t)) {
      const h = [], v = r && Array.isArray(r);
      if (Dn(h, t, r, a))
        return V(() => r = on(e, h, r, n, !0)), () => r;
      if (Ee.context) {
        if (!h.length)
          return r;
        for (let x = 0; x < h.length; x++)
          if (h[x].parentNode)
            return r = h;
      }
      if (h.length === 0) {
        if (r = Rt(e, r, n), d)
          return r;
      } else
        v ? r.length === 0 ? a0(e, h, n) : U9(e, r, h) : (r && Rt(e), a0(e, h));
      r = h;
    } else if (t instanceof Node) {
      if (Ee.context && t.parentNode)
        return r = d ? [t] : t;
      if (Array.isArray(r)) {
        if (d)
          return r = Rt(e, r, n, t);
        Rt(e, r, null, t);
      } else
        r == null || r === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      r = t;
    }
  }
  return r;
}
function Dn(e, t, r, n) {
  let a = !1;
  for (let l = 0, d = t.length; l < d; l++) {
    let h = t[l], v = r && r[l];
    if (h instanceof Node)
      e.push(h);
    else if (!(h == null || h === !0 || h === !1))
      if (Array.isArray(h))
        a = Dn(e, h, v) || a;
      else if (typeof h == "function")
        if (n) {
          for (; typeof h == "function"; )
            h = h();
          a = Dn(e, Array.isArray(h) ? h : [h], Array.isArray(v) ? v : [v]) || a;
        } else
          e.push(h), a = !0;
      else {
        const x = String(h);
        v && v.nodeType === 3 && v.data === x ? e.push(v) : e.push(document.createTextNode(x));
      }
  }
  return a;
}
function a0(e, t, r = null) {
  for (let n = 0, a = t.length; n < a; n++)
    e.insertBefore(t[n], r);
}
function Rt(e, t, r, n) {
  if (r === void 0)
    return e.textContent = "";
  const a = n || document.createTextNode("");
  if (t.length) {
    let l = !1;
    for (let d = t.length - 1; d >= 0; d--) {
      const h = t[d];
      if (a !== h) {
        const v = h.parentNode === e;
        !l && !d ? v ? e.replaceChild(a, h) : e.insertBefore(a, r) : v && h.remove();
      } else
        l = !0;
    }
  } else
    e.insertBefore(a, r);
  return [a];
}
const K9 = "http://www.w3.org/2000/svg";
function R9(e, t = !1) {
  return t ? document.createElementNS(K9, e) : document.createElement(e);
}
function j9(e) {
  const {
    useShadow: t
  } = e, r = document.createTextNode(""), n = e.mount || document.body;
  function a() {
    if (Ee.context) {
      const [l, d] = M(!1);
      return queueMicrotask(() => d(!0)), () => l() && e.children;
    } else
      return () => e.children;
  }
  if (n instanceof HTMLHeadElement) {
    const [l, d] = M(!1), h = () => d(!0);
    v1((v) => C(n, () => l() ? v() : a()(), null)), Et(() => {
      Ee.context ? queueMicrotask(h) : h();
    });
  } else {
    const l = R9(e.isSVG ? "g" : "div", e.isSVG), d = t && l.attachShadow ? l.attachShadow({
      mode: "open"
    }) : l;
    Object.defineProperty(l, "_$host", {
      get() {
        return r.parentNode;
      },
      configurable: !0
    }), C(d, a()), n.appendChild(l), e.ref && e.ref(l), Et(() => n.removeChild(l));
  }
  return r;
}
var q1 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function so(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Q9 = typeof q1 == "object" && q1 && q1.Object === Object && q1, lo = Q9, Z9 = lo, H9 = typeof self == "object" && self && self.Object === Object && self, q9 = Z9 || H9 || Function("return this")(), ct = q9, Y9 = ct, W9 = Y9.Symbol, hn = W9, s0 = hn, co = Object.prototype, G9 = co.hasOwnProperty, X9 = co.toString, y1 = s0 ? s0.toStringTag : void 0;
function J9(e) {
  var t = G9.call(e, y1), r = e[y1];
  try {
    e[y1] = void 0;
    var n = !0;
  } catch {
  }
  var a = X9.call(e);
  return n && (t ? e[y1] = r : delete e[y1]), a;
}
var ei = J9, ti = Object.prototype, ni = ti.toString;
function ri(e) {
  return ni.call(e);
}
var oi = ri, l0 = hn, ii = ei, ai = oi, si = "[object Null]", li = "[object Undefined]", c0 = l0 ? l0.toStringTag : void 0;
function ci(e) {
  return e == null ? e === void 0 ? li : si : c0 && c0 in Object(e) ? ii(e) : ai(e);
}
var $1 = ci;
function ui(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Ht = ui, di = $1, hi = Ht, fi = "[object AsyncFunction]", gi = "[object Function]", mi = "[object GeneratorFunction]", yi = "[object Proxy]";
function Ci(e) {
  if (!hi(e))
    return !1;
  var t = di(e);
  return t == gi || t == mi || t == fi || t == yi;
}
var uo = Ci, pi = ct, vi = pi["__core-js_shared__"], bi = vi, wn = bi, u0 = function() {
  var e = /[^.]+$/.exec(wn && wn.keys && wn.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function $i(e) {
  return !!u0 && u0 in e;
}
var _i = $i, ki = Function.prototype, xi = ki.toString;
function Li(e) {
  if (e != null) {
    try {
      return xi.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var ho = Li, wi = uo, Ti = _i, Ai = Ht, Mi = ho, Si = /[\\^$.*+?()[\]{}|]/g, Pi = /^\[object .+?Constructor\]$/, Di = Function.prototype, Ni = Object.prototype, Oi = Di.toString, Ii = Ni.hasOwnProperty, Ei = RegExp(
  "^" + Oi.call(Ii).replace(Si, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Bi(e) {
  if (!Ai(e) || Ti(e))
    return !1;
  var t = wi(e) ? Ei : Pi;
  return t.test(Mi(e));
}
var Fi = Bi;
function Ui(e, t) {
  return e == null ? void 0 : e[t];
}
var zi = Ui, Vi = Fi, Ki = zi;
function Ri(e, t) {
  var r = Ki(e, t);
  return Vi(r) ? r : void 0;
}
var Ft = Ri, ji = Ft, Qi = function() {
  try {
    var e = ji(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), Zi = Qi, d0 = Zi;
function Hi(e, t, r) {
  t == "__proto__" && d0 ? d0(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var fo = Hi;
function qi(e, t) {
  return e === t || e !== e && t !== t;
}
var go = qi, Yi = fo, Wi = go, Gi = Object.prototype, Xi = Gi.hasOwnProperty;
function Ji(e, t, r) {
  var n = e[t];
  (!(Xi.call(e, t) && Wi(n, r)) || r === void 0 && !(t in e)) && Yi(e, t, r);
}
var Kn = Ji, e5 = Array.isArray, qt = e5;
function t5(e) {
  return e != null && typeof e == "object";
}
var Yt = t5, n5 = $1, r5 = Yt, o5 = "[object Symbol]";
function i5(e) {
  return typeof e == "symbol" || r5(e) && n5(e) == o5;
}
var Rn = i5, a5 = qt, s5 = Rn, l5 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, c5 = /^\w*$/;
function u5(e, t) {
  if (a5(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || s5(e) ? !0 : c5.test(e) || !l5.test(e) || t != null && e in Object(t);
}
var d5 = u5, h5 = Ft, f5 = h5(Object, "create"), fn = f5, h0 = fn;
function g5() {
  this.__data__ = h0 ? h0(null) : {}, this.size = 0;
}
var m5 = g5;
function y5(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var C5 = y5, p5 = fn, v5 = "__lodash_hash_undefined__", b5 = Object.prototype, $5 = b5.hasOwnProperty;
function _5(e) {
  var t = this.__data__;
  if (p5) {
    var r = t[e];
    return r === v5 ? void 0 : r;
  }
  return $5.call(t, e) ? t[e] : void 0;
}
var k5 = _5, x5 = fn, L5 = Object.prototype, w5 = L5.hasOwnProperty;
function T5(e) {
  var t = this.__data__;
  return x5 ? t[e] !== void 0 : w5.call(t, e);
}
var A5 = T5, M5 = fn, S5 = "__lodash_hash_undefined__";
function P5(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = M5 && t === void 0 ? S5 : t, this;
}
var D5 = P5, N5 = m5, O5 = C5, I5 = k5, E5 = A5, B5 = D5;
function Wt(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Wt.prototype.clear = N5;
Wt.prototype.delete = O5;
Wt.prototype.get = I5;
Wt.prototype.has = E5;
Wt.prototype.set = B5;
var F5 = Wt;
function U5() {
  this.__data__ = [], this.size = 0;
}
var z5 = U5, V5 = go;
function K5(e, t) {
  for (var r = e.length; r--; )
    if (V5(e[r][0], t))
      return r;
  return -1;
}
var gn = K5, R5 = gn, j5 = Array.prototype, Q5 = j5.splice;
function Z5(e) {
  var t = this.__data__, r = R5(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : Q5.call(t, r, 1), --this.size, !0;
}
var H5 = Z5, q5 = gn;
function Y5(e) {
  var t = this.__data__, r = q5(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var W5 = Y5, G5 = gn;
function X5(e) {
  return G5(this.__data__, e) > -1;
}
var J5 = X5, ea = gn;
function ta(e, t) {
  var r = this.__data__, n = ea(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
var na = ta, ra = z5, oa = H5, ia = W5, aa = J5, sa = na;
function Gt(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Gt.prototype.clear = ra;
Gt.prototype.delete = oa;
Gt.prototype.get = ia;
Gt.prototype.has = aa;
Gt.prototype.set = sa;
var mn = Gt, la = Ft, ca = ct, ua = la(ca, "Map"), jn = ua, f0 = F5, da = mn, ha = jn;
function fa() {
  this.size = 0, this.__data__ = {
    hash: new f0(),
    map: new (ha || da)(),
    string: new f0()
  };
}
var ga = fa;
function ma(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var ya = ma, Ca = ya;
function pa(e, t) {
  var r = e.__data__;
  return Ca(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var yn = pa, va = yn;
function ba(e) {
  var t = va(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var $a = ba, _a = yn;
function ka(e) {
  return _a(this, e).get(e);
}
var xa = ka, La = yn;
function wa(e) {
  return La(this, e).has(e);
}
var Ta = wa, Aa = yn;
function Ma(e, t) {
  var r = Aa(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
var Sa = Ma, Pa = ga, Da = $a, Na = xa, Oa = Ta, Ia = Sa;
function Xt(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Xt.prototype.clear = Pa;
Xt.prototype.delete = Da;
Xt.prototype.get = Na;
Xt.prototype.has = Oa;
Xt.prototype.set = Ia;
var mo = Xt, yo = mo, Ea = "Expected a function";
function Qn(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Ea);
  var r = function() {
    var n = arguments, a = t ? t.apply(this, n) : n[0], l = r.cache;
    if (l.has(a))
      return l.get(a);
    var d = e.apply(this, n);
    return r.cache = l.set(a, d) || l, d;
  };
  return r.cache = new (Qn.Cache || yo)(), r;
}
Qn.Cache = yo;
var Ba = Qn, Fa = Ba, Ua = 500;
function za(e) {
  var t = Fa(e, function(n) {
    return r.size === Ua && r.clear(), n;
  }), r = t.cache;
  return t;
}
var Va = za, Ka = Va, Ra = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, ja = /\\(\\)?/g, Qa = Ka(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(Ra, function(r, n, a, l) {
    t.push(a ? l.replace(ja, "$1") : n || r);
  }), t;
}), Za = Qa;
function Ha(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, a = Array(n); ++r < n; )
    a[r] = t(e[r], r, e);
  return a;
}
var qa = Ha, g0 = hn, Ya = qa, Wa = qt, Ga = Rn, Xa = 1 / 0, m0 = g0 ? g0.prototype : void 0, y0 = m0 ? m0.toString : void 0;
function Co(e) {
  if (typeof e == "string")
    return e;
  if (Wa(e))
    return Ya(e, Co) + "";
  if (Ga(e))
    return y0 ? y0.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -Xa ? "-0" : t;
}
var Ja = Co, e6 = Ja;
function t6(e) {
  return e == null ? "" : e6(e);
}
var n6 = t6, r6 = qt, o6 = d5, i6 = Za, a6 = n6;
function s6(e, t) {
  return r6(e) ? e : o6(e, t) ? [e] : i6(a6(e));
}
var l6 = s6, c6 = 9007199254740991, u6 = /^(?:0|[1-9]\d*)$/;
function d6(e, t) {
  var r = typeof e;
  return t = t ?? c6, !!t && (r == "number" || r != "symbol" && u6.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var po = d6, h6 = Rn, f6 = 1 / 0;
function g6(e) {
  if (typeof e == "string" || h6(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -f6 ? "-0" : t;
}
var m6 = g6, y6 = Kn, C6 = l6, p6 = po, C0 = Ht, v6 = m6;
function b6(e, t, r, n) {
  if (!C0(e))
    return e;
  t = C6(t, e);
  for (var a = -1, l = t.length, d = l - 1, h = e; h != null && ++a < l; ) {
    var v = v6(t[a]), x = r;
    if (v === "__proto__" || v === "constructor" || v === "prototype")
      return e;
    if (a != d) {
      var b = h[v];
      x = n ? n(b, v, h) : void 0, x === void 0 && (x = C0(b) ? b : p6(t[a + 1]) ? [] : {});
    }
    y6(h, v, x), h = h[v];
  }
  return e;
}
var $6 = b6, _6 = $6;
function k6(e, t, r) {
  return e == null ? e : _6(e, t, r);
}
var x6 = k6;
const nt = /* @__PURE__ */ so(x6);
var L6 = mn;
function w6() {
  this.__data__ = new L6(), this.size = 0;
}
var T6 = w6;
function A6(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
var M6 = A6;
function S6(e) {
  return this.__data__.get(e);
}
var P6 = S6;
function D6(e) {
  return this.__data__.has(e);
}
var N6 = D6, O6 = mn, I6 = jn, E6 = mo, B6 = 200;
function F6(e, t) {
  var r = this.__data__;
  if (r instanceof O6) {
    var n = r.__data__;
    if (!I6 || n.length < B6 - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new E6(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
var U6 = F6, z6 = mn, V6 = T6, K6 = M6, R6 = P6, j6 = N6, Q6 = U6;
function Jt(e) {
  var t = this.__data__ = new z6(e);
  this.size = t.size;
}
Jt.prototype.clear = V6;
Jt.prototype.delete = K6;
Jt.prototype.get = R6;
Jt.prototype.has = j6;
Jt.prototype.set = Q6;
var Z6 = Jt;
function H6(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var q6 = H6, Y6 = Kn, W6 = fo;
function G6(e, t, r, n) {
  var a = !r;
  r || (r = {});
  for (var l = -1, d = t.length; ++l < d; ) {
    var h = t[l], v = n ? n(r[h], e[h], h, r, e) : void 0;
    v === void 0 && (v = e[h]), a ? W6(r, h, v) : Y6(r, h, v);
  }
  return r;
}
var Cn = G6;
function X6(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var J6 = X6, e2 = $1, t2 = Yt, n2 = "[object Arguments]";
function r2(e) {
  return t2(e) && e2(e) == n2;
}
var o2 = r2, p0 = o2, i2 = Yt, vo = Object.prototype, a2 = vo.hasOwnProperty, s2 = vo.propertyIsEnumerable, l2 = p0(function() {
  return arguments;
}()) ? p0 : function(e) {
  return i2(e) && a2.call(e, "callee") && !s2.call(e, "callee");
}, c2 = l2, an = { exports: {} };
function u2() {
  return !1;
}
var d2 = u2;
an.exports;
(function(e, t) {
  var r = ct, n = d2, a = t && !t.nodeType && t, l = a && !0 && e && !e.nodeType && e, d = l && l.exports === a, h = d ? r.Buffer : void 0, v = h ? h.isBuffer : void 0, x = v || n;
  e.exports = x;
})(an, an.exports);
var bo = an.exports, h2 = 9007199254740991;
function f2(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= h2;
}
var $o = f2, g2 = $1, m2 = $o, y2 = Yt, C2 = "[object Arguments]", p2 = "[object Array]", v2 = "[object Boolean]", b2 = "[object Date]", $2 = "[object Error]", _2 = "[object Function]", k2 = "[object Map]", x2 = "[object Number]", L2 = "[object Object]", w2 = "[object RegExp]", T2 = "[object Set]", A2 = "[object String]", M2 = "[object WeakMap]", S2 = "[object ArrayBuffer]", P2 = "[object DataView]", D2 = "[object Float32Array]", N2 = "[object Float64Array]", O2 = "[object Int8Array]", I2 = "[object Int16Array]", E2 = "[object Int32Array]", B2 = "[object Uint8Array]", F2 = "[object Uint8ClampedArray]", U2 = "[object Uint16Array]", z2 = "[object Uint32Array]", ke = {};
ke[D2] = ke[N2] = ke[O2] = ke[I2] = ke[E2] = ke[B2] = ke[F2] = ke[U2] = ke[z2] = !0;
ke[C2] = ke[p2] = ke[S2] = ke[v2] = ke[P2] = ke[b2] = ke[$2] = ke[_2] = ke[k2] = ke[x2] = ke[L2] = ke[w2] = ke[T2] = ke[A2] = ke[M2] = !1;
function V2(e) {
  return y2(e) && m2(e.length) && !!ke[g2(e)];
}
var K2 = V2;
function R2(e) {
  return function(t) {
    return e(t);
  };
}
var Zn = R2, sn = { exports: {} };
sn.exports;
(function(e, t) {
  var r = lo, n = t && !t.nodeType && t, a = n && !0 && e && !e.nodeType && e, l = a && a.exports === n, d = l && r.process, h = function() {
    try {
      var v = a && a.require && a.require("util").types;
      return v || d && d.binding && d.binding("util");
    } catch {
    }
  }();
  e.exports = h;
})(sn, sn.exports);
var Hn = sn.exports, j2 = K2, Q2 = Zn, v0 = Hn, b0 = v0 && v0.isTypedArray, Z2 = b0 ? Q2(b0) : j2, H2 = Z2, q2 = J6, Y2 = c2, W2 = qt, G2 = bo, X2 = po, J2 = H2, es = Object.prototype, ts = es.hasOwnProperty;
function ns(e, t) {
  var r = W2(e), n = !r && Y2(e), a = !r && !n && G2(e), l = !r && !n && !a && J2(e), d = r || n || a || l, h = d ? q2(e.length, String) : [], v = h.length;
  for (var x in e)
    (t || ts.call(e, x)) && !(d && // Safari 9 has enumerable `arguments.length` in strict mode.
    (x == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    a && (x == "offset" || x == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    l && (x == "buffer" || x == "byteLength" || x == "byteOffset") || // Skip index properties.
    X2(x, v))) && h.push(x);
  return h;
}
var _o = ns, rs = Object.prototype;
function os(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || rs;
  return e === r;
}
var qn = os;
function is(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var ko = is, as = ko, ss = as(Object.keys, Object), ls = ss, cs = qn, us = ls, ds = Object.prototype, hs = ds.hasOwnProperty;
function fs(e) {
  if (!cs(e))
    return us(e);
  var t = [];
  for (var r in Object(e))
    hs.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
var gs = fs, ms = uo, ys = $o;
function Cs(e) {
  return e != null && ys(e.length) && !ms(e);
}
var xo = Cs, ps = _o, vs = gs, bs = xo;
function $s(e) {
  return bs(e) ? ps(e) : vs(e);
}
var Yn = $s, _s = Cn, ks = Yn;
function xs(e, t) {
  return e && _s(t, ks(t), e);
}
var Ls = xs;
function ws(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var Ts = ws, As = Ht, Ms = qn, Ss = Ts, Ps = Object.prototype, Ds = Ps.hasOwnProperty;
function Ns(e) {
  if (!As(e))
    return Ss(e);
  var t = Ms(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !Ds.call(e, n)) || r.push(n);
  return r;
}
var Os = Ns, Is = _o, Es = Os, Bs = xo;
function Fs(e) {
  return Bs(e) ? Is(e, !0) : Es(e);
}
var Wn = Fs, Us = Cn, zs = Wn;
function Vs(e, t) {
  return e && Us(t, zs(t), e);
}
var Ks = Vs, ln = { exports: {} };
ln.exports;
(function(e, t) {
  var r = ct, n = t && !t.nodeType && t, a = n && !0 && e && !e.nodeType && e, l = a && a.exports === n, d = l ? r.Buffer : void 0, h = d ? d.allocUnsafe : void 0;
  function v(x, b) {
    if (b)
      return x.slice();
    var L = x.length, B = h ? h(L) : new x.constructor(L);
    return x.copy(B), B;
  }
  e.exports = v;
})(ln, ln.exports);
var Rs = ln.exports;
function js(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
var Qs = js;
function Zs(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, a = 0, l = []; ++r < n; ) {
    var d = e[r];
    t(d, r, e) && (l[a++] = d);
  }
  return l;
}
var Hs = Zs;
function qs() {
  return [];
}
var Lo = qs, Ys = Hs, Ws = Lo, Gs = Object.prototype, Xs = Gs.propertyIsEnumerable, $0 = Object.getOwnPropertySymbols, Js = $0 ? function(e) {
  return e == null ? [] : (e = Object(e), Ys($0(e), function(t) {
    return Xs.call(e, t);
  }));
} : Ws, Gn = Js, e3 = Cn, t3 = Gn;
function n3(e, t) {
  return e3(e, t3(e), t);
}
var r3 = n3;
function o3(e, t) {
  for (var r = -1, n = t.length, a = e.length; ++r < n; )
    e[a + r] = t[r];
  return e;
}
var wo = o3, i3 = ko, a3 = i3(Object.getPrototypeOf, Object), To = a3, s3 = wo, l3 = To, c3 = Gn, u3 = Lo, d3 = Object.getOwnPropertySymbols, h3 = d3 ? function(e) {
  for (var t = []; e; )
    s3(t, c3(e)), e = l3(e);
  return t;
} : u3, Ao = h3, f3 = Cn, g3 = Ao;
function m3(e, t) {
  return f3(e, g3(e), t);
}
var y3 = m3, C3 = wo, p3 = qt;
function v3(e, t, r) {
  var n = t(e);
  return p3(e) ? n : C3(n, r(e));
}
var Mo = v3, b3 = Mo, $3 = Gn, _3 = Yn;
function k3(e) {
  return b3(e, _3, $3);
}
var x3 = k3, L3 = Mo, w3 = Ao, T3 = Wn;
function A3(e) {
  return L3(e, T3, w3);
}
var M3 = A3, S3 = Ft, P3 = ct, D3 = S3(P3, "DataView"), N3 = D3, O3 = Ft, I3 = ct, E3 = O3(I3, "Promise"), B3 = E3, F3 = Ft, U3 = ct, z3 = F3(U3, "Set"), V3 = z3, K3 = Ft, R3 = ct, j3 = K3(R3, "WeakMap"), Q3 = j3, Nn = N3, On = jn, In = B3, En = V3, Bn = Q3, So = $1, e1 = ho, _0 = "[object Map]", Z3 = "[object Object]", k0 = "[object Promise]", x0 = "[object Set]", L0 = "[object WeakMap]", w0 = "[object DataView]", H3 = e1(Nn), q3 = e1(On), Y3 = e1(In), W3 = e1(En), G3 = e1(Bn), Nt = So;
(Nn && Nt(new Nn(new ArrayBuffer(1))) != w0 || On && Nt(new On()) != _0 || In && Nt(In.resolve()) != k0 || En && Nt(new En()) != x0 || Bn && Nt(new Bn()) != L0) && (Nt = function(e) {
  var t = So(e), r = t == Z3 ? e.constructor : void 0, n = r ? e1(r) : "";
  if (n)
    switch (n) {
      case H3:
        return w0;
      case q3:
        return _0;
      case Y3:
        return k0;
      case W3:
        return x0;
      case G3:
        return L0;
    }
  return t;
});
var Xn = Nt, X3 = Object.prototype, J3 = X3.hasOwnProperty;
function e8(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && J3.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
var t8 = e8, n8 = ct, r8 = n8.Uint8Array, o8 = r8, T0 = o8;
function i8(e) {
  var t = new e.constructor(e.byteLength);
  return new T0(t).set(new T0(e)), t;
}
var Jn = i8, a8 = Jn;
function s8(e, t) {
  var r = t ? a8(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var l8 = s8, c8 = /\w*$/;
function u8(e) {
  var t = new e.constructor(e.source, c8.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var d8 = u8, A0 = hn, M0 = A0 ? A0.prototype : void 0, S0 = M0 ? M0.valueOf : void 0;
function h8(e) {
  return S0 ? Object(S0.call(e)) : {};
}
var f8 = h8, g8 = Jn;
function m8(e, t) {
  var r = t ? g8(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
var y8 = m8, C8 = Jn, p8 = l8, v8 = d8, b8 = f8, $8 = y8, _8 = "[object Boolean]", k8 = "[object Date]", x8 = "[object Map]", L8 = "[object Number]", w8 = "[object RegExp]", T8 = "[object Set]", A8 = "[object String]", M8 = "[object Symbol]", S8 = "[object ArrayBuffer]", P8 = "[object DataView]", D8 = "[object Float32Array]", N8 = "[object Float64Array]", O8 = "[object Int8Array]", I8 = "[object Int16Array]", E8 = "[object Int32Array]", B8 = "[object Uint8Array]", F8 = "[object Uint8ClampedArray]", U8 = "[object Uint16Array]", z8 = "[object Uint32Array]";
function V8(e, t, r) {
  var n = e.constructor;
  switch (t) {
    case S8:
      return C8(e);
    case _8:
    case k8:
      return new n(+e);
    case P8:
      return p8(e, r);
    case D8:
    case N8:
    case O8:
    case I8:
    case E8:
    case B8:
    case F8:
    case U8:
    case z8:
      return $8(e, r);
    case x8:
      return new n();
    case L8:
    case A8:
      return new n(e);
    case w8:
      return v8(e);
    case T8:
      return new n();
    case M8:
      return b8(e);
  }
}
var K8 = V8, R8 = Ht, P0 = Object.create, j8 = function() {
  function e() {
  }
  return function(t) {
    if (!R8(t))
      return {};
    if (P0)
      return P0(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}(), Q8 = j8, Z8 = Q8, H8 = To, q8 = qn;
function Y8(e) {
  return typeof e.constructor == "function" && !q8(e) ? Z8(H8(e)) : {};
}
var W8 = Y8, G8 = Xn, X8 = Yt, J8 = "[object Map]";
function e7(e) {
  return X8(e) && G8(e) == J8;
}
var t7 = e7, n7 = t7, r7 = Zn, D0 = Hn, N0 = D0 && D0.isMap, o7 = N0 ? r7(N0) : n7, i7 = o7, a7 = Xn, s7 = Yt, l7 = "[object Set]";
function c7(e) {
  return s7(e) && a7(e) == l7;
}
var u7 = c7, d7 = u7, h7 = Zn, O0 = Hn, I0 = O0 && O0.isSet, f7 = I0 ? h7(I0) : d7, g7 = f7, m7 = Z6, y7 = q6, C7 = Kn, p7 = Ls, v7 = Ks, b7 = Rs, $7 = Qs, _7 = r3, k7 = y3, x7 = x3, L7 = M3, w7 = Xn, T7 = t8, A7 = K8, M7 = W8, S7 = qt, P7 = bo, D7 = i7, N7 = Ht, O7 = g7, I7 = Yn, E7 = Wn, B7 = 1, F7 = 2, U7 = 4, Po = "[object Arguments]", z7 = "[object Array]", V7 = "[object Boolean]", K7 = "[object Date]", R7 = "[object Error]", Do = "[object Function]", j7 = "[object GeneratorFunction]", Q7 = "[object Map]", Z7 = "[object Number]", No = "[object Object]", H7 = "[object RegExp]", q7 = "[object Set]", Y7 = "[object String]", W7 = "[object Symbol]", G7 = "[object WeakMap]", X7 = "[object ArrayBuffer]", J7 = "[object DataView]", el = "[object Float32Array]", tl = "[object Float64Array]", nl = "[object Int8Array]", rl = "[object Int16Array]", ol = "[object Int32Array]", il = "[object Uint8Array]", al = "[object Uint8ClampedArray]", sl = "[object Uint16Array]", ll = "[object Uint32Array]", _e = {};
_e[Po] = _e[z7] = _e[X7] = _e[J7] = _e[V7] = _e[K7] = _e[el] = _e[tl] = _e[nl] = _e[rl] = _e[ol] = _e[Q7] = _e[Z7] = _e[No] = _e[H7] = _e[q7] = _e[Y7] = _e[W7] = _e[il] = _e[al] = _e[sl] = _e[ll] = !0;
_e[R7] = _e[Do] = _e[G7] = !1;
function J1(e, t, r, n, a, l) {
  var d, h = t & B7, v = t & F7, x = t & U7;
  if (r && (d = a ? r(e, n, a, l) : r(e)), d !== void 0)
    return d;
  if (!N7(e))
    return e;
  var b = S7(e);
  if (b) {
    if (d = T7(e), !h)
      return $7(e, d);
  } else {
    var L = w7(e), B = L == Do || L == j7;
    if (P7(e))
      return b7(e, h);
    if (L == No || L == Po || B && !a) {
      if (d = v || B ? {} : M7(e), !h)
        return v ? k7(e, v7(d, e)) : _7(e, p7(d, e));
    } else {
      if (!_e[L])
        return a ? e : {};
      d = A7(e, L, h);
    }
  }
  l || (l = new m7());
  var N = l.get(e);
  if (N)
    return N;
  l.set(e, d), O7(e) ? e.forEach(function(K) {
    d.add(J1(K, t, r, K, e, l));
  }) : D7(e) && e.forEach(function(K, z) {
    d.set(z, J1(K, t, r, z, e, l));
  });
  var Z = x ? v ? L7 : x7 : v ? E7 : I7, U = b ? void 0 : Z(e);
  return y7(U || e, function(K, z) {
    U && (z = K, K = e[z]), C7(d, z, J1(K, t, r, z, e, l));
  }), d;
}
var cl = J1, ul = cl, dl = 1, hl = 4;
function fl(e) {
  return ul(e, dl | hl);
}
var gl = fl;
const ml = /* @__PURE__ */ so(gl), yl = /* @__PURE__ */ p("<button></button>"), Cl = (e) => (() => {
  const t = yl.cloneNode(!0);
  return st(t, "click", e.onClick, !0), C(t, () => e.children), V((r) => {
    const n = e.style, a = `klinecharts-pro-button ${e.type ?? "confirm"} ${e.class ?? ""}`;
    return r._v$ = Bt(t, n, r._v$), a !== r._v$2 && fe(t, r._v$2 = a), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
je(["click"]);
const pl = /* @__PURE__ */ p('<svg viewBox="0 0 1024 1024" class="icon"><path d="M810.666667 128H213.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v597.333334c0 46.933333 38.4 85.333333 85.333333 85.333333h597.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V213.333333c0-46.933333-38.4-85.333333-85.333333-85.333333z m-353.706667 567.04a42.496 42.496 0 0 1-60.16 0L243.626667 541.866667c-8.106667-8.106667-12.373333-18.773333-12.373334-29.866667s4.693333-22.186667 12.373334-29.866667a42.496 42.496 0 0 1 60.16 0L426.666667 604.586667l293.546666-293.546667a42.496 42.496 0 1 1 60.16 60.16l-323.413333 323.84z"></path></svg>'), vl = /* @__PURE__ */ p('<svg viewBox="0 0 1024 1024" class="icon"><path d="M245.333333 128h533.333334A117.333333 117.333333 0 0 1 896 245.333333v533.333334A117.333333 117.333333 0 0 1 778.666667 896H245.333333A117.333333 117.333333 0 0 1 128 778.666667V245.333333A117.333333 117.333333 0 0 1 245.333333 128z m0 64c-29.44 0-53.333333 23.893333-53.333333 53.333333v533.333334c0 29.44 23.893333 53.333333 53.333333 53.333333h533.333334c29.44 0 53.333333-23.893333 53.333333-53.333333V245.333333c0-29.44-23.893333-53.333333-53.333333-53.333333H245.333333z"></path></svg>'), bl = /* @__PURE__ */ p("<div></div>"), $l = /* @__PURE__ */ p('<span class="label"></span>'), _l = () => pl.cloneNode(!0), kl = () => vl.cloneNode(!0), E0 = (e) => {
  const [t, r] = M(e.checked ?? !1);
  return Re(() => {
    "checked" in e && r(e.checked);
  }), (() => {
    const n = bl.cloneNode(!0);
    return n.$$click = (a) => {
      const l = !t();
      e.onChange && e.onChange(l), r(l);
    }, C(n, (() => {
      const a = Y(() => !!t());
      return () => a() ? w(_l, {}) : w(kl, {});
    })(), null), C(n, (() => {
      const a = Y(() => !!e.label);
      return () => a() && (() => {
        const l = $l.cloneNode(!0);
        return C(l, () => e.label), l;
      })();
    })(), null), V((a) => {
      const l = e.style, d = `klinecharts-pro-checkbox ${t() && "checked" || ""} ${e.class || ""}`;
      return a._v$ = Bt(n, l, a._v$), d !== a._v$2 && fe(n, a._v$2 = d), a;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), n;
  })();
};
je(["click"]);
const xl = /* @__PURE__ */ p('<div class="klinecharts-pro-loading"><i class="circle1"></i><i class="circle2"></i><i class="circle3"></i></div>'), Oo = () => xl.cloneNode(!0), Ll = /* @__PURE__ */ p('<div class="klinecharts-pro-empty"><svg class="icon" viewBox="0 0 1024 1024"><path d="M855.6 427.2H168.5c-12.7 0-24.4 6.9-30.6 18L4.4 684.7C1.5 689.9 0 695.8 0 701.8v287.1c0 19.4 15.7 35.1 35.1 35.1H989c19.4 0 35.1-15.7 35.1-35.1V701.8c0-6-1.5-11.8-4.4-17.1L886.2 445.2c-6.2-11.1-17.9-18-30.6-18zM673.4 695.6c-16.5 0-30.8 11.5-34.3 27.7-12.7 58.5-64.8 102.3-127.2 102.3s-114.5-43.8-127.2-102.3c-3.5-16.1-17.8-27.7-34.3-27.7H119c-26.4 0-43.3-28-31.1-51.4l81.7-155.8c6.1-11.6 18-18.8 31.1-18.8h622.4c13 0 25 7.2 31.1 18.8l81.7 155.8c12.2 23.4-4.7 51.4-31.1 51.4H673.4zM819.9 209.5c-1-1.8-2.1-3.7-3.2-5.5-9.8-16.6-31.1-22.2-47.8-12.6L648.5 261c-17 9.8-22.7 31.6-12.6 48.4 0.9 1.4 1.7 2.9 2.5 4.4 9.5 17 31.2 22.8 48 13L807 257.3c16.7-9.7 22.4-31 12.9-47.8zM375.4 261.1L255 191.6c-16.7-9.6-38-4-47.8 12.6-1.1 1.8-2.1 3.6-3.2 5.5-9.5 16.8-3.8 38.1 12.9 47.8L337.3 327c16.9 9.7 38.6 4 48-13.1 0.8-1.5 1.7-2.9 2.5-4.4 10.2-16.8 4.5-38.6-12.4-48.4zM512 239.3h2.5c19.5 0.3 35.5-15.5 35.5-35.1v-139c0-19.3-15.6-34.9-34.8-35.1h-6.4C489.6 30.3 474 46 474 65.2v139c0 19.5 15.9 35.4 35.5 35.1h2.5z"></path></svg></div>'), wl = () => Ll.cloneNode(!0), Tl = /* @__PURE__ */ p("<ul></ul>"), Al = /* @__PURE__ */ p("<li></li>"), cn = (e) => (() => {
  const t = Tl.cloneNode(!0);
  return C(t, w(le, {
    get when() {
      return e.loading;
    },
    get children() {
      return w(Oo, {});
    }
  }), null), C(t, w(le, {
    get when() {
      var r;
      return !e.loading && !e.children && !((r = e.dataSource) != null && r.length);
    },
    get children() {
      return w(wl, {});
    }
  }), null), C(t, w(le, {
    get when() {
      return e.children;
    },
    get children() {
      return e.children;
    }
  }), null), C(t, w(le, {
    get when() {
      return !e.children;
    },
    get children() {
      var r;
      return (r = e.dataSource) == null ? void 0 : r.map((n) => {
        var a;
        return ((a = e.renderItem) == null ? void 0 : a.call(e, n)) ?? Al.cloneNode(!0);
      });
    }
  }), null), V((r) => {
    const n = e.style, a = `klinecharts-pro-list ${e.class ?? ""}`;
    return r._v$ = Bt(t, n, r._v$), a !== r._v$2 && fe(t, r._v$2 = a), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})(), Ml = /* @__PURE__ */ p('<div class="klinecharts-pro-modal"><div class="inner"><div class="title-container"><svg class="close-icon" viewBox="0 0 1024 1024"><path d="M934.184927 199.723787 622.457206 511.452531l311.727721 311.703161c14.334473 14.229073 23.069415 33.951253 23.069415 55.743582 0 43.430138-35.178197 78.660524-78.735226 78.660524-21.664416 0-41.361013-8.865925-55.642275-23.069415L511.149121 622.838388 199.420377 934.490384c-14.204513 14.20349-33.901111 23.069415-55.642275 23.069415-43.482327 0-78.737272-35.230386-78.737272-78.660524 0-21.792329 8.864902-41.513486 23.094998-55.743582l311.677579-311.703161L88.135828 199.723787c-14.230096-14.255679-23.094998-33.92567-23.094998-55.642275 0-43.430138 35.254945-78.762855 78.737272-78.762855 21.741163 0 41.437761 8.813736 55.642275 23.069415l311.727721 311.727721L822.876842 88.389096c14.281261-14.255679 33.977859-23.069415 55.642275-23.069415 43.557028 0 78.735226 35.332716 78.735226 78.762855C957.254342 165.798117 948.5194 185.468109 934.184927 199.723787"></path></svg></div><div class="content-container"></div></div></div>'), Sl = /* @__PURE__ */ p('<div class="button-container"></div>'), wt = (e) => (() => {
  const t = Ml.cloneNode(!0), r = t.firstChild, n = r.firstChild, a = n.firstChild, l = n.nextSibling;
  return t.$$click = (d) => {
    d.target === d.currentTarget && e.onClose && e.onClose();
  }, C(n, () => e.title, a), st(a, "click", e.onClose, !0), C(l, () => e.children), C(r, (() => {
    const d = Y(() => !!(e.buttons && e.buttons.length > 0));
    return () => d() && (() => {
      const h = Sl.cloneNode(!0);
      return C(h, () => e.buttons.map((v) => w(Cl, ao(v, {
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
      })))), V((v) => {
        const x = e.btnParentStyle, b = !!e.isMobile;
        return v._v$8 = Bt(h, x, v._v$8), b !== v._v$9 && h.classList.toggle("mobile-buttons", v._v$9 = b), v;
      }, {
        _v$8: void 0,
        _v$9: void 0
      }), h;
    })();
  })(), null), V((d) => {
    const h = !!e.isMobile, v = e.isMobile ? "100%" : `${e.width ?? 400}px`, x = (e.isMobile, "auto"), b = e.isMobile ? "60vh" : "90vh", L = !!e.isMobile, B = !!e.isMobile, N = !!e.isMobile;
    return h !== d._v$ && t.classList.toggle("mobile-modal", d._v$ = h), v !== d._v$2 && r.style.setProperty("width", d._v$2 = v), x !== d._v$3 && r.style.setProperty("height", d._v$3 = x), b !== d._v$4 && r.style.setProperty("max-height", d._v$4 = b), L !== d._v$5 && r.classList.toggle("mobile-inner", d._v$5 = L), B !== d._v$6 && n.classList.toggle("mobile-title", d._v$6 = B), N !== d._v$7 && l.classList.toggle("mobile-content", d._v$7 = N), d;
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
je(["click"]);
const Pl = /* @__PURE__ */ p('<div tabindex="0"><div class="selector-container"><span class="value"></span><i class="arrow"></i></div></div>'), Dl = /* @__PURE__ */ p('<div class="drop-down-container"><ul></ul></div>'), Nl = /* @__PURE__ */ p('<div><input type="text"></div>'), Ol = /* @__PURE__ */ p("<li></li>"), C1 = (e) => {
  const [t, r] = M(!1), [n, a] = M("");
  let l, d;
  const h = Y(() => {
    if (!e.dataSource || !e.searchable)
      return e.dataSource;
    const b = n().toLowerCase().trim();
    return b ? typeof e.dataSource[0] == "string" ? e.dataSource.filter((B) => B.toLowerCase().includes(b)) : e.dataSource.filter((B) => {
      var U, K;
      const N = ((U = B.text) == null ? void 0 : U.toString().toLowerCase()) || "", Z = ((K = B.key) == null ? void 0 : K.toLowerCase()) || "";
      return N.includes(b) || Z.includes(b);
    }) : e.dataSource;
  }), v = () => {
    const b = !t();
    r(b), a(""), b && e.searchable && setTimeout(() => l == null ? void 0 : l.focus(), 50);
  }, x = (b) => {
    const L = b.relatedTarget;
    d && L && d.contains(L) || (r(!1), a(""));
  };
  return (() => {
    const b = Pl.cloneNode(!0), L = b.firstChild, B = L.firstChild;
    b.addEventListener("blur", x), b.$$click = (Z) => {
      Z.stopPropagation(), v();
    };
    const N = d;
    return typeof N == "function" ? xt(N, b) : d = b, C(B, () => e.value), C(b, (() => {
      const Z = Y(() => !!(e.dataSource && e.dataSource.length > 0));
      return () => Z() && (() => {
        const U = Dl.cloneNode(!0), K = U.firstChild;
        return U.$$mousedown = (z) => z.preventDefault(), C(U, (() => {
          const z = Y(() => !!e.searchable);
          return () => z() && (() => {
            const ce = Nl.cloneNode(!0), j = ce.firstChild;
            ce.style.setProperty("padding", "8px"), ce.style.setProperty("border-bottom", "1px solid #333"), j.$$click = (ee) => ee.stopPropagation(), j.$$input = (ee) => a(ee.currentTarget.value);
            const X = l;
            return typeof X == "function" ? xt(X, j) : l = j, j.style.setProperty("width", "100%"), j.style.setProperty("padding", "6px 10px"), j.style.setProperty("border", "1px solid var(--klinecharts-pro-border-color)"), j.style.setProperty("border-radius", "4px"), j.style.setProperty("background-color", "var(--klinecharts-pro-popover-background-color)"), j.style.setProperty("color", "#fff"), j.style.setProperty("font-size", "13px"), j.style.setProperty("outline", "none"), V(() => Ie(j, "placeholder", e.searchPlaceholder || "Search...")), V(() => j.value = n()), ce;
          })();
        })(), K), C(K, () => {
          var z;
          return (z = h()) == null ? void 0 : z.map((ce) => {
            const X = ce[e.valueKey ?? "text"] ?? ce;
            return (() => {
              const ee = Ol.cloneNode(!0);
              return ee.$$click = (pe) => {
                var H;
                pe.stopPropagation(), e.value !== X && ((H = e.onSelected) == null || H.call(e, ce)), r(!1), a("");
              }, C(ee, X), V(() => ee.classList.toggle("selected", e.value === X)), ee;
            })();
          });
        }), U;
      })();
    })(), null), V((Z) => {
      const U = e.style, K = `klinecharts-pro-select ${e.class ?? ""} ${t() ? "klinecharts-pro-select-show" : ""}`;
      return Z._v$ = Bt(b, U, Z._v$), K !== Z._v$2 && fe(b, Z._v$2 = K), Z;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), b;
  })();
};
je(["click", "mousedown", "input"]);
const Il = /* @__PURE__ */ p('<span class="prefix"></span>'), El = /* @__PURE__ */ p('<span class="suffix"></span>'), Bl = /* @__PURE__ */ p('<div><input class="value"></div>'), Io = (e) => {
  const t = ao({
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER
  }, e);
  let r;
  const [n, a] = M("normal");
  return (() => {
    const l = Bl.cloneNode(!0), d = l.firstChild;
    return l.$$click = () => {
      r == null || r.focus();
    }, C(l, w(le, {
      get when() {
        return t.prefix;
      },
      get children() {
        const h = Il.cloneNode(!0);
        return C(h, () => t.prefix), h;
      }
    }), d), d.addEventListener("change", (h) => {
      var x, b;
      const v = h.target.value;
      if ("precision" in t) {
        let L;
        const B = Math.max(0, Math.floor(t.precision));
        B <= 0 ? L = new RegExp(/^[1-9]\d*$/) : L = new RegExp("^\\d+\\.?\\d{0," + B + "}$"), (v === "" || L.test(v) && +v >= t.min && +v <= t.max) && ((x = t.onChange) == null || x.call(t, v === "" ? v : +v));
      } else
        (b = t.onChange) == null || b.call(t, v);
    }), d.addEventListener("blur", () => {
      a("normal");
    }), d.addEventListener("focus", () => {
      a("focus");
    }), xt((h) => {
      r = h;
    }, d), C(l, w(le, {
      get when() {
        return t.suffix;
      },
      get children() {
        const h = El.cloneNode(!0);
        return C(h, () => t.suffix), h;
      }
    }), null), V((h) => {
      const v = t.style, x = `klinecharts-pro-input ${t.class ?? ""}`, b = n(), L = t.placeholder ?? "";
      return h._v$ = Bt(l, v, h._v$), x !== h._v$2 && fe(l, h._v$2 = x), b !== h._v$3 && Ie(l, "data-status", h._v$3 = b), L !== h._v$4 && Ie(d, "placeholder", h._v$4 = L), h;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0
    }), V(() => d.value = t.value), l;
  })();
};
je(["click"]);
const Fl = /* @__PURE__ */ p('<div><i class="thumb"></i></div>'), Ul = (e) => (() => {
  const t = Fl.cloneNode(!0);
  return t.$$click = (r) => {
    e.onChange && e.onChange();
  }, V((r) => {
    const n = e.style, a = `klinecharts-pro-switch ${e.open ? "turn-on" : "turn-off"} ${e.class ?? ""}`;
    return r._v$ = Bt(t, n, r._v$), a !== r._v$2 && fe(t, r._v$2 = a), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
je(["click"]);
let Te = null, B0 = !1;
function zl(e, t) {
  return e.x >= t.x && e.x <= t.x + t.width && e.y >= t.y && e.y <= t.y + t.height;
}
function Tn(e, t = "body") {
  var h, v, x;
  const r = Te;
  if (!r || !e)
    return e;
  const n = e.toLowerCase(), a = (h = r.upColor) == null ? void 0 : h.toLowerCase(), l = (v = r.downColor) == null ? void 0 : v.toLowerCase(), d = (x = r.noChangeColor) == null ? void 0 : x.toLowerCase();
  return n === a ? t === "border" ? r.borderUpColor ?? e : t === "wick" ? r.wickUpColor ?? e : e : n === l ? t === "border" ? r.borderDownColor ?? e : t === "wick" ? r.wickDownColor ?? e : e : n === d ? t === "border" ? r.borderNoChangeColor ?? e : t === "wick" ? r.wickNoChangeColor ?? e : e : e;
}
function Vl(e) {
  var n, a, l;
  const t = Te;
  if (!t || !e)
    return !1;
  const r = e.toLowerCase();
  return r === ((n = t.upColor) == null ? void 0 : n.toLowerCase()) || r === ((a = t.downColor) == null ? void 0 : a.toLowerCase()) || r === ((l = t.noChangeColor) == null ? void 0 : l.toLowerCase());
}
function Kl(e, t, r) {
  const { x: n, y: a, width: l, height: d } = t, h = r.style ?? m1.Fill, v = l <= 1.5 && d > 1, x = r.color ?? "currentColor", b = Tn(x, v ? "wick" : "body"), L = r.borderSize ?? 1, B = Tn(r.borderColor ?? "currentColor", "border"), N = r.borderStyle ?? ze.Solid, Z = r.borderRadius ?? 0, U = r.borderDashedValue ?? [2, 2];
  if (h === m1.Fill || r.style === m1.StrokeFill) {
    e.fillStyle = b, e.beginPath(), e.moveTo(n + Z, a), e.arcTo(n + l, a, n + l, a + d, Z), e.arcTo(n + l, a + d, n, a + d, Z), e.arcTo(n, a + d, n, a, Z), e.arcTo(n, a, n + l, a, Z), e.closePath(), e.fill();
    const K = Tn(x, "border");
    !v && l > 1.5 && Vl(x) && K && K !== x && (e.strokeStyle = K, e.lineWidth = 1, e.setLineDash([]), e.beginPath(), e.moveTo(n + Z, a), e.arcTo(n + l, a, n + l, a + d, Z), e.arcTo(n + l, a + d, n, a + d, Z), e.arcTo(n, a + d, n, a, Z), e.arcTo(n, a, n + l, a, Z), e.closePath(), e.stroke());
  }
  (h === m1.Stroke || r.style === m1.StrokeFill) && (e.strokeStyle = B, e.lineWidth = L, e.setLineDash(N === ze.Dashed ? U : []), e.beginPath(), e.moveTo(n + Z, a), e.arcTo(n + l, a, n + l, a + d, Z), e.arcTo(n + l, a + d, n, a + d, Z), e.arcTo(n, a + d, n, a, Z), e.arcTo(n, a, n + l, a, Z), e.closePath(), e.stroke());
}
function Rl() {
  B0 || (B0 = !0, o9({
    name: "rect",
    checkEventOn: zl,
    draw: Kl
  }));
}
function jt(e) {
  var r;
  const t = (r = e == null ? void 0 : e.candle) == null ? void 0 : r.bar;
  t && (Te = {
    ...Te ?? {},
    ...t,
    borderUpColor: t.borderUpColor ?? t.upColor ?? (Te == null ? void 0 : Te.borderUpColor),
    borderDownColor: t.borderDownColor ?? t.downColor ?? (Te == null ? void 0 : Te.borderDownColor),
    borderNoChangeColor: t.borderNoChangeColor ?? t.noChangeColor ?? (Te == null ? void 0 : Te.borderNoChangeColor),
    wickUpColor: t.wickUpColor ?? t.upColor ?? (Te == null ? void 0 : Te.wickUpColor),
    wickDownColor: t.wickDownColor ?? t.downColor ?? (Te == null ? void 0 : Te.wickDownColor),
    wickNoChangeColor: t.wickNoChangeColor ?? t.noChangeColor ?? (Te == null ? void 0 : Te.wickNoChangeColor)
  });
}
const jl = "指标", Ql = "更多", Zl = "主图指标", Hl = "副图指标", ql = "设置", Yl = "时区", Wl = "截屏", Gl = "全屏", Xl = "退出全屏", Jl = "保存", ec = "确定", tc = "取消", nc = "MA(移动平均线)", rc = "EMA(指数平滑移动平均线)", oc = "SMA", ic = "BOLL(布林线)", ac = "BBI(多空指数)", sc = "SAR(停损点指向指标)", lc = "VOL(成交量)", cc = "MACD(指数平滑异同移动平均线)", uc = "KDJ(随机指标)", dc = "RSI(相对强弱指标)", hc = "BIAS(乖离率)", fc = "BRAR(情绪指标)", gc = "CCI(顺势指标)", mc = "DMI(动向指标)", yc = "CR(能量指标)", Cc = "PSY(心理线)", pc = "DMA(平行线差指标)", vc = "TRIX(三重指数平滑平均线)", bc = "OBV(能量潮指标)", $c = "VR(成交量变异率)", _c = "WR(威廉指标)", kc = "MTM(动量指标)", xc = "EMV(简易波动指标)", Lc = "ROC(变动率指标)", wc = "PVT(价量趋势指标)", Tc = "AO(动量震荡指标)", Ac = "世界统一时间", Mc = "(UTC-10) 檀香山", Sc = "(UTC-8) 朱诺", Pc = "(UTC-7) 洛杉矶", Dc = "(UTC-5) 芝加哥", Nc = "(UTC-4) 多伦多", Oc = "(UTC-3) 圣保罗", Ic = "(UTC+1) 伦敦", Ec = "(UTC+2) 柏林", Bc = "(UTC+3) 巴林", Fc = "(UTC+4) 迪拜", Uc = "(UTC+5) 阿什哈巴德", zc = "(UTC+6) 阿拉木图", Vc = "(UTC+7) 曼谷", Kc = "(UTC+8) 上海", Rc = "(UTC+9) 东京", jc = "(UTC+10) 悉尼", Qc = "(UTC+12) 诺福克岛", Zc = "水平直线", Hc = "水平射线", qc = "水平线段", Yc = "垂直直线", Wc = "垂直射线", Gc = "垂直线段", Xc = "直线", Jc = "射线", e4 = "线段", t4 = "箭头", n4 = "价格线", r4 = "价格通道线", o4 = "平行直线", i4 = "斐波那契回调直线", a4 = "斐波那契回调线段", s4 = "斐波那契圆环", l4 = "斐波那契螺旋", c4 = "斐波那契速度阻力扇", u4 = "斐波那契趋势扩展", d4 = "江恩箱", h4 = "矩形", f4 = "平行四边形", g4 = "圆", m4 = "三角形", y4 = "三浪", C4 = "五浪", p4 = "八浪", v4 = "任意浪", b4 = "ABCD形态", $4 = "XABCD形态", _4 = "弱磁模式", k4 = "强磁模式", x4 = "商品搜索", L4 = "商品代码", w4 = "参数1", T4 = "参数2", A4 = "参数3", M4 = "参数4", S4 = "参数5", P4 = "周期", D4 = "标准差", N4 = "蜡烛图类型", O4 = "全实心", I4 = "全空心", E4 = "涨空心", B4 = "跌空心", F4 = "OHLC", U4 = "面积图", z4 = "最新价显示", V4 = "最高价显示", K4 = "最低价显示", R4 = "指标最新值显示", j4 = "价格轴类型", Q4 = "线性轴", Z4 = "百分比轴", H4 = "对数轴", q4 = "倒置坐标", Y4 = "网格线显示", W4 = "恢复默认", G4 = {
  indicator: jl,
  more: Ql,
  main_indicator: Zl,
  sub_indicator: Hl,
  setting: ql,
  timezone: Yl,
  screenshot: Wl,
  full_screen: Gl,
  exit_full_screen: Xl,
  save: Jl,
  confirm: ec,
  cancel: tc,
  ma: nc,
  ema: rc,
  sma: oc,
  boll: ic,
  bbi: ac,
  sar: sc,
  vol: lc,
  macd: cc,
  kdj: uc,
  rsi: dc,
  bias: hc,
  brar: fc,
  cci: gc,
  dmi: mc,
  cr: yc,
  psy: Cc,
  dma: pc,
  trix: vc,
  obv: bc,
  vr: $c,
  wr: _c,
  mtm: kc,
  emv: xc,
  roc: Lc,
  pvt: wc,
  ao: Tc,
  utc: Ac,
  honolulu: Mc,
  juneau: Sc,
  los_angeles: Pc,
  chicago: Dc,
  toronto: Nc,
  sao_paulo: Oc,
  london: Ic,
  berlin: Ec,
  bahrain: Bc,
  dubai: Fc,
  ashkhabad: Uc,
  almaty: zc,
  bangkok: Vc,
  shanghai: Kc,
  tokyo: Rc,
  sydney: jc,
  norfolk: Qc,
  horizontal_straight_line: Zc,
  horizontal_ray_line: Hc,
  horizontal_segment: qc,
  vertical_straight_line: Yc,
  vertical_ray_line: Wc,
  vertical_segment: Gc,
  straight_line: Xc,
  ray_line: Jc,
  segment: e4,
  arrow: t4,
  price_line: n4,
  price_channel_line: r4,
  parallel_straight_line: o4,
  fibonacci_line: i4,
  fibonacci_segment: a4,
  fibonacci_circle: s4,
  fibonacci_spiral: l4,
  fibonacci_speed_resistance_fan: c4,
  fibonacci_extension: u4,
  gann_box: d4,
  rect: h4,
  parallelogram: f4,
  circle: g4,
  triangle: m4,
  three_waves: y4,
  five_waves: C4,
  eight_waves: p4,
  any_waves: v4,
  abcd: b4,
  xabcd: $4,
  weak_magnet: _4,
  strong_magnet: k4,
  symbol_search: x4,
  symbol_code: L4,
  params_1: w4,
  params_2: T4,
  params_3: A4,
  params_4: M4,
  params_5: S4,
  period: P4,
  standard_deviation: D4,
  candle_type: N4,
  candle_solid: O4,
  candle_stroke: I4,
  candle_up_stroke: E4,
  candle_down_stroke: B4,
  ohlc: F4,
  area: U4,
  last_price_show: z4,
  high_price_show: V4,
  low_price_show: K4,
  indicator_last_value_show: R4,
  price_axis_type: j4,
  normal: Q4,
  percentage: Z4,
  log: H4,
  reverse_coordinate: q4,
  grid_show: Y4,
  restore_default: W4
}, X4 = "Indicator", J4 = "More", eu = "Main Indicator", tu = "Sub Indicator", nu = "Setting", ru = "Timezone", ou = "Screenshot", iu = "Full Screen", au = "Exit", su = "Save", lu = "Confirm", cu = "Cancel", uu = "MA(Moving Average)", du = "EMA(Exponential Moving Average)", hu = "SMA", fu = "BOLL(Bolinger Bands)", gu = "BBI(Bull And Bearlndex)", mu = "SAR(Stop and Reverse)", yu = "VOL(Volume)", Cu = "MACD(Moving Average Convergence / Divergence)", pu = "KDJ(KDJ Index)", vu = "RSI(Relative Strength Index)", bu = "BIAS(Bias Ratio)", $u = "BRAR(情绪指标)", _u = "CCI(Commodity Channel Index)", ku = "DMI(Directional Movement Index)", xu = "CR(能量指标)", Lu = "PSY(Psychological Line)", wu = "DMA(Different of Moving Average)", Tu = "TRIX(Triple Exponentially Smoothed Moving Average)", Au = "OBV(On Balance Volume)", Mu = "VR(Volatility Volume Ratio)", Su = "WR(Williams %R)", Pu = "MTM(Momentum Index)", Du = "EMV(Ease of Movement Value)", Nu = "ROC(Price Rate of Change)", Ou = "PVT(Price and Volume Trend)", Iu = "AO(Awesome Oscillator)", Eu = "UTC", Bu = "(UTC-10) Honolulu", Fu = "(UTC-8) Juneau", Uu = "(UTC-7) Los Angeles", zu = "(UTC-5) Chicago", Vu = "(UTC-4) Toronto", Ku = "(UTC-3) Sao Paulo", Ru = "(UTC+1) London", ju = "(UTC+2) Berlin", Qu = "(UTC+3) Bahrain", Zu = "(UTC+4) Dubai", Hu = "(UTC+5) Ashkhabad", qu = "(UTC+6) Almaty", Yu = "(UTC+7) Bangkok", Wu = "(UTC+8) Shanghai", Gu = "(UTC+9) Tokyo", Xu = "(UTC+10) Sydney", Ju = "(UTC+12) Norfolk", ed = "Horizontal Line", td = "Horizontal Ray", nd = "Horizontal Segment", rd = "Vertical Line", od = "Vertical Ray", id = "Vertical Segment", ad = "Trend Line", sd = "Ray", ld = "Segment", cd = "Arrow", ud = "Price Line", dd = "Price Channel Line", hd = "Parallel Line", fd = "Fibonacci Line", gd = "Fibonacci Segment", md = "Fibonacci Circle", yd = "Fibonacci Spiral", Cd = "Fibonacci Sector", pd = "Fibonacci Extension", vd = "Gann Box", bd = "Rect", $d = "Parallelogram", _d = "Circle", kd = "Triangle", xd = "Three Waves", Ld = "Five Waves", wd = "Eight Waves", Td = "Any Waves", Ad = "ABCD Pattern", Md = "XABCD Pattern", Sd = "Weak Magnet", Pd = "Strong Magnet", Dd = "Symbol Search", Nd = "Symbol Code", Od = "Parameter 1", Id = "Parameter 2", Ed = "Parameter 3", Bd = "Parameter 4", Fd = "Parameter 5", Ud = "Period", zd = "Standard Deviation", Vd = "Candle Type", Kd = "Candle Solid", Rd = "Candle Stroke", jd = "Candle Up Stroke", Qd = "Candle Down Stroke", Zd = "OHLC", Hd = "Area", qd = "Show Last Price", Yd = "Show Highest Price", Wd = "Show Lowest Price", Gd = "Show indicator's last value", Xd = "Price Axis Type", Jd = "Normal", eh = "Percentage", th = "Log", nh = "Reverse Coordinate", rh = "Show Grids", oh = "Restore Defaults", ih = {
  indicator: X4,
  more: J4,
  main_indicator: eu,
  sub_indicator: tu,
  setting: nu,
  timezone: ru,
  screenshot: ou,
  full_screen: iu,
  exit_full_screen: au,
  save: su,
  confirm: lu,
  cancel: cu,
  ma: uu,
  ema: du,
  sma: hu,
  boll: fu,
  bbi: gu,
  sar: mu,
  vol: yu,
  macd: Cu,
  kdj: pu,
  rsi: vu,
  bias: bu,
  brar: $u,
  cci: _u,
  dmi: ku,
  cr: xu,
  psy: Lu,
  dma: wu,
  trix: Tu,
  obv: Au,
  vr: Mu,
  wr: Su,
  mtm: Pu,
  emv: Du,
  roc: Nu,
  pvt: Ou,
  ao: Iu,
  utc: Eu,
  honolulu: Bu,
  juneau: Fu,
  los_angeles: Uu,
  chicago: zu,
  toronto: Vu,
  sao_paulo: Ku,
  london: Ru,
  berlin: ju,
  bahrain: Qu,
  dubai: Zu,
  ashkhabad: Hu,
  almaty: qu,
  bangkok: Yu,
  shanghai: Wu,
  tokyo: Gu,
  sydney: Xu,
  norfolk: Ju,
  horizontal_straight_line: ed,
  horizontal_ray_line: td,
  horizontal_segment: nd,
  vertical_straight_line: rd,
  vertical_ray_line: od,
  vertical_segment: id,
  straight_line: ad,
  ray_line: sd,
  segment: ld,
  arrow: cd,
  price_line: ud,
  price_channel_line: dd,
  parallel_straight_line: hd,
  fibonacci_line: fd,
  fibonacci_segment: gd,
  fibonacci_circle: md,
  fibonacci_spiral: yd,
  fibonacci_speed_resistance_fan: Cd,
  fibonacci_extension: pd,
  gann_box: vd,
  rect: bd,
  parallelogram: $d,
  circle: _d,
  triangle: kd,
  three_waves: xd,
  five_waves: Ld,
  eight_waves: wd,
  any_waves: Td,
  abcd: Ad,
  xabcd: Md,
  weak_magnet: Sd,
  strong_magnet: Pd,
  symbol_search: Dd,
  symbol_code: Nd,
  params_1: Od,
  params_2: Id,
  params_3: Ed,
  params_4: Bd,
  params_5: Fd,
  period: Ud,
  standard_deviation: zd,
  candle_type: Vd,
  candle_solid: Kd,
  candle_stroke: Rd,
  candle_up_stroke: jd,
  candle_down_stroke: Qd,
  ohlc: Zd,
  area: Hd,
  last_price_show: qd,
  high_price_show: Yd,
  low_price_show: Wd,
  indicator_last_value_show: Gd,
  price_axis_type: Xd,
  normal: Jd,
  percentage: eh,
  log: th,
  reverse_coordinate: nh,
  grid_show: rh,
  restore_default: oh
}, Eo = {
  "zh-CN": G4,
  "en-US": ih
};
function Nm(e, t) {
  Eo[e] = t;
}
const c = (e, t) => {
  var r;
  return ((r = Eo[t]) == null ? void 0 : r[e]) ?? e;
}, ah = /* @__PURE__ */ p('<div class="scroll-indicator left"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg></div>'), sh = /* @__PURE__ */ p('<img alt="symbol">'), lh = /* @__PURE__ */ p('<div class="symbol"><span></span></div>'), ch = /* @__PURE__ */ p('<span class="down-arrow-icon mobile-separate-arrow"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></span>'), uh = /* @__PURE__ */ p('<span class="mobile-more-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg></span>'), dh = /* @__PURE__ */ p('<div class="item tools" title="Time Tools"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M16 3v4"></path><path d="M8 3v4"></path><path d="M3 10h18"></path><path d="M12 14v4"></path><path d="M10 16h4"></path></svg></div>'), hh = /* @__PURE__ */ p('<div class="item tools"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div>'), fh = /* @__PURE__ */ p('<div class="klinecharts-pro-order-tools-display-menu"></div>'), gh = /* @__PURE__ */ p('<div class="klinecharts-pro-order-tools-popover"><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Quick Order</span></span><span class="klinecharts-pro-order-tools-chevron">›</span></button><div class="klinecharts-pro-order-tools-submenu"><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Floating Window</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Plus Button</span></label></div></div><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Open Orders</span></span><span class="klinecharts-pro-order-tools-chevron">&rsaquo;</span></button><div class="klinecharts-pro-order-tools-submenu"><div class="klinecharts-pro-order-tools-setting-row"><span class="klinecharts-pro-order-tools-label">Extended Price Line</span><button type="button"><span></span></button></div><div class="klinecharts-pro-order-tools-setting-row"><span class="klinecharts-pro-order-tools-label">Display</span><div class="klinecharts-pro-order-tools-display"><button type="button" class="klinecharts-pro-order-tools-display-button"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4"></path></svg></button></div></div></div></div><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Positions</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Breakeven Price</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Liquidation Price</span></label><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Price Line</span></span><span class="klinecharts-pro-order-tools-chevron">&rsaquo;</span></button><div class="klinecharts-pro-order-tools-submenu"><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Market Price Line</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Count Down</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Bid & Ask Price</span></label></div></div><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Order History</span></label></div>'), mh = /* @__PURE__ */ p('<div><div class="item tools order-tools-trigger"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Orders"><path d="M4 7h10"></path><path d="M4 12h8"></path><path d="M4 17h6"></path><path d="M18 6v12"></path><path d="M15 15l3 3 3-3"></path></svg><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></div></div>'), yh = /* @__PURE__ */ p('<div class="item tools"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path><path d="M15.22299772857666,9.722223632261718C12.59389772857666,9.722223632261718,10.44600772857666,12.020201374511718,10.44600772857666,14.861111374511719C10.44600772857666,17.70202137451172,12.58215772857666,20.000021374511718,15.223007728576661,20.000021374511718C17.86384772857666,20.000021374511718,19.99999772857666,17.70202137451172,19.99999772857666,14.861111374511719C19.99999772857666,12.020201374511718,17.85211772857666,9.72222212709572,15.22299772857666,9.722223632261718ZM15.22299772857666,18.598491374511717C13.30985772857666,18.598491374511717,11.737087728576661,16.91919137451172,11.737087728576661,14.848481374511719C11.737087728576661,12.777781374511719,13.29811772857666,11.098491374511719,15.22299772857666,11.098491374511719C17.14787772857666,11.098491374511719,18.708917728576658,12.777781374511719,18.708917728576658,14.848481374511719C18.708917728576658,16.91919137451172,17.13614772857666,18.59848137451172,15.22299772857666,18.598491374511717Z"></path><path d="M15.692486288146974,15.050496970825195L15.692486288146974,12.676760970825196C15.692486288146974,12.297972970825196,15.399058288146973,11.982316970825195,15.046945288146972,11.982316970825195C14.694833288146972,11.982316970825195,14.401406288146973,12.297972970825196,14.401406288146973,12.676760970825196L14.401406288146973,15.340896970825195C14.401406288146973,15.530296970825194,14.471829288146973,15.694436970825196,14.589200288146973,15.833326970825196L15.751176288146972,17.095956970825195C15.868546288146973,17.222216970825194,16.032866288146973,17.297976970825196,16.208916288146973,17.297976970825196C16.384976288146973,17.297976970825196,16.537556288146973,17.222216970825194,16.666666288146974,17.095956970825195C16.78403628814697,16.969686970825194,16.854456288146974,16.792916970825196,16.854456288146974,16.603526970825193C16.854456288146974,16.414136970825197,16.78403628814697,16.237366970825196,16.666666288146974,16.111106970825197L15.692486288146974,15.050496970825195Z"></path></svg></div>'), Ch = /* @__PURE__ */ p('<div class="item tools"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg></div>'), ph = /* @__PURE__ */ p('<div class="item tools"><svg viewBox="0 0 20 20"><path d="M6.50977,1L13.4902,1C13.6406,1,13.7695,1.1104910000000001,13.7969,1.2631700000000001L14.0273,2.52277C14.1387,3.13147,14.6543,3.57143,15.2559,3.57143L17.5,3.57143C18.8809,3.57143,20,4.72254,20,6.14286L20,16.4286C20,17.8489,18.8809,19,17.5,19L2.5,19C1.11914,19,0,17.8489,0,16.4286L0,6.14286C0,4.72254,1.11914,3.57143,2.5,3.57143L4.74414,3.57143C5.3457,3.57143,5.86133,3.13147,5.97266,2.52277L6.20312,1.2631700000000001C6.23047,1.1104910000000001,6.35937,1,6.50977,1ZM15.2559,4.857139999999999C14.0547,4.857139999999999,13.0215,3.97522,12.7988,2.75982L12.7129,2.28571L7.28711,2.28571L7.20117,2.75982C6.98047,3.97522,5.94727,4.857139999999999,4.74414,4.857139999999999L2.5,4.857139999999999C1.81055,4.857139999999999,1.25,5.43371,1.25,6.14286L1.25,16.4286C1.25,17.1377,1.81055,17.7143,2.5,17.7143L17.5,17.7143C18.1895,17.7143,18.75,17.1377,18.75,16.4286L18.75,6.14286C18.75,5.43371,18.1895,4.857139999999999,17.5,4.857139999999999L15.2559,4.857139999999999ZM4.375,6.78571L3.125,6.78571C2.7793,6.78571,2.5,6.49844,2.5,6.14286C2.5,5.78728,2.7793,5.5,3.125,5.5L4.375,5.5C4.7207,5.5,5,5.78728,5,6.14286C5,6.49844,4.7207,6.78571,4.375,6.78571ZM10,6.14286C7.06641,6.14286,4.6875,8.58973,4.6875,11.6071C4.6875,14.6246,7.06641,17.0714,10,17.0714C12.9336,17.0714,15.3125,14.6246,15.3125,11.6071C15.3125,8.58973,12.9336,6.14286,10,6.14286ZM10,7.42857C11.0859,7.42857,12.1055,7.8625,12.873,8.65201C13.6406,9.44152,14.0625,10.49018,14.0625,11.6071C14.0625,12.7241,13.6406,13.7728,12.873,14.5623C12.1055,15.3518,11.0859,15.7857,10,15.7857C8.91406,15.7857,7.89453,15.3518,7.12695,14.5623C6.35937,13.7728,5.9375,12.7241,5.9375,11.6071C5.9375,10.49018,6.35938,9.44152,7.12695,8.65201C7.89453,7.8625,8.91406,7.42857,10,7.42857ZM10,9.67857C8.96484,9.67857,8.125,10.54241,8.125,11.6071C8.125,12.6719,8.96484,13.5357,10,13.5357C11.0352,13.5357,11.875,12.6719,11.875,11.6071C11.875,10.54241,11.0352,9.67857,10,9.67857ZM10,10.96429C10.3438,10.96429,10.625,11.2536,10.625,11.6071C10.625,11.9607,10.3438,12.25,10,12.25C9.65625,12.25,9.375,11.9607,9.375,11.6071C9.375,11.2536,9.65625,10.96429,10,10.96429Z"></path></svg></div>'), vh = /* @__PURE__ */ p('<div class="item tools chart-view-toggle"></div>'), bh = /* @__PURE__ */ p('<div class="scroll-indicator right"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"></path></svg></div>'), $h = /* @__PURE__ */ p('<div><div class="klinecharts-pro-period-bar"><div class="menu-container"><svg viewBox="0 0 1024 1024"><path d="M192.037 287.953h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 479.169H438.553c-17.673 0-32 14.327-32 32s14.327 32 32 32h393.608c17.673 0 32-14.327 32-32s-14.327-32-32-32zM832.161 735.802H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32zM319.028 351.594l-160 160 160 160z"></path></svg></div><div><div class="item tools fullscreen-toggle"></div></div></div></div>'), _h = /* @__PURE__ */ p("<span></span>"), kh = /* @__PURE__ */ p('<button type="button"></button>'), xh = /* @__PURE__ */ p('<svg viewBox="0 0 20 20"><path d="M1.08108,0L0,1.079L4.18919,5.27938L2.54826,6.91715L6.9112,6.91715L6.9112,2.56262L5.28957,4.18112L1.08108,0ZM15.8108,5.27938L20,1.079L18.9189,0L14.7104,4.18112L13.0888,2.56262L13.0888,6.91715L17.4517,6.91715L15.8108,5.27938ZM4.16988,14.7014L0.07722,18.8054L1.1583,20L5.27027,15.7996L6.9112,17.4374L6.9112,13.0829L2.54826,13.0829L4.16988,14.7014ZM17.4517,13.0829L13.0888,13.0829L13.0888,17.4374L14.7297,15.7996L18.8417,20L19.9228,18.8054L15.8301,14.7013L17.4517,13.0829Z"></path></svg>'), Lh = /* @__PURE__ */ p('<svg viewBox="0 0 20 20"><path d="M2.93444,1.76899L7.57544,6.40999L6.38918,7.59626L1.76899,2.93444L0,4.70343L0,0L4.70343,0L2.93444,1.76899ZM6.40999,12.4037L1.76899,17.0447L0,15.2758L0,19.9792L4.70343,19.9792L2.93444,18.2102L7.57544,13.5692L6.40999,12.4037ZM15.2758,0L17.0447,1.76899L12.4037,6.40999L13.59,7.59626L18.231,2.95526L20,4.72425L20,0L15.2758,0ZM13.5692,12.4037L12.3829,13.59L17.0239,18.231L15.2549,20L19.9792,20L19.9792,15.2758L18.2102,17.0447L13.5692,12.4037Z"></path></svg>'), wh = /* @__PURE__ */ p('<svg viewBox="0 0 24 24"><path d="M3 20V7l4 3 5-7 5 4h4v13H3Zm5-3 4-5.5 7 5.45V9h-2.7l-3.9-3.1-4.95 6.95L5 10.4V14l3 3Z"></path></svg>'), Th = /* @__PURE__ */ p('<svg viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M9 4H7v2H5v12h2v2h2v-2h2V6H9zM19 8h-2V4h-2v4h-2v7h2v5h2v-5h2z"></path></svg>'), F0 = (e) => e.charAt(0).toUpperCase() + e.slice(1), Ah = (e) => {
  let t, r, n;
  const [a, l] = M(window.innerWidth < 768), [d, h] = M(localStorage.getItem("klinechart_secondary_period") || ""), [v, x] = M(!1), [b, L] = M(!1), [B, N] = M(!1), [Z, U] = M(!1), [K, z] = M(!1), [ce, j] = M({
    top: 0,
    left: 0,
    minWidth: 220
  }), X = () => {
    l(window.innerWidth < 768), requestAnimationFrame(I), v() && te();
  }, [ee, pe] = M(!1), H = () => document.fullscreenElement ?? document.body, q = () => {
    pe(!!document.fullscreenElement);
  }, [ne, se] = M(!1), [A, W] = M(!1), te = () => {
    if (!r)
      return;
    const O = r.getBoundingClientRect(), F = Math.max(220, Math.ceil(O.width)), ve = window.innerWidth, Le = Math.min(Math.max(8, O.right - F), Math.max(8, ve - F - 8));
    j({
      top: Math.ceil(O.bottom + 8),
      left: Math.ceil(Le),
      minWidth: F
    });
  }, R = () => {
    L(!1), N(!1), U(!1), z(!1);
  }, de = () => {
    x((O) => {
      const F = !O;
      return F ? queueMicrotask(te) : R(), F;
    });
  }, he = (O) => {
    if (!v())
      return;
    const F = O.target;
    F && (r != null && r.contains(F) || n != null && n.contains(F) || (R(), x(!1)));
  }, re = () => {
    v() && te();
  }, I = () => {
    if (!t) {
      se(!1), W(!1);
      return;
    }
    const O = t, F = O.scrollWidth > O.clientWidth + 2;
    se(F && O.scrollLeft > 2), W(F && O.scrollLeft + O.clientWidth < O.scrollWidth - 2);
  };
  Vn(() => {
    window.addEventListener("resize", X), document.addEventListener("fullscreenchange", q), document.addEventListener("mousedown", he), window.addEventListener("scroll", re, !0), document.addEventListener("mozfullscreenchange", q), document.addEventListener("webkitfullscreenchange", q), document.addEventListener("msfullscreenchange", q), t && (t.addEventListener("scroll", I), setTimeout(I, 100));
  }), Et(() => {
    window.removeEventListener("resize", X), document.removeEventListener("fullscreenchange", q), document.removeEventListener("mousedown", he), window.removeEventListener("scroll", re, !0), document.removeEventListener("mozfullscreenchange", q), document.removeEventListener("webkitfullscreenchange", q), document.removeEventListener("msfullscreenchange", q), t && t.removeEventListener("scroll", I);
  });
  const Q = Y(() => {
    const O = e.periods.filter((F) => {
      if (!a() || ee())
        return !0;
      const ve = e.period.text, Le = d();
      if (F.text === ve || Le && F.text === Le)
        return !0;
      if (!Le || Le === ve) {
        const ye = e.periods.find((Me) => Me.text !== ve);
        return F.text === (ye == null ? void 0 : ye.text);
      }
      return !1;
    }).slice(0, a() && !ee() ? 2 : e.periods.length);
    return setTimeout(I, 50), O;
  });
  let D = e.period.text;
  return Re(() => {
    const O = e.period.text;
    O !== D && (a() && (h(D), localStorage.setItem("klinechart_secondary_period", D)), D = O), setTimeout(I, 50);
  }), Re(() => {
    ee(), setTimeout(I, 100);
  }), Re(() => {
    if (!e.showOrderToolsMenu) {
      x(!1);
      return;
    }
    v() && queueMicrotask(te);
  }), (() => {
    const O = $h.cloneNode(!0), F = O.firstChild, ve = F.firstChild, Le = ve.firstChild, ye = ve.nextSibling, Me = ye.firstChild;
    return O.style.setProperty("position", "relative"), O.style.setProperty("width", "100%"), O.style.setProperty("display", "flex"), O.style.setProperty("align-items", "center"), C(O, w(le, {
      get when() {
        return ne();
      },
      get children() {
        const _ = ah.cloneNode(!0);
        return _.$$click = () => t.scrollBy({
          left: -100,
          behavior: "smooth"
        }), _.style.setProperty("position", "absolute"), _.style.setProperty("left", "0"), _.style.setProperty("top", "0"), _.style.setProperty("bottom", "1px"), _.style.setProperty("width", "30px"), _.style.setProperty("display", "flex"), _.style.setProperty("align-items", "center"), _.style.setProperty("justify-content", "center"), _.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), _.style.setProperty("z-index", "10"), _.style.setProperty("cursor", "pointer"), _.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), _;
      }
    }), F), xt((_) => {
      t = _;
    }, F), F.style.setProperty("width", "100%"), F.style.setProperty("overflow", "auto"), st(Le, "click", e.onMenuClick, !0), C(F, w(le, {
      get when() {
        return e.symbol;
      },
      get children() {
        const _ = lh.cloneNode(!0), me = _.firstChild;
        return st(_, "click", e.onSymbolClick, !0), C(_, w(le, {
          get when() {
            return e.symbol.logo;
          },
          get children() {
            const Ne = sh.cloneNode(!0);
            return V(() => Ie(Ne, "src", e.symbol.logo)), Ne;
          }
        }), me), C(me, () => e.symbol.shortName ?? e.symbol.name ?? e.symbol.ticker), _;
      }
    }), ye), C(F, () => Q().map((_, me) => {
      const Ne = _.text === e.period.text;
      return (() => {
        const ut = _h.cloneNode(!0);
        return ut.$$click = ($e) => {
          a() && Ne && !ee() ? (e.onMobilePeriodClick ? e.onMobilePeriodClick(_) : e.onMenuClick(), $e.stopPropagation()) : e.onPeriodChange(_);
        }, fe(ut, `item period ${Ne ? "selected" : ""}`), C(ut, () => _.text), ut;
      })();
    }), ye), C(F, w(le, {
      get when() {
        return Y(() => !!(a() && !ee()))() && Q().length > 1;
      },
      get children() {
        const _ = ch.cloneNode(!0);
        return _.$$click = (me) => {
          me.stopPropagation(), e.onMobilePeriodClick ? e.onMobilePeriodClick(e.period) : e.onMenuClick();
        }, _.style.setProperty("margin-left", "4px"), _.style.setProperty("display", "inline-flex"), _.style.setProperty("align-items", "center"), _;
      }
    }), ye), C(F, w(le, {
      get when() {
        return Y(() => !!a())() && !ee();
      },
      get children() {
        const _ = uh.cloneNode(!0);
        return _.$$click = (me) => {
          var Ne;
          me.stopPropagation(), (Ne = e.onMobileMoreClick) == null || Ne.call(e);
        }, _.style.setProperty("margin-left", "8px"), _.style.setProperty("display", "inline-flex"), _.style.setProperty("align-items", "center"), _.style.setProperty("cursor", "pointer"), _.style.setProperty("padding", "0 4px"), _;
      }
    }), ye), C(F, w(le, {
      get when() {
        return !a();
      },
      get children() {
        const _ = dh.cloneNode(!0);
        return st(_, "click", e.onTimeToolsClick, !0), _;
      }
    }), ye), C(F, w(le, {
      get when() {
        return !a();
      },
      get children() {
        const _ = hh.cloneNode(!0), me = _.firstChild, Ne = me.nextSibling;
        return st(_, "click", e.onIndicatorClick, !0), C(Ne, () => c("indicator", e.locale)), _;
      }
    }), ye), ye.style.setProperty("display", "flex"), ye.style.setProperty("gap", "4px"), ye.style.setProperty("margin-left", "auto"), ye.style.setProperty("align-items", "center"), ye.style.setProperty("flex", "0 0 auto"), C(ye, w(le, {
      get when() {
        return e.showOrderToolsMenu;
      },
      get children() {
        const _ = mh.cloneNode(!0), me = _.firstChild, Ne = me.firstChild, ut = Ne.nextSibling;
        return xt(($e) => {
          r = $e;
        }, _), _.style.setProperty("display", "flex"), _.style.setProperty("align-items", "center"), me.$$click = ($e) => {
          $e.stopPropagation(), de();
        }, me.style.setProperty("gap", "6px"), ut.style.setProperty("transition", "transform 0.2s ease"), C(_, w(le, {
          get when() {
            return v();
          },
          get children() {
            return w(j9, {
              get mount() {
                return H();
              },
              get children() {
                const $e = gh.cloneNode(!0), Ct = $e.firstChild, dt = Ct.firstChild, t1 = dt.firstChild, Be = t1.firstChild, _1 = Be.firstChild, Ut = dt.nextSibling, Tt = Ut.firstChild, At = Tt.firstChild, rt = At.firstChild, k1 = Tt.nextSibling, qe = k1.firstChild, n1 = qe.firstChild, r1 = Ct.nextSibling, pt = r1.firstChild, Mt = pt.firstChild, o1 = Mt.firstChild, x1 = o1.firstChild, zt = pt.nextSibling, i1 = zt.firstChild, L1 = i1.firstChild, w1 = L1.nextSibling, a1 = i1.nextSibling, Qe = a1.firstChild, Ke = Qe.nextSibling, Ze = Ke.firstChild, He = Ze.firstChild, T1 = r1.nextSibling, s1 = T1.firstChild, Vt = s1.firstChild, A1 = T1.nextSibling, Ae = A1.nextSibling, Fe = Ae.firstChild, M1 = Fe.firstChild, Ge = Ae.nextSibling, vt = Ge.nextSibling, bt = vt.firstChild, S1 = bt.firstChild, ht = vt.nextSibling, l1 = ht.firstChild, ft = l1.firstChild, St = ft.firstChild, P1 = St.firstChild, c1 = l1.nextSibling, Pt = c1.firstChild, Ye = Pt.firstChild, D1 = Ye.firstChild, u1 = Pt.nextSibling, $t = u1.firstChild, Kt = $t.firstChild, pn = u1.nextSibling, vn = pn.firstChild, N1 = vn.firstChild, d1 = ht.nextSibling, O1 = d1.firstChild, _t = O1.firstChild;
                return $e.$$mousedown = ($) => $.stopPropagation(), xt(($) => {
                  n = $;
                }, $e), $e.style.setProperty("position", "fixed"), $e.style.setProperty("z-index", "9999"), dt.$$click = ($) => {
                  $.preventDefault(), $.stopPropagation(), L((S) => !S);
                }, Be.$$mousedown = ($) => $.stopPropagation(), Be.$$click = ($) => $.stopPropagation(), _1.addEventListener("change", ($) => {
                  var S;
                  $.stopPropagation(), L(!0), (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    quickOrder: $.currentTarget.checked
                  });
                }), rt.addEventListener("change", ($) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    quickOrderFloatingWindow: $.currentTarget.checked
                  });
                }), n1.addEventListener("change", ($) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    quickOrderPlusButton: $.currentTarget.checked
                  });
                }), pt.$$click = ($) => {
                  $.preventDefault(), $.stopPropagation(), N((S) => !S), U(!1);
                }, o1.$$mousedown = ($) => $.stopPropagation(), o1.$$click = ($) => $.stopPropagation(), x1.addEventListener("change", ($) => {
                  var S;
                  $.stopPropagation(), N(!0), (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    openOrders: $.currentTarget.checked
                  });
                }), w1.$$click = ($) => {
                  var S, Oe;
                  $.preventDefault(), $.stopPropagation(), (Oe = e.onOrderToolsStateChange) == null || Oe.call(e, {
                    openOrdersExtendedPriceLine: !(((S = e.orderToolsState) == null ? void 0 : S.openOrdersExtendedPriceLine) ?? !0)
                  });
                }, Ze.$$click = ($) => {
                  $.preventDefault(), $.stopPropagation(), U((S) => !S);
                }, C(Ze, () => {
                  var $;
                  return F0((($ = e.orderToolsState) == null ? void 0 : $.openOrdersDisplay) ?? "right");
                }, He), C(Ke, w(le, {
                  get when() {
                    return Z();
                  },
                  get children() {
                    const $ = fh.cloneNode(!0);
                    return C($, () => ["left", "center", "right"].map((S) => (() => {
                      const Oe = kh.cloneNode(!0);
                      return Oe.$$click = (Ue) => {
                        var ot;
                        Ue.preventDefault(), Ue.stopPropagation(), (ot = e.onOrderToolsStateChange) == null || ot.call(e, {
                          openOrdersDisplay: S
                        }), U(!1);
                      }, C(Oe, () => F0(S)), V(() => {
                        var Ue;
                        return fe(Oe, (((Ue = e.orderToolsState) == null ? void 0 : Ue.openOrdersDisplay) ?? "right") === S ? "selected" : "");
                      }), Oe;
                    })())), $;
                  }
                }), null), Vt.addEventListener("change", ($) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    positions: $.currentTarget.checked
                  });
                }), M1.addEventListener("change", ($) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    breakevenPrice: $.currentTarget.checked
                  });
                }), S1.addEventListener("change", ($) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    liquidationPrice: $.currentTarget.checked
                  });
                }), l1.$$click = ($) => {
                  $.preventDefault(), $.stopPropagation(), z((S) => !S);
                }, St.$$mousedown = ($) => $.stopPropagation(), St.$$click = ($) => $.stopPropagation(), P1.addEventListener("change", ($) => {
                  var S;
                  $.stopPropagation(), z(!0), (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    priceLine: $.currentTarget.checked
                  });
                }), D1.addEventListener("change", ($) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    marketPriceLine: $.currentTarget.checked
                  });
                }), Kt.addEventListener("change", ($) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    countDown: $.currentTarget.checked
                  });
                }), N1.addEventListener("change", ($) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    bidAskPrice: $.currentTarget.checked
                  });
                }), _t.addEventListener("change", ($) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    orderHistory: $.currentTarget.checked
                  });
                }), V(($) => {
                  var F1;
                  const S = `${ce().top}px`, Oe = `${ce().left}px`, Ue = `${ce().minWidth}px`, ot = `klinecharts-pro-order-tools-group${b() ? " klinecharts-pro-order-tools-group-open" : ""}`, gt = `klinecharts-pro-order-tools-group${B() ? " klinecharts-pro-order-tools-group-open" : ""}`, I1 = `klinecharts-pro-order-tools-switch${((F1 = e.orderToolsState) == null ? void 0 : F1.openOrdersExtendedPriceLine) ?? !0 ? " klinecharts-pro-order-tools-switch-on" : ""}`, E1 = `klinecharts-pro-order-tools-display-arrow${Z() ? " klinecharts-pro-order-tools-display-arrow-open" : ""}`, B1 = `klinecharts-pro-order-tools-group${K() ? " klinecharts-pro-order-tools-group-open" : ""}`;
                  return S !== $._v$ && $e.style.setProperty("top", $._v$ = S), Oe !== $._v$2 && $e.style.setProperty("left", $._v$2 = Oe), Ue !== $._v$3 && $e.style.setProperty("width", $._v$3 = Ue), ot !== $._v$4 && fe(Ct, $._v$4 = ot), gt !== $._v$5 && fe(r1, $._v$5 = gt), I1 !== $._v$6 && fe(w1, $._v$6 = I1), E1 !== $._v$7 && Ie(He, "class", $._v$7 = E1), B1 !== $._v$8 && fe(ht, $._v$8 = B1), $;
                }, {
                  _v$: void 0,
                  _v$2: void 0,
                  _v$3: void 0,
                  _v$4: void 0,
                  _v$5: void 0,
                  _v$6: void 0,
                  _v$7: void 0,
                  _v$8: void 0
                }), V(() => {
                  var $, S, Oe, Ue;
                  return _1.checked = ((($ = e.orderToolsState) == null ? void 0 : $.quickOrderFloatingWindow) ?? ((S = e.orderToolsState) == null ? void 0 : S.quickOrder) ?? !0) || (((Oe = e.orderToolsState) == null ? void 0 : Oe.quickOrderPlusButton) ?? ((Ue = e.orderToolsState) == null ? void 0 : Ue.quickOrder) ?? !0);
                }), V(() => {
                  var $, S;
                  return rt.checked = (($ = e.orderToolsState) == null ? void 0 : $.quickOrderFloatingWindow) ?? ((S = e.orderToolsState) == null ? void 0 : S.quickOrder) ?? !0;
                }), V(() => {
                  var $, S;
                  return n1.checked = (($ = e.orderToolsState) == null ? void 0 : $.quickOrderPlusButton) ?? ((S = e.orderToolsState) == null ? void 0 : S.quickOrder) ?? !0;
                }), V(() => {
                  var $;
                  return x1.checked = (($ = e.orderToolsState) == null ? void 0 : $.openOrders) ?? !0;
                }), V(() => {
                  var $;
                  return Vt.checked = (($ = e.orderToolsState) == null ? void 0 : $.positions) ?? !0;
                }), V(() => {
                  var $;
                  return M1.checked = (($ = e.orderToolsState) == null ? void 0 : $.breakevenPrice) ?? !0;
                }), V(() => {
                  var $;
                  return S1.checked = (($ = e.orderToolsState) == null ? void 0 : $.liquidationPrice) ?? !0;
                }), V(() => {
                  var $, S, Oe, Ue, ot, gt;
                  return P1.checked = ((($ = e.orderToolsState) == null ? void 0 : $.marketPriceLine) ?? ((S = e.orderToolsState) == null ? void 0 : S.priceLine) ?? !0) || (((Oe = e.orderToolsState) == null ? void 0 : Oe.countDown) ?? ((Ue = e.orderToolsState) == null ? void 0 : Ue.priceLine) ?? !0) || (((ot = e.orderToolsState) == null ? void 0 : ot.bidAskPrice) ?? ((gt = e.orderToolsState) == null ? void 0 : gt.priceLine) ?? !0);
                }), V(() => {
                  var $, S;
                  return D1.checked = (($ = e.orderToolsState) == null ? void 0 : $.marketPriceLine) ?? ((S = e.orderToolsState) == null ? void 0 : S.priceLine) ?? !0;
                }), V(() => {
                  var $, S;
                  return Kt.checked = (($ = e.orderToolsState) == null ? void 0 : $.countDown) ?? ((S = e.orderToolsState) == null ? void 0 : S.priceLine) ?? !0;
                }), V(() => {
                  var $, S;
                  return N1.checked = (($ = e.orderToolsState) == null ? void 0 : $.bidAskPrice) ?? ((S = e.orderToolsState) == null ? void 0 : S.priceLine) ?? !0;
                }), V(() => {
                  var $;
                  return _t.checked = (($ = e.orderToolsState) == null ? void 0 : $.orderHistory) ?? !0;
                }), $e;
              }
            });
          }
        }), null), V(($e) => {
          const Ct = a() ? "0 8px" : "0 10px", dt = v() ? "rotate(180deg)" : "rotate(0deg)";
          return Ct !== $e._v$9 && me.style.setProperty("padding", $e._v$9 = Ct), dt !== $e._v$10 && ut.style.setProperty("transform", $e._v$10 = dt), $e;
        }, {
          _v$9: void 0,
          _v$10: void 0
        }), _;
      }
    }), Me), C(ye, w(le, {
      get when() {
        return !a();
      },
      get children() {
        return [(() => {
          const _ = yh.cloneNode(!0);
          return st(_, "click", e.onTimezoneClick, !0), _;
        })(), (() => {
          const _ = Ch.cloneNode(!0);
          return st(_, "click", e.onSettingClick, !0), _;
        })()];
      }
    }), Me), C(ye, w(le, {
      get when() {
        return !a();
      },
      get children() {
        const _ = ph.cloneNode(!0);
        return st(_, "click", e.onScreenshotClick, !0), _;
      }
    }), Me), Me.$$click = () => {
      if (ee())
        (document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen).call(document);
      else {
        const _ = t == null ? void 0 : t.closest(".klinecharts-pro");
        _ && ((_ == null ? void 0 : _.requestFullscreen) ?? (_ == null ? void 0 : _.webkitRequestFullscreen) ?? (_ == null ? void 0 : _.mozRequestFullScreen) ?? (_ == null ? void 0 : _.msRequestFullscreen)).call(_);
      }
    }, C(Me, (() => {
      const _ = Y(() => !!ee());
      return () => _() ? xh.cloneNode(!0) : Lh.cloneNode(!0);
    })()), C(ye, w(le, {
      get when() {
        return Y(() => !!e.chartViewToggle)() && !ee();
      },
      get children() {
        const _ = vh.cloneNode(!0);
        return st(_, "click", e.chartViewToggle.onToggle, !0), C(_, (() => {
          const me = Y(() => e.chartViewToggle.view === "chart");
          return () => me() ? wh.cloneNode(!0) : Th.cloneNode(!0);
        })()), V(() => Ie(_, "title", e.chartViewToggle.view === "chart" ? "View Depth" : "View Chart")), _;
      }
    }), null), C(O, w(le, {
      get when() {
        return A();
      },
      get children() {
        const _ = bh.cloneNode(!0);
        return _.$$click = () => t.scrollBy({
          left: 100,
          behavior: "smooth"
        }), _.style.setProperty("position", "absolute"), _.style.setProperty("right", "0"), _.style.setProperty("top", "0"), _.style.setProperty("bottom", "1px"), _.style.setProperty("width", "30px"), _.style.setProperty("display", "flex"), _.style.setProperty("align-items", "center"), _.style.setProperty("justify-content", "center"), _.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), _.style.setProperty("z-index", "10"), _.style.setProperty("cursor", "pointer"), _.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), _;
      }
    }), null), V((_) => {
      const me = e.spread ? "" : "rotate", Ne = ee() ? "0px" : "var(--klinecharts-pro-period-bar-padding-right)";
      return me !== _._v$11 && Ie(Le, "class", _._v$11 = me), Ne !== _._v$12 && ye.style.setProperty("padding-right", _._v$12 = Ne), _;
    }, {
      _v$11: void 0,
      _v$12: void 0
    }), O;
  })();
};
je(["click", "mousedown"]);
const Mh = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M12.41465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L12.41465,12C12.20873,12.5826,11.65311,13,11,13C10.34689,13,9.79127,12.5826,9.58535,12L3.5,12C3.223857,12,3,11.77614,3,11.5C3,11.22386,3.223857,11,3.5,11L9.58535,11C9.79127,10.417404,10.34689,10,11,10C11.65311,10,12.20873,10.417404,12.41465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), Sh = () => Mh.cloneNode(!0), Ph = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,11L11.08535,11C11.29127,10.417404,11.84689,10,12.5,10C13.15311,10,13.70873,10.417404,13.91465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L13.91465,12C13.70873,12.5826,13.15311,13,12.5,13C11.84689,13,11.29127,12.5826,11.08535,12L6.91465,12C6.70873,12.5826,6.15311,13,5.5,13C4.671573,13,4,12.32843,4,11.5C4,10.671573,4.671573,10,5.5,10C6.15311,10,6.70873,10.417404,6.91465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), Dh = () => Ph.cloneNode(!0), Nh = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,12.5C6.70873,13.0826,6.15311,13.5,5.5,13.5C4.671573,13.5,4,12.82843,4,12C4,11.171573,4.671573,10.5,5.5,10.5C6.15311,10.5,6.70873,10.917404,6.91465,11.5L16.0853,11.5C16.2913,10.917404,16.846899999999998,10.5,17.5,10.5C18.328400000000002,10.5,19,11.171573,19,12C19,12.82843,18.328400000000002,13.5,17.5,13.5C16.846899999999998,13.5,16.2913,13.0826,16.0853,12.5L6.91465,12.5Z" stroke-opacity="0" stroke="none"></path></svg>'), Oh = () => Nh.cloneNode(!0), Ih = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,12.41465L11,18.5C11,18.7761,11.22386,19,11.5,19C11.77614,19,12,18.7761,12,18.5L12,12.41465C12.5826,12.20873,13,11.65311,13,11C13,10.34689,12.5826,9.79127,12,9.58535L12,3.5C12,3.223857,11.77614,3,11.5,3C11.22386,3,11,3.223857,11,3.5L11,9.58535C10.417404,9.79127,10,10.34689,10,11C10,11.65311,10.417404,12.20873,11,12.41465Z" stroke-opacity="0" stroke="none"></path></svg>'), Eh = () => Ih.cloneNode(!0), Bh = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.66558837890625,19C10.83716137890625,19,10.16558837890625,18.328400000000002,10.16558837890625,17.5C10.16558837890625,16.846899999999998,10.58298437890625,16.2913,11.16557337890625,16.0854L11.16557337890625,11.91464C10.58298437890625,11.70872,10.16558837890625,11.1531,10.16558837890625,10.5C10.16558837890625,9.8469,10.58298437890625,9.29128,11.16557337890625,9.08536L11.16557337890625,4.5C11.16557337890625,4.223857,11.38942837890625,4,11.66556837890625,4C11.94171837890625,4,12.16556837890625,4.223857,12.16556837890625,4.5L12.16556837890625,9.08535C12.74817837890625,9.291260000000001,13.16558837890625,9.846879999999999,13.16558837890625,10.5C13.16558837890625,11.153120000000001,12.74817837890625,11.708739999999999,12.16556837890625,11.91465L12.16556837890625,16.0854C12.74817837890625,16.2913,13.16558837890625,16.846899999999998,13.16558837890625,17.5C13.16558837890625,18.328400000000002,12.49401837890625,19,11.66558837890625,19Z" stroke-opacity="0" stroke="none"></path></svg>'), Fh = () => Bh.cloneNode(!0), Uh = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.165603637695312,6.91465C11.748203637695312,6.70873,12.165603637695312,6.15311,12.165603637695312,5.5C12.165603637695312,4.671573,11.494033637695313,4,10.665603637695312,4C9.837176637695313,4,9.165603637695312,4.671573,9.165603637695312,5.5C9.165603637695312,6.15311,9.583007637695312,6.70873,10.165603637695312,6.91465L10.165603637695312,16.0854C9.583007637695312,16.2913,9.165603637695312,16.846899999999998,9.165603637695312,17.5C9.165603637695312,18.328400000000002,9.837176637695313,19,10.665603637695312,19C11.494033637695313,19,12.165603637695312,18.328400000000002,12.165603637695312,17.5C12.165603637695312,16.846899999999998,11.748203637695312,16.2913,11.165603637695312,16.0854L11.165603637695312,6.91465Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), zh = () => Uh.cloneNode(!0), Vh = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.146447,15.753C4.9511845,15.9483,4.9511845,16.2649,5.146447,16.4602C5.341709,16.6554,5.658291,16.6554,5.853554,16.4602L8.156600000000001,14.15711C8.352409999999999,14.25082,8.57173,14.3033,8.8033,14.3033C9.631730000000001,14.3033,10.3033,13.63172,10.3033,12.80329C10.3033,12.57172,10.250820000000001,12.352409999999999,10.157119999999999,12.15659L12.156600000000001,10.15711C12.352409999999999,10.250820000000001,12.571729999999999,10.30329,12.8033,10.30329C13.63173,10.30329,14.3033,9.63172,14.3033,8.80329C14.3033,8.57172,14.25082,8.352409999999999,14.15712,8.15659L16.4602,5.853553C16.6554,5.658291,16.6554,5.341709,16.4602,5.146447C16.2649,4.9511843,15.9483,4.9511843,15.753,5.146447L13.45001,7.449479999999999C13.25419,7.35577,13.03487,7.3032900000000005,12.8033,7.3032900000000005C11.97487,7.3032900000000005,11.3033,7.97487,11.3033,8.80329C11.3033,9.03487,11.35578,9.254190000000001,11.44949,9.450009999999999L9.450009999999999,11.449480000000001C9.254190000000001,11.35577,9.03487,11.30329,8.8033,11.30329C7.97487,11.30329,7.3033,11.97487,7.3033,12.80329C7.3033,13.03487,7.35578,13.25419,7.44949,13.45001L5.146447,15.753Z" stroke-opacity="0" stroke="none"></path></svg>'), Kh = () => Vh.cloneNode(!0), Rh = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M7.573332939453125,14.54567903564453C7.667042939453125,14.741499035644532,7.719512939453125,14.960809035644532,7.719512939453125,15.19239903564453C7.719512939453125,16.02079903564453,7.047942939453125,16.69239903564453,6.219512939453125,16.69239903564453C5.391085939453125,16.69239903564453,4.719512939453125,16.02079903564453,4.719512939453125,15.19239903564453C4.719512939453125,14.36394903564453,5.391085939453125,13.692379035644532,6.219512939453125,13.692379035644532C6.451092939453125,13.692379035644532,6.670412939453125,13.74485903564453,6.866232939453125,13.83856903564453L9.865702939453126,10.83909903564453C9.771992939453124,10.643279035644532,9.719512939453125,10.42395903564453,9.719512939453125,10.192379035644532C9.719512939453125,9.36394903564453,10.391082939453124,8.692379035644532,11.219512939453125,8.692379035644532C11.451092939453126,8.692379035644532,11.670412939453126,8.74485903564453,11.866232939453125,8.838569035644532L15.462112939453124,5.242645035644531C15.657412939453126,5.047383335644532,15.974012939453125,5.047383335644532,16.169212939453125,5.242645035644531C16.364512939453125,5.437907035644531,16.364512939453125,5.754489035644531,16.169212939453125,5.949752035644531L12.573332939453124,9.545679035644532C12.667042939453125,9.74149903564453,12.719512939453125,9.96080903564453,12.719512939453125,10.192379035644532C12.719512939453125,11.020809035644533,12.047942939453126,11.692379035644532,11.219512939453125,11.692379035644532C10.987942939453125,11.692379035644532,10.768632939453125,11.639909035644532,10.572812939453126,11.54619903564453L7.573332939453125,14.54567903564453Z" stroke-opacity="0" stroke="none"></path></svg>'), jh = () => Rh.cloneNode(!0), Qh = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M15.719512939453125,8.461776733398438C16.547912939453127,8.461776733398438,17.219512939453125,7.7902067333984375,17.219512939453125,6.9617767333984375C17.219512939453125,6.133349733398438,16.547912939453127,5.4617767333984375,15.719512939453125,5.4617767333984375C14.891082939453124,5.4617767333984375,14.219512939453125,6.133349733398438,14.219512939453125,6.9617767333984375C14.219512939453125,7.193346733398437,14.271992939453124,7.412666733398438,14.365692939453124,7.608486733398438L7.366222939453126,14.607956733398437C7.170402939453125,14.514256733398437,6.951082939453125,14.461776733398438,6.719512939453125,14.461776733398438C5.891085939453125,14.461776733398438,5.219512939453125,15.133346733398437,5.219512939453125,15.961776733398438C5.219512939453125,16.79017673339844,5.891085939453125,17.461776733398438,6.719512939453125,17.461776733398438C7.547942939453125,17.461776733398438,8.219512939453125,16.79017673339844,8.219512939453125,15.961776733398438C8.219512939453125,15.730176733398437,8.167032939453126,15.510876733398437,8.073322939453124,15.315066733398437L15.072802939453124,8.315586733398437C15.268612939453124,8.409296733398438,15.487912939453125,8.461776733398438,15.719512939453125,8.461776733398438Z" stroke-opacity="0" stroke="none"></path></svg>'), Zh = () => Qh.cloneNode(!0), Hh = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17.0643,7.033864912109375L18,3.585784912109375L14.5078,4.509695912109375L15.3537,5.344934912109375L6.02026,14.560584912109375C5.87635,14.517484912109374,5.72366,14.494284912109375,5.5655,14.494284912109375C4.7009,14.494284912109375,4,15.186384912109375,4,16.040084912109375C4,16.893784912109375,4.7009,17.585784912109375,5.5655,17.585784912109375C6.43011,17.585784912109375,7.13101,16.893784912109375,7.13101,16.040084912109375C7.13101,15.722284912109375,7.03392,15.426984912109376,6.86744,15.181384912109374L16.0917,6.073604912109375L17.0643,7.033864912109375Z" stroke-opacity="0" stroke="none"></path></svg>'), qh = () => Hh.cloneNode(!0), Yh = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,13.00505L18.5,13.00505C18.7761,13.00505,19,13.228909999999999,19,13.50505C19,13.781189999999999,18.7761,14.00505,18.5,14.00505L6.91465,14.00505C6.70873,14.58765,6.15311,15.00505,5.5,15.00505C4.671573,15.00505,4,14.33348,4,13.50505C4,12.67662,4.671573,12.00505,5.5,12.00505C6.15311,12.00505,6.70873,12.422450000000001,6.91465,13.00505ZM7.81404,11.625L10.48591,11.625L10.48591,10.90625L9.65193,10.90625L9.65193,7.125L8.997630000000001,7.125C8.71443,7.306641,8.415600000000001,7.419922,7.96443,7.498047L7.96443,8.05078L8.77497,8.05078L8.77497,10.90625L7.81404,10.90625L7.81404,11.625ZM11.081620000000001,11.625L14.0562,11.625L14.0562,10.88281L13.09724,10.88281C12.8863,10.88281,12.59333,10.90625,12.36482,10.93555C13.17537,10.11328,13.84724,9.2207,13.84724,8.39062C13.84724,7.541016,13.28865,7,12.4488,7C11.84333,7,11.446850000000001,7.234375,11.03279,7.679688L11.52497,8.16797C11.747630000000001,7.914062,12.0113,7.697266,12.33552,7.697266C12.7613,7.697266,13.00154,7.982422,13.00154,8.43359C13.00154,9.14648,12.29255,10.00781,11.081620000000001,11.11523L11.081620000000001,11.625ZM15.9605,11.75C16.8121,11.75,17.526899999999998,11.2832,17.526899999999998,10.4375C17.526899999999998,9.82031,17.142200000000003,9.43945,16.6441,9.30078L16.6441,9.27148C17.1129,9.08594,17.3824,8.7207,17.3824,8.21289C17.3824,7.421875,16.8004,7,15.9429,7C15.4215,7,14.9957,7.210938,14.6109,7.541016L15.066,8.11133C15.3258,7.849609,15.5836,7.697266,15.9019,7.697266C16.2789,7.697266,16.4957,7.914062,16.4957,8.28125C16.4957,8.70898,16.2301,9,15.4215,9L15.4215,9.63672C16.3804,9.63672,16.6383,9.91992,16.6383,10.38086C16.6383,10.79688,16.3336,11.03125,15.8824,11.03125C15.4742,11.03125,15.1578,10.82227,14.8922,10.55078L14.4781,11.13281C14.7906,11.486329999999999,15.2652,11.75,15.9605,11.75Z" stroke-opacity="0" stroke="none"></path></svg>'), Wh = () => Yh.cloneNode(!0), Gh = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.146447,14.178126025390625C2.9511847,13.982826025390626,2.9511847,13.666226025390625,3.146447,13.470926025390625L7.39146,9.225966025390626C7.35417,9.095106025390624,7.33421,8.956946025390625,7.33421,8.814116025390625C7.33421,7.985696025390625,8.00578,7.314116025390625,8.834209999999999,7.314116025390625C8.97703,7.314116025390625,9.11519,7.334086025390625,9.24605,7.371366025390625L13.753,2.864373025390625C13.9483,2.669110325390625,14.2649,2.669110325390625,14.4602,2.864373025390625C14.6554,3.059635025390625,14.6554,3.376217025390625,14.4602,3.571479025390625L10.06916,7.962476025390625C10.23631,8.204386025390626,10.334209999999999,8.497826025390625,10.334209999999999,8.814116025390625C10.334209999999999,9.642546025390626,9.66264,10.314116025390625,8.834209999999999,10.314116025390625C8.51791,10.314116025390625,8.22448,10.216226025390625,7.98256,10.049076025390626L3.853554,14.178126025390625C3.658291,14.373326025390625,3.341709,14.373326025390625,3.146447,14.178126025390625ZM7.67736,19.188526025390626C7.4821,18.993226025390626,7.4821,18.676626025390625,7.67736,18.481426025390626L9.9804,16.178326025390625C9.88669,15.982526025390625,9.834209999999999,15.763226025390624,9.834209999999999,15.531626025390626C9.834209999999999,14.703226025390626,10.50578,14.031626025390626,11.33421,14.031626025390626C11.56579,14.031626025390626,11.78511,14.084126025390624,11.98093,14.177826025390624L13.9804,12.178356025390626C13.8867,11.982536025390624,13.8342,11.763216025390625,13.8342,11.531636025390625C13.8342,10.703206025390624,14.5058,10.031636025390625,15.3342,10.031636025390625C15.5658,10.031636025390625,15.7851,10.084116025390625,15.9809,10.177826025390626L18.284,7.874796025390625C18.4792,7.679536025390625,18.7958,7.679536025390625,18.9911,7.874796025390625C19.1863,8.070056025390624,19.1863,8.386636025390626,18.9911,8.581906025390625L16.688000000000002,10.884936025390624C16.7817,11.080756025390626,16.8342,11.300066025390626,16.8342,11.531636025390625C16.8342,12.360066025390624,16.162599999999998,13.031626025390626,15.3342,13.031626025390626C15.1026,13.031626025390626,14.8833,12.979126025390626,14.6875,12.885426025390625L12.68803,14.884926025390625C12.78174,15.080726025390625,12.83421,15.300026025390626,12.83421,15.531626025390626C12.83421,16.360026025390624,12.16264,17.031626025390626,11.33421,17.031626025390626C11.10264,17.031626025390626,10.88333,16.979126025390627,10.68751,16.885426025390625L8.38446,19.188526025390626C8.1892,19.383726025390626,7.87262,19.383726025390626,7.67736,19.188526025390626Z" stroke-opacity="0" stroke="none"></path></svg>'), Xh = () => Gh.cloneNode(!0), Jh = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.3367688759765626,12.63173C3.5320318759765623,12.82699,3.8486138759765627,12.82699,4.043876875976562,12.63173L11.822052875976562,4.853553C12.017312875976563,4.658291,12.017312875976563,4.341708,11.822052875976562,4.146446C11.626792875976562,3.9511843,11.310202875976563,3.9511843,11.114942875976563,4.146446L3.3367688759765626,11.92462C3.1415071759765625,12.11988,3.1415071759765625,12.43647,3.3367688759765626,12.63173ZM5.001492875976562,17.0351C4.806232875976562,16.8399,4.806232875976562,16.5233,5.001492875976562,16.328L7.304532875976562,14.025C7.210822875976563,13.82916,7.158352875976563,13.60984,7.158352875976563,13.37827C7.158352875976563,12.54984,7.829922875976562,11.87827,8.658352875976561,11.87827C8.889922875976563,11.87827,9.109232875976563,11.93075,9.305052875976562,12.02446L11.304532875976562,10.02498C11.210822875976563,9.82916,11.158352875976561,9.60984,11.158352875976561,9.37827C11.158352875976561,8.54984,11.829922875976562,7.8782700000000006,12.658352875976563,7.8782700000000006C12.889922875976563,7.8782700000000006,13.109232875976563,7.93075,13.305022875976562,8.024460000000001L15.608122875976562,5.72142C15.803322875976562,5.5261499999999995,16.119922875976563,5.5261499999999995,16.315222875976563,5.72142C16.510422875976563,5.9166799999999995,16.510422875976563,6.23326,16.315222875976563,6.42852L14.012122875976562,8.73156C14.105822875976562,8.92738,14.158322875976562,9.1467,14.158322875976562,9.37827C14.158322875976562,10.2067,13.486822875976562,10.87827,12.658352875976563,10.87827C12.426772875976562,10.87827,12.207452875976562,10.82579,12.011642875976563,10.73209L10.012162875976562,12.73156C10.105872875976562,12.92738,10.158352875976561,13.1467,10.158352875976561,13.37827C10.158352875976561,14.2067,9.486772875976563,14.8783,8.658352875976561,14.8783C8.426772875976562,14.8783,8.207452875976562,14.8258,8.011642875976563,14.7321L5.708602875976562,17.0351C5.513342875976562,17.2304,5.196752875976562,17.2304,5.001492875976562,17.0351ZM10.415712875976563,18.328C10.220452875976562,18.5233,9.903862875976563,18.5233,9.708602875976563,18.328C9.513342875976562,18.1328,9.513342875976562,17.816200000000002,9.708602875976563,17.6209L12.304532875976562,15.025C12.210822875976563,14.8292,12.158352875976563,14.6098,12.158352875976563,14.3783C12.158352875976563,13.54984,12.829922875976562,12.87827,13.658322875976562,12.87827C13.889922875976563,12.87827,14.109222875976563,12.93075,14.305022875976562,13.02446L17.486822875976564,9.84274C17.682022875976564,9.64747,17.99862287597656,9.64747,18.19392287597656,9.84274C18.38912287597656,10.038,18.38912287597656,10.35458,18.19392287597656,10.54984L15.012122875976562,13.73156C15.105822875976562,13.92738,15.158322875976562,14.1467,15.158322875976562,14.3783C15.158322875976562,15.2067,14.486822875976562,15.8783,13.658322875976562,15.8783C13.426822875976562,15.8783,13.207422875976562,15.8258,13.011642875976563,15.7321L10.415712875976563,18.328Z" stroke-opacity="0" stroke="none"></path></svg>'), ef = () => Jh.cloneNode(!0), tf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M13.1889,6C12.98303,6.582599999999999,12.42741,7,11.7743,7C11.12119,7,10.565570000000001,6.582599999999999,10.35965,6L3.5,6C3.223857,6,3,5.77614,3,5.5C3,5.22386,3.223857,5,3.5,5L10.35965,5C10.565570000000001,4.417404,11.12119,4,11.7743,4C12.42741,4,12.98303,4.417404,13.1889,5L18.5,5C18.7761,5,19,5.22386,19,5.5C19,5.77614,18.7761,6,18.5,6L13.1889,6ZM3,8.5C3,8.22386,3.223857,8,3.5,8L18.5,8C18.7761,8,19,8.22386,19,8.5C19,8.77614,18.7761,9,18.5,9L3.5,9C3.223857,9,3,8.77614,3,8.5ZM3.278549,11.5C3.278549,11.22386,3.502407,11,3.778549,11L18.7785,11C19.0547,11,19.2785,11.22386,19.2785,11.5C19.2785,11.77614,19.0547,12,18.7785,12L3.778549,12C3.502407,12,3.278549,11.77614,3.278549,11.5ZM3.139267,14.5C3.139267,14.2239,3.363124,14,3.6392670000000003,14L18.6393,14C18.915399999999998,14,19.1393,14.2239,19.1393,14.5C19.1393,14.7761,18.915399999999998,15,18.6393,15L3.6392670000000003,15C3.363124,15,3.139267,14.7761,3.139267,14.5ZM13.1889,18C12.98303,18.5826,12.42741,19,11.7743,19C11.12119,19,10.565570000000001,18.5826,10.35965,18L3.778549,18C3.502407,18,3.278549,17.7761,3.278549,17.5C3.278549,17.2239,3.502407,17,3.778549,17L10.35965,17C10.565570000000001,16.4174,11.12119,16,11.7743,16C12.42741,16,12.98303,16.4174,13.1889,17L18.7785,17C19.0547,17,19.2785,17.2239,19.2785,17.5C19.2785,17.7761,19.0547,18,18.7785,18L13.1889,18Z" stroke-opacity="0" stroke="none"></path></svg>'), nf = () => tf.cloneNode(!0), rf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4.91465,6C4.70873,6.582599999999999,4.15311,7,3.5,7C2.671573,7,2,6.32843,2,5.5C2,4.671573,2.671573,4,3.5,4C4.15311,4,4.70873,4.417404,4.91465,5L18.2257,5C18.5018,5,18.7257,5.22386,18.7257,5.5C18.7257,5.77614,18.5018,6,18.2257,6L4.91465,6ZM2.7257,8.5C2.7257,8.22386,2.949558,8,3.2257,8L18.2257,8C18.5018,8,18.7257,8.22386,18.7257,8.5C18.7257,8.77614,18.5018,9,18.2257,9L3.2257,9C2.949558,9,2.7257,8.77614,2.7257,8.5ZM3.00425,11.5C3.00425,11.22386,3.22811,11,3.50425,11L18.5042,11C18.7804,11,19.0042,11.22386,19.0042,11.5C19.0042,11.77614,18.7804,12,18.5042,12L3.50425,12C3.22811,12,3.00425,11.77614,3.00425,11.5ZM2.864967,14.5C2.864967,14.2239,3.08882,14,3.36497,14L18.365,14C18.6411,14,18.865,14.2239,18.865,14.5C18.865,14.7761,18.6411,15,18.365,15L3.36497,15C3.08882,15,2.864967,14.7761,2.864967,14.5ZM20,17.5C20,18.328400000000002,19.3284,19,18.5,19C17.846899999999998,19,17.2913,18.5826,17.0854,18L3.50425,18C3.22811,18,3.00425,17.7761,3.00425,17.5C3.00425,17.2239,3.22811,17,3.50425,17L17.0854,17C17.2913,16.4174,17.846899999999998,16,18.5,16C19.3284,16,20,16.671599999999998,20,17.5Z" stroke-opacity="0" stroke="none"></path></svg>'), of = () => rf.cloneNode(!0), af = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="5" ry="5" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="3" ry="3" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse></svg>'), sf = () => af.cloneNode(!0), lf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3,7.32468C5.90649,3.3893050000000002,11.49833,2.81306,14.6674,6.31944C14.9056,6.1554199999999994,15.192,6.05979,15.5,6.05979C15.845,6.05979,16.1628,6.17974,16.4162,6.381349999999999L18.4509,4.23827L19,4.816615L16.8945,7.03429C16.962600000000002,7.21075,17,7.40319,17,7.60463C17,8.45782,16.328400000000002,9.14947,15.5,9.14947C14.6716,9.14947,14,8.45782,14,7.60463C14,7.36402,14.0534,7.13625,14.1487,6.93322C11.32695,3.748365,6.25159,4.253956,3.612785,7.82695L3,7.32468ZM14.09,15.4717C15.7427,13.78985,16.244500000000002,11.524740000000001,15.5633,9.30134L15.5618,9.30134L16.3012,9.0502C17.072400000000002,11.56646,16.497700000000002,14.158,14.6282,16.0599C12.28737,18.442,8.62386,18.6988,6.41348,16.4501C4.5526,14.5572,4.52076,11.19671,6.36766,9.3177C7.89069,7.76754,10.07544,7.706189999999999,11.56741,9.22363C11.95453,9.61742,12.24817,10.08363,12.43369,10.57677L14.1451,8.77421L14.6942,9.35256L12.64982,11.50582C12.65827,11.59712,12.66295,11.68839,12.66378,11.77936C12.87398,12.04523,13,12.38451,13,12.7541C13,13.60729,12.32843,14.2989,11.5,14.2989C10.67157,14.2989,10,13.60729,10,12.7541C10,11.90091,10.67157,11.20926,11.5,11.20926C11.60387,11.20926,11.70528,11.220130000000001,11.8032,11.240829999999999L11.81763,11.22564C11.69858,10.71874,11.42858,10.21929,11.0284,9.81179C9.844000000000001,8.60765,8.136890000000001,8.65592,6.90822,9.90586C5.37975,11.460930000000001,5.40693,14.288,6.95404,15.8619C8.84598,17.7867,12.03496,17.5626,14.09,15.4717Z" stroke-opacity="0" stroke="none"></path></svg>'), cf = () => lf.cloneNode(!0), uf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4,17.0854L4,3.5C4,3.223858,4.22386,3,4.5,3C4.77614,3,5,3.223858,5,3.5L5,10L7.57584,10L9.8127,4.46359C9.91614,4.20756,10.20756,4.08386,10.46359,4.1873000000000005C10.71963,4.29075,10.84333,4.58216,10.73988,4.8382000000000005L8.65438,10L11.08535,10C11.29127,9.4174,11.84689,9,12.5,9C12.65154,9,12.79784,9.02247,12.93573,9.06427L16.6464,5.35355C16.8417,5.15829,17.1583,5.15829,17.3536,5.35355C17.5488,5.54882,17.5488,5.8654,17.3536,6.06066L13.7475,9.66675C13.907,9.90508,14,10.19168,14,10.5C14,11.15311,13.5826,11.70873,13,11.91465L13,14.3638L18.3714,12.1936C18.6274,12.09015,18.918799999999997,12.21385,19.0222,12.46989C19.1257,12.72592,19.002,13.0173,18.746000000000002,13.1208L13,15.4423L13,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854ZM6.3729499999999994,17.0413L12,14.7678L12,11.91465C11.88136,11.87271,11.76956,11.81627,11.66675,11.74746L6.3729499999999994,17.0413ZM12,15.8463L6.6694700000000005,18L12,18L12,15.8463ZM6.38629,15.6137L8.250350000000001,11L11,11L6.38629,15.6137ZM5,11L7.17182,11L5,16.3754L5,11Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), df = () => uf.cloneNode(!0), hf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17,4.5C17,5.32843,16.328400000000002,6,15.5,6C15.0931,6,14.7241,5.83802,14.4539,5.57503L5.98992,8.32515C5.99658,8.38251,6,8.440850000000001,6,8.5C6,9.15311,5.582599999999999,9.70873,5,9.91465L5,11.08535C5.42621,11.236,5.763999999999999,11.57379,5.91465,12L19.5,12C19.7761,12,20,12.22386,20,12.5C20,12.77614,19.7761,13,19.5,13L5.91465,13C5.70873,13.5826,5.15311,14,4.5,14C3.671573,14,3,13.3284,3,12.5C3,11.84689,3.417404,11.29127,4,11.08535L4,9.91465C3.417404,9.70873,3,9.15311,3,8.5C3,7.67157,3.671573,7,4.5,7C4.90411,7,5.2709,7.15981,5.5406200000000005,7.41967L14.0093,4.66802C14.0032,4.6128599999999995,14,4.5568,14,4.5C14,3.671573,14.6716,3,15.5,3C16.328400000000002,3,17,3.671573,17,4.5ZM4,15.5C4,15.2239,4.22386,15,4.5,15L19.5,15C19.7761,15,20,15.2239,20,15.5C20,15.7761,19.7761,16,19.5,16L4.5,16C4.22386,16,4,15.7761,4,15.5ZM4,18.5C4,18.2239,4.22386,18,4.5,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L4.5,19C4.22386,19,4,18.7761,4,18.5Z" stroke-opacity="0" stroke="none"></path></svg>'), ff = () => hf.cloneNode(!0), gf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M20,3.5C20,4.15311,19.5826,4.70873,19,4.91465L19,18.5C19,18.7761,18.7761,19,18.5,19L4.91465,19C4.70873,19.5826,4.15311,20,3.5,20C2.671573,20,2,19.3284,2,18.5C2,17.846899999999998,2.417404,17.2913,3,17.0854L3,3.5C3,3.22386,3.22386,3,3.5,3L17.0854,3C17.2913,2.417404,17.846899999999998,2,18.5,2C19.3284,2,20,2.671573,20,3.5ZM17.0854,4C17.236,4.42621,17.5738,4.763999999999999,18,4.91465L18,8L14,8L14,4L17.0854,4ZM13,4L13,8L9,8L9,4L13,4ZM13,9L9,9L9,13L13,13L13,9ZM13,14L9,14L9,18L13,18L13,14ZM14,18L14,14L18,14L18,18L14,18ZM18,13L14,13L14,9L18,9L18,13ZM4.91465,18C4.763999999999999,17.5738,4.42621,17.236,4,17.0854L4,14L8,14L8,18L4.91465,18ZM4,8L4,4L8,4L8,8L4,8ZM8,9L8,13L4,13L4,9L8,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), mf = () => gf.cloneNode(!0), yf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" fill="none" stroke-opacity="1" stroke-width="1"></ellipse></svg>'), Cf = () => yf.cloneNode(!0), pf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.57625,6.9981C11.55099,6.999359999999999,11.52557,7,11.5,7C11.34,7,11.18584,6.97495,11.04125,6.9285499999999995L5.55401,16.4327C5.713760000000001,16.5905,5.83826,16.7839,5.91465,17L16.0854,17C16.2187,16.622700000000002,16.4987,16.314700000000002,16.8569,16.1445L11.57625,6.9981ZM12.50759,6.611219999999999C12.81005,6.336790000000001,13,5.94058,13,5.5C13,4.671573,12.32843,4,11.5,4C10.67157,4,10,4.671573,10,5.5C10,5.80059,10.08841,6.08052,10.24066,6.31522L4.64514,16.0069C4.59738,16.002299999999998,4.54896,16,4.5,16C3.671573,16,3,16.671599999999998,3,17.5C3,18.328400000000002,3.671573,19,4.5,19C5.15311,19,5.70873,18.5826,5.91465,18L16.0854,18C16.2913,18.5826,16.846899999999998,19,17.5,19C18.328400000000002,19,19,18.328400000000002,19,17.5C19,16.8365,18.5691,16.2735,17.971899999999998,16.075699999999998L12.50759,6.611219999999999Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), vf = () => pf.cloneNode(!0), bf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19,4.5C19,5.15311,18.5826,5.70873,18,5.91465L18,18.5C18,18.7761,17.7761,19,17.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854L4,4.5C4,4.22386,4.22386,4,4.5,4L16.0854,4C16.2913,3.417404,16.846899999999998,3,17.5,3C18.328400000000002,3,19,3.671573,19,4.5ZM5,5L16.0854,5C16.236,5.42621,16.5738,5.763999999999999,17,5.91465L17,18L5.91465,18C5.763999999999999,17.5738,5.42621,17.236,5,17.0854L5,5Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), $f = () => bf.cloneNode(!0), _f = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19.6401,7.99355C20.4028,7.92291,21,7.2811900000000005,21,6.5C21,5.671573,20.3284,5,19.5,5C18.8469,5,18.2913,5.417404,18.0854,6L7.62067,6C7.34453,6,7.12067,6.22386,7.12067,6.5C7.12067,6.5479,7.12741,6.59423,7.13999,6.63809L3.2294099999999997,15.0243C2.530138,15.1517,2,15.764,2,16.5C2,17.328400000000002,2.671573,18,3.5,18C4.15311,18,4.70873,17.5826,4.91465,17L14.5963,17C14.6456,17.076,14.7162,17.1396,14.8044,17.1807C15.0546,17.2974,15.3521,17.1891,15.4688,16.9388L19.6401,7.99355ZM14.7896,16.0293L18.6551,7.739599999999999C18.3942,7.56144,18.1925,7.30307,18.0854,7L8.0746,7L4.25044,15.2009C4.55701,15.3784,4.79493,15.6613,4.91465,16L14.6207,16C14.68,16,14.7368,16.0103,14.7896,16.0293Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), kf = () => _f.cloneNode(!0), xf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.134443814697265,7.494615087890625L8.764323814697265,7.494615087890625L8.764323814697265,3.414215087890625L8.310223814697267,3.414215087890625L7.294603814697266,4.005035087890625L7.289713814697266,4.634915087890625L8.134443814697265,4.149892087890625L8.134443814697265,7.494615087890625ZM18.832003814697266,6.933095087890624Q19.004603814697266,6.635245087890625,19.004603814697266,6.2543850878906255Q19.004603814697266,5.884915087890625,18.845103814697264,5.593575087890625Q18.685503814697267,5.3006050878906255,18.399103814697266,5.136225087890625Q18.114303814697266,4.9702050878906245,17.754603814697266,4.9653250878906245L18.820603814697265,3.840647087890625L18.820603814697265,3.414215087890625L16.519203814697264,3.414215087890625L16.519203814697264,3.939931087890625L18.050803814697264,3.939931087890625L16.719403814697266,5.334785087890625L17.074203814697263,5.7205350878906245Q17.254903814697265,5.484525087890625,17.619503814697268,5.484525087890625Q17.980803814697268,5.484525087890625,18.187503814697266,5.689605087890625Q18.394203814697267,5.894685087890625,18.394203814697267,6.2543850878906255Q18.394203814697267,6.604315087890625,18.187503814697266,6.822415087890625Q17.980803814697268,7.0405150878906255,17.640603814697265,7.0405150878906255Q17.334603814697267,7.0405150878906255,17.124703814697266,6.890775087890625Q16.914703814697265,6.739415087890626,16.820303814697265,6.469225087890624L16.354803814697263,6.744295087890626Q16.480103814697266,7.125155087890625,16.821903814697265,7.341625087890625Q17.165403814697264,7.559725087890625,17.640603814697265,7.559725087890625Q18.039403814697266,7.559725087890625,18.348603814697267,7.393705087890625Q18.659503814697267,7.229315087890625,18.832003814697266,6.933095087890624ZM10.000003814697266,10.634915087890626C10.000003814697266,11.024655087890626,9.851363814697265,11.379685087890625,9.607683814697266,11.646395087890625L12.168903814697266,15.171615087890626C12.275403814697265,15.147615087890625,12.386203814697266,15.134915087890626,12.500003814697266,15.134915087890626C12.596503814697266,15.134915087890626,12.690803814697265,15.144015087890624,12.782303814697265,15.161415087890624L16.108803814697268,11.196955087890625C16.038703814697264,11.023375087890624,16.000003814697266,10.833655087890625,16.000003814697266,10.634915087890626C16.000003814697266,9.806495087890625,16.671603814697264,9.134915087890626,17.500003814697266,9.134915087890626C18.328403814697264,9.134915087890626,19.000003814697266,9.806495087890625,19.000003814697266,10.634915087890626C19.000003814697266,11.463345087890625,18.328403814697264,12.134915087890626,17.500003814697266,12.134915087890626C17.239503814697265,12.134915087890626,16.994503814697268,12.068495087890625,16.781003814697264,11.951675087890624L13.654703814697266,15.677415087890624C13.870303814697266,15.937215087890625,14.000003814697266,16.270915087890625,14.000003814697266,16.634915087890626C14.000003814697266,17.463315087890624,13.328403814697266,18.134915087890626,12.500003814697266,18.134915087890626C11.671573814697265,18.134915087890626,11.000003814697266,17.463315087890624,11.000003814697266,16.634915087890626C11.000003814697266,16.284415087890626,11.120193814697265,15.962015087890626,11.321603814697266,15.706715087890625L8.715393814697265,12.119565087890624C8.645053814697267,12.129685087890625,8.573143814697266,12.134915087890626,8.500003814697266,12.134915087890626C8.162103814697264,12.134915087890626,7.8503038146972655,12.023195087890626,7.599523814697266,11.834665087890626L4.505583814697266,15.521915087890624C4.809213814697266,15.796415087890624,5.000003814697266,16.193415087890624,5.000003814697266,16.634915087890626C5.000003814697266,17.463315087890624,4.328433814697266,18.134915087890626,3.5000038146972656,18.134915087890626C2.6715768146972656,18.134915087890626,2.0000038146972656,17.463315087890624,2.0000038146972656,16.634915087890626C2.0000038146972656,15.806515087890626,2.6715768146972656,15.134915087890626,3.5000038146972656,15.134915087890626C3.508253814697266,15.134915087890626,3.5164838146972657,15.135015087890626,3.524703814697266,15.135115087890625L7.033823814697266,10.953115087890625C7.011673814697265,10.850565087890626,7.000003814697266,10.744105087890624,7.000003814697266,10.634915087890626C7.000003814697266,9.806495087890625,7.671573814697266,9.134915087890626,8.500003814697266,9.134915087890626C9.328433814697267,9.134915087890626,10.000003814697266,9.806495087890625,10.000003814697266,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Lf = () => xf.cloneNode(!0), wf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.13444,7.494615087890625L8.76432,7.494615087890625L8.76432,3.414215087890625L8.310220000000001,3.414215087890625L7.2946,4.005035087890625L7.28971,4.634915087890625L8.13444,4.149892087890625L8.13444,7.494615087890625ZM18.832,6.929835087890625Q19.0046,6.635245087890625,19.0046,6.2543850878906255Q19.0046,5.889805087890625,18.8451,5.5952050878906245Q18.6855,5.3006050878906255,18.3975,5.132965087890625Q18.1094,4.9653250878906245,17.7399,4.9653250878906245Q17.435499999999998,4.9653250878906245,17.1556,5.149245087890625L17.2793,3.939931087890625L18.8304,3.939931087890625L18.8304,3.414215087890625L16.7406,3.414215087890625L16.5094,5.665195087890625L17.0156,5.795405087890625Q17.095399999999998,5.655425087890626,17.2516,5.570795087890625Q17.4095,5.484525087890625,17.6357,5.484525087890625Q17.9694,5.484525087890625,18.1842,5.697745087890625Q18.4007,5.909335087890625,18.4007,6.2543850878906255Q18.4007,6.604315087890625,18.1842,6.822415087890625Q17.9694,7.0405150878906255,17.6292,7.0405150878906255Q17.3298,7.0405150878906255,17.119799999999998,6.890775087890625Q16.9098,6.739415087890626,16.825200000000002,6.474115087890625L16.3597,6.749175087890626Q16.470399999999998,7.110505087890624,16.807299999999998,7.335115087890625Q17.144199999999998,7.559725087890625,17.6292,7.559725087890625Q18.0296,7.559725087890625,18.3438,7.392075087890625Q18.6595,7.224435087890625,18.832,6.929835087890625ZM10,10.634915087890626C10,11.024655087890626,9.85136,11.379685087890625,9.60768,11.646395087890625L12.1689,15.171615087890626C12.2754,15.147615087890625,12.3862,15.134915087890626,12.5,15.134915087890626C12.5965,15.134915087890626,12.6908,15.144015087890624,12.7823,15.161415087890624L16.108800000000002,11.196955087890625C16.0387,11.023375087890624,16,10.833655087890625,16,10.634915087890626C16,9.806495087890625,16.671599999999998,9.134915087890626,17.5,9.134915087890626C18.3284,9.134915087890626,19,9.806495087890625,19,10.634915087890626C19,11.463345087890625,18.3284,12.134915087890626,17.5,12.134915087890626C17.2395,12.134915087890626,16.994500000000002,12.068505087890625,16.781,11.951675087890624L13.6547,15.677415087890624C13.8703,15.937215087890625,14,16.270915087890625,14,16.634915087890626C14,17.463315087890624,13.3284,18.134915087890626,12.5,18.134915087890626C11.67157,18.134915087890626,11,17.463315087890624,11,16.634915087890626C11,16.284415087890626,11.12019,15.962015087890626,11.3216,15.706715087890625L8.71539,12.119565087890624C8.645050000000001,12.129685087890625,8.57314,12.134915087890626,8.5,12.134915087890626C8.162099999999999,12.134915087890626,7.8503,12.023195087890626,7.59952,11.834665087890626L4.50558,15.521915087890624C4.80921,15.796415087890624,5,16.193415087890624,5,16.634915087890626C5,17.463315087890624,4.32843,18.134915087890626,3.5,18.134915087890626C2.671573,18.134915087890626,2,17.463315087890624,2,16.634915087890626C2,15.806515087890626,2.671573,15.134915087890626,3.5,15.134915087890626C3.5082500000000003,15.134915087890626,3.51648,15.135015087890626,3.5247,15.135115087890625L7.03382,10.953115087890625C7.01167,10.850565087890626,7,10.744105087890624,7,10.634915087890626C7,9.806495087890625,7.67157,9.134915087890626,8.5,9.134915087890626C9.32843,9.134915087890626,10,9.806495087890625,10,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Tf = () => wf.cloneNode(!0), Af = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M18.8532,7.020985087890625Q19.0257,6.734525087890625,19.0257,6.369945087890625Q19.0257,6.020005087890625,18.8499,5.754705087890625Q18.6758,5.489415087890626,18.3649,5.339675087890625Q18.5944,5.209465087890625,18.7214,4.994615087890625Q18.8499,4.779775087890625,18.8499,4.5193550878906255Q18.8499,4.2003480878906245,18.7002,3.951324087890625Q18.5505,3.700673087890625,18.277,3.557444087890625Q18.0052,3.414215087890625,17.6455,3.414215087890625Q17.285800000000002,3.414215087890625,17.0107,3.557444087890625Q16.7357,3.700673087890625,16.5843,3.951324087890625Q16.4346,4.2003480878906245,16.4346,4.5193550878906255Q16.4346,4.779775087890625,16.561500000000002,4.994615087890625Q16.6901,5.209465087890625,16.919600000000003,5.339675087890625Q16.6055,5.489415087890626,16.4297,5.757965087890625Q16.255499999999998,6.024895087890625,16.255499999999998,6.369945087890625Q16.255499999999998,6.734525087890625,16.4297,7.020985087890625Q16.6055,7.305815087890625,16.919600000000003,7.465325087890625Q17.2354,7.624825087890625,17.6455,7.624825087890625Q18.0557,7.624825087890625,18.3682,7.465325087890625Q18.6807,7.305815087890625,18.8532,7.020985087890625ZM8.76432,7.559725087890625L8.13444,7.559725087890625L8.13444,4.214996087890625L7.28971,4.700025087890625L7.2946,4.070139087890625L8.310220000000001,3.479319087890625L8.76432,3.479319087890625L8.76432,7.559725087890625ZM17.1816,4.955555087890625Q17.0042,4.784655087890625,17.0042,4.5095950878906255Q17.0042,4.229645087890625,17.18,4.057119087890625Q17.355800000000002,3.884592087890625,17.6455,3.884592087890625Q17.935200000000002,3.884592087890625,18.1077,4.057119087890625Q18.2803,4.229645087890625,18.2803,4.5095950878906255Q18.2803,4.784655087890625,18.1045,4.955555087890625Q17.930300000000003,5.124825087890625,17.6455,5.124825087890625Q17.3607,5.124825087890625,17.1816,4.955555087890625ZM18.2217,5.7953950878906255Q18.4398,6.005365087890625,18.4398,6.3552950878906245Q18.4398,6.705235087890625,18.2217,6.915195087890625Q18.0052,7.125155087890625,17.6455,7.125155087890625Q17.285800000000002,7.125155087890625,17.067700000000002,6.915195087890625Q16.849600000000002,6.705235087890625,16.849600000000002,6.3552950878906245Q16.849600000000002,6.005365087890625,17.064500000000002,5.7953950878906255Q17.2793,5.585435087890625,17.6455,5.585435087890625Q18.0052,5.585435087890625,18.2217,5.7953950878906255ZM9.60768,11.711495087890626C9.85136,11.444785087890626,10,11.089765087890626,10,10.700025087890625C10,9.871595087890626,9.32843,9.200025087890625,8.5,9.200025087890625C7.67157,9.200025087890625,7,9.871595087890626,7,10.700025087890625C7,10.809205087890625,7.01167,10.915665087890625,7.03382,11.018215087890624L3.5247,15.200215087890625C3.51648,15.200115087890625,3.5082500000000003,15.200015087890625,3.5,15.200015087890625C2.671573,15.200015087890625,2,15.871615087890625,2,16.700015087890627C2,17.528415087890625,2.671573,18.200015087890627,3.5,18.200015087890627C4.32843,18.200015087890627,5,17.528415087890625,5,16.700015087890627C5,16.258515087890625,4.80921,15.861515087890625,4.50558,15.587015087890626L7.59952,11.899765087890625C7.8503,12.088295087890625,8.162099999999999,12.200025087890625,8.5,12.200025087890625C8.57314,12.200025087890625,8.645050000000001,12.194785087890626,8.71539,12.184675087890625L11.3216,15.771815087890625C11.12019,16.027215087890625,11,16.349515087890623,11,16.700015087890627C11,17.528415087890625,11.67157,18.200015087890627,12.5,18.200015087890627C13.3284,18.200015087890627,14,17.528415087890625,14,16.700015087890627C14,16.336015087890623,13.8703,16.002315087890626,13.6547,15.742515087890625L16.781,12.016775087890625C16.994500000000002,12.133605087890626,17.2395,12.200025087890625,17.5,12.200025087890625C18.3284,12.200025087890625,19,11.528445087890624,19,10.700025087890625C19,9.871595087890626,18.3284,9.200025087890625,17.5,9.200025087890625C16.671599999999998,9.200025087890625,16,9.871595087890626,16,10.700025087890625C16,10.898765087890624,16.0387,11.088475087890625,16.108800000000002,11.262055087890625L12.7823,15.226515087890625C12.6908,15.209115087890625,12.5965,15.200015087890625,12.5,15.200015087890625C12.3862,15.200015087890625,12.2754,15.212715087890626,12.1689,15.236715087890625L9.60768,11.711495087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Mf = () => Af.cloneNode(!0), Sf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M9.474616630859375,7.494615087890625L8.844736630859375,7.494615087890625L8.844736630859375,4.149892087890625L8.000006630859374,4.634915087890625L8.004896630859374,4.005035087890625L9.020516630859376,3.414215087890625L9.474616630859375,3.414215087890625L9.474616630859375,7.494615087890625ZM18.529296630859378,4.8318550878906255Q18.307996630859375,5.028795087890625,18.122396630859377,5.385245087890625Q17.868496630859376,5.019035087890625,17.629196630859376,4.8269750878906255Q17.389996630859375,4.634915087890625,17.168596630859376,4.634915087890625Q16.794296630859375,4.634915087890625,16.522496630859376,4.976715087890625Q16.252296630859377,5.3168850878906255,16.252296630859377,5.7856350878906255Q16.252296630859377,6.218575087890625,16.502896630859375,6.521315087890625Q16.755196630859373,6.822415087890625,17.114896630859377,6.822415087890625Q17.368796630859375,6.822415087890625,17.588596630859374,6.625475087890624Q17.809896630859377,6.428535087890625,17.998696630859374,6.0688350878906245Q18.249396630859373,6.439935087890625,18.488596630859377,6.631985087890625Q18.727896630859377,6.822415087890625,18.952496630859375,6.822415087890625Q19.326796630859373,6.822415087890625,19.596996630859376,6.482245087890625Q19.868796630859375,6.140455087890626,19.868796630859375,5.671705087890626Q19.868796630859375,5.238755087890625,19.618196630859376,4.937655087890625Q19.367496630859375,4.634915087890625,19.006196630859375,4.634915087890625Q18.750696630859377,4.634915087890625,18.529296630859378,4.8318550878906255ZM18.337296630859377,5.674955087890625L18.278696630859375,5.596835087890625Q18.449596630859375,5.272935087890625,18.622096630859374,5.1101750878906245Q18.794596630859374,4.947415087890625,18.967096630859373,4.947415087890625Q19.194996630859375,4.947415087890625,19.346396630859374,5.1345950878906255Q19.497696630859377,5.320135087890625,19.497696630859377,5.598455087890625Q19.497696630859377,5.8914250878906245,19.360996630859376,6.096505087890625Q19.224296630859374,6.301585087890626,19.027396630859375,6.301585087890626Q18.915096630859374,6.301585087890626,18.742496630859375,6.146965087890624Q18.569996630859375,5.992335087890625,18.337296630859377,5.674955087890625ZM17.785496630859377,5.779125087890625L17.842496630859372,5.857245087890625Q17.668296630859373,6.186025087890625,17.495796630859374,6.348785087890625Q17.324896630859374,6.509915087890625,17.153996630859375,6.509915087890625Q16.926096630859377,6.509915087890625,16.774796630859377,6.324375087890624Q16.623396630859375,6.137195087890625,16.623396630859375,5.858875087890625Q16.623396630859375,5.565905087890625,16.761696630859376,5.360825087890625Q16.900096630859373,5.1557550878906255,17.095396630859376,5.1557550878906255Q17.228896630859374,5.1557550878906255,17.365596630859375,5.2778250878906245Q17.502296630859377,5.399895087890625,17.785496630859377,5.779125087890625ZM10.710296630859375,10.634915087890626C10.710296630859375,11.024655087890626,10.561656630859375,11.379685087890625,10.317976630859375,11.646395087890625L12.879196630859376,15.171615087890626C12.985696630859374,15.147615087890625,13.096496630859376,15.134915087890626,13.210296630859375,15.134915087890626C13.306796630859376,15.134915087890626,13.401096630859374,15.144015087890624,13.492596630859374,15.161415087890624L16.819096630859377,11.196955087890625C16.748996630859374,11.023375087890624,16.710296630859375,10.833655087890625,16.710296630859375,10.634915087890626C16.710296630859375,9.806495087890625,17.381896630859373,9.134915087890626,18.210296630859375,9.134915087890626C19.038696630859373,9.134915087890626,19.710296630859375,9.806495087890625,19.710296630859375,10.634915087890626C19.710296630859375,11.463345087890625,19.038696630859373,12.134915087890626,18.210296630859375,12.134915087890626C17.949796630859375,12.134915087890626,17.704796630859377,12.068505087890625,17.491296630859374,11.951675087890624L14.364996630859375,15.677415087890624C14.580596630859375,15.937215087890625,14.710296630859375,16.270915087890625,14.710296630859375,16.634915087890626C14.710296630859375,17.463315087890624,14.038696630859375,18.134915087890626,13.210296630859375,18.134915087890626C12.381866630859374,18.134915087890626,11.710296630859375,17.463315087890624,11.710296630859375,16.634915087890626C11.710296630859375,16.284415087890626,11.830486630859374,15.962015087890626,12.031896630859375,15.706715087890625L9.425686630859374,12.119565087890624C9.355346630859376,12.129685087890625,9.283436630859375,12.134915087890626,9.210296630859375,12.134915087890626C8.872396630859374,12.134915087890626,8.560596630859376,12.023195087890626,8.309816630859375,11.834665087890626L5.215876630859375,15.521915087890624C5.519506630859375,15.796415087890624,5.710296630859375,16.193415087890624,5.710296630859375,16.634915087890626C5.710296630859375,17.463315087890624,5.038726630859375,18.134915087890626,4.210296630859375,18.134915087890626C3.381869630859375,18.134915087890626,2.710296630859375,17.463315087890624,2.710296630859375,16.634915087890626C2.710296630859375,15.806515087890626,3.381869630859375,15.134915087890626,4.210296630859375,15.134915087890626C4.218546630859375,15.134915087890626,4.226776630859375,15.135015087890626,4.234996630859375,15.135115087890625L7.744116630859375,10.953115087890625C7.721966630859375,10.850565087890626,7.710296630859375,10.744105087890624,7.710296630859375,10.634915087890626C7.710296630859375,9.806495087890625,8.381866630859374,9.134915087890626,9.210296630859375,9.134915087890626C10.038726630859376,9.134915087890626,10.710296630859375,9.806495087890625,10.710296630859375,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Pf = () => Sf.cloneNode(!0), Df = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M21,5.5C21,6.32843,20.3284,7,19.5,7C19.4136,7,19.3289,6.99269,19.2465,6.97866L15.6257,15.5086C15.8587,15.7729,16,16.119999999999997,16,16.5C16,17.328400000000002,15.3284,18,14.5,18C13.8469,18,13.2913,17.5826,13.0854,17L3.91465,17C3.70873,17.5826,3.15311,18,2.5,18C1.671573,18,1,17.328400000000002,1,16.5C1,15.6716,1.671573,15,2.5,15C2.5840199999999998,15,2.66643,15.0069,2.74668,15.0202L6.36934,6.48574C6.13933,6.22213,6,5.87733,6,5.5C6,4.671573,6.67157,4,7.5,4C8.15311,4,8.70873,4.417404,8.91465,5L18.0854,5C18.2913,4.417404,18.8469,4,19.5,4C20.3284,4,21,4.671573,21,5.5ZM18.0854,6L8.91465,6C8.892579999999999,6.06243,8.8665,6.12296,8.83672,6.18128L13.9814,15.0921C14.143,15.0325,14.3177,15,14.5,15C14.584,15,14.6664,15.0069,14.7467,15.0202L18.3693,6.48574C18.2462,6.3446,18.149,6.1802,18.0854,6ZM13.2036,15.745L8.0861,6.8811800000000005C7.90605,6.95768,7.70797,7,7.5,7C7.41359,7,7.32888,6.99269,7.24647,6.97866L3.62571,15.5086C3.7512,15.651,3.8501,15.8174,3.91465,16L13.0854,16C13.1169,15.9108,13.1566,15.8255,13.2036,15.745Z" stroke-opacity="0" stroke="none"></path></svg>'), Nf = () => Df.cloneNode(!0), Of = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.92159,5.93994C6.04014,5.90529,6.152620000000001,5.85639,6.25704,5.79523L9.12729,9.89437C9.045449999999999,10.07959,9,10.28449,9,10.5C9,10.79522,9.08529,11.07053,9.232569999999999,11.30262L4.97573,16.7511L5.92159,5.93994ZM4.92259,5.8848400000000005C4.38078,5.658659999999999,4,5.1238,4,4.5C4,3.671573,4.67157,3,5.5,3C6.2157,3,6.81433,3.50124,6.96399,4.17183L15.1309,4.88634C15.3654,4.36387,15.8902,4,16.5,4C17.328400000000002,4,18,4.67157,18,5.5C18,6.08983,17.659599999999998,6.60015,17.1645,6.84518L18.4264,14.0018C18.4508,14.0006,18.4753,14,18.5,14C19.3284,14,20,14.6716,20,15.5C20,16.328400000000002,19.3284,17,18.5,17C17.932499999999997,17,17.4386,16.6849,17.183799999999998,16.22L5.99686,18.5979C5.946429999999999,19.3807,5.29554,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.869300000000003,3.389292,17.3295,3.94071,17.1077L4.92259,5.8848400000000005ZM5.72452,17.6334C5.69799,17.596,5.6698,17.5599,5.64004,17.525100000000002L10.01843,11.92103C10.16958,11.97223,10.33155,12,10.5,12C10.80059,12,11.08052,11.91158,11.31522,11.75934L17.0606,15.0765C17.0457,15.1271,17.0335,15.1789,17.023899999999998,15.2317L5.72452,17.6334ZM11.92855,10.95875L17.4349,14.1379L16.1699,6.96356C15.9874,6.92257,15.8174,6.8483,15.6667,6.74746L11.99771,10.4165C11.99923,10.44414,12,10.47198,12,10.5C12,10.66,11.97495,10.814160000000001,11.92855,10.95875ZM10.5,9C10.259830000000001,9,10.03285,9.05644,9.83159,9.15679L7.04919,5.1831L15.0493,5.88302C15.054,5.90072,15.059,5.91829,15.0643,5.9357299999999995L11.56066,9.43934C11.28921,9.16789,10.91421,9,10.5,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), If = () => Of.cloneNode(!0), Ef = /* @__PURE__ */ p('<svg viewBox="0 0 22 22"><path d="M4.727219638671875,8.007996215820313L9.973849638671876,2.7629472158203123C10.167279638671875,2.5696791158203123,10.480729638671875,2.5696791158203123,10.674169638671875,2.7629472158203123L13.223329638671874,5.311756215820313C13.416929638671874,5.505236215820313,13.416929638671874,5.8189862158203125,13.223329638671874,6.012466215820313L7.977129638671875,11.257906215820313C7.379859638671875,11.855176215820313,7.407609638671875,12.909396215820312,8.033809638671876,13.535596215820313C8.660409638671876,14.162596215820313,9.713849638671874,14.189996215820312,10.311129638671876,13.591896215820313L15.556929638671875,8.346066215820311C15.750429638671875,8.152526215820313,16.064229638671875,8.152526215820313,16.257629638671872,8.346066215820311L18.806529638671876,10.895266215820312C19.000029638671876,11.088746215820313,19.000029638671876,11.402496215820312,18.806529638671876,11.595976215820313L13.560629638671875,16.841796215820313C11.165619638671876,19.237196215820312,7.197149638671875,19.19919621582031,4.783499638671875,16.785496215820313C2.3698426386718747,14.371896215820312,2.331397638671875,10.403416215820313,4.727219638671875,8.007996215820313ZM12.172299638671875,5.662106215820312L10.323809638671875,3.8136162158203124L5.4287196386718755,8.709096215820313C3.422893638671875,10.714536215820312,3.4549956386718748,14.055196215820313,5.484999638671875,16.08479621582031C7.514609638671875,18.114796215820313,10.855289638671875,18.146496215820314,12.860719638671876,16.141096215820312L15.465629638671874,13.535796215820312L14.090929638671875,12.160756215820312L14.791629638671875,11.460436215820312L16.166229638671876,12.834996215820313L17.755829638671877,11.245226215820313L15.907729638671874,9.396736215820312L11.011839638671875,14.292596215820312C10.042809638671875,15.262396215820312,8.418249638671874,15.243796215820312,7.406019638671875,14.306496215820312L7.333099638671875,14.236296215820312C6.327599638671876,13.230796215820313,6.284009638671876,11.550396215820312,7.276419638671875,10.557586215820312L9.882199638671874,7.952026215820313L8.501079638671875,6.570906215820313L9.201789638671876,5.870186215820313L10.582939638671874,7.251336215820312L12.172299638671875,5.662106215820312Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Bf = (e) => (() => {
  const t = Ef.cloneNode(!0);
  return Ie(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), Ff = /* @__PURE__ */ p('<svg viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_615"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_615)"><path d="M19.672,3.0673368C19.4417,2.9354008,19.1463,3.00292252,18.9994,3.2210900000000002L17.4588,5.50622L16.743299999999998,3.781253L13.9915,7.4662L13.9618,7.51108C13.8339,7.72862,13.8936,8.005659999999999,14.1004,8.15391L14.1462,8.183430000000001C14.3683,8.308720000000001,14.6511,8.25001,14.8022,8.047229999999999L16.4907,5.78571L17.246299999999998,7.60713L19.8374,3.7635389999999997L19.8651,3.717088C19.9871,3.484615,19.9023,3.199273,19.672,3.0673368ZM4.79974,8.462530000000001L10.117740000000001,3.252975C10.31381,3.0610145,10.63152,3.0610145,10.82759,3.252975L13.4115,5.78453C13.6076,5.976710000000001,13.6076,6.28833,13.4115,6.4805L8.093869999999999,11.69045C7.48847,12.28368,7.51659,13.3308,8.151309999999999,13.9528C8.786439999999999,14.5755,9.85421,14.6027,10.45961,14.0087L15.7768,8.79831C15.9729,8.60609,16.2909,8.60609,16.487099999999998,8.79831L19.0705,11.33026C19.2667,11.52244,19.2667,11.83406,19.0705,12.02623L13.7533,17.2366C11.32572,19.6158,7.30328,19.578,4.85679,17.1807C2.410298,14.7834,2.371331,10.84174,4.79974,8.462530000000001ZM12.3461,6.1325199999999995L10.47246,4.29654L5.51079,9.15889C3.477674,11.15076,3.510214,14.4688,5.56784,16.4847C7.62506,18.500999999999998,11.01117,18.5325,13.0439,16.540599999999998L15.6842,13.9529L14.2908,12.58718L15.0011,11.89161L16.394399999999997,13.2569L18.0056,11.67786L16.1323,9.84188L11.16985,14.7046C10.18764,15.6679,8.540980000000001,15.6494,7.51498,14.7184L7.44107,14.6487C6.4219,13.65,6.37771,11.98096,7.38362,10.994869999999999L10.02485,8.40693L8.624939999999999,7.03516L9.335180000000001,6.33919L10.73512,7.71099L12.3461,6.1325199999999995Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), Uf = (e) => (() => {
  const t = Ff.cloneNode(!0);
  return Ie(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), zf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,17C5.80945,17,3.667717,12.85,3.113386,11.575C2.9622047,11.2,2.9622047,10.8,3.113386,10.425C3.667717,9.15,5.80945,5,11,5C16.165399999999998,5,18.3323,9.15,18.8866,10.425C19.0378,10.8,19.0378,11.2,18.8866,11.575C18.3323,12.85,16.165399999999998,17,11,17ZM4.04567,10.8C3.995276,10.925,3.995276,11.05,4.04567,11.175C4.52441,12.325,6.43937,16,11,16C15.5606,16,17.4756,12.325,17.9543,11.2C18.0047,11.075,18.0047,10.95,17.9543,10.825C17.4756,9.675,15.5606,6,11,6C6.43937,6,4.52441,9.675,4.04567,10.8ZM11,13.5C9.61417,13.5,8.480319999999999,12.375,8.480319999999999,11C8.480319999999999,9.625,9.61417,8.5,11,8.5C12.38583,8.5,13.5197,9.625,13.5197,11C13.5197,12.375,12.38583,13.5,11,13.5ZM11,9.5C10.1685,9.5,9.48819,10.175,9.48819,11C9.48819,11.825,10.1685,12.5,11,12.5C11.8315,12.5,12.51181,11.825,12.51181,11C12.51181,10.175,11.8315,9.5,11,9.5Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), Vf = () => zf.cloneNode(!0), Kf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.80417,14.9887L4.62563,16.167299999999997C4.43037,16.3625,4.43037,16.6791,4.62563,16.8744C4.82089,17.0696,5.13748,17.0696,5.332739999999999,16.8744L6.62638,15.5807C7.75595,16.290100000000002,9.19328,16.7929,11,16.7929C16.165399999999998,16.7929,18.3323,12.64289,18.8866,11.36789C19.0378,10.99289,19.0378,10.59289,18.8866,10.21789C18.5549,9.45486,17.6456,7.66212,15.8617,6.34545L17.3536,4.853553C17.5488,4.658291,17.5488,4.341709,17.3536,4.146447C17.1583,3.9511845,16.8417,3.9511845,16.6464,4.146447L15.0014,5.7915399999999995C13.9314,5.1969,12.61166,4.792893,11,4.792893C5.80945,4.792893,3.667717,8.94289,3.113386,10.21789C2.9622049,10.59289,2.9622049,10.99289,3.113386,11.36789C3.424435,12.08333,4.2353000000000005,13.70399,5.80417,14.9887ZM7.36012,14.847C8.32327,15.4074,9.52286,15.7929,11,15.7929C15.5606,15.7929,17.4756,12.11789,17.9543,10.99289C18.0047,10.86789,18.0047,10.74289,17.9543,10.61789C17.659,9.90846,16.8171,8.23812,15.1447,7.06241L12.96929,9.23782C13.3134,9.66543,13.5197,10.20642,13.5197,10.79289C13.5197,12.16789,12.38583,13.29289,11,13.29289C10.41596,13.29289,9.87667,13.09308,9.44815,12.75896L7.36012,14.847ZM8.794609999999999,11.99829L6.520099999999999,14.2728C5.06905,13.12119,4.32057,11.628250000000001,4.04567,10.96789C3.995275,10.84289,3.995275,10.71789,4.04567,10.59289C4.52441,9.46789,6.43937,5.79289,11,5.79289C12.28868,5.79289,13.3661,6.086320000000001,14.2596,6.53329L12.19759,8.5953C11.84086,8.40257,11.43271,8.29289,11,8.29289C9.61417,8.29289,8.480319999999999,9.41789,8.480319999999999,10.79289C8.480319999999999,11.22918,8.594470000000001,11.64029,8.794609999999999,11.99829ZM10.16528,12.04183C10.404869999999999,12.20032,10.692070000000001,12.29289,11,12.29289C11.8315,12.29289,12.51181,11.61789,12.51181,10.79289C12.51181,10.48318,12.41593,10.194600000000001,12.25216,9.95494L10.16528,12.04183ZM11.43602,9.35687L9.55616,11.236740000000001C9.512,11.09633,9.48819,10.94724,9.48819,10.79289C9.48819,9.96789,10.1685,9.29289,11,9.29289C11.15142,9.29289,11.29782,9.31528,11.43602,9.35687Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Rf = () => Kf.cloneNode(!0), jf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_625"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_625)"><path d="M14.5385,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807692,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.88462,4,14.5385,5.61538,14.5385,7.576919999999999L14.5385,9.76923ZM10.88461,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923L13.38462,9.76923L13.38462,7.576919999999999C13.38462,6.23077,12.26923,5.15385,10.88461,5.15385ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.038450000000001,12.07692,11.307680000000001,12.34615,11.307680000000001,12.65385L11.307680000000001,14.5769C11.307680000000001,14.8846,11.038450000000001,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), Qf = () => jf.cloneNode(!0), Zf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_620"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_620)"><path d="M8.38461,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807693,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.46154,4,13.84615,4.961539,14.3462,6.423080000000001C14.4615,6.73077,14.3077,7.038460000000001,14,7.15385C13.69231,7.26923,13.38461,7.11538,13.26923,6.80769C12.92308,5.80769,11.96154,5.15385,10.88462,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.03846,12.07692,11.307690000000001,12.34615,11.307690000000001,12.65385L11.307690000000001,14.5769C11.307690000000001,14.8846,11.03846,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), Hf = () => Zf.cloneNode(!0), qf = /* @__PURE__ */ p('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M16.966900000000003,8.67144C16.6669,8.67144,16.4247,8.91558,16.4247,9.21802L16.4247,16.631500000000003C16.4247,17.322,16.007199999999997,17.9068,15.5139,17.9068L13.93072,17.9068L13.93072,9.2162C13.93072,8.91741,13.68675,8.67144,13.38855,8.67144C13.09036,8.67144,12.84639,8.91741,12.84639,9.21802L12.84639,17.9068L10.151810000000001,17.9068L10.151810000000001,9.21802C10.151810000000001,8.91741,9.90783,8.67144,9.609639999999999,8.67144C9.31145,8.67144,9.06747,8.91741,9.06747,9.219850000000001L9.06747,17.9068L7.48614,17.9068C6.99277,17.9068,6.5753,17.322,6.5753,16.631500000000003L6.5753,9.21802C6.5753,8.91558,6.333130000000001,8.67144,6.03313,8.67144C5.73313,8.67144,5.49096,8.91558,5.49096,9.21802L5.49096,16.631500000000003C5.49096,17.9378,6.385540000000001,19,7.48614,19L15.512,19C16.6127,19,17.509,17.9378,17.509,16.631500000000003L17.509,9.21802C17.509,8.91558,17.2669,8.67144,16.966900000000003,8.67144ZM18.4578,6.21183L4.542169,6.21183C4.243976,6.21183,4,6.45779,4,6.75841C4,7.05903,4.243976,7.30499,4.542169,7.30499L18.4578,7.30499C18.756,7.30499,19,7.05903,19,6.75841C19,6.45779,18.756,6.21183,18.4578,6.21183ZM8.68072,5.10045L14.3193,5.10045C14.6175,5.10045,14.8614,4.852666,14.8614,4.550225C14.8614,4.247783,14.6175,4,14.3193,4L8.68072,4C8.38253,4,8.13855,4.247783,8.13855,4.550225C8.13855,4.852666,8.38253,5.10045,8.68072,5.10045Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), Yf = () => qf.cloneNode(!0), Wf = {
  horizontalStraightLine: Sh,
  horizontalRayLine: Dh,
  horizontalSegment: Oh,
  verticalStraightLine: Eh,
  verticalRayLine: Fh,
  verticalSegment: zh,
  straightLine: Kh,
  rayLine: jh,
  segment: Zh,
  arrow: qh,
  priceLine: Wh,
  priceChannelLine: Xh,
  parallelStraightLine: ef,
  fibonacciLine: nf,
  fibonacciSegment: of,
  fibonacciCircle: sf,
  fibonacciSpiral: cf,
  fibonacciSpeedResistanceFan: df,
  fibonacciExtension: ff,
  gannBox: mf,
  circle: Cf,
  triangle: vf,
  rect: $f,
  parallelogram: kf,
  threeWaves: Lf,
  fiveWaves: Tf,
  eightWaves: Mf,
  anyWaves: Pf,
  abcd: Nf,
  xabcd: If,
  weak_magnet: Bf,
  strong_magnet: Uf,
  lock: Qf,
  unlock: Hf,
  visible: Vf,
  invisible: Rf,
  remove: Yf
};
function Gf(e) {
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
function Xf(e) {
  return [
    { key: "priceChannelLine", text: c("price_channel_line", e) },
    { key: "parallelStraightLine", text: c("parallel_straight_line", e) }
  ];
}
function Jf(e) {
  return [
    { key: "circle", text: c("circle", e) },
    { key: "rect", text: c("rect", e) },
    { key: "parallelogram", text: c("parallelogram", e) },
    { key: "triangle", text: c("triangle", e) }
  ];
}
function eg(e) {
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
function tg(e) {
  return [
    { key: "xabcd", text: c("xabcd", e) },
    { key: "abcd", text: c("abcd", e) },
    { key: "threeWaves", text: c("three_waves", e) },
    { key: "fiveWaves", text: c("five_waves", e) },
    { key: "eightWaves", text: c("eight_waves", e) },
    { key: "anyWaves", text: c("any_waves", e) }
  ];
}
function ng(e) {
  return [
    { key: "weak_magnet", text: c("weak_magnet", e) },
    { key: "strong_magnet", text: c("strong_magnet", e) }
  ];
}
const We = (e) => Wf[e.name](e.class), rg = /* @__PURE__ */ p('<div class="klinecharts-pro-drawing-bar"><span class="split-line"></span><div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div><div class="item"><span style="width:32px;height:32px"></span></div><div class="item"><span style="width:32px;height:32px"></span></div><span class="split-line"></span><div class="item"><span style="width:32px;height:32px"></span></div></div>'), og = /* @__PURE__ */ p('<div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div>'), U0 = /* @__PURE__ */ p('<li><span style="padding-left:8px"></span></li>'), z0 = "drawing_tools", ig = (e) => {
  const [t, r] = M("horizontalStraightLine"), [n, a] = M("priceChannelLine"), [l, d] = M("circle"), [h, v] = M("fibonacciLine"), [x, b] = M("xabcd"), [L, B] = M("weak_magnet"), [N, Z] = M("normal"), [U, K] = M(!1), [z, ce] = M(!0), [j, X] = M(""), ee = Y(() => [{
    key: "singleLine",
    icon: t(),
    list: Gf(e.locale),
    setter: r
  }, {
    key: "moreLine",
    icon: n(),
    list: Xf(e.locale),
    setter: a
  }, {
    key: "polygon",
    icon: l(),
    list: Jf(e.locale),
    setter: d
  }, {
    key: "fibonacci",
    icon: h(),
    list: eg(e.locale),
    setter: v
  }, {
    key: "wave",
    icon: x(),
    list: tg(e.locale),
    setter: b
  }]), pe = Y(() => ng(e.locale));
  return (() => {
    const H = rg.cloneNode(!0), q = H.firstChild, ne = q.nextSibling, se = ne.firstChild, A = se.nextSibling, W = A.firstChild, te = ne.nextSibling, R = te.firstChild, de = te.nextSibling, he = de.firstChild, re = de.nextSibling, I = re.nextSibling, Q = I.firstChild;
    return C(H, () => ee().map((D) => (() => {
      const O = og.cloneNode(!0), F = O.firstChild, ve = F.nextSibling, Le = ve.firstChild;
      return O.addEventListener("blur", () => {
        X("");
      }), F.$$click = () => {
        e.onDrawingItemClick({
          groupId: z0,
          name: D.icon,
          visible: z(),
          lock: U(),
          mode: N()
        });
      }, C(F, w(We, {
        get name() {
          return D.icon;
        }
      })), ve.$$click = () => {
        D.key === j() ? X("") : X(D.key);
      }, C(O, (() => {
        const ye = Y(() => D.key === j());
        return () => ye() && w(cn, {
          class: "list",
          get children() {
            return D.list.map((Me) => (() => {
              const _ = U0.cloneNode(!0), me = _.firstChild;
              return _.$$click = () => {
                D.setter(Me.key), e.onDrawingItemClick({
                  name: Me.key,
                  lock: U(),
                  mode: N()
                }), X("");
              }, C(_, w(We, {
                get name() {
                  return Me.key;
                }
              }), me), C(me, () => Me.text), _;
            })());
          }
        });
      })(), null), V(() => Ie(Le, "class", D.key === j() ? "rotate" : "")), O;
    })()), q), ne.addEventListener("blur", () => {
      X("");
    }), se.$$click = () => {
      let D = L();
      N() !== "normal" && (D = "normal"), Z(D), e.onModeChange(D);
    }, C(se, (() => {
      const D = Y(() => L() === "weak_magnet");
      return () => D() ? (() => {
        const O = Y(() => N() === "weak_magnet");
        return () => O() ? w(We, {
          name: "weak_magnet",
          class: "selected"
        }) : w(We, {
          name: "weak_magnet"
        });
      })() : (() => {
        const O = Y(() => N() === "strong_magnet");
        return () => O() ? w(We, {
          name: "strong_magnet",
          class: "selected"
        }) : w(We, {
          name: "strong_magnet"
        });
      })();
    })()), A.$$click = () => {
      j() === "mode" ? X("") : X("mode");
    }, C(ne, (() => {
      const D = Y(() => j() === "mode");
      return () => D() && w(cn, {
        class: "list",
        get children() {
          return pe().map((O) => (() => {
            const F = U0.cloneNode(!0), ve = F.firstChild;
            return F.$$click = () => {
              B(O.key), Z(O.key), e.onModeChange(O.key), X("");
            }, C(F, w(We, {
              get name() {
                return O.key;
              }
            }), ve), C(ve, () => O.text), F;
          })());
        }
      });
    })(), null), R.$$click = () => {
      const D = !U();
      K(D), e.onLockChange(D);
    }, C(R, (() => {
      const D = Y(() => !!U());
      return () => D() ? w(We, {
        name: "lock"
      }) : w(We, {
        name: "unlock"
      });
    })()), he.$$click = () => {
      const D = !z();
      ce(D), e.onVisibleChange(D);
    }, C(he, (() => {
      const D = Y(() => !!z());
      return () => D() ? w(We, {
        name: "visible"
      }) : w(We, {
        name: "invisible"
      });
    })()), Q.$$click = () => {
      e.onRemoveClick(z0);
    }, C(Q, w(We, {
      name: "remove"
    })), V(() => Ie(W, "class", j() === "mode" ? "rotate" : "")), H;
  })();
};
je(["click"]);
const V0 = /* @__PURE__ */ p('<li class="title"></li>'), K0 = /* @__PURE__ */ p('<li class="row"></li>'), ag = (e) => w(wt, {
  get title() {
    return c("indicator", e.locale);
  },
  width: 400,
  get onClose() {
    return e.onClose;
  },
  get children() {
    return w(cn, {
      class: "klinecharts-pro-indicator-modal-list",
      get children() {
        return [(() => {
          const t = V0.cloneNode(!0);
          return C(t, () => c("main_indicator", e.locale)), t;
        })(), Y(() => ["MA", "EMA", "SMA", "BOLL", "SAR", "BBI"].map((t) => {
          const r = e.mainIndicators.includes(t);
          return (() => {
            const n = K0.cloneNode(!0);
            return n.$$click = (a) => {
              e.onMainIndicatorChange({
                name: t,
                paneId: "candle_pane",
                added: !r
              });
            }, C(n, w(E0, {
              checked: r,
              get label() {
                return c(t.toLowerCase(), e.locale);
              }
            })), n;
          })();
        })), (() => {
          const t = V0.cloneNode(!0);
          return C(t, () => c("sub_indicator", e.locale)), t;
        })(), Y(() => ["MA", "EMA", "VOL", "MACD", "BOLL", "KDJ", "RSI", "BIAS", "BRAR", "CCI", "DMI", "CR", "PSY", "DMA", "TRIX", "OBV", "VR", "WR", "MTM", "EMV", "SAR", "SMA", "ROC", "PVT", "BBI", "AO"].map((t) => {
          const r = t in e.subIndicators;
          return (() => {
            const n = K0.cloneNode(!0);
            return n.$$click = (a) => {
              e.onSubIndicatorChange({
                name: t,
                paneId: e.subIndicators[t] ?? "",
                added: !r
              });
            }, C(n, w(E0, {
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
je(["click"]);
function R0(e, t) {
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
function sg(e) {
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
const lg = (e) => {
  const [t, r] = M(e.timezone), n = Y(() => sg(e.locale));
  return w(wt, {
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
      return w(C1, {
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
          return c("Search Timezone", e.locale) || "Search timezone...";
        }
      });
    }
  });
};
function j0(e) {
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
const cg = /* @__PURE__ */ p('<div class="chart-style-color-picker"><button type="button" class="chart-style-color-swatch"></button></div>'), ug = /* @__PURE__ */ p('<div class="chart-style-color-popover"><div class="chart-style-color-grid"></div></div>'), dg = /* @__PURE__ */ p('<button type="button" class="chart-style-palette-color"></button>'), hg = /* @__PURE__ */ p('<div class="chart-style-line-control"><div class="chart-style-width-picker"><button type="button" class="chart-style-size-button"><span></span></button></div></div>'), fg = /* @__PURE__ */ p('<div class="chart-style-width-popover"></div>'), gg = /* @__PURE__ */ p('<button type="button"><span></span></button>'), mg = /* @__PURE__ */ p('<div class="klinecharts-pro-setting-modal-title-tabs"><button type="button"></button><button type="button">Chart Style</button></div>'), yg = /* @__PURE__ */ p('<div class="klinecharts-pro-setting-modal-content"></div>'), Cg = /* @__PURE__ */ p('<div class="setting-item"><span class="setting-label"></span><div class="setting-control"></div></div>'), pg = /* @__PURE__ */ p('<div class="klinecharts-pro-chart-style-content"><div class="chart-style-sidebar"><button type="button">Symbol</button><button type="button">Background</button></div><div class="chart-style-panel"><p class="chart-style-note">* Chart Style takes precedence over default chart settings. Click Reset to align with the default theme.</p></div></div>'), vg = /* @__PURE__ */ p("<h3>Symbol</h3>"), bg = /* @__PURE__ */ p('<div class="chart-style-row"><span>Chart</span></div>'), $g = /* @__PURE__ */ p('<div class="chart-style-row"><span>Bullish Candle Stick</span></div>'), _g = /* @__PURE__ */ p('<div class="chart-style-row"><span>Candle Stick</span><div class="chart-style-color-pair"></div></div>'), kg = /* @__PURE__ */ p('<div class="chart-style-row"><span>Borders</span><div class="chart-style-color-pair"></div></div>'), xg = /* @__PURE__ */ p('<div class="chart-style-row"><span>Wick</span><div class="chart-style-color-pair"></div></div>'), Lg = /* @__PURE__ */ p("<h3>Background</h3>"), wg = /* @__PURE__ */ p('<div class="chart-style-row"><span>Color</span><button type="button" class="chart-style-color-swatch disabled" title="Chart background is controlled by the active app theme."></button></div>'), Tg = /* @__PURE__ */ p('<div class="chart-style-row"><label class="chart-style-check-row"><input type="checkbox"><span class="chart-style-check-box" aria-hidden="true"></span><span>Vert Grid Lines</span></label></div>'), Ag = /* @__PURE__ */ p('<div class="chart-style-row"><label class="chart-style-check-row"><input type="checkbox"><span class="chart-style-check-box" aria-hidden="true"></span><span>Horz Grid Lines</span></label></div>'), Mg = ["#f6465d", "#f59e0b", "#fcd535", "#2ebd85", "#4098a8", "#22c1dc", "#3861fb", "#7b3fe4", "#ec8aa4", "#f7c56b", "#fff0a3", "#9ed4a4", "#83c7bb", "#8bdce6", "#8bb9f7", "#b7a1dc", "#c9343e", "#e76f20", "#f0b93a", "#3f8d3a", "#236e5a", "#237c88", "#1d3fbf", "#3a209f", "#ffffff", "#cbd5e1", "#9ca3af", "#6b7280", "#374151", "#111827", "#000000"], Q0 = [{
  key: "candle_solid",
  text: "Candle"
}, {
  key: "ohlc",
  text: "OHLC"
}, {
  key: "area",
  text: "Area"
}], Z0 = [{
  key: "candle_solid",
  text: "Solid"
}, {
  key: "candle_stroke",
  text: "Stroke"
}, {
  key: "candle_up_stroke",
  text: "Up Stroke"
}, {
  key: "candle_down_stroke",
  text: "Down Stroke"
}], Sg = [{
  key: ze.Solid,
  text: "Solid"
}, {
  key: ze.Dashed,
  text: "Dashed"
}], Pg = [1, 2, 3, 4], H0 = [{
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
  key: "candle.bar.borderUpColor",
  text: "Border Up Color"
}, {
  key: "candle.bar.borderDownColor",
  text: "Border Down Color"
}, {
  key: "candle.bar.borderNoChangeColor",
  text: "Border No Change Color"
}, {
  key: "candle.bar.wickUpColor",
  text: "Wick Up Color"
}, {
  key: "candle.bar.wickDownColor",
  text: "Wick Down Color"
}, {
  key: "candle.bar.wickNoChangeColor",
  text: "Wick No Change Color"
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
}], Dg = (e) => {
  const t = E.clone(e), r = E.formatValue(t, "candle.bar.upColor"), n = E.formatValue(t, "candle.bar.downColor"), a = E.formatValue(t, "candle.bar.noChangeColor");
  return nt(t, "candle.bar.borderUpColor", E.formatValue(t, "candle.bar.borderUpColor", r)), nt(t, "candle.bar.borderDownColor", E.formatValue(t, "candle.bar.borderDownColor", n)), nt(t, "candle.bar.borderNoChangeColor", E.formatValue(t, "candle.bar.borderNoChangeColor", a)), nt(t, "candle.bar.wickUpColor", E.formatValue(t, "candle.bar.wickUpColor", r)), nt(t, "candle.bar.wickDownColor", E.formatValue(t, "candle.bar.wickDownColor", n)), nt(t, "candle.bar.wickNoChangeColor", E.formatValue(t, "candle.bar.wickNoChangeColor", a)), t;
}, Ng = (e) => {
  const [t, r] = M(e.currentStyles), [n, a] = M(Dg(e.currentStyles)), [l, d] = M(j0(e.locale)), [h, v] = M(!1), [x, b] = M("settings"), [L, B] = M("symbol"), [N, Z] = M(null), [U, K] = M(null), z = () => {
    v(window.innerWidth <= 768);
  };
  Vn(() => {
    z(), window.addEventListener("resize", z);
  }), Et(() => {
    window.removeEventListener("resize", z);
  }), Re(() => {
    d(j0(e.locale));
  });
  const ce = (A, W) => {
    const te = {};
    nt(te, A.key, W);
    const R = E.clone(t());
    nt(R, A.key, W), r(R), d(l().map((de) => ({
      ...de
    }))), e.onChange(te);
  }, j = (A, W) => E.formatValue(n(), A, W), X = (A, W) => {
    const te = E.clone(n());
    nt(te, A, W), a(te), e.onChange(ee(te));
  }, ee = (A) => ({
    candle: {
      type: E.formatValue(A, "candle.type"),
      bar: {
        upColor: E.formatValue(A, "candle.bar.upColor"),
        downColor: E.formatValue(A, "candle.bar.downColor"),
        noChangeColor: E.formatValue(A, "candle.bar.noChangeColor"),
        borderUpColor: E.formatValue(A, "candle.bar.borderUpColor", E.formatValue(A, "candle.bar.upColor")),
        borderDownColor: E.formatValue(A, "candle.bar.borderDownColor", E.formatValue(A, "candle.bar.downColor")),
        borderNoChangeColor: E.formatValue(A, "candle.bar.borderNoChangeColor", E.formatValue(A, "candle.bar.noChangeColor")),
        wickUpColor: E.formatValue(A, "candle.bar.wickUpColor", E.formatValue(A, "candle.bar.upColor")),
        wickDownColor: E.formatValue(A, "candle.bar.wickDownColor", E.formatValue(A, "candle.bar.downColor")),
        wickNoChangeColor: E.formatValue(A, "candle.bar.wickNoChangeColor", E.formatValue(A, "candle.bar.noChangeColor"))
      }
    },
    grid: {
      horizontal: {
        show: !!E.formatValue(A, "grid.horizontal.show"),
        color: E.formatValue(A, "grid.horizontal.color"),
        style: E.formatValue(A, "grid.horizontal.style"),
        size: Number(E.formatValue(A, "grid.horizontal.size", 1)),
        dashedValue: E.formatValue(A, "grid.horizontal.dashedValue", [2, 2])
      },
      vertical: {
        show: !!E.formatValue(A, "grid.vertical.show"),
        color: E.formatValue(A, "grid.vertical.color"),
        style: E.formatValue(A, "grid.vertical.style"),
        size: Number(E.formatValue(A, "grid.vertical.size", 1)),
        dashedValue: E.formatValue(A, "grid.vertical.dashedValue", [2, 2])
      }
    }
  }), pe = () => {
    const A = ee(n());
    r(E.clone(n())), e.onChange(A), e.onClose();
  }, H = () => {
    const A = e.defaultStyles;
    if (A) {
      const W = E.clone(n());
      H0.forEach((te) => {
        const R = te.key.includes("downColor") ? "candle.bar.downColor" : te.key.includes("NoChangeColor") ? "candle.bar.noChangeColor" : "candle.bar.upColor";
        nt(W, te.key, E.formatValue(A, te.key, E.formatValue(A, R)));
      }), a(W), r(E.clone(W)), e.onChange(ee(W));
    } else
      e.onRestoreDefault(H0), a(E.clone(e.currentStyles));
  }, q = (A, W = A) => {
    const te = j(A, "#ffffff");
    return (() => {
      const R = cg.cloneNode(!0), de = R.firstChild;
      return de.$$click = () => {
        Z(N() === W ? null : W);
      }, de.style.setProperty("background", te), C(R, (() => {
        const he = Y(() => N() === W);
        return () => he() && (() => {
          const re = ug.cloneNode(!0), I = re.firstChild;
          return C(I, w(b1, {
            each: Mg,
            children: (Q) => (() => {
              const D = dg.cloneNode(!0);
              return D.$$click = () => {
                X(A, Q), Z(null);
              }, D.style.setProperty("background", Q), V(() => D.classList.toggle("selected", Q.toLowerCase() === te.toLowerCase())), D;
            })()
          })), re;
        })();
      })(), null), R;
    })();
  }, ne = (A) => {
    const W = `${A}.style`, te = `${A}.color`, R = `${A}.size`, de = j(W, ze.Dashed), he = Math.max(1, Number(j(R, 1)));
    return (() => {
      const re = hg.cloneNode(!0), I = re.firstChild, Q = I.firstChild, D = Q.firstChild;
      return C(re, w(C1, {
        get style() {
          return {
            width: h() ? "100%" : "134px"
          };
        },
        get value() {
          return de === ze.Solid ? "Solid" : "Dashed";
        },
        dataSource: Sg,
        onSelected: (O) => {
          const F = O.key;
          X(W, F), X(`${A}.dashedValue`, F === ze.Solid ? [] : [2, 2]);
        }
      }), I), Q.$$click = () => {
        K(U() === R ? null : R);
      }, D.style.setProperty("height", `${he}px`), C(I, (() => {
        const O = Y(() => U() === R);
        return () => O() && (() => {
          const F = fg.cloneNode(!0);
          return C(F, w(b1, {
            each: Pg,
            children: (ve) => (() => {
              const Le = gg.cloneNode(!0), ye = Le.firstChild;
              return Le.$$click = () => {
                X(R, ve), K(null);
              }, Le.classList.toggle("selected", he === ve), ye.style.setProperty("height", `${ve}px`), Le;
            })()
          })), F;
        })();
      })(), null), C(re, () => q(te), null), re;
    })();
  }, se = (() => {
    const A = mg.cloneNode(!0), W = A.firstChild, te = W.nextSibling;
    return W.$$click = () => b("settings"), C(W, () => c("setting", e.locale)), te.$$click = () => b("chartStyle"), V((R) => {
      const de = x() === "settings", he = x() === "chartStyle";
      return de !== R._v$ && W.classList.toggle("active", R._v$ = de), he !== R._v$2 && te.classList.toggle("active", R._v$2 = he), R;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), A;
  })();
  return w(wt, {
    title: se,
    get width() {
      return x() === "chartStyle" ? 760 : 690;
    },
    get btnParentStyle() {
      return {
        display: "flex",
        "justify-content": x() === "chartStyle" ? "flex-end" : "center"
      };
    },
    get minButtonWidth() {
      return x() === "chartStyle" ? 170 : 200;
    },
    get isMobile() {
      return h();
    },
    get buttons() {
      return Y(() => x() === "settings")() ? [{
        children: c("restore_default", e.locale),
        onClick: () => {
          e.onRestoreDefault(l()), e.onClose();
        }
      }] : [{
        type: "cancel",
        children: "Reset",
        onClick: H
      }, {
        children: "Save",
        onClick: pe
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      return Y(() => x() === "settings")() ? (() => {
        const A = yg.cloneNode(!0);
        return C(A, w(b1, {
          get each() {
            return l();
          },
          children: (W) => {
            let te;
            const R = E.formatValue(t(), W.key);
            switch (W.component) {
              case "select": {
                const de = W.key === "candle.type" ? "170px" : "120px";
                te = w(C1, {
                  get style() {
                    return {
                      width: h() ? "100%" : de,
                      "min-width": h() ? "auto" : de
                    };
                  },
                  get value() {
                    return c(R, e.locale);
                  },
                  get dataSource() {
                    return W.dataSource;
                  },
                  onSelected: (he) => {
                    const re = he.key;
                    ce(W, re);
                  }
                });
                break;
              }
              case "switch": {
                const de = !!R;
                te = w(Ul, {
                  open: de,
                  onChange: () => {
                    ce(W, !de);
                  }
                });
                break;
              }
            }
            return (() => {
              const de = Cg.cloneNode(!0), he = de.firstChild, re = he.nextSibling;
              return C(he, () => W.text), C(re, te), V(() => de.classList.toggle("mobile-item", !!h())), de;
            })();
          }
        })), V(() => A.classList.toggle("mobile-layout", !!h())), A;
      })() : (() => {
        const A = pg.cloneNode(!0), W = A.firstChild, te = W.firstChild, R = te.nextSibling, de = W.nextSibling, he = de.firstChild;
        return te.$$click = () => B("symbol"), R.$$click = () => B("background"), C(de, (() => {
          const re = Y(() => L() === "symbol");
          return () => re() ? [vg.cloneNode(!0), (() => {
            const I = bg.cloneNode(!0);
            return I.firstChild, C(I, w(C1, {
              get style() {
                return {
                  width: h() ? "100%" : "170px"
                };
              },
              get value() {
                var Q;
                return ((Q = Q0.find((D) => D.key === j("candle.type"))) == null ? void 0 : Q.text) ?? "Candle";
              },
              dataSource: Q0,
              onSelected: (Q) => {
                X("candle.type", Q.key);
              }
            }), null), I;
          })(), (() => {
            const I = $g.cloneNode(!0);
            return I.firstChild, C(I, w(C1, {
              get style() {
                return {
                  width: h() ? "100%" : "170px"
                };
              },
              get value() {
                var Q;
                return ((Q = Z0.find((D) => D.key === j("candle.type"))) == null ? void 0 : Q.text) ?? "Solid";
              },
              dataSource: Z0,
              onSelected: (Q) => {
                X("candle.type", Q.key);
              }
            }), null), I;
          })(), (() => {
            const I = _g.cloneNode(!0), Q = I.firstChild, D = Q.nextSibling;
            return C(D, () => q("candle.bar.upColor", "candle-stick-up"), null), C(D, () => q("candle.bar.downColor", "candle-stick-down"), null), I;
          })(), (() => {
            const I = kg.cloneNode(!0), Q = I.firstChild, D = Q.nextSibling;
            return C(D, () => q("candle.bar.borderUpColor", "border-up"), null), C(D, () => q("candle.bar.borderDownColor", "border-down"), null), I;
          })(), (() => {
            const I = xg.cloneNode(!0), Q = I.firstChild, D = Q.nextSibling;
            return C(D, () => q("candle.bar.wickUpColor", "wick-up"), null), C(D, () => q("candle.bar.wickDownColor", "wick-down"), null), I;
          })()] : [Lg.cloneNode(!0), (() => {
            const I = wg.cloneNode(!0);
            return I.firstChild.nextSibling.style.setProperty("background", "var(--klinecharts-pro-background-color)"), I;
          })(), (() => {
            const I = Tg.cloneNode(!0), Q = I.firstChild, D = Q.firstChild;
            return D.addEventListener("change", (O) => X("grid.vertical.show", O.currentTarget.checked)), C(I, () => ne("grid.vertical"), null), V(() => D.checked = !!j("grid.vertical.show")), I;
          })(), (() => {
            const I = Ag.cloneNode(!0), Q = I.firstChild, D = Q.firstChild;
            return D.addEventListener("change", (O) => X("grid.horizontal.show", O.currentTarget.checked)), C(I, () => ne("grid.horizontal"), null), V(() => D.checked = !!j("grid.horizontal.show")), I;
          })()];
        })(), he), V((re) => {
          const I = !!h(), Q = L() === "symbol", D = L() === "background";
          return I !== re._v$3 && A.classList.toggle("mobile-layout", re._v$3 = I), Q !== re._v$4 && te.classList.toggle("active", re._v$4 = Q), D !== re._v$5 && R.classList.toggle("active", re._v$5 = D), re;
        }, {
          _v$3: void 0,
          _v$4: void 0,
          _v$5: void 0
        }), A;
      })();
    }
  });
};
je(["click"]);
const Og = /* @__PURE__ */ p('<img style="width:500px;margin-top: 20px">'), Ig = (e) => w(wt, {
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
    const t = Og.cloneNode(!0);
    return V(() => Ie(t, "src", e.url)), t;
  }
}), Eg = {
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
}, Bg = /* @__PURE__ */ p('<div class="klinecharts-pro-indicator-setting-modal-content"></div>'), Fg = /* @__PURE__ */ p("<span></span>"), Ug = (e) => {
  const [t, r] = M(E.clone(e.params.calcParams)), n = (a) => Eg[a];
  return w(wt, {
    get title() {
      return e.params.indicatorName;
    },
    width: 360,
    get buttons() {
      return [{
        type: "confirm",
        children: c("confirm", e.locale),
        onClick: () => {
          const a = n(e.params.indicatorName), l = [];
          E.clone(t()).forEach((d, h) => {
            !E.isValid(d) || d === "" ? "default" in a[h] && l.push(a[h].default) : l.push(d);
          }), e.onConfirm(l), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      const a = Bg.cloneNode(!0);
      return C(a, () => n(e.params.indicatorName).map((l, d) => [(() => {
        const h = Fg.cloneNode(!0);
        return C(h, () => c(l.paramNameKey, e.locale)), h;
      })(), w(Io, {
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
        onChange: (h) => {
          const v = E.clone(t());
          v[d] = h, r(v);
        }
      })])), a;
    }
  });
}, zg = /* @__PURE__ */ p('<svg viewBox="0 0 1024 1024"><path d="M945.066667 898.133333l-189.866667-189.866666c55.466667-64 87.466667-149.333333 87.466667-241.066667 0-204.8-168.533333-373.333333-373.333334-373.333333S96 264.533333 96 469.333333 264.533333 842.666667 469.333333 842.666667c91.733333 0 174.933333-34.133333 241.066667-87.466667l189.866667 189.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c8.533333-12.8 8.533333-34.133333-2.133333-46.933334zM469.333333 778.666667C298.666667 778.666667 160 640 160 469.333333S298.666667 160 469.333333 160 778.666667 298.666667 778.666667 469.333333 640 778.666667 469.333333 778.666667z"></path></svg>'), Vg = /* @__PURE__ */ p('<img alt="symbol">'), Kg = /* @__PURE__ */ p("<li><div><span></span></div></li>"), Rg = (e) => {
  const [t, r] = M(""), [n] = S9(t, e.datafeed.searchSymbols.bind(e.datafeed));
  return w(wt, {
    get title() {
      return c("symbol_search", e.locale);
    },
    width: 460,
    get onClose() {
      return e.onClose;
    },
    get children() {
      return [w(Io, {
        class: "klinecharts-pro-symbol-search-modal-input",
        get placeholder() {
          return c("symbol_code", e.locale);
        },
        get suffix() {
          return zg.cloneNode(!0);
        },
        get value() {
          return t();
        },
        onChange: (a) => {
          const l = `${a}`;
          r(l);
        }
      }), w(cn, {
        class: "klinecharts-pro-symbol-search-modal-list",
        get loading() {
          return n.loading;
        },
        get dataSource() {
          return n() ?? [];
        },
        renderItem: (a) => (() => {
          const l = Kg.cloneNode(!0), d = l.firstChild, h = d.firstChild;
          return l.$$click = () => {
            e.onSymbolSelected(a), e.onClose();
          }, C(d, w(le, {
            get when() {
              return a.logo;
            },
            get children() {
              const v = Vg.cloneNode(!0);
              return V(() => Ie(v, "src", a.logo)), v;
            }
          }), h), C(h, () => a.shortName ?? a.ticker, null), C(h, () => `${a.name ? `(${a.name})` : ""}`, null), C(l, () => a.exchange ?? "", null), V(() => Ie(h, "title", a.name ?? "")), l;
        })()
      })];
    }
  });
};
je(["click"]);
const jg = /* @__PURE__ */ p('<div class="klinecharts-pro-mobile-more-modal-content"><div class="item"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div><div class="item"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path></svg><span></span></div><div class="item"><svg viewBox="0 0 20 20"><rect x="3" y="4" width="14" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"></rect><path d="M6 2.5v4M14 2.5v4M3 8h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M10 11v3l2.2 1.3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg><span>Time Tools</span></div><div class="item"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg><span></span></div></div>'), Qg = (e) => w(wt, {
  get title() {
    return c("more", e.locale);
  },
  isMobile: !0,
  get onClose() {
    return e.onClose;
  },
  get children() {
    const t = jg.cloneNode(!0), r = t.firstChild, n = r.firstChild, a = n.nextSibling, l = r.nextSibling, d = l.firstChild, h = d.nextSibling, v = l.nextSibling, x = v.nextSibling, b = x.firstChild, L = b.nextSibling;
    return r.$$click = () => {
      e.onIndicatorClick(), e.onClose();
    }, C(a, () => c("indicator", e.locale)), l.$$click = () => {
      e.onTimezoneClick(), e.onClose();
    }, C(h, () => c("timezone", e.locale)), v.$$click = () => {
      e.onTimeToolsClick(), e.onClose();
    }, x.$$click = () => {
      e.onSettingClick(), e.onClose();
    }, C(L, () => c("setting", e.locale)), t;
  }
});
je(["click"]);
const Zg = /* @__PURE__ */ p('<div class="klinecharts-pro-time-tools-picker"></div>'), Hg = /* @__PURE__ */ p('<label class="klinecharts-pro-time-tools-field"><button type="button" class="klinecharts-pro-time-tools-input"><span></span><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M8 3v4M16 3v4M4 10h16"></path></svg></button></label>'), qg = /* @__PURE__ */ p("<span></span>"), Yg = /* @__PURE__ */ p('<div class="klinecharts-pro-time-tools-calendar"><div class="klinecharts-pro-time-tools-month"><button type="button">&lt;&lt;</button><button type="button">&lt;</button><button type="button" class="calendar-title"></button><button type="button">></button><button type="button">>></button></div></div>'), Wg = /* @__PURE__ */ p('<div class="klinecharts-pro-time-tools-grid"></div>'), Gg = /* @__PURE__ */ p('<span class="weekday"></span>'), Ot = /* @__PURE__ */ p('<button type="button"></button>'), Xg = /* @__PURE__ */ p('<div class="klinecharts-pro-time-tools-month-grid"></div>'), Jg = /* @__PURE__ */ p('<div class="klinecharts-pro-time-tools-month-grid year-grid"></div>'), em = /* @__PURE__ */ p('<div class="klinecharts-pro-time-tools-spinners"><div class="spinner-column scrollable"></div><div class="spinner-column scrollable"></div><div class="spinner-column"></div></div>'), tm = /* @__PURE__ */ p('<div class="klinecharts-pro-time-tools-content"></div>'), nm = /* @__PURE__ */ p('<div class="klinecharts-pro-time-tools-tabs"></div>'), rm = /* @__PURE__ */ p('<div class="klinecharts-pro-time-tools-range-panel"><div class="klinecharts-pro-time-tools-range-header"><button type="button"></button><span class="klinecharts-pro-time-tools-range-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg></span><button type="button"></button><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M8 3v4M16 3v4M4 10h16"></path></svg></div></div>'), om = /* @__PURE__ */ p('<div class="klinecharts-pro-time-tools-panel"><div class="klinecharts-pro-time-tools-row"><div><strong>Time Anchor</strong><span>Anchor to a time on the chart when switching between intervals</span></div><button type="button"><span></span></button></div><div><div><strong>Anchor Point</strong></div><select><option value="date">Date</option><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option></select></div><div><div><strong>Anchor line</strong><span>Mark the anchored time on the chart with a vertical line</span></div><button type="button"><span></span></button></div><div><div><strong>Across Tokens</strong><span>Retain onscreen chart range when switching symbols</span></div><button type="button"><span></span></button></div></div>'), im = /* @__PURE__ */ p('<div class="klinecharts-pro-time-tools-anchor-date"></div>'), am = [{
  key: "goToDate",
  label: "Go to Date"
}, {
  key: "timeRange",
  label: "Time Range"
}, {
  key: "timeAnchor",
  label: "Time Anchor"
}], sm = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], q0 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Qt = (e) => String(e).padStart(2, "0"), Y0 = (e, t, r) => Math.min(r, new Date(e, t + 1, 0).getDate()), An = (e) => {
  const t = new Date(e);
  return {
    year: t.getFullYear(),
    month: t.getMonth(),
    day: t.getDate(),
    hour: t.getHours(),
    minute: t.getMinutes()
  };
}, Y1 = (e) => new Date(e.year, e.month, e.day, e.hour, e.minute, 0, 0).getTime(), Mn = (e) => e.year * 1e4 + (e.month + 1) * 100 + e.day, Fn = (e) => {
  const t = e.hour >= 12 ? "PM" : "AM", r = e.hour % 12 || 12;
  return `${Qt(e.month + 1)}/${Qt(e.day)}/${e.year} ${Qt(r)}:${Qt(e.minute)} ${t}`;
}, lm = (e, t) => {
  const r = new Date(e, t, 1).getDay(), n = new Date(e, t + 1, 0).getDate(), a = new Date(e, t, 0).getDate(), l = [];
  for (let d = r - 1; d >= 0; d -= 1)
    l.push({
      date: new Date(e, t - 1, a - d),
      current: !1
    });
  for (let d = 1; d <= n; d += 1)
    l.push({
      date: new Date(e, t, d),
      current: !0
    });
  for (; l.length < 42; ) {
    const d = l[l.length - 1].date;
    l.push({
      date: new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1),
      current: !1
    });
  }
  return l;
}, W1 = (e) => {
  const [t, r] = M(!0), [n, a] = M("date"), [l, d] = M(e.value.year), [h, v] = M(e.value.month), x = Y(() => lm(l(), h())), b = Y(() => Math.floor(l() / 10) * 10), L = Y(() => Array.from({
    length: 12
  }, (H, q) => b() - 1 + q)), B = Y(() => e.value.hour % 12 || 12), N = Y(() => e.value.hour >= 12 ? "PM" : "AM"), Z = Array.from({
    length: 12
  }, (H, q) => q + 1), U = Array.from({
    length: 60
  }, (H, q) => q), K = (H) => {
    const q = new Date(l(), h() + H, 1);
    d(q.getFullYear()), v(q.getMonth());
  }, z = () => {
    n() === "date" ? a("month") : n() === "month" && a("year");
  }, ce = (H) => {
    var q;
    e.onChange({
      ...e.value,
      year: H.getFullYear(),
      month: H.getMonth(),
      day: H.getDate()
    }), (q = e.onDateSelect) == null || q.call(e), d(H.getFullYear()), v(H.getMonth());
  }, j = (H) => {
    v(H), e.onChange({
      ...e.value,
      year: l(),
      month: H,
      day: Y0(l(), H, e.value.day)
    }), a("date");
  }, X = (H) => {
    d(H), e.onChange({
      ...e.value,
      year: H,
      day: Y0(H, e.value.month, e.value.day)
    }), a("month");
  }, ee = (H) => {
    const q = N() === "PM";
    e.onChange({
      ...e.value,
      hour: q ? H === 12 ? 12 : H + 12 : H === 12 ? 0 : H
    });
  }, pe = (H) => {
    const q = B();
    e.onChange({
      ...e.value,
      hour: H === "PM" ? q === 12 ? 12 : q + 12 : q === 12 ? 0 : q
    });
  };
  return (() => {
    const H = Zg.cloneNode(!0);
    return C(H, (() => {
      const q = Y(() => e.showInput !== !1);
      return () => q() && (() => {
        const ne = Hg.cloneNode(!0), se = ne.firstChild, A = se.firstChild;
        return C(ne, (() => {
          const W = Y(() => !!e.label);
          return () => W() && (() => {
            const te = qg.cloneNode(!0);
            return C(te, () => e.label), te;
          })();
        })(), se), se.$$click = () => r(!t()), C(A, () => Fn(e.value)), ne;
      })();
    })(), null), C(H, (() => {
      const q = Y(() => !!t());
      return () => q() && (() => {
        const ne = Yg.cloneNode(!0), se = ne.firstChild, A = se.firstChild, W = A.nextSibling, te = W.nextSibling, R = te.nextSibling, de = R.nextSibling;
        return A.$$click = () => {
          n() === "year" ? d(l() - 10) : n() === "month" ? d(l() - 1) : K(-12);
        }, W.$$click = () => {
          n() === "year" ? d(l() - 10) : n() === "month" ? d(l() - 1) : K(-1);
        }, te.$$click = z, C(te, (() => {
          const he = Y(() => n() === "year");
          return () => he() ? `${b()}-${b() + 9}` : (() => {
            const re = Y(() => n() === "month");
            return () => re() ? l() : `${q0[h()]} ${l()}`;
          })();
        })()), R.$$click = () => {
          n() === "year" ? d(l() + 10) : n() === "month" ? d(l() + 1) : K(1);
        }, de.$$click = () => {
          n() === "year" ? d(l() + 10) : n() === "month" ? d(l() + 1) : K(12);
        }, C(ne, (() => {
          const he = Y(() => n() === "date");
          return () => he() && (() => {
            const re = Wg.cloneNode(!0);
            return C(re, () => sm.map((I) => (() => {
              const Q = Gg.cloneNode(!0);
              return C(Q, I), Q;
            })()), null), C(re, () => x().map(({
              date: I,
              current: Q
            }) => {
              const D = Mn({
                year: I.getFullYear(),
                month: I.getMonth(),
                day: I.getDate()
              }), O = e.range ? Mn(e.range.from) : NaN, F = e.range ? Mn(e.range.to) : NaN, ve = Math.min(O, F), Le = Math.max(O, F), ye = Number.isFinite(ve) && D >= ve && D <= Le, Me = Number.isFinite(ve) && (D === ve || D === Le), _ = I.getFullYear() === e.value.year && I.getMonth() === e.value.month && I.getDate() === e.value.day;
              return (() => {
                const me = Ot.cloneNode(!0);
                return me.$$click = () => ce(I), fe(me, `${Q ? "" : "muted"} ${ye ? "in-range" : ""} ${Me || _ ? "selected" : ""}`), C(me, () => I.getDate()), me;
              })();
            }), null), re;
          })();
        })(), null), C(ne, (() => {
          const he = Y(() => n() === "month");
          return () => he() && (() => {
            const re = Xg.cloneNode(!0);
            return C(re, () => q0.map((I, Q) => (() => {
              const D = Ot.cloneNode(!0);
              return D.$$click = () => j(Q), C(D, I), V(() => fe(D, Q === e.value.month && l() === e.value.year ? "selected" : "")), D;
            })())), re;
          })();
        })(), null), C(ne, (() => {
          const he = Y(() => n() === "year");
          return () => he() && (() => {
            const re = Jg.cloneNode(!0);
            return C(re, () => L().map((I) => (() => {
              const Q = Ot.cloneNode(!0);
              return Q.$$click = () => X(I), C(Q, I), V(() => fe(Q, `${I < b() || I > b() + 9 ? "muted" : ""} ${I === e.value.year ? "selected" : ""}`)), Q;
            })())), re;
          })();
        })(), null), C(ne, (() => {
          const he = Y(() => n() === "date");
          return () => he() && (() => {
            const re = em.cloneNode(!0), I = re.firstChild, Q = I.nextSibling, D = Q.nextSibling;
            return C(I, () => Z.map((O) => (() => {
              const F = Ot.cloneNode(!0);
              return F.$$click = () => ee(O), C(F, () => Qt(O)), V(() => fe(F, O === B() ? "selected" : "")), F;
            })())), C(Q, () => U.map((O) => (() => {
              const F = Ot.cloneNode(!0);
              return F.$$click = () => e.onChange({
                ...e.value,
                minute: O
              }), C(F, () => Qt(O)), V(() => fe(F, O === e.value.minute ? "selected" : "")), F;
            })())), C(D, () => ["AM", "PM"].map((O) => (() => {
              const F = Ot.cloneNode(!0);
              return F.$$click = () => pe(O), C(F, O), V(() => fe(F, O === N() ? "selected" : "")), F;
            })())), re;
          })();
        })(), null), ne;
      })();
    })(), null), H;
  })();
}, cm = (e) => {
  const [t, r] = M(e.initialTab ?? "goToDate"), [n, a] = M(An(e.initialTimestamp)), [l, d] = M(An(e.initialRange.from)), [h, v] = M(An(e.initialRange.to)), [x, b] = M("from"), [L, B] = M({
    ...e.anchorSettings,
    anchorLine: e.anchorSettings.anchorLine ?? !0,
    acrossTokens: e.anchorSettings.acrossTokens ?? !0
  }), N = (U) => {
    B((K) => ({
      ...K,
      ...U
    }));
  }, Z = () => {
    const U = t();
    if (U === "goToDate")
      e.onGoToDate(Y1(n()));
    else if (U === "timeRange") {
      const K = Y1(l()), z = Y1(h());
      e.onTimeRange(K <= z ? {
        from: K,
        to: z
      } : {
        from: z,
        to: K
      });
    } else {
      const K = L();
      e.onTimeAnchorChange({
        ...K,
        timestamp: K.anchorPoint === "date" ? Y1(n()) : K.timestamp
      });
    }
    e.onClose();
  };
  return w(wt, {
    width: 620,
    get title() {
      return (() => {
        const U = nm.cloneNode(!0);
        return C(U, () => am.map((K) => (() => {
          const z = Ot.cloneNode(!0);
          return z.$$click = () => r(K.key), C(z, () => K.label), V(() => fe(z, t() === K.key ? "active" : "")), z;
        })())), U;
      })();
    },
    get buttons() {
      return [{
        children: "Close",
        type: "cancel",
        onClick: e.onClose
      }, {
        children: "Confirm",
        onClick: Z
      }];
    },
    get onClose() {
      return e.onClose;
    },
    minButtonWidth: 112,
    get children() {
      const U = tm.cloneNode(!0);
      return C(U, (() => {
        const K = Y(() => t() === "goToDate");
        return () => K() && w(W1, {
          label: "",
          get value() {
            return n();
          },
          onChange: a
        });
      })(), null), C(U, (() => {
        const K = Y(() => t() === "timeRange");
        return () => K() && (() => {
          const z = rm.cloneNode(!0), ce = z.firstChild, j = ce.firstChild, X = j.nextSibling, ee = X.nextSibling;
          return j.$$click = () => b("from"), C(j, () => Fn(l())), ee.$$click = () => b("to"), C(ee, () => Fn(h())), C(z, (() => {
            const pe = Y(() => x() === "from");
            return () => pe() ? w(W1, {
              label: "Start",
              get value() {
                return l();
              },
              onChange: d,
              onDateSelect: () => b("to"),
              showInput: !1,
              get range() {
                return {
                  from: l(),
                  to: h()
                };
              }
            }) : w(W1, {
              label: "End",
              get value() {
                return h();
              },
              onChange: v,
              showInput: !1,
              get range() {
                return {
                  from: l(),
                  to: h()
                };
              }
            });
          })(), null), V((pe) => {
            const H = x() === "from" ? "active" : "", q = x() === "to" ? "active" : "";
            return H !== pe._v$ && fe(j, pe._v$ = H), q !== pe._v$2 && fe(ee, pe._v$2 = q), pe;
          }, {
            _v$: void 0,
            _v$2: void 0
          }), z;
        })();
      })(), null), C(U, (() => {
        const K = Y(() => t() === "timeAnchor");
        return () => K() && (() => {
          const z = om.cloneNode(!0), ce = z.firstChild, j = ce.firstChild, X = j.nextSibling, ee = ce.nextSibling, pe = ee.firstChild, H = pe.nextSibling, q = ee.nextSibling, ne = q.firstChild, se = ne.nextSibling, A = q.nextSibling, W = A.firstChild, te = W.nextSibling;
          return X.$$click = () => N({
            enabled: !L().enabled
          }), H.addEventListener("change", (R) => N({
            anchorPoint: R.currentTarget.value
          })), C(z, (() => {
            const R = Y(() => !!(L().enabled && L().anchorPoint === "date"));
            return () => R() && (() => {
              const de = im.cloneNode(!0);
              return C(de, w(W1, {
                label: "Anchor date",
                get value() {
                  return n();
                },
                onChange: a
              })), de;
            })();
          })(), q), se.$$click = () => N({
            anchorLine: !L().anchorLine
          }), te.$$click = () => N({
            acrossTokens: !L().acrossTokens
          }), V((R) => {
            const de = `klinecharts-pro-time-tools-switch${L().enabled ? " on" : ""}`, he = `klinecharts-pro-time-tools-row${L().enabled ? "" : " disabled"}`, re = !L().enabled, I = `klinecharts-pro-time-tools-row with-divider${L().enabled ? "" : " disabled"}`, Q = `klinecharts-pro-time-tools-switch${L().anchorLine ? " on" : ""}`, D = !L().enabled, O = `klinecharts-pro-time-tools-row with-divider${L().enabled ? "" : " disabled"}`, F = `klinecharts-pro-time-tools-switch${L().acrossTokens ? " on" : ""}`, ve = !L().enabled;
            return de !== R._v$3 && fe(X, R._v$3 = de), he !== R._v$4 && fe(ee, R._v$4 = he), re !== R._v$5 && (H.disabled = R._v$5 = re), I !== R._v$6 && fe(q, R._v$6 = I), Q !== R._v$7 && fe(se, R._v$7 = Q), D !== R._v$8 && (se.disabled = R._v$8 = D), O !== R._v$9 && fe(A, R._v$9 = O), F !== R._v$10 && fe(te, R._v$10 = F), ve !== R._v$11 && (te.disabled = R._v$11 = ve), R;
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
          }), V(() => H.value = L().anchorPoint), z;
        })();
      })(), null), U;
    }
  });
};
je(["click"]);
const um = /* @__PURE__ */ p('<i class="icon-close klinecharts-pro-load-icon"></i>'), dm = /* @__PURE__ */ p('<div class="klinecharts-pro-content"><div class="klinecharts-pro-widget"></div></div>'), hm = /* @__PURE__ */ p('<div class="klinecharts-pro-time-anchor-line"></div>'), fm = /* @__PURE__ */ p('<div class="klinecharts-pro-time-navigation-tooltip"></div>'), gm = /* @__PURE__ */ p('<div class="klinecharts-pro-countdown-price-mark"><span class="klinecharts-pro-countdown-price-mark-price"></span><span class="klinecharts-pro-countdown-price-mark-timer"></span></div>'), mm = /* @__PURE__ */ p('<div class="overlay-toolbar-color-popover"><div class="overlay-toolbar-color-grid"></div><div class="overlay-toolbar-color-footer"><button type="button" class="overlay-toolbar-add-color">+</button><div class="overlay-toolbar-color-slider"><span></span></div></div></div>'), ym = /* @__PURE__ */ p('<div class="overlay-toolbar-dropdown width-menu"></div>'), Cm = /* @__PURE__ */ p('<div class="overlay-toolbar-dropdown style-menu"><button type="button"><span class="overlay-toolbar-style-sample solid"></span></button><button type="button"><span class="overlay-toolbar-style-sample dashed"></span></button><button type="button"><span class="overlay-toolbar-style-sample dotted"></span></button></div>'), pm = /* @__PURE__ */ p('<div class="klinecharts-pro-overlay-toolbar"><button type="button" class="overlay-toolbar-icon drag" title="Move"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="6" r="1.5"></circle><circle cx="15" cy="6" r="1.5"></circle><circle cx="9" cy="12" r="1.5"></circle><circle cx="15" cy="12" r="1.5"></circle><circle cx="9" cy="18" r="1.5"></circle><circle cx="15" cy="18" r="1.5"></circle></svg></button><button type="button" class="overlay-toolbar-icon refresh" title="Reset"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 15.4-6.36L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-15.4 6.36L3 16"></path><path d="M3 21v-5h5"></path></svg></button><div class="overlay-toolbar-picker"><button type="button" title="Color"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg></button></div><div class="overlay-toolbar-picker"><button type="button" title="Line width"><span class="overlay-toolbar-line-preview"></span><span>px</span></button></div><div class="overlay-toolbar-picker"><button type="button" title="Line style"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16"></path></svg></button></div><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2"></rect><path d="M20 4 4 20"></path></svg></button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg></button><button type="button" class="overlay-toolbar-icon delete" title="Delete"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6 18 20H6L5 6"></path><path d="M10 11v5"></path><path d="M14 11v5"></path></svg></button></div>'), vm = /* @__PURE__ */ p('<button type="button"></button>'), bm = /* @__PURE__ */ p('<button type="button"><span class="overlay-toolbar-width-sample"></span></button>'), $m = /* @__PURE__ */ p('<div class="klinecharts-pro-quick-order-marker"><button type="button" class="klinecharts-pro-quick-order-plus"></button></div>'), _m = /* @__PURE__ */ p('<span class="klinecharts-pro-quick-order-plus-icon"></span>'), km = /* @__PURE__ */ p('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" aria-hidden="true"><path d="M460-300h40v-160h160v-40H500v-160h-40v160H300v40h160v160ZM224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h510.76q27.62 0 46.12 18.5Q800-763 800-735.38v510.76q0 27.62-18.5 46.12Q763-160 735.38-160H224.62Zm0-40h510.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-510.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69H224.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v510.76q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69ZM200-760v560-560Z"></path></svg>'), xm = /* @__PURE__ */ p('<div class="klinecharts-pro-quick-order-menu-anchor"><div class="klinecharts-pro-quick-order-menu"><button type="button">Trade <!> @ <!> Limit</button><button type="button">Trade <!> @ <!> Stop</button><button type="button">Create new order...</button><button type="button">Copy Price (<!>)</button><button type="button">Draw horizontal line on </button></div></div>');
Rl();
const Un = "klinecharts_pro_time_anchor_settings";
function Bo() {
  return {
    enabled: !1,
    timestamp: Date.now(),
    anchorPoint: "date",
    anchorLine: !0,
    acrossTokens: !0
  };
}
function Lm() {
  try {
    const e = window.localStorage.getItem(Un);
    if (!e)
      return null;
    const t = JSON.parse(e);
    if (t.enabled !== !0 || t.acrossTokens !== !0 || !Number.isFinite(t.timestamp))
      return null;
    const r = Bo();
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
function W0(e) {
  try {
    if (!e.enabled || !e.acrossTokens) {
      window.localStorage.removeItem(Un);
      return;
    }
    window.localStorage.setItem(Un, JSON.stringify(e));
  } catch {
  }
}
function G1(e, t, r, n) {
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
      defaultStyles: d
    }) => {
      const h = [];
      return l.visible ? (h.push(d.tooltip.icons[1]), h.push(d.tooltip.icons[2]), h.push(d.tooltip.icons[3])) : (h.push(d.tooltip.icons[0]), h.push(d.tooltip.icons[2]), h.push(d.tooltip.icons[3])), {
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
function X1(e) {
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
function wm(e) {
  const t = Math.max(0, Math.ceil(e / 1e3)), r = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), a = t % 60, l = (d) => String(d).padStart(2, "0");
  return r > 0 ? `${l(r)}:${l(n)}:${l(a)}` : `${l(n)}:${l(a)}`;
}
const Tm = (e) => {
  var Lr, wr, Tr, Ar, Mr, Sr, Pr, Dr, Nr, Or, Ir, Er, Br, Fr, Ur, zr, Vr, Kr, Rr, jr, Qr, Zr, Hr, qr, Yr, Wr, Gr, Xr;
  let t, r, n = null, a;
  const [l, d] = M(!1), [h, v] = M(e.theme), [x, b] = M(e.styles), [L, B] = M(e.locale), [N, Z] = M(e.symbol), [U, K] = M(e.period), z = () => {
    var o, i, s, u;
    return {
      visibleMarginLeft: ((o = e.indicatorTooltipIconStyles) == null ? void 0 : o.visibleMarginLeft) ?? 7,
      secondaryMarginLeft: ((i = e.indicatorTooltipIconStyles) == null ? void 0 : i.secondaryMarginLeft) ?? 7,
      marginTop: ((s = e.indicatorTooltipIconStyles) == null ? void 0 : s.marginTop) ?? 1,
      size: ((u = e.indicatorTooltipIconStyles) == null ? void 0 : u.size) ?? 12
    };
  }, [ce, j] = M(!1), [X, ee] = M([...e.mainIndicators]), [pe, H] = M({}), [q, ne] = M(!1), [se, A] = M({
    key: e.timezone,
    text: R0(e.timezone, e.locale)
  }), [W, te] = M(!1), [R, de] = M(), [he, re] = M(""), [I, Q] = M(!1), [D, O] = M(Date.now()), [F, ve] = M({
    from: Date.now() - 30 * 24 * 60 * 60 * 1e3,
    to: Date.now()
  }), [Le, ye] = M(Lm() ?? Bo()), [Me, _] = M(e.drawingBarVisible), [me, Ne] = M(!1), [ut, $e] = M(!1), [Ct, dt] = M(!1), t1 = ((Lr = e.orderTools) == null ? void 0 : Lr.quickOrder) ?? !0, [Be, _1] = M({
    quickOrder: t1,
    quickOrderFloatingWindow: ((wr = e.orderTools) == null ? void 0 : wr.quickOrderFloatingWindow) ?? t1,
    quickOrderPlusButton: ((Tr = e.orderTools) == null ? void 0 : Tr.quickOrderPlusButton) ?? t1,
    openOrders: ((Ar = e.orderTools) == null ? void 0 : Ar.openOrders) ?? !0,
    openOrdersExtendedPriceLine: ((Mr = e.orderTools) == null ? void 0 : Mr.openOrdersExtendedPriceLine) ?? !0,
    openOrdersDisplay: ((Sr = e.orderTools) == null ? void 0 : Sr.openOrdersDisplay) ?? "right",
    positions: ((Pr = e.orderTools) == null ? void 0 : Pr.positions) ?? !0,
    breakevenPrice: ((Dr = e.orderTools) == null ? void 0 : Dr.breakevenPrice) ?? !0,
    liquidationPrice: ((Nr = e.orderTools) == null ? void 0 : Nr.liquidationPrice) ?? !0,
    priceLine: ((Or = e.orderTools) == null ? void 0 : Or.priceLine) ?? !0,
    marketPriceLine: ((Ir = e.orderTools) == null ? void 0 : Ir.marketPriceLine) ?? !0,
    countDown: ((Er = e.orderTools) == null ? void 0 : Er.countDown) ?? !0,
    bidAskPrice: ((Br = e.orderTools) == null ? void 0 : Br.bidAskPrice) ?? !0,
    orderHistory: ((Fr = e.orderTools) == null ? void 0 : Fr.orderHistory) ?? !0
  }), [Ut, Tt] = M(null), [At, rt] = M(!1), [k1, qe] = M(!1), [n1, r1] = M(64), [pt, Mt] = M(null), o1 = 6, [x1, zt] = M(null), [i1, L1] = M(null), [w1, a1] = M(null), [Qe, Ke] = M(null), [Ze, He] = M(null), T1 = ["#000000", "#2b3342", "#3f4653", "#565d69", "#6f7580", "#8a9099", "#a7acb3", "#c4c8ce", "#ffffff", "#ff4d67", "#ffa629", "#f7ed4a", "#2fc58d", "#4ab09c", "#52c4d3", "#3157f6", "#6a36b8", "#a644b9", "#d83972", "#f2a3a6", "#f5c879", "#f7ee97", "#a6d29f", "#7fc9b9", "#91d7df", "#8fb2ee", "#b09ad2", "#c89ccf", "#d987ab", "#e8757a", "#efb34f", "#efe36e", "#86c17d", "#66b7a8", "#68c4d0", "#5f91e4", "#8059c9", "#aa62c2", "#d34d83", "#b9353d", "#ea8527", "#e8c245", "#4b8c43", "#2f6f60", "#47919b", "#2646c6", "#56309c", "#892f95", "#a82563", "#8e2528", "#de5c1f", "#dc8527", "#255a22", "#164b34", "#225b63", "#15309b", "#442180", "#6b1f74", "#86154e"];
  let s1 = null;
  const [Vt, A1] = M({
    visible: !1,
    indicatorName: "",
    paneId: "",
    calcParams: []
  });
  let Ae = /* @__PURE__ */ new Map(), Fe = /* @__PURE__ */ new Map();
  const M1 = (o, i, s) => {
    const u = n == null ? void 0 : n.getIndicatorByPaneId(i, o);
    return {
      name: o,
      shortName: (u == null ? void 0 : u.shortName) || o,
      paneId: i,
      type: s,
      calcParams: (u == null ? void 0 : u.calcParams) || [],
      precision: (u == null ? void 0 : u.precision) ?? 4,
      visible: (u == null ? void 0 : u.visible) ?? !0,
      styles: u == null ? void 0 : u.styles,
      figures: u == null ? void 0 : u.figures
    };
  }, Ge = (o, i, s, u) => {
    if (e.onIndicatorChange)
      if (u === "add" || u === "change")
        setTimeout(() => {
          const g = M1(o, i, s);
          e.onIndicatorChange({
            action: u,
            indicator: g
          });
        }, 50);
      else {
        const g = {
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
          action: u,
          indicator: g
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
      return o.map((u) => bt(u, i));
    const s = {};
    for (const u in o)
      if (!(u === "__proto__" || u === "constructor" || u === "prototype"))
        try {
          const g = o[u];
          if (typeof g == "function")
            continue;
          s[u] = bt(g, i);
        } catch (g) {
          s[u] = `[Error: ${g.message}]`;
        }
    return s;
  }, S1 = (o) => {
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
        mode: o.mode || kn.Normal
      };
    } catch (i) {
      return console.error("Error extracting overlay data:", i), null;
    }
  }, ht = (o) => {
    var i, s, u;
    try {
      const g = (i = n == null ? void 0 : n.getOverlayById) == null ? void 0 : i.call(n, o);
      if (!g)
        return;
      const m = S1(g);
      if (m) {
        const f = Ae.get(o), y = ((s = f == null ? void 0 : f.points) == null ? void 0 : s.length) || 0, k = ((u = m.points) == null ? void 0 : u.length) || 0;
        Ae.set(o, m);
        const T = vt(m.type);
        if (k >= T) {
          const P = Fe.get(o);
          P && !P.complete && (P.complete = !0, P.checkInterval && (clearInterval(P.checkInterval), P.checkInterval = void 0));
        }
      }
    } catch (g) {
      console.error(`Error updating overlay tracking for ${o}:`, g);
    }
  }, l1 = (o, i) => {
    if (Fe.has(o))
      return;
    const s = {
      monitoring: !0,
      complete: !1,
      lastPointCount: 0
    };
    Fe.set(o, s), ht(o);
    const u = () => {
      ht(o);
    };
    document.addEventListener("mouseup", u), document.addEventListener("touchend", u), setTimeout(() => {
      var m;
      const g = Fe.get(o);
      if (g && !g.complete) {
        g.checkInterval && clearInterval(g.checkInterval), g.mouseUpHandler && (document.removeEventListener("mouseup", g.mouseUpHandler), document.removeEventListener("touchend", g.mouseUpHandler)), ht(o);
        const f = Ae.get(o);
        if (f) {
          const y = vt(f.type), k = ((m = f.points) == null ? void 0 : m.length) || 0;
          k < y && console.warn(`âš ï¸ ${f.type} ${o} has only ${k} point(s), should have ${y}`);
        }
      }
    }, 3e4);
  };
  let ft = {
    saveDrawings: (o, i) => {
      try {
        const s = `kline_drawings_${o}`, g = {
          drawings: i.map((m) => {
            var T;
            const f = {
              ...m
            };
            f.extendData && (f.extendData = bt(f.extendData)), f.styles && (f.styles = bt(f.styles));
            const y = vt(m.type), k = ((T = m.points) == null ? void 0 : T.length) || 0;
            return k < y && console.warn(`âš ï¸ Saving ${m.type} with only ${k} point(s), needs ${y}`), f;
          }),
          timestamp: Date.now()
        };
        localStorage.setItem(s, JSON.stringify(g));
      } catch (s) {
        console.error("Library: Error saving drawings:", s);
      }
    },
    loadDrawings: (o) => {
      try {
        const i = `kline_drawings_${o}`, s = localStorage.getItem(i);
        if (s) {
          const u = JSON.parse(s), g = [];
          return Array.isArray(u.drawings) && u.drawings.forEach((m) => {
            var k;
            const f = vt(m.type);
            (((k = m.points) == null ? void 0 : k.length) || 0) >= f && g.push(m);
          }), g;
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
  const St = () => {
    const o = N();
    if (o != null && o.ticker) {
      const i = Array.from(Ae.values());
      ft.saveDrawings(o.ticker, i);
    }
  }, P1 = (o) => {
    if (!o || !n)
      return;
    Ae.forEach((s, u) => {
      var g;
      (g = n == null ? void 0 : n.removeOverlay) == null || g.call(n, {
        id: u
      });
    }), Ae.clear(), Fe.clear(), Ke(null), He(null), ft.loadDrawings(o).forEach((s) => {
      var u;
      try {
        const g = _t({
          name: s.type,
          points: s.points || [],
          extendData: s.extendData,
          styles: s.styles,
          visible: s.visible ?? !0,
          lock: s.lock ?? !1,
          mode: s.mode || kn.Normal
        }), m = n == null ? void 0 : n.createOverlay(g), f = typeof m == "string" ? m : null;
        f && (Ae.set(f, {
          ...s,
          id: f
        }), Fe.set(f, {
          monitoring: !1,
          complete: !0,
          lastPointCount: ((u = s.points) == null ? void 0 : u.length) || 0
        }));
      } catch (g) {
        console.error("Library: Error restoring drawing:", g);
      }
    });
  }, c1 = (o) => {
    var s, u;
    const i = {
      ...Be(),
      ...o
    };
    if ("quickOrder" in o) {
      const g = o.quickOrder ?? !1;
      i.quickOrderFloatingWindow = g, i.quickOrderPlusButton = g;
    } else if ("priceLine" in o) {
      const g = o.priceLine ?? !1;
      i.marketPriceLine = g, i.countDown = g, i.bidAskPrice = g;
    } else
      "quickOrderFloatingWindow" in o || "quickOrderPlusButton" in o ? i.quickOrder = i.quickOrderFloatingWindow || i.quickOrderPlusButton : ("marketPriceLine" in o || "countDown" in o || "bidAskPrice" in o) && (i.priceLine = i.marketPriceLine || i.countDown || i.bidAskPrice);
    _1(i), (u = (s = e.orderTools) == null ? void 0 : s.onChange) == null || u.call(s, i);
  }, Pt = (o) => {
    var s;
    const i = Math.min(Math.max(((s = N()) == null ? void 0 : s.pricePrecision) ?? 2, 0), 8);
    return o.toLocaleString(void 0, {
      minimumFractionDigits: i,
      maximumFractionDigits: i
    });
  }, Ye = (o = Date.now()) => {
    var et, tt, f1, Jr, e0, t0;
    if (!n || !t || !Be().countDown) {
      zt(null);
      return;
    }
    n.setStyles({
      candle: {
        priceMark: {
          last: {
            show: !0,
            line: {
              show: Be().marketPriceLine
            },
            text: {
              show: !1
            }
          }
        }
      }
    });
    const i = ((et = n.getDataList) == null ? void 0 : et.call(n)) ?? [], s = i[i.length - 1], u = Number(s == null ? void 0 : s.close);
    if (!s || !Number.isFinite(u) || u <= 0) {
      zt(null);
      return;
    }
    const g = (tt = n.convertToPixel) == null ? void 0 : tt.call(n, [{
      value: u
    }], {
      paneId: "candle_pane",
      absolute: !0
    }), m = Number((f1 = g == null ? void 0 : g[0]) == null ? void 0 : f1.y), f = (Jr = n.getSize) == null ? void 0 : Jr.call(n, "candle_pane"), y = (f == null ? void 0 : f.height) ?? t.clientHeight;
    if (!Number.isFinite(m) || m < 0 || m > y) {
      zt(null);
      return;
    }
    const k = Math.min(Math.max(((e0 = N()) == null ? void 0 : e0.pricePrecision) ?? 2, 0), 8), T = u.toLocaleString(void 0, {
      minimumFractionDigits: k,
      maximumFractionDigits: k
    }), P = (t0 = n.getSize) == null ? void 0 : t0.call(n, "candle_pane", at.YAxis), oe = P != null && P.width && Number.isFinite(P.width) ? Math.max(74, Math.floor(P.width) - 2) : 96, ae = X1(U()), ie = o % ae, J = ie === 0 ? ae : ae - ie, ue = Number(s.close), be = Number(s.open), Se = n.getStyles().candle.priceMark.last, G = Se.text, Ce = Number(G.size) || 12, ge = Number(G.paddingTop) || 2, we = Number(G.paddingBottom) || 2, Pe = Math.min(Number(G.paddingLeft) || 4, 3), Xe = Math.min(Number(G.paddingRight) || 4, 3), Je = Math.max(34, Ce * 2 + ge + we + 6), it = Math.max(0, Math.min(m - Je / 2, y - Je));
    zt({
      top: it,
      width: Math.min(oe, Math.max(62, T.length * (Ce * 0.56) + Pe + Xe + 4)),
      priceText: T,
      text: wm(J),
      color: Number.isFinite(ue) && Number.isFinite(be) && ue < be ? Se.downColor : Se.upColor,
      textSize: Ce,
      textFamily: G.family,
      textWeight: G.weight,
      paddingLeft: Pe,
      paddingRight: Xe,
      paddingTop: ge,
      paddingBottom: we,
      borderRadius: Number(G.borderRadius) || 2
    });
  }, D1 = (o) => {
    var s, u;
    const i = Number(o == null ? void 0 : o.y);
    if (!Number.isFinite(i))
      return NaN;
    try {
      const g = n == null ? void 0 : n.convertFromPixel([{
        x: (o == null ? void 0 : o.x) ?? 0,
        y: i
      }], {
        paneId: "candle_pane"
      }), m = Number((s = g == null ? void 0 : g[0]) == null ? void 0 : s.value);
      if (Number.isFinite(m) && m > 0)
        return m;
    } catch {
    }
    try {
      const g = n == null ? void 0 : n.convertFromPixel([{
        x: (o == null ? void 0 : o.x) ?? 0,
        y: i
      }], {
        paneId: "candle_pane",
        absolute: !0
      }), m = Number((u = g == null ? void 0 : g[0]) == null ? void 0 : u.value);
      if (Number.isFinite(m) && m > 0)
        return m;
    } catch {
    }
    return NaN;
  }, u1 = (o) => {
    var m;
    if (!Be().quickOrderPlusButton || (o == null ? void 0 : o.paneId) !== "candle_pane" || !t) {
      if (k1() || At())
        return;
      Tt(null), rt(!1);
      return;
    }
    const i = (m = n == null ? void 0 : n.getSize) == null ? void 0 : m.call(n, "candle_pane", at.YAxis);
    i != null && i.width && Number.isFinite(i.width) && r1(Math.max(44, Math.ceil(i.width)));
    const s = Number(o.y), u = D1(o), g = t.clientHeight;
    if (!Number.isFinite(s) || !Number.isFinite(u) || u <= 0 || s < 0 || s > g) {
      if (k1() || At())
        return;
      Tt(null), rt(!1);
      return;
    }
    s1 = {
      ...o
    }, Tt({
      y: s,
      price: u
    });
  }, $t = () => {
    var o;
    if (s1)
      try {
        (o = n == null ? void 0 : n.executeAction) == null || o.call(n, Dt.OnCrosshairChange, s1);
      } catch {
      }
  }, Kt = (o) => {
    var s, u;
    const i = pt() ?? Ut();
    i && ((u = (s = e.orderTools) == null ? void 0 : s.onQuickOrderAction) == null || u.call(s, {
      action: o,
      price: i.price,
      symbol: N()
    }), rt(!1), Mt(null), qe(!1));
  }, pn = async () => {
    var i;
    const o = pt() ?? Ut();
    if (o) {
      try {
        await ((i = navigator.clipboard) == null ? void 0 : i.writeText(String(o.price)));
      } catch {
      }
      rt(!1), Mt(null), qe(!1);
    }
  }, vn = () => {
    const o = pt() ?? Ut();
    o && (n == null || n.createOverlay(_t({
      name: "horizontalStraightLine",
      points: [{
        value: o.price
      }],
      lock: !1
    })), rt(!1), Mt(null), qe(!1));
  }, N1 = (o) => {
    var y, k, T, P, oe, ae;
    const i = (k = (y = t == null ? void 0 : t.parentElement) == null ? void 0 : y.getBoundingClientRect) == null ? void 0 : k.call(y), s = (T = t == null ? void 0 : t.getBoundingClientRect) == null ? void 0 : T.call(t), u = o == null ? void 0 : o.overlay, g = (P = u == null ? void 0 : u.points) == null ? void 0 : P[0];
    let m = 72, f = 40;
    if (i) {
      if (Number.isFinite(o == null ? void 0 : o.pageX) ? m = o.pageX - i.left : Number.isFinite(o == null ? void 0 : o.x) && s && (m = s.left - i.left + o.x), Number.isFinite(o == null ? void 0 : o.pageY))
        f = o.pageY - i.top;
      else if (Number.isFinite(o == null ? void 0 : o.y) && s)
        f = s.top - i.top + o.y;
      else if (Number.isFinite(g == null ? void 0 : g.value))
        try {
          const ie = (oe = n == null ? void 0 : n.convertToPixel) == null ? void 0 : oe.call(n, [{
            value: g.value
          }], {
            paneId: "candle_pane",
            absolute: !0
          }), J = Number((ae = ie == null ? void 0 : ie[0]) == null ? void 0 : ae.y);
          Number.isFinite(J) && (f = J - i.top);
        } catch {
        }
    }
    return {
      x: Math.max(12, Math.min(m - 28, ((i == null ? void 0 : i.width) ?? 360) - 320)),
      y: Math.max(8, f - 52)
    };
  }, d1 = (o) => {
    var y, k, T, P, oe, ae, ie, J;
    const i = o == null ? void 0 : o.overlay;
    if (!(i != null && i.id) || i.name !== "horizontalStraightLine")
      return !1;
    const s = N1(o), u = Number((k = (y = i.styles) == null ? void 0 : y.line) == null ? void 0 : k.size) || 3, g = ((P = (T = i.styles) == null ? void 0 : T.line) == null ? void 0 : P.style) ?? ze.Solid, m = Array.isArray((ae = (oe = i.styles) == null ? void 0 : oe.line) == null ? void 0 : ae.dashedValue) ? i.styles.line.dashedValue : [], f = ((J = (ie = i.styles) == null ? void 0 : ie.line) == null ? void 0 : J.color) ?? "#2f6df6";
    return Ke({
      id: i.id,
      x: s.x,
      y: s.y,
      lineSize: u,
      lineStyle: g,
      dashedValue: m,
      color: f,
      locked: i.lock ?? !1,
      visible: i.visible ?? !0
    }), !1;
  }, O1 = (o) => {
    var s, u;
    const i = (s = o == null ? void 0 : o.overlay) == null ? void 0 : s.id;
    return (!i || ((u = Qe()) == null ? void 0 : u.id) === i) && (Ke(null), He(null)), !1;
  }, _t = (o) => {
    var f, y, k, T, P, oe, ae, ie, J;
    if (o.name !== "horizontalStraightLine")
      return o;
    const i = o.onClick, s = o.onSelected, u = o.onDeselected, g = o.onRemoved, m = o.onPressedMoveEnd;
    return {
      ...o,
      styles: {
        ...o.styles,
        line: {
          ...(f = o.styles) == null ? void 0 : f.line,
          size: Number((k = (y = o.styles) == null ? void 0 : y.line) == null ? void 0 : k.size) || 3,
          style: ((P = (T = o.styles) == null ? void 0 : T.line) == null ? void 0 : P.style) ?? ze.Solid,
          dashedValue: ((ae = (oe = o.styles) == null ? void 0 : oe.line) == null ? void 0 : ae.dashedValue) ?? [6, 4],
          color: ((J = (ie = o.styles) == null ? void 0 : ie.line) == null ? void 0 : J.color) ?? "#2f6df6"
        }
      },
      onClick: (ue) => (d1(ue), (i == null ? void 0 : i(ue)) ?? !1),
      onSelected: (ue) => (d1(ue), (s == null ? void 0 : s(ue)) ?? !1),
      onPressedMoveEnd: (ue) => (d1(ue), (m == null ? void 0 : m(ue)) ?? !1),
      onDeselected: (ue) => (O1(ue), (u == null ? void 0 : u(ue)) ?? !1),
      onRemoved: (ue) => (O1(ue), (g == null ? void 0 : g(ue)) ?? !1)
    };
  }, $ = () => {
    var i;
    const o = Qe();
    o && ((i = n == null ? void 0 : n.removeOverlay) == null || i.call(n, {
      id: o.id
    }), Ke(null), He(null));
  }, S = (o) => {
    var s;
    const i = Qe();
    i && ((s = n == null ? void 0 : n.overrideOverlay) == null || s.call(n, {
      id: i.id,
      ...o
    }), setTimeout(() => {
      ht(i.id), St();
    }, 0));
  }, Oe = () => {
    const o = Qe();
    if (!o)
      return;
    const i = !o.locked;
    S({
      lock: i
    }), Ke({
      ...o,
      locked: i
    });
  }, Ue = () => {
    const o = Qe();
    if (!o)
      return;
    const i = !o.visible;
    S({
      visible: i
    }), Ke({
      ...o,
      visible: i
    });
  }, ot = (o) => {
    const i = Qe();
    i && (S({
      styles: {
        line: {
          size: o
        }
      }
    }), Ke({
      ...i,
      lineSize: o
    }), He(null));
  }, gt = (o, i) => {
    const s = Qe();
    s && (S({
      styles: {
        line: {
          style: o,
          dashedValue: i
        }
      }
    }), Ke({
      ...s,
      lineStyle: o,
      dashedValue: i
    }), He(null));
  }, I1 = () => {
    const o = Qe();
    if (!o)
      return;
    const i = 1, s = ze.Solid, u = [6, 4], g = "#2f6df6";
    S({
      styles: {
        line: {
          size: i,
          style: s,
          dashedValue: u,
          color: g
        }
      }
    }), Ke({
      ...o,
      lineSize: i,
      lineStyle: s,
      dashedValue: u,
      color: g
    }), He(null);
  }, E1 = (o) => {
    const i = Qe();
    i && (S({
      styles: {
        line: {
          color: o
        }
      }
    }), Ke({
      ...i,
      color: o
    }));
  }, B1 = (o) => {
    var T, P;
    const i = Qe();
    if (!i || !t)
      return;
    o.preventDefault(), o.stopPropagation(), He(null);
    const s = (P = (T = t.parentElement) == null ? void 0 : T.getBoundingClientRect) == null ? void 0 : P.call(T);
    if (!s)
      return;
    const u = o.clientX, g = o.clientY, m = i.x, f = i.y, y = (oe) => {
      oe.preventDefault();
      const ae = m + oe.clientX - u, ie = f + oe.clientY - g;
      Ke({
        ...i,
        x: Math.max(8, Math.min(ae, s.width - 320)),
        y: Math.max(8, Math.min(ie, s.height - 48))
      });
    }, k = () => {
      document.removeEventListener("mousemove", y), document.removeEventListener("mouseup", k);
    };
    document.addEventListener("mousemove", y), document.addEventListener("mouseup", k);
  }, F1 = () => {
    rt(!1), Mt(null), qe(!1);
  }, er = (o) => {
    var s, u;
    if (!At())
      return;
    const i = o.target;
    (s = i == null ? void 0 : i.closest) != null && s.call(i, ".klinecharts-pro-quick-order-marker") || (u = i == null ? void 0 : i.closest) != null && u.call(i, ".klinecharts-pro-quick-order-menu-anchor") || F1();
  };
  let tr = (Ur = e.orderTools) == null ? void 0 : Ur.quickOrder, nr = (zr = e.orderTools) == null ? void 0 : zr.quickOrderFloatingWindow, rr = (Vr = e.orderTools) == null ? void 0 : Vr.quickOrderPlusButton, or = (Kr = e.orderTools) == null ? void 0 : Kr.openOrders, ir = (Rr = e.orderTools) == null ? void 0 : Rr.openOrdersExtendedPriceLine, ar = (jr = e.orderTools) == null ? void 0 : jr.openOrdersDisplay, sr = (Qr = e.orderTools) == null ? void 0 : Qr.positions, lr = (Zr = e.orderTools) == null ? void 0 : Zr.breakevenPrice, cr = (Hr = e.orderTools) == null ? void 0 : Hr.liquidationPrice, ur = (qr = e.orderTools) == null ? void 0 : qr.priceLine, dr = (Yr = e.orderTools) == null ? void 0 : Yr.marketPriceLine, hr = (Wr = e.orderTools) == null ? void 0 : Wr.countDown, fr = (Gr = e.orderTools) == null ? void 0 : Gr.bidAskPrice, gr = (Xr = e.orderTools) == null ? void 0 : Xr.orderHistory;
  Re(() => {
    var ue, be, Se, G, Ce, ge, we, Pe, Xe, Je, it, et, tt, f1;
    const o = (ue = e.orderTools) == null ? void 0 : ue.quickOrder, i = (be = e.orderTools) == null ? void 0 : be.quickOrderFloatingWindow, s = (Se = e.orderTools) == null ? void 0 : Se.quickOrderPlusButton, u = (G = e.orderTools) == null ? void 0 : G.openOrders, g = (Ce = e.orderTools) == null ? void 0 : Ce.openOrdersExtendedPriceLine, m = (ge = e.orderTools) == null ? void 0 : ge.openOrdersDisplay, f = (we = e.orderTools) == null ? void 0 : we.positions, y = (Pe = e.orderTools) == null ? void 0 : Pe.breakevenPrice, k = (Xe = e.orderTools) == null ? void 0 : Xe.liquidationPrice, T = (Je = e.orderTools) == null ? void 0 : Je.priceLine, P = (it = e.orderTools) == null ? void 0 : it.marketPriceLine, oe = (et = e.orderTools) == null ? void 0 : et.countDown, ae = (tt = e.orderTools) == null ? void 0 : tt.bidAskPrice, ie = (f1 = e.orderTools) == null ? void 0 : f1.orderHistory, J = {};
    typeof o == "boolean" && o !== tr && (tr = o, J.quickOrder = o, typeof i != "boolean" && (J.quickOrderFloatingWindow = o), typeof s != "boolean" && (J.quickOrderPlusButton = o)), typeof i == "boolean" && i !== nr && (nr = i, J.quickOrderFloatingWindow = i), typeof s == "boolean" && s !== rr && (rr = s, J.quickOrderPlusButton = s), typeof u == "boolean" && u !== or && (or = u, J.openOrders = u), typeof g == "boolean" && g !== ir && (ir = g, J.openOrdersExtendedPriceLine = g), m !== void 0 && m !== ar && (ar = m, J.openOrdersDisplay = m), typeof f == "boolean" && f !== sr && (sr = f, J.positions = f), typeof y == "boolean" && y !== lr && (lr = y, J.breakevenPrice = y), typeof k == "boolean" && k !== cr && (cr = k, J.liquidationPrice = k), typeof T == "boolean" && T !== ur && (ur = T, J.priceLine = T, typeof P != "boolean" && (J.marketPriceLine = T), typeof oe != "boolean" && (J.countDown = T), typeof ae != "boolean" && (J.bidAskPrice = T)), typeof P == "boolean" && P !== dr && (dr = P, J.marketPriceLine = P), typeof oe == "boolean" && oe !== hr && (hr = oe, J.countDown = oe), typeof ae == "boolean" && ae !== fr && (fr = ae, J.bidAskPrice = ae), typeof ie == "boolean" && ie !== gr && (gr = ie, J.orderHistory = ie), Object.keys(J).length > 0 && c1(J);
  }), Re(() => {
    Be().marketPriceLine, Be().countDown, U(), N(), n == null || n.setStyles({
      candle: {
        priceMark: {
          last: {
            show: !0,
            line: {
              show: Be().marketPriceLine
            },
            text: {
              show: !Be().countDown
            }
          }
        }
      }
    }), Ye();
  }), e.ref({
    setTheme: v,
    getTheme: () => h(),
    setStyles: b,
    getStyles: () => n.getStyles(),
    setLocale: B,
    getLocale: () => L(),
    setTimezone: (o) => {
      A({
        key: o,
        text: R0(e.timezone, L())
      });
    },
    getTimezone: () => se().key,
    setSymbol: Z,
    getSymbol: () => N(),
    setPeriod: K,
    getPeriod: () => U(),
    getMainIndicators: () => X(),
    getSubIndicators: () => pe(),
    setMainIndicators: ee,
    setSubIndicators: H,
    overrideIndicator: (o, i) => {
      n == null || n.overrideIndicator(o, i);
    },
    createOverlay: (o) => {
      var s;
      const i = (s = n == null ? void 0 : n.createOverlay) == null ? void 0 : s.call(n, _t(o));
      return typeof i == "string" ? i : null;
    },
    removeOverlay: (o) => {
      var i;
      if ((i = n == null ? void 0 : n.removeOverlay) == null || i.call(n, o), o.id) {
        Ae.delete(o.id);
        const s = Fe.get(o.id);
        s && (s.checkInterval && clearInterval(s.checkInterval), s.mouseUpHandler && (document.removeEventListener("mouseup", s.mouseUpHandler), document.removeEventListener("touchend", s.mouseUpHandler)), Fe.delete(o.id)), St();
      }
    },
    removeAllOverlay: () => {
      Ae.forEach((o, i) => {
        var u;
        (u = n == null ? void 0 : n.removeOverlay) == null || u.call(n, {
          id: i
        });
        const s = Fe.get(i);
        s && (s.checkInterval && clearInterval(s.checkInterval), s.mouseUpHandler && (document.removeEventListener("mouseup", s.mouseUpHandler), document.removeEventListener("touchend", s.mouseUpHandler)));
      }), Ae.clear(), Fe.clear();
    },
    getAllOverlay: () => Array.from(Ae.values()),
    getOverlay: (o) => Ae.get(o) || null,
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
    setIndicatorModalVisible: j,
    setTimezoneModalVisible: ne,
    setSettingModalVisible: te,
    setTimeToolsModalVisible: (o) => {
      o && O(Date.now()), Q(o);
    },
    getOrderToolsState: () => Be(),
    setOrderToolsState: (o) => {
      c1(o);
    },
    dispose: () => {
      t && n0(t);
    },
    resize: () => {
      n && "resize" in n && typeof n.resize == "function" ? n.resize() : console.warn("resize method not available on widget");
    },
    getSettings: () => {
      var s, u, g, m, f, y, k, T, P, oe, ae, ie, J, ue, be, Se;
      if (!n)
        return {};
      const o = n.getStyles(), i = (s = o.candle) == null ? void 0 : s.bar;
      return {
        // Candle settings
        candleType: (u = o.candle) == null ? void 0 : u.type,
        candleBarStyle: i == null ? void 0 : i.style,
        // bar.style might be LineType
        showLastPrice: (f = (m = (g = o.candle) == null ? void 0 : g.priceMark) == null ? void 0 : m.last) == null ? void 0 : f.show,
        showHighestPrice: (T = (k = (y = o.candle) == null ? void 0 : y.priceMark) == null ? void 0 : k.high) == null ? void 0 : T.show,
        showLowestPrice: (ae = (oe = (P = o.candle) == null ? void 0 : P.priceMark) == null ? void 0 : oe.low) == null ? void 0 : ae.show,
        // Indicator settings
        showIndicatorLastValue: (J = (ie = o.indicator) == null ? void 0 : ie.lastValueMark) == null ? void 0 : J.show,
        // Axis settings - yAxis.reverse is boolean according to YAxisStyle interface
        priceAxisType: (ue = o.yAxis) == null ? void 0 : ue.type,
        reverseCoordinate: (be = o.yAxis) == null ? void 0 : be.reverse,
        // Grid settings
        showGrids: (Se = o.grid) == null ? void 0 : Se.show,
        timestamp: Date.now()
      };
    },
    setSettings: (o) => {
      var s, u, g, m, f, y, k, T, P, oe, ae, ie, J, ue;
      if (!n)
        return;
      const i = {};
      if (o.candleType !== void 0 && (i.candle = {
        ...i.candle,
        type: o.candleType
      }), o.candleBarStyle !== void 0) {
        const be = ((s = i.candle) == null ? void 0 : s.bar) || {};
        i.candle = {
          ...i.candle,
          bar: {
            ...be,
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
            ...(m = (g = i.candle) == null ? void 0 : g.priceMark) == null ? void 0 : m.last,
            show: o.showLastPrice,
            text: {
              ...(k = (y = (f = i.candle) == null ? void 0 : f.priceMark) == null ? void 0 : y.last) == null ? void 0 : k.text,
              show: o.showLastPrice && !Be().countDown
            }
          }
        }
      }), o.showHighestPrice !== void 0 && (i.candle = {
        ...i.candle,
        priceMark: {
          ...(T = i.candle) == null ? void 0 : T.priceMark,
          high: {
            ...(oe = (P = i.candle) == null ? void 0 : P.priceMark) == null ? void 0 : oe.high,
            show: o.showHighestPrice
          }
        }
      }), o.showLowestPrice !== void 0 && (i.candle = {
        ...i.candle,
        priceMark: {
          ...(ae = i.candle) == null ? void 0 : ae.priceMark,
          low: {
            ...(J = (ie = i.candle) == null ? void 0 : ie.priceMark) == null ? void 0 : J.low,
            show: o.showLowestPrice
          }
        }
      }), o.showIndicatorLastValue !== void 0 && (i.indicator = {
        ...i.indicator,
        lastValueMark: {
          ...(ue = i.indicator) == null ? void 0 : ue.lastValueMark,
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
      }), jt(i), n.setStyles(i);
    },
    resetSettings: () => {
      var s, u, g, m, f, y, k;
      if (!n)
        return;
      n.getStyles();
      const o = {
        candle: {
          type: a9.CandleSolid,
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
          type: s9.Normal,
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
      }, i = R();
      if (i) {
        const T = {
          candle: {
            type: (s = i.candle) == null ? void 0 : s.type,
            bar: (u = i.candle) == null ? void 0 : u.bar,
            priceMark: (g = i.candle) == null ? void 0 : g.priceMark
          },
          indicator: {
            lastValueMark: (m = i.indicator) == null ? void 0 : m.lastValueMark
          },
          yAxis: {
            type: (f = i.yAxis) == null ? void 0 : f.type,
            reverse: (y = i.yAxis) == null ? void 0 : y.reverse
          },
          grid: {
            show: (k = i.grid) == null ? void 0 : k.show
          }
        };
        jt(T), n.setStyles(T);
      } else
        jt(o), n.setStyles(o);
    },
    // === Drawing Methods ===
    saveDrawings: (o) => {
      const i = Array.from(Ae.values());
      i.forEach((s, u) => {
        var f;
        const g = vt(s.type), m = ((f = s.points) == null ? void 0 : f.length) || 0;
        m < g && console.warn(`âš ï¸ ${s.type} ${s.id} has only ${m} point(s), should have ${g}`);
      }), ft.saveDrawings(o, i);
    },
    loadDrawings: (o) => {
      ft.loadDrawings(o).forEach((s, u) => {
        var g;
        try {
          const m = {
            name: s.type,
            points: s.points || [],
            extendData: s.extendData,
            styles: s.styles,
            visible: s.visible ?? !0,
            lock: s.lock ?? !1,
            mode: s.mode ?? kn.Normal
          }, f = n == null ? void 0 : n.createOverlay(m), y = typeof f == "string" ? f : null;
          y && (Ae.set(y, {
            ...s,
            id: y
          }), Fe.set(y, {
            monitoring: !1,
            complete: !0,
            lastPointCount: ((g = s.points) == null ? void 0 : g.length) || 0
          }));
        } catch (m) {
          console.error(`   âŒ Error restoring ${s.type}:`, m);
        }
      });
    },
    getDrawings: (o) => ft.loadDrawings(o),
    clearDrawings: (o) => {
      ft.clearDrawings(o);
    },
    // Auto-save on overlay events
    enableAutoSave: (o, i = !0) => {
    }
  });
  const mr = () => {
    n == null || n.resize(), Ye(), br(), kt();
  };
  let U1, z1, V1, h1 = !1, yr = 0;
  const Fo = () => {
    if (h1 || Date.now() < yr)
      return;
    const o = Le();
    if (!o.enabled || o.anchorPoint === "date")
      return;
    const i = _r(o.anchorPoint, o.timestamp);
    if (Number.isFinite(i) && i !== o.timestamp) {
      const s = {
        ...o,
        timestamp: i
      };
      ye(s), W0(s);
    }
  }, Uo = () => {
    V1 && window.clearTimeout(V1), V1 = window.setTimeout(() => {
      V1 = void 0, Fo();
    }, 80);
  }, Cr = () => {
    Ye(), br(), kt(), Uo();
  }, pr = [Dt.OnVisibleRangeChange, Dt.OnZoom, Dt.OnScroll], zo = (o) => {
    const i = new Date(o), s = i.getFullYear(), u = `${i.getMonth() + 1}`.padStart(2, "0"), g = `${i.getDate()}`.padStart(2, "0"), m = `${i.getHours()}`.padStart(2, "0"), f = `${i.getMinutes()}`.padStart(2, "0");
    return `${s}/${u}/${g} ${m}:${f}`;
  }, Vo = (o) => {
    var f;
    const i = ((f = n == null ? void 0 : n.getDataList) == null ? void 0 : f.call(n)) ?? [];
    if (i.length === 0)
      return null;
    let s = i[0], u = 0, g = Number(s == null ? void 0 : s.timestamp), m = Math.abs(g - o);
    for (let y = 1; y < i.length; y += 1) {
      const k = i[y], T = Number(k == null ? void 0 : k.timestamp);
      if (!Number.isFinite(T))
        continue;
      const P = Math.abs(T - o);
      P < m && (s = k, u = y, g = T, m = P);
    }
    return s && Number.isFinite(g) ? {
      candle: s,
      dataIndex: u
    } : null;
  }, Ko = (o) => {
    var s;
    const i = ((s = n == null ? void 0 : n.getDataList) == null ? void 0 : s.call(n)) ?? [];
    if (i.length === 0 || !Number.isFinite(o))
      return null;
    for (let u = 0; u < i.length; u += 1) {
      const g = i[u];
      if (Number(g == null ? void 0 : g.timestamp) === o)
        return {
          candle: g,
          dataIndex: u
        };
    }
    return null;
  }, K1 = (o) => {
    var s;
    const i = ((s = n == null ? void 0 : n.getDataList) == null ? void 0 : s.call(n)) ?? [];
    return i.length === 0 || !Number.isFinite(o) || o < 0 ? -1 : Math.max(0, Math.min(i.length - 1, o + 1));
  }, vr = (o) => {
    var ae, ie, J;
    if (!n || !t)
      return null;
    const i = Vo(o), s = i == null ? void 0 : i.candle, u = Number((s == null ? void 0 : s.timestamp) ?? o), g = Number((s == null ? void 0 : s.high) ?? (s == null ? void 0 : s.close) ?? (s == null ? void 0 : s.open)), m = i ? K1(i.dataIndex) : void 0, f = i && Number.isFinite(g) ? {
      dataIndex: m,
      value: g
    } : {
      timestamp: u
    }, y = (ae = n.convertToPixel) == null ? void 0 : ae.call(n, [f], {
      paneId: "candle_pane",
      absolute: !0
    }), k = Number((ie = y == null ? void 0 : y[0]) == null ? void 0 : ie.x), T = Number((J = y == null ? void 0 : y[0]) == null ? void 0 : J.y), P = t.clientWidth, oe = t.clientHeight;
    return !Number.isFinite(k) || k < -80 || k > P + 80 ? null : {
      timestamp: u,
      text: zo(u),
      left: Math.max(58, Math.min(k, P - 58)),
      top: Number.isFinite(T) ? Math.max(8, Math.min(T - 42, oe - 38)) : 10
    };
  }, br = () => {
    const o = i1();
    if (!o || !n || !t)
      return;
    const i = vr(o.timestamp);
    i && L1(i);
  }, R1 = (o, i = 0) => {
    if (!n || !t)
      return;
    const s = vr(o);
    if (s) {
      L1(s);
      return;
    }
    i < 6 && (z1 = window.setTimeout(() => R1(o, i + 1), 80));
  }, bn = (o, i, s) => {
    let u = i, g = u;
    switch (o.timespan) {
      case "minute": {
        u = u - u % (60 * 1e3), g = u - s * o.multiplier * 60 * 1e3;
        break;
      }
      case "hour": {
        u = u - u % (60 * 60 * 1e3), g = u - s * o.multiplier * 60 * 60 * 1e3;
        break;
      }
      case "day": {
        u = u - u % (60 * 60 * 1e3), g = u - s * o.multiplier * 24 * 60 * 60 * 1e3;
        break;
      }
      case "week": {
        const f = new Date(u).getDay(), y = f === 0 ? 6 : f - 1;
        u = u - y * 60 * 60 * 24;
        const k = new Date(u);
        u = (/* @__PURE__ */ new Date(`${k.getFullYear()}-${k.getMonth() + 1}-${k.getDate()}`)).getTime(), g = s * o.multiplier * 7 * 24 * 60 * 60 * 1e3;
        break;
      }
      case "month": {
        const m = new Date(u), f = m.getFullYear(), y = m.getMonth() + 1;
        u = (/* @__PURE__ */ new Date(`${f}-${y}-01`)).getTime(), g = s * o.multiplier * 30 * 24 * 60 * 60 * 1e3;
        const k = new Date(g);
        g = (/* @__PURE__ */ new Date(`${k.getFullYear()}-${k.getMonth() + 1}-01`)).getTime();
        break;
      }
      case "year": {
        const f = new Date(u).getFullYear();
        u = (/* @__PURE__ */ new Date(`${f}-01-01`)).getTime(), g = s * o.multiplier * 365 * 24 * 60 * 60 * 1e3;
        const y = new Date(g);
        g = (/* @__PURE__ */ new Date(`${y.getFullYear()}-01-01`)).getTime();
        break;
      }
    }
    return [g, u];
  }, Ro = (o, i = 500) => {
    const s = X1(U()), u = Math.max(1, Math.floor(i / 2)) * s;
    return {
      from: o - u,
      to: o + u
    };
  }, jo = (o, i, s = 600) => {
    const u = X1(i), g = Math.max(120, s);
    let m = 0.5;
    o.anchorPoint === "left" ? m = 0.12 : o.anchorPoint === "right" && (m = 0.88);
    const f = Math.max(20, Math.floor(g * m)), y = Math.max(20, g - f);
    return {
      from: o.timestamp - f * u,
      to: Math.min(Date.now(), o.timestamp + y * u)
    };
  }, Qo = (o) => {
    const i = new Date(o.from), s = new Date(o.to);
    return {
      from: new Date(i.getFullYear(), i.getMonth(), i.getDate(), 0, 0, 0, 0).getTime(),
      to: new Date(s.getFullYear(), s.getMonth(), s.getDate(), 23, 59, 59, 999).getTime()
    };
  }, Zo = (o, i) => {
    const s = Math.min(i.from, i.to), u = Math.max(i.from, i.to);
    return o.filter((g) => {
      const m = Number(g.timestamp);
      return m >= s && m <= u;
    });
  }, Ho = (o, i) => {
    var u;
    const s = Math.max(i.from, i.to);
    for (let g = o.length - 1; g >= 0; g -= 1) {
      const m = Number((u = o[g]) == null ? void 0 : u.timestamp);
      if (Number.isFinite(m) && m <= s)
        return m;
    }
    return s;
  }, qo = (o, i) => {
    var u;
    const s = Math.max(i.from, i.to);
    for (let g = o.length - 1; g >= 0; g -= 1) {
      const m = Number((u = o[g]) == null ? void 0 : u.timestamp);
      if (Number.isFinite(m) && m <= s)
        return g;
    }
    return o.length - 1;
  }, Yo = (o, i) => {
    const s = X1(i), u = Math.abs(o.to - o.from), g = Math.max(1, Math.ceil(u / s) + 1), m = Math.max(g, 120) * s;
    return {
      from: o.from,
      to: Math.max(o.to, Math.min(Date.now(), o.to + m))
    };
  }, Wo = (o) => {
    var m, f;
    if (!n || !t || o.length === 0)
      return;
    const i = ((m = n.getSize("candle_pane", at.YAxis)) == null ? void 0 : m.width) ?? 0, s = ((f = n.getSize("candle_pane", at.Main)) == null ? void 0 : f.width) ?? t.clientWidth - i, u = Math.max(1, s - 8), g = Math.max(2, u / Math.max(1, o.length));
    n.setOffsetRightDistance(0), n.setLeftMinVisibleBarCount(0), n.setRightMinVisibleBarCount(0), n.setBarSpace(g);
  }, $n = (o) => {
    var i;
    !n || !Number.isFinite(o) || ((i = n.scrollToTimestamp) == null || i.call(n, o, 250), requestAnimationFrame(() => R1(o)), Ye());
  }, $r = (o, i = "floor") => {
    var m, f, y;
    const s = ((m = n == null ? void 0 : n.getDataList) == null ? void 0 : m.call(n)) ?? [];
    if (s.length === 0 || !Number.isFinite(o))
      return -1;
    if (i === "floor")
      for (let k = s.length - 1; k >= 0; k -= 1) {
        const T = Number((f = s[k]) == null ? void 0 : f.timestamp);
        if (Number.isFinite(T) && T <= o)
          return k;
      }
    let u = 0, g = 1 / 0;
    for (let k = 0; k < s.length; k += 1) {
      const T = Number((y = s[k]) == null ? void 0 : y.timestamp);
      if (!Number.isFinite(T))
        continue;
      const P = Math.abs(T - o);
      (P < g || P === g && T > o) && (g = P, u = k);
    }
    return g === 1 / 0 ? -1 : u;
  }, _n = (o) => {
    var k, T, P;
    if (!n || !t)
      return null;
    const i = (k = n.getDom) == null ? void 0 : k.call(n, "candle_pane", at.Main), s = (T = i == null ? void 0 : i.getBoundingClientRect) == null ? void 0 : T.call(i), u = (P = r == null ? void 0 : r.getBoundingClientRect) == null ? void 0 : P.call(r), g = t.getBoundingClientRect(), m = s && Number.isFinite(s.left) ? s.left - ((u == null ? void 0 : u.left) ?? g.left) : g.left - ((u == null ? void 0 : u.left) ?? g.left), f = n.getSize("candle_pane", at.Main), y = (s == null ? void 0 : s.width) ?? (f == null ? void 0 : f.width) ?? t.clientWidth;
    return o === "left" ? Math.max(8, m) : o === "center" ? m + y / 2 : o === "right" ? m + y : null;
  }, _r = (o, i) => {
    var T, P, oe, ae, ie, J;
    const s = _n(o), u = ((T = n == null ? void 0 : n.getDataList) == null ? void 0 : T.call(n)) ?? [];
    if (!n || s === null || u.length === 0)
      return i;
    const g = (P = n.convertFromPixel) == null ? void 0 : P.call(n, [{
      x: s,
      y: 0
    }], {
      paneId: "candle_pane",
      absolute: !0
    }), m = Number((oe = g == null ? void 0 : g[0]) == null ? void 0 : oe.dataIndex), f = Math.max(0, Math.min(u.length - 1, Number.isFinite(m) ? Math.round(m) : -1)), y = Ko(i);
    if (y) {
      const ue = K1(y.dataIndex), be = (ae = n.convertToPixel) == null ? void 0 : ae.call(n, [{
        dataIndex: ue
      }], {
        paneId: "candle_pane",
        absolute: !0
      }), Se = Number((ie = be == null ? void 0 : be[0]) == null ? void 0 : ie.x), G = n.getBarSpace, Ce = typeof G == "function" ? G.call(n) : void 0, ge = Number(typeof Ce == "object" ? Ce == null ? void 0 : Ce.bar : Ce), we = Number.isFinite(ge) ? Math.max(2, ge / 2) : 8;
      if (Number.isFinite(Se) && Math.abs(Se - s) <= we)
        return i;
    }
    const k = Number((J = u[f]) == null ? void 0 : J.timestamp);
    return Number.isFinite(k) ? k : i;
  }, kr = (o) => {
    if (!n || !Number.isFinite(o.timestamp))
      return;
    if (h1 = !0, yr = Date.now() + 1e3, o.anchorPoint === "date") {
      $n(o.timestamp), window.setTimeout(() => {
        h1 = !1;
      }, 1e3);
      return;
    }
    const i = $r(o.timestamp, "nearest"), s = K1(i), u = _n(o.anchorPoint);
    if (s < 0 || u === null) {
      $n(o.timestamp), window.setTimeout(() => {
        h1 = !1;
      }, 1e3);
      return;
    }
    n.scrollToDataIndex(s, 0), requestAnimationFrame(() => {
      var f, y;
      const g = (f = n == null ? void 0 : n.convertToPixel) == null ? void 0 : f.call(n, [{
        dataIndex: s
      }], {
        paneId: "candle_pane",
        absolute: !0
      }), m = Number((y = g == null ? void 0 : g[0]) == null ? void 0 : y.x);
      Number.isFinite(m) && (n == null || n.scrollByDistance(u - m, 0)), requestAnimationFrame(() => {
        kt(o), R1(o.timestamp), window.setTimeout(() => {
          h1 = !1;
        }, 1e3);
      });
    }), Ye();
  }, Go = (o) => {
    var f, y;
    if (!n || !t)
      return null;
    const i = _n(o.anchorPoint);
    if (i !== null)
      return i;
    const s = K1($r(o.timestamp, "nearest")), u = s >= 0 ? {
      dataIndex: s
    } : {
      timestamp: o.timestamp
    }, g = (f = n.convertToPixel) == null ? void 0 : f.call(n, [u], {
      paneId: "candle_pane",
      absolute: !0
    }), m = Number((y = g == null ? void 0 : g[0]) == null ? void 0 : y.x);
    return !Number.isFinite(m) || m < -2 || m > t.clientWidth + 2 ? null : m;
  }, kt = (o) => {
    var P, oe, ae, ie;
    const i = o ?? Le();
    if (!n || !i.enabled || !i.anchorLine) {
      a1(null);
      return;
    }
    const s = Go(i), u = (P = n.getDom) == null ? void 0 : P.call(n, "candle_pane", at.Main), g = (oe = u == null ? void 0 : u.getBoundingClientRect) == null ? void 0 : oe.call(u), m = (ae = r == null ? void 0 : r.getBoundingClientRect) == null ? void 0 : ae.call(r), f = (ie = t == null ? void 0 : t.getBoundingClientRect) == null ? void 0 : ie.call(t), y = n.getSize("candle_pane", at.Main), k = g && Number.isFinite(g.top) ? g.top - ((m == null ? void 0 : m.top) ?? (f == null ? void 0 : f.top) ?? 0) : 0, T = Math.max(1, (g == null ? void 0 : g.height) ?? (y == null ? void 0 : y.height) ?? 0);
    if (s === null) {
      a1(null);
      return;
    }
    a1({
      left: s,
      top: k,
      height: T
    });
  }, xr = async (o, i) => {
    if (n) {
      d(!0), $e(!0);
      try {
        const s = U(), u = o.from <= o.to ? o : {
          from: o.to,
          to: o.from
        }, g = Qo(u), m = i ? g : Yo(g, s), f = await e.datafeed.getHistoryKLineData(N(), s, m.from, m.to), y = Zo(f, g);
        n.applyNewData(f, f.length > 0), ve(g), requestAnimationFrame(() => {
          const k = qo(f, g);
          i ? $n(i) : (Wo(y), n == null || n.scrollToDataIndex(k, 0), R1(Ho(y, g))), kt();
        });
      } finally {
        d(!1), $e(!1);
      }
    }
  }, Xo = async (o) => {
    O(o), await xr(Ro(o), o);
  }, Jo = (o) => {
    const s = {
      ...o,
      timestamp: (() => !n || o.anchorPoint === "date" ? o.timestamp : _r(o.anchorPoint, o.timestamp))()
    };
    ye(s), W0(s), s.enabled ? (O(s.timestamp), requestAnimationFrame(() => {
      kr(s), kt(s);
    })) : requestAnimationFrame(() => kt(s));
  };
  Vn(() => {
    if (window.addEventListener("resize", mr), n = i9(t, {
      customApi: {
        formatDate: (f, y, k, T) => {
          switch (U().timespan) {
            case "minute":
              return T === Q1.XAxis ? E.formatDate(f, y, "HH:mm") : E.formatDate(f, y, "YYYY-MM-DD HH:mm");
            case "hour":
              return T === Q1.XAxis ? E.formatDate(f, y, "MM-DD HH:mm") : E.formatDate(f, y, "YYYY-MM-DD HH:mm");
            case "day":
            case "week":
              return E.formatDate(f, y, "YYYY-MM-DD");
            case "month":
              return T === Q1.XAxis ? E.formatDate(f, y, "YYYY-MM") : E.formatDate(f, y, "YYYY-MM-DD");
            case "year":
              return T === Q1.XAxis ? E.formatDate(f, y, "YYYY") : E.formatDate(f, y, "YYYY-MM-DD");
          }
          return E.formatDate(f, y, "YYYY-MM-DD HH:mm");
        }
      }
    }), n) {
      const f = n.getDom("candle_pane", at.Main);
      if (f) {
        let k = document.createElement("div");
        if (k.className = "klinecharts-pro-watermark", E.isString(e.watermark)) {
          const T = e.watermark.replace(/(^\s*)|(\s*$)/g, "");
          k.innerHTML = T;
        } else
          k.appendChild(e.watermark);
        f.appendChild(k);
      }
      const y = n.getDom("candle_pane", at.YAxis);
      a = document.createElement("span"), a.className = "klinecharts-pro-price-unit", y == null || y.appendChild(a);
    }
    let o = !1;
    const i = () => {
      const f = N();
      if (f != null && f.ticker)
        try {
          const y = Array.from(Ae.values());
          ft.saveDrawings(f.ticker, y);
        } catch (y) {
          console.error("âŒ Error refreshing local storage:", y);
        }
    }, s = (f) => {
      o || (o = !0, f.preventDefault());
    };
    setTimeout(() => {
      t && t.addEventListener("contextmenu", s);
    }, 1e3), document.addEventListener("contextmenu", (f) => {
      t && t.contains(f.target) && s(f);
    });
    const u = n == null ? void 0 : n.removeOverlay;
    n && u && (n.removeOverlay = function(...f) {
      const y = u.apply(this, f), k = f[0];
      let T;
      if (typeof k == "string" ? T = k : k && typeof k == "object" && k.id && (T = k.id), T) {
        Ae.delete(T);
        const P = Fe.get(T);
        P && (P.checkInterval && clearInterval(P.checkInterval), P.mouseUpHandler && (document.removeEventListener("mouseup", P.mouseUpHandler), document.removeEventListener("touchend", P.mouseUpHandler)), Fe.delete(T)), i();
      }
      return y;
    }), X().forEach((f) => {
      G1(n, f, !0, {
        id: "candle_pane"
      });
    });
    const g = {};
    e.subIndicators.forEach((f) => {
      const y = G1(n, f, !0);
      y && (g[f] = y);
    }), H(g), n == null || n.loadMore((f) => {
      d(!0), (async () => {
        try {
          const k = U(), [T] = bn(k, f, 1), [P] = bn(k, T, 500), oe = await e.datafeed.getHistoryKLineData(N(), k, P, T);
          n == null || n.applyMoreData(oe, oe.length > 0);
        } finally {
          d(!1);
        }
      })();
    }), n == null || n.subscribeAction(Dt.OnTooltipIconClick, (f) => {
      if (f.indicatorName)
        switch (f.iconId) {
          case "visible": {
            n == null || n.overrideIndicator({
              name: f.indicatorName,
              visible: !0
            }, f.paneId);
            const y = f.paneId === "candle_pane" ? "main" : "sub";
            Ge(f.indicatorName, f.paneId, y, "change");
            break;
          }
          case "invisible": {
            n == null || n.overrideIndicator({
              name: f.indicatorName,
              visible: !1
            }, f.paneId);
            const y = f.paneId === "candle_pane" ? "main" : "sub";
            Ge(f.indicatorName, f.paneId, y, "change");
            break;
          }
          case "setting": {
            const y = n == null ? void 0 : n.getIndicatorByPaneId(f.paneId, f.indicatorName);
            A1({
              visible: !0,
              indicatorName: f.indicatorName,
              paneId: f.paneId,
              calcParams: y.calcParams
            });
            break;
          }
          case "close":
            if (f.paneId === "candle_pane") {
              const y = [...X()];
              n == null || n.removeIndicator("candle_pane", f.indicatorName), y.splice(y.indexOf(f.indicatorName), 1), ee(y), Ge(f.indicatorName, "candle_pane", "main", "remove");
            } else {
              const y = {
                ...pe()
              };
              n == null || n.removeIndicator(f.paneId, f.indicatorName), delete y[f.indicatorName], H(y), Ge(f.indicatorName, f.paneId, "sub", "remove");
            }
        }
    }), n == null || n.subscribeAction(Dt.OnCrosshairChange, u1), pr.forEach((f) => {
      n == null || n.subscribeAction(f, Cr);
    }), U1 = window.setInterval(() => Ye(), 1e3), Ye(), document.addEventListener("mousedown", er);
    const m = n == null ? void 0 : n.createOverlay;
    n && m && (n.createOverlay = function(...f) {
      const y = _t(f[0]), k = m.apply(this, [y, ...f.slice(1)]), T = typeof k == "string" ? k : null;
      return T && (l1(T, y.name || "unknown"), ht(T), St()), k;
    });
  }), Et(() => {
    window.removeEventListener("resize", mr), n == null || n.unsubscribeAction(Dt.OnCrosshairChange, u1), pr.forEach((o) => {
      n == null || n.unsubscribeAction(o, Cr);
    }), U1 && (window.clearInterval(U1), U1 = void 0), z1 && (window.clearTimeout(z1), z1 = void 0), document.removeEventListener("mousedown", er), Fe.clear(), Ae.clear(), n0(t);
  }), Re(() => {
    const o = N();
    o != null && o.priceCurrency ? (a.innerHTML = o == null ? void 0 : o.priceCurrency.toLocaleUpperCase(), a.style.display = "flex") : a.style.display = "none", n == null || n.setPriceVolumePrecision((o == null ? void 0 : o.pricePrecision) ?? 2, (o == null ? void 0 : o.volumePrecision) ?? 0);
  });
  const e9 = (o) => {
    const i = new Date(o), s = i.getFullYear(), u = `${i.getMonth() + 1}`.padStart(2, "0"), g = `${i.getDate()}`.padStart(2, "0"), m = `${i.getHours()}`.padStart(2, "0"), f = `${i.getMinutes()}`.padStart(2, "0"), y = `${s}-${u}-${g}`;
    switch (U().timespan) {
      case "minute":
      case "hour":
        return `${y} ${m}:${f}`;
      case "day":
      case "week":
        return y;
      case "month":
        return y;
      case "year":
        return y;
    }
    return `${y} ${m}:${f}`;
  }, t9 = (o, i) => {
    var k, T;
    const {
      current: s
    } = o, u = i.tooltip.text.color, g = s.close > s.open ? i.bar.upColor : s.close < s.open ? i.bar.downColor : i.bar.noChangeColor, m = Math.min(Math.max(((k = N()) == null ? void 0 : k.pricePrecision) ?? 2, 0), 8), f = Math.min(Math.max(((T = N()) == null ? void 0 : T.volumePrecision) ?? 0, 0), 8), y = (P) => ({
      text: E.formatPrecision(P, m),
      color: g
    });
    return [{
      title: "time",
      value: {
        text: e9(s.timestamp),
        color: u
      }
    }, {
      title: "open",
      value: y(s.open)
    }, {
      title: "high",
      value: y(s.high)
    }, {
      title: "low",
      value: y(s.low)
    }, {
      title: "close",
      value: y(s.close)
    }, {
      title: "volume",
      value: {
        text: E.formatBigNumber(E.formatPrecision(s.volume ?? i.tooltip.defaultValue, f)),
        color: g
      }
    }];
  }, j1 = () => {
    n == null || n.setStyles({
      candle: {
        tooltip: {
          custom: t9,
          rect: {
            offsetLeft: 0,
            paddingLeft: 0
          }
        }
      }
    });
  };
  return Re((o) => {
    const i = N(), s = U();
    let u = !0;
    return Et(() => {
      u = !1;
    }), o && e.datafeed.unsubscribe(o.symbol, o.period), d(!0), $e(!0), (async () => {
      try {
        const m = lt(Le), f = m.enabled && (!o || o.symbol.ticker === i.ticker || m.acrossTokens), y = f ? jo(m, s) : null, [k, T] = y ? [y.from, y.to] : bn(s, (/* @__PURE__ */ new Date()).getTime(), 500), P = await e.datafeed.getHistoryKLineData(i, s, k, T);
        if (!u)
          return;
        n == null || n.applyNewData(P, P.length > 0), f ? requestAnimationFrame(() => {
          kr(m), kt(m);
        }) : kt(), Ye(), setTimeout(() => {
          u && (P1(i == null ? void 0 : i.ticker), Ye());
        }, 0), e.datafeed.subscribe(i, s, (oe) => {
          n == null || n.updateData(oe), Ye();
        });
      } finally {
        u && (d(!1), $e(!1));
      }
    })(), {
      symbol: i,
      period: s
    };
  }), Re(() => {
    const o = h();
    n == null || n.setStyles(o);
    const i = o === "dark" ? "#929AA5" : "#76808F";
    j1(), n == null || n.setStyles({
      indicator: {
        tooltip: {
          icons: [{
            id: "visible",
            position: Z1.Middle,
            marginLeft: z().visibleMarginLeft,
            marginTop: z().marginTop,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: z().size,
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "invisible",
            position: Z1.Middle,
            marginLeft: z().secondaryMarginLeft,
            marginTop: z().marginTop,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: z().size,
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "setting",
            position: Z1.Middle,
            marginLeft: z().secondaryMarginLeft,
            marginTop: z().marginTop,
            marginBottom: 0,
            marginRight: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: z().size,
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "close",
            position: Z1.Middle,
            marginLeft: z().secondaryMarginLeft,
            marginTop: z().marginTop,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: z().size,
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }]
        }
      }
    });
  }), Re(() => {
    n == null || n.setLocale(L());
  }), Re(() => {
    n == null || n.setTimezone(se().key);
  }), Re(() => {
    x() && (jt(x()), n == null || n.setStyles(x()), j1(), de(ml(n.getStyles())));
  }), [um.cloneNode(!0), w(Ah, {
    get locale() {
      return e.locale;
    },
    get symbol() {
      return N();
    },
    get spread() {
      return Me();
    },
    get period() {
      return U();
    },
    get periods() {
      return e.periods;
    },
    onMenuClick: async () => {
      try {
        await P9(() => _(!Me())), n == null || n.resize();
      } catch {
      }
    },
    onSymbolClick: () => {
      Ne(!me());
    },
    get onMobilePeriodClick() {
      return e.onMobilePeriodClick;
    },
    onMobileMoreClick: () => {
      e.onMobileMoreClick ? e.onMobileMoreClick() : dt(!0);
    },
    onPeriodChange: K,
    onTimeToolsClick: () => {
      O(Date.now()), Q(!0);
    },
    onIndicatorClick: () => {
      j((o) => !o);
    },
    onTimezoneClick: () => {
      ne((o) => !o);
    },
    onSettingClick: () => {
      te((o) => !o);
    },
    onScreenshotClick: () => {
      if (n) {
        const o = e.screenshotBackgroundColor || (e.theme === "dark" ? "#11131E" : "#ffffff"), i = n.getConvertPictureUrl(!0, "jpeg", o);
        re(i);
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
      return Be();
    },
    onOrderToolsStateChange: c1
  }), (() => {
    const o = dm.cloneNode(!0), i = o.firstChild;
    return o.addEventListener("mouseleave", () => {
      Tt(null), qe(!1);
    }), xt((s) => r = s, o), C(o, w(le, {
      get when() {
        return ut();
      },
      get children() {
        return w(Oo, {});
      }
    }), i), C(o, w(le, {
      get when() {
        return Me();
      },
      get children() {
        return w(ig, {
          get locale() {
            return e.locale;
          },
          onDrawingItemClick: (s) => {
            n == null || n.createOverlay(_t(s));
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
          onRemoveClick: (s) => {
            n == null || n.removeOverlay({
              groupId: s
            });
          }
        });
      }
    }), i), xt((s) => t = s, i), C(o, w(le, {
      get when() {
        return w1();
      },
      keyed: !0,
      children: (s) => (() => {
        const u = hm.cloneNode(!0);
        return V((g) => {
          const m = `${s.left}px`, f = `${s.top}px`, y = `${s.height}px`;
          return m !== g._v$ && u.style.setProperty("left", g._v$ = m), f !== g._v$2 && u.style.setProperty("top", g._v$2 = f), y !== g._v$3 && u.style.setProperty("height", g._v$3 = y), g;
        }, {
          _v$: void 0,
          _v$2: void 0,
          _v$3: void 0
        }), u;
      })()
    }), null), C(o, w(le, {
      get when() {
        return i1();
      },
      keyed: !0,
      children: (s) => (() => {
        const u = fm.cloneNode(!0);
        return C(u, () => s.text), V((g) => {
          const m = `${s.left}px`, f = `${s.top}px`;
          return m !== g._v$4 && u.style.setProperty("left", g._v$4 = m), f !== g._v$5 && u.style.setProperty("top", g._v$5 = f), g;
        }, {
          _v$4: void 0,
          _v$5: void 0
        }), u;
      })()
    }), null), C(o, w(le, {
      get when() {
        return x1();
      },
      keyed: !0,
      children: (s) => (() => {
        const u = gm.cloneNode(!0), g = u.firstChild, m = g.nextSibling;
        return u.style.setProperty("right", "0px"), C(g, () => s.priceText), C(m, () => s.text), V((f) => {
          const y = `${s.top}px`, k = `${s.width}px`, T = s.color, P = `${s.borderRadius}px`, oe = s.textFamily, ae = s.textWeight, ie = `${s.paddingLeft}px`, J = `${s.paddingRight}px`, ue = `${s.paddingTop}px`, be = `${s.paddingBottom}px`, Se = `${s.textSize}px`, G = `${Math.max(10, s.textSize - 1)}px`;
          return y !== f._v$6 && u.style.setProperty("top", f._v$6 = y), k !== f._v$7 && u.style.setProperty("width", f._v$7 = k), T !== f._v$8 && u.style.setProperty("background", f._v$8 = T), P !== f._v$9 && u.style.setProperty("border-radius", f._v$9 = P), oe !== f._v$10 && u.style.setProperty("font-family", f._v$10 = oe), ae !== f._v$11 && u.style.setProperty("font-weight", f._v$11 = ae), ie !== f._v$12 && u.style.setProperty("padding-left", f._v$12 = ie), J !== f._v$13 && u.style.setProperty("padding-right", f._v$13 = J), ue !== f._v$14 && u.style.setProperty("padding-top", f._v$14 = ue), be !== f._v$15 && u.style.setProperty("padding-bottom", f._v$15 = be), Se !== f._v$16 && g.style.setProperty("font-size", f._v$16 = Se), G !== f._v$17 && m.style.setProperty("font-size", f._v$17 = G), f;
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
    }), null), C(o, w(le, {
      get when() {
        return Qe();
      },
      keyed: !0,
      children: (s) => (() => {
        const u = pm.cloneNode(!0), g = u.firstChild, m = g.nextSibling, f = m.nextSibling, y = f.firstChild, k = f.nextSibling, T = k.firstChild, P = T.firstChild, oe = P.nextSibling, ae = oe.firstChild, ie = k.nextSibling, J = ie.firstChild, ue = ie.nextSibling, be = ue.nextSibling, Se = be.nextSibling;
        return u.$$click = (G) => {
          G.stopPropagation();
        }, u.$$mousedown = (G) => {
          G.preventDefault(), G.stopPropagation();
        }, g.$$mousedown = B1, m.$$click = I1, y.$$click = () => He(Ze() === "color" ? null : "color"), C(f, w(le, {
          get when() {
            return Ze() === "color";
          },
          get children() {
            const G = mm.cloneNode(!0), Ce = G.firstChild;
            return C(Ce, w(b1, {
              each: T1,
              children: (ge) => (() => {
                const we = vm.cloneNode(!0);
                return we.$$click = () => E1(ge), we.style.setProperty("background", ge), V(() => fe(we, `overlay-toolbar-color-swatch ${s.color.toLowerCase() === ge.toLowerCase() ? "selected" : ""}`)), we;
              })()
            })), G;
          }
        }), null), T.$$click = () => He(Ze() === "width" ? null : "width"), C(oe, () => s.lineSize, ae), C(k, w(le, {
          get when() {
            return Ze() === "width";
          },
          get children() {
            const G = ym.cloneNode(!0);
            return C(G, w(b1, {
              each: [1, 2, 3, 4],
              children: (Ce) => (() => {
                const ge = bm.cloneNode(!0), we = ge.firstChild;
                return ge.$$click = () => ot(Ce), we.style.setProperty("height", `${Ce}px`), V(() => fe(ge, s.lineSize === Ce ? "selected" : "")), ge;
              })()
            })), G;
          }
        }), null), J.$$click = () => He(Ze() === "style" ? null : "style"), C(ie, w(le, {
          get when() {
            return Ze() === "style";
          },
          get children() {
            const G = Cm.cloneNode(!0), Ce = G.firstChild, ge = Ce.nextSibling, we = ge.nextSibling;
            return Ce.$$click = () => gt(ze.Solid, []), ge.$$click = () => gt(ze.Dashed, [6, 4]), we.$$click = () => gt(ze.Dashed, [2, 4]), V((Pe) => {
              var et, tt;
              const Xe = s.lineStyle === ze.Solid ? "selected" : "", Je = s.lineStyle === ze.Dashed && ((et = s.dashedValue) == null ? void 0 : et[0]) === 6 ? "selected" : "", it = s.lineStyle === ze.Dashed && ((tt = s.dashedValue) == null ? void 0 : tt[0]) === 2 ? "selected" : "";
              return Xe !== Pe._v$18 && fe(Ce, Pe._v$18 = Xe), Je !== Pe._v$19 && fe(ge, Pe._v$19 = Je), it !== Pe._v$20 && fe(we, Pe._v$20 = it), Pe;
            }, {
              _v$18: void 0,
              _v$19: void 0,
              _v$20: void 0
            }), G;
          }
        }), null), ue.$$click = Ue, be.$$click = Oe, Se.$$click = $, V((G) => {
          const Ce = `${s.x}px`, ge = `${s.y}px`, we = `overlay-toolbar-icon edit ${Ze() === "color" ? "active" : ""}`, Pe = `overlay-toolbar-line-size ${Ze() === "width" ? "active" : ""}`, Xe = `overlay-toolbar-icon minus ${Ze() === "style" ? "active" : ""}`, Je = `overlay-toolbar-icon visibility ${s.visible ? "" : "muted"}`, it = s.visible ? "Hide" : "Show", et = `overlay-toolbar-icon lock ${s.locked ? "active" : ""}`, tt = s.locked ? "Unlock" : "Lock";
          return Ce !== G._v$21 && u.style.setProperty("left", G._v$21 = Ce), ge !== G._v$22 && u.style.setProperty("top", G._v$22 = ge), we !== G._v$23 && fe(y, G._v$23 = we), Pe !== G._v$24 && fe(T, G._v$24 = Pe), Xe !== G._v$25 && fe(J, G._v$25 = Xe), Je !== G._v$26 && fe(ue, G._v$26 = Je), it !== G._v$27 && Ie(ue, "title", G._v$27 = it), et !== G._v$28 && fe(be, G._v$28 = et), tt !== G._v$29 && Ie(be, "title", G._v$29 = tt), G;
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
    }), null), C(o, w(le, {
      get when() {
        return Ut();
      },
      keyed: !0,
      children: (s) => (() => {
        const u = $m.cloneNode(!0), g = u.firstChild;
        return u.addEventListener("mouseleave", () => {
          At() || qe(!1);
        }), u.$$mousemove = (m) => {
          m.stopPropagation(), $t();
        }, u.addEventListener("mouseenter", () => {
          qe(!0), $t();
        }), g.$$click = (m) => {
          m.stopPropagation(), qe(!0), Mt({
            y: s.y,
            price: s.price,
            yAxisWidth: n1()
          }), rt(!0), $t();
        }, g.$$mousedown = (m) => {
          m.preventDefault(), m.stopPropagation(), $t();
        }, C(g, (() => {
          const m = Y(() => {
            var f;
            return !!((f = e.orderTools) != null && f.quickOrderPlusIcon);
          });
          return () => m() ? (() => {
            const f = _m.cloneNode(!0);
            return V(() => f.innerHTML = e.orderTools.quickOrderPlusIcon), f;
          })() : km.cloneNode(!0);
        })()), V((m) => {
          const f = `${Math.max(0, s.y - 12)}px`, y = `${n1()}px`, k = Be().quickOrderPlusButton ? "block" : "none";
          return f !== m._v$30 && u.style.setProperty("top", m._v$30 = f), y !== m._v$31 && u.style.setProperty("right", m._v$31 = y), k !== m._v$32 && u.style.setProperty("display", m._v$32 = k), m;
        }, {
          _v$30: void 0,
          _v$31: void 0,
          _v$32: void 0
        }), u;
      })()
    }), null), C(o, w(le, {
      get when() {
        return Y(() => !!At())() && pt();
      },
      keyed: !0,
      children: (s) => (() => {
        const u = xm.cloneNode(!0), g = u.firstChild, m = g.firstChild, f = m.firstChild, y = f.nextSibling, k = y.nextSibling, T = k.nextSibling;
        T.nextSibling;
        const P = m.nextSibling, oe = P.firstChild, ae = oe.nextSibling, ie = ae.nextSibling, J = ie.nextSibling;
        J.nextSibling;
        const ue = P.nextSibling, be = ue.nextSibling, Se = be.firstChild, G = Se.nextSibling;
        G.nextSibling;
        const Ce = be.nextSibling;
        return Ce.firstChild, u.addEventListener("mouseleave", () => qe(!1)), u.addEventListener("mouseenter", () => qe(!0)), g.$$mousemove = () => {
          $t();
        }, g.$$mousedown = (ge) => {
          ge.preventDefault(), ge.stopPropagation(), $t();
        }, m.$$click = () => Kt("limit"), C(m, () => N().shortName ?? N().name ?? N().ticker, y), C(m, () => Pt(s.price), T), P.$$click = () => Kt("stop"), C(P, () => N().shortName ?? N().name ?? N().ticker, ae), C(P, () => Pt(s.price), J), ue.$$click = () => Kt("create"), be.$$click = pn, C(be, () => Pt(s.price), G), Ce.$$click = vn, C(Ce, () => Pt(s.price), null), V((ge) => {
          const we = `${Math.max(0, s.y + 24)}px`, Pe = `${s.yAxisWidth + o1}px`;
          return we !== ge._v$33 && u.style.setProperty("top", ge._v$33 = we), Pe !== ge._v$34 && u.style.setProperty("right", ge._v$34 = Pe), ge;
        }, {
          _v$33: void 0,
          _v$34: void 0
        }), u;
      })()
    }), null), V(() => Ie(i, "data-drawing-bar-visible", Me())), o;
  })(), w(le, {
    get when() {
      return me();
    },
    get children() {
      return w(Rg, {
        get locale() {
          return e.locale;
        },
        get datafeed() {
          return e.datafeed;
        },
        onSymbolSelected: (o) => {
          Z(o);
        },
        onClose: () => {
          Ne(!1);
        }
      });
    }
  }), w(le, {
    get when() {
      return ce();
    },
    get children() {
      return w(ag, {
        get locale() {
          return e.locale;
        },
        get mainIndicators() {
          return X();
        },
        get subIndicators() {
          return pe();
        },
        onClose: () => {
          j(!1);
        },
        onMainIndicatorChange: (o) => {
          const i = [...X()];
          o.added ? (G1(n, o.name, !0, {
            id: "candle_pane"
          }), i.push(o.name), Ge(o.name, "candle_pane", "main", "add")) : (n == null || n.removeIndicator("candle_pane", o.name), i.splice(i.indexOf(o.name), 1), Ge(o.name, "candle_pane", "main", "remove")), ee(i);
        },
        onSubIndicatorChange: (o) => {
          const i = {
            ...pe()
          };
          if (o.added) {
            const s = G1(n, o.name);
            s && (i[o.name] = s, Ge(o.name, s, "sub", "add"));
          } else
            o.paneId && (n == null || n.removeIndicator(o.paneId, o.name), delete i[o.name], Ge(o.name, o.paneId, "sub", "remove"));
          H(i);
        }
      });
    }
  }), w(le, {
    get when() {
      return q();
    },
    get children() {
      return w(lg, {
        get locale() {
          return e.locale;
        },
        get timezone() {
          return se();
        },
        onClose: () => {
          ne(!1);
        },
        onConfirm: A
      });
    }
  }), w(le, {
    get when() {
      return W();
    },
    get children() {
      return w(Ng, {
        get locale() {
          return e.locale;
        },
        get currentStyles() {
          return E.clone(n.getStyles());
        },
        get defaultStyles() {
          return R();
        },
        onClose: () => {
          te(!1);
        },
        onChange: (o) => {
          jt(o), n == null || n.setStyles(o), j1();
        },
        onRestoreDefault: (o) => {
          const i = {};
          o.forEach((s) => {
            const u = s.key;
            nt(i, u, E.formatValue(R(), u));
          }), jt(i), n == null || n.setStyles(i), j1();
        }
      });
    }
  }), w(le, {
    get when() {
      return he().length > 0;
    },
    get children() {
      return w(Ig, {
        get locale() {
          return e.locale;
        },
        get url() {
          return he();
        },
        onClose: () => {
          re("");
        }
      });
    }
  }), w(le, {
    get when() {
      return I();
    },
    get children() {
      return w(cm, {
        get initialTimestamp() {
          return D();
        },
        get initialRange() {
          return F();
        },
        get anchorSettings() {
          return Le();
        },
        onClose: () => {
          Q(!1);
        },
        onGoToDate: Xo,
        onTimeRange: (o) => {
          xr(o);
        },
        onTimeAnchorChange: Jo
      });
    }
  }), w(le, {
    get when() {
      return Vt().visible;
    },
    get children() {
      return w(Ug, {
        get locale() {
          return e.locale;
        },
        get params() {
          return Vt();
        },
        onClose: () => {
          A1({
            visible: !1,
            indicatorName: "",
            paneId: "",
            calcParams: []
          });
        },
        onConfirm: (o) => {
          const i = Vt();
          n == null || n.overrideIndicator({
            name: i.indicatorName,
            calcParams: o
          }, i.paneId);
          const s = i.paneId === "candle_pane" ? "main" : "sub";
          Ge(i.indicatorName, i.paneId, s, "change");
        }
      });
    }
  }), w(le, {
    get when() {
      return Ct();
    },
    get children() {
      return w(Qg, {
        get locale() {
          return e.locale;
        },
        onIndicatorClick: () => {
          j(!0);
        },
        onTimezoneClick: () => {
          ne(!0);
        },
        onSettingClick: () => {
          te(!0);
        },
        onTimeToolsClick: () => {
          O(Date.now()), Q(!0);
        },
        onClose: () => {
          dt(!1);
        }
      });
    }
  })];
};
je(["mousedown", "click", "mousemove"]);
const Am = /* @__PURE__ */ p('<svg class="logo" viewBox="0 0 80 92"><path d="M28.148808359375,51.7280513671875L22.963588359375,51.7280513671875C21.572648359375002,51.7280513671875,20.445068359375,52.6220613671875,20.445068359375,53.7248813671875L20.445068359375,72.3979013671875C20.445068359375,73.5007013671875,21.572648359375002,74.39470136718751,22.963588359375,74.39470136718751L33.926568359375,74.39470136718751C35.317468359375,74.39470136718751,36.445068359375,73.5007013671875,36.445068359375,72.3979013671875L36.445068359375,53.7248813671875C36.445068359375,52.6220613671875,35.317468359375,51.7280513671875,33.926568359375,51.7280513671875L28.741398359374998,51.7280513671875L28.741398359374998,46.2963223671875C28.741398359374998,46.1665793671875,28.608748359375,46.0614013671875,28.445108359375,46.0614013671875C28.281468359375,46.0614013671875,28.148808359375,46.1665793671875,28.148808359375,46.2963223671875L28.148808359375,51.7280513671875ZM28.741398359374998,74.3948013671875L28.741398359374998,79.82650136718749C28.741398359374998,79.9563013671875,28.608748359375,80.0614013671875,28.445108359375,80.0614013671875C28.281468359375,80.0614013671875,28.148808359375,79.9563013671875,28.148808359375,79.82650136718749L28.148808359375,74.3948013671875L28.741398359374998,74.3948013671875Z"></path><path d="M51.148808359374996,44.7280513671875L45.963588359375,44.7280513671875C44.572648359375,44.7280513671875,43.445068359375,45.6220613671875,43.445068359375,46.7248813671875L43.445068359375,65.3979013671875C43.445068359375,66.5007013671875,44.572648359375,67.39470136718751,45.963588359375,67.39470136718751L56.926568359375,67.39470136718751C58.317468359375,67.39470136718751,59.445068359375,66.5007013671875,59.445068359375,65.3979013671875L59.445068359375,46.7248813671875C59.445068359375,45.6220613671875,58.317468359375,44.7280513671875,56.926568359375,44.7280513671875L51.741398359375,44.7280513671875L51.741398359375,39.2963223671875C51.741398359375,39.1665793671875,51.608748359375,39.0614013671875,51.445108359375,39.0614013671875C51.281468359375,39.0614013671875,51.148808359374996,39.1665793671875,51.148808359374996,39.2963223671875L51.148808359374996,44.7280513671875ZM51.741398359375,67.3948013671875L51.741398359375,72.82650136718749C51.741398359375,72.9563013671875,51.608748359375,73.0614013671875,51.445108359375,73.0614013671875C51.281468359375,73.0614013671875,51.148808359374996,72.9563013671875,51.148808359374996,72.82650136718749L51.148808359374996,67.3948013671875L51.741398359375,67.3948013671875Z"></path><path d="M17.7274,90.6541C17.5901,90.6541,17.4517,90.6436,17.3121,90.6225C9.93219,89.5095,4.80718,86.7136,2.07787,82.3084C-1.1223,77.1437,0.241766,71.6314,0.56829,70.5137C5.37624,46.647,15.0785,38.4945,21.5025,33.0957C22.9683,31.8633,24.2342,30.7995,25.1676,29.7672C25.4105,29.4984,25.6051,29.2154,25.7556,28.9202C24.7465,29.2231,24.1971,29.4326,24.1703,29.4429C22.908,29.9368,21.4777,29.3247,20.9761,28.076C20.4756,26.8272,21.0897,25.4146,22.352,24.9172C22.5042,24.8571,23.5312,24.4607,25.3073,23.9616C24.087,21.4425,21.7693,18.7949,19.7125,16.6431L19.2819,16.1902C16.2438,12.9776,14.6017,4.80159,14.3036,3.19471C14.1306,2.26212,14.4636,1.30796,15.1814,0.679657C15.8995,0.0512175,16.8976,-0.159672,17.8125,0.123747C22.7731,1.66274,24.2638,1.81255,27.2321,2.11098C28.7357,2.26195,29.83,3.59029,29.6762,5.07662C29.5236,6.56295,28.182,7.64786,26.6784,7.49454C24.4992,7.27569,22.9517,7.09896,20.724,6.56646C21.4493,9.09088,22.3803,11.5427,23.2771,12.4919L23.6876,12.9237C25.3757,14.69,28.9691,18.45,30.7016,22.7299C35.0392,21.9433,40.8791,21.3359,47.7817,21.7249C48.2004,20.7386,48.8054,19.7953,49.5907,18.9135C49.7137,18.7754,49.8498,18.6502,49.9988,18.539C53.6142,15.8508,57.5491,12.857,59.7803,11.0758C58.1028,11.2502,56.1034,11.0278,53.9124,9.70882C53.2439,9.30622,52.5992,8.89427,51.9662,8.48933C48.4668,6.25164,46.497,5.12109,43.4234,5.94853C41.9647,6.34058,40.4622,5.48975,40.0659,4.04789C39.6695,2.60604,40.5296,1.11853,41.9871,0.726471C47.5602,-0.773825,51.4796,1.73271,54.9364,3.9434L54.9364,3.9434C55.5284,4.32176,56.1318,4.70797,56.7564,5.08482C58.3843,6.06556,59.4858,5.76127,61.2899,5.13865C62.3511,4.77234,63.5567,4.35687,64.8675,4.53476C66.3321,4.73254,67.4406,5.56933,67.9103,6.83096C68.7444,9.07333,67.1035,11.5533,65.5797,13.2374C64.6729,14.2394,60.0845,17.7606,56.4519,20.4957C56.9477,20.3369,57.4767,20.2511,58.026,20.2511C59.4281,20.2511,60.6982,20.8102,61.621,21.7153C65.4948,20.6901,67.87,17.9563,67.9033,17.9175C68.78,16.8888,70.3322,16.7577,71.3721,17.6226C72.412,18.4886,72.5457,20.0253,71.6702,21.054C71.5221,21.2286,69.5063,23.5492,66.0787,25.233C69.5399,26.8822,72.9993,29.682,74.1841,34.4145C74.5106,35.7206,73.7062,37.0407,72.3859,37.3638C72.1871,37.4117,71.9884,37.4351,71.792,37.4351C70.687,37.4351,69.6826,36.6932,69.4046,35.5848C68.4378,31.7217,64.8144,29.7431,61.7619,28.7456C60.8298,29.7349,59.5009,30.3535,58.026,30.3535C55.8642,30.3535,54.0162,29.0245,53.2713,27.1474C53.2022,27.138,53.1331,27.1287,53.0642,27.1195C54.232,29.5936,57.0851,31.9259,58.1868,32.665C58.3157,32.7516,58.4423,32.8523,58.5547,32.9599C66.5865,40.6151,72.4887,48.8133,76.0971,57.3287C76.6815,58.7074,76.0249,60.2932,74.6313,60.8702C74.2976,61.01,73.9388,61.082,73.576,61.082C72.5065,61.082,71.4914,60.4582,71.0525,59.4213C67.7577,51.6455,62.331,44.1074,54.9203,37.0116C53.6073,36.1009,48.0984,31.9917,47.2065,26.583C40.9421,26.2679,35.6187,26.8278,31.6725,27.5336C31.6197,29.527,30.9225,31.5172,29.2456,33.3731C28.0614,34.6827,26.5968,35.915,25.0446,37.2188C21.9414,39.8269,18.2648,42.9169,14.8104,48.1192C11.356,53.3215,8.12389,60.6361,5.9098,71.6934C5.88732,71.8035,5.85893,71.9123,5.82344,72.0188C5.81634,72.041,4.57886,76.0413,6.77344,79.5289C8.6332,82.4828,12.4557,84.4139,18.1367,85.2705C19.6297,85.4953,20.6566,86.8762,20.4295,88.3532C20.2213,89.6944,19.0559,90.6541,17.7274,90.6541ZM35.1195,7.03101C33.3502,7.03101,31.9158,5.61208,31.9158,3.86173C31.9158,2.11139,33.3502,0.69245,35.1195,0.69245C36.8889,0.69245,38.3233,2.11139,38.3233,3.86173C38.3233,5.61208,36.8889,7.03101,35.1195,7.03101ZM57.6848,23.1892L58.414,24.4754C58.8984,24.3623,59.3923,24.3435,59.8644,24.4203C60.2191,24.5005,60.5087,24.7182,60.6663,25.0229C60.8636,25.3394,60.8993,25.7346,60.7646,26.1094C60.5988,26.5176,60.2972,26.8749,59.9085,27.1235L60.31,27.8316L59.7886,28.1294L59.3994,27.443C58.9257,27.7175,58.399,27.883,57.8664,27.9247L57.3744,27.0569C57.6378,27.0741,57.9071,27.048,58.1704,26.9797C58.4501,26.9251,58.7239,26.8323,58.9829,26.7044L58.2801,25.4647C57.8047,25.5877,57.3167,25.6065,56.8549,25.5197C56.4913,25.4263,56.196,25.1971,56.0328,24.8814C55.8433,24.5561,55.8127,24.1572,55.9484,23.7789C56.088,23.373,56.3763,23.0149,56.7584,22.7726L56.4166,22.1699L56.938,21.8721L57.2727,22.4625C57.6615,22.2376,58.0888,22.0901,58.5254,22.0301L59.0042,22.8746C58.5548,22.8828,58.103,22.9906,57.6848,23.1892ZM56.9319,24.2961Q57.1278,24.6417,57.7863,24.5856L57.1695,23.4978Q56.6982,23.884,56.9319,24.2961ZM58.9077,25.3462L59.4981,26.3875L59.499,26.3891Q59.9965,26.0045,59.7628,25.5923Q59.573,25.2576,58.9077,25.3462ZM73.2212,66.5065C73.2212,68.2569,74.6555,69.6758,76.4249,69.6758C78.1943,69.6758,79.6286,68.2569,79.6286,66.5065C79.6286,64.7562,78.1943,63.3372,76.4249,63.3372C74.6555,63.3372,73.2212,64.7562,73.2212,66.5065ZM35.9465,91.8045C35.0734,91.8045,34.2038,91.7987,33.3378,91.7858C31.827,91.7636,30.6203,90.5359,30.6428,89.0402C30.6653,87.5457,31.9158,86.3297,33.4183,86.3742C49.6344,86.6059,65.7512,84.6175,67.6134,84.037C72.1953,82.4184,74.5295,79.3603,74.5295,74.9575C74.5295,73.463,75.754,72.2517,77.2648,72.2517C78.7755,72.2517,80,73.463,80,74.9575C80,81.5992,76.148,86.7686,69.4317,89.142C67.0041,89.9999,51.0955,91.8046,35.9465,91.8045ZM25.2731,92C23.5037,92,22.0693,90.5811,22.0693,88.8307C22.0693,87.0804,23.5037,85.6615,25.2731,85.6615C27.0424,85.6615,28.4768,87.0804,28.4768,88.8307C28.4768,90.5811,27.0424,92,25.2731,92Z"></path></svg>'), Mm = Am.cloneNode(!0);
class Om {
  constructor(t) {
    g1(this, "_chartApi", null);
    if (E.isString(t.container)) {
      if (this._container = document.getElementById(t.container), !this._container)
        throw new Error("Container is null");
    } else
      this._container = t.container;
    this._container.classList.add("klinecharts-pro"), this._container.setAttribute("data-theme", t.theme ?? "light");
    const r = this;
    z9(() => w(Tm, {
      ref: (n) => {
        r._chartApi = n;
      },
      get styles() {
        return t.styles ?? {};
      },
      get watermark() {
        return t.watermark ?? Mm;
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
w9.forEach((e) => {
  l9(e);
});
export {
  Dm as DefaultDatafeed,
  Om as KLineChartPro,
  Nm as loadLocales
};
//# sourceMappingURL=klinecharts-pro.js.map
