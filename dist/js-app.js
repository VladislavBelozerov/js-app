const d = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), $ = Symbol("anyProducer"), U = Promise.resolve(), O = Symbol("listenerAdded"), C = Symbol("listenerRemoved");
let j = !1, M = !1;
const T = (t) => typeof t == "string" || typeof t == "symbol" || typeof t == "number";
function g(t) {
  if (!T(t))
    throw new TypeError("`eventName` must be a string, symbol, or number");
}
function R(t) {
  if (typeof t != "function")
    throw new TypeError("listener must be a function");
}
function h(t, e) {
  const r = l.get(t);
  if (r.has(e))
    return r.get(e);
}
function E(t, e) {
  const r = T(e) ? e : $, n = c.get(t);
  if (n.has(r))
    return n.get(r);
}
function ge(t, e, r) {
  const n = c.get(t);
  if (n.has(e))
    for (const o of n.get(e))
      o.enqueue(r);
  if (n.has($)) {
    const o = Promise.all([e, r]);
    for (const s of n.get($))
      s.enqueue(o);
  }
}
function k(t, e) {
  e = Array.isArray(e) ? e : [e];
  let r = !1, n = () => {
  }, o = [];
  const s = {
    enqueue(u) {
      o.push(u), n();
    },
    finish() {
      r = !0, n();
    }
  };
  for (const u of e) {
    let i = E(t, u);
    i || (i = /* @__PURE__ */ new Set(), c.get(t).set(u, i)), i.add(s);
  }
  return {
    async next() {
      return o ? o.length === 0 ? r ? (o = void 0, this.next()) : (await new Promise((u) => {
        n = u;
      }), this.next()) : {
        done: !1,
        value: await o.shift()
      } : { done: !0 };
    },
    async return(u) {
      o = void 0;
      for (const i of e) {
        const p = E(t, i);
        p && (p.delete(s), p.size === 0 && c.get(t).delete(i));
      }
      return n(), arguments.length > 0 ? { done: !0, value: await u } : { done: !0 };
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
function D(t) {
  if (t === void 0)
    return W;
  if (!Array.isArray(t))
    throw new TypeError("`methodNames` must be an array of strings");
  for (const e of t)
    if (!W.includes(e))
      throw typeof e != "string" ? new TypeError("`methodNames` element must be a string") : new Error(`${e} is not Emittery method`);
  return t;
}
const m = (t) => t === O || t === C;
function S(t, e, r) {
  if (m(e))
    try {
      j = !0, t.emit(e, r);
    } finally {
      j = !1;
    }
}
class b {
  static mixin(e, r) {
    return r = D(r), (n) => {
      if (typeof n != "function")
        throw new TypeError("`target` must be function");
      for (const u of r)
        if (n.prototype[u] !== void 0)
          throw new Error(`The property \`${u}\` already exists on \`target\``);
      function o() {
        return Object.defineProperty(this, e, {
          enumerable: !1,
          value: new b()
        }), this[e];
      }
      Object.defineProperty(n.prototype, e, {
        enumerable: !1,
        get: o
      });
      const s = (u) => function(...i) {
        return this[e][u](...i);
      };
      for (const u of r)
        Object.defineProperty(n.prototype, u, {
          enumerable: !1,
          value: s(u)
        });
      return n;
    };
  }
  static get isDebugEnabled() {
    var r;
    if (typeof ((r = globalThis.process) == null ? void 0 : r.env) != "object")
      return M;
    const { env: e } = globalThis.process ?? { env: {} };
    return e.DEBUG === "emittery" || e.DEBUG === "*" || M;
  }
  static set isDebugEnabled(e) {
    M = e;
  }
  constructor(e = {}) {
    d.set(this, /* @__PURE__ */ new Set()), l.set(this, /* @__PURE__ */ new Map()), c.set(this, /* @__PURE__ */ new Map()), c.get(this).set($, /* @__PURE__ */ new Set()), this.debug = e.debug ?? {}, this.debug.enabled === void 0 && (this.debug.enabled = !1), this.debug.logger || (this.debug.logger = (r, n, o, s) => {
      try {
        s = JSON.stringify(s);
      } catch {
        s = `Object with the following keys failed to stringify: ${Object.keys(s).join(",")}`;
      }
      (typeof o == "symbol" || typeof o == "number") && (o = o.toString());
      const u = /* @__PURE__ */ new Date(), i = `${u.getHours()}:${u.getMinutes()}:${u.getSeconds()}.${u.getMilliseconds()}`;
      console.log(`[${i}][emittery:${r}][${n}] Event Name: ${o}
	data: ${s}`);
    });
  }
  logIfDebugEnabled(e, r, n) {
    (b.isDebugEnabled || this.debug.enabled) && this.debug.logger(e, this.debug.name, r, n);
  }
  on(e, r, { signal: n } = {}) {
    R(r), e = Array.isArray(e) ? e : [e];
    for (const s of e) {
      g(s);
      let u = h(this, s);
      u || (u = /* @__PURE__ */ new Set(), l.get(this).set(s, u)), u.add(r), this.logIfDebugEnabled("subscribe", s, void 0), m(s) || S(this, O, { eventName: s, listener: r });
    }
    const o = () => {
      this.off(e, r), n == null || n.removeEventListener("abort", o);
    };
    return n == null || n.addEventListener("abort", o, { once: !0 }), n != null && n.aborted && o(), o;
  }
  off(e, r) {
    R(r), e = Array.isArray(e) ? e : [e];
    for (const n of e) {
      g(n);
      const o = h(this, n);
      o && (o.delete(r), o.size === 0 && l.get(this).delete(n)), this.logIfDebugEnabled("unsubscribe", n, void 0), m(n) || S(this, C, { eventName: n, listener: r });
    }
  }
  once(e) {
    let r;
    const n = new Promise((o) => {
      r = this.on(e, (s) => {
        r(), o(s);
      });
    });
    return n.off = r, n;
  }
  events(e) {
    e = Array.isArray(e) ? e : [e];
    for (const r of e)
      g(r);
    return k(this, e);
  }
  async emit(e, r) {
    if (g(e), m(e) && !j)
      throw new TypeError("`eventName` cannot be meta event `listenerAdded` or `listenerRemoved`");
    this.logIfDebugEnabled("emit", e, r), ge(this, e, r);
    const n = h(this, e) ?? /* @__PURE__ */ new Set(), o = d.get(this), s = [...n], u = m(e) ? [] : [...o];
    await U, await Promise.all([
      ...s.map(async (i) => {
        if (n.has(i))
          return i(r);
      }),
      ...u.map(async (i) => {
        if (o.has(i))
          return i(e, r);
      })
    ]);
  }
  async emitSerial(e, r) {
    if (g(e), m(e) && !j)
      throw new TypeError("`eventName` cannot be meta event `listenerAdded` or `listenerRemoved`");
    this.logIfDebugEnabled("emitSerial", e, r);
    const n = h(this, e) ?? /* @__PURE__ */ new Set(), o = d.get(this), s = [...n], u = [...o];
    await U;
    for (const i of s)
      n.has(i) && await i(r);
    for (const i of u)
      o.has(i) && await i(e, r);
  }
  onAny(e, { signal: r } = {}) {
    R(e), this.logIfDebugEnabled("subscribeAny", void 0, void 0), d.get(this).add(e), S(this, O, { listener: e });
    const n = () => {
      this.offAny(e), r == null || r.removeEventListener("abort", n);
    };
    return r == null || r.addEventListener("abort", n, { once: !0 }), r != null && r.aborted && n(), n;
  }
  anyEvent() {
    return k(this);
  }
  offAny(e) {
    R(e), this.logIfDebugEnabled("unsubscribeAny", void 0, void 0), S(this, C, { listener: e }), d.get(this).delete(e);
  }
  clearListeners(e) {
    e = Array.isArray(e) ? e : [e];
    for (const r of e)
      if (this.logIfDebugEnabled("clear", r, void 0), T(r)) {
        const n = h(this, r);
        n && n.clear();
        const o = E(this, r);
        if (o) {
          for (const s of o)
            s.finish();
          o.clear();
        }
      } else {
        d.get(this).clear();
        for (const [n, o] of l.get(this).entries())
          o.clear(), l.get(this).delete(n);
        for (const [n, o] of c.get(this).entries()) {
          for (const s of o)
            s.finish();
          o.clear(), c.get(this).delete(n);
        }
      }
  }
  listenerCount(e) {
    var n, o, s;
    e = Array.isArray(e) ? e : [e];
    let r = 0;
    for (const u of e) {
      if (T(u)) {
        r += d.get(this).size + (((n = h(this, u)) == null ? void 0 : n.size) ?? 0) + (((o = E(this, u)) == null ? void 0 : o.size) ?? 0) + (((s = E(this)) == null ? void 0 : s.size) ?? 0);
        continue;
      }
      u !== void 0 && g(u), r += d.get(this).size;
      for (const i of l.get(this).values())
        r += i.size;
      for (const i of c.get(this).values())
        r += i.size;
    }
    return r;
  }
  bindMethods(e, r) {
    if (typeof e != "object" || e === null)
      throw new TypeError("`target` must be an object");
    r = D(r);
    for (const n of r) {
      if (e[n] !== void 0)
        throw new Error(`The property \`${n}\` already exists on \`target\``);
      Object.defineProperty(e, n, {
        enumerable: !1,
        value: this[n].bind(this)
      });
    }
  }
}
const W = Object.getOwnPropertyNames(b.prototype).filter((t) => t !== "constructor");
Object.defineProperty(b, "listenerAdded", {
  value: O,
  writable: !1,
  enumerable: !0,
  configurable: !1
});
Object.defineProperty(b, "listenerRemoved", {
  value: C,
  writable: !1,
  enumerable: !0,
  configurable: !1
});
function he(t) {
  const e = new b(t);
  return {
    on: e.on.bind(e),
    off: e.off.bind(e),
    emit: e.emit.bind(e),
    once: e.once.bind(e),
    events: e.events.bind(e),
    emitSerial: e.emitSerial.bind(e),
    onAny: e.onAny.bind(e),
    offAny: e.offAny.bind(e),
    anyEvent: e.anyEvent.bind(e),
    clearListeners: e.clearListeners.bind(e),
    listenerCount: e.listenerCount.bind(e),
    bindMethods: e.bindMethods.bind(e)
  };
}
let me = 0;
function xe(t = "") {
  return `${t}${++me}`;
}
async function Ae(t) {
  const e = Array.from(f.registry.values()).filter(
    ({ selector: n }) => !!t.querySelector(n)
  ), r = e.filter(
    ({ asyncComponent: n, component: o }) => !o && !!n
  );
  await Promise.all(
    r.map(
      (n) => {
        var o;
        return (o = n.asyncComponent) == null ? void 0 : o.call(n).then((s) => {
          n.component = s;
        });
      }
    )
  );
  for (const n of e)
    t.querySelectorAll(n.selector).forEach((o) => {
      var i;
      if (o.hasAttribute(`[data-component-name="${n.name}"]`))
        return;
      const s = ((i = n.component) == null ? void 0 : i.call(n, o, n.props ?? {})) ?? {}, u = xe(`component-${n.name}-`);
      o.setAttribute("data-component-id", u), o.setAttribute("data-component-name", n.name), f.components.set(u, {
        id: u,
        selector: n.selector,
        name: n.name,
        ref: s
      });
    });
}
function we() {
  const t = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Map();
  return {
    ...he(),
    registry: t,
    components: e,
    isReady: !1
  };
}
const f = we();
async function or(t) {
  if (f.isReady) {
    console.warn("App is already initialized.");
    return;
  }
  await Ae(t), await f.emit("ready"), f.isReady = !0;
}
function ur(t, e, r, n) {
  return {
    component: r,
    props: n ?? {},
    selector: e,
    asyncComponent: void 0,
    name: t
  };
}
function sr(t, e, r, n) {
  return {
    component: void 0,
    props: n ?? {},
    selector: e,
    asyncComponent: r,
    name: t
  };
}
function ir(t) {
  if (Object.isFrozen(f.registry)) {
    console.warn("Cannot add to read-only registry.");
    return;
  }
  (Array.isArray(t) ? t : [t]).forEach((r) => {
    f.registry.set(r.name + ":" + r.selector, r);
  });
}
function fr(t) {
  var r, n;
  if (!f.isReady) {
    console.warn("App is not initialized yet.");
    return;
  }
  const e = Array.from(
    t.querySelectorAll("[data-component-id]")
  );
  t.hasAttribute("data-component-id") && e.push(t);
  for (const o of e) {
    const s = o.dataset.componentId, u = f.components.get(s);
    u && ((n = (r = u.ref).destroy) == null || n.call(r), f.components.delete(s)), o.removeAttribute("data-component-id"), o.removeAttribute("data-component-name");
  }
}
var Ee = typeof global == "object" && global && global.Object === Object && global, Re = typeof self == "object" && self && self.Object === Object && self, Se = Ee || Re || Function("return this")(), A = Se.Symbol, V = Object.prototype, $e = V.hasOwnProperty, Oe = V.toString, w = A ? A.toStringTag : void 0;
function Ce(t) {
  var e = $e.call(t, w), r = t[w];
  try {
    t[w] = void 0;
    var n = !0;
  } catch {
  }
  var o = Oe.call(t);
  return n && (e ? t[w] = r : delete t[w]), o;
}
var je = Object.prototype, Te = je.toString;
function ve(t) {
  return Te.call(t);
}
var Me = "[object Null]", Le = "[object Undefined]", Z = A ? A.toStringTag : void 0;
function ze(t) {
  return t == null ? t === void 0 ? Le : Me : Z && Z in Object(t) ? Ce(t) : ve(t);
}
function Ie(t) {
  return t != null && typeof t == "object";
}
var Pe = "[object Symbol]";
function Ue(t) {
  return typeof t == "symbol" || Ie(t) && ze(t) == Pe;
}
function ke(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, o = Array(n); ++r < n; )
    o[r] = e(t[r], r, t);
  return o;
}
var De = Array.isArray, G = A ? A.prototype : void 0, q = G ? G.toString : void 0;
function _(t) {
  if (typeof t == "string")
    return t;
  if (De(t))
    return ke(t, _) + "";
  if (Ue(t))
    return q ? q.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -1 / 0 ? "-0" : e;
}
function v(t) {
  return t == null ? "" : _(t);
}
function We(t, e, r) {
  var n = -1, o = t.length;
  e < 0 && (e = -e > o ? 0 : o + e), r = r > o ? o : r, r < 0 && (r += o), o = e > r ? 0 : r - e >>> 0, e >>>= 0;
  for (var s = Array(o); ++n < o; )
    s[n] = t[n + e];
  return s;
}
function Ze(t, e, r) {
  var n = t.length;
  return r = r === void 0 ? n : r, We(t, e, r);
}
var Ge = "\\ud800-\\udfff", qe = "\\u0300-\\u036f", He = "\\ufe20-\\ufe2f", Je = "\\u20d0-\\u20ff", Fe = qe + He + Je, Be = "\\ufe0e\\ufe0f", Ve = "\\u200d", _e = RegExp("[" + Ve + Ge + Fe + Be + "]");
function Y(t) {
  return _e.test(t);
}
function Ye(t) {
  return t.split("");
}
var K = "\\ud800-\\udfff", Ke = "\\u0300-\\u036f", Qe = "\\ufe20-\\ufe2f", Xe = "\\u20d0-\\u20ff", Ne = Ke + Qe + Xe, et = "\\ufe0e\\ufe0f", tt = "[" + K + "]", z = "[" + Ne + "]", I = "\\ud83c[\\udffb-\\udfff]", rt = "(?:" + z + "|" + I + ")", Q = "[^" + K + "]", X = "(?:\\ud83c[\\udde6-\\uddff]){2}", N = "[\\ud800-\\udbff][\\udc00-\\udfff]", nt = "\\u200d", ee = rt + "?", te = "[" + et + "]?", ot = "(?:" + nt + "(?:" + [Q, X, N].join("|") + ")" + te + ee + ")*", ut = te + ee + ot, st = "(?:" + [Q + z + "?", z, X, N, tt].join("|") + ")", it = RegExp(I + "(?=" + I + ")|" + st + ut, "g");
function ft(t) {
  return t.match(it) || [];
}
function at(t) {
  return Y(t) ? ft(t) : Ye(t);
}
function ct(t) {
  return function(e) {
    e = v(e);
    var r = Y(e) ? at(e) : void 0, n = r ? r[0] : e.charAt(0), o = r ? Ze(r, 1).join("") : e.slice(1);
    return n[t]() + o;
  };
}
var dt = ct("toUpperCase");
function lt(t) {
  return dt(v(t).toLowerCase());
}
function bt(t, e, r, n) {
  for (var o = -1, s = t == null ? 0 : t.length; ++o < s; )
    r = e(r, t[o], o, t);
  return r;
}
function pt(t) {
  return function(e) {
    return t == null ? void 0 : t[e];
  };
}
var yt = {
  // Latin-1 Supplement block.
  À: "A",
  Á: "A",
  Â: "A",
  Ã: "A",
  Ä: "A",
  Å: "A",
  à: "a",
  á: "a",
  â: "a",
  ã: "a",
  ä: "a",
  å: "a",
  Ç: "C",
  ç: "c",
  Ð: "D",
  ð: "d",
  È: "E",
  É: "E",
  Ê: "E",
  Ë: "E",
  è: "e",
  é: "e",
  ê: "e",
  ë: "e",
  Ì: "I",
  Í: "I",
  Î: "I",
  Ï: "I",
  ì: "i",
  í: "i",
  î: "i",
  ï: "i",
  Ñ: "N",
  ñ: "n",
  Ò: "O",
  Ó: "O",
  Ô: "O",
  Õ: "O",
  Ö: "O",
  Ø: "O",
  ò: "o",
  ó: "o",
  ô: "o",
  õ: "o",
  ö: "o",
  ø: "o",
  Ù: "U",
  Ú: "U",
  Û: "U",
  Ü: "U",
  ù: "u",
  ú: "u",
  û: "u",
  ü: "u",
  Ý: "Y",
  ý: "y",
  ÿ: "y",
  Æ: "Ae",
  æ: "ae",
  Þ: "Th",
  þ: "th",
  ß: "ss",
  // Latin Extended-A block.
  Ā: "A",
  Ă: "A",
  Ą: "A",
  ā: "a",
  ă: "a",
  ą: "a",
  Ć: "C",
  Ĉ: "C",
  Ċ: "C",
  Č: "C",
  ć: "c",
  ĉ: "c",
  ċ: "c",
  č: "c",
  Ď: "D",
  Đ: "D",
  ď: "d",
  đ: "d",
  Ē: "E",
  Ĕ: "E",
  Ė: "E",
  Ę: "E",
  Ě: "E",
  ē: "e",
  ĕ: "e",
  ė: "e",
  ę: "e",
  ě: "e",
  Ĝ: "G",
  Ğ: "G",
  Ġ: "G",
  Ģ: "G",
  ĝ: "g",
  ğ: "g",
  ġ: "g",
  ģ: "g",
  Ĥ: "H",
  Ħ: "H",
  ĥ: "h",
  ħ: "h",
  Ĩ: "I",
  Ī: "I",
  Ĭ: "I",
  Į: "I",
  İ: "I",
  ĩ: "i",
  ī: "i",
  ĭ: "i",
  į: "i",
  ı: "i",
  Ĵ: "J",
  ĵ: "j",
  Ķ: "K",
  ķ: "k",
  ĸ: "k",
  Ĺ: "L",
  Ļ: "L",
  Ľ: "L",
  Ŀ: "L",
  Ł: "L",
  ĺ: "l",
  ļ: "l",
  ľ: "l",
  ŀ: "l",
  ł: "l",
  Ń: "N",
  Ņ: "N",
  Ň: "N",
  Ŋ: "N",
  ń: "n",
  ņ: "n",
  ň: "n",
  ŋ: "n",
  Ō: "O",
  Ŏ: "O",
  Ő: "O",
  ō: "o",
  ŏ: "o",
  ő: "o",
  Ŕ: "R",
  Ŗ: "R",
  Ř: "R",
  ŕ: "r",
  ŗ: "r",
  ř: "r",
  Ś: "S",
  Ŝ: "S",
  Ş: "S",
  Š: "S",
  ś: "s",
  ŝ: "s",
  ş: "s",
  š: "s",
  Ţ: "T",
  Ť: "T",
  Ŧ: "T",
  ţ: "t",
  ť: "t",
  ŧ: "t",
  Ũ: "U",
  Ū: "U",
  Ŭ: "U",
  Ů: "U",
  Ű: "U",
  Ų: "U",
  ũ: "u",
  ū: "u",
  ŭ: "u",
  ů: "u",
  ű: "u",
  ų: "u",
  Ŵ: "W",
  ŵ: "w",
  Ŷ: "Y",
  ŷ: "y",
  Ÿ: "Y",
  Ź: "Z",
  Ż: "Z",
  Ž: "Z",
  ź: "z",
  ż: "z",
  ž: "z",
  Ĳ: "IJ",
  ĳ: "ij",
  Œ: "Oe",
  œ: "oe",
  ŉ: "'n",
  ſ: "s"
}, gt = pt(yt), ht = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, mt = "\\u0300-\\u036f", xt = "\\ufe20-\\ufe2f", At = "\\u20d0-\\u20ff", wt = mt + xt + At, Et = "[" + wt + "]", Rt = RegExp(Et, "g");
function St(t) {
  return t = v(t), t && t.replace(ht, gt).replace(Rt, "");
}
var $t = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function Ot(t) {
  return t.match($t) || [];
}
var Ct = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function jt(t) {
  return Ct.test(t);
}
var re = "\\ud800-\\udfff", Tt = "\\u0300-\\u036f", vt = "\\ufe20-\\ufe2f", Mt = "\\u20d0-\\u20ff", Lt = Tt + vt + Mt, ne = "\\u2700-\\u27bf", oe = "a-z\\xdf-\\xf6\\xf8-\\xff", zt = "\\xac\\xb1\\xd7\\xf7", It = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Pt = "\\u2000-\\u206f", Ut = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", ue = "A-Z\\xc0-\\xd6\\xd8-\\xde", kt = "\\ufe0e\\ufe0f", se = zt + It + Pt + Ut, ie = "['’]", H = "[" + se + "]", Dt = "[" + Lt + "]", fe = "\\d+", Wt = "[" + ne + "]", ae = "[" + oe + "]", ce = "[^" + re + se + fe + ne + oe + ue + "]", Zt = "\\ud83c[\\udffb-\\udfff]", Gt = "(?:" + Dt + "|" + Zt + ")", qt = "[^" + re + "]", de = "(?:\\ud83c[\\udde6-\\uddff]){2}", le = "[\\ud800-\\udbff][\\udc00-\\udfff]", x = "[" + ue + "]", Ht = "\\u200d", J = "(?:" + ae + "|" + ce + ")", Jt = "(?:" + x + "|" + ce + ")", F = "(?:" + ie + "(?:d|ll|m|re|s|t|ve))?", B = "(?:" + ie + "(?:D|LL|M|RE|S|T|VE))?", be = Gt + "?", pe = "[" + kt + "]?", Ft = "(?:" + Ht + "(?:" + [qt, de, le].join("|") + ")" + pe + be + ")*", Bt = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Vt = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", _t = pe + be + Ft, Yt = "(?:" + [Wt, de, le].join("|") + ")" + _t, Kt = RegExp([
  x + "?" + ae + "+" + F + "(?=" + [H, x, "$"].join("|") + ")",
  Jt + "+" + B + "(?=" + [H, x + J, "$"].join("|") + ")",
  x + "?" + J + "+" + F,
  x + "+" + B,
  Vt,
  Bt,
  fe,
  Yt
].join("|"), "g");
function Qt(t) {
  return t.match(Kt) || [];
}
function Xt(t, e, r) {
  return t = v(t), e = e, e === void 0 ? jt(t) ? Qt(t) : Ot(t) : t.match(e) || [];
}
var Nt = "['’]", er = RegExp(Nt, "g");
function ye(t) {
  return function(e) {
    return bt(Xt(St(e).replace(er, "")), t, "");
  };
}
var tr = ye(function(t, e, r) {
  return e = e.toLowerCase(), t + (r ? lt(e) : e);
}), L = ye(function(t, e, r) {
  return t + (r ? "-" : "") + e.toLowerCase();
});
function ar(t, e, r = {}) {
  const n = L(e), o = e.split("-").length, s = Object.keys(t.dataset).reduce((u, i) => {
    const p = L(i).split("-").slice(0, o).join("-"), a = t.dataset[i];
    if (typeof a > "u" || p !== n) return u;
    const y = tr(
      L(i).split("-").slice(o).join("-")
    );
    if (!y) return u;
    try {
      u[y] = JSON.parse(a);
    } catch {
      if (a === "" || a === "true")
        u[y] = !0;
      else if (a === "false")
        u[y] = !1;
      else {
        const P = parseFloat(a);
        P + "" === a ? u[y] = P : u[y] = a;
      }
    }
    return u;
  }, {});
  return { ...r, ...s };
}
function rr(t) {
  if (f.isReady) {
    t();
    return;
  }
  f.once("ready").then(() => {
    t();
  });
}
function cr(t, e) {
  const r = { current: null };
  return rr(() => {
    var s;
    if (!(t.dataset.componentName === e)) return null;
    const o = t.dataset.componentId;
    r.current = ((s = f.components.get(o)) == null ? void 0 : s.ref) ?? null;
  }), r;
}
export {
  f as App,
  ir as addToRegistry,
  fr as destroyComponents,
  or as initApp,
  Ae as initComponents,
  sr as registerAsyncComponent,
  ur as registerComponent,
  he as useEmitter,
  ar as useGetProps,
  cr as useGetRef,
  rr as useReady
};
