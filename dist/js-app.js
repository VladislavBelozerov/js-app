import { BehaviorSubject as y, Subject as g } from "rxjs";
import { first as ee } from "rxjs/operators";
let te = 0;
function re(e = "") {
  return `${e}${++te}`;
}
var ne = typeof global == "object" && global && global.Object === Object && global, ue = typeof self == "object" && self && self.Object === Object && self, oe = ne || ue || Function("return this")(), b = oe.Symbol, U = Object.prototype, se = U.hasOwnProperty, ie = U.toString, p = b ? b.toStringTag : void 0;
function ae(e) {
  var t = se.call(e, p), r = e[p];
  try {
    e[p] = void 0;
    var n = !0;
  } catch {
  }
  var u = ie.call(e);
  return n && (t ? e[p] = r : delete e[p]), u;
}
var fe = Object.prototype, ce = fe.toString;
function de(e) {
  return ce.call(e);
}
var le = "[object Null]", be = "[object Undefined]", S = b ? b.toStringTag : void 0;
function pe(e) {
  return e == null ? e === void 0 ? be : le : S && S in Object(e) ? ae(e) : de(e);
}
function xe(e) {
  return e != null && typeof e == "object";
}
var ge = "[object Symbol]";
function me(e) {
  return typeof e == "symbol" || xe(e) && pe(e) == ge;
}
function ye(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, u = Array(n); ++r < n; )
    u[r] = t(e[r], r, e);
  return u;
}
var $e = Array.isArray, C = b ? b.prototype : void 0, O = C ? C.toString : void 0;
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
function Ae(e, t, r) {
  var n = -1, u = e.length;
  t < 0 && (t = -t > u ? 0 : u + t), r = r > u ? u : r, r < 0 && (r += u), u = t > r ? 0 : r - t >>> 0, t >>>= 0;
  for (var o = Array(u); ++n < u; )
    o[n] = e[n + t];
  return o;
}
function Re(e, t, r) {
  var n = e.length;
  return r = r === void 0 ? n : r, Ae(e, t, r);
}
var he = "\\ud800-\\udfff", Se = "\\u0300-\\u036f", Ce = "\\ufe20-\\ufe2f", Oe = "\\u20d0-\\u20ff", je = Se + Ce + Oe, ve = "\\ufe0e\\ufe0f", Te = "\\u200d", we = RegExp("[" + Te + he + je + ve + "]");
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
    var r = M(t) ? Je(t) : void 0, n = r ? r[0] : t.charAt(0), u = r ? Re(r, 1).join("") : t.slice(1);
    return n[e]() + u;
  };
}
var Ge = Fe("toUpperCase");
function Be(e) {
  return Ge(m(e).toLowerCase());
}
function _e(e, t, r, n) {
  for (var u = -1, o = e == null ? 0 : e.length; ++u < o; )
    r = t(r, e[u], u, e);
  return r;
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
}, Ke = qe(Ye), Qe = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Xe = "\\u0300-\\u036f", et = "\\ufe20-\\ufe2f", tt = "\\u20d0-\\u20ff", rt = Xe + et + tt, nt = "[" + rt + "]", ut = RegExp(nt, "g");
function ot(e) {
  return e = m(e), e && e.replace(Qe, Ke).replace(ut, "");
}
var st = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function it(e) {
  return e.match(st) || [];
}
var at = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function ft(e) {
  return at.test(e);
}
var N = "\\ud800-\\udfff", ct = "\\u0300-\\u036f", dt = "\\ufe20-\\ufe2f", lt = "\\u20d0-\\u20ff", bt = ct + dt + lt, Z = "\\u2700-\\u27bf", W = "a-z\\xdf-\\xf6\\xf8-\\xff", pt = "\\xac\\xb1\\xd7\\xf7", xt = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", gt = "\\u2000-\\u206f", mt = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", P = "A-Z\\xc0-\\xd6\\xd8-\\xde", yt = "\\ufe0e\\ufe0f", H = pt + xt + gt + mt, J = "['’]", j = "[" + H + "]", $t = "[" + bt + "]", F = "\\d+", At = "[" + Z + "]", G = "[" + W + "]", B = "[^" + N + H + F + Z + W + P + "]", Rt = "\\ud83c[\\udffb-\\udfff]", ht = "(?:" + $t + "|" + Rt + ")", St = "[^" + N + "]", _ = "(?:\\ud83c[\\udde6-\\uddff]){2}", q = "[\\ud800-\\udbff][\\udc00-\\udfff]", l = "[" + P + "]", Ct = "\\u200d", v = "(?:" + G + "|" + B + ")", Ot = "(?:" + l + "|" + B + ")", T = "(?:" + J + "(?:d|ll|m|re|s|t|ve))?", w = "(?:" + J + "(?:D|LL|M|RE|S|T|VE))?", Y = ht + "?", K = "[" + yt + "]?", jt = "(?:" + Ct + "(?:" + [St, _, q].join("|") + ")" + K + Y + ")*", vt = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Tt = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", wt = K + Y + jt, Ut = "(?:" + [At, _, q].join("|") + ")" + wt, Et = RegExp([
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
function Lt(e, t, r) {
  return e = m(e), t = t, t === void 0 ? ft(e) ? Mt(e) : it(e) : e.match(t) || [];
}
var It = "['’]", zt = RegExp(It, "g");
function Q(e) {
  return function(t) {
    return _e(Lt(ot(t).replace(zt, "")), e, "");
  };
}
var Dt = Q(function(e, t, r) {
  return t = t.toLowerCase(), e + (r ? Be(t) : t);
}), c = Q(function(e, t, r) {
  return e + (r ? "-" : "") + t.toLowerCase();
});
const R = {
  value: null
};
function Jt(e) {
  R.value = e;
}
function Vt(e, t) {
  e.querySelectorAll(t.selector).forEach((r) => {
    var o;
    if (r.hasAttribute(`data-component-${c(t.name)}-id`) || R.value && !R.value(r, t) || t.initCondition && !t.initCondition(r, t))
      return;
    const n = ((o = t.component) == null ? void 0 : o.call(t, r, t.props ?? {})) ?? {}, u = re(`component-${t.name}-`);
    r.setAttribute("data-component", ""), r.setAttribute(`data-component-${c(t.name)}-id`, u), s.components.set(u, {
      id: u,
      selector: t.selector,
      name: t.name,
      ref: n
    });
  });
}
function X(e) {
  const t = Array.from(s.registry.values()).filter(
    ({ selector: r }) => !!e.querySelector(r)
  );
  for (const r of t)
    Vt(e, r);
}
function kt(e) {
  if (!s.isReady$.getValue()) {
    console.warn("App is not initialized yet.");
    return;
  }
  const t = Array.from(
    e.querySelectorAll("[data-component]")
  );
  for (const r of t) {
    const n = [], u = Object.keys(r.dataset);
    u.forEach((o) => {
      if (o.match(/^component(.+)Id$/)) {
        const a = r.dataset[o];
        a && n.push(a);
      }
    }), n.forEach((o) => {
      var a, x;
      const i = s.components.get(o);
      i && ((x = (a = i.ref).destroy) == null || x.call(a), s.components.delete(o));
    }), u.forEach((o) => {
      o.startsWith("component") && o.endsWith("Id") && delete r.dataset[o];
    }), r.removeAttribute("data-component");
  }
}
function Nt() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map(), r = new y(!1), n = new y(null), u = new g(), o = new g(), i = new g(), a = new g();
  return {
    registry: e,
    components: t,
    isReady$: r,
    root$: n,
    updated$: u,
    beforeUpdate$: o,
    beforeDestroy$: i,
    destroyed$: a
  };
}
const s = Nt();
function Ft(e) {
  if (s.root$.next(e), s.isReady$.getValue()) {
    console.warn("App is already initialized.");
    return;
  }
  X(e), s.isReady$.next(!0);
}
function Gt() {
  if (!s.isReady$.getValue() || !s.root$.getValue()) {
    console.warn("App is not loaded yet.");
    return;
  }
  s.beforeDestroy$.next(), kt(s.root$.getValue()), s.components.clear(), s.registry.clear(), s.isReady$.next(!1), s.root$.next(null), s.destroyed$.next();
}
function Bt() {
  if (!s.isReady$.getValue() || !s.root$.getValue()) {
    console.warn("App is not loaded yet.");
    return;
  }
  s.beforeUpdate$.next(), X(s.root$.getValue()), s.updated$.next();
}
function _t(e, t, r, n) {
  return {
    component: r,
    props: n ?? {},
    selector: t,
    name: e
  };
}
function qt(e) {
  if (Object.isFrozen(s.registry)) {
    console.warn("Cannot add to read-only registry.");
    return;
  }
  (Array.isArray(e) ? e : [e]).forEach((r) => {
    s.registry.set(r.name + ":" + r.selector, r);
  });
}
function Zt(e) {
  if (s.isReady$.getValue()) {
    e();
    return;
  }
  s.isReady$.pipe(ee((t) => t)).subscribe(() => {
    e();
  });
}
function Yt(e) {
  const { unsubscribe: t } = s.beforeUpdate$.subscribe(() => {
    e();
  });
  return t;
}
function Kt(e) {
  const { unsubscribe: t } = s.updated$.subscribe(() => {
    e();
  });
  return t;
}
function Qt(e) {
  const { unsubscribe: t } = s.beforeDestroy$.subscribe(() => {
    e();
  });
  return t;
}
function Xt(e) {
  const { unsubscribe: t } = s.destroyed$.subscribe(() => {
    e();
  });
  return t;
}
function er(e, t, r = {}) {
  const n = c(t), u = t.split("-").length, o = Object.keys(e.dataset).reduce((i, a) => {
    const x = c(a).split("-").slice(0, u).join("-"), f = e.dataset[a];
    if (typeof f > "u" || x !== n) return i;
    const d = Dt(
      c(a).split("-").slice(u).join("-")
    );
    if (!d) return i;
    try {
      i[d] = JSON.parse(f);
    } catch {
      if (f === "" || f === "true")
        i[d] = !0;
      else if (f === "false")
        i[d] = !1;
      else {
        const h = parseFloat(f);
        h + "" === f ? i[d] = h : i[d] = f;
      }
    }
    return i;
  }, {});
  return { ...r, ...o };
}
function tr(e, t) {
  const r = c(e), n = {};
  return Object.entries(t).forEach(([u, o]) => {
    const i = `data-${r}-${c(u)}`;
    if (o !== void 0)
      if (o === null)
        n[i] = "null";
      else if (o === !0)
        n[i] = "";
      else if (o === !1)
        n[i] = "false";
      else if (typeof o == "number")
        n[i] = o.toString();
      else if (typeof o == "string")
        n[i] = o;
      else if (typeof o == "symbol")
        n[i] = o.toString();
      else if (typeof o == "function")
        n[i] = "function";
      else
        try {
          n[i] = JSON.stringify(o);
        } catch (a) {
          console.warn(`Failed to stringify property ${u}:`, a);
        }
  }), n;
}
function rr(e, t) {
  const r = new y(null);
  return Zt(() => {
    setTimeout(() => {
      var u;
      const n = e.getAttribute(`data-component-${c(t)}-id`);
      n && r.next((u = s.components.get(n)) == null ? void 0 : u.ref);
    });
  }), r;
}
export {
  s as App,
  qt as addToRegistry,
  Gt as destroyApp,
  kt as destroyComponents,
  Ft as initApp,
  X as initComponents,
  _t as registerComponent,
  Jt as setGlobalInitCondition,
  Bt as updateApp,
  Qt as useBeforeDestroy,
  Yt as useBeforeUpdate,
  Xt as useDestroyed,
  er as useProps,
  Zt as useReady,
  rr as useRef,
  tr as useStringifyProps,
  Kt as useUpdated
};
