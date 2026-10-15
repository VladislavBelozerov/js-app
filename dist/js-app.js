import { ReplaySubject as ne, take as E, BehaviorSubject as y, Subject as g } from "rxjs";
import { first as re } from "rxjs/operators";
let oe = 0;
function ue(e = "") {
  return `${e}${++oe}`;
}
var se = typeof global == "object" && global && global.Object === Object && global, ie = typeof self == "object" && self && self.Object === Object && self, ae = se || ie || Function("return this")(), b = ae.Symbol, M = Object.prototype, fe = M.hasOwnProperty, ce = M.toString, x = b ? b.toStringTag : void 0;
function de(e) {
  var t = fe.call(e, x), n = e[x];
  try {
    e[x] = void 0;
    var o = !0;
  } catch {
  }
  var r = ce.call(e);
  return o && (t ? e[x] = n : delete e[x]), r;
}
var le = Object.prototype, pe = le.toString;
function be(e) {
  return pe.call(e);
}
var xe = "[object Null]", ge = "[object Undefined]", C = b ? b.toStringTag : void 0;
function me(e) {
  return e == null ? e === void 0 ? ge : xe : C && C in Object(e) ? de(e) : be(e);
}
function ye(e) {
  return e != null && typeof e == "object";
}
var $e = "[object Symbol]";
function Ae(e) {
  return typeof e == "symbol" || ye(e) && me(e) == $e;
}
function Re(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length, r = Array(o); ++n < o; )
    r[n] = t(e[n], n, e);
  return r;
}
var he = Array.isArray, S = b ? b.prototype : void 0, O = S ? S.toString : void 0;
function L(e) {
  if (typeof e == "string")
    return e;
  if (he(e))
    return Re(e, L) + "";
  if (Ae(e))
    return O ? O.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function m(e) {
  return e == null ? "" : L(e);
}
function Ce(e, t, n) {
  var o = -1, r = e.length;
  t < 0 && (t = -t > r ? 0 : r + t), n = n > r ? r : n, n < 0 && (n += r), r = t > n ? 0 : n - t >>> 0, t >>>= 0;
  for (var u = Array(r); ++o < r; )
    u[o] = e[o + t];
  return u;
}
function Se(e, t, n) {
  var o = e.length;
  return n = n === void 0 ? o : n, Ce(e, t, n);
}
var Oe = "\\ud800-\\udfff", je = "\\u0300-\\u036f", ve = "\\ufe20-\\ufe2f", we = "\\u20d0-\\u20ff", Te = je + ve + we, Ue = "\\ufe0e\\ufe0f", Ee = "\\u200d", Me = RegExp("[" + Ee + Oe + Te + Ue + "]");
function I(e) {
  return Me.test(e);
}
function Le(e) {
  return e.split("");
}
var z = "\\ud800-\\udfff", Ie = "\\u0300-\\u036f", ze = "\\ufe20-\\ufe2f", ke = "\\u20d0-\\u20ff", De = Ie + ze + ke, Ve = "\\ufe0e\\ufe0f", Ne = "[" + z + "]", $ = "[" + De + "]", A = "\\ud83c[\\udffb-\\udfff]", Ze = "(?:" + $ + "|" + A + ")", k = "[^" + z + "]", D = "(?:\\ud83c[\\udde6-\\uddff]){2}", V = "[\\ud800-\\udbff][\\udc00-\\udfff]", Pe = "\\u200d", N = Ze + "?", Z = "[" + Ve + "]?", We = "(?:" + Pe + "(?:" + [k, D, V].join("|") + ")" + Z + N + ")*", _e = Z + N + We, Fe = "(?:" + [k + $ + "?", $, D, V, Ne].join("|") + ")", He = RegExp(A + "(?=" + A + ")|" + Fe + _e, "g");
function Je(e) {
  return e.match(He) || [];
}
function Ge(e) {
  return I(e) ? Je(e) : Le(e);
}
function Be(e) {
  return function(t) {
    t = m(t);
    var n = I(t) ? Ge(t) : void 0, o = n ? n[0] : t.charAt(0), r = n ? Se(n, 1).join("") : t.slice(1);
    return o[e]() + r;
  };
}
var qe = Be("toUpperCase");
function Ye(e) {
  return qe(m(e).toLowerCase());
}
function Ke(e, t, n, o) {
  for (var r = -1, u = e == null ? 0 : e.length; ++r < u; )
    n = t(n, e[r], r, e);
  return n;
}
function Qe(e) {
  return function(t) {
    return e == null ? void 0 : e[t];
  };
}
var Xe = {
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
}, et = Qe(Xe), tt = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, nt = "\\u0300-\\u036f", rt = "\\ufe20-\\ufe2f", ot = "\\u20d0-\\u20ff", ut = nt + rt + ot, st = "[" + ut + "]", it = RegExp(st, "g");
function at(e) {
  return e = m(e), e && e.replace(tt, et).replace(it, "");
}
var ft = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function ct(e) {
  return e.match(ft) || [];
}
var dt = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function lt(e) {
  return dt.test(e);
}
var P = "\\ud800-\\udfff", pt = "\\u0300-\\u036f", bt = "\\ufe20-\\ufe2f", xt = "\\u20d0-\\u20ff", gt = pt + bt + xt, W = "\\u2700-\\u27bf", _ = "a-z\\xdf-\\xf6\\xf8-\\xff", mt = "\\xac\\xb1\\xd7\\xf7", yt = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", $t = "\\u2000-\\u206f", At = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", F = "A-Z\\xc0-\\xd6\\xd8-\\xde", Rt = "\\ufe0e\\ufe0f", H = mt + yt + $t + At, J = "['’]", j = "[" + H + "]", ht = "[" + gt + "]", G = "\\d+", Ct = "[" + W + "]", B = "[" + _ + "]", q = "[^" + P + H + G + W + _ + F + "]", St = "\\ud83c[\\udffb-\\udfff]", Ot = "(?:" + ht + "|" + St + ")", jt = "[^" + P + "]", Y = "(?:\\ud83c[\\udde6-\\uddff]){2}", K = "[\\ud800-\\udbff][\\udc00-\\udfff]", p = "[" + F + "]", vt = "\\u200d", v = "(?:" + B + "|" + q + ")", wt = "(?:" + p + "|" + q + ")", w = "(?:" + J + "(?:d|ll|m|re|s|t|ve))?", T = "(?:" + J + "(?:D|LL|M|RE|S|T|VE))?", Q = Ot + "?", X = "[" + Rt + "]?", Tt = "(?:" + vt + "(?:" + [jt, Y, K].join("|") + ")" + X + Q + ")*", Ut = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Et = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", Mt = X + Q + Tt, Lt = "(?:" + [Ct, Y, K].join("|") + ")" + Mt, It = RegExp([
  p + "?" + B + "+" + w + "(?=" + [j, p, "$"].join("|") + ")",
  wt + "+" + T + "(?=" + [j, p + v, "$"].join("|") + ")",
  p + "?" + v + "+" + w,
  p + "+" + T,
  Et,
  Ut,
  G,
  Lt
].join("|"), "g");
function zt(e) {
  return e.match(It) || [];
}
function kt(e, t, n) {
  return e = m(e), t = t, t === void 0 ? lt(e) ? zt(e) : ct(e) : e.match(t) || [];
}
var Dt = "['’]", Vt = RegExp(Dt, "g");
function ee(e) {
  return function(t) {
    return Ke(kt(at(t).replace(Vt, "")), e, "");
  };
}
var Nt = ee(function(e, t, n) {
  return t = t.toLowerCase(), e + (n ? Ye(t) : t);
}), l = ee(function(e, t, n) {
  return e + (n ? "-" : "") + t.toLowerCase();
});
function Zt(e, t, n) {
  const o = new ne(1), r = new AbortController(), u = () => {
    r.abort(), o.complete();
  };
  return Promise.resolve().then(() => {
    if (!r.signal.aborted)
      return n();
  }).then((s) => {
    if (!r.signal.aborted && s) {
      const a = s(e, t) ?? {};
      o.next(a), u();
    }
  }).catch((s) => {
    r.signal.aborted || (o.error(s), u());
  }), {
    __suspense: !0,
    ready$: o,
    destroy: u
  };
}
const R = {
  value: null
};
function Bt(e) {
  R.value = e;
}
function U(e, t, n, o) {
  const r = ue(`component-${t}-`);
  return e.setAttribute("data-component", ""), e.setAttribute(`data-component-${l(t)}-id`, r), i.components.set(r, {
    id: r,
    selector: o ?? "",
    name: t,
    ref: n
  }), r;
}
function Pt(e, t, n) {
  const o = Array.from(
    e.querySelectorAll(t.selector)
  );
  n && e.matches(t.selector) && o.unshift(e), o.forEach((r) => {
    if (r.hasAttribute(`data-component-${l(t.name)}-id`) || R.value && !R.value(r, t) || t.initCondition && !t.initCondition(r, t))
      return;
    if ("component" in t) {
      const a = t.component(r, t.props ?? {}) ?? {};
      U(r, t.name, a, t.selector);
      return;
    }
    const u = Zt(
      r,
      t.props ?? {},
      t.asyncComponent
    ), s = U(
      r,
      t.name,
      u,
      t.selector
    );
    u.ready$.pipe(E(1)).subscribe({
      next: (a) => {
        const c = i.components.get(s);
        (c == null ? void 0 : c.ref) === u && (c.ref = a);
      },
      error: (a) => {
        console.error(`Failed to initialize component "${t.name}".`, a);
      }
    });
  });
}
function te(e, t = {}) {
  const n = t.includeRoot ?? !1, o = Array.from(i.registry.values()).filter(
    ({ selector: r }) => !!e.querySelector(r) || n && e.matches(r)
  );
  for (const r of o)
    Pt(e, r, n);
}
function qt(e, t) {
  const n = `data-component-${l(t)}-id`, o = e.getAttribute(n);
  o && (i.components.delete(o), e.removeAttribute(n), e.removeAttribute("data-component"));
}
function Wt(e, t = {}) {
  if (!i.isReady$.getValue()) {
    console.warn("App is not initialized yet.");
    return;
  }
  const n = t.includeRoot ?? !1, o = Array.from(
    e.querySelectorAll("[data-component]")
  );
  n && e.matches("[data-component]") && o.unshift(e);
  for (const r of o) {
    const u = [], s = Object.keys(r.dataset);
    s.forEach((a) => {
      if (a.match(/^component(.+)Id$/)) {
        const f = r.dataset[a];
        f && u.push(f);
      }
    }), u.forEach((a) => {
      var f, d;
      const c = i.components.get(a);
      c && ((d = (f = c.ref).destroy) == null || d.call(f), i.components.delete(a));
    }), s.forEach((a) => {
      a.startsWith("component") && a.endsWith("Id") && delete r.dataset[a];
    }), r.removeAttribute("data-component");
  }
}
function _t() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map(), n = new y(!1), o = new y(null), r = new g(), u = new g(), s = new g(), a = new g();
  return {
    registry: e,
    components: t,
    isReady$: n,
    root$: o,
    updated$: r,
    beforeUpdate$: u,
    beforeDestroy$: s,
    destroyed$: a
  };
}
const i = _t();
function Yt(e) {
  if (i.root$.next(e), i.isReady$.getValue()) {
    console.warn("App is already initialized.");
    return;
  }
  te(e), i.isReady$.next(!0);
}
function Kt() {
  if (!i.isReady$.getValue() || !i.root$.getValue()) {
    console.warn("App is not loaded yet.");
    return;
  }
  i.beforeDestroy$.next(), Wt(i.root$.getValue()), i.components.clear(), i.registry.clear(), i.isReady$.next(!1), i.root$.next(null), i.destroyed$.next();
}
function Qt() {
  if (!i.isReady$.getValue() || !i.root$.getValue()) {
    console.warn("App is not loaded yet.");
    return;
  }
  i.beforeUpdate$.next(), te(i.root$.getValue()), i.updated$.next();
}
function Xt(e, t, n, o) {
  return {
    component: n,
    props: o ?? {},
    selector: t,
    name: e
  };
}
function en(e, t, n, o) {
  return {
    asyncComponent: n,
    props: o ?? {},
    selector: t,
    name: e
  };
}
function tn(e) {
  if (Object.isFrozen(i.registry)) {
    console.warn("Cannot add to read-only registry.");
    return;
  }
  (Array.isArray(e) ? e : [e]).forEach((n) => {
    i.registry.set(n.name + ":" + n.selector, n);
  });
}
function Ft(e) {
  if (i.isReady$.getValue()) {
    e();
    return;
  }
  i.isReady$.pipe(re((t) => t)).subscribe(() => {
    e();
  });
}
function nn(e) {
  const { unsubscribe: t } = i.beforeUpdate$.subscribe(() => {
    e();
  });
  return t;
}
function rn(e) {
  const { unsubscribe: t } = i.updated$.subscribe(() => {
    e();
  });
  return t;
}
function on(e) {
  const { unsubscribe: t } = i.beforeDestroy$.subscribe(() => {
    e();
  });
  return t;
}
function un(e) {
  const { unsubscribe: t } = i.destroyed$.subscribe(() => {
    e();
  });
  return t;
}
function sn(e, t, n = {}) {
  const o = l(t), r = t.split("-").length, u = Object.keys(e.dataset).reduce((s, a) => {
    const c = l(a).split("-").slice(0, r).join("-"), f = e.dataset[a];
    if (typeof f > "u" || c !== o) return s;
    const d = Nt(
      l(a).split("-").slice(r).join("-")
    );
    if (!d) return s;
    try {
      s[d] = JSON.parse(f);
    } catch {
      if (f === "" || f === "true")
        s[d] = !0;
      else if (f === "false")
        s[d] = !1;
      else {
        const h = parseFloat(f);
        h + "" === f ? s[d] = h : s[d] = f;
      }
    }
    return s;
  }, {});
  return { ...n, ...u };
}
function an(e, t) {
  const n = l(e), o = {};
  return Object.entries(t).forEach(([r, u]) => {
    const s = `data-${n}-${l(r)}`;
    if (u !== void 0)
      if (u === null)
        o[s] = "null";
      else if (u === !0)
        o[s] = "";
      else if (u === !1)
        o[s] = "false";
      else if (typeof u == "number")
        o[s] = u.toString();
      else if (typeof u == "string")
        o[s] = u;
      else if (typeof u == "symbol")
        o[s] = u.toString();
      else if (typeof u == "function")
        o[s] = "function";
      else
        try {
          o[s] = JSON.stringify(u);
        } catch (a) {
          console.warn(`Failed to stringify property ${r}:`, a);
        }
  }), o;
}
function fn(e, t) {
  const n = new y(null);
  return Ft(() => {
    setTimeout(() => {
      var r;
      const o = e.getAttribute(`data-component-${l(t)}-id`);
      if (o) {
        const u = (r = i.components.get(o)) == null ? void 0 : r.ref;
        u != null && u.__suspense ? u.ready$.pipe(E(1)).subscribe({
          next: (s) => {
            n.next(s);
          },
          error: (s) => {
            n.error(s);
          }
        }) : n.next(u);
      }
    });
  }), n;
}
export {
  i as App,
  U as addComponentRecord,
  tn as addToRegistry,
  Kt as destroyApp,
  Wt as destroyComponents,
  Yt as initApp,
  te as initComponents,
  en as registerAsyncComponent,
  Xt as registerComponent,
  qt as removeComponentRecord,
  Bt as setGlobalInitCondition,
  Qt as updateApp,
  on as useBeforeDestroy,
  nn as useBeforeUpdate,
  un as useDestroyed,
  sn as useProps,
  Ft as useReady,
  fn as useRef,
  an as useStringifyProps,
  rn as useUpdated
};
