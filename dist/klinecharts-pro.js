var Ne = Object.defineProperty;
var Pe = (e, t, n) => t in e ? Ne(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Q1 = (e, t, n) => (Pe(e, typeof t != "symbol" ? t + "" : t, n), n);
import { utils as j, OverlayMode as n9, init as Oe, FormatDateType as J1, DomPosition as r9, ActionType as Be, dispose as a9, TooltipIconPosition as W1, CandleType as Ee, YAxisType as Fe, registerOverlay as Ke } from "klinecharts";
function R1(e, t, n) {
  const r = (e.x - t.x) * Math.cos(n) - (e.y - t.y) * Math.sin(n) + t.x, a = (e.x - t.x) * Math.sin(n) + (e.y - t.y) * Math.cos(n) + t.y;
  return { x: r, y: a };
}
function A0(e, t) {
  if (e.length > 1) {
    let n;
    return e[0].x === e[1].x && e[0].y !== e[1].y ? e[0].y < e[1].y ? n = {
      x: e[0].x,
      y: t.height
    } : n = {
      x: e[0].x,
      y: 0
    } : e[0].x > e[1].x ? n = {
      x: 0,
      y: j.getLinearYFromCoordinates(e[0], e[1], { x: 0, y: e[0].y })
    } : n = {
      x: t.width,
      y: j.getLinearYFromCoordinates(e[0], e[1], { x: t.width, y: e[0].y })
    }, { coordinates: [e[0], n] };
  }
  return [];
}
function U9(e, t) {
  const n = Math.abs(e.x - t.x), r = Math.abs(e.y - t.y);
  return Math.sqrt(n * n + r * r);
}
const je = {
  name: "arrow",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = e[1].x > e[0].x ? 0 : 1, n = j.getLinearSlopeIntercept(e[0], e[1]);
      let r;
      n ? r = Math.atan(n[0]) + Math.PI * t : e[1].y > e[0].y ? r = Math.PI / 2 : r = Math.PI / 2 * 3;
      const a = R1({ x: e[1].x - 8, y: e[1].y + 4 }, e[1], r), i = R1({ x: e[1].x - 8, y: e[1].y - 4 }, e[1], r);
      return [
        {
          type: "line",
          attrs: { coordinates: e }
        },
        {
          type: "line",
          ignoreEvent: !0,
          attrs: { coordinates: [a, e[1], i] }
        }
      ];
    }
    return [];
  }
}, Ze = {
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
      const t = U9(e[0], e[1]);
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
}, Qe = {
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
}, ze = {
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
  performEventPressedMove: ({ points: e, performPointIndex: t, performPoint: n }) => {
    t < 2 && (e[0].price = n.price, e[1].price = n.price);
  },
  performEventMoveForDrawing: ({ currentStep: e, points: t, performPoint: n }) => {
    e === 2 && (t[0].price = n.price);
  }
}, Re = {
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
}, Ue = {
  name: "fibonacciCircle",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = Math.abs(e[0].x - e[1].x), n = Math.abs(e[0].y - e[1].y), r = Math.sqrt(t * t + n * n), a = [0.236, 0.382, 0.5, 0.618, 0.786, 1], i = [], o = [];
      return a.forEach((s) => {
        const l = r * s;
        i.push(
          { ...e[0], r: l }
        ), o.push({
          x: e[0].x,
          y: e[0].y + l + 6,
          text: `${(s * 100).toFixed(1)}%`
        });
      }), [
        {
          type: "circle",
          attrs: i,
          styles: { style: "stroke" }
        },
        {
          type: "text",
          ignoreEvent: !0,
          attrs: o
        }
      ];
    }
    return [];
  }
}, Ye = {
  name: "fibonacciSegment",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: n }) => {
    const r = [], a = [];
    if (e.length > 1) {
      const i = e[1].x > e[0].x ? e[0].x : e[1].x, o = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0], s = e[0].y - e[1].y, l = t.points, h = l[0].value - l[1].value;
      o.forEach((d) => {
        const p = e[1].y + s * d, $ = (l[1].value + h * d).toFixed(n.price);
        r.push({ coordinates: [{ x: e[0].x, y: p }, { x: e[1].x, y: p }] }), a.push({
          x: i,
          y: p,
          text: `${$} (${(d * 100).toFixed(1)}%)`,
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
}, He = {
  name: "fibonacciSpiral",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, bounding: t }) => {
    if (e.length > 1) {
      const n = U9(e[0], e[1]) / Math.sqrt(24), r = e[1].x > e[0].x ? 0 : 1, a = j.getLinearSlopeIntercept(e[0], e[1]);
      let i;
      a ? i = Math.atan(a[0]) + Math.PI * r : e[1].y > e[0].y ? i = Math.PI / 2 : i = Math.PI / 2 * 3;
      const o = R1(
        { x: e[0].x - n, y: e[0].y },
        e[0],
        i
      ), s = R1(
        { x: e[0].x - n, y: e[0].y - n },
        e[0],
        i
      ), l = [{
        ...o,
        r: n,
        startAngle: i,
        endAngle: i + Math.PI / 2
      }, {
        ...s,
        r: n * 2,
        startAngle: i + Math.PI / 2,
        endAngle: i + Math.PI
      }];
      let h = e[0].x - n, d = e[0].y - n;
      for (let p = 2; p < 9; p++) {
        const $ = l[p - 2].r + l[p - 1].r;
        let k = 0;
        switch (p % 4) {
          case 0: {
            k = i, h -= l[p - 2].r;
            break;
          }
          case 1: {
            k = i + Math.PI / 2, d -= l[p - 2].r;
            break;
          }
          case 2: {
            k = i + Math.PI, h += l[p - 2].r;
            break;
          }
          case 3: {
            k = i + Math.PI / 2 * 3, d += l[p - 2].r;
            break;
          }
        }
        const P = k + Math.PI / 2, Z = R1({ x: h, y: d }, e[0], i);
        l.push({
          ...Z,
          r: $,
          startAngle: k,
          endAngle: P
        });
      }
      return [
        {
          type: "arc",
          attrs: l
        },
        {
          type: "line",
          attrs: A0(e, t)
        }
      ];
    }
    return [];
  }
}, Ve = {
  name: "fibonacciSpeedResistanceFan",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, bounding: t }) => {
    const n = [];
    let r = [];
    const a = [];
    if (e.length > 1) {
      const i = e[1].x > e[0].x ? -38 : 4, o = e[1].y > e[0].y ? -2 : 20, s = e[1].x - e[0].x, l = e[1].y - e[0].y;
      [1, 0.75, 0.618, 0.5, 0.382, 0.25, 0].forEach((d) => {
        const p = e[1].x - s * d, $ = e[1].y - l * d;
        n.push({ coordinates: [{ x: p, y: e[0].y }, { x: p, y: e[1].y }] }), n.push({ coordinates: [{ x: e[0].x, y: $ }, { x: e[1].x, y: $ }] }), r = r.concat(A0([e[0], { x: p, y: e[1].y }], t)), r = r.concat(A0([e[0], { x: e[1].x, y: $ }], t)), a.unshift({
          x: e[0].x + i,
          y: $ + 10,
          text: `${d.toFixed(3)}`
        }), a.unshift({
          x: p - 18,
          y: e[0].y + o,
          text: `${d.toFixed(3)}`
        });
      });
    }
    return [
      {
        type: "line",
        attrs: n
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
}, Ge = {
  name: "fibonacciExtension",
  totalStep: 4,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: n }) => {
    const r = [], a = [];
    if (e.length > 2) {
      const i = t.points, o = i[1].value - i[0].value, s = e[1].y - e[0].y, l = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1], h = e[2].x > e[1].x ? e[1].x : e[2].x;
      l.forEach((d) => {
        const p = e[2].y + s * d, $ = (i[2].value + o * d).toFixed(n.price);
        r.push({ coordinates: [{ x: e[1].x, y: p }, { x: e[2].x, y: p }] }), a.push({
          x: h,
          y: p,
          text: `${$} (${(d * 100).toFixed(1)}%)`,
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
}, Xe = {
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
      const t = (e[1].y - e[0].y) / 4, n = e[1].x - e[0].x, r = [
        { coordinates: [e[0], { x: e[1].x, y: e[1].y - t }] },
        { coordinates: [e[0], { x: e[1].x, y: e[1].y - t * 2 }] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[1].x, y: e[0].y + t }] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[1].x, y: e[0].y + t * 2 }] },
        { coordinates: [{ ...e[0] }, { x: e[0].x + n * 0.236, y: e[1].y }] },
        { coordinates: [{ ...e[0] }, { x: e[0].x + n * 0.5, y: e[1].y }] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[0].x + n * 0.236, y: e[0].y }] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[0].x + n * 0.5, y: e[0].y }] }
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
}, Je = {
  name: "threeWaves",
  totalStep: 5,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    const t = e.map((n, r) => ({
      ...n,
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
        attrs: t
      }
    ];
  }
}, We = {
  name: "fiveWaves",
  totalStep: 7,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    const t = e.map((n, r) => ({
      ...n,
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
        attrs: t
      }
    ];
  }
}, qe = {
  name: "eightWaves",
  totalStep: 10,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    const t = e.map((n, r) => ({
      ...n,
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
        attrs: t
      }
    ];
  }
}, e5 = {
  name: "anyWaves",
  totalStep: Number.MAX_SAFE_INTEGER,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    const t = e.map((n, r) => ({
      ...n,
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
        attrs: t
      }
    ];
  }
}, t5 = {
  name: "abcd",
  totalStep: 5,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    let t = [], n = [];
    const r = ["A", "B", "C", "D"], a = e.map((i, o) => ({
      ...i,
      baseline: "bottom",
      text: `(${r[o]})`
    }));
    return e.length > 2 && (t = [e[0], e[2]], e.length > 3 && (n = [e[1], e[3]])), [
      {
        type: "line",
        attrs: { coordinates: e }
      },
      {
        type: "line",
        attrs: [{ coordinates: t }, { coordinates: n }],
        styles: { style: "dashed" }
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: a
      }
    ];
  }
}, n5 = {
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
    const n = [], r = [], a = ["X", "A", "B", "C", "D"], i = e.map((o, s) => ({
      ...o,
      baseline: "bottom",
      text: `(${a[s]})`
    }));
    return e.length > 2 && (n.push({ coordinates: [e[0], e[2]] }), r.push({ coordinates: [e[0], e[1], e[2]] }), e.length > 3 && (n.push({ coordinates: [e[1], e[3]] }), e.length > 4 && (n.push({ coordinates: [e[2], e[4]] }), r.push({ coordinates: [e[2], e[3], e[4]] })))), [
      {
        type: "line",
        attrs: { coordinates: e }
      },
      {
        type: "line",
        attrs: n,
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
        attrs: i
      }
    ];
  }
}, r5 = [
  je,
  Ze,
  Qe,
  Re,
  ze,
  Ue,
  Ye,
  He,
  Ve,
  Ge,
  Xe,
  Je,
  We,
  qe,
  e5,
  t5,
  n5
];
class Ou {
  constructor(t) {
    Q1(this, "_apiKey");
    Q1(this, "_prevSymbolMarket");
    Q1(this, "_ws");
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
  async getHistoryKLineData(t, n, r, a) {
    return await ((await (await fetch(`https://api.polygon.io/v2/aggs/ticker/${t.ticker}/range/${n.multiplier}/${n.timespan}/${r}/${a}?apiKey=${this._apiKey}`)).json()).results || []).map((s) => ({
      timestamp: s.t,
      open: s.o,
      high: s.h,
      low: s.l,
      close: s.c,
      volume: s.v,
      turnover: s.vw
    }));
  }
  subscribe(t, n, r) {
    var a, i;
    this._prevSymbolMarket !== t.market ? ((a = this._ws) == null || a.close(), this._ws = new WebSocket(`wss://delayed.polygon.io/${t.market}`), this._ws.onopen = () => {
      var o;
      (o = this._ws) == null || o.send(JSON.stringify({ action: "auth", params: this._apiKey }));
    }, this._ws.onmessage = (o) => {
      var l;
      const s = JSON.parse(o.data);
      s[0].ev === "status" ? s[0].status === "auth_success" && ((l = this._ws) == null || l.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` }))) : "sym" in s && r({
        timestamp: s.s,
        open: s.o,
        high: s.h,
        low: s.l,
        close: s.c,
        volume: s.v,
        turnover: s.vw
      });
    }) : (i = this._ws) == null || i.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` })), this._prevSymbolMarket = t.market;
  }
  unsubscribe(t, n) {
  }
}
const e1 = {};
function a5(e) {
  e1.context = e;
}
const i5 = (e, t) => e === t, w0 = Symbol("solid-proxy"), s5 = Symbol("solid-track"), a0 = {
  equals: i5
};
let Y9 = J9;
const h1 = 1, i0 = 2, H9 = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, $0 = {};
var X = null;
let L1 = null, F = null, q = null, d1 = null, O0 = 0;
function n0(e, t) {
  const n = F, r = X, a = e.length === 0, i = a ? H9 : {
    owned: null,
    cleanups: null,
    context: null,
    owner: t === void 0 ? r : t
  }, o = a ? e : () => e(() => C1(() => h0(i)));
  X = i, F = null;
  try {
    return p1(o, !0);
  } finally {
    F = n, X = r;
  }
}
function A(e, t) {
  t = t ? Object.assign({}, a0, t) : a0;
  const n = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, r = (a) => (typeof a == "function" && (a = a(n.value)), X9(n, a));
  return [G9.bind(n), r];
}
function i9(e, t, n) {
  const r = C0(e, t, !0, h1);
  M1(r);
}
function G(e, t, n) {
  const r = C0(e, t, !1, h1);
  M1(r);
}
function f1(e, t, n) {
  Y9 = d5;
  const r = C0(e, t, !1, h1);
  r.user = !0, d1 ? d1.push(r) : M1(r);
}
function Y(e, t, n) {
  n = n ? Object.assign({}, a0, n) : a0;
  const r = C0(e, t, !0, 0);
  return r.observers = null, r.observerSlots = null, r.comparator = n.equals || void 0, M1(r), G9.bind(r);
}
function o5(e, t, n) {
  let r, a, i;
  arguments.length === 2 && typeof t == "object" || arguments.length === 1 ? (r = !0, a = e, i = t || {}) : (r = e, a = t, i = n || {});
  let o = null, s = $0, l = null, h = !1, d = "initialValue" in i, p = typeof r == "function" && Y(r);
  const $ = /* @__PURE__ */ new Set(), [k, P] = (i.storage || A)(i.initialValue), [Z, z] = A(void 0), [N, H] = A(void 0, {
    equals: !1
  }), [O, S] = A(d ? "ready" : "unresolved");
  if (e1.context) {
    l = `${e1.context.id}${e1.context.count++}`;
    let T;
    i.ssrLoadFrom === "initial" ? s = i.initialValue : e1.load && (T = e1.load(l)) && (s = T[0]);
  }
  function M(T, K, R, u1) {
    return o === T && (o = null, d = !0, (T === s || K === s) && i.onHydrated && queueMicrotask(() => i.onHydrated(u1, {
      value: K
    })), s = $0, Q(K, R)), K;
  }
  function Q(T, K) {
    p1(() => {
      K === void 0 && P(() => T), S(K !== void 0 ? "errored" : "ready"), z(K);
      for (const R of $.keys())
        R.decrement();
      $.clear();
    }, !1);
  }
  function t1() {
    const T = l5, K = k(), R = Z();
    if (R !== void 0 && !o)
      throw R;
    return F && !F.user && T && i9(() => {
      N(), o && (T.resolved || $.has(T) || (T.increment(), $.add(T)));
    }), K;
  }
  function l1(T = !0) {
    if (T !== !1 && h)
      return;
    h = !1;
    const K = p ? p() : r;
    if (K == null || K === !1) {
      M(o, C1(k));
      return;
    }
    const R = s !== $0 ? s : C1(() => a(K, {
      value: k(),
      refetching: T
    }));
    return typeof R != "object" || !(R && "then" in R) ? (M(o, R, void 0, K), R) : (o = R, h = !0, queueMicrotask(() => h = !1), p1(() => {
      S(d ? "refreshing" : "pending"), H();
    }, !1), R.then((u1) => M(R, u1, void 0, K), (u1) => M(R, void 0, q9(u1), K)));
  }
  return Object.defineProperties(t1, {
    state: {
      get: () => O()
    },
    error: {
      get: () => Z()
    },
    loading: {
      get() {
        const T = O();
        return T === "pending" || T === "refreshing";
      }
    },
    latest: {
      get() {
        if (!d)
          return t1();
        const T = Z();
        if (T && !o)
          throw T;
        return k();
      }
    }
  }), p ? i9(() => l1(!1)) : l1(!1), [t1, {
    refetch: l1,
    mutate: P
  }];
}
function C1(e) {
  if (F === null)
    return e();
  const t = F;
  F = null;
  try {
    return e();
  } finally {
    F = t;
  }
}
function V9(e) {
  f1(() => C1(e));
}
function B0(e) {
  return X === null || (X.cleanups === null ? X.cleanups = [e] : X.cleanups.push(e)), e;
}
function c5(e) {
  const t = F, n = X;
  return Promise.resolve().then(() => {
    F = t, X = n;
    let r;
    return p1(e, !1), F = X = null, r ? r.done : void 0;
  });
}
let l5;
function G9() {
  const e = L1;
  if (this.sources && (this.state || e))
    if (this.state === h1 || e)
      M1(this);
    else {
      const t = q;
      q = null, p1(() => o0(this), !1), q = t;
    }
  if (F) {
    const t = this.observers ? this.observers.length : 0;
    F.sources ? (F.sources.push(this), F.sourceSlots.push(t)) : (F.sources = [this], F.sourceSlots = [t]), this.observers ? (this.observers.push(F), this.observerSlots.push(F.sources.length - 1)) : (this.observers = [F], this.observerSlots = [F.sources.length - 1]);
  }
  return this.value;
}
function X9(e, t, n) {
  let r = e.value;
  return (!e.comparator || !e.comparator(r, t)) && (e.value = t, e.observers && e.observers.length && p1(() => {
    for (let a = 0; a < e.observers.length; a += 1) {
      const i = e.observers[a], o = L1 && L1.running;
      o && L1.disposed.has(i), (o && !i.tState || !o && !i.state) && (i.pure ? q.push(i) : d1.push(i), i.observers && W9(i)), o || (i.state = h1);
    }
    if (q.length > 1e6)
      throw q = [], new Error();
  }, !1)), t;
}
function M1(e) {
  if (!e.fn)
    return;
  h0(e);
  const t = X, n = F, r = O0;
  F = X = e, u5(e, e.value, r), F = n, X = t;
}
function u5(e, t, n) {
  let r;
  try {
    r = e.fn(t);
  } catch (a) {
    e.pure && (e.state = h1, e.owned && e.owned.forEach(h0), e.owned = null), ee(a);
  }
  (!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && "observers" in e ? X9(e, r) : e.value = r, e.updatedAt = n);
}
function C0(e, t, n, r = h1, a) {
  const i = {
    fn: e,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: X,
    context: null,
    pure: n
  };
  return X === null || X !== H9 && (X.owned ? X.owned.push(i) : X.owned = [i]), i;
}
function s0(e) {
  const t = L1;
  if (e.state === 0 || t)
    return;
  if (e.state === i0 || t)
    return o0(e);
  if (e.suspense && C1(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const n = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < O0); )
    (e.state || t) && n.push(e);
  for (let r = n.length - 1; r >= 0; r--)
    if (e = n[r], e.state === h1 || t)
      M1(e);
    else if (e.state === i0 || t) {
      const a = q;
      q = null, p1(() => o0(e, n[0]), !1), q = a;
    }
}
function p1(e, t) {
  if (q)
    return e();
  let n = !1;
  t || (q = []), d1 ? n = !0 : d1 = [], O0++;
  try {
    const r = e();
    return f5(n), r;
  } catch (r) {
    n || (d1 = null), q = null, ee(r);
  }
}
function f5(e) {
  if (q && (J9(q), q = null), e)
    return;
  const t = d1;
  d1 = null, t.length && p1(() => Y9(t), !1);
}
function J9(e) {
  for (let t = 0; t < e.length; t++)
    s0(e[t]);
}
function d5(e) {
  let t, n = 0;
  for (t = 0; t < e.length; t++) {
    const r = e[t];
    r.user ? e[n++] = r : s0(r);
  }
  for (e1.context && a5(), t = 0; t < n; t++)
    s0(e[t]);
}
function o0(e, t) {
  const n = L1;
  e.state = 0;
  for (let r = 0; r < e.sources.length; r += 1) {
    const a = e.sources[r];
    a.sources && (a.state === h1 || n ? a !== t && s0(a) : (a.state === i0 || n) && o0(a, t));
  }
}
function W9(e) {
  const t = L1;
  for (let n = 0; n < e.observers.length; n += 1) {
    const r = e.observers[n];
    (!r.state || t) && (r.state = i0, r.pure ? q.push(r) : d1.push(r), r.observers && W9(r));
  }
}
function h0(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const n = e.sources.pop(), r = e.sourceSlots.pop(), a = n.observers;
      if (a && a.length) {
        const i = a.pop(), o = n.observerSlots.pop();
        r < a.length && (i.sourceSlots[o] = r, a[r] = i, n.observerSlots[r] = o);
      }
    }
  if (e.owned) {
    for (t = 0; t < e.owned.length; t++)
      h0(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = 0; t < e.cleanups.length; t++)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function q9(e) {
  return e instanceof Error || typeof e == "string" ? e : new Error("Unknown error");
}
function ee(e) {
  throw e = q9(e), e;
}
const C5 = Symbol("fallback");
function s9(e) {
  for (let t = 0; t < e.length; t++)
    e[t]();
}
function h5(e, t, n = {}) {
  let r = [], a = [], i = [], o = 0, s = t.length > 1 ? [] : null;
  return B0(() => s9(i)), () => {
    let l = e() || [], h, d;
    return l[s5], C1(() => {
      let $ = l.length, k, P, Z, z, N, H, O, S, M;
      if ($ === 0)
        o !== 0 && (s9(i), i = [], r = [], a = [], o = 0, s && (s = [])), n.fallback && (r = [C5], a[0] = n0((Q) => (i[0] = Q, n.fallback())), o = 1);
      else if (o === 0) {
        for (a = new Array($), d = 0; d < $; d++)
          r[d] = l[d], a[d] = n0(p);
        o = $;
      } else {
        for (Z = new Array($), z = new Array($), s && (N = new Array($)), H = 0, O = Math.min(o, $); H < O && r[H] === l[H]; H++)
          ;
        for (O = o - 1, S = $ - 1; O >= H && S >= H && r[O] === l[S]; O--, S--)
          Z[S] = a[O], z[S] = i[O], s && (N[S] = s[O]);
        for (k = /* @__PURE__ */ new Map(), P = new Array(S + 1), d = S; d >= H; d--)
          M = l[d], h = k.get(M), P[d] = h === void 0 ? -1 : h, k.set(M, d);
        for (h = H; h <= O; h++)
          M = r[h], d = k.get(M), d !== void 0 && d !== -1 ? (Z[d] = a[h], z[d] = i[h], s && (N[d] = s[h]), d = P[d], k.set(M, d)) : i[h]();
        for (d = H; d < $; d++)
          d in Z ? (a[d] = Z[d], i[d] = z[d], s && (s[d] = N[d], s[d](d))) : a[d] = n0(p);
        a = a.slice(0, o = $), r = l.slice(0);
      }
      return a;
    });
    function p($) {
      if (i[d] = $, s) {
        const [k, P] = A(d);
        return s[d] = P, t(l[d], k);
      }
      return t(l[d]);
    }
  };
}
function m(e, t) {
  return C1(() => e(t || {}));
}
function q1() {
  return !0;
}
const g5 = {
  get(e, t, n) {
    return t === w0 ? n : e.get(t);
  },
  has(e, t) {
    return t === w0 ? !0 : e.has(t);
  },
  set: q1,
  deleteProperty: q1,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: q1,
      deleteProperty: q1
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function b0(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function te(...e) {
  let t = !1;
  for (let r = 0; r < e.length; r++) {
    const a = e[r];
    t = t || !!a && w0 in a, e[r] = typeof a == "function" ? (t = !0, Y(a)) : a;
  }
  if (t)
    return new Proxy({
      get(r) {
        for (let a = e.length - 1; a >= 0; a--) {
          const i = b0(e[a])[r];
          if (i !== void 0)
            return i;
        }
      },
      has(r) {
        for (let a = e.length - 1; a >= 0; a--)
          if (r in b0(e[a]))
            return !0;
        return !1;
      },
      keys() {
        const r = [];
        for (let a = 0; a < e.length; a++)
          r.push(...Object.keys(b0(e[a])));
        return [...new Set(r)];
      }
    }, g5);
  const n = {};
  for (let r = e.length - 1; r >= 0; r--)
    if (e[r]) {
      const a = Object.getOwnPropertyDescriptors(e[r]);
      for (const i in a)
        i in n || Object.defineProperty(n, i, {
          enumerable: !0,
          get() {
            for (let o = e.length - 1; o >= 0; o--) {
              const s = (e[o] || {})[i];
              if (s !== void 0)
                return s;
            }
          }
        });
    }
  return n;
}
function y5(e) {
  const t = "fallback" in e && {
    fallback: () => e.fallback
  };
  return Y(h5(() => e.each, e.children, t || void 0));
}
function W(e) {
  let t = !1;
  const n = e.keyed, r = Y(() => e.when, void 0, {
    equals: (a, i) => t ? a === i : !a == !i
  });
  return Y(() => {
    const a = r();
    if (a) {
      const i = e.children, o = typeof i == "function" && i.length > 0;
      return t = n || o, o ? C1(() => i(a)) : i;
    }
    return e.fallback;
  }, void 0, void 0);
}
function p5(e, t, n) {
  let r = n.length, a = t.length, i = r, o = 0, s = 0, l = t[a - 1].nextSibling, h = null;
  for (; o < a || s < i; ) {
    if (t[o] === n[s]) {
      o++, s++;
      continue;
    }
    for (; t[a - 1] === n[i - 1]; )
      a--, i--;
    if (a === o) {
      const d = i < r ? s ? n[s - 1].nextSibling : n[i - s] : l;
      for (; s < i; )
        e.insertBefore(n[s++], d);
    } else if (i === s)
      for (; o < a; )
        (!h || !h.has(t[o])) && t[o].remove(), o++;
    else if (t[o] === n[i - 1] && n[s] === t[a - 1]) {
      const d = t[--a].nextSibling;
      e.insertBefore(n[s++], t[o++].nextSibling), e.insertBefore(n[--i], d), t[a] = n[i];
    } else {
      if (!h) {
        h = /* @__PURE__ */ new Map();
        let p = s;
        for (; p < i; )
          h.set(n[p], p++);
      }
      const d = h.get(t[o]);
      if (d != null)
        if (s < d && d < i) {
          let p = o, $ = 1, k;
          for (; ++p < a && p < i && !((k = h.get(t[p])) == null || k !== d + $); )
            $++;
          if ($ > d - s) {
            const P = t[o];
            for (; s < d; )
              e.insertBefore(n[s++], P);
          } else
            e.replaceChild(n[s++], t[o++]);
        } else
          o++;
      else
        t[o++].remove();
    }
  }
}
const o9 = "_$DX_DELEGATE";
function m5(e, t, n, r = {}) {
  let a;
  return n0((i) => {
    a = i, t === document ? e() : L(t, e(), t.firstChild ? null : void 0, n);
  }, r.owner), () => {
    a(), t.textContent = "";
  };
}
function y(e, t, n) {
  const r = document.createElement("template");
  r.innerHTML = e;
  let a = r.content.firstChild;
  return n && (a = a.firstChild), a;
}
function o1(e, t = window.document) {
  const n = t[o9] || (t[o9] = /* @__PURE__ */ new Set());
  for (let r = 0, a = e.length; r < a; r++) {
    const i = e[r];
    n.has(i) || (n.add(i), t.addEventListener(i, v5));
  }
}
function r1(e, t, n) {
  n == null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function $1(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function y1(e, t, n, r) {
  if (r)
    Array.isArray(n) ? (e[`$$${t}`] = n[0], e[`$$${t}Data`] = n[1]) : e[`$$${t}`] = n;
  else if (Array.isArray(n)) {
    const a = n[0];
    e.addEventListener(t, n[0] = (i) => a.call(e, n[1], i));
  } else
    e.addEventListener(t, n);
}
function S1(e, t, n) {
  if (!t)
    return n ? r1(e, "style") : t;
  const r = e.style;
  if (typeof t == "string")
    return r.cssText = t;
  typeof n == "string" && (r.cssText = n = void 0), n || (n = {}), t || (t = {});
  let a, i;
  for (i in n)
    t[i] == null && r.removeProperty(i), delete n[i];
  for (i in t)
    a = t[i], a !== n[i] && (r.setProperty(i, a), n[i] = a);
  return n;
}
function E0(e, t, n) {
  return C1(() => e(t, n));
}
function L(e, t, n, r) {
  if (n !== void 0 && !r && (r = []), typeof t != "function")
    return c0(e, t, r, n);
  G((a) => c0(e, t(), a, n), r);
}
function v5(e) {
  const t = `$$${e.type}`;
  let n = e.composedPath && e.composedPath()[0] || e.target;
  for (e.target !== n && Object.defineProperty(e, "target", {
    configurable: !0,
    value: n
  }), Object.defineProperty(e, "currentTarget", {
    configurable: !0,
    get() {
      return n || document;
    }
  }), e1.registry && !e1.done && (e1.done = !0, document.querySelectorAll("[id^=pl-]").forEach((r) => {
    for (; r && r.nodeType !== 8 && r.nodeValue !== "pl-" + e; ) {
      let a = r.nextSibling;
      r.remove(), r = a;
    }
    r && r.remove();
  })); n; ) {
    const r = n[t];
    if (r && !n.disabled) {
      const a = n[`${t}Data`];
      if (a !== void 0 ? r.call(n, a, e) : r.call(n, e), e.cancelBubble)
        return;
    }
    n = n._$host || n.parentNode || n.host;
  }
}
function c0(e, t, n, r, a) {
  for (e1.context && !n && (n = [...e.childNodes]); typeof n == "function"; )
    n = n();
  if (t === n)
    return n;
  const i = typeof t, o = r !== void 0;
  if (e = o && n[0] && n[0].parentNode || e, i === "string" || i === "number") {
    if (e1.context)
      return n;
    if (i === "number" && (t = t.toString()), o) {
      let s = n[0];
      s && s.nodeType === 3 ? s.data = t : s = document.createTextNode(t), n = w1(e, n, r, s);
    } else
      n !== "" && typeof n == "string" ? n = e.firstChild.data = t : n = e.textContent = t;
  } else if (t == null || i === "boolean") {
    if (e1.context)
      return n;
    n = w1(e, n, r);
  } else {
    if (i === "function")
      return G(() => {
        let s = t();
        for (; typeof s == "function"; )
          s = s();
        n = c0(e, s, n, r);
      }), () => n;
    if (Array.isArray(t)) {
      const s = [], l = n && Array.isArray(n);
      if (M0(s, t, n, a))
        return G(() => n = c0(e, s, n, r, !0)), () => n;
      if (e1.context) {
        if (!s.length)
          return n;
        for (let h = 0; h < s.length; h++)
          if (s[h].parentNode)
            return n = s;
      }
      if (s.length === 0) {
        if (n = w1(e, n, r), o)
          return n;
      } else
        l ? n.length === 0 ? c9(e, s, r) : p5(e, n, s) : (n && w1(e), c9(e, s));
      n = s;
    } else if (t instanceof Node) {
      if (e1.context && t.parentNode)
        return n = o ? [t] : t;
      if (Array.isArray(n)) {
        if (o)
          return n = w1(e, n, r, t);
        w1(e, n, null, t);
      } else
        n == null || n === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      n = t;
    }
  }
  return n;
}
function M0(e, t, n, r) {
  let a = !1;
  for (let i = 0, o = t.length; i < o; i++) {
    let s = t[i], l = n && n[i];
    if (s instanceof Node)
      e.push(s);
    else if (!(s == null || s === !0 || s === !1))
      if (Array.isArray(s))
        a = M0(e, s, l) || a;
      else if (typeof s == "function")
        if (r) {
          for (; typeof s == "function"; )
            s = s();
          a = M0(e, Array.isArray(s) ? s : [s], Array.isArray(l) ? l : [l]) || a;
        } else
          e.push(s), a = !0;
      else {
        const h = String(s);
        l && l.nodeType === 3 && l.data === h ? e.push(l) : e.push(document.createTextNode(h));
      }
  }
  return a;
}
function c9(e, t, n = null) {
  for (let r = 0, a = t.length; r < a; r++)
    e.insertBefore(t[r], n);
}
function w1(e, t, n, r) {
  if (n === void 0)
    return e.textContent = "";
  const a = r || document.createTextNode("");
  if (t.length) {
    let i = !1;
    for (let o = t.length - 1; o >= 0; o--) {
      const s = t[o];
      if (a !== s) {
        const l = s.parentNode === e;
        !i && !o ? l ? e.replaceChild(a, s) : e.insertBefore(a, n) : l && s.remove();
      } else
        i = !0;
    }
  } else
    e.insertBefore(a, n);
  return [a];
}
var e0 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ne(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var _5 = typeof e0 == "object" && e0 && e0.Object === Object && e0, re = _5, L5 = re, $5 = typeof self == "object" && self && self.Object === Object && self, b5 = L5 || $5 || Function("return this")(), c1 = b5, x5 = c1, k5 = x5.Symbol, g0 = k5, l9 = g0, ae = Object.prototype, A5 = ae.hasOwnProperty, w5 = ae.toString, z1 = l9 ? l9.toStringTag : void 0;
function M5(e) {
  var t = A5.call(e, z1), n = e[z1];
  try {
    e[z1] = void 0;
    var r = !0;
  } catch {
  }
  var a = w5.call(e);
  return r && (t ? e[z1] = n : delete e[z1]), a;
}
var S5 = M5, T5 = Object.prototype, I5 = T5.toString;
function D5(e) {
  return I5.call(e);
}
var N5 = D5, u9 = g0, P5 = S5, O5 = N5, B5 = "[object Null]", E5 = "[object Undefined]", f9 = u9 ? u9.toStringTag : void 0;
function F5(e) {
  return e == null ? e === void 0 ? E5 : B5 : f9 && f9 in Object(e) ? P5(e) : O5(e);
}
var U1 = F5;
function K5(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var T1 = K5, j5 = U1, Z5 = T1, Q5 = "[object AsyncFunction]", z5 = "[object Function]", R5 = "[object GeneratorFunction]", U5 = "[object Proxy]";
function Y5(e) {
  if (!Z5(e))
    return !1;
  var t = j5(e);
  return t == z5 || t == R5 || t == Q5 || t == U5;
}
var ie = Y5, H5 = c1, V5 = H5["__core-js_shared__"], G5 = V5, x0 = G5, d9 = function() {
  var e = /[^.]+$/.exec(x0 && x0.keys && x0.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function X5(e) {
  return !!d9 && d9 in e;
}
var J5 = X5, W5 = Function.prototype, q5 = W5.toString;
function e6(e) {
  if (e != null) {
    try {
      return q5.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var se = e6, t6 = ie, n6 = J5, r6 = T1, a6 = se, i6 = /[\\^$.*+?()[\]{}|]/g, s6 = /^\[object .+?Constructor\]$/, o6 = Function.prototype, c6 = Object.prototype, l6 = o6.toString, u6 = c6.hasOwnProperty, f6 = RegExp(
  "^" + l6.call(u6).replace(i6, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function d6(e) {
  if (!r6(e) || n6(e))
    return !1;
  var t = t6(e) ? f6 : s6;
  return t.test(a6(e));
}
var C6 = d6;
function h6(e, t) {
  return e == null ? void 0 : e[t];
}
var g6 = h6, y6 = C6, p6 = g6;
function m6(e, t) {
  var n = p6(e, t);
  return y6(n) ? n : void 0;
}
var b1 = m6, v6 = b1, _6 = function() {
  try {
    var e = v6(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), L6 = _6, C9 = L6;
function $6(e, t, n) {
  t == "__proto__" && C9 ? C9(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
var oe = $6;
function b6(e, t) {
  return e === t || e !== e && t !== t;
}
var ce = b6, x6 = oe, k6 = ce, A6 = Object.prototype, w6 = A6.hasOwnProperty;
function M6(e, t, n) {
  var r = e[t];
  (!(w6.call(e, t) && k6(r, n)) || n === void 0 && !(t in e)) && x6(e, t, n);
}
var F0 = M6, S6 = Array.isArray, I1 = S6;
function T6(e) {
  return e != null && typeof e == "object";
}
var D1 = T6, I6 = U1, D6 = D1, N6 = "[object Symbol]";
function P6(e) {
  return typeof e == "symbol" || D6(e) && I6(e) == N6;
}
var K0 = P6, O6 = I1, B6 = K0, E6 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, F6 = /^\w*$/;
function K6(e, t) {
  if (O6(e))
    return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || B6(e) ? !0 : F6.test(e) || !E6.test(e) || t != null && e in Object(t);
}
var j6 = K6, Z6 = b1, Q6 = Z6(Object, "create"), y0 = Q6, h9 = y0;
function z6() {
  this.__data__ = h9 ? h9(null) : {}, this.size = 0;
}
var R6 = z6;
function U6(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var Y6 = U6, H6 = y0, V6 = "__lodash_hash_undefined__", G6 = Object.prototype, X6 = G6.hasOwnProperty;
function J6(e) {
  var t = this.__data__;
  if (H6) {
    var n = t[e];
    return n === V6 ? void 0 : n;
  }
  return X6.call(t, e) ? t[e] : void 0;
}
var W6 = J6, q6 = y0, e2 = Object.prototype, t2 = e2.hasOwnProperty;
function n2(e) {
  var t = this.__data__;
  return q6 ? t[e] !== void 0 : t2.call(t, e);
}
var r2 = n2, a2 = y0, i2 = "__lodash_hash_undefined__";
function s2(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = a2 && t === void 0 ? i2 : t, this;
}
var o2 = s2, c2 = R6, l2 = Y6, u2 = W6, f2 = r2, d2 = o2;
function N1(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
N1.prototype.clear = c2;
N1.prototype.delete = l2;
N1.prototype.get = u2;
N1.prototype.has = f2;
N1.prototype.set = d2;
var C2 = N1;
function h2() {
  this.__data__ = [], this.size = 0;
}
var g2 = h2, y2 = ce;
function p2(e, t) {
  for (var n = e.length; n--; )
    if (y2(e[n][0], t))
      return n;
  return -1;
}
var p0 = p2, m2 = p0, v2 = Array.prototype, _2 = v2.splice;
function L2(e) {
  var t = this.__data__, n = m2(t, e);
  if (n < 0)
    return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : _2.call(t, n, 1), --this.size, !0;
}
var $2 = L2, b2 = p0;
function x2(e) {
  var t = this.__data__, n = b2(t, e);
  return n < 0 ? void 0 : t[n][1];
}
var k2 = x2, A2 = p0;
function w2(e) {
  return A2(this.__data__, e) > -1;
}
var M2 = w2, S2 = p0;
function T2(e, t) {
  var n = this.__data__, r = S2(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
}
var I2 = T2, D2 = g2, N2 = $2, P2 = k2, O2 = M2, B2 = I2;
function P1(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
P1.prototype.clear = D2;
P1.prototype.delete = N2;
P1.prototype.get = P2;
P1.prototype.has = O2;
P1.prototype.set = B2;
var m0 = P1, E2 = b1, F2 = c1, K2 = E2(F2, "Map"), j0 = K2, g9 = C2, j2 = m0, Z2 = j0;
function Q2() {
  this.size = 0, this.__data__ = {
    hash: new g9(),
    map: new (Z2 || j2)(),
    string: new g9()
  };
}
var z2 = Q2;
function R2(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var U2 = R2, Y2 = U2;
function H2(e, t) {
  var n = e.__data__;
  return Y2(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
var v0 = H2, V2 = v0;
function G2(e) {
  var t = V2(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var X2 = G2, J2 = v0;
function W2(e) {
  return J2(this, e).get(e);
}
var q2 = W2, e3 = v0;
function t3(e) {
  return e3(this, e).has(e);
}
var n3 = t3, r3 = v0;
function a3(e, t) {
  var n = r3(this, e), r = n.size;
  return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
}
var i3 = a3, s3 = z2, o3 = X2, c3 = q2, l3 = n3, u3 = i3;
function O1(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
O1.prototype.clear = s3;
O1.prototype.delete = o3;
O1.prototype.get = c3;
O1.prototype.has = l3;
O1.prototype.set = u3;
var le = O1, ue = le, f3 = "Expected a function";
function Z0(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(f3);
  var n = function() {
    var r = arguments, a = t ? t.apply(this, r) : r[0], i = n.cache;
    if (i.has(a))
      return i.get(a);
    var o = e.apply(this, r);
    return n.cache = i.set(a, o) || i, o;
  };
  return n.cache = new (Z0.Cache || ue)(), n;
}
Z0.Cache = ue;
var d3 = Z0, C3 = d3, h3 = 500;
function g3(e) {
  var t = C3(e, function(r) {
    return n.size === h3 && n.clear(), r;
  }), n = t.cache;
  return t;
}
var y3 = g3, p3 = y3, m3 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, v3 = /\\(\\)?/g, _3 = p3(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(m3, function(n, r, a, i) {
    t.push(a ? i.replace(v3, "$1") : r || n);
  }), t;
}), L3 = _3;
function $3(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, a = Array(r); ++n < r; )
    a[n] = t(e[n], n, e);
  return a;
}
var b3 = $3, y9 = g0, x3 = b3, k3 = I1, A3 = K0, w3 = 1 / 0, p9 = y9 ? y9.prototype : void 0, m9 = p9 ? p9.toString : void 0;
function fe(e) {
  if (typeof e == "string")
    return e;
  if (k3(e))
    return x3(e, fe) + "";
  if (A3(e))
    return m9 ? m9.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -w3 ? "-0" : t;
}
var M3 = fe, S3 = M3;
function T3(e) {
  return e == null ? "" : S3(e);
}
var I3 = T3, D3 = I1, N3 = j6, P3 = L3, O3 = I3;
function B3(e, t) {
  return D3(e) ? e : N3(e, t) ? [e] : P3(O3(e));
}
var E3 = B3, F3 = 9007199254740991, K3 = /^(?:0|[1-9]\d*)$/;
function j3(e, t) {
  var n = typeof e;
  return t = t ?? F3, !!t && (n == "number" || n != "symbol" && K3.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var de = j3, Z3 = K0, Q3 = 1 / 0;
function z3(e) {
  if (typeof e == "string" || Z3(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -Q3 ? "-0" : t;
}
var R3 = z3, U3 = F0, Y3 = E3, H3 = de, v9 = T1, V3 = R3;
function G3(e, t, n, r) {
  if (!v9(e))
    return e;
  t = Y3(t, e);
  for (var a = -1, i = t.length, o = i - 1, s = e; s != null && ++a < i; ) {
    var l = V3(t[a]), h = n;
    if (l === "__proto__" || l === "constructor" || l === "prototype")
      return e;
    if (a != o) {
      var d = s[l];
      h = r ? r(d, l, s) : void 0, h === void 0 && (h = v9(d) ? d : H3(t[a + 1]) ? [] : {});
    }
    U3(s, l, h), s = s[l];
  }
  return e;
}
var X3 = G3, J3 = X3;
function W3(e, t, n) {
  return e == null ? e : J3(e, t, n);
}
var q3 = W3;
const S0 = /* @__PURE__ */ ne(q3);
var e8 = m0;
function t8() {
  this.__data__ = new e8(), this.size = 0;
}
var n8 = t8;
function r8(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
var a8 = r8;
function i8(e) {
  return this.__data__.get(e);
}
var s8 = i8;
function o8(e) {
  return this.__data__.has(e);
}
var c8 = o8, l8 = m0, u8 = j0, f8 = le, d8 = 200;
function C8(e, t) {
  var n = this.__data__;
  if (n instanceof l8) {
    var r = n.__data__;
    if (!u8 || r.length < d8 - 1)
      return r.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new f8(r);
  }
  return n.set(e, t), this.size = n.size, this;
}
var h8 = C8, g8 = m0, y8 = n8, p8 = a8, m8 = s8, v8 = c8, _8 = h8;
function B1(e) {
  var t = this.__data__ = new g8(e);
  this.size = t.size;
}
B1.prototype.clear = y8;
B1.prototype.delete = p8;
B1.prototype.get = m8;
B1.prototype.has = v8;
B1.prototype.set = _8;
var L8 = B1;
function $8(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r && t(e[n], n, e) !== !1; )
    ;
  return e;
}
var b8 = $8, x8 = F0, k8 = oe;
function A8(e, t, n, r) {
  var a = !n;
  n || (n = {});
  for (var i = -1, o = t.length; ++i < o; ) {
    var s = t[i], l = r ? r(n[s], e[s], s, n, e) : void 0;
    l === void 0 && (l = e[s]), a ? k8(n, s, l) : x8(n, s, l);
  }
  return n;
}
var _0 = A8;
function w8(e, t) {
  for (var n = -1, r = Array(e); ++n < e; )
    r[n] = t(n);
  return r;
}
var M8 = w8, S8 = U1, T8 = D1, I8 = "[object Arguments]";
function D8(e) {
  return T8(e) && S8(e) == I8;
}
var N8 = D8, _9 = N8, P8 = D1, Ce = Object.prototype, O8 = Ce.hasOwnProperty, B8 = Ce.propertyIsEnumerable, E8 = _9(function() {
  return arguments;
}()) ? _9 : function(e) {
  return P8(e) && O8.call(e, "callee") && !B8.call(e, "callee");
}, F8 = E8, l0 = { exports: {} };
function K8() {
  return !1;
}
var j8 = K8;
l0.exports;
(function(e, t) {
  var n = c1, r = j8, a = t && !t.nodeType && t, i = a && !0 && e && !e.nodeType && e, o = i && i.exports === a, s = o ? n.Buffer : void 0, l = s ? s.isBuffer : void 0, h = l || r;
  e.exports = h;
})(l0, l0.exports);
var he = l0.exports, Z8 = 9007199254740991;
function Q8(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Z8;
}
var ge = Q8, z8 = U1, R8 = ge, U8 = D1, Y8 = "[object Arguments]", H8 = "[object Array]", V8 = "[object Boolean]", G8 = "[object Date]", X8 = "[object Error]", J8 = "[object Function]", W8 = "[object Map]", q8 = "[object Number]", e7 = "[object Object]", t7 = "[object RegExp]", n7 = "[object Set]", r7 = "[object String]", a7 = "[object WeakMap]", i7 = "[object ArrayBuffer]", s7 = "[object DataView]", o7 = "[object Float32Array]", c7 = "[object Float64Array]", l7 = "[object Int8Array]", u7 = "[object Int16Array]", f7 = "[object Int32Array]", d7 = "[object Uint8Array]", C7 = "[object Uint8ClampedArray]", h7 = "[object Uint16Array]", g7 = "[object Uint32Array]", E = {};
E[o7] = E[c7] = E[l7] = E[u7] = E[f7] = E[d7] = E[C7] = E[h7] = E[g7] = !0;
E[Y8] = E[H8] = E[i7] = E[V8] = E[s7] = E[G8] = E[X8] = E[J8] = E[W8] = E[q8] = E[e7] = E[t7] = E[n7] = E[r7] = E[a7] = !1;
function y7(e) {
  return U8(e) && R8(e.length) && !!E[z8(e)];
}
var p7 = y7;
function m7(e) {
  return function(t) {
    return e(t);
  };
}
var Q0 = m7, u0 = { exports: {} };
u0.exports;
(function(e, t) {
  var n = re, r = t && !t.nodeType && t, a = r && !0 && e && !e.nodeType && e, i = a && a.exports === r, o = i && n.process, s = function() {
    try {
      var l = a && a.require && a.require("util").types;
      return l || o && o.binding && o.binding("util");
    } catch {
    }
  }();
  e.exports = s;
})(u0, u0.exports);
var z0 = u0.exports, v7 = p7, _7 = Q0, L9 = z0, $9 = L9 && L9.isTypedArray, L7 = $9 ? _7($9) : v7, $7 = L7, b7 = M8, x7 = F8, k7 = I1, A7 = he, w7 = de, M7 = $7, S7 = Object.prototype, T7 = S7.hasOwnProperty;
function I7(e, t) {
  var n = k7(e), r = !n && x7(e), a = !n && !r && A7(e), i = !n && !r && !a && M7(e), o = n || r || a || i, s = o ? b7(e.length, String) : [], l = s.length;
  for (var h in e)
    (t || T7.call(e, h)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (h == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    a && (h == "offset" || h == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (h == "buffer" || h == "byteLength" || h == "byteOffset") || // Skip index properties.
    w7(h, l))) && s.push(h);
  return s;
}
var ye = I7, D7 = Object.prototype;
function N7(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || D7;
  return e === n;
}
var R0 = N7;
function P7(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var pe = P7, O7 = pe, B7 = O7(Object.keys, Object), E7 = B7, F7 = R0, K7 = E7, j7 = Object.prototype, Z7 = j7.hasOwnProperty;
function Q7(e) {
  if (!F7(e))
    return K7(e);
  var t = [];
  for (var n in Object(e))
    Z7.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
var z7 = Q7, R7 = ie, U7 = ge;
function Y7(e) {
  return e != null && U7(e.length) && !R7(e);
}
var me = Y7, H7 = ye, V7 = z7, G7 = me;
function X7(e) {
  return G7(e) ? H7(e) : V7(e);
}
var U0 = X7, J7 = _0, W7 = U0;
function q7(e, t) {
  return e && J7(t, W7(t), e);
}
var et = q7;
function tt(e) {
  var t = [];
  if (e != null)
    for (var n in Object(e))
      t.push(n);
  return t;
}
var nt = tt, rt = T1, at = R0, it = nt, st = Object.prototype, ot = st.hasOwnProperty;
function ct(e) {
  if (!rt(e))
    return it(e);
  var t = at(e), n = [];
  for (var r in e)
    r == "constructor" && (t || !ot.call(e, r)) || n.push(r);
  return n;
}
var lt = ct, ut = ye, ft = lt, dt = me;
function Ct(e) {
  return dt(e) ? ut(e, !0) : ft(e);
}
var Y0 = Ct, ht = _0, gt = Y0;
function yt(e, t) {
  return e && ht(t, gt(t), e);
}
var pt = yt, f0 = { exports: {} };
f0.exports;
(function(e, t) {
  var n = c1, r = t && !t.nodeType && t, a = r && !0 && e && !e.nodeType && e, i = a && a.exports === r, o = i ? n.Buffer : void 0, s = o ? o.allocUnsafe : void 0;
  function l(h, d) {
    if (d)
      return h.slice();
    var p = h.length, $ = s ? s(p) : new h.constructor(p);
    return h.copy($), $;
  }
  e.exports = l;
})(f0, f0.exports);
var mt = f0.exports;
function vt(e, t) {
  var n = -1, r = e.length;
  for (t || (t = Array(r)); ++n < r; )
    t[n] = e[n];
  return t;
}
var _t = vt;
function Lt(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, a = 0, i = []; ++n < r; ) {
    var o = e[n];
    t(o, n, e) && (i[a++] = o);
  }
  return i;
}
var $t = Lt;
function bt() {
  return [];
}
var ve = bt, xt = $t, kt = ve, At = Object.prototype, wt = At.propertyIsEnumerable, b9 = Object.getOwnPropertySymbols, Mt = b9 ? function(e) {
  return e == null ? [] : (e = Object(e), xt(b9(e), function(t) {
    return wt.call(e, t);
  }));
} : kt, H0 = Mt, St = _0, Tt = H0;
function It(e, t) {
  return St(e, Tt(e), t);
}
var Dt = It;
function Nt(e, t) {
  for (var n = -1, r = t.length, a = e.length; ++n < r; )
    e[a + n] = t[n];
  return e;
}
var _e = Nt, Pt = pe, Ot = Pt(Object.getPrototypeOf, Object), Le = Ot, Bt = _e, Et = Le, Ft = H0, Kt = ve, jt = Object.getOwnPropertySymbols, Zt = jt ? function(e) {
  for (var t = []; e; )
    Bt(t, Ft(e)), e = Et(e);
  return t;
} : Kt, $e = Zt, Qt = _0, zt = $e;
function Rt(e, t) {
  return Qt(e, zt(e), t);
}
var Ut = Rt, Yt = _e, Ht = I1;
function Vt(e, t, n) {
  var r = t(e);
  return Ht(e) ? r : Yt(r, n(e));
}
var be = Vt, Gt = be, Xt = H0, Jt = U0;
function Wt(e) {
  return Gt(e, Jt, Xt);
}
var qt = Wt, en = be, tn = $e, nn = Y0;
function rn(e) {
  return en(e, nn, tn);
}
var an = rn, sn = b1, on = c1, cn = sn(on, "DataView"), ln = cn, un = b1, fn = c1, dn = un(fn, "Promise"), Cn = dn, hn = b1, gn = c1, yn = hn(gn, "Set"), pn = yn, mn = b1, vn = c1, _n = mn(vn, "WeakMap"), Ln = _n, T0 = ln, I0 = j0, D0 = Cn, N0 = pn, P0 = Ln, xe = U1, E1 = se, x9 = "[object Map]", $n = "[object Object]", k9 = "[object Promise]", A9 = "[object Set]", w9 = "[object WeakMap]", M9 = "[object DataView]", bn = E1(T0), xn = E1(I0), kn = E1(D0), An = E1(N0), wn = E1(P0), _1 = xe;
(T0 && _1(new T0(new ArrayBuffer(1))) != M9 || I0 && _1(new I0()) != x9 || D0 && _1(D0.resolve()) != k9 || N0 && _1(new N0()) != A9 || P0 && _1(new P0()) != w9) && (_1 = function(e) {
  var t = xe(e), n = t == $n ? e.constructor : void 0, r = n ? E1(n) : "";
  if (r)
    switch (r) {
      case bn:
        return M9;
      case xn:
        return x9;
      case kn:
        return k9;
      case An:
        return A9;
      case wn:
        return w9;
    }
  return t;
});
var V0 = _1, Mn = Object.prototype, Sn = Mn.hasOwnProperty;
function Tn(e) {
  var t = e.length, n = new e.constructor(t);
  return t && typeof e[0] == "string" && Sn.call(e, "index") && (n.index = e.index, n.input = e.input), n;
}
var In = Tn, Dn = c1, Nn = Dn.Uint8Array, Pn = Nn, S9 = Pn;
function On(e) {
  var t = new e.constructor(e.byteLength);
  return new S9(t).set(new S9(e)), t;
}
var G0 = On, Bn = G0;
function En(e, t) {
  var n = t ? Bn(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.byteLength);
}
var Fn = En, Kn = /\w*$/;
function jn(e) {
  var t = new e.constructor(e.source, Kn.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var Zn = jn, T9 = g0, I9 = T9 ? T9.prototype : void 0, D9 = I9 ? I9.valueOf : void 0;
function Qn(e) {
  return D9 ? Object(D9.call(e)) : {};
}
var zn = Qn, Rn = G0;
function Un(e, t) {
  var n = t ? Rn(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.length);
}
var Yn = Un, Hn = G0, Vn = Fn, Gn = Zn, Xn = zn, Jn = Yn, Wn = "[object Boolean]", qn = "[object Date]", e4 = "[object Map]", t4 = "[object Number]", n4 = "[object RegExp]", r4 = "[object Set]", a4 = "[object String]", i4 = "[object Symbol]", s4 = "[object ArrayBuffer]", o4 = "[object DataView]", c4 = "[object Float32Array]", l4 = "[object Float64Array]", u4 = "[object Int8Array]", f4 = "[object Int16Array]", d4 = "[object Int32Array]", C4 = "[object Uint8Array]", h4 = "[object Uint8ClampedArray]", g4 = "[object Uint16Array]", y4 = "[object Uint32Array]";
function p4(e, t, n) {
  var r = e.constructor;
  switch (t) {
    case s4:
      return Hn(e);
    case Wn:
    case qn:
      return new r(+e);
    case o4:
      return Vn(e, n);
    case c4:
    case l4:
    case u4:
    case f4:
    case d4:
    case C4:
    case h4:
    case g4:
    case y4:
      return Jn(e, n);
    case e4:
      return new r();
    case t4:
    case a4:
      return new r(e);
    case n4:
      return Gn(e);
    case r4:
      return new r();
    case i4:
      return Xn(e);
  }
}
var m4 = p4, v4 = T1, N9 = Object.create, _4 = function() {
  function e() {
  }
  return function(t) {
    if (!v4(t))
      return {};
    if (N9)
      return N9(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}(), L4 = _4, $4 = L4, b4 = Le, x4 = R0;
function k4(e) {
  return typeof e.constructor == "function" && !x4(e) ? $4(b4(e)) : {};
}
var A4 = k4, w4 = V0, M4 = D1, S4 = "[object Map]";
function T4(e) {
  return M4(e) && w4(e) == S4;
}
var I4 = T4, D4 = I4, N4 = Q0, P9 = z0, O9 = P9 && P9.isMap, P4 = O9 ? N4(O9) : D4, O4 = P4, B4 = V0, E4 = D1, F4 = "[object Set]";
function K4(e) {
  return E4(e) && B4(e) == F4;
}
var j4 = K4, Z4 = j4, Q4 = Q0, B9 = z0, E9 = B9 && B9.isSet, z4 = E9 ? Q4(E9) : Z4, R4 = z4, U4 = L8, Y4 = b8, H4 = F0, V4 = et, G4 = pt, X4 = mt, J4 = _t, W4 = Dt, q4 = Ut, er = qt, tr = an, nr = V0, rr = In, ar = m4, ir = A4, sr = I1, or = he, cr = O4, lr = T1, ur = R4, fr = U0, dr = Y0, Cr = 1, hr = 2, gr = 4, ke = "[object Arguments]", yr = "[object Array]", pr = "[object Boolean]", mr = "[object Date]", vr = "[object Error]", Ae = "[object Function]", _r = "[object GeneratorFunction]", Lr = "[object Map]", $r = "[object Number]", we = "[object Object]", br = "[object RegExp]", xr = "[object Set]", kr = "[object String]", Ar = "[object Symbol]", wr = "[object WeakMap]", Mr = "[object ArrayBuffer]", Sr = "[object DataView]", Tr = "[object Float32Array]", Ir = "[object Float64Array]", Dr = "[object Int8Array]", Nr = "[object Int16Array]", Pr = "[object Int32Array]", Or = "[object Uint8Array]", Br = "[object Uint8ClampedArray]", Er = "[object Uint16Array]", Fr = "[object Uint32Array]", B = {};
B[ke] = B[yr] = B[Mr] = B[Sr] = B[pr] = B[mr] = B[Tr] = B[Ir] = B[Dr] = B[Nr] = B[Pr] = B[Lr] = B[$r] = B[we] = B[br] = B[xr] = B[kr] = B[Ar] = B[Or] = B[Br] = B[Er] = B[Fr] = !0;
B[vr] = B[Ae] = B[wr] = !1;
function r0(e, t, n, r, a, i) {
  var o, s = t & Cr, l = t & hr, h = t & gr;
  if (n && (o = a ? n(e, r, a, i) : n(e)), o !== void 0)
    return o;
  if (!lr(e))
    return e;
  var d = sr(e);
  if (d) {
    if (o = rr(e), !s)
      return J4(e, o);
  } else {
    var p = nr(e), $ = p == Ae || p == _r;
    if (or(e))
      return X4(e, s);
    if (p == we || p == ke || $ && !a) {
      if (o = l || $ ? {} : ir(e), !s)
        return l ? q4(e, G4(o, e)) : W4(e, V4(o, e));
    } else {
      if (!B[p])
        return a ? e : {};
      o = ar(e, p, s);
    }
  }
  i || (i = new U4());
  var k = i.get(e);
  if (k)
    return k;
  i.set(e, o), ur(e) ? e.forEach(function(z) {
    o.add(r0(z, t, n, z, e, i));
  }) : cr(e) && e.forEach(function(z, N) {
    o.set(N, r0(z, t, n, N, e, i));
  });
  var P = h ? l ? tr : er : l ? dr : fr, Z = d ? void 0 : P(e);
  return Y4(Z || e, function(z, N) {
    Z && (N = z, z = e[N]), H4(o, N, r0(z, t, n, N, e, i));
  }), o;
}
var Kr = r0, jr = Kr, Zr = 1, Qr = 4;
function zr(e) {
  return jr(e, Zr | Qr);
}
var Rr = zr;
const Ur = /* @__PURE__ */ ne(Rr), Yr = /* @__PURE__ */ y("<button></button>"), Hr = (e) => (() => {
  const t = Yr.cloneNode(!0);
  return y1(t, "click", e.onClick, !0), L(t, () => e.children), G((n) => {
    const r = e.style, a = `klinecharts-pro-button ${e.type ?? "confirm"} ${e.class ?? ""}`;
    return n._v$ = S1(t, r, n._v$), a !== n._v$2 && $1(t, n._v$2 = a), n;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
o1(["click"]);
const Vr = /* @__PURE__ */ y('<svg viewBox="0 0 1024 1024" class="icon"><path d="M810.666667 128H213.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v597.333334c0 46.933333 38.4 85.333333 85.333333 85.333333h597.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V213.333333c0-46.933333-38.4-85.333333-85.333333-85.333333z m-353.706667 567.04a42.496 42.496 0 0 1-60.16 0L243.626667 541.866667c-8.106667-8.106667-12.373333-18.773333-12.373334-29.866667s4.693333-22.186667 12.373334-29.866667a42.496 42.496 0 0 1 60.16 0L426.666667 604.586667l293.546666-293.546667a42.496 42.496 0 1 1 60.16 60.16l-323.413333 323.84z"></path></svg>'), Gr = /* @__PURE__ */ y('<svg viewBox="0 0 1024 1024" class="icon"><path d="M245.333333 128h533.333334A117.333333 117.333333 0 0 1 896 245.333333v533.333334A117.333333 117.333333 0 0 1 778.666667 896H245.333333A117.333333 117.333333 0 0 1 128 778.666667V245.333333A117.333333 117.333333 0 0 1 245.333333 128z m0 64c-29.44 0-53.333333 23.893333-53.333333 53.333333v533.333334c0 29.44 23.893333 53.333333 53.333333 53.333333h533.333334c29.44 0 53.333333-23.893333 53.333333-53.333333V245.333333c0-29.44-23.893333-53.333333-53.333333-53.333333H245.333333z"></path></svg>'), Xr = /* @__PURE__ */ y("<div></div>"), Jr = /* @__PURE__ */ y('<span class="label"></span>'), Wr = () => Vr.cloneNode(!0), qr = () => Gr.cloneNode(!0), F9 = (e) => {
  const [t, n] = A(e.checked ?? !1);
  return f1(() => {
    "checked" in e && n(e.checked);
  }), (() => {
    const r = Xr.cloneNode(!0);
    return r.$$click = (a) => {
      const i = !t();
      e.onChange && e.onChange(i), n(i);
    }, L(r, (() => {
      const a = Y(() => !!t());
      return () => a() ? m(Wr, {}) : m(qr, {});
    })(), null), L(r, (() => {
      const a = Y(() => !!e.label);
      return () => a() && (() => {
        const i = Jr.cloneNode(!0);
        return L(i, () => e.label), i;
      })();
    })(), null), G((a) => {
      const i = e.style, o = `klinecharts-pro-checkbox ${t() && "checked" || ""} ${e.class || ""}`;
      return a._v$ = S1(r, i, a._v$), o !== a._v$2 && $1(r, a._v$2 = o), a;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), r;
  })();
};
o1(["click"]);
const ea = /* @__PURE__ */ y('<div class="klinecharts-pro-loading"><i class="circle1"></i><i class="circle2"></i><i class="circle3"></i></div>'), Me = () => ea.cloneNode(!0), ta = /* @__PURE__ */ y('<div class="klinecharts-pro-empty"><svg class="icon" viewBox="0 0 1024 1024"><path d="M855.6 427.2H168.5c-12.7 0-24.4 6.9-30.6 18L4.4 684.7C1.5 689.9 0 695.8 0 701.8v287.1c0 19.4 15.7 35.1 35.1 35.1H989c19.4 0 35.1-15.7 35.1-35.1V701.8c0-6-1.5-11.8-4.4-17.1L886.2 445.2c-6.2-11.1-17.9-18-30.6-18zM673.4 695.6c-16.5 0-30.8 11.5-34.3 27.7-12.7 58.5-64.8 102.3-127.2 102.3s-114.5-43.8-127.2-102.3c-3.5-16.1-17.8-27.7-34.3-27.7H119c-26.4 0-43.3-28-31.1-51.4l81.7-155.8c6.1-11.6 18-18.8 31.1-18.8h622.4c13 0 25 7.2 31.1 18.8l81.7 155.8c12.2 23.4-4.7 51.4-31.1 51.4H673.4zM819.9 209.5c-1-1.8-2.1-3.7-3.2-5.5-9.8-16.6-31.1-22.2-47.8-12.6L648.5 261c-17 9.8-22.7 31.6-12.6 48.4 0.9 1.4 1.7 2.9 2.5 4.4 9.5 17 31.2 22.8 48 13L807 257.3c16.7-9.7 22.4-31 12.9-47.8zM375.4 261.1L255 191.6c-16.7-9.6-38-4-47.8 12.6-1.1 1.8-2.1 3.6-3.2 5.5-9.5 16.8-3.8 38.1 12.9 47.8L337.3 327c16.9 9.7 38.6 4 48-13.1 0.8-1.5 1.7-2.9 2.5-4.4 10.2-16.8 4.5-38.6-12.4-48.4zM512 239.3h2.5c19.5 0.3 35.5-15.5 35.5-35.1v-139c0-19.3-15.6-34.9-34.8-35.1h-6.4C489.6 30.3 474 46 474 65.2v139c0 19.5 15.9 35.4 35.5 35.1h2.5z"></path></svg></div>'), na = () => ta.cloneNode(!0), ra = /* @__PURE__ */ y("<ul></ul>"), aa = /* @__PURE__ */ y("<li></li>"), d0 = (e) => (() => {
  const t = ra.cloneNode(!0);
  return L(t, m(W, {
    get when() {
      return e.loading;
    },
    get children() {
      return m(Me, {});
    }
  }), null), L(t, m(W, {
    get when() {
      var n;
      return !e.loading && !e.children && !((n = e.dataSource) != null && n.length);
    },
    get children() {
      return m(na, {});
    }
  }), null), L(t, m(W, {
    get when() {
      return e.children;
    },
    get children() {
      return e.children;
    }
  }), null), L(t, m(W, {
    get when() {
      return !e.children;
    },
    get children() {
      var n;
      return (n = e.dataSource) == null ? void 0 : n.map((r) => {
        var a;
        return ((a = e.renderItem) == null ? void 0 : a.call(e, r)) ?? aa.cloneNode(!0);
      });
    }
  }), null), G((n) => {
    const r = e.style, a = `klinecharts-pro-list ${e.class ?? ""}`;
    return n._v$ = S1(t, r, n._v$), a !== n._v$2 && $1(t, n._v$2 = a), n;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})(), ia = /* @__PURE__ */ y('<div class="klinecharts-pro-modal"><div class="inner"><div class="title-container"><svg class="close-icon" viewBox="0 0 1024 1024"><path d="M934.184927 199.723787 622.457206 511.452531l311.727721 311.703161c14.334473 14.229073 23.069415 33.951253 23.069415 55.743582 0 43.430138-35.178197 78.660524-78.735226 78.660524-21.664416 0-41.361013-8.865925-55.642275-23.069415L511.149121 622.838388 199.420377 934.490384c-14.204513 14.20349-33.901111 23.069415-55.642275 23.069415-43.482327 0-78.737272-35.230386-78.737272-78.660524 0-21.792329 8.864902-41.513486 23.094998-55.743582l311.677579-311.703161L88.135828 199.723787c-14.230096-14.255679-23.094998-33.92567-23.094998-55.642275 0-43.430138 35.254945-78.762855 78.737272-78.762855 21.741163 0 41.437761 8.813736 55.642275 23.069415l311.727721 311.727721L822.876842 88.389096c14.281261-14.255679 33.977859-23.069415 55.642275-23.069415 43.557028 0 78.735226 35.332716 78.735226 78.762855C957.254342 165.798117 948.5194 185.468109 934.184927 199.723787"></path></svg></div><div class="content-container"></div></div></div>'), sa = /* @__PURE__ */ y('<div class="button-container"></div>'), F1 = (e) => (() => {
  const t = ia.cloneNode(!0), n = t.firstChild, r = n.firstChild, a = r.firstChild, i = r.nextSibling;
  return L(r, () => e.title, a), y1(a, "click", e.onClose, !0), L(i, () => e.children), L(n, (() => {
    const o = Y(() => !!(e.buttons && e.buttons.length > 0));
    return () => o() && (() => {
      const s = sa.cloneNode(!0);
      return L(s, () => e.buttons.map((l) => m(Hr, te(l, {
        get children() {
          return l.children;
        }
      })))), s;
    })();
  })(), null), G(() => n.style.setProperty("width", `${e.width ?? 400}px`)), t;
})();
o1(["click"]);
const oa = /* @__PURE__ */ y('<div tabindex="0"><div class="selector-container"><span class="value"></span><i class="arrow"></i></div></div>'), ca = /* @__PURE__ */ y('<div class="drop-down-container"><ul></ul></div>'), la = /* @__PURE__ */ y("<li></li>"), Se = (e) => {
  const [t, n] = A(!1);
  return (() => {
    const r = oa.cloneNode(!0), a = r.firstChild, i = a.firstChild;
    return r.addEventListener("blur", (o) => {
      n(!1);
    }), r.$$click = (o) => {
      n((s) => !s);
    }, L(i, () => e.value), L(r, (() => {
      const o = Y(() => !!(e.dataSource && e.dataSource.length > 0));
      return () => o() && (() => {
        const s = ca.cloneNode(!0), l = s.firstChild;
        return L(l, () => e.dataSource.map((h) => {
          const p = h[e.valueKey ?? "text"] ?? h;
          return (() => {
            const $ = la.cloneNode(!0);
            return $.$$click = (k) => {
              var P;
              k.stopPropagation(), e.value !== p && ((P = e.onSelected) == null || P.call(e, h)), n(!1);
            }, L($, p), $;
          })();
        })), s;
      })();
    })(), null), G((o) => {
      const s = e.style, l = `klinecharts-pro-select ${e.class ?? ""} ${t() ? "klinecharts-pro-select-show" : ""}`;
      return o._v$ = S1(r, s, o._v$), l !== o._v$2 && $1(r, o._v$2 = l), o;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), r;
  })();
};
o1(["click"]);
const ua = /* @__PURE__ */ y('<span class="prefix"></span>'), fa = /* @__PURE__ */ y('<span class="suffix"></span>'), da = /* @__PURE__ */ y('<div><input class="value"></div>'), Te = (e) => {
  const t = te({
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER
  }, e);
  let n;
  const [r, a] = A("normal");
  return (() => {
    const i = da.cloneNode(!0), o = i.firstChild;
    return i.$$click = () => {
      n == null || n.focus();
    }, L(i, m(W, {
      get when() {
        return t.prefix;
      },
      get children() {
        const s = ua.cloneNode(!0);
        return L(s, () => t.prefix), s;
      }
    }), o), o.addEventListener("change", (s) => {
      var h, d;
      const l = s.target.value;
      if ("precision" in t) {
        let p;
        const $ = Math.max(0, Math.floor(t.precision));
        $ <= 0 ? p = new RegExp(/^[1-9]\d*$/) : p = new RegExp("^\\d+\\.?\\d{0," + $ + "}$"), (l === "" || p.test(l) && +l >= t.min && +l <= t.max) && ((h = t.onChange) == null || h.call(t, l === "" ? l : +l));
      } else
        (d = t.onChange) == null || d.call(t, l);
    }), o.addEventListener("blur", () => {
      a("normal");
    }), o.addEventListener("focus", () => {
      a("focus");
    }), E0((s) => {
      n = s;
    }, o), L(i, m(W, {
      get when() {
        return t.suffix;
      },
      get children() {
        const s = fa.cloneNode(!0);
        return L(s, () => t.suffix), s;
      }
    }), null), G((s) => {
      const l = t.style, h = `klinecharts-pro-input ${t.class ?? ""}`, d = r(), p = t.placeholder ?? "";
      return s._v$ = S1(i, l, s._v$), h !== s._v$2 && $1(i, s._v$2 = h), d !== s._v$3 && r1(i, "data-status", s._v$3 = d), p !== s._v$4 && r1(o, "placeholder", s._v$4 = p), s;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0
    }), G(() => o.value = t.value), i;
  })();
};
o1(["click"]);
const Ca = /* @__PURE__ */ y('<div><i class="thumb"></i></div>'), ha = (e) => (() => {
  const t = Ca.cloneNode(!0);
  return t.$$click = (n) => {
    e.onChange && e.onChange();
  }, G((n) => {
    const r = e.style, a = `klinecharts-pro-switch ${e.open ? "turn-on" : "turn-off"} ${e.class ?? ""}`;
    return n._v$ = S1(t, r, n._v$), a !== n._v$2 && $1(t, n._v$2 = a), n;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
o1(["click"]);
const ga = "指标", ya = "主图指标", pa = "副图指标", ma = "设置", va = "时区", _a = "截屏", La = "全屏", $a = "退出全屏", ba = "保存", xa = "确定", ka = "取消", Aa = "MA(移动平均线)", wa = "EMA(指数平滑移动平均线)", Ma = "SMA", Sa = "BOLL(布林线)", Ta = "BBI(多空指数)", Ia = "SAR(停损点指向指标)", Da = "VOL(成交量)", Na = "MACD(指数平滑异同移动平均线)", Pa = "KDJ(随机指标)", Oa = "RSI(相对强弱指标)", Ba = "BIAS(乖离率)", Ea = "BRAR(情绪指标)", Fa = "CCI(顺势指标)", Ka = "DMI(动向指标)", ja = "CR(能量指标)", Za = "PSY(心理线)", Qa = "DMA(平行线差指标)", za = "TRIX(三重指数平滑平均线)", Ra = "OBV(能量潮指标)", Ua = "VR(成交量变异率)", Ya = "WR(威廉指标)", Ha = "MTM(动量指标)", Va = "EMV(简易波动指标)", Ga = "ROC(变动率指标)", Xa = "PVT(价量趋势指标)", Ja = "AO(动量震荡指标)", Wa = "世界统一时间", qa = "(UTC-10) 檀香山", ei = "(UTC-8) 朱诺", ti = "(UTC-7) 洛杉矶", ni = "(UTC-5) 芝加哥", ri = "(UTC-4) 多伦多", ai = "(UTC-3) 圣保罗", ii = "(UTC+1) 伦敦", si = "(UTC+2) 柏林", oi = "(UTC+3) 巴林", ci = "(UTC+4) 迪拜", li = "(UTC+5) 阿什哈巴德", ui = "(UTC+6) 阿拉木图", fi = "(UTC+7) 曼谷", di = "(UTC+8) 上海", Ci = "(UTC+9) 东京", hi = "(UTC+10) 悉尼", gi = "(UTC+12) 诺福克岛", yi = "水平直线", pi = "水平射线", mi = "水平线段", vi = "垂直直线", _i = "垂直射线", Li = "垂直线段", $i = "直线", bi = "射线", xi = "线段", ki = "箭头", Ai = "价格线", wi = "价格通道线", Mi = "平行直线", Si = "斐波那契回调直线", Ti = "斐波那契回调线段", Ii = "斐波那契圆环", Di = "斐波那契螺旋", Ni = "斐波那契速度阻力扇", Pi = "斐波那契趋势扩展", Oi = "江恩箱", Bi = "矩形", Ei = "平行四边形", Fi = "圆", Ki = "三角形", ji = "三浪", Zi = "五浪", Qi = "八浪", zi = "任意浪", Ri = "ABCD形态", Ui = "XABCD形态", Yi = "弱磁模式", Hi = "强磁模式", Vi = "商品搜索", Gi = "商品代码", Xi = "参数1", Ji = "参数2", Wi = "参数3", qi = "参数4", es = "参数5", ts = "周期", ns = "标准差", rs = "蜡烛图类型", as = "全实心", is = "全空心", ss = "涨空心", os = "跌空心", cs = "OHLC", ls = "面积图", us = "最新价显示", fs = "最高价显示", ds = "最低价显示", Cs = "指标最新值显示", hs = "价格轴类型", gs = "线性轴", ys = "百分比轴", ps = "对数轴", ms = "倒置坐标", vs = "网格线显示", _s = "恢复默认", Ls = {
  indicator: ga,
  main_indicator: ya,
  sub_indicator: pa,
  setting: ma,
  timezone: va,
  screenshot: _a,
  full_screen: La,
  exit_full_screen: $a,
  save: ba,
  confirm: xa,
  cancel: ka,
  ma: Aa,
  ema: wa,
  sma: Ma,
  boll: Sa,
  bbi: Ta,
  sar: Ia,
  vol: Da,
  macd: Na,
  kdj: Pa,
  rsi: Oa,
  bias: Ba,
  brar: Ea,
  cci: Fa,
  dmi: Ka,
  cr: ja,
  psy: Za,
  dma: Qa,
  trix: za,
  obv: Ra,
  vr: Ua,
  wr: Ya,
  mtm: Ha,
  emv: Va,
  roc: Ga,
  pvt: Xa,
  ao: Ja,
  utc: Wa,
  honolulu: qa,
  juneau: ei,
  los_angeles: ti,
  chicago: ni,
  toronto: ri,
  sao_paulo: ai,
  london: ii,
  berlin: si,
  bahrain: oi,
  dubai: ci,
  ashkhabad: li,
  almaty: ui,
  bangkok: fi,
  shanghai: di,
  tokyo: Ci,
  sydney: hi,
  norfolk: gi,
  horizontal_straight_line: yi,
  horizontal_ray_line: pi,
  horizontal_segment: mi,
  vertical_straight_line: vi,
  vertical_ray_line: _i,
  vertical_segment: Li,
  straight_line: $i,
  ray_line: bi,
  segment: xi,
  arrow: ki,
  price_line: Ai,
  price_channel_line: wi,
  parallel_straight_line: Mi,
  fibonacci_line: Si,
  fibonacci_segment: Ti,
  fibonacci_circle: Ii,
  fibonacci_spiral: Di,
  fibonacci_speed_resistance_fan: Ni,
  fibonacci_extension: Pi,
  gann_box: Oi,
  rect: Bi,
  parallelogram: Ei,
  circle: Fi,
  triangle: Ki,
  three_waves: ji,
  five_waves: Zi,
  eight_waves: Qi,
  any_waves: zi,
  abcd: Ri,
  xabcd: Ui,
  weak_magnet: Yi,
  strong_magnet: Hi,
  symbol_search: Vi,
  symbol_code: Gi,
  params_1: Xi,
  params_2: Ji,
  params_3: Wi,
  params_4: qi,
  params_5: es,
  period: ts,
  standard_deviation: ns,
  candle_type: rs,
  candle_solid: as,
  candle_stroke: is,
  candle_up_stroke: ss,
  candle_down_stroke: os,
  ohlc: cs,
  area: ls,
  last_price_show: us,
  high_price_show: fs,
  low_price_show: ds,
  indicator_last_value_show: Cs,
  price_axis_type: hs,
  normal: gs,
  percentage: ys,
  log: ps,
  reverse_coordinate: ms,
  grid_show: vs,
  restore_default: _s
}, $s = "Indicator", bs = "Main Indicator", xs = "Sub Indicator", ks = "Setting", As = "Timezone", ws = "Screenshot", Ms = "Full Screen", Ss = "Exit", Ts = "Save", Is = "Confirm", Ds = "Cancel", Ns = "MA(Moving Average)", Ps = "EMA(Exponential Moving Average)", Os = "SMA", Bs = "BOLL(Bolinger Bands)", Es = "BBI(Bull And Bearlndex)", Fs = "SAR(Stop and Reverse)", Ks = "VOL(Volume)", js = "MACD(Moving Average Convergence / Divergence)", Zs = "KDJ(KDJ Index)", Qs = "RSI(Relative Strength Index)", zs = "BIAS(Bias Ratio)", Rs = "BRAR(情绪指标)", Us = "CCI(Commodity Channel Index)", Ys = "DMI(Directional Movement Index)", Hs = "CR(能量指标)", Vs = "PSY(Psychological Line)", Gs = "DMA(Different of Moving Average)", Xs = "TRIX(Triple Exponentially Smoothed Moving Average)", Js = "OBV(On Balance Volume)", Ws = "VR(Volatility Volume Ratio)", qs = "WR(Williams %R)", eo = "MTM(Momentum Index)", to = "EMV(Ease of Movement Value)", no = "ROC(Price Rate of Change)", ro = "PVT(Price and Volume Trend)", ao = "AO(Awesome Oscillator)", io = "UTC", so = "(UTC-10) Honolulu", oo = "(UTC-8) Juneau", co = "(UTC-7) Los Angeles", lo = "(UTC-5) Chicago", uo = "(UTC-4) Toronto", fo = "(UTC-3) Sao Paulo", Co = "(UTC+1) London", ho = "(UTC+2) Berlin", go = "(UTC+3) Bahrain", yo = "(UTC+4) Dubai", po = "(UTC+5) Ashkhabad", mo = "(UTC+6) Almaty", vo = "(UTC+7) Bangkok", _o = "(UTC+8) Shanghai", Lo = "(UTC+9) Tokyo", $o = "(UTC+10) Sydney", bo = "(UTC+12) Norfolk", xo = "Horizontal Line", ko = "Horizontal Ray", Ao = "Horizontal Segment", wo = "Vertical Line", Mo = "Vertical Ray", So = "Vertical Segment", To = "Trend Line", Io = "Ray", Do = "Segment", No = "Arrow", Po = "Price Line", Oo = "Price Channel Line", Bo = "Parallel Line", Eo = "Fibonacci Line", Fo = "Fibonacci Segment", Ko = "Fibonacci Circle", jo = "Fibonacci Spiral", Zo = "Fibonacci Sector", Qo = "Fibonacci Extension", zo = "Gann Box", Ro = "Rect", Uo = "Parallelogram", Yo = "Circle", Ho = "Triangle", Vo = "Three Waves", Go = "Five Waves", Xo = "Eight Waves", Jo = "Any Waves", Wo = "ABCD Pattern", qo = "XABCD Pattern", ec = "Weak Magnet", tc = "Strong Magnet", nc = "Symbol Search", rc = "Symbol Code", ac = "Parameter 1", ic = "Parameter 2", sc = "Parameter 3", oc = "Parameter 4", cc = "Parameter 5", lc = "Period", uc = "Standard Deviation", fc = "Candle Type", dc = "Candle Solid", Cc = "Candle Stroke", hc = "Candle Up Stroke", gc = "Candle Down Stroke", yc = "OHLC", pc = "Area", mc = "Show Last Price", vc = "Show Highest Price", _c = "Show Lowest Price", Lc = "Show indicator's last value", $c = "Price Axis Type", bc = "Normal", xc = "Percentage", kc = "Log", Ac = "Reverse Coordinate", wc = "Show Grids", Mc = "Restore Defaults", Sc = {
  indicator: $s,
  main_indicator: bs,
  sub_indicator: xs,
  setting: ks,
  timezone: As,
  screenshot: ws,
  full_screen: Ms,
  exit_full_screen: Ss,
  save: Ts,
  confirm: Is,
  cancel: Ds,
  ma: Ns,
  ema: Ps,
  sma: Os,
  boll: Bs,
  bbi: Es,
  sar: Fs,
  vol: Ks,
  macd: js,
  kdj: Zs,
  rsi: Qs,
  bias: zs,
  brar: Rs,
  cci: Us,
  dmi: Ys,
  cr: Hs,
  psy: Vs,
  dma: Gs,
  trix: Xs,
  obv: Js,
  vr: Ws,
  wr: qs,
  mtm: eo,
  emv: to,
  roc: no,
  pvt: ro,
  ao,
  utc: io,
  honolulu: so,
  juneau: oo,
  los_angeles: co,
  chicago: lo,
  toronto: uo,
  sao_paulo: fo,
  london: Co,
  berlin: ho,
  bahrain: go,
  dubai: yo,
  ashkhabad: po,
  almaty: mo,
  bangkok: vo,
  shanghai: _o,
  tokyo: Lo,
  sydney: $o,
  norfolk: bo,
  horizontal_straight_line: xo,
  horizontal_ray_line: ko,
  horizontal_segment: Ao,
  vertical_straight_line: wo,
  vertical_ray_line: Mo,
  vertical_segment: So,
  straight_line: To,
  ray_line: Io,
  segment: Do,
  arrow: No,
  price_line: Po,
  price_channel_line: Oo,
  parallel_straight_line: Bo,
  fibonacci_line: Eo,
  fibonacci_segment: Fo,
  fibonacci_circle: Ko,
  fibonacci_spiral: jo,
  fibonacci_speed_resistance_fan: Zo,
  fibonacci_extension: Qo,
  gann_box: zo,
  rect: Ro,
  parallelogram: Uo,
  circle: Yo,
  triangle: Ho,
  three_waves: Vo,
  five_waves: Go,
  eight_waves: Xo,
  any_waves: Jo,
  abcd: Wo,
  xabcd: qo,
  weak_magnet: ec,
  strong_magnet: tc,
  symbol_search: nc,
  symbol_code: rc,
  params_1: ac,
  params_2: ic,
  params_3: sc,
  params_4: oc,
  params_5: cc,
  period: lc,
  standard_deviation: uc,
  candle_type: fc,
  candle_solid: dc,
  candle_stroke: Cc,
  candle_up_stroke: hc,
  candle_down_stroke: gc,
  ohlc: yc,
  area: pc,
  last_price_show: mc,
  high_price_show: vc,
  low_price_show: _c,
  indicator_last_value_show: Lc,
  price_axis_type: $c,
  normal: bc,
  percentage: xc,
  log: kc,
  reverse_coordinate: Ac,
  grid_show: wc,
  restore_default: Mc
}, Ie = {
  "zh-CN": Ls,
  "en-US": Sc
};
function Bu(e, t) {
  Ie[e] = t;
}
const f = (e, t) => {
  var n;
  return ((n = Ie[t]) == null ? void 0 : n[e]) ?? e;
}, Tc = /* @__PURE__ */ y('<img alt="symbol">'), Ic = /* @__PURE__ */ y('<div class="symbol"><span></span></div>'), Dc = /* @__PURE__ */ y('<div class="klinecharts-pro-period-bar"><div class="menu-container"><svg viewBox="0 0 1024 1024"><path d="M192.037 287.953h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 479.169H438.553c-17.673 0-32 14.327-32 32s14.327 32 32 32h393.608c17.673 0 32-14.327 32-32s-14.327-32-32-32zM832.161 735.802H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32zM319.028 351.594l-160 160 160 160z"></path></svg></div><div class="item tools"><svg viewBox="0 0 20 20"><path d="M15.873,20L3.65079,20C1.5873,20,0,18.3871,0,16.2903L0,3.70968C-3.78442e-7,1.6129,1.5873,0,3.65079,0L15.873,0C17.9365,0,19.5238,1.6129,19.5238,3.70968C19.5238,4.35484,19.2063,4.51613,18.5714,4.51613C17.9365,4.51613,17.619,4.19355,17.619,3.70968C17.619,2.74194,16.8254,1.93548,15.873,1.93548L3.65079,1.93548C2.69841,1.93548,1.90476,2.74194,1.90476,3.70968L1.90476,16.2903C1.90476,17.2581,2.69841,18.0645,3.65079,18.0645L15.873,18.0645C16.8254,18.0645,17.619,17.2581,17.619,16.2903C17.619,15.8065,18.0952,15.3226,18.5714,15.3226C19.0476,15.3226,19.5238,15.8065,19.5238,16.2903C19.5238,18.2258,17.9365,20,15.873,20ZM14.9206,12.9032C14.7619,12.9032,14.4444,12.9032,14.2857,12.7419L11.2698,9.35484C10.9524,9.03226,10.9524,8.54839,11.2698,8.22581C11.5873,7.90323,12.0635,7.90323,12.381,8.22581L15.3968,11.6129C15.7143,11.9355,15.7143,12.4194,15.3968,12.7419C15.3968,12.9032,15.2381,12.9032,14.9206,12.9032ZM11.4286,13.2258C11.2698,13.2258,11.1111,13.2258,10.9524,13.0645C10.6349,12.7419,10.6349,12.4194,10.9524,12.0968L15.0794,7.74193C15.3968,7.41935,15.7143,7.41935,16.0317,7.74193C16.3492,8.06452,16.3492,8.3871,16.0317,8.70968L11.9048,13.0645C11.746,13.2258,11.5873,13.2258,11.4286,13.2258ZM10.3175,3.70968C10.6349,3.70968,11.4286,3.87097,11.4286,4.67742C11.4286,5.32258,10.4762,5.16129,10.1587,5.16129C8.73016,5.16129,8.25397,5.96774,8.09524,6.6129L7.77778,8.54839L9.36508,8.54839C9.68254,8.54839,10,8.87097,10,9.19355C10,9.51613,9.68254,9.83871,9.36508,9.83871L7.61905,9.83871L6.50794,14.8387Q6.34921,16.2903,5.39683,16.2903Q4.44444,16.2903,4.92064,14.8387L6.03175,10L4.60317,10C4.28571,10,3.96825,9.67742,3.96825,9.35484C3.96825,8.70968,4.28571,8.54839,4.60317,8.54839L6.34921,8.54839L6.8254,6.45161C7.14286,3.70968,9.52381,3.54839,10.3175,3.70968ZM18.4127,6.6129C18.5714,6.12903,18.8889,5.96774,19.3651,5.96774C19.8413,6.12903,20,6.45161,20,6.93548L18.4127,13.3871C18.254,13.871,17.9365,14.0323,17.4603,14.0323C16.9841,13.871,16.8254,13.5484,16.8254,13.0645L18.4127,6.6129Z"></path></svg><span></span></div><div class="item tools"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path><path d="M15.22299772857666,9.722223632261718C12.59389772857666,9.722223632261718,10.44600772857666,12.020201374511718,10.44600772857666,14.861111374511719C10.44600772857666,17.70202137451172,12.58215772857666,20.000021374511718,15.223007728576661,20.000021374511718C17.86384772857666,20.000021374511718,19.99999772857666,17.70202137451172,19.99999772857666,14.861111374511719C19.99999772857666,12.020201374511718,17.85211772857666,9.72222212709572,15.22299772857666,9.722223632261718ZM15.22299772857666,18.598491374511717C13.30985772857666,18.598491374511717,11.737087728576661,16.91919137451172,11.737087728576661,14.848481374511719C11.737087728576661,12.777781374511719,13.29811772857666,11.098491374511719,15.22299772857666,11.098491374511719C17.14787772857666,11.098491374511719,18.708917728576658,12.777781374511719,18.708917728576658,14.848481374511719C18.708917728576658,16.91919137451172,17.13614772857666,18.59848137451172,15.22299772857666,18.598491374511717Z"></path><path d="M15.692486288146974,15.050496970825195L15.692486288146974,12.676760970825196C15.692486288146974,12.297972970825196,15.399058288146973,11.982316970825195,15.046945288146972,11.982316970825195C14.694833288146972,11.982316970825195,14.401406288146973,12.297972970825196,14.401406288146973,12.676760970825196L14.401406288146973,15.340896970825195C14.401406288146973,15.530296970825194,14.471829288146973,15.694436970825196,14.589200288146973,15.833326970825196L15.751176288146972,17.095956970825195C15.868546288146973,17.222216970825194,16.032866288146973,17.297976970825196,16.208916288146973,17.297976970825196C16.384976288146973,17.297976970825196,16.537556288146973,17.222216970825194,16.666666288146974,17.095956970825195C16.78403628814697,16.969686970825194,16.854456288146974,16.792916970825196,16.854456288146974,16.603526970825193C16.854456288146974,16.414136970825197,16.78403628814697,16.237366970825196,16.666666288146974,16.111106970825197L15.692486288146974,15.050496970825195Z"></path></svg><span></span></div><div class="item tools"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg><span></span></div><div class="item tools"><svg viewBox="0 0 20 20"><path d="M6.50977,1L13.4902,1C13.6406,1,13.7695,1.1104910000000001,13.7969,1.2631700000000001L14.0273,2.52277C14.1387,3.13147,14.6543,3.57143,15.2559,3.57143L17.5,3.57143C18.8809,3.57143,20,4.72254,20,6.14286L20,16.4286C20,17.8489,18.8809,19,17.5,19L2.5,19C1.11914,19,0,17.8489,0,16.4286L0,6.14286C0,4.72254,1.11914,3.57143,2.5,3.57143L4.74414,3.57143C5.3457,3.57143,5.86133,3.13147,5.97266,2.52277L6.20312,1.2631700000000001C6.23047,1.1104910000000001,6.35937,1,6.50977,1ZM15.2559,4.857139999999999C14.0547,4.857139999999999,13.0215,3.97522,12.7988,2.75982L12.7129,2.28571L7.28711,2.28571L7.20117,2.75982C6.98047,3.97522,5.94727,4.857139999999999,4.74414,4.857139999999999L2.5,4.857139999999999C1.81055,4.857139999999999,1.25,5.43371,1.25,6.14286L1.25,16.4286C1.25,17.1377,1.81055,17.7143,2.5,17.7143L17.5,17.7143C18.1895,17.7143,18.75,17.1377,18.75,16.4286L18.75,6.14286C18.75,5.43371,18.1895,4.857139999999999,17.5,4.857139999999999L15.2559,4.857139999999999ZM4.375,6.78571L3.125,6.78571C2.7793,6.78571,2.5,6.49844,2.5,6.14286C2.5,5.78728,2.7793,5.5,3.125,5.5L4.375,5.5C4.7207,5.5,5,5.78728,5,6.14286C5,6.49844,4.7207,6.78571,4.375,6.78571ZM10,6.14286C7.06641,6.14286,4.6875,8.58973,4.6875,11.6071C4.6875,14.6246,7.06641,17.0714,10,17.0714C12.9336,17.0714,15.3125,14.6246,15.3125,11.6071C15.3125,8.58973,12.9336,6.14286,10,6.14286ZM10,7.42857C11.0859,7.42857,12.1055,7.8625,12.873,8.65201C13.6406,9.44152,14.0625,10.49018,14.0625,11.6071C14.0625,12.7241,13.6406,13.7728,12.873,14.5623C12.1055,15.3518,11.0859,15.7857,10,15.7857C8.91406,15.7857,7.89453,15.3518,7.12695,14.5623C6.35937,13.7728,5.9375,12.7241,5.9375,11.6071C5.9375,10.49018,6.35938,9.44152,7.12695,8.65201C7.89453,7.8625,8.91406,7.42857,10,7.42857ZM10,9.67857C8.96484,9.67857,8.125,10.54241,8.125,11.6071C8.125,12.6719,8.96484,13.5357,10,13.5357C11.0352,13.5357,11.875,12.6719,11.875,11.6071C11.875,10.54241,11.0352,9.67857,10,9.67857ZM10,10.96429C10.3438,10.96429,10.625,11.2536,10.625,11.6071C10.625,11.9607,10.3438,12.25,10,12.25C9.65625,12.25,9.375,11.9607,9.375,11.6071C9.375,11.2536,9.65625,10.96429,10,10.96429Z"></path></svg><span></span></div><div class="item tools"></div></div>'), k0 = /* @__PURE__ */ y("<span></span>"), Nc = /* @__PURE__ */ y('<svg viewBox="0 0 20 20"><path d="M1.08108,0L0,1.079L4.18919,5.27938L2.54826,6.91715L6.9112,6.91715L6.9112,2.56262L5.28957,4.18112L1.08108,0ZM15.8108,5.27938L20,1.079L18.9189,0L14.7104,4.18112L13.0888,2.56262L13.0888,6.91715L17.4517,6.91715L15.8108,5.27938ZM4.16988,14.7014L0.07722,18.8054L1.1583,20L5.27027,15.7996L6.9112,17.4374L6.9112,13.0829L2.54826,13.0829L4.16988,14.7014ZM17.4517,13.0829L13.0888,13.0829L13.0888,17.4374L14.7297,15.7996L18.8417,20L19.9228,18.8054L15.8301,14.7013L17.4517,13.0829Z"></path></svg>'), Pc = /* @__PURE__ */ y('<svg viewBox="0 0 20 20"><path d="M2.93444,1.76899L7.57544,6.40999L6.38918,7.59626L1.76899,2.93444L0,4.70343L0,0L4.70343,0L2.93444,1.76899ZM6.40999,12.4037L1.76899,17.0447L0,15.2758L0,19.9792L4.70343,19.9792L2.93444,18.2102L7.57544,13.5692L6.40999,12.4037ZM15.2758,0L17.0447,1.76899L12.4037,6.40999L13.59,7.59626L18.231,2.95526L20,4.72425L20,0L15.2758,0ZM13.5692,12.4037L12.3829,13.59L17.0239,18.231L15.2549,20L19.9792,20L19.9792,15.2758L18.2102,17.0447L13.5692,12.4037Z"></path></svg>'), Oc = (e) => {
  let t;
  const [n, r] = A(!1), a = () => {
    r((i) => !i);
  };
  return V9(() => {
    document.addEventListener("fullscreenchange", a), document.addEventListener("mozfullscreenchange", a), document.addEventListener("webkitfullscreenchange", a), document.addEventListener("msfullscreenchange", a);
  }), B0(() => {
    document.removeEventListener("fullscreenchange", a), document.removeEventListener("mozfullscreenchange", a), document.removeEventListener("webkitfullscreenchange", a), document.removeEventListener("msfullscreenchange", a);
  }), (() => {
    const i = Dc.cloneNode(!0), o = i.firstChild, s = o.firstChild, l = o.nextSibling, h = l.firstChild, d = h.nextSibling, p = l.nextSibling, $ = p.firstChild, k = $.nextSibling, P = p.nextSibling, Z = P.firstChild, z = Z.nextSibling, N = P.nextSibling, H = N.firstChild, O = H.nextSibling, S = N.nextSibling;
    return E0((M) => {
      t = M;
    }, i), y1(s, "click", e.onMenuClick, !0), L(i, m(W, {
      get when() {
        return e.symbol;
      },
      get children() {
        const M = Ic.cloneNode(!0), Q = M.firstChild;
        return y1(M, "click", e.onSymbolClick, !0), L(M, m(W, {
          get when() {
            return e.symbol.logo;
          },
          get children() {
            const t1 = Tc.cloneNode(!0);
            return G(() => r1(t1, "src", e.symbol.logo)), t1;
          }
        }), Q), L(Q, () => e.symbol.shortName ?? e.symbol.name ?? e.symbol.ticker), M;
      }
    }), l), L(i, () => e.periods.map((M) => (() => {
      const Q = k0.cloneNode(!0);
      return Q.$$click = () => {
        e.onPeriodChange(M);
      }, L(Q, () => M.text), G(() => $1(Q, `item period ${M.text === e.period.text ? "selected" : ""}`)), Q;
    })()), l), y1(l, "click", e.onIndicatorClick, !0), L(d, () => f("indicator", e.locale)), y1(p, "click", e.onTimezoneClick, !0), L(k, () => f("timezone", e.locale)), y1(P, "click", e.onSettingClick, !0), L(z, () => f("setting", e.locale)), y1(N, "click", e.onScreenshotClick, !0), L(O, () => f("screenshot", e.locale)), S.$$click = () => {
      if (n())
        (document.exitFullscreen ?? document.msExitFullscreen ?? document.mozCancelFullScreen ?? document.webkitExitFullscreen).call(document);
      else {
        const M = t == null ? void 0 : t.parentElement;
        M && (M.requestFullscreen ?? M.webkitRequestFullscreen ?? M.mozRequestFullScreen ?? M.msRequestFullscreen).call(M);
      }
    }, L(S, (() => {
      const M = Y(() => !!n());
      return () => M() ? [Nc.cloneNode(!0), (() => {
        const Q = k0.cloneNode(!0);
        return L(Q, () => f("exit_full_screen", e.locale)), Q;
      })()] : [Pc.cloneNode(!0), (() => {
        const Q = k0.cloneNode(!0);
        return L(Q, () => f("full_screen", e.locale)), Q;
      })()];
    })()), G(() => r1(s, "class", e.spread ? "" : "rotate")), i;
  })();
};
o1(["click"]);
const Bc = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M12.41465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L12.41465,12C12.20873,12.5826,11.65311,13,11,13C10.34689,13,9.79127,12.5826,9.58535,12L3.5,12C3.223857,12,3,11.77614,3,11.5C3,11.22386,3.223857,11,3.5,11L9.58535,11C9.79127,10.417404,10.34689,10,11,10C11.65311,10,12.20873,10.417404,12.41465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), Ec = () => Bc.cloneNode(!0), Fc = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,11L11.08535,11C11.29127,10.417404,11.84689,10,12.5,10C13.15311,10,13.70873,10.417404,13.91465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L13.91465,12C13.70873,12.5826,13.15311,13,12.5,13C11.84689,13,11.29127,12.5826,11.08535,12L6.91465,12C6.70873,12.5826,6.15311,13,5.5,13C4.671573,13,4,12.32843,4,11.5C4,10.671573,4.671573,10,5.5,10C6.15311,10,6.70873,10.417404,6.91465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), Kc = () => Fc.cloneNode(!0), jc = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,12.5C6.70873,13.0826,6.15311,13.5,5.5,13.5C4.671573,13.5,4,12.82843,4,12C4,11.171573,4.671573,10.5,5.5,10.5C6.15311,10.5,6.70873,10.917404,6.91465,11.5L16.0853,11.5C16.2913,10.917404,16.846899999999998,10.5,17.5,10.5C18.328400000000002,10.5,19,11.171573,19,12C19,12.82843,18.328400000000002,13.5,17.5,13.5C16.846899999999998,13.5,16.2913,13.0826,16.0853,12.5L6.91465,12.5Z" stroke-opacity="0" stroke="none"></path></svg>'), Zc = () => jc.cloneNode(!0), Qc = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,12.41465L11,18.5C11,18.7761,11.22386,19,11.5,19C11.77614,19,12,18.7761,12,18.5L12,12.41465C12.5826,12.20873,13,11.65311,13,11C13,10.34689,12.5826,9.79127,12,9.58535L12,3.5C12,3.223857,11.77614,3,11.5,3C11.22386,3,11,3.223857,11,3.5L11,9.58535C10.417404,9.79127,10,10.34689,10,11C10,11.65311,10.417404,12.20873,11,12.41465Z" stroke-opacity="0" stroke="none"></path></svg>'), zc = () => Qc.cloneNode(!0), Rc = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.66558837890625,19C10.83716137890625,19,10.16558837890625,18.328400000000002,10.16558837890625,17.5C10.16558837890625,16.846899999999998,10.58298437890625,16.2913,11.16557337890625,16.0854L11.16557337890625,11.91464C10.58298437890625,11.70872,10.16558837890625,11.1531,10.16558837890625,10.5C10.16558837890625,9.8469,10.58298437890625,9.29128,11.16557337890625,9.08536L11.16557337890625,4.5C11.16557337890625,4.223857,11.38942837890625,4,11.66556837890625,4C11.94171837890625,4,12.16556837890625,4.223857,12.16556837890625,4.5L12.16556837890625,9.08535C12.74817837890625,9.291260000000001,13.16558837890625,9.846879999999999,13.16558837890625,10.5C13.16558837890625,11.153120000000001,12.74817837890625,11.708739999999999,12.16556837890625,11.91465L12.16556837890625,16.0854C12.74817837890625,16.2913,13.16558837890625,16.846899999999998,13.16558837890625,17.5C13.16558837890625,18.328400000000002,12.49401837890625,19,11.66558837890625,19Z" stroke-opacity="0" stroke="none"></path></svg>'), Uc = () => Rc.cloneNode(!0), Yc = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.165603637695312,6.91465C11.748203637695312,6.70873,12.165603637695312,6.15311,12.165603637695312,5.5C12.165603637695312,4.671573,11.494033637695313,4,10.665603637695312,4C9.837176637695313,4,9.165603637695312,4.671573,9.165603637695312,5.5C9.165603637695312,6.15311,9.583007637695312,6.70873,10.165603637695312,6.91465L10.165603637695312,16.0854C9.583007637695312,16.2913,9.165603637695312,16.846899999999998,9.165603637695312,17.5C9.165603637695312,18.328400000000002,9.837176637695313,19,10.665603637695312,19C11.494033637695313,19,12.165603637695312,18.328400000000002,12.165603637695312,17.5C12.165603637695312,16.846899999999998,11.748203637695312,16.2913,11.165603637695312,16.0854L11.165603637695312,6.91465Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Hc = () => Yc.cloneNode(!0), Vc = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.146447,15.753C4.9511845,15.9483,4.9511845,16.2649,5.146447,16.4602C5.341709,16.6554,5.658291,16.6554,5.853554,16.4602L8.156600000000001,14.15711C8.352409999999999,14.25082,8.57173,14.3033,8.8033,14.3033C9.631730000000001,14.3033,10.3033,13.63172,10.3033,12.80329C10.3033,12.57172,10.250820000000001,12.352409999999999,10.157119999999999,12.15659L12.156600000000001,10.15711C12.352409999999999,10.250820000000001,12.571729999999999,10.30329,12.8033,10.30329C13.63173,10.30329,14.3033,9.63172,14.3033,8.80329C14.3033,8.57172,14.25082,8.352409999999999,14.15712,8.15659L16.4602,5.853553C16.6554,5.658291,16.6554,5.341709,16.4602,5.146447C16.2649,4.9511843,15.9483,4.9511843,15.753,5.146447L13.45001,7.449479999999999C13.25419,7.35577,13.03487,7.3032900000000005,12.8033,7.3032900000000005C11.97487,7.3032900000000005,11.3033,7.97487,11.3033,8.80329C11.3033,9.03487,11.35578,9.254190000000001,11.44949,9.450009999999999L9.450009999999999,11.449480000000001C9.254190000000001,11.35577,9.03487,11.30329,8.8033,11.30329C7.97487,11.30329,7.3033,11.97487,7.3033,12.80329C7.3033,13.03487,7.35578,13.25419,7.44949,13.45001L5.146447,15.753Z" stroke-opacity="0" stroke="none"></path></svg>'), Gc = () => Vc.cloneNode(!0), Xc = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M7.573332939453125,14.54567903564453C7.667042939453125,14.741499035644532,7.719512939453125,14.960809035644532,7.719512939453125,15.19239903564453C7.719512939453125,16.02079903564453,7.047942939453125,16.69239903564453,6.219512939453125,16.69239903564453C5.391085939453125,16.69239903564453,4.719512939453125,16.02079903564453,4.719512939453125,15.19239903564453C4.719512939453125,14.36394903564453,5.391085939453125,13.692379035644532,6.219512939453125,13.692379035644532C6.451092939453125,13.692379035644532,6.670412939453125,13.74485903564453,6.866232939453125,13.83856903564453L9.865702939453126,10.83909903564453C9.771992939453124,10.643279035644532,9.719512939453125,10.42395903564453,9.719512939453125,10.192379035644532C9.719512939453125,9.36394903564453,10.391082939453124,8.692379035644532,11.219512939453125,8.692379035644532C11.451092939453126,8.692379035644532,11.670412939453126,8.74485903564453,11.866232939453125,8.838569035644532L15.462112939453124,5.242645035644531C15.657412939453126,5.047383335644532,15.974012939453125,5.047383335644532,16.169212939453125,5.242645035644531C16.364512939453125,5.437907035644531,16.364512939453125,5.754489035644531,16.169212939453125,5.949752035644531L12.573332939453124,9.545679035644532C12.667042939453125,9.74149903564453,12.719512939453125,9.96080903564453,12.719512939453125,10.192379035644532C12.719512939453125,11.020809035644533,12.047942939453126,11.692379035644532,11.219512939453125,11.692379035644532C10.987942939453125,11.692379035644532,10.768632939453125,11.639909035644532,10.572812939453126,11.54619903564453L7.573332939453125,14.54567903564453Z" stroke-opacity="0" stroke="none"></path></svg>'), Jc = () => Xc.cloneNode(!0), Wc = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M15.719512939453125,8.461776733398438C16.547912939453127,8.461776733398438,17.219512939453125,7.7902067333984375,17.219512939453125,6.9617767333984375C17.219512939453125,6.133349733398438,16.547912939453127,5.4617767333984375,15.719512939453125,5.4617767333984375C14.891082939453124,5.4617767333984375,14.219512939453125,6.133349733398438,14.219512939453125,6.9617767333984375C14.219512939453125,7.193346733398437,14.271992939453124,7.412666733398438,14.365692939453124,7.608486733398438L7.366222939453126,14.607956733398437C7.170402939453125,14.514256733398437,6.951082939453125,14.461776733398438,6.719512939453125,14.461776733398438C5.891085939453125,14.461776733398438,5.219512939453125,15.133346733398437,5.219512939453125,15.961776733398438C5.219512939453125,16.79017673339844,5.891085939453125,17.461776733398438,6.719512939453125,17.461776733398438C7.547942939453125,17.461776733398438,8.219512939453125,16.79017673339844,8.219512939453125,15.961776733398438C8.219512939453125,15.730176733398437,8.167032939453126,15.510876733398437,8.073322939453124,15.315066733398437L15.072802939453124,8.315586733398437C15.268612939453124,8.409296733398438,15.487912939453125,8.461776733398438,15.719512939453125,8.461776733398438Z" stroke-opacity="0" stroke="none"></path></svg>'), qc = () => Wc.cloneNode(!0), el = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17.0643,7.033864912109375L18,3.585784912109375L14.5078,4.509695912109375L15.3537,5.344934912109375L6.02026,14.560584912109375C5.87635,14.517484912109374,5.72366,14.494284912109375,5.5655,14.494284912109375C4.7009,14.494284912109375,4,15.186384912109375,4,16.040084912109375C4,16.893784912109375,4.7009,17.585784912109375,5.5655,17.585784912109375C6.43011,17.585784912109375,7.13101,16.893784912109375,7.13101,16.040084912109375C7.13101,15.722284912109375,7.03392,15.426984912109376,6.86744,15.181384912109374L16.0917,6.073604912109375L17.0643,7.033864912109375Z" stroke-opacity="0" stroke="none"></path></svg>'), tl = () => el.cloneNode(!0), nl = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,13.00505L18.5,13.00505C18.7761,13.00505,19,13.228909999999999,19,13.50505C19,13.781189999999999,18.7761,14.00505,18.5,14.00505L6.91465,14.00505C6.70873,14.58765,6.15311,15.00505,5.5,15.00505C4.671573,15.00505,4,14.33348,4,13.50505C4,12.67662,4.671573,12.00505,5.5,12.00505C6.15311,12.00505,6.70873,12.422450000000001,6.91465,13.00505ZM7.81404,11.625L10.48591,11.625L10.48591,10.90625L9.65193,10.90625L9.65193,7.125L8.997630000000001,7.125C8.71443,7.306641,8.415600000000001,7.419922,7.96443,7.498047L7.96443,8.05078L8.77497,8.05078L8.77497,10.90625L7.81404,10.90625L7.81404,11.625ZM11.081620000000001,11.625L14.0562,11.625L14.0562,10.88281L13.09724,10.88281C12.8863,10.88281,12.59333,10.90625,12.36482,10.93555C13.17537,10.11328,13.84724,9.2207,13.84724,8.39062C13.84724,7.541016,13.28865,7,12.4488,7C11.84333,7,11.446850000000001,7.234375,11.03279,7.679688L11.52497,8.16797C11.747630000000001,7.914062,12.0113,7.697266,12.33552,7.697266C12.7613,7.697266,13.00154,7.982422,13.00154,8.43359C13.00154,9.14648,12.29255,10.00781,11.081620000000001,11.11523L11.081620000000001,11.625ZM15.9605,11.75C16.8121,11.75,17.526899999999998,11.2832,17.526899999999998,10.4375C17.526899999999998,9.82031,17.142200000000003,9.43945,16.6441,9.30078L16.6441,9.27148C17.1129,9.08594,17.3824,8.7207,17.3824,8.21289C17.3824,7.421875,16.8004,7,15.9429,7C15.4215,7,14.9957,7.210938,14.6109,7.541016L15.066,8.11133C15.3258,7.849609,15.5836,7.697266,15.9019,7.697266C16.2789,7.697266,16.4957,7.914062,16.4957,8.28125C16.4957,8.70898,16.2301,9,15.4215,9L15.4215,9.63672C16.3804,9.63672,16.6383,9.91992,16.6383,10.38086C16.6383,10.79688,16.3336,11.03125,15.8824,11.03125C15.4742,11.03125,15.1578,10.82227,14.8922,10.55078L14.4781,11.13281C14.7906,11.486329999999999,15.2652,11.75,15.9605,11.75Z" stroke-opacity="0" stroke="none"></path></svg>'), rl = () => nl.cloneNode(!0), al = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.146447,14.178126025390625C2.9511847,13.982826025390626,2.9511847,13.666226025390625,3.146447,13.470926025390625L7.39146,9.225966025390626C7.35417,9.095106025390624,7.33421,8.956946025390625,7.33421,8.814116025390625C7.33421,7.985696025390625,8.00578,7.314116025390625,8.834209999999999,7.314116025390625C8.97703,7.314116025390625,9.11519,7.334086025390625,9.24605,7.371366025390625L13.753,2.864373025390625C13.9483,2.669110325390625,14.2649,2.669110325390625,14.4602,2.864373025390625C14.6554,3.059635025390625,14.6554,3.376217025390625,14.4602,3.571479025390625L10.06916,7.962476025390625C10.23631,8.204386025390626,10.334209999999999,8.497826025390625,10.334209999999999,8.814116025390625C10.334209999999999,9.642546025390626,9.66264,10.314116025390625,8.834209999999999,10.314116025390625C8.51791,10.314116025390625,8.22448,10.216226025390625,7.98256,10.049076025390626L3.853554,14.178126025390625C3.658291,14.373326025390625,3.341709,14.373326025390625,3.146447,14.178126025390625ZM7.67736,19.188526025390626C7.4821,18.993226025390626,7.4821,18.676626025390625,7.67736,18.481426025390626L9.9804,16.178326025390625C9.88669,15.982526025390625,9.834209999999999,15.763226025390624,9.834209999999999,15.531626025390626C9.834209999999999,14.703226025390626,10.50578,14.031626025390626,11.33421,14.031626025390626C11.56579,14.031626025390626,11.78511,14.084126025390624,11.98093,14.177826025390624L13.9804,12.178356025390626C13.8867,11.982536025390624,13.8342,11.763216025390625,13.8342,11.531636025390625C13.8342,10.703206025390624,14.5058,10.031636025390625,15.3342,10.031636025390625C15.5658,10.031636025390625,15.7851,10.084116025390625,15.9809,10.177826025390626L18.284,7.874796025390625C18.4792,7.679536025390625,18.7958,7.679536025390625,18.9911,7.874796025390625C19.1863,8.070056025390624,19.1863,8.386636025390626,18.9911,8.581906025390625L16.688000000000002,10.884936025390624C16.7817,11.080756025390626,16.8342,11.300066025390626,16.8342,11.531636025390625C16.8342,12.360066025390624,16.162599999999998,13.031626025390626,15.3342,13.031626025390626C15.1026,13.031626025390626,14.8833,12.979126025390626,14.6875,12.885426025390625L12.68803,14.884926025390625C12.78174,15.080726025390625,12.83421,15.300026025390626,12.83421,15.531626025390626C12.83421,16.360026025390624,12.16264,17.031626025390626,11.33421,17.031626025390626C11.10264,17.031626025390626,10.88333,16.979126025390627,10.68751,16.885426025390625L8.38446,19.188526025390626C8.1892,19.383726025390626,7.87262,19.383726025390626,7.67736,19.188526025390626Z" stroke-opacity="0" stroke="none"></path></svg>'), il = () => al.cloneNode(!0), sl = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.3367688759765626,12.63173C3.5320318759765623,12.82699,3.8486138759765627,12.82699,4.043876875976562,12.63173L11.822052875976562,4.853553C12.017312875976563,4.658291,12.017312875976563,4.341708,11.822052875976562,4.146446C11.626792875976562,3.9511843,11.310202875976563,3.9511843,11.114942875976563,4.146446L3.3367688759765626,11.92462C3.1415071759765625,12.11988,3.1415071759765625,12.43647,3.3367688759765626,12.63173ZM5.001492875976562,17.0351C4.806232875976562,16.8399,4.806232875976562,16.5233,5.001492875976562,16.328L7.304532875976562,14.025C7.210822875976563,13.82916,7.158352875976563,13.60984,7.158352875976563,13.37827C7.158352875976563,12.54984,7.829922875976562,11.87827,8.658352875976561,11.87827C8.889922875976563,11.87827,9.109232875976563,11.93075,9.305052875976562,12.02446L11.304532875976562,10.02498C11.210822875976563,9.82916,11.158352875976561,9.60984,11.158352875976561,9.37827C11.158352875976561,8.54984,11.829922875976562,7.8782700000000006,12.658352875976563,7.8782700000000006C12.889922875976563,7.8782700000000006,13.109232875976563,7.93075,13.305022875976562,8.024460000000001L15.608122875976562,5.72142C15.803322875976562,5.5261499999999995,16.119922875976563,5.5261499999999995,16.315222875976563,5.72142C16.510422875976563,5.9166799999999995,16.510422875976563,6.23326,16.315222875976563,6.42852L14.012122875976562,8.73156C14.105822875976562,8.92738,14.158322875976562,9.1467,14.158322875976562,9.37827C14.158322875976562,10.2067,13.486822875976562,10.87827,12.658352875976563,10.87827C12.426772875976562,10.87827,12.207452875976562,10.82579,12.011642875976563,10.73209L10.012162875976562,12.73156C10.105872875976562,12.92738,10.158352875976561,13.1467,10.158352875976561,13.37827C10.158352875976561,14.2067,9.486772875976563,14.8783,8.658352875976561,14.8783C8.426772875976562,14.8783,8.207452875976562,14.8258,8.011642875976563,14.7321L5.708602875976562,17.0351C5.513342875976562,17.2304,5.196752875976562,17.2304,5.001492875976562,17.0351ZM10.415712875976563,18.328C10.220452875976562,18.5233,9.903862875976563,18.5233,9.708602875976563,18.328C9.513342875976562,18.1328,9.513342875976562,17.816200000000002,9.708602875976563,17.6209L12.304532875976562,15.025C12.210822875976563,14.8292,12.158352875976563,14.6098,12.158352875976563,14.3783C12.158352875976563,13.54984,12.829922875976562,12.87827,13.658322875976562,12.87827C13.889922875976563,12.87827,14.109222875976563,12.93075,14.305022875976562,13.02446L17.486822875976564,9.84274C17.682022875976564,9.64747,17.99862287597656,9.64747,18.19392287597656,9.84274C18.38912287597656,10.038,18.38912287597656,10.35458,18.19392287597656,10.54984L15.012122875976562,13.73156C15.105822875976562,13.92738,15.158322875976562,14.1467,15.158322875976562,14.3783C15.158322875976562,15.2067,14.486822875976562,15.8783,13.658322875976562,15.8783C13.426822875976562,15.8783,13.207422875976562,15.8258,13.011642875976563,15.7321L10.415712875976563,18.328Z" stroke-opacity="0" stroke="none"></path></svg>'), ol = () => sl.cloneNode(!0), cl = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M13.1889,6C12.98303,6.582599999999999,12.42741,7,11.7743,7C11.12119,7,10.565570000000001,6.582599999999999,10.35965,6L3.5,6C3.223857,6,3,5.77614,3,5.5C3,5.22386,3.223857,5,3.5,5L10.35965,5C10.565570000000001,4.417404,11.12119,4,11.7743,4C12.42741,4,12.98303,4.417404,13.1889,5L18.5,5C18.7761,5,19,5.22386,19,5.5C19,5.77614,18.7761,6,18.5,6L13.1889,6ZM3,8.5C3,8.22386,3.223857,8,3.5,8L18.5,8C18.7761,8,19,8.22386,19,8.5C19,8.77614,18.7761,9,18.5,9L3.5,9C3.223857,9,3,8.77614,3,8.5ZM3.278549,11.5C3.278549,11.22386,3.502407,11,3.778549,11L18.7785,11C19.0547,11,19.2785,11.22386,19.2785,11.5C19.2785,11.77614,19.0547,12,18.7785,12L3.778549,12C3.502407,12,3.278549,11.77614,3.278549,11.5ZM3.139267,14.5C3.139267,14.2239,3.363124,14,3.6392670000000003,14L18.6393,14C18.915399999999998,14,19.1393,14.2239,19.1393,14.5C19.1393,14.7761,18.915399999999998,15,18.6393,15L3.6392670000000003,15C3.363124,15,3.139267,14.7761,3.139267,14.5ZM13.1889,18C12.98303,18.5826,12.42741,19,11.7743,19C11.12119,19,10.565570000000001,18.5826,10.35965,18L3.778549,18C3.502407,18,3.278549,17.7761,3.278549,17.5C3.278549,17.2239,3.502407,17,3.778549,17L10.35965,17C10.565570000000001,16.4174,11.12119,16,11.7743,16C12.42741,16,12.98303,16.4174,13.1889,17L18.7785,17C19.0547,17,19.2785,17.2239,19.2785,17.5C19.2785,17.7761,19.0547,18,18.7785,18L13.1889,18Z" stroke-opacity="0" stroke="none"></path></svg>'), ll = () => cl.cloneNode(!0), ul = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4.91465,6C4.70873,6.582599999999999,4.15311,7,3.5,7C2.671573,7,2,6.32843,2,5.5C2,4.671573,2.671573,4,3.5,4C4.15311,4,4.70873,4.417404,4.91465,5L18.2257,5C18.5018,5,18.7257,5.22386,18.7257,5.5C18.7257,5.77614,18.5018,6,18.2257,6L4.91465,6ZM2.7257,8.5C2.7257,8.22386,2.949558,8,3.2257,8L18.2257,8C18.5018,8,18.7257,8.22386,18.7257,8.5C18.7257,8.77614,18.5018,9,18.2257,9L3.2257,9C2.949558,9,2.7257,8.77614,2.7257,8.5ZM3.00425,11.5C3.00425,11.22386,3.22811,11,3.50425,11L18.5042,11C18.7804,11,19.0042,11.22386,19.0042,11.5C19.0042,11.77614,18.7804,12,18.5042,12L3.50425,12C3.22811,12,3.00425,11.77614,3.00425,11.5ZM2.864967,14.5C2.864967,14.2239,3.08882,14,3.36497,14L18.365,14C18.6411,14,18.865,14.2239,18.865,14.5C18.865,14.7761,18.6411,15,18.365,15L3.36497,15C3.08882,15,2.864967,14.7761,2.864967,14.5ZM20,17.5C20,18.328400000000002,19.3284,19,18.5,19C17.846899999999998,19,17.2913,18.5826,17.0854,18L3.50425,18C3.22811,18,3.00425,17.7761,3.00425,17.5C3.00425,17.2239,3.22811,17,3.50425,17L17.0854,17C17.2913,16.4174,17.846899999999998,16,18.5,16C19.3284,16,20,16.671599999999998,20,17.5Z" stroke-opacity="0" stroke="none"></path></svg>'), fl = () => ul.cloneNode(!0), dl = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="5" ry="5" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="3" ry="3" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse></svg>'), Cl = () => dl.cloneNode(!0), hl = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3,7.32468C5.90649,3.3893050000000002,11.49833,2.81306,14.6674,6.31944C14.9056,6.1554199999999994,15.192,6.05979,15.5,6.05979C15.845,6.05979,16.1628,6.17974,16.4162,6.381349999999999L18.4509,4.23827L19,4.816615L16.8945,7.03429C16.962600000000002,7.21075,17,7.40319,17,7.60463C17,8.45782,16.328400000000002,9.14947,15.5,9.14947C14.6716,9.14947,14,8.45782,14,7.60463C14,7.36402,14.0534,7.13625,14.1487,6.93322C11.32695,3.748365,6.25159,4.253956,3.612785,7.82695L3,7.32468ZM14.09,15.4717C15.7427,13.78985,16.244500000000002,11.524740000000001,15.5633,9.30134L15.5618,9.30134L16.3012,9.0502C17.072400000000002,11.56646,16.497700000000002,14.158,14.6282,16.0599C12.28737,18.442,8.62386,18.6988,6.41348,16.4501C4.5526,14.5572,4.52076,11.19671,6.36766,9.3177C7.89069,7.76754,10.07544,7.706189999999999,11.56741,9.22363C11.95453,9.61742,12.24817,10.08363,12.43369,10.57677L14.1451,8.77421L14.6942,9.35256L12.64982,11.50582C12.65827,11.59712,12.66295,11.68839,12.66378,11.77936C12.87398,12.04523,13,12.38451,13,12.7541C13,13.60729,12.32843,14.2989,11.5,14.2989C10.67157,14.2989,10,13.60729,10,12.7541C10,11.90091,10.67157,11.20926,11.5,11.20926C11.60387,11.20926,11.70528,11.220130000000001,11.8032,11.240829999999999L11.81763,11.22564C11.69858,10.71874,11.42858,10.21929,11.0284,9.81179C9.844000000000001,8.60765,8.136890000000001,8.65592,6.90822,9.90586C5.37975,11.460930000000001,5.40693,14.288,6.95404,15.8619C8.84598,17.7867,12.03496,17.5626,14.09,15.4717Z" stroke-opacity="0" stroke="none"></path></svg>'), gl = () => hl.cloneNode(!0), yl = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4,17.0854L4,3.5C4,3.223858,4.22386,3,4.5,3C4.77614,3,5,3.223858,5,3.5L5,10L7.57584,10L9.8127,4.46359C9.91614,4.20756,10.20756,4.08386,10.46359,4.1873000000000005C10.71963,4.29075,10.84333,4.58216,10.73988,4.8382000000000005L8.65438,10L11.08535,10C11.29127,9.4174,11.84689,9,12.5,9C12.65154,9,12.79784,9.02247,12.93573,9.06427L16.6464,5.35355C16.8417,5.15829,17.1583,5.15829,17.3536,5.35355C17.5488,5.54882,17.5488,5.8654,17.3536,6.06066L13.7475,9.66675C13.907,9.90508,14,10.19168,14,10.5C14,11.15311,13.5826,11.70873,13,11.91465L13,14.3638L18.3714,12.1936C18.6274,12.09015,18.918799999999997,12.21385,19.0222,12.46989C19.1257,12.72592,19.002,13.0173,18.746000000000002,13.1208L13,15.4423L13,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854ZM6.3729499999999994,17.0413L12,14.7678L12,11.91465C11.88136,11.87271,11.76956,11.81627,11.66675,11.74746L6.3729499999999994,17.0413ZM12,15.8463L6.6694700000000005,18L12,18L12,15.8463ZM6.38629,15.6137L8.250350000000001,11L11,11L6.38629,15.6137ZM5,11L7.17182,11L5,16.3754L5,11Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), pl = () => yl.cloneNode(!0), ml = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17,4.5C17,5.32843,16.328400000000002,6,15.5,6C15.0931,6,14.7241,5.83802,14.4539,5.57503L5.98992,8.32515C5.99658,8.38251,6,8.440850000000001,6,8.5C6,9.15311,5.582599999999999,9.70873,5,9.91465L5,11.08535C5.42621,11.236,5.763999999999999,11.57379,5.91465,12L19.5,12C19.7761,12,20,12.22386,20,12.5C20,12.77614,19.7761,13,19.5,13L5.91465,13C5.70873,13.5826,5.15311,14,4.5,14C3.671573,14,3,13.3284,3,12.5C3,11.84689,3.417404,11.29127,4,11.08535L4,9.91465C3.417404,9.70873,3,9.15311,3,8.5C3,7.67157,3.671573,7,4.5,7C4.90411,7,5.2709,7.15981,5.5406200000000005,7.41967L14.0093,4.66802C14.0032,4.6128599999999995,14,4.5568,14,4.5C14,3.671573,14.6716,3,15.5,3C16.328400000000002,3,17,3.671573,17,4.5ZM4,15.5C4,15.2239,4.22386,15,4.5,15L19.5,15C19.7761,15,20,15.2239,20,15.5C20,15.7761,19.7761,16,19.5,16L4.5,16C4.22386,16,4,15.7761,4,15.5ZM4,18.5C4,18.2239,4.22386,18,4.5,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L4.5,19C4.22386,19,4,18.7761,4,18.5Z" stroke-opacity="0" stroke="none"></path></svg>'), vl = () => ml.cloneNode(!0), _l = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M20,3.5C20,4.15311,19.5826,4.70873,19,4.91465L19,18.5C19,18.7761,18.7761,19,18.5,19L4.91465,19C4.70873,19.5826,4.15311,20,3.5,20C2.671573,20,2,19.3284,2,18.5C2,17.846899999999998,2.417404,17.2913,3,17.0854L3,3.5C3,3.22386,3.22386,3,3.5,3L17.0854,3C17.2913,2.417404,17.846899999999998,2,18.5,2C19.3284,2,20,2.671573,20,3.5ZM17.0854,4C17.236,4.42621,17.5738,4.763999999999999,18,4.91465L18,8L14,8L14,4L17.0854,4ZM13,4L13,8L9,8L9,4L13,4ZM13,9L9,9L9,13L13,13L13,9ZM13,14L9,14L9,18L13,18L13,14ZM14,18L14,14L18,14L18,18L14,18ZM18,13L14,13L14,9L18,9L18,13ZM4.91465,18C4.763999999999999,17.5738,4.42621,17.236,4,17.0854L4,14L8,14L8,18L4.91465,18ZM4,8L4,4L8,4L8,8L4,8ZM8,9L8,13L4,13L4,9L8,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Ll = () => _l.cloneNode(!0), $l = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" fill="none" stroke-opacity="1" stroke-width="1"></ellipse></svg>'), bl = () => $l.cloneNode(!0), xl = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.57625,6.9981C11.55099,6.999359999999999,11.52557,7,11.5,7C11.34,7,11.18584,6.97495,11.04125,6.9285499999999995L5.55401,16.4327C5.713760000000001,16.5905,5.83826,16.7839,5.91465,17L16.0854,17C16.2187,16.622700000000002,16.4987,16.314700000000002,16.8569,16.1445L11.57625,6.9981ZM12.50759,6.611219999999999C12.81005,6.336790000000001,13,5.94058,13,5.5C13,4.671573,12.32843,4,11.5,4C10.67157,4,10,4.671573,10,5.5C10,5.80059,10.08841,6.08052,10.24066,6.31522L4.64514,16.0069C4.59738,16.002299999999998,4.54896,16,4.5,16C3.671573,16,3,16.671599999999998,3,17.5C3,18.328400000000002,3.671573,19,4.5,19C5.15311,19,5.70873,18.5826,5.91465,18L16.0854,18C16.2913,18.5826,16.846899999999998,19,17.5,19C18.328400000000002,19,19,18.328400000000002,19,17.5C19,16.8365,18.5691,16.2735,17.971899999999998,16.075699999999998L12.50759,6.611219999999999Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), kl = () => xl.cloneNode(!0), Al = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19,4.5C19,5.15311,18.5826,5.70873,18,5.91465L18,18.5C18,18.7761,17.7761,19,17.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854L4,4.5C4,4.22386,4.22386,4,4.5,4L16.0854,4C16.2913,3.417404,16.846899999999998,3,17.5,3C18.328400000000002,3,19,3.671573,19,4.5ZM5,5L16.0854,5C16.236,5.42621,16.5738,5.763999999999999,17,5.91465L17,18L5.91465,18C5.763999999999999,17.5738,5.42621,17.236,5,17.0854L5,5Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), wl = () => Al.cloneNode(!0), Ml = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19.6401,7.99355C20.4028,7.92291,21,7.2811900000000005,21,6.5C21,5.671573,20.3284,5,19.5,5C18.8469,5,18.2913,5.417404,18.0854,6L7.62067,6C7.34453,6,7.12067,6.22386,7.12067,6.5C7.12067,6.5479,7.12741,6.59423,7.13999,6.63809L3.2294099999999997,15.0243C2.530138,15.1517,2,15.764,2,16.5C2,17.328400000000002,2.671573,18,3.5,18C4.15311,18,4.70873,17.5826,4.91465,17L14.5963,17C14.6456,17.076,14.7162,17.1396,14.8044,17.1807C15.0546,17.2974,15.3521,17.1891,15.4688,16.9388L19.6401,7.99355ZM14.7896,16.0293L18.6551,7.739599999999999C18.3942,7.56144,18.1925,7.30307,18.0854,7L8.0746,7L4.25044,15.2009C4.55701,15.3784,4.79493,15.6613,4.91465,16L14.6207,16C14.68,16,14.7368,16.0103,14.7896,16.0293Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Sl = () => Ml.cloneNode(!0), Tl = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.134443814697265,7.494615087890625L8.764323814697265,7.494615087890625L8.764323814697265,3.414215087890625L8.310223814697267,3.414215087890625L7.294603814697266,4.005035087890625L7.289713814697266,4.634915087890625L8.134443814697265,4.149892087890625L8.134443814697265,7.494615087890625ZM18.832003814697266,6.933095087890624Q19.004603814697266,6.635245087890625,19.004603814697266,6.2543850878906255Q19.004603814697266,5.884915087890625,18.845103814697264,5.593575087890625Q18.685503814697267,5.3006050878906255,18.399103814697266,5.136225087890625Q18.114303814697266,4.9702050878906245,17.754603814697266,4.9653250878906245L18.820603814697265,3.840647087890625L18.820603814697265,3.414215087890625L16.519203814697264,3.414215087890625L16.519203814697264,3.939931087890625L18.050803814697264,3.939931087890625L16.719403814697266,5.334785087890625L17.074203814697263,5.7205350878906245Q17.254903814697265,5.484525087890625,17.619503814697268,5.484525087890625Q17.980803814697268,5.484525087890625,18.187503814697266,5.689605087890625Q18.394203814697267,5.894685087890625,18.394203814697267,6.2543850878906255Q18.394203814697267,6.604315087890625,18.187503814697266,6.822415087890625Q17.980803814697268,7.0405150878906255,17.640603814697265,7.0405150878906255Q17.334603814697267,7.0405150878906255,17.124703814697266,6.890775087890625Q16.914703814697265,6.739415087890626,16.820303814697265,6.469225087890624L16.354803814697263,6.744295087890626Q16.480103814697266,7.125155087890625,16.821903814697265,7.341625087890625Q17.165403814697264,7.559725087890625,17.640603814697265,7.559725087890625Q18.039403814697266,7.559725087890625,18.348603814697267,7.393705087890625Q18.659503814697267,7.229315087890625,18.832003814697266,6.933095087890624ZM10.000003814697266,10.634915087890626C10.000003814697266,11.024655087890626,9.851363814697265,11.379685087890625,9.607683814697266,11.646395087890625L12.168903814697266,15.171615087890626C12.275403814697265,15.147615087890625,12.386203814697266,15.134915087890626,12.500003814697266,15.134915087890626C12.596503814697266,15.134915087890626,12.690803814697265,15.144015087890624,12.782303814697265,15.161415087890624L16.108803814697268,11.196955087890625C16.038703814697264,11.023375087890624,16.000003814697266,10.833655087890625,16.000003814697266,10.634915087890626C16.000003814697266,9.806495087890625,16.671603814697264,9.134915087890626,17.500003814697266,9.134915087890626C18.328403814697264,9.134915087890626,19.000003814697266,9.806495087890625,19.000003814697266,10.634915087890626C19.000003814697266,11.463345087890625,18.328403814697264,12.134915087890626,17.500003814697266,12.134915087890626C17.239503814697265,12.134915087890626,16.994503814697268,12.068495087890625,16.781003814697264,11.951675087890624L13.654703814697266,15.677415087890624C13.870303814697266,15.937215087890625,14.000003814697266,16.270915087890625,14.000003814697266,16.634915087890626C14.000003814697266,17.463315087890624,13.328403814697266,18.134915087890626,12.500003814697266,18.134915087890626C11.671573814697265,18.134915087890626,11.000003814697266,17.463315087890624,11.000003814697266,16.634915087890626C11.000003814697266,16.284415087890626,11.120193814697265,15.962015087890626,11.321603814697266,15.706715087890625L8.715393814697265,12.119565087890624C8.645053814697267,12.129685087890625,8.573143814697266,12.134915087890626,8.500003814697266,12.134915087890626C8.162103814697264,12.134915087890626,7.8503038146972655,12.023195087890626,7.599523814697266,11.834665087890626L4.505583814697266,15.521915087890624C4.809213814697266,15.796415087890624,5.000003814697266,16.193415087890624,5.000003814697266,16.634915087890626C5.000003814697266,17.463315087890624,4.328433814697266,18.134915087890626,3.5000038146972656,18.134915087890626C2.6715768146972656,18.134915087890626,2.0000038146972656,17.463315087890624,2.0000038146972656,16.634915087890626C2.0000038146972656,15.806515087890626,2.6715768146972656,15.134915087890626,3.5000038146972656,15.134915087890626C3.508253814697266,15.134915087890626,3.5164838146972657,15.135015087890626,3.524703814697266,15.135115087890625L7.033823814697266,10.953115087890625C7.011673814697265,10.850565087890626,7.000003814697266,10.744105087890624,7.000003814697266,10.634915087890626C7.000003814697266,9.806495087890625,7.671573814697266,9.134915087890626,8.500003814697266,9.134915087890626C9.328433814697267,9.134915087890626,10.000003814697266,9.806495087890625,10.000003814697266,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Il = () => Tl.cloneNode(!0), Dl = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.13444,7.494615087890625L8.76432,7.494615087890625L8.76432,3.414215087890625L8.310220000000001,3.414215087890625L7.2946,4.005035087890625L7.28971,4.634915087890625L8.13444,4.149892087890625L8.13444,7.494615087890625ZM18.832,6.929835087890625Q19.0046,6.635245087890625,19.0046,6.2543850878906255Q19.0046,5.889805087890625,18.8451,5.5952050878906245Q18.6855,5.3006050878906255,18.3975,5.132965087890625Q18.1094,4.9653250878906245,17.7399,4.9653250878906245Q17.435499999999998,4.9653250878906245,17.1556,5.149245087890625L17.2793,3.939931087890625L18.8304,3.939931087890625L18.8304,3.414215087890625L16.7406,3.414215087890625L16.5094,5.665195087890625L17.0156,5.795405087890625Q17.095399999999998,5.655425087890626,17.2516,5.570795087890625Q17.4095,5.484525087890625,17.6357,5.484525087890625Q17.9694,5.484525087890625,18.1842,5.697745087890625Q18.4007,5.909335087890625,18.4007,6.2543850878906255Q18.4007,6.604315087890625,18.1842,6.822415087890625Q17.9694,7.0405150878906255,17.6292,7.0405150878906255Q17.3298,7.0405150878906255,17.119799999999998,6.890775087890625Q16.9098,6.739415087890626,16.825200000000002,6.474115087890625L16.3597,6.749175087890626Q16.470399999999998,7.110505087890624,16.807299999999998,7.335115087890625Q17.144199999999998,7.559725087890625,17.6292,7.559725087890625Q18.0296,7.559725087890625,18.3438,7.392075087890625Q18.6595,7.224435087890625,18.832,6.929835087890625ZM10,10.634915087890626C10,11.024655087890626,9.85136,11.379685087890625,9.60768,11.646395087890625L12.1689,15.171615087890626C12.2754,15.147615087890625,12.3862,15.134915087890626,12.5,15.134915087890626C12.5965,15.134915087890626,12.6908,15.144015087890624,12.7823,15.161415087890624L16.108800000000002,11.196955087890625C16.0387,11.023375087890624,16,10.833655087890625,16,10.634915087890626C16,9.806495087890625,16.671599999999998,9.134915087890626,17.5,9.134915087890626C18.3284,9.134915087890626,19,9.806495087890625,19,10.634915087890626C19,11.463345087890625,18.3284,12.134915087890626,17.5,12.134915087890626C17.2395,12.134915087890626,16.994500000000002,12.068505087890625,16.781,11.951675087890624L13.6547,15.677415087890624C13.8703,15.937215087890625,14,16.270915087890625,14,16.634915087890626C14,17.463315087890624,13.3284,18.134915087890626,12.5,18.134915087890626C11.67157,18.134915087890626,11,17.463315087890624,11,16.634915087890626C11,16.284415087890626,11.12019,15.962015087890626,11.3216,15.706715087890625L8.71539,12.119565087890624C8.645050000000001,12.129685087890625,8.57314,12.134915087890626,8.5,12.134915087890626C8.162099999999999,12.134915087890626,7.8503,12.023195087890626,7.59952,11.834665087890626L4.50558,15.521915087890624C4.80921,15.796415087890624,5,16.193415087890624,5,16.634915087890626C5,17.463315087890624,4.32843,18.134915087890626,3.5,18.134915087890626C2.671573,18.134915087890626,2,17.463315087890624,2,16.634915087890626C2,15.806515087890626,2.671573,15.134915087890626,3.5,15.134915087890626C3.5082500000000003,15.134915087890626,3.51648,15.135015087890626,3.5247,15.135115087890625L7.03382,10.953115087890625C7.01167,10.850565087890626,7,10.744105087890624,7,10.634915087890626C7,9.806495087890625,7.67157,9.134915087890626,8.5,9.134915087890626C9.32843,9.134915087890626,10,9.806495087890625,10,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Nl = () => Dl.cloneNode(!0), Pl = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M18.8532,7.020985087890625Q19.0257,6.734525087890625,19.0257,6.369945087890625Q19.0257,6.020005087890625,18.8499,5.754705087890625Q18.6758,5.489415087890626,18.3649,5.339675087890625Q18.5944,5.209465087890625,18.7214,4.994615087890625Q18.8499,4.779775087890625,18.8499,4.5193550878906255Q18.8499,4.2003480878906245,18.7002,3.951324087890625Q18.5505,3.700673087890625,18.277,3.557444087890625Q18.0052,3.414215087890625,17.6455,3.414215087890625Q17.285800000000002,3.414215087890625,17.0107,3.557444087890625Q16.7357,3.700673087890625,16.5843,3.951324087890625Q16.4346,4.2003480878906245,16.4346,4.5193550878906255Q16.4346,4.779775087890625,16.561500000000002,4.994615087890625Q16.6901,5.209465087890625,16.919600000000003,5.339675087890625Q16.6055,5.489415087890626,16.4297,5.757965087890625Q16.255499999999998,6.024895087890625,16.255499999999998,6.369945087890625Q16.255499999999998,6.734525087890625,16.4297,7.020985087890625Q16.6055,7.305815087890625,16.919600000000003,7.465325087890625Q17.2354,7.624825087890625,17.6455,7.624825087890625Q18.0557,7.624825087890625,18.3682,7.465325087890625Q18.6807,7.305815087890625,18.8532,7.020985087890625ZM8.76432,7.559725087890625L8.13444,7.559725087890625L8.13444,4.214996087890625L7.28971,4.700025087890625L7.2946,4.070139087890625L8.310220000000001,3.479319087890625L8.76432,3.479319087890625L8.76432,7.559725087890625ZM17.1816,4.955555087890625Q17.0042,4.784655087890625,17.0042,4.5095950878906255Q17.0042,4.229645087890625,17.18,4.057119087890625Q17.355800000000002,3.884592087890625,17.6455,3.884592087890625Q17.935200000000002,3.884592087890625,18.1077,4.057119087890625Q18.2803,4.229645087890625,18.2803,4.5095950878906255Q18.2803,4.784655087890625,18.1045,4.955555087890625Q17.930300000000003,5.124825087890625,17.6455,5.124825087890625Q17.3607,5.124825087890625,17.1816,4.955555087890625ZM18.2217,5.7953950878906255Q18.4398,6.005365087890625,18.4398,6.3552950878906245Q18.4398,6.705235087890625,18.2217,6.915195087890625Q18.0052,7.125155087890625,17.6455,7.125155087890625Q17.285800000000002,7.125155087890625,17.067700000000002,6.915195087890625Q16.849600000000002,6.705235087890625,16.849600000000002,6.3552950878906245Q16.849600000000002,6.005365087890625,17.064500000000002,5.7953950878906255Q17.2793,5.585435087890625,17.6455,5.585435087890625Q18.0052,5.585435087890625,18.2217,5.7953950878906255ZM9.60768,11.711495087890626C9.85136,11.444785087890626,10,11.089765087890626,10,10.700025087890625C10,9.871595087890626,9.32843,9.200025087890625,8.5,9.200025087890625C7.67157,9.200025087890625,7,9.871595087890626,7,10.700025087890625C7,10.809205087890625,7.01167,10.915665087890625,7.03382,11.018215087890624L3.5247,15.200215087890625C3.51648,15.200115087890625,3.5082500000000003,15.200015087890625,3.5,15.200015087890625C2.671573,15.200015087890625,2,15.871615087890625,2,16.700015087890627C2,17.528415087890625,2.671573,18.200015087890627,3.5,18.200015087890627C4.32843,18.200015087890627,5,17.528415087890625,5,16.700015087890627C5,16.258515087890625,4.80921,15.861515087890625,4.50558,15.587015087890626L7.59952,11.899765087890625C7.8503,12.088295087890625,8.162099999999999,12.200025087890625,8.5,12.200025087890625C8.57314,12.200025087890625,8.645050000000001,12.194785087890626,8.71539,12.184675087890625L11.3216,15.771815087890625C11.12019,16.027215087890625,11,16.349515087890623,11,16.700015087890627C11,17.528415087890625,11.67157,18.200015087890627,12.5,18.200015087890627C13.3284,18.200015087890627,14,17.528415087890625,14,16.700015087890627C14,16.336015087890623,13.8703,16.002315087890626,13.6547,15.742515087890625L16.781,12.016775087890625C16.994500000000002,12.133605087890626,17.2395,12.200025087890625,17.5,12.200025087890625C18.3284,12.200025087890625,19,11.528445087890624,19,10.700025087890625C19,9.871595087890626,18.3284,9.200025087890625,17.5,9.200025087890625C16.671599999999998,9.200025087890625,16,9.871595087890626,16,10.700025087890625C16,10.898765087890624,16.0387,11.088475087890625,16.108800000000002,11.262055087890625L12.7823,15.226515087890625C12.6908,15.209115087890625,12.5965,15.200015087890625,12.5,15.200015087890625C12.3862,15.200015087890625,12.2754,15.212715087890626,12.1689,15.236715087890625L9.60768,11.711495087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Ol = () => Pl.cloneNode(!0), Bl = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M9.474616630859375,7.494615087890625L8.844736630859375,7.494615087890625L8.844736630859375,4.149892087890625L8.000006630859374,4.634915087890625L8.004896630859374,4.005035087890625L9.020516630859376,3.414215087890625L9.474616630859375,3.414215087890625L9.474616630859375,7.494615087890625ZM18.529296630859378,4.8318550878906255Q18.307996630859375,5.028795087890625,18.122396630859377,5.385245087890625Q17.868496630859376,5.019035087890625,17.629196630859376,4.8269750878906255Q17.389996630859375,4.634915087890625,17.168596630859376,4.634915087890625Q16.794296630859375,4.634915087890625,16.522496630859376,4.976715087890625Q16.252296630859377,5.3168850878906255,16.252296630859377,5.7856350878906255Q16.252296630859377,6.218575087890625,16.502896630859375,6.521315087890625Q16.755196630859373,6.822415087890625,17.114896630859377,6.822415087890625Q17.368796630859375,6.822415087890625,17.588596630859374,6.625475087890624Q17.809896630859377,6.428535087890625,17.998696630859374,6.0688350878906245Q18.249396630859373,6.439935087890625,18.488596630859377,6.631985087890625Q18.727896630859377,6.822415087890625,18.952496630859375,6.822415087890625Q19.326796630859373,6.822415087890625,19.596996630859376,6.482245087890625Q19.868796630859375,6.140455087890626,19.868796630859375,5.671705087890626Q19.868796630859375,5.238755087890625,19.618196630859376,4.937655087890625Q19.367496630859375,4.634915087890625,19.006196630859375,4.634915087890625Q18.750696630859377,4.634915087890625,18.529296630859378,4.8318550878906255ZM18.337296630859377,5.674955087890625L18.278696630859375,5.596835087890625Q18.449596630859375,5.272935087890625,18.622096630859374,5.1101750878906245Q18.794596630859374,4.947415087890625,18.967096630859373,4.947415087890625Q19.194996630859375,4.947415087890625,19.346396630859374,5.1345950878906255Q19.497696630859377,5.320135087890625,19.497696630859377,5.598455087890625Q19.497696630859377,5.8914250878906245,19.360996630859376,6.096505087890625Q19.224296630859374,6.301585087890626,19.027396630859375,6.301585087890626Q18.915096630859374,6.301585087890626,18.742496630859375,6.146965087890624Q18.569996630859375,5.992335087890625,18.337296630859377,5.674955087890625ZM17.785496630859377,5.779125087890625L17.842496630859372,5.857245087890625Q17.668296630859373,6.186025087890625,17.495796630859374,6.348785087890625Q17.324896630859374,6.509915087890625,17.153996630859375,6.509915087890625Q16.926096630859377,6.509915087890625,16.774796630859377,6.324375087890624Q16.623396630859375,6.137195087890625,16.623396630859375,5.858875087890625Q16.623396630859375,5.565905087890625,16.761696630859376,5.360825087890625Q16.900096630859373,5.1557550878906255,17.095396630859376,5.1557550878906255Q17.228896630859374,5.1557550878906255,17.365596630859375,5.2778250878906245Q17.502296630859377,5.399895087890625,17.785496630859377,5.779125087890625ZM10.710296630859375,10.634915087890626C10.710296630859375,11.024655087890626,10.561656630859375,11.379685087890625,10.317976630859375,11.646395087890625L12.879196630859376,15.171615087890626C12.985696630859374,15.147615087890625,13.096496630859376,15.134915087890626,13.210296630859375,15.134915087890626C13.306796630859376,15.134915087890626,13.401096630859374,15.144015087890624,13.492596630859374,15.161415087890624L16.819096630859377,11.196955087890625C16.748996630859374,11.023375087890624,16.710296630859375,10.833655087890625,16.710296630859375,10.634915087890626C16.710296630859375,9.806495087890625,17.381896630859373,9.134915087890626,18.210296630859375,9.134915087890626C19.038696630859373,9.134915087890626,19.710296630859375,9.806495087890625,19.710296630859375,10.634915087890626C19.710296630859375,11.463345087890625,19.038696630859373,12.134915087890626,18.210296630859375,12.134915087890626C17.949796630859375,12.134915087890626,17.704796630859377,12.068505087890625,17.491296630859374,11.951675087890624L14.364996630859375,15.677415087890624C14.580596630859375,15.937215087890625,14.710296630859375,16.270915087890625,14.710296630859375,16.634915087890626C14.710296630859375,17.463315087890624,14.038696630859375,18.134915087890626,13.210296630859375,18.134915087890626C12.381866630859374,18.134915087890626,11.710296630859375,17.463315087890624,11.710296630859375,16.634915087890626C11.710296630859375,16.284415087890626,11.830486630859374,15.962015087890626,12.031896630859375,15.706715087890625L9.425686630859374,12.119565087890624C9.355346630859376,12.129685087890625,9.283436630859375,12.134915087890626,9.210296630859375,12.134915087890626C8.872396630859374,12.134915087890626,8.560596630859376,12.023195087890626,8.309816630859375,11.834665087890626L5.215876630859375,15.521915087890624C5.519506630859375,15.796415087890624,5.710296630859375,16.193415087890624,5.710296630859375,16.634915087890626C5.710296630859375,17.463315087890624,5.038726630859375,18.134915087890626,4.210296630859375,18.134915087890626C3.381869630859375,18.134915087890626,2.710296630859375,17.463315087890624,2.710296630859375,16.634915087890626C2.710296630859375,15.806515087890626,3.381869630859375,15.134915087890626,4.210296630859375,15.134915087890626C4.218546630859375,15.134915087890626,4.226776630859375,15.135015087890626,4.234996630859375,15.135115087890625L7.744116630859375,10.953115087890625C7.721966630859375,10.850565087890626,7.710296630859375,10.744105087890624,7.710296630859375,10.634915087890626C7.710296630859375,9.806495087890625,8.381866630859374,9.134915087890626,9.210296630859375,9.134915087890626C10.038726630859376,9.134915087890626,10.710296630859375,9.806495087890625,10.710296630859375,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), El = () => Bl.cloneNode(!0), Fl = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M21,5.5C21,6.32843,20.3284,7,19.5,7C19.4136,7,19.3289,6.99269,19.2465,6.97866L15.6257,15.5086C15.8587,15.7729,16,16.119999999999997,16,16.5C16,17.328400000000002,15.3284,18,14.5,18C13.8469,18,13.2913,17.5826,13.0854,17L3.91465,17C3.70873,17.5826,3.15311,18,2.5,18C1.671573,18,1,17.328400000000002,1,16.5C1,15.6716,1.671573,15,2.5,15C2.5840199999999998,15,2.66643,15.0069,2.74668,15.0202L6.36934,6.48574C6.13933,6.22213,6,5.87733,6,5.5C6,4.671573,6.67157,4,7.5,4C8.15311,4,8.70873,4.417404,8.91465,5L18.0854,5C18.2913,4.417404,18.8469,4,19.5,4C20.3284,4,21,4.671573,21,5.5ZM18.0854,6L8.91465,6C8.892579999999999,6.06243,8.8665,6.12296,8.83672,6.18128L13.9814,15.0921C14.143,15.0325,14.3177,15,14.5,15C14.584,15,14.6664,15.0069,14.7467,15.0202L18.3693,6.48574C18.2462,6.3446,18.149,6.1802,18.0854,6ZM13.2036,15.745L8.0861,6.8811800000000005C7.90605,6.95768,7.70797,7,7.5,7C7.41359,7,7.32888,6.99269,7.24647,6.97866L3.62571,15.5086C3.7512,15.651,3.8501,15.8174,3.91465,16L13.0854,16C13.1169,15.9108,13.1566,15.8255,13.2036,15.745Z" stroke-opacity="0" stroke="none"></path></svg>'), Kl = () => Fl.cloneNode(!0), jl = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.92159,5.93994C6.04014,5.90529,6.152620000000001,5.85639,6.25704,5.79523L9.12729,9.89437C9.045449999999999,10.07959,9,10.28449,9,10.5C9,10.79522,9.08529,11.07053,9.232569999999999,11.30262L4.97573,16.7511L5.92159,5.93994ZM4.92259,5.8848400000000005C4.38078,5.658659999999999,4,5.1238,4,4.5C4,3.671573,4.67157,3,5.5,3C6.2157,3,6.81433,3.50124,6.96399,4.17183L15.1309,4.88634C15.3654,4.36387,15.8902,4,16.5,4C17.328400000000002,4,18,4.67157,18,5.5C18,6.08983,17.659599999999998,6.60015,17.1645,6.84518L18.4264,14.0018C18.4508,14.0006,18.4753,14,18.5,14C19.3284,14,20,14.6716,20,15.5C20,16.328400000000002,19.3284,17,18.5,17C17.932499999999997,17,17.4386,16.6849,17.183799999999998,16.22L5.99686,18.5979C5.946429999999999,19.3807,5.29554,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.869300000000003,3.389292,17.3295,3.94071,17.1077L4.92259,5.8848400000000005ZM5.72452,17.6334C5.69799,17.596,5.6698,17.5599,5.64004,17.525100000000002L10.01843,11.92103C10.16958,11.97223,10.33155,12,10.5,12C10.80059,12,11.08052,11.91158,11.31522,11.75934L17.0606,15.0765C17.0457,15.1271,17.0335,15.1789,17.023899999999998,15.2317L5.72452,17.6334ZM11.92855,10.95875L17.4349,14.1379L16.1699,6.96356C15.9874,6.92257,15.8174,6.8483,15.6667,6.74746L11.99771,10.4165C11.99923,10.44414,12,10.47198,12,10.5C12,10.66,11.97495,10.814160000000001,11.92855,10.95875ZM10.5,9C10.259830000000001,9,10.03285,9.05644,9.83159,9.15679L7.04919,5.1831L15.0493,5.88302C15.054,5.90072,15.059,5.91829,15.0643,5.9357299999999995L11.56066,9.43934C11.28921,9.16789,10.91421,9,10.5,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Zl = () => jl.cloneNode(!0), Ql = /* @__PURE__ */ y('<svg viewBox="0 0 22 22"><path d="M4.727219638671875,8.007996215820313L9.973849638671876,2.7629472158203123C10.167279638671875,2.5696791158203123,10.480729638671875,2.5696791158203123,10.674169638671875,2.7629472158203123L13.223329638671874,5.311756215820313C13.416929638671874,5.505236215820313,13.416929638671874,5.8189862158203125,13.223329638671874,6.012466215820313L7.977129638671875,11.257906215820313C7.379859638671875,11.855176215820313,7.407609638671875,12.909396215820312,8.033809638671876,13.535596215820313C8.660409638671876,14.162596215820313,9.713849638671874,14.189996215820312,10.311129638671876,13.591896215820313L15.556929638671875,8.346066215820311C15.750429638671875,8.152526215820313,16.064229638671875,8.152526215820313,16.257629638671872,8.346066215820311L18.806529638671876,10.895266215820312C19.000029638671876,11.088746215820313,19.000029638671876,11.402496215820312,18.806529638671876,11.595976215820313L13.560629638671875,16.841796215820313C11.165619638671876,19.237196215820312,7.197149638671875,19.19919621582031,4.783499638671875,16.785496215820313C2.3698426386718747,14.371896215820312,2.331397638671875,10.403416215820313,4.727219638671875,8.007996215820313ZM12.172299638671875,5.662106215820312L10.323809638671875,3.8136162158203124L5.4287196386718755,8.709096215820313C3.422893638671875,10.714536215820312,3.4549956386718748,14.055196215820313,5.484999638671875,16.08479621582031C7.514609638671875,18.114796215820313,10.855289638671875,18.146496215820314,12.860719638671876,16.141096215820312L15.465629638671874,13.535796215820312L14.090929638671875,12.160756215820312L14.791629638671875,11.460436215820312L16.166229638671876,12.834996215820313L17.755829638671877,11.245226215820313L15.907729638671874,9.396736215820312L11.011839638671875,14.292596215820312C10.042809638671875,15.262396215820312,8.418249638671874,15.243796215820312,7.406019638671875,14.306496215820312L7.333099638671875,14.236296215820312C6.327599638671876,13.230796215820313,6.284009638671876,11.550396215820312,7.276419638671875,10.557586215820312L9.882199638671874,7.952026215820313L8.501079638671875,6.570906215820313L9.201789638671876,5.870186215820313L10.582939638671874,7.251336215820312L12.172299638671875,5.662106215820312Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), zl = (e) => (() => {
  const t = Ql.cloneNode(!0);
  return r1(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), Rl = /* @__PURE__ */ y('<svg viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_615"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_615)"><path d="M19.672,3.0673368C19.4417,2.9354008,19.1463,3.00292252,18.9994,3.2210900000000002L17.4588,5.50622L16.743299999999998,3.781253L13.9915,7.4662L13.9618,7.51108C13.8339,7.72862,13.8936,8.005659999999999,14.1004,8.15391L14.1462,8.183430000000001C14.3683,8.308720000000001,14.6511,8.25001,14.8022,8.047229999999999L16.4907,5.78571L17.246299999999998,7.60713L19.8374,3.7635389999999997L19.8651,3.717088C19.9871,3.484615,19.9023,3.199273,19.672,3.0673368ZM4.79974,8.462530000000001L10.117740000000001,3.252975C10.31381,3.0610145,10.63152,3.0610145,10.82759,3.252975L13.4115,5.78453C13.6076,5.976710000000001,13.6076,6.28833,13.4115,6.4805L8.093869999999999,11.69045C7.48847,12.28368,7.51659,13.3308,8.151309999999999,13.9528C8.786439999999999,14.5755,9.85421,14.6027,10.45961,14.0087L15.7768,8.79831C15.9729,8.60609,16.2909,8.60609,16.487099999999998,8.79831L19.0705,11.33026C19.2667,11.52244,19.2667,11.83406,19.0705,12.02623L13.7533,17.2366C11.32572,19.6158,7.30328,19.578,4.85679,17.1807C2.410298,14.7834,2.371331,10.84174,4.79974,8.462530000000001ZM12.3461,6.1325199999999995L10.47246,4.29654L5.51079,9.15889C3.477674,11.15076,3.510214,14.4688,5.56784,16.4847C7.62506,18.500999999999998,11.01117,18.5325,13.0439,16.540599999999998L15.6842,13.9529L14.2908,12.58718L15.0011,11.89161L16.394399999999997,13.2569L18.0056,11.67786L16.1323,9.84188L11.16985,14.7046C10.18764,15.6679,8.540980000000001,15.6494,7.51498,14.7184L7.44107,14.6487C6.4219,13.65,6.37771,11.98096,7.38362,10.994869999999999L10.02485,8.40693L8.624939999999999,7.03516L9.335180000000001,6.33919L10.73512,7.71099L12.3461,6.1325199999999995Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), Ul = (e) => (() => {
  const t = Rl.cloneNode(!0);
  return r1(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), Yl = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,17C5.80945,17,3.667717,12.85,3.113386,11.575C2.9622047,11.2,2.9622047,10.8,3.113386,10.425C3.667717,9.15,5.80945,5,11,5C16.165399999999998,5,18.3323,9.15,18.8866,10.425C19.0378,10.8,19.0378,11.2,18.8866,11.575C18.3323,12.85,16.165399999999998,17,11,17ZM4.04567,10.8C3.995276,10.925,3.995276,11.05,4.04567,11.175C4.52441,12.325,6.43937,16,11,16C15.5606,16,17.4756,12.325,17.9543,11.2C18.0047,11.075,18.0047,10.95,17.9543,10.825C17.4756,9.675,15.5606,6,11,6C6.43937,6,4.52441,9.675,4.04567,10.8ZM11,13.5C9.61417,13.5,8.480319999999999,12.375,8.480319999999999,11C8.480319999999999,9.625,9.61417,8.5,11,8.5C12.38583,8.5,13.5197,9.625,13.5197,11C13.5197,12.375,12.38583,13.5,11,13.5ZM11,9.5C10.1685,9.5,9.48819,10.175,9.48819,11C9.48819,11.825,10.1685,12.5,11,12.5C11.8315,12.5,12.51181,11.825,12.51181,11C12.51181,10.175,11.8315,9.5,11,9.5Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), Hl = () => Yl.cloneNode(!0), Vl = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.80417,14.9887L4.62563,16.167299999999997C4.43037,16.3625,4.43037,16.6791,4.62563,16.8744C4.82089,17.0696,5.13748,17.0696,5.332739999999999,16.8744L6.62638,15.5807C7.75595,16.290100000000002,9.19328,16.7929,11,16.7929C16.165399999999998,16.7929,18.3323,12.64289,18.8866,11.36789C19.0378,10.99289,19.0378,10.59289,18.8866,10.21789C18.5549,9.45486,17.6456,7.66212,15.8617,6.34545L17.3536,4.853553C17.5488,4.658291,17.5488,4.341709,17.3536,4.146447C17.1583,3.9511845,16.8417,3.9511845,16.6464,4.146447L15.0014,5.7915399999999995C13.9314,5.1969,12.61166,4.792893,11,4.792893C5.80945,4.792893,3.667717,8.94289,3.113386,10.21789C2.9622049,10.59289,2.9622049,10.99289,3.113386,11.36789C3.424435,12.08333,4.2353000000000005,13.70399,5.80417,14.9887ZM7.36012,14.847C8.32327,15.4074,9.52286,15.7929,11,15.7929C15.5606,15.7929,17.4756,12.11789,17.9543,10.99289C18.0047,10.86789,18.0047,10.74289,17.9543,10.61789C17.659,9.90846,16.8171,8.23812,15.1447,7.06241L12.96929,9.23782C13.3134,9.66543,13.5197,10.20642,13.5197,10.79289C13.5197,12.16789,12.38583,13.29289,11,13.29289C10.41596,13.29289,9.87667,13.09308,9.44815,12.75896L7.36012,14.847ZM8.794609999999999,11.99829L6.520099999999999,14.2728C5.06905,13.12119,4.32057,11.628250000000001,4.04567,10.96789C3.995275,10.84289,3.995275,10.71789,4.04567,10.59289C4.52441,9.46789,6.43937,5.79289,11,5.79289C12.28868,5.79289,13.3661,6.086320000000001,14.2596,6.53329L12.19759,8.5953C11.84086,8.40257,11.43271,8.29289,11,8.29289C9.61417,8.29289,8.480319999999999,9.41789,8.480319999999999,10.79289C8.480319999999999,11.22918,8.594470000000001,11.64029,8.794609999999999,11.99829ZM10.16528,12.04183C10.404869999999999,12.20032,10.692070000000001,12.29289,11,12.29289C11.8315,12.29289,12.51181,11.61789,12.51181,10.79289C12.51181,10.48318,12.41593,10.194600000000001,12.25216,9.95494L10.16528,12.04183ZM11.43602,9.35687L9.55616,11.236740000000001C9.512,11.09633,9.48819,10.94724,9.48819,10.79289C9.48819,9.96789,10.1685,9.29289,11,9.29289C11.15142,9.29289,11.29782,9.31528,11.43602,9.35687Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Gl = () => Vl.cloneNode(!0), Xl = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_625"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_625)"><path d="M14.5385,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807692,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.88462,4,14.5385,5.61538,14.5385,7.576919999999999L14.5385,9.76923ZM10.88461,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923L13.38462,9.76923L13.38462,7.576919999999999C13.38462,6.23077,12.26923,5.15385,10.88461,5.15385ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.038450000000001,12.07692,11.307680000000001,12.34615,11.307680000000001,12.65385L11.307680000000001,14.5769C11.307680000000001,14.8846,11.038450000000001,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), Jl = () => Xl.cloneNode(!0), Wl = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_620"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_620)"><path d="M8.38461,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807693,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.46154,4,13.84615,4.961539,14.3462,6.423080000000001C14.4615,6.73077,14.3077,7.038460000000001,14,7.15385C13.69231,7.26923,13.38461,7.11538,13.26923,6.80769C12.92308,5.80769,11.96154,5.15385,10.88462,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.03846,12.07692,11.307690000000001,12.34615,11.307690000000001,12.65385L11.307690000000001,14.5769C11.307690000000001,14.8846,11.03846,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), ql = () => Wl.cloneNode(!0), eu = /* @__PURE__ */ y('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M16.966900000000003,8.67144C16.6669,8.67144,16.4247,8.91558,16.4247,9.21802L16.4247,16.631500000000003C16.4247,17.322,16.007199999999997,17.9068,15.5139,17.9068L13.93072,17.9068L13.93072,9.2162C13.93072,8.91741,13.68675,8.67144,13.38855,8.67144C13.09036,8.67144,12.84639,8.91741,12.84639,9.21802L12.84639,17.9068L10.151810000000001,17.9068L10.151810000000001,9.21802C10.151810000000001,8.91741,9.90783,8.67144,9.609639999999999,8.67144C9.31145,8.67144,9.06747,8.91741,9.06747,9.219850000000001L9.06747,17.9068L7.48614,17.9068C6.99277,17.9068,6.5753,17.322,6.5753,16.631500000000003L6.5753,9.21802C6.5753,8.91558,6.333130000000001,8.67144,6.03313,8.67144C5.73313,8.67144,5.49096,8.91558,5.49096,9.21802L5.49096,16.631500000000003C5.49096,17.9378,6.385540000000001,19,7.48614,19L15.512,19C16.6127,19,17.509,17.9378,17.509,16.631500000000003L17.509,9.21802C17.509,8.91558,17.2669,8.67144,16.966900000000003,8.67144ZM18.4578,6.21183L4.542169,6.21183C4.243976,6.21183,4,6.45779,4,6.75841C4,7.05903,4.243976,7.30499,4.542169,7.30499L18.4578,7.30499C18.756,7.30499,19,7.05903,19,6.75841C19,6.45779,18.756,6.21183,18.4578,6.21183ZM8.68072,5.10045L14.3193,5.10045C14.6175,5.10045,14.8614,4.852666,14.8614,4.550225C14.8614,4.247783,14.6175,4,14.3193,4L8.68072,4C8.38253,4,8.13855,4.247783,8.13855,4.550225C8.13855,4.852666,8.38253,5.10045,8.68072,5.10045Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), tu = () => eu.cloneNode(!0), nu = {
  horizontalStraightLine: Ec,
  horizontalRayLine: Kc,
  horizontalSegment: Zc,
  verticalStraightLine: zc,
  verticalRayLine: Uc,
  verticalSegment: Hc,
  straightLine: Gc,
  rayLine: Jc,
  segment: qc,
  arrow: tl,
  priceLine: rl,
  priceChannelLine: il,
  parallelStraightLine: ol,
  fibonacciLine: ll,
  fibonacciSegment: fl,
  fibonacciCircle: Cl,
  fibonacciSpiral: gl,
  fibonacciSpeedResistanceFan: pl,
  fibonacciExtension: vl,
  gannBox: Ll,
  circle: bl,
  triangle: kl,
  rect: wl,
  parallelogram: Sl,
  threeWaves: Il,
  fiveWaves: Nl,
  eightWaves: Ol,
  anyWaves: El,
  abcd: Kl,
  xabcd: Zl,
  weak_magnet: zl,
  strong_magnet: Ul,
  lock: Jl,
  unlock: ql,
  visible: Hl,
  invisible: Gl,
  remove: tu
};
function ru(e) {
  return [
    { key: "horizontalStraightLine", text: f("horizontal_straight_line", e) },
    { key: "horizontalRayLine", text: f("horizontal_ray_line", e) },
    { key: "horizontalSegment", text: f("horizontal_segment", e) },
    { key: "verticalStraightLine", text: f("vertical_straight_line", e) },
    { key: "verticalRayLine", text: f("vertical_ray_line", e) },
    { key: "verticalSegment", text: f("vertical_segment", e) },
    { key: "straightLine", text: f("straight_line", e) },
    { key: "rayLine", text: f("ray_line", e) },
    { key: "segment", text: f("segment", e) },
    { key: "arrow", text: f("arrow", e) },
    { key: "priceLine", text: f("price_line", e) }
  ];
}
function au(e) {
  return [
    { key: "priceChannelLine", text: f("price_channel_line", e) },
    { key: "parallelStraightLine", text: f("parallel_straight_line", e) }
  ];
}
function iu(e) {
  return [
    { key: "circle", text: f("circle", e) },
    { key: "rect", text: f("rect", e) },
    { key: "parallelogram", text: f("parallelogram", e) },
    { key: "triangle", text: f("triangle", e) }
  ];
}
function su(e) {
  return [
    { key: "fibonacciLine", text: f("fibonacci_line", e) },
    { key: "fibonacciSegment", text: f("fibonacci_segment", e) },
    { key: "fibonacciCircle", text: f("fibonacci_circle", e) },
    { key: "fibonacciSpiral", text: f("fibonacci_spiral", e) },
    { key: "fibonacciSpeedResistanceFan", text: f("fibonacci_speed_resistance_fan", e) },
    { key: "fibonacciExtension", text: f("fibonacci_extension", e) },
    { key: "gannBox", text: f("gann_box", e) }
  ];
}
function ou(e) {
  return [
    { key: "xabcd", text: f("xabcd", e) },
    { key: "abcd", text: f("abcd", e) },
    { key: "threeWaves", text: f("three_waves", e) },
    { key: "fiveWaves", text: f("five_waves", e) },
    { key: "eightWaves", text: f("eight_waves", e) },
    { key: "anyWaves", text: f("any_waves", e) }
  ];
}
function cu(e) {
  return [
    { key: "weak_magnet", text: f("weak_magnet", e) },
    { key: "strong_magnet", text: f("strong_magnet", e) }
  ];
}
const a1 = (e) => nu[e.name](e.class), lu = /* @__PURE__ */ y('<div class="klinecharts-pro-drawing-bar"><span class="split-line"></span><div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div><div class="item"><span style="width:32px;height:32px"></span></div><div class="item"><span style="width:32px;height:32px"></span></div><span class="split-line"></span><div class="item"><span style="width:32px;height:32px"></span></div></div>'), uu = /* @__PURE__ */ y('<div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div>'), K9 = /* @__PURE__ */ y('<li><span style="padding-left:8px"></span></li>'), j9 = "drawing_tools", fu = (e) => {
  const [t, n] = A("horizontalStraightLine"), [r, a] = A("priceChannelLine"), [i, o] = A("circle"), [s, l] = A("fibonacciLine"), [h, d] = A("xabcd"), [p, $] = A("weak_magnet"), [k, P] = A("normal"), [Z, z] = A(!1), [N, H] = A(!0), [O, S] = A(""), M = Y(() => [{
    key: "singleLine",
    icon: t(),
    list: ru(e.locale),
    setter: n
  }, {
    key: "moreLine",
    icon: r(),
    list: au(e.locale),
    setter: a
  }, {
    key: "polygon",
    icon: i(),
    list: iu(e.locale),
    setter: o
  }, {
    key: "fibonacci",
    icon: s(),
    list: su(e.locale),
    setter: l
  }, {
    key: "wave",
    icon: h(),
    list: ou(e.locale),
    setter: d
  }]), Q = Y(() => cu(e.locale));
  return (() => {
    const t1 = lu.cloneNode(!0), l1 = t1.firstChild, T = l1.nextSibling, K = T.firstChild, R = K.nextSibling, u1 = R.firstChild, K1 = T.nextSibling, j1 = K1.firstChild, m1 = K1.nextSibling, Y1 = m1.firstChild, H1 = m1.nextSibling, V1 = H1.nextSibling, G1 = V1.firstChild;
    return L(t1, () => M().map((I) => (() => {
      const J = uu.cloneNode(!0), i1 = J.firstChild, V = i1.nextSibling, n1 = V.firstChild;
      return J.addEventListener("blur", () => {
        S("");
      }), i1.$$click = () => {
        e.onDrawingItemClick({
          groupId: j9,
          name: I.icon,
          visible: N(),
          lock: Z(),
          mode: k()
        });
      }, L(i1, m(a1, {
        get name() {
          return I.icon;
        }
      })), V.$$click = () => {
        I.key === O() ? S("") : S(I.key);
      }, L(J, (() => {
        const x1 = Y(() => I.key === O());
        return () => x1() && m(d0, {
          class: "list",
          get children() {
            return I.list.map((s1) => (() => {
              const k1 = K9.cloneNode(!0), v1 = k1.firstChild;
              return k1.$$click = () => {
                I.setter(s1.key), e.onDrawingItemClick({
                  name: s1.key,
                  lock: Z(),
                  mode: k()
                }), S("");
              }, L(k1, m(a1, {
                get name() {
                  return s1.key;
                }
              }), v1), L(v1, () => s1.text), k1;
            })());
          }
        });
      })(), null), G(() => r1(n1, "class", I.key === O() ? "rotate" : "")), J;
    })()), l1), T.addEventListener("blur", () => {
      S("");
    }), K.$$click = () => {
      let I = p();
      k() !== "normal" && (I = "normal"), P(I), e.onModeChange(I);
    }, L(K, (() => {
      const I = Y(() => p() === "weak_magnet");
      return () => I() ? (() => {
        const J = Y(() => k() === "weak_magnet");
        return () => J() ? m(a1, {
          name: "weak_magnet",
          class: "selected"
        }) : m(a1, {
          name: "weak_magnet"
        });
      })() : (() => {
        const J = Y(() => k() === "strong_magnet");
        return () => J() ? m(a1, {
          name: "strong_magnet",
          class: "selected"
        }) : m(a1, {
          name: "strong_magnet"
        });
      })();
    })()), R.$$click = () => {
      O() === "mode" ? S("") : S("mode");
    }, L(T, (() => {
      const I = Y(() => O() === "mode");
      return () => I() && m(d0, {
        class: "list",
        get children() {
          return Q().map((J) => (() => {
            const i1 = K9.cloneNode(!0), V = i1.firstChild;
            return i1.$$click = () => {
              $(J.key), P(J.key), e.onModeChange(J.key), S("");
            }, L(i1, m(a1, {
              get name() {
                return J.key;
              }
            }), V), L(V, () => J.text), i1;
          })());
        }
      });
    })(), null), j1.$$click = () => {
      const I = !Z();
      z(I), e.onLockChange(I);
    }, L(j1, (() => {
      const I = Y(() => !!Z());
      return () => I() ? m(a1, {
        name: "lock"
      }) : m(a1, {
        name: "unlock"
      });
    })()), Y1.$$click = () => {
      const I = !N();
      H(I), e.onVisibleChange(I);
    }, L(Y1, (() => {
      const I = Y(() => !!N());
      return () => I() ? m(a1, {
        name: "visible"
      }) : m(a1, {
        name: "invisible"
      });
    })()), G1.$$click = () => {
      e.onRemoveClick(j9);
    }, L(G1, m(a1, {
      name: "remove"
    })), G(() => r1(u1, "class", O() === "mode" ? "rotate" : "")), t1;
  })();
};
o1(["click"]);
const Z9 = /* @__PURE__ */ y('<li class="title"></li>'), Q9 = /* @__PURE__ */ y('<li class="row"></li>'), du = (e) => m(F1, {
  get title() {
    return f("indicator", e.locale);
  },
  width: 400,
  get onClose() {
    return e.onClose;
  },
  get children() {
    return m(d0, {
      class: "klinecharts-pro-indicator-modal-list",
      get children() {
        return [(() => {
          const t = Z9.cloneNode(!0);
          return L(t, () => f("main_indicator", e.locale)), t;
        })(), Y(() => ["MA", "EMA", "SMA", "BOLL", "SAR", "BBI"].map((t) => {
          const n = e.mainIndicators.includes(t);
          return (() => {
            const r = Q9.cloneNode(!0);
            return r.$$click = (a) => {
              e.onMainIndicatorChange({
                name: t,
                paneId: "candle_pane",
                added: !n
              });
            }, L(r, m(F9, {
              checked: n,
              get label() {
                return f(t.toLowerCase(), e.locale);
              }
            })), r;
          })();
        })), (() => {
          const t = Z9.cloneNode(!0);
          return L(t, () => f("sub_indicator", e.locale)), t;
        })(), Y(() => ["MA", "EMA", "VOL", "MACD", "BOLL", "KDJ", "RSI", "BIAS", "BRAR", "CCI", "DMI", "CR", "PSY", "DMA", "TRIX", "OBV", "VR", "WR", "MTM", "EMV", "SAR", "SMA", "ROC", "PVT", "BBI", "AO"].map((t) => {
          const n = t in e.subIndicators;
          return (() => {
            const r = Q9.cloneNode(!0);
            return r.$$click = (a) => {
              e.onSubIndicatorChange({
                name: t,
                paneId: e.subIndicators[t] ?? "",
                added: !n
              });
            }, L(r, m(F9, {
              checked: n,
              get label() {
                return f(t.toLowerCase(), e.locale);
              }
            })), r;
          })();
        }))];
      }
    });
  }
});
o1(["click"]);
function z9(e, t) {
  switch (e) {
    case "Etc/UTC":
      return f("utc", t);
    case "Pacific/Honolulu":
      return f("honolulu", t);
    case "America/Juneau":
      return f("juneau", t);
    case "America/Los_Angeles":
      return f("los_angeles", t);
    case "America/Chicago":
      return f("chicago", t);
    case "America/Toronto":
      return f("toronto", t);
    case "America/Sao_Paulo":
      return f("sao_paulo", t);
    case "Europe/London":
      return f("london", t);
    case "Europe/Berlin":
      return f("berlin", t);
    case "Asia/Bahrain":
      return f("bahrain", t);
    case "Asia/Dubai":
      return f("dubai", t);
    case "Asia/Ashkhabad":
      return f("ashkhabad", t);
    case "Asia/Almaty":
      return f("almaty", t);
    case "Asia/Bangkok":
      return f("bangkok", t);
    case "Asia/Shanghai":
      return f("shanghai", t);
    case "Asia/Tokyo":
      return f("tokyo", t);
    case "Australia/Sydney":
      return f("sydney", t);
    case "Pacific/Norfolk":
      return f("norfolk", t);
  }
  return e;
}
function Cu(e) {
  return [
    { key: "Etc/UTC", text: f("utc", e) },
    { key: "Pacific/Honolulu", text: f("honolulu", e) },
    { key: "America/Juneau", text: f("juneau", e) },
    { key: "America/Los_Angeles", text: f("los_angeles", e) },
    { key: "America/Chicago", text: f("chicago", e) },
    { key: "America/Toronto", text: f("toronto", e) },
    { key: "America/Sao_Paulo", text: f("sao_paulo", e) },
    { key: "Europe/London", text: f("london", e) },
    { key: "Europe/Berlin", text: f("berlin", e) },
    { key: "Asia/Bahrain", text: f("bahrain", e) },
    { key: "Asia/Dubai", text: f("dubai", e) },
    { key: "Asia/Ashkhabad", text: f("ashkhabad", e) },
    { key: "Asia/Almaty", text: f("almaty", e) },
    { key: "Asia/Bangkok", text: f("bangkok", e) },
    { key: "Asia/Shanghai", text: f("shanghai", e) },
    { key: "Asia/Tokyo", text: f("tokyo", e) },
    { key: "Australia/Sydney", text: f("sydney", e) },
    { key: "Pacific/Norfolk", text: f("norfolk", e) }
  ];
}
const hu = (e) => {
  const [t, n] = A(e.timezone), r = Y(() => Cu(e.locale));
  return m(F1, {
    get title() {
      return f("timezone", e.locale);
    },
    width: 320,
    get buttons() {
      return [{
        children: f("confirm", e.locale),
        onClick: () => {
          e.onConfirm(t()), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      return m(Se, {
        style: {
          width: "100%",
          "margin-top": "20px"
        },
        get value() {
          return t().text;
        },
        onSelected: (a) => {
          n(a);
        },
        get dataSource() {
          return r();
        }
      });
    }
  });
};
function R9(e) {
  return [
    {
      key: "candle.type",
      text: f("candle_type", e),
      component: "select",
      dataSource: [
        { key: "candle_solid", text: f("candle_solid", e) },
        { key: "candle_stroke", text: f("candle_stroke", e) },
        { key: "candle_up_stroke", text: f("candle_up_stroke", e) },
        { key: "candle_down_stroke", text: f("candle_down_stroke", e) },
        { key: "ohlc", text: f("ohlc", e) },
        { key: "area", text: f("area", e) }
      ]
    },
    {
      key: "candle.priceMark.last.show",
      text: f("last_price_show", e),
      component: "switch"
    },
    {
      key: "candle.priceMark.high.show",
      text: f("high_price_show", e),
      component: "switch"
    },
    {
      key: "candle.priceMark.low.show",
      text: f("low_price_show", e),
      component: "switch"
    },
    {
      key: "indicator.lastValueMark.show",
      text: f("indicator_last_value_show", e),
      component: "switch"
    },
    {
      key: "yAxis.type",
      text: f("price_axis_type", e),
      component: "select",
      dataSource: [
        { key: "normal", text: f("normal", e) },
        { key: "percentage", text: f("percentage", e) },
        { key: "log", text: f("log", e) }
      ]
    },
    {
      key: "yAxis.reverse",
      text: f("reverse_coordinate", e),
      component: "switch"
    },
    {
      key: "grid.show",
      text: f("grid_show", e),
      component: "switch"
    }
  ];
}
const gu = /* @__PURE__ */ y('<div class="klinecharts-pro-setting-modal-content"></div>'), yu = /* @__PURE__ */ y("<span></span>"), pu = (e) => {
  const [t, n] = A(e.currentStyles), [r, a] = A(R9(e.locale));
  f1(() => {
    a(R9(e.locale));
  });
  const i = (o, s) => {
    const l = {};
    S0(l, o.key, s);
    const h = j.clone(t());
    S0(h, o.key, s), n(h), a(r().map((d) => ({
      ...d
    }))), e.onChange(l);
  };
  return m(F1, {
    get title() {
      return f("setting", e.locale);
    },
    width: 560,
    get buttons() {
      return [{
        children: f("restore_default", e.locale),
        onClick: () => {
          e.onRestoreDefault(r()), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      const o = gu.cloneNode(!0);
      return L(o, m(y5, {
        get each() {
          return r();
        },
        children: (s) => {
          let l;
          const h = j.formatValue(t(), s.key);
          switch (s.component) {
            case "select": {
              l = m(Se, {
                style: {
                  width: "120px"
                },
                get value() {
                  return f(h, e.locale);
                },
                get dataSource() {
                  return s.dataSource;
                },
                onSelected: (d) => {
                  const p = d.key;
                  i(s, p);
                }
              });
              break;
            }
            case "switch": {
              const d = !!h;
              l = m(ha, {
                open: d,
                onChange: () => {
                  i(s, !d);
                }
              });
              break;
            }
          }
          return [(() => {
            const d = yu.cloneNode(!0);
            return L(d, () => s.text), d;
          })(), l];
        }
      })), o;
    }
  });
}, mu = /* @__PURE__ */ y('<img style="width:500px;margin-top: 20px">'), vu = (e) => m(F1, {
  get title() {
    return f("screenshot", e.locale);
  },
  width: 540,
  get buttons() {
    return [{
      type: "confirm",
      children: f("save", e.locale),
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
    const t = mu.cloneNode(!0);
    return G(() => r1(t, "src", e.url)), t;
  }
}), _u = {
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
}, Lu = /* @__PURE__ */ y('<div class="klinecharts-pro-indicator-setting-modal-content"></div>'), $u = /* @__PURE__ */ y("<span></span>"), bu = (e) => {
  const [t, n] = A(j.clone(e.params.calcParams)), r = (a) => _u[a];
  return m(F1, {
    get title() {
      return e.params.indicatorName;
    },
    width: 360,
    get buttons() {
      return [{
        type: "confirm",
        children: f("confirm", e.locale),
        onClick: () => {
          const a = r(e.params.indicatorName), i = [];
          j.clone(t()).forEach((o, s) => {
            !j.isValid(o) || o === "" ? "default" in a[s] && i.push(a[s].default) : i.push(o);
          }), e.onConfirm(i), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      const a = Lu.cloneNode(!0);
      return L(a, () => r(e.params.indicatorName).map((i, o) => [(() => {
        const s = $u.cloneNode(!0);
        return L(s, () => f(i.paramNameKey, e.locale)), s;
      })(), m(Te, {
        style: {
          width: "200px"
        },
        get value() {
          return t()[o] ?? "";
        },
        get precision() {
          return i.precision;
        },
        get min() {
          return i.min;
        },
        onChange: (s) => {
          const l = j.clone(t());
          l[o] = s, n(l);
        }
      })])), a;
    }
  });
}, xu = /* @__PURE__ */ y('<svg viewBox="0 0 1024 1024"><path d="M945.066667 898.133333l-189.866667-189.866666c55.466667-64 87.466667-149.333333 87.466667-241.066667 0-204.8-168.533333-373.333333-373.333334-373.333333S96 264.533333 96 469.333333 264.533333 842.666667 469.333333 842.666667c91.733333 0 174.933333-34.133333 241.066667-87.466667l189.866667 189.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c8.533333-12.8 8.533333-34.133333-2.133333-46.933334zM469.333333 778.666667C298.666667 778.666667 160 640 160 469.333333S298.666667 160 469.333333 160 778.666667 298.666667 778.666667 469.333333 640 778.666667 469.333333 778.666667z"></path></svg>'), ku = /* @__PURE__ */ y('<img alt="symbol">'), Au = /* @__PURE__ */ y("<li><div><span></span></div></li>"), wu = (e) => {
  const [t, n] = A(""), [r] = o5(t, e.datafeed.searchSymbols.bind(e.datafeed));
  return m(F1, {
    get title() {
      return f("symbol_search", e.locale);
    },
    width: 460,
    get onClose() {
      return e.onClose;
    },
    get children() {
      return [m(Te, {
        class: "klinecharts-pro-symbol-search-modal-input",
        get placeholder() {
          return f("symbol_code", e.locale);
        },
        get suffix() {
          return xu.cloneNode(!0);
        },
        get value() {
          return t();
        },
        onChange: (a) => {
          const i = `${a}`;
          n(i);
        }
      }), m(d0, {
        class: "klinecharts-pro-symbol-search-modal-list",
        get loading() {
          return r.loading;
        },
        get dataSource() {
          return r() ?? [];
        },
        renderItem: (a) => (() => {
          const i = Au.cloneNode(!0), o = i.firstChild, s = o.firstChild;
          return i.$$click = () => {
            e.onSymbolSelected(a), e.onClose();
          }, L(o, m(W, {
            get when() {
              return a.logo;
            },
            get children() {
              const l = ku.cloneNode(!0);
              return G(() => r1(l, "src", a.logo)), l;
            }
          }), s), L(s, () => a.shortName ?? a.ticker, null), L(s, () => `${a.name ? `(${a.name})` : ""}`, null), L(i, () => a.exchange ?? "", null), G(() => r1(s, "title", a.name ?? "")), i;
        })()
      })];
    }
  });
};
o1(["click"]);
const Mu = /* @__PURE__ */ y('<i class="icon-close klinecharts-pro-load-icon"></i>'), Su = /* @__PURE__ */ y('<div class="klinecharts-pro-content"><div class="klinecharts-pro-widget"></div></div>');
function t0(e, t, n, r) {
  return t === "VOL" && (r = {
    gap: {
      bottom: 2
    },
    ...r
  }), (e == null ? void 0 : e.createIndicator({
    name: t,
    // @ts-expect-error
    createTooltipDataSource: ({
      indicator: a,
      defaultStyles: i
    }) => {
      const o = [];
      return a.visible ? (o.push(i.tooltip.icons[1]), o.push(i.tooltip.icons[2]), o.push(i.tooltip.icons[3])) : (o.push(i.tooltip.icons[0]), o.push(i.tooltip.icons[2]), o.push(i.tooltip.icons[3])), {
        icons: o
      };
    }
  }, n, r)) ?? null;
}
const Tu = (e) => {
  let t, n = null, r, a = !1;
  const [i, o] = A(e.theme), [s, l] = A(e.styles), [h, d] = A(e.locale), [p, $] = A(e.symbol), [k, P] = A(e.period), [Z, z] = A(!1), [N, H] = A([...e.mainIndicators]), [O, S] = A({}), [M, Q] = A(!1), [t1, l1] = A({
    key: e.timezone,
    text: z9(e.timezone, e.locale)
  }), [T, K] = A(!1), [R, u1] = A(), [K1, j1] = A(""), [m1, Y1] = A(e.drawingBarVisible), [H1, V1] = A(!1), [G1, I] = A(!1), [J, i1] = A({
    visible: !1,
    indicatorName: "",
    paneId: "",
    calcParams: []
  });
  let V = /* @__PURE__ */ new Map(), n1 = /* @__PURE__ */ new Map();
  const x1 = (c) => ({
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
  })[c] || 1, s1 = (c, u = /* @__PURE__ */ new WeakSet()) => {
    if (c == null)
      return c;
    if (u.has(c))
      return "[Circular]";
    if (typeof c != "object")
      return c;
    if (u.add(c), Array.isArray(c))
      return c.map((v) => s1(v, u));
    const g = {};
    for (const v in c)
      if (!(v === "__proto__" || v === "constructor" || v === "prototype"))
        try {
          const b = c[v];
          if (typeof b == "function")
            continue;
          g[v] = s1(b, u);
        } catch (b) {
          g[v] = `[Error: ${b.message}]`;
        }
    return g;
  }, k1 = (c) => {
    if (!c)
      return null;
    try {
      return {
        id: c.id || "",
        type: c.name || "",
        name: c.name || "",
        points: (c.points || []).map((u) => ({
          timestamp: u.timestamp || 0,
          value: u.value || 0,
          dataIndex: u.dataIndex || 0
        })),
        extendData: s1(c.extendData || {}),
        styles: s1(c.styles || {}),
        visible: c.visible ?? !0,
        lock: c.lock ?? !1,
        mode: c.mode || n9.Normal
      };
    } catch (u) {
      return console.error("Error extracting overlay data:", u), null;
    }
  }, v1 = (c) => {
    var u, g, v;
    try {
      const b = (u = n == null ? void 0 : n.getOverlayById) == null ? void 0 : u.call(n, c);
      if (!b)
        return;
      const w = k1(b);
      if (w) {
        const C = V.get(c), _ = ((g = C == null ? void 0 : C.points) == null ? void 0 : g.length) || 0, x = ((v = w.points) == null ? void 0 : v.length) || 0;
        V.set(c, w);
        const D = x1(w.type);
        if (x >= D) {
          const U = n1.get(c);
          U && !U.complete && (U.complete = !0, U.checkInterval && (clearInterval(U.checkInterval), U.checkInterval = void 0));
        }
      }
    } catch (b) {
      console.error(`Error updating overlay tracking for ${c}:`, b);
    }
  }, De = (c, u) => {
    if (n1.has(c))
      return;
    const g = {
      monitoring: !0,
      complete: !1,
      lastPointCount: 0
    };
    n1.set(c, g), v1(c);
    const v = () => {
      v1(c);
    };
    document.addEventListener("mouseup", v), document.addEventListener("touchend", v), setTimeout(() => {
      var w;
      const b = n1.get(c);
      if (b && !b.complete) {
        b.checkInterval && clearInterval(b.checkInterval), b.mouseUpHandler && (document.removeEventListener("mouseup", b.mouseUpHandler), document.removeEventListener("touchend", b.mouseUpHandler)), v1(c);
        const C = V.get(c);
        if (C) {
          const _ = x1(C.type), x = ((w = C.points) == null ? void 0 : w.length) || 0;
          x < _ && console.warn(`⚠️ ${C.type} ${c} has only ${x} point(s), should have ${_}`);
        }
      }
    }, 3e4);
  };
  let A1 = {
    saveDrawings: (c, u) => {
      try {
        const g = `kline_drawings_${c}`, b = {
          drawings: u.map((w) => {
            var D;
            const C = {
              ...w
            };
            C.extendData && (C.extendData = s1(C.extendData)), C.styles && (C.styles = s1(C.styles));
            const _ = x1(w.type), x = ((D = w.points) == null ? void 0 : D.length) || 0;
            return x < _ && console.warn(`⚠️ Saving ${w.type} with only ${x} point(s), needs ${_}`), C;
          }),
          timestamp: Date.now()
        };
      } catch (g) {
        console.error("Library: Error saving drawings:", g);
      }
    },
    loadDrawings: (c) => {
      try {
        const u = `kline_drawings_${c}`;
      } catch (u) {
        console.error("Library: Error loading drawings:", u);
      }
      return [];
    },
    clearDrawings: (c) => {
      try {
        const u = `kline_drawings_${c}`;
      } catch (u) {
        console.error("Library: Error clearing drawings:", u);
      }
    }
  };
  const X0 = () => {
    const c = p();
    if (c != null && c.ticker) {
      const u = Array.from(V.values());
      A1.saveDrawings(c.ticker, u);
    }
  };
  e.ref({
    setTheme: o,
    getTheme: () => i(),
    setStyles: l,
    getStyles: () => n.getStyles(),
    setLocale: d,
    getLocale: () => h(),
    setTimezone: (c) => {
      l1({
        key: c,
        text: z9(e.timezone, h())
      });
    },
    getTimezone: () => t1().key,
    setSymbol: $,
    getSymbol: () => p(),
    setPeriod: P,
    getPeriod: () => k(),
    getMainIndicators: () => N(),
    getSubIndicators: () => O(),
    setMainIndicators: H,
    setSubIndicators: S,
    overrideIndicator: (c, u) => {
      n == null || n.overrideIndicator(c, u);
    },
    createOverlay: (c) => {
      var u;
      return ((u = n == null ? void 0 : n.createOverlay) == null ? void 0 : u.call(n, c)) ?? null;
    },
    removeOverlay: (c) => {
      var u;
      if ((u = n == null ? void 0 : n.removeOverlay) == null || u.call(n, c), c.id) {
        V.delete(c.id);
        const g = n1.get(c.id);
        g && (g.checkInterval && clearInterval(g.checkInterval), g.mouseUpHandler && (document.removeEventListener("mouseup", g.mouseUpHandler), document.removeEventListener("touchend", g.mouseUpHandler)), n1.delete(c.id)), X0();
      }
    },
    removeAllOverlay: () => {
      V.forEach((c, u) => {
        var v;
        (v = n == null ? void 0 : n.removeOverlay) == null || v.call(n, {
          id: u
        });
        const g = n1.get(u);
        g && (g.checkInterval && clearInterval(g.checkInterval), g.mouseUpHandler && (document.removeEventListener("mouseup", g.mouseUpHandler), document.removeEventListener("touchend", g.mouseUpHandler)));
      }), V.clear(), n1.clear();
    },
    getAllOverlay: () => Array.from(V.values()),
    getOverlay: (c) => V.get(c) || null,
    overrideOverlay: (c) => {
      n && "overrideOverlay" in n && typeof n.overrideOverlay == "function" ? n.overrideOverlay(c) : console.warn("overrideOverlay method not available on widget");
    },
    dispose: () => {
      t && a9(t);
    },
    resize: () => {
      n && "resize" in n && typeof n.resize == "function" ? n.resize() : console.warn("resize method not available on widget");
    },
    getSettings: () => {
      var g, v, b, w, C, _, x, D, U, g1, Z1, X1, W0, q0, e9, t9;
      if (!n)
        return {};
      const c = n.getStyles(), u = (g = c.candle) == null ? void 0 : g.bar;
      return {
        // Candle settings
        candleType: (v = c.candle) == null ? void 0 : v.type,
        candleBarStyle: u == null ? void 0 : u.style,
        // bar.style might be LineType
        showLastPrice: (C = (w = (b = c.candle) == null ? void 0 : b.priceMark) == null ? void 0 : w.last) == null ? void 0 : C.show,
        showHighestPrice: (D = (x = (_ = c.candle) == null ? void 0 : _.priceMark) == null ? void 0 : x.high) == null ? void 0 : D.show,
        showLowestPrice: (Z1 = (g1 = (U = c.candle) == null ? void 0 : U.priceMark) == null ? void 0 : g1.low) == null ? void 0 : Z1.show,
        // Indicator settings
        showIndicatorLastValue: (W0 = (X1 = c.indicator) == null ? void 0 : X1.lastValueMark) == null ? void 0 : W0.show,
        // Axis settings - yAxis.reverse is boolean according to YAxisStyle interface
        priceAxisType: (q0 = c.yAxis) == null ? void 0 : q0.type,
        reverseCoordinate: (e9 = c.yAxis) == null ? void 0 : e9.reverse,
        // Grid settings
        showGrids: (t9 = c.grid) == null ? void 0 : t9.show,
        timestamp: Date.now()
      };
    },
    setSettings: (c) => {
      var g, v, b, w, C, _, x, D, U, g1, Z1;
      if (!n)
        return;
      const u = {};
      if (c.candleType !== void 0 && (u.candle = {
        ...u.candle,
        type: c.candleType
      }), c.candleBarStyle !== void 0) {
        const X1 = ((g = u.candle) == null ? void 0 : g.bar) || {};
        u.candle = {
          ...u.candle,
          bar: {
            ...X1,
            style: c.candleBarStyle
          }
          // Use any since ChangeColor doesn't have style
        };
      }
      c.showLastPrice !== void 0 && (u.candle = {
        ...u.candle,
        priceMark: {
          ...(v = u.candle) == null ? void 0 : v.priceMark,
          last: {
            ...(w = (b = u.candle) == null ? void 0 : b.priceMark) == null ? void 0 : w.last,
            show: c.showLastPrice
          }
        }
      }), c.showHighestPrice !== void 0 && (u.candle = {
        ...u.candle,
        priceMark: {
          ...(C = u.candle) == null ? void 0 : C.priceMark,
          high: {
            ...(x = (_ = u.candle) == null ? void 0 : _.priceMark) == null ? void 0 : x.high,
            show: c.showHighestPrice
          }
        }
      }), c.showLowestPrice !== void 0 && (u.candle = {
        ...u.candle,
        priceMark: {
          ...(D = u.candle) == null ? void 0 : D.priceMark,
          low: {
            ...(g1 = (U = u.candle) == null ? void 0 : U.priceMark) == null ? void 0 : g1.low,
            show: c.showLowestPrice
          }
        }
      }), c.showIndicatorLastValue !== void 0 && (u.indicator = {
        ...u.indicator,
        lastValueMark: {
          ...(Z1 = u.indicator) == null ? void 0 : Z1.lastValueMark,
          show: c.showIndicatorLastValue
        }
      }), c.priceAxisType !== void 0 && (u.yAxis = {
        ...u.yAxis,
        type: c.priceAxisType
      }), c.reverseCoordinate !== void 0 && (u.yAxis = {
        ...u.yAxis,
        reverse: c.reverseCoordinate
      }), c.showGrids !== void 0 && (u.grid = {
        ...u.grid,
        show: c.showGrids
      }), n.setStyles(u);
    },
    resetSettings: () => {
      var g, v, b, w, C, _, x;
      if (!n)
        return;
      n.getStyles();
      const c = {
        candle: {
          type: Ee.CandleSolid,
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
          type: Fe.Normal,
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
      }, u = R();
      if (u) {
        const D = {
          candle: {
            type: (g = u.candle) == null ? void 0 : g.type,
            bar: (v = u.candle) == null ? void 0 : v.bar,
            priceMark: (b = u.candle) == null ? void 0 : b.priceMark
          },
          indicator: {
            lastValueMark: (w = u.indicator) == null ? void 0 : w.lastValueMark
          },
          yAxis: {
            type: (C = u.yAxis) == null ? void 0 : C.type,
            reverse: (_ = u.yAxis) == null ? void 0 : _.reverse
          },
          grid: {
            show: (x = u.grid) == null ? void 0 : x.show
          }
        };
        n.setStyles(D);
      } else
        n.setStyles(c);
    },
    // === Drawing Methods ===
    saveDrawings: (c) => {
      const u = Array.from(V.values());
      u.forEach((g, v) => {
        var C;
        const b = x1(g.type), w = ((C = g.points) == null ? void 0 : C.length) || 0;
        w < b && console.warn(`⚠️ ${g.type} ${g.id} has only ${w} point(s), should have ${b}`);
      }), A1.saveDrawings(c, u);
    },
    loadDrawings: (c) => {
      A1.loadDrawings(c).forEach((g, v) => {
        var b;
        try {
          const w = {
            name: g.type,
            points: g.points || [],
            extendData: g.extendData,
            styles: g.styles,
            visible: g.visible ?? !0,
            lock: g.lock ?? !1,
            mode: g.mode ?? n9.Normal
          }, C = n == null ? void 0 : n.createOverlay(w);
          C && (V.set(C, {
            ...g,
            id: C
          }), n1.set(C, {
            monitoring: !1,
            complete: !0,
            lastPointCount: ((b = g.points) == null ? void 0 : b.length) || 0
          }));
        } catch (w) {
          console.error(`   ❌ Error restoring ${g.type}:`, w);
        }
      });
    },
    getDrawings: (c) => A1.loadDrawings(c),
    clearDrawings: (c) => {
      A1.clearDrawings(c);
    },
    // Auto-save on overlay events
    enableAutoSave: (c, u = !0) => {
    }
  });
  const J0 = () => {
    n == null || n.resize();
  }, L0 = (c, u, g) => {
    let v = u, b = v;
    switch (c.timespan) {
      case "minute": {
        v = v - v % (60 * 1e3), b = v - g * c.multiplier * 60 * 1e3;
        break;
      }
      case "hour": {
        v = v - v % (60 * 60 * 1e3), b = v - g * c.multiplier * 60 * 60 * 1e3;
        break;
      }
      case "day": {
        v = v - v % (60 * 60 * 1e3), b = v - g * c.multiplier * 24 * 60 * 60 * 1e3;
        break;
      }
      case "week": {
        const C = new Date(v).getDay(), _ = C === 0 ? 6 : C - 1;
        v = v - _ * 60 * 60 * 24;
        const x = new Date(v);
        v = (/* @__PURE__ */ new Date(`${x.getFullYear()}-${x.getMonth() + 1}-${x.getDate()}`)).getTime(), b = g * c.multiplier * 7 * 24 * 60 * 60 * 1e3;
        break;
      }
      case "month": {
        const w = new Date(v), C = w.getFullYear(), _ = w.getMonth() + 1;
        v = (/* @__PURE__ */ new Date(`${C}-${_}-01`)).getTime(), b = g * c.multiplier * 30 * 24 * 60 * 60 * 1e3;
        const x = new Date(b);
        b = (/* @__PURE__ */ new Date(`${x.getFullYear()}-${x.getMonth() + 1}-01`)).getTime();
        break;
      }
      case "year": {
        const C = new Date(v).getFullYear();
        v = (/* @__PURE__ */ new Date(`${C}-01-01`)).getTime(), b = g * c.multiplier * 365 * 24 * 60 * 60 * 1e3;
        const _ = new Date(b);
        b = (/* @__PURE__ */ new Date(`${_.getFullYear()}-01-01`)).getTime();
        break;
      }
    }
    return [b, v];
  };
  return V9(() => {
    if (window.addEventListener("resize", J0), n = Oe(t, {
      customApi: {
        formatDate: (C, _, x, D) => {
          switch (k().timespan) {
            case "minute":
              return D === J1.XAxis ? j.formatDate(C, _, "HH:mm") : j.formatDate(C, _, "YYYY-MM-DD HH:mm");
            case "hour":
              return D === J1.XAxis ? j.formatDate(C, _, "MM-DD HH:mm") : j.formatDate(C, _, "YYYY-MM-DD HH:mm");
            case "day":
            case "week":
              return j.formatDate(C, _, "YYYY-MM-DD");
            case "month":
              return D === J1.XAxis ? j.formatDate(C, _, "YYYY-MM") : j.formatDate(C, _, "YYYY-MM-DD");
            case "year":
              return D === J1.XAxis ? j.formatDate(C, _, "YYYY") : j.formatDate(C, _, "YYYY-MM-DD");
          }
          return j.formatDate(C, _, "YYYY-MM-DD HH:mm");
        }
      }
    }), n) {
      const C = n.getDom("candle_pane", r9.Main);
      if (C) {
        let x = document.createElement("div");
        if (x.className = "klinecharts-pro-watermark", j.isString(e.watermark)) {
          const D = e.watermark.replace(/(^\s*)|(\s*$)/g, "");
          x.innerHTML = D;
        } else
          x.appendChild(e.watermark);
        C.appendChild(x);
      }
      const _ = n.getDom("candle_pane", r9.YAxis);
      r = document.createElement("span"), r.className = "klinecharts-pro-price-unit", _ == null || _.appendChild(r);
    }
    let c = !1;
    const u = () => {
      const C = p();
      if (C != null && C.ticker)
        try {
          const _ = Array.from(V.values());
          A1.saveDrawings(C.ticker, _);
        } catch (_) {
          console.error("❌ Error refreshing local storage:", _);
        }
    }, g = (C) => {
      c || (c = !0, C.preventDefault());
    };
    setTimeout(() => {
      t && t.addEventListener("contextmenu", g);
    }, 1e3), document.addEventListener("contextmenu", (C) => {
      t && t.contains(C.target) && g(C);
    });
    const v = n == null ? void 0 : n.removeOverlay;
    n && v && (n.removeOverlay = function(...C) {
      const _ = v.apply(this, C), x = C[0];
      let D;
      if (typeof x == "string" ? D = x : x && typeof x == "object" && x.id && (D = x.id), D) {
        V.delete(D);
        const U = n1.get(D);
        U && (U.checkInterval && clearInterval(U.checkInterval), U.mouseUpHandler && (document.removeEventListener("mouseup", U.mouseUpHandler), document.removeEventListener("touchend", U.mouseUpHandler)), n1.delete(D)), u();
      }
      return _;
    }), N().forEach((C) => {
      t0(n, C, !0, {
        id: "candle_pane"
      });
    });
    const b = {};
    e.subIndicators.forEach((C) => {
      const _ = t0(n, C, !0);
      _ && (b[C] = _);
    }), S(b), n == null || n.loadMore((C) => {
      a = !0, (async () => {
        const x = k(), [D] = L0(x, C, 1), [U] = L0(x, D, 500), g1 = await e.datafeed.getHistoryKLineData(p(), x, U, D);
        n == null || n.applyMoreData(g1, g1.length > 0), a = !1;
      })();
    }), n == null || n.subscribeAction(Be.OnTooltipIconClick, (C) => {
      if (C.indicatorName)
        switch (C.iconId) {
          case "visible": {
            n == null || n.overrideIndicator({
              name: C.indicatorName,
              visible: !0
            }, C.paneId);
            break;
          }
          case "invisible": {
            n == null || n.overrideIndicator({
              name: C.indicatorName,
              visible: !1
            }, C.paneId);
            break;
          }
          case "setting": {
            const _ = n == null ? void 0 : n.getIndicatorByPaneId(C.paneId, C.indicatorName);
            i1({
              visible: !0,
              indicatorName: C.indicatorName,
              paneId: C.paneId,
              calcParams: _.calcParams
            });
            break;
          }
          case "close":
            if (C.paneId === "candle_pane") {
              const _ = [...N()];
              n == null || n.removeIndicator("candle_pane", C.indicatorName), _.splice(_.indexOf(C.indicatorName), 1), H(_);
            } else {
              const _ = {
                ...O()
              };
              n == null || n.removeIndicator(C.paneId, C.indicatorName), delete _[C.indicatorName], S(_);
            }
        }
    });
    const w = n == null ? void 0 : n.createOverlay;
    n && w && (n.createOverlay = function(...C) {
      const _ = C[0], x = w.apply(this, C);
      return x && (De(x, _.name || "unknown"), v1(x), X0()), x;
    });
  }), B0(() => {
    window.removeEventListener("resize", J0), n1.clear(), V.clear(), a9(t);
  }), f1(() => {
    const c = p();
    c != null && c.priceCurrency ? (r.innerHTML = c == null ? void 0 : c.priceCurrency.toLocaleUpperCase(), r.style.display = "flex") : r.style.display = "none", n == null || n.setPriceVolumePrecision((c == null ? void 0 : c.pricePrecision) ?? 2, (c == null ? void 0 : c.volumePrecision) ?? 0);
  }), f1((c) => {
    if (!a) {
      c && e.datafeed.unsubscribe(c.symbol, c.period);
      const u = p(), g = k();
      return a = !0, I(!0), (async () => {
        const [b, w] = L0(g, (/* @__PURE__ */ new Date()).getTime(), 500), C = await e.datafeed.getHistoryKLineData(u, g, b, w);
        n == null || n.applyNewData(C, C.length > 0), e.datafeed.subscribe(u, g, (_) => {
          n == null || n.updateData(_);
        }), a = !1, I(!1);
      })(), {
        symbol: u,
        period: g
      };
    }
    return c;
  }), f1(() => {
    const c = i();
    n == null || n.setStyles(c);
    const u = c === "dark" ? "#929AA5" : "#76808F";
    n == null || n.setStyles({
      indicator: {
        tooltip: {
          icons: [{
            id: "visible",
            position: W1.Middle,
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
            color: u,
            activeColor: u,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "invisible",
            position: W1.Middle,
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
            color: u,
            activeColor: u,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "setting",
            position: W1.Middle,
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
            color: u,
            activeColor: u,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "close",
            position: W1.Middle,
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
            color: u,
            activeColor: u,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }]
        }
      }
    });
  }), f1(() => {
    n == null || n.setLocale(h());
  }), f1(() => {
    n == null || n.setTimezone(t1().key);
  }), f1(() => {
    s() && (n == null || n.setStyles(s()), u1(Ur(n.getStyles())));
  }), [Mu.cloneNode(!0), m(W, {
    get when() {
      return H1();
    },
    get children() {
      return m(wu, {
        get locale() {
          return e.locale;
        },
        get datafeed() {
          return e.datafeed;
        },
        onSymbolSelected: (c) => {
          $(c);
        },
        onClose: () => {
          V1(!1);
        }
      });
    }
  }), m(W, {
    get when() {
      return Z();
    },
    get children() {
      return m(du, {
        get locale() {
          return e.locale;
        },
        get mainIndicators() {
          return N();
        },
        get subIndicators() {
          return O();
        },
        onClose: () => {
          z(!1);
        },
        onMainIndicatorChange: (c) => {
          const u = [...N()];
          c.added ? (t0(n, c.name, !0, {
            id: "candle_pane"
          }), u.push(c.name)) : (n == null || n.removeIndicator("candle_pane", c.name), u.splice(u.indexOf(c.name), 1)), H(u);
        },
        onSubIndicatorChange: (c) => {
          const u = {
            ...O()
          };
          if (c.added) {
            const g = t0(n, c.name);
            g && (u[c.name] = g);
          } else
            c.paneId && (n == null || n.removeIndicator(c.paneId, c.name), delete u[c.name]);
          S(u);
        }
      });
    }
  }), m(W, {
    get when() {
      return M();
    },
    get children() {
      return m(hu, {
        get locale() {
          return e.locale;
        },
        get timezone() {
          return t1();
        },
        onClose: () => {
          Q(!1);
        },
        onConfirm: l1
      });
    }
  }), m(W, {
    get when() {
      return T();
    },
    get children() {
      return m(pu, {
        get locale() {
          return e.locale;
        },
        get currentStyles() {
          return j.clone(n.getStyles());
        },
        onClose: () => {
          K(!1);
        },
        onChange: (c) => {
          n == null || n.setStyles(c);
        },
        onRestoreDefault: (c) => {
          const u = {};
          c.forEach((g) => {
            const v = g.key;
            S0(u, v, j.formatValue(R(), v));
          }), n == null || n.setStyles(u);
        }
      });
    }
  }), m(W, {
    get when() {
      return K1().length > 0;
    },
    get children() {
      return m(vu, {
        get locale() {
          return e.locale;
        },
        get url() {
          return K1();
        },
        onClose: () => {
          j1("");
        }
      });
    }
  }), m(W, {
    get when() {
      return J().visible;
    },
    get children() {
      return m(bu, {
        get locale() {
          return e.locale;
        },
        get params() {
          return J();
        },
        onClose: () => {
          i1({
            visible: !1,
            indicatorName: "",
            paneId: "",
            calcParams: []
          });
        },
        onConfirm: (c) => {
          const u = J();
          n == null || n.overrideIndicator({
            name: u.indicatorName,
            calcParams: c
          }, u.paneId);
        }
      });
    }
  }), m(Oc, {
    get locale() {
      return e.locale;
    },
    get symbol() {
      return p();
    },
    get spread() {
      return m1();
    },
    get period() {
      return k();
    },
    get periods() {
      return e.periods;
    },
    onMenuClick: async () => {
      try {
        await c5(() => Y1(!m1())), n == null || n.resize();
      } catch {
      }
    },
    onSymbolClick: () => {
      V1(!H1());
    },
    onPeriodChange: P,
    onIndicatorClick: () => {
      z((c) => !c);
    },
    onTimezoneClick: () => {
      Q((c) => !c);
    },
    onSettingClick: () => {
      K((c) => !c);
    },
    onScreenshotClick: () => {
      if (n) {
        const c = n.getConvertPictureUrl(!0, "jpeg", e.theme === "dark" ? "#151517" : "#ffffff");
        j1(c);
      }
    }
  }), (() => {
    const c = Su.cloneNode(!0), u = c.firstChild;
    return L(c, m(W, {
      get when() {
        return G1();
      },
      get children() {
        return m(Me, {});
      }
    }), u), L(c, m(W, {
      get when() {
        return m1();
      },
      get children() {
        return m(fu, {
          get locale() {
            return e.locale;
          },
          onDrawingItemClick: (g) => {
            n == null || n.createOverlay(g);
          },
          onModeChange: (g) => {
            n == null || n.overrideOverlay({
              mode: g
            });
          },
          onLockChange: (g) => {
            n == null || n.overrideOverlay({
              lock: g
            });
          },
          onVisibleChange: (g) => {
            n == null || n.overrideOverlay({
              visible: g
            });
          },
          onRemoveClick: (g) => {
            n == null || n.removeOverlay({
              groupId: g
            });
          }
        });
      }
    }), u), E0((g) => t = g, u), G(() => r1(u, "data-drawing-bar-visible", m1())), c;
  })()];
}, Iu = /* @__PURE__ */ y('<svg class="logo" viewBox="0 0 80 92"><path d="M28.148808359375,51.7280513671875L22.963588359375,51.7280513671875C21.572648359375002,51.7280513671875,20.445068359375,52.6220613671875,20.445068359375,53.7248813671875L20.445068359375,72.3979013671875C20.445068359375,73.5007013671875,21.572648359375002,74.39470136718751,22.963588359375,74.39470136718751L33.926568359375,74.39470136718751C35.317468359375,74.39470136718751,36.445068359375,73.5007013671875,36.445068359375,72.3979013671875L36.445068359375,53.7248813671875C36.445068359375,52.6220613671875,35.317468359375,51.7280513671875,33.926568359375,51.7280513671875L28.741398359374998,51.7280513671875L28.741398359374998,46.2963223671875C28.741398359374998,46.1665793671875,28.608748359375,46.0614013671875,28.445108359375,46.0614013671875C28.281468359375,46.0614013671875,28.148808359375,46.1665793671875,28.148808359375,46.2963223671875L28.148808359375,51.7280513671875ZM28.741398359374998,74.3948013671875L28.741398359374998,79.82650136718749C28.741398359374998,79.9563013671875,28.608748359375,80.0614013671875,28.445108359375,80.0614013671875C28.281468359375,80.0614013671875,28.148808359375,79.9563013671875,28.148808359375,79.82650136718749L28.148808359375,74.3948013671875L28.741398359374998,74.3948013671875Z"></path><path d="M51.148808359374996,44.7280513671875L45.963588359375,44.7280513671875C44.572648359375,44.7280513671875,43.445068359375,45.6220613671875,43.445068359375,46.7248813671875L43.445068359375,65.3979013671875C43.445068359375,66.5007013671875,44.572648359375,67.39470136718751,45.963588359375,67.39470136718751L56.926568359375,67.39470136718751C58.317468359375,67.39470136718751,59.445068359375,66.5007013671875,59.445068359375,65.3979013671875L59.445068359375,46.7248813671875C59.445068359375,45.6220613671875,58.317468359375,44.7280513671875,56.926568359375,44.7280513671875L51.741398359375,44.7280513671875L51.741398359375,39.2963223671875C51.741398359375,39.1665793671875,51.608748359375,39.0614013671875,51.445108359375,39.0614013671875C51.281468359375,39.0614013671875,51.148808359374996,39.1665793671875,51.148808359374996,39.2963223671875L51.148808359374996,44.7280513671875ZM51.741398359375,67.3948013671875L51.741398359375,72.82650136718749C51.741398359375,72.9563013671875,51.608748359375,73.0614013671875,51.445108359375,73.0614013671875C51.281468359375,73.0614013671875,51.148808359374996,72.9563013671875,51.148808359374996,72.82650136718749L51.148808359374996,67.3948013671875L51.741398359375,67.3948013671875Z"></path><path d="M17.7274,90.6541C17.5901,90.6541,17.4517,90.6436,17.3121,90.6225C9.93219,89.5095,4.80718,86.7136,2.07787,82.3084C-1.1223,77.1437,0.241766,71.6314,0.56829,70.5137C5.37624,46.647,15.0785,38.4945,21.5025,33.0957C22.9683,31.8633,24.2342,30.7995,25.1676,29.7672C25.4105,29.4984,25.6051,29.2154,25.7556,28.9202C24.7465,29.2231,24.1971,29.4326,24.1703,29.4429C22.908,29.9368,21.4777,29.3247,20.9761,28.076C20.4756,26.8272,21.0897,25.4146,22.352,24.9172C22.5042,24.8571,23.5312,24.4607,25.3073,23.9616C24.087,21.4425,21.7693,18.7949,19.7125,16.6431L19.2819,16.1902C16.2438,12.9776,14.6017,4.80159,14.3036,3.19471C14.1306,2.26212,14.4636,1.30796,15.1814,0.679657C15.8995,0.0512175,16.8976,-0.159672,17.8125,0.123747C22.7731,1.66274,24.2638,1.81255,27.2321,2.11098C28.7357,2.26195,29.83,3.59029,29.6762,5.07662C29.5236,6.56295,28.182,7.64786,26.6784,7.49454C24.4992,7.27569,22.9517,7.09896,20.724,6.56646C21.4493,9.09088,22.3803,11.5427,23.2771,12.4919L23.6876,12.9237C25.3757,14.69,28.9691,18.45,30.7016,22.7299C35.0392,21.9433,40.8791,21.3359,47.7817,21.7249C48.2004,20.7386,48.8054,19.7953,49.5907,18.9135C49.7137,18.7754,49.8498,18.6502,49.9988,18.539C53.6142,15.8508,57.5491,12.857,59.7803,11.0758C58.1028,11.2502,56.1034,11.0278,53.9124,9.70882C53.2439,9.30622,52.5992,8.89427,51.9662,8.48933C48.4668,6.25164,46.497,5.12109,43.4234,5.94853C41.9647,6.34058,40.4622,5.48975,40.0659,4.04789C39.6695,2.60604,40.5296,1.11853,41.9871,0.726471C47.5602,-0.773825,51.4796,1.73271,54.9364,3.9434L54.9364,3.9434C55.5284,4.32176,56.1318,4.70797,56.7564,5.08482C58.3843,6.06556,59.4858,5.76127,61.2899,5.13865C62.3511,4.77234,63.5567,4.35687,64.8675,4.53476C66.3321,4.73254,67.4406,5.56933,67.9103,6.83096C68.7444,9.07333,67.1035,11.5533,65.5797,13.2374C64.6729,14.2394,60.0845,17.7606,56.4519,20.4957C56.9477,20.3369,57.4767,20.2511,58.026,20.2511C59.4281,20.2511,60.6982,20.8102,61.621,21.7153C65.4948,20.6901,67.87,17.9563,67.9033,17.9175C68.78,16.8888,70.3322,16.7577,71.3721,17.6226C72.412,18.4886,72.5457,20.0253,71.6702,21.054C71.5221,21.2286,69.5063,23.5492,66.0787,25.233C69.5399,26.8822,72.9993,29.682,74.1841,34.4145C74.5106,35.7206,73.7062,37.0407,72.3859,37.3638C72.1871,37.4117,71.9884,37.4351,71.792,37.4351C70.687,37.4351,69.6826,36.6932,69.4046,35.5848C68.4378,31.7217,64.8144,29.7431,61.7619,28.7456C60.8298,29.7349,59.5009,30.3535,58.026,30.3535C55.8642,30.3535,54.0162,29.0245,53.2713,27.1474C53.2022,27.138,53.1331,27.1287,53.0642,27.1195C54.232,29.5936,57.0851,31.9259,58.1868,32.665C58.3157,32.7516,58.4423,32.8523,58.5547,32.9599C66.5865,40.6151,72.4887,48.8133,76.0971,57.3287C76.6815,58.7074,76.0249,60.2932,74.6313,60.8702C74.2976,61.01,73.9388,61.082,73.576,61.082C72.5065,61.082,71.4914,60.4582,71.0525,59.4213C67.7577,51.6455,62.331,44.1074,54.9203,37.0116C53.6073,36.1009,48.0984,31.9917,47.2065,26.583C40.9421,26.2679,35.6187,26.8278,31.6725,27.5336C31.6197,29.527,30.9225,31.5172,29.2456,33.3731C28.0614,34.6827,26.5968,35.915,25.0446,37.2188C21.9414,39.8269,18.2648,42.9169,14.8104,48.1192C11.356,53.3215,8.12389,60.6361,5.9098,71.6934C5.88732,71.8035,5.85893,71.9123,5.82344,72.0188C5.81634,72.041,4.57886,76.0413,6.77344,79.5289C8.6332,82.4828,12.4557,84.4139,18.1367,85.2705C19.6297,85.4953,20.6566,86.8762,20.4295,88.3532C20.2213,89.6944,19.0559,90.6541,17.7274,90.6541ZM35.1195,7.03101C33.3502,7.03101,31.9158,5.61208,31.9158,3.86173C31.9158,2.11139,33.3502,0.69245,35.1195,0.69245C36.8889,0.69245,38.3233,2.11139,38.3233,3.86173C38.3233,5.61208,36.8889,7.03101,35.1195,7.03101ZM57.6848,23.1892L58.414,24.4754C58.8984,24.3623,59.3923,24.3435,59.8644,24.4203C60.2191,24.5005,60.5087,24.7182,60.6663,25.0229C60.8636,25.3394,60.8993,25.7346,60.7646,26.1094C60.5988,26.5176,60.2972,26.8749,59.9085,27.1235L60.31,27.8316L59.7886,28.1294L59.3994,27.443C58.9257,27.7175,58.399,27.883,57.8664,27.9247L57.3744,27.0569C57.6378,27.0741,57.9071,27.048,58.1704,26.9797C58.4501,26.9251,58.7239,26.8323,58.9829,26.7044L58.2801,25.4647C57.8047,25.5877,57.3167,25.6065,56.8549,25.5197C56.4913,25.4263,56.196,25.1971,56.0328,24.8814C55.8433,24.5561,55.8127,24.1572,55.9484,23.7789C56.088,23.373,56.3763,23.0149,56.7584,22.7726L56.4166,22.1699L56.938,21.8721L57.2727,22.4625C57.6615,22.2376,58.0888,22.0901,58.5254,22.0301L59.0042,22.8746C58.5548,22.8828,58.103,22.9906,57.6848,23.1892ZM56.9319,24.2961Q57.1278,24.6417,57.7863,24.5856L57.1695,23.4978Q56.6982,23.884,56.9319,24.2961ZM58.9077,25.3462L59.4981,26.3875L59.499,26.3891Q59.9965,26.0045,59.7628,25.5923Q59.573,25.2576,58.9077,25.3462ZM73.2212,66.5065C73.2212,68.2569,74.6555,69.6758,76.4249,69.6758C78.1943,69.6758,79.6286,68.2569,79.6286,66.5065C79.6286,64.7562,78.1943,63.3372,76.4249,63.3372C74.6555,63.3372,73.2212,64.7562,73.2212,66.5065ZM35.9465,91.8045C35.0734,91.8045,34.2038,91.7987,33.3378,91.7858C31.827,91.7636,30.6203,90.5359,30.6428,89.0402C30.6653,87.5457,31.9158,86.3297,33.4183,86.3742C49.6344,86.6059,65.7512,84.6175,67.6134,84.037C72.1953,82.4184,74.5295,79.3603,74.5295,74.9575C74.5295,73.463,75.754,72.2517,77.2648,72.2517C78.7755,72.2517,80,73.463,80,74.9575C80,81.5992,76.148,86.7686,69.4317,89.142C67.0041,89.9999,51.0955,91.8046,35.9465,91.8045ZM25.2731,92C23.5037,92,22.0693,90.5811,22.0693,88.8307C22.0693,87.0804,23.5037,85.6615,25.2731,85.6615C27.0424,85.6615,28.4768,87.0804,28.4768,88.8307C28.4768,90.5811,27.0424,92,25.2731,92Z"></path></svg>'), Du = Iu.cloneNode(!0);
class Eu {
  constructor(t) {
    Q1(this, "_chartApi", null);
    if (j.isString(t.container)) {
      if (this._container = document.getElementById(t.container), !this._container)
        throw new Error("Container is null");
    } else
      this._container = t.container;
    this._container.classList.add("klinecharts-pro"), this._container.setAttribute("data-theme", t.theme ?? "light");
    const n = this;
    m5(() => m(Tu, {
      ref: (r) => {
        n._chartApi = r;
      },
      get styles() {
        return t.styles ?? {};
      },
      get watermark() {
        return t.watermark ?? Du;
      },
      get theme() {
        return t.theme ?? "light";
      },
      get locale() {
        return t.locale ?? "zh-CN";
      },
      get drawingBarVisible() {
        return t.drawingBarVisible ?? !0;
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
      }
    }), this._container);
  }
  // Drawing methods
  createOverlay(t) {
    var n, r;
    return ((r = (n = this._chartApi) == null ? void 0 : n.createOverlay) == null ? void 0 : r.call(n, t)) ?? null;
  }
  removeOverlay(t) {
    var n, r;
    (r = (n = this._chartApi) == null ? void 0 : n.removeOverlay) == null || r.call(n, t);
  }
  removeAllOverlay() {
    var t, n;
    (n = (t = this._chartApi) == null ? void 0 : t.removeAllOverlay) == null || n.call(t);
  }
  getAllOverlay() {
    var t, n;
    return ((n = (t = this._chartApi) == null ? void 0 : t.getAllOverlay) == null ? void 0 : n.call(t)) || [];
  }
  getOverlay(t) {
    var n, r;
    return ((r = (n = this._chartApi) == null ? void 0 : n.getOverlay) == null ? void 0 : r.call(n, t)) ?? null;
  }
  overrideOverlay(t) {
    var n, r;
    (r = (n = this._chartApi) == null ? void 0 : n.overrideOverlay) == null || r.call(n, t);
  }
  // Utility methods
  dispose() {
    var t, n;
    (n = (t = this._chartApi) == null ? void 0 : t.dispose) == null || n.call(t);
  }
  resize() {
    var t, n;
    (n = (t = this._chartApi) == null ? void 0 : t.resize) == null || n.call(t);
  }
  getMainIndicators() {
    return this._chartApi.getMainIndicators();
  }
  overrideIndicator(t, n) {
    const r = this._chartApi;
    r && typeof r.overrideIndicator == "function" ? r.overrideIndicator(t, n) : console.warn("overrideIndicator method not available on chart API");
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
    var n;
    (n = this._container) == null || n.setAttribute("data-theme", t), this._chartApi.setTheme(t);
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
    var n, r;
    (r = (n = this._chartApi) == null ? void 0 : n.saveDrawings) == null || r.call(n, t);
  }
  loadDrawings(t) {
    var n, r;
    (r = (n = this._chartApi) == null ? void 0 : n.loadDrawings) == null || r.call(n, t);
  }
  getDrawings(t) {
    var n, r;
    return ((r = (n = this._chartApi) == null ? void 0 : n.getDrawings) == null ? void 0 : r.call(n, t)) || [];
  }
  clearDrawings(t) {
    var n, r;
    (r = (n = this._chartApi) == null ? void 0 : n.clearDrawings) == null || r.call(n, t);
  }
  enableAutoSave(t, n = !0) {
    var r, a;
    (a = (r = this._chartApi) == null ? void 0 : r.enableAutoSave) == null || a.call(r, t, n);
  }
}
r5.forEach((e) => {
  Ke(e);
});
export {
  Ou as DefaultDatafeed,
  Eu as KLineChartPro,
  Bu as loadLocales
};
//# sourceMappingURL=klinecharts-pro.js.map
