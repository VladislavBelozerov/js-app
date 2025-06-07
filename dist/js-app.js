import { BehaviorSubject as y, Subject as g } from "rxjs";
import { first as X } from "rxjs/operators";
let ee = 0;
function re(e = "") {
  return `${e}${++ee}`;
}
var te = typeof global == "object" && global && global.Object === Object && global, ne = typeof self == "object" && self && self.Object === Object && self, ue = te || ne || Function("return this")(), b = ue.Symbol, U = Object.prototype, oe = U.hasOwnProperty, se = U.toString, p = b ? b.toStringTag : void 0;
function ie(e) {
  var r = oe.call(e, p), t = e[p];
  try {
    e[p] = void 0;
    var n = !0;
  } catch {
  }
  var u = se.call(e);
  return n && (r ? e[p] = t : delete e[p]), u;
}
var fe = Object.prototype, ae = fe.toString;
function ce(e) {
  return ae.call(e);
}
var de = "[object Null]", le = "[object Undefined]", S = b ? b.toStringTag : void 0;
function be(e) {
  return e == null ? e === void 0 ? le : de : S && S in Object(e) ? ie(e) : ce(e);
}
function pe(e) {
  return e != null && typeof e == "object";
}
var xe = "[object Symbol]";
function ge(e) {
  return typeof e == "symbol" || pe(e) && be(e) == xe;
}
function me(e, r) {
  for (var t = -1, n = e == null ? 0 : e.length, u = Array(n); ++t < n; )
    u[t] = r(e[t], t, e);
  return u;
}
var ye = Array.isArray, C = b ? b.prototype : void 0, O = C ? C.toString : void 0;
function E(e) {
  if (typeof e == "string")
    return e;
  if (ye(e))
    return me(e, E) + "";
  if (ge(e))
    return O ? O.call(e) : "";
  var r = e + "";
  return r == "0" && 1 / e == -1 / 0 ? "-0" : r;
}
function m(e) {
  return e == null ? "" : E(e);
}
function $e(e, r, t) {
  var n = -1, u = e.length;
  r < 0 && (r = -r > u ? 0 : u + r), t = t > u ? u : t, t < 0 && (t += u), u = r > t ? 0 : t - r >>> 0, r >>>= 0;
  for (var o = Array(u); ++n < u; )
    o[n] = e[n + r];
  return o;
}
function Ae(e, r, t) {
  var n = e.length;
  return t = t === void 0 ? n : t, $e(e, r, t);
}
var Re = "\\ud800-\\udfff", he = "\\u0300-\\u036f", Se = "\\ufe20-\\ufe2f", Ce = "\\u20d0-\\u20ff", Oe = he + Se + Ce, je = "\\ufe0e\\ufe0f", ve = "\\u200d", Te = RegExp("[" + ve + Re + Oe + je + "]");
function M(e) {
  return Te.test(e);
}
function we(e) {
  return e.split("");
}
var L = "\\ud800-\\udfff", Ue = "\\u0300-\\u036f", Ee = "\\ufe20-\\ufe2f", Me = "\\u20d0-\\u20ff", Le = Ue + Ee + Me, Ie = "\\ufe0e\\ufe0f", ze = "[" + L + "]", $ = "[" + Le + "]", A = "\\ud83c[\\udffb-\\udfff]", De = "(?:" + $ + "|" + A + ")", I = "[^" + L + "]", z = "(?:\\ud83c[\\udde6-\\uddff]){2}", D = "[\\ud800-\\udbff][\\udc00-\\udfff]", ke = "\\u200d", k = De + "?", N = "[" + Ie + "]?", Ne = "(?:" + ke + "(?:" + [I, z, D].join("|") + ")" + N + k + ")*", Ze = N + k + Ne, Ve = "(?:" + [I + $ + "?", $, z, D, ze].join("|") + ")", We = RegExp(A + "(?=" + A + ")|" + Ve + Ze, "g");
function Pe(e) {
  return e.match(We) || [];
}
function He(e) {
  return M(e) ? Pe(e) : we(e);
}
function Je(e) {
  return function(r) {
    r = m(r);
    var t = M(r) ? He(r) : void 0, n = t ? t[0] : r.charAt(0), u = t ? Ae(t, 1).join("") : r.slice(1);
    return n[e]() + u;
  };
}
var Fe = Je("toUpperCase");
function Ge(e) {
  return Fe(m(e).toLowerCase());
}
function Be(e, r, t, n) {
  for (var u = -1, o = e == null ? 0 : e.length; ++u < o; )
    t = r(t, e[u], u, e);
  return t;
}
function _e(e) {
  return function(r) {
    return e == null ? void 0 : e[r];
  };
}
var qe = {
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
}, Ye = _e(qe), Ke = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Qe = "\\u0300-\\u036f", Xe = "\\ufe20-\\ufe2f", er = "\\u20d0-\\u20ff", rr = Qe + Xe + er, tr = "[" + rr + "]", nr = RegExp(tr, "g");
function ur(e) {
  return e = m(e), e && e.replace(Ke, Ye).replace(nr, "");
}
var or = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function sr(e) {
  return e.match(or) || [];
}
var ir = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function fr(e) {
  return ir.test(e);
}
var Z = "\\ud800-\\udfff", ar = "\\u0300-\\u036f", cr = "\\ufe20-\\ufe2f", dr = "\\u20d0-\\u20ff", lr = ar + cr + dr, V = "\\u2700-\\u27bf", W = "a-z\\xdf-\\xf6\\xf8-\\xff", br = "\\xac\\xb1\\xd7\\xf7", pr = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", xr = "\\u2000-\\u206f", gr = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", P = "A-Z\\xc0-\\xd6\\xd8-\\xde", mr = "\\ufe0e\\ufe0f", H = br + pr + xr + gr, J = "['’]", j = "[" + H + "]", yr = "[" + lr + "]", F = "\\d+", $r = "[" + V + "]", G = "[" + W + "]", B = "[^" + Z + H + F + V + W + P + "]", Ar = "\\ud83c[\\udffb-\\udfff]", Rr = "(?:" + yr + "|" + Ar + ")", hr = "[^" + Z + "]", _ = "(?:\\ud83c[\\udde6-\\uddff]){2}", q = "[\\ud800-\\udbff][\\udc00-\\udfff]", l = "[" + P + "]", Sr = "\\u200d", v = "(?:" + G + "|" + B + ")", Cr = "(?:" + l + "|" + B + ")", T = "(?:" + J + "(?:d|ll|m|re|s|t|ve))?", w = "(?:" + J + "(?:D|LL|M|RE|S|T|VE))?", Y = Rr + "?", K = "[" + mr + "]?", Or = "(?:" + Sr + "(?:" + [hr, _, q].join("|") + ")" + K + Y + ")*", jr = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", vr = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", Tr = K + Y + Or, wr = "(?:" + [$r, _, q].join("|") + ")" + Tr, Ur = RegExp([
  l + "?" + G + "+" + T + "(?=" + [j, l, "$"].join("|") + ")",
  Cr + "+" + w + "(?=" + [j, l + v, "$"].join("|") + ")",
  l + "?" + v + "+" + T,
  l + "+" + w,
  vr,
  jr,
  F,
  wr
].join("|"), "g");
function Er(e) {
  return e.match(Ur) || [];
}
function Mr(e, r, t) {
  return e = m(e), r = r, r === void 0 ? fr(e) ? Er(e) : sr(e) : e.match(r) || [];
}
var Lr = "['’]", Ir = RegExp(Lr, "g");
function Q(e) {
  return function(r) {
    return Be(Mr(ur(r).replace(Ir, "")), e, "");
  };
}
var zr = Q(function(e, r, t) {
  return r = r.toLowerCase(), e + (t ? Ge(r) : r);
}), c = Q(function(e, r, t) {
  return e + (t ? "-" : "") + r.toLowerCase();
});
const R = {
  value: null
};
function Jr(e) {
  R.value = e;
}
function Dr(e, r) {
  e.querySelectorAll(r.selector).forEach((t) => {
    var o;
    if (t.hasAttribute(`data-component-${c(r.name)}-id`) || R.value && !R.value(t, r) || r.initCondition && !r.initCondition(t, r))
      return;
    const n = ((o = r.component) == null ? void 0 : o.call(r, t, r.props ?? {})) ?? {}, u = re(`component-${r.name}-`);
    t.setAttribute("data-component", ""), t.setAttribute(`data-component-${c(r.name)}-id`, u), s.components.set(u, {
      id: u,
      selector: r.selector,
      name: r.name,
      ref: n
    });
  });
}
function kr(e) {
  const r = Array.from(s.registry.values()).filter(
    ({ selector: t }) => !!e.querySelector(t)
  );
  for (const t of r)
    Dr(e, t);
}
function Nr(e) {
  if (!s.isReady$.getValue()) {
    console.warn("App is not initialized yet.");
    return;
  }
  const r = Array.from(
    e.querySelectorAll("[data-component]")
  );
  for (const t of r) {
    const n = [], u = Object.keys(t.dataset);
    u.forEach((o) => {
      if (o.match(/^component(.+)Id$/)) {
        const f = t.dataset[o];
        f && n.push(f);
      }
    }), n.forEach((o) => {
      var f, x;
      const i = s.components.get(o);
      i && ((x = (f = i.ref).destroy) == null || x.call(f), s.components.delete(o));
    }), u.forEach((o) => {
      o.startsWith("component") && o.endsWith("Id") && delete t.dataset[o];
    }), t.removeAttribute("data-component");
  }
}
function Zr() {
  const e = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), t = new y(!1), n = new y(null), u = new g(), o = new g(), i = new g(), f = new g();
  return {
    registry: e,
    components: r,
    isReady$: t,
    root$: n,
    updated$: u,
    beforeUpdate$: o,
    beforeDestroy$: i,
    destroyed$: f
  };
}
const s = Zr();
function Fr(e) {
  if (s.root$.next(e), s.isReady$.getValue()) {
    console.warn("App is already initialized.");
    return;
  }
  kr(e), s.isReady$.next(!0);
}
function Gr() {
  if (!s.isReady$.getValue() || !s.root$.getValue()) {
    console.warn("App is not loaded yet.");
    return;
  }
  s.beforeDestroy$.next(), Nr(s.root$.getValue()), s.components.clear(), s.registry.clear(), s.isReady$.next(!1), s.root$.next(null), s.destroyed$.next();
}
function Br(e, r, t, n) {
  return {
    component: t,
    props: n ?? {},
    selector: r,
    name: e
  };
}
function _r(e) {
  if (Object.isFrozen(s.registry)) {
    console.warn("Cannot add to read-only registry.");
    return;
  }
  (Array.isArray(e) ? e : [e]).forEach((t) => {
    s.registry.set(t.name + ":" + t.selector, t);
  });
}
function Vr(e) {
  if (s.isReady$.getValue()) {
    e();
    return;
  }
  s.isReady$.pipe(X((r) => r)).subscribe(() => {
    e();
  });
}
function qr(e) {
  const { unsubscribe: r } = s.beforeUpdate$.subscribe(() => {
    e();
  });
  return r;
}
function Yr(e) {
  const { unsubscribe: r } = s.updated$.subscribe(() => {
    e();
  });
  return r;
}
function Kr(e) {
  const { unsubscribe: r } = s.beforeDestroy$.subscribe(() => {
    e();
  });
  return r;
}
function Qr(e) {
  const { unsubscribe: r } = s.destroyed$.subscribe(() => {
    e();
  });
  return r;
}
function Xr(e, r, t = {}) {
  const n = c(r), u = r.split("-").length, o = Object.keys(e.dataset).reduce((i, f) => {
    const x = c(f).split("-").slice(0, u).join("-"), a = e.dataset[f];
    if (typeof a > "u" || x !== n) return i;
    const d = zr(
      c(f).split("-").slice(u).join("-")
    );
    if (!d) return i;
    try {
      i[d] = JSON.parse(a);
    } catch {
      if (a === "" || a === "true")
        i[d] = !0;
      else if (a === "false")
        i[d] = !1;
      else {
        const h = parseFloat(a);
        h + "" === a ? i[d] = h : i[d] = a;
      }
    }
    return i;
  }, {});
  return { ...t, ...o };
}
function et(e, r) {
  const t = c(e), n = {};
  return Object.entries(r).forEach(([u, o]) => {
    const i = `data-${t}-${c(u)}`;
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
        } catch (f) {
          console.warn(`Failed to stringify property ${u}:`, f);
        }
  }), n;
}
function rt(e, r) {
  const t = new y(null);
  return Vr(() => {
    setTimeout(() => {
      var u;
      const n = e.getAttribute(`data-component-${c(r)}-id`);
      n && t.next((u = s.components.get(n)) == null ? void 0 : u.ref);
    });
  }), t;
}
export {
  s as App,
  _r as addToRegistry,
  Gr as destroyApp,
  Nr as destroyComponents,
  Fr as initApp,
  kr as initComponents,
  Br as registerComponent,
  Jr as setGlobalInitCondition,
  Kr as useBeforeDestroy,
  qr as useBeforeUpdate,
  Qr as useDestroyed,
  Xr as useProps,
  Vr as useReady,
  rt as useRef,
  et as useStringifyProps,
  Yr as useUpdated
};
