var j9 = Object.defineProperty;
var Q9 = (e, n, t) => n in e ? j9(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var ft = (e, n, t) => (Q9(e, typeof n != "symbol" ? n + "" : n, t), t);
import { utils as de, OverlayMode as pn, ActionType as M1, LineType as f1, init as Z9, FormatDateType as Nt, DomPosition as m1, dispose as Y0, TooltipIconPosition as It, CandleType as V9, YAxisType as H9, registerOverlay as q9 } from "klinecharts";
function gt(e, n, t) {
  const o = (e.x - n.x) * Math.cos(t) - (e.y - n.y) * Math.sin(t) + n.x, s = (e.x - n.x) * Math.sin(t) + (e.y - n.y) * Math.cos(t) + n.y;
  return { x: o, y: s };
}
function kn(e, n) {
  if (e.length > 1) {
    let t;
    return e[0].x === e[1].x && e[0].y !== e[1].y ? e[0].y < e[1].y ? t = {
      x: e[0].x,
      y: n.height
    } : t = {
      x: e[0].x,
      y: 0
    } : e[0].x > e[1].x ? t = {
      x: 0,
      y: de.getLinearYFromCoordinates(e[0], e[1], { x: 0, y: e[0].y })
    } : t = {
      x: n.width,
      y: de.getLinearYFromCoordinates(e[0], e[1], { x: n.width, y: e[0].y })
    }, { coordinates: [e[0], t] };
  }
  return [];
}
function Ur(e, n) {
  const t = Math.abs(e.x - n.x), o = Math.abs(e.y - n.y);
  return Math.sqrt(t * t + o * o);
}
const Y9 = {
  name: "arrow",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const n = e[1].x > e[0].x ? 0 : 1, t = de.getLinearSlopeIntercept(e[0], e[1]);
      let o;
      t ? o = Math.atan(t[0]) + Math.PI * n : e[1].y > e[0].y ? o = Math.PI / 2 : o = Math.PI / 2 * 3;
      const s = gt({ x: e[1].x - 8, y: e[1].y + 4 }, e[1], o), l = gt({ x: e[1].x - 8, y: e[1].y - 4 }, e[1], o);
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
}, W9 = {
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
      const n = Ur(e[0], e[1]);
      return {
        type: "circle",
        attrs: {
          ...e[0],
          r: n
        },
        styles: { style: "stroke_fill" }
      };
    }
    return [];
  }
}, G9 = {
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
}, X9 = {
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
      const n = { x: e[0].x + (e[2].x - e[1].x), y: e[2].y };
      return [
        {
          type: "polygon",
          attrs: { coordinates: [e[0], e[1], e[2], n] },
          styles: { style: "stroke_fill" }
        }
      ];
    }
    return [];
  },
  performEventPressedMove: ({ points: e, performPointIndex: n, performPoint: t }) => {
    n < 2 && (e[0].price = t.price, e[1].price = t.price);
  },
  performEventMoveForDrawing: ({ currentStep: e, points: n, performPoint: t }) => {
    e === 2 && (n[0].price = t.price);
  }
}, J9 = {
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
      const n = Math.abs(e[0].x - e[1].x), t = Math.abs(e[0].y - e[1].y), o = Math.sqrt(n * n + t * t), s = [0.236, 0.382, 0.5, 0.618, 0.786, 1], l = [], h = [];
      return s.forEach((d) => {
        const v = o * d;
        l.push(
          { ...e[0], r: v }
        ), h.push({
          x: e[0].x,
          y: e[0].y + v + 6,
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
}, t5 = {
  name: "fibonacciSegment",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: n, precision: t }) => {
    const o = [], s = [];
    if (e.length > 1) {
      const l = e[1].x > e[0].x ? e[0].x : e[1].x, h = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0], d = e[0].y - e[1].y, v = n.points, x = v[0].value - v[1].value;
      h.forEach((p) => {
        const w = e[1].y + d * p, M = (v[1].value + x * p).toFixed(t.price);
        o.push({ coordinates: [{ x: e[0].x, y: w }, { x: e[1].x, y: w }] }), s.push({
          x: l,
          y: w,
          text: `${M} (${(p * 100).toFixed(1)}%)`,
          baseline: "bottom"
        });
      });
    }
    return [
      {
        type: "line",
        attrs: o
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: s
      }
    ];
  }
}, n5 = {
  name: "fibonacciSpiral",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, bounding: n }) => {
    if (e.length > 1) {
      const t = Ur(e[0], e[1]) / Math.sqrt(24), o = e[1].x > e[0].x ? 0 : 1, s = de.getLinearSlopeIntercept(e[0], e[1]);
      let l;
      s ? l = Math.atan(s[0]) + Math.PI * o : e[1].y > e[0].y ? l = Math.PI / 2 : l = Math.PI / 2 * 3;
      const h = gt(
        { x: e[0].x - t, y: e[0].y },
        e[0],
        l
      ), d = gt(
        { x: e[0].x - t, y: e[0].y - t },
        e[0],
        l
      ), v = [{
        ...h,
        r: t,
        startAngle: l,
        endAngle: l + Math.PI / 2
      }, {
        ...d,
        r: t * 2,
        startAngle: l + Math.PI / 2,
        endAngle: l + Math.PI
      }];
      let x = e[0].x - t, p = e[0].y - t;
      for (let w = 2; w < 9; w++) {
        const M = v[w - 2].r + v[w - 1].r;
        let D = 0;
        switch (w % 4) {
          case 0: {
            D = l, x -= v[w - 2].r;
            break;
          }
          case 1: {
            D = l + Math.PI / 2, p -= v[w - 2].r;
            break;
          }
          case 2: {
            D = l + Math.PI, x += v[w - 2].r;
            break;
          }
          case 3: {
            D = l + Math.PI / 2 * 3, p += v[w - 2].r;
            break;
          }
        }
        const U = D + Math.PI / 2, B = gt({ x, y: p }, e[0], l);
        v.push({
          ...B,
          r: M,
          startAngle: D,
          endAngle: U
        });
      }
      return [
        {
          type: "arc",
          attrs: v
        },
        {
          type: "line",
          attrs: kn(e, n)
        }
      ];
    }
    return [];
  }
}, r5 = {
  name: "fibonacciSpeedResistanceFan",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, bounding: n }) => {
    const t = [];
    let o = [];
    const s = [];
    if (e.length > 1) {
      const l = e[1].x > e[0].x ? -38 : 4, h = e[1].y > e[0].y ? -2 : 20, d = e[1].x - e[0].x, v = e[1].y - e[0].y;
      [1, 0.75, 0.618, 0.5, 0.382, 0.25, 0].forEach((p) => {
        const w = e[1].x - d * p, M = e[1].y - v * p;
        t.push({ coordinates: [{ x: w, y: e[0].y }, { x: w, y: e[1].y }] }), t.push({ coordinates: [{ x: e[0].x, y: M }, { x: e[1].x, y: M }] }), o = o.concat(kn([e[0], { x: w, y: e[1].y }], n)), o = o.concat(kn([e[0], { x: e[1].x, y: M }], n)), s.unshift({
          x: e[0].x + l,
          y: M + 10,
          text: `${p.toFixed(3)}`
        }), s.unshift({
          x: w - 18,
          y: e[0].y + h,
          text: `${p.toFixed(3)}`
        });
      });
    }
    return [
      {
        type: "line",
        attrs: t
      },
      {
        type: "line",
        attrs: o
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: s
      }
    ];
  }
}, o5 = {
  name: "fibonacciExtension",
  totalStep: 4,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: n, precision: t }) => {
    const o = [], s = [];
    if (e.length > 2) {
      const l = n.points, h = l[1].value - l[0].value, d = e[1].y - e[0].y, v = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1], x = e[2].x > e[1].x ? e[1].x : e[2].x;
      v.forEach((p) => {
        const w = e[2].y + d * p, M = (l[2].value + h * p).toFixed(t.price);
        o.push({ coordinates: [{ x: e[1].x, y: w }, { x: e[2].x, y: w }] }), s.push({
          x,
          y: w,
          text: `${M} (${(p * 100).toFixed(1)}%)`,
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
        attrs: o
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: s
      }
    ];
  }
}, i5 = {
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
      const n = (e[1].y - e[0].y) / 4, t = e[1].x - e[0].x, o = [
        { coordinates: [e[0], { x: e[1].x, y: e[1].y - n }] },
        { coordinates: [e[0], { x: e[1].x, y: e[1].y - n * 2 }] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[1].x, y: e[0].y + n }] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[1].x, y: e[0].y + n * 2 }] },
        { coordinates: [{ ...e[0] }, { x: e[0].x + t * 0.236, y: e[1].y }] },
        { coordinates: [{ ...e[0] }, { x: e[0].x + t * 0.5, y: e[1].y }] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[0].x + t * 0.236, y: e[0].y }] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[0].x + t * 0.5, y: e[0].y }] }
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
          attrs: o,
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
}, a5 = {
  name: "threeWaves",
  totalStep: 5,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    const n = e.map((t, o) => ({
      ...t,
      text: `(${o})`,
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
        attrs: n
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
    const n = e.map((t, o) => ({
      ...t,
      text: `(${o})`,
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
        attrs: n
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
    const n = e.map((t, o) => ({
      ...t,
      text: `(${o})`,
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
        attrs: n
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
    const n = e.map((t, o) => ({
      ...t,
      text: `(${o})`,
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
        attrs: n
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
    let n = [], t = [];
    const o = ["A", "B", "C", "D"], s = e.map((l, h) => ({
      ...l,
      baseline: "bottom",
      text: `(${o[h]})`
    }));
    return e.length > 2 && (n = [e[0], e[2]], e.length > 3 && (t = [e[1], e[3]])), [
      {
        type: "line",
        attrs: { coordinates: e }
      },
      {
        type: "line",
        attrs: [{ coordinates: n }, { coordinates: t }],
        styles: { style: "dashed" }
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: s
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
  createPointFigures: ({ coordinates: e, overlay: n }) => {
    const t = [], o = [], s = ["X", "A", "B", "C", "D"], l = e.map((h, d) => ({
      ...h,
      baseline: "bottom",
      text: `(${s[d]})`
    }));
    return e.length > 2 && (t.push({ coordinates: [e[0], e[2]] }), o.push({ coordinates: [e[0], e[1], e[2]] }), e.length > 3 && (t.push({ coordinates: [e[1], e[3]] }), e.length > 4 && (t.push({ coordinates: [e[2], e[4]] }), o.push({ coordinates: [e[2], e[3], e[4]] })))), [
      {
        type: "line",
        attrs: { coordinates: e }
      },
      {
        type: "line",
        attrs: t,
        styles: { style: "dashed" }
      },
      {
        type: "polygon",
        ignoreEvent: !0,
        attrs: o
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: l
      }
    ];
  }
}, h5 = [
  Y9,
  W9,
  G9,
  J9,
  X9,
  e5,
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
  d5
];
class Vm {
  constructor(n) {
    ft(this, "_apiKey");
    ft(this, "_prevSymbolMarket");
    ft(this, "_ws");
    this._apiKey = n;
  }
  async searchSymbols(n) {
    return await ((await (await fetch(`https://api.polygon.io/v3/reference/tickers?apiKey=${this._apiKey}&active=true&search=${n ?? ""}`)).json()).results || []).map((s) => ({
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
  async getHistoryKLineData(n, t, o, s) {
    return await ((await (await fetch(`https://api.polygon.io/v2/aggs/ticker/${n.ticker}/range/${t.multiplier}/${t.timespan}/${o}/${s}?apiKey=${this._apiKey}`)).json()).results || []).map((d) => ({
      timestamp: d.t,
      open: d.o,
      high: d.h,
      low: d.l,
      close: d.c,
      volume: d.v,
      turnover: d.vw
    }));
  }
  subscribe(n, t, o) {
    var s, l;
    this._prevSymbolMarket !== n.market ? ((s = this._ws) == null || s.close(), this._ws = new WebSocket(`wss://delayed.polygon.io/${n.market}`), this._ws.onopen = () => {
      var h;
      (h = this._ws) == null || h.send(JSON.stringify({ action: "auth", params: this._apiKey }));
    }, this._ws.onmessage = (h) => {
      var v;
      const d = JSON.parse(h.data);
      d[0].ev === "status" ? d[0].status === "auth_success" && ((v = this._ws) == null || v.send(JSON.stringify({ action: "subscribe", params: `T.${n.ticker}` }))) : "sym" in d && o({
        timestamp: d.s,
        open: d.o,
        high: d.h,
        low: d.l,
        close: d.c,
        volume: d.v,
        turnover: d.vw
      });
    }) : (l = this._ws) == null || l.send(JSON.stringify({ action: "subscribe", params: `T.${n.ticker}` })), this._prevSymbolMarket = n.market;
  }
  unsubscribe(n, t) {
  }
}
const Ne = {};
function f5(e) {
  Ne.context = e;
}
const m5 = (e, n) => e === n, xn = Symbol("solid-proxy"), g5 = Symbol("solid-track"), jt = {
  equals: m5
};
let Rr = Qr;
const y1 = 1, Qt = 2, zr = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, vn = {};
var Me = null;
let P1 = null, pe = null, Be = null, g1 = null, Nn = 0;
function yt(e, n) {
  const t = pe, o = Me, s = e.length === 0, l = s ? zr : {
    owned: null,
    cleanups: null,
    context: null,
    owner: n === void 0 ? o : n
  }, h = s ? e : () => e(() => a1(() => Jt(l)));
  Me = l, pe = null;
  try {
    return $1(h, !0);
  } finally {
    pe = t, Me = o;
  }
}
function T(e, n) {
  n = n ? Object.assign({}, jt, n) : jt;
  const t = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: n.equals || void 0
  }, o = (s) => (typeof s == "function" && (s = s(t.value)), jr(t, s));
  return [Kr.bind(t), o];
}
function W0(e, n, t) {
  const o = Xt(e, n, !0, y1);
  Q1(o);
}
function I(e, n, t) {
  const o = Xt(e, n, !1, y1);
  Q1(o);
}
function ze(e, n, t) {
  Rr = $5;
  const o = Xt(e, n, !1, y1);
  o.user = !0, g1 ? g1.push(o) : Q1(o);
}
function Z(e, n, t) {
  t = t ? Object.assign({}, jt, t) : jt;
  const o = Xt(e, n, !0, 0);
  return o.observers = null, o.observerSlots = null, o.comparator = t.equals || void 0, Q1(o), Kr.bind(o);
}
function y5(e, n, t) {
  let o, s, l;
  arguments.length === 2 && typeof n == "object" || arguments.length === 1 ? (o = !0, s = e, l = n || {}) : (o = e, s = n, l = t || {});
  let h = null, d = vn, v = null, x = !1, p = "initialValue" in l, w = typeof o == "function" && Z(o);
  const M = /* @__PURE__ */ new Set(), [D, U] = (l.storage || T)(l.initialValue), [B, O] = T(void 0), [j, ee] = T(void 0, {
    equals: !1
  }), [R, W] = T(p ? "ready" : "unresolved");
  if (Ne.context) {
    v = `${Ne.context.id}${Ne.context.count++}`;
    let q;
    l.ssrLoadFrom === "initial" ? d = l.initialValue : Ne.load && (q = Ne.load(v)) && (d = q[0]);
  }
  function V(q, re, se, _e) {
    return h === q && (h = null, p = !0, (q === d || re === d) && l.onHydrated && queueMicrotask(() => l.onHydrated(_e, {
      value: re
    })), d = vn, he(re, se)), re;
  }
  function he(q, re) {
    $1(() => {
      re === void 0 && U(() => q), W(re !== void 0 ? "errored" : "ready"), O(re);
      for (const se of M.keys())
        se.decrement();
      M.clear();
    }, !1);
  }
  function K() {
    const q = v5, re = D(), se = B();
    if (se !== void 0 && !h)
      throw se;
    return pe && !pe.user && q && W0(() => {
      j(), h && (q.resolved || M.has(q) || (q.increment(), M.add(q)));
    }), re;
  }
  function Q(q = !0) {
    if (q !== !1 && x)
      return;
    x = !1;
    const re = w ? w() : o;
    if (re == null || re === !1) {
      V(h, a1(D));
      return;
    }
    const se = d !== vn ? d : a1(() => s(re, {
      value: D(),
      refetching: q
    }));
    return typeof se != "object" || !(se && "then" in se) ? (V(h, se, void 0, re), se) : (h = se, x = !0, queueMicrotask(() => x = !1), $1(() => {
      W(p ? "refreshing" : "pending"), ee();
    }, !1), se.then((_e) => V(se, _e, void 0, re), (_e) => V(se, void 0, Vr(_e), re)));
  }
  return Object.defineProperties(K, {
    state: {
      get: () => R()
    },
    error: {
      get: () => B()
    },
    loading: {
      get() {
        const q = R();
        return q === "pending" || q === "refreshing";
      }
    },
    latest: {
      get() {
        if (!p)
          return K();
        const q = B();
        if (q && !h)
          throw q;
        return D();
      }
    }
  }), w ? W0(() => Q(!1)) : Q(!1), [K, {
    refetch: Q,
    mutate: U
  }];
}
function a1(e) {
  if (pe === null)
    return e();
  const n = pe;
  pe = null;
  try {
    return e();
  } finally {
    pe = n;
  }
}
function In(e) {
  ze(() => a1(e));
}
function O1(e) {
  return Me === null || (Me.cleanups === null ? Me.cleanups = [e] : Me.cleanups.push(e)), e;
}
function p5(e) {
  const n = pe, t = Me;
  return Promise.resolve().then(() => {
    pe = n, Me = t;
    let o;
    return $1(e, !1), pe = Me = null, o ? o.done : void 0;
  });
}
let v5;
function Kr() {
  const e = P1;
  if (this.sources && (this.state || e))
    if (this.state === y1 || e)
      Q1(this);
    else {
      const n = Be;
      Be = null, $1(() => Vt(this), !1), Be = n;
    }
  if (pe) {
    const n = this.observers ? this.observers.length : 0;
    pe.sources ? (pe.sources.push(this), pe.sourceSlots.push(n)) : (pe.sources = [this], pe.sourceSlots = [n]), this.observers ? (this.observers.push(pe), this.observerSlots.push(pe.sources.length - 1)) : (this.observers = [pe], this.observerSlots = [pe.sources.length - 1]);
  }
  return this.value;
}
function jr(e, n, t) {
  let o = e.value;
  return (!e.comparator || !e.comparator(o, n)) && (e.value = n, e.observers && e.observers.length && $1(() => {
    for (let s = 0; s < e.observers.length; s += 1) {
      const l = e.observers[s], h = P1 && P1.running;
      h && P1.disposed.has(l), (h && !l.tState || !h && !l.state) && (l.pure ? Be.push(l) : g1.push(l), l.observers && Zr(l)), h || (l.state = y1);
    }
    if (Be.length > 1e6)
      throw Be = [], new Error();
  }, !1)), n;
}
function Q1(e) {
  if (!e.fn)
    return;
  Jt(e);
  const n = Me, t = pe, o = Nn;
  pe = Me = e, C5(e, e.value, o), pe = t, Me = n;
}
function C5(e, n, t) {
  let o;
  try {
    o = e.fn(n);
  } catch (s) {
    e.pure && (e.state = y1, e.owned && e.owned.forEach(Jt), e.owned = null), Hr(s);
  }
  (!e.updatedAt || e.updatedAt <= t) && (e.updatedAt != null && "observers" in e ? jr(e, o) : e.value = o, e.updatedAt = t);
}
function Xt(e, n, t, o = y1, s) {
  const l = {
    fn: e,
    state: o,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: n,
    owner: Me,
    context: null,
    pure: t
  };
  return Me === null || Me !== zr && (Me.owned ? Me.owned.push(l) : Me.owned = [l]), l;
}
function Zt(e) {
  const n = P1;
  if (e.state === 0 || n)
    return;
  if (e.state === Qt || n)
    return Vt(e);
  if (e.suspense && a1(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < Nn); )
    (e.state || n) && t.push(e);
  for (let o = t.length - 1; o >= 0; o--)
    if (e = t[o], e.state === y1 || n)
      Q1(e);
    else if (e.state === Qt || n) {
      const s = Be;
      Be = null, $1(() => Vt(e, t[0]), !1), Be = s;
    }
}
function $1(e, n) {
  if (Be)
    return e();
  let t = !1;
  n || (Be = []), g1 ? t = !0 : g1 = [], Nn++;
  try {
    const o = e();
    return b5(t), o;
  } catch (o) {
    t || (g1 = null), Be = null, Hr(o);
  }
}
function b5(e) {
  if (Be && (Qr(Be), Be = null), e)
    return;
  const n = g1;
  g1 = null, n.length && $1(() => Rr(n), !1);
}
function Qr(e) {
  for (let n = 0; n < e.length; n++)
    Zt(e[n]);
}
function $5(e) {
  let n, t = 0;
  for (n = 0; n < e.length; n++) {
    const o = e[n];
    o.user ? e[t++] = o : Zt(o);
  }
  for (Ne.context && f5(), n = 0; n < t; n++)
    Zt(e[n]);
}
function Vt(e, n) {
  const t = P1;
  e.state = 0;
  for (let o = 0; o < e.sources.length; o += 1) {
    const s = e.sources[o];
    s.sources && (s.state === y1 || t ? s !== n && Zt(s) : (s.state === Qt || t) && Vt(s, n));
  }
}
function Zr(e) {
  const n = P1;
  for (let t = 0; t < e.observers.length; t += 1) {
    const o = e.observers[t];
    (!o.state || n) && (o.state = Qt, o.pure ? Be.push(o) : g1.push(o), o.observers && Zr(o));
  }
}
function Jt(e) {
  let n;
  if (e.sources)
    for (; e.sources.length; ) {
      const t = e.sources.pop(), o = e.sourceSlots.pop(), s = t.observers;
      if (s && s.length) {
        const l = s.pop(), h = t.observerSlots.pop();
        o < s.length && (l.sourceSlots[h] = o, s[o] = l, t.observerSlots[o] = h);
      }
    }
  if (e.owned) {
    for (n = 0; n < e.owned.length; n++)
      Jt(e.owned[n]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (n = 0; n < e.cleanups.length; n++)
      e.cleanups[n]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function Vr(e) {
  return e instanceof Error || typeof e == "string" ? e : new Error("Unknown error");
}
function Hr(e) {
  throw e = Vr(e), e;
}
const _5 = Symbol("fallback");
function G0(e) {
  for (let n = 0; n < e.length; n++)
    e[n]();
}
function k5(e, n, t = {}) {
  let o = [], s = [], l = [], h = 0, d = n.length > 1 ? [] : null;
  return O1(() => G0(l)), () => {
    let v = e() || [], x, p;
    return v[g5], a1(() => {
      let M = v.length, D, U, B, O, j, ee, R, W, V;
      if (M === 0)
        h !== 0 && (G0(l), l = [], o = [], s = [], h = 0, d && (d = [])), t.fallback && (o = [_5], s[0] = yt((he) => (l[0] = he, t.fallback())), h = 1);
      else if (h === 0) {
        for (s = new Array(M), p = 0; p < M; p++)
          o[p] = v[p], s[p] = yt(w);
        h = M;
      } else {
        for (B = new Array(M), O = new Array(M), d && (j = new Array(M)), ee = 0, R = Math.min(h, M); ee < R && o[ee] === v[ee]; ee++)
          ;
        for (R = h - 1, W = M - 1; R >= ee && W >= ee && o[R] === v[W]; R--, W--)
          B[W] = s[R], O[W] = l[R], d && (j[W] = d[R]);
        for (D = /* @__PURE__ */ new Map(), U = new Array(W + 1), p = W; p >= ee; p--)
          V = v[p], x = D.get(V), U[p] = x === void 0 ? -1 : x, D.set(V, p);
        for (x = ee; x <= R; x++)
          V = o[x], p = D.get(V), p !== void 0 && p !== -1 ? (B[p] = s[x], O[p] = l[x], d && (j[p] = d[x]), p = U[p], D.set(V, p)) : l[x]();
        for (p = ee; p < M; p++)
          p in B ? (s[p] = B[p], l[p] = O[p], d && (d[p] = j[p], d[p](p))) : s[p] = yt(w);
        s = s.slice(0, h = M), o = v.slice(0);
      }
      return s;
    });
    function w(M) {
      if (l[p] = M, d) {
        const [D, U] = T(p);
        return d[p] = U, n(v[p], D);
      }
      return n(v[p]);
    }
  };
}
function L(e, n) {
  return a1(() => e(n || {}));
}
function Et() {
  return !0;
}
const x5 = {
  get(e, n, t) {
    return n === xn ? t : e.get(n);
  },
  has(e, n) {
    return n === xn ? !0 : e.has(n);
  },
  set: Et,
  deleteProperty: Et,
  getOwnPropertyDescriptor(e, n) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(n);
      },
      set: Et,
      deleteProperty: Et
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function Cn(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function qr(...e) {
  let n = !1;
  for (let o = 0; o < e.length; o++) {
    const s = e[o];
    n = n || !!s && xn in s, e[o] = typeof s == "function" ? (n = !0, Z(s)) : s;
  }
  if (n)
    return new Proxy({
      get(o) {
        for (let s = e.length - 1; s >= 0; s--) {
          const l = Cn(e[s])[o];
          if (l !== void 0)
            return l;
        }
      },
      has(o) {
        for (let s = e.length - 1; s >= 0; s--)
          if (o in Cn(e[s]))
            return !0;
        return !1;
      },
      keys() {
        const o = [];
        for (let s = 0; s < e.length; s++)
          o.push(...Object.keys(Cn(e[s])));
        return [...new Set(o)];
      }
    }, x5);
  const t = {};
  for (let o = e.length - 1; o >= 0; o--)
    if (e[o]) {
      const s = Object.getOwnPropertyDescriptors(e[o]);
      for (const l in s)
        l in t || Object.defineProperty(t, l, {
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
  return t;
}
function Ln(e) {
  const n = "fallback" in e && {
    fallback: () => e.fallback
  };
  return Z(k5(() => e.each, e.children, n || void 0));
}
function J(e) {
  let n = !1;
  const t = e.keyed, o = Z(() => e.when, void 0, {
    equals: (s, l) => n ? s === l : !s == !l
  });
  return Z(() => {
    const s = o();
    if (s) {
      const l = e.children, h = typeof l == "function" && l.length > 0;
      return n = t || h, h ? a1(() => l(s)) : l;
    }
    return e.fallback;
  }, void 0, void 0);
}
function L5(e, n, t) {
  let o = t.length, s = n.length, l = o, h = 0, d = 0, v = n[s - 1].nextSibling, x = null;
  for (; h < s || d < l; ) {
    if (n[h] === t[d]) {
      h++, d++;
      continue;
    }
    for (; n[s - 1] === t[l - 1]; )
      s--, l--;
    if (s === h) {
      const p = l < o ? d ? t[d - 1].nextSibling : t[l - d] : v;
      for (; d < l; )
        e.insertBefore(t[d++], p);
    } else if (l === d)
      for (; h < s; )
        (!x || !x.has(n[h])) && n[h].remove(), h++;
    else if (n[h] === t[l - 1] && t[d] === n[s - 1]) {
      const p = n[--s].nextSibling;
      e.insertBefore(t[d++], n[h++].nextSibling), e.insertBefore(t[--l], p), n[s] = t[l];
    } else {
      if (!x) {
        x = /* @__PURE__ */ new Map();
        let w = d;
        for (; w < l; )
          x.set(t[w], w++);
      }
      const p = x.get(n[h]);
      if (p != null)
        if (d < p && p < l) {
          let w = h, M = 1, D;
          for (; ++w < s && w < l && !((D = x.get(n[w])) == null || D !== p + M); )
            M++;
          if (M > p - d) {
            const U = n[h];
            for (; d < p; )
              e.insertBefore(t[d++], U);
          } else
            e.replaceChild(t[d++], n[h++]);
        } else
          h++;
      else
        n[h++].remove();
    }
  }
}
const X0 = "_$DX_DELEGATE";
function w5(e, n, t, o = {}) {
  let s;
  return yt((l) => {
    s = l, n === document ? e() : C(n, e(), n.firstChild ? null : void 0, t);
  }, o.owner), () => {
    s(), n.textContent = "";
  };
}
function $(e, n, t) {
  const o = document.createElement("template");
  o.innerHTML = e;
  let s = o.content.firstChild;
  return t && (s = s.firstChild), s;
}
function Ze(e, n = window.document) {
  const t = n[X0] || (n[X0] = /* @__PURE__ */ new Set());
  for (let o = 0, s = e.length; o < s; o++) {
    const l = e[o];
    t.has(l) || (t.add(l), n.addEventListener(l, A5));
  }
}
function Se(e, n, t) {
  t == null ? e.removeAttribute(n) : e.setAttribute(n, t);
}
function oe(e, n) {
  n == null ? e.removeAttribute("class") : e.className = n;
}
function i1(e, n, t, o) {
  if (o)
    Array.isArray(t) ? (e[`$$${n}`] = t[0], e[`$$${n}Data`] = t[1]) : e[`$$${n}`] = t;
  else if (Array.isArray(t)) {
    const s = t[0];
    e.addEventListener(n, t[0] = (l) => s.call(e, t[1], l));
  } else
    e.addEventListener(n, t);
}
function N1(e, n, t) {
  if (!n)
    return t ? Se(e, "style") : n;
  const o = e.style;
  if (typeof n == "string")
    return o.cssText = n;
  typeof t == "string" && (o.cssText = t = void 0), t || (t = {}), n || (n = {});
  let s, l;
  for (l in t)
    n[l] == null && o.removeProperty(l), delete t[l];
  for (l in n)
    s = n[l], s !== t[l] && (o.setProperty(l, s), t[l] = s);
  return t;
}
function D1(e, n, t) {
  return a1(() => e(n, t));
}
function C(e, n, t, o) {
  if (t !== void 0 && !o && (o = []), typeof n != "function")
    return Ht(e, n, o, t);
  I((s) => Ht(e, n(), s, t), o);
}
function A5(e) {
  const n = `$$${e.type}`;
  let t = e.composedPath && e.composedPath()[0] || e.target;
  for (e.target !== t && Object.defineProperty(e, "target", {
    configurable: !0,
    value: t
  }), Object.defineProperty(e, "currentTarget", {
    configurable: !0,
    get() {
      return t || document;
    }
  }), Ne.registry && !Ne.done && (Ne.done = !0, document.querySelectorAll("[id^=pl-]").forEach((o) => {
    for (; o && o.nodeType !== 8 && o.nodeValue !== "pl-" + e; ) {
      let s = o.nextSibling;
      o.remove(), o = s;
    }
    o && o.remove();
  })); t; ) {
    const o = t[n];
    if (o && !t.disabled) {
      const s = t[`${n}Data`];
      if (s !== void 0 ? o.call(t, s, e) : o.call(t, e), e.cancelBubble)
        return;
    }
    t = t._$host || t.parentNode || t.host;
  }
}
function Ht(e, n, t, o, s) {
  for (Ne.context && !t && (t = [...e.childNodes]); typeof t == "function"; )
    t = t();
  if (n === t)
    return t;
  const l = typeof n, h = o !== void 0;
  if (e = h && t[0] && t[0].parentNode || e, l === "string" || l === "number") {
    if (Ne.context)
      return t;
    if (l === "number" && (n = n.toString()), h) {
      let d = t[0];
      d && d.nodeType === 3 ? d.data = n : d = document.createTextNode(n), t = K1(e, t, o, d);
    } else
      t !== "" && typeof t == "string" ? t = e.firstChild.data = n : t = e.textContent = n;
  } else if (n == null || l === "boolean") {
    if (Ne.context)
      return t;
    t = K1(e, t, o);
  } else {
    if (l === "function")
      return I(() => {
        let d = n();
        for (; typeof d == "function"; )
          d = d();
        t = Ht(e, d, t, o);
      }), () => t;
    if (Array.isArray(n)) {
      const d = [], v = t && Array.isArray(t);
      if (wn(d, n, t, s))
        return I(() => t = Ht(e, d, t, o, !0)), () => t;
      if (Ne.context) {
        if (!d.length)
          return t;
        for (let x = 0; x < d.length; x++)
          if (d[x].parentNode)
            return t = d;
      }
      if (d.length === 0) {
        if (t = K1(e, t, o), h)
          return t;
      } else
        v ? t.length === 0 ? J0(e, d, o) : L5(e, t, d) : (t && K1(e), J0(e, d));
      t = d;
    } else if (n instanceof Node) {
      if (Ne.context && n.parentNode)
        return t = h ? [n] : n;
      if (Array.isArray(t)) {
        if (h)
          return t = K1(e, t, o, n);
        K1(e, t, null, n);
      } else
        t == null || t === "" || !e.firstChild ? e.appendChild(n) : e.replaceChild(n, e.firstChild);
      t = n;
    }
  }
  return t;
}
function wn(e, n, t, o) {
  let s = !1;
  for (let l = 0, h = n.length; l < h; l++) {
    let d = n[l], v = t && t[l];
    if (d instanceof Node)
      e.push(d);
    else if (!(d == null || d === !0 || d === !1))
      if (Array.isArray(d))
        s = wn(e, d, v) || s;
      else if (typeof d == "function")
        if (o) {
          for (; typeof d == "function"; )
            d = d();
          s = wn(e, Array.isArray(d) ? d : [d], Array.isArray(v) ? v : [v]) || s;
        } else
          e.push(d), s = !0;
      else {
        const x = String(d);
        v && v.nodeType === 3 && v.data === x ? e.push(v) : e.push(document.createTextNode(x));
      }
  }
  return s;
}
function J0(e, n, t = null) {
  for (let o = 0, s = n.length; o < s; o++)
    e.insertBefore(n[o], t);
}
function K1(e, n, t, o) {
  if (t === void 0)
    return e.textContent = "";
  const s = o || document.createTextNode("");
  if (n.length) {
    let l = !1;
    for (let h = n.length - 1; h >= 0; h--) {
      const d = n[h];
      if (s !== d) {
        const v = d.parentNode === e;
        !l && !h ? v ? e.replaceChild(s, d) : e.insertBefore(s, t) : v && d.remove();
      } else
        l = !0;
    }
  } else
    e.insertBefore(s, t);
  return [s];
}
const M5 = "http://www.w3.org/2000/svg";
function T5(e, n = !1) {
  return n ? document.createElementNS(M5, e) : document.createElement(e);
}
function S5(e) {
  const {
    useShadow: n
  } = e, t = document.createTextNode(""), o = e.mount || document.body;
  function s() {
    if (Ne.context) {
      const [l, h] = T(!1);
      return queueMicrotask(() => h(!0)), () => l() && e.children;
    } else
      return () => e.children;
  }
  if (o instanceof HTMLHeadElement) {
    const [l, h] = T(!1), d = () => h(!0);
    yt((v) => C(o, () => l() ? v() : s()(), null)), O1(() => {
      Ne.context ? queueMicrotask(d) : d();
    });
  } else {
    const l = T5(e.isSVG ? "g" : "div", e.isSVG), h = n && l.attachShadow ? l.attachShadow({
      mode: "open"
    }) : l;
    Object.defineProperty(l, "_$host", {
      get() {
        return t.parentNode;
      },
      configurable: !0
    }), C(h, s()), o.appendChild(l), e.ref && e.ref(l), O1(() => o.removeChild(l));
  }
  return t;
}
var Bt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Yr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var P5 = typeof Bt == "object" && Bt && Bt.Object === Object && Bt, Wr = P5, D5 = Wr, O5 = typeof self == "object" && self && self.Object === Object && self, N5 = D5 || O5 || Function("return this")(), s1 = N5, I5 = s1, E5 = I5.Symbol, en = E5, er = en, Gr = Object.prototype, B5 = Gr.hasOwnProperty, F5 = Gr.toString, mt = er ? er.toStringTag : void 0;
function U5(e) {
  var n = B5.call(e, mt), t = e[mt];
  try {
    e[mt] = void 0;
    var o = !0;
  } catch {
  }
  var s = F5.call(e);
  return o && (n ? e[mt] = t : delete e[mt]), s;
}
var R5 = U5, z5 = Object.prototype, K5 = z5.toString;
function j5(e) {
  return K5.call(e);
}
var Q5 = j5, tr = en, Z5 = R5, V5 = Q5, H5 = "[object Null]", q5 = "[object Undefined]", nr = tr ? tr.toStringTag : void 0;
function Y5(e) {
  return e == null ? e === void 0 ? q5 : H5 : nr && nr in Object(e) ? Z5(e) : V5(e);
}
var pt = Y5;
function W5(e) {
  var n = typeof e;
  return e != null && (n == "object" || n == "function");
}
var Z1 = W5, G5 = pt, X5 = Z1, J5 = "[object AsyncFunction]", e6 = "[object Function]", t6 = "[object GeneratorFunction]", n6 = "[object Proxy]";
function r6(e) {
  if (!X5(e))
    return !1;
  var n = G5(e);
  return n == e6 || n == t6 || n == J5 || n == n6;
}
var Xr = r6, o6 = s1, i6 = o6["__core-js_shared__"], a6 = i6, bn = a6, rr = function() {
  var e = /[^.]+$/.exec(bn && bn.keys && bn.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function s6(e) {
  return !!rr && rr in e;
}
var l6 = s6, c6 = Function.prototype, u6 = c6.toString;
function d6(e) {
  if (e != null) {
    try {
      return u6.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Jr = d6, h6 = Xr, f6 = l6, m6 = Z1, g6 = Jr, y6 = /[\\^$.*+?()[\]{}|]/g, p6 = /^\[object .+?Constructor\]$/, v6 = Function.prototype, C6 = Object.prototype, b6 = v6.toString, $6 = C6.hasOwnProperty, _6 = RegExp(
  "^" + b6.call($6).replace(y6, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function k6(e) {
  if (!m6(e) || f6(e))
    return !1;
  var n = h6(e) ? _6 : p6;
  return n.test(g6(e));
}
var x6 = k6;
function L6(e, n) {
  return e == null ? void 0 : e[n];
}
var w6 = L6, A6 = x6, M6 = w6;
function T6(e, n) {
  var t = M6(e, n);
  return A6(t) ? t : void 0;
}
var I1 = T6, S6 = I1, P6 = function() {
  try {
    var e = S6(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), D6 = P6, or = D6;
function O6(e, n, t) {
  n == "__proto__" && or ? or(e, n, {
    configurable: !0,
    enumerable: !0,
    value: t,
    writable: !0
  }) : e[n] = t;
}
var e9 = O6;
function N6(e, n) {
  return e === n || e !== e && n !== n;
}
var t9 = N6, I6 = e9, E6 = t9, B6 = Object.prototype, F6 = B6.hasOwnProperty;
function U6(e, n, t) {
  var o = e[n];
  (!(F6.call(e, n) && E6(o, t)) || t === void 0 && !(n in e)) && I6(e, n, t);
}
var En = U6, R6 = Array.isArray, V1 = R6;
function z6(e) {
  return e != null && typeof e == "object";
}
var H1 = z6, K6 = pt, j6 = H1, Q6 = "[object Symbol]";
function Z6(e) {
  return typeof e == "symbol" || j6(e) && K6(e) == Q6;
}
var Bn = Z6, V6 = V1, H6 = Bn, q6 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Y6 = /^\w*$/;
function W6(e, n) {
  if (V6(e))
    return !1;
  var t = typeof e;
  return t == "number" || t == "symbol" || t == "boolean" || e == null || H6(e) ? !0 : Y6.test(e) || !q6.test(e) || n != null && e in Object(n);
}
var G6 = W6, X6 = I1, J6 = X6(Object, "create"), tn = J6, ir = tn;
function e2() {
  this.__data__ = ir ? ir(null) : {}, this.size = 0;
}
var t2 = e2;
function n2(e) {
  var n = this.has(e) && delete this.__data__[e];
  return this.size -= n ? 1 : 0, n;
}
var r2 = n2, o2 = tn, i2 = "__lodash_hash_undefined__", a2 = Object.prototype, s2 = a2.hasOwnProperty;
function l2(e) {
  var n = this.__data__;
  if (o2) {
    var t = n[e];
    return t === i2 ? void 0 : t;
  }
  return s2.call(n, e) ? n[e] : void 0;
}
var c2 = l2, u2 = tn, d2 = Object.prototype, h2 = d2.hasOwnProperty;
function f2(e) {
  var n = this.__data__;
  return u2 ? n[e] !== void 0 : h2.call(n, e);
}
var m2 = f2, g2 = tn, y2 = "__lodash_hash_undefined__";
function p2(e, n) {
  var t = this.__data__;
  return this.size += this.has(e) ? 0 : 1, t[e] = g2 && n === void 0 ? y2 : n, this;
}
var v2 = p2, C2 = t2, b2 = r2, $2 = c2, _2 = m2, k2 = v2;
function q1(e) {
  var n = -1, t = e == null ? 0 : e.length;
  for (this.clear(); ++n < t; ) {
    var o = e[n];
    this.set(o[0], o[1]);
  }
}
q1.prototype.clear = C2;
q1.prototype.delete = b2;
q1.prototype.get = $2;
q1.prototype.has = _2;
q1.prototype.set = k2;
var x2 = q1;
function L2() {
  this.__data__ = [], this.size = 0;
}
var w2 = L2, A2 = t9;
function M2(e, n) {
  for (var t = e.length; t--; )
    if (A2(e[t][0], n))
      return t;
  return -1;
}
var nn = M2, T2 = nn, S2 = Array.prototype, P2 = S2.splice;
function D2(e) {
  var n = this.__data__, t = T2(n, e);
  if (t < 0)
    return !1;
  var o = n.length - 1;
  return t == o ? n.pop() : P2.call(n, t, 1), --this.size, !0;
}
var O2 = D2, N2 = nn;
function I2(e) {
  var n = this.__data__, t = N2(n, e);
  return t < 0 ? void 0 : n[t][1];
}
var E2 = I2, B2 = nn;
function F2(e) {
  return B2(this.__data__, e) > -1;
}
var U2 = F2, R2 = nn;
function z2(e, n) {
  var t = this.__data__, o = R2(t, e);
  return o < 0 ? (++this.size, t.push([e, n])) : t[o][1] = n, this;
}
var K2 = z2, j2 = w2, Q2 = O2, Z2 = E2, V2 = U2, H2 = K2;
function Y1(e) {
  var n = -1, t = e == null ? 0 : e.length;
  for (this.clear(); ++n < t; ) {
    var o = e[n];
    this.set(o[0], o[1]);
  }
}
Y1.prototype.clear = j2;
Y1.prototype.delete = Q2;
Y1.prototype.get = Z2;
Y1.prototype.has = V2;
Y1.prototype.set = H2;
var rn = Y1, q2 = I1, Y2 = s1, W2 = q2(Y2, "Map"), Fn = W2, ar = x2, G2 = rn, X2 = Fn;
function J2() {
  this.size = 0, this.__data__ = {
    hash: new ar(),
    map: new (X2 || G2)(),
    string: new ar()
  };
}
var eo = J2;
function to(e) {
  var n = typeof e;
  return n == "string" || n == "number" || n == "symbol" || n == "boolean" ? e !== "__proto__" : e === null;
}
var no = to, ro = no;
function oo(e, n) {
  var t = e.__data__;
  return ro(n) ? t[typeof n == "string" ? "string" : "hash"] : t.map;
}
var on = oo, io = on;
function ao(e) {
  var n = io(this, e).delete(e);
  return this.size -= n ? 1 : 0, n;
}
var so = ao, lo = on;
function co(e) {
  return lo(this, e).get(e);
}
var uo = co, ho = on;
function fo(e) {
  return ho(this, e).has(e);
}
var mo = fo, go = on;
function yo(e, n) {
  var t = go(this, e), o = t.size;
  return t.set(e, n), this.size += t.size == o ? 0 : 1, this;
}
var po = yo, vo = eo, Co = so, bo = uo, $o = mo, _o = po;
function W1(e) {
  var n = -1, t = e == null ? 0 : e.length;
  for (this.clear(); ++n < t; ) {
    var o = e[n];
    this.set(o[0], o[1]);
  }
}
W1.prototype.clear = vo;
W1.prototype.delete = Co;
W1.prototype.get = bo;
W1.prototype.has = $o;
W1.prototype.set = _o;
var n9 = W1, r9 = n9, ko = "Expected a function";
function Un(e, n) {
  if (typeof e != "function" || n != null && typeof n != "function")
    throw new TypeError(ko);
  var t = function() {
    var o = arguments, s = n ? n.apply(this, o) : o[0], l = t.cache;
    if (l.has(s))
      return l.get(s);
    var h = e.apply(this, o);
    return t.cache = l.set(s, h) || l, h;
  };
  return t.cache = new (Un.Cache || r9)(), t;
}
Un.Cache = r9;
var xo = Un, Lo = xo, wo = 500;
function Ao(e) {
  var n = Lo(e, function(o) {
    return t.size === wo && t.clear(), o;
  }), t = n.cache;
  return n;
}
var Mo = Ao, To = Mo, So = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Po = /\\(\\)?/g, Do = To(function(e) {
  var n = [];
  return e.charCodeAt(0) === 46 && n.push(""), e.replace(So, function(t, o, s, l) {
    n.push(s ? l.replace(Po, "$1") : o || t);
  }), n;
}), Oo = Do;
function No(e, n) {
  for (var t = -1, o = e == null ? 0 : e.length, s = Array(o); ++t < o; )
    s[t] = n(e[t], t, e);
  return s;
}
var Io = No, sr = en, Eo = Io, Bo = V1, Fo = Bn, Uo = 1 / 0, lr = sr ? sr.prototype : void 0, cr = lr ? lr.toString : void 0;
function o9(e) {
  if (typeof e == "string")
    return e;
  if (Bo(e))
    return Eo(e, o9) + "";
  if (Fo(e))
    return cr ? cr.call(e) : "";
  var n = e + "";
  return n == "0" && 1 / e == -Uo ? "-0" : n;
}
var Ro = o9, zo = Ro;
function Ko(e) {
  return e == null ? "" : zo(e);
}
var jo = Ko, Qo = V1, Zo = G6, Vo = Oo, Ho = jo;
function qo(e, n) {
  return Qo(e) ? e : Zo(e, n) ? [e] : Vo(Ho(e));
}
var Yo = qo, Wo = 9007199254740991, Go = /^(?:0|[1-9]\d*)$/;
function Xo(e, n) {
  var t = typeof e;
  return n = n ?? Wo, !!n && (t == "number" || t != "symbol" && Go.test(e)) && e > -1 && e % 1 == 0 && e < n;
}
var i9 = Xo, Jo = Bn, ei = 1 / 0;
function ti(e) {
  if (typeof e == "string" || Jo(e))
    return e;
  var n = e + "";
  return n == "0" && 1 / e == -ei ? "-0" : n;
}
var ni = ti, ri = En, oi = Yo, ii = i9, ur = Z1, ai = ni;
function si(e, n, t, o) {
  if (!ur(e))
    return e;
  n = oi(n, e);
  for (var s = -1, l = n.length, h = l - 1, d = e; d != null && ++s < l; ) {
    var v = ai(n[s]), x = t;
    if (v === "__proto__" || v === "constructor" || v === "prototype")
      return e;
    if (s != h) {
      var p = d[v];
      x = o ? o(p, v, d) : void 0, x === void 0 && (x = ur(p) ? p : ii(n[s + 1]) ? [] : {});
    }
    ri(d, v, x), d = d[v];
  }
  return e;
}
var li = si, ci = li;
function ui(e, n, t) {
  return e == null ? e : ci(e, n, t);
}
var di = ui;
const An = /* @__PURE__ */ Yr(di);
var hi = rn;
function fi() {
  this.__data__ = new hi(), this.size = 0;
}
var mi = fi;
function gi(e) {
  var n = this.__data__, t = n.delete(e);
  return this.size = n.size, t;
}
var yi = gi;
function pi(e) {
  return this.__data__.get(e);
}
var vi = pi;
function Ci(e) {
  return this.__data__.has(e);
}
var bi = Ci, $i = rn, _i = Fn, ki = n9, xi = 200;
function Li(e, n) {
  var t = this.__data__;
  if (t instanceof $i) {
    var o = t.__data__;
    if (!_i || o.length < xi - 1)
      return o.push([e, n]), this.size = ++t.size, this;
    t = this.__data__ = new ki(o);
  }
  return t.set(e, n), this.size = t.size, this;
}
var wi = Li, Ai = rn, Mi = mi, Ti = yi, Si = vi, Pi = bi, Di = wi;
function G1(e) {
  var n = this.__data__ = new Ai(e);
  this.size = n.size;
}
G1.prototype.clear = Mi;
G1.prototype.delete = Ti;
G1.prototype.get = Si;
G1.prototype.has = Pi;
G1.prototype.set = Di;
var Oi = G1;
function Ni(e, n) {
  for (var t = -1, o = e == null ? 0 : e.length; ++t < o && n(e[t], t, e) !== !1; )
    ;
  return e;
}
var Ii = Ni, Ei = En, Bi = e9;
function Fi(e, n, t, o) {
  var s = !t;
  t || (t = {});
  for (var l = -1, h = n.length; ++l < h; ) {
    var d = n[l], v = o ? o(t[d], e[d], d, t, e) : void 0;
    v === void 0 && (v = e[d]), s ? Bi(t, d, v) : Ei(t, d, v);
  }
  return t;
}
var an = Fi;
function Ui(e, n) {
  for (var t = -1, o = Array(e); ++t < e; )
    o[t] = n(t);
  return o;
}
var Ri = Ui, zi = pt, Ki = H1, ji = "[object Arguments]";
function Qi(e) {
  return Ki(e) && zi(e) == ji;
}
var Zi = Qi, dr = Zi, Vi = H1, a9 = Object.prototype, Hi = a9.hasOwnProperty, qi = a9.propertyIsEnumerable, Yi = dr(function() {
  return arguments;
}()) ? dr : function(e) {
  return Vi(e) && Hi.call(e, "callee") && !qi.call(e, "callee");
}, Wi = Yi, qt = { exports: {} };
function Gi() {
  return !1;
}
var Xi = Gi;
qt.exports;
(function(e, n) {
  var t = s1, o = Xi, s = n && !n.nodeType && n, l = s && !0 && e && !e.nodeType && e, h = l && l.exports === s, d = h ? t.Buffer : void 0, v = d ? d.isBuffer : void 0, x = v || o;
  e.exports = x;
})(qt, qt.exports);
var s9 = qt.exports, Ji = 9007199254740991;
function e3(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Ji;
}
var l9 = e3, t3 = pt, n3 = l9, r3 = H1, o3 = "[object Arguments]", i3 = "[object Array]", a3 = "[object Boolean]", s3 = "[object Date]", l3 = "[object Error]", c3 = "[object Function]", u3 = "[object Map]", d3 = "[object Number]", h3 = "[object Object]", f3 = "[object RegExp]", m3 = "[object Set]", g3 = "[object String]", y3 = "[object WeakMap]", p3 = "[object ArrayBuffer]", v3 = "[object DataView]", C3 = "[object Float32Array]", b3 = "[object Float64Array]", $3 = "[object Int8Array]", _3 = "[object Int16Array]", k3 = "[object Int32Array]", x3 = "[object Uint8Array]", L3 = "[object Uint8ClampedArray]", w3 = "[object Uint16Array]", A3 = "[object Uint32Array]", ye = {};
ye[C3] = ye[b3] = ye[$3] = ye[_3] = ye[k3] = ye[x3] = ye[L3] = ye[w3] = ye[A3] = !0;
ye[o3] = ye[i3] = ye[p3] = ye[a3] = ye[v3] = ye[s3] = ye[l3] = ye[c3] = ye[u3] = ye[d3] = ye[h3] = ye[f3] = ye[m3] = ye[g3] = ye[y3] = !1;
function M3(e) {
  return r3(e) && n3(e.length) && !!ye[t3(e)];
}
var T3 = M3;
function S3(e) {
  return function(n) {
    return e(n);
  };
}
var Rn = S3, Yt = { exports: {} };
Yt.exports;
(function(e, n) {
  var t = Wr, o = n && !n.nodeType && n, s = o && !0 && e && !e.nodeType && e, l = s && s.exports === o, h = l && t.process, d = function() {
    try {
      var v = s && s.require && s.require("util").types;
      return v || h && h.binding && h.binding("util");
    } catch {
    }
  }();
  e.exports = d;
})(Yt, Yt.exports);
var zn = Yt.exports, P3 = T3, D3 = Rn, hr = zn, fr = hr && hr.isTypedArray, O3 = fr ? D3(fr) : P3, N3 = O3, I3 = Ri, E3 = Wi, B3 = V1, F3 = s9, U3 = i9, R3 = N3, z3 = Object.prototype, K3 = z3.hasOwnProperty;
function j3(e, n) {
  var t = B3(e), o = !t && E3(e), s = !t && !o && F3(e), l = !t && !o && !s && R3(e), h = t || o || s || l, d = h ? I3(e.length, String) : [], v = d.length;
  for (var x in e)
    (n || K3.call(e, x)) && !(h && // Safari 9 has enumerable `arguments.length` in strict mode.
    (x == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    s && (x == "offset" || x == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    l && (x == "buffer" || x == "byteLength" || x == "byteOffset") || // Skip index properties.
    U3(x, v))) && d.push(x);
  return d;
}
var c9 = j3, Q3 = Object.prototype;
function Z3(e) {
  var n = e && e.constructor, t = typeof n == "function" && n.prototype || Q3;
  return e === t;
}
var Kn = Z3;
function V3(e, n) {
  return function(t) {
    return e(n(t));
  };
}
var u9 = V3, H3 = u9, q3 = H3(Object.keys, Object), Y3 = q3, W3 = Kn, G3 = Y3, X3 = Object.prototype, J3 = X3.hasOwnProperty;
function ea(e) {
  if (!W3(e))
    return G3(e);
  var n = [];
  for (var t in Object(e))
    J3.call(e, t) && t != "constructor" && n.push(t);
  return n;
}
var ta = ea, na = Xr, ra = l9;
function oa(e) {
  return e != null && ra(e.length) && !na(e);
}
var d9 = oa, ia = c9, aa = ta, sa = d9;
function la(e) {
  return sa(e) ? ia(e) : aa(e);
}
var jn = la, ca = an, ua = jn;
function da(e, n) {
  return e && ca(n, ua(n), e);
}
var ha = da;
function fa(e) {
  var n = [];
  if (e != null)
    for (var t in Object(e))
      n.push(t);
  return n;
}
var ma = fa, ga = Z1, ya = Kn, pa = ma, va = Object.prototype, Ca = va.hasOwnProperty;
function ba(e) {
  if (!ga(e))
    return pa(e);
  var n = ya(e), t = [];
  for (var o in e)
    o == "constructor" && (n || !Ca.call(e, o)) || t.push(o);
  return t;
}
var $a = ba, _a = c9, ka = $a, xa = d9;
function La(e) {
  return xa(e) ? _a(e, !0) : ka(e);
}
var Qn = La, wa = an, Aa = Qn;
function Ma(e, n) {
  return e && wa(n, Aa(n), e);
}
var Ta = Ma, Wt = { exports: {} };
Wt.exports;
(function(e, n) {
  var t = s1, o = n && !n.nodeType && n, s = o && !0 && e && !e.nodeType && e, l = s && s.exports === o, h = l ? t.Buffer : void 0, d = h ? h.allocUnsafe : void 0;
  function v(x, p) {
    if (p)
      return x.slice();
    var w = x.length, M = d ? d(w) : new x.constructor(w);
    return x.copy(M), M;
  }
  e.exports = v;
})(Wt, Wt.exports);
var Sa = Wt.exports;
function Pa(e, n) {
  var t = -1, o = e.length;
  for (n || (n = Array(o)); ++t < o; )
    n[t] = e[t];
  return n;
}
var Da = Pa;
function Oa(e, n) {
  for (var t = -1, o = e == null ? 0 : e.length, s = 0, l = []; ++t < o; ) {
    var h = e[t];
    n(h, t, e) && (l[s++] = h);
  }
  return l;
}
var Na = Oa;
function Ia() {
  return [];
}
var h9 = Ia, Ea = Na, Ba = h9, Fa = Object.prototype, Ua = Fa.propertyIsEnumerable, mr = Object.getOwnPropertySymbols, Ra = mr ? function(e) {
  return e == null ? [] : (e = Object(e), Ea(mr(e), function(n) {
    return Ua.call(e, n);
  }));
} : Ba, Zn = Ra, za = an, Ka = Zn;
function ja(e, n) {
  return za(e, Ka(e), n);
}
var Qa = ja;
function Za(e, n) {
  for (var t = -1, o = n.length, s = e.length; ++t < o; )
    e[s + t] = n[t];
  return e;
}
var f9 = Za, Va = u9, Ha = Va(Object.getPrototypeOf, Object), m9 = Ha, qa = f9, Ya = m9, Wa = Zn, Ga = h9, Xa = Object.getOwnPropertySymbols, Ja = Xa ? function(e) {
  for (var n = []; e; )
    qa(n, Wa(e)), e = Ya(e);
  return n;
} : Ga, g9 = Ja, e8 = an, t8 = g9;
function n8(e, n) {
  return e8(e, t8(e), n);
}
var r8 = n8, o8 = f9, i8 = V1;
function a8(e, n, t) {
  var o = n(e);
  return i8(e) ? o : o8(o, t(e));
}
var y9 = a8, s8 = y9, l8 = Zn, c8 = jn;
function u8(e) {
  return s8(e, c8, l8);
}
var d8 = u8, h8 = y9, f8 = g9, m8 = Qn;
function g8(e) {
  return h8(e, m8, f8);
}
var y8 = g8, p8 = I1, v8 = s1, C8 = p8(v8, "DataView"), b8 = C8, $8 = I1, _8 = s1, k8 = $8(_8, "Promise"), x8 = k8, L8 = I1, w8 = s1, A8 = L8(w8, "Set"), M8 = A8, T8 = I1, S8 = s1, P8 = T8(S8, "WeakMap"), D8 = P8, Mn = b8, Tn = Fn, Sn = x8, Pn = M8, Dn = D8, p9 = pt, X1 = Jr, gr = "[object Map]", O8 = "[object Object]", yr = "[object Promise]", pr = "[object Set]", vr = "[object WeakMap]", Cr = "[object DataView]", N8 = X1(Mn), I8 = X1(Tn), E8 = X1(Sn), B8 = X1(Pn), F8 = X1(Dn), T1 = p9;
(Mn && T1(new Mn(new ArrayBuffer(1))) != Cr || Tn && T1(new Tn()) != gr || Sn && T1(Sn.resolve()) != yr || Pn && T1(new Pn()) != pr || Dn && T1(new Dn()) != vr) && (T1 = function(e) {
  var n = p9(e), t = n == O8 ? e.constructor : void 0, o = t ? X1(t) : "";
  if (o)
    switch (o) {
      case N8:
        return Cr;
      case I8:
        return gr;
      case E8:
        return yr;
      case B8:
        return pr;
      case F8:
        return vr;
    }
  return n;
});
var Vn = T1, U8 = Object.prototype, R8 = U8.hasOwnProperty;
function z8(e) {
  var n = e.length, t = new e.constructor(n);
  return n && typeof e[0] == "string" && R8.call(e, "index") && (t.index = e.index, t.input = e.input), t;
}
var K8 = z8, j8 = s1, Q8 = j8.Uint8Array, Z8 = Q8, br = Z8;
function V8(e) {
  var n = new e.constructor(e.byteLength);
  return new br(n).set(new br(e)), n;
}
var Hn = V8, H8 = Hn;
function q8(e, n) {
  var t = n ? H8(e.buffer) : e.buffer;
  return new e.constructor(t, e.byteOffset, e.byteLength);
}
var Y8 = q8, W8 = /\w*$/;
function G8(e) {
  var n = new e.constructor(e.source, W8.exec(e));
  return n.lastIndex = e.lastIndex, n;
}
var X8 = G8, $r = en, _r = $r ? $r.prototype : void 0, kr = _r ? _r.valueOf : void 0;
function J8(e) {
  return kr ? Object(kr.call(e)) : {};
}
var es = J8, ts = Hn;
function ns(e, n) {
  var t = n ? ts(e.buffer) : e.buffer;
  return new e.constructor(t, e.byteOffset, e.length);
}
var rs = ns, os = Hn, is = Y8, as = X8, ss = es, ls = rs, cs = "[object Boolean]", us = "[object Date]", ds = "[object Map]", hs = "[object Number]", fs = "[object RegExp]", ms = "[object Set]", gs = "[object String]", ys = "[object Symbol]", ps = "[object ArrayBuffer]", vs = "[object DataView]", Cs = "[object Float32Array]", bs = "[object Float64Array]", $s = "[object Int8Array]", _s = "[object Int16Array]", ks = "[object Int32Array]", xs = "[object Uint8Array]", Ls = "[object Uint8ClampedArray]", ws = "[object Uint16Array]", As = "[object Uint32Array]";
function Ms(e, n, t) {
  var o = e.constructor;
  switch (n) {
    case ps:
      return os(e);
    case cs:
    case us:
      return new o(+e);
    case vs:
      return is(e, t);
    case Cs:
    case bs:
    case $s:
    case _s:
    case ks:
    case xs:
    case Ls:
    case ws:
    case As:
      return ls(e, t);
    case ds:
      return new o();
    case hs:
    case gs:
      return new o(e);
    case fs:
      return as(e);
    case ms:
      return new o();
    case ys:
      return ss(e);
  }
}
var Ts = Ms, Ss = Z1, xr = Object.create, Ps = function() {
  function e() {
  }
  return function(n) {
    if (!Ss(n))
      return {};
    if (xr)
      return xr(n);
    e.prototype = n;
    var t = new e();
    return e.prototype = void 0, t;
  };
}(), Ds = Ps, Os = Ds, Ns = m9, Is = Kn;
function Es(e) {
  return typeof e.constructor == "function" && !Is(e) ? Os(Ns(e)) : {};
}
var Bs = Es, Fs = Vn, Us = H1, Rs = "[object Map]";
function zs(e) {
  return Us(e) && Fs(e) == Rs;
}
var Ks = zs, js = Ks, Qs = Rn, Lr = zn, wr = Lr && Lr.isMap, Zs = wr ? Qs(wr) : js, Vs = Zs, Hs = Vn, qs = H1, Ys = "[object Set]";
function Ws(e) {
  return qs(e) && Hs(e) == Ys;
}
var Gs = Ws, Xs = Gs, Js = Rn, Ar = zn, Mr = Ar && Ar.isSet, e7 = Mr ? Js(Mr) : Xs, t7 = e7, n7 = Oi, r7 = Ii, o7 = En, i7 = ha, a7 = Ta, s7 = Sa, l7 = Da, c7 = Qa, u7 = r8, d7 = d8, h7 = y8, f7 = Vn, m7 = K8, g7 = Ts, y7 = Bs, p7 = V1, v7 = s9, C7 = Vs, b7 = Z1, $7 = t7, _7 = jn, k7 = Qn, x7 = 1, L7 = 2, w7 = 4, v9 = "[object Arguments]", A7 = "[object Array]", M7 = "[object Boolean]", T7 = "[object Date]", S7 = "[object Error]", C9 = "[object Function]", P7 = "[object GeneratorFunction]", D7 = "[object Map]", O7 = "[object Number]", b9 = "[object Object]", N7 = "[object RegExp]", I7 = "[object Set]", E7 = "[object String]", B7 = "[object Symbol]", F7 = "[object WeakMap]", U7 = "[object ArrayBuffer]", R7 = "[object DataView]", z7 = "[object Float32Array]", K7 = "[object Float64Array]", j7 = "[object Int8Array]", Q7 = "[object Int16Array]", Z7 = "[object Int32Array]", V7 = "[object Uint8Array]", H7 = "[object Uint8ClampedArray]", q7 = "[object Uint16Array]", Y7 = "[object Uint32Array]", ge = {};
ge[v9] = ge[A7] = ge[U7] = ge[R7] = ge[M7] = ge[T7] = ge[z7] = ge[K7] = ge[j7] = ge[Q7] = ge[Z7] = ge[D7] = ge[O7] = ge[b9] = ge[N7] = ge[I7] = ge[E7] = ge[B7] = ge[V7] = ge[H7] = ge[q7] = ge[Y7] = !0;
ge[S7] = ge[C9] = ge[F7] = !1;
function Kt(e, n, t, o, s, l) {
  var h, d = n & x7, v = n & L7, x = n & w7;
  if (t && (h = s ? t(e, o, s, l) : t(e)), h !== void 0)
    return h;
  if (!b7(e))
    return e;
  var p = p7(e);
  if (p) {
    if (h = m7(e), !d)
      return l7(e, h);
  } else {
    var w = f7(e), M = w == C9 || w == P7;
    if (v7(e))
      return s7(e, d);
    if (w == b9 || w == v9 || M && !s) {
      if (h = v || M ? {} : y7(e), !d)
        return v ? u7(e, a7(h, e)) : c7(e, i7(h, e));
    } else {
      if (!ge[w])
        return s ? e : {};
      h = g7(e, w, d);
    }
  }
  l || (l = new n7());
  var D = l.get(e);
  if (D)
    return D;
  l.set(e, h), $7(e) ? e.forEach(function(O) {
    h.add(Kt(O, n, t, O, e, l));
  }) : C7(e) && e.forEach(function(O, j) {
    h.set(j, Kt(O, n, t, j, e, l));
  });
  var U = x ? v ? h7 : d7 : v ? k7 : _7, B = p ? void 0 : U(e);
  return r7(B || e, function(O, j) {
    B && (j = O, O = e[j]), o7(h, j, Kt(O, n, t, j, e, l));
  }), h;
}
var W7 = Kt, G7 = W7, X7 = 1, J7 = 4;
function el(e) {
  return G7(e, X7 | J7);
}
var tl = el;
const nl = /* @__PURE__ */ Yr(tl), rl = /* @__PURE__ */ $("<button></button>"), ol = (e) => (() => {
  const n = rl.cloneNode(!0);
  return i1(n, "click", e.onClick, !0), C(n, () => e.children), I((t) => {
    const o = e.style, s = `klinecharts-pro-button ${e.type ?? "confirm"} ${e.class ?? ""}`;
    return t._v$ = N1(n, o, t._v$), s !== t._v$2 && oe(n, t._v$2 = s), t;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), n;
})();
Ze(["click"]);
const il = /* @__PURE__ */ $('<svg viewBox="0 0 1024 1024" class="icon"><path d="M810.666667 128H213.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v597.333334c0 46.933333 38.4 85.333333 85.333333 85.333333h597.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V213.333333c0-46.933333-38.4-85.333333-85.333333-85.333333z m-353.706667 567.04a42.496 42.496 0 0 1-60.16 0L243.626667 541.866667c-8.106667-8.106667-12.373333-18.773333-12.373334-29.866667s4.693333-22.186667 12.373334-29.866667a42.496 42.496 0 0 1 60.16 0L426.666667 604.586667l293.546666-293.546667a42.496 42.496 0 1 1 60.16 60.16l-323.413333 323.84z"></path></svg>'), al = /* @__PURE__ */ $('<svg viewBox="0 0 1024 1024" class="icon"><path d="M245.333333 128h533.333334A117.333333 117.333333 0 0 1 896 245.333333v533.333334A117.333333 117.333333 0 0 1 778.666667 896H245.333333A117.333333 117.333333 0 0 1 128 778.666667V245.333333A117.333333 117.333333 0 0 1 245.333333 128z m0 64c-29.44 0-53.333333 23.893333-53.333333 53.333333v533.333334c0 29.44 23.893333 53.333333 53.333333 53.333333h533.333334c29.44 0 53.333333-23.893333 53.333333-53.333333V245.333333c0-29.44-23.893333-53.333333-53.333333-53.333333H245.333333z"></path></svg>'), sl = /* @__PURE__ */ $("<div></div>"), ll = /* @__PURE__ */ $('<span class="label"></span>'), cl = () => il.cloneNode(!0), ul = () => al.cloneNode(!0), Tr = (e) => {
  const [n, t] = T(e.checked ?? !1);
  return ze(() => {
    "checked" in e && t(e.checked);
  }), (() => {
    const o = sl.cloneNode(!0);
    return o.$$click = (s) => {
      const l = !n();
      e.onChange && e.onChange(l), t(l);
    }, C(o, (() => {
      const s = Z(() => !!n());
      return () => s() ? L(cl, {}) : L(ul, {});
    })(), null), C(o, (() => {
      const s = Z(() => !!e.label);
      return () => s() && (() => {
        const l = ll.cloneNode(!0);
        return C(l, () => e.label), l;
      })();
    })(), null), I((s) => {
      const l = e.style, h = `klinecharts-pro-checkbox ${n() && "checked" || ""} ${e.class || ""}`;
      return s._v$ = N1(o, l, s._v$), h !== s._v$2 && oe(o, s._v$2 = h), s;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), o;
  })();
};
Ze(["click"]);
const dl = /* @__PURE__ */ $('<div class="klinecharts-pro-loading"><i class="circle1"></i><i class="circle2"></i><i class="circle3"></i></div>'), $9 = () => dl.cloneNode(!0), hl = /* @__PURE__ */ $('<div class="klinecharts-pro-empty"><svg class="icon" viewBox="0 0 1024 1024"><path d="M855.6 427.2H168.5c-12.7 0-24.4 6.9-30.6 18L4.4 684.7C1.5 689.9 0 695.8 0 701.8v287.1c0 19.4 15.7 35.1 35.1 35.1H989c19.4 0 35.1-15.7 35.1-35.1V701.8c0-6-1.5-11.8-4.4-17.1L886.2 445.2c-6.2-11.1-17.9-18-30.6-18zM673.4 695.6c-16.5 0-30.8 11.5-34.3 27.7-12.7 58.5-64.8 102.3-127.2 102.3s-114.5-43.8-127.2-102.3c-3.5-16.1-17.8-27.7-34.3-27.7H119c-26.4 0-43.3-28-31.1-51.4l81.7-155.8c6.1-11.6 18-18.8 31.1-18.8h622.4c13 0 25 7.2 31.1 18.8l81.7 155.8c12.2 23.4-4.7 51.4-31.1 51.4H673.4zM819.9 209.5c-1-1.8-2.1-3.7-3.2-5.5-9.8-16.6-31.1-22.2-47.8-12.6L648.5 261c-17 9.8-22.7 31.6-12.6 48.4 0.9 1.4 1.7 2.9 2.5 4.4 9.5 17 31.2 22.8 48 13L807 257.3c16.7-9.7 22.4-31 12.9-47.8zM375.4 261.1L255 191.6c-16.7-9.6-38-4-47.8 12.6-1.1 1.8-2.1 3.6-3.2 5.5-9.5 16.8-3.8 38.1 12.9 47.8L337.3 327c16.9 9.7 38.6 4 48-13.1 0.8-1.5 1.7-2.9 2.5-4.4 10.2-16.8 4.5-38.6-12.4-48.4zM512 239.3h2.5c19.5 0.3 35.5-15.5 35.5-35.1v-139c0-19.3-15.6-34.9-34.8-35.1h-6.4C489.6 30.3 474 46 474 65.2v139c0 19.5 15.9 35.4 35.5 35.1h2.5z"></path></svg></div>'), fl = () => hl.cloneNode(!0), ml = /* @__PURE__ */ $("<ul></ul>"), gl = /* @__PURE__ */ $("<li></li>"), Gt = (e) => (() => {
  const n = ml.cloneNode(!0);
  return C(n, L(J, {
    get when() {
      return e.loading;
    },
    get children() {
      return L($9, {});
    }
  }), null), C(n, L(J, {
    get when() {
      var t;
      return !e.loading && !e.children && !((t = e.dataSource) != null && t.length);
    },
    get children() {
      return L(fl, {});
    }
  }), null), C(n, L(J, {
    get when() {
      return e.children;
    },
    get children() {
      return e.children;
    }
  }), null), C(n, L(J, {
    get when() {
      return !e.children;
    },
    get children() {
      var t;
      return (t = e.dataSource) == null ? void 0 : t.map((o) => {
        var s;
        return ((s = e.renderItem) == null ? void 0 : s.call(e, o)) ?? gl.cloneNode(!0);
      });
    }
  }), null), I((t) => {
    const o = e.style, s = `klinecharts-pro-list ${e.class ?? ""}`;
    return t._v$ = N1(n, o, t._v$), s !== t._v$2 && oe(n, t._v$2 = s), t;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), n;
})(), yl = /* @__PURE__ */ $('<div class="klinecharts-pro-modal"><div class="inner"><div class="title-container"><svg class="close-icon" viewBox="0 0 1024 1024"><path d="M934.184927 199.723787 622.457206 511.452531l311.727721 311.703161c14.334473 14.229073 23.069415 33.951253 23.069415 55.743582 0 43.430138-35.178197 78.660524-78.735226 78.660524-21.664416 0-41.361013-8.865925-55.642275-23.069415L511.149121 622.838388 199.420377 934.490384c-14.204513 14.20349-33.901111 23.069415-55.642275 23.069415-43.482327 0-78.737272-35.230386-78.737272-78.660524 0-21.792329 8.864902-41.513486 23.094998-55.743582l311.677579-311.703161L88.135828 199.723787c-14.230096-14.255679-23.094998-33.92567-23.094998-55.642275 0-43.430138 35.254945-78.762855 78.737272-78.762855 21.741163 0 41.437761 8.813736 55.642275 23.069415l311.727721 311.727721L822.876842 88.389096c14.281261-14.255679 33.977859-23.069415 55.642275-23.069415 43.557028 0 78.735226 35.332716 78.735226 78.762855C957.254342 165.798117 948.5194 185.468109 934.184927 199.723787"></path></svg></div><div class="content-container"></div></div></div>'), pl = /* @__PURE__ */ $('<div class="button-container"></div>'), _1 = (e) => (() => {
  const n = yl.cloneNode(!0), t = n.firstChild, o = t.firstChild, s = o.firstChild, l = o.nextSibling;
  return n.$$click = (h) => {
    h.target === h.currentTarget && e.onClose && e.onClose();
  }, C(o, () => e.title, s), i1(s, "click", e.onClose, !0), C(l, () => e.children), C(t, (() => {
    const h = Z(() => !!(e.buttons && e.buttons.length > 0));
    return () => h() && (() => {
      const d = pl.cloneNode(!0);
      return C(d, () => e.buttons.map((v) => L(ol, qr(v, {
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
      })))), I((v) => {
        const x = e.btnParentStyle, p = !!e.isMobile;
        return v._v$8 = N1(d, x, v._v$8), p !== v._v$9 && d.classList.toggle("mobile-buttons", v._v$9 = p), v;
      }, {
        _v$8: void 0,
        _v$9: void 0
      }), d;
    })();
  })(), null), I((h) => {
    const d = !!e.isMobile, v = e.isMobile ? "100%" : `${e.width ?? 400}px`, x = (e.isMobile, "auto"), p = e.isMobile ? "60vh" : "90vh", w = !!e.isMobile, M = !!e.isMobile, D = !!e.isMobile;
    return d !== h._v$ && n.classList.toggle("mobile-modal", h._v$ = d), v !== h._v$2 && t.style.setProperty("width", h._v$2 = v), x !== h._v$3 && t.style.setProperty("height", h._v$3 = x), p !== h._v$4 && t.style.setProperty("max-height", h._v$4 = p), w !== h._v$5 && t.classList.toggle("mobile-inner", h._v$5 = w), M !== h._v$6 && o.classList.toggle("mobile-title", h._v$6 = M), D !== h._v$7 && l.classList.toggle("mobile-content", h._v$7 = D), h;
  }, {
    _v$: void 0,
    _v$2: void 0,
    _v$3: void 0,
    _v$4: void 0,
    _v$5: void 0,
    _v$6: void 0,
    _v$7: void 0
  }), n;
})();
Ze(["click"]);
const vl = /* @__PURE__ */ $('<div tabindex="0"><div class="selector-container"><span class="value"></span><i class="arrow"></i></div></div>'), Cl = /* @__PURE__ */ $('<div class="drop-down-container"><ul></ul></div>'), bl = /* @__PURE__ */ $('<div><input type="text"></div>'), $l = /* @__PURE__ */ $("<li></li>"), _9 = (e) => {
  const [n, t] = T(!1), [o, s] = T("");
  let l, h;
  const d = Z(() => {
    if (!e.dataSource || !e.searchable)
      return e.dataSource;
    const p = o().toLowerCase().trim();
    return p ? typeof e.dataSource[0] == "string" ? e.dataSource.filter((M) => M.toLowerCase().includes(p)) : e.dataSource.filter((M) => {
      var B, O;
      const D = ((B = M.text) == null ? void 0 : B.toString().toLowerCase()) || "", U = ((O = M.key) == null ? void 0 : O.toLowerCase()) || "";
      return D.includes(p) || U.includes(p);
    }) : e.dataSource;
  }), v = () => {
    const p = !n();
    t(p), s(""), p && e.searchable && setTimeout(() => l == null ? void 0 : l.focus(), 50);
  }, x = (p) => {
    const w = p.relatedTarget;
    h && w && h.contains(w) || (t(!1), s(""));
  };
  return (() => {
    const p = vl.cloneNode(!0), w = p.firstChild, M = w.firstChild;
    p.addEventListener("blur", x), p.$$click = (U) => {
      U.stopPropagation(), v();
    };
    const D = h;
    return typeof D == "function" ? D1(D, p) : h = p, C(M, () => e.value), C(p, (() => {
      const U = Z(() => !!(e.dataSource && e.dataSource.length > 0));
      return () => U() && (() => {
        const B = Cl.cloneNode(!0), O = B.firstChild;
        return B.$$mousedown = (j) => j.preventDefault(), C(B, (() => {
          const j = Z(() => !!e.searchable);
          return () => j() && (() => {
            const ee = bl.cloneNode(!0), R = ee.firstChild;
            ee.style.setProperty("padding", "8px"), ee.style.setProperty("border-bottom", "1px solid #333"), R.$$click = (V) => V.stopPropagation(), R.$$input = (V) => s(V.currentTarget.value);
            const W = l;
            return typeof W == "function" ? D1(W, R) : l = R, R.style.setProperty("width", "100%"), R.style.setProperty("padding", "6px 10px"), R.style.setProperty("border", "1px solid var(--klinecharts-pro-border-color)"), R.style.setProperty("border-radius", "4px"), R.style.setProperty("background-color", "var(--klinecharts-pro-popover-background-color)"), R.style.setProperty("color", "#fff"), R.style.setProperty("font-size", "13px"), R.style.setProperty("outline", "none"), I(() => Se(R, "placeholder", e.searchPlaceholder || "Search...")), I(() => R.value = o()), ee;
          })();
        })(), O), C(O, () => {
          var j;
          return (j = d()) == null ? void 0 : j.map((ee) => {
            const W = ee[e.valueKey ?? "text"] ?? ee;
            return (() => {
              const V = $l.cloneNode(!0);
              return V.$$click = (he) => {
                var K;
                he.stopPropagation(), e.value !== W && ((K = e.onSelected) == null || K.call(e, ee)), t(!1), s("");
              }, C(V, W), I(() => V.classList.toggle("selected", e.value === W)), V;
            })();
          });
        }), B;
      })();
    })(), null), I((U) => {
      const B = e.style, O = `klinecharts-pro-select ${e.class ?? ""} ${n() ? "klinecharts-pro-select-show" : ""}`;
      return U._v$ = N1(p, B, U._v$), O !== U._v$2 && oe(p, U._v$2 = O), U;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), p;
  })();
};
Ze(["click", "mousedown", "input"]);
const _l = /* @__PURE__ */ $('<span class="prefix"></span>'), kl = /* @__PURE__ */ $('<span class="suffix"></span>'), xl = /* @__PURE__ */ $('<div><input class="value"></div>'), k9 = (e) => {
  const n = qr({
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER
  }, e);
  let t;
  const [o, s] = T("normal");
  return (() => {
    const l = xl.cloneNode(!0), h = l.firstChild;
    return l.$$click = () => {
      t == null || t.focus();
    }, C(l, L(J, {
      get when() {
        return n.prefix;
      },
      get children() {
        const d = _l.cloneNode(!0);
        return C(d, () => n.prefix), d;
      }
    }), h), h.addEventListener("change", (d) => {
      var x, p;
      const v = d.target.value;
      if ("precision" in n) {
        let w;
        const M = Math.max(0, Math.floor(n.precision));
        M <= 0 ? w = new RegExp(/^[1-9]\d*$/) : w = new RegExp("^\\d+\\.?\\d{0," + M + "}$"), (v === "" || w.test(v) && +v >= n.min && +v <= n.max) && ((x = n.onChange) == null || x.call(n, v === "" ? v : +v));
      } else
        (p = n.onChange) == null || p.call(n, v);
    }), h.addEventListener("blur", () => {
      s("normal");
    }), h.addEventListener("focus", () => {
      s("focus");
    }), D1((d) => {
      t = d;
    }, h), C(l, L(J, {
      get when() {
        return n.suffix;
      },
      get children() {
        const d = kl.cloneNode(!0);
        return C(d, () => n.suffix), d;
      }
    }), null), I((d) => {
      const v = n.style, x = `klinecharts-pro-input ${n.class ?? ""}`, p = o(), w = n.placeholder ?? "";
      return d._v$ = N1(l, v, d._v$), x !== d._v$2 && oe(l, d._v$2 = x), p !== d._v$3 && Se(l, "data-status", d._v$3 = p), w !== d._v$4 && Se(h, "placeholder", d._v$4 = w), d;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0
    }), I(() => h.value = n.value), l;
  })();
};
Ze(["click"]);
const Ll = /* @__PURE__ */ $('<div><i class="thumb"></i></div>'), wl = (e) => (() => {
  const n = Ll.cloneNode(!0);
  return n.$$click = (t) => {
    e.onChange && e.onChange();
  }, I((t) => {
    const o = e.style, s = `klinecharts-pro-switch ${e.open ? "turn-on" : "turn-off"} ${e.class ?? ""}`;
    return t._v$ = N1(n, o, t._v$), s !== t._v$2 && oe(n, t._v$2 = s), t;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), n;
})();
Ze(["click"]);
const Al = "指标", Ml = "更多", Tl = "主图指标", Sl = "副图指标", Pl = "设置", Dl = "时区", Ol = "截屏", Nl = "全屏", Il = "退出全屏", El = "保存", Bl = "确定", Fl = "取消", Ul = "MA(移动平均线)", Rl = "EMA(指数平滑移动平均线)", zl = "SMA", Kl = "BOLL(布林线)", jl = "BBI(多空指数)", Ql = "SAR(停损点指向指标)", Zl = "VOL(成交量)", Vl = "MACD(指数平滑异同移动平均线)", Hl = "KDJ(随机指标)", ql = "RSI(相对强弱指标)", Yl = "BIAS(乖离率)", Wl = "BRAR(情绪指标)", Gl = "CCI(顺势指标)", Xl = "DMI(动向指标)", Jl = "CR(能量指标)", e4 = "PSY(心理线)", t4 = "DMA(平行线差指标)", n4 = "TRIX(三重指数平滑平均线)", r4 = "OBV(能量潮指标)", o4 = "VR(成交量变异率)", i4 = "WR(威廉指标)", a4 = "MTM(动量指标)", s4 = "EMV(简易波动指标)", l4 = "ROC(变动率指标)", c4 = "PVT(价量趋势指标)", u4 = "AO(动量震荡指标)", d4 = "世界统一时间", h4 = "(UTC-10) 檀香山", f4 = "(UTC-8) 朱诺", m4 = "(UTC-7) 洛杉矶", g4 = "(UTC-5) 芝加哥", y4 = "(UTC-4) 多伦多", p4 = "(UTC-3) 圣保罗", v4 = "(UTC+1) 伦敦", C4 = "(UTC+2) 柏林", b4 = "(UTC+3) 巴林", $4 = "(UTC+4) 迪拜", _4 = "(UTC+5) 阿什哈巴德", k4 = "(UTC+6) 阿拉木图", x4 = "(UTC+7) 曼谷", L4 = "(UTC+8) 上海", w4 = "(UTC+9) 东京", A4 = "(UTC+10) 悉尼", M4 = "(UTC+12) 诺福克岛", T4 = "水平直线", S4 = "水平射线", P4 = "水平线段", D4 = "垂直直线", O4 = "垂直射线", N4 = "垂直线段", I4 = "直线", E4 = "射线", B4 = "线段", F4 = "箭头", U4 = "价格线", R4 = "价格通道线", z4 = "平行直线", K4 = "斐波那契回调直线", j4 = "斐波那契回调线段", Q4 = "斐波那契圆环", Z4 = "斐波那契螺旋", V4 = "斐波那契速度阻力扇", H4 = "斐波那契趋势扩展", q4 = "江恩箱", Y4 = "矩形", W4 = "平行四边形", G4 = "圆", X4 = "三角形", J4 = "三浪", ec = "五浪", tc = "八浪", nc = "任意浪", rc = "ABCD形态", oc = "XABCD形态", ic = "弱磁模式", ac = "强磁模式", sc = "商品搜索", lc = "商品代码", cc = "参数1", uc = "参数2", dc = "参数3", hc = "参数4", fc = "参数5", mc = "周期", gc = "标准差", yc = "蜡烛图类型", pc = "全实心", vc = "全空心", Cc = "涨空心", bc = "跌空心", $c = "OHLC", _c = "面积图", kc = "最新价显示", xc = "最高价显示", Lc = "最低价显示", wc = "指标最新值显示", Ac = "价格轴类型", Mc = "线性轴", Tc = "百分比轴", Sc = "对数轴", Pc = "倒置坐标", Dc = "网格线显示", Oc = "恢复默认", Nc = {
  indicator: Al,
  more: Ml,
  main_indicator: Tl,
  sub_indicator: Sl,
  setting: Pl,
  timezone: Dl,
  screenshot: Ol,
  full_screen: Nl,
  exit_full_screen: Il,
  save: El,
  confirm: Bl,
  cancel: Fl,
  ma: Ul,
  ema: Rl,
  sma: zl,
  boll: Kl,
  bbi: jl,
  sar: Ql,
  vol: Zl,
  macd: Vl,
  kdj: Hl,
  rsi: ql,
  bias: Yl,
  brar: Wl,
  cci: Gl,
  dmi: Xl,
  cr: Jl,
  psy: e4,
  dma: t4,
  trix: n4,
  obv: r4,
  vr: o4,
  wr: i4,
  mtm: a4,
  emv: s4,
  roc: l4,
  pvt: c4,
  ao: u4,
  utc: d4,
  honolulu: h4,
  juneau: f4,
  los_angeles: m4,
  chicago: g4,
  toronto: y4,
  sao_paulo: p4,
  london: v4,
  berlin: C4,
  bahrain: b4,
  dubai: $4,
  ashkhabad: _4,
  almaty: k4,
  bangkok: x4,
  shanghai: L4,
  tokyo: w4,
  sydney: A4,
  norfolk: M4,
  horizontal_straight_line: T4,
  horizontal_ray_line: S4,
  horizontal_segment: P4,
  vertical_straight_line: D4,
  vertical_ray_line: O4,
  vertical_segment: N4,
  straight_line: I4,
  ray_line: E4,
  segment: B4,
  arrow: F4,
  price_line: U4,
  price_channel_line: R4,
  parallel_straight_line: z4,
  fibonacci_line: K4,
  fibonacci_segment: j4,
  fibonacci_circle: Q4,
  fibonacci_spiral: Z4,
  fibonacci_speed_resistance_fan: V4,
  fibonacci_extension: H4,
  gann_box: q4,
  rect: Y4,
  parallelogram: W4,
  circle: G4,
  triangle: X4,
  three_waves: J4,
  five_waves: ec,
  eight_waves: tc,
  any_waves: nc,
  abcd: rc,
  xabcd: oc,
  weak_magnet: ic,
  strong_magnet: ac,
  symbol_search: sc,
  symbol_code: lc,
  params_1: cc,
  params_2: uc,
  params_3: dc,
  params_4: hc,
  params_5: fc,
  period: mc,
  standard_deviation: gc,
  candle_type: yc,
  candle_solid: pc,
  candle_stroke: vc,
  candle_up_stroke: Cc,
  candle_down_stroke: bc,
  ohlc: $c,
  area: _c,
  last_price_show: kc,
  high_price_show: xc,
  low_price_show: Lc,
  indicator_last_value_show: wc,
  price_axis_type: Ac,
  normal: Mc,
  percentage: Tc,
  log: Sc,
  reverse_coordinate: Pc,
  grid_show: Dc,
  restore_default: Oc
}, Ic = "Indicator", Ec = "More", Bc = "Main Indicator", Fc = "Sub Indicator", Uc = "Setting", Rc = "Timezone", zc = "Screenshot", Kc = "Full Screen", jc = "Exit", Qc = "Save", Zc = "Confirm", Vc = "Cancel", Hc = "MA(Moving Average)", qc = "EMA(Exponential Moving Average)", Yc = "SMA", Wc = "BOLL(Bolinger Bands)", Gc = "BBI(Bull And Bearlndex)", Xc = "SAR(Stop and Reverse)", Jc = "VOL(Volume)", eu = "MACD(Moving Average Convergence / Divergence)", tu = "KDJ(KDJ Index)", nu = "RSI(Relative Strength Index)", ru = "BIAS(Bias Ratio)", ou = "BRAR(情绪指标)", iu = "CCI(Commodity Channel Index)", au = "DMI(Directional Movement Index)", su = "CR(能量指标)", lu = "PSY(Psychological Line)", cu = "DMA(Different of Moving Average)", uu = "TRIX(Triple Exponentially Smoothed Moving Average)", du = "OBV(On Balance Volume)", hu = "VR(Volatility Volume Ratio)", fu = "WR(Williams %R)", mu = "MTM(Momentum Index)", gu = "EMV(Ease of Movement Value)", yu = "ROC(Price Rate of Change)", pu = "PVT(Price and Volume Trend)", vu = "AO(Awesome Oscillator)", Cu = "UTC", bu = "(UTC-10) Honolulu", $u = "(UTC-8) Juneau", _u = "(UTC-7) Los Angeles", ku = "(UTC-5) Chicago", xu = "(UTC-4) Toronto", Lu = "(UTC-3) Sao Paulo", wu = "(UTC+1) London", Au = "(UTC+2) Berlin", Mu = "(UTC+3) Bahrain", Tu = "(UTC+4) Dubai", Su = "(UTC+5) Ashkhabad", Pu = "(UTC+6) Almaty", Du = "(UTC+7) Bangkok", Ou = "(UTC+8) Shanghai", Nu = "(UTC+9) Tokyo", Iu = "(UTC+10) Sydney", Eu = "(UTC+12) Norfolk", Bu = "Horizontal Line", Fu = "Horizontal Ray", Uu = "Horizontal Segment", Ru = "Vertical Line", zu = "Vertical Ray", Ku = "Vertical Segment", ju = "Trend Line", Qu = "Ray", Zu = "Segment", Vu = "Arrow", Hu = "Price Line", qu = "Price Channel Line", Yu = "Parallel Line", Wu = "Fibonacci Line", Gu = "Fibonacci Segment", Xu = "Fibonacci Circle", Ju = "Fibonacci Spiral", ed = "Fibonacci Sector", td = "Fibonacci Extension", nd = "Gann Box", rd = "Rect", od = "Parallelogram", id = "Circle", ad = "Triangle", sd = "Three Waves", ld = "Five Waves", cd = "Eight Waves", ud = "Any Waves", dd = "ABCD Pattern", hd = "XABCD Pattern", fd = "Weak Magnet", md = "Strong Magnet", gd = "Symbol Search", yd = "Symbol Code", pd = "Parameter 1", vd = "Parameter 2", Cd = "Parameter 3", bd = "Parameter 4", $d = "Parameter 5", _d = "Period", kd = "Standard Deviation", xd = "Candle Type", Ld = "Candle Solid", wd = "Candle Stroke", Ad = "Candle Up Stroke", Md = "Candle Down Stroke", Td = "OHLC", Sd = "Area", Pd = "Show Last Price", Dd = "Show Highest Price", Od = "Show Lowest Price", Nd = "Show indicator's last value", Id = "Price Axis Type", Ed = "Normal", Bd = "Percentage", Fd = "Log", Ud = "Reverse Coordinate", Rd = "Show Grids", zd = "Restore Defaults", Kd = {
  indicator: Ic,
  more: Ec,
  main_indicator: Bc,
  sub_indicator: Fc,
  setting: Uc,
  timezone: Rc,
  screenshot: zc,
  full_screen: Kc,
  exit_full_screen: jc,
  save: Qc,
  confirm: Zc,
  cancel: Vc,
  ma: Hc,
  ema: qc,
  sma: Yc,
  boll: Wc,
  bbi: Gc,
  sar: Xc,
  vol: Jc,
  macd: eu,
  kdj: tu,
  rsi: nu,
  bias: ru,
  brar: ou,
  cci: iu,
  dmi: au,
  cr: su,
  psy: lu,
  dma: cu,
  trix: uu,
  obv: du,
  vr: hu,
  wr: fu,
  mtm: mu,
  emv: gu,
  roc: yu,
  pvt: pu,
  ao: vu,
  utc: Cu,
  honolulu: bu,
  juneau: $u,
  los_angeles: _u,
  chicago: ku,
  toronto: xu,
  sao_paulo: Lu,
  london: wu,
  berlin: Au,
  bahrain: Mu,
  dubai: Tu,
  ashkhabad: Su,
  almaty: Pu,
  bangkok: Du,
  shanghai: Ou,
  tokyo: Nu,
  sydney: Iu,
  norfolk: Eu,
  horizontal_straight_line: Bu,
  horizontal_ray_line: Fu,
  horizontal_segment: Uu,
  vertical_straight_line: Ru,
  vertical_ray_line: zu,
  vertical_segment: Ku,
  straight_line: ju,
  ray_line: Qu,
  segment: Zu,
  arrow: Vu,
  price_line: Hu,
  price_channel_line: qu,
  parallel_straight_line: Yu,
  fibonacci_line: Wu,
  fibonacci_segment: Gu,
  fibonacci_circle: Xu,
  fibonacci_spiral: Ju,
  fibonacci_speed_resistance_fan: ed,
  fibonacci_extension: td,
  gann_box: nd,
  rect: rd,
  parallelogram: od,
  circle: id,
  triangle: ad,
  three_waves: sd,
  five_waves: ld,
  eight_waves: cd,
  any_waves: ud,
  abcd: dd,
  xabcd: hd,
  weak_magnet: fd,
  strong_magnet: md,
  symbol_search: gd,
  symbol_code: yd,
  params_1: pd,
  params_2: vd,
  params_3: Cd,
  params_4: bd,
  params_5: $d,
  period: _d,
  standard_deviation: kd,
  candle_type: xd,
  candle_solid: Ld,
  candle_stroke: wd,
  candle_up_stroke: Ad,
  candle_down_stroke: Md,
  ohlc: Td,
  area: Sd,
  last_price_show: Pd,
  high_price_show: Dd,
  low_price_show: Od,
  indicator_last_value_show: Nd,
  price_axis_type: Id,
  normal: Ed,
  percentage: Bd,
  log: Fd,
  reverse_coordinate: Ud,
  grid_show: Rd,
  restore_default: zd
}, x9 = {
  "zh-CN": Nc,
  "en-US": Kd
};
function Hm(e, n) {
  x9[e] = n;
}
const c = (e, n) => {
  var t;
  return ((t = x9[n]) == null ? void 0 : t[e]) ?? e;
}, jd = /* @__PURE__ */ $('<div class="scroll-indicator left"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg></div>'), Qd = /* @__PURE__ */ $('<img alt="symbol">'), Zd = /* @__PURE__ */ $('<div class="symbol"><span></span></div>'), Vd = /* @__PURE__ */ $('<span class="down-arrow-icon mobile-separate-arrow"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></span>'), Hd = /* @__PURE__ */ $('<span class="mobile-more-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg></span>'), qd = /* @__PURE__ */ $('<div class="item tools" title="Time Tools"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M16 3v4"></path><path d="M8 3v4"></path><path d="M3 10h18"></path><path d="M12 14v4"></path><path d="M10 16h4"></path></svg></div>'), Yd = /* @__PURE__ */ $('<div class="item tools"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div>'), Wd = /* @__PURE__ */ $('<div class="klinecharts-pro-order-tools-display-menu"></div>'), Gd = /* @__PURE__ */ $('<div class="klinecharts-pro-order-tools-popover"><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Quick Order</span></span><span class="klinecharts-pro-order-tools-chevron">›</span></button><div class="klinecharts-pro-order-tools-submenu"><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Floating Window</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Plus Button</span></label></div></div><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Open Orders</span></span><span class="klinecharts-pro-order-tools-chevron">&rsaquo;</span></button><div class="klinecharts-pro-order-tools-submenu"><div class="klinecharts-pro-order-tools-setting-row"><span class="klinecharts-pro-order-tools-label">Extended Price Line</span><button type="button"><span></span></button></div><div class="klinecharts-pro-order-tools-setting-row"><span class="klinecharts-pro-order-tools-label">Display</span><div class="klinecharts-pro-order-tools-display"><button type="button" class="klinecharts-pro-order-tools-display-button"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4"></path></svg></button></div></div></div></div><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Positions</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Breakeven Price</span></label> <label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Liquidation Price</span></label><div><button type="button" class="klinecharts-pro-order-tools-item klinecharts-pro-order-tools-group-title"><span class="klinecharts-pro-order-tools-title-left"><label class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></label><span class="klinecharts-pro-order-tools-label">Price Line</span></span><span class="klinecharts-pro-order-tools-chevron">&rsaquo;</span></button><div class="klinecharts-pro-order-tools-submenu"><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Market Price Line</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Count Down</span></label><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Bid & Ask Price</span></label></div></div><label class="klinecharts-pro-order-tools-item"><span class="klinecharts-pro-order-tools-checkbox-box"><input class="klinecharts-pro-order-tools-checkbox-input" type="checkbox"><span class="klinecharts-pro-order-tools-checkbox-fill"></span></span><span class="klinecharts-pro-order-tools-label">Order History</span></label></div>'), Xd = /* @__PURE__ */ $('<div><div class="item tools order-tools-trigger"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Orders"><path d="M4 7h10"></path><path d="M4 12h8"></path><path d="M4 17h6"></path><path d="M18 6v12"></path><path d="M15 15l3 3 3-3"></path></svg><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9L12 15L18 9"></path></svg></div></div>'), Jd = /* @__PURE__ */ $('<div class="item tools"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path><path d="M15.22299772857666,9.722223632261718C12.59389772857666,9.722223632261718,10.44600772857666,12.020201374511718,10.44600772857666,14.861111374511719C10.44600772857666,17.70202137451172,12.58215772857666,20.000021374511718,15.223007728576661,20.000021374511718C17.86384772857666,20.000021374511718,19.99999772857666,17.70202137451172,19.99999772857666,14.861111374511719C19.99999772857666,12.020201374511718,17.85211772857666,9.72222212709572,15.22299772857666,9.722223632261718ZM15.22299772857666,18.598491374511717C13.30985772857666,18.598491374511717,11.737087728576661,16.91919137451172,11.737087728576661,14.848481374511719C11.737087728576661,12.777781374511719,13.29811772857666,11.098491374511719,15.22299772857666,11.098491374511719C17.14787772857666,11.098491374511719,18.708917728576658,12.777781374511719,18.708917728576658,14.848481374511719C18.708917728576658,16.91919137451172,17.13614772857666,18.59848137451172,15.22299772857666,18.598491374511717Z"></path><path d="M15.692486288146974,15.050496970825195L15.692486288146974,12.676760970825196C15.692486288146974,12.297972970825196,15.399058288146973,11.982316970825195,15.046945288146972,11.982316970825195C14.694833288146972,11.982316970825195,14.401406288146973,12.297972970825196,14.401406288146973,12.676760970825196L14.401406288146973,15.340896970825195C14.401406288146973,15.530296970825194,14.471829288146973,15.694436970825196,14.589200288146973,15.833326970825196L15.751176288146972,17.095956970825195C15.868546288146973,17.222216970825194,16.032866288146973,17.297976970825196,16.208916288146973,17.297976970825196C16.384976288146973,17.297976970825196,16.537556288146973,17.222216970825194,16.666666288146974,17.095956970825195C16.78403628814697,16.969686970825194,16.854456288146974,16.792916970825196,16.854456288146974,16.603526970825193C16.854456288146974,16.414136970825197,16.78403628814697,16.237366970825196,16.666666288146974,16.111106970825197L15.692486288146974,15.050496970825195Z"></path></svg></div>'), eh = /* @__PURE__ */ $('<div class="item tools"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg></div>'), th = /* @__PURE__ */ $('<div class="item tools"><svg viewBox="0 0 20 20"><path d="M6.50977,1L13.4902,1C13.6406,1,13.7695,1.1104910000000001,13.7969,1.2631700000000001L14.0273,2.52277C14.1387,3.13147,14.6543,3.57143,15.2559,3.57143L17.5,3.57143C18.8809,3.57143,20,4.72254,20,6.14286L20,16.4286C20,17.8489,18.8809,19,17.5,19L2.5,19C1.11914,19,0,17.8489,0,16.4286L0,6.14286C0,4.72254,1.11914,3.57143,2.5,3.57143L4.74414,3.57143C5.3457,3.57143,5.86133,3.13147,5.97266,2.52277L6.20312,1.2631700000000001C6.23047,1.1104910000000001,6.35937,1,6.50977,1ZM15.2559,4.857139999999999C14.0547,4.857139999999999,13.0215,3.97522,12.7988,2.75982L12.7129,2.28571L7.28711,2.28571L7.20117,2.75982C6.98047,3.97522,5.94727,4.857139999999999,4.74414,4.857139999999999L2.5,4.857139999999999C1.81055,4.857139999999999,1.25,5.43371,1.25,6.14286L1.25,16.4286C1.25,17.1377,1.81055,17.7143,2.5,17.7143L17.5,17.7143C18.1895,17.7143,18.75,17.1377,18.75,16.4286L18.75,6.14286C18.75,5.43371,18.1895,4.857139999999999,17.5,4.857139999999999L15.2559,4.857139999999999ZM4.375,6.78571L3.125,6.78571C2.7793,6.78571,2.5,6.49844,2.5,6.14286C2.5,5.78728,2.7793,5.5,3.125,5.5L4.375,5.5C4.7207,5.5,5,5.78728,5,6.14286C5,6.49844,4.7207,6.78571,4.375,6.78571ZM10,6.14286C7.06641,6.14286,4.6875,8.58973,4.6875,11.6071C4.6875,14.6246,7.06641,17.0714,10,17.0714C12.9336,17.0714,15.3125,14.6246,15.3125,11.6071C15.3125,8.58973,12.9336,6.14286,10,6.14286ZM10,7.42857C11.0859,7.42857,12.1055,7.8625,12.873,8.65201C13.6406,9.44152,14.0625,10.49018,14.0625,11.6071C14.0625,12.7241,13.6406,13.7728,12.873,14.5623C12.1055,15.3518,11.0859,15.7857,10,15.7857C8.91406,15.7857,7.89453,15.3518,7.12695,14.5623C6.35937,13.7728,5.9375,12.7241,5.9375,11.6071C5.9375,10.49018,6.35938,9.44152,7.12695,8.65201C7.89453,7.8625,8.91406,7.42857,10,7.42857ZM10,9.67857C8.96484,9.67857,8.125,10.54241,8.125,11.6071C8.125,12.6719,8.96484,13.5357,10,13.5357C11.0352,13.5357,11.875,12.6719,11.875,11.6071C11.875,10.54241,11.0352,9.67857,10,9.67857ZM10,10.96429C10.3438,10.96429,10.625,11.2536,10.625,11.6071C10.625,11.9607,10.3438,12.25,10,12.25C9.65625,12.25,9.375,11.9607,9.375,11.6071C9.375,11.2536,9.65625,10.96429,10,10.96429Z"></path></svg></div>'), nh = /* @__PURE__ */ $('<div class="item tools chart-view-toggle"></div>'), rh = /* @__PURE__ */ $('<div class="scroll-indicator right"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"></path></svg></div>'), oh = /* @__PURE__ */ $('<div><div class="klinecharts-pro-period-bar"><div class="menu-container"><svg viewBox="0 0 1024 1024"><path d="M192.037 287.953h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 479.169H438.553c-17.673 0-32 14.327-32 32s14.327 32 32 32h393.608c17.673 0 32-14.327 32-32s-14.327-32-32-32zM832.161 735.802H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32zM319.028 351.594l-160 160 160 160z"></path></svg></div><div><div class="item tools fullscreen-toggle"></div></div></div></div>'), ih = /* @__PURE__ */ $("<span></span>"), ah = /* @__PURE__ */ $('<button type="button"></button>'), sh = /* @__PURE__ */ $('<svg viewBox="0 0 20 20"><path d="M1.08108,0L0,1.079L4.18919,5.27938L2.54826,6.91715L6.9112,6.91715L6.9112,2.56262L5.28957,4.18112L1.08108,0ZM15.8108,5.27938L20,1.079L18.9189,0L14.7104,4.18112L13.0888,2.56262L13.0888,6.91715L17.4517,6.91715L15.8108,5.27938ZM4.16988,14.7014L0.07722,18.8054L1.1583,20L5.27027,15.7996L6.9112,17.4374L6.9112,13.0829L2.54826,13.0829L4.16988,14.7014ZM17.4517,13.0829L13.0888,13.0829L13.0888,17.4374L14.7297,15.7996L18.8417,20L19.9228,18.8054L15.8301,14.7013L17.4517,13.0829Z"></path></svg>'), lh = /* @__PURE__ */ $('<svg viewBox="0 0 20 20"><path d="M2.93444,1.76899L7.57544,6.40999L6.38918,7.59626L1.76899,2.93444L0,4.70343L0,0L4.70343,0L2.93444,1.76899ZM6.40999,12.4037L1.76899,17.0447L0,15.2758L0,19.9792L4.70343,19.9792L2.93444,18.2102L7.57544,13.5692L6.40999,12.4037ZM15.2758,0L17.0447,1.76899L12.4037,6.40999L13.59,7.59626L18.231,2.95526L20,4.72425L20,0L15.2758,0ZM13.5692,12.4037L12.3829,13.59L17.0239,18.231L15.2549,20L19.9792,20L19.9792,15.2758L18.2102,17.0447L13.5692,12.4037Z"></path></svg>'), ch = /* @__PURE__ */ $('<svg viewBox="0 0 24 24"><path d="M3 20V7l4 3 5-7 5 4h4v13H3Zm5-3 4-5.5 7 5.45V9h-2.7l-3.9-3.1-4.95 6.95L5 10.4V14l3 3Z"></path></svg>'), uh = /* @__PURE__ */ $('<svg viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M9 4H7v2H5v12h2v2h2v-2h2V6H9zM19 8h-2V4h-2v4h-2v7h2v5h2v-5h2z"></path></svg>'), Sr = (e) => e.charAt(0).toUpperCase() + e.slice(1), dh = (e) => {
  let n, t, o;
  const [s, l] = T(window.innerWidth < 768), [h, d] = T(localStorage.getItem("klinechart_secondary_period") || ""), [v, x] = T(!1), [p, w] = T(!1), [M, D] = T(!1), [U, B] = T(!1), [O, j] = T(!1), [ee, R] = T({
    top: 0,
    left: 0,
    minWidth: 220
  }), W = () => {
    l(window.innerWidth < 768), requestAnimationFrame(ne), v() && xe();
  }, [V, he] = T(!1), K = () => document.fullscreenElement ?? document.body, Q = () => {
    he(!!document.fullscreenElement);
  }, [q, re] = T(!1), [se, _e] = T(!1), xe = () => {
    if (!t)
      return;
    const N = t.getBoundingClientRect(), E = Math.max(220, Math.ceil(N.width)), Ce = window.innerWidth, Pe = Math.min(Math.max(8, N.right - E), Math.max(8, Ce - E - 8));
    R({
      top: Math.ceil(N.bottom + 8),
      left: Math.ceil(Pe),
      minWidth: E
    });
  }, fe = () => {
    w(!1), D(!1), B(!1), j(!1);
  }, Fe = () => {
    x((N) => {
      const E = !N;
      return E ? queueMicrotask(xe) : fe(), E;
    });
  }, ke = (N) => {
    if (!v())
      return;
    const E = N.target;
    E && (t != null && t.contains(E) || o != null && o.contains(E) || (fe(), x(!1)));
  }, ve = () => {
    v() && xe();
  }, ne = () => {
    if (!n) {
      re(!1), _e(!1);
      return;
    }
    const N = n, E = N.scrollWidth > N.clientWidth + 2;
    re(E && N.scrollLeft > 2), _e(E && N.scrollLeft + N.clientWidth < N.scrollWidth - 2);
  };
  In(() => {
    window.addEventListener("resize", W), document.addEventListener("fullscreenchange", Q), document.addEventListener("mousedown", ke), window.addEventListener("scroll", ve, !0), document.addEventListener("mozfullscreenchange", Q), document.addEventListener("webkitfullscreenchange", Q), document.addEventListener("msfullscreenchange", Q), n && (n.addEventListener("scroll", ne), setTimeout(ne, 100));
  }), O1(() => {
    window.removeEventListener("resize", W), document.removeEventListener("fullscreenchange", Q), document.removeEventListener("mousedown", ke), window.removeEventListener("scroll", ve, !0), document.removeEventListener("mozfullscreenchange", Q), document.removeEventListener("webkitfullscreenchange", Q), document.removeEventListener("msfullscreenchange", Q), n && n.removeEventListener("scroll", ne);
  });
  const me = Z(() => {
    const N = e.periods.filter((E) => {
      if (!s() || V())
        return !0;
      const Ce = e.period.text, Pe = h();
      if (E.text === Ce || Pe && E.text === Pe)
        return !0;
      if (!Pe || Pe === Ce) {
        const le = e.periods.find((Ie) => Ie.text !== Ce);
        return E.text === (le == null ? void 0 : le.text);
      }
      return !1;
    }).slice(0, s() && !V() ? 2 : e.periods.length);
    return setTimeout(ne, 50), N;
  });
  let H = e.period.text;
  return ze(() => {
    const N = e.period.text;
    N !== H && (s() && (d(H), localStorage.setItem("klinechart_secondary_period", H)), H = N), setTimeout(ne, 50);
  }), ze(() => {
    V(), setTimeout(ne, 100);
  }), ze(() => {
    if (!e.showOrderToolsMenu) {
      x(!1);
      return;
    }
    v() && queueMicrotask(xe);
  }), (() => {
    const N = oh.cloneNode(!0), E = N.firstChild, Ce = E.firstChild, Pe = Ce.firstChild, le = Ce.nextSibling, Ie = le.firstChild;
    return N.style.setProperty("position", "relative"), N.style.setProperty("width", "100%"), N.style.setProperty("display", "flex"), N.style.setProperty("align-items", "center"), C(N, L(J, {
      get when() {
        return q();
      },
      get children() {
        const _ = jd.cloneNode(!0);
        return _.$$click = () => n.scrollBy({
          left: -100,
          behavior: "smooth"
        }), _.style.setProperty("position", "absolute"), _.style.setProperty("left", "0"), _.style.setProperty("top", "0"), _.style.setProperty("bottom", "1px"), _.style.setProperty("width", "30px"), _.style.setProperty("display", "flex"), _.style.setProperty("align-items", "center"), _.style.setProperty("justify-content", "center"), _.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), _.style.setProperty("z-index", "10"), _.style.setProperty("cursor", "pointer"), _.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), _;
      }
    }), E), D1((_) => {
      n = _;
    }, E), E.style.setProperty("width", "100%"), E.style.setProperty("overflow", "auto"), i1(Pe, "click", e.onMenuClick, !0), C(E, L(J, {
      get when() {
        return e.symbol;
      },
      get children() {
        const _ = Zd.cloneNode(!0), ae = _.firstChild;
        return i1(_, "click", e.onSymbolClick, !0), C(_, L(J, {
          get when() {
            return e.symbol.logo;
          },
          get children() {
            const De = Qd.cloneNode(!0);
            return I(() => Se(De, "src", e.symbol.logo)), De;
          }
        }), ae), C(ae, () => e.symbol.shortName ?? e.symbol.name ?? e.symbol.ticker), _;
      }
    }), le), C(E, () => me().map((_, ae) => {
      const De = _.text === e.period.text;
      return (() => {
        const Ve = ih.cloneNode(!0);
        return Ve.$$click = (be) => {
          s() && De && !V() ? (e.onMobilePeriodClick ? e.onMobilePeriodClick(_) : e.onMenuClick(), be.stopPropagation()) : e.onPeriodChange(_);
        }, oe(Ve, `item period ${De ? "selected" : ""}`), C(Ve, () => _.text), Ve;
      })();
    }), le), C(E, L(J, {
      get when() {
        return Z(() => !!(s() && !V()))() && me().length > 1;
      },
      get children() {
        const _ = Vd.cloneNode(!0);
        return _.$$click = (ae) => {
          ae.stopPropagation(), e.onMobilePeriodClick ? e.onMobilePeriodClick(e.period) : e.onMenuClick();
        }, _.style.setProperty("margin-left", "4px"), _.style.setProperty("display", "inline-flex"), _.style.setProperty("align-items", "center"), _;
      }
    }), le), C(E, L(J, {
      get when() {
        return Z(() => !!s())() && !V();
      },
      get children() {
        const _ = Hd.cloneNode(!0);
        return _.$$click = (ae) => {
          var De;
          ae.stopPropagation(), (De = e.onMobileMoreClick) == null || De.call(e);
        }, _.style.setProperty("margin-left", "8px"), _.style.setProperty("display", "inline-flex"), _.style.setProperty("align-items", "center"), _.style.setProperty("cursor", "pointer"), _.style.setProperty("padding", "0 4px"), _;
      }
    }), le), C(E, L(J, {
      get when() {
        return !s();
      },
      get children() {
        const _ = qd.cloneNode(!0);
        return i1(_, "click", e.onTimeToolsClick, !0), _;
      }
    }), le), C(E, L(J, {
      get when() {
        return !s();
      },
      get children() {
        const _ = Yd.cloneNode(!0), ae = _.firstChild, De = ae.nextSibling;
        return i1(_, "click", e.onIndicatorClick, !0), C(De, () => c("indicator", e.locale)), _;
      }
    }), le), le.style.setProperty("display", "flex"), le.style.setProperty("gap", "4px"), le.style.setProperty("margin-left", "auto"), le.style.setProperty("align-items", "center"), le.style.setProperty("flex", "0 0 auto"), C(le, L(J, {
      get when() {
        return e.showOrderToolsMenu;
      },
      get children() {
        const _ = Xd.cloneNode(!0), ae = _.firstChild, De = ae.firstChild, Ve = De.nextSibling;
        return D1((be) => {
          t = be;
        }, _), _.style.setProperty("display", "flex"), _.style.setProperty("align-items", "center"), ae.$$click = (be) => {
          be.stopPropagation(), Fe();
        }, ae.style.setProperty("gap", "6px"), Ve.style.setProperty("transition", "transform 0.2s ease"), C(_, L(J, {
          get when() {
            return v();
          },
          get children() {
            return L(S5, {
              get mount() {
                return K();
              },
              get children() {
                const be = Gd.cloneNode(!0), l1 = be.firstChild, r1 = l1.firstChild, Ue = r1.firstChild, J1 = Ue.firstChild, k1 = J1.firstChild, E1 = r1.nextSibling, p1 = E1.firstChild, c1 = p1.firstChild, et = c1.firstChild, He = p1.nextSibling, vt = He.firstChild, Ct = vt.firstChild, v1 = l1.nextSibling, u1 = v1.firstChild, sn = u1.firstChild, tt = sn.firstChild, x1 = tt.firstChild, bt = u1.nextSibling, nt = bt.firstChild, ln = nt.firstChild, B1 = ln.nextSibling, Ke = nt.nextSibling, je = Ke.firstChild, qe = je.nextSibling, Re = qe.firstChild, $t = Re.firstChild, F1 = v1.nextSibling, rt = F1.firstChild, ot = rt.firstChild, Le = F1.nextSibling, Oe = Le.nextSibling, cn = Oe.firstChild, Ye = cn.firstChild, L1 = Oe.nextSibling, d1 = L1.nextSibling, un = d1.firstChild, C1 = un.firstChild, it = d1.nextSibling, Xe = it.firstChild, at = Xe.firstChild, st = at.firstChild, U1 = st.firstChild, R1 = Xe.nextSibling, Qe = R1.firstChild, dn = Qe.firstChild, lt = dn.firstChild, h1 = Qe.nextSibling, ct = h1.firstChild, _t = ct.firstChild, hn = h1.nextSibling, fn = hn.firstChild, z1 = fn.firstChild, kt = it.nextSibling, w1 = kt.firstChild, xt = w1.firstChild;
                return be.$$mousedown = (b) => b.stopPropagation(), D1((b) => {
                  o = b;
                }, be), be.style.setProperty("position", "fixed"), be.style.setProperty("z-index", "9999"), r1.$$click = (b) => {
                  b.preventDefault(), b.stopPropagation(), w((S) => !S);
                }, J1.$$mousedown = (b) => b.stopPropagation(), J1.$$click = (b) => b.stopPropagation(), k1.addEventListener("change", (b) => {
                  var S;
                  b.stopPropagation(), w(!0), (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    quickOrder: b.currentTarget.checked
                  });
                }), et.addEventListener("change", (b) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    quickOrderFloatingWindow: b.currentTarget.checked
                  });
                }), Ct.addEventListener("change", (b) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    quickOrderPlusButton: b.currentTarget.checked
                  });
                }), u1.$$click = (b) => {
                  b.preventDefault(), b.stopPropagation(), D((S) => !S), B(!1);
                }, tt.$$mousedown = (b) => b.stopPropagation(), tt.$$click = (b) => b.stopPropagation(), x1.addEventListener("change", (b) => {
                  var S;
                  b.stopPropagation(), D(!0), (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    openOrders: b.currentTarget.checked
                  });
                }), B1.$$click = (b) => {
                  var S, Te;
                  b.preventDefault(), b.stopPropagation(), (Te = e.onOrderToolsStateChange) == null || Te.call(e, {
                    openOrdersExtendedPriceLine: !(((S = e.orderToolsState) == null ? void 0 : S.openOrdersExtendedPriceLine) ?? !0)
                  });
                }, Re.$$click = (b) => {
                  b.preventDefault(), b.stopPropagation(), B((S) => !S);
                }, C(Re, () => {
                  var b;
                  return Sr(((b = e.orderToolsState) == null ? void 0 : b.openOrdersDisplay) ?? "right");
                }, $t), C(qe, L(J, {
                  get when() {
                    return U();
                  },
                  get children() {
                    const b = Wd.cloneNode(!0);
                    return C(b, () => ["left", "center", "right"].map((S) => (() => {
                      const Te = ah.cloneNode(!0);
                      return Te.$$click = (Ee) => {
                        var We;
                        Ee.preventDefault(), Ee.stopPropagation(), (We = e.onOrderToolsStateChange) == null || We.call(e, {
                          openOrdersDisplay: S
                        }), B(!1);
                      }, C(Te, () => Sr(S)), I(() => {
                        var Ee;
                        return oe(Te, (((Ee = e.orderToolsState) == null ? void 0 : Ee.openOrdersDisplay) ?? "right") === S ? "selected" : "");
                      }), Te;
                    })())), b;
                  }
                }), null), ot.addEventListener("change", (b) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    positions: b.currentTarget.checked
                  });
                }), Ye.addEventListener("change", (b) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    breakevenPrice: b.currentTarget.checked
                  });
                }), C1.addEventListener("change", (b) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    liquidationPrice: b.currentTarget.checked
                  });
                }), Xe.$$click = (b) => {
                  b.preventDefault(), b.stopPropagation(), j((S) => !S);
                }, st.$$mousedown = (b) => b.stopPropagation(), st.$$click = (b) => b.stopPropagation(), U1.addEventListener("change", (b) => {
                  var S;
                  b.stopPropagation(), j(!0), (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    priceLine: b.currentTarget.checked
                  });
                }), lt.addEventListener("change", (b) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    marketPriceLine: b.currentTarget.checked
                  });
                }), _t.addEventListener("change", (b) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    countDown: b.currentTarget.checked
                  });
                }), z1.addEventListener("change", (b) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    bidAskPrice: b.currentTarget.checked
                  });
                }), xt.addEventListener("change", (b) => {
                  var S;
                  (S = e.onOrderToolsStateChange) == null || S.call(e, {
                    orderHistory: b.currentTarget.checked
                  });
                }), I((b) => {
                  var ut;
                  const S = `${ee().top}px`, Te = `${ee().left}px`, Ee = `${ee().minWidth}px`, We = `klinecharts-pro-order-tools-group${p() ? " klinecharts-pro-order-tools-group-open" : ""}`, A1 = `klinecharts-pro-order-tools-group${M() ? " klinecharts-pro-order-tools-group-open" : ""}`, Lt = `klinecharts-pro-order-tools-switch${((ut = e.orderToolsState) == null ? void 0 : ut.openOrdersExtendedPriceLine) ?? !0 ? " klinecharts-pro-order-tools-switch-on" : ""}`, wt = `klinecharts-pro-order-tools-display-arrow${U() ? " klinecharts-pro-order-tools-display-arrow-open" : ""}`, At = `klinecharts-pro-order-tools-group${O() ? " klinecharts-pro-order-tools-group-open" : ""}`;
                  return S !== b._v$ && be.style.setProperty("top", b._v$ = S), Te !== b._v$2 && be.style.setProperty("left", b._v$2 = Te), Ee !== b._v$3 && be.style.setProperty("width", b._v$3 = Ee), We !== b._v$4 && oe(l1, b._v$4 = We), A1 !== b._v$5 && oe(v1, b._v$5 = A1), Lt !== b._v$6 && oe(B1, b._v$6 = Lt), wt !== b._v$7 && Se($t, "class", b._v$7 = wt), At !== b._v$8 && oe(it, b._v$8 = At), b;
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
                  var b, S, Te, Ee;
                  return k1.checked = (((b = e.orderToolsState) == null ? void 0 : b.quickOrderFloatingWindow) ?? ((S = e.orderToolsState) == null ? void 0 : S.quickOrder) ?? !0) || (((Te = e.orderToolsState) == null ? void 0 : Te.quickOrderPlusButton) ?? ((Ee = e.orderToolsState) == null ? void 0 : Ee.quickOrder) ?? !0);
                }), I(() => {
                  var b, S;
                  return et.checked = ((b = e.orderToolsState) == null ? void 0 : b.quickOrderFloatingWindow) ?? ((S = e.orderToolsState) == null ? void 0 : S.quickOrder) ?? !0;
                }), I(() => {
                  var b, S;
                  return Ct.checked = ((b = e.orderToolsState) == null ? void 0 : b.quickOrderPlusButton) ?? ((S = e.orderToolsState) == null ? void 0 : S.quickOrder) ?? !0;
                }), I(() => {
                  var b;
                  return x1.checked = ((b = e.orderToolsState) == null ? void 0 : b.openOrders) ?? !0;
                }), I(() => {
                  var b;
                  return ot.checked = ((b = e.orderToolsState) == null ? void 0 : b.positions) ?? !0;
                }), I(() => {
                  var b;
                  return Ye.checked = ((b = e.orderToolsState) == null ? void 0 : b.breakevenPrice) ?? !0;
                }), I(() => {
                  var b;
                  return C1.checked = ((b = e.orderToolsState) == null ? void 0 : b.liquidationPrice) ?? !0;
                }), I(() => {
                  var b, S, Te, Ee, We, A1;
                  return U1.checked = (((b = e.orderToolsState) == null ? void 0 : b.marketPriceLine) ?? ((S = e.orderToolsState) == null ? void 0 : S.priceLine) ?? !0) || (((Te = e.orderToolsState) == null ? void 0 : Te.countDown) ?? ((Ee = e.orderToolsState) == null ? void 0 : Ee.priceLine) ?? !0) || (((We = e.orderToolsState) == null ? void 0 : We.bidAskPrice) ?? ((A1 = e.orderToolsState) == null ? void 0 : A1.priceLine) ?? !0);
                }), I(() => {
                  var b, S;
                  return lt.checked = ((b = e.orderToolsState) == null ? void 0 : b.marketPriceLine) ?? ((S = e.orderToolsState) == null ? void 0 : S.priceLine) ?? !0;
                }), I(() => {
                  var b, S;
                  return _t.checked = ((b = e.orderToolsState) == null ? void 0 : b.countDown) ?? ((S = e.orderToolsState) == null ? void 0 : S.priceLine) ?? !0;
                }), I(() => {
                  var b, S;
                  return z1.checked = ((b = e.orderToolsState) == null ? void 0 : b.bidAskPrice) ?? ((S = e.orderToolsState) == null ? void 0 : S.priceLine) ?? !0;
                }), I(() => {
                  var b;
                  return xt.checked = ((b = e.orderToolsState) == null ? void 0 : b.orderHistory) ?? !0;
                }), be;
              }
            });
          }
        }), null), I((be) => {
          const l1 = s() ? "0 8px" : "0 10px", r1 = v() ? "rotate(180deg)" : "rotate(0deg)";
          return l1 !== be._v$9 && ae.style.setProperty("padding", be._v$9 = l1), r1 !== be._v$10 && Ve.style.setProperty("transform", be._v$10 = r1), be;
        }, {
          _v$9: void 0,
          _v$10: void 0
        }), _;
      }
    }), Ie), C(le, L(J, {
      get when() {
        return !s();
      },
      get children() {
        return [(() => {
          const _ = Jd.cloneNode(!0);
          return i1(_, "click", e.onTimezoneClick, !0), _;
        })(), (() => {
          const _ = eh.cloneNode(!0);
          return i1(_, "click", e.onSettingClick, !0), _;
        })()];
      }
    }), Ie), C(le, L(J, {
      get when() {
        return !s();
      },
      get children() {
        const _ = th.cloneNode(!0);
        return i1(_, "click", e.onScreenshotClick, !0), _;
      }
    }), Ie), Ie.$$click = () => {
      if (V())
        (document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen).call(document);
      else {
        const _ = n == null ? void 0 : n.closest(".klinecharts-pro");
        _ && ((_ == null ? void 0 : _.requestFullscreen) ?? (_ == null ? void 0 : _.webkitRequestFullscreen) ?? (_ == null ? void 0 : _.mozRequestFullScreen) ?? (_ == null ? void 0 : _.msRequestFullscreen)).call(_);
      }
    }, C(Ie, (() => {
      const _ = Z(() => !!V());
      return () => _() ? sh.cloneNode(!0) : lh.cloneNode(!0);
    })()), C(le, L(J, {
      get when() {
        return Z(() => !!e.chartViewToggle)() && !V();
      },
      get children() {
        const _ = nh.cloneNode(!0);
        return i1(_, "click", e.chartViewToggle.onToggle, !0), C(_, (() => {
          const ae = Z(() => e.chartViewToggle.view === "chart");
          return () => ae() ? ch.cloneNode(!0) : uh.cloneNode(!0);
        })()), I(() => Se(_, "title", e.chartViewToggle.view === "chart" ? "View Depth" : "View Chart")), _;
      }
    }), null), C(N, L(J, {
      get when() {
        return se();
      },
      get children() {
        const _ = rh.cloneNode(!0);
        return _.$$click = () => n.scrollBy({
          left: 100,
          behavior: "smooth"
        }), _.style.setProperty("position", "absolute"), _.style.setProperty("right", "0"), _.style.setProperty("top", "0"), _.style.setProperty("bottom", "1px"), _.style.setProperty("width", "30px"), _.style.setProperty("display", "flex"), _.style.setProperty("align-items", "center"), _.style.setProperty("justify-content", "center"), _.style.setProperty("background", "var(--klinecharts-pro-popover-background-color)"), _.style.setProperty("z-index", "10"), _.style.setProperty("cursor", "pointer"), _.style.setProperty("color", "var(--klinecharts-pro-primary-color)"), _;
      }
    }), null), I((_) => {
      const ae = e.spread ? "" : "rotate", De = V() ? "0px" : "var(--klinecharts-pro-period-bar-padding-right)";
      return ae !== _._v$11 && Se(Pe, "class", _._v$11 = ae), De !== _._v$12 && le.style.setProperty("padding-right", _._v$12 = De), _;
    }, {
      _v$11: void 0,
      _v$12: void 0
    }), N;
  })();
};
Ze(["click", "mousedown"]);
const hh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M12.41465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L12.41465,12C12.20873,12.5826,11.65311,13,11,13C10.34689,13,9.79127,12.5826,9.58535,12L3.5,12C3.223857,12,3,11.77614,3,11.5C3,11.22386,3.223857,11,3.5,11L9.58535,11C9.79127,10.417404,10.34689,10,11,10C11.65311,10,12.20873,10.417404,12.41465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), fh = () => hh.cloneNode(!0), mh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,11L11.08535,11C11.29127,10.417404,11.84689,10,12.5,10C13.15311,10,13.70873,10.417404,13.91465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L13.91465,12C13.70873,12.5826,13.15311,13,12.5,13C11.84689,13,11.29127,12.5826,11.08535,12L6.91465,12C6.70873,12.5826,6.15311,13,5.5,13C4.671573,13,4,12.32843,4,11.5C4,10.671573,4.671573,10,5.5,10C6.15311,10,6.70873,10.417404,6.91465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), gh = () => mh.cloneNode(!0), yh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,12.5C6.70873,13.0826,6.15311,13.5,5.5,13.5C4.671573,13.5,4,12.82843,4,12C4,11.171573,4.671573,10.5,5.5,10.5C6.15311,10.5,6.70873,10.917404,6.91465,11.5L16.0853,11.5C16.2913,10.917404,16.846899999999998,10.5,17.5,10.5C18.328400000000002,10.5,19,11.171573,19,12C19,12.82843,18.328400000000002,13.5,17.5,13.5C16.846899999999998,13.5,16.2913,13.0826,16.0853,12.5L6.91465,12.5Z" stroke-opacity="0" stroke="none"></path></svg>'), ph = () => yh.cloneNode(!0), vh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,12.41465L11,18.5C11,18.7761,11.22386,19,11.5,19C11.77614,19,12,18.7761,12,18.5L12,12.41465C12.5826,12.20873,13,11.65311,13,11C13,10.34689,12.5826,9.79127,12,9.58535L12,3.5C12,3.223857,11.77614,3,11.5,3C11.22386,3,11,3.223857,11,3.5L11,9.58535C10.417404,9.79127,10,10.34689,10,11C10,11.65311,10.417404,12.20873,11,12.41465Z" stroke-opacity="0" stroke="none"></path></svg>'), Ch = () => vh.cloneNode(!0), bh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.66558837890625,19C10.83716137890625,19,10.16558837890625,18.328400000000002,10.16558837890625,17.5C10.16558837890625,16.846899999999998,10.58298437890625,16.2913,11.16557337890625,16.0854L11.16557337890625,11.91464C10.58298437890625,11.70872,10.16558837890625,11.1531,10.16558837890625,10.5C10.16558837890625,9.8469,10.58298437890625,9.29128,11.16557337890625,9.08536L11.16557337890625,4.5C11.16557337890625,4.223857,11.38942837890625,4,11.66556837890625,4C11.94171837890625,4,12.16556837890625,4.223857,12.16556837890625,4.5L12.16556837890625,9.08535C12.74817837890625,9.291260000000001,13.16558837890625,9.846879999999999,13.16558837890625,10.5C13.16558837890625,11.153120000000001,12.74817837890625,11.708739999999999,12.16556837890625,11.91465L12.16556837890625,16.0854C12.74817837890625,16.2913,13.16558837890625,16.846899999999998,13.16558837890625,17.5C13.16558837890625,18.328400000000002,12.49401837890625,19,11.66558837890625,19Z" stroke-opacity="0" stroke="none"></path></svg>'), $h = () => bh.cloneNode(!0), _h = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.165603637695312,6.91465C11.748203637695312,6.70873,12.165603637695312,6.15311,12.165603637695312,5.5C12.165603637695312,4.671573,11.494033637695313,4,10.665603637695312,4C9.837176637695313,4,9.165603637695312,4.671573,9.165603637695312,5.5C9.165603637695312,6.15311,9.583007637695312,6.70873,10.165603637695312,6.91465L10.165603637695312,16.0854C9.583007637695312,16.2913,9.165603637695312,16.846899999999998,9.165603637695312,17.5C9.165603637695312,18.328400000000002,9.837176637695313,19,10.665603637695312,19C11.494033637695313,19,12.165603637695312,18.328400000000002,12.165603637695312,17.5C12.165603637695312,16.846899999999998,11.748203637695312,16.2913,11.165603637695312,16.0854L11.165603637695312,6.91465Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), kh = () => _h.cloneNode(!0), xh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.146447,15.753C4.9511845,15.9483,4.9511845,16.2649,5.146447,16.4602C5.341709,16.6554,5.658291,16.6554,5.853554,16.4602L8.156600000000001,14.15711C8.352409999999999,14.25082,8.57173,14.3033,8.8033,14.3033C9.631730000000001,14.3033,10.3033,13.63172,10.3033,12.80329C10.3033,12.57172,10.250820000000001,12.352409999999999,10.157119999999999,12.15659L12.156600000000001,10.15711C12.352409999999999,10.250820000000001,12.571729999999999,10.30329,12.8033,10.30329C13.63173,10.30329,14.3033,9.63172,14.3033,8.80329C14.3033,8.57172,14.25082,8.352409999999999,14.15712,8.15659L16.4602,5.853553C16.6554,5.658291,16.6554,5.341709,16.4602,5.146447C16.2649,4.9511843,15.9483,4.9511843,15.753,5.146447L13.45001,7.449479999999999C13.25419,7.35577,13.03487,7.3032900000000005,12.8033,7.3032900000000005C11.97487,7.3032900000000005,11.3033,7.97487,11.3033,8.80329C11.3033,9.03487,11.35578,9.254190000000001,11.44949,9.450009999999999L9.450009999999999,11.449480000000001C9.254190000000001,11.35577,9.03487,11.30329,8.8033,11.30329C7.97487,11.30329,7.3033,11.97487,7.3033,12.80329C7.3033,13.03487,7.35578,13.25419,7.44949,13.45001L5.146447,15.753Z" stroke-opacity="0" stroke="none"></path></svg>'), Lh = () => xh.cloneNode(!0), wh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M7.573332939453125,14.54567903564453C7.667042939453125,14.741499035644532,7.719512939453125,14.960809035644532,7.719512939453125,15.19239903564453C7.719512939453125,16.02079903564453,7.047942939453125,16.69239903564453,6.219512939453125,16.69239903564453C5.391085939453125,16.69239903564453,4.719512939453125,16.02079903564453,4.719512939453125,15.19239903564453C4.719512939453125,14.36394903564453,5.391085939453125,13.692379035644532,6.219512939453125,13.692379035644532C6.451092939453125,13.692379035644532,6.670412939453125,13.74485903564453,6.866232939453125,13.83856903564453L9.865702939453126,10.83909903564453C9.771992939453124,10.643279035644532,9.719512939453125,10.42395903564453,9.719512939453125,10.192379035644532C9.719512939453125,9.36394903564453,10.391082939453124,8.692379035644532,11.219512939453125,8.692379035644532C11.451092939453126,8.692379035644532,11.670412939453126,8.74485903564453,11.866232939453125,8.838569035644532L15.462112939453124,5.242645035644531C15.657412939453126,5.047383335644532,15.974012939453125,5.047383335644532,16.169212939453125,5.242645035644531C16.364512939453125,5.437907035644531,16.364512939453125,5.754489035644531,16.169212939453125,5.949752035644531L12.573332939453124,9.545679035644532C12.667042939453125,9.74149903564453,12.719512939453125,9.96080903564453,12.719512939453125,10.192379035644532C12.719512939453125,11.020809035644533,12.047942939453126,11.692379035644532,11.219512939453125,11.692379035644532C10.987942939453125,11.692379035644532,10.768632939453125,11.639909035644532,10.572812939453126,11.54619903564453L7.573332939453125,14.54567903564453Z" stroke-opacity="0" stroke="none"></path></svg>'), Ah = () => wh.cloneNode(!0), Mh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M15.719512939453125,8.461776733398438C16.547912939453127,8.461776733398438,17.219512939453125,7.7902067333984375,17.219512939453125,6.9617767333984375C17.219512939453125,6.133349733398438,16.547912939453127,5.4617767333984375,15.719512939453125,5.4617767333984375C14.891082939453124,5.4617767333984375,14.219512939453125,6.133349733398438,14.219512939453125,6.9617767333984375C14.219512939453125,7.193346733398437,14.271992939453124,7.412666733398438,14.365692939453124,7.608486733398438L7.366222939453126,14.607956733398437C7.170402939453125,14.514256733398437,6.951082939453125,14.461776733398438,6.719512939453125,14.461776733398438C5.891085939453125,14.461776733398438,5.219512939453125,15.133346733398437,5.219512939453125,15.961776733398438C5.219512939453125,16.79017673339844,5.891085939453125,17.461776733398438,6.719512939453125,17.461776733398438C7.547942939453125,17.461776733398438,8.219512939453125,16.79017673339844,8.219512939453125,15.961776733398438C8.219512939453125,15.730176733398437,8.167032939453126,15.510876733398437,8.073322939453124,15.315066733398437L15.072802939453124,8.315586733398437C15.268612939453124,8.409296733398438,15.487912939453125,8.461776733398438,15.719512939453125,8.461776733398438Z" stroke-opacity="0" stroke="none"></path></svg>'), Th = () => Mh.cloneNode(!0), Sh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17.0643,7.033864912109375L18,3.585784912109375L14.5078,4.509695912109375L15.3537,5.344934912109375L6.02026,14.560584912109375C5.87635,14.517484912109374,5.72366,14.494284912109375,5.5655,14.494284912109375C4.7009,14.494284912109375,4,15.186384912109375,4,16.040084912109375C4,16.893784912109375,4.7009,17.585784912109375,5.5655,17.585784912109375C6.43011,17.585784912109375,7.13101,16.893784912109375,7.13101,16.040084912109375C7.13101,15.722284912109375,7.03392,15.426984912109376,6.86744,15.181384912109374L16.0917,6.073604912109375L17.0643,7.033864912109375Z" stroke-opacity="0" stroke="none"></path></svg>'), Ph = () => Sh.cloneNode(!0), Dh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,13.00505L18.5,13.00505C18.7761,13.00505,19,13.228909999999999,19,13.50505C19,13.781189999999999,18.7761,14.00505,18.5,14.00505L6.91465,14.00505C6.70873,14.58765,6.15311,15.00505,5.5,15.00505C4.671573,15.00505,4,14.33348,4,13.50505C4,12.67662,4.671573,12.00505,5.5,12.00505C6.15311,12.00505,6.70873,12.422450000000001,6.91465,13.00505ZM7.81404,11.625L10.48591,11.625L10.48591,10.90625L9.65193,10.90625L9.65193,7.125L8.997630000000001,7.125C8.71443,7.306641,8.415600000000001,7.419922,7.96443,7.498047L7.96443,8.05078L8.77497,8.05078L8.77497,10.90625L7.81404,10.90625L7.81404,11.625ZM11.081620000000001,11.625L14.0562,11.625L14.0562,10.88281L13.09724,10.88281C12.8863,10.88281,12.59333,10.90625,12.36482,10.93555C13.17537,10.11328,13.84724,9.2207,13.84724,8.39062C13.84724,7.541016,13.28865,7,12.4488,7C11.84333,7,11.446850000000001,7.234375,11.03279,7.679688L11.52497,8.16797C11.747630000000001,7.914062,12.0113,7.697266,12.33552,7.697266C12.7613,7.697266,13.00154,7.982422,13.00154,8.43359C13.00154,9.14648,12.29255,10.00781,11.081620000000001,11.11523L11.081620000000001,11.625ZM15.9605,11.75C16.8121,11.75,17.526899999999998,11.2832,17.526899999999998,10.4375C17.526899999999998,9.82031,17.142200000000003,9.43945,16.6441,9.30078L16.6441,9.27148C17.1129,9.08594,17.3824,8.7207,17.3824,8.21289C17.3824,7.421875,16.8004,7,15.9429,7C15.4215,7,14.9957,7.210938,14.6109,7.541016L15.066,8.11133C15.3258,7.849609,15.5836,7.697266,15.9019,7.697266C16.2789,7.697266,16.4957,7.914062,16.4957,8.28125C16.4957,8.70898,16.2301,9,15.4215,9L15.4215,9.63672C16.3804,9.63672,16.6383,9.91992,16.6383,10.38086C16.6383,10.79688,16.3336,11.03125,15.8824,11.03125C15.4742,11.03125,15.1578,10.82227,14.8922,10.55078L14.4781,11.13281C14.7906,11.486329999999999,15.2652,11.75,15.9605,11.75Z" stroke-opacity="0" stroke="none"></path></svg>'), Oh = () => Dh.cloneNode(!0), Nh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.146447,14.178126025390625C2.9511847,13.982826025390626,2.9511847,13.666226025390625,3.146447,13.470926025390625L7.39146,9.225966025390626C7.35417,9.095106025390624,7.33421,8.956946025390625,7.33421,8.814116025390625C7.33421,7.985696025390625,8.00578,7.314116025390625,8.834209999999999,7.314116025390625C8.97703,7.314116025390625,9.11519,7.334086025390625,9.24605,7.371366025390625L13.753,2.864373025390625C13.9483,2.669110325390625,14.2649,2.669110325390625,14.4602,2.864373025390625C14.6554,3.059635025390625,14.6554,3.376217025390625,14.4602,3.571479025390625L10.06916,7.962476025390625C10.23631,8.204386025390626,10.334209999999999,8.497826025390625,10.334209999999999,8.814116025390625C10.334209999999999,9.642546025390626,9.66264,10.314116025390625,8.834209999999999,10.314116025390625C8.51791,10.314116025390625,8.22448,10.216226025390625,7.98256,10.049076025390626L3.853554,14.178126025390625C3.658291,14.373326025390625,3.341709,14.373326025390625,3.146447,14.178126025390625ZM7.67736,19.188526025390626C7.4821,18.993226025390626,7.4821,18.676626025390625,7.67736,18.481426025390626L9.9804,16.178326025390625C9.88669,15.982526025390625,9.834209999999999,15.763226025390624,9.834209999999999,15.531626025390626C9.834209999999999,14.703226025390626,10.50578,14.031626025390626,11.33421,14.031626025390626C11.56579,14.031626025390626,11.78511,14.084126025390624,11.98093,14.177826025390624L13.9804,12.178356025390626C13.8867,11.982536025390624,13.8342,11.763216025390625,13.8342,11.531636025390625C13.8342,10.703206025390624,14.5058,10.031636025390625,15.3342,10.031636025390625C15.5658,10.031636025390625,15.7851,10.084116025390625,15.9809,10.177826025390626L18.284,7.874796025390625C18.4792,7.679536025390625,18.7958,7.679536025390625,18.9911,7.874796025390625C19.1863,8.070056025390624,19.1863,8.386636025390626,18.9911,8.581906025390625L16.688000000000002,10.884936025390624C16.7817,11.080756025390626,16.8342,11.300066025390626,16.8342,11.531636025390625C16.8342,12.360066025390624,16.162599999999998,13.031626025390626,15.3342,13.031626025390626C15.1026,13.031626025390626,14.8833,12.979126025390626,14.6875,12.885426025390625L12.68803,14.884926025390625C12.78174,15.080726025390625,12.83421,15.300026025390626,12.83421,15.531626025390626C12.83421,16.360026025390624,12.16264,17.031626025390626,11.33421,17.031626025390626C11.10264,17.031626025390626,10.88333,16.979126025390627,10.68751,16.885426025390625L8.38446,19.188526025390626C8.1892,19.383726025390626,7.87262,19.383726025390626,7.67736,19.188526025390626Z" stroke-opacity="0" stroke="none"></path></svg>'), Ih = () => Nh.cloneNode(!0), Eh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.3367688759765626,12.63173C3.5320318759765623,12.82699,3.8486138759765627,12.82699,4.043876875976562,12.63173L11.822052875976562,4.853553C12.017312875976563,4.658291,12.017312875976563,4.341708,11.822052875976562,4.146446C11.626792875976562,3.9511843,11.310202875976563,3.9511843,11.114942875976563,4.146446L3.3367688759765626,11.92462C3.1415071759765625,12.11988,3.1415071759765625,12.43647,3.3367688759765626,12.63173ZM5.001492875976562,17.0351C4.806232875976562,16.8399,4.806232875976562,16.5233,5.001492875976562,16.328L7.304532875976562,14.025C7.210822875976563,13.82916,7.158352875976563,13.60984,7.158352875976563,13.37827C7.158352875976563,12.54984,7.829922875976562,11.87827,8.658352875976561,11.87827C8.889922875976563,11.87827,9.109232875976563,11.93075,9.305052875976562,12.02446L11.304532875976562,10.02498C11.210822875976563,9.82916,11.158352875976561,9.60984,11.158352875976561,9.37827C11.158352875976561,8.54984,11.829922875976562,7.8782700000000006,12.658352875976563,7.8782700000000006C12.889922875976563,7.8782700000000006,13.109232875976563,7.93075,13.305022875976562,8.024460000000001L15.608122875976562,5.72142C15.803322875976562,5.5261499999999995,16.119922875976563,5.5261499999999995,16.315222875976563,5.72142C16.510422875976563,5.9166799999999995,16.510422875976563,6.23326,16.315222875976563,6.42852L14.012122875976562,8.73156C14.105822875976562,8.92738,14.158322875976562,9.1467,14.158322875976562,9.37827C14.158322875976562,10.2067,13.486822875976562,10.87827,12.658352875976563,10.87827C12.426772875976562,10.87827,12.207452875976562,10.82579,12.011642875976563,10.73209L10.012162875976562,12.73156C10.105872875976562,12.92738,10.158352875976561,13.1467,10.158352875976561,13.37827C10.158352875976561,14.2067,9.486772875976563,14.8783,8.658352875976561,14.8783C8.426772875976562,14.8783,8.207452875976562,14.8258,8.011642875976563,14.7321L5.708602875976562,17.0351C5.513342875976562,17.2304,5.196752875976562,17.2304,5.001492875976562,17.0351ZM10.415712875976563,18.328C10.220452875976562,18.5233,9.903862875976563,18.5233,9.708602875976563,18.328C9.513342875976562,18.1328,9.513342875976562,17.816200000000002,9.708602875976563,17.6209L12.304532875976562,15.025C12.210822875976563,14.8292,12.158352875976563,14.6098,12.158352875976563,14.3783C12.158352875976563,13.54984,12.829922875976562,12.87827,13.658322875976562,12.87827C13.889922875976563,12.87827,14.109222875976563,12.93075,14.305022875976562,13.02446L17.486822875976564,9.84274C17.682022875976564,9.64747,17.99862287597656,9.64747,18.19392287597656,9.84274C18.38912287597656,10.038,18.38912287597656,10.35458,18.19392287597656,10.54984L15.012122875976562,13.73156C15.105822875976562,13.92738,15.158322875976562,14.1467,15.158322875976562,14.3783C15.158322875976562,15.2067,14.486822875976562,15.8783,13.658322875976562,15.8783C13.426822875976562,15.8783,13.207422875976562,15.8258,13.011642875976563,15.7321L10.415712875976563,18.328Z" stroke-opacity="0" stroke="none"></path></svg>'), Bh = () => Eh.cloneNode(!0), Fh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M13.1889,6C12.98303,6.582599999999999,12.42741,7,11.7743,7C11.12119,7,10.565570000000001,6.582599999999999,10.35965,6L3.5,6C3.223857,6,3,5.77614,3,5.5C3,5.22386,3.223857,5,3.5,5L10.35965,5C10.565570000000001,4.417404,11.12119,4,11.7743,4C12.42741,4,12.98303,4.417404,13.1889,5L18.5,5C18.7761,5,19,5.22386,19,5.5C19,5.77614,18.7761,6,18.5,6L13.1889,6ZM3,8.5C3,8.22386,3.223857,8,3.5,8L18.5,8C18.7761,8,19,8.22386,19,8.5C19,8.77614,18.7761,9,18.5,9L3.5,9C3.223857,9,3,8.77614,3,8.5ZM3.278549,11.5C3.278549,11.22386,3.502407,11,3.778549,11L18.7785,11C19.0547,11,19.2785,11.22386,19.2785,11.5C19.2785,11.77614,19.0547,12,18.7785,12L3.778549,12C3.502407,12,3.278549,11.77614,3.278549,11.5ZM3.139267,14.5C3.139267,14.2239,3.363124,14,3.6392670000000003,14L18.6393,14C18.915399999999998,14,19.1393,14.2239,19.1393,14.5C19.1393,14.7761,18.915399999999998,15,18.6393,15L3.6392670000000003,15C3.363124,15,3.139267,14.7761,3.139267,14.5ZM13.1889,18C12.98303,18.5826,12.42741,19,11.7743,19C11.12119,19,10.565570000000001,18.5826,10.35965,18L3.778549,18C3.502407,18,3.278549,17.7761,3.278549,17.5C3.278549,17.2239,3.502407,17,3.778549,17L10.35965,17C10.565570000000001,16.4174,11.12119,16,11.7743,16C12.42741,16,12.98303,16.4174,13.1889,17L18.7785,17C19.0547,17,19.2785,17.2239,19.2785,17.5C19.2785,17.7761,19.0547,18,18.7785,18L13.1889,18Z" stroke-opacity="0" stroke="none"></path></svg>'), Uh = () => Fh.cloneNode(!0), Rh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4.91465,6C4.70873,6.582599999999999,4.15311,7,3.5,7C2.671573,7,2,6.32843,2,5.5C2,4.671573,2.671573,4,3.5,4C4.15311,4,4.70873,4.417404,4.91465,5L18.2257,5C18.5018,5,18.7257,5.22386,18.7257,5.5C18.7257,5.77614,18.5018,6,18.2257,6L4.91465,6ZM2.7257,8.5C2.7257,8.22386,2.949558,8,3.2257,8L18.2257,8C18.5018,8,18.7257,8.22386,18.7257,8.5C18.7257,8.77614,18.5018,9,18.2257,9L3.2257,9C2.949558,9,2.7257,8.77614,2.7257,8.5ZM3.00425,11.5C3.00425,11.22386,3.22811,11,3.50425,11L18.5042,11C18.7804,11,19.0042,11.22386,19.0042,11.5C19.0042,11.77614,18.7804,12,18.5042,12L3.50425,12C3.22811,12,3.00425,11.77614,3.00425,11.5ZM2.864967,14.5C2.864967,14.2239,3.08882,14,3.36497,14L18.365,14C18.6411,14,18.865,14.2239,18.865,14.5C18.865,14.7761,18.6411,15,18.365,15L3.36497,15C3.08882,15,2.864967,14.7761,2.864967,14.5ZM20,17.5C20,18.328400000000002,19.3284,19,18.5,19C17.846899999999998,19,17.2913,18.5826,17.0854,18L3.50425,18C3.22811,18,3.00425,17.7761,3.00425,17.5C3.00425,17.2239,3.22811,17,3.50425,17L17.0854,17C17.2913,16.4174,17.846899999999998,16,18.5,16C19.3284,16,20,16.671599999999998,20,17.5Z" stroke-opacity="0" stroke="none"></path></svg>'), zh = () => Rh.cloneNode(!0), Kh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="5" ry="5" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="3" ry="3" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse></svg>'), jh = () => Kh.cloneNode(!0), Qh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3,7.32468C5.90649,3.3893050000000002,11.49833,2.81306,14.6674,6.31944C14.9056,6.1554199999999994,15.192,6.05979,15.5,6.05979C15.845,6.05979,16.1628,6.17974,16.4162,6.381349999999999L18.4509,4.23827L19,4.816615L16.8945,7.03429C16.962600000000002,7.21075,17,7.40319,17,7.60463C17,8.45782,16.328400000000002,9.14947,15.5,9.14947C14.6716,9.14947,14,8.45782,14,7.60463C14,7.36402,14.0534,7.13625,14.1487,6.93322C11.32695,3.748365,6.25159,4.253956,3.612785,7.82695L3,7.32468ZM14.09,15.4717C15.7427,13.78985,16.244500000000002,11.524740000000001,15.5633,9.30134L15.5618,9.30134L16.3012,9.0502C17.072400000000002,11.56646,16.497700000000002,14.158,14.6282,16.0599C12.28737,18.442,8.62386,18.6988,6.41348,16.4501C4.5526,14.5572,4.52076,11.19671,6.36766,9.3177C7.89069,7.76754,10.07544,7.706189999999999,11.56741,9.22363C11.95453,9.61742,12.24817,10.08363,12.43369,10.57677L14.1451,8.77421L14.6942,9.35256L12.64982,11.50582C12.65827,11.59712,12.66295,11.68839,12.66378,11.77936C12.87398,12.04523,13,12.38451,13,12.7541C13,13.60729,12.32843,14.2989,11.5,14.2989C10.67157,14.2989,10,13.60729,10,12.7541C10,11.90091,10.67157,11.20926,11.5,11.20926C11.60387,11.20926,11.70528,11.220130000000001,11.8032,11.240829999999999L11.81763,11.22564C11.69858,10.71874,11.42858,10.21929,11.0284,9.81179C9.844000000000001,8.60765,8.136890000000001,8.65592,6.90822,9.90586C5.37975,11.460930000000001,5.40693,14.288,6.95404,15.8619C8.84598,17.7867,12.03496,17.5626,14.09,15.4717Z" stroke-opacity="0" stroke="none"></path></svg>'), Zh = () => Qh.cloneNode(!0), Vh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4,17.0854L4,3.5C4,3.223858,4.22386,3,4.5,3C4.77614,3,5,3.223858,5,3.5L5,10L7.57584,10L9.8127,4.46359C9.91614,4.20756,10.20756,4.08386,10.46359,4.1873000000000005C10.71963,4.29075,10.84333,4.58216,10.73988,4.8382000000000005L8.65438,10L11.08535,10C11.29127,9.4174,11.84689,9,12.5,9C12.65154,9,12.79784,9.02247,12.93573,9.06427L16.6464,5.35355C16.8417,5.15829,17.1583,5.15829,17.3536,5.35355C17.5488,5.54882,17.5488,5.8654,17.3536,6.06066L13.7475,9.66675C13.907,9.90508,14,10.19168,14,10.5C14,11.15311,13.5826,11.70873,13,11.91465L13,14.3638L18.3714,12.1936C18.6274,12.09015,18.918799999999997,12.21385,19.0222,12.46989C19.1257,12.72592,19.002,13.0173,18.746000000000002,13.1208L13,15.4423L13,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854ZM6.3729499999999994,17.0413L12,14.7678L12,11.91465C11.88136,11.87271,11.76956,11.81627,11.66675,11.74746L6.3729499999999994,17.0413ZM12,15.8463L6.6694700000000005,18L12,18L12,15.8463ZM6.38629,15.6137L8.250350000000001,11L11,11L6.38629,15.6137ZM5,11L7.17182,11L5,16.3754L5,11Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Hh = () => Vh.cloneNode(!0), qh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17,4.5C17,5.32843,16.328400000000002,6,15.5,6C15.0931,6,14.7241,5.83802,14.4539,5.57503L5.98992,8.32515C5.99658,8.38251,6,8.440850000000001,6,8.5C6,9.15311,5.582599999999999,9.70873,5,9.91465L5,11.08535C5.42621,11.236,5.763999999999999,11.57379,5.91465,12L19.5,12C19.7761,12,20,12.22386,20,12.5C20,12.77614,19.7761,13,19.5,13L5.91465,13C5.70873,13.5826,5.15311,14,4.5,14C3.671573,14,3,13.3284,3,12.5C3,11.84689,3.417404,11.29127,4,11.08535L4,9.91465C3.417404,9.70873,3,9.15311,3,8.5C3,7.67157,3.671573,7,4.5,7C4.90411,7,5.2709,7.15981,5.5406200000000005,7.41967L14.0093,4.66802C14.0032,4.6128599999999995,14,4.5568,14,4.5C14,3.671573,14.6716,3,15.5,3C16.328400000000002,3,17,3.671573,17,4.5ZM4,15.5C4,15.2239,4.22386,15,4.5,15L19.5,15C19.7761,15,20,15.2239,20,15.5C20,15.7761,19.7761,16,19.5,16L4.5,16C4.22386,16,4,15.7761,4,15.5ZM4,18.5C4,18.2239,4.22386,18,4.5,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L4.5,19C4.22386,19,4,18.7761,4,18.5Z" stroke-opacity="0" stroke="none"></path></svg>'), Yh = () => qh.cloneNode(!0), Wh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M20,3.5C20,4.15311,19.5826,4.70873,19,4.91465L19,18.5C19,18.7761,18.7761,19,18.5,19L4.91465,19C4.70873,19.5826,4.15311,20,3.5,20C2.671573,20,2,19.3284,2,18.5C2,17.846899999999998,2.417404,17.2913,3,17.0854L3,3.5C3,3.22386,3.22386,3,3.5,3L17.0854,3C17.2913,2.417404,17.846899999999998,2,18.5,2C19.3284,2,20,2.671573,20,3.5ZM17.0854,4C17.236,4.42621,17.5738,4.763999999999999,18,4.91465L18,8L14,8L14,4L17.0854,4ZM13,4L13,8L9,8L9,4L13,4ZM13,9L9,9L9,13L13,13L13,9ZM13,14L9,14L9,18L13,18L13,14ZM14,18L14,14L18,14L18,18L14,18ZM18,13L14,13L14,9L18,9L18,13ZM4.91465,18C4.763999999999999,17.5738,4.42621,17.236,4,17.0854L4,14L8,14L8,18L4.91465,18ZM4,8L4,4L8,4L8,8L4,8ZM8,9L8,13L4,13L4,9L8,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Gh = () => Wh.cloneNode(!0), Xh = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" fill="none" stroke-opacity="1" stroke-width="1"></ellipse></svg>'), Jh = () => Xh.cloneNode(!0), ef = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.57625,6.9981C11.55099,6.999359999999999,11.52557,7,11.5,7C11.34,7,11.18584,6.97495,11.04125,6.9285499999999995L5.55401,16.4327C5.713760000000001,16.5905,5.83826,16.7839,5.91465,17L16.0854,17C16.2187,16.622700000000002,16.4987,16.314700000000002,16.8569,16.1445L11.57625,6.9981ZM12.50759,6.611219999999999C12.81005,6.336790000000001,13,5.94058,13,5.5C13,4.671573,12.32843,4,11.5,4C10.67157,4,10,4.671573,10,5.5C10,5.80059,10.08841,6.08052,10.24066,6.31522L4.64514,16.0069C4.59738,16.002299999999998,4.54896,16,4.5,16C3.671573,16,3,16.671599999999998,3,17.5C3,18.328400000000002,3.671573,19,4.5,19C5.15311,19,5.70873,18.5826,5.91465,18L16.0854,18C16.2913,18.5826,16.846899999999998,19,17.5,19C18.328400000000002,19,19,18.328400000000002,19,17.5C19,16.8365,18.5691,16.2735,17.971899999999998,16.075699999999998L12.50759,6.611219999999999Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), tf = () => ef.cloneNode(!0), nf = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19,4.5C19,5.15311,18.5826,5.70873,18,5.91465L18,18.5C18,18.7761,17.7761,19,17.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854L4,4.5C4,4.22386,4.22386,4,4.5,4L16.0854,4C16.2913,3.417404,16.846899999999998,3,17.5,3C18.328400000000002,3,19,3.671573,19,4.5ZM5,5L16.0854,5C16.236,5.42621,16.5738,5.763999999999999,17,5.91465L17,18L5.91465,18C5.763999999999999,17.5738,5.42621,17.236,5,17.0854L5,5Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), rf = () => nf.cloneNode(!0), of = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19.6401,7.99355C20.4028,7.92291,21,7.2811900000000005,21,6.5C21,5.671573,20.3284,5,19.5,5C18.8469,5,18.2913,5.417404,18.0854,6L7.62067,6C7.34453,6,7.12067,6.22386,7.12067,6.5C7.12067,6.5479,7.12741,6.59423,7.13999,6.63809L3.2294099999999997,15.0243C2.530138,15.1517,2,15.764,2,16.5C2,17.328400000000002,2.671573,18,3.5,18C4.15311,18,4.70873,17.5826,4.91465,17L14.5963,17C14.6456,17.076,14.7162,17.1396,14.8044,17.1807C15.0546,17.2974,15.3521,17.1891,15.4688,16.9388L19.6401,7.99355ZM14.7896,16.0293L18.6551,7.739599999999999C18.3942,7.56144,18.1925,7.30307,18.0854,7L8.0746,7L4.25044,15.2009C4.55701,15.3784,4.79493,15.6613,4.91465,16L14.6207,16C14.68,16,14.7368,16.0103,14.7896,16.0293Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), af = () => of.cloneNode(!0), sf = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.134443814697265,7.494615087890625L8.764323814697265,7.494615087890625L8.764323814697265,3.414215087890625L8.310223814697267,3.414215087890625L7.294603814697266,4.005035087890625L7.289713814697266,4.634915087890625L8.134443814697265,4.149892087890625L8.134443814697265,7.494615087890625ZM18.832003814697266,6.933095087890624Q19.004603814697266,6.635245087890625,19.004603814697266,6.2543850878906255Q19.004603814697266,5.884915087890625,18.845103814697264,5.593575087890625Q18.685503814697267,5.3006050878906255,18.399103814697266,5.136225087890625Q18.114303814697266,4.9702050878906245,17.754603814697266,4.9653250878906245L18.820603814697265,3.840647087890625L18.820603814697265,3.414215087890625L16.519203814697264,3.414215087890625L16.519203814697264,3.939931087890625L18.050803814697264,3.939931087890625L16.719403814697266,5.334785087890625L17.074203814697263,5.7205350878906245Q17.254903814697265,5.484525087890625,17.619503814697268,5.484525087890625Q17.980803814697268,5.484525087890625,18.187503814697266,5.689605087890625Q18.394203814697267,5.894685087890625,18.394203814697267,6.2543850878906255Q18.394203814697267,6.604315087890625,18.187503814697266,6.822415087890625Q17.980803814697268,7.0405150878906255,17.640603814697265,7.0405150878906255Q17.334603814697267,7.0405150878906255,17.124703814697266,6.890775087890625Q16.914703814697265,6.739415087890626,16.820303814697265,6.469225087890624L16.354803814697263,6.744295087890626Q16.480103814697266,7.125155087890625,16.821903814697265,7.341625087890625Q17.165403814697264,7.559725087890625,17.640603814697265,7.559725087890625Q18.039403814697266,7.559725087890625,18.348603814697267,7.393705087890625Q18.659503814697267,7.229315087890625,18.832003814697266,6.933095087890624ZM10.000003814697266,10.634915087890626C10.000003814697266,11.024655087890626,9.851363814697265,11.379685087890625,9.607683814697266,11.646395087890625L12.168903814697266,15.171615087890626C12.275403814697265,15.147615087890625,12.386203814697266,15.134915087890626,12.500003814697266,15.134915087890626C12.596503814697266,15.134915087890626,12.690803814697265,15.144015087890624,12.782303814697265,15.161415087890624L16.108803814697268,11.196955087890625C16.038703814697264,11.023375087890624,16.000003814697266,10.833655087890625,16.000003814697266,10.634915087890626C16.000003814697266,9.806495087890625,16.671603814697264,9.134915087890626,17.500003814697266,9.134915087890626C18.328403814697264,9.134915087890626,19.000003814697266,9.806495087890625,19.000003814697266,10.634915087890626C19.000003814697266,11.463345087890625,18.328403814697264,12.134915087890626,17.500003814697266,12.134915087890626C17.239503814697265,12.134915087890626,16.994503814697268,12.068495087890625,16.781003814697264,11.951675087890624L13.654703814697266,15.677415087890624C13.870303814697266,15.937215087890625,14.000003814697266,16.270915087890625,14.000003814697266,16.634915087890626C14.000003814697266,17.463315087890624,13.328403814697266,18.134915087890626,12.500003814697266,18.134915087890626C11.671573814697265,18.134915087890626,11.000003814697266,17.463315087890624,11.000003814697266,16.634915087890626C11.000003814697266,16.284415087890626,11.120193814697265,15.962015087890626,11.321603814697266,15.706715087890625L8.715393814697265,12.119565087890624C8.645053814697267,12.129685087890625,8.573143814697266,12.134915087890626,8.500003814697266,12.134915087890626C8.162103814697264,12.134915087890626,7.8503038146972655,12.023195087890626,7.599523814697266,11.834665087890626L4.505583814697266,15.521915087890624C4.809213814697266,15.796415087890624,5.000003814697266,16.193415087890624,5.000003814697266,16.634915087890626C5.000003814697266,17.463315087890624,4.328433814697266,18.134915087890626,3.5000038146972656,18.134915087890626C2.6715768146972656,18.134915087890626,2.0000038146972656,17.463315087890624,2.0000038146972656,16.634915087890626C2.0000038146972656,15.806515087890626,2.6715768146972656,15.134915087890626,3.5000038146972656,15.134915087890626C3.508253814697266,15.134915087890626,3.5164838146972657,15.135015087890626,3.524703814697266,15.135115087890625L7.033823814697266,10.953115087890625C7.011673814697265,10.850565087890626,7.000003814697266,10.744105087890624,7.000003814697266,10.634915087890626C7.000003814697266,9.806495087890625,7.671573814697266,9.134915087890626,8.500003814697266,9.134915087890626C9.328433814697267,9.134915087890626,10.000003814697266,9.806495087890625,10.000003814697266,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), lf = () => sf.cloneNode(!0), cf = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.13444,7.494615087890625L8.76432,7.494615087890625L8.76432,3.414215087890625L8.310220000000001,3.414215087890625L7.2946,4.005035087890625L7.28971,4.634915087890625L8.13444,4.149892087890625L8.13444,7.494615087890625ZM18.832,6.929835087890625Q19.0046,6.635245087890625,19.0046,6.2543850878906255Q19.0046,5.889805087890625,18.8451,5.5952050878906245Q18.6855,5.3006050878906255,18.3975,5.132965087890625Q18.1094,4.9653250878906245,17.7399,4.9653250878906245Q17.435499999999998,4.9653250878906245,17.1556,5.149245087890625L17.2793,3.939931087890625L18.8304,3.939931087890625L18.8304,3.414215087890625L16.7406,3.414215087890625L16.5094,5.665195087890625L17.0156,5.795405087890625Q17.095399999999998,5.655425087890626,17.2516,5.570795087890625Q17.4095,5.484525087890625,17.6357,5.484525087890625Q17.9694,5.484525087890625,18.1842,5.697745087890625Q18.4007,5.909335087890625,18.4007,6.2543850878906255Q18.4007,6.604315087890625,18.1842,6.822415087890625Q17.9694,7.0405150878906255,17.6292,7.0405150878906255Q17.3298,7.0405150878906255,17.119799999999998,6.890775087890625Q16.9098,6.739415087890626,16.825200000000002,6.474115087890625L16.3597,6.749175087890626Q16.470399999999998,7.110505087890624,16.807299999999998,7.335115087890625Q17.144199999999998,7.559725087890625,17.6292,7.559725087890625Q18.0296,7.559725087890625,18.3438,7.392075087890625Q18.6595,7.224435087890625,18.832,6.929835087890625ZM10,10.634915087890626C10,11.024655087890626,9.85136,11.379685087890625,9.60768,11.646395087890625L12.1689,15.171615087890626C12.2754,15.147615087890625,12.3862,15.134915087890626,12.5,15.134915087890626C12.5965,15.134915087890626,12.6908,15.144015087890624,12.7823,15.161415087890624L16.108800000000002,11.196955087890625C16.0387,11.023375087890624,16,10.833655087890625,16,10.634915087890626C16,9.806495087890625,16.671599999999998,9.134915087890626,17.5,9.134915087890626C18.3284,9.134915087890626,19,9.806495087890625,19,10.634915087890626C19,11.463345087890625,18.3284,12.134915087890626,17.5,12.134915087890626C17.2395,12.134915087890626,16.994500000000002,12.068505087890625,16.781,11.951675087890624L13.6547,15.677415087890624C13.8703,15.937215087890625,14,16.270915087890625,14,16.634915087890626C14,17.463315087890624,13.3284,18.134915087890626,12.5,18.134915087890626C11.67157,18.134915087890626,11,17.463315087890624,11,16.634915087890626C11,16.284415087890626,11.12019,15.962015087890626,11.3216,15.706715087890625L8.71539,12.119565087890624C8.645050000000001,12.129685087890625,8.57314,12.134915087890626,8.5,12.134915087890626C8.162099999999999,12.134915087890626,7.8503,12.023195087890626,7.59952,11.834665087890626L4.50558,15.521915087890624C4.80921,15.796415087890624,5,16.193415087890624,5,16.634915087890626C5,17.463315087890624,4.32843,18.134915087890626,3.5,18.134915087890626C2.671573,18.134915087890626,2,17.463315087890624,2,16.634915087890626C2,15.806515087890626,2.671573,15.134915087890626,3.5,15.134915087890626C3.5082500000000003,15.134915087890626,3.51648,15.135015087890626,3.5247,15.135115087890625L7.03382,10.953115087890625C7.01167,10.850565087890626,7,10.744105087890624,7,10.634915087890626C7,9.806495087890625,7.67157,9.134915087890626,8.5,9.134915087890626C9.32843,9.134915087890626,10,9.806495087890625,10,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), uf = () => cf.cloneNode(!0), df = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M18.8532,7.020985087890625Q19.0257,6.734525087890625,19.0257,6.369945087890625Q19.0257,6.020005087890625,18.8499,5.754705087890625Q18.6758,5.489415087890626,18.3649,5.339675087890625Q18.5944,5.209465087890625,18.7214,4.994615087890625Q18.8499,4.779775087890625,18.8499,4.5193550878906255Q18.8499,4.2003480878906245,18.7002,3.951324087890625Q18.5505,3.700673087890625,18.277,3.557444087890625Q18.0052,3.414215087890625,17.6455,3.414215087890625Q17.285800000000002,3.414215087890625,17.0107,3.557444087890625Q16.7357,3.700673087890625,16.5843,3.951324087890625Q16.4346,4.2003480878906245,16.4346,4.5193550878906255Q16.4346,4.779775087890625,16.561500000000002,4.994615087890625Q16.6901,5.209465087890625,16.919600000000003,5.339675087890625Q16.6055,5.489415087890626,16.4297,5.757965087890625Q16.255499999999998,6.024895087890625,16.255499999999998,6.369945087890625Q16.255499999999998,6.734525087890625,16.4297,7.020985087890625Q16.6055,7.305815087890625,16.919600000000003,7.465325087890625Q17.2354,7.624825087890625,17.6455,7.624825087890625Q18.0557,7.624825087890625,18.3682,7.465325087890625Q18.6807,7.305815087890625,18.8532,7.020985087890625ZM8.76432,7.559725087890625L8.13444,7.559725087890625L8.13444,4.214996087890625L7.28971,4.700025087890625L7.2946,4.070139087890625L8.310220000000001,3.479319087890625L8.76432,3.479319087890625L8.76432,7.559725087890625ZM17.1816,4.955555087890625Q17.0042,4.784655087890625,17.0042,4.5095950878906255Q17.0042,4.229645087890625,17.18,4.057119087890625Q17.355800000000002,3.884592087890625,17.6455,3.884592087890625Q17.935200000000002,3.884592087890625,18.1077,4.057119087890625Q18.2803,4.229645087890625,18.2803,4.5095950878906255Q18.2803,4.784655087890625,18.1045,4.955555087890625Q17.930300000000003,5.124825087890625,17.6455,5.124825087890625Q17.3607,5.124825087890625,17.1816,4.955555087890625ZM18.2217,5.7953950878906255Q18.4398,6.005365087890625,18.4398,6.3552950878906245Q18.4398,6.705235087890625,18.2217,6.915195087890625Q18.0052,7.125155087890625,17.6455,7.125155087890625Q17.285800000000002,7.125155087890625,17.067700000000002,6.915195087890625Q16.849600000000002,6.705235087890625,16.849600000000002,6.3552950878906245Q16.849600000000002,6.005365087890625,17.064500000000002,5.7953950878906255Q17.2793,5.585435087890625,17.6455,5.585435087890625Q18.0052,5.585435087890625,18.2217,5.7953950878906255ZM9.60768,11.711495087890626C9.85136,11.444785087890626,10,11.089765087890626,10,10.700025087890625C10,9.871595087890626,9.32843,9.200025087890625,8.5,9.200025087890625C7.67157,9.200025087890625,7,9.871595087890626,7,10.700025087890625C7,10.809205087890625,7.01167,10.915665087890625,7.03382,11.018215087890624L3.5247,15.200215087890625C3.51648,15.200115087890625,3.5082500000000003,15.200015087890625,3.5,15.200015087890625C2.671573,15.200015087890625,2,15.871615087890625,2,16.700015087890627C2,17.528415087890625,2.671573,18.200015087890627,3.5,18.200015087890627C4.32843,18.200015087890627,5,17.528415087890625,5,16.700015087890627C5,16.258515087890625,4.80921,15.861515087890625,4.50558,15.587015087890626L7.59952,11.899765087890625C7.8503,12.088295087890625,8.162099999999999,12.200025087890625,8.5,12.200025087890625C8.57314,12.200025087890625,8.645050000000001,12.194785087890626,8.71539,12.184675087890625L11.3216,15.771815087890625C11.12019,16.027215087890625,11,16.349515087890623,11,16.700015087890627C11,17.528415087890625,11.67157,18.200015087890627,12.5,18.200015087890627C13.3284,18.200015087890627,14,17.528415087890625,14,16.700015087890627C14,16.336015087890623,13.8703,16.002315087890626,13.6547,15.742515087890625L16.781,12.016775087890625C16.994500000000002,12.133605087890626,17.2395,12.200025087890625,17.5,12.200025087890625C18.3284,12.200025087890625,19,11.528445087890624,19,10.700025087890625C19,9.871595087890626,18.3284,9.200025087890625,17.5,9.200025087890625C16.671599999999998,9.200025087890625,16,9.871595087890626,16,10.700025087890625C16,10.898765087890624,16.0387,11.088475087890625,16.108800000000002,11.262055087890625L12.7823,15.226515087890625C12.6908,15.209115087890625,12.5965,15.200015087890625,12.5,15.200015087890625C12.3862,15.200015087890625,12.2754,15.212715087890626,12.1689,15.236715087890625L9.60768,11.711495087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), hf = () => df.cloneNode(!0), ff = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M9.474616630859375,7.494615087890625L8.844736630859375,7.494615087890625L8.844736630859375,4.149892087890625L8.000006630859374,4.634915087890625L8.004896630859374,4.005035087890625L9.020516630859376,3.414215087890625L9.474616630859375,3.414215087890625L9.474616630859375,7.494615087890625ZM18.529296630859378,4.8318550878906255Q18.307996630859375,5.028795087890625,18.122396630859377,5.385245087890625Q17.868496630859376,5.019035087890625,17.629196630859376,4.8269750878906255Q17.389996630859375,4.634915087890625,17.168596630859376,4.634915087890625Q16.794296630859375,4.634915087890625,16.522496630859376,4.976715087890625Q16.252296630859377,5.3168850878906255,16.252296630859377,5.7856350878906255Q16.252296630859377,6.218575087890625,16.502896630859375,6.521315087890625Q16.755196630859373,6.822415087890625,17.114896630859377,6.822415087890625Q17.368796630859375,6.822415087890625,17.588596630859374,6.625475087890624Q17.809896630859377,6.428535087890625,17.998696630859374,6.0688350878906245Q18.249396630859373,6.439935087890625,18.488596630859377,6.631985087890625Q18.727896630859377,6.822415087890625,18.952496630859375,6.822415087890625Q19.326796630859373,6.822415087890625,19.596996630859376,6.482245087890625Q19.868796630859375,6.140455087890626,19.868796630859375,5.671705087890626Q19.868796630859375,5.238755087890625,19.618196630859376,4.937655087890625Q19.367496630859375,4.634915087890625,19.006196630859375,4.634915087890625Q18.750696630859377,4.634915087890625,18.529296630859378,4.8318550878906255ZM18.337296630859377,5.674955087890625L18.278696630859375,5.596835087890625Q18.449596630859375,5.272935087890625,18.622096630859374,5.1101750878906245Q18.794596630859374,4.947415087890625,18.967096630859373,4.947415087890625Q19.194996630859375,4.947415087890625,19.346396630859374,5.1345950878906255Q19.497696630859377,5.320135087890625,19.497696630859377,5.598455087890625Q19.497696630859377,5.8914250878906245,19.360996630859376,6.096505087890625Q19.224296630859374,6.301585087890626,19.027396630859375,6.301585087890626Q18.915096630859374,6.301585087890626,18.742496630859375,6.146965087890624Q18.569996630859375,5.992335087890625,18.337296630859377,5.674955087890625ZM17.785496630859377,5.779125087890625L17.842496630859372,5.857245087890625Q17.668296630859373,6.186025087890625,17.495796630859374,6.348785087890625Q17.324896630859374,6.509915087890625,17.153996630859375,6.509915087890625Q16.926096630859377,6.509915087890625,16.774796630859377,6.324375087890624Q16.623396630859375,6.137195087890625,16.623396630859375,5.858875087890625Q16.623396630859375,5.565905087890625,16.761696630859376,5.360825087890625Q16.900096630859373,5.1557550878906255,17.095396630859376,5.1557550878906255Q17.228896630859374,5.1557550878906255,17.365596630859375,5.2778250878906245Q17.502296630859377,5.399895087890625,17.785496630859377,5.779125087890625ZM10.710296630859375,10.634915087890626C10.710296630859375,11.024655087890626,10.561656630859375,11.379685087890625,10.317976630859375,11.646395087890625L12.879196630859376,15.171615087890626C12.985696630859374,15.147615087890625,13.096496630859376,15.134915087890626,13.210296630859375,15.134915087890626C13.306796630859376,15.134915087890626,13.401096630859374,15.144015087890624,13.492596630859374,15.161415087890624L16.819096630859377,11.196955087890625C16.748996630859374,11.023375087890624,16.710296630859375,10.833655087890625,16.710296630859375,10.634915087890626C16.710296630859375,9.806495087890625,17.381896630859373,9.134915087890626,18.210296630859375,9.134915087890626C19.038696630859373,9.134915087890626,19.710296630859375,9.806495087890625,19.710296630859375,10.634915087890626C19.710296630859375,11.463345087890625,19.038696630859373,12.134915087890626,18.210296630859375,12.134915087890626C17.949796630859375,12.134915087890626,17.704796630859377,12.068505087890625,17.491296630859374,11.951675087890624L14.364996630859375,15.677415087890624C14.580596630859375,15.937215087890625,14.710296630859375,16.270915087890625,14.710296630859375,16.634915087890626C14.710296630859375,17.463315087890624,14.038696630859375,18.134915087890626,13.210296630859375,18.134915087890626C12.381866630859374,18.134915087890626,11.710296630859375,17.463315087890624,11.710296630859375,16.634915087890626C11.710296630859375,16.284415087890626,11.830486630859374,15.962015087890626,12.031896630859375,15.706715087890625L9.425686630859374,12.119565087890624C9.355346630859376,12.129685087890625,9.283436630859375,12.134915087890626,9.210296630859375,12.134915087890626C8.872396630859374,12.134915087890626,8.560596630859376,12.023195087890626,8.309816630859375,11.834665087890626L5.215876630859375,15.521915087890624C5.519506630859375,15.796415087890624,5.710296630859375,16.193415087890624,5.710296630859375,16.634915087890626C5.710296630859375,17.463315087890624,5.038726630859375,18.134915087890626,4.210296630859375,18.134915087890626C3.381869630859375,18.134915087890626,2.710296630859375,17.463315087890624,2.710296630859375,16.634915087890626C2.710296630859375,15.806515087890626,3.381869630859375,15.134915087890626,4.210296630859375,15.134915087890626C4.218546630859375,15.134915087890626,4.226776630859375,15.135015087890626,4.234996630859375,15.135115087890625L7.744116630859375,10.953115087890625C7.721966630859375,10.850565087890626,7.710296630859375,10.744105087890624,7.710296630859375,10.634915087890626C7.710296630859375,9.806495087890625,8.381866630859374,9.134915087890626,9.210296630859375,9.134915087890626C10.038726630859376,9.134915087890626,10.710296630859375,9.806495087890625,10.710296630859375,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), mf = () => ff.cloneNode(!0), gf = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M21,5.5C21,6.32843,20.3284,7,19.5,7C19.4136,7,19.3289,6.99269,19.2465,6.97866L15.6257,15.5086C15.8587,15.7729,16,16.119999999999997,16,16.5C16,17.328400000000002,15.3284,18,14.5,18C13.8469,18,13.2913,17.5826,13.0854,17L3.91465,17C3.70873,17.5826,3.15311,18,2.5,18C1.671573,18,1,17.328400000000002,1,16.5C1,15.6716,1.671573,15,2.5,15C2.5840199999999998,15,2.66643,15.0069,2.74668,15.0202L6.36934,6.48574C6.13933,6.22213,6,5.87733,6,5.5C6,4.671573,6.67157,4,7.5,4C8.15311,4,8.70873,4.417404,8.91465,5L18.0854,5C18.2913,4.417404,18.8469,4,19.5,4C20.3284,4,21,4.671573,21,5.5ZM18.0854,6L8.91465,6C8.892579999999999,6.06243,8.8665,6.12296,8.83672,6.18128L13.9814,15.0921C14.143,15.0325,14.3177,15,14.5,15C14.584,15,14.6664,15.0069,14.7467,15.0202L18.3693,6.48574C18.2462,6.3446,18.149,6.1802,18.0854,6ZM13.2036,15.745L8.0861,6.8811800000000005C7.90605,6.95768,7.70797,7,7.5,7C7.41359,7,7.32888,6.99269,7.24647,6.97866L3.62571,15.5086C3.7512,15.651,3.8501,15.8174,3.91465,16L13.0854,16C13.1169,15.9108,13.1566,15.8255,13.2036,15.745Z" stroke-opacity="0" stroke="none"></path></svg>'), yf = () => gf.cloneNode(!0), pf = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.92159,5.93994C6.04014,5.90529,6.152620000000001,5.85639,6.25704,5.79523L9.12729,9.89437C9.045449999999999,10.07959,9,10.28449,9,10.5C9,10.79522,9.08529,11.07053,9.232569999999999,11.30262L4.97573,16.7511L5.92159,5.93994ZM4.92259,5.8848400000000005C4.38078,5.658659999999999,4,5.1238,4,4.5C4,3.671573,4.67157,3,5.5,3C6.2157,3,6.81433,3.50124,6.96399,4.17183L15.1309,4.88634C15.3654,4.36387,15.8902,4,16.5,4C17.328400000000002,4,18,4.67157,18,5.5C18,6.08983,17.659599999999998,6.60015,17.1645,6.84518L18.4264,14.0018C18.4508,14.0006,18.4753,14,18.5,14C19.3284,14,20,14.6716,20,15.5C20,16.328400000000002,19.3284,17,18.5,17C17.932499999999997,17,17.4386,16.6849,17.183799999999998,16.22L5.99686,18.5979C5.946429999999999,19.3807,5.29554,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.869300000000003,3.389292,17.3295,3.94071,17.1077L4.92259,5.8848400000000005ZM5.72452,17.6334C5.69799,17.596,5.6698,17.5599,5.64004,17.525100000000002L10.01843,11.92103C10.16958,11.97223,10.33155,12,10.5,12C10.80059,12,11.08052,11.91158,11.31522,11.75934L17.0606,15.0765C17.0457,15.1271,17.0335,15.1789,17.023899999999998,15.2317L5.72452,17.6334ZM11.92855,10.95875L17.4349,14.1379L16.1699,6.96356C15.9874,6.92257,15.8174,6.8483,15.6667,6.74746L11.99771,10.4165C11.99923,10.44414,12,10.47198,12,10.5C12,10.66,11.97495,10.814160000000001,11.92855,10.95875ZM10.5,9C10.259830000000001,9,10.03285,9.05644,9.83159,9.15679L7.04919,5.1831L15.0493,5.88302C15.054,5.90072,15.059,5.91829,15.0643,5.9357299999999995L11.56066,9.43934C11.28921,9.16789,10.91421,9,10.5,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), vf = () => pf.cloneNode(!0), Cf = /* @__PURE__ */ $('<svg viewBox="0 0 22 22"><path d="M4.727219638671875,8.007996215820313L9.973849638671876,2.7629472158203123C10.167279638671875,2.5696791158203123,10.480729638671875,2.5696791158203123,10.674169638671875,2.7629472158203123L13.223329638671874,5.311756215820313C13.416929638671874,5.505236215820313,13.416929638671874,5.8189862158203125,13.223329638671874,6.012466215820313L7.977129638671875,11.257906215820313C7.379859638671875,11.855176215820313,7.407609638671875,12.909396215820312,8.033809638671876,13.535596215820313C8.660409638671876,14.162596215820313,9.713849638671874,14.189996215820312,10.311129638671876,13.591896215820313L15.556929638671875,8.346066215820311C15.750429638671875,8.152526215820313,16.064229638671875,8.152526215820313,16.257629638671872,8.346066215820311L18.806529638671876,10.895266215820312C19.000029638671876,11.088746215820313,19.000029638671876,11.402496215820312,18.806529638671876,11.595976215820313L13.560629638671875,16.841796215820313C11.165619638671876,19.237196215820312,7.197149638671875,19.19919621582031,4.783499638671875,16.785496215820313C2.3698426386718747,14.371896215820312,2.331397638671875,10.403416215820313,4.727219638671875,8.007996215820313ZM12.172299638671875,5.662106215820312L10.323809638671875,3.8136162158203124L5.4287196386718755,8.709096215820313C3.422893638671875,10.714536215820312,3.4549956386718748,14.055196215820313,5.484999638671875,16.08479621582031C7.514609638671875,18.114796215820313,10.855289638671875,18.146496215820314,12.860719638671876,16.141096215820312L15.465629638671874,13.535796215820312L14.090929638671875,12.160756215820312L14.791629638671875,11.460436215820312L16.166229638671876,12.834996215820313L17.755829638671877,11.245226215820313L15.907729638671874,9.396736215820312L11.011839638671875,14.292596215820312C10.042809638671875,15.262396215820312,8.418249638671874,15.243796215820312,7.406019638671875,14.306496215820312L7.333099638671875,14.236296215820312C6.327599638671876,13.230796215820313,6.284009638671876,11.550396215820312,7.276419638671875,10.557586215820312L9.882199638671874,7.952026215820313L8.501079638671875,6.570906215820313L9.201789638671876,5.870186215820313L10.582939638671874,7.251336215820312L12.172299638671875,5.662106215820312Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), bf = (e) => (() => {
  const n = Cf.cloneNode(!0);
  return Se(n, "class", `icon-overlay ${e ?? ""}`), n;
})(), $f = /* @__PURE__ */ $('<svg viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_615"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_615)"><path d="M19.672,3.0673368C19.4417,2.9354008,19.1463,3.00292252,18.9994,3.2210900000000002L17.4588,5.50622L16.743299999999998,3.781253L13.9915,7.4662L13.9618,7.51108C13.8339,7.72862,13.8936,8.005659999999999,14.1004,8.15391L14.1462,8.183430000000001C14.3683,8.308720000000001,14.6511,8.25001,14.8022,8.047229999999999L16.4907,5.78571L17.246299999999998,7.60713L19.8374,3.7635389999999997L19.8651,3.717088C19.9871,3.484615,19.9023,3.199273,19.672,3.0673368ZM4.79974,8.462530000000001L10.117740000000001,3.252975C10.31381,3.0610145,10.63152,3.0610145,10.82759,3.252975L13.4115,5.78453C13.6076,5.976710000000001,13.6076,6.28833,13.4115,6.4805L8.093869999999999,11.69045C7.48847,12.28368,7.51659,13.3308,8.151309999999999,13.9528C8.786439999999999,14.5755,9.85421,14.6027,10.45961,14.0087L15.7768,8.79831C15.9729,8.60609,16.2909,8.60609,16.487099999999998,8.79831L19.0705,11.33026C19.2667,11.52244,19.2667,11.83406,19.0705,12.02623L13.7533,17.2366C11.32572,19.6158,7.30328,19.578,4.85679,17.1807C2.410298,14.7834,2.371331,10.84174,4.79974,8.462530000000001ZM12.3461,6.1325199999999995L10.47246,4.29654L5.51079,9.15889C3.477674,11.15076,3.510214,14.4688,5.56784,16.4847C7.62506,18.500999999999998,11.01117,18.5325,13.0439,16.540599999999998L15.6842,13.9529L14.2908,12.58718L15.0011,11.89161L16.394399999999997,13.2569L18.0056,11.67786L16.1323,9.84188L11.16985,14.7046C10.18764,15.6679,8.540980000000001,15.6494,7.51498,14.7184L7.44107,14.6487C6.4219,13.65,6.37771,11.98096,7.38362,10.994869999999999L10.02485,8.40693L8.624939999999999,7.03516L9.335180000000001,6.33919L10.73512,7.71099L12.3461,6.1325199999999995Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), _f = (e) => (() => {
  const n = $f.cloneNode(!0);
  return Se(n, "class", `icon-overlay ${e ?? ""}`), n;
})(), kf = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,17C5.80945,17,3.667717,12.85,3.113386,11.575C2.9622047,11.2,2.9622047,10.8,3.113386,10.425C3.667717,9.15,5.80945,5,11,5C16.165399999999998,5,18.3323,9.15,18.8866,10.425C19.0378,10.8,19.0378,11.2,18.8866,11.575C18.3323,12.85,16.165399999999998,17,11,17ZM4.04567,10.8C3.995276,10.925,3.995276,11.05,4.04567,11.175C4.52441,12.325,6.43937,16,11,16C15.5606,16,17.4756,12.325,17.9543,11.2C18.0047,11.075,18.0047,10.95,17.9543,10.825C17.4756,9.675,15.5606,6,11,6C6.43937,6,4.52441,9.675,4.04567,10.8ZM11,13.5C9.61417,13.5,8.480319999999999,12.375,8.480319999999999,11C8.480319999999999,9.625,9.61417,8.5,11,8.5C12.38583,8.5,13.5197,9.625,13.5197,11C13.5197,12.375,12.38583,13.5,11,13.5ZM11,9.5C10.1685,9.5,9.48819,10.175,9.48819,11C9.48819,11.825,10.1685,12.5,11,12.5C11.8315,12.5,12.51181,11.825,12.51181,11C12.51181,10.175,11.8315,9.5,11,9.5Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), xf = () => kf.cloneNode(!0), Lf = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.80417,14.9887L4.62563,16.167299999999997C4.43037,16.3625,4.43037,16.6791,4.62563,16.8744C4.82089,17.0696,5.13748,17.0696,5.332739999999999,16.8744L6.62638,15.5807C7.75595,16.290100000000002,9.19328,16.7929,11,16.7929C16.165399999999998,16.7929,18.3323,12.64289,18.8866,11.36789C19.0378,10.99289,19.0378,10.59289,18.8866,10.21789C18.5549,9.45486,17.6456,7.66212,15.8617,6.34545L17.3536,4.853553C17.5488,4.658291,17.5488,4.341709,17.3536,4.146447C17.1583,3.9511845,16.8417,3.9511845,16.6464,4.146447L15.0014,5.7915399999999995C13.9314,5.1969,12.61166,4.792893,11,4.792893C5.80945,4.792893,3.667717,8.94289,3.113386,10.21789C2.9622049,10.59289,2.9622049,10.99289,3.113386,11.36789C3.424435,12.08333,4.2353000000000005,13.70399,5.80417,14.9887ZM7.36012,14.847C8.32327,15.4074,9.52286,15.7929,11,15.7929C15.5606,15.7929,17.4756,12.11789,17.9543,10.99289C18.0047,10.86789,18.0047,10.74289,17.9543,10.61789C17.659,9.90846,16.8171,8.23812,15.1447,7.06241L12.96929,9.23782C13.3134,9.66543,13.5197,10.20642,13.5197,10.79289C13.5197,12.16789,12.38583,13.29289,11,13.29289C10.41596,13.29289,9.87667,13.09308,9.44815,12.75896L7.36012,14.847ZM8.794609999999999,11.99829L6.520099999999999,14.2728C5.06905,13.12119,4.32057,11.628250000000001,4.04567,10.96789C3.995275,10.84289,3.995275,10.71789,4.04567,10.59289C4.52441,9.46789,6.43937,5.79289,11,5.79289C12.28868,5.79289,13.3661,6.086320000000001,14.2596,6.53329L12.19759,8.5953C11.84086,8.40257,11.43271,8.29289,11,8.29289C9.61417,8.29289,8.480319999999999,9.41789,8.480319999999999,10.79289C8.480319999999999,11.22918,8.594470000000001,11.64029,8.794609999999999,11.99829ZM10.16528,12.04183C10.404869999999999,12.20032,10.692070000000001,12.29289,11,12.29289C11.8315,12.29289,12.51181,11.61789,12.51181,10.79289C12.51181,10.48318,12.41593,10.194600000000001,12.25216,9.95494L10.16528,12.04183ZM11.43602,9.35687L9.55616,11.236740000000001C9.512,11.09633,9.48819,10.94724,9.48819,10.79289C9.48819,9.96789,10.1685,9.29289,11,9.29289C11.15142,9.29289,11.29782,9.31528,11.43602,9.35687Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), wf = () => Lf.cloneNode(!0), Af = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_625"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_625)"><path d="M14.5385,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807692,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.88462,4,14.5385,5.61538,14.5385,7.576919999999999L14.5385,9.76923ZM10.88461,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923L13.38462,9.76923L13.38462,7.576919999999999C13.38462,6.23077,12.26923,5.15385,10.88461,5.15385ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.038450000000001,12.07692,11.307680000000001,12.34615,11.307680000000001,12.65385L11.307680000000001,14.5769C11.307680000000001,14.8846,11.038450000000001,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), Mf = () => Af.cloneNode(!0), Tf = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_620"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_620)"><path d="M8.38461,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807693,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.46154,4,13.84615,4.961539,14.3462,6.423080000000001C14.4615,6.73077,14.3077,7.038460000000001,14,7.15385C13.69231,7.26923,13.38461,7.11538,13.26923,6.80769C12.92308,5.80769,11.96154,5.15385,10.88462,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.03846,12.07692,11.307690000000001,12.34615,11.307690000000001,12.65385L11.307690000000001,14.5769C11.307690000000001,14.8846,11.03846,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), Sf = () => Tf.cloneNode(!0), Pf = /* @__PURE__ */ $('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M16.966900000000003,8.67144C16.6669,8.67144,16.4247,8.91558,16.4247,9.21802L16.4247,16.631500000000003C16.4247,17.322,16.007199999999997,17.9068,15.5139,17.9068L13.93072,17.9068L13.93072,9.2162C13.93072,8.91741,13.68675,8.67144,13.38855,8.67144C13.09036,8.67144,12.84639,8.91741,12.84639,9.21802L12.84639,17.9068L10.151810000000001,17.9068L10.151810000000001,9.21802C10.151810000000001,8.91741,9.90783,8.67144,9.609639999999999,8.67144C9.31145,8.67144,9.06747,8.91741,9.06747,9.219850000000001L9.06747,17.9068L7.48614,17.9068C6.99277,17.9068,6.5753,17.322,6.5753,16.631500000000003L6.5753,9.21802C6.5753,8.91558,6.333130000000001,8.67144,6.03313,8.67144C5.73313,8.67144,5.49096,8.91558,5.49096,9.21802L5.49096,16.631500000000003C5.49096,17.9378,6.385540000000001,19,7.48614,19L15.512,19C16.6127,19,17.509,17.9378,17.509,16.631500000000003L17.509,9.21802C17.509,8.91558,17.2669,8.67144,16.966900000000003,8.67144ZM18.4578,6.21183L4.542169,6.21183C4.243976,6.21183,4,6.45779,4,6.75841C4,7.05903,4.243976,7.30499,4.542169,7.30499L18.4578,7.30499C18.756,7.30499,19,7.05903,19,6.75841C19,6.45779,18.756,6.21183,18.4578,6.21183ZM8.68072,5.10045L14.3193,5.10045C14.6175,5.10045,14.8614,4.852666,14.8614,4.550225C14.8614,4.247783,14.6175,4,14.3193,4L8.68072,4C8.38253,4,8.13855,4.247783,8.13855,4.550225C8.13855,4.852666,8.38253,5.10045,8.68072,5.10045Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), Df = () => Pf.cloneNode(!0), Of = {
  horizontalStraightLine: fh,
  horizontalRayLine: gh,
  horizontalSegment: ph,
  verticalStraightLine: Ch,
  verticalRayLine: $h,
  verticalSegment: kh,
  straightLine: Lh,
  rayLine: Ah,
  segment: Th,
  arrow: Ph,
  priceLine: Oh,
  priceChannelLine: Ih,
  parallelStraightLine: Bh,
  fibonacciLine: Uh,
  fibonacciSegment: zh,
  fibonacciCircle: jh,
  fibonacciSpiral: Zh,
  fibonacciSpeedResistanceFan: Hh,
  fibonacciExtension: Yh,
  gannBox: Gh,
  circle: Jh,
  triangle: tf,
  rect: rf,
  parallelogram: af,
  threeWaves: lf,
  fiveWaves: uf,
  eightWaves: hf,
  anyWaves: mf,
  abcd: yf,
  xabcd: vf,
  weak_magnet: bf,
  strong_magnet: _f,
  lock: Mf,
  unlock: Sf,
  visible: xf,
  invisible: wf,
  remove: Df
};
function Nf(e) {
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
function If(e) {
  return [
    { key: "priceChannelLine", text: c("price_channel_line", e) },
    { key: "parallelStraightLine", text: c("parallel_straight_line", e) }
  ];
}
function Ef(e) {
  return [
    { key: "circle", text: c("circle", e) },
    { key: "rect", text: c("rect", e) },
    { key: "parallelogram", text: c("parallelogram", e) },
    { key: "triangle", text: c("triangle", e) }
  ];
}
function Bf(e) {
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
function Ff(e) {
  return [
    { key: "xabcd", text: c("xabcd", e) },
    { key: "abcd", text: c("abcd", e) },
    { key: "threeWaves", text: c("three_waves", e) },
    { key: "fiveWaves", text: c("five_waves", e) },
    { key: "eightWaves", text: c("eight_waves", e) },
    { key: "anyWaves", text: c("any_waves", e) }
  ];
}
function Uf(e) {
  return [
    { key: "weak_magnet", text: c("weak_magnet", e) },
    { key: "strong_magnet", text: c("strong_magnet", e) }
  ];
}
const Ge = (e) => Of[e.name](e.class), Rf = /* @__PURE__ */ $('<div class="klinecharts-pro-drawing-bar"><span class="split-line"></span><div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div><div class="item"><span style="width:32px;height:32px"></span></div><div class="item"><span style="width:32px;height:32px"></span></div><span class="split-line"></span><div class="item"><span style="width:32px;height:32px"></span></div></div>'), zf = /* @__PURE__ */ $('<div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div>'), Pr = /* @__PURE__ */ $('<li><span style="padding-left:8px"></span></li>'), Dr = "drawing_tools", Kf = (e) => {
  const [n, t] = T("horizontalStraightLine"), [o, s] = T("priceChannelLine"), [l, h] = T("circle"), [d, v] = T("fibonacciLine"), [x, p] = T("xabcd"), [w, M] = T("weak_magnet"), [D, U] = T("normal"), [B, O] = T(!1), [j, ee] = T(!0), [R, W] = T(""), V = Z(() => [{
    key: "singleLine",
    icon: n(),
    list: Nf(e.locale),
    setter: t
  }, {
    key: "moreLine",
    icon: o(),
    list: If(e.locale),
    setter: s
  }, {
    key: "polygon",
    icon: l(),
    list: Ef(e.locale),
    setter: h
  }, {
    key: "fibonacci",
    icon: d(),
    list: Bf(e.locale),
    setter: v
  }, {
    key: "wave",
    icon: x(),
    list: Ff(e.locale),
    setter: p
  }]), he = Z(() => Uf(e.locale));
  return (() => {
    const K = Rf.cloneNode(!0), Q = K.firstChild, q = Q.nextSibling, re = q.firstChild, se = re.nextSibling, _e = se.firstChild, xe = q.nextSibling, fe = xe.firstChild, Fe = xe.nextSibling, ke = Fe.firstChild, ve = Fe.nextSibling, ne = ve.nextSibling, me = ne.firstChild;
    return C(K, () => V().map((H) => (() => {
      const N = zf.cloneNode(!0), E = N.firstChild, Ce = E.nextSibling, Pe = Ce.firstChild;
      return N.addEventListener("blur", () => {
        W("");
      }), E.$$click = () => {
        e.onDrawingItemClick({
          groupId: Dr,
          name: H.icon,
          visible: j(),
          lock: B(),
          mode: D()
        });
      }, C(E, L(Ge, {
        get name() {
          return H.icon;
        }
      })), Ce.$$click = () => {
        H.key === R() ? W("") : W(H.key);
      }, C(N, (() => {
        const le = Z(() => H.key === R());
        return () => le() && L(Gt, {
          class: "list",
          get children() {
            return H.list.map((Ie) => (() => {
              const _ = Pr.cloneNode(!0), ae = _.firstChild;
              return _.$$click = () => {
                H.setter(Ie.key), e.onDrawingItemClick({
                  name: Ie.key,
                  lock: B(),
                  mode: D()
                }), W("");
              }, C(_, L(Ge, {
                get name() {
                  return Ie.key;
                }
              }), ae), C(ae, () => Ie.text), _;
            })());
          }
        });
      })(), null), I(() => Se(Pe, "class", H.key === R() ? "rotate" : "")), N;
    })()), Q), q.addEventListener("blur", () => {
      W("");
    }), re.$$click = () => {
      let H = w();
      D() !== "normal" && (H = "normal"), U(H), e.onModeChange(H);
    }, C(re, (() => {
      const H = Z(() => w() === "weak_magnet");
      return () => H() ? (() => {
        const N = Z(() => D() === "weak_magnet");
        return () => N() ? L(Ge, {
          name: "weak_magnet",
          class: "selected"
        }) : L(Ge, {
          name: "weak_magnet"
        });
      })() : (() => {
        const N = Z(() => D() === "strong_magnet");
        return () => N() ? L(Ge, {
          name: "strong_magnet",
          class: "selected"
        }) : L(Ge, {
          name: "strong_magnet"
        });
      })();
    })()), se.$$click = () => {
      R() === "mode" ? W("") : W("mode");
    }, C(q, (() => {
      const H = Z(() => R() === "mode");
      return () => H() && L(Gt, {
        class: "list",
        get children() {
          return he().map((N) => (() => {
            const E = Pr.cloneNode(!0), Ce = E.firstChild;
            return E.$$click = () => {
              M(N.key), U(N.key), e.onModeChange(N.key), W("");
            }, C(E, L(Ge, {
              get name() {
                return N.key;
              }
            }), Ce), C(Ce, () => N.text), E;
          })());
        }
      });
    })(), null), fe.$$click = () => {
      const H = !B();
      O(H), e.onLockChange(H);
    }, C(fe, (() => {
      const H = Z(() => !!B());
      return () => H() ? L(Ge, {
        name: "lock"
      }) : L(Ge, {
        name: "unlock"
      });
    })()), ke.$$click = () => {
      const H = !j();
      ee(H), e.onVisibleChange(H);
    }, C(ke, (() => {
      const H = Z(() => !!j());
      return () => H() ? L(Ge, {
        name: "visible"
      }) : L(Ge, {
        name: "invisible"
      });
    })()), me.$$click = () => {
      e.onRemoveClick(Dr);
    }, C(me, L(Ge, {
      name: "remove"
    })), I(() => Se(_e, "class", R() === "mode" ? "rotate" : "")), K;
  })();
};
Ze(["click"]);
const Or = /* @__PURE__ */ $('<li class="title"></li>'), Nr = /* @__PURE__ */ $('<li class="row"></li>'), jf = (e) => L(_1, {
  get title() {
    return c("indicator", e.locale);
  },
  width: 400,
  get onClose() {
    return e.onClose;
  },
  get children() {
    return L(Gt, {
      class: "klinecharts-pro-indicator-modal-list",
      get children() {
        return [(() => {
          const n = Or.cloneNode(!0);
          return C(n, () => c("main_indicator", e.locale)), n;
        })(), Z(() => ["MA", "EMA", "SMA", "BOLL", "SAR", "BBI"].map((n) => {
          const t = e.mainIndicators.includes(n);
          return (() => {
            const o = Nr.cloneNode(!0);
            return o.$$click = (s) => {
              e.onMainIndicatorChange({
                name: n,
                paneId: "candle_pane",
                added: !t
              });
            }, C(o, L(Tr, {
              checked: t,
              get label() {
                return c(n.toLowerCase(), e.locale);
              }
            })), o;
          })();
        })), (() => {
          const n = Or.cloneNode(!0);
          return C(n, () => c("sub_indicator", e.locale)), n;
        })(), Z(() => ["MA", "EMA", "VOL", "MACD", "BOLL", "KDJ", "RSI", "BIAS", "BRAR", "CCI", "DMI", "CR", "PSY", "DMA", "TRIX", "OBV", "VR", "WR", "MTM", "EMV", "SAR", "SMA", "ROC", "PVT", "BBI", "AO"].map((n) => {
          const t = n in e.subIndicators;
          return (() => {
            const o = Nr.cloneNode(!0);
            return o.$$click = (s) => {
              e.onSubIndicatorChange({
                name: n,
                paneId: e.subIndicators[n] ?? "",
                added: !t
              });
            }, C(o, L(Tr, {
              checked: t,
              get label() {
                return c(n.toLowerCase(), e.locale);
              }
            })), o;
          })();
        }))];
      }
    });
  }
});
Ze(["click"]);
function Ir(e, n) {
  switch (e) {
    case "Etc/UTC":
      return c("utc", n);
    case "Pacific/Midway":
      return c("midway", n);
    case "Pacific/Honolulu":
      return c("honolulu", n);
    case "America/Anchorage":
      return c("anchorage", n);
    case "America/Juneau":
      return c("juneau", n);
    case "America/Los_Angeles":
      return c("los_angeles", n);
    case "America/Vancouver":
      return c("vancouver", n);
    case "America/Tijuana":
      return c("tijuana", n);
    case "America/Phoenix":
      return c("phoenix", n);
    case "America/Denver":
      return c("denver", n);
    case "America/Chicago":
      return c("chicago", n);
    case "America/Mexico_City":
      return c("mexico_city", n);
    case "America/Guatemala":
      return c("guatemala", n);
    case "America/New_York":
      return c("new_york", n);
    case "America/Toronto":
      return c("toronto", n);
    case "America/Bogota":
      return c("bogota", n);
    case "America/Lima":
      return c("lima", n);
    case "America/Caracas":
      return c("caracas", n);
    case "America/Halifax":
      return c("halifax", n);
    case "America/Santiago":
      return c("santiago", n);
    case "America/La_Paz":
      return c("la_paz", n);
    case "America/Sao_Paulo":
      return c("sao_paulo", n);
    case "America/Buenos_Aires":
      return c("buenos_aires", n);
    case "America/Montevideo":
      return c("montevideo", n);
    case "America/Godthab":
      return c("godthab", n);
    case "Atlantic/Azores":
      return c("azores", n);
    case "Atlantic/Cape_Verde":
      return c("cape_verde", n);
    case "Europe/London":
      return c("london", n);
    case "Europe/Dublin":
      return c("dublin", n);
    case "Europe/Lisbon":
      return c("lisbon", n);
    case "Africa/Casablanca":
      return c("casablanca", n);
    case "Europe/Paris":
      return c("paris", n);
    case "Europe/Berlin":
      return c("berlin", n);
    case "Europe/Amsterdam":
      return c("amsterdam", n);
    case "Europe/Brussels":
      return c("brussels", n);
    case "Europe/Madrid":
      return c("madrid", n);
    case "Europe/Rome":
      return c("rome", n);
    case "Europe/Vienna":
      return c("vienna", n);
    case "Europe/Warsaw":
      return c("warsaw", n);
    case "Africa/Lagos":
      return c("lagos", n);
    case "Europe/Athens":
      return c("athens", n);
    case "Europe/Bucharest":
      return c("bucharest", n);
    case "Europe/Helsinki":
      return c("helsinki", n);
    case "Europe/Istanbul":
      return c("istanbul", n);
    case "Europe/Kiev":
      return c("kiev", n);
    case "Africa/Cairo":
      return c("cairo", n);
    case "Africa/Johannesburg":
      return c("johannesburg", n);
    case "Asia/Jerusalem":
      return c("jerusalem", n);
    case "Europe/Moscow":
      return c("moscow", n);
    case "Asia/Baghdad":
      return c("baghdad", n);
    case "Asia/Kuwait":
      return c("kuwait", n);
    case "Asia/Riyadh":
      return c("riyadh", n);
    case "Asia/Bahrain":
      return c("bahrain", n);
    case "Africa/Nairobi":
      return c("nairobi", n);
    case "Asia/Tehran":
      return c("tehran", n);
    case "Asia/Dubai":
      return c("dubai", n);
    case "Asia/Muscat":
      return c("muscat", n);
    case "Asia/Baku":
      return c("baku", n);
    case "Asia/Kabul":
      return c("kabul", n);
    case "Asia/Karachi":
      return c("karachi", n);
    case "Asia/Tashkent":
      return c("tashkent", n);
    case "Asia/Ashkhabad":
      return c("ashkhabad", n);
    case "Asia/Kolkata":
      return c("kolkata", n);
    case "Asia/Mumbai":
      return c("mumbai", n);
    case "Asia/Colombo":
      return c("colombo", n);
    case "Asia/Kathmandu":
      return c("kathmandu", n);
    case "Asia/Dhaka":
      return c("dhaka", n);
    case "Asia/Almaty":
      return c("almaty", n);
    case "Asia/Yangon":
      return c("yangon", n);
    case "Asia/Bangkok":
      return c("bangkok", n);
    case "Asia/Jakarta":
      return c("jakarta", n);
    case "Asia/Ho_Chi_Minh":
      return c("ho_chi_minh", n);
    case "Asia/Shanghai":
      return c("shanghai", n);
    case "Asia/Hong_Kong":
      return c("hong_kong", n);
    case "Asia/Singapore":
      return c("singapore", n);
    case "Asia/Taipei":
      return c("taipei", n);
    case "Asia/Manila":
      return c("manila", n);
    case "Asia/Kuala_Lumpur":
      return c("kuala_lumpur", n);
    case "Australia/Perth":
      return c("perth", n);
    case "Asia/Tokyo":
      return c("tokyo", n);
    case "Asia/Seoul":
      return c("seoul", n);
    case "Asia/Pyongyang":
      return c("pyongyang", n);
    case "Australia/Adelaide":
      return c("adelaide", n);
    case "Australia/Darwin":
      return c("darwin", n);
    case "Australia/Brisbane":
      return c("brisbane", n);
    case "Australia/Sydney":
      return c("sydney", n);
    case "Australia/Melbourne":
      return c("melbourne", n);
    case "Pacific/Guam":
      return c("guam", n);
    case "Pacific/Port_Moresby":
      return c("port_moresby", n);
    case "Pacific/Norfolk":
      return c("norfolk", n);
    case "Pacific/Guadalcanal":
      return c("guadalcanal", n);
    case "Pacific/Auckland":
      return c("auckland", n);
    case "Pacific/Fiji":
      return c("fiji", n);
    case "Pacific/Tongatapu":
      return c("tongatapu", n);
    case "Pacific/Apia":
      return c("apia", n);
    case "Asia/Karachi":
      return c("karachi", n);
  }
  return e;
}
function Qf(e) {
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
const Zf = (e) => {
  const [n, t] = T(e.timezone), o = Z(() => Qf(e.locale));
  return L(_1, {
    get title() {
      return c("timezone", e.locale);
    },
    width: 320,
    get buttons() {
      return [{
        children: c("confirm", e.locale),
        onClick: () => {
          e.onConfirm(n()), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      return L(_9, {
        style: {
          width: "100%",
          "margin-top": "20px"
        },
        get value() {
          return n().text;
        },
        onSelected: (s) => {
          t(s);
        },
        get dataSource() {
          return o();
        },
        searchable: !0,
        get searchPlaceholder() {
          return c("Search Timezone", e.locale) || "Search timezone...";
        }
      });
    }
  });
};
function Er(e) {
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
const Vf = /* @__PURE__ */ $('<div class="klinecharts-pro-setting-modal-content"></div>'), Hf = /* @__PURE__ */ $('<div class="setting-item"><span class="setting-label"></span><div class="setting-control"></div></div>'), qf = (e) => {
  const [n, t] = T(e.currentStyles), [o, s] = T(Er(e.locale)), [l, h] = T(!1), d = () => {
    h(window.innerWidth <= 768);
  };
  In(() => {
    d(), window.addEventListener("resize", d);
  }), O1(() => {
    window.removeEventListener("resize", d);
  }), ze(() => {
    s(Er(e.locale));
  });
  const v = (x, p) => {
    const w = {};
    An(w, x.key, p);
    const M = de.clone(n());
    An(M, x.key, p), t(M), s(o().map((D) => ({
      ...D
    }))), e.onChange(w);
  };
  return L(_1, {
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
          e.onRestoreDefault(o()), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      const x = Vf.cloneNode(!0);
      return C(x, L(Ln, {
        get each() {
          return o();
        },
        children: (p) => {
          let w;
          const M = de.formatValue(n(), p.key);
          switch (p.component) {
            case "select": {
              const D = p.key === "candle.type" ? "170px" : "120px";
              w = L(_9, {
                get style() {
                  return {
                    width: l() ? "100%" : D,
                    "min-width": l() ? "auto" : D
                  };
                },
                get value() {
                  return c(M, e.locale);
                },
                get dataSource() {
                  return p.dataSource;
                },
                onSelected: (U) => {
                  const B = U.key;
                  v(p, B);
                }
              });
              break;
            }
            case "switch": {
              const D = !!M;
              w = L(wl, {
                open: D,
                onChange: () => {
                  v(p, !D);
                }
              });
              break;
            }
          }
          return (() => {
            const D = Hf.cloneNode(!0), U = D.firstChild, B = U.nextSibling;
            return C(U, () => p.text), C(B, w), I(() => D.classList.toggle("mobile-item", !!l())), D;
          })();
        }
      })), I(() => x.classList.toggle("mobile-layout", !!l())), x;
    }
  });
}, Yf = /* @__PURE__ */ $('<img style="width:500px;margin-top: 20px">'), Wf = (e) => L(_1, {
  get title() {
    return c("screenshot", e.locale);
  },
  width: 540,
  get buttons() {
    return [{
      type: "confirm",
      children: c("save", e.locale),
      onClick: () => {
        const n = document.createElement("a");
        n.download = "screenshot", n.href = e.url, document.body.appendChild(n), n.click(), n.remove();
      }
    }];
  },
  get onClose() {
    return e.onClose;
  },
  get children() {
    const n = Yf.cloneNode(!0);
    return I(() => Se(n, "src", e.url)), n;
  }
}), Gf = {
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
}, Xf = /* @__PURE__ */ $('<div class="klinecharts-pro-indicator-setting-modal-content"></div>'), Jf = /* @__PURE__ */ $("<span></span>"), em = (e) => {
  const [n, t] = T(de.clone(e.params.calcParams)), o = (s) => Gf[s];
  return L(_1, {
    get title() {
      return e.params.indicatorName;
    },
    width: 360,
    get buttons() {
      return [{
        type: "confirm",
        children: c("confirm", e.locale),
        onClick: () => {
          const s = o(e.params.indicatorName), l = [];
          de.clone(n()).forEach((h, d) => {
            !de.isValid(h) || h === "" ? "default" in s[d] && l.push(s[d].default) : l.push(h);
          }), e.onConfirm(l), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      const s = Xf.cloneNode(!0);
      return C(s, () => o(e.params.indicatorName).map((l, h) => [(() => {
        const d = Jf.cloneNode(!0);
        return C(d, () => c(l.paramNameKey, e.locale)), d;
      })(), L(k9, {
        style: {
          width: "200px"
        },
        get value() {
          return n()[h] ?? "";
        },
        get precision() {
          return l.precision;
        },
        get min() {
          return l.min;
        },
        onChange: (d) => {
          const v = de.clone(n());
          v[h] = d, t(v);
        }
      })])), s;
    }
  });
}, tm = /* @__PURE__ */ $('<svg viewBox="0 0 1024 1024"><path d="M945.066667 898.133333l-189.866667-189.866666c55.466667-64 87.466667-149.333333 87.466667-241.066667 0-204.8-168.533333-373.333333-373.333334-373.333333S96 264.533333 96 469.333333 264.533333 842.666667 469.333333 842.666667c91.733333 0 174.933333-34.133333 241.066667-87.466667l189.866667 189.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c8.533333-12.8 8.533333-34.133333-2.133333-46.933334zM469.333333 778.666667C298.666667 778.666667 160 640 160 469.333333S298.666667 160 469.333333 160 778.666667 298.666667 778.666667 469.333333 640 778.666667 469.333333 778.666667z"></path></svg>'), nm = /* @__PURE__ */ $('<img alt="symbol">'), rm = /* @__PURE__ */ $("<li><div><span></span></div></li>"), om = (e) => {
  const [n, t] = T(""), [o] = y5(n, e.datafeed.searchSymbols.bind(e.datafeed));
  return L(_1, {
    get title() {
      return c("symbol_search", e.locale);
    },
    width: 460,
    get onClose() {
      return e.onClose;
    },
    get children() {
      return [L(k9, {
        class: "klinecharts-pro-symbol-search-modal-input",
        get placeholder() {
          return c("symbol_code", e.locale);
        },
        get suffix() {
          return tm.cloneNode(!0);
        },
        get value() {
          return n();
        },
        onChange: (s) => {
          const l = `${s}`;
          t(l);
        }
      }), L(Gt, {
        class: "klinecharts-pro-symbol-search-modal-list",
        get loading() {
          return o.loading;
        },
        get dataSource() {
          return o() ?? [];
        },
        renderItem: (s) => (() => {
          const l = rm.cloneNode(!0), h = l.firstChild, d = h.firstChild;
          return l.$$click = () => {
            e.onSymbolSelected(s), e.onClose();
          }, C(h, L(J, {
            get when() {
              return s.logo;
            },
            get children() {
              const v = nm.cloneNode(!0);
              return I(() => Se(v, "src", s.logo)), v;
            }
          }), d), C(d, () => s.shortName ?? s.ticker, null), C(d, () => `${s.name ? `(${s.name})` : ""}`, null), C(l, () => s.exchange ?? "", null), I(() => Se(d, "title", s.name ?? "")), l;
        })()
      })];
    }
  });
};
Ze(["click"]);
const im = /* @__PURE__ */ $('<div class="klinecharts-pro-mobile-more-modal-content"><div class="item"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="m15.92 13.9-3.65-3.55a.773.773 0 0 1 0-1.12c.32-.33.79-.33 1.11 0l3.02 3.38c.31.32.31.81 0 1.13-.16.16-.48.16-.48.16Z" fill="currentColor" stroke="1"></path><path d="m12.43 14.23-.48-.17q-.48-.48 0-.96l4.13-4.36c.31-.32.63-.32.95 0s.32.65 0 .97l-4.13 4.35c-.15.17-.31.17-.47.17Zm-1.11-9.52c.31 0 1.11.16 1.11.97 0 .64-.95.48-1.27.48-1.43 0-1.91.81-2.07 1.45l-.31 1.94h1.58c.32 0 .64.32.64.64 0 .33-.32.65-.64.65H8.62l-1.11 4.99c-.16 1.46-1.11 1.46-1.59 0L7.03 11H5.6c-.31 0-.63-.32-.63-.65 0-.64.32-.8.63-.8h1.75l.48-2.1c.31-2.74 2.69-2.9 3.49-2.74Z" fill="noncurrentColore" stroke="1"></path></svg><span></span></div><div class="item"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path></svg><span></span></div><div class="item"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg><span></span></div></div>'), am = (e) => L(_1, {
  get title() {
    return c("more", e.locale);
  },
  isMobile: !0,
  get onClose() {
    return e.onClose;
  },
  get children() {
    const n = im.cloneNode(!0), t = n.firstChild, o = t.firstChild, s = o.nextSibling, l = t.nextSibling, h = l.firstChild, d = h.nextSibling, v = l.nextSibling, x = v.firstChild, p = x.nextSibling;
    return t.$$click = () => {
      e.onIndicatorClick(), e.onClose();
    }, C(s, () => c("indicator", e.locale)), l.$$click = () => {
      e.onTimezoneClick(), e.onClose();
    }, C(d, () => c("timezone", e.locale)), v.$$click = () => {
      e.onSettingClick(), e.onClose();
    }, C(p, () => c("setting", e.locale)), n;
  }
});
Ze(["click"]);
const sm = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-picker"></div>'), lm = /* @__PURE__ */ $('<label class="klinecharts-pro-time-tools-field"><button type="button" class="klinecharts-pro-time-tools-input"><span></span><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M8 3v4M16 3v4M4 10h16"></path></svg></button></label>'), cm = /* @__PURE__ */ $("<span></span>"), um = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-calendar"><div class="klinecharts-pro-time-tools-month"><button type="button">&lt;&lt;</button><button type="button">&lt;</button><button type="button" class="calendar-title"></button><button type="button">></button><button type="button">>></button></div></div>'), dm = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-grid"></div>'), hm = /* @__PURE__ */ $('<span class="weekday"></span>'), S1 = /* @__PURE__ */ $('<button type="button"></button>'), fm = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-month-grid"></div>'), mm = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-month-grid year-grid"></div>'), gm = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-spinners"><div class="spinner-column scrollable"></div><div class="spinner-column scrollable"></div><div class="spinner-column"></div></div>'), ym = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-content"></div>'), pm = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-tabs"></div>'), vm = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-range-panel"><div class="klinecharts-pro-time-tools-range-header"><button type="button"></button><span class="klinecharts-pro-time-tools-range-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg></span><button type="button"></button><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M8 3v4M16 3v4M4 10h16"></path></svg></div></div>'), Cm = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-panel"><div class="klinecharts-pro-time-tools-row"><div><strong>Time Anchor</strong><span>Anchor to a time on the chart when switching between intervals</span></div><button type="button"><span></span></button></div><div><div><strong>Anchor Point</strong></div><select><option value="date">Date</option><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option></select></div><div class="klinecharts-pro-time-tools-row with-divider"><div><strong>Anchor line</strong><span>Mark the anchored time on the chart with a vertical line</span></div><button type="button"><span></span></button></div><div class="klinecharts-pro-time-tools-row with-divider"><div><strong>Across Tokens</strong><span>Retain onscreen chart range when switching symbols</span></div><button type="button"><span></span></button></div></div>'), bm = /* @__PURE__ */ $('<div class="klinecharts-pro-time-tools-anchor-date"></div>'), $m = [{
  key: "goToDate",
  label: "Go to Date"
}, {
  key: "timeRange",
  label: "Time Range"
}, {
  key: "timeAnchor",
  label: "Time Anchor"
}], _m = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], Br = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], j1 = (e) => String(e).padStart(2, "0"), Fr = (e, n, t) => Math.min(t, new Date(e, n + 1, 0).getDate()), $n = (e) => {
  const n = new Date(e);
  return {
    year: n.getFullYear(),
    month: n.getMonth(),
    day: n.getDate(),
    hour: n.getHours(),
    minute: n.getMinutes()
  };
}, Ft = (e) => new Date(e.year, e.month, e.day, e.hour, e.minute, 0, 0).getTime(), _n = (e) => e.year * 1e4 + (e.month + 1) * 100 + e.day, On = (e) => {
  const n = e.hour >= 12 ? "PM" : "AM", t = e.hour % 12 || 12;
  return `${j1(e.month + 1)}/${j1(e.day)}/${e.year} ${j1(t)}:${j1(e.minute)} ${n}`;
}, km = (e, n) => {
  const t = new Date(e, n, 1).getDay(), o = new Date(e, n + 1, 0).getDate(), s = new Date(e, n, 0).getDate(), l = [];
  for (let h = t - 1; h >= 0; h -= 1)
    l.push({
      date: new Date(e, n - 1, s - h),
      current: !1
    });
  for (let h = 1; h <= o; h += 1)
    l.push({
      date: new Date(e, n, h),
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
}, Ut = (e) => {
  const [n, t] = T(!0), [o, s] = T("date"), [l, h] = T(e.value.year), [d, v] = T(e.value.month), x = Z(() => km(l(), d())), p = Z(() => Math.floor(l() / 10) * 10), w = Z(() => Array.from({
    length: 12
  }, (K, Q) => p() - 1 + Q)), M = Z(() => e.value.hour % 12 || 12), D = Z(() => e.value.hour >= 12 ? "PM" : "AM"), U = Array.from({
    length: 12
  }, (K, Q) => Q + 1), B = Array.from({
    length: 60
  }, (K, Q) => Q), O = (K) => {
    const Q = new Date(l(), d() + K, 1);
    h(Q.getFullYear()), v(Q.getMonth());
  }, j = () => {
    o() === "date" ? s("month") : o() === "month" && s("year");
  }, ee = (K) => {
    var Q;
    e.onChange({
      ...e.value,
      year: K.getFullYear(),
      month: K.getMonth(),
      day: K.getDate()
    }), (Q = e.onDateSelect) == null || Q.call(e), h(K.getFullYear()), v(K.getMonth());
  }, R = (K) => {
    v(K), e.onChange({
      ...e.value,
      year: l(),
      month: K,
      day: Fr(l(), K, e.value.day)
    }), s("date");
  }, W = (K) => {
    h(K), e.onChange({
      ...e.value,
      year: K,
      day: Fr(K, e.value.month, e.value.day)
    }), s("month");
  }, V = (K) => {
    const Q = D() === "PM";
    e.onChange({
      ...e.value,
      hour: Q ? K === 12 ? 12 : K + 12 : K === 12 ? 0 : K
    });
  }, he = (K) => {
    const Q = M();
    e.onChange({
      ...e.value,
      hour: K === "PM" ? Q === 12 ? 12 : Q + 12 : Q === 12 ? 0 : Q
    });
  };
  return (() => {
    const K = sm.cloneNode(!0);
    return C(K, (() => {
      const Q = Z(() => e.showInput !== !1);
      return () => Q() && (() => {
        const q = lm.cloneNode(!0), re = q.firstChild, se = re.firstChild;
        return C(q, (() => {
          const _e = Z(() => !!e.label);
          return () => _e() && (() => {
            const xe = cm.cloneNode(!0);
            return C(xe, () => e.label), xe;
          })();
        })(), re), re.$$click = () => t(!n()), C(se, () => On(e.value)), q;
      })();
    })(), null), C(K, (() => {
      const Q = Z(() => !!n());
      return () => Q() && (() => {
        const q = um.cloneNode(!0), re = q.firstChild, se = re.firstChild, _e = se.nextSibling, xe = _e.nextSibling, fe = xe.nextSibling, Fe = fe.nextSibling;
        return se.$$click = () => {
          o() === "year" ? h(l() - 10) : o() === "month" ? h(l() - 1) : O(-12);
        }, _e.$$click = () => {
          o() === "year" ? h(l() - 10) : o() === "month" ? h(l() - 1) : O(-1);
        }, xe.$$click = j, C(xe, (() => {
          const ke = Z(() => o() === "year");
          return () => ke() ? `${p()}-${p() + 9}` : (() => {
            const ve = Z(() => o() === "month");
            return () => ve() ? l() : `${Br[d()]} ${l()}`;
          })();
        })()), fe.$$click = () => {
          o() === "year" ? h(l() + 10) : o() === "month" ? h(l() + 1) : O(1);
        }, Fe.$$click = () => {
          o() === "year" ? h(l() + 10) : o() === "month" ? h(l() + 1) : O(12);
        }, C(q, (() => {
          const ke = Z(() => o() === "date");
          return () => ke() && (() => {
            const ve = dm.cloneNode(!0);
            return C(ve, () => _m.map((ne) => (() => {
              const me = hm.cloneNode(!0);
              return C(me, ne), me;
            })()), null), C(ve, () => x().map(({
              date: ne,
              current: me
            }) => {
              const H = _n({
                year: ne.getFullYear(),
                month: ne.getMonth(),
                day: ne.getDate()
              }), N = e.range ? _n(e.range.from) : NaN, E = e.range ? _n(e.range.to) : NaN, Ce = Math.min(N, E), Pe = Math.max(N, E), le = Number.isFinite(Ce) && H >= Ce && H <= Pe, Ie = Number.isFinite(Ce) && (H === Ce || H === Pe), _ = ne.getFullYear() === e.value.year && ne.getMonth() === e.value.month && ne.getDate() === e.value.day;
              return (() => {
                const ae = S1.cloneNode(!0);
                return ae.$$click = () => ee(ne), oe(ae, `${me ? "" : "muted"} ${le ? "in-range" : ""} ${Ie || _ ? "selected" : ""}`), C(ae, () => ne.getDate()), ae;
              })();
            }), null), ve;
          })();
        })(), null), C(q, (() => {
          const ke = Z(() => o() === "month");
          return () => ke() && (() => {
            const ve = fm.cloneNode(!0);
            return C(ve, () => Br.map((ne, me) => (() => {
              const H = S1.cloneNode(!0);
              return H.$$click = () => R(me), C(H, ne), I(() => oe(H, me === e.value.month && l() === e.value.year ? "selected" : "")), H;
            })())), ve;
          })();
        })(), null), C(q, (() => {
          const ke = Z(() => o() === "year");
          return () => ke() && (() => {
            const ve = mm.cloneNode(!0);
            return C(ve, () => w().map((ne) => (() => {
              const me = S1.cloneNode(!0);
              return me.$$click = () => W(ne), C(me, ne), I(() => oe(me, `${ne < p() || ne > p() + 9 ? "muted" : ""} ${ne === e.value.year ? "selected" : ""}`)), me;
            })())), ve;
          })();
        })(), null), C(q, (() => {
          const ke = Z(() => o() === "date");
          return () => ke() && (() => {
            const ve = gm.cloneNode(!0), ne = ve.firstChild, me = ne.nextSibling, H = me.nextSibling;
            return C(ne, () => U.map((N) => (() => {
              const E = S1.cloneNode(!0);
              return E.$$click = () => V(N), C(E, () => j1(N)), I(() => oe(E, N === M() ? "selected" : "")), E;
            })())), C(me, () => B.map((N) => (() => {
              const E = S1.cloneNode(!0);
              return E.$$click = () => e.onChange({
                ...e.value,
                minute: N
              }), C(E, () => j1(N)), I(() => oe(E, N === e.value.minute ? "selected" : "")), E;
            })())), C(H, () => ["AM", "PM"].map((N) => (() => {
              const E = S1.cloneNode(!0);
              return E.$$click = () => he(N), C(E, N), I(() => oe(E, N === D() ? "selected" : "")), E;
            })())), ve;
          })();
        })(), null), q;
      })();
    })(), null), K;
  })();
}, xm = (e) => {
  const [n, t] = T(e.initialTab ?? "goToDate"), [o, s] = T($n(e.initialTimestamp)), [l, h] = T($n(e.initialRange.from)), [d, v] = T($n(e.initialRange.to)), [x, p] = T("from"), [w, M] = T({
    ...e.anchorSettings
  }), D = (B) => {
    M((O) => ({
      ...O,
      ...B
    }));
  }, U = () => {
    const B = n();
    if (B === "goToDate")
      e.onGoToDate(Ft(o()));
    else if (B === "timeRange") {
      const O = Ft(l()), j = Ft(d());
      e.onTimeRange(O <= j ? {
        from: O,
        to: j
      } : {
        from: j,
        to: O
      });
    } else {
      const O = w();
      e.onTimeAnchorChange({
        ...O,
        timestamp: O.anchorPoint === "date" ? Ft(o()) : O.timestamp
      });
    }
    e.onClose();
  };
  return L(_1, {
    width: 620,
    get title() {
      return (() => {
        const B = pm.cloneNode(!0);
        return C(B, () => $m.map((O) => (() => {
          const j = S1.cloneNode(!0);
          return j.$$click = () => t(O.key), C(j, () => O.label), I(() => oe(j, n() === O.key ? "active" : "")), j;
        })())), B;
      })();
    },
    get buttons() {
      return [{
        children: "Close",
        type: "cancel",
        onClick: e.onClose
      }, {
        children: "Confirm",
        onClick: U
      }];
    },
    get onClose() {
      return e.onClose;
    },
    minButtonWidth: 112,
    get children() {
      const B = ym.cloneNode(!0);
      return C(B, (() => {
        const O = Z(() => n() === "goToDate");
        return () => O() && L(Ut, {
          label: "",
          get value() {
            return o();
          },
          onChange: s
        });
      })(), null), C(B, (() => {
        const O = Z(() => n() === "timeRange");
        return () => O() && (() => {
          const j = vm.cloneNode(!0), ee = j.firstChild, R = ee.firstChild, W = R.nextSibling, V = W.nextSibling;
          return R.$$click = () => p("from"), C(R, () => On(l())), V.$$click = () => p("to"), C(V, () => On(d())), C(j, (() => {
            const he = Z(() => x() === "from");
            return () => he() ? L(Ut, {
              label: "Start",
              get value() {
                return l();
              },
              onChange: h,
              onDateSelect: () => p("to"),
              showInput: !1,
              get range() {
                return {
                  from: l(),
                  to: d()
                };
              }
            }) : L(Ut, {
              label: "End",
              get value() {
                return d();
              },
              onChange: v,
              showInput: !1,
              get range() {
                return {
                  from: l(),
                  to: d()
                };
              }
            });
          })(), null), I((he) => {
            const K = x() === "from" ? "active" : "", Q = x() === "to" ? "active" : "";
            return K !== he._v$ && oe(R, he._v$ = K), Q !== he._v$2 && oe(V, he._v$2 = Q), he;
          }, {
            _v$: void 0,
            _v$2: void 0
          }), j;
        })();
      })(), null), C(B, (() => {
        const O = Z(() => n() === "timeAnchor");
        return () => O() && (() => {
          const j = Cm.cloneNode(!0), ee = j.firstChild, R = ee.firstChild, W = R.nextSibling, V = ee.nextSibling, he = V.firstChild, K = he.nextSibling, Q = V.nextSibling, q = Q.firstChild, re = q.nextSibling, se = Q.nextSibling, _e = se.firstChild, xe = _e.nextSibling;
          return W.$$click = () => D({
            enabled: !w().enabled
          }), K.addEventListener("change", (fe) => D({
            anchorPoint: fe.currentTarget.value
          })), C(j, (() => {
            const fe = Z(() => !!(w().enabled && w().anchorPoint === "date"));
            return () => fe() && (() => {
              const Fe = bm.cloneNode(!0);
              return C(Fe, L(Ut, {
                label: "Anchor date",
                get value() {
                  return o();
                },
                onChange: s
              })), Fe;
            })();
          })(), Q), re.$$click = () => D({
            anchorLine: !w().anchorLine
          }), xe.$$click = () => D({
            acrossTokens: !w().acrossTokens
          }), I((fe) => {
            const Fe = `klinecharts-pro-time-tools-switch${w().enabled ? " on" : ""}`, ke = `klinecharts-pro-time-tools-row${w().enabled ? "" : " disabled"}`, ve = !w().enabled, ne = `klinecharts-pro-time-tools-switch${w().anchorLine ? " on" : ""}`, me = `klinecharts-pro-time-tools-switch${w().acrossTokens ? " on" : ""}`;
            return Fe !== fe._v$3 && oe(W, fe._v$3 = Fe), ke !== fe._v$4 && oe(V, fe._v$4 = ke), ve !== fe._v$5 && (K.disabled = fe._v$5 = ve), ne !== fe._v$6 && oe(re, fe._v$6 = ne), me !== fe._v$7 && oe(xe, fe._v$7 = me), fe;
          }, {
            _v$3: void 0,
            _v$4: void 0,
            _v$5: void 0,
            _v$6: void 0,
            _v$7: void 0
          }), I(() => K.value = w().anchorPoint), j;
        })();
      })(), null), B;
    }
  });
};
Ze(["click"]);
const Lm = /* @__PURE__ */ $('<i class="icon-close klinecharts-pro-load-icon"></i>'), wm = /* @__PURE__ */ $('<div class="klinecharts-pro-content"><div class="klinecharts-pro-widget"></div></div>'), Am = /* @__PURE__ */ $('<div class="klinecharts-pro-time-anchor-line"></div>'), Mm = /* @__PURE__ */ $('<div class="klinecharts-pro-time-navigation-tooltip"></div>'), Tm = /* @__PURE__ */ $('<div class="klinecharts-pro-countdown-price-mark"><span class="klinecharts-pro-countdown-price-mark-price"></span><span class="klinecharts-pro-countdown-price-mark-timer"></span></div>'), Sm = /* @__PURE__ */ $('<div class="overlay-toolbar-color-popover"><div class="overlay-toolbar-color-grid"></div><div class="overlay-toolbar-color-footer"><button type="button" class="overlay-toolbar-add-color">+</button><div class="overlay-toolbar-color-slider"><span></span></div></div></div>'), Pm = /* @__PURE__ */ $('<div class="overlay-toolbar-dropdown width-menu"></div>'), Dm = /* @__PURE__ */ $('<div class="overlay-toolbar-dropdown style-menu"><button type="button"><span class="overlay-toolbar-style-sample solid"></span></button><button type="button"><span class="overlay-toolbar-style-sample dashed"></span></button><button type="button"><span class="overlay-toolbar-style-sample dotted"></span></button></div>'), Om = /* @__PURE__ */ $('<div class="klinecharts-pro-overlay-toolbar"><button type="button" class="overlay-toolbar-icon drag" title="Move"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="6" r="1.5"></circle><circle cx="15" cy="6" r="1.5"></circle><circle cx="9" cy="12" r="1.5"></circle><circle cx="15" cy="12" r="1.5"></circle><circle cx="9" cy="18" r="1.5"></circle><circle cx="15" cy="18" r="1.5"></circle></svg></button><button type="button" class="overlay-toolbar-icon refresh" title="Reset"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 15.4-6.36L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-15.4 6.36L3 16"></path><path d="M3 21v-5h5"></path></svg></button><div class="overlay-toolbar-picker"><button type="button" title="Color"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg></button></div><div class="overlay-toolbar-picker"><button type="button" title="Line width"><span class="overlay-toolbar-line-preview"></span><span>px</span></button></div><div class="overlay-toolbar-picker"><button type="button" title="Line style"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16"></path></svg></button></div><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2"></rect><path d="M20 4 4 20"></path></svg></button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg></button><button type="button" class="overlay-toolbar-icon delete" title="Delete"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6 18 20H6L5 6"></path><path d="M10 11v5"></path><path d="M14 11v5"></path></svg></button></div>'), Nm = /* @__PURE__ */ $('<button type="button"></button>'), Im = /* @__PURE__ */ $('<button type="button"><span class="overlay-toolbar-width-sample"></span></button>'), Em = /* @__PURE__ */ $('<div class="klinecharts-pro-quick-order-marker"><button type="button" class="klinecharts-pro-quick-order-plus"></button></div>'), Bm = /* @__PURE__ */ $('<span class="klinecharts-pro-quick-order-plus-icon"></span>'), Fm = /* @__PURE__ */ $('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" aria-hidden="true"><path d="M460-300h40v-160h160v-40H500v-160h-40v160H300v40h160v160ZM224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h510.76q27.62 0 46.12 18.5Q800-763 800-735.38v510.76q0 27.62-18.5 46.12Q763-160 735.38-160H224.62Zm0-40h510.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-510.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69H224.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v510.76q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69ZM200-760v560-560Z"></path></svg>'), Um = /* @__PURE__ */ $('<div class="klinecharts-pro-quick-order-menu-anchor"><div class="klinecharts-pro-quick-order-menu"><button type="button">Trade <!> @ <!> Limit</button><button type="button">Trade <!> @ <!> Stop</button><button type="button">Create new order...</button><button type="button">Copy Price (<!>)</button><button type="button">Draw horizontal line on </button></div></div>');
function Rt(e, n, t, o) {
  n === "VOL" && (o = {
    gap: {
      bottom: 2
    },
    ...o
  });
  const s = (e == null ? void 0 : e.createIndicator({
    name: n,
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
  }, t, o)) ?? null;
  if (s && n === "MA")
    try {
      e == null || e.overrideIndicator({
        name: "MA",
        calcParams: [7, 25, 99]
      }, s);
    } catch {
    }
  return s;
}
function zt(e) {
  const n = Math.max(1, e.multiplier || 1);
  switch (e.timespan) {
    case "minute":
      return n * 60 * 1e3;
    case "hour":
      return n * 60 * 60 * 1e3;
    case "day":
      return n * 24 * 60 * 60 * 1e3;
    case "week":
      return n * 7 * 24 * 60 * 60 * 1e3;
    case "month":
      return n * 30 * 24 * 60 * 60 * 1e3;
    case "year":
      return n * 365 * 24 * 60 * 60 * 1e3;
    default:
      return 60 * 60 * 1e3;
  }
}
function Rm(e) {
  const n = Math.max(0, Math.ceil(e / 1e3)), t = Math.floor(n / 3600), o = Math.floor(n % 3600 / 60), s = n % 60, l = (h) => String(h).padStart(2, "0");
  return t > 0 ? `${l(t)}:${l(o)}:${l(s)}` : `${l(o)}:${l(s)}`;
}
const zm = (e) => {
  var v0, C0, b0, $0, _0, k0, x0, L0, w0, A0, M0, T0, S0, P0, D0, O0, N0, I0, E0, B0, F0, U0, R0, z0, K0, j0, Q0, Z0;
  let n, t = null, o;
  const [s, l] = T(!1), [h, d] = T(e.theme), [v, x] = T(e.styles), [p, w] = T(e.locale), [M, D] = T(e.symbol), [U, B] = T(e.period), O = () => {
    var r, i, a, u;
    return {
      visibleMarginLeft: ((r = e.indicatorTooltipIconStyles) == null ? void 0 : r.visibleMarginLeft) ?? 7,
      secondaryMarginLeft: ((i = e.indicatorTooltipIconStyles) == null ? void 0 : i.secondaryMarginLeft) ?? 7,
      marginTop: ((a = e.indicatorTooltipIconStyles) == null ? void 0 : a.marginTop) ?? 1,
      size: ((u = e.indicatorTooltipIconStyles) == null ? void 0 : u.size) ?? 12
    };
  }, [j, ee] = T(!1), [R, W] = T([...e.mainIndicators]), [V, he] = T({}), [K, Q] = T(!1), [q, re] = T({
    key: e.timezone,
    text: Ir(e.timezone, e.locale)
  }), [se, _e] = T(!1), [xe, fe] = T(), [Fe, ke] = T(""), [ve, ne] = T(!1), [me, H] = T(Date.now()), [N, E] = T({
    from: Date.now() - 30 * 24 * 60 * 60 * 1e3,
    to: Date.now()
  }), [Ce, Pe] = T({
    enabled: !1,
    timestamp: Date.now(),
    anchorPoint: "date",
    anchorLine: !1,
    acrossTokens: !1
  }), [le, Ie] = T(e.drawingBarVisible), [_, ae] = T(!1), [De, Ve] = T(!1), [be, l1] = T(!1), r1 = ((v0 = e.orderTools) == null ? void 0 : v0.quickOrder) ?? !0, [Ue, J1] = T({
    quickOrder: r1,
    quickOrderFloatingWindow: ((C0 = e.orderTools) == null ? void 0 : C0.quickOrderFloatingWindow) ?? r1,
    quickOrderPlusButton: ((b0 = e.orderTools) == null ? void 0 : b0.quickOrderPlusButton) ?? r1,
    openOrders: (($0 = e.orderTools) == null ? void 0 : $0.openOrders) ?? !0,
    openOrdersExtendedPriceLine: ((_0 = e.orderTools) == null ? void 0 : _0.openOrdersExtendedPriceLine) ?? !0,
    openOrdersDisplay: ((k0 = e.orderTools) == null ? void 0 : k0.openOrdersDisplay) ?? "right",
    positions: ((x0 = e.orderTools) == null ? void 0 : x0.positions) ?? !0,
    breakevenPrice: ((L0 = e.orderTools) == null ? void 0 : L0.breakevenPrice) ?? !0,
    liquidationPrice: ((w0 = e.orderTools) == null ? void 0 : w0.liquidationPrice) ?? !0,
    priceLine: ((A0 = e.orderTools) == null ? void 0 : A0.priceLine) ?? !0,
    marketPriceLine: ((M0 = e.orderTools) == null ? void 0 : M0.marketPriceLine) ?? !0,
    countDown: ((T0 = e.orderTools) == null ? void 0 : T0.countDown) ?? !0,
    bidAskPrice: ((S0 = e.orderTools) == null ? void 0 : S0.bidAskPrice) ?? !0,
    orderHistory: ((P0 = e.orderTools) == null ? void 0 : P0.orderHistory) ?? !0
  }), [k1, E1] = T(null), [p1, c1] = T(!1), [et, He] = T(!1), [vt, Ct] = T(64), [v1, u1] = T(null), sn = 6, [tt, x1] = T(null), [bt, nt] = T(null), [ln, B1] = T(null), [Ke, je] = T(null), [qe, Re] = T(null), $t = ["#000000", "#2b3342", "#3f4653", "#565d69", "#6f7580", "#8a9099", "#a7acb3", "#c4c8ce", "#ffffff", "#ff4d67", "#ffa629", "#f7ed4a", "#2fc58d", "#4ab09c", "#52c4d3", "#3157f6", "#6a36b8", "#a644b9", "#d83972", "#f2a3a6", "#f5c879", "#f7ee97", "#a6d29f", "#7fc9b9", "#91d7df", "#8fb2ee", "#b09ad2", "#c89ccf", "#d987ab", "#e8757a", "#efb34f", "#efe36e", "#86c17d", "#66b7a8", "#68c4d0", "#5f91e4", "#8059c9", "#aa62c2", "#d34d83", "#b9353d", "#ea8527", "#e8c245", "#4b8c43", "#2f6f60", "#47919b", "#2646c6", "#56309c", "#892f95", "#a82563", "#8e2528", "#de5c1f", "#dc8527", "#255a22", "#164b34", "#225b63", "#15309b", "#442180", "#6b1f74", "#86154e"];
  let F1 = null;
  const [rt, ot] = T({
    visible: !1,
    indicatorName: "",
    paneId: "",
    calcParams: []
  });
  let Le = /* @__PURE__ */ new Map(), Oe = /* @__PURE__ */ new Map();
  const cn = (r, i, a) => {
    const u = t == null ? void 0 : t.getIndicatorByPaneId(i, r);
    return {
      name: r,
      shortName: (u == null ? void 0 : u.shortName) || r,
      paneId: i,
      type: a,
      calcParams: (u == null ? void 0 : u.calcParams) || [],
      precision: (u == null ? void 0 : u.precision) ?? 4,
      visible: (u == null ? void 0 : u.visible) ?? !0,
      styles: u == null ? void 0 : u.styles,
      figures: u == null ? void 0 : u.figures
    };
  }, Ye = (r, i, a, u) => {
    if (e.onIndicatorChange)
      if (u === "add" || u === "change")
        setTimeout(() => {
          const m = cn(r, i, a);
          e.onIndicatorChange({
            action: u,
            indicator: m
          });
        }, 50);
      else {
        const m = {
          name: r,
          shortName: r,
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
  }, L1 = (r) => ({
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
  })[r] || 1, d1 = (r, i = /* @__PURE__ */ new WeakSet()) => {
    if (r == null)
      return r;
    if (i.has(r))
      return "[Circular]";
    if (typeof r != "object")
      return r;
    if (i.add(r), Array.isArray(r))
      return r.map((u) => d1(u, i));
    const a = {};
    for (const u in r)
      if (!(u === "__proto__" || u === "constructor" || u === "prototype"))
        try {
          const m = r[u];
          if (typeof m == "function")
            continue;
          a[u] = d1(m, i);
        } catch (m) {
          a[u] = `[Error: ${m.message}]`;
        }
    return a;
  }, un = (r) => {
    if (!r)
      return null;
    try {
      return {
        id: r.id || "",
        type: r.name || "",
        name: r.name || "",
        points: (r.points || []).map((i) => ({
          timestamp: i.timestamp || 0,
          value: i.value || 0,
          dataIndex: i.dataIndex || 0
        })),
        extendData: d1(r.extendData || {}),
        styles: d1(r.styles || {}),
        visible: r.visible ?? !0,
        lock: r.lock ?? !1,
        mode: r.mode || pn.Normal
      };
    } catch (i) {
      return console.error("Error extracting overlay data:", i), null;
    }
  }, C1 = (r) => {
    var i, a, u;
    try {
      const m = (i = t == null ? void 0 : t.getOverlayById) == null ? void 0 : i.call(t, r);
      if (!m)
        return;
      const g = un(m);
      if (g) {
        const f = Le.get(r), y = ((a = f == null ? void 0 : f.points) == null ? void 0 : a.length) || 0, k = ((u = g.points) == null ? void 0 : u.length) || 0;
        Le.set(r, g);
        const A = L1(g.type);
        if (k >= A) {
          const P = Oe.get(r);
          P && !P.complete && (P.complete = !0, P.checkInterval && (clearInterval(P.checkInterval), P.checkInterval = void 0));
        }
      }
    } catch (m) {
      console.error(`Error updating overlay tracking for ${r}:`, m);
    }
  }, it = (r, i) => {
    if (Oe.has(r))
      return;
    const a = {
      monitoring: !0,
      complete: !1,
      lastPointCount: 0
    };
    Oe.set(r, a), C1(r);
    const u = () => {
      C1(r);
    };
    document.addEventListener("mouseup", u), document.addEventListener("touchend", u), setTimeout(() => {
      var g;
      const m = Oe.get(r);
      if (m && !m.complete) {
        m.checkInterval && clearInterval(m.checkInterval), m.mouseUpHandler && (document.removeEventListener("mouseup", m.mouseUpHandler), document.removeEventListener("touchend", m.mouseUpHandler)), C1(r);
        const f = Le.get(r);
        if (f) {
          const y = L1(f.type), k = ((g = f.points) == null ? void 0 : g.length) || 0;
          k < y && console.warn(`âš ï¸ ${f.type} ${r} has only ${k} point(s), should have ${y}`);
        }
      }
    }, 3e4);
  };
  let Xe = {
    saveDrawings: (r, i) => {
      try {
        const a = `kline_drawings_${r}`, m = {
          drawings: i.map((g) => {
            var A;
            const f = {
              ...g
            };
            f.extendData && (f.extendData = d1(f.extendData)), f.styles && (f.styles = d1(f.styles));
            const y = L1(g.type), k = ((A = g.points) == null ? void 0 : A.length) || 0;
            return k < y && console.warn(`âš ï¸ Saving ${g.type} with only ${k} point(s), needs ${y}`), f;
          }),
          timestamp: Date.now()
        };
        localStorage.setItem(a, JSON.stringify(m));
      } catch (a) {
        console.error("Library: Error saving drawings:", a);
      }
    },
    loadDrawings: (r) => {
      try {
        const i = `kline_drawings_${r}`, a = localStorage.getItem(i);
        if (a) {
          const u = JSON.parse(a), m = [];
          return Array.isArray(u.drawings) && u.drawings.forEach((g) => {
            var k;
            const f = L1(g.type);
            (((k = g.points) == null ? void 0 : k.length) || 0) >= f && m.push(g);
          }), m;
        }
      } catch (i) {
        console.error("Library: Error loading drawings:", i);
      }
      return [];
    },
    clearDrawings: (r) => {
      try {
        const i = `kline_drawings_${r}`;
        localStorage.removeItem(i);
      } catch (i) {
        console.error("Library: Error clearing drawings:", i);
      }
    }
  };
  const at = () => {
    const r = M();
    if (r != null && r.ticker) {
      const i = Array.from(Le.values());
      Xe.saveDrawings(r.ticker, i);
    }
  }, st = (r) => {
    if (!r || !t)
      return;
    Le.forEach((a, u) => {
      var m;
      (m = t == null ? void 0 : t.removeOverlay) == null || m.call(t, {
        id: u
      });
    }), Le.clear(), Oe.clear(), je(null), Re(null), Xe.loadDrawings(r).forEach((a) => {
      var u;
      try {
        const m = w1({
          name: a.type,
          points: a.points || [],
          extendData: a.extendData,
          styles: a.styles,
          visible: a.visible ?? !0,
          lock: a.lock ?? !1,
          mode: a.mode || pn.Normal
        }), g = t == null ? void 0 : t.createOverlay(m), f = typeof g == "string" ? g : null;
        f && (Le.set(f, {
          ...a,
          id: f
        }), Oe.set(f, {
          monitoring: !1,
          complete: !0,
          lastPointCount: ((u = a.points) == null ? void 0 : u.length) || 0
        }));
      } catch (m) {
        console.error("Library: Error restoring drawing:", m);
      }
    });
  }, U1 = (r) => {
    var a, u;
    const i = {
      ...Ue(),
      ...r
    };
    if ("quickOrder" in r) {
      const m = r.quickOrder ?? !1;
      i.quickOrderFloatingWindow = m, i.quickOrderPlusButton = m;
    } else if ("priceLine" in r) {
      const m = r.priceLine ?? !1;
      i.marketPriceLine = m, i.countDown = m, i.bidAskPrice = m;
    } else
      "quickOrderFloatingWindow" in r || "quickOrderPlusButton" in r ? i.quickOrder = i.quickOrderFloatingWindow || i.quickOrderPlusButton : ("marketPriceLine" in r || "countDown" in r || "bidAskPrice" in r) && (i.priceLine = i.marketPriceLine || i.countDown || i.bidAskPrice);
    J1(i), (u = (a = e.orderTools) == null ? void 0 : a.onChange) == null || u.call(a, i);
  }, R1 = (r) => {
    var a;
    const i = Math.min(Math.max(((a = M()) == null ? void 0 : a.pricePrecision) ?? 2, 0), 8);
    return r.toLocaleString(void 0, {
      minimumFractionDigits: i,
      maximumFractionDigits: i
    });
  }, Qe = (r = Date.now()) => {
    var t1, n1, ht, V0, H0, q0;
    if (!t || !n || !Ue().countDown) {
      x1(null);
      return;
    }
    t.setStyles({
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
    const i = ((t1 = t.getDataList) == null ? void 0 : t1.call(t)) ?? [], a = i[i.length - 1], u = Number(a == null ? void 0 : a.close);
    if (!a || !Number.isFinite(u) || u <= 0) {
      x1(null);
      return;
    }
    const m = (n1 = t.convertToPixel) == null ? void 0 : n1.call(t, [{
      value: u
    }], {
      paneId: "candle_pane",
      absolute: !0
    }), g = Number((ht = m == null ? void 0 : m[0]) == null ? void 0 : ht.y), f = (V0 = t.getSize) == null ? void 0 : V0.call(t, "candle_pane"), y = (f == null ? void 0 : f.height) ?? n.clientHeight;
    if (!Number.isFinite(g) || g < 0 || g > y) {
      x1(null);
      return;
    }
    const k = Math.min(Math.max(((H0 = M()) == null ? void 0 : H0.pricePrecision) ?? 2, 0), 8), A = u.toLocaleString(void 0, {
      minimumFractionDigits: k,
      maximumFractionDigits: k
    }), P = (q0 = t.getSize) == null ? void 0 : q0.call(t, "candle_pane", m1.YAxis), Y = P != null && P.width && Number.isFinite(P.width) ? Math.max(74, Math.floor(P.width) - 2) : 96, X = zt(U()), G = r % X, z = G === 0 ? X : X - G, te = Number(a.close), ue = Number(a.open), we = t.getStyles().candle.priceMark.last, F = we.text, ce = Number(F.size) || 12, ie = Number(F.paddingTop) || 2, $e = Number(F.paddingBottom) || 2, Ae = Math.min(Number(F.paddingLeft) || 4, 3), Je = Math.min(Number(F.paddingRight) || 4, 3), e1 = Math.max(34, ce * 2 + ie + $e + 6), o1 = Math.max(0, Math.min(g - e1 / 2, y - e1));
    x1({
      top: o1,
      width: Math.min(Y, Math.max(62, A.length * (ce * 0.56) + Ae + Je + 4)),
      priceText: A,
      text: Rm(z),
      color: Number.isFinite(te) && Number.isFinite(ue) && te < ue ? we.downColor : we.upColor,
      textSize: ce,
      textFamily: F.family,
      textWeight: F.weight,
      paddingLeft: Ae,
      paddingRight: Je,
      paddingTop: ie,
      paddingBottom: $e,
      borderRadius: Number(F.borderRadius) || 2
    });
  }, dn = (r) => {
    var a, u;
    const i = Number(r == null ? void 0 : r.y);
    if (!Number.isFinite(i))
      return NaN;
    try {
      const m = t == null ? void 0 : t.convertFromPixel([{
        x: (r == null ? void 0 : r.x) ?? 0,
        y: i
      }], {
        paneId: "candle_pane"
      }), g = Number((a = m == null ? void 0 : m[0]) == null ? void 0 : a.value);
      if (Number.isFinite(g) && g > 0)
        return g;
    } catch {
    }
    try {
      const m = t == null ? void 0 : t.convertFromPixel([{
        x: (r == null ? void 0 : r.x) ?? 0,
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
  }, lt = (r) => {
    var g;
    if (!Ue().quickOrderPlusButton || (r == null ? void 0 : r.paneId) !== "candle_pane" || !n) {
      if (et() || p1())
        return;
      E1(null), c1(!1);
      return;
    }
    const i = (g = t == null ? void 0 : t.getSize) == null ? void 0 : g.call(t, "candle_pane", m1.YAxis);
    i != null && i.width && Number.isFinite(i.width) && Ct(Math.max(44, Math.ceil(i.width)));
    const a = Number(r.y), u = dn(r), m = n.clientHeight;
    if (!Number.isFinite(a) || !Number.isFinite(u) || u <= 0 || a < 0 || a > m) {
      if (et() || p1())
        return;
      E1(null), c1(!1);
      return;
    }
    F1 = {
      ...r
    }, E1({
      y: a,
      price: u
    });
  }, h1 = () => {
    var r;
    if (F1)
      try {
        (r = t == null ? void 0 : t.executeAction) == null || r.call(t, M1.OnCrosshairChange, F1);
      } catch {
      }
  }, ct = (r) => {
    var a, u;
    const i = v1() ?? k1();
    i && ((u = (a = e.orderTools) == null ? void 0 : a.onQuickOrderAction) == null || u.call(a, {
      action: r,
      price: i.price,
      symbol: M()
    }), c1(!1), u1(null), He(!1));
  }, _t = async () => {
    var i;
    const r = v1() ?? k1();
    if (r) {
      try {
        await ((i = navigator.clipboard) == null ? void 0 : i.writeText(String(r.price)));
      } catch {
      }
      c1(!1), u1(null), He(!1);
    }
  }, hn = () => {
    const r = v1() ?? k1();
    r && (t == null || t.createOverlay(w1({
      name: "horizontalStraightLine",
      points: [{
        value: r.price
      }],
      lock: !1
    })), c1(!1), u1(null), He(!1));
  }, fn = (r) => {
    var y, k, A, P, Y, X;
    const i = (k = (y = n == null ? void 0 : n.parentElement) == null ? void 0 : y.getBoundingClientRect) == null ? void 0 : k.call(y), a = (A = n == null ? void 0 : n.getBoundingClientRect) == null ? void 0 : A.call(n), u = r == null ? void 0 : r.overlay, m = (P = u == null ? void 0 : u.points) == null ? void 0 : P[0];
    let g = 72, f = 40;
    if (i) {
      if (Number.isFinite(r == null ? void 0 : r.pageX) ? g = r.pageX - i.left : Number.isFinite(r == null ? void 0 : r.x) && a && (g = a.left - i.left + r.x), Number.isFinite(r == null ? void 0 : r.pageY))
        f = r.pageY - i.top;
      else if (Number.isFinite(r == null ? void 0 : r.y) && a)
        f = a.top - i.top + r.y;
      else if (Number.isFinite(m == null ? void 0 : m.value))
        try {
          const G = (Y = t == null ? void 0 : t.convertToPixel) == null ? void 0 : Y.call(t, [{
            value: m.value
          }], {
            paneId: "candle_pane",
            absolute: !0
          }), z = Number((X = G == null ? void 0 : G[0]) == null ? void 0 : X.y);
          Number.isFinite(z) && (f = z - i.top);
        } catch {
        }
    }
    return {
      x: Math.max(12, Math.min(g - 28, ((i == null ? void 0 : i.width) ?? 360) - 320)),
      y: Math.max(8, f - 52)
    };
  }, z1 = (r) => {
    var y, k, A, P, Y, X, G, z;
    const i = r == null ? void 0 : r.overlay;
    if (!(i != null && i.id) || i.name !== "horizontalStraightLine")
      return !1;
    const a = fn(r), u = Number((k = (y = i.styles) == null ? void 0 : y.line) == null ? void 0 : k.size) || 3, m = ((P = (A = i.styles) == null ? void 0 : A.line) == null ? void 0 : P.style) ?? f1.Solid, g = Array.isArray((X = (Y = i.styles) == null ? void 0 : Y.line) == null ? void 0 : X.dashedValue) ? i.styles.line.dashedValue : [], f = ((z = (G = i.styles) == null ? void 0 : G.line) == null ? void 0 : z.color) ?? "#2f6df6";
    return je({
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
  }, kt = (r) => {
    var a, u;
    const i = (a = r == null ? void 0 : r.overlay) == null ? void 0 : a.id;
    return (!i || ((u = Ke()) == null ? void 0 : u.id) === i) && (je(null), Re(null)), !1;
  }, w1 = (r) => {
    var f, y, k, A, P, Y, X, G, z;
    if (r.name !== "horizontalStraightLine")
      return r;
    const i = r.onClick, a = r.onSelected, u = r.onDeselected, m = r.onRemoved, g = r.onPressedMoveEnd;
    return {
      ...r,
      styles: {
        ...r.styles,
        line: {
          ...(f = r.styles) == null ? void 0 : f.line,
          size: Number((k = (y = r.styles) == null ? void 0 : y.line) == null ? void 0 : k.size) || 3,
          style: ((P = (A = r.styles) == null ? void 0 : A.line) == null ? void 0 : P.style) ?? f1.Solid,
          dashedValue: ((X = (Y = r.styles) == null ? void 0 : Y.line) == null ? void 0 : X.dashedValue) ?? [6, 4],
          color: ((z = (G = r.styles) == null ? void 0 : G.line) == null ? void 0 : z.color) ?? "#2f6df6"
        }
      },
      onClick: (te) => (z1(te), (i == null ? void 0 : i(te)) ?? !1),
      onSelected: (te) => (z1(te), (a == null ? void 0 : a(te)) ?? !1),
      onPressedMoveEnd: (te) => (z1(te), (g == null ? void 0 : g(te)) ?? !1),
      onDeselected: (te) => (kt(te), (u == null ? void 0 : u(te)) ?? !1),
      onRemoved: (te) => (kt(te), (m == null ? void 0 : m(te)) ?? !1)
    };
  }, xt = () => {
    var i;
    const r = Ke();
    r && ((i = t == null ? void 0 : t.removeOverlay) == null || i.call(t, {
      id: r.id
    }), je(null), Re(null));
  }, b = (r) => {
    var a;
    const i = Ke();
    i && ((a = t == null ? void 0 : t.overrideOverlay) == null || a.call(t, {
      id: i.id,
      ...r
    }), setTimeout(() => {
      C1(i.id), at();
    }, 0));
  }, S = () => {
    const r = Ke();
    if (!r)
      return;
    const i = !r.locked;
    b({
      lock: i
    }), je({
      ...r,
      locked: i
    });
  }, Te = () => {
    const r = Ke();
    if (!r)
      return;
    const i = !r.visible;
    b({
      visible: i
    }), je({
      ...r,
      visible: i
    });
  }, Ee = (r) => {
    const i = Ke();
    i && (b({
      styles: {
        line: {
          size: r
        }
      }
    }), je({
      ...i,
      lineSize: r
    }), Re(null));
  }, We = (r, i) => {
    const a = Ke();
    a && (b({
      styles: {
        line: {
          style: r,
          dashedValue: i
        }
      }
    }), je({
      ...a,
      lineStyle: r,
      dashedValue: i
    }), Re(null));
  }, A1 = () => {
    const r = Ke();
    if (!r)
      return;
    const i = 1, a = f1.Solid, u = [6, 4], m = "#2f6df6";
    b({
      styles: {
        line: {
          size: i,
          style: a,
          dashedValue: u,
          color: m
        }
      }
    }), je({
      ...r,
      lineSize: i,
      lineStyle: a,
      dashedValue: u,
      color: m
    }), Re(null);
  }, Lt = (r) => {
    const i = Ke();
    i && (b({
      styles: {
        line: {
          color: r
        }
      }
    }), je({
      ...i,
      color: r
    }));
  }, wt = (r) => {
    var A, P;
    const i = Ke();
    if (!i || !n)
      return;
    r.preventDefault(), r.stopPropagation(), Re(null);
    const a = (P = (A = n.parentElement) == null ? void 0 : A.getBoundingClientRect) == null ? void 0 : P.call(A);
    if (!a)
      return;
    const u = r.clientX, m = r.clientY, g = i.x, f = i.y, y = (Y) => {
      Y.preventDefault();
      const X = g + Y.clientX - u, G = f + Y.clientY - m;
      je({
        ...i,
        x: Math.max(8, Math.min(X, a.width - 320)),
        y: Math.max(8, Math.min(G, a.height - 48))
      });
    }, k = () => {
      document.removeEventListener("mousemove", y), document.removeEventListener("mouseup", k);
    };
    document.addEventListener("mousemove", y), document.addEventListener("mouseup", k);
  }, At = () => {
    c1(!1), u1(null), He(!1);
  }, ut = (r) => {
    var a, u;
    if (!p1())
      return;
    const i = r.target;
    (a = i == null ? void 0 : i.closest) != null && a.call(i, ".klinecharts-pro-quick-order-marker") || (u = i == null ? void 0 : i.closest) != null && u.call(i, ".klinecharts-pro-quick-order-menu-anchor") || At();
  };
  let qn = (D0 = e.orderTools) == null ? void 0 : D0.quickOrder, Yn = (O0 = e.orderTools) == null ? void 0 : O0.quickOrderFloatingWindow, Wn = (N0 = e.orderTools) == null ? void 0 : N0.quickOrderPlusButton, Gn = (I0 = e.orderTools) == null ? void 0 : I0.openOrders, Xn = (E0 = e.orderTools) == null ? void 0 : E0.openOrdersExtendedPriceLine, Jn = (B0 = e.orderTools) == null ? void 0 : B0.openOrdersDisplay, e0 = (F0 = e.orderTools) == null ? void 0 : F0.positions, t0 = (U0 = e.orderTools) == null ? void 0 : U0.breakevenPrice, n0 = (R0 = e.orderTools) == null ? void 0 : R0.liquidationPrice, r0 = (z0 = e.orderTools) == null ? void 0 : z0.priceLine, o0 = (K0 = e.orderTools) == null ? void 0 : K0.marketPriceLine, i0 = (j0 = e.orderTools) == null ? void 0 : j0.countDown, a0 = (Q0 = e.orderTools) == null ? void 0 : Q0.bidAskPrice, s0 = (Z0 = e.orderTools) == null ? void 0 : Z0.orderHistory;
  ze(() => {
    var te, ue, we, F, ce, ie, $e, Ae, Je, e1, o1, t1, n1, ht;
    const r = (te = e.orderTools) == null ? void 0 : te.quickOrder, i = (ue = e.orderTools) == null ? void 0 : ue.quickOrderFloatingWindow, a = (we = e.orderTools) == null ? void 0 : we.quickOrderPlusButton, u = (F = e.orderTools) == null ? void 0 : F.openOrders, m = (ce = e.orderTools) == null ? void 0 : ce.openOrdersExtendedPriceLine, g = (ie = e.orderTools) == null ? void 0 : ie.openOrdersDisplay, f = ($e = e.orderTools) == null ? void 0 : $e.positions, y = (Ae = e.orderTools) == null ? void 0 : Ae.breakevenPrice, k = (Je = e.orderTools) == null ? void 0 : Je.liquidationPrice, A = (e1 = e.orderTools) == null ? void 0 : e1.priceLine, P = (o1 = e.orderTools) == null ? void 0 : o1.marketPriceLine, Y = (t1 = e.orderTools) == null ? void 0 : t1.countDown, X = (n1 = e.orderTools) == null ? void 0 : n1.bidAskPrice, G = (ht = e.orderTools) == null ? void 0 : ht.orderHistory, z = {};
    typeof r == "boolean" && r !== qn && (qn = r, z.quickOrder = r, typeof i != "boolean" && (z.quickOrderFloatingWindow = r), typeof a != "boolean" && (z.quickOrderPlusButton = r)), typeof i == "boolean" && i !== Yn && (Yn = i, z.quickOrderFloatingWindow = i), typeof a == "boolean" && a !== Wn && (Wn = a, z.quickOrderPlusButton = a), typeof u == "boolean" && u !== Gn && (Gn = u, z.openOrders = u), typeof m == "boolean" && m !== Xn && (Xn = m, z.openOrdersExtendedPriceLine = m), g !== void 0 && g !== Jn && (Jn = g, z.openOrdersDisplay = g), typeof f == "boolean" && f !== e0 && (e0 = f, z.positions = f), typeof y == "boolean" && y !== t0 && (t0 = y, z.breakevenPrice = y), typeof k == "boolean" && k !== n0 && (n0 = k, z.liquidationPrice = k), typeof A == "boolean" && A !== r0 && (r0 = A, z.priceLine = A, typeof P != "boolean" && (z.marketPriceLine = A), typeof Y != "boolean" && (z.countDown = A), typeof X != "boolean" && (z.bidAskPrice = A)), typeof P == "boolean" && P !== o0 && (o0 = P, z.marketPriceLine = P), typeof Y == "boolean" && Y !== i0 && (i0 = Y, z.countDown = Y), typeof X == "boolean" && X !== a0 && (a0 = X, z.bidAskPrice = X), typeof G == "boolean" && G !== s0 && (s0 = G, z.orderHistory = G), Object.keys(z).length > 0 && U1(z);
  }), ze(() => {
    Ue().marketPriceLine, Ue().countDown, U(), M(), t == null || t.setStyles({
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
    }), Qe();
  }), e.ref({
    setTheme: d,
    getTheme: () => h(),
    setStyles: x,
    getStyles: () => t.getStyles(),
    setLocale: w,
    getLocale: () => p(),
    setTimezone: (r) => {
      re({
        key: r,
        text: Ir(e.timezone, p())
      });
    },
    getTimezone: () => q().key,
    setSymbol: D,
    getSymbol: () => M(),
    setPeriod: B,
    getPeriod: () => U(),
    getMainIndicators: () => R(),
    getSubIndicators: () => V(),
    setMainIndicators: W,
    setSubIndicators: he,
    overrideIndicator: (r, i) => {
      t == null || t.overrideIndicator(r, i);
    },
    createOverlay: (r) => {
      var a;
      const i = (a = t == null ? void 0 : t.createOverlay) == null ? void 0 : a.call(t, w1(r));
      return typeof i == "string" ? i : null;
    },
    removeOverlay: (r) => {
      var i;
      if ((i = t == null ? void 0 : t.removeOverlay) == null || i.call(t, r), r.id) {
        Le.delete(r.id);
        const a = Oe.get(r.id);
        a && (a.checkInterval && clearInterval(a.checkInterval), a.mouseUpHandler && (document.removeEventListener("mouseup", a.mouseUpHandler), document.removeEventListener("touchend", a.mouseUpHandler)), Oe.delete(r.id)), at();
      }
    },
    removeAllOverlay: () => {
      Le.forEach((r, i) => {
        var u;
        (u = t == null ? void 0 : t.removeOverlay) == null || u.call(t, {
          id: i
        });
        const a = Oe.get(i);
        a && (a.checkInterval && clearInterval(a.checkInterval), a.mouseUpHandler && (document.removeEventListener("mouseup", a.mouseUpHandler), document.removeEventListener("touchend", a.mouseUpHandler)));
      }), Le.clear(), Oe.clear();
    },
    getAllOverlay: () => Array.from(Le.values()),
    getOverlay: (r) => Le.get(r) || null,
    overrideOverlay: (r) => {
      t && "overrideOverlay" in t && typeof t.overrideOverlay == "function" ? t.overrideOverlay(r) : console.warn("overrideOverlay method not available on widget");
    },
    convertToPixel: (r, i) => t ? t.convertToPixel(r, i) : Array.isArray(r) ? [] : {},
    convertFromPixel: (r, i) => t ? t.convertFromPixel(r, i) : [],
    getVisibleRange: () => t ? t.getVisibleRange() : {
      from: 0,
      to: 0
    },
    getDataList: () => t ? t.getDataList() : [],
    getSize: (r, i) => t ? t.getSize(r, i) : null,
    getDom: (r, i) => t ? t.getDom(r, i) : null,
    subscribeAction: (r, i) => {
      t && t.subscribeAction(r, i);
    },
    unsubscribeAction: (r, i) => {
      t && t.unsubscribeAction(r, i);
    },
    setIndicatorModalVisible: ee,
    setTimezoneModalVisible: Q,
    setSettingModalVisible: _e,
    getOrderToolsState: () => Ue(),
    setOrderToolsState: (r) => {
      U1(r);
    },
    dispose: () => {
      n && Y0(n);
    },
    resize: () => {
      t && "resize" in t && typeof t.resize == "function" ? t.resize() : console.warn("resize method not available on widget");
    },
    getSettings: () => {
      var a, u, m, g, f, y, k, A, P, Y, X, G, z, te, ue, we;
      if (!t)
        return {};
      const r = t.getStyles(), i = (a = r.candle) == null ? void 0 : a.bar;
      return {
        // Candle settings
        candleType: (u = r.candle) == null ? void 0 : u.type,
        candleBarStyle: i == null ? void 0 : i.style,
        // bar.style might be LineType
        showLastPrice: (f = (g = (m = r.candle) == null ? void 0 : m.priceMark) == null ? void 0 : g.last) == null ? void 0 : f.show,
        showHighestPrice: (A = (k = (y = r.candle) == null ? void 0 : y.priceMark) == null ? void 0 : k.high) == null ? void 0 : A.show,
        showLowestPrice: (X = (Y = (P = r.candle) == null ? void 0 : P.priceMark) == null ? void 0 : Y.low) == null ? void 0 : X.show,
        // Indicator settings
        showIndicatorLastValue: (z = (G = r.indicator) == null ? void 0 : G.lastValueMark) == null ? void 0 : z.show,
        // Axis settings - yAxis.reverse is boolean according to YAxisStyle interface
        priceAxisType: (te = r.yAxis) == null ? void 0 : te.type,
        reverseCoordinate: (ue = r.yAxis) == null ? void 0 : ue.reverse,
        // Grid settings
        showGrids: (we = r.grid) == null ? void 0 : we.show,
        timestamp: Date.now()
      };
    },
    setSettings: (r) => {
      var a, u, m, g, f, y, k, A, P, Y, X, G, z, te;
      if (!t)
        return;
      const i = {};
      if (r.candleType !== void 0 && (i.candle = {
        ...i.candle,
        type: r.candleType
      }), r.candleBarStyle !== void 0) {
        const ue = ((a = i.candle) == null ? void 0 : a.bar) || {};
        i.candle = {
          ...i.candle,
          bar: {
            ...ue,
            style: r.candleBarStyle
          }
          // Use any since ChangeColor doesn't have style
        };
      }
      r.showLastPrice !== void 0 && (i.candle = {
        ...i.candle,
        priceMark: {
          ...(u = i.candle) == null ? void 0 : u.priceMark,
          last: {
            ...(g = (m = i.candle) == null ? void 0 : m.priceMark) == null ? void 0 : g.last,
            show: r.showLastPrice,
            text: {
              ...(k = (y = (f = i.candle) == null ? void 0 : f.priceMark) == null ? void 0 : y.last) == null ? void 0 : k.text,
              show: r.showLastPrice && !Ue().countDown
            }
          }
        }
      }), r.showHighestPrice !== void 0 && (i.candle = {
        ...i.candle,
        priceMark: {
          ...(A = i.candle) == null ? void 0 : A.priceMark,
          high: {
            ...(Y = (P = i.candle) == null ? void 0 : P.priceMark) == null ? void 0 : Y.high,
            show: r.showHighestPrice
          }
        }
      }), r.showLowestPrice !== void 0 && (i.candle = {
        ...i.candle,
        priceMark: {
          ...(X = i.candle) == null ? void 0 : X.priceMark,
          low: {
            ...(z = (G = i.candle) == null ? void 0 : G.priceMark) == null ? void 0 : z.low,
            show: r.showLowestPrice
          }
        }
      }), r.showIndicatorLastValue !== void 0 && (i.indicator = {
        ...i.indicator,
        lastValueMark: {
          ...(te = i.indicator) == null ? void 0 : te.lastValueMark,
          show: r.showIndicatorLastValue
        }
      }), r.priceAxisType !== void 0 && (i.yAxis = {
        ...i.yAxis,
        type: r.priceAxisType
      }), r.reverseCoordinate !== void 0 && (i.yAxis = {
        ...i.yAxis,
        reverse: r.reverseCoordinate
      }), r.showGrids !== void 0 && (i.grid = {
        ...i.grid,
        show: r.showGrids
      }), t.setStyles(i);
    },
    resetSettings: () => {
      var a, u, m, g, f, y, k;
      if (!t)
        return;
      t.getStyles();
      const r = {
        candle: {
          type: V9.CandleSolid,
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
          type: H9.Normal,
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
      }, i = xe();
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
        t.setStyles(A);
      } else
        t.setStyles(r);
    },
    // === Drawing Methods ===
    saveDrawings: (r) => {
      const i = Array.from(Le.values());
      i.forEach((a, u) => {
        var f;
        const m = L1(a.type), g = ((f = a.points) == null ? void 0 : f.length) || 0;
        g < m && console.warn(`âš ï¸ ${a.type} ${a.id} has only ${g} point(s), should have ${m}`);
      }), Xe.saveDrawings(r, i);
    },
    loadDrawings: (r) => {
      Xe.loadDrawings(r).forEach((a, u) => {
        var m;
        try {
          const g = {
            name: a.type,
            points: a.points || [],
            extendData: a.extendData,
            styles: a.styles,
            visible: a.visible ?? !0,
            lock: a.lock ?? !1,
            mode: a.mode ?? pn.Normal
          }, f = t == null ? void 0 : t.createOverlay(g), y = typeof f == "string" ? f : null;
          y && (Le.set(y, {
            ...a,
            id: y
          }), Oe.set(y, {
            monitoring: !1,
            complete: !0,
            lastPointCount: ((m = a.points) == null ? void 0 : m.length) || 0
          }));
        } catch (g) {
          console.error(`   âŒ Error restoring ${a.type}:`, g);
        }
      });
    },
    getDrawings: (r) => Xe.loadDrawings(r),
    clearDrawings: (r) => {
      Xe.clearDrawings(r);
    },
    // Auto-save on overlay events
    enableAutoSave: (r, i = !0) => {
    }
  });
  const l0 = () => {
    t == null || t.resize(), Qe(), f0(), b1();
  };
  let Mt, Tt, St, dt = !1, c0 = 0;
  const L9 = () => {
    if (dt || Date.now() < c0)
      return;
    const r = Ce();
    if (!r.enabled || r.anchorPoint === "date")
      return;
    const i = g0(r.anchorPoint, r.timestamp);
    Number.isFinite(i) && i !== r.timestamp && Pe({
      ...r,
      timestamp: i
    });
  }, w9 = () => {
    St && window.clearTimeout(St), St = window.setTimeout(() => {
      St = void 0, L9();
    }, 80);
  }, u0 = () => {
    Qe(), f0(), b1(), w9();
  }, d0 = [M1.OnVisibleRangeChange, M1.OnZoom, M1.OnScroll], A9 = (r) => {
    const i = new Date(r), a = i.getFullYear(), u = `${i.getMonth() + 1}`.padStart(2, "0"), m = `${i.getDate()}`.padStart(2, "0"), g = `${i.getHours()}`.padStart(2, "0"), f = `${i.getMinutes()}`.padStart(2, "0");
    return `${a}/${u}/${m} ${g}:${f}`;
  }, M9 = (r) => {
    var f;
    const i = ((f = t == null ? void 0 : t.getDataList) == null ? void 0 : f.call(t)) ?? [];
    if (i.length === 0)
      return null;
    let a = i[0], u = 0, m = Number(a == null ? void 0 : a.timestamp), g = Math.abs(m - r);
    for (let y = 1; y < i.length; y += 1) {
      const k = i[y], A = Number(k == null ? void 0 : k.timestamp);
      if (!Number.isFinite(A))
        continue;
      const P = Math.abs(A - r);
      P < g && (a = k, u = y, m = A, g = P);
    }
    return a && Number.isFinite(m) ? {
      candle: a,
      dataIndex: u
    } : null;
  }, T9 = (r) => {
    var a;
    const i = ((a = t == null ? void 0 : t.getDataList) == null ? void 0 : a.call(t)) ?? [];
    if (i.length === 0 || !Number.isFinite(r))
      return null;
    for (let u = 0; u < i.length; u += 1) {
      const m = i[u];
      if (Number(m == null ? void 0 : m.timestamp) === r)
        return {
          candle: m,
          dataIndex: u
        };
    }
    return null;
  }, Pt = (r) => {
    var a;
    const i = ((a = t == null ? void 0 : t.getDataList) == null ? void 0 : a.call(t)) ?? [];
    return i.length === 0 || !Number.isFinite(r) || r < 0 ? -1 : Math.max(0, Math.min(i.length - 1, r + 1));
  }, h0 = (r) => {
    var X, G, z;
    if (!t || !n)
      return null;
    const i = M9(r), a = i == null ? void 0 : i.candle, u = Number((a == null ? void 0 : a.timestamp) ?? r), m = Number((a == null ? void 0 : a.high) ?? (a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.open)), g = i ? Pt(i.dataIndex) : void 0, f = i && Number.isFinite(m) ? {
      dataIndex: g,
      value: m
    } : {
      timestamp: u
    }, y = (X = t.convertToPixel) == null ? void 0 : X.call(t, [f], {
      paneId: "candle_pane",
      absolute: !0
    }), k = Number((G = y == null ? void 0 : y[0]) == null ? void 0 : G.x), A = Number((z = y == null ? void 0 : y[0]) == null ? void 0 : z.y), P = n.clientWidth, Y = n.clientHeight;
    return !Number.isFinite(k) || k < -80 || k > P + 80 ? null : {
      timestamp: u,
      text: A9(u),
      left: Math.max(58, Math.min(k, P - 58)),
      top: Number.isFinite(A) ? Math.max(8, Math.min(A - 42, Y - 38)) : 10
    };
  }, f0 = () => {
    const r = bt();
    if (!r || !t || !n)
      return;
    const i = h0(r.timestamp);
    i && nt(i);
  }, Dt = (r, i = 0) => {
    if (!t || !n)
      return;
    const a = h0(r);
    if (a) {
      nt(a);
      return;
    }
    i < 6 && (Tt = window.setTimeout(() => Dt(r, i + 1), 80));
  }, mn = (r, i, a) => {
    let u = i, m = u;
    switch (r.timespan) {
      case "minute": {
        u = u - u % (60 * 1e3), m = u - a * r.multiplier * 60 * 1e3;
        break;
      }
      case "hour": {
        u = u - u % (60 * 60 * 1e3), m = u - a * r.multiplier * 60 * 60 * 1e3;
        break;
      }
      case "day": {
        u = u - u % (60 * 60 * 1e3), m = u - a * r.multiplier * 24 * 60 * 60 * 1e3;
        break;
      }
      case "week": {
        const f = new Date(u).getDay(), y = f === 0 ? 6 : f - 1;
        u = u - y * 60 * 60 * 24;
        const k = new Date(u);
        u = (/* @__PURE__ */ new Date(`${k.getFullYear()}-${k.getMonth() + 1}-${k.getDate()}`)).getTime(), m = a * r.multiplier * 7 * 24 * 60 * 60 * 1e3;
        break;
      }
      case "month": {
        const g = new Date(u), f = g.getFullYear(), y = g.getMonth() + 1;
        u = (/* @__PURE__ */ new Date(`${f}-${y}-01`)).getTime(), m = a * r.multiplier * 30 * 24 * 60 * 60 * 1e3;
        const k = new Date(m);
        m = (/* @__PURE__ */ new Date(`${k.getFullYear()}-${k.getMonth() + 1}-01`)).getTime();
        break;
      }
      case "year": {
        const f = new Date(u).getFullYear();
        u = (/* @__PURE__ */ new Date(`${f}-01-01`)).getTime(), m = a * r.multiplier * 365 * 24 * 60 * 60 * 1e3;
        const y = new Date(m);
        m = (/* @__PURE__ */ new Date(`${y.getFullYear()}-01-01`)).getTime();
        break;
      }
    }
    return [m, u];
  }, S9 = (r, i = 500) => {
    const a = zt(U()), u = Math.max(1, Math.floor(i / 2)) * a;
    return {
      from: r - u,
      to: r + u
    };
  }, P9 = (r, i, a = 600) => {
    const u = zt(i), m = Math.max(120, a);
    let g = 0.5;
    r.anchorPoint === "left" ? g = 0.12 : r.anchorPoint === "right" && (g = 0.88);
    const f = Math.max(20, Math.floor(m * g)), y = Math.max(20, m - f);
    return {
      from: r.timestamp - f * u,
      to: Math.min(Date.now(), r.timestamp + y * u)
    };
  }, D9 = (r) => {
    const i = new Date(r.from), a = new Date(r.to);
    return {
      from: new Date(i.getFullYear(), i.getMonth(), i.getDate(), 0, 0, 0, 0).getTime(),
      to: new Date(a.getFullYear(), a.getMonth(), a.getDate(), 23, 59, 59, 999).getTime()
    };
  }, O9 = (r, i) => {
    const a = Math.min(i.from, i.to), u = Math.max(i.from, i.to);
    return r.filter((m) => {
      const g = Number(m.timestamp);
      return g >= a && g <= u;
    });
  }, N9 = (r, i) => {
    var u;
    const a = Math.max(i.from, i.to);
    for (let m = r.length - 1; m >= 0; m -= 1) {
      const g = Number((u = r[m]) == null ? void 0 : u.timestamp);
      if (Number.isFinite(g) && g <= a)
        return g;
    }
    return a;
  }, I9 = (r, i) => {
    var u;
    const a = Math.max(i.from, i.to);
    for (let m = r.length - 1; m >= 0; m -= 1) {
      const g = Number((u = r[m]) == null ? void 0 : u.timestamp);
      if (Number.isFinite(g) && g <= a)
        return m;
    }
    return r.length - 1;
  }, E9 = (r, i) => {
    const a = zt(i), u = Math.abs(r.to - r.from), m = Math.max(1, Math.ceil(u / a) + 1), g = Math.max(m, 120) * a;
    return {
      from: r.from,
      to: Math.max(r.to, Math.min(Date.now(), r.to + g))
    };
  }, B9 = (r) => {
    var g, f;
    if (!t || !n || r.length === 0)
      return;
    const i = ((g = t.getSize("candle_pane", m1.YAxis)) == null ? void 0 : g.width) ?? 0, a = ((f = t.getSize("candle_pane", m1.Main)) == null ? void 0 : f.width) ?? n.clientWidth - i, u = Math.max(1, a - 8), m = Math.max(2, u / Math.max(1, r.length));
    t.setOffsetRightDistance(0), t.setLeftMinVisibleBarCount(0), t.setRightMinVisibleBarCount(0), t.setBarSpace(m);
  }, gn = (r) => {
    var i;
    !t || !Number.isFinite(r) || ((i = t.scrollToTimestamp) == null || i.call(t, r, 250), requestAnimationFrame(() => Dt(r)), Qe());
  }, m0 = (r, i = "floor") => {
    var g, f, y;
    const a = ((g = t == null ? void 0 : t.getDataList) == null ? void 0 : g.call(t)) ?? [];
    if (a.length === 0 || !Number.isFinite(r))
      return -1;
    if (i === "floor")
      for (let k = a.length - 1; k >= 0; k -= 1) {
        const A = Number((f = a[k]) == null ? void 0 : f.timestamp);
        if (Number.isFinite(A) && A <= r)
          return k;
      }
    let u = 0, m = 1 / 0;
    for (let k = 0; k < a.length; k += 1) {
      const A = Number((y = a[k]) == null ? void 0 : y.timestamp);
      if (!Number.isFinite(A))
        continue;
      const P = Math.abs(A - r);
      (P < m || P === m && A > r) && (m = P, u = k);
    }
    return m === 1 / 0 ? -1 : u;
  }, yn = (r) => {
    var y, k;
    if (!t || !n)
      return null;
    const i = (y = t.getDom) == null ? void 0 : y.call(t, "candle_pane", m1.Main), a = (k = i == null ? void 0 : i.getBoundingClientRect) == null ? void 0 : k.call(i), u = n.getBoundingClientRect(), m = a && Number.isFinite(a.left) ? a.left - u.left : 0, g = t.getSize("candle_pane", m1.Main), f = (a == null ? void 0 : a.width) ?? (g == null ? void 0 : g.width) ?? n.clientWidth;
    return r === "left" ? m : r === "center" ? m + f / 2 : r === "right" ? m + f : null;
  }, g0 = (r, i) => {
    var A, P, Y, X, G, z;
    const a = yn(r), u = ((A = t == null ? void 0 : t.getDataList) == null ? void 0 : A.call(t)) ?? [];
    if (!t || a === null || u.length === 0)
      return i;
    const m = (P = t.convertFromPixel) == null ? void 0 : P.call(t, [{
      x: a,
      y: 0
    }], {
      paneId: "candle_pane",
      absolute: !0
    }), g = Number((Y = m == null ? void 0 : m[0]) == null ? void 0 : Y.dataIndex), f = Math.max(0, Math.min(u.length - 1, Number.isFinite(g) ? Math.round(g) : -1)), y = T9(i);
    if (y) {
      const te = Pt(y.dataIndex), ue = (X = t.convertToPixel) == null ? void 0 : X.call(t, [{
        dataIndex: te
      }], {
        paneId: "candle_pane",
        absolute: !0
      }), we = Number((G = ue == null ? void 0 : ue[0]) == null ? void 0 : G.x), F = t.getBarSpace, ce = typeof F == "function" ? F.call(t) : void 0, ie = Number(typeof ce == "object" ? ce == null ? void 0 : ce.bar : ce), $e = Number.isFinite(ie) ? Math.max(2, ie / 2) : 8;
      if (Number.isFinite(we) && Math.abs(we - a) <= $e)
        return i;
    }
    const k = Number((z = u[f]) == null ? void 0 : z.timestamp);
    return Number.isFinite(k) ? k : i;
  }, y0 = (r) => {
    if (!t || !Number.isFinite(r.timestamp))
      return;
    if (dt = !0, c0 = Date.now() + 1e3, r.anchorPoint === "date") {
      gn(r.timestamp), window.setTimeout(() => {
        dt = !1;
      }, 1e3);
      return;
    }
    const i = m0(r.timestamp, "nearest"), a = Pt(i), u = yn(r.anchorPoint);
    if (a < 0 || u === null) {
      gn(r.timestamp), window.setTimeout(() => {
        dt = !1;
      }, 1e3);
      return;
    }
    t.scrollToDataIndex(a, 0), requestAnimationFrame(() => {
      var f, y;
      const m = (f = t == null ? void 0 : t.convertToPixel) == null ? void 0 : f.call(t, [{
        dataIndex: a
      }], {
        paneId: "candle_pane",
        absolute: !0
      }), g = Number((y = m == null ? void 0 : m[0]) == null ? void 0 : y.x);
      Number.isFinite(g) && (t == null || t.scrollByDistance(u - g, 0)), requestAnimationFrame(() => {
        b1(r), Dt(r.timestamp), window.setTimeout(() => {
          dt = !1;
        }, 1e3);
      });
    }), Qe();
  }, F9 = (r) => {
    var f, y;
    if (!t || !n)
      return null;
    const i = yn(r.anchorPoint);
    if (i !== null)
      return i;
    const a = Pt(m0(r.timestamp, "nearest")), u = a >= 0 ? {
      dataIndex: a
    } : {
      timestamp: r.timestamp
    }, m = (f = t.convertToPixel) == null ? void 0 : f.call(t, [u], {
      paneId: "candle_pane",
      absolute: !0
    }), g = Number((y = m == null ? void 0 : m[0]) == null ? void 0 : y.x);
    return !Number.isFinite(g) || g < -2 || g > n.clientWidth + 2 ? null : g;
  }, b1 = (r) => {
    const i = r ?? Ce();
    if (!t || !i.enabled || !i.anchorLine) {
      B1(null);
      return;
    }
    const a = F9(i), u = t.getSize("candle_pane", m1.Main), m = Math.max(1, (n == null ? void 0 : n.clientHeight) ?? (u == null ? void 0 : u.height) ?? 0);
    if (a === null) {
      B1(null);
      return;
    }
    B1({
      left: a,
      top: 0,
      height: m
    });
  }, p0 = async (r, i) => {
    if (t) {
      l(!0), Ve(!0);
      try {
        const a = U(), u = r.from <= r.to ? r : {
          from: r.to,
          to: r.from
        }, m = D9(u), g = i ? m : E9(m, a), f = await e.datafeed.getHistoryKLineData(M(), a, g.from, g.to), y = O9(f, m);
        t.applyNewData(f, f.length > 0), E(m), requestAnimationFrame(() => {
          const k = I9(f, m);
          i ? gn(i) : (B9(y), t == null || t.scrollToDataIndex(k, 0), Dt(N9(y, m))), b1();
        });
      } finally {
        l(!1), Ve(!1);
      }
    }
  }, U9 = async (r) => {
    H(r), await p0(S9(r), r);
  }, R9 = (r) => {
    const a = {
      ...r,
      timestamp: (() => !t || r.anchorPoint === "date" ? r.timestamp : g0(r.anchorPoint, r.timestamp))()
    };
    Pe(a), a.enabled ? (H(a.timestamp), requestAnimationFrame(() => {
      y0(a), b1(a);
    })) : requestAnimationFrame(() => b1(a));
  };
  In(() => {
    if (window.addEventListener("resize", l0), t = Z9(n, {
      customApi: {
        formatDate: (f, y, k, A) => {
          switch (U().timespan) {
            case "minute":
              return A === Nt.XAxis ? de.formatDate(f, y, "HH:mm") : de.formatDate(f, y, "YYYY-MM-DD HH:mm");
            case "hour":
              return A === Nt.XAxis ? de.formatDate(f, y, "MM-DD HH:mm") : de.formatDate(f, y, "YYYY-MM-DD HH:mm");
            case "day":
            case "week":
              return de.formatDate(f, y, "YYYY-MM-DD");
            case "month":
              return A === Nt.XAxis ? de.formatDate(f, y, "YYYY-MM") : de.formatDate(f, y, "YYYY-MM-DD");
            case "year":
              return A === Nt.XAxis ? de.formatDate(f, y, "YYYY") : de.formatDate(f, y, "YYYY-MM-DD");
          }
          return de.formatDate(f, y, "YYYY-MM-DD HH:mm");
        }
      }
    }), t) {
      const f = t.getDom("candle_pane", m1.Main);
      if (f) {
        let k = document.createElement("div");
        if (k.className = "klinecharts-pro-watermark", de.isString(e.watermark)) {
          const A = e.watermark.replace(/(^\s*)|(\s*$)/g, "");
          k.innerHTML = A;
        } else
          k.appendChild(e.watermark);
        f.appendChild(k);
      }
      const y = t.getDom("candle_pane", m1.YAxis);
      o = document.createElement("span"), o.className = "klinecharts-pro-price-unit", y == null || y.appendChild(o);
    }
    let r = !1;
    const i = () => {
      const f = M();
      if (f != null && f.ticker)
        try {
          const y = Array.from(Le.values());
          Xe.saveDrawings(f.ticker, y);
        } catch (y) {
          console.error("âŒ Error refreshing local storage:", y);
        }
    }, a = (f) => {
      r || (r = !0, f.preventDefault());
    };
    setTimeout(() => {
      n && n.addEventListener("contextmenu", a);
    }, 1e3), document.addEventListener("contextmenu", (f) => {
      n && n.contains(f.target) && a(f);
    });
    const u = t == null ? void 0 : t.removeOverlay;
    t && u && (t.removeOverlay = function(...f) {
      const y = u.apply(this, f), k = f[0];
      let A;
      if (typeof k == "string" ? A = k : k && typeof k == "object" && k.id && (A = k.id), A) {
        Le.delete(A);
        const P = Oe.get(A);
        P && (P.checkInterval && clearInterval(P.checkInterval), P.mouseUpHandler && (document.removeEventListener("mouseup", P.mouseUpHandler), document.removeEventListener("touchend", P.mouseUpHandler)), Oe.delete(A)), i();
      }
      return y;
    }), R().forEach((f) => {
      Rt(t, f, !0, {
        id: "candle_pane"
      });
    });
    const m = {};
    e.subIndicators.forEach((f) => {
      const y = Rt(t, f, !0);
      y && (m[f] = y);
    }), he(m), t == null || t.loadMore((f) => {
      l(!0), (async () => {
        try {
          const k = U(), [A] = mn(k, f, 1), [P] = mn(k, A, 500), Y = await e.datafeed.getHistoryKLineData(M(), k, P, A);
          t == null || t.applyMoreData(Y, Y.length > 0);
        } finally {
          l(!1);
        }
      })();
    }), t == null || t.subscribeAction(M1.OnTooltipIconClick, (f) => {
      if (f.indicatorName)
        switch (f.iconId) {
          case "visible": {
            t == null || t.overrideIndicator({
              name: f.indicatorName,
              visible: !0
            }, f.paneId);
            const y = f.paneId === "candle_pane" ? "main" : "sub";
            Ye(f.indicatorName, f.paneId, y, "change");
            break;
          }
          case "invisible": {
            t == null || t.overrideIndicator({
              name: f.indicatorName,
              visible: !1
            }, f.paneId);
            const y = f.paneId === "candle_pane" ? "main" : "sub";
            Ye(f.indicatorName, f.paneId, y, "change");
            break;
          }
          case "setting": {
            const y = t == null ? void 0 : t.getIndicatorByPaneId(f.paneId, f.indicatorName);
            ot({
              visible: !0,
              indicatorName: f.indicatorName,
              paneId: f.paneId,
              calcParams: y.calcParams
            });
            break;
          }
          case "close":
            if (f.paneId === "candle_pane") {
              const y = [...R()];
              t == null || t.removeIndicator("candle_pane", f.indicatorName), y.splice(y.indexOf(f.indicatorName), 1), W(y), Ye(f.indicatorName, "candle_pane", "main", "remove");
            } else {
              const y = {
                ...V()
              };
              t == null || t.removeIndicator(f.paneId, f.indicatorName), delete y[f.indicatorName], he(y), Ye(f.indicatorName, f.paneId, "sub", "remove");
            }
        }
    }), t == null || t.subscribeAction(M1.OnCrosshairChange, lt), d0.forEach((f) => {
      t == null || t.subscribeAction(f, u0);
    }), Mt = window.setInterval(() => Qe(), 1e3), Qe(), document.addEventListener("mousedown", ut);
    const g = t == null ? void 0 : t.createOverlay;
    t && g && (t.createOverlay = function(...f) {
      const y = w1(f[0]), k = g.apply(this, [y, ...f.slice(1)]), A = typeof k == "string" ? k : null;
      return A && (it(A, y.name || "unknown"), C1(A), at()), k;
    });
  }), O1(() => {
    window.removeEventListener("resize", l0), t == null || t.unsubscribeAction(M1.OnCrosshairChange, lt), d0.forEach((r) => {
      t == null || t.unsubscribeAction(r, u0);
    }), Mt && (window.clearInterval(Mt), Mt = void 0), Tt && (window.clearTimeout(Tt), Tt = void 0), document.removeEventListener("mousedown", ut), Oe.clear(), Le.clear(), Y0(n);
  }), ze(() => {
    const r = M();
    r != null && r.priceCurrency ? (o.innerHTML = r == null ? void 0 : r.priceCurrency.toLocaleUpperCase(), o.style.display = "flex") : o.style.display = "none", t == null || t.setPriceVolumePrecision((r == null ? void 0 : r.pricePrecision) ?? 2, (r == null ? void 0 : r.volumePrecision) ?? 0);
  });
  const z9 = (r) => {
    const i = new Date(r), a = i.getFullYear(), u = `${i.getMonth() + 1}`.padStart(2, "0"), m = `${i.getDate()}`.padStart(2, "0"), g = `${i.getHours()}`.padStart(2, "0"), f = `${i.getMinutes()}`.padStart(2, "0"), y = `${a}-${u}-${m}`;
    switch (U().timespan) {
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
  }, K9 = (r, i) => {
    var k, A;
    const {
      current: a
    } = r, u = i.tooltip.text.color, m = a.close > a.open ? i.bar.upColor : a.close < a.open ? i.bar.downColor : i.bar.noChangeColor, g = Math.min(Math.max(((k = M()) == null ? void 0 : k.pricePrecision) ?? 2, 0), 8), f = Math.min(Math.max(((A = M()) == null ? void 0 : A.volumePrecision) ?? 0, 0), 8), y = (P) => ({
      text: de.formatPrecision(P, g),
      color: m
    });
    return [{
      title: "time",
      value: {
        text: z9(a.timestamp),
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
        text: de.formatBigNumber(de.formatPrecision(a.volume ?? i.tooltip.defaultValue, f)),
        color: m
      }
    }];
  }, Ot = () => {
    t == null || t.setStyles({
      candle: {
        tooltip: {
          custom: K9,
          rect: {
            offsetLeft: 0,
            paddingLeft: 0
          }
        }
      }
    });
  };
  return ze((r) => {
    const i = M(), a = U();
    let u = !0;
    return O1(() => {
      u = !1;
    }), r && e.datafeed.unsubscribe(r.symbol, r.period), l(!0), Ve(!0), (async () => {
      try {
        const g = a1(Ce), f = g.enabled && (!r || r.symbol.ticker === i.ticker || g.acrossTokens), y = f ? P9(g, a) : null, [k, A] = y ? [y.from, y.to] : mn(a, (/* @__PURE__ */ new Date()).getTime(), 500), P = await e.datafeed.getHistoryKLineData(i, a, k, A);
        if (!u)
          return;
        t == null || t.applyNewData(P, P.length > 0), f ? requestAnimationFrame(() => {
          y0(g), b1(g);
        }) : b1(), Qe(), setTimeout(() => {
          u && (st(i == null ? void 0 : i.ticker), Qe());
        }, 0), e.datafeed.subscribe(i, a, (Y) => {
          t == null || t.updateData(Y), Qe();
        });
      } finally {
        u && (l(!1), Ve(!1));
      }
    })(), {
      symbol: i,
      period: a
    };
  }), ze(() => {
    const r = h();
    t == null || t.setStyles(r);
    const i = r === "dark" ? "#929AA5" : "#76808F";
    Ot(), t == null || t.setStyles({
      indicator: {
        tooltip: {
          icons: [{
            id: "visible",
            position: It.Middle,
            marginLeft: O().visibleMarginLeft,
            marginTop: O().marginTop,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: O().size,
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "invisible",
            position: It.Middle,
            marginLeft: O().secondaryMarginLeft,
            marginTop: O().marginTop,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: O().size,
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "setting",
            position: It.Middle,
            marginLeft: O().secondaryMarginLeft,
            marginTop: O().marginTop,
            marginBottom: 0,
            marginRight: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: O().size,
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "close",
            position: It.Middle,
            marginLeft: O().secondaryMarginLeft,
            marginTop: O().marginTop,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: O().size,
            color: i,
            activeColor: i,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }]
        }
      }
    });
  }), ze(() => {
    t == null || t.setLocale(p());
  }), ze(() => {
    t == null || t.setTimezone(q().key);
  }), ze(() => {
    v() && (t == null || t.setStyles(v()), Ot(), fe(nl(t.getStyles())));
  }), [Lm.cloneNode(!0), L(dh, {
    get locale() {
      return e.locale;
    },
    get symbol() {
      return M();
    },
    get spread() {
      return le();
    },
    get period() {
      return U();
    },
    get periods() {
      return e.periods;
    },
    onMenuClick: async () => {
      try {
        await p5(() => Ie(!le())), t == null || t.resize();
      } catch {
      }
    },
    onSymbolClick: () => {
      ae(!_());
    },
    get onMobilePeriodClick() {
      return e.onMobilePeriodClick;
    },
    onMobileMoreClick: () => {
      e.onMobileMoreClick ? e.onMobileMoreClick() : l1(!0);
    },
    onPeriodChange: B,
    onTimeToolsClick: () => {
      H(Date.now()), ne(!0);
    },
    onIndicatorClick: () => {
      ee((r) => !r);
    },
    onTimezoneClick: () => {
      Q((r) => !r);
    },
    onSettingClick: () => {
      _e((r) => !r);
    },
    onScreenshotClick: () => {
      if (t) {
        const r = e.screenshotBackgroundColor || (e.theme === "dark" ? "#11131E" : "#ffffff"), i = t.getConvertPictureUrl(!0, "jpeg", r);
        ke(i);
      }
    },
    get chartViewToggle() {
      return e.chartViewToggle;
    },
    get showOrderToolsMenu() {
      var r;
      return ((r = e.orderTools) == null ? void 0 : r.visible) ?? !1;
    },
    get orderToolsState() {
      return Ue();
    },
    onOrderToolsStateChange: U1
  }), (() => {
    const r = wm.cloneNode(!0), i = r.firstChild;
    return r.addEventListener("mouseleave", () => {
      E1(null), He(!1);
    }), C(r, L(J, {
      get when() {
        return De();
      },
      get children() {
        return L($9, {});
      }
    }), i), C(r, L(J, {
      get when() {
        return le();
      },
      get children() {
        return L(Kf, {
          get locale() {
            return e.locale;
          },
          onDrawingItemClick: (a) => {
            t == null || t.createOverlay(w1(a));
          },
          onModeChange: (a) => {
            t == null || t.overrideOverlay({
              mode: a
            });
          },
          onLockChange: (a) => {
            t == null || t.overrideOverlay({
              lock: a
            });
          },
          onVisibleChange: (a) => {
            t == null || t.overrideOverlay({
              visible: a
            });
          },
          onRemoveClick: (a) => {
            t == null || t.removeOverlay({
              groupId: a
            });
          }
        });
      }
    }), i), D1((a) => n = a, i), C(r, L(J, {
      get when() {
        return ln();
      },
      keyed: !0,
      children: (a) => (() => {
        const u = Am.cloneNode(!0);
        return I((m) => {
          const g = `${a.left}px`, f = `${a.top}px`, y = `${a.height}px`;
          return g !== m._v$ && u.style.setProperty("left", m._v$ = g), f !== m._v$2 && u.style.setProperty("top", m._v$2 = f), y !== m._v$3 && u.style.setProperty("height", m._v$3 = y), m;
        }, {
          _v$: void 0,
          _v$2: void 0,
          _v$3: void 0
        }), u;
      })()
    }), null), C(r, L(J, {
      get when() {
        return bt();
      },
      keyed: !0,
      children: (a) => (() => {
        const u = Mm.cloneNode(!0);
        return C(u, () => a.text), I((m) => {
          const g = `${a.left}px`, f = `${a.top}px`;
          return g !== m._v$4 && u.style.setProperty("left", m._v$4 = g), f !== m._v$5 && u.style.setProperty("top", m._v$5 = f), m;
        }, {
          _v$4: void 0,
          _v$5: void 0
        }), u;
      })()
    }), null), C(r, L(J, {
      get when() {
        return tt();
      },
      keyed: !0,
      children: (a) => (() => {
        const u = Tm.cloneNode(!0), m = u.firstChild, g = m.nextSibling;
        return u.style.setProperty("right", "0px"), C(m, () => a.priceText), C(g, () => a.text), I((f) => {
          const y = `${a.top}px`, k = `${a.width}px`, A = a.color, P = `${a.borderRadius}px`, Y = a.textFamily, X = a.textWeight, G = `${a.paddingLeft}px`, z = `${a.paddingRight}px`, te = `${a.paddingTop}px`, ue = `${a.paddingBottom}px`, we = `${a.textSize}px`, F = `${Math.max(10, a.textSize - 1)}px`;
          return y !== f._v$6 && u.style.setProperty("top", f._v$6 = y), k !== f._v$7 && u.style.setProperty("width", f._v$7 = k), A !== f._v$8 && u.style.setProperty("background", f._v$8 = A), P !== f._v$9 && u.style.setProperty("border-radius", f._v$9 = P), Y !== f._v$10 && u.style.setProperty("font-family", f._v$10 = Y), X !== f._v$11 && u.style.setProperty("font-weight", f._v$11 = X), G !== f._v$12 && u.style.setProperty("padding-left", f._v$12 = G), z !== f._v$13 && u.style.setProperty("padding-right", f._v$13 = z), te !== f._v$14 && u.style.setProperty("padding-top", f._v$14 = te), ue !== f._v$15 && u.style.setProperty("padding-bottom", f._v$15 = ue), we !== f._v$16 && m.style.setProperty("font-size", f._v$16 = we), F !== f._v$17 && g.style.setProperty("font-size", f._v$17 = F), f;
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
    }), null), C(r, L(J, {
      get when() {
        return Ke();
      },
      keyed: !0,
      children: (a) => (() => {
        const u = Om.cloneNode(!0), m = u.firstChild, g = m.nextSibling, f = g.nextSibling, y = f.firstChild, k = f.nextSibling, A = k.firstChild, P = A.firstChild, Y = P.nextSibling, X = Y.firstChild, G = k.nextSibling, z = G.firstChild, te = G.nextSibling, ue = te.nextSibling, we = ue.nextSibling;
        return u.$$click = (F) => {
          F.stopPropagation();
        }, u.$$mousedown = (F) => {
          F.preventDefault(), F.stopPropagation();
        }, m.$$mousedown = wt, g.$$click = A1, y.$$click = () => Re(qe() === "color" ? null : "color"), C(f, L(J, {
          get when() {
            return qe() === "color";
          },
          get children() {
            const F = Sm.cloneNode(!0), ce = F.firstChild;
            return C(ce, L(Ln, {
              each: $t,
              children: (ie) => (() => {
                const $e = Nm.cloneNode(!0);
                return $e.$$click = () => Lt(ie), $e.style.setProperty("background", ie), I(() => oe($e, `overlay-toolbar-color-swatch ${a.color.toLowerCase() === ie.toLowerCase() ? "selected" : ""}`)), $e;
              })()
            })), F;
          }
        }), null), A.$$click = () => Re(qe() === "width" ? null : "width"), C(Y, () => a.lineSize, X), C(k, L(J, {
          get when() {
            return qe() === "width";
          },
          get children() {
            const F = Pm.cloneNode(!0);
            return C(F, L(Ln, {
              each: [1, 2, 3, 4],
              children: (ce) => (() => {
                const ie = Im.cloneNode(!0), $e = ie.firstChild;
                return ie.$$click = () => Ee(ce), $e.style.setProperty("height", `${ce}px`), I(() => oe(ie, a.lineSize === ce ? "selected" : "")), ie;
              })()
            })), F;
          }
        }), null), z.$$click = () => Re(qe() === "style" ? null : "style"), C(G, L(J, {
          get when() {
            return qe() === "style";
          },
          get children() {
            const F = Dm.cloneNode(!0), ce = F.firstChild, ie = ce.nextSibling, $e = ie.nextSibling;
            return ce.$$click = () => We(f1.Solid, []), ie.$$click = () => We(f1.Dashed, [6, 4]), $e.$$click = () => We(f1.Dashed, [2, 4]), I((Ae) => {
              var t1, n1;
              const Je = a.lineStyle === f1.Solid ? "selected" : "", e1 = a.lineStyle === f1.Dashed && ((t1 = a.dashedValue) == null ? void 0 : t1[0]) === 6 ? "selected" : "", o1 = a.lineStyle === f1.Dashed && ((n1 = a.dashedValue) == null ? void 0 : n1[0]) === 2 ? "selected" : "";
              return Je !== Ae._v$18 && oe(ce, Ae._v$18 = Je), e1 !== Ae._v$19 && oe(ie, Ae._v$19 = e1), o1 !== Ae._v$20 && oe($e, Ae._v$20 = o1), Ae;
            }, {
              _v$18: void 0,
              _v$19: void 0,
              _v$20: void 0
            }), F;
          }
        }), null), te.$$click = Te, ue.$$click = S, we.$$click = xt, I((F) => {
          const ce = `${a.x}px`, ie = `${a.y}px`, $e = `overlay-toolbar-icon edit ${qe() === "color" ? "active" : ""}`, Ae = `overlay-toolbar-line-size ${qe() === "width" ? "active" : ""}`, Je = `overlay-toolbar-icon minus ${qe() === "style" ? "active" : ""}`, e1 = `overlay-toolbar-icon visibility ${a.visible ? "" : "muted"}`, o1 = a.visible ? "Hide" : "Show", t1 = `overlay-toolbar-icon lock ${a.locked ? "active" : ""}`, n1 = a.locked ? "Unlock" : "Lock";
          return ce !== F._v$21 && u.style.setProperty("left", F._v$21 = ce), ie !== F._v$22 && u.style.setProperty("top", F._v$22 = ie), $e !== F._v$23 && oe(y, F._v$23 = $e), Ae !== F._v$24 && oe(A, F._v$24 = Ae), Je !== F._v$25 && oe(z, F._v$25 = Je), e1 !== F._v$26 && oe(te, F._v$26 = e1), o1 !== F._v$27 && Se(te, "title", F._v$27 = o1), t1 !== F._v$28 && oe(ue, F._v$28 = t1), n1 !== F._v$29 && Se(ue, "title", F._v$29 = n1), F;
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
    }), null), C(r, L(J, {
      get when() {
        return k1();
      },
      keyed: !0,
      children: (a) => (() => {
        const u = Em.cloneNode(!0), m = u.firstChild;
        return u.addEventListener("mouseleave", () => {
          p1() || He(!1);
        }), u.$$mousemove = (g) => {
          g.stopPropagation(), h1();
        }, u.addEventListener("mouseenter", () => {
          He(!0), h1();
        }), m.$$click = (g) => {
          g.stopPropagation(), He(!0), u1({
            y: a.y,
            price: a.price,
            yAxisWidth: vt()
          }), c1(!0), h1();
        }, m.$$mousedown = (g) => {
          g.preventDefault(), g.stopPropagation(), h1();
        }, C(m, (() => {
          const g = Z(() => {
            var f;
            return !!((f = e.orderTools) != null && f.quickOrderPlusIcon);
          });
          return () => g() ? (() => {
            const f = Bm.cloneNode(!0);
            return I(() => f.innerHTML = e.orderTools.quickOrderPlusIcon), f;
          })() : Fm.cloneNode(!0);
        })()), I((g) => {
          const f = `${Math.max(0, a.y - 12)}px`, y = `${vt()}px`, k = Ue().quickOrderPlusButton ? "block" : "none";
          return f !== g._v$30 && u.style.setProperty("top", g._v$30 = f), y !== g._v$31 && u.style.setProperty("right", g._v$31 = y), k !== g._v$32 && u.style.setProperty("display", g._v$32 = k), g;
        }, {
          _v$30: void 0,
          _v$31: void 0,
          _v$32: void 0
        }), u;
      })()
    }), null), C(r, L(J, {
      get when() {
        return Z(() => !!p1())() && v1();
      },
      keyed: !0,
      children: (a) => (() => {
        const u = Um.cloneNode(!0), m = u.firstChild, g = m.firstChild, f = g.firstChild, y = f.nextSibling, k = y.nextSibling, A = k.nextSibling;
        A.nextSibling;
        const P = g.nextSibling, Y = P.firstChild, X = Y.nextSibling, G = X.nextSibling, z = G.nextSibling;
        z.nextSibling;
        const te = P.nextSibling, ue = te.nextSibling, we = ue.firstChild, F = we.nextSibling;
        F.nextSibling;
        const ce = ue.nextSibling;
        return ce.firstChild, u.addEventListener("mouseleave", () => He(!1)), u.addEventListener("mouseenter", () => He(!0)), m.$$mousemove = () => {
          h1();
        }, m.$$mousedown = (ie) => {
          ie.preventDefault(), ie.stopPropagation(), h1();
        }, g.$$click = () => ct("limit"), C(g, () => M().shortName ?? M().name ?? M().ticker, y), C(g, () => R1(a.price), A), P.$$click = () => ct("stop"), C(P, () => M().shortName ?? M().name ?? M().ticker, X), C(P, () => R1(a.price), z), te.$$click = () => ct("create"), ue.$$click = _t, C(ue, () => R1(a.price), F), ce.$$click = hn, C(ce, () => R1(a.price), null), I((ie) => {
          const $e = `${Math.max(0, a.y + 24)}px`, Ae = `${a.yAxisWidth + sn}px`;
          return $e !== ie._v$33 && u.style.setProperty("top", ie._v$33 = $e), Ae !== ie._v$34 && u.style.setProperty("right", ie._v$34 = Ae), ie;
        }, {
          _v$33: void 0,
          _v$34: void 0
        }), u;
      })()
    }), null), I(() => Se(i, "data-drawing-bar-visible", le())), r;
  })(), L(J, {
    get when() {
      return _();
    },
    get children() {
      return L(om, {
        get locale() {
          return e.locale;
        },
        get datafeed() {
          return e.datafeed;
        },
        onSymbolSelected: (r) => {
          D(r);
        },
        onClose: () => {
          ae(!1);
        }
      });
    }
  }), L(J, {
    get when() {
      return j();
    },
    get children() {
      return L(jf, {
        get locale() {
          return e.locale;
        },
        get mainIndicators() {
          return R();
        },
        get subIndicators() {
          return V();
        },
        onClose: () => {
          ee(!1);
        },
        onMainIndicatorChange: (r) => {
          const i = [...R()];
          r.added ? (Rt(t, r.name, !0, {
            id: "candle_pane"
          }), i.push(r.name), Ye(r.name, "candle_pane", "main", "add")) : (t == null || t.removeIndicator("candle_pane", r.name), i.splice(i.indexOf(r.name), 1), Ye(r.name, "candle_pane", "main", "remove")), W(i);
        },
        onSubIndicatorChange: (r) => {
          const i = {
            ...V()
          };
          if (r.added) {
            const a = Rt(t, r.name);
            a && (i[r.name] = a, Ye(r.name, a, "sub", "add"));
          } else
            r.paneId && (t == null || t.removeIndicator(r.paneId, r.name), delete i[r.name], Ye(r.name, r.paneId, "sub", "remove"));
          he(i);
        }
      });
    }
  }), L(J, {
    get when() {
      return K();
    },
    get children() {
      return L(Zf, {
        get locale() {
          return e.locale;
        },
        get timezone() {
          return q();
        },
        onClose: () => {
          Q(!1);
        },
        onConfirm: re
      });
    }
  }), L(J, {
    get when() {
      return se();
    },
    get children() {
      return L(qf, {
        get locale() {
          return e.locale;
        },
        get currentStyles() {
          return de.clone(t.getStyles());
        },
        onClose: () => {
          _e(!1);
        },
        onChange: (r) => {
          t == null || t.setStyles(r), Ot();
        },
        onRestoreDefault: (r) => {
          const i = {};
          r.forEach((a) => {
            const u = a.key;
            An(i, u, de.formatValue(xe(), u));
          }), t == null || t.setStyles(i), Ot();
        }
      });
    }
  }), L(J, {
    get when() {
      return Fe().length > 0;
    },
    get children() {
      return L(Wf, {
        get locale() {
          return e.locale;
        },
        get url() {
          return Fe();
        },
        onClose: () => {
          ke("");
        }
      });
    }
  }), L(J, {
    get when() {
      return ve();
    },
    get children() {
      return L(xm, {
        get initialTimestamp() {
          return me();
        },
        get initialRange() {
          return N();
        },
        get anchorSettings() {
          return Ce();
        },
        onClose: () => {
          ne(!1);
        },
        onGoToDate: U9,
        onTimeRange: (r) => {
          p0(r);
        },
        onTimeAnchorChange: R9
      });
    }
  }), L(J, {
    get when() {
      return rt().visible;
    },
    get children() {
      return L(em, {
        get locale() {
          return e.locale;
        },
        get params() {
          return rt();
        },
        onClose: () => {
          ot({
            visible: !1,
            indicatorName: "",
            paneId: "",
            calcParams: []
          });
        },
        onConfirm: (r) => {
          const i = rt();
          t == null || t.overrideIndicator({
            name: i.indicatorName,
            calcParams: r
          }, i.paneId);
          const a = i.paneId === "candle_pane" ? "main" : "sub";
          Ye(i.indicatorName, i.paneId, a, "change");
        }
      });
    }
  }), L(J, {
    get when() {
      return be();
    },
    get children() {
      return L(am, {
        get locale() {
          return e.locale;
        },
        onIndicatorClick: () => {
          ee(!0);
        },
        onTimezoneClick: () => {
          Q(!0);
        },
        onSettingClick: () => {
          _e(!0);
        },
        onClose: () => {
          l1(!1);
        }
      });
    }
  })];
};
Ze(["mousedown", "click", "mousemove"]);
const Km = /* @__PURE__ */ $('<svg class="logo" viewBox="0 0 80 92"><path d="M28.148808359375,51.7280513671875L22.963588359375,51.7280513671875C21.572648359375002,51.7280513671875,20.445068359375,52.6220613671875,20.445068359375,53.7248813671875L20.445068359375,72.3979013671875C20.445068359375,73.5007013671875,21.572648359375002,74.39470136718751,22.963588359375,74.39470136718751L33.926568359375,74.39470136718751C35.317468359375,74.39470136718751,36.445068359375,73.5007013671875,36.445068359375,72.3979013671875L36.445068359375,53.7248813671875C36.445068359375,52.6220613671875,35.317468359375,51.7280513671875,33.926568359375,51.7280513671875L28.741398359374998,51.7280513671875L28.741398359374998,46.2963223671875C28.741398359374998,46.1665793671875,28.608748359375,46.0614013671875,28.445108359375,46.0614013671875C28.281468359375,46.0614013671875,28.148808359375,46.1665793671875,28.148808359375,46.2963223671875L28.148808359375,51.7280513671875ZM28.741398359374998,74.3948013671875L28.741398359374998,79.82650136718749C28.741398359374998,79.9563013671875,28.608748359375,80.0614013671875,28.445108359375,80.0614013671875C28.281468359375,80.0614013671875,28.148808359375,79.9563013671875,28.148808359375,79.82650136718749L28.148808359375,74.3948013671875L28.741398359374998,74.3948013671875Z"></path><path d="M51.148808359374996,44.7280513671875L45.963588359375,44.7280513671875C44.572648359375,44.7280513671875,43.445068359375,45.6220613671875,43.445068359375,46.7248813671875L43.445068359375,65.3979013671875C43.445068359375,66.5007013671875,44.572648359375,67.39470136718751,45.963588359375,67.39470136718751L56.926568359375,67.39470136718751C58.317468359375,67.39470136718751,59.445068359375,66.5007013671875,59.445068359375,65.3979013671875L59.445068359375,46.7248813671875C59.445068359375,45.6220613671875,58.317468359375,44.7280513671875,56.926568359375,44.7280513671875L51.741398359375,44.7280513671875L51.741398359375,39.2963223671875C51.741398359375,39.1665793671875,51.608748359375,39.0614013671875,51.445108359375,39.0614013671875C51.281468359375,39.0614013671875,51.148808359374996,39.1665793671875,51.148808359374996,39.2963223671875L51.148808359374996,44.7280513671875ZM51.741398359375,67.3948013671875L51.741398359375,72.82650136718749C51.741398359375,72.9563013671875,51.608748359375,73.0614013671875,51.445108359375,73.0614013671875C51.281468359375,73.0614013671875,51.148808359374996,72.9563013671875,51.148808359374996,72.82650136718749L51.148808359374996,67.3948013671875L51.741398359375,67.3948013671875Z"></path><path d="M17.7274,90.6541C17.5901,90.6541,17.4517,90.6436,17.3121,90.6225C9.93219,89.5095,4.80718,86.7136,2.07787,82.3084C-1.1223,77.1437,0.241766,71.6314,0.56829,70.5137C5.37624,46.647,15.0785,38.4945,21.5025,33.0957C22.9683,31.8633,24.2342,30.7995,25.1676,29.7672C25.4105,29.4984,25.6051,29.2154,25.7556,28.9202C24.7465,29.2231,24.1971,29.4326,24.1703,29.4429C22.908,29.9368,21.4777,29.3247,20.9761,28.076C20.4756,26.8272,21.0897,25.4146,22.352,24.9172C22.5042,24.8571,23.5312,24.4607,25.3073,23.9616C24.087,21.4425,21.7693,18.7949,19.7125,16.6431L19.2819,16.1902C16.2438,12.9776,14.6017,4.80159,14.3036,3.19471C14.1306,2.26212,14.4636,1.30796,15.1814,0.679657C15.8995,0.0512175,16.8976,-0.159672,17.8125,0.123747C22.7731,1.66274,24.2638,1.81255,27.2321,2.11098C28.7357,2.26195,29.83,3.59029,29.6762,5.07662C29.5236,6.56295,28.182,7.64786,26.6784,7.49454C24.4992,7.27569,22.9517,7.09896,20.724,6.56646C21.4493,9.09088,22.3803,11.5427,23.2771,12.4919L23.6876,12.9237C25.3757,14.69,28.9691,18.45,30.7016,22.7299C35.0392,21.9433,40.8791,21.3359,47.7817,21.7249C48.2004,20.7386,48.8054,19.7953,49.5907,18.9135C49.7137,18.7754,49.8498,18.6502,49.9988,18.539C53.6142,15.8508,57.5491,12.857,59.7803,11.0758C58.1028,11.2502,56.1034,11.0278,53.9124,9.70882C53.2439,9.30622,52.5992,8.89427,51.9662,8.48933C48.4668,6.25164,46.497,5.12109,43.4234,5.94853C41.9647,6.34058,40.4622,5.48975,40.0659,4.04789C39.6695,2.60604,40.5296,1.11853,41.9871,0.726471C47.5602,-0.773825,51.4796,1.73271,54.9364,3.9434L54.9364,3.9434C55.5284,4.32176,56.1318,4.70797,56.7564,5.08482C58.3843,6.06556,59.4858,5.76127,61.2899,5.13865C62.3511,4.77234,63.5567,4.35687,64.8675,4.53476C66.3321,4.73254,67.4406,5.56933,67.9103,6.83096C68.7444,9.07333,67.1035,11.5533,65.5797,13.2374C64.6729,14.2394,60.0845,17.7606,56.4519,20.4957C56.9477,20.3369,57.4767,20.2511,58.026,20.2511C59.4281,20.2511,60.6982,20.8102,61.621,21.7153C65.4948,20.6901,67.87,17.9563,67.9033,17.9175C68.78,16.8888,70.3322,16.7577,71.3721,17.6226C72.412,18.4886,72.5457,20.0253,71.6702,21.054C71.5221,21.2286,69.5063,23.5492,66.0787,25.233C69.5399,26.8822,72.9993,29.682,74.1841,34.4145C74.5106,35.7206,73.7062,37.0407,72.3859,37.3638C72.1871,37.4117,71.9884,37.4351,71.792,37.4351C70.687,37.4351,69.6826,36.6932,69.4046,35.5848C68.4378,31.7217,64.8144,29.7431,61.7619,28.7456C60.8298,29.7349,59.5009,30.3535,58.026,30.3535C55.8642,30.3535,54.0162,29.0245,53.2713,27.1474C53.2022,27.138,53.1331,27.1287,53.0642,27.1195C54.232,29.5936,57.0851,31.9259,58.1868,32.665C58.3157,32.7516,58.4423,32.8523,58.5547,32.9599C66.5865,40.6151,72.4887,48.8133,76.0971,57.3287C76.6815,58.7074,76.0249,60.2932,74.6313,60.8702C74.2976,61.01,73.9388,61.082,73.576,61.082C72.5065,61.082,71.4914,60.4582,71.0525,59.4213C67.7577,51.6455,62.331,44.1074,54.9203,37.0116C53.6073,36.1009,48.0984,31.9917,47.2065,26.583C40.9421,26.2679,35.6187,26.8278,31.6725,27.5336C31.6197,29.527,30.9225,31.5172,29.2456,33.3731C28.0614,34.6827,26.5968,35.915,25.0446,37.2188C21.9414,39.8269,18.2648,42.9169,14.8104,48.1192C11.356,53.3215,8.12389,60.6361,5.9098,71.6934C5.88732,71.8035,5.85893,71.9123,5.82344,72.0188C5.81634,72.041,4.57886,76.0413,6.77344,79.5289C8.6332,82.4828,12.4557,84.4139,18.1367,85.2705C19.6297,85.4953,20.6566,86.8762,20.4295,88.3532C20.2213,89.6944,19.0559,90.6541,17.7274,90.6541ZM35.1195,7.03101C33.3502,7.03101,31.9158,5.61208,31.9158,3.86173C31.9158,2.11139,33.3502,0.69245,35.1195,0.69245C36.8889,0.69245,38.3233,2.11139,38.3233,3.86173C38.3233,5.61208,36.8889,7.03101,35.1195,7.03101ZM57.6848,23.1892L58.414,24.4754C58.8984,24.3623,59.3923,24.3435,59.8644,24.4203C60.2191,24.5005,60.5087,24.7182,60.6663,25.0229C60.8636,25.3394,60.8993,25.7346,60.7646,26.1094C60.5988,26.5176,60.2972,26.8749,59.9085,27.1235L60.31,27.8316L59.7886,28.1294L59.3994,27.443C58.9257,27.7175,58.399,27.883,57.8664,27.9247L57.3744,27.0569C57.6378,27.0741,57.9071,27.048,58.1704,26.9797C58.4501,26.9251,58.7239,26.8323,58.9829,26.7044L58.2801,25.4647C57.8047,25.5877,57.3167,25.6065,56.8549,25.5197C56.4913,25.4263,56.196,25.1971,56.0328,24.8814C55.8433,24.5561,55.8127,24.1572,55.9484,23.7789C56.088,23.373,56.3763,23.0149,56.7584,22.7726L56.4166,22.1699L56.938,21.8721L57.2727,22.4625C57.6615,22.2376,58.0888,22.0901,58.5254,22.0301L59.0042,22.8746C58.5548,22.8828,58.103,22.9906,57.6848,23.1892ZM56.9319,24.2961Q57.1278,24.6417,57.7863,24.5856L57.1695,23.4978Q56.6982,23.884,56.9319,24.2961ZM58.9077,25.3462L59.4981,26.3875L59.499,26.3891Q59.9965,26.0045,59.7628,25.5923Q59.573,25.2576,58.9077,25.3462ZM73.2212,66.5065C73.2212,68.2569,74.6555,69.6758,76.4249,69.6758C78.1943,69.6758,79.6286,68.2569,79.6286,66.5065C79.6286,64.7562,78.1943,63.3372,76.4249,63.3372C74.6555,63.3372,73.2212,64.7562,73.2212,66.5065ZM35.9465,91.8045C35.0734,91.8045,34.2038,91.7987,33.3378,91.7858C31.827,91.7636,30.6203,90.5359,30.6428,89.0402C30.6653,87.5457,31.9158,86.3297,33.4183,86.3742C49.6344,86.6059,65.7512,84.6175,67.6134,84.037C72.1953,82.4184,74.5295,79.3603,74.5295,74.9575C74.5295,73.463,75.754,72.2517,77.2648,72.2517C78.7755,72.2517,80,73.463,80,74.9575C80,81.5992,76.148,86.7686,69.4317,89.142C67.0041,89.9999,51.0955,91.8046,35.9465,91.8045ZM25.2731,92C23.5037,92,22.0693,90.5811,22.0693,88.8307C22.0693,87.0804,23.5037,85.6615,25.2731,85.6615C27.0424,85.6615,28.4768,87.0804,28.4768,88.8307C28.4768,90.5811,27.0424,92,25.2731,92Z"></path></svg>'), jm = Km.cloneNode(!0);
class qm {
  constructor(n) {
    ft(this, "_chartApi", null);
    if (de.isString(n.container)) {
      if (this._container = document.getElementById(n.container), !this._container)
        throw new Error("Container is null");
    } else
      this._container = n.container;
    this._container.classList.add("klinecharts-pro"), this._container.setAttribute("data-theme", n.theme ?? "light");
    const t = this;
    w5(() => L(zm, {
      ref: (o) => {
        t._chartApi = o;
      },
      get styles() {
        return n.styles ?? {};
      },
      get watermark() {
        return n.watermark ?? jm;
      },
      get theme() {
        return n.theme ?? "light";
      },
      get locale() {
        return n.locale ?? "zh-CN";
      },
      get drawingBarVisible() {
        return n.drawingBarVisible ?? (typeof window < "u" && window.innerWidth > 768);
      },
      get symbol() {
        return n.symbol;
      },
      get period() {
        return n.period;
      },
      get periods() {
        return n.periods ?? [{
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
        return n.timezone ?? "Asia/Shanghai";
      },
      get mainIndicators() {
        return n.mainIndicators ?? ["MA"];
      },
      get subIndicators() {
        return n.subIndicators ?? ["VOL"];
      },
      get datafeed() {
        return n.datafeed;
      },
      get onIndicatorChange() {
        return n.onIndicatorChange;
      },
      get onMobilePeriodClick() {
        return n.onMobilePeriodClick;
      },
      get onMobileMoreClick() {
        return n.onMobileMoreClick;
      },
      get screenshotBackgroundColor() {
        return n.screenshotBackgroundColor;
      },
      get chartViewToggle() {
        return n.chartViewToggle;
      },
      get indicatorTooltipIconStyles() {
        return n.indicatorTooltipIconStyles ?? {};
      },
      get orderTools() {
        return n.orderTools ?? {
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
  createOverlay(n) {
    var t, o;
    return ((o = (t = this._chartApi) == null ? void 0 : t.createOverlay) == null ? void 0 : o.call(t, n)) ?? null;
  }
  removeOverlay(n) {
    var t, o;
    (o = (t = this._chartApi) == null ? void 0 : t.removeOverlay) == null || o.call(t, n);
  }
  removeAllOverlay() {
    var n, t;
    (t = (n = this._chartApi) == null ? void 0 : n.removeAllOverlay) == null || t.call(n);
  }
  getAllOverlay() {
    var n, t;
    return ((t = (n = this._chartApi) == null ? void 0 : n.getAllOverlay) == null ? void 0 : t.call(n)) || [];
  }
  getOverlay(n) {
    var t, o;
    return ((o = (t = this._chartApi) == null ? void 0 : t.getOverlay) == null ? void 0 : o.call(t, n)) ?? null;
  }
  overrideOverlay(n) {
    var t, o;
    (o = (t = this._chartApi) == null ? void 0 : t.overrideOverlay) == null || o.call(t, n);
  }
  // Utility methods
  dispose() {
    var n, t;
    (t = (n = this._chartApi) == null ? void 0 : n.dispose) == null || t.call(n);
  }
  resize() {
    var n, t;
    (t = (n = this._chartApi) == null ? void 0 : n.resize) == null || t.call(n);
  }
  getMainIndicators() {
    return this._chartApi.getMainIndicators();
  }
  overrideIndicator(n, t) {
    const o = this._chartApi;
    o && typeof o.overrideIndicator == "function" ? o.overrideIndicator(n, t) : console.warn("overrideIndicator method not available on chart API");
  }
  setMainIndicators(n) {
    return this._chartApi.setMainIndicators(n);
  }
  getSubIndicators() {
    return this._chartApi.getSubIndicators();
  }
  setSubIndicators(n) {
    return this._chartApi.setSubIndicators(n);
  }
  setTheme(n) {
    var t;
    (t = this._container) == null || t.setAttribute("data-theme", n), this._chartApi.setTheme(n);
  }
  getTheme() {
    return this._chartApi.getTheme();
  }
  setStyles(n) {
    this._chartApi.setStyles(n);
  }
  getStyles() {
    return this._chartApi.getStyles();
  }
  setLocale(n) {
    this._chartApi.setLocale(n);
  }
  getLocale() {
    return this._chartApi.getLocale();
  }
  setTimezone(n) {
    this._chartApi.setTimezone(n);
  }
  getTimezone() {
    return this._chartApi.getTimezone();
  }
  setSymbol(n) {
    this._chartApi.setSymbol(n);
  }
  getSymbol() {
    return this._chartApi.getSymbol();
  }
  setPeriod(n) {
    this._chartApi.setPeriod(n);
  }
  getPeriod() {
    return this._chartApi.getPeriod();
  }
  getSettings() {
    return this._chartApi.getSettings();
  }
  setSettings(n) {
    this._chartApi.setSettings(n);
  }
  resetSettings() {
    this._chartApi.resetSettings();
  }
  saveDrawings(n) {
    var t, o;
    (o = (t = this._chartApi) == null ? void 0 : t.saveDrawings) == null || o.call(t, n);
  }
  loadDrawings(n) {
    var t, o;
    (o = (t = this._chartApi) == null ? void 0 : t.loadDrawings) == null || o.call(t, n);
  }
  getDrawings(n) {
    var t, o;
    return ((o = (t = this._chartApi) == null ? void 0 : t.getDrawings) == null ? void 0 : o.call(t, n)) || [];
  }
  clearDrawings(n) {
    var t, o;
    (o = (t = this._chartApi) == null ? void 0 : t.clearDrawings) == null || o.call(t, n);
  }
  enableAutoSave(n, t = !0) {
    var o, s;
    (s = (o = this._chartApi) == null ? void 0 : o.enableAutoSave) == null || s.call(o, n, t);
  }
  setIndicatorModalVisible(n) {
    var t, o;
    (o = (t = this._chartApi) == null ? void 0 : t.setIndicatorModalVisible) == null || o.call(t, n);
  }
  setTimezoneModalVisible(n) {
    var t, o;
    (o = (t = this._chartApi) == null ? void 0 : t.setTimezoneModalVisible) == null || o.call(t, n);
  }
  setSettingModalVisible(n) {
    var t, o;
    (o = (t = this._chartApi) == null ? void 0 : t.setSettingModalVisible) == null || o.call(t, n);
  }
  getOrderToolsState() {
    var n, t;
    return ((t = (n = this._chartApi) == null ? void 0 : n.getOrderToolsState) == null ? void 0 : t.call(n)) ?? {
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
  setOrderToolsState(n) {
    var t, o;
    (o = (t = this._chartApi) == null ? void 0 : t.setOrderToolsState) == null || o.call(t, n);
  }
  // Forwarded klinecharts chart methods for synchronizing DOM overlays
  // with the canvas (price/pixel conversion, visible-range, data, actions).
  convertToPixel(n, t) {
    return this._chartApi.convertToPixel(n, t);
  }
  convertFromPixel(n, t) {
    return this._chartApi.convertFromPixel(n, t);
  }
  getVisibleRange() {
    return this._chartApi.getVisibleRange();
  }
  getDataList() {
    var n, t;
    return ((t = (n = this._chartApi) == null ? void 0 : n.getDataList) == null ? void 0 : t.call(n)) ?? [];
  }
  getSize(n, t) {
    var o, s;
    return ((s = (o = this._chartApi) == null ? void 0 : o.getSize) == null ? void 0 : s.call(o, n, t)) ?? null;
  }
  getDom(n, t) {
    var o, s;
    return ((s = (o = this._chartApi) == null ? void 0 : o.getDom) == null ? void 0 : s.call(o, n, t)) ?? null;
  }
  subscribeAction(n, t) {
    var o, s;
    (s = (o = this._chartApi) == null ? void 0 : o.subscribeAction) == null || s.call(o, n, t);
  }
  unsubscribeAction(n, t) {
    var o, s;
    (s = (o = this._chartApi) == null ? void 0 : o.unsubscribeAction) == null || s.call(o, n, t);
  }
}
h5.forEach((e) => {
  q9(e);
});
export {
  Vm as DefaultDatafeed,
  qm as KLineChartPro,
  Hm as loadLocales
};
//# sourceMappingURL=klinecharts-pro.js.map
