var Xr = Object.defineProperty;
var Vr = (e, r, s) => r in e ? Xr(e, r, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[r] = s;
var U = (e, r, s) => Vr(e, typeof r != "symbol" ? r + "" : r, s);
import { OTLPMetricExporter as Hr } from "@opentelemetry/exporter-metrics-otlp-http";
import { OTLPTraceExporter as Br } from "@opentelemetry/exporter-trace-otlp-http";
import { AWSXRayIdGenerator as Wr } from "@opentelemetry/id-generator-aws-xray";
import { AWSXRayPropagator as zr } from "@opentelemetry/propagator-aws-xray";
import { Resource as At } from "@opentelemetry/resources";
import { AggregationTemporality as Yr, PeriodicExportingMetricReader as Kr, MeterProvider as Zr, View as Jr, ExponentialHistogramAggregation as Qr, InstrumentType as en } from "@opentelemetry/sdk-metrics";
import { NodeSDK as tn } from "@opentelemetry/sdk-node";
import { BatchSpanProcessor as rn } from "@opentelemetry/sdk-trace-base";
import { propagation as W, metrics as H, context as te, trace as ne, SpanStatusCode as z } from "@opentelemetry/api";
import { ATTR_SERVICE_VERSION as nn, ATTR_SERVICE_NAME as sn } from "@opentelemetry/semantic-conventions";
import * as he from "vscode";
import { machineIdSync as on } from "node-machine-id";
import { l as Et, a as re, i as St } from "./errors-ExctlPQy.js";
import "path";
import * as le from "os";
import "fs";
class an {
  constructor(r) {
    U(this, "keys");
    this.keys = r.keys;
  }
  /**
   * Called when a span is started
   * @param span The span that was started
   * @param parentContext The parent context, if any
   */
  onStart(r, s) {
    const n = W.getBaggage(s);
    n && this.keys.forEach((i) => {
      const u = n.getEntry(i);
      u && r.setAttribute(i, u.value);
    });
  }
  /**
   * Called when a span ends
   * @param _span The span that ended
   */
  onEnd(r) {
  }
  /**
   * Shuts down the processor
   */
  shutdown() {
    return Promise.resolve();
  }
  /**
   * Forces the processor to flush any pending spans
   */
  forceFlush() {
    return Promise.resolve();
  }
}
var ie = /* @__PURE__ */ ((e) => (e.Onboarding = "kiro.onboarding", e.Auth = "kiro.auth", e.Session = "kiro.session", e.Feature = "kiro.feature", e.User = "kiro.user", e.Tool = "kiro.tool", e.Operation = "kiro.operation", e.Periodic = "kiro.periodic", e))(ie || {}), ae = { exports: {} }, be, Ot;
function de() {
  if (Ot) return be;
  Ot = 1;
  const e = "2.0.0", r = 256, s = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, n = 16, i = r - 6;
  return be = {
    MAX_LENGTH: r,
    MAX_SAFE_COMPONENT_LENGTH: n,
    MAX_SAFE_BUILD_LENGTH: i,
    MAX_SAFE_INTEGER: s,
    RELEASE_TYPES: [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ],
    SEMVER_SPEC_VERSION: e,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  }, be;
}
var Te, Lt;
function pe() {
  return Lt || (Lt = 1, Te = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...r) => console.error("SEMVER", ...r) : () => {
  }), Te;
}
var Ct;
function oe() {
  return Ct || (Ct = 1, function(e, r) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: s,
      MAX_SAFE_BUILD_LENGTH: n,
      MAX_LENGTH: i
    } = de(), u = pe();
    r = e.exports = {};
    const a = r.re = [], f = r.safeRe = [], c = r.src = [], o = r.safeSrc = [], t = r.t = {};
    let l = 0;
    const h = "[a-zA-Z0-9-]", p = [
      ["\\s", 1],
      ["\\d", i],
      [h, n]
    ], I = (b) => {
      for (const [O, w] of p)
        b = b.split(`${O}*`).join(`${O}{0,${w}}`).split(`${O}+`).join(`${O}{1,${w}}`);
      return b;
    }, d = (b, O, w) => {
      const L = I(O), y = l++;
      u(b, y, O), t[b] = y, c[y] = O, o[y] = L, a[y] = new RegExp(O, w ? "g" : void 0), f[y] = new RegExp(L, w ? "g" : void 0);
    };
    d("NUMERICIDENTIFIER", "0|[1-9]\\d*"), d("NUMERICIDENTIFIERLOOSE", "\\d+"), d("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${h}*`), d("MAINVERSION", `(${c[t.NUMERICIDENTIFIER]})\\.(${c[t.NUMERICIDENTIFIER]})\\.(${c[t.NUMERICIDENTIFIER]})`), d("MAINVERSIONLOOSE", `(${c[t.NUMERICIDENTIFIERLOOSE]})\\.(${c[t.NUMERICIDENTIFIERLOOSE]})\\.(${c[t.NUMERICIDENTIFIERLOOSE]})`), d("PRERELEASEIDENTIFIER", `(?:${c[t.NONNUMERICIDENTIFIER]}|${c[t.NUMERICIDENTIFIER]})`), d("PRERELEASEIDENTIFIERLOOSE", `(?:${c[t.NONNUMERICIDENTIFIER]}|${c[t.NUMERICIDENTIFIERLOOSE]})`), d("PRERELEASE", `(?:-(${c[t.PRERELEASEIDENTIFIER]}(?:\\.${c[t.PRERELEASEIDENTIFIER]})*))`), d("PRERELEASELOOSE", `(?:-?(${c[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[t.PRERELEASEIDENTIFIERLOOSE]})*))`), d("BUILDIDENTIFIER", `${h}+`), d("BUILD", `(?:\\+(${c[t.BUILDIDENTIFIER]}(?:\\.${c[t.BUILDIDENTIFIER]})*))`), d("FULLPLAIN", `v?${c[t.MAINVERSION]}${c[t.PRERELEASE]}?${c[t.BUILD]}?`), d("FULL", `^${c[t.FULLPLAIN]}$`), d("LOOSEPLAIN", `[v=\\s]*${c[t.MAINVERSIONLOOSE]}${c[t.PRERELEASELOOSE]}?${c[t.BUILD]}?`), d("LOOSE", `^${c[t.LOOSEPLAIN]}$`), d("GTLT", "((?:<|>)?=?)"), d("XRANGEIDENTIFIERLOOSE", `${c[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), d("XRANGEIDENTIFIER", `${c[t.NUMERICIDENTIFIER]}|x|X|\\*`), d("XRANGEPLAIN", `[v=\\s]*(${c[t.XRANGEIDENTIFIER]})(?:\\.(${c[t.XRANGEIDENTIFIER]})(?:\\.(${c[t.XRANGEIDENTIFIER]})(?:${c[t.PRERELEASE]})?${c[t.BUILD]}?)?)?`), d("XRANGEPLAINLOOSE", `[v=\\s]*(${c[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[t.XRANGEIDENTIFIERLOOSE]})(?:${c[t.PRERELEASELOOSE]})?${c[t.BUILD]}?)?)?`), d("XRANGE", `^${c[t.GTLT]}\\s*${c[t.XRANGEPLAIN]}$`), d("XRANGELOOSE", `^${c[t.GTLT]}\\s*${c[t.XRANGEPLAINLOOSE]}$`), d("COERCEPLAIN", `(^|[^\\d])(\\d{1,${s}})(?:\\.(\\d{1,${s}}))?(?:\\.(\\d{1,${s}}))?`), d("COERCE", `${c[t.COERCEPLAIN]}(?:$|[^\\d])`), d("COERCEFULL", c[t.COERCEPLAIN] + `(?:${c[t.PRERELEASE]})?(?:${c[t.BUILD]})?(?:$|[^\\d])`), d("COERCERTL", c[t.COERCE], !0), d("COERCERTLFULL", c[t.COERCEFULL], !0), d("LONETILDE", "(?:~>?)"), d("TILDETRIM", `(\\s*)${c[t.LONETILDE]}\\s+`, !0), r.tildeTrimReplace = "$1~", d("TILDE", `^${c[t.LONETILDE]}${c[t.XRANGEPLAIN]}$`), d("TILDELOOSE", `^${c[t.LONETILDE]}${c[t.XRANGEPLAINLOOSE]}$`), d("LONECARET", "(?:\\^)"), d("CARETTRIM", `(\\s*)${c[t.LONECARET]}\\s+`, !0), r.caretTrimReplace = "$1^", d("CARET", `^${c[t.LONECARET]}${c[t.XRANGEPLAIN]}$`), d("CARETLOOSE", `^${c[t.LONECARET]}${c[t.XRANGEPLAINLOOSE]}$`), d("COMPARATORLOOSE", `^${c[t.GTLT]}\\s*(${c[t.LOOSEPLAIN]})$|^$`), d("COMPARATOR", `^${c[t.GTLT]}\\s*(${c[t.FULLPLAIN]})$|^$`), d("COMPARATORTRIM", `(\\s*)${c[t.GTLT]}\\s*(${c[t.LOOSEPLAIN]}|${c[t.XRANGEPLAIN]})`, !0), r.comparatorTrimReplace = "$1$2$3", d("HYPHENRANGE", `^\\s*(${c[t.XRANGEPLAIN]})\\s+-\\s+(${c[t.XRANGEPLAIN]})\\s*$`), d("HYPHENRANGELOOSE", `^\\s*(${c[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[t.XRANGEPLAINLOOSE]})\\s*$`), d("STAR", "(<|>)?=?\\s*\\*"), d("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), d("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }(ae, ae.exports)), ae.exports;
}
var Ae, wt;
function mt() {
  if (wt) return Ae;
  wt = 1;
  const e = Object.freeze({ loose: !0 }), r = Object.freeze({});
  return Ae = (n) => n ? typeof n != "object" ? e : n : r, Ae;
}
var Se, Nt;
function Ir() {
  if (Nt) return Se;
  Nt = 1;
  const e = /^[0-9]+$/, r = (n, i) => {
    const u = e.test(n), a = e.test(i);
    return u && a && (n = +n, i = +i), n === i ? 0 : u && !a ? -1 : a && !u ? 1 : n < i ? -1 : 1;
  };
  return Se = {
    compareIdentifiers: r,
    rcompareIdentifiers: (n, i) => r(i, n)
  }, Se;
}
var Oe, Pt;
function D() {
  if (Pt) return Oe;
  Pt = 1;
  const e = pe(), { MAX_LENGTH: r, MAX_SAFE_INTEGER: s } = de(), { safeRe: n, t: i } = oe(), u = mt(), { compareIdentifiers: a } = Ir();
  class f {
    constructor(o, t) {
      if (t = u(t), o instanceof f) {
        if (o.loose === !!t.loose && o.includePrerelease === !!t.includePrerelease)
          return o;
        o = o.version;
      } else if (typeof o != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof o}".`);
      if (o.length > r)
        throw new TypeError(
          `version is longer than ${r} characters`
        );
      e("SemVer", o, t), this.options = t, this.loose = !!t.loose, this.includePrerelease = !!t.includePrerelease;
      const l = o.trim().match(t.loose ? n[i.LOOSE] : n[i.FULL]);
      if (!l)
        throw new TypeError(`Invalid Version: ${o}`);
      if (this.raw = o, this.major = +l[1], this.minor = +l[2], this.patch = +l[3], this.major > s || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > s || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > s || this.patch < 0)
        throw new TypeError("Invalid patch version");
      l[4] ? this.prerelease = l[4].split(".").map((h) => {
        if (/^[0-9]+$/.test(h)) {
          const p = +h;
          if (p >= 0 && p < s)
            return p;
        }
        return h;
      }) : this.prerelease = [], this.build = l[5] ? l[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(o) {
      if (e("SemVer.compare", this.version, this.options, o), !(o instanceof f)) {
        if (typeof o == "string" && o === this.version)
          return 0;
        o = new f(o, this.options);
      }
      return o.version === this.version ? 0 : this.compareMain(o) || this.comparePre(o);
    }
    compareMain(o) {
      return o instanceof f || (o = new f(o, this.options)), a(this.major, o.major) || a(this.minor, o.minor) || a(this.patch, o.patch);
    }
    comparePre(o) {
      if (o instanceof f || (o = new f(o, this.options)), this.prerelease.length && !o.prerelease.length)
        return -1;
      if (!this.prerelease.length && o.prerelease.length)
        return 1;
      if (!this.prerelease.length && !o.prerelease.length)
        return 0;
      let t = 0;
      do {
        const l = this.prerelease[t], h = o.prerelease[t];
        if (e("prerelease compare", t, l, h), l === void 0 && h === void 0)
          return 0;
        if (h === void 0)
          return 1;
        if (l === void 0)
          return -1;
        if (l === h)
          continue;
        return a(l, h);
      } while (++t);
    }
    compareBuild(o) {
      o instanceof f || (o = new f(o, this.options));
      let t = 0;
      do {
        const l = this.build[t], h = o.build[t];
        if (e("build compare", t, l, h), l === void 0 && h === void 0)
          return 0;
        if (h === void 0)
          return 1;
        if (l === void 0)
          return -1;
        if (l === h)
          continue;
        return a(l, h);
      } while (++t);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(o, t, l) {
      if (o.startsWith("pre")) {
        if (!t && l === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (t) {
          const h = `-${t}`.match(this.options.loose ? n[i.PRERELEASELOOSE] : n[i.PRERELEASE]);
          if (!h || h[1] !== t)
            throw new Error(`invalid identifier: ${t}`);
        }
      }
      switch (o) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", t, l);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", t, l);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", t, l), this.inc("pre", t, l);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", t, l), this.inc("pre", t, l);
          break;
        case "release":
          if (this.prerelease.length === 0)
            throw new Error(`version ${this.raw} is not a prerelease`);
          this.prerelease.length = 0;
          break;
        case "major":
          (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
          break;
        case "minor":
          (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
          break;
        case "patch":
          this.prerelease.length === 0 && this.patch++, this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
        case "pre": {
          const h = Number(l) ? 1 : 0;
          if (this.prerelease.length === 0)
            this.prerelease = [h];
          else {
            let p = this.prerelease.length;
            for (; --p >= 0; )
              typeof this.prerelease[p] == "number" && (this.prerelease[p]++, p = -2);
            if (p === -1) {
              if (t === this.prerelease.join(".") && l === !1)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(h);
            }
          }
          if (t) {
            let p = [t, h];
            l === !1 && (p = [t]), a(this.prerelease[0], t) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = p) : this.prerelease = p;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${o}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return Oe = f, Oe;
}
var Le, yt;
function J() {
  if (yt) return Le;
  yt = 1;
  const e = D();
  return Le = (s, n, i = !1) => {
    if (s instanceof e)
      return s;
    try {
      return new e(s, n);
    } catch (u) {
      if (!i)
        return null;
      throw u;
    }
  }, Le;
}
var Ce, _t;
function cn() {
  if (_t) return Ce;
  _t = 1;
  const e = J();
  return Ce = (s, n) => {
    const i = e(s, n);
    return i ? i.version : null;
  }, Ce;
}
var we, qt;
function un() {
  if (qt) return we;
  qt = 1;
  const e = J();
  return we = (s, n) => {
    const i = e(s.trim().replace(/^[=v]+/, ""), n);
    return i ? i.version : null;
  }, we;
}
var Ne, kt;
function ln() {
  if (kt) return Ne;
  kt = 1;
  const e = D();
  return Ne = (s, n, i, u, a) => {
    typeof i == "string" && (a = u, u = i, i = void 0);
    try {
      return new e(
        s instanceof e ? s.version : s,
        i
      ).inc(n, u, a).version;
    } catch {
      return null;
    }
  }, Ne;
}
var Pe, Ft;
function fn() {
  if (Ft) return Pe;
  Ft = 1;
  const e = J();
  return Pe = (s, n) => {
    const i = e(s, null, !0), u = e(n, null, !0), a = i.compare(u);
    if (a === 0)
      return null;
    const f = a > 0, c = f ? i : u, o = f ? u : i, t = !!c.prerelease.length;
    if (!!o.prerelease.length && !t) {
      if (!o.patch && !o.minor)
        return "major";
      if (o.compareMain(c) === 0)
        return o.minor && !o.patch ? "minor" : "patch";
    }
    const h = t ? "pre" : "";
    return i.major !== u.major ? h + "major" : i.minor !== u.minor ? h + "minor" : i.patch !== u.patch ? h + "patch" : "prerelease";
  }, Pe;
}
var ye, Dt;
function hn() {
  if (Dt) return ye;
  Dt = 1;
  const e = D();
  return ye = (s, n) => new e(s, n).major, ye;
}
var _e, Mt;
function dn() {
  if (Mt) return _e;
  Mt = 1;
  const e = D();
  return _e = (s, n) => new e(s, n).minor, _e;
}
var qe, Gt;
function pn() {
  if (Gt) return qe;
  Gt = 1;
  const e = D();
  return qe = (s, n) => new e(s, n).patch, qe;
}
var ke, xt;
function En() {
  if (xt) return ke;
  xt = 1;
  const e = J();
  return ke = (s, n) => {
    const i = e(s, n);
    return i && i.prerelease.length ? i.prerelease : null;
  }, ke;
}
var Fe, jt;
function x() {
  if (jt) return Fe;
  jt = 1;
  const e = D();
  return Fe = (s, n, i) => new e(s, i).compare(new e(n, i)), Fe;
}
var De, Ut;
function mn() {
  if (Ut) return De;
  Ut = 1;
  const e = x();
  return De = (s, n, i) => e(n, s, i), De;
}
var Me, Xt;
function Rn() {
  if (Xt) return Me;
  Xt = 1;
  const e = x();
  return Me = (s, n) => e(s, n, !0), Me;
}
var Ge, Vt;
function Rt() {
  if (Vt) return Ge;
  Vt = 1;
  const e = D();
  return Ge = (s, n, i) => {
    const u = new e(s, i), a = new e(n, i);
    return u.compare(a) || u.compareBuild(a);
  }, Ge;
}
var xe, Ht;
function gn() {
  if (Ht) return xe;
  Ht = 1;
  const e = Rt();
  return xe = (s, n) => s.sort((i, u) => e(i, u, n)), xe;
}
var je, Bt;
function In() {
  if (Bt) return je;
  Bt = 1;
  const e = Rt();
  return je = (s, n) => s.sort((i, u) => e(u, i, n)), je;
}
var Ue, Wt;
function Ee() {
  if (Wt) return Ue;
  Wt = 1;
  const e = x();
  return Ue = (s, n, i) => e(s, n, i) > 0, Ue;
}
var Xe, zt;
function gt() {
  if (zt) return Xe;
  zt = 1;
  const e = x();
  return Xe = (s, n, i) => e(s, n, i) < 0, Xe;
}
var Ve, Yt;
function $r() {
  if (Yt) return Ve;
  Yt = 1;
  const e = x();
  return Ve = (s, n, i) => e(s, n, i) === 0, Ve;
}
var He, Kt;
function vr() {
  if (Kt) return He;
  Kt = 1;
  const e = x();
  return He = (s, n, i) => e(s, n, i) !== 0, He;
}
var Be, Zt;
function It() {
  if (Zt) return Be;
  Zt = 1;
  const e = x();
  return Be = (s, n, i) => e(s, n, i) >= 0, Be;
}
var We, Jt;
function $t() {
  if (Jt) return We;
  Jt = 1;
  const e = x();
  return We = (s, n, i) => e(s, n, i) <= 0, We;
}
var ze, Qt;
function br() {
  if (Qt) return ze;
  Qt = 1;
  const e = $r(), r = vr(), s = Ee(), n = It(), i = gt(), u = $t();
  return ze = (f, c, o, t) => {
    switch (c) {
      case "===":
        return typeof f == "object" && (f = f.version), typeof o == "object" && (o = o.version), f === o;
      case "!==":
        return typeof f == "object" && (f = f.version), typeof o == "object" && (o = o.version), f !== o;
      case "":
      case "=":
      case "==":
        return e(f, o, t);
      case "!=":
        return r(f, o, t);
      case ">":
        return s(f, o, t);
      case ">=":
        return n(f, o, t);
      case "<":
        return i(f, o, t);
      case "<=":
        return u(f, o, t);
      default:
        throw new TypeError(`Invalid operator: ${c}`);
    }
  }, ze;
}
var Ye, er;
function $n() {
  if (er) return Ye;
  er = 1;
  const e = D(), r = J(), { safeRe: s, t: n } = oe();
  return Ye = (u, a) => {
    if (u instanceof e)
      return u;
    if (typeof u == "number" && (u = String(u)), typeof u != "string")
      return null;
    a = a || {};
    let f = null;
    if (!a.rtl)
      f = u.match(a.includePrerelease ? s[n.COERCEFULL] : s[n.COERCE]);
    else {
      const p = a.includePrerelease ? s[n.COERCERTLFULL] : s[n.COERCERTL];
      let I;
      for (; (I = p.exec(u)) && (!f || f.index + f[0].length !== u.length); )
        (!f || I.index + I[0].length !== f.index + f[0].length) && (f = I), p.lastIndex = I.index + I[1].length + I[2].length;
      p.lastIndex = -1;
    }
    if (f === null)
      return null;
    const c = f[2], o = f[3] || "0", t = f[4] || "0", l = a.includePrerelease && f[5] ? `-${f[5]}` : "", h = a.includePrerelease && f[6] ? `+${f[6]}` : "";
    return r(`${c}.${o}.${t}${l}${h}`, a);
  }, Ye;
}
var Ke, tr;
function vn() {
  if (tr) return Ke;
  tr = 1;
  class e {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(s) {
      const n = this.map.get(s);
      if (n !== void 0)
        return this.map.delete(s), this.map.set(s, n), n;
    }
    delete(s) {
      return this.map.delete(s);
    }
    set(s, n) {
      if (!this.delete(s) && n !== void 0) {
        if (this.map.size >= this.max) {
          const u = this.map.keys().next().value;
          this.delete(u);
        }
        this.map.set(s, n);
      }
      return this;
    }
  }
  return Ke = e, Ke;
}
var Ze, rr;
function j() {
  if (rr) return Ze;
  rr = 1;
  const e = /\s+/g;
  class r {
    constructor(E, $) {
      if ($ = i($), E instanceof r)
        return E.loose === !!$.loose && E.includePrerelease === !!$.includePrerelease ? E : new r(E.raw, $);
      if (E instanceof u)
        return this.raw = E.value, this.set = [[E]], this.formatted = void 0, this;
      if (this.options = $, this.loose = !!$.loose, this.includePrerelease = !!$.includePrerelease, this.raw = E.trim().replace(e, " "), this.set = this.raw.split("||").map((R) => this.parseRange(R.trim())).filter((R) => R.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const R = this.set[0];
        if (this.set = this.set.filter((v) => !d(v[0])), this.set.length === 0)
          this.set = [R];
        else if (this.set.length > 1) {
          for (const v of this.set)
            if (v.length === 1 && b(v[0])) {
              this.set = [v];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let E = 0; E < this.set.length; E++) {
          E > 0 && (this.formatted += "||");
          const $ = this.set[E];
          for (let R = 0; R < $.length; R++)
            R > 0 && (this.formatted += " "), this.formatted += $[R].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(E) {
      const R = ((this.options.includePrerelease && p) | (this.options.loose && I)) + ":" + E, v = n.get(R);
      if (v)
        return v;
      const g = this.options.loose, T = g ? c[o.HYPHENRANGELOOSE] : c[o.HYPHENRANGE];
      E = E.replace(T, $e(this.options.includePrerelease)), a("hyphen replace", E), E = E.replace(c[o.COMPARATORTRIM], t), a("comparator trim", E), E = E.replace(c[o.TILDETRIM], l), a("tilde trim", E), E = E.replace(c[o.CARETTRIM], h), a("caret trim", E);
      let C = E.split(" ").map((_) => w(_, this.options)).join(" ").split(/\s+/).map((_) => Ie(_, this.options));
      g && (C = C.filter((_) => (a("loose invalid filter", _, this.options), !!_.match(c[o.COMPARATORLOOSE])))), a("range list", C);
      const S = /* @__PURE__ */ new Map(), N = C.map((_) => new u(_, this.options));
      for (const _ of N) {
        if (d(_))
          return [_];
        S.set(_.value, _);
      }
      S.size > 1 && S.has("") && S.delete("");
      const F = [...S.values()];
      return n.set(R, F), F;
    }
    intersects(E, $) {
      if (!(E instanceof r))
        throw new TypeError("a Range is required");
      return this.set.some((R) => O(R, $) && E.set.some((v) => O(v, $) && R.every((g) => v.every((T) => g.intersects(T, $)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(E) {
      if (!E)
        return !1;
      if (typeof E == "string")
        try {
          E = new f(E, this.options);
        } catch {
          return !1;
        }
      for (let $ = 0; $ < this.set.length; $++)
        if (ve(this.set[$], E, this.options))
          return !0;
      return !1;
    }
  }
  Ze = r;
  const s = vn(), n = new s(), i = mt(), u = me(), a = pe(), f = D(), {
    safeRe: c,
    t: o,
    comparatorTrimReplace: t,
    tildeTrimReplace: l,
    caretTrimReplace: h
  } = oe(), { FLAG_INCLUDE_PRERELEASE: p, FLAG_LOOSE: I } = de(), d = (m) => m.value === "<0.0.0-0", b = (m) => m.value === "", O = (m, E) => {
    let $ = !0;
    const R = m.slice();
    let v = R.pop();
    for (; $ && R.length; )
      $ = R.every((g) => v.intersects(g, E)), v = R.pop();
    return $;
  }, w = (m, E) => (a("comp", m, E), m = P(m, E), a("caret", m), m = y(m, E), a("tildes", m), m = A(m, E), a("xrange", m), m = ge(m, E), a("stars", m), m), L = (m) => !m || m.toLowerCase() === "x" || m === "*", y = (m, E) => m.trim().split(/\s+/).map(($) => k($, E)).join(" "), k = (m, E) => {
    const $ = E.loose ? c[o.TILDELOOSE] : c[o.TILDE];
    return m.replace($, (R, v, g, T, C) => {
      a("tilde", m, R, v, g, T, C);
      let S;
      return L(v) ? S = "" : L(g) ? S = `>=${v}.0.0 <${+v + 1}.0.0-0` : L(T) ? S = `>=${v}.${g}.0 <${v}.${+g + 1}.0-0` : C ? (a("replaceTilde pr", C), S = `>=${v}.${g}.${T}-${C} <${v}.${+g + 1}.0-0`) : S = `>=${v}.${g}.${T} <${v}.${+g + 1}.0-0`, a("tilde return", S), S;
    });
  }, P = (m, E) => m.trim().split(/\s+/).map(($) => q($, E)).join(" "), q = (m, E) => {
    a("caret", m, E);
    const $ = E.loose ? c[o.CARETLOOSE] : c[o.CARET], R = E.includePrerelease ? "-0" : "";
    return m.replace($, (v, g, T, C, S) => {
      a("caret", m, v, g, T, C, S);
      let N;
      return L(g) ? N = "" : L(T) ? N = `>=${g}.0.0${R} <${+g + 1}.0.0-0` : L(C) ? g === "0" ? N = `>=${g}.${T}.0${R} <${g}.${+T + 1}.0-0` : N = `>=${g}.${T}.0${R} <${+g + 1}.0.0-0` : S ? (a("replaceCaret pr", S), g === "0" ? T === "0" ? N = `>=${g}.${T}.${C}-${S} <${g}.${T}.${+C + 1}-0` : N = `>=${g}.${T}.${C}-${S} <${g}.${+T + 1}.0-0` : N = `>=${g}.${T}.${C}-${S} <${+g + 1}.0.0-0`) : (a("no pr"), g === "0" ? T === "0" ? N = `>=${g}.${T}.${C}${R} <${g}.${T}.${+C + 1}-0` : N = `>=${g}.${T}.${C}${R} <${g}.${+T + 1}.0-0` : N = `>=${g}.${T}.${C} <${+g + 1}.0.0-0`), a("caret return", N), N;
    });
  }, A = (m, E) => (a("replaceXRanges", m, E), m.split(/\s+/).map(($) => Q($, E)).join(" ")), Q = (m, E) => {
    m = m.trim();
    const $ = E.loose ? c[o.XRANGELOOSE] : c[o.XRANGE];
    return m.replace($, (R, v, g, T, C, S) => {
      a("xRange", m, R, v, g, T, C, S);
      const N = L(g), F = N || L(T), _ = F || L(C), ee = _;
      return v === "=" && ee && (v = ""), S = E.includePrerelease ? "-0" : "", N ? v === ">" || v === "<" ? R = "<0.0.0-0" : R = "*" : v && ee ? (F && (T = 0), C = 0, v === ">" ? (v = ">=", F ? (g = +g + 1, T = 0, C = 0) : (T = +T + 1, C = 0)) : v === "<=" && (v = "<", F ? g = +g + 1 : T = +T + 1), v === "<" && (S = "-0"), R = `${v + g}.${T}.${C}${S}`) : F ? R = `>=${g}.0.0${S} <${+g + 1}.0.0-0` : _ && (R = `>=${g}.${T}.0${S} <${g}.${+T + 1}.0-0`), a("xRange return", R), R;
    });
  }, ge = (m, E) => (a("replaceStars", m, E), m.trim().replace(c[o.STAR], "")), Ie = (m, E) => (a("replaceGTE0", m, E), m.trim().replace(c[E.includePrerelease ? o.GTE0PRE : o.GTE0], "")), $e = (m) => (E, $, R, v, g, T, C, S, N, F, _, ee) => (L(R) ? $ = "" : L(v) ? $ = `>=${R}.0.0${m ? "-0" : ""}` : L(g) ? $ = `>=${R}.${v}.0${m ? "-0" : ""}` : T ? $ = `>=${$}` : $ = `>=${$}${m ? "-0" : ""}`, L(N) ? S = "" : L(F) ? S = `<${+N + 1}.0.0-0` : L(_) ? S = `<${N}.${+F + 1}.0-0` : ee ? S = `<=${N}.${F}.${_}-${ee}` : m ? S = `<${N}.${F}.${+_ + 1}-0` : S = `<=${S}`, `${$} ${S}`.trim()), ve = (m, E, $) => {
    for (let R = 0; R < m.length; R++)
      if (!m[R].test(E))
        return !1;
    if (E.prerelease.length && !$.includePrerelease) {
      for (let R = 0; R < m.length; R++)
        if (a(m[R].semver), m[R].semver !== u.ANY && m[R].semver.prerelease.length > 0) {
          const v = m[R].semver;
          if (v.major === E.major && v.minor === E.minor && v.patch === E.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Ze;
}
var Je, nr;
function me() {
  if (nr) return Je;
  nr = 1;
  const e = Symbol("SemVer ANY");
  class r {
    static get ANY() {
      return e;
    }
    constructor(t, l) {
      if (l = s(l), t instanceof r) {
        if (t.loose === !!l.loose)
          return t;
        t = t.value;
      }
      t = t.trim().split(/\s+/).join(" "), a("comparator", t, l), this.options = l, this.loose = !!l.loose, this.parse(t), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, a("comp", this);
    }
    parse(t) {
      const l = this.options.loose ? n[i.COMPARATORLOOSE] : n[i.COMPARATOR], h = t.match(l);
      if (!h)
        throw new TypeError(`Invalid comparator: ${t}`);
      this.operator = h[1] !== void 0 ? h[1] : "", this.operator === "=" && (this.operator = ""), h[2] ? this.semver = new f(h[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(t) {
      if (a("Comparator.test", t, this.options.loose), this.semver === e || t === e)
        return !0;
      if (typeof t == "string")
        try {
          t = new f(t, this.options);
        } catch {
          return !1;
        }
      return u(t, this.operator, this.semver, this.options);
    }
    intersects(t, l) {
      if (!(t instanceof r))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(t.value, l).test(this.value) : t.operator === "" ? t.value === "" ? !0 : new c(this.value, l).test(t.semver) : (l = s(l), l.includePrerelease && (this.value === "<0.0.0-0" || t.value === "<0.0.0-0") || !l.includePrerelease && (this.value.startsWith("<0.0.0") || t.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && t.operator.startsWith(">") || this.operator.startsWith("<") && t.operator.startsWith("<") || this.semver.version === t.semver.version && this.operator.includes("=") && t.operator.includes("=") || u(this.semver, "<", t.semver, l) && this.operator.startsWith(">") && t.operator.startsWith("<") || u(this.semver, ">", t.semver, l) && this.operator.startsWith("<") && t.operator.startsWith(">")));
    }
  }
  Je = r;
  const s = mt(), { safeRe: n, t: i } = oe(), u = br(), a = pe(), f = D(), c = j();
  return Je;
}
var Qe, sr;
function Re() {
  if (sr) return Qe;
  sr = 1;
  const e = j();
  return Qe = (s, n, i) => {
    try {
      n = new e(n, i);
    } catch {
      return !1;
    }
    return n.test(s);
  }, Qe;
}
var et, ir;
function bn() {
  if (ir) return et;
  ir = 1;
  const e = j();
  return et = (s, n) => new e(s, n).set.map((i) => i.map((u) => u.value).join(" ").trim().split(" ")), et;
}
var tt, or;
function Tn() {
  if (or) return tt;
  or = 1;
  const e = D(), r = j();
  return tt = (n, i, u) => {
    let a = null, f = null, c = null;
    try {
      c = new r(i, u);
    } catch {
      return null;
    }
    return n.forEach((o) => {
      c.test(o) && (!a || f.compare(o) === -1) && (a = o, f = new e(a, u));
    }), a;
  }, tt;
}
var rt, ar;
function An() {
  if (ar) return rt;
  ar = 1;
  const e = D(), r = j();
  return rt = (n, i, u) => {
    let a = null, f = null, c = null;
    try {
      c = new r(i, u);
    } catch {
      return null;
    }
    return n.forEach((o) => {
      c.test(o) && (!a || f.compare(o) === 1) && (a = o, f = new e(a, u));
    }), a;
  }, rt;
}
var nt, cr;
function Sn() {
  if (cr) return nt;
  cr = 1;
  const e = D(), r = j(), s = Ee();
  return nt = (i, u) => {
    i = new r(i, u);
    let a = new e("0.0.0");
    if (i.test(a) || (a = new e("0.0.0-0"), i.test(a)))
      return a;
    a = null;
    for (let f = 0; f < i.set.length; ++f) {
      const c = i.set[f];
      let o = null;
      c.forEach((t) => {
        const l = new e(t.semver.version);
        switch (t.operator) {
          case ">":
            l.prerelease.length === 0 ? l.patch++ : l.prerelease.push(0), l.raw = l.format();
          /* fallthrough */
          case "":
          case ">=":
            (!o || s(l, o)) && (o = l);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${t.operator}`);
        }
      }), o && (!a || s(a, o)) && (a = o);
    }
    return a && i.test(a) ? a : null;
  }, nt;
}
var st, ur;
function On() {
  if (ur) return st;
  ur = 1;
  const e = j();
  return st = (s, n) => {
    try {
      return new e(s, n).range || "*";
    } catch {
      return null;
    }
  }, st;
}
var it, lr;
function vt() {
  if (lr) return it;
  lr = 1;
  const e = D(), r = me(), { ANY: s } = r, n = j(), i = Re(), u = Ee(), a = gt(), f = $t(), c = It();
  return it = (t, l, h, p) => {
    t = new e(t, p), l = new n(l, p);
    let I, d, b, O, w;
    switch (h) {
      case ">":
        I = u, d = f, b = a, O = ">", w = ">=";
        break;
      case "<":
        I = a, d = c, b = u, O = "<", w = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (i(t, l, p))
      return !1;
    for (let L = 0; L < l.set.length; ++L) {
      const y = l.set[L];
      let k = null, P = null;
      if (y.forEach((q) => {
        q.semver === s && (q = new r(">=0.0.0")), k = k || q, P = P || q, I(q.semver, k.semver, p) ? k = q : b(q.semver, P.semver, p) && (P = q);
      }), k.operator === O || k.operator === w || (!P.operator || P.operator === O) && d(t, P.semver))
        return !1;
      if (P.operator === w && b(t, P.semver))
        return !1;
    }
    return !0;
  }, it;
}
var ot, fr;
function Ln() {
  if (fr) return ot;
  fr = 1;
  const e = vt();
  return ot = (s, n, i) => e(s, n, ">", i), ot;
}
var at, hr;
function Cn() {
  if (hr) return at;
  hr = 1;
  const e = vt();
  return at = (s, n, i) => e(s, n, "<", i), at;
}
var ct, dr;
function wn() {
  if (dr) return ct;
  dr = 1;
  const e = j();
  return ct = (s, n, i) => (s = new e(s, i), n = new e(n, i), s.intersects(n, i)), ct;
}
var ut, pr;
function Nn() {
  if (pr) return ut;
  pr = 1;
  const e = Re(), r = x();
  return ut = (s, n, i) => {
    const u = [];
    let a = null, f = null;
    const c = s.sort((h, p) => r(h, p, i));
    for (const h of c)
      e(h, n, i) ? (f = h, a || (a = h)) : (f && u.push([a, f]), f = null, a = null);
    a && u.push([a, null]);
    const o = [];
    for (const [h, p] of u)
      h === p ? o.push(h) : !p && h === c[0] ? o.push("*") : p ? h === c[0] ? o.push(`<=${p}`) : o.push(`${h} - ${p}`) : o.push(`>=${h}`);
    const t = o.join(" || "), l = typeof n.raw == "string" ? n.raw : String(n);
    return t.length < l.length ? t : n;
  }, ut;
}
var lt, Er;
function Pn() {
  if (Er) return lt;
  Er = 1;
  const e = j(), r = me(), { ANY: s } = r, n = Re(), i = x(), u = (l, h, p = {}) => {
    if (l === h)
      return !0;
    l = new e(l, p), h = new e(h, p);
    let I = !1;
    e: for (const d of l.set) {
      for (const b of h.set) {
        const O = c(d, b, p);
        if (I = I || O !== null, O)
          continue e;
      }
      if (I)
        return !1;
    }
    return !0;
  }, a = [new r(">=0.0.0-0")], f = [new r(">=0.0.0")], c = (l, h, p) => {
    if (l === h)
      return !0;
    if (l.length === 1 && l[0].semver === s) {
      if (h.length === 1 && h[0].semver === s)
        return !0;
      p.includePrerelease ? l = a : l = f;
    }
    if (h.length === 1 && h[0].semver === s) {
      if (p.includePrerelease)
        return !0;
      h = f;
    }
    const I = /* @__PURE__ */ new Set();
    let d, b;
    for (const A of l)
      A.operator === ">" || A.operator === ">=" ? d = o(d, A, p) : A.operator === "<" || A.operator === "<=" ? b = t(b, A, p) : I.add(A.semver);
    if (I.size > 1)
      return null;
    let O;
    if (d && b) {
      if (O = i(d.semver, b.semver, p), O > 0)
        return null;
      if (O === 0 && (d.operator !== ">=" || b.operator !== "<="))
        return null;
    }
    for (const A of I) {
      if (d && !n(A, String(d), p) || b && !n(A, String(b), p))
        return null;
      for (const Q of h)
        if (!n(A, String(Q), p))
          return !1;
      return !0;
    }
    let w, L, y, k, P = b && !p.includePrerelease && b.semver.prerelease.length ? b.semver : !1, q = d && !p.includePrerelease && d.semver.prerelease.length ? d.semver : !1;
    P && P.prerelease.length === 1 && b.operator === "<" && P.prerelease[0] === 0 && (P = !1);
    for (const A of h) {
      if (k = k || A.operator === ">" || A.operator === ">=", y = y || A.operator === "<" || A.operator === "<=", d) {
        if (q && A.semver.prerelease && A.semver.prerelease.length && A.semver.major === q.major && A.semver.minor === q.minor && A.semver.patch === q.patch && (q = !1), A.operator === ">" || A.operator === ">=") {
          if (w = o(d, A, p), w === A && w !== d)
            return !1;
        } else if (d.operator === ">=" && !n(d.semver, String(A), p))
          return !1;
      }
      if (b) {
        if (P && A.semver.prerelease && A.semver.prerelease.length && A.semver.major === P.major && A.semver.minor === P.minor && A.semver.patch === P.patch && (P = !1), A.operator === "<" || A.operator === "<=") {
          if (L = t(b, A, p), L === A && L !== b)
            return !1;
        } else if (b.operator === "<=" && !n(b.semver, String(A), p))
          return !1;
      }
      if (!A.operator && (b || d) && O !== 0)
        return !1;
    }
    return !(d && y && !b && O !== 0 || b && k && !d && O !== 0 || q || P);
  }, o = (l, h, p) => {
    if (!l)
      return h;
    const I = i(l.semver, h.semver, p);
    return I > 0 ? l : I < 0 || h.operator === ">" && l.operator === ">=" ? h : l;
  }, t = (l, h, p) => {
    if (!l)
      return h;
    const I = i(l.semver, h.semver, p);
    return I < 0 ? l : I > 0 || h.operator === "<" && l.operator === "<=" ? h : l;
  };
  return lt = u, lt;
}
var ft, mr;
function yn() {
  if (mr) return ft;
  mr = 1;
  const e = oe(), r = de(), s = D(), n = Ir(), i = J(), u = cn(), a = un(), f = ln(), c = fn(), o = hn(), t = dn(), l = pn(), h = En(), p = x(), I = mn(), d = Rn(), b = Rt(), O = gn(), w = In(), L = Ee(), y = gt(), k = $r(), P = vr(), q = It(), A = $t(), Q = br(), ge = $n(), Ie = me(), $e = j(), ve = Re(), m = bn(), E = Tn(), $ = An(), R = Sn(), v = On(), g = vt(), T = Ln(), C = Cn(), S = wn(), N = Nn(), F = Pn();
  return ft = {
    parse: i,
    valid: u,
    clean: a,
    inc: f,
    diff: c,
    major: o,
    minor: t,
    patch: l,
    prerelease: h,
    compare: p,
    rcompare: I,
    compareLoose: d,
    compareBuild: b,
    sort: O,
    rsort: w,
    gt: L,
    lt: y,
    eq: k,
    neq: P,
    gte: q,
    lte: A,
    cmp: Q,
    coerce: ge,
    Comparator: Ie,
    Range: $e,
    satisfies: ve,
    toComparators: m,
    maxSatisfying: E,
    minSatisfying: $,
    minVersion: R,
    validRange: v,
    outside: g,
    gtr: T,
    ltr: C,
    intersects: S,
    simplifyRange: N,
    subset: F,
    SemVer: s,
    re: e.re,
    src: e.src,
    tokens: e.t,
    SEMVER_SPEC_VERSION: r.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: r.RELEASE_TYPES,
    compareIdentifiers: n.compareIdentifiers,
    rcompareIdentifiers: n.rcompareIdentifiers
  }, ft;
}
var Tr = yn();
const _n = "UNDETERMINED_MACHINE_ID";
function bt() {
  try {
    return on();
  } catch {
    return he.env.machineId || _n;
  }
}
const qn = bt(), Y = Tr.parse(he.kiroVersion ?? "0.0.0"), kn = `${Y == null ? void 0 : Y.major}.${Y == null ? void 0 : Y.minor}`;
function Ar() {
  return {
    KiroClientVersion: kn,
    machineId: qn
  };
}
function Sr(e) {
  return {
    ...Ar(),
    Activity: e
  };
}
function Fn(e) {
  return {
    ...Ar(),
    Tool: e
  };
}
let Or, Lr, Cr, wr, Nr, Pr, yr;
function Dn() {
  const e = H.getMeterProvider().getMeter(ie.Onboarding);
  Or = e.createCounter("opened_IDE_count", {
    description: "Counts the number of times the IDE has been opened",
    unit: "number"
  }), Lr = e.createCounter("started_auth_count", {
    description: "Counts the number of times the IDE has started the auth onboarding flow",
    unit: "number"
  }), Cr = e.createCounter("failed_auth_count", {
    description: "Counts the number of times the IDE has failed the onboarding auth flow",
    unit: "number"
  }), wr = e.createCounter("canceled_auth_count", {
    description: "Counts the number of times a user canceled the onboarding auth flow",
    unit: "number"
  }), Nr = e.createCounter("abandoned_auth_count", {
    description: "Counts the number of times a user abandons the onboarding auth flow (timeout)",
    unit: "number"
  }), Pr = e.createCounter("finished_auth_count", {
    description: "Counts the number of times the IDE has finished the onboarding auth flow",
    unit: "number"
  }), yr = e.createCounter("bad_user_input_count", {
    description: "Counts the number of times bad user input was encountered during onboarding",
    unit: "number"
  });
}
function Mn(e) {
  try {
    if (!se())
      return;
    const s = Sr("onboarding");
    switch (e) {
      case "opened-IDE":
        Or.add(1, s);
        break;
      case "started-login":
        Lr.add(1, s);
        break;
      case "failed-login":
        Cr.add(1, s);
        break;
      case "canceled-login":
        wr.add(1, s);
        break;
      case "abandoned-login":
        Nr.add(1, s);
        break;
      case "finished-login":
        Pr.add(1, s);
        break;
      case "bad-user-input":
        yr.add(1, s);
        break;
    }
  } catch (r) {
    Et.error("Failed to record feature latency: ", r);
  }
}
let _r, qr, kr, Fr, Dr;
function Gn() {
  const e = H.getMeterProvider().getMeter(ie.User);
  _r = e.createCounter("github_login_count", {
    description: "Counts the number of times users have logged in with GitHub",
    unit: "number"
  }), qr = e.createCounter("google_login_count", {
    description: "Counts the number of times users have logged in with Google",
    unit: "number"
  }), kr = e.createCounter("enterprise_idc_login_count", {
    description: "Counts the number of times users have logged in with IdC",
    unit: "number"
  }), Fr = e.createCounter("idc_internal_login_count", {
    description: "Counts the number of times users have logged in with IdC",
    unit: "number"
  }), Dr = e.createCounter("builder_id_login_count", {
    description: "Counts the number of times users have logged in with Builder ID",
    unit: "number"
  });
}
function ms(e) {
  try {
    if (!se())
      return;
    const s = Sr("login");
    if (e.authMethod == "social")
      switch (e.provider) {
        case "Google":
          qr.add(1, s);
          break;
        case "Github":
          _r.add(1, s);
          break;
      }
    else if (e.authMethod == "IdC")
      switch (e.provider) {
        case "BuilderId":
          Dr.add(1, s);
          break;
        case "Enterprise":
          kr.add(1, s);
          break;
        case "Internal":
          Fr.add(1, s);
          break;
      }
  } catch (r) {
    Et.error("Failed to record auth login metrics: ", r);
  }
}
var B = /* @__PURE__ */ ((e) => (e.Application = "kiro.application", e.Feature = "kiro.feature", e.Continue = "kiro.continue", e.Agent = "kiro.agent", e.Tool = "kiro.tool", e.Parser = "kiro.parser", e.Onboarding = "kiro.onboarding", e.Webview = "kiro.webview", e.Auth = "kiro.auth", e))(B || {}), xn = /* @__PURE__ */ ((e) => (e.Onboarding = "onboarding", e))(xn || {}), fe = /* @__PURE__ */ ((e) => (e.RequestId = "requestId", e.ConversationId = "conversationId", e.ExecutionId = "executionId", e.ModelId = "ModelIdentifier", e.XRayTraceId = "AWS-XRAY-TRACE-ID", e))(fe || {});
class M {
  /**
   * Gets a context value from the current context
   * @param key The key for the context value
   * @returns The value or undefined if not found
   */
  static getContextValue(r) {
    const s = W.getBaggage(te.active());
    if (!s)
      return;
    const n = s.getEntry(r);
    return n == null ? void 0 : n.value;
  }
  /**
   * Executes a function with the given context values
   * @param contextValues The context values to set
   * @param fn The function to execute
   * @returns The result of the function
   */
  static withContextValues(r, s) {
    let i = W.getBaggage(te.active()) || W.createBaggage();
    for (const [a, f] of Object.entries(r))
      i = i.setEntry(a, { value: f });
    const u = W.setBaggage(te.active(), i);
    return te.with(u, () => {
      const a = ne.getActiveSpan();
      if (a)
        for (const [f, c] of Object.entries(r))
          a.setAttribute(f, c);
      return s();
    });
  }
  /**
   * Creates attributes object with all current context values
   * @returns Attributes object with context values and additional attributes
   */
  static getTelemetryAttributes() {
    const r = {}, s = W.getBaggage(te.active());
    s && s.getAllEntries().forEach(([i, u]) => {
      Object.values(fe).includes(i) && (r[i] = u.value);
    });
    const n = ne.getActiveSpan();
    return n && (r[fe.XRayTraceId] = `${n.spanContext().traceId}@${n.spanContext().spanId}`), r;
  }
}
function ht(e) {
  return function(...r) {
    var i, u, a, f;
    let s = !1;
    const n = performance.now();
    try {
      (i = e.before) == null || i.call(e);
      const c = e.callback.apply(this, r);
      return c instanceof Promise ? (s = !0, c.then((o) => {
        var t;
        return (t = e.success) == null || t.call(e), o;
      }).catch((o) => {
        var t;
        throw (t = e.failure) == null || t.call(e, o), o;
      }).finally(() => {
        var o;
        (o = e.after) == null || o.call(e, performance.now() - n);
      })) : ((u = e.success) == null || u.call(e), c);
    } catch (c) {
      throw (a = e.failure) == null || a.call(e, c), c;
    } finally {
      s || (f = e.after) == null || f.call(e, performance.now() - n);
    }
  };
}
const jn = 1e3 * 60 * 15, V = class V {
  constructor(r, s) {
    U(this, "namespace");
    U(this, "scope");
    this.namespace = r, this.scope = s;
  }
  extendScope(r) {
    return this.scope ? `${this.scope}.${r}` : r;
  }
  static toNumber(r) {
    return typeof r == "boolean" ? r ? 1 : 0 : r;
  }
  getOperationTrackers(r, s) {
    const n = this.extendScope(r), i = H.getMeterProvider().getMeter(this.namespace);
    return {
      abort: i.createCounter(`${n}.abort`, { unit: "number" }),
      abandon: i.createCounter(`${n}.abandon`, { unit: "number" }),
      badInput: i.createCounter(`${n}.badInput`, { unit: "number" }),
      unauthorized: i.createCounter(`${n}.unauthorized`, { unit: "number" }),
      count: i.createCounter(`${n}.count`, { unit: "number" }),
      failure: i.createCounter(`${n}.failure`, { unit: "number" }),
      blocked: i.createCounter(`${n}.blocked`, { unit: "number" }),
      environmentIssue: i.createCounter(`${n}.environmentIssue`, { unit: "number" }),
      errorType: i.createCounter(`${n}.errorType.${s}`, { unit: "number" }),
      success: i.createCounter(`${n}.success`, { unit: "number" }),
      latency: i.createHistogram(`${n}.latency`, { unit: "ms" })
    };
  }
  static async handlePeriodicReporters() {
    const r = H.getMeterProvider().getMeter(ie.Periodic);
    for (const [s, n] of this.periodicReporters) {
      const i = await n();
      for (const u of Object.keys(i)) {
        const a = { ...X, Periodic: s }, f = `${s}.${u}`, c = this.toNumber(i[u]);
        c !== void 0 && r.createHistogram(f, { unit: "number" }).record(c, a);
      }
    }
  }
  /**
   * Start the periodic metric reporter
   */
  static startPeriodicReporterLoop() {
    this.periodicReporterTimeout && clearInterval(this.periodicReporterTimeout), this.periodicReporterTimeout = setInterval(() => void this.handlePeriodicReporters(), jn);
  }
  /**
   * Reports metrics under a given scope with a histogram reporter
   */
  reportHistogramMetrics(r, s = {}) {
    const n = H.getMeterProvider().getMeter(this.namespace), i = {
      ...X,
      Operation: this.scope,
      ...s,
      ...M.getTelemetryAttributes()
    };
    for (const u of Object.keys(r)) {
      const a = this.extendScope(u), f = V.toNumber(r[u]);
      f !== void 0 && n.createHistogram(a).record(f, i);
    }
  }
  /**
   * Reports metrics under a given scope with a counter reporter
   */
  reportCountMetrics(r, s = {}) {
    const n = H.getMeterProvider().getMeter(this.namespace), i = {
      ...X,
      Operation: this.scope,
      ...s,
      ...M.getTelemetryAttributes()
    };
    for (const u of Object.keys(r)) {
      const a = this.extendScope(u), f = V.toNumber(r[u]);
      f !== void 0 && n.createCounter(a).add(f, i);
    }
  }
  /**
   * Wraps a function in metrics, creating a new function which will emit the given metrics
   */
  wrapMetrics(r, s) {
    const n = { ...X, Operation: r };
    return ht({
      callback: s,
      before: () => {
        const i = {
          ...n,
          ...M.getTelemetryAttributes()
        };
        this.getOperationTrackers(r).count.add(1, i);
      },
      success: () => {
        const i = {
          ...n,
          ...M.getTelemetryAttributes()
        };
        this.getOperationTrackers(r).success.add(1, i);
      },
      failure: (i) => {
        const u = re(i), a = this.getOperationTrackers(r, u), f = {
          ...n,
          ...M.getTelemetryAttributes()
        };
        St(i) ? (a.abort.add(1, { ...f, errorType: u }), a.failure.add(0, { ...f, errorType: u })) : (a.abort.add(0, { ...f, errorType: u }), a.failure.add(1, { ...f, errorType: u })), a.errorType.add(1, { ...f, errorType: u }), a.success.add(0, f);
      },
      after: (i) => {
        const u = {
          ...n,
          ...M.getTelemetryAttributes()
        };
        this.getOperationTrackers(r).latency.record(i, u);
      }
    });
  }
  /**
   * Calls a function with metrics directly
   */
  callWithMetrics(r, s) {
    return this.wrapMetrics(r, s)();
  }
  /**
   * Sets up a periodic metric reporter with a given id
   */
  periodicallyCaptureMetrics(r) {
    V.periodicReporters.set(this.scope || "default", r);
  }
  /**
   * Force the periodic metrics capture to run
   */
  forcePeriodicCapture() {
    V.handlePeriodicReporters();
  }
  /**
   * Decorator to handle adding metrics to a function
   */
  Metric(r) {
    const s = this.wrapMetrics.bind(this);
    return function(n, i, u) {
      const a = u.value, f = typeof i == "string" ? i : String(i), o = s(r || f, a);
      u.value = o;
    };
  }
  /**
   * Wraps a function in a trace, creating a new function which will emit x-ray traces
   */
  wrapTrace(r, s) {
    const n = { ...X, Operation: r }, i = `${this.scope}.${r}`, u = ne.getTracer(B.Application, ue), a = this.getOperationTrackers.bind(this);
    return function(...f) {
      const c = () => s.apply(this, f);
      return u.startActiveSpan(i, (o) => ht({
        callback: c,
        before: () => {
          const l = {
            ...n,
            ...M.getTelemetryAttributes()
          };
          o.setAttributes(n), a(r).count.add(1, l);
        },
        success: () => {
          o.setStatus({ code: z.OK });
          const l = {
            ...n,
            ...M.getTelemetryAttributes()
          };
          a(r).success.add(1, l);
        },
        failure: (l) => {
          const h = re(l), p = a(r, h);
          o.setStatus({ code: z.ERROR, message: h }), o.setAttribute("errorType", h);
          const I = {
            ...n,
            ...M.getTelemetryAttributes(),
            errorType: h
          };
          St(l) ? (p.abort.add(1, { ...I, errorType: h }), p.failure.add(0, { ...I, errorType: h })) : (p.abort.add(0, { ...I, errorType: h }), p.failure.add(1, { ...I, errorType: h })), p.errorType.add(1, I), p.success.add(0, I);
        },
        after: (l) => {
          const h = {
            ...n,
            ...M.getTelemetryAttributes()
          };
          a(r).latency.record(l, h), o.end();
        }
      })());
    };
  }
  /**
   * Calls a function with trace directly
   */
  callWithTrace(r, s) {
    return this.wrapTrace(r, s)();
  }
  /**
   * Executes the callback function while emitting x-ray traces
   */
  withTrace({ traceName: r, metricAliases: s, errorMapper: n }, i) {
    const u = { ...X, Operation: r }, a = `${this.scope}.${r}`, f = ne.getTracer(B.Application, ue), c = this.getOperationTrackers.bind(this), o = [r, ...s || []], t = (l) => i.apply(this, [l]);
    return f.startActiveSpan(a, (l) => ht({
      callback: () => t(l),
      before: () => {
        const p = {
          ...u,
          ...M.getTelemetryAttributes()
        };
        l.setAttributes(u), o.forEach((I) => {
          const d = { ...p, Operation: I };
          c(I).count.add(1, d);
        });
      },
      success: () => {
        l.setStatus({ code: z.OK });
        const p = {
          ...u,
          ...M.getTelemetryAttributes()
        };
        o.forEach((I) => {
          const d = { ...p, Operation: I };
          c(I).success.add(1, d);
        });
      },
      failure: (p) => {
        const I = re(p), d = o.map((w) => ({
          tracker: c(w, I),
          metricName: w
        }));
        l.setStatus({ code: z.ERROR, message: I }), l.setAttribute("errorType", I);
        const b = {
          ...u,
          ...M.getTelemetryAttributes(),
          errorType: I
        }, O = n(p);
        Object.keys(O).forEach((w) => {
          d.forEach(({ tracker: L, metricName: y }) => {
            const k = { ...b, Operation: y, errorType: w };
            L[w].add(O[w], k);
          });
        }), d.forEach(({ tracker: w, metricName: L }) => {
          const y = { ...b, Operation: L };
          w.errorType.add(1, y), w.success.add(0, y);
        });
      },
      after: (p) => {
        const I = {
          ...u,
          ...M.getTelemetryAttributes()
        };
        o.forEach((d) => {
          const b = { ...I, Operation: d };
          c(d).latency.record(p, b);
        }), l.end();
      }
    })());
  }
  /**
   * Sets up trace which can be closed when needed, not tied to a scope
   */
  createTrace(r) {
    const s = { ...X, Operation: r }, n = `${this.scope}.${r}`, i = ne.getTracer(B.Application, ue);
    let u;
    return {
      start: () => {
        u = i.startSpan(n, { attributes: s });
      },
      success: () => {
        u && (u.setStatus({ code: z.OK }), u.end());
      },
      fail: (a) => {
        if (u) {
          const f = re(a);
          u.setStatus({ code: z.ERROR, message: f }), u.end();
        }
      },
      setAttributes: (a) => {
        u && u.setAttributes(a);
      }
    };
  }
  /**
   * Decorator to handle adding traces to a function
   */
  Trace(r) {
    const s = this.wrapTrace.bind(this);
    return function(n, i, u) {
      const a = u.value, f = typeof i == "string" ? i : String(i), o = s(r || f, a);
      u.value = o;
    };
  }
};
U(V, "periodicReporters", /* @__PURE__ */ new Map()), U(V, "periodicReporterTimeout");
let Z = V;
const Un = bt(), Xn = `${le.platform()}-${le.release()}`, Tt = he.kiroVersion ?? "0.0.0", G = Tr.parse(Tt), Mr = Tt.split("-").length === 1 ? "stable" : "insider", Vn = `${G == null ? void 0 : G.major}.${G == null ? void 0 : G.minor}`, Hn = `${G == null ? void 0 : G.major}-${G == null ? void 0 : G.minor}`, Rr = new Z(B.Application), X = {
  KiroClientVersion: Vn,
  machineId: Un,
  platform: Xn,
  channel: Mr,
  version: Tt
};
function Bn() {
  return Rr.reportCountMetrics({ osPlatform: 1 }, { Operation: le.platform() }), Rr.reportCountMetrics({ kiroChannel: 1 }, { Operation: Mr }), {
    [`AppPlatform.${le.platform()}`]: !0,
    [`AppVersion.${Hn}`]: !0
  };
}
Et.info("Loading telemetry with client attributes", X);
const Gr = new Z(B.Feature, "features");
let ce = /* @__PURE__ */ new Set();
Gr.periodicallyCaptureMetrics(() => {
  const e = {};
  for (const r of ce)
    e[`${r}.usedByUser`] = !0;
  return ce.size > 0 && (e.anyAIFeaturesUsed = !0), ce = /* @__PURE__ */ new Set(), e;
});
function Wn(e) {
  Gr.reportCountMetrics({ [`${e}.used`]: !0 }), ce.add(e);
}
const zn = new Z(B.Application);
zn.periodicallyCaptureMetrics(() => Bn());
const Rs = {
  reportUsage: Wn
};
var Yn = /* @__PURE__ */ ((e) => (e.WriteFile = "WriteFile", e.GrepSearch = "GrepSearch", e.FileSearch = "FileSearch", e.ReplaceText = "ReplaceText", e.SelfLabel = "SelfLabel", e.AppendLines = "AppendLines", e.DeleteFile = "DeleteFile", e.ExecuteShell = "ExecuteShell", e.OpenFolder = "OpenFolder", e.FindFiles = "FindFiles", e.GetUserInput = "GetUserInput", e.ReadFile = "ReadFile", e.ReadMultipleFiles = "ReadMultipleFiles", e.NativeSearch = "NativeSearch", e.MCPWrapper = "MCPWrapper", e.TaskStatus = "TaskStatus", e))(Yn || {});
const Kn = {
  WriteFile: { name: "write_file", description: "Tracks write file tool" },
  GrepSearch: { name: "grep_search", description: "Tracks grep search tool" },
  FileSearch: { name: "file_search", description: "Tracks file search tool" },
  ReplaceText: { name: "replace_text", description: "Tracks replace text tool" },
  SelfLabel: { name: "self_label", description: "Tracks self label tool" },
  AppendLines: { name: "append_lines", description: "Tracks append lines tool" },
  DeleteFile: { name: "delete_file", description: "Tracks delete file tool" },
  ExecuteShell: { name: "execute_shell", description: "Tracks execute shell tool" },
  OpenFolder: { name: "open_folder", description: "Tracks open folder tool" },
  FindFiles: { name: "find_files", description: "Tracks find files tool" },
  GetUserInput: { name: "get_user_input", description: "Tracks get user input tool" },
  ReadFile: { name: "read_file", description: "Tracks read file tool" },
  ReadMultipleFiles: { name: "read_multiple_files", description: "Tracks read multiple files tool" },
  NativeSearch: { name: "native_search", description: "Tracks native search tool" },
  MCPWrapper: { name: "mcp_wrapper", description: "Tracks any custom MCP tool call" },
  TaskStatus: { name: "task_status", description: "Tracks the task status tool" }
}, K = new Z(B.Tool, "tools");
let xr, dt, pt;
function Zn() {
  const e = H.getMeterProvider().getMeter(ie.Tool);
  xr = e.createCounter("count", {
    description: "tool invoke count",
    unit: "number"
  }), dt = e.createCounter("error", {
    description: "tool error count",
    unit: "number"
  }), pt = e.createHistogram("duration", {
    description: "tool duration",
    unit: "ms"
  });
}
class jr {
  constructor(r) {
    U(this, "attributes");
    U(this, "startTime");
    this.tool = r, this.attributes = Fn(Kn[r].name), this.startTime = performance.now(), se() && xr.add(1, this.attributes);
  }
  /**
   * Create a new recorder for a tool execution, and record the initial invoke.
   */
  static start(r) {
    return K.reportCountMetrics({ toolUsage: 1 }, { Operation: `useTool.${r}` }), K.reportCountMetrics({
      [`${r}.invoke`]: 1,
      invoke: 1
    }), new jr(r);
  }
  /**
   * Record success metric and duration for a tool.
   */
  recordToolSuccess() {
    if (!se()) return;
    dt.add(0, this.attributes), pt.record(performance.now() - this.startTime, this.attributes);
    const r = performance.now() - this.startTime;
    K.reportCountMetrics({
      [`${this.tool}.success`]: 1,
      [`${this.tool}.failure`]: 0,
      toolSuccess: 1,
      toolFailure: 0
    }), K.reportHistogramMetrics({
      [`${this.tool}.latency`]: r,
      latency: r
    });
  }
  /**
   * Record success failure and duration for a tool.
   */
  recordToolFailure(r) {
    if (!se()) return;
    dt.add(1, this.attributes), pt.record(performance.now() - this.startTime, this.attributes);
    const s = performance.now() - this.startTime, n = re(r);
    K.reportCountMetrics({
      [`${this.tool}.success`]: 0,
      [`${this.tool}.failure`]: 1,
      [`${this.tool}.error.${n}`]: 1,
      toolSuccess: 0,
      toolFailure: 1,
      [`toolError.${n}`]: 1
    }), K.reportHistogramMetrics({
      [`${this.tool}.latency`]: s,
      latency: s
    });
  }
}
const Jn = "kiroAgent", ue = "0.0.1", gr = bt(), Qn = 5e3;
let Ur = !1;
function se() {
  return Ur;
}
function es(e) {
  W.setGlobalPropagator(e);
}
function gs(e) {
  const r = e.endpoint, s = At.empty().merge(
    new At({
      [sn]: Jn,
      [nn]: ue
    })
  ), n = new Br({
    url: r + "/v1/traces",
    headers: {
      // eslint-disable-next-line spellcheck/spell-checker
      "x-kiro-machineid": gr
    }
  }), i = new Hr({
    // CloudWatch expects delta aggregation. If this is cumulative, cloudwatch
    // will collect duplicate metrics and our sample counts will be inflated
    url: r + "/v1/metrics",
    temporalityPreference: Yr.DELTA,
    headers: {
      // eslint-disable-next-line spellcheck/spell-checker
      "x-kiro-machineid": gr
    }
  }), u = new Kr({
    exporter: i,
    exportIntervalMillis: Qn
  }), a = new Zr({
    resource: s,
    views: [
      new Jr({
        instrumentType: en.HISTOGRAM,
        aggregation: new Qr()
      })
    ]
  });
  a.addMetricReader(u), H.setGlobalMeterProvider(a);
  const f = new rn(n), c = new an({
    // Only extract known baggage keys
    keys: Object.values(fe)
  }), o = new Wr(), t = new zr(), l = new tn({
    textMapPropagator: t,
    resource: s,
    spanProcessors: [f, c],
    traceExporter: n,
    idGenerator: o,
    autoDetectResources: !1
  });
  return l.start(), es(t), Dn(), Gn(), Zn(), Ur = !0, Mn("opened-IDE"), new he.Disposable(() => l.shutdown());
}
export {
  Jn as A,
  M as C,
  X as D,
  Rs as F,
  xn as J,
  ie as M,
  Yn as T,
  ms as a,
  jr as b,
  ue as c,
  es as d,
  gs as e,
  B as f,
  fe as g,
  zn as h,
  se as i,
  Z as j,
  Mn as r
};
