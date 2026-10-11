import { BehaviorSubject as y, Subject as g } from "rxjs";
import { first as ee } from "rxjs/operators";
let te = 0;
function ne(e = "") {
  return `${e}${++te}`;
}
var re = typeof global == "object" && global && global.Object === Object && global, ue = typeof self == "object" && self && self.Object === Object && self, oe = re || ue || Function("return this")(), b = oe.Symbol, U = Object.prototype, se = U.hasOwnProperty, ie = U.toString, x = b ? b.toStringTag : void 0;
function fe(e) {
  var t = se.call(e, x), n = e[x];
  try {
    e[x] = void 0;
    var u = !0;
  } catch {
  }
  var r = ie.call(e);
  return u && (t ? e[x] = n : delete e[x]), r;
}
var ae = Object.prototype, ce = ae.toString;
function de(e) {
  return ce.call(e);
}
var le = "[object Null]", be = "[object Undefined]", C = b ? b.toStringTag : void 0;
function pe(e) {
  return e == null ? e === void 0 ? be : le : C && C in Object(e) ? fe(e) : de(e);
}
function xe(e) {
  return e != null && typeof e == "object";
}
var ge = "[object Symbol]";
function me(e) {
  return typeof e == "symbol" || xe(e) && pe(e) == ge;
}
function ye(e, t) {
  for (var n = -1, u = e == null ? 0 : e.length, r = Array(u); ++n < u; )
    r[n] = t(e[n], n, e);
  return r;
}
var $e = Array.isArray, S = b ? b.prototype : void 0, O = S ? S.toString : void 0;
function E(e) {
  if (typeof e == "string")
    return e;
  if ($e(e))
    return ye(e, E) + "";
  if (me(e))
    return O ? O.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function m(e) {
  return e == null ? "" : E(e);
}
function Ae(e, t, n) {
  var u = -1, r = e.length;
  t < 0 && (t = -t > r ? 0 : r + t), n = n > r ? r : n, n < 0 && (n += r), r = t > n ? 0 : n - t >>> 0, t >>>= 0;
  for (var s = Array(r); ++u < r; )
    s[u] = e[u + t];
  return s;
}
function Re(e, t, n) {
  var u = e.length;
  return n = n === void 0 ? u : n, Ae(e, t, n);
}
var he = "\\ud800-\\udfff", Ce = "\\u0300-\\u036f", Se = "\\ufe20-\\ufe2f", Oe = "\\u20d0-\\u20ff", je = Ce + Se + Oe, ve = "\\ufe0e\\ufe0f", Te = "\\u200d", we = RegExp("[" + Te + he + je + ve + "]");
function M(e) {
  return we.test(e);
}
function Ue(e) {
  return e.split("");
}
var L = "\\ud800-\\udfff", Ee = "\\u0300-\\u036f", Me = "\\ufe20-\\ufe2f", Le = "\\u20d0-\\u20ff", Ie = Ee + Me + Le, ze = "\\ufe0e\\ufe0f", De = "[" + L + "]", $ = "[" + Ie + "]", A = "\\ud83c[\\udffb-\\udfff]", Ve = "(?:" + $ + "|" + A + ")", I = "[^" + L + "]", z = "(?:\\ud83c[\\udde6-\\uddff]){2}", D = "[\\ud800-\\udbff][\\udc00-\\udfff]", ke = "\\u200d", V = Ve + "?", k = "[" + ze + "]?", Ne = "(?:" + ke + "(?:" + [I, z, D].join("|") + ")" + k + V + ")*", Ze = k + V + Ne, We = "(?:" + [I + $ + "?", $, z, D, De].join("|") + ")", Pe = RegExp(A + "(?=" + A + ")|" + We + Ze, "g");
function He(e) {
  return e.match(Pe) || [];
}
function Je(e) {
  return M(e) ? He(e) : Ue(e);
}
function Fe(e) {
  return function(t) {
    t = m(t);
    var n = M(t) ? Je(t) : void 0, u = n ? n[0] : t.charAt(0), r = n ? Re(n, 1).join("") : t.slice(1);
    return u[e]() + r;
  };
}
var Ge = Fe("toUpperCase");
function Be(e) {
  return Ge(m(e).toLowerCase());
}
function _e(e, t, n, u) {
  for (var r = -1, s = e == null ? 0 : e.length; ++r < s; )
    n = t(n, e[r], r, e);
  return n;
}
function qe(e) {
  return function(t) {
    return e == null ? void 0 : e[t];
  };
}
var Ye = {
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
}, Ke = qe(Ye), Qe = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Xe = "\\u0300-\\u036f", et = "\\ufe20-\\ufe2f", tt = "\\u20d0-\\u20ff", nt = Xe + et + tt, rt = "[" + nt + "]", ut = RegExp(rt, "g");
function ot(e) {
  return e = m(e), e && e.replace(Qe, Ke).replace(ut, "");
}
var st = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function it(e) {
  return e.match(st) || [];
}
var ft = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function at(e) {
  return ft.test(e);
}
var N = "\\ud800-\\udfff", ct = "\\u0300-\\u036f", dt = "\\ufe20-\\ufe2f", lt = "\\u20d0-\\u20ff", bt = ct + dt + lt, Z = "\\u2700-\\u27bf", W = "a-z\\xdf-\\xf6\\xf8-\\xff", pt = "\\xac\\xb1\\xd7\\xf7", xt = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", gt = "\\u2000-\\u206f", mt = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", P = "A-Z\\xc0-\\xd6\\xd8-\\xde", yt = "\\ufe0e\\ufe0f", H = pt + xt + gt + mt, J = "['’]", j = "[" + H + "]", $t = "[" + bt + "]", F = "\\d+", At = "[" + Z + "]", G = "[" + W + "]", B = "[^" + N + H + F + Z + W + P + "]", Rt = "\\ud83c[\\udffb-\\udfff]", ht = "(?:" + $t + "|" + Rt + ")", Ct = "[^" + N + "]", _ = "(?:\\ud83c[\\udde6-\\uddff]){2}", q = "[\\ud800-\\udbff][\\udc00-\\udfff]", l = "[" + P + "]", St = "\\u200d", v = "(?:" + G + "|" + B + ")", Ot = "(?:" + l + "|" + B + ")", T = "(?:" + J + "(?:d|ll|m|re|s|t|ve))?", w = "(?:" + J + "(?:D|LL|M|RE|S|T|VE))?", Y = ht + "?", K = "[" + yt + "]?", jt = "(?:" + St + "(?:" + [Ct, _, q].join("|") + ")" + K + Y + ")*", vt = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Tt = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", wt = K + Y + jt, Ut = "(?:" + [At, _, q].join("|") + ")" + wt, Et = RegExp([
  l + "?" + G + "+" + T + "(?=" + [j, l, "$"].join("|") + ")",
  Ot + "+" + w + "(?=" + [j, l + v, "$"].join("|") + ")",
  l + "?" + v + "+" + T,
  l + "+" + w,
  Tt,
  vt,
  F,
  Ut
].join("|"), "g");
function Mt(e) {
  return e.match(Et) || [];
}
function Lt(e, t, n) {
  return e = m(e), t = t, t === void 0 ? at(e) ? Mt(e) : it(e) : e.match(t) || [];
}
var It = "['’]", zt = RegExp(It, "g");
function Q(e) {
  return function(t) {
    return _e(Lt(ot(t).replace(zt, "")), e, "");
  };
}
var Dt = Q(function(e, t, n) {
  return t = t.toLowerCase(), e + (n ? Be(t) : t);
}), d = Q(function(e, t, n) {
  return e + (n ? "-" : "") + t.toLowerCase();
});
const R = {
  value: null
};
function Ft(e) {
  R.value = e;
}
function Vt(e, t, n, u) {
  const r = ne(`component-${t}-`);
  e.setAttribute("data-component", ""), e.setAttribute(`data-component-${d(t)}-id`, r), o.components.set(r, {
    id: r,
    selector: u ?? "",
    name: t,
    ref: n
  });
}
function kt(e, t, n) {
  const u = Array.from(
    e.querySelectorAll(t.selector)
  );
  n && e.matches(t.selector) && u.unshift(e), u.forEach((r) => {
    var i;
    if (r.hasAttribute(`data-component-${d(t.name)}-id`) || R.value && !R.value(r, t) || t.initCondition && !t.initCondition(r, t))
      return;
    const s = ((i = t.component) == null ? void 0 : i.call(t, r, t.props ?? {})) ?? {};
    Vt(r, t.name, s, t.selector);
  });
}
function X(e, t = {}) {
  const n = t.includeRoot ?? !1, u = Array.from(o.registry.values()).filter(
    ({ selector: r }) => !!e.querySelector(r) || n && e.matches(r)
  );
  for (const r of u)
    kt(e, r, n);
}
function Gt(e, t) {
  const n = `data-component-${d(t)}-id`, u = e.getAttribute(n);
  u && (o.components.delete(u), e.removeAttribute(n), e.removeAttribute("data-component"));
}
function Nt(e, t = {}) {
  if (!o.isReady$.getValue()) {
    console.warn("App is not initialized yet.");
    return;
  }
  const n = t.includeRoot ?? !1, u = Array.from(
    e.querySelectorAll("[data-component]")
  );
  n && e.matches("[data-component]") && u.unshift(e);
  for (const r of u) {
    const s = [], i = Object.keys(r.dataset);
    i.forEach((f) => {
      if (f.match(/^component(.+)Id$/)) {
        const a = r.dataset[f];
        a && s.push(a);
      }
    }), s.forEach((f) => {
      var a, c;
      const p = o.components.get(f);
      p && ((c = (a = p.ref).destroy) == null || c.call(a), o.components.delete(f));
    }), i.forEach((f) => {
      f.startsWith("component") && f.endsWith("Id") && delete r.dataset[f];
    }), r.removeAttribute("data-component");
  }
}
function Zt() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map(), n = new y(!1), u = new y(null), r = new g(), s = new g(), i = new g(), f = new g();
  return {
    registry: e,
    components: t,
    isReady$: n,
    root$: u,
    updated$: r,
    beforeUpdate$: s,
    beforeDestroy$: i,
    destroyed$: f
  };
}
const o = Zt();
function Bt(e) {
  if (o.root$.next(e), o.isReady$.getValue()) {
    console.warn("App is already initialized.");
    return;
  }
  X(e), o.isReady$.next(!0);
}
function _t() {
  if (!o.isReady$.getValue() || !o.root$.getValue()) {
    console.warn("App is not loaded yet.");
    return;
  }
  o.beforeDestroy$.next(), Nt(o.root$.getValue()), o.components.clear(), o.registry.clear(), o.isReady$.next(!1), o.root$.next(null), o.destroyed$.next();
}
function qt() {
  if (!o.isReady$.getValue() || !o.root$.getValue()) {
    console.warn("App is not loaded yet.");
    return;
  }
  o.beforeUpdate$.next(), X(o.root$.getValue()), o.updated$.next();
}
function Yt(e, t, n, u) {
  return {
    component: n,
    props: u ?? {},
    selector: t,
    name: e
  };
}
function Kt(e) {
  if (Object.isFrozen(o.registry)) {
    console.warn("Cannot add to read-only registry.");
    return;
  }
  (Array.isArray(e) ? e : [e]).forEach((n) => {
    o.registry.set(n.name + ":" + n.selector, n);
  });
}
function Wt(e) {
  if (o.isReady$.getValue()) {
    e();
    return;
  }
  o.isReady$.pipe(ee((t) => t)).subscribe(() => {
    e();
  });
}
function Qt(e) {
  const { unsubscribe: t } = o.beforeUpdate$.subscribe(() => {
    e();
  });
  return t;
}
function Xt(e) {
  const { unsubscribe: t } = o.updated$.subscribe(() => {
    e();
  });
  return t;
}
function en(e) {
  const { unsubscribe: t } = o.beforeDestroy$.subscribe(() => {
    e();
  });
  return t;
}
function tn(e) {
  const { unsubscribe: t } = o.destroyed$.subscribe(() => {
    e();
  });
  return t;
}
function nn(e, t, n = {}) {
  const u = d(t), r = t.split("-").length, s = Object.keys(e.dataset).reduce((i, f) => {
    const p = d(f).split("-").slice(0, r).join("-"), a = e.dataset[f];
    if (typeof a > "u" || p !== u) return i;
    const c = Dt(
      d(f).split("-").slice(r).join("-")
    );
    if (!c) return i;
    try {
      i[c] = JSON.parse(a);
    } catch {
      if (a === "" || a === "true")
        i[c] = !0;
      else if (a === "false")
        i[c] = !1;
      else {
        const h = parseFloat(a);
        h + "" === a ? i[c] = h : i[c] = a;
      }
    }
    return i;
  }, {});
  return { ...n, ...s };
}
function rn(e, t) {
  const n = d(e), u = {};
  return Object.entries(t).forEach(([r, s]) => {
    const i = `data-${n}-${d(r)}`;
    if (s !== void 0)
      if (s === null)
        u[i] = "null";
      else if (s === !0)
        u[i] = "";
      else if (s === !1)
        u[i] = "false";
      else if (typeof s == "number")
        u[i] = s.toString();
      else if (typeof s == "string")
        u[i] = s;
      else if (typeof s == "symbol")
        u[i] = s.toString();
      else if (typeof s == "function")
        u[i] = "function";
      else
        try {
          u[i] = JSON.stringify(s);
        } catch (f) {
          console.warn(`Failed to stringify property ${r}:`, f);
        }
  }), u;
}
function un(e, t) {
  const n = new y(null);
  return Wt(() => {
    setTimeout(() => {
      var r;
      const u = e.getAttribute(`data-component-${d(t)}-id`);
      u && n.next((r = o.components.get(u)) == null ? void 0 : r.ref);
    });
  }), n;
}
export {
  o as App,
  Vt as addComponentRecord,
  Kt as addToRegistry,
  _t as destroyApp,
  Nt as destroyComponents,
  Bt as initApp,
  X as initComponents,
  Yt as registerComponent,
  Gt as removeComponentRecord,
  Ft as setGlobalInitCondition,
  qt as updateApp,
  en as useBeforeDestroy,
  Qt as useBeforeUpdate,
  tn as useDestroyed,
  nn as useProps,
  Wt as useReady,
  un as useRef,
  rn as useStringifyProps,
  Xt as useUpdated
};
