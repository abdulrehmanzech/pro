var _5 = Object.defineProperty;
var k5 = (e, t, r) => t in e ? _5(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var He = (e, t, r) => (k5(e, typeof t != "symbol" ? t + "" : t, r), r);
import { utils as l1, OverlayMode as It, LineType as W1, init as L5, FormatDateType as tt, DomPosition as Nt, ActionType as rt, dispose as H0, TooltipIconPosition as nt, CandleType as x5, YAxisType as A5, registerOverlay as w5 } from "klinecharts";
function Ye(e, t, r) {
  const n = (e.x - t.x) * Math.cos(r) - (e.y - t.y) * Math.sin(r) + t.x, o = (e.x - t.x) * Math.sin(r) + (e.y - t.y) * Math.cos(r) + t.y;
  return { x: n, y: o };
}
function Ft(e, t) {
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
      y: l1.getLinearYFromCoordinates(e[0], e[1], { x: 0, y: e[0].y })
    } : r = {
      x: t.width,
      y: l1.getLinearYFromCoordinates(e[0], e[1], { x: t.width, y: e[0].y })
    }, { coordinates: [e[0], r] };
  }
  return [];
}
function I9(e, t) {
  const r = Math.abs(e.x - t.x), n = Math.abs(e.y - t.y);
  return Math.sqrt(r * r + n * n);
}
const M5 = {
  name: "arrow",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = e[1].x > e[0].x ? 0 : 1, r = l1.getLinearSlopeIntercept(e[0], e[1]);
      let n;
      r ? n = Math.atan(r[0]) + Math.PI * t : e[1].y > e[0].y ? n = Math.PI / 2 : n = Math.PI / 2 * 3;
      const o = Ye({ x: e[1].x - 8, y: e[1].y + 4 }, e[1], n), l = Ye({ x: e[1].x - 8, y: e[1].y - 4 }, e[1], n);
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
}, S5 = {
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
      const t = I9(e[0], e[1]);
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
}, T5 = {
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
}, P5 = {
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
}, O5 = {
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
}, D5 = {
  name: "fibonacciCircle",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = Math.abs(e[0].x - e[1].x), r = Math.abs(e[0].y - e[1].y), n = Math.sqrt(t * t + r * r), o = [0.236, 0.382, 0.5, 0.618, 0.786, 1], l = [], u = [];
      return o.forEach((c) => {
        const C = n * c;
        l.push(
          { ...e[0], r: C }
        ), u.push({
          x: e[0].x,
          y: e[0].y + C + 6,
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
}, I5 = {
  name: "fibonacciSegment",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: r }) => {
    const n = [], o = [];
    if (e.length > 1) {
      const l = e[1].x > e[0].x ? e[0].x : e[1].x, u = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0], c = e[0].y - e[1].y, C = t.points, $ = C[0].value - C[1].value;
      u.forEach((y) => {
        const x = e[1].y + c * y, A = (C[1].value + $ * y).toFixed(r.price);
        n.push({ coordinates: [{ x: e[0].x, y: x }, { x: e[1].x, y: x }] }), o.push({
          x: l,
          y: x,
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
}, N5 = {
  name: "fibonacciSpiral",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, bounding: t }) => {
    if (e.length > 1) {
      const r = I9(e[0], e[1]) / Math.sqrt(24), n = e[1].x > e[0].x ? 0 : 1, o = l1.getLinearSlopeIntercept(e[0], e[1]);
      let l;
      o ? l = Math.atan(o[0]) + Math.PI * n : e[1].y > e[0].y ? l = Math.PI / 2 : l = Math.PI / 2 * 3;
      const u = Ye(
        { x: e[0].x - r, y: e[0].y },
        e[0],
        l
      ), c = Ye(
        { x: e[0].x - r, y: e[0].y - r },
        e[0],
        l
      ), C = [{
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
      let $ = e[0].x - r, y = e[0].y - r;
      for (let x = 2; x < 9; x++) {
        const A = C[x - 2].r + C[x - 1].r;
        let P = 0;
        switch (x % 4) {
          case 0: {
            P = l, $ -= C[x - 2].r;
            break;
          }
          case 1: {
            P = l + Math.PI / 2, y -= C[x - 2].r;
            break;
          }
          case 2: {
            P = l + Math.PI, $ += C[x - 2].r;
            break;
          }
          case 3: {
            P = l + Math.PI / 2 * 3, y += C[x - 2].r;
            break;
          }
        }
        const I = P + Math.PI / 2, j = Ye({ x: $, y }, e[0], l);
        C.push({
          ...j,
          r: A,
          startAngle: P,
          endAngle: I
        });
      }
      return [
        {
          type: "arc",
          attrs: C
        },
        {
          type: "line",
          attrs: Ft(e, t)
        }
      ];
    }
    return [];
  }
}, E5 = {
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
      const l = e[1].x > e[0].x ? -38 : 4, u = e[1].y > e[0].y ? -2 : 20, c = e[1].x - e[0].x, C = e[1].y - e[0].y;
      [1, 0.75, 0.618, 0.5, 0.382, 0.25, 0].forEach((y) => {
        const x = e[1].x - c * y, A = e[1].y - C * y;
        r.push({ coordinates: [{ x, y: e[0].y }, { x, y: e[1].y }] }), r.push({ coordinates: [{ x: e[0].x, y: A }, { x: e[1].x, y: A }] }), n = n.concat(Ft([e[0], { x, y: e[1].y }], t)), n = n.concat(Ft([e[0], { x: e[1].x, y: A }], t)), o.unshift({
          x: e[0].x + l,
          y: A + 10,
          text: `${y.toFixed(3)}`
        }), o.unshift({
          x: x - 18,
          y: e[0].y + u,
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
}, B5 = {
  name: "fibonacciExtension",
  totalStep: 4,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: r }) => {
    const n = [], o = [];
    if (e.length > 2) {
      const l = t.points, u = l[1].value - l[0].value, c = e[1].y - e[0].y, C = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1], $ = e[2].x > e[1].x ? e[1].x : e[2].x;
      C.forEach((y) => {
        const x = e[2].y + c * y, A = (l[2].value + u * y).toFixed(r.price);
        n.push({ coordinates: [{ x: e[1].x, y: x }, { x: e[2].x, y: x }] }), o.push({
          x: $,
          y: x,
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
}, U5 = {
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
}, F5 = {
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
}, K5 = {
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
}, j5 = {
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
}, z5 = {
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
}, Q5 = {
  name: "abcd",
  totalStep: 5,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    let t = [], r = [];
    const n = ["A", "B", "C", "D"], o = e.map((l, u) => ({
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
        attrs: o
      }
    ];
  }
}, Z5 = {
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
    const r = [], n = [], o = ["X", "A", "B", "C", "D"], l = e.map((u, c) => ({
      ...u,
      baseline: "bottom",
      text: `(${o[c]})`
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
}, R5 = [
  M5,
  S5,
  T5,
  O5,
  P5,
  D5,
  I5,
  N5,
  E5,
  B5,
  U5,
  F5,
  K5,
  j5,
  z5,
  Q5,
  Z5
];
class Yh {
  constructor(t) {
    He(this, "_apiKey");
    He(this, "_prevSymbolMarket");
    He(this, "_ws");
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
    return await ((await (await fetch(`https://api.polygon.io/v2/aggs/ticker/${t.ticker}/range/${r.multiplier}/${r.timespan}/${n}/${o}?apiKey=${this._apiKey}`)).json()).results || []).map((c) => ({
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
    var o, l;
    this._prevSymbolMarket !== t.market ? ((o = this._ws) == null || o.close(), this._ws = new WebSocket(`wss://delayed.polygon.io/${t.market}`), this._ws.onopen = () => {
      var u;
      (u = this._ws) == null || u.send(JSON.stringify({ action: "auth", params: this._apiKey }));
    }, this._ws.onmessage = (u) => {
      var C;
      const c = JSON.parse(u.data);
      c[0].ev === "status" ? c[0].status === "auth_success" && ((C = this._ws) == null || C.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` }))) : "sym" in c && n({
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
const v1 = {};
function V5(e) {
  v1.context = e;
}
const H5 = (e, t) => e === t, Kt = Symbol("solid-proxy"), q5 = Symbol("solid-track"), lt = {
  equals: H5
};
let N9 = F9;
const ee = 1, ct = 2, E9 = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, Et = {};
var y1 = null;
let Ce = null, s1 = null, _1 = null, X1 = null, Yt = 0;
function Ge(e, t) {
  const r = s1, n = y1, o = e.length === 0, l = o ? E9 : {
    owned: null,
    cleanups: null,
    context: null,
    owner: t === void 0 ? n : t
  }, u = o ? e : () => e(() => J1(() => pt(l)));
  y1 = l, s1 = null;
  try {
    return ae(u, !0);
  } finally {
    s1 = r, y1 = n;
  }
}
function S(e, t) {
  t = t ? Object.assign({}, lt, t) : lt;
  const r = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, n = (o) => (typeof o == "function" && (o = o(r.value)), U9(r, o));
  return [B9.bind(r), n];
}
function q0(e, t, r) {
  const n = mt(e, t, !0, ee);
  Ae(n);
}
function N(e, t, r) {
  const n = mt(e, t, !1, ee);
  Ae(n);
}
function D1(e, t, r) {
  N9 = e6;
  const n = mt(e, t, !1, ee);
  n.user = !0, X1 ? X1.push(n) : Ae(n);
}
function q(e, t, r) {
  r = r ? Object.assign({}, lt, r) : lt;
  const n = mt(e, t, !0, 0);
  return n.observers = null, n.observerSlots = null, n.comparator = r.equals || void 0, Ae(n), B9.bind(n);
}
function Y5(e, t, r) {
  let n, o, l;
  arguments.length === 2 && typeof t == "object" || arguments.length === 1 ? (n = !0, o = e, l = t || {}) : (n = e, o = t, l = r || {});
  let u = null, c = Et, C = null, $ = !1, y = "initialValue" in l, x = typeof n == "function" && q(n);
  const A = /* @__PURE__ */ new Set(), [P, I] = (l.storage || S)(l.initialValue), [j, R] = S(void 0), [F, V] = S(void 0, {
    equals: !1
  }), [E, B] = S(y ? "ready" : "unresolved");
  if (v1.context) {
    C = `${v1.context.id}${v1.context.count++}`;
    let z;
    l.ssrLoadFrom === "initial" ? c = l.initialValue : v1.load && (z = v1.load(C)) && (c = z[0]);
  }
  function G(z, i1, J, T1) {
    return u === z && (u = null, y = !0, (z === c || i1 === c) && l.onHydrated && queueMicrotask(() => l.onHydrated(T1, {
      value: i1
    })), c = Et, I1(i1, J)), i1;
  }
  function I1(z, i1) {
    ae(() => {
      i1 === void 0 && I(() => z), B(i1 !== void 0 ? "errored" : "ready"), R(i1);
      for (const J of A.keys())
        J.decrement();
      A.clear();
    }, !1);
  }
  function m1() {
    const z = W5, i1 = P(), J = j();
    if (J !== void 0 && !u)
      throw J;
    return s1 && !s1.user && z && q0(() => {
      F(), u && (z.resolved || A.has(z) || (z.increment(), A.add(z)));
    }), i1;
  }
  function S1(z = !0) {
    if (z !== !1 && $)
      return;
    $ = !1;
    const i1 = x ? x() : n;
    if (i1 == null || i1 === !1) {
      G(u, J1(P));
      return;
    }
    const J = c !== Et ? c : J1(() => o(i1, {
      value: P(),
      refetching: z
    }));
    return typeof J != "object" || !(J && "then" in J) ? (G(u, J, void 0, i1), J) : (u = J, $ = !0, queueMicrotask(() => $ = !1), ae(() => {
      B(y ? "refreshing" : "pending"), V();
    }, !1), J.then((T1) => G(J, T1, void 0, i1), (T1) => G(J, void 0, j9(T1), i1)));
  }
  return Object.defineProperties(m1, {
    state: {
      get: () => E()
    },
    error: {
      get: () => j()
    },
    loading: {
      get() {
        const z = E();
        return z === "pending" || z === "refreshing";
      }
    },
    latest: {
      get() {
        if (!y)
          return m1();
        const z = j();
        if (z && !u)
          throw z;
        return P();
      }
    }
  }), x ? q0(() => S1(!1)) : S1(!1), [m1, {
    refetch: S1,
    mutate: I
  }];
}
function J1(e) {
  if (s1 === null)
    return e();
  const t = s1;
  s1 = null;
  try {
    return e();
  } finally {
    s1 = t;
  }
}
function Gt(e) {
  D1(() => J1(e));
}
function me(e) {
  return y1 === null || (y1.cleanups === null ? y1.cleanups = [e] : y1.cleanups.push(e)), e;
}
function G5(e) {
  const t = s1, r = y1;
  return Promise.resolve().then(() => {
    s1 = t, y1 = r;
    let n;
    return ae(e, !1), s1 = y1 = null, n ? n.done : void 0;
  });
}
let W5;
function B9() {
  const e = Ce;
  if (this.sources && (this.state || e))
    if (this.state === ee || e)
      Ae(this);
    else {
      const t = _1;
      _1 = null, ae(() => dt(this), !1), _1 = t;
    }
  if (s1) {
    const t = this.observers ? this.observers.length : 0;
    s1.sources ? (s1.sources.push(this), s1.sourceSlots.push(t)) : (s1.sources = [this], s1.sourceSlots = [t]), this.observers ? (this.observers.push(s1), this.observerSlots.push(s1.sources.length - 1)) : (this.observers = [s1], this.observerSlots = [s1.sources.length - 1]);
  }
  return this.value;
}
function U9(e, t, r) {
  let n = e.value;
  return (!e.comparator || !e.comparator(n, t)) && (e.value = t, e.observers && e.observers.length && ae(() => {
    for (let o = 0; o < e.observers.length; o += 1) {
      const l = e.observers[o], u = Ce && Ce.running;
      u && Ce.disposed.has(l), (u && !l.tState || !u && !l.state) && (l.pure ? _1.push(l) : X1.push(l), l.observers && K9(l)), u || (l.state = ee);
    }
    if (_1.length > 1e6)
      throw _1 = [], new Error();
  }, !1)), t;
}
function Ae(e) {
  if (!e.fn)
    return;
  pt(e);
  const t = y1, r = s1, n = Yt;
  s1 = y1 = e, X5(e, e.value, n), s1 = r, y1 = t;
}
function X5(e, t, r) {
  let n;
  try {
    n = e.fn(t);
  } catch (o) {
    e.pure && (e.state = ee, e.owned && e.owned.forEach(pt), e.owned = null), z9(o);
  }
  (!e.updatedAt || e.updatedAt <= r) && (e.updatedAt != null && "observers" in e ? U9(e, n) : e.value = n, e.updatedAt = r);
}
function mt(e, t, r, n = ee, o) {
  const l = {
    fn: e,
    state: n,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: y1,
    context: null,
    pure: r
  };
  return y1 === null || y1 !== E9 && (y1.owned ? y1.owned.push(l) : y1.owned = [l]), l;
}
function ut(e) {
  const t = Ce;
  if (e.state === 0 || t)
    return;
  if (e.state === ct || t)
    return dt(e);
  if (e.suspense && J1(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const r = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < Yt); )
    (e.state || t) && r.push(e);
  for (let n = r.length - 1; n >= 0; n--)
    if (e = r[n], e.state === ee || t)
      Ae(e);
    else if (e.state === ct || t) {
      const o = _1;
      _1 = null, ae(() => dt(e, r[0]), !1), _1 = o;
    }
}
function ae(e, t) {
  if (_1)
    return e();
  let r = !1;
  t || (_1 = []), X1 ? r = !0 : X1 = [], Yt++;
  try {
    const n = e();
    return J5(r), n;
  } catch (n) {
    r || (X1 = null), _1 = null, z9(n);
  }
}
function J5(e) {
  if (_1 && (F9(_1), _1 = null), e)
    return;
  const t = X1;
  X1 = null, t.length && ae(() => N9(t), !1);
}
function F9(e) {
  for (let t = 0; t < e.length; t++)
    ut(e[t]);
}
function e6(e) {
  let t, r = 0;
  for (t = 0; t < e.length; t++) {
    const n = e[t];
    n.user ? e[r++] = n : ut(n);
  }
  for (v1.context && V5(), t = 0; t < r; t++)
    ut(e[t]);
}
function dt(e, t) {
  const r = Ce;
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
    const o = e.sources[n];
    o.sources && (o.state === ee || r ? o !== t && ut(o) : (o.state === ct || r) && dt(o, t));
  }
}
function K9(e) {
  const t = Ce;
  for (let r = 0; r < e.observers.length; r += 1) {
    const n = e.observers[r];
    (!n.state || t) && (n.state = ct, n.pure ? _1.push(n) : X1.push(n), n.observers && K9(n));
  }
}
function pt(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const r = e.sources.pop(), n = e.sourceSlots.pop(), o = r.observers;
      if (o && o.length) {
        const l = o.pop(), u = r.observerSlots.pop();
        n < o.length && (l.sourceSlots[u] = n, o[n] = l, r.observerSlots[n] = u);
      }
    }
  if (e.owned) {
    for (t = 0; t < e.owned.length; t++)
      pt(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = 0; t < e.cleanups.length; t++)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function j9(e) {
  return e instanceof Error || typeof e == "string" ? e : new Error("Unknown error");
}
function z9(e) {
  throw e = j9(e), e;
}
const t6 = Symbol("fallback");
function Y0(e) {
  for (let t = 0; t < e.length; t++)
    e[t]();
}
function r6(e, t, r = {}) {
  let n = [], o = [], l = [], u = 0, c = t.length > 1 ? [] : null;
  return me(() => Y0(l)), () => {
    let C = e() || [], $, y;
    return C[q5], J1(() => {
      let A = C.length, P, I, j, R, F, V, E, B, G;
      if (A === 0)
        u !== 0 && (Y0(l), l = [], n = [], o = [], u = 0, c && (c = [])), r.fallback && (n = [t6], o[0] = Ge((I1) => (l[0] = I1, r.fallback())), u = 1);
      else if (u === 0) {
        for (o = new Array(A), y = 0; y < A; y++)
          n[y] = C[y], o[y] = Ge(x);
        u = A;
      } else {
        for (j = new Array(A), R = new Array(A), c && (F = new Array(A)), V = 0, E = Math.min(u, A); V < E && n[V] === C[V]; V++)
          ;
        for (E = u - 1, B = A - 1; E >= V && B >= V && n[E] === C[B]; E--, B--)
          j[B] = o[E], R[B] = l[E], c && (F[B] = c[E]);
        for (P = /* @__PURE__ */ new Map(), I = new Array(B + 1), y = B; y >= V; y--)
          G = C[y], $ = P.get(G), I[y] = $ === void 0 ? -1 : $, P.set(G, y);
        for ($ = V; $ <= E; $++)
          G = n[$], y = P.get(G), y !== void 0 && y !== -1 ? (j[y] = o[$], R[y] = l[$], c && (F[y] = c[$]), y = I[y], P.set(G, y)) : l[$]();
        for (y = V; y < A; y++)
          y in j ? (o[y] = j[y], l[y] = R[y], c && (c[y] = F[y], c[y](y))) : o[y] = Ge(x);
        o = o.slice(0, u = A), n = C.slice(0);
      }
      return o;
    });
    function x(A) {
      if (l[y] = A, c) {
        const [P, I] = S(y);
        return c[y] = I, t(C[y], P);
      }
      return t(C[y]);
    }
  };
}
function L(e, t) {
  return J1(() => e(t || {}));
}
function it() {
  return !0;
}
const n6 = {
  get(e, t, r) {
    return t === Kt ? r : e.get(t);
  },
  has(e, t) {
    return t === Kt ? !0 : e.has(t);
  },
  set: it,
  deleteProperty: it,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: it,
      deleteProperty: it
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function Bt(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function Q9(...e) {
  let t = !1;
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    t = t || !!o && Kt in o, e[n] = typeof o == "function" ? (t = !0, q(o)) : o;
  }
  if (t)
    return new Proxy({
      get(n) {
        for (let o = e.length - 1; o >= 0; o--) {
          const l = Bt(e[o])[n];
          if (l !== void 0)
            return l;
        }
      },
      has(n) {
        for (let o = e.length - 1; o >= 0; o--)
          if (n in Bt(e[o]))
            return !0;
        return !1;
      },
      keys() {
        const n = [];
        for (let o = 0; o < e.length; o++)
          n.push(...Object.keys(Bt(e[o])));
        return [...new Set(n)];
      }
    }, n6);
  const r = {};
  for (let n = e.length - 1; n >= 0; n--)
    if (e[n]) {
      const o = Object.getOwnPropertyDescriptors(e[n]);
      for (const l in o)
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
function jt(e) {
  const t = "fallback" in e && {
    fallback: () => e.fallback
  };
  return q(r6(() => e.each, e.children, t || void 0));
}
function Z(e) {
  let t = !1;
  const r = e.keyed, n = q(() => e.when, void 0, {
    equals: (o, l) => t ? o === l : !o == !l
  });
  return q(() => {
    const o = n();
    if (o) {
      const l = e.children, u = typeof l == "function" && l.length > 0;
      return t = r || u, u ? J1(() => l(o)) : l;
    }
    return e.fallback;
  }, void 0, void 0);
}
function i6(e, t, r) {
  let n = r.length, o = t.length, l = n, u = 0, c = 0, C = t[o - 1].nextSibling, $ = null;
  for (; u < o || c < l; ) {
    if (t[u] === r[c]) {
      u++, c++;
      continue;
    }
    for (; t[o - 1] === r[l - 1]; )
      o--, l--;
    if (o === u) {
      const y = l < n ? c ? r[c - 1].nextSibling : r[l - c] : C;
      for (; c < l; )
        e.insertBefore(r[c++], y);
    } else if (l === c)
      for (; u < o; )
        (!$ || !$.has(t[u])) && t[u].remove(), u++;
    else if (t[u] === r[l - 1] && r[c] === t[o - 1]) {
      const y = t[--o].nextSibling;
      e.insertBefore(r[c++], t[u++].nextSibling), e.insertBefore(r[--l], y), t[o] = r[l];
    } else {
      if (!$) {
        $ = /* @__PURE__ */ new Map();
        let x = c;
        for (; x < l; )
          $.set(r[x], x++);
      }
      const y = $.get(t[u]);
      if (y != null)
        if (c < y && y < l) {
          let x = u, A = 1, P;
          for (; ++x < o && x < l && !((P = $.get(t[x])) == null || P !== y + A); )
            A++;
          if (A > y - c) {
            const I = t[u];
            for (; c < y; )
              e.insertBefore(r[c++], I);
          } else
            e.replaceChild(r[c++], t[u++]);
        } else
          u++;
      else
        t[u++].remove();
    }
  }
}
const G0 = "_$DX_DELEGATE";
function o6(e, t, r, n = {}) {
  let o;
  return Ge((l) => {
    o = l, t === document ? e() : k(t, e(), t.firstChild ? null : void 0, r);
  }, n.owner), () => {
    o(), t.textContent = "";
  };
}
function b(e, t, r) {
  const n = document.createElement("template");
  n.innerHTML = e;
  let o = n.content.firstChild;
  return r && (o = o.firstChild), o;
}
function F1(e, t = window.document) {
  const r = t[G0] || (t[G0] = /* @__PURE__ */ new Set());
  for (let n = 0, o = e.length; n < o; n++) {
    const l = e[n];
    r.has(l) || (r.add(l), t.addEventListener(l, a6));
  }
}
function k1(e, t, r) {
  r == null ? e.removeAttribute(t) : e.setAttribute(t, r);
}
function f1(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function oe(e, t, r, n) {
  if (n)
    Array.isArray(r) ? (e[`$$${t}`] = r[0], e[`$$${t}Data`] = r[1]) : e[`$$${t}`] = r;
  else if (Array.isArray(r)) {
    const o = r[0];
    e.addEventListener(t, r[0] = (l) => o.call(e, r[1], l));
  } else
    e.addEventListener(t, r);
}
function pe(e, t, r) {
  if (!t)
    return r ? k1(e, "style") : t;
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
function ge(e, t, r) {
  return J1(() => e(t, r));
}
function k(e, t, r, n) {
  if (r !== void 0 && !n && (n = []), typeof t != "function")
    return ht(e, t, n, r);
  N((o) => ht(e, t(), o, r), n);
}
function a6(e) {
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
  }), v1.registry && !v1.done && (v1.done = !0, document.querySelectorAll("[id^=pl-]").forEach((n) => {
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
function ht(e, t, r, n, o) {
  for (v1.context && !r && (r = [...e.childNodes]); typeof r == "function"; )
    r = r();
  if (t === r)
    return r;
  const l = typeof t, u = n !== void 0;
  if (e = u && r[0] && r[0].parentNode || e, l === "string" || l === "number") {
    if (v1.context)
      return r;
    if (l === "number" && (t = t.toString()), u) {
      let c = r[0];
      c && c.nodeType === 3 ? c.data = t : c = document.createTextNode(t), r = xe(e, r, n, c);
    } else
      r !== "" && typeof r == "string" ? r = e.firstChild.data = t : r = e.textContent = t;
  } else if (t == null || l === "boolean") {
    if (v1.context)
      return r;
    r = xe(e, r, n);
  } else {
    if (l === "function")
      return N(() => {
        let c = t();
        for (; typeof c == "function"; )
          c = c();
        r = ht(e, c, r, n);
      }), () => r;
    if (Array.isArray(t)) {
      const c = [], C = r && Array.isArray(r);
      if (zt(c, t, r, o))
        return N(() => r = ht(e, c, r, n, !0)), () => r;
      if (v1.context) {
        if (!c.length)
          return r;
        for (let $ = 0; $ < c.length; $++)
          if (c[$].parentNode)
            return r = c;
      }
      if (c.length === 0) {
        if (r = xe(e, r, n), u)
          return r;
      } else
        C ? r.length === 0 ? W0(e, c, n) : i6(e, r, c) : (r && xe(e), W0(e, c));
      r = c;
    } else if (t instanceof Node) {
      if (v1.context && t.parentNode)
        return r = u ? [t] : t;
      if (Array.isArray(r)) {
        if (u)
          return r = xe(e, r, n, t);
        xe(e, r, null, t);
      } else
        r == null || r === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      r = t;
    }
  }
  return r;
}
function zt(e, t, r, n) {
  let o = !1;
  for (let l = 0, u = t.length; l < u; l++) {
    let c = t[l], C = r && r[l];
    if (c instanceof Node)
      e.push(c);
    else if (!(c == null || c === !0 || c === !1))
      if (Array.isArray(c))
        o = zt(e, c, C) || o;
      else if (typeof c == "function")
        if (n) {
          for (; typeof c == "function"; )
            c = c();
          o = zt(e, Array.isArray(c) ? c : [c], Array.isArray(C) ? C : [C]) || o;
        } else
          e.push(c), o = !0;
      else {
        const $ = String(c);
        C && C.nodeType === 3 && C.data === $ ? e.push(C) : e.push(document.createTextNode($));
      }
  }
  return o;
}
function W0(e, t, r = null) {
  for (let n = 0, o = t.length; n < o; n++)
    e.insertBefore(t[n], r);
}
function xe(e, t, r, n) {
  if (r === void 0)
    return e.textContent = "";
  const o = n || document.createTextNode("");
  if (t.length) {
    let l = !1;
    for (let u = t.length - 1; u >= 0; u--) {
      const c = t[u];
      if (o !== c) {
        const C = c.parentNode === e;
        !l && !u ? C ? e.replaceChild(o, c) : e.insertBefore(o, r) : C && c.remove();
      } else
        l = !0;
    }
  } else
    e.insertBefore(o, r);
  return [o];
}
const s6 = "http://www.w3.org/2000/svg";
function l6(e, t = !1) {
  return t ? document.createElementNS(s6, e) : document.createElement(e);
}
function c6(e) {
  const {
    useShadow: t
  } = e, r = document.createTextNode(""), n = e.mount || document.body;
  function o() {
    if (v1.context) {
      const [l, u] = S(!1);
      return queueMicrotask(() => u(!0)), () => l() && e.children;
    } else
      return () => e.children;
  }
  if (n instanceof HTMLHeadElement) {
    const [l, u] = S(!1), c = () => u(!0);
    Ge((C) => k(n, () => l() ? C() : o()(), null)), me(() => {
      v1.context ? queueMicrotask(c) : c();
    });
  } else {
    const l = l6(e.isSVG ? "g" : "div", e.isSVG), u = t && l.attachShadow ? l.attachShadow({
      mode: "open"
    }) : l;
    Object.defineProperty(l, "_$host", {
      get() {
        return r.parentNode;
      },
      configurable: !0
    }), k(u, o()), n.appendChild(l), e.ref && e.ref(l), me(() => n.removeChild(l));
  }
  return r;
}
var ot = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Z9(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var u6 = typeof ot == "object" && ot && ot.Object === Object && ot, R9 = u6, d6 = R9, h6 = typeof self == "object" && self && self.Object === Object && self, f6 = d6 || h6 || Function("return this")(), V1 = f6, y6 = V1, C6 = y6.Symbol, vt = C6, X0 = vt, V9 = Object.prototype, g6 = V9.hasOwnProperty, m6 = V9.toString, qe = X0 ? X0.toStringTag : void 0;
function p6(e) {
  var t = g6.call(e, qe), r = e[qe];
  try {
    e[qe] = void 0;
    var n = !0;
  } catch {
  }
  var o = m6.call(e);
  return n && (t ? e[qe] = r : delete e[qe]), o;
}
var v6 = p6, b6 = Object.prototype, $6 = b6.toString;
function _6(e) {
  return $6.call(e);
}
var k6 = _6, J0 = vt, L6 = v6, x6 = k6, A6 = "[object Null]", w6 = "[object Undefined]", e9 = J0 ? J0.toStringTag : void 0;
function M6(e) {
  return e == null ? e === void 0 ? w6 : A6 : e9 && e9 in Object(e) ? L6(e) : x6(e);
}
var We = M6;
function S6(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var we = S6, T6 = We, P6 = we, O6 = "[object AsyncFunction]", D6 = "[object Function]", I6 = "[object GeneratorFunction]", N6 = "[object Proxy]";
function E6(e) {
  if (!P6(e))
    return !1;
  var t = T6(e);
  return t == D6 || t == I6 || t == O6 || t == N6;
}
var H9 = E6, B6 = V1, U6 = B6["__core-js_shared__"], F6 = U6, Ut = F6, t9 = function() {
  var e = /[^.]+$/.exec(Ut && Ut.keys && Ut.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function K6(e) {
  return !!t9 && t9 in e;
}
var j6 = K6, z6 = Function.prototype, Q6 = z6.toString;
function Z6(e) {
  if (e != null) {
    try {
      return Q6.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var q9 = Z6, R6 = H9, V6 = j6, H6 = we, q6 = q9, Y6 = /[\\^$.*+?()[\]{}|]/g, G6 = /^\[object .+?Constructor\]$/, W6 = Function.prototype, X6 = Object.prototype, J6 = W6.toString, er = X6.hasOwnProperty, tr = RegExp(
  "^" + J6.call(er).replace(Y6, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function rr(e) {
  if (!H6(e) || V6(e))
    return !1;
  var t = R6(e) ? tr : G6;
  return t.test(q6(e));
}
var nr = rr;
function ir(e, t) {
  return e == null ? void 0 : e[t];
}
var or = ir, ar = nr, sr = or;
function lr(e, t) {
  var r = sr(e, t);
  return ar(r) ? r : void 0;
}
var ve = lr, cr = ve, ur = function() {
  try {
    var e = cr(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), dr = ur, r9 = dr;
function hr(e, t, r) {
  t == "__proto__" && r9 ? r9(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var Y9 = hr;
function fr(e, t) {
  return e === t || e !== e && t !== t;
}
var G9 = fr, yr = Y9, Cr = G9, gr = Object.prototype, mr = gr.hasOwnProperty;
function pr(e, t, r) {
  var n = e[t];
  (!(mr.call(e, t) && Cr(n, r)) || r === void 0 && !(t in e)) && yr(e, t, r);
}
var Wt = pr, vr = Array.isArray, Me = vr;
function br(e) {
  return e != null && typeof e == "object";
}
var Se = br, $r = We, _r = Se, kr = "[object Symbol]";
function Lr(e) {
  return typeof e == "symbol" || _r(e) && $r(e) == kr;
}
var Xt = Lr, xr = Me, Ar = Xt, wr = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Mr = /^\w*$/;
function Sr(e, t) {
  if (xr(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || Ar(e) ? !0 : Mr.test(e) || !wr.test(e) || t != null && e in Object(t);
}
var Tr = Sr, Pr = ve, Or = Pr(Object, "create"), bt = Or, n9 = bt;
function Dr() {
  this.__data__ = n9 ? n9(null) : {}, this.size = 0;
}
var Ir = Dr;
function Nr(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var Er = Nr, Br = bt, Ur = "__lodash_hash_undefined__", Fr = Object.prototype, Kr = Fr.hasOwnProperty;
function jr(e) {
  var t = this.__data__;
  if (Br) {
    var r = t[e];
    return r === Ur ? void 0 : r;
  }
  return Kr.call(t, e) ? t[e] : void 0;
}
var zr = jr, Qr = bt, Zr = Object.prototype, Rr = Zr.hasOwnProperty;
function Vr(e) {
  var t = this.__data__;
  return Qr ? t[e] !== void 0 : Rr.call(t, e);
}
var Hr = Vr, qr = bt, Yr = "__lodash_hash_undefined__";
function Gr(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = qr && t === void 0 ? Yr : t, this;
}
var Wr = Gr, Xr = Ir, Jr = Er, e2 = zr, t2 = Hr, r2 = Wr;
function Te(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Te.prototype.clear = Xr;
Te.prototype.delete = Jr;
Te.prototype.get = e2;
Te.prototype.has = t2;
Te.prototype.set = r2;
var n2 = Te;
function i2() {
  this.__data__ = [], this.size = 0;
}
var o2 = i2, a2 = G9;
function s2(e, t) {
  for (var r = e.length; r--; )
    if (a2(e[r][0], t))
      return r;
  return -1;
}
var $t = s2, l2 = $t, c2 = Array.prototype, u2 = c2.splice;
function d2(e) {
  var t = this.__data__, r = l2(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : u2.call(t, r, 1), --this.size, !0;
}
var h2 = d2, f2 = $t;
function y2(e) {
  var t = this.__data__, r = f2(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var C2 = y2, g2 = $t;
function m2(e) {
  return g2(this.__data__, e) > -1;
}
var p2 = m2, v2 = $t;
function b2(e, t) {
  var r = this.__data__, n = v2(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
var $2 = b2, _2 = o2, k2 = h2, L2 = C2, x2 = p2, A2 = $2;
function Pe(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Pe.prototype.clear = _2;
Pe.prototype.delete = k2;
Pe.prototype.get = L2;
Pe.prototype.has = x2;
Pe.prototype.set = A2;
var _t = Pe, w2 = ve, M2 = V1, S2 = w2(M2, "Map"), Jt = S2, i9 = n2, T2 = _t, P2 = Jt;
function O2() {
  this.size = 0, this.__data__ = {
    hash: new i9(),
    map: new (P2 || T2)(),
    string: new i9()
  };
}
var D2 = O2;
function I2(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var N2 = I2, E2 = N2;
function B2(e, t) {
  var r = e.__data__;
  return E2(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var kt = B2, U2 = kt;
function F2(e) {
  var t = U2(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var K2 = F2, j2 = kt;
function z2(e) {
  return j2(this, e).get(e);
}
var Q2 = z2, Z2 = kt;
function R2(e) {
  return Z2(this, e).has(e);
}
var V2 = R2, H2 = kt;
function q2(e, t) {
  var r = H2(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
var Y2 = q2, G2 = D2, W2 = K2, X2 = Q2, J2 = V2, en = Y2;
function Oe(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Oe.prototype.clear = G2;
Oe.prototype.delete = W2;
Oe.prototype.get = X2;
Oe.prototype.has = J2;
Oe.prototype.set = en;
var W9 = Oe, X9 = W9, tn = "Expected a function";
function e0(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(tn);
  var r = function() {
    var n = arguments, o = t ? t.apply(this, n) : n[0], l = r.cache;
    if (l.has(o))
      return l.get(o);
    var u = e.apply(this, n);
    return r.cache = l.set(o, u) || l, u;
  };
  return r.cache = new (e0.Cache || X9)(), r;
}
e0.Cache = X9;
var rn = e0, nn = rn, on = 500;
function an(e) {
  var t = nn(e, function(n) {
    return r.size === on && r.clear(), n;
  }), r = t.cache;
  return t;
}
var sn = an, ln = sn, cn = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, un = /\\(\\)?/g, dn = ln(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(cn, function(r, n, o, l) {
    t.push(o ? l.replace(un, "$1") : n || r);
  }), t;
}), hn = dn;
function fn(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = Array(n); ++r < n; )
    o[r] = t(e[r], r, e);
  return o;
}
var yn = fn, o9 = vt, Cn = yn, gn = Me, mn = Xt, pn = 1 / 0, a9 = o9 ? o9.prototype : void 0, s9 = a9 ? a9.toString : void 0;
function J9(e) {
  if (typeof e == "string")
    return e;
  if (gn(e))
    return Cn(e, J9) + "";
  if (mn(e))
    return s9 ? s9.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -pn ? "-0" : t;
}
var vn = J9, bn = vn;
function $n(e) {
  return e == null ? "" : bn(e);
}
var _n = $n, kn = Me, Ln = Tr, xn = hn, An = _n;
function wn(e, t) {
  return kn(e) ? e : Ln(e, t) ? [e] : xn(An(e));
}
var Mn = wn, Sn = 9007199254740991, Tn = /^(?:0|[1-9]\d*)$/;
function Pn(e, t) {
  var r = typeof e;
  return t = t ?? Sn, !!t && (r == "number" || r != "symbol" && Tn.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var e5 = Pn, On = Xt, Dn = 1 / 0;
function In(e) {
  if (typeof e == "string" || On(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -Dn ? "-0" : t;
}
var Nn = In, En = Wt, Bn = Mn, Un = e5, l9 = we, Fn = Nn;
function Kn(e, t, r, n) {
  if (!l9(e))
    return e;
  t = Bn(t, e);
  for (var o = -1, l = t.length, u = l - 1, c = e; c != null && ++o < l; ) {
    var C = Fn(t[o]), $ = r;
    if (C === "__proto__" || C === "constructor" || C === "prototype")
      return e;
    if (o != u) {
      var y = c[C];
      $ = n ? n(y, C, c) : void 0, $ === void 0 && ($ = l9(y) ? y : Un(t[o + 1]) ? [] : {});
    }
    En(c, C, $), c = c[C];
  }
  return e;
}
var jn = Kn, zn = jn;
function Qn(e, t, r) {
  return e == null ? e : zn(e, t, r);
}
var Zn = Qn;
const Qt = /* @__PURE__ */ Z9(Zn);
var Rn = _t;
function Vn() {
  this.__data__ = new Rn(), this.size = 0;
}
var Hn = Vn;
function qn(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
var Yn = qn;
function Gn(e) {
  return this.__data__.get(e);
}
var Wn = Gn;
function Xn(e) {
  return this.__data__.has(e);
}
var Jn = Xn, e3 = _t, t3 = Jt, r3 = W9, n3 = 200;
function i3(e, t) {
  var r = this.__data__;
  if (r instanceof e3) {
    var n = r.__data__;
    if (!t3 || n.length < n3 - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new r3(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
var o3 = i3, a3 = _t, s3 = Hn, l3 = Yn, c3 = Wn, u3 = Jn, d3 = o3;
function De(e) {
  var t = this.__data__ = new a3(e);
  this.size = t.size;
}
De.prototype.clear = s3;
De.prototype.delete = l3;
De.prototype.get = c3;
De.prototype.has = u3;
De.prototype.set = d3;
var h3 = De;
function f3(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var y3 = f3, C3 = Wt, g3 = Y9;
function m3(e, t, r, n) {
  var o = !r;
  r || (r = {});
  for (var l = -1, u = t.length; ++l < u; ) {
    var c = t[l], C = n ? n(r[c], e[c], c, r, e) : void 0;
    C === void 0 && (C = e[c]), o ? g3(r, c, C) : C3(r, c, C);
  }
  return r;
}
var Lt = m3;
function p3(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var v3 = p3, b3 = We, $3 = Se, _3 = "[object Arguments]";
function k3(e) {
  return $3(e) && b3(e) == _3;
}
var L3 = k3, c9 = L3, x3 = Se, t5 = Object.prototype, A3 = t5.hasOwnProperty, w3 = t5.propertyIsEnumerable, M3 = c9(function() {
  return arguments;
}()) ? c9 : function(e) {
  return x3(e) && A3.call(e, "callee") && !w3.call(e, "callee");
}, S3 = M3, ft = { exports: {} };
function T3() {
  return !1;
}
var P3 = T3;
ft.exports;
(function(e, t) {
  var r = V1, n = P3, o = t && !t.nodeType && t, l = o && !0 && e && !e.nodeType && e, u = l && l.exports === o, c = u ? r.Buffer : void 0, C = c ? c.isBuffer : void 0, $ = C || n;
  e.exports = $;
})(ft, ft.exports);
var r5 = ft.exports, O3 = 9007199254740991;
function D3(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= O3;
}
var n5 = D3, I3 = We, N3 = n5, E3 = Se, B3 = "[object Arguments]", U3 = "[object Array]", F3 = "[object Boolean]", K3 = "[object Date]", j3 = "[object Error]", z3 = "[object Function]", Q3 = "[object Map]", Z3 = "[object Number]", R3 = "[object Object]", V3 = "[object RegExp]", H3 = "[object Set]", q3 = "[object String]", Y3 = "[object WeakMap]", G3 = "[object ArrayBuffer]", W3 = "[object DataView]", X3 = "[object Float32Array]", J3 = "[object Float64Array]", e8 = "[object Int8Array]", t8 = "[object Int16Array]", r8 = "[object Int32Array]", n8 = "[object Uint8Array]", i8 = "[object Uint8ClampedArray]", o8 = "[object Uint16Array]", a8 = "[object Uint32Array]", a1 = {};
a1[X3] = a1[J3] = a1[e8] = a1[t8] = a1[r8] = a1[n8] = a1[i8] = a1[o8] = a1[a8] = !0;
a1[B3] = a1[U3] = a1[G3] = a1[F3] = a1[W3] = a1[K3] = a1[j3] = a1[z3] = a1[Q3] = a1[Z3] = a1[R3] = a1[V3] = a1[H3] = a1[q3] = a1[Y3] = !1;
function s8(e) {
  return E3(e) && N3(e.length) && !!a1[I3(e)];
}
var l8 = s8;
function c8(e) {
  return function(t) {
    return e(t);
  };
}
var t0 = c8, yt = { exports: {} };
yt.exports;
(function(e, t) {
  var r = R9, n = t && !t.nodeType && t, o = n && !0 && e && !e.nodeType && e, l = o && o.exports === n, u = l && r.process, c = function() {
    try {
      var C = o && o.require && o.require("util").types;
      return C || u && u.binding && u.binding("util");
    } catch {
    }
  }();
  e.exports = c;
})(yt, yt.exports);
var r0 = yt.exports, u8 = l8, d8 = t0, u9 = r0, d9 = u9 && u9.isTypedArray, h8 = d9 ? d8(d9) : u8, f8 = h8, y8 = v3, C8 = S3, g8 = Me, m8 = r5, p8 = e5, v8 = f8, b8 = Object.prototype, $8 = b8.hasOwnProperty;
function _8(e, t) {
  var r = g8(e), n = !r && C8(e), o = !r && !n && m8(e), l = !r && !n && !o && v8(e), u = r || n || o || l, c = u ? y8(e.length, String) : [], C = c.length;
  for (var $ in e)
    (t || $8.call(e, $)) && !(u && // Safari 9 has enumerable `arguments.length` in strict mode.
    ($ == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    o && ($ == "offset" || $ == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    l && ($ == "buffer" || $ == "byteLength" || $ == "byteOffset") || // Skip index properties.
    p8($, C))) && c.push($);
  return c;
}
var i5 = _8, k8 = Object.prototype;
function L8(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || k8;
  return e === r;
}
var n0 = L8;
function x8(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var o5 = x8, A8 = o5, w8 = A8(Object.keys, Object), M8 = w8, S8 = n0, T8 = M8, P8 = Object.prototype, O8 = P8.hasOwnProperty;
function D8(e) {
  if (!S8(e))
    return T8(e);
  var t = [];
  for (var r in Object(e))
    O8.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
var I8 = D8, N8 = H9, E8 = n5;
function B8(e) {
  return e != null && E8(e.length) && !N8(e);
}
var a5 = B8, U8 = i5, F8 = I8, K8 = a5;
function j8(e) {
  return K8(e) ? U8(e) : F8(e);
}
var i0 = j8, z8 = Lt, Q8 = i0;
function Z8(e, t) {
  return e && z8(t, Q8(t), e);
}
var R8 = Z8;
function V8(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var H8 = V8, q8 = we, Y8 = n0, G8 = H8, W8 = Object.prototype, X8 = W8.hasOwnProperty;
function J8(e) {
  if (!q8(e))
    return G8(e);
  var t = Y8(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !X8.call(e, n)) || r.push(n);
  return r;
}
var e7 = J8, t7 = i5, r7 = e7, n7 = a5;
function i7(e) {
  return n7(e) ? t7(e, !0) : r7(e);
}
var o0 = i7, o7 = Lt, a7 = o0;
function s7(e, t) {
  return e && o7(t, a7(t), e);
}
var l7 = s7, Ct = { exports: {} };
Ct.exports;
(function(e, t) {
  var r = V1, n = t && !t.nodeType && t, o = n && !0 && e && !e.nodeType && e, l = o && o.exports === n, u = l ? r.Buffer : void 0, c = u ? u.allocUnsafe : void 0;
  function C($, y) {
    if (y)
      return $.slice();
    var x = $.length, A = c ? c(x) : new $.constructor(x);
    return $.copy(A), A;
  }
  e.exports = C;
})(Ct, Ct.exports);
var c7 = Ct.exports;
function u7(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
var d7 = u7;
function h7(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = 0, l = []; ++r < n; ) {
    var u = e[r];
    t(u, r, e) && (l[o++] = u);
  }
  return l;
}
var f7 = h7;
function y7() {
  return [];
}
var s5 = y7, C7 = f7, g7 = s5, m7 = Object.prototype, p7 = m7.propertyIsEnumerable, h9 = Object.getOwnPropertySymbols, v7 = h9 ? function(e) {
  return e == null ? [] : (e = Object(e), C7(h9(e), function(t) {
    return p7.call(e, t);
  }));
} : g7, a0 = v7, b7 = Lt, $7 = a0;
function _7(e, t) {
  return b7(e, $7(e), t);
}
var k7 = _7;
function L7(e, t) {
  for (var r = -1, n = t.length, o = e.length; ++r < n; )
    e[o + r] = t[r];
  return e;
}
var l5 = L7, x7 = o5, A7 = x7(Object.getPrototypeOf, Object), c5 = A7, w7 = l5, M7 = c5, S7 = a0, T7 = s5, P7 = Object.getOwnPropertySymbols, O7 = P7 ? function(e) {
  for (var t = []; e; )
    w7(t, S7(e)), e = M7(e);
  return t;
} : T7, u5 = O7, D7 = Lt, I7 = u5;
function N7(e, t) {
  return D7(e, I7(e), t);
}
var E7 = N7, B7 = l5, U7 = Me;
function F7(e, t, r) {
  var n = t(e);
  return U7(e) ? n : B7(n, r(e));
}
var d5 = F7, K7 = d5, j7 = a0, z7 = i0;
function Q7(e) {
  return K7(e, z7, j7);
}
var Z7 = Q7, R7 = d5, V7 = u5, H7 = o0;
function q7(e) {
  return R7(e, H7, V7);
}
var Y7 = q7, G7 = ve, W7 = V1, X7 = G7(W7, "DataView"), J7 = X7, ei = ve, ti = V1, ri = ei(ti, "Promise"), ni = ri, ii = ve, oi = V1, ai = ii(oi, "Set"), si = ai, li = ve, ci = V1, ui = li(ci, "WeakMap"), di = ui, Zt = J7, Rt = Jt, Vt = ni, Ht = si, qt = di, h5 = We, Ie = q9, f9 = "[object Map]", hi = "[object Object]", y9 = "[object Promise]", C9 = "[object Set]", g9 = "[object WeakMap]", m9 = "[object DataView]", fi = Ie(Zt), yi = Ie(Rt), Ci = Ie(Vt), gi = Ie(Ht), mi = Ie(qt), ye = h5;
(Zt && ye(new Zt(new ArrayBuffer(1))) != m9 || Rt && ye(new Rt()) != f9 || Vt && ye(Vt.resolve()) != y9 || Ht && ye(new Ht()) != C9 || qt && ye(new qt()) != g9) && (ye = function(e) {
  var t = h5(e), r = t == hi ? e.constructor : void 0, n = r ? Ie(r) : "";
  if (n)
    switch (n) {
      case fi:
        return m9;
      case yi:
        return f9;
      case Ci:
        return y9;
      case gi:
        return C9;
      case mi:
        return g9;
    }
  return t;
});
var s0 = ye, pi = Object.prototype, vi = pi.hasOwnProperty;
function bi(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && vi.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
var $i = bi, _i = V1, ki = _i.Uint8Array, Li = ki, p9 = Li;
function xi(e) {
  var t = new e.constructor(e.byteLength);
  return new p9(t).set(new p9(e)), t;
}
var l0 = xi, Ai = l0;
function wi(e, t) {
  var r = t ? Ai(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var Mi = wi, Si = /\w*$/;
function Ti(e) {
  var t = new e.constructor(e.source, Si.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var Pi = Ti, v9 = vt, b9 = v9 ? v9.prototype : void 0, $9 = b9 ? b9.valueOf : void 0;
function Oi(e) {
  return $9 ? Object($9.call(e)) : {};
}
var Di = Oi, Ii = l0;
function Ni(e, t) {
  var r = t ? Ii(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
var Ei = Ni, Bi = l0, Ui = Mi, Fi = Pi, Ki = Di, ji = Ei, zi = "[object Boolean]", Qi = "[object Date]", Zi = "[object Map]", Ri = "[object Number]", Vi = "[object RegExp]", Hi = "[object Set]", qi = "[object String]", Yi = "[object Symbol]", Gi = "[object ArrayBuffer]", Wi = "[object DataView]", Xi = "[object Float32Array]", Ji = "[object Float64Array]", eo = "[object Int8Array]", to = "[object Int16Array]", ro = "[object Int32Array]", no = "[object Uint8Array]", io = "[object Uint8ClampedArray]", oo = "[object Uint16Array]", ao = "[object Uint32Array]";
function so(e, t, r) {
  var n = e.constructor;
  switch (t) {
    case Gi:
      return Bi(e);
    case zi:
    case Qi:
      return new n(+e);
    case Wi:
      return Ui(e, r);
    case Xi:
    case Ji:
    case eo:
    case to:
    case ro:
    case no:
    case io:
    case oo:
    case ao:
      return ji(e, r);
    case Zi:
      return new n();
    case Ri:
    case qi:
      return new n(e);
    case Vi:
      return Fi(e);
    case Hi:
      return new n();
    case Yi:
      return Ki(e);
  }
}
var lo = so, co = we, _9 = Object.create, uo = function() {
  function e() {
  }
  return function(t) {
    if (!co(t))
      return {};
    if (_9)
      return _9(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}(), ho = uo, fo = ho, yo = c5, Co = n0;
function go(e) {
  return typeof e.constructor == "function" && !Co(e) ? fo(yo(e)) : {};
}
var mo = go, po = s0, vo = Se, bo = "[object Map]";
function $o(e) {
  return vo(e) && po(e) == bo;
}
var _o = $o, ko = _o, Lo = t0, k9 = r0, L9 = k9 && k9.isMap, xo = L9 ? Lo(L9) : ko, Ao = xo, wo = s0, Mo = Se, So = "[object Set]";
function To(e) {
  return Mo(e) && wo(e) == So;
}
var Po = To, Oo = Po, Do = t0, x9 = r0, A9 = x9 && x9.isSet, Io = A9 ? Do(A9) : Oo, No = Io, Eo = h3, Bo = y3, Uo = Wt, Fo = R8, Ko = l7, jo = c7, zo = d7, Qo = k7, Zo = E7, Ro = Z7, Vo = Y7, Ho = s0, qo = $i, Yo = lo, Go = mo, Wo = Me, Xo = r5, Jo = Ao, ea = we, ta = No, ra = i0, na = o0, ia = 1, oa = 2, aa = 4, f5 = "[object Arguments]", sa = "[object Array]", la = "[object Boolean]", ca = "[object Date]", ua = "[object Error]", y5 = "[object Function]", da = "[object GeneratorFunction]", ha = "[object Map]", fa = "[object Number]", C5 = "[object Object]", ya = "[object RegExp]", Ca = "[object Set]", ga = "[object String]", ma = "[object Symbol]", pa = "[object WeakMap]", va = "[object ArrayBuffer]", ba = "[object DataView]", $a = "[object Float32Array]", _a = "[object Float64Array]", ka = "[object Int8Array]", La = "[object Int16Array]", xa = "[object Int32Array]", Aa = "[object Uint8Array]", wa = "[object Uint8ClampedArray]", Ma = "[object Uint16Array]", Sa = "[object Uint32Array]", n1 = {};
n1[f5] = n1[sa] = n1[va] = n1[ba] = n1[la] = n1[ca] = n1[$a] = n1[_a] = n1[ka] = n1[La] = n1[xa] = n1[ha] = n1[fa] = n1[C5] = n1[ya] = n1[Ca] = n1[ga] = n1[ma] = n1[Aa] = n1[wa] = n1[Ma] = n1[Sa] = !0;
n1[ua] = n1[y5] = n1[pa] = !1;
function st(e, t, r, n, o, l) {
  var u, c = t & ia, C = t & oa, $ = t & aa;
  if (r && (u = o ? r(e, n, o, l) : r(e)), u !== void 0)
    return u;
  if (!ea(e))
    return e;
  var y = Wo(e);
  if (y) {
    if (u = qo(e), !c)
      return zo(e, u);
  } else {
    var x = Ho(e), A = x == y5 || x == da;
    if (Xo(e))
      return jo(e, c);
    if (x == C5 || x == f5 || A && !o) {
      if (u = C || A ? {} : Go(e), !c)
        return C ? Zo(e, Ko(u, e)) : Qo(e, Fo(u, e));
    } else {
      if (!n1[x])
        return o ? e : {};
      u = Yo(e, x, c);
    }
  }
  l || (l = new Eo());
  var P = l.get(e);
  if (P)
    return P;
  l.set(e, u), ta(e) ? e.forEach(function(R) {
    u.add(st(R, t, r, R, e, l));
  }) : Jo(e) && e.forEach(function(R, F) {
    u.set(F, st(R, t, r, F, e, l));
  });
  var I = $ ? C ? Vo : Ro : C ? na : ra, j = y ? void 0 : I(e);
  return Bo(j || e, function(R, F) {
    j && (F = R, R = e[F]), Uo(u, F, st(R, t, r, F, e, l));
  }), u;
}
var Ta = st, Pa = Ta, Oa = 1, Da = 4;
function Ia(e) {
  return Pa(e, Oa | Da);
}
var Na = Ia;
const Ea = /* @__PURE__ */ Z9(Na), Ba = /* @__PURE__ */ b("<button></button>"), Ua = (e) => (() => {
  const t = Ba.cloneNode(!0);
  return oe(t, "click", e.onClick, !0), k(t, () => e.children), N((r) => {
    const n = e.style, o = `klinecharts-pro-button ${e.type ?? "confirm"} ${e.class ?? ""}`;
    return r._v$ = pe(t, n, r._v$), o !== r._v$2 && f1(t, r._v$2 = o), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
F1(["click"]);
const Fa = /* @__PURE__ */ b('<svg viewBox="0 0 1024 1024" class="icon"><path d="M810.666667 128H213.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v597.333334c0 46.933333 38.4 85.333333 85.333333 85.333333h597.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V213.333333c0-46.933333-38.4-85.333333-85.333333-85.333333z m-353.706667 567.04a42.496 42.496 0 0 1-60.16 0L243.626667 541.866667c-8.106667-8.106667-12.373333-18.773333-12.373334-29.866667s4.693333-22.186667 12.373334-29.866667a42.496 42.496 0 0 1 60.16 0L426.666667 604.586667l293.546666-293.546667a42.496 42.496 0 1 1 60.16 60.16l-323.413333 323.84z"></path></svg>'), Ka = /* @__PURE__ */ b('<svg viewBox="0 0 1024 1024" class="icon"><path d="M245.333333 128h533.333334A117.333333 117.333333 0 0 1 896 245.333333v533.333334A117.333333 117.333333 0 0 1 778.666667 896H245.333333A117.333333 117.333333 0 0 1 128 778.666667V245.333333A117.333333 117.333333 0 0 1 245.333333 128z m0 64c-29.44 0-53.333333 23.893333-53.333333 53.333333v533.333334c0 29.44 23.893333 53.333333 53.333333 53.333333h533.333334c29.44 0 53.333333-23.893333 53.333333-53.333333V245.333333c0-29.44-23.893333-53.333333-53.333333-53.333333H245.333333z"></path></svg>'), ja = /* @__PURE__ */ b("<div></div>"), za = /* @__PURE__ */ b('<span class="label"></span>'), Qa = () => Fa.cloneNode(!0), Za = () => Ka.cloneNode(!0), w9 = (e) => {
  const [t, r] = S(e.checked ?? !1);
  return D1(() => {
    "checked" in e && r(e.checked);
  }), (() => {
    const n = ja.cloneNode(!0);
    return n.$$click = (o) => {
      const l = !t();
      e.onChange && e.onChange(l), r(l);
    }, k(n, (() => {
      const o = q(() => !!t());
      return () => o() ? L(Qa, {}) : L(Za, {});
    })(), null), k(n, (() => {
      const o = q(() => !!e.label);
      return () => o() && (() => {
        const l = za.cloneNode(!0);
        return k(l, () => e.label), l;
      })();
    })(), null), N((o) => {
      const l = e.style, u = `klinecharts-pro-checkbox ${t() && "checked" || ""} ${e.class || ""}`;
      return o._v$ = pe(n, l, o._v$), u !== o._v$2 && f1(n, o._v$2 = u), o;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), n;
  })();
};
F1(["click"]);
const Ra = /* @__PURE__ */ b('<div class="klinecharts-pro-loading"><i class="circle1"></i><i class="circle2"></i><i class="circle3"></i></div>'), g5 = () => Ra.cloneNode(!0), Va = /* @__PURE__ */ b('<div class="klinecharts-pro-empty"><svg class="icon" viewBox="0 0 1024 1024"><path d="M855.6 427.2H168.5c-12.7 0-24.4 6.9-30.6 18L4.4 684.7C1.5 689.9 0 695.8 0 701.8v287.1c0 19.4 15.7 35.1 35.1 35.1H989c19.4 0 35.1-15.7 35.1-35.1V701.8c0-6-1.5-11.8-4.4-17.1L886.2 445.2c-6.2-11.1-17.9-18-30.6-18zM673.4 695.6c-16.5 0-30.8 11.5-34.3 27.7-12.7 58.5-64.8 102.3-127.2 102.3s-114.5-43.8-127.2-102.3c-3.5-16.1-17.8-27.7-34.3-27.7H119c-26.4 0-43.3-28-31.1-51.4l81.7-155.8c6.1-11.6 18-18.8 31.1-18.8h622.4c13 0 25 7.2 31.1 18.8l81.7 155.8c12.2 23.4-4.7 51.4-31.1 51.4H673.4zM819.9 209.5c-1-1.8-2.1-3.7-3.2-5.5-9.8-16.6-31.1-22.2-47.8-12.6L648.5 261c-17 9.8-22.7 31.6-12.6 48.4 0.9 1.4 1.7 2.9 2.5 4.4 9.5 17 31.2 22.8 48 13L807 257.3c16.7-9.7 22.4-31 12.9-47.8zM375.4 261.1L255 191.6c-16.7-9.6-38-4-47.8 12.6-1.1 1.8-2.1 3.6-3.2 5.5-9.5 16.8-3.8 38.1 12.9 47.8L337.3 327c16.9 9.7 38.6 4 48-13.1 0.8-1.5 1.7-2.9 2.5-4.4 10.2-16.8 4.5-38.6-12.4-48.4zM512 239.3h2.5c19.5 0.3 35.5-15.5 35.5-35.1v-139c0-19.3-15.6-34.9-34.8-35.1h-6.4C489.6 30.3 474 46 474 65.2v139c0 19.5 15.9 35.4 35.5 35.1h2.5z"></path></svg></div>'), Ha = () => Va.cloneNode(!0), qa = /* @__PURE__ */ b("<ul></ul>"), Ya = /* @__PURE__ */ b("<li></li>"), gt = (e) => (() => {
  const t = qa.cloneNode(!0);
  return k(t, L(Z, {
    get when() {
      return e.loading;
    },
    get children() {
      return L(g5, {});
    }
  }), null), k(t, L(Z, {
    get when() {
      var r;
      return !e.loading && !e.children && !((r = e.dataSource) != null && r.length);
    },
    get children() {
      return L(Ha, {});
    }
  }), null), k(t, L(Z, {
    get when() {
      return e.children;
    },
    get children() {
      return e.children;
    }
  }), null), k(t, L(Z, {
    get when() {
      return !e.children;
    },
    get children() {
      var r;
      return (r = e.dataSource) == null ? void 0 : r.map((n) => {
        var o;
        return ((o = e.renderItem) == null ? void 0 : o.call(e, n)) ?? Ya.cloneNode(!0);
      });
    }
  }), null), N((r) => {
    const n = e.style, o = `klinecharts-pro-list ${e.class ?? ""}`;
    return r._v$ = pe(t, n, r._v$), o !== r._v$2 && f1(t, r._v$2 = o), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})(), Ga = /* @__PURE__ */ b('<div class="klinecharts-pro-modal"><div class="inner"><div class="title-container"><svg class="close-icon" viewBox="0 0 1024 1024"><path d="M934.184927 199.723787 622.457206 511.452531l311.727721 311.703161c14.334473 14.229073 23.069415 33.951253 23.069415 55.743582 0 43.430138-35.178197 78.660524-78.735226 78.660524-21.664416 0-41.361013-8.865925-55.642275-23.069415L511.149121 622.838388 199.420377 934.490384c-14.204513 14.20349-33.901111 23.069415-55.642275 23.069415-43.482327 0-78.737272-35.230386-78.737272-78.660524 0-21.792329 8.864902-41.513486 23.094998-55.743582l311.677579-311.703161L88.135828 199.723787c-14.230096-14.255679-23.094998-33.92567-23.094998-55.642275 0-43.430138 35.254945-78.762855 78.737272-78.762855 21.741163 0 41.437761 8.813736 55.642275 23.069415l311.727721 311.727721L822.876842 88.389096c14.281261-14.255679 33.977859-23.069415 55.642275-23.069415 43.557028 0 78.735226 35.332716 78.735226 78.762855C957.254342 165.798117 948.5194 185.468109 934.184927 199.723787"></path></svg></div><div class="content-container"></div></div></div>'), Wa = /* @__PURE__ */ b('<div class="button-container"></div>'), be = (e) => (() => {
  const t = Ga.cloneNode(!0), r = t.firstChild, n = r.firstChild, o = n.firstChild, l = n.nextSibling;
  return t.$$click = (u) => {
    u.target === u.currentTarget && e.onClose && e.onClose();
  }, k(n, () => e.title, o), oe(o, "click", e.onClose, !0), k(l, () => e.children), k(r, (() => {
    const u = q(() => !!(e.buttons && e.buttons.length > 0));
    return () => u() && (() => {
      const c = Wa.cloneNode(!0);
      return k(c, () => e.buttons.map((C) => L(Ua, Q9(C, {
        get style() {
          return {
            ...e.minButtonWidth ? {
              "min-width": `${e.minButtonWidth}px`
            } : {},
            width: e.isMobile ? "100%" : "auto"
          };
        },
        get children() {
          return C.children;
        }
      })))), N((C) => {
        const $ = e.btnParentStyle, y = !!e.isMobile;
        return C._v$8 = pe(c, $, C._v$8), y !== C._v$9 && c.classList.toggle("mobile-buttons", C._v$9 = y), C;
      }, {
        _v$8: void 0,
        _v$9: void 0
      }), c;
    })();
  })(), null), N((u) => {
    const c = !!e.isMobile, C = e.isMobile ? "100%" : `${e.width ?? 400}px`, $ = (e.isMobile, "auto"), y = e.isMobile ? "60vh" : "90vh", x = !!e.isMobile, A = !!e.isMobile, P = !!e.isMobile;
    return c !== u._v$ && t.classList.toggle("mobile-modal", u._v$ = c), C !== u._v$2 && r.style.setProperty("width", u._v$2 = C), $ !== u._v$3 && r.style.setProperty("height", u._v$3 = $), y !== u._v$4 && r.style.setProperty("max-height", u._v$4 = y), x !== u._v$5 && r.classList.toggle("mobile-inner", u._v$5 = x), A !== u._v$6 && n.classList.toggle("mobile-title", u._v$6 = A), P !== u._v$7 && l.classList.toggle("mobile-content", u._v$7 = P), u;
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
const Xa = /* @__PURE__ */ b('<div tabindex="0"><div class="selector-container"><span class="value"></span><i class="arrow"></i></div></div>'), Ja = /* @__PURE__ */ b('<div class="drop-down-container"><ul></ul></div>'), es = /* @__PURE__ */ b('<div><input type="text"></div>'), ts = /* @__PURE__ */ b("<li></li>"), m5 = (e) => {
  const [t, r] = S(!1), [n, o] = S("");
  let l, u;
  const c = q(() => {
    if (!e.dataSource || !e.searchable)
      return e.dataSource;
    const y = n().toLowerCase().trim();
    return y ? typeof e.dataSource[0] == "string" ? e.dataSource.filter((A) => A.toLowerCase().includes(y)) : e.dataSource.filter((A) => {
      var j, R;
      const P = ((j = A.text) == null ? void 0 : j.toString().toLowerCase()) || "", I = ((R = A.key) == null ? void 0 : R.toLowerCase()) || "";
      return P.includes(y) || I.includes(y);
    }) : e.dataSource;
  }), C = () => {
    const y = !t();
    r(y), o(""), y && e.searchable && setTimeout(() => l == null ? void 0 : l.focus(), 50);
  }, $ = (y) => {
    const x = y.relatedTarget;
    u && x && u.contains(x) || (r(!1), o(""));
  };
  return (() => {
    const y = Xa.cloneNode(!0), x = y.firstChild, A = x.firstChild;
    y.addEventListener("blur", $), y.$$click = (I) => {
      I.stopPropagation(), C();
    };
    const P = u;
    return typeof P == "function" ? ge(P, y) : u = y, k(A, () => e.value), k(y, (() => {
      const I = q(() => !!(e.dataSource && e.dataSource.length > 0));
      return () => I() && (() => {
        const j = Ja.cloneNode(!0), R = j.firstChild;
        return j.$$mousedown = (F) => F.preventDefault(), k(j, (() => {
          const F = q(() => !!e.searchable);
          return () => F() && (() => {
            const V = es.cloneNode(!0), E = V.firstChild;
            V.style.setProperty("padding", "8px"), V.style.setProperty("border-bottom", "1px solid #333"), E.$$click = (G) => G.stopPropagation(), E.$$input = (G) => o(G.currentTarget.value);
            const B = l;
            return typeof B == "function" ? ge(B, E) : l = E, E.style.setProperty("width", "100%"), E.style.setProperty("padding", "6px 10px"), E.style.setProperty("border", "1px solid var(--klinecharts-pro-border-color)"), E.style.setProperty("border-radius", "4px"), E.style.setProperty("background-color", "var(--klinecharts-pro-popover-background-color)"), E.style.setProperty("color", "#fff"), E.style.setProperty("font-size", "13px"), E.style.setProperty("outline", "none"), N(() => k1(E, "placeholder", e.searchPlaceholder || "Search...")), N(() => E.value = n()), V;
          })();
        })(), R), k(R, () => {
          var F;
          return (F = c()) == null ? void 0 : F.map((V) => {
            const B = V[e.valueKey ?? "text"] ?? V;
            return (() => {
              const G = ts.cloneNode(!0);
              return G.$$click = (I1) => {
                var m1;
                I1.stopPropagation(), e.value !== B && ((m1 = e.onSelected) == null || m1.call(e, V)), r(!1), o("");
              }, k(G, B), G;
            })();
          });
        }), j;
      })();
    })(), null), N((I) => {
      const j = e.style, R = `klinecharts-pro-select ${e.class ?? ""} ${t() ? "klinecharts-pro-select-show" : ""}`;
      return I._v$ = pe(y, j, I._v$), R !== I._v$2 && f1(y, I._v$2 = R), I;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), y;
  })();
};
F1(["click", "mousedown", "input"]);
const rs = /* @__PURE__ */ b('<span class="prefix"></span>'), ns = /* @__PURE__ */ b('<span class="suffix"></span>'), is = /* @__PURE__ */ b('<div><input class="value"></div>'), p5 = (e) => {
  const t = Q9({
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER
  }, e);
  let r;
  const [n, o] = S("normal");
  return (() => {
    const l = is.cloneNode(!0), u = l.firstChild;
    return l.$$click = () => {
      r == null || r.focus();
    }, k(l, L(Z, {
      get when() {
        return t.prefix;
      },
      get children() {
        const c = rs.cloneNode(!0);
        return k(c, () => t.prefix), c;
      }
    }), u), u.addEventListener("change", (c) => {
      var $, y;
      const C = c.target.value;
      if ("precision" in t) {
        let x;
        const A = Math.max(0, Math.floor(t.precision));
        A <= 0 ? x = new RegExp(/^[1-9]\d*$/) : x = new RegExp("^\\d+\\.?\\d{0," + A + "}$"), (C === "" || x.test(C) && +C >= t.min && +C <= t.max) && (($ = t.onChange) == null || $.call(t, C === "" ? C : +C));
      } else
        (y = t.onChange) == null || y.call(t, C);
    }), u.addEventListener("blur", () => {
      o("normal");
    }), u.addEventListener("focus", () => {
      o("focus");
    }), ge((c) => {
      r = c;
    }, u), k(l, L(Z, {
      get when() {
        return t.suffix;
      },
      get children() {
        const c = ns.cloneNode(!0);
        return k(c, () => t.suffix), c;
      }
    }), null), N((c) => {
      const C = t.style, $ = `klinecharts-pro-input ${t.class ?? ""}`, y = n(), x = t.placeholder ?? "";
      return c._v$ = pe(l, C, c._v$), $ !== c._v$2 && f1(l, c._v$2 = $), y !== c._v$3 && k1(l, "data-status", c._v$3 = y), x !== c._v$4 && k1(u, "placeholder", c._v$4 = x), c;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0
    }), N(() => u.value = t.value), l;
  })();
};
F1(["click"]);
const os = /* @__PURE__ */ b('<div><i class="thumb"></i></div>'), as = (e) => (() => {
  const t = os.cloneNode(!0);
  return t.$$click = (r) => {
    e.onChange && e.onChange();
  }, N((r) => {
    const n = e.style, o = `klinecharts-pro-switch ${e.open ? "turn-on" : "turn-off"} ${e.class ?? ""}`;
    return r._v$ = pe(t, n, r._v$), o !== r._v$2 && f1(t, r._v$2 = o), r;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
F1(["click"]);
const ss = "指标", ls = "更多", cs = "主图指标", us = "副图指标", ds = "设置", hs = "时区", fs = "截屏", ys = "全屏", Cs = "退出全屏", gs = "保存", ms = "确定", ps = "取消", vs = "MA(移动平均线)", bs = "EMA(指数平滑移动平均线)", $s = "SMA", _s = "BOLL(布林线)", ks = "BBI(多空指数)", Ls = "SAR(停损点指向指标)", xs = "VOL(成交量)", As = "MACD(指数平滑异同移动平均线)", ws = "KDJ(随机指标)", Ms = "RSI(相对强弱指标)", Ss = "BIAS(乖离率)", Ts = "BRAR(情绪指标)", Ps = "CCI(顺势指标)", Os = "DMI(动向指标)", Ds = "CR(能量指标)", Is = "PSY(心理线)", Ns = "DMA(平行线差指标)", Es = "TRIX(三重指数平滑平均线)", Bs = "OBV(能量潮指标)", Us = "VR(成交量变异率)", Fs = "WR(威廉指标)", Ks = "MTM(动量指标)", js = "EMV(简易波动指标)", zs = "ROC(变动率指标)", Qs = "PVT(价量趋势指标)", Zs = "AO(动量震荡指标)", Rs = "世界统一时间", Vs = "(UTC-10) 檀香山", Hs = "(UTC-8) 朱诺", qs = "(UTC-7) 洛杉矶", Ys = "(UTC-5) 芝加哥", Gs = "(UTC-4) 多伦多", Ws = "(UTC-3) 圣保罗", Xs = "(UTC+1) 伦敦", Js = "(UTC+2) 柏林", e4 = "(UTC+3) 巴林", t4 = "(UTC+4) 迪拜", r4 = "(UTC+5) 阿什哈巴德", n4 = "(UTC+6) 阿拉木图", i4 = "(UTC+7) 曼谷", o4 = "(UTC+8) 上海", a4 = "(UTC+9) 东京", s4 = "(UTC+10) 悉尼", l4 = "(UTC+12) 诺福克岛", c4 = "水平直线", u4 = "水平射线", d4 = "水平线段", h4 = "垂直直线", f4 = "垂直射线", y4 = "垂直线段", C4 = "直线", g4 = "射线", m4 = "线段", p4 = "箭头", v4 = "价格线", b4 = "价格通道线", $4 = "平行直线", _4 = "斐波那契回调直线", k4 = "斐波那契回调线段", L4 = "斐波那契圆环", x4 = "斐波那契螺旋", A4 = "斐波那契速度阻力扇", w4 = "斐波那契趋势扩展", M4 = "江恩箱", S4 = "矩形", T4 = "平行四边形", P4 = "圆", O4 = "三角形", D4 = "三浪", I4 = "五浪", N4 = "八浪", E4 = "任意浪", B4 = "ABCD形态", U4 = "XABCD形态", F4 = "弱磁模式", K4 = "强磁模式", j4 = "商品搜索", z4 = "商品代码", Q4 = "参数1", Z4 = "参数2", R4 = "参数3", V4 = "参数4", H4 = "参数5", q4 = "周期", Y4 = "标准差", G4 = "蜡烛图类型", W4 = "全实心", X4 = "全空心", J4 = "涨空心", el = "跌空心", tl = "OHLC", rl = "面积图", nl = "最新价显示", il = "最高价显示", ol = "最低价显示", al = "指标最新值显示", sl = "价格轴类型", ll = "线性轴", cl = "百分比轴", ul = "对数轴", dl = "倒置坐标", hl = "网格线显示", fl = "恢复默认", yl = {
  indicator: ss,
  more: ls,
  main_indicator: cs,
  sub_indicator: us,
  setting: ds,
  timezone: hs,
  screenshot: fs,
  full_screen: ys,
  exit_full_screen: Cs,
  save: gs,
  confirm: ms,
  cancel: ps,
  ma: vs,
  ema: bs,
  sma: $s,
  boll: _s,
  bbi: ks,
  sar: Ls,
  vol: xs,
  macd: As,
  kdj: ws,
  rsi: Ms,
  bias: Ss,
  brar: Ts,
  cci: Ps,
  dmi: Os,
  cr: Ds,
  psy: Is,
  dma: Ns,
  trix: Es,
  obv: Bs,
  vr: Us,
  wr: Fs,
  mtm: Ks,
  emv: js,
  roc: zs,
  pvt: Qs,
  ao: Zs,
  utc: Rs,
  honolulu: Vs,
  juneau: Hs,
  los_angeles: qs,
  chicago: Ys,
  toronto: Gs,
  sao_paulo: Ws,
  london: Xs,
  berlin: Js,
  bahrain: e4,
  dubai: t4,
  ashkhabad: r4,
  almaty: n4,
  bangkok: i4,
  shanghai: o4,
  tokyo: a4,
  sydney: s4,
  norfolk: l4,
  horizontal_straight_line: c4,
  horizontal_ray_line: u4,
  horizontal_segment: d4,
  vertical_straight_line: h4,
  vertical_ray_line: f4,
  vertical_segment: y4,
  straight_line: C4,
  ray_line: g4,
  segment: m4,
  arrow: p4,
  price_line: v4,
  price_channel_line: b4,
  parallel_straight_line: $4,
  fibonacci_line: _4,
  fibonacci_segment: k4,
  fibonacci_circle: L4,
  fibonacci_spiral: x4,
  fibonacci_speed_resistance_fan: A4,
  fibonacci_extension: w4,
  gann_box: M4,
  rect: S4,
  parallelogram: T4,
  circle: P4,
  triangle: O4,
  three_waves: D4,
  five_waves: I4,
  eight_waves: N4,
  any_waves: E4,
  abcd: B4,
  xabcd: U4,
  weak_magnet: F4,
  strong_magnet: K4,
  symbol_search: j4,
  symbol_code: z4,
  params_1: Q4,
  params_2: Z4,
  params_3: R4,
  params_4: V4,
  params_5: H4,
  period: q4,
  standard_deviation: Y4,
  candle_type: G4,
  candle_solid: W4,
  candle_stroke: X4,
  candle_up_stroke: J4,
  candle_down_stroke: el,
  ohlc: tl,
  area: rl,
  last_price_show: nl,
  high_price_show: il,
  low_price_show: ol,
  indicator_last_value_show: al,
  price_axis_type: sl,
  normal: ll,
  percentage: cl,
  log: ul,
  reverse_coordinate: dl,
  grid_show: hl,
  restore_default: fl
}, Cl = "Indicator", gl = "More", ml = "Main Indicator", pl = "Sub Indicator", vl = "Setting", bl = "Timezone", $l = "Screenshot", _l = "Full Screen", kl = "Exit", Ll = "Save", xl = "Confirm", Al = "Cancel", wl = "MA(Moving Average)", Ml = "EMA(Exponential Moving Average)", Sl = "SMA", Tl = "BOLL(Bolinger Bands)", Pl = "BBI(Bull And Bearlndex)", Ol = "SAR(Stop and Reverse)", Dl = "VOL(Volume)", Il = "MACD(Moving Average Convergence / Divergence)", Nl = "KDJ(KDJ Index)", El = "RSI(Relative Strength Index)", Bl = "BIAS(Bias Ratio)", Ul = "BRAR(情绪指标)", Fl = "CCI(Commodity Channel Index)", Kl = "DMI(Directional Movement Index)", jl = "CR(能量指标)", zl = "PSY(Psychological Line)", Ql = "DMA(Different of Moving Average)", Zl = "TRIX(Triple Exponentially Smoothed Moving Average)", Rl = "OBV(On Balance Volume)", Vl = "VR(Volatility Volume Ratio)", Hl = "WR(Williams %R)", ql = "MTM(Momentum Index)", Yl = "EMV(Ease of Movement Value)", Gl = "ROC(Price Rate of Change)", Wl = "PVT(Price and Volume Trend)", Xl = "AO(Awesome Oscillator)", Jl = "UTC", ec = "(UTC-10) Honolulu", tc = "(UTC-8) Juneau", rc = "(UTC-7) Los Angeles", nc = "(UTC-5) Chicago", ic = "(UTC-4) Toronto", oc = "(UTC-3) Sao Paulo", ac = "(UTC+1) London", sc = "(UTC+2) Berlin", lc = "(UTC+3) Bahrain", cc = "(UTC+4) Dubai", uc = "(UTC+5) Ashkhabad", dc = "(UTC+6) Almaty", hc = "(UTC+7) Bangkok", fc = "(UTC+8) Shanghai", yc = "(UTC+9) Tokyo", Cc = "(UTC+10) Sydney", gc = "(UTC+12) Norfolk", mc = "Horizontal Line", pc = "Horizontal Ray", vc = "Horizontal Segment", bc = "Vertical Line", $c = "Vertical Ray", _c = "Vertical Segment", kc = "Trend Line", Lc = "Ray", xc = "Segment", Ac = "Arrow", wc = "Price Line", Mc = "Price Channel Line", Sc = "Parallel Line", Tc = "Fibonacci Line", Pc = "Fibonacci Segment", Oc = "Fibonacci Circle", Dc = "Fibonacci Spiral", Ic = "Fibonacci Sector", Nc = "Fibonacci Extension", Ec = "Gann Box", Bc = "Rect", Uc = "Parallelogram", Fc = "Circle", Kc = "Triangle", jc = "Three Waves", zc = "Five Waves", Qc = "Eight Waves", Zc = "Any Waves", Rc = "ABCD Pattern", Vc = "XABCD Pattern", Hc = "Weak Magnet", qc = "Strong Magnet", Yc = "Symbol Search", Gc = "Symbol Code", Wc = "Parameter 1", Xc = "Parameter 2", Jc = "Parameter 3", eu = "Parameter 4", tu = "Parameter 5", ru = "Period", nu = "Standard Deviation", iu = "Candle Type", ou = "Candle Solid", au = "Candle Stroke", su = "Candle Up Stroke", lu = "Candle Down Stroke", cu = "OHLC", uu = "Area", du = "Show Last Price", hu = "Show Highest Price", fu = "Show Lowest Price", yu = "Show indicator's last value", Cu = "Price Axis Type", gu = "Normal", mu = "Percentage", pu = "Log", vu = "Reverse Coordinate", bu = "Show Grids", $u = "Restore Defaults", _u = {
  indicator: Cl,
  more: gl,
  main_indicator: ml,
  sub_indicator: pl,
  setting: vl,
  timezone: bl,
  screenshot: $l,
  full_screen: _l,
  exit_full_screen: kl,
  save: Ll,
  confirm: xl,
  cancel: Al,
  ma: wl,
  ema: Ml,
  sma: Sl,
  boll: Tl,
  bbi: Pl,
  sar: Ol,
  vol: Dl,
  macd: Il,
  kdj: Nl,
  rsi: El,
  bias: Bl,
  brar: Ul,
  cci: Fl,
  dmi: Kl,
  cr: jl,
  psy: zl,
  dma: Ql,
  trix: Zl,
  obv: Rl,
  vr: Vl,
  wr: Hl,
  mtm: ql,
  emv: Yl,
  roc: Gl,
  pvt: Wl,
  ao: Xl,
  utc: Jl,
  honolulu: ec,
  juneau: tc,
  los_angeles: rc,
  chicago: nc,
  toronto: ic,
  sao_paulo: oc,
  london: ac,
  berlin: sc,
  bahrain: lc,
  dubai: cc,
  ashkhabad: uc,
  almaty: dc,
  bangkok: hc,
  shanghai: fc,
  tokyo: yc,
  sydney: Cc,
  norfolk: gc,
  horizontal_straight_line: mc,
  horizontal_ray_line: pc,
  horizontal_segment: vc,
  vertical_straight_line: bc,
  vertical_ray_line: $c,
  vertical_segment: _c,
  straight_line: kc,
  ray_line: Lc,
  segment: xc,
  arrow: Ac,
  price_line: wc,
  price_channel_line: Mc,
  parallel_straight_line: Sc,
  fibonacci_line: Tc,
  fibonacci_segment: Pc,
  fibonacci_circle: Oc,
  fibonacci_spiral: Dc,
  fibonacci_speed_resistance_fan: Ic,
  fibonacci_extension: Nc,
  gann_box: Ec,
  rect: Bc,
  parallelogram: Uc,
  circle: Fc,
  triangle: Kc,
  three_waves: jc,
  five_waves: zc,
  eight_waves: Qc,
  any_waves: Zc,
  abcd: Rc,
  xabcd: Vc,
  weak_magnet: Hc,
  strong_magnet: qc,
  symbol_search: Yc,
  symbol_code: Gc,
  params_1: Wc,
  params_2: Xc,
  params_3: Jc,
  params_4: eu,
  params_5: tu,
  period: ru,
  standard_deviation: nu,
  candle_type: iu,
  candle_solid: ou,
  candle_stroke: au,
  candle_up_stroke: su,
  candle_down_stroke: lu,
  ohlc: cu,
  area: uu,
  last_price_show: du,
  high_price_show: hu,
  low_price_show: fu,
  indicator_last_value_show: yu,
  price_axis_type: Cu,
  normal: gu,
  percentage: mu,
  log: pu,
  reverse_coordinate: vu,
  grid_show: bu,
  restore_default: $u
}, v5 = {
  "zh-CN": yl,
  "en-US": _u
};
function Gh(e, t) {
  v5[e] = t;
}
const a = (e, t) => {
  var r;
  return ((r = v5[t]) == null ? void 0 : r[e]) ?? e;
}, ku = /* @__PURE__ */ b('<div class="scroll-indicator left"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg></div>'), Lu = /* @__PURE__ */ b('<img alt="symbol">'), xu = /* @__PURE__ */ b('<div class="symbol"><span></span></div>'), Au = /* @__PURE__ */ b('<span class="down-arrow-icon mobile-separate-arrow"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></span>'), wu = /* @__PURE__ */ b('<span class="mobile-more-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg></span>'), Mu = /* @__PURE__ */ b('<div class="item tools"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div>'), Su = /* @__PURE__ */ b('<div class="klinecharts-pro-order-tools-popover"><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Quick Order</span></span><span class="klinecharts-pro-order-tools-chevron">›</span></button><div class="klinecharts-pro-order-tools-submenu"><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Floating Window</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Plus Button</span></label></div></div><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Open Orders</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Positions</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Breakeven Price</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Liquidation Price</span></label><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Price Line</span></span><span class="klinecharts-pro-order-tools-chevron">&rsaquo;</span></button><div class="klinecharts-pro-order-tools-submenu"><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Market Price Line</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Count Down</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Bid & Ask Price</span></label></div></div><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Order History</span></label></div>'), Tu = /* @__PURE__ */ b('<div><div class="item tools order-tools-trigger"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Orders"><path d="M4 7h10"></path><path d="M4 12h8"></path><path d="M4 17h6"></path><path d="M18 6v12"></path><path d="M15 15l3 3 3-3"></path></svg><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></div></div>'), Pu = /* @__PURE__ */ b('<div class="item tools"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path><path d="M15.22299772857666,9.722223632261718C12.59389772857666,9.722223632261718,10.44600772857666,12.020201374511718,10.44600772857666,14.861111374511719C10.44600772857666,17.70202137451172,12.58215772857666,20.000021374511718,15.223007728576661,20.000021374511718C17.86384772857666,20.000021374511718,19.99999772857666,17.70202137451172,19.99999772857666,14.861111374511719C19.99999772857666,12.020201374511718,17.85211772857666,9.72222212709572,15.22299772857666,9.722223632261718ZM15.22299772857666,18.598491374511717C13.30985772857666,18.598491374511717,11.737087728576661,16.91919137451172,11.737087728576661,14.848481374511719C11.737087728576661,12.777781374511719,13.29811772857666,11.098491374511719,15.22299772857666,11.098491374511719C17.14787772857666,11.098491374511719,18.708917728576658,12.777781374511719,18.708917728576658,14.848481374511719C18.708917728576658,16.91919137451172,17.13614772857666,18.59848137451172,15.22299772857666,18.598491374511717Z"></path><path d="M15.692486288146974,15.050496970825195L15.692486288146974,12.676760970825196C15.692486288146974,12.297972970825196,15.399058288146973,11.982316970825195,15.046945288146972,11.982316970825195C14.694833288146972,11.982316970825195,14.401406288146973,12.297972970825196,14.401406288146973,12.676760970825196L14.401406288146973,15.340896970825195C14.401406288146973,15.530296970825194,14.471829288146973,15.694436970825196,14.589200288146973,15.833326970825196L15.751176288146972,17.095956970825195C15.868546288146973,17.222216970825194,16.032866288146973,17.297976970825196,16.208916288146973,17.297976970825196C16.384976288146973,17.297976970825196,16.537556288146973,17.222216970825194,16.666666288146974,17.095956970825195C16.78403628814697,16.969686970825194,16.854456288146974,16.792916970825196,16.854456288146974,16.603526970825193C16.854456288146974,16.414136970825197,16.78403628814697,16.237366970825196,16.666666288146974,16.111106970825197L15.692486288146974,15.050496970825195Z"></path></svg></div>'), Ou = /* @__PURE__ */ b('<div class="item tools"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg></div>'), Du = /* @__PURE__ */ b('<div class="item tools"><svg viewBox="0 0 20 20"><path d="M6.50977,1L13.4902,1C13.6406,1,13.7695,1.1104910000000001,13.7969,1.2631700000000001L14.0273,2.52277C14.1387,3.13147,14.6543,3.57143,15.2559,3.57143L17.5,3.57143C18.8809,3.57143,20,4.72254,20,6.14286L20,16.4286C20,17.8489,18.8809,19,17.5,19L2.5,19C1.11914,19,0,17.8489,0,16.4286L0,6.14286C0,4.72254,1.11914,3.57143,2.5,3.57143L4.74414,3.57143C5.3457,3.57143,5.86133,3.13147,5.97266,2.52277L6.20312,1.2631700000000001C6.23047,1.1104910000000001,6.35937,1,6.50977,1ZM15.2559,4.857139999999999C14.0547,4.857139999999999,13.0215,3.97522,12.7988,2.75982L12.7129,2.28571L7.28711,2.28571L7.20117,2.75982C6.98047,3.97522,5.94727,4.857139999999999,4.74414,4.857139999999999L2.5,4.857139999999999C1.81055,4.857139999999999,1.25,5.43371,1.25,6.14286L1.25,16.4286C1.25,17.1377,1.81055,17.7143,2.5,17.7143L17.5,17.7143C18.1895,17.7143,18.75,17.1377,18.75,16.4286L18.75,6.14286C18.75,5.43371,18.1895,4.857139999999999,17.5,4.857139999999999L15.2559,4.857139999999999ZM4.375,6.78571L3.125,6.78571C2.7793,6.78571,2.5,6.49844,2.5,6.14286C2.5,5.78728,2.7793,5.5,3.125,5.5L4.375,5.5C4.7207,5.5,5,5.78728,5,6.14286C5,6.49844,4.7207,6.78571,4.375,6.78571ZM10,6.14286C7.06641,6.14286,4.6875,8.58973,4.6875,11.6071C4.6875,14.6246,7.06641,17.0714,10,17.0714C12.9336,17.0714,15.3125,14.6246,15.3125,11.6071C15.3125,8.58973,12.9336,6.14286,10,6.14286ZM10,7.42857C11.0859,7.42857,12.1055,7.8625,12.873,8.65201C13.6406,9.44152,14.0625,10.49018,14.0625,11.6071C14.0625,12.7241,13.6406,13.7728,12.873,14.5623C12.1055,15.3518,11.0859,15.7857,10,15.7857C8.91406,15.7857,7.89453,15.3518,7.12695,14.5623C6.35937,13.7728,5.9375,12.7241,5.9375,11.6071C5.9375,10.49018,6.35938,9.44152,7.12695,8.65201C7.89453,7.8625,8.91406,7.42857,10,7.42857ZM10,9.67857C8.96484,9.67857,8.125,10.54241,8.125,11.6071C8.125,12.6719,8.96484,13.5357,10,13.5357C11.0352,13.5357,11.875,12.6719,11.875,11.6071C11.875,10.54241,11.0352,9.67857,10,9.67857ZM10,10.96429C10.3438,10.96429,10.625,11.2536,10.625,11.6071C10.625,11.9607,10.3438,12.25,10,12.25C9.65625,12.25,9.375,11.9607,9.375,11.6071C9.375,11.2536,9.65625,10.96429,10,10.96429Z"></path></svg></div>'), Iu = /* @__PURE__ */ b('<div class="scroll-indicator right"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"></path></svg></div>'), Nu = /* @__PURE__ */ b('<div><div class="klinecharts-pro-period-bar"><div class="menu-container"><svg viewBox="0 0 1024 1024"><path d="M192.037 287.953h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 479.169H438.553c-17.673 0-32 14.327-32 32s14.327 32 32 32h393.608c17.673 0 32-14.327 32-32s-14.327-32-32-32zM832.161 735.802H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32zM319.028 351.594l-160 160 160 160z"></path></svg></div><div><div class="item tools"></div></div></div></div>'), Eu = /* @__PURE__ */ b("<span></span>"), Bu = /* @__PURE__ */ b('<svg viewBox="0 0 20 20"><path d="M1.08108,0L0,1.079L4.18919,5.27938L2.54826,6.91715L6.9112,6.91715L6.9112,2.56262L5.28957,4.18112L1.08108,0ZM15.8108,5.27938L20,1.079L18.9189,0L14.7104,4.18112L13.0888,2.56262L13.0888,6.91715L17.4517,6.91715L15.8108,5.27938ZM4.16988,14.7014L0.07722,18.8054L1.1583,20L5.27027,15.7996L6.9112,17.4374L6.9112,13.0829L2.54826,13.0829L4.16988,14.7014ZM17.4517,13.0829L13.0888,13.0829L13.0888,17.4374L14.7297,15.7996L18.8417,20L19.9228,18.8054L15.8301,14.7013L17.4517,13.0829Z"></path></svg>'), Uu = /* @__PURE__ */ b('<svg viewBox="0 0 20 20"><path d="M2.93444,1.76899L7.57544,6.40999L6.38918,7.59626L1.76899,2.93444L0,4.70343L0,0L4.70343,0L2.93444,1.76899ZM6.40999,12.4037L1.76899,17.0447L0,15.2758L0,19.9792L4.70343,19.9792L2.93444,18.2102L7.57544,13.5692L6.40999,12.4037ZM15.2758,0L17.0447,1.76899L12.4037,6.40999L13.59,7.59626L18.231,2.95526L20,4.72425L20,0L15.2758,0ZM13.5692,12.4037L12.3829,13.59L17.0239,18.231L15.2549,20L19.9792,20L19.9792,15.2758L18.2102,17.0447L13.5692,12.4037Z"></path></svg>'), Fu = (e) => {
  let t, r, n;
  const [o, l] = S(window.innerWidth < 768), [u, c] = S(localStorage.getItem("klinechart_secondary_period") || ""), [C, $] = S(!1), [y, x] = S(!1), [A, P] = S(!1), [I, j] = S({
    top: 0,
    left: 0,
    minWidth: 220
  }), R = () => {
    l(window.innerWidth < 768), C() && z();
  }, [F, V] = S(!1), E = () => document.fullscreenElement ?? document.body, B = () => {
    V(!!document.fullscreenElement);
  }, [G, I1] = S(!1), [m1, S1] = S(!1), z = () => {
    if (!r)
      return;
    const Q = r.getBoundingClientRect(), Y = Math.max(220, Math.ceil(Q.width)), P1 = window.innerWidth, L1 = Math.min(Math.max(8, Q.right - Y), Math.max(8, P1 - Y - 8));
    j({
      top: Math.ceil(Q.bottom + 8),
      left: Math.ceil(L1),
      minWidth: Y
    });
  }, i1 = () => {
    $((Q) => {
      const Y = !Q;
      return Y ? queueMicrotask(z) : (x(!1), P(!1)), Y;
    });
  }, J = (Q) => {
    if (!C())
      return;
    const Y = Q.target;
    Y && (r != null && r.contains(Y) || n != null && n.contains(Y) || (x(!1), $(!1)));
  }, T1 = () => {
    C() && z();
  }, K1 = () => {
    if (t && o()) {
      const Q = t;
      I1(Q.scrollLeft > 10), S1(Q.scrollLeft + Q.clientWidth < Q.scrollWidth - 10);
    } else
      I1(!1), S1(!1);
  };
  Gt(() => {
    window.addEventListener("resize", R), document.addEventListener("fullscreenchange", B), document.addEventListener("mousedown", J), window.addEventListener("scroll", T1, !0), document.addEventListener("mozfullscreenchange", B), document.addEventListener("webkitfullscreenchange", B), document.addEventListener("msfullscreenchange", B), t && (t.addEventListener("scroll", K1), setTimeout(K1, 100));
  }), me(() => {
    window.removeEventListener("resize", R), document.removeEventListener("fullscreenchange", B), document.removeEventListener("mousedown", J), window.removeEventListener("scroll", T1, !0), document.removeEventListener("mozfullscreenchange", B), document.removeEventListener("webkitfullscreenchange", B), document.removeEventListener("msfullscreenchange", B), t && t.removeEventListener("scroll", K1);
  });
  const te = q(() => {
    const Q = e.periods.filter((Y) => {
      if (!o() || F())
        return !0;
      const P1 = e.period.text, L1 = u();
      if (Y.text === P1 || L1 && Y.text === L1)
        return !0;
      if (!L1 || L1 === P1) {
        const D = e.periods.find((o1) => o1.text !== P1);
        return Y.text === (D == null ? void 0 : D.text);
      }
      return !1;
    }).slice(0, o() && !F() ? 2 : e.periods.length);
    return setTimeout(K1, 50), Q;
  });
  let Z1 = e.period.text;
  return D1(() => {
    const Q = e.period.text;
    Q !== Z1 && (o() && (c(Z1), localStorage.setItem("klinechart_secondary_period", Z1)), Z1 = Q), setTimeout(K1, 50);
  }), D1(() => {
    F(), setTimeout(K1, 100);
  }), D1(() => {
    if (!e.showOrderToolsMenu) {
      $(!1);
      return;
    }
    C() && queueMicrotask(z);
  }), (() => {
    const Q = Nu.cloneNode(!0), Y = Q.firstChild, P1 = Y.firstChild, L1 = P1.firstChild, D = P1.nextSibling, o1 = D.firstChild;
    return Q.style.setProperty("position", "relative"), Q.style.setProperty("width", "100%"), Q.style.setProperty("display", "flex"), Q.style.setProperty("align-items", "center"), k(Q, L(Z, {
      get when() {
        return q(() => !!o())() && G();
      },
      get children() {
        const g = ku.cloneNode(!0);
        return g.$$click = () => t.scrollBy({
          left: -100,
          behavior: "smooth"
        }), g.style.setProperty("position", "absolute"), g.style.setProperty("left", "0"), g.style.setProperty("top", "0"), g.style.setProperty("bottom", "1px"), g.style.setProperty("width", "30px"), g.style.setProperty("display", "flex"), g.style.setProperty("align-items", "center"), g.style.setProperty("justify-content", "center"), g.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), g.style.setProperty("z-index", "10"), g.style.setProperty("cursor", "pointer"), g.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), g;
      }
    }), Y), ge((g) => {
      t = g;
    }, Y), Y.style.setProperty("width", "100%"), oe(L1, "click", e.onMenuClick, !0), k(Y, L(Z, {
      get when() {
        return e.symbol;
      },
      get children() {
        const g = xu.cloneNode(!0), e1 = g.firstChild;
        return oe(g, "click", e.onSymbolClick, !0), k(g, L(Z, {
          get when() {
            return e.symbol.logo;
          },
          get children() {
            const c1 = Lu.cloneNode(!0);
            return N(() => k1(c1, "src", e.symbol.logo)), c1;
          }
        }), e1), k(e1, () => e.symbol.shortName ?? e.symbol.name ?? e.symbol.ticker), g;
      }
    }), D), k(Y, () => te().map((g, e1) => {
      const c1 = g.text === e.period.text;
      return (() => {
        const C1 = Eu.cloneNode(!0);
        return C1.$$click = (W) => {
          o() && c1 && !F() ? (e.onMobilePeriodClick ? e.onMobilePeriodClick(g) : e.onMenuClick(), W.stopPropagation()) : e.onPeriodChange(g);
        }, f1(C1, `item period ${c1 ? "selected" : ""}`), k(C1, () => g.text), C1;
      })();
    }), D), k(Y, L(Z, {
      get when() {
        return q(() => !!(o() && !F()))() && te().length > 1;
      },
      get children() {
        const g = Au.cloneNode(!0);
        return g.$$click = (e1) => {
          e1.stopPropagation(), e.onMobilePeriodClick ? e.onMobilePeriodClick(e.period) : e.onMenuClick();
        }, g.style.setProperty("margin-left", "4px"), g.style.setProperty("display", "inline-flex"), g.style.setProperty("align-items", "center"), g;
      }
    }), D), k(Y, L(Z, {
      get when() {
        return q(() => !!o())() && !F();
      },
      get children() {
        const g = wu.cloneNode(!0);
        return g.$$click = (e1) => {
          var c1;
          e1.stopPropagation(), (c1 = e.onMobileMoreClick) == null || c1.call(e);
        }, g.style.setProperty("margin-left", "8px"), g.style.setProperty("display", "inline-flex"), g.style.setProperty("align-items", "center"), g.style.setProperty("cursor", "pointer"), g.style.setProperty("padding", "0 4px"), g;
      }
    }), D), k(Y, L(Z, {
      get when() {
        return !o();
      },
      get children() {
        const g = Mu.cloneNode(!0), e1 = g.firstChild, c1 = e1.nextSibling;
        return oe(g, "click", e.onIndicatorClick, !0), k(c1, () => a("indicator", e.locale)), g;
      }
    }), D), D.style.setProperty("display", "flex"), D.style.setProperty("gap", "4px"), D.style.setProperty("margin-left", "auto"), D.style.setProperty("align-items", "center"), k(D, L(Z, {
      get when() {
        return e.showOrderToolsMenu;
      },
      get children() {
        const g = Tu.cloneNode(!0), e1 = g.firstChild, c1 = e1.firstChild, C1 = c1.nextSibling;
        return ge((W) => {
          r = W;
        }, g), g.style.setProperty("display", "flex"), g.style.setProperty("align-items", "center"), e1.$$click = (W) => {
          W.stopPropagation(), i1();
        }, e1.style.setProperty("gap", "6px"), C1.style.setProperty("transition", "transform 0.2s ease"), k(g, L(Z, {
          get when() {
            return C();
          },
          get children() {
            return L(c6, {
              get mount() {
                return E();
              },
              get children() {
                const W = Su.cloneNode(!0), b1 = W.firstChild, A1 = b1.firstChild, se = A1.firstChild, j1 = se.firstChild, Ne = j1.firstChild, N1 = A1.nextSibling, Ee = N1.firstChild, xt = Ee.firstChild, le = xt.firstChild, ce = Ee.nextSibling, At = ce.firstChild, w1 = At.firstChild, M1 = b1.nextSibling, z1 = M1.firstChild, O1 = z1.firstChild, wt = M1.nextSibling, $e = wt.nextSibling, Be = $e.firstChild, Ue = Be.firstChild, d1 = $e.nextSibling, p1 = d1.nextSibling, Mt = p1.firstChild, E1 = Mt.firstChild, ue = p1.nextSibling, H1 = ue.nextSibling, St = H1.firstChild, re = St.firstChild, Fe = H1.nextSibling, Q1 = Fe.firstChild, Ke = Q1.firstChild, je = Ke.firstChild, _e = je.firstChild, ke = Q1.nextSibling, Xe = ke.firstChild, Je = Xe.firstChild, q1 = Je.firstChild, Le = Xe.nextSibling, Tt = Le.firstChild, et = Tt.firstChild, Pt = Le.nextSibling, ze = Pt.firstChild, Qe = ze.firstChild, de = Fe.nextSibling, Ot = de.firstChild, Y1 = Ot.firstChild;
                return W.$$mousedown = (_) => _.stopPropagation(), ge((_) => {
                  n = _;
                }, W), W.style.setProperty("position", "fixed"), W.style.setProperty("z-index", "9999"), A1.$$click = (_) => {
                  _.preventDefault(), _.stopPropagation(), x((M) => !M);
                }, j1.$$mousedown = (_) => _.stopPropagation(), j1.$$click = (_) => _.stopPropagation(), Ne.addEventListener("change", (_) => {
                  var M;
                  _.stopPropagation(), (M = e.onOrderToolsStateChange) == null || M.call(e, {
                    quickOrder: _.currentTarget.checked
                  });
                }), le.addEventListener("change", (_) => {
                  var M;
                  (M = e.onOrderToolsStateChange) == null || M.call(e, {
                    quickOrderFloatingWindow: _.currentTarget.checked
                  });
                }), w1.addEventListener("change", (_) => {
                  var M;
                  (M = e.onOrderToolsStateChange) == null || M.call(e, {
                    quickOrderPlusButton: _.currentTarget.checked
                  });
                }), O1.addEventListener("change", (_) => {
                  var M;
                  (M = e.onOrderToolsStateChange) == null || M.call(e, {
                    openOrders: _.currentTarget.checked
                  });
                }), Ue.addEventListener("change", (_) => {
                  var M;
                  (M = e.onOrderToolsStateChange) == null || M.call(e, {
                    positions: _.currentTarget.checked
                  });
                }), E1.addEventListener("change", (_) => {
                  var M;
                  (M = e.onOrderToolsStateChange) == null || M.call(e, {
                    breakevenPrice: _.currentTarget.checked
                  });
                }), re.addEventListener("change", (_) => {
                  var M;
                  (M = e.onOrderToolsStateChange) == null || M.call(e, {
                    liquidationPrice: _.currentTarget.checked
                  });
                }), Q1.$$click = (_) => {
                  _.preventDefault(), _.stopPropagation(), P((M) => !M);
                }, je.$$mousedown = (_) => _.stopPropagation(), je.$$click = (_) => _.stopPropagation(), _e.addEventListener("change", (_) => {
                  var M;
                  _.stopPropagation(), (M = e.onOrderToolsStateChange) == null || M.call(e, {
                    priceLine: _.currentTarget.checked
                  });
                }), q1.addEventListener("change", (_) => {
                  var M;
                  (M = e.onOrderToolsStateChange) == null || M.call(e, {
                    marketPriceLine: _.currentTarget.checked
                  });
                }), et.addEventListener("change", (_) => {
                  var M;
                  (M = e.onOrderToolsStateChange) == null || M.call(e, {
                    countDown: _.currentTarget.checked
                  });
                }), Qe.addEventListener("change", (_) => {
                  var M;
                  (M = e.onOrderToolsStateChange) == null || M.call(e, {
                    bidAskPrice: _.currentTarget.checked
                  });
                }), Y1.addEventListener("change", (_) => {
                  var M;
                  (M = e.onOrderToolsStateChange) == null || M.call(e, {
                    orderHistory: _.currentTarget.checked
                  });
                }), N((_) => {
                  const M = `${I().top}px`, R1 = `${I().left}px`, B1 = `${I().minWidth}px`, he = `klinecharts-pro-order-tools-group${y() ? " klinecharts-pro-order-tools-group-open" : ""}`, fe = `klinecharts-pro-order-tools-group${A() ? " klinecharts-pro-order-tools-group-open" : ""}`;
                  return M !== _._v$ && W.style.setProperty("top", _._v$ = M), R1 !== _._v$2 && W.style.setProperty("left", _._v$2 = R1), B1 !== _._v$3 && W.style.setProperty("width", _._v$3 = B1), he !== _._v$4 && f1(b1, _._v$4 = he), fe !== _._v$5 && f1(Fe, _._v$5 = fe), _;
                }, {
                  _v$: void 0,
                  _v$2: void 0,
                  _v$3: void 0,
                  _v$4: void 0,
                  _v$5: void 0
                }), N(() => {
                  var _, M, R1, B1;
                  return Ne.checked = (((_ = e.orderToolsState) == null ? void 0 : _.quickOrderFloatingWindow) ?? ((M = e.orderToolsState) == null ? void 0 : M.quickOrder) ?? !0) || (((R1 = e.orderToolsState) == null ? void 0 : R1.quickOrderPlusButton) ?? ((B1 = e.orderToolsState) == null ? void 0 : B1.quickOrder) ?? !0);
                }), N(() => {
                  var _, M;
                  return le.checked = ((_ = e.orderToolsState) == null ? void 0 : _.quickOrderFloatingWindow) ?? ((M = e.orderToolsState) == null ? void 0 : M.quickOrder) ?? !0;
                }), N(() => {
                  var _, M;
                  return w1.checked = ((_ = e.orderToolsState) == null ? void 0 : _.quickOrderPlusButton) ?? ((M = e.orderToolsState) == null ? void 0 : M.quickOrder) ?? !0;
                }), N(() => {
                  var _;
                  return O1.checked = ((_ = e.orderToolsState) == null ? void 0 : _.openOrders) ?? !0;
                }), N(() => {
                  var _;
                  return Ue.checked = ((_ = e.orderToolsState) == null ? void 0 : _.positions) ?? !0;
                }), N(() => {
                  var _;
                  return E1.checked = ((_ = e.orderToolsState) == null ? void 0 : _.breakevenPrice) ?? !0;
                }), N(() => {
                  var _;
                  return re.checked = ((_ = e.orderToolsState) == null ? void 0 : _.liquidationPrice) ?? !0;
                }), N(() => {
                  var _, M, R1, B1, he, fe;
                  return _e.checked = (((_ = e.orderToolsState) == null ? void 0 : _.marketPriceLine) ?? ((M = e.orderToolsState) == null ? void 0 : M.priceLine) ?? !0) || (((R1 = e.orderToolsState) == null ? void 0 : R1.countDown) ?? ((B1 = e.orderToolsState) == null ? void 0 : B1.priceLine) ?? !0) || (((he = e.orderToolsState) == null ? void 0 : he.bidAskPrice) ?? ((fe = e.orderToolsState) == null ? void 0 : fe.priceLine) ?? !0);
                }), N(() => {
                  var _, M;
                  return q1.checked = ((_ = e.orderToolsState) == null ? void 0 : _.marketPriceLine) ?? ((M = e.orderToolsState) == null ? void 0 : M.priceLine) ?? !0;
                }), N(() => {
                  var _, M;
                  return et.checked = ((_ = e.orderToolsState) == null ? void 0 : _.countDown) ?? ((M = e.orderToolsState) == null ? void 0 : M.priceLine) ?? !0;
                }), N(() => {
                  var _, M;
                  return Qe.checked = ((_ = e.orderToolsState) == null ? void 0 : _.bidAskPrice) ?? ((M = e.orderToolsState) == null ? void 0 : M.priceLine) ?? !0;
                }), N(() => {
                  var _;
                  return Y1.checked = ((_ = e.orderToolsState) == null ? void 0 : _.orderHistory) ?? !0;
                }), W;
              }
            });
          }
        }), null), N((W) => {
          const b1 = o() ? "0 8px" : "0 10px", A1 = C() ? "rotate(180deg)" : "rotate(0deg)";
          return b1 !== W._v$6 && e1.style.setProperty("padding", W._v$6 = b1), A1 !== W._v$7 && C1.style.setProperty("transform", W._v$7 = A1), W;
        }, {
          _v$6: void 0,
          _v$7: void 0
        }), g;
      }
    }), o1), k(D, L(Z, {
      get when() {
        return !o();
      },
      get children() {
        return [(() => {
          const g = Pu.cloneNode(!0);
          return oe(g, "click", e.onTimezoneClick, !0), g;
        })(), (() => {
          const g = Ou.cloneNode(!0);
          return oe(g, "click", e.onSettingClick, !0), g;
        })()];
      }
    }), o1), k(D, L(Z, {
      get when() {
        return !o();
      },
      get children() {
        const g = Du.cloneNode(!0);
        return oe(g, "click", e.onScreenshotClick, !0), g;
      }
    }), o1), o1.$$click = () => {
      if (F())
        (document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen).call(document);
      else {
        const g = t == null ? void 0 : t.closest(".klinecharts-pro");
        g && ((g == null ? void 0 : g.requestFullscreen) ?? (g == null ? void 0 : g.webkitRequestFullscreen) ?? (g == null ? void 0 : g.mozRequestFullScreen) ?? (g == null ? void 0 : g.msRequestFullscreen)).call(g);
      }
    }, k(o1, (() => {
      const g = q(() => !!F());
      return () => g() ? Bu.cloneNode(!0) : Uu.cloneNode(!0);
    })()), k(Q, L(Z, {
      get when() {
        return q(() => !!o())() && m1();
      },
      get children() {
        const g = Iu.cloneNode(!0);
        return g.$$click = () => t.scrollBy({
          left: 100,
          behavior: "smooth"
        }), g.style.setProperty("position", "absolute"), g.style.setProperty("right", "0"), g.style.setProperty("top", "0"), g.style.setProperty("bottom", "1px"), g.style.setProperty("width", "30px"), g.style.setProperty("display", "flex"), g.style.setProperty("align-items", "center"), g.style.setProperty("justify-content", "center"), g.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), g.style.setProperty("z-index", "10"), g.style.setProperty("cursor", "pointer"), g.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), g;
      }
    }), null), N((g) => {
      const e1 = o() ? "auto" : "visible", c1 = e.spread ? "" : "rotate", C1 = F() ? "0px" : "var(--klinecharts-pro-period-bar-padding-right)";
      return e1 !== g._v$8 && Y.style.setProperty("overflow", g._v$8 = e1), c1 !== g._v$9 && k1(L1, "class", g._v$9 = c1), C1 !== g._v$10 && D.style.setProperty("padding-right", g._v$10 = C1), g;
    }, {
      _v$8: void 0,
      _v$9: void 0,
      _v$10: void 0
    }), Q;
  })();
};
F1(["click", "mousedown"]);
const Ku = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M12.41465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L12.41465,12C12.20873,12.5826,11.65311,13,11,13C10.34689,13,9.79127,12.5826,9.58535,12L3.5,12C3.223857,12,3,11.77614,3,11.5C3,11.22386,3.223857,11,3.5,11L9.58535,11C9.79127,10.417404,10.34689,10,11,10C11.65311,10,12.20873,10.417404,12.41465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), ju = () => Ku.cloneNode(!0), zu = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,11L11.08535,11C11.29127,10.417404,11.84689,10,12.5,10C13.15311,10,13.70873,10.417404,13.91465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L13.91465,12C13.70873,12.5826,13.15311,13,12.5,13C11.84689,13,11.29127,12.5826,11.08535,12L6.91465,12C6.70873,12.5826,6.15311,13,5.5,13C4.671573,13,4,12.32843,4,11.5C4,10.671573,4.671573,10,5.5,10C6.15311,10,6.70873,10.417404,6.91465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), Qu = () => zu.cloneNode(!0), Zu = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,12.5C6.70873,13.0826,6.15311,13.5,5.5,13.5C4.671573,13.5,4,12.82843,4,12C4,11.171573,4.671573,10.5,5.5,10.5C6.15311,10.5,6.70873,10.917404,6.91465,11.5L16.0853,11.5C16.2913,10.917404,16.846899999999998,10.5,17.5,10.5C18.328400000000002,10.5,19,11.171573,19,12C19,12.82843,18.328400000000002,13.5,17.5,13.5C16.846899999999998,13.5,16.2913,13.0826,16.0853,12.5L6.91465,12.5Z" stroke-opacity="0" stroke="none"></path></svg>'), Ru = () => Zu.cloneNode(!0), Vu = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,12.41465L11,18.5C11,18.7761,11.22386,19,11.5,19C11.77614,19,12,18.7761,12,18.5L12,12.41465C12.5826,12.20873,13,11.65311,13,11C13,10.34689,12.5826,9.79127,12,9.58535L12,3.5C12,3.223857,11.77614,3,11.5,3C11.22386,3,11,3.223857,11,3.5L11,9.58535C10.417404,9.79127,10,10.34689,10,11C10,11.65311,10.417404,12.20873,11,12.41465Z" stroke-opacity="0" stroke="none"></path></svg>'), Hu = () => Vu.cloneNode(!0), qu = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.66558837890625,19C10.83716137890625,19,10.16558837890625,18.328400000000002,10.16558837890625,17.5C10.16558837890625,16.846899999999998,10.58298437890625,16.2913,11.16557337890625,16.0854L11.16557337890625,11.91464C10.58298437890625,11.70872,10.16558837890625,11.1531,10.16558837890625,10.5C10.16558837890625,9.8469,10.58298437890625,9.29128,11.16557337890625,9.08536L11.16557337890625,4.5C11.16557337890625,4.223857,11.38942837890625,4,11.66556837890625,4C11.94171837890625,4,12.16556837890625,4.223857,12.16556837890625,4.5L12.16556837890625,9.08535C12.74817837890625,9.291260000000001,13.16558837890625,9.846879999999999,13.16558837890625,10.5C13.16558837890625,11.153120000000001,12.74817837890625,11.708739999999999,12.16556837890625,11.91465L12.16556837890625,16.0854C12.74817837890625,16.2913,13.16558837890625,16.846899999999998,13.16558837890625,17.5C13.16558837890625,18.328400000000002,12.49401837890625,19,11.66558837890625,19Z" stroke-opacity="0" stroke="none"></path></svg>'), Yu = () => qu.cloneNode(!0), Gu = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.165603637695312,6.91465C11.748203637695312,6.70873,12.165603637695312,6.15311,12.165603637695312,5.5C12.165603637695312,4.671573,11.494033637695313,4,10.665603637695312,4C9.837176637695313,4,9.165603637695312,4.671573,9.165603637695312,5.5C9.165603637695312,6.15311,9.583007637695312,6.70873,10.165603637695312,6.91465L10.165603637695312,16.0854C9.583007637695312,16.2913,9.165603637695312,16.846899999999998,9.165603637695312,17.5C9.165603637695312,18.328400000000002,9.837176637695313,19,10.665603637695312,19C11.494033637695313,19,12.165603637695312,18.328400000000002,12.165603637695312,17.5C12.165603637695312,16.846899999999998,11.748203637695312,16.2913,11.165603637695312,16.0854L11.165603637695312,6.91465Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Wu = () => Gu.cloneNode(!0), Xu = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.146447,15.753C4.9511845,15.9483,4.9511845,16.2649,5.146447,16.4602C5.341709,16.6554,5.658291,16.6554,5.853554,16.4602L8.156600000000001,14.15711C8.352409999999999,14.25082,8.57173,14.3033,8.8033,14.3033C9.631730000000001,14.3033,10.3033,13.63172,10.3033,12.80329C10.3033,12.57172,10.250820000000001,12.352409999999999,10.157119999999999,12.15659L12.156600000000001,10.15711C12.352409999999999,10.250820000000001,12.571729999999999,10.30329,12.8033,10.30329C13.63173,10.30329,14.3033,9.63172,14.3033,8.80329C14.3033,8.57172,14.25082,8.352409999999999,14.15712,8.15659L16.4602,5.853553C16.6554,5.658291,16.6554,5.341709,16.4602,5.146447C16.2649,4.9511843,15.9483,4.9511843,15.753,5.146447L13.45001,7.449479999999999C13.25419,7.35577,13.03487,7.3032900000000005,12.8033,7.3032900000000005C11.97487,7.3032900000000005,11.3033,7.97487,11.3033,8.80329C11.3033,9.03487,11.35578,9.254190000000001,11.44949,9.450009999999999L9.450009999999999,11.449480000000001C9.254190000000001,11.35577,9.03487,11.30329,8.8033,11.30329C7.97487,11.30329,7.3033,11.97487,7.3033,12.80329C7.3033,13.03487,7.35578,13.25419,7.44949,13.45001L5.146447,15.753Z" stroke-opacity="0" stroke="none"></path></svg>'), Ju = () => Xu.cloneNode(!0), ed = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M7.573332939453125,14.54567903564453C7.667042939453125,14.741499035644532,7.719512939453125,14.960809035644532,7.719512939453125,15.19239903564453C7.719512939453125,16.02079903564453,7.047942939453125,16.69239903564453,6.219512939453125,16.69239903564453C5.391085939453125,16.69239903564453,4.719512939453125,16.02079903564453,4.719512939453125,15.19239903564453C4.719512939453125,14.36394903564453,5.391085939453125,13.692379035644532,6.219512939453125,13.692379035644532C6.451092939453125,13.692379035644532,6.670412939453125,13.74485903564453,6.866232939453125,13.83856903564453L9.865702939453126,10.83909903564453C9.771992939453124,10.643279035644532,9.719512939453125,10.42395903564453,9.719512939453125,10.192379035644532C9.719512939453125,9.36394903564453,10.391082939453124,8.692379035644532,11.219512939453125,8.692379035644532C11.451092939453126,8.692379035644532,11.670412939453126,8.74485903564453,11.866232939453125,8.838569035644532L15.462112939453124,5.242645035644531C15.657412939453126,5.047383335644532,15.974012939453125,5.047383335644532,16.169212939453125,5.242645035644531C16.364512939453125,5.437907035644531,16.364512939453125,5.754489035644531,16.169212939453125,5.949752035644531L12.573332939453124,9.545679035644532C12.667042939453125,9.74149903564453,12.719512939453125,9.96080903564453,12.719512939453125,10.192379035644532C12.719512939453125,11.020809035644533,12.047942939453126,11.692379035644532,11.219512939453125,11.692379035644532C10.987942939453125,11.692379035644532,10.768632939453125,11.639909035644532,10.572812939453126,11.54619903564453L7.573332939453125,14.54567903564453Z" stroke-opacity="0" stroke="none"></path></svg>'), td = () => ed.cloneNode(!0), rd = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M15.719512939453125,8.461776733398438C16.547912939453127,8.461776733398438,17.219512939453125,7.7902067333984375,17.219512939453125,6.9617767333984375C17.219512939453125,6.133349733398438,16.547912939453127,5.4617767333984375,15.719512939453125,5.4617767333984375C14.891082939453124,5.4617767333984375,14.219512939453125,6.133349733398438,14.219512939453125,6.9617767333984375C14.219512939453125,7.193346733398437,14.271992939453124,7.412666733398438,14.365692939453124,7.608486733398438L7.366222939453126,14.607956733398437C7.170402939453125,14.514256733398437,6.951082939453125,14.461776733398438,6.719512939453125,14.461776733398438C5.891085939453125,14.461776733398438,5.219512939453125,15.133346733398437,5.219512939453125,15.961776733398438C5.219512939453125,16.79017673339844,5.891085939453125,17.461776733398438,6.719512939453125,17.461776733398438C7.547942939453125,17.461776733398438,8.219512939453125,16.79017673339844,8.219512939453125,15.961776733398438C8.219512939453125,15.730176733398437,8.167032939453126,15.510876733398437,8.073322939453124,15.315066733398437L15.072802939453124,8.315586733398437C15.268612939453124,8.409296733398438,15.487912939453125,8.461776733398438,15.719512939453125,8.461776733398438Z" stroke-opacity="0" stroke="none"></path></svg>'), nd = () => rd.cloneNode(!0), id = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17.0643,7.033864912109375L18,3.585784912109375L14.5078,4.509695912109375L15.3537,5.344934912109375L6.02026,14.560584912109375C5.87635,14.517484912109374,5.72366,14.494284912109375,5.5655,14.494284912109375C4.7009,14.494284912109375,4,15.186384912109375,4,16.040084912109375C4,16.893784912109375,4.7009,17.585784912109375,5.5655,17.585784912109375C6.43011,17.585784912109375,7.13101,16.893784912109375,7.13101,16.040084912109375C7.13101,15.722284912109375,7.03392,15.426984912109376,6.86744,15.181384912109374L16.0917,6.073604912109375L17.0643,7.033864912109375Z" stroke-opacity="0" stroke="none"></path></svg>'), od = () => id.cloneNode(!0), ad = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,13.00505L18.5,13.00505C18.7761,13.00505,19,13.228909999999999,19,13.50505C19,13.781189999999999,18.7761,14.00505,18.5,14.00505L6.91465,14.00505C6.70873,14.58765,6.15311,15.00505,5.5,15.00505C4.671573,15.00505,4,14.33348,4,13.50505C4,12.67662,4.671573,12.00505,5.5,12.00505C6.15311,12.00505,6.70873,12.422450000000001,6.91465,13.00505ZM7.81404,11.625L10.48591,11.625L10.48591,10.90625L9.65193,10.90625L9.65193,7.125L8.997630000000001,7.125C8.71443,7.306641,8.415600000000001,7.419922,7.96443,7.498047L7.96443,8.05078L8.77497,8.05078L8.77497,10.90625L7.81404,10.90625L7.81404,11.625ZM11.081620000000001,11.625L14.0562,11.625L14.0562,10.88281L13.09724,10.88281C12.8863,10.88281,12.59333,10.90625,12.36482,10.93555C13.17537,10.11328,13.84724,9.2207,13.84724,8.39062C13.84724,7.541016,13.28865,7,12.4488,7C11.84333,7,11.446850000000001,7.234375,11.03279,7.679688L11.52497,8.16797C11.747630000000001,7.914062,12.0113,7.697266,12.33552,7.697266C12.7613,7.697266,13.00154,7.982422,13.00154,8.43359C13.00154,9.14648,12.29255,10.00781,11.081620000000001,11.11523L11.081620000000001,11.625ZM15.9605,11.75C16.8121,11.75,17.526899999999998,11.2832,17.526899999999998,10.4375C17.526899999999998,9.82031,17.142200000000003,9.43945,16.6441,9.30078L16.6441,9.27148C17.1129,9.08594,17.3824,8.7207,17.3824,8.21289C17.3824,7.421875,16.8004,7,15.9429,7C15.4215,7,14.9957,7.210938,14.6109,7.541016L15.066,8.11133C15.3258,7.849609,15.5836,7.697266,15.9019,7.697266C16.2789,7.697266,16.4957,7.914062,16.4957,8.28125C16.4957,8.70898,16.2301,9,15.4215,9L15.4215,9.63672C16.3804,9.63672,16.6383,9.91992,16.6383,10.38086C16.6383,10.79688,16.3336,11.03125,15.8824,11.03125C15.4742,11.03125,15.1578,10.82227,14.8922,10.55078L14.4781,11.13281C14.7906,11.486329999999999,15.2652,11.75,15.9605,11.75Z" stroke-opacity="0" stroke="none"></path></svg>'), sd = () => ad.cloneNode(!0), ld = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.146447,14.178126025390625C2.9511847,13.982826025390626,2.9511847,13.666226025390625,3.146447,13.470926025390625L7.39146,9.225966025390626C7.35417,9.095106025390624,7.33421,8.956946025390625,7.33421,8.814116025390625C7.33421,7.985696025390625,8.00578,7.314116025390625,8.834209999999999,7.314116025390625C8.97703,7.314116025390625,9.11519,7.334086025390625,9.24605,7.371366025390625L13.753,2.864373025390625C13.9483,2.669110325390625,14.2649,2.669110325390625,14.4602,2.864373025390625C14.6554,3.059635025390625,14.6554,3.376217025390625,14.4602,3.571479025390625L10.06916,7.962476025390625C10.23631,8.204386025390626,10.334209999999999,8.497826025390625,10.334209999999999,8.814116025390625C10.334209999999999,9.642546025390626,9.66264,10.314116025390625,8.834209999999999,10.314116025390625C8.51791,10.314116025390625,8.22448,10.216226025390625,7.98256,10.049076025390626L3.853554,14.178126025390625C3.658291,14.373326025390625,3.341709,14.373326025390625,3.146447,14.178126025390625ZM7.67736,19.188526025390626C7.4821,18.993226025390626,7.4821,18.676626025390625,7.67736,18.481426025390626L9.9804,16.178326025390625C9.88669,15.982526025390625,9.834209999999999,15.763226025390624,9.834209999999999,15.531626025390626C9.834209999999999,14.703226025390626,10.50578,14.031626025390626,11.33421,14.031626025390626C11.56579,14.031626025390626,11.78511,14.084126025390624,11.98093,14.177826025390624L13.9804,12.178356025390626C13.8867,11.982536025390624,13.8342,11.763216025390625,13.8342,11.531636025390625C13.8342,10.703206025390624,14.5058,10.031636025390625,15.3342,10.031636025390625C15.5658,10.031636025390625,15.7851,10.084116025390625,15.9809,10.177826025390626L18.284,7.874796025390625C18.4792,7.679536025390625,18.7958,7.679536025390625,18.9911,7.874796025390625C19.1863,8.070056025390624,19.1863,8.386636025390626,18.9911,8.581906025390625L16.688000000000002,10.884936025390624C16.7817,11.080756025390626,16.8342,11.300066025390626,16.8342,11.531636025390625C16.8342,12.360066025390624,16.162599999999998,13.031626025390626,15.3342,13.031626025390626C15.1026,13.031626025390626,14.8833,12.979126025390626,14.6875,12.885426025390625L12.68803,14.884926025390625C12.78174,15.080726025390625,12.83421,15.300026025390626,12.83421,15.531626025390626C12.83421,16.360026025390624,12.16264,17.031626025390626,11.33421,17.031626025390626C11.10264,17.031626025390626,10.88333,16.979126025390627,10.68751,16.885426025390625L8.38446,19.188526025390626C8.1892,19.383726025390626,7.87262,19.383726025390626,7.67736,19.188526025390626Z" stroke-opacity="0" stroke="none"></path></svg>'), cd = () => ld.cloneNode(!0), ud = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.3367688759765626,12.63173C3.5320318759765623,12.82699,3.8486138759765627,12.82699,4.043876875976562,12.63173L11.822052875976562,4.853553C12.017312875976563,4.658291,12.017312875976563,4.341708,11.822052875976562,4.146446C11.626792875976562,3.9511843,11.310202875976563,3.9511843,11.114942875976563,4.146446L3.3367688759765626,11.92462C3.1415071759765625,12.11988,3.1415071759765625,12.43647,3.3367688759765626,12.63173ZM5.001492875976562,17.0351C4.806232875976562,16.8399,4.806232875976562,16.5233,5.001492875976562,16.328L7.304532875976562,14.025C7.210822875976563,13.82916,7.158352875976563,13.60984,7.158352875976563,13.37827C7.158352875976563,12.54984,7.829922875976562,11.87827,8.658352875976561,11.87827C8.889922875976563,11.87827,9.109232875976563,11.93075,9.305052875976562,12.02446L11.304532875976562,10.02498C11.210822875976563,9.82916,11.158352875976561,9.60984,11.158352875976561,9.37827C11.158352875976561,8.54984,11.829922875976562,7.8782700000000006,12.658352875976563,7.8782700000000006C12.889922875976563,7.8782700000000006,13.109232875976563,7.93075,13.305022875976562,8.024460000000001L15.608122875976562,5.72142C15.803322875976562,5.5261499999999995,16.119922875976563,5.5261499999999995,16.315222875976563,5.72142C16.510422875976563,5.9166799999999995,16.510422875976563,6.23326,16.315222875976563,6.42852L14.012122875976562,8.73156C14.105822875976562,8.92738,14.158322875976562,9.1467,14.158322875976562,9.37827C14.158322875976562,10.2067,13.486822875976562,10.87827,12.658352875976563,10.87827C12.426772875976562,10.87827,12.207452875976562,10.82579,12.011642875976563,10.73209L10.012162875976562,12.73156C10.105872875976562,12.92738,10.158352875976561,13.1467,10.158352875976561,13.37827C10.158352875976561,14.2067,9.486772875976563,14.8783,8.658352875976561,14.8783C8.426772875976562,14.8783,8.207452875976562,14.8258,8.011642875976563,14.7321L5.708602875976562,17.0351C5.513342875976562,17.2304,5.196752875976562,17.2304,5.001492875976562,17.0351ZM10.415712875976563,18.328C10.220452875976562,18.5233,9.903862875976563,18.5233,9.708602875976563,18.328C9.513342875976562,18.1328,9.513342875976562,17.816200000000002,9.708602875976563,17.6209L12.304532875976562,15.025C12.210822875976563,14.8292,12.158352875976563,14.6098,12.158352875976563,14.3783C12.158352875976563,13.54984,12.829922875976562,12.87827,13.658322875976562,12.87827C13.889922875976563,12.87827,14.109222875976563,12.93075,14.305022875976562,13.02446L17.486822875976564,9.84274C17.682022875976564,9.64747,17.99862287597656,9.64747,18.19392287597656,9.84274C18.38912287597656,10.038,18.38912287597656,10.35458,18.19392287597656,10.54984L15.012122875976562,13.73156C15.105822875976562,13.92738,15.158322875976562,14.1467,15.158322875976562,14.3783C15.158322875976562,15.2067,14.486822875976562,15.8783,13.658322875976562,15.8783C13.426822875976562,15.8783,13.207422875976562,15.8258,13.011642875976563,15.7321L10.415712875976563,18.328Z" stroke-opacity="0" stroke="none"></path></svg>'), dd = () => ud.cloneNode(!0), hd = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M13.1889,6C12.98303,6.582599999999999,12.42741,7,11.7743,7C11.12119,7,10.565570000000001,6.582599999999999,10.35965,6L3.5,6C3.223857,6,3,5.77614,3,5.5C3,5.22386,3.223857,5,3.5,5L10.35965,5C10.565570000000001,4.417404,11.12119,4,11.7743,4C12.42741,4,12.98303,4.417404,13.1889,5L18.5,5C18.7761,5,19,5.22386,19,5.5C19,5.77614,18.7761,6,18.5,6L13.1889,6ZM3,8.5C3,8.22386,3.223857,8,3.5,8L18.5,8C18.7761,8,19,8.22386,19,8.5C19,8.77614,18.7761,9,18.5,9L3.5,9C3.223857,9,3,8.77614,3,8.5ZM3.278549,11.5C3.278549,11.22386,3.502407,11,3.778549,11L18.7785,11C19.0547,11,19.2785,11.22386,19.2785,11.5C19.2785,11.77614,19.0547,12,18.7785,12L3.778549,12C3.502407,12,3.278549,11.77614,3.278549,11.5ZM3.139267,14.5C3.139267,14.2239,3.363124,14,3.6392670000000003,14L18.6393,14C18.915399999999998,14,19.1393,14.2239,19.1393,14.5C19.1393,14.7761,18.915399999999998,15,18.6393,15L3.6392670000000003,15C3.363124,15,3.139267,14.7761,3.139267,14.5ZM13.1889,18C12.98303,18.5826,12.42741,19,11.7743,19C11.12119,19,10.565570000000001,18.5826,10.35965,18L3.778549,18C3.502407,18,3.278549,17.7761,3.278549,17.5C3.278549,17.2239,3.502407,17,3.778549,17L10.35965,17C10.565570000000001,16.4174,11.12119,16,11.7743,16C12.42741,16,12.98303,16.4174,13.1889,17L18.7785,17C19.0547,17,19.2785,17.2239,19.2785,17.5C19.2785,17.7761,19.0547,18,18.7785,18L13.1889,18Z" stroke-opacity="0" stroke="none"></path></svg>'), fd = () => hd.cloneNode(!0), yd = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4.91465,6C4.70873,6.582599999999999,4.15311,7,3.5,7C2.671573,7,2,6.32843,2,5.5C2,4.671573,2.671573,4,3.5,4C4.15311,4,4.70873,4.417404,4.91465,5L18.2257,5C18.5018,5,18.7257,5.22386,18.7257,5.5C18.7257,5.77614,18.5018,6,18.2257,6L4.91465,6ZM2.7257,8.5C2.7257,8.22386,2.949558,8,3.2257,8L18.2257,8C18.5018,8,18.7257,8.22386,18.7257,8.5C18.7257,8.77614,18.5018,9,18.2257,9L3.2257,9C2.949558,9,2.7257,8.77614,2.7257,8.5ZM3.00425,11.5C3.00425,11.22386,3.22811,11,3.50425,11L18.5042,11C18.7804,11,19.0042,11.22386,19.0042,11.5C19.0042,11.77614,18.7804,12,18.5042,12L3.50425,12C3.22811,12,3.00425,11.77614,3.00425,11.5ZM2.864967,14.5C2.864967,14.2239,3.08882,14,3.36497,14L18.365,14C18.6411,14,18.865,14.2239,18.865,14.5C18.865,14.7761,18.6411,15,18.365,15L3.36497,15C3.08882,15,2.864967,14.7761,2.864967,14.5ZM20,17.5C20,18.328400000000002,19.3284,19,18.5,19C17.846899999999998,19,17.2913,18.5826,17.0854,18L3.50425,18C3.22811,18,3.00425,17.7761,3.00425,17.5C3.00425,17.2239,3.22811,17,3.50425,17L17.0854,17C17.2913,16.4174,17.846899999999998,16,18.5,16C19.3284,16,20,16.671599999999998,20,17.5Z" stroke-opacity="0" stroke="none"></path></svg>'), Cd = () => yd.cloneNode(!0), gd = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="5" ry="5" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="3" ry="3" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse></svg>'), md = () => gd.cloneNode(!0), pd = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3,7.32468C5.90649,3.3893050000000002,11.49833,2.81306,14.6674,6.31944C14.9056,6.1554199999999994,15.192,6.05979,15.5,6.05979C15.845,6.05979,16.1628,6.17974,16.4162,6.381349999999999L18.4509,4.23827L19,4.816615L16.8945,7.03429C16.962600000000002,7.21075,17,7.40319,17,7.60463C17,8.45782,16.328400000000002,9.14947,15.5,9.14947C14.6716,9.14947,14,8.45782,14,7.60463C14,7.36402,14.0534,7.13625,14.1487,6.93322C11.32695,3.748365,6.25159,4.253956,3.612785,7.82695L3,7.32468ZM14.09,15.4717C15.7427,13.78985,16.244500000000002,11.524740000000001,15.5633,9.30134L15.5618,9.30134L16.3012,9.0502C17.072400000000002,11.56646,16.497700000000002,14.158,14.6282,16.0599C12.28737,18.442,8.62386,18.6988,6.41348,16.4501C4.5526,14.5572,4.52076,11.19671,6.36766,9.3177C7.89069,7.76754,10.07544,7.706189999999999,11.56741,9.22363C11.95453,9.61742,12.24817,10.08363,12.43369,10.57677L14.1451,8.77421L14.6942,9.35256L12.64982,11.50582C12.65827,11.59712,12.66295,11.68839,12.66378,11.77936C12.87398,12.04523,13,12.38451,13,12.7541C13,13.60729,12.32843,14.2989,11.5,14.2989C10.67157,14.2989,10,13.60729,10,12.7541C10,11.90091,10.67157,11.20926,11.5,11.20926C11.60387,11.20926,11.70528,11.220130000000001,11.8032,11.240829999999999L11.81763,11.22564C11.69858,10.71874,11.42858,10.21929,11.0284,9.81179C9.844000000000001,8.60765,8.136890000000001,8.65592,6.90822,9.90586C5.37975,11.460930000000001,5.40693,14.288,6.95404,15.8619C8.84598,17.7867,12.03496,17.5626,14.09,15.4717Z" stroke-opacity="0" stroke="none"></path></svg>'), vd = () => pd.cloneNode(!0), bd = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4,17.0854L4,3.5C4,3.223858,4.22386,3,4.5,3C4.77614,3,5,3.223858,5,3.5L5,10L7.57584,10L9.8127,4.46359C9.91614,4.20756,10.20756,4.08386,10.46359,4.1873000000000005C10.71963,4.29075,10.84333,4.58216,10.73988,4.8382000000000005L8.65438,10L11.08535,10C11.29127,9.4174,11.84689,9,12.5,9C12.65154,9,12.79784,9.02247,12.93573,9.06427L16.6464,5.35355C16.8417,5.15829,17.1583,5.15829,17.3536,5.35355C17.5488,5.54882,17.5488,5.8654,17.3536,6.06066L13.7475,9.66675C13.907,9.90508,14,10.19168,14,10.5C14,11.15311,13.5826,11.70873,13,11.91465L13,14.3638L18.3714,12.1936C18.6274,12.09015,18.918799999999997,12.21385,19.0222,12.46989C19.1257,12.72592,19.002,13.0173,18.746000000000002,13.1208L13,15.4423L13,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854ZM6.3729499999999994,17.0413L12,14.7678L12,11.91465C11.88136,11.87271,11.76956,11.81627,11.66675,11.74746L6.3729499999999994,17.0413ZM12,15.8463L6.6694700000000005,18L12,18L12,15.8463ZM6.38629,15.6137L8.250350000000001,11L11,11L6.38629,15.6137ZM5,11L7.17182,11L5,16.3754L5,11Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), $d = () => bd.cloneNode(!0), _d = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17,4.5C17,5.32843,16.328400000000002,6,15.5,6C15.0931,6,14.7241,5.83802,14.4539,5.57503L5.98992,8.32515C5.99658,8.38251,6,8.440850000000001,6,8.5C6,9.15311,5.582599999999999,9.70873,5,9.91465L5,11.08535C5.42621,11.236,5.763999999999999,11.57379,5.91465,12L19.5,12C19.7761,12,20,12.22386,20,12.5C20,12.77614,19.7761,13,19.5,13L5.91465,13C5.70873,13.5826,5.15311,14,4.5,14C3.671573,14,3,13.3284,3,12.5C3,11.84689,3.417404,11.29127,4,11.08535L4,9.91465C3.417404,9.70873,3,9.15311,3,8.5C3,7.67157,3.671573,7,4.5,7C4.90411,7,5.2709,7.15981,5.5406200000000005,7.41967L14.0093,4.66802C14.0032,4.6128599999999995,14,4.5568,14,4.5C14,3.671573,14.6716,3,15.5,3C16.328400000000002,3,17,3.671573,17,4.5ZM4,15.5C4,15.2239,4.22386,15,4.5,15L19.5,15C19.7761,15,20,15.2239,20,15.5C20,15.7761,19.7761,16,19.5,16L4.5,16C4.22386,16,4,15.7761,4,15.5ZM4,18.5C4,18.2239,4.22386,18,4.5,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L4.5,19C4.22386,19,4,18.7761,4,18.5Z" stroke-opacity="0" stroke="none"></path></svg>'), kd = () => _d.cloneNode(!0), Ld = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M20,3.5C20,4.15311,19.5826,4.70873,19,4.91465L19,18.5C19,18.7761,18.7761,19,18.5,19L4.91465,19C4.70873,19.5826,4.15311,20,3.5,20C2.671573,20,2,19.3284,2,18.5C2,17.846899999999998,2.417404,17.2913,3,17.0854L3,3.5C3,3.22386,3.22386,3,3.5,3L17.0854,3C17.2913,2.417404,17.846899999999998,2,18.5,2C19.3284,2,20,2.671573,20,3.5ZM17.0854,4C17.236,4.42621,17.5738,4.763999999999999,18,4.91465L18,8L14,8L14,4L17.0854,4ZM13,4L13,8L9,8L9,4L13,4ZM13,9L9,9L9,13L13,13L13,9ZM13,14L9,14L9,18L13,18L13,14ZM14,18L14,14L18,14L18,18L14,18ZM18,13L14,13L14,9L18,9L18,13ZM4.91465,18C4.763999999999999,17.5738,4.42621,17.236,4,17.0854L4,14L8,14L8,18L4.91465,18ZM4,8L4,4L8,4L8,8L4,8ZM8,9L8,13L4,13L4,9L8,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), xd = () => Ld.cloneNode(!0), Ad = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" fill="none" stroke-opacity="1" stroke-width="1"></ellipse></svg>'), wd = () => Ad.cloneNode(!0), Md = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.57625,6.9981C11.55099,6.999359999999999,11.52557,7,11.5,7C11.34,7,11.18584,6.97495,11.04125,6.9285499999999995L5.55401,16.4327C5.713760000000001,16.5905,5.83826,16.7839,5.91465,17L16.0854,17C16.2187,16.622700000000002,16.4987,16.314700000000002,16.8569,16.1445L11.57625,6.9981ZM12.50759,6.611219999999999C12.81005,6.336790000000001,13,5.94058,13,5.5C13,4.671573,12.32843,4,11.5,4C10.67157,4,10,4.671573,10,5.5C10,5.80059,10.08841,6.08052,10.24066,6.31522L4.64514,16.0069C4.59738,16.002299999999998,4.54896,16,4.5,16C3.671573,16,3,16.671599999999998,3,17.5C3,18.328400000000002,3.671573,19,4.5,19C5.15311,19,5.70873,18.5826,5.91465,18L16.0854,18C16.2913,18.5826,16.846899999999998,19,17.5,19C18.328400000000002,19,19,18.328400000000002,19,17.5C19,16.8365,18.5691,16.2735,17.971899999999998,16.075699999999998L12.50759,6.611219999999999Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Sd = () => Md.cloneNode(!0), Td = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19,4.5C19,5.15311,18.5826,5.70873,18,5.91465L18,18.5C18,18.7761,17.7761,19,17.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854L4,4.5C4,4.22386,4.22386,4,4.5,4L16.0854,4C16.2913,3.417404,16.846899999999998,3,17.5,3C18.328400000000002,3,19,3.671573,19,4.5ZM5,5L16.0854,5C16.236,5.42621,16.5738,5.763999999999999,17,5.91465L17,18L5.91465,18C5.763999999999999,17.5738,5.42621,17.236,5,17.0854L5,5Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Pd = () => Td.cloneNode(!0), Od = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19.6401,7.99355C20.4028,7.92291,21,7.2811900000000005,21,6.5C21,5.671573,20.3284,5,19.5,5C18.8469,5,18.2913,5.417404,18.0854,6L7.62067,6C7.34453,6,7.12067,6.22386,7.12067,6.5C7.12067,6.5479,7.12741,6.59423,7.13999,6.63809L3.2294099999999997,15.0243C2.530138,15.1517,2,15.764,2,16.5C2,17.328400000000002,2.671573,18,3.5,18C4.15311,18,4.70873,17.5826,4.91465,17L14.5963,17C14.6456,17.076,14.7162,17.1396,14.8044,17.1807C15.0546,17.2974,15.3521,17.1891,15.4688,16.9388L19.6401,7.99355ZM14.7896,16.0293L18.6551,7.739599999999999C18.3942,7.56144,18.1925,7.30307,18.0854,7L8.0746,7L4.25044,15.2009C4.55701,15.3784,4.79493,15.6613,4.91465,16L14.6207,16C14.68,16,14.7368,16.0103,14.7896,16.0293Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Dd = () => Od.cloneNode(!0), Id = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.134443814697265,7.494615087890625L8.764323814697265,7.494615087890625L8.764323814697265,3.414215087890625L8.310223814697267,3.414215087890625L7.294603814697266,4.005035087890625L7.289713814697266,4.634915087890625L8.134443814697265,4.149892087890625L8.134443814697265,7.494615087890625ZM18.832003814697266,6.933095087890624Q19.004603814697266,6.635245087890625,19.004603814697266,6.2543850878906255Q19.004603814697266,5.884915087890625,18.845103814697264,5.593575087890625Q18.685503814697267,5.3006050878906255,18.399103814697266,5.136225087890625Q18.114303814697266,4.9702050878906245,17.754603814697266,4.9653250878906245L18.820603814697265,3.840647087890625L18.820603814697265,3.414215087890625L16.519203814697264,3.414215087890625L16.519203814697264,3.939931087890625L18.050803814697264,3.939931087890625L16.719403814697266,5.334785087890625L17.074203814697263,5.7205350878906245Q17.254903814697265,5.484525087890625,17.619503814697268,5.484525087890625Q17.980803814697268,5.484525087890625,18.187503814697266,5.689605087890625Q18.394203814697267,5.894685087890625,18.394203814697267,6.2543850878906255Q18.394203814697267,6.604315087890625,18.187503814697266,6.822415087890625Q17.980803814697268,7.0405150878906255,17.640603814697265,7.0405150878906255Q17.334603814697267,7.0405150878906255,17.124703814697266,6.890775087890625Q16.914703814697265,6.739415087890626,16.820303814697265,6.469225087890624L16.354803814697263,6.744295087890626Q16.480103814697266,7.125155087890625,16.821903814697265,7.341625087890625Q17.165403814697264,7.559725087890625,17.640603814697265,7.559725087890625Q18.039403814697266,7.559725087890625,18.348603814697267,7.393705087890625Q18.659503814697267,7.229315087890625,18.832003814697266,6.933095087890624ZM10.000003814697266,10.634915087890626C10.000003814697266,11.024655087890626,9.851363814697265,11.379685087890625,9.607683814697266,11.646395087890625L12.168903814697266,15.171615087890626C12.275403814697265,15.147615087890625,12.386203814697266,15.134915087890626,12.500003814697266,15.134915087890626C12.596503814697266,15.134915087890626,12.690803814697265,15.144015087890624,12.782303814697265,15.161415087890624L16.108803814697268,11.196955087890625C16.038703814697264,11.023375087890624,16.000003814697266,10.833655087890625,16.000003814697266,10.634915087890626C16.000003814697266,9.806495087890625,16.671603814697264,9.134915087890626,17.500003814697266,9.134915087890626C18.328403814697264,9.134915087890626,19.000003814697266,9.806495087890625,19.000003814697266,10.634915087890626C19.000003814697266,11.463345087890625,18.328403814697264,12.134915087890626,17.500003814697266,12.134915087890626C17.239503814697265,12.134915087890626,16.994503814697268,12.068495087890625,16.781003814697264,11.951675087890624L13.654703814697266,15.677415087890624C13.870303814697266,15.937215087890625,14.000003814697266,16.270915087890625,14.000003814697266,16.634915087890626C14.000003814697266,17.463315087890624,13.328403814697266,18.134915087890626,12.500003814697266,18.134915087890626C11.671573814697265,18.134915087890626,11.000003814697266,17.463315087890624,11.000003814697266,16.634915087890626C11.000003814697266,16.284415087890626,11.120193814697265,15.962015087890626,11.321603814697266,15.706715087890625L8.715393814697265,12.119565087890624C8.645053814697267,12.129685087890625,8.573143814697266,12.134915087890626,8.500003814697266,12.134915087890626C8.162103814697264,12.134915087890626,7.8503038146972655,12.023195087890626,7.599523814697266,11.834665087890626L4.505583814697266,15.521915087890624C4.809213814697266,15.796415087890624,5.000003814697266,16.193415087890624,5.000003814697266,16.634915087890626C5.000003814697266,17.463315087890624,4.328433814697266,18.134915087890626,3.5000038146972656,18.134915087890626C2.6715768146972656,18.134915087890626,2.0000038146972656,17.463315087890624,2.0000038146972656,16.634915087890626C2.0000038146972656,15.806515087890626,2.6715768146972656,15.134915087890626,3.5000038146972656,15.134915087890626C3.508253814697266,15.134915087890626,3.5164838146972657,15.135015087890626,3.524703814697266,15.135115087890625L7.033823814697266,10.953115087890625C7.011673814697265,10.850565087890626,7.000003814697266,10.744105087890624,7.000003814697266,10.634915087890626C7.000003814697266,9.806495087890625,7.671573814697266,9.134915087890626,8.500003814697266,9.134915087890626C9.328433814697267,9.134915087890626,10.000003814697266,9.806495087890625,10.000003814697266,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Nd = () => Id.cloneNode(!0), Ed = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.13444,7.494615087890625L8.76432,7.494615087890625L8.76432,3.414215087890625L8.310220000000001,3.414215087890625L7.2946,4.005035087890625L7.28971,4.634915087890625L8.13444,4.149892087890625L8.13444,7.494615087890625ZM18.832,6.929835087890625Q19.0046,6.635245087890625,19.0046,6.2543850878906255Q19.0046,5.889805087890625,18.8451,5.5952050878906245Q18.6855,5.3006050878906255,18.3975,5.132965087890625Q18.1094,4.9653250878906245,17.7399,4.9653250878906245Q17.435499999999998,4.9653250878906245,17.1556,5.149245087890625L17.2793,3.939931087890625L18.8304,3.939931087890625L18.8304,3.414215087890625L16.7406,3.414215087890625L16.5094,5.665195087890625L17.0156,5.795405087890625Q17.095399999999998,5.655425087890626,17.2516,5.570795087890625Q17.4095,5.484525087890625,17.6357,5.484525087890625Q17.9694,5.484525087890625,18.1842,5.697745087890625Q18.4007,5.909335087890625,18.4007,6.2543850878906255Q18.4007,6.604315087890625,18.1842,6.822415087890625Q17.9694,7.0405150878906255,17.6292,7.0405150878906255Q17.3298,7.0405150878906255,17.119799999999998,6.890775087890625Q16.9098,6.739415087890626,16.825200000000002,6.474115087890625L16.3597,6.749175087890626Q16.470399999999998,7.110505087890624,16.807299999999998,7.335115087890625Q17.144199999999998,7.559725087890625,17.6292,7.559725087890625Q18.0296,7.559725087890625,18.3438,7.392075087890625Q18.6595,7.224435087890625,18.832,6.929835087890625ZM10,10.634915087890626C10,11.024655087890626,9.85136,11.379685087890625,9.60768,11.646395087890625L12.1689,15.171615087890626C12.2754,15.147615087890625,12.3862,15.134915087890626,12.5,15.134915087890626C12.5965,15.134915087890626,12.6908,15.144015087890624,12.7823,15.161415087890624L16.108800000000002,11.196955087890625C16.0387,11.023375087890624,16,10.833655087890625,16,10.634915087890626C16,9.806495087890625,16.671599999999998,9.134915087890626,17.5,9.134915087890626C18.3284,9.134915087890626,19,9.806495087890625,19,10.634915087890626C19,11.463345087890625,18.3284,12.134915087890626,17.5,12.134915087890626C17.2395,12.134915087890626,16.994500000000002,12.068505087890625,16.781,11.951675087890624L13.6547,15.677415087890624C13.8703,15.937215087890625,14,16.270915087890625,14,16.634915087890626C14,17.463315087890624,13.3284,18.134915087890626,12.5,18.134915087890626C11.67157,18.134915087890626,11,17.463315087890624,11,16.634915087890626C11,16.284415087890626,11.12019,15.962015087890626,11.3216,15.706715087890625L8.71539,12.119565087890624C8.645050000000001,12.129685087890625,8.57314,12.134915087890626,8.5,12.134915087890626C8.162099999999999,12.134915087890626,7.8503,12.023195087890626,7.59952,11.834665087890626L4.50558,15.521915087890624C4.80921,15.796415087890624,5,16.193415087890624,5,16.634915087890626C5,17.463315087890624,4.32843,18.134915087890626,3.5,18.134915087890626C2.671573,18.134915087890626,2,17.463315087890624,2,16.634915087890626C2,15.806515087890626,2.671573,15.134915087890626,3.5,15.134915087890626C3.5082500000000003,15.134915087890626,3.51648,15.135015087890626,3.5247,15.135115087890625L7.03382,10.953115087890625C7.01167,10.850565087890626,7,10.744105087890624,7,10.634915087890626C7,9.806495087890625,7.67157,9.134915087890626,8.5,9.134915087890626C9.32843,9.134915087890626,10,9.806495087890625,10,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Bd = () => Ed.cloneNode(!0), Ud = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M18.8532,7.020985087890625Q19.0257,6.734525087890625,19.0257,6.369945087890625Q19.0257,6.020005087890625,18.8499,5.754705087890625Q18.6758,5.489415087890626,18.3649,5.339675087890625Q18.5944,5.209465087890625,18.7214,4.994615087890625Q18.8499,4.779775087890625,18.8499,4.5193550878906255Q18.8499,4.2003480878906245,18.7002,3.951324087890625Q18.5505,3.700673087890625,18.277,3.557444087890625Q18.0052,3.414215087890625,17.6455,3.414215087890625Q17.285800000000002,3.414215087890625,17.0107,3.557444087890625Q16.7357,3.700673087890625,16.5843,3.951324087890625Q16.4346,4.2003480878906245,16.4346,4.5193550878906255Q16.4346,4.779775087890625,16.561500000000002,4.994615087890625Q16.6901,5.209465087890625,16.919600000000003,5.339675087890625Q16.6055,5.489415087890626,16.4297,5.757965087890625Q16.255499999999998,6.024895087890625,16.255499999999998,6.369945087890625Q16.255499999999998,6.734525087890625,16.4297,7.020985087890625Q16.6055,7.305815087890625,16.919600000000003,7.465325087890625Q17.2354,7.624825087890625,17.6455,7.624825087890625Q18.0557,7.624825087890625,18.3682,7.465325087890625Q18.6807,7.305815087890625,18.8532,7.020985087890625ZM8.76432,7.559725087890625L8.13444,7.559725087890625L8.13444,4.214996087890625L7.28971,4.700025087890625L7.2946,4.070139087890625L8.310220000000001,3.479319087890625L8.76432,3.479319087890625L8.76432,7.559725087890625ZM17.1816,4.955555087890625Q17.0042,4.784655087890625,17.0042,4.5095950878906255Q17.0042,4.229645087890625,17.18,4.057119087890625Q17.355800000000002,3.884592087890625,17.6455,3.884592087890625Q17.935200000000002,3.884592087890625,18.1077,4.057119087890625Q18.2803,4.229645087890625,18.2803,4.5095950878906255Q18.2803,4.784655087890625,18.1045,4.955555087890625Q17.930300000000003,5.124825087890625,17.6455,5.124825087890625Q17.3607,5.124825087890625,17.1816,4.955555087890625ZM18.2217,5.7953950878906255Q18.4398,6.005365087890625,18.4398,6.3552950878906245Q18.4398,6.705235087890625,18.2217,6.915195087890625Q18.0052,7.125155087890625,17.6455,7.125155087890625Q17.285800000000002,7.125155087890625,17.067700000000002,6.915195087890625Q16.849600000000002,6.705235087890625,16.849600000000002,6.3552950878906245Q16.849600000000002,6.005365087890625,17.064500000000002,5.7953950878906255Q17.2793,5.585435087890625,17.6455,5.585435087890625Q18.0052,5.585435087890625,18.2217,5.7953950878906255ZM9.60768,11.711495087890626C9.85136,11.444785087890626,10,11.089765087890626,10,10.700025087890625C10,9.871595087890626,9.32843,9.200025087890625,8.5,9.200025087890625C7.67157,9.200025087890625,7,9.871595087890626,7,10.700025087890625C7,10.809205087890625,7.01167,10.915665087890625,7.03382,11.018215087890624L3.5247,15.200215087890625C3.51648,15.200115087890625,3.5082500000000003,15.200015087890625,3.5,15.200015087890625C2.671573,15.200015087890625,2,15.871615087890625,2,16.700015087890627C2,17.528415087890625,2.671573,18.200015087890627,3.5,18.200015087890627C4.32843,18.200015087890627,5,17.528415087890625,5,16.700015087890627C5,16.258515087890625,4.80921,15.861515087890625,4.50558,15.587015087890626L7.59952,11.899765087890625C7.8503,12.088295087890625,8.162099999999999,12.200025087890625,8.5,12.200025087890625C8.57314,12.200025087890625,8.645050000000001,12.194785087890626,8.71539,12.184675087890625L11.3216,15.771815087890625C11.12019,16.027215087890625,11,16.349515087890623,11,16.700015087890627C11,17.528415087890625,11.67157,18.200015087890627,12.5,18.200015087890627C13.3284,18.200015087890627,14,17.528415087890625,14,16.700015087890627C14,16.336015087890623,13.8703,16.002315087890626,13.6547,15.742515087890625L16.781,12.016775087890625C16.994500000000002,12.133605087890626,17.2395,12.200025087890625,17.5,12.200025087890625C18.3284,12.200025087890625,19,11.528445087890624,19,10.700025087890625C19,9.871595087890626,18.3284,9.200025087890625,17.5,9.200025087890625C16.671599999999998,9.200025087890625,16,9.871595087890626,16,10.700025087890625C16,10.898765087890624,16.0387,11.088475087890625,16.108800000000002,11.262055087890625L12.7823,15.226515087890625C12.6908,15.209115087890625,12.5965,15.200015087890625,12.5,15.200015087890625C12.3862,15.200015087890625,12.2754,15.212715087890626,12.1689,15.236715087890625L9.60768,11.711495087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), Fd = () => Ud.cloneNode(!0), Kd = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M9.474616630859375,7.494615087890625L8.844736630859375,7.494615087890625L8.844736630859375,4.149892087890625L8.000006630859374,4.634915087890625L8.004896630859374,4.005035087890625L9.020516630859376,3.414215087890625L9.474616630859375,3.414215087890625L9.474616630859375,7.494615087890625ZM18.529296630859378,4.8318550878906255Q18.307996630859375,5.028795087890625,18.122396630859377,5.385245087890625Q17.868496630859376,5.019035087890625,17.629196630859376,4.8269750878906255Q17.389996630859375,4.634915087890625,17.168596630859376,4.634915087890625Q16.794296630859375,4.634915087890625,16.522496630859376,4.976715087890625Q16.252296630859377,5.3168850878906255,16.252296630859377,5.7856350878906255Q16.252296630859377,6.218575087890625,16.502896630859375,6.521315087890625Q16.755196630859373,6.822415087890625,17.114896630859377,6.822415087890625Q17.368796630859375,6.822415087890625,17.588596630859374,6.625475087890624Q17.809896630859377,6.428535087890625,17.998696630859374,6.0688350878906245Q18.249396630859373,6.439935087890625,18.488596630859377,6.631985087890625Q18.727896630859377,6.822415087890625,18.952496630859375,6.822415087890625Q19.326796630859373,6.822415087890625,19.596996630859376,6.482245087890625Q19.868796630859375,6.140455087890626,19.868796630859375,5.671705087890626Q19.868796630859375,5.238755087890625,19.618196630859376,4.937655087890625Q19.367496630859375,4.634915087890625,19.006196630859375,4.634915087890625Q18.750696630859377,4.634915087890625,18.529296630859378,4.8318550878906255ZM18.337296630859377,5.674955087890625L18.278696630859375,5.596835087890625Q18.449596630859375,5.272935087890625,18.622096630859374,5.1101750878906245Q18.794596630859374,4.947415087890625,18.967096630859373,4.947415087890625Q19.194996630859375,4.947415087890625,19.346396630859374,5.1345950878906255Q19.497696630859377,5.320135087890625,19.497696630859377,5.598455087890625Q19.497696630859377,5.8914250878906245,19.360996630859376,6.096505087890625Q19.224296630859374,6.301585087890626,19.027396630859375,6.301585087890626Q18.915096630859374,6.301585087890626,18.742496630859375,6.146965087890624Q18.569996630859375,5.992335087890625,18.337296630859377,5.674955087890625ZM17.785496630859377,5.779125087890625L17.842496630859372,5.857245087890625Q17.668296630859373,6.186025087890625,17.495796630859374,6.348785087890625Q17.324896630859374,6.509915087890625,17.153996630859375,6.509915087890625Q16.926096630859377,6.509915087890625,16.774796630859377,6.324375087890624Q16.623396630859375,6.137195087890625,16.623396630859375,5.858875087890625Q16.623396630859375,5.565905087890625,16.761696630859376,5.360825087890625Q16.900096630859373,5.1557550878906255,17.095396630859376,5.1557550878906255Q17.228896630859374,5.1557550878906255,17.365596630859375,5.2778250878906245Q17.502296630859377,5.399895087890625,17.785496630859377,5.779125087890625ZM10.710296630859375,10.634915087890626C10.710296630859375,11.024655087890626,10.561656630859375,11.379685087890625,10.317976630859375,11.646395087890625L12.879196630859376,15.171615087890626C12.985696630859374,15.147615087890625,13.096496630859376,15.134915087890626,13.210296630859375,15.134915087890626C13.306796630859376,15.134915087890626,13.401096630859374,15.144015087890624,13.492596630859374,15.161415087890624L16.819096630859377,11.196955087890625C16.748996630859374,11.023375087890624,16.710296630859375,10.833655087890625,16.710296630859375,10.634915087890626C16.710296630859375,9.806495087890625,17.381896630859373,9.134915087890626,18.210296630859375,9.134915087890626C19.038696630859373,9.134915087890626,19.710296630859375,9.806495087890625,19.710296630859375,10.634915087890626C19.710296630859375,11.463345087890625,19.038696630859373,12.134915087890626,18.210296630859375,12.134915087890626C17.949796630859375,12.134915087890626,17.704796630859377,12.068505087890625,17.491296630859374,11.951675087890624L14.364996630859375,15.677415087890624C14.580596630859375,15.937215087890625,14.710296630859375,16.270915087890625,14.710296630859375,16.634915087890626C14.710296630859375,17.463315087890624,14.038696630859375,18.134915087890626,13.210296630859375,18.134915087890626C12.381866630859374,18.134915087890626,11.710296630859375,17.463315087890624,11.710296630859375,16.634915087890626C11.710296630859375,16.284415087890626,11.830486630859374,15.962015087890626,12.031896630859375,15.706715087890625L9.425686630859374,12.119565087890624C9.355346630859376,12.129685087890625,9.283436630859375,12.134915087890626,9.210296630859375,12.134915087890626C8.872396630859374,12.134915087890626,8.560596630859376,12.023195087890626,8.309816630859375,11.834665087890626L5.215876630859375,15.521915087890624C5.519506630859375,15.796415087890624,5.710296630859375,16.193415087890624,5.710296630859375,16.634915087890626C5.710296630859375,17.463315087890624,5.038726630859375,18.134915087890626,4.210296630859375,18.134915087890626C3.381869630859375,18.134915087890626,2.710296630859375,17.463315087890624,2.710296630859375,16.634915087890626C2.710296630859375,15.806515087890626,3.381869630859375,15.134915087890626,4.210296630859375,15.134915087890626C4.218546630859375,15.134915087890626,4.226776630859375,15.135015087890626,4.234996630859375,15.135115087890625L7.744116630859375,10.953115087890625C7.721966630859375,10.850565087890626,7.710296630859375,10.744105087890624,7.710296630859375,10.634915087890626C7.710296630859375,9.806495087890625,8.381866630859374,9.134915087890626,9.210296630859375,9.134915087890626C10.038726630859376,9.134915087890626,10.710296630859375,9.806495087890625,10.710296630859375,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), jd = () => Kd.cloneNode(!0), zd = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M21,5.5C21,6.32843,20.3284,7,19.5,7C19.4136,7,19.3289,6.99269,19.2465,6.97866L15.6257,15.5086C15.8587,15.7729,16,16.119999999999997,16,16.5C16,17.328400000000002,15.3284,18,14.5,18C13.8469,18,13.2913,17.5826,13.0854,17L3.91465,17C3.70873,17.5826,3.15311,18,2.5,18C1.671573,18,1,17.328400000000002,1,16.5C1,15.6716,1.671573,15,2.5,15C2.5840199999999998,15,2.66643,15.0069,2.74668,15.0202L6.36934,6.48574C6.13933,6.22213,6,5.87733,6,5.5C6,4.671573,6.67157,4,7.5,4C8.15311,4,8.70873,4.417404,8.91465,5L18.0854,5C18.2913,4.417404,18.8469,4,19.5,4C20.3284,4,21,4.671573,21,5.5ZM18.0854,6L8.91465,6C8.892579999999999,6.06243,8.8665,6.12296,8.83672,6.18128L13.9814,15.0921C14.143,15.0325,14.3177,15,14.5,15C14.584,15,14.6664,15.0069,14.7467,15.0202L18.3693,6.48574C18.2462,6.3446,18.149,6.1802,18.0854,6ZM13.2036,15.745L8.0861,6.8811800000000005C7.90605,6.95768,7.70797,7,7.5,7C7.41359,7,7.32888,6.99269,7.24647,6.97866L3.62571,15.5086C3.7512,15.651,3.8501,15.8174,3.91465,16L13.0854,16C13.1169,15.9108,13.1566,15.8255,13.2036,15.745Z" stroke-opacity="0" stroke="none"></path></svg>'), Qd = () => zd.cloneNode(!0), Zd = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.92159,5.93994C6.04014,5.90529,6.152620000000001,5.85639,6.25704,5.79523L9.12729,9.89437C9.045449999999999,10.07959,9,10.28449,9,10.5C9,10.79522,9.08529,11.07053,9.232569999999999,11.30262L4.97573,16.7511L5.92159,5.93994ZM4.92259,5.8848400000000005C4.38078,5.658659999999999,4,5.1238,4,4.5C4,3.671573,4.67157,3,5.5,3C6.2157,3,6.81433,3.50124,6.96399,4.17183L15.1309,4.88634C15.3654,4.36387,15.8902,4,16.5,4C17.328400000000002,4,18,4.67157,18,5.5C18,6.08983,17.659599999999998,6.60015,17.1645,6.84518L18.4264,14.0018C18.4508,14.0006,18.4753,14,18.5,14C19.3284,14,20,14.6716,20,15.5C20,16.328400000000002,19.3284,17,18.5,17C17.932499999999997,17,17.4386,16.6849,17.183799999999998,16.22L5.99686,18.5979C5.946429999999999,19.3807,5.29554,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.869300000000003,3.389292,17.3295,3.94071,17.1077L4.92259,5.8848400000000005ZM5.72452,17.6334C5.69799,17.596,5.6698,17.5599,5.64004,17.525100000000002L10.01843,11.92103C10.16958,11.97223,10.33155,12,10.5,12C10.80059,12,11.08052,11.91158,11.31522,11.75934L17.0606,15.0765C17.0457,15.1271,17.0335,15.1789,17.023899999999998,15.2317L5.72452,17.6334ZM11.92855,10.95875L17.4349,14.1379L16.1699,6.96356C15.9874,6.92257,15.8174,6.8483,15.6667,6.74746L11.99771,10.4165C11.99923,10.44414,12,10.47198,12,10.5C12,10.66,11.97495,10.814160000000001,11.92855,10.95875ZM10.5,9C10.259830000000001,9,10.03285,9.05644,9.83159,9.15679L7.04919,5.1831L15.0493,5.88302C15.054,5.90072,15.059,5.91829,15.0643,5.9357299999999995L11.56066,9.43934C11.28921,9.16789,10.91421,9,10.5,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Rd = () => Zd.cloneNode(!0), Vd = /* @__PURE__ */ b('<svg viewBox="0 0 22 22"><path d="M4.727219638671875,8.007996215820313L9.973849638671876,2.7629472158203123C10.167279638671875,2.5696791158203123,10.480729638671875,2.5696791158203123,10.674169638671875,2.7629472158203123L13.223329638671874,5.311756215820313C13.416929638671874,5.505236215820313,13.416929638671874,5.8189862158203125,13.223329638671874,6.012466215820313L7.977129638671875,11.257906215820313C7.379859638671875,11.855176215820313,7.407609638671875,12.909396215820312,8.033809638671876,13.535596215820313C8.660409638671876,14.162596215820313,9.713849638671874,14.189996215820312,10.311129638671876,13.591896215820313L15.556929638671875,8.346066215820311C15.750429638671875,8.152526215820313,16.064229638671875,8.152526215820313,16.257629638671872,8.346066215820311L18.806529638671876,10.895266215820312C19.000029638671876,11.088746215820313,19.000029638671876,11.402496215820312,18.806529638671876,11.595976215820313L13.560629638671875,16.841796215820313C11.165619638671876,19.237196215820312,7.197149638671875,19.19919621582031,4.783499638671875,16.785496215820313C2.3698426386718747,14.371896215820312,2.331397638671875,10.403416215820313,4.727219638671875,8.007996215820313ZM12.172299638671875,5.662106215820312L10.323809638671875,3.8136162158203124L5.4287196386718755,8.709096215820313C3.422893638671875,10.714536215820312,3.4549956386718748,14.055196215820313,5.484999638671875,16.08479621582031C7.514609638671875,18.114796215820313,10.855289638671875,18.146496215820314,12.860719638671876,16.141096215820312L15.465629638671874,13.535796215820312L14.090929638671875,12.160756215820312L14.791629638671875,11.460436215820312L16.166229638671876,12.834996215820313L17.755829638671877,11.245226215820313L15.907729638671874,9.396736215820312L11.011839638671875,14.292596215820312C10.042809638671875,15.262396215820312,8.418249638671874,15.243796215820312,7.406019638671875,14.306496215820312L7.333099638671875,14.236296215820312C6.327599638671876,13.230796215820313,6.284009638671876,11.550396215820312,7.276419638671875,10.557586215820312L9.882199638671874,7.952026215820313L8.501079638671875,6.570906215820313L9.201789638671876,5.870186215820313L10.582939638671874,7.251336215820312L12.172299638671875,5.662106215820312Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Hd = (e) => (() => {
  const t = Vd.cloneNode(!0);
  return k1(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), qd = /* @__PURE__ */ b('<svg viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_615"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_615)"><path d="M19.672,3.0673368C19.4417,2.9354008,19.1463,3.00292252,18.9994,3.2210900000000002L17.4588,5.50622L16.743299999999998,3.781253L13.9915,7.4662L13.9618,7.51108C13.8339,7.72862,13.8936,8.005659999999999,14.1004,8.15391L14.1462,8.183430000000001C14.3683,8.308720000000001,14.6511,8.25001,14.8022,8.047229999999999L16.4907,5.78571L17.246299999999998,7.60713L19.8374,3.7635389999999997L19.8651,3.717088C19.9871,3.484615,19.9023,3.199273,19.672,3.0673368ZM4.79974,8.462530000000001L10.117740000000001,3.252975C10.31381,3.0610145,10.63152,3.0610145,10.82759,3.252975L13.4115,5.78453C13.6076,5.976710000000001,13.6076,6.28833,13.4115,6.4805L8.093869999999999,11.69045C7.48847,12.28368,7.51659,13.3308,8.151309999999999,13.9528C8.786439999999999,14.5755,9.85421,14.6027,10.45961,14.0087L15.7768,8.79831C15.9729,8.60609,16.2909,8.60609,16.487099999999998,8.79831L19.0705,11.33026C19.2667,11.52244,19.2667,11.83406,19.0705,12.02623L13.7533,17.2366C11.32572,19.6158,7.30328,19.578,4.85679,17.1807C2.410298,14.7834,2.371331,10.84174,4.79974,8.462530000000001ZM12.3461,6.1325199999999995L10.47246,4.29654L5.51079,9.15889C3.477674,11.15076,3.510214,14.4688,5.56784,16.4847C7.62506,18.500999999999998,11.01117,18.5325,13.0439,16.540599999999998L15.6842,13.9529L14.2908,12.58718L15.0011,11.89161L16.394399999999997,13.2569L18.0056,11.67786L16.1323,9.84188L11.16985,14.7046C10.18764,15.6679,8.540980000000001,15.6494,7.51498,14.7184L7.44107,14.6487C6.4219,13.65,6.37771,11.98096,7.38362,10.994869999999999L10.02485,8.40693L8.624939999999999,7.03516L9.335180000000001,6.33919L10.73512,7.71099L12.3461,6.1325199999999995Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), Yd = (e) => (() => {
  const t = qd.cloneNode(!0);
  return k1(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), Gd = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,17C5.80945,17,3.667717,12.85,3.113386,11.575C2.9622047,11.2,2.9622047,10.8,3.113386,10.425C3.667717,9.15,5.80945,5,11,5C16.165399999999998,5,18.3323,9.15,18.8866,10.425C19.0378,10.8,19.0378,11.2,18.8866,11.575C18.3323,12.85,16.165399999999998,17,11,17ZM4.04567,10.8C3.995276,10.925,3.995276,11.05,4.04567,11.175C4.52441,12.325,6.43937,16,11,16C15.5606,16,17.4756,12.325,17.9543,11.2C18.0047,11.075,18.0047,10.95,17.9543,10.825C17.4756,9.675,15.5606,6,11,6C6.43937,6,4.52441,9.675,4.04567,10.8ZM11,13.5C9.61417,13.5,8.480319999999999,12.375,8.480319999999999,11C8.480319999999999,9.625,9.61417,8.5,11,8.5C12.38583,8.5,13.5197,9.625,13.5197,11C13.5197,12.375,12.38583,13.5,11,13.5ZM11,9.5C10.1685,9.5,9.48819,10.175,9.48819,11C9.48819,11.825,10.1685,12.5,11,12.5C11.8315,12.5,12.51181,11.825,12.51181,11C12.51181,10.175,11.8315,9.5,11,9.5Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), Wd = () => Gd.cloneNode(!0), Xd = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.80417,14.9887L4.62563,16.167299999999997C4.43037,16.3625,4.43037,16.6791,4.62563,16.8744C4.82089,17.0696,5.13748,17.0696,5.332739999999999,16.8744L6.62638,15.5807C7.75595,16.290100000000002,9.19328,16.7929,11,16.7929C16.165399999999998,16.7929,18.3323,12.64289,18.8866,11.36789C19.0378,10.99289,19.0378,10.59289,18.8866,10.21789C18.5549,9.45486,17.6456,7.66212,15.8617,6.34545L17.3536,4.853553C17.5488,4.658291,17.5488,4.341709,17.3536,4.146447C17.1583,3.9511845,16.8417,3.9511845,16.6464,4.146447L15.0014,5.7915399999999995C13.9314,5.1969,12.61166,4.792893,11,4.792893C5.80945,4.792893,3.667717,8.94289,3.113386,10.21789C2.9622049,10.59289,2.9622049,10.99289,3.113386,11.36789C3.424435,12.08333,4.2353000000000005,13.70399,5.80417,14.9887ZM7.36012,14.847C8.32327,15.4074,9.52286,15.7929,11,15.7929C15.5606,15.7929,17.4756,12.11789,17.9543,10.99289C18.0047,10.86789,18.0047,10.74289,17.9543,10.61789C17.659,9.90846,16.8171,8.23812,15.1447,7.06241L12.96929,9.23782C13.3134,9.66543,13.5197,10.20642,13.5197,10.79289C13.5197,12.16789,12.38583,13.29289,11,13.29289C10.41596,13.29289,9.87667,13.09308,9.44815,12.75896L7.36012,14.847ZM8.794609999999999,11.99829L6.520099999999999,14.2728C5.06905,13.12119,4.32057,11.628250000000001,4.04567,10.96789C3.995275,10.84289,3.995275,10.71789,4.04567,10.59289C4.52441,9.46789,6.43937,5.79289,11,5.79289C12.28868,5.79289,13.3661,6.086320000000001,14.2596,6.53329L12.19759,8.5953C11.84086,8.40257,11.43271,8.29289,11,8.29289C9.61417,8.29289,8.480319999999999,9.41789,8.480319999999999,10.79289C8.480319999999999,11.22918,8.594470000000001,11.64029,8.794609999999999,11.99829ZM10.16528,12.04183C10.404869999999999,12.20032,10.692070000000001,12.29289,11,12.29289C11.8315,12.29289,12.51181,11.61789,12.51181,10.79289C12.51181,10.48318,12.41593,10.194600000000001,12.25216,9.95494L10.16528,12.04183ZM11.43602,9.35687L9.55616,11.236740000000001C9.512,11.09633,9.48819,10.94724,9.48819,10.79289C9.48819,9.96789,10.1685,9.29289,11,9.29289C11.15142,9.29289,11.29782,9.31528,11.43602,9.35687Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Jd = () => Xd.cloneNode(!0), eh = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_625"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_625)"><path d="M14.5385,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807692,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.88462,4,14.5385,5.61538,14.5385,7.576919999999999L14.5385,9.76923ZM10.88461,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923L13.38462,9.76923L13.38462,7.576919999999999C13.38462,6.23077,12.26923,5.15385,10.88461,5.15385ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.038450000000001,12.07692,11.307680000000001,12.34615,11.307680000000001,12.65385L11.307680000000001,14.5769C11.307680000000001,14.8846,11.038450000000001,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), th = () => eh.cloneNode(!0), rh = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_620"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_620)"><path d="M8.38461,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807693,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.46154,4,13.84615,4.961539,14.3462,6.423080000000001C14.4615,6.73077,14.3077,7.038460000000001,14,7.15385C13.69231,7.26923,13.38461,7.11538,13.26923,6.80769C12.92308,5.80769,11.96154,5.15385,10.88462,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.03846,12.07692,11.307690000000001,12.34615,11.307690000000001,12.65385L11.307690000000001,14.5769C11.307690000000001,14.8846,11.03846,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), nh = () => rh.cloneNode(!0), ih = /* @__PURE__ */ b('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M16.966900000000003,8.67144C16.6669,8.67144,16.4247,8.91558,16.4247,9.21802L16.4247,16.631500000000003C16.4247,17.322,16.007199999999997,17.9068,15.5139,17.9068L13.93072,17.9068L13.93072,9.2162C13.93072,8.91741,13.68675,8.67144,13.38855,8.67144C13.09036,8.67144,12.84639,8.91741,12.84639,9.21802L12.84639,17.9068L10.151810000000001,17.9068L10.151810000000001,9.21802C10.151810000000001,8.91741,9.90783,8.67144,9.609639999999999,8.67144C9.31145,8.67144,9.06747,8.91741,9.06747,9.219850000000001L9.06747,17.9068L7.48614,17.9068C6.99277,17.9068,6.5753,17.322,6.5753,16.631500000000003L6.5753,9.21802C6.5753,8.91558,6.333130000000001,8.67144,6.03313,8.67144C5.73313,8.67144,5.49096,8.91558,5.49096,9.21802L5.49096,16.631500000000003C5.49096,17.9378,6.385540000000001,19,7.48614,19L15.512,19C16.6127,19,17.509,17.9378,17.509,16.631500000000003L17.509,9.21802C17.509,8.91558,17.2669,8.67144,16.966900000000003,8.67144ZM18.4578,6.21183L4.542169,6.21183C4.243976,6.21183,4,6.45779,4,6.75841C4,7.05903,4.243976,7.30499,4.542169,7.30499L18.4578,7.30499C18.756,7.30499,19,7.05903,19,6.75841C19,6.45779,18.756,6.21183,18.4578,6.21183ZM8.68072,5.10045L14.3193,5.10045C14.6175,5.10045,14.8614,4.852666,14.8614,4.550225C14.8614,4.247783,14.6175,4,14.3193,4L8.68072,4C8.38253,4,8.13855,4.247783,8.13855,4.550225C8.13855,4.852666,8.38253,5.10045,8.68072,5.10045Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), oh = () => ih.cloneNode(!0), ah = {
  horizontalStraightLine: ju,
  horizontalRayLine: Qu,
  horizontalSegment: Ru,
  verticalStraightLine: Hu,
  verticalRayLine: Yu,
  verticalSegment: Wu,
  straightLine: Ju,
  rayLine: td,
  segment: nd,
  arrow: od,
  priceLine: sd,
  priceChannelLine: cd,
  parallelStraightLine: dd,
  fibonacciLine: fd,
  fibonacciSegment: Cd,
  fibonacciCircle: md,
  fibonacciSpiral: vd,
  fibonacciSpeedResistanceFan: $d,
  fibonacciExtension: kd,
  gannBox: xd,
  circle: wd,
  triangle: Sd,
  rect: Pd,
  parallelogram: Dd,
  threeWaves: Nd,
  fiveWaves: Bd,
  eightWaves: Fd,
  anyWaves: jd,
  abcd: Qd,
  xabcd: Rd,
  weak_magnet: Hd,
  strong_magnet: Yd,
  lock: th,
  unlock: nh,
  visible: Wd,
  invisible: Jd,
  remove: oh
};
function sh(e) {
  return [
    { key: "horizontalStraightLine", text: a("horizontal_straight_line", e) },
    { key: "horizontalRayLine", text: a("horizontal_ray_line", e) },
    { key: "horizontalSegment", text: a("horizontal_segment", e) },
    { key: "verticalStraightLine", text: a("vertical_straight_line", e) },
    { key: "verticalRayLine", text: a("vertical_ray_line", e) },
    { key: "verticalSegment", text: a("vertical_segment", e) },
    { key: "straightLine", text: a("straight_line", e) },
    { key: "rayLine", text: a("ray_line", e) },
    { key: "segment", text: a("segment", e) },
    { key: "arrow", text: a("arrow", e) },
    { key: "priceLine", text: a("price_line", e) }
  ];
}
function lh(e) {
  return [
    { key: "priceChannelLine", text: a("price_channel_line", e) },
    { key: "parallelStraightLine", text: a("parallel_straight_line", e) }
  ];
}
function ch(e) {
  return [
    { key: "circle", text: a("circle", e) },
    { key: "rect", text: a("rect", e) },
    { key: "parallelogram", text: a("parallelogram", e) },
    { key: "triangle", text: a("triangle", e) }
  ];
}
function uh(e) {
  return [
    { key: "fibonacciLine", text: a("fibonacci_line", e) },
    { key: "fibonacciSegment", text: a("fibonacci_segment", e) },
    { key: "fibonacciCircle", text: a("fibonacci_circle", e) },
    { key: "fibonacciSpiral", text: a("fibonacci_spiral", e) },
    { key: "fibonacciSpeedResistanceFan", text: a("fibonacci_speed_resistance_fan", e) },
    { key: "fibonacciExtension", text: a("fibonacci_extension", e) },
    { key: "gannBox", text: a("gann_box", e) }
  ];
}
function dh(e) {
  return [
    { key: "xabcd", text: a("xabcd", e) },
    { key: "abcd", text: a("abcd", e) },
    { key: "threeWaves", text: a("three_waves", e) },
    { key: "fiveWaves", text: a("five_waves", e) },
    { key: "eightWaves", text: a("eight_waves", e) },
    { key: "anyWaves", text: a("any_waves", e) }
  ];
}
function hh(e) {
  return [
    { key: "weak_magnet", text: a("weak_magnet", e) },
    { key: "strong_magnet", text: a("strong_magnet", e) }
  ];
}
const U1 = (e) => ah[e.name](e.class), fh = /* @__PURE__ */ b('<div class="klinecharts-pro-drawing-bar"><span class="split-line"></span><div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div><div class="item"><span style="width:32px;height:32px"></span></div><div class="item"><span style="width:32px;height:32px"></span></div><span class="split-line"></span><div class="item"><span style="width:32px;height:32px"></span></div></div>'), yh = /* @__PURE__ */ b('<div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div>'), M9 = /* @__PURE__ */ b('<li><span style="padding-left:8px"></span></li>'), S9 = "drawing_tools", Ch = (e) => {
  const [t, r] = S("horizontalStraightLine"), [n, o] = S("priceChannelLine"), [l, u] = S("circle"), [c, C] = S("fibonacciLine"), [$, y] = S("xabcd"), [x, A] = S("weak_magnet"), [P, I] = S("normal"), [j, R] = S(!1), [F, V] = S(!0), [E, B] = S(""), G = q(() => [{
    key: "singleLine",
    icon: t(),
    list: sh(e.locale),
    setter: r
  }, {
    key: "moreLine",
    icon: n(),
    list: lh(e.locale),
    setter: o
  }, {
    key: "polygon",
    icon: l(),
    list: ch(e.locale),
    setter: u
  }, {
    key: "fibonacci",
    icon: c(),
    list: uh(e.locale),
    setter: C
  }, {
    key: "wave",
    icon: $(),
    list: dh(e.locale),
    setter: y
  }]), I1 = q(() => hh(e.locale));
  return (() => {
    const m1 = fh.cloneNode(!0), S1 = m1.firstChild, z = S1.nextSibling, i1 = z.firstChild, J = i1.nextSibling, T1 = J.firstChild, K1 = z.nextSibling, te = K1.firstChild, Z1 = K1.nextSibling, Q = Z1.firstChild, Y = Z1.nextSibling, P1 = Y.nextSibling, L1 = P1.firstChild;
    return k(m1, () => G().map((D) => (() => {
      const o1 = yh.cloneNode(!0), g = o1.firstChild, e1 = g.nextSibling, c1 = e1.firstChild;
      return o1.addEventListener("blur", () => {
        B("");
      }), g.$$click = () => {
        e.onDrawingItemClick({
          groupId: S9,
          name: D.icon,
          visible: F(),
          lock: j(),
          mode: P()
        });
      }, k(g, L(U1, {
        get name() {
          return D.icon;
        }
      })), e1.$$click = () => {
        D.key === E() ? B("") : B(D.key);
      }, k(o1, (() => {
        const C1 = q(() => D.key === E());
        return () => C1() && L(gt, {
          class: "list",
          get children() {
            return D.list.map((W) => (() => {
              const b1 = M9.cloneNode(!0), A1 = b1.firstChild;
              return b1.$$click = () => {
                D.setter(W.key), e.onDrawingItemClick({
                  name: W.key,
                  lock: j(),
                  mode: P()
                }), B("");
              }, k(b1, L(U1, {
                get name() {
                  return W.key;
                }
              }), A1), k(A1, () => W.text), b1;
            })());
          }
        });
      })(), null), N(() => k1(c1, "class", D.key === E() ? "rotate" : "")), o1;
    })()), S1), z.addEventListener("blur", () => {
      B("");
    }), i1.$$click = () => {
      let D = x();
      P() !== "normal" && (D = "normal"), I(D), e.onModeChange(D);
    }, k(i1, (() => {
      const D = q(() => x() === "weak_magnet");
      return () => D() ? (() => {
        const o1 = q(() => P() === "weak_magnet");
        return () => o1() ? L(U1, {
          name: "weak_magnet",
          class: "selected"
        }) : L(U1, {
          name: "weak_magnet"
        });
      })() : (() => {
        const o1 = q(() => P() === "strong_magnet");
        return () => o1() ? L(U1, {
          name: "strong_magnet",
          class: "selected"
        }) : L(U1, {
          name: "strong_magnet"
        });
      })();
    })()), J.$$click = () => {
      E() === "mode" ? B("") : B("mode");
    }, k(z, (() => {
      const D = q(() => E() === "mode");
      return () => D() && L(gt, {
        class: "list",
        get children() {
          return I1().map((o1) => (() => {
            const g = M9.cloneNode(!0), e1 = g.firstChild;
            return g.$$click = () => {
              A(o1.key), I(o1.key), e.onModeChange(o1.key), B("");
            }, k(g, L(U1, {
              get name() {
                return o1.key;
              }
            }), e1), k(e1, () => o1.text), g;
          })());
        }
      });
    })(), null), te.$$click = () => {
      const D = !j();
      R(D), e.onLockChange(D);
    }, k(te, (() => {
      const D = q(() => !!j());
      return () => D() ? L(U1, {
        name: "lock"
      }) : L(U1, {
        name: "unlock"
      });
    })()), Q.$$click = () => {
      const D = !F();
      V(D), e.onVisibleChange(D);
    }, k(Q, (() => {
      const D = q(() => !!F());
      return () => D() ? L(U1, {
        name: "visible"
      }) : L(U1, {
        name: "invisible"
      });
    })()), L1.$$click = () => {
      e.onRemoveClick(S9);
    }, k(L1, L(U1, {
      name: "remove"
    })), N(() => k1(T1, "class", E() === "mode" ? "rotate" : "")), m1;
  })();
};
F1(["click"]);
const T9 = /* @__PURE__ */ b('<li class="title"></li>'), P9 = /* @__PURE__ */ b('<li class="row"></li>'), gh = (e) => L(be, {
  get title() {
    return a("indicator", e.locale);
  },
  width: 400,
  get onClose() {
    return e.onClose;
  },
  get children() {
    return L(gt, {
      class: "klinecharts-pro-indicator-modal-list",
      get children() {
        return [(() => {
          const t = T9.cloneNode(!0);
          return k(t, () => a("main_indicator", e.locale)), t;
        })(), q(() => ["MA", "EMA", "SMA", "BOLL", "SAR", "BBI"].map((t) => {
          const r = e.mainIndicators.includes(t);
          return (() => {
            const n = P9.cloneNode(!0);
            return n.$$click = (o) => {
              e.onMainIndicatorChange({
                name: t,
                paneId: "candle_pane",
                added: !r
              });
            }, k(n, L(w9, {
              checked: r,
              get label() {
                return a(t.toLowerCase(), e.locale);
              }
            })), n;
          })();
        })), (() => {
          const t = T9.cloneNode(!0);
          return k(t, () => a("sub_indicator", e.locale)), t;
        })(), q(() => ["MA", "EMA", "VOL", "MACD", "BOLL", "KDJ", "RSI", "BIAS", "BRAR", "CCI", "DMI", "CR", "PSY", "DMA", "TRIX", "OBV", "VR", "WR", "MTM", "EMV", "SAR", "SMA", "ROC", "PVT", "BBI", "AO"].map((t) => {
          const r = t in e.subIndicators;
          return (() => {
            const n = P9.cloneNode(!0);
            return n.$$click = (o) => {
              e.onSubIndicatorChange({
                name: t,
                paneId: e.subIndicators[t] ?? "",
                added: !r
              });
            }, k(n, L(w9, {
              checked: r,
              get label() {
                return a(t.toLowerCase(), e.locale);
              }
            })), n;
          })();
        }))];
      }
    });
  }
});
F1(["click"]);
function O9(e, t) {
  switch (e) {
    case "Etc/UTC":
      return a("utc", t);
    case "Pacific/Midway":
      return a("midway", t);
    case "Pacific/Honolulu":
      return a("honolulu", t);
    case "America/Anchorage":
      return a("anchorage", t);
    case "America/Juneau":
      return a("juneau", t);
    case "America/Los_Angeles":
      return a("los_angeles", t);
    case "America/Vancouver":
      return a("vancouver", t);
    case "America/Tijuana":
      return a("tijuana", t);
    case "America/Phoenix":
      return a("phoenix", t);
    case "America/Denver":
      return a("denver", t);
    case "America/Chicago":
      return a("chicago", t);
    case "America/Mexico_City":
      return a("mexico_city", t);
    case "America/Guatemala":
      return a("guatemala", t);
    case "America/New_York":
      return a("new_york", t);
    case "America/Toronto":
      return a("toronto", t);
    case "America/Bogota":
      return a("bogota", t);
    case "America/Lima":
      return a("lima", t);
    case "America/Caracas":
      return a("caracas", t);
    case "America/Halifax":
      return a("halifax", t);
    case "America/Santiago":
      return a("santiago", t);
    case "America/La_Paz":
      return a("la_paz", t);
    case "America/Sao_Paulo":
      return a("sao_paulo", t);
    case "America/Buenos_Aires":
      return a("buenos_aires", t);
    case "America/Montevideo":
      return a("montevideo", t);
    case "America/Godthab":
      return a("godthab", t);
    case "Atlantic/Azores":
      return a("azores", t);
    case "Atlantic/Cape_Verde":
      return a("cape_verde", t);
    case "Europe/London":
      return a("london", t);
    case "Europe/Dublin":
      return a("dublin", t);
    case "Europe/Lisbon":
      return a("lisbon", t);
    case "Africa/Casablanca":
      return a("casablanca", t);
    case "Europe/Paris":
      return a("paris", t);
    case "Europe/Berlin":
      return a("berlin", t);
    case "Europe/Amsterdam":
      return a("amsterdam", t);
    case "Europe/Brussels":
      return a("brussels", t);
    case "Europe/Madrid":
      return a("madrid", t);
    case "Europe/Rome":
      return a("rome", t);
    case "Europe/Vienna":
      return a("vienna", t);
    case "Europe/Warsaw":
      return a("warsaw", t);
    case "Africa/Lagos":
      return a("lagos", t);
    case "Europe/Athens":
      return a("athens", t);
    case "Europe/Bucharest":
      return a("bucharest", t);
    case "Europe/Helsinki":
      return a("helsinki", t);
    case "Europe/Istanbul":
      return a("istanbul", t);
    case "Europe/Kiev":
      return a("kiev", t);
    case "Africa/Cairo":
      return a("cairo", t);
    case "Africa/Johannesburg":
      return a("johannesburg", t);
    case "Asia/Jerusalem":
      return a("jerusalem", t);
    case "Europe/Moscow":
      return a("moscow", t);
    case "Asia/Baghdad":
      return a("baghdad", t);
    case "Asia/Kuwait":
      return a("kuwait", t);
    case "Asia/Riyadh":
      return a("riyadh", t);
    case "Asia/Bahrain":
      return a("bahrain", t);
    case "Africa/Nairobi":
      return a("nairobi", t);
    case "Asia/Tehran":
      return a("tehran", t);
    case "Asia/Dubai":
      return a("dubai", t);
    case "Asia/Muscat":
      return a("muscat", t);
    case "Asia/Baku":
      return a("baku", t);
    case "Asia/Kabul":
      return a("kabul", t);
    case "Asia/Karachi":
      return a("karachi", t);
    case "Asia/Tashkent":
      return a("tashkent", t);
    case "Asia/Ashkhabad":
      return a("ashkhabad", t);
    case "Asia/Kolkata":
      return a("kolkata", t);
    case "Asia/Mumbai":
      return a("mumbai", t);
    case "Asia/Colombo":
      return a("colombo", t);
    case "Asia/Kathmandu":
      return a("kathmandu", t);
    case "Asia/Dhaka":
      return a("dhaka", t);
    case "Asia/Almaty":
      return a("almaty", t);
    case "Asia/Yangon":
      return a("yangon", t);
    case "Asia/Bangkok":
      return a("bangkok", t);
    case "Asia/Jakarta":
      return a("jakarta", t);
    case "Asia/Ho_Chi_Minh":
      return a("ho_chi_minh", t);
    case "Asia/Shanghai":
      return a("shanghai", t);
    case "Asia/Hong_Kong":
      return a("hong_kong", t);
    case "Asia/Singapore":
      return a("singapore", t);
    case "Asia/Taipei":
      return a("taipei", t);
    case "Asia/Manila":
      return a("manila", t);
    case "Asia/Kuala_Lumpur":
      return a("kuala_lumpur", t);
    case "Australia/Perth":
      return a("perth", t);
    case "Asia/Tokyo":
      return a("tokyo", t);
    case "Asia/Seoul":
      return a("seoul", t);
    case "Asia/Pyongyang":
      return a("pyongyang", t);
    case "Australia/Adelaide":
      return a("adelaide", t);
    case "Australia/Darwin":
      return a("darwin", t);
    case "Australia/Brisbane":
      return a("brisbane", t);
    case "Australia/Sydney":
      return a("sydney", t);
    case "Australia/Melbourne":
      return a("melbourne", t);
    case "Pacific/Guam":
      return a("guam", t);
    case "Pacific/Port_Moresby":
      return a("port_moresby", t);
    case "Pacific/Norfolk":
      return a("norfolk", t);
    case "Pacific/Guadalcanal":
      return a("guadalcanal", t);
    case "Pacific/Auckland":
      return a("auckland", t);
    case "Pacific/Fiji":
      return a("fiji", t);
    case "Pacific/Tongatapu":
      return a("tongatapu", t);
    case "Pacific/Apia":
      return a("apia", t);
    case "Asia/Karachi":
      return a("karachi", t);
  }
  return e;
}
function mh(e) {
  return [
    // UTC
    { key: "Etc/UTC", text: `(UTC+0:00) ${a("utc", e)}` },
    // Pacific (UTC-12 to UTC-8)
    { key: "Pacific/Midway", text: `(UTC-11:00) ${a("midway", e)}` },
    { key: "Pacific/Honolulu", text: `(UTC-10:00) ${a("honolulu", e)}` },
    { key: "America/Anchorage", text: `(UTC-9:00) ${a("anchorage", e)}` },
    { key: "America/Juneau", text: `(UTC-9:00) ${a("juneau", e)}` },
    // North America West (UTC-8 to UTC-7)
    { key: "America/Los_Angeles", text: `(UTC-8:00) ${a("los_angeles", e)}` },
    { key: "America/Vancouver", text: `(UTC-8:00) ${a("vancouver", e)}` },
    { key: "America/Tijuana", text: `(UTC-8:00) ${a("tijuana", e)}` },
    { key: "America/Phoenix", text: `(UTC-7:00) ${a("phoenix", e)}` },
    { key: "America/Denver", text: `(UTC-7:00) ${a("denver", e)}` },
    // North America Central (UTC-6)
    { key: "America/Chicago", text: `(UTC-6:00) ${a("chicago", e)}` },
    { key: "America/Mexico_City", text: `(UTC-6:00) ${a("mexico_city", e)}` },
    { key: "America/Guatemala", text: `(UTC-6:00) ${a("guatemala", e)}` },
    // North America East (UTC-5 to UTC-4)
    { key: "America/New_York", text: `(UTC-5:00) ${a("new_york", e)}` },
    { key: "America/Toronto", text: `(UTC-5:00) ${a("toronto", e)}` },
    { key: "America/Bogota", text: `(UTC-5:00) ${a("bogota", e)}` },
    { key: "America/Lima", text: `(UTC-5:00) ${a("lima", e)}` },
    { key: "America/Caracas", text: `(UTC-4:00) ${a("caracas", e)}` },
    { key: "America/Halifax", text: `(UTC-4:00) ${a("halifax", e)}` },
    // South America (UTC-4 to UTC-3)
    { key: "America/Santiago", text: `(UTC-4:00) ${a("santiago", e)}` },
    { key: "America/La_Paz", text: `(UTC-4:00) ${a("la_paz", e)}` },
    { key: "America/Sao_Paulo", text: `(UTC-3:00) ${a("sao_paulo", e)}` },
    { key: "America/Buenos_Aires", text: `(UTC-3:00) ${a("buenos_aires", e)}` },
    { key: "America/Montevideo", text: `(UTC-3:00) ${a("montevideo", e)}` },
    // Atlantic (UTC-3 to UTC-1)
    { key: "America/Godthab", text: `(UTC-3:00) ${a("godthab", e)}` },
    { key: "Atlantic/Azores", text: `(UTC-1:00) ${a("azores", e)}` },
    { key: "Atlantic/Cape_Verde", text: `(UTC-1:00) ${a("cape_verde", e)}` },
    // Western Europe (UTC+0 to UTC+1)
    { key: "Europe/London", text: `(UTC+0:00) ${a("london", e)}` },
    { key: "Europe/Dublin", text: `(UTC+0:00) ${a("dublin", e)}` },
    { key: "Europe/Lisbon", text: `(UTC+0:00) ${a("lisbon", e)}` },
    { key: "Africa/Casablanca", text: `(UTC+0:00) ${a("casablanca", e)}` },
    { key: "Europe/Paris", text: `(UTC+1:00) ${a("paris", e)}` },
    { key: "Europe/Berlin", text: `(UTC+1:00) ${a("berlin", e)}` },
    { key: "Europe/Amsterdam", text: `(UTC+1:00) ${a("amsterdam", e)}` },
    { key: "Europe/Brussels", text: `(UTC+1:00) ${a("brussels", e)}` },
    { key: "Europe/Madrid", text: `(UTC+1:00) ${a("madrid", e)}` },
    { key: "Europe/Rome", text: `(UTC+1:00) ${a("rome", e)}` },
    { key: "Europe/Vienna", text: `(UTC+1:00) ${a("vienna", e)}` },
    { key: "Europe/Warsaw", text: `(UTC+1:00) ${a("warsaw", e)}` },
    { key: "Africa/Lagos", text: `(UTC+1:00) ${a("lagos", e)}` },
    // Central Europe (UTC+2)
    { key: "Europe/Athens", text: `(UTC+2:00) ${a("athens", e)}` },
    { key: "Europe/Bucharest", text: `(UTC+2:00) ${a("bucharest", e)}` },
    { key: "Europe/Helsinki", text: `(UTC+2:00) ${a("helsinki", e)}` },
    { key: "Europe/Istanbul", text: `(UTC+2:00) ${a("istanbul", e)}` },
    { key: "Europe/Kiev", text: `(UTC+2:00) ${a("kiev", e)}` },
    { key: "Africa/Cairo", text: `(UTC+2:00) ${a("cairo", e)}` },
    { key: "Africa/Johannesburg", text: `(UTC+2:00) ${a("johannesburg", e)}` },
    { key: "Asia/Jerusalem", text: `(UTC+2:00) ${a("jerusalem", e)}` },
    // Eastern Europe / Middle East (UTC+3)
    { key: "Europe/Moscow", text: `(UTC+3:00) ${a("moscow", e)}` },
    { key: "Asia/Baghdad", text: `(UTC+3:00) ${a("baghdad", e)}` },
    { key: "Asia/Kuwait", text: `(UTC+3:00) ${a("kuwait", e)}` },
    { key: "Asia/Riyadh", text: `(UTC+3:00) ${a("riyadh", e)}` },
    { key: "Asia/Bahrain", text: `(UTC+3:00) ${a("bahrain", e)}` },
    { key: "Africa/Nairobi", text: `(UTC+3:00) ${a("nairobi", e)}` },
    // Middle East (UTC+3:30 to UTC+4)
    { key: "Asia/Tehran", text: `(UTC+3:30) ${a("tehran", e)}` },
    { key: "Asia/Dubai", text: `(UTC+4:00) ${a("dubai", e)}` },
    { key: "Asia/Muscat", text: `(UTC+4:00) ${a("muscat", e)}` },
    { key: "Asia/Baku", text: `(UTC+4:00) ${a("baku", e)}` },
    // Central Asia (UTC+4:30 to UTC+5)
    { key: "Asia/Kabul", text: `(UTC+4:30) ${a("kabul", e)}` },
    { key: "Asia/Karachi", text: `(UTC+5:00) ${a("karachi", e)}` },
    { key: "Asia/Tashkent", text: `(UTC+5:00) ${a("tashkent", e)}` },
    { key: "Asia/Ashkhabad", text: `(UTC+5:00) ${a("ashkhabad", e)}` },
    // South Asia (UTC+5:30 to UTC+6)
    { key: "Asia/Kolkata", text: `(UTC+5:30) ${a("kolkata", e)}` },
    { key: "Asia/Mumbai", text: `(UTC+5:30) ${a("mumbai", e)}` },
    { key: "Asia/Colombo", text: `(UTC+5:30) ${a("colombo", e)}` },
    { key: "Asia/Kathmandu", text: `(UTC+5:45) ${a("kathmandu", e)}` },
    { key: "Asia/Dhaka", text: `(UTC+6:00) ${a("dhaka", e)}` },
    { key: "Asia/Almaty", text: `(UTC+6:00) ${a("almaty", e)}` },
    // Southeast Asia (UTC+6:30 to UTC+7)
    { key: "Asia/Yangon", text: `(UTC+6:30) ${a("yangon", e)}` },
    { key: "Asia/Bangkok", text: `(UTC+7:00) ${a("bangkok", e)}` },
    { key: "Asia/Jakarta", text: `(UTC+7:00) ${a("jakarta", e)}` },
    { key: "Asia/Ho_Chi_Minh", text: `(UTC+7:00) ${a("ho_chi_minh", e)}` },
    // East Asia (UTC+8)
    { key: "Asia/Shanghai", text: `(UTC+8:00) ${a("shanghai", e)}` },
    { key: "Asia/Hong_Kong", text: `(UTC+8:00) ${a("hong_kong", e)}` },
    { key: "Asia/Singapore", text: `(UTC+8:00) ${a("singapore", e)}` },
    { key: "Asia/Taipei", text: `(UTC+8:00) ${a("taipei", e)}` },
    { key: "Asia/Manila", text: `(UTC+8:00) ${a("manila", e)}` },
    { key: "Asia/Kuala_Lumpur", text: `(UTC+8:00) ${a("kuala_lumpur", e)}` },
    { key: "Australia/Perth", text: `(UTC+8:00) ${a("perth", e)}` },
    // East Asia (UTC+9)
    { key: "Asia/Tokyo", text: `(UTC+9:00) ${a("tokyo", e)}` },
    { key: "Asia/Seoul", text: `(UTC+9:00) ${a("seoul", e)}` },
    { key: "Asia/Pyongyang", text: `(UTC+9:00) ${a("pyongyang", e)}` },
    // Australia (UTC+9:30 to UTC+10)
    { key: "Australia/Adelaide", text: `(UTC+9:30) ${a("adelaide", e)}` },
    { key: "Australia/Darwin", text: `(UTC+9:30) ${a("darwin", e)}` },
    { key: "Australia/Brisbane", text: `(UTC+10:00) ${a("brisbane", e)}` },
    { key: "Australia/Sydney", text: `(UTC+10:00) ${a("sydney", e)}` },
    { key: "Australia/Melbourne", text: `(UTC+10:00) ${a("melbourne", e)}` },
    { key: "Pacific/Guam", text: `(UTC+10:00) ${a("guam", e)}` },
    // Pacific (UTC+10 to UTC+13)
    { key: "Pacific/Port_Moresby", text: `(UTC+10:00) ${a("port_moresby", e)}` },
    { key: "Pacific/Norfolk", text: `(UTC+11:00) ${a("norfolk", e)}` },
    { key: "Pacific/Guadalcanal", text: `(UTC+11:00) ${a("guadalcanal", e)}` },
    { key: "Pacific/Auckland", text: `(UTC+12:00) ${a("auckland", e)}` },
    { key: "Pacific/Fiji", text: `(UTC+12:00) ${a("fiji", e)}` },
    { key: "Pacific/Tongatapu", text: `(UTC+13:00) ${a("tongatapu", e)}` },
    { key: "Pacific/Apia", text: `(UTC+13:00) ${a("apia", e)}` }
  ];
}
const ph = (e) => {
  const [t, r] = S(e.timezone), n = q(() => mh(e.locale));
  return L(be, {
    get title() {
      return a("timezone", e.locale);
    },
    width: 320,
    get buttons() {
      return [{
        children: a("confirm", e.locale),
        onClick: () => {
          e.onConfirm(t()), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      return L(m5, {
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
          return a("Search Timezone", e.locale) || "Search timezone...";
        }
      });
    }
  });
};
function D9(e) {
  return [
    {
      key: "candle.type",
      text: a("candle_type", e),
      component: "select",
      dataSource: [
        { key: "candle_solid", text: a("candle_solid", e) },
        { key: "candle_stroke", text: a("candle_stroke", e) },
        { key: "candle_up_stroke", text: a("candle_up_stroke", e) },
        { key: "candle_down_stroke", text: a("candle_down_stroke", e) },
        { key: "ohlc", text: a("ohlc", e) },
        { key: "area", text: a("area", e) }
      ]
    },
    {
      key: "candle.priceMark.last.show",
      text: a("last_price_show", e),
      component: "switch"
    },
    {
      key: "candle.priceMark.high.show",
      text: a("high_price_show", e),
      component: "switch"
    },
    {
      key: "candle.priceMark.low.show",
      text: a("low_price_show", e),
      component: "switch"
    },
    {
      key: "indicator.lastValueMark.show",
      text: a("indicator_last_value_show", e),
      component: "switch"
    },
    {
      key: "yAxis.type",
      text: a("price_axis_type", e),
      component: "select",
      dataSource: [
        { key: "normal", text: a("normal", e) },
        { key: "percentage", text: a("percentage", e) },
        { key: "log", text: a("log", e) }
      ]
    },
    {
      key: "yAxis.reverse",
      text: a("reverse_coordinate", e),
      component: "switch"
    },
    {
      key: "grid.show",
      text: a("grid_show", e),
      component: "switch"
    }
  ];
}
const vh = /* @__PURE__ */ b('<div class="klinecharts-pro-setting-modal-content"></div>'), bh = /* @__PURE__ */ b('<div class="setting-item"><span class="setting-label"></span><div class="setting-control"></div></div>'), $h = (e) => {
  const [t, r] = S(e.currentStyles), [n, o] = S(D9(e.locale)), [l, u] = S(!1), c = () => {
    u(window.innerWidth <= 768);
  };
  Gt(() => {
    c(), window.addEventListener("resize", c);
  }), me(() => {
    window.removeEventListener("resize", c);
  }), D1(() => {
    o(D9(e.locale));
  });
  const C = ($, y) => {
    const x = {};
    Qt(x, $.key, y);
    const A = l1.clone(t());
    Qt(A, $.key, y), r(A), o(n().map((P) => ({
      ...P
    }))), e.onChange(x);
  };
  return L(be, {
    get title() {
      return a("setting", e.locale);
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
        children: a("restore_default", e.locale),
        onClick: () => {
          e.onRestoreDefault(n()), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      const $ = vh.cloneNode(!0);
      return k($, L(jt, {
        get each() {
          return n();
        },
        children: (y) => {
          let x;
          const A = l1.formatValue(t(), y.key);
          switch (y.component) {
            case "select": {
              x = L(m5, {
                get style() {
                  return {
                    width: l() ? "100%" : "120px",
                    "min-width": l() ? "auto" : "120px"
                  };
                },
                get value() {
                  return a(A, e.locale);
                },
                get dataSource() {
                  return y.dataSource;
                },
                onSelected: (P) => {
                  const I = P.key;
                  C(y, I);
                }
              });
              break;
            }
            case "switch": {
              const P = !!A;
              x = L(as, {
                open: P,
                onChange: () => {
                  C(y, !P);
                }
              });
              break;
            }
          }
          return (() => {
            const P = bh.cloneNode(!0), I = P.firstChild, j = I.nextSibling;
            return k(I, () => y.text), k(j, x), N(() => P.classList.toggle("mobile-item", !!l())), P;
          })();
        }
      })), N(() => $.classList.toggle("mobile-layout", !!l())), $;
    }
  });
}, _h = /* @__PURE__ */ b('<img style="width:500px;margin-top: 20px">'), kh = (e) => L(be, {
  get title() {
    return a("screenshot", e.locale);
  },
  width: 540,
  get buttons() {
    return [{
      type: "confirm",
      children: a("save", e.locale),
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
    const t = _h.cloneNode(!0);
    return N(() => k1(t, "src", e.url)), t;
  }
}), Lh = {
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
}, xh = /* @__PURE__ */ b('<div class="klinecharts-pro-indicator-setting-modal-content"></div>'), Ah = /* @__PURE__ */ b("<span></span>"), wh = (e) => {
  const [t, r] = S(l1.clone(e.params.calcParams)), n = (o) => Lh[o];
  return L(be, {
    get title() {
      return e.params.indicatorName;
    },
    width: 360,
    get buttons() {
      return [{
        type: "confirm",
        children: a("confirm", e.locale),
        onClick: () => {
          const o = n(e.params.indicatorName), l = [];
          l1.clone(t()).forEach((u, c) => {
            !l1.isValid(u) || u === "" ? "default" in o[c] && l.push(o[c].default) : l.push(u);
          }), e.onConfirm(l), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      const o = xh.cloneNode(!0);
      return k(o, () => n(e.params.indicatorName).map((l, u) => [(() => {
        const c = Ah.cloneNode(!0);
        return k(c, () => a(l.paramNameKey, e.locale)), c;
      })(), L(p5, {
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
          const C = l1.clone(t());
          C[u] = c, r(C);
        }
      })])), o;
    }
  });
}, Mh = /* @__PURE__ */ b('<svg viewBox="0 0 1024 1024"><path d="M945.066667 898.133333l-189.866667-189.866666c55.466667-64 87.466667-149.333333 87.466667-241.066667 0-204.8-168.533333-373.333333-373.333334-373.333333S96 264.533333 96 469.333333 264.533333 842.666667 469.333333 842.666667c91.733333 0 174.933333-34.133333 241.066667-87.466667l189.866667 189.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c8.533333-12.8 8.533333-34.133333-2.133333-46.933334zM469.333333 778.666667C298.666667 778.666667 160 640 160 469.333333S298.666667 160 469.333333 160 778.666667 298.666667 778.666667 469.333333 640 778.666667 469.333333 778.666667z"></path></svg>'), Sh = /* @__PURE__ */ b('<img alt="symbol">'), Th = /* @__PURE__ */ b("<li><div><span></span></div></li>"), Ph = (e) => {
  const [t, r] = S(""), [n] = Y5(t, e.datafeed.searchSymbols.bind(e.datafeed));
  return L(be, {
    get title() {
      return a("symbol_search", e.locale);
    },
    width: 460,
    get onClose() {
      return e.onClose;
    },
    get children() {
      return [L(p5, {
        class: "klinecharts-pro-symbol-search-modal-input",
        get placeholder() {
          return a("symbol_code", e.locale);
        },
        get suffix() {
          return Mh.cloneNode(!0);
        },
        get value() {
          return t();
        },
        onChange: (o) => {
          const l = `${o}`;
          r(l);
        }
      }), L(gt, {
        class: "klinecharts-pro-symbol-search-modal-list",
        get loading() {
          return n.loading;
        },
        get dataSource() {
          return n() ?? [];
        },
        renderItem: (o) => (() => {
          const l = Th.cloneNode(!0), u = l.firstChild, c = u.firstChild;
          return l.$$click = () => {
            e.onSymbolSelected(o), e.onClose();
          }, k(u, L(Z, {
            get when() {
              return o.logo;
            },
            get children() {
              const C = Sh.cloneNode(!0);
              return N(() => k1(C, "src", o.logo)), C;
            }
          }), c), k(c, () => o.shortName ?? o.ticker, null), k(c, () => `${o.name ? `(${o.name})` : ""}`, null), k(l, () => o.exchange ?? "", null), N(() => k1(c, "title", o.name ?? "")), l;
        })()
      })];
    }
  });
};
F1(["click"]);
const Oh = /* @__PURE__ */ b('<div class="klinecharts-pro-mobile-more-modal-content"><div class="item"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div><div class="item"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path></svg><span></span></div><div class="item"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg><span></span></div></div>'), Dh = (e) => L(be, {
  get title() {
    return a("more", e.locale);
  },
  isMobile: !0,
  get onClose() {
    return e.onClose;
  },
  get children() {
    const t = Oh.cloneNode(!0), r = t.firstChild, n = r.firstChild, o = n.nextSibling, l = r.nextSibling, u = l.firstChild, c = u.nextSibling, C = l.nextSibling, $ = C.firstChild, y = $.nextSibling;
    return r.$$click = () => {
      e.onIndicatorClick(), e.onClose();
    }, k(o, () => a("indicator", e.locale)), l.$$click = () => {
      e.onTimezoneClick(), e.onClose();
    }, k(c, () => a("timezone", e.locale)), C.$$click = () => {
      e.onSettingClick(), e.onClose();
    }, k(y, () => a("setting", e.locale)), t;
  }
});
F1(["click"]);
const Ih = /* @__PURE__ */ b('<i class="icon-close klinecharts-pro-load-icon"></i>'), Nh = /* @__PURE__ */ b('<div class="klinecharts-pro-content"><div class="klinecharts-pro-widget"></div></div>'), Eh = /* @__PURE__ */ b('<div class="overlay-toolbar-color-popover"><div class="overlay-toolbar-color-grid"></div><div class="overlay-toolbar-color-footer"><button type="button" class="overlay-toolbar-add-color">+</button><div class="overlay-toolbar-color-slider"><span></span></div></div></div>'), Bh = /* @__PURE__ */ b('<div class="overlay-toolbar-dropdown width-menu"></div>'), Uh = /* @__PURE__ */ b('<div class="overlay-toolbar-dropdown style-menu"><button type="button"><span class="overlay-toolbar-style-sample solid"></span></button><button type="button"><span class="overlay-toolbar-style-sample dashed"></span></button><button type="button"><span class="overlay-toolbar-style-sample dotted"></span></button></div>'), Fh = /* @__PURE__ */ b('<div class="klinecharts-pro-overlay-toolbar"><button type="button" class="overlay-toolbar-icon drag" title="Move"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="6" r="1.5"></circle><circle cx="15" cy="6" r="1.5"></circle><circle cx="9" cy="12" r="1.5"></circle><circle cx="15" cy="12" r="1.5"></circle><circle cx="9" cy="18" r="1.5"></circle><circle cx="15" cy="18" r="1.5"></circle></svg></button><button type="button" class="overlay-toolbar-icon refresh" title="Reset"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 15.4-6.36L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-15.4 6.36L3 16"></path><path d="M3 21v-5h5"></path></svg></button><div class="overlay-toolbar-picker"><button type="button" title="Color"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg></button></div><div class="overlay-toolbar-picker"><button type="button" title="Line width"><span class="overlay-toolbar-line-preview"></span><span>px</span></button></div><div class="overlay-toolbar-picker"><button type="button" title="Line style"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16"></path></svg></button></div><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2"></rect><path d="M20 4 4 20"></path></svg></button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg></button><button type="button" class="overlay-toolbar-icon delete" title="Delete"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6 18 20H6L5 6"></path><path d="M10 11v5"></path><path d="M14 11v5"></path></svg></button></div>'), Kh = /* @__PURE__ */ b('<button type="button"></button>'), jh = /* @__PURE__ */ b('<button type="button"><span class="overlay-toolbar-width-sample"></span></button>'), zh = /* @__PURE__ */ b('<div class="klinecharts-pro-quick-order-marker"><button type="button" class="klinecharts-pro-quick-order-plus">+</button></div>'), Qh = /* @__PURE__ */ b('<div class="klinecharts-pro-quick-order-menu-anchor"><div class="klinecharts-pro-quick-order-menu"><button type="button">Trade <!> @ <!> Limit</button><button type="button">Trade <!> @ <!> Stop</button><button type="button">Create new order...</button><button type="button">Copy Price (<!>)</button><button type="button">Draw horizontal line on </button></div></div>');
function at(e, t, r, n) {
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
      defaultStyles: u
    }) => {
      const c = [];
      return l.visible ? (c.push(u.tooltip.icons[1]), c.push(u.tooltip.icons[2]), c.push(u.tooltip.icons[3])) : (c.push(u.tooltip.icons[0]), c.push(u.tooltip.icons[2]), c.push(u.tooltip.icons[3])), {
        icons: c
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
const Zh = (e) => {
  var k0, L0, x0, A0, w0, M0, S0, T0, P0, O0, D0, I0, N0, E0, B0, U0, F0, K0, j0, z0, Q0, Z0, R0, V0;
  let t, r = null, n;
  const [o, l] = S(!1), [u, c] = S(e.theme), [C, $] = S(e.styles), [y, x] = S(e.locale), [A, P] = S(e.symbol), [I, j] = S(e.period), [R, F] = S(!1), [V, E] = S([...e.mainIndicators]), [B, G] = S({}), [I1, m1] = S(!1), [S1, z] = S({
    key: e.timezone,
    text: O9(e.timezone, e.locale)
  }), [i1, J] = S(!1), [T1, K1] = S(), [te, Z1] = S(""), [Q, Y] = S(e.drawingBarVisible), [P1, L1] = S(!1), [D, o1] = S(!1), [g, e1] = S(!1), c1 = ((k0 = e.orderTools) == null ? void 0 : k0.quickOrder) ?? !0, [C1, W] = S({
    quickOrder: c1,
    quickOrderFloatingWindow: ((L0 = e.orderTools) == null ? void 0 : L0.quickOrderFloatingWindow) ?? c1,
    quickOrderPlusButton: ((x0 = e.orderTools) == null ? void 0 : x0.quickOrderPlusButton) ?? c1,
    openOrders: ((A0 = e.orderTools) == null ? void 0 : A0.openOrders) ?? !0,
    positions: ((w0 = e.orderTools) == null ? void 0 : w0.positions) ?? !0,
    breakevenPrice: ((M0 = e.orderTools) == null ? void 0 : M0.breakevenPrice) ?? !0,
    liquidationPrice: ((S0 = e.orderTools) == null ? void 0 : S0.liquidationPrice) ?? !0,
    priceLine: ((T0 = e.orderTools) == null ? void 0 : T0.priceLine) ?? !0,
    marketPriceLine: ((P0 = e.orderTools) == null ? void 0 : P0.marketPriceLine) ?? !0,
    countDown: ((O0 = e.orderTools) == null ? void 0 : O0.countDown) ?? !0,
    bidAskPrice: ((D0 = e.orderTools) == null ? void 0 : D0.bidAskPrice) ?? !0,
    orderHistory: ((I0 = e.orderTools) == null ? void 0 : I0.orderHistory) ?? !0
  }), [b1, A1] = S(null), [se, j1] = S(!1), [Ne, N1] = S(!1), [Ee, xt] = S(64), [le, ce] = S(null), At = 6, [w1, M1] = S(null), [z1, O1] = S(null), wt = ["#000000", "#2b3342", "#3f4653", "#565d69", "#6f7580", "#8a9099", "#a7acb3", "#c4c8ce", "#ffffff", "#ff4d67", "#ffa629", "#f7ed4a", "#2fc58d", "#4ab09c", "#52c4d3", "#3157f6", "#6a36b8", "#a644b9", "#d83972", "#f2a3a6", "#f5c879", "#f7ee97", "#a6d29f", "#7fc9b9", "#91d7df", "#8fb2ee", "#b09ad2", "#c89ccf", "#d987ab", "#e8757a", "#efb34f", "#efe36e", "#86c17d", "#66b7a8", "#68c4d0", "#5f91e4", "#8059c9", "#aa62c2", "#d34d83", "#b9353d", "#ea8527", "#e8c245", "#4b8c43", "#2f6f60", "#47919b", "#2646c6", "#56309c", "#892f95", "#a82563", "#8e2528", "#de5c1f", "#dc8527", "#255a22", "#164b34", "#225b63", "#15309b", "#442180", "#6b1f74", "#86154e"];
  let $e = null;
  const [Be, Ue] = S({
    visible: !1,
    indicatorName: "",
    paneId: "",
    calcParams: []
  });
  let d1 = /* @__PURE__ */ new Map(), p1 = /* @__PURE__ */ new Map();
  const Mt = (i, s, d) => {
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
          const m = Mt(i, s, d);
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
  }, ue = (i) => ({
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
  })[i] || 1, H1 = (i, s = /* @__PURE__ */ new WeakSet()) => {
    if (i == null)
      return i;
    if (s.has(i))
      return "[Circular]";
    if (typeof i != "object")
      return i;
    if (s.add(i), Array.isArray(i))
      return i.map((h) => H1(h, s));
    const d = {};
    for (const h in i)
      if (!(h === "__proto__" || h === "constructor" || h === "prototype"))
        try {
          const m = i[h];
          if (typeof m == "function")
            continue;
          d[h] = H1(m, s);
        } catch (m) {
          d[h] = `[Error: ${m.message}]`;
        }
    return d;
  }, St = (i) => {
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
        extendData: H1(i.extendData || {}),
        styles: H1(i.styles || {}),
        visible: i.visible ?? !0,
        lock: i.lock ?? !1,
        mode: i.mode || It.Normal
      };
    } catch (s) {
      return console.error("Error extracting overlay data:", s), null;
    }
  }, re = (i) => {
    var s, d, h;
    try {
      const m = (s = r == null ? void 0 : r.getOverlayById) == null ? void 0 : s.call(r, i);
      if (!m)
        return;
      const v = St(m);
      if (v) {
        const f = d1.get(i), p = ((d = f == null ? void 0 : f.points) == null ? void 0 : d.length) || 0, w = ((h = v.points) == null ? void 0 : h.length) || 0;
        d1.set(i, v);
        const T = ue(v.type);
        if (w >= T) {
          const O = p1.get(i);
          O && !O.complete && (O.complete = !0, O.checkInterval && (clearInterval(O.checkInterval), O.checkInterval = void 0));
        }
      }
    } catch (m) {
      console.error(`Error updating overlay tracking for ${i}:`, m);
    }
  }, Fe = (i, s) => {
    if (p1.has(i))
      return;
    const d = {
      monitoring: !0,
      complete: !1,
      lastPointCount: 0
    };
    p1.set(i, d), re(i);
    const h = () => {
      re(i);
    };
    document.addEventListener("mouseup", h), document.addEventListener("touchend", h), setTimeout(() => {
      var v;
      const m = p1.get(i);
      if (m && !m.complete) {
        m.checkInterval && clearInterval(m.checkInterval), m.mouseUpHandler && (document.removeEventListener("mouseup", m.mouseUpHandler), document.removeEventListener("touchend", m.mouseUpHandler)), re(i);
        const f = d1.get(i);
        if (f) {
          const p = ue(f.type), w = ((v = f.points) == null ? void 0 : v.length) || 0;
          w < p && console.warn(`âš ï¸ ${f.type} ${i} has only ${w} point(s), should have ${p}`);
        }
      }
    }, 3e4);
  };
  let Q1 = {
    saveDrawings: (i, s) => {
      try {
        const d = `kline_drawings_${i}`, m = {
          drawings: s.map((v) => {
            var T;
            const f = {
              ...v
            };
            f.extendData && (f.extendData = H1(f.extendData)), f.styles && (f.styles = H1(f.styles));
            const p = ue(v.type), w = ((T = v.points) == null ? void 0 : T.length) || 0;
            return w < p && console.warn(`âš ï¸ Saving ${v.type} with only ${w} point(s), needs ${p}`), f;
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
          return Array.isArray(h.drawings) && h.drawings.forEach((v) => {
            var w;
            const f = ue(v.type);
            (((w = v.points) == null ? void 0 : w.length) || 0) >= f && m.push(v);
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
  const Ke = () => {
    const i = A();
    if (i != null && i.ticker) {
      const s = Array.from(d1.values());
      Q1.saveDrawings(i.ticker, s);
    }
  }, je = (i) => {
    if (!i || !r)
      return;
    d1.forEach((d, h) => {
      var m;
      (m = r == null ? void 0 : r.removeOverlay) == null || m.call(r, {
        id: h
      });
    }), d1.clear(), p1.clear(), M1(null), O1(null), Q1.loadDrawings(i).forEach((d) => {
      var h;
      try {
        const m = de({
          name: d.type,
          points: d.points || [],
          extendData: d.extendData,
          styles: d.styles,
          visible: d.visible ?? !0,
          lock: d.lock ?? !1,
          mode: d.mode || It.Normal
        }), v = r == null ? void 0 : r.createOverlay(m), f = typeof v == "string" ? v : null;
        f && (d1.set(f, {
          ...d,
          id: f
        }), p1.set(f, {
          monitoring: !1,
          complete: !0,
          lastPointCount: ((h = d.points) == null ? void 0 : h.length) || 0
        }));
      } catch (m) {
        console.error("Library: Error restoring drawing:", m);
      }
    });
  }, _e = (i) => {
    var d, h;
    const s = {
      ...C1(),
      ...i
    };
    if ("quickOrder" in i) {
      const m = i.quickOrder ?? !1;
      s.quickOrderFloatingWindow = m, s.quickOrderPlusButton = m;
    } else
      ("quickOrderFloatingWindow" in i || "quickOrderPlusButton" in i) && (s.quickOrder = s.quickOrderFloatingWindow || s.quickOrderPlusButton);
    W(s), (h = (d = e.orderTools) == null ? void 0 : d.onChange) == null || h.call(d, s);
  }, ke = (i) => {
    var d;
    const s = Math.min(Math.max(((d = A()) == null ? void 0 : d.pricePrecision) ?? 2, 0), 8);
    return i.toLocaleString(void 0, {
      minimumFractionDigits: s,
      maximumFractionDigits: s
    });
  }, Xe = (i) => {
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
      }), v = Number((d = m == null ? void 0 : m[0]) == null ? void 0 : d.value);
      if (Number.isFinite(v) && v > 0)
        return v;
    } catch {
    }
    try {
      const m = r == null ? void 0 : r.convertFromPixel([{
        x: (i == null ? void 0 : i.x) ?? 0,
        y: s
      }], {
        paneId: "candle_pane",
        absolute: !0
      }), v = Number((h = m == null ? void 0 : m[0]) == null ? void 0 : h.value);
      if (Number.isFinite(v) && v > 0)
        return v;
    } catch {
    }
    return NaN;
  }, Je = (i) => {
    var v;
    if (!C1().quickOrderPlusButton || (i == null ? void 0 : i.paneId) !== "candle_pane" || !t) {
      if (Ne() || se())
        return;
      A1(null), j1(!1);
      return;
    }
    const s = (v = r == null ? void 0 : r.getSize) == null ? void 0 : v.call(r, "candle_pane", Nt.YAxis);
    s != null && s.width && Number.isFinite(s.width) && xt(Math.max(44, Math.ceil(s.width)));
    const d = Number(i.y), h = Xe(i), m = t.clientHeight;
    if (!Number.isFinite(d) || !Number.isFinite(h) || h <= 0 || d < 0 || d > m) {
      if (Ne() || se())
        return;
      A1(null), j1(!1);
      return;
    }
    $e = {
      ...i
    }, A1({
      y: d,
      price: h
    });
  }, q1 = () => {
    var i;
    if ($e)
      try {
        (i = r == null ? void 0 : r.executeAction) == null || i.call(r, rt.OnCrosshairChange, $e);
      } catch {
      }
  }, Le = (i) => {
    var d, h;
    const s = le() ?? b1();
    s && ((h = (d = e.orderTools) == null ? void 0 : d.onQuickOrderAction) == null || h.call(d, {
      action: i,
      price: s.price,
      symbol: A()
    }), j1(!1), ce(null), N1(!1));
  }, Tt = async () => {
    var s;
    const i = le() ?? b1();
    if (i) {
      try {
        await ((s = navigator.clipboard) == null ? void 0 : s.writeText(String(i.price)));
      } catch {
      }
      j1(!1), ce(null), N1(!1);
    }
  }, et = () => {
    const i = le() ?? b1();
    i && (r == null || r.createOverlay(de({
      name: "horizontalStraightLine",
      points: [{
        value: i.price
      }],
      lock: !1
    })), j1(!1), ce(null), N1(!1));
  }, Pt = (i) => {
    var p, w, T, O, H, U;
    const s = (w = (p = t == null ? void 0 : t.parentElement) == null ? void 0 : p.getBoundingClientRect) == null ? void 0 : w.call(p), d = (T = t == null ? void 0 : t.getBoundingClientRect) == null ? void 0 : T.call(t), h = i == null ? void 0 : i.overlay, m = (O = h == null ? void 0 : h.points) == null ? void 0 : O[0];
    let v = 72, f = 40;
    if (s) {
      if (Number.isFinite(i == null ? void 0 : i.pageX) ? v = i.pageX - s.left : Number.isFinite(i == null ? void 0 : i.x) && d && (v = d.left - s.left + i.x), Number.isFinite(i == null ? void 0 : i.pageY))
        f = i.pageY - s.top;
      else if (Number.isFinite(i == null ? void 0 : i.y) && d)
        f = d.top - s.top + i.y;
      else if (Number.isFinite(m == null ? void 0 : m.value))
        try {
          const r1 = (H = r == null ? void 0 : r.convertToPixel) == null ? void 0 : H.call(r, [{
            value: m.value
          }], {
            paneId: "candle_pane",
            absolute: !0
          }), u1 = Number((U = r1 == null ? void 0 : r1[0]) == null ? void 0 : U.y);
          Number.isFinite(u1) && (f = u1 - s.top);
        } catch {
        }
    }
    return {
      x: Math.max(12, Math.min(v - 28, ((s == null ? void 0 : s.width) ?? 360) - 320)),
      y: Math.max(8, f - 52)
    };
  }, ze = (i) => {
    var p, w, T, O, H, U, r1, u1;
    const s = i == null ? void 0 : i.overlay;
    if (!(s != null && s.id) || s.name !== "horizontalStraightLine")
      return !1;
    const d = Pt(i), h = Number((w = (p = s.styles) == null ? void 0 : p.line) == null ? void 0 : w.size) || 3, m = ((O = (T = s.styles) == null ? void 0 : T.line) == null ? void 0 : O.style) ?? W1.Solid, v = Array.isArray((U = (H = s.styles) == null ? void 0 : H.line) == null ? void 0 : U.dashedValue) ? s.styles.line.dashedValue : [], f = ((u1 = (r1 = s.styles) == null ? void 0 : r1.line) == null ? void 0 : u1.color) ?? "#2f6df6";
    return M1({
      id: s.id,
      x: d.x,
      y: d.y,
      lineSize: h,
      lineStyle: m,
      dashedValue: v,
      color: f,
      locked: s.lock ?? !1,
      visible: s.visible ?? !0
    }), !1;
  }, Qe = (i) => {
    var d, h;
    const s = (d = i == null ? void 0 : i.overlay) == null ? void 0 : d.id;
    return (!s || ((h = w1()) == null ? void 0 : h.id) === s) && (M1(null), O1(null)), !1;
  }, de = (i) => {
    var f, p, w, T, O, H, U, r1, u1;
    if (i.name !== "horizontalStraightLine")
      return i;
    const s = i.onClick, d = i.onSelected, h = i.onDeselected, m = i.onRemoved, v = i.onPressedMoveEnd;
    return {
      ...i,
      styles: {
        ...i.styles,
        line: {
          ...(f = i.styles) == null ? void 0 : f.line,
          size: Number((w = (p = i.styles) == null ? void 0 : p.line) == null ? void 0 : w.size) || 3,
          style: ((O = (T = i.styles) == null ? void 0 : T.line) == null ? void 0 : O.style) ?? W1.Solid,
          dashedValue: ((U = (H = i.styles) == null ? void 0 : H.line) == null ? void 0 : U.dashedValue) ?? [6, 4],
          color: ((u1 = (r1 = i.styles) == null ? void 0 : r1.line) == null ? void 0 : u1.color) ?? "#2f6df6"
        }
      },
      onClick: (X) => (ze(X), (s == null ? void 0 : s(X)) ?? !1),
      onSelected: (X) => (ze(X), (d == null ? void 0 : d(X)) ?? !1),
      onPressedMoveEnd: (X) => (ze(X), (v == null ? void 0 : v(X)) ?? !1),
      onDeselected: (X) => (Qe(X), (h == null ? void 0 : h(X)) ?? !1),
      onRemoved: (X) => (Qe(X), (m == null ? void 0 : m(X)) ?? !1)
    };
  }, Ot = () => {
    var s;
    const i = w1();
    i && ((s = r == null ? void 0 : r.removeOverlay) == null || s.call(r, {
      id: i.id
    }), M1(null), O1(null));
  }, Y1 = (i) => {
    var d;
    const s = w1();
    s && ((d = r == null ? void 0 : r.overrideOverlay) == null || d.call(r, {
      id: s.id,
      ...i
    }), setTimeout(() => {
      re(s.id), Ke();
    }, 0));
  }, _ = () => {
    const i = w1();
    if (!i)
      return;
    const s = !i.locked;
    Y1({
      lock: s
    }), M1({
      ...i,
      locked: s
    });
  }, M = () => {
    const i = w1();
    if (!i)
      return;
    const s = !i.visible;
    Y1({
      visible: s
    }), M1({
      ...i,
      visible: s
    });
  }, R1 = (i) => {
    const s = w1();
    s && (Y1({
      styles: {
        line: {
          size: i
        }
      }
    }), M1({
      ...s,
      lineSize: i
    }), O1(null));
  }, B1 = (i, s) => {
    const d = w1();
    d && (Y1({
      styles: {
        line: {
          style: i,
          dashedValue: s
        }
      }
    }), M1({
      ...d,
      lineStyle: i,
      dashedValue: s
    }), O1(null));
  }, he = () => {
    const i = w1();
    if (!i)
      return;
    const s = 1, d = W1.Solid, h = [6, 4], m = "#2f6df6";
    Y1({
      styles: {
        line: {
          size: s,
          style: d,
          dashedValue: h,
          color: m
        }
      }
    }), M1({
      ...i,
      lineSize: s,
      lineStyle: d,
      dashedValue: h,
      color: m
    }), O1(null);
  }, fe = (i) => {
    const s = w1();
    s && (Y1({
      styles: {
        line: {
          color: i
        }
      }
    }), M1({
      ...s,
      color: i
    }));
  }, b5 = (i) => {
    var T, O;
    const s = w1();
    if (!s || !t)
      return;
    i.preventDefault(), i.stopPropagation(), O1(null);
    const d = (O = (T = t.parentElement) == null ? void 0 : T.getBoundingClientRect) == null ? void 0 : O.call(T);
    if (!d)
      return;
    const h = i.clientX, m = i.clientY, v = s.x, f = s.y, p = (H) => {
      H.preventDefault();
      const U = v + H.clientX - h, r1 = f + H.clientY - m;
      M1({
        ...s,
        x: Math.max(8, Math.min(U, d.width - 320)),
        y: Math.max(8, Math.min(r1, d.height - 48))
      });
    }, w = () => {
      document.removeEventListener("mousemove", p), document.removeEventListener("mouseup", w);
    };
    document.addEventListener("mousemove", p), document.addEventListener("mouseup", w);
  }, $5 = () => {
    j1(!1), ce(null), N1(!1);
  }, c0 = (i) => {
    var d, h;
    if (!se())
      return;
    const s = i.target;
    (d = s == null ? void 0 : s.closest) != null && d.call(s, ".klinecharts-pro-quick-order-marker") || (h = s == null ? void 0 : s.closest) != null && h.call(s, ".klinecharts-pro-quick-order-menu-anchor") || $5();
  };
  let u0 = (N0 = e.orderTools) == null ? void 0 : N0.quickOrder, d0 = (E0 = e.orderTools) == null ? void 0 : E0.quickOrderFloatingWindow, h0 = (B0 = e.orderTools) == null ? void 0 : B0.quickOrderPlusButton, f0 = (U0 = e.orderTools) == null ? void 0 : U0.openOrders, y0 = (F0 = e.orderTools) == null ? void 0 : F0.positions, C0 = (K0 = e.orderTools) == null ? void 0 : K0.breakevenPrice, g0 = (j0 = e.orderTools) == null ? void 0 : j0.liquidationPrice, m0 = (z0 = e.orderTools) == null ? void 0 : z0.priceLine, p0 = (Q0 = e.orderTools) == null ? void 0 : Q0.marketPriceLine, v0 = (Z0 = e.orderTools) == null ? void 0 : Z0.countDown, b0 = (R0 = e.orderTools) == null ? void 0 : R0.bidAskPrice, $0 = (V0 = e.orderTools) == null ? void 0 : V0.orderHistory;
  D1(() => {
    var r1, u1, X, x1, G1, K, h1, t1, g1, $1, ne, ie;
    const i = (r1 = e.orderTools) == null ? void 0 : r1.quickOrder, s = (u1 = e.orderTools) == null ? void 0 : u1.quickOrderFloatingWindow, d = (X = e.orderTools) == null ? void 0 : X.quickOrderPlusButton, h = (x1 = e.orderTools) == null ? void 0 : x1.openOrders, m = (G1 = e.orderTools) == null ? void 0 : G1.positions, v = (K = e.orderTools) == null ? void 0 : K.breakevenPrice, f = (h1 = e.orderTools) == null ? void 0 : h1.liquidationPrice, p = (t1 = e.orderTools) == null ? void 0 : t1.priceLine, w = (g1 = e.orderTools) == null ? void 0 : g1.marketPriceLine, T = ($1 = e.orderTools) == null ? void 0 : $1.countDown, O = (ne = e.orderTools) == null ? void 0 : ne.bidAskPrice, H = (ie = e.orderTools) == null ? void 0 : ie.orderHistory, U = {};
    typeof i == "boolean" && i !== u0 && (u0 = i, U.quickOrder = i, typeof s != "boolean" && (U.quickOrderFloatingWindow = i), typeof d != "boolean" && (U.quickOrderPlusButton = i)), typeof s == "boolean" && s !== d0 && (d0 = s, U.quickOrderFloatingWindow = s), typeof d == "boolean" && d !== h0 && (h0 = d, U.quickOrderPlusButton = d), typeof h == "boolean" && h !== f0 && (f0 = h, U.openOrders = h), typeof m == "boolean" && m !== y0 && (y0 = m, U.positions = m), typeof v == "boolean" && v !== C0 && (C0 = v, U.breakevenPrice = v), typeof f == "boolean" && f !== g0 && (g0 = f, U.liquidationPrice = f), typeof p == "boolean" && p !== m0 && (m0 = p, U.priceLine = p, typeof w != "boolean" && (U.marketPriceLine = p), typeof T != "boolean" && (U.countDown = p), typeof O != "boolean" && (U.bidAskPrice = p)), typeof w == "boolean" && w !== p0 && (p0 = w, U.marketPriceLine = w), typeof T == "boolean" && T !== v0 && (v0 = T, U.countDown = T), typeof O == "boolean" && O !== b0 && (b0 = O, U.bidAskPrice = O), typeof H == "boolean" && H !== $0 && ($0 = H, U.orderHistory = H), Object.keys(U).length > 0 && _e(U);
  }), e.ref({
    setTheme: c,
    getTheme: () => u(),
    setStyles: $,
    getStyles: () => r.getStyles(),
    setLocale: x,
    getLocale: () => y(),
    setTimezone: (i) => {
      z({
        key: i,
        text: O9(e.timezone, y())
      });
    },
    getTimezone: () => S1().key,
    setSymbol: P,
    getSymbol: () => A(),
    setPeriod: j,
    getPeriod: () => I(),
    getMainIndicators: () => V(),
    getSubIndicators: () => B(),
    setMainIndicators: E,
    setSubIndicators: G,
    overrideIndicator: (i, s) => {
      r == null || r.overrideIndicator(i, s);
    },
    createOverlay: (i) => {
      var d;
      const s = (d = r == null ? void 0 : r.createOverlay) == null ? void 0 : d.call(r, de(i));
      return typeof s == "string" ? s : null;
    },
    removeOverlay: (i) => {
      var s;
      if ((s = r == null ? void 0 : r.removeOverlay) == null || s.call(r, i), i.id) {
        d1.delete(i.id);
        const d = p1.get(i.id);
        d && (d.checkInterval && clearInterval(d.checkInterval), d.mouseUpHandler && (document.removeEventListener("mouseup", d.mouseUpHandler), document.removeEventListener("touchend", d.mouseUpHandler)), p1.delete(i.id)), Ke();
      }
    },
    removeAllOverlay: () => {
      d1.forEach((i, s) => {
        var h;
        (h = r == null ? void 0 : r.removeOverlay) == null || h.call(r, {
          id: s
        });
        const d = p1.get(s);
        d && (d.checkInterval && clearInterval(d.checkInterval), d.mouseUpHandler && (document.removeEventListener("mouseup", d.mouseUpHandler), document.removeEventListener("touchend", d.mouseUpHandler)));
      }), d1.clear(), p1.clear();
    },
    getAllOverlay: () => Array.from(d1.values()),
    getOverlay: (i) => d1.get(i) || null,
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
    setIndicatorModalVisible: F,
    setTimezoneModalVisible: m1,
    setSettingModalVisible: J,
    getOrderToolsState: () => C1(),
    setOrderToolsState: (i) => {
      _e(i);
    },
    dispose: () => {
      t && H0(t);
    },
    resize: () => {
      r && "resize" in r && typeof r.resize == "function" ? r.resize() : console.warn("resize method not available on widget");
    },
    getSettings: () => {
      var d, h, m, v, f, p, w, T, O, H, U, r1, u1, X, x1, G1;
      if (!r)
        return {};
      const i = r.getStyles(), s = (d = i.candle) == null ? void 0 : d.bar;
      return {
        // Candle settings
        candleType: (h = i.candle) == null ? void 0 : h.type,
        candleBarStyle: s == null ? void 0 : s.style,
        // bar.style might be LineType
        showLastPrice: (f = (v = (m = i.candle) == null ? void 0 : m.priceMark) == null ? void 0 : v.last) == null ? void 0 : f.show,
        showHighestPrice: (T = (w = (p = i.candle) == null ? void 0 : p.priceMark) == null ? void 0 : w.high) == null ? void 0 : T.show,
        showLowestPrice: (U = (H = (O = i.candle) == null ? void 0 : O.priceMark) == null ? void 0 : H.low) == null ? void 0 : U.show,
        // Indicator settings
        showIndicatorLastValue: (u1 = (r1 = i.indicator) == null ? void 0 : r1.lastValueMark) == null ? void 0 : u1.show,
        // Axis settings - yAxis.reverse is boolean according to YAxisStyle interface
        priceAxisType: (X = i.yAxis) == null ? void 0 : X.type,
        reverseCoordinate: (x1 = i.yAxis) == null ? void 0 : x1.reverse,
        // Grid settings
        showGrids: (G1 = i.grid) == null ? void 0 : G1.show,
        timestamp: Date.now()
      };
    },
    setSettings: (i) => {
      var d, h, m, v, f, p, w, T, O, H, U;
      if (!r)
        return;
      const s = {};
      if (i.candleType !== void 0 && (s.candle = {
        ...s.candle,
        type: i.candleType
      }), i.candleBarStyle !== void 0) {
        const r1 = ((d = s.candle) == null ? void 0 : d.bar) || {};
        s.candle = {
          ...s.candle,
          bar: {
            ...r1,
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
            ...(v = (m = s.candle) == null ? void 0 : m.priceMark) == null ? void 0 : v.last,
            show: i.showLastPrice
          }
        }
      }), i.showHighestPrice !== void 0 && (s.candle = {
        ...s.candle,
        priceMark: {
          ...(f = s.candle) == null ? void 0 : f.priceMark,
          high: {
            ...(w = (p = s.candle) == null ? void 0 : p.priceMark) == null ? void 0 : w.high,
            show: i.showHighestPrice
          }
        }
      }), i.showLowestPrice !== void 0 && (s.candle = {
        ...s.candle,
        priceMark: {
          ...(T = s.candle) == null ? void 0 : T.priceMark,
          low: {
            ...(H = (O = s.candle) == null ? void 0 : O.priceMark) == null ? void 0 : H.low,
            show: i.showLowestPrice
          }
        }
      }), i.showIndicatorLastValue !== void 0 && (s.indicator = {
        ...s.indicator,
        lastValueMark: {
          ...(U = s.indicator) == null ? void 0 : U.lastValueMark,
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
      var d, h, m, v, f, p, w;
      if (!r)
        return;
      r.getStyles();
      const i = {
        candle: {
          type: x5.CandleSolid,
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
          type: A5.Normal,
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
      }, s = T1();
      if (s) {
        const T = {
          candle: {
            type: (d = s.candle) == null ? void 0 : d.type,
            bar: (h = s.candle) == null ? void 0 : h.bar,
            priceMark: (m = s.candle) == null ? void 0 : m.priceMark
          },
          indicator: {
            lastValueMark: (v = s.indicator) == null ? void 0 : v.lastValueMark
          },
          yAxis: {
            type: (f = s.yAxis) == null ? void 0 : f.type,
            reverse: (p = s.yAxis) == null ? void 0 : p.reverse
          },
          grid: {
            show: (w = s.grid) == null ? void 0 : w.show
          }
        };
        r.setStyles(T);
      } else
        r.setStyles(i);
    },
    // === Drawing Methods ===
    saveDrawings: (i) => {
      const s = Array.from(d1.values());
      s.forEach((d, h) => {
        var f;
        const m = ue(d.type), v = ((f = d.points) == null ? void 0 : f.length) || 0;
        v < m && console.warn(`âš ï¸ ${d.type} ${d.id} has only ${v} point(s), should have ${m}`);
      }), Q1.saveDrawings(i, s);
    },
    loadDrawings: (i) => {
      Q1.loadDrawings(i).forEach((d, h) => {
        var m;
        try {
          const v = {
            name: d.type,
            points: d.points || [],
            extendData: d.extendData,
            styles: d.styles,
            visible: d.visible ?? !0,
            lock: d.lock ?? !1,
            mode: d.mode ?? It.Normal
          }, f = r == null ? void 0 : r.createOverlay(v), p = typeof f == "string" ? f : null;
          p && (d1.set(p, {
            ...d,
            id: p
          }), p1.set(p, {
            monitoring: !1,
            complete: !0,
            lastPointCount: ((m = d.points) == null ? void 0 : m.length) || 0
          }));
        } catch (v) {
          console.error(`   âŒ Error restoring ${d.type}:`, v);
        }
      });
    },
    getDrawings: (i) => Q1.loadDrawings(i),
    clearDrawings: (i) => {
      Q1.clearDrawings(i);
    },
    // Auto-save on overlay events
    enableAutoSave: (i, s = !0) => {
    }
  });
  const _0 = () => {
    r == null || r.resize();
  }, Dt = (i, s, d) => {
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
        const f = new Date(h).getDay(), p = f === 0 ? 6 : f - 1;
        h = h - p * 60 * 60 * 24;
        const w = new Date(h);
        h = (/* @__PURE__ */ new Date(`${w.getFullYear()}-${w.getMonth() + 1}-${w.getDate()}`)).getTime(), m = d * i.multiplier * 7 * 24 * 60 * 60 * 1e3;
        break;
      }
      case "month": {
        const v = new Date(h), f = v.getFullYear(), p = v.getMonth() + 1;
        h = (/* @__PURE__ */ new Date(`${f}-${p}-01`)).getTime(), m = d * i.multiplier * 30 * 24 * 60 * 60 * 1e3;
        const w = new Date(m);
        m = (/* @__PURE__ */ new Date(`${w.getFullYear()}-${w.getMonth() + 1}-01`)).getTime();
        break;
      }
      case "year": {
        const f = new Date(h).getFullYear();
        h = (/* @__PURE__ */ new Date(`${f}-01-01`)).getTime(), m = d * i.multiplier * 365 * 24 * 60 * 60 * 1e3;
        const p = new Date(m);
        m = (/* @__PURE__ */ new Date(`${p.getFullYear()}-01-01`)).getTime();
        break;
      }
    }
    return [m, h];
  };
  return Gt(() => {
    if (window.addEventListener("resize", _0), r = L5(t, {
      customApi: {
        formatDate: (f, p, w, T) => {
          switch (I().timespan) {
            case "minute":
              return T === tt.XAxis ? l1.formatDate(f, p, "HH:mm") : l1.formatDate(f, p, "YYYY-MM-DD HH:mm");
            case "hour":
              return T === tt.XAxis ? l1.formatDate(f, p, "MM-DD HH:mm") : l1.formatDate(f, p, "YYYY-MM-DD HH:mm");
            case "day":
            case "week":
              return l1.formatDate(f, p, "YYYY-MM-DD");
            case "month":
              return T === tt.XAxis ? l1.formatDate(f, p, "YYYY-MM") : l1.formatDate(f, p, "YYYY-MM-DD");
            case "year":
              return T === tt.XAxis ? l1.formatDate(f, p, "YYYY") : l1.formatDate(f, p, "YYYY-MM-DD");
          }
          return l1.formatDate(f, p, "YYYY-MM-DD HH:mm");
        }
      }
    }), r) {
      const f = r.getDom("candle_pane", Nt.Main);
      if (f) {
        let w = document.createElement("div");
        if (w.className = "klinecharts-pro-watermark", l1.isString(e.watermark)) {
          const T = e.watermark.replace(/(^\s*)|(\s*$)/g, "");
          w.innerHTML = T;
        } else
          w.appendChild(e.watermark);
        f.appendChild(w);
      }
      const p = r.getDom("candle_pane", Nt.YAxis);
      n = document.createElement("span"), n.className = "klinecharts-pro-price-unit", p == null || p.appendChild(n);
    }
    let i = !1;
    const s = () => {
      const f = A();
      if (f != null && f.ticker)
        try {
          const p = Array.from(d1.values());
          Q1.saveDrawings(f.ticker, p);
        } catch (p) {
          console.error("âŒ Error refreshing local storage:", p);
        }
    }, d = (f) => {
      i || (i = !0, f.preventDefault());
    };
    setTimeout(() => {
      t && t.addEventListener("contextmenu", d);
    }, 1e3), document.addEventListener("contextmenu", (f) => {
      t && t.contains(f.target) && d(f);
    });
    const h = r == null ? void 0 : r.removeOverlay;
    r && h && (r.removeOverlay = function(...f) {
      const p = h.apply(this, f), w = f[0];
      let T;
      if (typeof w == "string" ? T = w : w && typeof w == "object" && w.id && (T = w.id), T) {
        d1.delete(T);
        const O = p1.get(T);
        O && (O.checkInterval && clearInterval(O.checkInterval), O.mouseUpHandler && (document.removeEventListener("mouseup", O.mouseUpHandler), document.removeEventListener("touchend", O.mouseUpHandler)), p1.delete(T)), s();
      }
      return p;
    }), V().forEach((f) => {
      at(r, f, !0, {
        id: "candle_pane"
      });
    });
    const m = {};
    e.subIndicators.forEach((f) => {
      const p = at(r, f, !0);
      p && (m[f] = p);
    }), G(m), r == null || r.loadMore((f) => {
      l(!0), (async () => {
        try {
          const w = I(), [T] = Dt(w, f, 1), [O] = Dt(w, T, 500), H = await e.datafeed.getHistoryKLineData(A(), w, O, T);
          r == null || r.applyMoreData(H, H.length > 0);
        } finally {
          l(!1);
        }
      })();
    }), r == null || r.subscribeAction(rt.OnTooltipIconClick, (f) => {
      if (f.indicatorName)
        switch (f.iconId) {
          case "visible": {
            r == null || r.overrideIndicator({
              name: f.indicatorName,
              visible: !0
            }, f.paneId);
            const p = f.paneId === "candle_pane" ? "main" : "sub";
            E1(f.indicatorName, f.paneId, p, "change");
            break;
          }
          case "invisible": {
            r == null || r.overrideIndicator({
              name: f.indicatorName,
              visible: !1
            }, f.paneId);
            const p = f.paneId === "candle_pane" ? "main" : "sub";
            E1(f.indicatorName, f.paneId, p, "change");
            break;
          }
          case "setting": {
            const p = r == null ? void 0 : r.getIndicatorByPaneId(f.paneId, f.indicatorName);
            Ue({
              visible: !0,
              indicatorName: f.indicatorName,
              paneId: f.paneId,
              calcParams: p.calcParams
            });
            break;
          }
          case "close":
            if (f.paneId === "candle_pane") {
              const p = [...V()];
              r == null || r.removeIndicator("candle_pane", f.indicatorName), p.splice(p.indexOf(f.indicatorName), 1), E(p), E1(f.indicatorName, "candle_pane", "main", "remove");
            } else {
              const p = {
                ...B()
              };
              r == null || r.removeIndicator(f.paneId, f.indicatorName), delete p[f.indicatorName], G(p), E1(f.indicatorName, f.paneId, "sub", "remove");
            }
        }
    }), r == null || r.subscribeAction(rt.OnCrosshairChange, Je), document.addEventListener("mousedown", c0);
    const v = r == null ? void 0 : r.createOverlay;
    r && v && (r.createOverlay = function(...f) {
      const p = de(f[0]), w = v.apply(this, [p, ...f.slice(1)]), T = typeof w == "string" ? w : null;
      return T && (Fe(T, p.name || "unknown"), re(T), Ke()), w;
    });
  }), me(() => {
    window.removeEventListener("resize", _0), r == null || r.unsubscribeAction(rt.OnCrosshairChange, Je), document.removeEventListener("mousedown", c0), p1.clear(), d1.clear(), H0(t);
  }), D1(() => {
    const i = A();
    i != null && i.priceCurrency ? (n.innerHTML = i == null ? void 0 : i.priceCurrency.toLocaleUpperCase(), n.style.display = "flex") : n.style.display = "none", r == null || r.setPriceVolumePrecision((i == null ? void 0 : i.pricePrecision) ?? 2, (i == null ? void 0 : i.volumePrecision) ?? 0);
  }), D1((i) => {
    const s = A(), d = I();
    let h = !0;
    return me(() => {
      h = !1;
    }), i && e.datafeed.unsubscribe(i.symbol, i.period), l(!0), o1(!0), (async () => {
      try {
        const [v, f] = Dt(d, (/* @__PURE__ */ new Date()).getTime(), 500), p = await e.datafeed.getHistoryKLineData(s, d, v, f);
        if (!h)
          return;
        r == null || r.applyNewData(p, p.length > 0), setTimeout(() => {
          h && je(s == null ? void 0 : s.ticker);
        }, 0), e.datafeed.subscribe(s, d, (w) => {
          r == null || r.updateData(w);
        });
      } finally {
        h && (l(!1), o1(!1));
      }
    })(), {
      symbol: s,
      period: d
    };
  }), D1(() => {
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
            position: nt.Middle,
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
            position: nt.Middle,
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
            position: nt.Middle,
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
            position: nt.Middle,
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
  }), D1(() => {
    r == null || r.setLocale(y());
  }), D1(() => {
    r == null || r.setTimezone(S1().key);
  }), D1(() => {
    C() && (r == null || r.setStyles(C()), K1(Ea(r.getStyles())));
  }), [Ih.cloneNode(!0), L(Fu, {
    get locale() {
      return e.locale;
    },
    get symbol() {
      return A();
    },
    get spread() {
      return Q();
    },
    get period() {
      return I();
    },
    get periods() {
      return e.periods;
    },
    onMenuClick: async () => {
      try {
        await G5(() => Y(!Q())), r == null || r.resize();
      } catch {
      }
    },
    onSymbolClick: () => {
      L1(!P1());
    },
    get onMobilePeriodClick() {
      return e.onMobilePeriodClick;
    },
    onMobileMoreClick: () => {
      e.onMobileMoreClick ? e.onMobileMoreClick() : e1(!0);
    },
    onPeriodChange: j,
    onIndicatorClick: () => {
      F((i) => !i);
    },
    onTimezoneClick: () => {
      m1((i) => !i);
    },
    onSettingClick: () => {
      J((i) => !i);
    },
    onScreenshotClick: () => {
      if (r) {
        const i = e.screenshotBackgroundColor || (e.theme === "dark" ? "#11131E" : "#ffffff"), s = r.getConvertPictureUrl(!0, "jpeg", i);
        Z1(s);
      }
    },
    get showOrderToolsMenu() {
      var i;
      return ((i = e.orderTools) == null ? void 0 : i.visible) ?? !1;
    },
    get orderToolsState() {
      return C1();
    },
    onOrderToolsStateChange: _e
  }), (() => {
    const i = Nh.cloneNode(!0), s = i.firstChild;
    return i.addEventListener("mouseleave", () => {
      A1(null), N1(!1);
    }), k(i, L(Z, {
      get when() {
        return D();
      },
      get children() {
        return L(g5, {});
      }
    }), s), k(i, L(Z, {
      get when() {
        return Q();
      },
      get children() {
        return L(Ch, {
          get locale() {
            return e.locale;
          },
          onDrawingItemClick: (d) => {
            r == null || r.createOverlay(de(d));
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
    }), s), ge((d) => t = d, s), k(i, L(Z, {
      get when() {
        return w1();
      },
      keyed: !0,
      children: (d) => (() => {
        const h = Fh.cloneNode(!0), m = h.firstChild, v = m.nextSibling, f = v.nextSibling, p = f.firstChild, w = f.nextSibling, T = w.firstChild, O = T.firstChild, H = O.nextSibling, U = H.firstChild, r1 = w.nextSibling, u1 = r1.firstChild, X = r1.nextSibling, x1 = X.nextSibling, G1 = x1.nextSibling;
        return h.$$click = (K) => {
          K.stopPropagation();
        }, h.$$mousedown = (K) => {
          K.preventDefault(), K.stopPropagation();
        }, m.$$mousedown = b5, v.$$click = he, p.$$click = () => O1(z1() === "color" ? null : "color"), k(f, L(Z, {
          get when() {
            return z1() === "color";
          },
          get children() {
            const K = Eh.cloneNode(!0), h1 = K.firstChild;
            return k(h1, L(jt, {
              each: wt,
              children: (t1) => (() => {
                const g1 = Kh.cloneNode(!0);
                return g1.$$click = () => fe(t1), g1.style.setProperty("background", t1), N(() => f1(g1, `overlay-toolbar-color-swatch ${d.color.toLowerCase() === t1.toLowerCase() ? "selected" : ""}`)), g1;
              })()
            })), K;
          }
        }), null), T.$$click = () => O1(z1() === "width" ? null : "width"), k(H, () => d.lineSize, U), k(w, L(Z, {
          get when() {
            return z1() === "width";
          },
          get children() {
            const K = Bh.cloneNode(!0);
            return k(K, L(jt, {
              each: [1, 2, 3, 4],
              children: (h1) => (() => {
                const t1 = jh.cloneNode(!0), g1 = t1.firstChild;
                return t1.$$click = () => R1(h1), g1.style.setProperty("height", `${h1}px`), N(() => f1(t1, d.lineSize === h1 ? "selected" : "")), t1;
              })()
            })), K;
          }
        }), null), u1.$$click = () => O1(z1() === "style" ? null : "style"), k(r1, L(Z, {
          get when() {
            return z1() === "style";
          },
          get children() {
            const K = Uh.cloneNode(!0), h1 = K.firstChild, t1 = h1.nextSibling, g1 = t1.nextSibling;
            return h1.$$click = () => B1(W1.Solid, []), t1.$$click = () => B1(W1.Dashed, [6, 4]), g1.$$click = () => B1(W1.Dashed, [2, 4]), N(($1) => {
              var Re, Ve;
              const ne = d.lineStyle === W1.Solid ? "selected" : "", ie = d.lineStyle === W1.Dashed && ((Re = d.dashedValue) == null ? void 0 : Re[0]) === 6 ? "selected" : "", Ze = d.lineStyle === W1.Dashed && ((Ve = d.dashedValue) == null ? void 0 : Ve[0]) === 2 ? "selected" : "";
              return ne !== $1._v$ && f1(h1, $1._v$ = ne), ie !== $1._v$2 && f1(t1, $1._v$2 = ie), Ze !== $1._v$3 && f1(g1, $1._v$3 = Ze), $1;
            }, {
              _v$: void 0,
              _v$2: void 0,
              _v$3: void 0
            }), K;
          }
        }), null), X.$$click = M, x1.$$click = _, G1.$$click = Ot, N((K) => {
          const h1 = `${d.x}px`, t1 = `${d.y}px`, g1 = `overlay-toolbar-icon edit ${z1() === "color" ? "active" : ""}`, $1 = `overlay-toolbar-line-size ${z1() === "width" ? "active" : ""}`, ne = `overlay-toolbar-icon minus ${z1() === "style" ? "active" : ""}`, ie = `overlay-toolbar-icon visibility ${d.visible ? "" : "muted"}`, Ze = d.visible ? "Hide" : "Show", Re = `overlay-toolbar-icon lock ${d.locked ? "active" : ""}`, Ve = d.locked ? "Unlock" : "Lock";
          return h1 !== K._v$4 && h.style.setProperty("left", K._v$4 = h1), t1 !== K._v$5 && h.style.setProperty("top", K._v$5 = t1), g1 !== K._v$6 && f1(p, K._v$6 = g1), $1 !== K._v$7 && f1(T, K._v$7 = $1), ne !== K._v$8 && f1(u1, K._v$8 = ne), ie !== K._v$9 && f1(X, K._v$9 = ie), Ze !== K._v$10 && k1(X, "title", K._v$10 = Ze), Re !== K._v$11 && f1(x1, K._v$11 = Re), Ve !== K._v$12 && k1(x1, "title", K._v$12 = Ve), K;
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
    }), null), k(i, L(Z, {
      get when() {
        return b1();
      },
      keyed: !0,
      children: (d) => (() => {
        const h = zh.cloneNode(!0), m = h.firstChild;
        return h.addEventListener("mouseleave", () => {
          se() || N1(!1);
        }), h.$$mousemove = (v) => {
          v.stopPropagation(), q1();
        }, h.addEventListener("mouseenter", () => {
          N1(!0), q1();
        }), m.$$click = (v) => {
          v.stopPropagation(), N1(!0), ce({
            y: d.y,
            price: d.price,
            yAxisWidth: Ee()
          }), j1(!0), q1();
        }, m.$$mousedown = (v) => {
          v.preventDefault(), v.stopPropagation(), q1();
        }, N((v) => {
          const f = `${Math.max(0, d.y - 12)}px`, p = `${Ee()}px`, w = C1().quickOrderPlusButton ? "block" : "none";
          return f !== v._v$13 && h.style.setProperty("top", v._v$13 = f), p !== v._v$14 && h.style.setProperty("right", v._v$14 = p), w !== v._v$15 && h.style.setProperty("display", v._v$15 = w), v;
        }, {
          _v$13: void 0,
          _v$14: void 0,
          _v$15: void 0
        }), h;
      })()
    }), null), k(i, L(Z, {
      get when() {
        return q(() => !!se())() && le();
      },
      keyed: !0,
      children: (d) => (() => {
        const h = Qh.cloneNode(!0), m = h.firstChild, v = m.firstChild, f = v.firstChild, p = f.nextSibling, w = p.nextSibling, T = w.nextSibling;
        T.nextSibling;
        const O = v.nextSibling, H = O.firstChild, U = H.nextSibling, r1 = U.nextSibling, u1 = r1.nextSibling;
        u1.nextSibling;
        const X = O.nextSibling, x1 = X.nextSibling, G1 = x1.firstChild, K = G1.nextSibling;
        K.nextSibling;
        const h1 = x1.nextSibling;
        return h1.firstChild, h.addEventListener("mouseleave", () => N1(!1)), h.addEventListener("mouseenter", () => N1(!0)), m.$$mousemove = () => {
          q1();
        }, m.$$mousedown = (t1) => {
          t1.preventDefault(), t1.stopPropagation(), q1();
        }, v.$$click = () => Le("limit"), k(v, () => A().shortName ?? A().name ?? A().ticker, p), k(v, () => ke(d.price), T), O.$$click = () => Le("stop"), k(O, () => A().shortName ?? A().name ?? A().ticker, U), k(O, () => ke(d.price), u1), X.$$click = () => Le("create"), x1.$$click = Tt, k(x1, () => ke(d.price), K), h1.$$click = et, k(h1, () => ke(d.price), null), N((t1) => {
          const g1 = `${Math.max(0, d.y + 24)}px`, $1 = `${d.yAxisWidth + At}px`;
          return g1 !== t1._v$16 && h.style.setProperty("top", t1._v$16 = g1), $1 !== t1._v$17 && h.style.setProperty("right", t1._v$17 = $1), t1;
        }, {
          _v$16: void 0,
          _v$17: void 0
        }), h;
      })()
    }), null), N(() => k1(s, "data-drawing-bar-visible", Q())), i;
  })(), L(Z, {
    get when() {
      return P1();
    },
    get children() {
      return L(Ph, {
        get locale() {
          return e.locale;
        },
        get datafeed() {
          return e.datafeed;
        },
        onSymbolSelected: (i) => {
          P(i);
        },
        onClose: () => {
          L1(!1);
        }
      });
    }
  }), L(Z, {
    get when() {
      return R();
    },
    get children() {
      return L(gh, {
        get locale() {
          return e.locale;
        },
        get mainIndicators() {
          return V();
        },
        get subIndicators() {
          return B();
        },
        onClose: () => {
          F(!1);
        },
        onMainIndicatorChange: (i) => {
          const s = [...V()];
          i.added ? (at(r, i.name, !0, {
            id: "candle_pane"
          }), s.push(i.name), E1(i.name, "candle_pane", "main", "add")) : (r == null || r.removeIndicator("candle_pane", i.name), s.splice(s.indexOf(i.name), 1), E1(i.name, "candle_pane", "main", "remove")), E(s);
        },
        onSubIndicatorChange: (i) => {
          const s = {
            ...B()
          };
          if (i.added) {
            const d = at(r, i.name);
            d && (s[i.name] = d, E1(i.name, d, "sub", "add"));
          } else
            i.paneId && (r == null || r.removeIndicator(i.paneId, i.name), delete s[i.name], E1(i.name, i.paneId, "sub", "remove"));
          G(s);
        }
      });
    }
  }), L(Z, {
    get when() {
      return I1();
    },
    get children() {
      return L(ph, {
        get locale() {
          return e.locale;
        },
        get timezone() {
          return S1();
        },
        onClose: () => {
          m1(!1);
        },
        onConfirm: z
      });
    }
  }), L(Z, {
    get when() {
      return i1();
    },
    get children() {
      return L($h, {
        get locale() {
          return e.locale;
        },
        get currentStyles() {
          return l1.clone(r.getStyles());
        },
        onClose: () => {
          J(!1);
        },
        onChange: (i) => {
          r == null || r.setStyles(i);
        },
        onRestoreDefault: (i) => {
          const s = {};
          i.forEach((d) => {
            const h = d.key;
            Qt(s, h, l1.formatValue(T1(), h));
          }), r == null || r.setStyles(s);
        }
      });
    }
  }), L(Z, {
    get when() {
      return te().length > 0;
    },
    get children() {
      return L(kh, {
        get locale() {
          return e.locale;
        },
        get url() {
          return te();
        },
        onClose: () => {
          Z1("");
        }
      });
    }
  }), L(Z, {
    get when() {
      return Be().visible;
    },
    get children() {
      return L(wh, {
        get locale() {
          return e.locale;
        },
        get params() {
          return Be();
        },
        onClose: () => {
          Ue({
            visible: !1,
            indicatorName: "",
            paneId: "",
            calcParams: []
          });
        },
        onConfirm: (i) => {
          const s = Be();
          r == null || r.overrideIndicator({
            name: s.indicatorName,
            calcParams: i
          }, s.paneId);
          const d = s.paneId === "candle_pane" ? "main" : "sub";
          E1(s.indicatorName, s.paneId, d, "change");
        }
      });
    }
  }), L(Z, {
    get when() {
      return g();
    },
    get children() {
      return L(Dh, {
        get locale() {
          return e.locale;
        },
        onIndicatorClick: () => {
          F(!0);
        },
        onTimezoneClick: () => {
          m1(!0);
        },
        onSettingClick: () => {
          J(!0);
        },
        onClose: () => {
          e1(!1);
        }
      });
    }
  })];
};
F1(["mousedown", "click", "mousemove"]);
const Rh = /* @__PURE__ */ b('<svg class="logo" viewBox="0 0 80 92"><path d="M28.148808359375,51.7280513671875L22.963588359375,51.7280513671875C21.572648359375002,51.7280513671875,20.445068359375,52.6220613671875,20.445068359375,53.7248813671875L20.445068359375,72.3979013671875C20.445068359375,73.5007013671875,21.572648359375002,74.39470136718751,22.963588359375,74.39470136718751L33.926568359375,74.39470136718751C35.317468359375,74.39470136718751,36.445068359375,73.5007013671875,36.445068359375,72.3979013671875L36.445068359375,53.7248813671875C36.445068359375,52.6220613671875,35.317468359375,51.7280513671875,33.926568359375,51.7280513671875L28.741398359374998,51.7280513671875L28.741398359374998,46.2963223671875C28.741398359374998,46.1665793671875,28.608748359375,46.0614013671875,28.445108359375,46.0614013671875C28.281468359375,46.0614013671875,28.148808359375,46.1665793671875,28.148808359375,46.2963223671875L28.148808359375,51.7280513671875ZM28.741398359374998,74.3948013671875L28.741398359374998,79.82650136718749C28.741398359374998,79.9563013671875,28.608748359375,80.0614013671875,28.445108359375,80.0614013671875C28.281468359375,80.0614013671875,28.148808359375,79.9563013671875,28.148808359375,79.82650136718749L28.148808359375,74.3948013671875L28.741398359374998,74.3948013671875Z"></path><path d="M51.148808359374996,44.7280513671875L45.963588359375,44.7280513671875C44.572648359375,44.7280513671875,43.445068359375,45.6220613671875,43.445068359375,46.7248813671875L43.445068359375,65.3979013671875C43.445068359375,66.5007013671875,44.572648359375,67.39470136718751,45.963588359375,67.39470136718751L56.926568359375,67.39470136718751C58.317468359375,67.39470136718751,59.445068359375,66.5007013671875,59.445068359375,65.3979013671875L59.445068359375,46.7248813671875C59.445068359375,45.6220613671875,58.317468359375,44.7280513671875,56.926568359375,44.7280513671875L51.741398359375,44.7280513671875L51.741398359375,39.2963223671875C51.741398359375,39.1665793671875,51.608748359375,39.0614013671875,51.445108359375,39.0614013671875C51.281468359375,39.0614013671875,51.148808359374996,39.1665793671875,51.148808359374996,39.2963223671875L51.148808359374996,44.7280513671875ZM51.741398359375,67.3948013671875L51.741398359375,72.82650136718749C51.741398359375,72.9563013671875,51.608748359375,73.0614013671875,51.445108359375,73.0614013671875C51.281468359375,73.0614013671875,51.148808359374996,72.9563013671875,51.148808359374996,72.82650136718749L51.148808359374996,67.3948013671875L51.741398359375,67.3948013671875Z"></path><path d="M17.7274,90.6541C17.5901,90.6541,17.4517,90.6436,17.3121,90.6225C9.93219,89.5095,4.80718,86.7136,2.07787,82.3084C-1.1223,77.1437,0.241766,71.6314,0.56829,70.5137C5.37624,46.647,15.0785,38.4945,21.5025,33.0957C22.9683,31.8633,24.2342,30.7995,25.1676,29.7672C25.4105,29.4984,25.6051,29.2154,25.7556,28.9202C24.7465,29.2231,24.1971,29.4326,24.1703,29.4429C22.908,29.9368,21.4777,29.3247,20.9761,28.076C20.4756,26.8272,21.0897,25.4146,22.352,24.9172C22.5042,24.8571,23.5312,24.4607,25.3073,23.9616C24.087,21.4425,21.7693,18.7949,19.7125,16.6431L19.2819,16.1902C16.2438,12.9776,14.6017,4.80159,14.3036,3.19471C14.1306,2.26212,14.4636,1.30796,15.1814,0.679657C15.8995,0.0512175,16.8976,-0.159672,17.8125,0.123747C22.7731,1.66274,24.2638,1.81255,27.2321,2.11098C28.7357,2.26195,29.83,3.59029,29.6762,5.07662C29.5236,6.56295,28.182,7.64786,26.6784,7.49454C24.4992,7.27569,22.9517,7.09896,20.724,6.56646C21.4493,9.09088,22.3803,11.5427,23.2771,12.4919L23.6876,12.9237C25.3757,14.69,28.9691,18.45,30.7016,22.7299C35.0392,21.9433,40.8791,21.3359,47.7817,21.7249C48.2004,20.7386,48.8054,19.7953,49.5907,18.9135C49.7137,18.7754,49.8498,18.6502,49.9988,18.539C53.6142,15.8508,57.5491,12.857,59.7803,11.0758C58.1028,11.2502,56.1034,11.0278,53.9124,9.70882C53.2439,9.30622,52.5992,8.89427,51.9662,8.48933C48.4668,6.25164,46.497,5.12109,43.4234,5.94853C41.9647,6.34058,40.4622,5.48975,40.0659,4.04789C39.6695,2.60604,40.5296,1.11853,41.9871,0.726471C47.5602,-0.773825,51.4796,1.73271,54.9364,3.9434L54.9364,3.9434C55.5284,4.32176,56.1318,4.70797,56.7564,5.08482C58.3843,6.06556,59.4858,5.76127,61.2899,5.13865C62.3511,4.77234,63.5567,4.35687,64.8675,4.53476C66.3321,4.73254,67.4406,5.56933,67.9103,6.83096C68.7444,9.07333,67.1035,11.5533,65.5797,13.2374C64.6729,14.2394,60.0845,17.7606,56.4519,20.4957C56.9477,20.3369,57.4767,20.2511,58.026,20.2511C59.4281,20.2511,60.6982,20.8102,61.621,21.7153C65.4948,20.6901,67.87,17.9563,67.9033,17.9175C68.78,16.8888,70.3322,16.7577,71.3721,17.6226C72.412,18.4886,72.5457,20.0253,71.6702,21.054C71.5221,21.2286,69.5063,23.5492,66.0787,25.233C69.5399,26.8822,72.9993,29.682,74.1841,34.4145C74.5106,35.7206,73.7062,37.0407,72.3859,37.3638C72.1871,37.4117,71.9884,37.4351,71.792,37.4351C70.687,37.4351,69.6826,36.6932,69.4046,35.5848C68.4378,31.7217,64.8144,29.7431,61.7619,28.7456C60.8298,29.7349,59.5009,30.3535,58.026,30.3535C55.8642,30.3535,54.0162,29.0245,53.2713,27.1474C53.2022,27.138,53.1331,27.1287,53.0642,27.1195C54.232,29.5936,57.0851,31.9259,58.1868,32.665C58.3157,32.7516,58.4423,32.8523,58.5547,32.9599C66.5865,40.6151,72.4887,48.8133,76.0971,57.3287C76.6815,58.7074,76.0249,60.2932,74.6313,60.8702C74.2976,61.01,73.9388,61.082,73.576,61.082C72.5065,61.082,71.4914,60.4582,71.0525,59.4213C67.7577,51.6455,62.331,44.1074,54.9203,37.0116C53.6073,36.1009,48.0984,31.9917,47.2065,26.583C40.9421,26.2679,35.6187,26.8278,31.6725,27.5336C31.6197,29.527,30.9225,31.5172,29.2456,33.3731C28.0614,34.6827,26.5968,35.915,25.0446,37.2188C21.9414,39.8269,18.2648,42.9169,14.8104,48.1192C11.356,53.3215,8.12389,60.6361,5.9098,71.6934C5.88732,71.8035,5.85893,71.9123,5.82344,72.0188C5.81634,72.041,4.57886,76.0413,6.77344,79.5289C8.6332,82.4828,12.4557,84.4139,18.1367,85.2705C19.6297,85.4953,20.6566,86.8762,20.4295,88.3532C20.2213,89.6944,19.0559,90.6541,17.7274,90.6541ZM35.1195,7.03101C33.3502,7.03101,31.9158,5.61208,31.9158,3.86173C31.9158,2.11139,33.3502,0.69245,35.1195,0.69245C36.8889,0.69245,38.3233,2.11139,38.3233,3.86173C38.3233,5.61208,36.8889,7.03101,35.1195,7.03101ZM57.6848,23.1892L58.414,24.4754C58.8984,24.3623,59.3923,24.3435,59.8644,24.4203C60.2191,24.5005,60.5087,24.7182,60.6663,25.0229C60.8636,25.3394,60.8993,25.7346,60.7646,26.1094C60.5988,26.5176,60.2972,26.8749,59.9085,27.1235L60.31,27.8316L59.7886,28.1294L59.3994,27.443C58.9257,27.7175,58.399,27.883,57.8664,27.9247L57.3744,27.0569C57.6378,27.0741,57.9071,27.048,58.1704,26.9797C58.4501,26.9251,58.7239,26.8323,58.9829,26.7044L58.2801,25.4647C57.8047,25.5877,57.3167,25.6065,56.8549,25.5197C56.4913,25.4263,56.196,25.1971,56.0328,24.8814C55.8433,24.5561,55.8127,24.1572,55.9484,23.7789C56.088,23.373,56.3763,23.0149,56.7584,22.7726L56.4166,22.1699L56.938,21.8721L57.2727,22.4625C57.6615,22.2376,58.0888,22.0901,58.5254,22.0301L59.0042,22.8746C58.5548,22.8828,58.103,22.9906,57.6848,23.1892ZM56.9319,24.2961Q57.1278,24.6417,57.7863,24.5856L57.1695,23.4978Q56.6982,23.884,56.9319,24.2961ZM58.9077,25.3462L59.4981,26.3875L59.499,26.3891Q59.9965,26.0045,59.7628,25.5923Q59.573,25.2576,58.9077,25.3462ZM73.2212,66.5065C73.2212,68.2569,74.6555,69.6758,76.4249,69.6758C78.1943,69.6758,79.6286,68.2569,79.6286,66.5065C79.6286,64.7562,78.1943,63.3372,76.4249,63.3372C74.6555,63.3372,73.2212,64.7562,73.2212,66.5065ZM35.9465,91.8045C35.0734,91.8045,34.2038,91.7987,33.3378,91.7858C31.827,91.7636,30.6203,90.5359,30.6428,89.0402C30.6653,87.5457,31.9158,86.3297,33.4183,86.3742C49.6344,86.6059,65.7512,84.6175,67.6134,84.037C72.1953,82.4184,74.5295,79.3603,74.5295,74.9575C74.5295,73.463,75.754,72.2517,77.2648,72.2517C78.7755,72.2517,80,73.463,80,74.9575C80,81.5992,76.148,86.7686,69.4317,89.142C67.0041,89.9999,51.0955,91.8046,35.9465,91.8045ZM25.2731,92C23.5037,92,22.0693,90.5811,22.0693,88.8307C22.0693,87.0804,23.5037,85.6615,25.2731,85.6615C27.0424,85.6615,28.4768,87.0804,28.4768,88.8307C28.4768,90.5811,27.0424,92,25.2731,92Z"></path></svg>'), Vh = Rh.cloneNode(!0);
class Wh {
  constructor(t) {
    He(this, "_chartApi", null);
    if (l1.isString(t.container)) {
      if (this._container = document.getElementById(t.container), !this._container)
        throw new Error("Container is null");
    } else
      this._container = t.container;
    this._container.classList.add("klinecharts-pro"), this._container.setAttribute("data-theme", t.theme ?? "light");
    const r = this;
    o6(() => L(Zh, {
      ref: (n) => {
        r._chartApi = n;
      },
      get styles() {
        return t.styles ?? {};
      },
      get watermark() {
        return t.watermark ?? Vh;
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
  subscribeAction(t, r) {
    var n, o;
    (o = (n = this._chartApi) == null ? void 0 : n.subscribeAction) == null || o.call(n, t, r);
  }
  unsubscribeAction(t, r) {
    var n, o;
    (o = (n = this._chartApi) == null ? void 0 : n.unsubscribeAction) == null || o.call(n, t, r);
  }
}
R5.forEach((e) => {
  w5(e);
});
export {
  Yh as DefaultDatafeed,
  Wh as KLineChartPro,
  Gh as loadLocales
};
//# sourceMappingURL=klinecharts-pro.js.map
